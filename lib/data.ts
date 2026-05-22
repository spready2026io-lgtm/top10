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
  'AI & ML':         8,
  'Semiconductors':  4,
  'Broad Tech':      8,
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
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 7, proScore: 6.07, coverage: 0.875,
      price: 219.51, weeklyPrices: [212.92, 215.12, 216.22, 217.97, 219.51], weeklyChange: -1.77, sortRank: 0, periodReturns: { '1M': 9.8, '6M': 21.5, '1Y': 65.3 },
      marketCap: '$5.3T', pe: 33.7, revenueGrowth: 73, eps: 6.52, grossMargin: 71, dividendYield: 0.02,
      etfPresence: { AIS: 2.86, ARTY: 4.24, BAI: 5.71, IVEP: false, IGPT: 6.75, IVES: 4.87, ALAI: 14.3, CHAT: 6.7 },
      tonyNote: 'NVIDIA Corp appears in 7 of 8 AI & ML ETFs (88% coverage) with average weight 6.1% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 7, proScore: 5.34, coverage: 0.875,
      price: 762.1, weeklyPrices: [739.24, 746.86, 750.67, 756.77, 762.10], weeklyChange: 4.11, sortRank: 0, periodReturns: { '1M': 69.6, '6M': 278.5, '1Y': 703.6 },
      marketCap: '$859B', pe: 36, revenueGrowth: 196, eps: 21.19, grossMargin: 58, dividendYield: 0.08,
      etfPresence: { AIS: 7.26, ARTY: 6.29, BAI: 4.24, IVEP: false, IGPT: 10, IVES: 5.92, ALAI: 1.01, CHAT: 5.27 },
      tonyNote: 'Micron Technology Inc appears in 7 of 8 AI & ML ETFs (88% coverage) with average weight 5.3% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 7, proScore: 4.99, coverage: 0.875,
      price: 449.59, weeklyPrices: [436.10, 440.60, 442.85, 446.44, 449.59], weeklyChange: 0.45, sortRank: 0, periodReturns: { '1M': 58, '6M': 118.2, '1Y': 306.1 },
      marketCap: '$733B', pe: 149.4, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.46, ARTY: 7.38, BAI: 4.75, IVEP: false, IGPT: 7.05, IVES: 7.19, ALAI: 0.98, CHAT: 5.54 },
      tonyNote: 'Advanced Micro Devices Inc appears in 7 of 8 AI & ML ETFs (88% coverage) with average weight 5.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 4, proScore: 3.95, coverage: 0.5,
      price: 387.66, weeklyPrices: [376.03, 379.91, 381.85, 384.95, 387.66], weeklyChange: -0.32, sortRank: 0, periodReturns: { '1M': 16.7, '6M': 33.9, '1Y': 126.9 },
      marketCap: '$4.7T', pe: 29.6, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: 4.07, IVEP: false, IGPT: 7.09, IVES: 4.89, ALAI: false, CHAT: 6.32 },
      tonyNote: 'ALPHABET INC CLASS A appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 4.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 6, proScore: 3.38, coverage: 0.75,
      price: 414.57, weeklyPrices: [402.13, 406.28, 408.35, 411.67, 414.57], weeklyChange: -0.76, sortRank: 0, periodReturns: { '1M': 3.1, '6M': 19.5, '1Y': 79.8 },
      marketCap: '$2.0T', pe: 80.7, revenueGrowth: 30, eps: 5.14, grossMargin: 77, dividendYield: 0.63,
      etfPresence: { AIS: 0.8, ARTY: 4.08, BAI: 5.58, IVEP: false, IGPT: false, IVES: 4.89, ALAI: 4.65, CHAT: 3.38 },
      tonyNote: 'Broadcom Inc appears in 6 of 8 AI & ML ETFs (75% coverage) with average weight 3.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 4, proScore: 3.12, coverage: 0.5,
      price: 407.15, weeklyPrices: [394.94, 399.01, 401.04, 404.30, 407.15], weeklyChange: 1.38, sortRank: 0, periodReturns: { '1M': 10.6, '6M': 46.7, '1Y': 107.5 },
      marketCap: '$2.1T', pe: 35.1, revenueGrowth: 35, eps: 11.6, grossMargin: 62, dividendYield: 0.93,
      etfPresence: { AIS: 3.34, ARTY: false, BAI: 4.39, IVEP: false, IGPT: false, IVES: 4.51, ALAI: 5.42, CHAT: false },
      tonyNote: 'Taiwan Semiconductor Manufacturing Co Ltd appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 3.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 3, proScore: 3.07, coverage: 0.375,
      price: 268.46, weeklyPrices: [260.41, 263.09, 264.43, 266.58, 268.46], weeklyChange: 1.3, sortRank: 0, periodReturns: { '1M': 7.4, '6M': 23.6, '1Y': 32.2 },
      marketCap: '$2.9T', pe: 31.7, revenueGrowth: 17, eps: 8.48, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.87, ALAI: 6.44, CHAT: 3.71 },
      tonyNote: 'AMAZON.COM INC appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 3.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 3, proScore: 2.98, coverage: 0.375,
      price: 118.5, weeklyPrices: [114.94, 116.13, 116.72, 117.67, 118.50], weeklyChange: -0.39, sortRank: 0, periodReturns: { '1M': 78.8, '6M': 252.5, '1Y': 476.6 },
      marketCap: '$596B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.58, ARTY: false, BAI: 3.2, IVEP: false, IGPT: 7.8, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'Intel Corp appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 4, proScore: 2.8, coverage: 0.5,
      price: 607.38, weeklyPrices: [589.16, 595.23, 598.27, 603.13, 607.38], weeklyChange: 0.38, sortRank: 0, periodReturns: { '1M': -9.2, '6M': 3.1, '1Y': -4.6 },
      marketCap: '$1.5T', pe: 22.1, revenueGrowth: 33, eps: 27.51, grossMargin: 82, dividendYield: 0.35,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: 5.25, IVES: 3.71, ALAI: 4.31, CHAT: 2.59 },
      tonyNote: 'Meta Platforms Inc appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, proScore: 2.65, coverage: 0.5,
      price: 419.09, weeklyPrices: [406.52, 410.71, 412.80, 416.16, 419.09], weeklyChange: -0.47, sortRank: 0, periodReturns: { '1M': -1.2, '6M': -12.4, '1Y': -7.9 },
      marketCap: '$3.1T', pe: 24.9, revenueGrowth: 18, eps: 16.81, grossMargin: 68, dividendYield: 0.87,
      etfPresence: { AIS: false, ARTY: 2.04, BAI: false, IVEP: false, IGPT: false, IVES: 4.12, ALAI: 5.59, CHAT: 3.23 },
      tonyNote: 'MICROSOFT CORP appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 3, proScore: 2.32, coverage: 0.375,
      price: 190.69, weeklyPrices: [184.97, 186.88, 187.83, 189.36, 190.69], weeklyChange: 2.08, sortRank: 0, periodReturns: { '1M': 26, '6M': 148.7, '1Y': 208.3 },
      marketCap: '$167B', pe: 62.1, revenueGrowth: 22, eps: 3.07, grossMargin: 51, dividendYield: 0.13,
      etfPresence: { AIS: 3.33, ARTY: 6.72, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.33 },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 2.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc. Class C', easyScore: 1, proScore: 2.28, coverage: 0.125,
      price: 383.47, weeklyPrices: [371.97, 375.80, 377.72, 380.79, 383.47], weeklyChange: -0.37, sortRank: 0, periodReturns: { '1M': 16, '6M': 32.2, '1Y': 123 },
      marketCap: '$4.6T', pe: 29.3, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 6.44, CHAT: false },
      tonyNote: 'Alphabet Inc. Class C appears in 1 of 8 AI & ML ETFs (13% coverage) with average weight 2.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 6, proScore: 2.14, coverage: 0.75,
      price: 486.46, weeklyPrices: [471.87, 476.73, 479.16, 483.05, 486.46], weeklyChange: 5.84, sortRank: 0, periodReturns: { '1M': 26.7, '6M': 246.9, '1Y': 876 },
      marketCap: '$168B', pe: 29.1, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.12,
      etfPresence: { AIS: 1.51, ARTY: 2.57, BAI: 2.61, IVEP: false, IGPT: 2.94, IVES: false, ALAI: 4.05, CHAT: 1.14 },
      tonyNote: 'Western Digital Corp appears in 6 of 8 AI & ML ETFs (75% coverage) with average weight 2.1% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 4, proScore: 2.12, coverage: 0.5,
      price: 1043.82, weeklyPrices: [1012.51, 1022.94, 1028.16, 1036.51, 1043.82], weeklyChange: 1.88, sortRank: 0, periodReturns: { '1M': 5.3, '6M': 87.1, '1Y': 127.5 },
      marketCap: '$280B', pe: 30.5, revenueGrowth: 16, eps: 34.22, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { AIS: 3.11, ARTY: false, BAI: false, IVEP: 4.07, IGPT: false, IVES: 3.6, ALAI: 1.21, CHAT: false },
      tonyNote: 'GE Vernova Inc appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, proScore: 2, coverage: 0.5,
      price: 323.4, weeklyPrices: [313.70, 316.93, 318.55, 321.14, 323.40], weeklyChange: 2.45, sortRank: 0, periodReturns: { '1M': 3.5, '6M': 102.6, '1Y': 210.4 },
      marketCap: '$124B', pe: 81.3, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 4.21, ARTY: false, BAI: 2.04, IVEP: 4.09, IGPT: false, IVES: false, ALAI: false, CHAT: 0.96 },
      tonyNote: 'Vertiv Holdings Co appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AAPL', name: 'APPLE INC', easyScore: 2, proScore: 1.99, coverage: 0.25,
      price: 304.99, weeklyPrices: [295.84, 298.89, 300.42, 302.86, 304.99], weeklyChange: 0.91, sortRank: 0, periodReturns: { '1M': 14.6, '6M': 14.6, '1Y': 51.5 },
      marketCap: '$4.5T', pe: 36.9, revenueGrowth: 17, eps: 8.27, grossMargin: 48, dividendYield: 0.35,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.72, ALAI: 3.22, CHAT: false },
      tonyNote: 'APPLE INC appears in 2 of 8 AI & ML ETFs (25% coverage) with average weight 2.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 3, proScore: 1.91, coverage: 0.375,
      price: 189.77, weeklyPrices: [184.08, 185.97, 186.92, 188.44, 189.77], weeklyChange: 0.86, sortRank: 0, periodReturns: { '1M': 4.7, '6M': -9.9, '1Y': 20.6 },
      marketCap: '$546B', pe: 34, revenueGrowth: 22, eps: 5.58, grossMargin: 67, dividendYield: 1.05,
      etfPresence: { AIS: false, ARTY: 4.15, BAI: false, IVEP: false, IGPT: false, IVES: 3.61, ALAI: false, CHAT: 1.57 },
      tonyNote: 'ORACLE CORP appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 1.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NBIS', name: 'NEBIUS GROUP NV', easyScore: 3, proScore: 1.91, coverage: 0.375,
      price: 219.93, weeklyPrices: [213.33, 215.53, 216.63, 218.39, 219.93], weeklyChange: 14.65, sortRank: 0, periodReturns: { '1M': 40.5, '6M': 159.8, '1Y': 481.8 },
      marketCap: '$56B', pe: 84.6, revenueGrowth: 622, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 2.74, ALAI: 3.72, CHAT: 2.88 },
      tonyNote: 'NEBIUS GROUP NV appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 1.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, proScore: 1.85, coverage: 0.5,
      price: 810.46, weeklyPrices: [786.15, 794.25, 798.30, 804.79, 810.46], weeklyChange: 7.91, sortRank: 0, periodReturns: { '1M': 44.8, '6M': 237, '1Y': 644.5 },
      marketCap: '$182B', pe: 76.9, revenueGrowth: 44, eps: 10.54, grossMargin: 42, dividendYield: 0.37,
      etfPresence: { AIS: 2.7, ARTY: 2.88, BAI: false, IVEP: false, IGPT: 3.09, IVES: false, ALAI: 1.82, CHAT: false },
      tonyNote: 'Seagate Technology Holdings PLC appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CLASS A CORP', easyScore: 2, proScore: 1.71, coverage: 0.25,
      price: 307.88, weeklyPrices: [298.64, 301.72, 303.26, 305.72, 307.88], weeklyChange: 9.06, sortRank: 0, periodReturns: { '1M': 39.4, '6M': 229.7, '1Y': 1576 },
      marketCap: '$88B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 1.71, BAI: false, IVEP: 5.14, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'BLOOM ENERGY CLASS A CORP appears in 2 of 8 AI & ML ETFs (25% coverage) with average weight 1.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MXL', name: 'MaxLinear Inc', easyScore: 2, proScore: 5.96, coverage: 0.5,
      price: 99.67, weeklyPrices: [96.68, 97.68, 98.17, 98.97, 99.67], weeklyChange: 3, sortRank: 0, periodReturns: { '1M': 195.8, '6M': 663.8, '1Y': 754.1 },
      marketCap: '$9B', pe: null, revenueGrowth: 43, eps: -1.52, grossMargin: 57, dividendYield: null,
      etfPresence: { SOXX: false, PSI: 9.8, XSD: 7.06, DRAM: false },
      tonyNote: 'MaxLinear Inc appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 6.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, proScore: 5.84, coverage: 1,
      price: 762.1, weeklyPrices: [739.24, 746.86, 750.67, 756.77, 762.10], weeklyChange: 4.11, sortRank: 0, periodReturns: { '1M': 69.6, '6M': 278.5, '1Y': 703.6 },
      marketCap: '$859B', pe: 36, revenueGrowth: 196, eps: 21.19, grossMargin: 58, dividendYield: 0.08,
      etfPresence: { SOXX: 9.58, PSI: 5.94, XSD: 2.83, DRAM: 5.03 },
      tonyNote: 'MICRON TECHNOLOGY INC appears in 4 of 4 Semiconductors ETFs (100% coverage) with average weight 5.8% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, proScore: 5.66, coverage: 0.75,
      price: 449.59, weeklyPrices: [436.10, 440.60, 442.85, 446.44, 449.59], weeklyChange: 0.45, sortRank: 0, periodReturns: { '1M': 58, '6M': 118.2, '1Y': 306.1 },
      marketCap: '$733B', pe: 149.4, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 9, PSI: 7.09, XSD: 3.53, DRAM: false },
      tonyNote: 'ADVANCED MICRO DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 5.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION CORP', easyScore: 2, proScore: 3.91, coverage: 0.5,
      price: 118.5, weeklyPrices: [114.94, 116.13, 116.72, 117.67, 118.50], weeklyChange: -0.39, sortRank: 0, periodReturns: { '1M': 78.8, '6M': 252.5, '1Y': 476.6 },
      marketCap: '$596B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 7.04, PSI: false, XSD: 4.01, DRAM: false },
      tonyNote: 'INTEL CORPORATION CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 3.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 3, proScore: 3.86, coverage: 0.75,
      price: 414.57, weeklyPrices: [402.13, 406.28, 408.35, 411.67, 414.57], weeklyChange: -0.76, sortRank: 0, periodReturns: { '1M': 3.1, '6M': 19.5, '1Y': 79.8 },
      marketCap: '$2.0T', pe: 80.7, revenueGrowth: 30, eps: 5.14, grossMargin: 77, dividendYield: 0.63,
      etfPresence: { SOXX: 7.06, PSI: 4.35, XSD: 1.98, DRAM: false },
      tonyNote: 'BROADCOM INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.9% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, proScore: 3.66, coverage: 0.75,
      price: 219.51, weeklyPrices: [212.92, 215.12, 216.22, 217.97, 219.51], weeklyChange: -1.77, sortRank: 0, periodReturns: { '1M': 9.8, '6M': 21.5, '1Y': 65.3 },
      marketCap: '$5.3T', pe: 33.7, revenueGrowth: 73, eps: 6.52, grossMargin: 71, dividendYield: 0.02,
      etfPresence: { SOXX: 6.81, PSI: 3.93, XSD: 1.94, DRAM: false },
      tonyNote: 'NVIDIA CORP appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, proScore: 3.36, coverage: 0.5,
      price: 190.69, weeklyPrices: [184.97, 186.88, 187.83, 189.36, 190.69], weeklyChange: 2.08, sortRank: 0, periodReturns: { '1M': 26, '6M': 148.7, '1Y': 208.3 },
      marketCap: '$167B', pe: 62.1, revenueGrowth: 22, eps: 3.07, grossMargin: 51, dividendYield: 0.13,
      etfPresence: { SOXX: 6.17, PSI: false, XSD: 3.34, DRAM: false },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 3.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 3, proScore: 3.24, coverage: 0.75,
      price: 298.39, weeklyPrices: [289.44, 292.42, 293.91, 296.30, 298.39], weeklyChange: -2.13, sortRank: 0, periodReturns: { '1M': 28, '6M': 94.6, '1Y': 65.6 },
      marketCap: '$272B', pe: 51, revenueGrowth: 19, eps: 5.85, grossMargin: 57, dividendYield: 1.9,
      etfPresence: { SOXX: 3.88, PSI: 4.84, XSD: 2.48, DRAM: false },
      tonyNote: 'TEXAS INSTRUMENT INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, proScore: 2.98, coverage: 0.5,
      price: 427.36, weeklyPrices: [414.54, 418.81, 420.95, 424.37, 427.36], weeklyChange: 0.12, sortRank: 0, periodReturns: { '1M': 8.4, '6M': 94.1, '1Y': 166.2 },
      marketCap: '$339B', pe: 40.2, revenueGrowth: 11, eps: 10.64, grossMargin: 49, dividendYield: 0.5,
      etfPresence: { SOXX: 4.61, PSI: 3.83, XSD: false, DRAM: false },
      tonyNote: 'APPLIED MATERIAL INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 3.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp/DE', easyScore: 1, proScore: 2.73, coverage: 0.25,
      price: 1542.24, weeklyPrices: [1495.97, 1511.40, 1519.11, 1531.44, 1542.24], weeklyChange: 10.75, sortRank: 0, periodReturns: { '1M': 70.7, '6M': 687, '1Y': 3975.7 },
      marketCap: '$228B', pe: 52.6, revenueGrowth: 251, eps: 29.3, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 5.46 },
      tonyNote: 'Sandisk Corp/DE appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, proScore: 2.62, coverage: 0.5,
      price: 302.24, weeklyPrices: [293.17, 296.20, 297.71, 300.12, 302.24], weeklyChange: 3.47, sortRank: 0, periodReturns: { '1M': 17, '6M': 116.5, '1Y': 266.1 },
      marketCap: '$378B', pe: 57.1, revenueGrowth: 24, eps: 5.29, grossMargin: 50, dividendYield: 0.34,
      etfPresence: { SOXX: 3.37, PSI: 4.05, XSD: false, DRAM: false },
      tonyNote: 'LAM RESEARCH CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, proScore: 2.61, coverage: 0.5,
      price: 1842.18, weeklyPrices: [1786.91, 1805.34, 1814.55, 1829.28, 1842.18], weeklyChange: 0.69, sortRank: 0, periodReturns: { '1M': 3.2, '6M': 67.1, '1Y': 140 },
      marketCap: '$241B', pe: 52.1, revenueGrowth: 12, eps: 35.37, grossMargin: 61, dividendYield: 0.5,
      etfPresence: { SOXX: 3.24, PSI: 4.13, XSD: false, DRAM: false },
      tonyNote: 'KLA CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 3, proScore: 2.42, coverage: 0.75,
      price: 1561.25, weeklyPrices: [1514.41, 1530.02, 1537.83, 1550.32, 1561.25], weeklyChange: 0.51, sortRank: 0, periodReturns: { '1M': 2.2, '6M': 82.1, '1Y': 132.3 },
      marketCap: '$77B', pe: 112.3, revenueGrowth: 26, eps: 13.9, grossMargin: 55, dividendYield: 0.51,
      etfPresence: { SOXX: 3.67, PSI: 2.37, XSD: 2.34, DRAM: false },
      tonyNote: 'MONOLITHIC POWER SYSTEMS INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 2.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 3, proScore: 2.4, coverage: 0.75,
      price: 109.61, weeklyPrices: [106.32, 107.42, 107.97, 108.84, 109.61], weeklyChange: -0.54, sortRank: 0, periodReturns: { '1M': 26.1, '6M': 144.1, '1Y': 159.2 },
      marketCap: '$43B', pe: 80.6, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.41, PSI: 2.91, XSD: 3, DRAM: false },
      tonyNote: 'ON SEMICONDUCTOR CORP appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 2.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 1, proScore: 2.27, coverage: 0.25,
      price: 810.46, weeklyPrices: [786.15, 794.25, 798.30, 804.79, 810.46], weeklyChange: 7.91, sortRank: 0, periodReturns: { '1M': 44.8, '6M': 237, '1Y': 644.5 },
      marketCap: '$182B', pe: 76.9, revenueGrowth: 44, eps: 10.54, grossMargin: 42, dividendYield: 0.37,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 4.53 },
      tonyNote: 'Seagate Technology Holdings PLC appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SITM', name: 'SiTime Corp', easyScore: 2, proScore: 2.26, coverage: 0.5,
      price: 711.79, weeklyPrices: [690.44, 697.55, 701.11, 706.81, 711.79], weeklyChange: 2.12, sortRank: 0, periodReturns: { '1M': 35.9, '6M': 181.6, '1Y': 248.9 },
      marketCap: '$19B', pe: null, revenueGrowth: 88, eps: -0.93, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: false, PSI: 3.18, XSD: 3.21, DRAM: false },
      tonyNote: 'SiTime Corp appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, proScore: 2.22, coverage: 0.5,
      price: 213.41, weeklyPrices: [207.01, 209.14, 210.21, 211.92, 213.41], weeklyChange: 5.38, sortRank: 0, periodReturns: { '1M': 57.4, '6M': 33.7, '1Y': 44.8 },
      marketCap: '$225B', pe: 22.9, revenueGrowth: -4, eps: 9.3, grossMargin: 55, dividendYield: 1.72,
      etfPresence: { SOXX: 3.84, PSI: false, XSD: 2.44, DRAM: false },
      tonyNote: 'QUALCOMM INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, proScore: 2.19, coverage: 0.5,
      price: 299.38, weeklyPrices: [290.40, 293.39, 294.89, 297.28, 299.38], weeklyChange: -3.47, sortRank: 0, periodReturns: { '1M': 33.4, '6M': 62.5, '1Y': 52.3 },
      marketCap: '$76B', pe: 28.6, revenueGrowth: 12, eps: 10.45, grossMargin: 56, dividendYield: 1.35,
      etfPresence: { SOXX: 3.69, PSI: false, XSD: 2.5, DRAM: false },
      tonyNote: 'NXP SEMICONDUCTORS NV appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 3, proScore: 2.13, coverage: 0.75,
      price: 91.11, weeklyPrices: [88.38, 89.29, 89.74, 90.47, 91.11], weeklyChange: -3.1, sortRank: 0, periodReturns: { '1M': 12.6, '6M': 85.9, '1Y': 57 },
      marketCap: '$49B', pe: 414.1, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 2,
      etfPresence: { SOXX: 2.78, PSI: 2.29, XSD: 2.31, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 2.1% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, proScore: 2.09, coverage: 0.5,
      price: 297.84, weeklyPrices: [288.90, 291.88, 293.37, 295.76, 297.84], weeklyChange: 3.6, sortRank: 0, periodReturns: { '1M': 55.1, '6M': 113.8, '1Y': 215.8 },
      marketCap: '$51B', pe: 199.9, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.18, PSI: false, XSD: 3.73, DRAM: false },
      tonyNote: 'ASTERA LABS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'TSLA', name: 'Tesla Inc', easyScore: 3, proScore: 5.8, coverage: 0.375,
      price: 417.85, weeklyPrices: [405.31, 409.49, 411.58, 414.93, 417.85], weeklyChange: 0.14, sortRank: 0, periodReturns: { '1M': 8.1, '6M': 5.7, '1Y': 22.5 },
      marketCap: '$1.6T', pe: 383.3, revenueGrowth: 16, eps: 1.09, grossMargin: 19, dividendYield: null,
      etfPresence: { QQQ: 3.43, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: false, GTEK: false, ARKK: 10.68, MARS: false },
      tonyNote: 'Tesla Inc appears in 3 of 8 Broad Tech ETFs (38% coverage) with average weight 5.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'Microsoft Corp', easyScore: 4, proScore: 5.6, coverage: 0.5,
      price: 419.09, weeklyPrices: [406.52, 410.71, 412.80, 416.16, 419.09], weeklyChange: -0.47, sortRank: 0, periodReturns: { '1M': -1.2, '6M': -12.4, '1Y': -7.9 },
      marketCap: '$3.1T', pe: 24.9, revenueGrowth: 18, eps: 16.81, grossMargin: 68, dividendYield: 0.87,
      etfPresence: { QQQ: 5.14, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: 8.17, FDTX: 4.06, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Microsoft Corp appears in 4 of 8 Broad Tech ETFs (50% coverage) with average weight 5.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 5, proScore: 5.52, coverage: 0.625,
      price: 219.51, weeklyPrices: [212.92, 215.12, 216.22, 217.97, 219.51], weeklyChange: -1.77, sortRank: 0, periodReturns: { '1M': 9.8, '6M': 21.5, '1Y': 65.3 },
      marketCap: '$5.3T', pe: 33.7, revenueGrowth: 73, eps: 6.52, grossMargin: 71, dividendYield: 0.02,
      etfPresence: { QQQ: 8.93, QQQA: false, PTF: 5.11, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 5.27, GTEK: false, ARKK: 1.33, MARS: false },
      tonyNote: 'NVIDIA Corp appears in 5 of 8 Broad Tech ETFs (63% coverage) with average weight 5.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab Corp', easyScore: 1, proScore: 4.89, coverage: 0.125,
      price: 125.45, weeklyPrices: [121.69, 122.94, 123.57, 124.57, 125.45], weeklyChange: -6.58, sortRank: 0, periodReturns: { '1M': 44.8, '6M': 217.8, '1Y': 385.9 },
      marketCap: '$73B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 13.83 },
      tonyNote: 'Rocket Lab Corp appears in 1 of 8 Broad Tech ETFs (13% coverage) with average weight 4.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AAPL', name: 'Apple Inc', easyScore: 4, proScore: 4.87, coverage: 0.5,
      price: 304.99, weeklyPrices: [295.84, 298.89, 300.42, 302.86, 304.99], weeklyChange: 0.91, sortRank: 0, periodReturns: { '1M': 14.6, '6M': 14.6, '1Y': 51.5 },
      marketCap: '$4.5T', pe: 36.9, revenueGrowth: 17, eps: 8.27, grossMargin: 48, dividendYield: 0.35,
      etfPresence: { QQQ: 7.3, QQQA: false, PTF: 4.77, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 1.22, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Apple Inc appears in 4 of 8 Broad Tech ETFs (50% coverage) with average weight 4.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 4, proScore: 4.65, coverage: 0.5,
      price: 268.46, weeklyPrices: [260.41, 263.09, 264.43, 266.58, 268.46], weeklyChange: 1.3, sortRank: 0, periodReturns: { '1M': 7.4, '6M': 23.6, '1Y': 32.2 },
      marketCap: '$2.9T', pe: 31.7, revenueGrowth: 17, eps: 8.48, grossMargin: 51, dividendYield: null,
      etfPresence: { QQQ: 4.68, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 4.64, GTEK: false, ARKK: 2.69, MARS: false },
      tonyNote: 'Amazon.com Inc appears in 4 of 8 Broad Tech ETFs (50% coverage) with average weight 4.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'Alphabet Inc Class A', easyScore: 4, proScore: 4.37, coverage: 0.5,
      price: 387.66, weeklyPrices: [376.03, 379.91, 381.85, 384.95, 387.66], weeklyChange: -0.32, sortRank: 0, periodReturns: { '1M': 16.7, '6M': 33.9, '1Y': 126.9 },
      marketCap: '$4.7T', pe: 29.6, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { QQQ: 3.73, QQQA: 4.62, PTF: 2.1, WCLD: false, MAGS: 14.29, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Alphabet Inc Class A appears in 4 of 8 Broad Tech ETFs (50% coverage) with average weight 4.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 4, proScore: 3.74, coverage: 0.5,
      price: 607.38, weeklyPrices: [589.16, 595.23, 598.27, 603.13, 607.38], weeklyChange: 0.38, sortRank: 0, periodReturns: { '1M': -9.2, '6M': 3.1, '1Y': -4.6 },
      marketCap: '$1.5T', pe: 22.1, revenueGrowth: 33, eps: 27.51, grossMargin: 82, dividendYield: 0.35,
      etfPresence: { QQQ: 2.94, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 3.31, GTEK: false, ARKK: 0.6, MARS: false },
      tonyNote: 'Meta Platforms Inc appears in 4 of 8 Broad Tech ETFs (50% coverage) with average weight 3.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 3, proScore: 3.15, coverage: 0.375,
      price: 449.59, weeklyPrices: [436.10, 440.60, 442.85, 446.44, 449.59], weeklyChange: 0.45, sortRank: 0, periodReturns: { '1M': 58, '6M': 118.2, '1Y': 306.1 },
      marketCap: '$733B', pe: 149.4, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { QQQ: 3.31, QQQA: 6.93, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: 5.19, MARS: false },
      tonyNote: 'Advanced Micro Devices Inc appears in 3 of 8 Broad Tech ETFs (38% coverage) with average weight 3.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'Marvell Technology Inc', easyScore: 3, proScore: 2.86, coverage: 0.375,
      price: 190.69, weeklyPrices: [184.97, 186.88, 187.83, 189.36, 190.69], weeklyChange: 2.08, sortRank: 0, periodReturns: { '1M': 26, '6M': 148.7, '1Y': 208.3 },
      marketCap: '$167B', pe: 62.1, revenueGrowth: 22, eps: 3.07, grossMargin: 51, dividendYield: 0.13,
      etfPresence: { QQQ: 0.74, QQQA: 5.61, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: 7.68, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Marvell Technology Inc appears in 3 of 8 Broad Tech ETFs (38% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SATS', name: 'EchoStar Corp', easyScore: 1, proScore: 2.83, coverage: 0.125,
      price: 128.44, weeklyPrices: [124.59, 125.87, 126.51, 127.54, 128.44], weeklyChange: -9.42, sortRank: 0, periodReturns: { '1M': 3.7, '6M': 91, '1Y': 513.1 },
      marketCap: '$37B', pe: null, revenueGrowth: -5, eps: -50.21, grossMargin: 27, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 8 },
      tonyNote: 'EchoStar Corp appears in 1 of 8 Broad Tech ETFs (13% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 3, proScore: 2.77, coverage: 0.375,
      price: 762.1, weeklyPrices: [739.24, 746.86, 750.67, 756.77, 762.10], weeklyChange: 4.11, sortRank: 0, periodReturns: { '1M': 69.6, '6M': 278.5, '1Y': 703.6 },
      marketCap: '$859B', pe: 36, revenueGrowth: 196, eps: 21.19, grossMargin: 58, dividendYield: 0.08,
      etfPresence: { QQQ: 3.74, QQQA: false, PTF: 3.93, WCLD: false, MAGS: false, IGV: false, FDTX: 5.89, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Micron Technology Inc appears in 3 of 8 Broad Tech ETFs (38% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ARM', name: 'ARM HOLDINGS PLC-ADR', easyScore: 1, proScore: 2.68, coverage: 0.125,
      price: 298.23, weeklyPrices: [289.28, 292.27, 293.76, 296.14, 298.23], weeklyChange: 16.16, sortRank: 0, periodReturns: { '1M': 69.9, '6M': 125, '1Y': 130.7 },
      marketCap: '$317B', pe: 346.8, revenueGrowth: 20, eps: 0.86, grossMargin: 98, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 7.57, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ARM HOLDINGS PLC-ADR appears in 1 of 8 Broad Tech ETFs (13% coverage) with average weight 2.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'Palantir Technologies Inc', easyScore: 4, proScore: 2.59, coverage: 0.5,
      price: 137.41, weeklyPrices: [133.29, 134.66, 135.35, 136.45, 137.41], weeklyChange: 0.19, sortRank: 0, periodReturns: { '1M': -5.9, '6M': -11.8, '1Y': 12.4 },
      marketCap: '$329B', pe: 154.4, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { QQQ: 1.43, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 7.11, FDTX: 3.01, GTEK: false, ARKK: 3.1, MARS: false },
      tonyNote: 'Palantir Technologies Inc appears in 4 of 8 Broad Tech ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile Inc', easyScore: 2, proScore: 2.52, coverage: 0.25,
      price: 96.23, weeklyPrices: [93.34, 94.31, 94.79, 95.56, 96.23], weeklyChange: 7.42, sortRank: 0, periodReturns: { '1M': 20.3, '6M': 89.8, '1Y': 294.2 },
      marketCap: '$37B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: 1.75, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 8.33 },
      tonyNote: 'AST SpaceMobile Inc appears in 2 of 8 Broad Tech ETFs (25% coverage) with average weight 2.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 2, proScore: 2.47, coverage: 0.25,
      price: 118.5, weeklyPrices: [114.94, 116.13, 116.72, 117.67, 118.50], weeklyChange: -0.39, sortRank: 0, periodReturns: { '1M': 78.8, '6M': 252.5, '1Y': 476.6 },
      marketCap: '$596B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { QQQ: 2.7, QQQA: 7.18, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Intel Corp appears in 2 of 8 Broad Tech ETFs (25% coverage) with average weight 2.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 2, proScore: 2.44, coverage: 0.25,
      price: 189.77, weeklyPrices: [184.08, 185.97, 186.92, 188.44, 189.77], weeklyChange: 0.86, sortRank: 0, periodReturns: { '1M': 4.7, '6M': -9.9, '1Y': 20.6 },
      marketCap: '$546B', pe: 34, revenueGrowth: 22, eps: 5.58, grossMargin: 67, dividendYield: 1.05,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 9.06, FDTX: 0.7, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ORACLE CORP appears in 2 of 8 Broad Tech ETFs (25% coverage) with average weight 2.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, proScore: 2.33, coverage: 0.5,
      price: 810.46, weeklyPrices: [786.15, 794.25, 798.30, 804.79, 810.46], weeklyChange: 7.91, sortRank: 0, periodReturns: { '1M': 44.8, '6M': 237, '1Y': 644.5 },
      marketCap: '$182B', pe: 76.9, revenueGrowth: 44, eps: 10.54, grossMargin: 42, dividendYield: 0.37,
      etfPresence: { QQQ: 0.74, QQQA: 6.09, PTF: 4.34, WCLD: false, MAGS: false, IGV: false, FDTX: 2.02, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Seagate Technology Holdings PLC appears in 4 of 8 Broad Tech ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OHB', name: 'OHB SE', easyScore: 1, proScore: 2.28, coverage: 0.125,
      price: 0, weeklyPrices: [0.00, 0.00, 0.00, 0.00, 0.00], weeklyChange: 0, sortRank: 0, periodReturns: { '1M': 0, '6M': 0, '1Y': 0 },
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 6.45 },
      tonyNote: 'OHB SE appears in 1 of 8 Broad Tech ETFs (13% coverage) with average weight 2.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks Inc', easyScore: 3, proScore: 2.23, coverage: 0.375,
      price: 252.92, weeklyPrices: [245.33, 247.86, 249.13, 251.15, 252.92], weeklyChange: 2.54, sortRank: 0, periodReturns: { '1M': 44.6, '6M': 36.7, '1Y': 35.9 },
      marketCap: '$205B', pe: 140.5, revenueGrowth: 15, eps: 1.8, grossMargin: 74, dividendYield: null,
      etfPresence: { QQQ: 0.91, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 7.24, FDTX: 2.76, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Palo Alto Networks Inc appears in 3 of 8 Broad Tech ETFs (38% coverage) with average weight 2.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 3, proScore: 4.57, coverage: 0.75,
      price: 270.75, weeklyPrices: [262.63, 265.33, 266.69, 268.85, 270.75], weeklyChange: -0.11, sortRank: 0, periodReturns: { '1M': 12.4, '6M': 175.9, '1Y': 368.8 },
      marketCap: '$10B', pe: 52.9, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { POW: 6.05, VOLT: 8.04, PBD: false, PBW: 1.75 },
      tonyNote: 'Powell Industries Inc appears in 3 of 4 Electrification ETFs (75% coverage) with average weight 4.6% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 3, proScore: 3.43, coverage: 0.75,
      price: 716.91, weeklyPrices: [695.40, 702.57, 706.16, 711.89, 716.91], weeklyChange: 0.98, sortRank: 0, periodReturns: { '1M': 18.3, '6M': 66.8, '1Y': 116.7 },
      marketCap: '$108B', pe: 98.1, revenueGrowth: 26, eps: 7.31, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.81, VOLT: 5.63, PBD: false, PBW: 1.45 },
      tonyNote: 'Quanta Services Inc appears in 3 of 4 Electrification ETFs (75% coverage) with average weight 3.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 3, proScore: 3.28, coverage: 0.75,
      price: 260.4, weeklyPrices: [252.59, 255.19, 256.49, 258.58, 260.40], weeklyChange: 2.22, sortRank: 0, periodReturns: { '1M': 1.2, '6M': 93.8, '1Y': 259 },
      marketCap: '$4B', pe: 62.9, revenueGrowth: 17, eps: 4.14, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: 3.04, VOLT: 6.94, PBD: false, PBW: 1.38 },
      tonyNote: 'Bel Fuse Inc appears in 3 of 4 Electrification ETFs (75% coverage) with average weight 3.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 2, proScore: 3.16, coverage: 0.5,
      price: 381.51, weeklyPrices: [370.06, 373.88, 375.79, 378.84, 381.51], weeklyChange: 0.48, sortRank: 0, periodReturns: { '1M': -6.9, '6M': 16.2, '1Y': 18.8 },
      marketCap: '$148B', pe: 37.3, revenueGrowth: 17, eps: 10.22, grossMargin: 37, dividendYield: 1.15,
      etfPresence: { POW: 3.8, VOLT: 5.15, PBD: false, PBW: false },
      tonyNote: 'Eaton Corp PLC appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 3.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 2, proScore: 2.79, coverage: 0.5,
      price: 1043.82, weeklyPrices: [1012.51, 1022.94, 1028.16, 1036.51, 1043.82], weeklyChange: 1.88, sortRank: 0, periodReturns: { '1M': 5.3, '6M': 87.1, '1Y': 127.5 },
      marketCap: '$280B', pe: 30.5, revenueGrowth: 16, eps: 34.22, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { POW: 3.57, VOLT: 4.32, PBD: false, PBW: false },
      tonyNote: 'GE Vernova Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 2, proScore: 2.56, coverage: 0.5,
      price: 89.69, weeklyPrices: [87.00, 87.90, 88.34, 89.06, 89.69], weeklyChange: 1.61, sortRank: 0, periodReturns: { '1M': -1, '6M': 6.4, '1Y': 34 },
      marketCap: '$187B', pe: 22.8, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.78,
      etfPresence: { POW: 2.06, VOLT: 5.18, PBD: false, PBW: false },
      tonyNote: 'NextEra Energy Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 3, proScore: 2.44, coverage: 0.75,
      price: 307.88, weeklyPrices: [298.64, 301.72, 303.26, 305.72, 307.88], weeklyChange: 9.06, sortRank: 0, periodReturns: { '1M': 39.4, '6M': 229.7, '1Y': 1576 },
      marketCap: '$88B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: 4.49, PBD: 1.63, PBW: 2.33 },
      tonyNote: 'BLOOM ENERGY CORP appears in 3 of 4 Electrification ETFs (75% coverage) with average weight 2.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 2, proScore: 2.43, coverage: 0.5,
      price: 163.57, weeklyPrices: [158.66, 160.30, 161.12, 162.43, 163.57], weeklyChange: 1.06, sortRank: 0, periodReturns: { '1M': 19.4, '6M': 61.1, '1Y': 152.3 },
      marketCap: '$26B', pe: 55.6, revenueGrowth: 54, eps: 2.94, grossMargin: 37, dividendYield: 0.51,
      etfPresence: { POW: 3.78, VOLT: 3.1, PBD: false, PBW: false },
      tonyNote: 'nVent Electric PLC appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, proScore: 2.35, coverage: 0.25,
      price: 268.29, weeklyPrices: [260.24, 262.92, 264.27, 266.41, 268.29], weeklyChange: 1.55, sortRank: 0, periodReturns: { '1M': 9, '6M': 222.2, '1Y': 545.7 },
      marketCap: '$12B', pe: 90, revenueGrowth: 20, eps: 2.98, grossMargin: 54, dividendYield: null,
      etfPresence: { POW: 4.69, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Vicor Corp appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 2.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, proScore: 2.02, coverage: 0.5,
      price: 129.61, weeklyPrices: [125.72, 127.02, 127.67, 128.70, 129.61], weeklyChange: 0.57, sortRank: 0, periodReturns: { '1M': -1.7, '6M': 7.2, '1Y': 27.3 },
      marketCap: '$71B', pe: 19.1, revenueGrowth: 10, eps: 6.77, grossMargin: 47, dividendYield: 2.93,
      etfPresence: { POW: 1.38, VOLT: 4.32, PBD: false, PBW: false },
      tonyNote: 'American Electric Power Co Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PRY', name: 'Prysmian SpA', easyScore: 2, proScore: 1.97, coverage: 0.5,
      price: 0, weeklyPrices: [0.00, 0.00, 0.00, 0.00, 0.00], weeklyChange: 0, sortRank: 0, periodReturns: { '1M': 0, '6M': 0, '1Y': 0 },
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { POW: 4.45, VOLT: false, PBD: 1.11, PBW: false },
      tonyNote: 'Prysmian SpA appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 3, proScore: 1.93, coverage: 0.75,
      price: 460.98, weeklyPrices: [447.15, 451.76, 454.07, 457.75, 460.98], weeklyChange: -0.51, sortRank: 0, periodReturns: { '1M': -16, '6M': 13.2, '1Y': 18.4 },
      marketCap: '$24B', pe: 27.3, revenueGrowth: 11, eps: 16.91, grossMargin: 36, dividendYield: 1.23,
      etfPresence: { POW: 2.72, VOLT: 3.24, PBD: 0.72, PBW: false },
      tonyNote: 'Hubbell Inc appears in 3 of 4 Electrification ETFs (75% coverage) with average weight 1.9% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OGE', name: 'OGE ENERGY CORP', easyScore: 1, proScore: 1.93, coverage: 0.25,
      price: 48.1, weeklyPrices: [46.66, 47.14, 47.38, 47.76, 48.10], weeklyChange: 0.42, sortRank: 0, periodReturns: { '1M': 3.4, '6M': 9, '1Y': 9.8 },
      marketCap: '$10B', pe: 21.4, revenueGrowth: 1, eps: 2.25, grossMargin: 44, dividendYield: 3.53,
      etfPresence: { POW: false, VOLT: 3.85, PBD: false, PBW: false },
      tonyNote: 'OGE ENERGY CORP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETR', name: 'ENTERGY CORP', easyScore: 1, proScore: 1.86, coverage: 0.25,
      price: 112.27, weeklyPrices: [108.90, 110.02, 110.59, 111.48, 112.27], weeklyChange: 0.3, sortRank: 0, periodReturns: { '1M': 0.9, '6M': 20.3, '1Y': 38.1 },
      marketCap: '$51B', pe: 28.6, revenueGrowth: 12, eps: 3.92, grossMargin: 47, dividendYield: 2.28,
      etfPresence: { POW: false, VOLT: 3.72, PBD: false, PBW: false },
      tonyNote: 'ENTERGY CORP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ET', name: 'ENERGY TRANSFER LP', easyScore: 1, proScore: 1.83, coverage: 0.25,
      price: 20.01, weeklyPrices: [19.41, 19.61, 19.71, 19.87, 20.01], weeklyChange: -0.74, sortRank: 0, periodReturns: { '1M': 5.5, '6M': 20.3, '1Y': 11.9 },
      marketCap: '$69B', pe: 16.7, revenueGrowth: 32, eps: 1.2, grossMargin: 19, dividendYield: 6.67,
      etfPresence: { POW: false, VOLT: 3.66, PBD: false, PBW: false },
      tonyNote: 'ENERGY TRANSFER LP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FCEL', name: 'FuelCell Energy Inc', easyScore: 1, proScore: 1.8, coverage: 0.25,
      price: 26.38, weeklyPrices: [25.59, 25.85, 25.98, 26.20, 26.38], weeklyChange: 30.46, sortRank: 0, periodReturns: { '1M': 178, '6M': 320.1, '1Y': 476 },
      marketCap: '$1B', pe: null, revenueGrowth: 61, eps: -6.49, grossMargin: -16, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 3.6 },
      tonyNote: 'FuelCell Energy Inc appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 1, proScore: 1.68, coverage: 0.25,
      price: 323.4, weeklyPrices: [313.70, 316.93, 318.55, 321.14, 323.40], weeklyChange: 2.45, sortRank: 0, periodReturns: { '1M': 3.5, '6M': 102.6, '1Y': 210.4 },
      marketCap: '$124B', pe: 81.3, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 3.36, PBD: false, PBW: false },
      tonyNote: 'VERTIV HOLDINGS CO appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NI', name: 'NISOURCE INC', easyScore: 1, proScore: 1.66, coverage: 0.25,
      price: 47.71, weeklyPrices: [46.28, 46.76, 46.99, 47.38, 47.71], weeklyChange: 1.47, sortRank: 0, periodReturns: { '1M': 1.7, '6M': 12.5, '1Y': 23.9 },
      marketCap: '$23B', pe: 23.7, revenueGrowth: 8, eps: 2.01, grossMargin: 51, dividendYield: 2.52,
      etfPresence: { POW: false, VOLT: 3.32, PBD: false, PBW: false },
      tonyNote: 'NISOURCE INC appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ENR', name: 'Siemens Energy AG', easyScore: 1, proScore: 1.64, coverage: 0.25,
      price: 17.3, weeklyPrices: [16.78, 16.95, 17.04, 17.18, 17.30], weeklyChange: 4.28, sortRank: 0, periodReturns: { '1M': -12.4, '6M': -2.1, '1Y': -24.2 },
      marketCap: '$1B', pe: 6.3, revenueGrowth: -3, eps: 2.73, grossMargin: 43, dividendYield: 6.94,
      etfPresence: { POW: 3.27, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Siemens Energy AG appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IDA', name: 'IDACORP INC', easyScore: 1, proScore: 1.63, coverage: 0.25,
      price: 141.6, weeklyPrices: [137.35, 138.77, 139.48, 140.61, 141.60], weeklyChange: 0.04, sortRank: 0, periodReturns: { '1M': -2, '6M': 11.7, '1Y': 23 },
      marketCap: '$8B', pe: 23.6, revenueGrowth: -7, eps: 6, grossMargin: 38, dividendYield: 2.47,
      etfPresence: { POW: false, VOLT: 3.26, PBD: false, PBW: false },
      tonyNote: 'IDACORP INC appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, proScore: 4.89, coverage: 1,
      price: 733.77, weeklyPrices: [711.76, 719.09, 722.76, 728.63, 733.77], weeklyChange: -2.42, sortRank: 0, periodReturns: { '1M': 55.2, '6M': 133.3, '1Y': 302.5 },
      marketCap: '$23B', pe: 65.3, revenueGrowth: 92, eps: 11.23, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 5.71, PRN: 4.07 },
      tonyNote: 'Sterling Infrastructure, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 4.9% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, proScore: 4.58, coverage: 1,
      price: 1835.33, weeklyPrices: [1780.27, 1798.62, 1807.80, 1822.48, 1835.33], weeklyChange: -0.01, sortRank: 0, periodReturns: { '1M': 9.6, '6M': 109.5, '1Y': 297.1 },
      marketCap: '$65B', pe: 52.9, revenueGrowth: 1, eps: 34.69, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: 4.35, PRN: 4.8 },
      tonyNote: 'Comfort Systems USA, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 4.6% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, proScore: 4.12, coverage: 1,
      price: 644.64, weeklyPrices: [625.30, 631.75, 634.97, 640.13, 644.64], weeklyChange: 2.24, sortRank: 0, periodReturns: { '1M': 4.7, '6M': 82.5, '1Y': 227.3 },
      marketCap: '$9B', pe: 66.3, revenueGrowth: 13, eps: 9.73, grossMargin: 20, dividendYield: 0.31,
      etfPresence: { AIRR: 3.97, PRN: 4.27 },
      tonyNote: 'Argan, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 4.1% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TTMI', name: 'TTM Technologies Inc', easyScore: 1, proScore: 3.93, coverage: 0.5,
      price: 174.55, weeklyPrices: [169.31, 171.06, 171.93, 173.33, 174.55], weeklyChange: 3.06, sortRank: 0, periodReturns: { '1M': 39.4, '6M': 198.6, '1Y': 501.1 },
      marketCap: '$18B', pe: 95.4, revenueGrowth: 30, eps: 1.83, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 5.56 },
      tonyNote: 'TTM Technologies Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MTZ', name: 'MasTec, Inc.', easyScore: 2, proScore: 3.67, coverage: 1,
      price: 388.77, weeklyPrices: [377.11, 380.99, 382.94, 386.05, 388.77], weeklyChange: 1.19, sortRank: 0, periodReturns: { '1M': 4.7, '6M': 102.7, '1Y': 157.9 },
      marketCap: '$31B', pe: 68.1, revenueGrowth: 35, eps: 5.71, grossMargin: 13, dividendYield: null,
      etfPresence: { AIRR: 4.11, PRN: 3.23 },
      tonyNote: 'MasTec, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 3.7% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 1, proScore: 3.39, coverage: 0.5,
      price: 42.48, weeklyPrices: [41.21, 41.63, 41.84, 42.18, 42.48], weeklyChange: -0.42, sortRank: 0, periodReturns: { '1M': 11.7, '6M': 278.3, '1Y': 1051.2 },
      marketCap: '$15B', pe: null, revenueGrowth: 41, eps: -0.8, grossMargin: 56, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 4.8 },
      tonyNote: 'Planet Labs PBC appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 1, proScore: 2.95, coverage: 0.5,
      price: 716.91, weeklyPrices: [695.40, 702.57, 706.16, 711.89, 716.91], weeklyChange: 0.98, sortRank: 0, periodReturns: { '1M': 18.3, '6M': 66.8, '1Y': 116.7 },
      marketCap: '$108B', pe: 98.1, revenueGrowth: 26, eps: 7.31, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { AIRR: false, PRN: 4.18 },
      tonyNote: 'Quanta Services Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CHRW', name: 'C.H. Robinson Worldwide, Inc.', easyScore: 1, proScore: 2.94, coverage: 0.5,
      price: 178.13, weeklyPrices: [172.79, 174.57, 175.46, 176.88, 178.13], weeklyChange: -1.39, sortRank: 0, periodReturns: { '1M': -3, '6M': 19.9, '1Y': 84.6 },
      marketCap: '$21B', pe: 36.1, revenueGrowth: -1, eps: 4.93, grossMargin: 9, dividendYield: 1.41,
      etfPresence: { AIRR: 4.16, PRN: false },
      tonyNote: 'C.H. Robinson Worldwide, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SAIA', name: 'Saia, Inc.', easyScore: 1, proScore: 2.94, coverage: 0.5,
      price: 458.25, weeklyPrices: [444.50, 449.08, 451.38, 455.04, 458.25], weeklyChange: -1.76, sortRank: 0, periodReturns: { '1M': 3.7, '6M': 82.9, '1Y': 71 },
      marketCap: '$12B', pe: 48.1, revenueGrowth: 2, eps: 9.53, grossMargin: 24, dividendYield: null,
      etfPresence: { AIRR: 4.16, PRN: false },
      tonyNote: 'Saia, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'EME', name: 'EMCOR Group, Inc.', easyScore: 1, proScore: 2.9, coverage: 0.5,
      price: 849.2, weeklyPrices: [823.72, 832.22, 836.46, 843.26, 849.20], weeklyChange: -0.46, sortRank: 0, periodReturns: { '1M': 1.3, '6M': 45.6, '1Y': 85.3 },
      marketCap: '$38B', pe: 28.5, revenueGrowth: 20, eps: 29.81, grossMargin: 19, dividendYield: 0.15,
      etfPresence: { AIRR: 4.1, PRN: false },
      tonyNote: 'EMCOR Group, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DY', name: 'Dycom Industries, Inc.', easyScore: 2, proScore: 2.84, coverage: 1,
      price: 414.43, weeklyPrices: [402.00, 406.14, 408.21, 411.53, 414.43], weeklyChange: 0.4, sortRank: 0, periodReturns: { '1M': 2.4, '6M': 28.2, '1Y': 84.8 },
      marketCap: '$12B', pe: 43.3, revenueGrowth: 34, eps: 9.57, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: 3.26, PRN: 2.41 },
      tonyNote: 'Dycom Industries, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 2.8% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JBL', name: 'Jabil Inc', easyScore: 1, proScore: 2.8, coverage: 0.5,
      price: 356.41, weeklyPrices: [345.72, 349.28, 351.06, 353.92, 356.41], weeklyChange: 3.26, sortRank: 0, periodReturns: { '1M': 6.8, '6M': 85.2, '1Y': 115.9 },
      marketCap: '$38B', pe: 48.1, revenueGrowth: 23, eps: 7.41, grossMargin: 9, dividendYield: 0.09,
      etfPresence: { AIRR: false, PRN: 3.96 },
      tonyNote: 'Jabil Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, proScore: 2.59, coverage: 0.5,
      price: 268.29, weeklyPrices: [260.24, 262.92, 264.27, 266.41, 268.29], weeklyChange: 1.55, sortRank: 0, periodReturns: { '1M': 9, '6M': 222.2, '1Y': 545.7 },
      marketCap: '$12B', pe: 90, revenueGrowth: 20, eps: 2.98, grossMargin: 54, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 3.66 },
      tonyNote: 'Vicor Corp appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, proScore: 2.4, coverage: 1,
      price: 270.75, weeklyPrices: [262.63, 265.33, 266.69, 268.85, 270.75], weeklyChange: -0.11, sortRank: 0, periodReturns: { '1M': 12.4, '6M': 175.9, '1Y': 368.8 },
      marketCap: '$10B', pe: 52.9, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { AIRR: 2.5, PRN: 2.3 },
      tonyNote: 'Powell Industries, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 2.4% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 1, proScore: 2.4, coverage: 0.5,
      price: 259.89, weeklyPrices: [252.09, 254.69, 255.99, 258.07, 259.89], weeklyChange: -0.51, sortRank: 0, periodReturns: { '1M': 4.9, '6M': 31.3, '1Y': 59.4 },
      marketCap: '$104B', pe: 60.3, revenueGrowth: 19, eps: 4.31, grossMargin: 35, dividendYield: 0.18,
      etfPresence: { AIRR: false, PRN: 3.39 },
      tonyNote: 'Howmet Aerospace Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CMI', name: 'Cummins Inc', easyScore: 1, proScore: 2.37, coverage: 0.5,
      price: 638.78, weeklyPrices: [619.62, 626.00, 629.20, 634.31, 638.78], weeklyChange: -4.64, sortRank: 0, periodReturns: { '1M': 0, '6M': 37.3, '1Y': 98.5 },
      marketCap: '$88B', pe: 33.2, revenueGrowth: 3, eps: 19.23, grossMargin: 26, dividendYield: 1.25,
      etfPresence: { AIRR: false, PRN: 3.35 },
      tonyNote: 'Cummins Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CLH', name: 'Clean Harbors, Inc.', easyScore: 2, proScore: 2.34, coverage: 1,
      price: 282.56, weeklyPrices: [274.08, 276.91, 278.32, 280.58, 282.56], weeklyChange: -3.03, sortRank: 0, periodReturns: { '1M': -7.3, '6M': 35.1, '1Y': 24.1 },
      marketCap: '$15B', pe: 38.3, revenueGrowth: 2, eps: 7.37, grossMargin: 32, dividendYield: null,
      etfPresence: { AIRR: 2.53, PRN: 2.15 },
      tonyNote: 'Clean Harbors, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 2.3% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 1, proScore: 2.33, coverage: 0.5,
      price: 202.52, weeklyPrices: [196.44, 198.47, 199.48, 201.10, 202.52], weeklyChange: -0.07, sortRank: 0, periodReturns: { '1M': -6.5, '6M': 15.5, '1Y': 88.2 },
      marketCap: '$19B', pe: 54, revenueGrowth: 26, eps: 3.75, grossMargin: 23, dividendYield: 0.51,
      etfPresence: { AIRR: 3.29, PRN: false },
      tonyNote: 'BWX Technologies, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 1, proScore: 2.31, coverage: 0.5,
      price: 865.95, weeklyPrices: [839.97, 848.63, 852.96, 859.89, 865.95], weeklyChange: -0.76, sortRank: 0, periodReturns: { '1M': 8.2, '6M': 58.6, '1Y': 150.9 },
      marketCap: '$399B', pe: 43.1, revenueGrowth: 22, eps: 20.09, grossMargin: 29, dividendYield: 0.7,
      etfPresence: { AIRR: false, PRN: 3.26 },
      tonyNote: 'Caterpillar Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ITT', name: 'ITT Inc', easyScore: 1, proScore: 2.3, coverage: 0.5,
      price: 192.67, weeklyPrices: [186.89, 188.82, 189.78, 191.32, 192.67], weeklyChange: -0.35, sortRank: 0, periodReturns: { '1M': -12.1, '6M': 7.7, '1Y': 30 },
      marketCap: '$17B', pe: 34, revenueGrowth: 33, eps: 5.66, grossMargin: 35, dividendYield: 0.8,
      etfPresence: { AIRR: false, PRN: 3.25 },
      tonyNote: 'ITT Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
