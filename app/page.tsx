'use client';

import { useState } from 'react';
import Link from 'next/link';

type Sector = 'Technology' | 'Financials' | 'Energy' | 'Healthcare' | 'Industrials';

const SECTORS: Sector[] = ['Technology', 'Financials', 'Energy', 'Healthcare', 'Industrials'];

const SECTOR_ETFS: Record<Sector, string[]> = {
  Technology:  ['XLK', 'VGT', 'QQQ', 'IYW', 'SMH'],
  Financials:  ['XLF', 'VFH', 'KBWB', 'IYF', 'FNCL'],
  Energy:      ['XLE', 'VDE', 'FENY', 'IYE', 'OIH'],
  Healthcare:  ['XLV', 'VHT', 'RSPH', 'IYH', 'FHLC'],
  Industrials: ['XLI', 'VIS', 'PAVE', 'IYJ', 'FIDU'],
};

export type Equity = {
  ticker: string;
  name: string;
  easyScore: number;      // appearances out of 5
  proScore: number;       // avg weight % across ETFs that hold it
  price: number;          // current price in USD
  weeklyPrices: number[]; // 5 data points Mon-Fri
  weeklyChange: number;   // % change over the week
  sortRank: number;
};

// Sample Technology data — real data replaces this once scraper is live
const SAMPLE_DATA: Record<Sector, Equity[]> = {
  Technology: [
    { ticker: 'NVDA', name: 'NVIDIA Corporation',       easyScore: 5, proScore: 16.2, price: 131.40, weeklyPrices: [124.8, 126.5, 129.2, 130.8, 131.4], weeklyChange: 5.3,  sortRank: 1 },
    { ticker: 'AVGO', name: 'Broadcom Inc.',            easyScore: 5, proScore: 6.1,  price: 212.60, weeklyPrices: [208.0, 209.5, 210.8, 211.9, 212.6], weeklyChange: 2.2,  sortRank: 2 },
    { ticker: 'AMD',  name: 'Advanced Micro Devices',   easyScore: 5, proScore: 5.5,  price: 114.80, weeklyPrices: [116.2, 115.8, 114.5, 114.1, 114.8], weeklyChange: -1.2, sortRank: 3 },
    { ticker: 'INTC', name: 'Intel Corporation',        easyScore: 5, proScore: 5.1,  price: 25.90,  weeklyPrices: [27.1, 26.8, 26.4, 26.0, 25.9],   weeklyChange: -4.4, sortRank: 4 },
    { ticker: 'MU',   name: 'Micron Technology',        easyScore: 5, proScore: 5.0,  price: 129.70, weeklyPrices: [126.4, 127.8, 128.5, 129.2, 129.7], weeklyChange: 2.6,  sortRank: 5 },
    { ticker: 'LRCX', name: 'Lam Research Corporation', easyScore: 5, proScore: 3.1,  price: 89.30,  weeklyPrices: [87.2, 88.0, 88.7, 89.0, 89.3],   weeklyChange: 2.4,  sortRank: 6 },
    { ticker: 'AMAT', name: 'Applied Materials',        easyScore: 5, proScore: 2.9,  price: 176.50, weeklyPrices: [173.0, 174.2, 175.0, 175.9, 176.5], weeklyChange: 2.0,  sortRank: 7 },
    { ticker: 'TXN',  name: 'Texas Instruments',        easyScore: 5, proScore: 2.8,  price: 191.20, weeklyPrices: [188.5, 189.4, 190.1, 190.8, 191.2], weeklyChange: 1.4,  sortRank: 8 },
    { ticker: 'KLAC', name: 'KLA Corporation',          easyScore: 5, proScore: 2.5,  price: 703.80, weeklyPrices: [694.0, 697.5, 700.2, 702.1, 703.8], weeklyChange: 1.4,  sortRank: 9 },
    { ticker: 'QCOM', name: 'Qualcomm Inc.',            easyScore: 5, proScore: 2.4,  price: 164.90, weeklyPrices: [161.2, 162.5, 163.4, 164.2, 164.9], weeklyChange: 2.3,  sortRank: 10 },
    { ticker: 'ADI',  name: 'Analog Devices',           easyScore: 5, proScore: 2.3,  price: 224.30, weeklyPrices: [221.0, 222.1, 223.0, 223.8, 224.3], weeklyChange: 1.5,  sortRank: 11 },
    { ticker: 'SNPS', name: 'Synopsys Inc.',            easyScore: 4, proScore: 1.5,  price: 511.60, weeklyPrices: [507.0, 508.5, 509.8, 510.9, 511.6], weeklyChange: 0.9,  sortRank: 12 },
  ],
  Financials:  [],
  Energy:      [],
  Healthcare:  [],
  Industrials: [],
};

