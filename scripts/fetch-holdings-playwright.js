#!/usr/bin/env node
'use strict';

/**
 * fetch-holdings-playwright.js
 * Phase 2: Playwright scrapers for JS-heavy ETF providers.
 * Reads lib/holdings-raw.json, adds new ETF data, writes back.
 *
 * Targets:
 *   VistaShares   (AIS, POW)         — JS download button
 *   Roundhill     (CHAT, DRAM, MARS) — JS holdings table + API interception
 *   WisdomTree    (WCLD)             — stealth browser
 *   Goldman Sachs (GTEK)            — Next.js page
 */

const fs  = require('fs');
const path = require('path');
const os   = require('os');

const RAW_PATH = path.join(__dirname, '..', 'lib', 'holdings-raw.json');

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function isEquityTicker(t) {
  return typeof t === 'string' && /^[A-Z]{1,5}$/.test(t.trim());
}

const CASH_TICKERS = new Set(['DTRXX', 'DTCXX', 'FGTXX', 'FGXXX', 'CASH', 'USD', 'OTHER']);

function isCashOrMoneyMarket(t) {
  return CASH_TICKERS.has(t) || /XX+$/.test(t);
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

function parseWeight(raw) {
  if (!raw) return 0;
  const n = parseFloat(String(raw).replace('%', '').trim());
  if (!n || isNaN(n)) return 0;
  return n < 1 ? parseFloat((n * 100).toFixed(4)) : n; // normalise 0-1 range
}

// ── Browser ───────────────────────────────────────────────────────────────────

async function launchBrowser() {
  const { chromium } = require('playwright-extra');
  const StealthPlugin = require('puppeteer-extra-plugin-stealth');
  chromium.use(StealthPlugin());
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  const ctx = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport:  { width: 1280, height: 900 },
    locale:    'en-US',
    extraHTTPHeaders: { 'Accept-Language': 'en-US,en;q=0.9' },
    acceptDownloads: true,
  });
  return { browser, ctx };
}

// ── Parsers ───────────────────────────────────────────────────────────────────

function parseCSVHoldings(text) {
  if (!text || !text.trim()) return null;
  // Bail out if the response looks like HTML
  if (text.trim().startsWith('<!') || text.trim().startsWith('<html')) return null;
  try {
    const rows = text.trim().split(/\r?\n/).map(parseCSVLine);
    if (rows.length < 2) return null;

    // Scan for actual header row (CSV may have metadata rows first)
    let hIdx = rows.findIndex(r => r.some(c => /^(ticker|symbol)$/i.test(c.trim())));
    if (hIdx === -1) hIdx = 0;

    const hdrs = rows[hIdx].map(h => h.toLowerCase().trim());
    const tIdx = hdrs.findIndex(h => h === 'ticker' || h === 'symbol');
    const nIdx = hdrs.findIndex(h => h === 'name' || h === 'proper_name' || h.includes('security') || h.includes('company'));
    const wIdx = hdrs.findIndex(h => h === 'weight' || h === 'percent_of_nav' || h.includes('weight') || h.includes('% of'));
    const cIdx = hdrs.findIndex(h => h === 'is_cash');

    if (tIdx === -1) return null;

    // Detect whether weight column uses decimal (0–1) or percentage form.
    // If the max raw value across all rows is < 1 it's decimal and needs ×100.
    let isDecimalWeights = false;
    if (wIdx >= 0) {
      const maxRaw = rows.slice(hIdx + 1)
        .map(r => parseFloat(String(r[wIdx] || '').replace('%', '').trim()))
        .filter(n => !isNaN(n) && n > 0)
        .reduce((m, v) => Math.max(m, v), 0);
      isDecimalWeights = maxRaw > 0 && maxRaw < 1;
    }
    const colWeight = (raw) => {
      if (!raw) return 0;
      const n = parseFloat(String(raw).replace('%', '').trim());
      if (!n || isNaN(n)) return 0;
      return isDecimalWeights ? parseFloat((n * 100).toFixed(4)) : n;
    };

    const holdings = rows.slice(hIdx + 1)
      .filter(r => r.length > tIdx && (!r[cIdx] || r[cIdx] === '0' || r[cIdx] === ''))
      .map(r => {
        const rawTick = (r[tIdx] || '').trim().split(/\s+/)[0];
        return {
          ticker: rawTick,
          name:   nIdx >= 0 ? (r[nIdx] || rawTick).trim() : rawTick,
          weight: wIdx >= 0 ? colWeight(r[wIdx]) : 0,
        };
      })
      .filter(r => r.weight > 0 && isEquityTicker(r.ticker) && !isCashOrMoneyMarket(r.ticker));

    return holdings.length > 0 ? holdings : null;
  } catch {
    return null;
  }
}

