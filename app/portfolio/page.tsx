'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  buildSleeves, blendPerformance, blendConviction, blendExposure, sleeveBreakdown,
  baseIndexInfo, BASE_CHOICES, PERF_PERIODS,
} from '@/lib/portfolio';
import type { BaseChoiceId } from '@/lib/portfolio';
import { SCAN_TIMESTAMP_NY } from '@/lib/data';
import type { Period } from '@/lib/data';

export default function PortfolioPage() {
  const [baseIndex, setBaseIndex] = useState<BaseChoiceId>('SPY');
  const [vals, setVals] = useState<number[]>(() => buildSleeves().map(s => s.defaultVal));
  const [period, setPeriod] = useState<Period>('1M');
  const [showConvHelp, setShowConvHelp] = useState(false);
  const [showMixTable, setShowMixTable] = useState(false);

  const SLEEVES = useMemo(() => buildSleeves(baseIndex), [baseIndex]);
  const core = baseIndexInfo(baseIndex);

  const total = vals.reduce((a, b) => a + b, 0) || 1;
  const norm = vals.map(v => v / total);

  const conviction = useMemo(() => blendConviction(SLEEVES, norm), [SLEEVES, norm]);
  const coreShare = norm[0] * 100;
  const exposures = useMemo(() => blendExposure(SLEEVES, norm), [SLEEVES, norm]);
  const perf = useMemo(() => blendPerformance(SLEEVES, norm, period), [SLEEVES, norm, period]);
  const mixRows = useMemo(() => sleeveBreakdown(SLEEVES, norm, period), [SLEEVES, norm, period]);
  const maxExp = exposures[0]?.weight ?? 1;

  function setVal(i: number, v: number) {
    setVals(prev => prev.map((x, idx) => (idx === i ? v : x)));
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-slate-400 hover:text-slate-200 text-sm transition-colors">← Top10</Link>
        <div className="text-center">
          <div className="font-bold text-sm">Build with Tony</div>
          <div className="text-xs text-slate-500">Your portfolio, your conviction</div>
        </div>
        <Link href="/conviction" className="text-emerald-400 hover:text-emerald-300 text-xs transition-colors">Conviction Board</Link>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="mb-8 p-6 bg-slate-900 border border-slate-800 rounded-2xl">
          <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-emerald-400 mb-3">Build with Tony</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-50 leading-tight">Your portfolio, your conviction.</h1>
          <p className="text-sm text-slate-400 leading-relaxed mt-4 max-w-2xl">
            Set a cheap index core for market beta, then tilt toward the themes you believe in. Tony reflects back
            the <span className="text-slate-200">conviction</span>, the <span className="text-slate-200">exposure</span>,
            and the <span className="text-slate-200">past performance</span> of whatever you build. You do the choosing.
            This is education, not a recommendation.
          </p>
          <p className="text-sm text-slate-400 leading-relaxed mt-3 max-w-2xl">
            <span className="text-emerald-400 font-semibold">How each theme is built:</span> every theme on the dial is the
            equal-weight average of its <span className="text-slate-200">two strongest ETFs</span>, ranked by a blend of
            <span className="text-slate-200"> 50% 6-month and 50% 1-year</span> return and filtered to be
            <span className="text-slate-200"> non-correlated</span> (the second ETF has to move differently enough from the
            first), so each tilt stays diversified instead of doubling up on the same names. The ticker pair shown next to
            each theme is the live result.
          </p>
          <p className="text-xs text-slate-600 mt-4">Data snapshot: {SCAN_TIMESTAMP_NY}. Illustrative and not investment advice.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          {/* ── Left: sliders ── */}
          <div className="flex-1 min-w-0">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Set your mix</div>
              {SLEEVES.map((s, i) => (
                <div key={s.id} className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-300 flex items-center gap-2">
                      <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ background: s.color }} />
                      {s.name} <span className="text-slate-600 text-xs">{s.etf}</span>
                      {!s.isCore && (
                        <span className="text-[10px] text-emerald-500/80 border border-emerald-500/20 rounded px-1">
                          conv {s.convScore}
                        </span>
                      )}
                    </span>
                    <span className="text-sm font-semibold text-slate-200">{Math.round(norm[i] * 100)}%</span>
                  </div>
                  {s.isCore && (
                    <div className="flex gap-1 mb-2">
                      {BASE_CHOICES.map(({ id, label }) => (
                        <button
                          key={id}
                          onClick={() => setBaseIndex(id)}
                          className={`px-2 py-0.5 rounded text-[11px] font-bold border transition-colors ${
                            baseIndex === id
                              ? 'bg-slate-700 border-slate-600 text-slate-100'
                              : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  )}
                  <input
                    type="range" min={0} max={100} step={1} value={vals[i]}
                    onChange={e => setVal(i, +e.target.value)}
                    className="w-full" style={{ accentColor: s.color }}
                  />
                </div>
              ))}
              <div className="flex justify-between text-xs mt-3 pt-3 border-t border-slate-800">
                <span className="text-slate-500">Total allocated</span>
                <span className="font-semibold text-emerald-400">
                  {vals.some(v => v > 0) ? 100 : 0}%
                </span>
              </div>
            </div>

            {/* Index core holdings + base-index selector */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mt-4">
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Inside your index core
                </div>
                <span className="text-[11px] text-slate-500">{core.label} · {core.name}</span>
              </div>
              <p className="text-[11px] text-slate-500 mb-3">
                Top 5 holdings of your ballast leg. {core.name} weights — your cheap beta.
              </p>
              <div className="flex flex-col gap-2">
                {core.holdings.map(h => (
                  <div key={h.t} className="flex items-center gap-3">
                    <div className="w-12 text-xs font-semibold text-slate-300 shrink-0">{h.t}</div>
                    <div className="flex-1 bg-slate-800 rounded h-3">
                      <div className="h-full rounded bg-slate-500" style={{ width: `${(h.w / core.holdings[0].w) * 100}%` }} />
                    </div>
                    <div className="w-12 text-right text-[11px] text-slate-400">{h.w.toFixed(1)}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: read-outs ── */}
          <div className="flex-1 min-w-0">
            {/* Mix bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[11px] text-slate-500">Your mix</div>
                <button
                  onClick={() => setShowMixTable(v => !v)}
                  className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  {showMixTable ? 'Hide breakdown' : 'View breakdown'}
                </button>
              </div>
              <div className="flex h-5 w-full rounded-md overflow-hidden bg-slate-800">
                {SLEEVES.map((s, i) => norm[i] > 0 && (
                  <div key={s.id} style={{ width: `${(norm[i] * 100).toFixed(1)}%`, background: s.color }} />
                ))}
              </div>
              <div className="flex flex-wrap gap-x-3.5 gap-y-2 mt-3">
                {SLEEVES.map((s, i) => norm[i] > 0 && (
                  <span key={s.id} className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-sm" style={{ background: s.color }} />
                    {s.etf} {Math.round(norm[i] * 100)}%
                  </span>
                ))}
              </div>

              {/* Detailed per-ETF breakdown — user feedback #3 */}
              {showMixTable && (
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-slate-300">Breakdown by sleeve</span>
                    <span className="text-[10px] text-slate-500">Performance over {period}</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-[10px] uppercase tracking-wider text-slate-600">
                          <th className="font-semibold py-1 pr-2">Sleeve</th>
                          <th className="font-semibold py-1 pr-2">ETF</th>
                          <th className="font-semibold py-1 pr-2 text-right">Weight</th>
                          <th className="font-semibold py-1 text-right">{period} return</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mixRows.map((r, i) => norm[i] > 0 && (
                          <tr key={r.id} className="border-t border-slate-800/60">
                            <td className="py-1.5 pr-2">
                              <span className="flex items-center gap-1.5 text-xs text-slate-300">
                                <span className="inline-block w-2 h-2 rounded-sm" style={{ background: SLEEVES[i].color }} />
                                {r.name}
                              </span>
                            </td>
                            <td className="py-1.5 pr-2 text-xs text-slate-400 font-mono">{r.etf}</td>
                            <td className="py-1.5 pr-2 text-xs text-slate-200 text-right tabular-nums">{Math.round(r.weight * 100)}%</td>
                            <td className={`py-1.5 text-xs font-semibold text-right tabular-nums ${
                              r.isCore ? 'text-slate-400' : r.ret >= 0 ? 'text-emerald-400' : 'text-red-400'
                            }`}>
                              {r.ret >= 0 ? '+' : ''}{r.ret.toFixed(1)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[10px] text-slate-600 mt-2 leading-relaxed">
                    ETF shows each theme&apos;s suggested ticker (the equal-weight pair of its two strongest non-correlated ETFs).
                    Return is the past performance of that sleeve&apos;s real index over {period}. Past performance does not predict future results.
                  </p>
                </div>
              )}
            </div>

            {/* Conviction + core dials */}
            <div className="flex gap-3 mb-4">
              <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-4">
                <button
                  onClick={() => setShowConvHelp(v => !v)}
                  className="text-[11px] text-slate-500 flex items-center gap-1 hover:text-slate-300"
                >
                  Conviction score
                  <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-slate-600 text-[9px] leading-none">?</span>
                </button>
                <div className="text-2xl font-semibold text-emerald-400">{Math.round(conviction)}</div>
                <div className="h-1.5 bg-slate-800 rounded mt-1.5">
                  <div className="h-full bg-emerald-500 rounded" style={{ width: `${Math.round(conviction)}%` }} />
                </div>
              </div>
              <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-4">
                <div className="text-[11px] text-slate-500">Index core (ballast)</div>
                <div className="text-2xl font-semibold text-slate-200">{Math.round(coreShare)}%</div>
                <div className="h-1.5 bg-slate-800 rounded mt-1.5">
                  <div className="h-full bg-slate-500 rounded" style={{ width: `${Math.round(coreShare)}%` }} />
                </div>
              </div>
            </div>

            {/* Conviction explainer — Shuki #2 */}
            {showConvHelp && (
              <div className="bg-slate-900/80 border border-emerald-500/20 rounded-xl p-4 mb-4 text-xs text-slate-400 leading-relaxed space-y-2">
                <div className="text-emerald-400 font-semibold">How the conviction score is calculated</div>
                <p>
                  Conviction measures how strongly active fund managers back a theme. For each theme we look at its
                  top 5 consensus stocks and ask two things: the <span className="text-slate-200">average weight</span> the
                  theme&apos;s ETFs give a stock, and its <span className="text-slate-200">coverage</span> (how many of those
                  ETFs actually hold it). We multiply the two, so a stock held heavily by most managers scores far higher
                  than one held lightly by a few.
                </p>
                <p className="text-slate-300">
                  Example: if NVDA gets an <span className="text-slate-100">average weight of 8%</span> across the AI ETFs and
                  <span className="text-slate-100"> 9 of 10</span> of them hold it (90% coverage), its signal is
                  8 × 0.9 = <span className="text-emerald-300 font-semibold">7.2</span>. A stock at 3% weight held by only
                  4 of 10 scores 3 × 0.4 = 1.2, much lower.
                </p>
                <p>
                  We average that signal across the five names, then index every theme from 0 to 100 against the strongest
                  theme. Your portfolio score is the allocation-weighted blend of the themes you picked. The index core is
                  pure passive beta, so it scores <span className="text-slate-200">0</span> by design. Conviction is what you
                  pay active managers for.
                </p>
              </div>
            )}

            {/* Performance vs SPY — Shuki #1 */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[11px] text-slate-500">Past performance of your mix</div>
                <div className="flex gap-1">
                  {PERF_PERIODS.map(p => (
                    <button
                      key={p}
                      onClick={() => setPeriod(p)}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold border transition-colors ${
                        period === p
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <PerfChart perf={perf} />

              <div className="flex justify-between mt-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-0.5 bg-emerald-400" />
                  <span className="text-slate-400">Your mix</span>
                  <span className={`font-semibold ${perf.portfolioReturn >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {perf.portfolioReturn >= 0 ? '+' : ''}{perf.portfolioReturn.toFixed(1)}%
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-0.5 bg-slate-500" />
                  <span className="text-slate-400">S&P 500</span>
                  <span className={`font-semibold ${perf.spyReturn >= 0 ? 'text-slate-300' : 'text-red-400'}`}>
                    {perf.spyReturn >= 0 ? '+' : ''}{perf.spyReturn.toFixed(1)}%
                  </span>
                </span>
              </div>
              <p className="text-[10px] text-slate-600 mt-2">
                Hypothetical past performance of this exact mix, blended from each theme's real index. Past performance does not predict future results.
              </p>
            </div>

            {/* Exposures */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-[11px] text-slate-500 mb-3">Your biggest single-stock exposures</div>
              <div className="flex flex-col gap-2">
                {exposures.length ? exposures.map(e => (
                  <div key={e.ticker} className="flex items-center gap-3">
                    <div className="w-12 text-xs font-semibold text-slate-300 shrink-0">{e.ticker}</div>
                    <div className="flex-1 bg-slate-800 rounded h-3">
                      <div className="h-full rounded bg-emerald-500" style={{ width: `${(e.weight / maxExp) * 100}%` }} />
                    </div>
                    <div className="w-12 text-right text-[11px] text-slate-400">{(e.weight * 100).toFixed(1)}%</div>
                  </div>
                )) : <div className="text-xs text-slate-600">Add some allocation to see exposures.</div>}
              </div>
              <p className="text-[10px] text-slate-600 mt-3 leading-relaxed">
                Each percentage is the stock&apos;s share of your whole portfolio. For every theme we take your weight in that theme
                and multiply it by how heavily the theme&apos;s ETFs hold the stock, then add up the same stock across themes.
              </p>
            </div>
          </div>
        </div>

        <p className="text-slate-700 text-xs text-center mt-8 max-w-2xl mx-auto">
          For informational and educational purposes only. Not investment advice and not personalised. The portfolio is one you
          build yourself; Tony only reflects back its conviction, exposure, and hypothetical past performance from disclosed ETF data.
        </p>
      </div>
    </div>
  );
}

// ── Inline two-line performance chart ───────────────────────────────────────
function PerfChart({ perf }: { perf: ReturnType<typeof blendPerformance> }) {
  const W = 480, H = 150, PAD = 6;
  const all = [...perf.portfolio, ...perf.spy];
  const min = Math.min(...all), max = Math.max(...all);
  const range = max - min || 1;
  const n = perf.portfolio.length;

  const toPath = (series: number[]) =>
    series.map((v, i) => {
      const x = PAD + (i / (n - 1)) * (W - 2 * PAD);
      const y = PAD + (1 - (v - min) / range) * (H - 2 * PAD);
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none" style={{ height: 150 }}>
      <path d={toPath(perf.spy)} fill="none" stroke="#64748b" strokeWidth={1.5} />
      <path d={toPath(perf.portfolio)} fill="none" stroke="#34d399" strokeWidth={2} />
    </svg>
  );
}
