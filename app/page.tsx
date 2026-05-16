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
  easyScore: number;
  proScore: number;
  price: number;
  weeklyPrices: number[];
  weeklyChange: number;
  sortRank: number;
  // Back-face financial data
  marketCap: string;
  pe: number | null;
  revenueGrowth: number;
  eps: number;
  grossMargin: number;
  dividendYield: number | null;
  etfPresence: Record<string, boolean>;  // per-ETF held status
  tonyNote: string;
};

const SAMPLE_DATA: Record<Sector, Equity[]> = {
  Technology: [
    {
      ticker: 'NVDA', name: 'NVIDIA Corporation', easyScore: 5, proScore: 16.2,
      price: 131.40, weeklyPrices: [124.8, 126.5, 129.2, 130.8, 131.4], weeklyChange: 5.3, sortRank: 1,
      marketCap: '$3.2T', pe: 35, revenueGrowth: 78, eps: 3.50, grossMargin: 75, dividendYield: 0.03,
      etfPresence: { XLK: true, VGT: true, QQQ: true, IYW: true, SMH: true },
      tonyNote: 'NVIDIA holds 80%+ share in datacenter AI accelerators. The Blackwell GPU cycle is driving extraordinary enterprise demand from every major hyperscaler. Watch AMD\'s MI300 series and custom silicon (Google TPU, Amazon Trainium) as the structural competitive risks. The premium P/E is justified by the AI infrastructure buildout but creates volatility during macro selloffs. Free cash flow generation is exceptional — the balance sheet is fortress-grade.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc.', easyScore: 5, proScore: 6.1,
      price: 212.60, weeklyPrices: [208.0, 209.5, 210.8, 211.9, 212.6], weeklyChange: 2.2, sortRank: 2,
      marketCap: '$1.0T', pe: 28, revenueGrowth: 44, eps: 7.50, grossMargin: 68, dividendYield: 1.2,
      etfPresence: { XLK: true, VGT: true, QQQ: true, IYW: true, SMH: true },
      tonyNote: 'Broadcom is the dominant supplier of custom AI ASICs (XPUs) for hyperscalers including Google and Meta, alongside its high-margin networking fabric business. The VMware acquisition added a stable, growing software revenue stream that reduces hardware cyclicality. Strong free cash flow supports a growing dividend. Key risk: revenue concentration in a handful of hyperscaler customers.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices', easyScore: 5, proScore: 5.5,
      price: 114.80, weeklyPrices: [116.2, 115.8, 114.5, 114.1, 114.8], weeklyChange: -1.2, sortRank: 3,
      marketCap: '$185B', pe: 25, revenueGrowth: 36, eps: 4.50, grossMargin: 53, dividendYield: null,
      etfPresence: { XLK: true, VGT: true, QQQ: true, IYW: true, SMH: true },
      tonyNote: 'AMD is the credible challenger to NVIDIA in AI GPUs with its MI300X series gaining meaningful datacenter adoption. It also continues to take x86 CPU share from Intel in both server and consumer segments. GPU roadmap execution is the critical watch item — delays vs NVIDIA\'s Blackwell would re-widen the performance gap. Fabless model creates TSMC supply dependency that is worth monitoring.',
    },
    {
      ticker: 'INTC', name: 'Intel Corporation', easyScore: 5, proScore: 5.1,
      price: 25.90, weeklyPrices: [27.1, 26.8, 26.4, 26.0, 25.9], weeklyChange: -4.4, sortRank: 4,
      marketCap: '$110B', pe: null, revenueGrowth: -7, eps: -0.30, grossMargin: 40, dividendYield: null,
      etfPresence: { XLK: true, VGT: true, QQQ: true, IYW: true, SMH: true },
      tonyNote: 'Intel is in a deep restructuring cycle. The IDM 2.0 foundry strategy is years from profitability and AMD continues taking CPU share. The bull case is Intel 18A process achieving TSMC parity by 2027. The bear case is it misses again. High execution risk across every business unit. The 5/5 ETF presence score reflects historical index weighting, not current momentum — this is a turnaround bet, not a consensus quality name. Size accordingly.',
    },
    {
      ticker: 'MU', name: 'Micron Technology', easyScore: 5, proScore: 5.0,
      price: 129.70, weeklyPrices: [126.4, 127.8, 128.5, 129.2, 129.7], weeklyChange: 2.6, sortRank: 5,
      marketCap: '$145B', pe: 12, revenueGrowth: 58, eps: 10.50, grossMargin: 42, dividendYield: 0.4,
      etfPresence: { XLK: true, VGT: true, QQQ: true, IYW: true, SMH: true },
      tonyNote: 'Micron is the primary US beneficiary of the AI memory supercycle. HBM demand for AI accelerators is driving DRAM pricing power the company has not seen in a decade. The risk is structural: memory is cyclical. Previous cycles showed brutal oversupply corrections. Current AI-driven demand appears more sustained than past server DRAM cycles, but cycle risk never fully disappears. The low P/E reflects market skepticism about cycle durability — that is both the risk and the opportunity.',
    },
    {
      ticker: 'LRCX', name: 'Lam Research Corporation', easyScore: 5, proScore: 3.1,
      price: 89.30, weeklyPrices: [87.2, 88.0, 88.7, 89.0, 89.3], weeklyChange: 2.4, sortRank: 6,
      marketCap: '$118B', pe: 22, revenueGrowth: 24, eps: 3.90, grossMargin: 47, dividendYield: 1.1,
      etfPresence: { XLK: true, VGT: true, QQQ: true, IYW: true, SMH: true },
      tonyNote: 'Lam Research is the dominant supplier of etch and deposition equipment — critical tools in every advanced semiconductor manufacturing flow. As chip geometries shrink, etch steps per wafer increase, creating a structural tailwind for Lam regardless of which chipmaker wins. Customer concentration (Samsung, TSMC, Micron) is the key risk. China export restrictions remain an ongoing regulatory variable to monitor.',
    },
    {
      ticker: 'AMAT', name: 'Applied Materials', easyScore: 5, proScore: 2.9,
      price: 176.50, weeklyPrices: [173.0, 174.2, 175.0, 175.9, 176.5], weeklyChange: 2.0, sortRank: 7,
      marketCap: '$148B', pe: 20, revenueGrowth: 18, eps: 8.60, grossMargin: 48, dividendYield: 0.9,
      etfPresence: { XLK: true, VGT: true, QQQ: true, IYW: true, SMH: true },
      tonyNote: 'Applied Materials is the largest semiconductor equipment company globally, spanning deposition, etch, metrology, and inspection. Unique position as an enabler of every major chipmaker rather than a competitor. The services and spare parts business provides recurring revenue that smooths the capital equipment cycle. China exposure is significant — roughly 30% of revenue — making export control policy a key macro risk for the stock.',
    },
    {
      ticker: 'TXN', name: 'Texas Instruments', easyScore: 5, proScore: 2.8,
      price: 191.20, weeklyPrices: [188.5, 189.4, 190.1, 190.8, 191.2], weeklyChange: 1.4, sortRank: 8,
      marketCap: '$174B', pe: 30, revenueGrowth: 12, eps: 6.30, grossMargin: 64, dividendYield: 2.8,
      etfPresence: { XLK: true, VGT: true, QQQ: true, IYW: true, SMH: true },
      tonyNote: 'Texas Instruments is the quintessential quality compounder in semiconductors. Analog chips have 10-20 year product cycles, 100,000+ customer relationships, and margins that compete with software companies. The dividend has grown every year for 20 years. TI is building new internal fabs (300mm) to lock in low-cost manufacturing for decades. The premium valuation reflects the quality — this is not a growth stock, it is a capital-allocation machine.',
    },
    {
      ticker: 'KLAC', name: 'KLA Corporation', easyScore: 5, proScore: 2.5,
      price: 703.80, weeklyPrices: [694.0, 697.5, 700.2, 702.1, 703.8], weeklyChange: 1.4, sortRank: 9,
      marketCap: '$96B', pe: 26, revenueGrowth: 20, eps: 26.50, grossMargin: 58, dividendYield: 0.9,
      etfPresence: { XLK: true, VGT: true, QQQ: true, IYW: true, SMH: true },
      tonyNote: 'KLA dominates process control and inspection equipment — the systems chipmakers use to detect defects during manufacturing. Near-monopoly position in a segment that becomes more critical as chip complexity increases. Every advanced node transition (3nm, 2nm, 1nm) increases inspection intensity, creating a structural growth driver independent of overall equipment spending. High gross margins and consistent buybacks make this a capital-light compounder within equipment.',
    },
    {
      ticker: 'QCOM', name: 'Qualcomm Inc.', easyScore: 5, proScore: 2.4,
      price: 164.90, weeklyPrices: [161.2, 162.5, 163.4, 164.2, 164.9], weeklyChange: 2.3, sortRank: 10,
      marketCap: '$183B', pe: 18, revenueGrowth: 15, eps: 9.20, grossMargin: 56, dividendYield: 2.1,
      etfPresence: { XLK: true, VGT: true, QQQ: true, IYW: true, SMH: true },
      tonyNote: 'Qualcomm is the dominant mobile processor and modem supplier, with Apple dependency historically its key risk. The diversification into automotive (Snapdragon Digital Chassis) and PC (Snapdragon X Elite) reduces that concentration meaningfully. Edge AI is a long-term catalyst as on-device inference grows. The Apple modem in-sourcing risk is real but well-understood and partially priced in. Trades at a discount to peers — the market is pricing more Apple risk than Tony believes is warranted at current levels.',
    },
    {
      ticker: 'ADI', name: 'Analog Devices Inc.', easyScore: 5, proScore: 2.3,
      price: 224.30, weeklyPrices: [221.0, 222.1, 223.0, 223.8, 224.3], weeklyChange: 1.5, sortRank: 11,
      marketCap: '$117B', pe: 28, revenueGrowth: 14, eps: 7.90, grossMargin: 68, dividendYield: 1.6,
      etfPresence: { XLK: true, VGT: true, QQQ: true, IYW: true, SMH: true },
      tonyNote: 'Analog Devices is a high-quality analog and mixed-signal semiconductor company serving industrial, automotive, and communications markets. The Maxim Integrated acquisition broadened the portfolio and customer base. Analog chips have long product cycles and strong customer switching costs — hallmarks of durable competitive advantage. Industrial exposure creates near-term cyclical risk as capex normalizes post-COVID boom. Long-term thesis is intact: industrial digitisation and EV adoption both drive ADI content per system higher.',
    },
    {
      ticker: 'SNPS', name: 'Synopsys Inc.', easyScore: 4, proScore: 1.5,
      price: 511.60, weeklyPrices: [507.0, 508.5, 509.8, 510.9, 511.6], weeklyChange: 0.9, sortRank: 12,
      marketCap: '$83B', pe: 38, revenueGrowth: 17, eps: 13.20, grossMargin: 80, dividendYield: null,
      etfPresence: { XLK: true, VGT: true, QQQ: false, IYW: true, SMH: true },
      tonyNote: 'Synopsys is a near-duopoly (with Cadence) in Electronic Design Automation — the software that chip designers use to create every semiconductor in existence. Without Synopsys tools, NVIDIA, AMD, and Apple cannot design their chips. This is a software business with 80% gross margins and near-zero marginal cost of delivery. The AI Copilot tools are accelerating chip design productivity, growing the addressable market. The pending Ansys acquisition broadens the portfolio into simulation. Premium valuation is earned by the strategic irreplaceability.',
    },
  ],
  Financials:  [],
  Energy:      [],
  Healthcare:  [],
  Industrials: [],
};

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

  const color = positive ? '#34d399' : '#f87171';
  const fillColor = positive ? 'rgba(52,211,153,0.12)' : 'rgba(248,113,113,0.12)';

  // 3 Y-axis ticks
  const yTicks = [yMin + yRange * 0.1, yMin + yRange * 0.5, yMin + yRange * 0.9];
  const fmtPrice = (v: number) =>
    v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v >= 100 ? v.toFixed(0) : v.toFixed(1);

  // X-axis labels — 5 trading days
  const xLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" height={VH} style={{ display: 'block' }}>
      {/* Horizontal grid lines */}
      {yTicks.map((tick, i) => (
        <line key={i} x1={padL} y1={toY(tick)} x2={VW - padR} y2={toY(tick)}
          stroke="#1e293b" strokeWidth="1" />
      ))}
      {/* Y axis */}
      <line x1={padL} y1={padT} x2={padL} y2={padT + chartH} stroke="#334155" strokeWidth="1" />
      {/* X axis */}
      <line x1={padL} y1={padT + chartH} x2={VW - padR} y2={padT + chartH} stroke="#334155" strokeWidth="1" />
      {/* Y labels */}
      {yTicks.map((tick, i) => (
        <text key={i} x={padL - 5} y={toY(tick) + 3.5} textAnchor="end" fontSize="9" fill="#64748b">
          {fmtPrice(tick)}
        </text>
      ))}
      {/* X labels */}
      {xLabels.map((label, i) => (
        <text key={i} x={toX(i)} y={padT + chartH + 14} textAnchor="middle" fontSize="9" fill="#64748b">
          {label}
        </text>
      ))}
      {/* Area fill */}
      <path d={areaPath} fill={fillColor} />
      {/* Price line */}
      <path d={linePath} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Endpoint dot */}
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="3" fill={color} />
    </svg>
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

  const peStr   = equity.pe !== null ? `${equity.pe}x` : 'N/A';
  const divStr  = equity.dividendYield !== null ? `${equity.dividendYield.toFixed(1)}%` : 'None';
  const revStr  = `${equity.revenueGrowth > 0 ? '+' : ''}${equity.revenueGrowth}%`;

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

          {/* Price */}
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

          {/* Mini chart — centred anchor of the lower tile */}
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

          {/* Tony's note — scrollable */}
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
