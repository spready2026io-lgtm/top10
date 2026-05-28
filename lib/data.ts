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
  priceHistory?: { '1W': number[]; '1M': number[]; '6M': number[]; '1Y': number[] };
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
export const SCAN_TIMESTAMP    = '2026-05-28T13:34:46.896Z';
export const SCAN_TIMESTAMP_NY = 'May 28, 2026 at 9:34 AM ET';
// @@END_GENERATED:SCAN_TIMESTAMP@@

// Number of ETFs per theme — denominator for Coverage Score display (x/n badge)
// @@GENERATED:THEME_ETF_COUNT@@
export const THEME_ETF_COUNT: Record<Theme, number> = {
  'AI & ML':         7,
  'Semiconductors':  4,
  'Broad Tech':      10,
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
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 6, proScore: 7.03, coverage: 0.857,
      price: 927.93, weeklyPrices: [900.09, 909.37, 914.01, 921.43, 927.93], weeklyChange: 21.76, sortRank: 0, periodReturns: { '1M': 84, '6M': 292.4, '1Y': 864.8 },
      priceHistory: { '1W': [762.1, 751, 895.88, 928.41, 927.93], '1M': [504.29, 518.46, 517.16, 542.21, 576.45, 640.2, 666.59, 646.63, 746.81, 795.33, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 927.93], '6M': [236.48, 237.22, 241.14, 265.92, 294.37, 343.43, 338.13, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.73, 382.09, 367.85, 421.51, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 927.93], '1Y': [96.18, 103.25, 116.03, 121.82, 126, 122.29, 124.53, 113.26, 111.73, 109.14, 111.87, 125.29, 115.79, 122, 131.37, 157.23, 162.73, 157.27, 187.83, 181.6, 202.53, 206.71, 224.01, 238.33, 236.95, 201.37, 236.48, 237.22, 241.14, 265.92, 294.37, 343.43, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.73, 382.09, 367.85, 421.51, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 927.93] },
      velocityScore: { '1D': 16.4, '1W': 32.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.0T', pe: 43.8, revenueGrowth: 196, eps: 21.17, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { AIS: 8.17, ARTY: 7.37, BAI: 5.17, IVEP: false, IGPT: 11.54, IVES: 7.27, ALAI: false, CHAT: 6.05 },
      tonyNote: 'Micron Technology Inc appears in 6 of 7 AI & ML ETFs (86% coverage) with average weight 7.0% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 6, proScore: 5.78, coverage: 0.857,
      price: 504.15, weeklyPrices: [489.03, 494.07, 496.59, 500.62, 504.15], weeklyChange: 12.14, sortRank: 0, periodReturns: { '1M': 56, '6M': 131.8, '1Y': 346.7 },
      priceHistory: { '1W': [449.59, 467.51, 503.89, 495.54, 504.15], '1M': [323.21, 337.11, 354.49, 360.54, 341.54, 355.26, 421.39, 408.46, 455.19, 458.79, 445.5, 449.7, 424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 504.15], '6M': [217.53, 217.97, 210.78, 213.43, 215.61, 214.35, 220.97, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 204.83, 199.46, 220.27, 210.21, 236.64, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 504.15], '1Y': [112.86, 118.58, 121.14, 126.79, 143.68, 137.91, 146.42, 160.41, 162.12, 176.31, 172.4, 180.95, 163.71, 168.58, 151.14, 158.57, 157.39, 159.46, 164.67, 214.9, 234.56, 234.99, 254.84, 237.7, 247.96, 206.02, 217.53, 217.97, 210.78, 213.43, 215.61, 214.35, 207.69, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 204.83, 199.46, 220.27, 210.21, 236.64, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 504.15] },
      velocityScore: { '1D': 10.3, '1W': 15.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$822B', pe: 166.9, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.54, ARTY: 7.54, BAI: 4.84, IVEP: false, IGPT: 7.11, IVES: 7.7, ALAI: false, CHAT: 5.75 },
      tonyNote: 'Advanced Micro Devices Inc appears in 6 of 7 AI & ML ETFs (86% coverage) with average weight 5.8% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 6, proScore: 4.21, coverage: 0.857,
      price: 212.94, weeklyPrices: [206.55, 208.68, 209.75, 211.45, 212.94], weeklyChange: -2.99, sortRank: 0, periodReturns: { '1M': -0.1, '6M': 20.3, '1Y': 58 },
      priceHistory: { '1W': [219.51, 215.33, 214.86, 212.6, 212.94], '1M': [213.17, 209.25, 199.57, 198.45, 198.48, 196.5, 207.83, 211.5, 215.2, 219.44, 225.83, 235.74, 225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 212.94], '6M': [177, 182.41, 175.02, 180.99, 188.22, 187.24, 185.81, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 186.03, 180.4, 178.68, 175.75, 183.91, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 212.94], '1Y': [134.81, 141.92, 142.83, 145.48, 155.02, 159.34, 164.92, 173, 173.74, 177.87, 180.77, 182.02, 174.98, 180.17, 167.02, 177.82, 176.67, 178.19, 187.62, 183.16, 181.81, 182.16, 202.89, 188.08, 186.86, 180.64, 177, 182.41, 175.02, 180.99, 188.22, 187.24, 184.94, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 186.03, 180.4, 178.68, 175.75, 183.91, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 212.94] },
      velocityScore: { '1D': -23.2, '1W': -27.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.2T', pe: 32.6, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { AIS: 2.56, ARTY: 3.72, BAI: 4.55, IVEP: false, IGPT: 5.85, IVES: 4.48, ALAI: false, CHAT: 6.12 },
      tonyNote: 'NVIDIA Corp appears in 6 of 7 AI & ML ETFs (86% coverage) with average weight 4.2% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 4, proScore: 3.95, coverage: 0.571,
      price: 386.9, weeklyPrices: [375.29, 379.16, 381.10, 384.19, 386.90], weeklyChange: -0.2, sortRank: 0, periodReturns: { '1M': 10.6, '6M': 20.8, '1Y': 124.5 },
      priceHistory: { '1W': [387.66, 382.97, 388.88, 388.83, 386.9], '1M': [349.78, 349.94, 384.8, 385.69, 383.25, 388.43, 398.04, 397.99, 400.8, 388.64, 402.62, 401.07, 396.78, 396.94, 387.66, 388.91, 387.66, 382.97, 388.88, 388.83, 386.9], '6M': [320.18, 321.27, 309.29, 307.16, 313.56, 314.34, 335.97, 322, 334.55, 339.71, 318.58, 303.33, 312.9, 303.13, 308.7, 307.69, 290.93, 297.39, 318.49, 337.12, 339.32, 349.94, 398.04, 402.62, 388.91, 386.9], '1Y': [172.36, 168.05, 177.35, 173.32, 173.54, 179.53, 180.19, 183.58, 192.17, 191.9, 196.52, 202.94, 199.75, 211.64, 235, 240.8, 254.72, 246.54, 245.35, 236.57, 251.46, 253.08, 281.48, 284.75, 278.57, 289.45, 320.18, 321.27, 309.29, 307.16, 313.56, 314.34, 331.86, 322, 334.55, 339.71, 318.58, 303.33, 312.9, 303.13, 308.7, 307.69, 290.93, 297.39, 318.49, 337.12, 339.32, 349.94, 398.04, 402.62, 388.91, 386.9] },
      velocityScore: { '1D': 6.5, '1W': 3.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.7T', pe: 29.5, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.74, IVEP: false, IGPT: 6.46, IVES: 4.73, ALAI: false, CHAT: 5.98 },
      tonyNote: 'ALPHABET INC CLASS A appears in 4 of 7 AI & ML ETFs (57% coverage) with average weight 4.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 5, proScore: 3, coverage: 0.714,
      price: 419.88, weeklyPrices: [407.28, 411.48, 413.58, 416.94, 419.88], weeklyChange: 1.28, sortRank: 0, periodReturns: { '1M': 5, '6M': 4.2, '1Y': 75.4 },
      priceHistory: { '1W': [414.57, 414.14, 422.01, 421.86, 419.88], '1M': [399.83, 405.45, 417.43, 421.28, 416.5, 427.36, 425.44, 412.56, 430, 428.43, 416.79, 439.79, 425.19, 420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 419.88], '6M': [402.96, 390.24, 359.93, 340.36, 349.39, 343.77, 354.61, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 341.57, 315.93, 318.81, 313.49, 354.91, 396.72, 422.65, 405.45, 425.44, 416.79, 417.76, 419.88], '1Y': [239.43, 261.08, 252.91, 251.26, 270.17, 275.18, 274.38, 286.45, 288.71, 293.7, 303.76, 311.23, 289.6, 308.65, 334.89, 359.87, 344.94, 334.53, 338.37, 324.63, 354.15, 344.29, 376.47, 355.59, 339.98, 346.82, 402.96, 390.24, 359.93, 340.36, 349.39, 343.77, 352.21, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 341.57, 315.93, 318.81, 313.49, 354.91, 396.72, 422.65, 405.45, 425.44, 416.79, 417.76, 419.88] },
      velocityScore: { '1D': -7.1, '1W': -8.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.0T', pe: 81.5, revenueGrowth: 30, eps: 5.15, grossMargin: 77, dividendYield: 0.62,
      etfPresence: { AIS: 0.75, ARTY: 3.81, BAI: 5.18, IVEP: false, IGPT: false, IVES: 4.78, ALAI: false, CHAT: 3.24 },
      tonyNote: 'Broadcom Inc appears in 5 of 7 AI & ML ETFs (71% coverage) with average weight 3.0% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 3, proScore: 2.98, coverage: 0.429,
      price: 121.56, weeklyPrices: [117.91, 119.13, 119.74, 120.71, 121.56], weeklyChange: 2.59, sortRank: 0, periodReturns: { '1M': 43.8, '6M': 199.7, '1Y': 496.8 },
      priceHistory: { '1W': [118.5, 119.84, 123.52, 121.77, 121.56], '1M': [84.52, 94.75, 94.48, 99.62, 95.78, 108.15, 113.01, 109.62, 124.92, 129.44, 120.29, 115.93, 108.77, 108.17, 110.8, 118.96, 118.5, 119.84, 123.52, 121.77, 121.56], '6M': [40.56, 41.41, 37.81, 36.82, 36.68, 40.04, 47.29, 48.56, 43.93, 49.25, 47.13, 45.46, 46.88, 45.58, 47.98, 45.03, 47.18, 48.03, 61.72, 64.94, 65.27, 94.75, 113.01, 120.29, 118.96, 121.56], '1Y': [20.37, 20.25, 20.68, 21.49, 22.5, 22.49, 23.43, 22.8, 22.63, 19.8, 19.77, 23.86, 23.5, 24.93, 24.49, 24.08, 29.58, 35.5, 36.83, 36.37, 36.84, 38.16, 40.16, 37.24, 35.91, 33.62, 40.56, 41.41, 37.81, 36.82, 36.68, 40.04, 44.06, 48.56, 43.93, 49.25, 47.13, 45.46, 46.88, 45.58, 47.98, 45.03, 47.18, 48.03, 61.72, 64.94, 65.27, 94.75, 113.01, 120.29, 118.96, 121.56] },
      velocityScore: { '1D': 4.6, '1W': 2.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$611B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.39, ARTY: false, BAI: 3.01, IVEP: false, IGPT: 7.27, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'Intel Corp appears in 3 of 7 AI & ML ETFs (43% coverage) with average weight 3.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 3, proScore: 2.63, coverage: 0.429,
      price: 419.4, weeklyPrices: [406.82, 411.01, 413.11, 416.46, 419.40], weeklyChange: 3.01, sortRank: 0, periodReturns: { '1M': 6.9, '6M': 43.9, '1Y': 113.8 },
      priceHistory: { '1W': [407.15, 404.52, 412.32, 422.73, 419.4], '1M': [392.34, 393.83, 396.06, 397.67, 401.61, 394.41, 419.5, 414.15, 411.68, 404.54, 399.8, 417.72, 404.35, 395.95, 392.61, 401.62, 407.15, 404.52, 412.32, 422.73, 419.4], '6M': [291.51, 294.72, 292.04, 288.95, 300.92, 327.43, 331.21, 327.16, 338.34, 335.75, 361.91, 362.26, 387.73, 357.44, 354.56, 339.57, 347.75, 341.49, 365.49, 375.1, 387.44, 393.83, 419.5, 399.8, 401.62, 419.4], '1Y': [196.14, 202.4, 214.1, 213.5, 224.01, 234.8, 230.4, 245.6, 241.6, 241.62, 242.62, 241, 227.33, 238.27, 243.41, 259.33, 264.87, 273.36, 292.19, 280.66, 299.84, 290.73, 303.22, 289.24, 282.2, 277.5, 291.51, 294.72, 292.04, 288.95, 300.92, 327.43, 331.77, 327.16, 338.34, 335.75, 361.91, 362.26, 387.73, 357.44, 354.56, 339.57, 347.75, 341.49, 365.49, 375.1, 387.44, 393.83, 419.5, 399.8, 401.62, 419.4] },
      velocityScore: { '1D': -13.2, '1W': -14.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.2T', pe: 35.8, revenueGrowth: 35, eps: 11.71, grossMargin: 62, dividendYield: 0.9,
      etfPresence: { AIS: 3.21, ARTY: false, BAI: 4.25, IVEP: false, IGPT: false, IVES: 4.59, ALAI: false, CHAT: false },
      tonyNote: 'Taiwan Semiconductor Manufacturing Co Ltd appears in 3 of 7 AI & ML ETFs (43% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 3, proScore: 2.48, coverage: 0.429,
      price: 633.29, weeklyPrices: [614.29, 620.62, 623.79, 628.86, 633.29], weeklyChange: 4.27, sortRank: 0, periodReturns: { '1M': -5.7, '6M': -2.3, '1Y': -1.6 },
      priceHistory: { '1W': [607.38, 610.26, 612.34, 635.26, 633.29], '1M': [671.34, 669.12, 611.91, 608.75, 610.41, 604.96, 612.88, 616.81, 609.63, 598.86, 616.63, 618.43, 614.23, 611.21, 602.61, 605.06, 607.38, 610.26, 612.34, 635.26, 633.29], '6M': [647.95, 673.42, 644.23, 658.77, 658.69, 660.62, 631.09, 604.12, 672.97, 691.7, 670.72, 643.22, 653.69, 667.73, 654.86, 615.68, 594.89, 579.23, 628.39, 671.58, 674.72, 669.12, 612.88, 616.63, 605.06, 633.29], '1Y': [643.58, 687.95, 694.14, 695.77, 726.09, 719.01, 717.51, 701.41, 714.8, 773.44, 761.83, 782.13, 739.1, 751.11, 752.45, 755.59, 778.38, 743.75, 710.56, 705.3, 712.07, 734, 666.47, 618.94, 609.89, 589.15, 647.95, 673.42, 644.23, 658.77, 658.69, 660.62, 641.97, 604.12, 672.97, 691.7, 670.72, 643.22, 653.69, 667.73, 654.86, 615.68, 594.89, 579.23, 628.39, 671.58, 674.72, 669.12, 612.88, 616.63, 605.06, 633.29] },
      velocityScore: { '1D': -7.1, '1W': -9.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: 23, revenueGrowth: 33, eps: 27.51, grossMargin: 82, dividendYield: 0.33,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: 5.02, IVES: 3.77, ALAI: false, CHAT: 2.56 },
      tonyNote: 'Meta Platforms Inc appears in 3 of 7 AI & ML ETFs (43% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 3, proScore: 2.42, coverage: 0.429,
      price: 200.04, weeklyPrices: [194.04, 196.04, 197.04, 198.64, 200.04], weeklyChange: 4.9, sortRank: 0, periodReturns: { '1M': 30.5, '6M': 123.8, '1Y': 209.7 },
      priceHistory: { '1W': [190.69, 196.33, 208.26, 198.7, 200.04], '1M': [153.23, 156.57, 165.15, 164.95, 163.66, 168.75, 172.15, 160.01, 170.13, 170.84, 177.95, 182.58, 176.89, 168.93, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 200.04], '6M': [89.4, 98.91, 84.43, 84.09, 85.76, 88.23, 83.05, 79.8, 82.93, 75.54, 82.01, 79.09, 80.92, 78.09, 90.44, 87.62, 98.45, 106.71, 119.93, 134.6, 157.32, 156.57, 172.15, 177.95, 186.8, 200.04], '1Y': [64.59, 66.3, 68.24, 74.95, 79.97, 75.18, 72.71, 72.01, 74.04, 80.37, 75.85, 79.04, 71.21, 77.23, 63.33, 67.35, 74.26, 83.17, 86.22, 85.61, 88.23, 82.77, 88.57, 93.33, 87.52, 76.68, 89.4, 98.91, 84.43, 84.09, 85.76, 88.23, 82.89, 79.8, 82.93, 75.54, 82.01, 79.09, 80.92, 78.09, 90.44, 87.62, 98.45, 106.71, 119.93, 134.6, 157.32, 156.57, 172.15, 177.95, 186.8, 200.04] },
      velocityScore: { '1D': 1.7, '1W': 4.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$175B', pe: 64.9, revenueGrowth: 22, eps: 3.08, grossMargin: 51, dividendYield: 0.12,
      etfPresence: { AIS: 3.2, ARTY: 6.6, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.31 },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 3 of 7 AI & ML ETFs (43% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 3, proScore: 2.26, coverage: 0.429,
      price: 1031.1, weeklyPrices: [1000.17, 1010.48, 1015.63, 1023.88, 1031.10], weeklyChange: -1.22, sortRank: 0, periodReturns: { '1M': -5.3, '6M': 71.9, '1Y': 112.6 },
      priceHistory: { '1W': [1043.82, 1038.74, 1070.47, 1031.89, 1031.1], '1M': [1088.93, 1063.11, 1083.46, 1062.95, 1073.95, 1095.21, 1118.96, 1045.63, 1040.15, 1073.08, 1062.57, 1090.53, 1049.23, 1012.25, 1011.8, 1024.52, 1043.82, 1038.74, 1070.47, 1031.89, 1031.1], '6M': [599.77, 631.32, 671.71, 658.28, 663.46, 686.33, 652.09, 684.86, 692.7, 780.25, 790.79, 817.55, 876.01, 841.27, 847.65, 858.47, 923.69, 894.78, 968.02, 985.92, 1127.56, 1063.11, 1118.96, 1062.57, 1024.52, 1031.1], '1Y': [485.01, 488.13, 483.47, 490.19, 506.81, 517.04, 539.16, 570.17, 623.97, 660.29, 645.86, 625.27, 606, 633.69, 582.08, 625.55, 624.17, 605.17, 594.99, 604.56, 602, 595.15, 574.07, 550.17, 558.17, 558.03, 599.77, 631.32, 671.71, 658.28, 663.46, 686.33, 639.77, 684.86, 692.7, 780.25, 790.79, 817.55, 876.01, 841.27, 847.65, 858.47, 923.69, 894.78, 968.02, 985.92, 1127.56, 1063.11, 1118.96, 1062.57, 1024.52, 1031.1] },
      velocityScore: { '1D': 7.6, '1W': 7.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$277B', pe: 30.1, revenueGrowth: 16, eps: 34.26, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { AIS: 2.84, ARTY: false, BAI: false, IVEP: 4.01, IGPT: false, IVES: 3.51, ALAI: false, CHAT: false },
      tonyNote: 'GE Vernova Inc appears in 3 of 7 AI & ML ETFs (43% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 2, proScore: 2.24, coverage: 0.286,
      price: 270.24, weeklyPrices: [262.13, 264.84, 266.19, 268.35, 270.24], weeklyChange: 0.66, sortRank: 0, periodReturns: { '1M': 4.1, '6M': 15.9, '1Y': 32 },
      priceHistory: { '1W': [268.46, 266.32, 265.29, 271.85, 270.24], '1M': [259.7, 263.04, 265.06, 268.26, 272.05, 273.55, 274.99, 271.17, 272.68, 268.99, 270.13, 267.22, 264.14, 264.86, 259.34, 265.01, 268.46, 266.32, 265.29, 271.85, 270.24], '6M': [233.22, 229.53, 226.19, 227.35, 232.07, 240.93, 242.6, 231, 244.68, 238.62, 206.96, 204.79, 210.64, 216.82, 212.65, 209.87, 211.71, 210.57, 233.65, 248.5, 255.36, 263.04, 274.99, 270.13, 265.01, 270.24], '1Y': [204.72, 207.23, 213.2, 212.52, 217.12, 223.41, 225.02, 223.88, 232.23, 234.11, 223.13, 230.98, 221.95, 231.6, 232.33, 228.15, 231.48, 219.78, 219.51, 216.37, 214.47, 221.09, 222.86, 243.04, 237.58, 217.14, 233.22, 229.53, 226.19, 227.35, 232.07, 240.93, 246.47, 231, 244.68, 238.62, 206.96, 204.79, 210.64, 216.82, 212.65, 209.87, 211.71, 210.57, 233.65, 248.5, 255.36, 263.04, 274.99, 270.13, 265.01, 270.24] },
      velocityScore: { '1D': -23.8, '1W': -26.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 31.5, revenueGrowth: 17, eps: 8.59, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.84, ALAI: false, CHAT: 3.54 },
      tonyNote: 'AMAZON.COM INC appears in 2 of 7 AI & ML ETFs (29% coverage) with average weight 2.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, proScore: 2.03, coverage: 0.571,
      price: 316.2, weeklyPrices: [306.71, 309.88, 311.46, 313.99, 316.20], weeklyChange: -2.22, sortRank: 0, periodReturns: { '1M': 3.7, '6M': 75.9, '1Y': 189.5 },
      priceHistory: { '1W': [323.4, 327.46, 323.91, 319.78, 316.2], '1M': [305.03, 306.18, 328.49, 328.31, 330.97, 341.02, 358.92, 340.01, 339.97, 367.92, 369.99, 376.23, 370.94, 339.73, 322.63, 315.67, 323.4, 327.46, 323.91, 319.78, 316.2], '6M': [179.73, 189.02, 161.27, 159.82, 165.62, 174.95, 172.72, 175.18, 189.21, 190.15, 199.62, 243.21, 262.19, 251.28, 268.26, 264.71, 276.16, 259.37, 287.64, 301.16, 305.14, 306.18, 358.92, 369.99, 315.67, 316.2], '1Y': [109.22, 112.85, 110.59, 119.08, 123.8, 127.84, 123.3, 131.12, 130.87, 145.6, 139.39, 132.52, 126.58, 134.23, 124, 134.84, 143.6, 138.62, 160.2, 169.01, 177.82, 183.2, 193.76, 183.02, 163.64, 159.61, 179.73, 189.02, 161.27, 159.82, 165.62, 174.95, 170.03, 175.18, 189.21, 190.15, 199.62, 243.21, 262.19, 251.28, 268.26, 264.71, 276.16, 259.37, 287.64, 301.16, 305.14, 306.18, 358.92, 369.99, 315.67, 316.2] },
      velocityScore: { '1D': 6.3, '1W': 1.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$121B', pe: 79.6, revenueGrowth: 30, eps: 3.97, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.85, ARTY: false, BAI: 1.92, IVEP: 4.06, IGPT: false, IVES: false, ALAI: false, CHAT: 0.89 },
      tonyNote: 'Vertiv Holdings Co appears in 4 of 7 AI & ML ETFs (57% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 3, proScore: 1.97, coverage: 0.429,
      price: 884.15, weeklyPrices: [857.63, 866.47, 870.89, 877.96, 884.15], weeklyChange: 9.09, sortRank: 0, periodReturns: { '1M': 52.7, '6M': 219.5, '1Y': 653.5 },
      priceHistory: { '1W': [810.46, 812.73, 845.76, 870.66, 884.15], '1M': [579.03, 643.3, 673.64, 726.93, 738.54, 771.01, 786.42, 766.44, 782.64, 834.01, 817.35, 804.76, 795.47, 740.84, 733.35, 751.07, 810.46, 812.73, 845.76, 870.66, 884.15], '6M': [276.69, 278.79, 287.64, 296.36, 281.3, 330.42, 318.44, 325.99, 371.76, 444.45, 396.23, 424.14, 421.85, 375.01, 385.97, 406.77, 413.22, 423.12, 500.77, 519.6, 579.88, 643.3, 786.42, 817.35, 751.07, 884.15], '1Y': [117.34, 127.64, 126.49, 131.3, 140.69, 149.44, 147.18, 146.72, 152.73, 157.01, 148.1, 155.73, 154.6, 172.38, 188.16, 195.99, 221.23, 217.51, 252.79, 214.38, 226.03, 226.41, 268.34, 278.47, 262.56, 240.5, 276.69, 278.79, 287.64, 296.36, 281.3, 330.42, 321.48, 325.99, 371.76, 444.45, 396.23, 424.14, 421.85, 375.01, 385.97, 406.77, 413.22, 423.12, 500.77, 519.6, 579.88, 643.3, 786.42, 817.35, 751.07, 884.15] },
      velocityScore: { '1D': 3.1, '1W': 3.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$198B', pe: 84, revenueGrowth: 44, eps: 10.53, grossMargin: 42, dividendYield: 0.34,
      etfPresence: { AIS: 2.68, ARTY: 3.08, BAI: false, IVEP: false, IGPT: 3.26, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'Seagate Technology Holdings PLC appears in 3 of 7 AI & ML ETFs (43% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 3, proScore: 1.95, coverage: 0.429,
      price: 196.72, weeklyPrices: [190.82, 192.79, 193.77, 195.34, 196.72], weeklyChange: 3.66, sortRank: 0, periodReturns: { '1M': 18.5, '6M': -2.6, '1Y': 20.1 },
      priceHistory: { '1W': [189.77, 192.08, 193.06, 190.96, 196.72], '1M': [165.96, 163.83, 161.39, 171.83, 180.29, 185.35, 194.03, 194.59, 195.95, 193.84, 189.76, 195.61, 192.95, 186.61, 181.46, 188.16, 189.77, 192.08, 193.06, 190.96, 196.72], '6M': [201.95, 217.58, 189.97, 191.97, 195.38, 193.75, 202.29, 179.92, 174.9, 154.67, 159.89, 156.17, 147.89, 152.37, 163.12, 152.9, 146.02, 145.23, 137.86, 169.81, 187.5, 163.83, 194.03, 189.76, 188.16, 196.72], '1Y': [163.85, 168.1, 176.38, 210.87, 212.82, 237.32, 230.56, 248.75, 242.83, 253.77, 249.39, 244.96, 233.16, 240.32, 232.8, 292.18, 308.66, 283.46, 286.14, 292.96, 313, 280.07, 256.89, 243.8, 217.57, 210.69, 201.95, 217.58, 189.97, 191.97, 195.38, 193.75, 204.68, 179.92, 174.9, 154.67, 159.89, 156.17, 147.89, 152.37, 163.12, 152.9, 146.02, 145.23, 137.86, 169.81, 187.5, 163.83, 194.03, 189.76, 188.16, 196.72] },
      velocityScore: { '1D': 6, '1W': 3.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$566B', pe: 35.3, revenueGrowth: 22, eps: 5.58, grossMargin: 67, dividendYield: 1.05,
      etfPresence: { AIS: false, ARTY: 3.88, BAI: false, IVEP: false, IGPT: false, IVES: 3.55, ALAI: false, CHAT: 1.49 },
      tonyNote: 'ORACLE CORP appears in 3 of 7 AI & ML ETFs (43% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 3, proScore: 1.91, coverage: 0.429,
      price: 415.29, weeklyPrices: [402.83, 406.98, 409.06, 412.38, 415.29], weeklyChange: -0.91, sortRank: 0, periodReturns: { '1M': -3.3, '6M': -15.6, '1Y': -9.2 },
      priceHistory: { '1W': [419.09, 418.57, 416.03, 412.67, 415.29], '1M': [429.25, 424.46, 407.78, 414.44, 413.62, 411.38, 413.96, 420.77, 415.12, 412.66, 405.21, 409.43, 421.92, 423.54, 417.42, 421.06, 419.09, 418.57, 416.03, 412.67, 415.29], '6M': [492.01, 483.16, 478.53, 485.92, 487.1, 478.51, 470.67, 454.52, 480.58, 411.21, 413.27, 399.6, 400.6, 405.2, 404.88, 391.79, 371.04, 369.37, 373.07, 411.22, 432.92, 424.46, 413.96, 405.21, 421.06, 415.29], '1Y': [457.36, 463.87, 472.62, 480.24, 497.45, 498.84, 503.32, 511.7, 510.88, 533.5, 520.84, 522.48, 504.24, 509.64, 495, 509.9, 517.93, 511.46, 517.35, 510.96, 511.61, 520.56, 525.76, 497.1, 503.29, 478.43, 492.01, 483.16, 478.53, 485.92, 487.1, 478.51, 477.18, 454.52, 480.58, 411.21, 413.27, 399.6, 400.6, 405.2, 404.88, 391.79, 371.04, 369.37, 373.07, 411.22, 432.92, 424.46, 413.96, 405.21, 421.06, 415.29] },
      velocityScore: { '1D': -23.6, '1W': -26.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.1T', pe: 24.7, revenueGrowth: 18, eps: 16.8, grossMargin: 68, dividendYield: 0.88,
      etfPresence: { AIS: false, ARTY: 1.84, BAI: false, IVEP: false, IGPT: false, IVES: 3.91, ALAI: false, CHAT: 2.99 },
      tonyNote: 'MICROSOFT CORP appears in 3 of 7 AI & ML ETFs (43% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CLASS A CORP', easyScore: 2, proScore: 1.84, coverage: 0.286,
      price: 298.51, weeklyPrices: [289.55, 292.54, 294.03, 296.42, 298.51], weeklyChange: -3.04, sortRank: 0, periodReturns: { '1M': 31.9, '6M': 173.3, '1Y': 1423.8 },
      priceHistory: { '1W': [307.88, 302.49, 302.4, 293.8, 298.51], '1M': [226.37, 287.97, 283.36, 290.52, 288.64, 295.25, 285.47, 258.64, 261.03, 283.92, 289.76, 303.41, 275.95, 258.71, 261.34, 282.31, 307.88, 302.49, 302.4, 293.8, 298.51], '6M': [109.24, 119.18, 94.98, 88.82, 88.41, 103.05, 139.77, 151.75, 152.31, 168.89, 148.7, 157.27, 174.77, 164.78, 159.21, 156.58, 150.22, 132.45, 160.13, 213.84, 229.75, 287.97, 285.47, 289.76, 282.31, 298.51], '1Y': [19.59, 20.25, 22.53, 21.5, 22.33, 24.24, 25.4, 24.31, 33.06, 37.39, 36.8, 45.11, 44.83, 54.8, 57.07, 67.26, 84.93, 70.32, 90.29, 86.87, 115.09, 101.42, 127.85, 136.86, 103.55, 93.38, 109.24, 119.18, 94.98, 88.82, 88.41, 103.05, 136.87, 151.75, 152.31, 168.89, 148.7, 157.27, 174.77, 164.78, 159.21, 156.58, 150.22, 132.45, 160.13, 213.84, 229.75, 287.97, 285.47, 289.76, 282.31, 298.51] },
      velocityScore: { '1D': 5.1, '1W': 2.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$85B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 1.64, BAI: false, IVEP: 5.23, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'BLOOM ENERGY CLASS A CORP appears in 2 of 7 AI & ML ETFs (29% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AAPL', name: 'APPLE INC', easyScore: 1, proScore: 1.78, coverage: 0.143,
      price: 309.91, weeklyPrices: [300.61, 303.71, 305.26, 307.74, 309.91], weeklyChange: 1.61, sortRank: 0, periodReturns: { '1M': 14.5, '6M': 11.1, '1Y': 54.6 },
      priceHistory: { '1W': [304.99, 308.82, 308.33, 310.85, 309.91], '1M': [270.71, 270.17, 271.35, 280.14, 276.83, 284.18, 287.51, 287.44, 293.32, 292.68, 298.87, 298.21, 300.23, 297.84, 298.97, 302.25, 304.99, 308.82, 308.33, 310.85, 309.91], '6M': [278.85, 278.78, 278.28, 273.67, 273.76, 262.36, 261.05, 246.7, 258.27, 269.48, 273.68, 264.35, 274.23, 262.52, 260.81, 249.94, 252.62, 255.63, 260.49, 266.43, 273.17, 270.17, 287.51, 298.87, 302.25, 309.91], '1Y': [200.42, 202.82, 198.78, 196.58, 201, 213.55, 211.16, 210.02, 213.76, 207.57, 220.03, 232.78, 224.9, 232.56, 239.69, 234.07, 245.5, 255.46, 258.02, 245.27, 247.45, 259.58, 271.4, 269.77, 272.95, 266.25, 278.85, 278.78, 278.28, 273.67, 273.76, 262.36, 260.25, 246.7, 258.27, 269.48, 273.68, 264.35, 274.23, 262.52, 260.81, 249.94, 252.62, 255.63, 260.49, 266.43, 273.17, 270.17, 287.51, 298.87, 302.25, 309.91] },
      velocityScore: { '1D': -9.2, '1W': -10.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.6T', pe: 37.5, revenueGrowth: 17, eps: 8.27, grossMargin: 48, dividendYield: 0.35,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.7, ALAI: false, CHAT: false },
      tonyNote: 'APPLE INC appears in 1 of 7 AI & ML ETFs (14% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRWV', name: 'COREWEAVE INC CLASS A', easyScore: 4, proScore: 1.71, coverage: 0.571,
      price: 104.42, weeklyPrices: [101.29, 102.33, 102.85, 103.69, 104.42], weeklyChange: -2.93, sortRank: 0, periodReturns: { '1M': -1, '6M': 42.8, '1Y': -10.1 },
      priceHistory: { '1W': [107.58, 105.49, 105.89, 104.27, 104.42], '1M': [105.53, 114.19, 111.6, 119.01, 125.43, 127.89, 137.98, 128.84, 114.15, 114.7, 111.31, 114.21, 107.3, 103.77, 99.81, 101.28, 107.58, 105.49, 105.89, 104.27, 104.42], '6M': [73.12, 88.3, 78.59, 83, 74.92, 77.94, 87.48, 95.22, 108.86, 90.06, 95.11, 95.45, 98.01, 79.5, 81.96, 82.82, 87.58, 78.44, 92, 118.69, 122.54, 114.19, 137.98, 111.31, 101.28, 104.42], '1Y': [116.15, 163.1, 149.7, 170, 158.08, 165.2, 125.84, 132.21, 120, 114.13, 121.08, 99.5, 90.79, 102.79, 89.09, 111.96, 124.86, 120.34, 134.79, 138.43, 141.74, 123.34, 131.06, 106.93, 78.34, 69.21, 73.12, 88.3, 78.59, 83, 74.92, 77.94, 89.93, 95.22, 108.86, 90.06, 95.11, 95.45, 98.01, 79.5, 81.96, 82.82, 87.58, 78.44, 92, 118.69, 122.54, 114.19, 137.98, 111.31, 101.28, 104.42] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$57B', pe: null, revenueGrowth: 112, eps: -2.72, grossMargin: 69, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 4.31, BAI: 1.23, IVEP: false, IGPT: false, IVES: 2.07, ALAI: false, CHAT: 1.43 },
      tonyNote: 'COREWEAVE INC CLASS A appears in 4 of 7 AI & ML ETFs (57% coverage) with average weight 1.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 1, proScore: 1.68, coverage: 0.143,
      price: 315.3, weeklyPrices: [305.84, 308.99, 310.57, 313.09, 315.30], weeklyChange: 4.32, sortRank: 0, periodReturns: { '1M': 25.5, '6M': 102.1, '1Y': 275.4 },
      priceHistory: { '1W': [302.24, 305.35, 322.68, 318.93, 315.3], '1M': [251.23, 248.75, 257.86, 256.72, 258.57, 275.8, 297.17, 286.52, 294.05, 296.05, 295.44, 299.15, 284.72, 277.96, 273.38, 292.09, 302.24, 305.35, 322.68, 318.93, 315.3], '6M': [156, 158.7, 160.52, 172.27, 175.87, 206.96, 214.38, 222.41, 238.46, 230.1, 226.61, 240.09, 249.48, 222.99, 218.87, 224.71, 233.45, 222.01, 258.76, 265.16, 265.55, 248.75, 297.17, 295.44, 292.09, 315.3], '1Y': [84, 84.77, 90.95, 92.24, 96.84, 98.81, 101.73, 100.79, 97.78, 94.84, 99.15, 107.38, 98.41, 104.09, 102.95, 116.96, 126.92, 128.33, 145.81, 131.37, 142.37, 147.54, 161.01, 162.19, 153.32, 139.59, 156, 158.7, 160.52, 172.27, 175.87, 206.96, 220.4, 222.41, 238.46, 230.1, 226.61, 240.09, 249.48, 222.99, 218.87, 224.71, 233.45, 222.01, 258.76, 265.16, 265.55, 248.75, 297.17, 295.44, 292.09, 315.3] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$394B', pe: 59.6, revenueGrowth: 24, eps: 5.29, grossMargin: 50, dividendYield: 0.33,
      etfPresence: { AIS: false, ARTY: false, BAI: 4.44, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'LAM RESEARCH CORP appears in 1 of 7 AI & ML ETFs (14% coverage) with average weight 1.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PWR', name: 'QUANTA SERVICES INC', easyScore: 1, proScore: 1.66, coverage: 0.143,
      price: 731.32, weeklyPrices: [709.38, 716.69, 720.35, 726.20, 731.32], weeklyChange: 2.01, sortRank: 0, periodReturns: { '1M': 15.9, '6M': 57.3, '1Y': 114.9 },
      priceHistory: { '1W': [716.91, 723.44, 742.18, 733.62, 731.32], '1M': [630.94, 628.6, 727.77, 742.21, 757.34, 771.61, 785.24, 750.73, 745, 781.38, 773.72, 780.08, 769.99, 723.03, 714.13, 709.93, 716.91, 723.44, 742.18, 733.62, 731.32], '6M': [464.88, 460.64, 438.11, 426.66, 431.03, 438.22, 444.2, 463.49, 479.27, 488.6, 510.64, 519.31, 562.77, 568.38, 567.71, 572, 573.5, 560.12, 582.06, 591.82, 613.78, 628.6, 785.24, 773.72, 709.93, 731.32], '1Y': [340.32, 359.11, 355.78, 360.43, 379.47, 386.51, 383.78, 397.9, 407.22, 406.13, 387.35, 377.51, 378.21, 385.96, 372.5, 382.53, 388.58, 405.44, 421.17, 417.61, 437.52, 427.36, 453.83, 442.9, 426.93, 429.78, 464.88, 460.64, 438.11, 426.66, 431.03, 438.22, 432.66, 463.49, 479.27, 488.6, 510.64, 519.31, 562.77, 568.38, 567.71, 572, 573.5, 560.12, 582.06, 591.82, 613.78, 628.6, 785.24, 773.72, 709.93, 731.32] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$110B', pe: 100.7, revenueGrowth: 26, eps: 7.26, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: 4.4, IGPT: false, IVES: false, ALAI: false, CHAT: false },
      tonyNote: 'QUANTA SERVICES INC appears in 1 of 7 AI & ML ETFs (14% coverage) with average weight 1.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, proScore: 6.63, coverage: 1,
      price: 927.93, weeklyPrices: [900.09, 909.37, 914.01, 921.43, 927.93], weeklyChange: 21.76, sortRank: 0, periodReturns: { '1M': 84, '6M': 292.4, '1Y': 864.8 },
      priceHistory: { '1W': [762.1, 751, 895.88, 928.41, 927.93], '1M': [504.29, 518.46, 517.16, 542.21, 576.45, 640.2, 666.59, 646.63, 746.81, 795.33, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 927.93], '6M': [236.48, 237.22, 241.14, 265.92, 294.37, 343.43, 338.13, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.73, 382.09, 367.85, 421.51, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 927.93], '1Y': [96.18, 103.25, 116.03, 121.82, 126, 122.29, 124.53, 113.26, 111.73, 109.14, 111.87, 125.29, 115.79, 122, 131.37, 157.23, 162.73, 157.27, 187.83, 181.6, 202.53, 206.71, 224.01, 238.33, 236.95, 201.37, 236.48, 237.22, 241.14, 265.92, 294.37, 343.43, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.73, 382.09, 367.85, 421.51, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 927.93] },
      velocityScore: { '1D': 2.8, '1W': 12.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.0T', pe: 43.8, revenueGrowth: 196, eps: 21.17, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { SOXX: 11.22, PSI: 7.02, XSD: 3.25, DRAM: 5.02 },
      tonyNote: 'MICRON TECHNOLOGY INC appears in 4 of 4 Semiconductors ETFs (100% coverage) with average weight 6.6% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, proScore: 5.79, coverage: 0.75,
      price: 504.15, weeklyPrices: [489.03, 494.07, 496.59, 500.62, 504.15], weeklyChange: 12.14, sortRank: 0, periodReturns: { '1M': 56, '6M': 131.8, '1Y': 346.7 },
      priceHistory: { '1W': [449.59, 467.51, 503.89, 495.54, 504.15], '1M': [323.21, 337.11, 354.49, 360.54, 341.54, 355.26, 421.39, 408.46, 455.19, 458.79, 445.5, 449.7, 424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 504.15], '6M': [217.53, 217.97, 210.78, 213.43, 215.61, 214.35, 220.97, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 204.83, 199.46, 220.27, 210.21, 236.64, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 504.15], '1Y': [112.86, 118.58, 121.14, 126.79, 143.68, 137.91, 146.42, 160.41, 162.12, 176.31, 172.4, 180.95, 163.71, 168.58, 151.14, 158.57, 157.39, 159.46, 164.67, 214.9, 234.56, 234.99, 254.84, 237.7, 247.96, 206.02, 217.53, 217.97, 210.78, 213.43, 215.61, 214.35, 207.69, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 204.83, 199.46, 220.27, 210.21, 236.64, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 504.15] },
      velocityScore: { '1D': -0.5, '1W': 2.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$822B', pe: 166.9, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 9.2, PSI: 7.32, XSD: 3.54, DRAM: false },
      tonyNote: 'ADVANCED MICRO DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 5.8% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MXL', name: 'MaxLinear Inc', easyScore: 2, proScore: 5.74, coverage: 0.5,
      price: 98.7, weeklyPrices: [95.74, 96.73, 97.22, 98.01, 98.70], weeklyChange: -0.97, sortRank: 0, periodReturns: { '1M': 89.8, '6M': 533.9, '1Y': 763.5 },
      priceHistory: { '1W': [99.67, 99.16, 96.12, 101.1, 98.7], '1M': [52.01, 67.52, 70.75, 77.18, 78.12, 81.68, 81.23, 82.37, 99.83, 102.27, 87.73, 88.78, 92.34, 87.46, 94.86, 96.77, 99.67, 99.16, 96.12, 101.1, 98.7], '6M': [15.57, 18.82, 17.41, 17.63, 17.58, 19.57, 18.34, 19.37, 18.84, 16.94, 18.86, 18.47, 18.64, 17.42, 16.9, 16.46, 17.8, 17.69, 19.84, 22.01, 33.89, 67.52, 81.23, 87.73, 96.77, 98.7], '1Y': [11.43, 12.21, 12.43, 13.11, 14.32, 14.79, 14.94, 15.59, 17.25, 15.82, 15.31, 15.54, 15.15, 16.76, 15.63, 15.75, 16.19, 16.09, 16.45, 14.33, 17.47, 17.52, 15.25, 14.82, 13.78, 13.05, 15.57, 18.82, 17.41, 17.63, 17.58, 19.57, 18.42, 19.37, 18.84, 16.94, 18.86, 18.47, 18.64, 17.42, 16.9, 16.46, 17.8, 17.69, 19.84, 22.01, 33.89, 67.52, 81.23, 87.73, 96.77, 98.7] },
      velocityScore: { '1D': 6.7, '1W': -3.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: 43, eps: -1.52, grossMargin: 57, dividendYield: null,
      etfPresence: { SOXX: false, PSI: 9.54, XSD: 6.68, DRAM: false },
      tonyNote: 'MaxLinear Inc appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 5.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 2, proScore: 3.67, coverage: 0.5,
      price: 121.56, weeklyPrices: [117.91, 119.13, 119.74, 120.71, 121.56], weeklyChange: 2.59, sortRank: 0, periodReturns: { '1M': 43.8, '6M': 199.7, '1Y': 496.8 },
      priceHistory: { '1W': [118.5, 119.84, 123.52, 121.77, 121.56], '1M': [84.52, 94.75, 94.48, 99.62, 95.78, 108.15, 113.01, 109.62, 124.92, 129.44, 120.29, 115.93, 108.77, 108.17, 110.8, 118.96, 118.5, 119.84, 123.52, 121.77, 121.56], '6M': [40.56, 41.41, 37.81, 36.82, 36.68, 40.04, 47.29, 48.56, 43.93, 49.25, 47.13, 45.46, 46.88, 45.58, 47.98, 45.03, 47.18, 48.03, 61.72, 64.94, 65.27, 94.75, 113.01, 120.29, 118.96, 121.56], '1Y': [20.37, 20.25, 20.68, 21.49, 22.5, 22.49, 23.43, 22.8, 22.63, 19.8, 19.77, 23.86, 23.5, 24.93, 24.49, 24.08, 29.58, 35.5, 36.83, 36.37, 36.84, 38.16, 40.16, 37.24, 35.91, 33.62, 40.56, 41.41, 37.81, 36.82, 36.68, 40.04, 44.06, 48.56, 43.93, 49.25, 47.13, 45.46, 46.88, 45.58, 47.98, 45.03, 47.18, 48.03, 61.72, 64.94, 65.27, 94.75, 113.01, 120.29, 118.96, 121.56] },
      velocityScore: { '1D': 0, '1W': -4.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$611B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.65, PSI: false, XSD: 3.72, DRAM: false },
      tonyNote: 'INTEL CORPORATION appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 3.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 3, proScore: 3.6, coverage: 0.75,
      price: 419.88, weeklyPrices: [407.28, 411.48, 413.58, 416.94, 419.88], weeklyChange: 1.28, sortRank: 0, periodReturns: { '1M': 5, '6M': 4.2, '1Y': 75.4 },
      priceHistory: { '1W': [414.57, 414.14, 422.01, 421.86, 419.88], '1M': [399.83, 405.45, 417.43, 421.28, 416.5, 427.36, 425.44, 412.56, 430, 428.43, 416.79, 439.79, 425.19, 420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 419.88], '6M': [402.96, 390.24, 359.93, 340.36, 349.39, 343.77, 354.61, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 341.57, 315.93, 318.81, 313.49, 354.91, 396.72, 422.65, 405.45, 425.44, 416.79, 417.76, 419.88], '1Y': [239.43, 261.08, 252.91, 251.26, 270.17, 275.18, 274.38, 286.45, 288.71, 293.7, 303.76, 311.23, 289.6, 308.65, 334.89, 359.87, 344.94, 334.53, 338.37, 324.63, 354.15, 344.29, 376.47, 355.59, 339.98, 346.82, 402.96, 390.24, 359.93, 340.36, 349.39, 343.77, 352.21, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 341.57, 315.93, 318.81, 313.49, 354.91, 396.72, 422.65, 405.45, 425.44, 416.79, 417.76, 419.88] },
      velocityScore: { '1D': 1.1, '1W': -4.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.0T', pe: 81.5, revenueGrowth: 30, eps: 5.15, grossMargin: 77, dividendYield: 0.62,
      etfPresence: { SOXX: 6.58, PSI: 4.09, XSD: 1.81, DRAM: false },
      tonyNote: 'BROADCOM INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.6% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, proScore: 3.28, coverage: 0.5,
      price: 200.04, weeklyPrices: [194.04, 196.04, 197.04, 198.64, 200.04], weeklyChange: 4.9, sortRank: 0, periodReturns: { '1M': 30.5, '6M': 123.8, '1Y': 209.7 },
      priceHistory: { '1W': [190.69, 196.33, 208.26, 198.7, 200.04], '1M': [153.23, 156.57, 165.15, 164.95, 163.66, 168.75, 172.15, 160.01, 170.13, 170.84, 177.95, 182.58, 176.89, 168.93, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 200.04], '6M': [89.4, 98.91, 84.43, 84.09, 85.76, 88.23, 83.05, 79.8, 82.93, 75.54, 82.01, 79.09, 80.92, 78.09, 90.44, 87.62, 98.45, 106.71, 119.93, 134.6, 157.32, 156.57, 172.15, 177.95, 186.8, 200.04], '1Y': [64.59, 66.3, 68.24, 74.95, 79.97, 75.18, 72.71, 72.01, 74.04, 80.37, 75.85, 79.04, 71.21, 77.23, 63.33, 67.35, 74.26, 83.17, 86.22, 85.61, 88.23, 82.77, 88.57, 93.33, 87.52, 76.68, 89.4, 98.91, 84.43, 84.09, 85.76, 88.23, 82.89, 79.8, 82.93, 75.54, 82.01, 79.09, 80.92, 78.09, 90.44, 87.62, 98.45, 106.71, 119.93, 134.6, 157.32, 156.57, 172.15, 177.95, 186.8, 200.04] },
      velocityScore: { '1D': -3.2, '1W': -3.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$175B', pe: 64.9, revenueGrowth: 22, eps: 3.08, grossMargin: 51, dividendYield: 0.12,
      etfPresence: { SOXX: 6.06, PSI: false, XSD: 3.22, DRAM: false },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 3.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, proScore: 3.21, coverage: 0.75,
      price: 212.94, weeklyPrices: [206.55, 208.68, 209.75, 211.45, 212.94], weeklyChange: -2.99, sortRank: 0, periodReturns: { '1M': -0.1, '6M': 20.3, '1Y': 58 },
      priceHistory: { '1W': [219.51, 215.33, 214.86, 212.6, 212.94], '1M': [213.17, 209.25, 199.57, 198.45, 198.48, 196.5, 207.83, 211.5, 215.2, 219.44, 225.83, 235.74, 225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 212.94], '6M': [177, 182.41, 175.02, 180.99, 188.22, 187.24, 185.81, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 186.03, 180.4, 178.68, 175.75, 183.91, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 212.94], '1Y': [134.81, 141.92, 142.83, 145.48, 155.02, 159.34, 164.92, 173, 173.74, 177.87, 180.77, 182.02, 174.98, 180.17, 167.02, 177.82, 176.67, 178.19, 187.62, 183.16, 181.81, 182.16, 202.89, 188.08, 186.86, 180.64, 177, 182.41, 175.02, 180.99, 188.22, 187.24, 184.94, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 186.03, 180.4, 178.68, 175.75, 183.91, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 212.94] },
      velocityScore: { '1D': 0, '1W': -8.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.2T', pe: 32.6, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { SOXX: 5.98, PSI: 3.48, XSD: 1.67, DRAM: false },
      tonyNote: 'NVIDIA CORP appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 3, proScore: 3.11, coverage: 0.75,
      price: 319.13, weeklyPrices: [309.56, 312.75, 314.34, 316.90, 319.13], weeklyChange: 6.95, sortRank: 0, periodReturns: { '1M': 20.4, '6M': 89.7, '1Y': 73.3 },
      priceHistory: { '1W': [298.39, 309.21, 324.89, 317.45, 319.13], '1M': [265, 269.22, 281.08, 281.02, 280.89, 281, 289.44, 285.24, 287.8, 297.76, 306.34, 308.17, 302.73, 300.6, 302.31, 304.88, 298.39, 309.21, 324.89, 317.45, 319.13], '6M': [168.27, 182.54, 179.42, 176.29, 175.69, 192.1, 188.53, 189.59, 196.63, 225.21, 220.92, 223.32, 213.9, 202.39, 198.67, 190.78, 196.77, 196.3, 214.98, 216.29, 236.31, 269.22, 289.44, 306.34, 304.88, 319.13], '1Y': [184.15, 190.72, 199.69, 198.35, 206.31, 216.02, 221.25, 216.59, 185.69, 181.06, 185.91, 193.71, 200.71, 204.09, 187.93, 182.6, 179.37, 184.55, 180.32, 171.7, 175.48, 172.19, 160.51, 161.38, 162.23, 153.33, 168.27, 182.54, 179.42, 176.29, 175.69, 192.1, 189.07, 189.59, 196.63, 225.21, 220.92, 223.32, 213.9, 202.39, 198.67, 190.78, 196.77, 196.3, 214.98, 216.29, 236.31, 269.22, 289.44, 306.34, 304.88, 319.13] },
      velocityScore: { '1D': -1, '1W': -1.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$290B', pe: 54.6, revenueGrowth: 19, eps: 5.84, grossMargin: 57, dividendYield: 1.79,
      etfPresence: { SOXX: 3.73, PSI: 4.7, XSD: 2.34, DRAM: false },
      tonyNote: 'TEXAS INSTRUMENT INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.1% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, proScore: 2.91, coverage: 0.5,
      price: 445.54, weeklyPrices: [432.17, 436.63, 438.86, 442.42, 445.54], weeklyChange: 4.25, sortRank: 0, periodReturns: { '1M': 16.9, '6M': 76.6, '1Y': 175.7 },
      priceHistory: { '1W': [427.36, 432.16, 454.89, 448.25, 445.54], '1M': [381.11, 382.59, 394.49, 389.08, 391.38, 410.82, 428.62, 410.64, 435.44, 443.62, 436.61, 440.56, 436.62, 413.57, 406.91, 426.85, 427.36, 432.16, 454.89, 448.25, 445.54], '6M': [252.25, 268, 259.21, 256.41, 263.05, 296.01, 304.87, 318.23, 332.71, 318.67, 329.07, 369.3, 394.95, 357.76, 351.07, 349.47, 369.34, 353.8, 397.81, 394.26, 403.48, 382.59, 428.62, 436.61, 426.85, 445.54], '1Y': [161.59, 161.93, 172.79, 172.84, 183.52, 191.05, 197.93, 192.52, 188.12, 180.06, 183.15, 188.24, 159.84, 165.27, 162.75, 167.8, 190.1, 203.92, 217.53, 209.95, 227.72, 228.47, 232.55, 233.53, 223.23, 220.23, 252.25, 268, 259.21, 256.41, 263.05, 296.01, 307.24, 318.23, 332.71, 318.67, 329.07, 369.3, 394.95, 357.76, 351.07, 349.47, 369.34, 353.8, 397.81, 394.26, 403.48, 382.59, 428.62, 436.61, 426.85, 445.54] },
      velocityScore: { '1D': -0.3, '1W': -1.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$354B', pe: 42, revenueGrowth: 11, eps: 10.62, grossMargin: 49, dividendYield: 0.47,
      etfPresence: { SOXX: 4.47, PSI: 3.75, XSD: false, DRAM: false },
      tonyNote: 'APPLIED MATERIAL INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, proScore: 2.66, coverage: 0.5,
      price: 315.3, weeklyPrices: [305.84, 308.99, 310.57, 313.09, 315.30], weeklyChange: 4.32, sortRank: 0, periodReturns: { '1M': 25.5, '6M': 102.1, '1Y': 275.4 },
      priceHistory: { '1W': [302.24, 305.35, 322.68, 318.93, 315.3], '1M': [251.23, 248.75, 257.86, 256.72, 258.57, 275.8, 297.17, 286.52, 294.05, 296.05, 295.44, 299.15, 284.72, 277.96, 273.38, 292.09, 302.24, 305.35, 322.68, 318.93, 315.3], '6M': [156, 158.7, 160.52, 172.27, 175.87, 206.96, 214.38, 222.41, 238.46, 230.1, 226.61, 240.09, 249.48, 222.99, 218.87, 224.71, 233.45, 222.01, 258.76, 265.16, 265.55, 248.75, 297.17, 295.44, 292.09, 315.3], '1Y': [84, 84.77, 90.95, 92.24, 96.84, 98.81, 101.73, 100.79, 97.78, 94.84, 99.15, 107.38, 98.41, 104.09, 102.95, 116.96, 126.92, 128.33, 145.81, 131.37, 142.37, 147.54, 161.01, 162.19, 153.32, 139.59, 156, 158.7, 160.52, 172.27, 175.87, 206.96, 220.4, 222.41, 238.46, 230.1, 226.61, 240.09, 249.48, 222.99, 218.87, 224.71, 233.45, 222.01, 258.76, 265.16, 265.55, 248.75, 297.17, 295.44, 292.09, 315.3] },
      velocityScore: { '1D': 0, '1W': -0.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$394B', pe: 59.6, revenueGrowth: 24, eps: 5.29, grossMargin: 50, dividendYield: 0.33,
      etfPresence: { SOXX: 3.4, PSI: 4.12, XSD: false, DRAM: false },
      tonyNote: 'LAM RESEARCH CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, proScore: 2.59, coverage: 0.5,
      price: 1936.3, weeklyPrices: [1878.21, 1897.57, 1907.26, 1922.75, 1936.30], weeklyChange: 5.11, sortRank: 0, periodReturns: { '1M': 7, '6M': 64.7, '1Y': 149 },
      priceHistory: { '1W': [1842.18, 1888.38, 2011.39, 1957.19, 1936.3], '1M': [1808.97, 1816.21, 1750.35, 1726.26, 1713.32, 1732.9, 1816.29, 1763.25, 1869.19, 1845.19, 1849.71, 1892.94, 1804.32, 1756.45, 1740.58, 1829.47, 1842.18, 1888.38, 2011.39, 1957.19, 1936.3], '6M': [1175.47, 1214.46, 1193.92, 1245.67, 1260.39, 1395, 1441.82, 1486.18, 1616.33, 1355.54, 1430.84, 1480.3, 1546.68, 1475.91, 1465, 1482.36, 1543.82, 1519.84, 1727.26, 1748.11, 1812.06, 1816.21, 1816.29, 1849.71, 1829.47, 1936.3], '1Y': [777.5, 782.09, 872, 871.16, 902.94, 924.58, 924.58, 937.08, 904.18, 879.03, 912.06, 955.41, 872.39, 894, 905.09, 964.02, 1044.81, 1064.29, 1101.55, 982.75, 1098.8, 1159, 1214.41, 1206.4, 1161.72, 1102.45, 1175.47, 1214.46, 1193.92, 1245.67, 1260.39, 1395, 1428.17, 1486.18, 1616.33, 1355.54, 1430.84, 1480.3, 1546.68, 1475.91, 1465, 1482.36, 1543.82, 1519.84, 1727.26, 1748.11, 1812.06, 1816.21, 1816.29, 1849.71, 1829.47, 1936.3] },
      velocityScore: { '1D': -1.5, '1W': -0.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$253B', pe: 55, revenueGrowth: 12, eps: 35.23, grossMargin: 61, dividendYield: 0.47,
      etfPresence: { SOXX: 3.2, PSI: 4.12, XSD: false, DRAM: false },
      tonyNote: 'KLA CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp/DE', easyScore: 1, proScore: 2.5, coverage: 0.25,
      price: 1597.58, weeklyPrices: [1549.65, 1565.63, 1573.62, 1586.40, 1597.58], weeklyChange: 3.59, sortRank: 0, periodReturns: { '1M': 59.4, '6M': 615.5, '1Y': 4041 },
      priceHistory: { '1W': [1542.24, 1478.69, 1589.55, 1589.94, 1597.58], '1M': [1002.35, 1064.21, 1096.51, 1187, 1255.86, 1406.32, 1409.98, 1339.96, 1562.34, 1547.56, 1447.23, 1382.72, 1407.61, 1333.01, 1383.29, 1392.56, 1542.24, 1478.69, 1589.55, 1589.94, 1597.58], '6M': [223.28, 228.47, 206.18, 237.61, 244.25, 349.63, 389.81, 453.12, 481.43, 695.51, 541.64, 600.4, 632.38, 599.06, 655.43, 753.69, 677.86, 692.73, 851.57, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1392.56, 1597.58], '1Y': [38.58, 39.82, 40.23, 46.62, 47.44, 46.41, 46.09, 41.52, 42.06, 42.92, 40.69, 46.68, 45.5, 50.87, 68.55, 86.13, 102.21, 97.12, 128.41, 116.91, 144.27, 167.05, 195.82, 207.69, 243.57, 195.96, 223.28, 228.47, 206.18, 237.61, 244.25, 349.63, 389.27, 453.12, 481.43, 695.51, 541.64, 600.4, 632.38, 599.06, 655.43, 753.69, 677.86, 692.73, 851.57, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1392.56, 1597.58] },
      velocityScore: { '1D': -3.8, '1W': -5.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$237B', pe: 54.6, revenueGrowth: 251, eps: 29.25, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 4.99 },
      tonyNote: 'Sandisk Corp/DE appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, proScore: 2.34, coverage: 0.5,
      price: 233.43, weeklyPrices: [226.43, 228.76, 229.93, 231.80, 233.43], weeklyChange: 9.38, sortRank: 0, periodReturns: { '1M': 55.6, '6M': 38.9, '1Y': 58.2 },
      priceHistory: { '1W': [213.41, 238.16, 248.82, 233.4, 233.43], '1M': [150, 156, 179.58, 177.01, 168.38, 186.55, 192.57, 202.55, 219.09, 237.53, 213.17, 200.08, 201.49, 203.64, 195.61, 202.51, 213.41, 238.16, 248.82, 233.4, 233.43], '6M': [168.09, 174.81, 178.29, 175.25, 173.43, 182.45, 165.29, 154.07, 153.04, 147.18, 140.09, 143.24, 145.82, 139.51, 134.12, 130.47, 130.35, 127.28, 127.75, 133.05, 136.07, 156, 192.57, 213.17, 202.51, 233.43], '1Y': [147.6, 149.05, 159.48, 153.63, 158.19, 162.21, 157.46, 152.61, 158.84, 146.76, 145.9, 158.09, 154.13, 160.8, 159.84, 161.83, 166.85, 169.2, 169.18, 153.59, 164.08, 170.03, 177.26, 173.2, 174.5, 159.59, 168.09, 174.81, 178.29, 175.25, 173.43, 182.45, 169.27, 154.07, 153.04, 147.18, 140.09, 143.24, 145.82, 139.51, 134.12, 130.47, 130.35, 127.28, 127.75, 133.05, 136.07, 156, 192.57, 213.17, 202.51, 233.43] },
      velocityScore: { '1D': -4.9, '1W': 1.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$246B', pe: 25.1, revenueGrowth: -4, eps: 9.29, grossMargin: 55, dividendYield: 1.58,
      etfPresence: { SOXX: 4.08, PSI: false, XSD: 2.54, DRAM: false },
      tonyNote: 'QUALCOMM INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, proScore: 2.16, coverage: 0.5,
      price: 340.57, weeklyPrices: [330.35, 333.76, 335.46, 338.19, 340.57], weeklyChange: 14.35, sortRank: 0, periodReturns: { '1M': 85.8, '6M': 116.1, '1Y': 253.1 },
      priceHistory: { '1W': [297.84, 306.88, 318.72, 325.33, 340.57], '1M': [183.31, 196.85, 194.74, 202.68, 201.25, 215.69, 213.91, 195.65, 199.79, 207.35, 224.09, 228.64, 232.68, 215.58, 244.26, 287.48, 297.84, 306.88, 318.72, 325.33, 340.57], '6M': [157.57, 161.23, 148.85, 164.4, 170.1, 161.01, 180.56, 183.75, 170.93, 158.52, 182.86, 129.58, 128.15, 113.77, 124.71, 126.34, 120.33, 106.33, 129.46, 172.09, 194.06, 196.85, 213.91, 224.09, 287.48, 340.57], '1Y': [96.46, 95.22, 94.54, 99.53, 97.96, 90.8, 95.9, 97.95, 121.68, 136.73, 170.89, 190.69, 177.53, 189.15, 191.2, 229.5, 245.2, 197.78, 200.74, 206.21, 163.55, 163.64, 169.55, 162.83, 144.47, 139.29, 157.57, 161.23, 148.85, 164.4, 170.1, 161.01, 172.57, 183.75, 170.93, 158.52, 182.86, 129.58, 128.15, 113.77, 124.71, 126.34, 120.33, 106.33, 129.46, 172.09, 194.06, 196.85, 213.91, 224.09, 287.48, 340.57] },
      velocityScore: { '1D': 3.8, '1W': 1.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$58B', pe: 233.3, revenueGrowth: 93, eps: 1.46, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.28, PSI: false, XSD: 3.82, DRAM: false },
      tonyNote: 'ASTERA LABS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 1, proScore: 2.15, coverage: 0.25,
      price: 884.15, weeklyPrices: [857.63, 866.47, 870.89, 877.96, 884.15], weeklyChange: 9.09, sortRank: 0, periodReturns: { '1M': 52.7, '6M': 219.5, '1Y': 653.5 },
      priceHistory: { '1W': [810.46, 812.73, 845.76, 870.66, 884.15], '1M': [579.03, 643.3, 673.64, 726.93, 738.54, 771.01, 786.42, 766.44, 782.64, 834.01, 817.35, 804.76, 795.47, 740.84, 733.35, 751.07, 810.46, 812.73, 845.76, 870.66, 884.15], '6M': [276.69, 278.79, 287.64, 296.36, 281.3, 330.42, 318.44, 325.99, 371.76, 444.45, 396.23, 424.14, 421.85, 375.01, 385.97, 406.77, 413.22, 423.12, 500.77, 519.6, 579.88, 643.3, 786.42, 817.35, 751.07, 884.15], '1Y': [117.34, 127.64, 126.49, 131.3, 140.69, 149.44, 147.18, 146.72, 152.73, 157.01, 148.1, 155.73, 154.6, 172.38, 188.16, 195.99, 221.23, 217.51, 252.79, 214.38, 226.03, 226.41, 268.34, 278.47, 262.56, 240.5, 276.69, 278.79, 287.64, 296.36, 281.3, 330.42, 321.48, 325.99, 371.76, 444.45, 396.23, 424.14, 421.85, 375.01, 385.97, 406.77, 413.22, 423.12, 500.77, 519.6, 579.88, 643.3, 786.42, 817.35, 751.07, 884.15] },
      velocityScore: { '1D': -1.8, '1W': -6.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$198B', pe: 84, revenueGrowth: 44, eps: 10.53, grossMargin: 42, dividendYield: 0.34,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 4.31 },
      tonyNote: 'Seagate Technology Holdings PLC appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 2.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, proScore: 2.13, coverage: 0.5,
      price: 327.23, weeklyPrices: [317.41, 320.69, 322.32, 324.94, 327.23], weeklyChange: 9.3, sortRank: 0, periodReturns: { '1M': 42, '6M': 67.9, '1Y': 66.8 },
      priceHistory: { '1W': [299.38, 316.47, 332.67, 329.24, 327.23], '1M': [230.39, 289.25, 293.59, 295.24, 290.76, 292.35, 303.55, 290.22, 294.75, 305.99, 298.41, 294.17, 291.5, 291.68, 294.28, 310.15, 299.38, 316.47, 332.67, 329.24, 327.23], '6M': [194.94, 227.95, 228.16, 226.27, 220.46, 245.95, 239.09, 230.7, 229.42, 220.66, 236.62, 237.33, 235.07, 216.37, 199.87, 192.69, 197.61, 195.58, 205.67, 209.39, 225.75, 289.25, 303.55, 298.41, 310.15, 327.23], '1Y': [196.21, 210.02, 217.41, 211.45, 218.3, 232.1, 228.92, 224.5, 224.43, 213.77, 205.91, 231.54, 223.93, 239.07, 226.74, 218.82, 224.05, 226.04, 228.89, 205.37, 217.41, 220.73, 206.38, 206.45, 201.22, 184.19, 194.94, 227.95, 228.16, 226.27, 220.46, 245.95, 238.33, 230.7, 229.42, 220.66, 236.62, 237.33, 235.07, 216.37, 199.87, 192.69, 197.61, 195.58, 205.67, 209.39, 225.75, 289.25, 303.55, 298.41, 310.15, 327.23] },
      velocityScore: { '1D': 0.5, '1W': 2.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$83B', pe: 31.3, revenueGrowth: 12, eps: 10.47, grossMargin: 56, dividendYield: 1.23,
      etfPresence: { SOXX: 3.61, PSI: false, XSD: 2.41, DRAM: false },
      tonyNote: 'NXP SEMICONDUCTORS NV appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, proScore: 2.03, coverage: 0.5,
      price: 1605.77, weeklyPrices: [1557.60, 1573.65, 1581.68, 1594.53, 1605.77], weeklyChange: 2.85, sortRank: 0, periodReturns: { '1M': 6.8, '6M': 73, '1Y': 137 },
      priceHistory: { '1W': [1561.25, 1589.81, 1662.98, 1620.17, 1605.77], '1M': [1504.08, 1526.84, 1614.41, 1583.48, 1573.3, 1588.12, 1652.35, 1575.96, 1600.84, 1661.1, 1650.35, 1613.97, 1550.02, 1486.33, 1468.11, 1553.27, 1561.25, 1589.81, 1662.98, 1620.17, 1605.77], '6M': [928.17, 963.28, 946.51, 937.11, 930.04, 1005.38, 983.28, 1034.49, 1095.49, 1164.83, 1142.02, 1188.32, 1231.95, 1099.02, 1071.09, 1075.29, 1118.66, 1119.51, 1334.21, 1353, 1522.04, 1526.84, 1652.35, 1650.35, 1553.27, 1605.77], '1Y': [677.48, 694.75, 720.83, 693.24, 735.17, 758.64, 736.06, 713.57, 713, 711.24, 797.94, 848.81, 820.74, 858.46, 865.86, 834.14, 916.36, 887.55, 918.83, 904.44, 1026.83, 1070.8, 1087.56, 958.07, 924.29, 857.19, 928.17, 963.28, 946.51, 937.11, 930.04, 1005.38, 967.16, 1034.49, 1095.49, 1164.83, 1142.02, 1188.32, 1231.95, 1099.02, 1071.09, 1075.29, 1118.66, 1119.51, 1334.21, 1353, 1522.04, 1526.84, 1652.35, 1650.35, 1553.27, 1605.77] },
      velocityScore: { '1D': -1, '1W': -3.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$79B', pe: 115.3, revenueGrowth: 26, eps: 13.93, grossMargin: 55, dividendYield: 0.49,
      etfPresence: { SOXX: 3.53, PSI: false, XSD: 2.21, DRAM: false },
      tonyNote: 'MONOLITHIC POWER SYSTEMS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, proScore: 1.98, coverage: 0.5,
      price: 122.78, weeklyPrices: [119.10, 120.32, 120.94, 121.92, 122.78], weeklyChange: 12.01, sortRank: 0, periodReturns: { '1M': 31.6, '6M': 144.4, '1Y': 186.5 },
      priceHistory: { '1W': [109.61, 116.2, 127, 124.89, 122.78], '1M': [93.3, 98.86, 100.81, 103.03, 102.04, 102.67, 105.77, 100.61, 103.2, 107.24, 115.71, 118.37, 113.11, 109.43, 106.02, 110.21, 109.61, 116.2, 127, 124.89, 122.78], '6M': [50.24, 54.74, 54.96, 55.21, 54.02, 61.76, 59.41, 60.06, 62.63, 59.43, 67.38, 70.66, 69.68, 62.53, 59.24, 60.46, 63.1, 62.2, 68.49, 72.43, 88.99, 98.86, 105.77, 115.71, 110.21, 122.78], '1Y': [42.85, 50.28, 51.78, 52.26, 53.65, 56.6, 59.73, 59.41, 55.44, 56.36, 47.59, 51.62, 48.81, 50.78, 49.11, 48.26, 51.07, 50.16, 49.27, 45.74, 52.97, 51.78, 50.85, 48.8, 48.13, 44.9, 50.24, 54.74, 54.96, 55.21, 54.02, 61.76, 58.75, 60.06, 62.63, 59.43, 67.38, 70.66, 69.68, 62.53, 59.24, 60.46, 63.1, 62.2, 68.49, 72.43, 88.99, 98.86, 105.77, 115.71, 110.21, 122.78] },
      velocityScore: { '1D': 0, '1W': 5.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$48B', pe: 90.3, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.52, PSI: false, XSD: 3.08, DRAM: false },
      tonyNote: 'ON SEMICONDUCTOR CORP appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVTS', name: 'NAVITAS SEMICONDUCTOR CORP', easyScore: 1, proScore: 1.93, coverage: 0.25,
      price: 28.98, weeklyPrices: [28.11, 28.40, 28.55, 28.78, 28.98], weeklyChange: 18.86, sortRank: 0, periodReturns: { '1M': 91.7, '6M': 231.6, '1Y': 370.4 },
      priceHistory: { '1W': [24.38, 29.25, 31.79, 28.88, 28.98], '1M': [15.12, 15.48, 16.5, 17.45, 15.92, 17.55, 16.68, 15.79, 18.2, 22.65, 21.17, 22.32, 21.32, 19.67, 19.43, 22.99, 24.38, 29.25, 31.79, 28.88, 28.98], '6M': [8.74, 9.48, 8.59, 7.81, 7.21, 10.19, 9.45, 9.86, 9.56, 9.05, 8.79, 8.09, 9.88, 9.22, 10.84, 9.06, 9.48, 8.54, 9.42, 10.26, 18.47, 15.48, 16.68, 21.17, 22.99, 28.98], '1Y': [6.16, 6.78, 7.96, 7, 6.61, 6.44, 5.84, 6.27, 8.98, 7.33, 6.79, 7.25, 6.21, 6.04, 5.6, 6.17, 7.01, 6.43, 7.82, 8.23, 15.63, 13.61, 12.56, 8.84, 7.91, 7.55, 8.74, 9.48, 8.59, 7.81, 7.21, 10.19, 10.43, 9.86, 9.56, 9.05, 8.79, 8.09, 9.88, 9.22, 10.84, 9.06, 9.48, 8.54, 9.42, 10.26, 18.47, 15.48, 16.68, 21.17, 22.99, 28.98] },
      velocityScore: { '1D': -7.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: 3.87, DRAM: false },
      tonyNote: 'NAVITAS SEMICONDUCTOR CORP appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 1.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 1, proScore: 1.93, coverage: 0.25,
      price: 540.64, weeklyPrices: [524.42, 529.83, 532.53, 536.86, 540.64], weeklyChange: 11.14, sortRank: 0, periodReturns: { '1M': 38.3, '6M': 231, '1Y': 932.7 },
      priceHistory: { '1W': [486.46, 484.28, 524.65, 530.6, 540.64], '1M': [390.99, 412.76, 434.52, 431.52, 442.36, 465.26, 483.15, 463.91, 480, 515.83, 494.09, 489.15, 482.02, 458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 540.64], '6M': [163.33, 168.89, 176.34, 181.08, 179.68, 219.38, 214, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 268.81, 304.9, 296.14, 297.73, 337.88, 365, 389.1, 412.76, 483.15, 494.09, 459.62, 540.64], '1Y': [52.35, 54.43, 55.67, 59.19, 63.51, 66.08, 66.14, 67.02, 69.02, 78.69, 74.44, 76.24, 74.66, 82.04, 92.04, 97.66, 106.63, 106.88, 131.31, 115.42, 125.92, 125.72, 138.13, 163.6, 157.16, 140.23, 163.33, 168.89, 176.34, 181.08, 179.68, 219.38, 212.14, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 268.81, 304.9, 296.14, 297.73, 337.88, 365, 389.1, 412.76, 483.15, 494.09, 459.62, 540.64] },
      velocityScore: { '1D': -3, '1W': -3.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$186B', pe: 32.4, revenueGrowth: 46, eps: 16.71, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 3.86 },
      tonyNote: 'Western Digital Corp appears in 1 of 4 Semiconductors ETFs (25% coverage) with average weight 1.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'TSLA', name: 'TSLA', easyScore: 3, proScore: 5.24, coverage: 0.3,
      price: 437.63, weeklyPrices: [424.50, 428.88, 431.07, 434.57, 437.63], weeklyChange: 4.73, sortRank: 0, periodReturns: { '1M': 16.4, '6M': 1.7, '1Y': 22.6 },
      priceHistory: { '1W': [417.85, 426.01, 433.59, 440.36, 437.63], '1M': [376.02, 372.8, 381.63, 390.82, 392.51, 389.37, 398.73, 411.79, 428.35, 445, 445.27, 443.3, 422.24, 409.99, 404.11, 417.26, 417.85, 426.01, 433.59, 440.36, 437.63], '6M': [430.17, 455, 458.96, 481.2, 459.64, 432.96, 447.2, 419.25, 430.9, 421.96, 425.21, 411.32, 417.4, 405.94, 407.82, 392.78, 385.95, 381.26, 345.62, 391.95, 387.51, 372.8, 398.73, 445.27, 417.26, 437.63], '1Y': [356.9, 332.05, 326.43, 322.05, 325.78, 315.35, 313.51, 319.41, 305.3, 308.27, 322.27, 335.58, 320.11, 345.98, 350.84, 395.94, 426.07, 440.4, 429.83, 413.49, 428.75, 448.98, 440.1, 445.91, 401.99, 395.23, 430.17, 455, 458.96, 481.2, 459.64, 432.96, 448.96, 419.25, 430.9, 421.96, 425.21, 411.32, 417.4, 405.94, 407.82, 392.78, 385.95, 381.26, 345.62, 391.95, 387.51, 372.8, 398.73, 445.27, 417.26, 437.63] },
      velocityScore: { '1D': 0.4, '1W': -21, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: 397.8, revenueGrowth: 16, eps: 1.1, grossMargin: 19, dividendYield: null,
      etfPresence: { QQQ: 3.47, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: false, GTEK: false, ARKK: 10.92, MARS: false },
      tonyNote: 'TSLA appears in 3 of 10 Broad Tech ETFs (30% coverage) with average weight 5.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MSFT', easyScore: 4, proScore: 4.97, coverage: 0.4,
      price: 415.29, weeklyPrices: [402.83, 406.98, 409.06, 412.38, 415.29], weeklyChange: -0.91, sortRank: 0, periodReturns: { '1M': -3.3, '6M': -15.6, '1Y': -9.2 },
      priceHistory: { '1W': [419.09, 418.57, 416.03, 412.67, 415.29], '1M': [429.25, 424.46, 407.78, 414.44, 413.62, 411.38, 413.96, 420.77, 415.12, 412.66, 405.21, 409.43, 421.92, 423.54, 417.42, 421.06, 419.09, 418.57, 416.03, 412.67, 415.29], '6M': [492.01, 483.16, 478.53, 485.92, 487.1, 478.51, 470.67, 454.52, 480.58, 411.21, 413.27, 399.6, 400.6, 405.2, 404.88, 391.79, 371.04, 369.37, 373.07, 411.22, 432.92, 424.46, 413.96, 405.21, 421.06, 415.29], '1Y': [457.36, 463.87, 472.62, 480.24, 497.45, 498.84, 503.32, 511.7, 510.88, 533.5, 520.84, 522.48, 504.24, 509.64, 495, 509.9, 517.93, 511.46, 517.35, 510.96, 511.61, 520.56, 525.76, 497.1, 503.29, 478.43, 492.01, 483.16, 478.53, 485.92, 487.1, 478.51, 477.18, 454.52, 480.58, 411.21, 413.27, 399.6, 400.6, 405.2, 404.88, 391.79, 371.04, 369.37, 373.07, 411.22, 432.92, 424.46, 413.96, 405.21, 421.06, 415.29] },
      velocityScore: { '1D': 0, '1W': -14.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.1T', pe: 24.7, revenueGrowth: 18, eps: 16.8, grossMargin: 68, dividendYield: 0.88,
      etfPresence: { QQQ: 5.08, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: 8.02, FDTX: 4.06, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'MSFT appears in 4 of 10 Broad Tech ETFs (40% coverage) with average weight 5.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVDA', name: 'NVDA', easyScore: 5, proScore: 4.78, coverage: 0.5,
      price: 212.94, weeklyPrices: [206.55, 208.68, 209.75, 211.45, 212.94], weeklyChange: -2.99, sortRank: 0, periodReturns: { '1M': -0.1, '6M': 20.3, '1Y': 58 },
      priceHistory: { '1W': [219.51, 215.33, 214.86, 212.6, 212.94], '1M': [213.17, 209.25, 199.57, 198.45, 198.48, 196.5, 207.83, 211.5, 215.2, 219.44, 225.83, 235.74, 225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 212.94], '6M': [177, 182.41, 175.02, 180.99, 188.22, 187.24, 185.81, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 186.03, 180.4, 178.68, 175.75, 183.91, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 212.94], '1Y': [134.81, 141.92, 142.83, 145.48, 155.02, 159.34, 164.92, 173, 173.74, 177.87, 180.77, 182.02, 174.98, 180.17, 167.02, 177.82, 176.67, 178.19, 187.62, 183.16, 181.81, 182.16, 202.89, 188.08, 186.86, 180.64, 177, 182.41, 175.02, 180.99, 188.22, 187.24, 184.94, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 186.03, 180.4, 178.68, 175.75, 183.91, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 212.94] },
      velocityScore: { '1D': 0, '1W': -1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.2T', pe: 32.6, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { QQQ: 8.55, QQQA: false, PTF: 4.43, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 5.27, GTEK: false, ARKK: 1.23, MARS: false },
      tonyNote: 'NVDA appears in 5 of 10 Broad Tech ETFs (50% coverage) with average weight 4.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab Corp', easyScore: 1, proScore: 4.56, coverage: 0.1,
      price: 149.49, weeklyPrices: [145.01, 146.50, 147.25, 148.44, 149.49], weeklyChange: 19.16, sortRank: 0, periodReturns: { '1M': 90.2, '6M': 254.7, '1Y': 416.7 },
      priceHistory: { '1W': [125.45, 135.76, 143.2, 150.23, 149.49], '1M': [78.59, 77.02, 82.51, 78.81, 80.31, 78.76, 84.65, 78.58, 105.47, 117.35, 124.15, 132.55, 124.77, 131.16, 127.31, 134.28, 125.45, 135.76, 143.2, 150.23, 149.49], '6M': [42.14, 49.06, 61.49, 70.52, 70.12, 86.03, 86.58, 89.16, 87, 81.27, 72.03, 74.42, 70.2, 71.91, 71.96, 69.48, 72.88, 65.52, 66.74, 73.6, 90.04, 77.02, 84.65, 124.15, 134.28, 149.49], '1Y': [28.93, 26.91, 27.36, 27.85, 36.14, 35.66, 39.03, 51.33, 48.13, 45.92, 44.21, 42.81, 41.53, 47.91, 45.84, 53.34, 47.79, 46.26, 56.16, 64.26, 67, 63.57, 60.92, 49.61, 45.25, 39.48, 42.14, 49.06, 61.49, 70.52, 70.12, 86.03, 87.9, 89.16, 87, 81.27, 72.03, 74.42, 70.2, 71.91, 71.96, 69.48, 72.88, 65.52, 66.74, 73.6, 90.04, 77.02, 84.65, 124.15, 134.28, 149.49] },
      velocityScore: { '1D': 2.9, '1W': -14.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$87B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 14.43 },
      tonyNote: 'Rocket Lab Corp appears in 1 of 10 Broad Tech ETFs (10% coverage) with average weight 4.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AAPL', name: 'AAPL', easyScore: 4, proScore: 4.33, coverage: 0.4,
      price: 309.91, weeklyPrices: [300.61, 303.71, 305.26, 307.74, 309.91], weeklyChange: 1.61, sortRank: 0, periodReturns: { '1M': 14.5, '6M': 11.1, '1Y': 54.6 },
      priceHistory: { '1W': [304.99, 308.82, 308.33, 310.85, 309.91], '1M': [270.71, 270.17, 271.35, 280.14, 276.83, 284.18, 287.51, 287.44, 293.32, 292.68, 298.87, 298.21, 300.23, 297.84, 298.97, 302.25, 304.99, 308.82, 308.33, 310.85, 309.91], '6M': [278.85, 278.78, 278.28, 273.67, 273.76, 262.36, 261.05, 246.7, 258.27, 269.48, 273.68, 264.35, 274.23, 262.52, 260.81, 249.94, 252.62, 255.63, 260.49, 266.43, 273.17, 270.17, 287.51, 298.87, 302.25, 309.91], '1Y': [200.42, 202.82, 198.78, 196.58, 201, 213.55, 211.16, 210.02, 213.76, 207.57, 220.03, 232.78, 224.9, 232.56, 239.69, 234.07, 245.5, 255.46, 258.02, 245.27, 247.45, 259.58, 271.4, 269.77, 272.95, 266.25, 278.85, 278.78, 278.28, 273.67, 273.76, 262.36, 260.25, 246.7, 258.27, 269.48, 273.68, 264.35, 274.23, 262.52, 260.81, 249.94, 252.62, 255.63, 260.49, 266.43, 273.17, 270.17, 287.51, 298.87, 302.25, 309.91] },
      velocityScore: { '1D': 0.2, '1W': -1.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.6T', pe: 37.5, revenueGrowth: 17, eps: 8.27, grossMargin: 48, dividendYield: 0.35,
      etfPresence: { QQQ: 7.41, QQQA: false, PTF: 4.48, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 1.22, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'AAPL appears in 4 of 10 Broad Tech ETFs (40% coverage) with average weight 4.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'AMZN', easyScore: 4, proScore: 4.17, coverage: 0.4,
      price: 270.24, weeklyPrices: [262.13, 264.84, 266.19, 268.35, 270.24], weeklyChange: 0.66, sortRank: 0, periodReturns: { '1M': 4.1, '6M': 15.9, '1Y': 32 },
      priceHistory: { '1W': [268.46, 266.32, 265.29, 271.85, 270.24], '1M': [259.7, 263.04, 265.06, 268.26, 272.05, 273.55, 274.99, 271.17, 272.68, 268.99, 270.13, 267.22, 264.14, 264.86, 259.34, 265.01, 268.46, 266.32, 265.29, 271.85, 270.24], '6M': [233.22, 229.53, 226.19, 227.35, 232.07, 240.93, 242.6, 231, 244.68, 238.62, 206.96, 204.79, 210.64, 216.82, 212.65, 209.87, 211.71, 210.57, 233.65, 248.5, 255.36, 263.04, 274.99, 270.13, 265.01, 270.24], '1Y': [204.72, 207.23, 213.2, 212.52, 217.12, 223.41, 225.02, 223.88, 232.23, 234.11, 223.13, 230.98, 221.95, 231.6, 232.33, 228.15, 231.48, 219.78, 219.51, 216.37, 214.47, 221.09, 222.86, 243.04, 237.58, 217.14, 233.22, 229.53, 226.19, 227.35, 232.07, 240.93, 246.47, 231, 244.68, 238.62, 206.96, 204.79, 210.64, 216.82, 212.65, 209.87, 211.71, 210.57, 233.65, 248.5, 255.36, 263.04, 274.99, 270.13, 265.01, 270.24] },
      velocityScore: { '1D': 0.5, '1W': -11.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 31.5, revenueGrowth: 17, eps: 8.59, grossMargin: 51, dividendYield: null,
      etfPresence: { QQQ: 4.67, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 4.64, GTEK: false, ARKK: 2.77, MARS: false },
      tonyNote: 'AMZN appears in 4 of 10 Broad Tech ETFs (40% coverage) with average weight 4.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'GOOGL', easyScore: 3, proScore: 4.08, coverage: 0.3,
      price: 386.9, weeklyPrices: [375.29, 379.16, 381.10, 384.19, 386.90], weeklyChange: -0.2, sortRank: 0, periodReturns: { '1M': 10.6, '6M': 20.8, '1Y': 124.5 },
      priceHistory: { '1W': [387.66, 382.97, 388.88, 388.83, 386.9], '1M': [349.78, 349.94, 384.8, 385.69, 383.25, 388.43, 398.04, 397.99, 400.8, 388.64, 402.62, 401.07, 396.78, 396.94, 387.66, 388.91, 387.66, 382.97, 388.88, 388.83, 386.9], '6M': [320.18, 321.27, 309.29, 307.16, 313.56, 314.34, 335.97, 322, 334.55, 339.71, 318.58, 303.33, 312.9, 303.13, 308.7, 307.69, 290.93, 297.39, 318.49, 337.12, 339.32, 349.94, 398.04, 402.62, 388.91, 386.9], '1Y': [172.36, 168.05, 177.35, 173.32, 173.54, 179.53, 180.19, 183.58, 192.17, 191.9, 196.52, 202.94, 199.75, 211.64, 235, 240.8, 254.72, 246.54, 245.35, 236.57, 251.46, 253.08, 281.48, 284.75, 278.57, 289.45, 320.18, 321.27, 309.29, 307.16, 313.56, 314.34, 331.86, 322, 334.55, 339.71, 318.58, 303.33, 312.9, 303.13, 308.7, 307.69, 290.93, 297.39, 318.49, 337.12, 339.32, 349.94, 398.04, 402.62, 388.91, 386.9] },
      velocityScore: { '1D': 0.2, '1W': -18.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.7T', pe: 29.5, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.23,
      etfPresence: { QQQ: 3.64, QQQA: 4.43, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'GOOGL appears in 3 of 10 Broad Tech ETFs (30% coverage) with average weight 4.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'META', easyScore: 4, proScore: 3.34, coverage: 0.4,
      price: 633.29, weeklyPrices: [614.29, 620.62, 623.79, 628.86, 633.29], weeklyChange: 4.27, sortRank: 0, periodReturns: { '1M': -5.7, '6M': -2.3, '1Y': -1.6 },
      priceHistory: { '1W': [607.38, 610.26, 612.34, 635.26, 633.29], '1M': [671.34, 669.12, 611.91, 608.75, 610.41, 604.96, 612.88, 616.81, 609.63, 598.86, 616.63, 618.43, 614.23, 611.21, 602.61, 605.06, 607.38, 610.26, 612.34, 635.26, 633.29], '6M': [647.95, 673.42, 644.23, 658.77, 658.69, 660.62, 631.09, 604.12, 672.97, 691.7, 670.72, 643.22, 653.69, 667.73, 654.86, 615.68, 594.89, 579.23, 628.39, 671.58, 674.72, 669.12, 612.88, 616.63, 605.06, 633.29], '1Y': [643.58, 687.95, 694.14, 695.77, 726.09, 719.01, 717.51, 701.41, 714.8, 773.44, 761.83, 782.13, 739.1, 751.11, 752.45, 755.59, 778.38, 743.75, 710.56, 705.3, 712.07, 734, 666.47, 618.94, 609.89, 589.15, 647.95, 673.42, 644.23, 658.77, 658.69, 660.62, 641.97, 604.12, 672.97, 691.7, 670.72, 643.22, 653.69, 667.73, 654.86, 615.68, 594.89, 579.23, 628.39, 671.58, 674.72, 669.12, 612.88, 616.63, 605.06, 633.29] },
      velocityScore: { '1D': 0, '1W': -15.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: 23, revenueGrowth: 33, eps: 27.51, grossMargin: 82, dividendYield: 0.33,
      etfPresence: { QQQ: 2.94, QQQA: false, PTF: false, WCLD: false, MAGS: 14.29, IGV: false, FDTX: 3.31, GTEK: false, ARKK: 0.61, MARS: false },
      tonyNote: 'META appears in 4 of 10 Broad Tech ETFs (40% coverage) with average weight 3.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile Inc', easyScore: 1, proScore: 3.09, coverage: 0.1,
      price: 128.18, weeklyPrices: [124.33, 125.62, 126.26, 127.28, 128.18], weeklyChange: 33.2, sortRank: 0, periodReturns: { '1M': 78.3, '6M': 128.1, '1Y': 417.3 },
      priceHistory: { '1W': [96.23, 105.86, 119.7, 129.6, 128.18], '1M': [71.88, 69.85, 73.9, 70.89, 68.43, 63.87, 70.68, 65.35, 75.05, 82.55, 74.81, 83.01, 83.67, 86.83, 88.1, 89.58, 96.23, 105.86, 119.7, 129.6, 128.18], '6M': [56.2, 73.92, 76.7, 75.84, 71.47, 97.49, 92.72, 112.44, 111.34, 115.76, 96.27, 84.43, 82.36, 104.89, 88.21, 90.74, 96.06, 83.99, 91.61, 86.91, 84.66, 69.85, 70.68, 74.81, 89.58, 128.18], '1Y': [24.78, 28.69, 36.47, 44.35, 50.62, 45.6, 45.58, 57.45, 60.06, 53.17, 47.71, 48.5, 44.98, 48.95, 42.41, 38.72, 45.1, 49.09, 67.76, 82.03, 89.5, 71.72, 76.68, 65.28, 61.44, 50.7, 56.2, 73.92, 76.7, 75.84, 71.47, 97.49, 98.39, 112.44, 111.34, 115.76, 96.27, 84.43, 82.36, 104.89, 88.21, 90.74, 96.06, 83.99, 91.61, 86.91, 84.66, 69.85, 70.68, 74.81, 89.58, 128.18] },
      velocityScore: { '1D': 6.2, '1W': -5.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$50B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 9.78 },
      tonyNote: 'AST SpaceMobile Inc appears in 1 of 10 Broad Tech ETFs (10% coverage) with average weight 3.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 3, proScore: 3.05, coverage: 0.3,
      price: 200.04, weeklyPrices: [194.04, 196.04, 197.04, 198.64, 200.04], weeklyChange: 4.9, sortRank: 0, periodReturns: { '1M': 30.5, '6M': 123.8, '1Y': 209.7 },
      priceHistory: { '1W': [190.69, 196.33, 208.26, 198.7, 200.04], '1M': [153.23, 156.57, 165.15, 164.95, 163.66, 168.75, 172.15, 160.01, 170.13, 170.84, 177.95, 182.58, 176.89, 168.93, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 200.04], '6M': [89.4, 98.91, 84.43, 84.09, 85.76, 88.23, 83.05, 79.8, 82.93, 75.54, 82.01, 79.09, 80.92, 78.09, 90.44, 87.62, 98.45, 106.71, 119.93, 134.6, 157.32, 156.57, 172.15, 177.95, 186.8, 200.04], '1Y': [64.59, 66.3, 68.24, 74.95, 79.97, 75.18, 72.71, 72.01, 74.04, 80.37, 75.85, 79.04, 71.21, 77.23, 63.33, 67.35, 74.26, 83.17, 86.22, 85.61, 88.23, 82.77, 88.57, 93.33, 87.52, 76.68, 89.4, 98.91, 84.43, 84.09, 85.76, 88.23, 82.89, 79.8, 82.93, 75.54, 82.01, 79.09, 80.92, 78.09, 90.44, 87.62, 98.45, 106.71, 119.93, 134.6, 157.32, 156.57, 172.15, 177.95, 186.8, 200.04] },
      velocityScore: { '1D': -1, '1W': -14.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$175B', pe: 64.9, revenueGrowth: 22, eps: 3.08, grossMargin: 51, dividendYield: 0.12,
      etfPresence: { QQQ: false, QQQA: 5.59, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: 7.68, GTEK: 3.44, ARKK: false, MARS: false },
      tonyNote: 'MARVELL TECHNOLOGY INC appears in 3 of 10 Broad Tech ETFs (30% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'AMD', easyScore: 3, proScore: 2.98, coverage: 0.3,
      price: 504.15, weeklyPrices: [489.03, 494.07, 496.59, 500.62, 504.15], weeklyChange: 12.14, sortRank: 0, periodReturns: { '1M': 56, '6M': 131.8, '1Y': 346.7 },
      priceHistory: { '1W': [449.59, 467.51, 503.89, 495.54, 504.15], '1M': [323.21, 337.11, 354.49, 360.54, 341.54, 355.26, 421.39, 408.46, 455.19, 458.79, 445.5, 449.7, 424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 504.15], '6M': [217.53, 217.97, 210.78, 213.43, 215.61, 214.35, 220.97, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 204.83, 199.46, 220.27, 210.21, 236.64, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 504.15], '1Y': [112.86, 118.58, 121.14, 126.79, 143.68, 137.91, 146.42, 160.41, 162.12, 176.31, 172.4, 180.95, 163.71, 168.58, 151.14, 158.57, 157.39, 159.46, 164.67, 214.9, 234.56, 234.99, 254.84, 237.7, 247.96, 206.02, 217.53, 217.97, 210.78, 213.43, 215.61, 214.35, 207.69, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 204.83, 199.46, 220.27, 210.21, 236.64, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 504.15] },
      velocityScore: { '1D': -1, '1W': -8.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$822B', pe: 166.9, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { QQQ: 3.44, QQQA: 7.31, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: 5.57, MARS: false },
      tonyNote: 'AMD appears in 3 of 10 Broad Tech ETFs (30% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 3, proScore: 2.6, coverage: 0.3,
      price: 927.93, weeklyPrices: [900.09, 909.37, 914.01, 921.43, 927.93], weeklyChange: 21.76, sortRank: 0, periodReturns: { '1M': 84, '6M': 292.4, '1Y': 864.8 },
      priceHistory: { '1W': [762.1, 751, 895.88, 928.41, 927.93], '1M': [504.29, 518.46, 517.16, 542.21, 576.45, 640.2, 666.59, 646.63, 746.81, 795.33, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 927.93], '6M': [236.48, 237.22, 241.14, 265.92, 294.37, 343.43, 338.13, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.73, 382.09, 367.85, 421.51, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 927.93], '1Y': [96.18, 103.25, 116.03, 121.82, 126, 122.29, 124.53, 113.26, 111.73, 109.14, 111.87, 125.29, 115.79, 122, 131.37, 157.23, 162.73, 157.27, 187.83, 181.6, 202.53, 206.71, 224.01, 238.33, 236.95, 201.37, 236.48, 237.22, 241.14, 265.92, 294.37, 343.43, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.73, 382.09, 367.85, 421.51, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 927.93] },
      velocityScore: { '1D': 1.2, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.0T', pe: 43.8, revenueGrowth: 196, eps: 21.17, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { QQQ: 3.81, QQQA: false, PTF: 4.54, WCLD: false, MAGS: false, IGV: false, FDTX: 5.89, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'MU appears in 3 of 10 Broad Tech ETFs (30% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'APP', name: 'APPLOVIN CORP-CLASS A', easyScore: 2, proScore: 2.42, coverage: 0.2,
      price: 570.39, weeklyPrices: [553.28, 558.98, 561.83, 566.40, 570.39], weeklyChange: 17.39, sortRank: 0, periodReturns: { '1M': 27, '6M': -4.9, '1Y': 46.2 },
      priceHistory: { '1W': [485.89, 481.68, 514.24, 567.83, 570.39], '1M': [449.03, 443.43, 446.35, 460, 475, 478.11, 468.83, 498.87, 468.55, 478.42, 453.53, 485.16, 501, 492.38, 476.9, 482.28, 485.89, 481.68, 514.24, 567.83, 570.39], '6M': [599.48, 691.94, 670.67, 721.37, 698.82, 617.24, 668.63, 565.52, 543.56, 461.79, 472.92, 404.39, 421.63, 482.81, 461.45, 442.57, 436.69, 387.84, 379.14, 464.63, 483.71, 443.43, 468.83, 453.53, 482.28, 570.39], '1Y': [390.26, 416.52, 383.43, 344.37, 347.45, 341.64, 335.1, 363.78, 359.94, 390.7, 437.34, 433.34, 418.76, 483.75, 490.24, 582, 649.59, 669.86, 682.76, 569.89, 605.68, 589.7, 620.62, 621.36, 556.15, 520.82, 599.48, 691.94, 670.67, 721.37, 698.82, 617.24, 658.65, 565.52, 543.56, 461.79, 472.92, 404.39, 421.63, 482.81, 461.45, 442.57, 436.69, 387.84, 379.14, 464.63, 483.71, 443.43, 468.83, 453.53, 482.28, 570.39] },
      velocityScore: { '1D': 11.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$192B', pe: 49.5, revenueGrowth: 59, eps: 11.53, grossMargin: 88, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 5.24, PTF: false, WCLD: false, MAGS: false, IGV: 5.6, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'APPLOVIN CORP-CLASS A appears in 2 of 10 Broad Tech ETFs (20% coverage) with average weight 2.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'SEAGATE TECHNOLOGY HOLDINGS', easyScore: 3, proScore: 2.35, coverage: 0.3,
      price: 884.15, weeklyPrices: [857.63, 866.47, 870.89, 877.96, 884.15], weeklyChange: 9.09, sortRank: 0, periodReturns: { '1M': 52.7, '6M': 219.5, '1Y': 653.5 },
      priceHistory: { '1W': [810.46, 812.73, 845.76, 870.66, 884.15], '1M': [579.03, 643.3, 673.64, 726.93, 738.54, 771.01, 786.42, 766.44, 782.64, 834.01, 817.35, 804.76, 795.47, 740.84, 733.35, 751.07, 810.46, 812.73, 845.76, 870.66, 884.15], '6M': [276.69, 278.79, 287.64, 296.36, 281.3, 330.42, 318.44, 325.99, 371.76, 444.45, 396.23, 424.14, 421.85, 375.01, 385.97, 406.77, 413.22, 423.12, 500.77, 519.6, 579.88, 643.3, 786.42, 817.35, 751.07, 884.15], '1Y': [117.34, 127.64, 126.49, 131.3, 140.69, 149.44, 147.18, 146.72, 152.73, 157.01, 148.1, 155.73, 154.6, 172.38, 188.16, 195.99, 221.23, 217.51, 252.79, 214.38, 226.03, 226.41, 268.34, 278.47, 262.56, 240.5, 276.69, 278.79, 287.64, 296.36, 281.3, 330.42, 321.48, 325.99, 371.76, 444.45, 396.23, 424.14, 421.85, 375.01, 385.97, 406.77, 413.22, 423.12, 500.77, 519.6, 579.88, 643.3, 786.42, 817.35, 751.07, 884.15] },
      velocityScore: { '1D': 3.1, '1W': -13.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$198B', pe: 84, revenueGrowth: 44, eps: 10.53, grossMargin: 42, dividendYield: 0.34,
      etfPresence: { QQQ: false, QQQA: 6.26, PTF: 4.6, WCLD: false, MAGS: false, IGV: false, FDTX: 2.02, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'SEAGATE TECHNOLOGY HOLDINGS appears in 3 of 10 Broad Tech ETFs (30% coverage) with average weight 2.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ARM', name: 'ARM HOLDINGS PLC-ADR', easyScore: 1, proScore: 2.32, coverage: 0.1,
      price: 317.29, weeklyPrices: [307.77, 310.94, 312.53, 315.07, 317.29], weeklyChange: 6.39, sortRank: 0, periodReturns: { '1M': 59.7, '6M': 134.1, '1Y': 134.1 },
      priceHistory: { '1W': [298.23, 306.51, 321.22, 302.71, 317.29], '1M': [198.65, 201.69, 210.32, 211.18, 203.26, 208.84, 237.3, 213.31, 213.27, 212.65, 221.21, 228.5, 209.16, 215.12, 223.15, 256.73, 298.23, 306.51, 321.22, 302.71, 317.29], '6M': [135.56, 141.31, 130.89, 114.03, 110.51, 115.53, 107.84, 107.17, 114.88, 104.55, 125.95, 127.24, 131.74, 124.11, 120.1, 128.36, 157.07, 155.07, 149.79, 159.34, 196.57, 201.69, 237.3, 221.21, 256.73, 317.29], '1Y': [135.54, 130.36, 140.38, 146.05, 158.15, 155.09, 145.94, 157.18, 159.99, 141.38, 135.57, 140.55, 133.28, 142.55, 138.17, 150.64, 142.91, 139.62, 152.64, 154.81, 171.19, 166.6, 165.45, 158.25, 140.31, 132.53, 135.56, 141.31, 130.89, 114.03, 110.51, 115.53, 111.14, 107.17, 114.88, 104.55, 125.95, 127.24, 131.74, 124.11, 120.1, 128.36, 157.07, 155.07, 149.79, 159.34, 196.57, 201.69, 237.3, 221.21, 256.73, 317.29] },
      velocityScore: { '1D': -4.9, '1W': -19.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$338B', pe: 373.3, revenueGrowth: 20, eps: 0.85, grossMargin: 98, dividendYield: null,
      etfPresence: { QQQ: false, QQQA: 7.35, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ARM HOLDINGS PLC-ADR appears in 1 of 10 Broad Tech ETFs (10% coverage) with average weight 2.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'PLTR', easyScore: 4, proScore: 2.25, coverage: 0.4,
      price: 134.66, weeklyPrices: [130.62, 131.97, 132.64, 133.72, 134.66], weeklyChange: -2.01, sortRank: 0, periodReturns: { '1M': -4.6, '6M': -20.1, '1Y': 8.8 },
      priceHistory: { '1W': [137.41, 136.88, 136.6, 132.51, 134.66], '1M': [141.18, 137.97, 139.11, 144.07, 146.03, 135.91, 133.79, 137.05, 137.8, 136.89, 130.05, 133.73, 133.99, 135.14, 135.26, 137.15, 137.41, 136.88, 136.6, 132.51, 134.66], '6M': [168.45, 181.76, 183.57, 193.38, 184.18, 179.71, 178.96, 168.53, 165.7, 157.88, 139.51, 135.38, 134.19, 153.19, 151.6, 152.77, 154.96, 146.49, 130.49, 142.15, 152.62, 137.97, 133.79, 130.05, 137.15, 134.66], '1Y': [123.76, 130.01, 136.39, 139.96, 144.25, 134.36, 142.1, 153.99, 154.86, 158.35, 182.2, 181.02, 156.18, 158.12, 153.11, 171.43, 182.39, 177.57, 173.07, 175.44, 178.12, 180.48, 194.55, 175.05, 172.14, 155.74, 168.45, 181.76, 183.57, 193.38, 184.18, 179.71, 179.41, 168.53, 165.7, 157.88, 139.51, 135.38, 134.19, 153.19, 151.6, 152.77, 154.96, 146.49, 130.49, 142.15, 152.62, 137.97, 133.79, 130.05, 137.15, 134.66] },
      velocityScore: { '1D': -1.7, '1W': -22.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$323B', pe: 151.3, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { QQQ: 1.42, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 6.88, FDTX: 3.01, GTEK: false, ARKK: 2.9, MARS: false },
      tonyNote: 'PLTR appears in 4 of 10 Broad Tech ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'WESTERN DIGITAL CORP', easyScore: 3, proScore: 2.23, coverage: 0.3,
      price: 540.64, weeklyPrices: [524.42, 529.83, 532.53, 536.86, 540.64], weeklyChange: 11.14, sortRank: 0, periodReturns: { '1M': 38.3, '6M': 231, '1Y': 932.7 },
      priceHistory: { '1W': [486.46, 484.28, 524.65, 530.6, 540.64], '1M': [390.99, 412.76, 434.52, 431.52, 442.36, 465.26, 483.15, 463.91, 480, 515.83, 494.09, 489.15, 482.02, 458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 540.64], '6M': [163.33, 168.89, 176.34, 181.08, 179.68, 219.38, 214, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 268.81, 304.9, 296.14, 297.73, 337.88, 365, 389.1, 412.76, 483.15, 494.09, 459.62, 540.64], '1Y': [52.35, 54.43, 55.67, 59.19, 63.51, 66.08, 66.14, 67.02, 69.02, 78.69, 74.44, 76.24, 74.66, 82.04, 92.04, 97.66, 106.63, 106.88, 131.31, 115.42, 125.92, 125.72, 138.13, 163.6, 157.16, 140.23, 163.33, 168.89, 176.34, 181.08, 179.68, 219.38, 212.14, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 268.81, 304.9, 296.14, 297.73, 337.88, 365, 389.1, 412.76, 483.15, 494.09, 459.62, 540.64] },
      velocityScore: { '1D': 1.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$186B', pe: 32.4, revenueGrowth: 46, eps: 16.71, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { QQQ: false, QQQA: 5.58, PTF: 4.59, WCLD: false, MAGS: false, IGV: false, FDTX: 2.03, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'WESTERN DIGITAL CORP appears in 3 of 10 Broad Tech ETFs (30% coverage) with average weight 2.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 2, proScore: 2.22, coverage: 0.2,
      price: 196.72, weeklyPrices: [190.82, 192.79, 193.77, 195.34, 196.72], weeklyChange: 3.66, sortRank: 0, periodReturns: { '1M': 18.5, '6M': -2.6, '1Y': 20.1 },
      priceHistory: { '1W': [189.77, 192.08, 193.06, 190.96, 196.72], '1M': [165.96, 163.83, 161.39, 171.83, 180.29, 185.35, 194.03, 194.59, 195.95, 193.84, 189.76, 195.61, 192.95, 186.61, 181.46, 188.16, 189.77, 192.08, 193.06, 190.96, 196.72], '6M': [201.95, 217.58, 189.97, 191.97, 195.38, 193.75, 202.29, 179.92, 174.9, 154.67, 159.89, 156.17, 147.89, 152.37, 163.12, 152.9, 146.02, 145.23, 137.86, 169.81, 187.5, 163.83, 194.03, 189.76, 188.16, 196.72], '1Y': [163.85, 168.1, 176.38, 210.87, 212.82, 237.32, 230.56, 248.75, 242.83, 253.77, 249.39, 244.96, 233.16, 240.32, 232.8, 292.18, 308.66, 283.46, 286.14, 292.96, 313, 280.07, 256.89, 243.8, 217.57, 210.69, 201.95, 217.58, 189.97, 191.97, 195.38, 193.75, 204.68, 179.92, 174.9, 154.67, 159.89, 156.17, 147.89, 152.37, 163.12, 152.9, 146.02, 145.23, 137.86, 169.81, 187.5, 163.83, 194.03, 189.76, 188.16, 196.72] },
      velocityScore: { '1D': 0, '1W': -16.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$566B', pe: 35.3, revenueGrowth: 22, eps: 5.58, grossMargin: 67, dividendYield: 1.05,
      etfPresence: { QQQ: false, QQQA: false, PTF: false, WCLD: false, MAGS: false, IGV: 9.22, FDTX: 0.7, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'ORACLE CORP appears in 2 of 10 Broad Tech ETFs (20% coverage) with average weight 2.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'INTC', easyScore: 2, proScore: 2.18, coverage: 0.2,
      price: 121.56, weeklyPrices: [117.91, 119.13, 119.74, 120.71, 121.56], weeklyChange: 2.59, sortRank: 0, periodReturns: { '1M': 43.8, '6M': 199.7, '1Y': 496.8 },
      priceHistory: { '1W': [118.5, 119.84, 123.52, 121.77, 121.56], '1M': [84.52, 94.75, 94.48, 99.62, 95.78, 108.15, 113.01, 109.62, 124.92, 129.44, 120.29, 115.93, 108.77, 108.17, 110.8, 118.96, 118.5, 119.84, 123.52, 121.77, 121.56], '6M': [40.56, 41.41, 37.81, 36.82, 36.68, 40.04, 47.29, 48.56, 43.93, 49.25, 47.13, 45.46, 46.88, 45.58, 47.98, 45.03, 47.18, 48.03, 61.72, 64.94, 65.27, 94.75, 113.01, 120.29, 118.96, 121.56], '1Y': [20.37, 20.25, 20.68, 21.49, 22.5, 22.49, 23.43, 22.8, 22.63, 19.8, 19.77, 23.86, 23.5, 24.93, 24.49, 24.08, 29.58, 35.5, 36.83, 36.37, 36.84, 38.16, 40.16, 37.24, 35.91, 33.62, 40.56, 41.41, 37.81, 36.82, 36.68, 40.04, 44.06, 48.56, 43.93, 49.25, 47.13, 45.46, 46.88, 45.58, 47.98, 45.03, 47.18, 48.03, 61.72, 64.94, 65.27, 94.75, 113.01, 120.29, 118.96, 121.56] },
      velocityScore: { '1D': -0.5, '1W': -19.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$611B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { QQQ: 2.7, QQQA: 7.06, PTF: false, WCLD: false, MAGS: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'INTC appears in 2 of 10 Broad Tech ETFs (20% coverage) with average weight 2.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PANW', name: 'PANW', easyScore: 4, proScore: 2.13, coverage: 0.4,
      price: 249.21, weeklyPrices: [241.73, 244.23, 245.47, 247.47, 249.21], weeklyChange: -1.47, sortRank: 0, periodReturns: { '1M': 37.7, '6M': 31.1, '1Y': 32.7 },
      priceHistory: { '1W': [252.92, 260.58, 256.75, 248.47, 249.21], '1M': [180.99, 181.54, 179.32, 181.08, 184.56, 183.98, 183.68, 196.53, 207.88, 213.66, 227.79, 238.21, 242.83, 247.55, 240.13, 246.66, 252.92, 260.58, 256.75, 248.47, 249.21], '6M': [190.13, 198.84, 191.69, 186.88, 186.85, 185.86, 190.85, 184.06, 183.5, 166.24, 165.51, 152.35, 144.84, 158.56, 164.93, 168.91, 153.22, 160.67, 166.99, 164.11, 181.2, 181.54, 183.68, 227.79, 246.66, 249.21], '1Y': [187.8, 194.07, 194.39, 199.78, 202.34, 201.82, 187.39, 196.28, 201.16, 173.6, 168.1, 173.55, 183.32, 191.02, 194.46, 196.29, 208.19, 202.37, 207.19, 208.55, 205.51, 215.02, 218.27, 211.37, 204.77, 185.07, 190.13, 198.84, 191.69, 186.88, 186.85, 185.86, 188.88, 184.06, 183.5, 166.24, 165.51, 152.35, 144.84, 158.56, 164.93, 168.91, 153.22, 160.67, 166.99, 164.11, 181.2, 181.54, 183.68, 227.79, 246.66, 249.21] },
      velocityScore: { '1D': -1.4, '1W': -22.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$202B', pe: 139.2, revenueGrowth: 15, eps: 1.79, grossMargin: 74, dividendYield: null,
      etfPresence: { QQQ: 0.96, QQQA: false, PTF: false, WCLD: 2.43, MAGS: false, IGV: 7.31, FDTX: 2.76, GTEK: false, ARKK: false, MARS: false },
      tonyNote: 'PANW appears in 4 of 10 Broad Tech ETFs (40% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 2, proScore: 5.14, coverage: 0.5,
      price: 292.39, weeklyPrices: [283.62, 286.54, 288.00, 290.34, 292.39], weeklyChange: 7.99, sortRank: 0, periodReturns: { '1M': 14.4, '6M': 171.4, '1Y': 405.1 },
      priceHistory: { '1W': [270.75, 279.22, 291.97, 295.94, 292.39], '1M': [255.56, 253.49, 277.27, 275.33, 269.95, 294.69, 320.3, 305.93, 309.39, 322.05, 300.84, 296.98, 292.65, 266.8, 261.58, 271.05, 270.75, 279.22, 291.97, 295.94, 292.39], '6M': [107.74, 114.04, 112.36, 110.97, 111.96, 120, 133.04, 142.76, 147.43, 151.08, 190.09, 180.99, 183, 170.96, 171.73, 167.41, 194.85, 184.68, 230.81, 229.73, 242.77, 253.49, 320.3, 300.84, 271.05, 292.39], '1Y': [57.88, 59.14, 64.27, 59.64, 66.46, 72.55, 70.87, 78.84, 80.05, 79.03, 77.8, 85.17, 83.64, 90.42, 89.41, 95.89, 99.1, 96.99, 101.35, 100.35, 112.77, 113.88, 125.9, 125, 109.4, 98.12, 107.74, 114.04, 112.36, 110.97, 111.96, 120, 128.85, 142.76, 147.43, 151.08, 190.09, 180.99, 183, 170.96, 171.73, 167.41, 194.85, 184.68, 230.81, 229.73, 242.77, 253.49, 320.3, 300.84, 271.05, 292.39] },
      velocityScore: { '1D': 2.2, '1W': 2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 57.1, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { POW: 6.35, VOLT: 8.19, PBD: false, PBW: false },
      tonyNote: 'Powell Industries Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 5.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, proScore: 3.72, coverage: 0.5,
      price: 278.84, weeklyPrices: [270.47, 273.26, 274.66, 276.89, 278.84], weeklyChange: 7.08, sortRank: 0, periodReturns: { '1M': 11.6, '6M': 81, '1Y': 285 },
      priceHistory: { '1W': [260.4, 270.01, 276.25, 280.13, 278.84], '1M': [249.82, 258.26, 275.84, 283.6, 286.69, 297.17, 286.89, 290.46, 297.98, 302.73, 266.92, 268.73, 256.72, 258.28, 249.71, 254.75, 260.4, 270.01, 276.25, 280.13, 278.84], '6M': [154.03, 166, 173.12, 175.69, 174.34, 184, 193.82, 201.17, 210.66, 217.25, 237.19, 221.19, 234.67, 213.8, 200.88, 205.74, 220.77, 203.04, 235, 236.04, 262.68, 258.26, 286.89, 266.92, 254.75, 278.84], '1Y': [72.42, 73.71, 83.05, 89.16, 93.87, 100.1, 101.14, 101.32, 102.98, 130.04, 132.61, 132.13, 128.91, 136.29, 143.88, 141.73, 142.08, 142.84, 138.97, 137.73, 148.88, 154.9, 150.62, 160.16, 146.49, 134.36, 154.03, 166, 173.12, 175.69, 174.34, 184, 188, 201.17, 210.66, 217.25, 237.19, 221.19, 234.67, 213.8, 200.88, 205.74, 220.77, 203.04, 235, 236.04, 262.68, 258.26, 286.89, 266.92, 254.75, 278.84] },
      velocityScore: { '1D': 2.2, '1W': 2.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 67.2, revenueGrowth: 17, eps: 4.15, grossMargin: 39, dividendYield: 0.1,
      etfPresence: { POW: 3.14, VOLT: 7.38, PBD: false, PBW: false },
      tonyNote: 'Bel Fuse Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 3.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 2, proScore: 3.66, coverage: 0.5,
      price: 731.32, weeklyPrices: [709.38, 716.69, 720.35, 726.20, 731.32], weeklyChange: 2.01, sortRank: 0, periodReturns: { '1M': 15.9, '6M': 57.3, '1Y': 114.9 },
      priceHistory: { '1W': [716.91, 723.44, 742.18, 733.62, 731.32], '1M': [630.94, 628.6, 727.77, 742.21, 757.34, 771.61, 785.24, 750.73, 745, 781.38, 773.72, 780.08, 769.99, 723.03, 714.13, 709.93, 716.91, 723.44, 742.18, 733.62, 731.32], '6M': [464.88, 460.64, 438.11, 426.66, 431.03, 438.22, 444.2, 463.49, 479.27, 488.6, 510.64, 519.31, 562.77, 568.38, 567.71, 572, 573.5, 560.12, 582.06, 591.82, 613.78, 628.6, 785.24, 773.72, 709.93, 731.32], '1Y': [340.32, 359.11, 355.78, 360.43, 379.47, 386.51, 383.78, 397.9, 407.22, 406.13, 387.35, 377.51, 378.21, 385.96, 372.5, 382.53, 388.58, 405.44, 421.17, 417.61, 437.52, 427.36, 453.83, 442.9, 426.93, 429.78, 464.88, 460.64, 438.11, 426.66, 431.03, 438.22, 432.66, 463.49, 479.27, 488.6, 510.64, 519.31, 562.77, 568.38, 567.71, 572, 573.5, 560.12, 582.06, 591.82, 613.78, 628.6, 785.24, 773.72, 709.93, 731.32] },
      velocityScore: { '1D': -0.3, '1W': -0.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$110B', pe: 100.7, revenueGrowth: 26, eps: 7.26, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.72, VOLT: 5.63, PBD: false, PBW: false },
      tonyNote: 'Quanta Services Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 3.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 2, proScore: 3.26, coverage: 0.5,
      price: 400, weeklyPrices: [388.00, 392.00, 394.00, 397.20, 400.00], weeklyChange: 4.85, sortRank: 0, periodReturns: { '1M': -3.2, '6M': 15.6, '1Y': 22.8 },
      priceHistory: { '1W': [381.51, 391.35, 403.13, 406.37, 400], '1M': [413.07, 410.77, 433.01, 425.55, 422.44, 410.86, 421.39, 399.15, 401.51, 419, 406.94, 408.1, 399.44, 381.87, 371.88, 379.69, 381.51, 391.35, 403.13, 406.37, 400], '6M': [345.89, 337.66, 331.98, 317.8, 321.45, 332.97, 332.38, 337.59, 341.19, 362.53, 377.47, 380.38, 373.53, 354.46, 355.79, 360.54, 375, 365.56, 400.44, 395.06, 413.87, 410.77, 421.39, 406.94, 379.69, 400], '1Y': [325.67, 327.08, 325.71, 334.86, 348.14, 362.22, 360.62, 380.72, 384.9, 384.72, 360.16, 355.1, 345.38, 355.34, 349.03, 365.9, 374.5, 365.58, 373.46, 369.08, 375.59, 372.4, 383.09, 377.4, 354.07, 328.19, 345.89, 337.66, 331.98, 317.8, 321.45, 332.97, 329.1, 337.59, 341.19, 362.53, 377.47, 380.38, 373.53, 354.46, 355.79, 360.54, 375, 365.56, 400.44, 395.06, 413.87, 410.77, 421.39, 406.94, 379.69, 400] },
      velocityScore: { '1D': 1.6, '1W': 1.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$155B', pe: 39.2, revenueGrowth: 17, eps: 10.2, grossMargin: 37, dividendYield: 1.08,
      etfPresence: { POW: 3.88, VOLT: 5.34, PBD: false, PBW: false },
      tonyNote: 'Eaton Corp PLC appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 3.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, proScore: 2.9, coverage: 0.25,
      price: 339.89, weeklyPrices: [329.69, 333.09, 334.79, 337.51, 339.89], weeklyChange: 26.69, sortRank: 0, periodReturns: { '1M': 36.7, '6M': 280.4, '1Y': 703.1 },
      priceHistory: { '1W': [268.29, 267.99, 332.95, 345.84, 339.89], '1M': [248.7, 256.7, 269.27, 268.36, 251.02, 266.01, 280.34, 261.34, 256.47, 312.96, 309.27, 290.54, 273.67, 249.02, 243.43, 264.2, 268.29, 267.99, 332.95, 345.84, 339.89], '6M': [89.35, 96.83, 97.8, 104.4, 112, 138.92, 138.61, 157.4, 164.03, 166.76, 157.43, 155.61, 197.16, 203.19, 178.83, 191.84, 186, 158.16, 184.92, 194.2, 265, 256.7, 280.34, 309.27, 264.2, 339.89], '1Y': [42.32, 44.19, 45.43, 45.47, 47.31, 46.27, 46.25, 48.39, 47.15, 44.44, 46.02, 47.25, 46.71, 52.13, 51.8, 50.77, 52.88, 48.67, 49.03, 48.56, 60.47, 92.98, 91.42, 89.02, 88.58, 83.28, 89.35, 96.83, 97.8, 104.4, 112, 138.92, 139.12, 157.4, 164.03, 166.76, 157.43, 155.61, 197.16, 203.19, 178.83, 191.84, 186, 158.16, 184.92, 194.2, 265, 256.7, 280.34, 309.27, 264.2, 339.89] },
      velocityScore: { '1D': 4.7, '1W': 25.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 114.4, revenueGrowth: 20, eps: 2.97, grossMargin: 54, dividendYield: null,
      etfPresence: { POW: 5.8, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Vicor Corp appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 2, proScore: 2.68, coverage: 0.5,
      price: 1031.1, weeklyPrices: [1000.17, 1010.48, 1015.63, 1023.88, 1031.10], weeklyChange: -1.22, sortRank: 0, periodReturns: { '1M': -5.3, '6M': 71.9, '1Y': 112.6 },
      priceHistory: { '1W': [1043.82, 1038.74, 1070.47, 1031.89, 1031.1], '1M': [1088.93, 1063.11, 1083.46, 1062.95, 1073.95, 1095.21, 1118.96, 1045.63, 1040.15, 1073.08, 1062.57, 1090.53, 1049.23, 1012.25, 1011.8, 1024.52, 1043.82, 1038.74, 1070.47, 1031.89, 1031.1], '6M': [599.77, 631.32, 671.71, 658.28, 663.46, 686.33, 652.09, 684.86, 692.7, 780.25, 790.79, 817.55, 876.01, 841.27, 847.65, 858.47, 923.69, 894.78, 968.02, 985.92, 1127.56, 1063.11, 1118.96, 1062.57, 1024.52, 1031.1], '1Y': [485.01, 488.13, 483.47, 490.19, 506.81, 517.04, 539.16, 570.17, 623.97, 660.29, 645.86, 625.27, 606, 633.69, 582.08, 625.55, 624.17, 605.17, 594.99, 604.56, 602, 595.15, 574.07, 550.17, 558.17, 558.03, 599.77, 631.32, 671.71, 658.28, 663.46, 686.33, 639.77, 684.86, 692.7, 780.25, 790.79, 817.55, 876.01, 841.27, 847.65, 858.47, 923.69, 894.78, 968.02, 985.92, 1127.56, 1063.11, 1118.96, 1062.57, 1024.52, 1031.1] },
      velocityScore: { '1D': -2.9, '1W': -2.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$277B', pe: 30.1, revenueGrowth: 16, eps: 34.26, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { POW: 3.38, VOLT: 4.21, PBD: false, PBW: false },
      tonyNote: 'GE Vernova Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 2, proScore: 2.41, coverage: 0.5,
      price: 165.87, weeklyPrices: [160.89, 162.55, 163.38, 164.71, 165.87], weeklyChange: 1.41, sortRank: 0, periodReturns: { '1M': 19.9, '6M': 54.6, '1Y': 150.7 },
      priceHistory: { '1W': [163.57, 164.66, 169.29, 167.8, 165.87], '1M': [138.3, 137.37, 142.9, 158.92, 162.69, 169.41, 172.49, 166.73, 169.95, 173.39, 172.91, 173.96, 169.01, 160.69, 158.23, 161.86, 163.57, 164.66, 169.29, 167.8, 165.87], '6M': [107.27, 107.72, 101.71, 101.54, 103.26, 110.09, 106.64, 109.9, 113.16, 119.43, 112.15, 115.65, 121.8, 113.83, 111.09, 120.27, 127.01, 121.26, 128.63, 131.38, 140.13, 137.37, 172.49, 172.91, 161.86, 165.87], '1Y': [66.16, 66.35, 68.6, 70.47, 73.13, 74.91, 74.87, 77.23, 77.09, 78.42, 89.1, 89.8, 88.02, 92.58, 92.8, 94.78, 98.99, 97, 97.8, 95.98, 100.54, 100.62, 104.35, 109.97, 105.92, 101.52, 107.27, 107.72, 101.71, 101.54, 103.26, 110.09, 106.39, 109.9, 113.16, 119.43, 112.15, 115.65, 121.8, 113.83, 111.09, 120.27, 127.01, 121.26, 128.63, 131.38, 140.13, 137.37, 172.49, 172.91, 161.86, 165.87] },
      velocityScore: { '1D': -0.4, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 56.4, revenueGrowth: 54, eps: 2.94, grossMargin: 37, dividendYield: 0.5,
      etfPresence: { POW: 3.71, VOLT: 3.11, PBD: false, PBW: false },
      tonyNote: 'nVent Electric PLC appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 3, proScore: 2.38, coverage: 0.75,
      price: 298.51, weeklyPrices: [289.55, 292.54, 294.03, 296.42, 298.51], weeklyChange: -3.04, sortRank: 0, periodReturns: { '1M': 31.9, '6M': 173.3, '1Y': 1423.8 },
      priceHistory: { '1W': [307.88, 302.49, 302.4, 293.8, 298.51], '1M': [226.37, 287.97, 283.36, 290.52, 288.64, 295.25, 285.47, 258.64, 261.03, 283.92, 289.76, 303.41, 275.95, 258.71, 261.34, 282.31, 307.88, 302.49, 302.4, 293.8, 298.51], '6M': [109.24, 119.18, 94.98, 88.82, 88.41, 103.05, 139.77, 151.75, 152.31, 168.89, 148.7, 157.27, 174.77, 164.78, 159.21, 156.58, 150.22, 132.45, 160.13, 213.84, 229.75, 287.97, 285.47, 289.76, 282.31, 298.51], '1Y': [19.59, 20.25, 22.53, 21.5, 22.33, 24.24, 25.4, 24.31, 33.06, 37.39, 36.8, 45.11, 44.83, 54.8, 57.07, 67.26, 84.93, 70.32, 90.29, 86.87, 115.09, 101.42, 127.85, 136.86, 103.55, 93.38, 109.24, 119.18, 94.98, 88.82, 88.41, 103.05, 136.87, 151.75, 152.31, 168.89, 148.7, 157.27, 174.77, 164.78, 159.21, 156.58, 150.22, 132.45, 160.13, 213.84, 229.75, 287.97, 285.47, 289.76, 282.31, 298.51] },
      velocityScore: { '1D': -2.5, '1W': -4.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$85B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: 4.52, PBD: 1.57, PBW: 2.14 },
      tonyNote: 'BLOOM ENERGY CORP appears in 3 of 4 Electrification ETFs (75% coverage) with average weight 2.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 2, proScore: 2.13, coverage: 0.5,
      price: 484.53, weeklyPrices: [469.99, 474.84, 477.26, 481.14, 484.53], weeklyChange: 5.11, sortRank: 0, periodReturns: { '1M': -11, '6M': 12.3, '1Y': 22.6 },
      priceHistory: { '1W': [460.98, 475.01, 478.05, 484.25, 484.53], '1M': [544.71, 545.93, 508.17, 508.43, 516, 507.81, 502.34, 493.04, 492.58, 490.16, 483.79, 482.03, 479.97, 470.87, 461.5, 463.32, 460.98, 475.01, 478.05, 484.25, 484.53], '6M': [431.43, 440.53, 448, 442.51, 451.39, 477.46, 481.68, 472.54, 484.14, 503.86, 503.1, 522.3, 527.9, 490.78, 477.97, 477.47, 503.2, 500.38, 534.67, 526.94, 549.75, 545.93, 502.34, 483.79, 463.32, 484.53], '1Y': [395.22, 390.72, 388.99, 398.73, 405.26, 414.84, 419.24, 437.23, 437.5, 437.48, 417.84, 437.67, 427.57, 445.8, 436.04, 437.43, 441.44, 425.22, 413, 408.46, 428.82, 433.27, 469.96, 461.47, 437.65, 407.36, 431.43, 440.53, 448, 442.51, 451.39, 477.46, 472.88, 472.54, 484.14, 503.86, 503.1, 522.3, 527.9, 490.78, 477.97, 477.47, 503.2, 500.38, 534.67, 526.94, 549.75, 545.93, 502.34, 483.79, 463.32, 484.53] },
      velocityScore: { '1D': 1.9, '1W': 0.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 28.7, revenueGrowth: 11, eps: 16.9, grossMargin: 36, dividendYield: 1.17,
      etfPresence: { POW: 2.74, VOLT: 3.28, PBD: false, PBW: false },
      tonyNote: 'Hubbell Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 2, proScore: 2.11, coverage: 0.5,
      price: 87.92, weeklyPrices: [85.28, 86.16, 86.60, 87.30, 87.92], weeklyChange: -1.97, sortRank: 0, periodReturns: { '1M': -8.9, '6M': 1.9, '1Y': 30.8 },
      priceHistory: { '1W': [89.69, 88.55, 87.65, 87.65, 87.92], '1M': [96.51, 94.17, 97.88, 96.95, 95.51, 96.28, 95.39, 93.32, 93.1, 94.84, 94.85, 95.68, 93.36, 89.04, 90.06, 88.27, 89.69, 88.55, 87.65, 87.65, 87.92], '6M': [86.29, 83.13, 81.65, 79.54, 80.27, 81.05, 81.64, 83.51, 87.15, 88.82, 90.83, 91.22, 95.11, 92.6, 91.66, 90.96, 91.16, 92.85, 94.48, 91.24, 90, 94.17, 95.39, 94.85, 88.27, 87.92], '1Y': [67.21, 69.88, 73, 71.57, 70.99, 73.88, 74.4, 75.18, 71.97, 71.06, 72.58, 72.24, 76.08, 72.09, 70.9, 71.64, 71.08, 75.85, 80.06, 83.35, 85.05, 83.25, 81.64, 82, 83.99, 84.3, 86.29, 83.13, 81.65, 79.54, 80.27, 81.05, 81.12, 83.51, 87.15, 88.82, 90.83, 91.22, 95.11, 92.6, 91.66, 90.96, 91.16, 92.85, 94.48, 91.24, 90, 94.17, 95.39, 94.85, 88.27, 87.92] },
      velocityScore: { '1D': 1, '1W': -15.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$183B', pe: 22.3, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.84,
      etfPresence: { POW: 1.93, VOLT: 4.03, PBD: false, PBW: false },
      tonyNote: 'NextEra Energy Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PRY', name: 'Prysmian SpA', easyScore: 1, proScore: 2.1, coverage: 0.25,
      price: 0, weeklyPrices: [0.00, 0.00, 0.00, 0.00, 0.00], weeklyChange: 0, sortRank: 0, periodReturns: { '1M': 0, '6M': 0, '1Y': 0 },
      priceHistory: undefined,
      velocityScore: { '1D': -1.9, '1W': -5, '1M': null, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { POW: 4.2, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Prysmian SpA appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 2.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, proScore: 1.95, coverage: 0.5,
      price: 129.47, weeklyPrices: [125.59, 126.88, 127.53, 128.56, 129.47], weeklyChange: -0.1, sortRank: 0, periodReturns: { '1M': -4.5, '6M': 4.6, '1Y': 27.3 },
      priceHistory: { '1W': [129.61, 131.59, 130.9, 129.57, 129.47], '1M': [135.59, 134.44, 137.11, 136.91, 134.66, 137.04, 132.56, 131.76, 130.16, 130.7, 127.95, 128.6, 125.15, 127.68, 128.92, 128.87, 129.61, 131.59, 130.9, 129.57, 129.47], '6M': [123.77, 117.54, 114.13, 114.49, 115.77, 115.04, 116.62, 119.22, 119.43, 120.67, 121.23, 127.27, 132.46, 133.52, 131.26, 130.97, 128.3, 131.67, 137.15, 134.39, 131.62, 134.44, 132.56, 127.95, 128.87, 129.47], '1Y': [101.68, 101.85, 101.94, 101.2, 102.35, 103.86, 105.34, 105.93, 108.97, 113.14, 113.73, 112.86, 113.14, 111.78, 108.11, 109.46, 107.06, 109.14, 114.06, 117.04, 117.53, 116.18, 121.89, 119.53, 121.48, 120.9, 123.77, 117.54, 114.13, 114.49, 115.77, 115.04, 116.57, 119.22, 119.43, 120.67, 121.23, 127.27, 132.46, 133.52, 131.26, 130.97, 128.3, 131.67, 137.15, 134.39, 131.62, 134.44, 132.56, 127.95, 128.87, 129.47] },
      velocityScore: { '1D': -0.5, '1W': -3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 19.2, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.93,
      etfPresence: { POW: 1.32, VOLT: 4.2, PBD: false, PBW: false },
      tonyNote: 'American Electric Power Co Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HYLN', name: 'Hyliion Holdings Corp', easyScore: 1, proScore: 1.92, coverage: 0.25,
      price: 7.02, weeklyPrices: [6.81, 6.88, 6.91, 6.97, 7.02], weeklyChange: 67.12, sortRank: 0, periodReturns: { '1M': 287.8, '6M': 273.4, '1Y': 310.5 },
      priceHistory: { '1W': [4.2, 5.99, 6.6, 6.94, 7.02], '1M': [1.81, 1.79, 1.91, 2.04, 2.11, 2.31, 2.39, 2.47, 2.46, 2.76, 3.59, 3.69, 4.67, 4.2, 4.09, 4.09, 4.2, 5.99, 6.6, 6.94, 7.02], '6M': [1.88, 1.92, 1.94, 1.86, 1.93, 1.94, 2.08, 2.07, 2.17, 2.15, 2.1, 2.08, 1.92, 2.03, 2.07, 1.91, 1.89, 1.75, 1.81, 1.94, 1.92, 1.79, 2.39, 3.59, 4.09, 7.02], '1Y': [1.71, 1.55, 1.59, 1.44, 1.37, 1.44, 1.46, 1.58, 1.75, 1.5, 1.49, 1.69, 1.58, 1.72, 1.76, 1.62, 1.98, 2.08, 2.11, 2.26, 2.27, 2.17, 2.3, 2.08, 1.68, 1.58, 1.88, 1.92, 1.94, 1.86, 1.93, 1.94, 1.98, 2.07, 2.17, 2.15, 2.1, 2.08, 1.92, 2.03, 2.07, 1.91, 1.89, 1.75, 1.81, 1.94, 1.92, 1.79, 2.39, 3.59, 4.09, 7.02] },
      velocityScore: { '1D': 4.3, '1W': 10.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1B', pe: null, revenueGrowth: 479, eps: -0.3, grossMargin: 6, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 3.84 },
      tonyNote: 'Hyliion Holdings Corp appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OGE', name: 'OGE ENERGY CORP', easyScore: 1, proScore: 1.88, coverage: 0.25,
      price: 47.87, weeklyPrices: [46.43, 46.91, 47.15, 47.53, 47.87], weeklyChange: -0.48, sortRank: 0, periodReturns: { '1M': 0.6, '6M': 4.6, '1Y': 9.6 },
      priceHistory: { '1W': [48.1, 48.54, 48.41, 48.18, 47.87], '1M': [47.59, 47.34, 48.8, 48.18, 47.84, 47.84, 47.73, 47.33, 47.35, 47.4, 47.34, 47.51, 46.27, 47.31, 48.05, 47.9, 48.1, 48.54, 48.41, 48.18, 47.87], '6M': [45.78, 43.38, 43.05, 42.5, 42.9, 42.59, 42.97, 43.7, 43.86, 43.31, 45.04, 46.49, 48.41, 48.89, 47.08, 47.78, 47.36, 48.26, 49.86, 48.55, 46.04, 47.34, 47.73, 47.34, 47.9, 47.87], '1Y': [43.69, 43.76, 44.19, 43.88, 43.99, 44.48, 44.28, 44.11, 44.92, 45.42, 45.84, 45.67, 44.96, 44.63, 44.15, 44.47, 44.13, 45.73, 45.92, 45.79, 46.43, 46.19, 44.46, 44.08, 44.97, 44.13, 45.78, 43.38, 43.05, 42.5, 42.9, 42.59, 42.49, 43.7, 43.86, 43.31, 45.04, 46.49, 48.41, 48.89, 47.08, 47.78, 47.36, 48.26, 49.86, 48.55, 46.04, 47.34, 47.73, 47.34, 47.9, 47.87] },
      velocityScore: { '1D': 0.5, '1W': -1.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 21.3, revenueGrowth: 1, eps: 2.25, grossMargin: 44, dividendYield: 3.53,
      etfPresence: { POW: false, VOLT: 3.75, PBD: false, PBW: false },
      tonyNote: 'OGE ENERGY CORP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FCEL', name: 'FuelCell Energy Inc', easyScore: 1, proScore: 1.85, coverage: 0.25,
      price: 23.89, weeklyPrices: [23.17, 23.41, 23.53, 23.72, 23.89], weeklyChange: -9.42, sortRank: 0, periodReturns: { '1M': 140.4, '6M': 256.1, '1Y': 325.9 },
      priceHistory: { '1W': [26.38, 25.01, 24.4, 23.69, 23.89], '1M': [9.94, 13.64, 13, 13.31, 13.02, 13.55, 12.81, 12.28, 13.7, 15.94, 19.92, 21.6, 21.36, 17.74, 17.36, 20.22, 26.38, 25.01, 24.4, 23.69, 23.89], '6M': [6.71, 8.37, 8.76, 8.34, 8.16, 8.3, 7.52, 8.64, 9.59, 7.72, 7.42, 7.43, 8.6, 8.57, 7.11, 6.79, 7.1, 6.46, 6.55, 7.53, 11.8, 13.64, 12.81, 19.92, 20.22, 23.89], '1Y': [5.61, 5.64, 6.64, 6.08, 5.96, 5.5, 5.37, 5.16, 5.66, 4.96, 4.34, 4.23, 3.98, 4.34, 4.05, 6.87, 8.36, 7.9, 10.21, 9.26, 9.3, 7.77, 7.73, 7.72, 7.04, 6.28, 6.71, 8.37, 8.76, 8.34, 8.16, 8.3, 7.55, 8.64, 9.59, 7.72, 7.42, 7.43, 8.6, 8.57, 7.11, 6.79, 7.1, 6.46, 6.55, 7.53, 11.8, 13.64, 12.81, 19.92, 20.22, 23.89] },
      velocityScore: { '1D': -4.1, '1W': -9.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1B', pe: null, revenueGrowth: 61, eps: -6.49, grossMargin: -16, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 3.71 },
      tonyNote: 'FuelCell Energy Inc appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, proScore: 1.79, coverage: 0.5,
      price: 325.5, weeklyPrices: [315.74, 318.99, 320.62, 323.22, 325.50], weeklyChange: 0.53, sortRank: 0, periodReturns: { '1M': -11.8, '6M': 54.1, '1Y': 181.3 },
      priceHistory: { '1W': [323.79, 324.86, 339.65, 328.34, 325.5], '1M': [369.08, 361.39, 383.91, 389.05, 387.03, 345.63, 360.81, 351.94, 357.24, 354.97, 339.19, 344.6, 323.46, 309.06, 302.84, 313.05, 323.79, 324.86, 339.65, 328.34, 325.5], '6M': [211.19, 219.38, 215.07, 216.09, 217.26, 229.7, 233.92, 250.95, 259.55, 263.03, 279.04, 321.34, 338.51, 330.54, 314.84, 319.63, 342.87, 332.82, 374.98, 374.32, 377.19, 361.39, 360.81, 339.19, 313.05, 325.5], '1Y': [115.7, 120.09, 127.72, 128.97, 133.84, 138.14, 140.73, 142.73, 140.91, 138.92, 146.5, 161.89, 148.07, 155.55, 153.74, 157.44, 174.35, 166.46, 173.86, 169.62, 192.22, 198.42, 205.61, 219.2, 202.82, 188.88, 211.19, 219.38, 215.07, 216.09, 217.26, 229.7, 227.59, 250.95, 259.55, 263.03, 279.04, 321.34, 338.51, 330.54, 314.84, 319.63, 342.87, 332.82, 374.98, 374.32, 377.19, 361.39, 360.81, 339.19, 313.05, 325.5] },
      velocityScore: { '1D': -2.7, '1W': -0.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 67.4, revenueGrowth: 26, eps: 4.83, grossMargin: 39, dividendYield: 0.12,
      etfPresence: { POW: 0.95, VOLT: 4.12, PBD: false, PBW: false },
      tonyNote: 'Advanced Energy Industries Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 1.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETR', name: 'ENTERGY CORP', easyScore: 1, proScore: 1.79, coverage: 0.25,
      price: 111.23, weeklyPrices: [107.89, 109.01, 109.56, 110.45, 111.23], weeklyChange: -0.93, sortRank: 0, periodReturns: { '1M': -1.7, '6M': 14.1, '1Y': 36 },
      priceHistory: { '1W': [112.27, 112.4, 111.97, 111.51, 111.23], '1M': [113.16, 114.67, 117.91, 116.43, 116.4, 117.36, 112.96, 112.02, 111.59, 112.97, 112.35, 112.9, 109.03, 109.58, 110.55, 111.93, 112.27, 112.4, 111.97, 111.51, 111.23], '6M': [97.52, 94.22, 92.35, 91.5, 93.13, 93.32, 94.37, 94.75, 96.58, 97.35, 99.71, 102.39, 106.26, 106.49, 103.82, 104.26, 102.76, 113.58, 117.44, 114.95, 110.47, 114.67, 112.96, 112.35, 111.93, 111.23], '1Y': [81.81, 81.89, 82.15, 80.92, 81.86, 81.92, 81.75, 84.54, 88.15, 90.43, 90.53, 90.29, 89.22, 88.13, 87.75, 90.29, 88.67, 92.25, 95.39, 95.26, 96.02, 95.67, 96.05, 95.7, 94.42, 93.35, 97.52, 94.22, 92.35, 91.5, 93.13, 93.32, 93.5, 94.75, 96.58, 97.35, 99.71, 102.39, 106.26, 106.49, 103.82, 104.26, 102.76, 113.58, 117.44, 114.95, 110.47, 114.67, 112.96, 112.35, 111.93, 111.23] },
      velocityScore: { '1D': 0, '1W': -1.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$51B', pe: 28.3, revenueGrowth: 12, eps: 3.93, grossMargin: 47, dividendYield: 2.3,
      etfPresence: { POW: false, VOLT: 3.59, PBD: false, PBW: false },
      tonyNote: 'ENTERGY CORP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ET', name: 'ENERGY TRANSFER LP', easyScore: 1, proScore: 1.7, coverage: 0.25,
      price: 19.51, weeklyPrices: [18.92, 19.12, 19.22, 19.37, 19.51], weeklyChange: -2.49, sortRank: 0, periodReturns: { '1M': 0.5, '6M': 16.8, '1Y': 9.9 },
      priceHistory: { '1W': [20.01, 20.07, 19.6, 19.33, 19.51], '1M': [19.41, 19.76, 20.19, 19.94, 20.08, 20.39, 19.87, 19.92, 19.34, 19.61, 20.1, 20.36, 20.15, 20.19, 20.39, 20.16, 20.01, 20.07, 19.6, 19.33, 19.51], '6M': [16.71, 16.8, 16.56, 16.39, 16.27, 16.25, 17.4, 17.44, 17.95, 18.41, 18.11, 18.86, 18.59, 18.76, 18.75, 18.66, 19.14, 19.02, 19.09, 18.71, 19.07, 19.76, 19.87, 20.1, 20.16, 19.51], '1Y': [17.76, 17.53, 18.25, 17.88, 18.18, 17.97, 17.46, 17.54, 17.72, 18.04, 17.62, 17.38, 17.46, 17.66, 17.39, 17.45, 17.3, 17.46, 16.8, 16.29, 16.68, 16.85, 16.77, 16.87, 16.63, 16.64, 16.71, 16.8, 16.56, 16.39, 16.27, 16.25, 17.15, 17.44, 17.95, 18.41, 18.11, 18.86, 18.59, 18.76, 18.75, 18.66, 19.14, 19.02, 19.09, 18.71, 19.07, 19.76, 19.87, 20.1, 20.16, 19.51] },
      velocityScore: { '1D': -0.6, '1W': -4.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$67B', pe: 16.3, revenueGrowth: 32, eps: 1.2, grossMargin: 19, dividendYield: 6.91,
      etfPresence: { POW: false, VOLT: 3.4, PBD: false, PBW: false },
      tonyNote: 'ENERGY TRANSFER LP appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MOD', name: 'MODINE MANUFACTURING CO', easyScore: 1, proScore: 1.66, coverage: 0.25,
      price: 274.69, weeklyPrices: [266.45, 269.20, 270.57, 272.77, 274.69], weeklyChange: 9.83, sortRank: 0, periodReturns: { '1M': 15.9, '6M': 69.4, '1Y': 202.5 },
      priceHistory: { '1W': [250.11, 260.52, 295.88, 279.93, 274.69], '1M': [237.06, 233.39, 254.63, 266.83, 259.76, 271.6, 274.22, 269.65, 273, 284.8, 279.2, 292.16, 271.26, 247.13, 244.49, 257.33, 250.11, 260.52, 295.88, 279.93, 274.69], '6M': [162.13, 162.87, 139.88, 136.16, 136.19, 129.97, 127.07, 136.36, 146.9, 199.48, 219.76, 217.53, 230.19, 209.93, 200.63, 200.42, 232.89, 222.97, 241.52, 238.14, 253.15, 233.39, 274.22, 279.2, 257.33, 274.69], '1Y': [90.81, 91.66, 94.15, 96.1, 101.75, 104.54, 91.91, 97.47, 97.87, 134.56, 135.15, 139.51, 134.89, 142.43, 135.19, 149.68, 154.95, 138.65, 147.61, 145.23, 160.43, 152.4, 153.2, 149.09, 128.73, 139.01, 162.13, 162.87, 139.88, 136.16, 136.19, 129.97, 127.23, 136.36, 146.9, 199.48, 219.76, 217.53, 230.19, 209.93, 200.63, 200.42, 232.89, 222.97, 241.52, 238.14, 253.15, 233.39, 274.22, 279.2, 257.33, 274.69] },
      velocityScore: { '1D': -4.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$14B', pe: 121, revenueGrowth: 48, eps: 2.27, grossMargin: 23, dividendYield: null,
      etfPresence: { POW: false, VOLT: 3.31, PBD: false, PBW: false },
      tonyNote: 'MODINE MANUFACTURING CO appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVTS', name: 'Navitas Semiconductor Corp', easyScore: 1, proScore: 1.66, coverage: 0.25,
      price: 28.98, weeklyPrices: [28.11, 28.40, 28.55, 28.78, 28.98], weeklyChange: 18.86, sortRank: 0, periodReturns: { '1M': 91.7, '6M': 231.6, '1Y': 370.4 },
      priceHistory: { '1W': [24.38, 29.25, 31.79, 28.88, 28.98], '1M': [15.12, 15.48, 16.5, 17.45, 15.92, 17.55, 16.68, 15.79, 18.2, 22.65, 21.17, 22.32, 21.32, 19.67, 19.43, 22.99, 24.38, 29.25, 31.79, 28.88, 28.98], '6M': [8.74, 9.48, 8.59, 7.81, 7.21, 10.19, 9.45, 9.86, 9.56, 9.05, 8.79, 8.09, 9.88, 9.22, 10.84, 9.06, 9.48, 8.54, 9.42, 10.26, 18.47, 15.48, 16.68, 21.17, 22.99, 28.98], '1Y': [6.16, 6.78, 7.96, 7, 6.61, 6.44, 5.84, 6.27, 8.98, 7.33, 6.79, 7.25, 6.21, 6.04, 5.6, 6.17, 7.01, 6.43, 7.82, 8.23, 15.63, 13.61, 12.56, 8.84, 7.91, 7.55, 8.74, 9.48, 8.59, 7.81, 7.21, 10.19, 10.43, 9.86, 9.56, 9.05, 8.79, 8.09, 9.88, 9.22, 10.84, 9.06, 9.48, 8.54, 9.42, 10.26, 18.47, 15.48, 16.68, 21.17, 22.99, 28.98] },
      velocityScore: { '1D': -9.3, '1W': -5.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 3.31 },
      tonyNote: 'Navitas Semiconductor Corp appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 1.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, proScore: 4.87, coverage: 1,
      price: 792, weeklyPrices: [768.24, 776.16, 780.12, 786.46, 792.00], weeklyChange: 7.94, sortRank: 0, periodReturns: { '1M': 67.8, '6M': 130, '1Y': 321.4 },
      priceHistory: { '1W': [733.77, 732.94, 783.53, 782.12, 792], '1M': [471.85, 469.75, 515.62, 532.67, 529.49, 806, 886.22, 811.41, 844.8, 868.18, 854.28, 889.03, 848.84, 770.76, 728.29, 752, 733.77, 732.94, 783.53, 782.12, 792], '6M': [344.31, 325.1, 315.15, 308.58, 310.79, 317.41, 321.6, 349.59, 372.25, 386.78, 415.19, 410.63, 455.25, 420.22, 420.6, 421.23, 452.92, 421.29, 435.65, 456.08, 487.87, 469.75, 886.22, 854.28, 752, 792], '1Y': [187.93, 193.81, 204.46, 223.97, 228.65, 236.67, 241.76, 250.69, 252.68, 267.59, 299.64, 282.14, 278.03, 290.95, 285.98, 313.56, 360.25, 342.11, 349.3, 336.63, 361.02, 353.8, 379.03, 388.68, 326.6, 314.56, 344.31, 325.1, 315.15, 308.58, 310.79, 317.41, 307.58, 349.59, 372.25, 386.78, 415.19, 410.63, 455.25, 420.22, 420.6, 421.23, 452.92, 421.29, 435.65, 456.08, 487.87, 469.75, 886.22, 854.28, 752, 792] },
      velocityScore: { '1D': -0.8, '1W': 2.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$24B', pe: 70.8, revenueGrowth: 92, eps: 11.18, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 5.75, PRN: 3.99 },
      tonyNote: 'Sterling Infrastructure, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 4.9% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, proScore: 4.45, coverage: 1,
      price: 1879.48, weeklyPrices: [1823.10, 1841.89, 1851.29, 1866.32, 1879.48], weeklyChange: 2.41, sortRank: 0, periodReturns: { '1M': 9.3, '6M': 92.4, '1Y': 294.1 },
      priceHistory: { '1W': [1835.33, 1828.25, 1883.56, 1867.09, 1879.48], '1M': [1719.21, 1724.14, 1840.25, 1867.02, 1891.95, 1967.24, 2011.49, 1942.02, 1952.37, 2032.98, 2034.63, 2042.36, 1992.74, 1854.43, 1825.5, 1835.51, 1835.33, 1828.25, 1883.56, 1867.09, 1879.48], '6M': [976.94, 1001.48, 967.95, 940.74, 950.67, 1035.11, 1073.14, 1134.75, 1160.38, 1209.97, 1269.63, 1319.47, 1450.6, 1430.38, 1407.32, 1423, 1470.64, 1428.52, 1574.45, 1648.96, 1724.49, 1724.14, 2011.49, 2034.63, 1835.51, 1879.48], '1Y': [476.92, 498.63, 496.7, 499.02, 516.08, 540.98, 539.5, 550.5, 562.83, 703.3, 694.43, 689.86, 694, 730.01, 706.31, 753.69, 797.71, 804.36, 818.01, 816.07, 838.78, 825, 963.3, 957.78, 897.52, 876.19, 976.94, 1001.48, 967.95, 940.74, 950.67, 1035.11, 1038.18, 1134.75, 1160.38, 1209.97, 1269.63, 1319.47, 1450.6, 1430.38, 1407.32, 1423, 1470.64, 1428.52, 1574.45, 1648.96, 1724.49, 1724.14, 2011.49, 2034.63, 1835.51, 1879.48] },
      velocityScore: { '1D': -1.5, '1W': -1.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 54.1, revenueGrowth: 1, eps: 34.73, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: 4.28, PRN: 4.61 },
      tonyNote: 'Comfort Systems USA, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 4.5% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, proScore: 4.21, coverage: 1,
      price: 670.34, weeklyPrices: [650.23, 656.93, 660.28, 665.65, 670.34], weeklyChange: 3.99, sortRank: 0, periodReturns: { '1M': 6.3, '6M': 69.6, '1Y': 219.7 },
      priceHistory: { '1W': [644.64, 656.35, 670.66, 673.51, 670.34], '1M': [630.7, 630.07, 669.98, 702.27, 697.15, 720, 727.54, 690, 680.26, 683.52, 719.92, 740.91, 722.31, 664.76, 639.58, 630.5, 644.64, 656.35, 670.66, 673.51, 670.34], '6M': [395.2, 313.7, 319.91, 325.59, 320.73, 330.42, 314.09, 384.34, 362.58, 381.73, 371.47, 414.12, 442.34, 463.36, 472.86, 469.81, 437.48, 571.38, 609.29, 606.43, 651.68, 630.07, 727.54, 719.92, 630.5, 670.34], '1Y': [209.69, 217.8, 224.31, 206.22, 215.68, 211.09, 212.25, 203.84, 224.37, 244.98, 235, 224.54, 218.29, 242.08, 211.51, 230.31, 260.64, 266.73, 262.26, 256.15, 296.39, 276.12, 298.33, 311.38, 335.1, 353.3, 395.2, 313.7, 319.91, 325.59, 320.73, 330.42, 309.26, 384.34, 362.58, 381.73, 371.47, 414.12, 442.34, 463.36, 472.86, 469.81, 437.48, 571.38, 609.29, 606.43, 651.68, 630.07, 727.54, 719.92, 630.5, 670.34] },
      velocityScore: { '1D': 0, '1W': -0.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 68.6, revenueGrowth: 13, eps: 9.77, grossMargin: 20, dividendYield: 0.3,
      etfPresence: { AIRR: 4.11, PRN: 4.3 },
      tonyNote: 'Argan, Inc. appears in 2 of 2 Industrials ETFs (100% coverage) with average weight 4.2% — highest conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TTMI', name: 'TTM Technologies Inc', easyScore: 1, proScore: 4.18, coverage: 0.5,
      price: 186.35, weeklyPrices: [180.76, 182.62, 183.55, 185.05, 186.35], weeklyChange: 6.76, sortRank: 0, periodReturns: { '1M': 35.4, '6M': 165.5, '1Y': 522 },
      priceHistory: { '1W': [174.55, 189.92, 196.95, 190.67, 186.35], '1M': [137.59, 137.5, 158.22, 158.99, 157.47, 159.58, 164.64, 153.77, 157.31, 162.99, 168.82, 171.87, 167.35, 158.86, 161.41, 169.36, 174.55, 189.92, 196.95, 190.67, 186.35], '6M': [70.18, 73.74, 73.43, 70.38, 71.21, 70.45, 93.24, 97.83, 94.61, 107.57, 93.77, 93.97, 108.86, 105.14, 95.44, 95.31, 108, 97.08, 107.53, 116.6, 126.71, 137.5, 164.64, 168.82, 169.36, 186.35], '1Y': [29.96, 32.37, 36.58, 36.97, 39.86, 44.02, 44.11, 46.22, 44.27, 47.25, 43.36, 42.62, 40.78, 46.9, 47.7, 46.77, 52.12, 55.78, 59.18, 53.58, 58.45, 58.4, 61.98, 68.11, 63.1, 58.45, 70.18, 73.74, 73.43, 70.38, 71.21, 70.45, 77.89, 97.83, 94.61, 107.57, 93.77, 93.97, 108.86, 105.14, 95.44, 95.31, 108, 97.08, 107.53, 116.6, 126.71, 137.5, 164.64, 168.82, 169.36, 186.35] },
      velocityScore: { '1D': -3.5, '1W': -3.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 100.7, revenueGrowth: 30, eps: 1.85, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 5.91 },
      tonyNote: 'TTM Technologies Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 4.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 1, proScore: 3.79, coverage: 0.5,
      price: 50.01, weeklyPrices: [48.51, 49.01, 49.26, 49.66, 50.01], weeklyChange: 17.71, sortRank: 0, periodReturns: { '1M': 42.7, '6M': 320.2, '1Y': 1153.3 },
      priceHistory: { '1W': [42.48, 44.35, 48.32, 50.48, 50.01], '1M': [35.03, 34.08, 36.97, 36.9, 38.54, 37.13, 39.69, 35.24, 39.04, 41.84, 40.74, 43.04, 41.62, 41.61, 41.59, 42.66, 42.48, 44.35, 48.32, 50.48, 50.01], '6M': [11.9, 12.77, 18.24, 19.18, 19.87, 21.84, 25.32, 28, 28.07, 23.95, 22.79, 23.74, 24.63, 26, 25.44, 24.81, 35.37, 30.71, 34.23, 34.41, 39.47, 34.08, 39.69, 40.74, 42.66, 50.01], '1Y': [3.99, 3.99, 5.43, 5.11, 6.06, 6.85, 6.14, 6.63, 6.84, 6.25, 6.27, 6.82, 6.48, 7.21, 6.53, 9.78, 11.11, 12.2, 15.31, 14.7, 13.23, 12.95, 12.86, 12.46, 11.41, 11.23, 11.9, 12.77, 18.24, 19.18, 19.87, 21.84, 25.44, 28, 28.07, 23.95, 22.79, 23.74, 24.63, 26, 25.44, 24.81, 35.37, 30.71, 34.23, 34.41, 39.47, 34.08, 39.69, 40.74, 42.66, 50.01] },
      velocityScore: { '1D': 4.1, '1W': 8.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: null, revenueGrowth: 41, eps: -0.8, grossMargin: 56, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 5.36 },
      tonyNote: 'Planet Labs PBC appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, proScore: 3.2, coverage: 0.5,
      price: 339.89, weeklyPrices: [329.69, 333.09, 334.79, 337.51, 339.89], weeklyChange: 26.69, sortRank: 0, periodReturns: { '1M': 36.7, '6M': 280.4, '1Y': 703.1 },
      priceHistory: { '1W': [268.29, 267.99, 332.95, 345.84, 339.89], '1M': [248.7, 256.7, 269.27, 268.36, 251.02, 266.01, 280.34, 261.34, 256.47, 312.96, 309.27, 290.54, 273.67, 249.02, 243.43, 264.2, 268.29, 267.99, 332.95, 345.84, 339.89], '6M': [89.35, 96.83, 97.8, 104.4, 112, 138.92, 138.61, 157.4, 164.03, 166.76, 157.43, 155.61, 197.16, 203.19, 178.83, 191.84, 186, 158.16, 184.92, 194.2, 265, 256.7, 280.34, 309.27, 264.2, 339.89], '1Y': [42.32, 44.19, 45.43, 45.47, 47.31, 46.27, 46.25, 48.39, 47.15, 44.44, 46.02, 47.25, 46.71, 52.13, 51.8, 50.77, 52.88, 48.67, 49.03, 48.56, 60.47, 92.98, 91.42, 89.02, 88.58, 83.28, 89.35, 96.83, 97.8, 104.4, 112, 138.92, 139.12, 157.4, 164.03, 166.76, 157.43, 155.61, 197.16, 203.19, 178.83, 191.84, 186, 158.16, 184.92, 194.2, 265, 256.7, 280.34, 309.27, 264.2, 339.89] },
      velocityScore: { '1D': 3.6, '1W': 23.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 114.4, revenueGrowth: 20, eps: 2.97, grossMargin: 54, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 4.53 },
      tonyNote: 'Vicor Corp appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 3.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SAIA', name: 'Saia, Inc.', easyScore: 1, proScore: 2.89, coverage: 0.5,
      price: 464.88, weeklyPrices: [450.93, 455.58, 457.91, 461.63, 464.88], weeklyChange: 1.45, sortRank: 0, periodReturns: { '1M': 4.9, '6M': 65.1, '1Y': 73.4 },
      priceHistory: { '1W': [458.25, 456.23, 467.89, 474, 464.88], '1M': [443.32, 422.04, 448.82, 441.26, 405.09, 422.31, 449.4, 448.94, 449.8, 446.18, 431.42, 459.29, 460.38, 458.31, 448.95, 466.47, 458.25, 456.23, 467.89, 474, 464.88], '6M': [281.56, 330.91, 345.05, 320.29, 331.34, 365.62, 356.58, 340.8, 350, 374.28, 381.64, 390.35, 384.33, 414.43, 341.41, 322.63, 344.36, 354.88, 401.67, 397.79, 431.46, 422.04, 449.4, 431.42, 466.47, 464.88], '1Y': [268.1, 265.08, 255.16, 260.48, 270.74, 294.79, 303.28, 291.65, 311.79, 302.24, 284.3, 305.27, 293.95, 292.36, 313.15, 312.63, 310.04, 293.57, 297.42, 294.23, 304.31, 291.98, 283.47, 273.81, 271.98, 250.48, 281.56, 330.91, 345.05, 320.29, 331.34, 365.62, 365.68, 340.8, 350, 374.28, 381.64, 390.35, 384.33, 414.43, 341.41, 322.63, 344.36, 354.88, 401.67, 397.79, 431.46, 422.04, 449.4, 431.42, 466.47, 464.88] },
      velocityScore: { '1D': 0.3, '1W': 0.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 48.8, revenueGrowth: 2, eps: 9.53, grossMargin: 24, dividendYield: null,
      etfPresence: { AIRR: 4.09, PRN: false },
      tonyNote: 'Saia, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 1, proScore: 2.88, coverage: 0.5,
      price: 731.32, weeklyPrices: [709.38, 716.69, 720.35, 726.20, 731.32], weeklyChange: 2.01, sortRank: 0, periodReturns: { '1M': 15.9, '6M': 57.3, '1Y': 114.9 },
      priceHistory: { '1W': [716.91, 723.44, 742.18, 733.62, 731.32], '1M': [630.94, 628.6, 727.77, 742.21, 757.34, 771.61, 785.24, 750.73, 745, 781.38, 773.72, 780.08, 769.99, 723.03, 714.13, 709.93, 716.91, 723.44, 742.18, 733.62, 731.32], '6M': [464.88, 460.64, 438.11, 426.66, 431.03, 438.22, 444.2, 463.49, 479.27, 488.6, 510.64, 519.31, 562.77, 568.38, 567.71, 572, 573.5, 560.12, 582.06, 591.82, 613.78, 628.6, 785.24, 773.72, 709.93, 731.32], '1Y': [340.32, 359.11, 355.78, 360.43, 379.47, 386.51, 383.78, 397.9, 407.22, 406.13, 387.35, 377.51, 378.21, 385.96, 372.5, 382.53, 388.58, 405.44, 421.17, 417.61, 437.52, 427.36, 453.83, 442.9, 426.93, 429.78, 464.88, 460.64, 438.11, 426.66, 431.03, 438.22, 432.66, 463.49, 479.27, 488.6, 510.64, 519.31, 562.77, 568.38, 567.71, 572, 573.5, 560.12, 582.06, 591.82, 613.78, 628.6, 785.24, 773.72, 709.93, 731.32] },
      velocityScore: { '1D': -1.4, '1W': -2.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$110B', pe: 100.7, revenueGrowth: 26, eps: 7.26, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { AIRR: false, PRN: 4.07 },
      tonyNote: 'Quanta Services Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DY', name: 'Dycom Industries, Inc.', easyScore: 1, proScore: 2.86, coverage: 0.5,
      price: 539.51, weeklyPrices: [523.32, 528.72, 531.42, 535.73, 539.51], weeklyChange: 30.18, sortRank: 0, periodReturns: { '1M': 33.7, '6M': 49.2, '1Y': 137.4 },
      priceHistory: { '1W': [414.43, 411.2, 420.47, 529.13, 539.51], '1M': [403.45, 390.31, 414.1, 433.6, 429.47, 457.14, 457.78, 426.36, 428.31, 430.95, 444.81, 450.98, 437.37, 419.66, 413.35, 412.78, 414.43, 411.2, 420.47, 529.13, 539.51], '6M': [361.53, 351.8, 345.78, 344.38, 343.5, 350.31, 356.9, 366.15, 374.87, 391.7, 410.4, 412.68, 425.47, 387.07, 366.95, 352.19, 353.52, 347.45, 391.62, 395, 408.05, 390.31, 457.78, 444.81, 412.78, 539.51], '1Y': [227.24, 236.43, 236.46, 232.83, 239.37, 250.27, 252.4, 256.35, 262.41, 268.81, 276.43, 267.96, 262.19, 256.49, 248.34, 257.84, 269.58, 287.45, 286.45, 284.33, 295.44, 286.38, 286.36, 282.92, 282.69, 323.37, 361.53, 351.8, 345.78, 344.38, 343.5, 350.31, 346.31, 366.15, 374.87, 391.7, 410.4, 412.68, 425.47, 387.07, 366.95, 352.19, 353.52, 347.45, 391.62, 395, 408.05, 390.31, 457.78, 444.81, 412.78, 539.51] },
      velocityScore: { '1D': 24.9, '1W': 24.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$16B', pe: 51.5, revenueGrowth: 56, eps: 10.48, grossMargin: 20, dividendYield: null,
      etfPresence: { AIRR: 4.05, PRN: false },
      tonyNote: 'Dycom Industries, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MTZ', name: 'MasTec, Inc.', easyScore: 1, proScore: 2.84, coverage: 0.5,
      price: 386.21, weeklyPrices: [374.62, 378.49, 380.42, 383.51, 386.21], weeklyChange: -0.66, sortRank: 0, periodReturns: { '1M': 3, '6M': 80.6, '1Y': 148.8 },
      priceHistory: { '1W': [388.77, 382.11, 390.75, 387.52, 386.21], '1M': [375.09, 370.55, 394.05, 417.41, 425.39, 437.51, 433.28, 412.27, 414.29, 421.37, 423.79, 434.77, 414.9, 385.58, 385, 384.21, 388.77, 382.11, 390.75, 387.52, 386.21], '6M': [213.88, 219.52, 221.01, 218.18, 222.76, 236.35, 226.07, 240.35, 248.59, 249.51, 261.39, 264.18, 285.26, 303.87, 303.73, 303.07, 323.55, 333.79, 357.37, 365.07, 376.5, 370.55, 433.28, 423.79, 384.21, 386.21], '1Y': [155.2, 157.63, 162.9, 164.66, 170.55, 171.89, 170.24, 176.57, 181.75, 189.21, 182.98, 178, 173.67, 184.44, 178, 189.75, 200.96, 208.12, 215.81, 195.6, 203.4, 204.92, 213.95, 196.66, 190.08, 191.82, 213.88, 219.52, 221.01, 218.18, 222.76, 236.35, 223.7, 240.35, 248.59, 249.51, 261.39, 264.18, 285.26, 303.87, 303.73, 303.07, 323.55, 333.79, 357.37, 365.07, 376.5, 370.55, 433.28, 423.79, 384.21, 386.21] },
      velocityScore: { '1D': -1.4, '1W': -1.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$31B', pe: 67.8, revenueGrowth: 35, eps: 5.7, grossMargin: 13, dividendYield: null,
      etfPresence: { AIRR: 4.01, PRN: false },
      tonyNote: 'MasTec, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JBL', name: 'Jabil Inc', easyScore: 1, proScore: 2.84, coverage: 0.5,
      price: 367.8, weeklyPrices: [356.77, 360.44, 362.28, 365.23, 367.80], weeklyChange: 3.2, sortRank: 0, periodReturns: { '1M': 11.2, '6M': 74.6, '1Y': 119.3 },
      priceHistory: { '1W': [356.41, 364.35, 380.25, 371.38, 367.8], '1M': [330.83, 333.86, 337.49, 342.47, 340.8, 337.26, 372.34, 349.6, 355.15, 365.24, 355.43, 354.34, 339.82, 338.73, 332.88, 345.15, 356.41, 364.35, 380.25, 371.38, 367.8], '6M': [210.71, 220.06, 222.37, 226.62, 234.97, 224.38, 238.35, 246.75, 242.28, 245.63, 258.93, 260.54, 277.57, 255.18, 255.46, 258.67, 283.24, 271.96, 293.02, 304.95, 336.4, 333.86, 372.34, 355.43, 345.15, 367.8], '1Y': [167.74, 171.97, 178.43, 204.66, 215.31, 226.01, 222.02, 222.23, 218.41, 223.17, 220.49, 217.4, 205.06, 209.87, 210.1, 214.06, 224.34, 215.84, 202.08, 193.99, 209.74, 206.57, 221.47, 215.06, 201.82, 192.49, 210.71, 220.06, 222.37, 226.62, 234.97, 224.38, 230.58, 246.75, 242.28, 245.63, 258.93, 260.54, 277.57, 255.18, 255.46, 258.67, 283.24, 271.96, 293.02, 304.95, 336.4, 333.86, 372.34, 355.43, 345.15, 367.8] },
      velocityScore: { '1D': -2.7, '1W': -2.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$39B', pe: 49.5, revenueGrowth: 23, eps: 7.43, grossMargin: 9, dividendYield: 0.09,
      etfPresence: { AIRR: false, PRN: 4.02 },
      tonyNote: 'Jabil Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'EME', name: 'EMCOR Group, Inc.', easyScore: 1, proScore: 2.81, coverage: 0.5,
      price: 853.34, weeklyPrices: [827.74, 836.27, 840.54, 847.37, 853.34], weeklyChange: 0.49, sortRank: 0, periodReturns: { '1M': -1.2, '6M': 38.7, '1Y': 81.9 },
      priceHistory: { '1W': [849.2, 848.91, 861.41, 855.26, 853.34], '1M': [863.78, 833.37, 891.67, 903.5, 910.26, 933.27, 943.75, 924.06, 921.64, 931.5, 923.01, 930.03, 913.11, 877.19, 854.36, 853.15, 849.2, 848.91, 861.41, 855.26, 853.34], '6M': [615.07, 623.62, 623.65, 611.41, 623.26, 655.94, 670.55, 687.76, 716.28, 744.53, 779.09, 783.06, 801.8, 740.87, 720.18, 737.66, 764.76, 759.55, 800.4, 803.64, 860, 833.37, 943.75, 923.01, 853.15, 853.34], '1Y': [469.14, 482.64, 471.89, 485.21, 510.99, 547.22, 554.22, 559.25, 578.8, 627.49, 617.51, 609.75, 610.85, 633.25, 625.4, 629.08, 632.02, 640.57, 654.41, 663.74, 687.22, 696.28, 648, 653.75, 618.96, 583.08, 615.07, 623.62, 623.65, 611.41, 623.26, 655.94, 660.65, 687.76, 716.28, 744.53, 779.09, 783.06, 801.8, 740.87, 720.18, 737.66, 764.76, 759.55, 800.4, 803.64, 860, 833.37, 943.75, 923.01, 853.15, 853.34] },
      velocityScore: { '1D': -1.7, '1W': -2.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$38B', pe: 28.7, revenueGrowth: 20, eps: 29.76, grossMargin: 19, dividendYield: 0.15,
      etfPresence: { AIRR: 3.98, PRN: false },
      tonyNote: 'EMCOR Group, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CHRW', name: 'C.H. Robinson Worldwide, Inc.', easyScore: 1, proScore: 2.79, coverage: 0.5,
      price: 173.72, weeklyPrices: [168.51, 170.25, 171.11, 172.50, 173.72], weeklyChange: -2.47, sortRank: 0, periodReturns: { '1M': -7.6, '6M': 9.4, '1Y': 81.8 },
      priceHistory: { '1W': [178.13, 174.23, 177.91, 176.49, 173.72], '1M': [187.96, 186.43, 181.81, 177.3, 161.24, 167.13, 168.59, 171.37, 171.39, 169.98, 163.26, 159.78, 163.59, 169.72, 173.02, 180.64, 178.13, 174.23, 177.91, 176.49, 173.72], '6M': [158.87, 157.22, 157.09, 166.46, 163.94, 167.66, 173.42, 175.1, 180.43, 199.71, 196.61, 185.86, 175.91, 189.87, 175.78, 170.64, 169.74, 168.5, 170.2, 168.08, 182.35, 186.43, 168.59, 163.26, 180.64, 173.72], '1Y': [95.58, 96.16, 94.58, 93.41, 93.19, 98.03, 99.4, 98.53, 103.17, 115.32, 117.82, 121.52, 122.8, 129.29, 126.13, 132.41, 136.07, 131.81, 135.4, 125.31, 125.99, 125.41, 154.88, 148.23, 151.66, 148.57, 158.87, 157.22, 157.09, 166.46, 163.94, 167.66, 172.54, 175.1, 180.43, 199.71, 196.61, 185.86, 175.91, 189.87, 175.78, 170.64, 169.74, 168.5, 170.2, 168.08, 182.35, 186.43, 168.59, 163.26, 180.64, 173.72] },
      velocityScore: { '1D': -1.4, '1W': -1.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 35.2, revenueGrowth: -1, eps: 4.94, grossMargin: 9, dividendYield: 1.43,
      etfPresence: { AIRR: 3.94, PRN: false },
      tonyNote: 'C.H. Robinson Worldwide, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 1, proScore: 2.27, coverage: 0.5,
      price: 901.45, weeklyPrices: [874.41, 883.42, 887.93, 895.14, 901.45], weeklyChange: 4.1, sortRank: 0, periodReturns: { '1M': 10.2, '6M': 56.6, '1Y': 157.9 },
      priceHistory: { '1W': [865.95, 879.89, 908.55, 909.93, 901.45], '1M': [817.87, 810.05, 890.11, 889.67, 874.78, 904.59, 926.93, 895.69, 897.45, 926.79, 902.3, 920.22, 888.31, 863.95, 860.15, 872.56, 865.95, 879.89, 908.55, 909.93, 901.45], '6M': [575.76, 603.17, 597.89, 576.22, 578.61, 623.09, 636.53, 629, 638.91, 702.89, 742.37, 751.97, 766.61, 731.97, 707.59, 693.62, 719.04, 730.32, 787.07, 770.17, 808.87, 810.05, 926.93, 902.3, 872.56, 901.45], '1Y': [349.49, 349.33, 363.14, 359.8, 381.88, 397.86, 405.92, 418.07, 429.52, 438.02, 417.12, 417.5, 417.89, 434.91, 423.08, 431.52, 466.54, 465.76, 497.85, 491.3, 540.96, 520.5, 583.15, 569.78, 553.55, 546.13, 575.76, 603.17, 597.89, 576.22, 578.61, 623.09, 629.77, 629, 638.91, 702.89, 742.37, 751.97, 766.61, 731.97, 707.59, 693.62, 719.04, 730.32, 787.07, 770.17, 808.87, 810.05, 926.93, 902.3, 872.56, 901.45] },
      velocityScore: { '1D': -0.4, '1W': -0.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$415B', pe: 44.8, revenueGrowth: 22, eps: 20.11, grossMargin: 29, dividendYield: 0.66,
      etfPresence: { AIRR: false, PRN: 3.21 },
      tonyNote: 'Caterpillar Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CMI', name: 'Cummins Inc', easyScore: 1, proScore: 2.23, coverage: 0.5,
      price: 663.93, weeklyPrices: [644.01, 650.65, 653.97, 659.28, 663.93], weeklyChange: 3.94, sortRank: 0, periodReturns: { '1M': 3.3, '6M': 33.3, '1Y': 105.5 },
      priceHistory: { '1W': [638.78, 639.55, 668.75, 667.85, 663.93], '1M': [642.45, 638.95, 671.01, 657.44, 656.73, 674.88, 715.76, 682.88, 679.55, 702.66, 709.57, 716.45, 696.53, 677.87, 659.46, 669.87, 638.78, 639.55, 668.75, 667.85, 663.93], '6M': [497.98, 510.65, 510.05, 506.72, 514.64, 546.76, 567.44, 565.8, 576.23, 602.69, 588.07, 593, 594.41, 574.06, 556.14, 543.29, 553.36, 550.09, 610.99, 601.46, 639.22, 638.95, 715.76, 709.57, 669.87, 663.93], '1Y': [323.04, 322.83, 323.58, 314.99, 324.2, 331.83, 338.82, 348.17, 365.27, 367.62, 384.61, 404.8, 394.2, 401.92, 399.85, 410.27, 423.64, 418.04, 432.8, 413.08, 422.67, 417.74, 438.09, 462.8, 467.49, 465.19, 497.98, 510.65, 510.05, 506.72, 514.64, 546.76, 562.18, 565.8, 576.23, 602.69, 588.07, 593, 594.41, 574.06, 556.14, 543.29, 553.36, 550.09, 610.99, 601.46, 639.22, 638.95, 715.76, 709.57, 669.87, 663.93] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$92B', pe: 34.5, revenueGrowth: 3, eps: 19.23, grossMargin: 26, dividendYield: 1.2,
      etfPresence: { AIRR: false, PRN: 3.16 },
      tonyNote: 'Cummins Inc appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 1, proScore: 2.21, coverage: 0.5,
      price: 199.98, weeklyPrices: [193.98, 195.98, 196.98, 198.58, 199.98], weeklyChange: -1.25, sortRank: 0, periodReturns: { '1M': -7.5, '6M': 11.8, '1Y': 58 },
      priceHistory: { '1W': [202.52, 202.91, 204.38, 198.95, 199.98], '1M': [216.18, 208.08, 216.39, 216.31, 216.68, 206.15, 215.2, 209.89, 205.33, 210.8, 206.83, 210.94, 204.72, 201.94, 197.33, 202.66, 202.52, 202.91, 204.38, 198.95, 199.98], '6M': [178.88, 177.87, 175.03, 176.43, 175.49, 195.3, 210.54, 206.07, 212.4, 210.88, 199.83, 202.25, 208.27, 205.57, 195.98, 208.98, 222.13, 212.81, 230.29, 238.42, 219.1, 208.08, 215.2, 206.83, 202.66, 199.98], '1Y': [126.59, 128.87, 135.8, 140.53, 141.87, 142.91, 137.06, 142.34, 143.84, 151.93, 179.53, 174.7, 165.34, 165.83, 163.64, 168.33, 174.5, 180.62, 186.64, 190.08, 209.01, 199.92, 213.8, 193.93, 177.88, 175.28, 178.88, 177.87, 175.03, 176.43, 175.49, 195.3, 206.62, 206.07, 212.4, 210.88, 199.83, 202.25, 208.27, 205.57, 195.98, 208.98, 222.13, 212.81, 230.29, 238.42, 219.1, 208.08, 215.2, 206.83, 202.66, 199.98] },
      velocityScore: { '1D': -3.5, '1W': -5.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 53.5, revenueGrowth: 26, eps: 3.74, grossMargin: 23, dividendYield: 0.52,
      etfPresence: { AIRR: 3.12, PRN: false },
      tonyNote: 'BWX Technologies, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OC', name: 'Owens Corning', easyScore: 1, proScore: 2.18, coverage: 0.5,
      price: 119.74, weeklyPrices: [116.15, 117.35, 117.94, 118.90, 119.74], weeklyChange: 3.17, sortRank: 0, periodReturns: { '1M': -3.4, '6M': 5.7, '1Y': -10.3 },
      priceHistory: { '1W': [116.06, 117.42, 120.05, 122.25, 119.74], '1M': [123.97, 121.18, 123.34, 122.73, 116.89, 122.9, 123.03, 121.81, 121.67, 119.85, 118.56, 121.07, 114.08, 112.2, 107.95, 113.43, 116.06, 117.42, 120.05, 122.25, 119.74], '6M': [113.24, 113.63, 116, 114.54, 112.94, 116.21, 122.01, 120.89, 121.21, 124.96, 137.97, 134.36, 123.48, 116.85, 107.33, 107.86, 107.97, 107.26, 114.95, 116.58, 122.88, 121.18, 123.03, 118.56, 113.43, 119.74], '1Y': [133.53, 136.53, 137.72, 130.59, 137.23, 145.26, 147.44, 141.69, 144.44, 139.43, 147.17, 151.84, 148.51, 152.41, 155.59, 152.28, 145.57, 143.12, 138.72, 126.41, 126.3, 128.63, 124.86, 104.94, 102.7, 98.28, 113.24, 113.63, 116, 114.54, 112.94, 116.21, 123, 120.89, 121.21, 124.96, 137.97, 134.36, 123.48, 116.85, 107.33, 107.86, 107.97, 107.26, 114.95, 116.58, 122.88, 121.18, 123.03, 118.56, 113.43, 119.74] },
      velocityScore: { '1D': 0.9, '1W': 0.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: -10, eps: -4.74, grossMargin: 27, dividendYield: 2.42,
      etfPresence: { AIRR: 3.08, PRN: false },
      tonyNote: 'Owens Corning appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 1, proScore: 2.03, coverage: 0.5,
      price: 63.07, weeklyPrices: [61.18, 61.81, 62.12, 62.63, 63.07], weeklyChange: 15.36, sortRank: 0, periodReturns: { '1M': 2.3, '6M': -17.1, '1Y': 69 },
      priceHistory: { '1W': [54.67, 56.18, 56.8, 57.3, 63.07], '1M': [61.66, 59.56, 63.05, 62.05, 61.93, 59.31, 61.52, 57, 57.89, 56.99, 52.49, 54.85, 52.09, 54.22, 53.47, 55.82, 54.67, 56.18, 56.8, 57.3, 63.07], '6M': [76.1, 76.5, 75.96, 75.39, 77.47, 91.93, 119.72, 128.68, 118.06, 103.37, 93.48, 97.21, 88.23, 89.13, 88.92, 93.04, 79.98, 67.7, 68.33, 74.66, 68.61, 59.56, 61.52, 52.49, 55.82, 63.07], '1Y': [37.33, 40.1, 40.4, 42.16, 41.33, 44.66, 51.71, 58.91, 58.66, 58.7, 59.08, 69.12, 64.78, 68.51, 64.81, 69.2, 80.77, 86.28, 96.19, 94.63, 88.62, 89.32, 88.3, 72.41, 71.69, 67.31, 76.1, 76.5, 75.96, 75.39, 77.47, 91.93, 117.86, 128.68, 118.06, 103.37, 93.48, 97.21, 88.23, 89.13, 88.92, 93.04, 79.98, 67.7, 68.33, 74.66, 68.61, 59.56, 61.52, 52.49, 55.82, 63.07] },
      velocityScore: { '1D': 0, '1W': -1.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 371, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.87, PRN: false },
      tonyNote: 'Kratos Defense & Security Solutions, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 1, proScore: 2.02, coverage: 0.5,
      price: 321.17, weeklyPrices: [311.53, 314.75, 316.35, 318.92, 321.17], weeklyChange: 1.14, sortRank: 0, periodReturns: { '1M': -11.1, '6M': 2.4, '1Y': 42.4 },
      priceHistory: { '1W': [317.55, 320.63, 320.95, 317.56, 321.17], '1M': [361.4, 362.17, 364.29, 360.6, 363.37, 326.13, 319.54, 314.72, 316.28, 317.75, 334.22, 336.95, 326.17, 329.35, 324.6, 321.92, 317.55, 320.63, 320.95, 317.56, 321.17], '6M': [313.62, 304.58, 326.92, 336.64, 345.73, 367.6, 411.66, 415.58, 422.79, 429.64, 399.37, 424.89, 435.58, 437.03, 413.7, 427.99, 402.56, 393.32, 403.37, 398.13, 366.88, 362.17, 319.54, 334.22, 321.92, 321.17], '1Y': [225.6, 224.79, 226.15, 234.21, 239.83, 252.08, 258.18, 255.35, 263.33, 278.86, 266.45, 267.46, 266.48, 275.27, 271.13, 274.71, 275.13, 278.77, 284.24, 282.99, 282.66, 290.09, 319.07, 305.43, 312.67, 301.83, 313.62, 304.58, 326.92, 336.64, 345.73, 367.6, 398.25, 415.58, 422.79, 429.64, 399.37, 424.89, 435.58, 437.03, 413.7, 427.99, 402.56, 393.32, 403.37, 398.13, 366.88, 362.17, 319.54, 334.22, 321.92, 321.17] },
      velocityScore: { '1D': -1.9, '1W': -4.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 20.9, revenueGrowth: 13, eps: 15.4, grossMargin: 12, dividendYield: 1.74,
      etfPresence: { AIRR: 2.85, PRN: false },
      tonyNote: 'Huntington Ingalls Industries, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 1, proScore: 1.87, coverage: 0.5,
      price: 292.39, weeklyPrices: [283.62, 286.54, 288.00, 290.34, 292.39], weeklyChange: 7.99, sortRank: 0, periodReturns: { '1M': 14.4, '6M': 171.4, '1Y': 405.1 },
      priceHistory: { '1W': [270.75, 279.22, 291.97, 295.94, 292.39], '1M': [255.56, 253.49, 277.27, 275.33, 269.95, 294.69, 320.3, 305.93, 309.39, 322.05, 300.84, 296.98, 292.65, 266.8, 261.58, 271.05, 270.75, 279.22, 291.97, 295.94, 292.39], '6M': [107.74, 114.04, 112.36, 110.97, 111.96, 120, 133.04, 142.76, 147.43, 151.08, 190.09, 180.99, 183, 170.96, 171.73, 167.41, 194.85, 184.68, 230.81, 229.73, 242.77, 253.49, 320.3, 300.84, 271.05, 292.39], '1Y': [57.88, 59.14, 64.27, 59.64, 66.46, 72.55, 70.87, 78.84, 80.05, 79.03, 77.8, 85.17, 83.64, 90.42, 89.41, 95.89, 99.1, 96.99, 101.35, 100.35, 112.77, 113.88, 125.9, 125, 109.4, 98.12, 107.74, 114.04, 112.36, 110.97, 111.96, 120, 128.85, 142.76, 147.43, 151.08, 190.09, 180.99, 183, 170.96, 171.73, 167.41, 194.85, 184.68, 230.81, 229.73, 242.77, 253.49, 320.3, 300.84, 271.05, 292.39] },
      velocityScore: { '1D': 0.5, '1W': 2.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 57.1, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { AIRR: 2.64, PRN: false },
      tonyNote: 'Powell Industries, Inc. appears in 1 of 2 Industrials ETFs (50% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
