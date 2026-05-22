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
  proScore: number;       // confidence-adjusted score: avgWeight × sqrt(coverage%)
  coverage: number;       // 0-1: fraction of available ETFs holding this stock
  price: number;
  weeklyPrices: number[];
  weeklyChange: number;
  periodReturns: { '1M': number; '6M': number; '1Y': number };
  sortRank: number;
  marketCap: string;
  pe: number | null;
  revenueGrowth: number;
  eps: number;
  grossMargin: number;
  dividendYield: number | null;
  etfPresence: Record<string, number | false>;
  tonyNote: string;
};

// ── Theme configuration ───────────────────────────────────────────────────────

export const THEMES: Theme[] = ['AI & ML', 'Semiconductors', 'Broad Tech', 'Electrification', 'Industrials'];

// Number of ETFs per theme — denominator for relative Easy Score display
// @@GENERATED:THEME_ETF_COUNT@@
export const THEME_ETF_COUNT: Record<Theme, number> = {
  'AI & ML':         7,
  'Semiconductors':  3,
  'Broad Tech':      6,
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
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 6, proScore: 5.8, coverage: 0.857,
      price: 219.37, weeklyPrices: [212.79, 214.98, 216.08, 217.83, 219.37], weeklyChange: -0.06, sortRank: 0, periodReturns: { '1M': 8.3, '6M': 22.6, '1Y': 65.1 },
      marketCap: '$5.3T', pe: 33.6, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.02,
      etfPresence: { AIS: 2.86, ARTY: 4.03, BAI: 5.42, IVEP: false, IGPT: false, IVES: 4.72, ALAI: 13.83, CHAT: 6.7 },
      tonyNote: 'NVIDIA Corp appears in 6 of 7 AI & ML ETFs (86% coverage) with average weight 5.8% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 6, proScore: 4.67, coverage: 0.857,
      price: 753.53, weeklyPrices: [730.92, 738.46, 742.23, 748.26, 753.53], weeklyChange: -1.12, sortRank: 0, periodReturns: { '1M': 54.6, '6M': 263.5, '1Y': 694.8 },
      marketCap: '$850B', pe: 35.6, revenueGrowth: 196, eps: 21.19, grossMargin: 58, dividendYield: 0.08,
      etfPresence: { AIS: 7.26, ARTY: 6.34, BAI: 4.27, IVEP: false, IGPT: false, IVES: 6.09, ALAI: 1.03, CHAT: 5.27 },
      tonyNote: 'Micron Technology Inc appears in 6 of 7 AI & ML ETFs (86% coverage) with average weight 4.7% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 6, proScore: 4.61, coverage: 0.857,
      price: 479.06, weeklyPrices: [464.69, 469.48, 471.87, 475.71, 479.06], weeklyChange: 6.56, sortRank: 0, periodReturns: { '1M': 57.9, '6M': 135.1, '1Y': 332.8 },
      marketCap: '$781B', pe: 159.2, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.46, ARTY: 7.18, BAI: 4.62, IVEP: false, IGPT: false, IVES: 7.12, ALAI: 0.97, CHAT: 5.54 },
      tonyNote: 'Advanced Micro Devices Inc appears in 6 of 7 AI & ML ETFs (86% coverage) with average weight 4.6% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 6, proScore: 3.52, coverage: 0.857,
      price: 419.16, weeklyPrices: [406.59, 410.78, 412.87, 416.23, 419.16], weeklyChange: 1.11, sortRank: 0, periodReturns: { '1M': -0.8, '6M': 23.2, '1Y': 81.8 },
      marketCap: '$2.0T', pe: 81.5, revenueGrowth: 30, eps: 5.14, grossMargin: 77, dividendYield: 0.63,
      etfPresence: { AIS: 0.8, ARTY: 3.92, BAI: 5.36, IVEP: false, IGPT: false, IVES: 4.79, ALAI: 4.54, CHAT: 3.38 },
      tonyNote: 'Broadcom Inc appears in 6 of 7 AI & ML ETFs (86% coverage) with average weight 3.5% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 4, proScore: 3.32, coverage: 0.571,
      price: 409.68, weeklyPrices: [397.39, 401.49, 403.53, 406.81, 409.68], weeklyChange: 0.64, sortRank: 0, periodReturns: { '1M': 5.7, '6M': 48.9, '1Y': 108.8 },
      marketCap: '$2.1T', pe: 35.3, revenueGrowth: 35, eps: 11.6, grossMargin: 62, dividendYield: 0.93,
      etfPresence: { AIS: 3.34, ARTY: false, BAI: 4.31, IVEP: false, IGPT: false, IVES: 4.51, ALAI: 5.41, CHAT: false },
      tonyNote: 'Taiwan Semiconductor Manufacturing Co Ltd appears in 4 of 7 AI & ML ETFs (57% coverage) with average weight 3.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 3, proScore: 3.28, coverage: 0.429,
      price: 386.73, weeklyPrices: [375.13, 379.00, 380.93, 384.02, 386.73], weeklyChange: -0.24, sortRank: 0, periodReturns: { '1M': 14, '6M': 29, '1Y': 126.3 },
      marketCap: '$4.7T', pe: 29.5, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.92, IVEP: false, IGPT: false, IVES: 4.8, ALAI: false, CHAT: 6.32 },
      tonyNote: 'ALPHABET INC CLASS A appears in 3 of 7 AI & ML ETFs (43% coverage) with average weight 3.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 3, proScore: 3.28, coverage: 0.429,
      price: 269.46, weeklyPrices: [261.38, 264.07, 265.42, 267.57, 269.46], weeklyChange: 0.37, sortRank: 0, periodReturns: { '1M': 5.5, '6M': 22.1, '1Y': 32.6 },
      marketCap: '$2.9T', pe: 31.8, revenueGrowth: 17, eps: 8.48, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.87, ALAI: 6.43, CHAT: 3.71 },
      tonyNote: 'AMAZON.COM INC appears in 3 of 7 AI & ML ETFs (43% coverage) with average weight 3.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, proScore: 2.78, coverage: 0.571,
      price: 420.85, weeklyPrices: [408.22, 412.43, 414.54, 417.90, 420.85], weeklyChange: 0.42, sortRank: 0, periodReturns: { '1M': -2.8, '6M': -10.9, '1Y': -7.5 },
      marketCap: '$3.1T', pe: 25, revenueGrowth: 18, eps: 16.81, grossMargin: 68, dividendYield: 0.87,
      etfPresence: { AIS: false, ARTY: 1.96, BAI: false, IVEP: false, IGPT: false, IVES: 4.05, ALAI: 5.48, CHAT: 3.23 },
      tonyNote: 'MICROSOFT CORP appears in 4 of 7 AI & ML ETFs (57% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 3, proScore: 2.47, coverage: 0.429,
      price: 196.18, weeklyPrices: [190.29, 192.26, 193.24, 194.81, 196.18], weeklyChange: 2.88, sortRank: 0, periodReturns: { '1M': 24.7, '6M': 153.3, '1Y': 217.2 },
      marketCap: '$172B', pe: 63.9, revenueGrowth: 22, eps: 3.07, grossMargin: 51, dividendYield: 0.13,
      etfPresence: { AIS: 3.33, ARTY: 6.64, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.33 },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 3 of 7 AI & ML ETFs (43% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc. Class C', easyScore: 1, proScore: 2.39, coverage: 0.143,
      price: 382.71, weeklyPrices: [371.23, 375.06, 376.97, 380.03, 382.71], weeklyChange: -0.2, sortRank: 0, periodReturns: { '1M': 13.3, '6M': 27.7, '1Y': 122.6 },
      marketCap: '$4.6T', pe: 29.2, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 6.32, CHAT: false },
      tonyNote: 'Alphabet Inc. Class C appears in 1 of 7 AI & ML ETFs (14% coverage) with average weight 2.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'META PLATFORMS INC-CLASS A', easyScore: 3, proScore: 2.29, coverage: 0.429,
      price: 612.38, weeklyPrices: [594.01, 600.13, 603.19, 608.09, 612.38], weeklyChange: 0.82, sortRank: 0, periodReturns: { '1M': -9.2, '6M': 3.1, '1Y': -3.8 },
      marketCap: '$1.6T', pe: 22.3, revenueGrowth: 33, eps: 27.51, grossMargin: 82, dividendYield: 0.35,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 3.67, ALAI: 4.24, CHAT: 2.59 },
      tonyNote: 'META PLATFORMS INC-CLASS A appears in 3 of 7 AI & ML ETFs (43% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 4, proScore: 2.27, coverage: 0.571,
      price: 1053.83, weeklyPrices: [1022.22, 1032.75, 1038.02, 1046.45, 1053.83], weeklyChange: 0.94, sortRank: 0, periodReturns: { '1M': -6.5, '6M': 89.6, '1Y': 129.7 },
      marketCap: '$283B', pe: 30.8, revenueGrowth: 16, eps: 34.24, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { AIS: 3.11, ARTY: false, BAI: false, IVEP: 4.08, IGPT: false, IVES: 3.62, ALAI: 1.22, CHAT: false },
      tonyNote: 'GE Vernova Inc appears in 4 of 7 AI & ML ETFs (57% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NBIS', name: 'NEBIUS GROUP NV', easyScore: 3, proScore: 2.24, coverage: 0.429,
      price: 219.22, weeklyPrices: [212.64, 214.84, 215.93, 217.69, 219.22], weeklyChange: -0.32, sortRank: 0, periodReturns: { '1M': 40.4, '6M': 163.3, '1Y': 479.9 },
      marketCap: '$56B', pe: 84.3, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 3.1, ALAI: 4.29, CHAT: 2.88 },
      tonyNote: 'NEBIUS GROUP NV appears in 3 of 7 AI & ML ETFs (43% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, proScore: 2.14, coverage: 0.571,
      price: 331.4, weeklyPrices: [321.46, 324.77, 326.43, 329.08, 331.40], weeklyChange: 2.44, sortRank: 0, periodReturns: { '1M': 8.6, '6M': 107.3, '1Y': 218 },
      marketCap: '$127B', pe: 83.3, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 4.21, ARTY: false, BAI: 2.02, IVEP: 4.13, IGPT: false, IVES: false, ALAI: false, CHAT: 0.96 },
      tonyNote: 'Vertiv Holdings Co appears in 4 of 7 AI & ML ETFs (57% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AAPL', name: 'APPLE INC', easyScore: 2, proScore: 2.11, coverage: 0.286,
      price: 308.24, weeklyPrices: [298.99, 302.08, 303.62, 306.08, 308.24], weeklyChange: 1.06, sortRank: 0, periodReturns: { '1M': 12.8, '6M': 13.5, '1Y': 53.1 },
      marketCap: '$4.5T', pe: 37.3, revenueGrowth: 17, eps: 8.27, grossMargin: 48, dividendYield: 0.35,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.7, ALAI: 3.2, CHAT: false },
      tonyNote: 'APPLE INC appears in 2 of 7 AI & ML ETFs (29% coverage) with average weight 2.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 5, proScore: 2.06, coverage: 0.714,
      price: 485.2, weeklyPrices: [470.64, 475.50, 477.92, 481.80, 485.20], weeklyChange: -0.26, sortRank: 0, periodReturns: { '1M': 24.7, '6M': 248.6, '1Y': 873.5 },
      marketCap: '$167B', pe: 29, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.12,
      etfPresence: { AIS: 1.51, ARTY: 2.64, BAI: 2.68, IVEP: false, IGPT: false, IVES: false, ALAI: 4.22, CHAT: 1.14 },
      tonyNote: 'Western Digital Corp appears in 5 of 7 AI & ML ETFs (71% coverage) with average weight 2.1% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 3, proScore: 2.01, coverage: 0.429,
      price: 191.6, weeklyPrices: [185.85, 187.77, 188.73, 190.26, 191.60], weeklyChange: 0.96, sortRank: 0, periodReturns: { '1M': 2.2, '6M': -3.6, '1Y': 21.8 },
      marketCap: '$551B', pe: 34.3, revenueGrowth: 22, eps: 5.58, grossMargin: 67, dividendYield: 1.05,
      etfPresence: { AIS: false, ARTY: 4.05, BAI: false, IVEP: false, IGPT: false, IVES: 3.6, ALAI: false, CHAT: 1.57 },
      tonyNote: 'ORACLE CORP appears in 3 of 7 AI & ML ETFs (43% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CLASS A CORP', easyScore: 2, proScore: 1.96, coverage: 0.286,
      price: 317.35, weeklyPrices: [307.83, 311.00, 312.59, 315.13, 317.35], weeklyChange: 3.15, sortRank: 0, periodReturns: { '1M': 38.1, '6M': 252.7, '1Y': 1627.5 },
      marketCap: '$90B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 1.81, BAI: false, IVEP: 5.51, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'BLOOM ENERGY CLASS A CORP appears in 2 of 7 AI & ML ETFs (29% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 4, proScore: 1.79, coverage: 0.571,
      price: 308, weeklyPrices: [298.76, 301.84, 303.38, 305.84, 308.00], weeklyChange: 3.41, sortRank: 0, periodReturns: { '1M': 59.2, '6M': 117.9, '1Y': 227.7 },
      marketCap: '$53B', pe: 206.7, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 1.71, ARTY: 1.57, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 2.55, CHAT: 3.65 },
      tonyNote: 'Astera Labs Inc appears in 4 of 7 AI & ML ETFs (57% coverage) with average weight 1.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 2, proScore: 1.78, coverage: 0.286,
      price: 121.08, weeklyPrices: [117.45, 118.66, 119.26, 120.23, 121.08], weeklyChange: 2.17, sortRank: 0, periodReturns: { '1M': 85.5, '6M': 250.9, '1Y': 489.1 },
      marketCap: '$609B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.58, ARTY: false, BAI: 3.08, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'Intel Corp appears in 2 of 7 AI & ML ETFs (29% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 3, proScore: 5.93, coverage: 1,
      price: 753.53, weeklyPrices: [730.92, 738.46, 742.23, 748.26, 753.53], weeklyChange: -1.12, sortRank: 0, periodReturns: { '1M': 54.6, '6M': 263.5, '1Y': 694.8 },
      marketCap: '$850B', pe: 35.6, revenueGrowth: 196, eps: 21.19, grossMargin: 58, dividendYield: 0.08,
      etfPresence: { SOXX: 9.88, PSI: false, XSD: 2.88, DRAM: 5.03 },
      tonyNote: 'MICRON TECHNOLOGY INC appears in 3 of 3 Semiconductors ETFs (100% coverage) with average weight 5.9% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 2, proScore: 5.07, coverage: 0.667,
      price: 479.06, weeklyPrices: [464.69, 469.48, 471.87, 475.71, 479.06], weeklyChange: 6.56, sortRank: 0, periodReturns: { '1M': 57.9, '6M': 135.1, '1Y': 332.8 },
      marketCap: '$781B', pe: 159.2, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 8.95, PSI: false, XSD: 3.46, DRAM: false },
      tonyNote: 'ADVANCED MICRO DEVICES INC appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 5.1% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION CORP', easyScore: 2, proScore: 4.43, coverage: 0.667,
      price: 121.08, weeklyPrices: [117.45, 118.66, 119.26, 120.23, 121.08], weeklyChange: 2.17, sortRank: 0, periodReturns: { '1M': 85.5, '6M': 250.9, '1Y': 489.1 },
      marketCap: '$609B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.94, PSI: false, XSD: 3.91, DRAM: false },
      tonyNote: 'INTEL CORPORATION CORP appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 4.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MXL', name: 'MAXLINEAR INC', easyScore: 1, proScore: 4.11, coverage: 0.333,
      price: 92.99, weeklyPrices: [90.20, 91.13, 91.60, 92.34, 92.99], weeklyChange: -6.7, sortRank: 0, periodReturns: { '1M': 174.4, '6M': 583.7, '1Y': 696.8 },
      marketCap: '$8B', pe: null, revenueGrowth: 43, eps: -1.52, grossMargin: 57, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: 7.11, DRAM: false },
      tonyNote: 'MAXLINEAR INC appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 4.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, proScore: 3.91, coverage: 0.667,
      price: 196.18, weeklyPrices: [190.29, 192.26, 193.24, 194.81, 196.18], weeklyChange: 2.88, sortRank: 0, periodReturns: { '1M': 24.7, '6M': 153.3, '1Y': 217.2 },
      marketCap: '$172B', pe: 63.9, revenueGrowth: 22, eps: 3.07, grossMargin: 51, dividendYield: 0.13,
      etfPresence: { SOXX: 6.24, PSI: false, XSD: 3.34, DRAM: false },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 3.9% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, proScore: 3.62, coverage: 0.667,
      price: 419.16, weeklyPrices: [406.59, 410.78, 412.87, 416.23, 419.16], weeklyChange: 1.11, sortRank: 0, periodReturns: { '1M': -0.8, '6M': 23.2, '1Y': 81.8 },
      marketCap: '$2.0T', pe: 81.5, revenueGrowth: 30, eps: 5.14, grossMargin: 77, dividendYield: 0.63,
      etfPresence: { SOXX: 6.94, PSI: false, XSD: 1.92, DRAM: false },
      tonyNote: 'BROADCOM INC appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 3.6% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 2, proScore: 3.46, coverage: 0.667,
      price: 219.37, weeklyPrices: [212.79, 214.98, 216.08, 217.83, 219.37], weeklyChange: -0.06, sortRank: 0, periodReturns: { '1M': 8.3, '6M': 22.6, '1Y': 65.1 },
      marketCap: '$5.3T', pe: 33.6, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.02,
      etfPresence: { SOXX: 6.62, PSI: false, XSD: 1.87, DRAM: false },
      tonyNote: 'NVIDIA CORP appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 3.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp/DE', easyScore: 1, proScore: 3.15, coverage: 0.333,
      price: 1515.32, weeklyPrices: [1469.86, 1485.01, 1492.59, 1504.71, 1515.32], weeklyChange: -1.75, sortRank: 0, periodReturns: { '1M': 54.6, '6M': 655.9, '1Y': 3900.4 },
      marketCap: '$224B', pe: 51.7, revenueGrowth: 251, eps: 29.3, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 5.46 },
      tonyNote: 'Sandisk Corp/DE appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 3.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, proScore: 2.66, coverage: 0.667,
      price: 218.22, weeklyPrices: [211.67, 213.86, 214.95, 216.69, 218.22], weeklyChange: 2.26, sortRank: 0, periodReturns: { '1M': 60.2, '6M': 33.5, '1Y': 48 },
      marketCap: '$230B', pe: 23.5, revenueGrowth: -4, eps: 9.3, grossMargin: 55, dividendYield: 1.72,
      etfPresence: { SOXX: 4.01, PSI: false, XSD: 2.51, DRAM: false },
      tonyNote: 'QUALCOMM INC appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 2.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 1, proScore: 2.64, coverage: 0.333,
      price: 435.56, weeklyPrices: [422.49, 426.85, 429.03, 432.51, 435.56], weeklyChange: 1.92, sortRank: 0, periodReturns: { '1M': 8, '6M': 94.4, '1Y': 171.3 },
      marketCap: '$346B', pe: 40.9, revenueGrowth: 11, eps: 10.64, grossMargin: 49, dividendYield: 0.5,
      etfPresence: { SOXX: 4.58, PSI: false, XSD: false, DRAM: false },
      tonyNote: 'APPLIED MATERIAL INC appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 1, proScore: 2.62, coverage: 0.333,
      price: 811, weeklyPrices: [786.67, 794.78, 798.84, 805.32, 811.00], weeklyChange: 0.07, sortRank: 0, periodReturns: { '1M': 39.9, '6M': 241.5, '1Y': 645 },
      marketCap: '$182B', pe: 76.9, revenueGrowth: 44, eps: 10.54, grossMargin: 42, dividendYield: 0.37,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 4.53 },
      tonyNote: 'Seagate Technology Holdings PLC appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, proScore: 2.51, coverage: 0.667,
      price: 306.69, weeklyPrices: [297.49, 300.56, 302.09, 304.54, 306.69], weeklyChange: 2.78, sortRank: 0, periodReturns: { '1M': 29.8, '6M': 92.4, '1Y': 70.2 },
      marketCap: '$279B', pe: 52.4, revenueGrowth: 19, eps: 5.85, grossMargin: 57, dividendYield: 1.9,
      etfPresence: { SOXX: 3.76, PSI: false, XSD: 2.38, DRAM: false },
      tonyNote: 'TEXAS INSTRUMENT INC appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 2.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, proScore: 2.46, coverage: 0.667,
      price: 308, weeklyPrices: [298.76, 301.84, 303.38, 305.84, 308.00], weeklyChange: 3.41, sortRank: 0, periodReturns: { '1M': 59.2, '6M': 117.9, '1Y': 227.7 },
      marketCap: '$53B', pe: 206.7, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.24, PSI: false, XSD: 3.78, DRAM: false },
      tonyNote: 'ASTERA LABS INC appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 2.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, proScore: 2.43, coverage: 0.667,
      price: 1572.84, weeklyPrices: [1525.65, 1541.38, 1549.25, 1561.83, 1572.84], weeklyChange: 0.74, sortRank: 0, periodReturns: { '1M': 3.3, '6M': 80.2, '1Y': 133.8 },
      marketCap: '$77B', pe: 113.2, revenueGrowth: 26, eps: 13.9, grossMargin: 55, dividendYield: 0.51,
      etfPresence: { SOXX: 3.65, PSI: false, XSD: 2.3, DRAM: false },
      tonyNote: 'MONOLITHIC POWER SYSTEMS INC appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 2.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, proScore: 2.41, coverage: 0.667,
      price: 305.26, weeklyPrices: [296.10, 299.15, 300.68, 303.12, 305.26], weeklyChange: 1.97, sortRank: 0, periodReturns: { '1M': 35.2, '6M': 59.5, '1Y': 55.3 },
      marketCap: '$77B', pe: 29.2, revenueGrowth: 12, eps: 10.45, grossMargin: 56, dividendYield: 1.35,
      etfPresence: { SOXX: 3.53, PSI: false, XSD: 2.36, DRAM: false },
      tonyNote: 'NXP SEMICONDUCTORS NV appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 2.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 1, proScore: 2.3, coverage: 0.333,
      price: 485.2, weeklyPrices: [470.64, 475.50, 477.92, 481.80, 485.20], weeklyChange: -0.26, sortRank: 0, periodReturns: { '1M': 24.7, '6M': 248.6, '1Y': 873.5 },
      marketCap: '$167B', pe: 29, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.12,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 3.99 },
      tonyNote: 'Western Digital Corp appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 2.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, proScore: 2.16, coverage: 0.667,
      price: 112.69, weeklyPrices: [109.31, 110.44, 111.00, 111.90, 112.69], weeklyChange: 2.81, sortRank: 0, periodReturns: { '1M': 26.6, '6M': 141.3, '1Y': 166.5 },
      marketCap: '$44B', pe: 82.9, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.37, PSI: false, XSD: 2.92, DRAM: false },
      tonyNote: 'ON SEMICONDUCTOR CORP appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 2.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVTS', name: 'NAVITAS SEMICONDUCTOR CORP', easyScore: 1, proScore: 2.04, coverage: 0.333,
      price: 25.51, weeklyPrices: [24.74, 25.00, 25.13, 25.33, 25.51], weeklyChange: 4.64, sortRank: 0, periodReturns: { '1M': 38.1, '6M': 237.4, '1Y': 405.2 },
      marketCap: '$6B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: 3.53, DRAM: false },
      tonyNote: 'NAVITAS SEMICONDUCTOR CORP appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 1, proScore: 1.99, coverage: 0.333,
      price: 307.59, weeklyPrices: [298.36, 301.44, 302.98, 305.44, 307.59], weeklyChange: 1.77, sortRank: 0, periodReturns: { '1M': 15.7, '6M': 115.4, '1Y': 272.1 },
      marketCap: '$385B', pe: 58.1, revenueGrowth: 24, eps: 5.29, grossMargin: 50, dividendYield: 0.34,
      etfPresence: { SOXX: 3.45, PSI: false, XSD: false, DRAM: false },
      tonyNote: 'LAM RESEARCH CORP appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, proScore: 1.98, coverage: 0.667,
      price: 91.62, weeklyPrices: [88.87, 89.79, 90.25, 90.98, 91.62], weeklyChange: 0.56, sortRank: 0, periodReturns: { '1M': 11.1, '6M': 80, '1Y': 57.8 },
      marketCap: '$50B', pe: 416.5, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 2,
      etfPresence: { SOXX: 2.67, PSI: false, XSD: 2.18, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 2.0% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'TSLA', name: 'Tesla Inc', easyScore: 2, proScore: 7.17, coverage: 0.333,
      price: 423.33, weeklyPrices: [410.63, 414.86, 416.98, 420.37, 423.33], weeklyChange: 1.31, sortRank: 0, periodReturns: { '1M': 9.2, '6M': 8.2, '1Y': 24.1 },
      marketCap: '$1.6T', pe: 388.4, revenueGrowth: 16, eps: 1.09, grossMargin: 19, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: false, GTEK: false, ARKK: 10.54, MARS: false },
      tonyNote: 'Tesla Inc appears in 2 of 6 Broad Tech ETFs (33% coverage) with average weight 7.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'Microsoft Corp', easyScore: 3, proScore: 6.25, coverage: 0.5,
      price: 420.85, weeklyPrices: [408.22, 412.43, 414.54, 417.90, 420.85], weeklyChange: 0.42, sortRank: 0, periodReturns: { '1M': -2.8, '6M': -10.9, '1Y': -7.5 },
      marketCap: '$3.1T', pe: 25, revenueGrowth: 18, eps: 16.81, grossMargin: 68, dividendYield: 0.87,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: 8.19, FDTX: 4.06, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Microsoft Corp appears in 3 of 6 Broad Tech ETFs (50% coverage) with average weight 6.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab Corp', easyScore: 1, proScore: 5.65, coverage: 0.167,
      price: 134.71, weeklyPrices: [130.67, 132.02, 132.69, 133.77, 134.71], weeklyChange: 7.38, sortRank: 0, periodReturns: { '1M': 49.6, '6M': 234.3, '1Y': 421.7 },
      marketCap: '$78B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 13.83 },
      tonyNote: 'Rocket Lab Corp appears in 1 of 6 Broad Tech ETFs (17% coverage) with average weight 5.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC-CL A', easyScore: 2, proScore: 5.46, coverage: 0.333,
      price: 386.73, weeklyPrices: [375.13, 379.00, 380.93, 384.02, 386.73], weeklyChange: -0.24, sortRank: 0, periodReturns: { '1M': 14, '6M': 29, '1Y': 126.3 },
      marketCap: '$4.7T', pe: 29.5, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { QQQ: false, QQQA: 4.62, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ALPHABET INC-CL A appears in 2 of 6 Broad Tech ETFs (33% coverage) with average weight 5.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 3, proScore: 5.09, coverage: 0.5,
      price: 269.46, weeklyPrices: [261.38, 264.07, 265.42, 267.57, 269.46], weeklyChange: 0.37, sortRank: 0, periodReturns: { '1M': 5.5, '6M': 22.1, '1Y': 32.6 },
      marketCap: '$2.9T', pe: 31.8, revenueGrowth: 17, eps: 8.48, grossMargin: 51, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 4.64, GTEK: false, ARKK: 2.68, MARS: false },
      tonyNote: 'Amazon.com Inc appears in 3 of 6 Broad Tech ETFs (50% coverage) with average weight 5.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'Nvidia Corp', easyScore: 3, proScore: 4.91, coverage: 0.5,
      price: 219.37, weeklyPrices: [212.79, 214.98, 216.08, 217.83, 219.37], weeklyChange: -0.06, sortRank: 0, periodReturns: { '1M': 8.3, '6M': 22.6, '1Y': 65.1 },
      marketCap: '$5.3T', pe: 33.6, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.02,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 5.27, GTEK: false, ARKK: 1.29, MARS: false },
      tonyNote: 'Nvidia Corp appears in 3 of 6 Broad Tech ETFs (50% coverage) with average weight 4.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AAPL', name: 'Apple Inc', easyScore: 2, proScore: 4.48, coverage: 0.333,
      price: 308.24, weeklyPrices: [298.99, 302.08, 303.62, 306.08, 308.24], weeklyChange: 1.06, sortRank: 0, periodReturns: { '1M': 12.8, '6M': 13.5, '1Y': 53.1 },
      marketCap: '$4.5T', pe: 37.3, revenueGrowth: 17, eps: 8.27, grossMargin: 48, dividendYield: 0.35,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 1.22, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Apple Inc appears in 2 of 6 Broad Tech ETFs (33% coverage) with average weight 4.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 3, proScore: 4.29, coverage: 0.5,
      price: 612.38, weeklyPrices: [594.01, 600.13, 603.19, 608.09, 612.38], weeklyChange: 0.82, sortRank: 0, periodReturns: { '1M': -9.2, '6M': 3.1, '1Y': -3.8 },
      marketCap: '$1.6T', pe: 22.3, revenueGrowth: 33, eps: 27.51, grossMargin: 82, dividendYield: 0.35,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 3.31, GTEK: false, ARKK: 0.59, MARS: false },
      tonyNote: 'Meta Platforms Inc appears in 3 of 6 Broad Tech ETFs (50% coverage) with average weight 4.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, proScore: 3.84, coverage: 0.333,
      price: 196.18, weeklyPrices: [190.29, 192.26, 193.24, 194.81, 196.18], weeklyChange: 2.88, sortRank: 0, periodReturns: { '1M': 24.7, '6M': 153.3, '1Y': 217.2 },
      marketCap: '$172B', pe: 63.9, revenueGrowth: 22, eps: 3.07, grossMargin: 51, dividendYield: 0.13,
      etfPresence: { QQQ: false, QQQA: 5.61, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: 7.68, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 2 of 6 Broad Tech ETFs (33% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 2, proScore: 3.48, coverage: 0.333,
      price: 479.06, weeklyPrices: [464.69, 469.48, 471.87, 475.71, 479.06], weeklyChange: 6.56, sortRank: 0, periodReturns: { '1M': 57.9, '6M': 135.1, '1Y': 332.8 },
      marketCap: '$781B', pe: 159.2, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 6.93, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: 5.14, MARS: false },
      tonyNote: 'ADVANCED MICRO DEVICES appears in 2 of 6 Broad Tech ETFs (33% coverage) with average weight 3.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile Inc', easyScore: 1, proScore: 3.4, coverage: 0.167,
      price: 101.09, weeklyPrices: [98.06, 99.07, 99.57, 100.38, 101.09], weeklyChange: 5.05, sortRank: 0, periodReturns: { '1M': 19.4, '6M': 96.8, '1Y': 314.1 },
      marketCap: '$39B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 8.33 },
      tonyNote: 'AST SpaceMobile Inc appears in 1 of 6 Broad Tech ETFs (17% coverage) with average weight 3.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SATS', name: 'EchoStar Corp', easyScore: 1, proScore: 3.27, coverage: 0.167,
      price: 128.76, weeklyPrices: [124.90, 126.18, 126.83, 127.86, 128.76], weeklyChange: 0.25, sortRank: 0, periodReturns: { '1M': 5.2, '6M': 87.6, '1Y': 514.6 },
      marketCap: '$37B', pe: null, revenueGrowth: -5, eps: -50.21, grossMargin: 27, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 8 },
      tonyNote: 'EchoStar Corp appears in 1 of 6 Broad Tech ETFs (17% coverage) with average weight 3.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 3, proScore: 3.12, coverage: 0.5,
      price: 137.77, weeklyPrices: [133.64, 135.01, 135.70, 136.81, 137.77], weeklyChange: 0.26, sortRank: 0, periodReturns: { '1M': -9.7, '6M': -11, '1Y': 12.6 },
      marketCap: '$330B', pe: 154.8, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 7.18, FDTX: 3.01, GTEK: false, ARKK: 3.06, MARS: false },
      tonyNote: 'PALANTIR TECHNOLOGIES INC CLASS A appears in 3 of 6 Broad Tech ETFs (50% coverage) with average weight 3.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ARM', name: 'ARM HOLDINGS PLC-ADR', easyScore: 1, proScore: 3.09, coverage: 0.167,
      price: 291.61, weeklyPrices: [282.86, 285.78, 287.24, 289.57, 291.61], weeklyChange: -2.22, sortRank: 0, periodReturns: { '1M': 48.3, '6M': 121.6, '1Y': 125.6 },
      marketCap: '$310B', pe: 339.1, revenueGrowth: 20, eps: 0.86, grossMargin: 98, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 7.57, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ARM HOLDINGS PLC-ADR appears in 1 of 6 Broad Tech ETFs (17% coverage) with average weight 3.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PANW', name: 'PALO ALTO NETWORKS INC', easyScore: 2, proScore: 2.96, coverage: 0.333,
      price: 251.39, weeklyPrices: [243.85, 246.36, 247.62, 249.63, 251.39], weeklyChange: -0.6, sortRank: 0, periodReturns: { '1M': 38.7, '6M': 37.4, '1Y': 35.1 },
      marketCap: '$204B', pe: 139.7, revenueGrowth: 15, eps: 1.8, grossMargin: 74, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 7.49, FDTX: 2.76, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'PALO ALTO NETWORKS INC appears in 2 of 6 Broad Tech ETFs (33% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORP', easyScore: 1, proScore: 2.93, coverage: 0.167,
      price: 121.08, weeklyPrices: [117.45, 118.66, 119.26, 120.23, 121.08], weeklyChange: 2.17, sortRank: 0, periodReturns: { '1M': 85.5, '6M': 250.9, '1Y': 489.1 },
      marketCap: '$609B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 7.18, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'INTEL CORP appears in 1 of 6 Broad Tech ETFs (17% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 2, proScore: 2.86, coverage: 0.333,
      price: 191.6, weeklyPrices: [185.85, 187.77, 188.73, 190.26, 191.60], weeklyChange: 0.96, sortRank: 0, periodReturns: { '1M': 2.2, '6M': -3.6, '1Y': 21.8 },
      marketCap: '$551B', pe: 34.3, revenueGrowth: 22, eps: 5.58, grossMargin: 67, dividendYield: 1.05,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 9.21, FDTX: 0.7, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ORACLE CORP appears in 2 of 6 Broad Tech ETFs (33% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'APP', name: 'APPLOVIN CORP-CLASS A', easyScore: 2, proScore: 2.74, coverage: 0.333,
      price: 489.52, weeklyPrices: [474.83, 479.73, 482.18, 486.09, 489.52], weeklyChange: 0.75, sortRank: 0, periodReturns: { '1M': 1.2, '6M': -5.9, '1Y': 39.3 },
      marketCap: '$164B', pe: 42.5, revenueGrowth: 59, eps: 11.52, grossMargin: 88, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 4.69, PTF: false, WCLD: false, MAGS: false, IGV: 4.82, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'APPLOVIN CORP-CLASS A appears in 2 of 6 Broad Tech ETFs (33% coverage) with average weight 2.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OHB', name: 'OHB SE', easyScore: 1, proScore: 2.63, coverage: 0.167,
      price: 0, weeklyPrices: [0.00, 0.00, 0.00, 0.00, 0.00], weeklyChange: 0, sortRank: 0, periodReturns: { '1M': 0, '6M': 0, '1Y': 0 },
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 6.45 },
      tonyNote: 'OHB SE appears in 1 of 6 Broad Tech ETFs (17% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 1, proScore: 2.4, coverage: 0.167,
      price: 753.53, weeklyPrices: [730.92, 738.46, 742.23, 748.26, 753.53], weeklyChange: -1.12, sortRank: 0, periodReturns: { '1M': 54.6, '6M': 263.5, '1Y': 694.8 },
      marketCap: '$850B', pe: 35.6, revenueGrowth: 196, eps: 21.19, grossMargin: 58, dividendYield: 0.08,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: 5.89, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Micron Technology Inc appears in 1 of 6 Broad Tech ETFs (17% coverage) with average weight 2.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 2, proScore: 7, coverage: 1,
      price: 275.68, weeklyPrices: [267.41, 270.17, 271.54, 273.75, 275.68], weeklyChange: 1.82, sortRank: 0, periodReturns: { '1M': 13.6, '6M': 193.2, '1Y': 377.3 },
      marketCap: '$10B', pe: 53.8, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { POW: 6.05, VOLT: 7.95, PBD: false, PBW: false },
      tonyNote: 'Powell Industries Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 7.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 2, proScore: 5.21, coverage: 1,
      price: 727.84, weeklyPrices: [706.00, 713.28, 716.92, 722.75, 727.84], weeklyChange: 1.53, sortRank: 0, periodReturns: { '1M': 18.6, '6M': 69.2, '1Y': 120 },
      marketCap: '$109B', pe: 99.6, revenueGrowth: 26, eps: 7.31, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.81, VOLT: 5.62, PBD: false, PBW: false },
      tonyNote: 'Quanta Services Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 5.2% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, proScore: 5.03, coverage: 1,
      price: 260.35, weeklyPrices: [252.54, 255.14, 256.44, 258.53, 260.35], weeklyChange: -0.02, sortRank: 0, periodReturns: { '1M': -0.9, '6M': 84.7, '1Y': 259 },
      marketCap: '$4B', pe: 62.9, revenueGrowth: 17, eps: 4.14, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: 3.04, VOLT: 7.02, PBD: false, PBW: false },
      tonyNote: 'Bel Fuse Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 5.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 2, proScore: 4.46, coverage: 1,
      price: 385.27, weeklyPrices: [373.71, 377.56, 379.49, 382.57, 385.27], weeklyChange: 0.99, sortRank: 0, periodReturns: { '1M': -6.9, '6M': 16.1, '1Y': 20 },
      marketCap: '$150B', pe: 37.7, revenueGrowth: 17, eps: 10.22, grossMargin: 37, dividendYield: 1.15,
      etfPresence: { POW: 3.8, VOLT: 5.13, PBD: false, PBW: false },
      tonyNote: 'Eaton Corp PLC appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 4.5% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 2, proScore: 3.96, coverage: 1,
      price: 1053.83, weeklyPrices: [1022.22, 1032.75, 1038.02, 1046.45, 1053.83], weeklyChange: 0.94, sortRank: 0, periodReturns: { '1M': -6.5, '6M': 89.6, '1Y': 129.7 },
      marketCap: '$283B', pe: 30.8, revenueGrowth: 16, eps: 34.24, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { POW: 3.57, VOLT: 4.35, PBD: false, PBW: false },
      tonyNote: 'GE Vernova Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 4.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 2, proScore: 3.63, coverage: 1,
      price: 89.36, weeklyPrices: [86.68, 87.57, 88.02, 88.73, 89.36], weeklyChange: -0.35, sortRank: 0, periodReturns: { '1M': -0.7, '6M': 7, '1Y': 33.5 },
      marketCap: '$186B', pe: 22.7, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.78,
      etfPresence: { POW: 2.06, VOLT: 5.21, PBD: false, PBW: false },
      tonyNote: 'NextEra Energy Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 3.6% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 2, proScore: 3.44, coverage: 1,
      price: 163.88, weeklyPrices: [158.96, 160.60, 161.42, 162.73, 163.88], weeklyChange: 0.21, sortRank: 0, periodReturns: { '1M': 16.9, '6M': 63, '1Y': 152.8 },
      marketCap: '$27B', pe: 55.7, revenueGrowth: 54, eps: 2.94, grossMargin: 37, dividendYield: 0.51,
      etfPresence: { POW: 3.78, VOLT: 3.1, PBD: false, PBW: false },
      tonyNote: 'nVent Electric PLC appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 3.4% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 1, proScore: 3.43, coverage: 0.5,
      price: 317.35, weeklyPrices: [307.83, 311.00, 312.59, 315.13, 317.35], weeklyChange: 3.15, sortRank: 0, periodReturns: { '1M': 38.1, '6M': 252.7, '1Y': 1627.5 },
      marketCap: '$90B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: 4.85, PBD: false, PBW: false },
      tonyNote: 'BLOOM ENERGY CORP appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 3.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, proScore: 3.32, coverage: 0.5,
      price: 272.45, weeklyPrices: [264.28, 267.00, 268.36, 270.54, 272.45], weeklyChange: 1.55, sortRank: 0, periodReturns: { '1M': 2.8, '6M': 222.9, '1Y': 555.7 },
      marketCap: '$12B', pe: 91.4, revenueGrowth: 20, eps: 2.98, grossMargin: 54, dividendYield: null,
      etfPresence: { POW: 4.69, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Vicor Corp appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 3.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PRY', name: 'Prysmian SpA', easyScore: 1, proScore: 3.15, coverage: 0.5,
      price: 0, weeklyPrices: [0.00, 0.00, 0.00, 0.00, 0.00], weeklyChange: 0, sortRank: 0, periodReturns: { '1M': 0, '6M': 0, '1Y': 0 },
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { POW: 4.45, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Prysmian SpA appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 3.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 2, proScore: 2.96, coverage: 1,
      price: 467.08, weeklyPrices: [453.07, 457.74, 460.07, 463.81, 467.08], weeklyChange: 1.35, sortRank: 0, periodReturns: { '1M': -15, '6M': 10.7, '1Y': 20 },
      marketCap: '$25B', pe: 27.6, revenueGrowth: 11, eps: 16.92, grossMargin: 36, dividendYield: 1.23,
      etfPresence: { POW: 2.72, VOLT: 3.19, PBD: false, PBW: false },
      tonyNote: 'Hubbell Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 3.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, proScore: 2.84, coverage: 1,
      price: 129.94, weeklyPrices: [126.04, 127.34, 127.99, 129.03, 129.94], weeklyChange: 0.25, sortRank: 0, periodReturns: { '1M': -1.3, '6M': 7.5, '1Y': 27.6 },
      marketCap: '$71B', pe: 19.2, revenueGrowth: 10, eps: 6.77, grossMargin: 47, dividendYield: 2.93,
      etfPresence: { POW: 1.38, VOLT: 4.3, PBD: false, PBW: false },
      tonyNote: 'American Electric Power Co Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 2.8% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OGE', name: 'OGE ENERGY CORP', easyScore: 1, proScore: 2.71, coverage: 0.5,
      price: 48, weeklyPrices: [46.56, 47.04, 47.28, 47.66, 48.00], weeklyChange: -0.2, sortRank: 0, periodReturns: { '1M': 4.3, '6M': 8.4, '1Y': 9.6 },
      marketCap: '$10B', pe: 21.3, revenueGrowth: 1, eps: 2.25, grossMargin: 44, dividendYield: 3.53,
      etfPresence: { POW: false, VOLT: 3.83, PBD: false, PBW: false },
      tonyNote: 'OGE ENERGY CORP appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETR', name: 'ENTERGY CORP', easyScore: 1, proScore: 2.62, coverage: 0.5,
      price: 112.5, weeklyPrices: [109.13, 110.25, 110.81, 111.71, 112.50], weeklyChange: 0.23, sortRank: 0, periodReturns: { '1M': 1.8, '6M': 20.1, '1Y': 38.4 },
      marketCap: '$52B', pe: 28.7, revenueGrowth: 12, eps: 3.92, grossMargin: 47, dividendYield: 2.28,
      etfPresence: { POW: false, VOLT: 3.7, PBD: false, PBW: false },
      tonyNote: 'ENTERGY CORP appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, proScore: 2.57, coverage: 1,
      price: 326.12, weeklyPrices: [316.34, 319.60, 321.23, 323.84, 326.12], weeklyChange: 0.72, sortRank: 0, periodReturns: { '1M': -13.5, '6M': 66.4, '1Y': 181.3 },
      marketCap: '$13B', pe: 67.7, revenueGrowth: 26, eps: 4.82, grossMargin: 39, dividendYield: 0.12,
      etfPresence: { POW: 0.98, VOLT: 4.16, PBD: false, PBW: false },
      tonyNote: 'Advanced Energy Industries Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 2.6% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ET', name: 'ENERGY TRANSFER LP', easyScore: 1, proScore: 2.55, coverage: 0.5,
      price: 20.03, weeklyPrices: [19.43, 19.63, 19.73, 19.89, 20.03], weeklyChange: 0, sortRank: 0, periodReturns: { '1M': 5, '6M': 21.3, '1Y': 12 },
      marketCap: '$69B', pe: 16.7, revenueGrowth: 32, eps: 1.2, grossMargin: 19, dividendYield: 6.67,
      etfPresence: { POW: false, VOLT: 3.6, PBD: false, PBW: false },
      tonyNote: 'ENERGY TRANSFER LP appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 1, proScore: 2.41, coverage: 0.5,
      price: 331.4, weeklyPrices: [321.46, 324.77, 326.43, 329.08, 331.40], weeklyChange: 2.44, sortRank: 0, periodReturns: { '1M': 8.6, '6M': 107.3, '1Y': 218 },
      marketCap: '$127B', pe: 83.3, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 3.41, PBD: false, PBW: false },
      tonyNote: 'VERTIV HOLDINGS CO appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NI', name: 'NISOURCE INC', easyScore: 1, proScore: 2.35, coverage: 0.5,
      price: 47.66, weeklyPrices: [46.23, 46.71, 46.95, 47.33, 47.66], weeklyChange: -0.13, sortRank: 0, periodReturns: { '1M': 1.7, '6M': 11.4, '1Y': 23.8 },
      marketCap: '$23B', pe: 23.7, revenueGrowth: 8, eps: 2.01, grossMargin: 51, dividendYield: 2.52,
      etfPresence: { POW: false, VOLT: 3.33, PBD: false, PBW: false },
      tonyNote: 'NISOURCE INC appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ENR', name: 'Siemens Energy AG', easyScore: 1, proScore: 2.31, coverage: 0.5,
      price: 17.53, weeklyPrices: [17.00, 17.18, 17.27, 17.41, 17.53], weeklyChange: 1.33, sortRank: 0, periodReturns: { '1M': -12.4, '6M': -4.1, '1Y': -23.2 },
      marketCap: '$1B', pe: 6.4, revenueGrowth: -3, eps: 2.73, grossMargin: 43, dividendYield: 6.94,
      etfPresence: { POW: 3.27, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Siemens Energy AG appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IDA', name: 'IDACORP INC', easyScore: 1, proScore: 2.28, coverage: 0.5,
      price: 140.99, weeklyPrices: [136.76, 138.17, 138.88, 140.00, 140.99], weeklyChange: -0.4, sortRank: 0, periodReturns: { '1M': -1.8, '6M': 10.2, '1Y': 22.5 },
      marketCap: '$8B', pe: 23.5, revenueGrowth: -7, eps: 6, grossMargin: 38, dividendYield: 2.47,
      etfPresence: { POW: false, VOLT: 3.23, PBD: false, PBW: false },
      tonyNote: 'IDACORP INC appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 1, proScore: 5.6, coverage: 1,
      price: 742.2, weeklyPrices: [719.93, 727.36, 731.07, 737.00, 742.20], weeklyChange: 1.15, sortRank: 0, periodReturns: { '1M': 52.1, '6M': 135.5, '1Y': 307.2 },
      marketCap: '$23B', pe: 66.1, revenueGrowth: 92, eps: 11.23, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 5.6, PRN: false },
      tonyNote: 'Sterling Infrastructure, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 5.6% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 1, proScore: 4.37, coverage: 1,
      price: 1840.05, weeklyPrices: [1784.85, 1803.25, 1812.45, 1827.17, 1840.05], weeklyChange: 0.33, sortRank: 0, periodReturns: { '1M': 6.7, '6M': 105.8, '1Y': 298.1 },
      marketCap: '$65B', pe: 53, revenueGrowth: 1, eps: 34.69, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: 4.37, PRN: false },
      tonyNote: 'Comfort Systems USA, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 4.4% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MTZ', name: 'MasTec, Inc.', easyScore: 1, proScore: 4.18, coverage: 1,
      price: 387.37, weeklyPrices: [375.75, 379.62, 381.56, 384.66, 387.37], weeklyChange: -0.34, sortRank: 0, periodReturns: { '1M': 2.9, '6M': 100.6, '1Y': 156.9 },
      marketCap: '$31B', pe: 67.8, revenueGrowth: 35, eps: 5.71, grossMargin: 13, dividendYield: null,
      etfPresence: { AIRR: 4.18, PRN: false },
      tonyNote: 'MasTec, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 4.2% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CHRW', name: 'C.H. Robinson Worldwide, Inc.', easyScore: 1, proScore: 4.12, coverage: 1,
      price: 176.95, weeklyPrices: [171.64, 173.41, 174.30, 175.71, 176.95], weeklyChange: -0.66, sortRank: 0, periodReturns: { '1M': -3, '6M': 16.7, '1Y': 83.3 },
      marketCap: '$21B', pe: 35.9, revenueGrowth: -1, eps: 4.93, grossMargin: 9, dividendYield: 1.41,
      etfPresence: { AIRR: 4.12, PRN: false },
      tonyNote: 'C.H. Robinson Worldwide, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 4.1% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SAIA', name: 'Saia, Inc.', easyScore: 1, proScore: 4.11, coverage: 1,
      price: 450.99, weeklyPrices: [437.46, 441.97, 444.23, 447.83, 450.99], weeklyChange: -1.58, sortRank: 0, periodReturns: { '1M': 4.5, '6M': 66.1, '1Y': 68.3 },
      marketCap: '$12B', pe: 47.3, revenueGrowth: 2, eps: 9.53, grossMargin: 24, dividendYield: null,
      etfPresence: { AIRR: 4.11, PRN: false },
      tonyNote: 'Saia, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 4.1% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'EME', name: 'EMCOR Group, Inc.', easyScore: 1, proScore: 4.1, coverage: 1,
      price: 844.98, weeklyPrices: [819.63, 828.08, 832.31, 839.07, 844.98], weeklyChange: -0.48, sortRank: 0, periodReturns: { '1M': -1.7, '6M': 45.3, '1Y': 84.4 },
      marketCap: '$38B', pe: 28.3, revenueGrowth: 20, eps: 29.81, grossMargin: 19, dividendYield: 0.15,
      etfPresence: { AIRR: 4.1, PRN: false },
      tonyNote: 'EMCOR Group, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 4.1% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 1, proScore: 4.08, coverage: 1,
      price: 644.64, weeklyPrices: [625.30, 631.75, 634.97, 640.13, 644.64], weeklyChange: 2.24, sortRank: 0, periodReturns: { '1M': 4.7, '6M': 82.5, '1Y': 227.3 },
      marketCap: '$9B', pe: 66.3, revenueGrowth: 13, eps: 9.73, grossMargin: 20, dividendYield: 0.31,
      etfPresence: { AIRR: 4.08, PRN: false },
      tonyNote: 'Argan, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 4.1% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 1, proScore: 3.3, coverage: 1,
      price: 204.69, weeklyPrices: [198.55, 200.60, 201.62, 203.26, 204.69], weeklyChange: 1.03, sortRank: 0, periodReturns: { '1M': -6.6, '6M': 20.5, '1Y': 90.2 },
      marketCap: '$19B', pe: 54.6, revenueGrowth: 26, eps: 3.75, grossMargin: 23, dividendYield: 0.51,
      etfPresence: { AIRR: 3.3, PRN: false },
      tonyNote: 'BWX Technologies, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 3.3% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DY', name: 'Dycom Industries, Inc.', easyScore: 1, proScore: 3.29, coverage: 1,
      price: 418.57, weeklyPrices: [406.01, 410.20, 412.29, 415.64, 418.57], weeklyChange: 0.95, sortRank: 0, periodReturns: { '1M': 2.6, '6M': 28.2, '1Y': 86.7 },
      marketCap: '$13B', pe: 43.7, revenueGrowth: 34, eps: 9.57, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: 3.29, PRN: false },
      tonyNote: 'Dycom Industries, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 3.3% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OC', name: 'Owens Corning', easyScore: 1, proScore: 3.04, coverage: 1,
      price: 117.12, weeklyPrices: [113.61, 114.78, 115.36, 116.30, 117.12], weeklyChange: 0.96, sortRank: 0, periodReturns: { '1M': -4.7, '6M': 12.4, '1Y': -13.3 },
      marketCap: '$9B', pe: null, revenueGrowth: -10, eps: -4.85, grossMargin: 27, dividendYield: 2.55,
      etfPresence: { AIRR: 3.04, PRN: false },
      tonyNote: 'Owens Corning appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 3.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 1, proScore: 2.96, coverage: 1,
      price: 320.59, weeklyPrices: [310.97, 314.18, 315.78, 318.35, 320.59], weeklyChange: 1, sortRank: 0, periodReturns: { '1M': -12.6, '6M': 4.9, '1Y': 42.8 },
      marketCap: '$13B', pe: 20.8, revenueGrowth: 13, eps: 15.4, grossMargin: 12, dividendYield: 1.74,
      etfPresence: { AIRR: 2.96, PRN: false },
      tonyNote: 'Huntington Ingalls Industries, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 3.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 1, proScore: 2.84, coverage: 1,
      price: 56.5, weeklyPrices: [54.80, 55.37, 55.65, 56.10, 56.50], weeklyChange: 3.35, sortRank: 0, periodReturns: { '1M': -17.7, '6M': -18.3, '1Y': 60.5 },
      marketCap: '$11B', pe: 332.4, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.84, PRN: false },
      tonyNote: 'Kratos Defense & Security Solutions, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 2.8% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 1, proScore: 2.63, coverage: 1,
      price: 66.91, weeklyPrices: [64.90, 65.57, 65.91, 66.44, 66.91], weeklyChange: 2.45, sortRank: 0, periodReturns: { '1M': -18.5, '6M': 11.4, '1Y': 56.8 },
      marketCap: '$9B', pe: 290.9, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 2.63, PRN: false },
      tonyNote: 'Karman Holdings Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 2.6% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 1, proScore: 2.51, coverage: 1,
      price: 275.68, weeklyPrices: [267.41, 270.17, 271.54, 273.75, 275.68], weeklyChange: 1.82, sortRank: 0, periodReturns: { '1M': 13.6, '6M': 193.2, '1Y': 377.3 },
      marketCap: '$10B', pe: 53.8, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { AIRR: 2.51, PRN: false },
      tonyNote: 'Powell Industries, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 2.5% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CLH', name: 'Clean Harbors, Inc.', easyScore: 1, proScore: 2.46, coverage: 1,
      price: 284.92, weeklyPrices: [276.37, 279.22, 280.65, 282.93, 284.92], weeklyChange: 0.83, sortRank: 0, periodReturns: { '1M': -6.4, '6M': 31.3, '1Y': 25.1 },
      marketCap: '$15B', pe: 38.7, revenueGrowth: 2, eps: 7.37, grossMargin: 32, dividendYield: null,
      etfPresence: { AIRR: 2.46, PRN: false },
      tonyNote: 'Clean Harbors, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 2.5% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FNB', name: 'F.N.B. Corporation', easyScore: 1, proScore: 2.38, coverage: 1,
      price: 17.55, weeklyPrices: [17.02, 17.20, 17.29, 17.43, 17.55], weeklyChange: 0.43, sortRank: 0, periodReturns: { '1M': -0.6, '6M': 9.4, '1Y': 26 },
      marketCap: '$6B', pe: 10.8, revenueGrowth: 10, eps: 1.62, grossMargin: 0, dividendYield: 2.97,
      etfPresence: { AIRR: 2.38, PRN: false },
      tonyNote: 'F.N.B. Corporation appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 2.4% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CNM', name: 'Core & Main, Inc. (Class A)', easyScore: 1, proScore: 2.16, coverage: 1,
      price: 47.86, weeklyPrices: [46.42, 46.90, 47.14, 47.52, 47.86], weeklyChange: 1.5, sortRank: 0, periodReturns: { '1M': -2.2, '6M': 4.8, '1Y': -10.1 },
      marketCap: '$9B', pe: 20.7, revenueGrowth: -7, eps: 2.31, grossMargin: 27, dividendYield: null,
      etfPresence: { AIRR: 2.16, PRN: false },
      tonyNote: 'Core & Main, Inc. (Class A) appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 2.2% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WMS', name: 'Advanced Drainage Systems, Inc.', easyScore: 1, proScore: 2.11, coverage: 1,
      price: 129.22, weeklyPrices: [125.34, 126.64, 127.28, 128.32, 129.22], weeklyChange: -4.41, sortRank: 0, periodReturns: { '1M': -16, '6M': -11.9, '1Y': 16.4 },
      marketCap: '$10B', pe: 23.7, revenueGrowth: 10, eps: 5.45, grossMargin: 38, dividendYield: 0.59,
      etfPresence: { AIRR: 2.11, PRN: false },
      tonyNote: 'Advanced Drainage Systems, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 2.1% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KEX', name: 'Kirby Corporation', easyScore: 1, proScore: 1.95, coverage: 1,
      price: 145.13, weeklyPrices: [140.78, 142.23, 142.95, 144.11, 145.13], weeklyChange: -0.33, sortRank: 0, periodReturns: { '1M': -2.1, '6M': 34.8, '1Y': 35.4 },
      marketCap: '$8B', pe: 22.4, revenueGrowth: 7, eps: 6.49, grossMargin: 34, dividendYield: null,
      etfPresence: { AIRR: 1.95, PRN: false },
      tonyNote: 'Kirby Corporation appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 1.9% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IESC', name: 'IES Holdings, Inc.', easyScore: 1, proScore: 1.91, coverage: 1,
      price: 654.22, weeklyPrices: [634.59, 641.14, 644.41, 649.64, 654.22], weeklyChange: 0.98, sortRank: 0, periodReturns: { '1M': 12.4, '6M': 76.2, '1Y': 170.5 },
      marketCap: '$13B', pe: 34.9, revenueGrowth: 17, eps: 18.77, grossMargin: 26, dividendYield: null,
      etfPresence: { AIRR: 1.91, PRN: false },
      tonyNote: 'IES Holdings, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 1.9% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
