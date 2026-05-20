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
  etfPresence: Record<string, boolean>;
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
      ticker: 'DELL', name: 'Dell Technologies, Inc. Class C', easyScore: 2, proScore: 44.55,
      price: 235.26, weeklyPrices: [228.20, 230.55, 231.73, 233.61, 235.26], weeklyChange: -1.16, sortRank: 0,
      marketCap: '$153B', pe: 27.1, revenueGrowth: 40, eps: 8.68, grossMargin: 20, dividendYield: 1.07,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: true, CHAT: true },
      tonyNote: 'Dell Technologies, Inc. Class C appears in 2 of 8 AI & ML ETFs (25% coverage) with average weight 44.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AKAM', name: 'Akamai Technologies, Inc.', easyScore: 2, proScore: 27.14,
      price: 141.34, weeklyPrices: [137.10, 138.51, 139.22, 140.35, 141.34], weeklyChange: -6.25, sortRank: 0,
      marketCap: '$21B', pe: 47.9, revenueGrowth: 6, eps: 2.95, grossMargin: 58, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: true, CHAT: true },
      tonyNote: 'Akamai Technologies, Inc. appears in 2 of 8 AI & ML ETFs (25% coverage) with average weight 27.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CLS', name: 'Celestica Inc', easyScore: 4, proScore: 23.05,
      price: 339.13, weeklyPrices: [328.96, 332.35, 334.04, 336.76, 339.13], weeklyChange: -1.03, sortRank: 0,
      marketCap: '$39B', pe: 41.2, revenueGrowth: 53, eps: 8.24, grossMargin: 12, dividendYield: null,
      etfPresence: { AIS: true, ARTY: true, BAI: true, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: true },
      tonyNote: 'Celestica Inc appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 23.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HPE', name: 'Hewlett Packard Enterprise Co', easyScore: 3, proScore: 22.33,
      price: 32.62, weeklyPrices: [31.64, 31.97, 32.13, 32.39, 32.62], weeklyChange: -1.15, sortRank: 0,
      marketCap: '$43B', pe: null, revenueGrowth: 18, eps: -0.17, grossMargin: 32, dividendYield: 1.75,
      etfPresence: { AIS: true, ARTY: false, BAI: false, IVEP: false, IGPT: true, IVES: false, ALAI: false, CHAT: true },
      tonyNote: 'Hewlett Packard Enterprise Co appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 22.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 7, proScore: 6.64,
      price: 220.61, weeklyPrices: [213.99, 216.20, 217.30, 219.07, 220.61], weeklyChange: -0.77, sortRank: 0,
      marketCap: '$5.3T', pe: 45, revenueGrowth: 73, eps: 4.9, grossMargin: 71, dividendYield: 0.02,
      etfPresence: { AIS: true, ARTY: true, BAI: true, IVEP: false, IGPT: true, IVES: true, ALAI: true, CHAT: true },
      tonyNote: 'NVIDIA Corp appears in 7 of 8 AI & ML ETFs (88% coverage) with average weight 6.6% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc. Class C', easyScore: 1, proScore: 6.56,
      price: 384.9, weeklyPrices: [373.35, 377.20, 379.13, 382.21, 384.90], weeklyChange: -2.09, sortRank: 0,
      marketCap: '$4.7T', pe: 29.3, revenueGrowth: 22, eps: 13.13, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: true, CHAT: false },
      tonyNote: 'Alphabet Inc. Class C appears in 1 of 8 AI & ML ETFs (13% coverage) with average weight 6.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 4, proScore: 5.81,
      price: 387.66, weeklyPrices: [376.03, 379.91, 381.85, 384.95, 387.66], weeklyChange: -2.34, sortRank: 0,
      marketCap: '$4.7T', pe: 29.6, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: true, IVEP: false, IGPT: true, IVES: true, ALAI: false, CHAT: true },
      tonyNote: 'ALPHABET INC CLASS A appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 5.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 7, proScore: 5.49,
      price: 698.74, weeklyPrices: [677.78, 684.77, 688.26, 693.85, 698.74], weeklyChange: 2.52, sortRank: 0,
      marketCap: '$788B', pe: 33, revenueGrowth: 196, eps: 21.17, grossMargin: 58, dividendYield: 0.09,
      etfPresence: { AIS: true, ARTY: true, BAI: true, IVEP: false, IGPT: true, IVES: true, ALAI: true, CHAT: true },
      tonyNote: 'Micron Technology Inc appears in 7 of 8 AI & ML ETFs (88% coverage) with average weight 5.5% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 7, proScore: 5.11,
      price: 414.05, weeklyPrices: [401.63, 405.77, 407.84, 411.15, 414.05], weeklyChange: -1.65, sortRank: 0,
      marketCap: '$675B', pe: 138.9, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: true, ARTY: true, BAI: true, IVEP: false, IGPT: true, IVES: true, ALAI: true, CHAT: true },
      tonyNote: 'Advanced Micro Devices Inc appears in 7 of 8 AI & ML ETFs (88% coverage) with average weight 5.1% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 3, proScore: 5.03,
      price: 259.34, weeklyPrices: [251.56, 254.15, 255.45, 257.52, 259.34], weeklyChange: -2.08, sortRank: 0,
      marketCap: '$2.8T', pe: 31.6, revenueGrowth: 17, eps: 8.2, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: true, ALAI: true, CHAT: true },
      tonyNote: 'AMAZON.COM INC appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 5.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 3, proScore: 4.58,
      price: 110.8, weeklyPrices: [107.48, 108.58, 109.14, 110.02, 110.80], weeklyChange: 2.43, sortRank: 0,
      marketCap: '$557B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: true, ARTY: false, BAI: true, IVEP: false, IGPT: true, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'Intel Corp appears in 3 of 8 AI & ML ETFs (38% coverage) with average weight 4.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PWR', name: 'QUANTA SERVICES INC', easyScore: 1, proScore: 4.47,
      price: 714.13, weeklyPrices: [692.71, 699.85, 703.42, 709.13, 714.13], weeklyChange: -1.23, sortRank: 0,
      marketCap: '$107B', pe: 98.1, revenueGrowth: 26, eps: 7.28, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: true, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'QUANTA SERVICES INC appears in 1 of 8 AI & ML ETFs (13% coverage) with average weight 4.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 4, proScore: 4.43,
      price: 392.61, weeklyPrices: [380.83, 384.76, 386.72, 389.86, 392.61], weeklyChange: -0.84, sortRank: 0,
      marketCap: '$2.0T', pe: 33.8, revenueGrowth: 35, eps: 11.62, grossMargin: 62, dividendYield: 0.97,
      etfPresence: { AIS: true, ARTY: false, BAI: true, IVEP: false, IGPT: false, IVES: true, ALAI: true, CHAT: false },
      tonyNote: 'Taiwan Semiconductor Manufacturing Co Ltd appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 4.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 1, proScore: 4.23,
      price: 273.38, weeklyPrices: [265.18, 267.91, 269.28, 271.47, 273.38], weeklyChange: -1.65, sortRank: 0,
      marketCap: '$342B', pe: 51.6, revenueGrowth: 24, eps: 5.3, grossMargin: 50, dividendYield: 0.38,
      etfPresence: { AIS: false, ARTY: false, BAI: true, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'LAM RESEARCH CORP appears in 1 of 8 AI & ML ETFs (13% coverage) with average weight 4.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 4, proScore: 4.07,
      price: 602.61, weeklyPrices: [584.53, 590.56, 593.57, 598.39, 602.61], weeklyChange: -1.41, sortRank: 0,
      marketCap: '$1.5T', pe: 21.9, revenueGrowth: 33, eps: 27.48, grossMargin: 82, dividendYield: 0.35,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: true, IVES: true, ALAI: true, CHAT: true },
      tonyNote: 'Meta Platforms Inc appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 4.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SIMO', name: 'Silicon Motion Technology Corp', easyScore: 1, proScore: 4.03,
      price: 252.92, weeklyPrices: [245.33, 247.86, 249.13, 251.15, 252.92], weeklyChange: 5.49, sortRank: 0,
      marketCap: '$9B', pe: 50, revenueGrowth: 106, eps: 5.06, grossMargin: 48, dividendYield: 0.79,
      etfPresence: { AIS: true, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'Silicon Motion Technology Corp appears in 1 of 8 AI & ML ETFs (13% coverage) with average weight 4.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC', easyScore: 1, proScore: 4.02,
      price: 79.4, weeklyPrices: [77.02, 77.81, 78.21, 78.84, 79.40], weeklyChange: 2.2, sortRank: 0,
      marketCap: '$97B', pe: 34.8, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.64,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: true, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'WILLIAMS COS INC appears in 1 of 8 AI & ML ETFs (13% coverage) with average weight 4.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SMERY', name: 'SIEMENS ENERGY AG SPON ADR', easyScore: 1, proScore: 4.02,
      price: 196.76, weeklyPrices: [190.86, 192.82, 193.81, 195.38, 196.76], weeklyChange: -0.77, sortRank: 0,
      marketCap: '$167B', pe: 66.7, revenueGrowth: 3, eps: 2.95, grossMargin: 19, dividendYield: 0.41,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: true, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'SIEMENS ENERGY AG SPON ADR appears in 1 of 8 AI & ML ETFs (13% coverage) with average weight 4.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AAPL', name: 'APPLE INC', easyScore: 2, proScore: 4.01,
      price: 298.97, weeklyPrices: [290.00, 292.99, 294.49, 296.88, 298.97], weeklyChange: 0.38, sortRank: 0,
      marketCap: '$4.4T', pe: 36.2, revenueGrowth: 17, eps: 8.25, grossMargin: 48, dividendYield: 0.36,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: true, ALAI: true, CHAT: false },
      tonyNote: 'APPLE INC appears in 2 of 8 AI & ML ETFs (25% coverage) with average weight 4.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 6, proScore: 3.97,
      price: 411.07, weeklyPrices: [398.74, 402.85, 404.90, 408.19, 411.07], weeklyChange: -2.29, sortRank: 0,
      marketCap: '$1.9T', pe: 80, revenueGrowth: 30, eps: 5.14, grossMargin: 77, dividendYield: 0.63,
      etfPresence: { AIS: true, ARTY: true, BAI: true, IVEP: false, IGPT: false, IVES: true, ALAI: true, CHAT: true },
      tonyNote: 'Broadcom Inc appears in 6 of 8 AI & ML ETFs (75% coverage) with average weight 4.0% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MXL', name: 'MaxLinear Inc', easyScore: 2, proScore: 7.99,
      price: 94.86, weeklyPrices: [92.01, 92.96, 93.44, 94.20, 94.86], weeklyChange: 8.46, sortRank: 0,
      marketCap: '$8B', pe: null, revenueGrowth: 43, eps: -1.52, grossMargin: 57, dividendYield: null,
      etfPresence: { SOXX: false, PSI: true, XSD: true, DRAM: false },
      tonyNote: 'MaxLinear Inc appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 8.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, proScore: 6.39,
      price: 414.05, weeklyPrices: [401.63, 405.77, 407.84, 411.15, 414.05], weeklyChange: -1.65, sortRank: 0,
      marketCap: '$675B', pe: 138.9, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: false },
      tonyNote: 'ADVANCED MICRO DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 6.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, proScore: 5.81,
      price: 698.74, weeklyPrices: [677.78, 684.77, 688.26, 693.85, 698.74], weeklyChange: 2.52, sortRank: 0,
      marketCap: '$788B', pe: 33, revenueGrowth: 196, eps: 21.17, grossMargin: 58, dividendYield: 0.09,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: true },
      tonyNote: 'MICRON TECHNOLOGY INC appears in 4 of 4 Semiconductors ETFs (100% coverage) with average weight 5.8% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp/DE', easyScore: 1, proScore: 5.37,
      price: 1383.29, weeklyPrices: [1341.79, 1355.62, 1362.54, 1373.61, 1383.29], weeklyChange: 3.77, sortRank: 0,
      marketCap: '$205B', pe: 47.2, revenueGrowth: 251, eps: 29.33, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: true },
      tonyNote: 'Sandisk Corp/DE appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 5.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION CORP', easyScore: 2, proScore: 5.36,
      price: 110.8, weeklyPrices: [107.48, 108.58, 109.14, 110.02, 110.80], weeklyChange: 2.43, sortRank: 0,
      marketCap: '$557B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: true, PSI: false, XSD: true, DRAM: false },
      tonyNote: 'INTEL CORPORATION CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 5.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 3, proScore: 4.65,
      price: 411.07, weeklyPrices: [398.74, 402.85, 404.90, 408.19, 411.07], weeklyChange: -2.29, sortRank: 0,
      marketCap: '$1.9T', pe: 80, revenueGrowth: 30, eps: 5.14, grossMargin: 77, dividendYield: 0.63,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: false },
      tonyNote: 'BROADCOM INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 4.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, proScore: 4.65,
      price: 176.27, weeklyPrices: [170.98, 172.74, 173.63, 175.04, 176.27], weeklyChange: 4.34, sortRank: 0,
      marketCap: '$154B', pe: 57.4, revenueGrowth: 22, eps: 3.07, grossMargin: 51, dividendYield: 0.14,
      etfPresence: { SOXX: true, PSI: false, XSD: true, DRAM: false },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 4.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 1, proScore: 4.49,
      price: 733.35, weeklyPrices: [711.35, 718.68, 722.35, 728.22, 733.35], weeklyChange: -1.01, sortRank: 0,
      marketCap: '$164B', pe: 69.4, revenueGrowth: 44, eps: 10.56, grossMargin: 42, dividendYield: 0.4,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: true },
      tonyNote: 'Seagate Technology Holdings PLC appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 4.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, proScore: 4.39,
      price: 220.61, weeklyPrices: [213.99, 216.20, 217.30, 219.07, 220.61], weeklyChange: -0.77, sortRank: 0,
      marketCap: '$5.3T', pe: 45, revenueGrowth: 73, eps: 4.9, grossMargin: 71, dividendYield: 0.02,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: false },
      tonyNote: 'NVIDIA CORP appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 4.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, proScore: 4.24,
      price: 406.91, weeklyPrices: [394.70, 398.77, 400.81, 404.06, 406.91], weeklyChange: -1.61, sortRank: 0,
      marketCap: '$323B', pe: 38.3, revenueGrowth: 11, eps: 10.62, grossMargin: 49, dividendYield: 0.52,
      etfPresence: { SOXX: true, PSI: true, XSD: false, DRAM: false },
      tonyNote: 'APPLIED MATERIAL INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 4.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 1, proScore: 4.1,
      price: 455.8, weeklyPrices: [442.13, 446.68, 448.96, 452.61, 455.80], weeklyChange: -0.63, sortRank: 0,
      marketCap: '$157B', pe: 27.2, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.13,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: true },
      tonyNote: 'Western Digital Corp appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 4.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 3, proScore: 3.87,
      price: 302.31, weeklyPrices: [293.24, 296.26, 297.78, 300.19, 302.31], weeklyChange: 0.57, sortRank: 0,
      marketCap: '$275B', pe: 51.6, revenueGrowth: 19, eps: 5.86, grossMargin: 57, dividendYield: 1.88,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: false },
      tonyNote: 'TEXAS INSTRUMENT INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.9% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSEM', name: 'Tower Semiconductor Ltd', easyScore: 1, proScore: 3.8,
      price: 251.28, weeklyPrices: [243.74, 246.25, 247.51, 249.52, 251.28], weeklyChange: 1.29, sortRank: 0,
      marketCap: '$30B', pe: 116.3, revenueGrowth: 16, eps: 2.16, grossMargin: 25, dividendYield: null,
      etfPresence: { SOXX: false, PSI: true, XSD: false, DRAM: false },
      tonyNote: 'Tower Semiconductor Ltd appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, proScore: 3.68,
      price: 1740.58, weeklyPrices: [1688.36, 1705.77, 1714.47, 1728.40, 1740.58], weeklyChange: -0.9, sortRank: 0,
      marketCap: '$227B', pe: 49.3, revenueGrowth: 12, eps: 35.33, grossMargin: 61, dividendYield: 0.53,
      etfPresence: { SOXX: true, PSI: true, XSD: false, DRAM: false },
      tonyNote: 'KLA CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 3.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, proScore: 3.66,
      price: 273.38, weeklyPrices: [265.18, 267.91, 269.28, 271.47, 273.38], weeklyChange: -1.65, sortRank: 0,
      marketCap: '$342B', pe: 51.6, revenueGrowth: 24, eps: 5.3, grossMargin: 50, dividendYield: 0.38,
      etfPresence: { SOXX: true, PSI: true, XSD: false, DRAM: false },
      tonyNote: 'LAM RESEARCH CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 3.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SITM', name: 'SiTime Corp', easyScore: 2, proScore: 3.5,
      price: 693.66, weeklyPrices: [672.85, 679.79, 683.26, 688.80, 693.66], weeklyChange: -4.4, sortRank: 0,
      marketCap: '$18B', pe: null, revenueGrowth: 88, eps: -0.9, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: false, PSI: true, XSD: true, DRAM: false },
      tonyNote: 'SiTime Corp appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 3.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, proScore: 3.24,
      price: 195.61, weeklyPrices: [189.74, 191.70, 192.68, 194.24, 195.61], weeklyChange: -3.94, sortRank: 0,
      marketCap: '$206B', pe: 21.1, revenueGrowth: -4, eps: 9.29, grossMargin: 55, dividendYield: 1.88,
      etfPresence: { SOXX: true, PSI: false, XSD: true, DRAM: false },
      tonyNote: 'QUALCOMM INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 3.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, proScore: 3.08,
      price: 294.28, weeklyPrices: [285.45, 288.39, 289.87, 292.22, 294.28], weeklyChange: 0.89, sortRank: 0,
      marketCap: '$74B', pe: 28.2, revenueGrowth: 12, eps: 10.45, grossMargin: 56, dividendYield: 1.38,
      etfPresence: { SOXX: true, PSI: false, XSD: true, DRAM: false },
      tonyNote: 'NXP SEMICONDUCTORS NV appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 3.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVTS', name: 'NAVITAS SEMICONDUCTOR CORP', easyScore: 1, proScore: 3.08,
      price: 19.43, weeklyPrices: [18.85, 19.04, 19.14, 19.29, 19.43], weeklyChange: -1.22, sortRank: 0,
      marketCap: '$5B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: true, DRAM: false },
      tonyNote: 'NAVITAS SEMICONDUCTOR CORP appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 3.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 3, proScore: 2.87,
      price: 106.02, weeklyPrices: [102.84, 103.90, 104.43, 105.28, 106.02], weeklyChange: -3.12, sortRank: 0,
      marketCap: '$41B', pe: 78, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: false },
      tonyNote: 'ON SEMICONDUCTOR CORP appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 2.9% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'RKLB', name: 'Rocket Lab Corp', easyScore: 1, proScore: 14.49,
      price: 127.31, weeklyPrices: [123.49, 124.76, 125.40, 126.42, 127.31], weeklyChange: -2.94, sortRank: 0,
      marketCap: '$74B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: true },
      tonyNote: 'Rocket Lab Corp appears in 1 of 8 Broad Tech ETFs (13% coverage) with average weight 14.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSLA', name: 'Tesla Inc', easyScore: 3, proScore: 9.42,
      price: 404.11, weeklyPrices: [391.99, 396.03, 398.05, 401.28, 404.11], weeklyChange: -1.43, sortRank: 0,
      marketCap: '$1.5T', pe: 370.7, revenueGrowth: 16, eps: 1.09, grossMargin: 19, dividendYield: null,
      etfPresence: { QQQ: true, QQQA: false, PTF: false, WCLD: false, MAGS: true, IGV: false, FDTX: false, GTEK: false, ARKK: true, MARS: false },
      tonyNote: 'Tesla Inc appears in 3 of 8 Broad Tech ETFs (38% coverage) with average weight 9.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SATS', name: 'EchoStar Corp', easyScore: 1, proScore: 8.78,
      price: 136.52, weeklyPrices: [132.42, 133.79, 134.47, 135.56, 136.52], weeklyChange: 0.05, sortRank: 0,
      marketCap: '$40B', pe: null, revenueGrowth: -5, eps: -50.21, grossMargin: 27, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: true },
      tonyNote: 'EchoStar Corp appears in 1 of 8 Broad Tech ETFs (13% coverage) with average weight 8.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'Microsoft Corp', easyScore: 4, proScore: 7.96,
      price: 417.42, weeklyPrices: [404.90, 409.07, 411.16, 414.50, 417.42], weeklyChange: -1.44, sortRank: 0,
      marketCap: '$3.1T', pe: 24.9, revenueGrowth: 18, eps: 16.78, grossMargin: 68, dividendYield: 0.87,
      etfPresence: { QQQ: true, QQQA: false, PTF: false, WCLD: false, MAGS: true, IGV: true, FDTX: true, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Microsoft Corp appears in 4 of 8 Broad Tech ETFs (50% coverage) with average weight 8.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 5, proScore: 7.02,
      price: 220.61, weeklyPrices: [213.99, 216.20, 217.30, 219.07, 220.61], weeklyChange: -0.77, sortRank: 0,
      marketCap: '$5.3T', pe: 45, revenueGrowth: 73, eps: 4.9, grossMargin: 71, dividendYield: 0.02,
      etfPresence: { QQQ: true, QQQA: false, PTF: true, WCLD: false, MAGS: true, IGV: false, FDTX: true, GTEK: false, ARKK: true, MARS: false },
      tonyNote: 'NVIDIA Corp appears in 5 of 8 Broad Tech ETFs (63% coverage) with average weight 7.0% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AAPL', name: 'Apple Inc', easyScore: 4, proScore: 6.9,
      price: 298.97, weeklyPrices: [290.00, 292.99, 294.49, 296.88, 298.97], weeklyChange: 0.38, sortRank: 0,
      marketCap: '$4.4T', pe: 36.2, revenueGrowth: 17, eps: 8.25, grossMargin: 48, dividendYield: 0.36,
      etfPresence: { QQQ: true, QQQA: false, PTF: true, WCLD: false, MAGS: true, IGV: false, FDTX: true, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Apple Inc appears in 4 of 8 Broad Tech ETFs (50% coverage) with average weight 6.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 4, proScore: 6.58,
      price: 259.34, weeklyPrices: [251.56, 254.15, 255.45, 257.52, 259.34], weeklyChange: -2.08, sortRank: 0,
      marketCap: '$2.8T', pe: 31.6, revenueGrowth: 17, eps: 8.2, grossMargin: 51, dividendYield: null,
      etfPresence: { QQQ: true, QQQA: false, PTF: false, WCLD: false, MAGS: true, IGV: false, FDTX: true, GTEK: false, ARKK: true, MARS: false },
      tonyNote: 'Amazon.com Inc appears in 4 of 8 Broad Tech ETFs (50% coverage) with average weight 6.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'Alphabet Inc Class A', easyScore: 4, proScore: 6.3,
      price: 387.66, weeklyPrices: [376.03, 379.91, 381.85, 384.95, 387.66], weeklyChange: -2.34, sortRank: 0,
      marketCap: '$4.7T', pe: 29.6, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { QQQ: true, QQQA: true, PTF: true, WCLD: false, MAGS: true, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Alphabet Inc Class A appears in 4 of 8 Broad Tech ETFs (50% coverage) with average weight 6.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ARM', name: 'ARM HOLDINGS PLC-ADR', easyScore: 1, proScore: 5.99,
      price: 223.15, weeklyPrices: [216.46, 218.69, 219.80, 221.59, 223.15], weeklyChange: 3.73, sortRank: 0,
      marketCap: '$237B', pe: 262.5, revenueGrowth: 20, eps: 0.85, grossMargin: 98, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: true, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ARM HOLDINGS PLC-ADR appears in 1 of 8 Broad Tech ETFs (13% coverage) with average weight 6.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OHB', name: 'OHB SE', easyScore: 1, proScore: 5.96,
      price: 0, weeklyPrices: [0.00, 0.00, 0.00, 0.00, 0.00], weeklyChange: 0, sortRank: 0,
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: true },
      tonyNote: 'OHB SE appears in 1 of 8 Broad Tech ETFs (13% coverage) with average weight 6.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 1, proScore: 5.4,
      price: 41.59, weeklyPrices: [40.34, 40.76, 40.97, 41.30, 41.59], weeklyChange: -0.05, sortRank: 0,
      marketCap: '$15B', pe: null, revenueGrowth: 41, eps: -0.8, grossMargin: 56, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: true },
      tonyNote: 'Planet Labs PBC appears in 1 of 8 Broad Tech ETFs (13% coverage) with average weight 5.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 4, proScore: 5.3,
      price: 602.61, weeklyPrices: [584.53, 590.56, 593.57, 598.39, 602.61], weeklyChange: -1.41, sortRank: 0,
      marketCap: '$1.5T', pe: 21.9, revenueGrowth: 33, eps: 27.48, grossMargin: 82, dividendYield: 0.35,
      etfPresence: { QQQ: true, QQQA: false, PTF: false, WCLD: false, MAGS: true, IGV: false, FDTX: true, GTEK: false, ARKK: true, MARS: false },
      tonyNote: 'Meta Platforms Inc appears in 4 of 8 Broad Tech ETFs (50% coverage) with average weight 5.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 3, proScore: 4.99,
      price: 414.05, weeklyPrices: [401.63, 405.77, 407.84, 411.15, 414.05], weeklyChange: -1.65, sortRank: 0,
      marketCap: '$675B', pe: 138.9, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { QQQ: true, QQQA: true, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: true, MARS: false },
      tonyNote: 'Advanced Micro Devices Inc appears in 3 of 8 Broad Tech ETFs (38% coverage) with average weight 5.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 2, proScore: 4.86,
      price: 181.46, weeklyPrices: [176.02, 177.83, 178.74, 180.19, 181.46], weeklyChange: -2.76, sortRank: 0,
      marketCap: '$522B', pe: 32.6, revenueGrowth: 22, eps: 5.57, grossMargin: 67, dividendYield: 1.1,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: true, FDTX: true, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ORACLE CORP appears in 2 of 8 Broad Tech ETFs (25% coverage) with average weight 4.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile Inc', easyScore: 2, proScore: 4.81,
      price: 88.1, weeklyPrices: [85.46, 86.34, 86.78, 87.48, 88.10], weeklyChange: 1.46, sortRank: 0,
      marketCap: '$34B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: true, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: true },
      tonyNote: 'AST SpaceMobile Inc appears in 2 of 8 Broad Tech ETFs (25% coverage) with average weight 4.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 2, proScore: 4.79,
      price: 110.8, weeklyPrices: [107.48, 108.58, 109.14, 110.02, 110.80], weeklyChange: 2.43, sortRank: 0,
      marketCap: '$557B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { QQQ: true, QQQA: true, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Intel Corp appears in 2 of 8 Broad Tech ETFs (25% coverage) with average weight 4.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TEM', name: 'TEMPUS AI INC-CL A', easyScore: 1, proScore: 4.79,
      price: 45.53, weeklyPrices: [44.16, 44.62, 44.85, 45.21, 45.53], weeklyChange: 4.38, sortRank: 0,
      marketCap: '$8B', pe: null, revenueGrowth: 36, eps: -1.72, grossMargin: 63, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: true, MARS: false },
      tonyNote: 'TEMPUS AI INC-CL A appears in 1 of 8 Broad Tech ETFs (13% coverage) with average weight 4.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRSP', name: 'CRISPR THERAPEUTICS AG', easyScore: 1, proScore: 4.64,
      price: 47.59, weeklyPrices: [46.16, 46.64, 46.88, 47.26, 47.59], weeklyChange: -2, sortRank: 0,
      marketCap: '$5B', pe: null, revenueGrowth: 69, eps: -6.17, grossMargin: 0, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: true, MARS: false },
      tonyNote: 'CRISPR THERAPEUTICS AG appears in 1 of 8 Broad Tech ETFs (13% coverage) with average weight 4.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'Marvell Technology Inc', easyScore: 3, proScore: 4.61,
      price: 176.27, weeklyPrices: [170.98, 172.74, 173.63, 175.04, 176.27], weeklyChange: 4.34, sortRank: 0,
      marketCap: '$154B', pe: 57.4, revenueGrowth: 22, eps: 3.07, grossMargin: 51, dividendYield: 0.14,
      etfPresence: { QQQ: true, QQQA: true, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: true, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Marvell Technology Inc appears in 3 of 8 Broad Tech ETFs (38% coverage) with average weight 4.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HOOD', name: 'ROBINHOOD MARKETS INC - A', easyScore: 1, proScore: 4.49,
      price: 74.16, weeklyPrices: [71.94, 72.68, 73.05, 73.64, 74.16], weeklyChange: -3.88, sortRank: 0,
      marketCap: '$67B', pe: 36, revenueGrowth: 15, eps: 2.06, grossMargin: 92, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: true, MARS: false },
      tonyNote: 'ROBINHOOD MARKETS INC - A appears in 1 of 8 Broad Tech ETFs (13% coverage) with average weight 4.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 3, proScore: 5.27,
      price: 261.58, weeklyPrices: [253.73, 256.35, 257.66, 259.75, 261.58], weeklyChange: -1.96, sortRank: 0,
      marketCap: '$10B', pe: 51, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.14,
      etfPresence: { POW: true, VOLT: true, PBD: false, PBW: true },
      tonyNote: 'Powell Industries Inc appears in 3 of 4 Electrification ETFs (75% coverage) with average weight 5.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 2, proScore: 4.54,
      price: 371.88, weeklyPrices: [360.72, 364.44, 366.30, 369.28, 371.88], weeklyChange: -2.62, sortRank: 0,
      marketCap: '$144B', pe: 36.4, revenueGrowth: 17, eps: 10.23, grossMargin: 37, dividendYield: 1.18,
      etfPresence: { POW: true, VOLT: true, PBD: false, PBW: false },
      tonyNote: 'Eaton Corp PLC appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 4.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, proScore: 4.45,
      price: 243.43, weeklyPrices: [236.13, 238.56, 239.78, 241.73, 243.43], weeklyChange: -2.24, sortRank: 0,
      marketCap: '$11B', pe: 81.4, revenueGrowth: 20, eps: 2.99, grossMargin: 54, dividendYield: null,
      etfPresence: { POW: true, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Vicor Corp appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 4.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 3, proScore: 4.09,
      price: 714.13, weeklyPrices: [692.71, 699.85, 703.42, 709.13, 714.13], weeklyChange: -1.23, sortRank: 0,
      marketCap: '$107B', pe: 98.1, revenueGrowth: 26, eps: 7.28, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: true, VOLT: true, PBD: false, PBW: true },
      tonyNote: 'Quanta Services Inc appears in 3 of 4 Electrification ETFs (75% coverage) with average weight 4.1% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 2, proScore: 3.95,
      price: 1011.8, weeklyPrices: [981.45, 991.56, 996.62, 1004.72, 1011.80], weeklyChange: -0.04, sortRank: 0,
      marketCap: '$272B', pe: 29.6, revenueGrowth: 16, eps: 34.2, grossMargin: 20, dividendYield: 0.17,
      etfPresence: { POW: true, VOLT: true, PBD: false, PBW: false },
      tonyNote: 'GE Vernova Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 4.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 3, proScore: 3.84,
      price: 249.71, weeklyPrices: [242.22, 244.72, 245.96, 247.96, 249.71], weeklyChange: -3.32, sortRank: 0,
      marketCap: '$4B', pe: 60.2, revenueGrowth: 17, eps: 4.15, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: true, VOLT: true, PBD: false, PBW: true },
      tonyNote: 'Bel Fuse Inc appears in 3 of 4 Electrification ETFs (75% coverage) with average weight 3.8% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OGE', name: 'OGE ENERGY CORP', easyScore: 1, proScore: 3.82,
      price: 48.05, weeklyPrices: [46.61, 47.09, 47.33, 47.71, 48.05], weeklyChange: 1.56, sortRank: 0,
      marketCap: '$10B', pe: 21.4, revenueGrowth: 1, eps: 2.25, grossMargin: 44, dividendYield: 3.54,
      etfPresence: { POW: false, VOLT: true, PBD: false, PBW: false },
      tonyNote: 'OGE ENERGY CORP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 2, proScore: 3.71,
      price: 90.06, weeklyPrices: [87.36, 88.26, 88.71, 89.43, 90.06], weeklyChange: 1.15, sortRank: 0,
      marketCap: '$188B', pe: 22.9, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.77,
      etfPresence: { POW: true, VOLT: true, PBD: false, PBW: false },
      tonyNote: 'NextEra Energy Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 3.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ET', name: 'ENERGY TRANSFER LP', easyScore: 1, proScore: 3.69,
      price: 20.39, weeklyPrices: [19.78, 19.98, 20.08, 20.25, 20.39], weeklyChange: 0.99, sortRank: 0,
      marketCap: '$70B', pe: 17, revenueGrowth: 32, eps: 1.2, grossMargin: 19, dividendYield: 6.55,
      etfPresence: { POW: false, VOLT: true, PBD: false, PBW: false },
      tonyNote: 'ENERGY TRANSFER LP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 3.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETR', name: 'ENTERGY CORP', easyScore: 1, proScore: 3.66,
      price: 110.55, weeklyPrices: [107.23, 108.34, 108.89, 109.78, 110.55], weeklyChange: 0.89, sortRank: 0,
      marketCap: '$51B', pe: 28.2, revenueGrowth: 12, eps: 3.92, grossMargin: 47, dividendYield: 2.32,
      etfPresence: { POW: false, VOLT: true, PBD: false, PBW: false },
      tonyNote: 'ENTERGY CORP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 3.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 1, proScore: 3.64,
      price: 322.63, weeklyPrices: [312.95, 316.18, 317.79, 320.37, 322.63], weeklyChange: -5.03, sortRank: 0,
      marketCap: '$124B', pe: 81.3, revenueGrowth: 30, eps: 3.97, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: true, PBD: false, PBW: false },
      tonyNote: 'VERTIV HOLDINGS CO appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 3.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 2, proScore: 3.46,
      price: 158.23, weeklyPrices: [153.48, 155.07, 155.86, 157.12, 158.23], weeklyChange: -1.53, sortRank: 0,
      marketCap: '$26B', pe: 53.8, revenueGrowth: 54, eps: 2.94, grossMargin: 37, dividendYield: 0.53,
      etfPresence: { POW: true, VOLT: true, PBD: false, PBW: false },
      tonyNote: 'nVent Electric PLC appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 3.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ENR', name: 'Siemens Energy AG', easyScore: 1, proScore: 3.3,
      price: 16.23, weeklyPrices: [15.74, 15.91, 15.99, 16.12, 16.23], weeklyChange: -1.87, sortRank: 0,
      marketCap: '$1B', pe: 5.9, revenueGrowth: -3, eps: 2.73, grossMargin: 43, dividendYield: 7.39,
      etfPresence: { POW: true, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Siemens Energy AG appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 3.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NI', name: 'NISOURCE INC', easyScore: 1, proScore: 3.3,
      price: 47.42, weeklyPrices: [46.00, 46.47, 46.71, 47.09, 47.42], weeklyChange: 1.87, sortRank: 0,
      marketCap: '$23B', pe: 23.6, revenueGrowth: 8, eps: 2.01, grossMargin: 51, dividendYield: 2.53,
      etfPresence: { POW: false, VOLT: true, PBD: false, PBW: false },
      tonyNote: 'NISOURCE INC appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 3.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IDA', name: 'IDACORP INC', easyScore: 1, proScore: 3.26,
      price: 141.95, weeklyPrices: [137.69, 139.11, 139.82, 140.96, 141.95], weeklyChange: 0.88, sortRank: 0,
      marketCap: '$8B', pe: 23.7, revenueGrowth: -7, eps: 6, grossMargin: 38, dividendYield: 2.47,
      etfPresence: { POW: false, VOLT: true, PBD: false, PBW: false },
      tonyNote: 'IDACORP INC appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 3.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FCEL', name: 'FuelCell Energy Inc', easyScore: 1, proScore: 3.19,
      price: 17.36, weeklyPrices: [16.84, 17.01, 17.10, 17.24, 17.36], weeklyChange: -2.14, sortRank: 0,
      marketCap: '$920M', pe: null, revenueGrowth: 61, eps: -6.49, grossMargin: -16, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: true },
      tonyNote: 'FuelCell Energy Inc appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 3.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MOD', name: 'MODINE MANUFACTURING CO', easyScore: 1, proScore: 3.04,
      price: 244.49, weeklyPrices: [237.16, 239.60, 240.82, 242.78, 244.49], weeklyChange: -1.07, sortRank: 0,
      marketCap: '$13B', pe: 133.6, revenueGrowth: 31, eps: 1.83, grossMargin: 24, dividendYield: null,
      etfPresence: { POW: false, VOLT: true, PBD: false, PBW: false },
      tonyNote: 'MODINE MANUFACTURING CO appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ABBN', name: 'ABB LTD', easyScore: 1, proScore: 3,
      price: 0, weeklyPrices: [0.00, 0.00, 0.00, 0.00, 0.00], weeklyChange: 0, sortRank: 0,
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { POW: false, VOLT: true, PBD: false, PBW: false },
      tonyNote: 'ABB LTD appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, proScore: 2.86,
      price: 128.92, weeklyPrices: [125.05, 126.34, 126.99, 128.02, 128.92], weeklyChange: 0.97, sortRank: 0,
      marketCap: '$70B', pe: 19.1, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.95,
      etfPresence: { POW: true, VOLT: true, PBD: false, PBW: false },
      tonyNote: 'American Electric Power Co Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PRY', name: 'Prysmian SpA', easyScore: 2, proScore: 2.75,
      price: 0, weeklyPrices: [0.00, 0.00, 0.00, 0.00, 0.00], weeklyChange: 0, sortRank: 0,
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { POW: true, VOLT: false, PBD: true, PBW: false },
      tonyNote: 'Prysmian SpA appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'TTMI', name: 'TTM Technologies Inc', easyScore: 1, proScore: 5.24,
      price: 161.41, weeklyPrices: [156.57, 158.18, 158.99, 160.28, 161.41], weeklyChange: 1.61, sortRank: 0,
      marketCap: '$17B', pe: 87.7, revenueGrowth: 30, eps: 1.84, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: false, PRN: true },
      tonyNote: 'TTM Technologies Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 5.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, proScore: 5.03,
      price: 728.29, weeklyPrices: [706.44, 713.72, 717.37, 723.19, 728.29], weeklyChange: -5.51, sortRank: 0,
      marketCap: '$22B', pe: 64.9, revenueGrowth: 92, eps: 11.22, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: true, PRN: true },
      tonyNote: 'Sterling Infrastructure, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 5.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 1, proScore: 4.71,
      price: 41.59, weeklyPrices: [40.34, 40.76, 40.97, 41.30, 41.59], weeklyChange: -0.05, sortRank: 0,
      marketCap: '$15B', pe: null, revenueGrowth: 41, eps: -0.8, grossMargin: 56, dividendYield: null,
      etfPresence: { AIRR: false, PRN: true },
      tonyNote: 'Planet Labs PBC appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 4.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, proScore: 4.64,
      price: 1825.5, weeklyPrices: [1770.73, 1788.99, 1798.12, 1812.72, 1825.50], weeklyChange: -1.56, sortRank: 0,
      marketCap: '$64B', pe: 52.6, revenueGrowth: 1, eps: 34.68, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: true, PRN: true },
      tonyNote: 'Comfort Systems USA, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 4.6% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, proScore: 4.36,
      price: 639.58, weeklyPrices: [620.39, 626.79, 629.99, 635.10, 639.58], weeklyChange: -3.79, sortRank: 0,
      marketCap: '$9B', pe: 65.8, revenueGrowth: 13, eps: 9.72, grossMargin: 20, dividendYield: 0.31,
      etfPresence: { AIRR: true, PRN: true },
      tonyNote: 'Argan, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 4.4% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 1, proScore: 4.28,
      price: 714.13, weeklyPrices: [692.71, 699.85, 703.42, 709.13, 714.13], weeklyChange: -1.23, sortRank: 0,
      marketCap: '$107B', pe: 98.1, revenueGrowth: 26, eps: 7.28, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { AIRR: false, PRN: true },
      tonyNote: 'Quanta Services Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 4.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'EME', name: 'EMCOR Group, Inc.', easyScore: 1, proScore: 4.22,
      price: 854.36, weeklyPrices: [828.73, 837.27, 841.54, 848.38, 854.36], weeklyChange: -2.6, sortRank: 0,
      marketCap: '$38B', pe: 28.7, revenueGrowth: 20, eps: 29.73, grossMargin: 19, dividendYield: 0.15,
      etfPresence: { AIRR: true, PRN: false },
      tonyNote: 'EMCOR Group, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 4.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SAIA', name: 'Saia, Inc.', easyScore: 1, proScore: 4.1,
      price: 448.95, weeklyPrices: [435.48, 439.97, 442.22, 445.81, 448.95], weeklyChange: -2.04, sortRank: 0,
      marketCap: '$12B', pe: 47.2, revenueGrowth: 2, eps: 9.51, grossMargin: 24, dividendYield: null,
      etfPresence: { AIRR: true, PRN: false },
      tonyNote: 'Saia, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 4.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CHRW', name: 'C.H. Robinson Worldwide, Inc.', easyScore: 1, proScore: 3.92,
      price: 173.02, weeklyPrices: [167.83, 169.56, 170.42, 171.81, 173.02], weeklyChange: 1.94, sortRank: 0,
      marketCap: '$20B', pe: 35, revenueGrowth: -1, eps: 4.95, grossMargin: 9, dividendYield: 1.46,
      etfPresence: { AIRR: true, PRN: false },
      tonyNote: 'C.H. Robinson Worldwide, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JBL', name: 'Jabil Inc', easyScore: 1, proScore: 3.9,
      price: 332.88, weeklyPrices: [322.89, 326.22, 327.89, 330.55, 332.88], weeklyChange: -1.73, sortRank: 0,
      marketCap: '$35B', pe: 44.9, revenueGrowth: 23, eps: 7.42, grossMargin: 9, dividendYield: 0.1,
      etfPresence: { AIRR: false, PRN: true },
      tonyNote: 'Jabil Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MTZ', name: 'MasTec, Inc.', easyScore: 2, proScore: 3.69,
      price: 385, weeklyPrices: [373.45, 377.30, 379.23, 382.31, 385.00], weeklyChange: -0.15, sortRank: 0,
      marketCap: '$30B', pe: 67.5, revenueGrowth: 35, eps: 5.7, grossMargin: 13, dividendYield: null,
      etfPresence: { AIRR: true, PRN: true },
      tonyNote: 'MasTec, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 3.7% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, proScore: 3.47,
      price: 243.43, weeklyPrices: [236.13, 238.56, 239.78, 241.73, 243.43], weeklyChange: -2.24, sortRank: 0,
      marketCap: '$11B', pe: 81.4, revenueGrowth: 20, eps: 2.99, grossMargin: 54, dividendYield: null,
      etfPresence: { AIRR: false, PRN: true },
      tonyNote: 'Vicor Corp appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CMI', name: 'Cummins Inc', easyScore: 1, proScore: 3.41,
      price: 659.46, weeklyPrices: [639.68, 646.27, 649.57, 654.84, 659.46], weeklyChange: -2.72, sortRank: 0,
      marketCap: '$91B', pe: 34.2, revenueGrowth: 3, eps: 19.26, grossMargin: 26, dividendYield: 1.21,
      etfPresence: { AIRR: false, PRN: true },
      tonyNote: 'Cummins Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 1, proScore: 3.36,
      price: 253.12, weeklyPrices: [245.53, 248.06, 249.32, 251.35, 253.12], weeklyChange: -1.51, sortRank: 0,
      marketCap: '$101B', pe: 58.9, revenueGrowth: 19, eps: 4.3, grossMargin: 35, dividendYield: 0.19,
      etfPresence: { AIRR: false, PRN: true },
      tonyNote: 'Howmet Aerospace Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ITT', name: 'ITT Inc', easyScore: 1, proScore: 3.29,
      price: 191.04, weeklyPrices: [185.31, 187.22, 188.17, 189.70, 191.04], weeklyChange: -2.02, sortRank: 0,
      marketCap: '$17B', pe: 33.7, revenueGrowth: 33, eps: 5.67, grossMargin: 35, dividendYield: 0.81,
      etfPresence: { AIRR: false, PRN: true },
      tonyNote: 'ITT Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 1, proScore: 3.28,
      price: 197.33, weeklyPrices: [191.41, 193.38, 194.37, 195.95, 197.33], weeklyChange: -2.15, sortRank: 0,
      marketCap: '$18B', pe: 52.6, revenueGrowth: 26, eps: 3.75, grossMargin: 23, dividendYield: 0.53,
      etfPresence: { AIRR: true, PRN: false },
      tonyNote: 'BWX Technologies, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 1, proScore: 3.25,
      price: 860.15, weeklyPrices: [834.35, 842.95, 847.25, 854.13, 860.15], weeklyChange: -0.44, sortRank: 0,
      marketCap: '$396B', pe: 42.9, revenueGrowth: 22, eps: 20.04, grossMargin: 29, dividendYield: 0.7,
      etfPresence: { AIRR: false, PRN: true },
      tonyNote: 'Caterpillar Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 1, proScore: 3.06,
      price: 324.6, weeklyPrices: [314.86, 318.11, 319.73, 322.33, 324.60], weeklyChange: -1.44, sortRank: 0,
      marketCap: '$13B', pe: 21.1, revenueGrowth: 13, eps: 15.39, grossMargin: 12, dividendYield: 1.7,
      etfPresence: { AIRR: true, PRN: false },
      tonyNote: 'Huntington Ingalls Industries, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OC', name: 'Owens Corning', easyScore: 1, proScore: 2.93,
      price: 107.95, weeklyPrices: [104.71, 105.79, 106.33, 107.19, 107.95], weeklyChange: -3.79, sortRank: 0,
      marketCap: '$9B', pe: null, revenueGrowth: -10, eps: -4.74, grossMargin: 27, dividendYield: 2.74,
      etfPresence: { AIRR: true, PRN: false },
      tonyNote: 'Owens Corning appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 1, proScore: 2.91,
      price: 322.63, weeklyPrices: [312.95, 316.18, 317.79, 320.37, 322.63], weeklyChange: -5.03, sortRank: 0,
      marketCap: '$124B', pe: 81.3, revenueGrowth: 30, eps: 3.97, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIRR: false, PRN: true },
      tonyNote: 'Vertiv Holdings Co appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
