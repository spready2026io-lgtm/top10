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
export const SCAN_TIMESTAMP    = '2026-05-26T14:28:12.471Z';
export const SCAN_TIMESTAMP_NY = 'May 26, 2026 at 10:28 AM ET';
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
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 7, proScore: 5.69, coverage: 0.875,
      price: 217.06, weeklyPrices: [210.55, 212.72, 213.80, 215.54, 217.06], weeklyChange: 0.8, sortRank: 0, periodReturns: { '1M': 0.2, '6M': 20.4, '1Y': 60.2 },
      velocityScore: { '1D': -1.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.3T', pe: 33.3, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.02,
      etfPresence: { AIS: 2.74, ARTY: 3.9, BAI: 4.97, IVEP: false, IGPT: 6.3, IVES: 4.61, ALAI: 13.58, CHAT: 6.44 },
      tonyNote: 'NVIDIA Corp appears in 7 of 8 AI & ML ETFs (88% coverage) with average weight 5.7% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 7, proScore: 5.26, coverage: 0.875,
      price: 877.75, weeklyPrices: [851.42, 860.19, 864.58, 871.61, 877.75], weeklyChange: 16.88, sortRank: 0, periodReturns: { '1M': 67.3, '6M': 281.2, '1Y': 810.7 },
      velocityScore: { '1D': -0.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$990B', pe: 41.4, revenueGrowth: 196, eps: 21.18, grossMargin: 58, dividendYield: 0.08,
      etfPresence: { AIS: 7, ARTY: 6.17, BAI: 4.16, IVEP: false, IGPT: 9.93, IVES: 5.97, ALAI: 1.02, CHAT: 5.09 },
      tonyNote: 'Micron Technology Inc appears in 7 of 8 AI & ML ETFs (88% coverage) with average weight 5.3% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 7, proScore: 5.05, coverage: 0.875,
      price: 493.19, weeklyPrices: [478.39, 483.33, 485.79, 489.74, 493.19], weeklyChange: 5.49, sortRank: 0, periodReturns: { '1M': 47.4, '6M': 130.2, '1Y': 330.5 },
      velocityScore: { '1D': 0.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$804B', pe: 164.9, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.54, ARTY: 7.36, BAI: 4.76, IVEP: false, IGPT: 7.13, IVES: 7.38, ALAI: 1.01, CHAT: 5.64 },
      tonyNote: 'Advanced Micro Devices Inc appears in 7 of 8 AI & ML ETFs (88% coverage) with average weight 5.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 4, proScore: 3.79, coverage: 0.5,
      price: 386.84, weeklyPrices: [375.23, 379.10, 381.04, 384.13, 386.84], weeklyChange: 1.01, sortRank: 0, periodReturns: { '1M': 10.4, '6M': 20.9, '1Y': 123.7 },
      velocityScore: { '1D': -0.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.7T', pe: 29.5, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.84, IVEP: false, IGPT: 6.76, IVES: 4.73, ALAI: false, CHAT: 6.12 },
      tonyNote: 'ALPHABET INC CLASS A appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 3.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 6, proScore: 3.26, coverage: 0.75,
      price: 434.3, weeklyPrices: [421.27, 425.61, 427.79, 431.26, 434.30], weeklyChange: 4.87, sortRank: 0, periodReturns: { '1M': 3.8, '6M': 9.2, '1Y': 84.3 },
      velocityScore: { '1D': -0.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.1T', pe: 84.5, revenueGrowth: 30, eps: 5.14, grossMargin: 77, dividendYield: 0.63,
      etfPresence: { AIS: 0.78, ARTY: 3.87, BAI: 5.3, IVEP: false, IGPT: false, IVES: 4.77, ALAI: 4.54, CHAT: 3.31 },
      tonyNote: 'Broadcom Inc appears in 6 of 8 AI & ML ETFs (75% coverage) with average weight 3.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 4, proScore: 3.06, coverage: 0.5,
      price: 413.79, weeklyPrices: [401.38, 405.51, 407.58, 410.89, 413.79], weeklyChange: 2.29, sortRank: 0, periodReturns: { '1M': 2.2, '6M': 42.7, '1Y': 109.3 },
      velocityScore: { '1D': -0.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.1T', pe: 35.5, revenueGrowth: 35, eps: 11.65, grossMargin: 62, dividendYield: 0.94,
      etfPresence: { AIS: 3.25, ARTY: false, BAI: 4.24, IVEP: false, IGPT: false, IVES: 4.46, ALAI: 5.38, CHAT: false },
      tonyNote: 'Taiwan Semiconductor Manufacturing Co Ltd appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 3.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 3, proScore: 3.02, coverage: 0.375,
      price: 265.96, weeklyPrices: [257.98, 260.64, 261.97, 264.10, 265.96], weeklyChange: -0.14, sortRank: 0, periodReturns: { '1M': 1.9, '6M': 16.1, '1Y': 29.1 },
      velocityScore: { '1D': -0.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 31.6, revenueGrowth: 17, eps: 8.42, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.81, ALAI: 6.38, CHAT: 3.6 },
      tonyNote: 'AMAZON.COM INC appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 3, proScore: 2.9, coverage: 0.375,
      price: 122.03, weeklyPrices: [118.37, 119.59, 120.20, 121.18, 122.03], weeklyChange: 1.83, sortRank: 0, periodReturns: { '1M': 43.6, '6M': 231.5, '1Y': 493.8 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$613B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.54, ARTY: false, BAI: 3.08, IVEP: false, IGPT: 7.6, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'Intel Corp appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 4, proScore: 2.75, coverage: 0.5,
      price: 609.78, weeklyPrices: [591.49, 597.58, 600.63, 605.51, 609.78], weeklyChange: -0.08, sortRank: 0, periodReturns: { '1M': -10.1, '6M': -3.8, '1Y': -5.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 22.2, revenueGrowth: 33, eps: 27.52, grossMargin: 82, dividendYield: 0.34,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: 5.12, IVES: 3.68, ALAI: 4.21, CHAT: 2.55 },
      tonyNote: 'Meta Platforms Inc appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, proScore: 2.58, coverage: 0.5,
      price: 419.6, weeklyPrices: [407.01, 411.21, 413.31, 416.66, 419.60], weeklyChange: 0.25, sortRank: 0, periodReturns: { '1M': -1.2, '6M': -13.6, '1Y': -8.9 },
      velocityScore: { '1D': -0.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.1T', pe: 25, revenueGrowth: 18, eps: 16.78, grossMargin: 68, dividendYield: 0.87,
      etfPresence: { AIS: false, ARTY: 1.93, BAI: false, IVEP: false, IGPT: false, IVES: 4.03, ALAI: 5.48, CHAT: 3.16 },
      tonyNote: 'MICROSOFT CORP appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 3, proScore: 2.34, coverage: 0.375,
      price: 208.03, weeklyPrices: [201.79, 203.87, 204.91, 206.57, 208.03], weeklyChange: 5.96, sortRank: 0, periodReturns: { '1M': 31.5, '6M': 137.2, '1Y': 226 },
      velocityScore: { '1D': 1.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$182B', pe: 68, revenueGrowth: 22, eps: 3.06, grossMargin: 51, dividendYield: 0.12,
      etfPresence: { AIS: 3.35, ARTY: 6.75, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.34 },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 2.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc. Class C', easyScore: 1, proScore: 2.21, coverage: 0.125,
      price: 383.32, weeklyPrices: [371.82, 375.65, 377.57, 380.64, 383.32], weeklyChange: 1.04, sortRank: 0, periodReturns: { '1M': 10, '6M': 19.7, '1Y': 120.3 },
      velocityScore: { '1D': -0.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.6T', pe: 29.2, revenueGrowth: 22, eps: 13.13, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 6.26, CHAT: false },
      tonyNote: 'Alphabet Inc. Class C appears in 1 of 8 AI & ML ETFs (13% coverage) with average weight 2.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 4, proScore: 2.1, coverage: 0.5,
      price: 1087.39, weeklyPrices: [1054.77, 1065.64, 1071.08, 1079.78, 1087.39], weeklyChange: 4.68, sortRank: 0, periodReturns: { '1M': -2.9, '6M': 84.4, '1Y': 130.6 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$292B', pe: 31.8, revenueGrowth: 16, eps: 34.17, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { AIS: 3.03, ARTY: false, BAI: false, IVEP: 4.03, IGPT: false, IVES: 3.59, ALAI: 1.21, CHAT: false },
      tonyNote: 'GE Vernova Inc appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NBIS', name: 'NEBIUS GROUP NV', easyScore: 3, proScore: 2.03, coverage: 0.375,
      price: 213.13, weeklyPrices: [206.74, 208.87, 209.93, 211.64, 213.13], weeklyChange: -0.76, sortRank: 0, periodReturns: { '1M': 47, '6M': 125.1, '1Y': 435.2 },
      velocityScore: { '1D': -1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$54B', pe: 82, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 3.02, ALAI: 4.19, CHAT: 2.75 },
      tonyNote: 'NEBIUS GROUP NV appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, proScore: 2, coverage: 0.5,
      price: 338.73, weeklyPrices: [328.57, 331.96, 333.65, 336.36, 338.73], weeklyChange: 3.44, sortRank: 0, periodReturns: { '1M': 5.1, '6M': 96.9, '1Y': 208.5 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$130B', pe: 84.7, revenueGrowth: 30, eps: 4, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 4.17, ARTY: false, BAI: 2.02, IVEP: 4.15, IGPT: false, IVES: false, ALAI: false, CHAT: 0.95 },
      tonyNote: 'Vertiv Holdings Co appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AAPL', name: 'APPLE INC', easyScore: 2, proScore: 2, coverage: 0.25,
      price: 311.58, weeklyPrices: [302.23, 305.35, 306.91, 309.40, 311.58], weeklyChange: 0.89, sortRank: 0, periodReturns: { '1M': 16.4, '6M': 12.3, '1Y': 55.6 },
      velocityScore: { '1D': 0.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.6T', pe: 37.8, revenueGrowth: 17, eps: 8.25, grossMargin: 48, dividendYield: 0.35,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.74, ALAI: 3.24, CHAT: false },
      tonyNote: 'APPLE INC appears in 2 of 8 AI & ML ETFs (25% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, proScore: 1.91, coverage: 0.5,
      price: 842.6, weeklyPrices: [817.32, 825.75, 829.96, 836.70, 842.60], weeklyChange: 3.68, sortRank: 0, periodReturns: { '1M': 41.4, '6M': 209.5, '1Y': 619.9 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$189B', pe: 79.7, revenueGrowth: 44, eps: 10.57, grossMargin: 42, dividendYield: 0.36,
      etfPresence: { AIS: 2.65, ARTY: 2.97, BAI: false, IVEP: false, IGPT: 3.24, IVES: false, ALAI: 1.94, CHAT: false },
      tonyNote: 'Seagate Technology Holdings PLC appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 5, proScore: 1.9, coverage: 0.625,
      price: 530.47, weeklyPrices: [514.56, 519.86, 522.51, 526.76, 530.47], weeklyChange: 9.54, sortRank: 0, periodReturns: { '1M': 32.4, '6M': 236.3, '1Y': 923.7 },
      velocityScore: { '1D': -1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$183B', pe: 31.7, revenueGrowth: 46, eps: 16.71, grossMargin: 45, dividendYield: 0.12,
      etfPresence: { AIS: 1.47, ARTY: 2.59, BAI: 2.64, IVEP: false, IGPT: false, IVES: false, ALAI: 4.21, CHAT: 1.11 },
      tonyNote: 'Western Digital Corp appears in 5 of 8 AI & ML ETFs (63% coverage) with average weight 1.9% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 3, proScore: 1.88, coverage: 0.375,
      price: 194.74, weeklyPrices: [188.90, 190.85, 191.82, 193.38, 194.74], weeklyChange: 1.38, sortRank: 0, periodReturns: { '1M': 12.6, '6M': -5, '1Y': 20.3 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$560B', pe: 35, revenueGrowth: 22, eps: 5.57, grossMargin: 67, dividendYield: 1.04,
      etfPresence: { AIS: false, ARTY: 4.04, BAI: false, IVEP: false, IGPT: false, IVES: 3.62, ALAI: false, CHAT: 1.55 },
      tonyNote: 'ORACLE CORP appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 1.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CLASS A CORP', easyScore: 2, proScore: 1.78, coverage: 0.25,
      price: 310.03, weeklyPrices: [300.73, 303.83, 305.38, 307.86, 310.03], weeklyChange: 2.49, sortRank: 0, periodReturns: { '1M': 32.1, '6M': 206.5, '1Y': 1469 },
      velocityScore: { '1D': -1.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$88B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 1.75, BAI: false, IVEP: 5.38, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'BLOOM ENERGY CLASS A CORP appears in 2 of 8 AI & ML ETFs (25% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MXL', name: 'MaxLinear Inc', easyScore: 2, proScore: 5.83, coverage: 0.5,
      price: 93.13, weeklyPrices: [90.34, 91.27, 91.73, 92.48, 93.13], weeklyChange: -6.08, sortRank: 0, periodReturns: { '1M': 80.3, '6M': 503.2, '1Y': 682 },
      velocityScore: { '1D': -2.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$8B', pe: null, revenueGrowth: 43, eps: -1.52, grossMargin: 57, dividendYield: null,
      etfPresence: { SOXX: false, PSI: 9.74, XSD: 6.76, DRAM: false },
      tonyNote: 'MaxLinear Inc appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 5.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, proScore: 5.75, coverage: 1,
      price: 877.75, weeklyPrices: [851.42, 860.19, 864.58, 871.61, 877.75], weeklyChange: 16.88, sortRank: 0, periodReturns: { '1M': 67.3, '6M': 281.2, '1Y': 810.7 },
      velocityScore: { '1D': -2.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$990B', pe: 41.4, revenueGrowth: 196, eps: 21.18, grossMargin: 58, dividendYield: 0.08,
      etfPresence: { SOXX: 9.51, PSI: 5.91, XSD: 2.71, DRAM: 4.86 },
      tonyNote: 'MICRON TECHNOLOGY INC appears in 4 of 4 Semiconductors ETFs (100% coverage) with average weight 5.8% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, proScore: 5.7, coverage: 0.75,
      price: 493.19, weeklyPrices: [478.39, 483.33, 485.79, 489.74, 493.19], weeklyChange: 5.49, sortRank: 0, periodReturns: { '1M': 47.4, '6M': 130.2, '1Y': 330.5 },
      velocityScore: { '1D': 0.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$804B', pe: 164.9, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 9.1, PSI: 7.19, XSD: 3.44, DRAM: false },
      tonyNote: 'ADVANCED MICRO DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 5.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION CORP', easyScore: 2, proScore: 3.76, coverage: 0.5,
      price: 122.03, weeklyPrices: [118.37, 119.59, 120.20, 121.18, 122.03], weeklyChange: 1.83, sortRank: 0, periodReturns: { '1M': 43.6, '6M': 231.5, '1Y': 493.8 },
      velocityScore: { '1D': -2.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$613B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.86, PSI: false, XSD: 3.77, DRAM: false },
      tonyNote: 'INTEL CORPORATION CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 3.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 3, proScore: 3.69, coverage: 0.75,
      price: 434.3, weeklyPrices: [421.27, 425.61, 427.79, 431.26, 434.30], weeklyChange: 4.87, sortRank: 0, periodReturns: { '1M': 3.8, '6M': 9.2, '1Y': 84.3 },
      velocityScore: { '1D': -1.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.1T', pe: 84.5, revenueGrowth: 30, eps: 5.14, grossMargin: 77, dividendYield: 0.63,
      etfPresence: { SOXX: 6.77, PSI: 4.18, XSD: 1.83, DRAM: false },
      tonyNote: 'BROADCOM INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, proScore: 3.4, coverage: 0.75,
      price: 217.06, weeklyPrices: [210.55, 212.72, 213.80, 215.54, 217.06], weeklyChange: 0.8, sortRank: 0, periodReturns: { '1M': 0.2, '6M': 20.4, '1Y': 60.2 },
      velocityScore: { '1D': -3.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.3T', pe: 33.3, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.02,
      etfPresence: { SOXX: 6.35, PSI: 3.67, XSD: 1.75, DRAM: false },
      tonyNote: 'NVIDIA CORP appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, proScore: 3.38, coverage: 0.5,
      price: 208.03, weeklyPrices: [201.79, 203.87, 204.91, 206.57, 208.03], weeklyChange: 5.96, sortRank: 0, periodReturns: { '1M': 31.5, '6M': 137.2, '1Y': 226 },
      velocityScore: { '1D': -0.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$182B', pe: 68, revenueGrowth: 22, eps: 3.06, grossMargin: 51, dividendYield: 0.12,
      etfPresence: { SOXX: 6.28, PSI: false, XSD: 3.28, DRAM: false },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 3.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 3, proScore: 3.16, coverage: 0.75,
      price: 324.84, weeklyPrices: [315.09, 318.34, 319.97, 322.57, 324.84], weeklyChange: 5.05, sortRank: 0, periodReturns: { '1M': 20.5, '6M': 96.5, '1Y': 77.3 },
      velocityScore: { '1D': 0.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$296B', pe: 55.6, revenueGrowth: 19, eps: 5.84, grossMargin: 57, dividendYield: 1.84,
      etfPresence: { SOXX: 3.81, PSI: 4.77, XSD: 2.35, DRAM: false },
      tonyNote: 'TEXAS INSTRUMENT INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, proScore: 2.93, coverage: 0.5,
      price: 453.03, weeklyPrices: [439.44, 443.97, 446.23, 449.86, 453.03], weeklyChange: 4.83, sortRank: 0, periodReturns: { '1M': 11.9, '6M': 81.2, '1Y': 179.9 },
      velocityScore: { '1D': -0.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$360B', pe: 42.6, revenueGrowth: 11, eps: 10.63, grossMargin: 49, dividendYield: 0.49,
      etfPresence: { SOXX: 4.52, PSI: 3.77, XSD: false, DRAM: false },
      tonyNote: 'APPLIED MATERIAL INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, proScore: 2.66, coverage: 0.5,
      price: 318.34, weeklyPrices: [308.79, 311.97, 313.56, 316.11, 318.34], weeklyChange: 4.25, sortRank: 0, periodReturns: { '1M': 22.7, '6M': 105.2, '1Y': 279.2 },
      velocityScore: { '1D': -0.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$398B', pe: 60.3, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.34,
      etfPresence: { SOXX: 3.41, PSI: 4.11, XSD: false, DRAM: false },
      tonyNote: 'LAM RESEARCH CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp/DE', easyScore: 1, proScore: 2.64, coverage: 0.25,
      price: 1606.28, weeklyPrices: [1558.09, 1574.15, 1582.19, 1595.04, 1606.28], weeklyChange: 8.63, sortRank: 0, periodReturns: { '1M': 50.1, '6M': 647, '1Y': 4107.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$238B', pe: 54.9, revenueGrowth: 251, eps: 29.28, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 5.28 },
      tonyNote: 'Sandisk Corp/DE appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, proScore: 2.61, coverage: 0.5,
      price: 1984.3, weeklyPrices: [1924.77, 1944.61, 1954.54, 1970.41, 1984.30], weeklyChange: 5.08, sortRank: 0, periodReturns: { '1M': 4.4, '6M': 71.2, '1Y': 151.5 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$259B', pe: 56.2, revenueGrowth: 12, eps: 35.31, grossMargin: 61, dividendYield: 0.49,
      etfPresence: { SOXX: 3.24, PSI: 4.14, XSD: false, DRAM: false },
      tonyNote: 'KLA CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, proScore: 2.49, coverage: 0.5,
      price: 244.67, weeklyPrices: [237.33, 239.78, 241.00, 242.96, 244.67], weeklyChange: 2.73, sortRank: 0, periodReturns: { '1M': 62.8, '6M': 48.2, '1Y': 64.6 },
      velocityScore: { '1D': 7.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$258B', pe: 26.3, revenueGrowth: -4, eps: 9.29, grossMargin: 55, dividendYield: 1.55,
      etfPresence: { SOXX: 4.37, PSI: false, XSD: 2.68, DRAM: false },
      tonyNote: 'QUALCOMM INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 1, proScore: 2.29, coverage: 0.25,
      price: 842.6, weeklyPrices: [817.32, 825.75, 829.96, 836.70, 842.60], weeklyChange: 3.68, sortRank: 0, periodReturns: { '1M': 41.4, '6M': 209.5, '1Y': 619.9 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$189B', pe: 79.7, revenueGrowth: 44, eps: 10.57, grossMargin: 42, dividendYield: 0.36,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 4.59 },
      tonyNote: 'Seagate Technology Holdings PLC appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, proScore: 2.13, coverage: 0.5,
      price: 329.96, weeklyPrices: [320.06, 323.36, 325.01, 327.65, 329.96], weeklyChange: 4.26, sortRank: 0, periodReturns: { '1M': 39.3, '6M': 70.3, '1Y': 65.9 },
      velocityScore: { '1D': 2.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$83B', pe: 31.5, revenueGrowth: 12, eps: 10.48, grossMargin: 56, dividendYield: 1.28,
      etfPresence: { SOXX: 3.64, PSI: false, XSD: 2.39, DRAM: false },
      tonyNote: 'NXP SEMICONDUCTORS NV appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, proScore: 2.11, coverage: 0.5,
      price: 311.3, weeklyPrices: [301.96, 305.07, 306.63, 309.12, 311.30], weeklyChange: 1.44, sortRank: 0, periodReturns: { '1M': 58.3, '6M': 101.9, '1Y': 219.2 },
      velocityScore: { '1D': -0.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$53B', pe: 211.8, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.25, PSI: false, XSD: 3.72, DRAM: false },
      tonyNote: 'ASTERA LABS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, proScore: 2.07, coverage: 0.5,
      price: 1702.17, weeklyPrices: [1651.10, 1668.13, 1676.64, 1690.25, 1702.17], weeklyChange: 7.06, sortRank: 0, periodReturns: { '1M': 7.2, '6M': 84, '1Y': 148.3 },
      velocityScore: { '1D': -1.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$84B', pe: 121.7, revenueGrowth: 26, eps: 13.99, grossMargin: 55, dividendYield: 0.5,
      etfPresence: { SOXX: 3.63, PSI: false, XSD: 2.24, DRAM: false },
      tonyNote: 'MONOLITHIC POWER SYSTEMS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSEM', name: 'Tower Semiconductor Ltd', easyScore: 1, proScore: 2.02, coverage: 0.25,
      price: 281.15, weeklyPrices: [272.72, 275.53, 276.93, 279.18, 281.15], weeklyChange: -0.8, sortRank: 0, periodReturns: { '1M': 38.3, '6M': 171.8, '1Y': 576.3 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$33B', pe: 130.8, revenueGrowth: 16, eps: 2.15, grossMargin: 25, dividendYield: null,
      etfPresence: { SOXX: false, PSI: 4.03, XSD: false, DRAM: false },
      tonyNote: 'Tower Semiconductor Ltd appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVTS', name: 'NAVITAS SEMICONDUCTOR CORP', easyScore: 1, proScore: 2.02, coverage: 0.25,
      price: 32.52, weeklyPrices: [31.54, 31.87, 32.03, 32.29, 32.52], weeklyChange: 11.17, sortRank: 0, periodReturns: { '1M': 77.7, '6M': 289.9, '1Y': 400.3 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$8B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: 4.04, DRAM: false },
      tonyNote: 'NAVITAS SEMICONDUCTOR CORP appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 1, proScore: 2, coverage: 0.25,
      price: 530.47, weeklyPrices: [514.56, 519.86, 522.51, 526.76, 530.47], weeklyChange: 9.54, sortRank: 0, periodReturns: { '1M': 32.4, '6M': 236.3, '1Y': 923.7 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$183B', pe: 31.7, revenueGrowth: 46, eps: 16.71, grossMargin: 45, dividendYield: 0.12,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 4.01 },
      tonyNote: 'Western Digital Corp appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'TSLA', name: 'Tesla Inc', easyScore: 2, proScore: 6.69, coverage: 0.286,
      price: 427.25, weeklyPrices: [414.43, 418.70, 420.84, 424.26, 427.25], weeklyChange: 0.29, sortRank: 0, periodReturns: { '1M': 12.8, '6M': 0.2, '1Y': 17.7 },
      velocityScore: { '1D': 0.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: 384.9, revenueGrowth: 16, eps: 1.11, grossMargin: 19, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: false, GTEK: false, ARKK: 10.73, MARS: false },
      tonyNote: 'Tesla Inc appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 6.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'Microsoft Corp', easyScore: 3, proScore: 5.76, coverage: 0.429,
      price: 419.6, weeklyPrices: [407.01, 411.21, 413.31, 416.66, 419.60], weeklyChange: 0.25, sortRank: 0, periodReturns: { '1M': -1.2, '6M': -13.6, '1Y': -8.9 },
      velocityScore: { '1D': -0.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.1T', pe: 25, revenueGrowth: 18, eps: 16.78, grossMargin: 68, dividendYield: 0.87,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: 8.06, FDTX: 4.06, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Microsoft Corp appears in 3 of 7 Broad Tech ETFs (43% coverage) with average weight 5.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab Corp', easyScore: 1, proScore: 5.34, coverage: 0.143,
      price: 143, weeklyPrices: [138.71, 140.14, 140.85, 142.00, 143.00], weeklyChange: 5.34, sortRank: 0, periodReturns: { '1M': 73.8, '6M': 241.1, '1Y': 397.2 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$83B', pe: null, revenueGrowth: 64, eps: -0.33, grossMargin: 37, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 14.14 },
      tonyNote: 'Rocket Lab Corp appears in 1 of 7 Broad Tech ETFs (14% coverage) with average weight 5.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC-CL A', easyScore: 2, proScore: 5.02, coverage: 0.286,
      price: 386.84, weeklyPrices: [375.23, 379.10, 381.04, 384.13, 386.84], weeklyChange: 1.01, sortRank: 0, periodReturns: { '1M': 10.4, '6M': 20.9, '1Y': 123.7 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.7T', pe: 29.5, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { QQQ: false, QQQA: 4.49, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ALPHABET INC-CL A appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 5.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 4, proScore: 4.82, coverage: 0.571,
      price: 217.06, weeklyPrices: [210.55, 212.72, 213.80, 215.54, 217.06], weeklyChange: 0.8, sortRank: 0, periodReturns: { '1M': 0.2, '6M': 20.4, '1Y': 60.2 },
      velocityScore: { '1D': -0.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.3T', pe: 33.3, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.02,
      etfPresence: { QQQ: false, QQQA: false, PTF: 4.7, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 5.27, GTEK: false, ARKK: 1.27, MARS: false },
      tonyNote: 'NVIDIA Corp appears in 4 of 7 Broad Tech ETFs (57% coverage) with average weight 4.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 3, proScore: 4.71, coverage: 0.429,
      price: 265.96, weeklyPrices: [257.98, 260.64, 261.97, 264.10, 265.96], weeklyChange: -0.14, sortRank: 0, periodReturns: { '1M': 1.9, '6M': 16.1, '1Y': 29.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 31.6, revenueGrowth: 17, eps: 8.42, grossMargin: 51, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 4.64, GTEK: false, ARKK: 2.66, MARS: false },
      tonyNote: 'Amazon.com Inc appears in 3 of 7 Broad Tech ETFs (43% coverage) with average weight 4.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AAPL', name: 'Apple Inc', easyScore: 3, proScore: 4.4, coverage: 0.429,
      price: 311.58, weeklyPrices: [302.23, 305.35, 306.91, 309.40, 311.58], weeklyChange: 0.89, sortRank: 0, periodReturns: { '1M': 16.4, '6M': 12.3, '1Y': 55.6 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.6T', pe: 37.8, revenueGrowth: 17, eps: 8.25, grossMargin: 48, dividendYield: 0.35,
      etfPresence: { QQQ: false, QQQA: false, PTF: 4.66, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 1.22, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Apple Inc appears in 3 of 7 Broad Tech ETFs (43% coverage) with average weight 4.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 3, proScore: 3.97, coverage: 0.429,
      price: 609.78, weeklyPrices: [591.49, 597.58, 600.63, 605.51, 609.78], weeklyChange: -0.08, sortRank: 0, periodReturns: { '1M': -10.1, '6M': -3.8, '1Y': -5.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 22.2, revenueGrowth: 33, eps: 27.52, grossMargin: 82, dividendYield: 0.34,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 3.31, GTEK: false, ARKK: 0.59, MARS: false },
      tonyNote: 'Meta Platforms Inc appears in 3 of 7 Broad Tech ETFs (43% coverage) with average weight 4.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, proScore: 3.57, coverage: 0.286,
      price: 208.03, weeklyPrices: [201.79, 203.87, 204.91, 206.57, 208.03], weeklyChange: 5.96, sortRank: 0, periodReturns: { '1M': 31.5, '6M': 137.2, '1Y': 226 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$182B', pe: 68, revenueGrowth: 22, eps: 3.06, grossMargin: 51, dividendYield: 0.12,
      etfPresence: { QQQ: false, QQQA: 5.68, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: 7.68, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 3.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 2, proScore: 3.32, coverage: 0.286,
      price: 493.19, weeklyPrices: [478.39, 483.33, 485.79, 489.74, 493.19], weeklyChange: 5.49, sortRank: 0, periodReturns: { '1M': 47.4, '6M': 130.2, '1Y': 330.5 },
      velocityScore: { '1D': 1.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$804B', pe: 164.9, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 7.09, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: 5.33, MARS: false },
      tonyNote: 'ADVANCED MICRO DEVICES appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 3.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile Inc', easyScore: 1, proScore: 3.27, coverage: 0.143,
      price: 123.4, weeklyPrices: [119.70, 120.93, 121.55, 122.54, 123.40], weeklyChange: 16.57, sortRank: 0, periodReturns: { '1M': 59.8, '6M': 122.3, '1Y': 396.8 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$48B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 8.66 },
      tonyNote: 'AST SpaceMobile Inc appears in 1 of 7 Broad Tech ETFs (14% coverage) with average weight 3.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ARM', name: 'ARM HOLDINGS PLC-ADR', easyScore: 1, proScore: 2.89, coverage: 0.143,
      price: 311.75, weeklyPrices: [302.40, 305.51, 307.07, 309.57, 311.75], weeklyChange: 1.71, sortRank: 0, periodReturns: { '1M': 44.4, '6M': 135.1, '1Y': 132.7 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$332B', pe: 362.5, revenueGrowth: 20, eps: 0.86, grossMargin: 98, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 7.65, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ARM HOLDINGS PLC-ADR appears in 1 of 7 Broad Tech ETFs (14% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 3, proScore: 2.86, coverage: 0.429,
      price: 135.53, weeklyPrices: [131.46, 132.82, 133.50, 134.58, 135.53], weeklyChange: -0.99, sortRank: 0, periodReturns: { '1M': -5.3, '6M': -18.2, '1Y': 9.8 },
      velocityScore: { '1D': -1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$325B', pe: 152.3, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 7.04, FDTX: 3.01, GTEK: false, ARKK: 3.04, MARS: false },
      tonyNote: 'PALANTIR TECHNOLOGIES INC CLASS A appears in 3 of 7 Broad Tech ETFs (43% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PANW', name: 'PALO ALTO NETWORKS INC', easyScore: 2, proScore: 2.77, coverage: 0.286,
      price: 253.69, weeklyPrices: [246.08, 248.62, 249.88, 251.91, 253.69], weeklyChange: -2.64, sortRank: 0, periodReturns: { '1M': 38.7, '6M': 36.9, '1Y': 35.3 },
      velocityScore: { '1D': 1.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$206B', pe: 140.9, revenueGrowth: 15, eps: 1.8, grossMargin: 74, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 7.59, FDTX: 2.76, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'PALO ALTO NETWORKS INC appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SATS', name: 'EchoStar Corp', easyScore: 1, proScore: 2.77, coverage: 0.143,
      price: 125.88, weeklyPrices: [122.10, 123.36, 123.99, 125.00, 125.88], weeklyChange: 1.35, sortRank: 0, periodReturns: { '1M': 3.5, '6M': 77.6, '1Y': 521.9 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$36B', pe: null, revenueGrowth: -5, eps: -50.21, grossMargin: 27, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 7.32 },
      tonyNote: 'EchoStar Corp appears in 1 of 7 Broad Tech ETFs (14% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'SEAGATE TECHNOLOGY HOLDINGS', easyScore: 3, proScore: 2.73, coverage: 0.429,
      price: 842.6, weeklyPrices: [817.32, 825.75, 829.96, 836.70, 842.60], weeklyChange: 3.68, sortRank: 0, periodReturns: { '1M': 41.4, '6M': 209.5, '1Y': 619.9 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$189B', pe: 79.7, revenueGrowth: 44, eps: 10.57, grossMargin: 42, dividendYield: 0.36,
      etfPresence: { QQQ: false, QQQA: 6.01, PTF: 4.49, WCLD: false, MAGS: false, IGV: false, FDTX: 2.02, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'SEAGATE TECHNOLOGY HOLDINGS appears in 3 of 7 Broad Tech ETFs (43% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORP', easyScore: 1, proScore: 2.7, coverage: 0.143,
      price: 122.03, weeklyPrices: [118.37, 119.59, 120.20, 121.18, 122.03], weeklyChange: 1.83, sortRank: 0, periodReturns: { '1M': 43.6, '6M': 231.5, '1Y': 493.8 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$613B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 7.14, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'INTEL CORP appears in 1 of 7 Broad Tech ETFs (14% coverage) with average weight 2.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 2, proScore: 2.64, coverage: 0.286,
      price: 194.74, weeklyPrices: [188.90, 190.85, 191.82, 193.38, 194.74], weeklyChange: 1.38, sortRank: 0, periodReturns: { '1M': 12.6, '6M': -5, '1Y': 20.3 },
      velocityScore: { '1D': -0.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$560B', pe: 35, revenueGrowth: 22, eps: 5.57, grossMargin: 67, dividendYield: 1.04,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 9.18, FDTX: 0.7, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ORACLE CORP appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp/DE', easyScore: 1, proScore: 2.62, coverage: 0.143,
      price: 1606.28, weeklyPrices: [1558.09, 1574.15, 1582.19, 1595.04, 1606.28], weeklyChange: 8.63, sortRank: 0, periodReturns: { '1M': 50.1, '6M': 647, '1Y': 4107.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$238B', pe: 54.9, revenueGrowth: 251, eps: 29.28, grossMargin: 56, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: 6.93, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Sandisk Corp/DE appears in 1 of 7 Broad Tech ETFs (14% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 2, proScore: 2.6, coverage: 0.286,
      price: 877.75, weeklyPrices: [851.42, 860.19, 864.58, 871.61, 877.75], weeklyChange: 16.88, sortRank: 0, periodReturns: { '1M': 67.3, '6M': 281.2, '1Y': 810.7 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$990B', pe: 41.4, revenueGrowth: 196, eps: 21.18, grossMargin: 58, dividendYield: 0.08,
      etfPresence: { QQQ: false, QQQA: false, PTF: 3.85, WCLD: false, MAGS: false, IGV: false, FDTX: 5.89, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Micron Technology Inc appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 2, proScore: 5.04, coverage: 0.5,
      price: 285.12, weeklyPrices: [276.57, 279.42, 280.84, 283.12, 285.12], weeklyChange: 2.11, sortRank: 0, periodReturns: { '1M': 9.4, '6M': 165.8, '1Y': 371.9 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 55.8, revenueGrowth: 7, eps: 5.11, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { POW: 6.16, VOLT: 8.09, PBD: false, PBW: false },
      tonyNote: 'Powell Industries Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 5.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 2, proScore: 3.67, coverage: 0.5,
      price: 741.59, weeklyPrices: [719.34, 726.76, 730.47, 736.40, 741.59], weeklyChange: 2.51, sortRank: 0, periodReturns: { '1M': 16.4, '6M': 61.1, '1Y': 116.6 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$111B', pe: 101.4, revenueGrowth: 26, eps: 7.31, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.79, VOLT: 5.6, PBD: false, PBW: false },
      tonyNote: 'Quanta Services Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 3.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, proScore: 3.64, coverage: 0.5,
      price: 278.5, weeklyPrices: [270.14, 272.93, 274.32, 276.55, 278.50], weeklyChange: 3.14, sortRank: 0, periodReturns: { '1M': 11, '6M': 82.4, '1Y': 276.8 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 66.9, revenueGrowth: 17, eps: 4.16, grossMargin: 39, dividendYield: 0.1,
      etfPresence: { POW: 3.12, VOLT: 7.18, PBD: false, PBW: false },
      tonyNote: 'Bel Fuse Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 3.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 2, proScore: 3.2, coverage: 0.5,
      price: 407.33, weeklyPrices: [395.11, 399.18, 401.22, 404.48, 407.33], weeklyChange: 4.08, sortRank: 0, periodReturns: { '1M': -2.3, '6M': 19.2, '1Y': 24.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$158B', pe: 39.9, revenueGrowth: 17, eps: 10.21, grossMargin: 37, dividendYield: 1.12,
      etfPresence: { POW: 3.85, VOLT: 5.19, PBD: false, PBW: false },
      tonyNote: 'Eaton Corp PLC appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 3.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 2, proScore: 2.75, coverage: 0.5,
      price: 1087.39, weeklyPrices: [1054.77, 1065.64, 1071.08, 1079.78, 1087.39], weeklyChange: 4.68, sortRank: 0, periodReturns: { '1M': -2.9, '6M': 84.4, '1Y': 130.6 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$292B', pe: 31.8, revenueGrowth: 16, eps: 34.17, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { POW: 3.5, VOLT: 4.27, PBD: false, PBW: false },
      tonyNote: 'GE Vernova Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 3, proScore: 2.5, coverage: 0.75,
      price: 310.03, weeklyPrices: [300.73, 303.83, 305.38, 307.86, 310.03], weeklyChange: 2.49, sortRank: 0, periodReturns: { '1M': 32.1, '6M': 206.5, '1Y': 1469 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$88B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: 4.7, PBD: 1.66, PBW: 2.3 },
      tonyNote: 'BLOOM ENERGY CORP appears in 3 of 4 Electrification ETFs (75% coverage) with average weight 2.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 2, proScore: 2.5, coverage: 0.5,
      price: 87.56, weeklyPrices: [84.93, 85.81, 86.25, 86.95, 87.56], weeklyChange: -1.12, sortRank: 0, periodReturns: { '1M': -7.7, '6M': 2.4, '1Y': 28.7 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$183B', pe: 22.2, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.82,
      etfPresence: { POW: 2.01, VOLT: 5.07, PBD: false, PBW: false },
      tonyNote: 'NextEra Energy Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 2, proScore: 2.41, coverage: 0.5,
      price: 169, weeklyPrices: [163.93, 165.62, 166.47, 167.82, 169.00], weeklyChange: 2.63, sortRank: 0, periodReturns: { '1M': 19.3, '6M': 58.6, '1Y': 152.5 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 57.3, revenueGrowth: 54, eps: 2.95, grossMargin: 37, dividendYield: 0.51,
      etfPresence: { POW: 3.75, VOLT: 3.08, PBD: false, PBW: false },
      tonyNote: 'nVent Electric PLC appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, proScore: 2.31, coverage: 0.25,
      price: 304.12, weeklyPrices: [295.00, 298.04, 299.56, 301.99, 304.12], weeklyChange: 13.48, sortRank: 0, periodReturns: { '1M': 13.2, '6M': 239.6, '1Y': 615.6 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$14B', pe: 101.4, revenueGrowth: 20, eps: 3, grossMargin: 54, dividendYield: null,
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
      price: 481.7, weeklyPrices: [467.25, 472.07, 474.47, 478.33, 481.70], weeklyChange: 1.41, sortRank: 0, periodReturns: { '1M': -13.3, '6M': 12.4, '1Y': 20.8 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 28.5, revenueGrowth: 11, eps: 16.91, grossMargin: 36, dividendYield: 1.2,
      etfPresence: { POW: 2.77, VOLT: 3.24, PBD: false, PBW: false },
      tonyNote: 'Hubbell Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FCEL', name: 'FuelCell Energy Inc', easyScore: 1, proScore: 2.05, coverage: 0.25,
      price: 27.18, weeklyPrices: [26.36, 26.64, 26.77, 26.99, 27.18], weeklyChange: 8.66, sortRank: 0, periodReturns: { '1M': 154.4, '6M': 336.9, '1Y': 370.2 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1B', pe: null, revenueGrowth: 61, eps: -6.49, grossMargin: -16, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 4.1 },
      tonyNote: 'FuelCell Energy Inc appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, proScore: 2.01, coverage: 0.5,
      price: 130.64, weeklyPrices: [126.72, 128.03, 128.68, 129.73, 130.64], weeklyChange: -0.72, sortRank: 0, periodReturns: { '1M': -3.3, '6M': 6.5, '1Y': 26.9 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$71B', pe: 19.3, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.89,
      etfPresence: { POW: 1.38, VOLT: 4.31, PBD: false, PBW: false },
      tonyNote: 'American Electric Power Co Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OGE', name: 'OGE ENERGY CORP', easyScore: 1, proScore: 1.91, coverage: 0.25,
      price: 48.12, weeklyPrices: [46.68, 47.16, 47.40, 47.78, 48.12], weeklyChange: -0.87, sortRank: 0, periodReturns: { '1M': 1.1, '6M': 5.8, '1Y': 8 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 21.4, revenueGrowth: 1, eps: 2.25, grossMargin: 44, dividendYield: 3.5,
      etfPresence: { POW: false, VOLT: 3.81, PBD: false, PBW: false },
      tonyNote: 'OGE ENERGY CORP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETR', name: 'ENTERGY CORP', easyScore: 1, proScore: 1.82, coverage: 0.25,
      price: 112.16, weeklyPrices: [108.80, 109.92, 110.48, 111.37, 112.16], weeklyChange: -0.21, sortRank: 0, periodReturns: { '1M': -1.1, '6M': 16.2, '1Y': 35.5 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$51B', pe: 28.6, revenueGrowth: 12, eps: 3.92, grossMargin: 47, dividendYield: 2.28,
      etfPresence: { POW: false, VOLT: 3.65, PBD: false, PBW: false },
      tonyNote: 'ENTERGY CORP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, proScore: 1.8, coverage: 0.5,
      price: 336.64, weeklyPrices: [326.54, 329.91, 331.59, 334.28, 336.64], weeklyChange: 3.63, sortRank: 0, periodReturns: { '1M': -12.7, '6M': 60.4, '1Y': 186.5 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 70, revenueGrowth: 26, eps: 4.81, grossMargin: 39, dividendYield: 0.12,
      etfPresence: { POW: 0.97, VOLT: 4.11, PBD: false, PBW: false },
      tonyNote: 'Advanced Energy Industries Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 1.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ET', name: 'ENERGY TRANSFER LP', easyScore: 1, proScore: 1.78, coverage: 0.25,
      price: 19.66, weeklyPrices: [19.07, 19.27, 19.37, 19.52, 19.66], weeklyChange: -2.07, sortRank: 0, periodReturns: { '1M': 3.2, '6M': 19.6, '1Y': 9.5 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$68B', pe: 16.4, revenueGrowth: 32, eps: 1.2, grossMargin: 19, dividendYield: 6.65,
      etfPresence: { POW: false, VOLT: 3.56, PBD: false, PBW: false },
      tonyNote: 'ENERGY TRANSFER LP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVTS', name: 'Navitas Semiconductor Corp', easyScore: 1, proScore: 1.75, coverage: 0.25,
      price: 32.52, weeklyPrices: [31.54, 31.87, 32.03, 32.29, 32.52], weeklyChange: 11.17, sortRank: 0, periodReturns: { '1M': 77.7, '6M': 289.9, '1Y': 400.3 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$8B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 3.51 },
      tonyNote: 'Navitas Semiconductor Corp appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HYLN', name: 'Hyliion Holdings Corp', easyScore: 1, proScore: 1.74, coverage: 0.25,
      price: 6.87, weeklyPrices: [6.66, 6.73, 6.77, 6.82, 6.87], weeklyChange: 14.61, sortRank: 0, periodReturns: { '1M': 273.1, '6M': 271.1, '1Y': 502.2 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1B', pe: null, revenueGrowth: 479, eps: -0.3, grossMargin: 6, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 3.47 },
      tonyNote: 'Hyliion Holdings Corp appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 1, proScore: 1.71, coverage: 0.25,
      price: 338.73, weeklyPrices: [328.57, 331.96, 333.65, 336.36, 338.73], weeklyChange: 3.44, sortRank: 0, periodReturns: { '1M': 5.1, '6M': 96.9, '1Y': 208.5 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$130B', pe: 84.7, revenueGrowth: 30, eps: 4, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 3.41, PBD: false, PBW: false },
      tonyNote: 'VERTIV HOLDINGS CO appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, proScore: 4.74, coverage: 1,
      price: 781, weeklyPrices: [757.57, 765.38, 769.28, 775.53, 781.00], weeklyChange: 6.56, sortRank: 0, periodReturns: { '1M': 54.5, '6M': 129.9, '1Y': 308 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$24B', pe: 69.7, revenueGrowth: 92, eps: 11.21, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 5.58, PRN: 3.9 },
      tonyNote: 'Sterling Infrastructure, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 4.7% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, proScore: 4.53, coverage: 1,
      price: 1906.49, weeklyPrices: [1849.30, 1868.36, 1877.89, 1893.14, 1906.49], weeklyChange: 4.28, sortRank: 0, periodReturns: { '1M': 6.3, '6M': 96.4, '1Y': 292.8 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$67B', pe: 55.2, revenueGrowth: 1, eps: 34.55, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: 4.34, PRN: 4.71 },
      tonyNote: 'Comfort Systems USA, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 4.5% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TTMI', name: 'TTM Technologies Inc', easyScore: 1, proScore: 4.34, coverage: 0.5,
      price: 195.5, weeklyPrices: [189.63, 191.59, 192.57, 194.13, 195.50], weeklyChange: 2.94, sortRank: 0, periodReturns: { '1M': 35.6, '6M': 186.3, '1Y': 556.5 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 106.3, revenueGrowth: 30, eps: 1.84, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 6.14 },
      tonyNote: 'TTM Technologies Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 4.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, proScore: 4.25, coverage: 1,
      price: 673.85, weeklyPrices: [653.63, 660.37, 663.74, 669.13, 673.85], weeklyChange: 2.67, sortRank: 0, periodReturns: { '1M': 2, '6M': 77, '1Y': 220.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 69.4, revenueGrowth: 13, eps: 9.71, grossMargin: 20, dividendYield: 0.3,
      etfPresence: { AIRR: 4.14, PRN: 4.37 },
      tonyNote: 'Argan, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 4.3% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 1, proScore: 3.48, coverage: 0.5,
      price: 50.01, weeklyPrices: [48.51, 49.01, 49.26, 49.66, 50.01], weeklyChange: 12.76, sortRank: 0, periodReturns: { '1M': 41.1, '6M': 326.7, '1Y': 1159.7 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: null, revenueGrowth: 41, eps: -0.8, grossMargin: 56, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 4.92 },
      tonyNote: 'Planet Labs PBC appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 1, proScore: 2.96, coverage: 0.5,
      price: 741.59, weeklyPrices: [719.34, 726.76, 730.47, 736.40, 741.59], weeklyChange: 2.51, sortRank: 0, periodReturns: { '1M': 16.4, '6M': 61.1, '1Y': 116.6 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$111B', pe: 101.4, revenueGrowth: 26, eps: 7.31, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { AIRR: false, PRN: 4.19 },
      tonyNote: 'Quanta Services Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JBL', name: 'Jabil Inc', easyScore: 1, proScore: 2.91, coverage: 0.5,
      price: 377.25, weeklyPrices: [365.93, 369.70, 371.59, 374.61, 377.25], weeklyChange: 3.54, sortRank: 0, periodReturns: { '1M': 10.7, '6M': 82, '1Y': 123 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$40B', pe: 50.8, revenueGrowth: 23, eps: 7.43, grossMargin: 9, dividendYield: 0.09,
      etfPresence: { AIRR: false, PRN: 4.12 },
      tonyNote: 'Jabil Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MTZ', name: 'MasTec, Inc.', easyScore: 1, proScore: 2.89, coverage: 0.5,
      price: 393.63, weeklyPrices: [381.82, 385.76, 387.73, 390.87, 393.63], weeklyChange: 3.01, sortRank: 0, periodReturns: { '1M': 2, '6M': 87, '1Y': 153.2 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$31B', pe: 69.2, revenueGrowth: 35, eps: 5.69, grossMargin: 13, dividendYield: null,
      etfPresence: { AIRR: 4.09, PRN: false },
      tonyNote: 'MasTec, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'EME', name: 'EMCOR Group, Inc.', easyScore: 1, proScore: 2.88, coverage: 0.5,
      price: 863.54, weeklyPrices: [837.63, 846.27, 850.59, 857.50, 863.54], weeklyChange: 1.72, sortRank: 0, periodReturns: { '1M': -2.5, '6M': 41.4, '1Y': 81.6 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$38B', pe: 29, revenueGrowth: 20, eps: 29.8, grossMargin: 19, dividendYield: 0.15,
      etfPresence: { AIRR: 4.08, PRN: false },
      tonyNote: 'EMCOR Group, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SAIA', name: 'Saia, Inc.', easyScore: 1, proScore: 2.88, coverage: 0.5,
      price: 469.41, weeklyPrices: [455.33, 460.02, 462.37, 466.12, 469.41], weeklyChange: 2.89, sortRank: 0, periodReturns: { '1M': 5.6, '6M': 68, '1Y': 70.7 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 49.2, revenueGrowth: 2, eps: 9.54, grossMargin: 24, dividendYield: null,
      etfPresence: { AIRR: 4.07, PRN: false },
      tonyNote: 'Saia, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CHRW', name: 'C.H. Robinson Worldwide, Inc.', easyScore: 1, proScore: 2.84, coverage: 0.5,
      price: 177.59, weeklyPrices: [172.26, 174.04, 174.93, 176.35, 177.59], weeklyChange: 1.93, sortRank: 0, periodReturns: { '1M': -5.7, '6M': 11.3, '1Y': 82.5 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$21B', pe: 35.9, revenueGrowth: -1, eps: 4.95, grossMargin: 9, dividendYield: 1.45,
      etfPresence: { AIRR: 4.02, PRN: false },
      tonyNote: 'C.H. Robinson Worldwide, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, proScore: 2.59, coverage: 0.5,
      price: 304.12, weeklyPrices: [295.00, 298.04, 299.56, 301.99, 304.12], weeklyChange: 13.48, sortRank: 0, periodReturns: { '1M': 13.2, '6M': 239.6, '1Y': 615.6 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$14B', pe: 101.4, revenueGrowth: 20, eps: 3, grossMargin: 54, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 3.66 },
      tonyNote: 'Vicor Corp appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 1, proScore: 2.33, coverage: 0.5,
      price: 205.47, weeklyPrices: [199.31, 201.36, 202.39, 204.03, 205.47], weeklyChange: 1.26, sortRank: 0, periodReturns: { '1M': -7.5, '6M': 15.3, '1Y': 67.9 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 54.8, revenueGrowth: 26, eps: 3.75, grossMargin: 23, dividendYield: 0.51,
      etfPresence: { AIRR: 3.29, PRN: false },
      tonyNote: 'BWX Technologies, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 1, proScore: 2.32, coverage: 0.5,
      price: 262.01, weeklyPrices: [254.15, 256.77, 258.08, 260.18, 262.01], weeklyChange: 2.13, sortRank: 0, periodReturns: { '1M': 8.4, '6M': 28, '1Y': 54.4 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$105B', pe: 60.8, revenueGrowth: 19, eps: 4.31, grossMargin: 35, dividendYield: 0.19,
      etfPresence: { AIRR: false, PRN: 3.28 },
      tonyNote: 'Howmet Aerospace Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DY', name: 'Dycom Industries, Inc.', easyScore: 1, proScore: 2.3, coverage: 0.5,
      price: 421.22, weeklyPrices: [408.58, 412.80, 414.90, 418.27, 421.22], weeklyChange: 2.44, sortRank: 0, periodReturns: { '1M': 1.3, '6M': 18.7, '1Y': 84.9 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 44.2, revenueGrowth: 34, eps: 9.54, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: 3.25, PRN: false },
      tonyNote: 'Dycom Industries, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 1, proScore: 2.29, coverage: 0.5,
      price: 902.95, weeklyPrices: [875.86, 884.89, 889.41, 896.63, 902.95], weeklyChange: 2.62, sortRank: 0, periodReturns: { '1M': 8.9, '6M': 57.4, '1Y': 156.9 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$416B', pe: 45, revenueGrowth: 22, eps: 20.06, grossMargin: 29, dividendYield: 0.69,
      etfPresence: { AIRR: false, PRN: 3.24 },
      tonyNote: 'Caterpillar Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OC', name: 'Owens Corning', easyScore: 1, proScore: 2.16, coverage: 0.5,
      price: 119.71, weeklyPrices: [116.12, 117.32, 117.91, 118.87, 119.71], weeklyChange: 1.95, sortRank: 0, periodReturns: { '1M': -4.6, '6M': 7.3, '1Y': -13.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: -10, eps: -4.74, grossMargin: 27, dividendYield: 2.52,
      etfPresence: { AIRR: 3.06, PRN: false },
      tonyNote: 'Owens Corning appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 1, proScore: 2.11, coverage: 0.5,
      price: 318.88, weeklyPrices: [309.31, 312.50, 314.10, 316.65, 318.88], weeklyChange: -0.55, sortRank: 0, periodReturns: { '1M': -11, '6M': 1.5, '1Y': 40 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 20.7, revenueGrowth: 13, eps: 15.39, grossMargin: 12, dividendYield: 1.72,
      etfPresence: { AIRR: 2.98, PRN: false },
      tonyNote: 'Huntington Ingalls Industries, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 1, proScore: 2.06, coverage: 0.5,
      price: 58.2, weeklyPrices: [56.45, 57.04, 57.33, 57.79, 58.20], weeklyChange: 3.6, sortRank: 0, periodReturns: { '1M': -7.9, '6M': -23.2, '1Y': 52.7 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 342.4, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.91, PRN: false },
      tonyNote: 'Kratos Defense & Security Solutions, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 1, proScore: 1.82, coverage: 0.5,
      price: 285.12, weeklyPrices: [276.57, 279.42, 280.84, 283.12, 285.12], weeklyChange: 2.11, sortRank: 0, periodReturns: { '1M': 9.4, '6M': 165.8, '1Y': 371.9 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 55.8, revenueGrowth: 7, eps: 5.11, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { AIRR: 2.58, PRN: false },
      tonyNote: 'Powell Industries, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 1.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
