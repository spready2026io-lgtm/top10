#!/usr/bin/env node
'use strict';

/**
 * build-data-ts.js
 * Reads lib/holdings-raw.json, scores all equities per theme,
 * fetches live financials from Yahoo Finance, writes lib/data.ts.
 *
 * Only replaces the @@GENERATED@@ sections — all static chart/ETF
 * constants in data.ts are preserved as-is.
 */

const fs   = require('fs');
const path = require('path');

const YF_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
let _yfCookie = null;
let _yfCrumb  = null;

async function yfInit() {
  if (_yfCrumb) return;
  const r1 = await fetch('https://fc.yahoo.com', { headers: { 'User-Agent': YF_UA } });
  const raw = r1.headers.get('set-cookie') || '';
  _yfCookie = raw.match(/A3=[^;]+/)?.[0] || '';
  const r2 = await fetch('https://query2.finance.yahoo.com/v1/test/getcrumb', {
    headers: { 'User-Agent': YF_UA, 'Cookie': _yfCookie },
  });
  _yfCrumb = await r2.text();
  console.log(`[Yahoo] crumb obtained`);
}

const RAW_PATH     = path.join(__dirname, '..', 'lib', 'holdings-raw.json');
const DATA_PATH    = path.join(__dirname, '..', 'lib', 'data.ts');
const REPORT_PATH  = path.join(__dirname, '..', 'lib', 'scan-report.json');
const HISTORY_PATH = path.join(__dirname, '..', 'lib', 'history.json');

// ── Theme → ETF mapping (must match data.ts THEME_ETFS) ─────────────────────

const THEME_ETFS = {
  'AI & ML':        ['AIS', 'ARTY', 'BAI', 'IVEP', 'IGPT', 'IVES', 'ALAI', 'CHAT'],
  'Semiconductors': ['SOXX', 'PSI', 'XSD', 'DRAM'],
  'Broad Tech':     ['QQQ', 'QQQA', 'PTF', 'WCLD', 'MAGS', 'IGV', 'FDTX', 'GTEK', 'ARKK', 'MARS'],
  'Electrification':['POW', 'VOLT', 'PBD', 'PBW'],
  'Industrials':    ['AIRR', 'PRN'],
};

const TOP_N = 20; // equities to show per theme

// ── Yahoo Finance ─────────────────────────────────────────────────────────────

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── US market calendar ────────────────────────────────────────────────────────

// Returns NYSE observed holiday dates for a given year as [month, day] pairs.
function usMarketHolidays(year) {
  const out = [];

  // Shift fixed-date holiday to observed trading day (Sat→Fri, Sun→Mon)
  function observed(mo, dy) {
    const dt = new Date(Date.UTC(year, mo - 1, dy));
    const dow = dt.getUTCDay();
    if (dow === 6) dt.setUTCDate(dy - 1);
    else if (dow === 0) dt.setUTCDate(dy + 1);
    return [dt.getUTCMonth() + 1, dt.getUTCDate()];
  }

  // nth weekday of month (n>0 from start, n<0 from end). weekday: 0=Sun…6=Sat
  function nthWeekday(mo, weekday, n) {
    if (n > 0) {
      const first = new Date(Date.UTC(year, mo - 1, 1));
      const diff  = (weekday - first.getUTCDay() + 7) % 7;
      return 1 + diff + (n - 1) * 7;
    }
    const last = new Date(Date.UTC(year, mo, 0));
    const diff = (last.getUTCDay() - weekday + 7) % 7;
    return last.getUTCDate() - diff;
  }

  // Good Friday — 2 days before Easter (Anonymous Gregorian algorithm)
  function goodFriday() {
    const a = year % 19, b = Math.floor(year / 100), c = year % 100;
    const d = Math.floor(b / 4), e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4), k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m2 = Math.floor((a + 11 * h + 22 * l) / 451);
    const emo = Math.floor((h + l - 7 * m2 + 114) / 31);
    const edy = ((h + l - 7 * m2 + 114) % 31) + 1;
    const easter = new Date(Date.UTC(year, emo - 1, edy));
    easter.setUTCDate(easter.getUTCDate() - 2);
    return [easter.getUTCMonth() + 1, easter.getUTCDate()];
  }

  out.push(observed(1, 1));                    // New Year's Day
  out.push([1, nthWeekday(1, 1, 3)]);          // MLK Day (3rd Mon Jan)
  out.push([2, nthWeekday(2, 1, 3)]);          // Presidents' Day (3rd Mon Feb)
  out.push(goodFriday());                       // Good Friday
  out.push([5, nthWeekday(5, 1, -1)]);         // Memorial Day (last Mon May)
  if (year >= 2022) out.push(observed(6, 19)); // Juneteenth
  out.push(observed(7, 4));                     // Independence Day
  out.push([9, nthWeekday(9, 1, 1)]);          // Labor Day (1st Mon Sep)
  out.push([11, nthWeekday(11, 4, 4)]);        // Thanksgiving (4th Thu Nov)
  out.push(observed(12, 25));                   // Christmas Day
  return out;
}

