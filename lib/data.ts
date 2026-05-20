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
  'Broad Tech':      6,
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
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 7, proScore: 6.64,
      price: 220.61, weeklyPrices: [213.99, 216.20, 217.30, 219.07, 220.61], weeklyChange: -0.77, sortRank: 0,
      marketCap: '$5.3T', pe: 45, revenueGrowth: 73, eps: 4.9, grossMargin: 71, dividendYield: 0.02,
      etfPresence: { AIS: true, ARTY: true, BAI: true, IVEP: false, IGPT: true, IVES: true, ALAI: true, CHAT: true },
      tonyNote: 'NVIDIA Corp appears in 7 of 8 AI & ML ETFs (88% coverage) with average weight 6.6% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
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
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 6, proScore: 3.97,
      price: 411.07, weeklyPrices: [398.74, 402.85, 404.90, 408.19, 411.07], weeklyChange: -2.29, sortRank: 0,
      marketCap: '$1.9T', pe: 80, revenueGrowth: 30, eps: 5.14, grossMargin: 77, dividendYield: 0.63,
      etfPresence: { AIS: true, ARTY: true, BAI: true, IVEP: false, IGPT: false, IVES: true, ALAI: true, CHAT: true },
      tonyNote: 'Broadcom Inc appears in 6 of 8 AI & ML ETFs (75% coverage) with average weight 4.0% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 6, proScore: 2.49,
      price: 455.8, weeklyPrices: [442.13, 446.68, 448.96, 452.61, 455.80], weeklyChange: -0.63, sortRank: 0,
      marketCap: '$157B', pe: 27.2, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.13,
      etfPresence: { AIS: true, ARTY: true, BAI: true, IVEP: false, IGPT: true, IVES: false, ALAI: true, CHAT: true },
      tonyNote: 'Western Digital Corp appears in 6 of 8 AI & ML ETFs (75% coverage) with average weight 2.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRWV', name: 'COREWEAVE INC CLASS A', easyScore: 5, proScore: 1.85,
      price: 99.81, weeklyPrices: [96.82, 97.81, 98.31, 99.11, 99.81], weeklyChange: -3.82, sortRank: 0,
      marketCap: '$54B', pe: null, revenueGrowth: 112, eps: -2.72, grossMargin: 69, dividendYield: null,
      etfPresence: { AIS: false, ARTY: true, BAI: true, IVEP: false, IGPT: false, IVES: true, ALAI: true, CHAT: true },
      tonyNote: 'COREWEAVE INC CLASS A appears in 5 of 8 AI & ML ETFs (63% coverage) with average weight 1.9% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, proScore: 1.78,
      price: 244.26, weeklyPrices: [236.93, 239.37, 240.60, 242.55, 244.26], weeklyChange: 13.3, sortRank: 0,
      marketCap: '$42B', pe: 163.9, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: true, ARTY: true, BAI: false, IVEP: false, IGPT: true, IVES: false, ALAI: true, CHAT: true },
      tonyNote: 'Astera Labs Inc appears in 5 of 8 AI & ML ETFs (63% coverage) with average weight 1.8% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 5, proScore: 1.55,
      price: 141.58, weeklyPrices: [137.33, 138.75, 139.46, 140.59, 141.58], weeklyChange: -0.09, sortRank: 0,
      marketCap: '$178B', pe: 48.5, revenueGrowth: 35, eps: 2.92, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: true, ARTY: true, BAI: true, IVEP: false, IGPT: false, IVES: false, ALAI: true, CHAT: true },
      tonyNote: 'Arista Networks Inc appears in 5 of 8 AI & ML ETFs (63% coverage) with average weight 1.6% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 5, proScore: 1.55,
      price: 135.26, weeklyPrices: [131.20, 132.55, 133.23, 134.31, 135.26], weeklyChange: 0.09, sortRank: 0,
      marketCap: '$324B', pe: 152, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { AIS: false, ARTY: true, BAI: true, IVEP: false, IGPT: false, IVES: true, ALAI: true, CHAT: true },
      tonyNote: 'PALANTIR TECHNOLOGIES INC CLASS A appears in 5 of 8 AI & ML ETFs (63% coverage) with average weight 1.6% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'Credo Technology Group Holding Ltd', easyScore: 5, proScore: 0.9,
      price: 168.99, weeklyPrices: [163.92, 165.61, 166.46, 167.81, 168.99], weeklyChange: 8.14, sortRank: 0,
      marketCap: '$31B', pe: 92.3, revenueGrowth: 202, eps: 1.83, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: true, ARTY: true, BAI: true, IVEP: false, IGPT: true, IVES: false, ALAI: false, CHAT: true },
      tonyNote: 'Credo Technology Group Holding Ltd appears in 5 of 8 AI & ML ETFs (63% coverage) with average weight 0.9% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CLS', name: 'Celestica Inc', easyScore: 4, proScore: 23.05,
      price: 339.13, weeklyPrices: [328.96, 332.35, 334.04, 336.76, 339.13], weeklyChange: -1.03, sortRank: 0,
      marketCap: '$39B', pe: 41.2, revenueGrowth: 53, eps: 8.24, grossMargin: 12, dividendYield: null,
      etfPresence: { AIS: true, ARTY: true, BAI: true, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: true },
      tonyNote: 'Celestica Inc appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 23.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 4, proScore: 5.81,
      price: 387.66, weeklyPrices: [376.03, 379.91, 381.85, 384.95, 387.66], weeklyChange: -2.34, sortRank: 0,
      marketCap: '$4.7T', pe: 29.6, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: true, IVEP: false, IGPT: true, IVES: true, ALAI: false, CHAT: true },
      tonyNote: 'ALPHABET INC CLASS A appears in 4 of 8 AI & ML ETFs (50% coverage) with average weight 5.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, proScore: 5.75,
      price: 698.74, weeklyPrices: [677.78, 684.77, 688.26, 693.85, 698.74], weeklyChange: 2.52, sortRank: 0,
      marketCap: '$788B', pe: 33, revenueGrowth: 196, eps: 21.17, grossMargin: 58, dividendYield: 0.09,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: true },
      tonyNote: 'MICRON TECHNOLOGY INC appears in 4 of 4 Semiconductors ETFs (100% coverage) with average weight 5.8% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, proScore: 6.44,
      price: 414.05, weeklyPrices: [401.63, 405.77, 407.84, 411.15, 414.05], weeklyChange: -1.65, sortRank: 0,
      marketCap: '$675B', pe: 138.9, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: false },
      tonyNote: 'ADVANCED MICRO DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 6.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 3, proScore: 4.71,
      price: 411.07, weeklyPrices: [398.74, 402.85, 404.90, 408.19, 411.07], weeklyChange: -2.29, sortRank: 0,
      marketCap: '$1.9T', pe: 80, revenueGrowth: 30, eps: 5.14, grossMargin: 77, dividendYield: 0.63,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: false },
      tonyNote: 'BROADCOM INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 4.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, proScore: 4.41,
      price: 220.61, weeklyPrices: [213.99, 216.20, 217.30, 219.07, 220.61], weeklyChange: -0.77, sortRank: 0,
      marketCap: '$5.3T', pe: 45, revenueGrowth: 73, eps: 4.9, grossMargin: 71, dividendYield: 0.02,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: false },
      tonyNote: 'NVIDIA CORP appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 4.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 3, proScore: 3.87,
      price: 302.31, weeklyPrices: [293.24, 296.26, 297.78, 300.19, 302.31], weeklyChange: 0.57, sortRank: 0,
      marketCap: '$275B', pe: 51.6, revenueGrowth: 19, eps: 5.86, grossMargin: 57, dividendYield: 1.88,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: false },
      tonyNote: 'TEXAS INSTRUMENT INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.9% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 3, proScore: 2.89,
      price: 106.02, weeklyPrices: [102.84, 103.90, 104.43, 105.28, 106.02], weeklyChange: -3.12, sortRank: 0,
      marketCap: '$41B', pe: 78, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: false },
      tonyNote: 'ON SEMICONDUCTOR CORP appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 2.9% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 3, proScore: 2.8,
      price: 1468.11, weeklyPrices: [1424.07, 1438.75, 1446.09, 1457.83, 1468.11], weeklyChange: -1.23, sortRank: 0,
      marketCap: '$72B', pe: 105.2, revenueGrowth: 26, eps: 13.95, grossMargin: 55, dividendYield: 0.54,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: false },
      tonyNote: 'MONOLITHIC POWER SYSTEMS INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 2.8% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, proScore: 2.61,
      price: 414.31, weeklyPrices: [401.88, 406.02, 408.10, 411.41, 414.31], weeklyChange: -1.02, sortRank: 0,
      marketCap: '$202B', pe: 75.7, revenueGrowth: 30, eps: 5.47, grossMargin: 63, dividendYield: 0.98,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 2.6% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 3, proScore: 2.55,
      price: 91.81, weeklyPrices: [89.06, 89.97, 90.43, 91.17, 91.81], weeklyChange: -1.02, sortRank: 0,
      marketCap: '$50B', pe: 417.3, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 1.98,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 2.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 3, proScore: 2.3,
      price: 358.98, weeklyPrices: [348.21, 351.80, 353.60, 356.47, 358.98], weeklyChange: 0.77, sortRank: 0,
      marketCap: '$27B', pe: 154.1, revenueGrowth: 23, eps: 2.33, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 2.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SWKS', name: 'SKYWORKS SOLUTIONS INC', easyScore: 3, proScore: 1.68,
      price: 70.35, weeklyPrices: [68.24, 68.94, 69.29, 69.86, 70.35], weeklyChange: 0, sortRank: 0,
      marketCap: '$11B', pe: 29.3, revenueGrowth: -1, eps: 2.4, grossMargin: 41, dividendYield: 4.04,
      etfPresence: { SOXX: true, PSI: true, XSD: true, DRAM: false },
      tonyNote: 'SKYWORKS SOLUTIONS INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 1.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MXL', name: 'MaxLinear Inc', easyScore: 2, proScore: 7.99,
      price: 94.86, weeklyPrices: [92.01, 92.96, 93.44, 94.20, 94.86], weeklyChange: 8.46, sortRank: 0,
      marketCap: '$8B', pe: null, revenueGrowth: 43, eps: -1.52, grossMargin: 57, dividendYield: null,
      etfPresence: { SOXX: false, PSI: true, XSD: true, DRAM: false },
      tonyNote: 'MaxLinear Inc appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 8.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 4, proScore: 7.46,
      price: 220.61, weeklyPrices: [213.99, 216.20, 217.30, 219.07, 220.61], weeklyChange: -0.77, sortRank: 0,
      marketCap: '$5.3T', pe: 45, revenueGrowth: 73, eps: 4.9, grossMargin: 71, dividendYield: 0.02,
      etfPresence: { QQQ: true, QQQA: false, PTF: true, WCLD: false, MAGS: true, IGV: false, FDTX: false, GTEK: false, ARKK: true, MARS: false },
      tonyNote: 'NVIDIA Corp appears in 4 of 6 Broad Tech ETFs (67% coverage) with average weight 7.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSLA', name: 'Tesla Inc', easyScore: 3, proScore: 9.42,
      price: 404.11, weeklyPrices: [391.99, 396.03, 398.05, 401.28, 404.11], weeklyChange: -1.43, sortRank: 0,
      marketCap: '$1.5T', pe: 370.7, revenueGrowth: 16, eps: 1.09, grossMargin: 19, dividendYield: null,
      etfPresence: { QQQ: true, QQQA: false, PTF: false, WCLD: false, MAGS: true, IGV: false, FDTX: false, GTEK: false, ARKK: true, MARS: false },
      tonyNote: 'Tesla Inc appears in 3 of 6 Broad Tech ETFs (50% coverage) with average weight 9.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'Microsoft Corp', easyScore: 3, proScore: 9.25,
      price: 417.42, weeklyPrices: [404.90, 409.07, 411.16, 414.50, 417.42], weeklyChange: -1.44, sortRank: 0,
      marketCap: '$3.1T', pe: 24.9, revenueGrowth: 18, eps: 16.78, grossMargin: 68, dividendYield: 0.87,
      etfPresence: { QQQ: true, QQQA: false, PTF: false, WCLD: false, MAGS: true, IGV: true, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Microsoft Corp appears in 3 of 6 Broad Tech ETFs (50% coverage) with average weight 9.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AAPL', name: 'Apple Inc', easyScore: 3, proScore: 8.8,
      price: 298.97, weeklyPrices: [290.00, 292.99, 294.49, 296.88, 298.97], weeklyChange: 0.38, sortRank: 0,
      marketCap: '$4.4T', pe: 36.2, revenueGrowth: 17, eps: 8.25, grossMargin: 48, dividendYield: 0.36,
      etfPresence: { QQQ: true, QQQA: false, PTF: true, WCLD: false, MAGS: true, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Apple Inc appears in 3 of 6 Broad Tech ETFs (50% coverage) with average weight 8.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 3, proScore: 7.23,
      price: 259.34, weeklyPrices: [251.56, 254.15, 255.45, 257.52, 259.34], weeklyChange: -2.08, sortRank: 0,
      marketCap: '$2.8T', pe: 31.6, revenueGrowth: 17, eps: 8.2, grossMargin: 51, dividendYield: null,
      etfPresence: { QQQ: true, QQQA: false, PTF: false, WCLD: false, MAGS: true, IGV: false, FDTX: false, GTEK: false, ARKK: true, MARS: false },
      tonyNote: 'Amazon.com Inc appears in 3 of 6 Broad Tech ETFs (50% coverage) with average weight 7.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'Alphabet Inc Class A', easyScore: 3, proScore: 6.78,
      price: 387.66, weeklyPrices: [376.03, 379.91, 381.85, 384.95, 387.66], weeklyChange: -2.34, sortRank: 0,
      marketCap: '$4.7T', pe: 29.6, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { QQQ: true, QQQA: false, PTF: true, WCLD: false, MAGS: true, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Alphabet Inc Class A appears in 3 of 6 Broad Tech ETFs (50% coverage) with average weight 6.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 3, proScore: 5.96,
      price: 602.61, weeklyPrices: [584.53, 590.56, 593.57, 598.39, 602.61], weeklyChange: -1.41, sortRank: 0,
      marketCap: '$1.5T', pe: 21.9, revenueGrowth: 33, eps: 27.48, grossMargin: 82, dividendYield: 0.35,
      etfPresence: { QQQ: true, QQQA: false, PTF: false, WCLD: false, MAGS: true, IGV: false, FDTX: false, GTEK: false, ARKK: true, MARS: false },
      tonyNote: 'Meta Platforms Inc appears in 3 of 6 Broad Tech ETFs (50% coverage) with average weight 6.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'Palantir Technologies Inc', easyScore: 3, proScore: 3.86,
      price: 135.26, weeklyPrices: [131.20, 132.55, 133.23, 134.31, 135.26], weeklyChange: 0.09, sortRank: 0,
      marketCap: '$324B', pe: 152, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { QQQ: true, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: true, FDTX: false, GTEK: false, ARKK: true, MARS: false },
      tonyNote: 'Palantir Technologies Inc appears in 3 of 6 Broad Tech ETFs (50% coverage) with average weight 3.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRCL', name: 'Circle Internet Group Inc', easyScore: 3, proScore: 2.24,
      price: 111.03, weeklyPrices: [107.70, 108.81, 109.36, 110.25, 111.03], weeklyChange: -0.32, sortRank: 0,
      marketCap: '$30B', pe: null, revenueGrowth: 20, eps: -0.23, grossMargin: 8, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: true, WCLD: false, MAGS: false, IGV: true, FDTX: false, GTEK: false, ARKK: true, MARS: false },
      tonyNote: 'Circle Internet Group Inc appears in 3 of 6 Broad Tech ETFs (50% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile Inc', easyScore: 2, proScore: 4.81,
      price: 88.1, weeklyPrices: [85.46, 86.34, 86.78, 87.48, 88.10], weeklyChange: 1.46, sortRank: 0,
      marketCap: '$34B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: true, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: true },
      tonyNote: 'AST SpaceMobile Inc appears in 2 of 6 Broad Tech ETFs (33% coverage) with average weight 4.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 2, proScore: 4.12,
      price: 414.05, weeklyPrices: [401.63, 405.77, 407.84, 411.15, 414.05], weeklyChange: -1.65, sortRank: 0,
      marketCap: '$675B', pe: 138.9, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { QQQ: true, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: true, MARS: false },
      tonyNote: 'Advanced Micro Devices Inc appears in 2 of 6 Broad Tech ETFs (33% coverage) with average weight 4.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks Inc', easyScore: 2, proScore: 4.11,
      price: 240.13, weeklyPrices: [232.93, 235.33, 236.53, 238.45, 240.13], weeklyChange: -3, sortRank: 0,
      marketCap: '$195B', pe: 133.4, revenueGrowth: 15, eps: 1.8, grossMargin: 74, dividendYield: null,
      etfPresence: { QQQ: true, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: true, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'Palo Alto Networks Inc appears in 2 of 6 Broad Tech ETFs (33% coverage) with average weight 4.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
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
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 3, proScore: 4.09,
      price: 714.13, weeklyPrices: [692.71, 699.85, 703.42, 709.13, 714.13], weeklyChange: -1.23, sortRank: 0,
      marketCap: '$107B', pe: 98.1, revenueGrowth: 26, eps: 7.28, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: true, VOLT: true, PBD: false, PBW: true },
      tonyNote: 'Quanta Services Inc appears in 3 of 4 Electrification ETFs (75% coverage) with average weight 4.1% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 3, proScore: 3.84,
      price: 249.71, weeklyPrices: [242.22, 244.72, 245.96, 247.96, 249.71], weeklyChange: -3.32, sortRank: 0,
      marketCap: '$4B', pe: 60.2, revenueGrowth: 17, eps: 4.15, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: true, VOLT: true, PBD: false, PBW: true },
      tonyNote: 'Bel Fuse Inc appears in 3 of 4 Electrification ETFs (75% coverage) with average weight 3.8% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 3, proScore: 2.59,
      price: 261.34, weeklyPrices: [253.50, 256.11, 257.42, 259.51, 261.34], weeklyChange: 1.02, sortRank: 0,
      marketCap: '$74B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: true, PBD: true, PBW: true },
      tonyNote: 'BLOOM ENERGY CORP appears in 3 of 4 Electrification ETFs (75% coverage) with average weight 2.6% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 3, proScore: 2.29,
      price: 461.5, weeklyPrices: [447.65, 452.27, 454.58, 458.27, 461.50], weeklyChange: -1.99, sortRank: 0,
      marketCap: '$24B', pe: 27.2, revenueGrowth: 11, eps: 16.94, grossMargin: 36, dividendYield: 1.23,
      etfPresence: { POW: true, VOLT: true, PBD: true, PBW: false },
      tonyNote: 'Hubbell Inc appears in 3 of 4 Electrification ETFs (75% coverage) with average weight 2.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 3, proScore: 1.71,
      price: 302.84, weeklyPrices: [293.75, 296.78, 298.30, 300.72, 302.84], weeklyChange: -2.01, sortRank: 0,
      marketCap: '$12B', pe: 62.8, revenueGrowth: 26, eps: 4.82, grossMargin: 39, dividendYield: 0.13,
      etfPresence: { POW: true, VOLT: true, PBD: false, PBW: true },
      tonyNote: 'Advanced Energy Industries Inc appears in 3 of 4 Electrification ETFs (75% coverage) with average weight 1.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SEDG', name: 'SolarEdge Technologies Inc', easyScore: 3, proScore: 1.01,
      price: 54.53, weeklyPrices: [52.89, 53.44, 53.71, 54.15, 54.53], weeklyChange: -1.27, sortRank: 0,
      marketCap: '$3B', pe: null, revenueGrowth: 42, eps: -6.13, grossMargin: 18, dividendYield: null,
      etfPresence: { POW: true, VOLT: false, PBD: true, PBW: true },
      tonyNote: 'SolarEdge Technologies Inc appears in 3 of 4 Electrification ETFs (75% coverage) with average weight 1.0% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ENPH', name: 'Enphase Energy Inc', easyScore: 3, proScore: 1,
      price: 46.76, weeklyPrices: [45.36, 45.82, 46.06, 46.43, 46.76], weeklyChange: -5.9, sortRank: 0,
      marketCap: '$6B', pe: 46.3, revenueGrowth: -21, eps: 1.01, grossMargin: 27, dividendYield: null,
      etfPresence: { POW: true, VOLT: false, PBD: true, PBW: true },
      tonyNote: 'Enphase Energy Inc appears in 3 of 4 Electrification ETFs (75% coverage) with average weight 1.0% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ITRI', name: 'ITRON INC', easyScore: 3, proScore: 0.92,
      price: 78.02, weeklyPrices: [75.68, 76.46, 76.85, 77.47, 78.02], weeklyChange: -3.44, sortRank: 0,
      marketCap: '$3B', pe: 12.5, revenueGrowth: -3, eps: 6.26, grossMargin: 39, dividendYield: null,
      etfPresence: { POW: false, VOLT: true, PBD: true, PBW: true },
      tonyNote: 'ITRON INC appears in 3 of 4 Electrification ETFs (75% coverage) with average weight 0.9% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 2, proScore: 4.54,
      price: 371.88, weeklyPrices: [360.72, 364.44, 366.30, 369.28, 371.88], weeklyChange: -2.62, sortRank: 0,
      marketCap: '$144B', pe: 36.4, revenueGrowth: 17, eps: 10.23, grossMargin: 37, dividendYield: 1.18,
      etfPresence: { POW: true, VOLT: true, PBD: false, PBW: false },
      tonyNote: 'Eaton Corp PLC appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 4.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 2, proScore: 3.95,
      price: 1011.8, weeklyPrices: [981.45, 991.56, 996.62, 1004.72, 1011.80], weeklyChange: -0.04, sortRank: 0,
      marketCap: '$272B', pe: 29.6, revenueGrowth: 16, eps: 34.2, grossMargin: 20, dividendYield: 0.17,
      etfPresence: { POW: true, VOLT: true, PBD: false, PBW: false },
      tonyNote: 'GE Vernova Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 4.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 2, proScore: 3.71,
      price: 90.06, weeklyPrices: [87.36, 88.26, 88.71, 89.43, 90.06], weeklyChange: 1.15, sortRank: 0,
      marketCap: '$188B', pe: 22.9, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.77,
      etfPresence: { POW: true, VOLT: true, PBD: false, PBW: false },
      tonyNote: 'NextEra Energy Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 3.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, proScore: 5.03,
      price: 728.29, weeklyPrices: [706.44, 713.72, 717.37, 723.19, 728.29], weeklyChange: -5.51, sortRank: 0,
      marketCap: '$22B', pe: 64.9, revenueGrowth: 92, eps: 11.22, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: true, PRN: true },
      tonyNote: 'Sterling Infrastructure, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 5.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
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
      ticker: 'MTZ', name: 'MasTec, Inc.', easyScore: 2, proScore: 3.69,
      price: 385, weeklyPrices: [373.45, 377.30, 379.23, 382.31, 385.00], weeklyChange: -0.15, sortRank: 0,
      marketCap: '$30B', pe: 67.5, revenueGrowth: 35, eps: 5.7, grossMargin: 13, dividendYield: null,
      etfPresence: { AIRR: true, PRN: true },
      tonyNote: 'MasTec, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 3.7% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DY', name: 'Dycom Industries, Inc.', easyScore: 2, proScore: 2.89,
      price: 413.35, weeklyPrices: [400.95, 405.08, 407.15, 410.46, 413.35], weeklyChange: -1.5, sortRank: 0,
      marketCap: '$12B', pe: 43.3, revenueGrowth: 34, eps: 9.55, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: true, PRN: true },
      tonyNote: 'Dycom Industries, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 2.9% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CLH', name: 'Clean Harbors, Inc.', easyScore: 2, proScore: 2.43,
      price: 291.98, weeklyPrices: [283.22, 286.14, 287.60, 289.94, 291.98], weeklyChange: -3.22, sortRank: 0,
      marketCap: '$15B', pe: 39.5, revenueGrowth: 2, eps: 7.39, grossMargin: 32, dividendYield: null,
      etfPresence: { AIRR: true, PRN: true },
      tonyNote: 'Clean Harbors, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 2.4% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, proScore: 2.37,
      price: 261.58, weeklyPrices: [253.73, 256.35, 257.66, 259.75, 261.58], weeklyChange: -1.96, sortRank: 0,
      marketCap: '$10B', pe: 51, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.14,
      etfPresence: { AIRR: true, PRN: true },
      tonyNote: 'Powell Industries, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 2.4% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, proScore: 2.03,
      price: 64.2, weeklyPrices: [62.27, 62.92, 63.24, 63.75, 64.20], weeklyChange: -3.04, sortRank: 0,
      marketCap: '$9B', pe: 279.1, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: true, PRN: true },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 2.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GVA', name: 'Granite Construction Incorporated', easyScore: 2, proScore: 1.8,
      price: 132.46, weeklyPrices: [128.49, 129.81, 130.47, 131.53, 132.46], weeklyChange: -3.51, sortRank: 0,
      marketCap: '$6B', pe: 36.1, revenueGrowth: 30, eps: 3.67, grossMargin: 16, dividendYield: 0.39,
      etfPresence: { AIRR: true, PRN: true },
      tonyNote: 'Granite Construction Incorporated appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 1.8% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'R', name: 'Ryder System, Inc.', easyScore: 2, proScore: 1.57,
      price: 228.21, weeklyPrices: [221.36, 223.65, 224.79, 226.61, 228.21], weeklyChange: -1.44, sortRank: 0,
      marketCap: '$9B', pe: 18.9, revenueGrowth: 0, eps: 12.05, grossMargin: 20, dividendYield: 1.6,
      etfPresence: { AIRR: true, PRN: true },
      tonyNote: 'Ryder System, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 1.6% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ECG', name: 'Everus Construction Group, Inc.', easyScore: 2, proScore: 1.48,
      price: 146.26, weeklyPrices: [141.87, 143.33, 144.07, 145.24, 146.26], weeklyChange: -1.48, sortRank: 0,
      marketCap: '$7B', pe: 33.5, revenueGrowth: 25, eps: 4.37, grossMargin: 12, dividendYield: null,
      etfPresence: { AIRR: true, PRN: true },
      tonyNote: 'Everus Construction Group, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 1.5% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, proScore: 1.47,
      price: 195.79, weeklyPrices: [189.92, 191.87, 192.85, 194.42, 195.79], weeklyChange: -2.33, sortRank: 0,
      marketCap: '$10B', pe: 37.4, revenueGrowth: 17, eps: 5.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: true, PRN: true },
      tonyNote: 'SPX Technologies appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 1.5% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
