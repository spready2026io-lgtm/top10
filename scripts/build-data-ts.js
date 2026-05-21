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

const RAW_PATH  = path.join(__dirname, '..', 'lib', 'holdings-raw.json');
const DATA_PATH = path.join(__dirname, '..', 'lib', 'data.ts');

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

function formatMarketCap(n) {
  if (!n || isNaN(n)) return 'N/A';
  if (n >= 1e12) return `$${(n / 1e12).toFixed(1)}T`;
  if (n >= 1e9)  return `$${(n / 1e9).toFixed(0)}B`;
  return `$${(n / 1e6).toFixed(0)}M`;
}

async function fetchChartReturns(ticker) {
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

    const last         = valid[valid.length - 1];
    const currentClose = last.close;
    const nowTs        = last.ts;

    const closest = targetTs => valid.reduce((best, d) =>
      Math.abs(d.ts - targetTs) < Math.abs(best.ts - targetTs) ? d : best
    ).close;

    const ret = (startClose) =>
      parseFloat(((currentClose / startClose - 1) * 100).toFixed(1));

    return {
      '1M': ret(closest(nowTs - 30  * 86400)),
      '6M': ret(closest(nowTs - 182 * 86400)),
      '1Y': ret(valid[0].close),
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

    const periodReturns = await fetchChartReturns(ticker);

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
  const scored = Object.entries(equityMap).map(([ticker, data]) => {
    const easyScore = data.etfs.length;
    const proScore  = parseFloat(
      (data.etfs.reduce((s, e) => s + e.weight, 0) / data.etfs.length).toFixed(2)
    );
    const etfPresence = {};
    for (const etf of themeEtfs) {
      const match = data.etfs.find(e => e.etf === etf);
      etfPresence[etf] = match ? parseFloat(match.weight.toFixed(2)) : false;
    }
    return { ticker, name: data.name, easyScore, proScore, etfPresence };
  });

  // Sort: proScore (Weight Score) desc, easyScore as tiebreaker
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

function genEquity(eq, financials, totalEtfs, themeName) {
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

  return [
    `    {`,
    `      ticker: '${eq.ticker}', name: '${escapeStr(eq.name)}', easyScore: ${eq.easyScore}, proScore: ${eq.proScore},`,
    `      price: ${price}, weeklyPrices: ${wpStr}, weeklyChange: ${weeklyChange}, sortRank: 0, periodReturns: { '1M': ${pr['1M']}, '6M': ${pr['6M']}, '1Y': ${pr['1Y']} },`,
    `      marketCap: '${marketCap}', pe: ${pe === null ? 'null' : pe}, revenueGrowth: ${revenueGrowth}, eps: ${eps}, grossMargin: ${grossMargin}, dividendYield: ${divYield === null ? 'null' : divYield},`,
    `      etfPresence: { ${presenceEntries} },`,
    `      tonyNote: '${escapeStr(tonyNote)}',`,
    `    },`,
  ].join('\n');
}

function genSampleData(themeEquities, financialsMap, etfCounts) {
  const themeBlocks = Object.entries(themeEquities).map(([theme, equities]) => {
    const etfs = THEME_ETFS[theme];
    const totalEtfs = etfCounts[theme];
    const eqBlocks = equities.map(eq =>
      genEquity(eq, financialsMap[eq.ticker], totalEtfs, theme)
    ).join('\n');
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

// ── Patch data.ts in-place ───────────────────────────────────────────────────

function patchDataTs(newEtfCount, newSampleData) {
  let src = fs.readFileSync(DATA_PATH, 'utf8');

  // Replace THEME_ETF_COUNT block
  src = src.replace(
    /\/\/ @@GENERATED:THEME_ETF_COUNT@@[\s\S]*?\/\/ @@END_GENERATED:THEME_ETF_COUNT@@/,
    newEtfCount
  );

  // Replace SAMPLE_DATA block
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

  // Collect unique tickers
  const allTickers = [...new Set(
    Object.values(themeEquities).flatMap(eqs => eqs.map(e => e.ticker))
  )];
  console.log(`\nFetching financials for ${allTickers.length} unique tickers...`);

  const financialsMap = {};
  for (const ticker of allTickers) {
    process.stdout.write(`  ${ticker}... `);
    const fin = await fetchFinancials(ticker);
    financialsMap[ticker] = fin;
    console.log(fin ? `$${fin.price}` : 'FAILED');
    await sleep(600);
  }

  // Generate TypeScript blocks
  const newEtfCount  = genThemeEtfCount(etfCounts);
  const newSampleData = genSampleData(themeEquities, financialsMap, etfCounts);

  // Patch data.ts
  patchDataTs(newEtfCount, newSampleData);

  console.log('\n=== data.ts updated ===');
  console.log(`Last updated: ${raw.lastUpdated}`);
  console.log(`Themes: ${Object.entries(themeEquities).map(([t,e]) => `${t}(${e.length})`).join(', ')}`);
}

main().catch(e => { console.error(e); process.exit(1); });
