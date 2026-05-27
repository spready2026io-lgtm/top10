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
export const SCAN_TIMESTAMP    = '2026-05-27T13:34:31.272Z';
export const SCAN_TIMESTAMP_NY = 'May 27, 2026 at 9:34 AM ET';
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
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 7, proScore: 6.04, coverage: 0.875,
      price: 948.85, weeklyPrices: [920.38, 929.87, 934.62, 942.21, 948.85], weeklyChange: 5.92, sortRank: 0, periodReturns: { '1M': 80.9, '6M': 312.1, '1Y': 884.5 },
      velocityScore: { '1D': 14.8, '1W': 14, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 44.7, revenueGrowth: 196, eps: 21.23, grossMargin: 58, dividendYield: 0.07,
      etfPresence: { AIS: 7.91, ARTY: 7.1, BAI: 5.02, IVEP: false, IGPT: 11.21, IVES: 6.98, ALAI: 1.14, CHAT: 5.86 },
      tonyNote: 'Micron Technology Inc appears in 7 of 8 AI & ML ETFs (88% coverage) with average weight 6.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 7, proScore: 5.48, coverage: 0.875,
      price: 211.4, weeklyPrices: [205.06, 207.17, 208.23, 209.92, 211.40], weeklyChange: -1.61, sortRank: 0, periodReturns: { '1M': -2.4, '6M': 17.3, '1Y': 56 },
      velocityScore: { '1D': -3.7, '1W': -5.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.1T', pe: 32.4, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { AIS: 2.59, ARTY: 3.76, BAI: 4.62, IVEP: false, IGPT: 5.95, IVES: 4.51, ALAI: 13.35, CHAT: 6.21 },
      tonyNote: 'NVIDIA Corp appears in 7 of 8 AI & ML ETFs (88% coverage) with average weight 5.5% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 7, proScore: 5.24, coverage: 0.875,
      price: 507.6, weeklyPrices: [492.37, 497.45, 499.99, 504.05, 507.60], weeklyChange: 0.74, sortRank: 0, periodReturns: { '1M': 51.7, '6M': 136.9, '1Y': 343.1 },
      velocityScore: { '1D': 3.8, '1W': 4.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$828B', pe: 168.1, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.63, ARTY: 7.67, BAI: 4.95, IVEP: false, IGPT: 7.27, IVES: 7.79, ALAI: 1.07, CHAT: 5.87 },
      tonyNote: 'Advanced Micro Devices Inc appears in 7 of 8 AI & ML ETFs (88% coverage) with average weight 5.2% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 4, proScore: 3.71, coverage: 0.5,
      price: 387.83, weeklyPrices: [376.20, 380.07, 382.01, 385.12, 387.83], weeklyChange: -0.27, sortRank: 0, periodReturns: { '1M': 10.7, '6M': 21.2, '1Y': 124.3 },
      velocityScore: { '1D': -2.1, '1W': -2.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.7T', pe: 29.6, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.76, IVEP: false, IGPT: 6.5, IVES: 4.7, ALAI: false, CHAT: 6 },
      tonyNote: 'ALPHABET INC CLASS A appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 3.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 6, proScore: 3.23, coverage: 0.75,
      price: 429.13, weeklyPrices: [416.26, 420.55, 422.69, 426.13, 429.13], weeklyChange: 1.69, sortRank: 0, periodReturns: { '1M': 2.6, '6M': 7.9, '1Y': 82.1 },
      velocityScore: { '1D': -0.9, '1W': -1.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.0T', pe: 83.3, revenueGrowth: 30, eps: 5.15, grossMargin: 77, dividendYield: 0.62,
      etfPresence: { AIS: 0.75, ARTY: 3.81, BAI: 5.21, IVEP: false, IGPT: false, IVES: 4.76, ALAI: 4.56, CHAT: 3.26 },
      tonyNote: 'Broadcom Inc appears in 6 of 8 AI & ML ETFs (75% coverage) with average weight 3.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 4, proScore: 3.03, coverage: 0.5,
      price: 428.11, weeklyPrices: [415.27, 419.55, 421.69, 425.11, 428.11], weeklyChange: 3.79, sortRank: 0, periodReturns: { '1M': 5.7, '6M': 47.6, '1Y': 116.6 },
      velocityScore: { '1D': -1, '1W': -1.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.2T', pe: 36.6, revenueGrowth: 35, eps: 11.71, grossMargin: 62, dividendYield: 0.92,
      etfPresence: { AIS: 3.14, ARTY: false, BAI: 4.17, IVEP: false, IGPT: false, IVES: 4.45, ALAI: 5.4, CHAT: false },
      tonyNote: 'Taiwan Semiconductor Manufacturing Co Ltd appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 3.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 3, proScore: 2.94, coverage: 0.375,
      price: 266.35, weeklyPrices: [258.36, 261.02, 262.35, 264.49, 266.35], weeklyChange: 0.4, sortRank: 0, periodReturns: { '1M': 2, '6M': 16.2, '1Y': 29.3 },
      velocityScore: { '1D': -2.6, '1W': -3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 31.8, revenueGrowth: 17, eps: 8.38, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.69, ALAI: 6.26, CHAT: 3.47 },
      tonyNote: 'AMAZON.COM INC appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 3, proScore: 2.85, coverage: 0.375,
      price: 122.72, weeklyPrices: [119.04, 120.27, 120.88, 121.86, 122.72], weeklyChange: -0.65, sortRank: 0, periodReturns: { '1M': 44.4, '6M': 233.4, '1Y': 497.2 },
      velocityScore: { '1D': -1.7, '1W': -1.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$617B', pe: null, revenueGrowth: 7, eps: -0.61, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.45, ARTY: false, BAI: 3.07, IVEP: false, IGPT: 7.42, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'Intel Corp appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 4, proScore: 2.67, coverage: 0.5,
      price: 609.88, weeklyPrices: [591.58, 597.68, 600.73, 605.61, 609.88], weeklyChange: -0.4, sortRank: 0, periodReturns: { '1M': -10.1, '6M': -3.7, '1Y': -5.1 },
      velocityScore: { '1D': -2.9, '1W': -2.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 22.2, revenueGrowth: 33, eps: 27.49, grossMargin: 82, dividendYield: 0.34,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: 4.87, IVES: 3.61, ALAI: 4.16, CHAT: 2.47 },
      tonyNote: 'Meta Platforms Inc appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, proScore: 2.5, coverage: 0.5,
      price: 411.46, weeklyPrices: [399.12, 403.23, 405.29, 408.58, 411.46], weeklyChange: -1.1, sortRank: 0, periodReturns: { '1M': -3.1, '6M': -15.3, '1Y': -10.7 },
      velocityScore: { '1D': -3.1, '1W': -3.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.1T', pe: 24.5, revenueGrowth: 18, eps: 16.81, grossMargin: 68, dividendYield: 0.87,
      etfPresence: { AIS: false, ARTY: 1.85, BAI: false, IVEP: false, IGPT: false, IVES: 3.92, ALAI: 5.36, CHAT: 3.03 },
      tonyNote: 'MICROSOFT CORP appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 3, proScore: 2.38, coverage: 0.375,
      price: 211.68, weeklyPrices: [205.33, 207.45, 208.50, 210.20, 211.68], weeklyChange: 1.64, sortRank: 0, periodReturns: { '1M': 33.8, '6M': 141.3, '1Y': 231.7 },
      velocityScore: { '1D': 1.7, '1W': 3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$185B', pe: 69.2, revenueGrowth: 22, eps: 3.06, grossMargin: 51, dividendYield: 0.12,
      etfPresence: { AIS: 3.37, ARTY: 6.91, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.38 },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 2.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc. Class C', easyScore: 1, proScore: 2.21, coverage: 0.125,
      price: 383.82, weeklyPrices: [372.31, 376.14, 378.06, 381.13, 383.82], weeklyChange: -0.27, sortRank: 0, periodReturns: { '1M': 10.1, '6M': 19.8, '1Y': 120.6 },
      velocityScore: { '1D': 0, '1W': -0.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.7T', pe: 29.3, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 6.25, CHAT: false },
      tonyNote: 'Alphabet Inc. Class C appears in 1 of 8 AI & ML ETFs (13% coverage) with average weight 2.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 4, proScore: 2.1, coverage: 0.5,
      price: 1031.39, weeklyPrices: [1000.45, 1010.76, 1015.92, 1024.17, 1031.39], weeklyChange: -3.75, sortRank: 0, periodReturns: { '1M': -7.9, '6M': 74.9, '1Y': 118.7 },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$277B', pe: 30.1, revenueGrowth: 16, eps: 34.26, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { AIS: 2.96, ARTY: false, BAI: false, IVEP: 4.09, IGPT: false, IVES: 3.62, ALAI: 1.23, CHAT: false },
      tonyNote: 'GE Vernova Inc appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 5, proScore: 2, coverage: 0.625,
      price: 541.47, weeklyPrices: [525.23, 530.64, 533.35, 537.68, 541.47], weeklyChange: 3.21, sortRank: 0, periodReturns: { '1M': 35.1, '6M': 243.3, '1Y': 944.9 },
      velocityScore: { '1D': 5.3, '1W': 4.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$187B', pe: 32.5, revenueGrowth: 46, eps: 16.68, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { AIS: 1.51, ARTY: 2.71, BAI: 2.76, IVEP: false, IGPT: false, IVES: false, ALAI: 4.49, CHAT: 1.16 },
      tonyNote: 'Western Digital Corp appears in 5 of 8 AI & ML ETFs (63% coverage) with average weight 2.0% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AAPL', name: 'APPLE INC', easyScore: 2, proScore: 1.96, coverage: 0.25,
      price: 311.06, weeklyPrices: [301.73, 304.84, 306.39, 308.88, 311.06], weeklyChange: 0.88, sortRank: 0, periodReturns: { '1M': 16.2, '6M': 12.1, '1Y': 55.4 },
      velocityScore: { '1D': -2, '1W': -1.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.6T', pe: 37.7, revenueGrowth: 17, eps: 8.26, grossMargin: 48, dividendYield: 0.35,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.64, ALAI: 3.19, CHAT: false },
      tonyNote: 'APPLE INC appears in 2 of 8 AI & ML ETFs (25% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NBIS', name: 'NEBIUS GROUP NV', easyScore: 3, proScore: 1.93, coverage: 0.375,
      price: 201.67, weeklyPrices: [195.62, 197.64, 198.64, 200.26, 201.67], weeklyChange: -3.07, sortRank: 0, periodReturns: { '1M': 39.1, '6M': 113, '1Y': 406.5 },
      velocityScore: { '1D': -4.9, '1W': -5.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$51B', pe: 78.2, revenueGrowth: 684, eps: 2.58, grossMargin: 72, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 2.86, ALAI: 4, CHAT: 2.58 },
      tonyNote: 'NEBIUS GROUP NV appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 1.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, proScore: 1.91, coverage: 0.5,
      price: 312.31, weeklyPrices: [302.94, 306.06, 307.63, 310.12, 312.31], weeklyChange: -3.62, sortRank: 0, periodReturns: { '1M': -3.1, '6M': 81.6, '1Y': 184.5 },
      velocityScore: { '1D': -4.5, '1W': -4.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$120B', pe: 78.5, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.91, ARTY: false, BAI: 1.96, IVEP: 4.05, IGPT: false, IVES: false, ALAI: false, CHAT: 0.91 },
      tonyNote: 'Vertiv Holdings Co appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, proScore: 1.91, coverage: 0.5,
      price: 884.55, weeklyPrices: [858.01, 866.86, 871.28, 878.36, 884.55], weeklyChange: 4.59, sortRank: 0, periodReturns: { '1M': 48.5, '6M': 224.9, '1Y': 655.7 },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$198B', pe: 83.7, revenueGrowth: 44, eps: 10.57, grossMargin: 42, dividendYield: 0.35,
      etfPresence: { AIS: 2.61, ARTY: 2.99, BAI: false, IVEP: false, IGPT: 3.19, IVES: false, ALAI: 1.99, CHAT: false },
      tonyNote: 'Seagate Technology Holdings PLC appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 3, proScore: 1.84, coverage: 0.375,
      price: 191.32, weeklyPrices: [185.58, 187.49, 188.45, 189.98, 191.32], weeklyChange: -0.8, sortRank: 0, periodReturns: { '1M': 10.6, '6M': -6.7, '1Y': 18.2 },
      velocityScore: { '1D': -2.1, '1W': -2.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$550B', pe: 34.3, revenueGrowth: 22, eps: 5.58, grossMargin: 67, dividendYield: 1.04,
      etfPresence: { AIS: false, ARTY: 3.92, BAI: false, IVEP: false, IGPT: false, IVES: 3.57, ALAI: false, CHAT: 1.51 },
      tonyNote: 'ORACLE CORP appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CLASS A CORP', easyScore: 2, proScore: 1.75, coverage: 0.25,
      price: 293.17, weeklyPrices: [284.37, 287.31, 288.77, 291.12, 293.17], weeklyChange: -3.06, sortRank: 0, periodReturns: { '1M': 24.9, '6M': 189.9, '1Y': 1383.7 },
      velocityScore: { '1D': -1.7, '1W': -2.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$83B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 1.69, BAI: false, IVEP: 5.3, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'BLOOM ENERGY CLASS A CORP appears in 2 of 8 AI & ML ETFs (25% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, proScore: 6.45, coverage: 1,
      price: 948.85, weeklyPrices: [920.38, 929.87, 934.62, 942.21, 948.85], weeklyChange: 5.92, sortRank: 0, periodReturns: { '1M': 80.9, '6M': 312.1, '1Y': 884.5 },
      velocityScore: { '1D': 12.2, '1W': 9.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 44.7, revenueGrowth: 196, eps: 21.23, grossMargin: 58, dividendYield: 0.07,
      etfPresence: { SOXX: 10.69, PSI: 6.7, XSD: 3.08, DRAM: 5.31 },
      tonyNote: 'MICRON TECHNOLOGY INC appears in 4 of 4 Semiconductors ETFs (100% coverage) with average weight 6.5% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, proScore: 5.82, coverage: 0.75,
      price: 507.6, weeklyPrices: [492.37, 497.45, 499.99, 504.05, 507.60], weeklyChange: 0.74, sortRank: 0, periodReturns: { '1M': 51.7, '6M': 136.9, '1Y': 343.1 },
      velocityScore: { '1D': 2.1, '1W': 2.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$828B', pe: 168.1, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 9.24, PSI: 7.37, XSD: 3.53, DRAM: false },
      tonyNote: 'ADVANCED MICRO DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 5.8% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MXL', name: 'MaxLinear Inc', easyScore: 2, proScore: 5.38, coverage: 0.5,
      price: 96.4, weeklyPrices: [93.51, 94.47, 94.95, 95.73, 96.40], weeklyChange: 0.29, sortRank: 0, periodReturns: { '1M': 86.6, '6M': 524.4, '1Y': 709.4 },
      velocityScore: { '1D': -7.7, '1W': -9.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: 43, eps: -1.52, grossMargin: 57, dividendYield: null,
      etfPresence: { SOXX: false, PSI: 8.98, XSD: 6.24, DRAM: false },
      tonyNote: 'MaxLinear Inc appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 5.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION CORP', easyScore: 2, proScore: 3.67, coverage: 0.5,
      price: 122.72, weeklyPrices: [119.04, 120.27, 120.88, 121.86, 122.72], weeklyChange: -0.65, sortRank: 0, periodReturns: { '1M': 44.4, '6M': 233.4, '1Y': 497.2 },
      velocityScore: { '1D': -2.4, '1W': -4.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$617B', pe: null, revenueGrowth: 7, eps: -0.61, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.66, PSI: false, XSD: 3.71, DRAM: false },
      tonyNote: 'INTEL CORPORATION CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 3.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 3, proScore: 3.56, coverage: 0.75,
      price: 429.13, weeklyPrices: [416.26, 420.55, 422.69, 426.13, 429.13], weeklyChange: 1.69, sortRank: 0, periodReturns: { '1M': 2.6, '6M': 7.9, '1Y': 82.1 },
      velocityScore: { '1D': -3.5, '1W': -5.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.0T', pe: 83.3, revenueGrowth: 30, eps: 5.15, grossMargin: 77, dividendYield: 0.62,
      etfPresence: { SOXX: 6.5, PSI: 4.05, XSD: 1.78, DRAM: false },
      tonyNote: 'BROADCOM INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.6% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, proScore: 3.39, coverage: 0.5,
      price: 211.68, weeklyPrices: [205.33, 207.45, 208.50, 210.20, 211.68], weeklyChange: 1.64, sortRank: 0, periodReturns: { '1M': 33.8, '6M': 141.3, '1Y': 231.7 },
      velocityScore: { '1D': 0.3, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$185B', pe: 69.2, revenueGrowth: 22, eps: 3.06, grossMargin: 51, dividendYield: 0.12,
      etfPresence: { SOXX: 6.27, PSI: false, XSD: 3.32, DRAM: false },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 3.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, proScore: 3.21, coverage: 0.75,
      price: 211.4, weeklyPrices: [205.06, 207.17, 208.23, 209.92, 211.40], weeklyChange: -1.61, sortRank: 0, periodReturns: { '1M': -2.4, '6M': 17.3, '1Y': 56 },
      velocityScore: { '1D': -5.6, '1W': -8.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.1T', pe: 32.4, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { SOXX: 5.97, PSI: 3.48, XSD: 1.66, DRAM: false },
      tonyNote: 'NVIDIA CORP appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 3, proScore: 3.14, coverage: 0.75,
      price: 326.91, weeklyPrices: [317.10, 320.37, 322.01, 324.62, 326.91], weeklyChange: 0.62, sortRank: 0, periodReturns: { '1M': 21.3, '6M': 97.7, '1Y': 78.4 },
      velocityScore: { '1D': -0.6, '1W': -0.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$298B', pe: 55.9, revenueGrowth: 19, eps: 5.85, grossMargin: 57, dividendYield: 1.75,
      etfPresence: { SOXX: 3.77, PSI: 4.76, XSD: 2.35, DRAM: false },
      tonyNote: 'TEXAS INSTRUMENT INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.1% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, proScore: 2.92, coverage: 0.5,
      price: 459.28, weeklyPrices: [445.50, 450.09, 452.39, 456.07, 459.28], weeklyChange: 0.97, sortRank: 0, periodReturns: { '1M': 13.4, '6M': 83.7, '1Y': 183.8 },
      velocityScore: { '1D': -0.3, '1W': -1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$365B', pe: 43.2, revenueGrowth: 11, eps: 10.64, grossMargin: 49, dividendYield: 0.47,
      etfPresence: { SOXX: 4.48, PSI: 3.77, XSD: false, DRAM: false },
      tonyNote: 'APPLIED MATERIAL INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, proScore: 2.66, coverage: 0.5,
      price: 329.73, weeklyPrices: [319.84, 323.14, 324.78, 327.42, 329.73], weeklyChange: 2.19, sortRank: 0, periodReturns: { '1M': 27.1, '6M': 112.5, '1Y': 292.8 },
      velocityScore: { '1D': 0, '1W': -0.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$412B', pe: 62.3, revenueGrowth: 24, eps: 5.29, grossMargin: 50, dividendYield: 0.32,
      etfPresence: { SOXX: 3.39, PSI: 4.13, XSD: false, DRAM: false },
      tonyNote: 'LAM RESEARCH CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, proScore: 2.63, coverage: 0.5,
      price: 2038.26, weeklyPrices: [1977.11, 1997.49, 2007.69, 2023.99, 2038.26], weeklyChange: 1.34, sortRank: 0, periodReturns: { '1M': 7.3, '6M': 75.9, '1Y': 158.3 },
      velocityScore: { '1D': 0.8, '1W': 0.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$266B', pe: 57.6, revenueGrowth: 12, eps: 35.4, grossMargin: 61, dividendYield: 0.46,
      etfPresence: { SOXX: 3.25, PSI: 4.19, XSD: false, DRAM: false },
      tonyNote: 'KLA CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp/DE', easyScore: 1, proScore: 2.6, coverage: 0.25,
      price: 1644.84, weeklyPrices: [1595.49, 1611.94, 1620.17, 1633.33, 1644.84], weeklyChange: 3.48, sortRank: 0, periodReturns: { '1M': 53.7, '6M': 664.9, '1Y': 4208.1 },
      velocityScore: { '1D': -1.5, '1W': -1.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$244B', pe: 56.2, revenueGrowth: 251, eps: 29.25, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 5.21 },
      tonyNote: 'Sandisk Corp/DE appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, proScore: 2.46, coverage: 0.5,
      price: 244.35, weeklyPrices: [237.02, 239.46, 240.68, 242.64, 244.35], weeklyChange: -1.8, sortRank: 0, periodReturns: { '1M': 62.6, '6M': 48, '1Y': 64.4 },
      velocityScore: { '1D': -1.2, '1W': 6.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$258B', pe: 26.2, revenueGrowth: -4, eps: 9.31, grossMargin: 55, dividendYield: 1.48,
      etfPresence: { SOXX: 4.3, PSI: false, XSD: 2.67, DRAM: false },
      tonyNote: 'QUALCOMM INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 1, proScore: 2.19, coverage: 0.25,
      price: 884.55, weeklyPrices: [858.01, 866.86, 871.28, 878.36, 884.55], weeklyChange: 4.59, sortRank: 0, periodReturns: { '1M': 48.5, '6M': 224.9, '1Y': 655.7 },
      velocityScore: { '1D': -4.4, '1W': -4.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$198B', pe: 83.7, revenueGrowth: 44, eps: 10.57, grossMargin: 42, dividendYield: 0.35,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 4.38 },
      tonyNote: 'Seagate Technology Holdings PLC appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, proScore: 2.12, coverage: 0.5,
      price: 335.09, weeklyPrices: [325.04, 328.39, 330.06, 332.74, 335.09], weeklyChange: 0.73, sortRank: 0, periodReturns: { '1M': 41.5, '6M': 72.9, '1Y': 68.5 },
      velocityScore: { '1D': -0.5, '1W': 1.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$85B', pe: 32.1, revenueGrowth: 12, eps: 10.45, grossMargin: 56, dividendYield: 1.22,
      etfPresence: { SOXX: 3.61, PSI: false, XSD: 2.39, DRAM: false },
      tonyNote: 'NXP SEMICONDUCTORS NV appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVTS', name: 'NAVITAS SEMICONDUCTOR CORP', easyScore: 1, proScore: 2.09, coverage: 0.25,
      price: 31.23, weeklyPrices: [30.29, 30.61, 30.76, 31.01, 31.23], weeklyChange: -1.75, sortRank: 0, periodReturns: { '1M': 70.7, '6M': 274.5, '1Y': 380.5 },
      velocityScore: { '1D': 3.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: 4.19, DRAM: false },
      tonyNote: 'NAVITAS SEMICONDUCTOR CORP appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, proScore: 2.08, coverage: 0.5,
      price: 322.02, weeklyPrices: [312.36, 315.58, 317.19, 319.77, 322.02], weeklyChange: 1.04, sortRank: 0, periodReturns: { '1M': 63.8, '6M': 108.8, '1Y': 230.1 },
      velocityScore: { '1D': -1.4, '1W': -2.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$55B', pe: 219.1, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.2, PSI: false, XSD: 3.68, DRAM: false },
      tonyNote: 'ASTERA LABS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, proScore: 2.05, coverage: 0.5,
      price: 1687.14, weeklyPrices: [1636.53, 1653.40, 1661.83, 1675.33, 1687.14], weeklyChange: 1.45, sortRank: 0, periodReturns: { '1M': 6.3, '6M': 82.4, '1Y': 146.1 },
      velocityScore: { '1D': -1, '1W': -2.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$83B', pe: 120.8, revenueGrowth: 26, eps: 13.97, grossMargin: 55, dividendYield: 0.48,
      etfPresence: { SOXX: 3.58, PSI: false, XSD: 2.23, DRAM: false },
      tonyNote: 'MONOLITHIC POWER SYSTEMS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 1, proScore: 1.99, coverage: 0.25,
      price: 541.47, weeklyPrices: [525.23, 530.64, 533.35, 537.68, 541.47], weeklyChange: 3.21, sortRank: 0, periodReturns: { '1M': 35.1, '6M': 243.3, '1Y': 944.9 },
      velocityScore: { '1D': -0.5, '1W': -0.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$187B', pe: 32.5, revenueGrowth: 46, eps: 16.68, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 3.98 },
      tonyNote: 'Western Digital Corp appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, proScore: 1.98, coverage: 0.5,
      price: 127.07, weeklyPrices: [123.26, 124.53, 125.16, 126.18, 127.07], weeklyChange: 0.06, sortRank: 0, periodReturns: { '1M': 29.6, '6M': 156, '1Y': 192.8 },
      velocityScore: { '1D': null, '1W': 5.9, '1M': null, '6M': null }, isNew: true,
      marketCap: '$49B', pe: 93.4, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.53, PSI: false, XSD: 3.08, DRAM: false },
      tonyNote: 'ON SEMICONDUCTOR CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'TSLA', name: 'TSLA', easyScore: 3, proScore: 5.22, coverage: 0.3,
      price: 441.33, weeklyPrices: [428.09, 432.50, 434.71, 438.24, 441.33], weeklyChange: 1.79, sortRank: 0, periodReturns: { '1M': 16.5, '6M': 3.5, '1Y': 21.6 },
      velocityScore: { '1D': 0.6, '1W': -21.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.7T', pe: 408.6, revenueGrowth: 16, eps: 1.08, grossMargin: 19, dividendYield: null,
      etfPresence: { QQQ: 3.47, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: false, GTEK: false, ARKK: 10.85, MARS: false },
      tonyNote: 'TSLA appears in 3 of 10 Broad Tech ETFs (30% coverage) with average weight 5.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MSFT', easyScore: 4, proScore: 4.97, coverage: 0.4,
      price: 411.46, weeklyPrices: [399.12, 403.23, 405.29, 408.58, 411.46], weeklyChange: -1.1, sortRank: 0, periodReturns: { '1M': -3.1, '6M': -15.3, '1Y': -10.7 },
      velocityScore: { '1D': -0.2, '1W': -14.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.1T', pe: 24.5, revenueGrowth: 18, eps: 16.81, grossMargin: 68, dividendYield: 0.87,
      etfPresence: { QQQ: 5.08, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: 8.01, FDTX: 4.06, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'MSFT appears in 4 of 10 Broad Tech ETFs (40% coverage) with average weight 5.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'NVDA', easyScore: 5, proScore: 4.78, coverage: 0.5,
      price: 211.4, weeklyPrices: [205.06, 207.17, 208.23, 209.92, 211.40], weeklyChange: -1.61, sortRank: 0, periodReturns: { '1M': -2.4, '6M': 17.3, '1Y': 56 },
      velocityScore: { '1D': -1.4, '1W': -1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.1T', pe: 32.4, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { QQQ: 8.55, QQQA: false, PTF: 4.46, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 5.27, GTEK: false, ARKK: 1.25, MARS: false },
      tonyNote: 'NVDA appears in 5 of 10 Broad Tech ETFs (50% coverage) with average weight 4.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab Corp', easyScore: 1, proScore: 4.43, coverage: 0.1,
      price: 146.16, weeklyPrices: [141.78, 143.24, 143.97, 145.14, 146.16], weeklyChange: 2.07, sortRank: 0, periodReturns: { '1M': 77.6, '6M': 248.6, '1Y': 408.2 },
      velocityScore: { '1D': -0.9, '1W': -17, '1M': null, '6M': null }, isNew: false,
      marketCap: '$85B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 14 },
      tonyNote: 'Rocket Lab Corp appears in 1 of 10 Broad Tech ETFs (10% coverage) with average weight 4.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AAPL', name: 'AAPL', easyScore: 4, proScore: 4.32, coverage: 0.4,
      price: 311.06, weeklyPrices: [301.73, 304.84, 306.39, 308.88, 311.06], weeklyChange: 0.88, sortRank: 0, periodReturns: { '1M': 16.2, '6M': 12.1, '1Y': 55.4 },
      velocityScore: { '1D': -0.7, '1W': -1.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.6T', pe: 37.7, revenueGrowth: 17, eps: 8.26, grossMargin: 48, dividendYield: 0.35,
      etfPresence: { QQQ: 7.41, QQQA: false, PTF: 4.42, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 1.22, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'AAPL appears in 4 of 10 Broad Tech ETFs (40% coverage) with average weight 4.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'AMZN', easyScore: 4, proScore: 4.15, coverage: 0.4,
      price: 266.35, weeklyPrices: [258.36, 261.02, 262.35, 264.49, 266.35], weeklyChange: 0.4, sortRank: 0, periodReturns: { '1M': 2, '6M': 16.2, '1Y': 29.3 },
      velocityScore: { '1D': -0.2, '1W': -11.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 31.8, revenueGrowth: 17, eps: 8.38, grossMargin: 51, dividendYield: null,
      etfPresence: { QQQ: 4.67, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 4.64, GTEK: false, ARKK: 2.63, MARS: false },
      tonyNote: 'AMZN appears in 4 of 10 Broad Tech ETFs (40% coverage) with average weight 4.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'GOOGL', easyScore: 3, proScore: 4.07, coverage: 0.3,
      price: 387.83, weeklyPrices: [376.20, 380.07, 382.01, 385.12, 387.83], weeklyChange: -0.27, sortRank: 0, periodReturns: { '1M': 10.7, '6M': 21.2, '1Y': 124.3 },
      velocityScore: { '1D': -0.7, '1W': -18.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.7T', pe: 29.6, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { QQQ: 3.64, QQQA: 4.39, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'GOOGL appears in 3 of 10 Broad Tech ETFs (30% coverage) with average weight 4.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'META', easyScore: 4, proScore: 3.34, coverage: 0.4,
      price: 609.88, weeklyPrices: [591.58, 597.68, 600.73, 605.61, 609.88], weeklyChange: -0.4, sortRank: 0, periodReturns: { '1M': -10.1, '6M': -3.7, '1Y': -5.1 },
      velocityScore: { '1D': 0, '1W': -15.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 22.2, revenueGrowth: 33, eps: 27.49, grossMargin: 82, dividendYield: 0.34,
      etfPresence: { QQQ: 2.94, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 3.31, GTEK: false, ARKK: 0.59, MARS: false },
      tonyNote: 'META appears in 4 of 10 Broad Tech ETFs (40% coverage) with average weight 3.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 3, proScore: 3.08, coverage: 0.3,
      price: 211.68, weeklyPrices: [205.33, 207.45, 208.50, 210.20, 211.68], weeklyChange: 1.64, sortRank: 0, periodReturns: { '1M': 33.8, '6M': 141.3, '1Y': 231.7 },
      velocityScore: { '1D': 1, '1W': -13.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$185B', pe: 69.2, revenueGrowth: 22, eps: 3.06, grossMargin: 51, dividendYield: 0.12,
      etfPresence: { QQQ: false, QQQA: 5.8, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: 7.68, GTEK: 3.37, ARKK: false, MARS: false },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 3 of 10 Broad Tech ETFs (30% coverage) with average weight 3.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'AMD', easyScore: 3, proScore: 3.01, coverage: 0.3,
      price: 507.6, weeklyPrices: [492.37, 497.45, 499.99, 504.05, 507.60], weeklyChange: 0.74, sortRank: 0, periodReturns: { '1M': 51.7, '6M': 136.9, '1Y': 343.1 },
      velocityScore: { '1D': 4.9, '1W': -8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$828B', pe: 168.1, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { QQQ: 3.44, QQQA: 7.36, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: 5.71, MARS: false },
      tonyNote: 'AMD appears in 3 of 10 Broad Tech ETFs (30% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile Inc', easyScore: 1, proScore: 2.91, coverage: 0.1,
      price: 120.6, weeklyPrices: [116.98, 118.19, 118.79, 119.76, 120.60], weeklyChange: 0.75, sortRank: 0, periodReturns: { '1M': 56.2, '6M': 117.2, '1Y': 385.5 },
      velocityScore: { '1D': 6.2, '1W': -11, '1M': null, '6M': null }, isNew: false,
      marketCap: '$47B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 9.19 },
      tonyNote: 'AST SpaceMobile Inc appears in 1 of 10 Broad Tech ETFs (10% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 3, proScore: 2.57, coverage: 0.3,
      price: 948.85, weeklyPrices: [920.38, 929.87, 934.62, 942.21, 948.85], weeklyChange: 5.92, sortRank: 0, periodReturns: { '1M': 80.9, '6M': 312.1, '1Y': 884.5 },
      velocityScore: { '1D': 3.2, '1W': -1.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 44.7, revenueGrowth: 196, eps: 21.23, grossMargin: 58, dividendYield: 0.07,
      etfPresence: { QQQ: 3.81, QQQA: false, PTF: 4.37, WCLD: false, MAGS: false, IGV: false, FDTX: 5.89, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'MU appears in 3 of 10 Broad Tech ETFs (30% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ARM', name: 'ARM HOLDINGS PLC-ADR', easyScore: 1, proScore: 2.44, coverage: 0.1,
      price: 320, weeklyPrices: [310.40, 313.60, 315.20, 317.76, 320.00], weeklyChange: -0.38, sortRank: 0, periodReturns: { '1M': 48.2, '6M': 141.3, '1Y': 138.9 },
      velocityScore: { '1D': 0.8, '1W': -15.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$340B', pe: 381, revenueGrowth: 20, eps: 0.84, grossMargin: 98, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 7.72, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ARM HOLDINGS PLC-ADR appears in 1 of 10 Broad Tech ETFs (10% coverage) with average weight 2.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'PLTR', easyScore: 4, proScore: 2.29, coverage: 0.4,
      price: 131.96, weeklyPrices: [128.00, 129.32, 129.98, 131.04, 131.96], weeklyChange: -3.4, sortRank: 0, periodReturns: { '1M': -7.8, '6M': -20.4, '1Y': 6.9 },
      velocityScore: { '1D': -0.4, '1W': -20.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$316B', pe: 148.3, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { QQQ: 1.42, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 7.02, FDTX: 3.01, GTEK: false, ARKK: 3.02, MARS: false },
      tonyNote: 'PLTR appears in 4 of 10 Broad Tech ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'SEAGATE TECHNOLOGY HOLDINGS', easyScore: 3, proScore: 2.28, coverage: 0.3,
      price: 884.55, weeklyPrices: [858.01, 866.86, 871.28, 878.36, 884.55], weeklyChange: 4.59, sortRank: 0, periodReturns: { '1M': 48.5, '6M': 224.9, '1Y': 655.7 },
      velocityScore: { '1D': -0.4, '1W': -16.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$198B', pe: 83.7, revenueGrowth: 44, eps: 10.57, grossMargin: 42, dividendYield: 0.35,
      etfPresence: { QQQ: false, QQQA: 6.02, PTF: 4.45, WCLD: false, MAGS: false, IGV: false, FDTX: 2.02, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'SEAGATE TECHNOLOGY HOLDINGS appears in 3 of 10 Broad Tech ETFs (30% coverage) with average weight 2.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 2, proScore: 2.22, coverage: 0.2,
      price: 191.32, weeklyPrices: [185.58, 187.49, 188.45, 189.98, 191.32], weeklyChange: -0.8, sortRank: 0, periodReturns: { '1M': 10.6, '6M': -6.7, '1Y': 18.2 },
      velocityScore: { '1D': 0.5, '1W': -16.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$550B', pe: 34.3, revenueGrowth: 22, eps: 5.58, grossMargin: 67, dividendYield: 1.04,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 9.22, FDTX: 0.7, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ORACLE CORP appears in 2 of 10 Broad Tech ETFs (20% coverage) with average weight 2.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'WESTERN DIGITAL CORP', easyScore: 3, proScore: 2.19, coverage: 0.3,
      price: 541.47, weeklyPrices: [525.23, 530.64, 533.35, 537.68, 541.47], weeklyChange: 3.21, sortRank: 0, periodReturns: { '1M': 35.1, '6M': 243.3, '1Y': 944.9 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$187B', pe: 32.5, revenueGrowth: 46, eps: 16.68, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { QQQ: false, QQQA: 5.47, PTF: 4.52, WCLD: false, MAGS: false, IGV: false, FDTX: 2.03, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'WESTERN DIGITAL CORP appears in 3 of 10 Broad Tech ETFs (30% coverage) with average weight 2.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'INTC', easyScore: 2, proScore: 2.19, coverage: 0.2,
      price: 122.72, weeklyPrices: [119.04, 120.27, 120.88, 121.86, 122.72], weeklyChange: -0.65, sortRank: 0, periodReturns: { '1M': 44.4, '6M': 233.4, '1Y': 497.2 },
      velocityScore: { '1D': -0.5, '1W': -18.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$617B', pe: null, revenueGrowth: 7, eps: -0.61, grossMargin: 37, dividendYield: null,
      etfPresence: { QQQ: 2.7, QQQA: 7.09, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'INTC appears in 2 of 10 Broad Tech ETFs (20% coverage) with average weight 2.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'APP', name: 'APPLOVIN CORP-CLASS A', easyScore: 2, proScore: 2.17, coverage: 0.2,
      price: 521.63, weeklyPrices: [505.98, 511.20, 513.81, 517.98, 521.63], weeklyChange: 1.44, sortRank: 0, periodReturns: { '1M': 13.3, '6M': -11, '1Y': 36.9 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$175B', pe: 45.3, revenueGrowth: 59, eps: 11.52, grossMargin: 88, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 4.7, PTF: false, WCLD: false, MAGS: false, IGV: 5.02, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'APPLOVIN CORP-CLASS A appears in 2 of 10 Broad Tech ETFs (20% coverage) with average weight 2.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PANW', name: 'PANW', easyScore: 4, proScore: 2.16, coverage: 0.4,
      price: 250.57, weeklyPrices: [243.05, 245.56, 246.81, 248.82, 250.57], weeklyChange: -2.41, sortRank: 0, periodReturns: { '1M': 37, '6M': 35.2, '1Y': 33.7 },
      velocityScore: { '1D': -7.7, '1W': -21.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$203B', pe: 139.2, revenueGrowth: 15, eps: 1.8, grossMargin: 74, dividendYield: null,
      etfPresence: { QQQ: 0.96, QQQA: false, PTF: false, WCLD: 2.46, MAGS: false, IGV: 7.48, FDTX: 2.76, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'PANW appears in 4 of 10 Broad Tech ETFs (40% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 2, proScore: 5.03, coverage: 0.5,
      price: 286.75, weeklyPrices: [278.15, 281.01, 282.45, 284.74, 286.75], weeklyChange: -1.79, sortRank: 0, periodReturns: { '1M': 10.1, '6M': 167.3, '1Y': 374.7 },
      velocityScore: { '1D': -0.2, '1W': -0.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 56.1, revenueGrowth: 7, eps: 5.11, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { POW: 6.21, VOLT: 8.02, PBD: false, PBW: false },
      tonyNote: 'Powell Industries Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 5.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 2, proScore: 3.67, coverage: 0.5,
      price: 734.22, weeklyPrices: [712.19, 719.54, 723.21, 729.08, 734.22], weeklyChange: -1.1, sortRank: 0, periodReturns: { '1M': 15.2, '6M': 59.5, '1Y': 114.5 },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$110B', pe: 101, revenueGrowth: 26, eps: 7.27, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.74, VOLT: 5.65, PBD: false, PBW: false },
      tonyNote: 'Quanta Services Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 3.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, proScore: 3.64, coverage: 0.5,
      price: 275.26, weeklyPrices: [267.00, 269.75, 271.13, 273.33, 275.26], weeklyChange: -0.36, sortRank: 0, periodReturns: { '1M': 9.7, '6M': 80.3, '1Y': 272.4 },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 66.5, revenueGrowth: 17, eps: 4.14, grossMargin: 39, dividendYield: 0.1,
      etfPresence: { POW: 3.07, VOLT: 7.22, PBD: false, PBW: false },
      tonyNote: 'Bel Fuse Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 3.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 2, proScore: 3.21, coverage: 0.5,
      price: 399.06, weeklyPrices: [387.09, 391.08, 393.07, 396.27, 399.06], weeklyChange: -1.03, sortRank: 0, periodReturns: { '1M': -4.2, '6M': 16.8, '1Y': 21.6 },
      velocityScore: { '1D': 0.3, '1W': 0.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$155B', pe: 39, revenueGrowth: 17, eps: 10.24, grossMargin: 37, dividendYield: 1.09,
      etfPresence: { POW: 3.83, VOLT: 5.25, PBD: false, PBW: false },
      tonyNote: 'Eaton Corp PLC appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 3.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, proScore: 2.77, coverage: 0.25,
      price: 350.83, weeklyPrices: [340.31, 343.81, 345.57, 348.37, 350.83], weeklyChange: 5.37, sortRank: 0, periodReturns: { '1M': 30.6, '6M': 291.8, '1Y': 725.5 },
      velocityScore: { '1D': 19.9, '1W': 19.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$16B', pe: 116.9, revenueGrowth: 20, eps: 3, grossMargin: 54, dividendYield: null,
      etfPresence: { POW: 5.54, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Vicor Corp appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 2, proScore: 2.76, coverage: 0.5,
      price: 1031.39, weeklyPrices: [1000.45, 1010.76, 1015.92, 1024.17, 1031.39], weeklyChange: -3.75, sortRank: 0, periodReturns: { '1M': -7.9, '6M': 74.9, '1Y': 118.7 },
      velocityScore: { '1D': 0.4, '1W': 0.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$277B', pe: 30.1, revenueGrowth: 16, eps: 34.26, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { POW: 3.48, VOLT: 4.33, PBD: false, PBW: false },
      tonyNote: 'GE Vernova Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 3, proScore: 2.44, coverage: 0.75,
      price: 293.17, weeklyPrices: [284.37, 287.31, 288.77, 291.12, 293.17], weeklyChange: -3.06, sortRank: 0, periodReturns: { '1M': 24.9, '6M': 189.9, '1Y': 1383.7 },
      velocityScore: { '1D': -2.4, '1W': -2.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$83B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: 4.62, PBD: 1.61, PBW: 2.22 },
      tonyNote: 'BLOOM ENERGY CORP appears in 3 of 4 Electrification ETFs (75% coverage) with average weight 2.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 2, proScore: 2.42, coverage: 0.5,
      price: 167.66, weeklyPrices: [162.63, 164.31, 165.15, 166.49, 167.66], weeklyChange: -0.95, sortRank: 0, periodReturns: { '1M': 18.3, '6M': 57.4, '1Y': 150.5 },
      velocityScore: { '1D': 0.4, '1W': 0.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 56.8, revenueGrowth: 54, eps: 2.95, grossMargin: 37, dividendYield: 0.5,
      etfPresence: { POW: 3.72, VOLT: 3.12, PBD: false, PBW: false },
      tonyNote: 'nVent Electric PLC appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PRY', name: 'Prysmian SpA', easyScore: 1, proScore: 2.14, coverage: 0.25,
      price: 0, weeklyPrices: [0.00, 0.00, 0.00, 0.00, 0.00], weeklyChange: 0, sortRank: 0, periodReturns: { '1M': 0, '6M': 0, '1Y': 0 },
      velocityScore: { '1D': -3.2, '1W': -3.2, '1M': null, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { POW: 4.28, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Prysmian SpA appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 2.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 2, proScore: 2.09, coverage: 0.5,
      price: 479.37, weeklyPrices: [464.99, 469.78, 472.18, 476.01, 479.37], weeklyChange: 0.35, sortRank: 0, periodReturns: { '1M': -13.7, '6M': 11.9, '1Y': 20.2 },
      velocityScore: { '1D': -1.4, '1W': -1.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 28.3, revenueGrowth: 11, eps: 16.92, grossMargin: 36, dividendYield: 1.19,
      etfPresence: { POW: 2.69, VOLT: 3.21, PBD: false, PBW: false },
      tonyNote: 'Hubbell Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 2, proScore: 2.09, coverage: 0.5,
      price: 87.25, weeklyPrices: [84.63, 85.50, 85.94, 86.64, 87.25], weeklyChange: -0.45, sortRank: 0, periodReturns: { '1M': -8, '6M': 2, '1Y': 28.2 },
      velocityScore: { '1D': -16.4, '1W': -16.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$182B', pe: 22.1, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.84,
      etfPresence: { POW: 1.92, VOLT: 3.99, PBD: false, PBW: false },
      tonyNote: 'NextEra Energy Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, proScore: 1.96, coverage: 0.5,
      price: 129.4, weeklyPrices: [125.52, 126.81, 127.46, 128.49, 129.40], weeklyChange: -1.15, sortRank: 0, periodReturns: { '1M': -4.2, '6M': 5.4, '1Y': 25.7 },
      velocityScore: { '1D': -2.5, '1W': -2.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 19.2, revenueGrowth: 10, eps: 6.75, grossMargin: 47, dividendYield: 2.9,
      etfPresence: { POW: 1.32, VOLT: 4.21, PBD: false, PBW: false },
      tonyNote: 'American Electric Power Co Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FCEL', name: 'FuelCell Energy Inc', easyScore: 1, proScore: 1.93, coverage: 0.25,
      price: 23, weeklyPrices: [22.31, 22.54, 22.66, 22.84, 23.00], weeklyChange: -5.74, sortRank: 0, periodReturns: { '1M': 115.4, '6M': 269.8, '1Y': 297.9 },
      velocityScore: { '1D': -5.9, '1W': -5.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1B', pe: null, revenueGrowth: 61, eps: -6.49, grossMargin: -16, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 3.86 },
      tonyNote: 'FuelCell Energy Inc appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OGE', name: 'OGE ENERGY CORP', easyScore: 1, proScore: 1.87, coverage: 0.25,
      price: 47.94, weeklyPrices: [46.50, 46.98, 47.22, 47.60, 47.94], weeklyChange: -0.96, sortRank: 0, periodReturns: { '1M': 0.7, '6M': 5.4, '1Y': 7.6 },
      velocityScore: { '1D': -2.1, '1W': -2.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 21.3, revenueGrowth: 1, eps: 2.25, grossMargin: 44, dividendYield: 3.51,
      etfPresence: { POW: false, VOLT: 3.74, PBD: false, PBW: false },
      tonyNote: 'OGE ENERGY CORP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, proScore: 1.84, coverage: 0.5,
      price: 334.75, weeklyPrices: [324.71, 328.06, 329.73, 332.41, 334.75], weeklyChange: -1.44, sortRank: 0, periodReturns: { '1M': -13.2, '6M': 59.5, '1Y': 184.9 },
      velocityScore: { '1D': 2.2, '1W': 2.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 69.4, revenueGrowth: 26, eps: 4.82, grossMargin: 39, dividendYield: 0.12,
      etfPresence: { POW: 0.98, VOLT: 4.23, PBD: false, PBW: false },
      tonyNote: 'Advanced Energy Industries Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 1.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HYLN', name: 'Hyliion Holdings Corp', easyScore: 1, proScore: 1.84, coverage: 0.25,
      price: 6.34, weeklyPrices: [6.15, 6.21, 6.24, 6.30, 6.34], weeklyChange: -3.98, sortRank: 0, periodReturns: { '1M': 244.6, '6M': 242.7, '1Y': 456.2 },
      velocityScore: { '1D': 5.7, '1W': 5.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1B', pe: null, revenueGrowth: 479, eps: -0.3, grossMargin: 6, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 3.69 },
      tonyNote: 'Hyliion Holdings Corp appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVTS', name: 'Navitas Semiconductor Corp', easyScore: 1, proScore: 1.83, coverage: 0.25,
      price: 31.23, weeklyPrices: [30.29, 30.61, 30.76, 31.01, 31.23], weeklyChange: -1.75, sortRank: 0, periodReturns: { '1M': 70.7, '6M': 274.5, '1Y': 380.5 },
      velocityScore: { '1D': 4.6, '1W': 4.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 3.67 },
      tonyNote: 'Navitas Semiconductor Corp appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETR', name: 'ENTERGY CORP', easyScore: 1, proScore: 1.79, coverage: 0.25,
      price: 110.49, weeklyPrices: [107.18, 108.28, 108.83, 109.72, 110.49], weeklyChange: -1.31, sortRank: 0, periodReturns: { '1M': -2.6, '6M': 14.4, '1Y': 33.5 },
      velocityScore: { '1D': -1.6, '1W': -1.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$51B', pe: 28.2, revenueGrowth: 12, eps: 3.92, grossMargin: 47, dividendYield: 2.29,
      etfPresence: { POW: false, VOLT: 3.58, PBD: false, PBW: false },
      tonyNote: 'ENTERGY CORP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MOD', name: 'MODINE MANUFACTURING CO', easyScore: 1, proScore: 1.74, coverage: 0.25,
      price: 300.07, weeklyPrices: [291.07, 294.07, 295.57, 297.97, 300.07], weeklyChange: 1.41, sortRank: 0, periodReturns: { '1M': 22.5, '6M': 88.8, '1Y': 224.6 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$16B', pe: 164, revenueGrowth: 48, eps: 1.83, grossMargin: 23, dividendYield: null,
      etfPresence: { POW: false, VOLT: 3.47, PBD: false, PBW: false },
      tonyNote: 'MODINE MANUFACTURING CO appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ET', name: 'ENERGY TRANSFER LP', easyScore: 1, proScore: 1.71, coverage: 0.25,
      price: 19.41, weeklyPrices: [18.83, 19.02, 19.12, 19.27, 19.41], weeklyChange: -0.97, sortRank: 0, periodReturns: { '1M': 1.9, '6M': 18.1, '1Y': 8.1 },
      velocityScore: { '1D': -3.9, '1W': -3.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$67B', pe: 16.2, revenueGrowth: 32, eps: 1.2, grossMargin: 19, dividendYield: 6.81,
      etfPresence: { POW: false, VOLT: 3.42, PBD: false, PBW: false },
      tonyNote: 'ENERGY TRANSFER LP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, proScore: 4.91, coverage: 1,
      price: 781.84, weeklyPrices: [758.38, 766.20, 770.11, 776.37, 781.84], weeklyChange: -0.22, sortRank: 0, periodReturns: { '1M': 54.7, '6M': 130.1, '1Y': 308.4 },
      velocityScore: { '1D': 3.6, '1W': 3.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$24B', pe: 69.8, revenueGrowth: 92, eps: 11.2, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 5.81, PRN: 4.01 },
      tonyNote: 'Sterling Infrastructure, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 4.9% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, proScore: 4.52, coverage: 1,
      price: 1866.5, weeklyPrices: [1810.50, 1829.17, 1838.50, 1853.43, 1866.50], weeklyChange: -0.95, sortRank: 0, periodReturns: { '1M': 4, '6M': 92.2, '1Y': 284.5 },
      velocityScore: { '1D': -0.2, '1W': -0.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 53.9, revenueGrowth: 1, eps: 34.66, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: 4.36, PRN: 4.67 },
      tonyNote: 'Comfort Systems USA, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 4.5% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TTMI', name: 'TTM Technologies Inc', easyScore: 1, proScore: 4.33, coverage: 0.5,
      price: 185.98, weeklyPrices: [180.40, 182.26, 183.19, 184.68, 185.98], weeklyChange: -5.57, sortRank: 0, periodReturns: { '1M': 29, '6M': 172.3, '1Y': 524.5 },
      velocityScore: { '1D': -0.2, '1W': -0.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 101.6, revenueGrowth: 30, eps: 1.83, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 6.13 },
      tonyNote: 'TTM Technologies Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 4.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, proScore: 4.21, coverage: 1,
      price: 675.26, weeklyPrices: [655.00, 661.75, 665.13, 670.53, 675.26], weeklyChange: 0.6, sortRank: 0, periodReturns: { '1M': 2.2, '6M': 77.4, '1Y': 220.8 },
      velocityScore: { '1D': -0.9, '1W': -0.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 69.5, revenueGrowth: 13, eps: 9.72, grossMargin: 20, dividendYield: 0.3,
      etfPresence: { AIRR: 4.12, PRN: 4.3 },
      tonyNote: 'Argan, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 4.2% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 1, proScore: 3.64, coverage: 0.5,
      price: 48.92, weeklyPrices: [47.45, 47.94, 48.19, 48.58, 48.92], weeklyChange: 1.26, sortRank: 0, periodReturns: { '1M': 38, '6M': 317.4, '1Y': 1132.2 },
      velocityScore: { '1D': 4.6, '1W': 4.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$17B', pe: null, revenueGrowth: 41, eps: -0.8, grossMargin: 56, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 5.15 },
      tonyNote: 'Planet Labs PBC appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, proScore: 3.09, coverage: 0.5,
      price: 350.83, weeklyPrices: [340.31, 343.81, 345.57, 348.37, 350.83], weeklyChange: 5.37, sortRank: 0, periodReturns: { '1M': 30.6, '6M': 291.8, '1Y': 725.5 },
      velocityScore: { '1D': 19.3, '1W': 19.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$16B', pe: 116.9, revenueGrowth: 20, eps: 3, grossMargin: 54, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 4.37 },
      tonyNote: 'Vicor Corp appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 1, proScore: 2.92, coverage: 0.5,
      price: 734.22, weeklyPrices: [712.19, 719.54, 723.21, 729.08, 734.22], weeklyChange: -1.1, sortRank: 0, periodReturns: { '1M': 15.2, '6M': 59.5, '1Y': 114.5 },
      velocityScore: { '1D': -1.4, '1W': -1.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$110B', pe: 101, revenueGrowth: 26, eps: 7.27, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { AIRR: false, PRN: 4.13 },
      tonyNote: 'Quanta Services Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JBL', name: 'Jabil Inc', easyScore: 1, proScore: 2.92, coverage: 0.5,
      price: 374, weeklyPrices: [362.78, 366.52, 368.39, 371.38, 374.00], weeklyChange: -1.71, sortRank: 0, periodReturns: { '1M': 9.7, '6M': 80.5, '1Y': 121.1 },
      velocityScore: { '1D': 0.3, '1W': 0.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$39B', pe: 50.5, revenueGrowth: 23, eps: 7.41, grossMargin: 9, dividendYield: 0.08,
      etfPresence: { AIRR: false, PRN: 4.13 },
      tonyNote: 'Jabil Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MTZ', name: 'MasTec, Inc.', easyScore: 1, proScore: 2.88, coverage: 0.5,
      price: 387.79, weeklyPrices: [376.16, 380.03, 381.97, 385.08, 387.79], weeklyChange: -0.77, sortRank: 0, periodReturns: { '1M': 0.5, '6M': 84.2, '1Y': 149.5 },
      velocityScore: { '1D': -0.3, '1W': -0.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$31B', pe: 68, revenueGrowth: 35, eps: 5.7, grossMargin: 13, dividendYield: null,
      etfPresence: { AIRR: 4.08, PRN: false },
      tonyNote: 'MasTec, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SAIA', name: 'Saia, Inc.', easyScore: 1, proScore: 2.88, coverage: 0.5,
      price: 479.14, weeklyPrices: [464.77, 469.56, 471.95, 475.79, 479.14], weeklyChange: 2.4, sortRank: 0, periodReturns: { '1M': 7.8, '6M': 71.4, '1Y': 74.2 },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 50.4, revenueGrowth: 2, eps: 9.5, grossMargin: 24, dividendYield: null,
      etfPresence: { AIRR: 4.08, PRN: false },
      tonyNote: 'Saia, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'EME', name: 'EMCOR Group, Inc.', easyScore: 1, proScore: 2.86, coverage: 0.5,
      price: 861, weeklyPrices: [835.17, 843.78, 848.09, 854.97, 861.00], weeklyChange: -0.03, sortRank: 0, periodReturns: { '1M': -2.8, '6M': 41, '1Y': 81 },
      velocityScore: { '1D': -0.7, '1W': -0.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$38B', pe: 28.9, revenueGrowth: 20, eps: 29.8, grossMargin: 19, dividendYield: 0.15,
      etfPresence: { AIRR: 4.04, PRN: false },
      tonyNote: 'EMCOR Group, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CHRW', name: 'C.H. Robinson Worldwide, Inc.', easyScore: 1, proScore: 2.83, coverage: 0.5,
      price: 179.59, weeklyPrices: [174.20, 176.00, 176.90, 178.33, 179.59], weeklyChange: 0.95, sortRank: 0, periodReturns: { '1M': -4.7, '6M': 12.6, '1Y': 84.6 },
      velocityScore: { '1D': -0.4, '1W': -0.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$21B', pe: 36.3, revenueGrowth: -1, eps: 4.95, grossMargin: 9, dividendYield: 1.42,
      etfPresence: { AIRR: 4, PRN: false },
      tonyNote: 'C.H. Robinson Worldwide, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 1, proScore: 2.29, coverage: 0.5,
      price: 203.06, weeklyPrices: [196.97, 199.00, 200.01, 201.64, 203.06], weeklyChange: -0.67, sortRank: 0, periodReturns: { '1M': -8.6, '6M': 14, '1Y': 66 },
      velocityScore: { '1D': -1.7, '1W': -1.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 54.3, revenueGrowth: 26, eps: 3.74, grossMargin: 23, dividendYield: 0.51,
      etfPresence: { AIRR: 3.24, PRN: false },
      tonyNote: 'BWX Technologies, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DY', name: 'Dycom Industries, Inc.', easyScore: 1, proScore: 2.29, coverage: 0.5,
      price: 556.7, weeklyPrices: [540.00, 545.57, 548.35, 552.80, 556.70], weeklyChange: 32.38, sortRank: 0, periodReturns: { '1M': 33.8, '6M': 56.8, '1Y': 144.4 },
      velocityScore: { '1D': -0.4, '1W': -0.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$17B', pe: 58.4, revenueGrowth: 34, eps: 9.54, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: 3.24, PRN: false },
      tonyNote: 'Dycom Industries, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 1, proScore: 2.28, coverage: 0.5,
      price: 260, weeklyPrices: [252.20, 254.80, 256.10, 258.18, 260.00], weeklyChange: -0.7, sortRank: 0, periodReturns: { '1M': 7.6, '6M': 27.1, '1Y': 53.2 },
      velocityScore: { '1D': -1.7, '1W': -1.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$104B', pe: 60.2, revenueGrowth: 19, eps: 4.32, grossMargin: 35, dividendYield: 0.18,
      etfPresence: { AIRR: false, PRN: 3.22 },
      tonyNote: 'Howmet Aerospace Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 1, proScore: 2.28, coverage: 0.5,
      price: 900.53, weeklyPrices: [873.51, 882.52, 887.02, 894.23, 900.53], weeklyChange: -0.9, sortRank: 0, periodReturns: { '1M': 8.7, '6M': 57, '1Y': 156.2 },
      velocityScore: { '1D': -0.4, '1W': -0.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$415B', pe: 44.8, revenueGrowth: 22, eps: 20.08, grossMargin: 29, dividendYield: 0.66,
      etfPresence: { AIRR: false, PRN: 3.22 },
      tonyNote: 'Caterpillar Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OC', name: 'Owens Corning', easyScore: 1, proScore: 2.16, coverage: 0.5,
      price: 122.04, weeklyPrices: [118.38, 119.60, 120.21, 121.19, 122.04], weeklyChange: 1.64, sortRank: 0, periodReturns: { '1M': -2.8, '6M': 9.4, '1Y': -11.4 },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: -10, eps: -4.74, grossMargin: 27, dividendYield: 2.47,
      etfPresence: { AIRR: 3.05, PRN: false },
      tonyNote: 'Owens Corning appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 1, proScore: 2.06, coverage: 0.5,
      price: 317.93, weeklyPrices: [308.39, 311.57, 313.16, 315.70, 317.93], weeklyChange: -0.94, sortRank: 0, periodReturns: { '1M': -11.3, '6M': 1.2, '1Y': 39.5 },
      velocityScore: { '1D': -2.4, '1W': -2.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 20.6, revenueGrowth: 13, eps: 15.41, grossMargin: 12, dividendYield: 1.72,
      etfPresence: { AIRR: 2.91, PRN: false },
      tonyNote: 'Huntington Ingalls Industries, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 1, proScore: 2.03, coverage: 0.5,
      price: 55.62, weeklyPrices: [53.95, 54.51, 54.79, 55.23, 55.62], weeklyChange: -2.08, sortRank: 0, periodReturns: { '1M': -11.9, '6M': -26.6, '1Y': 45.9 },
      velocityScore: { '1D': -1.5, '1W': -1.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 327.2, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.87, PRN: false },
      tonyNote: 'Kratos Defense & Security Solutions, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 1, proScore: 1.86, coverage: 0.5,
      price: 286.75, weeklyPrices: [278.15, 281.01, 282.45, 284.74, 286.75], weeklyChange: -1.79, sortRank: 0, periodReturns: { '1M': 10.1, '6M': 167.3, '1Y': 374.7 },
      velocityScore: { '1D': 2.2, '1W': 2.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 56.1, revenueGrowth: 7, eps: 5.11, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { AIRR: 2.63, PRN: false },
      tonyNote: 'Powell Industries, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
