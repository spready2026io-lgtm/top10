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

const RAW_PATH        = path.join(__dirname, '..', 'lib', 'holdings-raw.json');
const DATA_PATH       = path.join(__dirname, '..', 'lib', 'data.ts');
const REPORT_PATH     = path.join(__dirname, '..', 'lib', 'scan-report.json');
const SCAN_ERRORS_PATH = path.join(__dirname, '..', 'lib', 'scan-errors.json');
const HISTORY_PATH    = path.join(__dirname, '..', 'lib', 'history.json');
const TONY_NOTES_PATH = path.join(__dirname, '..', 'lib', 'tony-notes.json');

// Load Tony's hand-written notes — keyed by ticker (applies across all themes).
// Auto-generated placeholder is used only when no entry exists for a ticker.
const TONY_NOTES = fs.existsSync(TONY_NOTES_PATH) ? JSON.parse(fs.readFileSync(TONY_NOTES_PATH, 'utf8')) : {};

// ── Theme → ETF mapping (must match data.ts THEME_ETFS) ─────────────────────

const THEME_ETFS = {
  'AI & ML':        ['AIS', 'ARTY', 'BAI', 'IGPT', 'IVES', 'ALAI', 'CHAT', 'AIFD', 'SPRX', 'AOTG'],
  'Semiconductors': ['SOXX', 'PSI', 'XSD', 'DRAM'],
  'Broad Tech':     ['PTF', 'WCLD', 'IGV', 'FDTX', 'GTEK', 'ARKK', 'MARS', 'FRWD', 'BCTK', 'FWD', 'CBSE', 'FCUS', 'WGMI', 'CNEQ', 'SGRT', 'SPMO', 'XMMO'],
  'Electrification':['POW', 'VOLT', 'PBD', 'PBW', 'IVEP'],
  'Industrials':    ['AIRR', 'PRN', 'RSHO', 'IDEF', 'BILT'],
  'Meme':           ['BUZZ', 'MEME', 'RKNG'],
};

// Themes excluded from the cross-theme "Top 10 Across All Themes" breadth ranking.
// Meme is speculative/retail-sentiment driven and would pollute the institutional
// conviction board, so it is kept to its own tab only.
const CROSS_THEME_EXCLUDE = new Set(['Meme']);

// Company-name fallback. Some sources (e.g. StockAnalysis __data.json) only
// expose ticker + weight, leaving name === ticker. Filling proper names here
// keeps display consistent across themes (the UI also maps these tickers to a
// logo domain in app/page.tsx). Applied only when the scraped name is blank
// or equals the ticker, so real source names always win.
// ── Foreign (non-US) shares — EUR / AUD / etc. ───────────────────────────────
// Yahoo Finance only finds non-US listings via an exchange suffix. The bare
// ticker 404s and the equity falls through to price: 0 with all-zero returns,
// which then renders broken in the conviction / universe / cross-theme tables.
// Map the ETF holding ticker -> the suffixed Yahoo symbol here to fix it.
//
// How to add a new one:
//   1. Find the listing's Yahoo symbol (search finance.yahoo.com for the name).
//      Common suffixes:
//        .AX  ASX (Australia)        .MC  Bolsa de Madrid (Spain)
//        .MI  Borsa Italiana (Milan) .PA  Euronext Paris (France)
//        .AS  Euronext Amsterdam     .DE  XETRA / .F Frankfurt (Germany)
//        .L   London Stock Exchange  .SW  SIX Swiss Exchange
//        .TO  Toronto (Canada)       .HK  Hong Kong   .T  Tokyo
//   2. Verify BOTH endpoints the build uses actually return data for it:
//        quoteSummary -> price.regularMarketPrice, price.currency, exchangeName
//        v8 chart (range=1y) -> a full series of non-null closes
//      (see fetchFinancials / fetchChartReturns below; a quick standalone fetch
//       with the yfInit crumb flow is enough to confirm before committing.)
//   3. Add the mapping, rebuild data.ts, and confirm the ticker no longer shows
//      price: 0 (grep "price: 0" lib/data.ts should return nothing).
//
// CURRENCY CAVEAT: these prices come back in local currency (EUR, AUD, GBP…),
// but the UI prefixes every price with "$". Returns and proScore are
// currency-agnostic (they're % changes), so scoring is unaffected — only the
// displayed price number carries the wrong currency symbol. If foreign names
// become common, add a currency-aware price label rather than mapping more
// tickers blind.
const YAHOO_TICKER_MAP = {
  PRY:  'PRY.MI',   // Prysmian SpA — Borsa Italiana (Milan), EUR
  AENA: 'AENA.MC',  // Aena S.M.E., S.A. — Bolsa de Madrid, EUR
};

const COMPANY_NAMES = {
  ASTS: 'AST SpaceMobile',        RDW:  'Redwire',
  AAOI: 'Applied Optoelectronics', LUNR: 'Intuitive Machines',
  IREN: 'IREN Ltd',                NBIS: 'Nebius Group',
  QBTS: 'D-Wave Quantum',          ONDS: 'Ondas Holdings',
  APLD: 'Applied Digital',         IONQ: 'IonQ',
  RKLB: 'Rocket Lab',              TE:   'T1 Energy',
  AXTI: 'AXT Inc',                 NVTS: 'Navitas Semiconductor',
  WOLF: 'Wolfspeed',               BE:   'Bloom Energy',
  SNDK: 'Sandisk',
  // Tickers whose ETF source emits ticker-only names
  PANW: 'Palo Alto Networks',      TKR:  'Timken Company',
  CGNX: 'Cognex Corporation',      GTES: 'Gates Industrial',
  LIN:  'Linde plc',               SPCE: 'Virgin Galactic Holdings',
  OKLO: 'Oklo Inc',                RGTI: 'Rigetti Computing',
  ASML: 'ASML Holding',            CRWD: 'CrowdStrike',
  NET:  'Cloudflare',
};

function resolveName(ticker, rawName) {
  const n = (rawName || '').trim();
  if (!n || n === ticker) return COMPANY_NAMES[ticker] || ticker;
  return n;
}

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

// Currency symbol for embedding in built strings (market cap). Mirrors
// currencySymbol() in lib/format.ts — keep the two in sync. Unknown/suffix-style
// currencies fall back to the ISO code + nbsp so a number is never mislabeled.
const CURRENCY_SYMBOLS = {
  USD: '$', EUR: '€', GBP: '£', JPY: '¥',
  AUD: 'A$', CAD: 'C$', NZD: 'NZ$', HKD: 'HK$', SGD: 'S$', CHF: 'CHF ',
};
function currencySymbol(currency) {
  if (!currency || currency === 'USD') return '$';
  return CURRENCY_SYMBOLS[currency] ?? `${currency} `;
}

function formatMarketCap(n, currency) {
  if (!n || isNaN(n)) return 'N/A';
  const s = currencySymbol(currency);
  if (n >= 1e12) return `${s}${(n / 1e12).toFixed(1)}T`;
  if (n >= 1e9)  return `${s}${(n / 1e9).toFixed(0)}B`;
  return `${s}${(n / 1e6).toFixed(0)}M`;
}

