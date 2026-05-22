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

// Last scan timestamp — patched by build-data-ts.js after each run
// @@GENERATED:SCAN_TIMESTAMP@@
export const SCAN_TIMESTAMP    = '2026-05-22T15:45:45.194Z';
export const SCAN_TIMESTAMP_NY = 'May 22, 2026 at 11:45 AM ET';
// @@END_GENERATED:SCAN_TIMESTAMP@@

// Number of ETFs per theme — denominator for relative Easy Score display
// @@GENERATED:THEME_ETF_COUNT@@
export const THEME_ETF_COUNT: Record<Theme, number> = {
  'AI & ML':         8,
  'Semiconductors':  4,
  'Broad Tech':      7,
  'Electrification': 4,
  'Industrials':     2,
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
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 7, proScore: 5.89, coverage: 0.875,
      price: 217.51, weeklyPrices: [210.98, 213.16, 214.25, 215.99, 217.51], weeklyChange: -0.91, sortRank: 0, periodReturns: { '1M': 7.4, '6M': 21.6, '1Y': 63.8 },
      marketCap: '$5.3T', pe: 33.4, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.02,
      etfPresence: { AIS: 2.86, ARTY: 4.03, BAI: 5.42, IVEP: false, IGPT: 6.5, IVES: 4.72, ALAI: 13.83, CHAT: 6.7 },
      tonyNote: 'NVIDIA Corp appears in 7 of 8 AI & ML ETFs (88% coverage) with average weight 5.9% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 7, proScore: 5.4, coverage: 0.875,
      price: 766.3, weeklyPrices: [743.31, 750.97, 754.81, 760.94, 766.30], weeklyChange: 0.55, sortRank: 0, periodReturns: { '1M': 57.2, '6M': 269.5, '1Y': 708.1 },
      marketCap: '$864B', pe: 36.2, revenueGrowth: 196, eps: 21.19, grossMargin: 58, dividendYield: 0.08,
      etfPresence: { AIS: 7.26, ARTY: 6.34, BAI: 4.27, IVEP: false, IGPT: 10.19, IVES: 6.09, ALAI: 1.03, CHAT: 5.27 },
      tonyNote: 'Micron Technology Inc appears in 7 of 8 AI & ML ETFs (88% coverage) with average weight 5.4% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 7, proScore: 4.92, coverage: 0.875,
      price: 470.89, weeklyPrices: [456.76, 461.47, 463.83, 467.59, 470.89], weeklyChange: 4.74, sortRank: 0, periodReturns: { '1M': 55.2, '6M': 131.1, '1Y': 325.3 },
      marketCap: '$768B', pe: 156.4, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.46, ARTY: 7.18, BAI: 4.62, IVEP: false, IGPT: 6.93, IVES: 7.12, ALAI: 0.97, CHAT: 5.54 },
      tonyNote: 'Advanced Micro Devices Inc appears in 7 of 8 AI & ML ETFs (88% coverage) with average weight 4.9% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 4, proScore: 3.88, coverage: 0.5,
      price: 387.33, weeklyPrices: [375.71, 379.58, 381.52, 384.62, 387.33], weeklyChange: -0.09, sortRank: 0, periodReturns: { '1M': 14.1, '6M': 29.3, '1Y': 126.7 },
      marketCap: '$4.7T', pe: 29.6, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.92, IVEP: false, IGPT: 6.92, IVES: 4.8, ALAI: false, CHAT: 6.32 },
      tonyNote: 'ALPHABET INC CLASS A appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 3.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 6, proScore: 3.29, coverage: 0.75,
      price: 413.89, weeklyPrices: [401.47, 405.61, 407.68, 410.99, 413.89], weeklyChange: -0.16, sortRank: 0, periodReturns: { '1M': -2.1, '6M': 21.7, '1Y': 79.5 },
      marketCap: '$2.0T', pe: 80.5, revenueGrowth: 30, eps: 5.14, grossMargin: 77, dividendYield: 0.63,
      etfPresence: { AIS: 0.8, ARTY: 3.92, BAI: 5.36, IVEP: false, IGPT: false, IVES: 4.79, ALAI: 4.54, CHAT: 3.38 },
      tonyNote: 'Broadcom Inc appears in 6 of 8 AI & ML ETFs (75% coverage) with average weight 3.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 4, proScore: 3.11, coverage: 0.5,
      price: 406.54, weeklyPrices: [394.34, 398.41, 400.44, 403.69, 406.54], weeklyChange: -0.15, sortRank: 0, periodReturns: { '1M': 4.9, '6M': 47.8, '1Y': 107.2 },
      marketCap: '$2.1T', pe: 35, revenueGrowth: 35, eps: 11.6, grossMargin: 62, dividendYield: 0.93,
      etfPresence: { AIS: 3.34, ARTY: false, BAI: 4.31, IVEP: false, IGPT: false, IVES: 4.51, ALAI: 5.41, CHAT: false },
      tonyNote: 'Taiwan Semiconductor Manufacturing Co Ltd appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 3.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 3, proScore: 3.06, coverage: 0.375,
      price: 269.04, weeklyPrices: [260.97, 263.66, 265.00, 267.16, 269.04], weeklyChange: 0.22, sortRank: 0, periodReturns: { '1M': 5.3, '6M': 21.9, '1Y': 32.5 },
      marketCap: '$2.9T', pe: 31.7, revenueGrowth: 17, eps: 8.48, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.87, ALAI: 6.43, CHAT: 3.71 },
      tonyNote: 'AMAZON.COM INC appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 3.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 3, proScore: 2.91, coverage: 0.375,
      price: 121.2, weeklyPrices: [117.56, 118.78, 119.38, 120.35, 121.20], weeklyChange: 2.28, sortRank: 0, periodReturns: { '1M': 85.7, '6M': 251.4, '1Y': 489.9 },
      marketCap: '$609B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.58, ARTY: false, BAI: 3.08, IVEP: false, IGPT: 7.61, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'Intel Corp appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 4, proScore: 2.77, coverage: 0.5,
      price: 609.45, weeklyPrices: [591.17, 597.26, 600.31, 605.18, 609.45], weeklyChange: 0.34, sortRank: 0, periodReturns: { '1M': -9.7, '6M': 2.6, '1Y': -4.3 },
      marketCap: '$1.5T', pe: 22.2, revenueGrowth: 33, eps: 27.51, grossMargin: 82, dividendYield: 0.35,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: 5.16, IVES: 3.67, ALAI: 4.24, CHAT: 2.59 },
      tonyNote: 'Meta Platforms Inc appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, proScore: 2.6, coverage: 0.5,
      price: 418.87, weeklyPrices: [406.30, 410.49, 412.59, 415.94, 418.87], weeklyChange: -0.05, sortRank: 0, periodReturns: { '1M': -3.2, '6M': -11.3, '1Y': -7.9 },
      marketCap: '$3.1T', pe: 24.9, revenueGrowth: 18, eps: 16.81, grossMargin: 68, dividendYield: 0.87,
      etfPresence: { AIS: false, ARTY: 1.96, BAI: false, IVEP: false, IGPT: false, IVES: 4.05, ALAI: 5.48, CHAT: 3.23 },
      tonyNote: 'MICROSOFT CORP appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 3, proScore: 2.31, coverage: 0.375,
      price: 196.46, weeklyPrices: [190.57, 192.53, 193.51, 195.08, 196.46], weeklyChange: 3.02, sortRank: 0, periodReturns: { '1M': 24.9, '6M': 153.7, '1Y': 217.6 },
      marketCap: '$172B', pe: 64, revenueGrowth: 22, eps: 3.07, grossMargin: 51, dividendYield: 0.13,
      etfPresence: { AIS: 3.33, ARTY: 6.64, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.33 },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 2.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc. Class C', easyScore: 1, proScore: 2.23, coverage: 0.125,
      price: 383.49, weeklyPrices: [371.99, 375.82, 377.74, 380.81, 383.49], weeklyChange: 0.01, sortRank: 0, periodReturns: { '1M': 13.5, '6M': 28, '1Y': 123 },
      marketCap: '$4.6T', pe: 29.3, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 6.32, CHAT: false },
      tonyNote: 'Alphabet Inc. Class C appears in 1 of 8 AI & ML ETFs (13% coverage) with average weight 2.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 4, proScore: 2.13, coverage: 0.5,
      price: 1050.98, weeklyPrices: [1019.45, 1029.96, 1035.22, 1043.62, 1050.98], weeklyChange: 0.69, sortRank: 0, periodReturns: { '1M': -6.8, '6M': 89, '1Y': 129 },
      marketCap: '$282B', pe: 30.7, revenueGrowth: 16, eps: 34.24, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { AIS: 3.11, ARTY: false, BAI: false, IVEP: 4.08, IGPT: false, IVES: 3.62, ALAI: 1.22, CHAT: false },
      tonyNote: 'GE Vernova Inc appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NBIS', name: 'NEBIUS GROUP NV', easyScore: 3, proScore: 2.1, coverage: 0.375,
      price: 219.69, weeklyPrices: [213.10, 215.30, 216.39, 218.15, 219.69], weeklyChange: -0.11, sortRank: 0, periodReturns: { '1M': 40.7, '6M': 163.9, '1Y': 481.2 },
      marketCap: '$56B', pe: 84.5, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 3.1, ALAI: 4.29, CHAT: 2.88 },
      tonyNote: 'NEBIUS GROUP NV appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 2.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, proScore: 2, coverage: 0.5,
      price: 329.95, weeklyPrices: [320.05, 323.35, 325.00, 327.64, 329.95], weeklyChange: 2.03, sortRank: 0, periodReturns: { '1M': 8.1, '6M': 106.4, '1Y': 216.7 },
      marketCap: '$127B', pe: 82.9, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 4.21, ARTY: false, BAI: 2.02, IVEP: 4.13, IGPT: false, IVES: false, ALAI: false, CHAT: 0.96 },
      tonyNote: 'Vertiv Holdings Co appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AAPL', name: 'APPLE INC', easyScore: 2, proScore: 1.98, coverage: 0.25,
      price: 310.66, weeklyPrices: [301.34, 304.45, 306.00, 308.49, 310.66], weeklyChange: 1.86, sortRank: 0, periodReturns: { '1M': 13.7, '6M': 14.4, '1Y': 54.3 },
      marketCap: '$4.6T', pe: 37.6, revenueGrowth: 17, eps: 8.27, grossMargin: 48, dividendYield: 0.35,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.7, ALAI: 3.2, CHAT: false },
      tonyNote: 'APPLE INC appears in 2 of 8 AI & ML ETFs (25% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 5, proScore: 1.93, coverage: 0.625,
      price: 482.3, weeklyPrices: [467.83, 472.65, 475.07, 478.92, 482.30], weeklyChange: -0.86, sortRank: 0, periodReturns: { '1M': 24, '6M': 246.6, '1Y': 868 },
      marketCap: '$166B', pe: 28.8, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.12,
      etfPresence: { AIS: 1.51, ARTY: 2.64, BAI: 2.68, IVEP: false, IGPT: false, IVES: false, ALAI: 4.22, CHAT: 1.14 },
      tonyNote: 'Western Digital Corp appears in 5 of 8 AI & ML ETFs (63% coverage) with average weight 1.9% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, proScore: 1.93, coverage: 0.5,
      price: 808.63, weeklyPrices: [784.37, 792.46, 796.50, 802.97, 808.63], weeklyChange: -0.23, sortRank: 0, periodReturns: { '1M': 39.4, '6M': 240.5, '1Y': 642.8 },
      marketCap: '$181B', pe: 76.7, revenueGrowth: 44, eps: 10.54, grossMargin: 42, dividendYield: 0.37,
      etfPresence: { AIS: 2.7, ARTY: 3, BAI: false, IVEP: false, IGPT: 3.26, IVES: false, ALAI: 1.94, CHAT: false },
      tonyNote: 'Seagate Technology Holdings PLC appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 3, proScore: 1.88, coverage: 0.375,
      price: 192.59, weeklyPrices: [186.81, 188.74, 189.70, 191.24, 192.59], weeklyChange: 1.48, sortRank: 0, periodReturns: { '1M': 2.7, '6M': -3.1, '1Y': 22.4 },
      marketCap: '$554B', pe: 34.5, revenueGrowth: 22, eps: 5.58, grossMargin: 67, dividendYield: 1.05,
      etfPresence: { AIS: false, ARTY: 4.05, BAI: false, IVEP: false, IGPT: false, IVES: 3.6, ALAI: false, CHAT: 1.57 },
      tonyNote: 'ORACLE CORP appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 1.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CLASS A CORP', easyScore: 2, proScore: 1.83, coverage: 0.25,
      price: 309.85, weeklyPrices: [300.55, 303.65, 305.20, 307.68, 309.85], weeklyChange: 0.64, sortRank: 0, periodReturns: { '1M': 34.9, '6M': 244.3, '1Y': 1586.7 },
      marketCap: '$88B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 1.81, BAI: false, IVEP: 5.51, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'BLOOM ENERGY CLASS A CORP appears in 2 of 8 AI & ML ETFs (25% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MXL', name: 'MaxLinear Inc', easyScore: 2, proScore: 6.05, coverage: 0.5,
      price: 97.94, weeklyPrices: [95.00, 95.98, 96.47, 97.25, 97.94], weeklyChange: -1.74, sortRank: 0, periodReturns: { '1M': 189, '6M': 620.1, '1Y': 739.2 },
      marketCap: '$9B', pe: null, revenueGrowth: 43, eps: -1.52, grossMargin: 57, dividendYield: null,
      etfPresence: { SOXX: false, PSI: 9.99, XSD: 7.11, DRAM: false },
      tonyNote: 'MaxLinear Inc appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 6.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, proScore: 5.97, coverage: 1,
      price: 766.3, weeklyPrices: [743.31, 750.97, 754.81, 760.94, 766.30], weeklyChange: 0.55, sortRank: 0, periodReturns: { '1M': 57.2, '6M': 269.5, '1Y': 708.1 },
      marketCap: '$864B', pe: 36.2, revenueGrowth: 196, eps: 21.19, grossMargin: 58, dividendYield: 0.08,
      etfPresence: { SOXX: 9.88, PSI: 6.11, XSD: 2.88, DRAM: 5.03 },
      tonyNote: 'MICRON TECHNOLOGY INC appears in 4 of 4 Semiconductors ETFs (100% coverage) with average weight 6.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, proScore: 5.62, coverage: 0.75,
      price: 470.89, weeklyPrices: [456.76, 461.47, 463.83, 467.59, 470.89], weeklyChange: 4.74, sortRank: 0, periodReturns: { '1M': 55.2, '6M': 131.1, '1Y': 325.3 },
      marketCap: '$768B', pe: 156.4, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 8.95, PSI: 7.05, XSD: 3.46, DRAM: false },
      tonyNote: 'ADVANCED MICRO DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 5.6% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION CORP', easyScore: 2, proScore: 3.84, coverage: 0.5,
      price: 121.2, weeklyPrices: [117.56, 118.78, 119.38, 120.35, 121.20], weeklyChange: 2.28, sortRank: 0, periodReturns: { '1M': 85.7, '6M': 251.4, '1Y': 489.9 },
      marketCap: '$609B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.94, PSI: false, XSD: 3.91, DRAM: false },
      tonyNote: 'INTEL CORPORATION CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 3.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 3, proScore: 3.79, coverage: 0.75,
      price: 413.89, weeklyPrices: [401.47, 405.61, 407.68, 410.99, 413.89], weeklyChange: -0.16, sortRank: 0, periodReturns: { '1M': -2.1, '6M': 21.7, '1Y': 79.5 },
      marketCap: '$2.0T', pe: 80.5, revenueGrowth: 30, eps: 5.14, grossMargin: 77, dividendYield: 0.63,
      etfPresence: { SOXX: 6.94, PSI: 4.27, XSD: 1.92, DRAM: false },
      tonyNote: 'BROADCOM INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.8% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, proScore: 3.55, coverage: 0.75,
      price: 217.51, weeklyPrices: [210.98, 213.16, 214.25, 215.99, 217.51], weeklyChange: -0.91, sortRank: 0, periodReturns: { '1M': 7.4, '6M': 21.6, '1Y': 63.8 },
      marketCap: '$5.3T', pe: 33.4, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.02,
      etfPresence: { SOXX: 6.62, PSI: 3.82, XSD: 1.87, DRAM: false },
      tonyNote: 'NVIDIA CORP appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, proScore: 3.39, coverage: 0.5,
      price: 196.46, weeklyPrices: [190.57, 192.53, 193.51, 195.08, 196.46], weeklyChange: 3.02, sortRank: 0, periodReturns: { '1M': 24.9, '6M': 153.7, '1Y': 217.6 },
      marketCap: '$172B', pe: 64, revenueGrowth: 22, eps: 3.07, grossMargin: 51, dividendYield: 0.13,
      etfPresence: { SOXX: 6.24, PSI: false, XSD: 3.34, DRAM: false },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 3.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 3, proScore: 3.13, coverage: 0.75,
      price: 313.01, weeklyPrices: [303.62, 306.75, 308.31, 310.82, 313.01], weeklyChange: 4.9, sortRank: 0, periodReturns: { '1M': 32.5, '6M': 96.4, '1Y': 73.7 },
      marketCap: '$285B', pe: 53.5, revenueGrowth: 19, eps: 5.85, grossMargin: 57, dividendYield: 1.9,
      etfPresence: { SOXX: 3.76, PSI: 4.69, XSD: 2.38, DRAM: false },
      tonyNote: 'TEXAS INSTRUMENT INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.1% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, proScore: 2.96, coverage: 0.5,
      price: 434.65, weeklyPrices: [421.61, 425.96, 428.13, 431.61, 434.65], weeklyChange: 1.71, sortRank: 0, periodReturns: { '1M': 7.7, '6M': 94, '1Y': 170.8 },
      marketCap: '$345B', pe: 40.9, revenueGrowth: 11, eps: 10.64, grossMargin: 49, dividendYield: 0.5,
      etfPresence: { SOXX: 4.58, PSI: 3.8, XSD: false, DRAM: false },
      tonyNote: 'APPLIED MATERIAL INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 3.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp/DE', easyScore: 1, proScore: 2.73, coverage: 0.25,
      price: 1510.35, weeklyPrices: [1465.04, 1480.14, 1487.69, 1499.78, 1510.35], weeklyChange: -2.07, sortRank: 0, periodReturns: { '1M': 54.3, '6M': 654.2, '1Y': 3891.4 },
      marketCap: '$224B', pe: 51.5, revenueGrowth: 251, eps: 29.3, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 5.46 },
      tonyNote: 'Sandisk Corp/DE appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, proScore: 2.69, coverage: 0.5,
      price: 308.49, weeklyPrices: [299.24, 302.32, 303.86, 306.33, 308.49], weeklyChange: 2.07, sortRank: 0, periodReturns: { '1M': 16.2, '6M': 116.3, '1Y': 273.7 },
      marketCap: '$386B', pe: 58.3, revenueGrowth: 24, eps: 5.29, grossMargin: 50, dividendYield: 0.34,
      etfPresence: { SOXX: 3.45, PSI: 4.15, XSD: false, DRAM: false },
      tonyNote: 'LAM RESEARCH CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, proScore: 2.6, coverage: 0.5,
      price: 1901.58, weeklyPrices: [1844.53, 1863.55, 1873.06, 1888.27, 1901.58], weeklyChange: 3.22, sortRank: 0, periodReturns: { '1M': 4.9, '6M': 73.3, '1Y': 147.8 },
      marketCap: '$248B', pe: 53.8, revenueGrowth: 12, eps: 35.37, grossMargin: 61, dividendYield: 0.5,
      etfPresence: { SOXX: 3.23, PSI: 4.12, XSD: false, DRAM: false },
      tonyNote: 'KLA CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, proScore: 2.31, coverage: 0.5,
      price: 241.75, weeklyPrices: [234.50, 236.91, 238.12, 240.06, 241.75], weeklyChange: 13.28, sortRank: 0, periodReturns: { '1M': 77.7, '6M': 48, '1Y': 64 },
      marketCap: '$255B', pe: 26, revenueGrowth: -4, eps: 9.3, grossMargin: 55, dividendYield: 1.72,
      etfPresence: { SOXX: 4.01, PSI: false, XSD: 2.51, DRAM: false },
      tonyNote: 'QUALCOMM INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 1, proScore: 2.27, coverage: 0.25,
      price: 808.63, weeklyPrices: [784.37, 792.46, 796.50, 802.97, 808.63], weeklyChange: -0.23, sortRank: 0, periodReturns: { '1M': 39.4, '6M': 240.5, '1Y': 642.8 },
      marketCap: '$181B', pe: 76.7, revenueGrowth: 44, eps: 10.54, grossMargin: 42, dividendYield: 0.37,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 4.53 },
      tonyNote: 'Seagate Technology Holdings PLC appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, proScore: 2.13, coverage: 0.5,
      price: 308.38, weeklyPrices: [299.13, 302.21, 303.75, 306.22, 308.38], weeklyChange: 3.54, sortRank: 0, periodReturns: { '1M': 58.9, '6M': 117.5, '1Y': 227 },
      marketCap: '$53B', pe: 207, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.24, PSI: false, XSD: 3.78, DRAM: false },
      tonyNote: 'ASTERA LABS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, proScore: 2.1, coverage: 0.5,
      price: 1578.14, weeklyPrices: [1530.80, 1546.58, 1554.47, 1567.09, 1578.14], weeklyChange: 1.08, sortRank: 0, periodReturns: { '1M': 3.7, '6M': 80.9, '1Y': 134.8 },
      marketCap: '$78B', pe: 113.5, revenueGrowth: 26, eps: 13.9, grossMargin: 55, dividendYield: 0.51,
      etfPresence: { SOXX: 3.65, PSI: false, XSD: 2.3, DRAM: false },
      tonyNote: 'MONOLITHIC POWER SYSTEMS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, proScore: 2.08, coverage: 0.5,
      price: 310.58, weeklyPrices: [301.26, 304.37, 305.92, 308.41, 310.58], weeklyChange: 3.74, sortRank: 0, periodReturns: { '1M': 37.6, '6M': 62.3, '1Y': 58 },
      marketCap: '$78B', pe: 29.7, revenueGrowth: 12, eps: 10.45, grossMargin: 56, dividendYield: 1.35,
      etfPresence: { SOXX: 3.53, PSI: false, XSD: 2.36, DRAM: false },
      tonyNote: 'NXP SEMICONDUCTORS NV appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSEM', name: 'Tower Semiconductor Ltd', easyScore: 1, proScore: 2.02, coverage: 0.25,
      price: 282.89, weeklyPrices: [274.40, 277.23, 278.65, 280.91, 282.89], weeklyChange: 1.39, sortRank: 0, periodReturns: { '1M': 37.3, '6M': 202.1, '1Y': 594.1 },
      marketCap: '$34B', pe: 131.6, revenueGrowth: 16, eps: 2.15, grossMargin: 25, dividendYield: null,
      etfPresence: { SOXX: false, PSI: 4.05, XSD: false, DRAM: false },
      tonyNote: 'Tower Semiconductor Ltd appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 1, proScore: 2, coverage: 0.25,
      price: 482.3, weeklyPrices: [467.83, 472.65, 475.07, 478.92, 482.30], weeklyChange: -0.86, sortRank: 0, periodReturns: { '1M': 24, '6M': 246.6, '1Y': 868 },
      marketCap: '$166B', pe: 28.8, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.12,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 3.99 },
      tonyNote: 'Western Digital Corp appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, proScore: 1.87, coverage: 0.5,
      price: 115.42, weeklyPrices: [111.96, 113.11, 113.69, 114.61, 115.42], weeklyChange: 5.3, sortRank: 0, periodReturns: { '1M': 29.7, '6M': 147.2, '1Y': 172.9 },
      marketCap: '$45B', pe: 84.9, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.37, PSI: false, XSD: 2.92, DRAM: false },
      tonyNote: 'ON SEMICONDUCTOR CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'TSLA', name: 'Tesla Inc', easyScore: 2, proScore: 6.63, coverage: 0.286,
      price: 426.14, weeklyPrices: [413.36, 417.62, 419.75, 423.16, 426.14], weeklyChange: 1.98, sortRank: 0, periodReturns: { '1M': 10, '6M': 9, '1Y': 25 },
      marketCap: '$1.6T', pe: 390.9, revenueGrowth: 16, eps: 1.09, grossMargin: 19, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: false, GTEK: false, ARKK: 10.54, MARS: false },
      tonyNote: 'Tesla Inc appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 6.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'Microsoft Corp', easyScore: 3, proScore: 5.79, coverage: 0.429,
      price: 418.87, weeklyPrices: [406.30, 410.49, 412.59, 415.94, 418.87], weeklyChange: -0.05, sortRank: 0, periodReturns: { '1M': -3.2, '6M': -11.3, '1Y': -7.9 },
      marketCap: '$3.1T', pe: 24.9, revenueGrowth: 18, eps: 16.81, grossMargin: 68, dividendYield: 0.87,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: 8.19, FDTX: 4.06, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Microsoft Corp appears in 3 of 7 Broad Tech ETFs (43% coverage) with average weight 5.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab Corp', easyScore: 1, proScore: 5.23, coverage: 0.143,
      price: 137.54, weeklyPrices: [133.41, 134.79, 135.48, 136.58, 137.54], weeklyChange: 9.64, sortRank: 0, periodReturns: { '1M': 52.8, '6M': 241.3, '1Y': 432.7 },
      marketCap: '$80B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 13.83 },
      tonyNote: 'Rocket Lab Corp appears in 1 of 7 Broad Tech ETFs (14% coverage) with average weight 5.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC-CL A', easyScore: 2, proScore: 5.05, coverage: 0.286,
      price: 387.33, weeklyPrices: [375.71, 379.58, 381.52, 384.62, 387.33], weeklyChange: -0.09, sortRank: 0, periodReturns: { '1M': 14.1, '6M': 29.3, '1Y': 126.7 },
      marketCap: '$4.7T', pe: 29.6, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { QQQ: false, QQQA: 4.62, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ALPHABET INC-CL A appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 5.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 4, proScore: 4.86, coverage: 0.571,
      price: 217.51, weeklyPrices: [210.98, 213.16, 214.25, 215.99, 217.51], weeklyChange: -0.91, sortRank: 0, periodReturns: { '1M': 7.4, '6M': 21.6, '1Y': 63.8 },
      marketCap: '$5.3T', pe: 33.4, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.02,
      etfPresence: { QQQ: false, QQQA: false, PTF: 4.87, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 5.27, GTEK: false, ARKK: 1.29, MARS: false },
      tonyNote: 'NVIDIA Corp appears in 4 of 7 Broad Tech ETFs (57% coverage) with average weight 4.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 3, proScore: 4.71, coverage: 0.429,
      price: 269.04, weeklyPrices: [260.97, 263.66, 265.00, 267.16, 269.04], weeklyChange: 0.22, sortRank: 0, periodReturns: { '1M': 5.3, '6M': 21.9, '1Y': 32.5 },
      marketCap: '$2.9T', pe: 31.7, revenueGrowth: 17, eps: 8.48, grossMargin: 51, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 4.64, GTEK: false, ARKK: 2.68, MARS: false },
      tonyNote: 'Amazon.com Inc appears in 3 of 7 Broad Tech ETFs (43% coverage) with average weight 4.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AAPL', name: 'Apple Inc', easyScore: 3, proScore: 4.4, coverage: 0.429,
      price: 310.66, weeklyPrices: [301.34, 304.45, 306.00, 308.49, 310.66], weeklyChange: 1.86, sortRank: 0, periodReturns: { '1M': 13.7, '6M': 14.4, '1Y': 54.3 },
      marketCap: '$4.6T', pe: 37.6, revenueGrowth: 17, eps: 8.27, grossMargin: 48, dividendYield: 0.35,
      etfPresence: { QQQ: false, QQQA: false, PTF: 4.67, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 1.22, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Apple Inc appears in 3 of 7 Broad Tech ETFs (43% coverage) with average weight 4.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 3, proScore: 3.97, coverage: 0.429,
      price: 609.45, weeklyPrices: [591.17, 597.26, 600.31, 605.18, 609.45], weeklyChange: 0.34, sortRank: 0, periodReturns: { '1M': -9.7, '6M': 2.6, '1Y': -4.3 },
      marketCap: '$1.5T', pe: 22.2, revenueGrowth: 33, eps: 27.51, grossMargin: 82, dividendYield: 0.35,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 3.31, GTEK: false, ARKK: 0.59, MARS: false },
      tonyNote: 'Meta Platforms Inc appears in 3 of 7 Broad Tech ETFs (43% coverage) with average weight 4.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, proScore: 3.55, coverage: 0.286,
      price: 196.46, weeklyPrices: [190.57, 192.53, 193.51, 195.08, 196.46], weeklyChange: 3.02, sortRank: 0, periodReturns: { '1M': 24.9, '6M': 153.7, '1Y': 217.6 },
      marketCap: '$172B', pe: 64, revenueGrowth: 22, eps: 3.07, grossMargin: 51, dividendYield: 0.13,
      etfPresence: { QQQ: false, QQQA: 5.61, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: 7.68, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 3.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 2, proScore: 3.23, coverage: 0.286,
      price: 470.89, weeklyPrices: [456.76, 461.47, 463.83, 467.59, 470.89], weeklyChange: 4.74, sortRank: 0, periodReturns: { '1M': 55.2, '6M': 131.1, '1Y': 325.3 },
      marketCap: '$768B', pe: 156.4, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 6.93, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: 5.14, MARS: false },
      tonyNote: 'ADVANCED MICRO DEVICES appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 3.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile Inc', easyScore: 1, proScore: 3.15, coverage: 0.143,
      price: 106.54, weeklyPrices: [103.34, 104.41, 104.94, 105.79, 106.54], weeklyChange: 10.71, sortRank: 0, periodReturns: { '1M': 25.8, '6M': 107.4, '1Y': 336.5 },
      marketCap: '$41B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 8.33 },
      tonyNote: 'AST SpaceMobile Inc appears in 1 of 7 Broad Tech ETFs (14% coverage) with average weight 3.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SATS', name: 'EchoStar Corp', easyScore: 1, proScore: 3.02, coverage: 0.143,
      price: 125.44, weeklyPrices: [121.68, 122.93, 123.56, 124.56, 125.44], weeklyChange: -2.34, sortRank: 0, periodReturns: { '1M': 2.5, '6M': 82.8, '1Y': 498.8 },
      marketCap: '$36B', pe: null, revenueGrowth: -5, eps: -50.21, grossMargin: 27, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 8 },
      tonyNote: 'EchoStar Corp appears in 1 of 7 Broad Tech ETFs (14% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 3, proScore: 2.89, coverage: 0.429,
      price: 136.44, weeklyPrices: [132.35, 133.71, 134.39, 135.48, 136.44], weeklyChange: -0.71, sortRank: 0, periodReturns: { '1M': -10.6, '6M': -11.9, '1Y': 11.6 },
      marketCap: '$327B', pe: 153.3, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 7.18, FDTX: 3.01, GTEK: false, ARKK: 3.06, MARS: false },
      tonyNote: 'PALANTIR TECHNOLOGIES INC CLASS A appears in 3 of 7 Broad Tech ETFs (43% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ARM', name: 'ARM HOLDINGS PLC-ADR', easyScore: 1, proScore: 2.86, coverage: 0.143,
      price: 306.08, weeklyPrices: [296.90, 299.96, 301.49, 303.94, 306.08], weeklyChange: 2.63, sortRank: 0, periodReturns: { '1M': 55.7, '6M': 132.6, '1Y': 136.8 },
      marketCap: '$326B', pe: 355.9, revenueGrowth: 20, eps: 0.86, grossMargin: 98, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 7.57, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ARM HOLDINGS PLC-ADR appears in 1 of 7 Broad Tech ETFs (14% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp/DE', easyScore: 1, proScore: 2.77, coverage: 0.143,
      price: 1510.35, weeklyPrices: [1465.04, 1480.14, 1487.69, 1499.78, 1510.35], weeklyChange: -2.07, sortRank: 0, periodReturns: { '1M': 54.3, '6M': 654.2, '1Y': 3891.4 },
      marketCap: '$224B', pe: 51.5, revenueGrowth: 251, eps: 29.3, grossMargin: 56, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: 7.33, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Sandisk Corp/DE appears in 1 of 7 Broad Tech ETFs (14% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'SEAGATE TECHNOLOGY HOLDINGS', easyScore: 3, proScore: 2.76, coverage: 0.429,
      price: 808.63, weeklyPrices: [784.37, 792.46, 796.50, 802.97, 808.63], weeklyChange: -0.23, sortRank: 0, periodReturns: { '1M': 39.4, '6M': 240.5, '1Y': 642.8 },
      marketCap: '$181B', pe: 76.7, revenueGrowth: 44, eps: 10.54, grossMargin: 42, dividendYield: 0.37,
      etfPresence: { QQQ: false, QQQA: 6.09, PTF: 4.55, WCLD: false, MAGS: false, IGV: false, FDTX: 2.02, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'SEAGATE TECHNOLOGY HOLDINGS appears in 3 of 7 Broad Tech ETFs (43% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PANW', name: 'PALO ALTO NETWORKS INC', easyScore: 2, proScore: 2.74, coverage: 0.286,
      price: 258.92, weeklyPrices: [251.15, 253.74, 255.04, 257.11, 258.92], weeklyChange: 2.37, sortRank: 0, periodReturns: { '1M': 42.9, '6M': 41.6, '1Y': 39.1 },
      marketCap: '$210B', pe: 143.8, revenueGrowth: 15, eps: 1.8, grossMargin: 74, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 7.49, FDTX: 2.76, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'PALO ALTO NETWORKS INC appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 2.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORP', easyScore: 1, proScore: 2.71, coverage: 0.143,
      price: 121.2, weeklyPrices: [117.56, 118.78, 119.38, 120.35, 121.20], weeklyChange: 2.28, sortRank: 0, periodReturns: { '1M': 85.7, '6M': 251.4, '1Y': 489.9 },
      marketCap: '$609B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 7.18, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'INTEL CORP appears in 1 of 7 Broad Tech ETFs (14% coverage) with average weight 2.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 2, proScore: 2.65, coverage: 0.286,
      price: 192.59, weeklyPrices: [186.81, 188.74, 189.70, 191.24, 192.59], weeklyChange: 1.48, sortRank: 0, periodReturns: { '1M': 2.7, '6M': -3.1, '1Y': 22.4 },
      marketCap: '$554B', pe: 34.5, revenueGrowth: 22, eps: 5.58, grossMargin: 67, dividendYield: 1.05,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 9.21, FDTX: 0.7, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ORACLE CORP appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 2, proScore: 2.64, coverage: 0.286,
      price: 766.3, weeklyPrices: [743.31, 750.97, 754.81, 760.94, 766.30], weeklyChange: 0.55, sortRank: 0, periodReturns: { '1M': 57.2, '6M': 269.5, '1Y': 708.1 },
      marketCap: '$864B', pe: 36.2, revenueGrowth: 196, eps: 21.19, grossMargin: 58, dividendYield: 0.08,
      etfPresence: { QQQ: false, QQQA: false, PTF: 3.97, WCLD: false, MAGS: false, IGV: false, FDTX: 5.89, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Micron Technology Inc appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 2, proScore: 4.95, coverage: 0.5,
      price: 274.78, weeklyPrices: [266.54, 269.28, 270.66, 272.86, 274.78], weeklyChange: 1.49, sortRank: 0, periodReturns: { '1M': 13.2, '6M': 192.3, '1Y': 375.8 },
      marketCap: '$10B', pe: 53.7, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { POW: 6.05, VOLT: 7.95, PBD: false, PBW: false },
      tonyNote: 'Powell Industries Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 5.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 2, proScore: 3.69, coverage: 0.5,
      price: 725.48, weeklyPrices: [703.72, 710.97, 714.60, 720.40, 725.48], weeklyChange: 1.19, sortRank: 0, periodReturns: { '1M': 18.2, '6M': 68.7, '1Y': 119.3 },
      marketCap: '$109B', pe: 99.2, revenueGrowth: 26, eps: 7.31, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.81, VOLT: 5.62, PBD: false, PBW: false },
      tonyNote: 'Quanta Services Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 3.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, proScore: 3.56, coverage: 0.5,
      price: 263.97, weeklyPrices: [256.05, 258.69, 260.01, 262.12, 263.97], weeklyChange: 1.37, sortRank: 0, periodReturns: { '1M': 0.5, '6M': 87.3, '1Y': 263.9 },
      marketCap: '$4B', pe: 63.8, revenueGrowth: 17, eps: 4.14, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: 3.04, VOLT: 7.02, PBD: false, PBW: false },
      tonyNote: 'Bel Fuse Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 3.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 2, proScore: 3.16, coverage: 0.5,
      price: 389.57, weeklyPrices: [377.88, 381.78, 383.73, 386.84, 389.57], weeklyChange: 2.11, sortRank: 0, periodReturns: { '1M': -5.9, '6M': 17.4, '1Y': 21.3 },
      marketCap: '$151B', pe: 38.1, revenueGrowth: 17, eps: 10.22, grossMargin: 37, dividendYield: 1.15,
      etfPresence: { POW: 3.8, VOLT: 5.13, PBD: false, PBW: false },
      tonyNote: 'Eaton Corp PLC appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 3.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 2, proScore: 2.8, coverage: 0.5,
      price: 1050.98, weeklyPrices: [1019.45, 1029.96, 1035.22, 1043.62, 1050.98], weeklyChange: 0.69, sortRank: 0, periodReturns: { '1M': -6.8, '6M': 89, '1Y': 129 },
      marketCap: '$282B', pe: 30.7, revenueGrowth: 16, eps: 34.24, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { POW: 3.57, VOLT: 4.35, PBD: false, PBW: false },
      tonyNote: 'GE Vernova Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 3, proScore: 2.6, coverage: 0.75,
      price: 309.85, weeklyPrices: [300.55, 303.65, 305.20, 307.68, 309.85], weeklyChange: 0.64, sortRank: 0, periodReturns: { '1M': 34.9, '6M': 244.3, '1Y': 1586.7 },
      marketCap: '$88B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: 4.85, PBD: 1.72, PBW: 2.42 },
      tonyNote: 'BLOOM ENERGY CORP appears in 3 of 4 Electrification ETFs (75% coverage) with average weight 2.6% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 2, proScore: 2.57, coverage: 0.5,
      price: 88.75, weeklyPrices: [86.09, 86.97, 87.42, 88.13, 88.75], weeklyChange: -1.04, sortRank: 0, periodReturns: { '1M': -1.4, '6M': 6.3, '1Y': 32.6 },
      marketCap: '$185B', pe: 22.5, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.78,
      etfPresence: { POW: 2.06, VOLT: 5.21, PBD: false, PBW: false },
      tonyNote: 'NextEra Energy Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 2, proScore: 2.43, coverage: 0.5,
      price: 165, weeklyPrices: [160.05, 161.70, 162.53, 163.84, 165.00], weeklyChange: 0.87, sortRank: 0, periodReturns: { '1M': 17.7, '6M': 64.1, '1Y': 154.5 },
      marketCap: '$27B', pe: 56.1, revenueGrowth: 54, eps: 2.94, grossMargin: 37, dividendYield: 0.51,
      etfPresence: { POW: 3.78, VOLT: 3.1, PBD: false, PBW: false },
      tonyNote: 'nVent Electric PLC appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, proScore: 2.35, coverage: 0.25,
      price: 265.41, weeklyPrices: [257.45, 260.10, 261.43, 263.55, 265.41], weeklyChange: -1.07, sortRank: 0, periodReturns: { '1M': 0.2, '6M': 214.6, '1Y': 538.8 },
      marketCap: '$12B', pe: 89.1, revenueGrowth: 20, eps: 2.98, grossMargin: 54, dividendYield: null,
      etfPresence: { POW: 4.69, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Vicor Corp appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 2.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PRY', name: 'Prysmian SpA', easyScore: 1, proScore: 2.23, coverage: 0.25,
      price: 0, weeklyPrices: [0.00, 0.00, 0.00, 0.00, 0.00], weeklyChange: 0, sortRank: 0, periodReturns: { '1M': 0, '6M': 0, '1Y': 0 },
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { POW: 4.45, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Prysmian SpA appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 2.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FCEL', name: 'FuelCell Energy Inc', easyScore: 1, proScore: 2.23, coverage: 0.25,
      price: 26.49, weeklyPrices: [25.70, 25.96, 26.09, 26.30, 26.49], weeklyChange: 0.41, sortRank: 0, periodReturns: { '1M': 124.4, '6M': 324.4, '1Y': 478.2 },
      marketCap: '$1B', pe: null, revenueGrowth: 61, eps: -6.49, grossMargin: -16, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 4.47 },
      tonyNote: 'FuelCell Energy Inc appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 2.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 2, proScore: 2.09, coverage: 0.5,
      price: 467.31, weeklyPrices: [453.29, 457.96, 460.30, 464.04, 467.31], weeklyChange: 1.37, sortRank: 0, periodReturns: { '1M': -15, '6M': 10.8, '1Y': 20 },
      marketCap: '$25B', pe: 27.6, revenueGrowth: 11, eps: 16.92, grossMargin: 36, dividendYield: 1.23,
      etfPresence: { POW: 2.72, VOLT: 3.19, PBD: false, PBW: false },
      tonyNote: 'Hubbell Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, proScore: 2.01, coverage: 0.5,
      price: 130.41, weeklyPrices: [126.50, 127.80, 128.45, 129.50, 130.41], weeklyChange: 0.62, sortRank: 0, periodReturns: { '1M': -0.9, '6M': 7.9, '1Y': 28.1 },
      marketCap: '$71B', pe: 19.3, revenueGrowth: 10, eps: 6.77, grossMargin: 47, dividendYield: 2.93,
      etfPresence: { POW: 1.38, VOLT: 4.3, PBD: false, PBW: false },
      tonyNote: 'American Electric Power Co Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OGE', name: 'OGE ENERGY CORP', easyScore: 1, proScore: 1.92, coverage: 0.25,
      price: 48.27, weeklyPrices: [46.82, 47.30, 47.55, 47.93, 48.27], weeklyChange: 0.35, sortRank: 0, periodReturns: { '1M': 4.8, '6M': 9, '1Y': 10.2 },
      marketCap: '$10B', pe: 21.5, revenueGrowth: 1, eps: 2.25, grossMargin: 44, dividendYield: 3.53,
      etfPresence: { POW: false, VOLT: 3.83, PBD: false, PBW: false },
      tonyNote: 'OGE ENERGY CORP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETR', name: 'ENTERGY CORP', easyScore: 1, proScore: 1.85, coverage: 0.25,
      price: 112.39, weeklyPrices: [109.02, 110.14, 110.70, 111.60, 112.39], weeklyChange: 0.1, sortRank: 0, periodReturns: { '1M': 1.7, '6M': 19.9, '1Y': 38.3 },
      marketCap: '$51B', pe: 28.7, revenueGrowth: 12, eps: 3.92, grossMargin: 47, dividendYield: 2.28,
      etfPresence: { POW: false, VOLT: 3.7, PBD: false, PBW: false },
      tonyNote: 'ENTERGY CORP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, proScore: 1.82, coverage: 0.5,
      price: 320.04, weeklyPrices: [310.44, 313.64, 315.24, 317.80, 320.04], weeklyChange: -1.16, sortRank: 0, periodReturns: { '1M': -15.2, '6M': 63.3, '1Y': 176 },
      marketCap: '$13B', pe: 66.4, revenueGrowth: 26, eps: 4.82, grossMargin: 39, dividendYield: 0.12,
      etfPresence: { POW: 0.98, VOLT: 4.16, PBD: false, PBW: false },
      tonyNote: 'Advanced Energy Industries Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 1.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ET', name: 'ENERGY TRANSFER LP', easyScore: 1, proScore: 1.8, coverage: 0.25,
      price: 20.03, weeklyPrices: [19.43, 19.63, 19.73, 19.89, 20.03], weeklyChange: 0.1, sortRank: 0, periodReturns: { '1M': 5, '6M': 21.3, '1Y': 12 },
      marketCap: '$69B', pe: 16.7, revenueGrowth: 32, eps: 1.2, grossMargin: 19, dividendYield: 6.67,
      etfPresence: { POW: false, VOLT: 3.6, PBD: false, PBW: false },
      tonyNote: 'ENERGY TRANSFER LP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 1, proScore: 1.71, coverage: 0.25,
      price: 329.95, weeklyPrices: [320.05, 323.35, 325.00, 327.64, 329.95], weeklyChange: 2.03, sortRank: 0, periodReturns: { '1M': 8.1, '6M': 106.4, '1Y': 216.7 },
      marketCap: '$127B', pe: 82.9, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 3.41, PBD: false, PBW: false },
      tonyNote: 'VERTIV HOLDINGS CO appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NI', name: 'NISOURCE INC', easyScore: 1, proScore: 1.67, coverage: 0.25,
      price: 47.67, weeklyPrices: [46.24, 46.72, 46.95, 47.34, 47.67], weeklyChange: -0.08, sortRank: 0, periodReturns: { '1M': 1.8, '6M': 11.4, '1Y': 23.8 },
      marketCap: '$23B', pe: 23.7, revenueGrowth: 8, eps: 2.01, grossMargin: 51, dividendYield: 2.52,
      etfPresence: { POW: false, VOLT: 3.33, PBD: false, PBW: false },
      tonyNote: 'NISOURCE INC appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ENR', name: 'Siemens Energy AG', easyScore: 1, proScore: 1.64, coverage: 0.25,
      price: 17.75, weeklyPrices: [17.22, 17.39, 17.48, 17.63, 17.75], weeklyChange: 2.6, sortRank: 0, periodReturns: { '1M': -11.3, '6M': -2.8, '1Y': -22.2 },
      marketCap: '$1B', pe: 6.5, revenueGrowth: -3, eps: 2.73, grossMargin: 43, dividendYield: 6.94,
      etfPresence: { POW: 3.27, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Siemens Energy AG appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, proScore: 4.78, coverage: 1,
      price: 743.43, weeklyPrices: [721.13, 728.56, 732.28, 738.23, 743.43], weeklyChange: 1.32, sortRank: 0, periodReturns: { '1M': 52.4, '6M': 135.9, '1Y': 307.8 },
      marketCap: '$23B', pe: 66.2, revenueGrowth: 92, eps: 11.23, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 5.6, PRN: 3.96 },
      tonyNote: 'Sterling Infrastructure, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 4.8% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, proScore: 4.58, coverage: 1,
      price: 1845.69, weeklyPrices: [1790.32, 1808.78, 1818.00, 1832.77, 1845.69], weeklyChange: 0.56, sortRank: 0, periodReturns: { '1M': 7, '6M': 106.4, '1Y': 299.3 },
      marketCap: '$65B', pe: 53.2, revenueGrowth: 1, eps: 34.69, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: 4.37, PRN: 4.8 },
      tonyNote: 'Comfort Systems USA, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 4.6% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, proScore: 4.21, coverage: 1,
      price: 649.71, weeklyPrices: [630.22, 636.72, 639.96, 645.16, 649.71], weeklyChange: 0.79, sortRank: 0, periodReturns: { '1M': -0.3, '6M': 93.8, '1Y': 229.9 },
      marketCap: '$9B', pe: 66.8, revenueGrowth: 13, eps: 9.73, grossMargin: 20, dividendYield: 0.31,
      etfPresence: { AIRR: 4.08, PRN: 4.35 },
      tonyNote: 'Argan, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 4.2% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TTMI', name: 'TTM Technologies Inc', easyScore: 1, proScore: 4.04, coverage: 0.5,
      price: 189.34, weeklyPrices: [183.66, 185.55, 186.50, 188.01, 189.34], weeklyChange: 8.47, sortRank: 0, periodReturns: { '1M': 49.4, '6M': 222.1, '1Y': 552 },
      marketCap: '$20B', pe: 103.5, revenueGrowth: 30, eps: 1.83, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 5.72 },
      tonyNote: 'TTM Technologies Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 4.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MTZ', name: 'MasTec, Inc.', easyScore: 2, proScore: 3.72, coverage: 1,
      price: 386.25, weeklyPrices: [374.66, 378.52, 380.46, 383.55, 386.25], weeklyChange: -0.65, sortRank: 0, periodReturns: { '1M': 2.6, '6M': 100, '1Y': 156.2 },
      marketCap: '$31B', pe: 67.6, revenueGrowth: 35, eps: 5.71, grossMargin: 13, dividendYield: null,
      etfPresence: { AIRR: 4.18, PRN: 3.26 },
      tonyNote: 'MasTec, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 3.7% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 1, proScore: 3.37, coverage: 0.5,
      price: 44.55, weeklyPrices: [43.21, 43.66, 43.88, 44.24, 44.55], weeklyChange: 4.87, sortRank: 0, periodReturns: { '1M': 12.9, '6M': 299.2, '1Y': 1107.3 },
      marketCap: '$16B', pe: null, revenueGrowth: 41, eps: -0.8, grossMargin: 56, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 4.77 },
      tonyNote: 'Planet Labs PBC appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 1, proScore: 2.98, coverage: 0.5,
      price: 725.48, weeklyPrices: [703.72, 710.97, 714.60, 720.40, 725.48], weeklyChange: 1.19, sortRank: 0, periodReturns: { '1M': 18.2, '6M': 68.7, '1Y': 119.3 },
      marketCap: '$109B', pe: 99.2, revenueGrowth: 26, eps: 7.31, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { AIRR: false, PRN: 4.21 },
      tonyNote: 'Quanta Services Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CHRW', name: 'C.H. Robinson Worldwide, Inc.', easyScore: 1, proScore: 2.91, coverage: 0.5,
      price: 173.57, weeklyPrices: [168.36, 170.10, 170.97, 172.36, 173.57], weeklyChange: -2.56, sortRank: 0, periodReturns: { '1M': -4.8, '6M': 14.4, '1Y': 79.8 },
      marketCap: '$20B', pe: 35.2, revenueGrowth: -1, eps: 4.93, grossMargin: 9, dividendYield: 1.41,
      etfPresence: { AIRR: 4.12, PRN: false },
      tonyNote: 'C.H. Robinson Worldwide, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SAIA', name: 'Saia, Inc.', easyScore: 1, proScore: 2.91, coverage: 0.5,
      price: 449.96, weeklyPrices: [436.46, 440.96, 443.21, 446.81, 449.96], weeklyChange: -1.81, sortRank: 0, periodReturns: { '1M': 4.3, '6M': 65.8, '1Y': 67.9 },
      marketCap: '$12B', pe: 47.2, revenueGrowth: 2, eps: 9.53, grossMargin: 24, dividendYield: null,
      etfPresence: { AIRR: 4.11, PRN: false },
      tonyNote: 'Saia, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'EME', name: 'EMCOR Group, Inc.', easyScore: 1, proScore: 2.9, coverage: 0.5,
      price: 851.89, weeklyPrices: [826.33, 834.85, 839.11, 845.93, 851.89], weeklyChange: 0.32, sortRank: 0, periodReturns: { '1M': -0.9, '6M': 46.5, '1Y': 85.9 },
      marketCap: '$38B', pe: 28.6, revenueGrowth: 20, eps: 29.81, grossMargin: 19, dividendYield: 0.15,
      etfPresence: { AIRR: 4.1, PRN: false },
      tonyNote: 'EMCOR Group, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JBL', name: 'Jabil Inc', easyScore: 1, proScore: 2.88, coverage: 0.5,
      price: 361.59, weeklyPrices: [350.74, 354.36, 356.17, 359.06, 361.59], weeklyChange: 1.45, sortRank: 0, periodReturns: { '1M': 7.5, '6M': 83.8, '1Y': 119 },
      marketCap: '$38B', pe: 48.8, revenueGrowth: 23, eps: 7.41, grossMargin: 9, dividendYield: 0.09,
      etfPresence: { AIRR: false, PRN: 4.08 },
      tonyNote: 'Jabil Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, proScore: 2.62, coverage: 0.5,
      price: 265.41, weeklyPrices: [257.45, 260.10, 261.43, 263.55, 265.41], weeklyChange: -1.07, sortRank: 0, periodReturns: { '1M': 0.2, '6M': 214.6, '1Y': 538.8 },
      marketCap: '$12B', pe: 89.1, revenueGrowth: 20, eps: 2.98, grossMargin: 54, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 3.71 },
      tonyNote: 'Vicor Corp appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 1, proScore: 2.38, coverage: 0.5,
      price: 257.76, weeklyPrices: [250.03, 252.60, 253.89, 255.96, 257.76], weeklyChange: -0.82, sortRank: 0, periodReturns: { '1M': 7, '6M': 30.7, '1Y': 58.1 },
      marketCap: '$103B', pe: 59.8, revenueGrowth: 19, eps: 4.31, grossMargin: 35, dividendYield: 0.18,
      etfPresence: { AIRR: false, PRN: 3.37 },
      tonyNote: 'Howmet Aerospace Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 1, proScore: 2.33, coverage: 0.5,
      price: 204.03, weeklyPrices: [197.91, 199.95, 200.97, 202.60, 204.03], weeklyChange: 0.75, sortRank: 0, periodReturns: { '1M': -6.9, '6M': 20.2, '1Y': 89.6 },
      marketCap: '$19B', pe: 54.4, revenueGrowth: 26, eps: 3.75, grossMargin: 23, dividendYield: 0.51,
      etfPresence: { AIRR: 3.3, PRN: false },
      tonyNote: 'BWX Technologies, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DY', name: 'Dycom Industries, Inc.', easyScore: 1, proScore: 2.33, coverage: 0.5,
      price: 414.73, weeklyPrices: [402.29, 406.44, 408.51, 411.83, 414.73], weeklyChange: 0.07, sortRank: 0, periodReturns: { '1M': 1.6, '6M': 27, '1Y': 85 },
      marketCap: '$12B', pe: 43.3, revenueGrowth: 34, eps: 9.57, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: 3.29, PRN: false },
      tonyNote: 'Dycom Industries, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OC', name: 'Owens Corning', easyScore: 1, proScore: 2.15, coverage: 0.5,
      price: 116.76, weeklyPrices: [113.26, 114.42, 115.01, 115.94, 116.76], weeklyChange: 0.6, sortRank: 0, periodReturns: { '1M': -5, '6M': 12, '1Y': -13.6 },
      marketCap: '$9B', pe: null, revenueGrowth: -10, eps: -4.85, grossMargin: 27, dividendYield: 2.55,
      etfPresence: { AIRR: 3.04, PRN: false },
      tonyNote: 'Owens Corning appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 1, proScore: 2.09, coverage: 0.5,
      price: 318.11, weeklyPrices: [308.57, 311.75, 313.34, 315.88, 318.11], weeklyChange: 0.17, sortRank: 0, periodReturns: { '1M': -13.3, '6M': 4.1, '1Y': 41.7 },
      marketCap: '$13B', pe: 20.7, revenueGrowth: 13, eps: 15.4, grossMargin: 12, dividendYield: 1.74,
      etfPresence: { AIRR: 2.96, PRN: false },
      tonyNote: 'Huntington Ingalls Industries, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 1, proScore: 2.01, coverage: 0.5,
      price: 55.14, weeklyPrices: [53.49, 54.04, 54.31, 54.75, 55.14], weeklyChange: 0.86, sortRank: 0, periodReturns: { '1M': -19.6, '6M': -20.2, '1Y': 56.6 },
      marketCap: '$10B', pe: 324.4, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.84, PRN: false },
      tonyNote: 'Kratos Defense & Security Solutions, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 1, proScore: 1.86, coverage: 0.5,
      price: 64.5, weeklyPrices: [62.56, 63.21, 63.53, 64.05, 64.50], weeklyChange: -1.22, sortRank: 0, periodReturns: { '1M': -21.4, '6M': 7.4, '1Y': 51.2 },
      marketCap: '$9B', pe: 280.5, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 2.63, PRN: false },
      tonyNote: 'Karman Holdings Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 1, proScore: 1.77, coverage: 0.5,
      price: 274.78, weeklyPrices: [266.54, 269.28, 270.66, 272.86, 274.78], weeklyChange: 1.49, sortRank: 0, periodReturns: { '1M': 13.2, '6M': 192.3, '1Y': 375.8 },
      marketCap: '$10B', pe: 53.7, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { AIRR: 2.51, PRN: false },
      tonyNote: 'Powell Industries, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 1.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