// Returns true only on NYSE trading days (excludes weekends and US market holidays).
function isUSMarketDay(dateStr) {
  const dt  = new Date(dateStr + 'T12:00:00Z');
  const dow = dt.getUTCDay();
  if (dow === 0 || dow === 6) return false;
  const mo  = dt.getUTCMonth() + 1;
  const dy  = dt.getUTCDate();
  return !usMarketHolidays(dt.getUTCFullYear()).some(([hm, hd]) => hm === mo && hd === dy);
}

// ── Velocity Score helpers ────────────────────────────────────────────────────

function offsetDate(dateStr, days) {
  const d = new Date(dateStr + 'T12:00:00Z');
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function findClosestHistoryDate(history, targetDateStr, toleranceDays, excludeDate) {
  const target = new Date(targetDateStr + 'T12:00:00Z').getTime();
  let best = null;
  let bestDiff = Infinity;
  for (const d of Object.keys(history)) {
    if (d === excludeDate) continue;
    const diff = Math.abs(new Date(d + 'T12:00:00Z').getTime() - target);
    if (diff < bestDiff && diff <= toleranceDays * 86400000) {
      bestDiff = diff;
      best = d;
    }
  }
  return best;
}

// Returns { '1D': number|null, '1W': number|null, '1M': number|null, '6M': number|null }
// Uses history BEFORE today's snapshot is appended (todayStr is excluded).
function calcVelocityScore(history, todayStr, theme, ticker, currentScore) {
  const PERIODS = { '1D': [1, 2], '1W': [7, 3], '1M': [30, 5], '6M': [182, 14] };
  const result = {};
  for (const [period, [daysBack, tolerance]] of Object.entries(PERIODS)) {
    const targetDate  = offsetDate(todayStr, -daysBack);
    const closestDate = findClosestHistoryDate(history, targetDate, tolerance, todayStr);
    if (!closestDate) { result[period] = null; continue; }
    const pastScore = history[closestDate]?.[theme]?.[ticker];
    if (!pastScore) { result[period] = null; continue; }
    result[period] = parseFloat(((currentScore / pastScore - 1) * 100).toFixed(1));
  }
  return result;
}

// A ticker is "new" if it was NOT in the most recent previous snapshot for this theme.
function isNewEntrant(history, todayStr, theme, ticker) {
  const prevDates = Object.keys(history).filter(d => d < todayStr).sort().reverse();
  if (prevDates.length === 0) return false;
  return !(ticker in (history[prevDates[0]]?.[theme] ?? {}));
}

function formatMarketCap(n) {
  if (!n || isNaN(n)) return 'N/A';
  if (n >= 1e12) return `$${(n / 1e12).toFixed(1)}T`;
  if (n >= 1e9)  return `$${(n / 1e9).toFixed(0)}B`;
  return `$${(n / 1e6).toFixed(0)}M`;
}

// currentPrice = regularMarketPrice from quoteSummary — used as the return numerator
// so that percentages match what Yahoo Finance displays (today's price vs. historical close),
// not yesterday's close vs. historical close (which is what last.close would give mid-session).
async function fetchChartReturns(ticker, currentPrice) {
  try {
    const url = `https://query2.finance.yahoo.com/v8/finance/chart/${ticker}?range=1y&interval=1d&crumb=${encodeURIComponent(_yfCrumb)}`;
    const res = await fetch(url, {
      headers: { 'User-Agent': YF_UA, 'Cookie': _yfCookie, 'Accept': 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const result = data.chart?.result?.[0];
    if (!result) throw new Error('No chart result');

    const timestamps = result.timestamp;
    const closes     = result.indicators.quote[0].close;

    const valid = timestamps
      .map((ts, i) => ({ ts, close: closes[i] }))
      .filter(d => d.close != null);

    if (valid.length < 10) throw new Error('Insufficient data');

    const lastTs   = valid[valid.length - 1].ts;
    const lastDate = new Date(lastTs * 1000);

    // Calendar-aware lookback: avoids fixed-day approximations that land on the
    // wrong trading day (e.g. Nov→May is 181 days, not 182, causing 6M to be off).
    const calTs = (months, years = 0) => {
      const d = new Date(lastDate);
      d.setMonth(d.getMonth() - months);
      d.setFullYear(d.getFullYear() - years);
      return Math.floor(d.getTime() / 1000);
    };

    const closest = targetTs => valid.reduce((best, d) =>
      Math.abs(d.ts - targetTs) < Math.abs(best.ts - targetTs) ? d : best
    ).close;

    const ret = (startClose) =>
      parseFloat(((currentPrice / startClose - 1) * 100).toFixed(1));

    return {
      '1M': ret(closest(calTs(1))),
      '6M': ret(closest(calTs(6))),
      '1Y': ret(closest(calTs(0, 1))),
    };
  } catch (e) {
    console.warn(`  [Yahoo Chart] ${ticker} returns failed: ${e.message}`);
    return { '1M': 0, '6M': 0, '1Y': 0 };
  }
}

async function fetchFinancials(ticker) {
  await yfInit();
  try {
    const modules = 'price,defaultKeyStatistics,financialData,summaryDetail';
    const url = `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${ticker}?modules=${modules}&crumb=${encodeURIComponent(_yfCrumb)}`;
    const res = await fetch(url, {
      headers: { 'User-Agent': YF_UA, 'Cookie': _yfCookie, 'Accept': 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const r = data.quoteSummary?.result?.[0];
    if (!r) throw new Error('No result');

    const price         = r.price?.regularMarketPrice?.raw ?? 0;
    const marketCap     = formatMarketCap(r.price?.marketCap?.raw);
    const pe            = r.summaryDetail?.trailingPE?.raw != null
                          ? parseFloat(r.summaryDetail.trailingPE.raw.toFixed(1)) : null;
    const eps           = parseFloat((r.defaultKeyStatistics?.trailingEps?.raw ?? 0).toFixed(2));
    const grossMargin   = Math.round((r.financialData?.grossMargins?.raw ?? 0) * 100);
    const revenueGrowth = Math.round((r.financialData?.revenueGrowth?.raw ?? 0) * 100);
    const divYield      = r.summaryDetail?.dividendYield?.raw != null
                          ? parseFloat((r.summaryDetail.dividendYield.raw * 100).toFixed(2)) : null;
    const weeklyChange  = parseFloat(((r.price?.regularMarketChangePercent?.raw ?? 0) * 100).toFixed(2));
    const weeklyPrices  = [];

    const periodReturns = await fetchChartReturns(ticker, price);

    return { price: parseFloat(price.toFixed(2)), weeklyChange, weeklyPrices, periodReturns, marketCap, pe, eps, grossMargin, revenueGrowth, dividendYield: divYield };

  } catch (e) {
    console.warn(`  [Yahoo] ${ticker} failed: ${e.message}`);
    return null;
  }
}

// ── Scoring engine ───────────────────────────────────────────────────────────

function scoreTheme(themeName, themeEtfs, holdingsMap) {
  const availableEtfs = themeEtfs.filter(etf => holdingsMap[etf]);
  if (availableEtfs.length === 0) return { equities: [], etfCount: 0 };

  // Aggregate: for each equity, track which ETFs hold it and at what weight
  const equityMap = {}; // ticker -> { name, etfs: [{ etf, weight }] }

  for (const etf of availableEtfs) {
    for (const holding of holdingsMap[etf]) {
      const t = holding.ticker;
      if (!equityMap[t]) equityMap[t] = { name: holding.name, etfs: [] };
      equityMap[t].etfs.push({ etf, weight: holding.weight });
    }
  }

  // Score each equity
  // proScore = avgWeight × sqrt(coverage%) — Option A confidence-adjusted average.
  // Breadth (how many ETFs hold it) damps the raw average via square-root scaling:
  // held by 100% of ETFs → full average; held by 25% → half the average.
  // Coverage is relative to availableEtfs (ETFs with real data), not the full
  // theme definition, so failed scrapers (WCLD, GTEK) don't penalise equities.
  const totalAvailable = availableEtfs.length;

  const scored = Object.entries(equityMap).map(([ticker, data]) => {
    const easyScore  = data.etfs.length;
    const avgWeight  = data.etfs.reduce((s, e) => s + e.weight, 0) / easyScore;
    const coverage   = easyScore / totalAvailable;          // 0–1
    const proScore   = parseFloat((avgWeight * Math.sqrt(coverage)).toFixed(2));
    const etfPresence = {};
    for (const etf of themeEtfs) {
      const match = data.etfs.find(e => e.etf === etf);
      etfPresence[etf] = match ? parseFloat(match.weight.toFixed(2)) : false;
    }
    return { ticker, name: data.name, easyScore, proScore, coverage, etfPresence };
  });

  // Sort: proScore desc, easyScore as tiebreaker
  scored.sort((a, b) => b.proScore - a.proScore || b.easyScore - a.easyScore);

  return { equities: scored.slice(0, TOP_N), etfCount: availableEtfs.length };
}

// ── Tony note generator (placeholder until real notes are written) ──────────

function makeTonyNote(ticker, name, easyScore, totalEtfs, proScore, themeName) {
  const pct = Math.round((easyScore / totalEtfs) * 100);
  const conviction = pct >= 80 ? 'highest conviction' : pct >= 60 ? 'high conviction' : pct >= 40 ? 'moderate conviction' : 'selective';
  return `${name} appears in ${easyScore} of ${totalEtfs} ${themeName} ETFs (${pct}% coverage) with average weight ${proScore.toFixed(1)}% — ${conviction} across the institutional products tracked. Analysis pending — check back for Tony's full thesis.`;
}

// ── TypeScript code generators ───────────────────────────────────────────────

function genThemeEtfCount(counts) {
  const lines = Object.entries(counts)
    .map(([theme, n]) => `  '${theme}':${' '.repeat(Math.max(1, 16 - theme.length))}${n},`);
  return [
    '// @@GENERATED:THEME_ETF_COUNT@@',
    'export const THEME_ETF_COUNT: Record<Theme, number> = {',
    ...lines,
    '};',
    '// @@END_GENERATED:THEME_ETF_COUNT@@',
  ].join('\n');
}

function escapeStr(s) {
  return String(s ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function genEquity(eq, financials, totalEtfs, themeName, vs, isNew) {
  const f = financials || {};
  const price         = f.price ?? 0;
  const weeklyChange  = f.weeklyChange ?? 0;
  const weeklyPrices  = (f.weeklyPrices && f.weeklyPrices.length > 0)
                        ? f.weeklyPrices
                        : [price * 0.97, price * 0.98, price * 0.985, price * 0.993, price];
  const marketCap     = f.marketCap ?? 'N/A';
  const pe            = f.pe !== undefined ? f.pe : null;
  const eps           = f.eps ?? 0;
  const grossMargin   = f.grossMargin ?? 0;
  const revenueGrowth = f.revenueGrowth ?? 0;
  const divYield      = f.dividendYield ?? null;
  const pr            = f.periodReturns ?? { '1M': 0, '6M': 0, '1Y': 0 };
  const tonyNote      = makeTonyNote(eq.ticker, eq.name, eq.easyScore, totalEtfs, eq.proScore, themeName);

  const presenceEntries = Object.entries(eq.etfPresence)
    .map(([etf, val]) => `${etf}: ${val === false ? 'false' : val}`)
    .join(', ');

  const wpStr = '[' + weeklyPrices.map(p => p.toFixed(2)).join(', ') + ']';

  const vsObj = vs || { '1D': null, '1W': null, '1M': null, '6M': null };
  const v = (x) => x === null ? 'null' : x;

  return [
    `    {`,
    `      ticker: '${eq.ticker}', name: '${escapeStr(eq.name)}', easyScore: ${eq.easyScore}, proScore: ${eq.proScore}, coverage: ${parseFloat(eq.coverage.toFixed(3))},`,
    `      price: ${price}, weeklyPrices: ${wpStr}, weeklyChange: ${weeklyChange}, sortRank: 0, periodReturns: { '1M': ${pr['1M']}, '6M': ${pr['6M']}, '1Y': ${pr['1Y']} },`,
    `      velocityScore: { '1D': ${v(vsObj['1D'])}, '1W': ${v(vsObj['1W'])}, '1M': ${v(vsObj['1M'])}, '6M': ${v(vsObj['6M'])} }, isNew: ${!!isNew},`,
    `      marketCap: '${marketCap}', pe: ${pe === null ? 'null' : pe}, revenueGrowth: ${revenueGrowth}, eps: ${eps}, grossMargin: ${grossMargin}, dividendYield: ${divYield === null ? 'null' : divYield},`,
    `      etfPresence: { ${presenceEntries} },`,
    `      tonyNote: '${escapeStr(tonyNote)}',`,
    `    },`,
  ].join('\n');
}

function genSampleData(themeEquities, financialsMap, etfCounts, velocityMap, isNewMap) {
  const themeBlocks = Object.entries(themeEquities).map(([theme, equities]) => {
    const totalEtfs = etfCounts[theme];
    const eqBlocks = equities.map(eq => {
      const vs    = velocityMap?.[theme]?.[eq.ticker] ?? null;
      const isNew = isNewMap?.[theme]?.[eq.ticker] ?? false;
      return genEquity(eq, financialsMap[eq.ticker], totalEtfs, theme, vs, isNew);
    }).join('\n');
    return `  // ── ${theme} ─────────────────────\n  '${theme}': [\n${eqBlocks}\n  ],`;
  });

  return [
    '// @@GENERATED:SAMPLE_DATA@@',
    'export const SAMPLE_DATA: Record<Theme, Equity[]> = {',
    '',
    themeBlocks.join('\n\n'),
    '',
    '};',
    '// @@END_GENERATED:SAMPLE_DATA@@',
  ].join('\n');
}

// ── Timestamp helpers ─────────────────────────────────────────────────────────

function getNyTimestamp() {
  const now = new Date();
  return now.toLocaleString('en-US', {
    timeZone:  'America/New_York',
    month:     'long',
    day:       'numeric',
    year:      'numeric',
    hour:      'numeric',
    minute:    '2-digit',
    hour12:    true,
  }) + ' ET';
}

function genScanTimestamp(isoTs, nyTs) {
  return [
    '// @@GENERATED:SCAN_TIMESTAMP@@',
    `export const SCAN_TIMESTAMP    = '${isoTs}';`,
    `export const SCAN_TIMESTAMP_NY = '${nyTs}';`,
    '// @@END_GENERATED:SCAN_TIMESTAMP@@',
  ].join('\n');
}

// ── Patch data.ts in-place ───────────────────────────────────────────────────

function patchDataTs(newEtfCount, newSampleData, newTimestamp) {
  let src = fs.readFileSync(DATA_PATH, 'utf8');

  src = src.replace(
    /\/\/ @@GENERATED:SCAN_TIMESTAMP@@[\s\S]*?\/\/ @@END_GENERATED:SCAN_TIMESTAMP@@/,
    newTimestamp
  );
  src = src.replace(
    /\/\/ @@GENERATED:THEME_ETF_COUNT@@[\s\S]*?\/\/ @@END_GENERATED:THEME_ETF_COUNT@@/,
    newEtfCount
  );
  src = src.replace(
    /\/\/ @@GENERATED:SAMPLE_DATA@@[\s\S]*?\/\/ @@END_GENERATED:SAMPLE_DATA@@/,
    newSampleData
  );

  fs.writeFileSync(DATA_PATH, src, 'utf8');
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('=== build-data-ts.js starting ===\n');

  if (!fs.existsSync(RAW_PATH)) {
    console.error('holdings-raw.json not found. Run fetch-holdings.js first.');
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(RAW_PATH, 'utf8'));
  const holdingsMap = raw.holdings;
  console.log(`Holdings loaded: ${Object.keys(holdingsMap).join(', ')}\n`);

  // Score each theme
  const themeEquities = {};
  const etfCounts     = {};

  for (const [theme, etfs] of Object.entries(THEME_ETFS)) {
    const { equities, etfCount } = scoreTheme(theme, etfs, holdingsMap);
    themeEquities[theme] = equities;
    etfCounts[theme]     = etfCount > 0 ? etfCount : etfs.length;
    console.log(`[${theme}] ${equities.length} equities from ${etfCount}/${etfs.length} ETFs`);
  }

  // ── Velocity Score — load history, compute VS/isNew, append today, save ──────
  const todayStr = new Date().toISOString().slice(0, 10);
  const history  = fs.existsSync(HISTORY_PATH)
    ? JSON.parse(fs.readFileSync(HISTORY_PATH, 'utf8'))
    : {};

  // Calculate VS and isNew BEFORE appending today (compare against previous runs)
  const velocityMap = {};
  const isNewMap    = {};
  for (const [theme, equities] of Object.entries(themeEquities)) {
    velocityMap[theme] = {};
    isNewMap[theme]    = {};
    for (const eq of equities) {
      velocityMap[theme][eq.ticker] = calcVelocityScore(history, todayStr, theme, eq.ticker, eq.proScore);
      isNewMap[theme][eq.ticker]    = isNewEntrant(history, todayStr, theme, eq.ticker);
    }
  }

  // Only append snapshot on US trading days — stale prices on weekends/holidays
  // would pollute VS calculations with duplicate data points.
  if (isUSMarketDay(todayStr)) {
    history[todayStr] = {};
    for (const [theme, equities] of Object.entries(themeEquities)) {
      history[todayStr][theme] = {};
      for (const eq of equities) {
        history[todayStr][theme][eq.ticker] = eq.proScore;
      }
    }

    // Prune entries older than 200 days to keep the file small
    const cutoff = offsetDate(todayStr, -200);
    for (const d of Object.keys(history)) {
      if (d < cutoff) delete history[d];
    }

    fs.writeFileSync(HISTORY_PATH, JSON.stringify(history, null, 2), 'utf8');
    console.log(`[History] ${todayStr} snapshot saved (${Object.keys(history).length} days stored)\n`);
  } else {
    console.log(`[History] ${todayStr} is not a US trading day — snapshot skipped\n`);
  }

  // Build ETF scan results — which ETFs have holdings, which are missing
  const allDefinedEtfs = [...new Set(Object.values(THEME_ETFS).flat())];
  const etfScanResults = {};
  for (const etf of allDefinedEtfs) {
    const holdings = holdingsMap[etf];
    etfScanResults[etf] = holdings
      ? { ok: true,  count: holdings.length }
      : { ok: false, count: 0 };
  }

  // Collect unique tickers
  const allTickers = [...new Set(
    Object.values(themeEquities).flatMap(eqs => eqs.map(e => e.ticker))
  )];
  console.log(`\nFetching financials for ${allTickers.length} unique tickers...`);

  const financialsMap = {};
  const yfSucceeded   = [];
  const yfFailed      = [];

  for (const ticker of allTickers) {
    process.stdout.write(`  ${ticker}... `);
    const fin = await fetchFinancials(ticker);
    financialsMap[ticker] = fin;
    if (fin) {
      yfSucceeded.push({ ticker, price: fin.price });
      console.log(`$${fin.price}`);
    } else {
      yfFailed.push(ticker);
      console.log('FAILED');
    }
    await sleep(600);
  }

  // Timestamps
  const isoTs = new Date().toISOString();
  const nyTs  = getNyTimestamp();

  // Write scan-report.json for the email sender
  const scanReport = {
    scanTimestamp:   isoTs,
    scanTimestampNY: nyTs,
    etfScan: {
      results:  etfScanResults,
      total:    allDefinedEtfs.length,
      ok:       Object.values(etfScanResults).filter(r => r.ok).length,
      failed:   allDefinedEtfs.filter(e => !etfScanResults[e].ok),
    },
    yfScan: {
      total:     allTickers.length,
      succeeded: yfSucceeded.length,
      failed:    yfFailed,
    },
  };
  fs.writeFileSync(REPORT_PATH, JSON.stringify(scanReport, null, 2), 'utf8');
  console.log(`\n[Report] scan-report.json written`);

  // Generate TypeScript blocks
  const newEtfCount   = genThemeEtfCount(etfCounts);
  const newSampleData = genSampleData(themeEquities, financialsMap, etfCounts, velocityMap, isNewMap);
  const newTimestamp  = genScanTimestamp(isoTs, nyTs);

  // Patch data.ts
  patchDataTs(newEtfCount, newSampleData, newTimestamp);

  console.log('\n=== data.ts updated ===');
  console.log(`Timestamp: ${nyTs}`);
  console.log(`ETFs: ${scanReport.etfScan.ok}/${scanReport.etfScan.total} ok`);
  console.log(`Yahoo Finance: ${yfSucceeded.length}/${allTickers.length} ok`);
  console.log(`Themes: ${Object.entries(themeEquities).map(([t,e]) => `${t}(${e.length})`).join(', ')}`);
}

main().catch(e => { console.error(e); process.exit(1); });
