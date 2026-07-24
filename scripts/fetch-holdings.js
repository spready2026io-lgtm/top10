#!/usr/bin/env node
'use strict';

/**
 * fetch-holdings.js
 * Fetches ETF holdings for 15 ETFs via public JSON/CSV/Excel APIs.
 *
 * Providers and methods:
 *   iShares  (ARTY, BAI, SOXX, IGV, IDEF, BILT) — Blackrock varnish JSON API
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
const SCAN_ERRORS_PATH = path.join(__dirname, '..', 'lib', 'scan-errors.json');

// Network failures captured during this run (url + final error message). Mapped
// to tickers at the end so the scan report can show WHY an ETF dropped
// (HTTP 403 = IP block, timeout = transient, etc.).
const fetchFailures = [];

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

// Fetch with retry. Datacenter IPs (GitHub Actions) occasionally get a one-off
// WAF block, rate-limit, or network blip from a provider. Without retries a
// single failure drops that ETF for the whole day. A couple of backed-off
// retries recover it. Body is read by the caller, so we return the Response only
// on success and make a fresh request each attempt.
async function fetchWithRetry(url, headers = {}, attempts = 3) {
  let lastErr;
  for (let i = 1; i <= attempts; i++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA, ...headers } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res;
    } catch (e) {
      lastErr = e;
      if (i < attempts) {
        console.warn(`    retry ${i}/${attempts - 1} for ${url} (${e.message})`);
        await sleep(1500 * i);
      }
    }
  }
  fetchFailures.push({ url, error: lastErr.message });
  throw lastErr;
}

async function fetchJSON(url, headers = {}) {
  const res = await fetchWithRetry(url, headers);
  return res.json();
}

async function fetchBuf(url, headers = {}) {
  const res = await fetchWithRetry(url, headers);
  return Buffer.from(await res.arrayBuffer());
}

async function fetchText(url, headers = {}) {
  const res = await fetchWithRetry(url, headers);
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
  { ticker: 'IDEF', id: '343529' },  // iShares Defense Industrials Active ETF
  { ticker: 'BILT', id: '345073' },  // iShares Infrastructure Active ETF
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
  { ticker: 'SPMO', id: 'SPMO',      idType: 'ticker' },
  { ticker: 'XMMO', id: 'XMMO',      idType: 'ticker' },
];

async function fetchInvesco({ ticker, id, idType }) {
  const url = `https://dng-api.invesco.com/cache/v1/accounts/en_US/shareclasses/${id}/holdings/fund?idType=${idType}&productType=ETF`;
  console.log(`  [Invesco] ${ticker}...`);
  try {
    const d = await fetchJSON(url, {
      'Accept': 'application/json, */*',
      'Referer': 'https://www.invesco.com/',
    });
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

const ALGER_ETFS = [
  {
    ticker: 'ALAI',
    urls: [
      'https://www.alger.com/AlgerETFDailyHoldings/Daily_Holdings_Alger_AI_Enablers_&_Adopters_ETF.csv',
      'https://www.alger.com/AlgerETFDailyHoldings/Daily_Holdings_Alger_AI_Enablers_%26_Adopters_ETF.csv',
    ],
  },
  {
    ticker: 'CNEQ',
    urls: [
      'https://www.alger.com/AlgerETFDailyHoldings/Daily_Holdings_Alger_Concentrated_Equity_ETF.csv',
    ],
  },
];

