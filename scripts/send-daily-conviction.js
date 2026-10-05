#!/usr/bin/env node
'use strict';

/**
 * send-daily-conviction.js
 * Sends The Daily Conviction: the day's 20 biggest share moves across every
 * tracked fund (lib/daily-moves.json, built by build-moves.js) to everyone on
 * the stockscout.io signup list.
 *
 * Runs in the scrape workflow after the data commit. Needs:
 *   KV_REST_API_URL + KV_REST_API_TOKEN   the Upstash Redis behind the signup form
 *                                         (same values Vercel holds). Without them
 *                                         the edition goes to the internal address only.
 *   RESEND_API_KEY + DAILY_FROM           preferred sender, or
 *   GMX_USER + GMX_PASSWORD               the SMTP account the scan report uses.
 *   REPORT_TO (optional)                  internal copy; defaults to GMX_USER.
 *
 * The repo is public and so are its Action logs: this script prints counts,
 * never an address, and scrubs addresses out of any error it prints.
 */

const fs     = require('fs');
const path   = require('path');
const crypto = require('crypto');
const { Redis } = require('@upstash/redis');

const MOVES_PATH = path.join(__dirname, '..', 'lib', 'daily-moves.json');
const SITE_URL   = (process.env.SITE_URL || 'https://stockscout.io').replace(/\/$/, '');
const SET_KEY    = 'subscribers:emails';   // kept in sync with app/api/subscribe/route.ts
const MIN_MOVES  = 3;

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ── Formatting ────────────────────────────────────────────────────────────────

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function money(v) {
  if (v === null || v === undefined) return 'n/a';
  const a = Math.abs(v);
  if (a >= 1e9) return `$${(a / 1e9).toFixed(2)}B`;
  if (a >= 1e6) return `$${(a / 1e6).toFixed(1)}M`;
  if (a >= 1e3) return `$${Math.round(a / 1e3)}K`;
  return `$${Math.round(a)}`;
}
const shares = n => `${n >= 0 ? '+' : '-'}${Math.abs(n).toLocaleString('en-US')}`;
const pp = n => `${n >= 0 ? '+' : '-'}${Math.abs(n).toFixed(2)}%`;
const KIND = { added: 'Added', new: 'New position', trimmed: 'Trimmed', exited: 'Exited' };

function longDate(iso) {
  return new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}
function shortDate(iso) {
  return new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
}

function verb(m) {
  return m.kind === 'new' ? 'opened' : m.kind === 'exited' ? 'exited' : m.kind === 'added' ? 'added' : 'cut';
}

function subjectFor(d) {
  const lead = d.top[0];
  const what = lead.kind === 'exited' || lead.kind === 'new'
    ? `${lead.etf} ${verb(lead)} ${lead.ticker}`
    : `${lead.etf} ${verb(lead)} ${money(lead.value)} of ${lead.ticker}`;
  return `The Daily Conviction, ${shortDate(d.date)}: ${what}`;
}

// ── Email body ────────────────────────────────────────────────────────────────

function rowHtml(m) {
  const buy = m.netShares > 0;
  const tone = buy ? '#047857' : '#b91c1c';
  const pos = m.positionChangePct === null ? '' : ` (${m.positionChangePct > 0 ? '+' : ''}${m.positionChangePct}% position)`;
  return `<tr>
    <td style="padding:10px 12px;border-top:1px solid #e5e7eb;vertical-align:top;">
      <div style="font-weight:700;font-size:14px;color:#0f172a;">${esc(m.ticker)}</div>
      <div style="font-size:12px;color:#64748b;">${esc(m.name)}</div>
    </td>
    <td style="padding:10px 12px;border-top:1px solid #e5e7eb;vertical-align:top;">
      <div style="font-weight:600;font-size:13px;color:#0f172a;">${esc(m.etf)}</div>
      <div style="font-size:12px;color:#64748b;">${esc(m.themes.join(' / '))}</div>
    </td>
    <td style="padding:10px 12px;border-top:1px solid #e5e7eb;vertical-align:top;">
      <div style="font-weight:600;font-size:13px;color:${tone};">${KIND[m.kind]}</div>
      <div style="font-size:12px;color:#64748b;">${shares(m.netShares)} sh${esc(pos)}</div>
    </td>
    <td style="padding:10px 12px;border-top:1px solid #e5e7eb;vertical-align:top;text-align:right;white-space:nowrap;">
      <div style="font-weight:700;font-size:14px;color:${tone};">${money(m.value)}</div>
      <div style="font-size:12px;color:#64748b;">${pp(m.weightMoved)} of fund</div>
    </td>
  </tr>`;
}

