'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Logo from '@/app/components/Logo';
import {
  Theme,
  Equity,
  Period,
  ChartPeriod,
  ChartPeriodData,
  THEMES,
  THEME_ETFS,
  THEME_BENCHMARKS,
  THEME_BENCHMARK_ETF,
  THEME_ETF_COUNT,
  ETF_RETURNS,
  ETF_DAY_CHANGE,
  SPY_RET,
  SAMPLE_DATA,
  INDEX_CHART_DATA,
  SCAN_TIMESTAMP_NY,
  CROSS_THEME_TOP10,
  ETF_TOP_HOLDINGS,
  ETF_INFO,
  HOLDINGS_COUNT,
} from '@/lib/data';
import { fmtMoney } from '@/lib/format';

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
  // Non-US listings
  PRY:  'prysmian.com',  TSM:  'tsmc.com',        LIN:  'linde.com',
  ASML: 'asml.com',
  // Semiconductors & photonics
  NXPI: 'nxp.com',       COHR: 'coherent.com',    LITE: 'lumentum.com',
  RMBS: 'rambus.com',    CDNS: 'cadence.com',
  // Software & cloud
  ORCL: 'oracle.com',    PANW: 'paloaltonetworks.com', SHOP: 'shopify.com',
  CRWD: 'crowdstrike.com',  NET: 'cloudflare.com',
  // Industrials & power
  AEP:  'aep.com',       XEL:  'xcelenergy.com',  UNP:  'up.com',
  GD:   'gd.com',        TKR:  'timken.com',       GTES: 'gates.com',
  MOD:  'modine.com',    AIT:  'applied.com',      APH:  'amphenol.com',
  CGNX: 'cognex.com',
  HWM:  'howmet.com',    BWXT: 'bwxt.com',         KTOS: 'kratosdefense.com',
  HII:  'hii.com',       RBC:  'rbcbearings.com',  MRCY: 'mrcy.com',
  DRS:  'leonardodrs.com', TPC: 'tutorperini.com',
  // Energy & utilities (additional)
  CEG:  'constellationenergy.com', NRG: 'nrg.com', WMB: 'williams.com',
  SU:   'se.com',
  // Clean energy
  BLDP: 'ballard.com',   SHLS: 'shoals.com',
  // Space & energy
  SPCE: 'virgingalactic.com', OKLO: 'oklo.com',   HYLN: 'hyliion.com',
  CIFR: 'ciphermining.com',   RGTI: 'rigetti.com',
};

// ── Ticker → display name fallback (used when scraped name is blank or ticker-only) ──
const TICKER_NAMES: Record<string, string> = {
  NET:  'Cloudflare',
  CRWD: 'CrowdStrike',  PANW: 'Palo Alto Networks',
  ASTS: 'AST SpaceMobile', RDW: 'Redwire',
  AAOI: 'Applied Optoelectronics', LUNR: 'Intuitive Machines',
  IREN: 'IREN Ltd',   NBIS: 'Nebius Group',
  QBTS: 'D-Wave Quantum', ONDS: 'Ondas Holdings',
  APLD: 'Applied Digital', IONQ: 'IonQ',
  RKLB: 'Rocket Lab', TE:   'T1 Energy',
  AXTI: 'AXT Inc',    NVTS: 'Navitas Semiconductor',
  WOLF: 'Wolfspeed',  BE:   'Bloom Energy',
  SNDK: 'Sandisk',    ASML: 'ASML Holding',
  LIN:  'Linde plc',  OKLO: 'Oklo Inc',
  RGTI: 'Rigetti Computing', TKR: 'Timken Company',
  CGNX: 'Cognex Corporation', GTES: 'Gates Industrial',
};
function displayName(ticker: string, scraped: string): string {
  const n = (scraped || '').trim();
  if (n && n !== ticker) return n;
  return TICKER_NAMES[ticker] ?? ticker;
}

// ── Per-tile x-axis labels per period ─────────────────────────────────────────
const TILE_XLABELS: Record<ChartPeriod, string[]> = {
  '1D': ['Open', 'Midday', 'Now'],
  '1W': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  '1M': ['May 1', 'May 15', 'Jun 1'],
  'YTD': ['Jan', 'Mar', 'May'],
  '6M': ['Nov', 'Jan', 'Mar', 'May'],
  '1Y': ["May '25", "Nov '25", "May '26"],
};

