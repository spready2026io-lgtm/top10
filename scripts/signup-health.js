'use strict';

/**
 * signup-health.js
 * The signup store check in the daily scan report (send-report.js).
 *
 * Three questions, because the 2026-10-05 failure (store deleted, site still
 * pointing at it, every signup failing silently) could hide from any one alone:
 *   1. Site: does stockscout.io's own store answer? (GET /api/health/signup)
 *   2. Workflow: does the store in the GitHub secrets answer, and how many
 *      subscribers does it hold? (The Daily Conviction sends from this one.)
 *   3. Match: are those the same store? (8-character fingerprint of the host)
 * Prints and returns booleans and a count, never an address or a credential.
 */
const crypto = require('crypto');
const { Redis } = require('@upstash/redis');

const SITE_URL = (process.env.SITE_URL || 'https://stockscout.io').replace(/\/$/, '');
const env = n => (process.env[n] || '').trim() || undefined;

function fingerprint(u) {
  try { return crypto.createHash('sha256').update(new URL(u).host).digest('hex').slice(0, 8); }
  catch { return null; }
}

async function checkSignupStore() {
  const out = { site: null, siteError: null, count: null, workflowError: null, workflowStore: null, match: null };

  try {
    const res = await fetch(`${SITE_URL}/api/health/signup`, { signal: AbortSignal.timeout(15000), headers: { 'Cache-Control': 'no-cache' } });
    if (res.ok) out.site = await res.json();
    else out.siteError = `HTTP ${res.status}`;
  } catch (e) { out.siteError = e.name === 'TimeoutError' ? 'timed out' : e.message; }

  const url = env('KV_REST_API_URL') || env('UPSTASH_REDIS_REST_URL');
  const token = env('KV_REST_API_TOKEN') || env('UPSTASH_REDIS_REST_TOKEN');
  if (!url || !token) out.workflowError = 'KV secrets not set';
  else {
    out.workflowStore = fingerprint(url);
    try { out.count = await new Redis({ url, token }).scard('subscribers:emails'); }
    catch (e) { out.workflowError = String(e.message).replace(/https?:\/\/\S+/g, '<url>').slice(0, 160); }
  }

  if (out.site?.store && out.workflowStore) out.match = out.site.store === out.workflowStore;

  out.siteOk = !!(out.site && out.site.configured && out.site.reachable);
  out.workflowOk = out.count !== null;
  out.ok = out.siteOk && out.workflowOk && out.match !== false;
  return out;
}

// Short tag for the email subject, so a failure shows in the inbox list.
function subjectTag(h) {
  if (h.ok) return 'Signup OK';
  if (!h.siteOk) return 'SIGNUP DOWN';
  if (h.match === false) return 'SIGNUP STORE MISMATCH';
  return 'SIGNUP CHECK FAILED';
}

function lines(h) {
  const site = h.siteOk ? 'OK, the site\'s store answers'
    : h.siteError ? `UNREACHABLE (${h.siteError})`
    : !h.site.configured ? 'NOT CONFIGURED: the site has no store variables, signups say "temporarily unavailable"'
    : 'DOWN: the site\'s store does not answer, every signup fails';
  const workflow = h.workflowOk ? `OK, ${h.count} subscriber${h.count === 1 ? '' : 's'} on the list`
    : `FAILED (${h.workflowError}): The Daily Conviction cannot read the list`;
  const match = h.match === true ? 'same store'
    : h.match === false ? 'MISMATCH: the site and the email workflow use different stores, so new signups will not get the email'
    : 'not compared (one side did not answer)';
  return { site, workflow, match };
}

module.exports = { checkSignupStore, subjectTag, lines, fingerprint };