// Number of points in a 1D intraday path. Must match PERIOD_N['1D'] in
// genIndexChartData so averagePaths() accepts the ETF 1D paths.
const INTRADAY_N = 24;

// Fetch today's intraday path for a ticker (range=1d, 5-minute bars). The series
// is prepended with the prior close and end-anchored to the live price, so both
// the line and the % move are measured against yesterday's close — matching the
// day % Yahoo Finance shows. Auto-refreshes on each of the 3×/day price jobs.
// Returns { prices, pathNorm, dayReturn } or null on failure (chart falls back).
async function fetchIntraday(ticker, currentPrice, n = INTRADAY_N) {
  try {
    const url = `https://query2.finance.yahoo.com/v8/finance/chart/${ticker}?range=1d&interval=5m&crumb=${encodeURIComponent(_yfCrumb)}`;
    const res = await fetch(url, {
      headers: { 'User-Agent': YF_UA, 'Cookie': _yfCookie, 'Accept': 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const result = data.chart?.result?.[0];
    if (!result) throw new Error('No chart result');

    const prevClose = result.meta?.chartPreviousClose ?? result.meta?.previousClose ?? null;
    const closes = (result.timestamp || [])
      .map((_, i) => result.indicators?.quote?.[0]?.close?.[i])
      .filter(c => c != null);
    if (!prevClose || closes.length < 2) throw new Error('Insufficient intraday data');

    const series = [prevClose, ...closes];
    series[series.length - 1] = currentPrice; // anchor end to live price

    const sample = (arr) => {
      if (arr.length <= n) return arr.map(v => parseFloat(v.toFixed(2)));
      return Array.from({ length: n }, (_, i) => {
        const idx = Math.min(Math.round(i * (arr.length - 1) / (n - 1)), arr.length - 1);
        return parseFloat(arr[idx].toFixed(2));
      });
    };

    const base = series[0];
    return {
      prices:    sample(series),
      pathNorm:  sample(series.map(v => v / base * 100)),
      dayReturn: parseFloat(((currentPrice / prevClose - 1) * 100).toFixed(2)),
    };
  } catch (e) {
    console.warn(`  [Yahoo Intraday] ${ticker} 1D failed: ${e.message}`);
    return null;
  }
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

    // Downsample an array of {ts, close} points to exactly n price values.
    // The last point is always anchored to currentPrice so the chart ends on today.
    function sample(arr, n) {
      if (arr.length === 0) return [];
      const pts = arr.length <= n
        ? arr.map(d => parseFloat(d.close.toFixed(2)))
        : Array.from({ length: n }, (_, i) => {
            const idx = Math.min(Math.round(i * (arr.length - 1) / (n - 1)), arr.length - 1);
            return parseFloat(arr[idx].close.toFixed(2));
          });
      pts[pts.length - 1] = parseFloat(currentPrice.toFixed(2));
      return pts;
    }

    const last1W = valid.slice(-5);
    const last1M = valid.filter(d => d.ts >= calTs(1));
    const last6M = valid.filter(d => d.ts >= calTs(6));

    // YTD: anchored to prior year-end close through today (free subset of the 1y window).
    const ytdStartTs   = Math.floor(Date.UTC(lastDate.getUTCFullYear(), 0, 1) / 1000);
    const ytdInYear    = valid.filter(d => d.ts >= ytdStartTs);
    const priorYearEnd = valid.filter(d => d.ts < ytdStartTs).slice(-1)[0];
    const lastYTD      = priorYearEnd ? [priorYearEnd, ...ytdInYear] : ytdInYear;

    const weeklyReturn = last1W.length >= 2
      ? parseFloat(((currentPrice / last1W[0].close - 1) * 100).toFixed(2))
      : 0;

    const intraday = await fetchIntraday(ticker, currentPrice);

    const priceHistory = {
      '1D': intraday?.prices,
      '1W': sample(last1W, 5),
      '1M': sample(last1M, 21),
      'YTD': sample(lastYTD, 26),
      '6M': sample(last6M, 26),
      '1Y': sample(valid,  52),
    };

    return {
      '1M': ret(closest(calTs(1))),
      'YTD': lastYTD.length >= 2 ? ret(lastYTD[0].close) : 0,
      '6M': ret(closest(calTs(6))),
      '1Y': ret(closest(calTs(0, 1))),
      dayReturn: intraday?.dayReturn ?? null,
      priceHistory,
      weeklyReturn,
    };
  } catch (e) {
    console.warn(`  [Yahoo Chart] ${ticker} returns failed: ${e.message}`);
    return { '1M': 0, 'YTD': 0, '6M': 0, '1Y': 0, dayReturn: null, priceHistory: null, weeklyReturn: 0 };
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
    // Local trading currency (USD, EUR, AUD…). Foreign listings report non-USD;
    // price/EPS/marketCap are all denominated in it. See YAHOO_TICKER_MAP notes.
    const currency      = r.price?.currency ?? 'USD';
    const marketCap     = formatMarketCap(r.price?.marketCap?.raw, currency);
    const pe            = r.summaryDetail?.trailingPE?.raw != null
                          ? parseFloat(r.summaryDetail.trailingPE.raw.toFixed(1)) : null;
    const eps           = parseFloat((r.defaultKeyStatistics?.trailingEps?.raw ?? 0).toFixed(2));
    const grossMargin   = Math.round((r.financialData?.grossMargins?.raw ?? 0) * 100);
    const revenueGrowth = Math.round((r.financialData?.revenueGrowth?.raw ?? 0) * 100);
    const divYield      = r.summaryDetail?.dividendYield?.raw != null
                          ? parseFloat((r.summaryDetail.dividendYield.raw * 100).toFixed(2)) : null;
    const weeklyPrices  = [];

    const chartData     = await fetchChartReturns(ticker, price);
    const periodReturns = { '1M': chartData['1M'], 'YTD': chartData['YTD'], '6M': chartData['6M'], '1Y': chartData['1Y'] };
    const priceHistory  = chartData.priceHistory;
    const weeklyChange  = (priceHistory?.['1W']?.length >= 2)
                          ? chartData.weeklyReturn
                          : parseFloat(((r.price?.regularMarketChangePercent?.raw ?? 0) * 100).toFixed(2));
    // 1D move — Yahoo's live day % (vs prior close), matching what the site shows.
    const dayChange     = r.price?.regularMarketChangePercent?.raw != null
                          ? parseFloat((r.price.regularMarketChangePercent.raw * 100).toFixed(2))
                          : (chartData.dayReturn ?? 0);

    return { price: parseFloat(price.toFixed(2)), currency, weeklyChange, dayChange, weeklyPrices, periodReturns, priceHistory, marketCap, pe, eps, grossMargin, revenueGrowth, dividendYield: divYield };

  } catch (e) {
    console.warn(`  [Yahoo] ${ticker} failed: ${e.message}`);
    return null;
  }
}

// ── ETF data fetcher ─────────────────────────────────────────────────────────

// Fetch returns AND normalized price paths for a single ETF/index ticker.
// paths: each period indexed to 100 at the start of that period, downsampled to N pts.
// Returns null on failure so caller can keep the existing value.
async function fetchEtfData(ticker) {
  await yfInit();
  try {
    const qUrl = `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${ticker}?modules=price,fundProfile,summaryDetail&crumb=${encodeURIComponent(_yfCrumb)}`;
    const qRes = await fetch(qUrl, {
      headers: { 'User-Agent': YF_UA, 'Cookie': _yfCookie, 'Accept': 'application/json' },
    });
    if (!qRes.ok) throw new Error(`quoteSummary HTTP ${qRes.status}`);
    const qData = await qRes.json();
    const priceMod = qData.quoteSummary?.result?.[0]?.price;
    const fundMod  = qData.quoteSummary?.result?.[0]?.fundProfile;
    const currentPrice = priceMod?.regularMarketPrice?.raw;
    if (!currentPrice) throw new Error('No current price');

    // Fund name + manager (issuer), sourced from Yahoo — feeds the ETF tile.
    const name    = priceMod?.longName || priceMod?.shortName || ticker;
    const manager = fundMod?.family || '';

    // Fund size (AUM / net assets), from Yahoo summaryDetail.totalAssets only.
    // Do NOT fall back to defaultKeyStatistics.totalAssets (a company balance-sheet
    // figure) or price.marketCap — both report wrong values for funds. null if absent.
    const aum = qData.quoteSummary?.result?.[0]?.summaryDetail?.totalAssets?.raw ?? null;

    const cUrl = `https://query2.finance.yahoo.com/v8/finance/chart/${ticker}?range=1y&interval=1d&crumb=${encodeURIComponent(_yfCrumb)}`;
    const cRes = await fetch(cUrl, {
      headers: { 'User-Agent': YF_UA, 'Cookie': _yfCookie, 'Accept': 'application/json' },
    });
    if (!cRes.ok) throw new Error(`chart HTTP ${cRes.status}`);
    const cData = await cRes.json();
    const result = cData.chart?.result?.[0];
    if (!result) throw new Error('No chart result');

    const timestamps = result.timestamp;
    const closes     = result.indicators.quote[0].close;
    const valid = timestamps
      .map((ts, i) => ({ ts, close: closes[i] }))
      .filter(d => d.close != null);
    if (valid.length < 5) throw new Error('Insufficient data');

    const lastTs   = valid[valid.length - 1].ts;
    const lastDate = new Date(lastTs * 1000);

    const calTs = (months, years = 0) => {
      const d = new Date(lastDate);
      d.setMonth(d.getMonth() - months);
      d.setFullYear(d.getFullYear() - years);
      return Math.floor(d.getTime() / 1000);
    };
    const closest = targetTs => valid.reduce((best, d) =>
      Math.abs(d.ts - targetTs) < Math.abs(best.ts - targetTs) ? d : best
    ).close;
    const ret = startClose => parseFloat(((currentPrice / startClose - 1) * 100).toFixed(1));

    const last1W = valid.slice(-5);
    const last1M = valid.filter(d => d.ts >= calTs(1));
    const last6M = valid.filter(d => d.ts >= calTs(6));

    // YTD: anchored to the prior year-end close through today. The 1y window
    // always contains Dec 31 of the prior year, so YTD is a free subset of it.
    const ytdStartTs   = Math.floor(Date.UTC(lastDate.getUTCFullYear(), 0, 1) / 1000);
    const ytdInYear    = valid.filter(d => d.ts >= ytdStartTs);
    const priorYearEnd = valid.filter(d => d.ts < ytdStartTs).slice(-1)[0];
    const lastYTD      = priorYearEnd ? [priorYearEnd, ...ytdInYear] : ytdInYear;

    const w1Return = last1W.length >= 2
      ? parseFloat(((currentPrice / last1W[0].close - 1) * 100).toFixed(1))
      : 0;

    const returns = {
      '1W': w1Return,
      '1M': ret(closest(calTs(1))),
      'YTD': lastYTD.length >= 2 ? ret(lastYTD[0].close) : 0,
      '6M': ret(closest(calTs(6))),
      '1Y': ret(closest(calTs(0, 1))),
    };

    // Normalize arr to 100 at arr[0], replace last point with live price, resample to exactly n pts.
    // Always returns n points: downsamples when raw is longer, upsamples (repeating indices) when
    // shorter. Consumers (averagePaths, SPY path) require length === n, so n must be exact even for
    // short windows like 1M (~21 trading days, which varies day to day).
    const normAndSample = (arr, n) => {
      if (arr.length === 0) return null;
      const base = arr[0].close;
      const raw = arr.map(d => d.close / base * 100);
      raw[raw.length - 1] = currentPrice / base * 100; // anchor end to live price
      if (raw.length === 1) return Array.from({ length: n }, () => parseFloat(raw[0].toFixed(2)));
      return Array.from({ length: n }, (_, i) => {
        const idx = Math.min(Math.round(i * (raw.length - 1) / (n - 1)), raw.length - 1);
        return parseFloat(raw[idx].toFixed(2));
      });
    };

    const paths = {
      '1W': normAndSample(last1W, 5),
      '1M': normAndSample(last1M, 21),
      'YTD': normAndSample(lastYTD, 26),
      '6M': normAndSample(last6M, 26),
      '1Y': normAndSample(valid,  52),
    };

    // 1D intraday path + return (powers the 1D view on the index chart)
    const intraday = await fetchIntraday(ticker, currentPrice);
    if (intraday) {
      paths['1D']   = intraday.pathNorm;
      returns['1D'] = intraday.dayReturn;
    }

    return { returns, paths, name, manager, aum };
  } catch (e) {
    console.warn(`  [ETF Data] ${ticker} failed: ${e.message}`);
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
      if (!equityMap[t]) equityMap[t] = { name: resolveName(t, holding.name), etfs: [] };
      equityMap[t].etfs.push({ etf, weight: holding.weight });
    }
  }

  // Score each equity
  // proScore = avgWeight × coverage — linear breadth weighting.
  // Equals totalWeight / totalAvailable, i.e. the true average portfolio weight
  // across every theme ETF counting non-holders as 0%. A stock in 1 ETF at 13%
  // scores far below one held by 7 ETFs at 5%, so breadth genuinely drives rank.
  // Coverage is relative to availableEtfs (ETFs with real data), not the full
  // theme definition, so failed scrapers (WCLD, GTEK) don't penalise equities.
  const totalAvailable = availableEtfs.length;

  const scored = Object.entries(equityMap).map(([ticker, data]) => {
    const easyScore  = data.etfs.length;
    const avgWeight  = data.etfs.reduce((s, e) => s + e.weight, 0) / easyScore;
    const coverage   = easyScore / totalAvailable;          // 0–1
    const proScore   = parseFloat((avgWeight * coverage).toFixed(2));
    const etfPresence = {};
    for (const etf of themeEtfs) {
      const match = data.etfs.find(e => e.etf === etf);
      etfPresence[etf] = match ? parseFloat(match.weight.toFixed(2)) : false;
    }
    return { ticker, name: data.name, easyScore, avgWeight: parseFloat(avgWeight.toFixed(2)), proScore, coverage, etfPresence };
  });

  // Sort: easyScore (ETF count) primary, avgWeight (avg weight among holders) as tiebreaker
  scored.sort((a, b) => b.easyScore - a.easyScore || b.avgWeight - a.avgWeight);

  return { equities: scored.slice(0, TOP_N), etfCount: availableEtfs.length };
}

// ── Tony note generator (placeholder until real notes are written) ──────────

function makeTonyNote(ticker, name, easyScore, totalEtfs, avgWeight, proScore, themeName) {
  const pct = Math.round((easyScore / totalEtfs) * 100);
  const conviction = pct >= 80 ? 'highest conviction' : pct >= 60 ? 'high conviction' : pct >= 40 ? 'moderate conviction' : 'selective';
  return `${name} appears in ${easyScore} of ${totalEtfs} ${themeName} ETFs (${pct}% coverage) with average weight ${avgWeight.toFixed(1)}% — ${conviction} across the institutional products tracked. Analysis pending — check back for Tony's full thesis.`;
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

// Total holdings rows across all theme ETFs — every position, counting a stock
// once per ETF that holds it. Powers the home carousel's "shares tracked" stat.
function genHoldingsCount(holdingsMap) {
  const themeEtfs = new Set([].concat(...Object.values(THEME_ETFS)));
  let rows = 0;
  for (const etf of themeEtfs) {
    if (holdingsMap[etf]) rows += holdingsMap[etf].length;
  }
  return [
    '// @@GENERATED:HOLDINGS_COUNT@@',
    '// Total holdings rows across all theme ETFs (every position, counting a stock',
    '// once per ETF that holds it). Powers the home carousel\'s "shares tracked" stat.',
    `export const HOLDINGS_COUNT = ${rows};`,
    '// @@END_GENERATED:HOLDINGS_COUNT@@',
  ].join('\n');
}

function escapeStr(s) {
  // Escape for safe embedding in single-quoted TypeScript string literals.
  // Strip backticks, ${ sequences, and null bytes in addition to \ and '.
  return String(s ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/`/g, '')
    .replace(/\$\{/g, '')
    .replace(/\0/g, '');
}

function safeTicker(t) {
  // Tickers must be 1-5 uppercase letters. Reject anything else.
  const cleaned = String(t ?? '').trim().toUpperCase();
  if (!/^[A-Z]{1,5}$/.test(cleaned)) {
    console.warn(`[security] Rejecting unexpected ticker format: ${JSON.stringify(t)}`);
    return 'UNKNOWN';
  }
  return cleaned;
}

function genEquity(eq, financials, totalEtfs, themeName, vs, isNew) {
  const f = financials || {};
  const price         = f.price ?? 0;
  const currency      = f.currency ?? 'USD';
  const weeklyChange  = f.weeklyChange ?? 0;
  const dayChange     = f.dayChange ?? 0;
  // Use real 1W price history if available — fall back only if missing entirely
  const ph1w = f.priceHistory?.['1W'];
  const weeklyPrices = (ph1w && ph1w.length >= 2) ? ph1w : (price > 0 ? [price] : [0]);
  const marketCap     = f.marketCap ?? 'N/A';
  const pe            = f.pe !== undefined ? f.pe : null;
  const eps           = f.eps ?? 0;
  const grossMargin   = f.grossMargin ?? 0;
  const revenueGrowth = f.revenueGrowth ?? 0;
  const divYield      = f.dividendYield ?? null;
  const pr            = f.periodReturns ?? { '1M': 0, 'YTD': 0, '6M': 0, '1Y': 0 };
  const tonyNote      = TONY_NOTES[eq.ticker] || makeTonyNote(eq.ticker, eq.name, eq.easyScore, totalEtfs, eq.avgWeight, eq.proScore, themeName);

  const presenceEntries = Object.entries(eq.etfPresence)
    .map(([etf, val]) => `${etf}: ${val === false ? 'false' : val}`)
    .join(', ');

  const wpStr = '[' + weeklyPrices.map(p => p.toFixed(2)).join(', ') + ']';

  const ph = f.priceHistory;
  const ph1d = ph && ph['1D'] && ph['1D'].length >= 2 ? `'1D': [${ph['1D'].join(', ')}], ` : '';
  const phStr = ph
    ? `{ ${ph1d}'1W': [${ph['1W'].join(', ')}], '1M': [${ph['1M'].join(', ')}], 'YTD': [${ph['YTD'].join(', ')}], '6M': [${ph['6M'].join(', ')}], '1Y': [${ph['1Y'].join(', ')}] }`
    : 'undefined';

  const vsObj = vs || { '1D': null, '1W': null, '1M': null, '6M': null };
  const v = (x) => x === null ? 'null' : x;

  const ticker = safeTicker(eq.ticker);
  return [
    `    {`,
    `      ticker: '${ticker}', name: '${escapeStr(eq.name)}', easyScore: ${eq.easyScore}, avgWeight: ${eq.avgWeight}, proScore: ${eq.proScore}, coverage: ${parseFloat(eq.coverage.toFixed(3))},`,
    `      price: ${price},${currency !== 'USD' ? ` currency: '${currency}',` : ''} weeklyPrices: ${wpStr}, weeklyChange: ${weeklyChange}, dayChange: ${dayChange}, sortRank: 0, periodReturns: { '1M': ${pr['1M']}, 'YTD': ${pr['YTD']}, '6M': ${pr['6M']}, '1Y': ${pr['1Y']} },`,
    `      priceHistory: ${phStr},`,
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

// ── Index chart helpers ───────────────────────────────────────────────────────

// Average n normalized path arrays point-by-point. Only ETFs with a full-length
// path for the period are included so short-history funds don't distort the line.
function averagePaths(pathArrays, n) {
  const full = pathArrays.filter(p => p && p.length === n);
  if (full.length === 0) return Array.from({ length: n }, () => 100);
  return Array.from({ length: n }, (_, i) => {
    const vals = full.map(p => p[i]);
    return parseFloat((vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2));
  });
}

// Generate date-aware x-axis labels for each period based on today's date.
function genXLabels(period, todayStr) {
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const d = new Date(todayStr + 'T12:00:00Z');

  if (period === '1D') return ['Open', '11a', '1p', '3p', 'Now'];

  if (period === '1W') return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  if (period === '1M') {
    return Array.from({ length: 5 }, (_, i) => {
      const dt = new Date(d);
      dt.setUTCDate(dt.getUTCDate() - 28 + i * 7);
      return `${MONTHS[dt.getUTCMonth()]} ${dt.getUTCDate()}`;
    });
  }

  if (period === '6M') {
    return Array.from({ length: 7 }, (_, i) => {
      const dt = new Date(d);
      dt.setUTCMonth(dt.getUTCMonth() - 6 + i);
      return MONTHS[dt.getUTCMonth()];
    });
  }

  if (period === 'YTD') {
    // Evenly spaced month labels from Jan of this year through the current month.
    const months = d.getUTCMonth(); // 0 = Jan; number of months elapsed this year
    const count  = Math.min(months + 1, 6);
    return Array.from({ length: count }, (_, i) => {
      const m = Math.round((i * months) / Math.max(count - 1, 1));
      return MONTHS[m];
    });
  }

  // 1Y — 5 quarterly labels
  return Array.from({ length: 5 }, (_, i) => {
    const dt = new Date(d);
    dt.setUTCMonth(dt.getUTCMonth() - 12 + i * 3);
    return `${MONTHS[dt.getUTCMonth()]} '${String(dt.getUTCFullYear()).slice(2)}`;
  });
}

// Build the full INDEX_CHART_DATA block from real ETF price paths and SPY.
function genIndexChartData(themeEtfs, etfDataMap, spyData, todayStr) {
  const PERIOD_N = { '1D': INTRADAY_N, '1W': 5, '1M': 21, 'YTD': 26, '6M': 26, '1Y': 52 };
  const PERIODS  = ['1D', '1W', '1M', 'YTD', '6M', '1Y'];

  const themeBlocks = Object.entries(themeEtfs).map(([theme, tickers]) => {
    const periodBlocks = PERIODS.map(period => {
      const n = PERIOD_N[period];

      // Average normalized paths across all ETFs in the theme that have full data
      const etfPaths = tickers.map(t => etfDataMap[t]?.paths?.[period] ?? null);
      const top10    = averagePaths(etfPaths, n);

      // SPY path — fall back to flat 100-line if unavailable
      const spyPath  = (spyData?.paths?.[period]?.length === n)
        ? spyData.paths[period]
        : Array.from({ length: n }, () => 100);

      // Returns: average across ETFs that succeeded, with SPY return
      const etfRets   = tickers.map(t => etfDataMap[t]?.returns?.[period]).filter(v => v != null);
      const top10Ret  = etfRets.length > 0
        ? parseFloat((etfRets.reduce((a, b) => a + b, 0) / etfRets.length).toFixed(1))
        : 0;
      const spyRet    = spyData?.returns?.[period] ?? 0;

      const xLabels   = genXLabels(period, todayStr).map(l => `"${l}"`).join(', ');

      return `    '${period}': { top10: [${top10.join(', ')}], spy: [${spyPath.join(', ')}], top10Return: ${top10Ret}, spyReturn: ${spyRet}, xLabels: [${xLabels}] },`;
    });

    return `  '${theme}': {\n${periodBlocks.join('\n')}\n  },`;
  });

  return [
    '// @@GENERATED:INDEX_CHART_DATA@@',
    'export const INDEX_CHART_DATA: Record<Theme, IndexChartByPeriod> = {',
    ...themeBlocks,
    '};',
    '// @@END_GENERATED:INDEX_CHART_DATA@@',
  ].join('\n');
}

// ── ETF returns & SPY generators ─────────────────────────────────────────────

function genEtfReturns(etfReturnsMap, themeEtfs) {
  const lines = [];
  for (const [theme, tickers] of Object.entries(themeEtfs)) {
    lines.push(`  // ${theme}`);
    for (const ticker of tickers) {
      const r = etfReturnsMap[ticker];
      if (r) {
        const pad = ' '.repeat(Math.max(0, 4 - ticker.length));
        lines.push(`  ${ticker}:${pad} { '1W': ${r['1W']}, '1M': ${r['1M']}, 'YTD': ${r['YTD']}, '6M': ${r['6M']}, '1Y': ${r['1Y']} },`);
      }
    }
  }
  return [
    '// @@GENERATED:ETF_RETURNS@@',
    '// Multi-period returns per ETF ticker',
    'export const ETF_RETURNS: Record<string, Record<Period, number>> = {',
    ...lines,
    '};',
    '// @@END_GENERATED:ETF_RETURNS@@',
  ].join('\n');
}

// Per-ETF 1D move (vs prior close). Additive — kept separate from ETF_RETURNS
// so the core Record<Period, number> shape is unaffected. Returns null if no
// ETF reported a 1D value, leaving the existing block unchanged.
function genEtfDayChange(etfReturnsMap, themeEtfs) {
  const allEtfs = [...new Set(Object.values(themeEtfs).flat())];
  const lines = [];
  for (const ticker of allEtfs) {
    const d = etfReturnsMap[ticker]?.['1D'];
    if (d == null) continue;
    const pad = ' '.repeat(Math.max(0, 4 - ticker.length));
    lines.push(`  ${ticker}:${pad} ${d},`);
  }
  if (lines.length === 0) return null;
  return [
    '// @@GENERATED:ETF_DAY_CHANGE@@',
    "// Today's % move per ETF ticker (1D, vs prior close). Refreshed by the 3×/day",
    '// price jobs. Powers the 1D ranking in the theme-ETF side panel.',
    'export const ETF_DAY_CHANGE: Record<string, number> = {',
    ...lines,
    '};',
    '// @@END_GENERATED:ETF_DAY_CHANGE@@',
  ].join('\n');
}

// Compute per-theme average return across all ETFs that succeeded.
// Falls back to the previous hardcoded value for any theme where no ETF data was fetched.
function genTop10Ret(etfReturnsMap, themeEtfs) {
  const PERIODS = ['1W', '1M', 'YTD', '6M', '1Y'];
  const avg = (nums) => nums.length === 0 ? null : parseFloat((nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(1));

  const themeLines = [];
  for (const [theme, tickers] of Object.entries(themeEtfs)) {
    const byPeriod = {};
    for (const p of PERIODS) {
      const vals = tickers.map(t => etfReturnsMap[t]?.[p]).filter(v => v != null);
      byPeriod[p] = avg(vals);
    }
    // Only emit a line if we have data for all 4 periods
    if (PERIODS.every(p => byPeriod[p] !== null)) {
      const pad = ' '.repeat(Math.max(0, 16 - theme.length));
      themeLines.push(`  '${theme}':${pad}{ '1W': ${byPeriod['1W']}, '1M': ${byPeriod['1M']}, 'YTD': ${byPeriod['YTD']}, '6M': ${byPeriod['6M']}, '1Y': ${byPeriod['1Y']} },`);
    }
  }

  if (themeLines.length === 0) return null; // no data — leave existing block unchanged

  return [
    '// @@GENERATED:TOP10_RET@@',
    '// Top10 composite returns per theme per period (average of all ETFs in theme)',
    'const TOP10_RET: Record<Theme, Record<Period, number>> = {',
    ...themeLines,
    '};',
    '// @@END_GENERATED:TOP10_RET@@',
  ].join('\n');
}

// Benchmark ETF per theme — must match THEME_BENCHMARK_ETF in data.ts
const BENCHMARK_ETF = {
  'AI & ML':         'ARTY',
  'Semiconductors':  'SOXX',
  'Broad Tech':      'QQQ',
  'Electrification': 'PBD',
  'Industrials':     'AIRR',
  'Meme':            'BUZZ',
};

function genThemeBenchmarks(etfReturnsMap) {
  const lines = [];
  let allFound = true;
  for (const [theme, ticker] of Object.entries(BENCHMARK_ETF)) {
    const ret = etfReturnsMap[ticker]?.['1W'];
    if (ret == null) { allFound = false; continue; }
    const pad = ' '.repeat(Math.max(0, 16 - theme.length));
    lines.push(`  '${theme}':${pad}${ret},`);
  }
  if (!allFound || lines.length < 6) return null; // keep existing if any benchmark ETF failed
  return [
    '// @@GENERATED:THEME_BENCHMARKS@@',
    'export const THEME_BENCHMARKS: Record<Theme, number> = {',
    ...lines,
    '};',
    '// @@END_GENERATED:THEME_BENCHMARKS@@',
  ].join('\n');
}

// ── Cross-theme breadth ranking — "Top 10 Across All Themes" ─────────────────
// Ranks equities by how many themes they appear in (institutional breadth), so
// the names with the widest conviction across the whole tracked universe rise to
// the top. Ties broken by aggregate proScore, then best single proScore.
// Meme is excluded (CROSS_THEME_EXCLUDE) to keep this an institutional board.
function genCrossThemeTop10(themeEquities, financialsMap) {
  const byTicker = {};
  for (const [theme, equities] of Object.entries(themeEquities)) {
    if (CROSS_THEME_EXCLUDE.has(theme)) continue;
    for (const eq of equities) {
      const e = byTicker[eq.ticker] || (byTicker[eq.ticker] = {
        ticker: eq.ticker, name: eq.name, themes: [], aggregateScore: 0, bestProScore: 0,
      });
      e.themes.push(theme);
      e.aggregateScore += eq.proScore;
      if (eq.proScore > e.bestProScore) e.bestProScore = eq.proScore;
      if (eq.name && eq.name.length > e.name.length) e.name = eq.name;
    }
  }

  const ranked = Object.values(byTicker)
    .sort((a, b) =>
      b.themes.length - a.themes.length ||
      b.aggregateScore - a.aggregateScore ||
      b.bestProScore - a.bestProScore)
    .slice(0, 10);

  const lines = ranked.map(e => {
    const f = financialsMap[e.ticker] || {};
    const price        = Number(f.price ?? 0).toFixed(2);
    const currency     = f.currency ?? 'USD';
    const weeklyChange = Number(f.weeklyChange ?? 0).toFixed(2);
    const themesArr    = e.themes.map(t => `'${escapeStr(t)}'`).join(', ');
    const avgProScore = (e.aggregateScore / e.themes.length).toFixed(2);
    const curStr = currency !== 'USD' ? ` currency: '${currency}',` : '';
    return `  { ticker: '${safeTicker(e.ticker)}', name: \`${escapeStr(e.name)}\`, themeCount: ${e.themes.length}, themes: [${themesArr}], aggregateScore: ${e.aggregateScore.toFixed(2)}, bestProScore: ${e.bestProScore.toFixed(2)}, avgProScore: ${avgProScore}, price: ${price},${curStr} weeklyChange: ${weeklyChange} },`;
  });

  return [
    '// @@GENERATED:CROSS_THEME_TOP10@@',
    'export const CROSS_THEME_TOP10: CrossThemeEntry[] = [',
    ...lines,
    '];',
    '// @@END_GENERATED:CROSS_THEME_TOP10@@',
  ].join('\n');
}

function genSpyRet(r) {
  return [
    '// @@GENERATED:SPY_RET@@',
    `export const SPY_RET: Record<Period, number> = { '1W': ${r['1W']}, '1M': ${r['1M']}, 'YTD': ${r['YTD']}, '6M': ${r['6M']}, '1Y': ${r['1Y']} };`,
    '// @@END_GENERATED:SPY_RET@@',
  ].join('\n');
}

// Top N holdings per ETF (by weight). Feeds the ETF-row hover tooltip on the dashboard.
function genEtfTopHoldings(holdingsMap, themeEtfs, topN = 5) {
  const allEtfs = [...new Set(Object.values(themeEtfs).flat())];
  const lines = [];
  for (const etf of allEtfs) {
    const h = holdingsMap[etf];
    if (!h || h.length === 0) continue;
    const top = [...h]
      .sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0))
      .slice(0, topN)
      .map(x => `{ t: '${safeTicker(x.ticker)}', w: ${Number(x.weight ?? 0).toFixed(1)} }`);
    lines.push(`  ${etf}: [${top.join(', ')}],`);
  }
  return [
    '// @@GENERATED:ETF_TOP_HOLDINGS@@',
    'export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {',
    ...lines,
    '};',
    '// @@END_GENERATED:ETF_TOP_HOLDINGS@@',
  ].join('\n');
}

// Fund name + manager (issuer) per ETF ticker, sourced from Yahoo. Feeds the
// theme ETF performance tile. Returns null if no ETF reported a name so a
// partial fetch never wipes the existing block.
function genEtfInfo(etfDataMap, themeEtfs) {
  const allEtfs = [...new Set(Object.values(themeEtfs).flat())];
  const lines = [];
  for (const etf of allEtfs) {
    const d = etfDataMap[etf];
    if (!d || !d.name) continue;
    const aumPart = d.aum ? `, aum: ${Math.round(d.aum)}` : '';
    lines.push(`  ${etf}: { name: ${JSON.stringify(d.name)}, manager: ${JSON.stringify(d.manager || '')}${aumPart} },`);
  }
  if (lines.length === 0) return null;
  return [
    '// @@GENERATED:ETF_INFO@@',
    'export const ETF_INFO: Record<string, { name: string; manager: string; aum?: number }> = {',
    ...lines,
    '};',
    '// @@END_GENERATED:ETF_INFO@@',
  ].join('\n');
}

// ── Base index (SPY / QQQ) generator ─────────────────────────────────────────
// Powers the portfolio builder's selectable index core. Holdings come from the
// scraped raw file (QQQ via Invesco, SPY via StockAnalysis); price series come
// from the same Yahoo paths used for the theme charts. Returns null if either
// index is missing so a partial fetch never wipes good data.
function genBaseIndex(holdingsMap, spyData, qqqData) {
  const PERIODS  = ['1W', '1M', 'YTD', '6M', '1Y'];
  const PERIOD_N = { '1W': 5, '1M': 21, 'YTD': 26, '6M': 26, '1Y': 52 };
  if (!holdingsMap['SPY'] || !holdingsMap['QQQ']) return null;

  const top5 = etf => [...(holdingsMap[etf] || [])]
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 5)
    .map(x => `{ t: '${x.ticker}', w: ${parseFloat(x.weight.toFixed(2))} }`)
    .join(', ');

  const chart = data => PERIODS.map(p => {
    const n = PERIOD_N[p];
    const path = (data?.paths?.[p]?.length === n) ? data.paths[p] : Array.from({ length: n }, () => 100);
    return `'${p}': [${path.join(', ')}]`;
  }).join(', ');

  return [
    '// @@GENERATED:BASE_INDEX@@',
    `export const BASE_INDEX_NAMES: Record<BaseIndexId, string> = { SPY: 'S&P 500', QQQ: 'Nasdaq 100' };`,
    'export const BASE_INDEX_HOLDINGS: Record<BaseIndexId, EtfHolding[]> = {',
    `  SPY: [${top5('SPY')}],`,
    `  QQQ: [${top5('QQQ')}],`,
    '};',
    'export const BASE_INDEX_CHART: Record<BaseIndexId, Record<Period, number[]>> = {',
    `  SPY: { ${chart(spyData)} },`,
    `  QQQ: { ${chart(qqqData)} },`,
    '};',
    '// @@END_GENERATED:BASE_INDEX@@',
  ].join('\n');
}

