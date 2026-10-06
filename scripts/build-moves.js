#!/usr/bin/env node
'use strict';

/**
 * build-moves.js
 * The engine behind The Daily Conviction email.
 *
 * Compares today's holdings (lib/holdings-raw.json) with the snapshot taken at
 * the last trading-day run (lib/holdings-baseline.json), finds the biggest
 * share moves any tracked fund made, and writes them to lib/daily-moves.json.
 * Run after build-data-ts.js. Writes only on US trading days, so Monday's
 * edition compares against Friday's snapshot and catches Friday's trades.
 *
 * What counts as a move, and what does not:
 *   - Fund flows are stripped out first. When money enters an ETF, every
 *     position grows in step; that is not a decision. Each fund's flow is the
 *     median share change across positions it held both days, and a move is
 *     the change beyond that.
 *   - A move must change the position by MIN_POSITION_CHANGE and shift at
 *     least MIN_FUND_WEIGHT_MOVED of the fund, so rounding and dust drop out.
 *   - New positions and full exits are only called on complete holdings
 *     lists. Where we see a top-25 slice (StockAnalysis), a stock entering or
 *     leaving that slice is not proof of a purchase or a sale.
 *   - A big share jump with a flat portfolio weight is a split or another
 *     corporate action, not a trade, and is skipped.
 *   - The share count must really have moved in the move's direction, so a
 *     position the fund left untouched is never reported as a trade.
 * Ranked by estimated dollar value (net shares x latest price). Prices come
 * from lib/data.ts where the pipeline already has them, else from Yahoo.
 */

const fs   = require('fs');
const path = require('path');
const { THEME_ETFS, isUSMarketDay, fetchLastPrice } = require('./build-data-ts');
const { fetchStockAnalysis, SOURCE_TRUNCATED } = require('./fetch-holdings');

const LIB           = path.join(__dirname, '..', 'lib');
const RAW_PATH      = path.join(LIB, 'holdings-raw.json');
const BASELINE_PATH = path.join(LIB, 'holdings-baseline.json');
const MOVES_PATH    = path.join(LIB, 'daily-moves.json');
const DATA_PATH     = path.join(LIB, 'data.ts');

const TOP_N                 = 20;
const MIN_POSITION_CHANGE   = 0.02;  // 2% of the position, beyond fund flows
const MIN_FUND_WEIGHT_MOVED = 0.05;  // percentage points of the fund
const MIN_COMMON            = 5;     // positions held on both days, to estimate flow
const MIN_FUNDS_FOR_EDITION = 10;    // fewer comparable funds than this = not an edition

const sleep = ms => new Promise(r => setTimeout(r, ms));

function etfThemes() {
  const map = {};
  for (const [theme, etfs] of Object.entries(THEME_ETFS)) {
    for (const e of etfs) (map[e] ??= []).push(theme);
  }
  return map;
}

// ticker -> { s: shares, w: weight %, n: name }. Duplicate rows (a ticker listed
// twice by a source) are summed, so one stock is one position.
function toRows(holdings) {
  const rows = {};
  for (const h of holdings || []) {
    if (!(h.shares > 0)) continue;
    const r = rows[h.ticker] ??= { s: 0, w: 0, n: h.name || h.ticker };
    r.s += h.shares;
    r.w += h.weight || 0;
  }
  return rows;
}

function median(xs) {
  const a = [...xs].sort((x, y) => x - y);
  const m = Math.floor(a.length / 2);
  return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2;
}

// Compare one fund's two snapshots. Returns { flow, moves } or null when the
// two lists cannot be compared honestly.
function compareFund(etf, base, cur, themes) {
  const common = Object.keys(cur.rows).filter(t => base.rows[t]);
  if (common.length < MIN_COMMON) return null;

  const flow = median(common.map(t => cur.rows[t].s / base.rows[t].s)) - 1;
  const moves = [];
  const tickers = new Set([...Object.keys(cur.rows), ...Object.keys(base.rows)]);

  for (const t of tickers) {
    const b = base.rows[t];
    const c = cur.rows[t];
    let kind, netShares, weightMoved, positionChangePct = null;

    if (b && c) {
      const expected = b.s * (1 + flow);
      netShares = c.s - expected;
      const pct = netShares / expected;
      if (Math.abs(pct) < MIN_POSITION_CHANGE) continue;
      // The fund must actually have traded this way. A position left flat
      // while flows lifted the rest is not a sale (XSD and QRVO, 2026-10-06).
      if (Math.sign(c.s - b.s) !== Math.sign(netShares)) continue;
      // Split guard: shares jumped by half or more while the weight barely moved.
      const sRatio = c.s / expected;
      const wRatio = b.w > 0 ? c.w / b.w : 1;
      if ((sRatio >= 1.5 || sRatio <= 0.67) && Math.abs(wRatio - 1) < 0.15) continue;
      kind = netShares > 0 ? 'added' : 'trimmed';
      weightMoved = c.w * (netShares / c.s);
      positionChangePct = pct * 100;
    } else if (c && !b) {
      if (base.truncated) continue;   // may have been held below the visible slice
      kind = 'new';
      netShares = c.s;
      weightMoved = c.w;
    } else {
      if (cur.truncated) continue;    // may have slipped below the visible slice
      kind = 'exited';
      netShares = -b.s * (1 + flow);
      weightMoved = -b.w;
    }

    if (Math.abs(weightMoved) < MIN_FUND_WEIGHT_MOVED) continue;
    moves.push({
      etf, themes, ticker: t, name: (c || b).n, kind,
      netShares: Math.round(netShares),
      sharesBefore: b ? b.s : 0,
      sharesAfter: c ? c.s : 0,
      positionChangePct: positionChangePct === null ? null : +positionChangePct.toFixed(1),
      weightMoved: +weightMoved.toFixed(2),
      weightAfter: c ? +c.w.toFixed(2) : 0,
    });
  }
  return { flow, moves };
}

