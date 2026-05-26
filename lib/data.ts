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
export const SCAN_TIMESTAMP    = '2026-05-26T14:56:35.650Z';
export const SCAN_TIMESTAMP_NY = 'May 26, 2026 at 10:56 AM ET';
// @@END_GENERATED:SCAN_TIMESTAMP@@

// Number of ETFs per theme — denominator for Coverage Score display (x/n badge)
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
      price: 216.37, weeklyPrices: [209.88, 212.04, 213.12, 214.86, 216.37], weeklyChange: 0.48, sortRank: 0, periodReturns: { '1M': -0.1, '6M': 20, '1Y': 59.7 },
      velocityScore: { '1D': -1.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.2T', pe: 33.2, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.02,
      etfPresence: { AIS: 2.74, ARTY: 3.9, BAI: 4.97, IVEP: false, IGPT: 6.3, IVES: 4.61, ALAI: 13.58, CHAT: 6.44 },
      tonyNote: 'NVIDIA Corp appears in 7 of 8 AI & ML ETFs (88% coverage) with average weight 5.7% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 7, proScore: 5.26, coverage: 0.875,
      price: 881.54, weeklyPrices: [855.09, 863.91, 868.32, 875.37, 881.54], weeklyChange: 17.38, sortRank: 0, periodReturns: { '1M': 68.1, '6M': 282.8, '1Y': 814.7 },
      velocityScore: { '1D': -0.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$994B', pe: 41.6, revenueGrowth: 196, eps: 21.18, grossMargin: 58, dividendYield: 0.08,
      etfPresence: { AIS: 7, ARTY: 6.17, BAI: 4.16, IVEP: false, IGPT: 9.93, IVES: 5.97, ALAI: 1.02, CHAT: 5.09 },
      tonyNote: 'Micron Technology Inc appears in 7 of 8 AI & ML ETFs (88% coverage) with average weight 5.3% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 7, proScore: 5.05, coverage: 0.875,
      price: 491.23, weeklyPrices: [476.49, 481.41, 483.86, 487.79, 491.23], weeklyChange: 5.07, sortRank: 0, periodReturns: { '1M': 46.8, '6M': 129.3, '1Y': 328.8 },
      velocityScore: { '1D': 0.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$801B', pe: 164.3, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.54, ARTY: 7.36, BAI: 4.76, IVEP: false, IGPT: 7.13, IVES: 7.38, ALAI: 1.01, CHAT: 5.64 },
      tonyNote: 'Advanced Micro Devices Inc appears in 7 of 8 AI & ML ETFs (88% coverage) with average weight 5.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 4, proScore: 3.79, coverage: 0.5,
      price: 386.38, weeklyPrices: [374.79, 378.65, 380.58, 383.68, 386.38], weeklyChange: 0.89, sortRank: 0, periodReturns: { '1M': 10.3, '6M': 20.8, '1Y': 123.5 },
      velocityScore: { '1D': -0.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.7T', pe: 29.5, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.84, IVEP: false, IGPT: 6.76, IVES: 4.73, ALAI: false, CHAT: 6.12 },
      tonyNote: 'ALPHABET INC CLASS A appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 3.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 6, proScore: 3.26, coverage: 0.75,
      price: 431.44, weeklyPrices: [418.50, 422.81, 424.97, 428.42, 431.44], weeklyChange: 4.18, sortRank: 0, periodReturns: { '1M': 3.2, '6M': 8.5, '1Y': 83.1 },
      velocityScore: { '1D': -0.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.0T', pe: 83.9, revenueGrowth: 30, eps: 5.14, grossMargin: 77, dividendYield: 0.63,
      etfPresence: { AIS: 0.78, ARTY: 3.87, BAI: 5.3, IVEP: false, IGPT: false, IVES: 4.77, ALAI: 4.54, CHAT: 3.31 },
      tonyNote: 'Broadcom Inc appears in 6 of 8 AI & ML ETFs (75% coverage) with average weight 3.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 4, proScore: 3.06, coverage: 0.5,
      price: 413.05, weeklyPrices: [400.66, 404.79, 406.85, 410.16, 413.05], weeklyChange: 2.11, sortRank: 0, periodReturns: { '1M': 2, '6M': 42.5, '1Y': 108.9 },
      velocityScore: { '1D': -0.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.1T', pe: 35.5, revenueGrowth: 35, eps: 11.65, grossMargin: 62, dividendYield: 0.94,
      etfPresence: { AIS: 3.25, ARTY: false, BAI: 4.24, IVEP: false, IGPT: false, IVES: 4.46, ALAI: 5.38, CHAT: false },
      tonyNote: 'Taiwan Semiconductor Manufacturing Co Ltd appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 3.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 3, proScore: 3.02, coverage: 0.375,
      price: 264.37, weeklyPrices: [256.44, 259.08, 260.40, 262.52, 264.37], weeklyChange: -0.73, sortRank: 0, periodReturns: { '1M': 1.2, '6M': 15.4, '1Y': 28.3 },
      velocityScore: { '1D': -0.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.8T', pe: 31.4, revenueGrowth: 17, eps: 8.42, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.81, ALAI: 6.38, CHAT: 3.6 },
      tonyNote: 'AMAZON.COM INC appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 3, proScore: 2.9, coverage: 0.375,
      price: 123.36, weeklyPrices: [119.66, 120.89, 121.51, 122.50, 123.36], weeklyChange: 2.94, sortRank: 0, periodReturns: { '1M': 45.1, '6M': 235.1, '1Y': 500.3 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$620B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.54, ARTY: false, BAI: 3.08, IVEP: false, IGPT: 7.6, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'Intel Corp appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 4, proScore: 2.75, coverage: 0.5,
      price: 607.38, weeklyPrices: [589.16, 595.23, 598.27, 603.13, 607.38], weeklyChange: -0.47, sortRank: 0, periodReturns: { '1M': -10.5, '6M': -4.1, '1Y': -5.4 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 22.1, revenueGrowth: 33, eps: 27.52, grossMargin: 82, dividendYield: 0.34,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: 5.12, IVES: 3.68, ALAI: 4.21, CHAT: 2.55 },
      tonyNote: 'Meta Platforms Inc appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, proScore: 2.58, coverage: 0.5,
      price: 415.76, weeklyPrices: [403.29, 407.44, 409.52, 412.85, 415.76], weeklyChange: -0.67, sortRank: 0, periodReturns: { '1M': -2.1, '6M': -14.4, '1Y': -9.8 },
      velocityScore: { '1D': -0.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.1T', pe: 24.8, revenueGrowth: 18, eps: 16.78, grossMargin: 68, dividendYield: 0.87,
      etfPresence: { AIS: false, ARTY: 1.93, BAI: false, IVEP: false, IGPT: false, IVES: 4.03, ALAI: 5.48, CHAT: 3.16 },
      tonyNote: 'MICROSOFT CORP appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 3, proScore: 2.34, coverage: 0.375,
      price: 205.1, weeklyPrices: [198.95, 201.00, 202.02, 203.66, 205.10], weeklyChange: 4.47, sortRank: 0, periodReturns: { '1M': 29.6, '6M': 133.8, '1Y': 221.4 },
      velocityScore: { '1D': 1.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$180B', pe: 67, revenueGrowth: 22, eps: 3.06, grossMargin: 51, dividendYield: 0.12,
      etfPresence: { AIS: 3.35, ARTY: 6.75, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.34 },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 2.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc. Class C', easyScore: 1, proScore: 2.21, coverage: 0.125,
      price: 382.68, weeklyPrices: [371.20, 375.03, 376.94, 380.00, 382.68], weeklyChange: 0.87, sortRank: 0, periodReturns: { '1M': 9.8, '6M': 19.5, '1Y': 120 },
      velocityScore: { '1D': -0.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.6T', pe: 29.1, revenueGrowth: 22, eps: 13.13, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 6.26, CHAT: false },
      tonyNote: 'Alphabet Inc. Class C appears in 1 of 8 AI & ML ETFs (13% coverage) with average weight 2.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 4, proScore: 2.1, coverage: 0.5,
      price: 1094.15, weeklyPrices: [1061.33, 1072.27, 1077.74, 1086.49, 1094.15], weeklyChange: 5.33, sortRank: 0, periodReturns: { '1M': -2.3, '6M': 85.5, '1Y': 132.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$294B', pe: 32, revenueGrowth: 16, eps: 34.17, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { AIS: 3.03, ARTY: false, BAI: false, IVEP: 4.03, IGPT: false, IVES: 3.59, ALAI: 1.21, CHAT: false },
      tonyNote: 'GE Vernova Inc appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NBIS', name: 'NEBIUS GROUP NV', easyScore: 3, proScore: 2.03, coverage: 0.375,
      price: 0, weeklyPrices: [0.00, 0.00, 0.00, 0.00, 0.00], weeklyChange: 0, sortRank: 0, periodReturns: { '1M': 0, '6M': 0, '1Y': 0 },
      velocityScore: { '1D': -1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 3.02, ALAI: 4.19, CHAT: 2.75 },
      tonyNote: 'NEBIUS GROUP NV appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, proScore: 2, coverage: 0.5,
      price: 338.03, weeklyPrices: [327.89, 331.27, 332.96, 335.66, 338.03], weeklyChange: 3.23, sortRank: 0, periodReturns: { '1M': 4.8, '6M': 96.5, '1Y': 207.9 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$130B', pe: 84.5, revenueGrowth: 30, eps: 4, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 4.17, ARTY: false, BAI: 2.02, IVEP: 4.15, IGPT: false, IVES: false, ALAI: false, CHAT: 0.95 },
      tonyNote: 'Vertiv Holdings Co appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AAPL', name: 'APPLE INC', easyScore: 2, proScore: 2, coverage: 0.25,
      price: 311.07, weeklyPrices: [301.74, 304.85, 306.40, 308.89, 311.07], weeklyChange: 0.73, sortRank: 0, periodReturns: { '1M': 16.2, '6M': 12.1, '1Y': 55.4 },
      velocityScore: { '1D': 0.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.6T', pe: 37.7, revenueGrowth: 17, eps: 8.25, grossMargin: 48, dividendYield: 0.35,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.74, ALAI: 3.24, CHAT: false },
      tonyNote: 'APPLE INC appears in 2 of 8 AI & ML ETFs (25% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, proScore: 1.91, coverage: 0.5,
      price: 844.82, weeklyPrices: [819.48, 827.92, 832.15, 838.91, 844.82], weeklyChange: 3.95, sortRank: 0, periodReturns: { '1M': 41.8, '6M': 210.3, '1Y': 621.8 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$189B', pe: 79.9, revenueGrowth: 44, eps: 10.57, grossMargin: 42, dividendYield: 0.36,
      etfPresence: { AIS: 2.65, ARTY: 2.97, BAI: false, IVEP: false, IGPT: 3.24, IVES: false, ALAI: 1.94, CHAT: false },
      tonyNote: 'Seagate Technology Holdings PLC appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 5, proScore: 1.9, coverage: 0.625,
      price: 532.06, weeklyPrices: [516.10, 521.42, 524.08, 528.34, 532.06], weeklyChange: 9.87, sortRank: 0, periodReturns: { '1M': 32.8, '6M': 237.3, '1Y': 926.7 },
      velocityScore: { '1D': -1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$183B', pe: 31.8, revenueGrowth: 46, eps: 16.71, grossMargin: 45, dividendYield: 0.12,
      etfPresence: { AIS: 1.47, ARTY: 2.59, BAI: 2.64, IVEP: false, IGPT: false, IVES: false, ALAI: 4.21, CHAT: 1.11 },
      tonyNote: 'Western Digital Corp appears in 5 of 8 AI & ML ETFs (63% coverage) with average weight 1.9% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 3, proScore: 1.88, coverage: 0.375,
      price: 194.53, weeklyPrices: [188.69, 190.64, 191.61, 193.17, 194.53], weeklyChange: 1.27, sortRank: 0, periodReturns: { '1M': 12.5, '6M': -5.1, '1Y': 20.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$559B', pe: 34.9, revenueGrowth: 22, eps: 5.57, grossMargin: 67, dividendYield: 1.04,
      etfPresence: { AIS: false, ARTY: 4.04, BAI: false, IVEP: false, IGPT: false, IVES: 3.62, ALAI: false, CHAT: 1.55 },
      tonyNote: 'ORACLE CORP appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 1.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CLASS A CORP', easyScore: 2, proScore: 1.78, coverage: 0.25,
      price: 306, weeklyPrices: [296.82, 299.88, 301.41, 303.86, 306.00], weeklyChange: 1.16, sortRank: 0, periodReturns: { '1M': 30.4, '6M': 202.6, '1Y': 1448.6 },
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
      price: 91.08, weeklyPrices: [88.35, 89.26, 89.71, 90.44, 91.08], weeklyChange: -8.15, sortRank: 0, periodReturns: { '1M': 76.3, '6M': 489.9, '1Y': 664.7 },
      velocityScore: { '1D': -2.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$8B', pe: null, revenueGrowth: 43, eps: -1.52, grossMargin: 57, dividendYield: null,
      etfPresence: { SOXX: false, PSI: 9.74, XSD: 6.76, DRAM: false },
      tonyNote: 'MaxLinear Inc appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 5.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, proScore: 5.75, coverage: 1,
      price: 881.54, weeklyPrices: [855.09, 863.91, 868.32, 875.37, 881.54], weeklyChange: 17.38, sortRank: 0, periodReturns: { '1M': 68.1, '6M': 282.8, '1Y': 814.7 },
      velocityScore: { '1D': -2.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$994B', pe: 41.6, revenueGrowth: 196, eps: 21.18, grossMargin: 58, dividendYield: 0.08,
      etfPresence: { SOXX: 9.51, PSI: 5.91, XSD: 2.71, DRAM: 4.86 },
      tonyNote: 'MICRON TECHNOLOGY INC appears in 4 of 4 Semiconductors ETFs (100% coverage) with average weight 5.8% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, proScore: 5.7, coverage: 0.75,
      price: 491.23, weeklyPrices: [476.49, 481.41, 483.86, 487.79, 491.23], weeklyChange: 5.07, sortRank: 0, periodReturns: { '1M': 46.8, '6M': 129.3, '1Y': 328.8 },
      velocityScore: { '1D': 0.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$801B', pe: 164.3, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 9.1, PSI: 7.19, XSD: 3.44, DRAM: false },
      tonyNote: 'ADVANCED MICRO DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 5.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION CORP', easyScore: 2, proScore: 3.76, coverage: 0.5,
      price: 123.36, weeklyPrices: [119.66, 120.89, 121.51, 122.50, 123.36], weeklyChange: 2.94, sortRank: 0, periodReturns: { '1M': 45.1, '6M': 235.1, '1Y': 500.3 },
      velocityScore: { '1D': -2.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$620B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.86, PSI: false, XSD: 3.77, DRAM: false },
      tonyNote: 'INTEL CORPORATION CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 3.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 3, proScore: 3.69, coverage: 0.75,
      price: 431.44, weeklyPrices: [418.50, 422.81, 424.97, 428.42, 431.44], weeklyChange: 4.18, sortRank: 0, periodReturns: { '1M': 3.2, '6M': 8.5, '1Y': 83.1 },
      velocityScore: { '1D': -1.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.0T', pe: 83.9, revenueGrowth: 30, eps: 5.14, grossMargin: 77, dividendYield: 0.63,
      etfPresence: { SOXX: 6.77, PSI: 4.18, XSD: 1.83, DRAM: false },
      tonyNote: 'BROADCOM INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, proScore: 3.4, coverage: 0.75,
      price: 216.37, weeklyPrices: [209.88, 212.04, 213.12, 214.86, 216.37], weeklyChange: 0.48, sortRank: 0, periodReturns: { '1M': -0.1, '6M': 20, '1Y': 59.7 },
      velocityScore: { '1D': -3.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.2T', pe: 33.2, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.02,
      etfPresence: { SOXX: 6.35, PSI: 3.67, XSD: 1.75, DRAM: false },
      tonyNote: 'NVIDIA CORP appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, proScore: 3.38, coverage: 0.5,
      price: 205.1, weeklyPrices: [198.95, 201.00, 202.02, 203.66, 205.10], weeklyChange: 4.47, sortRank: 0, periodReturns: { '1M': 29.6, '6M': 133.8, '1Y': 221.4 },
      velocityScore: { '1D': -0.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$180B', pe: 67, revenueGrowth: 22, eps: 3.06, grossMargin: 51, dividendYield: 0.12,
      etfPresence: { SOXX: 6.28, PSI: false, XSD: 3.28, DRAM: false },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 3.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 3, proScore: 3.16, coverage: 0.75,
      price: 325.16, weeklyPrices: [315.41, 318.66, 320.28, 322.88, 325.16], weeklyChange: 5.16, sortRank: 0, periodReturns: { '1M': 20.7, '6M': 96.6, '1Y': 77.5 },
      velocityScore: { '1D': 0.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$296B', pe: 55.7, revenueGrowth: 19, eps: 5.84, grossMargin: 57, dividendYield: 1.84,
      etfPresence: { SOXX: 3.81, PSI: 4.77, XSD: 2.35, DRAM: false },
      tonyNote: 'TEXAS INSTRUMENT INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, proScore: 2.93, coverage: 0.5,
      price: 453.3, weeklyPrices: [439.70, 444.23, 446.50, 450.13, 453.30], weeklyChange: 4.89, sortRank: 0, periodReturns: { '1M': 12, '6M': 81.3, '1Y': 180.1 },
      velocityScore: { '1D': -0.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$360B', pe: 42.6, revenueGrowth: 11, eps: 10.63, grossMargin: 49, dividendYield: 0.49,
      etfPresence: { SOXX: 4.52, PSI: 3.77, XSD: false, DRAM: false },
      tonyNote: 'APPLIED MATERIAL INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, proScore: 2.66, coverage: 0.5,
      price: 318.76, weeklyPrices: [309.20, 312.38, 313.98, 316.53, 318.76], weeklyChange: 4.39, sortRank: 0, periodReturns: { '1M': 22.9, '6M': 105.5, '1Y': 279.7 },
      velocityScore: { '1D': -0.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$399B', pe: 60.4, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.34,
      etfPresence: { SOXX: 3.41, PSI: 4.11, XSD: false, DRAM: false },
      tonyNote: 'LAM RESEARCH CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp/DE', easyScore: 1, proScore: 2.64, coverage: 0.25,
      price: 1599.22, weeklyPrices: [1551.24, 1567.24, 1575.23, 1588.03, 1599.22], weeklyChange: 8.15, sortRank: 0, periodReturns: { '1M': 49.4, '6M': 643.7, '1Y': 4088.6 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$237B', pe: 54.6, revenueGrowth: 251, eps: 29.28, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 5.28 },
      tonyNote: 'Sandisk Corp/DE appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, proScore: 2.61, coverage: 0.5,
      price: 1992.01, weeklyPrices: [1932.25, 1952.17, 1962.13, 1978.07, 1992.01], weeklyChange: 5.49, sortRank: 0, periodReturns: { '1M': 4.8, '6M': 71.9, '1Y': 152.5 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$260B', pe: 56.4, revenueGrowth: 12, eps: 35.31, grossMargin: 61, dividendYield: 0.49,
      etfPresence: { SOXX: 3.24, PSI: 4.14, XSD: false, DRAM: false },
      tonyNote: 'KLA CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, proScore: 2.49, coverage: 0.5,
      price: 250.59, weeklyPrices: [243.07, 245.58, 246.83, 248.84, 250.59], weeklyChange: 5.22, sortRank: 0, periodReturns: { '1M': 66.8, '6M': 51.7, '1Y': 68.6 },
      velocityScore: { '1D': 7.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$264B', pe: 27, revenueGrowth: -4, eps: 9.29, grossMargin: 55, dividendYield: 1.55,
      etfPresence: { SOXX: 4.37, PSI: false, XSD: 2.68, DRAM: false },
      tonyNote: 'QUALCOMM INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 1, proScore: 2.29, coverage: 0.25,
      price: 844.82, weeklyPrices: [819.48, 827.92, 832.15, 838.91, 844.82], weeklyChange: 3.95, sortRank: 0, periodReturns: { '1M': 41.8, '6M': 210.3, '1Y': 621.8 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$189B', pe: 79.9, revenueGrowth: 44, eps: 10.57, grossMargin: 42, dividendYield: 0.36,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 4.59 },
      tonyNote: 'Seagate Technology Holdings PLC appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, proScore: 2.13, coverage: 0.5,
      price: 329.8, weeklyPrices: [319.91, 323.20, 324.85, 327.49, 329.80], weeklyChange: 4.21, sortRank: 0, periodReturns: { '1M': 39.2, '6M': 70.2, '1Y': 65.8 },
      velocityScore: { '1D': 2.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$83B', pe: 31.5, revenueGrowth: 12, eps: 10.48, grossMargin: 56, dividendYield: 1.28,
      etfPresence: { SOXX: 3.64, PSI: false, XSD: 2.39, DRAM: false },
      tonyNote: 'NXP SEMICONDUCTORS NV appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, proScore: 2.11, coverage: 0.5,
      price: 0, weeklyPrices: [0.00, 0.00, 0.00, 0.00, 0.00], weeklyChange: 0, sortRank: 0, periodReturns: { '1M': 0, '6M': 0, '1Y': 0 },
      velocityScore: { '1D': -0.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { SOXX: 2.25, PSI: false, XSD: 3.72, DRAM: false },
      tonyNote: 'ASTERA LABS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, proScore: 2.07, coverage: 0.5,
      price: 1700.66, weeklyPrices: [1649.64, 1666.65, 1675.15, 1688.76, 1700.66], weeklyChange: 6.97, sortRank: 0, periodReturns: { '1M': 7.1, '6M': 83.9, '1Y': 148.1 },
      velocityScore: { '1D': -1.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$84B', pe: 121.6, revenueGrowth: 26, eps: 13.99, grossMargin: 55, dividendYield: 0.5,
      etfPresence: { SOXX: 3.63, PSI: false, XSD: 2.24, DRAM: false },
      tonyNote: 'MONOLITHIC POWER SYSTEMS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSEM', name: 'Tower Semiconductor Ltd', easyScore: 1, proScore: 2.02, coverage: 0.25,
      price: 277.38, weeklyPrices: [269.06, 271.83, 273.22, 275.44, 277.38], weeklyChange: -2.13, sortRank: 0, periodReturns: { '1M': 36.4, '6M': 168.1, '1Y': 567.3 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$33B', pe: 129, revenueGrowth: 16, eps: 2.15, grossMargin: 25, dividendYield: null,
      etfPresence: { SOXX: false, PSI: 4.03, XSD: false, DRAM: false },
      tonyNote: 'Tower Semiconductor Ltd appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVTS', name: 'NAVITAS SEMICONDUCTOR CORP', easyScore: 1, proScore: 2.02, coverage: 0.25,
      price: 33.33, weeklyPrices: [32.33, 32.66, 32.83, 33.10, 33.33], weeklyChange: 13.95, sortRank: 0, periodReturns: { '1M': 82.1, '6M': 299.6, '1Y': 412.8 },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$8B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: 4.04, DRAM: false },
      tonyNote: 'NAVITAS SEMICONDUCTOR CORP appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 1, proScore: 2, coverage: 0.25,
      price: 532.06, weeklyPrices: [516.10, 521.42, 524.08, 528.34, 532.06], weeklyChange: 9.87, sortRank: 0, periodReturns: { '1M': 32.8, '6M': 237.3, '1Y': 926.7 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$183B', pe: 31.8, revenueGrowth: 46, eps: 16.71, grossMargin: 45, dividendYield: 0.12,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 4.01 },
      tonyNote: 'Western Digital Corp appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'TSLA', name: 'Tesla Inc', easyScore: 2, proScore: 6.69, coverage: 0.286,
      price: 431.09, weeklyPrices: [418.16, 422.47, 424.62, 428.07, 431.09], weeklyChange: 1.19, sortRank: 0, periodReturns: { '1M': 13.8, '6M': 1.1, '1Y': 18.8 },
      velocityScore: { '1D': 0.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: 388.4, revenueGrowth: 16, eps: 1.11, grossMargin: 19, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: false, GTEK: false, ARKK: 10.73, MARS: false },
      tonyNote: 'Tesla Inc appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 6.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'Microsoft Corp', easyScore: 3, proScore: 5.76, coverage: 0.429,
      price: 415.76, weeklyPrices: [403.29, 407.44, 409.52, 412.85, 415.76], weeklyChange: -0.67, sortRank: 0, periodReturns: { '1M': -2.1, '6M': -14.4, '1Y': -9.8 },
      velocityScore: { '1D': -0.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.1T', pe: 24.8, revenueGrowth: 18, eps: 16.78, grossMargin: 68, dividendYield: 0.87,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: 8.06, FDTX: 4.06, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Microsoft Corp appears in 3 of 7 Broad Tech ETFs (43% coverage) with average weight 5.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab Corp', easyScore: 1, proScore: 5.34, coverage: 0.143,
      price: 142.78, weeklyPrices: [138.50, 139.92, 140.64, 141.78, 142.78], weeklyChange: 5.17, sortRank: 0, periodReturns: { '1M': 73.5, '6M': 240.5, '1Y': 396.5 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$83B', pe: null, revenueGrowth: 64, eps: -0.33, grossMargin: 37, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 14.14 },
      tonyNote: 'Rocket Lab Corp appears in 1 of 7 Broad Tech ETFs (14% coverage) with average weight 5.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC-CL A', easyScore: 2, proScore: 5.02, coverage: 0.286,
      price: 386.38, weeklyPrices: [374.79, 378.65, 380.58, 383.68, 386.38], weeklyChange: 0.89, sortRank: 0, periodReturns: { '1M': 10.3, '6M': 20.8, '1Y': 123.5 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.7T', pe: 29.5, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { QQQ: false, QQQA: 4.49, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ALPHABET INC-CL A appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 5.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 4, proScore: 4.82, coverage: 0.571,
      price: 216.37, weeklyPrices: [209.88, 212.04, 213.12, 214.86, 216.37], weeklyChange: 0.48, sortRank: 0, periodReturns: { '1M': -0.1, '6M': 20, '1Y': 59.7 },
      velocityScore: { '1D': -0.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.2T', pe: 33.2, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.02,
      etfPresence: { QQQ: false, QQQA: false, PTF: 4.7, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 5.27, GTEK: false, ARKK: 1.27, MARS: false },
      tonyNote: 'NVIDIA Corp appears in 4 of 7 Broad Tech ETFs (57% coverage) with average weight 4.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 3, proScore: 4.71, coverage: 0.429,
      price: 264.37, weeklyPrices: [256.44, 259.08, 260.40, 262.52, 264.37], weeklyChange: -0.73, sortRank: 0, periodReturns: { '1M': 1.2, '6M': 15.4, '1Y': 28.3 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.8T', pe: 31.4, revenueGrowth: 17, eps: 8.42, grossMargin: 51, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 4.64, GTEK: false, ARKK: 2.66, MARS: false },
      tonyNote: 'Amazon.com Inc appears in 3 of 7 Broad Tech ETFs (43% coverage) with average weight 4.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AAPL', name: 'Apple Inc', easyScore: 3, proScore: 4.4, coverage: 0.429,
      price: 311.07, weeklyPrices: [301.74, 304.85, 306.40, 308.89, 311.07], weeklyChange: 0.73, sortRank: 0, periodReturns: { '1M': 16.2, '6M': 12.1, '1Y': 55.4 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.6T', pe: 37.7, revenueGrowth: 17, eps: 8.25, grossMargin: 48, dividendYield: 0.35,
      etfPresence: { QQQ: false, QQQA: false, PTF: 4.66, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 1.22, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Apple Inc appears in 3 of 7 Broad Tech ETFs (43% coverage) with average weight 4.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 3, proScore: 3.97, coverage: 0.429,
      price: 607.38, weeklyPrices: [589.16, 595.23, 598.27, 603.13, 607.38], weeklyChange: -0.47, sortRank: 0, periodReturns: { '1M': -10.5, '6M': -4.1, '1Y': -5.4 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 22.1, revenueGrowth: 33, eps: 27.52, grossMargin: 82, dividendYield: 0.34,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 3.31, GTEK: false, ARKK: 0.59, MARS: false },
      tonyNote: 'Meta Platforms Inc appears in 3 of 7 Broad Tech ETFs (43% coverage) with average weight 4.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, proScore: 3.57, coverage: 0.286,
      price: 205.1, weeklyPrices: [198.95, 201.00, 202.02, 203.66, 205.10], weeklyChange: 4.47, sortRank: 0, periodReturns: { '1M': 29.6, '6M': 133.8, '1Y': 221.4 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$180B', pe: 67, revenueGrowth: 22, eps: 3.06, grossMargin: 51, dividendYield: 0.12,
      etfPresence: { QQQ: false, QQQA: 5.68, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: 7.68, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 3.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 2, proScore: 3.32, coverage: 0.286,
      price: 491.23, weeklyPrices: [476.49, 481.41, 483.86, 487.79, 491.23], weeklyChange: 5.07, sortRank: 0, periodReturns: { '1M': 46.8, '6M': 129.3, '1Y': 328.8 },
      velocityScore: { '1D': 1.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$801B', pe: 164.3, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 7.09, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: 5.33, MARS: false },
      tonyNote: 'ADVANCED MICRO DEVICES appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 3.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile Inc', easyScore: 1, proScore: 3.27, coverage: 0.143,
      price: 125.38, weeklyPrices: [121.62, 122.87, 123.50, 124.50, 125.38], weeklyChange: 18.44, sortRank: 0, periodReturns: { '1M': 62.4, '6M': 125.8, '1Y': 404.8 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$49B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 8.66 },
      tonyNote: 'AST SpaceMobile Inc appears in 1 of 7 Broad Tech ETFs (14% coverage) with average weight 3.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ARM', name: 'ARM HOLDINGS PLC-ADR', easyScore: 1, proScore: 2.89, coverage: 0.143,
      price: 315.73, weeklyPrices: [306.26, 309.42, 310.99, 313.52, 315.73], weeklyChange: 3.01, sortRank: 0, periodReturns: { '1M': 46.3, '6M': 138.1, '1Y': 135.7 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$336B', pe: 367.1, revenueGrowth: 20, eps: 0.86, grossMargin: 98, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 7.65, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ARM HOLDINGS PLC-ADR appears in 1 of 7 Broad Tech ETFs (14% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 3, proScore: 2.86, coverage: 0.429,
      price: 135.96, weeklyPrices: [131.88, 133.24, 133.92, 135.01, 135.96], weeklyChange: -0.68, sortRank: 0, periodReturns: { '1M': -5, '6M': -18, '1Y': 10.2 },
      velocityScore: { '1D': -1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$326B', pe: 152.8, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 7.04, FDTX: 3.01, GTEK: false, ARKK: 3.04, MARS: false },
      tonyNote: 'PALANTIR TECHNOLOGIES INC CLASS A appears in 3 of 7 Broad Tech ETFs (43% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PANW', name: 'PALO ALTO NETWORKS INC', easyScore: 2, proScore: 2.77, coverage: 0.286,
      price: 257, weeklyPrices: [249.29, 251.86, 253.15, 255.20, 257.00], weeklyChange: -1.37, sortRank: 0, periodReturns: { '1M': 40.5, '6M': 38.7, '1Y': 37.1 },
      velocityScore: { '1D': 1.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$208B', pe: 142.8, revenueGrowth: 15, eps: 1.8, grossMargin: 74, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 7.59, FDTX: 2.76, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'PALO ALTO NETWORKS INC appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SATS', name: 'EchoStar Corp', easyScore: 1, proScore: 2.77, coverage: 0.143,
      price: 124.1, weeklyPrices: [120.38, 121.62, 122.24, 123.23, 124.10], weeklyChange: -0.08, sortRank: 0, periodReturns: { '1M': 2, '6M': 75.1, '1Y': 513.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$36B', pe: null, revenueGrowth: -5, eps: -50.21, grossMargin: 27, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 7.32 },
      tonyNote: 'EchoStar Corp appears in 1 of 7 Broad Tech ETFs (14% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'SEAGATE TECHNOLOGY HOLDINGS', easyScore: 3, proScore: 2.73, coverage: 0.429,
      price: 844.82, weeklyPrices: [819.48, 827.92, 832.15, 838.91, 844.82], weeklyChange: 3.95, sortRank: 0, periodReturns: { '1M': 41.8, '6M': 210.3, '1Y': 621.8 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$189B', pe: 79.9, revenueGrowth: 44, eps: 10.57, grossMargin: 42, dividendYield: 0.36,
      etfPresence: { QQQ: false, QQQA: 6.01, PTF: 4.49, WCLD: false, MAGS: false, IGV: false, FDTX: 2.02, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'SEAGATE TECHNOLOGY HOLDINGS appears in 3 of 7 Broad Tech ETFs (43% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORP', easyScore: 1, proScore: 2.7, coverage: 0.143,
      price: 123.36, weeklyPrices: [119.66, 120.89, 121.51, 122.50, 123.36], weeklyChange: 2.94, sortRank: 0, periodReturns: { '1M': 45.1, '6M': 235.1, '1Y': 500.3 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$620B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 7.14, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'INTEL CORP appears in 1 of 7 Broad Tech ETFs (14% coverage) with average weight 2.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 2, proScore: 2.64, coverage: 0.286,
      price: 194.53, weeklyPrices: [188.69, 190.64, 191.61, 193.17, 194.53], weeklyChange: 1.27, sortRank: 0, periodReturns: { '1M': 12.5, '6M': -5.1, '1Y': 20.1 },
      velocityScore: { '1D': -0.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$559B', pe: 34.9, revenueGrowth: 22, eps: 5.57, grossMargin: 67, dividendYield: 1.04,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 9.18, FDTX: 0.7, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ORACLE CORP appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp/DE', easyScore: 1, proScore: 2.62, coverage: 0.143,
      price: 1599.22, weeklyPrices: [1551.24, 1567.24, 1575.23, 1588.03, 1599.22], weeklyChange: 8.15, sortRank: 0, periodReturns: { '1M': 49.4, '6M': 643.7, '1Y': 4088.6 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$237B', pe: 54.6, revenueGrowth: 251, eps: 29.28, grossMargin: 56, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: 6.93, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Sandisk Corp/DE appears in 1 of 7 Broad Tech ETFs (14% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 2, proScore: 2.6, coverage: 0.286,
      price: 881.54, weeklyPrices: [855.09, 863.91, 868.32, 875.37, 881.54], weeklyChange: 17.38, sortRank: 0, periodReturns: { '1M': 68.1, '6M': 282.8, '1Y': 814.7 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$994B', pe: 41.6, revenueGrowth: 196, eps: 21.18, grossMargin: 58, dividendYield: 0.08,
      etfPresence: { QQQ: false, QQQA: false, PTF: 3.85, WCLD: false, MAGS: false, IGV: false, FDTX: 5.89, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Micron Technology Inc appears in 2 of 7 Broad Tech ETFs (29% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 2, proScore: 5.04, coverage: 0.5,
      price: 289.44, weeklyPrices: [280.76, 283.65, 285.10, 287.41, 289.44], weeklyChange: 3.66, sortRank: 0, periodReturns: { '1M': 11.1, '6M': 169.8, '1Y': 379.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 56.6, revenueGrowth: 7, eps: 5.11, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { POW: 6.16, VOLT: 8.09, PBD: false, PBW: false },
      tonyNote: 'Powell Industries Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 5.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 2, proScore: 3.67, coverage: 0.5,
      price: 745.68, weeklyPrices: [723.31, 730.77, 734.49, 740.46, 745.68], weeklyChange: 3.07, sortRank: 0, periodReturns: { '1M': 17, '6M': 62, '1Y': 117.8 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$112B', pe: 102, revenueGrowth: 26, eps: 7.31, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.79, VOLT: 5.6, PBD: false, PBW: false },
      tonyNote: 'Quanta Services Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 3.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, proScore: 3.64, coverage: 0.5,
      price: 279.55, weeklyPrices: [271.16, 273.96, 275.36, 277.59, 279.55], weeklyChange: 3.53, sortRank: 0, periodReturns: { '1M': 11.4, '6M': 83.1, '1Y': 278.2 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 67.2, revenueGrowth: 17, eps: 4.16, grossMargin: 39, dividendYield: 0.1,
      etfPresence: { POW: 3.12, VOLT: 7.18, PBD: false, PBW: false },
      tonyNote: 'Bel Fuse Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 3.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 2, proScore: 3.2, coverage: 0.5,
      price: 408.79, weeklyPrices: [396.53, 400.61, 402.66, 405.93, 408.79], weeklyChange: 4.46, sortRank: 0, periodReturns: { '1M': -1.9, '6M': 19.6, '1Y': 24.6 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$159B', pe: 40, revenueGrowth: 17, eps: 10.21, grossMargin: 37, dividendYield: 1.12,
      etfPresence: { POW: 3.85, VOLT: 5.19, PBD: false, PBW: false },
      tonyNote: 'Eaton Corp PLC appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 3.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 2, proScore: 2.75, coverage: 0.5,
      price: 1094.15, weeklyPrices: [1061.33, 1072.27, 1077.74, 1086.49, 1094.15], weeklyChange: 5.33, sortRank: 0, periodReturns: { '1M': -2.3, '6M': 85.5, '1Y': 132.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$294B', pe: 32, revenueGrowth: 16, eps: 34.17, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { POW: 3.5, VOLT: 4.27, PBD: false, PBW: false },
      tonyNote: 'GE Vernova Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 3, proScore: 2.5, coverage: 0.75,
      price: 306, weeklyPrices: [296.82, 299.88, 301.41, 303.86, 306.00], weeklyChange: 1.16, sortRank: 0, periodReturns: { '1M': 30.4, '6M': 202.6, '1Y': 1448.6 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$87B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: 4.7, PBD: 1.66, PBW: 2.3 },
      tonyNote: 'BLOOM ENERGY CORP appears in 3 of 4 Electrification ETFs (75% coverage) with average weight 2.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 2, proScore: 2.5, coverage: 0.5,
      price: 87.96, weeklyPrices: [85.32, 86.20, 86.64, 87.34, 87.96], weeklyChange: -0.67, sortRank: 0, periodReturns: { '1M': -7.2, '6M': 2.8, '1Y': 29.3 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$183B', pe: 22.3, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.82,
      etfPresence: { POW: 2.01, VOLT: 5.07, PBD: false, PBW: false },
      tonyNote: 'NextEra Energy Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 2, proScore: 2.41, coverage: 0.5,
      price: 169.98, weeklyPrices: [164.88, 166.58, 167.43, 168.79, 169.98], weeklyChange: 3.23, sortRank: 0, periodReturns: { '1M': 19.9, '6M': 59.6, '1Y': 154 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 57.6, revenueGrowth: 54, eps: 2.95, grossMargin: 37, dividendYield: 0.51,
      etfPresence: { POW: 3.75, VOLT: 3.08, PBD: false, PBW: false },
      tonyNote: 'nVent Electric PLC appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, proScore: 2.31, coverage: 0.25,
      price: 311, weeklyPrices: [301.67, 304.78, 306.33, 308.82, 311.00], weeklyChange: 16.05, sortRank: 0, periodReturns: { '1M': 15.8, '6M': 247.3, '1Y': 631.8 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$14B', pe: 103.7, revenueGrowth: 20, eps: 3, grossMargin: 54, dividendYield: null,
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
      price: 479.16, weeklyPrices: [464.79, 469.58, 471.97, 475.81, 479.16], weeklyChange: 0.87, sortRank: 0, periodReturns: { '1M': -13.7, '6M': 11.8, '1Y': 20.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 28.3, revenueGrowth: 11, eps: 16.91, grossMargin: 36, dividendYield: 1.2,
      etfPresence: { POW: 2.77, VOLT: 3.24, PBD: false, PBW: false },
      tonyNote: 'Hubbell Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FCEL', name: 'FuelCell Energy Inc', easyScore: 1, proScore: 2.05, coverage: 0.25,
      price: 25.7, weeklyPrices: [24.93, 25.19, 25.31, 25.52, 25.70], weeklyChange: 2.76, sortRank: 0, periodReturns: { '1M': 140.6, '6M': 313.2, '1Y': 344.6 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1B', pe: null, revenueGrowth: 61, eps: -6.49, grossMargin: -16, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 4.1 },
      tonyNote: 'FuelCell Energy Inc appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, proScore: 2.01, coverage: 0.5,
      price: 131.42, weeklyPrices: [127.48, 128.79, 129.45, 130.50, 131.42], weeklyChange: -0.13, sortRank: 0, periodReturns: { '1M': -2.7, '6M': 7.1, '1Y': 27.7 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$72B', pe: 19.4, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.89,
      etfPresence: { POW: 1.38, VOLT: 4.31, PBD: false, PBW: false },
      tonyNote: 'American Electric Power Co Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OGE', name: 'OGE ENERGY CORP', easyScore: 1, proScore: 1.91, coverage: 0.25,
      price: 48.31, weeklyPrices: [46.86, 47.34, 47.59, 47.97, 48.31], weeklyChange: -0.47, sortRank: 0, periodReturns: { '1M': 1.5, '6M': 6.2, '1Y': 8.4 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 21.5, revenueGrowth: 1, eps: 2.25, grossMargin: 44, dividendYield: 3.5,
      etfPresence: { POW: false, VOLT: 3.81, PBD: false, PBW: false },
      tonyNote: 'OGE ENERGY CORP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETR', name: 'ENTERGY CORP', easyScore: 1, proScore: 1.82, coverage: 0.25,
      price: 112.28, weeklyPrices: [108.91, 110.03, 110.60, 111.49, 112.28], weeklyChange: -0.11, sortRank: 0, periodReturns: { '1M': -1, '6M': 16.3, '1Y': 35.6 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$51B', pe: 28.6, revenueGrowth: 12, eps: 3.92, grossMargin: 47, dividendYield: 2.28,
      etfPresence: { POW: false, VOLT: 3.65, PBD: false, PBW: false },
      tonyNote: 'ENTERGY CORP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, proScore: 1.8, coverage: 0.5,
      price: 339.08, weeklyPrices: [328.91, 332.30, 333.99, 336.71, 339.08], weeklyChange: 4.38, sortRank: 0, periodReturns: { '1M': -12.1, '6M': 61.5, '1Y': 188.6 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$14B', pe: 70.5, revenueGrowth: 26, eps: 4.81, grossMargin: 39, dividendYield: 0.12,
      etfPresence: { POW: 0.97, VOLT: 4.11, PBD: false, PBW: false },
      tonyNote: 'Advanced Energy Industries Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 1.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ET', name: 'ENERGY TRANSFER LP', easyScore: 1, proScore: 1.78, coverage: 0.25,
      price: 19.7, weeklyPrices: [19.11, 19.31, 19.40, 19.56, 19.70], weeklyChange: -1.83, sortRank: 0, periodReturns: { '1M': 3.4, '6M': 19.9, '1Y': 9.8 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$68B', pe: 16.4, revenueGrowth: 32, eps: 1.2, grossMargin: 19, dividendYield: 6.65,
      etfPresence: { POW: false, VOLT: 3.56, PBD: false, PBW: false },
      tonyNote: 'ENERGY TRANSFER LP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVTS', name: 'Navitas Semiconductor Corp', easyScore: 1, proScore: 1.75, coverage: 0.25,
      price: 33.33, weeklyPrices: [32.33, 32.66, 32.83, 33.10, 33.33], weeklyChange: 13.95, sortRank: 0, periodReturns: { '1M': 82.1, '6M': 299.6, '1Y': 412.8 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$8B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 3.51 },
      tonyNote: 'Navitas Semiconductor Corp appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HYLN', name: 'Hyliion Holdings Corp', easyScore: 1, proScore: 1.74, coverage: 0.25,
      price: 6.71, weeklyPrices: [6.51, 6.58, 6.61, 6.66, 6.71], weeklyChange: 12.1, sortRank: 0, periodReturns: { '1M': 264.9, '6M': 263, '1Y': 489 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1B', pe: null, revenueGrowth: 479, eps: -0.3, grossMargin: 6, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 3.47 },
      tonyNote: 'Hyliion Holdings Corp appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 1, proScore: 1.71, coverage: 0.25,
      price: 338.03, weeklyPrices: [327.89, 331.27, 332.96, 335.66, 338.03], weeklyChange: 3.23, sortRank: 0, periodReturns: { '1M': 4.8, '6M': 96.5, '1Y': 207.9 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$130B', pe: 84.5, revenueGrowth: 30, eps: 4, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 3.41, PBD: false, PBW: false },
      tonyNote: 'VERTIV HOLDINGS CO appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, proScore: 4.74, coverage: 1,
      price: 783.15, weeklyPrices: [759.66, 767.49, 771.40, 777.67, 783.15], weeklyChange: 6.85, sortRank: 0, periodReturns: { '1M': 54.9, '6M': 130.5, '1Y': 309.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$24B', pe: 69.9, revenueGrowth: 92, eps: 11.21, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 5.58, PRN: 3.9 },
      tonyNote: 'Sterling Infrastructure, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 4.7% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, proScore: 4.53, coverage: 1,
      price: 1909.55, weeklyPrices: [1852.26, 1871.36, 1880.91, 1896.18, 1909.55], weeklyChange: 4.45, sortRank: 0, periodReturns: { '1M': 6.4, '6M': 96.7, '1Y': 293.4 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$67B', pe: 55.3, revenueGrowth: 1, eps: 34.55, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: 4.34, PRN: 4.71 },
      tonyNote: 'Comfort Systems USA, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 4.5% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TTMI', name: 'TTM Technologies Inc', easyScore: 1, proScore: 4.34, coverage: 0.5,
      price: 196.04, weeklyPrices: [190.16, 192.12, 193.10, 194.67, 196.04], weeklyChange: 3.22, sortRank: 0, periodReturns: { '1M': 36, '6M': 187.1, '1Y': 558.3 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 106.5, revenueGrowth: 30, eps: 1.84, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 6.14 },
      tonyNote: 'TTM Technologies Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 4.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, proScore: 4.25, coverage: 1,
      price: 676.45, weeklyPrices: [656.16, 662.92, 666.30, 671.71, 676.45], weeklyChange: 3.06, sortRank: 0, periodReturns: { '1M': 2.4, '6M': 77.7, '1Y': 221.3 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 69.7, revenueGrowth: 13, eps: 9.71, grossMargin: 20, dividendYield: 0.3,
      etfPresence: { AIRR: 4.14, PRN: 4.37 },
      tonyNote: 'Argan, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 4.3% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 1, proScore: 3.48, coverage: 0.5,
      price: 50.36, weeklyPrices: [48.85, 49.35, 49.60, 50.01, 50.36], weeklyChange: 13.55, sortRank: 0, periodReturns: { '1M': 42.1, '6M': 329.7, '1Y': 1168.5 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: null, revenueGrowth: 41, eps: -0.8, grossMargin: 56, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 4.92 },
      tonyNote: 'Planet Labs PBC appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 1, proScore: 2.96, coverage: 0.5,
      price: 745.68, weeklyPrices: [723.31, 730.77, 734.49, 740.46, 745.68], weeklyChange: 3.07, sortRank: 0, periodReturns: { '1M': 17, '6M': 62, '1Y': 117.8 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$112B', pe: 102, revenueGrowth: 26, eps: 7.31, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { AIRR: false, PRN: 4.19 },
      tonyNote: 'Quanta Services Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JBL', name: 'Jabil Inc', easyScore: 1, proScore: 2.91, coverage: 0.5,
      price: 377.94, weeklyPrices: [366.60, 370.38, 372.27, 375.29, 377.94], weeklyChange: 3.73, sortRank: 0, periodReturns: { '1M': 10.9, '6M': 82.4, '1Y': 123.4 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$40B', pe: 50.9, revenueGrowth: 23, eps: 7.43, grossMargin: 9, dividendYield: 0.09,
      etfPresence: { AIRR: false, PRN: 4.12 },
      tonyNote: 'Jabil Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MTZ', name: 'MasTec, Inc.', easyScore: 1, proScore: 2.89, coverage: 0.5,
      price: 395.58, weeklyPrices: [383.71, 387.67, 389.65, 392.81, 395.58], weeklyChange: 3.53, sortRank: 0, periodReturns: { '1M': 2.5, '6M': 88, '1Y': 154.5 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$31B', pe: 69.5, revenueGrowth: 35, eps: 5.69, grossMargin: 13, dividendYield: null,
      etfPresence: { AIRR: 4.09, PRN: false },
      tonyNote: 'MasTec, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'EME', name: 'EMCOR Group, Inc.', easyScore: 1, proScore: 2.88, coverage: 0.5,
      price: 0, weeklyPrices: [0.00, 0.00, 0.00, 0.00, 0.00], weeklyChange: 0, sortRank: 0, periodReturns: { '1M': 0, '6M': 0, '1Y': 0 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { AIRR: 4.08, PRN: false },
      tonyNote: 'EMCOR Group, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SAIA', name: 'Saia, Inc.', easyScore: 1, proScore: 2.88, coverage: 0.5,
      price: 469.27, weeklyPrices: [455.19, 459.88, 462.23, 465.99, 469.27], weeklyChange: 2.86, sortRank: 0, periodReturns: { '1M': 5.6, '6M': 67.9, '1Y': 70.6 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 49.2, revenueGrowth: 2, eps: 9.54, grossMargin: 24, dividendYield: null,
      etfPresence: { AIRR: 4.07, PRN: false },
      tonyNote: 'Saia, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CHRW', name: 'C.H. Robinson Worldwide, Inc.', easyScore: 1, proScore: 2.84, coverage: 0.5,
      price: 177.03, weeklyPrices: [171.72, 173.49, 174.37, 175.79, 177.03], weeklyChange: 1.61, sortRank: 0, periodReturns: { '1M': -6, '6M': 11, '1Y': 81.9 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$21B', pe: 35.8, revenueGrowth: -1, eps: 4.95, grossMargin: 9, dividendYield: 1.45,
      etfPresence: { AIRR: 4.02, PRN: false },
      tonyNote: 'C.H. Robinson Worldwide, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, proScore: 2.59, coverage: 0.5,
      price: 311, weeklyPrices: [301.67, 304.78, 306.33, 308.82, 311.00], weeklyChange: 16.05, sortRank: 0, periodReturns: { '1M': 15.8, '6M': 247.3, '1Y': 631.8 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$14B', pe: 103.7, revenueGrowth: 20, eps: 3, grossMargin: 54, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 3.66 },
      tonyNote: 'Vicor Corp appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 1, proScore: 2.33, coverage: 0.5,
      price: 205, weeklyPrices: [198.85, 200.90, 201.93, 203.56, 205.00], weeklyChange: 1.03, sortRank: 0, periodReturns: { '1M': -7.7, '6M': 15.1, '1Y': 67.5 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 54.7, revenueGrowth: 26, eps: 3.75, grossMargin: 23, dividendYield: 0.51,
      etfPresence: { AIRR: 3.29, PRN: false },
      tonyNote: 'BWX Technologies, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 1, proScore: 2.32, coverage: 0.5,
      price: 261.4, weeklyPrices: [253.56, 256.17, 257.48, 259.57, 261.40], weeklyChange: 1.89, sortRank: 0, periodReturns: { '1M': 8.2, '6M': 27.7, '1Y': 54 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$105B', pe: 60.6, revenueGrowth: 19, eps: 4.31, grossMargin: 35, dividendYield: 0.19,
      etfPresence: { AIRR: false, PRN: 3.28 },
      tonyNote: 'Howmet Aerospace Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DY', name: 'Dycom Industries, Inc.', easyScore: 1, proScore: 2.3, coverage: 0.5,
      price: 422.26, weeklyPrices: [409.59, 413.81, 415.93, 419.30, 422.26], weeklyChange: 2.69, sortRank: 0, periodReturns: { '1M': 1.5, '6M': 19, '1Y': 85.4 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 44.3, revenueGrowth: 34, eps: 9.54, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: 3.25, PRN: false },
      tonyNote: 'Dycom Industries, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 1, proScore: 2.29, coverage: 0.5,
      price: 905.06, weeklyPrices: [877.91, 886.96, 891.48, 898.72, 905.06], weeklyChange: 2.86, sortRank: 0, periodReturns: { '1M': 9.2, '6M': 57.8, '1Y': 157.5 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$417B', pe: 45.1, revenueGrowth: 22, eps: 20.06, grossMargin: 29, dividendYield: 0.69,
      etfPresence: { AIRR: false, PRN: 3.24 },
      tonyNote: 'Caterpillar Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OC', name: 'Owens Corning', easyScore: 1, proScore: 2.16, coverage: 0.5,
      price: 119.76, weeklyPrices: [116.17, 117.36, 117.96, 118.92, 119.76], weeklyChange: 1.99, sortRank: 0, periodReturns: { '1M': -4.6, '6M': 7.4, '1Y': -13.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: -10, eps: -4.74, grossMargin: 27, dividendYield: 2.52,
      etfPresence: { AIRR: 3.06, PRN: false },
      tonyNote: 'Owens Corning appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 1, proScore: 2.11, coverage: 0.5,
      price: 320.29, weeklyPrices: [310.68, 313.88, 315.49, 318.05, 320.29], weeklyChange: -0.11, sortRank: 0, periodReturns: { '1M': -10.6, '6M': 1.9, '1Y': 40.6 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 20.8, revenueGrowth: 13, eps: 15.39, grossMargin: 12, dividendYield: 1.72,
      etfPresence: { AIRR: 2.98, PRN: false },
      tonyNote: 'Huntington Ingalls Industries, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 1, proScore: 2.06, coverage: 0.5,
      price: 59.02, weeklyPrices: [57.25, 57.84, 58.13, 58.61, 59.02], weeklyChange: 5.05, sortRank: 0, periodReturns: { '1M': -6.6, '6M': -22.1, '1Y': 54.8 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 347.1, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.91, PRN: false },
      tonyNote: 'Kratos Defense & Security Solutions, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 1, proScore: 1.82, coverage: 0.5,
      price: 289.44, weeklyPrices: [280.76, 283.65, 285.10, 287.41, 289.44], weeklyChange: 3.66, sortRank: 0, periodReturns: { '1M': 11.1, '6M': 169.8, '1Y': 379.1 },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 56.6, revenueGrowth: 7, eps: 5.11, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { AIRR: 2.58, PRN: false },
      tonyNote: 'Powell Industries, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 1.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
