#!/usr/bin/env node
'use strict';

/**
 * send-daily-conviction.js
 * Sends The Daily Conviction: the day's biggest share moves across every
 * tracked fund, up to 20 and each worth $1M or more (lib/daily-moves.json,
 * built by build-moves.js), to everyone on the stockscout.io signup list.
 *
 * An edition is held back from subscribers when too few funds were measured
 * (status 'partial') or fewer than MIN_MOVES moves made the list. A held
 * edition still goes to the internal address, with the reason at the top, so
 * a missed day is never silent. The internal copy also names what the
 * engine's safety gates left out; subscribers never see that.
 *
 * Runs in the scrape workflow after the data commit. Needs:
 *   KV_REST_API_URL + KV_REST_API_TOKEN   the Upstash Redis behind the signup form
 *                                         (same values Vercel holds). Without them
 *                                         the edition goes to the internal address only.
 *   SENDGRID_API_KEY                      preferred sender: SendGrid, the same path Bench
 *                                         uses for bench@stockscout.io. stockscout.io is
 *                                         domain-authenticated there, so the default From,
 *                                         "Tony at Stockscout <tony@stockscout.io>", is
 *                                         DKIM/SPF-aligned with no extra setup.
 *   DAILY_FROM, DAILY_REPLY_TO (optional) override the From, set a Reply-To.
 *   GMX_USER + GMX_PASSWORD               fallback sender (the scan report's SMTP account).
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
const COVERAGE_FLOOR = 0.8;   // as in build-moves.js; used only when an edition file does not state its floor

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
const GERUND = { new: 'opening', exited: 'exiting', added: 'adding', trimmed: 'cutting' };

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

// The dollar floor for a listed move, as copy: "$1M".
function floorLabel(d) {
  const v = d.minMoveValue || 1e6;
  return v >= 1e6 ? `$${+(v / 1e6).toFixed(1)}M` : money(v);
}

// Every move past the floor is on the list: a quiet day, so the copy must not
// promise "the 20 biggest".
const listsEveryMove = d => d.top.length >= d.movesConsidered;

function subjectFor(d) {
  const head = `The Daily Conviction, ${shortDate(d.date)}`;
  const lead = d.top[0];
  if (!lead) return `${head}: no moves of ${floorLabel(d)} or more`;
  const size = lead.kind === 'exited' || lead.kind === 'new' ? '' : `${money(lead.value)} of `;
  if (listsEveryMove(d)) {
    return `${head}: ${plural(d.top.length, 'move')} over ${floorLabel(d)}, led by ${lead.etf} ${GERUND[lead.kind]} ${size}${lead.ticker}`;
  }
  return `${head}: ${lead.etf} ${verb(lead)} ${size}${lead.ticker}`;
}

// Editions since 2026-10-20 cover active funds only (scope 'active').
const isActiveScope = d => d.scope === 'active';
const fundsWord = d => (isActiveScope(d) ? 'active funds' : 'funds');

// Why today's edition must not reach subscribers, or null when it may.
function holdReason(d) {
  const floor = d.coverageFloor ?? Math.ceil(COVERAGE_FLOOR * d.fundsTracked);
  if (d.status === 'partial' || d.fundsCompared < floor) {
    const why = [];
    if (d.fundsWithShares < d.fundsTracked) why.push(`${d.fundsTracked - d.fundsWithShares} had no share counts`);
    if (d.fundsStale) why.push(`${d.fundsStale} had a baseline older than the last trading day`);
    if (d.fundsExcluded?.length) why.push(`${d.fundsExcluded.length} sat out on an implausible flow`);
    return `Only ${d.fundsCompared} of the ${d.fundsTracked} tracked ${fundsWord(d)} were measured today, below the floor of ${floor}${why.length ? ` (${why.join(', ')})` : ''}.`;
  }
  if (d.status !== 'ok') return `The edition's status is "${d.status}".`;
  if (d.top.length < MIN_MOVES) {
    return `Only ${plural(d.top.length, 'move')} of ${floorLabel(d)} or more today, fewer than the ${MIN_MOVES} an edition needs.`;
  }
  return null;
}

// What the safety gates left out today. For the internal copy only: a
// subscriber never reads about our own data faults (non-negotiable 14).
function gateNote(d) {
  const parts = [];
  if (d.fundsExcluded?.length) {
    parts.push(`Sat out, estimated flow beyond +/-${d.maxDailyFlowPct ?? 10}%: ${d.fundsExcluded.map(f => `${f.etf} ${f.flow > 0 ? '+' : ''}${f.flow}% (${plural(f.moves, 'move')})`).join(', ')}.`);
  }
  if (d.notListed?.length) {
    const shown = d.notListed.slice(0, 8).map(x => `${x.etf} ${x.ticker} (${x.reason})`);
    parts.push(`Not a priced US-listed equity: ${shown.join(', ')}${d.notListed.length > 8 ? `, and ${d.notListed.length - 8} more` : ''}.`);
  }
  if (d.movesBelowFloor) parts.push(`${plural(d.movesBelowFloor, 'move')} under ${floorLabel(d)} not listed.`);
  if (d.fundsUntagged?.length) {
    parts.push(`Not tagged active or index in lib/fund-management.json, so left out of this email and ranked as index on the site: ${d.fundsUntagged.join(', ')}.`);
  }
  return parts.join(' ');
}

// ── Email body ────────────────────────────────────────────────────────────────

// Two columns so it holds up on a phone: who moved which stock (with the kind
// of move as a tag), and the size of the move in dollars, shares and fund weight.
function rowHtml(m, i) {
  const buy = m.netShares > 0;
  const tone = buy ? '#047857' : '#be123c';
  const tint = buy ? '#ecfdf5' : '#fff1f2';
  const cell = `padding:12px 14px;${i ? 'border-top:1px solid #edf2f7;' : ''}vertical-align:top;font-family:${FONT};`;
  const small = 'font-size:12px;color:#64748b;line-height:1.5;';
  const pos = m.positionChangePct === null ? '' : ` ${m.positionChangePct > 0 ? '+' : ''}${m.positionChangePct}%`;
  const tag = `<span style="display:inline-block;margin-left:6px;padding:2px 7px;border-radius:999px;background:${tint};color:${tone};font-size:10px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;vertical-align:2px;white-space:nowrap;">${KIND[m.kind]}${pos}</span>`;
  return `<tr>
    <td style="${cell}">
      <div style="font-weight:700;font-size:15px;color:#0f172a;">${esc(m.ticker)}${tag}</div>
      <div style="${small}">${esc(m.name)}</div>
      <div style="${small}"><span style="color:#0f172a;font-weight:600;">${esc(m.etf)}</span> &middot; ${esc(m.themes.join(' / '))}</div>
    </td>
    <td align="right" style="${cell}text-align:right;white-space:nowrap;">
      <div style="font-weight:700;font-size:15px;color:${tone};">${money(m.value)}</div>
      <div style="${small}">${shares(m.netShares)} sh</div>
      <div style="${small}">${pp(m.weightMoved)} of fund</div>
    </td>
  </tr>`;
}

const FONT = "Geist,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
// Rendered from the site's own lockup (app/components/Logo.tsx) in Geist, 3x.
// Email clients do not show SVG, so the header uses this PNG.
const LOGO_URL = `${SITE_URL}/email/stockscout-logo.png`;

function sectionHtml(title, list, dot) {
  if (!list.length) return '';
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:26px 0 8px;"><tr>
    <td style="font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#334155;">
      <span style="display:inline-block;width:8px;height:8px;border-radius:4px;background:${dot};margin-right:7px;vertical-align:middle;"></span>${title}
      <span style="color:#94a3b8;font-weight:600;">&nbsp;${list.length}</span>
    </td></tr></table>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
    ${list.map(rowHtml).join('')}
  </table>`;
}

function statCell(value, label, color, align) {
  return `<td width="33%" align="${align}" valign="top" style="padding-top:16px;vertical-align:top;font-family:${FONT};">
    <div style="font-size:22px;line-height:1;font-weight:700;color:${color};">${value}</div>
    <div style="margin-top:6px;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#94a3b8;">${label}</div>
  </td>`;
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
  const floor = floorLabel(d);
  const n = d.movesConsidered;
  const funds = fundsWord(d);
  const managers = isActiveScope(d) ? 'Active fund managers' : 'Fund managers';
  const across = `across the ${d.fundsCompared} ${funds} I could measure today`;
  const intro = n === 0
    ? `No ${isActiveScope(d) ? 'active fund' : 'fund'} made a move of ${floor} or more ${across}.`
    : listsEveryMove(d)
      ? `${managers} made ${plural(n, 'move')} of ${floor} or more ${across}. ${n === 1 ? 'Here it is.' : `Here are all ${n}, by dollar size.`}`
      : `${managers} made ${n} moves of ${floor} or more ${across}. These are the ${d.top.length} biggest, by dollar size.`;
  const cons  = consensusLine(d);
  const tally = `${plural(buys.length, 'buy')} and ${plural(sells.length, 'sell')}`;
  const preheader = listsEveryMove(d)
    ? `${tally}, every move of ${floor} or more across ${d.fundsCompared} ${funds}.`
    : `${tally}, the biggest moves across ${d.fundsCompared} ${funds}.`;
  const activeLine = isActiveScope(d)
    ? "Only actively managed funds are covered: an index fund trades to follow its index, not on a manager's decision."
    : '';

  const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light only">
<title>The Daily Conviction</title>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  @media (max-width: 480px) {
    .ss-pad { padding-left: 18px !important; padding-right: 18px !important; }
    .ss-hide-sm { display: none !important; }
    .ss-h1 { font-size: 25px !important; }
  }
</style></head>
<body style="margin:0;padding:0;background:#eef2f6;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" bgcolor="#eef2f6" style="background:#eef2f6;">
<tr><td align="center" style="padding:24px 12px 32px;">
<table role="presentation" width="640" cellspacing="0" cellpadding="0" style="width:100%;max-width:640px;">

  ${internalNote ? `<tr><td style="padding-bottom:12px;"><div style="background:#fef3c7;border:1px solid #fcd34d;border-radius:10px;padding:10px 14px;font-family:${FONT};font-size:12px;line-height:1.5;color:#92400e;">${esc(internalNote)}</div></td></tr>` : ''}

  <!-- Header: the site's brand bar -->
  <tr><td class="ss-pad" bgcolor="#0F172A" style="background:#0F172A;border-radius:16px 16px 0 0;padding:24px 28px 22px;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr>
      <td align="left" valign="middle"><a href="${SITE_URL}" style="text-decoration:none;"><img src="${LOGO_URL}" width="186" height="32" alt="stockscout" style="display:block;border:0;outline:none;font-family:${FONT};font-size:22px;font-weight:700;color:#34D399;"></a></td>
      <td class="ss-hide-sm" align="right" valign="middle" style="font-family:${FONT};font-size:11px;font-weight:600;letter-spacing:.22em;color:#6EE7B7;">SEE IT FIRST.</td>
    </tr></table>
    <div style="height:22px;line-height:22px;font-size:0;">&nbsp;</div>
    <div style="font-family:${FONT};font-size:11px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#34D399;">From Tony, every trading day</div>
    <h1 class="ss-h1" style="margin:6px 0 4px;font-family:${FONT};font-size:30px;line-height:1.15;font-weight:700;letter-spacing:-0.5px;color:#ffffff;">The Daily Conviction</h1>
    <div style="font-family:${FONT};font-size:13px;color:#94a3b8;">${esc(longDate(d.date))}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:20px;border-top:1px solid #1e293b;"><tr>
      ${statCell(buys.length, 'Buys', '#34D399', 'left')}
      ${statCell(sells.length, 'Sells', '#FB7185', 'center')}
      ${statCell(d.fundsCompared, 'Funds measured', '#ffffff', 'right')}
    </tr></table>
  </td></tr>
  <tr><td bgcolor="#34D399" style="background:#34D399;height:3px;line-height:3px;font-size:0;">&nbsp;</td></tr>

  <!-- Body -->
  <tr><td class="ss-pad" bgcolor="#ffffff" style="background:#ffffff;border-radius:0 0 16px 16px;padding:26px 28px 28px;font-family:${FONT};color:#0f172a;">
    <p style="margin:0;font-size:15px;line-height:1.6;color:#1e293b;">${esc(intro)}</p>
    ${cons ? `<p style="margin:12px 0 0;padding:10px 14px;background:#ecfdf5;border-radius:10px;font-size:14px;line-height:1.55;color:#065f46;">${esc(cons)}</p>` : ''}
    ${sectionHtml('Top buys', buys, '#10B981')}
    ${sectionHtml('Top sells', sells, '#F43F5E')}
    <table role="presentation" cellspacing="0" cellpadding="0" style="margin:26px 0 0;"><tr>
      <td bgcolor="#10B981" style="background:#10B981;border-radius:999px;">
        <a href="${SITE_URL}" style="display:inline-block;padding:12px 24px;font-family:${FONT};font-size:14px;font-weight:700;color:#022c22;text-decoration:none;">See today&#39;s theme rankings</a>
      </td></tr></table>
    <p style="margin:24px 0 0;padding-top:18px;border-top:1px solid #e2e8f0;font-size:12px;line-height:1.65;color:#64748b;">
      <strong style="color:#334155;">How to read this.</strong> ${activeLine ? `${esc(activeLine)} ` : ''}Share counts come from each fund's published daily holdings, compared with the previous trading day.
      Each fund's own inflows and outflows are stripped out first, so what is left is the fund choosing to add or cut.
      "Of fund" is how much of the portfolio the move represents. Dollar values are estimates at the latest price.
      Only US-listed stocks and moves worth ${floor} or more make the list, so a quiet day brings a shorter one.
      Where a source shows only a fund's top 25 holdings, a stock leaving that list is not counted as a sale.
      Data, not advice.
    </p>
  </td></tr>

  <!-- Footer -->
  <tr><td align="center" style="padding:20px 16px 0;font-family:${FONT};font-size:11px;line-height:1.7;color:#94a3b8;">
    <a href="${SITE_URL}" style="color:#64748b;text-decoration:none;font-weight:600;">stockscout.io</a> &middot; See it first.<br>
    You get this because you signed up at stockscout.io.${unsubUrl ? ` <a href="${esc(unsubUrl)}" style="color:#64748b;">Unsubscribe</a>.` : ''}
  </td></tr>

</table>
</td></tr></table>
</body></html>`;

  const line = m => `  ${m.ticker} (${m.name}) | ${m.etf}, ${m.themes.join(' / ')} | ${KIND[m.kind]} ${shares(m.netShares)} sh | ${money(m.value)} | ${pp(m.weightMoved)} of fund`;
  const text = [
    ...(internalNote ? [internalNote, ''] : []),
    'THE DAILY CONVICTION', longDate(d.date), '', intro, cons, '',
    buys.length ? `BUYS (${buys.length})` : '', ...buys.map(line), '',
    sells.length ? `SELLS (${sells.length})` : '', ...sells.map(line), '',
    `${activeLine ? `${activeLine} ` : ''}Share counts from each fund's published daily holdings vs the previous trading day, with the fund's own inflows and outflows stripped out. Dollar values are estimates. Only US-listed stocks and moves worth ${floor} or more are listed. Data, not advice.`,
    SITE_URL,
    unsubUrl ? `Unsubscribe: ${unsubUrl}` : '',
  ].filter((l, i, a) => !(l === '' && a[i - 1] === '')).join('\n');

  return { html, text };
}

// ── Transport ─────────────────────────────────────────────────────────────────

const DEFAULT_FROM = 'Tony at Stockscout <tony@stockscout.io>';

// Secrets pasted into a dashboard often carry a stray space or newline, and a
// newline inside an Authorization header fails the whole request. Trim on read.
const env = name => (process.env[name] || '').trim() || undefined;

// "Name <addr>" or a bare address -> { name?, email }
function parseAddress(v) {
  const m = String(v).match(/^\s*"?([^"<]*?)"?\s*<([^>]+)>\s*$/);
  return m ? { name: m[1].trim() || undefined, email: m[2].trim() } : { email: String(v).trim() };
}

function makeSender() {
  const sendgridKey = env('SENDGRID_API_KEY');
  if (sendgridKey) {
    // Same call as Bench's lib/mailer.ts: SendGrid v3, no SDK, success = 202.
    const from = parseAddress(env('DAILY_FROM') || DEFAULT_FROM);
    const replyTo = env('DAILY_REPLY_TO') ? parseAddress(env('DAILY_REPLY_TO')) : null;
    return {
      name: `sendgrid as ${from.email}`, pause: 300,
      async send({ to, subject, html, text, headers }) {
        const body = {
          personalizations: [{ to: [{ email: to }] }],
          from,
          ...(replyTo ? { reply_to: replyTo } : {}),
          subject,
          content: [{ type: 'text/plain', value: text }, { type: 'text/html', value: html }],
          ...(headers && Object.keys(headers).length ? { headers } : {}),
          // Keep every link pointing at stockscout.io, the unsubscribe link included.
          tracking_settings: { click_tracking: { enable: false, enable_text: false }, open_tracking: { enable: false } },
        };
        const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: { Authorization: `Bearer ${sendgridKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (res.status !== 202) throw new Error(`SendGrid HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
      },
    };
  }
  return makeGmxSender();
}

// The scan report's SMTP account. Sender of last resort, and the path the
// internal copy takes when SendGrid refuses, so a refusal is never silent.
function makeGmxSender() {
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

// ── Delivery ──────────────────────────────────────────────────────────────────

// Sends one edition: to every subscriber unless the edition is held, then the
// internal copy, which on a held day is the only send and says why.
// redis is the signup store (null = preview, internal copy only).
async function deliver(d, { sender, redis, internalTo, fallback = makeGmxSender }) {
  const subject = subjectFor(d);
  const held = holdReason(d);
  const gates = gateNote(d);
  console.log(`[daily-conviction] ${subject} (via ${sender.name})`);

  let note = null;
  let sent = 0, failed = 0, total = 0;
  let firstError = null;
  const addresses = [];

  if (held) {
    console.log(`[daily-conviction] Held back from subscribers: ${held}`);
    note = `NOT SENT TO SUBSCRIBERS. ${held}`;
  } else if (!redis) {
    note = 'Preview only: the subscriber list is not connected to this workflow yet (KV_REST_API_URL and KV_REST_API_TOKEN secrets missing), so no subscriber received this.';
  } else {
    // One edition per day, even if the workflow is re-run.
    const claimed = await redis.set(`daily-conviction:sent:${d.date}`, new Date().toISOString(), { nx: true, ex: 60 * 60 * 24 * 14 });
    if (claimed !== 'OK') { console.log(`[daily-conviction] Edition ${d.date} was already sent. Skipping.`); return { held, sent, failed, total }; }

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
        firstError ??= scrub(e.message, addresses);
        console.error(`[daily-conviction] send ${sent + failed}/${total} failed: ${scrub(e.message, addresses)}`);
      }
      await sleep(sender.pause);
    }
    note = `Internal copy. Sent to ${sent} of ${total} subscribers${failed ? `, ${failed} failed. First error: ${firstError}` : ''}.`;
  }
  if (gates) note = `${note} ${gates}`;

  console.log(`[daily-conviction] Subscribers: ${sent} sent, ${failed} failed, ${total} on the list.`);

  if (internalTo) {
    const tag = held ? 'Internal, held' : 'Internal';
    const { html, text } = buildEmail(d, null, note);
    const mail = { to: internalTo, subject: `[${tag}] ${subject}`, html, text, headers: {} };
    try {
      await sender.send(mail);
      console.log('[daily-conviction] Internal copy sent.');
    } catch (e) {
      const reason = scrub(e.message, [internalTo]);
      console.error(`[daily-conviction] Internal copy failed: ${reason}`);
      // If SendGrid refused, the internal copy goes through GMX instead, with
      // the refusal stated at the top, so Gadi hears about it the same day.
      const gmx = sender.name.startsWith('sendgrid') ? fallback() : null;
      if (gmx) {
        try {
          const warned = buildEmail(d, null, `SENDGRID REFUSED THIS SEND: ${reason}. This internal copy came through GMX instead. ${note || ''}`);
          await gmx.send({ ...mail, subject: `[${tag}, SendGrid failed] ${subject}`, html: warned.html, text: warned.text });
          console.log('[daily-conviction] Internal copy sent through GMX after the SendGrid refusal.');
        } catch (e2) {
          console.error(`[daily-conviction] GMX fallback failed too: ${scrub(e2.message, [internalTo])}`);
        }
      }
    }
  } else if (held) {
    console.error('[daily-conviction] No internal address (REPORT_TO or GMX_USER), so nobody hears that today\'s edition was held.');
  }
  return { held, sent, failed, total };
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const today = process.env.MOVES_DATE || new Date().toISOString().slice(0, 10);
  if (!fs.existsSync(MOVES_PATH)) { console.log('[daily-conviction] No daily-moves.json yet. Nothing to send.'); return; }
  const d = JSON.parse(fs.readFileSync(MOVES_PATH, 'utf8'));

  if (d.date !== today) { console.log(`[daily-conviction] Edition is dated ${d.date}, not ${today}. Nothing to send.`); return; }
  if (d.status === 'seeded') { console.log('[daily-conviction] First run: the baseline was seeded today, nothing to compare yet.'); return; }

  const sender = makeSender();
  if (!sender) { console.error('[daily-conviction] No sender configured (SENDGRID_API_KEY, or GMX_USER + GMX_PASSWORD).'); return; }
  const internalTo = process.env.REPORT_TO || process.env.GMX_USER;

  const url = env('KV_REST_API_URL') ?? env('UPSTASH_REDIS_REST_URL');
  const token = env('KV_REST_API_TOKEN') ?? env('UPSTASH_REDIS_REST_TOKEN');
  const redis = url && token ? new Redis({ url, token }) : null;

  const { failed, total } = await deliver(d, { sender, redis, internalTo });
  if (failed && failed === total) process.exit(1);
}

module.exports = { buildEmail, subjectFor, holdReason, gateNote, deliver, makeSender, makeGmxSender, parseAddress };

if (require.main === module) {
  main().catch(e => { console.error(`[daily-conviction] ${scrub(e.message, [])}`); process.exit(1); });
}
