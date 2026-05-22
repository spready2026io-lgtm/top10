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
export const SCAN_TIMESTAMP    = '2026-05-22T15:31:19.378Z';
export const SCAN_TIMESTAMP_NY = 'May 22, 2026 at 11:31 AM ET';
// @@END_GENERATED:SCAN_TIMESTAMP@@

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
      price: 218.01, weeklyPrices: [211.47, 213.65, 214.74, 216.48, 218.01], weeklyChange: -0.68, sortRank: 0, periodReturns: { '1M': 7.7, '6M': 21.9, '1Y': 64.1 },
      marketCap: '$5.3T', pe: 33.4, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.02,
      etfPresence: { AIS: 2.86, ARTY: 4.03, BAI: 5.42, IVEP: false, IGPT: false, IVES: 4.72, ALAI: 13.83, CHAT: 6.7 },
      tonyNote: 'NVIDIA Corp appears in 6 of 7 AI & ML ETFs (86% coverage) with average weight 5.8% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 6, proScore: 4.67, coverage: 0.857,
      price: 766.94, weeklyPrices: [743.93, 751.60, 755.44, 761.57, 766.94], weeklyChange: 0.64, sortRank: 0, periodReturns: { '1M': 57.3, '6M': 269.8, '1Y': 708.8 },
      marketCap: '$865B', pe: 36.2, revenueGrowth: 196, eps: 21.19, grossMargin: 58, dividendYield: 0.08,
      etfPresence: { AIS: 7.26, ARTY: 6.34, BAI: 4.27, IVEP: false, IGPT: false, IVES: 6.09, ALAI: 1.03, CHAT: 5.27 },
      tonyNote: 'Micron Technology Inc appears in 6 of 7 AI & ML ETFs (86% coverage) with average weight 4.7% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 6, proScore: 4.61, coverage: 0.857,
      price: 470.45, weeklyPrices: [456.34, 461.04, 463.39, 467.16, 470.45], weeklyChange: 4.64, sortRank: 0, periodReturns: { '1M': 55, '6M': 130.9, '1Y': 324.9 },
      marketCap: '$767B', pe: 156.3, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.46, ARTY: 7.18, BAI: 4.62, IVEP: false, IGPT: false, IVES: 7.12, ALAI: 0.97, CHAT: 5.54 },
      tonyNote: 'Advanced Micro Devices Inc appears in 6 of 7 AI & ML ETFs (86% coverage) with average weight 4.6% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 6, proScore: 3.52, coverage: 0.857,
      price: 414.8, weeklyPrices: [402.36, 406.50, 408.58, 411.90, 414.80], weeklyChange: 0.05, sortRank: 0, periodReturns: { '1M': -1.9, '6M': 21.9, '1Y': 79.9 },
      marketCap: '$2.0T', pe: 80.7, revenueGrowth: 30, eps: 5.14, grossMargin: 77, dividendYield: 0.63,
      etfPresence: { AIS: 0.8, ARTY: 3.92, BAI: 5.36, IVEP: false, IGPT: false, IVES: 4.79, ALAI: 4.54, CHAT: 3.38 },
      tonyNote: 'Broadcom Inc appears in 6 of 7 AI & ML ETFs (86% coverage) with average weight 3.5% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 4, proScore: 3.32, coverage: 0.571,
      price: 406.88, weeklyPrices: [394.67, 398.74, 400.78, 404.03, 406.88], weeklyChange: -0.07, sortRank: 0, periodReturns: { '1M': 5, '6M': 47.9, '1Y': 107.4 },
      marketCap: '$2.1T', pe: 35.1, revenueGrowth: 35, eps: 11.6, grossMargin: 62, dividendYield: 0.93,
      etfPresence: { AIS: 3.34, ARTY: false, BAI: 4.31, IVEP: false, IGPT: false, IVES: 4.51, ALAI: 5.41, CHAT: false },
      tonyNote: 'Taiwan Semiconductor Manufacturing Co Ltd appears in 4 of 7 AI & ML ETFs (57% coverage) with average weight 3.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 3, proScore: 3.28, coverage: 0.429,
      price: 386.96, weeklyPrices: [375.35, 379.22, 381.16, 384.25, 386.96], weeklyChange: -0.18, sortRank: 0, periodReturns: { '1M': 14, '6M': 29.1, '1Y': 126.5 },
      marketCap: '$4.7T', pe: 29.5, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.92, IVEP: false, IGPT: false, IVES: 4.8, ALAI: false, CHAT: 6.32 },
      tonyNote: 'ALPHABET INC CLASS A appears in 3 of 7 AI & ML ETFs (43% coverage) with average weight 3.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 3, proScore: 3.28, coverage: 0.429,
      price: 269, weeklyPrices: [260.93, 263.62, 264.96, 267.12, 269.00], weeklyChange: 0.2, sortRank: 0, periodReturns: { '1M': 5.3, '6M': 21.9, '1Y': 32.5 },
      marketCap: '$2.9T', pe: 31.7, revenueGrowth: 17, eps: 8.48, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.87, ALAI: 6.43, CHAT: 3.71 },
      tonyNote: 'AMAZON.COM INC appears in 3 of 7 AI & ML ETFs (43% coverage) with average weight 3.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, proScore: 2.78, coverage: 0.571,
      price: 419.2, weeklyPrices: [406.62, 410.82, 412.91, 416.27, 419.20], weeklyChange: 0.03, sortRank: 0, periodReturns: { '1M': -3.2, '6M': -11.2, '1Y': -7.8 },
      marketCap: '$3.1T', pe: 24.9, revenueGrowth: 18, eps: 16.81, grossMargin: 68, dividendYield: 0.87,
      etfPresence: { AIS: false, ARTY: 1.96, BAI: false, IVEP: false, IGPT: false, IVES: 4.05, ALAI: 5.48, CHAT: 3.23 },
      tonyNote: 'MICROSOFT CORP appears in 4 of 7 AI & ML ETFs (57% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 3, proScore: 2.47, coverage: 0.429,
      price: 196.45, weeklyPrices: [190.56, 192.52, 193.50, 195.07, 196.45], weeklyChange: 3.02, sortRank: 0, periodReturns: { '1M': 24.9, '6M': 153.6, '1Y': 217.6 },
      marketCap: '$172B', pe: 64, revenueGrowth: 22, eps: 3.07, grossMargin: 51, dividendYield: 0.13,
      etfPresence: { AIS: 3.33, ARTY: 6.64, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.33 },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 3 of 7 AI & ML ETFs (43% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc. Class C', easyScore: 1, proScore: 2.39, coverage: 0.143,
      price: 383.19, weeklyPrices: [371.69, 375.53, 377.44, 380.51, 383.19], weeklyChange: -0.07, sortRank: 0, periodReturns: { '1M': 13.5, '6M': 27.9, '1Y': 122.8 },
      marketCap: '$4.6T', pe: 29.2, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 6.32, CHAT: false },
      tonyNote: 'Alphabet Inc. Class C appears in 1 of 7 AI & ML ETFs (14% coverage) with average weight 2.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'META PLATFORMS INC-CLASS A', easyScore: 3, proScore: 2.29, coverage: 0.429,
      price: 610.2, weeklyPrices: [591.89, 598.00, 601.05, 605.93, 610.20], weeklyChange: 0.46, sortRank: 0, periodReturns: { '1M': -9.6, '6M': 2.7, '1Y': -4.1 },
      marketCap: '$1.5T', pe: 22.2, revenueGrowth: 33, eps: 27.51, grossMargin: 82, dividendYield: 0.35,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 3.67, ALAI: 4.24, CHAT: 2.59 },
      tonyNote: 'META PLATFORMS INC-CLASS A appears in 3 of 7 AI & ML ETFs (43% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 4, proScore: 2.27, coverage: 0.571,
      price: 1051.37, weeklyPrices: [1019.83, 1030.34, 1035.60, 1044.01, 1051.37], weeklyChange: 0.72, sortRank: 0, periodReturns: { '1M': -6.8, '6M': 89.1, '1Y': 129.1 },
      marketCap: '$283B', pe: 30.7, revenueGrowth: 16, eps: 34.24, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { AIS: 3.11, ARTY: false, BAI: false, IVEP: 4.08, IGPT: false, IVES: 3.62, ALAI: 1.22, CHAT: false },
      tonyNote: 'GE Vernova Inc appears in 4 of 7 AI & ML ETFs (57% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NBIS', name: 'NEBIUS GROUP NV', easyScore: 3, proScore: 2.24, coverage: 0.429,
      price: 218.83, weeklyPrices: [212.27, 214.45, 215.55, 217.30, 218.83], weeklyChange: -0.5, sortRank: 0, periodReturns: { '1M': 40.1, '6M': 162.8, '1Y': 478.9 },
      marketCap: '$56B', pe: 84.2, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 3.1, ALAI: 4.29, CHAT: 2.88 },
      tonyNote: 'NEBIUS GROUP NV appears in 3 of 7 AI & ML ETFs (43% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, proScore: 2.14, coverage: 0.571,
      price: 329.77, weeklyPrices: [319.88, 323.17, 324.82, 327.46, 329.77], weeklyChange: 1.97, sortRank: 0, periodReturns: { '1M': 8.1, '6M': 106.3, '1Y': 216.5 },
      marketCap: '$127B', pe: 82.9, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 4.21, ARTY: false, BAI: 2.02, IVEP: 4.13, IGPT: false, IVES: false, ALAI: false, CHAT: 0.96 },
      tonyNote: 'Vertiv Holdings Co appears in 4 of 7 AI & ML ETFs (57% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AAPL', name: 'APPLE INC', easyScore: 2, proScore: 2.11, coverage: 0.286,
      price: 310.87, weeklyPrices: [301.54, 304.65, 306.21, 308.69, 310.87], weeklyChange: 1.93, sortRank: 0, periodReturns: { '1M': 13.8, '6M': 14.5, '1Y': 54.4 },
      marketCap: '$4.6T', pe: 37.6, revenueGrowth: 17, eps: 8.27, grossMargin: 48, dividendYield: 0.35,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.7, ALAI: 3.2, CHAT: false },
      tonyNote: 'APPLE INC appears in 2 of 7 AI & ML ETFs (29% coverage) with average weight 2.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 5, proScore: 2.06, coverage: 0.714,
      price: 486.94, weeklyPrices: [472.33, 477.20, 479.64, 483.53, 486.94], weeklyChange: 0.1, sortRank: 0, periodReturns: { '1M': 25.1, '6M': 249.8, '1Y': 877 },
      marketCap: '$168B', pe: 29.1, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.12,
      etfPresence: { AIS: 1.51, ARTY: 2.64, BAI: 2.68, IVEP: false, IGPT: false, IVES: false, ALAI: 4.22, CHAT: 1.14 },
      tonyNote: 'Western Digital Corp appears in 5 of 7 AI & ML ETFs (71% coverage) with average weight 2.1% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 3, proScore: 2.01, coverage: 0.429,
      price: 192.92, weeklyPrices: [187.13, 189.06, 190.03, 191.57, 192.92], weeklyChange: 1.66, sortRank: 0, periodReturns: { '1M': 2.9, '6M': -2.9, '1Y': 22.6 },
      marketCap: '$555B', pe: 34.6, revenueGrowth: 22, eps: 5.58, grossMargin: 67, dividendYield: 1.05,
      etfPresence: { AIS: false, ARTY: 4.05, BAI: false, IVEP: false, IGPT: false, IVES: 3.6, ALAI: false, CHAT: 1.57 },
      tonyNote: 'ORACLE CORP appears in 3 of 7 AI & ML ETFs (43% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CLASS A CORP', easyScore: 2, proScore: 1.96, coverage: 0.286,
      price: 311.86, weeklyPrices: [302.50, 305.62, 307.18, 309.68, 311.86], weeklyChange: 1.29, sortRank: 0, periodReturns: { '1M': 35.7, '6M': 246.5, '1Y': 1597.7 },
      marketCap: '$89B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 1.81, BAI: false, IVEP: 5.51, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'BLOOM ENERGY CLASS A CORP appears in 2 of 7 AI & ML ETFs (29% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 4, proScore: 1.79, coverage: 0.571,
      price: 309.3, weeklyPrices: [300.02, 303.11, 304.66, 307.13, 309.30], weeklyChange: 3.85, sortRank: 0, periodReturns: { '1M': 59.4, '6M': 118.1, '1Y': 228 },
      marketCap: '$53B', pe: 207.6, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 1.71, ARTY: 1.57, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 2.55, CHAT: 3.65 },
      tonyNote: 'Astera Labs Inc appears in 4 of 7 AI & ML ETFs (57% coverage) with average weight 1.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 2, proScore: 1.78, coverage: 0.286,
      price: 121.13, weeklyPrices: [117.50, 118.71, 119.31, 120.28, 121.13], weeklyChange: 2.22, sortRank: 0, periodReturns: { '1M': 85.6, '6M': 251.1, '1Y': 489.5 },
      marketCap: '$609B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.58, ARTY: false, BAI: 3.08, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'Intel Corp appears in 2 of 7 AI & ML ETFs (29% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 3, proScore: 5.93, coverage: 1,
      price: 766.94, weeklyPrices: [743.93, 751.60, 755.44, 761.57, 766.94], weeklyChange: 0.64, sortRank: 0, periodReturns: { '1M': 57.3, '6M': 269.8, '1Y': 708.8 },
      marketCap: '$865B', pe: 36.2, revenueGrowth: 196, eps: 21.19, grossMargin: 58, dividendYield: 0.08,
      etfPresence: { SOXX: 9.88, PSI: false, XSD: 2.88, DRAM: 5.03 },
      tonyNote: 'MICRON TECHNOLOGY INC appears in 3 of 3 Semiconductors ETFs (100% coverage) with average weight 5.9% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 2, proScore: 5.07, coverage: 0.667,
      price: 470.45, weeklyPrices: [456.34, 461.04, 463.39, 467.16, 470.45], weeklyChange: 4.64, sortRank: 0, periodReturns: { '1M': 55, '6M': 130.9, '1Y': 324.9 },
      marketCap: '$767B', pe: 156.3, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 8.95, PSI: false, XSD: 3.46, DRAM: false },
      tonyNote: 'ADVANCED MICRO DEVICES INC appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 5.1% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION CORP', easyScore: 2, proScore: 4.43, coverage: 0.667,
      price: 121.13, weeklyPrices: [117.50, 118.71, 119.31, 120.28, 121.13], weeklyChange: 2.22, sortRank: 0, periodReturns: { '1M': 85.6, '6M': 251.1, '1Y': 489.5 },
      marketCap: '$609B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.94, PSI: false, XSD: 3.91, DRAM: false },
      tonyNote: 'INTEL CORPORATION CORP appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 4.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MXL', name: 'MAXLINEAR INC', easyScore: 1, proScore: 4.11, coverage: 0.333,
      price: 97.82, weeklyPrices: [94.89, 95.86, 96.35, 97.14, 97.82], weeklyChange: -1.85, sortRank: 0, periodReturns: { '1M': 188.7, '6M': 619.3, '1Y': 738.3 },
      marketCap: '$9B', pe: null, revenueGrowth: 43, eps: -1.52, grossMargin: 57, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: 7.11, DRAM: false },
      tonyNote: 'MAXLINEAR INC appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 4.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, proScore: 3.91, coverage: 0.667,
      price: 196.45, weeklyPrices: [190.56, 192.52, 193.50, 195.07, 196.45], weeklyChange: 3.02, sortRank: 0, periodReturns: { '1M': 24.9, '6M': 153.6, '1Y': 217.6 },
      marketCap: '$172B', pe: 64, revenueGrowth: 22, eps: 3.07, grossMargin: 51, dividendYield: 0.13,
      etfPresence: { SOXX: 6.24, PSI: false, XSD: 3.34, DRAM: false },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 3.9% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, proScore: 3.62, coverage: 0.667,
      price: 414.8, weeklyPrices: [402.36, 406.50, 408.58, 411.90, 414.80], weeklyChange: 0.05, sortRank: 0, periodReturns: { '1M': -1.9, '6M': 21.9, '1Y': 79.9 },
      marketCap: '$2.0T', pe: 80.7, revenueGrowth: 30, eps: 5.14, grossMargin: 77, dividendYield: 0.63,
      etfPresence: { SOXX: 6.94, PSI: false, XSD: 1.92, DRAM: false },
      tonyNote: 'BROADCOM INC appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 3.6% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 2, proScore: 3.46, coverage: 0.667,
      price: 218.01, weeklyPrices: [211.47, 213.65, 214.74, 216.48, 218.01], weeklyChange: -0.68, sortRank: 0, periodReturns: { '1M': 7.7, '6M': 21.9, '1Y': 64.1 },
      marketCap: '$5.3T', pe: 33.4, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.02,
      etfPresence: { SOXX: 6.62, PSI: false, XSD: 1.87, DRAM: false },
      tonyNote: 'NVIDIA CORP appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 3.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp/DE', easyScore: 1, proScore: 3.15, coverage: 0.333,
      price: 1515.55, weeklyPrices: [1470.08, 1485.24, 1492.82, 1504.94, 1515.55], weeklyChange: -1.73, sortRank: 0, periodReturns: { '1M': 54.8, '6M': 656.9, '1Y': 3906.1 },
      marketCap: '$224B', pe: 51.7, revenueGrowth: 251, eps: 29.3, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 5.46 },
      tonyNote: 'Sandisk Corp/DE appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 3.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, proScore: 2.66, coverage: 0.667,
      price: 239.19, weeklyPrices: [232.01, 234.41, 235.60, 237.52, 239.19], weeklyChange: 12.08, sortRank: 0, periodReturns: { '1M': 75.8, '6M': 46.5, '1Y': 62.3 },
      marketCap: '$252B', pe: 25.7, revenueGrowth: -4, eps: 9.3, grossMargin: 55, dividendYield: 1.72,
      etfPresence: { SOXX: 4.01, PSI: false, XSD: 2.51, DRAM: false },
      tonyNote: 'QUALCOMM INC appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 2.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 1, proScore: 2.64, coverage: 0.333,
      price: 434.41, weeklyPrices: [421.38, 425.72, 427.89, 431.37, 434.41], weeklyChange: 1.65, sortRank: 0, periodReturns: { '1M': 7.7, '6M': 93.9, '1Y': 170.6 },
      marketCap: '$345B', pe: 40.8, revenueGrowth: 11, eps: 10.64, grossMargin: 49, dividendYield: 0.5,
      etfPresence: { SOXX: 4.58, PSI: false, XSD: false, DRAM: false },
      tonyNote: 'APPLIED MATERIAL INC appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 1, proScore: 2.62, coverage: 0.333,
      price: 814.18, weeklyPrices: [789.75, 797.90, 801.97, 808.48, 814.18], weeklyChange: 0.46, sortRank: 0, periodReturns: { '1M': 40.4, '6M': 242.8, '1Y': 647.9 },
      marketCap: '$183B', pe: 77.2, revenueGrowth: 44, eps: 10.54, grossMargin: 42, dividendYield: 0.37,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 4.53 },
      tonyNote: 'Seagate Technology Holdings PLC appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, proScore: 2.51, coverage: 0.667,
      price: 313.08, weeklyPrices: [303.69, 306.82, 308.38, 310.89, 313.08], weeklyChange: 4.92, sortRank: 0, periodReturns: { '1M': 32.5, '6M': 96.4, '1Y': 73.7 },
      marketCap: '$285B', pe: 53.5, revenueGrowth: 19, eps: 5.85, grossMargin: 57, dividendYield: 1.9,
      etfPresence: { SOXX: 3.76, PSI: false, XSD: 2.38, DRAM: false },
      tonyNote: 'TEXAS INSTRUMENT INC appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 2.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, proScore: 2.46, coverage: 0.667,
      price: 309.3, weeklyPrices: [300.02, 303.11, 304.66, 307.13, 309.30], weeklyChange: 3.85, sortRank: 0, periodReturns: { '1M': 59.4, '6M': 118.1, '1Y': 228 },
      marketCap: '$53B', pe: 207.6, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.24, PSI: false, XSD: 3.78, DRAM: false },
      tonyNote: 'ASTERA LABS INC appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 2.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, proScore: 2.43, coverage: 0.667,
      price: 1585.66, weeklyPrices: [1538.09, 1553.95, 1561.88, 1574.56, 1585.66], weeklyChange: 1.56, sortRank: 0, periodReturns: { '1M': 4.2, '6M': 81.8, '1Y': 135.9 },
      marketCap: '$78B', pe: 114.1, revenueGrowth: 26, eps: 13.9, grossMargin: 55, dividendYield: 0.51,
      etfPresence: { SOXX: 3.65, PSI: false, XSD: 2.3, DRAM: false },
      tonyNote: 'MONOLITHIC POWER SYSTEMS INC appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 2.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, proScore: 2.41, coverage: 0.667,
      price: 310.6, weeklyPrices: [301.28, 304.39, 305.94, 308.43, 310.60], weeklyChange: 3.75, sortRank: 0, periodReturns: { '1M': 37.6, '6M': 62.3, '1Y': 58.1 },
      marketCap: '$78B', pe: 29.7, revenueGrowth: 12, eps: 10.45, grossMargin: 56, dividendYield: 1.35,
      etfPresence: { SOXX: 3.53, PSI: false, XSD: 2.36, DRAM: false },
      tonyNote: 'NXP SEMICONDUCTORS NV appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 2.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 1, proScore: 2.3, coverage: 0.333,
      price: 486.94, weeklyPrices: [472.33, 477.20, 479.64, 483.53, 486.94], weeklyChange: 0.1, sortRank: 0, periodReturns: { '1M': 25.1, '6M': 249.8, '1Y': 877 },
      marketCap: '$168B', pe: 29.1, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.12,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 3.99 },
      tonyNote: 'Western Digital Corp appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 2.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, proScore: 2.16, coverage: 0.667,
      price: 115.52, weeklyPrices: [112.05, 113.21, 113.79, 114.71, 115.52], weeklyChange: 5.39, sortRank: 0, periodReturns: { '1M': 29.8, '6M': 147.4, '1Y': 173.2 },
      marketCap: '$45B', pe: 84.9, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.37, PSI: false, XSD: 2.92, DRAM: false },
      tonyNote: 'ON SEMICONDUCTOR CORP appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 2.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVTS', name: 'NAVITAS SEMICONDUCTOR CORP', easyScore: 1, proScore: 2.04, coverage: 0.333,
      price: 28.57, weeklyPrices: [27.71, 28.00, 28.14, 28.37, 28.57], weeklyChange: 17.19, sortRank: 0, periodReturns: { '1M': 54.7, '6M': 277.9, '1Y': 465.7 },
      marketCap: '$7B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: 3.53, DRAM: false },
      tonyNote: 'NAVITAS SEMICONDUCTOR CORP appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 1, proScore: 1.99, coverage: 0.333,
      price: 308.5, weeklyPrices: [299.25, 302.33, 303.87, 306.34, 308.50], weeklyChange: 2.07, sortRank: 0, periodReturns: { '1M': 16.2, '6M': 116.3, '1Y': 273.7 },
      marketCap: '$386B', pe: 58.3, revenueGrowth: 24, eps: 5.29, grossMargin: 50, dividendYield: 0.34,
      etfPresence: { SOXX: 3.45, PSI: false, XSD: false, DRAM: false },
      tonyNote: 'LAM RESEARCH CORP appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, proScore: 1.98, coverage: 0.667,
      price: 93.46, weeklyPrices: [90.66, 91.59, 92.06, 92.81, 93.46], weeklyChange: 2.58, sortRank: 0, periodReturns: { '1M': 13.3, '6M': 83.6, '1Y': 61 },
      marketCap: '$51B', pe: 424.8, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 2,
      etfPresence: { SOXX: 2.67, PSI: false, XSD: 2.18, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 2.0% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'TSLA', name: 'Tesla Inc', easyScore: 2, proScore: 7.17, coverage: 0.333,
      price: 428.43, weeklyPrices: [415.58, 419.86, 422.00, 425.43, 428.43], weeklyChange: 2.53, sortRank: 0, periodReturns: { '1M': 10.6, '6M': 9.6, '1Y': 25.6 },
      marketCap: '$1.6T', pe: 393.1, revenueGrowth: 16, eps: 1.09, grossMargin: 19, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: false, GTEK: false, ARKK: 10.54, MARS: false },
      tonyNote: 'Tesla Inc appears in 2 of 6 Broad Tech ETFs (33% coverage) with average weight 7.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'Microsoft Corp', easyScore: 3, proScore: 6.25, coverage: 0.5,
      price: 419.2, weeklyPrices: [406.62, 410.82, 412.91, 416.27, 419.20], weeklyChange: 0.03, sortRank: 0, periodReturns: { '1M': -3.2, '6M': -11.2, '1Y': -7.8 },
      marketCap: '$3.1T', pe: 24.9, revenueGrowth: 18, eps: 16.81, grossMargin: 68, dividendYield: 0.87,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: 8.19, FDTX: 4.06, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Microsoft Corp appears in 3 of 6 Broad Tech ETFs (50% coverage) with average weight 6.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab Corp', easyScore: 1, proScore: 5.65, coverage: 0.167,
      price: 136.92, weeklyPrices: [132.81, 134.18, 134.87, 135.96, 136.92], weeklyChange: 9.14, sortRank: 0, periodReturns: { '1M': 52.1, '6M': 239.9, '1Y': 430.6 },
      marketCap: '$79B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 13.83 },
      tonyNote: 'Rocket Lab Corp appears in 1 of 6 Broad Tech ETFs (17% coverage) with average weight 5.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC-CL A', easyScore: 2, proScore: 5.46, coverage: 0.333,
      price: 386.96, weeklyPrices: [375.35, 379.22, 381.16, 384.25, 386.96], weeklyChange: -0.18, sortRank: 0, periodReturns: { '1M': 14, '6M': 29.1, '1Y': 126.5 },
      marketCap: '$4.7T', pe: 29.5, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { QQQ: false, QQQA: 4.62, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ALPHABET INC-CL A appears in 2 of 6 Broad Tech ETFs (33% coverage) with average weight 5.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 3, proScore: 5.09, coverage: 0.5,
      price: 269, weeklyPrices: [260.93, 263.62, 264.96, 267.12, 269.00], weeklyChange: 0.2, sortRank: 0, periodReturns: { '1M': 5.3, '6M': 21.9, '1Y': 32.5 },
      marketCap: '$2.9T', pe: 31.7, revenueGrowth: 17, eps: 8.48, grossMargin: 51, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 4.64, GTEK: false, ARKK: 2.68, MARS: false },
      tonyNote: 'Amazon.com Inc appears in 3 of 6 Broad Tech ETFs (50% coverage) with average weight 5.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'Nvidia Corp', easyScore: 3, proScore: 4.91, coverage: 0.5,
      price: 218.01, weeklyPrices: [211.47, 213.65, 214.74, 216.48, 218.01], weeklyChange: -0.68, sortRank: 0, periodReturns: { '1M': 7.7, '6M': 21.9, '1Y': 64.1 },
      marketCap: '$5.3T', pe: 33.4, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.02,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 5.27, GTEK: false, ARKK: 1.29, MARS: false },
      tonyNote: 'Nvidia Corp appears in 3 of 6 Broad Tech ETFs (50% coverage) with average weight 4.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AAPL', name: 'Apple Inc', easyScore: 2, proScore: 4.48, coverage: 0.333,
      price: 310.87, weeklyPrices: [301.54, 304.65, 306.21, 308.69, 310.87], weeklyChange: 1.93, sortRank: 0, periodReturns: { '1M': 13.8, '6M': 14.5, '1Y': 54.4 },
      marketCap: '$4.6T', pe: 37.6, revenueGrowth: 17, eps: 8.27, grossMargin: 48, dividendYield: 0.35,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 1.22, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Apple Inc appears in 2 of 6 Broad Tech ETFs (33% coverage) with average weight 4.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 3, proScore: 4.29, coverage: 0.5,
      price: 610.2, weeklyPrices: [591.89, 598.00, 601.05, 605.93, 610.20], weeklyChange: 0.46, sortRank: 0, periodReturns: { '1M': -9.6, '6M': 2.7, '1Y': -4.1 },
      marketCap: '$1.5T', pe: 22.2, revenueGrowth: 33, eps: 27.51, grossMargin: 82, dividendYield: 0.35,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 3.31, GTEK: false, ARKK: 0.59, MARS: false },
      tonyNote: 'Meta Platforms Inc appears in 3 of 6 Broad Tech ETFs (50% coverage) with average weight 4.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, proScore: 3.84, coverage: 0.333,
      price: 196.45, weeklyPrices: [190.56, 192.52, 193.50, 195.07, 196.45], weeklyChange: 3.02, sortRank: 0, periodReturns: { '1M': 24.9, '6M': 153.6, '1Y': 217.6 },
      marketCap: '$172B', pe: 64, revenueGrowth: 22, eps: 3.07, grossMargin: 51, dividendYield: 0.13,
      etfPresence: { QQQ: false, QQQA: 5.61, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: 7.68, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 2 of 6 Broad Tech ETFs (33% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 2, proScore: 3.48, coverage: 0.333,
      price: 470.45, weeklyPrices: [456.34, 461.04, 463.39, 467.16, 470.45], weeklyChange: 4.64, sortRank: 0, periodReturns: { '1M': 55, '6M': 130.9, '1Y': 324.9 },
      marketCap: '$767B', pe: 156.3, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 6.93, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: 5.14, MARS: false },
      tonyNote: 'ADVANCED MICRO DEVICES appears in 2 of 6 Broad Tech ETFs (33% coverage) with average weight 3.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile Inc', easyScore: 1, proScore: 3.4, coverage: 0.167,
      price: 106.54, weeklyPrices: [103.34, 104.41, 104.94, 105.79, 106.54], weeklyChange: 10.71, sortRank: 0, periodReturns: { '1M': 25.8, '6M': 107.4, '1Y': 336.5 },
      marketCap: '$41B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 8.33 },
      tonyNote: 'AST SpaceMobile Inc appears in 1 of 6 Broad Tech ETFs (17% coverage) with average weight 3.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SATS', name: 'EchoStar Corp', easyScore: 1, proScore: 3.27, coverage: 0.167,
      price: 124.26, weeklyPrices: [120.53, 121.77, 122.40, 123.39, 124.26], weeklyChange: -3.25, sortRank: 0, periodReturns: { '1M': 1.6, '6M': 81.1, '1Y': 493.1 },
      marketCap: '$36B', pe: null, revenueGrowth: -5, eps: -50.21, grossMargin: 27, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 8 },
      tonyNote: 'EchoStar Corp appears in 1 of 6 Broad Tech ETFs (17% coverage) with average weight 3.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 3, proScore: 3.12, coverage: 0.5,
      price: 136.62, weeklyPrices: [132.52, 133.89, 134.57, 135.66, 136.62], weeklyChange: -0.58, sortRank: 0, periodReturns: { '1M': -10.5, '6M': -11.8, '1Y': 11.7 },
      marketCap: '$328B', pe: 153.5, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 7.18, FDTX: 3.01, GTEK: false, ARKK: 3.06, MARS: false },
      tonyNote: 'PALANTIR TECHNOLOGIES INC CLASS A appears in 3 of 6 Broad Tech ETFs (50% coverage) with average weight 3.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ARM', name: 'ARM HOLDINGS PLC-ADR', easyScore: 1, proScore: 3.09, coverage: 0.167,
      price: 308.01, weeklyPrices: [298.77, 301.85, 303.39, 305.85, 308.01], weeklyChange: 3.28, sortRank: 0, periodReturns: { '1M': 56.8, '6M': 134.2, '1Y': 138.4 },
      marketCap: '$328B', pe: 358.2, revenueGrowth: 20, eps: 0.86, grossMargin: 98, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 7.57, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ARM HOLDINGS PLC-ADR appears in 1 of 6 Broad Tech ETFs (17% coverage) with average weight 3.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PANW', name: 'PALO ALTO NETWORKS INC', easyScore: 2, proScore: 2.96, coverage: 0.333,
      price: 258.4, weeklyPrices: [250.65, 253.23, 254.52, 256.59, 258.40], weeklyChange: 2.17, sortRank: 0, periodReturns: { '1M': 42.6, '6M': 41.3, '1Y': 38.8 },
      marketCap: '$210B', pe: 143.6, revenueGrowth: 15, eps: 1.8, grossMargin: 74, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 7.49, FDTX: 2.76, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'PALO ALTO NETWORKS INC appears in 2 of 6 Broad Tech ETFs (33% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORP', easyScore: 1, proScore: 2.93, coverage: 0.167,
      price: 121.13, weeklyPrices: [117.50, 118.71, 119.31, 120.28, 121.13], weeklyChange: 2.22, sortRank: 0, periodReturns: { '1M': 85.6, '6M': 251.1, '1Y': 489.5 },
      marketCap: '$609B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 7.18, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'INTEL CORP appears in 1 of 6 Broad Tech ETFs (17% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 2, proScore: 2.86, coverage: 0.333,
      price: 192.92, weeklyPrices: [187.13, 189.06, 190.03, 191.57, 192.92], weeklyChange: 1.66, sortRank: 0, periodReturns: { '1M': 2.9, '6M': -2.9, '1Y': 22.6 },
      marketCap: '$555B', pe: 34.6, revenueGrowth: 22, eps: 5.58, grossMargin: 67, dividendYield: 1.05,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 9.21, FDTX: 0.7, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ORACLE CORP appears in 2 of 6 Broad Tech ETFs (33% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'APP', name: 'APPLOVIN CORP-CLASS A', easyScore: 2, proScore: 2.74, coverage: 0.333,
      price: 490, weeklyPrices: [475.30, 480.20, 482.65, 486.57, 490.00], weeklyChange: 0.85, sortRank: 0, periodReturns: { '1M': 1.3, '6M': -5.8, '1Y': 39.4 },
      marketCap: '$165B', pe: 42.5, revenueGrowth: 59, eps: 11.52, grossMargin: 88, dividendYield: null,
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
      price: 766.94, weeklyPrices: [743.93, 751.60, 755.44, 761.57, 766.94], weeklyChange: 0.64, sortRank: 0, periodReturns: { '1M': 57.3, '6M': 269.8, '1Y': 708.8 },
      marketCap: '$865B', pe: 36.2, revenueGrowth: 196, eps: 21.19, grossMargin: 58, dividendYield: 0.08,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: 5.89, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Micron Technology Inc appears in 1 of 6 Broad Tech ETFs (17% coverage) with average weight 2.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 2, proScore: 7, coverage: 1,
      price: 274.99, weeklyPrices: [266.74, 269.49, 270.87, 273.07, 274.99], weeklyChange: 1.57, sortRank: 0, periodReturns: { '1M': 13.3, '6M': 192.5, '1Y': 376.1 },
      marketCap: '$10B', pe: 53.7, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { POW: 6.05, VOLT: 7.95, PBD: false, PBW: false },
      tonyNote: 'Powell Industries Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 7.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 2, proScore: 5.21, coverage: 1,
      price: 726.82, weeklyPrices: [705.02, 712.28, 715.92, 721.73, 726.82], weeklyChange: 1.38, sortRank: 0, periodReturns: { '1M': 18.4, '6M': 69, '1Y': 119.7 },
      marketCap: '$109B', pe: 99.4, revenueGrowth: 26, eps: 7.31, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.81, VOLT: 5.62, PBD: false, PBW: false },
      tonyNote: 'Quanta Services Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 5.2% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, proScore: 5.03, coverage: 1,
      price: 265.07, weeklyPrices: [257.12, 259.77, 261.09, 263.21, 265.07], weeklyChange: 1.79, sortRank: 0, periodReturns: { '1M': 0.9, '6M': 88.1, '1Y': 265.5 },
      marketCap: '$4B', pe: 64, revenueGrowth: 17, eps: 4.14, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: 3.04, VOLT: 7.02, PBD: false, PBW: false },
      tonyNote: 'Bel Fuse Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 5.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 2, proScore: 4.46, coverage: 1,
      price: 390.02, weeklyPrices: [378.32, 382.22, 384.17, 387.29, 390.02], weeklyChange: 2.23, sortRank: 0, periodReturns: { '1M': -5.8, '6M': 17.6, '1Y': 21.5 },
      marketCap: '$151B', pe: 38.2, revenueGrowth: 17, eps: 10.22, grossMargin: 37, dividendYield: 1.15,
      etfPresence: { POW: 3.8, VOLT: 5.13, PBD: false, PBW: false },
      tonyNote: 'Eaton Corp PLC appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 4.5% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 2, proScore: 3.96, coverage: 1,
      price: 1051.37, weeklyPrices: [1019.83, 1030.34, 1035.60, 1044.01, 1051.37], weeklyChange: 0.72, sortRank: 0, periodReturns: { '1M': -6.8, '6M': 89.1, '1Y': 129.1 },
      marketCap: '$283B', pe: 30.7, revenueGrowth: 16, eps: 34.24, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { POW: 3.57, VOLT: 4.35, PBD: false, PBW: false },
      tonyNote: 'GE Vernova Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 4.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 2, proScore: 3.63, coverage: 1,
      price: 88.63, weeklyPrices: [85.97, 86.86, 87.30, 88.01, 88.63], weeklyChange: -1.18, sortRank: 0, periodReturns: { '1M': -1.5, '6M': 6.2, '1Y': 32.4 },
      marketCap: '$185B', pe: 22.5, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.78,
      etfPresence: { POW: 2.06, VOLT: 5.21, PBD: false, PBW: false },
      tonyNote: 'NextEra Energy Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 3.6% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 2, proScore: 3.44, coverage: 1,
      price: 165.23, weeklyPrices: [160.27, 161.93, 162.75, 164.07, 165.23], weeklyChange: 1.01, sortRank: 0, periodReturns: { '1M': 17.9, '6M': 64.3, '1Y': 154.9 },
      marketCap: '$27B', pe: 56.2, revenueGrowth: 54, eps: 2.94, grossMargin: 37, dividendYield: 0.51,
      etfPresence: { POW: 3.78, VOLT: 3.1, PBD: false, PBW: false },
      tonyNote: 'nVent Electric PLC appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 3.4% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 1, proScore: 3.43, coverage: 0.5,
      price: 311.86, weeklyPrices: [302.50, 305.62, 307.18, 309.68, 311.86], weeklyChange: 1.29, sortRank: 0, periodReturns: { '1M': 35.7, '6M': 246.5, '1Y': 1597.7 },
      marketCap: '$89B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: 4.85, PBD: false, PBW: false },
      tonyNote: 'BLOOM ENERGY CORP appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 3.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, proScore: 3.32, coverage: 0.5,
      price: 265.89, weeklyPrices: [257.91, 260.57, 261.90, 264.03, 265.89], weeklyChange: -0.89, sortRank: 0, periodReturns: { '1M': 0.3, '6M': 215.1, '1Y': 539.9 },
      marketCap: '$12B', pe: 89.2, revenueGrowth: 20, eps: 2.98, grossMargin: 54, dividendYield: null,
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
      price: 467.42, weeklyPrices: [453.40, 458.07, 460.41, 464.15, 467.42], weeklyChange: 1.4, sortRank: 0, periodReturns: { '1M': -15, '6M': 10.8, '1Y': 20 },
      marketCap: '$25B', pe: 27.6, revenueGrowth: 11, eps: 16.92, grossMargin: 36, dividendYield: 1.23,
      etfPresence: { POW: 2.72, VOLT: 3.19, PBD: false, PBW: false },
      tonyNote: 'Hubbell Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 3.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, proScore: 2.84, coverage: 1,
      price: 130.12, weeklyPrices: [126.22, 127.52, 128.17, 129.21, 130.12], weeklyChange: 0.39, sortRank: 0, periodReturns: { '1M': -1.1, '6M': 7.7, '1Y': 27.8 },
      marketCap: '$71B', pe: 19.2, revenueGrowth: 10, eps: 6.77, grossMargin: 47, dividendYield: 2.93,
      etfPresence: { POW: 1.38, VOLT: 4.3, PBD: false, PBW: false },
      tonyNote: 'American Electric Power Co Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 2.8% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OGE', name: 'OGE ENERGY CORP', easyScore: 1, proScore: 2.71, coverage: 0.5,
      price: 48.16, weeklyPrices: [46.72, 47.20, 47.44, 47.82, 48.16], weeklyChange: 0.14, sortRank: 0, periodReturns: { '1M': 4.6, '6M': 8.7, '1Y': 10 },
      marketCap: '$10B', pe: 21.4, revenueGrowth: 1, eps: 2.25, grossMargin: 44, dividendYield: 3.53,
      etfPresence: { POW: false, VOLT: 3.83, PBD: false, PBW: false },
      tonyNote: 'OGE ENERGY CORP appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETR', name: 'ENTERGY CORP', easyScore: 1, proScore: 2.62, coverage: 0.5,
      price: 112.06, weeklyPrices: [108.70, 109.82, 110.38, 111.28, 112.06], weeklyChange: -0.19, sortRank: 0, periodReturns: { '1M': 1.4, '6M': 19.6, '1Y': 37.9 },
      marketCap: '$51B', pe: 28.6, revenueGrowth: 12, eps: 3.92, grossMargin: 47, dividendYield: 2.28,
      etfPresence: { POW: false, VOLT: 3.7, PBD: false, PBW: false },
      tonyNote: 'ENTERGY CORP appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, proScore: 2.57, coverage: 1,
      price: 321.48, weeklyPrices: [311.84, 315.05, 316.66, 319.23, 321.48], weeklyChange: -0.71, sortRank: 0, periodReturns: { '1M': -14.8, '6M': 64, '1Y': 177.3 },
      marketCap: '$13B', pe: 66.7, revenueGrowth: 26, eps: 4.82, grossMargin: 39, dividendYield: 0.12,
      etfPresence: { POW: 0.98, VOLT: 4.16, PBD: false, PBW: false },
      tonyNote: 'Advanced Energy Industries Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 2.6% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ET', name: 'ENERGY TRANSFER LP', easyScore: 1, proScore: 2.55, coverage: 0.5,
      price: 19.98, weeklyPrices: [19.38, 19.58, 19.68, 19.84, 19.98], weeklyChange: -0.15, sortRank: 0, periodReturns: { '1M': 4.8, '6M': 21, '1Y': 11.7 },
      marketCap: '$69B', pe: 16.7, revenueGrowth: 32, eps: 1.2, grossMargin: 19, dividendYield: 6.67,
      etfPresence: { POW: false, VOLT: 3.6, PBD: false, PBW: false },
      tonyNote: 'ENERGY TRANSFER LP appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 1, proScore: 2.41, coverage: 0.5,
      price: 329.77, weeklyPrices: [319.88, 323.17, 324.82, 327.46, 329.77], weeklyChange: 1.97, sortRank: 0, periodReturns: { '1M': 8.1, '6M': 106.3, '1Y': 216.5 },
      marketCap: '$127B', pe: 82.9, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 3.41, PBD: false, PBW: false },
      tonyNote: 'VERTIV HOLDINGS CO appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NI', name: 'NISOURCE INC', easyScore: 1, proScore: 2.35, coverage: 0.5,
      price: 47.55, weeklyPrices: [46.12, 46.60, 46.84, 47.22, 47.55], weeklyChange: -0.34, sortRank: 0, periodReturns: { '1M': 1.5, '6M': 11.2, '1Y': 23.5 },
      marketCap: '$23B', pe: 23.7, revenueGrowth: 8, eps: 2.01, grossMargin: 51, dividendYield: 2.52,
      etfPresence: { POW: false, VOLT: 3.33, PBD: false, PBW: false },
      tonyNote: 'NISOURCE INC appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ENR', name: 'Siemens Energy AG', easyScore: 1, proScore: 2.31, coverage: 0.5,
      price: 17.68, weeklyPrices: [17.15, 17.33, 17.41, 17.56, 17.68], weeklyChange: 2.2, sortRank: 0, periodReturns: { '1M': -11.7, '6M': -3.2, '1Y': -22.5 },
      marketCap: '$1B', pe: 6.5, revenueGrowth: -3, eps: 2.73, grossMargin: 43, dividendYield: 6.94,
      etfPresence: { POW: 3.27, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Siemens Energy AG appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IDA', name: 'IDACORP INC', easyScore: 1, proScore: 2.28, coverage: 0.5,
      price: 141.32, weeklyPrices: [137.08, 138.49, 139.20, 140.33, 141.32], weeklyChange: -0.19, sortRank: 0, periodReturns: { '1M': -1.5, '6M': 10.5, '1Y': 22.8 },
      marketCap: '$8B', pe: 23.6, revenueGrowth: -7, eps: 6, grossMargin: 38, dividendYield: 2.47,
      etfPresence: { POW: false, VOLT: 3.23, PBD: false, PBW: false },
      tonyNote: 'IDACORP INC appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 1, proScore: 5.6, coverage: 1,
      price: 745.09, weeklyPrices: [722.74, 730.19, 733.91, 739.87, 745.09], weeklyChange: 1.54, sortRank: 0, periodReturns: { '1M': 52.7, '6M': 136.5, '1Y': 308.7 },
      marketCap: '$23B', pe: 66.3, revenueGrowth: 92, eps: 11.23, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 5.6, PRN: false },
      tonyNote: 'Sterling Infrastructure, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 5.6% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 1, proScore: 4.37, coverage: 1,
      price: 1848.5, weeklyPrices: [1793.04, 1811.53, 1820.77, 1835.56, 1848.50], weeklyChange: 0.72, sortRank: 0, periodReturns: { '1M': 7.2, '6M': 106.7, '1Y': 299.9 },
      marketCap: '$65B', pe: 53.3, revenueGrowth: 1, eps: 34.69, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: 4.37, PRN: false },
      tonyNote: 'Comfort Systems USA, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 4.4% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MTZ', name: 'MasTec, Inc.', easyScore: 1, proScore: 4.18, coverage: 1,
      price: 386.6, weeklyPrices: [375.00, 378.87, 380.80, 383.89, 386.60], weeklyChange: -0.56, sortRank: 0, periodReturns: { '1M': 2.7, '6M': 100.2, '1Y': 156.4 },
      marketCap: '$31B', pe: 67.7, revenueGrowth: 35, eps: 5.71, grossMargin: 13, dividendYield: null,
      etfPresence: { AIRR: 4.18, PRN: false },
      tonyNote: 'MasTec, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 4.2% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CHRW', name: 'C.H. Robinson Worldwide, Inc.', easyScore: 1, proScore: 4.12, coverage: 1,
      price: 174.6, weeklyPrices: [169.36, 171.11, 171.98, 173.38, 174.60], weeklyChange: -1.98, sortRank: 0, periodReturns: { '1M': -4.2, '6M': 15.1, '1Y': 80.9 },
      marketCap: '$21B', pe: 35.4, revenueGrowth: -1, eps: 4.93, grossMargin: 9, dividendYield: 1.41,
      etfPresence: { AIRR: 4.12, PRN: false },
      tonyNote: 'C.H. Robinson Worldwide, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 4.1% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SAIA', name: 'Saia, Inc.', easyScore: 1, proScore: 4.11, coverage: 1,
      price: 451.5, weeklyPrices: [437.95, 442.47, 444.73, 448.34, 451.50], weeklyChange: -1.47, sortRank: 0, periodReturns: { '1M': 4.6, '6M': 66.3, '1Y': 68.4 },
      marketCap: '$12B', pe: 47.4, revenueGrowth: 2, eps: 9.53, grossMargin: 24, dividendYield: null,
      etfPresence: { AIRR: 4.11, PRN: false },
      tonyNote: 'Saia, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 4.1% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'EME', name: 'EMCOR Group, Inc.', easyScore: 1, proScore: 4.1, coverage: 1,
      price: 852.99, weeklyPrices: [827.40, 835.93, 840.20, 847.02, 852.99], weeklyChange: 0.45, sortRank: 0, periodReturns: { '1M': -0.8, '6M': 46.7, '1Y': 86.1 },
      marketCap: '$38B', pe: 28.6, revenueGrowth: 20, eps: 29.81, grossMargin: 19, dividendYield: 0.15,
      etfPresence: { AIRR: 4.1, PRN: false },
      tonyNote: 'EMCOR Group, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 4.1% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 1, proScore: 4.08, coverage: 1,
      price: 654.32, weeklyPrices: [634.69, 641.23, 644.51, 649.74, 654.32], weeklyChange: 1.5, sortRank: 0, periodReturns: { '1M': 0.4, '6M': 95.1, '1Y': 232.2 },
      marketCap: '$9B', pe: 67.2, revenueGrowth: 13, eps: 9.73, grossMargin: 20, dividendYield: 0.31,
      etfPresence: { AIRR: 4.08, PRN: false },
      tonyNote: 'Argan, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 4.1% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 1, proScore: 3.3, coverage: 1,
      price: 204.5, weeklyPrices: [198.36, 200.41, 201.43, 203.07, 204.50], weeklyChange: 0.98, sortRank: 0, periodReturns: { '1M': -6.7, '6M': 20.4, '1Y': 90 },
      marketCap: '$19B', pe: 54.5, revenueGrowth: 26, eps: 3.75, grossMargin: 23, dividendYield: 0.51,
      etfPresence: { AIRR: 3.3, PRN: false },
      tonyNote: 'BWX Technologies, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 3.3% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DY', name: 'Dycom Industries, Inc.', easyScore: 1, proScore: 3.29, coverage: 1,
      price: 415.32, weeklyPrices: [402.86, 407.01, 409.09, 412.41, 415.32], weeklyChange: 0.21, sortRank: 0, periodReturns: { '1M': 1.8, '6M': 27.2, '1Y': 85.2 },
      marketCap: '$12B', pe: 43.4, revenueGrowth: 34, eps: 9.57, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: 3.29, PRN: false },
      tonyNote: 'Dycom Industries, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 3.3% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OC', name: 'Owens Corning', easyScore: 1, proScore: 3.04, coverage: 1,
      price: 116.67, weeklyPrices: [113.17, 114.34, 114.92, 115.85, 116.67], weeklyChange: 0.53, sortRank: 0, periodReturns: { '1M': -5.1, '6M': 12, '1Y': -13.7 },
      marketCap: '$9B', pe: null, revenueGrowth: -10, eps: -4.85, grossMargin: 27, dividendYield: 2.55,
      etfPresence: { AIRR: 3.04, PRN: false },
      tonyNote: 'Owens Corning appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 3.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 1, proScore: 2.96, coverage: 1,
      price: 317.69, weeklyPrices: [308.16, 311.34, 312.92, 315.47, 317.69], weeklyChange: 0.04, sortRank: 0, periodReturns: { '1M': -13.4, '6M': 4, '1Y': 41.5 },
      marketCap: '$13B', pe: 20.6, revenueGrowth: 13, eps: 15.4, grossMargin: 12, dividendYield: 1.74,
      etfPresence: { AIRR: 2.96, PRN: false },
      tonyNote: 'Huntington Ingalls Industries, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 3.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 1, proScore: 2.84, coverage: 1,
      price: 55.29, weeklyPrices: [53.63, 54.18, 54.46, 54.90, 55.29], weeklyChange: 1.13, sortRank: 0, periodReturns: { '1M': -19.4, '6M': -20, '1Y': 57.1 },
      marketCap: '$10B', pe: 325.2, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.84, PRN: false },
      tonyNote: 'Kratos Defense & Security Solutions, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 2.8% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 1, proScore: 2.63, coverage: 1,
      price: 64.34, weeklyPrices: [62.41, 63.05, 63.37, 63.89, 64.34], weeklyChange: -1.47, sortRank: 0, periodReturns: { '1M': -21.6, '6M': 7.1, '1Y': 50.8 },
      marketCap: '$9B', pe: 279.7, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 2.63, PRN: false },
      tonyNote: 'Karman Holdings Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 2.6% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 1, proScore: 2.51, coverage: 1,
      price: 274.99, weeklyPrices: [266.74, 269.49, 270.87, 273.07, 274.99], weeklyChange: 1.57, sortRank: 0, periodReturns: { '1M': 13.3, '6M': 192.5, '1Y': 376.1 },
      marketCap: '$10B', pe: 53.7, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { AIRR: 2.51, PRN: false },
      tonyNote: 'Powell Industries, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 2.5% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CLH', name: 'Clean Harbors, Inc.', easyScore: 1, proScore: 2.46, coverage: 1,
      price: 282.93, weeklyPrices: [274.44, 277.27, 278.69, 280.95, 282.93], weeklyChange: 0.13, sortRank: 0, periodReturns: { '1M': -7.1, '6M': 30.4, '1Y': 24.2 },
      marketCap: '$15B', pe: 38.4, revenueGrowth: 2, eps: 7.37, grossMargin: 32, dividendYield: null,
      etfPresence: { AIRR: 2.46, PRN: false },
      tonyNote: 'Clean Harbors, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 2.5% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FNB', name: 'F.N.B. Corporation', easyScore: 1, proScore: 2.38, coverage: 1,
      price: 17.5, weeklyPrices: [16.97, 17.15, 17.24, 17.38, 17.50], weeklyChange: 0.14, sortRank: 0, periodReturns: { '1M': -0.8, '6M': 9.1, '1Y': 25.7 },
      marketCap: '$6B', pe: 10.8, revenueGrowth: 10, eps: 1.62, grossMargin: 0, dividendYield: 2.97,
      etfPresence: { AIRR: 2.38, PRN: false },
      tonyNote: 'F.N.B. Corporation appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 2.4% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CNM', name: 'Core & Main, Inc. (Class A)', easyScore: 1, proScore: 2.16, coverage: 1,
      price: 47.52, weeklyPrices: [46.09, 46.57, 46.81, 47.19, 47.52], weeklyChange: 0.76, sortRank: 0, periodReturns: { '1M': -2.9, '6M': 4.1, '1Y': -10.7 },
      marketCap: '$9B', pe: 20.6, revenueGrowth: -7, eps: 2.31, grossMargin: 27, dividendYield: null,
      etfPresence: { AIRR: 2.16, PRN: false },
      tonyNote: 'Core & Main, Inc. (Class A) appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 2.2% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WMS', name: 'Advanced Drainage Systems, Inc.', easyScore: 1, proScore: 2.11, coverage: 1,
      price: 131.78, weeklyPrices: [127.83, 129.14, 129.80, 130.86, 131.78], weeklyChange: -2.49, sortRank: 0, periodReturns: { '1M': -14.3, '6M': -10.2, '1Y': 18.7 },
      marketCap: '$10B', pe: 24.2, revenueGrowth: 10, eps: 5.45, grossMargin: 38, dividendYield: 0.59,
      etfPresence: { AIRR: 2.11, PRN: false },
      tonyNote: 'Advanced Drainage Systems, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 2.1% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KEX', name: 'Kirby Corporation', easyScore: 1, proScore: 1.95, coverage: 1,
      price: 142.91, weeklyPrices: [138.62, 140.05, 140.77, 141.91, 142.91], weeklyChange: -1.86, sortRank: 0, periodReturns: { '1M': -3.6, '6M': 32.7, '1Y': 33.3 },
      marketCap: '$8B', pe: 22, revenueGrowth: 7, eps: 6.49, grossMargin: 34, dividendYield: null,
      etfPresence: { AIRR: 1.95, PRN: false },
      tonyNote: 'Kirby Corporation appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 1.9% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IESC', name: 'IES Holdings, Inc.', easyScore: 1, proScore: 1.91, coverage: 1,
      price: 646, weeklyPrices: [626.62, 633.08, 636.31, 641.48, 646.00], weeklyChange: -0.28, sortRank: 0, periodReturns: { '1M': 11, '6M': 74, '1Y': 167.1 },
      marketCap: '$13B', pe: 34.4, revenueGrowth: 17, eps: 18.77, grossMargin: 26, dividendYield: null,
      etfPresence: { AIRR: 1.91, PRN: false },
      tonyNote: 'IES Holdings, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 1.9% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
