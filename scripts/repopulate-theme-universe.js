#!/usr/bin/env node
'use strict';

/**
 * repopulate-theme-universe.js
 * Targeted refresh of ONLY the @@GENERATED:THEME_UNIVERSE@@ block in lib/data.ts.
 *
 * Reuses build-data-ts.js's Yahoo fetch (fetchEtfData) + generator
 * (genThemeUniverse) so it does not rewrite any other generated block and never
 * touches history.json. The daily full pipeline also refreshes THEME_UNIVERSE on
 * every run; this is a one-shot bootstrap / manual refresh.
 */

const fs = require('fs');
const {
  yfInit, fetchEtfData, genThemeReps, genThemeUniverse, THEME_ETFS, DATA_PATH,
} = require('./build-data-ts.js');

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  console.log('=== repopulate-theme-universe.js ===\n');
  await yfInit();

  const tickers = [...new Set(Object.values(THEME_ETFS).flat())];
  const etfDataMap = {};
  let ok = 0;
  for (const t of tickers) {
    const d = await fetchEtfData(t);
    if (d && d.paths?.['1Y']?.length === 52) { etfDataMap[t] = d; ok++; console.log(`  ${t} ok`); }
    else console.log(`  ${t} FAILED`);
    await sleep(150);
  }
  console.log(`\nFetched ${ok}/${tickers.length} ETFs with full 1Y paths`);

  // Regenerate BOTH the representative trio and the universe from the SAME fetch,
  // so THEME_REPRESENTATIVES.etfs and THEME_UNIVERSE.chosen never disagree (the
  // daily pipeline runs them in one pass; this bootstrap must do the same).
  const uniBlock = genThemeUniverse(THEME_ETFS, etfDataMap);
  const repBlock = genThemeReps(THEME_ETFS, etfDataMap);
  if (!uniBlock || !repBlock) { console.error('generator produced nothing — aborting, data.ts untouched'); process.exit(1); }

  let src = fs.readFileSync(DATA_PATH, 'utf8');
  const patch = (re, block, label) => {
    if (!re.test(src)) { console.error(`${label} markers not found — aborting`); process.exit(1); }
    src = src.replace(re, block);
  };
  patch(/\/\/ @@GENERATED:THEME_REPRESENTATIVES@@[\s\S]*?\/\/ @@END_GENERATED:THEME_REPRESENTATIVES@@/, repBlock, 'THEME_REPRESENTATIVES');
  patch(/\/\/ @@GENERATED:THEME_UNIVERSE@@[\s\S]*?\/\/ @@END_GENERATED:THEME_UNIVERSE@@/, uniBlock, 'THEME_UNIVERSE');
  fs.writeFileSync(DATA_PATH, src, 'utf8');
  console.log('THEME_REPRESENTATIVES + THEME_UNIVERSE blocks written to lib/data.ts');
})().catch(e => { console.error(e); process.exit(1); });
