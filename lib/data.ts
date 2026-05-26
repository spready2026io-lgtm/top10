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
export const SCAN_TIMESTAMP    = '2026-05-26T13:34:51.647Z';
export const SCAN_TIMESTAMP_NY = 'May 26, 2026 at 9:34 AM ET';
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
      price: 216.65, weeklyPrices: [210.15, 212.32, 213.40, 215.13, 216.65], weeklyChange: 0.61, sortRank: 0, periodReturns: { '1M': 0, '6M': 20.2, '1Y': 59.9 },
      velocityScore: { '1D': -1.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.2T', pe: 33.2, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.02,
      etfPresence: { AIS: 2.74, ARTY: 3.9, BAI: 4.97, IVEP: false, IGPT: 6.3, IVES: 4.61, ALAI: 13.58, CHAT: 6.44 },
      tonyNote: 'NVIDIA Corp appears in 7 of 8 AI & ML ETFs (88% coverage) with average weight 5.7% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 7, proScore: 5.26, coverage: 0.875,
      price: 842.76, weeklyPrices: [817.48, 825.90, 830.12, 836.86, 842.76], weeklyChange: 12.22, sortRank: 0, periodReturns: { '1M': 60.7, '6M': 266, '1Y': 774.4 },
      velocityScore: { '1D': -0.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$950B', pe: 39.8, revenueGrowth: 196, eps: 21.18, grossMargin: 58, dividendYield: 0.08,
      etfPresence: { AIS: 7, ARTY: 6.17, BAI: 4.16, IVEP: false, IGPT: 9.93, IVES: 5.97, ALAI: 1.02, CHAT: 5.09 },
      tonyNote: 'Micron Technology Inc appears in 7 of 8 AI & ML ETFs (88% coverage) with average weight 5.3% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 7, proScore: 5.05, coverage: 0.875,
      price: 483.38, weeklyPrices: [468.88, 473.71, 476.13, 480.00, 483.38], weeklyChange: 3.39, sortRank: 0, periodReturns: { '1M': 44.5, '6M': 125.6, '1Y': 321.9 },
      velocityScore: { '1D': 0.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$788B', pe: 161.7, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.54, ARTY: 7.36, BAI: 4.76, IVEP: false, IGPT: 7.13, IVES: 7.38, ALAI: 1.01, CHAT: 5.64 },
      tonyNote: 'Advanced Micro Devices Inc appears in 7 of 8 AI & ML ETFs (88% coverage) with average weight 5.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 4, proScore: 3.79, coverage: 0.5,
      price: 384.47, weeklyPrices: [372.94, 376.78, 378.70, 381.78, 384.47], weeklyChange: 0.39, sortRank: 0, periodReturns: { '1M': 9.7, '6M': 20.2, '1Y': 122.4 },
      velocityScore: { '1D': -0.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.7T', pe: 29.3, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.84, IVEP: false, IGPT: 6.76, IVES: 4.73, ALAI: false, CHAT: 6.12 },
      tonyNote: 'ALPHABET INC CLASS A appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 3.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 6, proScore: 3.26, coverage: 0.75,
      price: 424.95, weeklyPrices: [412.20, 416.45, 418.58, 421.98, 424.95], weeklyChange: 2.61, sortRank: 0, periodReturns: { '1M': 1.6, '6M': 6.9, '1Y': 80.3 },
      velocityScore: { '1D': -0.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.0T', pe: 82.7, revenueGrowth: 30, eps: 5.14, grossMargin: 77, dividendYield: 0.63,
      etfPresence: { AIS: 0.78, ARTY: 3.87, BAI: 5.3, IVEP: false, IGPT: false, IVES: 4.77, ALAI: 4.54, CHAT: 3.31 },
      tonyNote: 'Broadcom Inc appears in 6 of 8 AI & ML ETFs (75% coverage) with average weight 3.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 4, proScore: 3.06, coverage: 0.5,
      price: 411.01, weeklyPrices: [398.68, 402.79, 404.84, 408.13, 411.01], weeklyChange: 1.65, sortRank: 0, periodReturns: { '1M': 1.5, '6M': 41.7, '1Y': 107.9 },
      velocityScore: { '1D': -0.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.1T', pe: 35.3, revenueGrowth: 35, eps: 11.65, grossMargin: 62, dividendYield: 0.94,
      etfPresence: { AIS: 3.25, ARTY: false, BAI: 4.24, IVEP: false, IGPT: false, IVES: 4.46, ALAI: 5.38, CHAT: false },
      tonyNote: 'Taiwan Semiconductor Manufacturing Co Ltd appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 3.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 3, proScore: 3.02, coverage: 0.375,
      price: 267.82, weeklyPrices: [259.79, 262.46, 263.80, 265.95, 267.82], weeklyChange: 0.56, sortRank: 0, periodReturns: { '1M': 2.6, '6M': 16.9, '1Y': 30 },
      velocityScore: { '1D': -0.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 31.8, revenueGrowth: 17, eps: 8.42, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.81, ALAI: 6.38, CHAT: 3.6 },
      tonyNote: 'AMAZON.COM INC appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 3, proScore: 2.9, coverage: 0.375,
      price: 119.19, weeklyPrices: [115.61, 116.81, 117.40, 118.36, 119.19], weeklyChange: -0.54, sortRank: 0, periodReturns: { '1M': 40.2, '6M': 223.8, '1Y': 480 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$599B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.54, ARTY: false, BAI: 3.08, IVEP: false, IGPT: 7.6, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'Intel Corp appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 4, proScore: 2.75, coverage: 0.5,
      price: 611.9, weeklyPrices: [593.54, 599.66, 602.72, 607.62, 611.90], weeklyChange: 0.27, sortRank: 0, periodReturns: { '1M': -9.8, '6M': -3.4, '1Y': -4.7 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: 22.2, revenueGrowth: 33, eps: 27.52, grossMargin: 82, dividendYield: 0.34,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: 5.12, IVES: 3.68, ALAI: 4.21, CHAT: 2.55 },
      tonyNote: 'Meta Platforms Inc appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, proScore: 2.58, coverage: 0.5,
      price: 415.64, weeklyPrices: [403.17, 407.33, 409.41, 412.73, 415.64], weeklyChange: -0.7, sortRank: 0, periodReturns: { '1M': -2.2, '6M': -14.4, '1Y': -9.8 },
      velocityScore: { '1D': -0.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.1T', pe: 24.8, revenueGrowth: 18, eps: 16.78, grossMargin: 68, dividendYield: 0.87,
      etfPresence: { AIS: false, ARTY: 1.93, BAI: false, IVEP: false, IGPT: false, IVES: 4.03, ALAI: 5.48, CHAT: 3.16 },
      tonyNote: 'MICROSOFT CORP appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 3, proScore: 2.34, coverage: 0.375,
      price: 214.72, weeklyPrices: [208.28, 210.43, 211.50, 213.22, 214.72], weeklyChange: 9.37, sortRank: 0, periodReturns: { '1M': 35.7, '6M': 144.8, '1Y': 236.4 },
      velocityScore: { '1D': 1.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$188B', pe: 70.2, revenueGrowth: 22, eps: 3.06, grossMargin: 51, dividendYield: 0.12,
      etfPresence: { AIS: 3.35, ARTY: 6.75, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.34 },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 2.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc. Class C', easyScore: 1, proScore: 2.21, coverage: 0.125,
      price: 380.66, weeklyPrices: [369.24, 373.05, 374.95, 378.00, 380.66], weeklyChange: 0.34, sortRank: 0, periodReturns: { '1M': 9.2, '6M': 18.9, '1Y': 118.8 },
      velocityScore: { '1D': -0.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.6T', pe: 29, revenueGrowth: 22, eps: 13.13, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 6.26, CHAT: false },
      tonyNote: 'Alphabet Inc. Class C appears in 1 of 8 AI & ML ETFs (13% coverage) with average weight 2.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 4, proScore: 2.1, coverage: 0.5,
      price: 1063.68, weeklyPrices: [1031.77, 1042.41, 1047.72, 1056.23, 1063.68], weeklyChange: 2.36, sortRank: 0, periodReturns: { '1M': -5, '6M': 80.4, '1Y': 125.6 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$286B', pe: 31.1, revenueGrowth: 16, eps: 34.17, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { AIS: 3.03, ARTY: false, BAI: false, IVEP: 4.03, IGPT: false, IVES: 3.59, ALAI: 1.21, CHAT: false },
      tonyNote: 'GE Vernova Inc appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NBIS', name: 'NEBIUS GROUP NV', easyScore: 3, proScore: 2.03, coverage: 0.375,
      price: 215.32, weeklyPrices: [208.86, 211.01, 212.09, 213.81, 215.32], weeklyChange: 0.26, sortRank: 0, periodReturns: { '1M': 48.5, '6M': 127.4, '1Y': 440.7 },
      velocityScore: { '1D': -1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$55B', pe: 82.8, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 3.02, ALAI: 4.19, CHAT: 2.75 },
      tonyNote: 'NEBIUS GROUP NV appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, proScore: 2, coverage: 0.5,
      price: 341.4, weeklyPrices: [331.16, 334.57, 336.28, 339.01, 341.40], weeklyChange: 4.26, sortRank: 0, periodReturns: { '1M': 5.9, '6M': 98.5, '1Y': 211 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$131B', pe: 85.3, revenueGrowth: 30, eps: 4, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 4.17, ARTY: false, BAI: 2.02, IVEP: 4.15, IGPT: false, IVES: false, ALAI: false, CHAT: 0.95 },
      tonyNote: 'Vertiv Holdings Co appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AAPL', name: 'APPLE INC', easyScore: 2, proScore: 2, coverage: 0.25,
      price: 310.41, weeklyPrices: [301.10, 304.20, 305.75, 308.24, 310.41], weeklyChange: 0.51, sortRank: 0, periodReturns: { '1M': 16, '6M': 11.8, '1Y': 55 },
      velocityScore: { '1D': 0.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.6T', pe: 37.6, revenueGrowth: 17, eps: 8.25, grossMargin: 48, dividendYield: 0.35,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.74, ALAI: 3.24, CHAT: false },
      tonyNote: 'APPLE INC appears in 2 of 8 AI & ML ETFs (25% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, proScore: 1.91, coverage: 0.5,
      price: 831.76, weeklyPrices: [806.81, 815.12, 819.28, 825.94, 831.76], weeklyChange: 2.34, sortRank: 0, periodReturns: { '1M': 39.6, '6M': 205.5, '1Y': 610.6 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$187B', pe: 78.7, revenueGrowth: 44, eps: 10.57, grossMargin: 42, dividendYield: 0.36,
      etfPresence: { AIS: 2.65, ARTY: 2.97, BAI: false, IVEP: false, IGPT: 3.24, IVES: false, ALAI: 1.94, CHAT: false },
      tonyNote: 'Seagate Technology Holdings PLC appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 5, proScore: 1.9, coverage: 0.625,
      price: 511.99, weeklyPrices: [496.63, 501.75, 504.31, 508.41, 511.99], weeklyChange: 5.72, sortRank: 0, periodReturns: { '1M': 27.8, '6M': 224.6, '1Y': 888 },
      velocityScore: { '1D': -1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$176B', pe: 30.6, revenueGrowth: 46, eps: 16.71, grossMargin: 45, dividendYield: 0.12,
      etfPresence: { AIS: 1.47, ARTY: 2.59, BAI: 2.64, IVEP: false, IGPT: false, IVES: false, ALAI: 4.21, CHAT: 1.11 },
      tonyNote: 'Western Digital Corp appears in 5 of 8 AI & ML ETFs (63% coverage) with average weight 1.9% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 3, proScore: 1.88, coverage: 0.375,
      price: 190.91, weeklyPrices: [185.18, 187.09, 188.05, 189.57, 190.91], weeklyChange: -0.6, sortRank: 0, periodReturns: { '1M': 10.4, '6M': -6.9, '1Y': 17.9 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$549B', pe: 34.3, revenueGrowth: 22, eps: 5.57, grossMargin: 67, dividendYield: 1.04,
      etfPresence: { AIS: false, ARTY: 4.04, BAI: false, IVEP: false, IGPT: false, IVES: 3.62, ALAI: false, CHAT: 1.55 },
      tonyNote: 'ORACLE CORP appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 1.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CLASS A CORP', easyScore: 2, proScore: 1.78, coverage: 0.25,
      price: 309.65, weeklyPrices: [300.36, 303.46, 305.01, 307.48, 309.65], weeklyChange: 2.42, sortRank: 0, periodReturns: { '1M': 31.9, '6M': 206.2, '1Y': 1467.1 },
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
      price: 97.55, weeklyPrices: [94.62, 95.60, 96.09, 96.87, 97.55], weeklyChange: -1.62, sortRank: 0, periodReturns: { '1M': 88.9, '6M': 531.8, '1Y': 719.1 },
      velocityScore: { '1D': -2.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: 43, eps: -1.52, grossMargin: 57, dividendYield: null,
      etfPresence: { SOXX: false, PSI: 9.74, XSD: 6.76, DRAM: false },
      tonyNote: 'MaxLinear Inc appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 5.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, proScore: 5.75, coverage: 1,
      price: 842.76, weeklyPrices: [817.48, 825.90, 830.12, 836.86, 842.76], weeklyChange: 12.22, sortRank: 0, periodReturns: { '1M': 60.7, '6M': 266, '1Y': 774.4 },
      velocityScore: { '1D': -2.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$950B', pe: 39.8, revenueGrowth: 196, eps: 21.18, grossMargin: 58, dividendYield: 0.08,
      etfPresence: { SOXX: 9.51, PSI: 5.91, XSD: 2.71, DRAM: 4.86 },
      tonyNote: 'MICRON TECHNOLOGY INC appears in 4 of 4 Semiconductors ETFs (100% coverage) with average weight 5.8% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, proScore: 5.7, coverage: 0.75,
      price: 483.38, weeklyPrices: [468.88, 473.71, 476.13, 480.00, 483.38], weeklyChange: 3.39, sortRank: 0, periodReturns: { '1M': 44.5, '6M': 125.6, '1Y': 321.9 },
      velocityScore: { '1D': 0.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$788B', pe: 161.7, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 9.1, PSI: 7.19, XSD: 3.44, DRAM: false },
      tonyNote: 'ADVANCED MICRO DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 5.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION CORP', easyScore: 2, proScore: 3.76, coverage: 0.5,
      price: 119.19, weeklyPrices: [115.61, 116.81, 117.40, 118.36, 119.19], weeklyChange: -0.54, sortRank: 0, periodReturns: { '1M': 40.2, '6M': 223.8, '1Y': 480 },
      velocityScore: { '1D': -2.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$599B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.86, PSI: false, XSD: 3.77, DRAM: false },
      tonyNote: 'INTEL CORPORATION CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 3.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 3, proScore: 3.69, coverage: 0.75,
      price: 424.95, weeklyPrices: [412.20, 416.45, 418.58, 421.98, 424.95], weeklyChange: 2.61, sortRank: 0, periodReturns: { '1M': 1.6, '6M': 6.9, '1Y': 80.3 },
      velocityScore: { '1D': -1.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.0T', pe: 82.7, revenueGrowth: 30, eps: 5.14, grossMargin: 77, dividendYield: 0.63,
      etfPresence: { SOXX: 6.77, PSI: 4.18, XSD: 1.83, DRAM: false },
      tonyNote: 'BROADCOM INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, proScore: 3.4, coverage: 0.75,
      price: 216.65, weeklyPrices: [210.15, 212.32, 213.40, 215.13, 216.65], weeklyChange: 0.61, sortRank: 0, periodReturns: { '1M': 0, '6M': 20.2, '1Y': 59.9 },
      velocityScore: { '1D': -3.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.2T', pe: 33.2, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.02,
      etfPresence: { SOXX: 6.35, PSI: 3.67, XSD: 1.75, DRAM: false },
      tonyNote: 'NVIDIA CORP appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, proScore: 3.38, coverage: 0.5,
      price: 214.72, weeklyPrices: [208.28, 210.43, 211.50, 213.22, 214.72], weeklyChange: 9.37, sortRank: 0, periodReturns: { '1M': 35.7, '6M': 144.8, '1Y': 236.4 },
      velocityScore: { '1D': -0.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$188B', pe: 70.2, revenueGrowth: 22, eps: 3.06, grossMargin: 51, dividendYield: 0.12,
      etfPresence: { SOXX: 6.28, PSI: false, XSD: 3.28, DRAM: false },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 3.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 3, proScore: 3.16, coverage: 0.75,
      price: 319.37, weeklyPrices: [309.79, 312.98, 314.58, 317.13, 319.37], weeklyChange: 3.28, sortRank: 0, periodReturns: { '1M': 18.5, '6M': 93.1, '1Y': 74.3 },
      velocityScore: { '1D': 0.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$291B', pe: 54.7, revenueGrowth: 19, eps: 5.84, grossMargin: 57, dividendYield: 1.84,
      etfPresence: { SOXX: 3.81, PSI: 4.77, XSD: 2.35, DRAM: false },
      tonyNote: 'TEXAS INSTRUMENT INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, proScore: 2.93, coverage: 0.5,
      price: 440.14, weeklyPrices: [426.94, 431.34, 433.54, 437.06, 440.14], weeklyChange: 1.85, sortRank: 0, periodReturns: { '1M': 8.7, '6M': 76.1, '1Y': 172 },
      velocityScore: { '1D': -0.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$349B', pe: 41.4, revenueGrowth: 11, eps: 10.63, grossMargin: 49, dividendYield: 0.49,
      etfPresence: { SOXX: 4.52, PSI: 3.77, XSD: false, DRAM: false },
      tonyNote: 'APPLIED MATERIAL INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, proScore: 2.66, coverage: 0.5,
      price: 310.93, weeklyPrices: [301.60, 304.71, 306.27, 308.75, 310.93], weeklyChange: 1.83, sortRank: 0, periodReturns: { '1M': 19.8, '6M': 100.4, '1Y': 270.4 },
      velocityScore: { '1D': -0.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$389B', pe: 58.9, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.34,
      etfPresence: { SOXX: 3.41, PSI: 4.11, XSD: false, DRAM: false },
      tonyNote: 'LAM RESEARCH CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp/DE', easyScore: 1, proScore: 2.64, coverage: 0.25,
      price: 1548.46, weeklyPrices: [1502.01, 1517.49, 1525.23, 1537.62, 1548.46], weeklyChange: 4.72, sortRank: 0, periodReturns: { '1M': 44.7, '6M': 620.1, '1Y': 3955.7 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$229B', pe: 52.9, revenueGrowth: 251, eps: 29.28, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 5.28 },
      tonyNote: 'Sandisk Corp/DE appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, proScore: 2.61, coverage: 0.5,
      price: 1921.63, weeklyPrices: [1863.98, 1883.20, 1892.81, 1908.18, 1921.63], weeklyChange: 1.76, sortRank: 0, periodReturns: { '1M': 1.1, '6M': 65.8, '1Y': 143.5 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$251B', pe: 54.4, revenueGrowth: 12, eps: 35.31, grossMargin: 61, dividendYield: 0.49,
      etfPresence: { SOXX: 3.24, PSI: 4.14, XSD: false, DRAM: false },
      tonyNote: 'KLA CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, proScore: 2.49, coverage: 0.5,
      price: 239.72, weeklyPrices: [232.53, 234.93, 236.12, 238.04, 239.72], weeklyChange: 0.66, sortRank: 0, periodReturns: { '1M': 59.5, '6M': 45.2, '1Y': 61.3 },
      velocityScore: { '1D': 7.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$253B', pe: 25.8, revenueGrowth: -4, eps: 9.29, grossMargin: 55, dividendYield: 1.55,
      etfPresence: { SOXX: 4.37, PSI: false, XSD: 2.68, DRAM: false },
      tonyNote: 'QUALCOMM INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 1, proScore: 2.29, coverage: 0.25,
      price: 831.76, weeklyPrices: [806.81, 815.12, 819.28, 825.94, 831.76], weeklyChange: 2.34, sortRank: 0, periodReturns: { '1M': 39.6, '6M': 205.5, '1Y': 610.6 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$187B', pe: 78.7, revenueGrowth: 44, eps: 10.57, grossMargin: 42, dividendYield: 0.36,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 4.59 },
      tonyNote: 'Seagate Technology Holdings PLC appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, proScore: 2.13, coverage: 0.5,
      price: 320.48, weeklyPrices: [310.87, 314.07, 315.67, 318.24, 320.48], weeklyChange: 1.27, sortRank: 0, periodReturns: { '1M': 35.3, '6M': 65.4, '1Y': 61.1 },
      velocityScore: { '1D': 2.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$81B', pe: 30.6, revenueGrowth: 12, eps: 10.48, grossMargin: 56, dividendYield: 1.28,
      etfPresence: { SOXX: 3.64, PSI: false, XSD: 2.39, DRAM: false },
      tonyNote: 'NXP SEMICONDUCTORS NV appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, proScore: 2.11, coverage: 0.5,
      price: 304.31, weeklyPrices: [295.18, 298.22, 299.75, 302.18, 304.31], weeklyChange: -0.84, sortRank: 0, periodReturns: { '1M': 54.8, '6M': 97.3, '1Y': 212 },
      velocityScore: { '1D': -0.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$52B', pe: 207, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.25, PSI: false, XSD: 3.72, DRAM: false },
      tonyNote: 'ASTERA LABS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, proScore: 2.07, coverage: 0.5,
      price: 1632.52, weeklyPrices: [1583.54, 1599.87, 1608.03, 1621.09, 1632.52], weeklyChange: 2.69, sortRank: 0, periodReturns: { '1M': 2.8, '6M': 76.5, '1Y': 138.1 },
      velocityScore: { '1D': -1.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$80B', pe: 116.7, revenueGrowth: 26, eps: 13.99, grossMargin: 55, dividendYield: 0.5,
      etfPresence: { SOXX: 3.63, PSI: false, XSD: 2.24, DRAM: false },
      tonyNote: 'MONOLITHIC POWER SYSTEMS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSEM', name: 'Tower Semiconductor Ltd', easyScore: 1, proScore: 2.02, coverage: 0.25,
      price: 280, weeklyPrices: [271.60, 274.40, 275.80, 278.04, 280.00], weeklyChange: -1.21, sortRank: 0, periodReturns: { '1M': 37.7, '6M': 170.6, '1Y': 573.6 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$33B', pe: 130.2, revenueGrowth: 16, eps: 2.15, grossMargin: 25, dividendYield: null,
      etfPresence: { SOXX: false, PSI: 4.03, XSD: false, DRAM: false },
      tonyNote: 'Tower Semiconductor Ltd appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVTS', name: 'NAVITAS SEMICONDUCTOR CORP', easyScore: 1, proScore: 2.02, coverage: 0.25,
      price: 31.94, weeklyPrices: [30.98, 31.30, 31.46, 31.72, 31.94], weeklyChange: 9.2, sortRank: 0, periodReturns: { '1M': 74.5, '6M': 283, '1Y': 391.4 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$8B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: 4.04, DRAM: false },
      tonyNote: 'NAVITAS SEMICONDUCTOR CORP appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 1, proScore: 2, coverage: 0.25,
      price: 511.99, weeklyPrices: [496.63, 501.75, 504.31, 508.41, 511.99], weeklyChange: 5.72, sortRank: 0, periodReturns: { '1M': 27.8, '6M': 224.6, '1Y': 888 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$176B', pe: 30.6, revenueGrowth: 46, eps: 16.71, grossMargin: 45, dividendYield: 0.12,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 4.01 },
      tonyNote: 'Western Digital Corp appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'TSLA', name: 'Tesla Inc', easyScore: 2, proScore: 6.69, coverage: 0.286,
      price: 431.82, weeklyPrices: [418.87, 423.18, 425.34, 428.80, 431.82], weeklyChange: 1.36, sortRank: 0, periodReturns: { '1M': 14, '6M': 1.2, '1Y': 19 },
      velocityScore: { '1D': 0.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: 389, revenueGrowth: 16, eps: 1.11, grossMargin: 19, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: false, GTEK: false, ARKK: 10.73, MARS: false },
      tonyNote: 'Tesla Inc appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 6.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'Microsoft Corp', easyScore: 3, proScore: 5.76, coverage: 0.429,
      price: 415.64, weeklyPrices: [403.17, 407.33, 409.41, 412.73, 415.64], weeklyChange: -0.7, sortRank: 0, periodReturns: { '1M': -2.2, '6M': -14.4, '1Y': -9.8 },
      velocityScore: { '1D': -0.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.1T', pe: 24.8, revenueGrowth: 18, eps: 16.78, grossMargin: 68, dividendYield: 0.87,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: 8.06, FDTX: 4.06, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Microsoft Corp appears in 3 of 7 Broad Tech ETFs (43% coverage) with average weight 5.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab Corp', easyScore: 1, proScore: 5.34, coverage: 0.143,
      price: 141.09, weeklyPrices: [136.86, 138.27, 138.97, 140.10, 141.09], weeklyChange: 3.93, sortRank: 0, periodReturns: { '1M': 71.5, '6M': 236.5, '1Y': 390.6 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$82B', pe: null, revenueGrowth: 64, eps: -0.33, grossMargin: 37, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 14.14 },
      tonyNote: 'Rocket Lab Corp appears in 1 of 7 Broad Tech ETFs (14% coverage) with average weight 5.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC-CL A', easyScore: 2, proScore: 5.02, coverage: 0.286,
      price: 384.47, weeklyPrices: [372.94, 376.78, 378.70, 381.78, 384.47], weeklyChange: 0.39, sortRank: 0, periodReturns: { '1M': 9.7, '6M': 20.2, '1Y': 122.4 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.7T', pe: 29.3, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { QQQ: false, QQQA: 4.49, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ALPHABET INC-CL A appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 5.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 4, proScore: 4.82, coverage: 0.571,
      price: 216.65, weeklyPrices: [210.15, 212.32, 213.40, 215.13, 216.65], weeklyChange: 0.61, sortRank: 0, periodReturns: { '1M': 0, '6M': 20.2, '1Y': 59.9 },
      velocityScore: { '1D': -0.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.2T', pe: 33.2, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.02,
      etfPresence: { QQQ: false, QQQA: false, PTF: 4.7, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 5.27, GTEK: false, ARKK: 1.27, MARS: false },
      tonyNote: 'NVIDIA Corp appears in 4 of 7 Broad Tech ETFs (57% coverage) with average weight 4.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 3, proScore: 4.71, coverage: 0.429,
      price: 267.82, weeklyPrices: [259.79, 262.46, 263.80, 265.95, 267.82], weeklyChange: 0.56, sortRank: 0, periodReturns: { '1M': 2.6, '6M': 16.9, '1Y': 30 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 31.8, revenueGrowth: 17, eps: 8.42, grossMargin: 51, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 4.64, GTEK: false, ARKK: 2.66, MARS: false },
      tonyNote: 'Amazon.com Inc appears in 3 of 7 Broad Tech ETFs (43% coverage) with average weight 4.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AAPL', name: 'Apple Inc', easyScore: 3, proScore: 4.4, coverage: 0.429,
      price: 310.41, weeklyPrices: [301.10, 304.20, 305.75, 308.24, 310.41], weeklyChange: 0.51, sortRank: 0, periodReturns: { '1M': 16, '6M': 11.8, '1Y': 55 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.6T', pe: 37.6, revenueGrowth: 17, eps: 8.25, grossMargin: 48, dividendYield: 0.35,
      etfPresence: { QQQ: false, QQQA: false, PTF: 4.66, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 1.22, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Apple Inc appears in 3 of 7 Broad Tech ETFs (43% coverage) with average weight 4.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 3, proScore: 3.97, coverage: 0.429,
      price: 611.9, weeklyPrices: [593.54, 599.66, 602.72, 607.62, 611.90], weeklyChange: 0.27, sortRank: 0, periodReturns: { '1M': -9.8, '6M': -3.4, '1Y': -4.7 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: 22.2, revenueGrowth: 33, eps: 27.52, grossMargin: 82, dividendYield: 0.34,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 3.31, GTEK: false, ARKK: 0.59, MARS: false },
      tonyNote: 'Meta Platforms Inc appears in 3 of 7 Broad Tech ETFs (43% coverage) with average weight 4.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, proScore: 3.57, coverage: 0.286,
      price: 214.72, weeklyPrices: [208.28, 210.43, 211.50, 213.22, 214.72], weeklyChange: 9.37, sortRank: 0, periodReturns: { '1M': 35.7, '6M': 144.8, '1Y': 236.4 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$188B', pe: 70.2, revenueGrowth: 22, eps: 3.06, grossMargin: 51, dividendYield: 0.12,
      etfPresence: { QQQ: false, QQQA: 5.68, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: 7.68, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 3.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 2, proScore: 3.32, coverage: 0.286,
      price: 483.38, weeklyPrices: [468.88, 473.71, 476.13, 480.00, 483.38], weeklyChange: 3.39, sortRank: 0, periodReturns: { '1M': 44.5, '6M': 125.6, '1Y': 321.9 },
      velocityScore: { '1D': 1.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$788B', pe: 161.7, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 7.09, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: 5.33, MARS: false },
      tonyNote: 'ADVANCED MICRO DEVICES appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 3.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile Inc', easyScore: 1, proScore: 3.27, coverage: 0.143,
      price: 117.32, weeklyPrices: [113.80, 114.97, 115.56, 116.50, 117.32], weeklyChange: 10.84, sortRank: 0, periodReturns: { '1M': 52, '6M': 111.3, '1Y': 372.3 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$46B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 8.66 },
      tonyNote: 'AST SpaceMobile Inc appears in 1 of 7 Broad Tech ETFs (14% coverage) with average weight 3.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ARM', name: 'ARM HOLDINGS PLC-ADR', easyScore: 1, proScore: 2.89, coverage: 0.143,
      price: 307.59, weeklyPrices: [298.36, 301.44, 302.98, 305.44, 307.59], weeklyChange: 0.35, sortRank: 0, periodReturns: { '1M': 42.5, '6M': 132, '1Y': 129.6 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$327B', pe: 357.7, revenueGrowth: 20, eps: 0.86, grossMargin: 98, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 7.65, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ARM HOLDINGS PLC-ADR appears in 1 of 7 Broad Tech ETFs (14% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 3, proScore: 2.86, coverage: 0.429,
      price: 134.97, weeklyPrices: [130.92, 132.27, 132.95, 134.03, 134.97], weeklyChange: -1.4, sortRank: 0, periodReturns: { '1M': -5.7, '6M': -18.6, '1Y': 9.4 },
      velocityScore: { '1D': -1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$324B', pe: 151.7, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 7.04, FDTX: 3.01, GTEK: false, ARKK: 3.04, MARS: false },
      tonyNote: 'PALANTIR TECHNOLOGIES INC CLASS A appears in 3 of 7 Broad Tech ETFs (43% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PANW', name: 'PALO ALTO NETWORKS INC', easyScore: 2, proScore: 2.77, coverage: 0.286,
      price: 254.04, weeklyPrices: [246.42, 248.96, 250.23, 252.26, 254.04], weeklyChange: -2.51, sortRank: 0, periodReturns: { '1M': 38.9, '6M': 37.1, '1Y': 35.5 },
      velocityScore: { '1D': 1.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$206B', pe: 141.1, revenueGrowth: 15, eps: 1.8, grossMargin: 74, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 7.59, FDTX: 2.76, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'PALO ALTO NETWORKS INC appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SATS', name: 'EchoStar Corp', easyScore: 1, proScore: 2.77, coverage: 0.143,
      price: 130.01, weeklyPrices: [126.11, 127.41, 128.06, 129.10, 130.01], weeklyChange: 4.68, sortRank: 0, periodReturns: { '1M': 6.9, '6M': 83.4, '1Y': 542.4 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$38B', pe: null, revenueGrowth: -5, eps: -50.21, grossMargin: 27, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 7.32 },
      tonyNote: 'EchoStar Corp appears in 1 of 7 Broad Tech ETFs (14% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'SEAGATE TECHNOLOGY HOLDINGS', easyScore: 3, proScore: 2.73, coverage: 0.429,
      price: 831.76, weeklyPrices: [806.81, 815.12, 819.28, 825.94, 831.76], weeklyChange: 2.34, sortRank: 0, periodReturns: { '1M': 39.6, '6M': 205.5, '1Y': 610.6 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$187B', pe: 78.7, revenueGrowth: 44, eps: 10.57, grossMargin: 42, dividendYield: 0.36,
      etfPresence: { QQQ: false, QQQA: 6.01, PTF: 4.49, WCLD: false, MAGS: false, IGV: false, FDTX: 2.02, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'SEAGATE TECHNOLOGY HOLDINGS appears in 3 of 7 Broad Tech ETFs (43% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORP', easyScore: 1, proScore: 2.7, coverage: 0.143,
      price: 119.19, weeklyPrices: [115.61, 116.81, 117.40, 118.36, 119.19], weeklyChange: -0.54, sortRank: 0, periodReturns: { '1M': 40.2, '6M': 223.8, '1Y': 480 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$599B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 7.14, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'INTEL CORP appears in 1 of 7 Broad Tech ETFs (14% coverage) with average weight 2.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 2, proScore: 2.64, coverage: 0.286,
      price: 190.91, weeklyPrices: [185.18, 187.09, 188.05, 189.57, 190.91], weeklyChange: -0.6, sortRank: 0, periodReturns: { '1M': 10.4, '6M': -6.9, '1Y': 17.9 },
      velocityScore: { '1D': -0.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$549B', pe: 34.3, revenueGrowth: 22, eps: 5.57, grossMargin: 67, dividendYield: 1.04,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 9.18, FDTX: 0.7, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ORACLE CORP appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp/DE', easyScore: 1, proScore: 2.62, coverage: 0.143,
      price: 1548.46, weeklyPrices: [1502.01, 1517.49, 1525.23, 1537.62, 1548.46], weeklyChange: 4.72, sortRank: 0, periodReturns: { '1M': 44.7, '6M': 620.1, '1Y': 3955.7 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$229B', pe: 52.9, revenueGrowth: 251, eps: 29.28, grossMargin: 56, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: 6.93, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Sandisk Corp/DE appears in 1 of 7 Broad Tech ETFs (14% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 2, proScore: 2.6, coverage: 0.286,
      price: 842.76, weeklyPrices: [817.48, 825.90, 830.12, 836.86, 842.76], weeklyChange: 12.22, sortRank: 0, periodReturns: { '1M': 60.7, '6M': 266, '1Y': 774.4 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$950B', pe: 39.8, revenueGrowth: 196, eps: 21.18, grossMargin: 58, dividendYield: 0.08,
      etfPresence: { QQQ: false, QQQA: false, PTF: 3.85, WCLD: false, MAGS: false, IGV: false, FDTX: 5.89, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Micron Technology Inc appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 2, proScore: 5.04, coverage: 0.5,
      price: 285.99, weeklyPrices: [277.41, 280.27, 281.70, 283.99, 285.99], weeklyChange: 2.42, sortRank: 0, periodReturns: { '1M': 9.8, '6M': 166.6, '1Y': 373.4 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 56, revenueGrowth: 7, eps: 5.11, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { POW: 6.16, VOLT: 8.09, PBD: false, PBW: false },
      tonyNote: 'Powell Industries Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 5.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 2, proScore: 3.67, coverage: 0.5,
      price: 735.66, weeklyPrices: [713.59, 720.95, 724.63, 730.51, 735.66], weeklyChange: 1.66, sortRank: 0, periodReturns: { '1M': 15.4, '6M': 59.8, '1Y': 114.9 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$110B', pe: 100.6, revenueGrowth: 26, eps: 7.31, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.79, VOLT: 5.6, PBD: false, PBW: false },
      tonyNote: 'Quanta Services Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 3.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, proScore: 3.64, coverage: 0.5,
      price: 273, weeklyPrices: [264.81, 267.54, 268.90, 271.09, 273.00], weeklyChange: 1.11, sortRank: 0, periodReturns: { '1M': 8.8, '6M': 78.8, '1Y': 269.4 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 65.6, revenueGrowth: 17, eps: 4.16, grossMargin: 39, dividendYield: 0.1,
      etfPresence: { POW: 3.12, VOLT: 7.18, PBD: false, PBW: false },
      tonyNote: 'Bel Fuse Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 3.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 2, proScore: 3.2, coverage: 0.5,
      price: 402, weeklyPrices: [389.94, 393.96, 395.97, 399.19, 402.00], weeklyChange: 2.71, sortRank: 0, periodReturns: { '1M': -3.5, '6M': 17.7, '1Y': 22.5 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$156B', pe: 39.4, revenueGrowth: 17, eps: 10.21, grossMargin: 37, dividendYield: 1.12,
      etfPresence: { POW: 3.85, VOLT: 5.19, PBD: false, PBW: false },
      tonyNote: 'Eaton Corp PLC appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 3.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 2, proScore: 2.75, coverage: 0.5,
      price: 1063.68, weeklyPrices: [1031.77, 1042.41, 1047.72, 1056.23, 1063.68], weeklyChange: 2.36, sortRank: 0, periodReturns: { '1M': -5, '6M': 80.4, '1Y': 125.6 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$286B', pe: 31.1, revenueGrowth: 16, eps: 34.17, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { POW: 3.5, VOLT: 4.27, PBD: false, PBW: false },
      tonyNote: 'GE Vernova Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 3, proScore: 2.5, coverage: 0.75,
      price: 309.65, weeklyPrices: [300.36, 303.46, 305.01, 307.48, 309.65], weeklyChange: 2.42, sortRank: 0, periodReturns: { '1M': 31.9, '6M': 206.2, '1Y': 1467.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$88B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: 4.7, PBD: 1.66, PBW: 2.3 },
      tonyNote: 'BLOOM ENERGY CORP appears in 3 of 4 Electrification ETFs (75% coverage) with average weight 2.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 2, proScore: 2.5, coverage: 0.5,
      price: 88.6, weeklyPrices: [85.94, 86.83, 87.27, 87.98, 88.60], weeklyChange: 0.05, sortRank: 0, periodReturns: { '1M': -6.6, '6M': 3.6, '1Y': 30.2 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$185B', pe: 22.5, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.82,
      etfPresence: { POW: 2.01, VOLT: 5.07, PBD: false, PBW: false },
      tonyNote: 'NextEra Energy Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 2, proScore: 2.41, coverage: 0.5,
      price: 168.05, weeklyPrices: [163.01, 164.69, 165.53, 166.87, 168.05], weeklyChange: 2.07, sortRank: 0, periodReturns: { '1M': 18.6, '6M': 57.7, '1Y': 151.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 57, revenueGrowth: 54, eps: 2.95, grossMargin: 37, dividendYield: 0.51,
      etfPresence: { POW: 3.75, VOLT: 3.08, PBD: false, PBW: false },
      tonyNote: 'nVent Electric PLC appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, proScore: 2.31, coverage: 0.25,
      price: 297.83, weeklyPrices: [288.90, 291.87, 293.36, 295.75, 297.83], weeklyChange: 11.13, sortRank: 0, periodReturns: { '1M': 10.9, '6M': 232.6, '1Y': 600.8 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$14B', pe: 99.3, revenueGrowth: 20, eps: 3, grossMargin: 54, dividendYield: null,
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
      price: 478.87, weeklyPrices: [464.50, 469.29, 471.69, 475.52, 478.87], weeklyChange: 0.82, sortRank: 0, periodReturns: { '1M': -13.8, '6M': 11.8, '1Y': 20.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 28.3, revenueGrowth: 11, eps: 16.91, grossMargin: 36, dividendYield: 1.2,
      etfPresence: { POW: 2.77, VOLT: 3.24, PBD: false, PBW: false },
      tonyNote: 'Hubbell Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FCEL', name: 'FuelCell Energy Inc', easyScore: 1, proScore: 2.05, coverage: 0.25,
      price: 25.49, weeklyPrices: [24.73, 24.98, 25.11, 25.31, 25.49], weeklyChange: 1.92, sortRank: 0, periodReturns: { '1M': 138.7, '6M': 309.8, '1Y': 341 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1B', pe: null, revenueGrowth: 61, eps: -6.49, grossMargin: -16, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 4.1 },
      tonyNote: 'FuelCell Energy Inc appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, proScore: 2.01, coverage: 0.5,
      price: 131.29, weeklyPrices: [127.35, 128.66, 129.32, 130.37, 131.29], weeklyChange: -0.23, sortRank: 0, periodReturns: { '1M': -2.8, '6M': 7, '1Y': 27.6 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$71B', pe: 19.4, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.89,
      etfPresence: { POW: 1.38, VOLT: 4.31, PBD: false, PBW: false },
      tonyNote: 'American Electric Power Co Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OGE', name: 'OGE ENERGY CORP', easyScore: 1, proScore: 1.91, coverage: 0.25,
      price: 48.26, weeklyPrices: [46.81, 47.29, 47.54, 47.92, 48.26], weeklyChange: -0.58, sortRank: 0, periodReturns: { '1M': 1.4, '6M': 6.1, '1Y': 8.3 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 21.4, revenueGrowth: 1, eps: 2.25, grossMargin: 44, dividendYield: 3.5,
      etfPresence: { POW: false, VOLT: 3.81, PBD: false, PBW: false },
      tonyNote: 'OGE ENERGY CORP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETR', name: 'ENTERGY CORP', easyScore: 1, proScore: 1.82, coverage: 0.25,
      price: 112.34, weeklyPrices: [108.97, 110.09, 110.65, 111.55, 112.34], weeklyChange: -0.05, sortRank: 0, periodReturns: { '1M': -1, '6M': 16.4, '1Y': 35.7 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$51B', pe: 28.7, revenueGrowth: 12, eps: 3.92, grossMargin: 47, dividendYield: 2.28,
      etfPresence: { POW: false, VOLT: 3.65, PBD: false, PBW: false },
      tonyNote: 'ENTERGY CORP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, proScore: 1.8, coverage: 0.5,
      price: 328.83, weeklyPrices: [318.97, 322.25, 323.90, 326.53, 328.83], weeklyChange: 1.22, sortRank: 0, periodReturns: { '1M': -14.7, '6M': 56.7, '1Y': 179.8 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 68.4, revenueGrowth: 26, eps: 4.81, grossMargin: 39, dividendYield: 0.12,
      etfPresence: { POW: 0.97, VOLT: 4.11, PBD: false, PBW: false },
      tonyNote: 'Advanced Energy Industries Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 1.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ET', name: 'ENERGY TRANSFER LP', easyScore: 1, proScore: 1.78, coverage: 0.25,
      price: 19.8, weeklyPrices: [19.21, 19.40, 19.50, 19.66, 19.80], weeklyChange: -1.31, sortRank: 0, periodReturns: { '1M': 3.9, '6M': 20.5, '1Y': 10.3 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$68B', pe: 16.5, revenueGrowth: 32, eps: 1.2, grossMargin: 19, dividendYield: 6.65,
      etfPresence: { POW: false, VOLT: 3.56, PBD: false, PBW: false },
      tonyNote: 'ENERGY TRANSFER LP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVTS', name: 'Navitas Semiconductor Corp', easyScore: 1, proScore: 1.75, coverage: 0.25,
      price: 31.94, weeklyPrices: [30.98, 31.30, 31.46, 31.72, 31.94], weeklyChange: 9.2, sortRank: 0, periodReturns: { '1M': 74.5, '6M': 283, '1Y': 391.4 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$8B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 3.51 },
      tonyNote: 'Navitas Semiconductor Corp appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HYLN', name: 'Hyliion Holdings Corp', easyScore: 1, proScore: 1.74, coverage: 0.25,
      price: 6.95, weeklyPrices: [6.74, 6.81, 6.85, 6.90, 6.95], weeklyChange: 16.61, sortRank: 0, periodReturns: { '1M': 277.7, '6M': 275.7, '1Y': 509.6 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1B', pe: null, revenueGrowth: 479, eps: -0.3, grossMargin: 6, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 3.47 },
      tonyNote: 'Hyliion Holdings Corp appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 1, proScore: 1.71, coverage: 0.25,
      price: 341.4, weeklyPrices: [331.16, 334.57, 336.28, 339.01, 341.40], weeklyChange: 4.26, sortRank: 0, periodReturns: { '1M': 5.9, '6M': 98.5, '1Y': 211 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$131B', pe: 85.3, revenueGrowth: 30, eps: 4, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 3.41, PBD: false, PBW: false },
      tonyNote: 'VERTIV HOLDINGS CO appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, proScore: 4.74, coverage: 1,
      price: 760.29, weeklyPrices: [737.48, 745.08, 748.89, 754.97, 760.29], weeklyChange: 3.73, sortRank: 0, periodReturns: { '1M': 50.4, '6M': 123.8, '1Y': 297.2 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$23B', pe: 67.8, revenueGrowth: 92, eps: 11.21, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 5.58, PRN: 3.9 },
      tonyNote: 'Sterling Infrastructure, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 4.7% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, proScore: 4.53, coverage: 1,
      price: 1893.59, weeklyPrices: [1836.78, 1855.72, 1865.19, 1880.33, 1893.59], weeklyChange: 3.57, sortRank: 0, periodReturns: { '1M': 5.5, '6M': 95, '1Y': 290.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$67B', pe: 54.8, revenueGrowth: 1, eps: 34.55, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: 4.34, PRN: 4.71 },
      tonyNote: 'Comfort Systems USA, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 4.5% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TTMI', name: 'TTM Technologies Inc', easyScore: 1, proScore: 4.34, coverage: 0.5,
      price: 193.05, weeklyPrices: [187.26, 189.19, 190.15, 191.70, 193.05], weeklyChange: 1.65, sortRank: 0, periodReturns: { '1M': 33.9, '6M': 182.7, '1Y': 548.3 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 104.9, revenueGrowth: 30, eps: 1.84, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 6.14 },
      tonyNote: 'TTM Technologies Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 4.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, proScore: 4.25, coverage: 1,
      price: 676, weeklyPrices: [655.72, 662.48, 665.86, 671.27, 676.00], weeklyChange: 2.98, sortRank: 0, periodReturns: { '1M': 2.3, '6M': 77.6, '1Y': 221.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 69.6, revenueGrowth: 13, eps: 9.71, grossMargin: 20, dividendYield: 0.3,
      etfPresence: { AIRR: 4.14, PRN: 4.37 },
      tonyNote: 'Argan, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 4.3% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 1, proScore: 3.48, coverage: 0.5,
      price: 47.17, weeklyPrices: [45.75, 46.23, 46.46, 46.84, 47.17], weeklyChange: 6.41, sortRank: 0, periodReturns: { '1M': 33.1, '6M': 302.5, '1Y': 1088.2 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$17B', pe: null, revenueGrowth: 41, eps: -0.8, grossMargin: 56, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 4.92 },
      tonyNote: 'Planet Labs PBC appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 1, proScore: 2.96, coverage: 0.5,
      price: 735.66, weeklyPrices: [713.59, 720.95, 724.63, 730.51, 735.66], weeklyChange: 1.66, sortRank: 0, periodReturns: { '1M': 15.4, '6M': 59.8, '1Y': 114.9 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$110B', pe: 100.6, revenueGrowth: 26, eps: 7.31, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { AIRR: false, PRN: 4.19 },
      tonyNote: 'Quanta Services Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JBL', name: 'Jabil Inc', easyScore: 1, proScore: 2.91, coverage: 0.5,
      price: 372.4, weeklyPrices: [361.23, 364.95, 366.81, 369.79, 372.40], weeklyChange: 2.21, sortRank: 0, periodReturns: { '1M': 9.3, '6M': 79.7, '1Y': 120.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$39B', pe: 50.1, revenueGrowth: 23, eps: 7.43, grossMargin: 9, dividendYield: 0.09,
      etfPresence: { AIRR: false, PRN: 4.12 },
      tonyNote: 'Jabil Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MTZ', name: 'MasTec, Inc.', easyScore: 1, proScore: 2.89, coverage: 0.5,
      price: 391.18, weeklyPrices: [379.44, 383.36, 385.31, 388.44, 391.18], weeklyChange: 2.4, sortRank: 0, periodReturns: { '1M': 1.4, '6M': 85.9, '1Y': 151.7 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$31B', pe: 68.7, revenueGrowth: 35, eps: 5.69, grossMargin: 13, dividendYield: null,
      etfPresence: { AIRR: 4.09, PRN: false },
      tonyNote: 'MasTec, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'EME', name: 'EMCOR Group, Inc.', easyScore: 1, proScore: 2.88, coverage: 0.5,
      price: 860.27, weeklyPrices: [834.46, 843.06, 847.37, 854.25, 860.27], weeklyChange: 1.32, sortRank: 0, periodReturns: { '1M': -2.8, '6M': 40.9, '1Y': 80.9 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$38B', pe: 28.9, revenueGrowth: 20, eps: 29.8, grossMargin: 19, dividendYield: 0.15,
      etfPresence: { AIRR: 4.08, PRN: false },
      tonyNote: 'EMCOR Group, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SAIA', name: 'Saia, Inc.', easyScore: 1, proScore: 2.88, coverage: 0.5,
      price: 467.75, weeklyPrices: [453.72, 458.39, 460.73, 464.48, 467.75], weeklyChange: 2.53, sortRank: 0, periodReturns: { '1M': 5.3, '6M': 67.4, '1Y': 70.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 49, revenueGrowth: 2, eps: 9.54, grossMargin: 24, dividendYield: null,
      etfPresence: { AIRR: 4.07, PRN: false },
      tonyNote: 'Saia, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CHRW', name: 'C.H. Robinson Worldwide, Inc.', easyScore: 1, proScore: 2.84, coverage: 0.5,
      price: 175.25, weeklyPrices: [169.99, 171.75, 172.62, 174.02, 175.25], weeklyChange: 0.59, sortRank: 0, periodReturns: { '1M': -7, '6M': 9.8, '1Y': 80.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$21B', pe: 35.4, revenueGrowth: -1, eps: 4.95, grossMargin: 9, dividendYield: 1.45,
      etfPresence: { AIRR: 4.02, PRN: false },
      tonyNote: 'C.H. Robinson Worldwide, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, proScore: 2.59, coverage: 0.5,
      price: 297.83, weeklyPrices: [288.90, 291.87, 293.36, 295.75, 297.83], weeklyChange: 11.13, sortRank: 0, periodReturns: { '1M': 10.9, '6M': 232.6, '1Y': 600.8 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$14B', pe: 99.3, revenueGrowth: 20, eps: 3, grossMargin: 54, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 3.66 },
      tonyNote: 'Vicor Corp appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 1, proScore: 2.33, coverage: 0.5,
      price: 205, weeklyPrices: [198.85, 200.90, 201.93, 203.56, 205.00], weeklyChange: 1.01, sortRank: 0, periodReturns: { '1M': -7.7, '6M': 15.1, '1Y': 67.5 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 54.7, revenueGrowth: 26, eps: 3.75, grossMargin: 23, dividendYield: 0.51,
      etfPresence: { AIRR: 3.29, PRN: false },
      tonyNote: 'BWX Technologies, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 1, proScore: 2.32, coverage: 0.5,
      price: 261.75, weeklyPrices: [253.90, 256.51, 257.82, 259.92, 261.75], weeklyChange: 2.07, sortRank: 0, periodReturns: { '1M': 8.3, '6M': 27.9, '1Y': 54.3 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$105B', pe: 60.7, revenueGrowth: 19, eps: 4.31, grossMargin: 35, dividendYield: 0.19,
      etfPresence: { AIRR: false, PRN: 3.28 },
      tonyNote: 'Howmet Aerospace Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DY', name: 'Dycom Industries, Inc.', easyScore: 1, proScore: 2.3, coverage: 0.5,
      price: 419.42, weeklyPrices: [406.84, 411.03, 413.13, 416.48, 419.42], weeklyChange: 2.01, sortRank: 0, periodReturns: { '1M': 0.8, '6M': 18.2, '1Y': 84.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 44, revenueGrowth: 34, eps: 9.54, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: 3.25, PRN: false },
      tonyNote: 'Dycom Industries, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 1, proScore: 2.29, coverage: 0.5,
      price: 882.86, weeklyPrices: [856.37, 865.20, 869.62, 876.68, 882.86], weeklyChange: 0.32, sortRank: 0, periodReturns: { '1M': 6.5, '6M': 53.9, '1Y': 151.2 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$407B', pe: 44, revenueGrowth: 22, eps: 20.06, grossMargin: 29, dividendYield: 0.69,
      etfPresence: { AIRR: false, PRN: 3.24 },
      tonyNote: 'Caterpillar Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OC', name: 'Owens Corning', easyScore: 1, proScore: 2.16, coverage: 0.5,
      price: 118.72, weeklyPrices: [115.16, 116.35, 116.94, 117.89, 118.72], weeklyChange: 1.08, sortRank: 0, periodReturns: { '1M': -5.4, '6M': 6.4, '1Y': -13.8 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: -10, eps: -4.74, grossMargin: 27, dividendYield: 2.52,
      etfPresence: { AIRR: 3.06, PRN: false },
      tonyNote: 'Owens Corning appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 1, proScore: 2.11, coverage: 0.5,
      price: 318.4, weeklyPrices: [308.85, 312.03, 313.62, 316.17, 318.40], weeklyChange: -0.66, sortRank: 0, periodReturns: { '1M': -11.2, '6M': 1.3, '1Y': 39.7 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 20.7, revenueGrowth: 13, eps: 15.39, grossMargin: 12, dividendYield: 1.72,
      etfPresence: { AIRR: 2.98, PRN: false },
      tonyNote: 'Huntington Ingalls Industries, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 1, proScore: 2.06, coverage: 0.5,
      price: 57.62, weeklyPrices: [55.89, 56.47, 56.76, 57.22, 57.62], weeklyChange: 2.56, sortRank: 0, periodReturns: { '1M': -8.8, '6M': -24, '1Y': 51.2 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 338.9, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.91, PRN: false },
      tonyNote: 'Kratos Defense & Security Solutions, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 1, proScore: 1.82, coverage: 0.5,
      price: 285.99, weeklyPrices: [277.41, 280.27, 281.70, 283.99, 285.99], weeklyChange: 2.42, sortRank: 0, periodReturns: { '1M': 9.8, '6M': 166.6, '1Y': 373.4 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 56, revenueGrowth: 7, eps: 5.11, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { AIRR: 2.58, PRN: false },
      tonyNote: 'Powell Industries, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 1.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
