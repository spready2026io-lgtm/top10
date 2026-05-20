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
  proScore: number;       // average weighting across holding ETFs
  price: number;
  weeklyPrices: number[];
  weeklyChange: number;
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
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 7, proScore: 6.65,
      price: 220.61, weeklyPrices: [213.99, 216.20, 217.30, 219.07, 220.61], weeklyChange: -0.77, sortRank: 0,
      marketCap: '$5.3T', pe: 45, revenueGrowth: 73, eps: 4.9, grossMargin: 71, dividendYield: 0.02,
      etfPresence: { AIS: 3.07, ARTY: 4.31, BAI: 5.75, IVEP: false, IGPT: 6.86, IVES: 4.92, ALAI: 14.54, CHAT: 7.11 },
      tonyNote: 'NVIDIA Corp appears in 7 of 8 AI & ML ETFs (88% coverage) with average weight 6.7% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc. Class C', easyScore: 1, proScore: 6.56,
      price: 384.9, weeklyPrices: [373.35, 377.20, 379.13, 382.21, 384.90], weeklyChange: -2.09, sortRank: 0,
      marketCap: '$4.7T', pe: 29.3, revenueGrowth: 22, eps: 13.13, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 6.56, CHAT: false },
      tonyNote: 'Alphabet Inc. Class C appears in 1 of 8 AI & ML ETFs (13% coverage) with average weight 6.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 4, proScore: 5.8,
      price: 387.66, weeklyPrices: [376.03, 379.91, 381.85, 384.95, 387.66], weeklyChange: -2.34, sortRank: 0,
      marketCap: '$4.7T', pe: 29.6, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: 4.14, IVEP: false, IGPT: 7.4, IVES: 4.99, ALAI: false, CHAT: 6.68 },
      tonyNote: 'ALPHABET INC CLASS A appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 5.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 7, proScore: 5.54,
      price: 698.74, weeklyPrices: [677.78, 684.77, 688.26, 693.85, 698.74], weeklyChange: 2.52, sortRank: 0,
      marketCap: '$788B', pe: 33, revenueGrowth: 196, eps: 21.17, grossMargin: 58, dividendYield: 0.09,
      etfPresence: { AIS: 7.12, ARTY: 6.19, BAI: 4.12, IVEP: false, IGPT: 9.51, IVES: 5.79, ALAI: 0.98, CHAT: 5.1 },
      tonyNote: 'Micron Technology Inc appears in 7 of 8 AI & ML ETFs (88% coverage) with average weight 5.5% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 7, proScore: 5.11,
      price: 414.05, weeklyPrices: [401.63, 405.77, 407.84, 411.15, 414.05], weeklyChange: -1.65, sortRank: 0,
      marketCap: '$675B', pe: 138.9, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.4, ARTY: 7.03, BAI: 4.48, IVEP: false, IGPT: 6.77, IVES: 6.81, ALAI: 0.88, CHAT: 5.39 },
      tonyNote: 'Advanced Micro Devices Inc appears in 7 of 8 AI & ML ETFs (88% coverage) with average weight 5.1% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 3, proScore: 5.03,
      price: 259.34, weeklyPrices: [251.56, 254.15, 255.45, 257.52, 259.34], weeklyChange: -2.08, sortRank: 0,
      marketCap: '$2.8T', pe: 31.6, revenueGrowth: 17, eps: 8.2, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.88, ALAI: 6.42, CHAT: 3.78 },
      tonyNote: 'AMAZON.COM INC appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 5.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 3, proScore: 4.61,
      price: 110.8, weeklyPrices: [107.48, 108.58, 109.14, 110.02, 110.80], weeklyChange: 2.43, sortRank: 0,
      marketCap: '$557B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.57, ARTY: false, BAI: 3.03, IVEP: false, IGPT: 7.24, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'Intel Corp appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 4.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PWR', name: 'QUANTA SERVICES INC', easyScore: 1, proScore: 4.47,
      price: 714.13, weeklyPrices: [692.71, 699.85, 703.42, 709.13, 714.13], weeklyChange: -1.23, sortRank: 0,
      marketCap: '$107B', pe: 98.1, revenueGrowth: 26, eps: 7.28, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: 4.47, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'QUANTA SERVICES INC appears in 1 of 8 AI & ML ETFs (13% coverage) with average weight 4.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 4, proScore: 4.44,
      price: 392.61, weeklyPrices: [380.83, 384.76, 386.72, 389.86, 392.61], weeklyChange: -0.84, sortRank: 0,
      marketCap: '$2.0T', pe: 33.8, revenueGrowth: 35, eps: 11.62, grossMargin: 62, dividendYield: 0.97,
      etfPresence: { AIS: 3.45, ARTY: false, BAI: 4.38, IVEP: false, IGPT: false, IVES: 4.51, ALAI: 5.4, CHAT: false },
      tonyNote: 'Taiwan Semiconductor Manufacturing Co Ltd appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 4.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 1, proScore: 4.22,
      price: 273.38, weeklyPrices: [265.18, 267.91, 269.28, 271.47, 273.38], weeklyChange: -1.65, sortRank: 0,
      marketCap: '$342B', pe: 51.6, revenueGrowth: 24, eps: 5.3, grossMargin: 50, dividendYield: 0.38,
      etfPresence: { AIS: false, ARTY: false, BAI: 4.22, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'LAM RESEARCH CORP appears in 1 of 8 AI & ML ETFs (13% coverage) with average weight 4.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 4, proScore: 4.07,
      price: 602.61, weeklyPrices: [584.53, 590.56, 593.57, 598.39, 602.61], weeklyChange: -1.41, sortRank: 0,
      marketCap: '$1.5T', pe: 21.9, revenueGrowth: 33, eps: 27.48, grossMargin: 82, dividendYield: 0.35,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: 5.42, IVES: 3.78, ALAI: 4.37, CHAT: 2.72 },
      tonyNote: 'Meta Platforms Inc appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 4.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SIMO', name: 'Silicon Motion Technology Corp', easyScore: 1, proScore: 4.03,
      price: 252.92, weeklyPrices: [245.33, 247.86, 249.13, 251.15, 252.92], weeklyChange: 5.49, sortRank: 0,
      marketCap: '$9B', pe: 50, revenueGrowth: 106, eps: 5.06, grossMargin: 48, dividendYield: 0.79,
      etfPresence: { AIS: 4.03, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'Silicon Motion Technology Corp appears in 1 of 8 AI & ML ETFs (13% coverage) with average weight 4.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC', easyScore: 1, proScore: 4.02,
      price: 79.4, weeklyPrices: [77.02, 77.81, 78.21, 78.84, 79.40], weeklyChange: 2.2, sortRank: 0,
      marketCap: '$97B', pe: 34.8, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.64,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: 4.02, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'WILLIAMS COS INC appears in 1 of 8 AI & ML ETFs (13% coverage) with average weight 4.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SMERY', name: 'SIEMENS ENERGY AG SPON ADR', easyScore: 1, proScore: 4.02,
      price: 196.76, weeklyPrices: [190.86, 192.82, 193.81, 195.38, 196.76], weeklyChange: -0.77, sortRank: 0,
      marketCap: '$167B', pe: 66.7, revenueGrowth: 3, eps: 2.95, grossMargin: 19, dividendYield: 0.41,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: 4.02, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'SIEMENS ENERGY AG SPON ADR appears in 1 of 8 AI & ML ETFs (13% coverage) with average weight 4.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AAPL', name: 'APPLE INC', easyScore: 2, proScore: 4.01,
      price: 298.97, weeklyPrices: [290.00, 292.99, 294.49, 296.88, 298.97], weeklyChange: 0.38, sortRank: 0,
      marketCap: '$4.4T', pe: 36.2, revenueGrowth: 17, eps: 8.25, grossMargin: 48, dividendYield: 0.36,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.78, ALAI: 3.24, CHAT: false },
      tonyNote: 'APPLE INC appears in 2 of 8 AI & ML ETFs (25% coverage) with average weight 4.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 6, proScore: 3.95,
      price: 411.07, weeklyPrices: [398.74, 402.85, 404.90, 408.19, 411.07], weeklyChange: -2.29, sortRank: 0,
      marketCap: '$1.9T', pe: 80, revenueGrowth: 30, eps: 5.14, grossMargin: 77, dividendYield: 0.63,
      etfPresence: { AIS: 0.84, ARTY: 4.14, BAI: 5.6, IVEP: false, IGPT: false, IVES: 4.93, ALAI: 4.66, CHAT: 3.54 },
      tonyNote: 'Broadcom Inc appears in 6 of 8 AI & ML ETFs (75% coverage) with average weight 4.0% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SBGSY', name: 'SCHNEIDER ELECT SE-UNSP ADR', easyScore: 1, proScore: 3.87,
      price: 59.17, weeklyPrices: [57.39, 57.99, 58.28, 58.76, 59.17], weeklyChange: -2.95, sortRank: 0,
      marketCap: '$166B', pe: 32, revenueGrowth: 4, eps: 1.85, grossMargin: 42, dividendYield: 1.67,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: 3.87, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'SCHNEIDER ELECT SE-UNSP ADR appears in 1 of 8 AI & ML ETFs (13% coverage) with average weight 3.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'EQIX', name: 'EQUINIX INC', easyScore: 1, proScore: 3.86,
      price: 1048.43, weeklyPrices: [1016.98, 1027.46, 1032.70, 1041.09, 1048.43], weeklyChange: -1.34, sortRank: 0,
      marketCap: '$103B', pe: 72.5, revenueGrowth: 12, eps: 14.47, grossMargin: 52, dividendYield: 1.88,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: 3.86, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'EQUINIX INC appears in 1 of 8 AI & ML ETFs (13% coverage) with average weight 3.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NEE', name: 'NEXTERA ENERGY INC', easyScore: 1, proScore: 3.83,
      price: 90.06, weeklyPrices: [87.36, 88.26, 88.71, 89.43, 90.06], weeklyChange: 1.15, sortRank: 0,
      marketCap: '$188B', pe: 22.9, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.77,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: 3.83, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'NEXTERA ENERGY INC appears in 1 of 8 AI & ML ETFs (13% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, proScore: 3.82,
      price: 417.42, weeklyPrices: [404.90, 409.07, 411.16, 414.50, 417.42], weeklyChange: -1.44, sortRank: 0,
      marketCap: '$3.1T', pe: 24.9, revenueGrowth: 18, eps: 16.78, grossMargin: 68, dividendYield: 0.87,
      etfPresence: { AIS: false, ARTY: 2.08, BAI: false, IVEP: false, IGPT: false, IVES: 4.18, ALAI: 5.64, CHAT: 3.39 },
      tonyNote: 'MICROSOFT CORP appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 3.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MXL', name: 'MaxLinear Inc', easyScore: 2, proScore: 7.99,
      price: 94.86, weeklyPrices: [92.01, 92.96, 93.44, 94.20, 94.86], weeklyChange: 8.46, sortRank: 0,
      marketCap: '$8B', pe: null, revenueGrowth: 43, eps: -1.52, grossMargin: 57, dividendYield: null,
      etfPresence: { SOXX: false, PSI: 9.24, XSD: 6.75, DRAM: false },
      tonyNote: 'MaxLinear Inc appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 8.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, proScore: 6.39,
      price: 414.05, weeklyPrices: [401.63, 405.77, 407.84, 411.15, 414.05], weeklyChange: -1.65, sortRank: 0,
      marketCap: '$675B', pe: 138.9, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 8.72, PSI: 6.96, XSD: 3.51, DRAM: false },
      tonyNote: 'ADVANCED MICRO DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 6.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, proScore: 5.81,
      price: 698.74, weeklyPrices: [677.78, 684.77, 688.26, 693.85, 698.74], weeklyChange: 2.52, sortRank: 0,
      marketCap: '$788B', pe: 33, revenueGrowth: 196, eps: 21.17, grossMargin: 58, dividendYield: 0.09,
      etfPresence: { SOXX: 9.58, PSI: 5.76, XSD: 2.78, DRAM: 5.1 },
      tonyNote: 'MICRON TECHNOLOGY INC appears in 4 of 4 Semiconductors ETFs (100% coverage) with average weight 5.8% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp/DE', easyScore: 1, proScore: 5.37,
      price: 1383.29, weeklyPrices: [1341.79, 1355.62, 1362.54, 1373.61, 1383.29], weeklyChange: 3.77, sortRank: 0,
      marketCap: '$205B', pe: 47.2, revenueGrowth: 251, eps: 29.33, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 5.37 },
      tonyNote: 'Sandisk Corp/DE appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 5.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION CORP', easyScore: 2, proScore: 5.36,
      price: 110.8, weeklyPrices: [107.48, 108.58, 109.14, 110.02, 110.80], weeklyChange: 2.43, sortRank: 0,
      marketCap: '$557B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.87, PSI: false, XSD: 3.86, DRAM: false },
      tonyNote: 'INTEL CORPORATION CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 5.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 3, proScore: 4.65,
      price: 411.07, weeklyPrices: [398.74, 402.85, 404.90, 408.19, 411.07], weeklyChange: -2.29, sortRank: 0,
      marketCap: '$1.9T', pe: 80, revenueGrowth: 30, eps: 5.14, grossMargin: 77, dividendYield: 0.63,
      etfPresence: { SOXX: 7.27, PSI: 4.57, XSD: 2.11, DRAM: false },
      tonyNote: 'BROADCOM INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 4.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, proScore: 4.65,
      price: 176.27, weeklyPrices: [170.98, 172.74, 173.63, 175.04, 176.27], weeklyChange: 4.34, sortRank: 0,
      marketCap: '$154B', pe: 57.4, revenueGrowth: 22, eps: 3.07, grossMargin: 51, dividendYield: 0.14,
      etfPresence: { SOXX: 6.1, PSI: false, XSD: 3.2, DRAM: false },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 4.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 1, proScore: 4.49,
      price: 733.35, weeklyPrices: [711.35, 718.68, 722.35, 728.22, 733.35], weeklyChange: -1.01, sortRank: 0,
      marketCap: '$164B', pe: 69.4, revenueGrowth: 44, eps: 10.56, grossMargin: 42, dividendYield: 0.4,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 4.49 },
      tonyNote: 'Seagate Technology Holdings PLC appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 4.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, proScore: 4.39,
      price: 220.61, weeklyPrices: [213.99, 216.20, 217.30, 219.07, 220.61], weeklyChange: -0.77, sortRank: 0,
      marketCap: '$5.3T', pe: 45, revenueGrowth: 73, eps: 4.9, grossMargin: 71, dividendYield: 0.02,
      etfPresence: { SOXX: 7.04, PSI: 4.07, XSD: 2.04, DRAM: false },
      tonyNote: 'NVIDIA CORP appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 4.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, proScore: 4.24,
      price: 406.91, weeklyPrices: [394.70, 398.77, 400.81, 404.06, 406.91], weeklyChange: -1.61, sortRank: 0,
      marketCap: '$323B', pe: 38.3, revenueGrowth: 11, eps: 10.62, grossMargin: 49, dividendYield: 0.52,
      etfPresence: { SOXX: 4.61, PSI: 3.87, XSD: false, DRAM: false },
      tonyNote: 'APPLIED MATERIAL INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 4.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 1, proScore: 4.1,
      price: 455.8, weeklyPrices: [442.13, 446.68, 448.96, 452.61, 455.80], weeklyChange: -0.63, sortRank: 0,
      marketCap: '$157B', pe: 27.2, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.13,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 4.1 },
      tonyNote: 'Western Digital Corp appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 4.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 3, proScore: 3.87,
      price: 302.31, weeklyPrices: [293.24, 296.26, 297.78, 300.19, 302.31], weeklyChange: 0.57, sortRank: 0,
      marketCap: '$275B', pe: 51.6, revenueGrowth: 19, eps: 5.86, grossMargin: 57, dividendYield: 1.88,
      etfPresence: { SOXX: 4.03, PSI: 5, XSD: 2.59, DRAM: false },
      tonyNote: 'TEXAS INSTRUMENT INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.9% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSEM', name: 'Tower Semiconductor Ltd', easyScore: 1, proScore: 3.8,
      price: 251.28, weeklyPrices: [243.74, 246.25, 247.51, 249.52, 251.28], weeklyChange: 1.29, sortRank: 0,
      marketCap: '$30B', pe: 116.3, revenueGrowth: 16, eps: 2.16, grossMargin: 25, dividendYield: null,
      etfPresence: { SOXX: false, PSI: 3.8, XSD: false, DRAM: false },
      tonyNote: 'Tower Semiconductor Ltd appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, proScore: 3.68,
      price: 1740.58, weeklyPrices: [1688.36, 1705.77, 1714.47, 1728.40, 1740.58], weeklyChange: -0.9, sortRank: 0,
      marketCap: '$227B', pe: 49.3, revenueGrowth: 12, eps: 35.33, grossMargin: 61, dividendYield: 0.53,
      etfPresence: { SOXX: 3.23, PSI: 4.14, XSD: false, DRAM: false },
      tonyNote: 'KLA CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 3.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, proScore: 3.66,
      price: 273.38, weeklyPrices: [265.18, 267.91, 269.28, 271.47, 273.38], weeklyChange: -1.65, sortRank: 0,
      marketCap: '$342B', pe: 51.6, revenueGrowth: 24, eps: 5.3, grossMargin: 50, dividendYield: 0.38,
      etfPresence: { SOXX: 3.3, PSI: 4.02, XSD: false, DRAM: false },
      tonyNote: 'LAM RESEARCH CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 3.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SITM', name: 'SiTime Corp', easyScore: 2, proScore: 3.5,
      price: 693.66, weeklyPrices: [672.85, 679.79, 683.26, 688.80, 693.66], weeklyChange: -4.4, sortRank: 0,
      marketCap: '$18B', pe: null, revenueGrowth: 88, eps: -0.9, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: false, PSI: 3.45, XSD: 3.54, DRAM: false },
      tonyNote: 'SiTime Corp appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 3.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, proScore: 3.24,
      price: 195.61, weeklyPrices: [189.74, 191.70, 192.68, 194.24, 195.61], weeklyChange: -3.94, sortRank: 0,
      marketCap: '$206B', pe: 21.1, revenueGrowth: -4, eps: 9.29, grossMargin: 55, dividendYield: 1.88,
      etfPresence: { SOXX: 3.88, PSI: false, XSD: 2.59, DRAM: false },
      tonyNote: 'QUALCOMM INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 3.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, proScore: 3.08,
      price: 294.28, weeklyPrices: [285.45, 288.39, 289.87, 292.22, 294.28], weeklyChange: 0.89, sortRank: 0,
      marketCap: '$74B', pe: 28.2, revenueGrowth: 12, eps: 10.45, grossMargin: 56, dividendYield: 1.38,
      etfPresence: { SOXX: 3.66, PSI: false, XSD: 2.49, DRAM: false },
      tonyNote: 'NXP SEMICONDUCTORS NV appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 3.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVTS', name: 'NAVITAS SEMICONDUCTOR CORP', easyScore: 1, proScore: 3.08,
      price: 19.43, weeklyPrices: [18.85, 19.04, 19.14, 19.29, 19.43], weeklyChange: -1.22, sortRank: 0,
      marketCap: '$5B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: 3.08, DRAM: false },
      tonyNote: 'NAVITAS SEMICONDUCTOR CORP appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 3.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 3, proScore: 2.87,
      price: 106.02, weeklyPrices: [102.84, 103.90, 104.43, 105.28, 106.02], weeklyChange: -3.12, sortRank: 0,
      marketCap: '$41B', pe: 78, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.43, PSI: 3.01, XSD: 3.15, DRAM: false },
      tonyNote: 'ON SEMICONDUCTOR CORP appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 2.9% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'RKLB', name: 'Rocket Lab Corp', easyScore: 1, proScore: 14.49,
      price: 127.31, weeklyPrices: [123.49, 124.76, 125.40, 126.42, 127.31], weeklyChange: -2.94, sortRank: 0,
      marketCap: '$74B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 14.49 },
      tonyNote: 'Rocket Lab Corp appears in 1 of 8 Broad Tech ETFs (13% coverage) with average weight 14.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSLA', name: 'Tesla Inc', easyScore: 3, proScore: 9.42,
      price: 404.11, weeklyPrices: [391.99, 396.03, 398.05, 401.28, 404.11], weeklyChange: -1.43, sortRank: 0,
      marketCap: '$1.5T', pe: 370.7, revenueGrowth: 16, eps: 1.09, grossMargin: 19, dividendYield: null,
      etfPresence: { QQQ: 3.4, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: false, GTEK: false, ARKK: 10.57, MARS: false },
      tonyNote: 'Tesla Inc appears in 3 of 8 Broad Tech ETFs (38% coverage) with average weight 9.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SATS', name: 'EchoStar Corp', easyScore: 1, proScore: 8.78,
      price: 136.52, weeklyPrices: [132.42, 133.79, 134.47, 135.56, 136.52], weeklyChange: 0.05, sortRank: 0,
      marketCap: '$40B', pe: null, revenueGrowth: -5, eps: -50.21, grossMargin: 27, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 8.78 },
      tonyNote: 'EchoStar Corp appears in 1 of 8 Broad Tech ETFs (13% coverage) with average weight 8.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'Microsoft Corp', easyScore: 4, proScore: 7.95,
      price: 417.42, weeklyPrices: [404.90, 409.07, 411.16, 414.50, 417.42], weeklyChange: -1.44, sortRank: 0,
      marketCap: '$3.1T', pe: 24.9, revenueGrowth: 18, eps: 16.78, grossMargin: 68, dividendYield: 0.87,
      etfPresence: { QQQ: 5.23, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: 8.21, FDTX: 4.06, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Microsoft Corp appears in 4 of 8 Broad Tech ETFs (50% coverage) with average weight 8.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 5, proScore: 7.02,
      price: 220.61, weeklyPrices: [213.99, 216.20, 217.30, 219.07, 220.61], weeklyChange: -0.77, sortRank: 0,
      marketCap: '$5.3T', pe: 45, revenueGrowth: 73, eps: 4.9, grossMargin: 71, dividendYield: 0.02,
      etfPresence: { QQQ: 8.98, QQQA: false, PTF: 5.23, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 5.27, GTEK: false, ARKK: 1.35, MARS: false },
      tonyNote: 'NVIDIA Corp appears in 5 of 8 Broad Tech ETFs (63% coverage) with average weight 7.0% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AAPL', name: 'Apple Inc', easyScore: 4, proScore: 6.9,
      price: 298.97, weeklyPrices: [290.00, 292.99, 294.49, 296.88, 298.97], weeklyChange: 0.38, sortRank: 0,
      marketCap: '$4.4T', pe: 36.2, revenueGrowth: 17, eps: 8.25, grossMargin: 48, dividendYield: 0.36,
      etfPresence: { QQQ: 7.27, QQQA: false, PTF: 4.84, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 1.22, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Apple Inc appears in 4 of 8 Broad Tech ETFs (50% coverage) with average weight 6.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 4, proScore: 6.58,
      price: 259.34, weeklyPrices: [251.56, 254.15, 255.45, 257.52, 259.34], weeklyChange: -2.08, sortRank: 0,
      marketCap: '$2.8T', pe: 31.6, revenueGrowth: 17, eps: 8.2, grossMargin: 51, dividendYield: null,
      etfPresence: { QQQ: 4.73, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 4.64, GTEK: false, ARKK: 2.68, MARS: false },
      tonyNote: 'Amazon.com Inc appears in 4 of 8 Broad Tech ETFs (50% coverage) with average weight 6.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'Alphabet Inc Class A', easyScore: 4, proScore: 6.3,
      price: 387.66, weeklyPrices: [376.03, 379.91, 381.85, 384.95, 387.66], weeklyChange: -2.34, sortRank: 0,
      marketCap: '$4.7T', pe: 29.6, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { QQQ: 3.84, QQQA: 4.88, PTF: 2.2, WCLD: false, MAGS: 14.29, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Alphabet Inc Class A appears in 4 of 8 Broad Tech ETFs (50% coverage) with average weight 6.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ARM', name: 'ARM HOLDINGS PLC-ADR', easyScore: 1, proScore: 5.99,
      price: 223.15, weeklyPrices: [216.46, 218.69, 219.80, 221.59, 223.15], weeklyChange: 3.73, sortRank: 0,
      marketCap: '$237B', pe: 262.5, revenueGrowth: 20, eps: 0.85, grossMargin: 98, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 5.99, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ARM HOLDINGS PLC-ADR appears in 1 of 8 Broad Tech ETFs (13% coverage) with average weight 6.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OHB', name: 'OHB SE', easyScore: 1, proScore: 5.96,
      price: 0, weeklyPrices: [0.00, 0.00, 0.00, 0.00, 0.00], weeklyChange: 0, sortRank: 0,
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 5.96 },
      tonyNote: 'OHB SE appears in 1 of 8 Broad Tech ETFs (13% coverage) with average weight 6.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 1, proScore: 5.4,
      price: 41.59, weeklyPrices: [40.34, 40.76, 40.97, 41.30, 41.59], weeklyChange: -0.05, sortRank: 0,
      marketCap: '$15B', pe: null, revenueGrowth: 41, eps: -0.8, grossMargin: 56, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 5.4 },
      tonyNote: 'Planet Labs PBC appears in 1 of 8 Broad Tech ETFs (13% coverage) with average weight 5.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 4, proScore: 5.3,
      price: 602.61, weeklyPrices: [584.53, 590.56, 593.57, 598.39, 602.61], weeklyChange: -1.41, sortRank: 0,
      marketCap: '$1.5T', pe: 21.9, revenueGrowth: 33, eps: 27.48, grossMargin: 82, dividendYield: 0.35,
      etfPresence: { QQQ: 3, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 3.31, GTEK: false, ARKK: 0.61, MARS: false },
      tonyNote: 'Meta Platforms Inc appears in 4 of 8 Broad Tech ETFs (50% coverage) with average weight 5.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 3, proScore: 4.99,
      price: 414.05, weeklyPrices: [401.63, 405.77, 407.84, 411.15, 414.05], weeklyChange: -1.65, sortRank: 0,
      marketCap: '$675B', pe: 138.9, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { QQQ: 3.15, QQQA: 6.75, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: 5.08, MARS: false },
      tonyNote: 'Advanced Micro Devices Inc appears in 3 of 8 Broad Tech ETFs (38% coverage) with average weight 5.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile Inc', easyScore: 2, proScore: 4.81,
      price: 88.1, weeklyPrices: [85.46, 86.34, 86.78, 87.48, 88.10], weeklyChange: 1.46, sortRank: 0,
      marketCap: '$34B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: 1.75, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 7.88 },
      tonyNote: 'AST SpaceMobile Inc appears in 2 of 8 Broad Tech ETFs (25% coverage) with average weight 4.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 2, proScore: 4.79,
      price: 110.8, weeklyPrices: [107.48, 108.58, 109.14, 110.02, 110.80], weeklyChange: 2.43, sortRank: 0,
      marketCap: '$557B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { QQQ: 2.48, QQQA: 7.1, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Intel Corp appears in 2 of 8 Broad Tech ETFs (25% coverage) with average weight 4.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TEM', name: 'TEMPUS AI INC-CL A', easyScore: 1, proScore: 4.79,
      price: 45.53, weeklyPrices: [44.16, 44.62, 44.85, 45.21, 45.53], weeklyChange: 4.38, sortRank: 0,
      marketCap: '$8B', pe: null, revenueGrowth: 36, eps: -1.72, grossMargin: 63, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.79, MARS: false },
      tonyNote: 'TEMPUS AI INC-CL A appears in 1 of 8 Broad Tech ETFs (13% coverage) with average weight 4.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 2, proScore: 4.78,
      price: 181.46, weeklyPrices: [176.02, 177.83, 178.74, 180.19, 181.46], weeklyChange: -2.76, sortRank: 0,
      marketCap: '$522B', pe: 32.6, revenueGrowth: 22, eps: 5.57, grossMargin: 67, dividendYield: 1.1,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 8.86, FDTX: 0.7, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ORACLE CORP appears in 2 of 8 Broad Tech ETFs (25% coverage) with average weight 4.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRSP', name: 'CRISPR THERAPEUTICS AG', easyScore: 1, proScore: 4.64,
      price: 47.59, weeklyPrices: [46.16, 46.64, 46.88, 47.26, 47.59], weeklyChange: -2, sortRank: 0,
      marketCap: '$5B', pe: null, revenueGrowth: 69, eps: -6.17, grossMargin: 0, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.64, MARS: false },
      tonyNote: 'CRISPR THERAPEUTICS AG appears in 1 of 8 Broad Tech ETFs (13% coverage) with average weight 4.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'Marvell Technology Inc', easyScore: 3, proScore: 4.61,
      price: 176.27, weeklyPrices: [170.98, 172.74, 173.63, 175.04, 176.27], weeklyChange: 4.34, sortRank: 0,
      marketCap: '$154B', pe: 57.4, revenueGrowth: 22, eps: 3.07, grossMargin: 51, dividendYield: 0.14,
      etfPresence: { QQQ: 0.68, QQQA: 5.48, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: 7.68, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Marvell Technology Inc appears in 3 of 8 Broad Tech ETFs (38% coverage) with average weight 4.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HOOD', name: 'ROBINHOOD MARKETS INC - A', easyScore: 1, proScore: 4.49,
      price: 74.16, weeklyPrices: [71.94, 72.68, 73.05, 73.64, 74.16], weeklyChange: -3.88, sortRank: 0,
      marketCap: '$67B', pe: 36, revenueGrowth: 15, eps: 2.06, grossMargin: 92, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.49, MARS: false },
      tonyNote: 'ROBINHOOD MARKETS INC - A appears in 1 of 8 Broad Tech ETFs (13% coverage) with average weight 4.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 3, proScore: 5.24,
      price: 261.58, weeklyPrices: [253.73, 256.35, 257.66, 259.75, 261.58], weeklyChange: -1.96, sortRank: 0,
      marketCap: '$10B', pe: 51, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.14,
      etfPresence: { POW: 6.11, VOLT: 7.87, PBD: false, PBW: 1.74 },
      tonyNote: 'Powell Industries Inc appears in 3 of 4 Electrification ETFs (75% coverage) with average weight 5.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 2, proScore: 4.5,
      price: 371.88, weeklyPrices: [360.72, 364.44, 366.30, 369.28, 371.88], weeklyChange: -2.62, sortRank: 0,
      marketCap: '$144B', pe: 36.4, revenueGrowth: 17, eps: 10.23, grossMargin: 37, dividendYield: 1.18,
      etfPresence: { POW: 3.87, VOLT: 5.12, PBD: false, PBW: false },
      tonyNote: 'Eaton Corp PLC appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 4.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, proScore: 4.45,
      price: 243.43, weeklyPrices: [236.13, 238.56, 239.78, 241.73, 243.43], weeklyChange: -2.24, sortRank: 0,
      marketCap: '$11B', pe: 81.4, revenueGrowth: 20, eps: 2.99, grossMargin: 54, dividendYield: null,
      etfPresence: { POW: 4.45, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Vicor Corp appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 4.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 3, proScore: 4.08,
      price: 714.13, weeklyPrices: [692.71, 699.85, 703.42, 709.13, 714.13], weeklyChange: -1.23, sortRank: 0,
      marketCap: '$107B', pe: 98.1, revenueGrowth: 26, eps: 7.28, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 5, VOLT: 5.74, PBD: false, PBW: 1.5 },
      tonyNote: 'Quanta Services Inc appears in 3 of 4 Electrification ETFs (75% coverage) with average weight 4.1% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 2, proScore: 3.96,
      price: 1011.8, weeklyPrices: [981.45, 991.56, 996.62, 1004.72, 1011.80], weeklyChange: -0.04, sortRank: 0,
      marketCap: '$272B', pe: 29.6, revenueGrowth: 16, eps: 34.2, grossMargin: 20, dividendYield: 0.17,
      etfPresence: { POW: 3.61, VOLT: 4.32, PBD: false, PBW: false },
      tonyNote: 'GE Vernova Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 4.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OGE', name: 'OGE ENERGY CORP', easyScore: 1, proScore: 3.92,
      price: 48.05, weeklyPrices: [46.61, 47.09, 47.33, 47.71, 48.05], weeklyChange: 1.56, sortRank: 0,
      marketCap: '$10B', pe: 21.4, revenueGrowth: 1, eps: 2.25, grossMargin: 44, dividendYield: 3.54,
      etfPresence: { POW: false, VOLT: 3.92, PBD: false, PBW: false },
      tonyNote: 'OGE ENERGY CORP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 3.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 3, proScore: 3.78,
      price: 249.71, weeklyPrices: [242.22, 244.72, 245.96, 247.96, 249.71], weeklyChange: -3.32, sortRank: 0,
      marketCap: '$4B', pe: 60.2, revenueGrowth: 17, eps: 4.15, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: 3.05, VOLT: 6.89, PBD: false, PBW: 1.41 },
      tonyNote: 'Bel Fuse Inc appears in 3 of 4 Electrification ETFs (75% coverage) with average weight 3.8% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 2, proScore: 3.76,
      price: 90.06, weeklyPrices: [87.36, 88.26, 88.71, 89.43, 90.06], weeklyChange: 1.15, sortRank: 0,
      marketCap: '$188B', pe: 22.9, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.77,
      etfPresence: { POW: 2.16, VOLT: 5.36, PBD: false, PBW: false },
      tonyNote: 'NextEra Energy Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 3.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ET', name: 'ENERGY TRANSFER LP', easyScore: 1, proScore: 3.75,
      price: 20.39, weeklyPrices: [19.78, 19.98, 20.08, 20.25, 20.39], weeklyChange: 0.99, sortRank: 0,
      marketCap: '$70B', pe: 17, revenueGrowth: 32, eps: 1.2, grossMargin: 19, dividendYield: 6.55,
      etfPresence: { POW: false, VOLT: 3.75, PBD: false, PBW: false },
      tonyNote: 'ENERGY TRANSFER LP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETR', name: 'ENTERGY CORP', easyScore: 1, proScore: 3.73,
      price: 110.55, weeklyPrices: [107.23, 108.34, 108.89, 109.78, 110.55], weeklyChange: 0.89, sortRank: 0,
      marketCap: '$51B', pe: 28.2, revenueGrowth: 12, eps: 3.92, grossMargin: 47, dividendYield: 2.32,
      etfPresence: { POW: false, VOLT: 3.73, PBD: false, PBW: false },
      tonyNote: 'ENTERGY CORP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 3.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 1, proScore: 3.49,
      price: 322.63, weeklyPrices: [312.95, 316.18, 317.79, 320.37, 322.63], weeklyChange: -5.03, sortRank: 0,
      marketCap: '$124B', pe: 81.3, revenueGrowth: 30, eps: 3.97, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 3.49, PBD: false, PBW: false },
      tonyNote: 'VERTIV HOLDINGS CO appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 3.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 2, proScore: 3.45,
      price: 158.23, weeklyPrices: [153.48, 155.07, 155.86, 157.12, 158.23], weeklyChange: -1.53, sortRank: 0,
      marketCap: '$26B', pe: 53.8, revenueGrowth: 54, eps: 2.94, grossMargin: 37, dividendYield: 0.53,
      etfPresence: { POW: 3.81, VOLT: 3.08, PBD: false, PBW: false },
      tonyNote: 'nVent Electric PLC appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 3.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NI', name: 'NISOURCE INC', easyScore: 1, proScore: 3.39,
      price: 47.42, weeklyPrices: [46.00, 46.47, 46.71, 47.09, 47.42], weeklyChange: 1.87, sortRank: 0,
      marketCap: '$23B', pe: 23.6, revenueGrowth: 8, eps: 2.01, grossMargin: 51, dividendYield: 2.53,
      etfPresence: { POW: false, VOLT: 3.39, PBD: false, PBW: false },
      tonyNote: 'NISOURCE INC appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 3.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IDA', name: 'IDACORP INC', easyScore: 1, proScore: 3.32,
      price: 141.95, weeklyPrices: [137.69, 139.11, 139.82, 140.96, 141.95], weeklyChange: 0.88, sortRank: 0,
      marketCap: '$8B', pe: 23.7, revenueGrowth: -7, eps: 6, grossMargin: 38, dividendYield: 2.47,
      etfPresence: { POW: false, VOLT: 3.32, PBD: false, PBW: false },
      tonyNote: 'IDACORP INC appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 3.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ENR', name: 'Siemens Energy AG', easyScore: 1, proScore: 3.3,
      price: 16.23, weeklyPrices: [15.74, 15.91, 15.99, 16.12, 16.23], weeklyChange: -1.87, sortRank: 0,
      marketCap: '$1B', pe: 5.9, revenueGrowth: -3, eps: 2.73, grossMargin: 43, dividendYield: 7.39,
      etfPresence: { POW: 3.3, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Siemens Energy AG appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 3.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FCEL', name: 'FuelCell Energy Inc', easyScore: 1, proScore: 3.19,
      price: 17.36, weeklyPrices: [16.84, 17.01, 17.10, 17.24, 17.36], weeklyChange: -2.14, sortRank: 0,
      marketCap: '$920M', pe: null, revenueGrowth: 61, eps: -6.49, grossMargin: -16, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 3.19 },
      tonyNote: 'FuelCell Energy Inc appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 3.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MOD', name: 'MODINE MANUFACTURING CO', easyScore: 1, proScore: 3.03,
      price: 244.49, weeklyPrices: [237.16, 239.60, 240.82, 242.78, 244.49], weeklyChange: -1.07, sortRank: 0,
      marketCap: '$13B', pe: 133.6, revenueGrowth: 31, eps: 1.83, grossMargin: 24, dividendYield: null,
      etfPresence: { POW: false, VOLT: 3.03, PBD: false, PBW: false },
      tonyNote: 'MODINE MANUFACTURING CO appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ABBN', name: 'ABB LTD', easyScore: 1, proScore: 2.95,
      price: 0, weeklyPrices: [0.00, 0.00, 0.00, 0.00, 0.00], weeklyChange: 0, sortRank: 0,
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { POW: false, VOLT: 2.95, PBD: false, PBW: false },
      tonyNote: 'ABB LTD appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, proScore: 2.9,
      price: 128.92, weeklyPrices: [125.05, 126.34, 126.99, 128.02, 128.92], weeklyChange: 0.97, sortRank: 0,
      marketCap: '$70B', pe: 19.1, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.95,
      etfPresence: { POW: 1.43, VOLT: 4.38, PBD: false, PBW: false },
      tonyNote: 'American Electric Power Co Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PRY', name: 'Prysmian SpA', easyScore: 2, proScore: 2.75,
      price: 0, weeklyPrices: [0.00, 0.00, 0.00, 0.00, 0.00], weeklyChange: 0, sortRank: 0,
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { POW: 4.38, VOLT: false, PBD: 1.13, PBW: false },
      tonyNote: 'Prysmian SpA appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'TTMI', name: 'TTM Technologies Inc', easyScore: 1, proScore: 5.24,
      price: 161.41, weeklyPrices: [156.57, 158.18, 158.99, 160.28, 161.41], weeklyChange: 1.61, sortRank: 0,
      marketCap: '$17B', pe: 87.7, revenueGrowth: 30, eps: 1.84, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 5.24 },
      tonyNote: 'TTM Technologies Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 5.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, proScore: 4.93,
      price: 728.29, weeklyPrices: [706.44, 713.72, 717.37, 723.19, 728.29], weeklyChange: -5.51, sortRank: 0,
      marketCap: '$22B', pe: 64.9, revenueGrowth: 92, eps: 11.22, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 5.66, PRN: 4.19 },
      tonyNote: 'Sterling Infrastructure, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 4.9% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 1, proScore: 4.71,
      price: 41.59, weeklyPrices: [40.34, 40.76, 40.97, 41.30, 41.59], weeklyChange: -0.05, sortRank: 0,
      marketCap: '$15B', pe: null, revenueGrowth: 41, eps: -0.8, grossMargin: 56, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 4.71 },
      tonyNote: 'Planet Labs PBC appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 4.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, proScore: 4.65,
      price: 1825.5, weeklyPrices: [1770.73, 1788.99, 1798.12, 1812.72, 1825.50], weeklyChange: -1.56, sortRank: 0,
      marketCap: '$64B', pe: 52.6, revenueGrowth: 1, eps: 34.68, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: 4.42, PRN: 4.88 },
      tonyNote: 'Comfort Systems USA, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 4.7% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, proScore: 4.32,
      price: 639.58, weeklyPrices: [620.39, 626.79, 629.99, 635.10, 639.58], weeklyChange: -3.79, sortRank: 0,
      marketCap: '$9B', pe: 65.8, revenueGrowth: 13, eps: 9.72, grossMargin: 20, dividendYield: 0.31,
      etfPresence: { AIRR: 4.12, PRN: 4.52 },
      tonyNote: 'Argan, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 4.3% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 1, proScore: 4.28,
      price: 714.13, weeklyPrices: [692.71, 699.85, 703.42, 709.13, 714.13], weeklyChange: -1.23, sortRank: 0,
      marketCap: '$107B', pe: 98.1, revenueGrowth: 26, eps: 7.28, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { AIRR: false, PRN: 4.28 },
      tonyNote: 'Quanta Services Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 4.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'EME', name: 'EMCOR Group, Inc.', easyScore: 1, proScore: 4.19,
      price: 854.36, weeklyPrices: [828.73, 837.27, 841.54, 848.38, 854.36], weeklyChange: -2.6, sortRank: 0,
      marketCap: '$38B', pe: 28.7, revenueGrowth: 20, eps: 29.73, grossMargin: 19, dividendYield: 0.15,
      etfPresence: { AIRR: 4.19, PRN: false },
      tonyNote: 'EMCOR Group, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 4.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SAIA', name: 'Saia, Inc.', easyScore: 1, proScore: 4.09,
      price: 448.95, weeklyPrices: [435.48, 439.97, 442.22, 445.81, 448.95], weeklyChange: -2.04, sortRank: 0,
      marketCap: '$12B', pe: 47.2, revenueGrowth: 2, eps: 9.51, grossMargin: 24, dividendYield: null,
      etfPresence: { AIRR: 4.09, PRN: false },
      tonyNote: 'Saia, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 4.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CHRW', name: 'C.H. Robinson Worldwide, Inc.', easyScore: 1, proScore: 4.07,
      price: 173.02, weeklyPrices: [167.83, 169.56, 170.42, 171.81, 173.02], weeklyChange: 1.94, sortRank: 0,
      marketCap: '$20B', pe: 35, revenueGrowth: -1, eps: 4.95, grossMargin: 9, dividendYield: 1.46,
      etfPresence: { AIRR: 4.07, PRN: false },
      tonyNote: 'C.H. Robinson Worldwide, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 4.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JBL', name: 'Jabil Inc', easyScore: 1, proScore: 3.9,
      price: 332.88, weeklyPrices: [322.89, 326.22, 327.89, 330.55, 332.88], weeklyChange: -1.73, sortRank: 0,
      marketCap: '$35B', pe: 44.9, revenueGrowth: 23, eps: 7.42, grossMargin: 9, dividendYield: 0.1,
      etfPresence: { AIRR: false, PRN: 3.9 },
      tonyNote: 'Jabil Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MTZ', name: 'MasTec, Inc.', easyScore: 2, proScore: 3.73,
      price: 385, weeklyPrices: [373.45, 377.30, 379.23, 382.31, 385.00], weeklyChange: -0.15, sortRank: 0,
      marketCap: '$30B', pe: 67.5, revenueGrowth: 35, eps: 5.7, grossMargin: 13, dividendYield: null,
      etfPresence: { AIRR: 4.21, PRN: 3.25 },
      tonyNote: 'MasTec, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 3.7% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, proScore: 3.47,
      price: 243.43, weeklyPrices: [236.13, 238.56, 239.78, 241.73, 243.43], weeklyChange: -2.24, sortRank: 0,
      marketCap: '$11B', pe: 81.4, revenueGrowth: 20, eps: 2.99, grossMargin: 54, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 3.47 },
      tonyNote: 'Vicor Corp appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CMI', name: 'Cummins Inc', easyScore: 1, proScore: 3.41,
      price: 659.46, weeklyPrices: [639.68, 646.27, 649.57, 654.84, 659.46], weeklyChange: -2.72, sortRank: 0,
      marketCap: '$91B', pe: 34.2, revenueGrowth: 3, eps: 19.26, grossMargin: 26, dividendYield: 1.21,
      etfPresence: { AIRR: false, PRN: 3.41 },
      tonyNote: 'Cummins Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 1, proScore: 3.36,
      price: 253.12, weeklyPrices: [245.53, 248.06, 249.32, 251.35, 253.12], weeklyChange: -1.51, sortRank: 0,
      marketCap: '$101B', pe: 58.9, revenueGrowth: 19, eps: 4.3, grossMargin: 35, dividendYield: 0.19,
      etfPresence: { AIRR: false, PRN: 3.36 },
      tonyNote: 'Howmet Aerospace Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ITT', name: 'ITT Inc', easyScore: 1, proScore: 3.29,
      price: 191.04, weeklyPrices: [185.31, 187.22, 188.17, 189.70, 191.04], weeklyChange: -2.02, sortRank: 0,
      marketCap: '$17B', pe: 33.7, revenueGrowth: 33, eps: 5.67, grossMargin: 35, dividendYield: 0.81,
      etfPresence: { AIRR: false, PRN: 3.29 },
      tonyNote: 'ITT Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 1, proScore: 3.27,
      price: 197.33, weeklyPrices: [191.41, 193.38, 194.37, 195.95, 197.33], weeklyChange: -2.15, sortRank: 0,
      marketCap: '$18B', pe: 52.6, revenueGrowth: 26, eps: 3.75, grossMargin: 23, dividendYield: 0.53,
      etfPresence: { AIRR: 3.27, PRN: false },
      tonyNote: 'BWX Technologies, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 1, proScore: 3.25,
      price: 860.15, weeklyPrices: [834.35, 842.95, 847.25, 854.13, 860.15], weeklyChange: -0.44, sortRank: 0,
      marketCap: '$396B', pe: 42.9, revenueGrowth: 22, eps: 20.04, grossMargin: 29, dividendYield: 0.7,
      etfPresence: { AIRR: false, PRN: 3.25 },
      tonyNote: 'Caterpillar Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 1, proScore: 3.08,
      price: 324.6, weeklyPrices: [314.86, 318.11, 319.73, 322.33, 324.60], weeklyChange: -1.44, sortRank: 0,
      marketCap: '$13B', pe: 21.1, revenueGrowth: 13, eps: 15.39, grossMargin: 12, dividendYield: 1.7,
      etfPresence: { AIRR: 3.08, PRN: false },
      tonyNote: 'Huntington Ingalls Industries, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 1, proScore: 2.91,
      price: 322.63, weeklyPrices: [312.95, 316.18, 317.79, 320.37, 322.63], weeklyChange: -5.03, sortRank: 0,
      marketCap: '$124B', pe: 81.3, revenueGrowth: 30, eps: 3.97, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIRR: false, PRN: 2.91 },
      tonyNote: 'Vertiv Holdings Co appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DY', name: 'Dycom Industries, Inc.', easyScore: 2, proScore: 2.9,
      price: 413.35, weeklyPrices: [400.95, 405.08, 407.15, 410.46, 413.35], weeklyChange: -1.5, sortRank: 0,
      marketCap: '$12B', pe: 43.3, revenueGrowth: 34, eps: 9.55, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: 3.34, PRN: 2.46 },
      tonyNote: 'Dycom Industries, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 2.9% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
