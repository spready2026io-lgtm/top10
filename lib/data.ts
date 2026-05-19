// ── Index chart types & data ──────────────────────────────────────────────────

export type Period = '1W' | '1M' | '6M' | '1Y';

export type ChartPeriodData = {
  top10: number[];
  spy: number[];
  top10Return: number;
  spyReturn: number;
  xLabels: string[];
};

// Deterministic path generator — no randomness, same shape every render.
function makePath(n: number, finalReturn: number, seed: number): number[] {
  const target = 100 + finalReturn;
  const pts: number[] = [100];
  let cur = 100;
  for (let i = 1; i < n; i++) {
    const remaining = n - i;
    const drift     = (target - cur) / remaining * 0.38;
    const decay   = 1 - (i / n) * 0.55;
    const noise   = (Math.sin(i * 1.87 + seed) * Math.cos(i * 0.73 + seed * 1.1))
                    * Math.max(0.15, Math.abs(finalReturn) * 0.11) * decay;
    cur = parseFloat((cur + drift + noise).toFixed(2));
    pts.push(cur);
  }
  pts[n - 1] = parseFloat(target.toFixed(2));
  return pts;
}

const N: Record<Period, number> = { '1W': 5, '1M': 21, '6M': 26, '1Y': 52 };

const XLABELS: Record<Period, string[]> = {
  '1W': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  '1M': ['May 1', 'May 8', 'May 15', 'May 22', 'Jun 1'],
  '6M': ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
  '1Y': ["May '25", 'Aug', 'Nov', "Feb '26", "May '26"],
};

// S&P 500 returns — benchmark across all themes
export const SPY_RET: Record<Period, number> = { '1W': 1.2, '1M': 3.6, '6M': 10.4, '1Y': 18.8 };

// Top10 composite returns per theme per period
const TOP10_RET: Record<Theme, Record<Period, number>> = {
  'AI & ML':        { '1W': 2.1, '1M': 7.8,  '6M': 22.4, '1Y': 41.2 },
  'Semiconductors': { '1W': 2.8, '1M': 9.2,  '6M': 19.6, '1Y': 36.8 },
  'Broad Tech':     { '1W': 1.6, '1M': 5.8,  '6M': 16.4, '1Y': 30.2 },
  'Electrification':{ '1W': 1.2, '1M': 3.4,  '6M': 8.6,  '1Y': 14.8 },
  'Industrials':    { '1W': 1.7, '1M': 5.2,  '6M': 14.8, '1Y': 24.2 },
};

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57,
};

export const INDEX_CHART_DATA: Record<Theme, Record<Period, ChartPeriodData>> = (() => {
  const out = {} as Record<Theme, Record<Period, ChartPeriodData>>;
  for (const theme of ['AI & ML', 'Semiconductors', 'Broad Tech', 'Electrification', 'Industrials'] as Theme[]) {
    out[theme] = {} as Record<Period, ChartPeriodData>;
    for (const p of ['1W', '1M', '6M', '1Y'] as Period[]) {
      out[theme][p] = {
        top10:       makePath(N[p], TOP10_RET[theme][p], THEME_SEED[theme]),
        spy:         makePath(N[p], SPY_RET[p], 42),
        top10Return: TOP10_RET[theme][p],
        spyReturn:   SPY_RET[p],
        xLabels:     XLABELS[p],
      };
    }
  }
  return out;
})();

// ── Types ─────────────────────────────────────────────────────────────────────

export type Theme = 'AI & ML' | 'Semiconductors' | 'Broad Tech' | 'Electrification' | 'Industrials';

export type Equity = {
  ticker: string;
  name: string;
  easyScore: number;      // raw count of theme ETFs holding this stock
  proScore: number;       // average weighting across holding ETFs
  price: number;
  weeklyPrices: number[];
  weeklyChange: number;
  sortRank: number;
  marketCap: string;
  pe: number | null;
  revenueGrowth: number;
  eps: number;
  grossMargin: number;
  dividendYield: number | null;
  etfPresence: Record<string, boolean>;
  tonyNote: string;
};

// ── Theme configuration ───────────────────────────────────────────────────────

export const THEMES: Theme[] = ['AI & ML', 'Semiconductors', 'Broad Tech', 'Electrification', 'Industrials'];

// Number of ETFs per theme — denominator for relative Easy Score display
export const THEME_ETF_COUNT: Record<Theme, number> = {
  'AI & ML':        8,
  'Semiconductors': 4,
  'Broad Tech':     10,
  'Electrification':4,
  'Industrials':    2,
};

export const THEME_ETFS: Record<Theme, string[]> = {
  'AI & ML':        ['AIS', 'ARTY', 'BAI', 'IVEP', 'IGPT', 'IVES', 'ALAI', 'CHAT'],
  'Semiconductors': ['SOXX', 'PSI', 'XSD', 'DRAM'],
  'Broad Tech':     ['QQQ', 'QQQA', 'PTF', 'WCLD', 'MAGS', 'IGV', 'FDTX', 'GTEK', 'ARKK', 'MARS'],
  'Electrification':['POW', 'VOLT', 'PBD', 'PBW'],
  'Industrials':    ['AIRR', 'PRN'],
};

// Primary benchmark ETF per theme — shown in validation strip
export const THEME_BENCHMARK_ETF: Record<Theme, string> = {
  'AI & ML':        'ARTY',
  'Semiconductors': 'SOXX',
  'Broad Tech':     'QQQ',
  'Electrification':'PBD',
  'Industrials':    'AIRR',
};

// Weekly return of the primary benchmark ETF
export const THEME_BENCHMARKS: Record<Theme, number> = {
  'AI & ML':        1.8,
  'Semiconductors': 2.4,
  'Broad Tech':     1.4,
  'Electrification':1.0,
  'Industrials':    1.3,
};

// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': 2.2, '1M': 8.4,  '6M': 24.2, '1Y': 44.6 },
  ARTY: { '1W': 1.8, '1M': 7.2,  '6M': 21.4, '1Y': 39.8 },
  BAI:  { '1W': 2.0, '1M': 7.8,  '6M': 22.8, '1Y': 41.2 },
  IVEP: { '1W': 2.4, '1M': 8.8,  '6M': 24.8, '1Y': 46.2 },
  IGPT: { '1W': 1.9, '1M': 7.4,  '6M': 21.8, '1Y': 40.4 },
  IVES: { '1W': 2.3, '1M': 8.6,  '6M': 23.8, '1Y': 43.8 },
  ALAI: { '1W': 2.0, '1M': 7.6,  '6M': 22.2, '1Y': 40.8 },
  CHAT: { '1W': 2.1, '1M': 8.0,  '6M': 22.6, '1Y': 41.6 },
  // Semiconductors
  SOXX: { '1W': 2.8, '1M': 9.4,  '6M': 20.2, '1Y': 38.4 },
  PSI:  { '1W': 2.6, '1M': 8.8,  '6M': 18.8, '1Y': 35.6 },
  XSD:  { '1W': 2.4, '1M': 8.2,  '6M': 17.8, '1Y': 33.8 },
  DRAM: { '1W': 3.2, '1M': 10.4, '6M': 22.6, '1Y': 42.4 },
  // Broad Tech
  QQQ:  { '1W': 1.8, '1M': 6.2,  '6M': 17.8, '1Y': 32.4 },
  QQQA: { '1W': 1.6, '1M': 5.8,  '6M': 16.4, '1Y': 30.8 },
  PTF:  { '1W': 1.8, '1M': 6.4,  '6M': 17.2, '1Y': 31.6 },
  WCLD: { '1W': 1.4, '1M': 5.2,  '6M': 14.8, '1Y': 27.4 },
  MAGS: { '1W': 2.2, '1M': 7.8,  '6M': 21.4, '1Y': 38.6 },
  IGV:  { '1W': 1.6, '1M': 5.6,  '6M': 15.6, '1Y': 28.8 },
  FDTX: { '1W': 1.7, '1M': 6.0,  '6M': 16.8, '1Y': 31.2 },
  GTEK: { '1W': 1.9, '1M': 6.6,  '6M': 18.4, '1Y': 34.2 },
  ARKK: { '1W': 2.4, '1M': 8.4,  '6M': 22.8, '1Y': 42.6 },
  MARS: { '1W': 2.0, '1M': 7.2,  '6M': 20.4, '1Y': 37.8 },
  // Electrification
  POW:  { '1W': 1.4, '1M': 4.2,  '6M': 10.8, '1Y': 18.6 },
  VOLT: { '1W': 1.2, '1M': 3.8,  '6M': 9.8,  '1Y': 16.4 },
  PBD:  { '1W': 1.1, '1M': 3.4,  '6M': 8.6,  '1Y': 14.2 },
  PBW:  { '1W': 1.0, '1M': 3.2,  '6M': 8.2,  '1Y': 13.8 },
  // Industrials
  AIRR: { '1W': 1.8, '1M': 5.6,  '6M': 15.4, '1Y': 26.2 },
  PRN:  { '1W': 1.6, '1M': 5.0,  '6M': 13.8, '1Y': 23.4 },
};

// ── Data ──────────────────────────────────────────────────────────────────────