// USD prices the pipeline already fetched, read from the generated data.ts.
function pricesFromDataTs() {
  const out = {};
  if (!fs.existsSync(DATA_PATH)) return out;
  // Entries span several lines (ticker on one, price on the next), so read
  // each entry as the text between one `ticker: '` and the next.
  const chunks = fs.readFileSync(DATA_PATH, 'utf8').split("ticker: '").slice(1);
  for (const chunk of chunks) {
    const t = chunk.match(/^([A-Z]{1,5})'/);
    const price = chunk.match(/\bprice: ([\d.]+)/);
    const cur = chunk.match(/\bcurrency: '([A-Z]{3})'/);
    if (!t || !price || (cur && cur[1] !== 'USD')) continue;
    const p = parseFloat(price[1]);
    if (p > 0) out[t[1]] = p;
  }
  return out;
}

async function fillPrices(tickers, prices) {
  const missing = tickers.filter(t => !(prices[t] > 0));
  let i = 0;
  async function worker() {
    while (i < missing.length) {
      const t = missing[i++];
      const p = await fetchLastPrice(t);
      if (p) prices[t] = p;
      await sleep(150);
    }
  }
  await Promise.all([worker(), worker(), worker(), worker()]);
  return missing.filter(t => !(prices[t] > 0));
}

function writeJSON(p, obj) {
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n');
}

// Baseline is written one fund per line so the daily git diff stays readable.
function writeBaseline(baseline) {
  const lines = Object.keys(baseline.etfs).sort().map(etf => {
    const e = baseline.etfs[etf];
    return `    ${JSON.stringify(etf)}: ${JSON.stringify(e)}`;
  });
  const body = `{\n  "updated": ${JSON.stringify(baseline.updated)},\n  "etfs": {\n${lines.join(',\n')}\n  }\n}\n`;
  fs.writeFileSync(BASELINE_PATH, body);
}

async function main() {
  const today = process.env.MOVES_DATE || new Date().toISOString().slice(0, 10);
  console.log(`=== build-moves.js (${today}) ===`);

  if (!isUSMarketDay(today)) {
    console.log('Not a US trading day: baseline and daily-moves.json left as they are.');
    return;
  }

  const raw = JSON.parse(fs.readFileSync(RAW_PATH, 'utf8'));
  const meta = raw.meta || {};
  const themesOf = etfThemes();
  const universe = Object.keys(themesOf);

  const baseline = fs.existsSync(BASELINE_PATH)
    ? JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf8'))
    : { updated: null, etfs: {} };

  // A second run on the same day (a manual re-dispatch) would compare today
  // with today and overwrite the edition with an empty one. Today's stands.
  if (baseline.updated === today && !process.env.MOVES_FORCE) {
    console.log(`Baseline already advanced today (${today}): daily-moves.json left as it is.`);
    return;
  }

  // Today's snapshot per fund: the scraped list when it carries share counts,
  // otherwise StockAnalysis's top 25 (which always does).
  const snapshots = {};
  const sidecar = [];
  for (const etf of universe) {
    const list = raw.holdings?.[etf] || [];
    const rows = toRows(list);
    // Use the scraped list only when nearly every row carries a count: a row
    // without one would otherwise read as an exit.
    const covered = list.length ? list.filter(h => h.shares > 0).length / list.length : 0;
    if (Object.keys(rows).length >= MIN_COMMON && covered >= 0.9) {
      const m = meta[etf] || {};
      snapshots[etf] = { asOf: today, src: m.src || 'unknown', truncated: m.truncated !== false, rows };
    } else {
      sidecar.push(etf);
    }
  }
  if (sidecar.length) {
    console.log(`\n[Share counts via StockAnalysis] ${sidecar.join(', ')}`);
    for (const etf of sidecar) {
      const h = await fetchStockAnalysis(etf);
      const rows = toRows(h);
      if (Object.keys(rows).length >= MIN_COMMON) {
        snapshots[etf] = { asOf: today, src: 'stockanalysis', truncated: SOURCE_TRUNCATED[etf] !== false, rows };
      }
      await sleep(800);
    }
  }

  const noShares = universe.filter(e => !snapshots[e]);
  let compared = 0;
  const flows = {};
  const allMoves = [];
  const baselineDates = [];
  for (const etf of Object.keys(snapshots)) {
    const base = baseline.etfs[etf];
    const cur = snapshots[etf];
    if (!base || base.src !== cur.src || base.asOf >= today) continue;
    const r = compareFund(etf, base, cur, themesOf[etf]);
    if (!r) continue;
    compared++;
    flows[etf] = +(r.flow * 100).toFixed(2);
    baselineDates.push(base.asOf);
    allMoves.push(...r.moves);
  }
  console.log(`\nFunds with share counts: ${Object.keys(snapshots).length}/${universe.length}. Compared with a baseline: ${compared}. Moves past the filters: ${allMoves.length}.`);
  if (noShares.length) console.log(`No share counts today: ${noShares.join(', ')}`);

  // Dollar values. Rank on what we can price; an unpriced move is kept but sorts last.
  const prices = pricesFromDataTs();
  const unpriced = await fillPrices([...new Set(allMoves.map(m => m.ticker))], prices);
  if (unpriced.length) console.log(`No USD price for: ${unpriced.join(', ')}`);
  for (const m of allMoves) {
    const p = prices[m.ticker];
    m.price = p ? +p.toFixed(2) : null;
    m.value = p ? Math.round(m.netShares * p) : null;
  }
  allMoves.sort((a, b) => Math.abs(b.value ?? 0) - Math.abs(a.value ?? 0) || Math.abs(b.weightMoved) - Math.abs(a.weightMoved));

  const top = allMoves.slice(0, TOP_N).map((m, i) => ({ rank: i + 1, ...m }));

  // Consensus: the same stock moved the same way by two or more funds today.
  function consensus(sign) {
    const by = {};
    for (const m of allMoves) {
      if (Math.sign(m.netShares) !== sign) continue;
      const c = by[m.ticker] ??= { ticker: m.ticker, name: m.name, funds: [], value: 0 };
      c.funds.push(m.etf);
      c.value += m.value ?? 0;
    }
    return Object.values(by)
      .filter(c => c.funds.length >= 2)
      .sort((a, b) => b.funds.length - a.funds.length || Math.abs(b.value) - Math.abs(a.value))
      .slice(0, 3);
  }

  const status = baseline.updated === null || compared === 0
    ? 'seeded'
    : compared < MIN_FUNDS_FOR_EDITION ? 'thin' : 'ok';

  writeJSON(MOVES_PATH, {
    date: today,
    status,
    generatedAt: new Date().toISOString(),
    baselineFrom: baselineDates.length ? baselineDates.sort()[0] : null,
    fundsTracked: universe.length,
    fundsWithShares: Object.keys(snapshots).length,
    fundsCompared: compared,
    movesConsidered: allMoves.length,
    top,
    consensus: { buys: consensus(1), sells: consensus(-1) },
    flows,
  });
  console.log(`Written → ${MOVES_PATH} (status: ${status}, ${top.length} moves)`);

  // Advance the baseline for every fund seen today; a fund that failed today
  // keeps its old snapshot, so tomorrow's edition still catches its trades.
  baseline.updated = today;
  for (const [etf, snap] of Object.entries(snapshots)) {
    const rows = {};
    for (const [t, r] of Object.entries(snap.rows)) rows[t] = { s: r.s, w: +r.w.toFixed(4), n: r.n };
    baseline.etfs[etf] = { asOf: snap.asOf, src: snap.src, truncated: snap.truncated, rows };
  }
  for (const etf of Object.keys(baseline.etfs)) {
    if (!themesOf[etf]) delete baseline.etfs[etf];   // fund left the universe
  }
  writeBaseline(baseline);
  console.log(`Written → ${BASELINE_PATH} (${Object.keys(baseline.etfs).length} funds)`);

  for (const m of top) {
    const v = m.value === null ? 'n/a' : `$${(Math.abs(m.value) / 1e6).toFixed(1)}M`;
    console.log(`  ${String(m.rank).padStart(2)}. ${m.etf.padEnd(5)} ${m.kind.padEnd(7)} ${m.ticker.padEnd(5)} ${String(m.netShares).padStart(12)} sh  ${v.padStart(9)}  ${m.weightMoved >= 0 ? '+' : ''}${m.weightMoved}pp`);
  }
}

module.exports = { compareFund, toRows, median, pricesFromDataTs };

if (require.main === module) {
  main().catch(e => { console.error(e); process.exit(1); });
}
