#!/usr/bin/env node
'use strict';

/**
 * fetch-holdings.js
 * Fetches ETF holdings for 15 ETFs via public JSON/CSV/Excel APIs.
 *
 * Providers and methods:
 *   iShares  (ARTY, BAI, SOXX, IGV)  — Blackrock varnish JSON API
 *   Invesco  (IGPT, PSI, PTF, PBD, PBW, PRN) — dng-api.invesco.com JSON
 *   Invesco  (QQQ)                    — dng-api ticker-based JSON
 *   ARK      (ARKK)                   — public daily CSV
 *   Alger    (ALAI)                   — public daily CSV (with fallback)
 *   SPDR     (XSD)                    — public daily Excel
 */

const fs   = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const OUT_PATH = path.join(__dirname, '..', 'lib', 'holdings-raw.json');

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function fetchJSON(url, headers = {}) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', ...headers },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

async function fetchBuf(url, headers = {}) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', ...headers },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function fetchText(url, headers = {}) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', ...headers },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function isEquityTicker(t) {
  return typeof t === 'string' && /^[A-Z]{1,5}$/.test(t.trim());
}

function parseCSVLine(line) {
  const result = [];
  let cur = '', inQ = false;
  for (const c of line) {
    if (c === '"') inQ = !inQ;
    else if (c === ',' && !inQ) { result.push(cur.trim()); cur = ''; }
    else cur += c;
  }
  result.push(cur.trim());
  return result;
}

// ── iShares (Blackrock varnish JSON API) ─────────────────────────────────────

const ISHARES_ETFS = [
  { ticker: 'ARTY', id: '297905' },
  { ticker: 'BAI',  id: '339081' },
  { ticker: 'SOXX', id: '239705' },
  { ticker: 'IGV',  id: '239771' },
];

async function fetchIShares({ ticker, id }) {
  const url = `https://www.ishares.com/varnish-api/blk-one01-product-data/product-data/api/v2/get-product-data?appSubType=ISHARES&appType=PRODUCT_PAGE&component=holdings.all&locale=en_US&targetSite=us-ishares&portfolioId=${id}`;
  console.log(`  [iShares] ${ticker}...`);
  try {
    const d  = await fetchJSON(url, { 'Referer': `https://www.ishares.com/us/products/${id}/` });
    const dp = d.componentsByNameMap?.holdings?.containersByNameMap?.all?.dataPointsByNameMap;
    if (!dp) throw new Error('dataPointsByNameMap not found');

    const tickers = dp.ticker?.formattedValue || [];
    const names   = dp.issueName?.formattedValue || [];
    const weights = dp.holdingPercent?.formattedValue || [];
    const asset   = dp.assetClass?.formattedValue || [];

    const holdings = [];
    for (let i = 0; i < tickers.length; i++) {
      const t = tickers[i];
      if (!t || t === '-' || !isEquityTicker(t)) continue;
      if (asset[i] && !asset[i].toLowerCase().includes('equity')) continue;
      const w = parseFloat(weights[i]);
      if (!w || w <= 0) continue;
      holdings.push({ ticker: t, name: (names[i] || t).trim(), weight: w });
    }
    console.log(`    → ${holdings.length} equity holdings`);
    return holdings;
  } catch (e) {
    console.error(`    ✗ ${e.message}`);
    return null;
  }
}

// ── Invesco (dng-api.invesco.com JSON) ───────────────────────────────────────

// CUSIP lookup (stable, publicly registered fund identifiers)
const INVESCO_ETFS = [
  { ticker: 'QQQ',  id: 'QQQ',       idType: 'ticker' },
  { ticker: 'IGPT', id: '46137V639', idType: 'cusip'  },
  { ticker: 'PSI',  id: '46137V647', idType: 'cusip'  },
  { ticker: 'PTF',  id: '46137V811', idType: 'cusip'  },
  { ticker: 'PBD',  id: '46138G847', idType: 'cusip'  },
  { ticker: 'PBW',  id: '46137V134', idType: 'cusip'  },
  { ticker: 'PRN',  id: '46137V845', idType: 'cusip'  },
];