async function fetchAlgerETF({ ticker, urls }) {
  console.log(`  [Alger] ${ticker}...`);
  for (const url of urls) {
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
  console.error(`    ✗ All Alger URLs failed for ${ticker}`);
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

// ── Tema (VOLT, RSHO — direct CSV) ───────────────────────────────────────────

async function fetchTema(ticker = 'VOLT') {
  // CSV columns: holdings_date, ticker, cusip, proper_name, shares, market_value, percent_of_nav, is_cash, ...
  // percent_of_nav is a 0-1 decimal (e.g. 0.0796 = 7.96%)
  const url = `https://temaetfs.com/hubfs/Website/Holdings/${ticker}-holdings.csv`;
  console.log(`  [Tema] ${ticker}...`);
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
  const url = `https://research2.fidelity.com/fidelity/screeners/etf/etfholdings.asp?symbol=${ticker}&view=Holdings`;
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

// ── WisdomTree (WCLD — direct document download) ─────────────────────────────
// WisdomTree's website blocks headless browsers, but the document-library
// CSV endpoint sometimes responds to plain HTTP with the right headers.
// Playwright fallback in fetch-holdings-playwright.js handles CI failures.

const WISDOMTREE_CSV_URLS = [
  'https://www.wisdomtree.com/document-library/etf-downloads/daily-holdings/WCLD.csv',
  'https://www.wisdomtree.com/-/media/us-media-files/documents/resource-library/product-documents/daily-holdings/WCLD.csv',
  'https://www.wisdomtree.com/-/media/us-media-files/documents/resource-library/product-documents/daily-holdings/wcld.csv',
];

async function fetchWisdomTree() {
  console.log('  [WisdomTree] WCLD...');
  for (const url of WISDOMTREE_CSV_URLS) {
    try {
      const text = await fetchText(url, {
        'Accept': 'text/csv,text/plain,*/*',
        'Referer': 'https://www.wisdomtree.com/investments/etfs/technology/wcld',
        'Origin': 'https://www.wisdomtree.com',
      });
      if (!text || text.trim().startsWith('<!') || text.trim().startsWith('<html')) continue;
      const rows = text.trim().split(/\r?\n/).map(parseCSVLine);
      if (rows.length < 2) continue;
      const hdrs = rows[0].map(h => h.toLowerCase().trim());
      const tIdx = hdrs.findIndex(h => h === 'ticker' || h === 'symbol');
      const nIdx = hdrs.findIndex(h => h === 'name' || h.includes('description') || h.includes('security'));
      const wIdx = hdrs.findIndex(h => h.includes('weight') || h.includes('% of'));
      if (tIdx === -1 || wIdx === -1) continue;

      const holdings = rows.slice(1)
        .filter(r => isEquityTicker(r[tIdx]))
        .map(r => ({
          ticker: r[tIdx].trim(),
          name:   nIdx >= 0 ? (r[nIdx] || r[tIdx]).trim() : r[tIdx].trim(),
          weight: parseFloat((r[wIdx] || '0').replace('%', '')) || 0,
        }))
        .filter(r => r.weight > 0);

      if (holdings.length > 0) {
        console.log(`    → ${holdings.length} equity holdings`);
        return holdings;
      }
    } catch {}
  }
  console.error('    ✗ All WisdomTree HTTP URLs failed (Playwright fallback will retry)');
  return null;
}

// ── StockAnalysis.com (HTTP fallback for blocked providers) ──────────────────
// SvelteKit __data.json endpoint serialises the top ~20–25 weighted holdings.
// Not a complete dataset for large ETFs, but covers the positions that drive
// scoring.  Used as a last-resort HTTP fallback for QQQ, WCLD, and GTEK.
//
// Parse pattern: the SvelteKit data is a flat array; JSON.stringify(nodes[2])
// produces strings like  "$NVDA","8.75%"  adjacent in the JSON text.
// Regex: /"(\$[A-Z]{1,5})","([\d.]+)%"/g

async function fetchStockAnalysis(ticker) {
  const url = `https://stockanalysis.com/etf/${ticker.toLowerCase()}/holdings/__data.json`;
  console.log(`  [StockAnalysis] ${ticker}...`);
  try {
    const d = await fetchJSON(url, {
      'Accept': 'application/json, */*',
      'Referer': 'https://stockanalysis.com/',
    });
    const blob = JSON.stringify((d.nodes && d.nodes[2]) || {});
    if (!blob || blob === '{}') throw new Error('No data in nodes[2]');

    // Adjacent string values in the SvelteKit flat array: "$NVDA","8.75%"
    const matches = [...blob.matchAll(/"(\$[A-Z]{1,5})","([\d.]+)%"/g)];
    if (matches.length === 0) throw new Error('No "$TICKER","weight%" patterns found');

    const holdings = matches
      .map(m => ({ ticker: m[1].replace('$', ''), name: m[1].replace('$', ''), weight: parseFloat(m[2]) }))
      .filter(r => r.weight > 0 && isEquityTicker(r.ticker) && !isCashOrMoneyMarket(r.ticker));

    const totalStr = blob.match(/"(\d+) individual holdings"/);
    const note = totalStr ? ` (top ${holdings.length} of ${totalStr[1]})` : '';
    console.log(`    → ${holdings.length} equity holdings${note}`);
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

// ── Meme theme — sourced via StockAnalysis (issuers block bots) ───────────────
// BUZZ = VanEck Social Sentiment ETF, MEME = Roundhill Meme Stock ETF.
const MEME_ETFS = ['BUZZ', 'MEME', 'RKNG'];

// ── New additions (2026-06-02) — all sourced via StockAnalysis ────────────────
// AI & ML:    AIFD (TCW), SPRX (Spear), AOTG (AOT)
// Broad Tech: FRWD (Nomura), BCTK (Baron), FWD (AB), CBSE (Clough), FCUS (Pinnacle)
// Previously failed Roundhill ETFs (same issuer as BUZZ/MEME/RKNG):
//   CHAT (AI & ML) — Roundhill Generative AI & Technology ETF
//   DRAM (Semiconductors) — Roundhill Memory ETF (launched Apr 2026; ~4 US equities after foreign filter)
//   MARS (Broad Tech) — Roundhill Space & Technology ETF (launched Mar 2026)
const NEW_SA_ETFS = ['AIFD', 'SPRX', 'AOTG', 'FRWD', 'BCTK', 'FWD', 'CBSE', 'FCUS', 'CHAT', 'DRAM', 'MARS', 'WGMI', 'SGRT',
  // Software theme (2026-07-24): XSW (SPDR), SKYY (First Trust), CLOU (Global X). IGV/WCLD already fetched above.
  'XSW', 'SKYY', 'CLOU',
  // Cyber theme (2026-07-24): CIBR (First Trust), HACK (Amplify), BUG (Global X), IHAK (iShares).
  'CIBR', 'HACK', 'BUG', 'IHAK'];

// ── Base index holdings for the portfolio builder core (SPY, QQQ) ─────────────
// QQQ already comes from the Invesco block above; SPY has no clean issuer API,
// so it is sourced via StockAnalysis (top weighted holdings — we show the top 5).
const BASE_INDEX_SA = ['SPY'];

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
  for (const etf of ALGER_ETFS) {
    const h = await fetchAlgerETF(etf);
    if (h) results[etf.ticker] = h;
    await sleep(600);
  }

  console.log('\n[SPDR]');
  const spdr = await fetchSPDR();
  if (spdr) results['XSD'] = spdr;

  console.log('\n[WisdomTree]');
  const wcld = await fetchWisdomTree();
  if (wcld) results['WCLD'] = wcld;

  console.log('\n[Wedbush]');
  for (const etf of WEDBUSH_ETFS) {
    const h = await fetchWedbush(etf);
    if (h) results[etf.ticker] = h;
    await sleep(600);
  }

  console.log('\n[Tema]');
  const volt = await fetchTema('VOLT');
  if (volt) results['VOLT'] = volt;
  const rsho = await fetchTema('RSHO');
  if (rsho) results['RSHO'] = rsho;

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

  // ── New ETFs (2026-06-02) — AI & ML + Broad Tech additions ──────────────────
  console.log('\n[New ETFs — StockAnalysis]');
  for (const ticker of NEW_SA_ETFS) {
    let h = null;
    for (let attempt = 1; attempt <= 3 && !h; attempt++) {
      if (attempt > 1) {
        console.log(`    ↻ retry ${attempt}/3 for ${ticker}`);
        await sleep(1500 * attempt);
      }
      h = await fetchStockAnalysis(ticker);
    }
    if (h) results[ticker] = h;
    else console.error(`    ✗✗ ${ticker} failed after 3 attempts`);
    await sleep(800);
  }

  // ── Meme theme (BUZZ, MEME) — sourced via StockAnalysis ──────────────────────
  // No clean issuer holdings API: VanEck (BUZZ) and Roundhill (MEME) both block
  // bots, but stockanalysis.com exposes the full weighted holdings list.
  // Retry up to 3× with backoff: the theme has only 2 ETFs, so a single transient
  // network failure would otherwise drop half the theme.
  console.log('\n[Meme ETFs]');
  for (const ticker of MEME_ETFS) {
    let h = null;
    for (let attempt = 1; attempt <= 3 && !h; attempt++) {
      if (attempt > 1) {
        console.log(`    ↻ retry ${attempt}/3 for ${ticker}`);
        await sleep(1500 * attempt);
      }
      h = await fetchStockAnalysis(ticker);
    }
    if (h) results[ticker] = h;
    else console.error(`    ✗✗ ${ticker} failed after 3 attempts — Meme theme will be incomplete`);
    await sleep(800);
  }

  // ── Base index (SPY) — sourced via StockAnalysis ─────────────────────────────
  console.log('\n[Base index — StockAnalysis]');
  for (const ticker of BASE_INDEX_SA) {
    let h = null;
    for (let attempt = 1; attempt <= 3 && !h; attempt++) {
      if (attempt > 1) {
        console.log(`    ↻ retry ${attempt}/3 for ${ticker}`);
        await sleep(1500 * attempt);
      }
      h = await fetchStockAnalysis(ticker);
    }
    if (h) results[ticker] = h;
    else console.error(`    ✗✗ ${ticker} failed after 3 attempts`);
    await sleep(800);
  }

  // ── StockAnalysis fallback — only runs for tickers that still failed above ──
  // Covers QQQ (Invesco API blocked in CI), WCLD (WisdomTree blocks all bots),
  // GTEK (Goldman Sachs blocks Playwright), ALAI (Alger blocks CI IPs).
  // AIS, POW (VistaShares) — datacenter IPs get HTTP 415 from CSV endpoint.
  // Yields top ~8–25 holdings each.
  // RSHO fetched above via Tema direct CSV. Others are fallbacks for primary scrapers.
  const saNeed = ['WCLD', 'GTEK', 'ALAI', 'AIS', 'POW', 'CNEQ', 'SPMO', 'XMMO'].filter(t => !results[t]);
  if (saNeed.length > 0) {
    console.log(`\n[StockAnalysis fallback] Missing: ${saNeed.join(', ')}`);
    for (const ticker of saNeed) {
      const h = await fetchStockAnalysis(ticker);
      if (h) results[ticker] = h;
      await sleep(800);
    }
  }

  const fetched = Object.keys(results);
  const all = [
    ...ISHARES_ETFS.map(e => e.ticker),
    ...INVESCO_ETFS.map(e => e.ticker),
    'ARKK', ...ALGER_ETFS.map(e => e.ticker), 'XSD',
    'WCLD', 'GTEK',
    ...WEDBUSH_ETFS.map(e => e.ticker),
    'VOLT',
    ...FIRSTTRUST_ETFS.map(e => e.ticker),
    ...VISTASHARES_ETFS.map(e => e.ticker),
    ...PROSHARES_ETFS.map(e => e.ticker),
    ...FIDELITY_ETFS.map(e => e.ticker),
    ...MEME_ETFS,
    'RSHO',
    ...NEW_SA_ETFS,
    ...BASE_INDEX_SA,
  ];
  const failed = all.filter(t => !fetched.includes(t));

  console.log(`\n=== Summary ===`);
  console.log(`Fetched (${fetched.length}): ${fetched.join(', ')}`);
  if (failed.length) console.log(`Failed  (${failed.length}): ${failed.join(', ')}`);

  const out = { lastUpdated: new Date().toISOString().split('T')[0], etfsFetched: fetched, holdings: results };
  fs.writeFileSync(OUT_PATH, JSON.stringify(out, null, 2));
  console.log(`\nWritten → ${OUT_PATH}`);

  // Map each failed ticker to its network error (when the URL carries the ticker)
  // so build-data-ts.js can fold the reason into scan-report.json. The full
  // failures list is kept too, for providers whose URL uses an opaque id.
  const errorsByTicker = {};
  for (const t of failed) {
    const re = new RegExp('[=/]' + t + '($|[&/.?])', 'i');
    const hit = fetchFailures.find(f => re.test(f.url));
    if (hit) errorsByTicker[t] = hit.error;
  }
  fs.writeFileSync(SCAN_ERRORS_PATH, JSON.stringify({
    generatedAt: new Date().toISOString(),
    byTicker:    errorsByTicker,
    failures:    fetchFailures,
  }, null, 2));
  console.log(`Written → ${SCAN_ERRORS_PATH} (${fetchFailures.length} fetch failures)`);
}

main().catch(e => { console.error(e); process.exit(1); });
