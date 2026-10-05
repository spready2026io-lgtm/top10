#!/usr/bin/env node
'use strict';

/**
 * probe-sources.js (TEMPORARY, removed before merge)
 *
 * Read-only probe run on GitHub Actions, where the issuer sites and
 * StockAnalysis are reachable. Two jobs:
 *   1. For every candidate ETF from Shuki's 2026-10-05 list, fetch the
 *      StockAnalysis holdings payload, decode it, and print the count, the
 *      field names per holding and the top holdings, so theme fit is checked
 *      against real holdings (Tony rule 6) and data availability is proven.
 *   2. Print the raw field names each existing provider returns, to find out
 *      which sources publish a share count per holding.
 * Writes nothing.
 */

const XLSX = require('xlsx');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function get(url, headers = {}) {
  const res = await fetch(url, { headers: { 'User-Agent': UA, ...headers } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res;
}

// SvelteKit __data.json nodes are devalue-flattened arrays. Minimal decoder.
function unflatten(data) {
  const cache = new Map();
  function hydrate(i) {
    if (i === -1) return undefined;
    if (i === -3) return NaN;
    if (i === -4) return Infinity;
    if (i === -5) return -Infinity;
    if (i === -6) return -0;
    if (i < 0) return null;
    if (cache.has(i)) return cache.get(i);
    const v = data[i];
    let out;
    if (v === null || typeof v !== 'object') out = v;
    else if (Array.isArray(v)) {
      if (typeof v[0] === 'string') {
        const [type, a] = v;
        if (type === 'Date') out = a;
        else if (type === 'BigInt') out = a;
        else out = null;
      } else {
        out = [];
        cache.set(i, out);
        for (const idx of v) out.push(hydrate(idx));
        return out;
      }
    } else {
      out = {};
      cache.set(i, out);
      for (const [k, idx] of Object.entries(v)) out[k] = hydrate(idx);
      return out;
    }
    cache.set(i, out);
    return out;
  }
  return hydrate(0);
}

function findHoldingsArray(obj, depth = 0) {
  if (!obj || depth > 6) return null;
  if (Array.isArray(obj)) {
    if (obj.length && obj[0] && typeof obj[0] === 'object' && !Array.isArray(obj[0]) &&
        Object.values(obj[0]).some(x => typeof x === 'string' && /^\$[A-Z]/.test(x))) return obj;
    for (const x of obj) { const r = findHoldingsArray(x, depth + 1); if (r) return r; }
    return null;
  }
  if (typeof obj === 'object') {
    for (const x of Object.values(obj)) { const r = findHoldingsArray(x, depth + 1); if (r) return r; }
  }
  return null;
}

const CANDIDATES = [
  'AIVC', 'SMH', 'CRAK', 'WCBR', 'EMEQ', 'SMHX', 'TEKX', 'DECO', 'TCAI', 'IDNA', 'WTAI', 'FCLD',
  'QTEC', 'PSCT', 'XNTK', 'LRNZ', 'IBAT', 'PXE', 'EPAI', 'GARY', 'FAI', 'WAR', 'TEK', 'FTEC',
  'IDGT', 'WLDR', 'AIUP', 'IQM', 'AIPO', 'NXTE', 'MATE', 'IPOS', 'CLSE', 'TCV', 'LOUP', 'AGIQ',
  'IPO', 'ELFY', 'LUMA', 'STCE', 'UFO', 'MNVT', 'AIHY', 'FFF', 'XDAT', 'DRUP', 'NCLD', 'EUV',
  'ANTW', 'DISK', 'FOTO', 'GRNY',
  // existing StockAnalysis-sourced fund, to compare the shape
  'AIFD',
];

async function probeStockAnalysis(ticker, verbose) {
  const url = `https://stockanalysis.com/etf/${ticker.toLowerCase()}/holdings/__data.json`;
  try {
    const d = await (await get(url, { 'Accept': 'application/json, */*', 'Referer': 'https://stockanalysis.com/' })).json();
    const node = d.nodes && d.nodes[2];
    if (!node || !node.data) throw new Error('no nodes[2].data');
    const root = unflatten(node.data);
    if (verbose) console.log(`  root keys: ${Object.keys(root || {}).join(', ')}`);
    const arr = findHoldingsArray(root);
    if (!arr) throw new Error('no holdings array');
    const keys = Object.keys(arr[0]);
    const blob = JSON.stringify(node.data);
    const total = blob.match(/"(\d+) individual holdings"/);
    const eq = arr.filter(h => Object.values(h).some(x => typeof x === 'string' && /^\$[A-Z]{1,5}$/.test(x)));
    console.log(`${ticker}: ${arr.length} rows (${eq.length} US-style tickers)${total ? `, ${total[1]} total holdings` : ''}; keys: ${keys.join(',')}`);
    for (const h of arr.slice(0, verbose ? 3 : 0)) console.log(`    raw ${JSON.stringify(h)}`);
    const top = arr.slice(0, 12).map(h => {
      const s = Object.values(h).find(x => typeof x === 'string' && /^\$/.test(x)) || '?';
      const w = Object.values(h).find(x => typeof x === 'string' && /%$/.test(x)) || '?';
      return `${s.replace('$', '')} ${w}`;
    });
    console.log(`    top: ${top.join(' | ')}`);
    const names = arr.slice(0, 12).map(h => h.n || h.name || '').filter(Boolean);
    if (names.length) console.log(`    names: ${names.join(' | ')}`);
  } catch (e) {
    console.log(`${ticker}: FAILED ${e.message}`);
  }
}

async function probeProviders() {
  console.log('\n=== Provider field probe (share counts?) ===');

  try {
    const url = 'https://www.ishares.com/varnish-api/blk-one01-product-data/product-data/api/v2/get-product-data?appSubType=ISHARES&appType=PRODUCT_PAGE&component=holdings.all&locale=en_US&targetSite=us-ishares&portfolioId=239705';
    const d = await (await get(url, { 'Referer': 'https://www.ishares.com/us/products/239705/' })).json();
    const dp = d.componentsByNameMap?.holdings?.containersByNameMap?.all?.dataPointsByNameMap || {};
    console.log(`iShares SOXX datapoints: ${Object.keys(dp).join(', ')}`);
    for (const k of Object.keys(dp)) {
      const v = dp[k];
      const sample = (v.formattedValue || v.value || [])[0];
      console.log(`    ${k}: ${JSON.stringify(sample)} | raw ${JSON.stringify((v.value || [])[0])}`);
    }
  } catch (e) { console.log(`iShares: FAILED ${e.message}`); }

  try {
    const url = 'https://dng-api.invesco.com/cache/v1/accounts/en_US/shareclasses/46137V647/holdings/fund?idType=cusip&productType=ETF';
    const d = await (await get(url, { 'Accept': 'application/json, */*', 'Referer': 'https://www.invesco.com/' })).json();
    console.log(`Invesco PSI holding[0]: ${JSON.stringify((d.holdings || [])[0])}`);
    console.log(`Invesco top-level keys: ${Object.keys(d).join(', ')}`);
  } catch (e) { console.log(`Invesco: FAILED ${e.message}`); }

  const csvs = [
    ['ARK ARKK', 'https://assets.ark-funds.com/fund-documents/funds-etf-csv/ARK_INNOVATION_ETF_ARKK_HOLDINGS.csv', {}],
    ['Alger CNEQ', 'https://www.alger.com/AlgerETFDailyHoldings/Daily_Holdings_Alger_Concentrated_Equity_ETF.csv', {}],
    ['Wedbush IVES', 'https://wedbushfunds.com/latest-sod-holdings-ives', {}],
    ['Tema VOLT', 'https://temaetfs.com/hubfs/Website/Holdings/VOLT-holdings.csv', {}],
    ['Tema DISK', 'https://temaetfs.com/hubfs/Website/Holdings/DISK-holdings.csv', {}],
    ['VistaShares AIS', 'https://www.vistashares.com/csv/top-holdings/?etf=AIS', { 'Referer': 'https://www.vistashares.com/etf/ais/' }],
    ['ProShares master', 'https://accounts.profunds.com/etfdata/psdlyhld.csv', {}],
  ];
  for (const [label, url, h] of csvs) {
    try {
      const t = await (await get(url, h)).text();
      const lines = t.split(/\r?\n/).filter(Boolean);
      const hIdx = lines.findIndex(l => /ticker|symbol/i.test(l));
      console.log(`${label}: header: ${lines[Math.max(hIdx, 0)].slice(0, 300)}`);
      console.log(`    row: ${(lines[Math.max(hIdx, 0) + 1] || '').slice(0, 300)}`);
    } catch (e) { console.log(`${label}: FAILED ${e.message}`); }
    await sleep(500);
  }

  try {
    const buf = Buffer.from(await (await get('https://www.ssga.com/library-content/products/fund-data/etfs/us/holdings-daily-us-en-xsd.xlsx')).arrayBuffer());
    const wb = XLSX.read(buf, { type: 'buffer' });
    const rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, defval: '' });
    const hIdx = rows.findIndex(r => r.map(c => String(c).toLowerCase()).includes('ticker'));
    console.log(`SPDR XSD header: ${JSON.stringify(rows[hIdx])}`);
    console.log(`    row: ${JSON.stringify(rows[hIdx + 1])}`);
  } catch (e) { console.log(`SPDR: FAILED ${e.message}`); }

  try {
    const html = await (await get('https://www.ftportfolios.com/Retail/Etf/EtfHoldings.aspx?Ticker=AIRR', { 'Accept': 'text/html' })).text();
    const strip = s => s.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').trim();
    const rows = [...html.matchAll(/<tr[\s\S]*?<\/tr>/gi)].map(m => [...m[0].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map(c => strip(c[1])));
    const hIdx = rows.findIndex(r => r.some(c => /weight/i.test(c)));
    console.log(`First Trust AIRR header: ${JSON.stringify(rows[hIdx])}`);
    console.log(`    row: ${JSON.stringify(rows[hIdx + 1])}`);
  } catch (e) { console.log(`First Trust: FAILED ${e.message}`); }
}

async function probeRaw(ticker) {
  const url = `https://stockanalysis.com/etf/${ticker.toLowerCase()}/holdings/__data.json`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept': 'application/json, */*', 'Referer': 'https://stockanalysis.com/' } });
    const text = await res.text();
    console.log(`${ticker}: HTTP ${res.status}, ${text.length} bytes`);
    let d; try { d = JSON.parse(text); } catch { console.log(`    not JSON: ${text.slice(0, 200)}`); return; }
    const nodes = d.nodes || [];
    console.log(`    nodes: ${nodes.map((n, i) => `${i}:${n && n.type}`).join(' ')}`);
    const node = nodes[2];
    if (!node || !node.data) { console.log(`    node2: ${JSON.stringify(node).slice(0, 300)}`); return; }
    const root = unflatten(node.data);
    const h = root && root.holdings;
    console.log(`    holdings type: ${Array.isArray(h) ? 'array ' + h.length : typeof h}; count=${root && root.count}; date=${root && root.date}`);
    if (Array.isArray(h)) for (const x of h.slice(0, 6)) console.log(`    raw ${JSON.stringify(x)}`);
    else console.log(`    root: ${JSON.stringify(root).slice(0, 400)}`);
  } catch (e) { console.log(`${ticker}: FAILED ${e.message}`); }
}

(async () => {
  console.log('=== Re-probe of the nine that failed ===');
  for (const t of ['EMEQ', 'GARY', 'MATE', 'IPOS', 'CLSE', 'AIHY', 'DRUP', 'NCLD', 'FOTO']) {
    await probeRaw(t);
    await sleep(900);
  }
  try {
    const t = await (await get('https://wedbushfunds.com/latest-sod-holdings-ives')).text();
    console.log('Wedbush IVES first lines:');
    for (const l of t.split(/\r?\n/).slice(0, 12)) console.log(`    ${l.slice(0, 250)}`);
  } catch (e) { console.log(`Wedbush: FAILED ${e.message}`); }
})();