// ── Theme representative ETFs generator (portfolio builder dial) ──────────────
// Per theme: rank ETFs by 0.5*6M + 0.5*1Y return, take the top one, then the
// next-best whose 1Y daily-increment correlation with it is < 0.9 (falls back to
// the least-correlated if none clear the bar). Average the two paths equally; the
// theme's return is the averaged-series endpoint, so a 100%-in-one-theme mix in
// the builder shows exactly that figure.
function pearson(a, b) {
  const n = Math.min(a.length, b.length);
  if (n < 3) return 1;
  let sa = 0, sb = 0;
  for (let i = 0; i < n; i++) { sa += a[i]; sb += b[i]; }
  const ma = sa / n, mb = sb / n;
  let num = 0, da = 0, db = 0;
  for (let i = 0; i < n; i++) { const x = a[i] - ma, y = b[i] - mb; num += x * y; da += x * x; db += y * y; }
  return (da && db) ? num / Math.sqrt(da * db) : 1;
}
function pathIncrements(path) {
  const r = [];
  for (let i = 1; i < path.length; i++) r.push(path[i] / path[i - 1] - 1);
  return r;
}
function genThemeReps(themeEtfs, etfDataMap) {
  const PERIODS  = ['1W', '1M', 'YTD', '6M', '1Y'];
  const PERIOD_N = { '1W': 5, '1M': 21, 'YTD': 26, '6M': 26, '1Y': 52 };
  const CORR_MAX = 0.8;
  const TARGET_REPS = 3; // equal-weight blend of up to 3 non-correlated ETFs
  const blocks = [];

  for (const [theme, tickers] of Object.entries(themeEtfs)) {
    const cands = tickers.filter(t => {
      const d = etfDataMap[t];
      return d && d.returns?.['6M'] != null && d.returns?.['1Y'] != null && d.paths?.['1Y']?.length === 52;
    });
    if (cands.length === 0) continue; // UI falls back to the composite line

    const score  = t => 0.5 * etfDataMap[t].returns['6M'] + 0.5 * etfDataMap[t].returns['1Y'];
    const ranked = [...cands].sort((a, b) => score(b) - score(a));
    const incOf  = t => pathIncrements(etfDataMap[t].paths['1Y']);

    // Equal-weight blend of up to 3 ETFs: take the top scorer, then greedily add
    // the next-best whose 1Y increments stay below CORR_MAX vs EVERY ETF already
    // chosen (least-correlated fallback if none clear the bar). Same high-perf +
    // non-correlation formula, extended from a pair to a trio.
    const chosen = [ranked[0]];
    while (chosen.length < TARGET_REPS && chosen.length < ranked.length) {
      const chosenInc = chosen.map(incOf);
      let pick = null, fallback = null, fallbackCorr = Infinity;
      for (let i = 1; i < ranked.length; i++) {
        const t = ranked[i];
        if (chosen.includes(t)) continue;
        const incT = incOf(t);
        const maxC = Math.max(...chosenInc.map(c => pearson(c, incT)));
        if (maxC < fallbackCorr) { fallbackCorr = maxC; fallback = t; }
        if (maxC < CORR_MAX) { pick = t; break; }
      }
      const next = pick || fallback;
      if (!next) break;
      chosen.push(next);
    }
    const series = PERIODS.map(p => ({ p, avg: averagePaths(chosen.map(t => etfDataMap[t].paths?.[p]), PERIOD_N[p]) }));
    const seriesStr = series.map(s => `'${s.p}': [${s.avg.join(', ')}]`).join(', ');
    const retStr    = series.map(s => `'${s.p}': ${parseFloat((s.avg[s.avg.length - 1] - 100).toFixed(1))}`).join(', ');

    blocks.push(`  '${theme}': { etfs: [${chosen.map(t => `'${t}'`).join(', ')}], series: { ${seriesStr} }, returns: { ${retStr} } },`);
  }

  if (blocks.length === 0) return null;
  return [
    '// @@GENERATED:THEME_REPRESENTATIVES@@',
    'export const THEME_REPRESENTATIVES: Partial<Record<Theme, ThemeRep>> = {',
    ...blocks,
    '};',
    '// @@END_GENERATED:THEME_REPRESENTATIVES@@',
  ].join('\n');
}