function sectionHtml(title, list) {
  if (!list.length) return '';
  return `<h2 style="margin:28px 0 8px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#64748b;">${title} (${list.length})</h2>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#ffffff;border:1px solid #e5e7eb;border-radius:10px;">
    ${list.map(rowHtml).join('')}
  </table>`;
}

function consensusLine(d) {
  const parts = [];
  const fmt = c => `${c.ticker} (${c.funds.length} funds)`;
  if (d.consensus.buys.length) parts.push(`Most bought by several funds at once: ${d.consensus.buys.map(fmt).join(', ')}.`);
  if (d.consensus.sells.length) parts.push(`Most sold: ${d.consensus.sells.map(fmt).join(', ')}.`);
  return parts.join(' ');
}

function buildEmail(d, unsubUrl, internalNote) {
  const buys  = d.top.filter(m => m.netShares > 0).sort((a, b) => Math.abs(b.value ?? 0) - Math.abs(a.value ?? 0));
  const sells = d.top.filter(m => m.netShares < 0).sort((a, b) => Math.abs(b.value ?? 0) - Math.abs(a.value ?? 0));
  const intro = `Fund managers made ${d.movesConsidered} meaningful moves across the ${d.fundsCompared} funds I could measure today. These are the ${d.top.length} biggest, by dollar size.`;
  const cons  = consensusLine(d);
  const preheader = `${buys.length} buys and ${sells.length} sells, the biggest moves across ${d.fundsCompared} funds.`;

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>The Daily Conviction</title></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;color:#0f172a;">
<div style="display:none;max-height:0;overflow:hidden;">${esc(preheader)}</div>
<div style="max-width:680px;margin:0 auto;padding:24px 16px;">
  ${internalNote ? `<div style="background:#fef3c7;border:1px solid #fcd34d;border-radius:8px;padding:10px 14px;margin-bottom:16px;font-size:12px;color:#92400e;">${esc(internalNote)}</div>` : ''}
  <div style="font-size:12px;font-weight:800;letter-spacing:.12em;color:#059669;">STOCKSCOUT</div>
  <h1 style="margin:4px 0 2px;font-size:26px;line-height:1.2;color:#0f172a;">The Daily Conviction</h1>
  <div style="font-size:13px;color:#64748b;">${esc(longDate(d.date))}</div>
  <p style="margin:18px 0 0;font-size:15px;line-height:1.55;color:#1e293b;">${esc(intro)}</p>
  ${cons ? `<p style="margin:10px 0 0;font-size:14px;line-height:1.55;color:#1e293b;">${esc(cons)}</p>` : ''}
  ${sectionHtml('Buys', buys)}
  ${sectionHtml('Sells', sells)}
  <p style="margin:24px 0 0;font-size:12px;line-height:1.6;color:#64748b;">
    How to read this: share counts come from each fund's published daily holdings, compared with the previous trading day.
    Each fund's own inflows and outflows are stripped out first, so what is left is the fund choosing to add or cut.
    "Of fund" is how much of the portfolio the move represents. Dollar values are estimates at the latest price.
    Where a source shows only a fund's top 25 holdings, a stock leaving that list is not counted as a sale.
    Data, not advice.
  </p>
  <p style="margin:16px 0 0;font-size:13px;"><a href="${SITE_URL}" style="color:#059669;font-weight:600;text-decoration:none;">See the full theme rankings on stockscout.io</a></p>
  <p style="margin:20px 0 0;font-size:11px;line-height:1.6;color:#94a3b8;">
    You get this because you signed up at stockscout.io. ${unsubUrl ? `<a href="${esc(unsubUrl)}" style="color:#64748b;">Unsubscribe</a>.` : ''}
  </p>
</div>
</body></html>`;

  const line = m => `  ${m.ticker} (${m.name}) | ${m.etf}, ${m.themes.join(' / ')} | ${KIND[m.kind]} ${shares(m.netShares)} sh | ${money(m.value)} | ${pp(m.weightMoved)} of fund`;
  const text = [
    'THE DAILY CONVICTION', longDate(d.date), '', intro, cons, '',
    buys.length ? `BUYS (${buys.length})` : '', ...buys.map(line), '',
    sells.length ? `SELLS (${sells.length})` : '', ...sells.map(line), '',
    'Share counts from each fund\'s published daily holdings vs the previous trading day, with the fund\'s own inflows and outflows stripped out. Dollar values are estimates. Data, not advice.',
    SITE_URL,
    unsubUrl ? `Unsubscribe: ${unsubUrl}` : '',
  ].filter((l, i, a) => !(l === '' && a[i - 1] === '')).join('\n');

  return { html, text };
}

// ── Transport ─────────────────────────────────────────────────────────────────

function makeSender() {
  if (process.env.RESEND_API_KEY && process.env.DAILY_FROM) {
    const from = process.env.DAILY_FROM;
    return {
      name: 'resend', pause: 600,
      async send({ to, subject, html, text, headers }) {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ from, to: [to], subject, html, text, headers }),
        });
        if (!res.ok) throw new Error(`Resend HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
      },
    };
  }
  if (process.env.GMX_USER && process.env.GMX_PASSWORD) {
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      host: 'mail.gmx.com', port: 587, secure: false,
      auth: { user: process.env.GMX_USER, pass: process.env.GMX_PASSWORD },
    });
    const from = `"Tony at Stockscout" <${process.env.GMX_USER}>`;
    return {
      name: 'gmx', pause: 1500,
      async send({ to, subject, html, text, headers }) {
        await transporter.sendMail({ from, to, subject, html, text, headers });
      },
    };
  }
  return null;
}

