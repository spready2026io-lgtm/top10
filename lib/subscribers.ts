import { Redis } from '@upstash/redis';

/**
 * Reader for the email-capture subscriber list, for the /admin/tony-log
 * "Subscribers" tab. Backed by the SAME Upstash Redis the Ask Tony log and the
 * subscribe route use (see lib/tony-log.ts and app/api/subscribe/route.ts).
 *
 * Storage (written by app/api/subscribe/route.ts):
 *   subscribers:emails    a SET of addresses
 *   subscriber:<email>    a HASH with { email, source, ts }
 *
 * If Redis is not configured this reports "not configured" rather than throwing,
 * mirroring lib/tony-log.ts.
 */
const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = url && token ? new Redis({ url, token }) : null;

// Kept in sync with app/api/subscribe/route.ts (SET_KEY).
const SET_KEY = 'subscribers:emails';

export type Subscriber = { email: string; source: string; ts: string | null };

export function isSubscribersConfigured() {
  return !!redis;
}

export async function getSubscribers(): Promise<Subscriber[]> {
  if (!redis) return [];
  const emails = await redis.smembers(SET_KEY);
  if (!emails.length) return [];

  // One hash per address for source + first-seen. A set member with no hash
  // (e.g. added before the hash write, or by hand) still lists, minus detail.
  const details = await Promise.all(
    emails.map(async (email): Promise<Subscriber> => {
      try {
        const h = await redis!.hgetall<{ email?: string; source?: string; ts?: string }>(`subscriber:${email}`);
        return { email, source: h?.source ?? 'unknown', ts: h?.ts ?? null };
      } catch {
        return { email, source: 'unknown', ts: null };
      }
    }),
  );

  // Newest first; entries with no timestamp sort to the end (by email).
  return details.sort((a, b) => {
    if (a.ts && b.ts) return b.ts.localeCompare(a.ts);
    if (a.ts) return -1;
    if (b.ts) return 1;
    return a.email.localeCompare(b.email);
  });
}
