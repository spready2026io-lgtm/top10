'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import SiteNav from '@/app/components/brand/SiteNav';
import SiteFooter from '@/app/components/brand/SiteFooter';
import {
  THEME_ETFS,
  ETF_INFO,
  ETF_TOP_HOLDINGS,
  ETF_RETURNS,
  SCAN_TIMESTAMP_NY,
  type Theme,
  type Period,
} from '@/lib/data';
import { MARKET_TILES, LENS_FUNDS } from '@/lib/markets-data';

// One row per tracked ETF, assembled from the generated data blocks.
type Row = {
  ticker:  string;
  name:    string;
  manager: string;
  theme:   Theme;
  aum:     number;        // fund size (net assets), 0 if unknown
  topT:    string;        // top holding ticker
  topW:    number;        // top holding weight
  ret:     Record<Period, number>;
};

type SortKey = 'ticker' | 'name' | 'manager' | 'theme' | 'size' | 'top' | Period;
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
        aum:     info?.aum ?? 0,
        topT:    top?.t ?? '—',
        topW:    top?.w ?? 0,
        ret,
      });
    }
  }
  return rows;
}

// Fund size (net assets) → compact $ string. Returns '—' when unknown.
function fmtAum(v: number): string {
  if (!v || v <= 0) return '—';
  if (v >= 1e9) return `$${(v / 1e9).toFixed(v >= 1e10 ? 0 : 1)}B`;
  if (v >= 1e6) return `$${(v / 1e6).toFixed(0)}M`;
  return `$${Math.max(1, Math.round(v / 1e3))}K`;
}

