'use strict';

// The Daily Conviction sender: who gets an edition, and how a short one reads.
// Run: node --test scripts/*.test.js

const test = require('node:test');
const assert = require('node:assert');
const { buildEmail, subjectFor, holdReason, gateNote, deliver } = require('./send-daily-conviction');

const row = (i, value) => ({
  rank: i + 1, etf: 'XSD', themes: ['Semiconductors'], ticker: `T${i}`, name: `Company ${i}`,
  kind: value > 0 ? 'added' : 'trimmed', netShares: value > 0 ? 1000 : -1000, positionChangePct: 5,
  weightMoved: 0.3, weightAfter: 3, price: Math.abs(value) / 1000, value,
});

function edition(over = {}) {
  return {
    date: '2026-10-13', status: 'ok', fundsTracked: 98, fundsWithShares: 97, fundsCompared: 96,
    coverageFloor: 79, maxDailyFlowPct: 10, fundsExcluded: [], minMoveValue: 1e6,
    movesConsidered: 5, movesBelowFloor: 13, notListed: [],
    top: [row(0, -3.3e6), row(1, 2.1e6), row(2, 1.8e6), row(3, -1.2e6), row(4, 1.1e6)],
    consensus: { buys: [], sells: [] }, flows: {},
    ...over,
  };
}
const full = () => edition({ movesConsidered: 34, top: Array.from({ length: 20 }, (_, i) => row(i, (40 - i) * 1e6)) });

const DASHES = new RegExp(`[${String.fromCharCode(0x2013, 0x2014)}]`);   // en dash, em dash

// ── Gate 3: who gets the edition ─────────────────────────────────────────────

test('a partial edition is held, with the reason', () => {
  const d = edition({ status: 'partial', fundsWithShares: 17, fundsCompared: 15, fundsExcluded: [{ etf: 'ARKK', flow: 20.32, moves: 2 }, { etf: 'VOLT', flow: 12.13, moves: 0 }] });
  assert.strictEqual(holdReason(d), 'Only 15 of the 98 tracked funds were measured today, below the floor of 79 (81 had no share counts, 2 sat out on an implausible flow).');
});

test('the first edition after a scrape outage is held: stale baselines are not measured', () => {
  const d = edition({ status: 'partial', fundsWithShares: 98, fundsStale: 81, fundsCompared: 17 });
  assert.strictEqual(holdReason(d), 'Only 17 of the 98 tracked funds were measured today, below the floor of 79 (81 had a baseline older than the last trading day).');
});

test('an edition file without a floor is still held on low coverage', () => {
  assert.match(holdReason(edition({ coverageFloor: undefined, fundsCompared: 17 })), /below the floor of 79/);
});

test('fewer than three listed moves is held; a short list of five is sent', () => {
  assert.match(holdReason(edition({ movesConsidered: 2, top: [row(0, 3e6), row(1, 2e6)] })), /Only 2 moves of \$1M or more/);
  assert.strictEqual(holdReason(edition()), null);
});

function fakes() {
  const sent = [];
  const redisCalls = [];
  const sender = { name: 'test', pause: 0, async send(m) { sent.push(m); } };
  const redis = {
    async set(...a) { redisCalls.push(['set', ...a]); return 'OK'; },
    async smembers() { redisCalls.push(['smembers']); return ['a@example.com', 'b@example.com']; },
    async hget() { return 'utoken'; },
    async hset() {},
  };
  return { sent, redisCalls, sender, redis };
}

test('a held edition goes to the internal address only, and the list is never read', async () => {
  const { sent, redisCalls, sender, redis } = fakes();
  const d = edition({ status: 'partial', fundsWithShares: 17, fundsCompared: 17 });
  const r = await deliver(d, { sender, redis, internalTo: 'team@example.com', fallback: () => null });
  assert.ok(r.held);
  assert.strictEqual(redisCalls.length, 0);
  assert.strictEqual(sent.length, 1);
  assert.strictEqual(sent[0].to, 'team@example.com');
  assert.match(sent[0].subject, /^\[Internal, held\] /);
  assert.match(sent[0].text, /NOT SENT TO SUBSCRIBERS\. Only 17 of the 98/);
});