// ── Generate deterministic price path for a tile chart ───────────────────────
function makeTilePrices(ticker: string, currentPrice: number, periodReturn: number, period: ChartPeriod): number[] {
  const seed = ticker.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const nMap:  Record<ChartPeriod, number> = { '1D': 8, '1W': 5, '1M': 21, 'YTD': 26, '6M': 26, '1Y': 52 };
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
const PERIODS: ChartPeriod[] = ['1D', '1W', '1M', 'YTD', '6M', '1Y'];

function IndexChart({ theme, period, setPeriod }: { theme: Theme; period: ChartPeriod; setPeriod: (p: ChartPeriod) => void }) {
  // 1D may be absent until a price build produces intraday data — fall back to 1W.
  const d: ChartPeriodData = INDEX_CHART_DATA[theme][period] ?? INDEX_CHART_DATA[theme]['1W'];

  const VW = 800; const VH = 260;
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
    <div className="flex-1 min-w-0 max-w-lg flex">
      <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 pt-3 pb-3 flex-1 flex flex-col">

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
function EtfPerfTile({ theme, period }: { theme: Theme; period: ChartPeriod }) {
  const etfs = THEME_ETFS[theme];
  const etfCount = THEME_ETF_COUNT[theme];

  // Which row's holdings tooltip is open. Mouse hover drives it on desktop;
  // tap toggles it on touch devices (which never fire :hover).
  const [openEtf, setOpenEtf] = useState<string | null>(null);
  const [showAllEtfs, setShowAllEtfs] = useState(false);

  const rows = etfs
    .map(ticker => ({
      ticker,
      ret: period === '1D' ? (ETF_DAY_CHANGE[ticker] ?? 0) : (ETF_RETURNS[ticker]?.[period] ?? 0),
    }))
    .sort((a, b) => b.ret - a.ret);

  const PREVIEW_COUNT = 4;
  const visibleRows = showAllEtfs ? rows : rows.slice(0, PREVIEW_COUNT);

  const maxAbs = Math.max(...rows.map(r => Math.abs(r.ret)), 0.1);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 flex flex-col gap-3 w-80 lg:w-96 flex-shrink-0 h-full">

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
        {visibleRows.map(({ ticker, ret }) => {
          const pos      = ret >= 0;
          const barPct   = (Math.abs(ret) / maxAbs) * 100;
          const holdings = ETF_TOP_HOLDINGS[ticker] ?? [];
          const info     = ETF_INFO[ticker];
          const open     = openEtf === ticker;
          return (
            <div
              key={ticker}
              className="cursor-pointer select-none"
              onPointerEnter={e => { if (e.pointerType === 'mouse') setOpenEtf(ticker); }}
              onPointerLeave={e => { if (e.pointerType === 'mouse') setOpenEtf(null); }}
              onClick={() => setOpenEtf(prev => (prev === ticker ? null : ticker))}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className={`text-xs font-mono font-bold border-b border-dotted ${open ? 'text-white border-emerald-500/60' : 'text-slate-300 border-slate-700'}`}>{ticker}</span>
                <span className={`text-xs font-bold tabular-nums ${pos ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {pos ? '+' : ''}{ret.toFixed(1)}%
                </span>
              </div>
              {info && (
                <div className="mb-1 leading-tight truncate text-[11px] text-slate-300">
                  {info.name}
                  {info.manager && <span className="text-slate-500"> ({info.manager.split(' ')[0]})</span>}
                </div>
              )}
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${pos ? 'bg-emerald-500/50' : 'bg-rose-500/50'}`}
                  style={{ width: `${barPct}%` }}
                />
              </div>

              {/* Top holdings — inline expansion. It takes real layout space and pushes
                  the rows below it down, so it never overlays another ETF's data. */}
              {holdings.length > 0 && open && (
                <div className="mt-2 ml-auto w-28 rounded-md border border-slate-800 bg-slate-950/50 px-2.5 py-2">
                  <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wide mb-1.5">Top holdings</p>
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

      {/* Show more / less toggle */}
      {rows.length > PREVIEW_COUNT && (
        <button
          onClick={() => setShowAllEtfs(v => !v)}
          className="text-[10px] font-semibold text-slate-500 hover:text-emerald-400 transition-colors text-center mt-auto"
        >
          {showAllEtfs ? '▲ show less' : `▼ show all ${rows.length} ETFs`}
        </button>
      )}

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
        ? 'bg-emerald-500/15 border-emerald-500/35 text-emerald-400'
        : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
    }`}>
      {pos ? '+' : ''}{vs.toFixed(1)}% {period}
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
    ? ` Looking at the past month, Weight Score is ${vs1m >= 0 ? 'up' : 'down'} ${Math.abs(vs1m).toFixed(1)}%, ${Math.abs(vs1w) > Math.abs(vs1m) ? 'the weekly move is outpacing the monthly trend, suggesting acceleration' : 'broadly consistent with the recent trend'}.`
    : '';

  let text: string;
  if (vs1w >= 50) {
    text = `Exceptional accumulation this week. ${ticker}'s Weight Score surged +${vs1w.toFixed(1)}%, a move of this magnitude reflects a coordinated increase across multiple ETF managers simultaneously, not just passive price drift. At ${proScore.toFixed(1)}% average weighting the absolute conviction is already high; this acceleration suggests it has further to run.${mCtx}`;
  } else if (vs1w >= 20) {
    text = `Strong positive momentum. Weight Score is up +${vs1w.toFixed(1)}% this week, signalling that ETF managers are actively building their ${ticker} positions, increasing portfolio weight, not just riding price.${mCtx}`;
  } else if (vs1w >= 5) {
    text = `Gradual accumulation. ${ticker}'s Weight Score nudged up +${vs1w.toFixed(1)}% this week. A steady drip of adds across the ETF basket, conviction is growing, not plateauing.${mCtx}`;
  } else if (vs1w >= -5) {
    text = `Conviction is stable. Weight Score moved ${vs1w >= 0 ? '+' : ''}${vs1w.toFixed(1)}% this week, with no meaningful adds or trims at the ETF level. ${ticker} is holding its place in the institutional allocation.${mCtx}`;
  } else if (vs1w >= -20) {
    text = `Slight fading. Weight Score slipped ${vs1w.toFixed(1)}% this week. Some ETF managers appear to be trimming ${ticker} at the margin. The stock remains broadly held, but the short-term momentum is not in its favour.${mCtx}`;
  } else {
    text = `Notable de-weighting. Weight Score fell ${vs1w.toFixed(1)}% this week, a sharp move that suggests active trimming across the ETF basket, not just price-driven rebalancing. Whether this is tactical profit-taking or a shift in longer-term conviction around ${ticker} warrants watching closely.${mCtx}`;
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
  const avgWt = equity.avgWeight ?? (equity.coverage > 0 ? equity.proScore / equity.coverage : equity.proScore);

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
                <p className="text-emerald-400 text-base font-extrabold leading-tight mb-2">Tony&apos;s Thesis</p>
                <p className="text-white font-bold text-sm leading-tight truncate">{displayName(equity.ticker, equity.name)}</p>
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
                <p className="text-white font-bold text-2xl tabular-nums">{avgWt.toFixed(1)}%</p>
                <p className="text-slate-600 text-[10px] mt-0.5">avg across {holdingEtfs.length} ETFs</p>
              </div>
              <div className="flex-1 min-w-[4.5rem] bg-slate-800/60 rounded-xl p-3 text-center">
                <p className="text-slate-500 text-xs mb-1">Weight Score</p>
                <p className="text-white font-bold text-2xl tabular-nums">{equity.proScore.toFixed(1)}%</p>
                <p className="text-slate-600 text-[10px] mt-0.5">avg × {(equity.coverage * 100).toFixed(0)}%</p>
              </div>
              <div className="flex-1 min-w-[4.5rem] bg-slate-800/60 rounded-xl p-3 text-center">
                <p className="text-slate-500 text-xs mb-1">ETF Count</p>
                <p className="text-emerald-400 font-bold text-2xl tabular-nums">{equity.easyScore}/{maxScore}</p>
                <p className="text-slate-600 text-[10px] mt-0.5">ETFs holding</p>
              </div>
              {equity.velocityScore?.['1W'] !== null && equity.velocityScore?.['1W'] !== undefined && (
                <div className="flex-1 min-w-[4.5rem] bg-slate-800/60 rounded-xl p-3 text-center">
                  <p className="text-slate-500 text-xs mb-1">Velocity</p>
                  <p className={`font-bold text-2xl tabular-nums ${(equity.velocityScore['1W'] ?? 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
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
                <Stat label="EPS"        value={fmtMoney(equity.eps, equity.currency)} />
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
              const accentBg    = vsNote.positive ? 'bg-emerald-500/8 border-emerald-500/25' : 'bg-rose-500/8 border-rose-500/20';
              const accentLabel = vsNote.positive ? 'text-emerald-400' : 'text-rose-400';
              const arrow       = vsNote.positive ? '+' : '-';
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
function EquityTile({ equity, etfs, maxScore, autoOpen }: { equity: Equity; etfs: string[]; maxScore: number; autoOpen?: boolean }) {
  const [flipped,     setFlipped]     = useState(false);
  const [tilePeriod,  setTilePeriod]  = useState<ChartPeriod>('1W');
  const [wtOpen,      setWtOpen]      = useState(false);
  const [vsOpen,      setVsOpen]      = useState(false);
  const [thesisOpen,  setThesisOpen]  = useState(false);

  // Auto-open the weight tooltip on the 2nd tile for 3s — fires only once ever (localStorage flag)
  useEffect(() => {
    if (!autoOpen) return;
    if (typeof window === 'undefined') return;
    if (localStorage.getItem('top10_tooltip_shown')) return;
    localStorage.setItem('top10_tooltip_shown', '1');
    const open  = setTimeout(() => setWtOpen(true),  800);
    const close = setTimeout(() => setWtOpen(false), 3800);
    return () => { clearTimeout(open); clearTimeout(close); };
  }, [autoOpen]);

  // Close any open tooltip on the next click anywhere in the document (mobile fix)
  useEffect(() => {
    if (!wtOpen && !vsOpen) return;
    const close = () => { setWtOpen(false); setVsOpen(false); };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [wtOpen, vsOpen]);

  const rawHistory   = equity.priceHistory?.[tilePeriod];
  const baseReturn   = tilePeriod === '1D' ? (equity.dayChange ?? 0)
                     : tilePeriod === '1W' ? equity.weeklyChange
                     : equity.periodReturns[tilePeriod];
  const tilePrices   = (rawHistory && rawHistory.length >= 2)
                       ? rawHistory
                       : makeTilePrices(equity.ticker, equity.price, baseReturn, tilePeriod);
  const periodReturn = (rawHistory && rawHistory.length >= 2)
                       ? parseFloat(((rawHistory[rawHistory.length - 1] / rawHistory[0] - 1) * 100).toFixed(1))
                       : baseReturn;
  const positive     = tilePrices[tilePrices.length - 1] >= tilePrices[0];
  const changeColor  = periodReturn >= 0 ? 'text-emerald-400' : 'text-rose-400';
  const changeSign   = periodReturn >= 0 ? '+' : '';

  // Only 1W VS data exists for now; always show VS 1W regardless of chart period
  const tileVsPeriod = '1W' as const;
  const tileVsVal    = equity.velocityScore?.[tileVsPeriod] ?? null;

  const peStr  = equity.pe !== null ? `${equity.pe}x` : 'N/A';
  const divStr = equity.dividendYield !== null ? `${equity.dividendYield.toFixed(1)}%` : 'None';
  const revStr = `${equity.revenueGrowth > 0 ? '+' : ''}${equity.revenueGrowth}%`;
  const avgWt  = equity.avgWeight ?? (equity.coverage > 0 ? equity.proScore / equity.coverage : equity.proScore);

  const domain   = TICKER_DOMAINS[equity.ticker];
  const logoUrl  = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64` : null;

  return (
    <>
    <div
      className="relative cursor-pointer"
      style={{ perspective: '1000px', height: '564px' }}
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
                <p className="text-white font-bold text-sm leading-tight">{displayName(equity.ticker, equity.name)}</p>
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
              {fmtMoney(equity.price, equity.currency)}
            </p>
            <div className="flex flex-col items-end gap-1.5">
              {/* avg wt */}
              <span className="relative group" onClick={e => { e.stopPropagation(); setWtOpen(o => !o); setVsOpen(false); }}>
                <span className="text-white font-bold text-2xl tabular-nums leading-none cursor-pointer">
                  {equity.proScore.toFixed(1)}<span className="text-sm font-medium text-slate-400 ml-0.5">% avg wt</span>
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
                      <span className="text-slate-400 text-xs">Coverage coeff</span>
                      <span className="text-slate-100 text-xs font-bold tabular-nums">×{equity.coverage.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </span>

              {/* VS — same size as avg wt, directly below */}
              {tileVsVal !== null && (() => {
                const pastScore = equity.proScore / (1 + tileVsVal / 100);
                const vsColor   = tileVsVal >= 0 ? 'text-emerald-400' : 'text-rose-400';
                const vsSign    = tileVsVal >= 0 ? '+' : '-';
                return (
                  <span className="relative group" onClick={e => { e.stopPropagation(); setVsOpen(o => !o); setWtOpen(false); }}>
                    <span className={`${vsColor} font-bold text-2xl tabular-nums leading-none cursor-pointer`}>
                      {vsSign}{Math.abs(tileVsVal).toFixed(1)}<span className="text-sm font-medium ml-0.5 opacity-70">% VS {tileVsPeriod}</span>
                    </span>
                    {/* Tooltip: VS calculation */}
                    <div className={`absolute right-0 top-full mt-1.5 w-52 rounded-lg border border-slate-700 bg-slate-950 p-3 shadow-xl z-50 transition-opacity duration-150 pointer-events-none ${vsOpen ? 'visible opacity-100' : 'invisible opacity-0 group-hover:visible group-hover:opacity-100'}`}>
                      <p className="text-slate-400 text-xs font-semibold mb-2">Velocity Score, {tileVsPeriod} window</p>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 text-xs">Weight Score now</span>
                          <span className="text-white text-xs font-bold tabular-nums">{equity.proScore.toFixed(2)}%</span>
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

          <p className="text-slate-700 text-xs pt-1 text-right">Flip for details</p>
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
                <p className="text-slate-500 text-xs truncate">{displayName(equity.ticker, equity.name)}</p>
              </div>
              <CoverageScoreBadge score={equity.easyScore} maxScore={maxScore} />
            </div>
            <div className="flex items-center gap-2 mt-1.5 tabular-nums flex-wrap">
              <span className="text-white font-bold text-sm">{equity.proScore.toFixed(1)}% wt</span>
              <span className="text-slate-700">|</span>
              <span className="text-slate-200 font-semibold text-xs">{(equity.coverage * 100).toFixed(0)}% coverage</span>
              <span className="text-slate-700">|</span>
              <span className="text-slate-200 font-semibold text-xs">coeff ×{equity.coverage.toFixed(2)}</span>
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
            <div className="flex flex-wrap gap-1 max-h-[58px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700">
              {etfs.map(etf => {
                const val = equity.etfPresence[etf];
                const held = val !== false && val !== 0;
                return (
                  <span
                    key={etf}
                    className={`inline-flex items-center gap-1 text-xs font-mono font-bold px-2 py-0.5 rounded-full border cursor-default select-none ${
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
              <Stat label="EPS"        value={fmtMoney(equity.eps, equity.currency)} />
              <Stat label="Grs Margin" value={`${equity.grossMargin}%`} highlight={equity.grossMargin > 55} />
              <Stat label="Dividend"   value={divStr} />
            </div>
          </div>

          {/* Tony's note */}
          <div className="flex-1 min-h-0 flex flex-col">
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1.5 flex-shrink-0">
              Analysis
            </p>
            <div className="flex-1 min-h-[120px] overflow-y-auto rounded-lg bg-slate-800/40 px-2.5 py-2 scrollbar-thin scrollbar-thumb-slate-700">
              <p className="text-slate-300 text-[11px] leading-relaxed">{equity.tonyNote.replace(/\s*Analysis pending[^.]*\.\s*$/, '').trim()}</p>
            </div>
          </div>

          {/* Footer: full thesis button + flip hint */}
          <div className="flex items-center justify-between flex-shrink-0 pt-1">
            <button
              className="text-emerald-600 hover:text-emerald-400 text-xs font-semibold transition-colors"
              onClick={e => { e.stopPropagation(); setThesisOpen(true); }}
            >
              Tony&apos;s full thesis
            </button>
            <span className="text-slate-700 text-xs">Flip back</span>
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
        <span className="text-slate-400 text-xs truncate flex-1 min-w-0 hidden sm:block">{displayName(equity.ticker, equity.name)}</span>

        {/* Price */}
        <span className="text-white font-bold text-xs tabular-nums flex-shrink-0 w-16 text-right">
          {equity.price >= 1000
            ? fmtMoney(equity.price, equity.currency, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
            : fmtMoney(equity.price, equity.currency)}
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
            <span className={`text-xs font-bold tabular-nums leading-none ${vs1w >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {vs1w >= 0 ? '+' : '-'}{Math.abs(vs1w).toFixed(1)}%
            </span>
          ) : (
            <span className="text-slate-700 text-[10px] leading-none">&mdash;</span>
          )}
        </div>

        {/* Coverage score badge */}
        <div className="w-12 flex justify-center flex-shrink-0">
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
          Stockscout is an ETF holdings analyser for professional traders and investors.
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
  const [expanded, setExpanded] = useState(false);
  const steps = [
    {
      n: '1',
      label: 'ETF Holdings',
      color: 'text-sky-400',
      borderColor: 'border-sky-500/30',
      desc: 'Every day we read the published holdings of 40 actively managed sector ETFs. These funds manage billions in real capital. Their holdings are public record.',
      visual: (
        <div className="flex flex-wrap gap-1 mt-2">
          {['ARTY','BAI','SOXX','ARKK','AIRR'].map(t => (
            <span key={t} className="bg-slate-800 border border-slate-700 text-slate-400 text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded cursor-default select-none">{t}</span>
          ))}
          <span className="text-slate-600 text-[10px] self-center">+35 more</span>
        </div>
      ),
      pointer: null,
    },
    {
      n: '2',
      label: 'Pick a Theme',
      color: 'text-violet-400',
      borderColor: 'border-violet-500/30',
      desc: 'Choose a sector. Each theme groups 3–13 actively managed ETFs. Stockscout then ranks every stock those ETFs collectively hold.',
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
      desc: 'Stocks are ranked first by how many ETFs in the theme hold them — breadth of conviction comes first. When two stocks are held by the same number of ETFs, the average portfolio weight breaks the tie. A stock held by 9 out of 11 ETFs always ranks above one held by 5, even if that 5-ETF stock carries a higher individual weight. The Weight Score shown on each tile is avg weight x coverage — a single number combining both signals. Velocity Score shows whether that conviction is growing or fading week over week.',
      visual: (
        <div className="flex flex-col mt-2 gap-0.5">
          <span className="text-white font-bold text-sm tabular-nums leading-none">5.5<span className="text-xs font-medium text-slate-400 ml-0.5">% avg wt</span></span>
          <span className="text-emerald-400 font-bold text-sm tabular-nums leading-none">+4.6<span className="text-xs font-medium text-emerald-400/60 ml-0.5">% VS 1W</span></span>
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
    <div className={`rounded-xl border border-slate-700 bg-slate-900 flex flex-col overflow-hidden flex-1${expanded ? '' : ' self-start w-full'}`}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold text-sm">How Stockscout Works</span>
          <span className="text-slate-400 text-xs hidden sm:inline">follow the steps below then explore the tiles</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setExpanded(e => !e)}
            className="text-slate-400 hover:text-white text-xs font-semibold px-2 py-1 rounded-lg hover:bg-slate-800 transition-colors flex-shrink-0"
          >
            {expanded ? '▲ collapse' : '▼ expand'}
          </button>
          <button
            onClick={onClose}
            aria-label="Close guide"
            title="Close guide"
            className="text-slate-400 hover:text-white text-lg font-black leading-none w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-800 transition-colors flex-shrink-0"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Compact preview — shown when collapsed */}
      {!expanded && (
        <>
          <div className="flex flex-col md:flex-row px-4 py-3 gap-2">
            {steps.map(s => (
              <div key={s.n} className={`flex-1 rounded-lg border ${s.borderColor} bg-slate-800/40 px-3 py-2 flex flex-col gap-1 min-w-0`}>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-700 border border-slate-600 text-slate-200 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                    {s.n}
                  </span>
                  <span className={`text-xs font-bold ${s.color}`}>{s.label}</span>
                </div>
                <p className="text-slate-400 text-[10px] leading-snug line-clamp-2">{s.desc}</p>
              </div>
            ))}
          </div>
          {/* Expand nudge arrow */}
          <button
            onClick={() => setExpanded(true)}
            className="flex flex-col items-center gap-0.5 pb-2 text-slate-500 hover:text-emerald-400 transition-colors group"
          >
            <span className="text-[10px] font-semibold group-hover:text-emerald-400">expand guide</span>
            <span className="text-base leading-none animate-bounce">▼</span>
          </button>
        </>
      )}

      {/* Steps — only shown when expanded */}
      {expanded && (
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

              {/* Connector arrow */}
              {i < steps.length - 1 && (
                <>
                  <div className="hidden md:flex items-center justify-center w-6 flex-shrink-0 pt-8">
                    <span className="text-slate-400 text-base">→</span>
                  </div>
                  <div className="md:hidden flex justify-center py-1">
                    <span className="text-slate-400 text-sm">↓</span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Bottom-right close — desktop only */}
      <div className="hidden md:flex justify-end px-4 pb-3">
        <button
          onClick={onClose}
          className="flex items-center gap-1 text-slate-500 hover:text-white text-xs font-semibold px-2 py-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <span className="font-black text-base leading-none">✕</span>
        </button>
      </div>

      {/* Bottom close (mobile only) — so you don't have to scroll back up */}
      <div className="md:hidden px-4 pb-4">
        <button
          onClick={onClose}
          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:border-slate-500 text-sm font-bold transition-colors"
        >
          Close guide
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
          Ranked by cross-theme breadth, the stocks held across the most institutional theme
          baskets. The widest-conviction names in the entire tracked universe.
          Ranking: ETF count first, avg weight across all themes as tiebreaker. (Meme theme excluded)
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
            return (
              <div
                key={e.ticker}
                className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3"
              >
                <span className="text-slate-500 font-bold tabular-nums w-6 text-right flex-shrink-0">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white font-mono">{e.ticker}</span>
                    <span className="text-slate-400 text-sm truncate">{displayName(e.ticker, e.name)}</span>
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
                    <span className="text-slate-400">{fmtMoney(e.price, e.currency)}</span>
                    <span className="ml-2 text-slate-400">avg wt <span className="text-white font-bold">{e.avgProScore.toFixed(1)}%</span></span>
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


// ── Hero carousel ─────────────────────────────────────────────────────────────
// In-flow banner pinned to the very top of the page. Shows one feature banner at
// a time, advanced only by the user via dot indicators + prev/next arrows (no
// auto-rotation). Not an overlay — it scrolls with the page.

// Live universe stats — all derived from the generated data so the carousel copy
// and visuals update automatically whenever the ETF universe is rebuilt.
const THEME_COUNT     = THEMES.length;
const ETF_COUNT       = Object.values(THEME_ETF_COUNT).reduce((a, b) => a + b, 0);
const SCORED_COUNT    = new Set(THEMES.flatMap(t => SAMPLE_DATA[t].map(e => e.ticker))).size;
// "1,100+" style: round the raw holdings count down to the nearest 100 so the
// headline figure stays stable as holdings drift a few names up or down.
const HOLDINGS_FLOOR  = (Math.floor(HOLDINGS_COUNT / 100) * 100).toLocaleString('en-US');

// Strongest current consensus name (highest coverage vs its theme, avg weight as
// tiebreaker) — feeds the landing slide's example card with live data.
const TOP_CONSENSUS = (() => {
  let best: { ticker: string; name: string; theme: Theme; held: number; max: number; weight: number; price: number; currency?: string; proScore: number; vs1w: number | null; week1: number } | null = null;
  for (const t of THEMES) {
    const max = THEME_ETF_COUNT[t];
    for (const e of SAMPLE_DATA[t]) {
      const cov = e.easyScore / max;
      const weight = e.avgWeight ?? e.proScore;
      const bestCov = best ? best.held / best.max : -1;
      if (!best || cov > bestCov || (cov === bestCov && weight > best.weight)) {
        best = { ticker: e.ticker, name: e.name, theme: t, held: e.easyScore, max, weight, price: e.price, currency: e.currency, proScore: e.proScore, vs1w: e.velocityScore?.['1W'] ?? null, week1: e.weeklyChange };
      }
    }
  }
  return best;
})();

// Amber marker keyed to the example-tile legend on the landing slide.
function GuideMark({ n, className = '' }: { n: number; className?: string }) {
  return (
    <span className={`inline-flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full bg-amber-400 text-[9px] font-bold text-slate-900 ${className}`}>{n}</span>
  );
}

const HERO_SLIDES = [
  {
    key: 'etfs',
    eyebrow: '',
    title: 'Explore our unique universe of actively managed ETFs',
    titleCls: 'text-3xl sm:text-4xl',
    lead: `We track and rank over ${HOLDINGS_FLOOR} shares, the full holdings of ${ETF_COUNT} active ETFs, grouped into ${THEME_COUNT} themes.`,
    body: `When 8 of 10 active ETF managers within a theme overweight the same stock, that's worth knowing. We score ${SCORED_COUNT} names on how many ETFs hold them, and at what weight. Conviction, ranked daily.`,
    glow: 'from-emerald-500/10',
    eyebrowCls: 'text-emerald-400',
    ctaCls: 'bg-emerald-500 text-black hover:bg-emerald-400',
    cta: 'See the rankings',
    href: '#live',
  },
  {
    key: 'tony',
    eyebrow: 'Build with Tony',
    title: 'Tilt a low-cost core toward your conviction',
    titleCls: 'text-2xl sm:text-3xl',
    lead: '',
    body: 'Set an index core, then lean into the themes you believe in. See the mix, exposure, and past performance.',
    glow: 'from-sky-500/10',
    eyebrowCls: 'text-sky-400',
    ctaCls: 'bg-sky-500 text-white hover:bg-sky-400',
    cta: 'Build your portfolio',
    href: '/portfolio',
  },
  {
    key: 'scoreboard',
    eyebrow: 'Conviction Board',
    title: 'Every name, scored on consensus and conviction',
    titleCls: 'text-2xl sm:text-3xl',
    lead: '',
    body: "One board ranks all 92 across the ETFs that hold them. See who leads and who's climbing.",
    glow: 'from-amber-500/10',
    eyebrowCls: 'text-amber-400',
    ctaCls: 'bg-amber-500 text-black hover:bg-amber-400',
    cta: 'Open the board',
    href: '/conviction',
  },
];

// Desktop (lg+) landing-slide guide: a mock of a real tile top with amber
// callout bubbles connected to each metric. Connector lines are measured at
// runtime so they land exactly on each metric regardless of width/font.
function LandingExampleGuide() {
  const tc = TOP_CONSENSUS;
  const wrapRef = useRef<HTMLDivElement>(null);
  const mk1 = useRef<HTMLSpanElement>(null);
  const mk2 = useRef<HTMLSpanElement>(null);
  const mk3 = useRef<HTMLSpanElement>(null);
  const mk4 = useRef<HTMLSpanElement>(null);
  const bb1 = useRef<HTMLDivElement>(null);
  const bb2 = useRef<HTMLDivElement>(null);
  const bb3 = useRef<HTMLDivElement>(null);
  const bb4 = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);

  useEffect(() => {
    if (!tc) return;
    const pairs = [[mk1, bb1], [mk2, bb2], [mk3, bb3], [mk4, bb4]] as const;
    const measure = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const wr = wrap.getBoundingClientRect();
      const next: { x1: number; y1: number; x2: number; y2: number }[] = [];
      for (const [mk, bb] of pairs) {
        const m = mk.current?.getBoundingClientRect();
        const b = bb.current?.getBoundingClientRect();
        if (!m || !b) continue;
        next.push({
          x1: m.left + m.width / 2 - wr.left,
          y1: m.top + m.height / 2 - wr.top,
          x2: b.left - wr.left,
          y2: b.top + b.height / 2 - wr.top,
        });
      }
      setLines(next);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
  }, [tc]);

  if (!tc) return null;
  // Illustrative VS / 1W values, kept distinct so the example never shows the
  // same number twice (the live top-consensus name can coincidentally match).
  const exVs = 9.8;
  const exWk = 3.4;
  const dot = 'inline-block h-2 w-2 flex-shrink-0 rounded-full bg-amber-400';
  const bubble = 'rounded-md border border-amber-400/30 bg-amber-400/[0.07] px-2 py-1';

  return (
    <div ref={wrapRef} className="relative hidden lg:block">
      <div className="mb-2 inline-flex items-center rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-300">
        Example tile
      </div>
      <div className="flex items-stretch gap-6">
        {/* Tile top, mirroring a real stock tile */}
        <div className="w-[210px] flex-shrink-0 rounded-xl border border-slate-700 bg-slate-900 px-3 py-3">
          <div className="flex items-start justify-between gap-1.5">
            <div className="min-w-0">
              <div className="truncate text-[13px] font-bold leading-tight text-white">{tc.name}</div>
              <div className="font-mono text-[10px] text-slate-500">{tc.ticker}</div>
            </div>
            <span className="flex flex-shrink-0 items-center gap-1">
              <span className="rounded-full border border-emerald-500/40 bg-emerald-500/15 px-1.5 py-0.5 text-[11px] font-bold tabular-nums text-emerald-300">8/10</span>
              <span ref={mk1} className={dot} />
            </span>
          </div>
          <div className="mt-2.5 flex items-start justify-between gap-1.5">
            <div className="mt-0.5 text-base font-bold tabular-nums text-white">{fmtMoney(tc.price, tc.currency)}</div>
            <div className="flex flex-col items-end gap-1">
              <span className="flex items-center gap-1">
                <span className="text-base font-bold leading-none tabular-nums text-white">{tc.proScore.toFixed(1)}<span className="ml-0.5 text-[10px] font-medium text-slate-400">% avg wt</span></span>
                <span ref={mk2} className={dot} />
              </span>
              <span className="flex items-center gap-1">
                <span className={`text-base font-bold leading-none tabular-nums ${exVs >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{exVs >= 0 ? '+' : ''}{exVs.toFixed(1)}<span className="ml-0.5 text-[10px] font-medium opacity-70">% VS 1W</span></span>
                <span ref={mk3} className={dot} />
              </span>
            </div>
          </div>
          <div className="mt-2.5 flex items-center justify-between border-t border-slate-800 pt-2">
            <span className="text-[10px] text-slate-500">1W change</span>
            <span className="flex items-center gap-1">
              <span className={`text-xs font-bold tabular-nums ${exWk >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{exWk >= 0 ? '+' : ''}{exWk.toFixed(1)}%</span>
              <span ref={mk4} className={dot} />
            </span>
          </div>
        </div>

        {/* Callout bubbles, connected to the metrics by amber lines */}
        <div className="flex w-[180px] flex-col justify-between py-0.5">
          <div ref={bb1} className={bubble}>
            <div className="text-[10px] font-bold text-amber-300">Coverage</div>
            <div className="text-[10px] leading-tight text-slate-400">ETFs in the theme that hold it</div>
          </div>
          <div ref={bb2} className={bubble}>
            <div className="text-[10px] font-bold text-amber-300">Avg wt</div>
            <div className="text-[10px] leading-tight text-slate-400">average weight across those ETFs</div>
          </div>
          <div ref={bb3} className={bubble}>
            <div className="text-[10px] font-bold text-amber-300">Velocity</div>
            <div className="text-[10px] leading-tight text-slate-400">weight change vs last week</div>
          </div>
          <div ref={bb4} className={bubble}>
            <div className="text-[10px] font-bold text-amber-300">1W</div>
            <div className="text-[10px] leading-tight text-slate-400">the stock price move this week</div>
          </div>
        </div>
      </div>

      {/* Connector overlay */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ overflow: 'visible' }}>
        {lines.map((l, i) => (
          <g key={i}>
            <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#fbbf24" strokeWidth="1.25" strokeDasharray="3 2" opacity="0.65" />
            <circle cx={l.x1} cy={l.y1} r="2.5" fill="#fbbf24" />
          </g>
        ))}
      </svg>
    </div>
  );
}

function SlideVisual({ kind }: { kind: string }) {
  if (kind === 'etfs') {
    const tc = TOP_CONSENSUS;
    const sampleTickers = ['AIS', 'SOXX', 'ARKK', 'IGV', 'AIRR', 'PSI'];
    return (
      <div className="space-y-3">
        {/* Illustrative example — fixed at 8/10 to mirror the "8 of 10" copy on
            the left. Clearly badged as an example, and hidden on the compact
            mobile layout so the stacked slide stays short. */}
        {/* Desktop (lg+): annotated tile guide with connector bubbles */}
        <LandingExampleGuide />

        {/* Tablet (sm to lg): same tile with a numbered legend below (narrower column) */}
        {tc && (
          <div className="hidden sm:block lg:hidden">
            <div className="mb-2 inline-flex items-center rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-300">
              Example tile
            </div>

            {/* Mirror of a real tile top, with amber markers keyed to the legend below */}
            <div className="rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="truncate text-sm font-bold leading-tight text-white">{tc.name}</div>
                  <div className="font-mono text-[11px] text-slate-500">{tc.ticker}</div>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <span className="rounded-full border border-emerald-500/40 bg-emerald-500/15 px-2 py-0.5 text-xs font-bold tabular-nums text-emerald-300">8/10</span>
                  <GuideMark n={1} className="ml-1" />
                </div>
              </div>

              <div className="mt-3 flex items-start justify-between gap-2">
                <div className="mt-0.5 text-lg font-bold tabular-nums text-white">{fmtMoney(tc.price, tc.currency)}</div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center">
                    <span className="text-lg font-bold leading-none tabular-nums text-white">{tc.proScore.toFixed(1)}<span className="ml-0.5 text-[11px] font-medium text-slate-400">% avg wt</span></span>
                    <GuideMark n={2} className="ml-1" />
                  </div>
                  {tc.vs1w !== null && (
                    <div className="flex items-center">
                      <span className={`text-lg font-bold leading-none tabular-nums ${tc.vs1w >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{tc.vs1w >= 0 ? '+' : ''}{tc.vs1w.toFixed(1)}<span className="ml-0.5 text-[11px] font-medium opacity-70">% VS 1W</span></span>
                      <GuideMark n={3} className="ml-1" />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-2.5 flex items-center justify-between border-t border-slate-800 pt-2">
                <span className="text-[11px] text-slate-500">1W change</span>
                <div className="flex items-center">
                  <span className={`text-sm font-bold tabular-nums ${tc.week1 >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{tc.week1 >= 0 ? '+' : ''}{tc.week1.toFixed(1)}%</span>
                  <GuideMark n={4} className="ml-1" />
                </div>
              </div>
            </div>

            {/* Legend — amber bubbles explain each metric on the tile */}
            <div className="mt-2.5 space-y-1.5">
              {([
                [1, 'Coverage', 'how many of the theme ETFs hold it'],
                [2, 'Avg wt', 'average weight across those ETFs'],
                [3, 'Velocity', 'weight change vs last week, who is climbing'],
                [4, '1W', 'the stock price move this week'],
              ] as [number, string, string][]).map(([n, label, desc]) => (
                <div key={n} className="flex items-start gap-2">
                  <GuideMark n={n} className="mt-0.5" />
                  <p className="text-[11px] leading-snug text-slate-400"><span className="font-semibold text-amber-300">{label}</span>, {desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Universe scale — derived from live data. Desktop only; hidden on the
            compact mobile slide per feedback. */}
        <div className="hidden sm:grid grid-cols-3 gap-2 text-center">
          {[[`${ETF_COUNT}`, 'active ETFs'], [`${HOLDINGS_FLOOR}+`, 'shares'], [`${SCORED_COUNT}`, 'ranked']].map(([num, label]) => (
            <div key={label} className="rounded-lg border border-slate-800 bg-slate-900/50 py-2">
              <div className="text-base font-bold text-white">{num}</div>
              <div className="text-[9px] uppercase tracking-wide text-slate-500">{label}</div>
            </div>
          ))}
        </div>

        {/* Sample tickers from the universe. Desktop only; hidden on mobile. */}
        <div className="hidden sm:flex flex-wrap gap-1.5">
          {sampleTickers.map(t => (
            <span key={t} className="rounded-full border border-slate-700 bg-slate-800 px-2 py-0.5 font-mono text-[11px] font-semibold text-slate-300">{t}</span>
          ))}
          <span className="px-1.5 py-0.5 text-[11px] font-semibold text-slate-500">+{ETF_COUNT - sampleTickers.length} more</span>
        </div>
      </div>
    );
  }
  if (kind === 'tony') {
    return (
      <div>
        <div className="flex h-3 w-full overflow-hidden rounded-full">
          <div className="bg-slate-400"  style={{ width: '40%' }} />
          <div className="bg-violet-400" style={{ width: '20%' }} />
          <div className="bg-blue-400"   style={{ width: '14%' }} />
          <div className="bg-sky-400"    style={{ width: '14%' }} />
          <div className="bg-amber-400"  style={{ width: '6%' }} />
          <div className="bg-orange-400" style={{ width: '6%' }} />
        </div>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-400">
          {[['Core 40', 'bg-slate-400'], ['AI 20', 'bg-violet-400'], ['Semi 14', 'bg-blue-400'], ['Tech 14', 'bg-sky-400'], ['Elec 6', 'bg-amber-400'], ['Ind 6', 'bg-orange-400']].map(([label, color]) => (
            <span key={label} className="flex items-center gap-1"><span className={`h-2 w-2 rounded-full ${color}`} />{label}</span>
          ))}
        </div>
      </div>
    );
  }
  // scoreboard
  return (
    <div className="space-y-2">
      {[['1', '92%'], ['2', '74%'], ['3', '58%']].map(([rank, w]) => (
        <div key={rank} className="flex items-center gap-2">
          <span className="w-4 text-right font-mono text-xs font-bold text-amber-400">{rank}</span>
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-amber-400/70" style={{ width: w }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function HeroCarousel({ onClose, onGuide }: { onClose: () => void; onGuide: () => void }) {
  const [slide, setSlide] = useState(0);
  const n = HERO_SLIDES.length;
  const go = (i: number) => setSlide((i + n) % n);

  // No auto-advance: the user drives the carousel with the arrows / dots.
  const s = HERO_SLIDES[slide];

  return (
    <section className="border-b border-slate-800 bg-slate-900/30">
      <div className="mx-auto max-w-7xl px-4 pt-6 pb-3 sm:pt-8 sm:pb-4">
        <div className="relative">
          <div key={s.key} className={`animate-intro overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br ${s.glow} to-slate-900`}>
            <div className="flex flex-col gap-6 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-9">
              <div className="max-w-xl">
                {s.eyebrow && <div className={`text-[11px] font-bold uppercase tracking-[0.16em] ${s.eyebrowCls}`}>{s.eyebrow}</div>}
                <h2 className={`mt-2 font-bold leading-tight text-white ${s.titleCls}`}>{s.title}</h2>
                {s.lead && <p className="mt-2.5 text-base font-semibold leading-snug text-slate-100 sm:text-lg">{s.lead}</p>}
                <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">{s.body}</p>
                {s.key === 'etfs' ? (
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <Link href="#live" className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-emerald-400">
                      Start Explore<span aria-hidden>↓</span>
                    </Link>
                    <button
                      onClick={onGuide}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-600 bg-slate-800/60 px-5 py-2.5 text-sm font-bold text-slate-200 transition-colors hover:border-slate-400 hover:text-white"
                    >
                      Guide
                    </button>
                  </div>
                ) : (
                  <Link href={s.href} className={`mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${s.ctaCls}`}>
                    {s.cta}<span aria-hidden>→</span>
                  </Link>
                )}
              </div>
              <div className={`w-full flex-shrink-0 sm:w-72 ${s.key === 'etfs' ? 'lg:w-[24rem]' : ''}`}>
                <SlideVisual kind={s.key} />
              </div>
            </div>
          </div>

          <button
            aria-label="Previous banner"
            onClick={() => go(slide - 1)}
            className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-700 bg-slate-950/70 text-lg text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
          >
            ‹
          </button>
          <button
            aria-label="Next banner"
            onClick={() => go(slide + 1)}
            className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-700 bg-slate-950/70 text-lg text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
          >
            ›
          </button>
          <button
            aria-label="Dismiss featured banners"
            title="Hide featured banners"
            onClick={onClose}
            className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-slate-700 bg-slate-950/70 text-base leading-none text-slate-400 transition-colors hover:border-slate-500 hover:text-white"
          >
            ×
          </button>

          {/* Dot indicators — overlaid inside the card, bottom-center */}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center justify-center gap-2.5">
            {HERO_SLIDES.map((sl, i) => (
              <button
                key={sl.key}
                aria-label={`Go to banner ${i + 1}`}
                onClick={() => go(i)}
                className={`h-2.5 rounded-full transition-all ${i === slide ? 'w-7 bg-white' : 'w-2.5 bg-slate-600 hover:bg-slate-400'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [theme,   setTheme]   = useState<Theme>('AI & ML');
  const [period,  setPeriod]  = useState<ChartPeriod>('6M');
  const [tagline, setTagline] = useState(false);
  const [welcome, setWelcome] = useState(false);
  const [layout,    setLayout]    = useState<'grid' | 'compact'>('grid');
  const [sortBy,    setSortBy]    = useState<'wt' | 'vs'>('wt');
  const [showGuide, setShowGuide] = useState(false);
  const [showNew,   setShowNew]   = useState(false);
  const [showAll,   setShowAll]   = useState(false);
  const [expanded,  setExpanded]  = useState<string | null>(null);
  const [crossView, setCrossView] = useState(false);
  // Session-only: dismissing the hero carousel reveals the portfolio banner as a
  // fallback. Resets on reload so the other carousel slides aren't lost for good.
  const [heroDismissed, setHeroDismissed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTagline(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Read ?theme= query param set by ThemeNav on other pages
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const t = params.get('theme') as Theme | null;
    if (t && (THEMES as readonly string[]).includes(t)) setTheme(t);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
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
  const sortedEquities = sortBy === 'vs'
    ? [...equities].sort((a, b) => {
        const va = a.velocityScore?.['1W'] ?? -Infinity;
        const vb = b.velocityScore?.['1W'] ?? -Infinity;
        return vb - va;
      })
    : [...equities].sort((a, b) =>
        b.easyScore - a.easyScore || (b.avgWeight ?? 0) - (a.avgWeight ?? 0)
      );
  const etfs     = THEME_ETFS[theme];
  const maxScore = THEME_ETF_COUNT[theme];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {showNew && <NewEntrantsModal onClose={() => setShowNew(false)} onSelectTheme={t => setTheme(t)} />}

      {/* Brand header — top of page: logo, tagline, minimal site nav */}
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-4">

          {/* Row 1: logo + tagline (left) + site nav (right) */}
          <div className="flex items-center justify-between gap-4">

            {/* Left: logo + tagline */}
            <div className="flex items-center gap-3 min-w-0">
              <Link href="/" aria-label="Stockscout home">
                <Logo />
              </Link>
              <span
                className="hidden sm:inline text-emerald-300 text-sm font-medium tracking-[0.18em] uppercase whitespace-nowrap"
                style={{
                  opacity:   tagline ? 1 : 0,
                  transform: tagline ? 'translateX(0)' : 'translateX(-6px)',
                  transition: 'opacity 0.55s ease, transform 0.55s ease',
                }}
              >
                See it first.
              </span>
            </div>

            {/* Right: minimal site nav */}
            <nav className="flex items-center gap-5 text-sm flex-shrink-0">
              <Link href="/about" className="text-slate-400 hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link>
            </nav>

          </div>

        </div>
      </header>

      {/* Revolving feature carousel — below the brand header, above the tools strip.
          Dismissible: hiding it surfaces the portfolio banner below as a fallback. */}
      {!heroDismissed && <HeroCarousel onClose={() => setHeroDismissed(true)} onGuide={() => { setShowGuide(true); requestAnimationFrame(() => document.getElementById('live')?.scrollIntoView({ behavior: 'smooth' })); }} />}

      {/* Anchor for the hero CTA — jumps to the live dashboard below */}
      <div id="live" className="scroll-mt-4" />

      {/* Tools strip — action buttons (row 1) + theme toggle (row 2), below the carousel */}
      <div className="border-b border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-3">

          {/* App action buttons — kept on a single row, scrolls on small screens */}
          <div className="max-w-full overflow-x-auto scrollbar-none -mx-1 px-1">
            <nav className="flex items-center gap-2.5 w-max text-sm">
              <Link href="/universe" className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white text-xs font-bold transition-colors whitespace-nowrap">
                ETF Universe
              </Link>
              <Link href="/conviction" className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 hover:border-amber-500/50 text-xs font-bold transition-colors whitespace-nowrap">
                Conviction Board
              </Link>
              <Link href="/portfolio" className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 hover:bg-sky-500/20 hover:border-sky-500/50 text-xs font-bold transition-colors whitespace-nowrap">
                Build Portfolio
              </Link>
              <Link href="/ask" className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-500/50 text-xs font-bold transition-colors whitespace-nowrap">
                Ask Tony
              </Link>
              <button
                onClick={() => setCrossView(v => !v)}
                title="Top 10 stocks ranked across all themes by breadth"
                className={`flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-bold transition-colors whitespace-nowrap ${
                  crossView
                    ? 'bg-amber-500/25 border-amber-500/50 text-amber-200'
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20 hover:border-amber-500/50'
                }`}
              >
                ★ All-Theme Top 10
              </button>
            </nav>
          </div>

          {/* Theme toggle — left-aligned, scrolls horizontally on small screens */}
          <div className="max-w-full overflow-x-auto scrollbar-none -mx-1 px-1">
            <div className="flex items-center bg-slate-800 rounded-full p-0.5 text-xs font-bold border border-slate-700 w-max">
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
              Guide
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {equities.length > 0 ? (
          <>
            {/* Index chart OR guide + ETF summary tile.
                items-stretch keeps the chart card and the ETF table card the
                same height — whichever is shorter grows to match the taller. */}
            <div className="flex items-stretch gap-4 mb-6">
              {showGuide
                ? <GuideStrip onClose={closeGuide} />
                : <IndexChart theme={theme} period={period} setPeriod={setPeriod} />
              }
              <div className="hidden sm:flex flex-shrink-0 items-stretch">
                <EtfPerfTile theme={theme} period={period} />
              </div>

              {/* Desktop-only portfolio-builder teaser — fills the empty space
                  to the right of the ETF tile with a CTA into /portfolio.
                  Fallback only: shown when the hero carousel is dismissed and the
                  guide is closed, so it never duplicates the carousel's CTA. */}
              {heroDismissed && !showGuide && (
              <Link
                href="/portfolio"
                className="hidden lg:flex flex-1 min-w-0 max-w-md flex-col justify-between rounded-xl border border-sky-500/30 bg-gradient-to-br from-sky-500/10 to-slate-900 px-4 pt-3 pb-3 hover:border-sky-500/60 hover:from-sky-500/20 transition-colors group"
              >
                <div>
                  <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-sky-400">Build with Tony</div>
                  <div className="text-base font-bold text-slate-50 leading-snug mt-1">Build your own portfolio.</div>
                </div>

                {/* Core-satellite mechanism visual — index core + theme tilts */}
                <div className="my-1">
                  <div className="flex h-4 w-full rounded-md overflow-hidden bg-slate-800">
                    <div style={{ width: '40%', background: '#94a3b8' }} />
                    <div style={{ width: '20%', background: '#a78bfa' }} />
                    <div style={{ width: '14%', background: '#60a5fa' }} />
                    <div style={{ width: '14%', background: '#38bdf8' }} />
                    <div style={{ width: '6%',  background: '#fbbf24' }} />
                    <div style={{ width: '6%',  background: '#fb923c' }} />
                  </div>
                  <div className="flex flex-wrap gap-x-2.5 gap-y-1 mt-2">
                    {[['#94a3b8', 'Core'], ['#a78bfa', 'AI'], ['#60a5fa', 'Semi'], ['#38bdf8', 'Tech'], ['#fbbf24', 'Elec']].map(([c, l]) => (
                      <span key={l} className="text-[10px] text-slate-400 flex items-center gap-1">
                        <span className="inline-block w-2 h-2 rounded-sm" style={{ background: c }} />{l}
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug mt-2">
                    Cheap index core, tilt toward your conviction themes. See the mix, exposure and past performance.
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 self-start px-3 py-1.5 rounded-full bg-sky-500/20 border border-sky-500/40 text-sky-200 text-xs font-bold group-hover:bg-sky-500/30 transition-colors">
                  Build your portfolio
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
              </Link>
              )}
            </div>

            {/* Coverage Score explainer — user feedback #1 */}
            <p className="text-xs text-slate-400 mb-2">
              <span className="text-slate-200 font-semibold">Coverage Score</span> is how many of this theme&apos;s {maxScore} ETFs hold the stock, so a higher score means broader institutional consensus.
            </p>

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
                  title="Rank by ETF count (breadth first), avg weight as tiebreaker"
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
                  Guide
                </button>
              )}
            </div>

            {/* Grid layout: first 10, then Next 10 button */}
            {layout === 'grid' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {(showAll ? sortedEquities : sortedEquities.slice(0, 10)).map((eq, i) => (
                    <EquityTile key={eq.ticker} equity={eq} etfs={etfs} maxScore={maxScore} autoOpen={i === 1} />
                  ))}
                </div>
                {!showAll && sortedEquities.length > 10 && (
                  <div className="mt-5 text-center">
                    <button
                      onClick={() => setShowAll(true)}
                      className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-slate-700 bg-slate-900 hover:border-slate-500 hover:bg-slate-800 text-slate-300 hover:text-white text-sm font-semibold transition-all"
                    >
                      Next {sortedEquities.length - 10}
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Compact list layout: all 20, click to expand */}
            {layout === 'compact' && (
              <div className="flex flex-col gap-1.5">
                {/* Column headers — mirror CompactRow widths so labels line up */}
                <div className="flex items-center gap-3 px-3 pb-0.5 text-slate-500 text-[10px] font-semibold uppercase tracking-wider select-none">
                  <span className="w-5 flex-shrink-0" aria-hidden="true" />{/* rank */}
                  <span className="w-5 flex-shrink-0" aria-hidden="true" />{/* logo */}
                  <span className="w-14 flex-shrink-0">Stock</span>
                  <span className="flex-1 min-w-0 hidden sm:block" aria-hidden="true" />{/* name */}
                  <span className="w-16 flex-shrink-0 text-right">Price</span>
                  <span className="w-14 flex-shrink-0 text-right hidden sm:block" title="Price change, past week">1W</span>
                  <span className="w-16 flex-shrink-0 text-right leading-tight" title="Average ETF weight / Velocity (weight change vs last week)">
                    Avg wt<br />VS&nbsp;1W
                  </span>
                  <span className="w-12 flex-shrink-0 text-center" title="Coverage: how many theme ETFs hold this stock">Cov</span>
                  <span className="w-4 flex-shrink-0" aria-hidden="true" />{/* chevron */}
                </div>
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
        <footer className="border-t border-slate-800 mt-8 py-6 px-4">
          <p className="text-center text-slate-600 text-xs mb-4">
            Last updated: <span className="text-slate-400 font-bold">{SCAN_TIMESTAMP_NY}</span>
          </p>
          <p className="text-center text-slate-600 text-xs max-w-2xl mx-auto leading-relaxed mb-3">
            Stockscout is for informational purposes only. ETF holdings data is sourced from public fund
            disclosures and updated daily. Nothing on this site constitutes investment advice, a
            recommendation to buy or sell any security, or an offer of any kind. ETF weightings
            reflect published data and may lag actual portfolio changes. Always do your own research.
          </p>
          <p className="text-center text-slate-700 text-xs">
            &copy; {new Date().getFullYear()} Stockscout. All rights reserved.
          </p>
        </footer>
      )}

    </main>
  );
}
