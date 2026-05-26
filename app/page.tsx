'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import {
  Theme,
  Equity,
  Period,
  ChartPeriodData,
  THEMES,
  THEME_ETFS,
  THEME_BENCHMARKS,
  THEME_BENCHMARK_ETF,
  THEME_ETF_COUNT,
  ETF_RETURNS,
  SPY_RET,
  SAMPLE_DATA,
  INDEX_CHART_DATA,
  SCAN_TIMESTAMP_NY,
} from '@/lib/data';

// ── Ticker → domain map for Google favicon logos ─────────────────────────────
const TICKER_DOMAINS: Record<string, string> = {
  // Semiconductors & chip design
  NVDA: 'nvidia.com',    AVGO: 'broadcom.com',       AMD:  'amd.com',
  INTC: 'intel.com',     MU:   'micron.com',          TXN:  'ti.com',
  ADI:  'analog.com',    MCHP: 'microchip.com',       ON:   'onsemi.com',
  MPWR: 'monolithicpower.com', MTSI: 'macom.com',     SWKS: 'skyworks.com',
  MXL:  'maxlinear.com', LRCX: 'lamresearch.com',     AMAT: 'appliedmaterials.com',
  KLAC: 'kla.com',       QCOM: 'qualcomm.com',        SNPS: 'synopsys.com',
  // AI & Cloud infrastructure
  CRWV: 'coreweave.com', ALAB: 'asteralabs.com',      ANET: 'arista.com',
  PLTR: 'palantir.com',  CRDO: 'credotech.com',       CLS:  'celestica.com',
  // Mega-cap tech
  GOOGL: 'google.com',   MSFT: 'microsoft.com',       AAPL: 'apple.com',
  AMZN: 'amazon.com',    META: 'meta.com',             TSLA: 'tesla.com',
  // Storage & memory
  WDC:  'westerndigital.com', STX: 'seagate.com',
  // Electrification & energy
  POWL: 'powellind.com', PWR:  'quantaservices.com',  BELFB: 'belfuse.com',
  BE:   'bloomenergy.com', HUBB: 'hubbell.com',        AEIS: 'advanced-energy.com',
  SEDG: 'solaredge.com', ENPH: 'enphase.com',         ITRI: 'itron.com',
  ETN:  'eaton.com',     GEV:  'gevernova.com',        NEE:  'nexteraenergy.com',
  // Industrials & construction
  STRL: 'sterlinginfrastructure.com', FIX: 'comfortsystemsusa.com',
  AGX:  'argan.com',     MTZ:  'mastec.com',           DY:   'dycomind.com',
  CLH:  'cleanharbors.com', GVA: 'graniteconstruction.com', R: 'ryder.com',
  ECG:  'everus.com',    SPXC: 'spx.com',             KRMN: 'karman.space',
  // Additional tech & cloud
  DELL: 'dell.com',     AKAM: 'akamai.com',           HPE:  'hpe.com',
  GOOG: 'google.com',   SNDK: 'sandisk.com',           MRVL: 'marvell.com',
  RKLB: 'rocketlabusa.com', SATS: 'echostar.com',     ARM:  'arm.com',
  OHB:  'ohb.de',       PL:   'planet.com',            VICR: 'vicr.com',
  // Energy & utilities
  OGE:  'oge.com',      ET:   'energytransfer.com',   ETR:  'entergy.com',
  VRT:  'vertiv.com',   NVT:  'nvent.com',
  // Industrial services
  TTMI: 'ttm.com',      EME:  'emcorgroup.com',       SAIA: 'saia.com',
  CHRW: 'chrobinson.com', JBL: 'jabil.com',
  // Legacy map entries (kept for any residual references)
  GE:   'ge.com',        RTX:  'rtx.com',             HON:  'honeywell.com',
  CAT:  'caterpillar.com', DE:  'deere.com',           LMT:  'lockheedmartin.com',
  UPS:  'ups.com',       NOC:  'northropgrumman.com',  EMR:  'emerson.com',
};

// ── Per-tile x-axis labels per period ─────────────────────────────────────────
const TILE_XLABELS: Record<Period, string[]> = {
  '1W': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  '1M': ['May 1', 'May 15', 'Jun 1'],
  '6M': ['Nov', 'Jan', 'Mar', 'May'],
  '1Y': ["May '25", "Nov '25", "May '26"],
};

// ── Generate deterministic price path for a tile chart ───────────────────────
function makeTilePrices(ticker: string, currentPrice: number, periodReturn: number, period: Period): number[] {
  const seed = ticker.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const nMap:  Record<Period, number> = { '1W': 5, '1M': 21, '6M': 26, '1Y': 52 };
  const n          = nMap[period];
  const startPrice = currentPrice / (1 + periodReturn / 100);
  const pts: number[] = [startPrice];
  let cur = startPrice;
  for (let i = 1; i < n; i++) {
    const remaining = n - i;
    const drift = (currentPrice - cur) / remaining * 0.38;
    const decay = 1 - (i / n) * 0.55;
    const noise = (Math.sin(i * 1.87 + seed) * Math.cos(i * 0.73 + seed * 1.1))
                  * Math.max(currentPrice * 0.003, 0.01) * decay;
    cur = Math.max(0.01, parseFloat((cur + drift + noise).toFixed(2)));
    pts.push(cur);
  }
  pts[n - 1] = parseFloat(currentPrice.toFixed(2));
  return pts;
}

