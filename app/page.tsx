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
  CROSS_THEME_TOP10,
  ETF_TOP_HOLDINGS,
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
  // Meme theme (space, quantum, AI-infra and high-momentum retail names)
  ASTS: 'ast-science.com', RDW:  'redwirespace.com',   AAOI: 'ao-inc.com',
  LUNR: 'intuitivemachines.com', IREN: 'iren.com',     NBIS: 'nebius.com',
  QBTS: 'dwavequantum.com', ONDS: 'ondas.com',         APLD: 'applieddigital.com',
  IONQ: 'ionq.com',      TE:   't1energy.com',         AXTI: 'axt.com',
  NVTS: 'navitassemi.com', WOLF: 'wolfspeed.com',
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
        <p className="text-slate-500 text-xs flex items-center flex-wrap gap-x-1">
          {etfCount} tracked · ranked by
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 text-[11px] font-bold border border-emerald-500/40 tabular-nums leading-none">{period}</span>
          return
        </p>
        <p className="text-slate-600 text-[10px] mt-1 flex items-center gap-1">
          <span aria-hidden className="text-emerald-500/70">⇄</span> synced with chart timeframe
        </p>
      </div>

      {/* ETF rows */}
      <div className="flex flex-col gap-1.5">
        {rows.map(({ ticker, ret }) => {
          const pos      = ret >= 0;
          const barPct   = (Math.abs(ret) / maxAbs) * 100;
          const holdings = ETF_TOP_HOLDINGS[ticker] ?? [];
          return (
            <div key={ticker} className="relative group/etf">
              <div className="flex items-center justify-between mb-0.5 cursor-default">
                <span className="text-slate-300 text-xs font-mono font-bold border-b border-dotted border-slate-700 group-hover/etf:border-emerald-500/60">{ticker}</span>
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

              {/* Top-holdings tooltip, appears to the left so it never clips the right edge */}
              {holdings.length > 0 && (
                <div className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-2 z-50 hidden group-hover/etf:block w-44 rounded-lg border border-slate-700 bg-slate-950/95 backdrop-blur-sm shadow-xl px-3 py-2">
                  <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wide mb-1.5">{ticker} top holdings</p>
                  <div className="flex flex-col gap-1">
                    {holdings.map(h => (
                      <div key={h.t} className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-300 font-mono">{h.t}</span>
                        <span className="text-slate-400 tabular-nums">{h.w.toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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

// ── Tony's VS commentary (data-driven, per-stock) ────────────────────────────
function getTonyVsNote(equity: Equity): { text: string; positive: boolean } | null {
  const vs1w = equity.velocityScore?.['1W'] ?? null;
  const vs1m = equity.velocityScore?.['1M'] ?? null;
  if (vs1w === null) return null;

  const { ticker, proScore } = equity;
  const positive = vs1w >= 0;
  const mCtx = vs1m !== null
    ? ` Looking at the past month, Weight Score is ${vs1m >= 0 ? 'up' : 'down'} ${Math.abs(vs1m).toFixed(1)}% — ${Math.abs(vs1w) > Math.abs(vs1m) ? 'the weekly move is outpacing the monthly trend, suggesting acceleration' : 'broadly consistent with the recent trend'}.`
    : '';

  let text: string;
  if (vs1w >= 50) {
    text = `Exceptional accumulation this week. ${ticker}'s Weight Score surged +${vs1w.toFixed(1)}% — a move of this magnitude reflects a coordinated increase across multiple ETF managers simultaneously, not just passive price drift. At ${proScore.toFixed(1)}% average weighting the absolute conviction is already high; this acceleration suggests it has further to run.${mCtx}`;
  } else if (vs1w >= 20) {
    text = `Strong positive momentum. Weight Score is up +${vs1w.toFixed(1)}% this week, signalling that ETF managers are actively building their ${ticker} positions — increasing portfolio weight, not just riding price.${mCtx}`;
  } else if (vs1w >= 5) {
    text = `Gradual accumulation. ${ticker}'s Weight Score nudged up +${vs1w.toFixed(1)}% this week. A steady drip of adds across the ETF basket — conviction is growing, not plateauing.${mCtx}`;
  } else if (vs1w >= -5) {
    text = `Conviction is stable. Weight Score moved ${vs1w >= 0 ? '+' : ''}${vs1w.toFixed(1)}% this week — no meaningful adds or trims at the ETF level. ${ticker} is holding its place in the institutional allocation.${mCtx}`;
  } else if (vs1w >= -20) {
    text = `Slight fading. Weight Score slipped ${vs1w.toFixed(1)}% this week. Some ETF managers appear to be trimming ${ticker} at the margin. The stock remains broadly held, but the short-term momentum is not in its favour.${mCtx}`;
  } else {
    text = `Notable de-weighting. Weight Score fell ${vs1w.toFixed(1)}% this week — a sharp move that suggests active trimming across the ETF basket, not just price-driven rebalancing. Whether this is tactical profit-taking or a shift in longer-term conviction around ${ticker} warrants watching closely.${mCtx}`;
  }
  return { text, positive };
}

// ── New Entrants modal ────────────────────────────────────────────────────────
function NewEntrantsModal({ onClose, onSelectTheme }: {
  onClose: () => void;
  onSelectTheme: (t: Theme) => void;
}) {
  type EntrantRow = { equity: Equity; theme: Theme; maxScore: number; etfs: string[] };

  const newEntrants: EntrantRow[] = [];
  for (const t of THEMES) {
    for (const eq of SAMPLE_DATA[t]) {
      if (eq.isNew) newEntrants.push({ equity: eq, theme: t, maxScore: THEME_ETF_COUNT[t], etfs: THEME_ETFS[t] });
    }
  }

  // Group by theme, preserve THEMES order
  const byTheme = Object.fromEntries(THEMES.map(t => [t, [] as EntrantRow[]])) as Record<Theme, EntrantRow[]>;
  for (const row of newEntrants) byTheme[row.theme].push(row);
  const themesWithNew = THEMES.filter(t => byTheme[t].length > 0);

  return createPortal(
    // Backdrop — scrollable so tall tile grids don't clip
    <div
      className="fixed inset-0 z-[150] overflow-y-auto"
      style={{ backgroundColor: 'rgba(2,6,23,0.92)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div className="min-h-full flex items-start justify-center py-6 px-4">
        <div
          className="relative w-full max-w-5xl rounded-2xl border border-amber-500/25 bg-slate-950 shadow-2xl"
          style={{ animation: 'modalIn 0.25s ease forwards' }}
          onClick={e => e.stopPropagation()}
        >

          {/* Sticky header */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-5 pt-5 pb-3 bg-slate-950 border-b border-slate-800 rounded-t-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-amber-300 font-bold text-base">✦ New Entrants</span>
              <span className="bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold px-2 py-0.5 rounded-full tabular-nums">
                {newEntrants.length}
              </span>
              <span className="text-slate-500 text-xs hidden sm:inline">first time in the Top 20 today</span>
            </div>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-white text-xl leading-none w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-800 transition-colors flex-shrink-0"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="px-5 pb-8">
            {newEntrants.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-slate-400 text-sm">No new entrants today.</p>
                <p className="text-slate-600 text-xs mt-1">All current Top 20 equities were already ranked yesterday.</p>
              </div>
            ) : (
              <div className="space-y-8 pt-5">
                {themesWithNew.map(theme => (
                  <div key={theme}>

                    {/* Theme section header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-px flex-1 bg-slate-800" />
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-slate-300 text-sm font-bold">{theme}</span>
                        <span className="bg-amber-500/20 border border-amber-500/35 text-amber-300 text-xs font-bold px-2 py-0.5 rounded-full tabular-nums">
                          {byTheme[theme].length} new
                        </span>
                        <button
                          className="text-slate-500 hover:text-emerald-400 text-xs font-semibold transition-colors"
                          onClick={() => { onSelectTheme(theme); onClose(); }}
                        >
                          View all →
                        </button>
                      </div>
                      <div className="h-px flex-1 bg-slate-800" />
                    </div>

                    {/* Tile grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {byTheme[theme].map(({ equity, maxScore, etfs }) => (
                        <EquityTile key={equity.ticker} equity={equity} etfs={etfs} maxScore={maxScore} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>,
    document.body
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
  const avgWt = equity.avgWeight ?? (equity.coverage > 0 ? equity.proScore / Math.sqrt(equity.coverage) : equity.proScore);

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
                <p className="text-slate-500 text-xs mb-1">Avg Weight</p>
                <p className="text-emerald-400 font-bold text-2xl tabular-nums">{avgWt.toFixed(1)}%</p>
                <p className="text-slate-600 text-[10px] mt-0.5">avg across {holdingEtfs.length} ETFs</p>
              </div>
              <div className="flex-1 min-w-[4.5rem] bg-slate-800/60 rounded-xl p-3 text-center">
                <p className="text-slate-500 text-xs mb-1">Weight Score</p>
                <p className="text-emerald-400 font-bold text-2xl tabular-nums">{equity.proScore.toFixed(1)}%</p>
                <p className="text-slate-600 text-[10px] mt-0.5">avg × √{(equity.coverage * 100).toFixed(0)}%</p>
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

            {/* Tony on Velocity */}
            {(() => {
              const vsNote = getTonyVsNote(equity);
              if (!vsNote) return null;
              const accentBg    = vsNote.positive ? 'bg-amber-500/8 border-amber-500/25'  : 'bg-rose-500/8 border-rose-500/20';
              const accentLabel = vsNote.positive ? 'text-amber-400' : 'text-rose-400';
              const arrow       = vsNote.positive ? '▲' : '▼';
              return (
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                    Tony on Velocity
                  </p>
                  <div className={`rounded-xl border px-3 py-3 ${accentBg}`}>
                    <div className="flex items-start gap-2">
                      <span className={`${accentLabel} text-sm flex-shrink-0 mt-0.5`}>{arrow}</span>
                      <p className="text-slate-300 text-xs leading-relaxed">{vsNote.text}</p>
                    </div>
                  </div>
                </div>
              );
            })()}

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
  const [vsOpen,      setVsOpen]      = useState(false);
  const [thesisOpen,  setThesisOpen]  = useState(false);

  // Close any open tooltip on the next click anywhere in the document (mobile fix)
  useEffect(() => {
    if (!wtOpen && !vsOpen) return;
    const close = () => { setWtOpen(false); setVsOpen(false); };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [wtOpen, vsOpen]);

  const rawHistory   = equity.priceHistory?.[tilePeriod];
  const baseReturn   = tilePeriod === '1W' ? equity.weeklyChange : equity.periodReturns[tilePeriod];
  const tilePrices   = (rawHistory && rawHistory.length >= 2)
                       ? rawHistory
                       : makeTilePrices(equity.ticker, equity.price, baseReturn, tilePeriod);
  const periodReturn = (rawHistory && rawHistory.length >= 2)
                       ? parseFloat(((rawHistory[rawHistory.length - 1] / rawHistory[0] - 1) * 100).toFixed(1))
                       : baseReturn;
  const positive     = tilePrices[tilePrices.length - 1] >= tilePrices[0];
  const changeColor  = periodReturn >= 0 ? 'text-emerald-400' : 'text-rose-400';
  const changeSign   = periodReturn >= 0 ? '+' : '';

  // Map tile period to a velocityScore key ('1Y' has no VS, fall back to '1M')
  const tileVsPeriod = tilePeriod === '6M' ? '6M' : tilePeriod === '1M' ? '1M' : '1W';
  const tileVsVal    = equity.velocityScore?.[tileVsPeriod] ?? null;

  const peStr  = equity.pe !== null ? `${equity.pe}x` : 'N/A';
  const divStr = equity.dividendYield !== null ? `${equity.dividendYield.toFixed(1)}%` : 'None';
  const revStr = `${equity.revenueGrowth > 0 ? '+' : ''}${equity.revenueGrowth}%`;
  const avgWt  = equity.avgWeight ?? (equity.coverage > 0 ? equity.proScore / Math.sqrt(equity.coverage) : equity.proScore);

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

          {/* Price + Weight Score + VS */}
          <div className="flex items-start justify-between flex-shrink-0 mt-3">
            <p className="text-white font-bold text-xl tabular-nums mt-1">
              ${equity.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <div className="flex flex-col items-end gap-1.5">
              {/* avg wt */}
              <span className="relative group" onClick={e => { e.stopPropagation(); setWtOpen(o => !o); setVsOpen(false); }}>
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
                      <span className="text-slate-400 text-xs">Avg weight</span>
                      <span className="text-emerald-400 text-xs font-bold tabular-nums">{avgWt.toFixed(2)}%</span>
                    </div>
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

              {/* VS — same size as avg wt, directly below */}
              {tileVsVal !== null && (() => {
                const pastScore = equity.proScore / (1 + tileVsVal / 100);
                const vsColor   = tileVsVal >= 0 ? 'text-amber-400' : 'text-rose-400';
                const vsSign    = tileVsVal >= 0 ? '▲+' : '▼';
                return (
                  <span className="relative group" onClick={e => { e.stopPropagation(); setVsOpen(o => !o); setWtOpen(false); }}>
                    <span className={`${vsColor} font-bold text-2xl tabular-nums leading-none cursor-pointer`}>
                      {vsSign}{Math.abs(tileVsVal).toFixed(1)}<span className="text-sm font-medium ml-0.5 opacity-70">% VS {tileVsPeriod}</span>
                    </span>
                    {/* Tooltip: VS calculation */}
                    <div className={`absolute right-0 top-full mt-1.5 w-52 rounded-lg border border-slate-700 bg-slate-950 p-3 shadow-xl z-50 transition-opacity duration-150 pointer-events-none ${vsOpen ? 'visible opacity-100' : 'invisible opacity-0 group-hover:visible group-hover:opacity-100'}`}>
                      <p className="text-slate-400 text-xs font-semibold mb-2">Velocity Score — {tileVsPeriod} window</p>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 text-xs">Weight Score now</span>
                          <span className="text-emerald-400 text-xs font-bold tabular-nums">{equity.proScore.toFixed(2)}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 text-xs">Weight Score {tileVsPeriod} ago</span>
                          <span className="text-slate-300 text-xs font-bold tabular-nums">{pastScore.toFixed(2)}%</span>
                        </div>
                      </div>
                      <div className="border-t border-slate-700 mt-2 pt-2 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 text-xs">Change</span>
                          <span className={`text-xs font-bold tabular-nums ${vsColor}`}>{tileVsVal >= 0 ? '+' : ''}{tileVsVal.toFixed(1)}%</span>
                        </div>
                        <p className="text-slate-400 text-[11px] leading-relaxed pt-0.5">VS = (now ÷ then − 1) × 100</p>
                      </div>
                    </div>
                  </span>
                );
              })()}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-800 my-2 flex-shrink-0" />

          {/* Period change — synced to chart */}
          <div className="flex-shrink-0">
            <p className="text-slate-500 text-xs leading-none mb-0.5">{tilePeriod} change</p>
            <p className={`font-semibold text-sm tabular-nums ${changeColor}`}>{changeSign}{periodReturn.toFixed(1)}%</p>
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

        {/* Weight score + Velocity Score stacked */}
        <div className="flex flex-col items-end flex-shrink-0 w-16 gap-0.5" title={`Weight Score: ${equity.proScore.toFixed(1)}% | Coverage: ${(equity.coverage * 100).toFixed(0)}%`}>
          <span className="text-emerald-400 text-xs font-bold tabular-nums leading-none">
            {equity.proScore.toFixed(1)}% wt
          </span>
          {vs1w !== null ? (
            <span className={`text-xs font-bold tabular-nums leading-none ${vs1w >= 0 ? 'text-amber-400' : 'text-rose-400'}`}>
              {vs1w >= 0 ? '▲+' : '▼'}{Math.abs(vs1w).toFixed(1)}%
            </span>
          ) : (
            <span className="text-slate-700 text-[10px] leading-none">&mdash;</span>
          )}
        </div>

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

// ── How It Works guide ────────────────────────────────────────────────────────
function GuideStrip({ onClose }: { onClose: () => void }) {
  const steps = [
    {
      n: '1',
      label: 'ETF Holdings',
      color: 'text-sky-400',
      borderColor: 'border-sky-500/30',
      desc: 'Every day we read the published holdings of 28 major sector ETFs. These funds manage billions in real capital — their holdings are public record.',
      visual: (
        <div className="flex flex-wrap gap-1 mt-2">
          {['ARTY','BAI','SOXX','QQQ','AIRR'].map(t => (
            <span key={t} className="bg-slate-800 border border-slate-700 text-slate-400 text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded">{t}</span>
          ))}
          <span className="text-slate-600 text-[10px] self-center">+23 more</span>
        </div>
      ),
      pointer: null,
    },
    {
      n: '2',
      label: 'Pick a Theme',
      color: 'text-violet-400',
      borderColor: 'border-violet-500/30',
      desc: 'Choose a sector. Each theme groups 2–10 related ETFs. Top10 then ranks every stock those ETFs collectively hold.',
      visual: (
        <div className="flex flex-wrap gap-1 mt-2">
          {['AI & ML','Semis','Broad Tech'].map(t => (
            <span key={t} className={`border text-[10px] font-semibold px-2 py-0.5 rounded-full ${t === 'AI & ML' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>{t}</span>
          ))}
        </div>
      ),
      pointer: <span className="text-violet-500/60 text-xs mt-1 flex items-center gap-1">▲ <span className="text-slate-300">theme tabs above</span></span>,
    },
    {
      n: '3',
      label: 'The Scores',
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/30',
      desc: 'Weight Score tells you how much of their portfolio professional ETF managers put into this stock — on average, across every ETF that holds it. A 5.5% score means the average fund dedicates 5.5 cents of every dollar to this name. It then applies a Coverage Coefficient: a penalty if only a few ETFs hold it. One fund betting 10% counts far less than all ETFs in the theme agreeing at 5% — broad consensus matters. A stock held by all ETFs in its theme gets the full score. Held by only half, the score is reduced by roughly 30%. Velocity Score shows whether that conviction is growing or fading week over week.',
      visual: (
        <div className="flex flex-col mt-2 gap-0.5">
          <span className="text-emerald-400 font-bold text-sm tabular-nums leading-none">5.5<span className="text-xs font-medium text-emerald-500/70 ml-0.5">% avg wt</span></span>
          <span className="text-amber-400 font-bold text-sm tabular-nums leading-none">▲+4.6<span className="text-xs font-medium text-amber-400/60 ml-0.5">% VS 1W</span></span>
        </div>
      ),
      pointer: <span className="text-emerald-500/60 text-xs mt-1 flex items-center gap-1">↓ <span className="text-slate-300">on every tile</span></span>,
    },
    {
      n: '4',
      label: 'Sort & Rank',
      color: 'text-amber-400',
      borderColor: 'border-amber-500/30',
      desc: 'Default: highest conviction first (Avg Wt). Switch to Velocity to surface fast-movers climbing the list before they reach #1.',
      visual: (
        <div className="flex gap-1 mt-2">
          <span className="bg-slate-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md border border-slate-500">Avg Wt</span>
          <span className="bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded-md">▲ Velocity</span>
        </div>
      ),
      pointer: <span className="text-amber-500/60 text-xs mt-1 flex items-center gap-1">↓ <span className="text-slate-300">sort controls below</span></span>,
    },
    {
      n: '5',
      label: 'The Tile',
      color: 'text-slate-300',
      borderColor: 'border-slate-600/50',
      desc: 'Front face: scores, live price chart, period toggle. Tap to flip. Back face: ETF presence, key financials, Tony\'s analysis note.',
      visual: (
        <div className="flex gap-2 mt-2">
          <div className="flex-1 rounded border border-slate-700 bg-slate-800/60 px-2 py-1.5">
            <p className="text-[9px] text-slate-500 leading-none mb-0.5">FRONT</p>
            <p className="text-[10px] text-white font-bold leading-none">Score + Chart</p>
          </div>
          <span className="text-slate-600 self-center text-xs">↩</span>
          <div className="flex-1 rounded border border-emerald-900 bg-slate-800/60 px-2 py-1.5">
            <p className="text-[9px] text-slate-500 leading-none mb-0.5">BACK</p>
            <p className="text-[10px] text-white font-bold leading-none">ETFs + Thesis</p>
          </div>
        </div>
      ),
      pointer: <span className="text-slate-500/60 text-xs mt-1 flex items-center gap-1">↓ <span className="text-slate-300">tile grid below</span></span>,
    },
  ];

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 flex-1 flex flex-col overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold text-sm">How Top10 Works</span>
          <span className="text-slate-400 text-xs hidden sm:inline">— follow the steps below then explore the tiles</span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close guide"
          title="Close guide"
          className="text-slate-400 hover:text-white text-lg font-black leading-none w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-800 transition-colors flex-shrink-0"
        >
          ✕
        </button>
      </div>

      {/* Steps */}
      <div className="flex flex-col md:flex-row px-4 py-4 gap-3 md:gap-2 flex-1">
        {steps.map((step, i) => (
          <div key={step.n} className="flex md:flex-col flex-1 min-w-0">

            {/* Step card */}
            <div className={`flex-1 rounded-lg border ${step.borderColor} bg-slate-800/40 p-3 flex flex-col`}>
              {/* Number + label */}
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-5 h-5 rounded-full bg-slate-700 border border-slate-600 text-slate-200 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                  {step.n}
                </span>
                <span className={`text-sm font-bold ${step.color}`}>{step.label}</span>
              </div>
              {/* Description */}
              <p className="text-slate-200 text-xs leading-relaxed flex-1">{step.desc}</p>
              {/* Mini visual */}
              {step.visual}
              {/* Pointer arrow */}
              {step.pointer}
            </div>

            {/* Connector arrow — right side on md+, bottom on mobile (except last) */}
            {i < steps.length - 1 && (
              <>
                {/* Desktop: horizontal arrow to the right */}
                <div className="hidden md:flex items-center justify-center w-6 flex-shrink-0 pt-8">
                  <span className="text-slate-400 text-base">→</span>
                </div>
                {/* Mobile: vertical arrow downward */}
                <div className="md:hidden flex justify-center py-1">
                  <span className="text-slate-400 text-sm">↓</span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Bottom close (mobile only) — so you don't have to scroll back up */}
      <div className="md:hidden px-4 pb-4">
        <button
          onClick={onClose}
          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:border-slate-500 text-sm font-bold transition-colors"
        >
          Close guide ✕
        </button>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
// ── Top 10 Across All Themes — cross-theme breadth board ─────────────────────
function CrossThemeBoard({ onSelectTheme }: { onSelectTheme: (t: Theme) => void }) {
  const rows = CROSS_THEME_TOP10;
  return (
    <div className="max-w-7xl mx-auto px-4 pb-16 pt-4">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="text-amber-300">★</span> Top 10 Across All Themes
        </h2>
        <p className="text-slate-500 text-xs mt-1 max-w-2xl">
          Ranked by cross-theme breadth — the stocks held across the most institutional theme
          baskets. The widest-conviction names in the entire tracked universe. Meme theme excluded.
        </p>
      </div>

      {rows.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-12 text-center">
          <p className="text-slate-400 text-sm">Cross-theme ranking is being generated.</p>
          <p className="text-slate-600 text-xs mt-2">Refreshes on the next data run.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {rows.map((e, i) => {
            const pos = e.weeklyChange >= 0;
            return (
              <div
                key={e.ticker}
                className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3"
              >
                <span className="text-slate-500 font-bold tabular-nums w-6 text-right flex-shrink-0">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white font-mono">{e.ticker}</span>
                    <span className="text-slate-400 text-sm truncate">{e.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                    {e.themes.map(t => (
                      <button
                        key={t}
                        onClick={() => onSelectTheme(t)}
                        className="bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded-full hover:border-emerald-500/50 hover:text-emerald-300 transition-colors"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold px-2 py-0.5 rounded-full tabular-nums whitespace-nowrap">
                    {e.themeCount} themes
                  </span>
                  <div className="mt-1 text-xs tabular-nums">
                    <span className="text-slate-400">${e.price.toFixed(2)}</span>
                    <span className={`ml-2 font-bold ${pos ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {pos ? '+' : ''}{e.weeklyChange.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [theme,   setTheme]   = useState<Theme>('AI & ML');
  const [period,  setPeriod]  = useState<Period>('6M');
  const [tagline, setTagline] = useState(false);
  const [welcome, setWelcome] = useState(false);
  const [layout,    setLayout]    = useState<'grid' | 'compact'>('grid');
  const [sortBy,    setSortBy]    = useState<'wt' | 'vs'>('wt');
  const [showGuide, setShowGuide] = useState(false);
  const [showNew,   setShowNew]   = useState(false);
  const [showAll,   setShowAll]   = useState(false);
  const [expanded,  setExpanded]  = useState<string | null>(null);
  const [crossView, setCrossView] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTagline(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const seen = localStorage.getItem('top10_welcomed');
    if (!seen) setWelcome(true);
    const guideDone = localStorage.getItem('top10_guide_done');
    if (!guideDone) setShowGuide(true);
  }, []);

  // Reset pagination + expanded when switching theme, layout, or sort
  useEffect(() => { setShowAll(false); setExpanded(null); }, [theme, layout, sortBy]);

  const closeWelcome = () => {
    setWelcome(false);
    localStorage.setItem('top10_welcomed', '1');
  };

  const closeGuide = () => {
    setShowGuide(false);
    localStorage.setItem('top10_guide_done', '1');
  };

  const newCount = THEMES.reduce((sum, t) => sum + SAMPLE_DATA[t].filter(e => e.isNew).length, 0);

  const equities = SAMPLE_DATA[theme];
  const sortedEquities = sortBy === 'wt'
    ? equities
    : [...equities].sort((a, b) => {
        const va = a.velocityScore?.['1W'] ?? -Infinity;
        const vb = b.velocityScore?.['1W'] ?? -Infinity;
        return vb - va;
      });
  const etfs     = THEME_ETFS[theme];
  const maxScore = THEME_ETF_COUNT[theme];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {welcome && <WelcomeModal onClose={closeWelcome} />}
      {showNew && <NewEntrantsModal onClose={() => setShowNew(false)} onSelectTheme={t => setTheme(t)} />}

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-start justify-between gap-4">

          {/* Left: logo + badge */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold tracking-tight">
              <span className="text-emerald-400">Top</span>10
            </h1>
            <div
              className="mt-2.5 sm:mt-1.5"
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
              <button
                onClick={() => setCrossView(v => !v)}
                title="Top 10 stocks ranked across all themes by breadth"
                className={`flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-bold transition-colors ${
                  crossView
                    ? 'bg-amber-500/25 border-amber-500/50 text-amber-200'
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20 hover:border-amber-500/50'
                }`}
              >
                ★ All-Theme Top 10
              </button>
            </nav>
            <div className="hidden sm:flex justify-end max-w-full overflow-x-auto scrollbar-none">
              <div className="flex items-center bg-slate-800 rounded-full p-0.5 text-xs font-bold border border-slate-700 flex-shrink-0">
                {THEMES.map(s => (
                  <button
                    key={s}
                    onClick={() => { setCrossView(false); setTheme(s); }}
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
                onClick={() => { setCrossView(false); setTheme(s); }}
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

      {crossView ? (
        <CrossThemeBoard onSelectTheme={(t) => { setCrossView(false); setTheme(t); }} />
      ) : (
      <>
      {/* ETF badges row */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-slate-500 text-xs">Tracking:</span>
          {etfs.map(etf => (
            <span key={etf} className="bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full">
              {etf}
            </span>
          ))}
          {/* Guide button (mobile only) — pushed to the far end, accent-coloured to
              stand apart from the slate ETF badges. Desktop uses the controls-row button. */}
          {!showGuide && (
            <button
              onClick={() => setShowGuide(true)}
              title="How it works"
              className="sm:hidden ml-auto flex items-center gap-1.5 px-3 py-0.5 rounded-full border text-xs font-bold transition-colors bg-emerald-500/15 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25"
            >
              Guide ?
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {equities.length > 0 ? (
          <>
            {/* Index chart OR guide + ETF summary tile */}
            <div className="flex items-stretch gap-4 mb-6">
              {showGuide
                ? <GuideStrip onClose={closeGuide} />
                : <IndexChart theme={theme} period={period} setPeriod={setPeriod} />
              }
              <div className="hidden sm:block flex-shrink-0 h-full">
                <EtfPerfTile theme={theme} period={period} />
              </div>
            </div>

            {/* Legend + sort toggle + layout toggle */}
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

              {/* New Entrants button — shown when new equities exist */}
              {newCount > 0 && (
                <button
                  onClick={() => setShowNew(n => !n)}
                  title="New entrants — first time in the Top 20 today"
                  className={`ml-auto flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-semibold transition-colors ${
                    showNew
                      ? 'bg-amber-500/25 border-amber-500/50 text-amber-200'
                      : 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:border-amber-500/50 hover:bg-amber-500/20'
                  }`}
                >
                  ✦ New
                  <span className="bg-amber-500/30 border border-amber-500/40 text-amber-200 text-[10px] font-bold px-1.5 py-0.5 rounded-full tabular-nums leading-none">
                    {newCount}
                  </span>
                </button>
              )}

              {/* Sort toggle */}
              <div className={`${newCount === 0 ? 'sm:ml-auto' : ''} flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 gap-0.5`}>
                <button
                  onClick={() => setSortBy('wt')}
                  title="Sort by Weight Score (avg ETF weighting × coverage)"
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                    sortBy === 'wt'
                      ? 'bg-slate-600 text-white'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Avg Wt
                </button>
                <button
                  onClick={() => setSortBy('vs')}
                  title="Sort by Velocity Score — fastest-rising Weight Scores first"
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                    sortBy === 'vs'
                      ? 'bg-amber-500/25 text-amber-300 border border-amber-500/30'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  ▲ Velocity
                </button>
              </div>

              {/* Layout toggle */}
              <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 gap-0.5">
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

              {/* Guide re-open button (desktop) — last & clearly separated.
                  Hidden while the guide is open (the guide box has its own ✕).
                  Mobile uses the separate button in the ETF "Tracking" row. */}
              {!showGuide && (
                <button
                  onClick={() => setShowGuide(true)}
                  title="How it works"
                  className="hidden sm:flex sm:ml-6 items-center justify-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-semibold transition-colors bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-500"
                >
                  Guide ?
                </button>
              )}
            </div>

            {/* Grid layout: first 10, then Next 10 button */}
            {layout === 'grid' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {(showAll ? sortedEquities : sortedEquities.slice(0, 10)).map(eq => (
                    <EquityTile key={eq.ticker} equity={eq} etfs={etfs} maxScore={maxScore} />
                  ))}
                </div>
                {!showAll && sortedEquities.length > 10 && (
                  <div className="mt-5 text-center">
                    <button
                      onClick={() => setShowAll(true)}
                      className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-slate-700 bg-slate-900 hover:border-slate-500 hover:bg-slate-800 text-slate-300 hover:text-white text-sm font-semibold transition-all"
                    >
                      Next {sortedEquities.length - 10} →
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Compact list layout: all 20, click to expand */}
            {layout === 'compact' && (
              <div className="flex flex-col gap-1.5">
                {sortedEquities.map((eq, i) => (
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
      </>
      )}

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