export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML (8 ETFs: AIS ARTY BAI IVEP IGPT IVES ALAI CHAT) ─────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corporation', easyScore: 8, proScore: 16.2,
      price: 225.32, weeklyPrices: [222.2, 223.0, 223.8, 224.5, 225.32], weeklyChange: 1.4, sortRank: 1,
      marketCap: '$5.5T', pe: 35, revenueGrowth: 78, eps: 3.50, grossMargin: 75, dividendYield: 0.03,
      etfPresence: { AIS: true, ARTY: true, BAI: true, IVEP: true, IGPT: true, IVES: true, ALAI: true, CHAT: true },
      tonyNote: 'NVIDIA holds 80%+ share in datacenter AI accelerators. The Blackwell GPU cycle is driving extraordinary enterprise demand from every major hyperscaler. Watch AMD\'s MI300 series and custom silicon (Google TPU, Amazon Trainium) as the structural competitive risks. The premium P/E is justified by the AI infrastructure buildout but creates volatility during macro selloffs. Free cash flow generation is exceptional — the balance sheet is fortress-grade.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc.', easyScore: 7, proScore: 6.1,
      price: 425.19, weeklyPrices: [419.3, 420.6, 421.9, 423.5, 425.19], weeklyChange: 1.4, sortRank: 2,
      marketCap: '$2.0T', pe: 28, revenueGrowth: 44, eps: 7.50, grossMargin: 68, dividendYield: 1.2,
      etfPresence: { AIS: true, ARTY: true, BAI: true, IVEP: true, IGPT: false, IVES: true, ALAI: true, CHAT: true },
      tonyNote: 'Broadcom is the dominant supplier of custom AI ASICs (XPUs) for hyperscalers including Google and Meta, alongside its high-margin networking fabric business. The VMware acquisition added a stable, growing software revenue stream that reduces hardware cyclicality. Strong free cash flow supports a growing dividend. Key risk: revenue concentration in a handful of hyperscaler customers.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices', easyScore: 7, proScore: 5.5,
      price: 424.10, weeklyPrices: [418.2, 419.6, 421.0, 422.6, 424.10], weeklyChange: 1.4, sortRank: 3,
      marketCap: '$687B', pe: 25, revenueGrowth: 36, eps: 4.50, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: true, ARTY: true, BAI: true, IVEP: false, IGPT: true, IVES: true, ALAI: true, CHAT: true },
      tonyNote: 'AMD is the credible challenger to NVIDIA in AI GPUs with its MI300X series gaining meaningful datacenter adoption. It continues to take x86 CPU share from Intel in both server and consumer segments. GPU roadmap execution is the critical watch item — delays vs NVIDIA\'s Blackwell would re-widen the performance gap. Fabless model creates TSMC supply dependency worth monitoring.',
    },
    {
      ticker: 'MU', name: 'Micron Technology', easyScore: 6, proScore: 5.0,
      price: 724.66, weeklyPrices: [714.7, 717.2, 719.6, 722.1, 724.66], weeklyChange: 1.4, sortRank: 4,
      marketCap: '$804B', pe: 12, revenueGrowth: 58, eps: 10.50, grossMargin: 42, dividendYield: 0.4,
      etfPresence: { AIS: true, ARTY: false, BAI: true, IVEP: true, IGPT: false, IVES: true, ALAI: true, CHAT: true },
      tonyNote: 'Micron is the primary US beneficiary of the AI memory supercycle. HBM demand for AI accelerators is driving DRAM pricing power the company has not seen in a decade. The risk is structural: memory is cyclical. Current AI-driven demand appears more sustained than past server DRAM cycles, but cycle risk never fully disappears. The low P/E reflects market skepticism about cycle durability — that is both the risk and the opportunity.',
    },
    {
      ticker: 'INTC', name: 'Intel Corporation', easyScore: 5, proScore: 5.1,
      price: 108.77, weeklyPrices: [107.3, 107.6, 108.0, 108.4, 108.77], weeklyChange: 1.4, sortRank: 5,
      marketCap: '$461B', pe: null, revenueGrowth: -7, eps: -0.30, grossMargin: 40, dividendYield: null,
      etfPresence: { AIS: true, ARTY: false, BAI: true, IVEP: false, IGPT: true, IVES: true, ALAI: false, CHAT: true },
      tonyNote: 'Intel is in a deep restructuring cycle. The IDM 2.0 foundry strategy is years from profitability and AMD continues taking CPU share. The bull case is Intel 18A process achieving TSMC parity by 2027. The bear case is it misses again. High execution risk across every business unit. The 5/8 AI ETF score reflects legacy index weighting — this is a turnaround bet, not a consensus AI name. Size accordingly.',
    },
    {
      ticker: 'QCOM', name: 'Qualcomm Inc.', easyScore: 5, proScore: 2.4,
      price: 201.49, weeklyPrices: [198.7, 199.4, 200.1, 200.8, 201.49], weeklyChange: 1.4, sortRank: 6,
      marketCap: '$224B', pe: 18, revenueGrowth: 15, eps: 9.20, grossMargin: 56, dividendYield: 2.1,
      etfPresence: { AIS: true, ARTY: false, BAI: true, IVEP: true, IGPT: false, IVES: false, ALAI: true, CHAT: true },
      tonyNote: 'Qualcomm is the dominant mobile processor and modem supplier with a growing edge AI story via Snapdragon X Elite. On-device AI inference is a long-term catalyst as every smartphone becomes an AI processing node. The Apple modem in-sourcing risk is real but well-understood and partially priced in. Edge AI keeps Qualcomm relevant in a world increasingly split between cloud inference (NVIDIA) and on-device inference (QCOM).',
    },
    {
      ticker: 'LRCX', name: 'Lam Research Corporation', easyScore: 5, proScore: 3.1,
      price: 284.72, weeklyPrices: [280.8, 281.8, 282.8, 283.7, 284.72], weeklyChange: 1.4, sortRank: 7,
      marketCap: '$370B', pe: 22, revenueGrowth: 24, eps: 3.90, grossMargin: 47, dividendYield: 1.1,
      etfPresence: { AIS: false, ARTY: true, BAI: false, IVEP: true, IGPT: true, IVES: false, ALAI: true, CHAT: true },
      tonyNote: 'Lam Research is the dominant supplier of etch and deposition equipment — critical tools in every advanced semiconductor manufacturing flow. As chip geometries shrink, etch steps per wafer increase, creating a structural tailwind for Lam regardless of which chipmaker wins. Customer concentration (Samsung, TSMC, Micron) is the key risk. China export restrictions remain an ongoing regulatory variable to monitor.',
    },
    {
      ticker: 'AMAT', name: 'Applied Materials', easyScore: 4, proScore: 2.9,
      price: 436.62, weeklyPrices: [430.6, 431.9, 433.3, 435.0, 436.62], weeklyChange: 1.4, sortRank: 8,
      marketCap: '$365B', pe: 20, revenueGrowth: 18, eps: 8.60, grossMargin: 48, dividendYield: 0.9,
      etfPresence: { AIS: false, ARTY: true, BAI: false, IVEP: true, IGPT: false, IVES: true, ALAI: true, CHAT: false },
      tonyNote: 'Applied Materials is the largest semiconductor equipment company globally, spanning deposition, etch, metrology, and inspection. Unique position as an enabler of every major chipmaker rather than a competitor. The services and spare parts business provides recurring revenue that smooths the capital equipment cycle. China exposure (~30% of revenue) makes export control policy a key macro risk.',
    },
    {
      ticker: 'KLAC', name: 'KLA Corporation', easyScore: 4, proScore: 2.5,
      price: 1804.32, weeklyPrices: [1779.4, 1785.6, 1791.8, 1798.1, 1804.32], weeklyChange: 1.4, sortRank: 9,
      marketCap: '$245B', pe: 26, revenueGrowth: 20, eps: 26.50, grossMargin: 58, dividendYield: 0.9,
      etfPresence: { AIS: false, ARTY: true, BAI: false, IVEP: false, IGPT: true, IVES: false, ALAI: true, CHAT: true },
      tonyNote: 'KLA dominates process control and inspection equipment — the systems chipmakers use to detect defects during manufacturing. Near-monopoly position in a segment that becomes more critical as chip complexity increases. Every advanced node transition (3nm, 2nm, 1nm) increases inspection intensity, creating a structural growth driver independent of overall equipment spending. High gross margins and consistent buybacks make this a capital-light compounder within equipment.',
    },
    {
      ticker: 'TXN', name: 'Texas Instruments', easyScore: 4, proScore: 2.8,
      price: 302.73, weeklyPrices: [298.6, 299.4, 300.3, 301.5, 302.73], weeklyChange: 1.4, sortRank: 10,
      marketCap: '$276B', pe: 30, revenueGrowth: 12, eps: 6.30, grossMargin: 64, dividendYield: 2.8,
      etfPresence: { AIS: false, ARTY: false, BAI: true, IVEP: false, IGPT: true, IVES: false, ALAI: true, CHAT: true },
      tonyNote: 'Texas Instruments is the quintessential quality compounder in semiconductors. Analog chips have 10-20 year product cycles, 100,000+ customer relationships, and margins that compete with software companies. The dividend has grown every year for 20 years. TI is building new internal fabs (300mm) to lock in low-cost manufacturing for decades. The premium valuation reflects the quality — this is a capital-allocation machine, not a growth stock.',
    },
    {
      ticker: 'ADI', name: 'Analog Devices Inc.', easyScore: 3, proScore: 2.3,
      price: 417.49, weeklyPrices: [411.7, 412.8, 414.1, 415.9, 417.49], weeklyChange: 1.4, sortRank: 11,
      marketCap: '$218B', pe: 28, revenueGrowth: 14, eps: 7.90, grossMargin: 68, dividendYield: 1.6,
      etfPresence: { AIS: false, ARTY: false, BAI: true, IVEP: false, IGPT: false, IVES: true, ALAI: false, CHAT: true },
      tonyNote: 'Analog Devices is a high-quality analog and mixed-signal semiconductor company serving industrial, automotive, and communications markets. The Maxim Integrated acquisition broadened the portfolio and customer base. Analog chips have long product cycles and strong customer switching costs — hallmarks of durable competitive advantage. Industrial exposure creates near-term cyclical risk as capex normalises post-COVID boom.',
    },
    {
      ticker: 'SNPS', name: 'Synopsys Inc.', easyScore: 3, proScore: 1.5,
      price: 502.42, weeklyPrices: [497.9, 498.9, 499.9, 501.2, 502.42], weeklyChange: 0.9, sortRank: 12,
      marketCap: '$81B', pe: 38, revenueGrowth: 17, eps: 13.20, grossMargin: 80, dividendYield: null,
      etfPresence: { AIS: true, ARTY: false, BAI: false, IVEP: true, IGPT: false, IVES: false, ALAI: true, CHAT: false },
      tonyNote: 'Synopsys is a near-duopoly (with Cadence) in Electronic Design Automation — the software that chip designers use to create every semiconductor in existence. Without Synopsys tools, NVIDIA, AMD, and Apple cannot design their chips. This is a software business with 80% gross margins and near-zero marginal cost of delivery. The AI Copilot tools are accelerating chip design productivity, growing the addressable market.',
    },
  ],

  // ── Semiconductors (4 ETFs: SOXX PSI XSD DRAM) ───────────────────────────────
  'Semiconductors': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corporation', easyScore: 4, proScore: 12.4,
      price: 225.32, weeklyPrices: [222.2, 223.0, 223.8, 224.5, 225.32], weeklyChange: 1.4, sortRank: 1,
      marketCap: '$5.5T', pe: 35, revenueGrowth: 78, eps: 3.50, grossMargin: 75, dividendYield: 0.03,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: true },
      tonyNote: 'NVIDIA holds 80%+ share in datacenter AI accelerators. The Blackwell GPU cycle is driving extraordinary enterprise demand from every major hyperscaler. Watch AMD\'s MI300 series and custom silicon (Google TPU, Amazon Trainium) as the structural competitive risks. The premium P/E is justified by the AI infrastructure buildout but creates volatility during macro selloffs. Free cash flow generation is exceptional — the balance sheet is fortress-grade.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices', easyScore: 4, proScore: 7.8,
      price: 424.10, weeklyPrices: [418.2, 419.6, 421.0, 422.6, 424.10], weeklyChange: 1.4, sortRank: 2,
      marketCap: '$687B', pe: 25, revenueGrowth: 36, eps: 4.50, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: true },
      tonyNote: 'AMD is the credible challenger to NVIDIA in AI GPUs with its MI300X series gaining meaningful datacenter adoption. It continues to take x86 CPU share from Intel in both server and consumer segments. GPU roadmap execution is the critical watch item — delays vs NVIDIA\'s Blackwell would re-widen the performance gap. Fabless model creates TSMC supply dependency worth monitoring.',
    },
    {
      ticker: 'MU', name: 'Micron Technology', easyScore: 4, proScore: 6.2,
      price: 724.66, weeklyPrices: [714.7, 717.2, 719.6, 722.1, 724.66], weeklyChange: 1.4, sortRank: 3,
      marketCap: '$804B', pe: 12, revenueGrowth: 58, eps: 10.50, grossMargin: 42, dividendYield: 0.4,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: true },
      tonyNote: 'Micron is the primary US beneficiary of the AI memory supercycle. HBM demand for AI accelerators is driving DRAM pricing power the company has not seen in a decade. DRAM ETF (the ticker) is literally named for the memory chip Micron produces — highest concentration exposure in the universe. The risk is structural: memory is cyclical. Current AI-driven demand appears more sustained than past cycles, but cycle risk never fully disappears.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc.', easyScore: 3, proScore: 5.8,
      price: 425.19, weeklyPrices: [419.3, 420.6, 421.9, 423.5, 425.19], weeklyChange: 1.4, sortRank: 4,
      marketCap: '$2.0T', pe: 28, revenueGrowth: 44, eps: 7.50, grossMargin: 68, dividendYield: 1.2,
      etfPresence: { SOXX: true, PSI: true, XSD: false, DRAM: false },
      tonyNote: 'Broadcom is the dominant supplier of custom AI ASICs (XPUs) for hyperscalers including Google and Meta. Its networking fabric chips (Tomahawk, Jericho) are the connective tissue of every AI data center. SOXX and PSI hold Broadcom as a broad semiconductor play. XSD and DRAM exclude it given its focus on application-specific chips rather than memory or commodity logic.',
    },
    {
      ticker: 'INTC', name: 'Intel Corporation', easyScore: 3, proScore: 4.6,
      price: 108.77, weeklyPrices: [107.3, 107.6, 108.0, 108.4, 108.77], weeklyChange: 1.4, sortRank: 5,
      marketCap: '$461B', pe: null, revenueGrowth: -7, eps: -0.30, grossMargin: 40, dividendYield: null,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: false },
      tonyNote: 'Intel is in a deep restructuring cycle. The IDM 2.0 foundry strategy is years from profitability and AMD continues taking CPU share. The bull case is Intel 18A process achieving TSMC parity by 2027. The bear case is it misses again. High execution risk across every business unit. Presence in 3 of 4 semiconductor ETFs reflects historical index weighting — this is a turnaround bet, not a quality semi name. Size accordingly.',
    },
    {
      ticker: 'QCOM', name: 'Qualcomm Inc.', easyScore: 3, proScore: 4.1,
      price: 201.49, weeklyPrices: [198.7, 199.4, 200.1, 200.8, 201.49], weeklyChange: 1.4, sortRank: 6,
      marketCap: '$224B', pe: 18, revenueGrowth: 15, eps: 9.20, grossMargin: 56, dividendYield: 2.1,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: false },
      tonyNote: 'Qualcomm is the dominant mobile processor and modem supplier with a growing edge AI story via Snapdragon X Elite. In semiconductor ETFs, Qualcomm is classified as a fabless chip designer — held by SOXX, PSI, and XSD. DRAM excludes it given its focus is not memory. Edge AI inference is the long-term catalyst as on-device processing gains traction versus cloud-centric alternatives.',
    },
    {
      ticker: 'AMAT', name: 'Applied Materials', easyScore: 2, proScore: 3.8,
      price: 436.62, weeklyPrices: [430.6, 431.9, 433.3, 435.0, 436.62], weeklyChange: 1.4, sortRank: 7,
      marketCap: '$365B', pe: 20, revenueGrowth: 18, eps: 8.60, grossMargin: 48, dividendYield: 0.9,
      etfPresence: { SOXX: true, PSI: true, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials is the largest semiconductor equipment company globally. SOXX and PSI include equipment makers as part of the semiconductor ecosystem; XSD and DRAM are more narrowly focused on chip designers and memory producers. AMAT is the picks-and-shovels play on every chipmaker\'s capital expenditure cycle — it does not matter which chip wins, AMAT sells the tools to make it.',
    },
    {
      ticker: 'LRCX', name: 'Lam Research Corporation', easyScore: 2, proScore: 3.4,
      price: 284.72, weeklyPrices: [280.8, 281.8, 282.8, 283.7, 284.72], weeklyChange: 1.4, sortRank: 8,
      marketCap: '$370B', pe: 22, revenueGrowth: 24, eps: 3.90, grossMargin: 47, dividendYield: 1.1,
      etfPresence: { SOXX: true, PSI: true, XSD: false, DRAM: false },
      tonyNote: 'Lam Research dominates etch and deposition equipment — critical tools in every advanced semiconductor manufacturing flow. SOXX and PSI include equipment makers; XSD and DRAM do not. As chip geometries shrink, etch steps per wafer increase, creating a structural tailwind for Lam regardless of which chipmaker wins. Customer concentration (Samsung, TSMC, Micron) is the key risk.',
    },
    {
      ticker: 'TXN', name: 'Texas Instruments', easyScore: 2, proScore: 3.2,
      price: 302.73, weeklyPrices: [298.6, 299.4, 300.3, 301.5, 302.73], weeklyChange: 1.4, sortRank: 9,
      marketCap: '$276B', pe: 30, revenueGrowth: 12, eps: 6.30, grossMargin: 64, dividendYield: 2.8,
      etfPresence: { SOXX: true, PSI: true, XSD: false, DRAM: false },
      tonyNote: 'Texas Instruments is the quintessential quality compounder in semiconductors — analog chips, 100,000+ customers, 20-year dividend growth streak. Held by SOXX and PSI as a core analog semiconductor name. XSD skews toward higher-growth digital chips; DRAM is memory-focused. TI is building new internal fabs (300mm) to lock in low-cost manufacturing for decades. Capital-allocation machine, not a growth stock.',
    },
    {
      ticker: 'KLAC', name: 'KLA Corporation', easyScore: 2, proScore: 2.9,
      price: 1804.32, weeklyPrices: [1779.4, 1785.6, 1791.8, 1798.1, 1804.32], weeklyChange: 1.4, sortRank: 10,
      marketCap: '$245B', pe: 26, revenueGrowth: 20, eps: 26.50, grossMargin: 58, dividendYield: 0.9,
      etfPresence: { SOXX: true, PSI: true, XSD: false, DRAM: false },
      tonyNote: 'KLA dominates process control and inspection equipment — the systems chipmakers use to detect defects during manufacturing. Near-monopoly position in a segment that becomes more critical as chip complexity increases. Held by SOXX and PSI as part of the broad semiconductor ecosystem. Every advanced node transition increases inspection intensity, creating a structural growth driver independent of overall equipment spending.',
    },
  ],

  // ── Broad Tech (10 ETFs: QQQ QQQA PTF WCLD MAGS IGV FDTX GTEK ARKK MARS) ────
  'Broad Tech': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corporation', easyScore: 8, proScore: 8.6,
      price: 225.32, weeklyPrices: [222.2, 223.0, 223.8, 224.5, 225.32], weeklyChange: 1.4, sortRank: 1,
      marketCap: '$5.5T', pe: 35, revenueGrowth: 78, eps: 3.50, grossMargin: 75, dividendYield: 0.03,
      etfPresence: { QQQ: true, QQQA: true, PTF: true, WCLD: false, MAGS: true, IGV: false, FDTX: true, GTEK: true, ARKK: true, MARS: true },
      tonyNote: 'NVIDIA holds 80%+ share in datacenter AI accelerators. The Blackwell GPU cycle is driving extraordinary enterprise demand from every major hyperscaler. In broad tech ETFs, NVDA is a top-5 holding in QQQ by weight and the defining AI infrastructure story. Watch AMD\'s MI300 series and custom silicon as the structural competitive risks.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc.', easyScore: 6, proScore: 5.2,
      price: 425.19, weeklyPrices: [419.3, 420.6, 421.9, 423.5, 425.19], weeklyChange: 1.4, sortRank: 2,
      marketCap: '$2.0T', pe: 28, revenueGrowth: 44, eps: 7.50, grossMargin: 68, dividendYield: 1.2,
      etfPresence: { QQQ: true, QQQA: true, PTF: true, WCLD: false, MAGS: false, IGV: false, FDTX: true, GTEK: true, ARKK: false, MARS: true },
      tonyNote: 'Broadcom is the dominant supplier of custom AI ASICs for hyperscalers alongside its high-margin networking fabric business. The VMware acquisition added a stable, growing software revenue stream that reduces hardware cyclicality. Strong free cash flow supports a growing dividend. Key risk: revenue concentration in a handful of hyperscaler customers.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices', easyScore: 6, proScore: 4.8,
      price: 424.10, weeklyPrices: [418.2, 419.6, 421.0, 422.6, 424.10], weeklyChange: 1.4, sortRank: 3,
      marketCap: '$687B', pe: 25, revenueGrowth: 36, eps: 4.50, grossMargin: 53, dividendYield: null,
      etfPresence: { QQQ: true, QQQA: true, PTF: true, WCLD: false, MAGS: false, IGV: false, FDTX: true, GTEK: true, ARKK: true, MARS: false },
      tonyNote: 'AMD is the credible challenger to NVIDIA in AI GPUs with its MI300X series gaining meaningful datacenter adoption. In broad tech ETFs, AMD is a core holding in QQQ, PTF, FDTX, and GTEK. GPU roadmap execution is the critical watch item — delays vs NVIDIA\'s Blackwell would re-widen the performance gap.',
    },
    {
      ticker: 'MU', name: 'Micron Technology', easyScore: 4, proScore: 4.2,
      price: 724.66, weeklyPrices: [714.7, 717.2, 719.6, 722.1, 724.66], weeklyChange: 1.4, sortRank: 4,
      marketCap: '$804B', pe: 12, revenueGrowth: 58, eps: 10.50, grossMargin: 42, dividendYield: 0.4,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: true, GTEK: true, ARKK: true, MARS: false },
      tonyNote: 'Micron is the primary US beneficiary of the AI memory supercycle. In broad tech ETFs, Micron appears in more selective funds (FDTX, GTEK, ARKK) that weight the AI infrastructure story. QQQ and QQQA underweight memory versus pure software. HBM demand for AI accelerators is driving DRAM pricing power the company has not seen in a decade.',
    },
    {
      ticker: 'SNPS', name: 'Synopsys Inc.', easyScore: 3, proScore: 2.8,
      price: 502.42, weeklyPrices: [497.9, 498.9, 499.9, 501.2, 502.42], weeklyChange: 0.9, sortRank: 5,
      marketCap: '$81B', pe: 38, revenueGrowth: 17, eps: 13.20, grossMargin: 80, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: true, WCLD: false, MAGS: false, IGV: true, FDTX: true, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Synopsys is a near-duopoly (with Cadence) in Electronic Design Automation — the software that chip designers use to create every semiconductor in existence. IGV holds Synopsys as a software company; PTF and FDTX include it as a disruptive tech play. 80% gross margins and near-zero marginal cost of delivery. The AI Copilot tools are accelerating chip design productivity, growing the addressable market.',
    },
    {
      ticker: 'QCOM', name: 'Qualcomm Inc.', easyScore: 3, proScore: 2.6,
      price: 201.49, weeklyPrices: [198.7, 199.4, 200.1, 200.8, 201.49], weeklyChange: 1.4, sortRank: 6,
      marketCap: '$224B', pe: 18, revenueGrowth: 15, eps: 9.20, grossMargin: 56, dividendYield: 2.1,
      etfPresence: { QQQ: true, QQQA: false, PTF: true, WCLD: false, MAGS: false, IGV: false, FDTX: true, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Qualcomm is the dominant mobile processor and modem supplier with a growing edge AI story. QQQ holds Qualcomm as part of the Nasdaq 100. PTF and FDTX include it as a tech momentum play. Edge AI inference is the long-term catalyst — on-device processing gains traction versus cloud-centric alternatives.',
    },
    {
      ticker: 'INTC', name: 'Intel Corporation', easyScore: 2, proScore: 2.1,
      price: 108.77, weeklyPrices: [107.3, 107.6, 108.0, 108.4, 108.77], weeklyChange: 1.4, sortRank: 7,
      marketCap: '$461B', pe: null, revenueGrowth: -7, eps: -0.30, grossMargin: 40, dividendYield: null,
      etfPresence: { QQQ: true, QQQA: false, PTF: true, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Intel is in a deep restructuring cycle. In broad tech ETFs, Intel appears only in QQQ (by index weight) and PTF. The more selective funds (GTEK, FDTX, ARKK) have moved past Intel given the competitive deterioration. The bull case is Intel 18A process achieving TSMC parity by 2027. The bear case is it misses again. High execution risk across every business unit.',
    },
    {
      ticker: 'AMAT', name: 'Applied Materials', easyScore: 2, proScore: 1.9,
      price: 436.62, weeklyPrices: [430.6, 431.9, 433.3, 435.0, 436.62], weeklyChange: 1.4, sortRank: 8,
      marketCap: '$365B', pe: 20, revenueGrowth: 18, eps: 8.60, grossMargin: 48, dividendYield: 0.9,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: true, GTEK: true, ARKK: false, MARS: false },
      tonyNote: 'Applied Materials is the largest semiconductor equipment company globally. In broad tech ETFs, AMAT appears in more thematic funds (FDTX, GTEK) that look at the full tech infrastructure stack. QQQ and QQQA underweight equipment versus software. AMAT\'s unique position as an enabler of every major chipmaker rather than a competitor makes it a picks-and-shovels play on the AI buildout.',
    },
    {
      ticker: 'KLAC', name: 'KLA Corporation', easyScore: 2, proScore: 1.7,
      price: 1804.32, weeklyPrices: [1779.4, 1785.6, 1791.8, 1798.1, 1804.32], weeklyChange: 1.4, sortRank: 9,
      marketCap: '$245B', pe: 26, revenueGrowth: 20, eps: 26.50, grossMargin: 58, dividendYield: 0.9,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: true, GTEK: true, ARKK: false, MARS: false },
      tonyNote: 'KLA dominates process control and inspection equipment. In broad tech ETFs, KLA appears in FDTX and GTEK as part of the semiconductor ecosystem story. Every advanced node transition increases inspection intensity, creating a structural growth driver. Near-monopoly position with high gross margins makes KLA a capital-light compounder within equipment.',
    },
    {
      ticker: 'TXN', name: 'Texas Instruments', easyScore: 1, proScore: 1.4,
      price: 302.73, weeklyPrices: [298.6, 299.4, 300.3, 301.5, 302.73], weeklyChange: 1.4, sortRank: 10,
      marketCap: '$276B', pe: 30, revenueGrowth: 12, eps: 6.30, grossMargin: 64, dividendYield: 2.8,
      etfPresence: { QQQ: true, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Texas Instruments appears in broad tech ETFs only via QQQ (Nasdaq 100 weighting). More selective broad tech funds exclude TI in favour of higher-growth software and AI plays. TI is the quintessential quality compounder in semiconductors — 20-year dividend growth streak, 100,000+ customers, analog chips with decade-long product cycles. Capital-allocation machine, not a growth stock.',
    },
  ],

  // ── Electrification (4 ETFs: POW VOLT PBD PBW) ───────────────────────────────
  'Electrification': [
    {
      ticker: 'ETN', name: 'Eaton Corporation PLC', easyScore: 4, proScore: 8.2,
      price: 399.44, weeklyPrices: [392.8, 394.4, 396.1, 397.8, 399.44], weeklyChange: 1.7, sortRank: 1,
      marketCap: '$158B', pe: 36, revenueGrowth: 11, eps: 9.40, grossMargin: 38, dividendYield: 1.1,
      etfPresence: { POW: true, VOLT: true, PBD: true, PBW: true },
      tonyNote: 'Eaton is the best-positioned industrial in the AI-era electricity infrastructure buildout — data centers require massive amounts of power management, switchgear, and backup systems, all of which Eaton supplies. All four electrification ETFs hold Eaton as a core position. The electrical products segment is growing at tech-sector rates while retaining industrial multiple pricing. Vehicle electrification is a second multi-year tailwind for the e-mobility segment. Exceptional positioning across both defensive utility infrastructure and offensive AI-driven demand.',
    },
    {
      ticker: 'GE', name: 'GE Aerospace', easyScore: 3, proScore: 6.8,
      price: 281.53, weeklyPrices: [276.8, 277.9, 279.1, 280.3, 281.53], weeklyChange: 1.7, sortRank: 2,
      marketCap: '$377B', pe: 28, revenueGrowth: 14, eps: 6.50, grossMargin: 20, dividendYield: 0.8,
      etfPresence: { POW: true, VOLT: true, PBD: true, PBW: false },
      tonyNote: 'GE Aerospace (post-Vernova spin) is a pure aerospace and defense engine manufacturer. The Vernova spin-off (GE\'s power and renewables business) is the direct electrification play — turbines, wind, grid modernisation. The remaining GE Aerospace appears in POW, VOLT, and PBD as a power technology company. Commercial aviation recovery and defense engine programs provide multi-decade government contract revenue. The spin-off structure means investors must hold both GE Aerospace and GEV (Vernova) for full electrification exposure.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc.', easyScore: 3, proScore: 5.4,
      price: 888.31, weeklyPrices: [873.5, 876.5, 880.0, 884.3, 888.31], weeklyChange: 1.7, sortRank: 3,
      marketCap: '$440B', pe: 16, revenueGrowth: -4, eps: 22.80, grossMargin: 39, dividendYield: 1.6,
      etfPresence: { POW: true, VOLT: true, PBD: false, PBW: true },
      tonyNote: 'Caterpillar appears in three electrification ETFs as a core infrastructure play. US infrastructure spending (CHIPS Act, IRA, Bipartisan Infrastructure Law) creates a multi-year domestic demand tailwind. Mining equipment demand is tied to energy transition metal requirements (copper, lithium) — a direct electrification beneficiary. Services (parts, digital monitoring) are growing faster than equipment and provide recurring revenue through the equipment cycle.',
    },
    {
      ticker: 'HON', name: 'Honeywell International', easyScore: 3, proScore: 4.8,
      price: 213.24, weeklyPrices: [209.7, 210.6, 211.5, 212.3, 213.24], weeklyChange: 1.7, sortRank: 4,
      marketCap: '$137B', pe: 22, revenueGrowth: 7, eps: 10.60, grossMargin: 34, dividendYield: 2.2,
      etfPresence: { POW: true, VOLT: false, PBD: true, PBW: true },
      tonyNote: 'Honeywell\'s decision to split into three separate companies under pressure from Elliott Management is the key near-term catalyst. The automation and process controls business has strong pricing power in industrial automation. The buildings and energy solutions segment is directly tied to electrification — smart building controls, energy management systems, and grid-adjacent technology. Breaking up removes the conglomerate discount — each business unit should command sector-appropriate multiples.',
    },
    {
      ticker: 'DE', name: 'Deere & Company', easyScore: 2, proScore: 3.6,
      price: 561.83, weeklyPrices: [552.4, 554.8, 557.2, 559.5, 561.83], weeklyChange: 1.7, sortRank: 5,
      marketCap: '$169B', pe: 19, revenueGrowth: -14, eps: 23.80, grossMargin: 31, dividendYield: 1.5,
      etfPresence: { POW: true, VOLT: true, PBD: false, PBW: false },
      tonyNote: 'Deere\'s precision agriculture technology — See & Spray robotic herbicide application, autonomous farming — is creating a software-enabled agriculture model that reduces chemical use and energy inputs. Equipment demand is digesting the pandemic-era order surge, creating a cyclical trough in 2025. POW and VOLT include Deere as an electrification-adjacent industrial. The structural thesis: fewer farmers need to grow more food with less inputs, and Deere\'s technology is the enabler.',
    },
    {
      ticker: 'EMR', name: 'Emerson Electric Co.', easyScore: 2, proScore: 3.2,
      price: 133.05, weeklyPrices: [130.8, 131.4, 131.9, 132.5, 133.05], weeklyChange: 1.7, sortRank: 6,
      marketCap: '$74B', pe: 21, revenueGrowth: 8, eps: 5.40, grossMargin: 44, dividendYield: 2.2,
      etfPresence: { POW: true, VOLT: true, PBD: false, PBW: false },
      tonyNote: 'Emerson Electric is now focused on industrial automation and process control following the Aspen Technology consolidation. POW and VOLT include Emerson as an electrification-adjacent industrial automation play. The combination of traditional industrial controls with Aspen\'s software creates an asset-intensive manufacturing optimisation stack. Process industries (chemical, oil and gas, pharma) modernising their plants is the secular tailwind. Steadier and more predictable earnings through the cycle than pure-play renewables.',
    },
    {
      ticker: 'RTX', name: 'RTX Corporation', easyScore: 1, proScore: 2.8,
      price: 171.18, weeklyPrices: [168.3, 169.0, 169.7, 170.5, 171.18], weeklyChange: 1.7, sortRank: 7,
      marketCap: '$228B', pe: 22, revenueGrowth: 9, eps: 5.80, grossMargin: 24, dividendYield: 2.2,
      etfPresence: { POW: true, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'RTX combines Pratt & Whitney aircraft engines with Raytheon\'s defense missile systems and radar. POW includes RTX as a power technology and advanced propulsion play. The Pratt & Whitney GTF engine blade powder metal recall created significant costs in 2023-24 — those charges are now largely behind them. Defense backlog for Patriot missiles provides revenue visibility into 2028+. Aerospace cycle recovery and global defense spending expansion are two simultaneous tailwinds.',
    },
    {
      ticker: 'LMT', name: 'Lockheed Martin Corp.', easyScore: 1, proScore: 2.4,
      price: 516.01, weeklyPrices: [507.4, 509.5, 511.7, 513.9, 516.01], weeklyChange: 1.7, sortRank: 8,
      marketCap: '$122B', pe: 18, revenueGrowth: 5, eps: 27.20, grossMargin: 13, dividendYield: 2.6,
      etfPresence: { POW: false, VOLT: false, PBD: true, PBW: false },
      tonyNote: 'Lockheed Martin is the prime contractor for the F-35 fighter jet. PBD includes Lockheed as part of a broader clean technology and advanced industrial theme. Defense budgets globally are expanding following Russia-Ukraine and Middle East tensions. F-35 production is ramping back up after supply chain disruptions. The Strategic Defense Initiative revival and hypersonic weapon programs are upside vectors. The growing dividend makes this the industrials income stock for patient investors.',
    },
    {
      ticker: 'UPS', name: 'United Parcel Service', easyScore: 1, proScore: 1.8,
      price: 98.93, weeklyPrices: [97.3, 97.7, 98.1, 98.5, 98.93], weeklyChange: 1.7, sortRank: 9,
      marketCap: '$84B', pe: 12, revenueGrowth: -3, eps: 9.40, grossMargin: 28, dividendYield: 5.2,
      etfPresence: { POW: false, VOLT: true, PBD: false, PBW: false },
      tonyNote: 'UPS is in the middle of a volume and margin reset following the 2023 Teamsters contract. VOLT includes UPS as an electrification beneficiary — the company is aggressively electrifying its delivery fleet with EV vans and trucks, making it a logistics electrification play. The strategic shift to "better, not bigger" — prioritising healthcare, SMB, and premium international over pure volume — is the right long-term play. The ~5.2% dividend yield makes patience easier while management executes the repositioning.',
    },
    {
      ticker: 'NOC', name: 'Northrop Grumman Corp.', easyScore: 0, proScore: 0.0,
      price: 540.69, weeklyPrices: [531.7, 533.9, 536.2, 538.4, 540.69], weeklyChange: 1.7, sortRank: 10,
      marketCap: '$82B', pe: 17, revenueGrowth: 5, eps: 31.20, grossMargin: 13, dividendYield: 1.8,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Northrop Grumman is the B-21 Raider stealth bomber prime contractor. None of the four electrification ETFs hold Northrop — it is a pure defense company with no clean energy or electrification angle. It appears here as a benchmark comparison: a high-quality industrial with strong government backlog that the electrification ETF universe has explicitly excluded. Northrop\'s backlog is large and funded — a government-contracted annuity in industrial form, but not an electrification story.',
    },
  ],

  // ── Industrials (2 ETFs: AIRR PRN) ───────────────────────────────────────────
  'Industrials': [
    {
      ticker: 'CAT', name: 'Caterpillar Inc.', easyScore: 2, proScore: 8.4,
      price: 888.31, weeklyPrices: [873.5, 876.5, 880.0, 884.3, 888.31], weeklyChange: 1.7, sortRank: 1,
      marketCap: '$440B', pe: 16, revenueGrowth: -4, eps: 22.80, grossMargin: 39, dividendYield: 1.6,
      etfPresence: { AIRR: true, PRN: true },
      tonyNote: 'Caterpillar is the global standard for heavy construction and mining equipment — when infrastructure gets built anywhere in the world, CAT machinery does it. Both AIRR (American industrial renaissance) and PRN (industrials momentum) hold Caterpillar as a core position. US infrastructure spending (CHIPS Act, IRA, Bipartisan Infrastructure Law) creates a multi-year domestic demand tailwind. Mining equipment demand is tied to energy transition metal requirements (copper, lithium). Services are growing faster than equipment.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corporation PLC', easyScore: 2, proScore: 7.6,
      price: 399.44, weeklyPrices: [392.8, 394.4, 396.1, 397.8, 399.44], weeklyChange: 1.7, sortRank: 2,
      marketCap: '$158B', pe: 36, revenueGrowth: 11, eps: 9.40, grossMargin: 38, dividendYield: 1.1,
      etfPresence: { AIRR: true, PRN: true },
      tonyNote: 'Eaton Corporation is the best-positioned industrial in the AI-era electricity infrastructure buildout. Both AIRR and PRN hold Eaton as a core position given its dominant role in US power management infrastructure. Data centers require massive amounts of power management, switchgear, and backup systems — all Eaton products. The electrical products segment is growing at tech-sector rates. Vehicle electrification is a second multi-year tailwind for the e-mobility segment.',
    },
    {
      ticker: 'GE', name: 'GE Aerospace', easyScore: 2, proScore: 7.2,
      price: 281.53, weeklyPrices: [276.8, 277.9, 279.1, 280.3, 281.53], weeklyChange: 1.7, sortRank: 3,
      marketCap: '$377B', pe: 28, revenueGrowth: 14, eps: 6.50, grossMargin: 20, dividendYield: 0.8,
      etfPresence: { AIRR: true, PRN: true },
      tonyNote: 'GE Aerospace (post-Vernova spin) is a pure aerospace and defense engine manufacturer. AIRR and PRN hold GE Aerospace as a core US industrial renaissance play — the maker of CFM and LEAP engines powering the majority of Boeing and Airbus narrowbodies. Commercial aviation recovery has been stronger than expected, and the services aftermarket generates high-margin recurring revenue tied to every flight hour. Defense engine programs are multi-decade government contracts.',
    },
    {
      ticker: 'HON', name: 'Honeywell International', easyScore: 2, proScore: 6.1,
      price: 213.24, weeklyPrices: [209.7, 210.6, 211.5, 212.3, 213.24], weeklyChange: 1.7, sortRank: 4,
      marketCap: '$137B', pe: 22, revenueGrowth: 7, eps: 10.60, grossMargin: 34, dividendYield: 2.2,
      etfPresence: { AIRR: true, PRN: true },
      tonyNote: 'Honeywell\'s decision to split into three separate companies under pressure from Elliott Management is the key near-term catalyst. Breaking up removes the conglomerate discount. AIRR and PRN both hold Honeywell as a core industrials position. The automation and process controls business has strong pricing power. Aerospace segment benefits from the same commercial aviation recovery tailwind as GE and RTX.',
    },
    {
      ticker: 'DE', name: 'Deere & Company', easyScore: 2, proScore: 4.6,
      price: 561.83, weeklyPrices: [552.4, 554.8, 557.2, 559.5, 561.83], weeklyChange: 1.7, sortRank: 5,
      marketCap: '$169B', pe: 19, revenueGrowth: -14, eps: 23.80, grossMargin: 31, dividendYield: 1.5,
      etfPresence: { AIRR: true, PRN: true },
      tonyNote: 'Deere\'s precision agriculture technology is creating a software-enabled agriculture model that competitors cannot quickly replicate. AIRR and PRN hold Deere as a core US industrial. Equipment demand is digesting the pandemic-era order surge, creating a cyclical trough in 2025. The structural thesis is intact: fewer farmers need to grow more food with less inputs, and Deere\'s technology is the enabler. The stock is near cycle lows — a counter-cyclical buy opportunity for patient investors.',
    },
    {
      ticker: 'RTX', name: 'RTX Corporation', easyScore: 2, proScore: 4.1,
      price: 171.18, weeklyPrices: [168.3, 169.0, 169.7, 170.5, 171.18], weeklyChange: 1.7, sortRank: 6,
      marketCap: '$228B', pe: 22, revenueGrowth: 9, eps: 5.80, grossMargin: 24, dividendYield: 2.2,
      etfPresence: { AIRR: true, PRN: true },
      tonyNote: 'RTX combines Pratt & Whitney aircraft engines with Raytheon\'s defense missile systems and radar. Both AIRR and PRN hold RTX as a core US industrial renaissance name. The Pratt & Whitney GTF engine blade recall charges are now largely behind them. Defense backlog for Patriot missiles provides revenue visibility into 2028+. The aerospace cycle recovery and global defense spending expansion are two simultaneous tailwinds — rare positioning.',
    },
    {
      ticker: 'LMT', name: 'Lockheed Martin Corp.', easyScore: 2, proScore: 3.9,
      price: 516.01, weeklyPrices: [507.4, 509.5, 511.7, 513.9, 516.01], weeklyChange: 1.7, sortRank: 7,
      marketCap: '$122B', pe: 18, revenueGrowth: 5, eps: 27.20, grossMargin: 13, dividendYield: 2.6,
      etfPresence: { AIRR: true, PRN: true },
      tonyNote: 'Lockheed Martin is the prime contractor for the F-35 fighter jet. AIRR and PRN hold Lockheed as a core US defense industrial. Defense budgets globally are expanding following Russia-Ukraine and Middle East tensions. F-35 production is ramping back up after supply chain disruptions. Strategic Defense Initiative revival and hypersonic weapon programs are upside vectors. The growing dividend makes this the industrials income stock for patient investors.',
    },
    {
      ticker: 'EMR', name: 'Emerson Electric Co.', easyScore: 2, proScore: 2.8,
      price: 133.05, weeklyPrices: [130.8, 131.4, 131.9, 132.5, 133.05], weeklyChange: 1.7, sortRank: 8,
      marketCap: '$74B', pe: 21, revenueGrowth: 8, eps: 5.40, grossMargin: 44, dividendYield: 2.2,
      etfPresence: { AIRR: true, PRN: true },
      tonyNote: 'Emerson Electric is now focused on industrial automation and process control following the Aspen Technology consolidation. AIRR and PRN both hold Emerson as a core US industrial automation name. The combination of traditional industrial controls with Aspen\'s software creates an asset-intensive manufacturing optimisation stack. Less geopolitical exposure than defense peers, but steadier and more predictable earnings through the cycle.',
    },
    {
      ticker: 'NOC', name: 'Northrop Grumman Corp.', easyScore: 1, proScore: 2.4,
      price: 540.69, weeklyPrices: [531.7, 533.9, 536.2, 538.4, 540.69], weeklyChange: 1.7, sortRank: 9,
      marketCap: '$82B', pe: 17, revenueGrowth: 5, eps: 31.20, grossMargin: 13, dividendYield: 1.8,
      etfPresence: { AIRR: false, PRN: true },
      tonyNote: 'Northrop Grumman is the B-21 Raider stealth bomber prime contractor — the first new US strategic bomber program in 40 years. PRN holds Northrop as an industrials momentum name; AIRR excludes it given its focus on manufacturing and infrastructure renaissance rather than pure defense. Space and launch vehicle work (LGM-35A Sentinel ICBM replacement) are similarly long-cycle programs. Northrop\'s backlog is large and funded — a government-contracted annuity in industrial form.',
    },
    {
      ticker: 'UPS', name: 'United Parcel Service', easyScore: 1, proScore: 1.8,
      price: 98.93, weeklyPrices: [97.3, 97.7, 98.1, 98.5, 98.93], weeklyChange: 1.7, sortRank: 10,
      marketCap: '$84B', pe: 12, revenueGrowth: -3, eps: 9.40, grossMargin: 28, dividendYield: 5.2,
      etfPresence: { AIRR: false, PRN: true },
      tonyNote: 'UPS is in the middle of a volume and margin reset following the 2023 Teamsters contract. PRN holds UPS as an industrials momentum name; AIRR focuses on manufacturing renaissance names rather than logistics. The strategic shift to "better, not bigger" — prioritising healthcare, SMB, and premium international — is the right long-term play but creates a multi-year earnings trough. The ~5.2% dividend yield makes patience easier while management executes the repositioning.',
    },
  ],
};
