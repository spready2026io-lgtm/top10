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
  velocityScore?: { '1D': number | null; '1W': number | null; '1M': number | null; '6M': number | null };
  isNew?: boolean;
};

// ── Theme configuration ───────────────────────────────────────────────────────

export const THEMES: Theme[] = ['AI & ML', 'Semiconductors', 'Broad Tech', 'Electrification', 'Industrials'];

// Last scan timestamp — patched by build-data-ts.js after each run
// @@GENERATED:SCAN_TIMESTAMP@@
export const SCAN_TIMESTAMP    = '2026-05-26T18:03:50.647Z';
export const SCAN_TIMESTAMP_NY = 'May 26, 2026 at 2:03 PM ET';
// @@END_GENERATED:SCAN_TIMESTAMP@@

// Number of ETFs per theme — denominator for Coverage Score display (x/n badge)
// @@GENERATED:THEME_ETF_COUNT@@
export const THEME_ETF_COUNT: Record<Theme, number> = {
  'AI & ML':         8,
  'Semiconductors':  4,
  'Broad Tech':      10,
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
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 7, proScore: 5.69, coverage: 0.875,
      price: 213.14, weeklyPrices: [206.75, 208.88, 209.94, 211.65, 213.14], weeklyChange: -1.02, sortRank: 0, periodReturns: { '1M': -1.6, '6M': 18.2, '1Y': 57.3 },
      velocityScore: { '1D': -1.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.2T', pe: 32.7, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.02,
      etfPresence: { AIS: 2.74, ARTY: 3.9, BAI: 4.97, IVEP: false, IGPT: 6.3, IVES: 4.61, ALAI: 13.58, CHAT: 6.44 },
      tonyNote: 'NVIDIA Corp appears in 7 of 8 AI & ML ETFs (88% coverage) with average weight 5.7% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 7, proScore: 5.26, coverage: 0.875,
      price: 898.33, weeklyPrices: [871.38, 880.36, 884.86, 892.04, 898.33], weeklyChange: 19.62, sortRank: 0, periodReturns: { '1M': 71.3, '6M': 290.1, '1Y': 832.1 },
      velocityScore: { '1D': -0.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.0T', pe: 42.4, revenueGrowth: 196, eps: 21.18, grossMargin: 58, dividendYield: 0.08,
      etfPresence: { AIS: 7, ARTY: 6.17, BAI: 4.16, IVEP: false, IGPT: 9.93, IVES: 5.97, ALAI: 1.02, CHAT: 5.09 },
      tonyNote: 'Micron Technology Inc appears in 7 of 8 AI & ML ETFs (88% coverage) with average weight 5.3% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 7, proScore: 5.05, coverage: 0.875,
      price: 497.29, weeklyPrices: [482.37, 487.34, 489.83, 493.81, 497.29], weeklyChange: 6.37, sortRank: 0, periodReturns: { '1M': 48.6, '6M': 132.1, '1Y': 334.1 },
      velocityScore: { '1D': 0.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$811B', pe: 166.3, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.54, ARTY: 7.36, BAI: 4.76, IVEP: false, IGPT: 7.13, IVES: 7.38, ALAI: 1.01, CHAT: 5.64 },
      tonyNote: 'Advanced Micro Devices Inc appears in 7 of 8 AI & ML ETFs (88% coverage) with average weight 5.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 4, proScore: 3.79, coverage: 0.5,
      price: 386.5, weeklyPrices: [374.90, 378.77, 380.70, 383.79, 386.50], weeklyChange: 0.92, sortRank: 0, periodReturns: { '1M': 10.3, '6M': 20.8, '1Y': 123.5 },
      velocityScore: { '1D': -0.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.7T', pe: 29.5, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.84, IVEP: false, IGPT: 6.76, IVES: 4.73, ALAI: false, CHAT: 6.12 },
      tonyNote: 'ALPHABET INC CLASS A appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 3.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 6, proScore: 3.26, coverage: 0.75,
      price: 422.58, weeklyPrices: [409.90, 414.13, 416.24, 419.62, 422.58], weeklyChange: 2.04, sortRank: 0, periodReturns: { '1M': 1, '6M': 6.3, '1Y': 79.3 },
      velocityScore: { '1D': -0.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.0T', pe: 82.2, revenueGrowth: 30, eps: 5.14, grossMargin: 77, dividendYield: 0.63,
      etfPresence: { AIS: 0.78, ARTY: 3.87, BAI: 5.3, IVEP: false, IGPT: false, IVES: 4.77, ALAI: 4.54, CHAT: 3.31 },
      tonyNote: 'Broadcom Inc appears in 6 of 8 AI & ML ETFs (75% coverage) with average weight 3.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 4, proScore: 3.06, coverage: 0.5,
      price: 412.94, weeklyPrices: [400.55, 404.68, 406.75, 410.05, 412.94], weeklyChange: 2.08, sortRank: 0, periodReturns: { '1M': 2, '6M': 42.4, '1Y': 108.9 },
      velocityScore: { '1D': -0.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.1T', pe: 35.4, revenueGrowth: 35, eps: 11.65, grossMargin: 62, dividendYield: 0.94,
      etfPresence: { AIS: 3.25, ARTY: false, BAI: 4.24, IVEP: false, IGPT: false, IVES: 4.46, ALAI: 5.38, CHAT: false },
      tonyNote: 'Taiwan Semiconductor Manufacturing Co Ltd appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 3.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 3, proScore: 3.02, coverage: 0.375,
      price: 262.64, weeklyPrices: [254.76, 257.39, 258.70, 260.80, 262.64], weeklyChange: -1.38, sortRank: 0, periodReturns: { '1M': 0.6, '6M': 14.6, '1Y': 27.5 },
      velocityScore: { '1D': -0.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.8T', pe: 31.2, revenueGrowth: 17, eps: 8.42, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.81, ALAI: 6.38, CHAT: 3.6 },
      tonyNote: 'AMAZON.COM INC appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 3, proScore: 2.9, coverage: 0.375,
      price: 122.31, weeklyPrices: [118.64, 119.86, 120.48, 121.45, 122.31], weeklyChange: 2.07, sortRank: 0, periodReturns: { '1M': 43.9, '6M': 232.3, '1Y': 495.2 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$615B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.54, ARTY: false, BAI: 3.08, IVEP: false, IGPT: 7.6, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'Intel Corp appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 4, proScore: 2.75, coverage: 0.5,
      price: 608.8, weeklyPrices: [590.54, 596.62, 599.67, 604.54, 608.80], weeklyChange: -0.24, sortRank: 0, periodReturns: { '1M': -10.3, '6M': -3.9, '1Y': -5.2 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 22.1, revenueGrowth: 33, eps: 27.52, grossMargin: 82, dividendYield: 0.34,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: 5.12, IVES: 3.68, ALAI: 4.21, CHAT: 2.55 },
      tonyNote: 'Meta Platforms Inc appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, proScore: 2.58, coverage: 0.5,
      price: 413.91, weeklyPrices: [401.49, 405.63, 407.70, 411.01, 413.91], weeklyChange: -1.11, sortRank: 0, periodReturns: { '1M': -2.6, '6M': -14.7, '1Y': -10.2 },
      velocityScore: { '1D': -0.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.1T', pe: 24.7, revenueGrowth: 18, eps: 16.78, grossMargin: 68, dividendYield: 0.87,
      etfPresence: { AIS: false, ARTY: 1.93, BAI: false, IVEP: false, IGPT: false, IVES: 4.03, ALAI: 5.48, CHAT: 3.16 },
      tonyNote: 'MICROSOFT CORP appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 3, proScore: 2.34, coverage: 0.375,
      price: 208.68, weeklyPrices: [202.42, 204.51, 205.55, 207.22, 208.68], weeklyChange: 6.29, sortRank: 0, periodReturns: { '1M': 31.9, '6M': 137.9, '1Y': 227 },
      velocityScore: { '1D': 1.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$183B', pe: 68.2, revenueGrowth: 22, eps: 3.06, grossMargin: 51, dividendYield: 0.12,
      etfPresence: { AIS: 3.35, ARTY: 6.75, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.34 },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 2.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc. Class C', easyScore: 1, proScore: 2.21, coverage: 0.125,
      price: 382.54, weeklyPrices: [371.06, 374.89, 376.80, 379.86, 382.54], weeklyChange: 0.83, sortRank: 0, periodReturns: { '1M': 9.8, '6M': 19.4, '1Y': 119.9 },
      velocityScore: { '1D': -0.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.6T', pe: 29.1, revenueGrowth: 22, eps: 13.13, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 6.26, CHAT: false },
      tonyNote: 'Alphabet Inc. Class C appears in 1 of 8 AI & ML ETFs (13% coverage) with average weight 2.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 4, proScore: 2.1, coverage: 0.5,
      price: 1077.28, weeklyPrices: [1044.96, 1055.73, 1061.12, 1069.74, 1077.28], weeklyChange: 3.71, sortRank: 0, periodReturns: { '1M': -3.8, '6M': 82.7, '1Y': 128.5 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$289B', pe: 31.5, revenueGrowth: 16, eps: 34.17, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { AIS: 3.03, ARTY: false, BAI: false, IVEP: 4.03, IGPT: false, IVES: 3.59, ALAI: 1.21, CHAT: false },
      tonyNote: 'GE Vernova Inc appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NBIS', name: 'NEBIUS GROUP NV', easyScore: 3, proScore: 2.03, coverage: 0.375,
      price: 209.35, weeklyPrices: [203.07, 205.16, 206.21, 207.88, 209.35], weeklyChange: -2.52, sortRank: 0, periodReturns: { '1M': 44.4, '6M': 121.1, '1Y': 425.7 },
      velocityScore: { '1D': -1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$53B', pe: 80.5, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 3.02, ALAI: 4.19, CHAT: 2.75 },
      tonyNote: 'NEBIUS GROUP NV appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, proScore: 2, coverage: 0.5,
      price: 328.25, weeklyPrices: [318.40, 321.69, 323.33, 325.95, 328.25], weeklyChange: 0.24, sortRank: 0, periodReturns: { '1M': 1.8, '6M': 90.8, '1Y': 199 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$126B', pe: 82.1, revenueGrowth: 30, eps: 4, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 4.17, ARTY: false, BAI: 2.02, IVEP: 4.15, IGPT: false, IVES: false, ALAI: false, CHAT: 0.95 },
      tonyNote: 'Vertiv Holdings Co appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AAPL', name: 'APPLE INC', easyScore: 2, proScore: 2, coverage: 0.25,
      price: 309.67, weeklyPrices: [300.38, 303.48, 305.02, 307.50, 309.67], weeklyChange: 0.27, sortRank: 0, periodReturns: { '1M': 15.7, '6M': 11.6, '1Y': 54.7 },
      velocityScore: { '1D': 0.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.5T', pe: 37.5, revenueGrowth: 17, eps: 8.25, grossMargin: 48, dividendYield: 0.35,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.74, ALAI: 3.24, CHAT: false },
      tonyNote: 'APPLE INC appears in 2 of 8 AI & ML ETFs (25% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, proScore: 1.91, coverage: 0.5,
      price: 861.35, weeklyPrices: [835.51, 844.12, 848.43, 855.32, 861.35], weeklyChange: 5.98, sortRank: 0, periodReturns: { '1M': 44.6, '6M': 216.3, '1Y': 635.9 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$193B', pe: 81.5, revenueGrowth: 44, eps: 10.57, grossMargin: 42, dividendYield: 0.36,
      etfPresence: { AIS: 2.65, ARTY: 2.97, BAI: false, IVEP: false, IGPT: 3.24, IVES: false, ALAI: 1.94, CHAT: false },
      tonyNote: 'Seagate Technology Holdings PLC appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 5, proScore: 1.9, coverage: 0.625,
      price: 528.34, weeklyPrices: [512.49, 517.77, 520.41, 524.64, 528.34], weeklyChange: 9.1, sortRank: 0, periodReturns: { '1M': 31.8, '6M': 234.9, '1Y': 919.6 },
      velocityScore: { '1D': -1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$182B', pe: 31.6, revenueGrowth: 46, eps: 16.71, grossMargin: 45, dividendYield: 0.12,
      etfPresence: { AIS: 1.47, ARTY: 2.59, BAI: 2.64, IVEP: false, IGPT: false, IVES: false, ALAI: 4.21, CHAT: 1.11 },
      tonyNote: 'Western Digital Corp appears in 5 of 8 AI & ML ETFs (63% coverage) with average weight 1.9% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 3, proScore: 1.88, coverage: 0.375,
      price: 190.72, weeklyPrices: [185.00, 186.91, 187.86, 189.38, 190.72], weeklyChange: -0.71, sortRank: 0, periodReturns: { '1M': 10.3, '6M': -6.9, '1Y': 17.8 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$549B', pe: 34.2, revenueGrowth: 22, eps: 5.57, grossMargin: 67, dividendYield: 1.04,
      etfPresence: { AIS: false, ARTY: 4.04, BAI: false, IVEP: false, IGPT: false, IVES: 3.62, ALAI: false, CHAT: 1.55 },
      tonyNote: 'ORACLE CORP appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 1.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CLASS A CORP', easyScore: 2, proScore: 1.78, coverage: 0.25,
      price: 306.59, weeklyPrices: [297.39, 300.46, 301.99, 304.44, 306.59], weeklyChange: 1.36, sortRank: 0, periodReturns: { '1M': 30.6, '6M': 203.1, '1Y': 1451.6 },
      velocityScore: { '1D': -1.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$87B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 1.75, BAI: false, IVEP: 5.38, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'BLOOM ENERGY CLASS A CORP appears in 2 of 8 AI & ML ETFs (25% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MXL', name: 'MaxLinear Inc', easyScore: 2, proScore: 5.83, coverage: 0.5,
      price: 95.42, weeklyPrices: [92.56, 93.51, 93.99, 94.75, 95.42], weeklyChange: -3.78, sortRank: 0, periodReturns: { '1M': 84.7, '6M': 518, '1Y': 701.1 },
      velocityScore: { '1D': -2.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: 43, eps: -1.52, grossMargin: 57, dividendYield: null,
      etfPresence: { SOXX: false, PSI: 9.74, XSD: 6.76, DRAM: false },
      tonyNote: 'MaxLinear Inc appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 5.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, proScore: 5.75, coverage: 1,
      price: 898.33, weeklyPrices: [871.38, 880.36, 884.86, 892.04, 898.33], weeklyChange: 19.62, sortRank: 0, periodReturns: { '1M': 71.3, '6M': 290.1, '1Y': 832.1 },
      velocityScore: { '1D': -2.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.0T', pe: 42.4, revenueGrowth: 196, eps: 21.18, grossMargin: 58, dividendYield: 0.08,
      etfPresence: { SOXX: 9.51, PSI: 5.91, XSD: 2.71, DRAM: 4.86 },
      tonyNote: 'MICRON TECHNOLOGY INC appears in 4 of 4 Semiconductors ETFs (100% coverage) with average weight 5.8% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, proScore: 5.7, coverage: 0.75,
      price: 497.29, weeklyPrices: [482.37, 487.34, 489.83, 493.81, 497.29], weeklyChange: 6.37, sortRank: 0, periodReturns: { '1M': 48.6, '6M': 132.1, '1Y': 334.1 },
      velocityScore: { '1D': 0.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$811B', pe: 166.3, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 9.1, PSI: 7.19, XSD: 3.44, DRAM: false },
      tonyNote: 'ADVANCED MICRO DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 5.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION CORP', easyScore: 2, proScore: 3.76, coverage: 0.5,
      price: 122.31, weeklyPrices: [118.64, 119.86, 120.48, 121.45, 122.31], weeklyChange: 2.07, sortRank: 0, periodReturns: { '1M': 43.9, '6M': 232.3, '1Y': 495.2 },
      velocityScore: { '1D': -2.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$615B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.86, PSI: false, XSD: 3.77, DRAM: false },
      tonyNote: 'INTEL CORPORATION CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 3.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 3, proScore: 3.69, coverage: 0.75,
      price: 422.58, weeklyPrices: [409.90, 414.13, 416.24, 419.62, 422.58], weeklyChange: 2.04, sortRank: 0, periodReturns: { '1M': 1, '6M': 6.3, '1Y': 79.3 },
      velocityScore: { '1D': -1.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.0T', pe: 82.2, revenueGrowth: 30, eps: 5.14, grossMargin: 77, dividendYield: 0.63,
      etfPresence: { SOXX: 6.77, PSI: 4.18, XSD: 1.83, DRAM: false },
      tonyNote: 'BROADCOM INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, proScore: 3.4, coverage: 0.75,
      price: 213.14, weeklyPrices: [206.75, 208.88, 209.94, 211.65, 213.14], weeklyChange: -1.02, sortRank: 0, periodReturns: { '1M': -1.6, '6M': 18.2, '1Y': 57.3 },
      velocityScore: { '1D': -3.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.2T', pe: 32.7, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.02,
      etfPresence: { SOXX: 6.35, PSI: 3.67, XSD: 1.75, DRAM: false },
      tonyNote: 'NVIDIA CORP appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, proScore: 3.38, coverage: 0.5,
      price: 208.68, weeklyPrices: [202.42, 204.51, 205.55, 207.22, 208.68], weeklyChange: 6.29, sortRank: 0, periodReturns: { '1M': 31.9, '6M': 137.9, '1Y': 227 },
      velocityScore: { '1D': -0.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$183B', pe: 68.2, revenueGrowth: 22, eps: 3.06, grossMargin: 51, dividendYield: 0.12,
      etfPresence: { SOXX: 6.28, PSI: false, XSD: 3.28, DRAM: false },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 3.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 3, proScore: 3.16, coverage: 0.75,
      price: 323.86, weeklyPrices: [314.14, 317.38, 319.00, 321.59, 323.86], weeklyChange: 4.74, sortRank: 0, periodReturns: { '1M': 20.2, '6M': 95.9, '1Y': 76.7 },
      velocityScore: { '1D': 0.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$295B', pe: 55.5, revenueGrowth: 19, eps: 5.84, grossMargin: 57, dividendYield: 1.84,
      etfPresence: { SOXX: 3.81, PSI: 4.77, XSD: 2.35, DRAM: false },
      tonyNote: 'TEXAS INSTRUMENT INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, proScore: 2.93, coverage: 0.5,
      price: 453.25, weeklyPrices: [439.65, 444.19, 446.45, 450.08, 453.25], weeklyChange: 4.88, sortRank: 0, periodReturns: { '1M': 12, '6M': 81.3, '1Y': 180.1 },
      velocityScore: { '1D': -0.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$360B', pe: 42.6, revenueGrowth: 11, eps: 10.63, grossMargin: 49, dividendYield: 0.49,
      etfPresence: { SOXX: 4.52, PSI: 3.77, XSD: false, DRAM: false },
      tonyNote: 'APPLIED MATERIAL INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, proScore: 2.66, coverage: 0.5,
      price: 321.33, weeklyPrices: [311.69, 314.90, 316.51, 319.08, 321.33], weeklyChange: 5.23, sortRank: 0, periodReturns: { '1M': 23.8, '6M': 107.1, '1Y': 282.8 },
      velocityScore: { '1D': -0.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$402B', pe: 60.9, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.34,
      etfPresence: { SOXX: 3.41, PSI: 4.11, XSD: false, DRAM: false },
      tonyNote: 'LAM RESEARCH CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp/DE', easyScore: 1, proScore: 2.64, coverage: 0.25,
      price: 1610.37, weeklyPrices: [1562.06, 1578.16, 1586.21, 1599.10, 1610.37], weeklyChange: 8.91, sortRank: 0, periodReturns: { '1M': 50.5, '6M': 648.9, '1Y': 4117.8 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$238B', pe: 55, revenueGrowth: 251, eps: 29.28, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 5.28 },
      tonyNote: 'Sandisk Corp/DE appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, proScore: 2.61, coverage: 0.5,
      price: 1998.81, weeklyPrices: [1938.85, 1958.83, 1968.83, 1984.82, 1998.81], weeklyChange: 5.85, sortRank: 0, periodReturns: { '1M': 5.2, '6M': 72.4, '1Y': 153.3 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$261B', pe: 56.6, revenueGrowth: 12, eps: 35.31, grossMargin: 61, dividendYield: 0.49,
      etfPresence: { SOXX: 3.24, PSI: 4.14, XSD: false, DRAM: false },
      tonyNote: 'KLA CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, proScore: 2.49, coverage: 0.5,
      price: 247.37, weeklyPrices: [239.95, 242.42, 243.66, 245.64, 247.37], weeklyChange: 3.87, sortRank: 0, periodReturns: { '1M': 64.6, '6M': 49.8, '1Y': 66.4 },
      velocityScore: { '1D': 7.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$261B', pe: 26.6, revenueGrowth: -4, eps: 9.29, grossMargin: 55, dividendYield: 1.55,
      etfPresence: { SOXX: 4.37, PSI: false, XSD: 2.68, DRAM: false },
      tonyNote: 'QUALCOMM INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 1, proScore: 2.29, coverage: 0.25,
      price: 861.35, weeklyPrices: [835.51, 844.12, 848.43, 855.32, 861.35], weeklyChange: 5.98, sortRank: 0, periodReturns: { '1M': 44.6, '6M': 216.3, '1Y': 635.9 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$193B', pe: 81.5, revenueGrowth: 44, eps: 10.57, grossMargin: 42, dividendYield: 0.36,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 4.59 },
      tonyNote: 'Seagate Technology Holdings PLC appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, proScore: 2.13, coverage: 0.5,
      price: 330.2, weeklyPrices: [320.29, 323.60, 325.25, 327.89, 330.20], weeklyChange: 4.34, sortRank: 0, periodReturns: { '1M': 39.4, '6M': 70.4, '1Y': 66 },
      velocityScore: { '1D': 2.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$83B', pe: 31.5, revenueGrowth: 12, eps: 10.48, grossMargin: 56, dividendYield: 1.28,
      etfPresence: { SOXX: 3.64, PSI: false, XSD: 2.39, DRAM: false },
      tonyNote: 'NXP SEMICONDUCTORS NV appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, proScore: 2.11, coverage: 0.5,
      price: 317.69, weeklyPrices: [308.16, 311.34, 312.92, 315.47, 317.69], weeklyChange: 3.52, sortRank: 0, periodReturns: { '1M': 61.6, '6M': 106, '1Y': 225.7 },
      velocityScore: { '1D': -0.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$54B', pe: 216.1, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.25, PSI: false, XSD: 3.72, DRAM: false },
      tonyNote: 'ASTERA LABS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, proScore: 2.07, coverage: 0.5,
      price: 1667.2, weeklyPrices: [1617.18, 1633.86, 1642.19, 1655.53, 1667.20], weeklyChange: 4.87, sortRank: 0, periodReturns: { '1M': 5, '6M': 80.2, '1Y': 143.2 },
      velocityScore: { '1D': -1.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$82B', pe: 119.2, revenueGrowth: 26, eps: 13.99, grossMargin: 55, dividendYield: 0.5,
      etfPresence: { SOXX: 3.63, PSI: false, XSD: 2.24, DRAM: false },
      tonyNote: 'MONOLITHIC POWER SYSTEMS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSEM', name: 'Tower Semiconductor Ltd', easyScore: 1, proScore: 2.02, coverage: 0.25,
      price: 285.09, weeklyPrices: [276.54, 279.39, 280.81, 283.09, 285.09], weeklyChange: 0.59, sortRank: 0, periodReturns: { '1M': 40.2, '6M': 175.6, '1Y': 585.8 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$34B', pe: 132.6, revenueGrowth: 16, eps: 2.15, grossMargin: 25, dividendYield: null,
      etfPresence: { SOXX: false, PSI: 4.03, XSD: false, DRAM: false },
      tonyNote: 'Tower Semiconductor Ltd appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVTS', name: 'NAVITAS SEMICONDUCTOR CORP', easyScore: 1, proScore: 2.02, coverage: 0.25,
      price: 31.99, weeklyPrices: [31.03, 31.35, 31.51, 31.77, 31.99], weeklyChange: 9.37, sortRank: 0, periodReturns: { '1M': 74.8, '6M': 283.6, '1Y': 392.2 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$8B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: 4.04, DRAM: false },
      tonyNote: 'NAVITAS SEMICONDUCTOR CORP appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 1, proScore: 2, coverage: 0.25,
      price: 528.34, weeklyPrices: [512.49, 517.77, 520.41, 524.64, 528.34], weeklyChange: 9.1, sortRank: 0, periodReturns: { '1M': 31.8, '6M': 234.9, '1Y': 919.6 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$182B', pe: 31.6, revenueGrowth: 46, eps: 16.71, grossMargin: 45, dividendYield: 0.12,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 4.01 },
      tonyNote: 'Western Digital Corp appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'TSLA', name: 'TSLA', easyScore: 3, proScore: 5.19, coverage: 0.3,
      price: 432.32, weeklyPrices: [419.35, 423.67, 425.84, 429.29, 432.32], weeklyChange: 1.48, sortRank: 0, periodReturns: { '1M': 14.2, '6M': 1.3, '1Y': 19.1 },
      velocityScore: { '1D': -21.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: 389.5, revenueGrowth: 16, eps: 1.11, grossMargin: 19, dividendYield: null,
      etfPresence: { QQQ: 3.42, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: false, GTEK: false, ARKK: 10.73, MARS: false },
      tonyNote: 'TSLA appears in 3 of 10 Broad Tech ETFs (30% coverage) with average weight 5.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MSFT', easyScore: 4, proScore: 4.98, coverage: 0.4,
      price: 413.91, weeklyPrices: [401.49, 405.63, 407.70, 411.01, 413.91], weeklyChange: -1.11, sortRank: 0, periodReturns: { '1M': -2.6, '6M': -14.7, '1Y': -10.2 },
      velocityScore: { '1D': -14, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.1T', pe: 24.7, revenueGrowth: 18, eps: 16.78, grossMargin: 68, dividendYield: 0.87,
      etfPresence: { QQQ: 5.11, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: 8.06, FDTX: 4.06, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'MSFT appears in 4 of 10 Broad Tech ETFs (40% coverage) with average weight 5.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'NVDA', easyScore: 5, proScore: 4.85, coverage: 0.5,
      price: 213.14, weeklyPrices: [206.75, 208.88, 209.94, 211.65, 213.14], weeklyChange: -1.02, sortRank: 0, periodReturns: { '1M': -1.6, '6M': 18.2, '1Y': 57.3 },
      velocityScore: { '1D': 0.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.2T', pe: 32.7, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.02,
      etfPresence: { QQQ: 8.75, QQQA: false, PTF: 4.7, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 5.27, GTEK: false, ARKK: 1.27, MARS: false },
      tonyNote: 'NVDA appears in 5 of 10 Broad Tech ETFs (50% coverage) with average weight 4.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab Corp', easyScore: 1, proScore: 4.47, coverage: 0.1,
      price: 143.31, weeklyPrices: [139.01, 140.44, 141.16, 142.31, 143.31], weeklyChange: 5.56, sortRank: 0, periodReturns: { '1M': 74.1, '6M': 241.8, '1Y': 398.3 },
      velocityScore: { '1D': -16.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$83B', pe: null, revenueGrowth: 64, eps: -0.33, grossMargin: 37, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 14.14 },
      tonyNote: 'Rocket Lab Corp appears in 1 of 10 Broad Tech ETFs (10% coverage) with average weight 4.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AAPL', name: 'AAPL', easyScore: 4, proScore: 4.35, coverage: 0.4,
      price: 309.67, weeklyPrices: [300.38, 303.48, 305.02, 307.50, 309.67], weeklyChange: 0.27, sortRank: 0, periodReturns: { '1M': 15.7, '6M': 11.6, '1Y': 54.7 },
      velocityScore: { '1D': -1.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.5T', pe: 37.5, revenueGrowth: 17, eps: 8.25, grossMargin: 48, dividendYield: 0.35,
      etfPresence: { QQQ: 7.35, QQQA: false, PTF: 4.66, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 1.22, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'AAPL appears in 4 of 10 Broad Tech ETFs (40% coverage) with average weight 4.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'AMZN', easyScore: 4, proScore: 4.16, coverage: 0.4,
      price: 262.64, weeklyPrices: [254.76, 257.39, 258.70, 260.80, 262.64], weeklyChange: -1.38, sortRank: 0, periodReturns: { '1M': 0.6, '6M': 14.6, '1Y': 27.5 },
      velocityScore: { '1D': -11.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.8T', pe: 31.2, revenueGrowth: 17, eps: 8.42, grossMargin: 51, dividendYield: null,
      etfPresence: { QQQ: 4.73, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 4.64, GTEK: false, ARKK: 2.66, MARS: false },
      tonyNote: 'AMZN appears in 4 of 10 Broad Tech ETFs (40% coverage) with average weight 4.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'GOOGL', easyScore: 3, proScore: 4.1, coverage: 0.3,
      price: 386.5, weeklyPrices: [374.90, 378.77, 380.70, 383.79, 386.50], weeklyChange: 0.92, sortRank: 0, periodReturns: { '1M': 10.3, '6M': 20.8, '1Y': 123.5 },
      velocityScore: { '1D': -18.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.7T', pe: 29.5, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { QQQ: 3.7, QQQA: 4.49, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'GOOGL appears in 3 of 10 Broad Tech ETFs (30% coverage) with average weight 4.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'META', easyScore: 4, proScore: 3.34, coverage: 0.4,
      price: 608.8, weeklyPrices: [590.54, 596.62, 599.67, 604.54, 608.80], weeklyChange: -0.24, sortRank: 0, periodReturns: { '1M': -10.3, '6M': -3.9, '1Y': -5.2 },
      velocityScore: { '1D': -15.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 22.1, revenueGrowth: 33, eps: 27.52, grossMargin: 82, dividendYield: 0.34,
      etfPresence: { QQQ: 2.94, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 3.31, GTEK: false, ARKK: 0.59, MARS: false },
      tonyNote: 'META appears in 4 of 10 Broad Tech ETFs (40% coverage) with average weight 3.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 3, proScore: 3.05, coverage: 0.3,
      price: 208.68, weeklyPrices: [202.42, 204.51, 205.55, 207.22, 208.68], weeklyChange: 6.29, sortRank: 0, periodReturns: { '1M': 31.9, '6M': 137.9, '1Y': 227 },
      velocityScore: { '1D': -14.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$183B', pe: 68.2, revenueGrowth: 22, eps: 3.06, grossMargin: 51, dividendYield: 0.12,
      etfPresence: { QQQ: false, QQQA: 5.68, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: 7.68, GTEK: 3.37, ARKK: false, MARS: false },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 3 of 10 Broad Tech ETFs (30% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'AMD', easyScore: 3, proScore: 2.87, coverage: 0.3,
      price: 497.29, weeklyPrices: [482.37, 487.34, 489.83, 493.81, 497.29], weeklyChange: 6.37, sortRank: 0, periodReturns: { '1M': 48.6, '6M': 132.1, '1Y': 334.1 },
      velocityScore: { '1D': -12.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$811B', pe: 166.3, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { QQQ: 3.32, QQQA: 7.09, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: 5.33, MARS: false },
      tonyNote: 'AMD appears in 3 of 10 Broad Tech ETFs (30% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile Inc', easyScore: 1, proScore: 2.74, coverage: 0.1,
      price: 123.08, weeklyPrices: [119.39, 120.62, 121.23, 122.22, 123.08], weeklyChange: 16.27, sortRank: 0, periodReturns: { '1M': 59.4, '6M': 121.7, '1Y': 395.5 },
      velocityScore: { '1D': -16.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$48B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 8.66 },
      tonyNote: 'AST SpaceMobile Inc appears in 1 of 10 Broad Tech ETFs (10% coverage) with average weight 2.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 3, proScore: 2.49, coverage: 0.3,
      price: 898.33, weeklyPrices: [871.38, 880.36, 884.86, 892.04, 898.33], weeklyChange: 19.62, sortRank: 0, periodReturns: { '1M': 71.3, '6M': 290.1, '1Y': 832.1 },
      velocityScore: { '1D': -4.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.0T', pe: 42.4, revenueGrowth: 196, eps: 21.18, grossMargin: 58, dividendYield: 0.08,
      etfPresence: { QQQ: 3.89, QQQA: false, PTF: 3.85, WCLD: false, MAGS: false, IGV: false, FDTX: 5.89, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'MU appears in 3 of 10 Broad Tech ETFs (30% coverage) with average weight 2.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ARM', name: 'ARM HOLDINGS PLC-ADR', easyScore: 1, proScore: 2.42, coverage: 0.1,
      price: 316.96, weeklyPrices: [307.45, 310.62, 312.21, 314.74, 316.96], weeklyChange: 3.41, sortRank: 0, periodReturns: { '1M': 46.8, '6M': 139, '1Y': 136.6 },
      velocityScore: { '1D': -16.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$337B', pe: 368.6, revenueGrowth: 20, eps: 0.86, grossMargin: 98, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 7.65, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ARM HOLDINGS PLC-ADR appears in 1 of 10 Broad Tech ETFs (10% coverage) with average weight 2.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PANW', name: 'PANW', easyScore: 3, proScore: 2.34, coverage: 0.3,
      price: 257.63, weeklyPrices: [249.90, 252.48, 253.77, 255.83, 257.63], weeklyChange: -1.13, sortRank: 0, periodReturns: { '1M': 40.9, '6M': 39, '1Y': 37.4 },
      velocityScore: { '1D': -14.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$209B', pe: 143.1, revenueGrowth: 15, eps: 1.8, grossMargin: 74, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: 2.44, MAGS: false, IGV: 7.59, FDTX: 2.76, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'PANW appears in 3 of 10 Broad Tech ETFs (30% coverage) with average weight 2.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SATS', name: 'EchoStar Corp', easyScore: 1, proScore: 2.31, coverage: 0.1,
      price: 124.73, weeklyPrices: [120.99, 122.24, 122.86, 123.86, 124.73], weeklyChange: 0.43, sortRank: 0, periodReturns: { '1M': 2.5, '6M': 76, '1Y': 516.3 },
      velocityScore: { '1D': -16.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$36B', pe: null, revenueGrowth: -5, eps: -50.21, grossMargin: 27, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 7.32 },
      tonyNote: 'EchoStar Corp appears in 1 of 10 Broad Tech ETFs (10% coverage) with average weight 2.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'PLTR', easyScore: 4, proScore: 2.3, coverage: 0.4,
      price: 136.96, weeklyPrices: [132.85, 134.22, 134.91, 136.00, 136.96], weeklyChange: 0.06, sortRank: 0, periodReturns: { '1M': -4.3, '6M': -17.4, '1Y': 11 },
      velocityScore: { '1D': -20.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$328B', pe: 153.9, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { QQQ: 1.43, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 7.04, FDTX: 3.01, GTEK: false, ARKK: 3.04, MARS: false },
      tonyNote: 'PLTR appears in 4 of 10 Broad Tech ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'SEAGATE TECHNOLOGY HOLDINGS', easyScore: 3, proScore: 2.29, coverage: 0.3,
      price: 861.35, weeklyPrices: [835.51, 844.12, 848.43, 855.32, 861.35], weeklyChange: 5.98, sortRank: 0, periodReturns: { '1M': 44.6, '6M': 216.3, '1Y': 635.9 },
      velocityScore: { '1D': -16.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$193B', pe: 81.5, revenueGrowth: 44, eps: 10.57, grossMargin: 42, dividendYield: 0.36,
      etfPresence: { QQQ: false, QQQA: 6.01, PTF: 4.49, WCLD: false, MAGS: false, IGV: false, FDTX: 2.02, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'SEAGATE TECHNOLOGY HOLDINGS appears in 3 of 10 Broad Tech ETFs (30% coverage) with average weight 2.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 2, proScore: 2.21, coverage: 0.2,
      price: 190.72, weeklyPrices: [185.00, 186.91, 187.86, 189.38, 190.72], weeklyChange: -0.71, sortRank: 0, periodReturns: { '1M': 10.3, '6M': -6.9, '1Y': 17.8 },
      velocityScore: { '1D': -16.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$549B', pe: 34.2, revenueGrowth: 22, eps: 5.57, grossMargin: 67, dividendYield: 1.04,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 9.18, FDTX: 0.7, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ORACLE CORP appears in 2 of 10 Broad Tech ETFs (20% coverage) with average weight 2.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'INTC', easyScore: 2, proScore: 2.2, coverage: 0.2,
      price: 122.31, weeklyPrices: [118.64, 119.86, 120.48, 121.45, 122.31], weeklyChange: 2.07, sortRank: 0, periodReturns: { '1M': 43.9, '6M': 232.3, '1Y': 495.2 },
      velocityScore: { '1D': -18.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$615B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { QQQ: 2.68, QQQA: 7.14, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'INTC appears in 2 of 10 Broad Tech ETFs (20% coverage) with average weight 2.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp/DE', easyScore: 1, proScore: 2.19, coverage: 0.1,
      price: 1610.37, weeklyPrices: [1562.06, 1578.16, 1586.21, 1599.10, 1610.37], weeklyChange: 8.91, sortRank: 0, periodReturns: { '1M': 50.5, '6M': 648.9, '1Y': 4117.8 },
      velocityScore: { '1D': -16.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$238B', pe: 55, revenueGrowth: 251, eps: 29.28, grossMargin: 56, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: 6.93, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Sandisk Corp/DE appears in 1 of 10 Broad Tech ETFs (10% coverage) with average weight 2.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 2, proScore: 5.04, coverage: 0.5,
      price: 287.69, weeklyPrices: [279.06, 281.94, 283.37, 285.68, 287.69], weeklyChange: 3.03, sortRank: 0, periodReturns: { '1M': 10.4, '6M': 168.2, '1Y': 376.2 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 56.3, revenueGrowth: 7, eps: 5.11, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { POW: 6.16, VOLT: 8.09, PBD: false, PBW: false },
      tonyNote: 'Powell Industries Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 5.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 2, proScore: 3.67, coverage: 0.5,
      price: 743.61, weeklyPrices: [721.30, 728.74, 732.46, 738.40, 743.61], weeklyChange: 2.79, sortRank: 0, periodReturns: { '1M': 16.7, '6M': 61.5, '1Y': 117.2 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$112B', pe: 101.7, revenueGrowth: 26, eps: 7.31, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.79, VOLT: 5.6, PBD: false, PBW: false },
      tonyNote: 'Quanta Services Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 3.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, proScore: 3.64, coverage: 0.5,
      price: 276.63, weeklyPrices: [268.33, 271.10, 272.48, 274.69, 276.63], weeklyChange: 2.45, sortRank: 0, periodReturns: { '1M': 10.2, '6M': 81.2, '1Y': 274.3 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 66.5, revenueGrowth: 17, eps: 4.16, grossMargin: 39, dividendYield: 0.1,
      etfPresence: { POW: 3.12, VOLT: 7.18, PBD: false, PBW: false },
      tonyNote: 'Bel Fuse Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 3.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 2, proScore: 3.2, coverage: 0.5,
      price: 405.25, weeklyPrices: [393.09, 397.14, 399.17, 402.41, 405.25], weeklyChange: 3.55, sortRank: 0, periodReturns: { '1M': -2.8, '6M': 18.6, '1Y': 23.5 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$157B', pe: 39.7, revenueGrowth: 17, eps: 10.21, grossMargin: 37, dividendYield: 1.12,
      etfPresence: { POW: 3.85, VOLT: 5.19, PBD: false, PBW: false },
      tonyNote: 'Eaton Corp PLC appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 3.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 2, proScore: 2.75, coverage: 0.5,
      price: 1077.28, weeklyPrices: [1044.96, 1055.73, 1061.12, 1069.74, 1077.28], weeklyChange: 3.71, sortRank: 0, periodReturns: { '1M': -3.8, '6M': 82.7, '1Y': 128.5 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$289B', pe: 31.5, revenueGrowth: 16, eps: 34.17, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { POW: 3.5, VOLT: 4.27, PBD: false, PBW: false },
      tonyNote: 'GE Vernova Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 3, proScore: 2.5, coverage: 0.75,
      price: 306.59, weeklyPrices: [297.39, 300.46, 301.99, 304.44, 306.59], weeklyChange: 1.36, sortRank: 0, periodReturns: { '1M': 30.6, '6M': 203.1, '1Y': 1451.6 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$87B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: 4.7, PBD: 1.66, PBW: 2.3 },
      tonyNote: 'BLOOM ENERGY CORP appears in 3 of 4 Electrification ETFs (75% coverage) with average weight 2.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 2, proScore: 2.5, coverage: 0.5,
      price: 87.94, weeklyPrices: [85.30, 86.18, 86.62, 87.32, 87.94], weeklyChange: -0.68, sortRank: 0, periodReturns: { '1M': -7.3, '6M': 2.8, '1Y': 29.3 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$183B', pe: 22.3, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.82,
      etfPresence: { POW: 2.01, VOLT: 5.07, PBD: false, PBW: false },
      tonyNote: 'NextEra Energy Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 2, proScore: 2.41, coverage: 0.5,
      price: 169.03, weeklyPrices: [163.96, 165.65, 166.49, 167.85, 169.03], weeklyChange: 2.65, sortRank: 0, periodReturns: { '1M': 19.3, '6M': 58.7, '1Y': 152.5 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 57.3, revenueGrowth: 54, eps: 2.95, grossMargin: 37, dividendYield: 0.51,
      etfPresence: { POW: 3.75, VOLT: 3.08, PBD: false, PBW: false },
      tonyNote: 'nVent Electric PLC appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, proScore: 2.31, coverage: 0.25,
      price: 324.3, weeklyPrices: [314.57, 317.81, 319.44, 322.03, 324.30], weeklyChange: 21.01, sortRank: 0, periodReturns: { '1M': 20.7, '6M': 262.2, '1Y': 663.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 108.1, revenueGrowth: 20, eps: 3, grossMargin: 54, dividendYield: null,
      etfPresence: { POW: 4.63, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Vicor Corp appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 2.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PRY', name: 'Prysmian SpA', easyScore: 1, proScore: 2.21, coverage: 0.25,
      price: 0, weeklyPrices: [0.00, 0.00, 0.00, 0.00, 0.00], weeklyChange: 0, sortRank: 0, periodReturns: { '1M': 0, '6M': 0, '1Y': 0 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { POW: 4.41, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Prysmian SpA appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 2.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 2, proScore: 2.12, coverage: 0.5,
      price: 477.58, weeklyPrices: [463.25, 468.03, 470.42, 474.24, 477.58], weeklyChange: 0.54, sortRank: 0, periodReturns: { '1M': -14, '6M': 11.5, '1Y': 19.7 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 28.2, revenueGrowth: 11, eps: 16.91, grossMargin: 36, dividendYield: 1.2,
      etfPresence: { POW: 2.77, VOLT: 3.24, PBD: false, PBW: false },
      tonyNote: 'Hubbell Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FCEL', name: 'FuelCell Energy Inc', easyScore: 1, proScore: 2.05, coverage: 0.25,
      price: 25.14, weeklyPrices: [24.39, 24.64, 24.76, 24.96, 25.14], weeklyChange: 0.52, sortRank: 0, periodReturns: { '1M': 135.4, '6M': 304.2, '1Y': 334.9 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1B', pe: null, revenueGrowth: 61, eps: -6.49, grossMargin: -16, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 4.1 },
      tonyNote: 'FuelCell Energy Inc appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, proScore: 2.01, coverage: 0.5,
      price: 131.13, weeklyPrices: [127.20, 128.51, 129.16, 130.21, 131.13], weeklyChange: -0.35, sortRank: 0, periodReturns: { '1M': -2.9, '6M': 6.9, '1Y': 27.4 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$71B', pe: 19.4, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.89,
      etfPresence: { POW: 1.38, VOLT: 4.31, PBD: false, PBW: false },
      tonyNote: 'American Electric Power Co Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OGE', name: 'OGE ENERGY CORP', easyScore: 1, proScore: 1.91, coverage: 0.25,
      price: 48.4, weeklyPrices: [46.95, 47.43, 47.67, 48.06, 48.40], weeklyChange: -0.29, sortRank: 0, periodReturns: { '1M': 1.7, '6M': 6.4, '1Y': 8.6 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 21.5, revenueGrowth: 1, eps: 2.25, grossMargin: 44, dividendYield: 3.5,
      etfPresence: { POW: false, VOLT: 3.81, PBD: false, PBW: false },
      tonyNote: 'OGE ENERGY CORP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETR', name: 'ENTERGY CORP', easyScore: 1, proScore: 1.82, coverage: 0.25,
      price: 112.47, weeklyPrices: [109.10, 110.22, 110.78, 111.68, 112.47], weeklyChange: 0.06, sortRank: 0, periodReturns: { '1M': -0.9, '6M': 16.5, '1Y': 35.9 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$51B', pe: 28.7, revenueGrowth: 12, eps: 3.92, grossMargin: 47, dividendYield: 2.28,
      etfPresence: { POW: false, VOLT: 3.65, PBD: false, PBW: false },
      tonyNote: 'ENTERGY CORP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, proScore: 1.8, coverage: 0.5,
      price: 338.58, weeklyPrices: [328.42, 331.81, 333.50, 336.21, 338.58], weeklyChange: 4.22, sortRank: 0, periodReturns: { '1M': -12.2, '6M': 61.3, '1Y': 188.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$14B', pe: 70.4, revenueGrowth: 26, eps: 4.81, grossMargin: 39, dividendYield: 0.12,
      etfPresence: { POW: 0.97, VOLT: 4.11, PBD: false, PBW: false },
      tonyNote: 'Advanced Energy Industries Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 1.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ET', name: 'ENERGY TRANSFER LP', easyScore: 1, proScore: 1.78, coverage: 0.25,
      price: 19.66, weeklyPrices: [19.07, 19.27, 19.37, 19.52, 19.66], weeklyChange: -2.04, sortRank: 0, periodReturns: { '1M': 3.2, '6M': 19.7, '1Y': 9.5 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$68B', pe: 16.4, revenueGrowth: 32, eps: 1.2, grossMargin: 19, dividendYield: 6.65,
      etfPresence: { POW: false, VOLT: 3.56, PBD: false, PBW: false },
      tonyNote: 'ENERGY TRANSFER LP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVTS', name: 'Navitas Semiconductor Corp', easyScore: 1, proScore: 1.75, coverage: 0.25,
      price: 31.99, weeklyPrices: [31.03, 31.35, 31.51, 31.77, 31.99], weeklyChange: 9.37, sortRank: 0, periodReturns: { '1M': 74.8, '6M': 283.6, '1Y': 392.2 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$8B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 3.51 },
      tonyNote: 'Navitas Semiconductor Corp appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HYLN', name: 'Hyliion Holdings Corp', easyScore: 1, proScore: 1.74, coverage: 0.25,
      price: 6.84, weeklyPrices: [6.63, 6.70, 6.74, 6.79, 6.84], weeklyChange: 14.27, sortRank: 0, periodReturns: { '1M': 272, '6M': 270, '1Y': 500.4 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1B', pe: null, revenueGrowth: 479, eps: -0.3, grossMargin: 6, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 3.47 },
      tonyNote: 'Hyliion Holdings Corp appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 1, proScore: 1.71, coverage: 0.25,
      price: 328.25, weeklyPrices: [318.40, 321.69, 323.33, 325.95, 328.25], weeklyChange: 0.24, sortRank: 0, periodReturns: { '1M': 1.8, '6M': 90.8, '1Y': 199 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$126B', pe: 82.1, revenueGrowth: 30, eps: 4, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 3.41, PBD: false, PBW: false },
      tonyNote: 'VERTIV HOLDINGS CO appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, proScore: 4.74, coverage: 1,
      price: 781.11, weeklyPrices: [757.68, 765.49, 769.39, 775.64, 781.11], weeklyChange: 6.57, sortRank: 0, periodReturns: { '1M': 54.5, '6M': 129.9, '1Y': 308.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$24B', pe: 69.7, revenueGrowth: 92, eps: 11.21, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 5.58, PRN: 3.9 },
      tonyNote: 'Sterling Infrastructure, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 4.7% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, proScore: 4.53, coverage: 1,
      price: 1898.55, weeklyPrices: [1841.59, 1860.58, 1870.07, 1885.26, 1898.55], weeklyChange: 3.84, sortRank: 0, periodReturns: { '1M': 5.8, '6M': 95.5, '1Y': 291.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$67B', pe: 55, revenueGrowth: 1, eps: 34.55, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: 4.34, PRN: 4.71 },
      tonyNote: 'Comfort Systems USA, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 4.5% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TTMI', name: 'TTM Technologies Inc', easyScore: 1, proScore: 4.34, coverage: 0.5,
      price: 198.25, weeklyPrices: [192.30, 194.28, 195.28, 196.86, 198.25], weeklyChange: 4.39, sortRank: 0, periodReturns: { '1M': 37.5, '6M': 190.3, '1Y': 565.7 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$21B', pe: 107.7, revenueGrowth: 30, eps: 1.84, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 6.14 },
      tonyNote: 'TTM Technologies Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 4.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, proScore: 4.25, coverage: 1,
      price: 681.46, weeklyPrices: [661.02, 667.83, 671.24, 676.69, 681.46], weeklyChange: 3.83, sortRank: 0, periodReturns: { '1M': 3.1, '6M': 79, '1Y': 223.7 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 70.2, revenueGrowth: 13, eps: 9.71, grossMargin: 20, dividendYield: 0.3,
      etfPresence: { AIRR: 4.14, PRN: 4.37 },
      tonyNote: 'Argan, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 4.3% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 1, proScore: 3.48, coverage: 0.5,
      price: 50.38, weeklyPrices: [48.87, 49.37, 49.62, 50.03, 50.38], weeklyChange: 13.6, sortRank: 0, periodReturns: { '1M': 42.1, '6M': 329.9, '1Y': 1169 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: null, revenueGrowth: 41, eps: -0.8, grossMargin: 56, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 4.92 },
      tonyNote: 'Planet Labs PBC appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 1, proScore: 2.96, coverage: 0.5,
      price: 743.61, weeklyPrices: [721.30, 728.74, 732.46, 738.40, 743.61], weeklyChange: 2.79, sortRank: 0, periodReturns: { '1M': 16.7, '6M': 61.5, '1Y': 117.2 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$112B', pe: 101.7, revenueGrowth: 26, eps: 7.31, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { AIRR: false, PRN: 4.19 },
      tonyNote: 'Quanta Services Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JBL', name: 'Jabil Inc', easyScore: 1, proScore: 2.91, coverage: 0.5,
      price: 378.26, weeklyPrices: [366.91, 370.69, 372.59, 375.61, 378.26], weeklyChange: 3.82, sortRank: 0, periodReturns: { '1M': 11, '6M': 82.5, '1Y': 123.6 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$40B', pe: 50.9, revenueGrowth: 23, eps: 7.43, grossMargin: 9, dividendYield: 0.09,
      etfPresence: { AIRR: false, PRN: 4.12 },
      tonyNote: 'Jabil Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MTZ', name: 'MasTec, Inc.', easyScore: 1, proScore: 2.89, coverage: 0.5,
      price: 390.96, weeklyPrices: [379.23, 383.14, 385.10, 388.22, 390.96], weeklyChange: 2.32, sortRank: 0, periodReturns: { '1M': 1.3, '6M': 85.8, '1Y': 151.5 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$31B', pe: 68.7, revenueGrowth: 35, eps: 5.69, grossMargin: 13, dividendYield: null,
      etfPresence: { AIRR: 4.09, PRN: false },
      tonyNote: 'MasTec, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'EME', name: 'EMCOR Group, Inc.', easyScore: 1, proScore: 2.88, coverage: 0.5,
      price: 866, weeklyPrices: [840.02, 848.68, 853.01, 859.94, 866.00], weeklyChange: 2.01, sortRank: 0, periodReturns: { '1M': -2.2, '6M': 41.8, '1Y': 82.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$39B', pe: 29.1, revenueGrowth: 20, eps: 29.8, grossMargin: 19, dividendYield: 0.15,
      etfPresence: { AIRR: 4.08, PRN: false },
      tonyNote: 'EMCOR Group, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SAIA', name: 'Saia, Inc.', easyScore: 1, proScore: 2.88, coverage: 0.5,
      price: 470.83, weeklyPrices: [456.71, 461.41, 463.77, 467.53, 470.83], weeklyChange: 3.2, sortRank: 0, periodReturns: { '1M': 6, '6M': 68.5, '1Y': 71.2 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 49.4, revenueGrowth: 2, eps: 9.54, grossMargin: 24, dividendYield: null,
      etfPresence: { AIRR: 4.07, PRN: false },
      tonyNote: 'Saia, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CHRW', name: 'C.H. Robinson Worldwide, Inc.', easyScore: 1, proScore: 2.84, coverage: 0.5,
      price: 178.48, weeklyPrices: [173.13, 174.91, 175.80, 177.23, 178.48], weeklyChange: 2.44, sortRank: 0, periodReturns: { '1M': -5.3, '6M': 11.9, '1Y': 83.4 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$21B', pe: 36.1, revenueGrowth: -1, eps: 4.95, grossMargin: 9, dividendYield: 1.45,
      etfPresence: { AIRR: 4.02, PRN: false },
      tonyNote: 'C.H. Robinson Worldwide, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, proScore: 2.59, coverage: 0.5,
      price: 324.3, weeklyPrices: [314.57, 317.81, 319.44, 322.03, 324.30], weeklyChange: 21.01, sortRank: 0, periodReturns: { '1M': 20.7, '6M': 262.2, '1Y': 663.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 108.1, revenueGrowth: 20, eps: 3, grossMargin: 54, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 3.66 },
      tonyNote: 'Vicor Corp appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 1, proScore: 2.33, coverage: 0.5,
      price: 203.5, weeklyPrices: [197.39, 199.43, 200.45, 202.08, 203.50], weeklyChange: 0.29, sortRank: 0, periodReturns: { '1M': -8.4, '6M': 14.2, '1Y': 66.3 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 54.3, revenueGrowth: 26, eps: 3.75, grossMargin: 23, dividendYield: 0.51,
      etfPresence: { AIRR: 3.29, PRN: false },
      tonyNote: 'BWX Technologies, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 1, proScore: 2.32, coverage: 0.5,
      price: 260.26, weeklyPrices: [252.45, 255.05, 256.36, 258.44, 260.26], weeklyChange: 1.45, sortRank: 0, periodReturns: { '1M': 7.7, '6M': 27.2, '1Y': 53.4 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$104B', pe: 60.4, revenueGrowth: 19, eps: 4.31, grossMargin: 35, dividendYield: 0.19,
      etfPresence: { AIRR: false, PRN: 3.28 },
      tonyNote: 'Howmet Aerospace Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DY', name: 'Dycom Industries, Inc.', easyScore: 1, proScore: 2.3, coverage: 0.5,
      price: 421.51, weeklyPrices: [408.86, 413.08, 415.19, 418.56, 421.51], weeklyChange: 2.51, sortRank: 0, periodReturns: { '1M': 1.3, '6M': 18.8, '1Y': 85.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 44.2, revenueGrowth: 34, eps: 9.54, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: 3.25, PRN: false },
      tonyNote: 'Dycom Industries, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 1, proScore: 2.29, coverage: 0.5,
      price: 906.32, weeklyPrices: [879.13, 888.19, 892.73, 899.98, 906.32], weeklyChange: 3, sortRank: 0, periodReturns: { '1M': 9.4, '6M': 58, '1Y': 157.8 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$417B', pe: 45.2, revenueGrowth: 22, eps: 20.06, grossMargin: 29, dividendYield: 0.69,
      etfPresence: { AIRR: false, PRN: 3.24 },
      tonyNote: 'Caterpillar Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OC', name: 'Owens Corning', easyScore: 1, proScore: 2.16, coverage: 0.5,
      price: 119.81, weeklyPrices: [116.22, 117.41, 118.01, 118.97, 119.81], weeklyChange: 2.04, sortRank: 0, periodReturns: { '1M': -4.5, '6M': 7.4, '1Y': -13 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: -10, eps: -4.74, grossMargin: 27, dividendYield: 2.52,
      etfPresence: { AIRR: 3.06, PRN: false },
      tonyNote: 'Owens Corning appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 1, proScore: 2.11, coverage: 0.5,
      price: 320.69, weeklyPrices: [311.07, 314.28, 315.88, 318.45, 320.69], weeklyChange: 0.02, sortRank: 0, periodReturns: { '1M': -10.5, '6M': 2, '1Y': 40.8 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 20.8, revenueGrowth: 13, eps: 15.39, grossMargin: 12, dividendYield: 1.72,
      etfPresence: { AIRR: 2.98, PRN: false },
      tonyNote: 'Huntington Ingalls Industries, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 1, proScore: 2.06, coverage: 0.5,
      price: 57.13, weeklyPrices: [55.42, 55.99, 56.27, 56.73, 57.13], weeklyChange: 1.69, sortRank: 0, periodReturns: { '1M': -9.5, '6M': -24.6, '1Y': 49.9 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 336.1, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.91, PRN: false },
      tonyNote: 'Kratos Defense & Security Solutions, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 1, proScore: 1.82, coverage: 0.5,
      price: 287.69, weeklyPrices: [279.06, 281.94, 283.37, 285.68, 287.69], weeklyChange: 3.03, sortRank: 0, periodReturns: { '1M': 10.4, '6M': 168.2, '1Y': 376.2 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 56.3, revenueGrowth: 7, eps: 5.11, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { AIRR: 2.58, PRN: false },
      tonyNote: 'Powell Industries, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 1.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