// ── Sparkline chart ───────────────────────────────────────────────────────────
function SparklineChart({ prices, positive }: { prices: number[]; positive: boolean }) {
  if (!prices || prices.length < 2) return null;

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const W = 100;
  const H = 36;
  const pad = 2;

  const pts = prices.map((p, i) => ({
    x: pad + (i / (prices.length - 1)) * (W - pad * 2),
    y: H - pad - ((p - min) / range) * (H - pad * 2),
  }));

  const polylinePoints = pts.map(p => `${p.x},${p.y}`).join(' ');

  // Closed area path
  const areaD = [
    `M ${pts[0].x} ${H - pad}`,
    ...pts.map(p => `L ${p.x} ${p.y}`),
    `L ${pts[pts.length - 1].x} ${H - pad}`,
    'Z',
  ].join(' ');

  const stroke = positive ? '#34d399' : '#f87171';  // emerald-400 / red-400
  const fill   = positive ? '#34d39918' : '#f8717118';

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      style={{ height: '36px' }}
      preserveAspectRatio="none"
    >
      <path d={areaD} fill={fill} />
      <polyline
        points={polylinePoints}
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Current price dot */}
      <circle
        cx={pts[pts.length - 1].x}
        cy={pts[pts.length - 1].y}
        r="2.5"
        fill={stroke}
      />
    </svg>
  );
}

// ── Easy score badge ──────────────────────────────────────────────────────────
function EasyScoreBadge({ score }: { score: number }) {
  const color = score === 5
    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
    : score === 4
    ? 'bg-sky-500/20 border-sky-500/40 text-sky-300'
    : score === 3
    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
    : 'bg-slate-700 border-slate-600 text-slate-400';
  return (
    <span className={`inline-flex items-center border text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${color}`}>
      {score}/5
    </span>
  );
}

// ── Equity tile ───────────────────────────────────────────────────────────────
function EquityTile({ equity, etfs }: { equity: Equity; etfs: string[] }) {
  const [flipped, setFlipped] = useState(false);
  const positive = equity.weeklyChange >= 0;
  const changeColor = positive ? 'text-emerald-400' : 'text-rose-400';
  const changeSign  = positive ? '+' : '';

  return (
    <div
      className="relative cursor-pointer"
      style={{ perspective: '1000px' }}
      onClick={() => setFlipped(f => !f)}
    >
      <div
        className="relative w-full transition-transform duration-500"
        style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >

        {/* ── FRONT ── */}
        <div
          className="rounded-xl border border-slate-700 bg-slate-900 p-4 hover:border-slate-500 transition-colors"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Top row: name + easy score */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="min-w-0">
              <p className="text-white font-bold text-base leading-tight truncate">{equity.name}</p>
              <p className="text-slate-500 text-xs font-mono mt-0.5">{equity.ticker}</p>
            </div>
            <EasyScoreBadge score={equity.easyScore} />
          </div>

          {/* Weekly chart */}
          <div className="my-3 -mx-1">
            <SparklineChart prices={equity.weeklyPrices} positive={positive} />
          </div>

          {/* Price row */}
          <div className="flex items-baseline justify-between">
            <p className="text-white font-bold text-lg tabular-nums">
              ${equity.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <span className={`text-xs font-semibold tabular-nums ${changeColor}`}>
              {changeSign}{equity.weeklyChange.toFixed(1)}% wk
            </span>
          </div>

          {/* Scores row */}
          <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-xs leading-none mb-0.5">Pro Score</p>
              <p className="text-emerald-400 font-bold text-base tabular-nums">{equity.proScore.toFixed(1)}%</p>
            </div>
            <p className="text-slate-700 text-xs">tap for detail →</p>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-xl border border-emerald-800 bg-slate-900 p-4"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className="text-emerald-400 font-bold text-sm mb-1">{equity.ticker}</p>
          <p className="text-slate-400 text-xs mb-4 truncate">{equity.name}</p>
          <div className="space-y-2">
            {etfs.map(etf => {
              const held = equity.easyScore === 5 || (equity.easyScore >= 4 && etf !== etfs[etfs.length - 1]);
              return (
                <div key={etf} className="flex items-center justify-between">
                  <span className="text-slate-300 text-xs font-mono">{etf}</span>
                  <span className={`text-xs font-semibold ${held ? 'text-emerald-400' : 'text-slate-600'}`}>
                    {held ? '✓ held' : '— not held'}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between">
            <div>
              <p className="text-slate-500 text-xs">Easy Score</p>
              <p className="text-white font-bold text-sm">{equity.easyScore}/5</p>
            </div>
            <div className="text-right">
              <p className="text-slate-500 text-xs">Pro Score</p>
              <p className="text-emerald-400 font-bold text-sm">{equity.proScore.toFixed(1)}%</p>
            </div>
          </div>
          <p className="text-slate-600 text-xs mt-3 text-right">tap to flip back</p>
        </div>

      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [sector, setSector] = useState<Sector>('Technology');
  const equities = SAMPLE_DATA[sector];
  const etfs = SECTOR_ETFS[sector];

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
            <nav className="flex sm:hidden items-center gap-4 text-sm pr-0.5">
              <Link href="/" className="text-emerald-400 font-medium">Dashboard</Link>
              <Link href="/about" className="text-slate-400 hover:text-white transition-colors">About</Link>
            </nav>
            <nav className="hidden sm:flex items-center gap-4 text-sm">
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

      {/* ETF badges */}
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
            {/* Legend */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
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
