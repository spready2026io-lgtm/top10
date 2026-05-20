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
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 6, proScore: 6.62,
      price: 224.53, weeklyPrices: [217.79, 220.04, 221.16, 222.96, 224.53], weeklyChange: 1.78, sortRank: 0,
      marketCap: '$5.4T', pe: 45.8, revenueGrowth: 73, eps: 4.9, grossMargin: 71, dividendYield: null,
      etfPresence: { AIS: 3.07, ARTY: 4.31, BAI: 5.75, IVEP: false, IGPT: false, IVES: 4.92, ALAI: 14.54, CHAT: 7.11 },
      tonyNote: 'NVIDIA Corp appears in 6 of 7 AI & ML ETFs (86% coverage) with average weight 6.6% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc. Class C', easyScore: 1, proScore: 6.56,
      price: 382.14, weeklyPrices: [370.68, 374.50, 376.41, 379.47, 382.14], weeklyChange: -0.72, sortRank: 0,
      marketCap: '$4.6T', pe: 29.1, revenueGrowth: 22, eps: 13.13, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 6.56, CHAT: false },
      tonyNote: 'Alphabet Inc. Class C appears in 1 of 7 AI & ML ETFs (14% coverage) with average weight 6.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 3, proScore: 5.27,
      price: 384.92, weeklyPrices: [373.37, 377.22, 379.15, 382.23, 384.92], weeklyChange: -0.71, sortRank: 0,
      marketCap: '$4.7T', pe: 29.4, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: 4.14, IVEP: false, IGPT: false, IVES: 4.99, ALAI: false, CHAT: 6.68 },
      tonyNote: 'ALPHABET INC CLASS A appears in 3 of 7 AI & ML ETFs (43% coverage) with average weight 5.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 3, proScore: 5.03,
      price: 264.31, weeklyPrices: [256.38, 259.02, 260.35, 262.46, 264.31], weeklyChange: 1.92, sortRank: 0,
      marketCap: '$2.8T', pe: 32.2, revenueGrowth: 17, eps: 8.2, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.88, ALAI: 6.42, CHAT: 3.78 },
      tonyNote: 'AMAZON.COM INC appears in 3 of 7 AI & ML ETFs (43% coverage) with average weight 5.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 6, proScore: 4.88,
      price: 715.88, weeklyPrices: [694.40, 701.56, 705.14, 710.87, 715.88], weeklyChange: 2.45, sortRank: 0,
      marketCap: '$807B', pe: 33.8, revenueGrowth: 196, eps: 21.17, grossMargin: 58, dividendYield: null,
      etfPresence: { AIS: 7.12, ARTY: 6.19, BAI: 4.12, IVEP: false, IGPT: false, IVES: 5.79, ALAI: 0.98, CHAT: 5.1 },
      tonyNote: 'Micron Technology Inc appears in 6 of 7 AI & ML ETFs (86% coverage) with average weight 4.9% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 6, proScore: 4.83,
      price: 443.61, weeklyPrices: [430.30, 434.74, 436.96, 440.50, 443.61], weeklyChange: 7.14, sortRank: 0,
      marketCap: '$723B', pe: 148.9, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.4, ARTY: 7.03, BAI: 4.48, IVEP: false, IGPT: false, IVES: 6.81, ALAI: 0.88, CHAT: 5.39 },
      tonyNote: 'Advanced Micro Devices Inc appears in 6 of 7 AI & ML ETFs (86% coverage) with average weight 4.8% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PWR', name: 'QUANTA SERVICES INC', easyScore: 1, proScore: 4.47,
      price: 720.37, weeklyPrices: [698.76, 705.96, 709.56, 715.33, 720.37], weeklyChange: 0.87, sortRank: 0,
      marketCap: '$108B', pe: 99, revenueGrowth: 26, eps: 7.28, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: 4.47, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'QUANTA SERVICES INC appears in 1 of 7 AI & ML ETFs (14% coverage) with average weight 4.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 4, proScore: 4.44,
      price: 401.34, weeklyPrices: [389.30, 393.31, 395.32, 398.53, 401.34], weeklyChange: 2.22, sortRank: 0,
      marketCap: '$2.1T', pe: 34.5, revenueGrowth: 35, eps: 11.62, grossMargin: 62, dividendYield: null,
      etfPresence: { AIS: 3.45, ARTY: false, BAI: 4.38, IVEP: false, IGPT: false, IVES: 4.51, ALAI: 5.4, CHAT: false },
      tonyNote: 'Taiwan Semiconductor Manufacturing Co Ltd appears in 4 of 7 AI & ML ETFs (57% coverage) with average weight 4.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 1, proScore: 4.22,
      price: 289.57, weeklyPrices: [280.88, 283.78, 285.23, 287.54, 289.57], weeklyChange: 5.92, sortRank: 0,
      marketCap: '$362B', pe: 54.6, revenueGrowth: 24, eps: 5.3, grossMargin: 50, dividendYield: 0.38,
      etfPresence: { AIS: false, ARTY: false, BAI: 4.22, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'LAM RESEARCH CORP appears in 1 of 7 AI & ML ETFs (14% coverage) with average weight 4.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SIMO', name: 'Silicon Motion Technology Corp', easyScore: 1, proScore: 4.03,
      price: 252, weeklyPrices: [244.44, 246.96, 248.22, 250.24, 252.00], weeklyChange: -0.36, sortRank: 0,
      marketCap: '$9B', pe: 49.8, revenueGrowth: 106, eps: 5.06, grossMargin: 48, dividendYield: 0.79,
      etfPresence: { AIS: 4.03, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'Silicon Motion Technology Corp appears in 1 of 7 AI & ML ETFs (14% coverage) with average weight 4.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC', easyScore: 1, proScore: 4.02,
      price: 78.85, weeklyPrices: [76.48, 77.27, 77.67, 78.30, 78.85], weeklyChange: -0.69, sortRank: 0,
      marketCap: '$96B', pe: 34.6, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.64,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: 4.02, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'WILLIAMS COS INC appears in 1 of 7 AI & ML ETFs (14% coverage) with average weight 4.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SMERY', name: 'SIEMENS ENERGY AG SPON ADR', easyScore: 1, proScore: 4.02,
      price: 200.44, weeklyPrices: [194.43, 196.43, 197.43, 199.04, 200.44], weeklyChange: 1.75, sortRank: 0,
      marketCap: '$171B', pe: 67.9, revenueGrowth: 3, eps: 2.95, grossMargin: 19, dividendYield: 0.41,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: 4.02, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'SIEMENS ENERGY AG SPON ADR appears in 1 of 7 AI & ML ETFs (14% coverage) with average weight 4.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AAPL', name: 'APPLE INC', easyScore: 2, proScore: 4.01,
      price: 299.39, weeklyPrices: [290.41, 293.40, 294.90, 297.29, 299.39], weeklyChange: 0.14, sortRank: 0,
      marketCap: '$4.4T', pe: 36.3, revenueGrowth: 17, eps: 8.25, grossMargin: 48, dividendYield: 0.36,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.78, ALAI: 3.24, CHAT: false },
      tonyNote: 'APPLE INC appears in 2 of 7 AI & ML ETFs (29% coverage) with average weight 4.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 6, proScore: 3.95,
      price: 420.65, weeklyPrices: [408.03, 412.24, 414.34, 417.71, 420.65], weeklyChange: 2.33, sortRank: 0,
      marketCap: '$2.0T', pe: 81.8, revenueGrowth: 30, eps: 5.14, grossMargin: 77, dividendYield: 0.63,
      etfPresence: { AIS: 0.84, ARTY: 4.14, BAI: 5.6, IVEP: false, IGPT: false, IVES: 4.93, ALAI: 4.66, CHAT: 3.54 },
      tonyNote: 'Broadcom Inc appears in 6 of 7 AI & ML ETFs (86% coverage) with average weight 4.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SBGSY', name: 'SCHNEIDER ELECT SE-UNSP ADR', easyScore: 1, proScore: 3.87,
      price: 61.06, weeklyPrices: [59.23, 59.84, 60.14, 60.63, 61.06], weeklyChange: 3.19, sortRank: 0,
      marketCap: '$172B', pe: 33, revenueGrowth: 4, eps: 1.85, grossMargin: 42, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: 3.87, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'SCHNEIDER ELECT SE-UNSP ADR appears in 1 of 7 AI & ML ETFs (14% coverage) with average weight 3.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'EQIX', name: 'EQUINIX INC', easyScore: 1, proScore: 3.86,
      price: 1057.47, weeklyPrices: [1025.75, 1036.32, 1041.61, 1050.07, 1057.47], weeklyChange: 0.86, sortRank: 0,
      marketCap: '$104B', pe: 73.1, revenueGrowth: 12, eps: 14.47, grossMargin: 52, dividendYield: 1.88,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: 3.86, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'EQUINIX INC appears in 1 of 7 AI & ML ETFs (14% coverage) with average weight 3.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NEE', name: 'NEXTERA ENERGY INC', easyScore: 1, proScore: 3.83,
      price: 89.25, weeklyPrices: [86.57, 87.47, 87.91, 88.63, 89.25], weeklyChange: -0.9, sortRank: 0,
      marketCap: '$186B', pe: 22.7, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.77,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: 3.83, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'NEXTERA ENERGY INC appears in 1 of 7 AI & ML ETFs (14% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, proScore: 3.82,
      price: 415.59, weeklyPrices: [403.12, 407.28, 409.36, 412.68, 415.59], weeklyChange: -0.44, sortRank: 0,
      marketCap: '$3.1T', pe: 24.8, revenueGrowth: 18, eps: 16.78, grossMargin: 68, dividendYield: 0.87,
      etfPresence: { AIS: false, ARTY: 2.08, BAI: false, IVEP: false, IGPT: false, IVES: 4.18, ALAI: 5.64, CHAT: 3.39 },
      tonyNote: 'MICROSOFT CORP appears in 4 of 7 AI & ML ETFs (57% coverage) with average weight 3.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SO', name: 'SOUTHERN CO/THE', easyScore: 1, proScore: 3.75,
      price: 93.86, weeklyPrices: [91.04, 91.98, 92.45, 93.20, 93.86], weeklyChange: -0.3, sortRank: 0,
      marketCap: '$106B', pe: 24, revenueGrowth: 8, eps: 3.91, grossMargin: 48, dividendYield: 3.23,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: 3.75, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'SOUTHERN CO/THE appears in 1 of 7 AI & ML ETFs (14% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 3, proScore: 3.71,
      price: 188.33, weeklyPrices: [182.68, 184.56, 185.51, 187.01, 188.33], weeklyChange: 6.84, sortRank: 0,
      marketCap: '$165B', pe: 61.3, revenueGrowth: 22, eps: 3.07, grossMargin: 51, dividendYield: 0.14,
      etfPresence: { AIS: 3.29, ARTY: 6.53, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.3 },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 3 of 7 AI & ML ETFs (43% coverage) with average weight 3.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MXL', name: 'MAXLINEAR INC', easyScore: 1, proScore: 7.28,
      price: 94.5, weeklyPrices: [91.66, 92.61, 93.08, 93.84, 94.50], weeklyChange: -0.38, sortRank: 0,
      marketCap: '$8B', pe: null, revenueGrowth: 43, eps: -1.52, grossMargin: 57, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: 7.28, DRAM: false },
      tonyNote: 'MAXLINEAR INC appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 7.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 2, proScore: 6.08,
      price: 443.61, weeklyPrices: [430.30, 434.74, 436.96, 440.50, 443.61], weeklyChange: 7.14, sortRank: 0,
      marketCap: '$723B', pe: 148.9, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 8.72, PSI: false, XSD: 3.43, DRAM: false },
      tonyNote: 'ADVANCED MICRO DEVICES INC appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 6.1% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 3, proScore: 5.84,
      price: 715.88, weeklyPrices: [694.40, 701.56, 705.14, 710.87, 715.88], weeklyChange: 2.45, sortRank: 0,
      marketCap: '$807B', pe: 33.8, revenueGrowth: 196, eps: 21.17, grossMargin: 58, dividendYield: null,
      etfPresence: { SOXX: 9.58, PSI: false, XSD: 2.84, DRAM: 5.1 },
      tonyNote: 'MICRON TECHNOLOGY INC appears in 3 of 3 Semiconductors ETFs (100% coverage) with average weight 5.8% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION CORP', easyScore: 2, proScore: 5.4,
      price: 117.01, weeklyPrices: [113.50, 114.67, 115.25, 116.19, 117.01], weeklyChange: 5.6, sortRank: 0,
      marketCap: '$588B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.87, PSI: false, XSD: 3.93, DRAM: false },
      tonyNote: 'INTEL CORPORATION CORP appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 5.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp/DE', easyScore: 1, proScore: 5.37,
      price: 1398.98, weeklyPrices: [1357.01, 1371.00, 1378.00, 1389.19, 1398.98], weeklyChange: 1.13, sortRank: 0,
      marketCap: '$207B', pe: 47.7, revenueGrowth: 251, eps: 29.33, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 5.37 },
      tonyNote: 'Sandisk Corp/DE appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 5.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, proScore: 4.71,
      price: 188.33, weeklyPrices: [182.68, 184.56, 185.51, 187.01, 188.33], weeklyChange: 6.84, sortRank: 0,
      marketCap: '$165B', pe: 61.3, revenueGrowth: 22, eps: 3.07, grossMargin: 51, dividendYield: 0.14,
      etfPresence: { SOXX: 6.1, PSI: false, XSD: 3.32, DRAM: false },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 4.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, proScore: 4.66,
      price: 420.65, weeklyPrices: [408.03, 412.24, 414.34, 417.71, 420.65], weeklyChange: 2.33, sortRank: 0,
      marketCap: '$2.0T', pe: 81.8, revenueGrowth: 30, eps: 5.14, grossMargin: 77, dividendYield: 0.63,
      etfPresence: { SOXX: 7.27, PSI: false, XSD: 2.05, DRAM: false },
      tonyNote: 'BROADCOM INC appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 4.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 1, proScore: 4.61,
      price: 422.39, weeklyPrices: [409.72, 413.94, 416.05, 419.43, 422.39], weeklyChange: 3.8, sortRank: 0,
      marketCap: '$335B', pe: 39.8, revenueGrowth: 11, eps: 10.62, grossMargin: 49, dividendYield: 0.52,
      etfPresence: { SOXX: 4.61, PSI: false, XSD: false, DRAM: false },
      tonyNote: 'APPLIED MATERIAL INC appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 4.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 2, proScore: 4.53,
      price: 224.53, weeklyPrices: [217.79, 220.04, 221.16, 222.96, 224.53], weeklyChange: 1.78, sortRank: 0,
      marketCap: '$5.4T', pe: 45.8, revenueGrowth: 73, eps: 4.9, grossMargin: 71, dividendYield: null,
      etfPresence: { SOXX: 7.04, PSI: false, XSD: 2.02, DRAM: false },
      tonyNote: 'NVIDIA CORP appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 4.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 1, proScore: 4.49,
      price: 750.5, weeklyPrices: [727.99, 735.49, 739.24, 745.25, 750.50], weeklyChange: 2.34, sortRank: 0,
      marketCap: '$168B', pe: 71.1, revenueGrowth: 44, eps: 10.56, grossMargin: 42, dividendYield: 0.4,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 4.49 },
      tonyNote: 'Seagate Technology Holdings PLC appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 4.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 1, proScore: 4.1,
      price: 461.99, weeklyPrices: [448.13, 452.75, 455.06, 458.76, 461.99], weeklyChange: 1.36, sortRank: 0,
      marketCap: '$159B', pe: 27.6, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.13,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 4.1 },
      tonyNote: 'Western Digital Corp appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 4.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SITM', name: 'SITIME CORP', easyScore: 1, proScore: 3.36,
      price: 695.17, weeklyPrices: [674.31, 681.27, 684.74, 690.30, 695.17], weeklyChange: 0.22, sortRank: 0,
      marketCap: '$18B', pe: null, revenueGrowth: 88, eps: -0.9, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: 3.36, DRAM: false },
      tonyNote: 'SITIME CORP appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 3.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, proScore: 3.31,
      price: 300.41, weeklyPrices: [291.40, 294.40, 295.90, 298.31, 300.41], weeklyChange: -0.63, sortRank: 0,
      marketCap: '$273B', pe: 51.3, revenueGrowth: 19, eps: 5.86, grossMargin: 57, dividendYield: null,
      etfPresence: { SOXX: 4.03, PSI: false, XSD: 2.59, DRAM: false },
      tonyNote: 'TEXAS INSTRUMENT INC appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 3.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 1, proScore: 3.3,
      price: 289.57, weeklyPrices: [280.88, 283.78, 285.23, 287.54, 289.57], weeklyChange: 5.92, sortRank: 0,
      marketCap: '$362B', pe: 54.6, revenueGrowth: 24, eps: 5.3, grossMargin: 50, dividendYield: 0.38,
      etfPresence: { SOXX: 3.3, PSI: false, XSD: false, DRAM: false },
      tonyNote: 'LAM RESEARCH CORP appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 3.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 1, proScore: 3.23,
      price: 1818.47, weeklyPrices: [1763.92, 1782.10, 1791.19, 1805.74, 1818.47], weeklyChange: 4.47, sortRank: 0,
      marketCap: '$238B', pe: 51.5, revenueGrowth: 12, eps: 35.33, grossMargin: 61, dividendYield: 0.53,
      etfPresence: { SOXX: 3.23, PSI: false, XSD: false, DRAM: false },
      tonyNote: 'KLA CORP appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 3.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, proScore: 3.18,
      price: 198.81, weeklyPrices: [192.85, 194.83, 195.83, 197.42, 198.81], weeklyChange: 1.64, sortRank: 0,
      marketCap: '$210B', pe: 21.4, revenueGrowth: -4, eps: 9.29, grossMargin: 55, dividendYield: 1.88,
      etfPresence: { SOXX: 3.88, PSI: false, XSD: 2.48, DRAM: false },
      tonyNote: 'QUALCOMM INC appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 3.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, proScore: 3.08,
      price: 302.69, weeklyPrices: [293.61, 296.64, 298.15, 300.57, 302.69], weeklyChange: 2.86, sortRank: 0,
      marketCap: '$76B', pe: 29, revenueGrowth: 12, eps: 10.45, grossMargin: 56, dividendYield: 1.38,
      etfPresence: { SOXX: 3.66, PSI: false, XSD: 2.5, DRAM: false },
      tonyNote: 'NXP SEMICONDUCTORS NV appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 3.1% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVTS', name: 'NAVITAS SEMICONDUCTOR CORP', easyScore: 1, proScore: 3.02,
      price: 21.24, weeklyPrices: [20.60, 20.82, 20.92, 21.09, 21.24], weeklyChange: 9.32, sortRank: 0,
      marketCap: '$5B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: 3.02, DRAM: false },
      tonyNote: 'NAVITAS SEMICONDUCTOR CORP appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, proScore: 2.98,
      price: 1516.93, weeklyPrices: [1471.42, 1486.59, 1494.18, 1506.31, 1516.93], weeklyChange: 3.33, sortRank: 0,
      marketCap: '$75B', pe: 108.7, revenueGrowth: 26, eps: 13.95, grossMargin: 55, dividendYield: 0.54,
      etfPresence: { SOXX: 3.63, PSI: false, XSD: 2.33, DRAM: false },
      tonyNote: 'MONOLITHIC POWER SYSTEMS INC appears in 2 of 3 Semiconductors ETFs (67% coverage) with average weight 3.0% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TER', name: 'TERADYNE INC', easyScore: 1, proScore: 2.84,
      price: 337.4, weeklyPrices: [327.28, 330.65, 332.34, 335.04, 337.40], weeklyChange: 4.94, sortRank: 0,
      marketCap: '$53B', pe: 62.5, revenueGrowth: 87, eps: 5.4, grossMargin: 59, dividendYield: 0.16,
      etfPresence: { SOXX: 2.84, PSI: false, XSD: false, DRAM: false },
      tonyNote: 'TERADYNE INC appears in 1 of 3 Semiconductors ETFs (33% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'RKLB', name: 'Rocket Lab Corp', easyScore: 1, proScore: 14.49,
      price: 129.15, weeklyPrices: [125.28, 126.57, 127.21, 128.25, 129.15], weeklyChange: 1.45, sortRank: 0,
      marketCap: '$75B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 14.49 },
      tonyNote: 'Rocket Lab Corp appears in 1 of 6 Broad Tech ETFs (17% coverage) with average weight 14.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSLA', name: 'Tesla Inc', easyScore: 2, proScore: 12.43,
      price: 411.29, weeklyPrices: [398.95, 403.06, 405.12, 408.41, 411.29], weeklyChange: 1.78, sortRank: 0,
      marketCap: '$1.5T', pe: 377.3, revenueGrowth: 16, eps: 1.09, grossMargin: 19, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: false, GTEK: false, ARKK: 10.57, MARS: false },
      tonyNote: 'Tesla Inc appears in 2 of 6 Broad Tech ETFs (33% coverage) with average weight 12.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC-CL A', easyScore: 2, proScore: 9.58,
      price: 384.92, weeklyPrices: [373.37, 377.22, 379.15, 382.23, 384.92], weeklyChange: -0.71, sortRank: 0,
      marketCap: '$4.7T', pe: 29.4, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { QQQ: false, QQQA: 4.88, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ALPHABET INC-CL A appears in 2 of 6 Broad Tech ETFs (33% coverage) with average weight 9.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'Microsoft Corp', easyScore: 3, proScore: 8.85,
      price: 415.59, weeklyPrices: [403.12, 407.28, 409.36, 412.68, 415.59], weeklyChange: -0.44, sortRank: 0,
      marketCap: '$3.1T', pe: 24.8, revenueGrowth: 18, eps: 16.78, grossMargin: 68, dividendYield: 0.87,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: 8.21, FDTX: 4.06, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Microsoft Corp appears in 3 of 6 Broad Tech ETFs (50% coverage) with average weight 8.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SATS', name: 'EchoStar Corp', easyScore: 1, proScore: 8.78,
      price: 134.74, weeklyPrices: [130.70, 132.05, 132.72, 133.80, 134.74], weeklyChange: -1.3, sortRank: 0,
      marketCap: '$39B', pe: null, revenueGrowth: -5, eps: -50.21, grossMargin: 27, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 8.78 },
      tonyNote: 'EchoStar Corp appears in 1 of 6 Broad Tech ETFs (17% coverage) with average weight 8.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile Inc', easyScore: 1, proScore: 7.88,
      price: 90.57, weeklyPrices: [87.85, 88.76, 89.21, 89.94, 90.57], weeklyChange: 2.8, sortRank: 0,
      marketCap: '$35B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 7.88 },
      tonyNote: 'AST SpaceMobile Inc appears in 1 of 6 Broad Tech ETFs (17% coverage) with average weight 7.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AAPL', name: 'Apple Inc', easyScore: 2, proScore: 7.75,
      price: 299.39, weeklyPrices: [290.41, 293.40, 294.90, 297.29, 299.39], weeklyChange: 0.14, sortRank: 0,
      marketCap: '$4.4T', pe: 36.3, revenueGrowth: 17, eps: 8.25, grossMargin: 48, dividendYield: 0.36,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 1.22, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Apple Inc appears in 2 of 6 Broad Tech ETFs (33% coverage) with average weight 7.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 3, proScore: 7.2,
      price: 264.31, weeklyPrices: [256.38, 259.02, 260.35, 262.46, 264.31], weeklyChange: 1.92, sortRank: 0,
      marketCap: '$2.8T', pe: 32.2, revenueGrowth: 17, eps: 8.2, grossMargin: 51, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 4.64, GTEK: false, ARKK: 2.68, MARS: false },
      tonyNote: 'Amazon.com Inc appears in 3 of 6 Broad Tech ETFs (50% coverage) with average weight 7.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORP', easyScore: 1, proScore: 7.1,
      price: 117.01, weeklyPrices: [113.50, 114.67, 115.25, 116.19, 117.01], weeklyChange: 5.6, sortRank: 0,
      marketCap: '$588B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 7.1, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'INTEL CORP appears in 1 of 6 Broad Tech ETFs (17% coverage) with average weight 7.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'Nvidia Corp', easyScore: 3, proScore: 6.97,
      price: 224.53, weeklyPrices: [217.79, 220.04, 221.16, 222.96, 224.53], weeklyChange: 1.78, sortRank: 0,
      marketCap: '$5.4T', pe: 45.8, revenueGrowth: 73, eps: 4.9, grossMargin: 71, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 5.27, GTEK: false, ARKK: 1.35, MARS: false },
      tonyNote: 'Nvidia Corp appears in 3 of 6 Broad Tech ETFs (50% coverage) with average weight 7.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, proScore: 6.58,
      price: 188.33, weeklyPrices: [182.68, 184.56, 185.51, 187.01, 188.33], weeklyChange: 6.84, sortRank: 0,
      marketCap: '$165B', pe: 61.3, revenueGrowth: 22, eps: 3.07, grossMargin: 51, dividendYield: 0.14,
      etfPresence: { QQQ: false, QQQA: 5.48, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: 7.68, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 2 of 6 Broad Tech ETFs (33% coverage) with average weight 6.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 3, proScore: 6.07,
      price: 604.63, weeklyPrices: [586.49, 592.54, 595.56, 600.40, 604.63], weeklyChange: 0.34, sortRank: 0,
      marketCap: '$1.5T', pe: 22, revenueGrowth: 33, eps: 27.48, grossMargin: 82, dividendYield: 0.35,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 3.31, GTEK: false, ARKK: 0.61, MARS: false },
      tonyNote: 'Meta Platforms Inc appears in 3 of 6 Broad Tech ETFs (50% coverage) with average weight 6.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ARM', name: 'ARM HOLDINGS PLC-ADR', easyScore: 1, proScore: 5.99,
      price: 256.53, weeklyPrices: [248.83, 251.40, 252.68, 254.73, 256.53], weeklyChange: 14.96, sortRank: 0,
      marketCap: '$273B', pe: 301.8, revenueGrowth: 20, eps: 0.85, grossMargin: 98, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 5.99, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ARM HOLDINGS PLC-ADR appears in 1 of 6 Broad Tech ETFs (17% coverage) with average weight 6.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OHB', name: 'OHB SE', easyScore: 1, proScore: 5.96,
      price: 0, weeklyPrices: [0.00, 0.00, 0.00, 0.00, 0.00], weeklyChange: 0, sortRank: 0,
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 5.96 },
      tonyNote: 'OHB SE appears in 1 of 6 Broad Tech ETFs (17% coverage) with average weight 6.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 2, proScore: 5.91,
      price: 443.61, weeklyPrices: [430.30, 434.74, 436.96, 440.50, 443.61], weeklyChange: 7.14, sortRank: 0,
      marketCap: '$723B', pe: 148.9, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 6.75, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: 5.08, MARS: false },
      tonyNote: 'ADVANCED MICRO DEVICES appears in 2 of 6 Broad Tech ETFs (33% coverage) with average weight 5.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 1, proScore: 5.89,
      price: 715.88, weeklyPrices: [694.40, 701.56, 705.14, 710.87, 715.88], weeklyChange: 2.45, sortRank: 0,
      marketCap: '$807B', pe: 33.8, revenueGrowth: 196, eps: 21.17, grossMargin: 58, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: 5.89, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Micron Technology Inc appears in 1 of 6 Broad Tech ETFs (17% coverage) with average weight 5.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 1, proScore: 5.4,
      price: 41.98, weeklyPrices: [40.72, 41.14, 41.35, 41.69, 41.98], weeklyChange: 0.93, sortRank: 0,
      marketCap: '$15B', pe: null, revenueGrowth: 41, eps: -0.8, grossMargin: 56, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 5.4 },
      tonyNote: 'Planet Labs PBC appears in 1 of 6 Broad Tech ETFs (17% coverage) with average weight 5.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 1, proScore: 5.12,
      price: 92.97, weeklyPrices: [90.18, 91.11, 91.58, 92.32, 92.97], weeklyChange: 1.26, sortRank: 0,
      marketCap: '$50B', pe: 422.6, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 1.98,
      etfPresence: { QQQ: false, QQQA: 5.12, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 1 of 6 Broad Tech ETFs (17% coverage) with average weight 5.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PANW', name: 'PALO ALTO NETWORKS INC', easyScore: 2, proScore: 4.96,
      price: 245.34, weeklyPrices: [237.98, 240.43, 241.66, 243.62, 245.34], weeklyChange: 2.17, sortRank: 0,
      marketCap: '$199B', pe: 136.3, revenueGrowth: 15, eps: 1.8, grossMargin: 74, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 7.15, FDTX: 2.76, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'PALO ALTO NETWORKS INC appears in 2 of 6 Broad Tech ETFs (33% coverage) with average weight 5.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'APP', name: 'APPLOVIN CORP-CLASS A', easyScore: 2, proScore: 4.81,
      price: 469.79, weeklyPrices: [455.70, 460.39, 462.74, 466.50, 469.79], weeklyChange: -1.49, sortRank: 0,
      marketCap: '$158B', pe: 40.9, revenueGrowth: 59, eps: 11.49, grossMargin: 88, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 4.87, PTF: false, WCLD: false, MAGS: false, IGV: 4.76, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'APPLOVIN CORP-CLASS A appears in 2 of 6 Broad Tech ETFs (33% coverage) with average weight 4.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 2, proScore: 6.99,
      price: 268.91, weeklyPrices: [260.84, 263.53, 264.88, 267.03, 268.91], weeklyChange: 2.8, sortRank: 0,
      marketCap: '$10B', pe: 52.4, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.14,
      etfPresence: { POW: 6.11, VOLT: 7.87, PBD: false, PBW: false },
      tonyNote: 'Powell Industries Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 7.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 2, proScore: 5.37,
      price: 720.37, weeklyPrices: [698.76, 705.96, 709.56, 715.33, 720.37], weeklyChange: 0.87, sortRank: 0,
      marketCap: '$108B', pe: 99, revenueGrowth: 26, eps: 7.28, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 5, VOLT: 5.74, PBD: false, PBW: false },
      tonyNote: 'Quanta Services Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 5.4% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, proScore: 4.97,
      price: 257.61, weeklyPrices: [249.88, 252.46, 253.75, 255.81, 257.61], weeklyChange: 3.16, sortRank: 0,
      marketCap: '$4B', pe: 62.1, revenueGrowth: 17, eps: 4.15, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: 3.05, VOLT: 6.89, PBD: false, PBW: false },
      tonyNote: 'Bel Fuse Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 5.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 2, proScore: 4.5,
      price: 378.01, weeklyPrices: [366.67, 370.45, 372.34, 375.36, 378.01], weeklyChange: 1.65, sortRank: 0,
      marketCap: '$147B', pe: 37, revenueGrowth: 17, eps: 10.23, grossMargin: 37, dividendYield: 1.18,
      etfPresence: { POW: 3.87, VOLT: 5.12, PBD: false, PBW: false },
      tonyNote: 'Eaton Corp PLC appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 4.5% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, proScore: 4.45,
      price: 257.66, weeklyPrices: [249.93, 252.51, 253.80, 255.86, 257.66], weeklyChange: 5.84, sortRank: 0,
      marketCap: '$12B', pe: 86.2, revenueGrowth: 20, eps: 2.99, grossMargin: 54, dividendYield: null,
      etfPresence: { POW: 4.45, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Vicor Corp appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 4.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PRY', name: 'Prysmian SpA', easyScore: 1, proScore: 4.38,
      price: 0, weeklyPrices: [0.00, 0.00, 0.00, 0.00, 0.00], weeklyChange: 0, sortRank: 0,
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { POW: 4.38, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Prysmian SpA appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 4.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 1, proScore: 4.21,
      price: 283.54, weeklyPrices: [275.03, 277.87, 279.29, 281.56, 283.54], weeklyChange: 8.49, sortRank: 0,
      marketCap: '$81B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: 4.21, PBD: false, PBW: false },
      tonyNote: 'BLOOM ENERGY CORP appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 4.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 2, proScore: 3.96,
      price: 1023.77, weeklyPrices: [993.06, 1003.29, 1008.41, 1016.60, 1023.77], weeklyChange: 1.18, sortRank: 0,
      marketCap: '$275B', pe: 29.9, revenueGrowth: 16, eps: 34.2, grossMargin: 20, dividendYield: 0.17,
      etfPresence: { POW: 3.61, VOLT: 4.32, PBD: false, PBW: false },
      tonyNote: 'GE Vernova Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 4.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OGE', name: 'OGE ENERGY CORP', easyScore: 1, proScore: 3.92,
      price: 48.19, weeklyPrices: [46.74, 47.23, 47.47, 47.85, 48.19], weeklyChange: 0.29, sortRank: 0,
      marketCap: '$10B', pe: 21.4, revenueGrowth: 1, eps: 2.25, grossMargin: 44, dividendYield: 3.54,
      etfPresence: { POW: false, VOLT: 3.92, PBD: false, PBW: false },
      tonyNote: 'OGE ENERGY CORP appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 3.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 2, proScore: 3.76,
      price: 89.25, weeklyPrices: [86.57, 87.47, 87.91, 88.63, 89.25], weeklyChange: -0.9, sortRank: 0,
      marketCap: '$186B', pe: 22.7, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.77,
      etfPresence: { POW: 2.16, VOLT: 5.36, PBD: false, PBW: false },
      tonyNote: 'NextEra Energy Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 3.8% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ET', name: 'ENERGY TRANSFER LP', easyScore: 1, proScore: 3.75,
      price: 20.36, weeklyPrices: [19.75, 19.95, 20.05, 20.22, 20.36], weeklyChange: -0.12, sortRank: 0,
      marketCap: '$70B', pe: 17, revenueGrowth: 32, eps: 1.2, grossMargin: 19, dividendYield: null,
      etfPresence: { POW: false, VOLT: 3.75, PBD: false, PBW: false },
      tonyNote: 'ENERGY TRANSFER LP appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 3.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETR', name: 'ENTERGY CORP', easyScore: 1, proScore: 3.73,
      price: 111.83, weeklyPrices: [108.48, 109.59, 110.15, 111.05, 111.83], weeklyChange: 1.16, sortRank: 0,
      marketCap: '$51B', pe: 28.5, revenueGrowth: 12, eps: 3.92, grossMargin: 47, dividendYield: 2.32,
      etfPresence: { POW: false, VOLT: 3.73, PBD: false, PBW: false },
      tonyNote: 'ENTERGY CORP appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 3.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 1, proScore: 3.49,
      price: 324.94, weeklyPrices: [315.19, 318.44, 320.07, 322.67, 324.94], weeklyChange: 0.71, sortRank: 0,
      marketCap: '$125B', pe: 81.8, revenueGrowth: 30, eps: 3.97, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 3.49, PBD: false, PBW: false },
      tonyNote: 'VERTIV HOLDINGS CO appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 3.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 2, proScore: 3.45,
      price: 162.1, weeklyPrices: [157.24, 158.86, 159.67, 160.97, 162.10], weeklyChange: 2.45, sortRank: 0,
      marketCap: '$26B', pe: 55.1, revenueGrowth: 54, eps: 2.94, grossMargin: 37, dividendYield: 0.53,
      etfPresence: { POW: 3.81, VOLT: 3.08, PBD: false, PBW: false },
      tonyNote: 'nVent Electric PLC appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 3.5% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NI', name: 'NISOURCE INC', easyScore: 1, proScore: 3.39,
      price: 47.54, weeklyPrices: [46.11, 46.59, 46.83, 47.21, 47.54], weeklyChange: 0.25, sortRank: 0,
      marketCap: '$23B', pe: 23.7, revenueGrowth: 8, eps: 2.01, grossMargin: 51, dividendYield: 2.53,
      etfPresence: { POW: false, VOLT: 3.39, PBD: false, PBW: false },
      tonyNote: 'NISOURCE INC appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 3.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IDA', name: 'IDACORP INC', easyScore: 1, proScore: 3.32,
      price: 141.85, weeklyPrices: [137.59, 139.01, 139.72, 140.86, 141.85], weeklyChange: -0.07, sortRank: 0,
      marketCap: '$8B', pe: 23.6, revenueGrowth: -7, eps: 6, grossMargin: 38, dividendYield: 2.47,
      etfPresence: { POW: false, VOLT: 3.32, PBD: false, PBW: false },
      tonyNote: 'IDACORP INC appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 3.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ENR', name: 'Siemens Energy AG', easyScore: 1, proScore: 3.3,
      price: 16.11, weeklyPrices: [15.63, 15.79, 15.87, 16.00, 16.11], weeklyChange: 1.1, sortRank: 0,
      marketCap: '$1B', pe: 5.9, revenueGrowth: -3, eps: 2.73, grossMargin: 43, dividendYield: null,
      etfPresence: { POW: 3.3, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Siemens Energy AG appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 3.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 2, proScore: 3.06,
      price: 463.51, weeklyPrices: [449.60, 454.24, 456.56, 460.27, 463.51], weeklyChange: 0.44, sortRank: 0,
      marketCap: '$24B', pe: 27.4, revenueGrowth: 11, eps: 16.94, grossMargin: 36, dividendYield: null,
      etfPresence: { POW: 2.85, VOLT: 3.27, PBD: false, PBW: false },
      tonyNote: 'Hubbell Inc appears in 2 of 2 Electrification ETFs (100% coverage) with average weight 3.1% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MOD', name: 'MODINE MANUFACTURING CO', easyScore: 1, proScore: 3.03,
      price: 254.25, weeklyPrices: [246.62, 249.16, 250.44, 252.47, 254.25], weeklyChange: 3.99, sortRank: 0,
      marketCap: '$13B', pe: 138.9, revenueGrowth: 31, eps: 1.83, grossMargin: 24, dividendYield: null,
      etfPresence: { POW: false, VOLT: 3.03, PBD: false, PBW: false },
      tonyNote: 'MODINE MANUFACTURING CO appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 3.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ABBN', name: 'ABB LTD', easyScore: 1, proScore: 2.95,
      price: 0, weeklyPrices: [0.00, 0.00, 0.00, 0.00, 0.00], weeklyChange: 0, sortRank: 0,
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { POW: false, VOLT: 2.95, PBD: false, PBW: false },
      tonyNote: 'ABB LTD appears in 1 of 2 Electrification ETFs (50% coverage) with average weight 3.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 1, proScore: 5.66,
      price: 746.52, weeklyPrices: [724.12, 731.59, 735.32, 741.29, 746.52], weeklyChange: 2.5, sortRank: 0,
      marketCap: '$23B', pe: 66.5, revenueGrowth: 92, eps: 11.22, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 5.66, PRN: false },
      tonyNote: 'Sterling Infrastructure, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 5.7% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 1, proScore: 4.42,
      price: 1875.23, weeklyPrices: [1818.97, 1837.73, 1847.10, 1862.10, 1875.23], weeklyChange: 2.72, sortRank: 0,
      marketCap: '$66B', pe: 54.1, revenueGrowth: 1, eps: 34.68, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: 4.42, PRN: false },
      tonyNote: 'Comfort Systems USA, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 4.4% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MTZ', name: 'MasTec, Inc.', easyScore: 1, proScore: 4.21,
      price: 392.53, weeklyPrices: [380.75, 384.68, 386.64, 389.78, 392.53], weeklyChange: 1.96, sortRank: 0,
      marketCap: '$31B', pe: 68.9, revenueGrowth: 35, eps: 5.7, grossMargin: 13, dividendYield: null,
      etfPresence: { AIRR: 4.21, PRN: false },
      tonyNote: 'MasTec, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 4.2% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'EME', name: 'EMCOR Group, Inc.', easyScore: 1, proScore: 4.19,
      price: 864.11, weeklyPrices: [838.19, 846.83, 851.15, 858.06, 864.11], weeklyChange: 1.14, sortRank: 0,
      marketCap: '$38B', pe: 29.1, revenueGrowth: 20, eps: 29.73, grossMargin: 19, dividendYield: 0.15,
      etfPresence: { AIRR: 4.19, PRN: false },
      tonyNote: 'EMCOR Group, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 4.2% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 1, proScore: 4.12,
      price: 646, weeklyPrices: [626.62, 633.08, 636.31, 641.48, 646.00], weeklyChange: 1, sortRank: 0,
      marketCap: '$9B', pe: 66.5, revenueGrowth: 13, eps: 9.72, grossMargin: 20, dividendYield: 0.31,
      etfPresence: { AIRR: 4.12, PRN: false },
      tonyNote: 'Argan, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 4.1% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SAIA', name: 'Saia, Inc.', easyScore: 1, proScore: 4.09,
      price: 466.34, weeklyPrices: [452.35, 457.01, 459.34, 463.08, 466.34], weeklyChange: 3.87, sortRank: 0,
      marketCap: '$12B', pe: 49, revenueGrowth: 2, eps: 9.51, grossMargin: 24, dividendYield: null,
      etfPresence: { AIRR: 4.09, PRN: false },
      tonyNote: 'Saia, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 4.1% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CHRW', name: 'C.H. Robinson Worldwide, Inc.', easyScore: 1, proScore: 4.07,
      price: 182.59, weeklyPrices: [177.11, 178.94, 179.85, 181.31, 182.59], weeklyChange: 5.53, sortRank: 0,
      marketCap: '$22B', pe: 36.9, revenueGrowth: -1, eps: 4.95, grossMargin: 9, dividendYield: null,
      etfPresence: { AIRR: 4.07, PRN: false },
      tonyNote: 'C.H. Robinson Worldwide, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 4.1% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DY', name: 'Dycom Industries, Inc.', easyScore: 1, proScore: 3.34,
      price: 418.8, weeklyPrices: [406.24, 410.42, 412.52, 415.87, 418.80], weeklyChange: 1.32, sortRank: 0,
      marketCap: '$13B', pe: 43.9, revenueGrowth: 34, eps: 9.55, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: 3.34, PRN: false },
      tonyNote: 'Dycom Industries, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 3.3% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 1, proScore: 3.27,
      price: 201.49, weeklyPrices: [195.45, 197.46, 198.47, 200.08, 201.49], weeklyChange: 2.11, sortRank: 0,
      marketCap: '$18B', pe: 53.7, revenueGrowth: 26, eps: 3.75, grossMargin: 23, dividendYield: 0.53,
      etfPresence: { AIRR: 3.27, PRN: false },
      tonyNote: 'BWX Technologies, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 3.3% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 1, proScore: 3.08,
      price: 323.64, weeklyPrices: [313.93, 317.17, 318.79, 321.37, 323.64], weeklyChange: -0.3, sortRank: 0,
      marketCap: '$13B', pe: 21, revenueGrowth: 13, eps: 15.39, grossMargin: 12, dividendYield: 1.7,
      etfPresence: { AIRR: 3.08, PRN: false },
      tonyNote: 'Huntington Ingalls Industries, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 3.1% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OC', name: 'Owens Corning', easyScore: 1, proScore: 2.87,
      price: 110.49, weeklyPrices: [107.18, 108.28, 108.83, 109.72, 110.49], weeklyChange: 2.35, sortRank: 0,
      marketCap: '$9B', pe: null, revenueGrowth: -10, eps: -4.74, grossMargin: 27, dividendYield: 2.74,
      etfPresence: { AIRR: 2.87, PRN: false },
      tonyNote: 'Owens Corning appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 2.9% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 1, proScore: 2.83,
      price: 55.22, weeklyPrices: [53.56, 54.12, 54.39, 54.83, 55.22], weeklyChange: 3.28, sortRank: 0,
      marketCap: '$10B', pe: 324.8, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.83, PRN: false },
      tonyNote: 'Kratos Defense & Security Solutions, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 2.8% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 1, proScore: 2.63,
      price: 64, weeklyPrices: [62.08, 62.72, 63.04, 63.55, 64.00], weeklyChange: -0.3, sortRank: 0,
      marketCap: '$8B', pe: 278.3, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 2.63, PRN: false },
      tonyNote: 'Karman Holdings Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 2.6% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CLH', name: 'Clean Harbors, Inc.', easyScore: 1, proScore: 2.59,
      price: 291.14, weeklyPrices: [282.41, 285.32, 286.77, 289.10, 291.14], weeklyChange: -0.29, sortRank: 0,
      marketCap: '$15B', pe: 39.4, revenueGrowth: 2, eps: 7.39, grossMargin: 32, dividendYield: null,
      etfPresence: { AIRR: 2.59, PRN: false },
      tonyNote: 'Clean Harbors, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 2.6% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 1, proScore: 2.46,
      price: 268.91, weeklyPrices: [260.84, 263.53, 264.88, 267.03, 268.91], weeklyChange: 2.8, sortRank: 0,
      marketCap: '$10B', pe: 52.4, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.14,
      etfPresence: { AIRR: 2.46, PRN: false },
      tonyNote: 'Powell Industries, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 2.5% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FNB', name: 'F.N.B. Corporation', easyScore: 1, proScore: 2.38,
      price: 17.55, weeklyPrices: [17.02, 17.20, 17.29, 17.43, 17.55], weeklyChange: 2.48, sortRank: 0,
      marketCap: '$6B', pe: 10.8, revenueGrowth: 10, eps: 1.62, grossMargin: 0, dividendYield: 3.04,
      etfPresence: { AIRR: 2.38, PRN: false },
      tonyNote: 'F.N.B. Corporation appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 2.4% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WMS', name: 'Advanced Drainage Systems, Inc.', easyScore: 1, proScore: 2.09,
      price: 134.63, weeklyPrices: [130.59, 131.94, 132.61, 133.69, 134.63], weeklyChange: 2.31, sortRank: 0,
      marketCap: '$10B', pe: 22.4, revenueGrowth: 0, eps: 6.01, grossMargin: 39, dividendYield: 0.55,
      etfPresence: { AIRR: 2.09, PRN: false },
      tonyNote: 'Advanced Drainage Systems, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 2.1% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CNM', name: 'Core & Main, Inc. (Class A)', easyScore: 1, proScore: 2.09,
      price: 46.59, weeklyPrices: [45.19, 45.66, 45.89, 46.26, 46.59], weeklyChange: 3.57, sortRank: 0,
      marketCap: '$9B', pe: 20.2, revenueGrowth: -7, eps: 2.31, grossMargin: 27, dividendYield: null,
      etfPresence: { AIRR: 2.09, PRN: false },
      tonyNote: 'Core & Main, Inc. (Class A) appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 2.1% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KEX', name: 'Kirby Corporation', easyScore: 1, proScore: 1.99,
      price: 148.31, weeklyPrices: [143.86, 145.34, 146.09, 147.27, 148.31], weeklyChange: 1.16, sortRank: 0,
      marketCap: '$8B', pe: 22.8, revenueGrowth: 7, eps: 6.5, grossMargin: 34, dividendYield: null,
      etfPresence: { AIRR: 1.99, PRN: false },
      tonyNote: 'Kirby Corporation appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 2.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IESC', name: 'IES Holdings, Inc.', easyScore: 1, proScore: 1.91,
      price: 652.23, weeklyPrices: [632.66, 639.19, 642.45, 647.66, 652.23], weeklyChange: 2, sortRank: 0,
      marketCap: '$13B', pe: 34.8, revenueGrowth: 17, eps: 18.74, grossMargin: 26, dividendYield: null,
      etfPresence: { AIRR: 1.91, PRN: false },
      tonyNote: 'IES Holdings, Inc. appears in 1 of 1 Industrials ETFs (100% coverage) with average weight 1.9% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
