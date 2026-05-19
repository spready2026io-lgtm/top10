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
  'https://www.alger.com/AlgerETFDailyHoldings/Daily_Holdings_Alger_AI_Enablers_&_%20Adopters_ETF.csv',
  'https://www.alger.com/AlgerETFDailyHoldings/Daily_Holdings_Alger_AI_Enablers_%26_%20Adopters_ETF.csv',
];

async function fetchAlger() {
  console.log(`  [Alger] ALAI...`);
  for (const url of ALGER_URLS) {
    try {
      const text = await fetchText(url);
      const rows  = text.split(/\r?\n/).map(parseCSVLine);
      const hdrs  = rows[0].map(h => h.toLowerCase().trim());
      const tIdx  = hdrs.findIndex(h => h === 'ticker' || h === 'symbol');
      const nIdx  = hdrs.findIndex(h => h.includes('name') || h.includes('security') || h.includes('holding'));
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

  const fetched = Object.keys(results);
  const all     = [...ISHARES_ETFS.map(e=>e.ticker), ...INVESCO_ETFS.map(e=>e.ticker), 'ARKK', 'ALAI', 'XSD'];
  const failed  = all.filter(t => !fetched.includes(t));

  console.log(`\n=== Summary ===`);
  console.log(`Fetched (${fetched.length}): ${fetched.join(', ')}`);
  if (failed.length) console.log(`Failed  (${failed.length}): ${failed.join(', ')}`);

  const out = { lastUpdated: new Date().toISOString().split('T')[0], etfsFetched: fetched, holdings: results };
  fs.writeFileSync(OUT_PATH, JSON.stringify(out, null, 2));
  console.log(`\nWritten → ${OUT_PATH}`);
}

main().catch(e => { console.error(e); process.exit(1); });
