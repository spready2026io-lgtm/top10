// ── Index chart types & data ──────────────────────────────────────────────────

export type Period = '1W' | '1M' | '6M' | '1Y';

// Chart-only period union. 1D is an intraday view (vs. prior close) shown on the
// tile and index charts. It is NOT part of the core Period set used by the
// returns/benchmark structures (SPY_RET, TOP10_RET, ETF_RETURNS, BASE_INDEX),
// so adding it here does not cascade through those Record<Period, …> shapes.
export type ChartPeriod = '1D' | Period;

export type ChartPeriodData = {
  top10: number[];
  spy: number[];
  top10Return: number;
  spyReturn: number;
  xLabels: string[];
};

// Index chart data keyed by period. 1D is optional so the file compiles even if
// a price build hasn't produced intraday data yet (degrades to the other periods).
export type IndexChartByPeriod = Record<Period, ChartPeriodData> & { '1D'?: ChartPeriodData };

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

// @@GENERATED:SPY_RET@@
export const SPY_RET: Record<Period, number> = { '1W': 1.2, '1M': 1.1, '6M': 11.2, '1Y': 25.7 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 7.0 }, { t: 'AMD', w: 4.6 }, { t: 'MRVL', w: 4.3 }, { t: 'VRT', w: 3.6 }, { t: 'SIMO', w: 3.5 }],
  ARTY: [{ t: 'MU', w: 5.1 }, { t: 'CRWV', w: 4.9 }, { t: 'AMD', w: 4.7 }, { t: 'MRVL', w: 4.5 }, { t: 'AVGO', w: 4.4 }],
  BAI: [{ t: 'MU', w: 6.4 }, { t: 'AMD', w: 4.7 }, { t: 'LRCX', w: 4.6 }, { t: 'TSM', w: 4.3 }, { t: 'AVGO', w: 4.3 }],
  IGPT: [{ t: 'MU', w: 13.0 }, { t: 'INTC', w: 7.4 }, { t: 'AMD', w: 7.1 }, { t: 'GOOGL', w: 5.6 }, { t: 'NVDA', w: 5.3 }],
  IVES: [{ t: 'MU', w: 6.8 }, { t: 'TSM', w: 5.3 }, { t: 'AMD', w: 5.2 }, { t: 'NVDA', w: 4.7 }, { t: 'AAPL', w: 4.7 }],
  ALAI: [{ t: 'NVDA', w: 12.7 }, { t: 'TSM', w: 5.7 }, { t: 'AMZN', w: 5.5 }, { t: 'GOOG', w: 4.8 }, { t: 'MSFT', w: 4.8 }],
  CHAT: [{ t: 'NVDA', w: 6.4 }, { t: 'GOOGL', w: 5.1 }, { t: 'AVGO', w: 4.1 }, { t: 'MU', w: 4.1 }, { t: 'AMD', w: 3.9 }],
  AIFD: [{ t: 'MU', w: 6.7 }, { t: 'NVDA', w: 6.3 }, { t: 'MRVL', w: 6.3 }, { t: 'DOCN', w: 6.0 }, { t: 'LITE', w: 5.9 }],
  SPRX: [{ t: 'COHR', w: 8.6 }, { t: 'ARM', w: 8.6 }, { t: 'ALAB', w: 7.8 }, { t: 'KLAC', w: 7.3 }, { t: 'NET', w: 6.7 }],
  AOTG: [{ t: 'AMD', w: 15.9 }, { t: 'MU', w: 10.7 }, { t: 'NVDA', w: 10.6 }, { t: 'TSM', w: 7.3 }, { t: 'TOST', w: 4.5 }],
  SOXX: [{ t: 'MU', w: 8.4 }, { t: 'AMD', w: 7.5 }, { t: 'NVDA', w: 7.2 }, { t: 'AVGO', w: 6.6 }, { t: 'INTC', w: 6.1 }],
  PSI: [{ t: 'AMAT', w: 6.2 }, { t: 'KLAC', w: 5.9 }, { t: 'MU', w: 5.8 }, { t: 'LRCX', w: 5.5 }, { t: 'INTC', w: 4.9 }],
  XSD: [{ t: 'MXL', w: 5.7 }, { t: 'MRVL', w: 4.9 }, { t: 'ALAB', w: 4.6 }, { t: 'INTC', w: 3.9 }, { t: 'AMD', w: 3.8 }],
  DRAM: [{ t: 'SNDK', w: 5.5 }, { t: 'WDC', w: 4.4 }, { t: 'STX', w: 4.3 }, { t: 'MU', w: 3.7 }],
  PTF: [{ t: 'SNDK', w: 9.2 }, { t: 'WDC', w: 6.1 }, { t: 'STX', w: 5.3 }, { t: 'MU', w: 5.2 }, { t: 'NVDA', w: 4.2 }],
  WCLD: [{ t: 'DOCN', w: 3.8 }, { t: 'FROG', w: 2.9 }, { t: 'DDOG', w: 2.8 }, { t: 'PANW', w: 2.6 }, { t: 'CRWD', w: 2.5 }],
  IGV: [{ t: 'PANW', w: 8.9 }, { t: 'PLTR', w: 8.6 }, { t: 'MSFT', w: 8.3 }, { t: 'ORCL', w: 8.0 }, { t: 'CRWD', w: 6.6 }],
  FDTX: [{ t: 'MU', w: 9.4 }, { t: 'MRVL', w: 8.1 }, { t: 'TSM', w: 6.0 }, { t: 'NVDA', w: 4.6 }, { t: 'STX', w: 4.0 }],
  GTEK: [{ t: 'MRVL', w: 4.6 }, { t: 'DELL', w: 3.0 }, { t: 'CDNS', w: 2.5 }, { t: 'APH', w: 2.3 }, { t: 'NET', w: 2.0 }],
  ARKK: [{ t: 'TSLA', w: 9.5 }, { t: 'HOOD', w: 4.9 }, { t: 'CRSP', w: 4.9 }, { t: 'TEM', w: 4.8 }, { t: 'SPCX', w: 4.7 }],
  MARS: [{ t: 'SPCX', w: 24.1 }, { t: 'RKLB', w: 10.5 }, { t: 'ASTS', w: 7.1 }, { t: 'PL', w: 4.2 }, { t: 'GSAT', w: 4.2 }],
  FRWD: [{ t: 'STX', w: 8.3 }, { t: 'NVDA', w: 8.3 }, { t: 'AMD', w: 7.3 }, { t: 'LRCX', w: 6.1 }, { t: 'TSM', w: 5.7 }],
  BCTK: [{ t: 'SPCX', w: 10.8 }, { t: 'TSM', w: 7.9 }, { t: 'LRCX', w: 7.5 }, { t: 'AVGO', w: 6.4 }, { t: 'NVDA', w: 5.8 }],
  FWD: [{ t: 'SPCX', w: 2.2 }, { t: 'AMD', w: 2.0 }, { t: 'GOOGL', w: 2.0 }, { t: 'NVDA', w: 1.9 }, { t: 'LRCX', w: 1.9 }],
  CBSE: [{ t: 'SCI', w: 3.3 }, { t: 'NBIS', w: 3.2 }, { t: 'LRCX', w: 3.1 }, { t: 'KRYS', w: 2.9 }, { t: 'TXG', w: 2.9 }],
  FCUS: [{ t: 'SNDK', w: 5.1 }, { t: 'INTC', w: 5.0 }, { t: 'WDC', w: 4.8 }, { t: 'STX', w: 4.7 }, { t: 'SITM', w: 4.6 }],
  WGMI: [{ t: 'CIFR', w: 16.9 }, { t: 'IREN', w: 12.4 }, { t: 'WULF', w: 9.7 }, { t: 'CORZ', w: 7.4 }, { t: 'KEEL', w: 7.2 }],
  POW: [{ t: 'POWL', w: 4.7 }, { t: 'PWR', w: 4.7 }, { t: 'PRY', w: 4.3 }, { t: 'ETN', w: 3.9 }, { t: 'NVT', w: 3.8 }],
  VOLT: [{ t: 'BELFB', w: 7.6 }, { t: 'POWL', w: 7.3 }, { t: 'ETN', w: 5.4 }, { t: 'PWR', w: 5.2 }, { t: 'NEE', w: 4.9 }],
  PBD: [{ t: 'SEDG', w: 1.1 }, { t: 'RIVN', w: 1.1 }],
  PBW: [{ t: 'HYLN', w: 4.9 }, { t: 'FCEL', w: 4.1 }, { t: 'NVTS', w: 3.0 }, { t: 'BE', w: 2.6 }, { t: 'ASPN', w: 2.2 }],
  IVEP: [{ t: 'BE', w: 5.8 }, { t: 'GEV', w: 4.2 }, { t: 'VRT', w: 4.2 }, { t: 'PWR', w: 4.2 }, { t: 'SBGSY', w: 4.1 }],
  AIRR: [{ t: 'STRL', w: 6.3 }, { t: 'FIX', w: 4.5 }, { t: 'AGX', w: 4.5 }, { t: 'CHRW', w: 4.1 }, { t: 'MTZ', w: 3.9 }],
  PRN: [{ t: 'TTMI', w: 6.6 }, { t: 'FIX', w: 4.8 }, { t: 'AGX', w: 4.6 }, { t: 'STRL', w: 4.3 }, { t: 'VICR', w: 4.3 }],
  RSHO: [{ t: 'TKR', w: 8.7 }, { t: 'POWL', w: 7.4 }, { t: 'CGNX', w: 7.2 }, { t: 'CAT', w: 6.8 }, { t: 'GTES', w: 5.6 }],
  IDEF: [{ t: 'RTX', w: 8.1 }, { t: 'LMT', w: 6.8 }, { t: 'GD', w: 5.8 }, { t: 'BA', w: 5.0 }, { t: 'NOC', w: 4.8 }],
  BILT: [{ t: 'UNP', w: 5.6 }, { t: 'AENA', w: 4.6 }, { t: 'AEP', w: 4.3 }, { t: 'XEL', w: 3.9 }, { t: 'LNG', w: 3.5 }],
  BUZZ: [{ t: 'MU', w: 4.0 }, { t: 'NBIS', w: 3.6 }, { t: 'AMD', w: 3.4 }, { t: 'SOFI', w: 3.3 }, { t: 'NOW', w: 3.2 }],
  MEME: [{ t: 'AAOI', w: 6.9 }, { t: 'NBIS', w: 6.5 }, { t: 'BE', w: 6.1 }, { t: 'RDW', w: 5.9 }, { t: 'ASTS', w: 5.8 }],
  RKNG: [{ t: 'SNDK', w: 7.2 }, { t: 'MU', w: 5.8 }, { t: 'WDC', w: 5.3 }, { t: 'NVTS', w: 5.3 }, { t: 'NBIS', w: 5.2 }],
};
// @@END_GENERATED:ETF_TOP_HOLDINGS@@

// @@GENERATED:TOP10_RET@@
// Top10 composite returns per theme per period (average of all ETFs in theme)
const TOP10_RET: Record<Theme, Record<Period, number>> = {
  'AI & ML':         { '1W': 7.8, '1M': 17.6, '6M': 64.9, '1Y': 102.7 },
  'Semiconductors':  { '1W': 10.6, '1M': 32.1, '6M': 134.7, '1Y': 184.5 },
  'Broad Tech':      { '1W': 4, '1M': 10.1, '6M': 38.3, '1Y': 63.7 },
  'Electrification': { '1W': 4.5, '1M': 3.9, '6M': 37.2, '1Y': 63.5 },
  'Industrials':     { '1W': 1.1, '1M': 4.8, '6M': 29, '1Y': 46.5 },
  'Meme':            { '1W': 4.3, '1M': 11.8, '6M': 39.7, '1Y': 18.2 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, IndexChartByPeriod> = {
  'AI & ML': {
    '1D': { top10: [100, 103.03, 103.15, 103.44, 103.8, 103.87, 104.16, 103.96, 103.68, 103.91, 103.93, 104.12, 103.98, 104.09, 104.14, 104.27, 104.24, 104.22, 104.07, 104.02, 104, 104.25, 104.62, 104.38], spy: [100, 100.67, 100.79, 100.96, 101.01, 101.03, 100.96, 100.86, 100.78, 100.93, 100.96, 101.1, 101, 101.15, 101.15, 101.11, 101.03, 101.02, 100.97, 101.03, 100.87, 100.94, 101.07, 101.04], top10Return: 4.3, spyReturn: 1.04, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.68, 105.96, 102.84, 107.79], spy: [100, 100.54, 102.31, 101.7, 101.22], top10Return: 7.8, spyReturn: 1.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.27, 102.45, 104.91, 105.89, 110.15, 109.95, 111.95, 112.93, 116.25, 117.34, 115.52, 105.59, 108.96, 106.78, 103.41, 109.04, 109.8, 115.56, 112.11, 117.61], spy: [100, 99.33, 100.35, 100.55, 100.95, 101.62, 101.6, 102.16, 102.41, 102.69, 102.11, 102.5, 99.85, 100.08, 99.78, 98.21, 99.88, 100.42, 102.19, 101.58, 101.1], top10Return: 17.6, spyReturn: 1.1, xLabels: ["May 22", "May 29", "Jun 5", "Jun 12", "Jun 19"] },
    '6M': { top10: [100, 107.08, 107.4, 109.03, 110.42, 110.29, 110.51, 110.13, 107.52, 109.4, 104.88, 107.55, 108.79, 106.81, 96.75, 106.42, 119.67, 123.84, 125.32, 135.58, 141.63, 138.05, 153.44, 164.05, 144.17, 164.85], spy: [100, 102.83, 101.75, 103.38, 103.02, 103.18, 103.58, 103.36, 101.71, 102.38, 101.33, 100.86, 99.91, 97.61, 94.13, 98.19, 103.43, 104.87, 106, 107.8, 109.95, 109.28, 111.78, 112.34, 108.05, 111.22], top10Return: 64.9, spyReturn: 11.2, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 105.61, 105.66, 106.42, 109.93, 111.3, 109.73, 113.97, 114.66, 112.85, 114.19, 117.39, 123.73, 126.92, 124.54, 128.99, 127.62, 130.02, 134.28, 138.46, 131.28, 127.34, 119.96, 129.16, 131.9, 127.86, 128.56, 129.93, 134.31, 134.98, 131.85, 138.14, 133.48, 133.99, 133.03, 136.57, 131.65, 133.06, 132.39, 130.06, 125.03, 137.13, 147.58, 156.58, 155.44, 172.25, 178.7, 169.46, 188.56, 201.66, 177.11, 202.73], spy: [100, 103.47, 104.44, 105.14, 105.8, 107.21, 104.62, 107.22, 108.27, 108.59, 108.54, 109.18, 111.21, 111.68, 111.37, 112.61, 109.88, 111.8, 113.96, 114.77, 112.9, 113.07, 109.8, 114.99, 115.38, 114.72, 114.52, 115.75, 116.41, 116.74, 114.02, 117.03, 116.03, 116.46, 115.48, 116.64, 115.29, 113.81, 111.3, 109.91, 109.43, 113.75, 117.78, 119.68, 119.74, 123.48, 124.91, 123.47, 126.28, 126.92, 122.07, 125.65], top10Return: 102.7, spyReturn: 25.7, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Semiconductors': {
    '1D': { top10: [100, 105.41, 106.05, 106.53, 106.86, 107.13, 107.32, 107, 106.64, 107.09, 107.12, 107.3, 107.17, 107.47, 107.42, 107.5, 107.35, 107.44, 107.39, 107.47, 107.4, 107.61, 108.12, 107.49], spy: [100, 100.67, 100.79, 100.96, 101.01, 101.03, 100.96, 100.86, 100.78, 100.93, 100.96, 101.1, 101, 101.15, 101.15, 101.11, 101.03, 101.02, 100.97, 101.03, 100.87, 100.94, 101.07, 101.04], top10Return: 7.5, spyReturn: 1.04, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 101.45, 107.43, 101.84, 110.64], spy: [100, 100.54, 102.31, 101.7, 101.22], top10Return: 10.6, spyReturn: 1.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100.43, 104.85, 107.4, 109.08, 117.33, 116.36, 117.72, 116.64, 118.36, 125.49, 122.15, 107.67, 114.13, 112.33, 108.52, 119.13, 120.78, 128.06, 121.44, 132.13], spy: [100, 99.33, 100.35, 100.55, 100.95, 101.62, 101.6, 102.16, 102.41, 102.69, 102.11, 102.5, 99.85, 100.08, 99.78, 98.21, 99.88, 100.42, 102.19, 101.58, 101.1], top10Return: 32.1, spyReturn: 1.1, xLabels: ["May 22", "May 29", "Jun 5", "Jun 12", "Jun 19"] },
    '6M': { top10: [100, 106.36, 110.76, 116.12, 119.96, 120.28, 122.06, 126.13, 126.51, 129.68, 126.07, 131.06, 135.5, 133.94, 129.23, 134.94, 150.26, 159.13, 169.96, 191.01, 201.29, 183.76, 205.75, 218.5, 205.01, 234.72], spy: [100, 102.83, 101.75, 103.38, 103.02, 103.18, 103.58, 103.36, 101.71, 102.38, 101.33, 100.86, 99.91, 97.61, 94.13, 98.19, 103.43, 104.87, 106, 107.8, 109.95, 109.28, 111.78, 112.34, 108.05, 111.22], top10Return: 134.7, spyReturn: 11.2, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 105.68, 106.36, 110.38, 112.07, 109.97, 109.48, 113.54, 114.47, 116.35, 116.55, 118.11, 121.32, 127.07, 125.96, 130.47, 127.7, 133.32, 136.36, 140.2, 136.56, 134.98, 131.51, 143.95, 147.27, 149.88, 148.42, 152.07, 160.07, 158.74, 158.52, 161.88, 162.08, 169.08, 168.58, 179.15, 170.39, 171.1, 170.6, 177.89, 174.52, 187.97, 194.75, 198.53, 209.43, 228.98, 235.72, 232.32, 256.02, 271.76, 244.69, 284.52], spy: [100, 103.47, 104.44, 105.14, 105.8, 107.21, 104.62, 107.22, 108.27, 108.59, 108.54, 109.18, 111.21, 111.68, 111.37, 112.61, 109.88, 111.8, 113.96, 114.77, 112.9, 113.07, 109.8, 114.99, 115.38, 114.72, 114.52, 115.75, 116.41, 116.74, 114.02, 117.03, 116.03, 116.46, 115.48, 116.64, 115.29, 113.81, 111.3, 109.91, 109.43, 113.75, 117.78, 119.68, 119.74, 123.48, 124.91, 123.47, 126.28, 126.92, 122.07, 125.65], top10Return: 184.5, spyReturn: 25.7, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Broad Tech': {
    '1D': { top10: [100, 100.72, 100.91, 101.1, 101.34, 101.56, 101.65, 101.34, 101.15, 101.52, 101.37, 101.48, 101.43, 101.62, 101.59, 101.71, 101.67, 101.58, 101.5, 101.54, 101.39, 101.58, 101.94, 102.05], spy: [100, 100.67, 100.79, 100.96, 101.01, 101.03, 100.96, 100.86, 100.78, 100.93, 100.96, 101.1, 101, 101.15, 101.15, 101.11, 101.03, 101.02, 100.97, 101.03, 100.87, 100.94, 101.07, 101.04], top10Return: 2.4, spyReturn: 1.04, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.26, 103.89, 102.02, 103.99], spy: [100, 100.54, 102.31, 101.7, 101.22], top10Return: 4, spyReturn: 1.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.28, 101.69, 103.47, 104.94, 108.25, 108.27, 109.99, 110.67, 112.81, 112.19, 111.87, 103.69, 105.81, 103.6, 101.07, 105.64, 106, 109.88, 107.9, 110.09], spy: [100, 99.33, 100.35, 100.55, 100.95, 101.62, 101.6, 102.16, 102.41, 102.69, 102.11, 102.5, 99.85, 100.08, 99.78, 98.21, 99.88, 100.42, 102.19, 101.58, 101.1], top10Return: 10.1, spyReturn: 1.1, xLabels: ["May 22", "May 29", "Jun 5", "Jun 12", "Jun 19"] },
    '6M': { top10: [100, 105.05, 104.21, 107.42, 108.41, 108.09, 104.6, 105.56, 103.78, 105.68, 104.47, 104.29, 104.28, 103.32, 96.39, 104.05, 112.72, 117.09, 116.83, 126.41, 129.56, 124.83, 134.44, 139.21, 126.73, 138.31], spy: [100, 102.83, 101.75, 103.38, 103.02, 103.18, 103.58, 103.36, 101.71, 102.38, 101.33, 100.86, 99.91, 97.61, 94.13, 98.19, 103.43, 104.87, 106, 107.8, 109.95, 109.28, 111.78, 112.34, 108.05, 111.22], top10Return: 38.3, spyReturn: 11.2, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 103.48, 106.11, 106.6, 108.51, 109.73, 105.97, 106.97, 108.08, 108.79, 110.53, 110.78, 116.71, 121.31, 119.61, 125.58, 126.36, 128.56, 131.87, 132.15, 127.94, 119.56, 114.14, 124.05, 124.04, 121.15, 120.83, 119.71, 125.51, 127.95, 125.89, 130.1, 124.99, 125.39, 125.27, 128.39, 126.75, 125.08, 125.66, 125.47, 122.9, 130.39, 136.16, 140.8, 136.65, 150.25, 151.21, 144.69, 157.86, 163.07, 150.28, 163.72], spy: [100, 103.47, 104.44, 105.14, 105.8, 107.21, 104.62, 107.22, 108.27, 108.59, 108.54, 109.18, 111.21, 111.68, 111.37, 112.61, 109.88, 111.8, 113.96, 114.77, 112.9, 113.07, 109.8, 114.99, 115.38, 114.72, 114.52, 115.75, 116.41, 116.74, 114.02, 117.03, 116.03, 116.46, 115.48, 116.64, 115.29, 113.81, 111.3, 109.91, 109.43, 113.75, 117.78, 119.68, 119.74, 123.48, 124.91, 123.47, 126.28, 126.92, 122.07, 125.65], top10Return: 63.7, spyReturn: 25.7, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Electrification': {
    '1D': { top10: [100, 101.23, 101.1, 101.13, 101.41, 101.88, 102.04, 102, 101.85, 101.83, 101.99, 101.84, 101.96, 102.09, 102.06, 102.12, 101.9, 101.88, 101.79, 101.84, 101.82, 101.9, 102.28, 102.6], spy: [100, 100.67, 100.79, 100.96, 101.01, 101.03, 100.96, 100.86, 100.78, 100.93, 100.96, 101.1, 101, 101.15, 101.15, 101.11, 101.03, 101.02, 100.97, 101.03, 100.87, 100.94, 101.07, 101.04], top10Return: 2.3, spyReturn: 1.04, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.95, 103.22, 102.15, 104.46], spy: [100, 100.54, 102.31, 101.7, 101.22], top10Return: 4.5, spyReturn: 1.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 97.94, 100.31, 103.13, 104.56, 107.76, 106.89, 107.01, 105.87, 105.53, 106.58, 106.49, 99.83, 99.95, 98.73, 95.53, 99.45, 100.4, 102.66, 101.6, 103.91], spy: [100, 99.33, 100.35, 100.55, 100.95, 101.62, 101.6, 102.16, 102.41, 102.69, 102.11, 102.5, 99.85, 100.08, 99.78, 98.21, 99.88, 100.42, 102.19, 101.58, 101.1], top10Return: 3.9, spyReturn: 1.1, xLabels: ["May 22", "May 29", "Jun 5", "Jun 12", "Jun 19"] },
    '6M': { top10: [100, 104.17, 105.78, 106.69, 111.64, 112.68, 112.65, 116.51, 117.69, 120.56, 115.51, 114.86, 117.01, 115.87, 111.33, 114.9, 124.89, 126.98, 129.85, 138.01, 138.55, 129.36, 140.15, 139.7, 127.61, 137.15], spy: [100, 102.83, 101.75, 103.38, 103.02, 103.18, 103.58, 103.36, 101.71, 102.38, 101.33, 100.86, 99.91, 97.61, 94.13, 98.19, 103.43, 104.87, 106, 107.8, 109.95, 109.28, 111.78, 112.34, 108.05, 111.22], top10Return: 37.2, spyReturn: 11.2, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.75, 106.1, 108.17, 111.24, 113.43, 107.86, 111.32, 113.76, 115.98, 115.44, 114.7, 117.03, 121.05, 121.9, 129.28, 128.58, 132.72, 135.81, 136.39, 135.19, 131.31, 126.5, 135.66, 135.99, 135.13, 136.34, 136.18, 138.66, 141.95, 142.86, 148.1, 146.82, 147.18, 147.73, 151.08, 147.77, 148.41, 147.82, 152.17, 150.26, 157.44, 164.14, 169.69, 167.4, 176.5, 181.08, 169.28, 183.5, 182.07, 164.82, 176.78], spy: [100, 103.47, 104.44, 105.14, 105.8, 107.21, 104.62, 107.22, 108.27, 108.59, 108.54, 109.18, 111.21, 111.68, 111.37, 112.61, 109.88, 111.8, 113.96, 114.77, 112.9, 113.07, 109.8, 114.99, 115.38, 114.72, 114.52, 115.75, 116.41, 116.74, 114.02, 117.03, 116.03, 116.46, 115.48, 116.64, 115.29, 113.81, 111.3, 109.91, 109.43, 113.75, 117.78, 119.68, 119.74, 123.48, 124.91, 123.47, 126.28, 126.92, 122.07, 125.65], top10Return: 63.5, spyReturn: 25.7, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Industrials': {
    '1D': { top10: [100, 101.36, 100.63, 100.5, 100.68, 100.79, 100.6, 100.41, 100.23, 100.51, 100.6, 100.56, 100.64, 100.86, 100.75, 100.67, 100.69, 100.58, 100.55, 100.57, 100.42, 100.47, 100.64, 100.84], spy: [100, 100.67, 100.79, 100.96, 101.01, 101.03, 100.96, 100.86, 100.78, 100.93, 100.96, 101.1, 101, 101.15, 101.15, 101.11, 101.03, 101.02, 100.97, 101.03, 100.87, 100.94, 101.07, 101.04], top10Return: 0.7, spyReturn: 1.04, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.32, 100.55, 100.58, 101.13], spy: [100, 100.54, 102.31, 101.7, 101.22], top10Return: 1.1, spyReturn: 1.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.83, 100.73, 100.93, 101.85, 104.38, 104.38, 104.87, 104.19, 102.66, 103.75, 104.74, 101.82, 101.98, 102.09, 99.34, 103.55, 103.9, 104.17, 104.19, 104.8], spy: [100, 99.33, 100.35, 100.55, 100.95, 101.62, 101.6, 102.16, 102.41, 102.69, 102.11, 102.5, 99.85, 100.08, 99.78, 98.21, 99.88, 100.42, 102.19, 101.58, 101.1], top10Return: 4.8, spyReturn: 1.1, xLabels: ["May 22", "May 29", "Jun 5", "Jun 12", "Jun 19"] },
    '6M': { top10: [100, 104.64, 104.7, 109.23, 113.92, 112.94, 113.18, 119.1, 120.25, 122.55, 119.74, 116.67, 115.69, 114.03, 108.96, 115.92, 123.28, 122.06, 121.98, 126.58, 126.97, 121.14, 128.16, 127.55, 121.84, 129.05], spy: [100, 102.83, 101.75, 103.38, 103.02, 103.18, 103.58, 103.36, 101.71, 102.38, 101.33, 100.86, 99.91, 97.61, 94.13, 98.19, 103.43, 104.87, 106, 107.8, 109.95, 109.28, 111.78, 112.34, 108.05, 111.22], top10Return: 29, spyReturn: 11.2, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 103.72, 104.98, 106.29, 106.33, 108.99, 106.18, 108.4, 108.25, 109.7, 109.92, 110.74, 112.74, 113.7, 113.71, 115.83, 113, 114.54, 118.23, 118.35, 115.32, 112.25, 108.87, 114.25, 115.06, 116.45, 116.62, 117.63, 122.71, 126.7, 128, 130.41, 131.96, 135.63, 136.77, 137.49, 136.1, 130.89, 129.17, 130.55, 128.65, 136.51, 137.36, 139.52, 136.86, 146.58, 143.82, 137.53, 145.03, 144.77, 138.23, 146.53], spy: [100, 103.47, 104.44, 105.14, 105.8, 107.21, 104.62, 107.22, 108.27, 108.59, 108.54, 109.18, 111.21, 111.68, 111.37, 112.61, 109.88, 111.8, 113.96, 114.77, 112.9, 113.07, 109.8, 114.99, 115.38, 114.72, 114.52, 115.75, 116.41, 116.74, 114.02, 117.03, 116.03, 116.46, 115.48, 116.64, 115.29, 113.81, 111.3, 109.91, 109.43, 113.75, 117.78, 119.68, 119.74, 123.48, 124.91, 123.47, 126.28, 126.92, 122.07, 125.65], top10Return: 46.5, spyReturn: 25.7, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Meme': {
    '1D': { top10: [100, 100.44, 99.88, 100.83, 101.55, 102, 102.55, 102.47, 101.83, 101.86, 101.95, 101.78, 101.59, 101.52, 101.62, 101.85, 101.63, 101.44, 101.42, 101.33, 101.19, 101.74, 102.47, 103.06], spy: [100, 100.67, 100.79, 100.96, 101.01, 101.03, 100.96, 100.86, 100.78, 100.93, 100.96, 101.1, 101, 101.15, 101.15, 101.11, 101.03, 101.02, 100.97, 101.03, 100.87, 100.94, 101.07, 101.04], top10Return: 3.5, spyReturn: 1.04, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 98.71, 104.22, 100.13, 104.32], spy: [100, 100.54, 102.31, 101.7, 101.22], top10Return: 4.3, spyReturn: 1.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.45, 102.26, 108.47, 111.06, 114.79, 116.5, 118.62, 116.99, 117.19, 115.91, 116.55, 104.59, 107.27, 103.43, 100.6, 107.16, 105.76, 111.69, 107.28, 111.83], spy: [100, 99.33, 100.35, 100.55, 100.95, 101.62, 101.6, 102.16, 102.41, 102.69, 102.11, 102.5, 99.85, 100.08, 99.78, 98.21, 99.88, 100.42, 102.19, 101.58, 101.1], top10Return: 11.8, spyReturn: 1.1, xLabels: ["May 22", "May 29", "Jun 5", "Jun 12", "Jun 19"] },
    '6M': { top10: [100, 108.07, 105.27, 111.38, 112.22, 106.84, 103.57, 103.19, 96.92, 99.7, 95.7, 95.64, 98.61, 98.95, 92.19, 100.29, 114.78, 120.61, 114.54, 127.5, 129.37, 129.06, 147.58, 141.59, 128.44, 139.69], spy: [100, 102.83, 101.75, 103.38, 103.02, 103.18, 103.58, 103.36, 101.71, 102.38, 101.33, 100.86, 99.91, 97.61, 94.13, 98.19, 103.43, 104.87, 106, 107.8, 109.95, 109.28, 111.78, 112.34, 108.05, 111.22], top10Return: 39.7, spyReturn: 11.2, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 103.29, 101.27, 96.72, 97.46, 92.89, 93.14, 90.26, 86.99, 84.67, 85.51, 86.6, 91.22, 91.76, 88.45, 91.02, 92.16, 90.4, 95.86, 96.73, 92.7, 91.22, 86.24, 84.95, 87.8, 88.38, 87.03, 88.07, 92.44, 94.1, 91.45, 94.25, 93.61, 91.75, 90.24, 90.26, 93.31, 95.59, 100.96, 100.99, 95.87, 93.97, 104.42, 110.53, 112.37, 112.56, 118.94, 116.17, 117.71, 116.3, 112.84, 118.26], spy: [100, 103.47, 104.44, 105.14, 105.8, 107.21, 104.62, 107.22, 108.27, 108.59, 108.54, 109.18, 111.21, 111.68, 111.37, 112.61, 109.88, 111.8, 113.96, 114.77, 112.9, 113.07, 109.8, 114.99, 115.38, 114.72, 114.52, 115.75, 116.41, 116.74, 114.02, 117.03, 116.03, 116.46, 115.48, 116.64, 115.29, 113.81, 111.3, 109.91, 109.43, 113.75, 117.78, 119.68, 119.74, 123.48, 124.91, 123.47, 126.28, 126.92, 122.07, 125.65], top10Return: 18.2, spyReturn: 25.7, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
};
// @@END_GENERATED:INDEX_CHART_DATA@@

// ── Types ─────────────────────────────────────────────────────────────────────

export type Theme = 'AI & ML' | 'Semiconductors' | 'Broad Tech' | 'Electrification' | 'Industrials' | 'Meme';

export type Equity = {
  ticker: string;
  name: string;
  easyScore: number;      // raw count of theme ETFs holding this stock
  avgWeight?: number;     // raw average weight across ETFs holding this stock (absent on pre-upgrade data)
  proScore: number;       // breadth-weighted score: avgWeight × coverage
  coverage: number;       // 0-1: fraction of available ETFs holding this stock
  price: number;
  weeklyPrices: number[];
  weeklyChange: number;
  dayChange?: number;     // today's % move vs. prior close (1D); refreshed intraday by the 3×/day price jobs
  periodReturns: { '1M': number; '6M': number; '1Y': number };
  priceHistory?: { '1D'?: number[]; '1W': number[]; '1M': number[]; '6M': number[]; '1Y': number[] };
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

// One row in the cross-theme "Top 10 Across All Themes" breadth ranking.
// Ranked by how many themes a stock appears in (institutional conviction breadth).
// Meme theme is excluded from this board.
export type CrossThemeEntry = {
  ticker: string;
  name: string;
  themeCount: number;        // number of themes this stock appears in
  themes: Theme[];           // which themes
  aggregateScore: number;    // sum of proScore across all themes it appears in
  bestProScore: number;      // highest single-theme proScore
  avgProScore: number;       // average proScore across themes (aggregateScore / themeCount)
  price: number;
  weeklyChange: number;
};

// ── Theme configuration ───────────────────────────────────────────────────────

export const THEMES: Theme[] = ['AI & ML', 'Semiconductors', 'Broad Tech', 'Electrification', 'Industrials', 'Meme'];

// Last scan timestamp — patched by build-data-ts.js after each run
// @@GENERATED:SCAN_TIMESTAMP@@
export const SCAN_TIMESTAMP    = '2026-06-19T13:37:22.673Z';
export const SCAN_TIMESTAMP_NY = 'June 19, 2026 at 9:37 AM ET';
// @@END_GENERATED:SCAN_TIMESTAMP@@

// Number of ETFs per theme — denominator for Coverage Score display (x/n badge)
// @@GENERATED:THEME_ETF_COUNT@@
export const THEME_ETF_COUNT: Record<Theme, number> = {
  'AI & ML':         10,
  'Semiconductors':  4,
  'Broad Tech':      13,
  'Electrification': 5,
  'Industrials':     5,
  'Meme':            3,
};
// @@END_GENERATED:THEME_ETF_COUNT@@

// @@GENERATED:HOLDINGS_COUNT@@
// Total holdings rows across all theme ETFs (every position, counting a stock
// once per ETF that holds it). Powers the home carousel's "shares tracked" stat.
export const HOLDINGS_COUNT = 1191;
// @@END_GENERATED:HOLDINGS_COUNT@@

export const THEME_ETFS: Record<Theme, string[]> = {
  'AI & ML':        ['AIS', 'ARTY', 'BAI', 'IGPT', 'IVES', 'ALAI', 'CHAT', 'AIFD', 'SPRX', 'AOTG'],
  'Semiconductors': ['SOXX', 'PSI', 'XSD', 'DRAM'],
  'Broad Tech':     ['PTF', 'WCLD', 'IGV', 'FDTX', 'GTEK', 'ARKK', 'MARS', 'FRWD', 'BCTK', 'FWD', 'CBSE', 'FCUS', 'WGMI'],
  'Electrification':['POW', 'VOLT', 'PBD', 'PBW', 'IVEP'],
  'Industrials':    ['AIRR', 'PRN', 'RSHO', 'IDEF', 'BILT'],
  'Meme':           ['BUZZ', 'MEME', 'RKNG'],
};

// Primary benchmark ETF per theme — shown in validation strip
export const THEME_BENCHMARK_ETF: Record<Theme, string> = {
  'AI & ML':        'ARTY',
  'Semiconductors': 'SOXX',
  'Broad Tech':     'QQQ',
  'Electrification':'PBD',
  'Industrials':    'AIRR',
  'Meme':           'BUZZ',
};

// Weekly return of the primary benchmark ETF
// @@GENERATED:THEME_BENCHMARKS@@
export const THEME_BENCHMARKS: Record<Theme, number> = {
  'AI & ML':         8.5,
  'Semiconductors':  5.9,
  'Broad Tech':      2.9,
  'Electrification': 2.2,
  'Industrials':     3.3,
  'Meme':            7.5,
};
// @@END_GENERATED:THEME_BENCHMARKS@@

// Top 10 stocks across ALL themes, ranked by cross-theme breadth (excludes Meme).
// Populated by build-data-ts.js on each run.
// @@GENERATED:CROSS_THEME_TOP10@@
export const CROSS_THEME_TOP10: CrossThemeEntry[] = [
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 13.97, bestProScore: 6.08, avgProScore: 4.66, price: 1133.99, weeklyChange: 13.87 },
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 11.54, bestProScore: 6.03, avgProScore: 3.85, price: 210.69, weeklyChange: 2.84 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 10.38, bestProScore: 4.77, avgProScore: 3.46, price: 537.37, weeklyChange: 10.02 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 6.19, bestProScore: 2.92, avgProScore: 2.06, price: 411.35, weeklyChange: 6.69 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 5.24, bestProScore: 3.72, avgProScore: 2.62, price: 133.99, weeklyChange: 14.56 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.88, bestProScore: 2.59, avgProScore: 2.44, price: 310.58, weeklyChange: 10.64 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 4.77, bestProScore: 2.77, avgProScore: 2.38, price: 297.20, weeklyChange: 2.31 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.73, bestProScore: 2.91, avgProScore: 2.37, price: 462.12, weeklyChange: 9.75 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.90, bestProScore: 2.47, avgProScore: 1.95, price: 389.04, weeklyChange: 7.32 },
  { ticker: 'WDC', name: `Western Digital Corp`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 3.37, bestProScore: 1.81, avgProScore: 1.69, price: 746.23, weeklyChange: 40.99 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': 12.2, '1M': 30.2, '6M': 144.3, '1Y': 224.9 },
  ARTY: { '1W': 8.8, '1M': 22.4, '6M': 71.4, '1Y': 105.3 },
  BAI:  { '1W': 8.9, '1M': 16.9, '6M': 68.5, '1Y': 97.3 },
  IGPT: { '1W': 9.8, '1M': 22.7, '6M': 89.5, '1Y': 129.6 },
  IVES: { '1W': 2.9, '1M': 5.3, '6M': 24.6, '1Y': 47.1 },
  ALAI: { '1W': 8.6, '1M': 11.6, '6M': 32.3, '1Y': 61.4 },
  CHAT: { '1W': 10.7, '1M': 21.6, '6M': 79.8, '1Y': 122.3 },
  AIFD: { '1W': 3.9, '1M': 12.1, '6M': 54.7, '1Y': 91 },
  SPRX: { '1W': 6.3, '1M': 23.7, '6M': 63.4, '1Y': 109.3 },
  AOTG: { '1W': 5.6, '1M': 9.7, '6M': 20, '1Y': 39.2 },
  // Semiconductors
  SOXX: { '1W': 8.9, '1M': 29, '6M': 124.2, '1Y': 184.1 },
  PSI:  { '1W': 9.3, '1M': 24.7, '6M': 135.6, '1Y': 217.1 },
  XSD:  { '1W': 6.5, '1M': 19.4, '6M': 102.8, '1Y': 160.6 },
  DRAM: { '1W': 17.8, '1M': 55.5, '6M': 176.3, '1Y': 176.3 },
  // Broad Tech
  PTF:  { '1W': 7.3, '1M': 19.6, '6M': 88.7, '1Y': 110.6 },
  WCLD: { '1W': -3.7, '1M': 0.2, '6M': -15.2, '1Y': -14.7 },
  IGV:  { '1W': -2, '1M': -4.1, '6M': -14.9, '1Y': -15.2 },
  FDTX: { '1W': 6.6, '1M': 19.4, '6M': 47.9, '1Y': 57.4 },
  GTEK: { '1W': 5.7, '1M': 16.9, '6M': 61.8, '1Y': 81.7 },
  ARKK: { '1W': 6.3, '1M': 7.6, '6M': 3.2, '1Y': 18.4 },
  MARS: { '1W': -9.8, '1M': -12.7, '6M': 32.5, '1Y': 32.5 },
  FRWD: { '1W': 8.2, '1M': 16.3, '6M': 38.4, '1Y': 38.4 },
  BCTK: { '1W': 6.6, '1M': 11.1, '6M': 32.8, '1Y': 29.6 },
  FWD:  { '1W': 5.6, '1M': 11.9, '6M': 45.8, '1Y': 74.5 },
  CBSE: { '1W': 4.6, '1M': 6.8, '6M': 32.8, '1Y': 45.3 },
  FCUS: { '1W': 3.6, '1M': 8.3, '6M': 47, '1Y': 81.9 },
  WGMI: { '1W': 12.8, '1M': 29.8, '6M': 97.5, '1Y': 288.1 },
  // Electrification
  POW:  { '1W': 4.5, '1M': 4.8, '6M': 62.2, '1Y': 54.3 },
  VOLT: { '1W': 5.7, '1M': 6.9, '6M': 45.3, '1Y': 68.2 },
  PBD:  { '1W': 0.2, '1M': -3.3, '6M': 28.6, '1Y': 68 },
  PBW:  { '1W': 4.6, '1M': 6, '6M': 39.2, '1Y': 116.6 },
  IVEP: { '1W': 7.3, '1M': 5.1, '6M': 10.5, '1Y': 10.5 },
  // Industrials
  AIRR: { '1W': 2, '1M': 4.7, '6M': 34.6, '1Y': 68.1 },
  PRN:  { '1W': 5.5, '1M': 10.1, '6M': 53, '1Y': 69.6 },
  RSHO: { '1W': 4.9, '1M': 12.6, '6M': 40.9, '1Y': 64.3 },
  IDEF: { '1W': -1.5, '1M': 0.4, '6M': 8.4, '1Y': 20 },
  BILT: { '1W': -5.2, '1M': -3.9, '6M': 8.2, '1Y': 10.5 },
  // Meme
  BUZZ: { '1W': 3, '1M': 5.3, '6M': 20.1, '1Y': 32.8 },
  MEME: { '1W': 1.5, '1M': 10.9, '6M': 82.4, '1Y': 5.3 },
  RKNG: { '1W': 8.5, '1M': 19.3, '6M': 16.6, '1Y': 16.6 },
};
// @@END_GENERATED:ETF_RETURNS@@

