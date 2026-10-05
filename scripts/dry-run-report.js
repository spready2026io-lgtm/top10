#!/usr/bin/env node
'use strict';

// TEMPORARY (removed before merge): per-fund report for the 2026-10-05 branch
// dry run. Holdings count, share-count coverage, source, top names.
const raw = require('../lib/holdings-raw.json');
const { THEME_ETFS } = require('./build-data-ts');

const themesOf = {};
for (const [t, etfs] of Object.entries(THEME_ETFS)) for (const e of etfs) (themesOf[e] ??= []).push(t);

const rows = [];
for (const etf of Object.keys(themesOf)) {
  const h = raw.holdings[etf] || [];
  const withSh = h.filter(x => x.shares > 0).length;
  const m = (raw.meta || {})[etf] || {};
  rows.push({ etf, themes: themesOf[etf].join('/'), n: h.length, withSh, src: m.src || '-', trunc: m.truncated, top: h.slice(0, 4).map(x => x.ticker).join(' ') });
}
console.log('ETF    n   sh  src            themes                     top');
for (const r of rows) {
  const flag = r.n < 5 ? '  <-- UNDER 5' : '';
  console.log(`${r.etf.padEnd(5)} ${String(r.n).padStart(3)} ${String(r.withSh).padStart(4)}  ${(r.src + (r.trunc ? '*' : '')).padEnd(14)} ${r.themes.padEnd(26)} ${r.top}${flag}`);
}
const missing = rows.filter(r => r.n === 0).map(r => r.etf);
console.log(`\nFunds: ${rows.length}. With holdings: ${rows.length - missing.length}. Missing: ${missing.join(', ') || 'none'}`);
console.log(`With share counts on 90%+ of rows: ${rows.filter(r => r.n && r.withSh / r.n >= 0.9).length}`);