// ── Patch data.ts in-place ───────────────────────────────────────────────────

function patchDataTs(newEtfCount, newSampleData, newTimestamp, newEtfReturns, newTop10Ret, newSpyRet, newIndexChart, newThemeBenchmarks, newCrossTheme, newEtfTopHoldings, newBaseIndex, newThemeReps, newEtfDayChange, newHoldingsCount, newEtfInfo) {
  let src = fs.readFileSync(DATA_PATH, 'utf8');

  src = src.replace(
    /\/\/ @@GENERATED:SCAN_TIMESTAMP@@[\s\S]*?\/\/ @@END_GENERATED:SCAN_TIMESTAMP@@/,
    newTimestamp
  );
  src = src.replace(
    /\/\/ @@GENERATED:THEME_ETF_COUNT@@[\s\S]*?\/\/ @@END_GENERATED:THEME_ETF_COUNT@@/,
    newEtfCount
  );
  if (newHoldingsCount) {
    src = src.replace(
      /\/\/ @@GENERATED:HOLDINGS_COUNT@@[\s\S]*?\/\/ @@END_GENERATED:HOLDINGS_COUNT@@/,
      newHoldingsCount
    );
  }
  src = src.replace(
    /\/\/ @@GENERATED:SAMPLE_DATA@@[\s\S]*?\/\/ @@END_GENERATED:SAMPLE_DATA@@/,
    newSampleData
  );
  if (newEtfReturns) {
    src = src.replace(
      /\/\/ @@GENERATED:ETF_RETURNS@@[\s\S]*?\/\/ @@END_GENERATED:ETF_RETURNS@@/,
      newEtfReturns
    );
  }
  if (newTop10Ret) {
    src = src.replace(
      /\/\/ @@GENERATED:TOP10_RET@@[\s\S]*?\/\/ @@END_GENERATED:TOP10_RET@@/,
      newTop10Ret
    );
  }
  if (newSpyRet) {
    src = src.replace(
      /\/\/ @@GENERATED:SPY_RET@@[\s\S]*?\/\/ @@END_GENERATED:SPY_RET@@/,
      newSpyRet
    );
  }
  if (newIndexChart) {
    src = src.replace(
      /\/\/ @@GENERATED:INDEX_CHART_DATA@@[\s\S]*?\/\/ @@END_GENERATED:INDEX_CHART_DATA@@/,
      newIndexChart
    );
  }
  if (newThemeBenchmarks) {
    src = src.replace(
      /\/\/ @@GENERATED:THEME_BENCHMARKS@@[\s\S]*?\/\/ @@END_GENERATED:THEME_BENCHMARKS@@/,
      newThemeBenchmarks
    );
  }
  if (newCrossTheme) {
    src = src.replace(
      /\/\/ @@GENERATED:CROSS_THEME_TOP10@@[\s\S]*?\/\/ @@END_GENERATED:CROSS_THEME_TOP10@@/,
      newCrossTheme
    );
  }
  if (newEtfTopHoldings) {
    src = src.replace(
      /\/\/ @@GENERATED:ETF_TOP_HOLDINGS@@[\s\S]*?\/\/ @@END_GENERATED:ETF_TOP_HOLDINGS@@/,
      newEtfTopHoldings
    );
  }
  if (newBaseIndex) {
    src = src.replace(
      /\/\/ @@GENERATED:BASE_INDEX@@[\s\S]*?\/\/ @@END_GENERATED:BASE_INDEX@@/,
      newBaseIndex
    );
  }
  if (newThemeReps) {
    src = src.replace(
      /\/\/ @@GENERATED:THEME_REPRESENTATIVES@@[\s\S]*?\/\/ @@END_GENERATED:THEME_REPRESENTATIVES@@/,
      newThemeReps
    );
  }
  if (newEtfDayChange) {
    src = src.replace(
      /\/\/ @@GENERATED:ETF_DAY_CHANGE@@[\s\S]*?\/\/ @@END_GENERATED:ETF_DAY_CHANGE@@/,
      newEtfDayChange
    );
  }
  if (newEtfInfo) {
    src = src.replace(
      /\/\/ @@GENERATED:ETF_INFO@@[\s\S]*?\/\/ @@END_GENERATED:ETF_INFO@@/,
      newEtfInfo
    );
  }

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

  // Build ETF scan results — which ETFs have holdings, which are missing.
  // Fold in fetch error reasons (from scan-errors.json) so a failed ETF shows WHY.
  let scanErrors = { byTicker: {}, failures: [] };
  try { scanErrors = JSON.parse(fs.readFileSync(SCAN_ERRORS_PATH, 'utf8')); } catch { /* no sidecar this run */ }

  const allDefinedEtfs = [...new Set(Object.values(THEME_ETFS).flat())];
  const etfScanResults = {};
  for (const etf of allDefinedEtfs) {
    const holdings = holdingsMap[etf];
    if (holdings) {
      etfScanResults[etf] = { ok: true, count: holdings.length };
    } else {
      const reason = scanErrors.byTicker && scanErrors.byTicker[etf];
      etfScanResults[etf] = reason
        ? { ok: false, count: 0, error: reason }
        : { ok: false, count: 0 };
    }
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
    const yfTicker = YAHOO_TICKER_MAP[ticker] || ticker;
    process.stdout.write(`  ${ticker}${yfTicker !== ticker ? ` (${yfTicker})` : ''}... `);
    const fin = await fetchFinancials(yfTicker);
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

  // ── Fetch real ETF data (returns + price paths) for all themes + SPY ─────────
  const allEtfTickers = [...new Set(Object.values(THEME_ETFS).flat())];
  console.log(`\nFetching ETF data for ${allEtfTickers.length} ETFs + SPY...`);

  const etfDataMap    = {}; // ticker → { returns, paths }
  const etfReturnsMap = {}; // ticker → returns (flat, for genEtfReturns / genTop10Ret)

  for (const ticker of allEtfTickers) {
    process.stdout.write(`  ${ticker}... `);
    const data = await fetchEtfData(ticker);
    if (data) {
      etfDataMap[ticker]    = data;
      etfReturnsMap[ticker] = data.returns;
      const r = data.returns;
      console.log(`1W:${r['1W']}% 1M:${r['1M']}% 6M:${r['6M']}% 1Y:${r['1Y']}%`);
    } else {
      console.log('FAILED — keeping previous value');
    }
    await sleep(600);
  }

  // SPY benchmark
  process.stdout.write(`  SPY... `);
  const spyData = await fetchEtfData('SPY');
  const spyRet  = spyData?.returns ?? null;
  if (spyRet) {
    console.log(`1W:${spyRet['1W']}% 1M:${spyRet['1M']}% 6M:${spyRet['6M']}% 1Y:${spyRet['1Y']}%`);
  } else {
    console.log('FAILED — SPY benchmark unchanged');
  }

  // QQQ base index (portfolio builder core option)
  process.stdout.write(`  QQQ... `);
  const qqqData = await fetchEtfData('QQQ');
  if (qqqData?.returns) {
    const q = qqqData.returns;
    console.log(`1W:${q['1W']}% 1M:${q['1M']}% 6M:${q['6M']}% 1Y:${q['1Y']}%`);
  } else {
    console.log('FAILED — QQQ base index unchanged');
  }

  // Timestamps
  const isoTs = new Date().toISOString();
  const nyTs  = getNyTimestamp();

  // Write scan-report.json for the email sender
  const scanReport = {
    scanTimestamp:   isoTs,
    scanTimestampNY: nyTs,
    etfScan: {
      results:     etfScanResults,
      total:       allDefinedEtfs.length,
      ok:          Object.values(etfScanResults).filter(r => r.ok).length,
      failed:      allDefinedEtfs.filter(e => !etfScanResults[e].ok),
      fetchErrors: scanErrors.failures || [],
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
  const newEtfCount        = genThemeEtfCount(etfCounts);
  const newSampleData      = genSampleData(themeEquities, financialsMap, etfCounts, velocityMap, isNewMap);
  const newTimestamp       = genScanTimestamp(isoTs, nyTs);
  const newEtfReturns      = genEtfReturns(etfReturnsMap, THEME_ETFS);
  const newTop10Ret        = genTop10Ret(etfReturnsMap, THEME_ETFS);
  const newSpyRet          = spyRet ? genSpyRet(spyRet) : null;
  const newIndexChart      = genIndexChartData(THEME_ETFS, etfDataMap, spyData, todayStr);
  const newThemeBenchmarks = genThemeBenchmarks(etfReturnsMap);
  const newCrossTheme      = genCrossThemeTop10(themeEquities, financialsMap);
  const newEtfTopHoldings  = genEtfTopHoldings(holdingsMap, THEME_ETFS);
  const newBaseIndex       = genBaseIndex(holdingsMap, spyData, qqqData);
  const newThemeReps       = genThemeReps(THEME_ETFS, etfDataMap);
  const newEtfDayChange    = genEtfDayChange(etfReturnsMap, THEME_ETFS);
  const newHoldingsCount   = genHoldingsCount(holdingsMap);
  const newEtfInfo         = genEtfInfo(etfDataMap, THEME_ETFS);

  // Patch data.ts
  patchDataTs(newEtfCount, newSampleData, newTimestamp, newEtfReturns, newTop10Ret, newSpyRet, newIndexChart, newThemeBenchmarks, newCrossTheme, newEtfTopHoldings, newBaseIndex, newThemeReps, newEtfDayChange, newHoldingsCount, newEtfInfo);

  const etfDataOk = Object.keys(etfDataMap).length;
  console.log('\n=== data.ts updated ===');
  console.log(`Timestamp: ${nyTs}`);
  console.log(`ETFs: ${scanReport.etfScan.ok}/${scanReport.etfScan.total} ok`);
  console.log(`ETF data (returns+paths): ${etfDataOk}/${allEtfTickers.length} ok${spyRet ? ' + SPY' : ' (SPY FAILED)'}`);
  console.log(`Index chart: real historical paths written for all 5 themes`);
  console.log(`Yahoo Finance: ${yfSucceeded.length}/${allTickers.length} ok`);
  console.log(`Themes: ${Object.entries(themeEquities).map(([t,e]) => `${t}(${e.length})`).join(', ')}`);
}

main().catch(e => { console.error(e); process.exit(1); });
