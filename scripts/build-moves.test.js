'use strict';

// Safety gates of The Daily Conviction engine. Run: node --test scripts/*.test.js
// The cases are the faults found in the 6 to 19 October 2026 editions.

const test = require('node:test');
const assert = require('node:assert');
const {
  compareFund, splitByFlow, namesMatch, listingVerdict, qualifyMoves, assembleEdition,
  MAX_DAILY_FLOW, MIN_MOVE_VALUE, TOP_N,
} = require('./build-moves');

const NASDAQ = (name, price = 100) => ({ type: 'EQUITY', exchange: 'NMS', currency: 'USD', price, name });
const move = (over = {}) => ({
  etf: 'XSD', themes: ['Semiconductors'], ticker: 'MU', name: 'MICRON TECHNOLOGY', kind: 'added',
  netShares: 10000, sharesBefore: 100000, sharesAfter: 110000, positionChangePct: 10, weightMoved: 0.4, weightAfter: 4.4,
  ...over,
});

// ── Gate 1: implausible fund flows ───────────────────────────────────────────

test('a fund whose flow is beyond the daily bound sits the day out', () => {
  const results = [
    { etf: 'ARKK', flow: -0.3821, moves: [move({ etf: 'ARKK' })] },   // 2026-10-09
    { etf: 'ARKK2', flow: 0.2032, moves: [] },                         // 2026-10-08 and 10-16
    { etf: 'XSD', flow: 0.0211, moves: [move()] },
    { etf: 'EDGE', flow: MAX_DAILY_FLOW, moves: [] },                  // on the bound: stays in
  ];
  const { kept, excluded } = splitByFlow(results);
  assert.deepStrictEqual(excluded.map(r => r.etf), ['ARKK', 'ARKK2']);
  assert.deepStrictEqual(kept.map(r => r.etf), ['XSD', 'EDGE']);
});

test('the flow estimate a fund is judged on is the one compareFund makes', () => {
  // Every position down 38%: the median says -38%, a residual-free day.
  const rows = s => Object.fromEntries(['A', 'B', 'C', 'D', 'E', 'F'].map(t => [t, { s, w: 10, n: t }]));
  const r = compareFund('ARKK', { rows: rows(1000), truncated: false }, { rows: rows(618), truncated: false }, ['AI']);
  assert.ok(Math.abs(r.flow + 0.382) < 1e-9);
  assert.strictEqual(splitByFlow([{ etf: 'ARKK', ...r }]).excluded.length, 1);
});

// ── Gate 2: only priced, US-listed equities ──────────────────────────────────

test('a currency line is never a move (AIS TWD, 2026-10-14)', () => {
  const v = listingVerdict(move({ ticker: 'TWD', name: 'NEW TAIWAN DOLLAR' }), { type: 'ECNQUOTE', exchange: 'NMS' }, undefined);
  assert.match(v.reason, /not an equity/);
});

test('a foreign line with no US listing is never a move (EOAN, RENE)', () => {
  assert.strictEqual(listingVerdict(move({ ticker: 'EOAN', name: 'E.ON N' }), { missing: true }).reason, 'no US listing');
  assert.strictEqual(listingVerdict(move({ ticker: '005930', name: 'SAMSUNG' }), undefined).reason, 'not a US ticker');
});

