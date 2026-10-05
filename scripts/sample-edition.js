#!/usr/bin/env node
'use strict';

// TEMPORARY (removed before merge): build one REAL sample edition before the
// pipeline has a day of share-count history. iShares serves past holdings, so
// for the iShares funds in the universe we compare the previous trading day's
// file with the latest one, run them through the real engine and the real
// email template, and write tmp/sample-daily-conviction.html. Six funds only:
// a partial edition, clearly labelled as such in the banner.
const fs = require('fs');
const path = require('path');
const { compareFund, toRows } = require('./build-moves');
const { buildEmail, subjectFor } = require('./send-daily-conviction');
const { THEME_ETFS, fetchLastPrice } = require('./build-data-ts');

const ISH = [
  { ticker: 'ARTY', id: '297905' }, { ticker: 'BAI', id: '339081' }, { ticker: 'SOXX', id: '239705' },
  { ticker: 'IGV', id: '239771' }, { ticker: 'IDEF', id: '343529' }, { ticker: 'BILT', id: '345073' },
];
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
const themesOf = {};
for (const [t, etfs] of Object.entries(THEME_ETFS)) for (const e of etfs) (themesOf[e] ??= []).push(t);

async function get(id, extra) {
  const url = `https://www.ishares.com/varnish-api/blk-one01-product-data/product-data/api/v2/get-product-data?appSubType=ISHARES&appType=PRODUCT_PAGE&component=holdings.all&locale=en_US&targetSite=us-ishares&portfolioId=${id}${extra}`;
  const r = await fetch(url, { headers: { 'User-Agent': UA, Referer: `https://www.ishares.com/us/products/${id}/` } });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const dp = (await r.json()).componentsByNameMap?.holdings?.containersByNameMap?.all?.dataPointsByNameMap;
  if (!dp) throw new Error('no datapoints');
  const date = (dp.dateList?.value || [])[0];
  const out = [];
  const t = dp.ticker?.value || [], n = dp.issueName?.value || [], w = dp.holdingPercent?.value || [], u = dp.unitsHeld?.value || [], a = dp.assetClass?.value || [];
  for (let i = 0; i < t.length; i++) {
    if (!/^[A-Z]{1,5}$/.test(t[i] || '') || !String(a[i] || '').toLowerCase().includes('equity')) continue;
    if (!(w[i] > 0) || !(u[i] > 0)) continue;
    out.push({ ticker: t[i], name: n[i] || t[i], weight: w[i], shares: u[i] });
  }
  return { date, holdings: out };
}

(async () => {
  const moves = [];
  let compared = 0, curDate = null, prevDate = null;
  for (const f of ISH) {
    const cur = await get(f.id, '');
    let prev = null;
    // The latest file's date tells us which day to ask for before it.
    const d = new Date(`${String(cur.date).slice(0, 4)}-${String(cur.date).slice(4, 6)}-${String(cur.date).slice(6, 8)}T12:00:00Z`);
    do { d.setUTCDate(d.getUTCDate() - 1); } while ([0, 6].includes(d.getUTCDay()));
    const want = d.toISOString().slice(0, 10).replace(/-/g, '');
    for (const param of [`&asOfDate=${want}`, `&date=${want}`, `&asOf=${want}`]) {
      try {
        const p = await get(f.id, param);
        if (String(p.date) === want) { prev = p; console.log(`${f.ticker}: ${param} served ${p.date} (latest ${cur.date})`); break; }
        console.log(`${f.ticker}: ${param} ignored (served ${p.date})`);
      } catch (e) { console.log(`${f.ticker}: ${param} failed ${e.message}`); }
    }
    if (!prev) continue;
    curDate = String(cur.date); prevDate = String(prev.date);
    const r = compareFund(f.ticker, { truncated: false, rows: toRows(prev.holdings) }, { truncated: false, rows: toRows(cur.holdings) }, themesOf[f.ticker]);
    if (!r) continue;
    compared++;
    console.log(`  flow ${(r.flow * 100).toFixed(2)}%, ${r.moves.length} moves`);
    moves.push(...r.moves);
  }
  if (!compared) { console.log('No iShares history served; no sample.'); return; }

  for (const m of moves) {
    const p = await fetchLastPrice(m.ticker);
    m.price = p; m.value = p ? Math.round(m.netShares * p) : null;
  }
  moves.sort((a, b) => Math.abs(b.value ?? 0) - Math.abs(a.value ?? 0));
  const iso = s => `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`;
  const d = {
    date: iso(curDate), status: 'ok', fundsCompared: compared, movesConsidered: moves.length,
    top: moves.slice(0, 20).map((m, i) => ({ rank: i + 1, ...m })),
    consensus: { buys: [], sells: [] },
  };
  const note = `SAMPLE, not sent to anyone. Real holdings, but only the ${compared} iShares funds that publish history (${iso(prevDate)} vs ${iso(curDate)}). The live edition covers every fund with share counts.`;
  const { html } = buildEmail(d, null, note);
  fs.mkdirSync(path.join(__dirname, '..', 'tmp'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, '..', 'tmp', 'sample-daily-conviction.html'), html);
  console.log(`\nSubject: ${subjectFor(d)}`);
  for (const m of d.top) console.log(`  ${m.rank}. ${m.etf} ${m.kind} ${m.ticker} ${m.netShares} sh, $${((m.value || 0) / 1e6).toFixed(1)}M, ${m.weightMoved}pp`);
})();