function parseTableRows(rows) {
  if (!rows || rows.length < 2) return null;

  let hIdx = rows.findIndex(r => r.some(c => /ticker|symbol/i.test(c)));
  let tIdx = -1, nIdx = -1, wIdx = -1;

  if (hIdx >= 0) {
    const hdrs = rows[hIdx].map(h => h.toLowerCase().trim());
    tIdx = hdrs.findIndex(h => h === 'ticker' || h === 'symbol');
    nIdx = hdrs.findIndex(h => h === 'name' || h.includes('security') || h.includes('company'));
    wIdx = hdrs.findIndex(h => h.includes('weight') || h.includes('%') || h.includes('nav'));
  }

  const dataRows = hIdx >= 0 ? rows.slice(hIdx + 1) : rows;
  const holdings = [];

  for (const row of dataRows) {
    let ticker = '', name = '', weight = 0;
    if (tIdx >= 0) {
      ticker = (row[tIdx] || '').trim();
      name   = nIdx >= 0 ? (row[nIdx] || ticker).trim() : ticker;
      weight = wIdx >= 0 ? parseWeight(row[wIdx]) : 0;
    } else {
      for (const cell of row) {
        const c = cell.trim();
        if (!ticker && isEquityTicker(c)) { ticker = c; continue; }
        if (ticker && !weight && /^\d+\.\d+%?$/.test(c)) { weight = parseWeight(c); continue; }
        if (ticker && !name && c.length > 3 && !c.includes('%') && !/^\d/.test(c)) name = c;
      }
    }
    if (weight > 0 && isEquityTicker(ticker) && !isCashOrMoneyMarket(ticker)) {
      holdings.push({ ticker, name: name || ticker, weight });
    }
  }
  return holdings.length > 0 ? holdings : null;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

// Try to find a direct CSV/download URL from the page DOM, then fetch it.
async function tryDOMFileLink(page) {
  const href = await page.evaluate(() => {
    const links = [...document.querySelectorAll('a[href]')];
    const dl = links.find(a => {
      const h = (a.href || '').toLowerCase();
      const t = (a.textContent || '').toLowerCase();
      return h.includes('.csv') || h.includes('.xlsx') ||
             (h.includes('download') && !h.includes('.js') && !h.includes('.css')) ||
             t.includes('download') || t.includes('all holdings');
    });
    return dl ? dl.href : null;
  });
  if (!href) return null;

  try {
    const resp = await page.request.fetch(href, { timeout: 20000 });
    if (resp.ok()) {
      const ct = resp.headers()['content-type'] || '';
      if (!ct.includes('html')) { // don't treat HTML responses as CSV
        return (await resp.body()).toString('utf8');
      }
    }
  } catch {}
  return null;
}

// Intercept JSON API responses that look like holdings data (ticker+weight arrays)
function setupJSONInterception(page, broad = false) {
  const candidates = [];
  page.on('response', async res => {
    const ct = res.headers()['content-type'] || '';
    if (!ct.includes('json')) return;
    try {
      const body = await res.json();
      // Try multiple common holdings array paths
      const paths = [body, body.holdings, body.data, body.positions, body.components,
                     body.fundHoldings, body.portfolio, body.rows, body.result, body.items,
                     body.portfolioHoldings, body.constituents, body.etfHoldings];
      for (const arr of paths) {
        if (!Array.isArray(arr) || arr.length < 3) continue;
        const sample = arr[0];
        if (!sample || typeof sample !== 'object') continue;
        if (broad) {
          // Accept any JSON array of objects with 3+ items
          candidates.push(arr);
        } else if (sample.ticker || sample.symbol || sample.Ticker || sample.Symbol) {
          candidates.push(arr);
        }
      }
    } catch {}
  });
  return () => candidates;
}

function parseJSONHoldings(candidates) {
  if (!candidates || candidates.length === 0) return null;
  const arrs = Array.isArray(candidates[0]) ? candidates : [candidates];
  let best = null;
  for (const arr of arrs) {
    const holdings = arr.map(item => {
      // Try many common field name variants
      const ticker = String(item.ticker || item.symbol || item.Ticker || item.Symbol
                          || item.securityTicker || item.holdingTicker || item.isin || '').trim();
      const name   = String(item.name || item.Name || item.description || item.securityName
                          || item.issueName || ticker).trim();
      const raw    = item.weight || item.Weight || item.pctWeight || item.portfolioPercent
                  || item.weighting || item.holdingPercent || item.pctOfPortfolio
                  || item.percentOfNav || item.navPercent || 0;
      const weight = parseWeight(String(raw));
      return { ticker, name, weight };
    }).filter(r => r.weight > 0 && isEquityTicker(r.ticker) && !isCashOrMoneyMarket(r.ticker));
    if (holdings.length > (best ? best.length : 0)) best = holdings;
  }
  return best && best.length > 0 ? best : null;
}

// ── VistaShares (AIS, POW) ────────────────────────────────────────────────────

async function fetchVistaShares(ctx, ticker) {
  const url = `https://www.vistashares.com/etf/${ticker.toLowerCase()}/`;
  console.log(`  [VistaShares] ${ticker}...`);
  const page = await ctx.newPage();
  try {
    const getCapturedJSON = setupJSONInterception(page);

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await sleep(3000);

    // 1. Try to find and fetch a direct download link
    const csvText = await tryDOMFileLink(page);
    if (csvText) {
      const h = parseCSVHoldings(csvText);
      if (h) { console.log(`    → ${h.length} equity holdings (CSV link)`); return h; }
    }

    // 2. Check if an API response was intercepted
    const candidates = getCapturedJSON();
    if (candidates.length > 0) {
      const h = parseJSONHoldings(candidates);
      if (h) { console.log(`    → ${h.length} equity holdings (API)`); return h; }
    }

    // 3. Try clicking the download button
    const dlBtn = page.locator('a[download]').or(page.locator('a[href*=".csv"]')).first();
    if (await dlBtn.count() > 0) {
      const [download] = await Promise.all([
        page.waitForEvent('download', { timeout: 15000 }).catch(() => null),
        dlBtn.click(),
      ]);
      if (download) {
        const tmpPath = path.join(os.tmpdir(), `vs-${ticker}.csv`);
        await download.saveAs(tmpPath);
        const text = fs.readFileSync(tmpPath, 'utf8');
        try { fs.unlinkSync(tmpPath); } catch {}
        const h = parseCSVHoldings(text);
        if (h) { console.log(`    → ${h.length} equity holdings (download)`); return h; }
      }
    }

    // 4. Fallback: extract from DOM table
    const rows = await page.evaluate(() => {
      const results = [];
      document.querySelectorAll('table tr').forEach(row => {
        const cells = [...row.querySelectorAll('td, th')].map(c => c.innerText.trim());
        if (cells.length >= 2) results.push(cells);
      });
      return results;
    });
    const h = parseTableRows(rows);
    if (h) console.log(`    → ${h.length} equity holdings (DOM table)`);
    else console.error('    ✗ No holdings found');
    return h;
  } catch (e) {
    console.error(`    ✗ ${e.message.split('\n')[0]}`);
    return null;
  } finally {
    try { await page.close(); } catch {}
  }
}

// ── Roundhill (CHAT, DRAM, MARS) ──────────────────────────────────────────────

async function fetchRoundhill(ctx, ticker) {
  const url = `https://www.roundhillinvestments.com/etf/${ticker.toLowerCase()}/`;
  console.log(`  [Roundhill] ${ticker}...`);
  const page = await ctx.newPage();
  try {
    const getCapturedJSON = setupJSONInterception(page);

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await sleep(3000);

    // 1. Try direct CSV/download link
    const csvText = await tryDOMFileLink(page);
    if (csvText) {
      const h = parseCSVHoldings(csvText);
      if (h) { console.log(`    → ${h.length} equity holdings (CSV link)`); return h; }
    }

    // 2. JSON API interception
    const candidates = getCapturedJSON();
    if (candidates.length > 0) {
      const h = parseJSONHoldings(candidates);
      if (h) { console.log(`    → ${h.length} equity holdings (API)`); return h; }
    }

    // 3. Try clicking a button that looks like a CSV download
    //    Roundhill pages have "Download CSV" button (CSS button, not an <a>)
    const csvBtn = page.getByText('Download CSV').or(page.getByText('Download All'));
    if (await csvBtn.count() > 0) {
      const [download] = await Promise.all([
        page.waitForEvent('download', { timeout: 15000 }).catch(() => null),
        csvBtn.first().click(),
      ]);
      if (download) {
        const tmpPath = path.join(os.tmpdir(), `rh-${ticker}.csv`);
        await download.saveAs(tmpPath);
        const text = fs.readFileSync(tmpPath, 'utf8');
        try { fs.unlinkSync(tmpPath); } catch {}
        const h = parseCSVHoldings(text);
        if (h) { console.log(`    → ${h.length} equity holdings (download)`); return h; }
      }
    }

    // 4. Fallback: DOM table
    const rows = await page.evaluate(() => {
      const results = [];
      document.querySelectorAll('table tr').forEach(row => {
        const cells = [...row.querySelectorAll('td, th')].map(c => c.innerText.trim());
        if (cells.length >= 2) results.push(cells);
      });
      return results;
    });
    const h = parseTableRows(rows);
    if (h) console.log(`    → ${h.length} equity holdings (DOM table)`);
    else console.error('    ✗ No holdings found');
    return h;
  } catch (e) {
    console.error(`    ✗ ${e.message.split('\n')[0]}`);
    return null;
  } finally {
    try { await page.close(); } catch {}
  }
}

// ── WisdomTree (WCLD) ─────────────────────────────────────────────────────────

const WISDOMTREE_URL_PATTERNS = [
  t => `https://www.wisdomtree.com/investments/etfs/technology/${t.toLowerCase()}`,
  t => `https://www.wisdomtree.com/us/products/${t.toLowerCase()}`,
  t => `https://www.wisdomtree.com/us/products/megatrends/${t.toLowerCase()}`,
  t => `https://www.wisdomtree.com/etfs/technology/${t.toLowerCase()}`,
];

async function fetchWisdomTree(ctx, ticker) {
  console.log(`  [WisdomTree] ${ticker}...`);
  const page = await ctx.newPage();
  try {
    const getCapturedJSON = setupJSONInterception(page);

    let loaded = false;
    for (const urlFn of WISDOMTREE_URL_PATTERNS) {
      const url = urlFn(ticker);
      try {
        const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
        if (resp && resp.ok()) { loaded = true; break; }
      } catch {}
    }
    if (!loaded) { console.error('    ✗ All URL patterns failed'); return null; }

    await sleep(4000);

    // 1. Try direct download link
    const csvText = await tryDOMFileLink(page);
    if (csvText) {
      const h = parseCSVHoldings(csvText);
      if (h) { console.log(`    → ${h.length} equity holdings (CSV link)`); return h; }
    }

    // 2. JSON API
    const candidates = getCapturedJSON();
    if (candidates.length > 0) {
      const h = parseJSONHoldings(candidates);
      if (h) { console.log(`    → ${h.length} equity holdings (API)`); return h; }
    }

    // 3. DOM table
    const rows = await page.evaluate(() => {
      const results = [];
      document.querySelectorAll('table tr').forEach(row => {
        const cells = [...row.querySelectorAll('td, th')].map(c => c.innerText.trim());
        if (cells.length >= 2) results.push(cells);
      });
      return results;
    });
    const h = parseTableRows(rows);
    if (h) console.log(`    → ${h.length} equity holdings (DOM table)`);
    else console.error('    ✗ No holdings found');
    return h;
  } catch (e) {
    console.error(`    ✗ ${e.message.split('\n')[0]}`);
    return null;
  } finally {
    try { await page.close(); } catch {}
  }
}

// ── Goldman Sachs (GTEK) ──────────────────────────────────────────────────────

async function fetchGoldmanSachs(ctx, ticker) {
  const url = 'https://am.gs.com/en-us/advisors/funds/detail/PV103849/38149W812/goldman-sachs-future-tech-leaders-equity-etf';
  console.log(`  [Goldman Sachs] ${ticker}...`);
  const page = await ctx.newPage();
  try {
    // Broad mode: capture any JSON array of objects — GS uses internal field names
    const getCapturedJSON = setupJSONInterception(page, true);

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await sleep(8000); // give Next.js time to hydrate and fire API calls

    // 1. Try to click Holdings tab (try multiple label variants)
    try {
      for (const label of ['Holdings', 'Fund Holdings', 'Portfolio', 'Top Holdings']) {
        const tab = page.getByText(label, { exact: true });
        if (await tab.count() > 0) { await tab.first().click(); await sleep(3000); break; }
      }
    } catch {}

    // 2. Direct download link
    const csvText = await tryDOMFileLink(page);
    if (csvText) {
      const h = parseCSVHoldings(csvText);
      if (h) { console.log(`    → ${h.length} equity holdings (CSV link)`); return h; }
    }

    // 3. JSON API — try all captured candidates, pick one with most equity rows
    const candidates = getCapturedJSON();
    if (candidates.length > 0) {
      const h = parseJSONHoldings(candidates);
      if (h) { console.log(`    → ${h.length} equity holdings (API)`); return h; }
    }

    // 4. DOM table — find the table most likely to be the holdings table
    const rows = await page.evaluate(() => {
      const tables = [...document.querySelectorAll('table')];
      let bestTable = null, bestScore = -1;
      for (const table of tables) {
        // Prefer a table whose header row contains "Ticker" or "Symbol"
        const firstRow = table.querySelector('tr');
        if (firstRow) {
          const hdrs = [...firstRow.querySelectorAll('th, td')]
            .map(c => c.innerText.trim().toLowerCase());
          if (hdrs.some(h => h === 'ticker' || h === 'symbol')) {
            bestTable = table;
            break;
          }
        }
        // Score by count of cells matching equity ticker pattern (require at least 3)
        const score = [...table.querySelectorAll('td')]
          .filter(c => /^[A-Z]{1,5}$/.test(c.innerText.trim())).length;
        if (score >= 3 && score > bestScore) { bestScore = score; bestTable = table; }
      }
      const results = [];
      if (bestTable) {
        bestTable.querySelectorAll('tr').forEach(row => {
          const cells = [...row.querySelectorAll('td, th')].map(c => c.innerText.trim());
          if (cells.length >= 2) results.push(cells);
        });
      }
      return results;
    });
    const h = parseTableRows(rows);
    if (h) console.log(`    → ${h.length} equity holdings (DOM table)`);
    else console.error('    ✗ No holdings found');
    return h;
  } catch (e) {
    console.error(`    ✗ ${e.message.split('\n')[0]}`);
    return null;
  } finally {
    try { await page.close(); } catch {}
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('=== fetch-holdings-playwright.js ===\n');

  if (!fs.existsSync(RAW_PATH)) {
    console.error('holdings-raw.json not found. Run fetch-holdings.js first.');
    process.exit(1);
  }
  const existing = JSON.parse(fs.readFileSync(RAW_PATH, 'utf8'));
  const results  = { ...existing.holdings };

  const { browser, ctx } = await launchBrowser();
  console.log('Browser launched.\n');

  try {
    // VistaShares (AIS, POW) are now fetched via simple HTTP in fetch-holdings.js

    console.log('[Roundhill]');
    for (const ticker of ['CHAT', 'DRAM', 'MARS']) {
      const h = await fetchRoundhill(ctx, ticker);
      if (h) results[ticker] = h;
      await sleep(2000);
    }

    console.log('\n[WisdomTree]');
    const wcld = await fetchWisdomTree(ctx, 'WCLD');
    if (wcld) results['WCLD'] = wcld;
    else delete results['WCLD']; // never persist stale data

    console.log('\n[Goldman Sachs]');
    const gtek = await fetchGoldmanSachs(ctx, 'GTEK');
    if (gtek) results['GTEK'] = gtek;
    else delete results['GTEK']; // never persist stale data

  } finally {
    await browser.close();
  }

  const phase2  = ['CHAT', 'DRAM', 'MARS', 'WCLD', 'GTEK'];
  const fetched = phase2.filter(t => results[t]);
  const failed  = phase2.filter(t => !results[t]);

  console.log('\n=== Phase 2 Summary ===');
  console.log(`Fetched (${fetched.length}): ${fetched.join(', ') || 'none'}`);
  if (failed.length) console.log(`Failed  (${failed.length}): ${failed.join(', ')}`);

  const out = {
    lastUpdated: new Date().toISOString().split('T')[0],
    etfsFetched: Object.keys(results),
    holdings:    results,
  };
  fs.writeFileSync(RAW_PATH, JSON.stringify(out, null, 2));
  console.log(`\nWritten → ${RAW_PATH}`);
}

main().catch(e => { console.error(e); process.exit(1); });
