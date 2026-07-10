#!/usr/bin/env node
'use strict';

// ── International Markets pipeline ──────────────────────────────────────────
// Fully separate from the conviction pipeline (fetch-holdings / build-data-ts).
// These are index funds used as measuring instruments for market-level money
// flow. They must NEVER enter THEME_ETFS or the conviction scoring.
//
// What this script does, daily:
//   1. Yahoo quoteSummary for every tracked fund: price, AUM, shares outstanding.
//   2. Yahoo 1y chart for the 18 tile instruments: period returns + sparklines.
//   3. iShares holdings API for the 8 regional lens funds: countryOfRisk
//      aggregated to country weights (verified live 2026-07-09 on EFA).
//   4. Appends today's {sharesOutstanding, price, aum} snapshot to
//      lib/markets-history.json. Net flow ($) = change in shares x price, so
//      flow figures light up automatically once history spans the window.
//   5. Generates lib/markets-data.ts (standalone, imported only by /markets).

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
  console.log('[Yahoo] crumb obtained');
}

const HISTORY_PATH = path.join(__dirname, '..', 'lib', 'markets-history.json');
const DATA_PATH    = path.join(__dirname, '..', 'lib', 'markets-data.ts');
const NOTES_PATH   = path.join(__dirname, '..', 'lib', 'markets-tony-notes.json');

const THIN_AUM = 100e6; // under $100M shows the thin-fund badge (CEO ruling 2026-07-09)

// ── Market tiles (CEO ruling 2026-07-09): Europe as one region tile, UK and
//    Japan standalone, all Asian countries one by one (China twice: offshore
//    MCHI + onshore CNYA), Latin America = Brazil, Mexico, Argentina, Chile.
const MARKET_TILES = [
  { ticker: 'IEUR', market: 'Europe',         flag: '🇪🇺', region: 'Europe',        kind: 'region'  },
  { ticker: 'EWU',  market: 'United Kingdom', flag: '🇬🇧', region: 'Europe',        kind: 'country' },

  { ticker: 'EWJ',  market: 'Japan',          flag: '🇯🇵', region: 'Asia',          kind: 'country' },
  { ticker: 'MCHI', market: 'China',          flag: '🇨🇳', region: 'Asia',          kind: 'country' },
  { ticker: 'CNYA', market: 'China A-Shares', flag: '🇨🇳', region: 'Asia',          kind: 'country' },
  { ticker: 'EWH',  market: 'Hong Kong',      flag: '🇭🇰', region: 'Asia',          kind: 'country' },
  { ticker: 'EWT',  market: 'Taiwan',         flag: '🇹🇼', region: 'Asia',          kind: 'country' },
  { ticker: 'EWY',  market: 'South Korea',    flag: '🇰🇷', region: 'Asia',          kind: 'country' },
  { ticker: 'INDA', market: 'India',          flag: '🇮🇳', region: 'Asia',          kind: 'country' },
  { ticker: 'EWS',  market: 'Singapore',      flag: '🇸🇬', region: 'Asia',          kind: 'country' },
  { ticker: 'EIDO', market: 'Indonesia',      flag: '🇮🇩', region: 'Asia',          kind: 'country' },
  { ticker: 'EWM',  market: 'Malaysia',       flag: '🇲🇾', region: 'Asia',          kind: 'country' },
  { ticker: 'THD',  market: 'Thailand',       flag: '🇹🇭', region: 'Asia',          kind: 'country' },
  { ticker: 'EPHE', market: 'Philippines',    flag: '🇵🇭', region: 'Asia',          kind: 'country' },

  { ticker: 'EWZ',  market: 'Brazil',         flag: '🇧🇷', region: 'Latin America', kind: 'country' },
  { ticker: 'EWW',  market: 'Mexico',         flag: '🇲🇽', region: 'Latin America', kind: 'country' },
  { ticker: 'ARGT', market: 'Argentina',      flag: '🇦🇷', region: 'Latin America', kind: 'country' }, // Global X, only pure Argentina vehicle
  { ticker: 'ECH',  market: 'Chile',          flag: '🇨🇱', region: 'Latin America', kind: 'country' },
];