// @@GENERATED:ETF_DAY_CHANGE@@
// Today's % move per ETF ticker (1D, vs prior close). Refreshed by the 3×/day
// price jobs. Powers the 1D ranking in the theme-ETF side panel.
export const ETF_DAY_CHANGE: Record<string, number> = {
  AIS:  7.08,
  ARTY: 4.25,
  BAI:  5.62,
  IGPT: 5.56,
  IVES: 1.77,
  ALAI: 2.93,
  CHAT: 5.65,
  AIFD: 2.47,
  SPRX: 4.1,
  AOTG: 3.24,
  SOXX: 6.62,
  PSI:  6.42,
  XSD:  7.26,
  DRAM: 9.66,
  PTF:  3.85,
  WCLD: -0.24,
  IGV:  -0.08,
  FDTX: 3.2,
  GTEK: 3.68,
  ARKK: 2.17,
  MARS: -2.32,
  FRWD: 3.13,
  BCTK: 2.53,
  FWD:  3.31,
  CBSE: 4,
  FCUS: 2.58,
  WGMI: 4.89,
  POW:  1.23,
  VOLT: 2.06,
  PBD:  1.06,
  PBW:  3.9,
  IVEP: 3.21,
  AIRR: 1.28,
  PRN:  1.46,
  RSHO: 2.25,
  IDEF: -1.64,
  BILT: 0.05,
  BUZZ: 2.29,
  MEME: 3.82,
  RKNG: 4.31,
};
// @@END_GENERATED:ETF_DAY_CHANGE@@

// ── Portfolio builder: base index + theme representatives ───────────────────────

// Selectable index core for the portfolio builder.
export type BaseIndexId = 'SPY' | 'QQQ';

// A theme's representative ETF pair for the builder dial: the average of the two
// highest (0.5*6M + 0.5*1Y) performing, non-correlated ETFs in the theme. The
// blended price series and its endpoint return drive the dial + performance line.
export type ThemeRep = {
  etfs: string[];
  series: Record<Period, number[]>;
  returns: Record<Period, number>;
};

// @@GENERATED:BASE_INDEX@@
export const BASE_INDEX_NAMES: Record<BaseIndexId, string> = { SPY: 'S&P 500', QQQ: 'Nasdaq 100' };
export const BASE_INDEX_HOLDINGS: Record<BaseIndexId, EtfHolding[]> = {
  SPY: [{ t: 'NVDA', w: 7.81 }, { t: 'AAPL', w: 6.7 }, { t: 'MSFT', w: 4.55 }, { t: 'AMZN', w: 3.65 }, { t: 'GOOGL', w: 3.3 }],
  QQQ: [{ t: 'NVDA', w: 8.16 }, { t: 'AAPL', w: 6.87 }, { t: 'MU', w: 5.33 }, { t: 'MSFT', w: 4.68 }, { t: 'AMZN', w: 4.17 }],
};
export const BASE_INDEX_CHART: Record<BaseIndexId, Record<Period, number[]>> = {
  SPY: { '1W': [100, 100.54, 102.31, 101.7, 101.77], '1M': [100, 99.33, 100.35, 100.55, 100.95, 101.62, 101.6, 102.16, 102.41, 102.69, 102.11, 102.5, 99.85, 100.08, 99.78, 98.21, 99.88, 100.42, 102.19, 101.58, 101.64], '6M': [100, 102.83, 101.75, 103.38, 103.02, 103.18, 103.58, 103.36, 101.71, 102.38, 101.33, 100.86, 99.91, 97.61, 94.13, 98.19, 103.43, 104.87, 106, 107.8, 109.95, 109.28, 111.78, 112.34, 108.05, 111.82], '1Y': [100, 101.6, 103.84, 104.73, 105.11, 106.17, 105.78, 105.9, 107.93, 106.79, 108.22, 108.63, 110.06, 110.83, 110.13, 112, 112.32, 110.56, 112.42, 113.77, 113.4, 114.37, 110.89, 113.75, 114.54, 115.34, 113.21, 115.53, 115.09, 116.34, 113.4, 116.39, 116.38, 116.14, 114.28, 115.03, 113.86, 113.33, 112.26, 109.31, 108.84, 113.13, 117.14, 119.02, 119.09, 121.13, 123.54, 122.79, 125.59, 126.23, 121.4, 125.65] },
  QQQ: { '1W': [100, 100.59, 103.75, 101.78, 102.29], '1M': [100, 99.38, 101.03, 101.22, 101.65, 103.46, 103.34, 104.21, 104.59, 105.22, 105.43, 104.92, 99.88, 101.44, 100.28, 98.27, 101.59, 102.19, 105.4, 103.4, 103.92], '6M': [100, 103.92, 102.12, 104.37, 103.47, 104.17, 104.29, 102.32, 100.15, 101.24, 100.19, 101.23, 100.48, 97.93, 92.98, 98.03, 104.7, 107.32, 109.52, 113.52, 117.79, 116.84, 121.49, 123.95, 115.54, 122.17], '1Y': [100, 102.28, 104.11, 104.98, 106.18, 106.79, 106.79, 107.23, 109.69, 106.96, 108.39, 108.72, 110.4, 112.52, 112.18, 114.49, 115.43, 113.4, 115.4, 118.33, 117.8, 117.39, 113.38, 116.1, 117.74, 118.24, 115.13, 117.92, 116.8, 118.54, 114.93, 119.29, 118.35, 116.11, 113.65, 114.89, 113.7, 114.87, 114.03, 110.38, 109.09, 114.56, 120.47, 123.82, 125.04, 128.83, 133.67, 132.59, 137.87, 140.66, 131.11, 138.64] },
};
// @@END_GENERATED:BASE_INDEX@@