async function fetchInvesco({ ticker, id, idType }) {
  const url = `https://dng-api.invesco.com/cache/v1/accounts/en_US/shareclasses/${id}/holdings/fund?idType=${idType}&productType=ETF`;
  console.log(`  [Invesco] ${ticker}...`);
  try {
    const d = await fetchJSON(url);
    const rows = d.holdings;
    if (!Array.isArray(rows)) throw new Error('No holdings array');

    const holdings = rows
      .filter(r => r.securityTypeCode === 'COM' || r.securityTypeName?.toLowerCase().includes('stock'))
      .filter(r => isEquityTicker(r.ticker))
      .map(r => ({
        ticker: r.ticker.trim(),
        name:   (r.issuerName || r.ticker).trim(),
        weight: parseFloat((r.percentageOfTotalNetAssets || 0).toFixed(4)),
      }))
      .filter(r => r.weight > 0);

    console.log(`    → ${holdings.length} equity holdings`);
    return holdings;
  } catch (e) {
    console.error(`    ✗ ${e.message}`);
    return null;
  }
}

// ── ARK (public daily CSV) ───────────────────────────────────────────────────

async function fetchARK() {
  const url = 'https://assets.ark-funds.com/fund-documents/funds-etf-csv/ARK_INNOVATION_ETF_ARKK_HOLDINGS.csv';
  console.log(`  [ARK] ARKK...`);
  try {
    const text = await fetchText(url);
    const rows  = text.split(/\r?\n/).map(parseCSVLine);
    const hdrs  = rows[0].map(h => h.toLowerCase().trim());
    const tIdx  = hdrs.findIndex(h => h === 'ticker');
    const nIdx  = hdrs.findIndex(h => h === 'company');
    const wIdx  = hdrs.findIndex(h => h.includes('weight'));

    const holdings = rows.slice(1)
      .filter(r => isEquityTicker(r[tIdx]))
      .map(r => ({ ticker: r[tIdx].trim(), name: (r[nIdx] || r[tIdx]).trim(), weight: parseFloat(r[wIdx]) || 0 }))
      .filter(r => r.weight > 0);

    console.log(`    → ${holdings.length} equity holdings`);
    return holdings;
  } catch (e) {
    console.error(`    ✗ ${e.message}`);
    return null;
  }
}

// ── Alger (public daily CSV) ─────────────────────────────────────────────────

const ALGER_URLS = [
  'https://www.alger.com/AlgerETFDailyHoldings/Daily_Holdings_Alger_AI_Enablers_&_Adopters_ETF.csv',
  'https://www.alger.com/AlgerETFDailyHoldings/Daily_Holdings_Alger_AI_Enablers_%26_Adopters_ETF.csv',
];

async function fetchAlger() {
  console.log(`  [Alger] ALAI...`);
  for (const url of ALGER_URLS) {
    try {
      const text = await fetchText(url);
      const rows  = text.split(/\r?\n/).map(parseCSVLine);
      const hdrs  = rows[0].map(h => h.toLowerCase().trim());
      const tIdx  = hdrs.findIndex(h => h === 'ticker' || h === 'symbol');
      const nIdx  = hdrs.findIndex(h => !h.includes('product') && (h.includes('description') || h.includes('security') || h.includes('name') || h.includes('holding')));
      const wIdx  = hdrs.findIndex(h => h.includes('weight') || h.includes('% of') || h.includes('pct'));

      if (tIdx === -1) continue;

      const holdings = rows.slice(1)
        .filter(r => isEquityTicker(r[tIdx]))
        .map(r => ({
          ticker: r[tIdx].trim(),
          name:   nIdx >= 0 ? (r[nIdx] || r[tIdx]).trim() : r[tIdx].trim(),
          weight: wIdx >= 0 ? parseFloat(r[wIdx]) || 0 : 0,
        }))
        .filter(r => r.ticker);

      console.log(`    → ${holdings.length} equity holdings`);
      return holdings;
    } catch {}
  }
  console.error('    ✗ All Alger URLs failed');
  return null;
}

// ── SPDR (public daily Excel) ────────────────────────────────────────────────