test('a full-coverage edition reaches subscribers, then the internal copy with the gate note', async () => {
  const { sent, sender, redis } = fakes();
  const d = edition({ fundsExcluded: [{ etf: 'CNEQ', flow: 11.72, moves: 2 }], notListed: [{ etf: 'BILT', ticker: 'PPC', name: 'PUBLIC POWER CORPORATION SA', reason: "the US listing is Pilgrim's Pride Corporation" }] });
  await deliver(d, { sender, redis, internalTo: 'team@example.com', fallback: () => null });
  assert.deepStrictEqual(sent.map(m => m.to), ['a@example.com', 'b@example.com', 'team@example.com']);
  // Our own data faults stay in the internal copy (non-negotiable 14).
  for (const m of sent.slice(0, 2)) assert.doesNotMatch(m.text + m.html, /CNEQ|PPC|Pilgrim/);
  assert.match(sent[2].text, /Sat out, estimated flow beyond \+\/-10%: CNEQ \+11\.72% \(2 moves\)\./);
  assert.match(sent[2].text, /Not a priced US-listed equity: BILT PPC/);
});

// ── Gate 4: a short list reads as a short list ───────────────────────────────

test('a short list says it is every move, not the 20 biggest', () => {
  const d = edition();
  const { text, html } = buildEmail(d, null, null);
  assert.match(text, /Fund managers made 5 moves of \$1M or more across the 96 funds I could measure today\. Here are all 5, by dollar size\./);
  assert.doesNotMatch(text + html, /20 biggest|meaningful moves/);
  assert.match(html, /3 buys and 2 sells, every move of \$1M or more across 96 funds\./);
  assert.strictEqual(subjectFor(d), 'The Daily Conviction, Oct 13: 5 moves over $1M, led by XSD cutting $3.3M of T0');
});

test('a busy day keeps the top-20 copy and the lead-move subject', () => {
  const d = full();
  const { text } = buildEmail(d, null, null);
  assert.match(text, /Fund managers made 34 moves of \$1M or more across the 96 funds I could measure today\. These are the 20 biggest, by dollar size\./);
  assert.strictEqual(subjectFor(d), 'The Daily Conviction, Oct 13: XSD added $40.0M of T0');
});

test('one buy and no moves read correctly', () => {
  const one = edition({ movesConsidered: 1, top: [row(0, 2e6)] });
  assert.match(buildEmail(one, null, null).html, /1 buy and 0 sells, every move/);
  assert.match(buildEmail(one, null, null).text, /made 1 move of \$1M or more .* Here it is\./);
  const none = edition({ movesConsidered: 0, top: [] });
  assert.match(buildEmail(none, null, null).text, /No fund made a move of \$1M or more across the 96 funds/);
  assert.strictEqual(subjectFor(none), 'The Daily Conviction, Oct 13: no moves of $1M or more');
});

test('new positions and exits lead a short-list subject without a dollar size', () => {
  const d = edition({ top: [{ ...row(0, 5e6), kind: 'new' }, ...edition().top.slice(1)] });
  assert.strictEqual(subjectFor(d), 'The Daily Conviction, Oct 13: 5 moves over $1M, led by XSD opening T0');
});

test('no em or en dashes in any copy', () => {
  for (const d of [edition(), full(), edition({ movesConsidered: 0, top: [] })]) {
    const { html, text } = buildEmail(d, 'https://stockscout.io/api/unsubscribe?e=x&t=y', 'note');
    assert.doesNotMatch(subjectFor(d) + html + text, DASHES);
  }
  const held = edition({ status: 'partial', fundsCompared: 15, fundsExcluded: [{ etf: 'ARKK', flow: -38.21, moves: 12 }], notListed: [{ etf: 'AIS', ticker: 'TWD', reason: 'not an equity (ECNQUOTE)' }] });
  assert.doesNotMatch(holdReason(held) + gateNote(held), DASHES);
});
