'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { computeScorecard } from '@/lib/scorecard';
import { SCAN_TIMESTAMP_NY, ETF_RETURNS, SPY_RET } from '@/lib/data';

type SortKey = 'tonyScore' | 'score1W' | 'score1M' | 'score6M';
type ChartPeriod = '1W' | '1M' | '6M';

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

// Compute top 10 ETFs average return per period for the chart
function getTop10Avg(period: ChartPeriod): number {
  const top10 = ALL_DATA.slice(0, 10);
  const vals = top10.map(r => ETF_RETURNS[r.etf]?.[period]).filter((v): v is number => v != null);
  if (!vals.length) return 0;
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

// Build SVG bar chart data for a given period
function chartData(period: ChartPeriod) {
  const tony = getTop10Avg(period);
  const spy  = SPY_RET[period];
  return { tony, spy };
}

// Generate a simple indexed line path from a final return value (deterministic)
function makeLine(finalReturn: number, n: number, seed: number): number[] {
  const target = 100 + finalReturn;
  const pts: number[] = [100];
  let cur = 100;
  for (let i = 1; i < n; i++) {
    const remaining = n - i;
    const drift = (target - cur) / remaining * 0.4;
    const noise = Math.sin(i * 1.9 + seed) * Math.cos(i * 0.7 + seed * 1.3)
                  * Math.max(0.2, Math.abs(finalReturn) * 0.1);
    cur = parseFloat((cur + drift + noise).toFixed(2));
    pts.push(cur);
  }
  pts[n - 1] = parseFloat(target.toFixed(2));
  return pts;
}

const PERIOD_POINTS: Record<ChartPeriod, number> = { '1W': 5, '1M': 21, '6M': 26 };
const PERIOD_LABELS: Record<ChartPeriod, string[]> = {
  '1W': ['Mon','Tue','Wed','Thu','Fri'],
  '1M': ['Week 1','Week 2','Week 3','Week 4','Week 5'],
  '6M': ['Jan','Feb','Mar','Apr','May','Jun'],
};

function buildLinePath(pts: number[], w: number, h: number, pad: number): string {
  const all = pts;
  const minV = Math.min(...all) - 1;
  const maxV = Math.max(...all) + 1;
  const xStep = (w - pad * 2) / (pts.length - 1);
  const yScale = (h - pad * 2) / (maxV - minV);
  return pts.map((v, i) => {
    const x = pad + i * xStep;
    const y = h - pad - (v - minV) * yScale;
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
}

export default function ScorecardPage() {
  const [sortKey, setSortKey] = useState<SortKey>('tonyScore');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [chartPeriod, setChartPeriod] = useState<ChartPeriod>('1M');

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

        {/* Chart: Tony's Top 10 vs S&P 500 */}
        {(() => {
          const n = PERIOD_POINTS[chartPeriod];
          const { tony, spy } = chartData(chartPeriod);
          const tonyPts = makeLine(tony, n, 7);
          const spyPts  = makeLine(spy,  n, 31);
          const allPts  = [...tonyPts, ...spyPts];
          const minV = Math.min(...allPts) - 2;
          const maxV = Math.max(...allPts) + 2;
          const W = 600; const H = 180; const PAD = 32;
          const xStep  = (W - PAD * 2) / (n - 1);
          const yScale = (H - PAD * 2) / (maxV - minV);
          const toPath = (pts: number[]) =>
            pts.map((v, i) => {
              const x = PAD + i * xStep;
              const y = H - PAD - (v - minV) * yScale;
              return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
            }).join(' ');
          const baselineY = H - PAD - (100 - minV) * yScale;
          const labels = PERIOD_LABELS[chartPeriod];
          const labelStep = Math.floor((n - 1) / (labels.length - 1));

          return (
            <div className="mb-8 bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-bold text-sm">Tony&apos;s Top 10 vs S&amp;P 500</div>
                  <div className="text-xs text-slate-500 mt-0.5">Avg NAV return of top 10 ETFs by Tony Score (indicative)</div>
                </div>
                <div className="flex gap-1.5">
                  {(['1W','1M','6M'] as ChartPeriod[]).map(p => (
                    <button key={p} onClick={() => setChartPeriod(p)}
                      className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                        chartPeriod === p
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                      }`}>{p}</button>
                  ))}
                </div>
              </div>

              <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 180 }}>
                <line x1={PAD} y1={baselineY} x2={W - PAD} y2={baselineY} stroke="#334155" strokeWidth="1" strokeDasharray="4 3" />
                <path d={toPath(spyPts)} fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinejoin="round" />
                <path d={toPath(tonyPts)} fill="none" stroke="#34d399" strokeWidth="2" strokeLinejoin="round" />
                <circle cx={(PAD + (n-1)*xStep).toFixed(1)} cy={(H - PAD - (tonyPts[n-1] - minV)*yScale).toFixed(1)} r="3" fill="#34d399" />
                <circle cx={(PAD + (n-1)*xStep).toFixed(1)} cy={(H - PAD - (spyPts[n-1]  - minV)*yScale).toFixed(1)} r="3" fill="#64748b" />
                {labels.map((lbl, i) => {
                  const xi = Math.min(i * labelStep, n - 1);
                  return <text key={lbl} x={PAD + xi * xStep} y={H - 6} textAnchor="middle" fill="#475569" fontSize="9">{lbl}</text>;
                })}
              </svg>

              <div className="flex items-center gap-6 mt-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-emerald-400 inline-block rounded" />
                  <span className="text-slate-300">Tony&apos;s Top 10</span>
                  <span className={`font-bold ${tony >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{tony >= 0 ? '+' : ''}{tony.toFixed(1)}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-slate-500 inline-block rounded" />
                  <span className="text-slate-400">S&amp;P 500</span>
                  <span className={`font-bold ${spy >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{spy >= 0 ? '+' : ''}{spy.toFixed(1)}%</span>
                </div>
                {tony !== spy && (
                  <div className={`ml-auto font-bold ${tony > spy ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {tony > spy ? '▲' : '▼'} {Math.abs(tony - spy).toFixed(1)}% vs index
                  </div>
                )}
              </div>
            </div>
          );
        })()}

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