async function fetchSPDR() {
  const url = 'https://www.ssga.com/library-content/products/fund-data/etfs/us/holdings-daily-us-en-xsd.xlsx';
  console.log(`  [SPDR] XSD...`);
  try {
    const buf  = await fetchBuf(url);
    const wb   = XLSX.read(buf, { type: 'buffer' });
    const ws   = wb.Sheets[wb.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });

    let hIdx = -1;
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i].map(c => String(c).toLowerCase().trim());
      if (row.includes('ticker') || row.includes('symbol')) { hIdx = i; break; }
    }
    if (hIdx === -1) throw new Error('Header not found');

    const hdrs  = rows[hIdx].map(c => String(c).toLowerCase().trim());
    const tIdx  = hdrs.findIndex(h => h === 'ticker' || h === 'symbol');
    const nIdx  = hdrs.findIndex(h => h === 'name' || h.includes('security'));
    const wIdx  = hdrs.findIndex(h => h.includes('weight'));

    const holdings = rows.slice(hIdx + 1)
      .filter(r => isEquityTicker(String(r[tIdx] || '')))
      .map(r => ({
        ticker: String(r[tIdx]).trim(),
        name:   nIdx >= 0 ? String(r[nIdx] || '').trim() : String(r[tIdx]).trim(),
        weight: parseFloat(String(r[wIdx] || 0)) || 0,
      }))
      .filter(r => r.weight > 0);

    console.log(`    → ${holdings.length} equity holdings`);
    return holdings;
  } catch (e) {
    console.error(`    ✗ ${e.message}`);
    return null;
  }
}

// ── Wedbush (IVES, IVEP — direct CSV) ───────────────────────────────────────

const WEDBUSH_ETFS = [
  { ticker: 'IVES', slug: 'ives' },
  { ticker: 'IVEP', slug: 'ivep' },
];

const CASH_TICKERS = new Set(['DTRXX', 'DTCXX', 'FGTXX', 'FGXXX', 'CASH', 'USD', 'OTHER']);

function isCashOrMoneyMarket(t) {
  return CASH_TICKERS.has(t) || /XX+$/.test(t); // catches FGXXX, DTRXX, VMFXX, etc.
}

async function fetchWedbush({ ticker, slug }) {
  const url = `https://wedbushfunds.com/latest-sod-holdings-${slug}`;
  console.log(`  [Wedbush] ${ticker}...`);
  try {
    const text = await fetchText(url);
    const rows = text.trim().split(/\r?\n/).map(parseCSVLine);

    // CSV has metadata rows before actual headers — find the row with 'Ticker'
    const hIdx = rows.findIndex(r => r.some(c => /^ticker$/i.test(c.trim())));
    if (hIdx === -1) throw new Error('Header row not found');

    const hdrs = rows[hIdx].map(h => h.toLowerCase().trim());
    const tIdx = hdrs.findIndex(h => h === 'ticker' || h === 'symbol');
    const nIdx = hdrs.findIndex(h => h === 'name');
    const wIdx = hdrs.findIndex(h => h === 'weight');
    if (tIdx === -1 || wIdx === -1) throw new Error('Missing columns');

    const holdings = rows.slice(hIdx + 1)
      .map(r => ({
        ticker: (r[tIdx] || '').trim(),
        name:   nIdx >= 0 ? (r[nIdx] || '').trim() : (r[tIdx] || '').trim(),
        weight: parseFloat(r[wIdx]) || 0,
      }))
      .filter(r => r.weight > 0 && isEquityTicker(r.ticker) && !isCashOrMoneyMarket(r.ticker));

    console.log(`    → ${holdings.length} equity holdings`);
    return holdings.length > 0 ? holdings : null;
  } catch (e) {
    console.error(`    ✗ ${e.message}`);
    return null;
  }
}

// ── Tema (VOLT — direct CSV) ──────────────────────────────────────────────────

async function fetchTema() {
  // VOLT CSV columns: holdings_date, ticker, cusip, proper_name, shares, market_value, percent_of_nav, is_cash, ...
  // percent_of_nav is a 0-1 decimal (e.g. 0.0796 = 7.96%)
  const url = 'https://temaetfs.com/hubfs/Website/Holdings/VOLT-holdings.csv';
  console.log('  [Tema] VOLT...');
  try {
    const text = await fetchText(url);
    const rows = text.trim().split(/\r?\n/).map(parseCSVLine);
    const hdrs = rows[0].map(h => h.toLowerCase().trim());
    const tIdx = hdrs.findIndex(h => h === 'ticker' || h === 'symbol');
    const nIdx = hdrs.findIndex(h => h === 'proper_name' || h === 'name' || h.includes('security'));
    const wIdx = hdrs.findIndex(h => h === 'percent_of_nav' || h.includes('weight') || h.includes('pct'));
    const cIdx = hdrs.findIndex(h => h === 'is_cash');
    if (tIdx === -1 || wIdx === -1) throw new Error('Missing columns');

    const holdings = rows.slice(1)
      .filter(r => !cIdx || r[cIdx] === '0' || r[cIdx] === '') // exclude cash rows
      .map(r => {
        const rawTick = (r[tIdx] || '').trim().split(/\s+/)[0]; // drop exchange suffix
        let weight = parseFloat(r[wIdx]) || 0;
        if (weight > 0 && weight < 1) weight = parseFloat((weight * 100).toFixed(4)); // 0-1 to %
        return {
          ticker: rawTick,
          name:   nIdx >= 0 ? (r[nIdx] || rawTick).trim() : rawTick,
          weight,
        };
      })
      .filter(r => r.weight > 0 && isEquityTicker(r.ticker) && !isCashOrMoneyMarket(r.ticker));

    console.log(`    → ${holdings.length} equity holdings`);
    return holdings.length > 0 ? holdings : null;
  } catch (e) {
    console.error(`    ✗ ${e.message}`);
    return null;
  }
}

