'use client';

import { useState, useEffect } from 'react';
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
function makeTilePrices(ticker: string, currentPrice: number, weeklyChange: number, period: Period): number[] {
  const seed = ticker.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const nMap:  Record<Period, number> = { '1W': 5, '1M': 21, '6M': 26, '1Y': 52 };
  const scale: Record<Period, number> = { '1W': 1, '1M': 3.4, '6M': 10.5, '1Y': 19 };
  const n           = nMap[period];
  const finalReturn = weeklyChange * scale[period];
  const startPrice  = currentPrice / (1 + finalReturn / 100);
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

// ── Easy score badge ──────────────────────────────────────────────────────────
function EasyScoreBadge({ score, maxScore }: { score: number; maxScore: number }) {
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

// ── Equity tile ───────────────────────────────────────────────────────────────
function EquityTile({ equity, etfs, maxScore }: { equity: Equity; etfs: string[]; maxScore: number }) {
  const [flipped,    setFlipped]    = useState(false);
  const [tilePeriod, setTilePeriod] = useState<Period>('1W');

  const tilePrices  = makeTilePrices(equity.ticker, equity.price, equity.weeklyChange, tilePeriod);
  const positive    = tilePrices[tilePrices.length - 1] >= tilePrices[0];
  const changeColor = equity.weeklyChange >= 0 ? 'text-emerald-400' : 'text-rose-400';
  const changeSign  = equity.weeklyChange >= 0 ? '+' : '';

  const peStr  = equity.pe !== null ? `${equity.pe}x` : 'N/A';
  const divStr = equity.dividendYield !== null ? `${equity.dividendYield.toFixed(1)}%` : 'None';
  const revStr = `${equity.revenueGrowth > 0 ? '+' : ''}${equity.revenueGrowth}%`;

  const domain   = TICKER_DOMAINS[equity.ticker];
  const logoUrl  = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64` : null;

  return (
    <div
      className="relative cursor-pointer"
      style={{ perspective: '1000px', height: '400px' }}
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
            <EasyScoreBadge score={equity.easyScore} maxScore={maxScore} />
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
          <div className="border-t border-slate-800 my-2 flex-shrink-0" />

          {/* Weight Score */}
          <div className="flex-shrink-0">
            <p className="text-slate-500 text-xs leading-none mb-0.5">Weight Score</p>
            <p className="text-emerald-400 font-bold text-sm tabular-nums">{equity.proScore.toFixed(1)}% avg wt</p>
          </div>

          {/* Chart */}
          <div className="mt-auto -mx-1">
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
          <div className="flex items-center justify-between flex-shrink-0">
            <div>
              <p className="text-white font-bold text-sm">{equity.ticker}</p>
              <p className="text-slate-500 text-xs truncate">{equity.name}</p>
            </div>
            <EasyScoreBadge score={equity.easyScore} maxScore={maxScore} />
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
            { icon: '◆', label: 'Easy Score', desc: 'How many ETFs in this theme hold this stock (x/n, relative to the theme).' },
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
  const [theme,  setTheme]  = useState<Theme>('AI & ML');
  const [period,  setPeriod]  = useState<Period>('6M');
  const [tagline, setTagline] = useState(false);
  const [welcome, setWelcome] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTagline(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const seen = localStorage.getItem('top10_welcomed');
    if (!seen) setWelcome(true);
  }, []);

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

            {/* Legend + score explanation */}
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
              <span className="text-slate-600 text-xs ml-auto hidden sm:block">Weight Score = avg weight in holding ETFs</span>
            </div>

            {/* Tile grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {equities.map(eq => (
                <EquityTile key={eq.ticker} equity={eq} etfs={etfs} maxScore={maxScore} />
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-12 text-center">
            <p className="text-slate-400 text-sm">Data coming soon for {theme}.</p>
            <p className="text-slate-600 text-xs mt-2">Scraper launching shortly.</p>
          </div>
        )}
      </div>

    </main>
  );
}