// ── Mini chart (price chart with axes) ────────────────────────────────────────
function MiniChart({ prices, positive, xLabels }: { prices: number[]; positive: boolean; xLabels: string[] }) {
  if (!prices || prices.length < 2) return null;

  const VW = 280; const VH = 155;
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
  const xLabelPos = xLabels.map((_, i) => padL + (i / (xLabels.length - 1)) * chartW);

  const pts = prices.map((p, i) => ({ x: toX(i), y: toY(p) }));
  const linePath = pts.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`).join(' ');
  const areaPath = `${linePath} L ${pts[pts.length - 1].x.toFixed(1)} ${(padT + chartH).toFixed(1)} L ${pts[0].x.toFixed(1)} ${(padT + chartH).toFixed(1)} Z`;

  const color     = positive ? '#34d399' : '#f87171';
  const fillColor = positive ? 'rgba(52,211,153,0.12)' : 'rgba(248,113,113,0.12)';

  const yTicks = [yMin + yRange * 0.1, yMin + yRange * 0.5, yMin + yRange * 0.9];
  const fmtPrice = (v: number) =>
    v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v >= 100 ? v.toFixed(0) : v.toFixed(1);

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" height="100%" style={{ display: 'block' }}>
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
        <text key={i} x={xLabelPos[i]} y={padT + chartH + 14} textAnchor="middle" fontSize="9" fill="#64748b">
          {label}
        </text>
      ))}
      <path d={areaPath} fill={fillColor} />
      <path d={linePath} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="3" fill={color} />
    </svg>
  );
}

// ── Index performance chart ───────────────────────────────────────────────────
const PERIODS: Period[] = ['1W', '1M', '6M', '1Y'];

function IndexChart({ theme, period, setPeriod }: { theme: Theme; period: Period; setPeriod: (p: Period) => void }) {
  const d: ChartPeriodData = INDEX_CHART_DATA[theme][period];

  const VW = 800; const VH = 200;
  const padL = 52; const padR = 20; const padT = 12; const padB = 30;
  const chartW = VW - padL - padR;
  const chartH = VH - padT - padB;

  // Y range — expand slightly beyond data bounds
  const allVals = [...d.top10, ...d.spy];
  const rawMin  = Math.min(...allVals);
  const rawMax  = Math.max(...allVals);
  const pad     = Math.max((rawMax - rawMin) * 0.12, 0.8);
  const yMin = rawMin - pad;
  const yMax = rawMax + pad;
  const yRange = yMax - yMin;

  const toX = (i: number, n: number) => padL + (i / (n - 1)) * chartW;
  const toY = (v: number) => padT + chartH - ((v - yMin) / yRange) * chartH;

  const makeLine = (pts: number[]) =>
    pts.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i, pts.length).toFixed(1)} ${toY(v).toFixed(1)}`).join(' ');

  // 4 Y-axis ticks, evenly spaced
  const yTicks = Array.from({ length: 4 }, (_, i) => yMin + (yRange / 3) * i);
  const fmtY = (v: number) => {
    const pct = v - 100;
    return `${pct > 0 ? '+' : pct < 0 ? '' : ''}${pct.toFixed(pct === 0 ? 0 : 1)}%`;
  };

  // X labels evenly spaced across chart width
  const xl   = d.xLabels;
  const xPos = xl.map((_, i) => padL + (i / (xl.length - 1)) * chartW);

  const top10Pos = d.top10Return >= 0;
  const spyPos   = d.spyReturn   >= 0;
  const delta    = d.top10Return - d.spyReturn;
  const deltaPos = delta >= 0;

  // Zero line Y (only if 100 is within visible range)
  const zeroInRange = yMin <= 100 && yMax >= 100;

  return (
    <div className="max-w-md h-full">
      <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 pt-3 pb-3 h-full flex flex-col">

        {/* Headline */}
        <div className="flex items-center gap-2 mb-3">
          <p className="text-slate-200 text-sm font-semibold">{theme} Top10 vs S&amp;P500</p>
          <span className={`text-xs font-bold tabular-nums px-2 py-0.5 rounded-full border ${
            deltaPos
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          }`}>
            {deltaPos ? '▲' : '▼'} {Math.abs(delta).toFixed(1)}% vs index
          </span>
        </div>

        {/* SVG */}
        <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" style={{ display: 'block' }}>
          {yTicks.map((tick, i) => (
            <line key={i} x1={padL} y1={toY(tick)} x2={VW - padR} y2={toY(tick)}
              stroke="#1e293b" strokeWidth="1" />
          ))}
          {zeroInRange && (
            <line x1={padL} y1={toY(100)} x2={VW - padR} y2={toY(100)}
              stroke="#334155" strokeWidth="1.5" strokeDasharray="5 3" />
          )}
          <line x1={padL} y1={padT} x2={padL} y2={padT + chartH} stroke="#334155" strokeWidth="1" />
          <line x1={padL} y1={padT + chartH} x2={VW - padR} y2={padT + chartH} stroke="#334155" strokeWidth="1" />
          {yTicks.map((tick, i) => (
            <text key={i} x={padL - 6} y={toY(tick) + 3.5} textAnchor="end" fontSize="10" fill="#475569">
              {fmtY(tick)}
            </text>
          ))}
          {xl.map((label, i) => (
            <text key={i} x={xPos[i]} y={VH - 8} textAnchor="middle" fontSize="10" fill="#475569">
              {label}
            </text>
          ))}
          <path d={makeLine(d.spy)} fill="none" stroke="#38bdf8" strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round" opacity="0.65" />
          <path d={makeLine(d.top10)} fill="none" stroke="#34d399" strokeWidth="2.2"
            strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={toX(d.spy.length - 1, d.spy.length).toFixed(1)}
            cy={toY(d.spy[d.spy.length - 1]).toFixed(1)} r="3.5" fill="#38bdf8" opacity="0.8" />
          <circle cx={toX(d.top10.length - 1, d.top10.length).toFixed(1)}
            cy={toY(d.top10[d.top10.length - 1]).toFixed(1)} r="4" fill="#34d399" />
        </svg>

        {/* Period toggle */}
        <div className="flex items-center justify-center gap-0.5 mt-2 mb-1">
          {PERIODS.map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                p === period
                  ? 'bg-slate-700 text-white border border-slate-600'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Legend — pushed to bottom */}
        <div className="flex items-center gap-4 mt-auto border-t border-slate-800 pt-2">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-0.5 bg-emerald-400 rounded-full" />
            <span className="text-slate-400 text-xs">Top10</span>
            <span className={`text-xs font-bold tabular-nums ${top10Pos ? 'text-emerald-400' : 'text-rose-400'}`}>
              {top10Pos ? '+' : ''}{d.top10Return.toFixed(1)}%
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-0.5 bg-sky-400 rounded-full opacity-65" />
            <span className="text-slate-400 text-xs">S&amp;P500</span>
            <span className={`text-xs font-bold tabular-nums ${spyPos ? 'text-slate-300' : 'text-rose-400'}`}>
              {spyPos ? '+' : ''}{d.spyReturn.toFixed(1)}%
            </span>
          </div>
          <span className="text-slate-700 text-xs ml-auto">indicative</span>
        </div>

      </div>
    </div>
  );
}