// ── MAGS (hardcoded — always equal-weight Magnificent 7) ─────────────────────

function fetchMAGS() {
  console.log('  [Roundhill] MAGS (hardcoded equal-weight)...');
  const weight = parseFloat((100 / 7).toFixed(4));
  const holdings = [
    { ticker: 'AAPL', name: 'Apple Inc' },
    { ticker: 'MSFT', name: 'Microsoft Corp' },
    { ticker: 'GOOGL', name: 'Alphabet Inc-Cl A' },
    { ticker: 'AMZN', name: 'Amazon.com Inc' },
    { ticker: 'META', name: 'Meta Platforms Inc' },
    { ticker: 'NVDA', name: 'Nvidia Corp' },
    { ticker: 'TSLA', name: 'Tesla Inc' },
  ].map(s => ({ ...s, weight }));
  console.log(`    → ${holdings.length} equity holdings`);
  return holdings;
}

// ── First Trust (AIRR — HTML table parse) ────────────────────────────────────

async function fetchFirstTrust({ ticker }) {
  const url = `https://www.ftportfolios.com/Retail/Etf/EtfHoldings.aspx?Ticker=${ticker}`;
  console.log(`  [First Trust] ${ticker}...`);
  try {
    const html = await fetchText(url, { 'Accept': 'text/html' });

    // Find every row in the holdings table: <tr> containing a 1-5 char uppercase ticker
    // and a weight like "5.87" or "5.87%"
    const holdings = [];
    const rowRe = /<tr[\s\S]*?<\/tr>/gi;
    const cellRe = /<td[^>]*>([\s\S]*?)<\/td>/gi;
    const strip  = s => s.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').trim();

    for (const rowMatch of html.matchAll(rowRe)) {
      const cells = [...rowMatch[0].matchAll(cellRe)].map(m => strip(m[1]));
      if (cells.length < 3) continue;

      const tickerCell = cells.find(c => /^[A-Z]{1,5}$/.test(c));
      if (!tickerCell) continue;

      const weightCell = cells.find(c => /^\d+\.\d+%?$/.test(c.trim()));
      if (!weightCell) continue;

      const nameCell = cells.find(c => c !== tickerCell && c.length > 3 && !/^\d/.test(c) && !c.includes('%'));
      const weight   = parseFloat(weightCell.replace('%', ''));

      if (weight > 0) {
        holdings.push({ ticker: tickerCell, name: nameCell || tickerCell, weight });
      }
    }

    console.log(`    → ${holdings.length} equity holdings`);
    return holdings.length > 0 ? holdings : null;
  } catch (e) {
    console.error(`    ✗ ${e.message}`);
    return null;
  }
}

const FIRSTTRUST_ETFS = [
  { ticker: 'AIRR' },
];

// ── ProShares (QQQA — master daily holdings CSV) ─────────────────────────────
// Single file contains ALL ProShares ETFs. Filter by fund ticker, derive weight
// from Market Value column (col 9). Header at row 3.

const PROSHARES_ETFS = [
  { ticker: 'QQQA' },
];

