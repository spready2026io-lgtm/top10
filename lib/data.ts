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
  'AI & ML':         6,
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
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 5, proScore: 6.86,
      price: 224.16, weeklyPrices: [217.44, 219.68, 220.80, 222.59, 224.16], weeklyChange: 0.31, sortRank: 0,
      marketCap: '$5.4T', pe: 34.3, revenueGrowth: 73, eps: 6.53, grossMargin: 71, dividendYield: 0.02,
      etfPresence: { AIS: 3.01, ARTY: 4.24, BAI: 5.71, IVEP: false, IGPT: false, IVES: false, ALAI: 14.3, CHAT: 7.06 },
      tonyNote: 'NVIDIA Corp appears in 5 of 6 AI & ML ETFs (83% coverage) with average weight 6.9% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc. Class C', easyScore: 1, proScore: 6.44,
      price: 380.7, weeklyPrices: [369.28, 373.09, 374.99, 378.04, 380.70], weeklyChange: -1.09, sortRank: 0,
      marketCap: '$4.6T', pe: 29, revenueGrowth: 22, eps: 13.13, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 6.44, CHAT: false },
      tonyNote: 'Alphabet Inc. Class C appears in 1 of 6 AI & ML ETFs (17% coverage) with average weight 6.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 2, proScore: 5.31,
      price: 384.58, weeklyPrices: [373.04, 376.89, 378.81, 381.89, 384.58], weeklyChange: -1.11, sortRank: 0,
      marketCap: '$4.7T', pe: 29.3, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: 4.07, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 6.56 },
      tonyNote: 'ALPHABET INC CLASS A appears in 2 of 6 AI & ML ETFs (33% coverage) with average weight 5.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com, Inc.', easyScore: 2, proScore: 5.12,
      price: 261.91, weeklyPrices: [254.05, 256.67, 257.98, 260.08, 261.91], weeklyChange: -1.17, sortRank: 0,
      marketCap: '$2.8T', pe: 31.3, revenueGrowth: 17, eps: 8.37, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 6.44, CHAT: 3.79 },
      tonyNote: 'Amazon.com, Inc. appears in 2 of 6 AI & ML ETFs (33% coverage) with average weight 5.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 5, proScore: 4.8,
      price: 733.48, weeklyPrices: [711.48, 718.81, 722.48, 728.35, 733.48], weeklyChange: 0.2, sortRank: 0,
      marketCap: '$827B', pe: 34.7, revenueGrowth: 196, eps: 21.15, grossMargin: 58, dividendYield: 0.08,
      etfPresence: { AIS: 7.22, ARTY: 6.29, BAI: 4.24, IVEP: false, IGPT: false, IVES: false, ALAI: 1.01, CHAT: 5.24 },
      tonyNote: 'Micron Technology Inc appears in 5 of 6 AI & ML ETFs (83% coverage) with average weight 4.8% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 5, proScore: 4.68,
      price: 444.22, weeklyPrices: [430.89, 435.34, 437.56, 441.11, 444.22], weeklyChange: -0.75, sortRank: 0,
      marketCap: '$724B', pe: 148.1, revenueGrowth: 38, eps: 3, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.6, ARTY: 7.38, BAI: 4.75, IVEP: false, IGPT: false, IVES: false, ALAI: 0.98, CHAT: 5.7 },
      tonyNote: 'Advanced Micro Devices Inc appears in 5 of 6 AI & ML ETFs (83% coverage) with average weight 4.7% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 1, proScore: 4.42,
      price: 293.56, weeklyPrices: [284.75, 287.69, 289.16, 291.51, 293.56], weeklyChange: 0.5, sortRank: 0,
      marketCap: '$367B', pe: 55.5, revenueGrowth: 24, eps: 5.29, grossMargin: 50, dividendYield: 0.36,
      etfPresence: { AIS: false, ARTY: false, BAI: 4.42, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'LAM RESEARCH CORP appears in 1 of 6 AI & ML ETFs (17% coverage) with average weight 4.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 3, proScore: 4.41,
      price: 402.93, weeklyPrices: [390.84, 394.87, 396.89, 400.11, 402.93], weeklyChange: 0.32, sortRank: 0,
      marketCap: '$2.1T', pe: 34.6, revenueGrowth: 35, eps: 11.65, grossMargin: 62, dividendYield: 0.95,
      etfPresence: { AIS: 3.41, ARTY: false, BAI: 4.39, IVEP: false, IGPT: false, IVES: false, ALAI: 5.42, CHAT: false },
      tonyNote: 'Taiwan Semiconductor Manufacturing Co Ltd appears in 3 of 6 AI & ML ETFs (50% coverage) with average weight 4.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PWR', name: 'QUANTA SERVICES INC', easyScore: 1, proScore: 4.35,
      price: 713.83, weeklyPrices: [692.42, 699.55, 703.12, 708.83, 713.83], weeklyChange: 0.58, sortRank: 0,
      marketCap: '$107B', pe: 97.7, revenueGrowth: 26, eps: 7.31, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: 4.35, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'QUANTA SERVICES INC appears in 1 of 6 AI & ML ETFs (17% coverage) with average weight 4.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SMERY', name: 'SIEMENS ENERGY AG SPON ADR', easyScore: 1, proScore: 4.05,
      price: 202.6, weeklyPrices: [196.52, 198.55, 199.56, 201.18, 202.60], weeklyChange: 2.97, sortRank: 0,
      marketCap: '$172B', pe: 68.4, revenueGrowth: 3, eps: 2.96, grossMargin: 19, dividendYield: 0.4,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: 4.05, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'SIEMENS ENERGY AG SPON ADR appears in 1 of 6 AI & ML ETFs (17% coverage) with average weight 4.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SIMO', name: 'Silicon Motion Technology Corp', easyScore: 1, proScore: 3.98,
      price: 261.29, weeklyPrices: [253.45, 256.06, 257.37, 259.46, 261.29], weeklyChange: 1.27, sortRank: 0,
      marketCap: '$9B', pe: 51.8, revenueGrowth: 106, eps: 5.04, grossMargin: 48, dividendYield: 0.77,
      etfPresence: { AIS: 3.98, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'Silicon Motion Technology Corp appears in 1 of 6 AI & ML ETFs (17% coverage) with average weight 4.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SBGSY', name: 'SCHNEIDER ELECT SE-UNSP ADR', easyScore: 1, proScore: 3.95,
      price: 61.71, weeklyPrices: [59.86, 60.48, 60.78, 61.28, 61.71], weeklyChange: 4.29, sortRank: 0,
      marketCap: '$174B', pe: 33.2, revenueGrowth: 4, eps: 1.86, grossMargin: 42, dividendYield: 1.6,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: 3.95, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'SCHNEIDER ELECT SE-UNSP ADR appears in 1 of 6 AI & ML ETFs (17% coverage) with average weight 4.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC', easyScore: 1, proScore: 3.86,
      price: 77.89, weeklyPrices: [75.55, 76.33, 76.72, 77.34, 77.89], weeklyChange: 0.01, sortRank: 0,
      marketCap: '$95B', pe: 34.2, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.7,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: 3.86, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'WILLIAMS COS INC appears in 1 of 6 AI & ML ETFs (17% coverage) with average weight 3.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'EQIX', name: 'EQUINIX INC', easyScore: 1, proScore: 3.84,
      price: 1064.38, weeklyPrices: [1032.45, 1043.09, 1048.41, 1056.93, 1064.38], weeklyChange: -0.06, sortRank: 0,
      marketCap: '$105B', pe: 73.5, revenueGrowth: 12, eps: 14.48, grossMargin: 52, dividendYield: 1.85,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: 3.84, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'EQUINIX INC appears in 1 of 6 AI & ML ETFs (17% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 3, proScore: 3.81,
      price: 190.72, weeklyPrices: [185.00, 186.91, 187.86, 189.38, 190.72], weeklyChange: 2.1, sortRank: 0,
      marketCap: '$167B', pe: 62.3, revenueGrowth: 22, eps: 3.06, grossMargin: 51, dividendYield: 0.13,
      etfPresence: { AIS: 3.37, ARTY: 6.72, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.35 },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 3 of 6 AI & ML ETFs (50% coverage) with average weight 3.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 5, proScore: 3.73,
      price: 417.72, weeklyPrices: [405.19, 409.37, 411.45, 414.80, 417.72], weeklyChange: -0.01, sortRank: 0,
      marketCap: '$2.0T', pe: 81.3, revenueGrowth: 30, eps: 5.14, grossMargin: 77, dividendYield: 0.62,
      etfPresence: { AIS: 0.83, ARTY: 4.08, BAI: 5.58, IVEP: false, IGPT: false, IVES: false, ALAI: 4.65, CHAT: 3.53 },
      tonyNote: 'Broadcom Inc appears in 5 of 6 AI & ML ETFs (83% coverage) with average weight 3.7% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NEE', name: 'NEXTERA ENERGY INC', easyScore: 1, proScore: 3.68,
      price: 88.81, weeklyPrices: [86.15, 87.03, 87.48, 88.19, 88.81], weeklyChange: 0.61, sortRank: 0,
      marketCap: '$185B', pe: 22.5, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.82,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: 3.68, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'NEXTERA ENERGY INC appears in 1 of 6 AI & ML ETFs (17% coverage) with average weight 3.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 3, proScore: 3.66,
      price: 423.41, weeklyPrices: [410.71, 414.94, 417.06, 420.45, 423.41], weeklyChange: 0.56, sortRank: 0,
      marketCap: '$3.1T', pe: 25.2, revenueGrowth: 18, eps: 16.8, grossMargin: 68, dividendYield: 0.86,
      etfPresence: { AIS: false, ARTY: 2.04, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 5.59, CHAT: 3.34 },
      tonyNote: 'MICROSOFT CORP appears in 3 of 6 AI & ML ETFs (50% coverage) with average weight 3.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SO', name: 'SOUTHERN CO/THE', easyScore: 1, proScore: 3.65,
      price: 93.52, weeklyPrices: [90.71, 91.65, 92.12, 92.87, 93.52], weeklyChange: -0.12, sortRank: 0,
      marketCap: '$105B', pe: 23.9, revenueGrowth: 8, eps: 3.91, grossMargin: 48, dividendYield: 3.25,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: 3.65, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'SOUTHERN CO/THE appears in 1 of 6 AI & ML ETFs (17% coverage) with average weight 3.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMT', name: 'AMERICAN TOWER CORP', easyScore: 1, proScore: 3.62,
      price: 182.94, weeklyPrices: [177.45, 179.28, 180.20, 181.66, 182.94], weeklyChange: -0.57, sortRank: 0,
      marketCap: '$85B', pe: 29.5, revenueGrowth: 7, eps: 6.2, grossMargin: 74, dividendYield: 3.74,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: 3.62, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'AMERICAN TOWER CORP appears in 1 of 6 AI & ML ETFs (17% coverage) with average weight 3.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MXL', name: 'MAXLINEAR INC', easyScore: 1, proScore: 7.06,
      price: 95.52, weeklyPrices: [92.65, 93.61, 94.09, 94.85, 95.52], weeklyChange: -1.29, sortRank: 0,
      marketCap: '$9B', pe: null, revenueGrowth: 43, eps: -1.52, grossMargin: 57, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: 7.06, DRAM: false },
      tonyNote: 'MAXLINEAR INC appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 7.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 2, proScore: 6.26,
      price: 444.22, weeklyPrices: [430.89, 435.34, 437.56, 441.11, 444.22], weeklyChange: -0.75, sortRank: 0,
      marketCap: '$724B', pe: 148.1, revenueGrowth: 38, eps: 3, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 9, PSI: false, XSD: 3.53, DRAM: false },
      tonyNote: 'ADVANCED MICRO DEVICES INC appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 6.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 3, proScore: 5.89,
      price: 733.48, weeklyPrices: [711.48, 718.81, 722.48, 728.35, 733.48], weeklyChange: 0.2, sortRank: 0,
      marketCap: '$827B', pe: 34.7, revenueGrowth: 196, eps: 21.15, grossMargin: 58, dividendYield: 0.08,
      etfPresence: { SOXX: 9.58, PSI: false, XSD: 2.83, DRAM: 5.27 },
      tonyNote: 'MICRON TECHNOLOGY INC appears in 3 of 3 Semiconductors ETFs (100% coverage) with average weight 5.9% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION CORP', easyScore: 2, proScore: 5.53,
      price: 115.89, weeklyPrices: [112.41, 113.57, 114.15, 115.08, 115.89], weeklyChange: -2.58, sortRank: 0,
      marketCap: '$582B', pe: null, revenueGrowth: 7, eps: -0.59, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 7.04, PSI: false, XSD: 4.01, DRAM: false },
      tonyNote: 'INTEL CORPORATION CORP appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 5.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp/DE', easyScore: 1, proScore: 5.32,
      price: 1403.59, weeklyPrices: [1361.48, 1375.52, 1382.54, 1393.76, 1403.59], weeklyChange: 0.79, sortRank: 0,
      marketCap: '$208B', pe: 48, revenueGrowth: 251, eps: 29.24, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 5.32 },
      tonyNote: 'Sandisk Corp/DE appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 5.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, proScore: 4.76,
      price: 190.72, weeklyPrices: [185.00, 186.91, 187.86, 189.38, 190.72], weeklyChange: 2.1, sortRank: 0,
      marketCap: '$167B', pe: 62.3, revenueGrowth: 22, eps: 3.06, grossMargin: 51, dividendYield: 0.13,
      etfPresence: { SOXX: 6.17, PSI: false, XSD: 3.34, DRAM: false },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 4.8% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 1, proScore: 4.61,
      price: 424.92, weeklyPrices: [412.17, 416.42, 418.55, 421.95, 424.92], weeklyChange: -0.45, sortRank: 0,
      marketCap: '$337B', pe: 40, revenueGrowth: 11, eps: 10.63, grossMargin: 49, dividendYield: 0.5,
      etfPresence: { SOXX: 4.61, PSI: false, XSD: false, DRAM: false },
      tonyNote: 'APPLIED MATERIAL INC appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 4.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 1, proScore: 4.53,
      price: 768.39, weeklyPrices: [745.34, 753.02, 756.86, 763.01, 768.39], weeklyChange: 2.31, sortRank: 0,
      marketCap: '$172B', pe: 73.1, revenueGrowth: 44, eps: 10.51, grossMargin: 42, dividendYield: 0.39,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 4.53 },
      tonyNote: 'Seagate Technology Holdings PLC appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 4.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, proScore: 4.52,
      price: 417.72, weeklyPrices: [405.19, 409.37, 411.45, 414.80, 417.72], weeklyChange: -0.01, sortRank: 0,
      marketCap: '$2.0T', pe: 81.3, revenueGrowth: 30, eps: 5.14, grossMargin: 77, dividendYield: 0.62,
      etfPresence: { SOXX: 7.06, PSI: false, XSD: 1.98, DRAM: false },
      tonyNote: 'BROADCOM INC appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 4.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 2, proScore: 4.38,
      price: 224.16, weeklyPrices: [217.44, 219.68, 220.80, 222.59, 224.16], weeklyChange: 0.31, sortRank: 0,
      marketCap: '$5.4T', pe: 34.3, revenueGrowth: 73, eps: 6.53, grossMargin: 71, dividendYield: 0.02,
      etfPresence: { SOXX: 6.81, PSI: false, XSD: 1.94, DRAM: false },
      tonyNote: 'NVIDIA CORP appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 4.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 1, proScore: 4.06,
      price: 460.8, weeklyPrices: [446.98, 451.58, 453.89, 457.57, 460.80], weeklyChange: 0.26, sortRank: 0,
      marketCap: '$159B', pe: 27.5, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.13,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 4.06 },
      tonyNote: 'Western Digital Corp appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 4.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVTS', name: 'NAVITAS SEMICONDUCTOR CORP', easyScore: 1, proScore: 3.4,
      price: 22.38, weeklyPrices: [21.71, 21.93, 22.04, 22.22, 22.38], weeklyChange: -2.65, sortRank: 0,
      marketCap: '$5B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: 3.4, DRAM: false },
      tonyNote: 'NAVITAS SEMICONDUCTOR CORP appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 3.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 1, proScore: 3.37,
      price: 293.56, weeklyPrices: [284.75, 287.69, 289.16, 291.51, 293.56], weeklyChange: 0.5, sortRank: 0,
      marketCap: '$367B', pe: 55.5, revenueGrowth: 24, eps: 5.29, grossMargin: 50, dividendYield: 0.36,
      etfPresence: { SOXX: 3.37, PSI: false, XSD: false, DRAM: false },
      tonyNote: 'LAM RESEARCH CORP appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 3.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 1, proScore: 3.24,
      price: 1838.07, weeklyPrices: [1782.93, 1801.31, 1810.50, 1825.20, 1838.07], weeklyChange: 0.47, sortRank: 0,
      marketCap: '$240B', pe: 52.1, revenueGrowth: 12, eps: 35.31, grossMargin: 61, dividendYield: 0.5,
      etfPresence: { SOXX: 3.24, PSI: false, XSD: false, DRAM: false },
      tonyNote: 'KLA CORP appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 3.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SITM', name: 'SITIME CORP', easyScore: 1, proScore: 3.21,
      price: 698.59, weeklyPrices: [677.63, 684.62, 688.11, 693.70, 698.59], weeklyChange: 0.23, sortRank: 0,
      marketCap: '$18B', pe: null, revenueGrowth: 88, eps: -0.9, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: 3.21, DRAM: false },
      tonyNote: 'SITIME CORP appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 3.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, proScore: 3.18,
      price: 301.69, weeklyPrices: [292.64, 295.66, 297.16, 299.58, 301.69], weeklyChange: -1.05, sortRank: 0,
      marketCap: '$275B', pe: 51.6, revenueGrowth: 19, eps: 5.85, grossMargin: 57, dividendYield: 1.86,
      etfPresence: { SOXX: 3.88, PSI: false, XSD: 2.48, DRAM: false },
      tonyNote: 'TEXAS INSTRUMENT INC appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 3.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, proScore: 3.14,
      price: 203, weeklyPrices: [196.91, 198.94, 199.95, 201.58, 203.00], weeklyChange: 0.24, sortRank: 0,
      marketCap: '$214B', pe: 21.8, revenueGrowth: -4, eps: 9.3, grossMargin: 55, dividendYield: 1.82,
      etfPresence: { SOXX: 3.84, PSI: false, XSD: 2.44, DRAM: false },
      tonyNote: 'QUALCOMM INC appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 3.1% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, proScore: 3.1,
      price: 305.03, weeklyPrices: [295.88, 298.93, 300.45, 302.89, 305.03], weeklyChange: -1.65, sortRank: 0,
      marketCap: '$77B', pe: 29.2, revenueGrowth: 12, eps: 10.45, grossMargin: 56, dividendYield: 1.31,
      etfPresence: { SOXX: 3.69, PSI: false, XSD: 2.5, DRAM: false },
      tonyNote: 'NXP SEMICONDUCTORS NV appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 3.1% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, proScore: 3.01,
      price: 1537.67, weeklyPrices: [1491.54, 1506.92, 1514.60, 1526.91, 1537.67], weeklyChange: -1, sortRank: 0,
      marketCap: '$76B', pe: 110, revenueGrowth: 26, eps: 13.98, grossMargin: 55, dividendYield: 0.52,
      etfPresence: { SOXX: 3.67, PSI: false, XSD: 2.34, DRAM: false },
      tonyNote: 'MONOLITHIC POWER SYSTEMS INC appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 3.0% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, proScore: 2.95,
      price: 288.84, weeklyPrices: [280.17, 283.06, 284.51, 286.82, 288.84], weeklyChange: 0.47, sortRank: 0,
      marketCap: '$50B', pe: 196.5, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.18, PSI: false, XSD: 3.73, DRAM: false },
      tonyNote: 'ASTERA LABS INC appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 3.0% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'RKLB', name: 'Rocket Lab Corp', easyScore: 1, proScore: 14.86,
      price: 126.52, weeklyPrices: [122.72, 123.99, 124.62, 125.63, 126.52], weeklyChange: -5.78, sortRank: 0,
      marketCap: '$73B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 14.86 },
      tonyNote: 'Rocket Lab Corp appears in 1 of 6 Broad Tech ETFs (17% coverage) with average weight 14.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSLA', name: 'Tesla Inc', easyScore: 2, proScore: 12.48,
      price: 423.86, weeklyPrices: [411.14, 415.38, 417.50, 420.89, 423.86], weeklyChange: 1.58, sortRank: 0,
      marketCap: '$1.6T', pe: 392.5, revenueGrowth: 16, eps: 1.08, grossMargin: 19, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: false, GTEK: false, ARKK: 10.68, MARS: false },
      tonyNote: 'Tesla Inc appears in 2 of 6 Broad Tech ETFs (33% coverage) with average weight 12.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC-CL A', easyScore: 2, proScore: 9.5,
      price: 384.58, weeklyPrices: [373.04, 376.89, 378.81, 381.89, 384.58], weeklyChange: -1.11, sortRank: 0,
      marketCap: '$4.7T', pe: 29.3, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { QQQ: false, QQQA: 4.71, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ALPHABET INC-CL A appears in 2 of 6 Broad Tech ETFs (33% coverage) with average weight 9.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SATS', name: 'EchoStar Corp', easyScore: 1, proScore: 8.87,
      price: 139.49, weeklyPrices: [135.31, 136.70, 137.40, 138.51, 139.49], weeklyChange: -1.63, sortRank: 0,
      marketCap: '$40B', pe: null, revenueGrowth: -5, eps: -50.21, grossMargin: 27, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 8.87 },
      tonyNote: 'EchoStar Corp appears in 1 of 6 Broad Tech ETFs (17% coverage) with average weight 8.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'Microsoft Corp', easyScore: 3, proScore: 8.84,
      price: 423.41, weeklyPrices: [410.71, 414.94, 417.06, 420.45, 423.41], weeklyChange: 0.56, sortRank: 0,
      marketCap: '$3.1T', pe: 25.2, revenueGrowth: 18, eps: 16.8, grossMargin: 68, dividendYield: 0.86,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: 8.17, FDTX: 4.06, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Microsoft Corp appears in 3 of 6 Broad Tech ETFs (50% coverage) with average weight 8.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile Inc', easyScore: 1, proScore: 7.78,
      price: 89.98, weeklyPrices: [87.28, 88.18, 88.63, 89.35, 89.98], weeklyChange: 0.44, sortRank: 0,
      marketCap: '$35B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 7.78 },
      tonyNote: 'AST SpaceMobile Inc appears in 1 of 6 Broad Tech ETFs (17% coverage) with average weight 7.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AAPL', name: 'Apple Inc', easyScore: 2, proScore: 7.75,
      price: 301.21, weeklyPrices: [292.17, 295.19, 296.69, 299.10, 301.21], weeklyChange: -0.34, sortRank: 0,
      marketCap: '$4.4T', pe: 36.5, revenueGrowth: 17, eps: 8.25, grossMargin: 48, dividendYield: 0.36,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 1.22, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Apple Inc appears in 2 of 6 Broad Tech ETFs (33% coverage) with average weight 7.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORP', easyScore: 1, proScore: 7.33,
      price: 115.89, weeklyPrices: [112.41, 113.57, 114.15, 115.08, 115.89], weeklyChange: -2.58, sortRank: 0,
      marketCap: '$582B', pe: null, revenueGrowth: 7, eps: -0.59, grossMargin: 37, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 7.33, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'INTEL CORP appears in 1 of 6 Broad Tech ETFs (17% coverage) with average weight 7.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 3, proScore: 7.21,
      price: 261.91, weeklyPrices: [254.05, 256.67, 257.98, 260.08, 261.91], weeklyChange: -1.17, sortRank: 0,
      marketCap: '$2.8T', pe: 31.3, revenueGrowth: 17, eps: 8.37, grossMargin: 51, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 4.64, GTEK: false, ARKK: 2.69, MARS: false },
      tonyNote: 'Amazon.com Inc appears in 3 of 6 Broad Tech ETFs (50% coverage) with average weight 7.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'Nvidia Corp', easyScore: 3, proScore: 6.96,
      price: 224.16, weeklyPrices: [217.44, 219.68, 220.80, 222.59, 224.16], weeklyChange: 0.31, sortRank: 0,
      marketCap: '$5.4T', pe: 34.3, revenueGrowth: 73, eps: 6.53, grossMargin: 71, dividendYield: 0.02,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 5.27, GTEK: false, ARKK: 1.33, MARS: false },
      tonyNote: 'Nvidia Corp appears in 3 of 6 Broad Tech ETFs (50% coverage) with average weight 7.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, proScore: 6.63,
      price: 190.72, weeklyPrices: [185.00, 186.91, 187.86, 189.38, 190.72], weeklyChange: 2.1, sortRank: 0,
      marketCap: '$167B', pe: 62.3, revenueGrowth: 22, eps: 3.06, grossMargin: 51, dividendYield: 0.13,
      etfPresence: { QQQ: false, QQQA: 5.59, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: 7.68, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 2 of 6 Broad Tech ETFs (33% coverage) with average weight 6.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ARM', name: 'ARM HOLDINGS PLC-ADR', easyScore: 1, proScore: 6.63,
      price: 275.81, weeklyPrices: [267.54, 270.29, 271.67, 273.88, 275.81], weeklyChange: 7.43, sortRank: 0,
      marketCap: '$293B', pe: 324.5, revenueGrowth: 20, eps: 0.85, grossMargin: 98, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 6.63, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ARM HOLDINGS PLC-ADR appears in 1 of 6 Broad Tech ETFs (17% coverage) with average weight 6.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 2, proScore: 6.1,
      price: 444.22, weeklyPrices: [430.89, 435.34, 437.56, 441.11, 444.22], weeklyChange: -0.75, sortRank: 0,
      marketCap: '$724B', pe: 148.1, revenueGrowth: 38, eps: 3, grossMargin: 53, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 7.02, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: 5.19, MARS: false },
      tonyNote: 'ADVANCED MICRO DEVICES appears in 2 of 6 Broad Tech ETFs (33% coverage) with average weight 6.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 3, proScore: 6.07,
      price: 599.88, weeklyPrices: [581.88, 587.88, 590.88, 595.68, 599.88], weeklyChange: -0.86, sortRank: 0,
      marketCap: '$1.5T', pe: 21.8, revenueGrowth: 33, eps: 27.53, grossMargin: 82, dividendYield: 0.35,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 3.31, GTEK: false, ARKK: 0.6, MARS: false },
      tonyNote: 'Meta Platforms Inc appears in 3 of 6 Broad Tech ETFs (50% coverage) with average weight 6.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OHB', name: 'OHB SE', easyScore: 1, proScore: 6.02,
      price: 0, weeklyPrices: [0.00, 0.00, 0.00, 0.00, 0.00], weeklyChange: 0, sortRank: 0,
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 6.02 },
      tonyNote: 'OHB SE appears in 1 of 6 Broad Tech ETFs (17% coverage) with average weight 6.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 1, proScore: 5.89,
      price: 733.48, weeklyPrices: [711.48, 718.81, 722.48, 728.35, 733.48], weeklyChange: 0.2, sortRank: 0,
      marketCap: '$827B', pe: 34.7, revenueGrowth: 196, eps: 21.15, grossMargin: 58, dividendYield: 0.08,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: 5.89, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Micron Technology Inc appears in 1 of 6 Broad Tech ETFs (17% coverage) with average weight 5.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 1, proScore: 5.39,
      price: 41.78, weeklyPrices: [40.53, 40.94, 41.15, 41.49, 41.78], weeklyChange: -2.05, sortRank: 0,
      marketCap: '$15B', pe: null, revenueGrowth: 41, eps: -0.8, grossMargin: 56, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 5.39 },
      tonyNote: 'Planet Labs PBC appears in 1 of 6 Broad Tech ETFs (17% coverage) with average weight 5.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 1, proScore: 5.05,
      price: 92.59, weeklyPrices: [89.81, 90.74, 91.20, 91.94, 92.59], weeklyChange: -1.52, sortRank: 0,
      marketCap: '$50B', pe: 420.9, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 1.94,
      etfPresence: { QQQ: false, QQQA: 5.05, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 1 of 6 Broad Tech ETFs (17% coverage) with average weight 5.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PANW', name: 'PALO ALTO NETWORKS INC', easyScore: 2, proScore: 5,
      price: 248.26, weeklyPrices: [240.81, 243.29, 244.54, 246.52, 248.26], weeklyChange: 0.65, sortRank: 0,
      marketCap: '$201B', pe: 137.9, revenueGrowth: 15, eps: 1.8, grossMargin: 74, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 7.24, FDTX: 2.76, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'PALO ALTO NETWORKS INC appears in 2 of 6 Broad Tech ETFs (33% coverage) with average weight 5.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 2, proScore: 4.88,
      price: 190.01, weeklyPrices: [184.31, 186.21, 187.16, 188.68, 190.01], weeklyChange: 1.07, sortRank: 0,
      marketCap: '$546B', pe: 34.1, revenueGrowth: 22, eps: 5.57, grossMargin: 67, dividendYield: 1.06,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 9.06, FDTX: 0.7, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ORACLE CORP appears in 2 of 6 Broad Tech ETFs (33% coverage) with average weight 4.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 2, proScore: 7.15,
      price: 272.23, weeklyPrices: [264.06, 266.79, 268.15, 270.32, 272.23], weeklyChange: 0.43, sortRank: 0,
      marketCap: '$10B', pe: 53.2, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { POW: 6.26, VOLT: 8.04, PBD: false, PBW: false },
      tonyNote: 'Powell Industries Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 7.2% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 2, proScore: 5.28,
      price: 713.83, weeklyPrices: [692.42, 699.55, 703.12, 708.83, 713.83], weeklyChange: 0.58, sortRank: 0,
      marketCap: '$107B', pe: 97.7, revenueGrowth: 26, eps: 7.31, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.92, VOLT: 5.63, PBD: false, PBW: false },
      tonyNote: 'Quanta Services Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 5.3% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, proScore: 5,
      price: 253.15, weeklyPrices: [245.56, 248.09, 249.35, 251.38, 253.15], weeklyChange: -0.63, sortRank: 0,
      marketCap: '$4B', pe: 61, revenueGrowth: 17, eps: 4.15, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: 3.07, VOLT: 6.94, PBD: false, PBW: false },
      tonyNote: 'Bel Fuse Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 5.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, proScore: 4.77,
      price: 258.04, weeklyPrices: [250.30, 252.88, 254.17, 256.23, 258.04], weeklyChange: -2.33, sortRank: 0,
      marketCap: '$12B', pe: 86.6, revenueGrowth: 20, eps: 2.98, grossMargin: 54, dividendYield: null,
      etfPresence: { POW: 4.77, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Vicor Corp appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 4.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 2, proScore: 4.53,
      price: 378.17, weeklyPrices: [366.82, 370.61, 372.50, 375.52, 378.17], weeklyChange: -0.39, sortRank: 0,
      marketCap: '$147B', pe: 37, revenueGrowth: 17, eps: 10.21, grossMargin: 37, dividendYield: 1.16,
      etfPresence: { POW: 3.91, VOLT: 5.15, PBD: false, PBW: false },
      tonyNote: 'Eaton Corp PLC appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 4.5% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 1, proScore: 4.49,
      price: 293.5, weeklyPrices: [284.69, 287.63, 289.10, 291.45, 293.50], weeklyChange: 3.96, sortRank: 0,
      marketCap: '$83B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: 4.49, PBD: false, PBW: false },
      tonyNote: 'BLOOM ENERGY CORP appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 4.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PRY', name: 'Prysmian SpA', easyScore: 1, proScore: 4.45,
      price: 0, weeklyPrices: [0.00, 0.00, 0.00, 0.00, 0.00], weeklyChange: 0, sortRank: 0,
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { POW: 4.45, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Prysmian SpA appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 4.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 2, proScore: 3.96,
      price: 1025.25, weeklyPrices: [994.49, 1004.75, 1009.87, 1018.07, 1025.25], weeklyChange: 0.04, sortRank: 0,
      marketCap: '$276B', pe: 30, revenueGrowth: 16, eps: 34.22, grossMargin: 20, dividendYield: 0.2,
      etfPresence: { POW: 3.61, VOLT: 4.32, PBD: false, PBW: false },
      tonyNote: 'GE Vernova Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 4.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OGE', name: 'OGE ENERGY CORP', easyScore: 1, proScore: 3.85,
      price: 47.85, weeklyPrices: [46.41, 46.89, 47.13, 47.52, 47.85], weeklyChange: -0.08, sortRank: 0,
      marketCap: '$10B', pe: 21.3, revenueGrowth: 1, eps: 2.25, grossMargin: 44, dividendYield: 3.55,
      etfPresence: { POW: false, VOLT: 3.85, PBD: false, PBW: false },
      tonyNote: 'OGE ENERGY CORP appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 3.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETR', name: 'ENTERGY CORP', easyScore: 1, proScore: 3.72,
      price: 111.46, weeklyPrices: [108.12, 109.23, 109.79, 110.68, 111.46], weeklyChange: -0.42, sortRank: 0,
      marketCap: '$51B', pe: 28.4, revenueGrowth: 12, eps: 3.92, grossMargin: 47, dividendYield: 2.29,
      etfPresence: { POW: false, VOLT: 3.72, PBD: false, PBW: false },
      tonyNote: 'ENTERGY CORP appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 3.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ET', name: 'ENERGY TRANSFER LP', easyScore: 1, proScore: 3.66,
      price: 20.32, weeklyPrices: [19.71, 19.91, 20.02, 20.18, 20.32], weeklyChange: 0.79, sortRank: 0,
      marketCap: '$70B', pe: 16.9, revenueGrowth: 32, eps: 1.2, grossMargin: 19, dividendYield: 6.62,
      etfPresence: { POW: false, VOLT: 3.66, PBD: false, PBW: false },
      tonyNote: 'ENERGY TRANSFER LP appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 3.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 2, proScore: 3.63,
      price: 88.81, weeklyPrices: [86.15, 87.03, 87.48, 88.19, 88.81], weeklyChange: 0.61, sortRank: 0,
      marketCap: '$185B', pe: 22.5, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.82,
      etfPresence: { POW: 2.09, VOLT: 5.18, PBD: false, PBW: false },
      tonyNote: 'NextEra Energy Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 3.6% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 2, proScore: 3.48,
      price: 161.88, weeklyPrices: [157.02, 158.64, 159.45, 160.75, 161.88], weeklyChange: -0.03, sortRank: 0,
      marketCap: '$26B', pe: 54.9, revenueGrowth: 54, eps: 2.95, grossMargin: 37, dividendYield: 0.52,
      etfPresence: { POW: 3.86, VOLT: 3.1, PBD: false, PBW: false },
      tonyNote: 'nVent Electric PLC appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 3.5% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ENR', name: 'Siemens Energy AG', easyScore: 1, proScore: 3.4,
      price: 16.2, weeklyPrices: [15.71, 15.88, 15.96, 16.09, 16.20], weeklyChange: -2.24, sortRank: 0,
      marketCap: '$1B', pe: 5.9, revenueGrowth: -3, eps: 2.73, grossMargin: 43, dividendYield: 7.23,
      etfPresence: { POW: 3.4, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Siemens Energy AG appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 3.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 1, proScore: 3.36,
      price: 320.77, weeklyPrices: [311.15, 314.35, 315.96, 318.52, 320.77], weeklyChange: 1.61, sortRank: 0,
      marketCap: '$123B', pe: 80.6, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 3.36, PBD: false, PBW: false },
      tonyNote: 'VERTIV HOLDINGS CO appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 3.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NI', name: 'NISOURCE INC', easyScore: 1, proScore: 3.32,
      price: 47.23, weeklyPrices: [45.81, 46.29, 46.52, 46.90, 47.23], weeklyChange: 0.41, sortRank: 0,
      marketCap: '$23B', pe: 23.5, revenueGrowth: 8, eps: 2.01, grossMargin: 51, dividendYield: 2.55,
      etfPresence: { POW: false, VOLT: 3.32, PBD: false, PBW: false },
      tonyNote: 'NISOURCE INC appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 3.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IDA', name: 'IDACORP INC', easyScore: 1, proScore: 3.26,
      price: 140.46, weeklyPrices: [136.25, 137.65, 138.35, 139.48, 140.46], weeklyChange: -0.79, sortRank: 0,
      marketCap: '$8B', pe: 23.3, revenueGrowth: -7, eps: 6.02, grossMargin: 38, dividendYield: 2.47,
      etfPresence: { POW: false, VOLT: 3.26, PBD: false, PBW: false },
      tonyNote: 'IDACORP INC appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 3.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MOD', name: 'MODINE MANUFACTURING CO', easyScore: 1, proScore: 3.15,
      price: 255.18, weeklyPrices: [247.52, 250.08, 251.35, 253.39, 255.18], weeklyChange: -0.78, sortRank: 0,
      marketCap: '$13B', pe: 139.4, revenueGrowth: 31, eps: 1.83, grossMargin: 24, dividendYield: null,
      etfPresence: { POW: false, VOLT: 3.15, PBD: false, PBW: false },
      tonyNote: 'MODINE MANUFACTURING CO appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 3.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 2, proScore: 3.04,
      price: 459.58, weeklyPrices: [445.79, 450.39, 452.69, 456.36, 459.58], weeklyChange: -0.77, sortRank: 0,
      marketCap: '$24B', pe: 27.2, revenueGrowth: 11, eps: 16.91, grossMargin: 36, dividendYield: 1.23,
      etfPresence: { POW: 2.83, VOLT: 3.24, PBD: false, PBW: false },
      tonyNote: 'Hubbell Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 3.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ABBN', name: 'ABB LTD', easyScore: 1, proScore: 2.98,
      price: 0, weeklyPrices: [0.00, 0.00, 0.00, 0.00, 0.00], weeklyChange: 0, sortRank: 0,
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { POW: false, VOLT: 2.98, PBD: false, PBW: false },
      tonyNote: 'ABB LTD appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 3.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 1, proScore: 5.71,
      price: 745.49, weeklyPrices: [723.13, 730.58, 734.31, 740.27, 745.49], weeklyChange: -0.87, sortRank: 0,
      marketCap: '$23B', pe: 66.6, revenueGrowth: 92, eps: 11.2, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 5.71, PRN: false },
      tonyNote: 'Sterling Infrastructure, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 5.7% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 1, proScore: 4.35,
      price: 1842.26, weeklyPrices: [1786.99, 1805.41, 1814.63, 1829.36, 1842.26], weeklyChange: 0.26, sortRank: 0,
      marketCap: '$65B', pe: 53.1, revenueGrowth: 1, eps: 34.69, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: 4.35, PRN: false },
      tonyNote: 'Comfort Systems USA, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 4.3% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CHRW', name: 'C.H. Robinson Worldwide, Inc.', easyScore: 1, proScore: 4.16,
      price: 177.6, weeklyPrices: [172.27, 174.05, 174.94, 176.36, 177.60], weeklyChange: -1.68, sortRank: 0,
      marketCap: '$21B', pe: 36, revenueGrowth: -1, eps: 4.93, grossMargin: 9, dividendYield: 1.39,
      etfPresence: { AIRR: 4.16, PRN: false },
      tonyNote: 'C.H. Robinson Worldwide, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 4.2% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SAIA', name: 'Saia, Inc.', easyScore: 1, proScore: 4.16,
      price: 448.36, weeklyPrices: [434.91, 439.39, 441.63, 445.22, 448.36], weeklyChange: -3.88, sortRank: 0,
      marketCap: '$12B', pe: 47.1, revenueGrowth: 2, eps: 9.51, grossMargin: 24, dividendYield: null,
      etfPresence: { AIRR: 4.16, PRN: false },
      tonyNote: 'Saia, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 4.2% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MTZ', name: 'MasTec, Inc.', easyScore: 1, proScore: 4.11,
      price: 381.49, weeklyPrices: [370.05, 373.86, 375.77, 378.82, 381.49], weeklyChange: -0.7, sortRank: 0,
      marketCap: '$30B', pe: 66.7, revenueGrowth: 35, eps: 5.72, grossMargin: 13, dividendYield: null,
      etfPresence: { AIRR: 4.11, PRN: false },
      tonyNote: 'MasTec, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 4.1% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'EME', name: 'EMCOR Group, Inc.', easyScore: 1, proScore: 4.1,
      price: 845.21, weeklyPrices: [819.85, 828.31, 832.53, 839.29, 845.21], weeklyChange: -0.96, sortRank: 0,
      marketCap: '$38B', pe: 28.4, revenueGrowth: 20, eps: 29.77, grossMargin: 19, dividendYield: 0.15,
      etfPresence: { AIRR: 4.1, PRN: false },
      tonyNote: 'EMCOR Group, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 4.1% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 1, proScore: 3.97,
      price: 644.69, weeklyPrices: [625.35, 631.80, 635.02, 640.18, 644.69], weeklyChange: 2.29, sortRank: 0,
      marketCap: '$9B', pe: 66.4, revenueGrowth: 13, eps: 9.71, grossMargin: 20, dividendYield: 0.32,
      etfPresence: { AIRR: 3.97, PRN: false },
      tonyNote: 'Argan, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 4.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 1, proScore: 3.29,
      price: 198.1, weeklyPrices: [192.16, 194.14, 195.13, 196.71, 198.10], weeklyChange: -2.24, sortRank: 0,
      marketCap: '$18B', pe: 52.8, revenueGrowth: 26, eps: 3.75, grossMargin: 23, dividendYield: 0.51,
      etfPresence: { AIRR: 3.29, PRN: false },
      tonyNote: 'BWX Technologies, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 3.3% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DY', name: 'Dycom Industries, Inc.', easyScore: 1, proScore: 3.26,
      price: 409, weeklyPrices: [396.73, 400.82, 402.87, 406.14, 409.00], weeklyChange: -0.99, sortRank: 0,
      marketCap: '$12B', pe: 42.7, revenueGrowth: 34, eps: 9.58, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: 3.26, PRN: false },
      tonyNote: 'Dycom Industries, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 3.3% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 1, proScore: 2.99,
      price: 318, weeklyPrices: [308.46, 311.64, 313.23, 315.77, 318.00], weeklyChange: -1.15, sortRank: 0,
      marketCap: '$13B', pe: 20.7, revenueGrowth: 13, eps: 15.39, grossMargin: 12, dividendYield: 1.71,
      etfPresence: { AIRR: 2.99, PRN: false },
      tonyNote: 'Huntington Ingalls Industries, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 3.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OC', name: 'Owens Corning', easyScore: 1, proScore: 2.95,
      price: 111.34, weeklyPrices: [108.00, 109.11, 109.67, 110.56, 111.34], weeklyChange: -1.92, sortRank: 0,
      marketCap: '$9B', pe: null, revenueGrowth: -10, eps: -4.74, grossMargin: 27, dividendYield: 2.61,
      etfPresence: { AIRR: 2.95, PRN: false },
      tonyNote: 'Owens Corning appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 3.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 1, proScore: 2.89,
      price: 54.5, weeklyPrices: [52.87, 53.41, 53.68, 54.12, 54.50], weeklyChange: -2.36, sortRank: 0,
      marketCap: '$10B', pe: 320.6, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.89, PRN: false },
      tonyNote: 'Kratos Defense & Security Solutions, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 2.9% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 1, proScore: 2.64,
      price: 63.06, weeklyPrices: [61.17, 61.80, 62.11, 62.62, 63.06], weeklyChange: -3.97, sortRank: 0,
      marketCap: '$8B', pe: 274.2, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 2.64, PRN: false },
      tonyNote: 'Karman Holdings Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 2.6% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CLH', name: 'Clean Harbors, Inc.', easyScore: 1, proScore: 2.53,
      price: 284.78, weeklyPrices: [276.24, 279.08, 280.51, 282.79, 284.78], weeklyChange: -2.3, sortRank: 0,
      marketCap: '$15B', pe: 38.6, revenueGrowth: 2, eps: 7.37, grossMargin: 32, dividendYield: null,
      etfPresence: { AIRR: 2.53, PRN: false },
      tonyNote: 'Clean Harbors, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 2.5% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 1, proScore: 2.5,
      price: 272.23, weeklyPrices: [264.06, 266.79, 268.15, 270.32, 272.23], weeklyChange: 0.43, sortRank: 0,
      marketCap: '$10B', pe: 53.2, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { AIRR: 2.5, PRN: false },
      tonyNote: 'Powell Industries, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 2.5% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FNB', name: 'F.N.B. Corporation', easyScore: 1, proScore: 2.38,
      price: 17.38, weeklyPrices: [16.86, 17.03, 17.12, 17.26, 17.38], weeklyChange: -0.86, sortRank: 0,
      marketCap: '$6B', pe: 10.7, revenueGrowth: 10, eps: 1.62, grossMargin: 0, dividendYield: 2.96,
      etfPresence: { AIRR: 2.38, PRN: false },
      tonyNote: 'F.N.B. Corporation appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 2.4% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CNM', name: 'Core & Main, Inc. (Class A)', easyScore: 1, proScore: 2.14,
      price: 46.44, weeklyPrices: [45.05, 45.51, 45.74, 46.11, 46.44], weeklyChange: -1.42, sortRank: 0,
      marketCap: '$9B', pe: 20.1, revenueGrowth: -7, eps: 2.31, grossMargin: 27, dividendYield: null,
      etfPresence: { AIRR: 2.14, PRN: false },
      tonyNote: 'Core & Main, Inc. (Class A) appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 2.1% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WMS', name: 'Advanced Drainage Systems, Inc.', easyScore: 1, proScore: 2.12,
      price: 133.35, weeklyPrices: [129.35, 130.68, 131.35, 132.42, 133.35], weeklyChange: -2.7, sortRank: 0,
      marketCap: '$10B', pe: 22.2, revenueGrowth: 0, eps: 6.01, grossMargin: 39, dividendYield: 0.53,
      etfPresence: { AIRR: 2.12, PRN: false },
      tonyNote: 'Advanced Drainage Systems, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 2.1% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KEX', name: 'Kirby Corporation', easyScore: 1, proScore: 1.98,
      price: 147.47, weeklyPrices: [143.05, 144.52, 145.26, 146.44, 147.47], weeklyChange: -0.79, sortRank: 0,
      marketCap: '$8B', pe: 22.7, revenueGrowth: 7, eps: 6.5, grossMargin: 34, dividendYield: null,
      etfPresence: { AIRR: 1.98, PRN: false },
      tonyNote: 'Kirby Corporation appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 2.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IESC', name: 'IES Holdings, Inc.', easyScore: 1, proScore: 1.92,
      price: 653.12, weeklyPrices: [633.53, 640.06, 643.32, 648.55, 653.12], weeklyChange: -0.42, sortRank: 0,
      marketCap: '$13B', pe: 34.8, revenueGrowth: 17, eps: 18.78, grossMargin: 26, dividendYield: null,
      etfPresence: { AIRR: 1.92, PRN: false },
      tonyNote: 'IES Holdings, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 1.9% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
