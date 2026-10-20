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
 *
 * Safety gates, added 2026-10-20 after the 6 to 19 October editions carried
 * residuals of a broken flow estimate, a currency line and two days measured
 * on 17 of 98 funds:
 *   - A fund whose estimated flow is beyond MAX_DAILY_FLOW sits the day out,
 *     named in the log and in the edition file. Every move in a fund is a
 *     residual of its flow estimate, so a wrong estimate makes every row wrong
 *     (ARKK at -38.21% on 2026-10-09, an $8B fund).
 *   - Only a priced, US-listed equity can be a move: the ticker must resolve
 *     on Yahoo to an EQUITY on a US exchange, priced in USD, under the name the
 *     fund gives it. Currency and cash lines (AIS's TWD), foreign lines with no
 *     US listing (EOAN, RENE) and foreign lines that share a US ticker (BILT's
 *     PPC, Public Power Corporation, priced as Pilgrim's Pride) never qualify.
 *   - A listed move is worth MIN_MOVE_VALUE or more. A quiet day lists fewer
 *     than TOP_N rather than padding the list with small trades.
 *   - A fund whose baseline predates the last trading day (it failed a scrape
 *     in between) is not measured that day, so several days of trades are
 *     never shown as one. Its baseline still advances.
 *   - status is 'partial' when fewer than COVERAGE_FLOOR of the tracked funds
 *     were measured. The sender then holds the edition back from subscribers.
 *
 * Active funds only (Gadi, 2026-10-20). An index fund's trades follow its
 * index (AIRR's scheduled rebalance filled 18 of 20 rows on 2026-10-19), so
 * only funds tagged active in lib/fund-management.json are tracked, compared
 * and counted toward the coverage floor. An untagged fund is left out and
 * named in the edition file, which the internal copy reports.
 */

const fs   = require('fs');
const path = require('path');
const { THEME_ETFS, isUSMarketDay, loadFundManagement } = require('./build-data-ts');
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
const MAX_DAILY_FLOW        = 0.10;  // estimated flow beyond +/-10% in a day: the fund sits the day out
const MIN_MOVE_VALUE        = 1e6;   // a listed move is worth $1M or more
const COVERAGE_FLOOR        = 0.8;   // share of tracked funds measured, or subscribers get nothing

// Yahoo exchange codes for US listings: the three Nasdaq tiers, NYSE, NYSE
// American, NYSE Arca and Cboe BZX. OTC (PNK) is not a listing.
const US_EXCHANGES = new Set(['NMS', 'NGM', 'NCM', 'NYQ', 'ASE', 'PCX', 'BTS']);
const US_SYMBOL    = /^[A-Z]{1,5}([./-][A-Z]{1,2})?$/;

const sleep = ms => new Promise(r => setTimeout(r, ms));

function etfThemes() {
  const map = {};
  for (const [theme, etfs] of Object.entries(THEME_ETFS)) {
    for (const e of etfs) (map[e] ??= []).push(theme);
  }
  return map;
}

// The funds The Daily Conviction tracks: those tagged active. mgmt is the
// `funds` map of lib/fund-management.json.
function activeUniverse(funds, mgmt) {
  const universe = [], indexFunds = [], untagged = [];
  for (const etf of funds) {
    const m = mgmt[etf]?.management;
    (m === 'active' ? universe : m === 'index' ? indexFunds : untagged).push(etf);
  }
  return { universe, indexFunds, untagged };
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

// The US trading day before `date`, by the pipeline's own market calendar.
function previousTradingDay(date) {
  const d = new Date(date + 'T12:00:00Z');
  do { d.setUTCDate(d.getUTCDate() - 1); } while (!isUSMarketDay(d.toISOString().slice(0, 10)));
  return d.toISOString().slice(0, 10);
}

// Compares every fund that has a usable baseline: same source, from an
// earlier day. Returns one { etf, flow, moves } per fund compared, and the
// funds whose baseline is stale.
function compareAll(snapshots, baseline, today, themesOf) {
  const prevDay = previousTradingDay(today);
  const results = [], stale = [], baselineDates = [];
  for (const etf of Object.keys(snapshots)) {
    const base = baseline.etfs[etf];
    const cur = snapshots[etf];
    if (!base || base.src !== cur.src || base.asOf >= today) continue;
    // A baseline from before the last trading day (the fund failed a scrape
    // since) would show several days of trades as one. Not measured today;
    // its baseline still advances in main(), so tomorrow it is one day again.
    if (base.asOf < prevDay) { stale.push(`${etf} (${base.asOf})`); continue; }
    const r = compareFund(etf, base, cur, themesOf[etf] || []);
    if (!r) continue;
    results.push({ etf, ...r });
    baselineDates.push(base.asOf);
  }
  return { results, stale, baselineDates };
}

// A fund whose flow estimate is beyond the daily bound sits the day out.
function splitByFlow(results) {
  const kept = [], excluded = [];
  for (const r of results) (Math.abs(r.flow) > MAX_DAILY_FLOW ? excluded : kept).push(r);
  return { kept, excluded };
}

// USD prices the pipeline already fetched, read from the generated data.ts.
function pricesFromDataTs(file = DATA_PATH) {
  const out = {};
  if (!fs.existsSync(file)) return out;
  // Entries span several lines (ticker on one, price on the next), so read
  // each entry as the text between one `ticker: '` and the next.
  const chunks = fs.readFileSync(file, 'utf8').split("ticker: '").slice(1);
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

// ── Listing check: is a move a priced, US-listed equity? ─────────────────────

// Same Yahoo session as build-data-ts.js (cookie, then crumb). Best effort: the
// chart endpoint usually answers without one, so a failed handshake is logged
// and the lookups go ahead.
const YF_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
let yfSession = null;
async function yahooSession() {
  if (yfSession) return yfSession;
  try {
    const r1 = await fetch('https://fc.yahoo.com', { headers: { 'User-Agent': YF_UA } });
    const cookie = (r1.headers.get('set-cookie') || '').match(/A3=[^;]+/)?.[0] || '';
    const r2 = await fetch('https://query2.finance.yahoo.com/v1/test/getcrumb', { headers: { 'User-Agent': YF_UA, Cookie: cookie } });
    const crumb = r2.ok ? (await r2.text()).trim() : '';
    yfSession = { cookie, crumb };
  } catch (e) {
    console.warn(`[Yahoo] no session, looking up without one: ${e.message}`);
    yfSession = { cookie: '', crumb: '' };
  }
  return yfSession;
}

// What Yahoo lists under a ticker: { type, exchange, currency, price, name },
// or { missing: true } when there is no such symbol. Throws on any other
// failure, so "not listed" and "could not check" stay apart.
async function fetchListing(ticker) {
  const { cookie, crumb } = await yahooSession();
  const symbol = encodeURIComponent(ticker.replace(/[./]/g, '-'));
  const url = `https://query2.finance.yahoo.com/v8/finance/chart/${symbol}?range=5d&interval=1d${crumb ? `&crumb=${encodeURIComponent(crumb)}` : ''}`;
  const res = await fetch(url, { headers: { 'User-Agent': YF_UA, Cookie: cookie, Accept: 'application/json' } });
  if (res.status === 404) return { missing: true };
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const meta = (await res.json()).chart?.result?.[0]?.meta;
  if (!meta) return { missing: true };
  return {
    type: meta.instrumentType, exchange: meta.exchangeName, currency: meta.currency,
    price: meta.regularMarketPrice, name: meta.longName || meta.shortName || '',
  };
}

// Words that say what kind of company or share it is, not which company.
const NAME_NOISE = new Set(('INC INCORPORATED CORP CORPORATION CO COMPANY LTD LIMITED PLC SA NV AG SE AB ASA ' +
  'OYJ SPA LLC LP HOLDINGS HOLDING GROUP THE AND OF CLASS CL A B C ORD SHS SHARES COMMON STOCK ADR ADS SPON ' +
  'SPONSORED REIT NEW USD').split(' '));

function nameTokens(s) {
  return String(s || '').toUpperCase().replace(/['’.]/g, '')
    .split(/[^A-Z0-9]+/).filter(t => t && !NAME_NOISE.has(t) && !/^\d+$/.test(t));
}

// Do the fund's name for a holding and the US listing's name share a word?
// A shortened word counts ("AMER ELEC PWR" is American Electric Power).
function namesMatch(fundName, listingName) {
  const a = nameTokens(fundName), b = nameTokens(listingName);
  if (!a.length || !b.length) return true;   // nothing to compare against
  return a.some(x => b.some(y => x === y || (Math.min(x.length, y.length) >= 3 && (x.startsWith(y) || y.startsWith(x)))));
}

// Is this move a priced, US-listed equity? { price } if so, else { reason }.
// knownPrice is the pipeline's own USD price for the ticker (lib/data.ts),
// preferred over Yahoo's so a stock carries one price across the site.
function listingVerdict(m, listing, knownPrice) {
  if (!US_SYMBOL.test(m.ticker)) return { reason: 'not a US ticker' };
  if (!listing || listing.error) {
    // Yahoo could not be asked. A price the pipeline already holds stands;
    // anything else cannot be checked, so it is not listed.
    return knownPrice > 0 ? { price: knownPrice } : { reason: `listing check failed${listing?.error ? ` (${listing.error})` : ''}` };
  }
  if (listing.missing) return { reason: 'no US listing' };
  if (listing.type !== 'EQUITY') return { reason: `not an equity (${listing.type || 'unknown'})` };
  if (!US_EXCHANGES.has(listing.exchange)) return { reason: `not on a US exchange (${listing.exchange || 'unknown'})` };
  if (listing.currency !== 'USD') return { reason: `priced in ${listing.currency || 'no currency'}` };
  // A fund that gives no name for a holding gives its ticker instead: nothing to compare.
  if (m.name && m.name !== m.ticker && !namesMatch(m.name, listing.name)) return { reason: `the US listing is ${listing.name}` };
  const price = knownPrice > 0 ? knownPrice : listing.price;
  return price > 0 ? { price } : { reason: 'no price' };
}

// Looks each distinct ticker up once, then checks every move against it under
// its own fund's name for the stock: two funds can use one ticker for two
// companies. Returns the priced moves and the ones that are not listed, with why.
async function qualifyMoves(moves, prices, lookup = fetchListing) {
  const tickers = [...new Set(moves.map(m => m.ticker))].filter(t => US_SYMBOL.test(t));
  const listings = {};
  let i = 0;
  async function worker() {
    while (i < tickers.length) {
      const t = tickers[i++];
      try {
        listings[t] = await lookup(t);
      } catch (e) {
        await sleep(1000);
        try { listings[t] = await lookup(t); }
        catch (e2) {
          console.warn(`[Yahoo] listing ${t}: ${e2.message}`);
          listings[t] = { error: e2.message };
        }
      }
      await sleep(150);
    }
  }
  await Promise.all([worker(), worker(), worker(), worker()]);

  const priced = [], notListed = [];
  for (const m of moves) {
    const v = listingVerdict(m, listings[m.ticker], prices[m.ticker]);
    if (v.price) {
      priced.push({ ...m, price: +v.price.toFixed(2), value: Math.round(m.netShares * v.price) });
    } else {
      notListed.push({ etf: m.etf, ticker: m.ticker, name: m.name, reason: v.reason });
    }
  }
  return { priced, notListed };
}

// ── The edition ───────────────────────────────────────────────────────────────

// The same stock moved the same way by two or more funds today.
function consensus(moves, sign) {
  const by = {};
  for (const m of moves) {
    if (Math.sign(m.netShares) !== sign) continue;
    const c = by[m.ticker] ??= { ticker: m.ticker, name: m.name, funds: [], value: 0 };
    c.funds.push(m.etf);
    c.value += m.value;
  }
  return Object.values(by)
    .filter(c => c.funds.length >= 2)
    .sort((a, b) => b.funds.length - a.funds.length || Math.abs(b.value) - Math.abs(a.value))
    .slice(0, 3);
}

// Pure: the edition file, from the day's fund comparisons (results: one
// { etf, flow, moves } per fund compared with a baseline), the funds that sat
// out on their flow, and the moves that passed the listing check.
function assembleEdition({ date, seeded, fundsTracked, fundsWithShares, fundsStale = 0, results, excluded, priced, notListed, baselineFrom, generatedAt }) {
  const listed = priced
    .filter(m => Math.abs(m.value) >= MIN_MOVE_VALUE)
    .sort((a, b) => Math.abs(b.value) - Math.abs(a.value) || Math.abs(b.weightMoved) - Math.abs(a.weightMoved));
  const measured = results.length - excluded.length;
  const coverageFloor = Math.ceil(COVERAGE_FLOOR * fundsTracked);
  const status = seeded ? 'seeded' : measured < coverageFloor ? 'partial' : 'ok';
  return {
    date,
    status,
    generatedAt: generatedAt || new Date().toISOString(),
    baselineFrom,
    fundsTracked,
    fundsWithShares,
    fundsCompared: measured,          // compared with a baseline, flow within the bound
    fundsStale,                       // baseline older than the last trading day, not measured
    coverageFloor,
    maxDailyFlowPct: MAX_DAILY_FLOW * 100,
    fundsExcluded: excluded.map(r => ({ etf: r.etf, flow: +(r.flow * 100).toFixed(2), moves: r.moves.length })),
    minMoveValue: MIN_MOVE_VALUE,
    movesConsidered: listed.length,   // priced, US-listed, at or above the dollar floor
    movesBelowFloor: priced.length - listed.length,
    notListed,
    top: listed.slice(0, TOP_N).map((m, i) => ({ rank: i + 1, ...m })),
    consensus: { buys: consensus(listed, 1), sells: consensus(listed, -1) },
    flows: Object.fromEntries(results.map(r => [r.etf, +(r.flow * 100).toFixed(2)])),
  };
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
  const { universe, indexFunds, untagged } = activeUniverse(Object.keys(themesOf), loadFundManagement());
  console.log(`Active funds tracked: ${universe.length}. Index funds left out: ${indexFunds.length}.`);
  if (untagged.length) console.log(`Not tagged active or index, left out until tagged: ${untagged.join(', ')}`);

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
  const prevDay = previousTradingDay(today);
  const { results, stale, baselineDates } = compareAll(snapshots, baseline, today, themesOf);
  const { kept, excluded } = splitByFlow(results);
  const moves = kept.flatMap(r => r.moves);
  console.log(`\nFunds with share counts: ${Object.keys(snapshots).length}/${universe.length}. Compared with a baseline: ${results.length}. Moves past the filters: ${moves.length}.`);
  if (noShares.length) console.log(`No share counts today: ${noShares.join(', ')}`);
  if (stale.length) console.log(`Baseline older than ${prevDay}, not measured today: ${stale.join(', ')}`);
  if (excluded.length) {
    console.log(`Left out today, estimated flow beyond +/-${MAX_DAILY_FLOW * 100}%: ${excluded.map(r => `${r.etf} ${(r.flow * 100).toFixed(2)}% (${r.moves.length} moves)`).join(', ')}`);
  }

  // Dollar values, for priced US-listed equities only.
  const { priced, notListed } = await qualifyMoves(moves, pricesFromDataTs());
  if (notListed.length) {
    console.log(`Not a priced US-listed equity, not listed: ${notListed.map(x => `${x.etf} ${x.ticker} (${x.name}: ${x.reason})`).join('; ')}`);
  }

  const edition = {
    ...assembleEdition({
      date: today,
      seeded: baseline.updated === null || (results.length === 0 && stale.length === 0),
      fundsTracked: universe.length,
      fundsWithShares: Object.keys(snapshots).length,
      fundsStale: stale.length,
      results, excluded, priced, notListed,
      baselineFrom: baselineDates.length ? baselineDates.sort()[0] : null,
    }),
    scope: 'active',
    fundsIndexLeftOut: indexFunds.length,
    fundsUntagged: untagged,
  };
  const { top, status } = edition;
  writeJSON(MOVES_PATH, edition);
  console.log(`Moves of $${MIN_MOVE_VALUE / 1e6}M or more: ${edition.movesConsidered} (${edition.movesBelowFloor} smaller ones not listed).`);
  console.log(`Funds measured: ${edition.fundsCompared}, coverage floor ${edition.coverageFloor} of ${universe.length}.`);
  if (status === 'partial') console.log('PARTIAL: below the coverage floor, so subscribers will not get this edition.');
  console.log(`Written → ${MOVES_PATH} (status: ${status}, ${top.length} moves)`);

  // Advance the baseline for every fund seen today; a fund that failed today
  // keeps its old snapshot, so tomorrow's edition still catches its trades.
  baseline.updated = today;
  for (const [etf, snap] of Object.entries(snapshots)) {
    const rows = {};
    for (const [t, r] of Object.entries(snap.rows)) rows[t] = { s: r.s, w: +r.w.toFixed(4), n: r.n };
    baseline.etfs[etf] = { asOf: snap.asOf, src: snap.src, truncated: snap.truncated, rows };
  }
  const tracked = new Set(universe);
  for (const etf of Object.keys(baseline.etfs)) {
    if (!tracked.has(etf)) delete baseline.etfs[etf];   // left the universe, or not an active fund
  }
  writeBaseline(baseline);
  console.log(`Written → ${BASELINE_PATH} (${Object.keys(baseline.etfs).length} funds)`);

  for (const m of top) {
    const v = `$${(Math.abs(m.value) / 1e6).toFixed(1)}M`;
    console.log(`  ${String(m.rank).padStart(2)}. ${m.etf.padEnd(5)} ${m.kind.padEnd(7)} ${m.ticker.padEnd(5)} ${String(m.netShares).padStart(12)} sh  ${v.padStart(9)}  ${m.weightMoved >= 0 ? '+' : ''}${m.weightMoved}pp`);
  }
}

module.exports = {
  compareFund, toRows, median, pricesFromDataTs, activeUniverse,
  previousTradingDay, compareAll, splitByFlow, namesMatch, listingVerdict, qualifyMoves, assembleEdition, consensus,
  TOP_N, MAX_DAILY_FLOW, MIN_MOVE_VALUE, COVERAGE_FLOOR,
};

if (require.main === module) {
  main().catch(e => { console.error(e); process.exit(1); });
}