function Perf({ v }: { v: number }) {
  const pos = v >= 0;
  return (
    <span className={`tabular-nums font-semibold ${pos ? 'text-[#059669]' : 'text-[#c2743a]'}`}>
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
      else if (key === 'size')   cmp = a.aum - b.aum;
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
      className={`px-3 py-2.5 font-semibold uppercase tracking-wide text-[11px] cursor-pointer select-none whitespace-nowrap transition-colors hover:text-[#059669] ${
        sort.key === k ? 'text-[#059669]' : 'text-[#55606e]'
      } ${align === 'right' ? 'text-right' : 'text-left'}`}
    >
      {label}<span className="text-[#059669]">{arrow(k)}</span>
    </th>
  );

  return (
    <main className="min-h-screen" style={{ background: '#F7F8FB', color: '#0B1220' }}>

      <SiteNav active="Universe" />

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Intro */}
        <section className="mb-7 max-w-3xl">
          <h2 className="text-2xl font-bold text-[#0B1220] mb-3">Our ETF Universe</h2>
          <p className="text-[#55606e] text-sm leading-relaxed mb-3">
            Every ETF we track, in one table. {allRows.length} funds across eight themes. Most are
            discretionary books of conviction bets; the Software and Cyber themes use specialist sector
            baskets. These are the funds whose daily holdings feed every ranking on Stockscout.
          </p>
          <p className="text-[#55606e] text-sm leading-relaxed">
            <span className="text-[#059669] font-semibold">Tony&apos;s read:</span> use the manager column to
            see who is behind each fund, the top holding to see its single biggest bet, and the performance
            windows to compare momentum. A fund leading on 1-year but lagging YTD has cooled off; the reverse
            is one heating up. Click any column header to sort.
          </p>
        </section>

        {/* Table */}
        <div className="rounded-xl border border-[#e6e9ef] bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#f4f6f9] border-b border-[#e6e9ef]">
                <tr>
                  <Th k="ticker"  label="Symbol" />
                  <Th k="name"    label="Name" />
                  <Th k="manager" label="Manager" />
                  <Th k="theme"   label="Theme" />
                  <Th k="size"    label="Size" align="right" />
                  <Th k="top"     label="Top Holding" />
                  {PERF_COLS.map(p => <Th key={p} k={p} label={p} align="right" />)}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.ticker} className={`border-b border-[#eef1f5] ${i % 2 ? 'bg-[#f4f6f9]' : ''} hover:bg-[#f4f6f9] transition-colors`}>
                    <td className="px-3 py-2.5 font-mono font-bold text-[#0B1220] whitespace-nowrap">{r.ticker}</td>
                    <td className="px-3 py-2.5 text-[#55606e] max-w-[10rem] truncate" title={r.name}>{r.name}</td>
                    <td className="px-3 py-2.5 text-[#55606e] max-w-[8rem] truncate" title={r.manager}>{r.manager}</td>
                    <td className="px-3 py-2.5 text-[#55606e] whitespace-nowrap">{r.theme}</td>
                    <td className="px-3 py-2.5 text-right text-[#55606e] tabular-nums whitespace-nowrap">{fmtAum(r.aum)}</td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <span className="font-mono text-[#55606e]">{r.topT}</span>
                      {r.topW > 0 && <span className="text-[#8a94a3] text-xs ml-1.5">{r.topW.toFixed(1)}%</span>}
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

        <p className="text-[#8a94a3] text-xs mt-4">
          Data snapshot: {SCAN_TIMESTAMP_NY}. Size is fund net assets (AUM). Performance is price return over
          each window (YTD = year to date). Top holding is the single largest position by weight. Indicative
          only, not investment advice.
        </p>

        {/* Measuring instruments — index funds tracked on purpose, never scored */}
        <section className="mt-12">
          <h3 className="text-lg font-bold text-[#0B1220] mb-1">The measuring instruments</h3>
          <p className="text-[#55606e] text-sm leading-relaxed mb-2 max-w-3xl">
            Everything above is the tracked universe: {allRows.length} funds across eight themes.
            The funds below are a different tool, on purpose. A broad index fund cannot have conviction, so these are
            never scored. They are instruments. Each one measures a market on
            the <Link href="/markets" className="text-[#059669] hover:text-[#059669] font-semibold">World Markets</Link> board,
            and three of them (IXUS, EFA, EEM) back the world sleeve in
            the <Link href="/portfolio" className="text-[#059669] hover:text-[#059669] font-semibold">portfolio builder</Link>.
          </p>
          <p className="text-[#55606e] text-xs mb-5 max-w-3xl">
            Tony&apos;s read: keep the two lists apart in your head. The table ranks manager conviction.
            These funds track where market-level money goes. Different question, different tool.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-[#e6e9ef] bg-white p-4">
              <div className="flex items-baseline justify-between mb-3">
                <span className="font-bold text-[#0B1220] text-sm">Market instruments</span>
                <span className="text-[#8a94a3] text-xs">{MARKET_TILES.length} funds, one per market</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {MARKET_TILES.map(m => (
                  <Link
                    key={m.ticker}
                    href="/markets"
                    title={`${m.market} via ${m.ticker}`}
                    className="rounded-full border border-[#d7dce3] bg-[#f4f6f9] px-2 py-0.5 text-[11px] font-semibold text-[#55606e] hover:border-[#b3bcc7] hover:text-[#0B1220] transition-colors"
                  >
                    {m.flag} <span className="font-mono">{m.ticker}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-[#e6e9ef] bg-white p-4">
              <div className="flex items-baseline justify-between mb-3">
                <span className="font-bold text-[#0B1220] text-sm">Allocation lenses</span>
                <span className="text-[#8a94a3] text-xs">{LENS_FUNDS.length} broad international funds</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {LENS_FUNDS.map(l => (
                  <Link
                    key={l.ticker}
                    href="/markets"
                    title={l.name}
                    className="rounded-full border border-[#d7dce3] bg-[#f4f6f9] px-2 py-0.5 text-[11px] font-semibold text-[#55606e] hover:border-[#b3bcc7] hover:text-[#0B1220] transition-colors"
                  >
                    <span className="font-mono">{l.ticker}</span> <span className="text-[#8a94a3]">{l.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <p className="text-[#a4adba] text-xs border-t border-[#e6e9ef] pt-6 mt-8 max-w-3xl">
          Stockscout is for informational purposes only and does not constitute financial advice. All data is
          indicative and sourced from public ETF disclosures and market feeds. Past performance is not a
          guarantee of future results. Always do your own research.
        </p>

      </div>
      <SiteFooter />
    </main>
  );
}