test('a foreign line sharing a US ticker is never a move (BILT PPC, CWY)', () => {
  const ppc = listingVerdict(move({ etf: 'BILT', ticker: 'PPC', name: 'PUBLIC POWER CORPORATION SA' }), NASDAQ("Pilgrim's Pride Corporation", 28.85));
  assert.match(ppc.reason, /Pilgrim's Pride/);
  const cwy = listingVerdict(move({ etf: 'BILT', ticker: 'CWY', name: 'CLEANAWAY WASTE MANAGEMENT' }),
    { type: 'ETF', exchange: 'NGM', currency: 'USD', price: 13.78, name: 'GraniteShares YieldBOOST CRWV ETF' });
  assert.match(cwy.reason, /not an equity \(ETF\)/);
});

test('OTC and non-USD listings do not count as US-listed', () => {
  assert.match(listingVerdict(move({ ticker: 'TOELY', name: 'TOKYO ELECTRON' }), { ...NASDAQ('Tokyo Electron Ltd'), exchange: 'PNK' }).reason, /not on a US exchange/);
  assert.match(listingVerdict(move(), { ...NASDAQ('Micron Technology, Inc.'), currency: 'CAD' }).reason, /priced in CAD/);
});

test('a real US equity qualifies, at the pipeline price when it has one', () => {
  assert.deepStrictEqual(listingVerdict(move(), NASDAQ('Micron Technology, Inc.', 904.9), 941.94), { price: 941.94 });
  assert.deepStrictEqual(listingVerdict(move(), NASDAQ('Micron Technology, Inc.', 904.9), undefined), { price: 904.9 });
  // A source with no name for a holding repeats the ticker: nothing to compare.
  assert.deepStrictEqual(listingVerdict(move({ ticker: 'NVDA', name: 'NVDA' }), NASDAQ('NVIDIA Corporation', 180)), { price: 180 });
});

test('when Yahoo cannot be asked, only a price the pipeline holds stands', () => {
  assert.deepStrictEqual(listingVerdict(move(), { error: 'HTTP 429' }, 941.94), { price: 941.94 });
  assert.match(listingVerdict(move(), { error: 'HTTP 429' }, undefined).reason, /listing check failed/);
});

test('names match across the ways funds and Yahoo write them', () => {
  assert.ok(namesMatch('INTL BUSINESS MACHINES', 'International Business Machines Corporation'));
  assert.ok(namesMatch('AMER ELEC PWR', 'American Electric Power Company, Inc.'));
  assert.ok(namesMatch('META PLATFORMS INC-CLASS A', 'Meta Platforms, Inc.'));
  assert.ok(namesMatch('AT&T INC', 'AT&T Inc.'));
  assert.ok(namesMatch('ILLUMINA INC USD 0.01', 'Illumina, Inc.'));
  assert.ok(namesMatch('TAIWAN SEMICONDUCTOR-SP ADR', 'Taiwan Semiconductor Manufacturing Company Limited'));
  assert.ok(!namesMatch('KEYERA', 'KeyCorp'));
  assert.ok(!namesMatch('DALRYMPLE BAY INFRASTRUCTURE STAPL', 'Designer Brands Inc.'));
  assert.ok(!namesMatch('ATLAS ARTERIA STAPLED UNITS', "Alexander's, Inc."));
  assert.ok(!namesMatch('AIRBUS', 'AAR Corp.'));
});

test('qualifyMoves looks each ticker up once and judges each move under its own name', async () => {
  const calls = [];
  const lookup = async t => { calls.push(t); return t === 'PPC' ? NASDAQ("Pilgrim's Pride Corporation", 28.85) : NASDAQ('Micron Technology, Inc.', 900); };
  const moves = [
    move(), move({ etf: 'DRAM' }),
    move({ etf: 'BILT', ticker: 'PPC', name: 'PUBLIC POWER CORPORATION SA' }),
    move({ etf: 'FOOD', ticker: 'PPC', name: "PILGRIM'S PRIDE CORP" }),
  ];
  const { priced, notListed } = await qualifyMoves(moves, { MU: 941.94 }, lookup);
  assert.deepStrictEqual(calls.sort(), ['MU', 'PPC']);
  assert.deepStrictEqual(priced.map(m => `${m.etf} ${m.ticker} ${m.value}`), ['XSD MU 9419400', 'DRAM MU 9419400', 'FOOD PPC 288500']);
  assert.deepStrictEqual(notListed.map(x => `${x.etf} ${x.ticker}`), ['BILT PPC']);
});

// ── Gates 3 and 4: coverage floor and dollar floor ───────────────────────────

const priced = (n, value) => Array.from({ length: n }, (_, i) =>
  move({ etf: `F${i}`, ticker: `T${i}`, netShares: value > 0 ? 1 : -1, value, price: Math.abs(value) }));
const fundResults = n => Array.from({ length: n }, (_, i) => ({ etf: `F${i}`, flow: 0.01, moves: [] }));

function edition(over = {}) {
  return assembleEdition({
    date: '2026-10-13', seeded: false, fundsTracked: 98, fundsWithShares: 97,
    results: fundResults(97), excluded: [], priced: [], notListed: [], baselineFrom: '2026-10-12',
    generatedAt: '2026-10-13T13:41:00Z', ...over,
  });
}

test('moves under the dollar floor are not listed, and a quiet day is not padded (10-13)', () => {
  const ed = edition({ priced: [...priced(4, 3e6), ...priced(14, -85000)] });
  assert.strictEqual(ed.movesConsidered, 4);
  assert.strictEqual(ed.movesBelowFloor, 14);
  assert.strictEqual(ed.top.length, 4);
  assert.ok(ed.top.every(m => Math.abs(m.value) >= MIN_MOVE_VALUE));
  assert.strictEqual(ed.status, 'ok');
});

test('a busy day still lists the biggest TOP_N, ranked by dollar size', () => {
  const ed = edition({ priced: [...priced(30, 2e6), move({ ticker: 'BIG', value: -9e6, netShares: -1 })] });
  assert.strictEqual(ed.top.length, TOP_N);
  assert.strictEqual(ed.movesConsidered, 31);
  assert.strictEqual(ed.top[0].ticker, 'BIG');
});

test('17 of 98 funds measured is a partial edition (10-16, 10-19)', () => {
  const ed = edition({ fundsWithShares: 17, results: fundResults(17), priced: priced(20, 5e7) });
  assert.strictEqual(ed.coverageFloor, 79);
  assert.strictEqual(ed.fundsCompared, 17);
  assert.strictEqual(ed.status, 'partial');
});

test('funds that sit out on their flow do not count as measured', () => {
  const results = fundResults(80);
  const excluded = results.slice(0, 2);
  const ed = edition({ results, excluded });
  assert.strictEqual(ed.fundsCompared, 78);
  assert.strictEqual(ed.status, 'partial');
  assert.deepStrictEqual(ed.fundsExcluded.map(f => f.etf), ['F0', 'F1']);
});

test('consensus counts only listed moves', () => {
  const small = ['A', 'B'].map(etf => move({ etf, ticker: 'TINY', value: 50000, price: 5 }));
  const big = ['A', 'B'].map(etf => move({ etf, ticker: 'BIG', value: 2e6, price: 200 }));
  const ed = edition({ priced: [...small, ...big] });
  assert.deepStrictEqual(ed.consensus.buys.map(c => c.ticker), ['BIG']);
});
