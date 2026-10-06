import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { createHash } from 'crypto';

/**
 * Health of the store behind the signup box, the Ask Tony log and unsubscribe.
 * Read daily by scripts/send-report.js so a dead store shows in the scan email
 * (on 2026-10-05 it had been deleted and every signup failed, with no alert).
 *
 * Returns booleans and an 8-character fingerprint of the store's host, never
 * data or credentials. The fingerprint lets the report tell whether the site
 * and the email workflow point at the same store. Cached at the edge for a
 * minute, so the endpoint cannot be used to burn the store's command quota.
 */
export const dynamic = 'force-dynamic';

const url = (process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL ?? '').trim();
const token = (process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? '').trim();

function fingerprint(u: string): string | null {
  try {
    return createHash('sha256').update(new URL(u).host).digest('hex').slice(0, 8);
  } catch {
    return null;
  }
}

export async function GET() {
  const headers = { 'Cache-Control': 'public, max-age=0, s-maxage=60' };
  if (!url || !token) {
    return NextResponse.json({ configured: false, reachable: false, store: null }, { headers });
  }
  const store = fingerprint(url);
  try {
    await new Redis({ url, token }).ping();
    return NextResponse.json({ configured: true, reachable: true, store }, { headers });
  } catch (err) {
    console.error('[health/signup] ping failed:', err instanceof Error ? err.message : String(err));
    return NextResponse.json({ configured: true, reachable: false, store }, { headers });
  }
}
