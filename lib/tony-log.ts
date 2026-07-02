import { Redis } from '@upstash/redis';

/**
 * Persistent log of every Ask Tony exchange, for the /admin/tony-log report.
 * Backed by Upstash Redis (added to the Vercel project as a Storage
 * integration, which injects one of these env var pairs). If neither is
 * set, logging silently no-ops so Ask Tony keeps working without storage.
 */
const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = url && token ? new Redis({ url, token }) : null;

const LOG_KEY = 'tony:qa:log';
const MAX_ENTRIES = 500;

export type TonyLogEntry = {
  ts: string;
  question: string;
  answer: string;
  latencyMs: number;
  source: string;
};

export async function logTonyExchange(entry: TonyLogEntry) {
  if (!redis) return;
  try {
    await redis.lpush(LOG_KEY, entry);
    await redis.ltrim(LOG_KEY, 0, MAX_ENTRIES - 1);
  } catch (err) {
    console.error('Tony log write failed:', err);
  }
}

export async function getTonyLog(limit = 200): Promise<TonyLogEntry[]> {
  if (!redis) return [];
  const raw = await redis.lrange<TonyLogEntry>(LOG_KEY, 0, limit - 1);
  return raw.filter((e): e is TonyLogEntry => !!e && typeof e === 'object' && 'question' in e);
}

export function isTonyLogConfigured() {
  return !!redis;
}