// @@GENERATED:THEME_REPRESENTATIVES@@
export const THEME_REPRESENTATIVES: Partial<Record<Theme, ThemeRep>> = {
  'AI & ML': { etfs: ['AIS', 'IVES'], series: { '1W': [100, 100.41, 105.13, 102.25, 107.57], '1M': [100, 99.23, 102.6, 104.77, 105.89, 111.03, 110.02, 112.77, 113.88, 117.58, 118.46, 116.19, 105.62, 108.57, 106.57, 103.4, 109.17, 109.64, 114.87, 111.64, 117.75], '6M': [100, 107.17, 108.75, 111.06, 113.99, 113.98, 115.17, 114.41, 112.13, 114.41, 109.77, 112.47, 114.38, 111.63, 100.91, 111.03, 124.73, 130.63, 133.75, 147, 155.91, 151.9, 170.13, 183.72, 159.4, 184.47], '1Y': [100, 105.19, 104.66, 105.28, 108.58, 109.67, 107.6, 110.62, 111.94, 110.67, 112.59, 115.85, 124.06, 127.91, 126.59, 132.34, 130.17, 134.86, 140.32, 143.09, 136.14, 132.96, 124.03, 131.93, 134.87, 130.96, 131.97, 134.31, 140.46, 141.56, 140.42, 146.39, 143.35, 142.76, 142.89, 148.26, 142.46, 144.21, 143.31, 140.09, 134.42, 148.22, 159.25, 172.64, 173.73, 193.96, 205.2, 193.24, 216.99, 234.48, 203.14, 236] }, returns: { '1W': 7.6, '1M': 17.8, '6M': 84.5, '1Y': 136 } },
  'Semiconductors': { etfs: ['PSI', 'DRAM'], series: { '1W': [100, 101.41, 108.44, 103.45, 113.57], '1M': [100, 100.48, 104.38, 107.81, 107.33, 117.88, 117.56, 118.87, 118.41, 122.67, 127.97, 123.09, 107.29, 114.7, 113.83, 110.2, 123.03, 124.63, 133.47, 127.38, 140.11], '6M': [100, 106.44, 113.09, 119.16, 123.24, 124.76, 125.91, 132.77, 133.57, 138.75, 139.53, 149.87, 158.38, 156.38, 155.38, 154.61, 168.18, 175.86, 192.25, 214.78, 224.32, 195.01, 213.62, 225.54, 226.34, 255.95], '1Y': [100, 105.87, 106.87, 113, 113.69, 111.94, 112.69, 117.84, 116.3, 118.82, 120.02, 120.91, 123.31, 129.84, 127.07, 131.22, 130.38, 132.38, 136.31, 140.18, 140.83, 142.4, 144.54, 156.19, 155.81, 166.05, 163.26, 169.64, 175.17, 171.81, 170.27, 173.37, 176.3, 186.29, 184, 202.16, 195.53, 197.22, 198.75, 211.48, 209.28, 220.11, 219.71, 210.89, 223.66, 236.47, 238.57, 244.55, 259.53, 273.74, 255.08, 296.74] }, returns: { '1W': 13.6, '1M': 40.1, '6M': 155.9, '1Y': 196.7 } },
  'Broad Tech': { etfs: ['WGMI', 'PTF'], series: { '1W': [100, 102.35, 107.17, 105.53, 110.05], '1M': [100, 99.27, 103.07, 108.5, 109.53, 115.06, 118.34, 119.06, 117.53, 120.56, 122.85, 120.98, 108.51, 113.45, 109.95, 105.5, 113.26, 115.93, 121.4, 119.56, 124.68], '6M': [100, 111.68, 111.93, 117.66, 127.36, 120.97, 121.06, 122.42, 116.12, 122.21, 114.06, 112.63, 117.49, 116.47, 100.3, 115.45, 134.9, 139.25, 137.31, 156.91, 162.25, 153.85, 183.25, 190.26, 163.46, 193.08], '1Y': [100, 110.44, 119.22, 120.22, 125.02, 124.94, 115.43, 118.9, 124.1, 127.92, 134.5, 133.63, 160.53, 170.78, 166.34, 190.13, 207.5, 216.4, 222.28, 217.61, 208.76, 165.87, 156.47, 190.84, 184.32, 174.79, 170.62, 165.2, 184.07, 195.73, 193.64, 202.99, 189.26, 182.97, 177.47, 187.39, 181.3, 173.49, 174.99, 175.9, 159.99, 184.76, 205.43, 219.41, 204.86, 256.93, 252.44, 235.5, 284.54, 294.59, 251.5, 299.35] }, returns: { '1W': 10, '1M': 24.7, '6M': 93.1, '1Y': 199.4 } },
  'Electrification': { etfs: ['PBW', 'POW'], series: { '1W': [100, 100.6, 103.63, 102.12, 104.55], '1M': [100, 97.4, 100.6, 104.78, 106.56, 111.2, 110.81, 111.5, 110.22, 110.34, 110.34, 110.07, 100.62, 101.53, 99.46, 96.05, 100.82, 101.44, 104.48, 102.94, 105.41], '6M': [100, 105.59, 106.97, 108.89, 115.5, 115.79, 114.47, 120.44, 119.36, 123.68, 116.15, 117.16, 119.25, 117.63, 111.34, 116.59, 129.04, 132.47, 138.55, 151.4, 152.15, 139.38, 158.03, 157.2, 137.4, 150.72], '1Y': [100, 101.66, 106.25, 108.96, 111.71, 113.01, 105.62, 110.22, 113.59, 116.39, 116.42, 114.59, 116.66, 123.04, 124.42, 133.53, 131.88, 136.93, 140.55, 141.5, 139.12, 134.75, 131.34, 142.93, 143.95, 143.51, 146.37, 145, 146.51, 150.22, 150.42, 154.78, 152.04, 149.12, 148.22, 150.5, 151.03, 153.02, 152.03, 159.51, 156.31, 162.81, 170.68, 177.26, 171, 178.3, 189.35, 176.28, 193.52, 190.9, 172.05, 185.44] }, returns: { '1W': 4.5, '1M': 5.4, '6M': 50.7, '1Y': 85.4 } },
  'Industrials': { etfs: ['PRN', 'IDEF'], series: { '1W': [100, 99.72, 101.33, 101.28, 101.97], '1M': [100, 98.63, 100.59, 100.86, 102.04, 105.38, 105.2, 106.93, 106.05, 103.66, 103.51, 104.69, 100.5, 100.62, 100.43, 97.81, 103.19, 102.91, 104.58, 104.53, 105.27], '6M': [100, 107.25, 107.16, 113.62, 119.62, 117.36, 116.02, 120.64, 120.31, 123.91, 121.61, 119.45, 118.79, 116.74, 108.4, 117.03, 124.76, 123.39, 121.58, 127.61, 127.94, 121.72, 130.12, 128.32, 120.83, 130.74], '1Y': [100, 103.81, 104.53, 106.1, 106.61, 108.97, 106.52, 108.57, 107.81, 108.1, 108.63, 109.28, 113.04, 113.65, 114.19, 118.12, 115.38, 115.75, 120.6, 120.86, 115.78, 111.81, 106.81, 112.3, 112.98, 115.13, 116.24, 116.87, 123.79, 128.94, 130.31, 132.24, 131.1, 132.55, 134.62, 136.93, 136.16, 131.87, 129.93, 129.38, 125.37, 135.44, 137.09, 137.87, 133.22, 145.62, 142.64, 134.83, 144.14, 142.15, 133.85, 144.82] }, returns: { '1W': 2, '1M': 5.3, '6M': 30.7, '1Y': 44.8 } },
  'Meme': { etfs: ['MEME', 'BUZZ'], series: { '1W': [100, 97.86, 103.1, 98.74, 102.25], '1M': [100, 98.35, 102, 108.08, 110.63, 114.14, 116.13, 118.78, 117.32, 116.72, 114.47, 115.5, 103.85, 106.38, 102.37, 99.59, 105.76, 103.42, 109.02, 104.34, 108.12], '6M': [100, 112.36, 111.98, 122.93, 127.91, 120.22, 114.23, 114.93, 106.47, 109.39, 105.63, 106.97, 111.31, 107.97, 93.72, 104.3, 123.99, 131.6, 121.8, 138.05, 145.81, 136.83, 163.62, 160.53, 138.89, 151.23], '1Y': [100, 107.56, 102.16, 100.36, 100.28, 100.45, 95.57, 93.56, 90.06, 85.88, 88.22, 88.68, 95.7, 98, 92.81, 99.12, 99.33, 96.88, 103.63, 105.93, 101.15, 97.79, 92.87, 94.53, 95.1, 94.67, 92.51, 91.66, 96.08, 96.59, 90.87, 95.22, 92.91, 89.44, 89.17, 86.08, 88.34, 93.38, 97.31, 98.29, 92.36, 92.71, 103.21, 109.03, 110.7, 111.09, 120.33, 122.39, 124.95, 120.68, 112.03, 119.08] }, returns: { '1W': 2.3, '1M': 8.1, '6M': 51.2, '1Y': 19.1 } },
};
// @@END_GENERATED:THEME_REPRESENTATIVES@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 6.03, proScore: 6.03, coverage: 1,
      price: 210.69, weeklyPrices: [204.87, 205.19, 212.45, 207.41, 210.69], weeklyChange: 2.84, dayChange: 2.95, sortRank: 0, periodReturns: { '1M': -5.2, '6M': 23.3, '1Y': 46.5 },
      priceHistory: { '1D': [204.65, 207.14, 207.72, 208.93, 209.35, 209.32, 209.27, 208.88, 208.19, 209.27, 209.53, 210.97, 210.13, 209.96, 210.06, 210.04, 209.66, 209.85, 210.1, 209.78, 210.06, 209.85, 210.15, 210.69], '1W': [204.87, 205.19, 212.45, 207.41, 210.69], '1M': [222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 210.69], '6M': [170.94, 188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 181.93, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 214.75, 200.42, 210.69], '1Y': [143.85, 157.75, 158.24, 164.07, 171.38, 173.5, 173.72, 182.7, 180.45, 177.99, 174.18, 168.31, 177.75, 176.67, 178.19, 187.62, 183.16, 183.22, 186.26, 202.49, 188.15, 190.17, 180.64, 177, 182.41, 175.02, 180.99, 188.22, 187.24, 185.81, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 186.03, 180.4, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 220.61, 212.6, 214.75, 200.42, 210.69] },
      velocityScore: { '1D': 0.5, '1W': -4.4, '1M': 4, '6M': null }, isNew: false,
      marketCap: '$5.1T', pe: 32.3, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: null,
      etfPresence: { AIS: 2.38, ARTY: 4.41, BAI: 4.02, IGPT: 5.34, IVES: 4.75, ALAI: 12.65, CHAT: 6.39, AIFD: 6.35, SPRX: 3.45, AOTG: 10.56 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 6.76, proScore: 6.08, coverage: 0.9,
      price: 1133.99, weeklyPrices: [995.87, 981.61, 1087.99, 1020.76, 1133.99], weeklyChange: 13.87, dayChange: 8.7, sortRank: 0, periodReturns: { '1M': 66.4, '6M': 402.8, '1Y': 817.5 },
      priceHistory: { '1D': [1043.19, 1099, 1106.11, 1118.26, 1121.66, 1124.56, 1128.4, 1126.12, 1122.69, 1126.87, 1127.72, 1125.45, 1127.32, 1129.46, 1134.23, 1134.65, 1138.57, 1141.99, 1142.73, 1144.29, 1139.82, 1142.21, 1147.02, 1133.99], '1W': [995.87, 981.61, 1087.99, 1020.76, 1133.99], '1M': [681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1133.99], '6M': [225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 891.88, 1133.99], '1Y': [123.6, 124.76, 119.92, 118.61, 113.23, 111.26, 104.88, 118.89, 120.87, 117.68, 119.01, 131.46, 157.77, 162.73, 157.27, 187.83, 181.6, 202.38, 219.02, 223.77, 237.92, 246.83, 201.37, 236.48, 237.22, 241.14, 265.92, 294.37, 343.43, 338.13, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.73, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 698.74, 928.41, 1079.57, 891.88, 1133.99] },
      velocityScore: { '1D': -1.6, '1W': -0.5, '1M': 14.7, '6M': null }, isNew: false,
      marketCap: '$1.3T', pe: 53.4, revenueGrowth: 196, eps: 21.23, grossMargin: 58, dividendYield: null,
      etfPresence: { AIS: 6.97, ARTY: 5.07, BAI: 6.44, IGPT: 12.98, IVES: 6.81, ALAI: 1.08, CHAT: 4.08, AIFD: 6.72, SPRX: false, AOTG: 10.66 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.3, proScore: 4.77, coverage: 0.9,
      price: 537.37, weeklyPrices: [488.45, 511.57, 547.26, 507.29, 537.37], weeklyChange: 10.02, dayChange: 4.86, sortRank: 0, periodReturns: { '1M': 27.6, '6M': 171.2, '1Y': 319 },
      priceHistory: { '1D': [512.48, 530.56, 531.21, 533.45, 530.77, 531.82, 537.11, 531.59, 528.43, 534.62, 533.55, 533.53, 533.4, 534.02, 533.83, 534.64, 532.61, 532.99, 530.67, 531.39, 531.3, 531.07, 534.21, 537.37], '1W': [488.45, 511.57, 547.26, 507.29, 537.37], '1M': [420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 537.37], '6M': [198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 196.31, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 452.4, 537.37], '1Y': [128.24, 143.81, 134.8, 146.24, 157, 166.47, 171.7, 172.76, 177.51, 167.76, 162.63, 151.41, 161.16, 157.39, 159.46, 164.67, 214.9, 233.08, 252.92, 256.12, 233.54, 246.81, 206.02, 217.53, 217.97, 210.78, 213.43, 215.61, 214.35, 220.97, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 204.83, 199.46, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 414.05, 495.54, 542.52, 452.4, 537.37] },
      velocityScore: { '1D': -4.2, '1W': -3, '1M': -4.8, '6M': null }, isNew: false,
      marketCap: '$876B', pe: 179.7, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.59, ARTY: 4.65, BAI: 4.72, IGPT: 7.09, IVES: 5.17, ALAI: 1.17, CHAT: 3.91, AIFD: false, SPRX: 0.53, AOTG: 15.9 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.65, proScore: 2.92, coverage: 0.8,
      price: 411.35, weeklyPrices: [385.57, 382.07, 393.94, 376.71, 411.35], weeklyChange: 6.69, dayChange: 4.7, sortRank: 0, periodReturns: { '1M': -2.2, '6M': 26.2, '1Y': 64.5 },
      priceHistory: { '1D': [392.9, 406.62, 406.12, 409.5, 408.61, 409.05, 410.11, 408.8, 406.88, 408.85, 409.38, 408.3, 408.43, 407.4, 407.29, 408.02, 407.77, 407.36, 407.45, 408.21, 408.06, 409.2, 410.79, 411.35], '1W': [385.57, 382.07, 393.94, 376.71, 411.35], '1M': [420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 411.35], '6M': [326.02, 350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 321.31, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 479.23, 372.1, 411.35], '1Y': [249.99, 269.35, 274.18, 275.6, 288.21, 290.18, 288.64, 304.97, 306.34, 294, 297.39, 345.65, 364.09, 344.94, 334.53, 338.37, 324.63, 349.33, 354.13, 369.63, 349.43, 342.46, 346.82, 402.96, 390.24, 359.93, 340.36, 349.39, 343.77, 354.61, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 341.57, 315.93, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 411.07, 421.86, 479.23, 372.1, 411.35] },
      velocityScore: { '1D': 6.6, '1W': 2.5, '1M': -10.7, '6M': null }, isNew: false,
      marketCap: '$2.0T', pe: 68.2, revenueGrowth: 48, eps: 6.03, grossMargin: 76, dividendYield: 0.69,
      etfPresence: { AIS: 0.66, ARTY: 4.44, BAI: 4.25, IGPT: false, IVES: 4.62, ALAI: 4.13, CHAT: 4.12, AIFD: 5.42, SPRX: false, AOTG: 1.53 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 7, avgWeight: 2.1, proScore: 1.47, coverage: 0.7,
      price: 169.67, weeklyPrices: [156.40, 163.24, 169.09, 168.01, 169.67], weeklyChange: 8.48, dayChange: 2.87, sortRank: 0, periodReturns: { '1M': 19.7, '6M': 38.7, '1Y': 96.7 },
      priceHistory: { '1D': [164.93, 169.81, 168.83, 169.75, 169.75, 169.04, 168.73, 168.87, 168.36, 169.27, 169.16, 169.25, 168.09, 168.35, 168.76, 168.92, 168.84, 168.85, 168.37, 168.73, 168.68, 168.79, 169.63, 169.67], '1W': [156.4, 163.24, 169.09, 168.01, 169.67], '1M': [141.71, 141.58, 140.49, 148.59, 154.03, 158.01, 154.31, 155.27, 159.47, 170.68, 174.37, 166.01, 154.27, 156.4, 152.16, 151.76, 156.4, 163.24, 169.09, 168.01, 169.67], '6M': [122.36, 130.77, 133.6, 122.89, 129.83, 143.72, 138.37, 141.74, 142.58, 128.77, 124.6, 139.62, 133.07, 135.88, 116.13, 133.64, 154.37, 172.86, 165.29, 170.22, 142.54, 141.58, 154.31, 174.37, 151.76, 169.67], '1Y': [86.25, 99.39, 101.47, 108.37, 111.61, 114.28, 117.57, 139.18, 137.3, 133.25, 136.55, 140.01, 145.43, 149.61, 142.5, 145.5, 154.1, 143.1, 153.82, 157.69, 134.65, 131.37, 119.59, 130.68, 128.59, 124.76, 131.12, 134.15, 132.58, 129.93, 127.52, 146.69, 139.39, 143.45, 139.54, 132.89, 134.83, 138.23, 136.07, 130.8, 122.78, 145.07, 154.33, 177.73, 168.68, 147.06, 140.69, 141.58, 154.31, 174.37, 151.76, 169.67] },
      velocityScore: { '1D': 9.7, '1W': -0.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$214B', pe: 58.3, revenueGrowth: 35, eps: 2.91, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.38, ARTY: 2.33, BAI: 1.35, IGPT: false, IVES: false, ALAI: 0.96, CHAT: 2.12, AIFD: 4.91, SPRX: 1.64, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 7 of 10 AI & ML ETFs (70% coverage) with average weight 2.1% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 6, avgWeight: 4.85, proScore: 2.91, coverage: 0.6,
      price: 462.12, weeklyPrices: [421.07, 423.93, 441.40, 425.83, 462.12], weeklyChange: 9.75, dayChange: 6.94, sortRank: 0, periodReturns: { '1M': 16.7, '6M': 66.9, '1Y': 120.6 },
      priceHistory: { '1D': [432.15, 446.99, 449.93, 449.07, 450.65, 453.1, 452.18, 451.31, 451.53, 453.84, 454.19, 455.15, 454.76, 457.22, 457.76, 459.14, 459.3, 460.47, 460.26, 460.73, 460.8, 460.2, 462.84, 462.12], '1W': [421.07, 423.93, 441.4, 425.83, 462.12], '1M': [395.95, 392.61, 401.62, 407.15, 404.52, 412.32, 422.73, 424.86, 418.45, 435.63, 436.69, 444.92, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93, 441.4, 425.83, 462.12], '6M': [276.96, 298.8, 319.61, 323.63, 342.4, 332.71, 341.36, 355.41, 364.2, 385.75, 353.13, 347.09, 345.98, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 392.61, 422.73, 436.69, 408.75, 462.12], '1Y': [209.51, 228.57, 229.17, 228.67, 238.85, 245.6, 235.21, 241.83, 238.88, 232.99, 230.87, 247.19, 261.38, 264.87, 273.36, 292.19, 280.66, 295.08, 294.96, 300.43, 286.5, 284.82, 277.5, 291.51, 294.72, 292.04, 288.95, 300.92, 327.43, 331.21, 327.16, 338.34, 335.75, 361.91, 362.26, 387.73, 357.44, 354.56, 339.57, 343.25, 337.95, 365.9, 375.1, 387.44, 393.83, 419.5, 399.8, 392.61, 422.73, 436.69, 408.75, 462.12] },
      velocityScore: { '1D': 2.5, '1W': 0.3, '1M': -5.5, '6M': null }, isNew: false,
      marketCap: '$2.4T', pe: 39.7, revenueGrowth: 35, eps: 11.63, grossMargin: 62, dividendYield: null,
      etfPresence: { AIS: 3.21, ARTY: false, BAI: 4.34, IGPT: false, IVES: 5.34, ALAI: 5.66, CHAT: false, AIFD: 3.27, SPRX: false, AOTG: 7.28 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 4.58, proScore: 2.75, coverage: 0.6,
      price: 368.03, weeklyPrices: [357.77, 359.68, 369.35, 373.25, 368.03], weeklyChange: 2.87, dayChange: 1.17, sortRank: 0, periodReturns: { '1M': -7.3, '6M': 24, '1Y': 120.9 },
      priceHistory: { '1D': [363.79, 359.41, 362.07, 362.68, 363.13, 364.04, 363.53, 364, 365.22, 365.5, 365.45, 366.45, 366.71, 366.47, 367.85, 367.64, 368.33, 367.84, 367.51, 368.47, 367.22, 367.62, 369.28, 368.03], '1W': [357.77, 359.68, 369.35, 373.25, 368.03], '1M': [396.94, 387.66, 388.91, 387.66, 382.97, 388.88, 388.83, 390.13, 380.34, 376.37, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 373.25, 368.03], '6M': [296.72, 314.09, 315.15, 328.57, 330, 333.26, 343.69, 324.32, 302.02, 310.9, 303.58, 307.04, 310.92, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 387.35, 387.66, 388.83, 358.99, 356.38, 368.03], '1Y': [166.64, 178.53, 176.79, 181.56, 190.1, 193.18, 189.13, 201.42, 203.9, 206.09, 212.91, 234.04, 251.61, 254.72, 246.54, 245.35, 236.57, 253.3, 259.92, 281.19, 278.83, 276.41, 289.45, 320.18, 321.27, 309.29, 307.16, 313.56, 314.34, 335.97, 322, 334.55, 339.71, 318.58, 303.33, 312.9, 303.13, 308.7, 307.69, 290.44, 287.56, 317.32, 337.12, 339.32, 349.94, 398.04, 402.62, 387.66, 388.83, 358.99, 356.38, 368.03] },
      velocityScore: { '1D': -2.5, '1W': -4.5, '1M': -27.8, '6M': null }, isNew: false,
      marketCap: '$4.5T', pe: 28.1, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.17, IGPT: 5.62, IVES: 4.5, ALAI: false, CHAT: 5.07, AIFD: 5.01, SPRX: false, AOTG: 4.09 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 6, avgWeight: 3.81, proScore: 2.29, coverage: 0.6,
      price: 310.58, weeklyPrices: [280.71, 279.70, 308.88, 278.67, 310.58], weeklyChange: 10.64, dayChange: 7.27, sortRank: 0, periodReturns: { '1M': 83.9, '6M': 280.1, '1Y': 322.5 },
      priceHistory: { '1D': [289.54, 307.2, 314.01, 317.6, 320.13, 325.04, 323.82, 324.48, 321.65, 324.55, 327.35, 324.45, 323.8, 324.2, 325.78, 329.32, 325.58, 324.98, 323.57, 322.92, 326.39, 328.78, 327.86, 310.58], '1W': [280.71, 279.7, 308.88, 278.67, 310.58], '1M': [168.93, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 204.83, 205, 219.43, 301.65, 316.43, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 310.58], '6M': [81.7, 86.49, 89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 77.51, 93.3, 90.79, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 198.7, 301.65, 252.59, 310.58], '1Y': [73.51, 77.16, 71.55, 72.51, 73.06, 74.21, 74.45, 77.34, 76.19, 73, 62.87, 66, 67.43, 74.26, 83.17, 86.22, 85.61, 87.95, 84.13, 93.74, 90.92, 86.45, 76.68, 89.4, 98.91, 84.43, 84.09, 85.76, 88.23, 83.05, 79.8, 82.93, 75.54, 82.01, 79.09, 80.92, 78.09, 90.44, 87.62, 92.36, 99.05, 114.45, 134.6, 157.32, 156.57, 172.15, 177.95, 176.27, 198.7, 301.65, 252.59, 310.58] },
      velocityScore: { '1D': -16.1, '1W': -19.1, '1M': -0.9, '6M': null }, isNew: false,
      marketCap: '$272B', pe: 107.1, revenueGrowth: 28, eps: 2.9, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { AIS: 4.25, ARTY: 4.54, BAI: 2.05, IGPT: false, IVES: false, ALAI: false, CHAT: 1.6, AIFD: 6.25, SPRX: 4.2, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 6, avgWeight: 3.02, proScore: 1.81, coverage: 0.6,
      price: 746.23, weeklyPrices: [529.29, 562.93, 653.53, 681.08, 746.23], weeklyChange: 40.99, dayChange: 4.79, sortRank: 0, periodReturns: { '1M': 62.7, '6M': 348.8, '1Y': 1158.6 },
      priceHistory: { '1D': [712.13, 790.36, 786.06, 783.76, 773.56, 770.57, 772.01, 774.04, 769.58, 762.15, 758.33, 753.26, 743.76, 751.17, 746.33, 744.85, 743.34, 741.61, 746.88, 745.57, 745.06, 751.68, 757, 746.23], '1W': [529.29, 562.93, 653.53, 681.08, 746.23], '1M': [458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 746.23], '6M': [166.26, 179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 313.81, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 594.11, 490.09, 746.23], '1Y': [59.29, 63.29, 65.22, 66.93, 68.74, 68.82, 76.55, 74.97, 75.06, 76.97, 80.34, 93.29, 102.39, 106.63, 106.88, 131.31, 115.42, 126.2, 129.43, 150.21, 162.96, 157.83, 140.23, 163.33, 168.89, 176.34, 181.08, 179.68, 219.38, 214, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 268.81, 304.9, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 455.8, 530.6, 594.11, 490.09, 746.23] },
      velocityScore: { '1D': -2.2, '1W': 57.4, '1M': -5.7, '6M': null }, isNew: false,
      marketCap: '$257B', pe: 44.7, revenueGrowth: 46, eps: 16.69, grossMargin: 45, dividendYield: null,
      etfPresence: { AIS: 1.58, ARTY: 3.28, BAI: 3.7, IGPT: 4, IVES: false, ALAI: 4.73, CHAT: false, AIFD: false, SPRX: false, AOTG: 0.85 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 3.88, proScore: 1.94, coverage: 0.5,
      price: 244.39, weeklyPrices: [241.51, 238.55, 246.02, 246.00, 244.39], weeklyChange: 1.19, dayChange: 2.9, sortRank: 0, periodReturns: { '1M': -7.7, '6M': 10.4, '1Y': 16.5 },
      priceHistory: { '1D': [237.5, 236.45, 238.85, 240.18, 240.06, 239.82, 241.42, 242.35, 242.47, 243.12, 242.57, 244.03, 243.53, 244.56, 245.29, 244.55, 243.72, 242.91, 242.91, 243.15, 242.78, 243.07, 242.78, 244.39], '1W': [241.51, 238.55, 246.02, 246, 244.39], '1M': [264.86, 259.34, 265.01, 268.46, 266.32, 265.29, 271.85, 274, 270.64, 261.26, 250.02, 253.79, 246.03, 245.22, 244.19, 238, 241.51, 238.55, 246.02, 246, 244.39], '6M': [221.27, 232.38, 226.5, 247.38, 239.12, 238.42, 242.96, 208.72, 201.15, 208.56, 208.73, 214.33, 215.2, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 259.34, 271.85, 250.02, 238, 244.39], '1Y': [209.69, 223.3, 223.47, 225.69, 229.3, 231.44, 214.75, 222.69, 231.03, 228.84, 229, 235.84, 231.43, 231.48, 219.78, 219.51, 216.37, 213.04, 224.21, 244.22, 244.41, 234.69, 217.14, 233.22, 229.53, 226.19, 227.35, 232.07, 240.93, 242.6, 231, 244.68, 238.62, 206.96, 204.79, 210.64, 216.82, 212.65, 209.87, 207.24, 208.27, 221.25, 248.5, 255.36, 263.04, 274.99, 270.13, 259.34, 271.85, 250.02, 238, 244.39] },
      velocityScore: { '1D': -2.5, '1W': -5.4, '1M': -36, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 31.5, revenueGrowth: 17, eps: 7.77, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 4.32, ALAI: 5.45, CHAT: 2.28, AIFD: 3.34, SPRX: false, AOTG: 4.02 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.38, proScore: 1.69, coverage: 0.5,
      price: 379.4, weeklyPrices: [390.34, 390.74, 399.76, 393.83, 379.40], weeklyChange: -2.8, dayChange: 0.13, sortRank: 0, periodReturns: { '1M': -10.4, '6M': -20.3, '1Y': -20.5 },
      priceHistory: { '1D': [378.91, 373.67, 376.46, 379.29, 378.4, 377.14, 375.96, 375.17, 375.35, 377.01, 377.59, 379.21, 378.96, 380.74, 379.7, 379.89, 379.51, 378.54, 377.74, 378.21, 377.58, 378.03, 378.15, 379.4], '1W': [390.34, 390.74, 399.76, 393.83, 379.4], '1M': [423.54, 417.42, 421.06, 419.09, 418.57, 416.03, 412.67, 426.99, 450.24, 460.52, 427.34, 428.05, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74, 399.76, 393.83, 379.4], '6M': [476.12, 488.02, 472.94, 479.28, 459.86, 470.28, 423.37, 413.6, 396.86, 389, 403.93, 405.76, 399.41, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 417.42, 412.67, 427.34, 397.36, 379.4], '1Y': [477.4, 495.94, 497.72, 503.02, 510.06, 513.71, 524.11, 522.04, 520.17, 507.23, 506.69, 498.2, 515.36, 517.93, 511.46, 517.35, 510.96, 513.58, 523.61, 517.81, 496.82, 510.18, 478.43, 492.01, 483.16, 478.53, 485.92, 487.1, 478.51, 470.67, 454.52, 480.58, 411.21, 413.27, 399.6, 400.6, 405.2, 404.88, 391.79, 372.74, 370.17, 374.33, 411.22, 432.92, 424.46, 413.96, 405.21, 417.42, 412.67, 427.34, 397.36, 379.4] },
      velocityScore: { '1D': 0, '1W': -5.1, '1M': -34.7, '6M': null }, isNew: false,
      marketCap: '$2.8T', pe: 22.6, revenueGrowth: 18, eps: 16.78, grossMargin: 68, dividendYield: 0.92,
      etfPresence: { AIS: false, ARTY: 2.32, BAI: false, IGPT: false, IVES: 4.3, ALAI: 4.76, CHAT: 2.01, AIFD: false, SPRX: false, AOTG: 3.49 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 3.1, proScore: 1.55, coverage: 0.5,
      price: 577.22, weeklyPrices: [568.43, 566.98, 593.48, 600.21, 577.22], weeklyChange: 1.55, dayChange: 1.7, sortRank: 0, periodReturns: { '1M': -5.6, '6M': -11.1, '1Y': -15.4 },
      priceHistory: { '1D': [567.58, 563.53, 571.05, 572.19, 570.55, 571.2, 571.52, 572.99, 573.88, 575.48, 576.24, 577.52, 577.21, 577.42, 577.9, 577.2, 575.78, 573.94, 574.49, 576.25, 573.9, 574.68, 575.45, 577.22], '1W': [568.43, 566.98, 593.48, 600.21, 577.22], '1M': [611.21, 602.61, 605.06, 607.38, 610.26, 612.34, 635.26, 635.29, 632.51, 600.47, 622.98, 627.57, 593, 585.39, 584.59, 570.98, 568.43, 566.98, 593.48, 600.21, 577.22], '6M': [649.5, 667.55, 650.41, 653.06, 620.25, 672.36, 706.41, 677.22, 639.29, 639.3, 655.08, 654.07, 622.66, 604.06, 536.38, 575.05, 662.49, 668.84, 671.34, 604.96, 603, 602.61, 635.26, 622.98, 570.98, 577.22], '1Y': [682.35, 733.63, 718.35, 720.92, 712.97, 712.68, 750.01, 769.3, 785.23, 754.79, 738.7, 752.3, 764.7, 778.38, 743.75, 710.56, 705.3, 716.92, 738.36, 648.35, 621.71, 609.46, 589.15, 647.95, 673.42, 644.23, 658.77, 658.69, 660.62, 631.09, 604.12, 672.97, 691.7, 670.72, 643.22, 653.69, 667.73, 654.86, 615.68, 592.92, 572.13, 612.42, 671.58, 674.72, 669.12, 612.88, 616.63, 602.61, 635.26, 622.98, 570.98, 577.22] },
      velocityScore: { '1D': -3.1, '1W': -6.1, '1M': -43.6, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 21, revenueGrowth: 33, eps: 27.49, grossMargin: 82, dividendYield: 0.35,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 4.2, IVES: 4.34, ALAI: 3.87, CHAT: 1.97, AIFD: false, SPRX: false, AOTG: 1.11 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.05, proScore: 1.53, coverage: 0.5,
      price: 417.07, weeklyPrices: [367.47, 367.15, 389.20, 361.71, 417.07], weeklyChange: 13.5, dayChange: 11.31, sortRank: 0, periodReturns: { '1M': 93.5, '6M': 197.4, '1Y': 348.1 },
      priceHistory: { '1D': [374.68, 387.38, 394.14, 401.3, 407.37, 409.39, 412.1, 413.04, 412.54, 419, 419.23, 419.8, 418.48, 415.4, 420.55, 419.89, 414.01, 413.34, 412.95, 412.81, 412.54, 411.86, 414.39, 417.07], '1W': [367.47, 367.15, 389.2, 361.71, 417.07], '1M': [215.58, 244.26, 287.48, 297.84, 306.88, 318.72, 325.33, 349.17, 342.85, 320.09, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 417.07], '6M': [140.24, 169.97, 179.56, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.4, 109.8, 116.48, 127.57, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 325.33, 363.54, 330.86, 417.07], '1Y': [93.07, 91.02, 89.62, 90.32, 121.89, 122.23, 131.1, 179.28, 185.85, 179.09, 182.2, 216.1, 231.29, 245.2, 197.78, 200.74, 206.21, 159.8, 164.97, 186.68, 165.49, 144.34, 139.29, 157.57, 161.23, 148.85, 164.4, 170.1, 161.01, 180.56, 183.75, 170.93, 158.52, 182.86, 129.58, 128.15, 113.77, 124.71, 126.34, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 224.09, 244.26, 325.33, 363.54, 330.86, 417.07] },
      velocityScore: { '1D': -2.5, '1W': -3.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$71B', pe: 281.8, revenueGrowth: 93, eps: 1.48, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 2.02, ARTY: 1.31, BAI: false, IGPT: false, IVES: false, ALAI: 1.41, CHAT: 2.77, AIFD: false, SPRX: 7.75, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 5, avgWeight: 2.71, proScore: 1.35, coverage: 0.5,
      price: 850, weeklyPrices: [889.59, 921.56, 957.24, 875.36, 850.00], weeklyChange: -4.45, dayChange: -2.3, sortRank: 0, periodReturns: { '1M': -4, '6M': 165.4, '1Y': 848 },
      priceHistory: { '1D': [869.98, 871, 851.95, 858.55, 873.26, 873.96, 868.95, 857.01, 859.25, 857.78, 859.32, 846.43, 844, 847.6, 843.25, 839.42, 837.37, 837.95, 834.59, 835.86, 836.34, 837.85, 848.54, 850], '1W': [889.59, 921.56, 957.24, 875.36, 850], '1M': [884.98, 890.09, 868.07, 964.5, 946.9, 910.81, 902.31, 860.62, 854.96, 905, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 850], '6M': [320.25, 395.92, 386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 600.42, 688.27, 694.43, 672, 649.56, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 890.09, 902.31, 938, 853.26, 850], '1Y': [89.66, 94.75, 91.08, 92.24, 103.84, 104.52, 106.68, 116.27, 115.86, 119.34, 132.81, 149.4, 168.77, 168.73, 160.75, 163.81, 149.61, 164.77, 179.3, 201.56, 240.11, 232.15, 233.24, 325.16, 331.41, 324.35, 371.43, 372.61, 397.42, 361.33, 356.83, 370.66, 435.1, 561.13, 594.26, 723.39, 680.8, 672, 700.81, 801.99, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 1030.37, 890.09, 902.31, 938, 853.26, 850] },
      velocityScore: { '1D': -0.7, '1W': -0.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 149.4, revenueGrowth: 90, eps: 5.69, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.45, IGPT: false, IVES: false, ALAI: 0.38, CHAT: 1.32, AIFD: 5.9, SPRX: 3.5, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 5 of 10 AI & ML ETFs (50% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'Credo Technology Group Holding Ltd', easyScore: 5, avgWeight: 1.89, proScore: 0.95, coverage: 0.5,
      price: 271.83, weeklyPrices: [264.76, 250.81, 259.41, 239.18, 271.83], weeklyChange: 2.67, dayChange: 9.02, sortRank: 0, periodReturns: { '1M': 73.9, '6M': 102.7, '1Y': 217.9 },
      priceHistory: { '1D': [249.33, 258.77, 253.95, 264.16, 266.46, 265.07, 267.13, 264.23, 262.47, 265.87, 263.93, 262.25, 262.1, 261.14, 262.04, 262.99, 262.64, 262.11, 262.66, 263.55, 264.64, 265.61, 270.1, 271.83], '1W': [264.76, 250.81, 259.41, 239.18, 271.83], '1M': [156.27, 168.99, 182.98, 193.39, 218.41, 221.64, 221.23, 222.35, 236.03, 226.1, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 271.83], '6M': [134.13, 150.19, 143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 97.3, 112.33, 104.06, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.23, 214.6, 237.68, 271.83], '1Y': [85.51, 93.49, 92.73, 98.7, 95.74, 101.22, 107.56, 120.41, 116.74, 114.04, 123.06, 147.53, 163.98, 169.56, 142.93, 143.87, 138.83, 143.61, 155.55, 187.62, 163.61, 145.52, 134.73, 177.6, 176.04, 143.91, 150.13, 144.7, 132.95, 161.38, 153.22, 129.57, 111.31, 134.72, 127.91, 123.46, 102.54, 115.91, 101.72, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 168.99, 221.23, 214.6, 237.68, 271.83] },
      velocityScore: { '1D': 4.4, '1W': -5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$51B', pe: 108.3, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: 1.07, ARTY: 1.24, BAI: 2.09, IGPT: false, IVES: false, ALAI: false, CHAT: 2.23, AIFD: false, SPRX: 2.84, AOTG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 4, avgWeight: 3.79, proScore: 1.52, coverage: 0.4,
      price: 133.99, weeklyPrices: [116.96, 124.57, 127.86, 117.05, 133.99], weeklyChange: 14.56, dayChange: 10.64, sortRank: 0, periodReturns: { '1M': 23.9, '6M': 271.7, '1Y': 535.6 },
      priceHistory: { '1D': [121.1, 133.09, 130.84, 129.89, 129.78, 130.23, 132.49, 132.1, 131.11, 132.65, 132.25, 133.63, 133.6, 133.93, 134.26, 133.86, 133.32, 134.62, 133.85, 134.09, 133.97, 134.27, 134.41, 133.99], '1W': [116.96, 124.57, 127.86, 117.05, 133.99], '1M': [108.17, 110.8, 118.96, 118.5, 119.84, 123.52, 121.77, 120.89, 114.68, 109.33, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 133.99], '6M': [36.05, 36.16, 39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 46.12, 43.1, 46.78, 44.06, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 121.77, 112.71, 107.04, 133.99], '1Y': [21.08, 22.69, 22, 23.3, 23.26, 20.7, 19.31, 19.95, 24.56, 24.8, 24.35, 24.48, 24.77, 29.58, 35.5, 36.83, 36.37, 37.01, 38.28, 39.99, 38.13, 35.52, 33.62, 40.56, 41.41, 37.81, 36.82, 36.68, 40.04, 47.29, 48.56, 43.93, 49.25, 47.13, 45.46, 46.88, 45.58, 47.98, 45.03, 44.06, 44.13, 58.95, 64.94, 65.27, 94.75, 113.01, 120.29, 110.8, 121.77, 112.71, 107.04, 133.99] },
      velocityScore: { '1D': 6.3, '1W': 4.1, '1M': -47.6, '6M': null }, isNew: false,
      marketCap: '$673B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.43, ARTY: false, BAI: 3.11, IGPT: 7.36, IVES: false, ALAI: false, CHAT: 1.27, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'ARM', name: 'ARM Holdings PLC', easyScore: 4, avgWeight: 3.63, proScore: 1.45, coverage: 0.4,
      price: 439.46, weeklyPrices: [342.23, 380.81, 412.55, 396.34, 439.46], weeklyChange: 28.41, dayChange: 4.91, sortRank: 0, periodReturns: { '1M': 104.3, '6M': 283.5, '1Y': 203 },
      priceHistory: { '1D': [418.88, 445.32, 439.17, 439.66, 442.11, 444.48, 446.36, 443.5, 441.5, 443, 444.46, 430.76, 429.08, 431.7, 430.21, 430.51, 425.09, 427.27, 432.2, 431.95, 431.85, 436.8, 437.69, 439.46], '1W': [342.23, 380.81, 412.55, 396.34, 439.46], '1M': [215.12, 223.15, 256.73, 298.23, 306.51, 321.22, 302.71, 335.27, 353.29, 408.85, 411.83, 393.44, 342.93, 346.39, 324.86, 307.43, 342.23, 380.81, 412.55, 396.34, 439.46], '6M': [114.58, 111.55, 114.73, 111.79, 105.78, 114.73, 106.93, 124.61, 126.89, 128.14, 121.72, 120.55, 127.31, 136.89, 136.96, 143.86, 161.22, 175.49, 198.65, 208.84, 207.92, 223.15, 302.71, 411.83, 307.43, 439.46], '1Y': [145.04, 165.46, 146.88, 144.54, 161.92, 163.17, 137.58, 138.5, 138.91, 137.92, 138.31, 139.14, 153.86, 142.91, 139.62, 152.64, 154.81, 165.61, 170.68, 169.82, 152.38, 139.77, 132.53, 135.56, 141.31, 130.89, 114.03, 110.51, 115.53, 107.84, 107.17, 114.88, 104.55, 125.95, 127.24, 131.74, 124.11, 120.1, 128.36, 134.96, 151.28, 148.91, 159.34, 196.57, 201.69, 237.3, 221.21, 223.15, 302.71, 411.83, 307.43, 439.46] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$469B', pe: 529.5, revenueGrowth: 20, eps: 0.83, grossMargin: 98, dividendYield: null,
      etfPresence: { AIS: 2.27, ARTY: false, BAI: false, IGPT: false, IVES: false, ALAI: 0.55, CHAT: 3.12, AIFD: false, SPRX: 8.56, AOTG: false },
      tonyNote: 'Arm Holdings is held across Broad Tech and AI ETFs as the CPU architecture licensor embedded in every mobile device and increasingly in AI inference chips and data center CPUs. Revenue grew and the royalty model is high-margin; the weight score reflects consistent institutional positioning as the AI chip design ecosystem expands on Arm cores.',
    },
    {
      ticker: 'NBIS', name: 'NEBIUS GROUP NV', easyScore: 4, avgWeight: 3.41, proScore: 1.37, coverage: 0.4,
      price: 286.69, weeklyPrices: [222.24, 232.36, 260.07, 265.10, 286.69], weeklyChange: 29, dayChange: 2.06, sortRank: 0, periodReturns: { '1M': 43.4, '6M': 280, '1Y': 497.6 },
      priceHistory: { '1D': [280.91, 289.85, 286.96, 285.84, 279.34, 283.8, 289.09, 288.23, 287.88, 286.15, 286.19, 285.73, 284.22, 284.82, 284.78, 284.86, 284.47, 284.19, 284.38, 282.25, 280, 283.88, 285.31, 286.69], '1W': [222.24, 232.36, 260.07, 265.1, 286.69], '1M': [199.86, 197.73, 191.82, 219.93, 214.77, 208.06, 208.37, 226.34, 231.09, 264.51, 251.68, 259.67, 227.81, 218, 220.12, 211.69, 222.24, 232.36, 260.07, 265.1, 286.69], '6M': [75.45, 91.13, 89.95, 97.93, 108.73, 91.46, 88.16, 92.88, 97.52, 102.58, 86.8, 96.43, 116.33, 114.15, 92.26, 117.4, 161.94, 156.55, 135.51, 175.92, 179.11, 197.73, 208.37, 251.68, 211.69, 286.69], '1Y': [47.97, 51.84, 47.84, 51.95, 52.37, 51.37, 52, 68.78, 71.62, 68.98, 68.32, 64.06, 90.96, 99.31, 107.7, 127.98, 129.58, 113.44, 117.26, 130.82, 111.28, 83.54, 84.64, 94.87, 98.04, 87.69, 89.46, 86.04, 100.24, 105.43, 99.29, 97.87, 89.95, 91.79, 101.8, 106.12, 97.78, 112, 118.56, 114.91, 103.76, 125, 166.77, 156.14, 141.19, 195.09, 207.27, 197.73, 208.37, 251.68, 211.69, 286.69] },
      velocityScore: { '1D': 4.6, '1W': null, '1M': -33.2, '6M': null }, isNew: false,
      marketCap: '$73B', pe: 110.3, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 3.03, ALAI: 4.76, CHAT: 3.83, AIFD: 2.03, SPRX: false, AOTG: false },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, avgWeight: 2.94, proScore: 1.18, coverage: 0.4,
      price: 333.05, weeklyPrices: [297.88, 302.87, 311.93, 299.60, 333.05], weeklyChange: 11.81, dayChange: 4.87, sortRank: 0, periodReturns: { '1M': -2, '6M': 122.3, '1Y': 181 },
      priceHistory: { '1D': [317.58, 332.86, 331.25, 331.93, 334.54, 335.04, 336.23, 334.36, 332.9, 333.42, 333.69, 333.58, 333.39, 334.06, 332.99, 333.31, 332.27, 331.77, 331.82, 331.13, 330.96, 331.84, 334.29, 333.05], '1W': [297.88, 302.87, 311.93, 299.6, 333.05], '1M': [339.73, 322.63, 315.67, 323.4, 327.46, 323.91, 319.78, 314.18, 315.71, 323.39, 331.44, 323.92, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87, 311.93, 299.6, 333.05], '6M': [149.83, 166.87, 175.61, 163.58, 176.93, 181.23, 190.01, 202, 243.53, 253.15, 244.44, 270.06, 268.41, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 322.63, 319.78, 331.44, 280.98, 333.05], '1Y': [118.54, 127.16, 126.26, 124.72, 126.21, 137.47, 141.59, 139.93, 133.07, 125.97, 127.55, 121.82, 138.26, 143.6, 138.62, 160.2, 169.01, 174, 186.06, 192.86, 179.8, 170.97, 159.61, 179.73, 189.02, 161.27, 159.82, 165.62, 174.95, 172.72, 175.18, 189.21, 190.15, 199.62, 243.21, 262.19, 251.28, 268.26, 264.71, 270.89, 250.58, 281.03, 301.16, 305.14, 306.18, 358.92, 369.99, 322.63, 319.78, 331.44, 280.98, 333.05] },
      velocityScore: { '1D': 2.6, '1W': 2.6, '1M': -41, '6M': null }, isNew: false,
      marketCap: '$128B', pe: 83.7, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.57, ARTY: false, BAI: 1.9, IGPT: false, IVES: false, ALAI: false, CHAT: 2.21, AIFD: 4.09, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 4, avgWeight: 2.9, proScore: 1.16, coverage: 0.4,
      price: 184.29, weeklyPrices: [184.10, 184.13, 192.64, 188.33, 184.29], weeklyChange: 0.1, dayChange: 0.41, sortRank: 0, periodReturns: { '1M': -1.2, '6M': 3.3, '1Y': -10.2 },
      priceHistory: { '1D': [183.53, 179.71, 181.41, 182.34, 183.7, 184.76, 184.68, 184.31, 183.46, 184.97, 185.12, 185.12, 185.07, 186.45, 186.71, 187.65, 186.59, 185.89, 184.93, 185, 184.36, 184.59, 185.04, 184.29], '1W': [184.1, 184.13, 192.64, 188.33, 184.29], '1M': [186.61, 181.46, 188.16, 189.77, 192.08, 193.06, 190.96, 203.7, 225.78, 248.15, 230.33, 236.34, 213.68, 211.82, 205.81, 201.26, 184.1, 184.13, 192.64, 188.33, 184.29], '6M': [178.46, 197.49, 195.71, 198.52, 191.09, 182.44, 160.06, 156.59, 153.97, 146.14, 149.01, 149.4, 154.69, 154.34, 138.8, 143.17, 163, 181.17, 165.96, 185.35, 186.83, 181.46, 190.96, 230.33, 201.26, 184.29], '1Y': [205.17, 210.24, 232.26, 229.28, 243.54, 245.12, 244.42, 250.05, 248.28, 236.37, 226.13, 238.48, 302.14, 308.66, 283.46, 286.14, 292.96, 291.31, 283.33, 262.61, 239.26, 222.85, 210.69, 201.95, 217.58, 189.97, 191.97, 195.38, 193.75, 202.29, 179.92, 174.9, 154.67, 159.89, 156.17, 147.89, 152.37, 163.12, 152.9, 147.09, 147.11, 143.66, 169.81, 187.5, 163.83, 194.03, 189.76, 181.46, 190.96, 230.33, 201.26, 184.29] },
      velocityScore: { '1D': 0, '1W': -5.7, '1M': -38.3, '6M': null }, isNew: false,
      marketCap: '$530B', pe: 31.6, revenueGrowth: 21, eps: 5.84, grossMargin: 66, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 3.68, BAI: false, IGPT: false, IVES: 3.62, ALAI: false, CHAT: 1.51, AIFD: false, SPRX: false, AOTG: 2.77 },
      tonyNote: 'Oracle lands in 3 AI ETFs on the strength of its cloud database and AI infrastructure contracts. Revenue grew 22%, 67% gross margin, P/E of 40x. The 17.5% weekly return following a major earnings beat shows how quickly sentiment can reprice; the weight score at 2.04% is still modest, meaning ETF managers have started building positions but conviction is not yet deep.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 5.41, proScore: 5.41, coverage: 1,
      price: 1133.99, weeklyPrices: [995.87, 981.61, 1087.99, 1020.76, 1133.99], weeklyChange: 13.87, dayChange: 8.7, sortRank: 0, periodReturns: { '1M': 66.4, '6M': 402.8, '1Y': 817.5 },
      priceHistory: { '1D': [1043.19, 1099, 1106.11, 1118.26, 1121.66, 1124.56, 1128.4, 1126.12, 1122.69, 1126.87, 1127.72, 1125.45, 1127.32, 1129.46, 1134.23, 1134.65, 1138.57, 1141.99, 1142.73, 1144.29, 1139.82, 1142.21, 1147.02, 1133.99], '1W': [995.87, 981.61, 1087.99, 1020.76, 1133.99], '1M': [681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1133.99], '6M': [225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 891.88, 1133.99], '1Y': [123.6, 124.76, 119.92, 118.61, 113.23, 111.26, 104.88, 118.89, 120.87, 117.68, 119.01, 131.46, 157.77, 162.73, 157.27, 187.83, 181.6, 202.38, 219.02, 223.77, 237.92, 246.83, 201.37, 236.48, 237.22, 241.14, 265.92, 294.37, 343.43, 338.13, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.73, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 698.74, 928.41, 1079.57, 891.88, 1133.99] },
      velocityScore: { '1D': -13.3, '1W': -13.4, '1M': -8, '6M': null }, isNew: false,
      marketCap: '$1.3T', pe: 53.4, revenueGrowth: 196, eps: 21.23, grossMargin: 58, dividendYield: null,
      etfPresence: { SOXX: 8.39, PSI: 5.76, XSD: 3.82, DRAM: 3.68 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.39, proScore: 4.04, coverage: 0.75,
      price: 537.37, weeklyPrices: [488.45, 511.57, 547.26, 507.29, 537.37], weeklyChange: 10.02, dayChange: 4.86, sortRank: 0, periodReturns: { '1M': 27.6, '6M': 171.2, '1Y': 319 },
      priceHistory: { '1D': [512.48, 530.56, 531.21, 533.45, 530.77, 531.82, 537.11, 531.59, 528.43, 534.62, 533.55, 533.53, 533.4, 534.02, 533.83, 534.64, 532.61, 532.99, 530.67, 531.39, 531.3, 531.07, 534.21, 537.37], '1W': [488.45, 511.57, 547.26, 507.29, 537.37], '1M': [420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 537.37], '6M': [198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 196.31, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 452.4, 537.37], '1Y': [128.24, 143.81, 134.8, 146.24, 157, 166.47, 171.7, 172.76, 177.51, 167.76, 162.63, 151.41, 161.16, 157.39, 159.46, 164.67, 214.9, 233.08, 252.92, 256.12, 233.54, 246.81, 206.02, 217.53, 217.97, 210.78, 213.43, 215.61, 214.35, 220.97, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 204.83, 199.46, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 414.05, 495.54, 542.52, 452.4, 537.37] },
      velocityScore: { '1D': -8.8, '1W': -5.8, '1M': -28.6, '6M': null }, isNew: false,
      marketCap: '$876B', pe: 179.7, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 7.48, PSI: 4.85, XSD: 3.83, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.96, proScore: 3.72, coverage: 0.75,
      price: 133.99, weeklyPrices: [116.96, 124.57, 127.86, 117.05, 133.99], weeklyChange: 14.56, dayChange: 10.64, sortRank: 0, periodReturns: { '1M': 23.9, '6M': 271.7, '1Y': 535.6 },
      priceHistory: { '1D': [121.1, 133.09, 130.84, 129.89, 129.78, 130.23, 132.49, 132.1, 131.11, 132.65, 132.25, 133.63, 133.6, 133.93, 134.26, 133.86, 133.32, 134.62, 133.85, 134.09, 133.97, 134.27, 134.41, 133.99], '1W': [116.96, 124.57, 127.86, 117.05, 133.99], '1M': [108.17, 110.8, 118.96, 118.5, 119.84, 123.52, 121.77, 120.89, 114.68, 109.33, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 133.99], '6M': [36.05, 36.16, 39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 46.12, 43.1, 46.78, 44.06, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 121.77, 112.71, 107.04, 133.99], '1Y': [21.08, 22.69, 22, 23.3, 23.26, 20.7, 19.31, 19.95, 24.56, 24.8, 24.35, 24.48, 24.77, 29.58, 35.5, 36.83, 36.37, 37.01, 38.28, 39.99, 38.13, 35.52, 33.62, 40.56, 41.41, 37.81, 36.82, 36.68, 40.04, 47.29, 48.56, 43.93, 49.25, 47.13, 45.46, 46.88, 45.58, 47.98, 45.03, 44.06, 44.13, 58.95, 64.94, 65.27, 94.75, 113.01, 120.29, 110.8, 121.77, 112.71, 107.04, 133.99] },
      velocityScore: { '1D': 0.3, '1W': 2.2, '1M': -3.1, '6M': null }, isNew: false,
      marketCap: '$673B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.07, PSI: 4.94, XSD: 3.87, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 4.44, proScore: 3.33, coverage: 0.75,
      price: 210.69, weeklyPrices: [204.87, 205.19, 212.45, 207.41, 210.69], weeklyChange: 2.84, dayChange: 2.95, sortRank: 0, periodReturns: { '1M': -5.2, '6M': 23.3, '1Y': 46.5 },
      priceHistory: { '1D': [204.65, 207.14, 207.72, 208.93, 209.35, 209.32, 209.27, 208.88, 208.19, 209.27, 209.53, 210.97, 210.13, 209.96, 210.06, 210.04, 209.66, 209.85, 210.1, 209.78, 210.06, 209.85, 210.15, 210.69], '1W': [204.87, 205.19, 212.45, 207.41, 210.69], '1M': [222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 210.69], '6M': [170.94, 188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 181.93, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 214.75, 200.42, 210.69], '1Y': [143.85, 157.75, 158.24, 164.07, 171.38, 173.5, 173.72, 182.7, 180.45, 177.99, 174.18, 168.31, 177.75, 176.67, 178.19, 187.62, 183.16, 183.22, 186.26, 202.49, 188.15, 190.17, 180.64, 177, 182.41, 175.02, 180.99, 188.22, 187.24, 185.81, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 186.03, 180.4, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 220.61, 212.6, 214.75, 200.42, 210.69] },
      velocityScore: { '1D': 13.7, '1W': 11.4, '1M': -5.1, '6M': null }, isNew: false,
      marketCap: '$5.1T', pe: 32.3, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: null,
      etfPresence: { SOXX: 7.17, PSI: 4.47, XSD: 1.69, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.49, proScore: 2.62, coverage: 0.75,
      price: 434.46, weeklyPrices: [412.13, 417.79, 427.58, 416.00, 434.46], weeklyChange: 5.42, dayChange: 4.83, sortRank: 0, periodReturns: { '1M': 3.8, '6M': 60.3, '1Y': 90.3 },
      priceHistory: { '1D': [414.45, 430.03, 431.96, 433.9, 435.83, 433.91, 434.69, 432.91, 432.54, 432.34, 433.69, 434.94, 434.09, 434.02, 432.04, 429.84, 430.56, 430.23, 429.16, 429.48, 429.86, 429.18, 434.51, 434.46], '1W': [412.13, 417.79, 427.58, 416, 434.46], '1M': [418.58, 414.31, 398.05, 384.21, 397.07, 419.94, 416.88, 419.01, 413.85, 402.69, 437.67, 428.76, 401.39, 403.89, 404.62, 392.67, 412.13, 417.79, 427.58, 416, 434.46], '6M': [271.04, 277.56, 273.74, 300.93, 300.25, 304.01, 316.86, 322.97, 337.51, 356.09, 338.99, 318.81, 313.66, 312.19, 303.1, 327.41, 348.6, 375.27, 383.26, 404.77, 419.65, 414.31, 416.88, 437.67, 392.67, 434.46], '1Y': [228.35, 236.96, 241.81, 243.46, 240.48, 227.82, 221.71, 223.95, 231.63, 252.2, 251.31, 248.98, 244.91, 245.33, 247.56, 241.99, 225.32, 242.87, 238.01, 234.13, 228.48, 234.89, 225.2, 265.34, 281.29, 279.32, 274.44, 275.63, 292.94, 296.21, 295.67, 303.83, 311.29, 325.16, 346.37, 360.8, 341.51, 319.22, 308.59, 321.83, 318.14, 346.21, 347.94, 381.42, 389.31, 415.63, 432.39, 414.31, 416.88, 437.67, 392.67, 434.46] },
      velocityScore: { '1D': 10.1, '1W': 8.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$212B', pe: 64.5, revenueGrowth: 37, eps: 6.74, grossMargin: 64, dividendYield: null,
      etfPresence: { SOXX: 3.77, PSI: 4.71, XSD: 1.99, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 5.54, proScore: 2.77, coverage: 0.5,
      price: 617.11, weeklyPrices: [552.64, 567.25, 585.78, 568.23, 617.11], weeklyChange: 11.67, dayChange: 4.08, sortRank: 0, periodReturns: { '1M': 49.2, '6M': 148.6, '1Y': 264.2 },
      priceHistory: { '1D': [592.92, 627.6, 634.4, 634.85, 631.49, 630, 632.3, 631.58, 628.51, 628.76, 627.5, 625.54, 621.53, 619.03, 617.32, 618.35, 615.67, 612.83, 614.23, 616.39, 615.78, 615.11, 623.59, 617.11], '1W': [552.64, 567.25, 585.78, 568.23, 617.11], '1M': [413.57, 406.91, 426.85, 427.36, 432.16, 454.89, 448.25, 449.68, 450.06, 458.17, 500.77, 501.7, 453.01, 492.17, 499.21, 497.01, 552.64, 567.25, 585.78, 568.23, 617.11], '6M': [248.27, 260.78, 268.87, 301.18, 327.01, 319.46, 328.4, 330.57, 359.13, 377.93, 351.32, 345.88, 352.46, 361.79, 323.12, 354.31, 395.64, 394.33, 381.11, 410.82, 431.2, 406.91, 448.25, 500.77, 497.01, 617.11], '1Y': [169.46, 183.21, 190.78, 197.1, 192.61, 185.69, 179.99, 184.87, 161.76, 162.49, 160.76, 162.05, 170.93, 190.1, 203.92, 217.53, 209.95, 224.99, 228.75, 233.1, 230.07, 226.01, 220.23, 252.25, 268, 259.21, 256.41, 263.05, 296.01, 304.87, 318.23, 332.71, 318.67, 329.07, 369.3, 394.95, 357.76, 351.07, 349.47, 373.99, 341.79, 385.72, 394.26, 403.48, 382.59, 428.62, 436.61, 406.91, 448.25, 500.77, 497.01, 617.11] },
      velocityScore: { '1D': -6.7, '1W': -2.5, '1M': -6.1, '6M': null }, isNew: false,
      marketCap: '$490B', pe: 58.1, revenueGrowth: 11, eps: 10.63, grossMargin: 49, dividendYield: null,
      etfPresence: { SOXX: 4.92, PSI: 6.17, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 5.36, proScore: 2.68, coverage: 0.5,
      price: 259.56, weeklyPrices: [241.16, 254.54, 256.42, 237.33, 259.56], weeklyChange: 7.63, dayChange: 8.73, sortRank: 0, periodReturns: { '1M': 47.8, '6M': 121.5, '1Y': 205.4 },
      priceHistory: { '1D': [238.73, 252.43, 256.59, 256.59, 254.06, 254.2, 254.29, 255.73, 257.27, 259.21, 259.14, 259.71, 259.3, 259.65, 258.59, 259.84, 259.47, 258.18, 258.67, 260.71, 261.4, 261.31, 263.46, 259.56], '1W': [241.16, 254.54, 256.42, 237.33, 259.56], '1M': [175.65, 174.06, 182.95, 184.22, 188.84, 201.14, 195.72, 192.76, 192.17, 194, 212.51, 213.11, 192.92, 210.81, 213.94, 213.56, 241.16, 254.54, 256.42, 237.33, 259.56], '6M': [117.2, 127.7, 127.45, 140, 156.78, 154.3, 141.04, 144.02, 147.02, 150.66, 144.13, 145.29, 148.13, 151.14, 138.26, 154.88, 179.59, 178.54, 180.9, 173.29, 181.13, 174.06, 195.72, 212.51, 213.56, 259.56], '1Y': [85, 88.99, 91.26, 92.18, 93.78, 90.21, 88.66, 91.48, 87.49, 87.03, 87.2, 90.9, 98.89, 104.48, 106.43, 110.15, 98.28, 110.67, 118.28, 120.87, 119.34, 113.43, 110.25, 117.55, 121.45, 119.39, 124.57, 126.04, 139.5, 144.18, 148.62, 161.63, 135.55, 143.08, 148.03, 154.67, 147.59, 146.5, 148.24, 156.62, 147.24, 167.23, 174.81, 181.21, 181.62, 181.63, 184.97, 174.06, 195.72, 212.51, 213.56, 259.56] },
      velocityScore: { '1D': 14, '1W': 9.8, '1M': 2.7, '6M': null }, isNew: false,
      marketCap: '$339B', pe: 73.3, revenueGrowth: 12, eps: 3.54, grossMargin: 61, dividendYield: 0.39,
      etfPresence: { SOXX: 4.85, PSI: 5.87, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 5.18, proScore: 2.59, coverage: 0.5,
      price: 310.58, weeklyPrices: [280.71, 279.70, 308.88, 278.67, 310.58], weeklyChange: 10.64, dayChange: 7.27, sortRank: 0, periodReturns: { '1M': 83.9, '6M': 280.1, '1Y': 322.5 },
      priceHistory: { '1D': [289.54, 307.2, 314.01, 317.6, 320.13, 325.04, 323.82, 324.48, 321.65, 324.55, 327.35, 324.45, 323.8, 324.2, 325.78, 329.32, 325.58, 324.98, 323.57, 322.92, 326.39, 328.78, 327.86, 310.58], '1W': [280.71, 279.7, 308.88, 278.67, 310.58], '1M': [168.93, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 204.83, 205, 219.43, 301.65, 316.43, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 310.58], '6M': [81.7, 86.49, 89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 77.51, 93.3, 90.79, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 198.7, 301.65, 252.59, 310.58], '1Y': [73.51, 77.16, 71.55, 72.51, 73.06, 74.21, 74.45, 77.34, 76.19, 73, 62.87, 66, 67.43, 74.26, 83.17, 86.22, 85.61, 87.95, 84.13, 93.74, 90.92, 86.45, 76.68, 89.4, 98.91, 84.43, 84.09, 85.76, 88.23, 83.05, 79.8, 82.93, 75.54, 82.01, 79.09, 80.92, 78.09, 90.44, 87.62, 92.36, 99.05, 114.45, 134.6, 157.32, 156.57, 172.15, 177.95, 176.27, 198.7, 301.65, 252.59, 310.58] },
      velocityScore: { '1D': -21.5, '1W': -20.1, '1M': -23.6, '6M': null }, isNew: false,
      marketCap: '$272B', pe: 107.1, revenueGrowth: 28, eps: 2.9, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { SOXX: 5.44, PSI: false, XSD: 4.91, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 4.94, proScore: 2.47, coverage: 0.5,
      price: 389.04, weeklyPrices: [362.52, 366.81, 388.92, 369.34, 389.04], weeklyChange: 7.32, dayChange: 3.97, sortRank: 0, periodReturns: { '1M': 40, '6M': 151, '1Y': 329.9 },
      priceHistory: { '1D': [374.18, 396.01, 399.3, 397.05, 394.71, 397.02, 394.55, 395.86, 396.04, 396.71, 397.52, 397.18, 394.83, 396.38, 395.2, 395.99, 395.21, 392.71, 393.02, 394.14, 393.75, 392.77, 396.11, 389.04], '1W': [362.52, 366.81, 388.92, 369.34, 389.04], '1M': [277.96, 273.38, 292.09, 302.24, 305.35, 322.68, 318.93, 318, 318.18, 317.12, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 389.04], '6M': [154.98, 177.33, 185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.58, 244.25, 217.27, 215.23, 226.47, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 273.38, 318.93, 343.71, 321.8, 389.04], '1Y': [90.49, 97.2, 98.14, 99.62, 101.74, 96.96, 96.37, 101.75, 99.51, 100.08, 100.15, 105.07, 119.21, 126.92, 128.33, 145.81, 131.37, 141.51, 151.68, 157.46, 159.35, 148.26, 139.59, 156, 158.7, 160.52, 172.27, 175.87, 206.96, 214.38, 222.41, 238.46, 230.1, 226.61, 240.09, 249.48, 222.99, 218.87, 224.71, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 295.44, 273.38, 318.93, 343.71, 321.8, 389.04] },
      velocityScore: { '1D': 5.6, '1W': 6, '1M': -7.5, '6M': null }, isNew: false,
      marketCap: '$487B', pe: 73.7, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.28,
      etfPresence: { SOXX: 4.39, PSI: 5.49, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 4.19, proScore: 2.09, coverage: 0.5,
      price: 411.35, weeklyPrices: [385.57, 382.07, 393.94, 376.71, 411.35], weeklyChange: 6.69, dayChange: 4.7, sortRank: 0, periodReturns: { '1M': -2.2, '6M': 26.2, '1Y': 64.5 },
      priceHistory: { '1D': [392.9, 406.62, 406.12, 409.5, 408.61, 409.05, 410.11, 408.8, 406.88, 408.85, 409.38, 408.3, 408.43, 407.4, 407.29, 408.02, 407.77, 407.36, 407.45, 408.21, 408.06, 409.2, 410.79, 411.35], '1W': [385.57, 382.07, 393.94, 376.71, 411.35], '1M': [420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 411.35], '6M': [326.02, 350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 321.31, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 479.23, 372.1, 411.35], '1Y': [249.99, 269.35, 274.18, 275.6, 288.21, 290.18, 288.64, 304.97, 306.34, 294, 297.39, 345.65, 364.09, 344.94, 334.53, 338.37, 324.63, 349.33, 354.13, 369.63, 349.43, 342.46, 346.82, 402.96, 390.24, 359.93, 340.36, 349.39, 343.77, 354.61, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 341.57, 315.93, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 411.07, 421.86, 479.23, 372.1, 411.35] },
      velocityScore: { '1D': 11.2, '1W': 11.8, '1M': -44.4, '6M': null }, isNew: false,
      marketCap: '$2.0T', pe: 68.2, revenueGrowth: 48, eps: 6.03, grossMargin: 76, dividendYield: 0.69,
      etfPresence: { SOXX: 6.61, PSI: false, XSD: 1.77, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 3.61, proScore: 1.81, coverage: 0.5,
      price: 417.07, weeklyPrices: [367.47, 367.15, 389.20, 361.71, 417.07], weeklyChange: 13.5, dayChange: 11.31, sortRank: 0, periodReturns: { '1M': 93.5, '6M': 197.4, '1Y': 348.1 },
      priceHistory: { '1D': [374.68, 387.38, 394.14, 401.3, 407.37, 409.39, 412.1, 413.04, 412.54, 419, 419.23, 419.8, 418.48, 415.4, 420.55, 419.89, 414.01, 413.34, 412.95, 412.81, 412.54, 411.86, 414.39, 417.07], '1W': [367.47, 367.15, 389.2, 361.71, 417.07], '1M': [215.58, 244.26, 287.48, 297.84, 306.88, 318.72, 325.33, 349.17, 342.85, 320.09, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 417.07], '6M': [140.24, 169.97, 179.56, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.4, 109.8, 116.48, 127.57, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 325.33, 363.54, 330.86, 417.07], '1Y': [93.07, 91.02, 89.62, 90.32, 121.89, 122.23, 131.1, 179.28, 185.85, 179.09, 182.2, 216.1, 231.29, 245.2, 197.78, 200.74, 206.21, 159.8, 164.97, 186.68, 165.49, 144.34, 139.29, 157.57, 161.23, 148.85, 164.4, 170.1, 161.01, 180.56, 183.75, 170.93, 158.52, 182.86, 129.58, 128.15, 113.77, 124.71, 126.34, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 224.09, 244.26, 325.33, 363.54, 330.86, 417.07] },
      velocityScore: { '1D': 2.3, '1W': 4, '1M': -15, '6M': null }, isNew: false,
      marketCap: '$71B', pe: 281.8, revenueGrowth: 93, eps: 1.48, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.61, PSI: false, XSD: 4.61, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 3.06, proScore: 1.53, coverage: 0.5,
      price: 322.86, weeklyPrices: [297.10, 301.12, 313.34, 305.71, 322.86], weeklyChange: 8.67, dayChange: 6.95, sortRank: 0, periodReturns: { '1M': 7.4, '6M': 85, '1Y': 62.9 },
      priceHistory: { '1D': [301.88, 312.86, 316.25, 317.05, 317.42, 317.32, 317.06, 316.17, 315.83, 316.61, 316.68, 319.3, 319.02, 321, 320.66, 320.58, 320.83, 321.17, 320.43, 321.5, 320.57, 320.81, 322.79, 322.86], '1W': [297.1, 301.12, 313.34, 305.71, 322.86], '1M': [300.6, 302.31, 304.88, 298.39, 309.21, 324.89, 317.45, 315.95, 305.68, 293.2, 308.59, 305.37, 285.06, 290.9, 288.63, 282.01, 297.1, 301.12, 313.34, 305.71, 322.86], '6M': [174.49, 177.13, 177.52, 190.31, 191.58, 196.59, 225.01, 218.77, 225.69, 213.35, 202.67, 197.46, 194.45, 188.63, 186.42, 199.74, 218.87, 233.15, 265, 281, 295.17, 302.31, 317.45, 308.59, 282.01, 322.86], '1Y': [198.2, 207.08, 213.41, 220.05, 214.57, 184.99, 180.86, 187.22, 194.57, 206.06, 202.48, 185.82, 178.2, 179.37, 184.55, 180.32, 171.7, 176.58, 169.13, 161.46, 160.55, 159.33, 153.33, 168.27, 182.54, 179.42, 176.29, 175.69, 192.1, 188.53, 189.59, 196.63, 225.21, 220.92, 223.32, 213.9, 202.39, 198.67, 190.78, 194.63, 194.14, 208.9, 216.29, 236.31, 269.22, 289.44, 306.34, 302.31, 317.45, 308.59, 282.01, 322.86] },
      velocityScore: { '1D': 7.7, '1W': 8.5, '1M': -51.4, '6M': null }, isNew: false,
      marketCap: '$294B', pe: 55.3, revenueGrowth: 19, eps: 5.84, grossMargin: 57, dividendYield: null,
      etfPresence: { SOXX: 3.79, PSI: false, XSD: 2.33, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.89, proScore: 1.45, coverage: 0.5,
      price: 313.27, weeklyPrices: [302.55, 304.86, 315.88, 302.89, 313.27], weeklyChange: 3.54, dayChange: 5.05, sortRank: 0, periodReturns: { '1M': 7.4, '6M': 40.3, '1Y': 49.9 },
      priceHistory: { '1D': [298.2, 311.46, 312.67, 313.93, 315.76, 315.8, 317.23, 315.88, 314.24, 314.24, 314.16, 315.05, 314.83, 315.73, 315.53, 316.11, 315.33, 315.18, 314.37, 314.35, 314.04, 314.64, 316.39, 313.27], '1W': [302.55, 304.86, 315.88, 302.89, 313.27], '1M': [291.68, 294.28, 310.15, 299.38, 316.47, 332.67, 329.24, 330.28, 321.35, 311.38, 321.88, 322.22, 295.96, 301.14, 297.41, 285.56, 302.55, 304.86, 315.88, 302.89, 313.27], '6M': [223.23, 225.26, 221.28, 241.15, 237.11, 231.05, 231.08, 228.91, 245.09, 234.63, 215.25, 203.03, 194.02, 193.39, 187.39, 195.12, 209.89, 224.5, 230.39, 292.35, 294.23, 294.28, 329.24, 321.88, 285.56, 313.27], '1Y': [209, 217.04, 226, 224.61, 228.27, 223.29, 209.92, 207.16, 228.78, 234.83, 234.85, 225.5, 219.27, 224.05, 226.04, 228.89, 205.37, 214.35, 219.16, 209.12, 204.56, 197.1, 184.19, 194.94, 227.95, 228.16, 226.27, 220.46, 245.95, 239.09, 230.7, 229.42, 220.66, 236.62, 237.33, 235.07, 216.37, 199.87, 192.69, 196.4, 196.86, 204.27, 209.39, 225.75, 289.25, 303.55, 298.41, 294.28, 329.24, 321.88, 285.56, 313.27] },
      velocityScore: { '1D': 8.2, '1W': 5.8, '1M': -30.3, '6M': null }, isNew: false,
      marketCap: '$79B', pe: 30, revenueGrowth: 12, eps: 10.45, grossMargin: 56, dividendYield: 1.34,
      etfPresence: { SOXX: 3.5, PSI: false, XSD: 2.29, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.83, proScore: 1.42, coverage: 0.5,
      price: 226.11, weeklyPrices: [202.96, 211.72, 220.81, 214.07, 226.11], weeklyChange: 11.41, dayChange: 6.17, sortRank: 0, periodReturns: { '1M': 11, '6M': 31.2, '1Y': 49.4 },
      priceHistory: { '1D': [212.97, 217.21, 228.03, 223.23, 225, 224.41, 222.67, 222.04, 220.55, 219.61, 220.28, 221.96, 222.68, 224.84, 225.63, 227.32, 228.18, 228.63, 228.1, 228.41, 226.8, 226.57, 226, 226.11], '1W': [202.96, 211.72, 220.81, 214.07, 226.11], '1M': [203.64, 195.61, 202.51, 213.41, 238.16, 248.82, 233.4, 243.29, 251.02, 228.99, 250.01, 242.57, 215.94, 217.77, 205.42, 191.2, 202.96, 211.72, 220.81, 214.07, 226.11], '6M': [172.34, 174.77, 172.98, 177.78, 159.42, 154.52, 152.62, 138.93, 142.63, 144.78, 138.13, 135.2, 131.59, 128.35, 127.07, 124.07, 132.84, 135.56, 150, 186.55, 210.31, 195.61, 233.4, 250.01, 191.2, 226.11], '1Y': [151.32, 158.54, 158.09, 154.29, 158.97, 158.4, 148.19, 147.56, 157.85, 158.01, 160.73, 160.24, 161.22, 166.85, 169.2, 169.18, 153.59, 163.45, 168.94, 180.9, 170.89, 173.98, 159.59, 168.09, 174.81, 178.29, 175.25, 173.43, 182.45, 165.29, 154.07, 153.04, 147.18, 140.09, 143.24, 145.82, 139.51, 134.12, 130.47, 128.67, 128.78, 127.51, 133.05, 136.07, 156, 192.57, 213.17, 195.61, 233.4, 250.01, 191.2, 226.11] },
      velocityScore: { '1D': -4.1, '1W': -0.7, '1M': -38.5, '6M': null }, isNew: false,
      marketCap: '$238B', pe: 24.3, revenueGrowth: -4, eps: 9.29, grossMargin: 55, dividendYield: 1.72,
      etfPresence: { SOXX: 3.23, PSI: false, XSD: 2.43, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.69, proScore: 1.35, coverage: 0.5,
      price: 1563.7, weeklyPrices: [1589.55, 1577.32, 1652.29, 1498.77, 1563.70], weeklyChange: -1.63, dayChange: 7.97, sortRank: 0, periodReturns: { '1M': 5.2, '6M': 71.4, '1Y': 128 },
      priceHistory: { '1D': [1448.21, 1533.16, 1543.9, 1545.59, 1565.9, 1555.3, 1542.56, 1540, 1537.02, 1541.4, 1546.5, 1553.1, 1551.48, 1562.75, 1557.9, 1556.74, 1556.31, 1560.94, 1554.81, 1556.23, 1556.39, 1558.17, 1567.29, 1563.7], '1W': [1589.55, 1577.32, 1652.29, 1498.77, 1563.7], '1M': [1486.33, 1468.11, 1553.27, 1561.25, 1589.81, 1662.98, 1620.17, 1633.17, 1566.21, 1542.39, 1689.89, 1652.6, 1481.05, 1559.18, 1531.98, 1473.04, 1589.55, 1577.32, 1652.29, 1498.77, 1563.7], '6M': [912.25, 953.25, 936.31, 958.97, 1033.17, 1068.14, 1173.22, 1206.18, 1173.18, 1213.67, 1074.37, 1055.82, 1066.66, 1076.35, 1002.34, 1191.22, 1363.42, 1527.95, 1504.08, 1588.12, 1599.52, 1468.11, 1620.17, 1689.89, 1473.04, 1563.7], '1Y': [685.9, 736.03, 741.17, 721.14, 724.77, 714.68, 785.62, 804.29, 826.47, 844, 835.76, 864.32, 849.71, 916.36, 887.55, 918.83, 904.44, 1004.65, 1074.91, 1005, 958.26, 920.19, 857.19, 928.17, 963.28, 946.51, 937.11, 930.04, 1005.38, 983.28, 1034.49, 1095.49, 1164.83, 1142.02, 1188.32, 1231.95, 1099.02, 1071.09, 1075.29, 1101.59, 1093.35, 1312.94, 1353, 1522.04, 1526.84, 1652.35, 1650.35, 1468.11, 1620.17, 1689.89, 1473.04, 1563.7] },
      velocityScore: { '1D': 7.1, '1W': -3.6, '1M': -35.7, '6M': null }, isNew: false,
      marketCap: '$77B', pe: 112.2, revenueGrowth: 26, eps: 13.94, grossMargin: 55, dividendYield: 0.53,
      etfPresence: { SOXX: 3.31, PSI: false, XSD: 2.07, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.66, proScore: 1.33, coverage: 0.5,
      price: 271.83, weeklyPrices: [264.76, 250.81, 259.41, 239.18, 271.83], weeklyChange: 2.67, dayChange: 9.02, sortRank: 0, periodReturns: { '1M': 73.9, '6M': 102.7, '1Y': 217.9 },
      priceHistory: { '1D': [249.33, 258.77, 253.95, 264.16, 266.46, 265.07, 267.13, 264.23, 262.47, 265.87, 263.93, 262.25, 262.1, 261.14, 262.04, 262.99, 262.64, 262.11, 262.66, 263.55, 264.64, 265.61, 270.1, 271.83], '1W': [264.76, 250.81, 259.41, 239.18, 271.83], '1M': [156.27, 168.99, 182.98, 193.39, 218.41, 221.64, 221.23, 222.35, 236.03, 226.1, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 271.83], '6M': [134.13, 150.19, 143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 97.3, 112.33, 104.06, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.23, 214.6, 237.68, 271.83], '1Y': [85.51, 93.49, 92.73, 98.7, 95.74, 101.22, 107.56, 120.41, 116.74, 114.04, 123.06, 147.53, 163.98, 169.56, 142.93, 143.87, 138.83, 143.61, 155.55, 187.62, 163.61, 145.52, 134.73, 177.6, 176.04, 143.91, 150.13, 144.7, 132.95, 161.38, 153.22, 129.57, 111.31, 134.72, 127.91, 123.46, 102.54, 115.91, 101.72, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 168.99, 221.23, 214.6, 237.68, 271.83] },
      velocityScore: { '1D': 1.5, '1W': -5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$51B', pe: 108.3, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 2.01, PSI: false, XSD: 3.3, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 2.52, proScore: 1.26, coverage: 0.5,
      price: 121.62, weeklyPrices: [115.96, 116.79, 125.90, 118.25, 121.62], weeklyChange: 4.88, dayChange: 7.7, sortRank: 0, periodReturns: { '1M': 11.1, '6M': 128.1, '1Y': 130.3 },
      priceHistory: { '1D': [112.92, 119.44, 119.28, 120.26, 120.71, 120.32, 120.28, 120.16, 119.61, 119.71, 119.77, 120.29, 120.17, 120.74, 120.53, 120.69, 120.5, 120.67, 120.05, 120.03, 119.71, 120.13, 121.43, 121.62], '1W': [115.96, 116.79, 125.9, 118.25, 121.62], '1M': [109.43, 106.02, 110.21, 109.61, 116.2, 127, 124.89, 123.77, 120.62, 120.92, 133.93, 131.82, 117.26, 120.9, 117, 110.17, 115.96, 116.79, 125.9, 118.25, 121.62], '6M': [53.33, 55.08, 56.7, 62.16, 60.33, 61.13, 61.53, 65.1, 71.96, 70.03, 63.42, 59.59, 60.98, 59.89, 55.66, 63.79, 72.05, 86.91, 93.3, 102.67, 104.11, 106.02, 124.89, 133.93, 110.17, 121.62], '1Y': [52.82, 52.93, 54.61, 59.07, 60.55, 56.92, 56.82, 47.66, 51.09, 51.85, 49.59, 48.88, 48.11, 51.07, 50.16, 49.27, 45.74, 52.53, 50.71, 50.08, 47.83, 46.92, 44.9, 50.24, 54.74, 54.96, 55.21, 54.02, 61.76, 59.41, 60.06, 62.63, 59.43, 67.38, 70.66, 69.68, 62.53, 59.24, 60.46, 62.34, 61.92, 68.38, 72.43, 88.99, 98.86, 105.77, 115.71, 106.02, 124.89, 133.93, 110.17, 121.62] },
      velocityScore: { '1D': 0, '1W': -3.8, '1M': -32.6, '6M': null }, isNew: false,
      marketCap: '$47B', pe: 89.4, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.12, PSI: false, XSD: 2.92, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.28, proScore: 1.14, coverage: 0.5,
      price: 99.77, weeklyPrices: [92.94, 95.24, 100.32, 95.63, 99.77], weeklyChange: 7.35, dayChange: 6.01, sortRank: 0, periodReturns: { '1M': 7.6, '6M': 55.9, '1Y': 44.7 },
      priceHistory: { '1D': [94.11, 98.2, 98.45, 99.63, 99.93, 99.5, 99.48, 99.1, 98.89, 98.95, 99.08, 99.81, 99.52, 99.85, 99.86, 99.81, 99.78, 99.69, 99.41, 99.57, 99.39, 99.15, 99.92, 99.77], '1W': [92.94, 95.24, 100.32, 95.63, 99.77], '1M': [92.76, 91.81, 94.02, 91.11, 93.43, 98.05, 96.85, 96.04, 94.65, 91.52, 96.55, 96.3, 88.34, 91.37, 91.47, 87.91, 92.94, 95.24, 100.32, 95.63, 99.77], '6M': [63.99, 65.36, 65.03, 75.22, 74.7, 74.79, 78.08, 74.41, 78.94, 75.93, 71.39, 65.33, 64.59, 64.34, 60.06, 67.51, 74.5, 80.93, 84.26, 98.48, 97.7, 91.81, 96.85, 96.55, 87.91, 99.77], '1Y': [68.97, 70.49, 71.48, 74.05, 73.85, 69.21, 66.36, 61.87, 65.71, 69.14, 65, 65.3, 63.17, 65.15, 64.42, 66.54, 60.41, 65.14, 63.17, 62.42, 56.28, 53.48, 49.02, 53.58, 65.81, 67.18, 64.91, 64.65, 74.87, 74.07, 73.17, 75.16, 76.66, 76.86, 79.11, 75.47, 69.9, 65.79, 64.71, 65.63, 64.61, 70.73, 74.49, 82.48, 90.17, 102.92, 96.71, 91.81, 96.85, 96.55, 87.91, 99.77] },
      velocityScore: { '1D': -0.9, '1W': -0.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$54B', pe: 453.5, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 1.9,
      etfPresence: { SOXX: 2.37, PSI: false, XSD: 2.2, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.87, proScore: 0.93, coverage: 0.5,
      price: 391.41, weeklyPrices: [374.76, 379.87, 384.77, 368.32, 391.41], weeklyChange: 4.44, dayChange: 6.62, sortRank: 0, periodReturns: { '1M': 9.9, '6M': 132.6, '1Y': 185.7 },
      priceHistory: { '1D': [367.11, 378.4, 377.91, 380.41, 382.48, 381.33, 381.35, 380.06, 379.53, 381.62, 381.82, 384.88, 384.9, 386.21, 384, 384.43, 383.93, 384.82, 382.89, 384.12, 384.72, 385.61, 388.36, 391.41], '1W': [374.76, 379.87, 384.77, 368.32, 391.41], '1M': [356.25, 358.98, 375.71, 380.45, 385.98, 409.68, 400.66, 391.09, 364.64, 353.79, 390.34, 382.74, 345.4, 361.86, 358.72, 354.4, 374.76, 379.87, 384.77, 368.32, 391.41], '6M': [168.31, 175.81, 174.96, 174.87, 220.68, 218.89, 228.56, 235.7, 245.59, 248.29, 241.01, 220.59, 221.29, 229.26, 209.49, 236.99, 263.92, 285.71, 265.61, 303.57, 362.76, 358.98, 400.66, 390.34, 354.4, 391.41], '1Y': [136.99, 142.05, 138.04, 136.63, 140.58, 137.67, 136.31, 120.94, 123.09, 126.15, 128.15, 130.25, 131.42, 127.12, 129.39, 127.41, 122.18, 136.82, 140.85, 148.13, 170.03, 162.5, 155.39, 174.99, 184.1, 177.35, 174.42, 173.71, 171.77, 213.52, 221.7, 219.2, 226.71, 230.54, 246.76, 253.37, 239, 222.55, 218.89, 237.23, 222.07, 247, 261.16, 277, 269.63, 309.81, 381.55, 358.98, 400.66, 390.34, 354.4, 391.41] },
      velocityScore: { '1D': 0, '1W': -2.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$30B', pe: 165.9, revenueGrowth: 23, eps: 2.36, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.21, PSI: false, XSD: 2.53, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RMBS', name: 'RAMBUS INC', easyScore: 2, avgWeight: 1.42, proScore: 0.71, coverage: 0.5,
      price: 141.17, weeklyPrices: [144.47, 146.56, 143.29, 132.48, 141.17], weeklyChange: -2.28, dayChange: 8.51, sortRank: 0, periodReturns: { '1M': 14.1, '6M': 55.8, '1Y': 137.7 },
      priceHistory: { '1D': [130.1, 138.4, 137.03, 137.46, 137.43, 136.58, 137.52, 138.02, 137.78, 139.74, 137.63, 137.1, 136.62, 137.42, 137.01, 137.51, 137.01, 137.33, 136.93, 137.73, 138.24, 138.65, 141.8, 141.17], '1W': [144.47, 146.56, 143.29, 132.48, 141.17], '1M': [123.76, 122.03, 133.56, 141.82, 142.98, 157.23, 148.66, 148.02, 145.46, 147.48, 170.66, 169.35, 145.31, 152.03, 146.84, 138.12, 144.47, 146.56, 143.29, 132.48, 141.17], '6M': [90.61, 94.48, 99.28, 93.38, 107.99, 114.19, 113.71, 110.92, 101.95, 98.57, 87.59, 89.61, 93.5, 93.35, 79.73, 91.87, 121.73, 130.45, 111.27, 118, 130.28, 122.03, 148.66, 170.66, 138.12, 141.17], '1Y': [59.38, 64, 63.79, 63.28, 68.91, 62.85, 72.41, 72.86, 74.22, 73.77, 73.77, 73.28, 94.88, 102.35, 102.62, 99.99, 89.57, 96.26, 105.42, 102.84, 107.67, 95.25, 87.28, 95.57, 101.6, 94.23, 96.4, 93.57, 97, 95.48, 110.1, 115.71, 98.45, 106.99, 104.34, 101.09, 92.04, 92.53, 93.32, 92.69, 86.03, 101.43, 120.02, 131.55, 112.16, 130.04, 134.85, 122.03, 148.66, 170.66, 138.12, 141.17] },
      velocityScore: { '1D': 0, '1W': -9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 66.9, revenueGrowth: 8, eps: 2.11, grossMargin: 80, dividendYield: null,
      etfPresence: { SOXX: 0.68, PSI: false, XSD: 2.15, DRAM: false },
      tonyNote: 'RAMBUS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 7, avgWeight: 4.61, proScore: 2.48, coverage: 0.538,
      price: 1133.99, weeklyPrices: [995.87, 981.61, 1087.99, 1020.76, 1133.99], weeklyChange: 13.87, dayChange: 8.7, sortRank: 0, periodReturns: { '1M': 66.4, '6M': 402.8, '1Y': 817.5 },
      priceHistory: { '1D': [1043.19, 1099, 1106.11, 1118.26, 1121.66, 1124.56, 1128.4, 1126.12, 1122.69, 1126.87, 1127.72, 1125.45, 1127.32, 1129.46, 1134.23, 1134.65, 1138.57, 1141.99, 1142.73, 1144.29, 1139.82, 1142.21, 1147.02, 1133.99], '1W': [995.87, 981.61, 1087.99, 1020.76, 1133.99], '1M': [681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1133.99], '6M': [225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 891.88, 1133.99], '1Y': [123.6, 124.76, 119.92, 118.61, 113.23, 111.26, 104.88, 118.89, 120.87, 117.68, 119.01, 131.46, 157.77, 162.73, 157.27, 187.83, 181.6, 202.38, 219.02, 223.77, 237.92, 246.83, 201.37, 236.48, 237.22, 241.14, 265.92, 294.37, 343.43, 338.13, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.73, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 698.74, 928.41, 1079.57, 891.88, 1133.99] },
      velocityScore: { '1D': 6.4, '1W': 12.2, '1M': -4.6, '6M': null }, isNew: false,
      marketCap: '$1.3T', pe: 53.4, revenueGrowth: 196, eps: 21.23, grossMargin: 58, dividendYield: null,
      etfPresence: { PTF: 5.24, WCLD: false, IGV: false, FDTX: 9.36, GTEK: false, ARKK: false, MARS: false, FRWD: 5.01, BCTK: 4.45, FWD: 1.4, CBSE: 2.35, FCUS: 4.46, WGMI: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 7, avgWeight: 4.05, proScore: 2.18, coverage: 0.538,
      price: 210.69, weeklyPrices: [204.87, 205.19, 212.45, 207.41, 210.69], weeklyChange: 2.84, dayChange: 2.95, sortRank: 0, periodReturns: { '1M': -5.2, '6M': 23.3, '1Y': 46.5 },
      priceHistory: { '1D': [204.65, 207.14, 207.72, 208.93, 209.35, 209.32, 209.27, 208.88, 208.19, 209.27, 209.53, 210.97, 210.13, 209.96, 210.06, 210.04, 209.66, 209.85, 210.1, 209.78, 210.06, 209.85, 210.15, 210.69], '1W': [204.87, 205.19, 212.45, 207.41, 210.69], '1M': [222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 210.69], '6M': [170.94, 188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 181.93, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 214.75, 200.42, 210.69], '1Y': [143.85, 157.75, 158.24, 164.07, 171.38, 173.5, 173.72, 182.7, 180.45, 177.99, 174.18, 168.31, 177.75, 176.67, 178.19, 187.62, 183.16, 183.22, 186.26, 202.49, 188.15, 190.17, 180.64, 177, 182.41, 175.02, 180.99, 188.22, 187.24, 185.81, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 186.03, 180.4, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 220.61, 212.6, 214.75, 200.42, 210.69] },
      velocityScore: { '1D': -0.5, '1W': -5.2, '1M': -54.9, '6M': null }, isNew: false,
      marketCap: '$5.1T', pe: 32.3, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: null,
      etfPresence: { PTF: 4.15, WCLD: false, IGV: false, FDTX: 4.62, GTEK: false, ARKK: 1.65, MARS: false, FRWD: 8.28, BCTK: 5.78, FWD: 1.9, CBSE: false, FCUS: false, WGMI: 1.99 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 6, avgWeight: 3.95, proScore: 1.82, coverage: 0.462,
      price: 462.12, weeklyPrices: [421.07, 423.93, 441.40, 425.83, 462.12], weeklyChange: 9.75, dayChange: 6.94, sortRank: 0, periodReturns: { '1M': 16.7, '6M': 66.9, '1Y': 120.6 },
      priceHistory: { '1D': [432.15, 446.99, 449.93, 449.07, 450.65, 453.1, 452.18, 451.31, 451.53, 453.84, 454.19, 455.15, 454.76, 457.22, 457.76, 459.14, 459.3, 460.47, 460.26, 460.73, 460.8, 460.2, 462.84, 462.12], '1W': [421.07, 423.93, 441.4, 425.83, 462.12], '1M': [395.95, 392.61, 401.62, 407.15, 404.52, 412.32, 422.73, 424.86, 418.45, 435.63, 436.69, 444.92, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93, 441.4, 425.83, 462.12], '6M': [276.96, 298.8, 319.61, 323.63, 342.4, 332.71, 341.36, 355.41, 364.2, 385.75, 353.13, 347.09, 345.98, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 392.61, 422.73, 436.69, 408.75, 462.12], '1Y': [209.51, 228.57, 229.17, 228.67, 238.85, 245.6, 235.21, 241.83, 238.88, 232.99, 230.87, 247.19, 261.38, 264.87, 273.36, 292.19, 280.66, 295.08, 294.96, 300.43, 286.5, 284.82, 277.5, 291.51, 294.72, 292.04, 288.95, 300.92, 327.43, 331.21, 327.16, 338.34, 335.75, 361.91, 362.26, 387.73, 357.44, 354.56, 339.57, 343.25, 337.95, 365.9, 375.1, 387.44, 393.83, 419.5, 399.8, 392.61, 422.73, 436.69, 408.75, 462.12] },
      velocityScore: { '1D': 0, '1W': -4.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.4T', pe: 39.7, revenueGrowth: 35, eps: 11.63, grossMargin: 62, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6, GTEK: false, ARKK: 0.94, MARS: false, FRWD: 5.7, BCTK: 7.92, FWD: false, CBSE: 2.58, FCUS: false, WGMI: 0.58 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'SPCX', name: 'SPACE EXPLORATION TECHN-CL A', easyScore: 5, avgWeight: 8.86, proScore: 3.41, coverage: 0.385,
      price: 185, weeklyPrices: [185.00], weeklyChange: -3.56, dayChange: -3.56, sortRank: 0, periodReturns: { '1M': 0, '6M': 0, '1Y': 0 },
      priceHistory: undefined,
      velocityScore: { '1D': 12.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.4T', pe: null, revenueGrowth: 15, eps: -0.67, grossMargin: 49, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.71, MARS: 24.06, FRWD: 2.64, BCTK: 10.75, FWD: 2.16, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'SPACE EXPLORATION TECHN-CL A appears in 5 of 13 Broad Tech ETFs (38% coverage) with average weight 8.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 5, avgWeight: 4.09, proScore: 1.57, coverage: 0.385,
      price: 537.37, weeklyPrices: [488.45, 511.57, 547.26, 507.29, 537.37], weeklyChange: 10.02, dayChange: 4.86, sortRank: 0, periodReturns: { '1M': 27.6, '6M': 171.2, '1Y': 319 },
      priceHistory: { '1D': [512.48, 530.56, 531.21, 533.45, 530.77, 531.82, 537.11, 531.59, 528.43, 534.62, 533.55, 533.53, 533.4, 534.02, 533.83, 534.64, 532.61, 532.99, 530.67, 531.39, 531.3, 531.07, 534.21, 537.37], '1W': [488.45, 511.57, 547.26, 507.29, 537.37], '1M': [420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 537.37], '6M': [198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 196.31, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 452.4, 537.37], '1Y': [128.24, 143.81, 134.8, 146.24, 157, 166.47, 171.7, 172.76, 177.51, 167.76, 162.63, 151.41, 161.16, 157.39, 159.46, 164.67, 214.9, 233.08, 252.92, 256.12, 233.54, 246.81, 206.02, 217.53, 217.97, 210.78, 213.43, 215.61, 214.35, 220.97, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 204.83, 199.46, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 414.05, 495.54, 542.52, 452.4, 537.37] },
      velocityScore: { '1D': 0, '1W': -1.9, '1M': -52, '6M': null }, isNew: false,
      marketCap: '$876B', pe: 179.7, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.51, MARS: false, FRWD: 7.3, BCTK: 3.2, FWD: 2.02, CBSE: false, FCUS: 3.43, WGMI: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 5, avgWeight: 3.06, proScore: 1.18, coverage: 0.385,
      price: 411.35, weeklyPrices: [385.57, 382.07, 393.94, 376.71, 411.35], weeklyChange: 6.69, dayChange: 4.7, sortRank: 0, periodReturns: { '1M': -2.2, '6M': 26.2, '1Y': 64.5 },
      priceHistory: { '1D': [392.9, 406.62, 406.12, 409.5, 408.61, 409.05, 410.11, 408.8, 406.88, 408.85, 409.38, 408.3, 408.43, 407.4, 407.29, 408.02, 407.77, 407.36, 407.45, 408.21, 408.06, 409.2, 410.79, 411.35], '1W': [385.57, 382.07, 393.94, 376.71, 411.35], '1M': [420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 411.35], '6M': [326.02, 350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 321.31, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 479.23, 372.1, 411.35], '1Y': [249.99, 269.35, 274.18, 275.6, 288.21, 290.18, 288.64, 304.97, 306.34, 294, 297.39, 345.65, 364.09, 344.94, 334.53, 338.37, 324.63, 349.33, 354.13, 369.63, 349.43, 342.46, 346.82, 402.96, 390.24, 359.93, 340.36, 349.39, 343.77, 354.61, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 341.57, 315.93, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 411.07, 421.86, 479.23, 372.1, 411.35] },
      velocityScore: { '1D': 0, '1W': -5.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.0T', pe: 68.2, revenueGrowth: 48, eps: 6.03, grossMargin: 76, dividendYield: 0.69,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.79, GTEK: false, ARKK: 1.14, MARS: false, FRWD: 5.15, BCTK: 6.38, FWD: 1.82, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 5, avgWeight: 2.99, proScore: 1.15, coverage: 0.385,
      price: 244.39, weeklyPrices: [241.51, 238.55, 246.02, 246.00, 244.39], weeklyChange: 1.19, dayChange: 2.9, sortRank: 0, periodReturns: { '1M': -7.7, '6M': 10.4, '1Y': 16.5 },
      priceHistory: { '1D': [237.5, 236.45, 238.85, 240.18, 240.06, 239.82, 241.42, 242.35, 242.47, 243.12, 242.57, 244.03, 243.53, 244.56, 245.29, 244.55, 243.72, 242.91, 242.91, 243.15, 242.78, 243.07, 242.78, 244.39], '1W': [241.51, 238.55, 246.02, 246, 244.39], '1M': [264.86, 259.34, 265.01, 268.46, 266.32, 265.29, 271.85, 274, 270.64, 261.26, 250.02, 253.79, 246.03, 245.22, 244.19, 238, 241.51, 238.55, 246.02, 246, 244.39], '6M': [221.27, 232.38, 226.5, 247.38, 239.12, 238.42, 242.96, 208.72, 201.15, 208.56, 208.73, 214.33, 215.2, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 259.34, 271.85, 250.02, 238, 244.39], '1Y': [209.69, 223.3, 223.47, 225.69, 229.3, 231.44, 214.75, 222.69, 231.03, 228.84, 229, 235.84, 231.43, 231.48, 219.78, 219.51, 216.37, 213.04, 224.21, 244.22, 244.41, 234.69, 217.14, 233.22, 229.53, 226.19, 227.35, 232.07, 240.93, 242.6, 231, 244.68, 238.62, 206.96, 204.79, 210.64, 216.82, 212.65, 209.87, 207.24, 208.27, 221.25, 248.5, 255.36, 263.04, 274.99, 270.13, 259.34, 271.85, 250.02, 238, 244.39] },
      velocityScore: { '1D': 0, '1W': 2.7, '1M': -75.6, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 31.5, revenueGrowth: 17, eps: 7.77, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.01, GTEK: false, ARKK: 2.24, MARS: false, FRWD: 2.85, BCTK: 4.37, FWD: 1.48, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'CRWD', name: 'CrowdStrike', easyScore: 5, avgWeight: 2.5, proScore: 0.96, coverage: 0.385,
      price: 684.86, weeklyPrices: [691.53, 682.80, 692.91, 679.49, 684.86], weeklyChange: -0.96, dayChange: 0.28, sortRank: 0, periodReturns: { '1M': 10.7, '6M': 45.7, '1Y': 43.8 },
      priceHistory: { '1D': [682.96, 672.72, 674.12, 674.3, 680.05, 683.01, 679.46, 675.62, 671.18, 672.98, 673.73, 674.83, 674.47, 679.1, 678.02, 683.08, 683.65, 679.59, 678.52, 679.37, 678.04, 680.18, 678.94, 684.86], '1W': [691.53, 682.8, 692.91, 679.49, 684.86], '1M': [618.83, 616.88, 650.11, 648.23, 663.46, 671.55, 645.36, 671, 731, 782.17, 747.61, 719.09, 671.02, 658.79, 644.93, 647.74, 691.53, 682.8, 692.91, 679.49, 684.86], '6M': [470.02, 477.11, 453.58, 470.61, 453.88, 468.33, 438.85, 408.04, 414.29, 350.25, 391.42, 436.33, 433.2, 413.31, 380.06, 423.23, 398.49, 449.61, 454.99, 476.53, 546.18, 616.88, 645.36, 747.61, 647.74, 684.86], '1Y': [476.3, 499.33, 505.46, 476.18, 481.58, 467.92, 446.66, 424.49, 427.9, 420.55, 423.7, 428.06, 444.77, 502.55, 481.42, 489.88, 493.66, 484.65, 527.32, 543.01, 539.81, 537.55, 501.31, 509.16, 512.03, 504.78, 481.28, 475.91, 458.32, 468.02, 442.73, 476.66, 421.73, 413.39, 415.76, 363.31, 407.68, 442.03, 435.81, 392.99, 390.41, 426.51, 411.16, 466.68, 452.38, 468.07, 562.57, 616.88, 645.36, 747.61, 647.74, 684.86] },
      velocityScore: { '1D': 24.7, '1W': 23.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$174B', pe: null, revenueGrowth: 26, eps: -0.14, grossMargin: 75, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.45, IGV: 6.63, FDTX: 1.24, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.14, FWD: 1.02, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'CrowdStrike appears in 5 of 13 Broad Tech ETFs (38% coverage) with average weight 2.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, avgWeight: 5.61, proScore: 1.73, coverage: 0.308,
      price: 1070.23, weeklyPrices: [868.09, 931.04, 1018.80, 1031.34, 1070.23], weeklyChange: 23.29, dayChange: 0.39, sortRank: 0, periodReturns: { '1M': 44.5, '6M': 285.5, '1Y': 717.2 },
      priceHistory: { '1D': [1066.07, 1133.72, 1113.3, 1108.07, 1092.4, 1090.55, 1086, 1089.76, 1085.74, 1074.55, 1077.33, 1073.46, 1069.25, 1071.36, 1067.71, 1069, 1065.64, 1064.16, 1064.15, 1059, 1058.7, 1067.59, 1077.55, 1070.23], '1W': [868.09, 931.04, 1018.8, 1031.34, 1070.23], '1M': [740.84, 733.35, 751.07, 810.46, 812.73, 845.76, 870.66, 880.72, 879.8, 921.26, 940.69, 925.99, 847.47, 876.77, 846.01, 815.99, 868.09, 931.04, 1018.8, 1031.34, 1070.23], '6M': [277.65, 285.27, 287.54, 304.01, 326.23, 358.29, 432.95, 425, 415.94, 396.02, 357.62, 384.29, 421.09, 404.02, 362.43, 468.72, 533.44, 559.9, 579.03, 771.01, 808.8, 733.35, 870.66, 940.69, 815.99, 1070.23], '1Y': [130.96, 141.44, 148.39, 149.08, 149.63, 150.89, 154.81, 150.45, 154.43, 159.21, 167.4, 189.24, 211.12, 221.23, 217.51, 252.79, 214.38, 225.4, 234.12, 255.88, 279.35, 258.21, 240.5, 276.69, 278.79, 287.64, 296.36, 281.3, 330.42, 318.44, 325.99, 371.76, 444.45, 396.23, 424.14, 421.85, 375.01, 385.97, 406.77, 424.96, 391.76, 496.3, 519.6, 579.88, 643.3, 786.42, 817.35, 733.35, 870.66, 940.69, 815.99, 1070.23] },
      velocityScore: { '1D': 1.2, '1W': 6.1, '1M': -36.6, '6M': null }, isNew: false,
      marketCap: '$240B', pe: 101.7, revenueGrowth: 44, eps: 10.52, grossMargin: 42, dividendYield: 0.29,
      etfPresence: { PTF: 5.33, WCLD: false, IGV: false, FDTX: 4.04, GTEK: false, ARKK: false, MARS: false, FRWD: 8.34, BCTK: false, FWD: false, CBSE: false, FCUS: 4.72, WGMI: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 4, avgWeight: 5.06, proScore: 1.56, coverage: 0.308,
      price: 746.23, weeklyPrices: [529.29, 562.93, 653.53, 681.08, 746.23], weeklyChange: 40.99, dayChange: 4.79, sortRank: 0, periodReturns: { '1M': 62.7, '6M': 348.8, '1Y': 1158.6 },
      priceHistory: { '1D': [712.13, 790.36, 786.06, 783.76, 773.56, 770.57, 772.01, 774.04, 769.58, 762.15, 758.33, 753.26, 743.76, 751.17, 746.33, 744.85, 743.34, 741.61, 746.88, 745.57, 745.06, 751.68, 757, 746.23], '1W': [529.29, 562.93, 653.53, 681.08, 746.23], '1M': [458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 746.23], '6M': [166.26, 179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 313.81, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 594.11, 490.09, 746.23], '1Y': [59.29, 63.29, 65.22, 66.93, 68.74, 68.82, 76.55, 74.97, 75.06, 76.97, 80.34, 93.29, 102.39, 106.63, 106.88, 131.31, 115.42, 126.2, 129.43, 150.21, 162.96, 157.83, 140.23, 163.33, 168.89, 176.34, 181.08, 179.68, 219.38, 214, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 268.81, 304.9, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 455.8, 530.6, 594.11, 490.09, 746.23] },
      velocityScore: { '1D': 3.3, '1W': 15.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$257B', pe: 44.7, revenueGrowth: 46, eps: 16.69, grossMargin: 45, dividendYield: null,
      etfPresence: { PTF: 6.1, WCLD: false, IGV: false, FDTX: 4, GTEK: false, ARKK: false, MARS: false, FRWD: 5.29, BCTK: false, FWD: false, CBSE: false, FCUS: 4.85, WGMI: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 4, avgWeight: 4.64, proScore: 1.43, coverage: 0.308,
      price: 389.04, weeklyPrices: [362.52, 366.81, 388.92, 369.34, 389.04], weeklyChange: 7.32, dayChange: 3.97, sortRank: 0, periodReturns: { '1M': 40, '6M': 151, '1Y': 329.9 },
      priceHistory: { '1D': [374.18, 396.01, 399.3, 397.05, 394.71, 397.02, 394.55, 395.86, 396.04, 396.71, 397.52, 397.18, 394.83, 396.38, 395.2, 395.99, 395.21, 392.71, 393.02, 394.14, 393.75, 392.77, 396.11, 389.04], '1W': [362.52, 366.81, 388.92, 369.34, 389.04], '1M': [277.96, 273.38, 292.09, 302.24, 305.35, 322.68, 318.93, 318, 318.18, 317.12, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 389.04], '6M': [154.98, 177.33, 185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.58, 244.25, 217.27, 215.23, 226.47, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 273.38, 318.93, 343.71, 321.8, 389.04], '1Y': [90.49, 97.2, 98.14, 99.62, 101.74, 96.96, 96.37, 101.75, 99.51, 100.08, 100.15, 105.07, 119.21, 126.92, 128.33, 145.81, 131.37, 141.51, 151.68, 157.46, 159.35, 148.26, 139.59, 156, 158.7, 160.52, 172.27, 175.87, 206.96, 214.38, 222.41, 238.46, 230.1, 226.61, 240.09, 249.48, 222.99, 218.87, 224.71, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 295.44, 273.38, 318.93, 343.71, 321.8, 389.04] },
      velocityScore: { '1D': 11.7, '1W': 5.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$487B', pe: 73.7, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.28,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 6.14, BCTK: 7.48, FWD: 1.89, CBSE: 3.06, FCUS: false, WGMI: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 4, avgWeight: 4.04, proScore: 1.24, coverage: 0.308,
      price: 287.78, weeklyPrices: [279.53, 279.62, 284.54, 279.90, 287.78], weeklyChange: 2.95, dayChange: 2, sortRank: 0, periodReturns: { '1M': 16.3, '6M': 56.9, '1Y': 44.4 },
      priceHistory: { '1D': [282.13, 281.67, 282.24, 280.72, 282.39, 283.83, 283.92, 282.1, 282.48, 283.6, 283.77, 284.2, 284.56, 285.36, 284.95, 285.95, 287.23, 286.23, 285.15, 286.11, 285.76, 286.24, 286.31, 287.78], '1W': [279.53, 279.62, 284.54, 279.9, 287.78], '1M': [247.55, 240.13, 246.66, 252.92, 260.58, 256.75, 248.47, 257.77, 281.69, 300.48, 280.43, 279.25, 272.05, 266.33, 260.52, 263.22, 279.53, 279.62, 284.54, 279.9, 287.78], '6M': [183.44, 187.22, 179.37, 189.02, 187.66, 184.22, 175.42, 166, 163.5, 141.67, 156.09, 165.58, 169.19, 164.05, 154.35, 169.87, 161.59, 174.96, 180.99, 183.98, 215.6, 240.13, 248.47, 280.43, 263.22, 287.78], '1Y': [199.24, 200.57, 201.42, 190.72, 199.88, 203.27, 172.88, 167.06, 177.09, 185.88, 190.52, 197.38, 201.28, 208.19, 202.37, 207.19, 208.55, 207.89, 217.11, 220.24, 212.29, 205.25, 185.07, 190.13, 198.84, 191.69, 186.88, 186.85, 185.86, 190.85, 184.06, 183.5, 166.24, 165.51, 152.35, 144.84, 158.56, 164.93, 168.91, 157.21, 160.32, 173.78, 164.11, 181.2, 181.54, 183.68, 227.79, 240.13, 248.47, 280.43, 263.22, 287.78] },
      velocityScore: { '1D': 7.8, '1W': 11.7, '1M': -54.7, '6M': null }, isNew: false,
      marketCap: '$235B', pe: 250.2, revenueGrowth: 31, eps: 1.15, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.63, IGV: 8.87, FDTX: 3.67, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.01, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 2.87, proScore: 0.88, coverage: 0.308,
      price: 108.85, weeklyPrices: [110.47, 108.24, 112.49, 113.23, 108.85], weeklyChange: -1.47, dayChange: 0.7, sortRank: 0, periodReturns: { '1M': 6.3, '6M': -32.7, '1Y': 2.3 },
      priceHistory: { '1D': [108.09, 106.82, 107.15, 108.1, 109.11, 108.39, 108.59, 107.83, 107.56, 108.25, 109.34, 108.93, 108.81, 109.29, 108.88, 109.34, 109.06, 108.78, 108.68, 109.11, 109.15, 108.68, 108.49, 108.85], '1W': [110.47, 108.24, 112.49, 113.23, 108.85], '1M': [102.39, 101.01, 105.01, 104.86, 103, 104.9, 106.6, 115.03, 118.71, 124.12, 112.94, 116.04, 109.54, 110.78, 110.42, 108.2, 110.47, 108.24, 112.49, 113.23, 108.85], '6M': [161.73, 169.45, 157.2, 164.48, 155.81, 136.31, 132.2, 118.4, 113.54, 116.93, 121.87, 129.36, 127.8, 121.1, 111.77, 117.06, 117.64, 131.13, 122.05, 107.63, 99.84, 101.01, 106.6, 112.94, 108.2, 108.85], '1Y': [106.4, 113.65, 116.66, 116.74, 128.43, 124.43, 118.6, 149.61, 141.47, 142.11, 141.28, 146.22, 147.89, 153.3, 140.25, 161.14, 151.02, 157.76, 172.95, 173.86, 152.41, 146.04, 144.56, 158.64, 161.08, 164.19, 169.57, 167.88, 168.45, 167.44, 144.5, 137.5, 119.29, 127.24, 121.64, 120.31, 129.65, 129.52, 123.75, 116.15, 118.62, 120.1, 127.41, 131.96, 121.26, 105.44, 95.4, 101.01, 106.6, 112.94, 108.2, 108.85] },
      velocityScore: { '1D': 0, '1W': -6.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$141B', pe: 106.7, revenueGrowth: 34, eps: 1.02, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.89, GTEK: false, ARKK: 4.07, MARS: false, FRWD: 1.86, BCTK: 2.66, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 13 Broad Tech ETFs (31% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASML', name: 'ASML Holding', easyScore: 4, avgWeight: 2.72, proScore: 0.84, coverage: 0.308,
      price: 1929.68, weeklyPrices: [1899.48, 1863.55, 1892.66, 1803.89, 1929.68], weeklyChange: 1.59, dayChange: 3.31, sortRank: 0, periodReturns: { '1M': 31.1, '6M': 90, '1Y': 155.1 },
      priceHistory: { '1D': [1867.83, 1917.2, 1923.31, 1935, 1925, 1932.84, 1936.31, 1932.13, 1922.8, 1921.02, 1921.5, 1922.01, 1918.88, 1922.36, 1922.87, 1918.21, 1915.24, 1912.46, 1914.42, 1920.03, 1917.25, 1917.01, 1930.92, 1929.68], '1W': [1899.48, 1863.55, 1892.66, 1803.89, 1929.68], '1M': [1472.39, 1459.44, 1550.13, 1592, 1632.9, 1632.03, 1597.87, 1605.77, 1612.76, 1628.57, 1726.36, 1757.47, 1641.74, 1749.04, 1777.77, 1734.19, 1899.48, 1863.55, 1892.66, 1803.89, 1929.68], '6M': [1015.43, 1065.52, 1163.78, 1273.88, 1358.57, 1413.35, 1441.39, 1429.49, 1419.78, 1497.8, 1360.94, 1383.4, 1389.16, 1369.62, 1253.96, 1306.45, 1518.3, 1458.97, 1384.56, 1442.92, 1520.94, 1459.44, 1597.87, 1726.36, 1734.19, 1929.68], '1Y': [756.53, 795.95, 785.09, 806.73, 719.68, 711.25, 689.82, 722.32, 742.16, 754.89, 742.62, 796.25, 867.3, 932.15, 951.52, 1032.22, 936.19, 1029.27, 1033.1, 1059.23, 1016.96, 1006.98, 981.04, 1060, 1099.47, 1080.85, 1056.02, 1066, 1242.19, 1270.16, 1326.07, 1454.59, 1395.88, 1413.62, 1468.72, 1526.51, 1399.37, 1386.68, 1355.17, 1399.42, 1320.83, 1421.05, 1481.77, 1443.66, 1394.08, 1544.74, 1581.58, 1459.44, 1597.87, 1726.36, 1734.19, 1929.68] },
      velocityScore: { '1D': 25.4, '1W': 18.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$744B', pe: 64.5, revenueGrowth: 13, eps: 29.94, grossMargin: 53, dividendYield: 0.49,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 4.86, BCTK: 2.2, FWD: 1.5, CBSE: 2.32, FCUS: false, WGMI: false },
      tonyNote: 'ASML Holding appears in 4 of 13 Broad Tech ETFs (31% coverage) with average weight 2.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 3, avgWeight: 5.27, proScore: 1.22, coverage: 0.231,
      price: 2184.75, weeklyPrices: [1881.51, 1980.10, 2107.86, 1991.55, 2184.75], weeklyChange: 16.12, dayChange: 11.54, sortRank: 0, periodReturns: { '1M': 63.9, '6M': 956.3, '1Y': 4590.3 },
      priceHistory: { '1D': [1958.8, 2110.45, 2140.15, 2173.94, 2153.46, 2163.79, 2166.11, 2165.8, 2171.57, 2172.5, 2174.54, 2164.96, 2164.73, 2175.95, 2177, 2172.97, 2174.24, 2184.4, 2178.87, 2165.7, 2166.74, 2186, 2183.09, 2184.75], '1W': [1881.51, 1980.1, 2107.86, 1991.55, 2184.75], '1M': [1333.01, 1383.29, 1392.56, 1542.24, 1478.69, 1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 2184.75], '6M': [206.83, 250.08, 275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 565.41, 618.89, 720.17, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1831.5, 1643.23, 2184.75], '1Y': [46.58, 47.15, 45.22, 42.48, 41.61, 42.48, 41.33, 44.34, 44.54, 46.37, 52.47, 70.5, 90.09, 102.21, 97.12, 128.41, 116.91, 140.16, 186.16, 199.33, 239.48, 254.16, 195.96, 223.28, 228.47, 206.18, 237.61, 244.25, 349.63, 389.81, 453.12, 481.43, 695.51, 541.64, 600.4, 632.38, 599.06, 655.43, 753.69, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1383.29, 1589.94, 1831.5, 1643.23, 2184.75] },
      velocityScore: { '1D': 6.1, '1W': null, '1M': -53.4, '6M': null }, isNew: false,
      marketCap: '$324B', pe: 74.6, revenueGrowth: 251, eps: 29.28, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 9.23, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.45, CBSE: false, FCUS: 5.13, WGMI: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 3, avgWeight: 5.04, proScore: 1.16, coverage: 0.231,
      price: 379.4, weeklyPrices: [390.34, 390.74, 399.76, 393.83, 379.40], weeklyChange: -2.8, dayChange: 0.13, sortRank: 0, periodReturns: { '1M': -10.4, '6M': -20.3, '1Y': -20.5 },
      priceHistory: { '1D': [378.91, 373.67, 376.46, 379.29, 378.4, 377.14, 375.96, 375.17, 375.35, 377.01, 377.59, 379.21, 378.96, 380.74, 379.7, 379.89, 379.51, 378.54, 377.74, 378.21, 377.58, 378.03, 378.15, 379.4], '1W': [390.34, 390.74, 399.76, 393.83, 379.4], '1M': [423.54, 417.42, 421.06, 419.09, 418.57, 416.03, 412.67, 426.99, 450.24, 460.52, 427.34, 428.05, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74, 399.76, 393.83, 379.4], '6M': [476.12, 488.02, 472.94, 479.28, 459.86, 470.28, 423.37, 413.6, 396.86, 389, 403.93, 405.76, 399.41, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 417.42, 412.67, 427.34, 397.36, 379.4], '1Y': [477.4, 495.94, 497.72, 503.02, 510.06, 513.71, 524.11, 522.04, 520.17, 507.23, 506.69, 498.2, 515.36, 517.93, 511.46, 517.35, 510.96, 513.58, 523.61, 517.81, 496.82, 510.18, 478.43, 492.01, 483.16, 478.53, 485.92, 487.1, 478.51, 470.67, 454.52, 480.58, 411.21, 413.27, 399.6, 400.6, 405.2, 404.88, 391.79, 372.74, 370.17, 374.33, 411.22, 432.92, 424.46, 413.96, 405.21, 417.42, 412.67, 427.34, 397.36, 379.4] },
      velocityScore: { '1D': 4.5, '1W': -1.7, '1M': -80, '6M': null }, isNew: false,
      marketCap: '$2.8T', pe: 22.6, revenueGrowth: 18, eps: 16.78, grossMargin: 68, dividendYield: 0.92,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.33, FDTX: 3.79, GTEK: false, ARKK: false, MARS: false, FRWD: 2.99, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 3, avgWeight: 4.73, proScore: 1.09, coverage: 0.231,
      price: 128.47, weeklyPrices: [131.08, 127.99, 134.71, 133.25, 128.47], weeklyChange: -1.99, dayChange: -1.65, sortRank: 0, periodReturns: { '1M': -4.9, '6M': -27.5, '1Y': -6.4 },
      priceHistory: { '1D': [130.63, 127.9, 125.94, 127.49, 127.63, 127.36, 127.21, 126.46, 126.14, 127.43, 127.93, 128.24, 128.01, 128.75, 128.69, 128.69, 128.54, 128.04, 127.89, 128.13, 127.94, 128.43, 128.5, 128.47], '1W': [131.08, 127.99, 134.71, 133.25, 128.47], '1M': [135.14, 135.26, 137.15, 137.41, 136.88, 136.6, 132.51, 143.34, 156.54, 160.65, 142.2, 141.7, 135.53, 136.47, 132.07, 130.21, 131.08, 127.99, 134.71, 133.25, 128.47], '6M': [177.29, 194.17, 167.86, 177.49, 170.96, 167.47, 147.76, 142.91, 133.02, 128.84, 147.22, 151.14, 155.08, 160.84, 137.55, 150.07, 135.7, 145.97, 141.18, 135.91, 136, 135.26, 132.51, 142.2, 130.21, 128.47], '1Y': [137.3, 130.74, 139.12, 149.15, 151.79, 158.8, 154.27, 186.96, 177.17, 158.74, 156.71, 156.1, 171.21, 182.39, 177.57, 173.07, 175.44, 178.15, 184.63, 200.47, 177.93, 174.01, 155.74, 168.45, 181.76, 183.57, 193.38, 184.18, 179.71, 178.96, 168.53, 165.7, 157.88, 139.51, 135.38, 134.19, 153.19, 151.6, 152.77, 154.78, 146.28, 140.76, 142.15, 152.62, 137.97, 133.79, 130.05, 135.26, 132.51, 142.2, 130.21, 128.47] },
      velocityScore: { '1D': 12.4, '1W': 10.1, '1M': -62.3, '6M': null }, isNew: false,
      marketCap: '$308B', pe: 144.3, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.6, FDTX: 2.87, GTEK: false, ARKK: 2.71, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 3, avgWeight: 4.61, proScore: 1.06, coverage: 0.231,
      price: 400.49, weeklyPrices: [399.15, 406.43, 411.15, 404.66, 400.49], weeklyChange: 0.34, dayChange: 1.04, sortRank: 0, periodReturns: { '1M': -2.3, '6M': -14.3, '1Y': 24.3 },
      priceHistory: { '1D': [396.38, 388.15, 390.04, 391.02, 388.07, 388.27, 389.26, 389.55, 388.38, 391.73, 392.72, 393.2, 393.55, 394.08, 395.19, 396.31, 395.88, 394.61, 394.6, 394.89, 394.38, 395.87, 399.64, 400.49], '1W': [399.15, 406.43, 411.15, 404.66, 400.49], '1M': [409.99, 404.11, 417.26, 417.85, 426.01, 433.59, 440.36, 442.1, 435.79, 415.88, 423.7, 418.45, 391, 408.95, 396.68, 381.59, 399.15, 406.43, 411.15, 404.66, 400.49], '6M': [467.26, 485.4, 438.07, 445.01, 437.5, 435.2, 421.81, 417.32, 410.63, 409.38, 392.43, 399.24, 399.27, 380.85, 355.28, 346.65, 364.2, 386.42, 376.02, 389.37, 433.45, 404.11, 440.36, 423.7, 381.59, 400.49], '1Y': [322.16, 323.63, 293.94, 316.9, 328.49, 316.06, 302.63, 329.65, 330.56, 340.01, 333.87, 346.4, 410.04, 426.07, 440.4, 429.83, 413.49, 439.31, 433.72, 456.56, 429.52, 404.35, 395.23, 430.17, 455, 458.96, 481.2, 459.64, 432.96, 447.2, 419.25, 430.9, 421.96, 425.21, 411.32, 417.4, 405.94, 407.82, 392.78, 383.03, 371.75, 343.25, 391.95, 387.51, 372.8, 398.73, 445.27, 404.11, 440.36, 423.7, 381.59, 400.49] },
      velocityScore: { '1D': -0.9, '1W': null, '1M': -84, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 367.4, revenueGrowth: 16, eps: 1.09, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 9.5, MARS: false, FRWD: false, BCTK: 3.3, FWD: 1.04, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 3, avgWeight: 3.74, proScore: 0.86, coverage: 0.231,
      price: 367.46, weeklyPrices: [356.56, 358.16, 367.11, 371.10, 367.46], weeklyChange: 3.06, dayChange: 1.48, sortRank: 0, periodReturns: { '1M': -6.5, '6M': 23.3, '1Y': 119.1 },
      priceHistory: { '1D': [362.1, 357.51, 359.95, 360.64, 361.04, 362.08, 361.76, 362.18, 363.51, 363.83, 363.83, 364.77, 365.12, 365.01, 366.28, 365.99, 366.7, 366.24, 365.99, 366.83, 365.52, 365.98, 367.85, 367.46], '1W': [356.56, 358.16, 367.11, 371.1, 367.46], '1M': [393.11, 384.9, 384.9, 383.47, 379.38, 384.84, 384.83, 386.12, 376.43, 372.58, 355.68, 369.27, 365.76, 361.17, 362.29, 353.32, 356.56, 358.16, 367.11, 371.1, 367.46], '6M': [298.06, 315.67, 315.32, 329.14, 330.34, 333.59, 344.9, 324.4, 302.82, 310.92, 303.56, 306.93, 309.41, 299.02, 273.14, 303.93, 330.58, 330.47, 347.5, 384.27, 383.82, 384.9, 384.83, 355.68, 353.32, 367.46], '1Y': [167.73, 178.27, 177.56, 182.81, 191.15, 194.08, 189.95, 202.09, 204.91, 206.72, 213.53, 234.16, 251.76, 255.24, 247.18, 246.45, 237.49, 253.79, 260.51, 281.82, 279.7, 276.98, 289.98, 320.12, 322.09, 310.52, 308.61, 314.39, 314.55, 336.43, 322.16, 335, 340.7, 318.63, 303.94, 313.03, 303.45, 308.42, 306.3, 289.2, 286.86, 314.74, 334.47, 337.73, 347.31, 395.14, 399.04, 384.9, 384.83, 355.68, 353.32, 367.46] },
      velocityScore: { '1D': 0, '1W': -3.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.5T', pe: 28.1, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.66, GTEK: false, ARKK: 1.86, MARS: false, FRWD: false, BCTK: 5.69, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Alphabet Inc Class C appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 3.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'COHR', name: 'Coherent Corp', easyScore: 3, avgWeight: 3.31, proScore: 0.76, coverage: 0.231,
      price: 389.57, weeklyPrices: [363.58, 385.03, 413.84, 382.81, 389.57], weeklyChange: 7.15, dayChange: 2.83, sortRank: 0, periodReturns: { '1M': 7.4, '6M': 128.6, '1Y': 379.8 },
      priceHistory: { '1D': [378.85, 389.79, 379.4, 390.86, 396.96, 398.29, 399.48, 396.14, 395.45, 396.88, 395.15, 393.89, 393.05, 394.39, 392.63, 391.74, 388.3, 388.75, 388.67, 387.89, 387.27, 388.76, 391.2, 389.57], '1W': [363.58, 385.03, 413.84, 382.81, 389.57], '1M': [362.83, 353.63, 358.5, 378, 377.57, 381.35, 380.18, 376.95, 361.47, 362.9, 417.43, 421.9, 376.99, 401.93, 355.94, 354.77, 363.58, 385.03, 413.84, 382.81, 389.57], '6M': [170.44, 191.37, 194.33, 178.06, 191.04, 197.76, 222.44, 242.46, 219.96, 254.86, 280.81, 260.64, 245.8, 255.05, 219.65, 255.1, 313.42, 343.79, 303.97, 335.73, 374.01, 353.63, 380.18, 417.43, 354.77, 389.57], '1Y': [81.2, 87.23, 88.05, 94.52, 99.88, 100.14, 102.79, 115.44, 93.4, 89.9, 90.47, 98.67, 106.34, 109.11, 106.99, 113.58, 111.1, 116.35, 129.34, 131.96, 154.51, 139.33, 135.61, 164.26, 181.79, 178.34, 185.83, 189.02, 194.11, 190.03, 193.46, 214, 229.18, 228.37, 223.89, 267.9, 274.86, 251.41, 257.21, 272.33, 238.21, 281.79, 308.2, 350.47, 304.93, 344.67, 403.71, 353.63, 380.18, 417.43, 354.77, 389.57] },
      velocityScore: { '1D': -1.3, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$76B', pe: 184.6, revenueGrowth: 21, eps: 2.11, grossMargin: 37, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.75, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 3.73, FWD: false, CBSE: 2.44, FCUS: false, WGMI: false },
      tonyNote: 'Coherent Corp appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 3.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'BE', name: 'Bloom Energy Corp', easyScore: 4, avgWeight: 3.67, proScore: 2.94, coverage: 0.8,
      price: 328.91, weeklyPrices: [248.88, 260.22, 274.50, 280.88, 328.91], weeklyChange: 32.16, dayChange: 15.41, sortRank: 0, periodReturns: { '1M': 27.1, '6M': 327.3, '1Y': 1412.2 },
      priceHistory: { '1D': [284.99, 303.53, 303.66, 309.75, 310.73, 311.19, 312.5, 312.36, 310.6, 311.97, 310.6, 310.16, 310.11, 311.46, 311.58, 311.8, 309.27, 309.86, 309.92, 317.68, 321.56, 321.36, 326.42, 328.91], '1W': [248.88, 260.22, 274.5, 280.88, 328.91], '1M': [258.71, 261.34, 282.31, 307.88, 302.49, 302.4, 293.8, 290.01, 285, 273.51, 287.32, 291.37, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22, 274.5, 280.88, 328.91], '6M': [76.97, 91.88, 98.69, 134.07, 149.5, 139.62, 156.13, 155.17, 145.32, 166.2, 153.02, 154, 160.05, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 261.34, 293.8, 287.32, 234.23, 328.91], '1Y': [21.75, 22.18, 24.36, 25.96, 25.36, 34.34, 36.72, 36.8, 45.28, 48.54, 52.94, 53.44, 67.02, 84.93, 70.32, 90.29, 86.87, 111.5, 110.38, 132.16, 135.21, 111.89, 93.38, 109.24, 119.18, 94.98, 88.82, 88.41, 103.05, 139.77, 151.75, 152.31, 168.89, 148.7, 157.27, 174.77, 164.78, 159.21, 156.58, 145.88, 135.49, 146.78, 213.84, 229.75, 287.97, 285.47, 289.76, 261.34, 293.8, 287.32, 234.23, 328.91] },
      velocityScore: { '1D': 27.3, '1W': 38, '1M': 17.6, '6M': null }, isNew: false,
      marketCap: '$94B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: 1.76, VOLT: 4.55, PBD: false, PBW: 2.59, IVEP: 5.78 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 3, avgWeight: 4.68, proScore: 2.81, coverage: 0.6,
      price: 702.25, weeklyPrices: [683.29, 707.74, 724.35, 719.29, 702.25], weeklyChange: 2.77, dayChange: -1.76, sortRank: 0, periodReturns: { '1M': -2.9, '6M': 69.5, '1Y': 94.6 },
      priceHistory: { '1D': [714.85, 723.76, 704.74, 705.59, 705.12, 707.05, 710.47, 704.92, 706.57, 710.3, 707.24, 711.32, 709.63, 713.85, 712.2, 710.4, 708.26, 710.59, 709.97, 709.84, 708.42, 706.84, 706.25, 702.25], '1W': [683.29, 707.74, 724.35, 719.29, 702.25], '1M': [723.03, 714.13, 709.93, 716.91, 723.44, 742.18, 733.62, 730.1, 711.73, 687.48, 715.67, 719.17, 695.11, 693.81, 691.95, 650.92, 683.29, 707.74, 724.35, 719.29, 702.25], '6M': [414.25, 433.58, 439.68, 422.57, 466.75, 470.77, 477.77, 514.56, 525.13, 568.21, 566, 564.05, 571.64, 567.45, 533.78, 555.57, 594.4, 605.89, 630.94, 771.61, 765.81, 714.13, 733.62, 715.67, 650.92, 702.25], '1Y': [360.78, 381.26, 385.8, 387, 398.66, 421.68, 395.17, 386.15, 380.81, 379.84, 377.96, 375.53, 385.68, 388.58, 405.44, 421.17, 417.61, 433.85, 440.93, 449.13, 445.01, 429.3, 429.78, 464.88, 460.64, 438.11, 426.66, 431.03, 438.22, 444.2, 463.49, 479.27, 488.6, 510.64, 519.31, 562.77, 568.38, 567.71, 572, 578.44, 549.02, 576.24, 591.82, 613.78, 628.6, 785.24, 773.72, 714.13, 733.62, 715.67, 650.92, 702.25] },
      velocityScore: { '1D': -3.1, '1W': -2.8, '1M': -23.4, '6M': null }, isNew: false,
      marketCap: '$105B', pe: 96.7, revenueGrowth: 26, eps: 7.26, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.66, VOLT: 5.23, PBD: false, PBW: false, IVEP: 4.15 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 3, avgWeight: 4.61, proScore: 2.77, coverage: 0.6,
      price: 297.2, weeklyPrices: [290.50, 294.75, 303.53, 292.70, 297.20], weeklyChange: 2.31, dayChange: 1.08, sortRank: 0, periodReturns: { '1M': 11.4, '6M': 181, '1Y': 408.3 },
      priceHistory: { '1D': [294.03, 293.83, 290.32, 287.45, 293.87, 294.27, 291.91, 290.17, 291.7, 295.59, 296.89, 297.15, 299.19, 299.76, 298.43, 298.66, 298.18, 297.33, 295.08, 294.96, 295.11, 296.39, 296.13, 297.2], '1W': [290.5, 294.75, 303.53, 292.7, 297.2], '1M': [266.8, 261.58, 271.05, 270.75, 279.22, 291.97, 295.94, 288.9, 284.42, 288.12, 299.73, 300.06, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75, 303.53, 292.7, 297.2], '6M': [105.77, 112.06, 117.51, 121.83, 139.99, 141.15, 146.79, 187.3, 187.21, 186.39, 170.37, 176.51, 174.04, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 261.58, 295.94, 299.73, 262.34, 297.2], '1Y': [58.47, 70.97, 71.96, 70.19, 73.64, 82.79, 75.89, 81.28, 84.88, 87.65, 88.72, 90.8, 100.68, 99.1, 96.99, 101.35, 100.35, 110.24, 121.66, 127.8, 121.79, 109.89, 98.12, 107.74, 114.04, 112.36, 110.97, 111.96, 120, 133.04, 142.76, 147.43, 151.08, 190.09, 180.99, 183, 170.96, 171.73, 167.41, 186.82, 180.36, 218.07, 229.73, 242.77, 253.49, 320.3, 300.84, 261.58, 295.94, 299.73, 262.34, 297.2] },
      velocityScore: { '1D': -12.1, '1W': -16.3, '1M': -45, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 58, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { POW: 4.67, VOLT: 7.33, PBD: false, PBW: 1.83, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 3, avgWeight: 4.42, proScore: 2.65, coverage: 0.6,
      price: 421.77, weeklyPrices: [393.64, 391.39, 407.06, 407.71, 421.77], weeklyChange: 7.15, dayChange: 2.96, sortRank: 0, periodReturns: { '1M': 10.4, '6M': 33.5, '1Y': 27.3 },
      priceHistory: { '1D': [409.64, 422.18, 421.47, 419.92, 421.76, 423.08, 423.28, 422.65, 421.35, 422.1, 422.49, 422.7, 423.09, 425.14, 424.29, 425.08, 423.8, 423.48, 422.79, 422.49, 421.59, 421.14, 422.94, 421.77], '1W': [393.64, 391.39, 407.06, 407.71, 421.77], '1M': [381.87, 371.88, 379.69, 381.51, 391.35, 403.13, 406.37, 401.94, 400.6, 400.08, 421.21, 418.61, 395.94, 403.14, 401.72, 375.46, 393.64, 391.39, 407.06, 407.71, 421.77], '6M': [315.82, 323.67, 327.31, 324.51, 343.75, 332.28, 359.44, 377.06, 391.49, 374.56, 355.56, 361.06, 363.95, 359.74, 343.53, 368.85, 401.9, 409.7, 413.07, 410.86, 401.53, 371.88, 406.37, 421.21, 375.46, 421.77], '1Y': [331.23, 353.23, 358.49, 360.29, 373.66, 392.17, 381.29, 362.84, 351.03, 347.61, 349.14, 349.49, 375.54, 374.5, 365.58, 373.46, 369.08, 373.3, 376.29, 381.56, 373.77, 352.39, 328.19, 345.89, 337.66, 331.98, 317.8, 321.45, 332.97, 332.38, 337.59, 341.19, 362.53, 377.47, 380.38, 373.53, 354.46, 355.79, 360.54, 374.1, 357.67, 385.58, 395.06, 413.87, 410.77, 421.39, 406.94, 371.88, 406.37, 421.21, 375.46, 421.77] },
      velocityScore: { '1D': -0.4, '1W': -0.7, '1M': -17.2, '6M': null }, isNew: false,
      marketCap: '$164B', pe: 41.2, revenueGrowth: 17, eps: 10.23, grossMargin: 37, dividendYield: 1.08,
      etfPresence: { POW: 3.92, VOLT: 5.38, PBD: false, PBW: false, IVEP: 3.96 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 3, avgWeight: 3.96, proScore: 2.38, coverage: 0.6,
      price: 1109.73, weeklyPrices: [906.79, 940.66, 979.07, 982.35, 1109.73], weeklyChange: 22.38, dayChange: 5.8, sortRank: 0, periodReturns: { '1M': 9.6, '6M': 80.7, '1Y': 127.9 },
      priceHistory: { '1D': [1048.86, 1092.98, 1106.66, 1103, 1115.61, 1114.24, 1112.08, 1107.51, 1102.18, 1102.82, 1099.86, 1100.01, 1102.37, 1103.25, 1099.52, 1097.73, 1098.53, 1099.95, 1098.8, 1097.14, 1097.94, 1103.12, 1110.33, 1109.73], '1W': [906.79, 940.66, 979.07, 982.35, 1109.73], '1M': [1012.25, 1011.8, 1024.52, 1043.82, 1038.74, 1070.47, 1031.89, 996, 968.32, 950.54, 959.36, 963.33, 933.61, 933.85, 920.15, 867.09, 906.79, 940.66, 979.07, 982.35, 1109.73], '6M': [614.19, 667.32, 679.55, 622.5, 681.55, 665.99, 754.97, 801.54, 819.15, 879.73, 842, 839.2, 844.05, 882.64, 817.35, 910.75, 987.5, 991.3, 1088.93, 1095.21, 1071.98, 1011.8, 1031.89, 959.36, 867.09, 1109.73], '1Y': [486.96, 519.66, 530.28, 555.04, 565.91, 644.59, 656.5, 649.09, 621.91, 607.07, 612.97, 600.23, 628.68, 624.17, 605.17, 594.99, 604.56, 600, 584.39, 585.14, 575.13, 578.31, 558.03, 599.77, 631.32, 671.71, 658.28, 663.46, 686.33, 652.09, 684.86, 692.7, 780.25, 790.79, 817.55, 876.01, 841.27, 847.65, 858.47, 909.41, 872.9, 936.07, 985.92, 1127.56, 1063.11, 1118.96, 1062.57, 1011.8, 1031.89, 959.36, 867.09, 1109.73] },
      velocityScore: { '1D': 0, '1W': 10.7, '1M': -13.5, '6M': null }, isNew: false,
      marketCap: '$298B', pe: 32.5, revenueGrowth: 16, eps: 34.19, grossMargin: 20, dividendYield: 0.2,
      etfPresence: { POW: 3.25, VOLT: 4.39, PBD: false, PBW: false, IVEP: 4.25 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 3, avgWeight: 3.42, proScore: 2.05, coverage: 0.6,
      price: 177.02, weeklyPrices: [164.52, 165.84, 169.00, 167.34, 177.02], weeklyChange: 7.6, dayChange: 3.56, sortRank: 0, periodReturns: { '1M': 10.2, '6M': 86.4, '1Y': 151.9 },
      priceHistory: { '1D': [170.94, 176.66, 175.95, 174.89, 175.35, 175.85, 176.32, 175.55, 175.07, 175.71, 175.53, 175.74, 176.25, 178.22, 177.64, 177.55, 177.82, 177.94, 177.6, 177.75, 176.98, 176.82, 176.72, 177.02], '1W': [164.52, 165.84, 169, 167.34, 177.02], '1M': [160.69, 158.23, 161.86, 163.57, 164.66, 169.29, 167.8, 164.87, 166.99, 171.55, 176.39, 173.88, 162.86, 163.81, 163.8, 156.79, 164.52, 165.84, 169, 167.34, 177.02], '6M': [94.99, 103.97, 106.82, 105.38, 112.5, 110.58, 115.79, 114.62, 115.22, 118.22, 111.65, 109.13, 114.71, 121, 112.75, 118.92, 134.48, 137, 138.3, 169.41, 170.74, 158.23, 167.8, 176.39, 156.79, 177.02], '1Y': [70.26, 73.35, 74.51, 74.97, 74.96, 78.53, 89.88, 88.68, 88.01, 90.08, 90.39, 92.58, 96.35, 98.99, 97, 97.8, 95.98, 99.33, 102.2, 114.35, 111.03, 106.55, 101.52, 107.27, 107.72, 101.71, 101.54, 103.26, 110.09, 106.64, 109.9, 113.16, 119.43, 112.15, 115.65, 121.8, 113.83, 111.09, 120.27, 125.61, 118.28, 127.11, 131.38, 140.13, 137.37, 172.49, 172.91, 158.23, 167.8, 176.39, 156.79, 177.02] },
      velocityScore: { '1D': -0.5, '1W': -1, '1M': -14.9, '6M': null }, isNew: false,
      marketCap: '$29B', pe: 60, revenueGrowth: 54, eps: 2.95, grossMargin: 37, dividendYield: 0.5,
      etfPresence: { POW: 3.79, VOLT: 3.19, PBD: false, PBW: false, IVEP: 3.29 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 3, avgWeight: 3.42, proScore: 2.05, coverage: 0.6,
      price: 86.75, weeklyPrices: [84.84, 85.99, 86.12, 86.23, 86.75], weeklyChange: 2.25, dayChange: 1.19, sortRank: 0, periodReturns: { '1M': -2.6, '6M': 8, '1Y': 21.3 },
      priceHistory: { '1D': [85.73, 86.17, 86.22, 86.55, 87, 87.16, 87.11, 87.15, 87.31, 87.33, 87.24, 87.07, 87.2, 87.22, 87.11, 86.47, 86.63, 86.68, 86.73, 86.53, 86.29, 86.49, 86.51, 86.75], '1W': [84.84, 85.99, 86.12, 86.23, 86.75], '1M': [89.04, 90.06, 88.27, 89.69, 88.55, 87.65, 87.65, 87.25, 87.01, 83.66, 84.58, 85.68, 85.84, 84.01, 84.83, 85.12, 84.84, 85.99, 86.12, 86.23, 86.75], '6M': [80.29, 80.45, 80.93, 79.89, 83.63, 85.47, 86.33, 89.48, 92.71, 95.68, 92.59, 91.54, 92.53, 90.23, 92.05, 93.67, 91.31, 90.6, 96.51, 96.28, 94.59, 90.06, 87.65, 84.58, 85.12, 86.75], '1Y': [71.53, 70.89, 74.75, 75.04, 76.17, 71.85, 70.4, 72.41, 75.41, 76.32, 72.05, 69.77, 71.5, 71.08, 75.85, 80.06, 83.35, 84.53, 84.41, 81.4, 83.93, 83.88, 84.3, 86.29, 83.13, 81.65, 79.54, 80.27, 81.05, 81.64, 83.51, 87.15, 88.82, 90.83, 91.22, 95.11, 92.6, 91.66, 90.96, 91.62, 92.88, 94.17, 91.24, 90, 94.17, 95.39, 94.85, 90.06, 87.65, 84.58, 85.12, 86.75] },
      velocityScore: { '1D': -1.4, '1W': -1, '1M': -18, '6M': null }, isNew: false,
      marketCap: '$181B', pe: 22, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.89,
      etfPresence: { POW: 1.9, VOLT: 4.86, PBD: false, PBW: false, IVEP: 3.49 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 3, avgWeight: 2.93, proScore: 1.76, coverage: 0.6,
      price: 523.69, weeklyPrices: [476.89, 489.73, 502.65, 508.87, 523.69], weeklyChange: 9.81, dayChange: 2.91, sortRank: 0, periodReturns: { '1M': 11.2, '6M': 20.4, '1Y': 32.3 },
      priceHistory: { '1D': [508.87, 523.3, 525.98, 524.22, 526.48, 527.77, 527.29, 526.36, 524.34, 524.2, 524.24, 524.05, 523.99, 526.4, 524.61, 526.07, 524.12, 524.31, 524.88, 525.15, 523.16, 521.45, 522.34, 523.69], '1W': [476.89, 489.73, 502.65, 508.87, 523.69], '1M': [470.87, 461.5, 463.32, 460.98, 475.01, 484.25, 473.93, 473.61, 462.93, 480.46, 484.91, 485.27, 476.82, 485.03, 486.47, 469.32, 476.89, 489.73, 502.65, 508.87, 523.69], '6M': [434.85, 454.94, 465.48, 472.88, 472.54, 484.14, 503.86, 503.1, 522.3, 527.9, 490.78, 477.97, 477.47, 505.62, 490.74, 527.21, 526.94, 549.75, 545.93, 502.34, 483.79, 463.32, 473.93, 485.27, 469.32, 523.69], '1Y': [395.79, 406.62, 412.97, 415.08, 422.27, 438.31, 426.74, 418.65, 427.65, 440.85, 430.99, 436.62, 438.11, 438.49, 426.44, 413.05, 408.46, 425.71, 434.39, 470, 462.43, 432.82, 421.84, 427.85, 441.51, 444.84, 442.51, 451.39, 477.46, 481.68, 482.5, 485.73, 487.16, 516.03, 526.56, 524.19, 490.78, 477.97, 477.47, 503.2, 500.38, 534.67, 521.71, 557.85, 508.17, 493.04, 483.79, 463.32, 473.93, 485.27, 469.32, 523.69] },
      velocityScore: { '1D': -1.7, '1W': 2.3, '1M': -17, '6M': null }, isNew: false,
      marketCap: '$28B', pe: 30.9, revenueGrowth: 11, eps: 16.94, grossMargin: 36, dividendYield: null,
      etfPresence: { POW: 2.79, VOLT: 3.44, PBD: false, PBW: false, IVEP: 2.55 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'NRG', name: 'NRG Energy Inc', easyScore: 3, avgWeight: 1.22, proScore: 0.73, coverage: 0.6,
      price: 135.06, weeklyPrices: [123.70, 125.47, 130.40, 132.10, 135.06], weeklyChange: 9.18, dayChange: 2.22, sortRank: 0, periodReturns: { '1M': 7.6, '6M': -9.6, '1Y': -11.1 },
      priceHistory: { '1D': [132.13, 134.06, 134.79, 135.11, 137.01, 138.14, 137.81, 137.51, 137.47, 140.1, 139.51, 138.66, 137.9, 137.79, 137.77, 137.3, 137.11, 137.12, 137.05, 135.7, 135.01, 135.55, 134.98, 135.06], '1W': [123.7, 125.47, 130.4, 132.1, 135.06], '1M': [125.5, 123.71, 133.98, 136.92, 137.65, 140.43, 138, 137.5, 134.08, 129.47, 133.76, 133.39, 129.2, 127.71, 129.96, 120.65, 123.7, 125.47, 130.4, 132.1, 135.06], '6M': [149.48, 160.56, 166.16, 149.27, 152.05, 149.93, 149.11, 155.72, 173.45, 184.03, 162.06, 155.15, 154.75, 151.77, 141.23, 153.06, 170.96, 149.86, 154.81, 157.43, 137.34, 123.71, 138, 133.76, 120.65, 135.06], '1Y': [151.92, 162.67, 158.69, 151.06, 152.31, 156.59, 167.63, 152.54, 148.62, 145.09, 145.56, 147.76, 166.08, 164.36, 168.57, 166.28, 160.43, 168.74, 170.36, 171.86, 172.5, 165.19, 160.46, 169.49, 163, 161.44, 156.2, 160.96, 159.63, 150.59, 148.91, 156.04, 152.18, 156.43, 171.06, 183.59, 163.54, 148.63, 159.11, 151.13, 146.14, 160.3, 168.45, 149.6, 149.01, 150.64, 131.08, 123.71, 138, 133.76, 120.65, 135.06] },
      velocityScore: { '1D': -1.4, '1W': 1.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$28B', pe: 148.4, revenueGrowth: 20, eps: 0.91, grossMargin: 16, dividendYield: 1.44,
      etfPresence: { POW: 0.47, VOLT: 0.95, PBD: false, PBW: false, IVEP: 2.24 },
      tonyNote: 'NRG Energy Inc appears in 3 of 5 Electrification ETFs (60% coverage) with average weight 1.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, avgWeight: 5.49, proScore: 2.2, coverage: 0.4,
      price: 296.39, weeklyPrices: [296.55, 293.87, 302.15, 293.22, 296.39], weeklyChange: -0.05, dayChange: -1.15, sortRank: 0, periodReturns: { '1M': 14.8, '6M': 80.5, '1Y': 227.5 },
      priceHistory: { '1D': [299.84, 307.55, 306.44, 301.04, 300.8, 299.88, 299.37, 300.26, 297.98, 296.98, 298.29, 298.88, 298.35, 299.06, 295.16, 295.17, 294.48, 295.99, 296.58, 295.51, 293.78, 296.04, 298.03, 296.39], '1W': [296.55, 293.87, 302.15, 293.22, 296.39], '1M': [258.28, 249.71, 254.75, 260.4, 270.01, 276.25, 280.13, 276.96, 274.52, 269.86, 280.09, 276.54, 262.56, 279.13, 276.04, 276.95, 296.55, 293.87, 302.15, 293.22, 296.39], '6M': [164.18, 176.17, 172.78, 187.43, 200.11, 205.17, 215.59, 229.32, 235.3, 234.4, 213.65, 198.5, 209.52, 214.98, 197.83, 210.32, 237.34, 257.41, 249.82, 297.17, 298.22, 249.71, 280.13, 280.09, 276.95, 296.39], '1Y': [90.51, 96.08, 99.27, 101.66, 103.72, 119.84, 127.5, 132.58, 131.03, 132.6, 134.56, 141.51, 145.86, 142.08, 142.84, 138.97, 137.73, 146.11, 157, 153.99, 161.53, 147.67, 134.36, 154.03, 166, 173.12, 175.69, 174.34, 184, 193.82, 201.17, 210.66, 217.25, 237.19, 221.19, 234.67, 213.8, 200.88, 205.74, 222.04, 197.98, 228.29, 236.04, 262.68, 258.26, 286.89, 266.92, 249.71, 280.13, 280.09, 276.95, 296.39] },
      velocityScore: { '1D': -2.7, '1W': -5.2, '1M': -39.6, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 71.4, revenueGrowth: 17, eps: 4.15, grossMargin: 39, dividendYield: 0.1,
      etfPresence: { POW: 3.39, VOLT: 7.59, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.35, proScore: 1.34, coverage: 0.4,
      price: 333.05, weeklyPrices: [297.88, 302.87, 311.93, 299.60, 333.05], weeklyChange: 11.81, dayChange: 4.87, sortRank: 0, periodReturns: { '1M': -2, '6M': 122.3, '1Y': 181 },
      priceHistory: { '1D': [317.58, 332.86, 331.25, 331.93, 334.54, 335.04, 336.23, 334.36, 332.9, 333.42, 333.69, 333.58, 333.39, 334.06, 332.99, 333.31, 332.27, 331.77, 331.82, 331.13, 330.96, 331.84, 334.29, 333.05], '1W': [297.88, 302.87, 311.93, 299.6, 333.05], '1M': [339.73, 322.63, 315.67, 323.4, 327.46, 323.91, 319.78, 314.18, 315.71, 323.39, 331.44, 323.92, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87, 311.93, 299.6, 333.05], '6M': [149.83, 166.87, 175.61, 163.58, 176.93, 181.23, 190.01, 202, 243.53, 253.15, 244.44, 270.06, 268.41, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 322.63, 319.78, 331.44, 280.98, 333.05], '1Y': [118.54, 127.16, 126.26, 124.72, 126.21, 137.47, 141.59, 139.93, 133.07, 125.97, 127.55, 121.82, 138.26, 143.6, 138.62, 160.2, 169.01, 174, 186.06, 192.86, 179.8, 170.97, 159.61, 179.73, 189.02, 161.27, 159.82, 165.62, 174.95, 172.72, 175.18, 189.21, 190.15, 199.62, 243.21, 262.19, 251.28, 268.26, 264.71, 270.89, 250.58, 281.03, 301.16, 305.14, 306.18, 358.92, 369.99, 322.63, 319.78, 331.44, 280.98, 333.05] },
      velocityScore: { '1D': 2.3, '1W': 4.7, '1M': -21.6, '6M': null }, isNew: false,
      marketCap: '$128B', pe: 83.7, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 2.54, PBD: false, PBW: false, IVEP: 4.17 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 3.19, proScore: 1.28, coverage: 0.4,
      price: 127.69, weeklyPrices: [128.48, 129.23, 129.31, 129.75, 127.69], weeklyChange: -0.61, dayChange: -0.45, sortRank: 0, periodReturns: { '1M': 0, '6M': 11.3, '1Y': 25.5 },
      priceHistory: { '1D': [128.27, 128.85, 128.38, 128.48, 128.53, 128.85, 129.12, 129.13, 129.29, 129.31, 129.24, 128.95, 129.07, 128.77, 128.66, 127.68, 127.79, 128.03, 127.98, 127.61, 127.15, 127.3, 127.42, 127.69], '1W': [128.48, 129.23, 129.31, 129.75, 127.69], '1M': [127.68, 128.92, 128.87, 129.61, 131.59, 130.9, 129.57, 127.76, 126.67, 123.79, 126.31, 127.79, 129.14, 126.77, 127.76, 128.53, 128.48, 129.23, 129.31, 129.75, 127.69], '6M': [114.71, 115.31, 115.81, 116.91, 119.96, 118.02, 118.33, 121.1, 130.24, 132.39, 131.92, 132.31, 133.62, 127.92, 131.12, 132.92, 135.46, 131.89, 135.59, 137.04, 131.94, 128.92, 129.57, 126.31, 128.53, 127.69], '1Y': [101.75, 102.46, 104.17, 105.02, 108.54, 109.79, 113.58, 112.5, 111.99, 114.02, 111.02, 107.55, 109.1, 107.06, 109.14, 114.06, 117.04, 117.53, 115.98, 120.26, 121.43, 121.3, 120.9, 123.77, 117.54, 114.13, 114.49, 115.77, 115.04, 116.62, 119.22, 119.43, 120.67, 121.23, 127.27, 132.46, 133.52, 131.26, 130.97, 128.8, 131.08, 134.71, 134.39, 131.62, 134.44, 132.56, 127.95, 128.92, 129.57, 126.31, 128.53, 127.69] },
      velocityScore: { '1D': 17.4, '1W': 12.3, '1M': -36.3, '6M': null }, isNew: false,
      marketCap: '$69B', pe: 18.9, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.93,
      etfPresence: { POW: 2.36, VOLT: 4.02, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.81, proScore: 1.13, coverage: 0.4,
      price: 372.59, weeklyPrices: [340.40, 354.37, 370.66, 350.45, 372.59], weeklyChange: 9.46, dayChange: 5.45, sortRank: 0, periodReturns: { '1M': 20.6, '6M': 82.2, '1Y': 189.7 },
      priceHistory: { '1D': [353.32, 365.86, 364.46, 364.87, 367.42, 365.27, 365.45, 364.95, 368.01, 368.9, 367.32, 365.05, 363.84, 364.53, 369.11, 368.8, 368.05, 369.14, 368.73, 369.85, 369.13, 368.75, 371.64, 372.59], '1W': [340.4, 354.37, 370.66, 350.45, 372.59], '1M': [309.06, 302.84, 313.05, 323.79, 324.86, 339.65, 328.34, 317.08, 302.18, 294.65, 322.5, 320.92, 294.81, 306.11, 311.64, 308.17, 340.4, 354.37, 370.66, 350.45, 372.59], '6M': [204.49, 217.23, 221.99, 219.59, 253.86, 263.03, 261.82, 279.17, 314.12, 335.74, 322.47, 311.39, 315.91, 329.78, 298.29, 339.32, 385.73, 385, 369.08, 345.63, 339.42, 302.84, 328.34, 322.5, 308.17, 372.59], '1Y': [128.63, 132.31, 136.61, 141.48, 142.66, 140.54, 135.25, 150.82, 151.4, 154.51, 149.68, 154.43, 156.74, 174.35, 166.46, 173.86, 169.62, 191.98, 202.61, 202.73, 216.73, 202.48, 188.88, 211.19, 219.38, 215.07, 216.09, 217.26, 229.7, 233.92, 250.95, 259.55, 263.03, 279.04, 321.34, 338.51, 330.54, 314.84, 319.63, 356.38, 322.71, 366.95, 374.32, 377.19, 361.39, 360.81, 339.19, 302.84, 328.34, 322.5, 308.17, 372.59] },
      velocityScore: { '1D': 3.7, '1W': 3.7, '1M': -37.2, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 77.6, revenueGrowth: 26, eps: 4.8, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: 1.09, VOLT: 4.54, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.67, proScore: 1.07, coverage: 0.4,
      price: 163.96, weeklyPrices: [152.46, 153.80, 158.59, 158.81, 163.96], weeklyChange: 7.54, dayChange: 1.77, sortRank: 0, periodReturns: { '1M': 34.7, '6M': 29.6, '1Y': 74.8 },
      priceHistory: { '1D': [161.11, 162.89, 163.87, 163.97, 163.98, 163.98, 164.18, 163.87, 164.29, 165.12, 165.52, 164.98, 165.27, 165.63, 165.32, 165.31, 165.14, 165.24, 165.49, 165.9, 165.08, 162.79, 165.04, 163.96], '1W': [152.46, 153.8, 158.59, 158.81, 163.96], '1M': [121.72, 119.2, 123.05, 124.86, 132.06, 139.56, 140.24, 147.68, 148.76, 146.34, 147.62, 146.77, 138.81, 143.6, 154.07, 149.22, 152.46, 153.8, 158.59, 158.81, 163.96], '6M': [126.51, 137.94, 139.71, 140.16, 154.39, 155.56, 144.93, 144.2, 148.57, 151.5, 129.58, 136.74, 135.12, 130.67, 119.15, 128.38, 148.72, 151.93, 143.72, 136.69, 127.87, 119.2, 140.24, 147.62, 149.22, 163.96], '1Y': [93.82, 97.67, 98.55, 100.21, 103.71, 105.02, 104.31, 109.98, 109.21, 109.36, 108.86, 110.54, 119.24, 123.94, 122.6, 122.22, 121.7, 125.65, 133.82, 139.34, 139.09, 133.74, 130.36, 140.9, 139.36, 129.24, 135.29, 136.9, 141.38, 148.97, 152.33, 166.25, 147.06, 144.14, 147.73, 152.64, 132.75, 134.54, 127.81, 127.96, 126.35, 135.32, 146.98, 148.13, 148.38, 138.47, 124.64, 119.2, 140.24, 147.62, 149.22, 163.96] },
      velocityScore: { '1D': -0.9, '1W': 0.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$202B', pe: 47.1, revenueGrowth: 58, eps: 3.48, grossMargin: 38, dividendYield: 0.63,
      etfPresence: { POW: 0.97, VOLT: 4.36, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 2.48, proScore: 0.99, coverage: 0.4,
      price: 73.12, weeklyPrices: [71.62, 72.08, 71.49, 71.48, 73.12], weeklyChange: 2.09, dayChange: 2.62, sortRank: 0, periodReturns: { '1M': -5.9, '6M': 24.3, '1Y': 20.9 },
      priceHistory: { '1D': [71.25, 71.15, 71.98, 71.55, 72.1, 72.38, 72.29, 72.26, 72.52, 72.88, 73.03, 72.91, 72.93, 72.91, 72.92, 72.66, 72.77, 72.96, 73.02, 72.97, 72.83, 72.96, 73.04, 73.12], '1W': [71.62, 72.08, 71.49, 71.48, 73.12], '1M': [77.69, 79.4, 77.88, 77.52, 78.47, 76.34, 74.37, 73.13, 71.39, 70.04, 71.66, 72.43, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 73.12], '6M': [58.84, 59.46, 60.85, 60.32, 61.55, 64.29, 66.34, 67.85, 71.96, 73.5, 75.88, 73.84, 73.69, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 79.4, 74.37, 71.66, 72.26, 73.12], '1Y': [60.49, 62.67, 58.48, 59.04, 57.68, 57.82, 60.27, 57.89, 57.46, 57.07, 57.88, 56.85, 58.4, 60.11, 64.01, 64.48, 62.61, 62.46, 57.48, 57.87, 59.58, 60.99, 58.91, 60.93, 62.81, 59.74, 58.26, 59.8, 59.5, 60.49, 61.51, 65.48, 68.5, 68.84, 72.14, 73.97, 75.77, 74.4, 72.8, 74.46, 72.78, 73.01, 70.76, 71.1, 73.32, 73.76, 75.71, 79.4, 74.37, 71.66, 72.26, 73.12] },
      velocityScore: { '1D': 0, '1W': -4.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$89B', pe: 32.1, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.94,
      etfPresence: { POW: false, VOLT: 1.47, PBD: false, PBW: false, IVEP: 3.5 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.45, proScore: 0.98, coverage: 0.4,
      price: 144.82, weeklyPrices: [144.01, 144.96, 146.06, 145.17, 144.82], weeklyChange: 0.56, dayChange: 0.84, sortRank: 0, periodReturns: { '1M': 5.5, '6M': 24.4, '1Y': 41.6 },
      priceHistory: { '1D': [143.62, 147.91, 147.31, 146.65, 145.61, 146.52, 146.39, 146.66, 146.52, 146.07, 146.32, 146.41, 145.82, 146.56, 146.16, 145.74, 145.35, 145.52, 145.34, 145.3, 144.98, 144.9, 144.94, 144.82], '1W': [144.01, 144.96, 146.06, 145.17, 144.82], '1M': [137.31, 135.42, 137.75, 135.47, 138.36, 140.22, 138.2, 136.15, 134.06, 133.91, 146.96, 147.4, 143.65, 144.05, 147.75, 139.36, 144.01, 144.96, 146.06, 145.17, 144.82], '6M': [116.38, 121.39, 122.31, 110.85, 114.61, 115.07, 122.98, 139, 142.21, 144.71, 139.58, 133.94, 132.56, 133.27, 126.58, 133.15, 142.05, 139.72, 141.59, 144.82, 141.04, 135.42, 138.2, 146.96, 139.36, 144.82], '1Y': [102.25, 105.07, 105.98, 106.26, 108.27, 111.73, 106.48, 105.55, 103.52, 107.26, 106.89, 107.17, 107.81, 108.69, 107.01, 108.79, 105.55, 108.83, 112.94, 114.39, 122.25, 118.72, 112.99, 116.31, 114.23, 114.76, 119.53, 121.71, 113.95, 112.09, 114.56, 116.96, 124.01, 138.75, 139.48, 144.49, 140, 134.99, 133.76, 136.43, 130.95, 139, 137.21, 139.81, 141.35, 143.14, 143.8, 135.42, 138.2, 146.96, 139.36, 144.82] },
      velocityScore: { '1D': -2, '1W': -5.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$88B', pe: 44.3, revenueGrowth: 8, eps: 3.27, grossMargin: 37, dividendYield: 1.1,
      etfPresence: { POW: false, VOLT: 1.4, PBD: false, PBW: false, IVEP: 3.51 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TLN', name: 'Talen Energy Corp', easyScore: 2, avgWeight: 2.35, proScore: 0.94, coverage: 0.4,
      price: 436.29, weeklyPrices: [344.80, 360.54, 386.21, 406.51, 436.29], weeklyChange: 26.53, dayChange: 6.46, sortRank: 0, periodReturns: { '1M': 34.6, '6M': 24, '1Y': 51.1 },
      priceHistory: { '1D': [409.81, 423.96, 430.73, 434.24, 441.13, 444.4, 446.39, 445.29, 443.28, 447.36, 446.64, 443.39, 436.64, 436.5, 433.77, 432.39, 432.88, 433.15, 433.17, 430.82, 429.82, 431.96, 433.42, 436.29], '1W': [344.8, 360.54, 386.21, 406.51, 436.29], '1M': [324.21, 314.57, 344.46, 360.48, 372.45, 389, 379.78, 381.47, 386.8, 377.2, 379.59, 378.08, 364.74, 364.78, 358.74, 336.59, 344.8, 360.54, 386.21, 406.51, 436.29], '6M': [351.96, 383.58, 396.73, 370.83, 371.66, 350.41, 340.8, 353.66, 388.28, 375.24, 341.39, 331.58, 327.14, 311.02, 313.03, 330.07, 345.76, 329.74, 361.17, 384.9, 374.61, 314.57, 379.78, 379.59, 336.59, 436.29], '1Y': [288.66, 297.88, 285.1, 281.96, 310.14, 346.62, 378.01, 374.68, 377.82, 356.11, 378.92, 383.49, 405.45, 423.56, 411.23, 438.5, 412.83, 406.45, 407.81, 399.78, 386.57, 360.92, 369.1, 394.27, 354.24, 356.36, 372.25, 380.27, 393.18, 376.86, 356.66, 359.51, 341.42, 357.93, 380.29, 391.43, 336.57, 316.22, 338.6, 315.77, 319.23, 328.65, 353.3, 339.32, 351.91, 409.99, 351.03, 314.57, 379.78, 379.59, 336.59, 436.29] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$21B', pe: null, revenueGrowth: 97, eps: -0.53, grossMargin: 40, dividendYield: null,
      etfPresence: { POW: 1.73, VOLT: false, PBD: false, PBW: false, IVEP: 2.97 },
      tonyNote: 'Talen Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CEG', name: 'Constellation Energy Corp', easyScore: 2, avgWeight: 2.32, proScore: 0.93, coverage: 0.4,
      price: 274.06, weeklyPrices: [246.71, 253.76, 262.35, 268.00, 274.06], weeklyChange: 11.09, dayChange: 2.58, sortRank: 0, periodReturns: { '1M': 4.6, '6M': -19.6, '1Y': -10.1 },
      priceHistory: { '1D': [267.17, 269.59, 271.29, 273.16, 277.49, 278.18, 277.85, 276.37, 276.57, 281.1, 281.46, 279.63, 276.9, 277.22, 277.6, 276.61, 276.57, 275.84, 276.47, 274.87, 274.07, 274.63, 274.79, 274.06], '1W': [246.71, 253.76, 262.35, 268, 274.06], '1M': [262, 260.67, 281.26, 285.83, 294.07, 301.57, 288.68, 286.31, 287.75, 265.7, 267.24, 264.59, 254.83, 250.67, 251.65, 242.3, 246.71, 253.76, 262.35, 268, 274.06], '6M': [340.97, 363.95, 366.25, 342.52, 307.71, 285.27, 270.88, 272.15, 303.01, 312.64, 324.87, 317.09, 307.69, 289.76, 298.61, 272.58, 296.61, 277.7, 305.71, 320.42, 293.6, 260.67, 288.68, 267.24, 242.3, 274.06], '1Y': [304.92, 320.17, 318.25, 325.99, 317.88, 327.35, 340.77, 335.77, 322.23, 310.16, 307.98, 298.82, 330.42, 330.9, 331.26, 360, 368.49, 386.5, 389.19, 377, 358.39, 338.52, 345.78, 364.36, 359.82, 351.98, 355.4, 358.33, 354.58, 333.53, 295.4, 288.76, 268.45, 271.14, 294.05, 325.84, 322.85, 300.69, 317.22, 294.85, 279.25, 284.27, 294.73, 287.16, 297, 322.78, 274.89, 260.67, 288.68, 267.24, 242.3, 274.06] },
      velocityScore: { '1D': -2.1, '1W': 2.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$98B', pe: 23.8, revenueGrowth: 64, eps: 11.5, grossMargin: 23, dividendYield: 0.64,
      etfPresence: { POW: 1.26, VOLT: false, PBD: false, PBW: false, IVEP: 3.39 },
      tonyNote: 'Constellation Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VST', name: 'Vistra Corp', easyScore: 2, avgWeight: 2.29, proScore: 0.92, coverage: 0.4,
      price: 163.75, weeklyPrices: [146.38, 148.02, 153.52, 158.61, 163.75], weeklyChange: 11.87, dayChange: 3.1, sortRank: 0, periodReturns: { '1M': 19.7, '6M': 2.4, '1Y': -11.5 },
      priceHistory: { '1D': [158.83, 160.9, 161.83, 162.25, 164.79, 166.59, 166.66, 166.59, 166.41, 169.52, 168.93, 167.3, 165.67, 165.72, 165.36, 164.71, 164.34, 163.83, 164.18, 163.18, 162.88, 163.53, 163.33, 163.75], '1W': [146.38, 148.02, 153.52, 158.61, 163.75], '1M': [136.75, 134.71, 144, 149.08, 156.27, 164.56, 160.15, 160.28, 160.23, 154.76, 153.8, 153.7, 148.76, 146.9, 146.22, 138.54, 146.38, 148.02, 153.52, 158.61, 163.75], '6M': [159.97, 161.96, 165.23, 166.37, 166.6, 158.81, 154.26, 152.97, 173.68, 171.62, 161.7, 164.4, 164.33, 151.29, 147.54, 153.68, 163.97, 154.91, 161.12, 160.38, 146.87, 134.71, 160.15, 153.8, 138.54, 163.75], '1Y': [185.1, 195.04, 193.7, 194.81, 188.23, 192.2, 208.05, 202.12, 197.33, 190.46, 189.11, 188.01, 213.52, 211.28, 207.22, 201.99, 196.86, 201.35, 201.47, 188.3, 191, 174.69, 173.79, 178.86, 167.17, 170.1, 163.03, 161.84, 169.53, 171.42, 156.81, 164.26, 153, 159.6, 170.57, 175.36, 163.36, 159.16, 170.12, 152.72, 150.33, 155.89, 162.94, 155.79, 153.79, 158.29, 142.61, 134.71, 160.15, 153.8, 138.54, 163.75] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$55B', pe: 27.4, revenueGrowth: 43, eps: 5.98, grossMargin: 39, dividendYield: null,
      etfPresence: { POW: 1.36, VOLT: false, PBD: false, PBW: false, IVEP: 3.22 },
      tonyNote: 'Vistra Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX TECHNOLOGIES INC', easyScore: 2, avgWeight: 2.14, proScore: 0.86, coverage: 0.4,
      price: 205.4, weeklyPrices: [194.68, 193.45, 193.94, 196.93, 205.40], weeklyChange: 5.51, dayChange: 1.15, sortRank: 0, periodReturns: { '1M': 1.7, '6M': 22.2, '1Y': 44.3 },
      priceHistory: { '1D': [203.07, 207.5, 204.46, 204.21, 205.28, 205.5, 205.88, 205.01, 204.71, 205.22, 204.74, 204.89, 205.58, 205.56, 205.09, 204.28, 203.72, 204.08, 203.9, 204.27, 203.83, 203.9, 204.32, 205.4], '1W': [194.68, 193.45, 193.94, 196.93, 205.4], '1M': [201.94, 197.33, 202.66, 202.52, 202.91, 204.38, 198.95, 199.27, 195.88, 188.39, 184.72, 190.76, 185.95, 187.46, 188.96, 183, 194.68, 193.45, 193.94, 196.93, 205.4], '6M': [168.12, 177.18, 181.85, 201.46, 217.89, 206.04, 206.04, 203, 201.09, 204.23, 205.83, 195.91, 207.48, 204.85, 191.59, 214.44, 238.27, 216.66, 216.18, 206.15, 206.83, 197.33, 198.95, 184.72, 183, 205.4], '1Y': [142.32, 143.19, 143.79, 138.65, 140.36, 147.96, 149.5, 179.19, 173.5, 163.09, 162.04, 163.75, 174.3, 174.5, 180.62, 186.64, 190.08, 203.12, 203.28, 213.61, 193.55, 178.31, 175.28, 178.88, 177.87, 175.03, 176.43, 175.49, 195.3, 210.54, 206.07, 212.4, 210.88, 199.83, 202.25, 208.27, 205.57, 195.98, 208.98, 204.76, 204.49, 231.78, 238.42, 219.1, 208.08, 215.2, 206.83, 197.33, 198.95, 184.72, 183, 205.4] },
      velocityScore: { '1D': -1.1, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 54.9, revenueGrowth: 26, eps: 3.74, grossMargin: 23, dividendYield: null,
      etfPresence: { POW: false, VOLT: 2.1, PBD: false, PBW: false, IVEP: 2.18 },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 5.29, proScore: 2.12, coverage: 0.4,
      price: 861.88, weeklyPrices: [838.55, 858.99, 866.67, 857.76, 861.88], weeklyChange: 2.78, dayChange: 2.82, sortRank: 0, periodReturns: { '1M': 11.8, '6M': 203.9, '1Y': 295.4 },
      priceHistory: { '1D': [838.21, 865, 836.38, 835.7, 852.5, 852, 854.11, 853, 858.97, 860.35, 861.94, 867.82, 866, 877.84, 871.5, 868.59, 864.66, 866.16, 861.69, 860.88, 858.41, 863.51, 869.11, 861.88], '1W': [838.55, 858.99, 866.67, 857.76, 861.88], '1M': [770.76, 728.29, 752, 733.77, 732.94, 783.53, 782.12, 842.96, 860.84, 845.39, 957.03, 993.74, 882.43, 891.86, 842.01, 770.25, 838.55, 858.99, 866.67, 857.76, 861.88], '6M': [283.57, 314, 319.16, 308.13, 350.96, 361.21, 367.95, 418.61, 421.2, 459.72, 415.51, 411.53, 425.51, 422.55, 382.55, 382.22, 464.54, 472.84, 471.85, 806, 851.35, 728.29, 782.12, 957.03, 770.25, 861.88], '1Y': [217.97, 231.51, 237, 241.31, 247.65, 268.14, 263.05, 302.69, 275.35, 279.58, 278.53, 286.71, 322.9, 360.25, 342.11, 349.3, 336.63, 355.58, 379.08, 377.9, 377.84, 338.66, 314.56, 344.31, 325.1, 315.15, 308.58, 310.79, 317.41, 321.6, 349.59, 372.25, 386.78, 415.19, 410.63, 455.25, 420.22, 420.6, 421.23, 446.16, 407.27, 423.35, 456.08, 487.87, 469.75, 886.22, 854.28, 728.29, 782.12, 957.03, 770.25, 861.88] },
      velocityScore: { '1D': 1.4, '1W': -0.5, '1M': -55.3, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 77.3, revenueGrowth: 92, eps: 11.15, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 6.27, PRN: 4.31, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.08, proScore: 2.03, coverage: 0.4,
      price: 985.82, weeklyPrices: [897.63, 910.57, 933.93, 945.46, 985.82], weeklyChange: 9.82, dayChange: 3.13, sortRank: 0, periodReturns: { '1M': 14.1, '6M': 75.4, '1Y': 173.4 },
      priceHistory: { '1D': [955.92, 989.99, 983.98, 982.06, 985.11, 990.08, 990.07, 988.33, 986.89, 987.31, 988.15, 987.04, 987.29, 988.29, 988.88, 989.03, 986.48, 988.29, 988.19, 986.14, 986.48, 985.94, 990.2, 985.82], '1W': [897.63, 910.57, 933.93, 945.46, 985.82], '1M': [863.95, 860.15, 872.56, 865.95, 879.89, 908.55, 909.93, 887.67, 875.87, 865.36, 926.18, 940.48, 904.28, 915.64, 914.7, 856.16, 897.63, 910.57, 933.93, 945.46, 985.82], '6M': [561.89, 583.76, 598.41, 617.62, 646.89, 635.92, 690.91, 742.12, 764.76, 768.23, 722.18, 716.68, 702, 701.7, 667.43, 724.44, 794.25, 800.45, 817.87, 904.59, 912.14, 860.15, 909.93, 926.18, 856.16, 985.82], '1Y': [360.52, 384.71, 391.51, 405.77, 410.07, 433.75, 428.69, 416.52, 407.79, 435.67, 419.04, 422.78, 435.94, 466.54, 465.76, 497.85, 491.3, 527.08, 522.73, 577.26, 563.1, 554.03, 546.13, 575.76, 603.17, 597.89, 576.22, 578.61, 623.09, 636.53, 629, 638.91, 702.89, 742.37, 751.97, 766.61, 731.97, 707.59, 693.62, 716.63, 708.46, 771.58, 770.17, 808.87, 810.05, 926.93, 902.3, 860.15, 909.93, 926.18, 856.16, 985.82] },
      velocityScore: { '1D': 1.5, '1W': 1.5, '1M': -11.4, '6M': null }, isNew: false,
      marketCap: '$454B', pe: 49.2, revenueGrowth: 22, eps: 20.04, grossMargin: 29, dividendYield: 0.69,
      etfPresence: { AIRR: false, PRN: 3.41, RSHO: 6.75, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 5, proScore: 2, coverage: 0.4,
      price: 297.2, weeklyPrices: [290.50, 294.75, 303.53, 292.70, 297.20], weeklyChange: 2.31, dayChange: 1.08, sortRank: 0, periodReturns: { '1M': 11.4, '6M': 181, '1Y': 408.3 },
      priceHistory: { '1D': [294.03, 293.83, 290.32, 287.45, 293.87, 294.27, 291.91, 290.17, 291.7, 295.59, 296.89, 297.15, 299.19, 299.76, 298.43, 298.66, 298.18, 297.33, 295.08, 294.96, 295.11, 296.39, 296.13, 297.2], '1W': [290.5, 294.75, 303.53, 292.7, 297.2], '1M': [266.8, 261.58, 271.05, 270.75, 279.22, 291.97, 295.94, 288.9, 284.42, 288.12, 299.73, 300.06, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75, 303.53, 292.7, 297.2], '6M': [105.77, 112.06, 117.51, 121.83, 139.99, 141.15, 146.79, 187.3, 187.21, 186.39, 170.37, 176.51, 174.04, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 261.58, 295.94, 299.73, 262.34, 297.2], '1Y': [58.47, 70.97, 71.96, 70.19, 73.64, 82.79, 75.89, 81.28, 84.88, 87.65, 88.72, 90.8, 100.68, 99.1, 96.99, 101.35, 100.35, 110.24, 121.66, 127.8, 121.79, 109.89, 98.12, 107.74, 114.04, 112.36, 110.97, 111.96, 120, 133.04, 142.76, 147.43, 151.08, 190.09, 180.99, 183, 170.96, 171.73, 167.41, 186.82, 180.36, 218.07, 229.73, 242.77, 253.49, 320.3, 300.84, 261.58, 295.94, 299.73, 262.34, 297.2] },
      velocityScore: { '1D': -4.8, '1W': -2.4, '1M': 9.9, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 58, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { AIRR: 2.62, PRN: false, RSHO: 7.37, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.61, proScore: 1.84, coverage: 0.4,
      price: 1967.41, weeklyPrices: [1843.42, 1877.61, 1952.02, 1913.94, 1967.41], weeklyChange: 6.73, dayChange: 1.84, sortRank: 0, periodReturns: { '1M': 6.1, '6M': 122.6, '1Y': 293.5 },
      priceHistory: { '1D': [1931.77, 1987, 1951.28, 1955.12, 1967.54, 1966.64, 1965.26, 1953.63, 1962.47, 1970.45, 1970.91, 1977.36, 1975.82, 1976.75, 1965.51, 1965.02, 1960.77, 1963.86, 1958.1, 1954.78, 1955.94, 1962.59, 1970.79, 1967.41], '1W': [1843.42, 1877.61, 1952.02, 1913.94, 1967.41], '1M': [1854.43, 1825.5, 1835.51, 1835.33, 1828.25, 1883.56, 1867.09, 1855.15, 1828.21, 1787.88, 1850.04, 1914.65, 1843.94, 1852.03, 1831.56, 1719.48, 1843.42, 1877.61, 1952.02, 1913.94, 1967.41], '6M': [883.79, 958.07, 1003.64, 1010.41, 1119.98, 1127.55, 1176.26, 1283.65, 1337.75, 1468.58, 1391.16, 1383.62, 1424.46, 1408.25, 1273.18, 1424.91, 1650.48, 1674.16, 1719.21, 1967.24, 2016.31, 1825.5, 1867.09, 1850.04, 1719.48, 1967.41], '1Y': [500.02, 535, 541.48, 542.95, 544.95, 688.74, 695.3, 691.76, 680.86, 689.48, 703.38, 715.87, 782.05, 797.71, 804.36, 818.01, 816.07, 827.92, 981.66, 965.58, 955.26, 909.6, 876.19, 976.94, 1001.48, 967.95, 940.74, 950.67, 1035.11, 1073.14, 1134.75, 1160.38, 1209.97, 1269.63, 1319.47, 1450.6, 1430.38, 1407.32, 1423, 1461.52, 1378.99, 1525.16, 1648.96, 1724.49, 1724.14, 2011.49, 2034.63, 1825.5, 1867.09, 1850.04, 1719.48, 1967.41] },
      velocityScore: { '1D': 0, '1W': 2.8, '1M': -59.4, '6M': null }, isNew: false,
      marketCap: '$69B', pe: 56.8, revenueGrowth: 1, eps: 34.64, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: 4.46, PRN: 4.76, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, avgWeight: 4.54, proScore: 1.81, coverage: 0.4,
      price: 738.85, weeklyPrices: [623.66, 641.68, 688.87, 690.39, 738.85], weeklyChange: 18.47, dayChange: 2.69, sortRank: 0, periodReturns: { '1M': 11.1, '6M': 149.1, '1Y': 263.3 },
      priceHistory: { '1D': [719.52, 742.34, 727.11, 713.19, 719.49, 721, 717.12, 717.77, 722.34, 724.56, 728.46, 726.61, 729.73, 731.58, 725.96, 727.15, 726.41, 726.74, 727.18, 727.33, 725.49, 726.34, 725.92, 738.85], '1W': [623.66, 641.68, 688.87, 690.39, 738.85], '1M': [664.76, 639.58, 630.5, 644.64, 656.35, 670.66, 673.51, 677.45, 667.02, 646.89, 686.37, 689.43, 694.72, 619.98, 613.93, 588.9, 623.66, 641.68, 688.87, 690.39, 738.85], '6M': [296.56, 328.26, 325.96, 311.87, 383.66, 353.5, 355.77, 370, 406.88, 447.6, 438.93, 458.71, 473.63, 463.15, 513.98, 576.95, 603.91, 615.42, 630.7, 720, 681.01, 639.58, 673.51, 686.37, 588.9, 738.85], '1Y': [203.36, 219.74, 209.5, 220.73, 207.07, 235.91, 225.27, 239.02, 223.99, 222.16, 228.22, 203.84, 238.75, 260.64, 266.73, 262.26, 256.15, 283.94, 296.55, 306.21, 311.58, 351.64, 353.3, 395.2, 313.7, 319.91, 325.59, 320.73, 330.42, 314.09, 384.34, 362.58, 381.73, 371.47, 414.12, 442.34, 463.36, 472.86, 469.81, 444.83, 544.65, 588.28, 606.43, 651.68, 630.07, 727.54, 719.92, 639.58, 673.51, 686.37, 588.9, 738.85] },
      velocityScore: { '1D': 0.6, '1W': 13.8, '1M': -57.4, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 64.9, revenueGrowth: 50, eps: 11.39, grossMargin: 21, dividendYield: 0.29,
      etfPresence: { AIRR: 4.45, PRN: 4.62, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Argan Inc is an engineering and construction company for power generation facilities — natural gas and renewable power plants. It appears in Industrials ETFs because power plant construction is one of the fastest-growing categories in U.S. infrastructure spending, driven by data center load additions that the grid cannot currently support.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.48, proScore: 1.39, coverage: 0.4,
      price: 337.96, weeklyPrices: [318.89, 320.11, 316.18, 324.38, 337.96], weeklyChange: 5.98, dayChange: 2.45, sortRank: 0, periodReturns: { '1M': 10.7, '6M': 31.6, '1Y': 48.8 },
      priceHistory: { '1D': [329.89, 334.1, 335.19, 336.7, 337.03, 338.5, 339.98, 339.72, 339.41, 337.98, 338.21, 338.35, 338.06, 338.53, 338.15, 338.42, 338.33, 338.38, 338.2, 338.47, 336.69, 336.4, 336.45, 337.96], '1W': [318.89, 320.11, 316.18, 324.38, 337.96], '1M': [305.22, 302.64, 306.25, 305.66, 307.1, 311.33, 312.65, 308.53, 303.81, 300.98, 313.39, 313.67, 315.29, 314.42, 322.81, 314.08, 318.89, 320.11, 316.18, 324.38, 337.96], '6M': [256.73, 264.33, 259.63, 272.25, 281.21, 281.54, 270.02, 282.45, 278.31, 282.27, 277.7, 264.31, 261.37, 262.23, 258.01, 272.54, 292.01, 293.59, 301.24, 305.48, 313.7, 302.64, 312.65, 313.39, 314.08, 337.96], '1Y': [227.19, 231.69, 244.15, 256.98, 260.2, 272.13, 264.18, 263.13, 255.01, 267.11, 263.58, 266.22, 262.83, 260.45, 261.43, 258.41, 246.04, 247.92, 260.29, 257.09, 258.92, 248.96, 242.52, 258.82, 257.91, 261.74, 262.41, 263.4, 265.39, 278.77, 277.44, 262.34, 273.22, 283.73, 279.27, 280.76, 279.91, 270.13, 258.51, 264.14, 265.32, 280.74, 284.56, 289.82, 296.57, 315.39, 310.87, 302.64, 312.65, 313.39, 314.08, 337.96] },
      velocityScore: { '1D': 0, '1W': -0.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 32, revenueGrowth: 7, eps: 10.57, grossMargin: 30, dividendYield: 0.63,
      etfPresence: { AIRR: 1.83, PRN: false, RSHO: 5.12, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.81, proScore: 1.12, coverage: 0.4,
      price: 242.97, weeklyPrices: [233.49, 230.05, 237.06, 234.80, 242.97], weeklyChange: 4.06, dayChange: 3.26, sortRank: 0, periodReturns: { '1M': 21.2, '6M': 17.2, '1Y': 57.3 },
      priceHistory: { '1D': [235.29, 239.82, 240, 242.12, 243.29, 243.9, 243.4, 243.93, 244.05, 243.76, 244, 244.31, 243.32, 243.33, 242.91, 242.73, 242.43, 242.29, 242.2, 242.3, 241.02, 242.07, 241.41, 242.97], '1W': [233.49, 230.05, 237.06, 234.8, 242.97], '1M': [200.47, 195.79, 205.55, 205.39, 207.8, 219.08, 215.34, 213.82, 216.66, 220.92, 234.08, 236.14, 227.8, 229.95, 228.01, 223.63, 233.49, 230.05, 237.06, 234.8, 242.97], '6M': [207.33, 208.48, 203.26, 207.51, 217.65, 215.21, 212.73, 223.86, 241.6, 243.04, 219.58, 210.96, 204.62, 194.52, 190.71, 195.43, 224.82, 216.49, 216.36, 207.81, 198.99, 195.79, 215.34, 234.08, 223.63, 242.97], '1Y': [154.42, 167.15, 169.97, 174.38, 174.44, 180.82, 196.36, 201.57, 186.39, 190.47, 187.11, 189.1, 186.95, 188.04, 182.95, 189.83, 184.77, 184.04, 194.03, 223.89, 221.92, 211.43, 199.31, 215.04, 208.67, 219.94, 203.17, 205.66, 208.63, 211.07, 217.9, 215.68, 215.43, 231.2, 241.58, 226.66, 222.07, 210.15, 202.46, 200.67, 199.94, 212.22, 219.99, 220.62, 211.36, 212.74, 203.79, 195.79, 215.34, 234.08, 223.63, 242.97] },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 46.4, revenueGrowth: 17, eps: 5.24, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.7, PRN: false, RSHO: 3.91, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 2, avgWeight: 2.79, proScore: 1.11, coverage: 0.4,
      price: 277.66, weeklyPrices: [264.60, 264.67, 270.44, 277.42, 277.66], weeklyChange: 4.94, dayChange: -1.97, sortRank: 0, periodReturns: { '1M': 8, '6M': 45.2, '1Y': 60.2 },
      priceHistory: { '1D': [283.23, 283.98, 280.64, 278.17, 278.48, 278.82, 276.64, 277.42, 277.11, 278.14, 278.32, 278.76, 279.2, 279.09, 278.88, 279.39, 278.91, 278.59, 277.72, 278.11, 277.05, 277.29, 278.26, 277.66], '1W': [264.6, 264.67, 270.44, 277.42, 277.66], '1M': [256.99, 253.12, 261.21, 259.89, 256.55, 261.89, 258.02, 259.89, 258.25, 255.52, 248.63, 249.33, 251.9, 246.55, 257.16, 249.49, 264.6, 264.67, 270.44, 277.42, 277.66], '6M': [191.19, 212.17, 211.71, 218.27, 224.89, 215.39, 207.21, 225.15, 252.55, 260.95, 258.84, 253.91, 240.24, 236.04, 222.99, 236.02, 258.03, 247.72, 240.43, 242.69, 269.76, 253.12, 258.02, 248.63, 249.49, 277.66], '1Y': [173.34, 184.9, 180.25, 184.32, 187.83, 189.52, 184.26, 180.75, 171.25, 171, 174.1, 179.43, 189.25, 190.23, 193.15, 189.25, 184.09, 189.68, 198.51, 205.95, 206.66, 203.29, 197.92, 204.59, 190.98, 198.31, 203.49, 209.49, 214.69, 219.64, 220.36, 215.53, 213.49, 224.47, 249.35, 259.64, 260.09, 251.65, 241.93, 239.51, 230.46, 250, 254.04, 240.88, 236.52, 256.43, 273.1, 253.12, 258.02, 248.63, 249.49, 277.66] },
      velocityScore: { '1D': -2.6, '1W': 1.8, '1M': -52.2, '6M': null }, isNew: false,
      marketCap: '$111B', pe: 64.6, revenueGrowth: 19, eps: 4.3, grossMargin: 35, dividendYield: 0.17,
      etfPresence: { AIRR: false, PRN: 3.34, RSHO: false, IDEF: 2.23, BILT: false },
      tonyNote: 'Howmet Aerospace is an aerospace structures and engine components manufacturer. It appears in Industrials ETFs for its aerospace and defense exposure — commercial air travel recovery and defense spending growth are the two demand drivers. Revenue grew and margins are expanding as Howmet prices power over OEM customers.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.48, proScore: 0.99, coverage: 0.4,
      price: 205.4, weeklyPrices: [194.68, 193.45, 193.94, 196.93, 205.40], weeklyChange: 5.51, dayChange: 1.15, sortRank: 0, periodReturns: { '1M': 1.7, '6M': 22.2, '1Y': 44.3 },
      priceHistory: { '1D': [203.07, 207.5, 204.46, 204.21, 205.28, 205.5, 205.88, 205.01, 204.71, 205.22, 204.74, 204.89, 205.58, 205.56, 205.09, 204.28, 203.72, 204.08, 203.9, 204.27, 203.83, 203.9, 204.32, 205.4], '1W': [194.68, 193.45, 193.94, 196.93, 205.4], '1M': [201.94, 197.33, 202.66, 202.52, 202.91, 204.38, 198.95, 199.27, 195.88, 188.39, 184.72, 190.76, 185.95, 187.46, 188.96, 183, 194.68, 193.45, 193.94, 196.93, 205.4], '6M': [168.12, 177.18, 181.85, 201.46, 217.89, 206.04, 206.04, 203, 201.09, 204.23, 205.83, 195.91, 207.48, 204.85, 191.59, 214.44, 238.27, 216.66, 216.18, 206.15, 206.83, 197.33, 198.95, 184.72, 183, 205.4], '1Y': [142.32, 143.19, 143.79, 138.65, 140.36, 147.96, 149.5, 179.19, 173.5, 163.09, 162.04, 163.75, 174.3, 174.5, 180.62, 186.64, 190.08, 203.12, 203.28, 213.61, 193.55, 178.31, 175.28, 178.88, 177.87, 175.03, 176.43, 175.49, 195.3, 210.54, 206.07, 212.4, 210.88, 199.83, 202.25, 208.27, 205.57, 195.98, 208.98, 204.76, 204.49, 231.78, 238.42, 219.1, 208.08, 215.2, 206.83, 197.33, 198.95, 184.72, 183, 205.4] },
      velocityScore: { '1D': 1, '1W': 4.2, '1M': -57.5, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 54.9, revenueGrowth: 26, eps: 3.74, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 3.19, PRN: false, RSHO: false, IDEF: 1.77, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 1.86, proScore: 0.75, coverage: 0.4,
      price: 54.21, weeklyPrices: [58.78, 57.75, 57.02, 56.34, 54.21], weeklyChange: -7.77, dayChange: -3.47, sortRank: 0, periodReturns: { '1M': 0, '6M': -22.3, '1Y': 25.7 },
      priceHistory: { '1D': [56.16, 54.38, 53.75, 53.49, 53.66, 53.67, 53.85, 53.93, 53.85, 53.62, 53.17, 53.36, 53.29, 53.42, 53.28, 53.4, 53.12, 52.94, 53.21, 53.39, 53.17, 53.2, 53.68, 54.21], '1W': [58.78, 57.75, 57.02, 56.34, 54.21], '1M': [54.22, 53.47, 55.82, 54.67, 56.18, 56.8, 57.3, 65.19, 64.13, 63.49, 58.43, 63.4, 58.52, 57.73, 56.19, 54.82, 58.78, 57.75, 57.02, 56.34, 54.21], '6M': [69.77, 79.97, 79.29, 113.7, 130.72, 111.32, 96.16, 98.81, 91.97, 90.68, 88.95, 88.96, 95.31, 83.69, 65.28, 71.96, 73.66, 68.55, 61.66, 59.31, 57.33, 53.47, 57.3, 58.43, 54.82, 54.21], '1Y': [43.11, 45.84, 44.78, 51.99, 58.78, 59.77, 56.71, 63.88, 68.5, 66.71, 65.84, 64.14, 70.74, 80.77, 86.28, 96.19, 94.63, 83.12, 91.18, 90.6, 77.88, 72.45, 67.31, 76.1, 76.5, 75.96, 75.39, 77.47, 91.93, 119.72, 128.68, 118.06, 103.37, 93.48, 97.21, 88.23, 89.13, 88.92, 93.04, 77.49, 70.51, 74.46, 74.66, 68.61, 59.56, 61.52, 52.49, 53.47, 57.3, 58.43, 54.82, 54.21] },
      velocityScore: { '1D': -2.6, '1W': -8.5, '1M': -63.6, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 318.9, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.69, PRN: false, RSHO: false, IDEF: 1.04, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.79, proScore: 0.71, coverage: 0.4,
      price: 285.43, weeklyPrices: [300.95, 297.68, 299.66, 298.51, 285.43], weeklyChange: -5.16, dayChange: -3.86, sortRank: 0, periodReturns: { '1M': -13.3, '6M': -11.2, '1Y': 21.7 },
      priceHistory: { '1D': [296.89, 292.98, 287.28, 284.89, 285.09, 287.03, 287.12, 286.13, 285.98, 285.41, 284.04, 285.37, 285.32, 285.73, 285.61, 284.7, 284.25, 283.96, 284.22, 284.83, 283.26, 282.8, 283.29, 285.43], '1W': [300.95, 297.68, 299.66, 298.51, 285.43], '1M': [329.35, 324.6, 321.92, 317.55, 320.63, 320.95, 317.56, 320.9, 308.17, 296.41, 287.54, 294.53, 293.04, 292.26, 297.52, 289.13, 300.95, 297.68, 299.66, 298.51, 285.43], '6M': [321.29, 355.45, 349.75, 386.99, 425.9, 413.56, 420.3, 405.82, 417.83, 447.73, 440.33, 417.51, 422.94, 396.57, 369.08, 402.28, 398.07, 378.21, 361.4, 326.13, 333.56, 324.6, 317.56, 287.54, 289.13, 285.43], '1Y': [234.54, 238.65, 253.53, 258.5, 252.93, 264.82, 269.83, 264.69, 266.25, 269.98, 270.79, 269.94, 273.02, 275.13, 278.77, 284.24, 282.99, 280.02, 299.91, 322.02, 309.56, 313.97, 301.83, 313.62, 304.58, 326.92, 336.64, 345.73, 367.6, 411.66, 415.58, 422.79, 429.64, 399.37, 424.89, 435.58, 437.03, 413.7, 427.99, 402.08, 379.9, 411.35, 398.13, 366.88, 362.17, 319.54, 334.22, 324.6, 317.56, 287.54, 289.13, 285.43] },
      velocityScore: { '1D': -4.1, '1W': -6.6, '1M': -66.4, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 18.5, revenueGrowth: 13, eps: 15.4, grossMargin: 12, dividendYield: null,
      etfPresence: { AIRR: 2.54, PRN: false, RSHO: false, IDEF: 1.03, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'WMB', name: 'WMB', easyScore: 2, avgWeight: 1.39, proScore: 0.56, coverage: 0.4,
      price: 73.12, weeklyPrices: [71.62, 72.08, 71.49, 71.48, 73.12], weeklyChange: 2.09, dayChange: 2.62, sortRank: 0, periodReturns: { '1M': -5.9, '6M': 24.3, '1Y': 20.9 },
      priceHistory: { '1D': [71.25, 71.15, 71.98, 71.55, 72.1, 72.38, 72.29, 72.26, 72.52, 72.88, 73.03, 72.91, 72.93, 72.91, 72.92, 72.66, 72.77, 72.96, 73.02, 72.97, 72.83, 72.96, 73.04, 73.12], '1W': [71.62, 72.08, 71.49, 71.48, 73.12], '1M': [77.69, 79.4, 77.88, 77.52, 78.47, 76.34, 74.37, 73.13, 71.39, 70.04, 71.66, 72.43, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 73.12], '6M': [58.84, 59.46, 60.85, 60.32, 61.55, 64.29, 66.34, 67.85, 71.96, 73.5, 75.88, 73.84, 73.69, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 79.4, 74.37, 71.66, 72.26, 73.12], '1Y': [60.49, 62.67, 58.48, 59.04, 57.68, 57.82, 60.27, 57.89, 57.46, 57.07, 57.88, 56.85, 58.4, 60.11, 64.01, 64.48, 62.61, 62.46, 57.48, 57.87, 59.58, 60.99, 58.91, 60.93, 62.81, 59.74, 58.26, 59.8, 59.5, 60.49, 61.51, 65.48, 68.5, 68.84, 72.14, 73.97, 75.77, 74.4, 72.8, 74.46, 72.78, 73.01, 70.76, 71.1, 73.32, 73.76, 75.71, 79.4, 74.37, 71.66, 72.26, 73.12] },
      velocityScore: { '1D': 1.8, '1W': 1.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$89B', pe: 32.1, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.94,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.92, IDEF: false, BILT: 1.86 },
      tonyNote: 'WMB appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.19, proScore: 0.48, coverage: 0.4,
      price: 639.18, weeklyPrices: [607.46, 603.64, 616.95, 621.08, 639.18], weeklyChange: 5.22, dayChange: 2.15, sortRank: 0, periodReturns: { '1M': 16, '6M': 43.6, '1Y': 71.6 },
      priceHistory: { '1D': [625.73, 635.63, 635, 633.61, 633.89, 634.13, 635.18, 634.78, 634.64, 633.02, 634.98, 634.65, 634.64, 635.53, 635.36, 636.56, 635.64, 635.74, 635.69, 636.35, 633.3, 632.73, 634.22, 639.18], '1W': [607.46, 603.64, 616.95, 621.08, 639.18], '1M': [551.12, 565.22, 571.05, 566.96, 559.95, 584.4, 577.42, 577.83, 571.96, 566.14, 584.18, 589.76, 590.09, 590.97, 592.41, 576.74, 607.46, 603.64, 616.95, 621.08, 639.18], '6M': [444.99, 458.38, 458.79, 487.16, 498.82, 504.5, 507.13, 548.2, 552.93, 571.57, 568.58, 560.28, 544.55, 537.2, 524.38, 553.31, 598.23, 591.32, 594.39, 607.5, 613.1, 565.22, 577.42, 584.18, 576.74, 639.18], '1Y': [372.5, 381.36, 386.98, 376.71, 391.98, 388.37, 399.8, 398.07, 394.75, 401.56, 389.96, 381.97, 382.27, 379.98, 384.82, 373.99, 372.64, 372.85, 412.19, 428.53, 434.25, 432.04, 427.81, 444.97, 443.44, 460.17, 451.06, 456.9, 475.7, 489.97, 495.29, 504.54, 516.1, 547.51, 551.65, 565.44, 570.08, 559.52, 547.81, 552.23, 543.12, 580.55, 586.98, 588.74, 584.49, 623.19, 618.91, 565.22, 577.42, 584.18, 576.74, 639.18] },
      velocityScore: { '1D': 2.1, '1W': 4.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 70.5, revenueGrowth: 18, eps: 9.07, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.87, PRN: false, RSHO: false, IDEF: 0.51, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.1, proScore: 0.44, coverage: 0.4,
      price: 113.91, weeklyPrices: [119.32, 120.30, 115.93, 112.44, 113.91], weeklyChange: -4.53, dayChange: -1.38, sortRank: 0, periodReturns: { '1M': 22, '6M': 63.6, '1Y': 124.4 },
      priceHistory: { '1D': [115.5, 115.79, 114.08, 113.9, 113.96, 114.72, 114.41, 114.43, 113.67, 113.43, 112.76, 113.36, 113.92, 113.49, 113.81, 113.65, 114.72, 114.38, 113.23, 113.88, 113.53, 113.16, 113.44, 113.91], '1W': [119.32, 120.3, 115.93, 112.44, 113.91], '1M': [93.39, 92.8, 94.81, 96.36, 98.55, 99.32, 97.11, 108.11, 111.7, 111.28, 111.59, 117.82, 111.27, 110.94, 108.82, 106.81, 119.32, 120.3, 115.93, 112.44, 113.91], '6M': [69.63, 74.7, 76.03, 93.48, 103.02, 98.89, 93.89, 85.37, 83.32, 88.76, 89.43, 86.87, 81.35, 78.29, 69.86, 77.53, 84.09, 83.36, 76.53, 82.96, 92.32, 92.8, 97.11, 111.59, 106.81, 113.91], '1Y': [50.77, 53.41, 51.45, 51.27, 52.37, 52.98, 52.17, 52.83, 66.7, 66.83, 67.55, 68.68, 72.81, 75.77, 76.82, 83.5, 73.58, 75.54, 79.42, 77.41, 74.07, 70.85, 66.12, 69.89, 70.58, 74.49, 69.65, 74.93, 84.25, 99.14, 97.1, 101.04, 99.28, 84.36, 86.66, 89.3, 89.18, 86, 78.97, 74.49, 72.91, 80.81, 85.51, 82.61, 74.75, 91.66, 92.5, 92.8, 97.11, 111.59, 106.81, 113.91] },
      velocityScore: { '1D': -2.2, '1W': -6.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.18, PRN: false, RSHO: false, IDEF: 1.03, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 1.06, proScore: 0.43, coverage: 0.4,
      price: 50.37, weeklyPrices: [49.58, 47.83, 48.27, 51.70, 50.37], weeklyChange: 1.59, dayChange: -3.19, sortRank: 0, periodReturns: { '1M': -23.9, '6M': -22.4, '1Y': 8.9 },
      priceHistory: { '1D': [52.03, 52.17, 50.68, 49.68, 50.29, 50.41, 50.78, 50.5, 50.23, 49.95, 49.49, 49.91, 49.32, 49.41, 49.36, 49.35, 49.06, 49.04, 49.12, 49.47, 49.86, 49.74, 49.58, 50.37], '1W': [49.58, 47.83, 48.27, 51.7, 50.37], '1M': [66.21, 64.2, 65.76, 65.3, 64.1, 60.66, 63.52, 65.86, 57.5, 53.65, 51.84, 54.39, 49.44, 49.64, 48.37, 45.87, 49.58, 47.83, 48.27, 51.7, 50.37], '6M': [64.94, 80.81, 76.85, 106.22, 108.5, 108.71, 102.87, 97.47, 75.11, 83.6, 91.11, 102.79, 104.06, 102.39, 74.82, 82, 90.18, 82.06, 70.3, 62.89, 62.48, 64.2, 63.52, 51.84, 45.87, 50.37], '1Y': [46.24, 50.47, 45.24, 49.41, 56.22, 50.45, 50.22, 45.78, 50.6, 52.24, 53.41, 62.36, 63.8, 66.12, 68.42, 72.6, 74.71, 75.03, 84.15, 84.24, 70.68, 60.25, 58.96, 67.03, 65.45, 68.44, 71.65, 77.57, 90.41, 107.49, 106.28, 113.34, 111.72, 91.25, 81, 83.44, 98.88, 104.84, 101.43, 101.84, 80.05, 87.75, 92.73, 82.11, 65.98, 63.19, 67.28, 64.2, 63.52, 51.84, 45.87, 50.37] },
      velocityScore: { '1D': -2.3, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: 219, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.93, PRN: false, RSHO: false, IDEF: 0.2, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.57, proScore: 0.23, coverage: 0.4,
      price: 46.08, weeklyPrices: [49.69, 48.53, 46.68, 45.59, 46.08], weeklyChange: -7.27, dayChange: -1.07, sortRank: 0, periodReturns: { '1M': 7.6, '6M': 41.6, '1Y': 4.7 },
      priceHistory: { '1D': [46.58, 46.37, 45.5, 45.15, 45.38, 45.47, 45.14, 45.19, 45.17, 45.19, 44.9, 45.06, 45.28, 45.78, 45.54, 45.71, 45.74, 45.9, 45.78, 45.87, 45.76, 45.59, 45.81, 46.08], '1W': [49.69, 48.53, 46.68, 45.59, 46.08], '1M': [42.84, 42.81, 44.56, 44.55, 44.92, 45.8, 45.35, 48.41, 48.76, 47.96, 45.61, 46.71, 46.15, 46.55, 47.35, 46.11, 49.69, 48.53, 46.68, 45.59, 46.08], '6M': [32.55, 34.52, 34.78, 40.99, 42.57, 40.63, 40.45, 40.22, 39.13, 43.82, 45.51, 46.35, 45.6, 44.4, 43.25, 46.19, 47.54, 43.2, 40.18, 39.7, 42.87, 42.81, 45.35, 45.61, 46.11, 46.08], '1Y': [44, 45.04, 47.16, 47.97, 46.79, 48.44, 41.67, 41.49, 41.67, 41.19, 41.66, 41.05, 42.02, 41.44, 43.94, 44.39, 43.23, 39.34, 40.51, 36.56, 35.33, 34.84, 33.08, 34.17, 33.9, 34.46, 33.64, 34.13, 37.46, 40.85, 42.07, 42.16, 41.51, 39.48, 39.9, 42.36, 46.95, 46.16, 46.44, 44.06, 44.52, 47.93, 46.29, 42.07, 39.47, 41.79, 42.5, 42.81, 45.35, 45.61, 46.11, 46.08] },
      velocityScore: { '1D': 0, '1W': -8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 43.1, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.79,
      etfPresence: { AIRR: 0.84, PRN: false, RSHO: false, IDEF: 0.3, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.36, proScore: 0.14, coverage: 0.4,
      price: 77.99, weeklyPrices: [73.61, 74.92, 76.55, 76.19, 77.99], weeklyChange: 5.95, dayChange: 0.13, sortRank: 0, periodReturns: { '1M': 3.4, '6M': 18.1, '1Y': 83.7 },
      priceHistory: { '1D': [77.89, 79.02, 78.46, 77.92, 77.65, 78.01, 77.95, 77.62, 77.63, 77.71, 77.68, 77.93, 77.95, 77.97, 77.55, 77.57, 77.59, 77.68, 77.64, 77.58, 77.48, 77.53, 77.86, 77.99], '1W': [73.61, 74.92, 76.55, 76.19, 77.99], '1M': [75.43, 74.91, 76.99, 74.88, 72.76, 74.67, 74.47, 73.27, 71.49, 74.26, 72.26, 72.38, 70.53, 72.13, 71.48, 68.72, 73.61, 74.92, 76.55, 76.19, 77.99], '6M': [66.02, 68.93, 69.35, 70.53, 75.09, 77.34, 80.11, 84.07, 82.24, 85.87, 69.95, 71.29, 71.44, 72.44, 72.83, 77.31, 86.16, 85.11, 86.87, 97.31, 82.69, 74.91, 74.47, 72.26, 68.72, 77.99], '1Y': [42.46, 46.85, 47.99, 49.51, 48.97, 47.91, 45.65, 56.41, 56.75, 58.43, 58.94, 61.83, 64.22, 65.48, 64.67, 62.41, 60.61, 64.22, 68.84, 67.36, 62.94, 59.08, 59.75, 68.55, 67.82, 67.34, 69.99, 68.66, 71.14, 73.54, 74.13, 78.53, 82.33, 86, 81.1, 86.1, 73.71, 69.83, 71.21, 75.25, 77.19, 80.54, 86.25, 84.19, 86.04, 96.98, 80.64, 74.91, 74.47, 72.26, 68.72, 77.99] },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 53.4, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: null,
      etfPresence: { AIRR: 0.68, PRN: false, RSHO: false, IDEF: 0.04, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'Timken Company', easyScore: 1, avgWeight: 8.74, proScore: 1.75, coverage: 0.2,
      price: 142.36, weeklyPrices: [137.40, 137.06, 139.12, 140.28, 142.36], weeklyChange: 3.61, dayChange: 2.12, sortRank: 0, periodReturns: { '1M': 26.3, '6M': 69.2, '1Y': 101.8 },
      priceHistory: { '1D': [139.4, 141.54, 142.51, 141.73, 142, 142.21, 142.38, 141.9, 141.64, 141.23, 141.22, 141.45, 141.49, 141.42, 141.19, 141.35, 141.14, 141.41, 141.46, 141.32, 141.32, 141.44, 140.87, 142.36], '1W': [137.4, 137.06, 139.12, 140.28, 142.36], '1M': [112.73, 109.36, 117.2, 118.93, 119.95, 127.42, 127.16, 126.78, 127.98, 126.54, 131.82, 133.66, 131.83, 134.67, 137.09, 132.39, 137.4, 137.06, 139.12, 140.28, 142.36], '6M': [84.14, 86.02, 86.29, 91.17, 93.55, 94.02, 94.99, 108.93, 105.54, 109.52, 106.58, 102.18, 98.59, 98.99, 95.94, 99.17, 106.81, 108.75, 106.88, 109.63, 117.12, 109.36, 127.16, 131.82, 132.39, 142.36], '1Y': [70.56, 73.21, 75.52, 77.3, 78.63, 81.66, 73.5, 74.39, 76, 78.99, 77.23, 77.15, 77.38, 77.5, 75.55, 76.54, 70.79, 73.17, 78.12, 78.51, 78.99, 76.41, 74.55, 81.39, 83.21, 87.38, 85.26, 86.33, 90.95, 91.68, 90.65, 93.89, 96.14, 109.41, 107.23, 107.69, 105.59, 103.33, 98.23, 101.03, 100.57, 105.88, 103.73, 106.79, 106.53, 119.7, 115.74, 109.36, 127.16, 131.82, 132.39, 142.36] },
      velocityScore: { '1D': -4.9, '1W': -5.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 32.4, revenueGrowth: 8, eps: 4.4, grossMargin: 31, dividendYield: 1.03,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.74, IDEF: false, BILT: false },
      tonyNote: 'Timken Company appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 8.05, proScore: 1.61, coverage: 0.2,
      price: 185.6, weeklyPrices: [184.21, 183.53, 183.64, 186.77, 185.60], weeklyChange: 0.75, dayChange: -3.62, sortRank: 0, periodReturns: { '1M': 5.5, '6M': 4.7, '1Y': 26.6 },
      priceHistory: { '1D': [192.58, 191.96, 188.32, 186.99, 186.42, 187.28, 186.7, 186.25, 186.21, 185.74, 185.74, 185.74, 186.04, 185.71, 185.59, 185.14, 185.19, 184.79, 184.84, 185.56, 185.43, 185.68, 185.54, 185.6], '1W': [184.21, 183.53, 183.64, 186.77, 185.6], '1M': [175.95, 174.49, 174.85, 175.98, 177.01, 178.97, 176.59, 178.96, 179.66, 174.41, 172.55, 179.41, 180.99, 178.66, 181.56, 177.41, 184.21, 183.53, 183.64, 186.77, 185.6], '6M': [177.2, 186.38, 187.25, 188.5, 201.92, 194.13, 201.09, 196.19, 203.5, 198.46, 206.52, 207, 203.33, 194.82, 187.15, 197.92, 202.81, 187.17, 175.68, 172.87, 178.89, 174.49, 176.59, 172.55, 177.41, 185.6], '1Y': [146.64, 144.66, 145.92, 149.28, 151.56, 156.88, 156.81, 154.86, 154.09, 156.24, 158.6, 154.22, 158.37, 158.24, 163.35, 166.58, 157.7, 157.95, 178.65, 178.5, 176.97, 175.57, 172.73, 174.91, 171.1, 178.66, 182.01, 184.42, 190.4, 194.08, 196.36, 201.28, 203.5, 195.19, 204.81, 195.98, 208.82, 207.26, 204.56, 194, 192.9, 203.48, 198.39, 180.91, 172.79, 176.74, 178.11, 174.49, 176.59, 172.55, 177.41, 185.6] },
      velocityScore: { '1D': -1.8, '1W': 1.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$250B', pe: 34.9, revenueGrowth: 9, eps: 5.32, grossMargin: 20, dividendYield: 1.48,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 8.05, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CGNX', name: 'Cognex Corporation', easyScore: 1, avgWeight: 7.22, proScore: 1.44, coverage: 0.2,
      price: 66.1, weeklyPrices: [62.11, 63.61, 65.90, 65.41, 66.10], weeklyChange: 6.42, dayChange: 2.05, sortRank: 0, periodReturns: { '1M': 6.8, '6M': 84.8, '1Y': 123.2 },
      priceHistory: { '1D': [64.77, 66.09, 66.53, 66.11, 65.97, 66.32, 66.44, 66.41, 66.35, 66.32, 66.25, 66.5, 66.48, 66.66, 66.54, 66.67, 66.59, 66.65, 66.78, 66.92, 66.33, 66.35, 66.52, 66.1], '1W': [62.11, 63.61, 65.9, 65.41, 66.1], '1M': [61.91, 60.65, 63.37, 64.27, 66.09, 68.33, 66.7, 66.01, 65.85, 64.64, 66.06, 64.67, 60.82, 62.39, 61.32, 58.69, 62.11, 63.61, 65.9, 65.41, 66.1], '6M': [35.76, 36.6, 36.93, 39.01, 40.92, 39.37, 39.76, 43.72, 57.09, 57.88, 53.61, 50.58, 50.12, 50.8, 45.94, 51.69, 55.58, 53.72, 53.74, 58.83, 65.68, 60.65, 66.7, 66.06, 58.69, 66.1], '1Y': [29.61, 31.46, 31.85, 33.78, 33.73, 34.08, 40.47, 40.91, 42.7, 44.76, 43.94, 44.61, 44.16, 46.48, 45.79, 46.3, 40.78, 46.04, 48.35, 41.39, 39.27, 36.77, 34.86, 38.1, 38.42, 35.65, 36.8, 36.47, 38.6, 39.63, 38.92, 39.46, 40.85, 43.58, 56.72, 57.42, 53.17, 50.99, 49.87, 51.01, 48.99, 53.78, 54.64, 54.03, 53.52, 62.26, 63.64, 60.65, 66.7, 66.06, 58.69, 66.1] },
      velocityScore: { '1D': 0.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 77.8, revenueGrowth: 24, eps: 0.85, grossMargin: 68, dividendYield: 0.51,
      etfPresence: { AIRR: false, PRN: false, RSHO: 7.22, IDEF: false, BILT: false },
      tonyNote: 'Cognex Corporation appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 7.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 5.1, proScore: 5.1, coverage: 1,
      price: 286.69, weeklyPrices: [222.24, 232.36, 260.07, 265.10, 286.69], weeklyChange: 29, dayChange: 2.06, sortRank: 0, periodReturns: { '1M': 43.4, '6M': 280, '1Y': 497.6 },
      priceHistory: { '1D': [280.91, 289.85, 286.96, 285.84, 279.34, 283.8, 289.09, 288.23, 287.88, 286.15, 286.19, 285.73, 284.22, 284.82, 284.78, 284.86, 284.47, 284.19, 284.38, 282.25, 280, 283.88, 285.31, 286.69], '1W': [222.24, 232.36, 260.07, 265.1, 286.69], '1M': [199.86, 197.73, 191.82, 219.93, 214.77, 208.06, 208.37, 226.34, 231.09, 264.51, 251.68, 259.67, 227.81, 218, 220.12, 211.69, 222.24, 232.36, 260.07, 265.1, 286.69], '6M': [75.45, 91.13, 89.95, 97.93, 108.73, 91.46, 88.16, 92.88, 97.52, 102.58, 86.8, 96.43, 116.33, 114.15, 92.26, 117.4, 161.94, 156.55, 135.51, 175.92, 179.11, 197.73, 208.37, 251.68, 211.69, 286.69], '1Y': [47.97, 51.84, 47.84, 51.95, 52.37, 51.37, 52, 68.78, 71.62, 68.98, 68.32, 64.06, 90.96, 99.31, 107.7, 127.98, 129.58, 113.44, 117.26, 130.82, 111.28, 83.54, 84.64, 94.87, 98.04, 87.69, 89.46, 86.04, 100.24, 105.43, 99.29, 97.87, 89.95, 91.79, 101.8, 106.12, 97.78, 112, 118.56, 114.91, 103.76, 125, 166.77, 156.14, 141.19, 195.09, 207.27, 197.73, 208.37, 251.68, 211.69, 286.69] },
      velocityScore: { '1D': 2.8, '1W': 17, '1M': null, '6M': null }, isNew: false,
      marketCap: '$73B', pe: 110.3, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 3.6, MEME: 6.53, RKNG: 5.18 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 3, avgWeight: 3.92, proScore: 3.92, coverage: 1,
      price: 46.59, weeklyPrices: [41.47, 42.70, 46.47, 46.27, 46.59], weeklyChange: 12.35, dayChange: 2.24, sortRank: 0, periodReturns: { '1M': 19, '6M': 111.8, '1Y': 351 },
      priceHistory: { '1D': [45.57, 46.62, 46.23, 46.06, 46.19, 46.73, 46.75, 46.38, 46.4, 46.97, 46.86, 46.76, 46.33, 46.3, 45.93, 46.41, 46.3, 46.09, 45.96, 45.75, 45.54, 46, 46.33, 46.59], '1W': [41.47, 42.7, 46.47, 46.27, 46.59], '1M': [39.14, 36.62, 39.52, 48.02, 45.87, 45.14, 48.98, 49.65, 47.28, 47.94, 44.71, 44.15, 39.62, 40.94, 41.91, 38.92, 41.47, 42.7, 46.47, 46.27, 46.59], '6M': [22, 25.72, 28.11, 37.68, 37.4, 36.18, 34.8, 38.26, 33.56, 30.66, 26.15, 27.4, 27.51, 27.26, 20.55, 25.18, 31.47, 31.32, 32.11, 39.88, 43.93, 36.62, 48.98, 44.71, 38.92, 46.59], '1Y': [10.33, 10.38, 9.66, 9.52, 11.09, 10.75, 12.52, 14.2, 14.09, 16.05, 15.98, 13.91, 19.35, 20.48, 21.71, 26.53, 33.99, 34.24, 33.43, 34.66, 30.98, 23.65, 21.37, 27.1, 31.22, 27.86, 27.85, 24.81, 30.26, 36.71, 35.46, 41.35, 36.7, 37.47, 31.91, 29.08, 28.65, 28.52, 26.65, 26.79, 23.74, 27.79, 30.81, 32.43, 32.69, 44.24, 45.48, 36.62, 48.98, 44.71, 38.92, 46.59] },
      velocityScore: { '1D': -1, '1W': 4.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.56, MEME: 5.37, RKNG: 3.84 },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 3, avgWeight: 3.87, proScore: 3.87, coverage: 1,
      price: 59.96, weeklyPrices: [56.71, 59.77, 60.85, 59.18, 59.96], weeklyChange: 5.73, dayChange: 3.18, sortRank: 0, periodReturns: { '1M': 18.8, '6M': 77.5, '1Y': 472.7 },
      priceHistory: { '1D': [58.11, 59.25, 59.42, 59.74, 59.65, 60.49, 60.36, 59.94, 59.86, 60.44, 59.95, 60.58, 60.42, 60.44, 60.12, 60.15, 60.23, 59.85, 59.79, 59.15, 58.3, 58.38, 59.49, 59.96], '1W': [56.71, 59.77, 60.85, 59.18, 59.96], '1M': [50.46, 47.74, 52.71, 58.06, 56.83, 59.78, 67.84, 64.05, 63.54, 65.33, 65.48, 61.86, 54.35, 59.19, 54.02, 51.52, 56.71, 59.77, 60.85, 59.18, 59.96], '6M': [33.78, 41.98, 42.7, 46.03, 57.82, 52.36, 53.08, 46.15, 40.97, 45.45, 38.85, 38.12, 42.96, 42.16, 31.62, 35.74, 47.37, 45.17, 44.44, 54.74, 56.56, 47.74, 67.84, 65.48, 51.52, 59.96], '1Y': [10.47, 14, 16.95, 17.28, 18.15, 17.72, 15.4, 18.45, 19.69, 21.43, 26.48, 26.19, 37.14, 38.64, 41.86, 50.46, 59.77, 60.72, 62.9, 60.75, 62.38, 46.37, 43.47, 47.81, 44.71, 40.13, 39.92, 39.41, 45.91, 52.99, 54.26, 59.99, 54.39, 42.93, 42.08, 44.03, 43.84, 41.98, 42.21, 41.12, 34.28, 36.83, 48.82, 48.39, 42.86, 60.98, 55.17, 47.74, 67.84, 65.48, 51.52, 59.96] },
      velocityScore: { '1D': -1.8, '1W': 38.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$21B', pe: 77.9, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 3.04, MEME: 5.3, RKNG: 3.28 },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 3, avgWeight: 3.69, proScore: 3.69, coverage: 1,
      price: 80.66, weeklyPrices: [97.56, 82.41, 87.57, 82.25, 80.66], weeklyChange: -17.32, dayChange: -5.58, sortRank: 0, periodReturns: { '1M': -7.1, '6M': 30.4, '1Y': 75.6 },
      priceHistory: { '1D': [85.43, 79.24, 77.93, 79.32, 79.16, 79.52, 79.17, 79.95, 78.91, 78.58, 78.43, 78.3, 78.42, 78.38, 78.42, 78.84, 78.25, 77.95, 78.14, 78.27, 78.18, 78.77, 79.58, 80.66], '1W': [97.56, 82.41, 87.57, 82.25, 80.66], '1M': [86.83, 88.1, 89.58, 96.23, 105.86, 119.7, 129.6, 133.09, 113.41, 105.65, 107.73, 107.29, 93.6, 92.06, 88.71, 87.32, 97.56, 82.41, 87.57, 82.25, 80.66], '6M': [61.86, 78.05, 83.47, 97.67, 115.77, 104.78, 104.55, 102.12, 83.03, 85.82, 92.68, 87.53, 95.7, 88.42, 73.82, 92.57, 88.57, 80.01, 71.88, 63.87, 72.96, 88.1, 129.6, 107.73, 87.32, 80.66], '1Y': [45.94, 49.36, 45.69, 47.86, 56.67, 54.33, 52.46, 46.63, 48.08, 47.07, 48.94, 40.77, 40.97, 45.1, 49.09, 67.76, 82.03, 83.49, 73.7, 80.25, 69.19, 61.4, 50.7, 56.2, 73.92, 76.7, 75.84, 71.47, 97.49, 92.72, 112.44, 111.34, 115.76, 96.27, 84.43, 82.36, 104.89, 88.21, 90.74, 86.98, 82.87, 96.46, 86.91, 84.66, 69.85, 70.68, 74.81, 88.1, 129.6, 107.73, 87.32, 80.66] },
      velocityScore: { '1D': 0.3, '1W': -4.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$31B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.98, MEME: 5.81, RKNG: 2.28 },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab', easyScore: 3, avgWeight: 3.56, proScore: 3.56, coverage: 1,
      price: 107.24, weeklyPrices: [114.78, 102.39, 109.25, 104.63, 107.24], weeklyChange: -6.57, dayChange: -0.69, sortRank: 0, periodReturns: { '1M': -18.2, '6M': 98.7, '1Y': 257 },
      priceHistory: { '1D': [107.98, 102.68, 102.65, 103, 103.54, 104.2, 105.01, 105.65, 104.68, 104.89, 104.21, 103.82, 104.03, 104, 103.93, 104.54, 104.03, 103.28, 104.04, 104.43, 104.79, 106.4, 107.1, 107.24], '1W': [114.78, 102.39, 109.25, 104.63, 107.24], '1M': [131.16, 127.31, 134.28, 125.45, 135.76, 143.2, 150.23, 148.03, 143.48, 122.39, 114.7, 119.95, 110.08, 113.65, 108.23, 105.05, 114.78, 102.39, 109.25, 104.63, 107.24], '6M': [53.96, 77.18, 75.99, 84.85, 96.3, 80.48, 74.15, 75.84, 69.89, 69.97, 70.13, 68.93, 78.59, 68, 57.38, 66.32, 72.22, 86.64, 78.59, 78.76, 117.56, 127.31, 150.23, 114.7, 105.05, 107.24], '1Y': [30.04, 35.38, 38.88, 43.21, 47.19, 47.43, 44.81, 44.69, 44.27, 44.38, 48.6, 47.73, 54.04, 47.79, 46.26, 56.16, 64.26, 66.27, 64.56, 62.98, 51.64, 45.54, 39.48, 42.14, 49.06, 61.49, 70.52, 70.12, 86.03, 86.58, 89.16, 87, 81.27, 72.03, 74.42, 70.2, 71.91, 71.96, 69.48, 66.07, 64.22, 69.08, 73.6, 90.04, 77.02, 84.65, 124.15, 127.31, 150.23, 114.7, 105.05, 107.24] },
      velocityScore: { '1D': 95.6, '1W': -0.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$67B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 1.82, MEME: 5.28, RKNG: 3.59 },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 6.35, proScore: 4.23, coverage: 0.667,
      price: 2184.75, weeklyPrices: [1881.51, 1980.10, 2107.86, 1991.55, 2184.75], weeklyChange: 16.12, dayChange: 11.54, sortRank: 0, periodReturns: { '1M': 63.9, '6M': 956.3, '1Y': 4590.3 },
      priceHistory: { '1D': [1958.8, 2110.45, 2140.15, 2173.94, 2153.46, 2163.79, 2166.11, 2165.8, 2171.57, 2172.5, 2174.54, 2164.96, 2164.73, 2175.95, 2177, 2172.97, 2174.24, 2184.4, 2178.87, 2165.7, 2166.74, 2186, 2183.09, 2184.75], '1W': [1881.51, 1980.1, 2107.86, 1991.55, 2184.75], '1M': [1333.01, 1383.29, 1392.56, 1542.24, 1478.69, 1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 2184.75], '6M': [206.83, 250.08, 275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 565.41, 618.89, 720.17, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1831.5, 1643.23, 2184.75], '1Y': [46.58, 47.15, 45.22, 42.48, 41.61, 42.48, 41.33, 44.34, 44.54, 46.37, 52.47, 70.5, 90.09, 102.21, 97.12, 128.41, 116.91, 140.16, 186.16, 199.33, 239.48, 254.16, 195.96, 223.28, 228.47, 206.18, 237.61, 244.25, 349.63, 389.81, 453.12, 481.43, 695.51, 541.64, 600.4, 632.38, 599.06, 655.43, 753.69, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1383.29, 1589.94, 1831.5, 1643.23, 2184.75] },
      velocityScore: { '1D': -1.4, '1W': 3.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$324B', pe: 74.6, revenueGrowth: 251, eps: 29.28, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.51, RKNG: 7.19 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 2, avgWeight: 5.67, proScore: 3.78, coverage: 0.667,
      price: 161.85, weeklyPrices: [172.78, 169.05, 191.55, 170.81, 161.85], weeklyChange: -6.33, dayChange: -3.28, sortRank: 0, periodReturns: { '1M': -6.6, '6M': 496.4, '1Y': 590.2 },
      priceHistory: { '1D': [167.34, 167.2, 161.41, 165.92, 170.32, 170.3, 168.87, 165.4, 164.78, 165.24, 164.38, 162.35, 161.19, 162.29, 161.87, 161.71, 161.01, 160.5, 159.01, 159, 159.4, 160.05, 161.77, 161.85], '1W': [172.78, 169.05, 191.55, 170.81, 161.85], '1M': [173.26, 171.33, 165.26, 176.81, 181.49, 177.62, 179.83, 169.02, 158.41, 185.67, 184.07, 202.89, 177, 196.64, 162.88, 175.13, 172.78, 169.05, 191.55, 170.81, 161.85], '6M': [27.14, 41, 39.6, 34.04, 37.04, 34.89, 44.16, 47.91, 43.91, 56.27, 95.34, 120.49, 86.33, 95.76, 85.19, 117.64, 146.39, 150.57, 137.26, 180.57, 188.28, 171.33, 179.83, 184.07, 175.13, 161.85], '1Y': [23.45, 26.22, 26.44, 29.5, 28.23, 27.13, 21.53, 21.59, 22.36, 24.79, 24.2, 23.63, 29.56, 28.99, 25.77, 27.93, 27.15, 31.92, 34.01, 35.56, 28.57, 21.47, 19.49, 26.78, 26.59, 32.06, 31.32, 36.75, 38.61, 34.18, 39.26, 37.39, 46.12, 48.49, 43.44, 58.12, 99.71, 127.01, 92.63, 113.9, 84.59, 132.7, 142.55, 149.42, 152.83, 178.54, 223.1, 171.33, 179.83, 184.07, 175.13, 161.85] },
      velocityScore: { '1D': -2.1, '1W': 11.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.93, RKNG: 4.42 },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 5.05, proScore: 3.37, coverage: 0.667,
      price: 328.91, weeklyPrices: [248.88, 260.22, 274.50, 280.88, 328.91], weeklyChange: 32.16, dayChange: 15.41, sortRank: 0, periodReturns: { '1M': 27.1, '6M': 327.3, '1Y': 1412.2 },
      priceHistory: { '1D': [284.99, 303.53, 303.66, 309.75, 310.73, 311.19, 312.5, 312.36, 310.6, 311.97, 310.6, 310.16, 310.11, 311.46, 311.58, 311.8, 309.27, 309.86, 309.92, 317.68, 321.56, 321.36, 326.42, 328.91], '1W': [248.88, 260.22, 274.5, 280.88, 328.91], '1M': [258.71, 261.34, 282.31, 307.88, 302.49, 302.4, 293.8, 290.01, 285, 273.51, 287.32, 291.37, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22, 274.5, 280.88, 328.91], '6M': [76.97, 91.88, 98.69, 134.07, 149.5, 139.62, 156.13, 155.17, 145.32, 166.2, 153.02, 154, 160.05, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 261.34, 293.8, 287.32, 234.23, 328.91], '1Y': [21.75, 22.18, 24.36, 25.96, 25.36, 34.34, 36.72, 36.8, 45.28, 48.54, 52.94, 53.44, 67.02, 84.93, 70.32, 90.29, 86.87, 111.5, 110.38, 132.16, 135.21, 111.89, 93.38, 109.24, 119.18, 94.98, 88.82, 88.41, 103.05, 139.77, 151.75, 152.31, 168.89, 148.7, 157.27, 174.77, 164.78, 159.21, 156.58, 145.88, 135.49, 146.78, 213.84, 229.75, 287.97, 285.47, 289.76, 261.34, 293.8, 287.32, 234.23, 328.91] },
      velocityScore: { '1D': 0, '1W': 88.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$94B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.14, RKNG: 3.97 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 4.88, proScore: 3.25, coverage: 0.667,
      price: 1133.99, weeklyPrices: [995.87, 981.61, 1087.99, 1020.76, 1133.99], weeklyChange: 13.87, dayChange: 8.7, sortRank: 0, periodReturns: { '1M': 66.4, '6M': 402.8, '1Y': 817.5 },
      priceHistory: { '1D': [1043.19, 1099, 1106.11, 1118.26, 1121.66, 1124.56, 1128.4, 1126.12, 1122.69, 1126.87, 1127.72, 1125.45, 1127.32, 1129.46, 1134.23, 1134.65, 1138.57, 1141.99, 1142.73, 1144.29, 1139.82, 1142.21, 1147.02, 1133.99], '1W': [995.87, 981.61, 1087.99, 1020.76, 1133.99], '1M': [681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1133.99], '6M': [225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 891.88, 1133.99], '1Y': [123.6, 124.76, 119.92, 118.61, 113.23, 111.26, 104.88, 118.89, 120.87, 117.68, 119.01, 131.46, 157.77, 162.73, 157.27, 187.83, 181.6, 202.38, 219.02, 223.77, 237.92, 246.83, 201.37, 236.48, 237.22, 241.14, 265.92, 294.37, 343.43, 338.13, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.73, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 698.74, 928.41, 1079.57, 891.88, 1133.99] },
      velocityScore: { '1D': -1.5, '1W': 5.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.3T', pe: 53.4, revenueGrowth: 196, eps: 21.23, grossMargin: 58, dividendYield: null,
      etfPresence: { BUZZ: 3.96, MEME: false, RKNG: 5.79 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'NVTS', name: 'Navitas Semiconductor', easyScore: 2, avgWeight: 4.46, proScore: 2.97, coverage: 0.667,
      price: 24.02, weeklyPrices: [22.21, 23.39, 23.73, 22.09, 24.02], weeklyChange: 8.15, dayChange: 7.52, sortRank: 0, periodReturns: { '1M': 22.1, '6M': 225.5, '1Y': 242.7 },
      priceHistory: { '1D': [22.34, 23.14, 23.9, 24.12, 23.99, 24.03, 23.5, 23.53, 23.25, 23.29, 23.34, 23.37, 23.26, 23.39, 23.32, 23.42, 23.3, 23.19, 23.23, 23.22, 23.17, 23.36, 23.81, 24.02], '1W': [22.21, 23.39, 23.73, 22.09, 24.02], '1M': [19.67, 19.43, 22.99, 24.38, 29.25, 31.79, 28.88, 28.51, 26.6, 24.86, 30.84, 30.67, 25.08, 24.48, 22.85, 20.5, 22.21, 23.39, 23.73, 22.09, 24.02], '6M': [7.38, 7.66, 8.38, 10.07, 10.91, 9.38, 8.62, 9.22, 8.22, 8.26, 8.9, 8.68, 9.82, 9.18, 7.83, 8.57, 9.87, 15.33, 15.12, 17.55, 19.25, 19.43, 28.88, 30.84, 20.5, 24.02], '1Y': [7.01, 6.67, 6.15, 5.87, 8.47, 8.79, 7.96, 6.66, 6.92, 6.43, 5.86, 5.61, 6.11, 7.01, 6.43, 7.82, 8.23, 14.66, 14.07, 13.46, 7.84, 8.11, 7.55, 8.74, 9.48, 8.59, 7.81, 7.21, 10.19, 9.45, 9.86, 9.56, 9.05, 8.79, 8.09, 9.88, 9.22, 10.84, 9.06, 9.28, 8.77, 9.55, 10.26, 18.47, 15.48, 16.68, 21.17, 19.43, 28.88, 30.84, 20.5, 24.02] },
      velocityScore: { '1D': -0.3, '1W': -7.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.66, RKNG: 5.26 },
      tonyNote: 'Navitas Semiconductor is a small-cap wide-bandgap power semiconductor name — gallium nitride and silicon carbide for fast charging and EV applications. The $26.60 share price and small market cap position it as a speculative holding in ETFs willing to take higher-risk bets on next-generation power conversion.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 2, avgWeight: 4.23, proScore: 2.82, coverage: 0.667,
      price: 271.83, weeklyPrices: [264.76, 250.81, 259.41, 239.18, 271.83], weeklyChange: 2.67, dayChange: 9.02, sortRank: 0, periodReturns: { '1M': 73.9, '6M': 102.7, '1Y': 217.9 },
      priceHistory: { '1D': [249.33, 258.77, 253.95, 264.16, 266.46, 265.07, 267.13, 264.23, 262.47, 265.87, 263.93, 262.25, 262.1, 261.14, 262.04, 262.99, 262.64, 262.11, 262.66, 263.55, 264.64, 265.61, 270.1, 271.83], '1W': [264.76, 250.81, 259.41, 239.18, 271.83], '1M': [156.27, 168.99, 182.98, 193.39, 218.41, 221.64, 221.23, 222.35, 236.03, 226.1, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 271.83], '6M': [134.13, 150.19, 143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 97.3, 112.33, 104.06, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.23, 214.6, 237.68, 271.83], '1Y': [85.51, 93.49, 92.73, 98.7, 95.74, 101.22, 107.56, 120.41, 116.74, 114.04, 123.06, 147.53, 163.98, 169.56, 142.93, 143.87, 138.83, 143.61, 155.55, 187.62, 163.61, 145.52, 134.73, 177.6, 176.04, 143.91, 150.13, 144.7, 132.95, 161.38, 153.22, 129.57, 111.31, 134.72, 127.91, 123.46, 102.54, 115.91, 101.72, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 168.99, 221.23, 214.6, 237.68, 271.83] },
      velocityScore: { '1D': 1.1, '1W': -7.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$51B', pe: 108.3, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.5, RKNG: 4.96 },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 2, avgWeight: 3.25, proScore: 2.17, coverage: 0.667,
      price: 56.55, weeklyPrices: [57.99, 57.85, 61.18, 56.06, 56.55], weeklyChange: -2.48, dayChange: 3.4, sortRank: 0, periodReturns: { '1M': 14.7, '6M': 23.3, '1Y': 40.1 },
      priceHistory: { '1D': [54.69, 54.19, 54.23, 54.49, 54.53, 55.29, 55.01, 54.75, 54.46, 54.63, 54.17, 54.25, 54.44, 54.66, 54.56, 54.88, 54.56, 54.61, 54.73, 55.08, 55.22, 55.76, 55.9, 56.55], '1W': [57.99, 57.85, 61.18, 56.06, 56.55], '1M': [49.31, 48.44, 52.47, 58.89, 63.64, 63.62, 65.4, 70.14, 72.07, 69.28, 68.23, 65.66, 56.78, 62.8, 56.69, 56.63, 57.99, 57.85, 61.18, 56.06, 56.55], '6M': [45.85, 49.82, 46.77, 49.45, 50.8, 43.37, 38.56, 35.48, 33.18, 31.62, 37.05, 35.12, 33.31, 33.11, 26.59, 28.49, 35.76, 46.28, 43.08, 48, 55.87, 48.44, 65.4, 68.23, 56.63, 56.55], '1Y': [40.36, 40.25, 45.2, 42.41, 44.43, 43.17, 38.12, 41.85, 40.23, 39.78, 42.74, 41.01, 59.11, 70.41, 67.28, 73.28, 70.65, 62.94, 60.3, 62.38, 59.27, 47.18, 41, 49.3, 52.69, 50.35, 48.48, 45.25, 50.76, 48.94, 50.66, 45.49, 38.47, 35.19, 33.34, 33.59, 37.13, 34.27, 32.38, 32.7, 28.83, 28.99, 43.25, 47.36, 42.11, 52.57, 55.26, 48.44, 65.4, 68.23, 56.63, 56.55] },
      velocityScore: { '1D': -4.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$21B', pe: 145, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: 1.79, MEME: 4.72, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'RGTI', name: 'Rigetti Computing', easyScore: 2, avgWeight: 3.19, proScore: 2.13, coverage: 0.667,
      price: 21.36, weeklyPrices: [20.63, 20.98, 22.70, 20.64, 21.36], weeklyChange: 3.54, dayChange: 5.51, sortRank: 0, periodReturns: { '1M': 28.5, '6M': -4.9, '1Y': 93.1 },
      priceHistory: { '1D': [20.25, 19.91, 20.19, 20.35, 20.35, 20.68, 20.67, 20.58, 20.47, 20.5, 20.33, 20.43, 20.49, 20.67, 20.56, 20.68, 20.54, 20.58, 20.68, 20.81, 20.83, 20.95, 20.99, 21.36], '1W': [20.63, 20.98, 22.7, 20.64, 21.36], '1M': [16.62, 15.96, 16.88, 22.04, 26.42, 25.07, 24.62, 27.03, 25.54, 25.63, 24.09, 24.16, 20.68, 21.76, 19.69, 19.44, 20.63, 20.98, 22.7, 20.64, 21.36], '6M': [22.47, 24.51, 23.6, 24.72, 25.62, 21.76, 17.71, 17.59, 15.59, 16.48, 16.96, 16.99, 16.22, 15.88, 12.9, 13.84, 16.87, 18.25, 16.39, 18.27, 19.07, 15.96, 24.62, 24.09, 19.44, 21.36], '1Y': [11.06, 11.07, 13.75, 12.77, 16.08, 15.44, 14.12, 15.44, 16.65, 14.82, 16.23, 15.15, 19.21, 28.52, 31.18, 40.06, 43.92, 46.38, 38.84, 44.27, 33.77, 25.48, 22.8, 25.57, 28.11, 25.84, 23.76, 22.27, 25.38, 24.47, 24.99, 22.31, 18.21, 16.97, 16.18, 17.63, 17.76, 16.94, 15.67, 15.6, 14.04, 14.53, 19.11, 18.38, 16.08, 20.09, 18.42, 15.96, 24.62, 24.09, 19.44, 21.36] },
      velocityScore: { '1D': -1.4, '1W': -6.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 199, eps: -0.89, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.24, RKNG: 3.14 },
      tonyNote: 'Rigetti Computing is a quantum hardware company using superconducting qubit technology. It holds a position in Meme ETFs alongside IonQ and D-Wave as part of the quantum computing basket. Revenue is minimal, the technology is earlier-stage than IonQ, and the ETF allocation is speculative. The weight score is low; this is a high-risk, long-duration positioning.',
    },
    {
      ticker: 'GOOGL', name: 'GOOGL', easyScore: 2, avgWeight: 2.16, proScore: 1.44, coverage: 0.667,
      price: 368.03, weeklyPrices: [357.77, 359.68, 369.35, 373.25, 368.03], weeklyChange: 2.87, dayChange: 1.17, sortRank: 0, periodReturns: { '1M': -7.3, '6M': 24, '1Y': 120.9 },
      priceHistory: { '1D': [363.79, 359.41, 362.07, 362.68, 363.13, 364.04, 363.53, 364, 365.22, 365.5, 365.45, 366.45, 366.71, 366.47, 367.85, 367.64, 368.33, 367.84, 367.51, 368.47, 367.22, 367.62, 369.28, 368.03], '1W': [357.77, 359.68, 369.35, 373.25, 368.03], '1M': [396.94, 387.66, 388.91, 387.66, 382.97, 388.88, 388.83, 390.13, 380.34, 376.37, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 373.25, 368.03], '6M': [296.72, 314.09, 315.15, 328.57, 330, 333.26, 343.69, 324.32, 302.02, 310.9, 303.58, 307.04, 310.92, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 387.35, 387.66, 388.83, 358.99, 356.38, 368.03], '1Y': [166.64, 178.53, 176.79, 181.56, 190.1, 193.18, 189.13, 201.42, 203.9, 206.09, 212.91, 234.04, 251.61, 254.72, 246.54, 245.35, 236.57, 253.3, 259.92, 281.19, 278.83, 276.41, 289.45, 320.18, 321.27, 309.29, 307.16, 313.56, 314.34, 335.97, 322, 334.55, 339.71, 318.58, 303.33, 312.9, 303.13, 308.7, 307.69, 290.44, 287.56, 317.32, 337.12, 339.32, 349.94, 398.04, 402.62, 387.66, 388.83, 358.99, 356.38, 368.03] },
      velocityScore: { '1D': 1.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.5T', pe: 28.1, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { BUZZ: 1.59, MEME: false, RKNG: 2.72 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'RDW', name: 'Redwire', easyScore: 1, avgWeight: 5.87, proScore: 1.96, coverage: 0.333,
      price: 14.35, weeklyPrices: [17.09, 15.12, 14.83, 13.50, 14.35], weeklyChange: -16.03, dayChange: -0.07, sortRank: 0, periodReturns: { '1M': 2.8, '6M': 122.8, '1Y': -9.5 },
      priceHistory: { '1D': [14.36, 13.41, 13.56, 13.6, 13.72, 13.88, 13.79, 13.85, 13.68, 13.69, 13.63, 13.68, 13.77, 13.74, 13.7, 13.86, 13.77, 13.73, 13.64, 13.69, 13.65, 13.88, 14.06, 14.35], '1W': [17.09, 15.12, 14.83, 13.5, 14.35], '1M': [13.96, 13.91, 14.77, 15.35, 17.49, 22.04, 24, 25.9, 24.57, 20.68, 18.62, 21.43, 18.45, 18.57, 15.75, 14.87, 17.09, 15.12, 14.83, 13.5, 14.35], '6M': [6.44, 7.82, 9.03, 10.98, 11.71, 10.96, 10.88, 10.09, 8, 8.42, 8.95, 9.23, 10.13, 9.38, 7.71, 9.65, 9.81, 10.31, 9.04, 8.69, 11.56, 13.91, 24, 18.62, 14.87, 14.35], '1Y': [15.86, 16.12, 15.48, 17.73, 17.37, 16.07, 13.87, 8.99, 8.94, 9.1, 8.91, 8.39, 9.06, 7.95, 8.83, 10.73, 8.74, 7.97, 8, 7.87, 6.56, 5.41, 5.06, 5.51, 6.39, 7.29, 8, 7, 10.64, 10.14, 10.66, 14.2, 11.26, 9.38, 8.4, 8.62, 9.28, 9.46, 9.55, 9.05, 8.5, 9.61, 9.91, 11.93, 8.6, 9.64, 11.46, 13.91, 24, 18.62, 14.87, 14.35] },
      velocityScore: { '1D': 5.4, '1W': -1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3B', pe: null, revenueGrowth: 58, eps: -2.59, grossMargin: 13, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.87, RKNG: false },
      tonyNote: 'Redwire Corp is a space infrastructure company — solar arrays, structures, and manufacturing in orbit. It appears in Meme and speculative ETFs as a high-risk space economy play. Revenue is growing from a small base but the business is pre-profitability; the ETF weight is minimal and reflects thematic positioning rather than fundamental conviction.',
    },
    {
      ticker: 'QNT', name: 'QNT', easyScore: 1, avgWeight: 5.8, proScore: 1.93, coverage: 0.333,
      price: 69.8, weeklyPrices: [56.49, 55.26, 57.91, 55.43, 69.80], weeklyChange: 23.56, dayChange: 11.24, sortRank: 0, periodReturns: { '1M': 15.6, '6M': 15.6, '1Y': 15.6 },
      priceHistory: { '1D': [62.75, 62.56, 62.7, 65.34, 66.74, 65.9, 66.04, 65.37, 65.11, 64.95, 65.32, 66.21, 65.69, 65.39, 65.46, 65.69, 65.5, 65.58, 65.17, 65.21, 65.18, 65.57, 65.68, 69.8], '1W': [56.49, 55.26, 57.91, 55.43, 69.8], '1M': [60.38, 56.26, 58.4, 54.94, 51.4, 56.49, 55.26, 57.91, 55.43, 69.8], '6M': [60.38, 56.26, 58.4, 54.94, 51.4, 56.49, 55.26, 57.91, 55.43, 69.8], '1Y': [60.38, 56.26, 58.4, 54.94, 51.4, 56.49, 55.26, 57.91, 55.43, 69.8] },
      velocityScore: { '1D': 11.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2B', pe: null, revenueGrowth: -73, eps: -1.76, grossMargin: 74, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.8, RKNG: false },
      tonyNote: 'QNT appears in 1 of 3 Meme ETFs (33% coverage) with average weight 5.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VSH', name: 'VSH', easyScore: 1, avgWeight: 5.63, proScore: 1.88, coverage: 0.333,
      price: 64.9, weeklyPrices: [58.60, 59.38, 63.72, 60.41, 64.90], weeklyChange: 10.75, dayChange: 7.75, sortRank: 0, periodReturns: { '1M': 75.6, '6M': 345.4, '1Y': 325.9 },
      priceHistory: { '1D': [60.23, 64.96, 68.03, 68.19, 68.1, 68.22, 68.5, 67.55, 66.04, 65.81, 66.18, 64.61, 64.23, 64.82, 64.51, 64.26, 64.14, 64.24, 63.64, 63.72, 63.51, 63.63, 64.6, 64.9], '1W': [58.6, 59.38, 63.72, 60.41, 64.9], '1M': [36.95, 37.04, 40.16, 42.17, 47.25, 50.37, 48.9, 52.24, 52.05, 55.99, 63.97, 63.67, 57.2, 57.22, 58.58, 54.65, 58.6, 59.38, 63.72, 60.41, 64.9], '6M': [14.57, 15.02, 15.29, 16.19, 18.29, 18.03, 20.67, 19.48, 18.69, 19.61, 17.95, 17.31, 17.68, 17.46, 16.56, 18.98, 23.13, 26.91, 26.74, 32.09, 33.63, 37.04, 48.9, 63.97, 54.65, 64.9], '1Y': [15.24, 15.96, 16.64, 17.47, 17.45, 17, 15.98, 14.59, 14.84, 15.58, 15.46, 15.38, 15.11, 15.36, 15.03, 16.15, 14.66, 16.49, 16.84, 16.98, 14.37, 13.24, 11.82, 13.67, 15.2, 15.33, 14.87, 14.9, 16.56, 16, 17.86, 18.48, 20.74, 19.36, 19.4, 20.11, 17.78, 17.5, 17.49, 18.26, 18, 20.49, 23.76, 26.94, 27.8, 33.56, 38.5, 37.04, 48.9, 63.97, 54.65, 64.9] },
      velocityScore: { '1D': -1.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 6490, revenueGrowth: 17, eps: 0.01, grossMargin: 20, dividendYield: 0.66,
      etfPresence: { BUZZ: false, MEME: 5.63, RKNG: false },
      tonyNote: 'VSH appears in 1 of 3 Meme ETFs (33% coverage) with average weight 5.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 1, avgWeight: 5.35, proScore: 1.78, coverage: 0.333,
      price: 746.23, weeklyPrices: [529.29, 562.93, 653.53, 681.08, 746.23], weeklyChange: 40.99, dayChange: 4.79, sortRank: 0, periodReturns: { '1M': 62.7, '6M': 348.8, '1Y': 1158.6 },
      priceHistory: { '1D': [712.13, 790.36, 786.06, 783.76, 773.56, 770.57, 772.01, 774.04, 769.58, 762.15, 758.33, 753.26, 743.76, 751.17, 746.33, 744.85, 743.34, 741.61, 746.88, 745.57, 745.06, 751.68, 757, 746.23], '1W': [529.29, 562.93, 653.53, 681.08, 746.23], '1M': [458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 746.23], '6M': [166.26, 179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 313.81, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 594.11, 490.09, 746.23], '1Y': [59.29, 63.29, 65.22, 66.93, 68.74, 68.82, 76.55, 74.97, 75.06, 76.97, 80.34, 93.29, 102.39, 106.63, 106.88, 131.31, 115.42, 126.2, 129.43, 150.21, 162.96, 157.83, 140.23, 163.33, 168.89, 176.34, 181.08, 179.68, 219.38, 214, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 268.81, 304.9, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 455.8, 530.6, 594.11, 490.09, 746.23] },
      velocityScore: { '1D': 0, '1W': 13.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$257B', pe: 44.7, revenueGrowth: 46, eps: 16.69, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 5.35 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'QBTS', name: 'D-Wave Quantum', easyScore: 1, avgWeight: 4.96, proScore: 1.65, coverage: 0.333,
      price: 24.69, weeklyPrices: [23.82, 23.37, 26.26, 23.94, 24.69], weeklyChange: 3.65, dayChange: 7.72, sortRank: 0, periodReturns: { '1M': 29.5, '6M': 3.7, '1Y': 57.8 },
      priceHistory: { '1D': [22.92, 23.11, 23.28, 23.47, 23.45, 23.93, 23.98, 23.87, 23.86, 23.8, 23.59, 23.77, 23.83, 23.89, 23.84, 24.01, 23.92, 23.94, 24, 24.13, 24.19, 24.31, 24.39, 24.69], '1W': [23.82, 23.37, 26.26, 23.94, 24.69], '1M': [19.06, 18.19, 19.3, 25.74, 29.4, 27.82, 27.48, 29.49, 30.14, 29.18, 27.55, 27.64, 23.85, 25.83, 23.52, 23.25, 23.82, 23.37, 26.26, 23.94, 24.69], '6M': [23.8, 27.52, 28.13, 28.11, 28.83, 23.75, 20.97, 21.21, 18.44, 18.66, 18.24, 18.76, 17.47, 16.31, 12.98, 13.74, 16.97, 20.36, 18.11, 21.54, 22.35, 18.19, 27.48, 27.55, 23.25, 24.69], '1Y': [15.65, 14.02, 16.76, 15.83, 18.39, 18.87, 16.38, 16.9, 17.01, 15.54, 15.62, 15.42, 18.32, 26.88, 26.76, 32.7, 33.02, 38.33, 32.65, 37.06, 29.5, 23.61, 20.51, 22.67, 27, 26.1, 26.82, 26.15, 31.27, 28.82, 27.04, 24.69, 21.4, 20.44, 19.07, 19.65, 18.91, 18.91, 16.49, 15.93, 14.43, 14.57, 20.81, 21.24, 18.27, 23.83, 21.44, 18.19, 27.48, 27.55, 23.25, 24.69] },
      velocityScore: { '1D': -5.7, '1W': -5.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: -81, eps: -1.14, grossMargin: 66, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.96, RKNG: false },
      tonyNote: 'D-Wave Quantum is a quantum computing company — the only publicly traded business built around quantum annealing hardware. Revenue is minimal and profitability is many years away, but it holds a position in Meme ETFs as the purest-play quantum computing stock available to retail investors. The ETF weight is small and the position is purely thematic.',
    },
    {
      ticker: 'PL', name: 'PL', easyScore: 1, avgWeight: 4.67, proScore: 1.56, coverage: 0.333,
      price: 28.23, weeklyPrices: [34.17, 31.15, 30.58, 28.21, 28.23], weeklyChange: -17.38, dayChange: 0.04, sortRank: 0, periodReturns: { '1M': -32.2, '6M': 71.4, '1Y': 461.2 },
      priceHistory: { '1D': [28.22, 26.64, 26.94, 27.06, 26.98, 27.06, 27.2, 27.17, 27.09, 27.14, 27.03, 27.01, 26.91, 27.15, 27.27, 27.36, 27.27, 27.26, 27.43, 27.41, 27.32, 27.73, 27.74, 28.23], '1W': [34.17, 31.15, 30.58, 28.21, 28.23], '1M': [41.61, 41.59, 42.66, 42.48, 44.35, 48.32, 50.48, 51.4, 51.14, 46.46, 43.13, 43.53, 32.22, 32.74, 31.17, 30.72, 34.17, 31.15, 30.58, 28.21, 28.23], '6M': [16.47, 20.32, 20.41, 22.71, 28.78, 25.87, 22.85, 24.02, 22.21, 24.71, 25.3, 25.4, 27.08, 33.82, 27.89, 35.17, 33.93, 38.03, 35.03, 37.13, 40.68, 41.59, 50.48, 43.13, 30.72, 28.23], '1Y': [5.03, 6.07, 6.83, 6.2, 7.03, 6.65, 6.18, 6.4, 6.78, 6.8, 7.09, 9.66, 9.86, 11.11, 12.2, 15.31, 14.7, 13.11, 13.61, 13.45, 12.81, 11.4, 11.23, 11.9, 12.77, 18.24, 19.18, 19.87, 21.84, 25.32, 28, 28.07, 23.95, 22.79, 23.74, 24.63, 26, 25.44, 24.81, 31.83, 27.95, 36.55, 34.41, 39.47, 34.08, 39.69, 40.74, 41.59, 50.48, 43.13, 30.72, 28.23] },
      velocityScore: { '1D': -1.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: 42, eps: -1.16, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.67, RKNG: false },
      tonyNote: 'Planet Labs is a satellite earth observation company. It holds a speculative position in Industrials ETFs as a data infrastructure name — providing satellite imagery and analytics that support agricultural, energy, and government decision-making. Revenue is growing from a small base; the ETF weight is minimal and the position is thematic.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
