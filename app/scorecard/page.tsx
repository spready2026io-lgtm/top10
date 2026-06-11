'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { computeScorecard } from '@/lib/scorecard';
import { SCAN_TIMESTAMP_NY } from '@/lib/data';

type SortKey = 'tonyScore' | 'score1W' | 'score1M' | 'score6M';

const THEME_COLOR: Record<string, string> = {
  'AI & ML':        'text-violet-400 bg-violet-500/10 border-violet-500/30',
  'Semiconductors': 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  'Broad Tech':     'text-sky-400 bg-sky-500/10 border-sky-500/30',
  'Electrification':'text-amber-400 bg-amber-500/10 border-amber-500/30',
  'Industrials':    'text-orange-400 bg-orange-500/10 border-orange-500/30',
  'Meme':           'text-pink-400 bg-pink-500/10 border-pink-500/30',
};

function fmt(n: number | null, decimals = 1): string {
  if (n === null) return '—';
  return (n >= 0 ? '+' : '') + n.toFixed(decimals) + '%';
}

function color(n: number | null): string {
  if (n === null) return 'text-slate-500';
  return n >= 0 ? 'text-emerald-400' : 'text-rose-400';
}

const ALL_DATA = computeScorecard();

export default function ScorecardPage() {
  const [sortKey, setSortKey] = useState<SortKey>('tonyScore');
  const [expanded, setExpanded] = useState<string | null>(null);

  const sorted = useMemo(() => {
    return [...ALL_DATA].sort((a, b) => {
      const av = a[sortKey] ?? -999;
      const bv = b[sortKey] ?? -999;
      return bv - av;
    });
  }, [sortKey]);

  const top10 = sorted.slice(0, 10);

  function SortBtn({ k, label }: { k: SortKey; label: string }) {
    return (
      <button
        onClick={() => setSortKey(k)}
        className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
          sortKey === k
            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
            : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
        }`}
      >
        {label}
      </button>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">

      {/* Header */}
      <header className="border-b border-slate-800 px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-slate-400 hover:text-slate-200 text-sm transition-colors">← Top10</Link>
        <div className="text-center">
          <div className="font-bold text-sm">Tony&apos;s ETF Scorecard</div>
          <div className="text-xs text-slate-500">Top conviction picks — ranked by performance</div>
        </div>
        <Link href="/ask" className="text-emerald-400 hover:text-emerald-300 text-xs transition-colors">Ask Tony</Link>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Intro */}
        <div className="mb-8 p-4 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-400 leading-relaxed">
          <span className="text-slate-200 font-semibold">What this is:</span> For each of our 40 active-managed ETFs, I take their top 5 disclosed holdings and compute a weighted-average return across 3 periods. This grades the manager&apos;s highest-conviction picks — not the ETF&apos;s NAV. Tony Score = 20% (1W) + 30% (1M) + 50% (6M). Data snapshot: {SCAN_TIMESTAMP_NY}. Not investment advice.
        </div>

        {/* Top 10 highlight */}
        <div className="mb-8">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Tony&apos;s Top 10 ETFs by Pick Performance</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {top10.map((row, i) => (
              <div key={row.etf} className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-center">
                <div className="text-xs text-slate-500 mb-0.5">#{i + 1}</div>
                <div className="font-bold text-sm">{row.etf}</div>
                <div className={`text-xs font-bold mt-1 ${color(row.tonyScore)}`}>{fmt(row.tonyScore)}</div>
                <div className={`text-[10px] mt-0.5 border rounded-full px-1.5 py-0.5 inline-block ${THEME_COLOR[row.theme] ?? 'text-slate-400'}`}>
                  {row.theme}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sort controls */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-slate-500 mr-1">Sort by:</span>
          <SortBtn k="tonyScore" label="Tony Score" />
          <SortBtn k="score1W"   label="1W" />
          <SortBtn k="score1M"   label="1M" />
          <SortBtn k="score6M"   label="6M" />
        </div>

        {/* Full table */}
        <div className="space-y-1">
          {sorted.map((row, i) => (
            <div key={row.etf} className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">

              {/* Row */}
              <button
                onClick={() => setExpanded(expanded === row.etf ? null : row.etf)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800/50 transition-colors text-left"
              >
                {/* Rank */}
                <div className="text-slate-600 text-xs w-5 text-right shrink-0">#{i + 1}</div>

                {/* ETF + theme */}
                <div className="w-16 shrink-0">
                  <div className="font-bold text-sm">{row.etf}</div>
                  <div className={`text-[10px] border rounded-full px-1.5 py-0.5 inline-block mt-0.5 ${THEME_COLOR[row.theme] ?? 'text-slate-400'}`}>
                    {row.theme}
                  </div>
                </div>

                {/* Pick pills */}
                <div className="flex gap-1 flex-1 flex-wrap">
                  {row.picks.slice(0, 5).map(p => (
                    <span key={p.ticker} className="text-[10px] bg-slate-800 border border-slate-700 rounded px-1.5 py-0.5 text-slate-300">
                      {p.ticker}
                    </span>
                  ))}
                </div>

                {/* Scores */}
                <div className="flex gap-4 shrink-0 text-xs text-right">
                  <div>
                    <div className="text-slate-600 text-[10px]">1W</div>
                    <div className={color(row.score1W)}>{fmt(row.score1W)}</div>
                  </div>
                  <div>
                    <div className="text-slate-600 text-[10px]">1M</div>
                    <div className={color(row.score1M)}>{fmt(row.score1M)}</div>
                  </div>
                  <div>
                    <div className="text-slate-600 text-[10px]">6M</div>
                    <div className={color(row.score6M)}>{fmt(row.score6M)}</div>
                  </div>
                  <div className="w-16">
                    <div className="text-slate-600 text-[10px]">Tony Score</div>
                    <div className={`font-bold ${color(row.tonyScore)}`}>{fmt(row.tonyScore)}</div>
                  </div>
                </div>

                <div className="text-slate-600 text-xs shrink-0">{expanded === row.etf ? '▲' : '▼'}</div>
              </button>

              {/* Expanded pick detail */}
              {expanded === row.etf && (
                <div className="px-4 pb-4 border-t border-slate-800">
                  <div className="mt-3 text-xs text-slate-500 mb-2">Top conviction picks — weighted return breakdown</div>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                    {row.picks.map(p => (
                      <div key={p.ticker} className="bg-slate-800 rounded-lg p-3">
                        <div className="font-bold text-sm mb-1">{p.ticker}</div>
                        <div className="text-[10px] text-slate-500 mb-2">Weight: {p.weight.toFixed(1)}%</div>
                        <div className="space-y-0.5 text-xs">
                          <div className="flex justify-between">
                            <span className="text-slate-500">1W</span>
                            <span className={color(p.weeklyChange)}>{fmt(p.weeklyChange)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">1M</span>
                            <span className={color(p.return1M)}>{fmt(p.return1M)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">6M</span>
                            <span className={color(p.return6M)}>{fmt(p.return6M)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* ETF own return vs pick return */}
                  {(row.etfReturn1W != null || row.etfReturn6M != null) && (
                    <div className="mt-3 p-3 bg-slate-800/50 rounded-lg text-xs flex gap-6">
                      <div className="text-slate-500">ETF NAV return vs top-pick return:</div>
                      {row.etfReturn1W != null && (
                        <div>1W: <span className={color(row.etfReturn1W)}>{fmt(row.etfReturn1W)}</span> NAV vs <span className={color(row.score1W)}>{fmt(row.score1W)}</span> picks</div>
                      )}
                      {row.etfReturn6M != null && (
                        <div>6M: <span className={color(row.etfReturn6M)}>{fmt(row.etfReturn6M)}</span> NAV vs <span className={color(row.score6M)}>{fmt(row.score6M)}</span> picks</div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-slate-700 text-xs text-center mt-8">
          For informational purposes only. Not investment advice. Pick returns are weighted averages of disclosed top holdings — not ETF NAV performance. Observed since May 2026.
        </p>
      </div>
    </div>
  );
}
