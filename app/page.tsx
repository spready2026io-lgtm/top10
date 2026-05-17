'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Sector,
  Equity,
  SECTORS,
  SECTOR_ETFS,
  SECTOR_BENCHMARKS,
  SECTOR_BENCHMARK_ETF,
  SAMPLE_DATA,
} from '@/lib/data';

// ── Mini chart (price chart with axes) ────────────────────────────────────────
function MiniChart({ prices, positive }: { prices: number[]; positive: boolean }) {
  if (!prices || prices.length < 2) return null;

  const VW = 280; const VH = 175;
  const padL = 46; const padR = 4; const padT = 8; const padB = 22;
  const chartW = VW - padL - padR;
  const chartH = VH - padT - padB;

  const rawMin = Math.min(...prices);
  const rawMax = Math.max(...prices);
  const rawRange = rawMax - rawMin || rawMin * 0.02 || 1;
  const yMin = rawMin - rawRange * 0.15;
  const yMax = rawMax + rawRange * 0.15;
  const yRange = yMax - yMin;

  const toX = (i: number) => padL + (i / (prices.length - 1)) * chartW;
  const toY = (p: number) => padT + chartH - ((p - yMin) / yRange) * chartH;

  const pts = prices.map((p, i) => ({ x: toX(i), y: toY(p) }));
  const linePath = pts.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`).join(' ');
  const areaPath = `${linePath} L ${pts[pts.length - 1].x.toFixed(1)} ${(padT + chartH).toFixed(1)} L ${pts[0].x.toFixed(1)} ${(padT + chartH).toFixed(1)} Z`;

  const color     = positive ? '#34d399' : '#f87171';
  const fillColor = positive ? 'rgba(52,211,153,0.12)' : 'rgba(248,113,113,0.12)';

  const yTicks = [yMin + yRange * 0.1, yMin + yRange * 0.5, yMin + yRange * 0.9];
  const fmtPrice = (v: number) =>
    v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v >= 100 ? v.toFixed(0) : v.toFixed(1);
  const xLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" height={VH} style={{ display: 'block' }}>
      {yTicks.map((tick, i) => (
        <line key={i} x1={padL} y1={toY(tick)} x2={VW - padR} y2={toY(tick)}
          stroke="#1e293b" strokeWidth="1" />
      ))}
      <line x1={padL} y1={padT} x2={padL} y2={padT + chartH} stroke="#334155" strokeWidth="1" />
      <line x1={padL} y1={padT + chartH} x2={VW - padR} y2={padT + chartH} stroke="#334155" strokeWidth="1" />
      {yTicks.map((tick, i) => (
        <text key={i} x={padL - 5} y={toY(tick) + 3.5} textAnchor="end" fontSize="9" fill="#64748b">
          {fmtPrice(tick)}
        </text>
      ))}
      {xLabels.map((label, i) => (
        <text key={i} x={toX(i)} y={padT + chartH + 14} textAnchor="middle" fontSize="9" fill="#64748b">
          {label}
        </text>
      ))}
      <path d={areaPath} fill={fillColor} />
      <path d={linePath} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="3" fill={color} />
    </svg>
  );
}

// ── Index validation strip ────────────────────────────────────────────────────
function ValidationStrip({ equities, sector }: { equities: Equity[]; sector: Sector }) {
  if (equities.length === 0) return null;
  const portfolioReturn = equities.reduce((sum, e) => sum + e.weeklyChange, 0) / equities.length;
  const benchmark       = SECTOR_BENCHMARKS[sector];
  const benchmarkLabel  = SECTOR_BENCHMARK_ETF[sector];
  const delta           = portfolioReturn - benchmark;
  const portPositive    = portfolioReturn >= 0;
  const deltaPositive   = delta >= 0;

  return (
    <div className="flex items-center gap-x-3 gap-y-1 px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 mb-6 text-xs flex-wrap">
      <span className="text-slate-500 font-medium">Model vs index:</span>
      <span className="text-slate-400">
        Top{equities.length} avg
        <span className={`ml-1.5 font-bold tabular-nums ${portPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
          {portPositive ? '+' : ''}{portfolioReturn.toFixed(2)}%
        </span>
      </span>
      <span className="text-slate-700 hidden sm:inline">|</span>
      <span className="text-slate-400">
        {benchmarkLabel}
        <span className={`ml-1.5 font-semibold tabular-nums ${benchmark >= 0 ? 'text-slate-300' : 'text-rose-300'}`}>
          {benchmark >= 0 ? '+' : ''}{benchmark.toFixed(1)}%
        </span>
      </span>
      <span className="text-slate-700 hidden sm:inline">|</span>
      <span className={`font-bold tabular-nums ${deltaPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
        {deltaPositive ? '▲' : '▼'} {Math.abs(delta).toFixed(2)}% vs index this week
      </span>
    </div>
  );
}

// ── Easy score badge ──────────────────────────────────────────────────────────
function EasyScoreBadge({ score }: { score: number }) {
  const color = score === 5 ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              : score === 4 ? 'bg-sky-500/20 border-sky-500/40 text-sky-300'
              : score === 3 ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
              : 'bg-slate-700 border-slate-600 text-slate-400';
  return (
    <span className={`inline-flex items-center border text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${color}`}>
      {score}/5
    </span>
  );
}

// ── Stat cell ─────────────────────────────────────────────────────────────────
function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="bg-slate-800/60 rounded-lg px-2 py-1.5">
      <p className="text-slate-500 text-xs leading-none mb-0.5">{label}</p>
      <p className={`text-xs font-bold tabular-nums leading-none ${highlight ? 'text-emerald-400' : 'text-slate-200'}`}>{value}</p>
    </div>
  );
}

// ── Equity tile ───────────────────────────────────────────────────────────────
function EquityTile({ equity, etfs }: { equity: Equity; etfs: string[] }) {
  const [flipped, setFlipped] = useState(false);
  const positive    = equity.weeklyChange >= 0;
  const changeColor = positive ? 'text-emerald-400' : 'text-rose-400';
  const changeSign  = positive ? '+' : '';

  const peStr  = equity.pe !== null ? `${equity.pe}x` : 'N/A';
  const divStr = equity.dividendYield !== null ? `${equity.dividendYield.toFixed(1)}%` : 'None';
  const revStr = `${equity.revenueGrowth > 0 ? '+' : ''}${equity.revenueGrowth}%`;

  return (
    <div
      className="relative cursor-pointer"
      style={{ perspective: '1000px', height: '380px' }}
      onClick={() => setFlipped(f => !f)}
    >
      <div
        className="absolute inset-0 transition-transform duration-500"
        style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >

        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-xl border border-slate-700 bg-slate-900 p-4 hover:border-slate-500 transition-colors flex flex-col"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Name + badge */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-white font-bold text-sm leading-tight">{equity.name}</p>
              <p className="text-slate-500 text-xs font-mono mt-0.5">{equity.ticker}</p>
            </div>
            <EasyScoreBadge score={equity.easyScore} />
          </div>

          {/* Price + weekly change */}
          <div className="flex items-baseline justify-between flex-shrink-0 mt-3">
            <p className="text-white font-bold text-xl tabular-nums">
              ${equity.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <span className={`text-xs font-semibold tabular-nums ${changeColor}`}>
              {changeSign}{equity.weeklyChange.toFixed(1)}% wk
            </span>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-800 my-3 flex-shrink-0" />

          {/* Scores */}
          <div className="flex items-center justify-between flex-shrink-0">
            <div>
              <p className="text-slate-500 text-xs leading-none mb-0.5">Easy Score</p>
              <p className="text-white font-bold text-sm">{equity.easyScore}/5</p>
            </div>
            <div className="text-right">
              <p className="text-slate-500 text-xs leading-none mb-0.5">Pro Score</p>
              <p className="text-emerald-400 font-bold text-sm tabular-nums">{equity.proScore.toFixed(1)}% avg wt</p>
            </div>
          </div>

          {/* Chart */}
          <div className="mt-auto -mx-1">
            <MiniChart prices={equity.weeklyPrices} positive={positive} />
          </div>

          <p className="text-slate-700 text-xs pt-2 text-right">flip for detail →</p>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-xl border border-emerald-900 bg-slate-900 p-4 flex flex-col gap-3"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between flex-shrink-0">
            <div>
              <p className="text-white font-bold text-sm">{equity.ticker}</p>
              <p className="text-slate-500 text-xs truncate">{equity.name}</p>
            </div>
            <EasyScoreBadge score={equity.easyScore} />
          </div>

          {/* ETF presence */}
          <div className="flex-shrink-0">
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1.5">ETF Presence</p>
            <div className="flex flex-wrap gap-1">
              {etfs.map(etf => {
                const held = equity.etfPresence[etf];
                return (
                  <span
                    key={etf}
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full border ${
                      held
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                        : 'bg-slate-800 border-slate-700 text-slate-600 line-through'
                    }`}
                  >
                    {etf}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Financials grid */}
          <div className="flex-shrink-0">
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1.5">Key Financials</p>
            <div className="grid grid-cols-3 gap-1">
              <Stat label="Mkt Cap"    value={equity.marketCap} />
              <Stat label="P/E"        value={peStr} />
              <Stat label="Rev Growth" value={revStr} highlight={equity.revenueGrowth > 15} />
              <Stat label="EPS"        value={`$${equity.eps.toFixed(2)}`} />
              <Stat label="Grs Margin" value={`${equity.grossMargin}%`} highlight={equity.grossMargin > 55} />
              <Stat label="Dividend"   value={divStr} />
            </div>
          </div>

          {/* Tony's note */}
          <div className="flex-1 min-h-0 flex flex-col">
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1.5 flex-shrink-0">
              Tony&apos;s Analysis
            </p>
            <div className="flex-1 overflow-y-auto rounded-lg bg-slate-800/40 px-2.5 py-2 scrollbar-thin scrollbar-thumb-slate-700">
              <p className="text-slate-300 text-xs leading-relaxed">{equity.tonyNote}</p>
            </div>
          </div>

          <p className="text-slate-700 text-xs text-right flex-shrink-0">flip back →</p>
        </div>

      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [sector, setSector] = useState<Sector>('Technology');
  const equities = SAMPLE_DATA[sector];
  const etfs     = SECTOR_ETFS[sector];

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-start justify-between gap-4">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold tracking-tight">
              <span className="text-emerald-400">Top</span>10
            </h1>
            <div className="mt-1.5">
              <span className="inline-flex items-center whitespace-nowrap bg-emerald-400/10 border border-emerald-400/25 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full tracking-wide">
                ETF Holdings Analyser
              </span>
            </div>
          </div>
          <div className="flex-shrink-0 flex flex-col items-end gap-3">
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/" className="text-emerald-400 font-medium">Dashboard</Link>
              <Link href="/about" className="text-slate-400 hover:text-white transition-colors">About</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Sector tabs */}
      <div className="border-b border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none">
            {SECTORS.map(s => (
              <button
                key={s}
                onClick={() => setSector(s)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  sector === s
                    ? 'bg-emerald-500 text-black'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ETF badges row */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-slate-500 text-xs">Tracking:</span>
          {etfs.map(etf => (
            <span key={etf} className="bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full">
              {etf}
            </span>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {equities.length > 0 ? (
          <>
            {/* Legend + score explanation */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="text-slate-500 text-xs">Easy Score:</span>
              {[
                { score: '5/5', color: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300', label: 'All 5 ETFs' },
                { score: '4/5', color: 'bg-sky-500/20 border-sky-500/40 text-sky-300',           label: '4 ETFs' },
                { score: '3/5', color: 'bg-amber-500/20 border-amber-500/40 text-amber-300',     label: '3 ETFs' },
              ].map(({ score, color, label }) => (
                <span key={score} className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                  <span className={`border text-xs font-bold px-2 py-0.5 rounded-full ${color}`}>{score}</span>
                  {label}
                </span>
              ))}
              <span className="text-slate-600 text-xs ml-auto hidden sm:block">Pro Score = avg weight in holding ETFs</span>
            </div>

            {/* Index validation strip */}
            <ValidationStrip equities={equities} sector={sector} />

            {/* Tile grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {equities.map(eq => (
                <EquityTile key={eq.ticker} equity={eq} etfs={etfs} />
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-12 text-center">
            <p className="text-slate-400 text-sm">Data coming soon for {sector} sector.</p>
            <p className="text-slate-600 text-xs mt-2">Scraper launching shortly.</p>
          </div>
        )}
      </div>

    </main>
  );
}
