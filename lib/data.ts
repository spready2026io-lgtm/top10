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

// @@GENERATED:SPY_RET@@
export const SPY_RET: Record<Period, number> = { '1W': -1.3, '1M': -1.5, '6M': 5.7, '1Y': 21.1 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 7.9 }, { t: 'AMD', w: 4.4 }, { t: 'MRVL', w: 4.3 }, { t: 'VRT', w: 3.6 }, { t: 'SIMO', w: 3.5 }],
  ARTY: [{ t: 'MRVL', w: 8.7 }, { t: 'MU', w: 7.3 }, { t: 'AMD', w: 7.1 }, { t: 'ORCL', w: 4.2 }, { t: 'CRWV', w: 4.1 }],
  BAI: [{ t: 'MU', w: 5.8 }, { t: 'AMD', w: 4.6 }, { t: 'NVDA', w: 4.5 }, { t: 'AVGO', w: 4.5 }, { t: 'TSM', w: 4.4 }],
  IVEP: [{ t: 'BE', w: 4.5 }, { t: 'PWR', w: 4.2 }, { t: 'SBGSY', w: 4.0 }, { t: 'AMT', w: 4.0 }, { t: 'EQIX', w: 4.0 }],
  IGPT: [{ t: 'MU', w: 12.0 }, { t: 'AMD', w: 7.0 }, { t: 'INTC', w: 6.9 }, { t: 'GOOGL', w: 6.4 }, { t: 'NVDA', w: 6.0 }],
  IVES: [{ t: 'MU', w: 5.7 }, { t: 'TSM', w: 5.0 }, { t: 'AAPL', w: 4.8 }, { t: 'NVDA', w: 4.8 }, { t: 'MSFT', w: 4.8 }],
  ALAI: [{ t: 'NVDA', w: 13.4 }, { t: 'AMZN', w: 5.9 }, { t: 'TSM', w: 5.6 }, { t: 'MSFT', w: 5.5 }, { t: 'GOOG', w: 5.2 }],
  CHAT: [{ t: 'NVDA', w: 7.0 }, { t: 'GOOGL', w: 5.7 }, { t: 'AVGO', w: 4.3 }, { t: 'AMD', w: 3.8 }, { t: 'MU', w: 3.7 }],
  AIFD: [{ t: 'NVDA', w: 6.6 }, { t: 'MRVL', w: 6.4 }, { t: 'MU', w: 6.2 }, { t: 'DOCN', w: 5.8 }, { t: 'LITE', w: 5.7 }],
  SPRX: [{ t: 'COHR', w: 8.3 }, { t: 'ALAB', w: 7.6 }, { t: 'ARM', w: 7.3 }, { t: 'NET', w: 7.0 }, { t: 'KLAC', w: 6.8 }],
  AOTG: [{ t: 'AMD', w: 15.1 }, { t: 'NVDA', w: 11.0 }, { t: 'MU', w: 9.8 }, { t: 'TSM', w: 7.4 }, { t: 'APP', w: 4.8 }],
  SOXX: [{ t: 'MU', w: 11.2 }, { t: 'AMD', w: 8.7 }, { t: 'MRVL', w: 8.0 }, { t: 'INTC', w: 6.1 }, { t: 'AVGO', w: 6.0 }],
  PSI: [{ t: 'AMAT', w: 6.0 }, { t: 'KLAC', w: 5.8 }, { t: 'LRCX', w: 5.4 }, { t: 'MU', w: 5.4 }, { t: 'ADI', w: 5.1 }],
  XSD: [{ t: 'MXL', w: 5.3 }, { t: 'MRVL', w: 4.6 }, { t: 'ALAB', w: 4.3 }, { t: 'INTC', w: 3.7 }, { t: 'AMD', w: 3.6 }],
  DRAM: [{ t: 'SNDK', w: 5.4 }, { t: 'STX', w: 4.2 }, { t: 'MU', w: 3.9 }, { t: 'WDC', w: 3.7 }],
  PTF: [{ t: 'SNDK', w: 8.0 }, { t: 'MU', w: 4.7 }, { t: 'STX', w: 4.7 }, { t: 'WDC', w: 4.6 }, { t: 'AAPL', w: 4.5 }],
  WCLD: [{ t: 'DOCN', w: 3.6 }, { t: 'FROG', w: 3.0 }, { t: 'DDOG', w: 2.7 }, { t: 'TWLO', w: 2.5 }, { t: 'PANW', w: 2.4 }],
  IGV: [{ t: 'ORCL', w: 9.9 }, { t: 'PANW', w: 7.9 }, { t: 'MSFT', w: 7.8 }, { t: 'PLTR', w: 6.9 }, { t: 'CRWD', w: 6.1 }],
  FDTX: [{ t: 'MU', w: 9.4 }, { t: 'MRVL', w: 8.1 }, { t: 'TSM', w: 6.0 }, { t: 'NVDA', w: 4.6 }, { t: 'STX', w: 4.0 }],
  GTEK: [{ t: 'MRVL', w: 4.4 }, { t: 'DELL', w: 2.9 }, { t: 'CDNS', w: 2.6 }, { t: 'APH', w: 2.3 }, { t: 'NET', w: 2.1 }],
  ARKK: [{ t: 'TSLA', w: 10.2 }, { t: 'TEM', w: 5.3 }, { t: 'HOOD', w: 4.9 }, { t: 'CRSP', w: 4.9 }, { t: 'AMD', w: 4.6 }],
  MARS: [{ t: 'RKLB', w: 13.8 }, { t: 'ASTS', w: 9.0 }, { t: 'SATS', w: 8.5 }, { t: 'GSAT', w: 4.9 }, { t: 'PL', w: 4.6 }],
  FRWD: [{ t: 'STX', w: 9.0 }, { t: 'NVDA', w: 8.3 }, { t: 'AMD', w: 7.5 }, { t: 'TSM', w: 6.0 }, { t: 'LRCX', w: 5.8 }],
  BCTK: [{ t: 'TSM', w: 8.6 }, { t: 'AVGO', w: 7.4 }, { t: 'NVDA', w: 6.6 }, { t: 'LRCX', w: 6.5 }, { t: 'GOOG', w: 6.0 }],
  FWD: [{ t: 'AVGO', w: 2.5 }, { t: 'GOOGL', w: 2.1 }, { t: 'NVDA', w: 2.0 }, { t: 'AMD', w: 2.0 }, { t: 'CAT', w: 1.9 }],
  CBSE: [{ t: 'SCI', w: 3.3 }, { t: 'SBUX', w: 3.2 }, { t: 'ROL', w: 3.1 }, { t: 'SNOW', w: 2.9 }, { t: 'KLAC', w: 2.8 }],
  FCUS: [{ t: 'INTC', w: 4.5 }, { t: 'DELL', w: 4.4 }, { t: 'SITM', w: 4.3 }, { t: 'STX', w: 4.2 }, { t: 'SNDK', w: 4.2 }],
  WGMI: [{ t: 'CIFR', w: 16.4 }, { t: 'IREN', w: 13.0 }, { t: 'WULF', w: 9.5 }, { t: 'CORZ', w: 7.5 }, { t: 'KEEL', w: 7.2 }],
  POW: [{ t: 'POWL', w: 6.2 }, { t: 'VICR', w: 5.1 }, { t: 'PWR', w: 4.6 }, { t: 'PRY', w: 4.3 }, { t: 'ETN', w: 4.0 }],
  VOLT: [{ t: 'BELFB', w: 7.8 }, { t: 'POWL', w: 7.4 }, { t: 'PWR', w: 5.3 }, { t: 'ETN', w: 5.3 }, { t: 'AEP', w: 4.4 }],
  PBD: [{ t: 'SEDG', w: 1.1 }, { t: 'FSLR', w: 1.1 }],
  PBW: [{ t: 'HYLN', w: 4.6 }, { t: 'FCEL', w: 3.0 }, { t: 'NVTS', w: 2.8 }, { t: 'BLDP', w: 2.1 }, { t: 'ASPN', w: 2.1 }],
  AIRR: [{ t: 'STRL', w: 6.0 }, { t: 'CHRW', w: 4.3 }, { t: 'SAIA', w: 4.2 }, { t: 'FIX', w: 4.2 }, { t: 'EME', w: 3.8 }],
  PRN: [{ t: 'TTMI', w: 5.9 }, { t: 'FIX', w: 4.7 }, { t: 'STRL', w: 4.3 }, { t: 'JBL', w: 4.2 }, { t: 'AGX', w: 4.1 }],
  RSHO: [{ t: 'TKR', w: 9.1 }, { t: 'POWL', w: 7.8 }, { t: 'CGNX', w: 7.0 }, { t: 'CAT', w: 6.8 }, { t: 'ETN', w: 5.6 }],
  IDEF: [{ t: 'RTX', w: 7.9 }, { t: 'LMT', w: 7.1 }, { t: 'GD', w: 5.8 }, { t: 'NOC', w: 5.1 }, { t: 'BA', w: 4.9 }],
  BILT: [{ t: 'UNP', w: 5.7 }, { t: 'AEP', w: 4.3 }, { t: 'AENA', w: 4.1 }, { t: 'LNG', w: 3.7 }, { t: 'XEL', w: 3.6 }],
  BUZZ: [{ t: 'SMCI', w: 4.0 }, { t: 'MU', w: 3.6 }, { t: 'NOW', w: 3.6 }, { t: 'ASTS', w: 3.3 }, { t: 'AMD', w: 3.3 }],
  MEME: [{ t: 'SPCE', w: 8.0 }, { t: 'AAOI', w: 6.0 }, { t: 'BE', w: 5.9 }, { t: 'RDW', w: 5.8 }, { t: 'SNDK', w: 5.6 }],
  RKNG: [{ t: 'NVTS', w: 6.2 }, { t: 'SNDK', w: 5.9 }, { t: 'MU', w: 5.1 }, { t: 'NBIS', w: 5.0 }, { t: 'WDC', w: 4.6 }],
};
// @@END_GENERATED:ETF_TOP_HOLDINGS@@

// @@GENERATED:TOP10_RET@@
// Top10 composite returns per theme per period (average of all ETFs in theme)
const TOP10_RET: Record<Theme, Record<Period, number>> = {
  'AI & ML':         { '1W': -2.6, '1M': -0.7, '6M': 30.4, '1Y': 72 },
  'Semiconductors':  { '1W': 4.8, '1M': 3.4, '6M': 86.5, '1Y': 143.3 },
  'Broad Tech':      { '1W': -4.3, '1M': -1.6, '6M': 18.1, '1Y': 47.1 },
  'Electrification': { '1W': -4.7, '1M': -10.3, '6M': 25.8, '1Y': 62.8 },
  'Industrials':     { '1W': -0.7, '1M': -3.2, '6M': 18.2, '1Y': 39.6 },
  'Meme':            { '1W': -2.7, '1M': -6, '6M': 12.5, '1Y': 8.4 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, Record<Period, ChartPeriodData>> = {
  'AI & ML': {
    '1W': { top10: [100, 100.85, 99.68, 96.86, 97.38], spy: [100, 100.23, 99.93, 98.36, 98.73], top10Return: -2.6, spyReturn: -1.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 97.61, 99.91, 100.89, 97.63, 95.14, 97.52, 100.06, 101.11, 104.11, 104.69, 106.39, 107.15, 109.93, 112.14, 109.77, 102.09, 102.87, 101.71, 98.84, 99.33], spy: [100, 99.85, 100.41, 101.2, 99.98, 99.25, 100.26, 100.46, 100.86, 101.53, 101.51, 102.07, 102.32, 102.6, 102.74, 102.41, 99.76, 99.99, 99.7, 98.12, 98.5], top10Return: -0.7, spyReturn: -1.5, xLabels: ["May 14", "May 21", "May 28", "Jun 4", "Jun 11"] },
    '6M': { top10: [100, 93.96, 98.4, 99.27, 101.32, 99.39, 103.42, 100.94, 100.6, 100.03, 102.33, 99.03, 99.99, 100.38, 98.51, 93.88, 101.71, 109.64, 115.4, 115.12, 125.62, 130.59, 127.77, 138.85, 143.84, 130.44], spy: [100, 98.16, 100.17, 99.79, 100.87, 98.32, 100.92, 100.05, 100.43, 99.58, 100.58, 99.41, 98.14, 97.33, 94.78, 94.37, 98.09, 101.56, 103.2, 103.25, 106.48, 107.71, 107.56, 109.49, 109.86, 105.66], top10Return: 30.4, spyReturn: 5.7, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 100.78, 105.3, 106.62, 105.72, 109.33, 110.95, 112.67, 113.28, 114.55, 110.14, 116.24, 115.39, 121.78, 126.7, 124.31, 128.76, 128.53, 129.71, 133.52, 136.66, 131.57, 126.8, 119.72, 128.91, 131.66, 128.23, 127.83, 129.73, 133.65, 134.82, 132.93, 137.89, 133.25, 133.76, 132.82, 135.92, 130.78, 132.7, 132.44, 131.25, 127.5, 137.32, 148.81, 154.57, 155.2, 170.84, 177.99, 173.93, 191.08, 198.56, 179.09], spy: [100, 99.35, 101.75, 103.99, 103.7, 104.36, 105.94, 105.11, 105.14, 107.25, 105.69, 107.91, 107.63, 109.32, 110.37, 110.05, 111.28, 108.59, 110.48, 112.62, 113.05, 111.47, 111.75, 108.51, 113.64, 114.02, 113.37, 113.18, 114.38, 115.04, 115.37, 113.97, 115.65, 114.66, 115.09, 114.12, 115.26, 113.93, 112.47, 109.99, 109.22, 108.96, 113.06, 116.68, 117.81, 118.33, 122.03, 123.44, 123.26, 125.48, 125.9, 121.09], top10Return: 72, spyReturn: 21.1, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Semiconductors': {
    '1W': { top10: [100, 105.96, 104.3, 100.79, 104.74], spy: [100, 100.23, 99.93, 98.36, 98.73], top10Return: 4.8, spyReturn: -1.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 95.36, 98.39, 98.32, 94.67, 92.09, 96.15, 98.46, 100.04, 107.56, 106.66, 107.88, 106.9, 108.41, 113.65, 111.95, 98.7, 104.61, 102.95, 99.47, 103.36], spy: [100, 99.85, 100.41, 101.2, 99.98, 99.25, 100.26, 100.46, 100.86, 101.53, 101.51, 102.07, 102.32, 102.6, 102.74, 102.41, 99.76, 99.99, 99.7, 98.12, 98.5], top10Return: 3.4, spyReturn: -1.5, xLabels: ["May 14", "May 21", "May 28", "Jun 4", "Jun 11"] },
    '6M': { top10: [100, 95.92, 101.34, 105.14, 109.05, 111.54, 113.01, 114.18, 117.15, 117.87, 122.18, 118.78, 123.73, 127.19, 127.35, 126.3, 131.54, 140.75, 150.78, 162.34, 178.24, 189.38, 189.37, 188.38, 196.59, 186.45], spy: [100, 98.16, 100.17, 99.79, 100.87, 98.32, 100.92, 100.05, 100.43, 99.58, 100.58, 99.41, 98.14, 97.33, 94.78, 94.37, 98.09, 101.56, 103.2, 103.25, 106.48, 107.71, 107.56, 109.49, 109.86, 105.66], top10Return: 86.5, spyReturn: 5.7, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 100.19, 105.83, 108.31, 108.63, 109.68, 107.15, 106.52, 107.16, 113.23, 108.64, 115.16, 113.43, 117.89, 124.03, 123.68, 128.65, 123.35, 132.28, 135.23, 138, 134.4, 128.88, 119.18, 132.82, 139.78, 135.77, 135.63, 136.6, 148.11, 149.55, 156.68, 155.32, 153.51, 159.42, 160.57, 165.41, 153.52, 152.26, 150.85, 156.52, 152.31, 169.57, 183.33, 201.22, 205.57, 232.31, 244.22, 241.25, 263.1, 271.66, 252.33], spy: [100, 99.35, 101.75, 103.99, 103.7, 104.36, 105.94, 105.11, 105.14, 107.25, 105.69, 107.91, 107.63, 109.32, 110.37, 110.05, 111.28, 108.59, 110.48, 112.62, 113.05, 111.47, 111.75, 108.51, 113.64, 114.02, 113.37, 113.18, 114.38, 115.04, 115.37, 113.97, 115.65, 114.66, 115.09, 114.12, 115.26, 113.93, 112.47, 109.99, 109.22, 108.96, 113.06, 116.68, 117.81, 118.33, 122.03, 123.44, 123.26, 125.48, 125.9, 121.09], top10Return: 143.3, spyReturn: 21.1, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Broad Tech': {
    '1W': { top10: [100, 99.08, 97.91, 95.95, 95.72], spy: [100, 100.23, 99.93, 98.36, 98.73], top10Return: -4.3, spyReturn: -1.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.06, 98.91, 100.35, 97.87, 96.77, 98.08, 99.87, 101.46, 104.1, 105.08, 106.77, 107.44, 109.5, 110.65, 108.67, 103.01, 101.91, 100.78, 98.77, 98.44], spy: [100, 99.85, 100.41, 101.2, 99.98, 99.25, 100.26, 100.46, 100.86, 101.53, 101.51, 102.07, 102.32, 102.6, 102.74, 102.41, 99.76, 99.99, 99.7, 98.12, 98.5], top10Return: -1.6, spyReturn: -1.5, xLabels: ["May 14", "May 21", "May 28", "Jun 4", "Jun 11"] },
    '6M': { top10: [100, 95.16, 97.81, 99.35, 100.8, 100.15, 101.54, 97.24, 97.95, 97.73, 99.78, 99.24, 98.19, 97.38, 95.9, 93.69, 99.1, 106.11, 111.17, 109.52, 119.04, 121.22, 118.19, 126.01, 129.31, 118.1], spy: [100, 98.16, 100.17, 99.79, 100.87, 98.32, 100.92, 100.05, 100.43, 99.58, 100.58, 99.41, 98.14, 97.33, 94.78, 94.37, 98.09, 101.56, 103.2, 103.25, 106.48, 107.71, 107.56, 109.49, 109.86, 105.66], top10Return: 18.1, spyReturn: 5.7, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 99.52, 103.57, 106.57, 104.6, 108.78, 109.07, 107.59, 106.46, 107.91, 105.51, 110.06, 109.12, 114.1, 120.4, 118.76, 124.31, 125.61, 127.34, 130.16, 128.94, 126.77, 119.09, 112.96, 122.76, 123.24, 120.52, 119.63, 118.86, 124.09, 126.17, 125.23, 128.78, 122.7, 123.79, 123.76, 126.33, 125.14, 123.67, 124.14, 124.53, 121.88, 129.09, 135.94, 139.22, 135.64, 149.33, 149.53, 146.89, 157.8, 160.14, 147.11], spy: [100, 99.35, 101.75, 103.99, 103.7, 104.36, 105.94, 105.11, 105.14, 107.25, 105.69, 107.91, 107.63, 109.32, 110.37, 110.05, 111.28, 108.59, 110.48, 112.62, 113.05, 111.47, 111.75, 108.51, 113.64, 114.02, 113.37, 113.18, 114.38, 115.04, 115.37, 113.97, 115.65, 114.66, 115.09, 114.12, 115.26, 113.93, 112.47, 109.99, 109.22, 108.96, 113.06, 116.68, 117.81, 118.33, 122.03, 123.44, 123.26, 125.48, 125.9, 121.09], top10Return: 47.1, spyReturn: 21.1, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Electrification': {
    '1W': { top10: [100, 98.36, 97.38, 94.91, 95.36], spy: [100, 100.23, 99.93, 98.36, 98.73], top10Return: -4.7, spyReturn: -1.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 97.41, 98.21, 98.17, 95.58, 91, 92.17, 94.84, 97.17, 99.33, 99.83, 100.1, 99.06, 98.96, 100.71, 99.78, 94.03, 92.52, 91.55, 89.21, 89.65], spy: [100, 99.85, 100.41, 101.2, 99.98, 99.25, 100.26, 100.46, 100.86, 101.53, 101.51, 102.07, 102.32, 102.6, 102.74, 102.41, 99.76, 99.99, 99.7, 98.12, 98.5], top10Return: -10.3, spyReturn: -1.5, xLabels: ["May 14", "May 21", "May 28", "Jun 4", "Jun 11"] },
    '6M': { top10: [100, 95.07, 97.92, 100.03, 102.12, 104.91, 108.54, 108.26, 111.4, 112.09, 115.76, 110.12, 110.06, 110.87, 110.83, 108.32, 113.72, 121, 124.94, 127.57, 137.87, 137.76, 129.22, 140.43, 139.64, 125.76], spy: [100, 98.16, 100.17, 99.79, 100.87, 98.32, 100.92, 100.05, 100.43, 99.58, 100.58, 99.41, 98.14, 97.33, 94.78, 94.37, 98.09, 101.56, 103.2, 103.25, 106.48, 107.71, 107.56, 109.49, 109.86, 105.66], top10Return: 25.8, spyReturn: 5.7, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 99.39, 101.91, 105.62, 105.46, 109.33, 111.14, 108.19, 109.45, 111.29, 111.4, 114.46, 112.95, 113.99, 119.24, 120.85, 126.89, 127.05, 131.34, 133.9, 132.8, 132.79, 129.85, 124.65, 133.63, 133.94, 133.34, 134.21, 132.5, 135.8, 139.84, 142.24, 145.81, 144.59, 144.95, 145.53, 148.83, 145.64, 146.25, 145.7, 150.13, 148.96, 156.26, 163.89, 169.18, 166.62, 172.98, 176.51, 170.36, 182.16, 179.08, 162.75], spy: [100, 99.35, 101.75, 103.99, 103.7, 104.36, 105.94, 105.11, 105.14, 107.25, 105.69, 107.91, 107.63, 109.32, 110.37, 110.05, 111.28, 108.59, 110.48, 112.62, 113.05, 111.47, 111.75, 108.51, 113.64, 114.02, 113.37, 113.18, 114.38, 115.04, 115.37, 113.97, 115.65, 114.66, 115.09, 114.12, 115.26, 113.93, 112.47, 109.99, 109.22, 108.96, 113.06, 116.68, 117.81, 118.33, 122.03, 123.44, 123.26, 125.48, 125.9, 121.09], top10Return: 62.8, spyReturn: 21.1, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Industrials': {
    '1W': { top10: [100, 100.44, 100.21, 97.64, 99.27], spy: [100, 100.23, 99.93, 98.36, 98.73], top10Return: -0.7, spyReturn: -1.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.14, 99.16, 99.83, 97.2, 94.67, 96.54, 96.67, 97.58, 100.04, 100.07, 100.54, 99.89, 98.41, 99.69, 100.31, 97.54, 97.97, 97.73, 95.25, 96.83], spy: [100, 99.85, 100.41, 101.2, 99.98, 99.25, 100.26, 100.46, 100.86, 101.53, 101.51, 102.07, 102.32, 102.6, 102.74, 102.41, 99.76, 99.99, 99.7, 98.12, 98.5], top10Return: -3.2, spyReturn: -1.5, xLabels: ["May 14", "May 21", "May 28", "Jun 4", "Jun 11"] },
    '6M': { top10: [100, 96.9, 99.61, 102.11, 105.59, 107.32, 108.85, 109.92, 113.32, 115.3, 116.44, 115.14, 111.22, 110.69, 109.67, 107.93, 115.13, 116.29, 117.08, 115.23, 123.38, 121.29, 117.76, 122.88, 122.61, 118.2], spy: [100, 98.16, 100.17, 99.79, 100.87, 98.32, 100.92, 100.05, 100.43, 99.58, 100.58, 99.41, 98.14, 97.33, 94.78, 94.37, 98.09, 101.56, 103.2, 103.25, 106.48, 107.71, 107.56, 109.49, 109.86, 105.66], top10Return: 18.2, spyReturn: 5.7, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 99.87, 102.38, 104.81, 105.05, 106.58, 108.33, 107.41, 107.46, 108.84, 107.49, 110.62, 109.51, 111.41, 112.95, 112.76, 115.17, 112.86, 113.88, 117.61, 117.02, 114.33, 111.51, 107.91, 113.73, 114.32, 115.57, 115.93, 116.95, 122.33, 125.81, 129.27, 130.22, 131.34, 134.87, 136.06, 136.65, 135.2, 130.27, 128.42, 131.28, 130.36, 136.69, 136.12, 139.5, 135.97, 145.6, 142.85, 139.21, 144.88, 145.07, 139.56], spy: [100, 99.35, 101.75, 103.99, 103.7, 104.36, 105.94, 105.11, 105.14, 107.25, 105.69, 107.91, 107.63, 109.32, 110.37, 110.05, 111.28, 108.59, 110.48, 112.62, 113.05, 111.47, 111.75, 108.51, 113.64, 114.02, 113.37, 113.18, 114.38, 115.04, 115.37, 113.97, 115.65, 114.66, 115.09, 114.12, 115.26, 113.93, 112.47, 109.99, 109.22, 108.96, 113.06, 116.68, 117.81, 118.33, 122.03, 123.44, 123.26, 125.48, 125.9, 121.09], top10Return: 39.6, spyReturn: 21.1, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Meme': {
    '1W': { top10: [100, 102.56, 98.91, 96.19, 97.24], spy: [100, 100.23, 99.93, 98.36, 98.73], top10Return: -2.7, spyReturn: -1.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 97.1, 99.24, 100.19, 96.27, 90.98, 94.48, 100.15, 102.51, 105.94, 107.52, 109.49, 108.03, 108.22, 110.89, 107.59, 96.6, 99.08, 95.55, 92.92, 93.93], spy: [100, 99.85, 100.41, 101.2, 99.98, 99.25, 100.26, 100.46, 100.86, 101.53, 101.51, 102.07, 102.32, 102.6, 102.74, 102.41, 99.76, 99.99, 99.7, 98.12, 98.5], top10Return: -6, spyReturn: -1.5, xLabels: ["May 14", "May 21", "May 28", "Jun 4", "Jun 11"] },
    '6M': { top10: [100, 91.82, 92.02, 95.34, 97.34, 97.91, 97.82, 91.51, 88.93, 86.93, 88.65, 88.16, 85.36, 87.88, 87.79, 86.61, 93.53, 101.76, 107.38, 102.86, 116.53, 115.71, 117.33, 131.71, 125.03, 112.49], spy: [100, 98.16, 100.17, 99.79, 100.87, 98.32, 100.92, 100.05, 100.43, 99.58, 100.58, 99.41, 98.14, 97.33, 94.78, 94.37, 98.09, 101.56, 103.2, 103.25, 106.48, 107.71, 107.56, 109.49, 109.86, 105.66], top10Return: 12.5, spyReturn: 5.7, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.16, 101.34, 96.07, 97.07, 93.74, 94.18, 92.84, 86.23, 86.85, 86.23, 87.41, 90.04, 90.75, 89.62, 88.32, 92.01, 91.46, 94.17, 96.45, 96.92, 93.99, 91.87, 87.18, 86.73, 88.74, 88.37, 87.62, 89.09, 92.84, 93.26, 93.65, 94.24, 94.19, 92.74, 88.76, 90.14, 93, 98.5, 99.69, 100.43, 98.11, 94.79, 103.43, 108.97, 112.6, 113.92, 119.38, 122.13, 121.72, 115.57, 108.42], spy: [100, 99.35, 101.75, 103.99, 103.7, 104.36, 105.94, 105.11, 105.14, 107.25, 105.69, 107.91, 107.63, 109.32, 110.37, 110.05, 111.28, 108.59, 110.48, 112.62, 113.05, 111.47, 111.75, 108.51, 113.64, 114.02, 113.37, 113.18, 114.38, 115.04, 115.37, 113.97, 115.65, 114.66, 115.09, 114.12, 115.26, 113.93, 112.47, 109.99, 109.22, 108.96, 113.06, 116.68, 117.81, 118.33, 122.03, 123.44, 123.26, 125.48, 125.9, 121.09], top10Return: 8.4, spyReturn: 21.1, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
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
export const SCAN_TIMESTAMP    = '2026-06-11T13:36:40.943Z';
export const SCAN_TIMESTAMP_NY = 'June 11, 2026 at 9:36 AM ET';
// @@END_GENERATED:SCAN_TIMESTAMP@@

// Number of ETFs per theme — denominator for Coverage Score display (x/n badge)
// @@GENERATED:THEME_ETF_COUNT@@
export const THEME_ETF_COUNT: Record<Theme, number> = {
  'AI & ML':         11,
  'Semiconductors':  4,
  'Broad Tech':      13,
  'Electrification': 4,
  'Industrials':     5,
  'Meme':            3,
};
// @@END_GENERATED:THEME_ETF_COUNT@@