// ── Regional lens funds: broad iShares internationals whose countryOfRisk
//    breakdown shows where the big allocation money sits. portfolioIds pulled
//    live from the iShares product screener on 2026-07-09.
const LENS_FUNDS = [
  { ticker: 'IXUS', id: '244048', label: 'Total International' },
  { ticker: 'EFA',  id: '239623', label: 'Developed ex-North America' },
  { ticker: 'EEM',  id: '239637', label: 'Emerging Markets' },
  { ticker: 'EMXC', id: '288504', label: 'EM ex-China' },
  { ticker: 'IEUR', id: '264617', label: 'Europe' },
  { ticker: 'EZU',  id: '239644', label: 'Eurozone' },
  { ticker: 'EEMA', id: '239629', label: 'EM Asia' },
  { ticker: 'ILF',  id: '239761', label: 'Latin America' },
];

// ── Flow-only tickers: approved universe members without a v1 tile. We capture
//    shares outstanding daily anyway so history exists the day the CEO adds a
//    tile (flows need baselines; lesson from the June share-count deferral).
const FLOW_ONLY = [
  // European singles (rolled up into the Europe tile for display)
  'EWG', 'EWQ', 'EWL', 'EWN', 'EWI', 'EWP', 'EWD', 'EDEN', 'ENOR', 'EFNL', 'EWK', 'EWO', 'EIRL', 'EPOL', 'TUR',
  // Excluded-from-v1 markets, tracked for later
  'EWA', 'ENZL', 'EWC', 'EIS', 'KSA', 'UAE', 'QAT', 'KWT', 'EZA', 'EPU',
];

// ── iShares portfolio IDs (product screener, pulled live 2026-07-09). Used for
//    the keyFundFacts shares-outstanding fetch. ARGT (Global X) is absent by
//    design: its share count is derived from Yahoo AUM / NAV instead.
const ISHARES_IDS = {
  EPU: '239606', EWA: '239607', EWO: '239609', EWK: '239610', EWZ: '239612',
  EWC: '239615', ECH: '239618', MCHI: '239619', EDEN: '239621', EFA: '239623',
  EEMA: '239629', EEM: '239637', EZU: '239644', EFNL: '239647', EWQ: '239648',
  EWG: '239650', EWH: '239657', INDA: '239659', EIDO: '239661', EIRL: '239662',
  EIS: '239663', EWI: '239664', EWJ: '239665', EWM: '239669', EWW: '239670',
  EWN: '239671', ENZL: '239672', ENOR: '239673', EPHE: '239675', EPOL: '239676',
  EWS: '239678', EZA: '239680', EWY: '239681', EWP: '239683', EWD: '239684',
  EWL: '239685', EWT: '239686', THD: '239688', TUR: '239689', EWU: '239690',
  ILF: '239761', IXUS: '244048', QAT: '264273', UAE: '264275', IEUR: '264617',
  KSA: '271542', CNYA: '273318', EMXC: '288504', KWT: '312763',
};

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── Yahoo: price, AUM, shares outstanding ────────────────────────────────────
async function fetchFund(ticker) {
  const modules = 'price,summaryDetail,defaultKeyStatistics';
  const url = `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${ticker}?modules=${modules}&crumb=${encodeURIComponent(_yfCrumb)}`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': YF_UA, 'Cookie': _yfCookie, 'Accept': 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const r = (await res.json()).quoteSummary?.result?.[0];
    if (!r) throw new Error('empty result');
    return {
      name:  r.price?.longName || r.price?.shortName || ticker,
      price: r.price?.regularMarketPrice?.raw ?? null,
      aum:   r.summaryDetail?.totalAssets?.raw ?? null,
      nav:   r.summaryDetail?.navPrice?.raw ?? null,
      so:    null, // filled by fetchISharesSO / derived AUM/NAV below
    };
  } catch (e) {
    console.warn(`  [Yahoo] ${ticker} quoteSummary failed: ${e.message}`);
    return { name: ticker, price: null, aum: null, nav: null, so: null };
  }
}

