'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import ThemeNav from '@/app/components/ThemeNav';
import {
  THEME_ETFS,
  ETF_INFO,
  ETF_TOP_HOLDINGS,
  ETF_RETURNS,
  SCAN_TIMESTAMP_NY,
  type Theme,
  type Period,
} from '@/lib/data';

// One row per tracked ETF, assembled from the generated data blocks.
type Row = {
  ticker:  string;
  name:    string;
  manager: string;
  theme:   Theme;
  topT:    string;        // top holding ticker
  topW:    number;        // top holding weight
  ret:     Record<Period, number>;
};

type SortKey = 'ticker' | 'name' | 'manager' | 'theme' | 'top' | Period;
const TEXT_KEYS: SortKey[] = ['ticker', 'name', 'manager', 'theme', 'top'];

// Performance windows shown as columns (skip 1W — too noisy for a reference table).
const PERF_COLS: Period[] = ['1M', 'YTD', '6M', '1Y'];

function buildRows(): Row[] {
  const rows: Row[] = [];
  for (const theme of Object.keys(THEME_ETFS) as Theme[]) {
    for (const ticker of THEME_ETFS[theme]) {
      const info = ETF_INFO[ticker];
      const top  = (ETF_TOP_HOLDINGS[ticker] ?? [])[0];
      const ret  = ETF_RETURNS[ticker] ?? { '1W': 0, '1M': 0, 'YTD': 0, '6M': 0, '1Y': 0 };
      rows.push({
        ticker,
        name:    info?.name ?? ticker,
        manager: info?.manager ?? '—',
        theme,
        topT:    top?.t ?? '—',
        topW:    top?.w ?? 0,
        ret,
      });
    }
  }
  return rows;
}

function Perf({ v }: { v: number }) {
  const pos = v >= 0;
  return (
    <span className={`tabular-nums font-semibold ${pos ? 'text-emerald-400' : 'text-rose-400'}`}>
      {pos ? '+' : ''}{v.toFixed(1)}%
    </span>
  );
}

export default function Universe() {
  const allRows = useMemo(buildRows, []);
  const [sort, setSort] = useState<{ key: SortKey; dir: 'asc' | 'desc' }>({ key: '1Y', dir: 'desc' });

  const rows = useMemo(() => {
    const r = [...allRows];
    const { key, dir } = sort;
    const mul = dir === 'asc' ? 1 : -1;
    r.sort((a, b) => {
      let cmp = 0;
      if (key === 'ticker')      cmp = a.ticker.localeCompare(b.ticker);
      else if (key === 'name')   cmp = a.name.localeCompare(b.name);
      else if (key === 'manager')cmp = a.manager.localeCompare(b.manager);
      else if (key === 'theme')  cmp = a.theme.localeCompare(b.theme) || a.ticker.localeCompare(b.ticker);
      else if (key === 'top')    cmp = a.topW - b.topW;
      else                       cmp = a.ret[key] - b.ret[key];
      return cmp * mul;
    });
    return r;
  }, [allRows, sort]);

  function clickSort(key: SortKey) {
    setSort(s =>
      s.key === key
        ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' }
        : { key, dir: TEXT_KEYS.includes(key) ? 'asc' : 'desc' }, // text A→Z, numbers high→low
    );
  }

  const arrow = (key: SortKey) => (sort.key === key ? (sort.dir === 'asc' ? ' ↑' : ' ↓') : '');

  const Th = ({ k, label, align = 'left' }: { k: SortKey; label: string; align?: 'left' | 'right' }) => (
    <th
      onClick={() => clickSort(k)}
      className={`px-3 py-2.5 font-semibold uppercase tracking-wide text-[11px] cursor-pointer select-none whitespace-nowrap transition-colors hover:text-emerald-300 ${
        sort.key === k ? 'text-emerald-300' : 'text-slate-400'
      } ${align === 'right' ? 'text-right' : 'text-left'}`}
    >
      {label}<span className="text-emerald-400">{arrow(k)}</span>
    </th>
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Header — matches the rest of the site */}
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-start justify-between gap-4">
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-xl font-bold tracking-tight">
              <span className="text-emerald-400">Top</span>10
            </h1>
            <div className="mt-1.5">
              <span className="inline-flex items-center whitespace-nowrap bg-emerald-400/10 border border-emerald-400/25 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full tracking-wide">
                ETF Holdings Analyser
              </span>
            </div>
          </Link>
          <div className="flex flex-col items-end gap-4 min-w-0 overflow-hidden flex-1">
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/universe" className="text-emerald-400 font-medium">Universe</Link>
              <Link href="/about" className="text-slate-400 hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link>
            </nav>
            <ThemeNav />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Intro */}
        <section className="mb-7 max-w-3xl">
          <h2 className="text-2xl font-bold text-white mb-3">Our ETF Universe</h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            Every actively managed ETF we track, in one table. {allRows.length} funds across six themes —
            each one a discretionary book of conviction bets, not a passive index. These are the funds whose
            daily holdings feed every ranking on Top10.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            <span className="text-emerald-400 font-semibold">Tony&apos;s read:</span> use the manager column to
            see who is behind each fund, the top holding to see its single biggest bet, and the performance
            windows to compare momentum. A fund leading on 1-year but lagging YTD has cooled off; the reverse
            is one heating up. Click any column header to sort.
          </p>
        </section>

        {/* Table */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-900/80 border-b border-slate-800">
                <tr>
                  <Th k="ticker"  label="Symbol" />
                  <Th k="name"    label="Name" />
                  <Th k="manager" label="Manager" />
                  <Th k="theme"   label="Theme" />
                  <Th k="top"     label="Top Holding" />
                  {PERF_COLS.map(p => <Th key={p} k={p} label={p} align="right" />)}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.ticker} className={`border-b border-slate-800/60 ${i % 2 ? 'bg-slate-900/40' : ''} hover:bg-slate-800/40 transition-colors`}>
                    <td className="px-3 py-2.5 font-mono font-bold text-white whitespace-nowrap">{r.ticker}</td>
                    <td className="px-3 py-2.5 text-slate-300 min-w-[14rem]">{r.name}</td>
                    <td className="px-3 py-2.5 text-slate-400 whitespace-nowrap">{r.manager}</td>
                    <td className="px-3 py-2.5 text-slate-400 whitespace-nowrap">{r.theme}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <span className="font-mono text-slate-300">{r.topT}</span>
                      {r.topW > 0 && <span className="text-slate-500 text-xs ml-1.5">{r.topW.toFixed(1)}%</span>}
                    </td>
                    {PERF_COLS.map(p => (
                      <td key={p} className="px-3 py-2.5 text-right whitespace-nowrap"><Perf v={r.ret[p]} /></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-slate-500 text-xs mt-4">
          Data snapshot: {SCAN_TIMESTAMP_NY}. Performance is price return over each window (YTD = year to date).
          Top holding is the single largest position by weight. Indicative only, not investment advice.
        </p>

        {/* Disclaimer */}
        <p className="text-slate-600 text-xs border-t border-slate-800 pt-6 mt-8 max-w-3xl">
          Top10 is for informational purposes only and does not constitute financial advice. All data is
          indicative and sourced from public ETF disclosures and market feeds. Past performance is not a
          guarantee of future results. Always do your own research.
        </p>

      </div>
    </main>
  );
}
