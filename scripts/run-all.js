#!/usr/bin/env node
'use strict';

const { execSync } = require('child_process');
const path = require('path');

function run(script) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Running: ${script}`);
  console.log('='.repeat(60));
  execSync(`node "${path.join(__dirname, script)}"`, { stdio: 'inherit' });
}

run('fetch-holdings.js');           // Phase 1: simple HTTP (iShares, Invesco, ARK, Wedbush, Tema, MAGS, First Trust)
run('fetch-holdings-playwright.js'); // Phase 2: Playwright (VistaShares, Roundhill, WisdomTree, Goldman Sachs)
run('build-data-ts.js');

console.log('\n✓ All done. lib/data.ts has been updated with real holdings.');
