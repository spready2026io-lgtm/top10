import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

/**
 * Email capture for the weekly conviction note.
 *
 * Stores subscribers in Upstash Redis (the same Storage integration that backs
 * the Ask Tony log — see lib/tony-log.ts). Two keys:
 *   subscribers:emails         a SET of addresses, so a repeat signup is a no-op
 *   subscriber:<email>         a HASH with source + first-seen timestamp
 *
 * If Redis is not configured the route fails closed with a clear error rather
 * than pretending to have captured an address it dropped on the floor.
 */
const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = url && token ? new Redis({ url, token }) : null;

const SET_KEY = 'subscribers:emails';

// Deliberately permissive. Real validation is the confirmation email, not a regex.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const rawEmail = typeof body.email === 'string' ? body.email : '';
    const source = typeof body.source === 'string' ? body.source.slice(0, 40) : 'unknown';

    const email = rawEmail.trim().toLowerCase();

    if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!redis) {
      console.error('[subscribe] Redis not configured — KV env vars missing.');
      return NextResponse.json({ error: 'Signup is temporarily unavailable. Please try again later.' }, { status: 503 });
    }

    // sadd returns 1 for a new member, 0 if it was already present. Either way
    // the caller gets success — an existing subscriber re-submitting is not an error.
    const added = await redis.sadd(SET_KEY, email);
    if (added === 1) {
      await redis.hset(`subscriber:${email}`, {
        email,
        source,
        ts: new Date().toISOString(),
      });
    }

    return NextResponse.json({ ok: true, alreadySubscribed: added === 0 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[subscribe] write failed:', msg);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