// ── ETF performance summary tile ─────────────────────────────────────────────
function EtfPerfTile({ theme, period }: { theme: Theme; period: Period }) {
  const etfs = THEME_ETFS[theme];
  const etfCount = THEME_ETF_COUNT[theme];

  const rows = etfs
    .map(ticker => ({ ticker, ret: ETF_RETURNS[ticker]?.[period] ?? 0 }))
    .sort((a, b) => b.ret - a.ret);

  const maxAbs = Math.max(...rows.map(r => Math.abs(r.ret)), 0.1);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 flex flex-col gap-3 w-56 flex-shrink-0 h-full">

      {/* Header */}
      <div>
        <p className="text-white font-semibold text-sm">{theme} ETFs</p>
        <p className="text-slate-500 text-xs">{etfCount} tracked · ranked by {period} return</p>
      </div>

      {/* ETF rows */}
      <div className="flex flex-col gap-1.5">
        {rows.map(({ ticker, ret }) => {
          const pos    = ret >= 0;
          const barPct = (Math.abs(ret) / maxAbs) * 100;
          return (
            <div key={ticker}>
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-slate-300 text-xs font-mono font-bold">{ticker}</span>
                <span className={`text-xs font-bold tabular-nums ${pos ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {pos ? '+' : ''}{ret.toFixed(1)}%
                </span>
              </div>
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${pos ? 'bg-emerald-500/50' : 'bg-rose-500/50'}`}
                  style={{ width: `${barPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

// ── Index validation strip ────────────────────────────────────────────────────
function ValidationStrip({ equities, theme }: { equities: Equity[]; theme: Theme }) {
  if (equities.length === 0) return null;
  const portfolioReturn = equities.reduce((sum, e) => sum + e.weeklyChange, 0) / equities.length;
  const benchmark       = THEME_BENCHMARKS[theme];
  const benchmarkLabel  = THEME_BENCHMARK_ETF[theme];
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

// ── Velocity Score badge ──────────────────────────────────────────────────────
function VsBadge({ vs, period }: { vs: number | null; period: string }) {
  if (vs === null || vs === undefined) return null;
  const pos = vs >= 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-bold tabular-nums px-2 py-0.5 rounded-full border whitespace-nowrap ${
      pos
        ? 'bg-amber-500/15 border-amber-500/35 text-amber-400'
        : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
    }`}>
      {pos ? '▲' : '▼'} {pos ? '+' : ''}{vs.toFixed(1)}% {period}
    </span>
  );
}

// ── Coverage score badge ──────────────────────────────────────────────────────
function CoverageScoreBadge({ score, maxScore }: { score: number; maxScore: number }) {
  const pct = maxScore > 0 ? score / maxScore : 0;
  const color = pct >= 0.8 ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              : pct >= 0.6 ? 'bg-sky-500/20 border-sky-500/40 text-sky-300'
              : pct >= 0.4 ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
              : 'bg-slate-700 border-slate-600 text-slate-400';
  return (
    <span className={`inline-flex items-center border text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${color}`}>
      {score}/{maxScore}
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

// ── Tony's full thesis modal ─────────────────────────────────────────────────
function ThesisModal({ equity, etfs, maxScore, onClose }: {
  equity: Equity; etfs: string[]; maxScore: number; onClose: () => void;
}) {
  const domain  = TICKER_DOMAINS[equity.ticker];
  const logoUrl = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64` : null;

  const holdingEtfs = etfs.filter(etf => {
    const v = equity.etfPresence[etf];
    return v !== false && v !== 0;
  });
  const maxWeight = Math.max(...holdingEtfs.map(etf => equity.etfPresence[etf] as number), 0.1);

  // Strip the placeholder "check back" ending from the note
  const cleanNote = equity.tonyNote.replace(/\s*Analysis pending[^.]*\.\s*$/, '').trim();

  const peStr  = equity.pe !== null ? `${equity.pe}x` : 'N/A';
  const divStr = equity.dividendYield !== null ? `${equity.dividendYield.toFixed(1)}%` : 'None';
  const revStr = `${equity.revenueGrowth > 0 ? '+' : ''}${equity.revenueGrowth}%`;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(2,6,23,0.90)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden"
        style={{ maxHeight: '88vh', animation: 'modalIn 0.25s ease forwards' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="overflow-y-auto" style={{ maxHeight: '88vh' }}>

          {/* Sticky header */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-5 pt-5 pb-3 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center gap-3 min-w-0">
              {logoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} width={28} height={28}
                  className="rounded-lg flex-shrink-0 bg-white"
                  onError={e => { e.currentTarget.style.display = 'none'; }} alt="" />
              )}
              <div className="min-w-0">
                <p className="text-white font-bold text-sm leading-tight truncate">{equity.name}</p>
                <p className="text-slate-500 text-xs font-mono">{equity.ticker}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <CoverageScoreBadge score={equity.easyScore} maxScore={maxScore} />
              <button onClick={onClose} className="text-slate-500 hover:text-white text-xl leading-none ml-1 w-6 h-6 flex items-center justify-center">×</button>
            </div>
          </div>

          <div className="px-5 pt-4 pb-6 space-y-5">

            {/* Score summary */}
            <div className="flex gap-3 flex-wrap">
              <div className="flex-1 min-w-[4.5rem] bg-slate-800/60 rounded-xl p-3 text-center">
                <p className="text-slate-500 text-xs mb-1">Weight Score</p>
                <p className="text-emerald-400 font-bold text-2xl tabular-nums">{equity.proScore.toFixed(1)}%</p>
                <p className="text-slate-600 text-[10px] mt-0.5">avg across {holdingEtfs.length} ETFs</p>
              </div>
              <div className="flex-1 min-w-[4.5rem] bg-slate-800/60 rounded-xl p-3 text-center">
                <p className="text-slate-500 text-xs mb-1">Coverage</p>
                <p className="text-emerald-400 font-bold text-2xl tabular-nums">{(equity.coverage * 100).toFixed(0)}%</p>
                <p className="text-slate-600 text-[10px] mt-0.5">coeff ×{Math.sqrt(equity.coverage).toFixed(2)}</p>
              </div>
              <div className="flex-1 min-w-[4.5rem] bg-slate-800/60 rounded-xl p-3 text-center">
                <p className="text-slate-500 text-xs mb-1">ETF Count</p>
                <p className="text-emerald-400 font-bold text-2xl tabular-nums">{equity.easyScore}/{maxScore}</p>
                <p className="text-slate-600 text-[10px] mt-0.5">ETFs holding</p>
              </div>
              {equity.velocityScore?.['1W'] !== null && equity.velocityScore?.['1W'] !== undefined && (
                <div className="flex-1 min-w-[4.5rem] bg-slate-800/60 rounded-xl p-3 text-center">
                  <p className="text-slate-500 text-xs mb-1">Velocity</p>
                  <p className={`font-bold text-2xl tabular-nums ${(equity.velocityScore['1W'] ?? 0) >= 0 ? 'text-amber-400' : 'text-rose-400'}`}>
                    {(equity.velocityScore['1W'] ?? 0) >= 0 ? '+' : ''}{equity.velocityScore['1W']?.toFixed(1)}%
                  </p>
                  <p className="text-slate-600 text-[10px] mt-0.5">1W wt score</p>
                </div>
              )}
            </div>

            {/* ETF conviction bars */}
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">ETF Conviction</p>
              <div className="space-y-2.5">
                {holdingEtfs.map(etf => {
                  const w = equity.etfPresence[etf] as number;
                  const barPct = (w / maxWeight) * 100;
                  return (
                    <div key={etf}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-slate-300 text-xs font-mono font-bold">{etf}</span>
                        <span className="text-emerald-400 text-xs font-bold tabular-nums">{w.toFixed(1)}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500/60 rounded-full" style={{ width: `${barPct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key financials */}
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Key Financials</p>
              <div className="grid grid-cols-3 gap-1.5">
                <Stat label="Mkt Cap"    value={equity.marketCap} />
                <Stat label="P/E"        value={peStr} />
                <Stat label="Rev Growth" value={revStr} highlight={equity.revenueGrowth > 15} />
                <Stat label="EPS"        value={`$${equity.eps.toFixed(2)}`} />
                <Stat label="Grs Margin" value={`${equity.grossMargin}%`} highlight={equity.grossMargin > 55} />
                <Stat label="Dividend"   value={divStr} />
              </div>
            </div>

            {/* Tony's analysis */}
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Tony&apos;s Analysis</p>
              <div className="bg-slate-800/40 rounded-xl px-3 py-3">
                <p className="text-slate-300 text-xs leading-relaxed">{cleanNote}</p>
              </div>
            </div>

            {/* Coming soon */}
            <div>
              <p className="text-slate-600 text-[10px] uppercase tracking-wider mb-2">Coming soon</p>
              <div className="flex flex-wrap gap-2">
                {['Technical Analysis', 'Price Target'].map(label => (
                  <span key={label} className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border border-slate-800 text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ── Equity tile ───────────────────────────────────────────────────────────────
function EquityTile({ equity, etfs, maxScore }: { equity: Equity; etfs: string[]; maxScore: number }) {
  const [flipped,     setFlipped]     = useState(false);
  const [tilePeriod,  setTilePeriod]  = useState<Period>('1W');
  const [wtOpen,      setWtOpen]      = useState(false);
  const [thesisOpen,  setThesisOpen]  = useState(false);

  const periodReturn = tilePeriod === '1W' ? equity.weeklyChange : equity.periodReturns[tilePeriod];
  const tilePrices   = makeTilePrices(equity.ticker, equity.price, periodReturn, tilePeriod);
  const positive     = tilePrices[tilePrices.length - 1] >= tilePrices[0];
  const changeColor  = periodReturn >= 0 ? 'text-emerald-400' : 'text-rose-400';
  const changeSign   = periodReturn >= 0 ? '+' : '';

  // Map tile period to a velocityScore key ('1Y' has no VS, fall back to '1M')
  const tileVsPeriod = tilePeriod === '6M' ? '6M' : tilePeriod === '1M' ? '1M' : '1W';
  const tileVsVal    = equity.velocityScore?.[tileVsPeriod] ?? null;

  const peStr  = equity.pe !== null ? `${equity.pe}x` : 'N/A';
  const divStr = equity.dividendYield !== null ? `${equity.dividendYield.toFixed(1)}%` : 'None';
  const revStr = `${equity.revenueGrowth > 0 ? '+' : ''}${equity.revenueGrowth}%`;

  const domain   = TICKER_DOMAINS[equity.ticker];
  const logoUrl  = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64` : null;

  return (
    <>
    <div
      className="relative cursor-pointer"
      style={{ perspective: '1000px', height: '520px' }}
      onClick={() => { setFlipped(f => !f); setWtOpen(false); }}
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
          {/* Name + logo + badge */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2 min-w-0">
              {logoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoUrl}
                  width={22} height={22}
                  className="rounded-md flex-shrink-0 mt-0.5 bg-white"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  alt=""
                />
              )}
              <div className="min-w-0">
                <p className="text-white font-bold text-sm leading-tight">{equity.name}</p>
                <p className="text-slate-500 text-xs font-mono mt-0.5">{equity.ticker}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              {equity.isNew && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 leading-none">
                  NEW
                </span>
              )}
              <CoverageScoreBadge score={equity.easyScore} maxScore={maxScore} />
            </div>
          </div>

          {/* Price + Weight Score */}
          <div className="flex items-baseline justify-between flex-shrink-0 mt-3">
            <p className="text-white font-bold text-xl tabular-nums">
              ${equity.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <span className="relative group" onClick={e => { e.stopPropagation(); setWtOpen(o => !o); }}>
              <span className="text-emerald-400 font-bold text-2xl tabular-nums leading-none cursor-pointer">
                {equity.proScore.toFixed(1)}<span className="text-sm font-medium text-emerald-500/70 ml-0.5">% avg wt</span>
              </span>
              {/* Tooltip: ETF weight breakdown */}
              <div className={`absolute right-0 top-full mt-1.5 w-48 rounded-lg border border-slate-700 bg-slate-950 p-3 shadow-xl z-50 transition-opacity duration-150 pointer-events-none ${wtOpen ? 'visible opacity-100' : 'invisible opacity-0 group-hover:visible group-hover:opacity-100'}`}>
                <p className="text-slate-400 text-xs font-semibold mb-2">ETF weight breakdown</p>
                <div className="space-y-1.5">
                  {etfs.filter(etf => {
                    const val = equity.etfPresence[etf];
                    return val !== false && val !== 0;
                  }).map(etf => {
                    const val = equity.etfPresence[etf] as number;
                    return (
                      <div key={etf} className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-slate-300">{etf}</span>
                        <span className="text-emerald-400 text-xs font-bold tabular-nums">{val.toFixed(1)}%</span>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-slate-700 mt-2 pt-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-xs">Coverage</span>
                    <span className="text-slate-100 text-xs font-bold tabular-nums">{(equity.coverage * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-xs">Confidence coeff</span>
                    <span className="text-slate-100 text-xs font-bold tabular-nums">×{Math.sqrt(equity.coverage).toFixed(2)}</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed pt-0.5">Weight Score = avg × √coverage</p>
                </div>
              </div>
            </span>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-800 my-2 flex-shrink-0" />

          {/* Period change — synced to chart */}
          <div className="flex items-start justify-between flex-shrink-0">
            <div>
              <p className="text-slate-500 text-xs leading-none mb-0.5">{tilePeriod} change</p>
              <p className={`font-semibold text-sm tabular-nums ${changeColor}`}>{changeSign}{periodReturn.toFixed(1)}%</p>
            </div>
            {tileVsVal !== null && (
              <div className="text-right">
                <p className="text-slate-500 text-xs leading-none mb-0.5">VS {tileVsPeriod}</p>
                <p className={`font-bold text-sm tabular-nums ${tileVsVal >= 0 ? 'text-amber-400' : 'text-rose-400'}`}>
                  {tileVsVal >= 0 ? '▲+' : '▼'}{tileVsVal.toFixed(1)}%
                </p>
              </div>
            )}
          </div>

          {/* Chart — fills all remaining vertical space */}
          <div className="flex-1 min-h-0 -mx-1 mt-1">
            <MiniChart prices={tilePrices} positive={positive} xLabels={TILE_XLABELS[tilePeriod]} />
          </div>

          {/* Period toggle — below chart */}
          <div className="flex items-center justify-center gap-0.5 pt-1" onClick={e => e.stopPropagation()}>
            {PERIODS.map(p => (
              <button
                key={p}
                onClick={() => setTilePeriod(p)}
                className={`px-2 py-0.5 rounded text-xs font-semibold transition-all ${
                  p === tilePeriod
                    ? 'bg-slate-700 text-white border border-slate-600'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <p className="text-slate-700 text-xs pt-1 text-right">flip for detail →</p>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-xl border border-emerald-900 bg-slate-900 p-4 flex flex-col gap-3"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {/* Header */}
          <div className="flex-shrink-0">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white font-bold text-sm">{equity.ticker}</p>
                <p className="text-slate-500 text-xs truncate">{equity.name}</p>
              </div>
              <CoverageScoreBadge score={equity.easyScore} maxScore={maxScore} />
            </div>
            <div className="flex items-center gap-2 mt-1.5 tabular-nums flex-wrap">
              <span className="text-emerald-400 font-bold text-sm">{equity.proScore.toFixed(1)}% wt</span>
              <span className="text-slate-700">|</span>
              <span className="text-slate-200 font-semibold text-xs">{(equity.coverage * 100).toFixed(0)}% coverage</span>
              <span className="text-slate-700">|</span>
              <span className="text-slate-200 font-semibold text-xs">coeff ×{Math.sqrt(equity.coverage).toFixed(2)}</span>
              {equity.velocityScore?.['1W'] !== null && equity.velocityScore?.['1W'] !== undefined && (
                <>
                  <span className="text-slate-700">|</span>
                  <VsBadge vs={equity.velocityScore['1W']} period="VS 1W" />
                </>
              )}
            </div>
          </div>

          {/* ETF presence */}
          <div className="flex-shrink-0">
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1.5">ETF Presence</p>
            <div className="flex flex-wrap gap-1">
              {etfs.map(etf => {
                const val = equity.etfPresence[etf];
                const held = val !== false && val !== 0;
                return (
                  <span
                    key={etf}
                    className={`inline-flex items-center gap-1 text-xs font-mono font-bold px-2 py-0.5 rounded-full border ${
                      held
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                        : 'bg-slate-800 border-slate-700 text-slate-600 line-through'
                    }`}
                  >
                    {etf}
                    {held && (
                      <span className="text-emerald-500/70 font-normal text-xs">
                        {(val as number).toFixed(1)}%
                      </span>
                    )}
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
              <p className="text-slate-300 text-xs leading-relaxed">{equity.tonyNote.replace(/\s*Analysis pending[^.]*\.\s*$/, '').trim()}</p>
            </div>
          </div>

          {/* Footer: full thesis button + flip hint */}
          <div className="flex items-center justify-between flex-shrink-0 pt-1">
            <button
              className="text-emerald-600 hover:text-emerald-400 text-xs font-semibold transition-colors"
              onClick={e => { e.stopPropagation(); setThesisOpen(true); }}
            >
              Tony&apos;s full thesis →
            </button>
            <span className="text-slate-700 text-xs">flip back →</span>
          </div>
        </div>

      </div>
    </div>

    {thesisOpen && (
      <ThesisModal equity={equity} etfs={etfs} maxScore={maxScore} onClose={() => setThesisOpen(false)} />
    )}
    </>
  );
}

// ── Compact row (list view) ───────────────────────────────────────────────────
function CompactRow({
  equity, etfs, maxScore, rank, expanded, onToggle,
}: {
  equity: Equity; etfs: string[]; maxScore: number;
  rank: number; expanded: boolean; onToggle: () => void;
}) {
  const domain     = TICKER_DOMAINS[equity.ticker];
  const logoUrl    = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64` : null;
  const positive   = equity.weeklyChange >= 0;
  const changeColor = positive ? 'text-emerald-400' : 'text-rose-400';
  const vs1w = equity.velocityScore?.['1W'] ?? null;

  return (
    <div>
      {/* Compact row */}
      <div
        className={`flex items-center gap-3 px-3 py-2 rounded-xl border cursor-pointer transition-colors ${
          expanded
            ? 'border-emerald-700 bg-slate-900'
            : 'border-slate-800 bg-slate-900 hover:border-slate-600'
        }`}
        onClick={onToggle}
      >
        {/* Rank */}
        <span className="text-slate-600 text-xs tabular-nums w-5 flex-shrink-0 text-right">{rank}</span>

        {/* Logo */}
        <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} width={18} height={18} className="rounded flex-shrink-0 bg-white"
              onError={(e) => { e.currentTarget.style.display = 'none'; }} alt="" />
          ) : (
            <div className="w-4 h-4 rounded bg-slate-700" />
          )}
        </div>

        {/* Ticker */}
        <span className="text-white font-bold text-xs font-mono w-14 flex-shrink-0">{equity.ticker}</span>

        {/* Name */}
        <span className="text-slate-400 text-xs truncate flex-1 min-w-0 hidden sm:block">{equity.name}</span>

        {/* Price */}
        <span className="text-white font-bold text-xs tabular-nums flex-shrink-0 w-16 text-right">
          ${equity.price >= 1000
            ? equity.price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
            : equity.price.toFixed(2)}
        </span>

        {/* Weekly change */}
        <span className={`text-xs font-semibold tabular-nums flex-shrink-0 w-14 text-right hidden sm:block ${changeColor}`}>
          {positive ? '+' : ''}{equity.weeklyChange.toFixed(1)}%
        </span>

        {/* Weight score */}
        <span className="text-emerald-400 text-xs font-bold tabular-nums flex-shrink-0 w-16 text-right" title={`Weight Score: ${equity.proScore.toFixed(1)}% | Coverage: ${(equity.coverage * 100).toFixed(0)}%`}>
          {equity.proScore.toFixed(1)}% wt
        </span>

        {/* Velocity Score 1W */}
        {vs1w !== null ? (
          <span className={`text-xs font-bold tabular-nums flex-shrink-0 w-16 text-right hidden md:block ${vs1w >= 0 ? 'text-amber-400' : 'text-rose-400'}`}>
            {vs1w >= 0 ? '▲+' : '▼'}{Math.abs(vs1w).toFixed(1)}%
          </span>
        ) : (
          <span className="text-slate-700 text-xs flex-shrink-0 w-16 text-right hidden md:block">&mdash;</span>
        )}

        {/* Coverage score badge */}
        <div className="flex-shrink-0">
          <CoverageScoreBadge score={equity.easyScore} maxScore={maxScore} />
        </div>

        {/* Expand chevron */}
        <span className="text-slate-600 text-xs flex-shrink-0 w-4 text-center">{expanded ? '▲' : '▼'}</span>
      </div>

      {/* Expanded full tile */}
      {expanded && (
        <div className="mt-2 mb-1 px-2">
          <EquityTile equity={equity} etfs={etfs} maxScore={maxScore} />
        </div>
      )}
    </div>
  );
}

// ── Welcome modal ─────────────────────────────────────────────────────────────
function WelcomeModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(2,6,23,0.85)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-7 shadow-2xl"
        onClick={e => e.stopPropagation()}
        style={{ animation: 'modalIn 0.3s ease forwards' }}
      >
        {/* Logo */}
        <div className="mb-5">
          <p className="text-2xl font-bold tracking-tight">
            <span className="text-emerald-400">Top</span>10
          </p>
          <span className="inline-flex items-center mt-1.5 bg-emerald-400/10 border border-emerald-400/25 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full tracking-wide">
            ETF Holdings Analyser
          </span>
        </div>

        {/* Body */}
        <p className="text-slate-200 text-sm leading-relaxed mb-5">
          Top10 is an ETF holdings analyser for professional traders and investors.
          It ranks equities by how many sector ETFs hold them and by average weight,
          surfacing the names with the highest conviction across institutional products.
        </p>

        {/* Three key points */}
        <div className="space-y-2.5 mb-6">
          {[
            { icon: '◆', label: 'Coverage Score', desc: 'How many ETFs in this theme hold this stock (x/n), expressed as a percentage of the theme.' },
            { icon: '◆', label: 'Weight Score', desc: 'Average weighting across all holding ETFs.' },
            { icon: '◆', label: "Tony's Analysis", desc: 'Thesis, risks, and what to watch. Flip any tile.' },
          ].map(({ icon, label, desc }) => (
            <div key={label} className="flex items-start gap-2.5">
              <span className="text-emerald-400 text-xs mt-0.5 flex-shrink-0">{icon}</span>
              <p className="text-slate-400 text-xs leading-relaxed">
                <span className="text-slate-200 font-semibold">{label}.</span>{' '}{desc}
              </p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-bold py-2.5 rounded-lg transition-colors"
          >
            Start exploring
          </button>
          <a
            href="/about"
            className="flex-1 text-center border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-slate-200 text-sm font-semibold py-2.5 rounded-lg transition-colors"
          >
            Learn more
          </a>
        </div>

        {/* Dismiss hint */}
        <p className="text-slate-700 text-xs text-center mt-4">Click anywhere outside to dismiss</p>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [theme,   setTheme]   = useState<Theme>('AI & ML');
  const [period,  setPeriod]  = useState<Period>('6M');
  const [tagline, setTagline] = useState(false);
  const [welcome, setWelcome] = useState(false);
  const [layout,  setLayout]  = useState<'grid' | 'compact'>('grid');
  const [showAll, setShowAll] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setTagline(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const seen = localStorage.getItem('top10_welcomed');
    if (!seen) setWelcome(true);
  }, []);

  // Reset pagination + expanded when switching theme or layout
  useEffect(() => { setShowAll(false); setExpanded(null); }, [theme, layout]);

  const closeWelcome = () => {
    setWelcome(false);
    localStorage.setItem('top10_welcomed', '1');
  };

  const equities = SAMPLE_DATA[theme];
  const etfs     = THEME_ETFS[theme];
  const maxScore = THEME_ETF_COUNT[theme];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {welcome && <WelcomeModal onClose={closeWelcome} />}

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-start justify-between gap-4">

          {/* Left: logo + badge */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold tracking-tight">
              <span className="text-emerald-400">Top</span>10
            </h1>
            <div
              className="mt-1.5"
              style={{
                opacity:   tagline ? 1 : 0,
                transform: tagline ? 'translateY(0)' : 'translateY(6px)',
                transition: 'opacity 0.55s ease, transform 0.55s ease',
              }}
            >
              <span className="inline-flex items-center whitespace-nowrap bg-emerald-400/10 border border-emerald-400/25 text-emerald-300 text-lg font-semibold px-3.5 py-1 rounded-full tracking-wide animate-sway">
                ETF Holdings Analyser
              </span>
            </div>
          </div>

          {/* Right: nav + sector toggle (desktop only) */}
          <div className="flex flex-col items-end gap-2 min-w-0 flex-1">
            <nav className="flex items-center gap-4 text-sm flex-shrink-0">
              <Link href="/" className="text-emerald-400 font-medium">Dashboard</Link>
              <Link href="/about" className="text-slate-400 hover:text-white transition-colors">About</Link>
            </nav>
            <div className="hidden sm:flex justify-end">
              <div className="flex items-center bg-slate-800 rounded-full p-0.5 text-xs font-bold border border-slate-700">
                {THEMES.map(s => (
                  <button
                    key={s}
                    onClick={() => setTheme(s)}
                    className={`px-4 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
                      theme === s
                        ? 'bg-emerald-500 text-black shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* Theme toggle — mobile only, full-width scrollable bar */}
      <div className="sm:hidden border-b border-slate-800 bg-slate-900/50">
        <div className="px-4 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1 py-2 w-max">
            {THEMES.map(s => (
              <button
                key={s}
                onClick={() => setTheme(s)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  theme === s
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
            {/* Index chart + ETF summary tile */}
            <div className="flex items-stretch gap-4 mb-6">
              <IndexChart theme={theme} period={period} setPeriod={setPeriod} />
              <div className="hidden sm:block flex-shrink-0 h-full">
                <EtfPerfTile theme={theme} period={period} />
              </div>
            </div>

            {/* Legend + score explanation + layout toggle */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                <span className="border text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 border-emerald-500/40 text-emerald-300">x/{maxScore}</span>
                {`≥80% of ${maxScore} ETFs`}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                <span className="border text-xs font-bold px-2 py-0.5 rounded-full bg-sky-500/20 border-sky-500/40 text-sky-300">x/{maxScore}</span>
                ≥60%
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                <span className="border text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 border-amber-500/40 text-amber-300">x/{maxScore}</span>
                ≥40%
              </span>

              {/* Layout toggle */}
              <div className="ml-auto flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 gap-0.5">
                <button
                  onClick={() => setLayout('grid')}
                  title="Grid view — 10 tiles, then next 10"
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                    layout === 'grid'
                      ? 'bg-slate-600 text-white'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  ⊞ Grid
                </button>
                <button
                  onClick={() => setLayout('compact')}
                  title="Compact list — all 20, click to expand"
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                    layout === 'compact'
                      ? 'bg-slate-600 text-white'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  ≡ List
                </button>
              </div>
            </div>

            {/* Grid layout: first 10, then Next 10 button */}
            {layout === 'grid' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {(showAll ? equities : equities.slice(0, 10)).map(eq => (
                    <EquityTile key={eq.ticker} equity={eq} etfs={etfs} maxScore={maxScore} />
                  ))}
                </div>
                {!showAll && equities.length > 10 && (
                  <div className="mt-5 text-center">
                    <button
                      onClick={() => setShowAll(true)}
                      className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-slate-700 bg-slate-900 hover:border-slate-500 hover:bg-slate-800 text-slate-300 hover:text-white text-sm font-semibold transition-all"
                    >
                      Next {equities.length - 10} →
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Compact list layout: all 20, click to expand */}
            {layout === 'compact' && (
              <div className="flex flex-col gap-1.5">
                {equities.map((eq, i) => (
                  <CompactRow
                    key={eq.ticker}
                    equity={eq}
                    etfs={etfs}
                    maxScore={maxScore}
                    rank={i + 1}
                    expanded={expanded === eq.ticker}
                    onToggle={() => setExpanded(t => t === eq.ticker ? null : eq.ticker)}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-12 text-center">
            <p className="text-slate-400 text-sm">Data coming soon for {theme}.</p>
            <p className="text-slate-600 text-xs mt-2">Scraper launching shortly.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      {SCAN_TIMESTAMP_NY && (
        <footer className="border-t border-slate-800 mt-8 py-4 px-4">
          <p className="text-center text-slate-600 text-xs">
            Last updated: <span className="text-slate-500">{SCAN_TIMESTAMP_NY}</span>
          </p>
        </footer>
      )}

    </main>
  );
}