// ── iShares keyFundFacts: authoritative daily shares outstanding ─────────────
// (Yahoo does not expose sharesOutstanding for ETFs; verified 2026-07-09.)
async function fetchISharesSO(ticker, id) {
  const url = `https://www.ishares.com/varnish-api/blk-one01-product-data/product-data/api/v2/get-product-data?appSubType=ISHARES&appType=PRODUCT_PAGE&component=keyFundFacts&locale=en_US&targetSite=us-ishares&portfolioId=${id}`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': YF_UA, 'Referer': `https://www.ishares.com/us/products/${id}/` } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const dp = (await res.json()).componentsByNameMap?.keyFundFacts?.containersByNameMap?.default?.dataPointsByNameMap;
    const raw = dp?.sharesOutstanding?.formattedValue;
    const so = raw ? parseInt(String(raw).replace(/[^0-9]/g, ''), 10) : null;
    return so && so > 0 ? so : null;
  } catch (e) {
    console.warn(`  [iShares SO] ${ticker} failed: ${e.message}`);
    return null;
  }
}

// ── Yahoo: 1y chart → period returns + sparkline samples ────────────────────
async function fetchTileChart(ticker, currentPrice) {
  const empty = { returns: { '1W': 0, '1M': 0, 'YTD': 0, '6M': 0, '1Y': 0 }, history: null, raw: null };
  try {
    const url = `https://query2.finance.yahoo.com/v8/finance/chart/${ticker}?range=1y&interval=1d&crumb=${encodeURIComponent(_yfCrumb)}`;
    const res = await fetch(url, { headers: { 'User-Agent': YF_UA, 'Cookie': _yfCookie, 'Accept': 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const result = (await res.json()).chart?.result?.[0];
    if (!result) throw new Error('no chart result');
    const closes = result.indicators.quote[0].close;
    const valid = result.timestamp
      .map((ts, i) => ({ ts, close: closes[i] }))
      .filter(d => d.close != null);
    if (valid.length < 10) throw new Error('insufficient data');
    const px = currentPrice ?? valid[valid.length - 1].close;

    const lastDate = new Date(valid[valid.length - 1].ts * 1000);
    const calTs = (months, years = 0) => {
      const d = new Date(lastDate);
      d.setMonth(d.getMonth() - months);
      d.setFullYear(d.getFullYear() - years);
      return Math.floor(d.getTime() / 1000);
    };
    const closest = targetTs => valid.reduce((best, d) =>
      Math.abs(d.ts - targetTs) < Math.abs(best.ts - targetTs) ? d : best
    ).close;
    const ret = start => parseFloat(((px / start - 1) * 100).toFixed(1));

    function sample(arr, n) {
      if (arr.length === 0) return [];
      const pts = arr.length <= n
        ? arr.map(d => parseFloat(d.close.toFixed(2)))
        : Array.from({ length: n }, (_, i) => {
            const idx = Math.min(Math.round(i * (arr.length - 1) / (n - 1)), arr.length - 1);
            return parseFloat(arr[idx].close.toFixed(2));
          });
      pts[pts.length - 1] = parseFloat(px.toFixed(2));
      return pts;
    }

    const last1W = valid.slice(-5);
    const last1M = valid.filter(d => d.ts >= calTs(1));
    const last6M = valid.filter(d => d.ts >= calTs(6));
    const ytdStartTs   = Math.floor(Date.UTC(lastDate.getUTCFullYear(), 0, 1) / 1000);
    const ytdInYear    = valid.filter(d => d.ts >= ytdStartTs);
    const priorYearEnd = valid.filter(d => d.ts < ytdStartTs).slice(-1)[0];
    const lastYTD      = priorYearEnd ? [priorYearEnd, ...ytdInYear] : ytdInYear;

    return {
      returns: {
        '1W':  last1W.length >= 2 ? parseFloat(((px / last1W[0].close - 1) * 100).toFixed(2)) : 0,
        '1M':  ret(closest(calTs(1))),
        'YTD': lastYTD.length >= 2 ? ret(lastYTD[0].close) : 0,
        '6M':  ret(closest(calTs(6))),
        '1Y':  ret(closest(calTs(0, 1))),
      },
      history: {
        '1W':  sample(last1W, 5),
        '1M':  sample(last1M, 21),
        'YTD': sample(lastYTD, 26),
        '6M':  sample(last6M, 26),
        '1Y':  sample(valid, 52),
      },
      raw: valid, // full daily closes with timestamps — used in-script for correlations, never emitted
    };
  } catch (e) {
    console.warn(`  [Yahoo chart] ${ticker} failed: ${e.message}`);
    return empty;
  }
}

// ── Pearson correlation of daily returns vs a reference series over ~6 months,
//    matched by trading DAY. Both series must come from the same run: sampled
//    series from different pipeline runs sit on different date grids, and
//    pairing those fakes a near-zero correlation (observed 0.07 for IXUS-SPY
//    where the date-matched truth is ~0.7). Computed here, displayed verbatim.
function corrVsRef6M(raw, refRaw) {
  if (!raw || !refRaw || raw.length < 30 || refRaw.length < 30) return null;
  const refByDay = new Map(refRaw.map(d => [Math.floor(d.ts / 86400), d.close]));
  const cutoff = raw[raw.length - 1].ts - 183 * 86400;
  const pairs = raw
    .filter(d => d.ts >= cutoff && refByDay.has(Math.floor(d.ts / 86400)))
    .map(d => [d.close, refByDay.get(Math.floor(d.ts / 86400))]);
  if (pairs.length < 30) return null;
  const ra = [], rb = [];
  for (let i = 1; i < pairs.length; i++) {
    ra.push(pairs[i][0] / pairs[i - 1][0] - 1);
    rb.push(pairs[i][1] / pairs[i - 1][1] - 1);
  }
  const mean = x => x.reduce((s, v) => s + v, 0) / x.length;
  const ma = mean(ra), mb = mean(rb);
  let num = 0, da = 0, db = 0;
  for (let i = 0; i < ra.length; i++) {
    num += (ra[i] - ma) * (rb[i] - mb);
    da += (ra[i] - ma) ** 2;
    db += (rb[i] - mb) ** 2;
  }
  const den = Math.sqrt(da * db);
  return den ? parseFloat((num / den).toFixed(2)) : null;
}

// ── iShares: countryOfRisk aggregation for a lens fund ──────────────────────
async function fetchLensCountries({ ticker, id }) {
  const url = `https://www.ishares.com/varnish-api/blk-one01-product-data/product-data/api/v2/get-product-data?appSubType=ISHARES&appType=PRODUCT_PAGE&component=holdings.all&locale=en_US&targetSite=us-ishares&portfolioId=${id}`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': YF_UA, 'Referer': `https://www.ishares.com/us/products/${id}/` } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const dp = (await res.json()).componentsByNameMap?.holdings?.containersByNameMap?.all?.dataPointsByNameMap;
    if (!dp) throw new Error('dataPointsByNameMap not found');
    const countries = dp.countryOfRisk?.formattedValue || [];
    const weights   = dp.holdingPercent?.formattedValue || [];
    const agg = {};
    for (let i = 0; i < countries.length; i++) {
      const c = (countries[i] || '').trim();
      const w = parseFloat(weights[i]);
      if (!c || c === '-' || !w || w <= 0) continue;
      agg[c] = (agg[c] || 0) + w;
    }
    const list = Object.entries(agg)
      .map(([c, w]) => ({ c, w: parseFloat(w.toFixed(2)) }))
      .filter(e => e.w >= 0.5)
      .sort((a, b) => b.w - a.w);
    console.log(`  [iShares] ${ticker}: ${list.length} countries, top = ${list[0]?.c} ${list[0]?.w}%`);
    return list;
  } catch (e) {
    console.warn(`  [iShares] ${ticker} failed: ${e.message}`);
    return null;
  }
}

// ── Flow math off the local snapshot history ─────────────────────────────────
function loadHistory() {
  try { return JSON.parse(fs.readFileSync(HISTORY_PATH, 'utf8')); } catch { return {}; }
}

// Closest snapshot to (today - daysBack) within +/- tolerance days that has
// shares-outstanding data for the ticker. Returns null until history matures.
function findBaseline(history, todayStr, ticker, daysBack, tolerance) {
  const target = new Date(todayStr + 'T00:00:00Z').getTime() - daysBack * 86400e3;
  let best = null, bestDist = Infinity;
  for (const [date, snap] of Object.entries(history)) {
    if (date === todayStr) continue;
    const e = snap[ticker];
    if (!e || !e.so) continue;
    const dist = Math.abs(new Date(date + 'T00:00:00Z').getTime() - target);
    if (dist < bestDist) { bestDist = dist; best = e; }
  }
  return best && bestDist <= tolerance * 86400e3 ? best : null;
}

function calcFlow(history, todayStr, ticker, now, daysBack, tolerance) {
  if (!now.so || !now.price) return null;
  const base = findBaseline(history, todayStr, ticker, daysBack, tolerance);
  if (!base) return null;
  const usd = (now.so - base.so) * now.price;
  const pct = (now.so / base.so - 1) * 100;
  return { usd: Math.round(usd), pct: parseFloat(pct.toFixed(2)) };
}

// ── Main ─────────────────────────────────────────────────────────────────────
(async () => {
  await yfInit();

  const notes = fs.existsSync(NOTES_PATH) ? JSON.parse(fs.readFileSync(NOTES_PATH, 'utf8')) : {};
  const todayStr = new Date().toISOString().slice(0, 10);

  const allTickers = [...new Set([
    ...MARKET_TILES.map(m => m.ticker),
    ...LENS_FUNDS.map(l => l.ticker),
    ...FLOW_ONLY,
  ])];

  console.log(`[Markets] fetching ${allTickers.length} funds via Yahoo...`);
  const funds = {};
  for (const t of allTickers) {
    funds[t] = await fetchFund(t);
    await sleep(250);
  }

  // Guard: a broken Yahoo session must not write garbage (zero-price rule).
  const alive = allTickers.filter(t => funds[t].price > 0).length;
  if (alive < Math.ceil(allTickers.length * 0.8)) {
    console.error(`ERROR: only ${alive}/${allTickers.length} funds returned a price. Yahoo auth likely failed. Nothing written.`);
    process.exit(1);
  }

  console.log('[Markets] fetching iShares shares outstanding...');
  for (const t of allTickers) {
    if (ISHARES_IDS[t]) {
      funds[t].so = await fetchISharesSO(t, ISHARES_IDS[t]);
      await sleep(400);
    }
    // Fallback (and ARGT's only path): derive share count from AUM / NAV.
    // Slightly noisier than the issuer number but consistent day over day.
    if (!funds[t].so && funds[t].aum && funds[t].nav) {
      funds[t].so = Math.round(funds[t].aum / funds[t].nav);
    }
  }
  const noSo = allTickers.filter(t => !funds[t].so);
  if (noSo.length) console.warn(`  [warn] no sharesOutstanding for: ${noSo.join(', ')}`);
  console.log(`[Markets] shares outstanding resolved for ${allTickers.length - noSo.length}/${allTickers.length} funds.`);

  console.log('[Markets] fetching tile charts...');
  const charts = {};
  for (const m of MARKET_TILES) {
    charts[m.ticker] = await fetchTileChart(m.ticker, funds[m.ticker].price);
    await sleep(250);
  }

  // Lens funds get the same chart treatment as tiles: their price history powers
  // the portfolio builder's world sleeve. Reuse a tile's chart when shared (IEUR).
  console.log('[Markets] fetching lens charts...');
  const lensCharts = {};
  for (const l of LENS_FUNDS) {
    lensCharts[l.ticker] = charts[l.ticker] ?? await fetchTileChart(l.ticker, funds[l.ticker].price);
    if (!charts[l.ticker]) await sleep(250);
  }

  // SPY reference from THIS run, so lens-vs-S&P correlations pair by real
  // trading day instead of across two pipelines' different date grids.
  console.log('[Markets] fetching SPY reference for correlations...');
  const spyRef = await fetchTileChart('SPY', null);

  console.log('[Markets] fetching lens country weights...');
  const lensCountries = {};
  for (const l of LENS_FUNDS) {
    lensCountries[l.ticker] = await fetchLensCountries(l);
    await sleep(1200);
  }

  // History: append today's snapshot BEFORE computing flows (flows exclude today's
  // own entry via findBaseline's date guard).
  const history = loadHistory();
  history[todayStr] = {};
  for (const t of allTickers) {
    const f = funds[t];
    history[todayStr][t] = { so: f.so, p: f.price, aum: f.aum };
  }
  const dates = Object.keys(history).sort();
  for (const d of dates.slice(0, Math.max(0, dates.length - 400))) delete history[d];
  fs.writeFileSync(HISTORY_PATH, JSON.stringify(history));
  console.log(`[Markets] history snapshot saved for ${todayStr} (${dates.length} dates on file)`);

  const flowSince = dates[0];

  // ── Generate markets-data.ts ───────────────────────────────────────────────
  const nyTime = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York',
    month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true,
  });

  const tiles = MARKET_TILES.map(m => {
    const f = funds[m.ticker];
    const ch = charts[m.ticker];
    return {
      ticker: m.ticker,
      market: m.market,
      flag: m.flag,
      region: m.region,
      kind: m.kind,
      name: f.name,
      price: f.price ?? 0,
      aum: f.aum ?? 0,
      thin: (f.aum ?? 0) > 0 && f.aum < THIN_AUM,
      returns: ch.returns,
      history: ch.history,
      flow1W: calcFlow(history, todayStr, m.ticker, { so: f.so, price: f.price }, 7, 3),
      flow1M: calcFlow(history, todayStr, m.ticker, { so: f.so, price: f.price }, 30, 6),
      note: notes[m.ticker] || `${m.market}: tracked via ${m.ticker}.`,
    };
  });

  const lens = LENS_FUNDS.map(l => ({
    ticker: l.ticker,
    label: l.label,
    name: funds[l.ticker].name,
    aum: funds[l.ticker].aum ?? 0,
    flow1W: calcFlow(history, todayStr, l.ticker, { so: funds[l.ticker].so, price: funds[l.ticker].price }, 7, 3),
    flow1M: calcFlow(history, todayStr, l.ticker, { so: funds[l.ticker].so, price: funds[l.ticker].price }, 30, 6),
    returns: lensCharts[l.ticker].returns,
    history: lensCharts[l.ticker].history,
    corrSPY6M: corrVsRef6M(lensCharts[l.ticker].raw, spyRef.raw),
    countries: lensCountries[l.ticker] || [],
  }));

  const ts = `// AUTO-GENERATED by scripts/fetch-markets.js. Do not edit by hand.
// International Markets data: index funds used as measuring instruments for
// market-level money flow. Fully separate from the conviction model (data.ts).
// Regenerated daily by the holdings workflow.

export type MarketRegion = 'Europe' | 'Asia' | 'Latin America';
export type MarketPeriod = '1W' | '1M' | 'YTD' | '6M' | '1Y';
export type MarketFlow = { usd: number; pct: number } | null;

export type MarketTile = {
  ticker: string;        // fund used as the market instrument
  market: string;        // display name of the market
  flag: string;          // emoji flag
  region: MarketRegion;
  kind: 'region' | 'country';
  name: string;          // fund long name
  price: number;
  aum: number;           // fund net assets, 0 if unknown
  thin: boolean;         // AUM under $100M: thin-fund badge
  returns: Record<MarketPeriod, number>;
  history: Record<MarketPeriod, number[]> | null;  // sparkline series
  flow1W: MarketFlow;    // net creation/redemption: delta shares x price
  flow1M: MarketFlow;
  note: string;          // Tony's market note
};

export type LensFund = {
  ticker: string;
  label: string;
  name: string;
  aum: number;
  flow1W: MarketFlow;
  flow1M: MarketFlow;
  returns: Record<MarketPeriod, number>;
  history: Record<MarketPeriod, number[]> | null;  // chart series (powers the portfolio world sleeve)
  corrSPY6M: number | null;  // 6M daily-return correlation vs SPY, date-matched at generation time
  countries: { c: string; w: number }[];  // % of fund by country of risk
};

export const MARKET_TILES: MarketTile[] = ${JSON.stringify(tiles, null, 2)};

export const LENS_FUNDS: LensFund[] = ${JSON.stringify(lens, null, 2)};

export const MARKETS_TIMESTAMP_NY = ${JSON.stringify(nyTime + ' ET')};

// First date in markets-history.json: flow windows are meaningful only once
// history spans them (1W needs a week, 1M a month).
export const FLOW_SINCE = ${JSON.stringify(flowSince)};
`;

  fs.writeFileSync(DATA_PATH, ts);
  console.log(`[Markets] lib/markets-data.ts written: ${tiles.length} tiles, ${lens.length} lens funds.`);
  const flowsLive = tiles.filter(t => t.flow1W).length;
  console.log(`[Markets] 1W flows computable for ${flowsLive}/${tiles.length} tiles (needs ~a week of history).`);
})();