export const THEME_ETFS: Record<Theme, string[]> = {
  'AI & ML':        ['AIS', 'ARTY', 'BAI', 'IVEP', 'IGPT', 'IVES', 'ALAI', 'CHAT', 'AIFD', 'SPRX', 'AOTG'],
  'Semiconductors': ['SOXX', 'PSI', 'XSD', 'DRAM'],
  'Broad Tech':     ['PTF', 'WCLD', 'IGV', 'FDTX', 'GTEK', 'ARKK', 'MARS', 'FRWD', 'BCTK', 'FWD', 'CBSE', 'FCUS', 'WGMI'],
  'Electrification':['POW', 'VOLT', 'PBD', 'PBW'],
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
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 13.56, bestProScore: 6.01, avgProScore: 4.52, price: 904.56, weeklyChange: 4.69 },
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 11.25, bestProScore: 5.77, avgProScore: 3.75, price: 202.03, weeklyChange: -1.50 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 10.30, bestProScore: 4.38, avgProScore: 3.43, price: 466.12, weeklyChange: -0.06 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 5.78, bestProScore: 2.58, avgProScore: 1.93, price: 374.98, weeklyChange: -2.79 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 5.92, bestProScore: 3.86, avgProScore: 2.96, price: 278.00, weeklyChange: -2.41 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 5.62, bestProScore: 3.15, avgProScore: 2.81, price: 263.10, weeklyChange: -0.14 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.89, bestProScore: 3.61, avgProScore: 2.44, price: 115.62, weeklyChange: 16.59 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.35, bestProScore: 2.64, avgProScore: 2.17, price: 414.15, weeklyChange: -0.24 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.55, bestProScore: 2.25, avgProScore: 1.77, price: 338.85, weeklyChange: 11.73 },
  { ticker: 'ALAB', name: `Astera Labs Inc`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 3.07, bestProScore: 1.69, avgProScore: 1.53, price: 351.01, weeklyChange: 10.71 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': 2.1, '1M': 1.9, '6M': 88.7, '1Y': 174.7 },
  ARTY: { '1W': -1.6, '1M': 0.3, '6M': 39.6, '1Y': 80.8 },
  BAI:  { '1W': 2.2, '1M': -3.7, '6M': 30.5, '1Y': 72.6 },
  IVEP: { '1W': -3.4, '1M': -9.1, '6M': 0.8, '1Y': 0.8 },
  IGPT: { '1W': -9.7, '1M': -2.6, '6M': 51, '1Y': 92.9 },
  IVES: { '1W': -4.2, '1M': -2, '6M': 8.7, '1Y': 38.1 },
  ALAI: { '1W': -3.3, '1M': -1.8, '6M': 11.3, '1Y': 42.4 },
  CHAT: { '1W': -1.9, '1M': 2.4, '6M': 42.9, '1Y': 96.4 },
  AIFD: { '1W': -1.4, '1M': 0.9, '6M': 32.9, '1Y': 77.7 },
  SPRX: { '1W': 0.9, '1M': 8.3, '6M': 24.3, '1Y': 89.5 },
  AOTG: { '1W': -8.5, '1M': -2, '6M': 4.1, '1Y': 25.7 },
  // Semiconductors
  SOXX: { '1W': 4.1, '1M': 5.5, '6M': 78.6, '1Y': 148 },
  PSI:  { '1W': 6.9, '1M': -0.7, '6M': 84.5, '1Y': 175.1 },
  XSD:  { '1W': 0.5, '1M': -0.2, '6M': 66.7, '1Y': 133.9 },
  DRAM: { '1W': 7.5, '1M': 8.9, '6M': 116, '1Y': 116 },
  // Broad Tech
  PTF:  { '1W': -0.4, '1M': -3.6, '6M': 45.7, '1Y': 82.8 },
  WCLD: { '1W': -6, '1M': 4.5, '6M': -16.2, '1Y': -15.6 },
  IGV:  { '1W': -6.4, '1M': -1, '6M': -18.2, '1Y': -15.2 },
  FDTX: { '1W': -2.4, '1M': 3.4, '6M': 25.6, '1Y': 40.7 },
  GTEK: { '1W': -8.9, '1M': 0.3, '6M': 36.4, '1Y': 61.4 },
  ARKK: { '1W': -1.7, '1M': -8.5, '6M': -10.8, '1Y': 15.2 },
  MARS: { '1W': -1.5, '1M': -4.9, '6M': 36.8, '1Y': 36.8 },
  FRWD: { '1W': -8.5, '1M': -0.9, '6M': 22.4, '1Y': 22.4 },
  BCTK: { '1W': -8.5, '1M': -1.2, '6M': 17.4, '1Y': 17.4 },
  FWD:  { '1W': -0.3, '1M': -1.3, '6M': 24.6, '1Y': 59.8 },
  CBSE: { '1W': -8.4, '1M': -3.7, '6M': 15.1, '1Y': 34.3 },
  FCUS: { '1W': 0.3, '1M': -5.6, '6M': 27.3, '1Y': 73.2 },
  WGMI: { '1W': -2.9, '1M': 2.3, '6M': 29.1, '1Y': 199.1 },
  // Electrification
  POW:  { '1W': -7.2, '1M': -14.4, '6M': 40.4, '1Y': 41.4 },
  VOLT: { '1W': -0.8, '1M': -7.8, '6M': 26.7, '1Y': 56.2 },
  PBD:  { '1W': -4.7, '1M': -10.6, '6M': 20.2, '1Y': 59.5 },
  PBW:  { '1W': -5.9, '1M': -8.6, '6M': 15.7, '1Y': 93.9 },
  // Industrials
  AIRR: { '1W': -1.9, '1M': -3.8, '6M': 21.5, '1Y': 59.5 },
  PRN:  { '1W': -0.7, '1M': -4.5, '6M': 28.6, '1Y': 53.9 },
  RSHO: { '1W': -0.6, '1M': -2.8, '6M': 24, '1Y': 49.2 },
  IDEF: { '1W': -0.5, '1M': -4.6, '6M': 4.3, '1Y': 19.5 },
  BILT: { '1W': 0, '1M': -0.1, '6M': 12.7, '1Y': 15.7 },
  // Meme
  BUZZ: { '1W': -3.5, '1M': -5.4, '6M': 2.4, '1Y': 26.2 },
  MEME: { '1W': -2.1, '1M': -6, '6M': 34.1, '1Y': -1.9 },
  RKNG: { '1W': -2.6, '1M': -6.7, '6M': 1, '1Y': 1 },
};
// @@END_GENERATED:ETF_RETURNS@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 6.34, proScore: 5.77, coverage: 0.909,
      price: 202.03, weeklyPrices: [205.10, 208.64, 208.19, 200.42, 202.03], weeklyChange: -1.5, sortRank: 0, periodReturns: { '1M': -7.9, '6M': 11.7, '1Y': 41.4 },
      priceHistory: { '1W': [205.1, 208.64, 208.19, 200.42, 202.03], '1M': [219.44, 220.78, 225.83, 235.74, 225.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 218.66, 205.1, 208.64, 208.19, 200.42, 202.03], '6M': [180.93, 174.14, 190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 186.03, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 214.25, 218.66, 202.03], '1Y': [142.83, 145.48, 155.02, 159.34, 164.92, 172.41, 173.5, 177.87, 180.77, 182.02, 174.98, 180.17, 167.02, 177.82, 176.67, 178.19, 187.62, 183.16, 183.22, 186.26, 202.89, 188.08, 186.86, 180.64, 177, 182.41, 175.02, 180.99, 188.22, 187.24, 185.81, 183.32, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 186.03, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 209.25, 207.83, 225.83, 223.47, 214.25, 218.66, 202.03] },
      velocityScore: { '1D': 0, '1W': 4.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.9T', pe: 30.9, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.5,
      etfPresence: { AIS: 2.57, ARTY: 3.61, BAI: 4.47, IVEP: false, IGPT: 5.95, IVES: 4.77, ALAI: 13.4, CHAT: 7.01, AIFD: 6.62, SPRX: 4.05, AOTG: 10.98 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 6.58, proScore: 5.38, coverage: 0.818,
      price: 904.56, weeklyPrices: [864.01, 949.28, 935.89, 891.88, 904.56], weeklyChange: 4.69, sortRank: 0, periodReturns: { '1M': 13.7, '6M': 250, '1Y': 679.6 },
      priceHistory: { '1W': [864.01, 949.28, 935.89, 891.88, 904.56], '1M': [795.33, 766.58, 803.63, 776.01, 724.66, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 996, 864.01, 949.28, 935.89, 891.88, 904.56], '6M': [258.46, 248.55, 284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 996, 904.56], '1Y': [116.03, 121.82, 126, 122.29, 124.53, 114.39, 111.26, 109.14, 111.87, 125.29, 115.79, 122, 131.37, 157.23, 162.73, 157.27, 187.83, 181.6, 202.38, 219.02, 224.01, 238.33, 236.95, 201.37, 236.48, 237.22, 241.14, 265.92, 294.37, 343.43, 338.13, 389.11, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 518.46, 666.59, 803.63, 731.99, 923.52, 996, 904.56] },
      velocityScore: { '1D': 0.6, '1W': -9.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.0T', pe: 42.6, revenueGrowth: 196, eps: 21.23, grossMargin: 58, dividendYield: 0.07,
      etfPresence: { AIS: 7.89, ARTY: 7.29, BAI: 5.85, IVEP: false, IGPT: 11.96, IVES: 5.66, ALAI: 0.89, CHAT: 3.7, AIFD: 6.18, SPRX: false, AOTG: 9.77 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.36, proScore: 4.38, coverage: 0.818,
      price: 466.12, weeklyPrices: [466.38, 490.33, 475.51, 452.40, 466.12], weeklyChange: -0.06, sortRank: 0, periodReturns: { '1M': 1.6, '6M': 110.5, '1Y': 284.8 },
      priceHistory: { '1W': [466.38, 490.33, 475.51, 452.4, 466.12], '1M': [458.79, 448.29, 445.5, 449.7, 424.1, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 523.2, 466.38, 490.33, 475.51, 452.4, 466.12], '6M': [221.43, 201.06, 214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 204.83, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 518.09, 523.2, 466.12], '1Y': [121.14, 126.79, 143.68, 137.91, 146.42, 156.99, 166.47, 176.31, 172.4, 180.95, 163.71, 168.58, 151.14, 158.57, 157.39, 159.46, 164.67, 214.9, 233.08, 252.92, 254.84, 237.7, 247.96, 206.02, 217.53, 217.97, 210.78, 213.43, 215.61, 214.35, 220.97, 249.8, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 204.83, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 337.11, 421.39, 445.5, 447.58, 518.09, 523.2, 466.12] },
      velocityScore: { '1D': -0.2, '1W': -7.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$760B', pe: 155.9, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.43, ARTY: 7.1, BAI: 4.6, IVEP: false, IGPT: 6.99, IVES: 4.59, ALAI: 1.1, CHAT: 3.8, AIFD: false, SPRX: 0.51, AOTG: 15.08 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.55, proScore: 2.58, coverage: 0.727,
      price: 374.98, weeklyPrices: [385.73, 396.60, 392.16, 372.10, 374.98], weeklyChange: -2.79, sortRank: 0, periodReturns: { '1M': -12.5, '6M': -7.7, '1Y': 48.3 },
      priceHistory: { '1W': [385.73, 396.6, 392.16, 372.1, 374.98], '1M': [428.43, 419.3, 416.79, 439.79, 425.19, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 418.91, 385.73, 396.6, 392.16, 372.1, 374.98], '6M': [406.37, 329.88, 352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 341.57, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 417.76, 426.58, 418.91, 374.98], '1Y': [252.91, 251.26, 270.17, 275.18, 274.38, 283.34, 290.18, 293.7, 303.76, 311.23, 289.6, 308.65, 334.89, 359.87, 344.94, 334.53, 338.37, 324.63, 349.33, 354.13, 376.47, 355.59, 339.98, 346.82, 402.96, 390.24, 359.93, 340.36, 349.39, 343.77, 354.61, 328.8, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 341.57, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 405.45, 425.44, 416.79, 417.76, 426.58, 418.91, 374.98] },
      velocityScore: { '1D': -1.5, '1W': -9.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 62.2, revenueGrowth: 48, eps: 6.03, grossMargin: 76, dividendYield: 0.7,
      etfPresence: { AIS: 0.7, ARTY: 3.46, BAI: 4.46, IVEP: false, IGPT: false, IVES: 4.41, ALAI: 3.95, CHAT: 4.31, AIFD: 5.54, SPRX: false, AOTG: 1.56 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 7, avgWeight: 2.24, proScore: 1.43, coverage: 0.636,
      price: 152.41, weeklyPrices: [154.27, 156.40, 152.16, 151.76, 152.41], weeklyChange: -1.2, sortRank: 0, periodReturns: { '1M': 11.7, '6M': 13.4, '1Y': 61.8 },
      priceHistory: { '1W': [154.27, 156.4, 152.16, 151.76, 152.41], '1M': [136.43, 142.54, 140.69, 147.81, 141.97, 141.58, 140.49, 148.59, 154.03, 158.01, 154.31, 155.27, 159.47, 170.68, 175.33, 166.01, 154.27, 156.4, 152.16, 151.76, 152.41], '6M': [134.39, 124.62, 131.84, 137.19, 123.42, 127.52, 146.69, 139.39, 143.45, 139.54, 132.89, 134.83, 138.23, 133.07, 130.8, 122.78, 145.07, 154.33, 177.73, 168.68, 147.06, 140.69, 140.49, 155.27, 166.01, 152.41], '1Y': [94.21, 90.24, 101.59, 102.52, 108.57, 111.78, 114.28, 123.22, 139.28, 136.48, 132.03, 136.23, 142.85, 139.39, 149.61, 142.5, 145.5, 154.1, 143.1, 153.82, 158.44, 134.02, 130.3, 119.59, 130.68, 128.59, 124.76, 131.12, 134.15, 132.58, 129.93, 127.29, 146.69, 139.39, 143.45, 139.54, 132.89, 134.83, 138.23, 136.07, 135.01, 124.85, 146.05, 161.01, 172.55, 168.68, 147.06, 140.69, 140.49, 155.27, 166.01, 152.41] },
      velocityScore: { '1D': 27.7, '1W': -4.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$192B', pe: 52.4, revenueGrowth: 35, eps: 2.91, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.43, ARTY: 2.01, BAI: 1.4, IVEP: false, IGPT: false, IVES: false, ALAI: 0.91, CHAT: 2.19, AIFD: 4.65, SPRX: 3.12, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 7 of 11 AI & ML ETFs (64% coverage) with average weight 2.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 4.93, proScore: 2.69, coverage: 0.545,
      price: 352.38, weeklyPrices: [368.53, 363.31, 364.26, 356.38, 352.38], weeklyChange: -4.38, sortRank: 0, periodReturns: { '1M': -9.3, '6M': 12.8, '1Y': 98.7 },
      priceHistory: { '1W': [368.53, 363.31, 364.26, 356.38, 352.38], '1M': [388.64, 387.35, 402.62, 401.07, 396.78, 387.66, 388.91, 387.66, 382.97, 388.88, 388.83, 390.13, 380.34, 376.37, 361.85, 372.19, 368.53, 363.31, 364.26, 356.38, 352.38], '6M': [312.43, 302.46, 313.51, 316.54, 331.86, 322, 334.55, 339.71, 318.58, 303.33, 312.9, 303.13, 308.7, 310.92, 290.44, 287.56, 317.32, 337.12, 339.32, 349.94, 398.04, 402.62, 388.91, 390.13, 372.19, 352.38], '1Y': [177.35, 173.32, 173.54, 179.53, 180.19, 185.06, 193.18, 191.9, 196.52, 202.94, 199.75, 211.64, 235, 240.8, 254.72, 246.54, 245.35, 236.57, 253.3, 259.92, 281.48, 284.75, 278.57, 289.45, 320.18, 321.27, 309.29, 307.16, 313.56, 314.34, 335.97, 328.38, 334.55, 339.71, 318.58, 303.33, 312.9, 303.13, 308.7, 307.69, 290.93, 297.39, 318.49, 336.02, 338.89, 349.94, 398.04, 402.62, 388.91, 390.13, 372.19, 352.38] },
      velocityScore: { '1D': 0.7, '1W': 10.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.3T', pe: 26.9, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.59, IVEP: false, IGPT: 6.38, IVES: 4.6, ALAI: false, CHAT: 5.67, AIFD: 5.15, SPRX: false, AOTG: 4.19 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 6, avgWeight: 4.84, proScore: 2.64, coverage: 0.545,
      price: 414.15, weeklyPrices: [415.17, 426.80, 427.92, 408.75, 414.15], weeklyChange: -0.24, sortRank: 0, periodReturns: { '1M': 2.4, '6M': 35.9, '1Y': 93.4 },
      priceHistory: { '1W': [415.17, 426.8, 427.92, 408.75, 414.15], '1M': [404.54, 397.28, 399.8, 417.72, 404.35, 392.61, 401.62, 407.15, 404.52, 412.32, 422.73, 424.86, 418.45, 435.63, 446.69, 444.92, 415.17, 426.8, 427.92, 408.75, 414.15], '6M': [304.85, 284.68, 302.84, 322.25, 331.77, 327.16, 338.34, 335.75, 361.91, 362.26, 387.73, 357.44, 354.56, 345.98, 343.25, 337.95, 365.9, 375.1, 387.44, 393.83, 419.5, 399.8, 401.62, 424.86, 444.92, 414.15], '1Y': [214.1, 213.5, 224.01, 234.8, 230.4, 240.4, 245.6, 241.62, 242.62, 241, 227.33, 238.27, 243.41, 259.33, 264.87, 273.36, 292.19, 280.66, 295.08, 294.96, 303.22, 289.24, 282.2, 277.5, 291.51, 294.72, 292.04, 288.95, 300.92, 327.43, 331.21, 326.12, 338.34, 335.75, 361.91, 362.26, 387.73, 357.44, 354.56, 339.57, 347.75, 341.49, 365.49, 363.35, 382.66, 393.83, 419.5, 399.8, 401.62, 424.86, 444.92, 414.15] },
      velocityScore: { '1D': -0.4, '1W': 4.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.1T', pe: 35.5, revenueGrowth: 35, eps: 11.65, grossMargin: 62, dividendYield: 0.93,
      etfPresence: { AIS: 3.3, ARTY: false, BAI: 4.44, IVEP: false, IGPT: false, IVES: 4.98, ALAI: 5.64, CHAT: false, AIFD: 3.33, SPRX: false, AOTG: 7.37 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 6, avgWeight: 4.52, proScore: 2.47, coverage: 0.545,
      price: 263.1, weeklyPrices: [263.47, 288.85, 266.88, 252.59, 263.10], weeklyChange: -0.14, sortRank: 0, periodReturns: { '1M': 54, '6M': 194.2, '1Y': 285.5 },
      priceHistory: { '1W': [263.47, 288.85, 266.88, 252.59, 263.1], '1M': [170.84, 164.5, 177.95, 182.58, 176.89, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 204.83, 205, 219.43, 290.79, 316.43, 263.47, 288.85, 266.88, 252.59, 263.1], '6M': [89.43, 84.47, 86.34, 90.23, 82.89, 79.8, 82.93, 75.54, 82.01, 79.09, 80.92, 78.09, 90.44, 90.79, 92.36, 99.05, 114.45, 134.6, 157.32, 156.57, 172.15, 177.95, 186.8, 204.83, 316.43, 263.1], '1Y': [68.24, 74.95, 79.97, 75.18, 72.71, 74.65, 74.21, 80.37, 75.85, 79.04, 71.21, 77.23, 63.33, 67.35, 74.26, 83.17, 86.22, 85.61, 87.95, 84.13, 88.57, 93.33, 87.52, 76.68, 89.4, 98.91, 84.43, 84.09, 85.76, 88.23, 83.05, 82.55, 82.93, 75.54, 82.01, 79.09, 80.92, 78.09, 90.44, 87.62, 98.45, 106.71, 119.93, 133.37, 165.56, 156.57, 172.15, 177.95, 186.8, 204.83, 316.43, 263.1] },
      velocityScore: { '1D': -1.6, '1W': 2.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$230B', pe: 90.7, revenueGrowth: 28, eps: 2.9, grossMargin: 52, dividendYield: 0.1,
      etfPresence: { AIS: 4.35, ARTY: 8.65, BAI: 1.83, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.5, AIFD: 6.37, SPRX: 4.45, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 4.12, proScore: 1.87, coverage: 0.455,
      price: 237.39, weeklyPrices: [246.03, 245.22, 244.19, 238.00, 237.39], weeklyChange: -3.51, sortRank: 0, periodReturns: { '1M': -11.7, '6M': 3.1, '1Y': 11.3 },
      priceHistory: { '1W': [246.03, 245.22, 244.19, 238, 237.39], '1M': [268.99, 265.82, 270.13, 267.22, 264.14, 259.34, 265.01, 268.46, 266.32, 265.29, 271.85, 274, 270.64, 261.26, 256.52, 253.79, 246.03, 245.22, 244.19, 238, 237.39], '6M': [230.28, 226.76, 232.52, 233.06, 246.47, 231, 244.68, 238.62, 206.96, 204.79, 210.64, 216.82, 212.65, 215.2, 207.24, 208.27, 221.25, 248.5, 255.36, 263.04, 274.99, 270.13, 265.01, 274, 253.79, 237.39], '1Y': [213.2, 212.52, 217.12, 223.41, 225.02, 226.13, 231.44, 234.11, 223.13, 230.98, 221.95, 231.6, 232.33, 228.15, 231.48, 219.78, 219.51, 216.37, 213.04, 224.21, 222.86, 243.04, 237.58, 217.14, 233.22, 229.53, 226.19, 227.35, 232.07, 240.93, 242.6, 231.31, 244.68, 238.62, 206.96, 204.79, 210.64, 216.82, 212.65, 209.87, 211.71, 210.57, 233.65, 249.7, 255.08, 263.04, 274.99, 270.13, 265.01, 274, 253.79, 237.39] },
      velocityScore: { '1D': 0, '1W': 1.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 31.6, revenueGrowth: 17, eps: 7.52, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.44, ALAI: 5.86, CHAT: 2.56, AIFD: 3.53, SPRX: false, AOTG: 4.22 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.67, proScore: 1.67, coverage: 0.455,
      price: 391.28, weeklyPrices: [416.67, 411.74, 403.41, 397.36, 391.28], weeklyChange: -6.09, sortRank: 0, periodReturns: { '1M': -5.2, '6M': -19.1, '1Y': -17.2 },
      priceHistory: { '1W': [416.67, 411.74, 403.41, 397.36, 391.28], '1M': [412.66, 407.77, 405.21, 409.43, 421.92, 417.42, 421.06, 419.09, 418.57, 416.03, 412.67, 426.99, 450.24, 460.52, 441.31, 428.05, 416.67, 411.74, 403.41, 397.36, 391.28], '6M': [483.47, 483.98, 487.71, 472.85, 477.18, 454.52, 480.58, 411.21, 413.27, 399.6, 400.6, 405.2, 404.88, 399.41, 372.74, 370.17, 374.33, 411.22, 432.92, 424.46, 413.96, 405.21, 421.06, 426.99, 428.05, 391.28], '1Y': [472.62, 480.24, 497.45, 498.84, 503.32, 510.05, 513.71, 533.5, 520.84, 522.48, 504.24, 509.64, 495, 509.9, 517.93, 511.46, 517.35, 510.96, 513.58, 523.61, 525.76, 497.1, 503.29, 478.43, 492.01, 483.16, 478.53, 485.92, 487.1, 478.51, 470.67, 444.11, 480.58, 411.21, 413.27, 399.6, 400.6, 405.2, 404.88, 391.79, 371.04, 369.37, 373.07, 420.26, 415.75, 424.46, 413.96, 405.21, 421.06, 426.99, 428.05, 391.28] },
      velocityScore: { '1D': 0.6, '1W': 26.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 23.3, revenueGrowth: 18, eps: 16.81, grossMargin: 68, dividendYield: 0.92,
      etfPresence: { AIS: false, ARTY: 1.83, BAI: false, IVEP: false, IGPT: false, IVES: 4.76, ALAI: 5.52, CHAT: 2.43, AIFD: false, SPRX: false, AOTG: 3.8 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 3.41, proScore: 1.55, coverage: 0.455,
      price: 564.39, weeklyPrices: [593.00, 585.39, 584.59, 570.98, 564.39], weeklyChange: -4.82, sortRank: 0, periodReturns: { '1M': -5.8, '6M': -13.5, '1Y': -18.7 },
      priceHistory: { '1W': [593, 585.39, 584.59, 570.98, 564.39], '1M': [598.86, 603, 616.63, 618.43, 614.23, 602.61, 605.06, 607.38, 610.26, 612.34, 635.26, 635.29, 632.51, 600.47, 597.63, 627.57, 593, 585.39, 584.59, 570.98, 564.39], '6M': [652.71, 664.45, 663.29, 658.79, 641.97, 604.12, 672.97, 691.7, 670.72, 643.22, 653.69, 667.73, 654.86, 622.66, 592.92, 572.13, 612.42, 671.58, 674.72, 669.12, 612.88, 616.63, 605.06, 635.29, 627.57, 564.39], '1Y': [694.14, 695.77, 726.09, 719.01, 717.51, 704.28, 712.68, 773.44, 761.83, 782.13, 739.1, 751.11, 752.45, 755.59, 778.38, 743.75, 710.56, 705.3, 716.92, 738.36, 666.47, 618.94, 609.89, 589.15, 647.95, 673.42, 644.23, 658.77, 658.69, 660.62, 631.09, 612.96, 672.97, 691.7, 670.72, 643.22, 653.69, 667.73, 654.86, 615.68, 594.89, 579.23, 628.39, 676.87, 659.15, 669.12, 612.88, 616.63, 605.06, 635.29, 627.57, 564.39] },
      velocityScore: { '1D': 8.4, '1W': 1.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 20.5, revenueGrowth: 33, eps: 27.52, grossMargin: 82, dividendYield: 0.37,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: 4.86, IVES: 4.53, ALAI: 4.26, CHAT: 2.25, AIFD: false, SPRX: false, AOTG: 1.17 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 5, avgWeight: 3.06, proScore: 1.39, coverage: 0.455,
      price: 286.05, weeklyPrices: [300.51, 300.57, 289.52, 280.98, 286.05], weeklyChange: -4.81, sortRank: 0, periodReturns: { '1M': -22.3, '6M': 60.1, '1Y': 158.7 },
      priceHistory: { '1W': [300.51, 300.57, 289.52, 280.98, 286.05], '1M': [367.92, 367.13, 369.99, 376.23, 370.94, 322.63, 315.67, 323.4, 327.46, 323.91, 319.78, 314.18, 315.71, 323.39, 334.49, 323.92, 300.51, 300.57, 289.52, 280.98, 286.05], '6M': [178.66, 154.39, 167.58, 173.95, 170.03, 175.18, 189.21, 190.15, 199.62, 243.21, 262.19, 251.28, 268.26, 268.41, 270.89, 250.58, 281.03, 301.16, 305.14, 306.18, 358.92, 369.99, 315.67, 314.18, 323.92, 286.05], '1Y': [110.59, 119.08, 123.8, 127.84, 123.3, 129.06, 137.47, 145.6, 139.39, 132.52, 126.58, 134.23, 124, 134.84, 143.6, 138.62, 160.2, 169.01, 174, 186.06, 193.76, 183.02, 163.64, 159.61, 179.73, 189.02, 161.27, 159.82, 165.62, 174.95, 172.72, 181.47, 189.21, 190.15, 199.62, 243.21, 262.19, 251.28, 268.26, 264.71, 276.16, 259.37, 287.64, 294.13, 321.75, 306.18, 358.92, 369.99, 315.67, 314.18, 323.92, 286.05] },
      velocityScore: { '1D': 0, '1W': 3.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$110B', pe: 71.7, revenueGrowth: 30, eps: 3.99, grossMargin: 37, dividendYield: 0.09,
      etfPresence: { AIS: 3.61, ARTY: false, BAI: 1.86, IVEP: 3.88, IGPT: false, IVES: false, ALAI: false, CHAT: 2.15, AIFD: 3.82, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.04, proScore: 1.38, coverage: 0.455,
      price: 351.01, weeklyPrices: [317.06, 346.33, 341.70, 330.86, 351.01], weeklyChange: 10.71, sortRank: 0, periodReturns: { '1M': 69.3, '6M': 102.1, '1Y': 271.3 },
      priceHistory: { '1W': [317.06, 346.33, 341.7, 330.86, 351.01], '1M': [207.35, 204.42, 224.09, 228.64, 232.68, 244.26, 287.48, 297.84, 306.88, 318.72, 325.33, 349.17, 342.85, 320.09, 355.76, 358.05, 317.06, 346.33, 341.7, 330.86, 351.01], '6M': [173.7, 145.88, 167.26, 167.11, 172.57, 183.75, 170.93, 158.52, 182.86, 129.58, 128.15, 113.77, 124.71, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 224.09, 287.48, 349.17, 358.05, 351.01], '1Y': [94.54, 99.53, 97.96, 90.8, 95.9, 102.13, 122.23, 136.73, 170.89, 190.69, 177.53, 189.15, 191.2, 229.5, 245.2, 197.78, 200.74, 206.21, 159.8, 164.97, 169.55, 162.83, 144.47, 139.29, 157.57, 161.23, 148.85, 164.4, 170.1, 161.01, 180.56, 176.01, 170.93, 158.52, 182.86, 129.58, 128.15, 113.77, 124.71, 126.34, 120.33, 106.33, 129.46, 170.81, 197.54, 196.85, 213.91, 224.09, 287.48, 349.17, 358.05, 351.01] },
      velocityScore: { '1D': 2.2, '1W': -5.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$60B', pe: 235.6, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 1.87, ARTY: 1.71, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 1.51, CHAT: 2.54, AIFD: false, SPRX: 7.58, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'CRDO', name: 'Credo Technology Group Holding Ltd', easyScore: 5, avgWeight: 1.89, proScore: 0.86, coverage: 0.455,
      price: 251.2, weeklyPrices: [206.89, 222.27, 234.32, 237.68, 251.20], weeklyChange: 21.42, sortRank: 0, periodReturns: { '1M': 19.5, '6M': 62.6, '1Y': 250.6 },
      priceHistory: { '1W': [206.89, 222.27, 234.32, 237.68, 251.2], '1M': [210.22, 198.57, 189.36, 184.54, 172.17, 168.99, 182.98, 193.39, 218.41, 221.64, 221.23, 222.35, 236.03, 226.1, 229, 217.5, 206.89, 222.27, 234.32, 237.68, 251.2], '6M': [154.47, 138.57, 144.83, 140.24, 156.07, 153.22, 129.57, 111.31, 134.72, 127.91, 123.46, 102.54, 115.91, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 182.98, 222.35, 217.5, 251.2], '1Y': [71.64, 85.59, 95.05, 93.61, 98.52, 93.47, 101.22, 111.55, 119.78, 117.33, 110.86, 131.82, 140.82, 161.99, 169.56, 142.93, 143.87, 138.83, 143.61, 155.55, 166.62, 162.74, 142.95, 134.73, 177.6, 176.04, 143.91, 150.13, 144.7, 132.95, 161.38, 139.16, 129.57, 111.31, 134.72, 127.91, 123.46, 102.54, 115.91, 101.72, 103.91, 95.92, 107.93, 158.93, 185.54, 175.77, 198.29, 189.36, 182.98, 222.35, 217.5, 251.2] },
      velocityScore: { '1D': 7.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$46B', pe: 137.3, revenueGrowth: 157, eps: 1.83, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: 0.86, ARTY: 1.33, BAI: 2.12, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 2.25, AIFD: false, SPRX: 2.88, AOTG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'COHR', name: 'Coherent Corp', easyScore: 4, avgWeight: 3.65, proScore: 1.33, coverage: 0.364,
      price: 355.12, weeklyPrices: [376.99, 401.93, 355.94, 354.77, 355.12], weeklyChange: -5.8, sortRank: 0, periodReturns: { '1M': -6.5, '6M': 78.9, '1Y': 335.7 },
      priceHistory: { '1W': [376.99, 401.93, 355.94, 354.77, 355.12], '1M': [379.69, 374.01, 403.71, 404.94, 382.45, 353.63, 358.5, 378, 377.57, 381.35, 380.18, 376.95, 361.47, 362.9, 426.89, 421.9, 376.99, 401.93, 355.94, 354.77, 355.12], '6M': [198.5, 175.71, 191.72, 186.36, 185.18, 193.46, 214, 229.18, 228.37, 223.89, 267.9, 274.86, 251.41, 245.8, 272.33, 238.21, 281.79, 308.2, 350.47, 304.93, 344.67, 403.71, 358.5, 376.95, 421.9, 355.12], '1Y': [81.51, 82.29, 89.88, 90.9, 93.3, 99.6, 100.14, 107.6, 113.82, 91.65, 86.6, 95.2, 97.84, 102.99, 109.11, 106.99, 113.58, 111.1, 116.35, 129.34, 132.71, 159.3, 139.97, 135.61, 164.26, 181.79, 178.34, 185.83, 189.02, 194.11, 190.03, 201.46, 214, 229.18, 228.37, 223.89, 267.9, 274.86, 251.41, 257.21, 272.04, 247.8, 284.17, 328, 337.68, 304.93, 344.67, 403.71, 358.5, 376.95, 421.9, 355.12] },
      velocityScore: { '1D': -3.6, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$69B', pe: 169.9, revenueGrowth: 21, eps: 2.09, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 0.94, ARTY: false, BAI: false, IVEP: 3.95, IGPT: false, IVES: false, ALAI: false, CHAT: 1.42, AIFD: false, SPRX: 8.28, AOTG: false },
      tonyNote: 'Coherent Corp appears in 4 of 11 AI & ML ETFs (36% coverage) with average weight 3.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 4, avgWeight: 3.53, proScore: 1.28, coverage: 0.364,
      price: 115.62, weeklyPrices: [99.17, 110.27, 107.92, 107.04, 115.62], weeklyChange: 16.59, sortRank: 0, periodReturns: { '1M': -10.7, '6M': 192.6, '1Y': 459.1 },
      priceHistory: { '1W': [99.17, 110.27, 107.92, 107.04, 115.62], '1M': [129.44, 120.61, 120.29, 115.93, 108.77, 110.8, 118.96, 118.5, 119.84, 123.52, 121.77, 120.89, 114.68, 109.33, 107.93, 111.78, 99.17, 110.27, 107.92, 107.04, 115.62], '6M': [39.51, 36.28, 36.2, 39.37, 44.06, 48.56, 43.93, 49.25, 47.13, 45.46, 46.88, 45.58, 47.98, 44.06, 44.06, 44.13, 58.95, 64.94, 65.27, 94.75, 113.01, 120.29, 118.96, 120.89, 111.78, 115.62], '1Y': [20.68, 21.49, 22.5, 22.49, 23.43, 23.1, 20.7, 19.8, 19.77, 23.86, 23.5, 24.93, 24.49, 24.08, 29.58, 35.5, 36.83, 36.37, 37.01, 38.28, 40.16, 37.24, 35.91, 33.62, 40.56, 41.41, 37.81, 36.82, 36.68, 40.04, 47.29, 54.25, 43.93, 49.25, 47.13, 45.46, 46.88, 45.58, 47.98, 45.03, 47.18, 48.03, 61.72, 68.5, 66.78, 94.75, 113.01, 120.29, 118.96, 120.89, 111.78, 115.62] },
      velocityScore: { '1D': 3.2, '1W': 17.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$581B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.19, ARTY: false, BAI: 2.88, IVEP: false, IGPT: 6.88, IVES: false, ALAI: false, CHAT: 1.17, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 4, avgWeight: 3.38, proScore: 1.23, coverage: 0.364,
      price: 851.93, weeklyPrices: [863.66, 895.40, 821.76, 853.26, 851.93], weeklyChange: -1.36, sortRank: 0, periodReturns: { '1M': -19.1, '6M': 129, '1Y': 934.4 },
      priceHistory: { '1W': [863.66, 895.4, 821.76, 853.26, 851.93], '1M': [1053.09, 992.37, 1030.37, 1001.81, 970.7, 890.09, 868.07, 964.5, 946.9, 910.81, 902.31, 860.62, 854.96, 905, 1029.15, 945.08, 863.66, 895.4, 821.76, 853.26, 851.93], '6M': [372.09, 337.13, 390.77, 357.05, 339.87, 356.83, 370.66, 435.1, 561.13, 594.26, 723.39, 680.8, 672, 649.56, 801.99, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 1030.37, 868.07, 860.62, 945.08, 851.93], '1Y': [82.36, 88.46, 94.71, 92.75, 92.99, 102.22, 104.52, 110.08, 111.13, 114.62, 117.43, 135.55, 149.46, 163.02, 168.73, 160.75, 163.81, 149.61, 164.77, 179.3, 200.13, 239.68, 226.86, 233.24, 325.16, 331.41, 324.35, 371.43, 372.61, 397.42, 361.33, 362.44, 370.66, 435.1, 561.13, 594.26, 723.39, 680.8, 672, 700.81, 777.17, 764.65, 894.13, 891.22, 846.89, 858.32, 944.28, 1030.37, 868.07, 860.62, 945.08, 851.93] },
      velocityScore: { '1D': -3.1, '1W': -3.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 148.9, revenueGrowth: 90, eps: 5.72, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.86, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.53, AIFD: 5.71, SPRX: 3.4, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 4 of 11 AI & ML ETFs (36% coverage) with average weight 3.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 4, avgWeight: 3.37, proScore: 1.23, coverage: 0.364,
      price: 176.25, weeklyPrices: [213.68, 211.82, 205.81, 201.26, 176.25], weeklyChange: -17.52, sortRank: 0, periodReturns: { '1M': -9.1, '6M': -11.4, '1Y': -0.1 },
      priceHistory: { '1W': [213.68, 211.82, 205.81, 201.26, 176.25], '1M': [193.84, 186.83, 189.76, 195.61, 192.95, 181.46, 188.16, 189.77, 192.08, 193.06, 190.96, 203.7, 225.78, 248.15, 244.58, 236.34, 213.68, 211.82, 205.81, 201.26, 176.25], '6M': [198.85, 180.03, 197.99, 192.59, 204.68, 179.92, 174.9, 154.67, 159.89, 156.17, 147.89, 152.37, 163.12, 154.69, 147.09, 147.11, 143.66, 169.81, 187.5, 163.83, 194.03, 189.76, 188.16, 203.7, 236.34, 176.25], '1Y': [176.38, 210.87, 212.82, 237.32, 230.56, 245.45, 245.12, 253.77, 249.39, 244.96, 233.16, 240.32, 232.8, 292.18, 308.66, 283.46, 286.14, 292.96, 291.31, 283.33, 256.89, 243.8, 217.57, 210.69, 201.95, 217.58, 189.97, 191.97, 195.38, 193.75, 202.29, 173.88, 174.9, 154.67, 159.89, 156.17, 147.89, 152.37, 163.12, 152.9, 146.02, 145.23, 137.86, 178.34, 176.28, 163.83, 194.03, 189.76, 188.16, 203.7, 236.34, 176.25] },
      velocityScore: { '1D': 0.8, '1W': -0.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$507B', pe: 31.6, revenueGrowth: 21, eps: 5.57, grossMargin: 66, dividendYield: 0.99,
      etfPresence: { AIS: false, ARTY: 4.22, BAI: false, IVEP: false, IGPT: false, IVES: 4.17, ALAI: false, CHAT: 1.91, AIFD: false, SPRX: false, AOTG: 3.18 },
      tonyNote: 'Oracle lands in 3 AI ETFs on the strength of its cloud database and AI infrastructure contracts. Revenue grew 22%, 67% gross margin, P/E of 40x. The 17.5% weekly return following a major earnings beat shows how quickly sentiment can reprice; the weight score at 2.04% is still modest, meaning ETF managers have started building positions but conviction is not yet deep.',
    },
    {
      ticker: 'ARM', name: 'ARM Holdings PLC', easyScore: 4, avgWeight: 3.05, proScore: 1.11, coverage: 0.364,
      price: 321.75, weeklyPrices: [342.93, 346.39, 324.86, 307.43, 321.75], weeklyChange: -6.18, sortRank: 0, periodReturns: { '1M': 51.3, '6M': 136.3, '1Y': 129.2 },
      priceHistory: { '1W': [342.93, 346.39, 324.86, 307.43, 321.75], '1M': [212.65, 207.92, 221.21, 228.5, 209.16, 223.15, 256.73, 298.23, 306.51, 321.22, 302.71, 335.27, 353.29, 408.85, 402.71, 393.44, 342.93, 346.39, 324.86, 307.43, 321.75], '6M': [136.14, 113.51, 110.27, 116.11, 111.14, 107.17, 114.88, 104.55, 125.95, 127.24, 131.74, 124.11, 120.1, 127.31, 134.96, 151.28, 148.91, 159.34, 196.57, 201.69, 237.3, 221.21, 256.73, 335.27, 393.44, 321.75], '1Y': [140.38, 146.05, 158.15, 155.09, 145.94, 156.74, 163.17, 141.38, 135.57, 140.55, 133.28, 142.55, 138.17, 150.64, 142.91, 139.62, 152.64, 154.81, 165.61, 170.68, 165.45, 158.25, 140.31, 132.53, 135.56, 141.31, 130.89, 114.03, 110.51, 115.53, 107.84, 113.92, 114.88, 104.55, 125.95, 127.24, 131.74, 124.11, 120.1, 128.36, 157.07, 155.07, 149.79, 162.33, 204.61, 201.69, 237.3, 221.21, 256.73, 335.27, 393.44, 321.75] },
      velocityScore: { '1D': -5.9, '1W': -25.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$344B', pe: 374.1, revenueGrowth: 20, eps: 0.86, grossMargin: 98, dividendYield: null,
      etfPresence: { AIS: 2, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 0.43, CHAT: 2.52, AIFD: false, SPRX: 7.27, AOTG: false },
      tonyNote: 'Arm Holdings is held across Broad Tech and AI ETFs as the CPU architecture licensor embedded in every mobile device and increasingly in AI inference chips and data center CPUs. Revenue grew and the royalty model is high-margin; the weight score reflects consistent institutional positioning as the AI chip design ecosystem expands on Arm cores.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 4, avgWeight: 2.78, proScore: 1.01, coverage: 0.364,
      price: 494, weeklyPrices: [511.72, 526.93, 517.72, 490.09, 494.00], weeklyChange: -3.46, sortRank: 0, periodReturns: { '1M': -4.2, '6M': 163.9, '1Y': 787.4 },
      priceHistory: { '1W': [511.72, 526.93, 517.72, 490.09, 494], '1M': [515.83, 488.74, 494.09, 489.15, 482.02, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 575.5, 511.72, 526.93, 517.72, 490.09, 494], '6M': [187.2, 175.01, 181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 268.81, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 459.62, 531.18, 575.5, 494], '1Y': [55.67, 59.19, 63.51, 66.08, 66.14, 68, 68.82, 78.69, 74.44, 76.24, 74.66, 82.04, 92.04, 97.66, 106.63, 106.88, 131.31, 115.42, 126.2, 129.43, 138.13, 163.6, 157.16, 140.23, 163.33, 168.89, 176.34, 181.08, 179.68, 219.38, 214, 241.9, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 268.81, 304.9, 296.14, 297.73, 337.88, 361.69, 403.12, 412.76, 483.15, 494.09, 459.62, 531.18, 575.5, 494] },
      velocityScore: { '1D': -1.9, '1W': -19.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$170B', pe: 29.6, revenueGrowth: 46, eps: 16.71, grossMargin: 45, dividendYield: 0.12,
      etfPresence: { AIS: 1.5, ARTY: 2.61, BAI: 2.82, IVEP: false, IGPT: false, IVES: false, ALAI: 4.2, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 6.01, proScore: 6.01, coverage: 1,
      price: 904.56, weeklyPrices: [864.01, 949.28, 935.89, 891.88, 904.56], weeklyChange: 4.69, sortRank: 0, periodReturns: { '1M': 13.7, '6M': 250, '1Y': 679.6 },
      priceHistory: { '1W': [864.01, 949.28, 935.89, 891.88, 904.56], '1M': [795.33, 766.58, 803.63, 776.01, 724.66, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 996, 864.01, 949.28, 935.89, 891.88, 904.56], '6M': [258.46, 248.55, 284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 996, 904.56], '1Y': [116.03, 121.82, 126, 122.29, 124.53, 114.39, 111.26, 109.14, 111.87, 125.29, 115.79, 122, 131.37, 157.23, 162.73, 157.27, 187.83, 181.6, 202.38, 219.02, 224.01, 238.33, 236.95, 201.37, 236.48, 237.22, 241.14, 265.92, 294.37, 343.43, 338.13, 389.11, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 518.46, 666.59, 803.63, 731.99, 923.52, 996, 904.56] },
      velocityScore: { '1D': -1.2, '1W': -7.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.0T', pe: 42.6, revenueGrowth: 196, eps: 21.23, grossMargin: 58, dividendYield: 0.07,
      etfPresence: { SOXX: 11.21, PSI: 5.43, XSD: 3.49, DRAM: 3.9 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.74, proScore: 4.31, coverage: 0.75,
      price: 466.12, weeklyPrices: [466.38, 490.33, 475.51, 452.40, 466.12], weeklyChange: -0.06, sortRank: 0, periodReturns: { '1M': 1.6, '6M': 110.5, '1Y': 284.8 },
      priceHistory: { '1W': [466.38, 490.33, 475.51, 452.4, 466.12], '1M': [458.79, 448.29, 445.5, 449.7, 424.1, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 523.2, 466.38, 490.33, 475.51, 452.4, 466.12], '6M': [221.43, 201.06, 214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 204.83, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 518.09, 523.2, 466.12], '1Y': [121.14, 126.79, 143.68, 137.91, 146.42, 156.99, 166.47, 176.31, 172.4, 180.95, 163.71, 168.58, 151.14, 158.57, 157.39, 159.46, 164.67, 214.9, 233.08, 252.92, 254.84, 237.7, 247.96, 206.02, 217.53, 217.97, 210.78, 213.43, 215.61, 214.35, 220.97, 249.8, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 204.83, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 337.11, 421.39, 445.5, 447.58, 518.09, 523.2, 466.12] },
      velocityScore: { '1D': -1.8, '1W': -5.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$760B', pe: 155.9, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 8.73, PSI: 4.89, XSD: 3.61, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.82, proScore: 3.61, coverage: 0.75,
      price: 115.62, weeklyPrices: [99.17, 110.27, 107.92, 107.04, 115.62], weeklyChange: 16.59, sortRank: 0, periodReturns: { '1M': -10.7, '6M': 192.6, '1Y': 459.1 },
      priceHistory: { '1W': [99.17, 110.27, 107.92, 107.04, 115.62], '1M': [129.44, 120.61, 120.29, 115.93, 108.77, 110.8, 118.96, 118.5, 119.84, 123.52, 121.77, 120.89, 114.68, 109.33, 107.93, 111.78, 99.17, 110.27, 107.92, 107.04, 115.62], '6M': [39.51, 36.28, 36.2, 39.37, 44.06, 48.56, 43.93, 49.25, 47.13, 45.46, 46.88, 45.58, 47.98, 44.06, 44.06, 44.13, 58.95, 64.94, 65.27, 94.75, 113.01, 120.29, 118.96, 120.89, 111.78, 115.62], '1Y': [20.68, 21.49, 22.5, 22.49, 23.43, 23.1, 20.7, 19.8, 19.77, 23.86, 23.5, 24.93, 24.49, 24.08, 29.58, 35.5, 36.83, 36.37, 37.01, 38.28, 40.16, 37.24, 35.91, 33.62, 40.56, 41.41, 37.81, 36.82, 36.68, 40.04, 47.29, 54.25, 43.93, 49.25, 47.13, 45.46, 46.88, 45.58, 47.98, 45.03, 47.18, 48.03, 61.72, 68.5, 66.78, 94.75, 113.01, 120.29, 118.96, 120.89, 111.78, 115.62] },
      velocityScore: { '1D': 2.3, '1W': 7.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$581B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.08, PSI: 4.72, XSD: 3.65, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 4.24, proScore: 3.18, coverage: 0.75,
      price: 202.03, weeklyPrices: [205.10, 208.64, 208.19, 200.42, 202.03], weeklyChange: -1.5, sortRank: 0, periodReturns: { '1M': -7.9, '6M': 11.7, '1Y': 41.4 },
      priceHistory: { '1W': [205.1, 208.64, 208.19, 200.42, 202.03], '1M': [219.44, 220.78, 225.83, 235.74, 225.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 218.66, 205.1, 208.64, 208.19, 200.42, 202.03], '6M': [180.93, 174.14, 190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 186.03, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 214.25, 218.66, 202.03], '1Y': [142.83, 145.48, 155.02, 159.34, 164.92, 172.41, 173.5, 177.87, 180.77, 182.02, 174.98, 180.17, 167.02, 177.82, 176.67, 178.19, 187.62, 183.16, 183.22, 186.26, 202.89, 188.08, 186.86, 180.64, 177, 182.41, 175.02, 180.99, 188.22, 187.24, 185.81, 183.32, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 186.03, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 209.25, 207.83, 225.83, 223.47, 214.25, 218.66, 202.03] },
      velocityScore: { '1D': -0.6, '1W': 5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.9T', pe: 30.9, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.5,
      etfPresence: { SOXX: 5.86, PSI: 5.09, XSD: 1.76, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.32, proScore: 2.49, coverage: 0.75,
      price: 399.34, weeklyPrices: [401.39, 403.89, 404.62, 392.67, 399.34], weeklyChange: -0.51, sortRank: 0, periodReturns: { '1M': -5.5, '6M': 40.9, '1Y': 71.7 },
      priceHistory: { '1W': [401.39, 403.89, 404.62, 392.67, 399.34], '1M': [422.73, 419.65, 432.39, 426.79, 417.49, 414.31, 398.05, 384.21, 397.07, 419.94, 416.88, 419.01, 413.85, 402.69, 423.2, 428.76, 401.39, 403.89, 404.62, 392.67, 399.34], '6M': [283.39, 274.92, 276.84, 277.29, 293.86, 295.67, 303.83, 311.29, 325.16, 346.37, 360.8, 341.51, 319.22, 313.66, 321.83, 318.14, 346.21, 347.94, 381.42, 389.31, 415.63, 432.39, 398.05, 419.01, 428.76, 399.34], '1Y': [232.54, 229.65, 237.3, 245.68, 244.68, 241.85, 227.82, 224.63, 223.12, 236.21, 246.95, 254.25, 247.07, 245.21, 245.33, 247.56, 241.99, 225.32, 242.87, 238.01, 232.9, 232.88, 237.53, 225.2, 265.34, 281.29, 279.32, 274.44, 275.63, 292.94, 296.21, 304.97, 303.83, 311.29, 325.16, 346.37, 360.8, 341.51, 319.22, 308.59, 322.03, 320.58, 351.36, 353.8, 403.88, 389.31, 415.63, 432.39, 398.05, 419.01, 428.76, 399.34] },
      velocityScore: { '1D': -0.4, '1W': 0.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$195B', pe: 59.5, revenueGrowth: 37, eps: 6.71, grossMargin: 64, dividendYield: 1.12,
      etfPresence: { SOXX: 2.86, PSI: 5.1, XSD: 2.01, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 6.29, proScore: 3.15, coverage: 0.5,
      price: 263.1, weeklyPrices: [263.47, 288.85, 266.88, 252.59, 263.10], weeklyChange: -0.14, sortRank: 0, periodReturns: { '1M': 54, '6M': 194.2, '1Y': 285.5 },
      priceHistory: { '1W': [263.47, 288.85, 266.88, 252.59, 263.1], '1M': [170.84, 164.5, 177.95, 182.58, 176.89, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 204.83, 205, 219.43, 290.79, 316.43, 263.47, 288.85, 266.88, 252.59, 263.1], '6M': [89.43, 84.47, 86.34, 90.23, 82.89, 79.8, 82.93, 75.54, 82.01, 79.09, 80.92, 78.09, 90.44, 90.79, 92.36, 99.05, 114.45, 134.6, 157.32, 156.57, 172.15, 177.95, 186.8, 204.83, 316.43, 263.1], '1Y': [68.24, 74.95, 79.97, 75.18, 72.71, 74.65, 74.21, 80.37, 75.85, 79.04, 71.21, 77.23, 63.33, 67.35, 74.26, 83.17, 86.22, 85.61, 87.95, 84.13, 88.57, 93.33, 87.52, 76.68, 89.4, 98.91, 84.43, 84.09, 85.76, 88.23, 83.05, 82.55, 82.93, 75.54, 82.01, 79.09, 80.92, 78.09, 90.44, 87.62, 98.45, 106.71, 119.93, 133.37, 165.56, 156.57, 172.15, 177.95, 186.8, 204.83, 316.43, 263.1] },
      velocityScore: { '1D': -1.9, '1W': -4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$230B', pe: 90.7, revenueGrowth: 28, eps: 2.9, grossMargin: 52, dividendYield: 0.1,
      etfPresence: { SOXX: 8.01, PSI: false, XSD: 4.57, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 5.56, proScore: 2.78, coverage: 0.5,
      price: 526.4, weeklyPrices: [453.01, 492.17, 499.21, 497.01, 526.40], weeklyChange: 16.2, sortRank: 0, periodReturns: { '1M': 18.7, '6M': 94.9, '1Y': 204.7 },
      priceHistory: { '1W': [453.01, 492.17, 499.21, 497.01, 526.4], '1M': [443.62, 431.2, 436.61, 440.56, 436.62, 406.91, 426.85, 427.36, 432.16, 454.89, 448.25, 449.68, 450.06, 458.17, 490.05, 501.7, 453.01, 492.17, 499.21, 497.01, 526.4], '6M': [270.11, 253.5, 261.9, 284.32, 307.24, 318.23, 332.71, 318.67, 329.07, 369.3, 394.95, 357.76, 351.07, 352.46, 373.99, 341.79, 385.72, 394.26, 403.48, 382.59, 428.62, 436.61, 426.85, 449.68, 501.7, 526.4], '1Y': [172.79, 172.84, 183.52, 191.05, 197.93, 190.44, 185.69, 180.06, 183.15, 188.24, 159.84, 165.27, 162.75, 167.8, 190.1, 203.92, 217.53, 209.95, 224.99, 228.75, 232.55, 233.53, 223.23, 220.23, 252.25, 268, 259.21, 256.41, 263.05, 296.01, 304.87, 325.24, 332.71, 318.67, 329.07, 369.3, 394.95, 357.76, 351.07, 349.47, 369.34, 353.8, 397.81, 389.9, 403.91, 382.59, 428.62, 436.61, 426.85, 449.68, 501.7, 526.4] },
      velocityScore: { '1D': 2.6, '1W': 10.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$418B', pe: 49.5, revenueGrowth: 11, eps: 10.64, grossMargin: 49, dividendYield: 0.43,
      etfPresence: { SOXX: 5.16, PSI: 5.96, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 4.71, proScore: 2.35, coverage: 0.5,
      price: 2229.54, weeklyPrices: [1929.20, 2108.06, 2139.37, 2135.64, 2229.54], weeklyChange: 15.57, sortRank: 0, periodReturns: { '1M': 20.8, '6M': 78.9, '1Y': 155.7 },
      priceHistory: { '1W': [1929.2, 2108.06, 2139.37, 2135.64, 2229.54], '1M': [1845.19, 1811.35, 1849.71, 1892.94, 1804.32, 1740.58, 1829.47, 1842.18, 1888.38, 2011.39, 1957.19, 1927.63, 1921.71, 1940.04, 2045.2, 2131.1, 1929.2, 2108.06, 2139.37, 2135.64, 2229.54], '6M': [1246.18, 1222.39, 1279.6, 1352.45, 1428.17, 1486.18, 1616.33, 1355.54, 1430.84, 1480.3, 1546.68, 1475.91, 1465, 1481.35, 1566.19, 1472.41, 1672.34, 1748.11, 1812.06, 1816.21, 1816.29, 1849.71, 1829.47, 1927.63, 2131.1, 2229.54], '1Y': [872, 871.16, 902.94, 924.58, 924.58, 931.12, 902.09, 879.03, 912.06, 955.41, 872.39, 894, 905.09, 964.02, 1044.81, 1064.29, 1101.55, 982.75, 1106.66, 1182.82, 1214.41, 1206.4, 1161.72, 1102.45, 1175.47, 1214.46, 1193.92, 1245.67, 1260.39, 1395, 1441.82, 1520, 1616.33, 1355.54, 1430.84, 1480.3, 1546.68, 1475.91, 1465, 1482.36, 1543.82, 1519.84, 1727.26, 1734.85, 1815.43, 1816.21, 1816.29, 1849.71, 1829.47, 1927.63, 2131.1, 2229.54] },
      velocityScore: { '1D': 2.6, '1W': 11.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$291B', pe: 63.3, revenueGrowth: 12, eps: 35.24, grossMargin: 61, dividendYield: 0.43,
      etfPresence: { SOXX: 3.63, PSI: 5.79, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 4.5, proScore: 2.25, coverage: 0.5,
      price: 338.85, weeklyPrices: [303.28, 324.45, 327.16, 321.80, 338.85], weeklyChange: 11.73, sortRank: 0, periodReturns: { '1M': 14.5, '6M': 100.8, '1Y': 272.6 },
      priceHistory: { '1W': [303.28, 324.45, 327.16, 321.8, 338.85], '1M': [296.05, 289.24, 295.44, 299.15, 284.72, 273.38, 292.09, 302.24, 305.35, 322.68, 318.93, 318, 318.18, 317.12, 334.41, 336.41, 303.28, 324.45, 327.16, 321.8, 338.85], '6M': [168.71, 164.7, 178.07, 194.76, 220.4, 222.41, 238.46, 230.1, 226.61, 240.09, 249.48, 222.99, 218.87, 226.47, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 295.44, 292.09, 318, 336.41, 338.85], '1Y': [90.95, 92.24, 96.84, 98.81, 101.73, 100.66, 96.96, 94.84, 99.15, 107.38, 98.41, 104.09, 102.95, 116.96, 126.92, 128.33, 145.81, 131.37, 141.51, 151.68, 161.01, 162.19, 153.32, 139.59, 156, 158.7, 160.52, 172.27, 175.87, 206.96, 214.38, 228.39, 238.46, 230.1, 226.61, 240.09, 249.48, 222.99, 218.87, 224.71, 233.45, 222.01, 258.76, 260.96, 258.56, 248.75, 297.17, 295.44, 292.09, 318, 336.41, 338.85] },
      velocityScore: { '1D': 0.9, '1W': 4.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$424B', pe: 64.2, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.32,
      etfPresence: { SOXX: 3.57, PSI: 5.44, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 3.91, proScore: 1.96, coverage: 0.5,
      price: 374.98, weeklyPrices: [385.73, 396.60, 392.16, 372.10, 374.98], weeklyChange: -2.79, sortRank: 0, periodReturns: { '1M': -12.5, '6M': -7.7, '1Y': 48.3 },
      priceHistory: { '1W': [385.73, 396.6, 392.16, 372.1, 374.98], '1M': [428.43, 419.3, 416.79, 439.79, 425.19, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 418.91, 385.73, 396.6, 392.16, 372.1, 374.98], '6M': [406.37, 329.88, 352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 341.57, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 417.76, 426.58, 418.91, 374.98], '1Y': [252.91, 251.26, 270.17, 275.18, 274.38, 283.34, 290.18, 293.7, 303.76, 311.23, 289.6, 308.65, 334.89, 359.87, 344.94, 334.53, 338.37, 324.63, 349.33, 354.13, 376.47, 355.59, 339.98, 346.82, 402.96, 390.24, 359.93, 340.36, 349.39, 343.77, 354.61, 328.8, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 341.57, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 405.45, 425.44, 416.79, 417.76, 426.58, 418.91, 374.98] },
      velocityScore: { '1D': -1.5, '1W': -10.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 62.2, revenueGrowth: 48, eps: 6.03, grossMargin: 76, dividendYield: 0.7,
      etfPresence: { SOXX: 6.04, PSI: false, XSD: 1.78, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 3.38, proScore: 1.69, coverage: 0.5,
      price: 351.01, weeklyPrices: [317.06, 346.33, 341.70, 330.86, 351.01], weeklyChange: 10.71, sortRank: 0, periodReturns: { '1M': 69.3, '6M': 102.1, '1Y': 271.3 },
      priceHistory: { '1W': [317.06, 346.33, 341.7, 330.86, 351.01], '1M': [207.35, 204.42, 224.09, 228.64, 232.68, 244.26, 287.48, 297.84, 306.88, 318.72, 325.33, 349.17, 342.85, 320.09, 355.76, 358.05, 317.06, 346.33, 341.7, 330.86, 351.01], '6M': [173.7, 145.88, 167.26, 167.11, 172.57, 183.75, 170.93, 158.52, 182.86, 129.58, 128.15, 113.77, 124.71, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 224.09, 287.48, 349.17, 358.05, 351.01], '1Y': [94.54, 99.53, 97.96, 90.8, 95.9, 102.13, 122.23, 136.73, 170.89, 190.69, 177.53, 189.15, 191.2, 229.5, 245.2, 197.78, 200.74, 206.21, 159.8, 164.97, 169.55, 162.83, 144.47, 139.29, 157.57, 161.23, 148.85, 164.4, 170.1, 161.01, 180.56, 176.01, 170.93, 158.52, 182.86, 129.58, 128.15, 113.77, 124.71, 126.34, 120.33, 106.33, 129.46, 170.81, 197.54, 196.85, 213.91, 224.09, 287.48, 349.17, 358.05, 351.01] },
      velocityScore: { '1D': 0.6, '1W': 5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$60B', pe: 235.6, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.41, PSI: false, XSD: 4.34, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.9, proScore: 1.45, coverage: 0.5,
      price: 193.96, weeklyPrices: [215.94, 217.77, 205.42, 191.20, 193.96], weeklyChange: -10.18, sortRank: 0, periodReturns: { '1M': -18.3, '6M': 7, '1Y': 21.6 },
      priceHistory: { '1W': [215.94, 217.77, 205.42, 191.2, 193.96], '1M': [237.53, 210.31, 213.17, 200.08, 201.49, 195.61, 202.51, 213.41, 238.16, 248.82, 233.4, 243.29, 251.02, 228.99, 240.84, 242.57, 215.94, 217.77, 205.42, 191.2, 193.96], '6M': [181.27, 174.19, 174.81, 176.31, 169.27, 154.07, 153.04, 147.18, 140.09, 143.24, 145.82, 139.51, 134.12, 131.59, 128.67, 128.78, 127.51, 133.05, 136.07, 156, 192.57, 213.17, 202.51, 243.29, 242.57, 193.96], '1Y': [159.48, 153.63, 158.19, 162.21, 157.46, 154.8, 158.4, 146.76, 145.9, 158.09, 154.13, 160.8, 159.84, 161.83, 166.85, 169.2, 169.18, 153.59, 163.45, 168.94, 177.26, 173.2, 174.5, 159.59, 168.09, 174.81, 178.29, 175.25, 173.43, 182.45, 165.29, 156.37, 153.04, 147.18, 140.09, 143.24, 145.82, 139.51, 134.12, 130.47, 130.35, 127.28, 127.75, 134.47, 133.95, 156, 192.57, 213.17, 202.51, 243.29, 242.57, 193.96] },
      velocityScore: { '1D': -3.3, '1W': -12.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$204B', pe: 20.9, revenueGrowth: -4, eps: 9.29, grossMargin: 55, dividendYield: 1.92,
      etfPresence: { SOXX: 3.48, PSI: false, XSD: 2.33, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 2.89, proScore: 1.44, coverage: 0.5,
      price: 287.43, weeklyPrices: [285.06, 290.90, 288.63, 282.01, 287.43], weeklyChange: 0.83, sortRank: 0, periodReturns: { '1M': -3.5, '6M': 58.2, '1Y': 43.9 },
      priceHistory: { '1W': [285.06, 290.9, 288.63, 282.01, 287.43], '1M': [297.76, 295.17, 306.34, 308.17, 302.73, 302.31, 304.88, 298.39, 309.21, 324.89, 317.45, 315.95, 305.68, 293.2, 308.12, 305.37, 285.06, 290.9, 288.63, 282.01, 287.43], '6M': [181.67, 176.19, 176.88, 177.17, 189.07, 189.59, 196.63, 225.21, 220.92, 223.32, 213.9, 202.39, 198.67, 194.45, 194.63, 194.14, 208.9, 216.29, 236.31, 269.22, 289.44, 306.34, 304.88, 315.95, 305.37, 287.43], '1Y': [199.69, 198.35, 206.31, 216.02, 221.25, 216.62, 184.99, 181.06, 185.91, 193.71, 200.71, 204.09, 187.93, 182.6, 179.37, 184.55, 180.32, 171.7, 176.58, 169.13, 160.51, 161.38, 162.23, 153.33, 168.27, 182.54, 179.42, 176.29, 175.69, 192.1, 188.53, 194.41, 196.63, 225.21, 220.92, 223.32, 213.9, 202.39, 198.67, 190.78, 196.77, 196.3, 214.98, 223.1, 282.23, 269.22, 289.44, 306.34, 304.88, 315.95, 305.37, 287.43] },
      velocityScore: { '1D': 1.4, '1W': 5.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$262B', pe: 49.2, revenueGrowth: 19, eps: 5.84, grossMargin: 57, dividendYield: 2.01,
      etfPresence: { SOXX: 3.45, PSI: false, XSD: 2.32, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.8, proScore: 1.4, coverage: 0.5,
      price: 289.53, weeklyPrices: [295.96, 301.14, 297.41, 285.56, 289.53], weeklyChange: -2.17, sortRank: 0, periodReturns: { '1M': -5.4, '6M': 24.9, '1Y': 33.2 },
      priceHistory: { '1W': [295.96, 301.14, 297.41, 285.56, 289.53], '1M': [305.99, 294.23, 298.41, 294.17, 291.5, 294.28, 310.15, 299.38, 316.47, 332.67, 329.24, 330.28, 321.35, 311.38, 323.62, 322.22, 295.96, 301.14, 297.41, 285.56, 289.53], '6M': [231.83, 222.08, 222.87, 223.88, 238.33, 230.7, 229.42, 220.66, 236.62, 237.33, 235.07, 216.37, 199.87, 194.02, 196.4, 196.86, 204.27, 209.39, 225.75, 289.25, 303.55, 298.41, 310.15, 330.28, 322.22, 289.53], '1Y': [217.41, 211.45, 218.3, 232.1, 228.92, 225.9, 223.29, 213.77, 205.91, 231.54, 223.93, 239.07, 226.74, 218.82, 224.05, 226.04, 228.89, 205.37, 214.35, 219.16, 206.38, 206.45, 201.22, 184.19, 194.94, 227.95, 228.16, 226.27, 220.46, 245.95, 239.09, 233.72, 229.42, 220.66, 236.62, 237.33, 235.07, 216.37, 199.87, 192.69, 197.61, 195.58, 205.67, 213.73, 241.16, 289.25, 303.55, 298.41, 310.15, 330.28, 322.22, 289.53] },
      velocityScore: { '1D': 0, '1W': 2.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$73B', pe: 27.7, revenueGrowth: 12, eps: 10.45, grossMargin: 56, dividendYield: 1.42,
      etfPresence: { SOXX: 3.26, PSI: false, XSD: 2.33, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.79, proScore: 1.4, coverage: 0.5,
      price: 1514.62, weeklyPrices: [1481.05, 1559.18, 1531.98, 1473.04, 1514.62], weeklyChange: 2.27, sortRank: 0, periodReturns: { '1M': -8.8, '6M': 54.3, '1Y': 110.1 },
      priceHistory: { '1W': [1481.05, 1559.18, 1531.98, 1473.04, 1514.62], '1M': [1661.1, 1599.52, 1650.35, 1613.97, 1550.02, 1468.11, 1553.27, 1561.25, 1589.81, 1662.98, 1620.17, 1633.17, 1566.21, 1542.39, 1624.99, 1652.6, 1481.05, 1559.18, 1531.98, 1473.04, 1514.62], '6M': [981.48, 929.48, 946.32, 955.03, 967.16, 1034.49, 1095.49, 1164.83, 1142.02, 1188.32, 1231.95, 1099.02, 1071.09, 1066.66, 1101.59, 1093.35, 1312.94, 1353, 1522.04, 1526.84, 1652.35, 1650.35, 1553.27, 1633.17, 1652.6, 1514.62], '1Y': [720.83, 693.24, 735.17, 758.64, 736.06, 725.24, 714.68, 711.24, 797.94, 848.81, 820.74, 858.46, 865.86, 834.14, 916.36, 887.55, 918.83, 904.44, 1004.65, 1074.91, 1087.56, 958.07, 924.29, 857.19, 928.17, 963.28, 946.51, 937.11, 930.04, 1005.38, 983.28, 1074.93, 1095.49, 1164.83, 1142.02, 1188.32, 1231.95, 1099.02, 1071.09, 1075.29, 1118.66, 1119.51, 1334.21, 1402.81, 1592.17, 1526.84, 1652.35, 1650.35, 1553.27, 1633.17, 1652.6, 1514.62] },
      velocityScore: { '1D': 0, '1W': 0.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$74B', pe: 108.3, revenueGrowth: 26, eps: 13.99, grossMargin: 55, dividendYield: 0.54,
      etfPresence: { SOXX: 3.34, PSI: false, XSD: 2.25, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.71, proScore: 1.35, coverage: 0.5,
      price: 251.2, weeklyPrices: [206.89, 222.27, 234.32, 237.68, 251.20], weeklyChange: 21.42, sortRank: 0, periodReturns: { '1M': 19.5, '6M': 62.6, '1Y': 250.6 },
      priceHistory: { '1W': [206.89, 222.27, 234.32, 237.68, 251.2], '1M': [210.22, 198.57, 189.36, 184.54, 172.17, 168.99, 182.98, 193.39, 218.41, 221.64, 221.23, 222.35, 236.03, 226.1, 229, 217.5, 206.89, 222.27, 234.32, 237.68, 251.2], '6M': [154.47, 138.57, 144.83, 140.24, 156.07, 153.22, 129.57, 111.31, 134.72, 127.91, 123.46, 102.54, 115.91, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 182.98, 222.35, 217.5, 251.2], '1Y': [71.64, 85.59, 95.05, 93.61, 98.52, 93.47, 101.22, 111.55, 119.78, 117.33, 110.86, 131.82, 140.82, 161.99, 169.56, 142.93, 143.87, 138.83, 143.61, 155.55, 166.62, 162.74, 142.95, 134.73, 177.6, 176.04, 143.91, 150.13, 144.7, 132.95, 161.38, 139.16, 129.57, 111.31, 134.72, 127.91, 123.46, 102.54, 115.91, 101.72, 103.91, 95.92, 107.93, 158.93, 185.54, 175.77, 198.29, 189.36, 182.98, 222.35, 217.5, 251.2] },
      velocityScore: { '1D': 4.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$46B', pe: 137.3, revenueGrowth: 157, eps: 1.83, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 2.06, PSI: false, XSD: 3.36, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 2.67, proScore: 1.34, coverage: 0.5,
      price: 112.91, weeklyPrices: [117.26, 120.90, 117.00, 110.17, 112.91], weeklyChange: -3.71, sortRank: 0, periodReturns: { '1M': 5.3, '6M': 101.7, '1Y': 118.1 },
      priceHistory: { '1W': [117.26, 120.9, 117, 110.17, 112.91], '1M': [107.24, 104.11, 115.71, 118.37, 113.11, 106.02, 110.21, 109.61, 116.2, 127, 124.89, 123.77, 120.62, 120.92, 128.64, 131.82, 117.26, 120.9, 117, 110.17, 112.91], '6M': [55.97, 54.34, 54.93, 58.69, 58.75, 60.06, 62.63, 59.43, 67.38, 70.66, 69.68, 62.53, 59.24, 60.98, 62.34, 61.92, 68.38, 72.43, 88.99, 98.86, 105.77, 115.71, 110.21, 123.77, 131.82, 112.91], '1Y': [51.78, 52.26, 53.65, 56.6, 59.73, 60.72, 56.92, 56.36, 47.59, 51.62, 48.81, 50.78, 49.11, 48.26, 51.07, 50.16, 49.27, 45.74, 52.53, 50.71, 50.85, 48.8, 48.13, 44.9, 50.24, 54.74, 54.96, 55.21, 54.02, 61.76, 59.41, 63.13, 62.63, 59.43, 67.38, 70.66, 69.68, 62.53, 59.24, 60.46, 63.1, 62.2, 68.49, 79.93, 97.78, 98.86, 105.77, 115.71, 110.21, 123.77, 131.82, 112.91] },
      velocityScore: { '1D': -2.2, '1W': -5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$44B', pe: 83, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.31, PSI: false, XSD: 3.04, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.34, proScore: 1.17, coverage: 0.5,
      price: 89.25, weeklyPrices: [88.34, 91.37, 91.47, 87.91, 89.25], weeklyChange: 1.03, sortRank: 0, periodReturns: { '1M': -9.9, '6M': 29.2, '1Y': 28.2 },
      priceHistory: { '1W': [88.34, 91.37, 91.47, 87.91, 89.25], '1M': [99.03, 97.7, 96.71, 97.04, 93.85, 91.81, 94.02, 91.11, 93.43, 98.05, 96.85, 96.04, 94.65, 91.52, 96.96, 96.3, 88.34, 91.37, 91.47, 87.91, 89.25], '6M': [69.09, 64.06, 64.94, 67.06, 73.39, 73.17, 75.16, 76.66, 76.86, 79.11, 75.47, 69.9, 65.79, 64.59, 65.63, 64.61, 70.73, 74.49, 82.48, 90.17, 102.92, 96.71, 94.02, 96.04, 96.3, 89.25], '1Y': [69.6, 68.02, 70.78, 73.06, 74.56, 74.78, 69.21, 67.59, 66.22, 65.99, 66.1, 65.25, 65.92, 64.7, 65.15, 64.42, 66.54, 60.41, 65.14, 63.17, 62.07, 59.35, 54.81, 49.02, 53.58, 65.81, 67.18, 64.91, 64.65, 74.87, 74.07, 76.2, 75.16, 76.66, 76.86, 79.11, 75.47, 69.9, 65.79, 64.71, 65.16, 65.38, 71.22, 76.87, 90.64, 90.17, 102.92, 96.71, 94.02, 96.04, 96.3, 89.25] },
      velocityScore: { '1D': -0.8, '1W': 4.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$48B', pe: 405.7, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 2.07,
      etfPresence: { SOXX: 2.5, PSI: false, XSD: 2.19, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.94, proScore: 0.97, coverage: 0.5,
      price: 367.53, weeklyPrices: [345.40, 361.86, 358.72, 354.40, 367.53], weeklyChange: 6.41, sortRank: 0, periodReturns: { '1M': 0.5, '6M': 93.6, '1Y': 179.9 },
      priceHistory: { '1W': [345.4, 361.86, 358.72, 354.4, 367.53], '1M': [365.88, 362.76, 381.55, 383.56, 375.6, 358.98, 375.71, 380.45, 385.98, 409.68, 400.66, 391.09, 364.64, 353.79, 382.35, 382.74, 345.4, 361.86, 358.72, 354.4, 367.53], '6M': [189.86, 171.47, 175.01, 170.76, 197.55, 221.7, 219.2, 226.71, 230.54, 246.76, 253.37, 239, 222.55, 221.29, 237.23, 222.07, 247, 261.16, 277, 269.63, 309.81, 381.55, 375.71, 391.09, 382.74, 367.53], '1Y': [131.3, 134.32, 142.23, 140.68, 136.2, 142.11, 137.67, 137.14, 127.75, 125.4, 123.58, 133.89, 129.86, 131.87, 127.12, 129.39, 127.41, 122.18, 136.82, 140.85, 150.61, 166.92, 162.24, 155.39, 174.99, 184.1, 177.35, 174.42, 173.71, 171.77, 213.52, 226.25, 219.2, 226.71, 230.54, 246.76, 253.37, 239, 222.55, 218.89, 245.04, 229.36, 247.71, 261.42, 284.4, 269.63, 309.81, 381.55, 375.71, 391.09, 382.74, 367.53] },
      velocityScore: { '1D': 2.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$28B', pe: 157.1, revenueGrowth: 23, eps: 2.34, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.27, PSI: false, XSD: 2.6, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RMBS', name: 'RAMBUS INC', easyScore: 2, avgWeight: 1.61, proScore: 0.81, coverage: 0.5,
      price: 144.13, weeklyPrices: [145.31, 152.03, 146.84, 138.12, 144.13], weeklyChange: -0.81, sortRank: 0, periodReturns: { '1M': 7.2, '6M': 36, '1Y': 135.5 },
      priceHistory: { '1W': [145.31, 152.03, 146.84, 138.12, 144.13], '1M': [134.51, 130.28, 134.85, 130.46, 127.05, 122.03, 133.56, 141.82, 142.98, 157.23, 148.66, 148.02, 145.46, 147.48, 166.78, 169.35, 145.31, 152.03, 146.84, 138.12, 144.13], '6M': [106.01, 91.49, 94.11, 97.5, 92.9, 110.1, 115.71, 98.45, 106.99, 104.34, 101.09, 92.04, 92.53, 93.5, 92.69, 86.03, 101.43, 120.02, 131.55, 112.16, 130.04, 134.85, 133.56, 148.02, 169.35, 144.13], '1Y': [61.21, 60.55, 62.52, 65.89, 64.06, 68.21, 62.85, 73.93, 71.95, 76, 70.44, 81.09, 74.81, 86.03, 102.35, 102.62, 99.99, 89.57, 96.26, 105.42, 107.75, 106.49, 92.37, 87.28, 95.57, 101.6, 94.23, 96.4, 93.57, 97, 95.48, 125.93, 115.71, 98.45, 106.99, 104.34, 101.09, 92.04, 92.53, 93.32, 95.93, 89.95, 105.58, 120.03, 138.5, 112.16, 130.04, 134.85, 133.56, 148.02, 169.35, 144.13] },
      velocityScore: { '1D': -2.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$16B', pe: 68.6, revenueGrowth: 8, eps: 2.1, grossMargin: 80, dividendYield: null,
      etfPresence: { SOXX: 0.79, PSI: false, XSD: 2.44, DRAM: false },
      tonyNote: 'RAMBUS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 7, avgWeight: 4.27, proScore: 2.3, coverage: 0.538,
      price: 202.03, weeklyPrices: [205.10, 208.64, 208.19, 200.42, 202.03], weeklyChange: -1.5, sortRank: 0, periodReturns: { '1M': -7.9, '6M': 11.7, '1Y': 41.4 },
      priceHistory: { '1W': [205.1, 208.64, 208.19, 200.42, 202.03], '1M': [219.44, 220.78, 225.83, 235.74, 225.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 218.66, 205.1, 208.64, 208.19, 200.42, 202.03], '6M': [180.93, 174.14, 190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 186.03, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 214.25, 218.66, 202.03], '1Y': [142.83, 145.48, 155.02, 159.34, 164.92, 172.41, 173.5, 177.87, 180.77, 182.02, 174.98, 180.17, 167.02, 177.82, 176.67, 178.19, 187.62, 183.16, 183.22, 186.26, 202.89, 188.08, 186.86, 180.64, 177, 182.41, 175.02, 180.99, 188.22, 187.24, 185.81, 183.32, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 186.03, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 209.25, 207.83, 225.83, 223.47, 214.25, 218.66, 202.03] },
      velocityScore: { '1D': 6.5, '1W': 0.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.9T', pe: 30.9, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.5,
      etfPresence: { PTF: 4.54, WCLD: false, IGV: false, FDTX: 4.62, GTEK: false, ARKK: 1.75, MARS: false, FRWD: 8.25, BCTK: 6.6, FWD: 2.04, CBSE: false, FCUS: false, WGMI: 2.1 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 6, avgWeight: 4.7, proScore: 2.17, coverage: 0.462,
      price: 904.56, weeklyPrices: [864.01, 949.28, 935.89, 891.88, 904.56], weeklyChange: 4.69, sortRank: 0, periodReturns: { '1M': 13.7, '6M': 250, '1Y': 679.6 },
      priceHistory: { '1W': [864.01, 949.28, 935.89, 891.88, 904.56], '1M': [795.33, 766.58, 803.63, 776.01, 724.66, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 996, 864.01, 949.28, 935.89, 891.88, 904.56], '6M': [258.46, 248.55, 284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 996, 904.56], '1Y': [116.03, 121.82, 126, 122.29, 124.53, 114.39, 111.26, 109.14, 111.87, 125.29, 115.79, 122, 131.37, 157.23, 162.73, 157.27, 187.83, 181.6, 202.38, 219.02, 224.01, 238.33, 236.95, 201.37, 236.48, 237.22, 241.14, 265.92, 294.37, 343.43, 338.13, 389.11, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 518.46, 666.59, 803.63, 731.99, 923.52, 996, 904.56] },
      velocityScore: { '1D': 0.9, '1W': -15.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.0T', pe: 42.6, revenueGrowth: 196, eps: 21.23, grossMargin: 58, dividendYield: 0.07,
      etfPresence: { PTF: 4.73, WCLD: false, IGV: false, FDTX: 9.36, GTEK: false, ARKK: false, MARS: false, FRWD: 4.49, BCTK: 4.22, FWD: 1.37, CBSE: false, FCUS: 4.05, WGMI: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 5, avgWeight: 4.44, proScore: 1.71, coverage: 0.385,
      price: 414.15, weeklyPrices: [415.17, 426.80, 427.92, 408.75, 414.15], weeklyChange: -0.24, sortRank: 0, periodReturns: { '1M': 2.4, '6M': 35.9, '1Y': 93.4 },
      priceHistory: { '1W': [415.17, 426.8, 427.92, 408.75, 414.15], '1M': [404.54, 397.28, 399.8, 417.72, 404.35, 392.61, 401.62, 407.15, 404.52, 412.32, 422.73, 424.86, 418.45, 435.63, 446.69, 444.92, 415.17, 426.8, 427.92, 408.75, 414.15], '6M': [304.85, 284.68, 302.84, 322.25, 331.77, 327.16, 338.34, 335.75, 361.91, 362.26, 387.73, 357.44, 354.56, 345.98, 343.25, 337.95, 365.9, 375.1, 387.44, 393.83, 419.5, 399.8, 401.62, 424.86, 444.92, 414.15], '1Y': [214.1, 213.5, 224.01, 234.8, 230.4, 240.4, 245.6, 241.62, 242.62, 241, 227.33, 238.27, 243.41, 259.33, 264.87, 273.36, 292.19, 280.66, 295.08, 294.96, 303.22, 289.24, 282.2, 277.5, 291.51, 294.72, 292.04, 288.95, 300.92, 327.43, 331.21, 326.12, 338.34, 335.75, 361.91, 362.26, 387.73, 357.44, 354.56, 339.57, 347.75, 341.49, 365.49, 363.35, 382.66, 393.83, 419.5, 399.8, 401.62, 424.86, 444.92, 414.15] },
      velocityScore: { '1D': 0, '1W': -8.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.1T', pe: 35.5, revenueGrowth: 35, eps: 11.65, grossMargin: 62, dividendYield: 0.93,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6, GTEK: false, ARKK: 1, MARS: false, FRWD: 6, BCTK: 8.6, FWD: false, CBSE: false, FCUS: false, WGMI: 0.61 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 5, avgWeight: 4.2, proScore: 1.61, coverage: 0.385,
      price: 466.12, weeklyPrices: [466.38, 490.33, 475.51, 452.40, 466.12], weeklyChange: -0.06, sortRank: 0, periodReturns: { '1M': 1.6, '6M': 110.5, '1Y': 284.8 },
      priceHistory: { '1W': [466.38, 490.33, 475.51, 452.4, 466.12], '1M': [458.79, 448.29, 445.5, 449.7, 424.1, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 523.2, 466.38, 490.33, 475.51, 452.4, 466.12], '6M': [221.43, 201.06, 214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 204.83, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 518.09, 523.2, 466.12], '1Y': [121.14, 126.79, 143.68, 137.91, 146.42, 156.99, 166.47, 176.31, 172.4, 180.95, 163.71, 168.58, 151.14, 158.57, 157.39, 159.46, 164.67, 214.9, 233.08, 252.92, 254.84, 237.7, 247.96, 206.02, 217.53, 217.97, 210.78, 213.43, 215.61, 214.35, 220.97, 249.8, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 204.83, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 337.11, 421.39, 445.5, 447.58, 518.09, 523.2, 466.12] },
      velocityScore: { '1D': -2.4, '1W': 10.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$760B', pe: 155.9, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.64, MARS: false, FRWD: 7.47, BCTK: 3.65, FWD: 2.03, CBSE: false, FCUS: 3.2, WGMI: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 5, avgWeight: 3.23, proScore: 1.24, coverage: 0.385,
      price: 374.98, weeklyPrices: [385.73, 396.60, 392.16, 372.10, 374.98], weeklyChange: -2.79, sortRank: 0, periodReturns: { '1M': -12.5, '6M': -7.7, '1Y': 48.3 },
      priceHistory: { '1W': [385.73, 396.6, 392.16, 372.1, 374.98], '1M': [428.43, 419.3, 416.79, 439.79, 425.19, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 418.91, 385.73, 396.6, 392.16, 372.1, 374.98], '6M': [406.37, 329.88, 352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 341.57, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 417.76, 426.58, 418.91, 374.98], '1Y': [252.91, 251.26, 270.17, 275.18, 274.38, 283.34, 290.18, 293.7, 303.76, 311.23, 289.6, 308.65, 334.89, 359.87, 344.94, 334.53, 338.37, 324.63, 349.33, 354.13, 376.47, 355.59, 339.98, 346.82, 402.96, 390.24, 359.93, 340.36, 349.39, 343.77, 354.61, 328.8, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 341.57, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 405.45, 425.44, 416.79, 417.76, 426.58, 418.91, 374.98] },
      velocityScore: { '1D': -1.6, '1W': -10.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 62.2, revenueGrowth: 48, eps: 6.03, grossMargin: 76, dividendYield: 0.7,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.79, GTEK: false, ARKK: 1.16, MARS: false, FRWD: 4.28, BCTK: 7.42, FWD: 2.5, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, avgWeight: 5.48, proScore: 1.69, coverage: 0.308,
      price: 826.31, weeklyPrices: [847.47, 876.77, 846.01, 815.99, 826.31], weeklyChange: -2.5, sortRank: 0, periodReturns: { '1M': -0.9, '6M': 168.4, '1Y': 553.3 },
      priceHistory: { '1W': [847.47, 876.77, 846.01, 815.99, 826.31], '1M': [834.01, 808.8, 817.35, 804.76, 795.47, 733.35, 751.07, 810.46, 812.73, 845.76, 870.66, 880.72, 879.8, 921.26, 926.61, 925.99, 847.47, 876.77, 846.01, 815.99, 826.31], '6M': [307.85, 292, 286.22, 289.83, 321.48, 325.99, 371.76, 444.45, 396.23, 424.14, 421.85, 375.01, 385.97, 421.09, 424.96, 391.76, 496.3, 519.6, 579.88, 643.3, 786.42, 817.35, 751.07, 880.72, 925.99, 826.31], '1Y': [126.49, 131.3, 140.69, 149.44, 147.18, 149.07, 150.89, 157.01, 148.1, 155.73, 154.6, 172.38, 188.16, 195.99, 221.23, 217.51, 252.79, 214.38, 225.4, 234.12, 268.34, 278.47, 262.56, 240.5, 276.69, 278.79, 287.64, 296.36, 281.3, 330.42, 318.44, 344.22, 371.76, 444.45, 396.23, 424.14, 421.85, 375.01, 385.97, 406.77, 413.22, 423.12, 500.77, 531.81, 587.62, 643.3, 786.42, 817.35, 751.07, 880.72, 925.99, 826.31] },
      velocityScore: { '1D': -4.5, '1W': -15.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$187B', pe: 78.5, revenueGrowth: 44, eps: 10.53, grossMargin: 42, dividendYield: 0.36,
      etfPresence: { PTF: 4.67, WCLD: false, IGV: false, FDTX: 4.04, GTEK: false, ARKK: false, MARS: false, FRWD: 9, BCTK: false, FWD: false, CBSE: false, FCUS: 4.22, WGMI: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 4, avgWeight: 4.46, proScore: 1.37, coverage: 0.308,
      price: 494, weeklyPrices: [511.72, 526.93, 517.72, 490.09, 494.00], weeklyChange: -3.46, sortRank: 0, periodReturns: { '1M': -4.2, '6M': 163.9, '1Y': 787.4 },
      priceHistory: { '1W': [511.72, 526.93, 517.72, 490.09, 494], '1M': [515.83, 488.74, 494.09, 489.15, 482.02, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 575.5, 511.72, 526.93, 517.72, 490.09, 494], '6M': [187.2, 175.01, 181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 268.81, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 459.62, 531.18, 575.5, 494], '1Y': [55.67, 59.19, 63.51, 66.08, 66.14, 68, 68.82, 78.69, 74.44, 76.24, 74.66, 82.04, 92.04, 97.66, 106.63, 106.88, 131.31, 115.42, 126.2, 129.43, 138.13, 163.6, 157.16, 140.23, 163.33, 168.89, 176.34, 181.08, 179.68, 219.38, 214, 241.9, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 268.81, 304.9, 296.14, 297.73, 337.88, 361.69, 403.12, 412.76, 483.15, 494.09, 459.62, 531.18, 575.5, 494] },
      velocityScore: { '1D': 28, '1W': -2.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$170B', pe: 29.6, revenueGrowth: 46, eps: 16.71, grossMargin: 45, dividendYield: 0.12,
      etfPresence: { PTF: 4.6, WCLD: false, IGV: false, FDTX: 4, GTEK: false, ARKK: false, MARS: false, FRWD: 5.16, BCTK: false, FWD: false, CBSE: false, FCUS: 4.06, WGMI: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 4, avgWeight: 4.22, proScore: 1.3, coverage: 0.308,
      price: 338.85, weeklyPrices: [303.28, 324.45, 327.16, 321.80, 338.85], weeklyChange: 11.73, sortRank: 0, periodReturns: { '1M': 14.5, '6M': 100.8, '1Y': 272.6 },
      priceHistory: { '1W': [303.28, 324.45, 327.16, 321.8, 338.85], '1M': [296.05, 289.24, 295.44, 299.15, 284.72, 273.38, 292.09, 302.24, 305.35, 322.68, 318.93, 318, 318.18, 317.12, 334.41, 336.41, 303.28, 324.45, 327.16, 321.8, 338.85], '6M': [168.71, 164.7, 178.07, 194.76, 220.4, 222.41, 238.46, 230.1, 226.61, 240.09, 249.48, 222.99, 218.87, 226.47, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 295.44, 292.09, 318, 336.41, 338.85], '1Y': [90.95, 92.24, 96.84, 98.81, 101.73, 100.66, 96.96, 94.84, 99.15, 107.38, 98.41, 104.09, 102.95, 116.96, 126.92, 128.33, 145.81, 131.37, 141.51, 151.68, 161.01, 162.19, 153.32, 139.59, 156, 158.7, 160.52, 172.27, 175.87, 206.96, 214.38, 228.39, 238.46, 230.1, 226.61, 240.09, 249.48, 222.99, 218.87, 224.71, 233.45, 222.01, 258.76, 260.96, 258.56, 248.75, 297.17, 295.44, 292.09, 318, 336.41, 338.85] },
      velocityScore: { '1D': 0.8, '1W': 5.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$424B', pe: 64.2, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.32,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.85, BCTK: 6.54, FWD: 1.79, CBSE: 2.7, FCUS: false, WGMI: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 4, avgWeight: 3.69, proScore: 1.13, coverage: 0.308,
      price: 237.39, weeklyPrices: [246.03, 245.22, 244.19, 238.00, 237.39], weeklyChange: -3.51, sortRank: 0, periodReturns: { '1M': -11.7, '6M': 3.1, '1Y': 11.3 },
      priceHistory: { '1W': [246.03, 245.22, 244.19, 238, 237.39], '1M': [268.99, 265.82, 270.13, 267.22, 264.14, 259.34, 265.01, 268.46, 266.32, 265.29, 271.85, 274, 270.64, 261.26, 256.52, 253.79, 246.03, 245.22, 244.19, 238, 237.39], '6M': [230.28, 226.76, 232.52, 233.06, 246.47, 231, 244.68, 238.62, 206.96, 204.79, 210.64, 216.82, 212.65, 215.2, 207.24, 208.27, 221.25, 248.5, 255.36, 263.04, 274.99, 270.13, 265.01, 274, 253.79, 237.39], '1Y': [213.2, 212.52, 217.12, 223.41, 225.02, 226.13, 231.44, 234.11, 223.13, 230.98, 221.95, 231.6, 232.33, 228.15, 231.48, 219.78, 219.51, 216.37, 213.04, 224.21, 222.86, 243.04, 237.58, 217.14, 233.22, 229.53, 226.19, 227.35, 232.07, 240.93, 242.6, 231.31, 244.68, 238.62, 206.96, 204.79, 210.64, 216.82, 212.65, 209.87, 211.71, 210.57, 233.65, 249.7, 255.08, 263.04, 274.99, 270.13, 265.01, 274, 253.79, 237.39] },
      velocityScore: { '1D': -9.6, '1W': -8.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 31.6, revenueGrowth: 17, eps: 7.52, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.01, GTEK: false, ARKK: 2.6, MARS: false, FRWD: 3.48, BCTK: 4.65, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 3.03, proScore: 0.93, coverage: 0.308,
      price: 105.47, weeklyPrices: [109.54, 110.78, 110.42, 108.20, 105.47], weeklyChange: -3.72, sortRank: 0, periodReturns: { '1M': 2.9, '6M': -36, '1Y': -7.6 },
      priceHistory: { '1W': [109.54, 110.78, 110.42, 108.2, 105.47], '1M': [102.54, 99.84, 95.4, 97.42, 100.28, 101.01, 105.01, 104.86, 103, 104.9, 106.6, 115.03, 118.71, 124.12, 117.01, 116.04, 109.54, 110.78, 110.42, 108.2, 105.47], '6M': [164.75, 166.8, 170.83, 166.21, 167.93, 144.5, 137.5, 119.29, 127.24, 121.64, 120.31, 129.65, 129.52, 127.8, 116.15, 118.62, 120.1, 127.41, 131.96, 121.26, 105.44, 95.4, 105.01, 115.03, 116.04, 105.47], '1Y': [114.13, 105.97, 113.07, 116.52, 112.11, 127.07, 124.43, 122.21, 151.07, 144.27, 136.68, 141.54, 146.82, 143.38, 153.3, 140.25, 161.14, 151.02, 157.76, 172.95, 173.61, 156.05, 146.34, 144.56, 158.64, 161.08, 164.19, 169.57, 167.88, 168.45, 167.44, 138.54, 137.5, 119.29, 127.24, 121.64, 120.31, 129.65, 129.52, 123.75, 118.42, 118.52, 112.38, 126.94, 124.23, 121.26, 105.44, 95.4, 105.01, 115.03, 116.04, 105.47] },
      velocityScore: { '1D': 0, '1W': -1.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$137B', pe: 103.4, revenueGrowth: 34, eps: 1.02, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.89, GTEK: false, ARKK: 4.49, MARS: false, FRWD: 1.99, BCTK: 2.74, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 13 Broad Tech ETFs (31% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NET', name: 'Cloudflare', easyScore: 4, avgWeight: 1.87, proScore: 0.57, coverage: 0.308,
      price: 219.59, weeklyPrices: [250.11, 247.79, 236.13, 219.67, 219.59], weeklyChange: -12.2, sortRank: 0, periodReturns: { '1M': 13.5, '6M': 5.6, '1Y': 22.2 },
      priceHistory: { '1W': [250.11, 247.79, 236.13, 219.67, 219.59], '1M': [193.52, 186.79, 192.62, 199.81, 197.56, 206.73, 210.13, 212.65, 216.17, 217.54, 209.22, 228.11, 241.82, 270.82, 272.66, 268.64, 250.11, 247.79, 236.13, 219.67, 219.59], '6M': [207.95, 193.83, 202.39, 197.66, 186.39, 177.42, 205.95, 170.31, 179.98, 191.44, 171.8, 185.89, 213, 211.52, 213.15, 206.34, 211.25, 190.13, 207.56, 211.97, 248.59, 192.62, 210.13, 228.11, 268.64, 219.59], '1Y': [179.71, 181.4, 190.96, 191.27, 181.39, 197.35, 198.42, 207.68, 210.44, 195.38, 192.77, 213.42, 214.43, 221.32, 225.94, 216.34, 216.67, 213.82, 210.01, 217.85, 222.5, 225.9, 213.54, 191.39, 200.21, 200.95, 202.44, 195.68, 200.7, 198, 188.71, 169.97, 205.95, 170.31, 179.98, 191.44, 171.8, 185.89, 213, 225.48, 218, 205.43, 193.05, 197.38, 205, 211.97, 248.59, 192.62, 210.13, 228.11, 268.64, 219.59] },
      velocityScore: { '1D': -1.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$78B', pe: null, revenueGrowth: 34, eps: -0.24, grossMargin: 73, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 1.87, IGV: false, FDTX: 2.05, GTEK: 2.12, ARKK: false, MARS: false, FRWD: false, BCTK: 1.43, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Cloudflare appears in 4 of 13 Broad Tech ETFs (31% coverage) with average weight 1.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 3, avgWeight: 5.21, proScore: 1.2, coverage: 0.231,
      price: 391.28, weeklyPrices: [416.67, 411.74, 403.41, 397.36, 391.28], weeklyChange: -6.09, sortRank: 0, periodReturns: { '1M': -5.2, '6M': -19.1, '1Y': -17.2 },
      priceHistory: { '1W': [416.67, 411.74, 403.41, 397.36, 391.28], '1M': [412.66, 407.77, 405.21, 409.43, 421.92, 417.42, 421.06, 419.09, 418.57, 416.03, 412.67, 426.99, 450.24, 460.52, 441.31, 428.05, 416.67, 411.74, 403.41, 397.36, 391.28], '6M': [483.47, 483.98, 487.71, 472.85, 477.18, 454.52, 480.58, 411.21, 413.27, 399.6, 400.6, 405.2, 404.88, 399.41, 372.74, 370.17, 374.33, 411.22, 432.92, 424.46, 413.96, 405.21, 421.06, 426.99, 428.05, 391.28], '1Y': [472.62, 480.24, 497.45, 498.84, 503.32, 510.05, 513.71, 533.5, 520.84, 522.48, 504.24, 509.64, 495, 509.9, 517.93, 511.46, 517.35, 510.96, 513.58, 523.61, 525.76, 497.1, 503.29, 478.43, 492.01, 483.16, 478.53, 485.92, 487.1, 478.51, 470.67, 444.11, 480.58, 411.21, 413.27, 399.6, 400.6, 405.2, 404.88, 391.79, 371.04, 369.37, 373.07, 420.26, 415.75, 424.46, 413.96, 405.21, 421.06, 426.99, 428.05, 391.28] },
      velocityScore: { '1D': 0, '1W': -0.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 23.3, revenueGrowth: 18, eps: 16.81, grossMargin: 68, dividendYield: 0.92,
      etfPresence: { PTF: false, WCLD: false, IGV: 7.84, FDTX: 3.79, GTEK: false, ARKK: false, MARS: false, FRWD: 4.01, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 3, avgWeight: 4.88, proScore: 1.13, coverage: 0.231,
      price: 382.15, weeklyPrices: [391.00, 408.95, 396.68, 381.59, 382.15], weeklyChange: -2.26, sortRank: 0, periodReturns: { '1M': -14.1, '6M': -14.5, '1Y': 17.1 },
      priceHistory: { '1W': [391, 408.95, 396.68, 381.59, 382.15], '1M': [445, 433.45, 445.27, 443.3, 422.24, 404.11, 417.26, 417.85, 426.01, 433.59, 440.36, 442.1, 435.79, 415.88, 423.74, 418.45, 391, 408.95, 396.68, 381.59, 382.15], '6M': [446.89, 483.37, 475.19, 451.67, 448.96, 419.25, 430.9, 421.96, 425.21, 411.32, 417.4, 405.94, 407.82, 399.27, 383.03, 371.75, 343.25, 391.95, 387.51, 372.8, 398.73, 445.27, 417.26, 442.1, 418.45, 382.15], '1Y': [326.43, 322.05, 325.78, 315.35, 313.51, 329.65, 316.06, 308.27, 322.27, 335.58, 320.11, 345.98, 350.84, 395.94, 426.07, 440.4, 429.83, 413.49, 439.31, 433.72, 440.1, 445.91, 401.99, 395.23, 430.17, 455, 458.96, 481.2, 459.64, 432.96, 447.2, 431.44, 430.9, 421.96, 425.21, 411.32, 417.4, 405.94, 407.82, 392.78, 385.95, 381.26, 345.62, 388.9, 373.72, 372.8, 398.73, 445.27, 417.26, 442.1, 418.45, 382.15] },
      velocityScore: { '1D': 0, '1W': -1.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 344.3, revenueGrowth: 16, eps: 1.11, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 10.15, MARS: false, FRWD: false, BCTK: 3.39, FWD: 1.09, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 3, avgWeight: 4.64, proScore: 1.07, coverage: 0.231,
      price: 260.06, weeklyPrices: [272.05, 266.33, 260.52, 263.22, 260.06], weeklyChange: -4.41, sortRank: 0, periodReturns: { '1M': 21.7, '6M': 36.6, '1Y': 33.8 },
      priceHistory: { '1W': [272.05, 266.33, 260.52, 263.22, 260.06], '1M': [213.66, 215.6, 227.79, 238.21, 242.83, 240.13, 246.66, 252.92, 260.58, 256.75, 248.47, 257.77, 281.69, 300.48, 297.18, 279.25, 272.05, 266.33, 260.52, 263.22, 260.06], '6M': [190.36, 185.88, 188.45, 182.12, 188.88, 184.06, 183.5, 166.24, 165.51, 152.35, 144.84, 158.56, 164.93, 169.19, 157.21, 160.32, 173.78, 164.11, 181.2, 181.54, 183.68, 227.79, 246.66, 257.77, 279.25, 260.06], '1Y': [194.39, 199.78, 202.34, 201.82, 187.39, 195.78, 203.27, 173.6, 168.1, 173.55, 183.32, 191.02, 194.46, 196.29, 208.19, 202.37, 207.19, 208.55, 207.89, 217.11, 218.27, 211.37, 204.77, 185.07, 190.13, 198.84, 191.69, 186.88, 186.85, 185.86, 190.85, 181.47, 183.5, 166.24, 165.51, 152.35, 144.84, 158.56, 164.93, 168.91, 153.22, 160.67, 166.99, 166.97, 173.21, 181.54, 183.68, 227.79, 246.66, 257.77, 279.25, 260.06] },
      velocityScore: { '1D': -6.1, '1W': 0.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$212B', pe: 224.2, revenueGrowth: 31, eps: 1.16, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.39, IGV: 7.86, FDTX: 3.67, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 3, avgWeight: 4.26, proScore: 0.98, coverage: 0.231,
      price: 127.8, weeklyPrices: [135.53, 136.47, 132.07, 130.21, 127.80], weeklyChange: -5.7, sortRank: 0, periodReturns: { '1M': -6.6, '6M': -31.9, '1Y': -6.3 },
      priceHistory: { '1W': [135.53, 136.47, 132.07, 130.21, 127.8], '1M': [136.89, 136, 130.05, 133.73, 133.99, 135.26, 137.15, 137.41, 136.88, 136.6, 132.51, 143.34, 156.54, 160.65, 152.17, 141.7, 135.53, 136.47, 132.07, 130.21, 127.8], '6M': [187.54, 185.69, 188.71, 174.04, 179.41, 168.53, 165.7, 157.88, 139.51, 135.38, 134.19, 153.19, 151.6, 155.08, 154.78, 146.28, 140.76, 142.15, 152.62, 137.97, 133.79, 130.05, 137.15, 143.34, 141.7, 127.8], '1Y': [136.39, 139.96, 144.25, 134.36, 142.1, 153.52, 158.8, 158.35, 182.2, 181.02, 156.18, 158.12, 153.11, 171.43, 182.39, 177.57, 173.07, 175.44, 178.15, 184.63, 194.55, 175.05, 172.14, 155.74, 168.45, 181.76, 183.57, 193.38, 184.18, 179.71, 178.96, 165.33, 165.7, 157.88, 139.51, 135.38, 134.19, 153.19, 151.6, 152.77, 154.96, 146.49, 130.49, 142.76, 141.57, 137.97, 133.79, 130.05, 137.15, 143.34, 141.7, 127.8] },
      velocityScore: { '1D': 0, '1W': -1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$306B', pe: 143.6, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 6.86, FDTX: 2.87, GTEK: false, ARKK: 3.06, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 3, avgWeight: 3.86, proScore: 0.89, coverage: 0.231,
      price: 348.56, weeklyPrices: [365.76, 361.17, 362.29, 353.32, 348.56], weeklyChange: -4.7, sortRank: 0, periodReturns: { '1M': -9.9, '6M': 11.1, '1Y': 95 },
      priceHistory: { '1W': [365.76, 361.17, 362.29, 353.32, 348.56], '1M': [386.77, 383.82, 399.04, 397.17, 393.32, 384.9, 384.9, 383.47, 379.38, 384.84, 384.83, 386.12, 376.43, 372.58, 358.39, 369.27, 365.76, 361.17, 362.29, 353.32, 348.56], '6M': [313.7, 303.75, 314.96, 317.32, 332.73, 322.16, 335, 340.7, 318.63, 303.94, 313.03, 303.45, 308.42, 309.41, 289.2, 286.86, 314.74, 334.47, 337.73, 347.31, 395.14, 399.04, 384.9, 386.12, 369.27, 348.56], '1Y': [178.79, 173.98, 174.43, 180.55, 181.31, 185.94, 194.08, 192.86, 197.28, 203.82, 200.62, 212.37, 235.17, 241.38, 255.24, 247.18, 246.45, 237.49, 253.79, 260.51, 281.9, 285.34, 279.12, 289.98, 320.12, 322.09, 310.52, 308.61, 314.39, 314.55, 336.43, 328.38, 335, 340.7, 318.63, 303.94, 313.03, 303.45, 308.42, 306.3, 289.59, 294.9, 316.37, 332.77, 337.75, 347.31, 395.14, 399.04, 384.9, 386.12, 369.27, 348.56] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.3T', pe: 26.6, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.66, GTEK: false, ARKK: 1.96, MARS: false, FRWD: false, BCTK: 5.97, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Alphabet Inc Class C appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 3.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRWD', name: 'CrowdStrike', easyScore: 3, avgWeight: 3.21, proScore: 0.74, coverage: 0.231,
      price: 650.17, weeklyPrices: [671.02, 658.79, 644.93, 647.74, 650.17], weeklyChange: -3.11, sortRank: 0, periodReturns: { '1M': 19.9, '6M': 25.6, '1Y': 36.3 },
      priceHistory: { '1W': [671.02, 658.79, 644.93, 647.74, 650.17], '1M': [542.26, 546.18, 562.57, 579.95, 594.08, 616.88, 650.11, 648.23, 663.46, 671.55, 645.36, 671, 731, 782.17, 768.95, 719.09, 671.02, 658.79, 644.93, 647.74, 650.17], '6M': [517.65, 477.26, 481.19, 456.55, 466.99, 442.73, 476.66, 421.73, 413.39, 415.76, 363.31, 407.68, 442.03, 433.2, 392.99, 390.41, 426.51, 411.16, 466.68, 452.38, 468.07, 562.57, 650.11, 671, 719.09, 650.17], '1Y': [476.98, 485.16, 505.22, 514.1, 478.45, 475.96, 467.92, 454.57, 425, 424.86, 414.06, 442, 417.63, 436.1, 502.55, 481.42, 489.88, 493.66, 484.65, 527.32, 538.68, 532.52, 529.78, 501.31, 509.16, 512.03, 504.78, 481.28, 475.91, 458.32, 468.02, 445.88, 476.66, 421.73, 413.39, 415.76, 363.31, 407.68, 442.03, 435.81, 385.86, 393.31, 394.68, 418.2, 445.39, 452.38, 468.07, 562.57, 650.11, 671, 719.09, 650.17] },
      velocityScore: { '1D': 1.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$166B', pe: null, revenueGrowth: 26, eps: -0.13, grossMargin: 75, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.27, IGV: 6.11, FDTX: 1.24, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'CrowdStrike appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 3.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASML', name: 'ASML Holding', easyScore: 3, avgWeight: 2.97, proScore: 0.69, coverage: 0.231,
      price: 1792.53, weeklyPrices: [1641.74, 1749.04, 1777.77, 1734.19, 1792.53], weeklyChange: 9.18, sortRank: 0, periodReturns: { '1M': 14.5, '6M': 59.6, '1Y': 128.6 },
      priceHistory: { '1W': [1641.74, 1749.04, 1777.77, 1734.19, 1792.53], '1M': [1565.81, 1520.94, 1581.58, 1584.51, 1501.81, 1459.44, 1550.13, 1592, 1632.9, 1632.03, 1597.87, 1605.77, 1612.76, 1628.57, 1705.37, 1757.47, 1641.74, 1749.04, 1777.77, 1734.19, 1792.53], '6M': [1122.84, 1036.31, 1072.75, 1228.19, 1281.23, 1326.07, 1454.59, 1395.88, 1413.62, 1468.72, 1526.51, 1399.37, 1386.68, 1389.16, 1399.42, 1320.83, 1421.05, 1481.77, 1443.66, 1394.08, 1544.74, 1581.58, 1550.13, 1605.77, 1757.47, 1792.53], '1Y': [784.09, 761.64, 798.09, 794.5, 801.93, 734.58, 711.25, 694.71, 713.12, 755.21, 735.4, 763.46, 781.7, 813.87, 932.15, 951.52, 1032.22, 936.19, 1029.27, 1033.1, 1075.45, 1029.2, 1019.86, 981.04, 1060, 1099.47, 1080.85, 1056.02, 1066, 1242.19, 1270.16, 1360.09, 1454.59, 1395.88, 1413.62, 1468.72, 1526.51, 1399.37, 1386.68, 1355.17, 1393.89, 1359.76, 1448.64, 1410.83, 1417.8, 1394.08, 1544.74, 1581.58, 1550.13, 1605.77, 1757.47, 1792.53] },
      velocityScore: { '1D': 1.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$691B', pe: 60.1, revenueGrowth: 13, eps: 29.83, grossMargin: 53, dividendYield: 0.51,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.21, BCTK: 2.12, FWD: 1.58, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'ASML Holding appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CDNS', name: 'CADENCE DESIGN SYSTEMS INC', easyScore: 3, avgWeight: 2.87, proScore: 0.66, coverage: 0.231,
      price: 381.23, weeklyPrices: [376.19, 394.24, 390.90, 385.13, 381.23], weeklyChange: 1.34, sortRank: 0, periodReturns: { '1M': 4.7, '6M': 13.7, '1Y': 24.1 },
      priceHistory: { '1W': [376.19, 394.24, 390.9, 385.13, 381.23], '1M': [364.2, 358.04, 354.55, 352.84, 347.24, 338.12, 350.89, 358.46, 373.59, 381.75, 374.05, 373.85, 374.93, 414.16, 416.39, 411.68, 376.19, 394.24, 390.9, 385.13, 381.23], '6M': [335.43, 315.1, 318.89, 301.22, 325.51, 307, 318.37, 268.5, 299, 305.01, 301.84, 305.43, 294.16, 293.75, 284.32, 277.87, 289.5, 304.1, 331.61, 329.95, 354.9, 354.55, 350.89, 373.85, 411.68, 381.23], '1Y': [307.2, 296.84, 303.69, 326.81, 320.6, 315.57, 332.19, 364.57, 354.33, 348.92, 347.57, 354.29, 351.01, 343.48, 373.35, 350.11, 347.27, 327, 326.12, 345.1, 336.09, 324.45, 315.99, 302.14, 311.84, 337.53, 323.22, 314.91, 317.71, 314.64, 323.06, 313.84, 318.37, 268.5, 299, 305.01, 301.84, 305.43, 294.16, 289.64, 281.39, 280.19, 281.01, 306.96, 314.33, 329.95, 354.9, 354.55, 350.89, 373.85, 411.68, 381.23] },
      velocityScore: { '1D': -1.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$105B', pe: 89.3, revenueGrowth: 19, eps: 4.27, grossMargin: 86, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 3.92, FDTX: false, GTEK: 2.56, ARKK: false, MARS: false, FRWD: 2.13, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'CADENCE DESIGN SYSTEMS INC appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DDOG', name: 'DDOG', easyScore: 3, avgWeight: 2.64, proScore: 0.61, coverage: 0.231,
      price: 228.2, weeklyPrices: [234.11, 231.68, 227.34, 227.63, 228.20], weeklyChange: -2.52, sortRank: 0, periodReturns: { '1M': 12.8, '6M': 52.2, '1Y': 92.4 },
      priceHistory: { '1W': [234.11, 231.68, 227.34, 227.63, 228.2], '1M': [202.32, 199.94, 205.31, 202.84, 207.98, 215.15, 212.24, 218.04, 222.32, 223.65, 221.81, 225.24, 247.35, 277.49, 269.13, 243.6, 234.11, 231.68, 227.34, 227.63, 228.2], '6M': [149.9, 138.29, 138.32, 133.64, 126.57, 117, 138.21, 119.66, 129.67, 121.78, 110.33, 118.33, 127.49, 128.87, 122.57, 118.05, 116.5, 121.06, 132.14, 133.98, 143.71, 205.31, 212.24, 225.24, 243.6, 228.2], '1Y': [118.63, 130.04, 131.12, 155.15, 137.37, 145.02, 149.84, 139.98, 136.38, 124.52, 129.15, 140.96, 136.08, 136.5, 138.82, 139.07, 151.82, 158.74, 152.87, 156.47, 157.07, 190.82, 185.97, 159.57, 160.01, 151.41, 146, 140.39, 137.94, 137.1, 125.5, 123.46, 138.21, 119.66, 129.67, 121.78, 110.33, 118.33, 127.49, 131.26, 123.29, 118.67, 108.98, 123.47, 127.86, 133.98, 143.71, 205.31, 212.24, 225.24, 243.6, 228.2] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$81B', pe: 585.1, revenueGrowth: 32, eps: 0.39, grossMargin: 80, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.68, IGV: 2.8, FDTX: 2.44, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'DDOG appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 3, avgWeight: 5.15, proScore: 3.86, coverage: 0.75,
      price: 278, weeklyPrices: [284.87, 293.60, 283.51, 262.34, 278.00], weeklyChange: -2.41, sortRank: 0, periodReturns: { '1M': -13.7, '6M': 129.9, '1Y': 332.6 },
      priceHistory: { '1W': [284.87, 293.6, 283.51, 262.34, 278], '1M': [322.05, 308.05, 300.84, 296.98, 292.65, 261.58, 271.05, 270.75, 279.22, 291.97, 295.94, 288.9, 284.42, 288.12, 299.07, 300.06, 284.87, 293.6, 283.51, 262.34, 278], '6M': [120.91, 109.59, 113.62, 120.46, 128.85, 142.76, 147.43, 151.08, 190.09, 180.99, 183, 170.96, 171.73, 174.04, 186.82, 180.36, 218.07, 229.73, 242.77, 253.49, 320.3, 300.84, 271.05, 288.9, 300.06, 278], '1Y': [64.27, 59.64, 66.46, 72.55, 70.87, 76.08, 82.79, 79.03, 77.8, 85.17, 83.64, 90.42, 89.41, 95.89, 99.1, 96.99, 101.35, 100.35, 110.24, 121.66, 125.9, 125, 109.4, 98.12, 107.74, 114.04, 112.36, 110.97, 111.96, 120, 133.04, 140.62, 147.43, 151.08, 190.09, 180.99, 183, 170.96, 171.73, 167.41, 194.85, 184.68, 230.81, 232.81, 252.18, 253.49, 320.3, 300.84, 271.05, 288.9, 300.06, 278] },
      velocityScore: { '1D': -4.5, '1W': 5.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 54.3, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.14,
      etfPresence: { POW: 6.23, VOLT: 7.44, PBD: false, PBW: 1.78 },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, avgWeight: 5.6, proScore: 2.8, coverage: 0.5,
      price: 281.85, weeklyPrices: [262.56, 279.13, 276.04, 276.95, 281.85], weeklyChange: 7.35, sortRank: 0, periodReturns: { '1M': -6.9, '6M': 60.7, '1Y': 239.4 },
      priceHistory: { '1W': [262.56, 279.13, 276.04, 276.95, 281.85], '1M': [302.73, 298.22, 266.92, 268.73, 256.72, 249.71, 254.75, 260.4, 270.01, 276.25, 280.13, 276.96, 274.52, 269.86, 269.22, 276.54, 262.56, 279.13, 276.04, 276.95, 281.85], '6M': [175.36, 166.55, 176.45, 175.77, 188, 201.17, 210.66, 217.25, 237.19, 221.19, 234.67, 213.8, 200.88, 209.52, 222.04, 197.98, 228.29, 236.04, 262.68, 258.26, 286.89, 266.92, 254.75, 276.96, 276.54, 281.85], '1Y': [83.05, 89.16, 93.87, 100.1, 101.14, 101.69, 119.84, 130.04, 132.61, 132.13, 128.91, 136.29, 143.88, 141.73, 142.08, 142.84, 138.97, 137.73, 146.11, 157, 150.62, 160.16, 146.49, 134.36, 154.03, 166, 173.12, 175.69, 174.34, 184, 193.82, 201.8, 210.66, 217.25, 237.19, 221.19, 234.67, 213.8, 200.88, 205.74, 220.77, 203.04, 235, 241.49, 268.31, 258.26, 286.89, 266.92, 254.75, 276.96, 276.54, 281.85] },
      velocityScore: { '1D': 3.3, '1W': 5.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 67.9, revenueGrowth: 17, eps: 4.15, grossMargin: 39, dividendYield: 0.1,
      etfPresence: { POW: 3.44, VOLT: 7.77, PBD: false, PBW: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 2, avgWeight: 4.97, proScore: 2.49, coverage: 0.5,
      price: 661.33, weeklyPrices: [695.11, 693.81, 691.95, 650.92, 661.33], weeklyChange: -4.86, sortRank: 0, periodReturns: { '1M': -15.4, '6M': 41.6, '1Y': 85.9 },
      priceHistory: { '1W': [695.11, 693.81, 691.95, 650.92, 661.33], '1M': [781.38, 765.81, 773.72, 780.08, 769.99, 714.13, 709.93, 716.91, 723.44, 742.18, 733.62, 730.1, 711.73, 687.48, 706.06, 719.17, 695.11, 693.81, 691.95, 650.92, 661.33], '6M': [466.91, 421.31, 432.67, 435.82, 432.66, 463.49, 479.27, 488.6, 510.64, 519.31, 562.77, 568.38, 567.71, 571.64, 578.44, 549.02, 576.24, 591.82, 613.78, 628.6, 785.24, 773.72, 709.93, 730.1, 719.17, 661.33], '1Y': [355.78, 360.43, 379.47, 386.51, 383.78, 403.31, 421.68, 406.13, 387.35, 377.51, 378.21, 385.96, 372.5, 382.53, 388.58, 405.44, 421.17, 417.61, 433.85, 440.93, 453.83, 442.9, 426.93, 429.78, 464.88, 460.64, 438.11, 426.66, 431.03, 438.22, 444.2, 473.24, 479.27, 488.6, 510.64, 519.31, 562.77, 568.38, 567.71, 572, 573.5, 560.12, 582.06, 587.42, 633.44, 628.6, 785.24, 773.72, 709.93, 730.1, 719.17, 661.33] },
      velocityScore: { '1D': -3.1, '1W': -2.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$99B', pe: 90.7, revenueGrowth: 26, eps: 7.29, grossMargin: 15, dividendYield: 0.07,
      etfPresence: { POW: 4.64, VOLT: 5.31, PBD: false, PBW: false },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 2, avgWeight: 4.61, proScore: 2.31, coverage: 0.5,
      price: 381.19, weeklyPrices: [395.94, 403.14, 401.72, 375.46, 381.19], weeklyChange: -3.73, sortRank: 0, periodReturns: { '1M': -9, '6M': 8.8, '1Y': 17 },
      priceHistory: { '1W': [395.94, 403.14, 401.72, 375.46, 381.19], '1M': [419, 401.53, 406.94, 408.1, 399.44, 371.88, 379.69, 381.51, 391.35, 403.13, 406.37, 401.94, 400.6, 400.08, 417.62, 418.61, 395.94, 403.14, 401.72, 375.46, 381.19], '6M': [350.36, 315.95, 322.17, 322.26, 329.1, 337.59, 341.19, 362.53, 377.47, 380.38, 373.53, 354.46, 355.79, 363.95, 374.1, 357.67, 385.58, 395.06, 413.87, 410.77, 421.39, 406.94, 379.69, 401.94, 418.61, 381.19], '1Y': [325.71, 334.86, 348.14, 362.22, 360.62, 378.62, 392.17, 384.72, 360.16, 355.1, 345.38, 355.34, 349.03, 365.9, 374.5, 365.58, 373.46, 369.08, 373.3, 376.29, 383.09, 377.4, 354.07, 328.19, 345.89, 337.66, 331.98, 317.8, 321.45, 332.97, 332.38, 337.96, 341.19, 362.53, 377.47, 380.38, 373.53, 354.46, 355.79, 360.54, 375, 365.56, 400.44, 392.73, 424.5, 410.77, 421.39, 406.94, 379.69, 401.94, 418.61, 381.19] },
      velocityScore: { '1D': -3.3, '1W': -4.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$148B', pe: 37.3, revenueGrowth: 17, eps: 10.21, grossMargin: 37, dividendYield: 1.17,
      etfPresence: { POW: 3.97, VOLT: 5.25, PBD: false, PBW: false },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 2, avgWeight: 3.47, proScore: 1.73, coverage: 0.5,
      price: 161.88, weeklyPrices: [162.86, 163.81, 163.80, 156.79, 161.88], weeklyChange: -0.6, sortRank: 0, periodReturns: { '1M': -6.6, '6M': 48.3, '1Y': 136 },
      priceHistory: { '1W': [162.86, 163.81, 163.8, 156.79, 161.88], '1M': [173.39, 170.74, 172.91, 173.96, 169.01, 158.23, 161.86, 163.57, 164.66, 169.29, 167.8, 164.87, 166.99, 171.55, 173.39, 173.88, 162.86, 163.81, 163.8, 156.79, 161.88], '6M': [109.15, 98.28, 104.18, 106.61, 106.39, 109.9, 113.16, 119.43, 112.15, 115.65, 121.8, 113.83, 111.09, 114.71, 125.61, 118.28, 127.11, 131.38, 140.13, 137.37, 172.49, 172.91, 161.86, 164.87, 173.88, 161.88], '1Y': [68.6, 70.47, 73.13, 74.91, 74.87, 75.91, 78.53, 78.42, 89.1, 89.8, 88.02, 92.58, 92.8, 94.78, 98.99, 97, 97.8, 95.98, 99.33, 102.2, 104.35, 109.97, 105.92, 101.52, 107.27, 107.72, 101.71, 101.54, 103.26, 110.09, 106.64, 112.66, 113.16, 119.43, 112.15, 115.65, 121.8, 113.83, 111.09, 120.27, 127.01, 121.26, 128.63, 129.7, 142.76, 137.37, 172.49, 172.91, 161.86, 164.87, 173.88, 161.88] },
      velocityScore: { '1D': -1.7, '1W': -4.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 54.9, revenueGrowth: 54, eps: 2.95, grossMargin: 37, dividendYield: 0.54,
      etfPresence: { POW: 3.84, VOLT: 3.1, PBD: false, PBW: false },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 2, avgWeight: 3.46, proScore: 1.73, coverage: 0.5,
      price: 891.77, weeklyPrices: [933.61, 933.85, 920.15, 867.09, 891.77], weeklyChange: -4.48, sortRank: 0, periodReturns: { '1M': -16.9, '6M': 26.6, '1Y': 84.5 },
      priceHistory: { '1W': [933.61, 933.85, 920.15, 867.09, 891.77], '1M': [1073.08, 1071.98, 1062.57, 1090.53, 1049.23, 1011.8, 1024.52, 1043.82, 1038.74, 1070.47, 1031.89, 996, 968.32, 950.54, 969.67, 963.33, 933.61, 933.85, 920.15, 867.09, 891.77], '6M': [704.2, 639.43, 663.46, 680.86, 639.77, 684.86, 692.7, 780.25, 790.79, 817.55, 876.01, 841.27, 847.65, 844.05, 909.41, 872.9, 936.07, 985.92, 1127.56, 1063.11, 1118.96, 1062.57, 1024.52, 996, 963.33, 891.77], '1Y': [483.47, 490.19, 506.81, 517.04, 539.16, 574.6, 644.59, 660.29, 645.86, 625.27, 606, 633.69, 582.08, 625.55, 624.17, 605.17, 594.99, 604.56, 600, 584.39, 574.07, 550.17, 558.17, 558.03, 599.77, 631.32, 671.71, 658.28, 663.46, 686.33, 652.09, 667.89, 692.7, 780.25, 790.79, 817.55, 876.01, 841.27, 847.65, 858.47, 923.69, 894.78, 968.02, 978.32, 1149.53, 1063.11, 1118.96, 1062.57, 1024.52, 996, 963.33, 891.77] },
      velocityScore: { '1D': -2.8, '1W': -3.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$240B', pe: 26, revenueGrowth: 16, eps: 34.25, grossMargin: 20, dividendYield: 0.23,
      etfPresence: { POW: 3.15, VOLT: 3.76, PBD: false, PBW: false },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 2, avgWeight: 3.15, proScore: 1.58, coverage: 0.5,
      price: 469.95, weeklyPrices: [476.82, 485.03, 486.47, 467.59, 469.95], weeklyChange: -1.44, sortRank: 0, periodReturns: { '1M': -4.1, '6M': 1.5, '1Y': 20.8 },
      priceHistory: { '1W': [476.82, 485.03, 486.47, 467.59, 469.95], '1M': [490.16, 485.98, 483.79, 482.03, 479.97, 461.5, 463.32, 460.98, 475.01, 478.05, 484.25, 473.93, 473.61, 462.93, 480.46, 485.27, 476.82, 485.03, 486.47, 467.59, 469.95], '6M': [462.82, 434.85, 454.94, 465.48, 472.88, 472.54, 484.14, 503.86, 503.1, 522.3, 527.9, 490.78, 477.97, 471.22, 505.62, 490.74, 527.21, 526.94, 549.75, 545.93, 502.34, 483.79, 463.32, 473.93, 485.27, 469.95], '1Y': [388.99, 398.73, 405.26, 414.84, 419.24, 430.28, 442.54, 437.48, 417.84, 437.67, 427.57, 445.8, 436.04, 437.43, 441.44, 425.22, 413, 408.46, 425.71, 434.39, 469.96, 461.47, 437.65, 407.36, 431.43, 440.53, 448, 442.51, 451.39, 477.46, 481.68, 482.5, 484.14, 503.86, 503.1, 522.3, 527.9, 490.78, 477.97, 477.47, 503.2, 500.38, 534.67, 521.71, 557.85, 545.93, 502.34, 483.79, 463.32, 473.93, 485.27, 469.95] },
      velocityScore: { '1D': -0.6, '1W': 3.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 27.8, revenueGrowth: 11, eps: 16.93, grossMargin: 36, dividendYield: 1.21,
      etfPresence: { POW: 2.93, VOLT: 3.37, PBD: false, PBW: false },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 2, avgWeight: 3.12, proScore: 1.56, coverage: 0.5,
      price: 85.5, weeklyPrices: [85.84, 84.01, 84.83, 85.12, 85.50], weeklyChange: -0.39, sortRank: 0, periodReturns: { '1M': -9.8, '6M': 5.3, '1Y': 17.1 },
      priceHistory: { '1W': [85.84, 84.01, 84.83, 85.12, 85.5], '1M': [94.84, 94.59, 94.85, 95.68, 93.36, 90.06, 88.27, 89.69, 88.55, 87.65, 87.65, 87.25, 87.01, 83.66, 85.68, 85.68, 85.84, 84.01, 84.83, 85.12, 85.5], '6M': [81.21, 80.85, 80.41, 81.32, 81.12, 83.51, 87.15, 88.82, 90.83, 91.22, 95.11, 92.6, 91.66, 92.53, 91.62, 92.88, 94.17, 91.24, 90, 94.17, 95.39, 94.85, 88.27, 87.25, 85.68, 85.5], '1Y': [73, 71.57, 70.99, 73.88, 74.4, 75.95, 71.85, 71.06, 72.58, 72.24, 76.08, 72.09, 70.9, 71.64, 71.08, 75.85, 80.06, 83.35, 84.53, 84.41, 81.64, 82, 83.99, 84.3, 86.29, 83.13, 81.65, 79.54, 80.27, 81.05, 81.64, 83.85, 87.15, 88.82, 90.83, 91.22, 95.11, 92.6, 91.66, 90.96, 91.16, 92.85, 94.48, 91.83, 96.25, 94.17, 95.39, 94.85, 88.27, 87.25, 85.68, 85.5] },
      velocityScore: { '1D': 3.3, '1W': 7.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$178B', pe: 21.7, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.93,
      etfPresence: { POW: 2.07, VOLT: 4.16, PBD: false, PBW: false },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 2.95, proScore: 1.47, coverage: 0.5,
      price: 129.15, weeklyPrices: [129.14, 126.77, 127.76, 128.53, 129.15], weeklyChange: 0.01, sortRank: 0, periodReturns: { '1M': -1.2, '6M': 13, '1Y': 26.7 },
      priceHistory: { '1W': [129.14, 126.77, 127.76, 128.53, 129.15], '1M': [130.7, 131.94, 127.95, 128.6, 125.15, 128.92, 128.87, 129.61, 131.59, 130.9, 129.57, 127.76, 126.67, 123.79, 127.11, 127.79, 129.14, 126.77, 127.76, 128.53, 129.15], '6M': [114.26, 115.58, 115.67, 114.07, 116.57, 119.22, 119.43, 120.67, 121.23, 127.27, 132.46, 133.52, 131.26, 133.62, 128.8, 131.08, 134.71, 134.39, 131.62, 134.44, 132.56, 127.95, 128.87, 127.76, 127.79, 129.15], '1Y': [101.94, 101.2, 102.35, 103.86, 105.34, 107.4, 109.79, 113.14, 113.73, 112.86, 113.14, 111.78, 108.11, 109.46, 107.06, 109.14, 114.06, 117.04, 117.53, 115.98, 121.89, 119.53, 121.48, 120.9, 123.77, 117.54, 114.13, 114.49, 115.77, 115.04, 116.62, 118.98, 119.43, 120.67, 121.23, 127.27, 132.46, 133.52, 131.26, 130.97, 128.3, 131.67, 137.15, 134.56, 135.08, 134.44, 132.56, 127.95, 128.87, 127.76, 127.79, 129.15] },
      velocityScore: { '1D': 3.5, '1W': 8.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 19.1, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.96,
      etfPresence: { POW: 1.45, VOLT: 4.44, PBD: false, PBW: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 2, avgWeight: 2.94, proScore: 1.47, coverage: 0.5,
      price: 238.75, weeklyPrices: [263.61, 253.57, 259.61, 234.23, 238.75], weeklyChange: -9.43, sortRank: 0, periodReturns: { '1M': -15.9, '6M': 119.1, '1Y': 959.7 },
      priceHistory: { '1W': [263.61, 253.57, 259.61, 234.23, 238.75], '1M': [283.92, 280.69, 289.76, 303.41, 275.95, 261.34, 282.31, 307.88, 302.49, 302.4, 293.8, 290.01, 285, 273.51, 302.85, 291.37, 263.61, 253.57, 259.61, 234.23, 238.75], '6M': [108.99, 80.21, 90.18, 103.87, 136.87, 151.75, 152.31, 168.89, 148.7, 157.27, 174.77, 164.78, 159.21, 160.05, 145.88, 135.49, 146.78, 213.84, 229.75, 287.97, 285.47, 289.76, 282.31, 290.01, 291.37, 238.75], '1Y': [22.53, 21.5, 22.33, 24.24, 25.4, 24.99, 34.34, 37.39, 36.8, 45.11, 44.83, 54.8, 57.07, 67.26, 84.93, 70.32, 90.29, 86.87, 111.5, 110.38, 127.85, 136.86, 103.55, 93.38, 109.24, 119.18, 94.98, 88.82, 88.41, 103.05, 139.77, 150.56, 152.31, 168.89, 148.7, 157.27, 174.77, 164.78, 159.21, 156.58, 150.22, 132.45, 160.13, 210.06, 237.57, 287.97, 285.47, 289.76, 282.31, 290.01, 291.37, 238.75] },
      velocityScore: { '1D': -6.4, '1W': -9.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$68B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: 3.84, PBD: false, PBW: 2.04 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.67, proScore: 1.34, coverage: 0.5,
      price: 149.35, weeklyPrices: [138.81, 143.60, 154.07, 149.22, 149.35], weeklyChange: 7.59, sortRank: 0, periodReturns: { '1M': 21.9, '6M': 7.4, '1Y': 60.5 },
      priceHistory: { '1W': [138.81, 143.6, 154.07, 149.22, 149.35], '1M': [122.47, 127.87, 124.64, 129.19, 125, 119.2, 123.05, 124.86, 132.06, 139.56, 140.24, 147.68, 148.76, 146.34, 148.4, 146.77, 138.81, 143.6, 154.07, 149.22, 149.35], '6M': [139.09, 129.61, 137.43, 139.88, 145.11, 152.33, 166.25, 147.06, 144.14, 147.73, 152.64, 132.75, 134.54, 135.12, 127.96, 126.35, 135.32, 146.98, 148.13, 148.38, 138.47, 124.64, 123.05, 147.68, 146.77, 149.35], '1Y': [93.07, 93.47, 96.98, 99.46, 98.76, 103.34, 105.02, 106.51, 108.55, 110.74, 108.81, 111.94, 110.45, 118.68, 123.94, 122.6, 122.22, 121.7, 125.65, 133.82, 139.11, 138.11, 135.25, 130.36, 140.9, 139.36, 129.24, 135.29, 136.9, 141.38, 148.97, 154.6, 166.25, 147.06, 144.14, 147.73, 152.64, 132.75, 134.54, 127.81, 128.73, 127.7, 137.68, 148.96, 150.18, 148.38, 138.47, 124.64, 123.05, 147.68, 146.77, 149.35] },
      velocityScore: { '1D': 0, '1W': 8.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$184B', pe: 42.9, revenueGrowth: 58, eps: 3.48, grossMargin: 38, dividendYield: 0.67,
      etfPresence: { POW: 1, VOLT: 4.35, PBD: false, PBW: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.56, proScore: 1.28, coverage: 0.5,
      price: 325.79, weeklyPrices: [294.81, 306.11, 311.64, 308.17, 325.79], weeklyChange: 10.51, sortRank: 0, periodReturns: { '1M': -8.2, '6M': 45.4, '1Y': 155.1 },
      priceHistory: { '1W': [294.81, 306.11, 311.64, 308.17, 325.79], '1M': [354.97, 339.42, 339.19, 344.6, 323.46, 302.84, 313.05, 323.79, 324.86, 339.65, 328.34, 317.08, 302.18, 294.65, 312.28, 320.92, 294.81, 306.11, 311.64, 308.17, 325.79], '6M': [224.11, 208.77, 217.86, 227.65, 227.59, 250.95, 259.55, 263.03, 279.04, 321.34, 338.51, 330.54, 314.84, 315.91, 356.38, 322.71, 366.95, 374.32, 377.19, 361.39, 360.81, 339.19, 313.05, 317.08, 320.92, 325.79], '1Y': [127.72, 128.97, 133.84, 138.14, 140.73, 143.25, 140.54, 138.92, 146.5, 161.89, 148.07, 155.55, 153.74, 157.44, 174.35, 166.46, 173.86, 169.62, 191.98, 202.61, 205.61, 219.2, 202.82, 188.88, 211.19, 219.38, 215.07, 216.09, 217.26, 229.7, 233.92, 269, 259.55, 263.03, 279.04, 321.34, 338.51, 330.54, 314.84, 319.63, 342.87, 332.82, 374.98, 372.23, 382.47, 361.39, 360.81, 339.19, 313.05, 317.08, 320.92, 325.79] },
      velocityScore: { '1D': 2.4, '1W': 1.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 67.7, revenueGrowth: 26, eps: 4.81, grossMargin: 39, dividendYield: 0.13,
      etfPresence: { POW: 0.99, VOLT: 4.12, PBD: false, PBW: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'XEL', name: 'Xcel Energy Inc', easyScore: 2, avgWeight: 2.03, proScore: 1.02, coverage: 0.5,
      price: 78.83, weeklyPrices: [79.04, 77.62, 77.87, 78.10, 78.83], weeklyChange: -0.27, sortRank: 0, periodReturns: { '1M': -2.2, '6M': 5.6, '1Y': 15.5 },
      priceHistory: { '1W': [79.04, 77.62, 77.87, 78.1, 78.83], '1M': [80.6, 79.9, 79.91, 80.03, 77.92, 79.73, 79.86, 80.2, 81.08, 80.78, 81, 79.26, 79.5, 76.41, 77.87, 77.77, 79.04, 77.62, 77.87, 78.1, 78.83], '6M': [74.68, 73.61, 74.42, 74.07, 74, 76.21, 76.33, 75.95, 77.5, 79.68, 83.55, 83.04, 81, 81.41, 77.96, 79.44, 81.46, 78.65, 78.11, 78.82, 80.55, 79.91, 79.86, 79.26, 77.77, 78.83], '1Y': [68.25, 66.28, 67.75, 68.19, 68.62, 70.38, 72.66, 73.44, 73.23, 72.39, 73.16, 72.34, 72.68, 73.35, 72.11, 79.28, 80.26, 80.93, 81.16, 80.39, 81.59, 80.54, 80.14, 79.49, 82.11, 77.18, 75.15, 72.67, 74.12, 74.43, 74.94, 76.51, 76.33, 75.95, 77.5, 79.68, 83.55, 83.04, 81, 80.02, 77.7, 79.71, 82.77, 81.05, 79.48, 78.82, 80.55, 79.91, 79.86, 79.26, 77.77, 78.83] },
      velocityScore: { '1D': 4.1, '1W': 8.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$49B', pe: 22.7, revenueGrowth: 3, eps: 3.47, grossMargin: 46, dividendYield: 3.03,
      etfPresence: { POW: 2.04, VOLT: 2.02, PBD: false, PBW: false },
      tonyNote: 'Xcel Energy Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SU', name: 'Schneider Electric SE', easyScore: 2, avgWeight: 1.34, proScore: 0.67, coverage: 0.5,
      price: 62.52, weeklyPrices: [62.22, 63.25, 61.20, 62.09, 62.52], weeklyChange: 0.48, sortRank: 0, periodReturns: { '1M': -4, '6M': 41.1, '1Y': 60.9 },
      priceHistory: { '1W': [62.22, 63.25, 61.2, 62.09, 62.52], '1M': [65.12, 66.56, 66.07, 66.79, 68.29, 69.65, 67.83, 67.73, 67.34, 65.56, 63.97, 63.31, 62.36, 63.76, 65.31, 65.47, 62.22, 63.25, 61.2, 62.09, 62.52], '6M': [44.31, 42.4, 43.11, 44.77, 46.63, 49.35, 52.03, 53.46, 54.61, 55.85, 55.75, 57.34, 58.27, 61.32, 64.11, 66.11, 64.54, 62.97, 63.43, 67.07, 64.32, 66.07, 67.83, 63.31, 65.47, 62.52], '1Y': [38.86, 40.05, 37.97, 38.35, 40.1, 38.85, 39.28, 39.46, 39.03, 38.99, 39.04, 41.6, 39.97, 41.72, 41.55, 42.62, 41.35, 39.49, 38.59, 39.83, 39.72, 41.99, 43.62, 44.67, 44.78, 44.25, 44.37, 42.75, 43.73, 45.24, 48.13, 50.51, 52.03, 53.46, 54.61, 55.85, 55.75, 57.34, 58.27, 61.98, 64.7, 64.94, 63.39, 63.82, 64.56, 67.07, 64.32, 66.07, 67.83, 63.31, 65.47, 62.52] },
      velocityScore: { '1D': 1.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$74B', pe: 16.6, revenueGrowth: 18, eps: 3.77, grossMargin: 59, dividendYield: 2.78,
      etfPresence: { POW: 1.16, VOLT: 1.52, PBD: false, PBW: false },
      tonyNote: 'Schneider Electric SE appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 1.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CEG', name: 'Constellation Energy Corp', easyScore: 2, avgWeight: 0.88, proScore: 0.44, coverage: 0.5,
      price: 245.58, weeklyPrices: [254.83, 250.67, 251.65, 242.30, 245.58], weeklyChange: -3.63, sortRank: 0, periodReturns: { '1M': -18.1, '6M': -35.1, '1Y': -16 },
      priceHistory: { '1W': [254.83, 250.67, 251.65, 242.3, 245.58], '1M': [299.69, 293.6, 274.89, 275.26, 267.2, 260.67, 281.26, 285.83, 294.07, 301.57, 288.68, 286.31, 287.75, 265.7, 272.65, 264.59, 254.83, 250.67, 251.65, 242.3, 245.58], '6M': [378.6, 361.05, 360.46, 354.94, 335.86, 295.4, 288.76, 268.45, 271.14, 294.05, 325.84, 322.85, 300.69, 307.69, 294.85, 279.25, 284.27, 294.73, 287.16, 297, 322.78, 274.89, 281.26, 286.31, 264.59, 245.58], '1Y': [292.19, 306.43, 322.51, 311.88, 321.54, 321.42, 327.35, 347.84, 336.41, 326.21, 312.52, 319.55, 301.58, 323.48, 330.9, 331.26, 360, 368.49, 386.5, 389.19, 382.48, 351.3, 335.74, 345.78, 364.36, 359.82, 351.98, 355.4, 358.33, 354.58, 333.53, 294.37, 288.76, 268.45, 271.14, 294.05, 325.84, 322.85, 300.69, 317.22, 303.32, 279.46, 280.25, 299.14, 292.77, 297, 322.78, 274.89, 281.26, 286.31, 264.59, 245.58] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$88B', pe: 21.3, revenueGrowth: 64, eps: 11.51, grossMargin: 23, dividendYield: 0.7,
      etfPresence: { POW: 1.32, VOLT: 0.43, PBD: false, PBW: false },
      tonyNote: 'Constellation Energy Corp appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 0.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SEDG', name: 'SolarEdge Technologies Inc', easyScore: 2, avgWeight: 0.74, proScore: 0.37, coverage: 0.5,
      price: 56.71, weeklyPrices: [63.17, 63.95, 57.80, 54.54, 56.71], weeklyChange: -10.23, sortRank: 0, periodReturns: { '1M': 35.7, '6M': 77.1, '1Y': 172.3 },
      priceHistory: { '1W': [63.17, 63.95, 57.8, 54.54, 56.71], '1M': [41.79, 40.42, 42.77, 50.24, 61.76, 54.53, 56.22, 63, 61.95, 70.75, 73.23, 73.19, 76.35, 75.8, 78.51, 73.14, 63.17, 63.95, 57.8, 54.54, 56.71], '6M': [32.02, 28.47, 30.45, 31.26, 35.31, 32.49, 34.81, 30.97, 36.79, 35.1, 42.45, 37.94, 36.09, 42.88, 47.67, 51.05, 43.52, 37.83, 42.6, 41.58, 40.61, 42.77, 56.22, 73.19, 73.14, 56.71], '1Y': [20.83, 16.98, 20.07, 27.54, 25.62, 26.62, 27.23, 25.66, 24.42, 25.67, 30.21, 33.25, 34.42, 28.97, 35.45, 39.45, 36.24, 35.06, 37.02, 39.7, 34.34, 38.88, 36.42, 33.09, 36.53, 29.52, 29.53, 29.06, 29.19, 30.77, 34.31, 33.34, 34.81, 30.97, 36.79, 35.1, 42.45, 37.94, 36.09, 44.88, 51.28, 51.87, 41.84, 38.91, 47.36, 41.58, 40.61, 42.77, 56.22, 73.19, 73.14, 56.71] },
      velocityScore: { '1D': -2.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3B', pe: null, revenueGrowth: 42, eps: -6.13, grossMargin: 18, dividendYield: null,
      etfPresence: { POW: 0.38, VOLT: false, PBD: 1.09, PBW: false },
      tonyNote: 'SolarEdge Technologies Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 0.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NRG', name: 'NRG Energy Inc', easyScore: 2, avgWeight: 0.72, proScore: 0.36, coverage: 0.5,
      price: 122.61, weeklyPrices: [129.20, 127.71, 129.96, 120.65, 122.61], weeklyChange: -5.1, sortRank: 0, periodReturns: { '1M': -10.7, '6M': -28.1, '1Y': -17.7 },
      priceHistory: { '1W': [129.2, 127.71, 129.96, 120.65, 122.61], '1M': [137.3, 137.34, 131.08, 134.72, 127.81, 123.71, 133.98, 136.92, 137.65, 140.43, 138, 137.5, 134.08, 129.47, 133.51, 133.39, 129.2, 127.71, 129.96, 120.65, 122.61], '6M': [170.64, 154.64, 160.88, 161.59, 148.89, 148.91, 156.04, 152.18, 156.43, 171.06, 183.59, 163.54, 148.63, 154.75, 151.13, 146.14, 160.3, 168.45, 149.6, 149.01, 150.64, 131.08, 133.98, 137.5, 133.39, 122.61], '1Y': [149.07, 152.64, 161.54, 158.39, 150.68, 151.75, 156.59, 167.2, 153.22, 153.78, 145.89, 148.66, 147.66, 164.84, 164.36, 168.57, 166.28, 160.43, 168.74, 170.36, 173.14, 170.1, 166.15, 160.46, 169.49, 163, 161.44, 156.2, 160.96, 159.63, 150.59, 150.68, 156.04, 152.18, 156.43, 171.06, 183.59, 163.54, 148.63, 159.11, 151.04, 149.9, 161.78, 168.5, 154.53, 149.01, 150.64, 131.08, 133.98, 137.5, 133.39, 122.61] },
      velocityScore: { '1D': -5.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 136.2, revenueGrowth: 20, eps: 0.9, grossMargin: 16, dividendYield: 1.57,
      etfPresence: { POW: 0.5, VOLT: 0.93, PBD: false, PBW: false },
      tonyNote: 'NRG Energy Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 0.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, avgWeight: 5.12, proScore: 1.28, coverage: 0.25,
      price: 285.54, weeklyPrices: [271.04, 274.97, 283.48, 275.51, 285.54], weeklyChange: 5.35, sortRank: 0, periodReturns: { '1M': -8.8, '6M': 182.8, '1Y': 528.5 },
      priceHistory: { '1W': [271.04, 274.97, 283.48, 275.51, 285.54], '1M': [312.96, 292.53, 309.27, 290.54, 273.67, 243.43, 264.2, 268.29, 267.99, 332.95, 345.84, 342.09, 334.84, 328.85, 332.95, 306.12, 271.04, 274.97, 283.48, 275.51, 285.54], '6M': [100.97, 98.29, 111.02, 133.64, 139.12, 157.4, 164.03, 166.76, 157.43, 155.61, 197.16, 203.19, 178.83, 196.33, 180.5, 161, 179.99, 194.2, 265, 256.7, 280.34, 309.27, 264.2, 342.09, 306.12, 285.54], '1Y': [45.43, 45.47, 47.31, 46.27, 46.25, 47.51, 46.41, 44.44, 46.02, 47.25, 46.71, 52.13, 51.8, 50.77, 52.88, 48.67, 49.03, 48.56, 57.43, 90.44, 91.42, 89.02, 88.58, 83.28, 89.35, 96.83, 97.8, 104.4, 112, 138.92, 138.61, 162.08, 164.03, 166.76, 157.43, 155.61, 197.16, 203.19, 178.83, 191.84, 186, 158.16, 184.92, 203.1, 260.13, 256.7, 280.34, 309.27, 264.2, 342.09, 306.12, 285.54] },
      velocityScore: { '1D': 0, '1W': -9.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 95.2, revenueGrowth: 20, eps: 3, grossMargin: 54, dividendYield: null,
      etfPresence: { POW: 5.12, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Vicor Corp is a power conversion specialist — high-efficiency modules for AI server power delivery. It holds a niche position in Industrials ETFs on the data center power density thesis. Revenue growth has been lumpy, but when AI GPU clusters require Vicor\'s factorized power architecture, the order cycles are large.',
    },
    {
      ticker: 'HYLN', name: 'Hyliion Holdings Corp', easyScore: 1, avgWeight: 4.58, proScore: 1.15, coverage: 0.25,
      price: 7.2, weeklyPrices: [6.90, 7.22, 6.34, 6.92, 7.20], weeklyChange: 4.35, sortRank: 0, periodReturns: { '1M': 160.9, '6M': 258.2, '1Y': 352.8 },
      priceHistory: { '1W': [6.9, 7.22, 6.34, 6.92, 7.2], '1M': [2.76, 2.68, 3.59, 3.69, 4.67, 4.09, 4.09, 4.2, 5.99, 6.6, 6.94, 7.19, 6.99, 6.25, 6.79, 7.62, 6.9, 7.22, 6.34, 6.92, 7.2], '6M': [2.01, 1.82, 2, 1.92, 1.98, 2.07, 2.17, 2.15, 2.1, 2.08, 1.92, 2.03, 2.07, 1.93, 1.83, 1.76, 1.78, 1.94, 1.92, 1.79, 2.39, 3.59, 4.09, 7.19, 7.62, 7.2], '1Y': [1.59, 1.44, 1.37, 1.44, 1.46, 1.66, 1.7, 1.5, 1.49, 1.69, 1.58, 1.72, 1.76, 1.62, 1.98, 2.08, 2.11, 2.26, 2.07, 2.28, 2.3, 2.08, 1.68, 1.58, 1.88, 1.92, 1.94, 1.86, 1.93, 1.94, 2.08, 2.16, 2.17, 2.15, 2.1, 2.08, 1.92, 2.03, 2.07, 1.91, 1.89, 1.75, 1.81, 1.92, 1.89, 1.79, 2.39, 3.59, 4.09, 7.19, 7.62, 7.2] },
      velocityScore: { '1D': null, '1W': 29.2, '1M': null, '6M': null }, isNew: true,
      marketCap: '$1B', pe: null, revenueGrowth: 479, eps: -0.3, grossMargin: 6, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 4.58 },
      tonyNote: 'Hyliion is a small-cap commercial truck powertrain electrification company. It holds a speculative position in Electrification ETFs on the heavy-duty vehicle decarbonization thesis. Revenue is early-stage and the path to profitability is long; the ETF weight is small, reflecting a lottery-ticket allocation to an electrification theme adjacent holding.',
    },
    {
      ticker: 'PRY', name: 'Prysmian SpA', easyScore: 1, avgWeight: 4.3, proScore: 1.07, coverage: 0.25,
      price: 141.8, weeklyPrices: [145.35, 148.70, 142.40, 136.30, 141.80], weeklyChange: -2.44, sortRank: 0, periodReturns: { '1M': -9.6, '6M': 69, '1Y': 143 },
      priceHistory: { '1W': [145.35, 148.7, 142.4, 136.3, 141.8], '1M': [156.9, 148.8, 154.7, 156.35, 147.95, 140.5, 144.4, 149.3, 149.8, 153, 146.5, 150.3, 148, 149.3, 154.65, 154.15, 150.6, 148.7, 142.4, 136.3, 141.8], '6M': [83.92, 84.32, 86.38, 87.48, 93.6, 94.08, 97.8, 100.7, 103.2, 101.5, 100, 102.2, 101.2, 98.08, 94.82, 98.78, 115.6, 121, 122.5, 127.95, 152.05, 156.35, 149.3, 150.3, 150.6, 141.8], '1Y': [58.36, 56.34, 57.28, 60.14, 61.12, 60.84, 64.42, 68.5, 70.68, 74.96, 73.06, 74.3, 75.46, 79.8, 79.3, 83.12, 84.24, 91.18, 88.62, 86.12, 91.7, 87.52, 85.26, 85.02, 85.22, 82.6, 84.32, 83.76, 85.94, 90.8, 86.28, 94.12, 99.48, 103.2, 103.8, 98.7, 97.86, 97.78, 101.8, 98.08, 94.82, 98.78, 115.6, 121.45, 121.15, 124.35, 143.65, 156.35, 149.3, 150.3, 150.6, 141.8] },
      velocityScore: { '1D': null, '1W': -5.3, '1M': null, '6M': null }, isNew: true,
      marketCap: '$41B', pe: 30.2, revenueGrowth: 10, eps: 4.7, grossMargin: 38, dividendYield: 0.66,
      etfPresence: { POW: 4.3, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Prysmian SpA appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 4.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 5.14, proScore: 2.06, coverage: 0.4,
      price: 797.52, weeklyPrices: [882.43, 891.86, 842.01, 770.25, 797.52], weeklyChange: -9.62, sortRank: 0, periodReturns: { '1M': -8.1, '6M': 134.2, '1Y': 290.1 },
      priceHistory: { '1W': [882.43, 891.86, 842.01, 770.25, 797.52], '1M': [868.18, 851.35, 854.28, 889.03, 848.84, 728.29, 752, 733.77, 732.94, 783.53, 782.12, 842.96, 860.84, 845.39, 875.52, 993.74, 882.43, 891.86, 842.01, 770.25, 797.52], '6M': [340.51, 302.3, 316.55, 327.11, 307.58, 349.59, 372.25, 386.78, 415.19, 410.63, 455.25, 420.22, 420.6, 425.51, 446.16, 407.27, 423.35, 456.08, 487.87, 469.75, 886.22, 854.28, 752, 842.96, 993.74, 797.52], '1Y': [204.46, 223.97, 228.65, 236.67, 241.76, 250.95, 268.14, 267.59, 299.64, 282.14, 278.03, 290.95, 285.98, 313.56, 360.25, 342.11, 349.3, 336.63, 355.58, 379.08, 379.03, 388.68, 326.6, 314.56, 344.31, 325.1, 315.15, 308.58, 310.79, 317.41, 321.6, 362.53, 372.25, 386.78, 415.19, 410.63, 455.25, 420.22, 420.6, 421.23, 452.92, 421.29, 435.65, 441.1, 495.67, 469.75, 886.22, 854.28, 752, 842.96, 993.74, 797.52] },
      velocityScore: { '1D': -5.1, '1W': -14.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$24B', pe: 71.4, revenueGrowth: 92, eps: 11.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 5.97, PRN: 4.32, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 5.14, proScore: 2.06, coverage: 0.4,
      price: 278, weeklyPrices: [284.87, 293.60, 283.51, 262.34, 278.00], weeklyChange: -2.41, sortRank: 0, periodReturns: { '1M': -13.7, '6M': 129.9, '1Y': 332.6 },
      priceHistory: { '1W': [284.87, 293.6, 283.51, 262.34, 278], '1M': [322.05, 308.05, 300.84, 296.98, 292.65, 261.58, 271.05, 270.75, 279.22, 291.97, 295.94, 288.9, 284.42, 288.12, 299.07, 300.06, 284.87, 293.6, 283.51, 262.34, 278], '6M': [120.91, 109.59, 113.62, 120.46, 128.85, 142.76, 147.43, 151.08, 190.09, 180.99, 183, 170.96, 171.73, 174.04, 186.82, 180.36, 218.07, 229.73, 242.77, 253.49, 320.3, 300.84, 271.05, 288.9, 300.06, 278], '1Y': [64.27, 59.64, 66.46, 72.55, 70.87, 76.08, 82.79, 79.03, 77.8, 85.17, 83.64, 90.42, 89.41, 95.89, 99.1, 96.99, 101.35, 100.35, 110.24, 121.66, 125.9, 125, 109.4, 98.12, 107.74, 114.04, 112.36, 110.97, 111.96, 120, 133.04, 140.62, 147.43, 151.08, 190.09, 180.99, 183, 170.96, 171.73, 167.41, 194.85, 184.68, 230.81, 232.81, 252.18, 253.49, 320.3, 300.84, 271.05, 288.9, 300.06, 278] },
      velocityScore: { '1D': -0.5, '1W': -4.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 54.3, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.14,
      etfPresence: { AIRR: 2.47, PRN: false, RSHO: 7.81, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.05, proScore: 2.02, coverage: 0.4,
      price: 874.15, weeklyPrices: [904.28, 915.64, 914.70, 856.16, 874.15], weeklyChange: -3.33, sortRank: 0, periodReturns: { '1M': -5.7, '6M': 39.7, '1Y': 140.7 },
      priceHistory: { '1W': [904.28, 915.64, 914.7, 856.16, 874.15], '1M': [926.79, 912.14, 902.3, 920.22, 888.31, 860.15, 872.56, 865.95, 879.89, 908.55, 909.93, 887.67, 875.87, 865.36, 909.81, 940.48, 904.28, 915.64, 914.7, 856.16, 874.15], '6M': [625.61, 565.83, 583, 616.1, 629.77, 629, 638.91, 702.89, 742.37, 751.97, 766.61, 731.97, 707.59, 702, 716.63, 708.46, 771.58, 770.17, 808.87, 810.05, 926.93, 902.3, 872.56, 887.67, 940.48, 874.15], '1Y': [363.14, 359.8, 381.88, 397.86, 405.92, 413.71, 433.75, 438.02, 417.12, 417.5, 417.89, 434.91, 423.08, 431.52, 466.54, 465.76, 497.85, 491.3, 527.08, 522.73, 583.15, 569.78, 553.55, 546.13, 575.76, 603.17, 597.89, 576.22, 578.61, 623.09, 636.53, 645.38, 638.91, 702.89, 742.37, 751.97, 766.61, 731.97, 707.59, 693.62, 719.04, 730.32, 787.07, 772.66, 835.24, 810.05, 926.93, 902.3, 872.56, 887.67, 940.48, 874.15] },
      velocityScore: { '1D': -1, '1W': 1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$403B', pe: 43.4, revenueGrowth: 22, eps: 20.12, grossMargin: 29, dividendYield: 0.71,
      etfPresence: { AIRR: false, PRN: 3.32, RSHO: 6.78, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.42, proScore: 1.77, coverage: 0.4,
      price: 1749.73, weeklyPrices: [1843.94, 1852.03, 1831.56, 1719.48, 1749.73], weeklyChange: -5.11, sortRank: 0, periodReturns: { '1M': -13.9, '6M': 70.7, '1Y': 252.3 },
      priceHistory: { '1W': [1843.94, 1852.03, 1831.56, 1719.48, 1749.73], '1M': [2032.98, 2016.31, 2034.63, 2042.36, 1992.74, 1825.5, 1835.51, 1835.33, 1828.25, 1883.56, 1867.09, 1855.15, 1828.21, 1787.88, 1883.26, 1914.65, 1843.94, 1852.03, 1831.56, 1719.48, 1749.73], '6M': [1024.92, 918.54, 963.83, 1032.31, 1038.18, 1134.75, 1160.38, 1209.97, 1269.63, 1319.47, 1450.6, 1430.38, 1407.32, 1424.46, 1461.52, 1378.99, 1525.16, 1648.96, 1724.49, 1724.14, 2011.49, 2034.63, 1835.51, 1855.15, 1914.65, 1749.73], '1Y': [496.7, 499.02, 516.08, 540.98, 539.5, 554.18, 688.74, 703.3, 694.43, 689.86, 694, 730.01, 706.31, 753.69, 797.71, 804.36, 818.01, 816.07, 827.92, 981.66, 963.3, 957.78, 897.52, 876.19, 976.94, 1001.48, 967.95, 940.74, 950.67, 1035.11, 1073.14, 1148, 1160.38, 1209.97, 1269.63, 1319.47, 1450.6, 1430.38, 1407.32, 1423, 1470.64, 1428.52, 1574.45, 1605.97, 1773.91, 1724.14, 2011.49, 2034.63, 1835.51, 1855.15, 1914.65, 1749.73] },
      velocityScore: { '1D': -2.2, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$62B', pe: 50.6, revenueGrowth: 1, eps: 34.56, grossMargin: 25, dividendYield: 0.15,
      etfPresence: { AIRR: 4.16, PRN: 4.67, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, avgWeight: 3.96, proScore: 1.58, coverage: 0.4,
      price: 606.59, weeklyPrices: [694.72, 619.98, 613.93, 588.90, 606.59], weeklyChange: -12.69, sortRank: 0, periodReturns: { '1M': -11.3, '6M': 83.5, '1Y': 170.4 },
      priceHistory: { '1W': [694.72, 619.98, 613.93, 588.9, 606.59], '1M': [683.52, 681.01, 719.92, 740.91, 722.31, 639.58, 630.5, 644.64, 656.35, 670.66, 673.51, 677.45, 667.02, 646.89, 663.14, 689.43, 694.72, 619.98, 613.93, 588.9, 606.59], '6M': [330.6, 313.9, 325.14, 339.54, 309.26, 384.34, 362.58, 381.73, 371.47, 414.12, 442.34, 463.36, 472.86, 473.63, 444.83, 544.65, 588.28, 606.43, 651.68, 630.07, 727.54, 719.92, 630.5, 677.45, 689.43, 606.59], '1Y': [224.31, 206.22, 215.68, 211.09, 212.25, 206.63, 235.91, 244.98, 235, 224.54, 218.29, 242.08, 211.51, 230.31, 260.64, 266.73, 262.26, 256.15, 283.94, 296.55, 298.33, 311.38, 335.1, 353.3, 395.2, 313.7, 319.91, 325.59, 320.73, 330.42, 314.09, 397.42, 362.58, 381.73, 371.47, 414.12, 442.34, 463.36, 472.86, 469.81, 437.48, 571.38, 609.29, 601.83, 656.79, 630.07, 727.54, 719.92, 630.5, 677.45, 689.43, 606.59] },
      velocityScore: { '1D': -0.6, '1W': -8.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 53.4, revenueGrowth: 50, eps: 11.37, grossMargin: 21, dividendYield: 0.34,
      etfPresence: { AIRR: 3.79, PRN: 4.13, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Argan Inc is an engineering and construction company for power generation facilities — natural gas and renewable power plants. It appears in Industrials ETFs because power plant construction is one of the fastest-growing categories in U.S. infrastructure spending, driven by data center load additions that the grid cannot currently support.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.51, proScore: 1.41, coverage: 0.4,
      price: 317.03, weeklyPrices: [315.29, 314.42, 322.81, 314.08, 317.03], weeklyChange: 0.55, sortRank: 0, periodReturns: { '1M': 2.1, '6M': 20.6, '1Y': 37.7 },
      priceHistory: { '1W': [315.29, 314.42, 322.81, 314.08, 317.03], '1M': [310.55, 313.7, 310.87, 315.72, 307.17, 302.64, 306.25, 305.66, 307.1, 311.33, 312.65, 308.53, 303.81, 300.98, 308.31, 313.67, 315.29, 314.42, 322.81, 314.08, 317.03], '6M': [262.84, 259.48, 264.78, 263.15, 273.7, 277.44, 262.34, 273.22, 283.73, 279.27, 280.76, 279.91, 270.13, 261.37, 264.14, 265.32, 280.74, 284.56, 289.82, 296.57, 315.39, 310.87, 306.25, 308.53, 313.67, 317.03], '1Y': [230.19, 226.18, 232.21, 245.74, 253.91, 260.7, 272.13, 271.5, 263.43, 273.04, 258.76, 266.47, 265.44, 263.19, 260.45, 261.43, 258.41, 246.04, 247.92, 260.29, 255.91, 259.66, 250.89, 242.52, 258.82, 257.91, 261.74, 262.41, 263.4, 265.39, 278.77, 284, 262.34, 273.22, 283.73, 279.27, 280.76, 279.91, 270.13, 258.51, 266, 269.36, 286.41, 284.39, 294.4, 296.57, 315.39, 310.87, 306.25, 308.53, 313.67, 317.03] },
      velocityScore: { '1D': 0.7, '1W': 4.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 30, revenueGrowth: 7, eps: 10.58, grossMargin: 30, dividendYield: 0.65,
      etfPresence: { AIRR: 1.81, PRN: false, RSHO: 5.22, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.83, proScore: 1.13, coverage: 0.4,
      price: 229.53, weeklyPrices: [227.80, 229.95, 228.01, 223.63, 229.53], weeklyChange: 0.76, sortRank: 0, periodReturns: { '1M': 12.9, '6M': 2.1, '1Y': 42.9 },
      priceHistory: { '1W': [227.8, 229.95, 228.01, 223.63, 229.53], '1M': [203.24, 198.99, 203.79, 203.5, 200.99, 195.79, 205.55, 205.39, 207.8, 219.08, 215.34, 213.82, 216.66, 220.92, 230.08, 236.14, 227.8, 229.95, 228.01, 223.63, 229.53], '6M': [224.76, 210.34, 208.48, 205.44, 208.56, 217.9, 215.68, 215.43, 231.2, 241.58, 226.66, 222.07, 210.15, 204.62, 200.67, 199.94, 212.22, 219.99, 220.62, 211.36, 212.74, 203.79, 205.55, 213.82, 236.14, 229.53], '1Y': [160.61, 156.03, 166.5, 173.03, 172.12, 177.85, 180.82, 182.39, 204.31, 186.56, 186.28, 191.13, 187.81, 186.32, 188.04, 182.95, 189.83, 184.77, 184.04, 194.03, 198.85, 217.63, 212.04, 199.31, 215.04, 208.67, 219.94, 203.17, 205.66, 208.63, 211.07, 220.86, 215.68, 215.43, 231.2, 241.58, 226.66, 222.07, 210.15, 202.46, 201.27, 203.16, 215.54, 215.27, 223.96, 211.36, 212.74, 203.79, 205.55, 213.82, 236.14, 229.53] },
      velocityScore: { '1D': 0.9, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 43.9, revenueGrowth: 17, eps: 5.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.67, PRN: false, RSHO: 3.98, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 2, avgWeight: 2.71, proScore: 1.08, coverage: 0.4,
      price: 253, weeklyPrices: [251.90, 246.55, 257.16, 249.49, 253.00], weeklyChange: 0.44, sortRank: 0, periodReturns: { '1M': -7.5, '6M': 29.2, '1Y': 48.2 },
      priceHistory: { '1W': [251.9, 246.55, 257.16, 249.49, 253], '1M': [273.58, 269.76, 273.1, 272.37, 260.35, 253.12, 261.21, 259.89, 256.55, 261.89, 258.02, 259.89, 258.25, 255.52, 250.72, 249.33, 251.9, 246.55, 257.16, 249.49, 253], '6M': [195.89, 198, 211.22, 212.92, 220.15, 220.36, 215.53, 213.49, 224.47, 249.35, 259.64, 260.09, 251.65, 240.24, 239.51, 230.46, 250, 254.04, 240.88, 236.52, 256.43, 273.1, 261.21, 259.89, 249.33, 253], '1Y': [170.74, 170.23, 176.85, 181.06, 179.68, 190.49, 189.52, 179.77, 181.58, 175.99, 173.25, 176.16, 178.2, 185.77, 190.23, 193.15, 189.25, 184.09, 189.68, 198.51, 201.77, 205.72, 201.3, 197.92, 204.59, 190.98, 198.31, 203.49, 209.49, 214.69, 219.64, 225, 215.53, 213.49, 224.47, 249.35, 259.64, 260.09, 251.65, 241.93, 241.62, 239.04, 254.06, 247.6, 246.16, 236.52, 256.43, 273.1, 261.21, 259.89, 249.33, 253] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$101B', pe: 58.6, revenueGrowth: 19, eps: 4.32, grossMargin: 35, dividendYield: 0.19,
      etfPresence: { AIRR: false, PRN: 3.36, RSHO: false, IDEF: 2.06, BILT: false },
      tonyNote: 'Howmet Aerospace is an aerospace structures and engine components manufacturer. It appears in Industrials ETFs for its aerospace and defense exposure — commercial air travel recovery and defense spending growth are the two demand drivers. Revenue grew and margins are expanding as Howmet prices power over OEM customers.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.33, proScore: 0.93, coverage: 0.4,
      price: 186.9, weeklyPrices: [185.95, 187.46, 188.96, 183.00, 186.90], weeklyChange: 0.51, sortRank: 0, periodReturns: { '1M': -11.3, '6M': 1.9, '1Y': 37.6 },
      priceHistory: { '1W': [185.95, 187.46, 188.96, 183, 186.9], '1M': [210.8, 206.83, 206.83, 210.94, 204.72, 197.33, 202.66, 202.52, 202.91, 204.38, 198.95, 199.27, 195.88, 188.39, 187.26, 190.76, 185.95, 187.46, 188.96, 183, 186.9], '6M': [183.38, 170.75, 175.88, 189.02, 206.62, 206.07, 212.4, 210.88, 199.83, 202.25, 208.27, 205.57, 195.98, 207.48, 204.76, 204.49, 231.78, 238.42, 219.1, 208.08, 215.2, 206.83, 202.66, 199.27, 190.76, 186.9], '1Y': [135.8, 140.53, 141.87, 142.91, 137.06, 142.95, 147.96, 151.93, 179.53, 174.7, 165.34, 165.83, 163.64, 168.33, 174.5, 180.62, 186.64, 190.08, 203.12, 203.28, 213.8, 193.93, 177.88, 175.28, 178.88, 177.87, 175.03, 176.43, 175.49, 195.3, 210.54, 209.52, 212.4, 210.88, 199.83, 202.25, 208.27, 205.57, 195.98, 208.98, 222.13, 212.81, 230.29, 230.8, 225.51, 208.08, 215.2, 206.83, 202.66, 199.27, 190.76, 186.9] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$17B', pe: 49.8, revenueGrowth: 26, eps: 3.75, grossMargin: 23, dividendYield: 0.57,
      etfPresence: { AIRR: 3.03, PRN: false, RSHO: false, IDEF: 1.62, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 2, avgWeight: 2.02, proScore: 0.81, coverage: 0.4,
      price: 31.9, weeklyPrices: [32.22, 32.74, 31.17, 30.72, 31.90], weeklyChange: -0.99, sortRank: 0, periodReturns: { '1M': -23.8, '6M': 82.6, '1Y': 487.5 },
      priceHistory: { '1W': [32.22, 32.74, 31.17, 30.72, 31.9], '1M': [41.84, 40.68, 40.74, 43.04, 41.62, 41.59, 42.66, 42.48, 44.35, 48.32, 50.48, 51.4, 51.14, 46.46, 48.09, 43.53, 32.22, 32.74, 31.17, 30.72, 31.9], '6M': [17.47, 17.49, 19.36, 21.39, 25.44, 28, 28.07, 23.95, 22.79, 23.74, 24.63, 26, 25.44, 27.08, 31.83, 27.95, 36.55, 34.41, 39.47, 34.08, 39.69, 40.74, 42.66, 51.4, 43.53, 31.9], '1Y': [5.43, 5.11, 6.06, 6.85, 6.14, 6.79, 6.65, 6.25, 6.27, 6.82, 6.48, 7.21, 6.53, 9.78, 11.11, 12.2, 15.31, 14.7, 13.11, 13.61, 12.86, 12.46, 11.41, 11.23, 11.9, 12.77, 18.24, 19.18, 19.87, 21.84, 25.32, 26.38, 28.07, 23.95, 22.79, 23.74, 24.63, 26, 25.44, 24.81, 35.37, 30.71, 34.23, 39.89, 38.29, 34.08, 39.69, 40.74, 42.66, 51.4, 43.53, 31.9] },
      velocityScore: { '1D': 2.5, '1W': -29.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: null, revenueGrowth: 42, eps: -1.16, grossMargin: 56, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 3.59, RSHO: false, IDEF: 0.44, BILT: false },
      tonyNote: 'Planet Labs is a satellite earth observation company. It holds a speculative position in Industrials ETFs as a data infrastructure name — providing satellite imagery and analytics that support agricultural, energy, and government decision-making. Revenue is growing from a small base; the ETF weight is minimal and the position is thematic.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 1.99, proScore: 0.8, coverage: 0.4,
      price: 55.37, weeklyPrices: [58.52, 57.73, 56.19, 54.82, 55.37], weeklyChange: -5.38, sortRank: 0, periodReturns: { '1M': -2.8, '6M': -29.7, '1Y': 37.1 },
      priceHistory: { '1W': [58.52, 57.73, 56.19, 54.82, 55.37], '1M': [56.99, 57.33, 52.49, 54.85, 52.09, 53.47, 55.82, 54.67, 56.18, 56.8, 57.3, 65.19, 64.13, 63.49, 63.27, 63.4, 58.52, 57.73, 56.19, 54.82, 55.37], '6M': [78.78, 71.4, 77.7, 89.93, 117.86, 128.68, 118.06, 103.37, 93.48, 97.21, 88.23, 89.13, 88.92, 95.31, 77.49, 70.51, 74.46, 74.66, 68.61, 59.56, 61.52, 52.49, 55.82, 65.19, 63.4, 55.37], '1Y': [40.4, 42.16, 41.33, 44.66, 51.71, 59.12, 59.77, 58.7, 59.08, 69.12, 64.78, 68.51, 64.81, 69.2, 80.77, 86.28, 96.19, 94.63, 83.12, 91.18, 88.3, 72.41, 71.69, 67.31, 76.1, 76.5, 75.96, 75.39, 77.47, 91.93, 119.72, 120.59, 118.06, 103.37, 93.48, 97.21, 88.23, 89.13, 88.92, 93.04, 79.98, 67.7, 68.33, 74.41, 65.52, 59.56, 61.52, 52.49, 55.82, 65.19, 63.4, 55.37] },
      velocityScore: { '1D': 1.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 325.7, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.9, PRN: false, RSHO: false, IDEF: 1.08, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.91, proScore: 0.76, coverage: 0.4,
      price: 294.46, weeklyPrices: [293.04, 292.26, 297.52, 289.13, 294.46], weeklyChange: 0.48, sortRank: 0, periodReturns: { '1M': -7.3, '6M': -9.9, '1Y': 30.2 },
      priceHistory: { '1W': [293.04, 292.26, 297.52, 289.13, 294.46], '1M': [317.75, 333.56, 334.22, 336.95, 326.17, 324.6, 321.92, 317.55, 320.63, 320.95, 317.56, 320.9, 308.17, 296.41, 293.66, 294.53, 293.04, 292.26, 297.52, 289.13, 294.46], '6M': [326.72, 322.63, 351.13, 363.48, 398.25, 415.58, 422.79, 429.64, 399.37, 424.89, 435.58, 437.03, 413.7, 422.94, 402.08, 379.9, 411.35, 398.13, 366.88, 362.17, 319.54, 334.22, 321.92, 320.9, 294.53, 294.46], '1Y': [226.15, 234.21, 239.83, 252.08, 258.18, 254.49, 264.82, 278.86, 266.45, 267.46, 266.48, 275.27, 271.13, 274.71, 275.13, 278.77, 284.24, 282.99, 280.02, 299.91, 319.07, 305.43, 312.67, 301.83, 313.62, 304.58, 326.92, 336.64, 345.73, 367.6, 411.66, 422.68, 422.79, 429.64, 399.37, 424.89, 435.58, 437.03, 413.7, 427.99, 402.56, 393.32, 403.37, 396.17, 370.14, 362.17, 319.54, 334.22, 321.92, 320.9, 294.53, 294.46] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 19.1, revenueGrowth: 13, eps: 15.38, grossMargin: 12, dividendYield: 1.91,
      etfPresence: { AIRR: 2.74, PRN: false, RSHO: false, IDEF: 1.07, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'WMB', name: 'WMB', easyScore: 2, avgWeight: 1.4, proScore: 0.56, coverage: 0.4,
      price: 72.45, weeklyPrices: [71.96, 71.59, 71.59, 72.26, 72.45], weeklyChange: 0.68, sortRank: 0, periodReturns: { '1M': -2.3, '6M': 18.9, '1Y': 21.9 },
      priceHistory: { '1W': [71.96, 71.59, 71.59, 72.26, 72.45], '1M': [74.18, 74.73, 75.71, 77.69, 77.72, 79.4, 77.88, 77.52, 78.47, 76.34, 74.37, 73.13, 71.39, 70.04, 71.31, 72.43, 71.96, 71.59, 71.59, 72.26, 72.45], '6M': [60.92, 58.66, 59.52, 61.16, 59.56, 61.51, 65.48, 68.5, 68.84, 72.14, 73.97, 75.77, 74.4, 73.69, 74.46, 72.78, 73.01, 70.76, 71.1, 73.32, 73.76, 75.71, 77.88, 73.13, 72.43, 72.45], '1Y': [59.42, 59.12, 62.87, 58.64, 58.22, 59.35, 57.82, 59.95, 57.89, 57.34, 57.8, 58, 57.2, 58.81, 60.11, 64.01, 64.48, 62.61, 62.46, 57.48, 57.62, 57.94, 59.59, 58.91, 60.93, 62.81, 59.74, 58.26, 59.8, 59.5, 60.49, 63.18, 65.48, 68.5, 68.84, 72.14, 73.97, 75.77, 74.4, 72.8, 73.81, 71.83, 72.82, 70.86, 71.65, 73.32, 73.76, 75.71, 77.88, 73.13, 72.43, 72.45] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$89B', pe: 31.8, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.91,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.97, IDEF: false, BILT: 1.82 },
      tonyNote: 'WMB appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.14, proScore: 0.45, coverage: 0.4,
      price: 570, weeklyPrices: [590.09, 590.97, 592.41, 576.74, 570.00], weeklyChange: -3.4, sortRank: 0, periodReturns: { '1M': -7.1, '6M': 24.4, '1Y': 51.8 },
      priceHistory: { '1W': [590.09, 590.97, 592.41, 576.74, 570], '1M': [613.59, 613.1, 618.91, 611.93, 569.06, 565.22, 571.05, 566.96, 559.95, 584.4, 577.42, 577.83, 571.96, 566.14, 578.34, 589.76, 590.09, 590.97, 592.41, 576.74, 570], '6M': [458.15, 449.77, 456.33, 461.21, 488.31, 495.29, 504.54, 516.1, 547.51, 551.65, 565.44, 570.08, 559.52, 544.55, 552.23, 543.12, 580.55, 586.98, 588.74, 584.49, 623.19, 618.91, 571.05, 577.83, 589.76, 570], '1Y': [375.59, 371.93, 387.69, 388.59, 378.24, 397.33, 388.37, 387.34, 404.66, 401.92, 390.52, 398.71, 387.48, 375.1, 379.98, 384.82, 373.99, 372.64, 372.85, 412.19, 406.45, 431.93, 431.55, 427.81, 444.97, 443.44, 460.17, 451.06, 456.9, 475.7, 489.97, 504.71, 504.54, 516.1, 547.51, 551.65, 565.44, 570.08, 559.52, 547.81, 561.66, 551.99, 595.11, 571.61, 601.39, 584.49, 623.19, 618.91, 571.05, 577.83, 589.76, 570] },
      velocityScore: { '1D': -2.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 62.6, revenueGrowth: 18, eps: 9.11, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.8, PRN: false, RSHO: false, IDEF: 0.47, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.08, proScore: 0.43, coverage: 0.4,
      price: 110.35, weeklyPrices: [111.27, 110.94, 108.82, 106.81, 110.35], weeklyChange: -0.83, sortRank: 0, periodReturns: { '1M': 20, '6M': 44, '1Y': 111.2 },
      priceHistory: { '1W': [111.27, 110.94, 108.82, 106.81, 110.35], '1M': [91.95, 92.32, 92.5, 94.55, 92.03, 92.8, 94.81, 96.36, 98.55, 99.32, 97.11, 108.11, 111.7, 111.28, 112.87, 117.82, 111.27, 110.94, 108.82, 106.81, 110.35], '6M': [76.61, 68.88, 74.22, 81.29, 97.02, 97.1, 101.04, 99.28, 84.36, 86.66, 89.3, 89.18, 86, 81.35, 74.49, 72.91, 80.81, 85.51, 82.61, 74.75, 91.66, 92.5, 94.81, 108.11, 117.82, 110.35], '1Y': [52.26, 51.43, 51.36, 51.43, 50.96, 51.69, 52.98, 52.59, 52.62, 66.83, 65.64, 68.5, 68.93, 72.24, 75.77, 76.82, 83.5, 73.58, 75.54, 79.42, 76.8, 75.36, 71.26, 66.12, 69.89, 70.58, 74.49, 69.65, 74.93, 84.25, 99.14, 99.57, 101.04, 99.28, 84.36, 86.66, 89.3, 89.18, 86, 78.97, 78.71, 74.75, 79.23, 84.91, 78.91, 74.75, 91.66, 92.5, 94.81, 108.11, 117.82, 110.35] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.18, PRN: false, RSHO: false, IDEF: 0.99, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 1.03, proScore: 0.41, coverage: 0.4,
      price: 46.37, weeklyPrices: [49.44, 49.64, 48.37, 45.87, 46.37], weeklyChange: -6.21, sortRank: 0, periodReturns: { '1M': -21.2, '6M': -33.2, '1Y': 0.8 },
      priceHistory: { '1W': [49.44, 49.64, 48.37, 45.87, 46.37], '1M': [58.82, 62.48, 67.28, 66.02, 62.77, 64.2, 65.76, 65.3, 64.1, 60.66, 63.52, 65.86, 57.5, 53.65, 54.65, 54.39, 49.44, 49.64, 48.37, 45.87, 46.37], '6M': [69.37, 68.11, 77.55, 83.99, 107.5, 106.28, 113.34, 111.72, 91.25, 81, 83.44, 98.88, 104.84, 104.06, 101.84, 80.05, 87.75, 92.73, 82.11, 65.98, 63.19, 67.28, 65.76, 65.86, 54.39, 46.37], '1Y': [45.99, 46, 49.99, 45.02, 48.76, 55.74, 50.45, 51.7, 48.21, 50.91, 52.23, 55.45, 62.52, 64.33, 66.12, 68.42, 72.6, 74.71, 75.03, 84.15, 85.6, 74.98, 59.99, 58.96, 67.03, 65.45, 68.44, 71.65, 77.57, 90.41, 107.49, 104.79, 113.34, 111.72, 91.25, 81, 83.44, 98.88, 104.84, 101.43, 99.6, 82.69, 84.22, 87.91, 76.6, 65.98, 63.19, 67.28, 65.76, 65.86, 54.39, 46.37] },
      velocityScore: { '1D': -2.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 201.6, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.88, PRN: false, RSHO: false, IDEF: 0.18, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.6, proScore: 0.24, coverage: 0.4,
      price: 46.63, weeklyPrices: [46.15, 46.55, 47.35, 46.11, 46.63], weeklyChange: 1.03, sortRank: 0, periodReturns: { '1M': 12.4, '6M': 34.1, '1Y': 4.4 },
      priceHistory: { '1W': [46.15, 46.55, 47.35, 46.11, 46.63], '1M': [41.49, 42.87, 42.5, 42.86, 41.5, 42.81, 44.56, 44.55, 44.92, 45.8, 45.35, 48.41, 48.76, 47.96, 47.39, 46.71, 46.15, 46.55, 47.35, 46.11, 46.63], '6M': [34.78, 33.17, 34.28, 37.01, 41.27, 42.07, 42.16, 41.51, 39.48, 39.9, 42.36, 46.95, 46.16, 45.6, 44.06, 44.52, 47.93, 46.29, 42.07, 39.47, 41.79, 42.5, 44.56, 48.41, 46.71, 46.63], '1Y': [44.64, 44.24, 44.6, 46.41, 47.57, 48.13, 48.44, 41.6, 41.25, 41.74, 41.04, 42.47, 41.2, 42.07, 41.44, 43.94, 44.39, 43.23, 39.34, 40.51, 36.05, 35.31, 34.53, 33.08, 34.17, 33.9, 34.46, 33.64, 34.13, 37.46, 40.85, 41.46, 42.16, 41.51, 39.48, 39.9, 42.36, 46.95, 46.16, 46.44, 46.32, 45.86, 47.1, 44.94, 41.41, 39.47, 41.79, 42.5, 44.56, 48.41, 46.71, 46.63] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 43.6, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.78,
      etfPresence: { AIRR: 0.9, PRN: false, RSHO: false, IDEF: 0.31, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.34, proScore: 0.13, coverage: 0.4,
      price: 70.58, weeklyPrices: [70.53, 72.13, 71.48, 68.72, 70.58], weeklyChange: 0.06, sortRank: 0, periodReturns: { '1M': -14.8, '6M': 0.2, '1Y': 68.9 },
      priceHistory: { '1W': [70.53, 72.13, 71.48, 68.72, 70.58], '1M': [82.79, 82.69, 80.64, 83.01, 79.49, 74.91, 76.99, 74.88, 72.76, 74.67, 74.47, 73.27, 71.49, 74.26, 74.29, 72.38, 70.53, 72.13, 71.48, 68.72, 70.58], '6M': [70.46, 67.56, 69.06, 71.79, 74.25, 74.13, 78.53, 82.33, 86, 81.1, 86.1, 73.71, 69.83, 71.44, 75.25, 77.19, 80.54, 86.25, 84.19, 86.04, 96.98, 80.64, 76.99, 73.27, 72.38, 70.58], '1Y': [41.79, 41.98, 45.89, 48.18, 48.98, 50.08, 47.91, 48.15, 55.07, 57.25, 57.02, 59.93, 62.63, 63.96, 65.48, 64.67, 62.41, 60.61, 64.22, 68.84, 67.69, 67.4, 59.64, 59.75, 68.55, 67.82, 67.34, 69.99, 68.66, 71.14, 73.54, 75.27, 78.53, 82.33, 86, 81.1, 86.1, 73.71, 69.83, 71.21, 78.37, 78.71, 81.5, 84.39, 86.48, 86.04, 96.98, 80.64, 76.99, 73.27, 72.38, 70.58] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 48.3, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.35,
      etfPresence: { AIRR: 0.64, PRN: false, RSHO: false, IDEF: 0.03, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'Timken Company', easyScore: 1, avgWeight: 9.11, proScore: 1.82, coverage: 0.2,
      price: 134.23, weeklyPrices: [131.83, 134.67, 137.09, 132.39, 134.23], weeklyChange: 1.82, sortRank: 0, periodReturns: { '1M': 14.3, '6M': 51.3, '1Y': 85.8 },
      priceHistory: { '1W': [131.83, 134.67, 137.09, 132.39, 134.23], '1M': [117.39, 117.12, 115.74, 116.74, 114.49, 109.36, 117.2, 118.93, 119.95, 127.42, 127.16, 126.78, 127.98, 126.54, 131.9, 133.66, 131.83, 134.67, 137.09, 132.39, 134.23], '6M': [88.71, 84.92, 86.52, 88.34, 90.83, 90.65, 93.89, 96.14, 109.41, 107.23, 107.69, 105.59, 103.33, 98.59, 101.03, 100.57, 105.88, 103.73, 106.79, 106.53, 119.7, 115.74, 117.2, 126.78, 133.66, 134.23], '1Y': [72.24, 70.6, 74.03, 76.67, 78.07, 79.16, 81.66, 76.09, 73.91, 77.08, 75.32, 78.21, 77.78, 77.51, 77.5, 75.55, 76.54, 70.79, 73.17, 78.12, 78.68, 77.95, 77.85, 74.55, 81.39, 83.21, 87.38, 85.26, 86.33, 90.95, 91.68, 93.89, 93.89, 96.14, 109.41, 107.23, 107.69, 105.59, 103.33, 98.23, 101.9, 102.06, 106.92, 103.92, 108.7, 106.53, 119.7, 115.74, 117.2, 126.78, 133.66, 134.23] },
      velocityScore: { '1D': 0, '1W': 1.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 30.5, revenueGrowth: 8, eps: 4.4, grossMargin: 31, dividendYield: 1.09,
      etfPresence: { AIRR: false, PRN: false, RSHO: 9.11, IDEF: false, BILT: false },
      tonyNote: 'Timken Company appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 9.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 7.91, proScore: 1.58, coverage: 0.2,
      price: 178.95, weeklyPrices: [180.99, 178.66, 181.56, 177.41, 178.95], weeklyChange: -1.13, sortRank: 0, periodReturns: { '1M': 0.2, '6M': 0.9, '1Y': 26.2 },
      priceHistory: { '1W': [180.99, 178.66, 181.56, 177.41, 178.95], '1M': [178.61, 178.89, 178.11, 175.68, 171.18, 174.49, 174.85, 175.98, 177.01, 178.97, 176.59, 178.96, 179.66, 174.41, 174.26, 179.41, 180.99, 178.66, 181.56, 177.41, 178.95], '6M': [177.42, 178.29, 185.17, 188.26, 193.85, 196.36, 201.28, 203.5, 195.19, 204.81, 195.98, 208.82, 207.26, 203.33, 194, 192.9, 203.48, 198.39, 180.91, 172.79, 176.74, 178.11, 174.85, 178.96, 179.41, 178.95], '1Y': [141.81, 145.87, 142.67, 145.75, 146.87, 151.5, 156.88, 157.57, 155.76, 155.08, 156.32, 160.66, 157.52, 155.85, 158.24, 163.35, 166.58, 157.7, 157.95, 178.65, 177.42, 175.1, 173.96, 172.73, 174.91, 171.1, 178.66, 182.01, 184.42, 190.4, 194.08, 197.5, 201.28, 203.5, 195.19, 204.81, 195.98, 208.82, 207.26, 204.56, 195, 194.72, 203.19, 195.85, 179.3, 172.79, 176.74, 178.11, 174.85, 178.96, 179.41, 178.95] },
      velocityScore: { '1D': -2.5, '1W': 7.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$241B', pe: 33.6, revenueGrowth: 9, eps: 5.32, grossMargin: 20, dividendYield: 1.56,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 7.91, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 7.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.47, proScore: 4.47, coverage: 1,
      price: 209.3, weeklyPrices: [227.81, 218.00, 220.12, 211.69, 209.30], weeklyChange: -8.13, sortRank: 0, periodReturns: { '1M': 12.5, '6M': 122, '1Y': 313.9 },
      priceHistory: { '1W': [227.81, 218, 220.12, 211.69, 209.3], '1M': [186.1, 179.11, 207.27, 221.15, 219.94, 197.73, 191.82, 219.93, 214.77, 208.06, 208.37, 226.34, 231.09, 264.51, 260.58, 259.67, 227.81, 218, 220.12, 211.69, 209.3], '6M': [94.28, 78.09, 87.59, 92.83, 107.33, 99.29, 97.87, 89.95, 91.79, 101.8, 106.12, 97.78, 112, 116.33, 114.91, 103.76, 125, 166.77, 156.14, 141.19, 195.09, 207.27, 191.82, 226.34, 259.67, 209.3], '1Y': [50.57, 48.32, 52.6, 50.25, 44.3, 52.79, 51.37, 54.43, 65.31, 68.46, 66.18, 72.04, 65.47, 90.41, 99.31, 107.7, 127.98, 129.58, 113.44, 117.26, 124.18, 109.44, 88.63, 84.64, 94.87, 98.04, 87.69, 89.46, 86.04, 100.24, 105.43, 98.87, 97.87, 89.95, 91.79, 101.8, 106.12, 97.78, 112, 118.56, 115.09, 101.95, 136.33, 165.34, 157.08, 141.19, 195.09, 207.27, 191.82, 226.34, 259.67, 209.3] },
      velocityScore: { '1D': -1.5, '1W': -6.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$53B', pe: 81.1, revenueGrowth: 684, eps: 2.58, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 2.93, MEME: 5.47, RKNG: 5.02 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 3, avgWeight: 3.96, proScore: 3.96, coverage: 1,
      price: 51.1, weeklyPrices: [54.35, 59.19, 54.02, 51.52, 51.10], weeklyChange: -5.98, sortRank: 0, periodReturns: { '1M': -7.3, '6M': 16.3, '1Y': 396.1 },
      priceHistory: { '1W': [54.35, 59.19, 54.02, 51.52, 51.1], '1M': [55.15, 56.56, 55.17, 58.4, 52.94, 47.74, 52.71, 58.06, 56.83, 59.78, 67.84, 64.05, 63.54, 65.33, 66.6, 61.86, 54.35, 59.19, 54.02, 51.52, 51.1], '6M': [43.94, 35.8, 40.3, 48.24, 50.33, 54.26, 59.99, 54.39, 42.93, 42.08, 44.03, 43.84, 41.98, 42.96, 41.12, 34.28, 36.83, 48.82, 48.39, 42.86, 60.98, 55.17, 52.71, 64.05, 61.86, 51.1], '1Y': [10.3, 9.8, 13.11, 16.82, 16.23, 17.94, 17.72, 16.11, 18.57, 19.08, 19.59, 23.04, 26.15, 33.96, 38.64, 41.86, 50.46, 59.77, 60.72, 62.9, 58.22, 66.96, 48.65, 43.47, 47.81, 44.71, 40.13, 39.92, 39.41, 45.91, 52.99, 53.48, 59.99, 54.39, 42.93, 42.08, 44.03, 43.84, 41.98, 42.21, 41.43, 34.09, 37.06, 47.7, 52.02, 42.86, 60.98, 55.17, 52.71, 64.05, 61.86, 51.1] },
      velocityScore: { '1D': 34.2, '1W': -3.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 66.4, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 3.02, MEME: 5.61, RKNG: 3.25 },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 3, avgWeight: 3.79, proScore: 3.79, coverage: 1,
      price: 38.52, weeklyPrices: [39.62, 40.94, 41.91, 38.92, 38.52], weeklyChange: -2.78, sortRank: 0, periodReturns: { '1M': -13.6, '6M': 25.2, '1Y': 219.7 },
      priceHistory: { '1W': [39.62, 40.94, 41.91, 38.92, 38.52], '1M': [44.59, 43.93, 45.48, 46.71, 42.56, 36.62, 39.52, 48.02, 45.87, 45.14, 48.98, 49.65, 47.28, 47.94, 47.86, 44.15, 39.62, 40.94, 41.91, 38.92, 38.52], '6M': [30.76, 23.9, 24.05, 30.2, 38.21, 35.46, 41.35, 36.7, 37.47, 31.91, 29.08, 28.65, 28.52, 27.51, 26.79, 23.74, 27.79, 30.81, 32.43, 32.69, 44.24, 45.48, 39.52, 49.65, 44.15, 38.52], '1Y': [12.05, 10.61, 10.56, 10.45, 9.18, 11.93, 10.75, 13.14, 14.24, 14.55, 15.77, 16.6, 13.89, 18.68, 20.48, 21.71, 26.53, 33.99, 34.24, 33.43, 33.95, 31.08, 23.06, 21.37, 27.1, 31.22, 27.86, 27.85, 24.81, 30.26, 36.71, 35.06, 41.35, 36.7, 37.47, 31.91, 29.08, 28.65, 28.52, 26.65, 28.37, 24.49, 25.57, 30.09, 36.35, 32.69, 44.24, 45.48, 39.52, 49.65, 44.15, 38.52] },
      velocityScore: { '1D': 0.3, '1W': -0.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.25, MEME: 5.48, RKNG: 3.63 },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab', easyScore: 3, avgWeight: 3.63, proScore: 3.63, coverage: 1,
      price: 107.82, weeklyPrices: [110.08, 113.65, 108.23, 105.05, 107.82], weeklyChange: -2.05, sortRank: 0, periodReturns: { '1M': -8.1, '6M': 69.7, '1Y': 294.1 },
      priceHistory: { '1W': [110.08, 113.65, 108.23, 105.05, 107.82], '1M': [117.35, 117.56, 124.15, 132.55, 124.77, 127.31, 134.28, 125.45, 135.76, 143.2, 150.23, 148.03, 143.48, 122.39, 123.32, 119.95, 110.08, 113.65, 108.23, 105.05, 107.82], '6M': [63.53, 59.92, 70.65, 78.14, 87.9, 89.16, 87, 81.27, 72.03, 74.42, 70.2, 71.91, 71.96, 78.59, 66.07, 64.22, 69.08, 73.6, 90.04, 77.02, 84.65, 124.15, 134.28, 148.03, 119.95, 107.82], '1Y': [27.36, 27.85, 36.14, 35.66, 39.03, 51.39, 47.43, 45.92, 44.21, 42.81, 41.53, 47.91, 45.84, 53.34, 47.79, 46.26, 56.16, 64.26, 66.27, 64.56, 60.92, 49.61, 45.25, 39.48, 42.14, 49.06, 61.49, 70.52, 70.12, 86.03, 86.58, 87.82, 87, 81.27, 72.03, 74.42, 70.2, 71.91, 71.96, 69.48, 72.88, 65.52, 66.74, 82.93, 84.6, 77.02, 84.65, 124.15, 134.28, 148.03, 119.95, 107.82] },
      velocityScore: { '1D': 0, '1W': 6.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$67B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 1.96, MEME: 4.92, RKNG: 4.01 },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 5.76, proScore: 3.84, coverage: 0.667,
      price: 1718.06, weeklyPrices: [1559.32, 1642.00, 1646.54, 1643.23, 1718.06], weeklyChange: 10.18, sortRank: 0, periodReturns: { '1M': 11, '6M': 611.1, '1Y': 4170.6 },
      priceHistory: { '1W': [1559.32, 1642, 1646.54, 1643.23, 1718.06], '1M': [1547.56, 1452.02, 1447.23, 1382.72, 1407.61, 1383.29, 1392.56, 1542.24, 1478.69, 1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1718.06], '6M': [241.61, 219.46, 250.05, 274.08, 389.27, 453.12, 481.43, 695.51, 541.64, 600.4, 632.38, 599.06, 655.43, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1392.56, 1641.64, 1759.68, 1718.06], '1Y': [40.23, 46.62, 47.44, 46.41, 46.09, 42.19, 42.48, 42.92, 40.69, 46.68, 45.5, 50.87, 68.55, 86.13, 102.21, 97.12, 128.41, 116.91, 140.16, 186.16, 195.82, 207.69, 243.57, 195.96, 223.28, 228.47, 206.18, 237.61, 244.25, 349.63, 389.81, 501.29, 481.43, 695.51, 541.64, 600.4, 632.38, 599.06, 655.43, 753.69, 677.86, 692.73, 851.57, 919.47, 932.43, 1064.21, 1409.98, 1447.23, 1392.56, 1641.64, 1759.68, 1718.06] },
      velocityScore: { '1D': 0, '1W': 4.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$254B', pe: 58.7, revenueGrowth: 251, eps: 29.25, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.64, RKNG: 5.89 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 2, avgWeight: 5.28, proScore: 3.52, coverage: 0.667,
      price: 166.32, weeklyPrices: [177.00, 196.64, 162.88, 175.13, 166.32], weeklyChange: -6.03, sortRank: 0, periodReturns: { '1M': -10, '6M': 357.9, '1Y': 919.1 },
      priceHistory: { '1W': [177, 196.64, 162.88, 175.13, 166.32], '1M': [184.9, 188.28, 223.1, 203.57, 190.36, 171.33, 165.26, 176.81, 181.49, 177.62, 179.83, 169.02, 158.41, 185.67, 202.37, 202.89, 177, 196.64, 162.88, 175.13, 166.32], '6M': [36.32, 29.25, 37.17, 34.99, 33.72, 39.26, 37.39, 46.12, 48.49, 43.44, 58.12, 99.71, 127.01, 86.33, 113.9, 84.59, 132.7, 142.55, 149.42, 152.83, 178.54, 223.1, 165.26, 169.02, 202.89, 166.32], '1Y': [16.32, 19.77, 27.77, 28.66, 28.4, 28.63, 27.13, 22.87, 22.33, 21.01, 23.7, 25.49, 23.99, 27.07, 28.99, 25.77, 27.93, 27.15, 31.92, 34.01, 35.07, 29.1, 20.91, 19.49, 26.78, 26.59, 32.06, 31.32, 36.75, 38.61, 34.18, 38.38, 37.39, 46.12, 48.49, 43.44, 58.12, 99.71, 127.01, 92.63, 114.41, 86.35, 133.3, 157.32, 137.73, 152.83, 178.54, 223.1, 165.26, 169.02, 202.89, 166.32] },
      velocityScore: { '1D': 0, '1W': -18.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.04, RKNG: 4.52 },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'NVTS', name: 'Navitas Semiconductor', easyScore: 2, avgWeight: 5.28, proScore: 3.52, coverage: 0.667,
      price: 21.1, weeklyPrices: [25.08, 24.48, 22.85, 20.50, 21.10], weeklyChange: -15.87, sortRank: 0, periodReturns: { '1M': -6.8, '6M': 129.8, '1Y': 165.1 },
      priceHistory: { '1W': [25.08, 24.48, 22.85, 20.5, 21.1], '1M': [22.65, 19.25, 21.17, 22.32, 21.32, 19.43, 22.99, 24.38, 29.25, 31.79, 28.88, 28.51, 26.6, 24.86, 25.86, 30.67, 25.08, 24.48, 22.85, 20.5, 21.1], '6M': [9.18, 7.37, 7.4, 9.05, 10.43, 9.86, 9.56, 9.05, 8.79, 8.09, 9.88, 9.22, 10.84, 9.82, 9.28, 8.77, 9.55, 10.26, 18.47, 15.48, 16.68, 21.17, 22.99, 28.51, 30.67, 21.1], '1Y': [7.96, 7, 6.61, 6.44, 5.84, 6.79, 8.79, 7.33, 6.79, 7.25, 6.21, 6.04, 5.6, 6.17, 7.01, 6.43, 7.82, 8.23, 14.66, 14.07, 12.56, 8.84, 7.91, 7.55, 8.74, 9.48, 8.59, 7.81, 7.21, 10.19, 9.45, 9.76, 9.56, 9.05, 8.79, 8.09, 9.88, 9.22, 10.84, 9.06, 9.48, 8.54, 9.42, 12.37, 18.51, 15.48, 16.68, 21.17, 22.99, 28.51, 30.67, 21.1] },
      velocityScore: { '1D': 0, '1W': 15.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.4, RKNG: 6.16 },
      tonyNote: 'Navitas Semiconductor is a small-cap wide-bandgap power semiconductor name — gallium nitride and silicon carbide for fast charging and EV applications. The $26.60 share price and small market cap position it as a speculative holding in ETFs willing to take higher-risk bets on next-generation power conversion.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 5.08, proScore: 3.39, coverage: 0.667,
      price: 238.75, weeklyPrices: [263.61, 253.57, 259.61, 234.23, 238.75], weeklyChange: -9.43, sortRank: 0, periodReturns: { '1M': -15.9, '6M': 119.1, '1Y': 959.7 },
      priceHistory: { '1W': [263.61, 253.57, 259.61, 234.23, 238.75], '1M': [283.92, 280.69, 289.76, 303.41, 275.95, 261.34, 282.31, 307.88, 302.49, 302.4, 293.8, 290.01, 285, 273.51, 302.85, 291.37, 263.61, 253.57, 259.61, 234.23, 238.75], '6M': [108.99, 80.21, 90.18, 103.87, 136.87, 151.75, 152.31, 168.89, 148.7, 157.27, 174.77, 164.78, 159.21, 160.05, 145.88, 135.49, 146.78, 213.84, 229.75, 287.97, 285.47, 289.76, 282.31, 290.01, 291.37, 238.75], '1Y': [22.53, 21.5, 22.33, 24.24, 25.4, 24.99, 34.34, 37.39, 36.8, 45.11, 44.83, 54.8, 57.07, 67.26, 84.93, 70.32, 90.29, 86.87, 111.5, 110.38, 127.85, 136.86, 103.55, 93.38, 109.24, 119.18, 94.98, 88.82, 88.41, 103.05, 139.77, 150.56, 152.31, 168.89, 148.7, 157.27, 174.77, 164.78, 159.21, 156.58, 150.22, 132.45, 160.13, 210.06, 237.57, 287.97, 285.47, 289.76, 282.31, 290.01, 291.37, 238.75] },
      velocityScore: { '1D': 0, '1W': -0.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$68B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.94, RKNG: 4.22 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 4.37, proScore: 2.91, coverage: 0.667,
      price: 904.56, weeklyPrices: [864.01, 949.28, 935.89, 891.88, 904.56], weeklyChange: 4.69, sortRank: 0, periodReturns: { '1M': 13.7, '6M': 250, '1Y': 679.6 },
      priceHistory: { '1W': [864.01, 949.28, 935.89, 891.88, 904.56], '1M': [795.33, 766.58, 803.63, 776.01, 724.66, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 996, 864.01, 949.28, 935.89, 891.88, 904.56], '6M': [258.46, 248.55, 284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 996, 904.56], '1Y': [116.03, 121.82, 126, 122.29, 124.53, 114.39, 111.26, 109.14, 111.87, 125.29, 115.79, 122, 131.37, 157.23, 162.73, 157.27, 187.83, 181.6, 202.38, 219.02, 224.01, 238.33, 236.95, 201.37, 236.48, 237.22, 241.14, 265.92, 294.37, 343.43, 338.13, 389.11, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 518.46, 666.59, 803.63, 731.99, 923.52, 996, 904.56] },
      velocityScore: { '1D': 2.8, '1W': -4.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.0T', pe: 42.6, revenueGrowth: 196, eps: 21.23, grossMargin: 58, dividendYield: 0.07,
      etfPresence: { BUZZ: 3.65, MEME: false, RKNG: 5.09 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 2, avgWeight: 4.17, proScore: 2.78, coverage: 0.667,
      price: 251.2, weeklyPrices: [206.89, 222.27, 234.32, 237.68, 251.20], weeklyChange: 21.42, sortRank: 0, periodReturns: { '1M': 19.5, '6M': 62.6, '1Y': 250.6 },
      priceHistory: { '1W': [206.89, 222.27, 234.32, 237.68, 251.2], '1M': [210.22, 198.57, 189.36, 184.54, 172.17, 168.99, 182.98, 193.39, 218.41, 221.64, 221.23, 222.35, 236.03, 226.1, 229, 217.5, 206.89, 222.27, 234.32, 237.68, 251.2], '6M': [154.47, 138.57, 144.83, 140.24, 156.07, 153.22, 129.57, 111.31, 134.72, 127.91, 123.46, 102.54, 115.91, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 182.98, 222.35, 217.5, 251.2], '1Y': [71.64, 85.59, 95.05, 93.61, 98.52, 93.47, 101.22, 111.55, 119.78, 117.33, 110.86, 131.82, 140.82, 161.99, 169.56, 142.93, 143.87, 138.83, 143.61, 155.55, 166.62, 162.74, 142.95, 134.73, 177.6, 176.04, 143.91, 150.13, 144.7, 132.95, 161.38, 139.16, 129.57, 111.31, 134.72, 127.91, 123.46, 102.54, 115.91, 101.72, 103.91, 95.92, 107.93, 158.93, 185.54, 175.77, 198.29, 189.36, 182.98, 222.35, 217.5, 251.2] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$46B', pe: 137.3, revenueGrowth: 157, eps: 1.83, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.97, RKNG: 4.37 },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'ONDS', name: 'Ondas Holdings', easyScore: 2, avgWeight: 3.68, proScore: 2.45, coverage: 0.667,
      price: 9.43, weeklyPrices: [10.43, 10.30, 9.65, 9.31, 9.43], weeklyChange: -9.59, sortRank: 0, periodReturns: { '1M': 0.1, '6M': 4.5, '1Y': 537.2 },
      priceHistory: { '1W': [10.43, 10.3, 9.65, 9.31, 9.43], '1M': [9.42, 9.04, 8.86, 11.21, 10.62, 9.13, 9.36, 9.18, 9.06, 9.77, 10.8, 13.25, 13.22, 13.46, 13.58, 11.97, 10.43, 10.3, 9.65, 9.31, 9.43], '6M': [9.02, 7.8, 8.48, 12.53, 13.19, 13.13, 12.26, 11.38, 9.68, 11.07, 10.3, 10.51, 9.83, 11.28, 10.68, 9.04, 9.45, 10.03, 11.06, 9.49, 9.34, 8.86, 9.36, 13.25, 11.97, 9.43], '1Y': [1.48, 1.55, 1.75, 1.85, 2.12, 2.23, 2.13, 2.12, 3.25, 3.93, 3.8, 5.7, 5.63, 6.56, 6.72, 7.66, 9.91, 9.22, 7.61, 7.46, 6.29, 5.25, 6.56, 6.27, 7.9, 9.07, 8.75, 9.22, 8.46, 12.84, 13.89, 12.55, 12.26, 11.38, 9.68, 11.07, 10.3, 10.51, 9.83, 10.83, 10.31, 8.81, 9.14, 10.2, 10.54, 9.49, 9.34, 8.86, 9.36, 13.25, 11.97, 9.43] },
      velocityScore: { '1D': 0, '1W': -14, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: 104.8, revenueGrowth: 1080, eps: 0.09, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.82, RKNG: 2.54 },
      tonyNote: 'Ondas Holdings is a small-cap industrial automation and drone company. It appears in Meme ETFs on the autonomous systems and drone delivery narrative. Revenue is minimal and the path to profitability is unclear; the ETF allocation is speculative and reflects retail interest in autonomous systems themes.',
    },
    {
      ticker: 'OKLO', name: 'Oklo Inc', easyScore: 2, avgWeight: 3.65, proScore: 2.43, coverage: 0.667,
      price: 55.68, weeklyPrices: [58.09, 58.94, 56.48, 54.02, 55.68], weeklyChange: -4.15, sortRank: 0, periodReturns: { '1M': -28.7, '6M': -45.9, '1Y': -18.2 },
      priceHistory: { '1W': [58.09, 58.94, 56.48, 54.02, 55.68], '1M': [78.13, 73.63, 69.66, 67.21, 62.25, 55.88, 62.58, 65.09, 65.88, 68.7, 67.82, 68.09, 66.88, 66.89, 73.47, 65.39, 58.09, 58.94, 56.48, 54.02, 55.68], '6M': [103, 77.72, 76.92, 89.34, 102.5, 89.93, 85.27, 78, 69.47, 67.39, 66.32, 65.65, 62.76, 60.53, 54.96, 49.59, 50.21, 63.35, 72.41, 64.98, 79.62, 69.66, 62.58, 68.09, 65.39, 55.68], '1Y': [68.03, 62.02, 55.85, 53.72, 56.08, 68.98, 75.5, 76.59, 79.32, 73.66, 67.19, 77.89, 69.79, 82.71, 135.23, 110.53, 127.36, 147.16, 163.39, 136.05, 137.39, 106.75, 101.64, 88, 91.38, 104.67, 87.42, 83.23, 74.09, 95.6, 97.09, 90.78, 85.27, 78, 69.47, 67.39, 66.32, 65.65, 62.76, 56.7, 55.27, 48.07, 47.75, 64.21, 76.46, 64.98, 79.62, 69.66, 62.58, 68.09, 65.39, 55.68] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: 0, eps: -0.84, grossMargin: 0, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.84, RKNG: 2.46 },
      tonyNote: 'Oklo Inc appears in 2 of 3 Meme ETFs (67% coverage) with average weight 3.6% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 2, avgWeight: 3.54, proScore: 2.36, coverage: 0.667,
      price: 56.16, weeklyPrices: [56.78, 62.80, 56.69, 56.63, 56.16], weeklyChange: -1.08, sortRank: 0, periodReturns: { '1M': -1.3, '6M': 6.9, '1Y': 41.5 },
      priceHistory: { '1W': [56.78, 62.8, 56.69, 56.63, 56.16], '1M': [56.89, 55.87, 55.26, 57.47, 51.95, 48.44, 52.47, 58.89, 63.64, 63.62, 65.4, 70.14, 72.07, 69.28, 71.4, 65.66, 56.78, 62.8, 56.69, 56.63, 56.16], '6M': [52.55, 46.44, 46, 48.71, 50.95, 50.66, 45.49, 38.47, 35.19, 33.34, 33.59, 37.13, 34.27, 33.31, 32.7, 28.83, 28.99, 43.25, 47.36, 42.11, 52.57, 55.26, 52.47, 70.14, 65.66, 56.16], '1Y': [39.7, 39.63, 41.12, 44.39, 41.81, 46.51, 43.17, 39.87, 40.49, 41.03, 37.17, 43.3, 41.8, 55.61, 70.41, 67.28, 73.28, 70.65, 62.94, 60.3, 60.17, 57.43, 45.4, 41, 49.3, 52.69, 50.35, 48.48, 45.25, 50.76, 48.94, 48.33, 45.49, 38.47, 35.19, 33.34, 33.59, 37.13, 34.27, 32.38, 31.96, 27.79, 28.08, 44.68, 43.63, 42.11, 52.57, 55.26, 52.47, 70.14, 65.66, 56.16] },
      velocityScore: { '1D': 2.2, '1W': -5.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$21B', pe: 144, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: 1.99, MEME: 5.09, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'RGTI', name: 'Rigetti Computing', easyScore: 2, avgWeight: 3.52, proScore: 2.35, coverage: 0.667,
      price: 19.64, weeklyPrices: [20.68, 21.76, 19.69, 19.44, 19.64], weeklyChange: -5.03, sortRank: 0, periodReturns: { '1M': -4.2, '6M': -26.9, '1Y': 56.9 },
      priceHistory: { '1W': [20.68, 21.76, 19.69, 19.44, 19.64], '1M': [20.51, 19.07, 18.42, 19.27, 17.85, 15.96, 16.88, 22.04, 26.42, 25.07, 24.62, 27.03, 25.54, 25.63, 26.88, 24.16, 20.68, 21.76, 19.69, 19.44, 19.64], '6M': [26.88, 22.82, 22.38, 25.01, 25.53, 24.99, 22.31, 18.21, 16.97, 16.18, 17.63, 17.76, 16.94, 16.22, 15.6, 14.04, 14.53, 19.11, 18.38, 16.08, 20.09, 18.42, 16.88, 27.03, 24.16, 19.64], '1Y': [12.52, 11.35, 11.11, 13.45, 12.18, 17.16, 15.44, 14.5, 15.66, 17.98, 14.27, 16.58, 15.1, 19.09, 28.52, 31.18, 40.06, 43.92, 46.38, 38.84, 42.52, 34.36, 25.2, 22.8, 25.57, 28.11, 25.84, 23.76, 22.27, 25.38, 24.47, 23.67, 22.31, 18.21, 16.97, 16.18, 17.63, 17.76, 16.94, 15.67, 15.14, 13.5, 14.31, 19.45, 16.86, 16.08, 20.09, 18.42, 16.88, 27.03, 24.16, 19.64] },
      velocityScore: { '1D': 0, '1W': 0.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 199, eps: -0.89, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.88, RKNG: 3.17 },
      tonyNote: 'Rigetti Computing is a quantum hardware company using superconducting qubit technology. It holds a position in Meme ETFs alongside IonQ and D-Wave as part of the quantum computing basket. Revenue is minimal, the technology is earlier-stage than IonQ, and the ETF allocation is speculative. The weight score is low; this is a high-risk, long-duration positioning.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 2, avgWeight: 3, proScore: 2, coverage: 0.667,
      price: 90.82, weeklyPrices: [93.60, 92.06, 88.71, 87.32, 90.82], weeklyChange: -2.97, sortRank: 0, periodReturns: { '1M': 10, '6M': 7.2, '1Y': 149 },
      priceHistory: { '1W': [93.6, 92.06, 88.71, 87.32, 90.82], '1M': [82.55, 72.96, 74.81, 83.01, 83.67, 88.1, 89.58, 96.23, 105.86, 119.7, 129.6, 133.09, 113.41, 105.65, 118.17, 107.29, 93.6, 92.06, 88.71, 87.32, 90.82], '6M': [84.75, 65.93, 71.95, 90.92, 98.39, 112.44, 111.34, 115.76, 96.27, 84.43, 82.36, 104.89, 88.21, 95.7, 86.98, 82.87, 96.46, 86.91, 84.66, 69.85, 70.68, 74.81, 89.58, 133.09, 107.29, 90.82], '1Y': [36.47, 44.35, 50.62, 45.6, 45.58, 57.98, 54.33, 53.17, 47.71, 48.5, 44.98, 48.95, 42.41, 38.72, 45.1, 49.09, 67.76, 82.03, 83.49, 73.7, 76.68, 65.28, 61.44, 50.7, 56.2, 73.92, 76.7, 75.84, 71.47, 97.49, 92.72, 103.5, 111.34, 115.76, 96.27, 84.43, 82.36, 104.89, 88.21, 90.74, 96.06, 83.99, 91.61, 90.94, 78.75, 69.85, 70.68, 74.81, 89.58, 133.09, 107.29, 90.82] },
      velocityScore: { '1D': -2.4, '1W': -7.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$35B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 3.31, MEME: false, RKNG: 2.7 },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'SPCE', name: 'Virgin Galactic Holdings', easyScore: 1, avgWeight: 7.95, proScore: 2.65, coverage: 0.333,
      price: 5.13, weeklyPrices: [4.38, 4.12, 4.59, 4.71, 5.13], weeklyChange: 17.08, sortRank: 0, periodReturns: { '1M': 75.6, '6M': 44.5, '1Y': 61.3 },
      priceHistory: { '1W': [4.38, 4.12, 4.59, 4.71, 5.13], '1M': [2.92, 2.79, 2.88, 2.88, 2.81, 2.5, 2.47, 2.75, 3.24, 3.51, 3.79, 4.53, 6.18, 7.52, 4.59, 4.72, 4.38, 4.12, 4.59, 4.71, 5.13], '6M': [3.55, 3.28, 3.16, 3.25, 3.19, 3, 3.15, 2.72, 2.71, 2.5, 2.58, 2.61, 2.55, 2.65, 2.38, 2.43, 2.97, 2.83, 2.9, 2.33, 2.66, 2.88, 2.47, 4.53, 4.72, 5.13], '1Y': [3.18, 2.99, 2.96, 2.81, 3.12, 3.87, 4.14, 3.8, 3.42, 3.02, 2.99, 3.13, 3.22, 3.31, 3.29, 3.42, 4.28, 4.09, 4.08, 4, 3.82, 3.58, 3.31, 3.43, 3.87, 4.31, 3.24, 3.5, 3.15, 3.35, 3.07, 3, 3.15, 2.72, 2.71, 2.5, 2.58, 2.61, 2.55, 2.58, 2.52, 2.4, 2.97, 3.06, 2.71, 2.33, 2.66, 2.88, 2.47, 4.53, 4.72, 5.13] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$536M', pe: null, revenueGrowth: -51, eps: -3.87, grossMargin: 0, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.95, RKNG: false },
      tonyNote: 'Virgin Galactic Holdings appears in 1 of 3 Meme ETFs (33% coverage) with average weight 8.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RDW', name: 'Redwire', easyScore: 1, avgWeight: 5.83, proScore: 1.94, coverage: 0.333,
      price: 15.69, weeklyPrices: [18.45, 18.57, 15.75, 14.87, 15.69], weeklyChange: -14.96, sortRank: 0, periodReturns: { '1M': 29, '6M': 104.6, '1Y': -21.8 },
      priceHistory: { '1W': [18.45, 18.57, 15.75, 14.87, 15.69], '1M': [12.16, 11.56, 11.46, 13.99, 14.06, 13.91, 14.77, 15.35, 17.49, 22.04, 24, 25.9, 24.57, 20.68, 20.58, 21.43, 18.45, 18.57, 15.75, 14.87, 15.69], '6M': [7.67, 7.02, 7.15, 10.26, 10.66, 10.66, 14.2, 11.26, 9.38, 8.4, 8.62, 9.28, 9.46, 10.13, 9.05, 8.5, 9.61, 9.91, 11.93, 8.6, 9.64, 11.46, 14.77, 25.9, 21.43, 15.69], '1Y': [20.06, 16.61, 16.96, 15.99, 16.64, 19.41, 16.07, 14.29, 9.47, 9.09, 8.7, 9.2, 8.32, 8.69, 7.95, 8.83, 10.73, 8.74, 7.97, 8, 7.64, 5.98, 5.56, 5.06, 5.51, 6.39, 7.29, 8, 7, 10.64, 10.14, 10.2, 14.2, 11.26, 9.38, 8.4, 8.62, 9.28, 9.46, 9.55, 9.16, 9.08, 9.22, 11.22, 10.04, 8.6, 9.64, 11.46, 14.77, 25.9, 21.43, 15.69] },
      velocityScore: { '1D': 0, '1W': -3.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3B', pe: null, revenueGrowth: 58, eps: -2.59, grossMargin: 13, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.83, RKNG: false },
      tonyNote: 'Redwire Corp is a space infrastructure company — solar arrays, structures, and manufacturing in orbit. It appears in Meme and speculative ETFs as a high-risk space economy play. Revenue is growing from a small base but the business is pre-profitability; the ETF weight is minimal and reflects thematic positioning rather than fundamental conviction.',
    },
    {
      ticker: 'AXTI', name: 'AXT Inc', easyScore: 1, avgWeight: 4.88, proScore: 1.63, coverage: 0.333,
      price: 87.62, weeklyPrices: [89.04, 90.78, 78.36, 85.29, 87.62], weeklyChange: -1.59, sortRank: 0, periodReturns: { '1M': -30.4, '6M': 434.9, '1Y': 4325.3 },
      priceHistory: { '1W': [89.04, 90.78, 78.36, 85.29, 87.62], '1M': [125.81, 122.9, 121.94, 114.98, 123.78, 112.88, 104.61, 121.02, 140.83, 132.6, 122.77, 115.7, 103.16, 109.55, 110.85, 105.99, 89.04, 90.78, 78.36, 85.29, 87.62], '6M': [16.38, 14.01, 15.37, 16.67, 22.24, 21.41, 17.2, 19.74, 24.35, 23.54, 40.97, 39.13, 47.36, 44.36, 68.44, 56.98, 53.18, 62.93, 86.94, 71.07, 104.83, 121.94, 104.61, 115.7, 105.99, 87.62], '1Y': [1.98, 1.91, 2.17, 2.14, 2.2, 2.44, 2.35, 2.08, 2.06, 2.16, 2.48, 2.92, 3.11, 3.66, 4.34, 4.66, 5.13, 4.03, 4.51, 6.06, 7.32, 8.87, 10.44, 9.45, 10.7, 11.58, 14.81, 14.65, 14.59, 20.17, 21.51, 19.78, 17.2, 19.74, 24.35, 23.54, 40.97, 39.13, 47.36, 48.76, 67.35, 47.14, 63.12, 81.78, 75.27, 71.07, 104.83, 121.94, 104.61, 115.7, 105.99, 87.62] },
      velocityScore: { '1D': 0, '1W': 7.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: 39, eps: -0.32, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.88, RKNG: false },
      tonyNote: 'AXT Inc is a compound semiconductor substrate manufacturer — gallium arsenide, indium phosphide, and germanium wafers used in data center optical transceivers, 5G RF chips, and solar cells. Revenue is growing with optical networking demand. Small market cap but positioned at a genuine supply-chain chokepoint for III-V semiconductor materials.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 1, avgWeight: 4.64, proScore: 1.55, coverage: 0.333,
      price: 494, weeklyPrices: [511.72, 526.93, 517.72, 490.09, 494.00], weeklyChange: -3.46, sortRank: 0, periodReturns: { '1M': -4.2, '6M': 163.9, '1Y': 787.4 },
      priceHistory: { '1W': [511.72, 526.93, 517.72, 490.09, 494], '1M': [515.83, 488.74, 494.09, 489.15, 482.02, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 575.5, 511.72, 526.93, 517.72, 490.09, 494], '6M': [187.2, 175.01, 181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 268.81, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 459.62, 531.18, 575.5, 494], '1Y': [55.67, 59.19, 63.51, 66.08, 66.14, 68, 68.82, 78.69, 74.44, 76.24, 74.66, 82.04, 92.04, 97.66, 106.63, 106.88, 131.31, 115.42, 126.2, 129.43, 138.13, 163.6, 157.16, 140.23, 163.33, 168.89, 176.34, 181.08, 179.68, 219.38, 214, 241.9, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 268.81, 304.9, 296.14, 297.73, 337.88, 361.69, 403.12, 412.76, 483.15, 494.09, 459.62, 531.18, 575.5, 494] },
      velocityScore: { '1D': 0, '1W': 4.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$170B', pe: 29.6, revenueGrowth: 46, eps: 16.71, grossMargin: 45, dividendYield: 0.12,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.64 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'WULF', name: 'WULF', easyScore: 1, avgWeight: 4.06, proScore: 1.35, coverage: 0.333,
      price: 23.53, weeklyPrices: [24.00, 25.86, 25.30, 23.19, 23.53], weeklyChange: -1.96, sortRank: 0, periodReturns: { '1M': 0.7, '6M': 48.6, '1Y': 433.6 },
      priceHistory: { '1W': [24, 25.86, 25.3, 23.19, 23.53], '1M': [23.37, 22.8, 23.12, 24.17, 22.32, 21.34, 21.63, 22.92, 22.82, 25.18, 26.74, 26.4, 25.56, 25.66, 26.49, 26.19, 24, 25.86, 25.3, 23.19, 23.53], '6M': [15.83, 11.79, 11.75, 13.62, 13.81, 13.33, 15.31, 14.8, 16.63, 15.38, 17.92, 15.37, 15.22, 16.04, 16.22, 14.43, 18.05, 19.67, 20.55, 20.02, 25.74, 23.12, 21.63, 26.4, 26.19, 23.53], '1Y': [4.41, 3.84, 4.39, 5.26, 4.89, 5.13, 5.17, 5.16, 4.94, 8.71, 9.19, 9.44, 9.13, 10.76, 10.98, 10.83, 11.92, 13.51, 13.93, 13.71, 14.82, 14.28, 11.68, 11.56, 15.51, 14.5, 14.33, 12.52, 11.42, 13.18, 14.14, 13.12, 15.31, 14.8, 16.63, 15.38, 17.92, 15.37, 15.22, 15.3, 16.86, 14.48, 19.03, 19.31, 20.37, 20.02, 25.74, 23.12, 21.63, 26.4, 26.19, 23.53] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: null, revenueGrowth: -1, eps: -2.51, grossMargin: 64, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.06 },
      tonyNote: 'WULF appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
