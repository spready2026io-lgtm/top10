'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { computeConviction, computeManagers } from '@/lib/conviction';
import { SCAN_TIMESTAMP_NY } from '@/lib/data';
import EmailCapture from '@/app/components/EmailCapture';

const THEME_COLOR: Record<string, string> = {
  'AI & ML':        'text-violet-400 bg-violet-500/10 border-violet-500/30',
  'Semiconductors': 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  'Broad Tech':     'text-sky-400 bg-sky-500/10 border-sky-500/30',
  'Software':       'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
  'Cyber':          'text-red-400 bg-red-500/10 border-red-500/30',
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
  const totalManagers = MANAGERS.length;
  const maxBreadth = chartRows[0]?.totalManagers ?? totalManagers;
  const managers = showAllManagers ? MANAGERS : MANAGERS.slice(0, 8);

  function TabBtn({ k, label }: { k: Tab; label: string }) {
    return (
      <button
        onClick={() => setTab(k)}
        className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-colors ${
          tab === k
            ? 'bg-[#e7f7f0] border-[#b8e6d3] text-[#0a7350]'
            : 'bg-[#f4f6f9] border-[#d7dce3] text-[#55606e] hover:text-[#0B1220]'
        }`}
      >
        {label}
      </button>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FB] text-[#0B1220]">

      {/* Header */}
      <header className="border-b border-[#e6e9ef] px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-[#55606e] hover:text-[#0B1220] text-sm transition-colors">← Stockscout</Link>
        <div className="text-center">
          <div className="font-bold text-sm">The Conviction Board</div>
          <div className="text-xs text-[#8a94a3]">Where {totalManagers} managers concentrate</div>
        </div>
        <Link href="/ask" className="text-[#059669] hover:text-[#0a7350] text-xs transition-colors">Ask Tony</Link>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Hero message — make the idea impossible to misread */}
        <div className="mb-8 p-6 bg-white border border-[#e6e9ef] rounded-2xl">
          <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#059669] mb-3">The Conviction Board</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1220] leading-tight">
            Where {totalManagers} active ETF managers put their highest conviction.
          </h1>
          <p className="text-sm text-[#55606e] leading-relaxed mt-4 max-w-2xl">
            Every manager publishes the handful of names it weights most. When the same stock shows up across many top books, that is consensus you can see. This board ranks by <span className="text-[#0B1220]">how many managers hold it and how heavily</span>. Not performance. Not a formula. Just where conviction is concentrated.
          </p>
          <p className="text-xs text-[#a4adba] mt-4">Data snapshot: {SCAN_TIMESTAMP_NY}. Not investment advice.</p>
        </div>

        {/* Scoreboards — two views of the same conviction signal */}
        <h2 className="text-lg font-bold text-[#0B1220]">Scoreboards</h2>
        <p className="text-xs text-[#8a94a3] mb-4">Two views of the same signal. Switch between them.</p>
        <div className="flex gap-2 mb-6">
          <TabBtn k="stocks" label="By Stock" />
          <TabBtn k="managers" label="By Manager" />
        </div>

        {tab === 'stocks' && (
          <>
        {/* Consensus conviction chart */}
        <div className="mb-8 bg-white border border-[#e6e9ef] rounded-xl p-5">
          <div className="font-bold text-sm">Consensus conviction</div>
          <div className="text-xs sm:text-sm font-medium text-[#55606e] mt-1 mb-5">
            {`Held in N of ${maxBreadth} managers' top books. Bar = breadth, label = avg weight where held.`}
          </div>

          <div className="flex flex-col gap-2.5">
            {chartRows.map(r => {
              const pct = (r.breadth / maxBreadth) * 100;
              return (
                <div key={r.ticker} className="flex items-center gap-3">
                  <div className="w-12 text-xs font-bold text-[#55606e] shrink-0">{r.ticker}</div>
                  <div className="flex-1 bg-[#f4f6f9] rounded h-4.5 relative" style={{ height: 18 }}>
                    <div className="bg-emerald-500 h-full rounded" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="w-28 text-[11px] text-[#55606e] text-right shrink-0">
                    {r.breadth}/{maxBreadth} · {r.avgWeight.toFixed(1)}% wt
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stock ranking — by conviction */}
        <h2 className="text-xs font-bold text-[#8a94a3] uppercase tracking-widest mb-3">Ranked by conviction</h2>
        <div className="space-y-1 mb-10">
          {CONSENSUS.map((r, i) => (
            <div key={r.ticker} className="flex items-center gap-3 bg-white border border-[#e6e9ef] rounded-lg px-4 py-3">
              <div className="text-[#a4adba] text-xs w-6 text-right shrink-0">#{i + 1}</div>
              <div className="w-16 shrink-0">
                <div className="font-bold text-sm">{r.ticker}</div>
                {r.theme && (
                  <div className={`text-[10px] border rounded-full px-1.5 py-0.5 inline-block mt-0.5 ${THEME_COLOR[r.theme] ?? 'text-[#55606e]'}`}>
                    {r.theme}
                  </div>
                )}
              </div>
              <div className="flex-1 text-[#55606e] text-xs truncate">{r.name}</div>
              <div className="text-right shrink-0 w-20">
                <div className="text-[#a4adba] text-[10px]">in top books</div>
                <div className="text-sm font-bold text-[#059669]">{r.breadth} / {r.totalManagers}</div>
              </div>
              <div className="text-right shrink-0 w-16">
                <div className="text-[#a4adba] text-[10px]">avg weight</div>
                <div className="text-sm font-bold text-[#0B1220]">{r.avgWeight.toFixed(1)}%</div>
              </div>
            </div>
          ))}
        </div>
          </>
        )}

        {tab === 'managers' && (
          <>
        {/* Per-manager section — reframed around conviction, not returns */}
        <h2 className="text-sm sm:text-base font-bold text-[#0B1220] mb-1">Each manager&apos;s highest-conviction picks</h2>
        <p className="text-xs sm:text-sm font-medium text-[#55606e] mb-3">The disclosed top holdings of each fund, by weight. Most concentrated books first.</p>
        <div className="space-y-1">
          {managers.map(m => (
            <div key={m.etf} className="flex items-center gap-3 bg-white border border-[#e6e9ef] rounded-lg px-4 py-3">
              <div className="w-16 shrink-0">
                <div className="font-bold text-sm">{m.etf}</div>
                <div className={`text-[10px] border rounded-full px-1.5 py-0.5 inline-block mt-0.5 ${THEME_COLOR[m.theme] ?? 'text-[#55606e]'}`}>
                  {m.theme}
                </div>
              </div>
              <div className="flex gap-1.5 flex-1 flex-wrap">
                {m.picks.map(p => (
                  <span key={p.ticker} className="text-[10px] bg-[#f4f6f9] border border-[#d7dce3] rounded px-1.5 py-0.5 text-[#55606e]">
                    {p.ticker} <span className="text-[#8a94a3]">{p.weight.toFixed(1)}%</span>
                  </span>
                ))}
              </div>
              <div className="text-right shrink-0 w-16">
                <div className="text-[#a4adba] text-[10px]">top-5 wt</div>
                <div className="text-sm font-bold text-[#0B1220]">{m.concentration.toFixed(0)}%</div>
              </div>
            </div>
          ))}
        </div>
        {!showAllManagers && MANAGERS.length > 8 && (
          <button
            onClick={() => setShowAllManagers(true)}
            className="mt-3 w-full text-center text-xs text-[#55606e] hover:text-[#0B1220] border border-[#e6e9ef] hover:border-[#d7dce3] rounded-lg py-2 transition-colors"
          >
            Show all {MANAGERS.length} managers
          </button>
        )}
          </>
        )}

        {/* Weekly conviction note — email capture */}
        <div className="mt-10 rounded-xl border border-[#e6e9ef] bg-white/50 px-5 py-6">
          <p className="text-[#059669] text-xs font-semibold uppercase tracking-widest mb-1.5">Get the weekly conviction note</p>
          <p className="text-[#55606e] text-sm mb-4 max-w-lg">
            The names gaining conviction across these {totalManagers} managers, plus where global money is flowing across world markets, in one email a week from Tony. See it first.
          </p>
          <EmailCapture variant="inline" source="conviction" light />
        </div>

        <p className="text-[#a4adba] text-xs text-center mt-8">
          For informational purposes only. Not investment advice. Conviction is measured from disclosed top holdings — breadth across managers and weight, not performance. Observed since May 2026.
        </p>
      </div>
    </div>
  );
}
