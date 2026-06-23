'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { computeConviction, computeManagers } from '@/lib/conviction';
import { SCAN_TIMESTAMP_NY } from '@/lib/data';

const THEME_COLOR: Record<string, string> = {
  'AI & ML':        'text-violet-400 bg-violet-500/10 border-violet-500/30',
  'Semiconductors': 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  'Broad Tech':     'text-sky-400 bg-sky-500/10 border-sky-500/30',
  'Electrification':'text-amber-400 bg-amber-500/10 border-amber-500/30',
  'Industrials':    'text-orange-400 bg-orange-500/10 border-orange-500/30',
  'Meme':           'text-pink-400 bg-pink-500/10 border-pink-500/30',
};

const CONVICTION = computeConviction();
const MANAGERS = computeManagers();

// Consensus names = held by at least 2 managers. Single-manager names are
// idiosyncratic bets, not consensus, so they sit out of the board.
const CONSENSUS = CONVICTION.filter(r => r.breadth >= 2);

type Tab = 'stocks' | 'managers';

export default function ConvictionPage() {
  const [tab, setTab] = useState<Tab>('stocks');
  const [showAllManagers, setShowAllManagers] = useState(false);

  const chartRows = useMemo(() => CONSENSUS.slice(0, 10), []);
  const maxBreadth = chartRows[0]?.totalManagers ?? 40;
  const managers = showAllManagers ? MANAGERS : MANAGERS.slice(0, 8);

  function TabBtn({ k, label }: { k: Tab; label: string }) {
    return (
      <button
        onClick={() => setTab(k)}
        className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-colors ${
          tab === k
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
        <Link href="/" className="text-slate-400 hover:text-slate-200 text-sm transition-colors">← Stockscout</Link>
        <div className="text-center">
          <div className="font-bold text-sm">The Conviction Board</div>
          <div className="text-xs text-slate-500">Where 40 managers concentrate</div>
        </div>
        <Link href="/ask" className="text-emerald-400 hover:text-emerald-300 text-xs transition-colors">Ask Tony</Link>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Hero message — make the idea impossible to misread */}
        <div className="mb-8 p-6 bg-slate-900 border border-slate-800 rounded-2xl">
          <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-emerald-400 mb-3">The Conviction Board</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-50 leading-tight">
            Where 40 active ETF managers put their highest conviction.
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed mt-4 max-w-2xl">
            Every manager publishes the handful of names it weights most. When the same stock shows up across many top books, that is consensus you can see. This board ranks by <span className="text-slate-200">how many managers hold it and how heavily</span>. Not performance. Not a formula. Just where conviction is concentrated.
          </p>
          <p className="text-xs text-slate-600 mt-4">Data snapshot: {SCAN_TIMESTAMP_NY}. Not investment advice.</p>
        </div>

        {/* Scoreboards — two views of the same conviction signal */}
        <h2 className="text-lg font-bold text-slate-100">Scoreboards</h2>
        <p className="text-xs text-slate-500 mb-4">Two views of the same signal. Switch between them.</p>
        <div className="flex gap-2 mb-6">
          <TabBtn k="stocks" label="By Stock" />
          <TabBtn k="managers" label="By Manager" />
        </div>

        {tab === 'stocks' && (
          <>
        {/* Consensus conviction chart */}
        <div className="mb-8 bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="font-bold text-sm">Consensus conviction</div>
          <div className="text-xs sm:text-sm font-medium text-slate-300 mt-1 mb-5">
            Held in N of {maxBreadth} managers&apos; top books. Bar = breadth, label = avg weight where held.
          </div>

          <div className="flex flex-col gap-2.5">
            {chartRows.map(r => {
              const pct = (r.breadth / maxBreadth) * 100;
              return (
                <div key={r.ticker} className="flex items-center gap-3">
                  <div className="w-12 text-xs font-bold text-slate-300 shrink-0">{r.ticker}</div>
                  <div className="flex-1 bg-slate-800 rounded h-4.5 relative" style={{ height: 18 }}>
                    <div className="bg-emerald-500 h-full rounded" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="w-28 text-[11px] text-slate-400 text-right shrink-0">
                    {r.breadth}/{maxBreadth} · {r.avgWeight.toFixed(1)}% wt
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stock ranking — by conviction */}
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Ranked by conviction</h2>
        <div className="space-y-1 mb-10">
          {CONSENSUS.map((r, i) => (
            <div key={r.ticker} className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-lg px-4 py-3">
              <div className="text-slate-600 text-xs w-6 text-right shrink-0">#{i + 1}</div>
              <div className="w-16 shrink-0">
                <div className="font-bold text-sm">{r.ticker}</div>
                {r.theme && (
                  <div className={`text-[10px] border rounded-full px-1.5 py-0.5 inline-block mt-0.5 ${THEME_COLOR[r.theme] ?? 'text-slate-400'}`}>
                    {r.theme}
                  </div>
                )}
              </div>
              <div className="flex-1 text-slate-400 text-xs truncate">{r.name}</div>
              <div className="text-right shrink-0 w-20">
                <div className="text-slate-600 text-[10px]">in top books</div>
                <div className="text-sm font-bold text-emerald-400">{r.breadth} / {r.totalManagers}</div>
              </div>
              <div className="text-right shrink-0 w-16">
                <div className="text-slate-600 text-[10px]">avg weight</div>
                <div className="text-sm font-bold text-slate-200">{r.avgWeight.toFixed(1)}%</div>
              </div>
            </div>
          ))}
        </div>
          </>
        )}

        {tab === 'managers' && (
          <>
        {/* Per-manager section — reframed around conviction, not returns */}
        <h2 className="text-sm sm:text-base font-bold text-slate-200 mb-1">Each manager&apos;s highest-conviction picks</h2>
        <p className="text-xs sm:text-sm font-medium text-slate-300 mb-3">The disclosed top holdings of each fund, by weight. Most concentrated books first.</p>
        <div className="space-y-1">
          {managers.map(m => (
            <div key={m.etf} className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-lg px-4 py-3">
              <div className="w-16 shrink-0">
                <div className="font-bold text-sm">{m.etf}</div>
                <div className={`text-[10px] border rounded-full px-1.5 py-0.5 inline-block mt-0.5 ${THEME_COLOR[m.theme] ?? 'text-slate-400'}`}>
                  {m.theme}
                </div>
              </div>
              <div className="flex gap-1.5 flex-1 flex-wrap">
                {m.picks.map(p => (
                  <span key={p.ticker} className="text-[10px] bg-slate-800 border border-slate-700 rounded px-1.5 py-0.5 text-slate-300">
                    {p.ticker} <span className="text-slate-500">{p.weight.toFixed(1)}%</span>
                  </span>
                ))}
              </div>
              <div className="text-right shrink-0 w-16">
                <div className="text-slate-600 text-[10px]">top-5 wt</div>
                <div className="text-sm font-bold text-slate-200">{m.concentration.toFixed(0)}%</div>
              </div>
            </div>
          ))}
        </div>
        {!showAllManagers && MANAGERS.length > 8 && (
          <button
            onClick={() => setShowAllManagers(true)}
            className="mt-3 w-full text-center text-xs text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 rounded-lg py-2 transition-colors"
          >
            Show all {MANAGERS.length} managers
          </button>
        )}
          </>
        )}

        <p className="text-slate-700 text-xs text-center mt-8">
          For informational purposes only. Not investment advice. Conviction is measured from disclosed top holdings — breadth across managers and weight, not performance. Observed since May 2026.
        </p>
      </div>
    </div>
  );
}
