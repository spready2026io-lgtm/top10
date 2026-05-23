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
export const SCAN_TIMESTAMP    = '2026-05-23T13:34:34.503Z';
export const SCAN_TIMESTAMP_NY = 'May 23, 2026 at 9:34 AM ET';
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
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 7, proScore: 5.8, coverage: 0.875,
      price: 215.33, weeklyPrices: [208.87, 211.02, 212.10, 213.82, 215.33], weeklyChange: -1.9, sortRank: 0, periodReturns: { '1M': 6.3, '6M': 20.4, '1Y': 64 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.2T', pe: 33, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.02,
      etfPresence: { AIS: 2.74, ARTY: 4.03, BAI: 5.42, IVEP: false, IGPT: 6.3, IVES: 4.61, ALAI: 13.84, CHAT: 6.44 },
      tonyNote: 'NVIDIA Corp appears in 7 of 8 AI & ML ETFs (88% coverage) with average weight 5.8% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 7, proScore: 5.3, coverage: 0.875,
      price: 751, weeklyPrices: [728.47, 735.98, 739.74, 745.74, 751.00], weeklyChange: -1.46, sortRank: 0, periodReturns: { '1M': 54.1, '6M': 262.2, '1Y': 704.3 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$847B', pe: 35.5, revenueGrowth: 196, eps: 21.18, grossMargin: 58, dividendYield: 0.08,
      etfPresence: { AIS: 7, ARTY: 6.34, BAI: 4.27, IVEP: false, IGPT: 9.93, IVES: 5.97, ALAI: 1.03, CHAT: 5.09 },
      tonyNote: 'Micron Technology Inc appears in 7 of 8 AI & ML ETFs (88% coverage) with average weight 5.3% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 7, proScore: 5.01, coverage: 0.875,
      price: 467.51, weeklyPrices: [453.48, 458.16, 460.50, 464.24, 467.51], weeklyChange: 3.99, sortRank: 0, periodReturns: { '1M': 54.1, '6M': 129.4, '1Y': 323.8 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$762B', pe: 156.4, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.54, ARTY: 7.18, BAI: 4.62, IVEP: false, IGPT: 7.13, IVES: 7.38, ALAI: 0.97, CHAT: 5.64 },
      tonyNote: 'Advanced Micro Devices Inc appears in 7 of 8 AI & ML ETFs (88% coverage) with average weight 5.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 4, proScore: 3.81, coverage: 0.5,
      price: 382.97, weeklyPrices: [371.48, 375.31, 377.23, 380.29, 382.97], weeklyChange: -1.21, sortRank: 0, periodReturns: { '1M': 12.9, '6M': 27.8, '1Y': 127.3 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.6T', pe: 29.2, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.92, IVEP: false, IGPT: 6.76, IVES: 4.73, ALAI: false, CHAT: 6.12 },
      tonyNote: 'ALPHABET INC CLASS A appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 3.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 6, proScore: 3.27, coverage: 0.75,
      price: 414.14, weeklyPrices: [401.72, 405.86, 407.93, 411.24, 414.14], weeklyChange: -0.1, sortRank: 0, periodReturns: { '1M': -2, '6M': 21.7, '1Y': 81.1 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.0T', pe: 80.6, revenueGrowth: 30, eps: 5.14, grossMargin: 77, dividendYield: 0.63,
      etfPresence: { AIS: 0.78, ARTY: 3.92, BAI: 5.36, IVEP: false, IGPT: false, IVES: 4.77, ALAI: 4.55, CHAT: 3.31 },
      tonyNote: 'Broadcom Inc appears in 6 of 8 AI & ML ETFs (75% coverage) with average weight 3.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 4, proScore: 3.08, coverage: 0.5,
      price: 404.52, weeklyPrices: [392.38, 396.43, 398.45, 401.69, 404.52], weeklyChange: -0.65, sortRank: 0, periodReturns: { '1M': 4.4, '6M': 47.1, '1Y': 110.7 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.1T', pe: 34.7, revenueGrowth: 35, eps: 11.65, grossMargin: 62, dividendYield: 0.94,
      etfPresence: { AIS: 3.25, ARTY: false, BAI: 4.31, IVEP: false, IGPT: false, IVES: 4.46, ALAI: 5.42, CHAT: false },
      tonyNote: 'Taiwan Semiconductor Manufacturing Co Ltd appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 3.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 3, proScore: 3.03, coverage: 0.375,
      price: 266.32, weeklyPrices: [258.33, 260.99, 262.33, 264.46, 266.32], weeklyChange: -0.8, sortRank: 0, periodReturns: { '1M': 4.3, '6M': 20.7, '1Y': 32.5 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 31.6, revenueGrowth: 17, eps: 8.42, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.81, ALAI: 6.43, CHAT: 3.6 },
      tonyNote: 'AMAZON.COM INC appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 3, proScore: 2.9, coverage: 0.375,
      price: 119.84, weeklyPrices: [116.24, 117.44, 118.04, 119.00, 119.84], weeklyChange: 1.13, sortRank: 0, periodReturns: { '1M': 83.6, '6M': 247.4, '1Y': 497.7 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$602B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.54, ARTY: false, BAI: 3.08, IVEP: false, IGPT: 7.6, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'Intel Corp appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 4, proScore: 2.75, coverage: 0.5,
      price: 610.26, weeklyPrices: [591.95, 598.05, 601.11, 605.99, 610.26], weeklyChange: 0.47, sortRank: 0, periodReturns: { '1M': -9.6, '6M': 2.7, '1Y': -2.7 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 22.2, revenueGrowth: 33, eps: 27.52, grossMargin: 82, dividendYield: 0.34,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: 5.12, IVES: 3.68, ALAI: 4.19, CHAT: 2.55 },
      tonyNote: 'Meta Platforms Inc appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, proScore: 2.59, coverage: 0.5,
      price: 418.57, weeklyPrices: [406.01, 410.20, 412.29, 415.64, 418.57], weeklyChange: -0.12, sortRank: 0, periodReturns: { '1M': -3.3, '6M': -11.3, '1Y': -7 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.1T', pe: 24.9, revenueGrowth: 18, eps: 16.78, grossMargin: 68, dividendYield: 0.87,
      etfPresence: { AIS: false, ARTY: 1.96, BAI: false, IVEP: false, IGPT: false, IVES: 4.03, ALAI: 5.49, CHAT: 3.16 },
      tonyNote: 'MICROSOFT CORP appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 3, proScore: 2.31, coverage: 0.375,
      price: 196.33, weeklyPrices: [190.44, 192.40, 193.39, 194.96, 196.33], weeklyChange: 2.96, sortRank: 0, periodReturns: { '1M': 24.8, '6M': 153.5, '1Y': 223.5 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$172B', pe: 64.2, revenueGrowth: 22, eps: 3.06, grossMargin: 51, dividendYield: 0.12,
      etfPresence: { AIS: 3.35, ARTY: 6.64, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.34 },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 2.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc. Class C', easyScore: 1, proScore: 2.23, coverage: 0.125,
      price: 379.38, weeklyPrices: [368.00, 371.79, 373.69, 376.72, 379.38], weeklyChange: -1.07, sortRank: 0, periodReturns: { '1M': 12.3, '6M': 26.6, '1Y': 123.7 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.6T', pe: 28.9, revenueGrowth: 22, eps: 13.13, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 6.32, CHAT: false },
      tonyNote: 'Alphabet Inc. Class C appears in 1 of 8 AI & ML ETFs (13% coverage) with average weight 2.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 4, proScore: 2.1, coverage: 0.5,
      price: 1038.74, weeklyPrices: [1007.58, 1017.97, 1023.16, 1031.47, 1038.74], weeklyChange: -0.49, sortRank: 0, periodReturns: { '1M': -7.9, '6M': 86.9, '1Y': 123.7 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$279B', pe: 30.4, revenueGrowth: 16, eps: 34.17, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { AIS: 3.03, ARTY: false, BAI: false, IVEP: 4.03, IGPT: false, IVES: 3.59, ALAI: 1.22, CHAT: false },
      tonyNote: 'GE Vernova Inc appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NBIS', name: 'NEBIUS GROUP NV', easyScore: 3, proScore: 2.05, coverage: 0.375,
      price: 214.77, weeklyPrices: [208.33, 210.47, 211.55, 213.27, 214.77], weeklyChange: -2.35, sortRank: 0, periodReturns: { '1M': 37.5, '6M': 158, '1Y': 456.5 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$55B', pe: 82.6, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 3.02, ALAI: 4.29, CHAT: 2.75 },
      tonyNote: 'NEBIUS GROUP NV appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, proScore: 2, coverage: 0.5,
      price: 327.46, weeklyPrices: [317.64, 320.91, 322.55, 325.17, 327.46], weeklyChange: 1.26, sortRank: 0, periodReturns: { '1M': 7.3, '6M': 104.9, '1Y': 214.4 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$126B', pe: 81.9, revenueGrowth: 30, eps: 4, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 4.17, ARTY: false, BAI: 2.02, IVEP: 4.15, IGPT: false, IVES: false, ALAI: false, CHAT: 0.95 },
      tonyNote: 'Vertiv Holdings Co appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AAPL', name: 'APPLE INC', easyScore: 2, proScore: 1.99, coverage: 0.25,
      price: 308.82, weeklyPrices: [299.56, 302.64, 304.19, 306.66, 308.82], weeklyChange: 1.26, sortRank: 0, periodReturns: { '1M': 13.1, '6M': 13.8, '1Y': 58.2 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.5T', pe: 37.4, revenueGrowth: 17, eps: 8.25, grossMargin: 48, dividendYield: 0.35,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.74, ALAI: 3.2, CHAT: false },
      tonyNote: 'APPLE INC appears in 2 of 8 AI & ML ETFs (25% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 5, proScore: 1.92, coverage: 0.625,
      price: 484.28, weeklyPrices: [469.75, 474.59, 477.02, 480.89, 484.28], weeklyChange: -0.45, sortRank: 0, periodReturns: { '1M': 24.5, '6M': 247.9, '1Y': 865.1 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$167B', pe: 29, revenueGrowth: 46, eps: 16.71, grossMargin: 45, dividendYield: 0.12,
      etfPresence: { AIS: 1.47, ARTY: 2.64, BAI: 2.68, IVEP: false, IGPT: false, IVES: false, ALAI: 4.22, CHAT: 1.11 },
      tonyNote: 'Western Digital Corp appears in 5 of 8 AI & ML ETFs (63% coverage) with average weight 1.9% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, proScore: 1.91, coverage: 0.5,
      price: 812.73, weeklyPrices: [788.35, 796.48, 800.54, 807.04, 812.73], weeklyChange: 0.28, sortRank: 0, periodReturns: { '1M': 40.2, '6M': 242.2, '1Y': 620.9 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$182B', pe: 76.9, revenueGrowth: 44, eps: 10.57, grossMargin: 42, dividendYield: 0.36,
      etfPresence: { AIS: 2.65, ARTY: 3, BAI: false, IVEP: false, IGPT: 3.24, IVES: false, ALAI: 1.94, CHAT: false },
      tonyNote: 'Seagate Technology Holdings PLC appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 3, proScore: 1.88, coverage: 0.375,
      price: 192.08, weeklyPrices: [186.32, 188.24, 189.20, 190.74, 192.08], weeklyChange: 1.22, sortRank: 0, periodReturns: { '1M': 2.4, '6M': -3.4, '1Y': 23.2 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$552B', pe: 34.5, revenueGrowth: 22, eps: 5.57, grossMargin: 67, dividendYield: 1.04,
      etfPresence: { AIS: false, ARTY: 4.05, BAI: false, IVEP: false, IGPT: false, IVES: 3.62, ALAI: false, CHAT: 1.55 },
      tonyNote: 'ORACLE CORP appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 1.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CLASS A CORP', easyScore: 2, proScore: 1.8, coverage: 0.25,
      price: 302.49, weeklyPrices: [293.42, 296.44, 297.95, 300.37, 302.49], weeklyChange: -1.75, sortRank: 0, periodReturns: { '1M': 31.7, '6M': 236.1, '1Y': 1452.8 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$86B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 1.81, BAI: false, IVEP: 5.38, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'BLOOM ENERGY CLASS A CORP appears in 2 of 8 AI & ML ETFs (25% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MXL', name: 'MaxLinear Inc', easyScore: 2, proScore: 5.96, coverage: 0.5,
      price: 99.16, weeklyPrices: [96.19, 97.18, 97.67, 98.47, 99.16], weeklyChange: -0.51, sortRank: 0, periodReturns: { '1M': 192.6, '6M': 629.1, '1Y': 757 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: 43, eps: -1.52, grossMargin: 57, dividendYield: null,
      etfPresence: { SOXX: false, PSI: 9.74, XSD: 7.11, DRAM: false },
      tonyNote: 'MaxLinear Inc appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 6.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, proScore: 5.88, coverage: 1,
      price: 751, weeklyPrices: [728.47, 735.98, 739.74, 745.74, 751.00], weeklyChange: -1.46, sortRank: 0, periodReturns: { '1M': 54.1, '6M': 262.2, '1Y': 704.3 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$847B', pe: 35.5, revenueGrowth: 196, eps: 21.18, grossMargin: 58, dividendYield: 0.08,
      etfPresence: { SOXX: 9.88, PSI: 5.91, XSD: 2.88, DRAM: 4.86 },
      tonyNote: 'MICRON TECHNOLOGY INC appears in 4 of 4 Semiconductors ETFs (100% coverage) with average weight 5.9% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, proScore: 5.66, coverage: 0.75,
      price: 467.51, weeklyPrices: [453.48, 458.16, 460.50, 464.24, 467.51], weeklyChange: 3.99, sortRank: 0, periodReturns: { '1M': 54.1, '6M': 129.4, '1Y': 323.8 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$762B', pe: 156.4, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 8.95, PSI: 7.19, XSD: 3.46, DRAM: false },
      tonyNote: 'ADVANCED MICRO DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 5.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION CORP', easyScore: 2, proScore: 3.84, coverage: 0.5,
      price: 119.84, weeklyPrices: [116.24, 117.44, 118.04, 119.00, 119.84], weeklyChange: 1.13, sortRank: 0, periodReturns: { '1M': 83.6, '6M': 247.4, '1Y': 497.7 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$602B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.94, PSI: false, XSD: 3.91, DRAM: false },
      tonyNote: 'INTEL CORPORATION CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 3.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 3, proScore: 3.76, coverage: 0.75,
      price: 414.14, weeklyPrices: [401.72, 405.86, 407.93, 411.24, 414.14], weeklyChange: -0.1, sortRank: 0, periodReturns: { '1M': -2, '6M': 21.7, '1Y': 81.1 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.0T', pe: 80.6, revenueGrowth: 30, eps: 5.14, grossMargin: 77, dividendYield: 0.63,
      etfPresence: { SOXX: 6.94, PSI: 4.18, XSD: 1.92, DRAM: false },
      tonyNote: 'BROADCOM INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.8% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, proScore: 3.51, coverage: 0.75,
      price: 215.33, weeklyPrices: [208.87, 211.02, 212.10, 213.82, 215.33], weeklyChange: -1.9, sortRank: 0, periodReturns: { '1M': 6.3, '6M': 20.4, '1Y': 64 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.2T', pe: 33, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.02,
      etfPresence: { SOXX: 6.62, PSI: 3.67, XSD: 1.87, DRAM: false },
      tonyNote: 'NVIDIA CORP appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, proScore: 3.39, coverage: 0.5,
      price: 196.33, weeklyPrices: [190.44, 192.40, 193.39, 194.96, 196.33], weeklyChange: 2.96, sortRank: 0, periodReturns: { '1M': 24.8, '6M': 153.5, '1Y': 223.5 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$172B', pe: 64.2, revenueGrowth: 22, eps: 3.06, grossMargin: 51, dividendYield: 0.12,
      etfPresence: { SOXX: 6.24, PSI: false, XSD: 3.34, DRAM: false },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 3.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 3, proScore: 3.15, coverage: 0.75,
      price: 309.21, weeklyPrices: [299.93, 303.03, 304.57, 307.05, 309.21], weeklyChange: 3.63, sortRank: 0, periodReturns: { '1M': 30.8, '6M': 94, '1Y': 75.4 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$281B', pe: 52.9, revenueGrowth: 19, eps: 5.84, grossMargin: 57, dividendYield: 1.84,
      etfPresence: { SOXX: 3.76, PSI: 4.77, XSD: 2.38, DRAM: false },
      tonyNote: 'TEXAS INSTRUMENT INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.1% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, proScore: 2.95, coverage: 0.5,
      price: 432.16, weeklyPrices: [419.20, 423.52, 425.68, 429.13, 432.16], weeklyChange: 1.12, sortRank: 0, periodReturns: { '1M': 7.1, '6M': 92.9, '1Y': 174.4 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$343B', pe: 40.7, revenueGrowth: 11, eps: 10.63, grossMargin: 49, dividendYield: 0.49,
      etfPresence: { SOXX: 4.58, PSI: 3.77, XSD: false, DRAM: false },
      tonyNote: 'APPLIED MATERIAL INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 3.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, proScore: 2.67, coverage: 0.5,
      price: 305.35, weeklyPrices: [296.19, 299.24, 300.77, 303.21, 305.35], weeklyChange: 1.03, sortRank: 0, periodReturns: { '1M': 15, '6M': 114.1, '1Y': 276.7 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$382B', pe: 57.8, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.34,
      etfPresence: { SOXX: 3.45, PSI: 4.11, XSD: false, DRAM: false },
      tonyNote: 'LAM RESEARCH CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp/DE', easyScore: 1, proScore: 2.64, coverage: 0.25,
      price: 1478.69, weeklyPrices: [1434.33, 1449.12, 1456.51, 1468.34, 1478.69], weeklyChange: -4.12, sortRank: 0, periodReturns: { '1M': 51, '6M': 638.3, '1Y': 3866.4 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$219B', pe: 50.5, revenueGrowth: 251, eps: 29.28, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 5.28 },
      tonyNote: 'Sandisk Corp/DE appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, proScore: 2.61, coverage: 0.5,
      price: 1888.38, weeklyPrices: [1831.73, 1850.61, 1860.05, 1875.16, 1888.38], weeklyChange: 2.51, sortRank: 0, periodReturns: { '1M': 4.2, '6M': 72.1, '1Y': 149.4 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$247B', pe: 53.4, revenueGrowth: 12, eps: 35.37, grossMargin: 61, dividendYield: 0.49,
      etfPresence: { SOXX: 3.23, PSI: 4.14, XSD: false, DRAM: false },
      tonyNote: 'KLA CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, proScore: 2.31, coverage: 0.5,
      price: 238.16, weeklyPrices: [231.02, 233.40, 234.59, 236.49, 238.16], weeklyChange: 11.6, sortRank: 0, periodReturns: { '1M': 75, '6M': 45.8, '1Y': 63.8 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$251B', pe: 25.6, revenueGrowth: -4, eps: 9.29, grossMargin: 55, dividendYield: 1.55,
      etfPresence: { SOXX: 4.01, PSI: false, XSD: 2.51, DRAM: false },
      tonyNote: 'QUALCOMM INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 1, proScore: 2.29, coverage: 0.25,
      price: 812.73, weeklyPrices: [788.35, 796.48, 800.54, 807.04, 812.73], weeklyChange: 0.28, sortRank: 0, periodReturns: { '1M': 40.2, '6M': 242.2, '1Y': 620.9 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$182B', pe: 76.9, revenueGrowth: 44, eps: 10.57, grossMargin: 42, dividendYield: 0.36,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 4.59 },
      tonyNote: 'Seagate Technology Holdings PLC appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, proScore: 2.13, coverage: 0.5,
      price: 306.88, weeklyPrices: [297.67, 300.74, 302.28, 304.73, 306.88], weeklyChange: 3.04, sortRank: 0, periodReturns: { '1M': 58.1, '6M': 116.4, '1Y': 224.3 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$53B', pe: 208.8, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.24, PSI: false, XSD: 3.78, DRAM: false },
      tonyNote: 'ASTERA LABS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, proScore: 2.1, coverage: 0.5,
      price: 1589.81, weeklyPrices: [1542.12, 1558.01, 1565.96, 1578.68, 1589.81], weeklyChange: 1.83, sortRank: 0, periodReturns: { '1M': 4.5, '6M': 82.2, '1Y': 140.1 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$78B', pe: 113.6, revenueGrowth: 26, eps: 13.99, grossMargin: 55, dividendYield: 0.5,
      etfPresence: { SOXX: 3.65, PSI: false, XSD: 2.3, DRAM: false },
      tonyNote: 'MONOLITHIC POWER SYSTEMS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, proScore: 2.08, coverage: 0.5,
      price: 316.47, weeklyPrices: [306.98, 310.14, 311.72, 314.25, 316.47], weeklyChange: 5.71, sortRank: 0, periodReturns: { '1M': 40.2, '6M': 65.4, '1Y': 64.7 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$80B', pe: 30.2, revenueGrowth: 12, eps: 10.48, grossMargin: 56, dividendYield: 1.28,
      etfPresence: { SOXX: 3.53, PSI: false, XSD: 2.36, DRAM: false },
      tonyNote: 'NXP SEMICONDUCTORS NV appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSEM', name: 'Tower Semiconductor Ltd', easyScore: 1, proScore: 2.02, coverage: 0.25,
      price: 283.43, weeklyPrices: [274.93, 277.76, 279.18, 281.45, 283.43], weeklyChange: 1.58, sortRank: 0, periodReturns: { '1M': 37.5, '6M': 202.6, '1Y': 597.6 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$34B', pe: 131.8, revenueGrowth: 16, eps: 2.15, grossMargin: 25, dividendYield: null,
      etfPresence: { SOXX: false, PSI: 4.03, XSD: false, DRAM: false },
      tonyNote: 'Tower Semiconductor Ltd appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 1, proScore: 2, coverage: 0.25,
      price: 484.28, weeklyPrices: [469.75, 474.59, 477.02, 480.89, 484.28], weeklyChange: -0.45, sortRank: 0, periodReturns: { '1M': 24.5, '6M': 247.9, '1Y': 865.1 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$167B', pe: 29, revenueGrowth: 46, eps: 16.71, grossMargin: 45, dividendYield: 0.12,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 4.01 },
      tonyNote: 'Western Digital Corp appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, proScore: 1.87, coverage: 0.5,
      price: 116.2, weeklyPrices: [112.71, 113.88, 114.46, 115.39, 116.20], weeklyChange: 6.01, sortRank: 0, periodReturns: { '1M': 30.6, '6M': 148.8, '1Y': 181.6 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$45B', pe: 85.4, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.37, PSI: false, XSD: 2.92, DRAM: false },
      tonyNote: 'ON SEMICONDUCTOR CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'TSLA', name: 'Tesla Inc', easyScore: 2, proScore: 6.63, coverage: 0.286,
      price: 426.01, weeklyPrices: [413.23, 417.49, 419.62, 423.03, 426.01], weeklyChange: 1.95, sortRank: 0, periodReturns: { '1M': 9.9, '6M': 8.9, '1Y': 25.5 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: 383.8, revenueGrowth: 16, eps: 1.11, grossMargin: 19, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: false, GTEK: false, ARKK: 10.54, MARS: false },
      tonyNote: 'Tesla Inc appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 6.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'Microsoft Corp', easyScore: 3, proScore: 5.79, coverage: 0.429,
      price: 418.57, weeklyPrices: [406.01, 410.20, 412.29, 415.64, 418.57], weeklyChange: -0.12, sortRank: 0, periodReturns: { '1M': -3.3, '6M': -11.3, '1Y': -7 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.1T', pe: 24.9, revenueGrowth: 18, eps: 16.78, grossMargin: 68, dividendYield: 0.87,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: 8.19, FDTX: 4.06, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Microsoft Corp appears in 3 of 7 Broad Tech ETFs (43% coverage) with average weight 5.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab Corp', easyScore: 1, proScore: 5.34, coverage: 0.143,
      price: 135.76, weeklyPrices: [131.69, 133.04, 133.72, 134.81, 135.76], weeklyChange: 8.22, sortRank: 0, periodReturns: { '1M': 50.8, '6M': 236.9, '1Y': 434.1 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$79B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 14.14 },
      tonyNote: 'Rocket Lab Corp appears in 1 of 7 Broad Tech ETFs (14% coverage) with average weight 5.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC-CL A', easyScore: 2, proScore: 5.02, coverage: 0.286,
      price: 382.97, weeklyPrices: [371.48, 375.31, 377.23, 380.29, 382.97], weeklyChange: -1.21, sortRank: 0, periodReturns: { '1M': 12.9, '6M': 27.8, '1Y': 127.3 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.6T', pe: 29.2, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { QQQ: false, QQQA: 4.49, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ALPHABET INC-CL A appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 5.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 4, proScore: 4.83, coverage: 0.571,
      price: 215.33, weeklyPrices: [208.87, 211.02, 212.10, 213.82, 215.33], weeklyChange: -1.9, sortRank: 0, periodReturns: { '1M': 6.3, '6M': 20.4, '1Y': 64 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.2T', pe: 33, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.02,
      etfPresence: { QQQ: false, QQQA: false, PTF: 4.7, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 5.27, GTEK: false, ARKK: 1.29, MARS: false },
      tonyNote: 'NVIDIA Corp appears in 4 of 7 Broad Tech ETFs (57% coverage) with average weight 4.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 3, proScore: 4.71, coverage: 0.429,
      price: 266.32, weeklyPrices: [258.33, 260.99, 262.33, 264.46, 266.32], weeklyChange: -0.8, sortRank: 0, periodReturns: { '1M': 4.3, '6M': 20.7, '1Y': 32.5 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 31.6, revenueGrowth: 17, eps: 8.42, grossMargin: 51, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 4.64, GTEK: false, ARKK: 2.68, MARS: false },
      tonyNote: 'Amazon.com Inc appears in 3 of 7 Broad Tech ETFs (43% coverage) with average weight 4.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AAPL', name: 'Apple Inc', easyScore: 3, proScore: 4.4, coverage: 0.429,
      price: 308.82, weeklyPrices: [299.56, 302.64, 304.19, 306.66, 308.82], weeklyChange: 1.26, sortRank: 0, periodReturns: { '1M': 13.1, '6M': 13.8, '1Y': 58.2 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.5T', pe: 37.4, revenueGrowth: 17, eps: 8.25, grossMargin: 48, dividendYield: 0.35,
      etfPresence: { QQQ: false, QQQA: false, PTF: 4.66, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 1.22, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Apple Inc appears in 3 of 7 Broad Tech ETFs (43% coverage) with average weight 4.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 3, proScore: 3.97, coverage: 0.429,
      price: 610.26, weeklyPrices: [591.95, 598.05, 601.11, 605.99, 610.26], weeklyChange: 0.47, sortRank: 0, periodReturns: { '1M': -9.6, '6M': 2.7, '1Y': -2.7 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 22.2, revenueGrowth: 33, eps: 27.52, grossMargin: 82, dividendYield: 0.34,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 3.31, GTEK: false, ARKK: 0.59, MARS: false },
      tonyNote: 'Meta Platforms Inc appears in 3 of 7 Broad Tech ETFs (43% coverage) with average weight 4.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, proScore: 3.57, coverage: 0.286,
      price: 196.33, weeklyPrices: [190.44, 192.40, 193.39, 194.96, 196.33], weeklyChange: 2.96, sortRank: 0, periodReturns: { '1M': 24.8, '6M': 153.5, '1Y': 223.5 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$172B', pe: 64.2, revenueGrowth: 22, eps: 3.06, grossMargin: 51, dividendYield: 0.12,
      etfPresence: { QQQ: false, QQQA: 5.68, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: 7.68, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 3.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 2, proScore: 3.27, coverage: 0.286,
      price: 467.51, weeklyPrices: [453.48, 458.16, 460.50, 464.24, 467.51], weeklyChange: 3.99, sortRank: 0, periodReturns: { '1M': 54.1, '6M': 129.4, '1Y': 323.8 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$762B', pe: 156.4, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 7.09, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: 5.14, MARS: false },
      tonyNote: 'ADVANCED MICRO DEVICES appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 3.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile Inc', easyScore: 1, proScore: 3.27, coverage: 0.143,
      price: 105.86, weeklyPrices: [102.68, 103.74, 104.27, 105.12, 105.86], weeklyChange: 10.01, sortRank: 0, periodReturns: { '1M': 25, '6M': 106.1, '1Y': 339.3 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$41B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 8.66 },
      tonyNote: 'AST SpaceMobile Inc appears in 1 of 7 Broad Tech ETFs (14% coverage) with average weight 3.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 3, proScore: 2.89, coverage: 0.429,
      price: 136.88, weeklyPrices: [132.77, 134.14, 134.83, 135.92, 136.88], weeklyChange: -0.39, sortRank: 0, periodReturns: { '1M': -10.3, '6M': -11.6, '1Y': 11 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$328B', pe: 153.8, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 7.18, FDTX: 3.01, GTEK: false, ARKK: 3.06, MARS: false },
      tonyNote: 'PALANTIR TECHNOLOGIES INC CLASS A appears in 3 of 7 Broad Tech ETFs (43% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ARM', name: 'ARM HOLDINGS PLC-ADR', easyScore: 1, proScore: 2.89, coverage: 0.143,
      price: 306.51, weeklyPrices: [297.31, 300.38, 301.91, 304.36, 306.51], weeklyChange: 2.78, sortRank: 0, periodReturns: { '1M': 55.9, '6M': 133, '1Y': 141 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$326B', pe: 356.4, revenueGrowth: 20, eps: 0.86, grossMargin: 98, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 7.65, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ARM HOLDINGS PLC-ADR appears in 1 of 7 Broad Tech ETFs (14% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SATS', name: 'EchoStar Corp', easyScore: 1, proScore: 2.77, coverage: 0.143,
      price: 124.2, weeklyPrices: [120.47, 121.72, 122.34, 123.33, 124.20], weeklyChange: -3.3, sortRank: 0, periodReturns: { '1M': 1.5, '6M': 81, '1Y': 528.5 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$36B', pe: null, revenueGrowth: -5, eps: -50.21, grossMargin: 27, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 7.32 },
      tonyNote: 'EchoStar Corp appears in 1 of 7 Broad Tech ETFs (14% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PANW', name: 'PALO ALTO NETWORKS INC', easyScore: 2, proScore: 2.74, coverage: 0.286,
      price: 260.58, weeklyPrices: [252.76, 255.37, 256.67, 258.76, 260.58], weeklyChange: 3.03, sortRank: 0, periodReturns: { '1M': 43.8, '6M': 42.5, '1Y': 39.5 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$211B', pe: 144.8, revenueGrowth: 15, eps: 1.8, grossMargin: 74, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 7.49, FDTX: 2.76, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'PALO ALTO NETWORKS INC appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 2.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'SEAGATE TECHNOLOGY HOLDINGS', easyScore: 3, proScore: 2.73, coverage: 0.429,
      price: 812.73, weeklyPrices: [788.35, 796.48, 800.54, 807.04, 812.73], weeklyChange: 0.28, sortRank: 0, periodReturns: { '1M': 40.2, '6M': 242.2, '1Y': 620.9 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$182B', pe: 76.9, revenueGrowth: 44, eps: 10.57, grossMargin: 42, dividendYield: 0.36,
      etfPresence: { QQQ: false, QQQA: 6.01, PTF: 4.49, WCLD: false, MAGS: false, IGV: false, FDTX: 2.02, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'SEAGATE TECHNOLOGY HOLDINGS appears in 3 of 7 Broad Tech ETFs (43% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORP', easyScore: 1, proScore: 2.7, coverage: 0.143,
      price: 119.84, weeklyPrices: [116.24, 117.44, 118.04, 119.00, 119.84], weeklyChange: 1.13, sortRank: 0, periodReturns: { '1M': 83.6, '6M': 247.4, '1Y': 497.7 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$602B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 7.14, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'INTEL CORP appears in 1 of 7 Broad Tech ETFs (14% coverage) with average weight 2.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 2, proScore: 2.65, coverage: 0.286,
      price: 192.08, weeklyPrices: [186.32, 188.24, 189.20, 190.74, 192.08], weeklyChange: 1.22, sortRank: 0, periodReturns: { '1M': 2.4, '6M': -3.4, '1Y': 23.2 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$552B', pe: 34.5, revenueGrowth: 22, eps: 5.57, grossMargin: 67, dividendYield: 1.04,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 9.21, FDTX: 0.7, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ORACLE CORP appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp/DE', easyScore: 1, proScore: 2.62, coverage: 0.143,
      price: 1478.69, weeklyPrices: [1434.33, 1449.12, 1456.51, 1468.34, 1478.69], weeklyChange: -4.12, sortRank: 0, periodReturns: { '1M': 51, '6M': 638.3, '1Y': 3866.4 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$219B', pe: 50.5, revenueGrowth: 251, eps: 29.28, grossMargin: 56, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: 6.93, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Sandisk Corp/DE appears in 1 of 7 Broad Tech ETFs (14% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 2, proScore: 2.6, coverage: 0.286,
      price: 751, weeklyPrices: [728.47, 735.98, 739.74, 745.74, 751.00], weeklyChange: -1.46, sortRank: 0, periodReturns: { '1M': 54.1, '6M': 262.2, '1Y': 704.3 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$847B', pe: 35.5, revenueGrowth: 196, eps: 21.18, grossMargin: 58, dividendYield: 0.08,
      etfPresence: { QQQ: false, QQQA: false, PTF: 3.85, WCLD: false, MAGS: false, IGV: false, FDTX: 5.89, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Micron Technology Inc appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 2, proScore: 5.04, coverage: 0.5,
      price: 279.22, weeklyPrices: [270.84, 273.64, 275.03, 277.27, 279.22], weeklyChange: 3.13, sortRank: 0, periodReturns: { '1M': 15, '6M': 197, '1Y': 379.5 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 54.6, revenueGrowth: 7, eps: 5.11, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { POW: 6.16, VOLT: 8.09, PBD: false, PBW: false },
      tonyNote: 'Powell Industries Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 5.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 2, proScore: 3.67, coverage: 0.5,
      price: 723.44, weeklyPrices: [701.74, 708.97, 712.59, 718.38, 723.44], weeklyChange: 0.91, sortRank: 0, periodReturns: { '1M': 17.9, '6M': 68.2, '1Y': 115.7 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$109B', pe: 99, revenueGrowth: 26, eps: 7.31, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.79, VOLT: 5.6, PBD: false, PBW: false },
      tonyNote: 'Quanta Services Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 3.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, proScore: 3.64, coverage: 0.5,
      price: 270.01, weeklyPrices: [261.91, 264.61, 265.96, 268.12, 270.01], weeklyChange: 3.69, sortRank: 0, periodReturns: { '1M': 2.8, '6M': 91.6, '1Y': 272.5 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 64.9, revenueGrowth: 17, eps: 4.16, grossMargin: 39, dividendYield: 0.1,
      etfPresence: { POW: 3.12, VOLT: 7.18, PBD: false, PBW: false },
      tonyNote: 'Bel Fuse Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 3.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 2, proScore: 3.2, coverage: 0.5,
      price: 391.35, weeklyPrices: [379.61, 383.52, 385.48, 388.61, 391.35], weeklyChange: 2.58, sortRank: 0, periodReturns: { '1M': -5.4, '6M': 18, '1Y': 21.9 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$152B', pe: 38.3, revenueGrowth: 17, eps: 10.21, grossMargin: 37, dividendYield: 1.12,
      etfPresence: { POW: 3.85, VOLT: 5.19, PBD: false, PBW: false },
      tonyNote: 'Eaton Corp PLC appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 3.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 2, proScore: 2.75, coverage: 0.5,
      price: 1038.74, weeklyPrices: [1007.58, 1017.97, 1023.16, 1031.47, 1038.74], weeklyChange: -0.49, sortRank: 0, periodReturns: { '1M': -7.9, '6M': 86.9, '1Y': 123.7 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$279B', pe: 30.4, revenueGrowth: 16, eps: 34.17, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { POW: 3.5, VOLT: 4.27, PBD: false, PBW: false },
      tonyNote: 'GE Vernova Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 3, proScore: 2.5, coverage: 0.75,
      price: 302.49, weeklyPrices: [293.42, 296.44, 297.95, 300.37, 302.49], weeklyChange: -1.75, sortRank: 0, periodReturns: { '1M': 31.7, '6M': 236.1, '1Y': 1452.8 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$86B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: 4.7, PBD: 1.66, PBW: 2.3 },
      tonyNote: 'BLOOM ENERGY CORP appears in 3 of 4 Electrification ETFs (75% coverage) with average weight 2.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 2, proScore: 2.5, coverage: 0.5,
      price: 88.55, weeklyPrices: [85.89, 86.78, 87.22, 87.93, 88.55], weeklyChange: -1.27, sortRank: 0, periodReturns: { '1M': -1.6, '6M': 6.1, '1Y': 30.7 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$185B', pe: 22.5, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.82,
      etfPresence: { POW: 2.01, VOLT: 5.07, PBD: false, PBW: false },
      tonyNote: 'NextEra Energy Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 2, proScore: 2.41, coverage: 0.5,
      price: 164.66, weeklyPrices: [159.72, 161.37, 162.19, 163.51, 164.66], weeklyChange: 0.67, sortRank: 0, periodReturns: { '1M': 17.5, '6M': 63.8, '1Y': 152.4 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 55.8, revenueGrowth: 54, eps: 2.95, grossMargin: 37, dividendYield: 0.51,
      etfPresence: { POW: 3.75, VOLT: 3.08, PBD: false, PBW: false },
      tonyNote: 'nVent Electric PLC appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, proScore: 2.31, coverage: 0.25,
      price: 267.99, weeklyPrices: [259.95, 262.63, 263.97, 266.11, 267.99], weeklyChange: -0.11, sortRank: 0, periodReturns: { '1M': 1.1, '6M': 217.6, '1Y': 543.1 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 89.3, revenueGrowth: 20, eps: 3, grossMargin: 54, dividendYield: null,
      etfPresence: { POW: 4.63, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Vicor Corp appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 2.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PRY', name: 'Prysmian SpA', easyScore: 1, proScore: 2.21, coverage: 0.25,
      price: 0, weeklyPrices: [0.00, 0.00, 0.00, 0.00, 0.00], weeklyChange: 0, sortRank: 0, periodReturns: { '1M': 0, '6M': 0, '1Y': 0 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { POW: 4.41, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Prysmian SpA appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 2.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 2, proScore: 2.12, coverage: 0.5,
      price: 475.01, weeklyPrices: [460.76, 465.51, 467.88, 471.68, 475.01], weeklyChange: 3.04, sortRank: 0, periodReturns: { '1M': -13.6, '6M': 12.6, '1Y': 21.6 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 28.1, revenueGrowth: 11, eps: 16.91, grossMargin: 36, dividendYield: 1.2,
      etfPresence: { POW: 2.77, VOLT: 3.24, PBD: false, PBW: false },
      tonyNote: 'Hubbell Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FCEL', name: 'FuelCell Energy Inc', easyScore: 1, proScore: 2.05, coverage: 0.25,
      price: 25.01, weeklyPrices: [24.26, 24.51, 24.63, 24.83, 25.01], weeklyChange: -5.19, sortRank: 0, periodReturns: { '1M': 111.9, '6M': 300.8, '1Y': 356.4 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1B', pe: null, revenueGrowth: 61, eps: -6.49, grossMargin: -16, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 4.1 },
      tonyNote: 'FuelCell Energy Inc appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, proScore: 2.01, coverage: 0.5,
      price: 131.59, weeklyPrices: [127.64, 128.96, 129.62, 130.67, 131.59], weeklyChange: 1.53, sortRank: 0, periodReturns: { '1M': 0, '6M': 8.9, '1Y': 27.9 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$72B', pe: 19.5, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.89,
      etfPresence: { POW: 1.38, VOLT: 4.31, PBD: false, PBW: false },
      tonyNote: 'American Electric Power Co Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OGE', name: 'OGE ENERGY CORP', easyScore: 1, proScore: 1.91, coverage: 0.25,
      price: 48.54, weeklyPrices: [47.08, 47.57, 47.81, 48.20, 48.54], weeklyChange: 0.91, sortRank: 0, periodReturns: { '1M': 5.4, '6M': 9.6, '1Y': 9.7 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 21.6, revenueGrowth: 1, eps: 2.25, grossMargin: 44, dividendYield: 3.5,
      etfPresence: { POW: false, VOLT: 3.81, PBD: false, PBW: false },
      tonyNote: 'OGE ENERGY CORP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETR', name: 'ENTERGY CORP', easyScore: 1, proScore: 1.82, coverage: 0.25,
      price: 112.4, weeklyPrices: [109.03, 110.15, 110.71, 111.61, 112.40], weeklyChange: 0.12, sortRank: 0, periodReturns: { '1M': 1.7, '6M': 20, '1Y': 35.7 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$51B', pe: 28.7, revenueGrowth: 12, eps: 3.92, grossMargin: 47, dividendYield: 2.28,
      etfPresence: { POW: false, VOLT: 3.65, PBD: false, PBW: false },
      tonyNote: 'ENTERGY CORP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, proScore: 1.8, coverage: 0.5,
      price: 324.86, weeklyPrices: [315.11, 318.36, 319.99, 322.59, 324.86], weeklyChange: 0.33, sortRank: 0, periodReturns: { '1M': -13.9, '6M': 65.7, '1Y': 185.3 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 67.5, revenueGrowth: 26, eps: 4.81, grossMargin: 39, dividendYield: 0.12,
      etfPresence: { POW: 0.97, VOLT: 4.11, PBD: false, PBW: false },
      tonyNote: 'Advanced Energy Industries Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 1.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ET', name: 'ENERGY TRANSFER LP', easyScore: 1, proScore: 1.78, coverage: 0.25,
      price: 20.07, weeklyPrices: [19.47, 19.67, 19.77, 19.93, 20.07], weeklyChange: 0.3, sortRank: 0, periodReturns: { '1M': 5.2, '6M': 21.6, '1Y': 12.4 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$69B', pe: 16.7, revenueGrowth: 32, eps: 1.2, grossMargin: 19, dividendYield: 6.65,
      etfPresence: { POW: false, VOLT: 3.56, PBD: false, PBW: false },
      tonyNote: 'ENERGY TRANSFER LP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVTS', name: 'Navitas Semiconductor Corp', easyScore: 1, proScore: 1.75, coverage: 0.25,
      price: 29.25, weeklyPrices: [28.37, 28.66, 28.81, 29.05, 29.25], weeklyChange: 19.98, sortRank: 0, periodReturns: { '1M': 58.4, '6M': 286.9, '1Y': 563.3 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 3.51 },
      tonyNote: 'Navitas Semiconductor Corp appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HYLN', name: 'Hyliion Holdings Corp', easyScore: 1, proScore: 1.74, coverage: 0.25,
      price: 5.99, weeklyPrices: [5.81, 5.87, 5.90, 5.95, 5.99], weeklyChange: 42.62, sortRank: 0, periodReturns: { '1M': 212, '6M': 252.4, '1Y': 399.2 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1B', pe: null, revenueGrowth: 479, eps: -0.3, grossMargin: 6, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 3.47 },
      tonyNote: 'Hyliion Holdings Corp appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 1, proScore: 1.71, coverage: 0.25,
      price: 327.46, weeklyPrices: [317.64, 320.91, 322.55, 325.17, 327.46], weeklyChange: 1.26, sortRank: 0, periodReturns: { '1M': 7.3, '6M': 104.9, '1Y': 214.4 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$126B', pe: 81.9, revenueGrowth: 30, eps: 4, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 3.41, PBD: false, PBW: false },
      tonyNote: 'VERTIV HOLDINGS CO appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, proScore: 4.74, coverage: 1,
      price: 732.94, weeklyPrices: [710.95, 718.28, 721.95, 727.81, 732.94], weeklyChange: -0.11, sortRank: 0, periodReturns: { '1M': 50.2, '6M': 132.6, '1Y': 297.5 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$22B', pe: 65.4, revenueGrowth: 92, eps: 11.21, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 5.58, PRN: 3.9 },
      tonyNote: 'Sterling Infrastructure, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 4.7% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, proScore: 4.53, coverage: 1,
      price: 1828.25, weeklyPrices: [1773.40, 1791.68, 1800.83, 1815.45, 1828.25], weeklyChange: -0.39, sortRank: 0, periodReturns: { '1M': 6, '6M': 104.5, '1Y': 287.8 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$64B', pe: 52.9, revenueGrowth: 1, eps: 34.55, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: 4.34, PRN: 4.71 },
      tonyNote: 'Comfort Systems USA, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 4.5% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TTMI', name: 'TTM Technologies Inc', easyScore: 1, proScore: 4.34, coverage: 0.5,
      price: 189.92, weeklyPrices: [184.22, 186.12, 187.07, 188.59, 189.92], weeklyChange: 8.81, sortRank: 0, periodReturns: { '1M': 49.9, '6M': 223, '1Y': 564.3 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 103.2, revenueGrowth: 30, eps: 1.84, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 6.14 },
      tonyNote: 'TTM Technologies Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 4.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, proScore: 4.25, coverage: 1,
      price: 656.35, weeklyPrices: [636.66, 643.22, 646.50, 651.76, 656.35], weeklyChange: 1.82, sortRank: 0, periodReturns: { '1M': 0.7, '6M': 95.7, '1Y': 222.9 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 67.6, revenueGrowth: 13, eps: 9.71, grossMargin: 20, dividendYield: 0.3,
      etfPresence: { AIRR: 4.14, PRN: 4.37 },
      tonyNote: 'Argan, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 4.3% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 1, proScore: 3.48, coverage: 0.5,
      price: 44.35, weeklyPrices: [43.02, 43.46, 43.68, 44.04, 44.35], weeklyChange: 4.4, sortRank: 0, periodReturns: { '1M': 12.4, '6M': 297.4, '1Y': 1105.2 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$16B', pe: null, revenueGrowth: 41, eps: -0.8, grossMargin: 56, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 4.92 },
      tonyNote: 'Planet Labs PBC appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 1, proScore: 2.96, coverage: 0.5,
      price: 723.44, weeklyPrices: [701.74, 708.97, 712.59, 718.38, 723.44], weeklyChange: 0.91, sortRank: 0, periodReturns: { '1M': 17.9, '6M': 68.2, '1Y': 115.7 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$109B', pe: 99, revenueGrowth: 26, eps: 7.31, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { AIRR: false, PRN: 4.19 },
      tonyNote: 'Quanta Services Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JBL', name: 'Jabil Inc', easyScore: 1, proScore: 2.91, coverage: 0.5,
      price: 364.35, weeklyPrices: [353.42, 357.06, 358.88, 361.80, 364.35], weeklyChange: 2.23, sortRank: 0, periodReturns: { '1M': 8.3, '6M': 85.2, '1Y': 120.3 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$38B', pe: 49, revenueGrowth: 23, eps: 7.43, grossMargin: 9, dividendYield: 0.09,
      etfPresence: { AIRR: false, PRN: 4.12 },
      tonyNote: 'Jabil Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MTZ', name: 'MasTec, Inc.', easyScore: 1, proScore: 2.89, coverage: 0.5,
      price: 382.11, weeklyPrices: [370.65, 374.47, 376.38, 379.44, 382.11], weeklyChange: -1.71, sortRank: 0, periodReturns: { '1M': 1.5, '6M': 97.9, '1Y': 150.6 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$30B', pe: 67.2, revenueGrowth: 35, eps: 5.69, grossMargin: 13, dividendYield: null,
      etfPresence: { AIRR: 4.09, PRN: false },
      tonyNote: 'MasTec, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'EME', name: 'EMCOR Group, Inc.', easyScore: 1, proScore: 2.88, coverage: 0.5,
      price: 848.91, weeklyPrices: [823.44, 831.93, 836.18, 842.97, 848.91], weeklyChange: -0.03, sortRank: 0, periodReturns: { '1M': -1.3, '6M': 46, '1Y': 83.2 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$38B', pe: 28.5, revenueGrowth: 20, eps: 29.8, grossMargin: 19, dividendYield: 0.15,
      etfPresence: { AIRR: 4.08, PRN: false },
      tonyNote: 'EMCOR Group, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SAIA', name: 'Saia, Inc.', easyScore: 1, proScore: 2.88, coverage: 0.5,
      price: 456.23, weeklyPrices: [442.54, 447.11, 449.39, 453.04, 456.23], weeklyChange: -0.44, sortRank: 0, periodReturns: { '1M': 5.7, '6M': 68.1, '1Y': 72.6 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 47.9, revenueGrowth: 2, eps: 9.53, grossMargin: 24, dividendYield: null,
      etfPresence: { AIRR: 4.07, PRN: false },
      tonyNote: 'Saia, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CHRW', name: 'C.H. Robinson Worldwide, Inc.', easyScore: 1, proScore: 2.84, coverage: 0.5,
      price: 174.23, weeklyPrices: [169.00, 170.75, 171.62, 173.01, 174.23], weeklyChange: -2.19, sortRank: 0, periodReturns: { '1M': -4.5, '6M': 14.9, '1Y': 82 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$21B', pe: 35.2, revenueGrowth: -1, eps: 4.95, grossMargin: 9, dividendYield: 1.45,
      etfPresence: { AIRR: 4.02, PRN: false },
      tonyNote: 'C.H. Robinson Worldwide, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, proScore: 2.59, coverage: 0.5,
      price: 267.99, weeklyPrices: [259.95, 262.63, 263.97, 266.11, 267.99], weeklyChange: -0.11, sortRank: 0, periodReturns: { '1M': 1.1, '6M': 217.6, '1Y': 543.1 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 89.3, revenueGrowth: 20, eps: 3, grossMargin: 54, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 3.66 },
      tonyNote: 'Vicor Corp appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 1, proScore: 2.33, coverage: 0.5,
      price: 202.91, weeklyPrices: [196.82, 198.85, 199.87, 201.49, 202.91], weeklyChange: 0.19, sortRank: 0, periodReturns: { '1M': -7.4, '6M': 19.5, '1Y': 69.8 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 54.1, revenueGrowth: 26, eps: 3.75, grossMargin: 23, dividendYield: 0.51,
      etfPresence: { AIRR: 3.29, PRN: false },
      tonyNote: 'BWX Technologies, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 1, proScore: 2.32, coverage: 0.5,
      price: 256.55, weeklyPrices: [248.85, 251.42, 252.70, 254.75, 256.55], weeklyChange: -1.29, sortRank: 0, periodReturns: { '1M': 6.5, '6M': 30, '1Y': 55.4 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$103B', pe: 59.5, revenueGrowth: 19, eps: 4.31, grossMargin: 35, dividendYield: 0.19,
      etfPresence: { AIRR: false, PRN: 3.28 },
      tonyNote: 'Howmet Aerospace Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DY', name: 'Dycom Industries, Inc.', easyScore: 1, proScore: 2.3, coverage: 0.5,
      price: 411.2, weeklyPrices: [398.86, 402.98, 405.03, 408.32, 411.20], weeklyChange: -0.78, sortRank: 0, periodReturns: { '1M': 0.8, '6M': 25.9, '1Y': 82.6 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 43.1, revenueGrowth: 34, eps: 9.54, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: 3.25, PRN: false },
      tonyNote: 'Dycom Industries, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 1, proScore: 2.29, coverage: 0.5,
      price: 879.89, weeklyPrices: [853.49, 862.29, 866.69, 873.73, 879.89], weeklyChange: 1.61, sortRank: 0, periodReturns: { '1M': 8.8, '6M': 59.9, '1Y': 156.2 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$405B', pe: 43.9, revenueGrowth: 22, eps: 20.06, grossMargin: 29, dividendYield: 0.69,
      etfPresence: { AIRR: false, PRN: 3.24 },
      tonyNote: 'Caterpillar Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OC', name: 'Owens Corning', easyScore: 1, proScore: 2.16, coverage: 0.5,
      price: 117.42, weeklyPrices: [113.90, 115.07, 115.66, 116.60, 117.42], weeklyChange: 1.17, sortRank: 0, periodReturns: { '1M': -4.4, '6M': 12.7, '1Y': -12.2 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: -10, eps: -4.74, grossMargin: 27, dividendYield: 2.52,
      etfPresence: { AIRR: 3.06, PRN: false },
      tonyNote: 'Owens Corning appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 1, proScore: 2.11, coverage: 0.5,
      price: 320.63, weeklyPrices: [311.01, 314.22, 315.82, 318.39, 320.63], weeklyChange: 0.97, sortRank: 0, periodReturns: { '1M': -12.6, '6M': 5, '1Y': 42.7 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 20.8, revenueGrowth: 13, eps: 15.39, grossMargin: 12, dividendYield: 1.72,
      etfPresence: { AIRR: 2.98, PRN: false },
      tonyNote: 'Huntington Ingalls Industries, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 1, proScore: 2.06, coverage: 0.5,
      price: 56.18, weeklyPrices: [54.49, 55.06, 55.34, 55.79, 56.18], weeklyChange: 2.76, sortRank: 0, periodReturns: { '1M': -18.1, '6M': -18.7, '1Y': 56 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 330.5, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.91, PRN: false },
      tonyNote: 'Kratos Defense & Security Solutions, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 1, proScore: 1.82, coverage: 0.5,
      price: 279.22, weeklyPrices: [270.84, 273.64, 275.03, 277.27, 279.22], weeklyChange: 3.13, sortRank: 0, periodReturns: { '1M': 15, '6M': 197, '1Y': 379.5 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 54.6, revenueGrowth: 7, eps: 5.11, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { AIRR: 2.58, PRN: false },
      tonyNote: 'Powell Industries, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 1.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
