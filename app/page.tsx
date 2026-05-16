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

// Placeholder equity type — will be replaced by scraped data
export type Equity = {
  ticker: string;
  name: string;
  easyScore: number;   // appearances out of 5
  proScore: number;    // avg weight % across ETFs that hold it
  sortRank: number;
};

// Sample Technology data for UI scaffolding (real data comes from scraper)
const SAMPLE_DATA: Record<Sector, Equity[]> = {
  Technology: [
    { ticker: 'NVDA', name: 'NVIDIA',              easyScore: 5, proScore: 16.2, sortRank: 1 },
    { ticker: 'AVGO', name: 'Broadcom',            easyScore: 5, proScore: 6.1,  sortRank: 2 },
    { ticker: 'AMD',  name: 'Advanced Micro Devices', easyScore: 5, proScore: 5.5, sortRank: 3 },
    { ticker: 'INTC', name: 'Intel',               easyScore: 5, proScore: 5.1,  sortRank: 4 },
    { ticker: 'MU',   name: 'Micron Technology',   easyScore: 5, proScore: 5.0,  sortRank: 5 },
    { ticker: 'LRCX', name: 'Lam Research',        easyScore: 5, proScore: 3.1,  sortRank: 6 },
    { ticker: 'AMAT', name: 'Applied Materials',   easyScore: 5, proScore: 2.9,  sortRank: 7 },
    { ticker: 'TXN',  name: 'Texas Instruments',   easyScore: 5, proScore: 2.8,  sortRank: 8 },
    { ticker: 'KLAC', name: 'KLA Corporation',     easyScore: 5, proScore: 2.5,  sortRank: 9 },
    { ticker: 'QCOM', name: 'Qualcomm',            easyScore: 5, proScore: 2.4,  sortRank: 10 },
    { ticker: 'ADI',  name: 'Analog Devices',      easyScore: 5, proScore: 2.3,  sortRank: 11 },
    { ticker: 'SNPS', name: 'Synopsys',            easyScore: 4, proScore: 1.5,  sortRank: 12 },
  ],
  Financials:  [],
  Energy:      [],
  Healthcare:  [],
  Industrials: [],
};

function EasyScoreBadge({ score }: { score: number }) {
  const color = score === 5
    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
    : score === 4
    ? 'bg-sky-500/20 border-sky-500/40 text-sky-300'
    : score === 3
    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
    : 'bg-slate-700 border-slate-600 text-slate-400';
  return (
    <span className={`inline-flex items-center border text-xs font-bold px-2 py-0.5 rounded-full ${color}`}>
      {score}/5
    </span>
  );
}

function EquityTile({ equity, etfs }: { equity: Equity; etfs: string[] }) {
  const [flipped, setFlipped] = useState(false);

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
        {/* Front */}
        <div
          className="rounded-xl border border-slate-700 bg-slate-900 p-4 hover:border-slate-500 transition-colors"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-white font-bold text-lg tracking-tight">{equity.ticker}</p>
              <p className="text-slate-400 text-xs mt-0.5 leading-snug">{equity.name}</p>
            </div>
            <EasyScoreBadge score={equity.easyScore} />
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-end justify-between">
            <div>
              <p className="text-slate-500 text-xs mb-0.5">Pro Score</p>
              <p className="text-emerald-400 font-bold text-xl tabular-nums">{equity.proScore.toFixed(1)}%</p>
            </div>
            <p className="text-slate-600 text-xs">avg weight</p>
          </div>
          <p className="text-slate-700 text-xs mt-3 text-right">tap for details →</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-xl border border-emerald-800 bg-slate-900 p-4"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className="text-emerald-400 font-bold text-sm mb-3">{equity.ticker} — ETF Presence</p>
          <div className="space-y-1.5">
            {etfs.map(etf => {
              const held = equity.easyScore === 5 || (equity.easyScore >= 4 && etf !== 'SMH');
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
          <p className="text-slate-600 text-xs mt-4">tap to flip back</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [sector, setSector] = useState<Sector>('Technology');
  const equities = SAMPLE_DATA[sector];
  const etfs = SECTOR_ETFS[sector];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-start justify-between gap-4">

          {/* Left: logo + badge */}
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

          {/* Right: nav */}
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
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <span className="text-slate-500 text-xs">Easy Score:</span>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold px-2 py-0.5 rounded-full">5/5</span>
                In all ETFs
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                <span className="bg-sky-500/20 border border-sky-500/40 text-sky-300 text-xs font-bold px-2 py-0.5 rounded-full">4/5</span>
                In 4 ETFs
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                <span className="bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold px-2 py-0.5 rounded-full">3/5</span>
                In 3 ETFs
              </span>
              <span className="text-slate-600 text-xs ml-auto">Pro Score = avg weight in holding ETFs</span>
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
