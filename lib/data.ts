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
// @@GENERATED:THEME_ETF_COUNT@@
export const THEME_ETF_COUNT: Record<Theme, number> = {
  'AI & ML':         3,
  'Semiconductors':  3,
  'Broad Tech':      4,
  'Electrification': 2,
  'Industrials':     1,
};
// @@END_GENERATED:THEME_ETF_COUNT@@

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

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 3, proScore: 6.48,
      price: 682, weeklyPrices: [661.54, 668.36, 671.77, 677.23, 682.00], weeklyChange: 0.07, sortRank: 0,
      marketCap: '$769B', pe: 32.2, revenueGrowth: 196, eps: 21.2, grossMargin: 58, dividendYield: 0.09,
      etfPresence: { AIS: false, ARTY: true, BAI: true, IVEP: false, IGPT: true, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'MICRON TECHNOLOGY INC appears in 3 of 3 AI & ML ETFs (100% coverage) with average weight 6.5% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, proScore: 6.11,
      price: 408.12, weeklyPrices: [395.88, 399.96, 402.00, 405.26, 408.12], weeklyChange: -3.06, sortRank: 0,
      marketCap: '$665B', pe: 136.5, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: false, ARTY: true, BAI: true, IVEP: false, IGPT: true, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'ADVANCED MICRO DEVICES INC appears in 3 of 3 AI & ML ETFs (100% coverage) with average weight 6.1% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, proScore: 5.62,
      price: 220.58, weeklyPrices: [213.96, 216.17, 217.27, 219.04, 220.58], weeklyChange: -0.78, sortRank: 0,
      marketCap: '$5.3T', pe: 45.1, revenueGrowth: 73, eps: 4.89, grossMargin: 71, dividendYield: 0.02,
      etfPresence: { AIS: false, ARTY: true, BAI: true, IVEP: false, IGPT: true, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'NVIDIA CORP appears in 3 of 3 AI & ML ETFs (100% coverage) with average weight 5.6% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'WESTERN DIGITAL CORP', easyScore: 3, proScore: 2.74,
      price: 441.78, weeklyPrices: [428.53, 432.94, 435.15, 438.69, 441.78], weeklyChange: -3.68, sortRank: 0,
      marketCap: '$152B', pe: 26.5, revenueGrowth: 46, eps: 16.7, grossMargin: 45, dividendYield: 0.13,
      etfPresence: { AIS: false, ARTY: true, BAI: true, IVEP: false, IGPT: true, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'WESTERN DIGITAL CORP appears in 3 of 3 AI & ML ETFs (100% coverage) with average weight 2.7% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNOW', name: 'SNOWFLAKE INC', easyScore: 3, proScore: 1.07,
      price: 168.65, weeklyPrices: [163.59, 165.28, 166.12, 167.47, 168.65], weeklyChange: 2.69, sortRank: 0,
      marketCap: '$58B', pe: null, revenueGrowth: 30, eps: -3.96, grossMargin: 67, dividendYield: null,
      etfPresence: { AIS: false, ARTY: true, BAI: true, IVEP: false, IGPT: true, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'SNOWFLAKE INC appears in 3 of 3 AI & ML ETFs (100% coverage) with average weight 1.1% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 3, proScore: 0.86,
      price: 161.82, weeklyPrices: [156.97, 158.58, 159.39, 160.69, 161.82], weeklyChange: 3.55, sortRank: 0,
      marketCap: '$30B', pe: 89.4, revenueGrowth: 202, eps: 1.81, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: false, ARTY: true, BAI: true, IVEP: false, IGPT: true, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'CREDO TECHNOLOGY GROUP HOLDING LTD appears in 3 of 3 AI & ML ETFs (100% coverage) with average weight 0.9% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 2, proScore: 5.79,
      price: 387, weeklyPrices: [375.39, 379.26, 381.19, 384.29, 387.00], weeklyChange: -2.5, sortRank: 0,
      marketCap: '$4.7T', pe: 29.5, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.22,
      etfPresence: { AIS: false, ARTY: false, BAI: true, IVEP: false, IGPT: true, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'ALPHABET INC CLASS A appears in 2 of 3 AI & ML ETFs (67% coverage) with average weight 5.8% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION CORP', easyScore: 2, proScore: 5.08,
      price: 105.46, weeklyPrices: [102.30, 103.35, 103.88, 104.72, 105.46], weeklyChange: -2.51, sortRank: 0,
      marketCap: '$530B', pe: null, revenueGrowth: 7, eps: -0.59, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: true, IVEP: false, IGPT: true, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'INTEL CORPORATION CORP appears in 2 of 3 AI & ML ETFs (67% coverage) with average weight 5.1% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, proScore: 4.92,
      price: 409.75, weeklyPrices: [397.46, 401.56, 403.60, 406.88, 409.75], weeklyChange: -2.61, sortRank: 0,
      marketCap: '$1.9T', pe: 79.9, revenueGrowth: 30, eps: 5.13, grossMargin: 77, dividendYield: 0.62,
      etfPresence: { AIS: false, ARTY: true, BAI: true, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'BROADCOM INC appears in 2 of 3 AI & ML ETFs (67% coverage) with average weight 4.9% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'SEAGATE TECHNOLOGY HOLDINGS PLC', easyScore: 2, proScore: 3,
      price: 710.46, weeklyPrices: [689.15, 696.25, 699.80, 705.49, 710.46], weeklyChange: -4.1, sortRank: 0,
      marketCap: '$159B', pe: 67.5, revenueGrowth: 44, eps: 10.52, grossMargin: 42, dividendYield: 0.4,
      etfPresence: { AIS: false, ARTY: true, BAI: false, IVEP: false, IGPT: true, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'SEAGATE TECHNOLOGY HOLDINGS PLC appears in 2 of 3 AI & ML ETFs (67% coverage) with average weight 3.0% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRWV', name: 'COREWEAVE INC CLASS A', easyScore: 2, proScore: 2.71,
      price: 96.46, weeklyPrices: [93.57, 94.53, 95.01, 95.78, 96.46], weeklyChange: -7.04, sortRank: 0,
      marketCap: '$53B', pe: null, revenueGrowth: 112, eps: -2.72, grossMargin: 69, dividendYield: null,
      etfPresence: { AIS: false, ARTY: true, BAI: true, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'COREWEAVE INC CLASS A appears in 2 of 3 AI & ML ETFs (67% coverage) with average weight 2.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SMCI', name: 'SUPER MICRO COMPUTER INC', easyScore: 2, proScore: 1.59,
      price: 29.92, weeklyPrices: [29.02, 29.32, 29.47, 29.71, 29.92], weeklyChange: -3.01, sortRank: 0,
      marketCap: '$18B', pe: 15.7, revenueGrowth: 123, eps: 1.9, grossMargin: 8, dividendYield: null,
      etfPresence: { AIS: false, ARTY: true, BAI: false, IVEP: false, IGPT: true, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'SUPER MICRO COMPUTER INC appears in 2 of 3 AI & ML ETFs (67% coverage) with average weight 1.6% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, proScore: 6.44,
      price: 408.12, weeklyPrices: [395.88, 399.96, 402.00, 405.26, 408.12], weeklyChange: -3.06, sortRank: 0,
      marketCap: '$665B', pe: 136.5, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: false },
      tonyNote: 'ADVANCED MICRO DEVICES INC appears in 3 of 3 Semiconductors ETFs (100% coverage) with average weight 6.4% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 3, proScore: 5.97,
      price: 682, weeklyPrices: [661.54, 668.36, 671.77, 677.23, 682.00], weeklyChange: 0.07, sortRank: 0,
      marketCap: '$769B', pe: 32.2, revenueGrowth: 196, eps: 21.2, grossMargin: 58, dividendYield: 0.09,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: false },
      tonyNote: 'MICRON TECHNOLOGY INC appears in 3 of 3 Semiconductors ETFs (100% coverage) with average weight 6.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 3, proScore: 4.71,
      price: 409.75, weeklyPrices: [397.46, 401.56, 403.60, 406.88, 409.75], weeklyChange: -2.61, sortRank: 0,
      marketCap: '$1.9T', pe: 79.9, revenueGrowth: 30, eps: 5.13, grossMargin: 77, dividendYield: 0.62,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: false },
      tonyNote: 'BROADCOM INC appears in 3 of 3 Semiconductors ETFs (100% coverage) with average weight 4.7% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, proScore: 4.41,
      price: 220.58, weeklyPrices: [213.96, 216.17, 217.27, 219.04, 220.58], weeklyChange: -0.78, sortRank: 0,
      marketCap: '$5.3T', pe: 45.1, revenueGrowth: 73, eps: 4.89, grossMargin: 71, dividendYield: 0.02,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: false },
      tonyNote: 'NVIDIA CORP appears in 3 of 3 Semiconductors ETFs (100% coverage) with average weight 4.4% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 3, proScore: 3.87,
      price: 298.78, weeklyPrices: [289.82, 292.80, 294.30, 296.69, 298.78], weeklyChange: -0.61, sortRank: 0,
      marketCap: '$272B', pe: 51, revenueGrowth: 19, eps: 5.86, grossMargin: 57, dividendYield: 1.89,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: false },
      tonyNote: 'TEXAS INSTRUMENT INC appears in 3 of 3 Semiconductors ETFs (100% coverage) with average weight 3.9% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 3, proScore: 2.89,
      price: 105.93, weeklyPrices: [102.75, 103.81, 104.34, 105.19, 105.93], weeklyChange: -3.2, sortRank: 0,
      marketCap: '$41B', pe: 77.9, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: false },
      tonyNote: 'ON SEMICONDUCTOR CORP appears in 3 of 3 Semiconductors ETFs (100% coverage) with average weight 2.9% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 3, proScore: 2.8,
      price: 1437.38, weeklyPrices: [1394.26, 1408.63, 1415.82, 1427.32, 1437.38], weeklyChange: -3.29, sortRank: 0,
      marketCap: '$71B', pe: 102.9, revenueGrowth: 26, eps: 13.97, grossMargin: 55, dividendYield: 0.54,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: false },
      tonyNote: 'MONOLITHIC POWER SYSTEMS INC appears in 3 of 3 Semiconductors ETFs (100% coverage) with average weight 2.8% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, proScore: 2.61,
      price: 414.01, weeklyPrices: [401.59, 405.73, 407.80, 411.11, 414.01], weeklyChange: -1.09, sortRank: 0,
      marketCap: '$202B', pe: 75.5, revenueGrowth: 30, eps: 5.48, grossMargin: 63, dividendYield: 0.97,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 3 Semiconductors ETFs (100% coverage) with average weight 2.6% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 3, proScore: 2.55,
      price: 91.35, weeklyPrices: [88.61, 89.52, 89.98, 90.71, 91.35], weeklyChange: -1.52, sortRank: 0,
      marketCap: '$49B', pe: 415.2, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 1.96,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 3 of 3 Semiconductors ETFs (100% coverage) with average weight 2.5% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 3, proScore: 2.3,
      price: 347.4, weeklyPrices: [336.98, 340.45, 342.19, 344.97, 347.40], weeklyChange: -2.48, sortRank: 0,
      marketCap: '$27B', pe: 147.8, revenueGrowth: 23, eps: 2.35, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 3 of 3 Semiconductors ETFs (100% coverage) with average weight 2.3% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SWKS', name: 'SKYWORKS SOLUTIONS INC', easyScore: 3, proScore: 1.68,
      price: 70.79, weeklyPrices: [68.67, 69.37, 69.73, 70.29, 70.79], weeklyChange: 0.63, sortRank: 0,
      marketCap: '$11B', pe: 29.5, revenueGrowth: -1, eps: 2.4, grossMargin: 41, dividendYield: 4.04,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: false },
      tonyNote: 'SKYWORKS SOLUTIONS INC appears in 3 of 3 Semiconductors ETFs (100% coverage) with average weight 1.7% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MXL', name: 'MaxLinear Inc', easyScore: 2, proScore: 7.99,
      price: 89.77, weeklyPrices: [87.08, 87.97, 88.42, 89.14, 89.77], weeklyChange: 2.64, sortRank: 0,
      marketCap: '$8B', pe: null, revenueGrowth: 43, eps: -1.52, grossMargin: 57, dividendYield: null,
      etfPresence: { SOXX: false, PSI: true, XSD: true, DRAM: false },
      tonyNote: 'MaxLinear Inc appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 8.0% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 3, proScore: 5.18,
      price: 220.58, weeklyPrices: [213.96, 216.17, 217.27, 219.04, 220.58], weeklyChange: -0.78, sortRank: 0,
      marketCap: '$5.3T', pe: 45.1, revenueGrowth: 73, eps: 4.89, grossMargin: 71, dividendYield: 0.02,
      etfPresence: { QQQ: true, QQQA: false, PTF: true, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: true, MARS: false },
      tonyNote: 'NVIDIA Corp appears in 3 of 4 Broad Tech ETFs (75% coverage) with average weight 5.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'Palantir Technologies Inc', easyScore: 3, proScore: 3.84,
      price: 134.35, weeklyPrices: [130.32, 131.66, 132.33, 133.41, 134.35], weeklyChange: -0.58, sortRank: 0,
      marketCap: '$322B', pe: 151, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { QQQ: true, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: true, FDTX: false, GTEK: false, ARKK: true, MARS: false },
      tonyNote: 'Palantir Technologies Inc appears in 3 of 4 Broad Tech ETFs (75% coverage) with average weight 3.8% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRCL', name: 'Circle Internet Group Inc', easyScore: 3, proScore: 2.23,
      price: 111.71, weeklyPrices: [108.36, 109.48, 110.03, 110.93, 111.71], weeklyChange: 0.29, sortRank: 0,
      marketCap: '$30B', pe: null, revenueGrowth: 20, eps: -0.23, grossMargin: 8, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: true, WCLD: false, MAGS: false, IGV: true, FDTX: false, GTEK: false, ARKK: true, MARS: false },
      tonyNote: 'Circle Internet Group Inc appears in 3 of 4 Broad Tech ETFs (75% coverage) with average weight 2.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSLA', name: 'Tesla Inc', easyScore: 2, proScore: 6.99,
      price: 397.59, weeklyPrices: [385.66, 389.64, 391.63, 394.81, 397.59], weeklyChange: -3.02, sortRank: 0,
      marketCap: '$1.5T', pe: 358.2, revenueGrowth: 16, eps: 1.11, grossMargin: 19, dividendYield: null,
      etfPresence: { QQQ: true, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: true, MARS: false },
      tonyNote: 'Tesla Inc appears in 2 of 4 Broad Tech ETFs (50% coverage) with average weight 7.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'Microsoft Corp', easyScore: 2, proScore: 6.74,
      price: 421.05, weeklyPrices: [408.42, 412.63, 414.73, 418.10, 421.05], weeklyChange: -0.59, sortRank: 0,
      marketCap: '$3.1T', pe: 25.1, revenueGrowth: 18, eps: 16.77, grossMargin: 68, dividendYield: 0.86,
      etfPresence: { QQQ: true, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: true, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Microsoft Corp appears in 2 of 4 Broad Tech ETFs (50% coverage) with average weight 6.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AAPL', name: 'Apple Inc', easyScore: 2, proScore: 6.05,
      price: 297.11, weeklyPrices: [288.20, 291.17, 292.65, 295.03, 297.11], weeklyChange: -0.25, sortRank: 0,
      marketCap: '$4.4T', pe: 36, revenueGrowth: 17, eps: 8.25, grossMargin: 48, dividendYield: 0.36,
      etfPresence: { QQQ: true, QQQA: false, PTF: true, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Apple Inc appears in 2 of 4 Broad Tech ETFs (50% coverage) with average weight 6.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 2, proScore: 4.13,
      price: 408.12, weeklyPrices: [395.88, 399.96, 402.00, 405.26, 408.12], weeklyChange: -3.06, sortRank: 0,
      marketCap: '$665B', pe: 136.5, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { QQQ: true, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: true, MARS: false },
      tonyNote: 'Advanced Micro Devices Inc appears in 2 of 4 Broad Tech ETFs (50% coverage) with average weight 4.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks Inc', easyScore: 2, proScore: 4.11,
      price: 244.41, weeklyPrices: [237.08, 239.52, 240.74, 242.70, 244.41], weeklyChange: -1.27, sortRank: 0,
      marketCap: '$198B', pe: 135, revenueGrowth: 15, eps: 1.81, grossMargin: 74, dividendYield: null,
      etfPresence: { QQQ: true, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: true, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Palo Alto Networks Inc appears in 2 of 4 Broad Tech ETFs (50% coverage) with average weight 4.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp/DE', easyScore: 2, proScore: 3.81,
      price: 1307.13, weeklyPrices: [1267.92, 1280.99, 1287.52, 1297.98, 1307.13], weeklyChange: -1.94, sortRank: 0,
      marketCap: '$194B', pe: 44.6, revenueGrowth: 251, eps: 29.33, grossMargin: 56, dividendYield: null,
      etfPresence: { QQQ: true, QQQA: false, PTF: true, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Sandisk Corp/DE appears in 2 of 4 Broad Tech ETFs (50% coverage) with average weight 3.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 2, proScore: 3.72,
      price: 255.84, weeklyPrices: [248.16, 250.72, 252.00, 254.05, 255.84], weeklyChange: -3.41, sortRank: 0,
      marketCap: '$2.8T', pe: 30.6, revenueGrowth: 17, eps: 8.37, grossMargin: 51, dividendYield: null,
      etfPresence: { QQQ: true, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: true, MARS: false },
      tonyNote: 'Amazon.com Inc appears in 2 of 4 Broad Tech ETFs (50% coverage) with average weight 3.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 2, proScore: 3.64,
      price: 682, weeklyPrices: [661.54, 668.36, 671.77, 677.23, 682.00], weeklyChange: 0.07, sortRank: 0,
      marketCap: '$769B', pe: 32.2, revenueGrowth: 196, eps: 21.2, grossMargin: 58, dividendYield: 0.09,
      etfPresence: { QQQ: true, QQQA: false, PTF: true, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Micron Technology Inc appears in 2 of 4 Broad Tech ETFs (50% coverage) with average weight 3.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRWD', name: 'Crowdstrike Holdings Inc', easyScore: 2, proScore: 3.24,
      price: 622.67, weeklyPrices: [603.99, 610.22, 613.33, 618.31, 622.67], weeklyChange: 0.62, sortRank: 0,
      marketCap: '$158B', pe: null, revenueGrowth: 23, eps: -0.68, grossMargin: 75, dividendYield: null,
      etfPresence: { QQQ: true, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: true, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Crowdstrike Holdings Inc appears in 2 of 4 Broad Tech ETFs (50% coverage) with average weight 3.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'BLDP', name: 'Ballard Power Systems Inc', easyScore: 2, proScore: 1.86,
      price: 4.04, weeklyPrices: [3.92, 3.96, 3.98, 4.01, 4.04], weeklyChange: -6.58, sortRank: 0,
      marketCap: '$1B', pe: null, revenueGrowth: 26, eps: -0.27, grossMargin: 11, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: true, PBW: true },
      tonyNote: 'Ballard Power Systems Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 1.9% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy Corp', easyScore: 2, proScore: 1.81,
      price: 250.76, weeklyPrices: [243.24, 245.74, 247.00, 249.00, 250.76], weeklyChange: -3.07, sortRank: 0,
      marketCap: '$71B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: true, PBW: true },
      tonyNote: 'Bloom Energy Corp appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 1.8% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLUG', name: 'Plug Power Inc', easyScore: 2, proScore: 1.63,
      price: 3.28, weeklyPrices: [3.18, 3.21, 3.23, 3.26, 3.28], weeklyChange: -4.93, sortRank: 0,
      marketCap: '$5B', pe: null, revenueGrowth: 22, eps: -1.39, grossMargin: -31, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: true, PBW: true },
      tonyNote: 'Plug Power Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 1.6% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SEDG', name: 'SolarEdge Technologies Inc', easyScore: 2, proScore: 1.33,
      price: 51.57, weeklyPrices: [50.02, 50.54, 50.80, 51.21, 51.57], weeklyChange: -6.63, sortRank: 0,
      marketCap: '$3B', pe: null, revenueGrowth: 42, eps: -6.13, grossMargin: 18, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: true, PBW: true },
      tonyNote: 'SolarEdge Technologies Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 1.3% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SHLS', name: 'Shoals Technologies Group Inc', easyScore: 2, proScore: 1.33,
      price: 9.14, weeklyPrices: [8.87, 8.96, 9.00, 9.08, 9.14], weeklyChange: -5.38, sortRank: 0,
      marketCap: '$2B', pe: 45.7, revenueGrowth: 75, eps: 0.2, grossMargin: 33, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: true, PBW: true },
      tonyNote: 'Shoals Technologies Group Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 1.3% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ENPH', name: 'Enphase Energy Inc', easyScore: 2, proScore: 1.16,
      price: 46.65, weeklyPrices: [45.25, 45.72, 45.95, 46.32, 46.65], weeklyChange: -6.13, sortRank: 0,
      marketCap: '$6B', pe: 46.2, revenueGrowth: -21, eps: 1.01, grossMargin: 27, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: true, PBW: true },
      tonyNote: 'Enphase Energy Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 1.2% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FSLR', name: 'First Solar Inc', easyScore: 2, proScore: 1.16,
      price: 224.95, weeklyPrices: [218.20, 220.45, 221.58, 223.38, 224.95], weeklyChange: -3.72, sortRank: 0,
      marketCap: '$24B', pe: 14.5, revenueGrowth: 24, eps: 15.49, grossMargin: 42, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: true, PBW: true },
      tonyNote: 'First Solar Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 1.2% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DAR', name: 'Darling Ingredients Inc', easyScore: 2, proScore: 1.15,
      price: 60.92, weeklyPrices: [59.09, 59.70, 60.01, 60.49, 60.92], weeklyChange: -1.95, sortRank: 0,
      marketCap: '$10B', pe: 44.1, revenueGrowth: 12, eps: 1.38, grossMargin: 25, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: true, PBW: true },
      tonyNote: 'Darling Ingredients Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 1.1% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORA', name: 'Ormat Technologies Inc', easyScore: 2, proScore: 1.14,
      price: 129.41, weeklyPrices: [125.53, 126.82, 127.47, 128.50, 129.41], weeklyChange: 0.13, sortRank: 0,
      marketCap: '$8B', pe: 62.5, revenueGrowth: 76, eps: 2.07, grossMargin: 28, dividendYield: 0.37,
      etfPresence: { POW: false, VOLT: false, PBD: true, PBW: true },
      tonyNote: 'Ormat Technologies Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 1.1% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CSIQ', name: 'Canadian Solar Inc', easyScore: 2, proScore: 1.13,
      price: 15.65, weeklyPrices: [15.18, 15.34, 15.42, 15.54, 15.65], weeklyChange: -8.91, sortRank: 0,
      marketCap: '$1B', pe: null, revenueGrowth: -20, eps: -2.52, grossMargin: 19, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: true, PBW: true },
      tonyNote: 'Canadian Solar Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 1.1% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'EOSE', name: 'Eos Energy Enterprises Inc', easyScore: 2, proScore: 1.09,
      price: 6.78, weeklyPrices: [6.58, 6.64, 6.68, 6.73, 6.78], weeklyChange: -8.75, sortRank: 0,
      marketCap: '$2B', pe: null, revenueGrowth: 445, eps: -6.37, grossMargin: -102, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: true, PBW: true },
      tonyNote: 'Eos Energy Enterprises Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 1.1% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ARRY', name: 'Array Technologies Inc', easyScore: 2, proScore: 1.07,
      price: 7.97, weeklyPrices: [7.73, 7.81, 7.85, 7.91, 7.97], weeklyChange: -5.62, sortRank: 0,
      marketCap: '$1B', pe: null, revenueGrowth: -26, eps: -0.84, grossMargin: 26, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: true, PBW: true },
      tonyNote: 'Array Technologies Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 1.1% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'TTMI', name: 'TTM Technologies Inc', easyScore: 1, proScore: 5.24,
      price: 154.67, weeklyPrices: [150.03, 151.58, 152.35, 153.59, 154.67], weeklyChange: -2.64, sortRank: 0,
      marketCap: '$16B', pe: 84.1, revenueGrowth: 30, eps: 1.84, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: false, PRN: true },
      tonyNote: 'TTM Technologies Inc appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 5.2% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA Inc', easyScore: 1, proScore: 4.88,
      price: 1799.76, weeklyPrices: [1745.77, 1763.76, 1772.76, 1787.16, 1799.76], weeklyChange: -2.95, sortRank: 0,
      marketCap: '$63B', pe: 51.9, revenueGrowth: 1, eps: 34.68, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: false, PRN: true },
      tonyNote: 'Comfort Systems USA Inc appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 4.9% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 1, proScore: 4.71,
      price: 39.01, weeklyPrices: [37.84, 38.23, 38.42, 38.74, 39.01], weeklyChange: -6.25, sortRank: 0,
      marketCap: '$14B', pe: null, revenueGrowth: 41, eps: -0.8, grossMargin: 56, dividendYield: null,
      etfPresence: { AIRR: false, PRN: true },
      tonyNote: 'Planet Labs PBC appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 4.7% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AGX', name: 'Argan Inc', easyScore: 1, proScore: 4.52,
      price: 627.6, weeklyPrices: [608.77, 615.05, 618.19, 623.21, 627.60], weeklyChange: -5.59, sortRank: 0,
      marketCap: '$9B', pe: 64.2, revenueGrowth: 13, eps: 9.77, grossMargin: 20, dividendYield: 0.3,
      etfPresence: { AIRR: false, PRN: true },
      tonyNote: 'Argan Inc appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 4.5% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 1, proScore: 4.28,
      price: 705.04, weeklyPrices: [683.89, 690.94, 694.46, 700.10, 705.04], weeklyChange: -2.49, sortRank: 0,
      marketCap: '$106B', pe: 96.6, revenueGrowth: 26, eps: 7.3, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { AIRR: false, PRN: true },
      tonyNote: 'Quanta Services Inc appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 4.3% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STRL', name: 'Sterling Infrastructure Inc', easyScore: 1, proScore: 4.19,
      price: 720.66, weeklyPrices: [699.04, 706.25, 709.85, 715.62, 720.66], weeklyChange: -6.5, sortRank: 0,
      marketCap: '$22B', pe: 64.5, revenueGrowth: 92, eps: 11.18, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: false, PRN: true },
      tonyNote: 'Sterling Infrastructure Inc appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 4.2% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JBL', name: 'Jabil Inc', easyScore: 1, proScore: 3.9,
      price: 327.6, weeklyPrices: [317.77, 321.05, 322.69, 325.31, 327.60], weeklyChange: -3.29, sortRank: 0,
      marketCap: '$35B', pe: 44.2, revenueGrowth: 23, eps: 7.42, grossMargin: 9, dividendYield: 0.09,
      etfPresence: { AIRR: false, PRN: true },
      tonyNote: 'Jabil Inc appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 3.9% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, proScore: 3.47,
      price: 237.19, weeklyPrices: [230.07, 232.45, 233.63, 235.53, 237.19], weeklyChange: -4.75, sortRank: 0,
      marketCap: '$11B', pe: 79.3, revenueGrowth: 20, eps: 2.99, grossMargin: 54, dividendYield: null,
      etfPresence: { AIRR: false, PRN: true },
      tonyNote: 'Vicor Corp appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 3.5% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CMI', name: 'Cummins Inc', easyScore: 1, proScore: 3.41,
      price: 654.31, weeklyPrices: [634.68, 641.22, 644.50, 649.73, 654.31], weeklyChange: -3.48, sortRank: 0,
      marketCap: '$90B', pe: 34, revenueGrowth: 3, eps: 19.25, grossMargin: 26, dividendYield: 1.18,
      etfPresence: { AIRR: false, PRN: true },
      tonyNote: 'Cummins Inc appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 3.4% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 1, proScore: 3.36,
      price: 252.05, weeklyPrices: [244.49, 247.01, 248.27, 250.29, 252.05], weeklyChange: -1.92, sortRank: 0,
      marketCap: '$101B', pe: 58.3, revenueGrowth: 19, eps: 4.32, grossMargin: 35, dividendYield: 0.19,
      etfPresence: { AIRR: false, PRN: true },
      tonyNote: 'Howmet Aerospace Inc appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 3.4% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ITT', name: 'ITT Inc', easyScore: 1, proScore: 3.29,
      price: 191.2, weeklyPrices: [185.46, 187.38, 188.33, 189.86, 191.20], weeklyChange: -1.94, sortRank: 0,
      marketCap: '$17B', pe: 33.7, revenueGrowth: 33, eps: 5.67, grossMargin: 35, dividendYield: 0.79,
      etfPresence: { AIRR: false, PRN: true },
      tonyNote: 'ITT Inc appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 3.3% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MTZ', name: 'MasTec Inc', easyScore: 1, proScore: 3.25,
      price: 375.57, weeklyPrices: [364.30, 368.06, 369.94, 372.94, 375.57], weeklyChange: -2.6, sortRank: 0,
      marketCap: '$30B', pe: 65.8, revenueGrowth: 35, eps: 5.71, grossMargin: 13, dividendYield: null,
      etfPresence: { AIRR: false, PRN: true },
      tonyNote: 'MasTec Inc appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 3.3% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