async function fetchProShares({ ticker }) {
  const url = 'https://accounts.profunds.com/etfdata/psdlyhld.csv';
  console.log(`  [ProShares] ${ticker}...`);
  try {
    const text = await fetchText(url);
    const rows = text.trim().split(/\r?\n/).map(parseCSVLine);

    // Find fund rows: col 0 matches ticker (may have quotes)
    const fundRows = rows.filter(r => {
      const ft = (r[0] || '').replace(/"/g, '').trim();
      return ft === ticker && (r[2] || '').replace(/"/g, '').trim().length > 0;
    });
    if (fundRows.length === 0) throw new Error(`No rows for ${ticker}`);

    // Col 9 = Market Value; sum for weight denominator
    const withMV = fundRows.map(r => {
      const t = (r[2] || '').replace(/"/g, '').trim();
      const n = (r[4] || '').replace(/"/g, '').trim();
      const mv = parseFloat(r[9]) || 0;
      return { ticker: t, name: n, mv };
    }).filter(r => r.mv > 0 && isEquityTicker(r.ticker) && !isCashOrMoneyMarket(r.ticker));

    const totalMV = withMV.reduce((s, r) => s + r.mv, 0);
    if (totalMV === 0) throw new Error('Zero total market value');

    const holdings = withMV.map(r => ({
      ticker: r.ticker,
      name: r.name,
      weight: parseFloat((r.mv / totalMV * 100).toFixed(4)),
    }));

    console.log(`    → ${holdings.length} equity holdings`);
    return holdings.length > 0 ? holdings : null;
  } catch (e) {
    console.error(`    ✗ ${e.message}`);
    return null;
  }
}

// ── Fidelity (FDTX — HTML holdings table) ────────────────────────────────────
// research2.fidelity.com ETF screener returns a server-rendered HTML table
// with columns: Symbol | Company | Weight (%)

const FIDELITY_ETFS = [
  { ticker: 'FDTX' },
];

async function fetchFidelity({ ticker }) {
  const url = `http://research2.fidelity.com/fidelity/screeners/etf/etfholdings.asp?symbol=${ticker}&view=Holdings`;
  console.log(`  [Fidelity] ${ticker}...`);
  try {
    const html = await fetchText(url, {
      'Accept': 'text/html',
      'Referer': 'https://institutional.fidelity.com/',
    });

    const rowRe  = /<tr[\s\S]*?<\/tr>/gi;
    const cellRe = /<td[^>]*>([\s\S]*?)<\/td>/gi;
    const strip  = s => s.replace(/<[^>]*>/g, '').replace(/&#160;/g, ' ').replace(/&amp;/g, '&').trim();

    const holdings = [];
    for (const rowM of html.matchAll(rowRe)) {
      const cells = [...rowM[0].matchAll(cellRe)].map(m => strip(m[1]));
      if (cells.length < 3) continue;
      const t = cells[0].trim();
      const n = cells[1].trim();
      const w = parseFloat(cells[2]);
      if (!isEquityTicker(t) || isCashOrMoneyMarket(t) || !w || w <= 0) continue;
      holdings.push({ ticker: t, name: n, weight: w });
    }

    console.log(`    → ${holdings.length} equity holdings`);
    return holdings.length > 0 ? holdings : null;
  } catch (e) {
    console.error(`    ✗ ${e.message}`);
    return null;
  }
}

// ── VistaShares (AIS, POW — direct CSV endpoint found by inspection) ──────────
// URL discovered: vistashares.com/csv/top-holdings/?etf={TICKER}
// CSV columns: Date, Account, StockTicker, CUSIP, SecurityName, Shares, Price, MarketValue, Weightings, ..., MoneyMarketFlag

const VISTASHARES_ETFS = [
  { ticker: 'AIS' },
  { ticker: 'POW' },
];

async function fetchVistaShares({ ticker }) {
  const url = `https://www.vistashares.com/csv/top-holdings/?etf=${ticker}`;
  console.log(`  [VistaShares] ${ticker}...`);
  try {
    const text = await fetchText(url, {
      'Referer': `https://www.vistashares.com/etf/${ticker.toLowerCase()}/`,
    });
    if (!text || text.trim().startsWith('<!')) throw new Error('Received HTML instead of CSV');

    const rows = text.trim().split(/\r?\n/).map(parseCSVLine);
    const hdrs = rows[0].map(h => h.toLowerCase().trim());
    const tIdx = hdrs.findIndex(h => h === 'stockticker' || h === 'ticker' || h === 'symbol');
    const nIdx = hdrs.findIndex(h => h === 'securityname' || h === 'name' || h.includes('security'));
    const wIdx = hdrs.findIndex(h => h === 'weightings' || h === 'weight' || h.includes('weight'));
    const mmIdx = hdrs.findIndex(h => h === 'moneymarketflag');
    if (tIdx === -1 || wIdx === -1) throw new Error('Missing columns');

    const holdings = rows.slice(1)
      .filter(r => !r[mmIdx] || r[mmIdx].trim() === '') // exclude money market rows
      .map(r => {
        const rawTick = (r[tIdx] || '').replace(/"/g, '').trim().split(/\s+/)[0]; // drop exchange suffix
        const rawW    = (r[wIdx] || '0').replace('%', '').trim();
        return {
          ticker: rawTick,
          name:   nIdx >= 0 ? (r[nIdx] || rawTick).replace(/"/g, '').trim() : rawTick,
          weight: parseFloat(rawW) || 0,
        };
      })
      .filter(r => r.weight > 0 && isEquityTicker(r.ticker) && !isCashOrMoneyMarket(r.ticker));

    console.log(`    → ${holdings.length} equity holdings`);
    return holdings.length > 0 ? holdings : null;
  } catch (e) {
    console.error(`    ✗ ${e.message}`);
    return null;
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('=== fetch-holdings.js ===\n');
  const results = {};

  console.log('[iShares]');
  for (const etf of ISHARES_ETFS) {
    const h = await fetchIShares(etf);
    if (h) results[etf.ticker] = h;
    await sleep(1200);
  }

  console.log('\n[Invesco]');
  for (const etf of INVESCO_ETFS) {
    const h = await fetchInvesco(etf);
    if (h) results[etf.ticker] = h;
    await sleep(800);
  }

  console.log('\n[ARK]');
  const ark = await fetchARK();
  if (ark) results['ARKK'] = ark;

  console.log('\n[Alger]');
  const alger = await fetchAlger();
  if (alger) results['ALAI'] = alger;

  console.log('\n[SPDR]');
  const spdr = await fetchSPDR();
  if (spdr) results['XSD'] = spdr;

  console.log('\n[Wedbush]');
  for (const etf of WEDBUSH_ETFS) {
    const h = await fetchWedbush(etf);
    if (h) results[etf.ticker] = h;
    await sleep(600);
  }

  console.log('\n[Tema]');
  const volt = await fetchTema();
  if (volt) results['VOLT'] = volt;

  console.log('\n[Roundhill]');
  results['MAGS'] = fetchMAGS();

  console.log('\n[First Trust]');
  for (const etf of FIRSTTRUST_ETFS) {
    const h = await fetchFirstTrust(etf);
    if (h) results[etf.ticker] = h;
    await sleep(800);
  }

  console.log('\n[VistaShares]');
  for (const etf of VISTASHARES_ETFS) {
    const h = await fetchVistaShares(etf);
    if (h) results[etf.ticker] = h;
    await sleep(800);
  }

  console.log('\n[ProShares]');
  for (const etf of PROSHARES_ETFS) {
    const h = await fetchProShares(etf);
    if (h) results[etf.ticker] = h;
    await sleep(600);
  }

  console.log('\n[Fidelity]');
  for (const etf of FIDELITY_ETFS) {
    const h = await fetchFidelity(etf);
    if (h) results[etf.ticker] = h;
    await sleep(600);
  }

  const fetched = Object.keys(results);
  const all = [
    ...ISHARES_ETFS.map(e => e.ticker),
    ...INVESCO_ETFS.map(e => e.ticker),
    'ARKK', 'ALAI', 'XSD',
    ...WEDBUSH_ETFS.map(e => e.ticker),
    'VOLT', 'MAGS',
    ...FIRSTTRUST_ETFS.map(e => e.ticker),
    ...VISTASHARES_ETFS.map(e => e.ticker),
    ...PROSHARES_ETFS.map(e => e.ticker),
    ...FIDELITY_ETFS.map(e => e.ticker),
  ];
  const failed = all.filter(t => !fetched.includes(t));

  console.log(`\n=== Summary ===`);
  console.log(`Fetched (${fetched.length}): ${fetched.join(', ')}`);
  if (failed.length) console.log(`Failed  (${failed.length}): ${failed.join(', ')}`);

  const out = { lastUpdated: new Date().toISOString().split('T')[0], etfsFetched: fetched, holdings: results };
  fs.writeFileSync(OUT_PATH, JSON.stringify(out, null, 2));
  console.log(`\nWritten → ${OUT_PATH}`);
}

main().catch(e => { console.error(e); process.exit(1); });