function scrub(msg, addresses) {
  let out = String(msg);
  for (const a of addresses) out = out.split(a).join('<subscriber>');
  return out.replace(/[^\s<>()"']+@[^\s<>()"']+/g, '<address>');
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const today = process.env.MOVES_DATE || new Date().toISOString().slice(0, 10);
  if (!fs.existsSync(MOVES_PATH)) { console.log('[daily-conviction] No daily-moves.json yet. Nothing to send.'); return; }
  const d = JSON.parse(fs.readFileSync(MOVES_PATH, 'utf8'));

  if (d.date !== today) { console.log(`[daily-conviction] Edition is dated ${d.date}, not ${today}. Nothing to send.`); return; }
  if (d.status !== 'ok' || d.top.length < MIN_MOVES) {
    console.log(`[daily-conviction] No edition today (status ${d.status}, ${d.top.length} moves).`);
    return;
  }

  const sender = makeSender();
  if (!sender) { console.error('[daily-conviction] No sender configured (RESEND_API_KEY + DAILY_FROM, or GMX_USER + GMX_PASSWORD).'); return; }
  const internalTo = process.env.REPORT_TO || process.env.GMX_USER;
  const subject = subjectFor(d);
  console.log(`[daily-conviction] ${subject} (via ${sender.name})`);

  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  const redis = url && token ? new Redis({ url, token }) : null;

  let note = null;
  let sent = 0, failed = 0, total = 0;
  const addresses = [];

  if (!redis) {
    note = 'Preview only: the subscriber list is not connected to this workflow yet (KV_REST_API_URL and KV_REST_API_TOKEN secrets missing), so no subscriber received this.';
  } else {
    // One edition per day, even if the workflow is re-run.
    const claimed = await redis.set(`daily-conviction:sent:${d.date}`, new Date().toISOString(), { nx: true, ex: 60 * 60 * 24 * 14 });
    if (claimed !== 'OK') { console.log(`[daily-conviction] Edition ${d.date} was already sent. Skipping.`); return; }

    const emails = await redis.smembers(SET_KEY);
    total = emails.length;
    addresses.push(...emails);
    for (const email of emails) {
      try {
        // Same token format as app/api/subscribe/route.ts. The letter prefix keeps
        // Upstash from deserializing an all-digit token into a number.
        let unsub = await redis.hget(`subscriber:${email}`, 'unsub');
        if (typeof unsub !== 'string' || !unsub) {
          unsub = 'u' + crypto.randomBytes(16).toString('hex');
          await redis.hset(`subscriber:${email}`, { unsub });
        }
        const unsubUrl = `${SITE_URL}/api/unsubscribe?e=${encodeURIComponent(email)}&t=${unsub}`;
        const { html, text } = buildEmail(d, unsubUrl, null);
        await sender.send({
          to: email, subject, html, text,
          headers: { 'List-Unsubscribe': `<${unsubUrl}>`, 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' },
        });
        sent++;
      } catch (e) {
        failed++;
        console.error(`[daily-conviction] send ${sent + failed}/${total} failed: ${scrub(e.message, addresses)}`);
      }
      await sleep(sender.pause);
    }
    note = `Internal copy. Sent to ${sent} of ${total} subscribers${failed ? `, ${failed} failed (see the workflow log)` : ''}.`;
  }

  console.log(`[daily-conviction] Subscribers: ${sent} sent, ${failed} failed, ${total} on the list.`);

  if (internalTo) {
    try {
      const { html, text } = buildEmail(d, null, note);
      await sender.send({ to: internalTo, subject: `[Internal] ${subject}`, html, text, headers: {} });
      console.log('[daily-conviction] Internal copy sent.');
    } catch (e) {
      console.error(`[daily-conviction] Internal copy failed: ${scrub(e.message, [internalTo])}`);
    }
  }
  if (failed && failed === total) process.exit(1);
}

module.exports = { buildEmail, subjectFor };

if (require.main === module) {
  main().catch(e => { console.error(`[daily-conviction] ${scrub(e.message, [])}`); process.exit(1); });
}
