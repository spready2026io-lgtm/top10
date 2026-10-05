import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { timingSafeEqual } from 'crypto';

/**
 * Unsubscribe from The Daily Conviction.
 *
 * Every email links here with ?e=<email>&t=<token>. The token is the `unsub`
 * field of the subscriber:<email> hash, issued at signup (app/api/subscribe)
 * or by the sender on first send (scripts/send-daily-conviction.js).
 *
 * GET shows a confirm button and changes nothing, because mail scanners
 * prefetch links and must not unsubscribe people. POST does the removal; it
 * also serves the one-click header (RFC 8058), whose body is
 * "List-Unsubscribe=One-Click" with the same query string.
 */
const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

// Kept in sync with app/api/subscribe/route.ts (SET_KEY).
const SET_KEY = 'subscribers:emails';

function page(title: string, body: string, status = 200) {
  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} | Stockscout</title><meta name="robots" content="noindex"></head>
<body style="margin:0;min-height:100vh;background:#020617;color:#e2e8f0;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;display:flex;align-items:center;justify-content:center;padding:16px;">
<div style="max-width:420px;width:100%;background:#0f172a;border:1px solid #1e293b;border-radius:14px;padding:28px;text-align:center;">
<div style="font-size:12px;font-weight:800;letter-spacing:.12em;color:#34d399;">STOCKSCOUT</div>
<h1 style="font-size:20px;margin:10px 0 8px;color:#fff;">${title}</h1>
${body}
<p style="margin-top:22px;font-size:13px;"><a href="/" style="color:#34d399;text-decoration:none;font-weight:600;">Back to stockscout.io</a></p>
</div></body></html>`;
  return new NextResponse(html, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
}

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));

async function verify(req: NextRequest): Promise<{ email: string; ok: boolean }> {
  const email = (req.nextUrl.searchParams.get('e') || '').trim().toLowerCase();
  const t = req.nextUrl.searchParams.get('t') || '';
  if (!redis || !email || !t || email.length > 254) return { email, ok: false };
  const stored = await redis.hget(`subscriber:${email}`, 'unsub');
  if (typeof stored !== 'string' || stored.length !== t.length) return { email, ok: false };
  return { email, ok: timingSafeEqual(Buffer.from(stored), Buffer.from(t)) };
}

const INVALID = () => page('This link has expired', '<p style="font-size:14px;color:#94a3b8;line-height:1.6;">We could not match this unsubscribe link. If you still get emails you did not ask for, tell us on the <a href="/contact" style="color:#34d399;">contact page</a> and we will remove you by hand.</p>', 400);

export async function GET(req: NextRequest) {
  try {
    const { email, ok } = await verify(req);
    if (!ok) return INVALID();
    const action = escapeHtml(req.nextUrl.pathname + req.nextUrl.search);
    return page('Unsubscribe?', `<p style="font-size:14px;color:#94a3b8;line-height:1.6;">Stop sending The Daily Conviction to <strong style="color:#e2e8f0;">${escapeHtml(email)}</strong>?</p>
<form method="POST" action="${action}" style="margin-top:18px;"><button type="submit" style="background:#10b981;color:#000;font-weight:700;border:0;border-radius:999px;padding:10px 24px;font-size:14px;cursor:pointer;">Unsubscribe</button></form>`);
  } catch (err) {
    console.error('[unsubscribe] GET failed:', err instanceof Error ? err.message : String(err));
    return page('Something went wrong', '<p style="font-size:14px;color:#94a3b8;">Please try the link again in a minute.</p>', 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, ok } = await verify(req);
    if (!ok) return INVALID();
    await redis!.srem(SET_KEY, email);
    await redis!.hset(`subscriber:${email}`, { unsubscribedAt: new Date().toISOString() });
    return page('You are unsubscribed', '<p style="font-size:14px;color:#94a3b8;line-height:1.6;">No more Daily Conviction emails. You can sign up again any time on stockscout.io.</p>');
  } catch (err) {
    console.error('[unsubscribe] POST failed:', err instanceof Error ? err.message : String(err));
    return page('Something went wrong', '<p style="font-size:14px;color:#94a3b8;">Please try the link again in a minute.</p>', 500);
  }
}
