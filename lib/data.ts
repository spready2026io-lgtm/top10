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
export const SPY_RET: Record<Period, number> = { '1W': -2.8, '1M': 1.9, '6M': 7.6, '1Y': 23.1 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  ARTY: [{ t: 'MRVL', w: 9.6 }, { t: 'AMD', w: 7.2 }, { t: 'MU', w: 7.2 }, { t: 'ORCL', w: 4.4 }, { t: 'CRWV', w: 4.1 }],
  BAI: [{ t: 'MU', w: 5.7 }, { t: 'AMD', w: 5.0 }, { t: 'AVGO', w: 4.8 }, { t: 'NVDA', w: 4.5 }, { t: 'TSM', w: 4.4 }],
  IVEP: [{ t: 'BE', w: 4.9 }, { t: 'PWR', w: 4.3 }, { t: 'COHR', w: 4.0 }, { t: 'EQIX', w: 4.0 }, { t: 'VRT', w: 4.0 }],
  IGPT: [{ t: 'MU', w: 11.5 }, { t: 'AMD', w: 7.2 }, { t: 'GOOGL', w: 6.5 }, { t: 'INTC', w: 6.3 }, { t: 'NVDA', w: 6.0 }],
  IVES: [{ t: 'MU', w: 5.3 }, { t: 'AAPL', w: 4.9 }, { t: 'TSM', w: 4.9 }, { t: 'MSFT', w: 4.8 }, { t: 'NVDA', w: 4.7 }],
  ALAI: [{ t: 'NVDA', w: 13.2 }, { t: 'AMZN', w: 5.9 }, { t: 'MSFT', w: 5.6 }, { t: 'TSM', w: 5.5 }, { t: 'GOOG', w: 5.1 }],
  CHAT: [{ t: 'NVDA', w: 6.0 }, { t: 'GOOGL', w: 5.7 }, { t: 'MU', w: 5.7 }, { t: 'AMD', w: 5.5 }, { t: 'ARM', w: 4.3 }],
  AIFD: [{ t: 'NVDA', w: 6.6 }, { t: 'MRVL', w: 6.3 }, { t: 'LITE', w: 6.0 }, { t: 'DOCN', w: 5.9 }, { t: 'MU', w: 5.8 }],
  SPRX: [{ t: 'COHR', w: 9.1 }, { t: 'ARM', w: 8.2 }, { t: 'ALAB', w: 7.4 }, { t: 'KLAC', w: 6.3 }, { t: 'MKSI', w: 5.1 }],
  AOTG: [{ t: 'AMD', w: 15.6 }, { t: 'NVDA', w: 10.9 }, { t: 'MU', w: 9.8 }, { t: 'TSM', w: 7.2 }, { t: 'APP', w: 4.8 }],
  SOXX: [{ t: 'MU', w: 11.3 }, { t: 'AMD', w: 9.1 }, { t: 'MRVL', w: 9.0 }, { t: 'AVGO', w: 6.1 }, { t: 'NVDA', w: 5.8 }],
  PSI: [{ t: 'AMAT', w: 5.6 }, { t: 'MU', w: 5.4 }, { t: 'KLAC', w: 5.4 }, { t: 'ADI', w: 5.4 }, { t: 'NVDA', w: 5.3 }],
  XSD: [{ t: 'MXL', w: 6.0 }, { t: 'MRVL', w: 4.9 }, { t: 'ALAB', w: 4.1 }, { t: 'NVTS', w: 4.0 }, { t: 'AMD', w: 3.6 }],
  DRAM: [{ t: 'SNDK', w: 5.0 }, { t: 'STX', w: 4.3 }, { t: 'WDC', w: 3.8 }, { t: 'MU', w: 3.8 }],
  PTF: [{ t: 'SNDK', w: 7.4 }, { t: 'STX', w: 4.8 }, { t: 'WDC', w: 4.7 }, { t: 'AAPL', w: 4.7 }, { t: 'NVDA', w: 4.5 }],
  WCLD: [{ t: 'DOCN', w: 3.6 }, { t: 'FROG', w: 2.9 }, { t: 'DDOG', w: 2.7 }, { t: 'TWLO', w: 2.7 }, { t: 'PANW', w: 2.4 }],
  IGV: [{ t: 'ORCL', w: 10.6 }, { t: 'MSFT', w: 7.7 }, { t: 'PANW', w: 7.6 }, { t: 'PLTR', w: 6.8 }, { t: 'CRWD', w: 6.2 }],
  FDTX: [{ t: 'MU', w: 9.4 }, { t: 'MRVL', w: 8.1 }, { t: 'TSM', w: 6.0 }, { t: 'NVDA', w: 4.6 }, { t: 'STX', w: 4.0 }],
  GTEK: [{ t: 'MRVL', w: 4.4 }, { t: 'DELL', w: 2.9 }, { t: 'CDNS', w: 2.5 }, { t: 'NET', w: 2.2 }, { t: 'APH', w: 2.1 }],
  ARKK: [{ t: 'TSLA', w: 10.1 }, { t: 'CRSP', w: 5.1 }, { t: 'TEM', w: 5.1 }, { t: 'AMD', w: 4.9 }, { t: 'HOOD', w: 4.7 }],
  MARS: [{ t: 'RKLB', w: 13.6 }, { t: 'ASTS', w: 9.1 }, { t: 'SATS', w: 8.1 }, { t: 'GSAT', w: 4.7 }, { t: 'PL', w: 4.5 }],
  FRWD: [{ t: 'STX', w: 9.1 }, { t: 'NVDA', w: 8.2 }, { t: 'AMD', w: 7.6 }, { t: 'TSM', w: 5.9 }, { t: 'LRCX', w: 5.8 }],
  BCTK: [{ t: 'TSM', w: 8.6 }, { t: 'AVGO', w: 7.5 }, { t: 'LRCX', w: 6.8 }, { t: 'NVDA', w: 6.6 }, { t: 'GOOG', w: 5.6 }],
  FWD: [{ t: 'AVGO', w: 3.2 }, { t: 'AMD', w: 2.7 }, { t: 'NVDA', w: 1.9 }, { t: 'CAT', w: 1.8 }, { t: 'LRCX', w: 1.8 }],
  CBSE: [{ t: 'MRVL', w: 3.3 }, { t: 'TXG', w: 2.9 }, { t: 'SNOW', w: 2.8 }, { t: 'MU', w: 2.8 }, { t: 'STX', w: 2.7 }],
  FCUS: [{ t: 'STRL', w: 4.5 }, { t: 'DELL', w: 4.4 }, { t: 'BE', w: 4.4 }, { t: 'SITM', w: 4.3 }, { t: 'INTC', w: 4.3 }],
  WGMI: [{ t: 'CIFR', w: 16.4 }, { t: 'IREN', w: 12.9 }, { t: 'WULF', w: 9.1 }, { t: 'CORZ', w: 7.3 }, { t: 'KEEL', w: 7.2 }],
  VOLT: [{ t: 'POWL', w: 7.9 }, { t: 'BELFB', w: 7.2 }, { t: 'PWR', w: 5.5 }, { t: 'ETN', w: 5.4 }, { t: 'AEP', w: 4.3 }],
  PBD: [{ t: 'SEDG', w: 1.2 }, { t: 'FSLR', w: 1.1 }, { t: 'BLDP', w: 1.1 }, { t: 'ENPH', w: 1.1 }, { t: 'SHLS', w: 1.1 }],
  PBW: [{ t: 'HYLN', w: 4.2 }, { t: 'NVTS', w: 3.2 }, { t: 'FCEL', w: 3.0 }, { t: 'BLDP', w: 2.2 }, { t: 'BE', w: 2.1 }],
  AIRR: [{ t: 'STRL', w: 6.6 }, { t: 'AGX', w: 4.3 }, { t: 'FIX', w: 4.3 }, { t: 'CHRW', w: 4.2 }, { t: 'SAIA', w: 4.1 }],
  PRN: [{ t: 'TTMI', w: 5.5 }, { t: 'FIX', w: 4.8 }, { t: 'STRL', w: 4.8 }, { t: 'AGX', w: 4.7 }, { t: 'PWR', w: 4.1 }],
  RSHO: [{ t: 'TKR', w: 9.0 }, { t: 'POWL', w: 8.0 }, { t: 'CGNX', w: 7.3 }, { t: 'CAT', w: 6.8 }, { t: 'ETN', w: 5.8 }],
  IDEF: [{ t: 'RTX', w: 7.5 }, { t: 'LMT', w: 6.6 }, { t: 'GD', w: 5.4 }, { t: 'PLTR', w: 4.9 }, { t: 'NOC', w: 4.8 }],
  BILT: [{ t: 'UNP', w: 5.5 }, { t: 'AEP', w: 4.4 }, { t: 'AENA', w: 4.1 }, { t: 'LNG', w: 3.9 }, { t: 'CP', w: 3.6 }],
  BUZZ: [{ t: 'SMCI', w: 4.0 }, { t: 'ASTS', w: 3.7 }, { t: 'MU', w: 3.6 }, { t: 'NOW', w: 3.5 }, { t: 'NBIS', w: 3.3 }],
  MEME: [{ t: 'SPCE', w: 7.4 }, { t: 'RDW', w: 6.7 }, { t: 'AAOI', w: 6.4 }, { t: 'BE', w: 5.9 }, { t: 'ASTS', w: 5.8 }],
  RKNG: [{ t: 'NVTS', w: 6.7 }, { t: 'SNDK', w: 5.9 }, { t: 'MU', w: 5.2 }, { t: 'NBIS', w: 5.1 }, { t: 'WDC', w: 4.7 }],
};
// @@END_GENERATED:ETF_TOP_HOLDINGS@@

// @@GENERATED:TOP10_RET@@
// Top10 composite returns per theme per period (average of all ETFs in theme)
const TOP10_RET: Record<Theme, Record<Period, number>> = {
  'AI & ML':         { '1W': -8.4, '1M': 7.1, '6M': 33.4, '1Y': 75.2 },
  'Semiconductors':  { '1W': -8.5, '1M': 11.6, '6M': 80.5, '1Y': 140.1 },
  'Broad Tech':      { '1W': -8, '1M': 5.7, '6M': 21.9, '1Y': 50.5 },
  'Electrification': { '1W': -6.3, '1M': -4.8, '6M': 31.9, '1Y': 72.8 },
  'Industrials':     { '1W': -0.8, '1M': -1.3, '6M': 22.6, '1Y': 40.3 },
  'Meme':            { '1W': -10.7, '1M': 3.5, '6M': 16.6, '1Y': 12.3 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, Record<Period, ChartPeriodData>> = {
  'AI & ML': {
    '1W': { top10: [100, 102.02, 101.06, 99.67, 91.59], spy: [100, 100.14, 99.43, 99.81, 97.23], top10Return: -8.4, spyReturn: -2.8, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 103.32, 101.17, 104.23, 106.49, 106.39, 107.43, 103.94, 101.95, 101.16, 104.35, 106.8, 107.75, 111.87, 111.55, 114.17, 117.14, 119.51, 118.38, 116.71, 107.1], spy: [100, 101.39, 101.08, 101.91, 102.15, 102.56, 103.37, 102.13, 102.06, 101.38, 102.42, 102.62, 103.02, 103.71, 103.69, 104.52, 104.8, 104.95, 104.21, 104.6, 101.9], top10Return: 7.1, spyReturn: 1.9, xLabels: ["May 10", "May 17", "May 24", "May 31", "Jun 7"] },
    '6M': { top10: [100, 97.42, 97.96, 99, 102.15, 102.56, 101.74, 106.09, 97.44, 101.88, 101.53, 102.61, 99.92, 101.35, 101.1, 100.46, 98.14, 104.05, 112.28, 115.73, 119.06, 125.74, 133.44, 133.03, 142.5, 133.4], spy: [100, 99.43, 99.26, 100.32, 100.89, 101.18, 99.96, 101.42, 100.07, 100.91, 99.82, 100.53, 99.36, 98.63, 96.46, 95.79, 95.56, 99.16, 102.33, 103.32, 104.81, 106.69, 109.11, 108.32, 110.32, 107.56], top10Return: 33.4, spyReturn: 7.6, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 99.58, 101.51, 107.29, 106.92, 108.44, 110.81, 113.14, 113.23, 114.66, 115.76, 113.56, 113.77, 119.68, 124.9, 127.78, 126.94, 132.76, 132.91, 132.69, 138.5, 140.21, 136.47, 126.82, 126.09, 130.47, 133.92, 127, 131.36, 130.85, 134.9, 134.53, 136.54, 139.25, 126.17, 132.5, 134.3, 135.89, 131.56, 130.35, 134.5, 126.09, 129.76, 140.6, 153.11, 160.04, 160.18, 170.12, 181.99, 181.12, 195.2, 182.32], spy: [100, 99.64, 100.17, 103.12, 103.54, 103.84, 104.95, 106.31, 105.35, 106.14, 107.37, 107.23, 106.86, 108.54, 110.16, 110.69, 110.77, 112.1, 110.67, 112.04, 114.37, 114.05, 113.74, 111.1, 111.61, 113.75, 114.1, 113.62, 114.3, 114.67, 115.09, 115.23, 114.99, 115.84, 113.1, 113.71, 114.24, 115.05, 113.71, 111.17, 110.12, 107.67, 109.46, 113.41, 118.53, 119.16, 119.95, 122.11, 124.87, 123.96, 126.26, 123.1], top10Return: 75.2, spyReturn: 23.1, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Semiconductors': {
    '1W': { top10: [100, 104.94, 106.22, 103.58, 91.48], spy: [100, 100.14, 99.43, 99.81, 97.23], top10Return: -8.5, spyReturn: -2.8, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 104.08, 101.52, 109.35, 113.04, 111.23, 111.13, 106.98, 103.61, 104.06, 108.63, 111.3, 113, 121.62, 120.63, 120.97, 122.83, 128.7, 130.19, 126.68, 111.61], spy: [100, 101.39, 101.08, 101.91, 102.15, 102.56, 103.37, 102.13, 102.06, 101.38, 102.42, 102.62, 103.02, 103.71, 103.69, 104.52, 104.8, 104.95, 104.21, 104.6, 101.9], top10Return: 11.6, spyReturn: 1.9, xLabels: ["May 10", "May 17", "May 24", "May 31", "Jun 7"] },
    '6M': { top10: [100, 99.35, 101.92, 102.49, 111.48, 111.77, 115.61, 116.81, 112.82, 122.52, 119.82, 121.46, 119.07, 125.48, 128.42, 133.49, 130.76, 136.91, 143.09, 154.25, 161.85, 177.01, 188.32, 192.37, 201.6, 180.48], spy: [100, 99.43, 99.26, 100.32, 100.89, 101.18, 99.96, 101.42, 100.07, 100.91, 99.82, 100.53, 99.36, 98.63, 96.46, 95.79, 95.56, 99.16, 102.33, 103.32, 104.81, 106.69, 109.11, 108.32, 110.32, 107.56], top10Return: 80.5, spyReturn: 7.6, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.17, 104.24, 109.86, 112.54, 112.84, 114.66, 113.89, 111.87, 112.36, 116.25, 116.71, 115.38, 120.02, 125.06, 130.86, 128.67, 137.37, 136.16, 140.79, 144.47, 145.04, 142.34, 130.76, 132.31, 140.55, 147.2, 140.58, 143.36, 142.24, 152.52, 155.75, 163.56, 166.06, 156.4, 166.25, 166.01, 167.27, 157.11, 153.21, 158.97, 155.29, 159.82, 179.83, 196.41, 221.68, 222.22, 237.86, 255.5, 254.95, 269.78, 253.06], spy: [100, 99.64, 100.17, 103.12, 103.54, 103.84, 104.95, 106.31, 105.35, 106.14, 107.37, 107.23, 106.86, 108.54, 110.16, 110.69, 110.77, 112.1, 110.67, 112.04, 114.37, 114.05, 113.74, 111.1, 111.61, 113.75, 114.1, 113.62, 114.3, 114.67, 115.09, 115.23, 114.99, 115.84, 113.1, 113.71, 114.24, 115.05, 113.71, 111.17, 110.12, 107.67, 109.46, 113.41, 118.53, 119.16, 119.95, 122.11, 124.87, 123.96, 126.26, 123.1], top10Return: 140.1, spyReturn: 23.1, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Broad Tech': {
    '1W': { top10: [100, 101.15, 99.5, 99.25, 91.98], spy: [100, 100.14, 99.43, 99.81, 97.23], top10Return: -8, spyReturn: -2.8, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 102.64, 100.91, 103.34, 105.14, 104.04, 105.59, 102.94, 102.11, 101.38, 103.86, 105.64, 107.23, 110.68, 110.73, 113.07, 115.05, 116.3, 114.28, 114.02, 105.65], spy: [100, 101.39, 101.08, 101.91, 102.15, 102.56, 103.37, 102.13, 102.06, 101.38, 102.42, 102.62, 103.02, 103.71, 103.69, 104.52, 104.8, 104.95, 104.21, 104.6, 101.9], top10Return: 5.7, spyReturn: 1.9, xLabels: ["May 10", "May 17", "May 24", "May 31", "Jun 7"] },
    '6M': { top10: [100, 98.75, 98.72, 98.81, 101.36, 102.49, 101.49, 103.12, 96.43, 99.17, 99.51, 101.29, 99.55, 98.95, 98.16, 97.52, 96.77, 100.87, 108.89, 111.95, 113.51, 119.37, 123.71, 123.92, 129.79, 121.94], spy: [100, 99.43, 99.26, 100.32, 100.89, 101.18, 99.96, 101.42, 100.07, 100.91, 99.82, 100.53, 99.36, 98.63, 96.46, 95.79, 95.56, 99.16, 102.33, 103.32, 104.81, 106.69, 109.11, 108.32, 110.32, 107.56], top10Return: 21.9, spyReturn: 7.6, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 98.58, 100.42, 105.09, 105.99, 106.25, 108.84, 108.92, 107.19, 106.22, 108.8, 108.66, 109.33, 112.25, 117.14, 120.77, 121.91, 127.74, 130.43, 130.19, 132.37, 133.14, 128.69, 118.06, 118.82, 121.26, 124.49, 117.82, 121.6, 118.69, 123.61, 126.5, 126.78, 126.92, 115.38, 120.55, 124.07, 126.72, 123.54, 121.85, 124.69, 120.58, 122.63, 127.99, 138.03, 140.76, 141.37, 148.68, 152.29, 152.35, 160.56, 150.51], spy: [100, 99.64, 100.17, 103.12, 103.54, 103.84, 104.95, 106.31, 105.35, 106.14, 107.37, 107.23, 106.86, 108.54, 110.16, 110.69, 110.77, 112.1, 110.67, 112.04, 114.37, 114.05, 113.74, 111.1, 111.61, 113.75, 114.1, 113.62, 114.3, 114.67, 115.09, 115.23, 114.99, 115.84, 113.1, 113.71, 114.24, 115.05, 113.71, 111.17, 110.12, 107.67, 109.46, 113.41, 118.53, 119.16, 119.95, 122.11, 124.87, 123.96, 126.26, 123.1], top10Return: 50.5, spyReturn: 23.1, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Electrification': {
    '1W': { top10: [100, 101.72, 100.65, 100.5, 93.76], spy: [100, 100.14, 99.43, 99.81, 97.23], top10Return: -6.3, spyReturn: -2.8, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 101.06, 98.87, 100.57, 102.81, 100.98, 100.94, 98.28, 95.24, 93.06, 95.32, 98.28, 99.92, 103.35, 102.72, 101.94, 101.85, 103.66, 102.45, 102.34, 95.27], spy: [100, 101.39, 101.08, 101.91, 102.15, 102.56, 103.37, 102.13, 102.06, 101.38, 102.42, 102.62, 103.02, 103.71, 103.69, 104.52, 104.8, 104.95, 104.21, 104.6, 101.9], top10Return: -4.8, spyReturn: 1.9, xLabels: ["May 10", "May 17", "May 24", "May 31", "Jun 7"] },
    '6M': { top10: [100, 98.8, 98.4, 98.82, 102.81, 105.01, 107.86, 111.47, 110, 114.97, 114.07, 117.03, 109.51, 112, 111.61, 114.55, 112.18, 118.61, 122.97, 129.25, 135.12, 137.61, 140.18, 136.34, 141.07, 131.93], spy: [100, 99.43, 99.26, 100.32, 100.89, 101.18, 99.96, 101.42, 100.07, 100.91, 99.82, 100.53, 99.36, 98.63, 96.46, 95.79, 95.56, 99.16, 102.33, 103.32, 104.81, 106.69, 109.11, 108.32, 110.32, 107.56], top10Return: 31.9, spyReturn: 7.6, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.66, 101.13, 104.18, 106.8, 108.49, 111.25, 113.81, 111.06, 113, 116.41, 116.45, 113.8, 114.89, 118.81, 122.35, 124.35, 132.46, 134.8, 137.4, 137.44, 138.33, 139.23, 131.37, 130.7, 135.21, 137.32, 136.45, 138.99, 135.45, 139.08, 143.3, 148.76, 148.33, 144.08, 146, 149.1, 152.98, 146.96, 148.21, 150.03, 149.56, 152.55, 160.8, 169.49, 173.8, 175.72, 174.65, 181.17, 178.96, 185.39, 172.81], spy: [100, 99.64, 100.17, 103.12, 103.54, 103.84, 104.95, 106.31, 105.35, 106.14, 107.37, 107.23, 106.86, 108.54, 110.16, 110.69, 110.77, 112.1, 110.67, 112.04, 114.37, 114.05, 113.74, 111.1, 111.61, 113.75, 114.1, 113.62, 114.3, 114.67, 115.09, 115.23, 114.99, 115.84, 113.1, 113.71, 114.24, 115.05, 113.71, 111.17, 110.12, 107.67, 109.46, 113.41, 118.53, 119.16, 119.95, 122.11, 124.87, 123.96, 126.26, 123.1], top10Return: 72.8, spyReturn: 23.1, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Industrials': {
    '1W': { top10: [100, 101.31, 101.06, 102.02, 99.21], spy: [100, 100.14, 99.43, 99.81, 97.23], top10Return: -0.8, spyReturn: -2.8, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 102.18, 99.67, 100.05, 101.13, 100.28, 100.96, 98.29, 96.95, 95.83, 97.66, 97.85, 98.74, 101.2, 101.19, 101.01, 99.52, 100.83, 100.58, 101.53, 98.71], spy: [100, 101.39, 101.08, 101.91, 102.15, 102.56, 103.37, 102.13, 102.06, 101.38, 102.42, 102.62, 103.02, 103.71, 103.69, 104.52, 104.8, 104.95, 104.21, 104.6, 101.9], top10Return: -1.3, spyReturn: 1.9, xLabels: ["May 10", "May 17", "May 24", "May 31", "Jun 7"] },
    '6M': { top10: [100, 101.07, 100.94, 101.76, 106.1, 109.07, 111.84, 111.41, 112.23, 117.44, 119.31, 119.97, 114.96, 114.2, 112.32, 114.11, 113.32, 119.57, 119.05, 121.5, 122.86, 123.71, 125.46, 121.37, 125.37, 122.56], spy: [100, 99.43, 99.26, 100.32, 100.89, 101.18, 99.96, 101.42, 100.07, 100.91, 99.82, 100.53, 99.36, 98.63, 96.46, 95.79, 95.56, 99.16, 102.33, 103.32, 104.81, 106.69, 109.11, 108.32, 110.32, 107.56], top10Return: 22.6, spyReturn: 7.6, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 99.45, 100.53, 103.19, 103.91, 104.4, 105.04, 107.49, 106.4, 106.9, 108.36, 108.95, 108.47, 108.77, 111.53, 112.86, 112.66, 116.03, 114.32, 114.98, 117.84, 117.02, 115.21, 109.59, 110.29, 112.1, 114.23, 114.99, 117.52, 115.92, 120.93, 125.86, 129.2, 129.07, 128.96, 133.74, 136.37, 136.48, 130.7, 127.22, 128.41, 126.62, 129.31, 135.97, 138.51, 138.57, 140.29, 141.63, 143.45, 138.9, 143.08, 140.27], spy: [100, 99.64, 100.17, 103.12, 103.54, 103.84, 104.95, 106.31, 105.35, 106.14, 107.37, 107.23, 106.86, 108.54, 110.16, 110.69, 110.77, 112.1, 110.67, 112.04, 114.37, 114.05, 113.74, 111.1, 111.61, 113.75, 114.1, 113.62, 114.3, 114.67, 115.09, 115.23, 114.99, 115.84, 113.1, 113.71, 114.24, 115.05, 113.71, 111.17, 110.12, 107.67, 109.46, 113.41, 118.53, 119.16, 119.95, 122.11, 124.87, 123.96, 126.26, 123.1], top10Return: 40.3, spyReturn: 23.1, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Meme': {
    '1W': { top10: [100, 102.46, 98.88, 99.41, 89.27], spy: [100, 100.14, 99.43, 99.81, 97.23], top10Return: -10.7, spyReturn: -2.8, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 104.18, 98.99, 102.35, 107.07, 106.28, 107.29, 103.09, 98.94, 97.41, 101.16, 107.27, 109.82, 113.49, 115.19, 115.72, 115.9, 118.78, 114.59, 115.23, 103.43], spy: [100, 101.39, 101.08, 101.91, 102.15, 102.56, 103.37, 102.13, 102.06, 101.38, 102.42, 102.62, 103.02, 103.71, 103.69, 104.52, 104.8, 104.95, 104.21, 104.6, 101.9], top10Return: 3.5, spyReturn: 1.9, xLabels: ["May 10", "May 17", "May 24", "May 31", "Jun 7"] },
    '6M': { top10: [100, 96.4, 93.16, 89.92, 94.86, 98.68, 98.14, 97.86, 87.02, 89.43, 89.68, 88.87, 84.99, 86.54, 89.15, 91.24, 88.45, 94.59, 105.04, 106.8, 106.45, 113.88, 118.62, 123.82, 131.46, 116.59], spy: [100, 99.43, 99.26, 100.32, 100.89, 101.18, 99.96, 101.42, 100.07, 100.91, 99.82, 100.53, 99.36, 98.63, 96.46, 95.79, 95.56, 99.16, 102.33, 103.32, 104.81, 106.69, 109.11, 108.32, 110.32, 107.56], top10Return: 16.6, spyReturn: 7.6, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.56, 101.29, 98.6, 96.09, 94.45, 93.25, 93.81, 87.03, 87.3, 86.14, 87.7, 88.13, 91.17, 92.01, 88.01, 93.08, 93.54, 94.02, 96.36, 99.99, 97.95, 95.38, 90.09, 87.11, 84.79, 90.72, 86.24, 89.99, 89.95, 91.95, 94.61, 94.71, 95.19, 91.25, 90.93, 89.06, 89.53, 93.14, 96.92, 99.25, 100.94, 98.58, 99.03, 103.67, 107.01, 112.14, 113.28, 118.86, 123.6, 127.28, 112.32], spy: [100, 99.64, 100.17, 103.12, 103.54, 103.84, 104.95, 106.31, 105.35, 106.14, 107.37, 107.23, 106.86, 108.54, 110.16, 110.69, 110.77, 112.1, 110.67, 112.04, 114.37, 114.05, 113.74, 111.1, 111.61, 113.75, 114.1, 113.62, 114.3, 114.67, 115.09, 115.23, 114.99, 115.84, 113.1, 113.71, 114.24, 115.05, 113.71, 111.17, 110.12, 107.67, 109.46, 113.41, 118.53, 119.16, 119.95, 122.11, 124.87, 123.96, 126.26, 123.1], top10Return: 12.3, spyReturn: 23.1, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
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
  price: number;
  weeklyChange: number;
};

// ── Theme configuration ───────────────────────────────────────────────────────

export const THEMES: Theme[] = ['AI & ML', 'Semiconductors', 'Broad Tech', 'Electrification', 'Industrials', 'Meme'];

// Last scan timestamp — patched by build-data-ts.js after each run
// @@GENERATED:SCAN_TIMESTAMP@@
export const SCAN_TIMESTAMP    = '2026-06-07T13:36:18.250Z';
export const SCAN_TIMESTAMP_NY = 'June 7, 2026 at 9:36 AM ET';
// @@END_GENERATED:SCAN_TIMESTAMP@@

// Number of ETFs per theme — denominator for Coverage Score display (x/n badge)
// @@GENERATED:THEME_ETF_COUNT@@
export const THEME_ETF_COUNT: Record<Theme, number> = {
  'AI & ML':         10,
  'Semiconductors':  4,
  'Broad Tech':      13,
  'Electrification': 3,
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
  { ticker: 'MU', name: `MICRON TECHNOLOGY INC`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 13.54, bestProScore: 5.95, price: 864.01, weeklyChange: -16.56 },
  { ticker: 'NVDA', name: `NVIDIA CORP`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 11.40, bestProScore: 5.93, price: 205.10, weeklyChange: -8.58 },
  { ticker: 'AMD', name: `ADVANCED MICRO DEVICES INC`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 10.85, bestProScore: 4.66, price: 466.38, weeklyChange: -8.58 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 7.13, bestProScore: 3.49, price: 263.47, weeklyChange: 20.07 },
  { ticker: 'AVGO', name: `BROADCOM INC`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 5.93, bestProScore: 2.67, price: 385.73, weeklyChange: -16.14 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 4.74, bestProScore: 2.63, price: 284.87, weeklyChange: -1.13 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.18, bestProScore: 2.53, price: 415.17, weeklyChange: -4.70 },
  { ticker: 'AMZN', name: `AMAZON.COM INC`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 3.34, bestProScore: 2.13, price: 246.03, weeklyChange: -5.83 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.25, bestProScore: 2.15, price: 303.28, weeklyChange: -4.36 },
  { ticker: 'MSFT', name: `MICROSOFT CORP`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 3.10, bestProScore: 1.90, price: 416.67, weeklyChange: -9.52 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': -9.9, '1M': 11.1, '6M': 88.6, '1Y': 173.9 },
  ARTY: { '1W': -9.5, '1M': 8.3, '6M': 42.6, '1Y': 85.2 },
  BAI:  { '1W': -10.6, '1M': 1.7, '6M': 29.8, '1Y': 69.8 },
  IVEP: { '1W': -1.1, '1M': -5.6, '6M': 4.4, '1Y': 4.4 },
  IGPT: { '1W': -10.8, '1M': 8.8, '6M': 53.8, '1Y': 95.5 },
  IVES: { '1W': -10.4, '1M': 9.3, '6M': 13.7, '1Y': 46.2 },
  ALAI: { '1W': -7.4, '1M': 6.3, '6M': 16.2, '1Y': 49.1 },
  CHAT: { '1W': -11.2, '1M': 10.1, '6M': 46, '1Y': 104.4 },
  AIFD: { '1W': -6, '1M': 6.1, '6M': 36.9, '1Y': 81 },
  SPRX: { '1W': -7, '1M': 16.3, '6M': 27.4, '1Y': 88.4 },
  AOTG: { '1W': -8.7, '1M': 5.7, '6M': 7.9, '1Y': 29.6 },
  // Semiconductors
  SOXX: { '1W': -5.6, '1M': 11.8, '6M': 74.5, '1Y': 148.4 },
  PSI:  { '1W': -5.6, '1M': 3.8, '6M': 79.3, '1Y': 167.9 },
  XSD:  { '1W': -4.9, '1M': 10.3, '6M': 67.2, '1Y': 143 },
  DRAM: { '1W': -18, '1M': 20.5, '6M': 101, '1Y': 101 },
  // Broad Tech
  PTF:  { '1W': -6.7, '1M': 2.9, '6M': 51.3, '1Y': 82.3 },
  WCLD: { '1W': -10.4, '1M': 8.1, '6M': -8.5, '1Y': -12.1 },
  IGV:  { '1W': -11, '1M': 8.6, '6M': -12.4, '1Y': -9.6 },
  FDTX: { '1W': -5.1, '1M': 11.5, '6M': 29.4, '1Y': 43.4 },
  GTEK: { '1W': -6.8, '1M': 5, '6M': 40.4, '1Y': 64.4 },
  ARKK: { '1W': -8.3, '1M': -2.7, '6M': -9.1, '1Y': 21.9 },
  MARS: { '1W': -12.2, '1M': 13.8, '6M': 38.9, '1Y': 38.9 },
  FRWD: { '1W': -7.8, '1M': 6.9, '6M': 24.1, '1Y': 24.1 },
  BCTK: { '1W': -6.8, '1M': 5.6, '6M': 19.7, '1Y': 19.7 },
  FWD:  { '1W': -6.1, '1M': 3.4, '6M': 27.6, '1Y': 60.9 },
  CBSE: { '1W': -5.2, '1M': 0.2, '6M': 18.1, '1Y': 37.1 },
  FCUS: { '1W': -4.9, '1M': -1.5, '6M': 30.4, '1Y': 71 },
  WGMI: { '1W': -13, '1M': 11.7, '6M': 35.3, '1Y': 214.7 },
  // Electrification
  POW:  { '1W': -7.4, '1M': -11.6, '6M': 43.9, '1Y': 43 },
  VOLT: { '1W': -0.3, '1M': -6.7, '6M': 28.5, '1Y': 58.4 },
  PBD:  { '1W': -7.2, '1M': -3.7, '6M': 28.3, '1Y': 71.8 },
  PBW:  { '1W': -10.1, '1M': 3, '6M': 27, '1Y': 118.1 },
  // Industrials
  AIRR: { '1W': 0.4, '1M': -2.1, '6M': 29.2, '1Y': 61.2 },
  PRN:  { '1W': -1.8, '1M': -1.6, '6M': 35.7, '1Y': 54.5 },
  RSHO: { '1W': -0.1, '1M': 1.8, '6M': 28.5, '1Y': 50.4 },
  IDEF: { '1W': -4.3, '1M': -3.9, '6M': 7.4, '1Y': 19.2 },
  BILT: { '1W': 1.8, '1M': -0.6, '6M': 12, '1Y': 16.1 },
  // Meme
  BUZZ: { '1W': -9.7, '1M': 4.3, '6M': 6.1, '1Y': 33 },
  MEME: { '1W': -12.3, '1M': 5.6, '6M': 40, '1Y': 0.3 },
  RKNG: { '1W': -10.2, '1M': 0.5, '6M': 3.7, '1Y': 3.7 },
};
// @@END_GENERATED:ETF_RETURNS@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 9, avgWeight: 6.59, proScore: 5.93, coverage: 0.9,
      price: 205.1, weeklyPrices: [224.36, 222.82, 214.75, 218.66, 205.10], weeklyChange: -8.58, sortRank: 0, periodReturns: { '1M': 4.4, '6M': 12.4, '1Y': 44.7 },
      priceHistory: { '1W': [224.36, 222.82, 214.75, 218.66, 205.1], '1M': [196.5, 207.83, 211.5, 215.2, 219.44, 225.83, 235.74, 225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1], '6M': [182.41, 175.02, 180.99, 188.22, 187.24, 185.81, 183.32, 191.52, 174.19, 190.05, 187.9, 184.89, 183.34, 186.03, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 199.57, 211.5, 235.74, 219.51, 211.14, 205.1], '1Y': [141.72, 141.97, 144.17, 157.99, 160, 170.7, 171.38, 176.75, 180, 182.06, 182.01, 179.81, 170.78, 170.76, 174.88, 178.43, 181.85, 185.54, 188.32, 182.64, 191.49, 206.88, 199.05, 186.6, 182.55, 181.46, 185.55, 176.29, 183.69, 187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 187.9, 184.89, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 199.57, 211.5, 235.74, 219.51, 211.14, 205.1] },
      velocityScore: { '1D': 6.7, '1W': 14, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.0T', pe: 31.5, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.49,
      etfPresence: { AIS: false, ARTY: 3.47, BAI: 4.52, IVEP: false, IGPT: 6.04, IVES: 4.71, ALAI: 13.23, CHAT: 5.98, AIFD: 6.57, SPRX: 3.95, AOTG: 10.86 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 8, avgWeight: 6.49, proScore: 5.19, coverage: 0.8,
      price: 864.01, weeklyPrices: [1035.50, 1064.10, 1079.57, 996.00, 864.01], weeklyChange: -16.56, sortRank: 0, periodReturns: { '1M': 35, '6M': 264.2, '1Y': 695.9 },
      priceHistory: { '1W': [1035.5, 1064.1, 1079.57, 996, 864.01], '1M': [640.2, 666.59, 646.63, 746.81, 795.33, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 971, 1035.5, 1064.1, 1079.57, 996, 864.01], '6M': [237.22, 241.14, 265.92, 294.37, 343.43, 338.13, 389.11, 435.28, 379.4, 410.34, 417.35, 415.56, 397.05, 418.69, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 776.01, 762.1, 971, 864.01], '1Y': [108.56, 115.6, 122.08, 123.25, 124.42, 120.11, 113.23, 111.25, 107.77, 123.72, 123.55, 116.42, 118.48, 135.24, 158.82, 166.41, 163.9, 190.96, 192.77, 206.77, 220.1, 234.7, 253.3, 241.95, 223.93, 239.49, 246.92, 237.5, 276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 417.35, 415.56, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 517.16, 646.63, 776.01, 762.1, 971, 864.01] },
      velocityScore: { '1D': -8.9, '1W': -17.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$974B', pe: 40.8, revenueGrowth: 196, eps: 21.17, grossMargin: 58, dividendYield: 0.07,
      etfPresence: { AIS: false, ARTY: 7.18, BAI: 5.72, IVEP: false, IGPT: 11.49, IVES: 5.29, ALAI: 0.96, CHAT: 5.7, AIFD: 5.75, SPRX: false, AOTG: 9.8 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 8, avgWeight: 5.83, proScore: 4.66, coverage: 0.8,
      price: 466.38, weeklyPrices: [510.13, 521.54, 542.52, 523.20, 466.38], weeklyChange: -8.58, sortRank: 0, periodReturns: { '1M': 31.3, '6M': 114, '1Y': 301.4 },
      priceHistory: { '1W': [510.13, 521.54, 542.52, 523.2, 466.38], '1M': [355.26, 421.39, 408.46, 455.19, 458.79, 445.5, 449.7, 424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38], '6M': [217.97, 210.78, 213.43, 215.61, 214.35, 220.97, 249.8, 252.74, 200.19, 213.58, 203.37, 203.68, 199.45, 204.83, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 354.49, 408.46, 449.7, 449.59, 516.1, 466.38], '1Y': [116.19, 116.16, 129.58, 141.9, 137.82, 155.61, 157, 173.66, 176.78, 172.28, 176.14, 163.36, 162.32, 155.82, 160.46, 160.9, 161.36, 203.71, 216.42, 240.56, 259.67, 259.65, 243.98, 240.52, 215.05, 215.24, 221.11, 207.58, 214.95, 215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 203.37, 203.68, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 354.49, 408.46, 449.7, 449.59, 516.1, 466.38] },
      velocityScore: { '1D': -1.9, '1W': -10, '1M': null, '6M': null }, isNew: false,
      marketCap: '$760B', pe: 156.5, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 7.23, BAI: 5.04, IVEP: false, IGPT: 7.15, IVES: 4.57, ALAI: 1.01, CHAT: 5.48, AIFD: false, SPRX: 0.52, AOTG: 15.63 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 4.94, proScore: 2.97, coverage: 0.6,
      price: 368.53, weeklyPrices: [376.37, 361.85, 358.99, 372.19, 368.53], weeklyChange: -2.08, sortRank: 0, periodReturns: { '1M': -5.1, '6M': 14.7, '1Y': 112.2 },
      priceHistory: { '1W': [376.37, 361.85, 358.99, 372.19, 368.53], '1M': [388.43, 398.04, 397.99, 400.8, 388.64, 402.62, 401.07, 396.78, 396.94, 387.66, 388.91, 387.66, 382.97, 388.88, 388.83, 380.34, 376.37, 361.85, 358.99, 372.19, 368.53], '6M': [321.27, 309.29, 307.16, 313.56, 314.34, 335.97, 328.38, 336.01, 333.04, 310.96, 302.85, 307.38, 300.88, 308.7, 307.69, 290.93, 297.39, 318.49, 336.02, 338.89, 384.8, 397.99, 401.07, 387.66, 380.34, 368.53], '1Y': [173.68, 174.67, 165.19, 176.23, 174.36, 182, 190.1, 192.58, 195.04, 201, 203.5, 208.49, 211.35, 239.63, 251.16, 251.66, 244.05, 250.43, 244.15, 256.55, 269.27, 283.72, 290.1, 285.02, 318.58, 315.81, 313.72, 308.22, 309.78, 313.85, 321.98, 335.84, 330.54, 338.25, 331.25, 309, 302.85, 307.38, 300.88, 303.55, 307.13, 280.92, 295.77, 317.24, 341.68, 344.4, 384.8, 397.99, 401.07, 387.66, 380.34, 368.53] },
      velocityScore: { '1D': 17.4, '1W': -15.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.5T', pe: 28.1, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.53, IVEP: false, IGPT: 6.54, IVES: 4.59, ALAI: false, CHAT: 5.73, AIFD: 5.25, SPRX: false, AOTG: 4.03 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 7, avgWeight: 3.82, proScore: 2.67, coverage: 0.7,
      price: 385.73, weeklyPrices: [459.97, 481.57, 479.23, 418.91, 385.73], weeklyChange: -16.14, sortRank: 0, periodReturns: { '1M': -9.7, '6M': -1.2, '1Y': 56.2 },
      priceHistory: { '1W': [459.97, 481.57, 479.23, 418.91, 385.73], '1M': [427.36, 425.44, 412.56, 430, 428.43, 416.79, 439.79, 425.19, 420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73], '6M': [390.24, 359.93, 340.36, 349.39, 343.77, 354.61, 328.8, 333.24, 308.05, 342.76, 333.99, 321.7, 332.77, 341.57, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 417.43, 412.56, 439.79, 414.57, 446.77, 385.73], '1Y': [246.93, 248.7, 253.77, 275.65, 271.8, 280.94, 288.21, 294.3, 297.72, 303.9, 305.76, 294.23, 298.24, 336.67, 360, 338.94, 327.9, 335.49, 356.7, 349.24, 362.05, 362.55, 358.39, 342.65, 377.96, 381.57, 401.1, 339.81, 341.45, 349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 333.99, 321.7, 332.77, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 417.43, 412.56, 439.79, 414.57, 446.77, 385.73] },
      velocityScore: { '1D': 2.7, '1W': -19.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 64.1, revenueGrowth: 48, eps: 6.02, grossMargin: 76, dividendYield: 0.67,
      etfPresence: { AIS: false, ARTY: 3.43, BAI: 4.85, IVEP: false, IGPT: false, IVES: 4.42, ALAI: 3.93, CHAT: 3.01, AIFD: 5.5, SPRX: false, AOTG: 1.57 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'TSM', name: 'TAIWAN SEMICONDUCTOR MANUFACTURING', easyScore: 5, avgWeight: 5.06, proScore: 2.53, coverage: 0.5,
      price: 415.17, weeklyPrices: [435.63, 446.69, 436.69, 444.92, 415.17], weeklyChange: -4.7, sortRank: 0, periodReturns: { '1M': 5.3, '6M': 40.9, '1Y': 102.3 },
      priceHistory: { '1W': [435.63, 446.69, 436.69, 444.92, 415.17], '1M': [394.41, 419.5, 414.15, 411.68, 404.54, 399.8, 417.72, 404.35, 395.95, 392.61, 401.62, 407.15, 404.52, 412.32, 422.73, 418.45, 435.63, 446.69, 436.69, 444.92, 415.17], '6M': [294.72, 292.04, 288.95, 300.92, 327.43, 331.21, 326.12, 342.3, 325.74, 374.09, 360.39, 376.81, 353.86, 354.56, 339.57, 347.75, 341.49, 365.49, 363.35, 382.66, 396.06, 414.15, 417.72, 407.15, 418.45, 415.17], '1Y': [205.18, 211.1, 210.32, 226.49, 227.86, 236.95, 238.85, 242.75, 239, 242.09, 241.41, 235.59, 228.39, 250.92, 262.06, 282.71, 273.23, 302.4, 302.89, 297.7, 298.25, 304.86, 295.27, 282.01, 284.64, 292.09, 301.87, 287.74, 293.28, 299.58, 318.68, 327.11, 327.37, 339.55, 330.73, 368.1, 360.39, 376.81, 353.86, 336.71, 338.79, 326.11, 339.04, 370.6, 370.5, 402.46, 396.06, 414.15, 417.72, 407.15, 418.45, 415.17] },
      velocityScore: { '1D': -1.9, '1W': -15.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.2T', pe: 35.6, revenueGrowth: 35, eps: 11.67, grossMargin: 62, dividendYield: 0.92,
      etfPresence: { AIS: false, ARTY: false, BAI: 4.41, IVEP: false, IGPT: false, IVES: 4.88, ALAI: 5.54, CHAT: false, AIFD: 3.25, SPRX: false, AOTG: 7.22 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 5, avgWeight: 4.85, proScore: 2.43, coverage: 0.5,
      price: 263.47, weeklyPrices: [219.43, 290.79, 301.65, 316.43, 263.47], weeklyChange: 20.07, sortRank: 0, periodReturns: { '1M': 56.1, '6M': 166.4, '1Y': 285.5 },
      priceHistory: { '1W': [219.43, 290.79, 301.65, 316.43, 263.47], '1M': [168.75, 172.15, 160.01, 170.13, 170.84, 177.95, 182.58, 176.89, 168.93, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 205, 219.43, 290.79, 301.65, 316.43, 263.47], '6M': [98.91, 84.43, 84.09, 85.76, 88.23, 83.05, 82.55, 83.62, 73.73, 81.34, 79.61, 79.29, 75.68, 90.44, 87.62, 98.45, 106.71, 119.93, 133.37, 165.56, 165.15, 160.01, 182.58, 190.69, 205, 263.47], '1Y': [68.35, 67.19, 70.78, 77.4, 71.95, 72.41, 73.06, 75.91, 76.53, 77.28, 76.74, 72.95, 64.6, 66.84, 68.86, 74.62, 82.39, 88.92, 89.39, 85.84, 88.71, 90.37, 93.23, 83.45, 83.79, 92.89, 92, 84.26, 84.8, 86.76, 84.64, 81.21, 83.1, 81.34, 74.21, 78.23, 79.61, 79.29, 75.68, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 164.31, 165.15, 160.01, 182.58, 190.69, 205, 263.47] },
      velocityScore: { '1D': -8.3, '1W': 8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$230B', pe: 90.9, revenueGrowth: 28, eps: 2.9, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { AIS: false, ARTY: 9.55, BAI: 1.71, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.76, AIFD: 6.34, SPRX: 4.9, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 4.26, proScore: 2.13, coverage: 0.5,
      price: 246.03, weeklyPrices: [261.26, 256.52, 250.02, 253.79, 246.03], weeklyChange: -5.83, sortRank: 0, periodReturns: { '1M': -10.1, '6M': 7.2, '1Y': 15.2 },
      priceHistory: { '1W': [261.26, 256.52, 250.02, 253.79, 246.03], '1M': [273.55, 274.99, 271.17, 272.68, 268.99, 270.13, 267.22, 264.14, 264.86, 259.34, 265.01, 268.46, 266.32, 265.29, 271.85, 270.64, 261.26, 256.52, 250.02, 253.79, 246.03], '6M': [229.53, 226.19, 227.35, 232.07, 240.93, 242.6, 231.31, 243.01, 232.99, 204.08, 204.86, 207.92, 218.94, 212.65, 209.87, 211.71, 210.57, 233.65, 249.7, 255.08, 265.06, 271.17, 267.22, 268.46, 270.64, 246.03], '1Y': [213.57, 212.1, 208.47, 219.39, 219.36, 226.35, 229.3, 232.79, 211.65, 221.3, 231.49, 227.94, 225.34, 238.24, 234.05, 220.71, 222.17, 220.9, 220.07, 216.48, 226.97, 254, 248.4, 232.87, 226.28, 234.42, 226.89, 222.54, 228.43, 232.53, 241.56, 236.65, 234.34, 241.73, 222.69, 199.6, 204.86, 207.92, 218.94, 209.53, 208.76, 207.54, 209.77, 238.38, 250.56, 263.99, 265.06, 271.17, 267.22, 268.46, 270.64, 246.03] },
      velocityScore: { '1D': 13.9, '1W': -26, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 31.7, revenueGrowth: 17, eps: 7.77, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.43, ALAI: 5.92, CHAT: 3.24, AIFD: 3.58, SPRX: false, AOTG: 4.13 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.8, proScore: 1.9, coverage: 0.5,
      price: 416.67, weeklyPrices: [460.52, 441.31, 427.34, 428.05, 416.67], weeklyChange: -9.52, sortRank: 0, periodReturns: { '1M': 1.3, '6M': -13.8, '1Y': -11.4 },
      priceHistory: { '1W': [460.52, 441.31, 427.34, 428.05, 416.67], '1M': [411.38, 413.96, 420.77, 415.12, 412.66, 405.21, 409.43, 421.92, 423.54, 417.42, 421.06, 419.09, 418.57, 416.03, 412.67, 450.24, 460.52, 441.31, 427.34, 428.05, 416.67], '6M': [483.16, 478.53, 485.92, 487.1, 478.51, 470.67, 444.11, 481.63, 414.19, 404.37, 398.46, 401.72, 410.68, 404.88, 391.79, 371.04, 369.37, 373.07, 420.26, 415.75, 407.78, 420.77, 409.43, 419.09, 450.24, 416.67], '1Y': [470.38, 474.96, 486, 497.41, 496.62, 505.82, 510.06, 512.5, 535.64, 521.77, 517.1, 504.26, 505.12, 498.41, 509.04, 509.23, 514.6, 528.57, 514.05, 516.79, 531.52, 517.03, 506, 507.49, 474, 490, 491.02, 474.82, 484.92, 487.48, 483.47, 459.38, 451.14, 433.5, 393.67, 401.84, 398.46, 401.72, 410.68, 401.86, 389.02, 365.97, 373.46, 370.87, 422.79, 424.62, 407.78, 420.77, 409.43, 419.09, 450.24, 416.67] },
      velocityScore: { '1D': 13.1, '1W': -26.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.1T', pe: 24.8, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 0.87,
      etfPresence: { AIS: false, ARTY: 1.73, BAI: false, IVEP: false, IGPT: false, IVES: 4.81, ALAI: 5.6, CHAT: 3.06, AIFD: false, SPRX: false, AOTG: 3.8 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 3.48, proScore: 1.74, coverage: 0.5,
      price: 593, weeklyPrices: [600.47, 597.63, 622.98, 627.57, 593.00], weeklyChange: -1.24, sortRank: 0, periodReturns: { '1M': -2, '6M': -11.9, '1Y': -15 },
      priceHistory: { '1W': [600.47, 597.63, 622.98, 627.57, 593], '1M': [604.96, 612.88, 616.81, 609.63, 598.86, 616.63, 618.43, 614.23, 611.21, 602.61, 605.06, 607.38, 610.26, 612.34, 635.26, 632.51, 600.47, 597.63, 622.98, 627.57, 593], '6M': [673.42, 644.23, 658.77, 658.69, 660.62, 631.09, 612.96, 668.73, 668.99, 668.69, 644.78, 657.01, 660.57, 654.86, 615.68, 594.89, 579.23, 628.39, 676.87, 659.15, 611.91, 616.81, 618.43, 607.38, 632.51, 593], '1Y': [697.71, 682.87, 698.53, 738.09, 720.67, 710.39, 712.97, 717.63, 776.37, 765.87, 767.37, 753.3, 735.11, 765.7, 779, 755.4, 743.4, 715.66, 715.7, 732.17, 750.82, 637.71, 631.76, 602.01, 613.05, 647.1, 666.8, 647.51, 661.5, 665.95, 648.69, 615.52, 647.63, 738.31, 670.21, 649.81, 644.78, 657.01, 660.57, 638.18, 606.7, 547.54, 574.46, 629.86, 688.55, 675.03, 611.91, 616.81, 618.43, 607.38, 632.51, 593] },
      velocityScore: { '1D': 10.8, '1W': -34.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 21.5, revenueGrowth: 33, eps: 27.52, grossMargin: 82, dividendYield: 0.35,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: 5, IVES: 4.54, ALAI: 4.28, CHAT: 2.42, AIFD: false, SPRX: false, AOTG: 1.18 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'ANET', name: 'ARISTA NETWORKS INC', easyScore: 6, avgWeight: 2.42, proScore: 1.45, coverage: 0.6,
      price: 154.27, weeklyPrices: [170.68, 175.33, 174.37, 166.01, 154.27], weeklyChange: -9.61, sortRank: 0, periodReturns: { '1M': -9.4, '6M': 20, '1Y': 58.6 },
      priceHistory: { '1W': [170.68, 175.33, 174.37, 166.01, 154.27], '1M': [170.22, 147.06, 141.75, 141.77, 136.43, 140.69, 147.81, 141.97, 141.71, 141.58, 140.49, 148.59, 154.03, 158.01, 154.31, 159.47, 170.68, 175.33, 174.37, 166.01, 154.27], '6M': [128.59, 124.76, 131.12, 134.15, 132.58, 129.93, 127.29, 150.15, 130.28, 140.66, 137.23, 130.25, 139.4, 138.23, 136.07, 135.01, 124.85, 146.05, 161.01, 172.55, 172.71, 141.75, 147.81, 148.59, 159.47, 154.27], '1Y': [97.25, 92.35, 91.95, 102.31, 103.39, 107.37, 111.61, 117.55, 120.35, 137.65, 138.04, 133.04, 135.87, 141.91, 142.16, 144.09, 143.37, 149.5, 147.45, 146.48, 156.81, 157.59, 137.26, 127.26, 122.17, 127.22, 129.11, 125.89, 130.73, 132.44, 130.08, 125.09, 138.41, 148.15, 128.67, 135.12, 137.23, 130.25, 139.4, 134.03, 136.26, 122.55, 126.68, 147.35, 164.23, 176.91, 172.71, 141.75, 147.81, 148.59, 159.47, 154.27] },
      velocityScore: { '1D': -1.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$194B', pe: 52.8, revenueGrowth: 35, eps: 2.92, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 1.94, BAI: 1.39, IVEP: false, IGPT: false, IVES: false, ALAI: 0.9, CHAT: 2.36, AIFD: 4.75, SPRX: 3.15, AOTG: false },
      tonyNote: 'ARISTA NETWORKS INC appears in 6 of 10 AI & ML ETFs (60% coverage) with average weight 2.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 4, avgWeight: 3.57, proScore: 1.43, coverage: 0.4,
      price: 317.06, weeklyPrices: [320.09, 355.76, 363.54, 358.05, 317.06], weeklyChange: -0.95, sortRank: 0, periodReturns: { '1M': 47, '6M': 96.7, '1Y': 249.4 },
      priceHistory: { '1W': [320.09, 355.76, 363.54, 358.05, 317.06], '1M': [215.69, 213.91, 195.65, 199.79, 207.35, 224.09, 228.64, 232.68, 215.58, 244.26, 287.48, 297.84, 306.88, 318.72, 325.33, 342.85, 320.09, 355.76, 363.54, 358.05, 317.06], '6M': [161.23, 148.85, 164.4, 170.1, 161.01, 180.56, 176.01, 167.9, 144.67, 143.71, 132.62, 124.67, 120, 124.71, 126.34, 120.33, 106.33, 129.46, 170.81, 197.54, 194.74, 195.65, 228.64, 297.84, 342.85, 317.06], '1Y': [90.75, 89.73, 85.95, 90.42, 92.3, 92.36, 121.89, 124.05, 137.93, 179.43, 186.43, 174.15, 174.24, 214.49, 238.79, 230.11, 198.8, 220.81, 199.53, 156.31, 170.28, 191.56, 173.74, 141.39, 147.75, 142.94, 175.74, 143.66, 172.62, 170.84, 165.77, 172.14, 176.35, 160.46, 142.82, 126.58, 132.62, 124.67, 120, 119.9, 126.16, 113.61, 117.14, 149.05, 174.05, 212.84, 194.74, 195.65, 228.64, 297.84, 342.85, 317.06] },
      velocityScore: { '1D': -2.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$54B', pe: 212.8, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 1.63, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 1.59, CHAT: 3.71, AIFD: false, SPRX: 7.36, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'COHR', name: 'COHERENT CORP', easyScore: 3, avgWeight: 4.7, proScore: 1.41, coverage: 0.3,
      price: 376.99, weeklyPrices: [362.90, 426.89, 417.43, 421.90, 376.99], weeklyChange: 3.88, sortRank: 0, periodReturns: { '1M': 12.3, '6M': 107.4, '1Y': 372.8 },
      priceHistory: { '1W': [362.9, 426.89, 417.43, 421.9, 376.99], '1M': [335.73, 344.67, 319.19, 335.26, 379.69, 403.71, 404.94, 382.45, 362.83, 353.63, 358.5, 378, 377.57, 381.35, 380.18, 361.47, 362.9, 426.89, 417.43, 421.9, 376.99], '6M': [181.79, 178.34, 185.83, 189.02, 194.11, 190.03, 201.46, 221.14, 211, 223.69, 232.48, 250.14, 253.87, 251.41, 257.21, 272.04, 247.8, 284.17, 328, 337.68, 319.71, 319.19, 404.94, 378, 361.47, 376.99], '1Y': [79.74, 77.37, 80.64, 89.21, 90.4, 96.07, 99.88, 104.3, 106.74, 113.6, 90.49, 90.5, 87.8, 99.22, 104.47, 109.29, 107.97, 114.77, 115.13, 120.2, 134.99, 132, 166.72, 139.07, 151.81, 164.89, 185.86, 178.45, 190.98, 186.81, 191.62, 184.11, 202.72, 215.86, 209.24, 216.1, 232.48, 250.14, 253.87, 241.27, 275.57, 243.29, 258.16, 307.5, 345.02, 336.09, 319.71, 319.19, 404.94, 378, 361.47, 376.99] },
      velocityScore: { '1D': 1.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$74B', pe: 178.7, revenueGrowth: 21, eps: 2.11, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: 4.02, IGPT: false, IVES: false, ALAI: false, CHAT: 0.99, AIFD: false, SPRX: 9.1, AOTG: false },
      tonyNote: 'COHERENT CORP appears in 3 of 10 AI & ML ETFs (30% coverage) with average weight 4.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 4, avgWeight: 3.44, proScore: 1.38, coverage: 0.4,
      price: 213.68, weeklyPrices: [248.15, 244.58, 230.33, 236.34, 213.68], weeklyChange: -13.89, sortRank: 0, periodReturns: { '1M': 15.3, '6M': -1.8, '1Y': 22.8 },
      priceHistory: { '1W': [248.15, 244.58, 230.33, 236.34, 213.68], '1M': [185.35, 194.03, 194.59, 195.95, 193.84, 189.76, 195.61, 192.95, 186.61, 181.46, 188.16, 189.77, 192.08, 193.06, 190.96, 225.78, 248.15, 244.58, 230.33, 236.34, 213.68], '6M': [217.58, 189.97, 191.97, 195.38, 193.75, 202.29, 173.88, 172.8, 146.67, 157.16, 156.54, 150.31, 154.79, 163.12, 152.9, 146.02, 145.23, 137.86, 178.34, 176.28, 161.39, 194.59, 195.61, 189.77, 225.78, 213.68], '1Y': [174.02, 215.22, 207.04, 218.63, 234.5, 234.96, 243.54, 247.71, 252.53, 252.68, 249.07, 235.41, 225.3, 241.51, 306.65, 313.83, 282.76, 291.59, 308.01, 277.18, 281.4, 257.85, 240.83, 219.86, 200.28, 201.1, 220.54, 184.92, 198.38, 197.21, 192.84, 193.61, 178.18, 169.01, 136.48, 156.48, 156.54, 150.31, 154.79, 159.16, 155.52, 142.81, 146.38, 138.09, 175.06, 173.28, 161.39, 194.59, 195.61, 189.77, 225.78, 213.68] },
      velocityScore: { '1D': 9.5, '1W': -32.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$615B', pe: 38.3, revenueGrowth: 22, eps: 5.58, grossMargin: 67, dividendYield: 0.94,
      etfPresence: { AIS: false, ARTY: 4.37, BAI: false, IVEP: false, IGPT: false, IVES: 4.28, ALAI: false, CHAT: 1.68, AIFD: false, SPRX: false, AOTG: 3.44 },
      tonyNote: 'Oracle lands in 3 AI ETFs on the strength of its cloud database and AI infrastructure contracts. Revenue grew 22%, 67% gross margin, P/E of 40x. The 17.5% weekly return following a major earnings beat shows how quickly sentiment can reprice; the weight score at 2.04% is still modest, meaning ETF managers have started building positions but conviction is not yet deep.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 4, avgWeight: 3.43, proScore: 1.37, coverage: 0.4,
      price: 863.66, weeklyPrices: [905.00, 1029.15, 938.00, 945.08, 863.66], weeklyChange: -4.57, sortRank: 0, periodReturns: { '1M': -13.2, '6M': 160.6, '1Y': 960.2 },
      priceHistory: { '1W': [905, 1029.15, 938, 945.08, 863.66], '1M': [994.56, 944.28, 892.58, 903.8, 1053.09, 1030.37, 1001.81, 970.7, 884.98, 890.09, 868.07, 964.5, 946.9, 910.81, 902.31, 854.96, 905, 1029.15, 938, 945.08, 863.66], '6M': [331.41, 324.35, 371.43, 372.61, 397.42, 361.33, 362.44, 385, 465.54, 574.11, 635.64, 677, 650.82, 672, 700.81, 777.17, 764.65, 894.13, 891.22, 846.89, 902.32, 892.58, 1001.81, 964.5, 854.96, 863.66], '1Y': [81.46, 82.46, 89.16, 95.06, 91.31, 98.14, 103.84, 107.17, 111.13, 115.03, 118.98, 123.42, 132.55, 151.73, 170.9, 163.99, 162.58, 160.6, 160.56, 161, 193.8, 199.58, 259.89, 242.07, 299.36, 302.81, 342.56, 334.69, 389.88, 371.18, 392.88, 331.62, 354.49, 381.44, 504.42, 583.46, 635.64, 677, 650.82, 616.09, 772.13, 688.8, 826.88, 897.3, 894.07, 881.64, 902.32, 892.58, 1001.81, 964.5, 854.96, 863.66] },
      velocityScore: { '1D': 7.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$67B', pe: 151.5, revenueGrowth: 90, eps: 5.7, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.98, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.06, AIFD: 6.05, SPRX: 3.63, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 4 of 10 AI & ML ETFs (40% coverage) with average weight 3.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ARM', name: 'ARM Holdings PLC Sponsored ADR', easyScore: 3, avgWeight: 4.31, proScore: 1.29, coverage: 0.3,
      price: 342.93, weeklyPrices: [408.85, 402.71, 411.83, 393.44, 342.93], weeklyChange: -16.12, sortRank: 0, periodReturns: { '1M': 64.2, '6M': 142.7, '1Y': 157.6 },
      priceHistory: { '1W': [408.85, 402.71, 411.83, 393.44, 342.93], '1M': [208.84, 237.3, 213.31, 213.27, 212.65, 221.21, 228.5, 209.16, 215.12, 223.15, 256.73, 298.23, 306.51, 321.22, 302.71, 353.29, 408.85, 402.71, 411.83, 393.44, 342.93], '6M': [141.31, 130.89, 114.03, 110.51, 115.53, 107.84, 113.92, 109.96, 104.9, 125.28, 126.93, 129.26, 120.62, 120.1, 128.36, 157.07, 155.07, 149.79, 162.33, 204.61, 210.32, 213.31, 228.5, 298.23, 353.29, 342.93], '1Y': [133.11, 135.55, 149.33, 161.74, 147.79, 147.11, 161.92, 164.37, 140.05, 141.05, 141.06, 137.78, 132.34, 140.8, 153.85, 140.99, 139.8, 156.22, 171.94, 171.5, 178.62, 168.68, 154.84, 140.26, 134.71, 136.48, 139.78, 124.37, 113.29, 110.86, 115.68, 104.99, 119.2, 108.43, 110.88, 122.19, 126.93, 129.26, 120.62, 115.12, 129.82, 154.8, 149.11, 148.93, 166.73, 234.81, 210.32, 213.31, 228.5, 298.23, 353.29, 342.93] },
      velocityScore: { '1D': -8.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$366B', pe: 398.8, revenueGrowth: 20, eps: 0.86, grossMargin: 98, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 0.47, CHAT: 4.3, AIFD: false, SPRX: 8.16, AOTG: false },
      tonyNote: 'Arm Holdings is held across Broad Tech and AI ETFs as the CPU architecture licensor embedded in every mobile device and increasingly in AI inference chips and data center CPUs. Revenue grew and the royalty model is high-margin; the weight score reflects consistent institutional positioning as the AI chip design ecosystem expands on Arm cores.',
    },
    {
      ticker: 'WDC', name: 'WESTERN DIGITAL CORP', easyScore: 5, avgWeight: 2.34, proScore: 1.17, coverage: 0.5,
      price: 511.72, weeklyPrices: [546.20, 563.10, 594.11, 575.50, 511.72], weeklyChange: -6.31, sortRank: 0, periodReturns: { '1M': 10, '6M': 203, '1Y': 822.8 },
      priceHistory: { '1W': [546.2, 563.1, 594.11, 575.5, 511.72], '1M': [465.26, 483.15, 463.91, 480, 515.83, 494.09, 489.15, 482.02, 458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72], '6M': [168.89, 176.34, 181.08, 179.68, 219.38, 214, 241.9, 279.7, 269.41, 273.74, 284.67, 282.25, 259.03, 268.81, 304.9, 296.14, 297.73, 337.88, 361.69, 403.12, 434.52, 463.91, 489.15, 486.46, 531.21, 511.72], '1Y': [55.45, 55.7, 60.38, 63.99, 64.02, 67.53, 68.74, 68.99, 77.29, 74.64, 76.29, 79.22, 81.91, 94.54, 103.09, 110.25, 116.74, 125.28, 118.86, 121.53, 126.67, 158.02, 174.22, 162.45, 150.93, 159.99, 169.78, 172.04, 176.76, 176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 284.67, 282.25, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 434.52, 463.91, 489.15, 486.46, 531.21, 511.72] },
      velocityScore: { '1D': -4.9, '1W': -40, '1M': null, '6M': null }, isNew: false,
      marketCap: '$176B', pe: 30.6, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.12,
      etfPresence: { AIS: false, ARTY: 2.7, BAI: 3, IVEP: false, IGPT: false, IVES: false, ALAI: 4.19, CHAT: 1.14, AIFD: false, SPRX: false, AOTG: 0.67 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'NBIS', name: 'NEBIUS GROUP NV', easyScore: 4, avgWeight: 2.79, proScore: 1.12, coverage: 0.4,
      price: 227.81, weeklyPrices: [264.51, 260.58, 251.68, 259.67, 227.81], weeklyChange: -13.87, sortRank: 0, periodReturns: { '1M': 29.5, '6M': 132.4, '1Y': 371.9 },
      priceHistory: { '1W': [264.51, 260.58, 251.68, 259.67, 227.81], '1M': [175.92, 195.09, 184.77, 177.05, 186.1, 207.27, 221.15, 219.94, 199.86, 197.73, 191.82, 219.93, 214.77, 208.06, 208.37, 231.09, 264.51, 260.58, 251.68, 259.67, 227.81], '6M': [98.04, 87.69, 89.46, 86.04, 100.24, 105.43, 98.87, 100.43, 82.39, 88.61, 107.61, 104.88, 95.65, 112, 118.56, 115.09, 101.95, 136.33, 165.34, 157.08, 138.23, 184.77, 221.15, 219.93, 231.09, 227.81], '1Y': [48.28, 47.13, 47.48, 55.33, 47.1, 53.53, 52.37, 52.75, 54.17, 70.24, 72.54, 70.02, 65.72, 95.72, 89.43, 107.8, 110.22, 124.94, 135.46, 109, 125.43, 120.47, 109.95, 85.98, 91.9, 96.45, 100.33, 81.14, 93.23, 85.17, 96.21, 101.98, 96.85, 94.91, 73.87, 89.73, 107.61, 104.88, 95.65, 108.04, 121.52, 105.97, 108.82, 144.97, 157.14, 147.16, 138.23, 184.77, 221.15, 219.93, 231.09, 227.81] },
      velocityScore: { '1D': 3.7, '1W': -44.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$58B', pe: 87.6, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 2.45, ALAI: 4.17, CHAT: 2.84, AIFD: 1.7, SPRX: false, AOTG: false },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CLASS A', easyScore: 4, avgWeight: 2.7, proScore: 1.08, coverage: 0.4,
      price: 300.51, weeklyPrices: [323.39, 334.49, 331.44, 323.92, 300.51], weeklyChange: -7.08, sortRank: 0, periodReturns: { '1M': -11.9, '6M': 59, '1Y': 160.5 },
      priceHistory: { '1W': [323.39, 334.49, 331.44, 323.92, 300.51], '1M': [341.02, 358.92, 340.01, 339.97, 367.92, 369.99, 376.23, 370.94, 339.73, 322.63, 315.67, 323.4, 327.46, 323.91, 319.78, 315.71, 323.39, 334.49, 331.44, 323.92, 300.51], '6M': [189.02, 161.27, 159.82, 165.62, 174.95, 172.72, 181.47, 193.76, 182.56, 248.51, 243.06, 259.23, 249.75, 268.26, 264.71, 276.16, 259.37, 287.64, 294.13, 321.75, 328.49, 340.01, 376.23, 323.4, 315.71, 300.51], '1Y': [115.36, 110.97, 116.54, 128.41, 125.89, 127.37, 126.21, 142.55, 140.2, 139.83, 135.69, 125.02, 124.01, 125.58, 136.65, 142.61, 143.31, 162.8, 179, 175.73, 192.9, 191.4, 187.84, 166.65, 168.91, 180.91, 185.61, 161.74, 166.25, 164.34, 171.54, 170.86, 181.12, 195.1, 177.75, 236.51, 243.06, 259.23, 249.75, 265.38, 269.17, 252.4, 261.29, 295.11, 307.34, 323.46, 328.49, 340.01, 376.23, 323.4, 315.71, 300.51] },
      velocityScore: { '1D': -18.8, '1W': -42.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$115B', pe: 75.7, revenueGrowth: 30, eps: 3.97, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: false, ARTY: false, BAI: 1.97, IVEP: 3.98, IGPT: false, IVES: false, ALAI: false, CHAT: 0.85, AIFD: 4, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 4, avgWeight: 2.48, proScore: 0.99, coverage: 0.4,
      price: 391, weeklyPrices: [415.88, 423.74, 423.70, 418.45, 391.00], weeklyChange: -5.98, sortRank: 0, periodReturns: { '1M': 0.4, '6M': -14.1, '1Y': 32.5 },
      priceHistory: { '1W': [415.88, 423.74, 423.7, 418.45, 391], '1M': [389.37, 398.73, 411.79, 428.35, 445, 445.27, 443.3, 422.24, 409.99, 404.11, 417.26, 417.85, 426.01, 433.59, 440.36, 435.79, 415.88, 423.74, 423.7, 418.45, 391], '6M': [455, 458.96, 481.2, 459.64, 432.96, 447.2, 431.44, 431.46, 406.01, 428.27, 411.71, 408.58, 405.55, 407.82, 392.78, 385.95, 381.26, 345.62, 388.9, 373.72, 381.63, 411.79, 443.3, 417.85, 435.79, 391], '1Y': [295.14, 325.31, 348.68, 317.66, 297.81, 310.78, 328.49, 325.59, 309.26, 339.03, 335.16, 346.6, 329.36, 346.97, 421.62, 425.85, 443.21, 453.25, 435.9, 447.43, 452.42, 468.37, 445.23, 408.92, 417.78, 429.24, 439.58, 475.31, 488.73, 454.43, 431.41, 439.2, 449.36, 416.56, 397.21, 417.07, 411.71, 408.58, 405.55, 395.01, 380.3, 372.11, 360.59, 348.95, 400.62, 376.3, 381.63, 411.79, 443.3, 417.85, 435.79, 391] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$1.5T', pe: 358.7, revenueGrowth: 16, eps: 1.09, grossMargin: 19, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 1.23, IVEP: false, IGPT: false, IVES: 4.28, ALAI: 2.52, CHAT: false, AIFD: 1.91, SPRX: false, AOTG: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 5.95, proScore: 5.95, coverage: 1,
      price: 864.01, weeklyPrices: [1035.50, 1064.10, 1079.57, 996.00, 864.01], weeklyChange: -16.56, sortRank: 0, periodReturns: { '1M': 35, '6M': 264.2, '1Y': 695.9 },
      priceHistory: { '1W': [1035.5, 1064.1, 1079.57, 996, 864.01], '1M': [640.2, 666.59, 646.63, 746.81, 795.33, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 971, 1035.5, 1064.1, 1079.57, 996, 864.01], '6M': [237.22, 241.14, 265.92, 294.37, 343.43, 338.13, 389.11, 435.28, 379.4, 410.34, 417.35, 415.56, 397.05, 418.69, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 776.01, 762.1, 971, 864.01], '1Y': [108.56, 115.6, 122.08, 123.25, 124.42, 120.11, 113.23, 111.25, 107.77, 123.72, 123.55, 116.42, 118.48, 135.24, 158.82, 166.41, 163.9, 190.96, 192.77, 206.77, 220.1, 234.7, 253.3, 241.95, 223.93, 239.49, 246.92, 237.5, 276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 417.35, 415.56, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 517.16, 646.63, 776.01, 762.1, 971, 864.01] },
      velocityScore: { '1D': -2, '1W': -13, '1M': null, '6M': null }, isNew: false,
      marketCap: '$974B', pe: 40.8, revenueGrowth: 196, eps: 21.17, grossMargin: 58, dividendYield: 0.07,
      etfPresence: { SOXX: 11.26, PSI: 5.4, XSD: 3.36, DRAM: 3.79 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.95, proScore: 4.47, coverage: 0.75,
      price: 466.38, weeklyPrices: [510.13, 521.54, 542.52, 523.20, 466.38], weeklyChange: -8.58, sortRank: 0, periodReturns: { '1M': 31.3, '6M': 114, '1Y': 301.4 },
      priceHistory: { '1W': [510.13, 521.54, 542.52, 523.2, 466.38], '1M': [355.26, 421.39, 408.46, 455.19, 458.79, 445.5, 449.7, 424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38], '6M': [217.97, 210.78, 213.43, 215.61, 214.35, 220.97, 249.8, 252.74, 200.19, 213.58, 203.37, 203.68, 199.45, 204.83, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 354.49, 408.46, 449.7, 449.59, 516.1, 466.38], '1Y': [116.19, 116.16, 129.58, 141.9, 137.82, 155.61, 157, 173.66, 176.78, 172.28, 176.14, 163.36, 162.32, 155.82, 160.46, 160.9, 161.36, 203.71, 216.42, 240.56, 259.67, 259.65, 243.98, 240.52, 215.05, 215.24, 221.11, 207.58, 214.95, 215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 203.37, 203.68, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 354.49, 408.46, 449.7, 449.59, 516.1, 466.38] },
      velocityScore: { '1D': -0.2, '1W': -26.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$760B', pe: 156.5, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 9.08, PSI: 5.18, XSD: 3.6, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 6.99, proScore: 3.49, coverage: 0.5,
      price: 263.47, weeklyPrices: [219.43, 290.79, 301.65, 316.43, 263.47], weeklyChange: 20.07, sortRank: 0, periodReturns: { '1M': 56.1, '6M': 166.4, '1Y': 285.5 },
      priceHistory: { '1W': [219.43, 290.79, 301.65, 316.43, 263.47], '1M': [168.75, 172.15, 160.01, 170.13, 170.84, 177.95, 182.58, 176.89, 168.93, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 205, 219.43, 290.79, 301.65, 316.43, 263.47], '6M': [98.91, 84.43, 84.09, 85.76, 88.23, 83.05, 82.55, 83.62, 73.73, 81.34, 79.61, 79.29, 75.68, 90.44, 87.62, 98.45, 106.71, 119.93, 133.37, 165.56, 165.15, 160.01, 182.58, 190.69, 205, 263.47], '1Y': [68.35, 67.19, 70.78, 77.4, 71.95, 72.41, 73.06, 75.91, 76.53, 77.28, 76.74, 72.95, 64.6, 66.84, 68.86, 74.62, 82.39, 88.92, 89.39, 85.84, 88.71, 90.37, 93.23, 83.45, 83.79, 92.89, 92, 84.26, 84.8, 86.76, 84.64, 81.21, 83.1, 81.34, 74.21, 78.23, 79.61, 79.29, 75.68, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 164.31, 165.15, 160.01, 182.58, 190.69, 205, 263.47] },
      velocityScore: { '1D': 0, '1W': 3.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$230B', pe: 90.9, revenueGrowth: 28, eps: 2.9, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { SOXX: 9.03, PSI: false, XSD: 4.95, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.5, proScore: 3.37, coverage: 0.75,
      price: 99.17, weeklyPrices: [109.33, 107.93, 112.71, 111.78, 99.17], weeklyChange: -9.29, sortRank: 0, periodReturns: { '1M': -8.3, '6M': 139.5, '1Y': 394.4 },
      priceHistory: { '1W': [109.33, 107.93, 112.71, 111.78, 99.17], '1M': [108.15, 113.01, 109.62, 124.92, 129.44, 120.29, 115.93, 108.77, 108.17, 110.8, 118.96, 118.5, 119.84, 123.52, 121.77, 114.68, 109.33, 107.93, 112.71, 111.78, 99.17], '6M': [41.41, 37.81, 36.82, 36.68, 40.04, 47.29, 54.25, 48.78, 48.6, 48.29, 44.62, 45.46, 45.95, 47.98, 45.03, 47.18, 48.03, 61.72, 68.5, 66.78, 94.48, 109.62, 115.93, 118.5, 114.68, 99.17], '1Y': [20.06, 20.14, 21.19, 22.4, 23.59, 22.92, 23.26, 20.68, 19.5, 20.65, 23.66, 24.55, 24.21, 24.44, 25.27, 29.34, 34.48, 36.59, 37.22, 38.1, 39.54, 39.5, 38.45, 34.71, 35.79, 43.47, 40.3, 37.51, 36.37, 37.3, 42.63, 48.72, 54.32, 48.66, 48.24, 46.48, 44.62, 45.46, 45.95, 45.25, 46.18, 44.1, 50.38, 62.38, 68.5, 82.54, 94.48, 109.62, 115.93, 118.5, 114.68, 99.17] },
      velocityScore: { '1D': -0.6, '1W': -2.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$498B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 5.71, PSI: 4.49, XSD: 3.29, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 4.25, proScore: 3.19, coverage: 0.75,
      price: 205.1, weeklyPrices: [224.36, 222.82, 214.75, 218.66, 205.10], weeklyChange: -8.58, sortRank: 0, periodReturns: { '1M': 4.4, '6M': 12.4, '1Y': 44.7 },
      priceHistory: { '1W': [224.36, 222.82, 214.75, 218.66, 205.1], '1M': [196.5, 207.83, 211.5, 215.2, 219.44, 225.83, 235.74, 225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1], '6M': [182.41, 175.02, 180.99, 188.22, 187.24, 185.81, 183.32, 191.52, 174.19, 190.05, 187.9, 184.89, 183.34, 186.03, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 199.57, 211.5, 235.74, 219.51, 211.14, 205.1], '1Y': [141.72, 141.97, 144.17, 157.99, 160, 170.7, 171.38, 176.75, 180, 182.06, 182.01, 179.81, 170.78, 170.76, 174.88, 178.43, 181.85, 185.54, 188.32, 182.64, 191.49, 206.88, 199.05, 186.6, 182.55, 181.46, 185.55, 176.29, 183.69, 187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 187.9, 184.89, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 199.57, 211.5, 235.74, 219.51, 211.14, 205.1] },
      velocityScore: { '1D': 1.9, '1W': -0.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.0T', pe: 31.5, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.49,
      etfPresence: { SOXX: 5.75, PSI: 5.35, XSD: 1.66, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 5.13, proScore: 2.56, coverage: 0.5,
      price: 453.01, weeklyPrices: [458.17, 490.05, 500.77, 501.70, 453.01], weeklyChange: -1.13, sortRank: 0, periodReturns: { '1M': 10.3, '6M': 69, '1Y': 171.7 },
      priceHistory: { '1W': [458.17, 490.05, 500.77, 501.7, 453.01], '1M': [410.82, 428.62, 410.64, 435.44, 443.62, 436.61, 440.56, 436.62, 413.57, 406.91, 426.85, 427.36, 432.16, 454.89, 448.25, 450.06, 458.17, 490.05, 500.77, 501.7, 453.01], '6M': [268, 259.21, 256.41, 263.05, 296.01, 304.87, 325.24, 336.75, 297.6, 339.88, 369.83, 375.72, 346.53, 351.07, 349.47, 369.34, 353.8, 397.81, 389.9, 403.91, 394.49, 410.64, 440.56, 427.36, 450.06, 453.01], '1Y': [166.74, 170.59, 171.96, 183.07, 194.99, 199.29, 192.61, 190.27, 182.82, 184.38, 163.53, 161.99, 157.57, 163.5, 173.54, 200.87, 204.95, 223.91, 219.48, 228.13, 231.33, 237.71, 235.08, 228.71, 230.91, 265.33, 268.16, 261.27, 259.01, 259.97, 292.2, 301.89, 318.79, 341.34, 303.99, 328.39, 369.83, 375.72, 346.53, 337.27, 357.21, 338.55, 348.47, 399.49, 396.94, 417.04, 394.49, 410.64, 440.56, 427.36, 450.06, 453.01] },
      velocityScore: { '1D': 0, '1W': -13.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$360B', pe: 42.5, revenueGrowth: 11, eps: 10.65, grossMargin: 49, dividendYield: 0.47,
      etfPresence: { SOXX: 4.68, PSI: 5.58, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.36, proScore: 2.52, coverage: 0.75,
      price: 401.39, weeklyPrices: [402.69, 423.20, 437.67, 428.76, 401.39], weeklyChange: -0.32, sortRank: 0, periodReturns: { '1M': -0.8, '6M': 42.7, '1Y': 80.6 },
      priceHistory: { '1W': [402.69, 423.2, 437.67, 428.76, 401.39], '1M': [404.77, 415.63, 408.52, 416.52, 422.73, 432.39, 426.79, 417.49, 418.58, 414.31, 398.05, 384.21, 397.07, 419.94, 416.88, 413.85, 402.69, 423.2, 437.67, 428.76, 401.39], '6M': [281.29, 279.32, 274.44, 275.63, 292.94, 296.21, 304.97, 317.63, 320.44, 337, 345.3, 354.35, 329.72, 319.22, 308.59, 322.03, 320.58, 351.36, 353.8, 403.88, 402.26, 408.52, 426.79, 384.21, 413.85, 401.39], '1Y': [222.26, 225.03, 230.98, 238.02, 245.15, 240.42, 240.48, 230.77, 222.4, 224.07, 231.55, 254.49, 248.32, 248.18, 244.1, 246.78, 244.79, 242.5, 234.67, 246.22, 243.01, 233.61, 232, 229.94, 239.4, 272.97, 279.13, 280.44, 275.82, 274.82, 292.89, 297.99, 308.52, 318.7, 322.12, 331.36, 345.3, 354.35, 329.72, 307.27, 310.44, 313.42, 318.34, 350.14, 371.45, 399.57, 402.26, 408.52, 426.79, 384.21, 413.85, 401.39] },
      velocityScore: { '1D': 2.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$196B', pe: 59.9, revenueGrowth: 37, eps: 6.7, grossMargin: 64, dividendYield: 1.1,
      etfPresence: { SOXX: 2.81, PSI: 5.36, XSD: 1.9, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 4.31, proScore: 2.16, coverage: 0.5,
      price: 1929.2, weeklyPrices: [1940.04, 2045.20, 2125.11, 2131.10, 1929.20], weeklyChange: -0.56, sortRank: 0, periodReturns: { '1M': 11.3, '6M': 58.9, '1Y': 138.8 },
      priceHistory: { '1W': [1940.04, 2045.2, 2125.11, 2131.1, 1929.2], '1M': [1732.9, 1816.29, 1763.25, 1869.19, 1845.19, 1849.71, 1892.94, 1804.32, 1756.45, 1740.58, 1829.47, 1842.18, 1888.38, 2011.39, 1957.19, 1921.71, 1940.04, 2045.2, 2125.11, 2131.1, 1929.2], '6M': [1214.46, 1193.92, 1245.67, 1260.39, 1395, 1441.82, 1520, 1627.2, 1307.22, 1479.5, 1469.9, 1524.31, 1429.36, 1465, 1482.36, 1543.82, 1519.84, 1727.26, 1734.85, 1815.43, 1750.35, 1763.25, 1892.94, 1842.18, 1921.71, 1929.2], '1Y': [808, 867.67, 856.28, 895.74, 919.22, 936.53, 937.76, 923.15, 915.62, 910.18, 883.39, 879.55, 846.35, 917.73, 990.57, 1071.2, 1064.13, 1139.71, 1025, 1152.89, 1215.13, 1219.14, 1217.95, 1133.7, 1136.73, 1189.86, 1224.59, 1225.11, 1265.66, 1243.65, 1359.69, 1434.5, 1500, 1684.71, 1331.03, 1450.85, 1469.9, 1524.31, 1429.36, 1409.57, 1511.52, 1451.13, 1516.84, 1737.28, 1791.44, 1935, 1750.35, 1763.25, 1892.94, 1842.18, 1921.71, 1929.2] },
      velocityScore: { '1D': 0.5, '1W': -16, '1M': null, '6M': null }, isNew: false,
      marketCap: '$252B', pe: 54.7, revenueGrowth: 12, eps: 35.3, grossMargin: 61, dividendYield: 0.48,
      etfPresence: { SOXX: 3.26, PSI: 5.37, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 4.3, proScore: 2.15, coverage: 0.5,
      price: 303.28, weeklyPrices: [317.12, 334.41, 343.71, 336.41, 303.28], weeklyChange: -4.36, sortRank: 0, periodReturns: { '1M': 10, '6M': 91.1, '1Y': 251.2 },
      priceHistory: { '1W': [317.12, 334.41, 343.71, 336.41, 303.28], '1M': [275.8, 297.17, 286.52, 294.05, 296.05, 295.44, 299.15, 284.72, 277.96, 273.38, 292.09, 302.24, 305.35, 322.68, 318.93, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28], '6M': [158.7, 160.52, 172.27, 175.87, 206.96, 214.38, 228.39, 239.58, 209.78, 235.12, 237.39, 239.07, 214.68, 218.87, 224.71, 233.45, 222.01, 258.76, 260.96, 258.56, 257.86, 286.52, 299.15, 302.24, 318.18, 303.28], '1Y': [86.35, 89.52, 91.61, 97.34, 99.83, 101.07, 101.74, 98.62, 98.41, 102, 98.88, 101.28, 97.03, 105.57, 120.47, 131.93, 131.09, 149.15, 137.81, 144.05, 156.9, 161.24, 166.37, 147.46, 150.38, 158.19, 162.74, 164.3, 175.26, 173.78, 203.08, 208.79, 220.7, 248.17, 213.31, 231.29, 237.39, 239.07, 214.68, 209.49, 233.99, 211.62, 218.44, 263.66, 267.6, 267.78, 257.86, 286.52, 299.15, 302.24, 318.18, 303.28] },
      velocityScore: { '1D': 0, '1W': -20.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$379B', pe: 57.4, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.34,
      etfPresence: { SOXX: 3.35, PSI: 5.26, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 3.92, proScore: 1.96, coverage: 0.5,
      price: 385.73, weeklyPrices: [459.97, 481.57, 479.23, 418.91, 385.73], weeklyChange: -16.14, sortRank: 0, periodReturns: { '1M': -9.7, '6M': -1.2, '1Y': 56.2 },
      priceHistory: { '1W': [459.97, 481.57, 479.23, 418.91, 385.73], '1M': [427.36, 425.44, 412.56, 430, 428.43, 416.79, 439.79, 425.19, 420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73], '6M': [390.24, 359.93, 340.36, 349.39, 343.77, 354.61, 328.8, 333.24, 308.05, 342.76, 333.99, 321.7, 332.77, 341.57, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 417.43, 412.56, 439.79, 414.57, 446.77, 385.73], '1Y': [246.93, 248.7, 253.77, 275.65, 271.8, 280.94, 288.21, 294.3, 297.72, 303.9, 305.76, 294.23, 298.24, 336.67, 360, 338.94, 327.9, 335.49, 356.7, 349.24, 362.05, 362.55, 358.39, 342.65, 377.96, 381.57, 401.1, 339.81, 341.45, 349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 333.99, 321.7, 332.77, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 417.43, 412.56, 439.79, 414.57, 446.77, 385.73] },
      velocityScore: { '1D': 0, '1W': -49, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 64.1, revenueGrowth: 48, eps: 6.02, grossMargin: 76, dividendYield: 0.67,
      etfPresence: { SOXX: 6.11, PSI: false, XSD: 1.73, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 3.26, proScore: 1.63, coverage: 0.5,
      price: 215.94, weeklyPrices: [228.99, 240.84, 250.01, 242.57, 215.94], weeklyChange: -5.7, sortRank: 0, periodReturns: { '1M': 15.8, '6M': 23.5, '1Y': 44.7 },
      priceHistory: { '1W': [228.99, 240.84, 250.01, 242.57, 215.94], '1M': [186.55, 192.57, 202.55, 219.09, 237.53, 213.17, 200.08, 201.49, 203.64, 195.61, 202.51, 213.41, 238.16, 248.82, 233.4, 251.02, 228.99, 240.84, 250.01, 242.57, 215.94], '6M': [174.81, 178.29, 175.25, 173.43, 182.45, 165.29, 156.37, 152.7, 148.89, 141.04, 141.27, 145.59, 137, 134.12, 130.47, 130.35, 127.28, 127.75, 134.47, 133.95, 179.58, 202.55, 200.08, 213.41, 251.02, 215.94], '1Y': [149.24, 154.72, 153.14, 159.26, 159.45, 154.3, 158.97, 161.05, 147.51, 147.97, 158.9, 156.42, 158.78, 158.66, 164.14, 169.53, 165.3, 168.62, 161.78, 167.04, 187.68, 180.72, 171.57, 166.75, 165.06, 170.7, 175.31, 179.26, 174.22, 173.65, 180.19, 164.54, 157.8, 152.22, 136.3, 138.47, 141.27, 145.59, 137, 131.15, 131.28, 130.54, 126.8, 128.06, 136.2, 148.85, 179.58, 202.55, 200.08, 213.41, 251.02, 215.94] },
      velocityScore: { '1D': 0, '1W': -35.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$228B', pe: 23.2, revenueGrowth: -4, eps: 9.31, grossMargin: 55, dividendYield: 1.7,
      etfPresence: { SOXX: 3.97, PSI: false, XSD: 2.55, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 3.2, proScore: 1.6, coverage: 0.5,
      price: 317.06, weeklyPrices: [320.09, 355.76, 363.54, 358.05, 317.06], weeklyChange: -0.95, sortRank: 0, periodReturns: { '1M': 47, '6M': 96.7, '1Y': 249.4 },
      priceHistory: { '1W': [320.09, 355.76, 363.54, 358.05, 317.06], '1M': [215.69, 213.91, 195.65, 199.79, 207.35, 224.09, 228.64, 232.68, 215.58, 244.26, 287.48, 297.84, 306.88, 318.72, 325.33, 342.85, 320.09, 355.76, 363.54, 358.05, 317.06], '6M': [161.23, 148.85, 164.4, 170.1, 161.01, 180.56, 176.01, 167.9, 144.67, 143.71, 132.62, 124.67, 120, 124.71, 126.34, 120.33, 106.33, 129.46, 170.81, 197.54, 194.74, 195.65, 228.64, 297.84, 342.85, 317.06], '1Y': [90.75, 89.73, 85.95, 90.42, 92.3, 92.36, 121.89, 124.05, 137.93, 179.43, 186.43, 174.15, 174.24, 214.49, 238.79, 230.11, 198.8, 220.81, 199.53, 156.31, 170.28, 191.56, 173.74, 141.39, 147.75, 142.94, 175.74, 143.66, 172.62, 170.84, 165.77, 172.14, 176.35, 160.46, 142.82, 126.58, 132.62, 124.67, 120, 119.9, 126.16, 113.61, 117.14, 149.05, 174.05, 212.84, 194.74, 195.65, 228.64, 297.84, 342.85, 317.06] },
      velocityScore: { '1D': 0, '1W': -30.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$54B', pe: 212.8, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.34, PSI: false, XSD: 4.06, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'MXL', name: 'MAXLINEAR INC', easyScore: 1, avgWeight: 6.01, proScore: 1.5, coverage: 0.25,
      price: 80.92, weeklyPrices: [86.23, 88.76, 91.39, 94.21, 80.92], weeklyChange: -6.16, sortRank: 0, periodReturns: { '1M': -0.9, '6M': 330, '1Y': 559 },
      priceHistory: { '1W': [86.23, 88.76, 91.39, 94.21, 80.92], '1M': [81.68, 81.23, 82.37, 99.83, 102.27, 87.73, 88.78, 92.34, 87.46, 94.86, 96.77, 99.67, 99.16, 96.12, 101.1, 92.93, 86.23, 88.76, 91.39, 94.21, 80.92], '6M': [18.82, 17.41, 17.63, 17.58, 19.57, 18.34, 19.96, 19.14, 17.23, 19.4, 18.24, 17.92, 16.39, 16.9, 16.46, 17.8, 17.69, 19.84, 23.35, 34.25, 70.75, 82.37, 88.78, 99.67, 92.93, 80.92], '1Y': [12.28, 11.67, 13.09, 14.21, 14.91, 14.4, 15.92, 16.74, 15.25, 15.07, 15.42, 16.63, 15.62, 16.08, 16.2, 16.53, 15.95, 16.52, 15.76, 17.64, 15.93, 15.62, 15.14, 13.22, 14.79, 16.59, 19.51, 17.2, 18.05, 17.7, 18.65, 18.08, 19.38, 19.27, 17.11, 18.87, 18.24, 17.92, 16.39, 16.5, 17.1, 17.16, 17.98, 20.69, 26.27, 60.32, 70.75, 82.37, 88.78, 99.67, 92.93, 80.92] },
      velocityScore: { '1D': 0, '1W': -72.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 43, eps: -1.52, grossMargin: 57, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: 6.01, DRAM: false },
      tonyNote: 'MaxLinear holds the highest average weight in the Semiconductor theme at 7.71% across 2 ETFs. Revenue grew 43%, 57% gross margin, but EPS is negative at -$1.52 and the market cap is only $8B. The 716% 1-year return is an extreme recovery from the 2023 inventory correction lows; the two ETFs holding it are making a concentrated bet on a return to profitability in the analog semiconductor cycle.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 2.81, proScore: 1.41, coverage: 0.5,
      price: 117.26, weeklyPrices: [120.92, 128.64, 133.93, 131.82, 117.26], weeklyChange: -3.03, sortRank: 0, periodReturns: { '1M': 14.2, '6M': 114.2, '1Y': 133.7 },
      priceHistory: { '1W': [120.92, 128.64, 133.93, 131.82, 117.26], '1M': [102.67, 105.77, 100.61, 103.2, 107.24, 115.71, 118.37, 113.11, 109.43, 106.02, 110.21, 109.61, 116.2, 127, 124.89, 120.62, 120.92, 128.64, 133.93, 131.82, 117.26], '6M': [54.74, 54.96, 55.21, 54.02, 61.76, 59.41, 63.13, 64.93, 62.06, 71.18, 68.09, 68.16, 60.85, 59.24, 60.46, 63.1, 62.2, 68.49, 79.93, 97.78, 100.81, 100.61, 118.37, 109.61, 120.62, 117.26], '1Y': [50.17, 51.02, 53.17, 52.41, 57.62, 58.93, 60.55, 58.66, 47.97, 47.1, 50.53, 50.95, 48.94, 48.62, 49.56, 50.42, 49.76, 50.35, 50.11, 54.89, 52.68, 50.46, 48.54, 46.02, 47.39, 51.48, 56.38, 55.09, 56.37, 54.24, 61.89, 60.58, 63.07, 62.2, 63.1, 70.63, 68.09, 68.16, 60.85, 57.69, 59.29, 60.87, 62.19, 68.65, 83.01, 98.4, 100.81, 100.61, 118.37, 109.61, 120.62, 117.26] },
      velocityScore: { '1D': 0, '1W': -26.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$46B', pe: 86.2, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.49, PSI: false, XSD: 3.14, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.79, proScore: 1.4, coverage: 0.5,
      price: 295.96, weeklyPrices: [311.38, 323.62, 321.88, 322.22, 295.96], weeklyChange: -4.95, sortRank: 0, periodReturns: { '1M': 1.2, '6M': 29.8, '1Y': 42.5 },
      priceHistory: { '1W': [311.38, 323.62, 321.88, 322.22, 295.96], '1M': [292.35, 303.55, 290.22, 294.75, 305.99, 298.41, 294.17, 291.5, 291.68, 294.28, 310.15, 299.38, 316.47, 332.67, 329.24, 321.35, 311.38, 323.62, 321.88, 322.22, 295.96], '6M': [227.95, 228.16, 226.27, 220.46, 245.95, 239.09, 233.72, 240.03, 226.86, 249.75, 232.11, 232.23, 210.58, 199.87, 192.69, 197.61, 195.58, 205.67, 213.73, 241.16, 293.59, 290.22, 294.17, 299.38, 321.35, 295.96], '1Y': [207.68, 210.9, 210.86, 218.49, 232.34, 221.06, 228.27, 228.49, 211.99, 205.16, 232.01, 236.67, 232.66, 223.69, 220.99, 225.62, 226.11, 231.42, 216.7, 219.82, 221.56, 210.39, 205.13, 190.51, 191.56, 215.35, 229.01, 231.83, 228.94, 219.98, 239.34, 240.81, 236.75, 233.5, 222.13, 242.19, 232.11, 232.23, 210.58, 191.22, 192.35, 196.92, 194.55, 204.37, 216.03, 244.04, 293.59, 290.22, 294.17, 299.38, 321.35, 295.96] },
      velocityScore: { '1D': 0, '1W': -32.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$75B', pe: 28.3, revenueGrowth: 12, eps: 10.45, grossMargin: 56, dividendYield: 1.37,
      etfPresence: { SOXX: 3.31, PSI: false, XSD: 2.27, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.77, proScore: 1.39, coverage: 0.5,
      price: 1481.05, weeklyPrices: [1542.39, 1624.99, 1689.89, 1652.60, 1481.05], weeklyChange: -3.98, sortRank: 0, periodReturns: { '1M': -6.7, '6M': 53.8, '1Y': 115.6 },
      priceHistory: { '1W': [1542.39, 1624.99, 1689.89, 1652.6, 1481.05], '1M': [1588.12, 1652.35, 1575.96, 1600.84, 1661.1, 1650.35, 1613.97, 1550.02, 1486.33, 1468.11, 1553.27, 1561.25, 1589.81, 1662.98, 1620.17, 1566.21, 1542.39, 1624.99, 1689.89, 1652.6, 1481.05], '6M': [963.28, 946.51, 937.11, 930.04, 1005.38, 983.28, 1074.93, 1161.78, 1136.83, 1196.73, 1175.22, 1180.13, 1078.44, 1071.09, 1075.29, 1118.66, 1119.51, 1334.21, 1402.81, 1592.17, 1614.41, 1575.96, 1613.97, 1561.25, 1566.21, 1481.05], '1Y': [687.08, 673.01, 692.62, 731.38, 761.31, 717.62, 724.77, 738.55, 830.63, 797.51, 850.31, 837.86, 823.65, 857.87, 857.02, 914.27, 886.59, 968.1, 981.67, 1031.59, 1105.05, 1003.93, 976.31, 897.01, 892.97, 952.18, 983.58, 949.4, 945.16, 923.91, 959.08, 983.6, 1076.67, 1183.15, 1155.99, 1155.93, 1175.22, 1180.13, 1078.44, 1033.88, 1092.69, 1058.28, 1118.49, 1353.85, 1468.35, 1632.06, 1614.41, 1575.96, 1613.97, 1561.25, 1566.21, 1481.05] },
      velocityScore: { '1D': 0, '1W': -29.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$73B', pe: 106.4, revenueGrowth: 26, eps: 13.92, grossMargin: 55, dividendYield: 0.54,
      etfPresence: { SOXX: 3.37, PSI: false, XSD: 2.18, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 2.77, proScore: 1.38, coverage: 0.5,
      price: 285.06, weeklyPrices: [293.20, 308.12, 308.59, 305.37, 285.06], weeklyChange: -2.78, sortRank: 0, periodReturns: { '1M': 1.4, '6M': 56.2, '1Y': 48.1 },
      priceHistory: { '1W': [293.2, 308.12, 308.59, 305.37, 285.06], '1M': [281, 289.44, 285.24, 287.8, 297.76, 306.34, 308.17, 302.73, 300.6, 302.31, 304.88, 298.39, 309.21, 324.89, 317.45, 305.68, 293.2, 308.12, 308.59, 305.37, 285.06], '6M': [182.54, 179.42, 176.29, 175.69, 192.1, 188.53, 194.41, 216.17, 222.92, 226.56, 218.05, 212.63, 197.98, 198.67, 190.78, 196.77, 196.3, 214.98, 223.1, 282.23, 281.08, 285.24, 308.17, 298.39, 305.68, 285.06], '1Y': [192.42, 195, 201.39, 207.62, 216.63, 218.36, 214.57, 189.25, 182.73, 183.71, 194.33, 205.97, 199.81, 185.03, 177.63, 182.04, 183.23, 181.81, 175.11, 179.59, 169.41, 161.46, 160.58, 154.99, 161.26, 175.26, 180.94, 177.97, 178.82, 175.42, 185.71, 193.45, 194.99, 218.97, 223.98, 223, 218.05, 212.63, 197.98, 190.05, 188.29, 193.41, 194.87, 214.73, 229.82, 277.14, 281.08, 285.24, 308.17, 298.39, 305.68, 285.06] },
      velocityScore: { '1D': 0, '1W': -54.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$259B', pe: 48.8, revenueGrowth: 19, eps: 5.84, grossMargin: 57, dividendYield: 1.99,
      etfPresence: { SOXX: 3.36, PSI: false, XSD: 2.17, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 1, avgWeight: 5, proScore: 1.25, coverage: 0.25,
      price: 1559.32, weeklyPrices: [1761.43, 1716.36, 1831.50, 1759.68, 1559.32], weeklyChange: -11.47, sortRank: 0, periodReturns: { '1M': 10.9, '6M': 582.5, '1Y': 3882.9 },
      priceHistory: { '1W': [1761.43, 1716.36, 1831.5, 1759.68, 1559.32], '1M': [1406.32, 1409.98, 1339.96, 1562.34, 1547.56, 1447.23, 1382.72, 1407.61, 1333.01, 1383.29, 1392.56, 1542.24, 1478.69, 1589.55, 1589.94, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32], '6M': [228.47, 206.18, 237.61, 244.25, 349.63, 389.81, 501.29, 527.63, 584.55, 599.34, 621.09, 651.9, 565.59, 655.43, 753.69, 677.86, 692.73, 851.57, 919.47, 932.43, 1096.51, 1339.96, 1382.72, 1542.24, 1694.98, 1559.32], '1Y': [39.15, 42.5, 46.95, 45.35, 46.17, 42.72, 41.61, 41.89, 42.51, 43.37, 45.52, 46.78, 51.07, 70.51, 91.55, 106.4, 113.5, 121.17, 134.61, 148.04, 176.49, 207.01, 267.95, 265.88, 226.96, 205.35, 225.47, 201.87, 241.05, 240.22, 353.56, 387.81, 503.44, 539.3, 576.2, 630.29, 621.09, 651.9, 565.59, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 989.9, 1096.51, 1339.96, 1382.72, 1542.24, 1694.98, 1559.32] },
      velocityScore: { '1D': -1.6, '1W': -51.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$231B', pe: 53.2, revenueGrowth: 251, eps: 29.32, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 5 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.26, proScore: 1.13, coverage: 0.5,
      price: 88.34, weeklyPrices: [91.52, 96.96, 96.55, 96.30, 88.34], weeklyChange: -3.47, sortRank: 0, periodReturns: { '1M': -10.3, '6M': 34.2, '1Y': 35.4 },
      priceHistory: { '1W': [91.52, 96.96, 96.55, 96.3, 88.34], '1M': [98.48, 102.92, 101.58, 99.09, 99.03, 96.71, 97.04, 93.85, 92.76, 91.81, 94.02, 91.11, 93.43, 98.05, 96.85, 94.65, 91.52, 96.96, 96.55, 96.3, 88.34], '6M': [65.81, 67.18, 64.91, 64.65, 74.87, 74.07, 76.2, 80.28, 78.23, 80.75, 77.16, 74.97, 67.81, 65.79, 64.71, 65.16, 65.38, 71.22, 76.87, 90.64, 92.91, 101.58, 97.04, 91.11, 94.65, 88.34], '1Y': [65.25, 65.73, 68.58, 70.37, 74.56, 73.11, 73.85, 70.53, 66.59, 60.95, 65.56, 68.55, 63.6, 64.76, 64.45, 64.71, 64.07, 66.59, 64.39, 67.07, 64.55, 62.41, 55.41, 51.7, 51.25, 56.71, 67.35, 67.18, 66.24, 64.68, 73.94, 74.68, 75.47, 79.36, 78.04, 78.92, 77.16, 74.97, 67.81, 62.73, 63.29, 64.2, 65.6, 71.56, 78.76, 89.44, 92.91, 101.58, 97.04, 91.11, 94.65, 88.34] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$48B', pe: 401.5, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 2.06,
      etfPresence: { SOXX: 2.46, PSI: false, XSD: 2.07, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.17, proScore: 1.09, coverage: 0.5,
      price: 206.89, weeklyPrices: [226.10, 229.00, 214.60, 217.50, 206.89], weeklyChange: -8.5, sortRank: 0, periodReturns: { '1M': 6.9, '6M': 17.5, '1Y': 183.6 },
      priceHistory: { '1W': [226.1, 229, 214.6, 217.5, 206.89], '1M': [193.57, 198.29, 188.29, 188.51, 210.22, 189.36, 184.54, 172.17, 156.27, 168.99, 182.98, 193.39, 218.41, 221.64, 221.23, 236.03, 226.1, 229, 214.6, 217.5, 206.89], '6M': [176.04, 143.91, 150.13, 144.7, 132.95, 161.38, 139.16, 129.66, 96.95, 128.4, 130.66, 114.48, 114.74, 115.91, 101.72, 103.91, 95.92, 107.93, 158.93, 185.54, 174.01, 188.29, 184.54, 193.39, 236.03, 206.89], '1Y': [72.96, 73.49, 84.57, 92.59, 93.36, 102.59, 95.74, 107.95, 114.7, 118.57, 118.74, 115.41, 124.27, 149.03, 164.42, 162.26, 146.01, 147.42, 149.9, 151.66, 154.96, 180.64, 170.16, 145.58, 150.85, 188.44, 178.94, 142.02, 149.94, 144.92, 141, 156.84, 135.1, 129.47, 98.06, 121.78, 130.66, 114.48, 114.74, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 174.01, 188.29, 184.54, 193.39, 236.03, 206.89] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$38B', pe: 113.7, revenueGrowth: 157, eps: 1.82, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 1.69, PSI: false, XSD: 2.65, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 7, avgWeight: 4.46, proScore: 2.4, coverage: 0.538,
      price: 864.01, weeklyPrices: [1035.50, 1064.10, 1079.57, 996.00, 864.01], weeklyChange: -16.56, sortRank: 0, periodReturns: { '1M': 35, '6M': 264.2, '1Y': 695.9 },
      priceHistory: { '1W': [1035.5, 1064.1, 1079.57, 996, 864.01], '1M': [640.2, 666.59, 646.63, 746.81, 795.33, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 971, 1035.5, 1064.1, 1079.57, 996, 864.01], '6M': [237.22, 241.14, 265.92, 294.37, 343.43, 338.13, 389.11, 435.28, 379.4, 410.34, 417.35, 415.56, 397.05, 418.69, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 776.01, 762.1, 971, 864.01], '1Y': [108.56, 115.6, 122.08, 123.25, 124.42, 120.11, 113.23, 111.25, 107.77, 123.72, 123.55, 116.42, 118.48, 135.24, 158.82, 166.41, 163.9, 190.96, 192.77, 206.77, 220.1, 234.7, 253.3, 241.95, 223.93, 239.49, 246.92, 237.5, 276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 417.35, 415.56, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 517.16, 646.63, 776.01, 762.1, 971, 864.01] },
      velocityScore: { '1D': -4, '1W': -10.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$974B', pe: 40.8, revenueGrowth: 196, eps: 21.17, grossMargin: 58, dividendYield: 0.07,
      etfPresence: { PTF: 4.49, WCLD: false, IGV: false, FDTX: 9.36, GTEK: false, ARKK: false, MARS: false, FRWD: 4.48, BCTK: 4.53, FWD: 1.47, CBSE: 2.81, FCUS: 4.05, WGMI: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 7, avgWeight: 4.24, proScore: 2.28, coverage: 0.538,
      price: 205.1, weeklyPrices: [224.36, 222.82, 214.75, 218.66, 205.10], weeklyChange: -8.58, sortRank: 0, periodReturns: { '1M': 4.4, '6M': 12.4, '1Y': 44.7 },
      priceHistory: { '1W': [224.36, 222.82, 214.75, 218.66, 205.1], '1M': [196.5, 207.83, 211.5, 215.2, 219.44, 225.83, 235.74, 225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1], '6M': [182.41, 175.02, 180.99, 188.22, 187.24, 185.81, 183.32, 191.52, 174.19, 190.05, 187.9, 184.89, 183.34, 186.03, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 199.57, 211.5, 235.74, 219.51, 211.14, 205.1], '1Y': [141.72, 141.97, 144.17, 157.99, 160, 170.7, 171.38, 176.75, 180, 182.06, 182.01, 179.81, 170.78, 170.76, 174.88, 178.43, 181.85, 185.54, 188.32, 182.64, 191.49, 206.88, 199.05, 186.6, 182.55, 181.46, 185.55, 176.29, 183.69, 187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 187.9, 184.89, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 199.57, 211.5, 235.74, 219.51, 211.14, 205.1] },
      velocityScore: { '1D': 0, '1W': -48.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.0T', pe: 31.5, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.49,
      etfPresence: { PTF: 4.55, WCLD: false, IGV: false, FDTX: 4.62, GTEK: false, ARKK: 1.73, MARS: false, FRWD: 8.16, BCTK: 6.56, FWD: 1.95, CBSE: false, FCUS: false, WGMI: 2.09 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 5, avgWeight: 4.98, proScore: 1.91, coverage: 0.385,
      price: 847.47, weeklyPrices: [921.26, 926.61, 940.69, 925.99, 847.47], weeklyChange: -8.01, sortRank: 0, periodReturns: { '1M': 9.9, '6M': 204, '1Y': 567.5 },
      priceHistory: { '1W': [921.26, 926.61, 940.69, 925.99, 847.47], '1M': [771.01, 786.42, 766.44, 782.64, 834.01, 817.35, 804.76, 795.47, 740.84, 733.35, 751.07, 810.46, 812.73, 845.76, 870.66, 879.8, 921.26, 926.61, 940.69, 925.99, 847.47], '6M': [278.79, 287.64, 296.36, 281.3, 330.42, 318.44, 344.22, 442.93, 418.63, 407.25, 408.97, 409.67, 367.34, 385.97, 406.77, 413.22, 423.12, 500.77, 531.81, 587.62, 673.64, 766.44, 804.76, 810.46, 879.8, 847.47], '1Y': [126.97, 127.27, 133.08, 144.33, 144.47, 149.05, 149.63, 150.46, 154.81, 151.69, 158.7, 164, 170.5, 191.59, 211.13, 228.13, 229.14, 242.83, 219.51, 214.4, 230.32, 265.55, 293.99, 261.38, 253.38, 266.87, 285.41, 285.58, 282.85, 280.08, 308.26, 312.28, 346.53, 446.57, 405.45, 431.17, 408.97, 409.67, 367.34, 373.98, 434.6, 378.79, 429.36, 503.13, 547.75, 586.25, 673.64, 766.44, 804.76, 810.46, 879.8, 847.47] },
      velocityScore: { '1D': -4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$192B', pe: 80.6, revenueGrowth: 44, eps: 10.51, grossMargin: 42, dividendYield: 0.35,
      etfPresence: { PTF: 4.75, WCLD: false, IGV: false, FDTX: 4.04, GTEK: false, ARKK: false, MARS: false, FRWD: 9.13, BCTK: false, FWD: false, CBSE: 2.72, FCUS: 4.25, WGMI: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 5, avgWeight: 4.46, proScore: 1.72, coverage: 0.385,
      price: 466.38, weeklyPrices: [510.13, 521.54, 542.52, 523.20, 466.38], weeklyChange: -8.58, sortRank: 0, periodReturns: { '1M': 31.3, '6M': 114, '1Y': 301.4 },
      priceHistory: { '1W': [510.13, 521.54, 542.52, 523.2, 466.38], '1M': [355.26, 421.39, 408.46, 455.19, 458.79, 445.5, 449.7, 424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38], '6M': [217.97, 210.78, 213.43, 215.61, 214.35, 220.97, 249.8, 252.74, 200.19, 213.58, 203.37, 203.68, 199.45, 204.83, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 354.49, 408.46, 449.7, 449.59, 516.1, 466.38], '1Y': [116.19, 116.16, 129.58, 141.9, 137.82, 155.61, 157, 173.66, 176.78, 172.28, 176.14, 163.36, 162.32, 155.82, 160.46, 160.9, 161.36, 203.71, 216.42, 240.56, 259.67, 259.65, 243.98, 240.52, 215.05, 215.24, 221.11, 207.58, 214.95, 215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 203.37, 203.68, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 354.49, 408.46, 449.7, 449.59, 516.1, 466.38] },
      velocityScore: { '1D': 19.4, '1W': -11.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$760B', pe: 156.5, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.88, MARS: false, FRWD: 7.63, BCTK: 3.81, FWD: 2.74, CBSE: false, FCUS: 3.25, WGMI: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 4, avgWeight: 5.38, proScore: 1.65, coverage: 0.308,
      price: 415.17, weeklyPrices: [435.63, 446.69, 436.69, 444.92, 415.17], weeklyChange: -4.7, sortRank: 0, periodReturns: { '1M': 5.3, '6M': 40.9, '1Y': 102.3 },
      priceHistory: { '1W': [435.63, 446.69, 436.69, 444.92, 415.17], '1M': [394.41, 419.5, 414.15, 411.68, 404.54, 399.8, 417.72, 404.35, 395.95, 392.61, 401.62, 407.15, 404.52, 412.32, 422.73, 418.45, 435.63, 446.69, 436.69, 444.92, 415.17], '6M': [294.72, 292.04, 288.95, 300.92, 327.43, 331.21, 326.12, 342.3, 325.74, 374.09, 360.39, 376.81, 353.86, 354.56, 339.57, 347.75, 341.49, 365.49, 363.35, 382.66, 396.06, 414.15, 417.72, 407.15, 418.45, 415.17], '1Y': [205.18, 211.1, 210.32, 226.49, 227.86, 236.95, 238.85, 242.75, 239, 242.09, 241.41, 235.59, 228.39, 250.92, 262.06, 282.71, 273.23, 302.4, 302.89, 297.7, 298.25, 304.86, 295.27, 282.01, 284.64, 292.09, 301.87, 287.74, 293.28, 299.58, 318.68, 327.11, 327.37, 339.55, 330.73, 368.1, 360.39, 376.81, 353.86, 336.71, 338.79, 326.11, 339.04, 370.6, 370.5, 402.46, 396.06, 414.15, 417.72, 407.15, 418.45, 415.17] },
      velocityScore: { '1D': -1.8, '1W': -13.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.2T', pe: 35.6, revenueGrowth: 35, eps: 11.67, grossMargin: 62, dividendYield: 0.92,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6, GTEK: false, ARKK: 0.99, MARS: false, FRWD: 5.93, BCTK: 8.58, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 4, avgWeight: 4.59, proScore: 1.41, coverage: 0.308,
      price: 511.72, weeklyPrices: [546.20, 563.10, 594.11, 575.50, 511.72], weeklyChange: -6.31, sortRank: 0, periodReturns: { '1M': 10, '6M': 203, '1Y': 822.8 },
      priceHistory: { '1W': [546.2, 563.1, 594.11, 575.5, 511.72], '1M': [465.26, 483.15, 463.91, 480, 515.83, 494.09, 489.15, 482.02, 458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72], '6M': [168.89, 176.34, 181.08, 179.68, 219.38, 214, 241.9, 279.7, 269.41, 273.74, 284.67, 282.25, 259.03, 268.81, 304.9, 296.14, 297.73, 337.88, 361.69, 403.12, 434.52, 463.91, 489.15, 486.46, 531.21, 511.72], '1Y': [55.45, 55.7, 60.38, 63.99, 64.02, 67.53, 68.74, 68.99, 77.29, 74.64, 76.29, 79.22, 81.91, 94.54, 103.09, 110.25, 116.74, 125.28, 118.86, 121.53, 126.67, 158.02, 174.22, 162.45, 150.93, 159.99, 169.78, 172.04, 176.76, 176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 284.67, 282.25, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 434.52, 463.91, 489.15, 486.46, 531.21, 511.72] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$176B', pe: 30.6, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.12,
      etfPresence: { PTF: 4.71, WCLD: false, IGV: false, FDTX: 4, GTEK: false, ARKK: false, MARS: false, FRWD: 5.42, BCTK: false, FWD: false, CBSE: false, FCUS: 4.23, WGMI: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab Corp', easyScore: 2, avgWeight: 8.51, proScore: 1.31, coverage: 0.154,
      price: 110.08, weeklyPrices: [122.39, 123.32, 114.70, 119.95, 110.08], weeklyChange: -10.06, sortRank: 0, periodReturns: { '1M': 39.8, '6M': 124.4, '1Y': 280.6 },
      priceHistory: { '1W': [122.39, 123.32, 114.7, 119.95, 110.08], '1M': [78.76, 84.65, 78.58, 105.47, 117.35, 124.15, 132.55, 124.77, 131.16, 127.31, 134.28, 125.45, 135.76, 143.2, 150.23, 143.48, 122.39, 123.32, 114.7, 119.95, 110.08], '6M': [49.06, 61.49, 70.52, 70.12, 86.03, 86.58, 87.82, 88.57, 73.11, 69.62, 76.58, 72.65, 70, 71.96, 69.48, 72.88, 65.52, 66.74, 82.93, 84.6, 82.51, 78.58, 132.55, 125.45, 143.48, 110.08], '1Y': [28.92, 25.41, 32.78, 35.77, 38.74, 44.6, 47.19, 45.11, 44.54, 45.02, 44.97, 47.22, 49.31, 47.03, 47.24, 52.91, 47.01, 58.5, 65.42, 67.35, 65.62, 61.34, 51.9, 43.31, 42.45, 41.9, 51.56, 55.41, 77.55, 70.45, 84.08, 91.8, 87.98, 85.68, 66.32, 66.01, 76.58, 72.65, 70, 68.37, 71.93, 65.94, 67.73, 68.05, 84.8, 79.68, 82.51, 78.58, 132.55, 125.45, 143.48, 110.08] },
      velocityScore: { '1D': 26, '1W': -73.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$69B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 13.55, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: 3.46, WGMI: false },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 5, avgWeight: 3.38, proScore: 1.3, coverage: 0.385,
      price: 385.73, weeklyPrices: [459.97, 481.57, 479.23, 418.91, 385.73], weeklyChange: -16.14, sortRank: 0, periodReturns: { '1M': -9.7, '6M': -1.2, '1Y': 56.2 },
      priceHistory: { '1W': [459.97, 481.57, 479.23, 418.91, 385.73], '1M': [427.36, 425.44, 412.56, 430, 428.43, 416.79, 439.79, 425.19, 420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73], '6M': [390.24, 359.93, 340.36, 349.39, 343.77, 354.61, 328.8, 333.24, 308.05, 342.76, 333.99, 321.7, 332.77, 341.57, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 417.43, 412.56, 439.79, 414.57, 446.77, 385.73], '1Y': [246.93, 248.7, 253.77, 275.65, 271.8, 280.94, 288.21, 294.3, 297.72, 303.9, 305.76, 294.23, 298.24, 336.67, 360, 338.94, 327.9, 335.49, 356.7, 349.24, 362.05, 362.55, 358.39, 342.65, 377.96, 381.57, 401.1, 339.81, 341.45, 349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 333.99, 321.7, 332.77, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 417.43, 412.56, 439.79, 414.57, 446.77, 385.73] },
      velocityScore: { '1D': -7.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 64.1, revenueGrowth: 48, eps: 6.02, grossMargin: 76, dividendYield: 0.67,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.79, GTEK: false, ARKK: 1.19, MARS: false, FRWD: 4.25, BCTK: 7.5, FWD: 3.16, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'CIFR', name: 'CIPHER DIGITAL INC', easyScore: 2, avgWeight: 8.31, proScore: 1.28, coverage: 0.154,
      price: 22.45, weeklyPrices: [24.01, 26.29, 26.24, 25.55, 22.45], weeklyChange: -6.5, sortRank: 0, periodReturns: { '1M': 1.6, '6M': 16.4, '1Y': 475.6 },
      priceHistory: { '1W': [24.01, 26.29, 26.24, 25.55, 22.45], '1M': [22.1, 21.91, 20.68, 20.55, 20.28, 21.24, 22.29, 20.33, 19.12, 18.8, 19.48, 21.52, 21.97, 23.02, 25.16, 23.65, 24.01, 26.29, 26.24, 25.55, 22.45], '6M': [19.28, 17.05, 16.21, 15.08, 17.54, 18.25, 17.72, 18.97, 14.25, 16.28, 15.8, 16.48, 15.15, 14.11, 14.67, 15.88, 12.64, 16.36, 17.34, 18.69, 17.74, 20.68, 22.29, 21.52, 23.65, 22.45], '1Y': [3.9, 3.72, 3.53, 4.78, 6.03, 5.97, 6.25, 6.16, 5.19, 4.76, 6.05, 6.64, 8.32, 9.22, 11.51, 14.15, 12.65, 15.34, 20.34, 19.91, 20.54, 22.76, 19.65, 14.35, 16.71, 17.64, 19.48, 14.74, 16.34, 14.59, 16.08, 18.13, 17.39, 17.7, 12.7, 16.1, 15.8, 16.48, 15.15, 13.71, 14.64, 14.35, 12.82, 16.53, 19.37, 18.2, 17.74, 20.68, 22.29, 21.52, 23.65, 22.45] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: -29, eps: -2.32, grossMargin: 12, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 0.26, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: 16.36 },
      tonyNote: 'CIPHER DIGITAL INC appears in 2 of 13 Broad Tech ETFs (15% coverage) with average weight 8.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 5, avgWeight: 3.15, proScore: 1.21, coverage: 0.385,
      price: 246.03, weeklyPrices: [261.26, 256.52, 250.02, 253.79, 246.03], weeklyChange: -5.83, sortRank: 0, periodReturns: { '1M': -10.1, '6M': 7.2, '1Y': 15.2 },
      priceHistory: { '1W': [261.26, 256.52, 250.02, 253.79, 246.03], '1M': [273.55, 274.99, 271.17, 272.68, 268.99, 270.13, 267.22, 264.14, 264.86, 259.34, 265.01, 268.46, 266.32, 265.29, 271.85, 270.64, 261.26, 256.52, 250.02, 253.79, 246.03], '6M': [229.53, 226.19, 227.35, 232.07, 240.93, 242.6, 231.31, 243.01, 232.99, 204.08, 204.86, 207.92, 218.94, 212.65, 209.87, 211.71, 210.57, 233.65, 249.7, 255.08, 265.06, 271.17, 267.22, 268.46, 270.64, 246.03], '1Y': [213.57, 212.1, 208.47, 219.39, 219.36, 226.35, 229.3, 232.79, 211.65, 221.3, 231.49, 227.94, 225.34, 238.24, 234.05, 220.71, 222.17, 220.9, 220.07, 216.48, 226.97, 254, 248.4, 232.87, 226.28, 234.42, 226.89, 222.54, 228.43, 232.53, 241.56, 236.65, 234.34, 241.73, 222.69, 199.6, 204.86, 207.92, 218.94, 209.53, 208.76, 207.54, 209.77, 238.38, 250.56, 263.99, 265.06, 271.17, 267.22, 268.46, 270.64, 246.03] },
      velocityScore: { '1D': 0, '1W': -72.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 31.7, revenueGrowth: 17, eps: 7.77, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.01, GTEK: false, ARKK: 2.52, MARS: false, FRWD: 3.45, BCTK: 4.47, FWD: 1.31, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'MRVL', name: 'Marvell Technology Inc', easyScore: 3, avgWeight: 5.23, proScore: 1.21, coverage: 0.231,
      price: 263.47, weeklyPrices: [219.43, 290.79, 301.65, 316.43, 263.47], weeklyChange: 20.07, sortRank: 0, periodReturns: { '1M': 56.1, '6M': 166.4, '1Y': 285.5 },
      priceHistory: { '1W': [219.43, 290.79, 301.65, 316.43, 263.47], '1M': [168.75, 172.15, 160.01, 170.13, 170.84, 177.95, 182.58, 176.89, 168.93, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 205, 219.43, 290.79, 301.65, 316.43, 263.47], '6M': [98.91, 84.43, 84.09, 85.76, 88.23, 83.05, 82.55, 83.62, 73.73, 81.34, 79.61, 79.29, 75.68, 90.44, 87.62, 98.45, 106.71, 119.93, 133.37, 165.56, 165.15, 160.01, 182.58, 190.69, 205, 263.47], '1Y': [68.35, 67.19, 70.78, 77.4, 71.95, 72.41, 73.06, 75.91, 76.53, 77.28, 76.74, 72.95, 64.6, 66.84, 68.86, 74.62, 82.39, 88.92, 89.39, 85.84, 88.71, 90.37, 93.23, 83.45, 83.79, 92.89, 92, 84.26, 84.8, 86.76, 84.64, 81.21, 83.1, 81.34, 74.21, 78.23, 79.61, 79.29, 75.68, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 164.31, 165.15, 160.01, 182.58, 190.69, 205, 263.47] },
      velocityScore: { '1D': -4, '1W': -55.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$230B', pe: 90.9, revenueGrowth: 28, eps: 2.9, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 8.06, GTEK: 4.36, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: 3.26, FCUS: false, WGMI: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 3, avgWeight: 5.18, proScore: 1.2, coverage: 0.231,
      price: 416.67, weeklyPrices: [460.52, 441.31, 427.34, 428.05, 416.67], weeklyChange: -9.52, sortRank: 0, periodReturns: { '1M': 1.3, '6M': -13.8, '1Y': -11.4 },
      priceHistory: { '1W': [460.52, 441.31, 427.34, 428.05, 416.67], '1M': [411.38, 413.96, 420.77, 415.12, 412.66, 405.21, 409.43, 421.92, 423.54, 417.42, 421.06, 419.09, 418.57, 416.03, 412.67, 450.24, 460.52, 441.31, 427.34, 428.05, 416.67], '6M': [483.16, 478.53, 485.92, 487.1, 478.51, 470.67, 444.11, 481.63, 414.19, 404.37, 398.46, 401.72, 410.68, 404.88, 391.79, 371.04, 369.37, 373.07, 420.26, 415.75, 407.78, 420.77, 409.43, 419.09, 450.24, 416.67], '1Y': [470.38, 474.96, 486, 497.41, 496.62, 505.82, 510.06, 512.5, 535.64, 521.77, 517.1, 504.26, 505.12, 498.41, 509.04, 509.23, 514.6, 528.57, 514.05, 516.79, 531.52, 517.03, 506, 507.49, 474, 490, 491.02, 474.82, 484.92, 487.48, 483.47, 459.38, 451.14, 433.5, 393.67, 401.84, 398.46, 401.72, 410.68, 401.86, 389.02, 365.97, 373.46, 370.87, 422.79, 424.62, 407.78, 420.77, 409.43, 419.09, 450.24, 416.67] },
      velocityScore: { '1D': 0, '1W': -77.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.1T', pe: 24.8, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 0.87,
      etfPresence: { PTF: false, WCLD: false, IGV: 7.73, FDTX: 3.79, GTEK: false, ARKK: false, MARS: false, FRWD: 4.02, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 3, avgWeight: 4.86, proScore: 1.12, coverage: 0.231,
      price: 391, weeklyPrices: [415.88, 423.74, 423.70, 418.45, 391.00], weeklyChange: -5.98, sortRank: 0, periodReturns: { '1M': 0.4, '6M': -14.1, '1Y': 32.5 },
      priceHistory: { '1W': [415.88, 423.74, 423.7, 418.45, 391], '1M': [389.37, 398.73, 411.79, 428.35, 445, 445.27, 443.3, 422.24, 409.99, 404.11, 417.26, 417.85, 426.01, 433.59, 440.36, 435.79, 415.88, 423.74, 423.7, 418.45, 391], '6M': [455, 458.96, 481.2, 459.64, 432.96, 447.2, 431.44, 431.46, 406.01, 428.27, 411.71, 408.58, 405.55, 407.82, 392.78, 385.95, 381.26, 345.62, 388.9, 373.72, 381.63, 411.79, 443.3, 417.85, 435.79, 391], '1Y': [295.14, 325.31, 348.68, 317.66, 297.81, 310.78, 328.49, 325.59, 309.26, 339.03, 335.16, 346.6, 329.36, 346.97, 421.62, 425.85, 443.21, 453.25, 435.9, 447.43, 452.42, 468.37, 445.23, 408.92, 417.78, 429.24, 439.58, 475.31, 488.73, 454.43, 431.41, 439.2, 449.36, 416.56, 397.21, 417.07, 411.71, 408.58, 405.55, 395.01, 380.3, 372.11, 360.59, 348.95, 400.62, 376.3, 381.63, 411.79, 443.3, 417.85, 435.79, 391] },
      velocityScore: { '1D': 0, '1W': -81.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 358.7, revenueGrowth: 16, eps: 1.09, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 10.11, MARS: false, FRWD: false, BCTK: 3.38, FWD: 1.08, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 3, avgWeight: 4.77, proScore: 1.1, coverage: 0.231,
      price: 303.28, weeklyPrices: [317.12, 334.41, 343.71, 336.41, 303.28], weeklyChange: -4.36, sortRank: 0, periodReturns: { '1M': 10, '6M': 91.1, '1Y': 251.2 },
      priceHistory: { '1W': [317.12, 334.41, 343.71, 336.41, 303.28], '1M': [275.8, 297.17, 286.52, 294.05, 296.05, 295.44, 299.15, 284.72, 277.96, 273.38, 292.09, 302.24, 305.35, 322.68, 318.93, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28], '6M': [158.7, 160.52, 172.27, 175.87, 206.96, 214.38, 228.39, 239.58, 209.78, 235.12, 237.39, 239.07, 214.68, 218.87, 224.71, 233.45, 222.01, 258.76, 260.96, 258.56, 257.86, 286.52, 299.15, 302.24, 318.18, 303.28], '1Y': [86.35, 89.52, 91.61, 97.34, 99.83, 101.07, 101.74, 98.62, 98.41, 102, 98.88, 101.28, 97.03, 105.57, 120.47, 131.93, 131.09, 149.15, 137.81, 144.05, 156.9, 161.24, 166.37, 147.46, 150.38, 158.19, 162.74, 164.3, 175.26, 173.78, 203.08, 208.79, 220.7, 248.17, 213.31, 231.29, 237.39, 239.07, 214.68, 209.49, 233.99, 211.62, 218.44, 263.66, 267.6, 267.78, 257.86, 286.52, 299.15, 302.24, 318.18, 303.28] },
      velocityScore: { '1D': -14.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$379B', pe: 57.4, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.34,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.79, BCTK: 6.76, FWD: 1.75, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 3, avgWeight: 4.57, proScore: 1.06, coverage: 0.231,
      price: 272.05, weeklyPrices: [300.48, 297.18, 280.43, 279.25, 272.05], weeklyChange: -9.46, sortRank: 0, periodReturns: { '1M': 47.9, '6M': 36.8, '1Y': 36.3 },
      priceHistory: { '1W': [300.48, 297.18, 280.43, 279.25, 272.05], '1M': [183.98, 183.68, 196.53, 207.88, 213.66, 227.79, 238.21, 242.83, 247.55, 240.13, 246.66, 252.92, 260.58, 256.75, 248.47, 281.69, 300.48, 297.18, 280.43, 279.25, 272.05], '6M': [198.84, 191.69, 186.88, 186.85, 185.86, 190.85, 181.47, 183.74, 166.72, 165.3, 150.99, 149.4, 163.16, 164.93, 168.91, 153.22, 160.67, 166.99, 166.97, 173.21, 179.32, 196.53, 238.21, 252.92, 281.69, 272.05], '1Y': [199.6, 196.27, 203.32, 204.64, 203.99, 192.25, 199.88, 204.5, 171, 168.17, 176.17, 184.55, 190.52, 197.55, 201.34, 203.25, 203.96, 212.58, 213.28, 211.82, 220.29, 219.23, 216.54, 202.9, 183.89, 189.88, 195.35, 185.88, 189.49, 186.85, 193.9, 190.93, 182.27, 176.2, 154.77, 162.81, 150.99, 149.4, 163.16, 168.12, 169.74, 156.36, 163.21, 155.73, 167.85, 178.54, 179.32, 196.53, 238.21, 252.92, 281.69, 272.05] },
      velocityScore: { '1D': 0, '1W': -59.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$222B', pe: 238.6, revenueGrowth: 31, eps: 1.14, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.41, IGV: 7.64, FDTX: 3.67, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 1, avgWeight: 12.88, proScore: 0.99, coverage: 0.077,
      price: 54.35, weeklyPrices: [65.33, 66.60, 65.48, 61.86, 54.35], weeklyChange: -16.81, sortRank: 0, periodReturns: { '1M': -0.7, '6M': 21.6, '1Y': 457.4 },
      priceHistory: { '1W': [65.33, 66.6, 65.48, 61.86, 54.35], '1M': [54.74, 60.98, 56.85, 61.2, 55.15, 55.17, 58.4, 52.94, 50.46, 47.74, 52.71, 58.06, 56.83, 59.78, 67.84, 63.54, 65.33, 66.6, 65.48, 61.86, 54.35], '6M': [44.71, 40.13, 39.92, 39.41, 45.91, 52.99, 53.48, 62.94, 44.94, 42.67, 43.29, 44.24, 40.13, 41.98, 42.21, 41.43, 34.09, 37.06, 47.7, 52.02, 45.51, 56.85, 58.4, 58.06, 63.54, 54.35], '1Y': [9.75, 9.83, 10.66, 14.57, 16.89, 16.88, 18.15, 16.58, 16.48, 17.97, 20.7, 23.12, 29.11, 30.19, 36.45, 41.77, 45.93, 57.75, 64.14, 59.22, 64.99, 67.75, 60.17, 47.41, 48.49, 41.12, 46.34, 35.48, 42.04, 38.3, 43.63, 52.88, 52.26, 59.84, 39.79, 40.03, 43.29, 44.24, 40.13, 41.37, 41.66, 37.45, 34.77, 39.32, 48.12, 50.64, 45.51, 56.85, 58.4, 58.06, 63.54, 54.35] },
      velocityScore: { '1D': -3.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 70.6, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: 12.88 },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 3, avgWeight: 4.24, proScore: 0.98, coverage: 0.231,
      price: 135.53, weeklyPrices: [160.65, 152.17, 142.20, 141.70, 135.53], weeklyChange: -15.64, sortRank: 0, periodReturns: { '1M': -0.3, '6M': -25.4, '1Y': 6.1 },
      priceHistory: { '1W': [160.65, 152.17, 142.2, 141.7, 135.53], '1M': [135.91, 133.79, 137.05, 137.8, 136.89, 130.05, 133.73, 133.99, 135.14, 135.26, 137.15, 137.41, 136.88, 136.6, 132.51, 156.54, 160.65, 152.17, 142.2, 141.7, 135.53], '6M': [181.76, 183.57, 193.38, 184.18, 179.71, 178.96, 165.33, 157.35, 139.54, 135.68, 134.89, 135.94, 152.67, 151.6, 152.77, 154.96, 146.49, 130.49, 142.76, 141.57, 139.11, 137.05, 133.73, 137.41, 156.54, 135.53], '1Y': [127.72, 137.4, 139.92, 136.32, 139.71, 148.58, 151.79, 157.88, 160.66, 182.68, 174.03, 157.17, 157.09, 162.36, 170.26, 182.55, 178.86, 179.53, 177.21, 181.59, 189.18, 207.18, 193.61, 171.25, 162.25, 170.69, 181.49, 183.25, 193.98, 180.84, 181.68, 178.4, 165.9, 151.86, 130.01, 129.13, 134.89, 135.94, 152.67, 153.5, 155.68, 147.56, 148.46, 128.06, 146.39, 143.09, 139.11, 137.05, 133.73, 137.41, 156.54, 135.53] },
      velocityScore: { '1D': 0, '1W': -65, '1M': null, '6M': null }, isNew: false,
      marketCap: '$325B', pe: 152.3, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 6.84, FDTX: 2.87, GTEK: false, ARKK: 3.02, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 2.99, proScore: 0.92, coverage: 0.308,
      price: 109.54, weeklyPrices: [124.12, 117.01, 112.94, 116.04, 109.54], weeklyChange: -11.75, sortRank: 0, periodReturns: { '1M': 1.8, '6M': -32, '1Y': -1.7 },
      priceHistory: { '1W': [124.12, 117.01, 112.94, 116.04, 109.54], '1M': [107.63, 105.44, 111.74, 110.41, 102.54, 95.4, 97.42, 100.28, 102.39, 101.01, 105.01, 104.86, 103, 104.9, 106.6, 118.71, 124.12, 117.01, 112.94, 116.04, 109.54], '6M': [161.08, 164.19, 169.57, 167.88, 168.45, 167.44, 138.54, 138.92, 114.02, 118.71, 123.8, 125.94, 134.79, 129.52, 123.75, 118.42, 118.52, 112.38, 126.94, 124.23, 121.13, 111.74, 97.42, 104.86, 118.71, 109.54], '1Y': [111.41, 105.34, 109.98, 115.35, 112.48, 115.05, 128.43, 126.84, 125.21, 147.5, 143.11, 140.53, 139.04, 143.44, 147.21, 149.94, 149, 164.5, 153.66, 164.71, 175.06, 172.94, 158.88, 139.93, 155.31, 156.83, 158.41, 159.85, 169.67, 163.74, 166.74, 157.51, 137.64, 143.64, 111.24, 110.66, 123.8, 125.94, 134.79, 126.17, 122.37, 115.43, 118.25, 110.79, 131.15, 125.83, 121.13, 111.74, 97.42, 104.86, 118.71, 109.54] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$142B', pe: 107.4, revenueGrowth: 34, eps: 1.02, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.89, GTEK: false, ARKK: 4.38, MARS: false, FRWD: 1.97, BCTK: 2.7, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 13 Broad Tech ETFs (31% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 3, avgWeight: 3.71, proScore: 0.86, coverage: 0.231,
      price: 365.76, weeklyPrices: [372.58, 358.39, 355.68, 369.27, 365.76], weeklyChange: -1.83, sortRank: 0, periodReturns: { '1M': -4.8, '6M': 13.6, '1Y': 109.1 },
      priceHistory: { '1W': [372.58, 358.39, 355.68, 369.27, 365.76], '1M': [384.27, 395.14, 395.3, 397.05, 386.77, 399.04, 397.17, 393.32, 393.11, 384.9, 384.9, 383.47, 379.38, 384.84, 384.83, 376.43, 372.58, 358.39, 355.68, 369.27, 365.76], '6M': [322.09, 310.52, 308.61, 314.39, 314.55, 336.43, 328.38, 336.28, 333.34, 311.33, 303.56, 307.15, 300.91, 308.42, 306.3, 289.59, 294.9, 316.37, 332.77, 337.75, 381.94, 395.3, 397.17, 383.47, 376.43, 365.76], '1Y': [174.92, 175.88, 166.01, 177.39, 175.16, 183.1, 191.15, 193.42, 195.75, 201.63, 204.29, 209.16, 211.99, 239.94, 251.42, 252.34, 244.36, 251.51, 244.64, 257.02, 269.93, 284.12, 290.59, 285.6, 318.47, 316.02, 314.45, 309.32, 311.33, 314.55, 322.43, 336.31, 330.84, 338.66, 331.33, 309.37, 303.56, 307.15, 300.91, 303.21, 305.73, 280.74, 294.46, 315.72, 339.4, 342.32, 381.94, 395.3, 397.17, 383.47, 376.43, 365.76] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$4.5T', pe: 27.9, revenueGrowth: 22, eps: 13.09, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.66, GTEK: false, ARKK: 1.86, MARS: false, FRWD: false, BCTK: 5.62, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Alphabet Inc Class C appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 3.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 1, avgWeight: 10.6, proScore: 0.82, coverage: 0.077,
      price: 213.68, weeklyPrices: [248.15, 244.58, 230.33, 236.34, 213.68], weeklyChange: -13.89, sortRank: 0, periodReturns: { '1M': 15.3, '6M': -1.8, '1Y': 22.8 },
      priceHistory: { '1W': [248.15, 244.58, 230.33, 236.34, 213.68], '1M': [185.35, 194.03, 194.59, 195.95, 193.84, 189.76, 195.61, 192.95, 186.61, 181.46, 188.16, 189.77, 192.08, 193.06, 190.96, 225.78, 248.15, 244.58, 230.33, 236.34, 213.68], '6M': [217.58, 189.97, 191.97, 195.38, 193.75, 202.29, 173.88, 172.8, 146.67, 157.16, 156.54, 150.31, 154.79, 163.12, 152.9, 146.02, 145.23, 137.86, 178.34, 176.28, 161.39, 194.59, 195.61, 189.77, 225.78, 213.68], '1Y': [174.02, 215.22, 207.04, 218.63, 234.5, 234.96, 243.54, 247.71, 252.53, 252.68, 249.07, 235.41, 225.3, 241.51, 306.65, 313.83, 282.76, 291.59, 308.01, 277.18, 281.4, 257.85, 240.83, 219.86, 200.28, 201.1, 220.54, 184.92, 198.38, 197.21, 192.84, 193.61, 178.18, 169.01, 136.48, 156.48, 156.54, 150.31, 154.79, 159.16, 155.52, 142.81, 146.38, 138.09, 175.06, 173.28, 161.39, 194.59, 195.61, 189.77, 225.78, 213.68] },
      velocityScore: { '1D': null, '1W': -69.3, '1M': null, '6M': null }, isNew: true,
      marketCap: '$615B', pe: 38.3, revenueGrowth: 22, eps: 5.58, grossMargin: 67, dividendYield: 0.94,
      etfPresence: { PTF: false, WCLD: false, IGV: 10.6, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Oracle lands in 3 AI ETFs on the strength of its cloud database and AI infrastructure contracts. Revenue grew 22%, 67% gross margin, P/E of 40x. The 17.5% weekly return following a major earnings beat shows how quickly sentiment can reprice; the weight score at 2.04% is still modest, meaning ETF managers have started building positions but conviction is not yet deep.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'POWELL INDUSTRIES INC', easyScore: 1, avgWeight: 7.88, proScore: 2.63, coverage: 0.333,
      price: 284.87, weeklyPrices: [288.12, 299.07, 299.73, 300.06, 284.87], weeklyChange: -1.13, sortRank: 0, periodReturns: { '1M': -3.3, '6M': 149.8, '1Y': 347.5 },
      priceHistory: { '1W': [288.12, 299.07, 299.73, 300.06, 284.87], '1M': [294.69, 320.3, 305.93, 309.39, 322.05, 300.84, 296.98, 292.65, 266.8, 261.58, 271.05, 270.75, 279.22, 291.97, 295.94, 284.42, 288.12, 299.07, 299.73, 300.06, 284.87], '6M': [114.04, 112.36, 110.97, 111.96, 120, 133.04, 140.62, 147.81, 175.77, 197.45, 178.79, 176.96, 167.67, 171.73, 167.41, 194.85, 184.68, 230.81, 232.81, 252.18, 277.27, 305.93, 296.98, 270.75, 284.42, 284.87], '1Y': [63.66, 62.62, 60.17, 70.15, 72.14, 70.37, 73.64, 80.8, 76.72, 88.28, 86.57, 86.12, 87.92, 92.3, 99.41, 97.41, 101.01, 103.9, 105.33, 116.4, 124.71, 130.23, 124.62, 105.94, 100.03, 107.5, 114.29, 109.31, 112.18, 109.16, 118.62, 133.76, 142.29, 152.31, 179.6, 197.63, 178.79, 176.96, 167.67, 171.19, 175.13, 174.8, 182.6, 230.94, 241.01, 252.76, 277.27, 305.93, 296.98, 270.75, 284.42, 284.87] },
      velocityScore: { '1D': -28.3, '1W': -46.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 55.5, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { POW: false, VOLT: 7.88, PBD: false, PBW: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'BELFB', name: 'BEL FUSE INC', easyScore: 1, avgWeight: 7.18, proScore: 2.39, coverage: 0.333,
      price: 262.56, weeklyPrices: [269.86, 269.22, 280.09, 276.54, 262.56], weeklyChange: -2.71, sortRank: 0, periodReturns: { '1M': -11.6, '6M': 58.2, '1Y': 242.4 },
      priceHistory: { '1W': [269.86, 269.22, 280.09, 276.54, 262.56], '1M': [297.17, 286.89, 290.46, 297.98, 302.73, 266.92, 268.73, 256.72, 258.28, 249.71, 254.75, 260.4, 270.01, 276.25, 280.13, 274.52, 269.86, 269.22, 280.09, 276.54, 262.56], '6M': [166, 173.12, 175.69, 174.34, 184, 193.82, 201.8, 207.78, 211.58, 238.4, 230.06, 232.12, 202.58, 200.88, 205.74, 220.77, 203.04, 235, 241.49, 268.31, 275.84, 290.46, 268.73, 260.4, 274.52, 262.56], '1Y': [76.68, 86.16, 93.31, 97.69, 101.2, 98.24, 103.72, 126.75, 131.51, 128.22, 131.57, 137.03, 135.97, 143.15, 148.78, 146.79, 140.37, 141.12, 145.02, 147.96, 155.89, 158.57, 166.99, 141.86, 145.88, 161.55, 172.21, 173.3, 174.02, 172.95, 181.03, 192.96, 200.29, 210.44, 208, 231.48, 230.06, 232.12, 202.58, 195.18, 214.95, 204.11, 204.65, 235.73, 254.25, 276.65, 275.84, 290.46, 268.73, 260.4, 274.52, 262.56] },
      velocityScore: { '1D': -9.1, '1W': -35.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 63.3, revenueGrowth: 17, eps: 4.15, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: false, VOLT: 7.18, PBD: false, PBW: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 2, avgWeight: 3.17, proScore: 2.11, coverage: 0.667,
      price: 263.61, weeklyPrices: [273.51, 302.85, 287.32, 291.37, 263.61], weeklyChange: -3.62, sortRank: 0, periodReturns: { '1M': -10.7, '6M': 121.2, '1Y': 1110.3 },
      priceHistory: { '1W': [273.51, 302.85, 287.32, 291.37, 263.61], '1M': [295.25, 285.47, 258.64, 261.03, 283.92, 289.76, 303.41, 275.95, 258.71, 261.34, 282.31, 307.88, 302.49, 302.4, 293.8, 285, 273.51, 302.85, 287.32, 291.37, 263.61], '6M': [119.18, 94.98, 88.82, 88.41, 103.05, 139.77, 150.56, 165.39, 147.35, 155.54, 159, 168.57, 159.99, 159.21, 156.58, 150.22, 132.45, 160.13, 210.06, 237.57, 283.36, 258.64, 303.41, 307.88, 285, 263.61], '1Y': [21.78, 21.95, 22.56, 23.92, 24.3, 25.31, 25.36, 34.78, 36.1, 37.65, 46.5, 49.35, 51.35, 55, 73.29, 77.38, 73.6, 86.97, 109.91, 109.06, 108.53, 142.37, 139.23, 107.11, 95.56, 105, 111.79, 89.58, 92.26, 87.26, 108, 133.46, 145.63, 156.51, 136.6, 139.03, 159, 168.57, 159.99, 157.17, 166.69, 133.52, 135.63, 166.7, 207.86, 231.17, 283.36, 258.64, 303.41, 307.88, 285, 263.61] },
      velocityScore: { '1D': 27.9, '1W': -9.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$75B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: 4.21, PBD: false, PBW: 2.12 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'PWR', name: 'QUANTA SERVICES INC', easyScore: 1, avgWeight: 5.54, proScore: 1.85, coverage: 0.333,
      price: 695.11, weeklyPrices: [687.48, 706.06, 715.67, 719.17, 695.11], weeklyChange: 1.11, sortRank: 0, periodReturns: { '1M': -9.9, '6M': 50.9, '1Y': 92.4 },
      priceHistory: { '1W': [687.48, 706.06, 715.67, 719.17, 695.11], '1M': [771.61, 785.24, 750.73, 745, 781.38, 773.72, 780.08, 769.99, 723.03, 714.13, 709.93, 716.91, 723.44, 742.18, 733.62, 711.73, 687.48, 706.06, 715.67, 719.17, 695.11], '6M': [460.64, 438.11, 426.66, 431.03, 438.22, 444.2, 473.24, 481.28, 464.57, 523.96, 554, 565.05, 549.22, 567.71, 572, 573.5, 560.12, 582.06, 587.42, 633.44, 727.77, 750.73, 780.08, 716.91, 711.73, 695.11], '1Y': [361.35, 358.26, 365.76, 378.08, 377.56, 386.54, 398.66, 411.99, 393.62, 384.12, 383.32, 378.31, 374.68, 373.47, 378.24, 389.53, 409.11, 427.8, 430.98, 440.74, 441.82, 450.82, 450.38, 426.87, 442.64, 454.72, 463.09, 435.87, 433.03, 428.81, 436.89, 437.07, 468.78, 483.43, 477.72, 515.88, 554, 565.05, 549.22, 566.91, 577.95, 545.64, 560.63, 585.36, 601.88, 624.84, 727.77, 750.73, 780.08, 716.91, 711.73, 695.11] },
      velocityScore: { '1D': -28.3, '1W': -49, '1M': null, '6M': null }, isNew: false,
      marketCap: '$104B', pe: 95.2, revenueGrowth: 26, eps: 7.3, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: false, VOLT: 5.54, PBD: false, PBW: false },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'ETN', name: 'EATON CORP PLC', easyScore: 1, avgWeight: 5.4, proScore: 1.8, coverage: 0.333,
      price: 395.94, weeklyPrices: [400.08, 417.62, 421.21, 418.61, 395.94], weeklyChange: -1.03, sortRank: 0, periodReturns: { '1M': -3.6, '6M': 17.3, '1Y': 19.5 },
      priceHistory: { '1W': [400.08, 417.62, 421.21, 418.61, 395.94], '1M': [410.86, 421.39, 399.15, 401.51, 419, 406.94, 408.1, 399.44, 381.87, 371.88, 379.69, 381.51, 391.35, 403.13, 406.37, 400.6, 400.08, 417.62, 421.21, 418.61, 395.94], '6M': [337.66, 331.98, 317.8, 321.45, 332.97, 332.38, 337.96, 347.32, 365, 396.09, 377.32, 374.59, 354.79, 355.79, 360.54, 375, 365.56, 400.44, 392.73, 424.5, 433.01, 399.15, 408.1, 381.51, 400.6, 395.94], '1Y': [331.45, 323.66, 332.95, 356.99, 356.98, 362.11, 373.66, 392.76, 384.76, 360.11, 353.5, 345.76, 343.75, 348.23, 371.19, 368.52, 367.15, 380.02, 375.37, 377.69, 379.74, 386.57, 379.57, 342.75, 330.43, 333.11, 343.39, 333.21, 320.39, 320.86, 322.67, 331.14, 334.04, 354.37, 354.67, 390.33, 377.32, 374.59, 354.79, 348.64, 360.23, 357.1, 361.1, 403, 406.21, 423.92, 433.01, 399.15, 408.1, 381.51, 400.6, 395.94] },
      velocityScore: { '1D': -25.3, '1W': -45.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$154B', pe: 38.7, revenueGrowth: 17, eps: 10.22, grossMargin: 37, dividendYield: 1.11,
      etfPresence: { POW: false, VOLT: 5.4, PBD: false, PBW: false },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'AEP', name: 'AMERICAN ELECTRIC POWER CO INC', easyScore: 1, avgWeight: 4.35, proScore: 1.45, coverage: 0.333,
      price: 129.14, weeklyPrices: [123.79, 127.11, 126.31, 127.79, 129.14], weeklyChange: 4.32, sortRank: 0, periodReturns: { '1M': -5.8, '6M': 9.9, '1Y': 26.9 },
      priceHistory: { '1W': [123.79, 127.11, 126.31, 127.79, 129.14], '1M': [137.04, 132.56, 131.76, 130.16, 130.7, 127.95, 128.6, 125.15, 127.68, 128.92, 128.87, 129.61, 131.59, 130.9, 129.57, 126.67, 123.79, 127.11, 126.31, 127.79, 129.14], '6M': [117.54, 114.13, 114.49, 115.77, 115.04, 116.62, 118.98, 119.12, 119.98, 122.25, 128.42, 132.1, 132.04, 131.26, 130.97, 128.3, 131.67, 137.15, 134.56, 135.08, 137.11, 131.76, 128.6, 129.61, 126.67, 129.14], '1Y': [101.79, 102.9, 103.31, 103.76, 103.96, 104.4, 108.54, 107.95, 115, 112, 110.7, 113.01, 110.09, 108.36, 106.84, 108.14, 109.78, 115.66, 116.8, 117.82, 116.39, 119.92, 122.56, 123.72, 122.04, 119.23, 115.73, 115.77, 114.62, 115.99, 113.7, 118.11, 117.18, 119.21, 120.61, 126.43, 128.42, 132.1, 132.04, 132.22, 128.72, 128.85, 132.68, 136.3, 133.66, 134.73, 137.11, 131.76, 128.6, 129.61, 126.67, 129.14] },
      velocityScore: { '1D': 5.1, '1W': -25.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 19.1, revenueGrowth: 10, eps: 6.75, grossMargin: 47, dividendYield: 2.94,
      etfPresence: { POW: false, VOLT: 4.35, PBD: false, PBW: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'HYLN', name: 'Hyliion Holdings Corp', easyScore: 1, avgWeight: 4.21, proScore: 1.4, coverage: 0.333,
      price: 6.9, weeklyPrices: [6.25, 6.79, 6.46, 7.62, 6.90], weeklyChange: 10.4, sortRank: 0, periodReturns: { '1M': 198.7, '6M': 259.4, '1Y': 339.5 },
      priceHistory: { '1W': [6.25, 6.79, 6.46, 7.62, 6.9], '1M': [2.31, 2.39, 2.47, 2.46, 2.76, 3.59, 3.69, 4.67, 4.2, 4.09, 4.09, 4.2, 5.99, 6.6, 6.94, 6.99, 6.25, 6.79, 6.46, 7.62, 6.9], '6M': [1.92, 1.94, 1.86, 1.93, 1.94, 2.08, 2.16, 2.1, 2.07, 2.05, 2.06, 2.15, 2.01, 2.07, 1.91, 1.89, 1.75, 1.81, 1.92, 1.89, 1.91, 2.47, 3.69, 4.2, 6.99, 6.9], '1Y': [1.57, 1.45, 1.41, 1.32, 1.43, 1.45, 1.58, 1.63, 1.49, 1.57, 1.65, 1.76, 1.61, 1.61, 1.82, 2.14, 2.02, 2.07, 2.38, 2.13, 2.22, 2.2, 2.06, 1.64, 1.78, 1.81, 1.86, 1.84, 1.93, 1.9, 1.94, 2.1, 2.27, 2.13, 1.87, 1.99, 2.06, 2.15, 2.01, 2.08, 1.9, 1.78, 1.72, 1.84, 2, 1.92, 1.91, 2.47, 3.69, 4.2, 6.99, 6.9] },
      velocityScore: { '1D': 34.6, '1W': -27.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1B', pe: null, revenueGrowth: 479, eps: -0.3, grossMargin: 6, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 4.21 },
      tonyNote: 'Hyliion is a small-cap commercial truck powertrain electrification company. It holds a speculative position in Electrification ETFs on the heavy-duty vehicle decarbonization thesis. Revenue is early-stage and the path to profitability is long; the ETF weight is small, reflecting a lottery-ticket allocation to an electrification theme adjacent holding.',
    },
    {
      ticker: 'NEE', name: 'NEXTERA ENERGY INC', easyScore: 1, avgWeight: 4.09, proScore: 1.36, coverage: 0.333,
      price: 85.84, weeklyPrices: [83.66, 85.68, 84.58, 85.68, 85.84], weeklyChange: 2.61, sortRank: 0, periodReturns: { '1M': -10.8, '6M': 3.3, '1Y': 19 },
      priceHistory: { '1W': [83.66, 85.68, 84.58, 85.68, 85.84], '1M': [96.28, 95.39, 93.32, 93.1, 94.84, 94.85, 95.68, 93.36, 89.04, 90.06, 88.27, 89.69, 88.55, 87.65, 87.65, 87.01, 83.66, 85.68, 84.58, 85.68, 85.84], '6M': [83.13, 81.65, 79.54, 80.27, 81.05, 81.64, 83.85, 87.57, 89.97, 91.36, 91.64, 91.99, 91.13, 91.66, 90.96, 91.16, 92.85, 94.48, 91.83, 96.25, 97.88, 93.32, 95.68, 89.69, 87.01, 85.84], '1Y': [72.16, 74.78, 70.73, 69.42, 72.46, 74.7, 76.17, 71.34, 70.53, 72.45, 75.72, 75.32, 72.65, 70.07, 69.83, 72.32, 76.21, 82.11, 84.3, 84.77, 86.03, 81.78, 84.77, 85.75, 84.23, 84.58, 80.55, 81.65, 80.04, 80.53, 78.37, 81.98, 85.07, 88.18, 89.21, 91.93, 91.64, 91.99, 91.13, 91.73, 92.41, 91.16, 93.15, 94.08, 91.98, 95.28, 97.88, 93.32, 95.68, 89.69, 87.01, 85.84] },
      velocityScore: { '1D': -6.8, '1W': -36.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$179B', pe: 21.8, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.9,
      etfPresence: { POW: false, VOLT: 4.09, PBD: false, PBW: false },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'GEV', name: 'GE VERNOVA INC', easyScore: 1, avgWeight: 3.95, proScore: 1.32, coverage: 0.333,
      price: 933.61, weeklyPrices: [950.54, 969.67, 959.36, 963.33, 933.61], weeklyChange: -1.78, sortRank: 0, periodReturns: { '1M': -14.8, '6M': 47.9, '1Y': 92.5 },
      priceHistory: { '1W': [950.54, 969.67, 959.36, 963.33, 933.61], '1M': [1095.21, 1118.96, 1045.63, 1040.15, 1073.08, 1062.57, 1090.53, 1049.23, 1012.25, 1011.8, 1024.52, 1043.82, 1038.74, 1070.47, 1031.89, 968.32, 950.54, 969.67, 959.36, 963.33, 933.61], '6M': [631.32, 671.71, 658.28, 663.46, 686.33, 652.09, 667.89, 711.59, 746.22, 823.67, 834.61, 876.46, 815.01, 847.65, 858.47, 923.69, 894.78, 968.02, 978.32, 1149.53, 1083.46, 1045.63, 1090.53, 1043.82, 968.32, 933.61], '1Y': [485, 478.45, 499.88, 529.15, 530, 559.61, 565.91, 647.66, 662.77, 650.76, 625.02, 602.31, 579.68, 605.7, 617.91, 633.41, 602.43, 603.22, 648.25, 594.07, 584.39, 581.26, 579.8, 577.02, 580.49, 601.58, 621.9, 681.35, 661.81, 659.64, 662.32, 644.18, 661.67, 717.39, 737.53, 816.56, 834.61, 876.46, 815.01, 832.11, 877.39, 873.12, 898.57, 991.32, 1002.75, 1149.19, 1083.46, 1045.63, 1090.53, 1043.82, 968.32, 933.61] },
      velocityScore: { '1D': -26.7, '1W': -48.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$251B', pe: 27.3, revenueGrowth: 16, eps: 34.26, grossMargin: 20, dividendYield: 0.21,
      etfPresence: { POW: false, VOLT: 3.95, PBD: false, PBW: false },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'APH', name: 'AMPHENOL CORP', easyScore: 1, avgWeight: 3.94, proScore: 1.31, coverage: 0.333,
      price: 138.81, weeklyPrices: [146.34, 148.40, 147.62, 146.77, 138.81], weeklyChange: -5.15, sortRank: 0, periodReturns: { '1M': 1.6, '6M': -0.4, '1Y': 48.7 },
      priceHistory: { '1W': [146.34, 148.4, 147.62, 146.77, 138.81], '1M': [136.69, 138.47, 136.62, 128.03, 122.47, 124.64, 129.19, 125, 121.72, 119.2, 123.05, 124.86, 132.06, 139.56, 140.24, 148.76, 146.34, 148.4, 147.62, 146.77, 138.81], '6M': [139.36, 129.24, 135.29, 136.9, 141.38, 148.97, 154.6, 145.96, 130, 144.04, 151.2, 148.47, 136.24, 134.54, 127.81, 128.73, 127.7, 137.68, 148.96, 150.18, 147.27, 136.62, 129.19, 124.86, 148.76, 138.81], '1Y': [93.36, 92.49, 95.25, 98.75, 97.41, 99.44, 103.71, 106.7, 108.63, 109.81, 111.06, 109.73, 109.25, 116.79, 119.04, 125.4, 121.01, 123.4, 123.91, 127.67, 135.91, 141.55, 143.85, 132.33, 137.88, 141.49, 140.06, 129.9, 135.14, 136.2, 138.91, 146.75, 152.5, 149.58, 127.63, 143.73, 151.2, 148.47, 136.24, 131.47, 130.65, 123.13, 128, 140.75, 151.06, 149.71, 147.27, 136.62, 129.19, 124.86, 148.76, 138.81] },
      velocityScore: { '1D': 5.6, '1W': -27.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$171B', pe: 39.9, revenueGrowth: 58, eps: 3.48, grossMargin: 38, dividendYield: 0.72,
      etfPresence: { POW: false, VOLT: 3.94, PBD: false, PBW: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'OGE', name: 'OGE ENERGY CORP', easyScore: 1, avgWeight: 3.86, proScore: 1.29, coverage: 0.333,
      price: 47.8, weeklyPrices: [45.66, 46.61, 46.40, 46.97, 47.80], weeklyChange: 4.69, sortRank: 0, periodReturns: { '1M': -0.1, '6M': 10.2, '1Y': 9.2 },
      priceHistory: { '1W': [45.66, 46.61, 46.4, 46.97, 47.8], '1M': [47.84, 47.73, 47.33, 47.35, 47.4, 47.34, 47.51, 46.27, 47.31, 48.05, 47.9, 48.1, 48.54, 48.41, 48.18, 47.23, 45.66, 46.61, 46.4, 46.97, 47.8], '6M': [43.38, 43.05, 42.5, 42.9, 42.59, 42.97, 43.7, 43.51, 43.65, 45.24, 46.73, 48.58, 48.26, 47.08, 47.78, 47.36, 48.26, 49.86, 48.62, 47.53, 48.8, 47.33, 47.51, 48.1, 47.23, 47.8], '1Y': [43.79, 44.31, 44.75, 44.38, 43.59, 43.79, 45.12, 44.21, 45.9, 45.18, 44.57, 45.15, 44.54, 43.79, 43.64, 44.79, 45.9, 46.15, 45.96, 46.65, 46.48, 44.13, 44.68, 44.59, 44.75, 44.42, 42.88, 43.2, 43.03, 43.03, 42.16, 43.48, 43.18, 43.48, 43.98, 46.14, 46.73, 48.58, 48.26, 47.86, 47.37, 47.67, 48.76, 49.45, 48.16, 47.1, 48.8, 47.33, 47.51, 48.1, 47.23, 47.8] },
      velocityScore: { '1D': 40.2, '1W': -31.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 21.2, revenueGrowth: 1, eps: 2.25, grossMargin: 44, dividendYield: 3.56,
      etfPresence: { POW: false, VOLT: 3.86, PBD: false, PBW: false },
      tonyNote: 'OGE Energy is a regional Oklahoma utility held in Electrification ETFs. Revenue is regulated, dividend yield is the primary return driver, and the load growth thesis is less prominent than for AEP or NEE. The ETF allocation is defensive — utilities in electrification ETFs serve as yield anchors alongside the higher-growth infrastructure names.',
    },
    {
      ticker: 'AEIS', name: 'ADVANCED ENERGY INDUSTRIES INC', easyScore: 1, avgWeight: 3.84, proScore: 1.28, coverage: 0.333,
      price: 294.81, weeklyPrices: [294.65, 312.28, 322.50, 320.92, 294.81], weeklyChange: 0.05, sortRank: 0, periodReturns: { '1M': -14.7, '6M': 34.4, '1Y': 142.5 },
      priceHistory: { '1W': [294.65, 312.28, 322.5, 320.92, 294.81], '1M': [345.63, 360.81, 351.94, 357.24, 354.97, 339.19, 344.6, 323.46, 309.06, 302.84, 313.05, 323.79, 324.86, 339.65, 328.34, 302.18, 294.65, 312.28, 322.5, 320.92, 294.81], '6M': [219.38, 215.07, 216.09, 217.26, 229.7, 233.92, 269, 263.76, 254.54, 308.77, 320.64, 337.35, 311.42, 314.84, 319.63, 342.87, 332.82, 374.98, 372.23, 382.47, 383.91, 351.94, 344.6, 323.79, 302.18, 294.81], '1Y': [121.56, 122.8, 130.03, 132.5, 138.07, 139.1, 142.66, 141.94, 140.56, 151.61, 153.23, 153.01, 145.49, 154.76, 158.03, 176.59, 166.76, 176.02, 182.15, 197.44, 205.12, 205.61, 219.3, 198.54, 206.04, 210.94, 221.85, 216.87, 217.76, 213.41, 224.4, 237.9, 275.57, 269.12, 257.64, 312.95, 320.64, 337.35, 311.42, 305.82, 327.8, 313.11, 332.31, 379.64, 375.6, 387.24, 383.91, 351.94, 344.6, 323.79, 302.18, 294.81] },
      velocityScore: { '1D': 2.4, '1W': -24.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 61.4, revenueGrowth: 26, eps: 4.8, grossMargin: 39, dividendYield: 0.14,
      etfPresence: { POW: false, VOLT: 3.84, PBD: false, PBW: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'ETR', name: 'ENTERGY CORP', easyScore: 1, avgWeight: 3.7, proScore: 1.23, coverage: 0.333,
      price: 110.74, weeklyPrices: [104.97, 107.60, 108.66, 109.28, 110.74], weeklyChange: 5.5, sortRank: 0, periodReturns: { '1M': -5.6, '6M': 17.5, '1Y': 34.8 },
      priceHistory: { '1W': [104.97, 107.6, 108.66, 109.28, 110.74], '1M': [117.36, 112.96, 112.02, 111.59, 112.97, 112.35, 112.9, 109.03, 109.58, 110.55, 111.93, 112.27, 112.4, 111.97, 111.51, 109.05, 104.97, 107.6, 108.66, 109.28, 110.74], '6M': [94.22, 92.35, 91.5, 93.13, 93.32, 94.37, 95.73, 96.48, 96.83, 100.2, 103.33, 105.73, 105.48, 103.82, 104.26, 102.76, 113.58, 117.44, 115.51, 113.92, 117.91, 112.02, 112.9, 112.27, 109.05, 110.74], '1Y': [82.15, 82.07, 82.61, 83.12, 80.93, 82.87, 87.03, 86.68, 91.62, 90.09, 87.85, 89.17, 87.41, 87.01, 88.26, 90.85, 93.55, 97.48, 95.72, 96.71, 97.36, 96.87, 97.11, 95.54, 95.48, 92.97, 92.9, 93.75, 91.99, 93.37, 91.31, 95.17, 93.54, 96.03, 96.89, 101.96, 103.33, 105.73, 105.48, 104.52, 103.94, 102.86, 114.9, 116.47, 115.52, 113.64, 117.91, 112.02, 112.9, 112.27, 109.05, 110.74] },
      velocityScore: { '1D': 39.8, '1W': -31.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$51B', pe: 28.2, revenueGrowth: 12, eps: 3.92, grossMargin: 47, dividendYield: 2.31,
      etfPresence: { POW: false, VOLT: 3.7, PBD: false, PBW: false },
      tonyNote: 'Entergy is a regulated utility operating in the Gulf Coast region, held in Electrification ETFs for income and load growth from industrial and data center customers. The dividend is well-covered and the rate base is growing as Louisiana and Texas attract manufacturing reshoring and technology infrastructure investment.',
    },
    {
      ticker: 'ET', name: 'ENERGY TRANSFER LP', easyScore: 1, avgWeight: 3.54, proScore: 1.18, coverage: 0.333,
      price: 19.39, weeklyPrices: [19.27, 19.54, 19.55, 19.62, 19.39], weeklyChange: 0.62, sortRank: 0, periodReturns: { '1M': -4.9, '6M': 15.4, '1Y': 8.1 },
      priceHistory: { '1W': [19.27, 19.54, 19.55, 19.62, 19.39], '1M': [20.39, 19.87, 19.92, 19.34, 19.61, 20.1, 20.36, 20.15, 20.19, 20.39, 20.16, 20.01, 20.07, 19.6, 19.33, 19.17, 19.27, 19.54, 19.55, 19.62, 19.39], '6M': [16.8, 16.56, 16.39, 16.27, 16.25, 17.4, 17.65, 18.24, 18.37, 18.21, 18.9, 18.69, 18.67, 18.75, 18.66, 19.14, 19.02, 19.09, 18.87, 19.15, 20.19, 19.92, 20.36, 20.01, 19.17, 19.39], '1Y': [17.93, 18.32, 17.64, 18.13, 17.8, 17.59, 17.24, 17.78, 17.79, 17.16, 17.34, 17.52, 17.7, 17.17, 17.58, 17.11, 17.2, 16.66, 16.52, 16.77, 16.91, 16.83, 16.69, 16.94, 16.49, 16.59, 16.8, 16.5, 16.3, 16.54, 16.52, 17.5, 18.11, 18.53, 18.19, 18.26, 18.9, 18.69, 18.67, 18.56, 18.96, 19.44, 18.93, 19.19, 18.86, 19.08, 20.19, 19.92, 20.36, 20.01, 19.17, 19.39] },
      velocityScore: { '1D': null, '1W': -31.4, '1M': null, '6M': null }, isNew: true,
      marketCap: '$67B', pe: 16.2, revenueGrowth: 32, eps: 1.2, grossMargin: 19, dividendYield: 6.88,
      etfPresence: { POW: false, VOLT: 3.54, PBD: false, PBW: false },
      tonyNote: 'Energy Transfer is a midstream pipeline MLP held in Electrification ETFs for its natural gas infrastructure exposure — power plants running on natural gas are a key bridge fuel for data center load growth in states where renewables cannot meet baseload demand. High dividend yield and steady fee-based revenue make it an income-oriented allocation.',
    },
    {
      ticker: 'MOD', name: 'MODINE MANUFACTURING CO', easyScore: 1, avgWeight: 3.4, proScore: 1.13, coverage: 0.333,
      price: 276.51, weeklyPrices: [288.52, 306.89, 302.03, 301.21, 276.51], weeklyChange: -4.16, sortRank: 0, periodReturns: { '1M': 1.8, '6M': 69.8, '1Y': 195.4 },
      priceHistory: { '1W': [288.52, 306.89, 302.03, 301.21, 276.51], '1M': [271.6, 274.22, 269.65, 273, 284.8, 279.2, 292.16, 271.26, 247.13, 244.49, 257.33, 250.11, 260.52, 295.88, 279.93, 278.91, 288.52, 306.89, 302.03, 301.21, 276.51], '6M': [162.87, 139.88, 136.16, 136.19, 129.97, 127.07, 143.68, 146.9, 199.53, 219.5, 218.54, 228.9, 204.77, 200.63, 200.42, 232.89, 222.97, 241.52, 235.25, 250.57, 254.63, 269.65, 292.16, 250.11, 278.91, 276.51], '1Y': [93.62, 93.72, 97.17, 98.5, 98.9, 90.02, 93.71, 105.51, 138.54, 134.06, 139.47, 138.12, 133.95, 138.52, 153.33, 146.14, 141.19, 153.92, 149.65, 157.73, 163.02, 152.93, 159.74, 128.49, 151.65, 160.45, 153.89, 142.27, 137.03, 135.15, 119.68, 125.05, 147.52, 176.72, 205.32, 215.45, 218.54, 228.9, 204.77, 191.93, 200.87, 215.81, 219.32, 241.46, 243.71, 251.7, 254.63, 269.65, 292.16, 250.11, 278.91, 276.51] },
      velocityScore: { '1D': 25.6, '1W': -33.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 121.8, revenueGrowth: 48, eps: 2.27, grossMargin: 23, dividendYield: null,
      etfPresence: { POW: false, VOLT: 3.4, PBD: false, PBW: false },
      tonyNote: 'Modine Manufacturing is a thermal management company — heat exchangers and liquid cooling systems for data centers and industrial applications. It holds a position in Industrials ETFs as a direct beneficiary of the AI server cooling challenge. Revenue grew materially as data center customers upgraded from air to liquid cooling; the growth runway remains substantial.',
    },
    {
      ticker: 'BLDP', name: 'Ballard Power Systems Inc', easyScore: 2, avgWeight: 1.68, proScore: 1.12, coverage: 0.667,
      price: 4.92, weeklyPrices: [6.30, 6.38, 6.06, 6.07, 4.92], weeklyChange: -21.9, sortRank: 0, periodReturns: { '1M': 13.6, '6M': 74.5, '1Y': 221.6 },
      priceHistory: { '1W': [6.3, 6.38, 6.06, 6.07, 4.92], '1M': [4.33, 4.78, 4.7, 4.13, 4.17, 4.14, 4.13, 4.45, 4.33, 4.18, 4.76, 5.43, 5.54, 5.94, 6.09, 6.29, 6.3, 6.38, 6.06, 6.07, 4.92], '6M': [2.82, 2.72, 2.61, 2.57, 2.79, 2.77, 2.61, 2.58, 2.22, 2.16, 2.12, 2.21, 2.1, 2.15, 2.61, 2.54, 2.41, 2.64, 2.9, 3.38, 3.4, 4.7, 4.13, 5.43, 6.29, 4.92], '1Y': [1.53, 1.64, 1.44, 1.59, 1.7, 1.87, 1.94, 2.04, 1.84, 1.8, 1.99, 2.01, 1.86, 1.89, 2.2, 2.92, 2.74, 3.65, 3.49, 3.64, 3.41, 3.56, 3.56, 2.91, 2.68, 2.71, 2.8, 2.63, 2.65, 2.54, 2.71, 2.75, 2.66, 2.49, 2.03, 2.07, 2.12, 2.21, 2.1, 2.42, 2.48, 2.45, 2.48, 2.81, 2.96, 3.28, 3.4, 4.7, 4.13, 5.43, 6.29, 4.92] },
      velocityScore: { '1D': 19.1, '1W': -34.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1B', pe: null, revenueGrowth: 26, eps: -0.27, grossMargin: 11, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: 1.13, PBW: 2.22 },
      tonyNote: 'Ballard Power Systems is a hydrogen fuel cell technology company. It appears in Electrification ETFs as a long-duration bet on hydrogen as a zero-carbon fuel for heavy industry and transit. Revenue is small, the company is pre-profitability, and the weight is minimal — this is a thematic placeholder allocation, not a fundamental position.',
    },
    {
      ticker: 'HUBB', name: 'HUBBELL INC', easyScore: 1, avgWeight: 3.35, proScore: 1.12, coverage: 0.333,
      price: 476.82, weeklyPrices: [462.93, 480.46, 484.91, 485.27, 476.82], weeklyChange: 3, sortRank: 0, periodReturns: { '1M': -6.1, '6M': 8.2, '1Y': 20.6 },
      priceHistory: { '1W': [462.93, 480.46, 484.91, 485.27, 476.82], '1M': [507.81, 502.34, 493.04, 492.58, 490.16, 483.79, 482.03, 479.97, 470.87, 461.5, 463.32, 460.98, 475.01, 478.05, 484.25, 473.61, 462.93, 480.46, 484.91, 485.27, 476.82], '6M': [440.53, 448, 442.51, 451.39, 477.46, 481.68, 482.5, 485.73, 487.16, 516.03, 526.56, 524.19, 476.51, 477.97, 477.47, 503.2, 500.38, 534.67, 521.71, 557.85, 508.17, 493.04, 482.03, 460.98, 473.61, 476.82], '1Y': [395.28, 382.03, 394.69, 408.41, 412.5, 414.86, 422.27, 438.31, 429.06, 417.54, 432.22, 437.56, 430.15, 437.24, 435.44, 435.23, 426.44, 413.05, 418.72, 431.65, 433.98, 467.61, 462.28, 420.57, 424.08, 427.48, 441.51, 444.84, 451.03, 446.61, 468.2, 476.06, 484.06, 497.97, 487.4, 516.02, 526.56, 524.19, 476.51, 468.41, 492.65, 481.67, 494.25, 536.01, 535.57, 553.07, 508.17, 493.04, 482.03, 460.98, 473.61, 476.82] },
      velocityScore: { '1D': -26.8, '1W': -47.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 28.2, revenueGrowth: 11, eps: 16.93, grossMargin: 36, dividendYield: 1.19,
      etfPresence: { POW: false, VOLT: 3.35, PBD: false, PBW: false },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'NI', name: 'NISOURCE INC', easyScore: 1, avgWeight: 3.3, proScore: 1.1, coverage: 0.333,
      price: 46.61, weeklyPrices: [45.10, 45.86, 45.53, 45.85, 46.61], weeklyChange: 3.35, sortRank: 0, periodReturns: { '1M': -3.3, '6M': 11, '1Y': 18.7 },
      priceHistory: { '1W': [45.1, 45.86, 45.53, 45.85, 46.61], '1M': [48.19, 47.51, 47.02, 46.72, 47.03, 47.05, 47.42, 46.3, 46.55, 47.42, 47.02, 47.71, 47.85, 47.8, 47.47, 46.22, 45.1, 45.86, 45.53, 45.85, 46.61], '6M': [42, 41.41, 40.97, 41.93, 41.88, 42.45, 43.79, 44.33, 44.03, 44.66, 45.82, 46.7, 47.04, 46.26, 46.62, 45.68, 46.9, 48.47, 47.72, 48.29, 48.28, 47.02, 47.42, 47.71, 46.22, 46.61], '1Y': [39.28, 39.52, 40.51, 40.34, 39, 39.87, 41.72, 41.27, 43.33, 42.15, 41.71, 42.67, 42.11, 40.49, 39.37, 41.57, 43.21, 44.17, 42.73, 43.85, 43.73, 42.58, 43.72, 43.18, 43.41, 42.26, 41.32, 41.83, 41.45, 42.05, 41.54, 43.31, 43.52, 44.65, 43.93, 45.18, 45.82, 46.7, 47.04, 46.69, 46.69, 45.44, 47.49, 48.05, 48.31, 47.99, 48.28, 47.02, 47.42, 47.71, 46.22, 46.61] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$22B', pe: 23.2, revenueGrowth: 8, eps: 2.01, grossMargin: 51, dividendYield: 2.57,
      etfPresence: { POW: false, VOLT: 3.3, PBD: false, PBW: false },
      tonyNote: 'NISOURCE INC appears in 1 of 3 Electrification ETFs (33% coverage) with average weight 3.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IDA', name: 'IDACORP INC', easyScore: 1, avgWeight: 3.28, proScore: 1.09, coverage: 0.333,
      price: 141.34, weeklyPrices: [135.01, 136.44, 136.68, 138.61, 141.34], weeklyChange: 4.69, sortRank: 0, periodReturns: { '1M': -2.5, '6M': 11.5, '1Y': 22.8 },
      priceHistory: { '1W': [135.01, 136.44, 136.68, 138.61, 141.34], '1M': [145.02, 144.08, 143.17, 144, 145.41, 142.3, 142.49, 139.96, 140.71, 141.95, 141.55, 141.6, 142, 142.65, 143.74, 140.27, 135.01, 136.44, 136.68, 138.61, 141.34], '6M': [126.81, 125.86, 125.82, 127.68, 129.12, 130.06, 134, 132.35, 134.03, 137.7, 138.3, 143.85, 142.07, 140.57, 139.83, 138.56, 143.81, 148.4, 148.08, 148.82, 147.74, 143.17, 142.49, 141.6, 140.27, 141.34], '1Y': [115.14, 113.95, 115.69, 115.45, 115.78, 117.9, 121.22, 120.67, 126.38, 124.34, 124.55, 126.96, 124.64, 124.52, 124.54, 127.79, 130.7, 133.7, 133.96, 137.7, 136.55, 129.62, 128.8, 127.83, 129.05, 128.35, 124.73, 126.47, 126.58, 127.44, 126.43, 132.22, 133.7, 132.23, 135.4, 141.39, 138.3, 143.85, 142.07, 141, 139.71, 139.58, 144.27, 147.53, 147.96, 146.06, 147.74, 143.17, 142.49, 141.6, 140.27, 141.34] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$8B', pe: 23.5, revenueGrowth: -7, eps: 6.01, grossMargin: 38, dividendYield: 2.48,
      etfPresence: { POW: false, VOLT: 3.28, PBD: false, PBW: false },
      tonyNote: 'IDACORP INC appears in 1 of 3 Electrification ETFs (33% coverage) with average weight 3.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NVTS', name: 'Navitas Semiconductor Corp', easyScore: 1, avgWeight: 3.17, proScore: 1.06, coverage: 0.333,
      price: 25.08, weeklyPrices: [24.86, 25.86, 30.84, 30.67, 25.08], weeklyChange: 0.88, sortRank: 0, periodReturns: { '1M': 42.9, '6M': 164.6, '1Y': 305.8 },
      priceHistory: { '1W': [24.86, 25.86, 30.84, 30.67, 25.08], '1M': [17.55, 16.68, 15.79, 18.2, 22.65, 21.17, 22.32, 21.32, 19.67, 19.43, 22.99, 24.38, 29.25, 31.79, 28.88, 26.6, 24.86, 25.86, 30.84, 30.67, 25.08], '6M': [9.48, 8.59, 7.81, 7.21, 10.19, 9.45, 9.76, 10.19, 8.2, 8.76, 8.08, 9.51, 8.96, 10.84, 9.06, 9.48, 8.54, 9.42, 12.37, 18.51, 16.5, 15.79, 22.32, 24.38, 26.6, 25.08], '1Y': [6.18, 7.32, 6.52, 6.55, 6.58, 6.23, 8.47, 8.56, 8.05, 6.6, 6.77, 6.2, 5.76, 5.76, 5.89, 6.88, 7.19, 8.13, 9.97, 17.1, 13.91, 12.25, 9.6, 7.73, 8.29, 8.32, 9.6, 7.96, 7.9, 7.24, 10.31, 10.04, 11.29, 9.46, 7.43, 8.37, 8.08, 9.51, 8.96, 9.98, 9.17, 9.02, 8.8, 9.54, 12.32, 17.28, 16.5, 15.79, 22.32, 24.38, 26.6, 25.08] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$6B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 3.17 },
      tonyNote: 'Navitas Semiconductor is a small-cap wide-bandgap power semiconductor name — gallium nitride and silicon carbide for fast charging and EV applications. The $26.60 share price and small market cap position it as a speculative holding in ETFs willing to take higher-risk bets on next-generation power conversion.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 5.67, proScore: 2.27, coverage: 0.4,
      price: 882.43, weeklyPrices: [845.39, 875.52, 957.03, 993.74, 882.43], weeklyChange: 4.38, sortRank: 0, periodReturns: { '1M': 9.5, '6M': 171.4, '1Y': 328.4 },
      priceHistory: { '1W': [845.39, 875.52, 957.03, 993.74, 882.43], '1M': [806, 886.22, 811.41, 844.8, 868.18, 854.28, 889.03, 848.84, 770.76, 728.29, 752, 733.77, 732.94, 783.53, 782.12, 860.84, 845.39, 875.52, 957.03, 993.74, 882.43], '6M': [325.1, 315.15, 308.58, 310.79, 317.41, 321.6, 362.53, 373.52, 360.16, 433.91, 415.13, 433.34, 398.87, 420.6, 421.23, 452.92, 421.29, 435.65, 441.1, 495.67, 515.62, 811.41, 889.03, 733.77, 860.84, 882.43], '1Y': [205.99, 202.99, 222.5, 230.73, 227.02, 238.4, 247.65, 263.59, 271.74, 289.86, 283.2, 286.49, 276.91, 286.69, 319.38, 371.84, 341.1, 352.78, 355.27, 369.01, 376.74, 392.77, 384.45, 332.82, 342.44, 327.78, 324.62, 319.12, 313.04, 307.68, 312.24, 319.27, 364.25, 379.23, 365.07, 431.43, 415.13, 433.34, 398.87, 404.59, 431.78, 415.93, 416.34, 446.36, 463.65, 497.18, 515.62, 811.41, 889.03, 733.77, 860.84, 882.43] },
      velocityScore: { '1D': -7.3, '1W': -33.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 78.7, revenueGrowth: 92, eps: 11.21, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 6.57, PRN: 4.77, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 5.28, proScore: 2.11, coverage: 0.4,
      price: 284.87, weeklyPrices: [288.12, 299.07, 299.73, 300.06, 284.87], weeklyChange: -1.13, sortRank: 0, periodReturns: { '1M': -3.3, '6M': 149.8, '1Y': 347.5 },
      priceHistory: { '1W': [288.12, 299.07, 299.73, 300.06, 284.87], '1M': [294.69, 320.3, 305.93, 309.39, 322.05, 300.84, 296.98, 292.65, 266.8, 261.58, 271.05, 270.75, 279.22, 291.97, 295.94, 284.42, 288.12, 299.07, 299.73, 300.06, 284.87], '6M': [114.04, 112.36, 110.97, 111.96, 120, 133.04, 140.62, 147.81, 175.77, 197.45, 178.79, 176.96, 167.67, 171.73, 167.41, 194.85, 184.68, 230.81, 232.81, 252.18, 277.27, 305.93, 296.98, 270.75, 284.42, 284.87], '1Y': [63.66, 62.62, 60.17, 70.15, 72.14, 70.37, 73.64, 80.8, 76.72, 88.28, 86.57, 86.12, 87.92, 92.3, 99.41, 97.41, 101.01, 103.9, 105.33, 116.4, 124.71, 130.23, 124.62, 105.94, 100.03, 107.5, 114.29, 109.31, 112.18, 109.16, 118.62, 133.76, 142.29, 152.31, 179.6, 197.63, 178.79, 176.96, 167.67, 171.19, 175.13, 174.8, 182.6, 230.94, 241.01, 252.76, 277.27, 305.93, 296.98, 270.75, 284.42, 284.87] },
      velocityScore: { '1D': -19.5, '1W': -36.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 55.5, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { AIRR: 2.57, PRN: false, RSHO: 7.98, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.11, proScore: 2.04, coverage: 0.4,
      price: 904.28, weeklyPrices: [865.36, 909.81, 926.18, 940.48, 904.28], weeklyChange: 4.5, sortRank: 0, periodReturns: { '1M': 0, '6M': 49.9, '1Y': 155.9 },
      priceHistory: { '1W': [865.36, 909.81, 926.18, 940.48, 904.28], '1M': [904.59, 926.93, 895.69, 897.45, 926.79, 902.3, 920.22, 888.31, 863.95, 860.15, 872.56, 865.95, 879.89, 908.55, 909.93, 875.87, 865.36, 909.81, 926.18, 940.48, 904.28], '6M': [603.17, 597.89, 576.22, 578.61, 623.09, 636.53, 645.38, 643.28, 691.82, 775, 760.53, 752.93, 706.08, 707.59, 693.62, 719.04, 730.32, 787.07, 772.66, 835.24, 890.11, 895.69, 920.22, 865.95, 875.87, 904.28], '1Y': [353.35, 357.05, 366.23, 388.21, 394.29, 404.64, 410.07, 432.94, 433.7, 408.54, 412.64, 432.3, 416.05, 418.09, 440.67, 471.26, 471.61, 495.38, 504.76, 531.18, 527.07, 570.59, 570.85, 552.05, 559.6, 582.47, 596.5, 589.76, 582.41, 577.39, 596.52, 638.75, 648.41, 665.24, 678.31, 758.29, 760.53, 752.93, 706.08, 700.69, 688.65, 703.19, 717.22, 790.66, 794.65, 830.79, 890.11, 895.69, 920.22, 865.95, 875.87, 904.28] },
      velocityScore: { '1D': 1.5, '1W': -34, '1M': null, '6M': null }, isNew: false,
      marketCap: '$417B', pe: 45, revenueGrowth: 22, eps: 20.08, grossMargin: 29, dividendYield: 0.67,
      etfPresence: { AIRR: false, PRN: 3.38, RSHO: 6.83, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.55, proScore: 1.82, coverage: 0.4,
      price: 1843.94, weeklyPrices: [1787.88, 1883.26, 1850.04, 1914.65, 1843.94], weeklyChange: 3.14, sortRank: 0, periodReturns: { '1M': -6.3, '6M': 84.1, '1Y': 261.2 },
      priceHistory: { '1W': [1787.88, 1883.26, 1850.04, 1914.65, 1843.94], '1M': [1967.24, 2011.49, 1942.02, 1952.37, 2032.98, 2034.63, 2042.36, 1992.74, 1854.43, 1825.5, 1835.51, 1835.33, 1828.25, 1883.56, 1867.09, 1828.21, 1787.88, 1883.26, 1850.04, 1914.65, 1843.94], '6M': [1001.48, 967.95, 940.74, 950.67, 1035.11, 1073.14, 1148, 1169.05, 1119.81, 1338.65, 1373.52, 1438.23, 1348.22, 1407.32, 1423, 1470.64, 1428.52, 1574.45, 1605.97, 1773.91, 1840.25, 1942.02, 2042.36, 1835.33, 1828.21, 1843.94], '1Y': [510.52, 492.72, 502.98, 536.21, 527.42, 539.02, 544.95, 692.97, 699.16, 693.31, 695.76, 691.18, 698.61, 709.53, 777.18, 804.24, 801.8, 825.42, 845.99, 836.75, 976.45, 977.67, 974.14, 919.82, 945.07, 935.78, 989.48, 968.48, 950.79, 946.93, 1035.12, 1053.1, 1131.7, 1171.46, 1147.97, 1300.02, 1373.52, 1438.23, 1348.22, 1373.76, 1444.6, 1358.66, 1417.19, 1592.84, 1650.47, 1726.12, 1840.25, 1942.02, 2042.36, 1835.33, 1828.21, 1843.94] },
      velocityScore: { '1D': 0.6, '1W': -34.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$65B', pe: 53.2, revenueGrowth: 1, eps: 34.67, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: 4.28, PRN: 4.82, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, avgWeight: 4.49, proScore: 1.8, coverage: 0.4,
      price: 694.72, weeklyPrices: [646.89, 663.14, 686.37, 689.43, 694.72], weeklyChange: 7.39, sortRank: 0, periodReturns: { '1M': -3.5, '6M': 121.5, '1Y': 185.8 },
      priceHistory: { '1W': [646.89, 663.14, 686.37, 689.43, 694.72], '1M': [720, 727.54, 690, 680.26, 683.52, 719.92, 740.91, 722.31, 664.76, 639.58, 630.5, 644.64, 656.35, 670.66, 673.51, 667.02, 646.89, 663.14, 686.37, 689.43, 694.72], '6M': [313.7, 319.91, 325.59, 320.73, 330.42, 314.09, 397.42, 358.87, 354.14, 422.5, 432.18, 452.53, 430.25, 472.86, 469.81, 437.48, 571.38, 609.29, 601.83, 656.79, 669.98, 690, 740.91, 644.64, 667.02, 694.72], '1Y': [243.11, 218.17, 208.55, 220.48, 202.53, 222.2, 207.07, 236.89, 223.41, 228.08, 225.32, 226.88, 224.09, 217.41, 238.22, 266.64, 271.07, 263.53, 294.72, 290.27, 294.99, 310.41, 335.96, 346.35, 371.95, 357.48, 319.31, 317.58, 337.9, 315.44, 337.03, 317.76, 380.36, 355.51, 345.97, 413.65, 432.18, 452.53, 430.25, 459.3, 479.9, 410.85, 575.16, 603.84, 597.88, 652.99, 669.98, 690, 740.91, 644.64, 667.02, 694.72] },
      velocityScore: { '1D': 5.3, '1W': -31.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 61, revenueGrowth: 50, eps: 11.39, grossMargin: 21, dividendYield: 0.29,
      etfPresence: { AIRR: 4.28, PRN: 4.7, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Argan Inc is an engineering and construction company for power generation facilities — natural gas and renewable power plants. It appears in Industrials ETFs because power plant construction is one of the fastest-growing categories in U.S. infrastructure spending, driven by data center load additions that the grid cannot currently support.',
    },
    {
      ticker: 'TKR', name: 'Timken Company', easyScore: 1, avgWeight: 8.96, proScore: 1.79, coverage: 0.2,
      price: 131.83, weeklyPrices: [126.54, 131.90, 131.82, 133.66, 131.83], weeklyChange: 4.18, sortRank: 0, periodReturns: { '1M': 20.2, '6M': 58.4, '1Y': 83.6 },
      priceHistory: { '1W': [126.54, 131.9, 131.82, 133.66, 131.83], '1M': [109.63, 119.7, 116.34, 117.97, 117.39, 115.74, 116.74, 114.49, 112.73, 109.36, 117.2, 118.93, 119.95, 127.42, 127.16, 127.98, 126.54, 131.9, 131.82, 133.66, 131.83], '6M': [83.21, 87.38, 85.26, 86.33, 90.95, 91.68, 93.89, 93.4, 98.99, 108.82, 107.11, 109.88, 103.05, 103.33, 98.23, 101.9, 102.06, 106.92, 103.92, 108.7, 110.89, 116.34, 116.74, 118.93, 127.98, 131.83], '1Y': [71.79, 70.68, 71.18, 72.55, 76.94, 76.33, 78.63, 81.69, 73.94, 74.15, 76.69, 79.25, 76.49, 76.14, 77.91, 76.75, 75.23, 76.76, 72.55, 75.1, 77.3, 77.95, 78.9, 74.42, 79.9, 79.82, 83.44, 87.01, 86.34, 85.81, 88.05, 91.91, 94.6, 94.15, 102.15, 107.35, 107.11, 109.88, 103.05, 99.7, 97.44, 99.06, 98.92, 106.75, 107.66, 107.2, 110.89, 116.34, 116.74, 118.93, 127.98, 131.83] },
      velocityScore: { '1D': -0.6, '1W': -54.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 30, revenueGrowth: 8, eps: 4.4, grossMargin: 31, dividendYield: 1.09,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.96, IDEF: false, BILT: false },
      tonyNote: 'Timken Company appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 9.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 7.51, proScore: 1.5, coverage: 0.2,
      price: 180.99, weeklyPrices: [174.41, 174.26, 172.55, 179.41, 180.99], weeklyChange: 3.77, sortRank: 0, periodReturns: { '1M': 4.7, '6M': 5.8, '1Y': 30.1 },
      priceHistory: { '1W': [174.41, 174.26, 172.55, 179.41, 180.99], '1M': [172.87, 176.74, 176.78, 176.09, 178.61, 178.11, 175.68, 171.18, 175.95, 174.49, 174.85, 175.98, 177.01, 178.97, 176.59, 179.66, 174.41, 174.26, 172.55, 179.41, 180.99], '6M': [171.1, 178.66, 182.01, 184.42, 190.4, 194.08, 197.5, 199.46, 196.74, 196.51, 205.41, 197.63, 203.86, 207.26, 204.56, 195, 194.72, 203.19, 195.85, 179.3, 176.07, 176.78, 175.68, 175.98, 179.66, 180.99], '1Y': [139.1, 145.69, 145.81, 146.02, 144.91, 148.68, 151.56, 156.07, 157.38, 154.8, 155.5, 156.27, 158.01, 151.75, 158.58, 160.54, 163.63, 168.8, 158.85, 160.71, 179.24, 177.04, 179.03, 175.63, 173.21, 168.8, 171.52, 182.11, 185.68, 184.01, 185.73, 198.84, 196.34, 199.88, 195.97, 201.14, 205.41, 197.63, 203.86, 203.04, 200.73, 192.85, 196.21, 201.56, 196.42, 174.26, 176.07, 176.78, 175.68, 175.98, 179.66, 180.99] },
      velocityScore: { '1D': 0, '1W': -52.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$244B', pe: 34, revenueGrowth: 9, eps: 5.32, grossMargin: 20, dividendYield: 1.53,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 7.51, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 7.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CGNX', name: 'Cognex Corporation', easyScore: 1, avgWeight: 7.27, proScore: 1.45, coverage: 0.2,
      price: 60.82, weeklyPrices: [64.64, 66.08, 66.06, 64.67, 60.82], weeklyChange: -5.91, sortRank: 0, periodReturns: { '1M': 3.4, '6M': 58.3, '1Y': 100.9 },
      priceHistory: { '1W': [64.64, 66.08, 66.06, 64.67, 60.82], '1M': [58.83, 62.26, 65.92, 65.66, 67.26, 63.64, 66.09, 64.26, 61.91, 60.65, 63.37, 64.27, 66.09, 68.33, 66.7, 65.85, 64.64, 66.08, 66.06, 64.67, 60.82], '6M': [38.42, 35.65, 36.8, 36.47, 38.6, 39.63, 40.41, 39.05, 40.73, 43.03, 55.94, 55.36, 51.25, 50.99, 49.87, 51.61, 49.34, 53.91, 54.97, 54.1, 55.51, 65.92, 66.09, 64.27, 65.85, 60.82], '1Y': [30.28, 30.15, 29.83, 31.72, 33.13, 33.22, 33.73, 34.63, 41.43, 40.47, 43.01, 44.02, 44.27, 44.36, 44.24, 46.43, 45.55, 46.87, 43.74, 47.31, 48.28, 41.7, 38.58, 35.98, 37.12, 38.19, 38.42, 34.8, 36.58, 36.37, 37.93, 40.06, 41.71, 39.09, 39.49, 58.67, 55.94, 55.36, 51.25, 48.77, 50.25, 49.33, 49.17, 53.41, 55.5, 54.26, 55.51, 65.92, 66.09, 64.27, 65.85, 60.82] },
      velocityScore: { '1D': -4, '1W': -57.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 71.6, revenueGrowth: 24, eps: 0.85, grossMargin: 68, dividendYield: 0.55,
      etfPresence: { AIRR: false, PRN: false, RSHO: 7.27, IDEF: false, BILT: false },
      tonyNote: 'Cognex Corporation appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 7.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.4, proScore: 1.36, coverage: 0.4,
      price: 315.29, weeklyPrices: [300.98, 308.31, 313.39, 313.67, 315.29], weeklyChange: 4.75, sortRank: 0, periodReturns: { '1M': 3.2, '6M': 22.2, '1Y': 36 },
      priceHistory: { '1W': [300.98, 308.31, 313.39, 313.67, 315.29], '1M': [305.48, 315.39, 310.37, 308.87, 310.55, 310.87, 315.72, 307.17, 305.22, 302.64, 306.25, 305.66, 307.1, 311.33, 312.65, 303.81, 300.98, 308.31, 313.39, 313.67, 315.29], '6M': [257.91, 261.74, 262.41, 263.4, 265.39, 278.77, 284, 256.26, 289.94, 290.31, 281.13, 283.5, 274.97, 270.13, 258.51, 266, 269.36, 286.41, 284.39, 294.4, 305.75, 310.37, 315.72, 305.66, 303.81, 315.29], '1Y': [231.83, 225.66, 231.96, 232.45, 247.66, 254.41, 260.2, 274.69, 267.16, 262.51, 262.36, 264.21, 263.15, 261.61, 262.58, 264.9, 258.44, 259.04, 246.74, 249.57, 260, 253.33, 259.74, 240.63, 249.05, 257.32, 257.25, 259.81, 263.48, 261.16, 260.8, 277.62, 282.33, 259.51, 287.03, 279.03, 281.13, 283.5, 274.97, 259.88, 256.58, 260.51, 267.12, 289.01, 291.03, 293.35, 305.75, 310.37, 315.72, 305.66, 303.81, 315.29] },
      velocityScore: { '1D': 1.5, '1W': -36.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 29.8, revenueGrowth: 7, eps: 10.59, grossMargin: 30, dividendYield: 0.65,
      etfPresence: { AIRR: 1.75, PRN: false, RSHO: 5.04, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LMT', name: 'LOCKHEED MARTIN CORP', easyScore: 1, avgWeight: 6.56, proScore: 1.31, coverage: 0.2,
      price: 523.76, weeklyPrices: [516.50, 513.43, 512.03, 519.05, 523.76], weeklyChange: 1.41, sortRank: 0, periodReturns: { '1M': 2.9, '6M': 15.8, '1Y': 8.7 },
      priceHistory: { '1W': [516.5, 513.43, 512.03, 519.05, 523.76], '1M': [508.93, 514.26, 512.41, 506.51, 512.25, 519.94, 520.41, 516.01, 528.31, 526.63, 522.59, 522.79, 533.24, 532.9, 531.14, 530.45, 516.5, 513.43, 512.03, 519.05, 523.76], '6M': [452.2, 480.25, 474.13, 488.87, 522.04, 558.3, 586.23, 597.27, 602.76, 628.7, 666.51, 641.63, 655, 649.47, 642.28, 624.2, 617.64, 623.87, 607.49, 529.79, 517.97, 512.41, 520.41, 522.79, 530.45, 523.76], '1Y': [481.69, 486.45, 472.46, 463.14, 463.01, 470.12, 460.53, 421.34, 423.7, 426.26, 440.64, 447.72, 452.5, 457.06, 474.32, 486.67, 491.98, 514.24, 503.83, 505.9, 486.91, 487.94, 452.1, 470.78, 451.06, 441.82, 465.38, 484.42, 483.57, 488, 496.87, 572.7, 593.91, 622.51, 609.18, 637.43, 666.51, 641.63, 655, 652.83, 637.51, 627.33, 622.79, 613.72, 592.19, 513.45, 517.97, 512.41, 520.41, 522.79, 530.45, 523.76] },
      velocityScore: { '1D': 0, '1W': -52.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$121B', pe: 25.4, revenueGrowth: 0, eps: 20.64, grossMargin: 10, dividendYield: 2.63,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 6.56, BILT: false },
      tonyNote: 'LOCKHEED MARTIN CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 6.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETN', name: 'ETN', easyScore: 1, avgWeight: 5.77, proScore: 1.15, coverage: 0.2,
      price: 395.94, weeklyPrices: [400.08, 417.62, 421.21, 418.61, 395.94], weeklyChange: -1.03, sortRank: 0, periodReturns: { '1M': -3.6, '6M': 17.3, '1Y': 19.5 },
      priceHistory: { '1W': [400.08, 417.62, 421.21, 418.61, 395.94], '1M': [410.86, 421.39, 399.15, 401.51, 419, 406.94, 408.1, 399.44, 381.87, 371.88, 379.69, 381.51, 391.35, 403.13, 406.37, 400.6, 400.08, 417.62, 421.21, 418.61, 395.94], '6M': [337.66, 331.98, 317.8, 321.45, 332.97, 332.38, 337.96, 347.32, 365, 396.09, 377.32, 374.59, 354.79, 355.79, 360.54, 375, 365.56, 400.44, 392.73, 424.5, 433.01, 399.15, 408.1, 381.51, 400.6, 395.94], '1Y': [331.45, 323.66, 332.95, 356.99, 356.98, 362.11, 373.66, 392.76, 384.76, 360.11, 353.5, 345.76, 343.75, 348.23, 371.19, 368.52, 367.15, 380.02, 375.37, 377.69, 379.74, 386.57, 379.57, 342.75, 330.43, 333.11, 343.39, 333.21, 320.39, 320.86, 322.67, 331.14, 334.04, 354.37, 354.67, 390.33, 377.32, 374.59, 354.79, 348.64, 360.23, 357.1, 361.1, 403, 406.21, 423.92, 433.01, 399.15, 408.1, 381.51, 400.6, 395.94] },
      velocityScore: { '1D': -1.7, '1W': -54.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$154B', pe: 38.7, revenueGrowth: 17, eps: 10.22, grossMargin: 37, dividendYield: 1.11,
      etfPresence: { AIRR: false, PRN: false, RSHO: 5.77, IDEF: false, BILT: false },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.81, proScore: 1.13, coverage: 0.4,
      price: 227.8, weeklyPrices: [220.92, 230.08, 234.08, 236.14, 227.80], weeklyChange: 3.11, sortRank: 0, periodReturns: { '1M': 9.6, '6M': 9.2, '1Y': 44.5 },
      priceHistory: { '1W': [220.92, 230.08, 234.08, 236.14, 227.8], '1M': [207.81, 212.74, 205.27, 202.84, 203.24, 203.79, 203.5, 200.99, 200.47, 195.79, 205.55, 205.39, 207.8, 219.08, 215.34, 216.66, 220.92, 230.08, 234.08, 236.14, 227.8], '6M': [208.67, 219.94, 203.17, 205.66, 208.63, 211.07, 220.86, 211.34, 212.76, 233.46, 241.01, 231.59, 211.9, 210.15, 202.46, 201.27, 203.16, 215.54, 215.27, 223.96, 218.91, 205.27, 203.5, 205.39, 216.66, 227.8], '1Y': [157.7, 154.45, 158, 167.68, 170.53, 170.82, 174.44, 180.42, 200.98, 200.51, 187.85, 188.95, 184.11, 186.04, 185.77, 187.6, 184.24, 190.89, 180.71, 184.97, 195.85, 215.13, 224.93, 207.28, 211.97, 209.18, 206.16, 218.13, 207.18, 203.51, 208, 209.78, 217.13, 211.84, 218.02, 230.92, 241.01, 231.59, 211.9, 202.65, 202.36, 200.45, 197.29, 215.97, 223.52, 222.82, 218.91, 205.27, 203.5, 205.39, 216.66, 227.8] },
      velocityScore: { '1D': -22.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 43.5, revenueGrowth: 17, eps: 5.24, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.63, PRN: false, RSHO: 4, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TTMI', name: 'TTM Technologies Inc', easyScore: 1, avgWeight: 5.5, proScore: 1.1, coverage: 0.2,
      price: 167.62, weeklyPrices: [172.44, 179.62, 189.60, 184.84, 167.62], weeklyChange: -2.8, sortRank: 0, periodReturns: { '1M': 5, '6M': 127.3, '1Y': 404.6 },
      priceHistory: { '1W': [172.44, 179.62, 189.6, 184.84, 167.62], '1M': [159.58, 164.64, 153.77, 157.31, 162.99, 168.82, 171.87, 167.35, 158.86, 161.41, 169.36, 174.55, 189.92, 196.95, 190.67, 173.72, 172.44, 179.62, 189.6, 184.84, 167.62], '6M': [73.74, 73.43, 70.38, 71.21, 70.45, 93.24, 99.87, 97.99, 96.22, 91.9, 100.39, 107.56, 98.95, 95.44, 95.31, 108, 97.08, 107.53, 116.93, 132.98, 158.22, 153.77, 171.87, 174.55, 173.72, 167.62], '1Y': [33.22, 35.38, 36.95, 40.82, 42.63, 45.79, 47.47, 45.95, 44.83, 44.61, 41.82, 44.09, 44.96, 47.6, 50.27, 56.54, 57.75, 59.88, 55.53, 57.95, 58.9, 69.87, 69.89, 64.34, 64.94, 66.75, 75.43, 72.05, 70.9, 70.42, 70.18, 96.52, 97.53, 96.48, 92.58, 92.33, 100.39, 107.56, 98.95, 90.54, 97.08, 95.93, 97.48, 121.49, 126.24, 149.01, 158.22, 153.77, 171.87, 174.55, 173.72, 167.62] },
      velocityScore: { '1D': -4.3, '1W': -54.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$17B', pe: 91.1, revenueGrowth: 30, eps: 1.84, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 5.5, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'TTM Technologies is a printed circuit board manufacturer held in Industrials ETFs. Revenue growth tracks data center and defense electronics demand. PCB manufacturing is essential hardware infrastructure; TTM\'s position in AI server and high-frequency trading hardware gives it exposure to two durable growth verticals.',
    },
    {
      ticker: 'UNP', name: 'UNION PACIFIC CORP', easyScore: 1, avgWeight: 5.52, proScore: 1.1, coverage: 0.2,
      price: 272.32, weeklyPrices: [263.50, 264.68, 262.13, 263.90, 272.32], weeklyChange: 3.35, sortRank: 0, periodReturns: { '1M': 3.1, '6M': 15.7, '1Y': 21.9 },
      priceHistory: { '1W': [263.5, 264.68, 262.13, 263.9, 272.32], '1M': [264.01, 268.23, 264.89, 264.65, 263.35, 264.65, 269.34, 270.56, 275.13, 271.56, 265.8, 265.44, 265.88, 271.1, 279.39, 262.64, 263.5, 264.68, 262.13, 263.9, 272.32], '6M': [235.31, 239.95, 234.23, 234.53, 233.62, 229.29, 229.39, 227.71, 249.76, 262.81, 262.97, 265.45, 260.2, 251.11, 236.57, 241.33, 243.12, 251.15, 251.07, 271.26, 269.48, 264.89, 269.34, 265.44, 262.64, 272.32], '1Y': [223.43, 223.37, 225.88, 230.08, 236.54, 231.14, 225.85, 229.24, 222.06, 219.65, 220.08, 223.32, 221.99, 216.05, 216, 227.98, 236.18, 237.41, 225.85, 227.3, 218.23, 218.82, 223.88, 221, 224.5, 232.24, 235.44, 240.47, 234.61, 233.06, 224.48, 227.14, 231.37, 233.58, 251.45, 261.77, 262.97, 265.45, 260.2, 244.1, 234.18, 239.19, 244.71, 250.51, 251.14, 268.7, 269.48, 264.89, 269.34, 265.44, 262.64, 272.32] },
      velocityScore: { '1D': 0, '1W': -55.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$162B', pe: 22.4, revenueGrowth: 3, eps: 12.15, grossMargin: 57, dividendYield: 2.03,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: false, BILT: 5.52 },
      tonyNote: 'UNION PACIFIC CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 5.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GD', name: 'GENERAL DYNAMICS CORP', easyScore: 1, avgWeight: 5.43, proScore: 1.09, coverage: 0.2,
      price: 346.44, weeklyPrices: [339.20, 337.61, 337.04, 341.50, 346.44], weeklyChange: 2.13, sortRank: 0, periodReturns: { '1M': -0.8, '6M': 2.7, '1Y': 25.3 },
      priceHistory: { '1W': [339.2, 337.61, 337.04, 341.5, 346.44], '1M': [349.16, 347.27, 347.76, 346.53, 344.03, 341.36, 340.62, 334.5, 343.11, 340.14, 339.75, 338.71, 342.89, 344.64, 342.69, 346.82, 339.2, 337.61, 337.04, 341.5, 346.44], '6M': [337.31, 337.49, 339.36, 340.48, 360.71, 363.3, 364.78, 356.68, 353.37, 346.34, 354.34, 350.72, 360.7, 353.85, 353.36, 352.5, 350.53, 343.9, 334.92, 318.71, 344.3, 347.76, 340.62, 338.71, 346.82, 346.44], '1Y': [276.48, 283, 282.32, 291.66, 296.65, 300.85, 297.05, 313.1, 312.78, 314.93, 313.58, 319.89, 324.39, 321.33, 326.4, 323.2, 332.17, 346.5, 334.39, 337.19, 353.77, 341.87, 349.49, 341.78, 338.13, 335.8, 336.01, 340.69, 345.19, 339.47, 345.64, 366, 365.83, 349.95, 352.05, 340.75, 354.34, 350.72, 360.7, 355.23, 349.63, 355.28, 349.09, 335.15, 336.29, 313.21, 344.3, 347.76, 340.62, 338.71, 346.82, 346.44] },
      velocityScore: { '1D': 0, '1W': -52.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$94B', pe: 21.8, revenueGrowth: 10, eps: 15.9, grossMargin: 15, dividendYield: 1.84,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 5.43, BILT: false },
      tonyNote: 'GENERAL DYNAMICS CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 5.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GTES', name: 'Gates Industrial', easyScore: 1, avgWeight: 5.4, proScore: 1.08, coverage: 0.2,
      price: 25.63, weeklyPrices: [25.85, 26.51, 26.03, 26.11, 25.63], weeklyChange: -0.85, sortRank: 0, periodReturns: { '1M': 4.3, '6M': 17.4, '1Y': 17.9 },
      priceHistory: { '1W': [25.85, 26.51, 26.03, 26.11, 25.63], '1M': [24.57, 26.24, 25.98, 26.09, 25.98, 25.38, 25.67, 24.4, 24.09, 23.45, 24.18, 24.07, 24.48, 25.34, 25.71, 25.92, 25.85, 26.51, 26.03, 26.11, 25.63], '6M': [21.84, 21.91, 21.61, 21.83, 23, 22.41, 23.32, 22.96, 25.66, 26.51, 27.77, 27.18, 25.44, 23.87, 22.85, 23.64, 23.07, 25.41, 24.86, 25.5, 25.61, 25.98, 25.67, 24.07, 25.92, 25.63], '1Y': [21.74, 21.69, 22.24, 23.03, 23.93, 24.43, 24.28, 25.26, 24.64, 23.68, 24.45, 25.59, 25.06, 25.17, 25.26, 25.39, 24.81, 25.51, 24.59, 25.99, 26.01, 22.13, 22.15, 21.39, 22.12, 22.23, 21.61, 21.8, 22.02, 21.82, 21.72, 22.79, 23.85, 23.48, 25.68, 27.53, 27.77, 27.18, 25.44, 23.17, 22.14, 22.71, 22.04, 25.48, 25.58, 25.53, 25.61, 25.98, 25.67, 24.07, 25.92, 25.63] },
      velocityScore: { '1D': -2.7, '1W': -55.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: 27, revenueGrowth: 0, eps: 0.95, grossMargin: 40, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: 5.4, IDEF: false, BILT: false },
      tonyNote: 'Gates Industrial appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 5.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 1, avgWeight: 4.88, proScore: 0.98, coverage: 0.2,
      price: 135.53, weeklyPrices: [160.65, 152.17, 142.20, 141.70, 135.53], weeklyChange: -15.64, sortRank: 0, periodReturns: { '1M': -0.3, '6M': -25.4, '1Y': 6.1 },
      priceHistory: { '1W': [160.65, 152.17, 142.2, 141.7, 135.53], '1M': [135.91, 133.79, 137.05, 137.8, 136.89, 130.05, 133.73, 133.99, 135.14, 135.26, 137.15, 137.41, 136.88, 136.6, 132.51, 156.54, 160.65, 152.17, 142.2, 141.7, 135.53], '6M': [181.76, 183.57, 193.38, 184.18, 179.71, 178.96, 165.33, 157.35, 139.54, 135.68, 134.89, 135.94, 152.67, 151.6, 152.77, 154.96, 146.49, 130.49, 142.76, 141.57, 139.11, 137.05, 133.73, 137.41, 156.54, 135.53], '1Y': [127.72, 137.4, 139.92, 136.32, 139.71, 148.58, 151.79, 157.88, 160.66, 182.68, 174.03, 157.17, 157.09, 162.36, 170.26, 182.55, 178.86, 179.53, 177.21, 181.59, 189.18, 207.18, 193.61, 171.25, 162.25, 170.69, 181.49, 183.25, 193.98, 180.84, 181.68, 178.4, 165.9, 151.86, 130.01, 129.13, 134.89, 135.94, 152.67, 153.5, 155.68, 147.56, 148.46, 128.06, 146.39, 143.09, 139.11, 137.05, 133.73, 137.41, 156.54, 135.53] },
      velocityScore: { '1D': null, '1W': -56.3, '1M': null, '6M': null }, isNew: true,
      marketCap: '$325B', pe: 152.3, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 4.88, BILT: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'LIN', name: 'Linde plc', easyScore: 1, avgWeight: 4.78, proScore: 0.96, coverage: 0.2,
      price: 507.9, weeklyPrices: [497.41, 495.91, 507.57, 507.45, 507.90], weeklyChange: 2.11, sortRank: 0, periodReturns: { '1M': 1.5, '6M': 27.1, '1Y': 7.4 },
      priceHistory: { '1W': [497.41, 495.91, 507.57, 507.45, 507.9], '1M': [500.29, 501.87, 493.85, 493.16, 504.4, 513.26, 511.65, 506.11, 510.86, 506.07, 506.63, 514.51, 517.58, 514.97, 507.87, 497.69, 497.41, 495.91, 507.57, 507.45, 507.9], '6M': [399.57, 416.24, 421.43, 426.54, 437.16, 442.9, 439.35, 451.5, 473.33, 467.51, 490.11, 498.51, 490.06, 481.55, 488.57, 492.34, 493.83, 503.3, 499.22, 508.06, 501.14, 493.85, 511.65, 514.51, 497.69, 507.9], '1Y': [472.71, 465.98, 459.75, 469.18, 469.95, 460.56, 470.43, 467.46, 467.4, 470.38, 478.51, 477.85, 474.14, 473.44, 471.47, 479.94, 476.49, 468.55, 456.64, 451.56, 444.82, 412.18, 420.67, 417.85, 407.67, 408.79, 389.38, 416.99, 423.51, 428.36, 434.14, 439.98, 445.64, 455, 459.69, 472.86, 490.11, 498.51, 490.06, 490.41, 489.8, 495.49, 502.6, 503.15, 492.23, 510.3, 501.14, 493.85, 511.65, 514.51, 497.69, 507.9] },
      velocityScore: { '1D': null, '1W': -56, '1M': null, '6M': null }, isNew: true,
      marketCap: '$235B', pe: 33.7, revenueGrowth: 8, eps: 15.08, grossMargin: 49, dividendYield: 1.26,
      etfPresence: { AIRR: false, PRN: false, RSHO: 4.78, IDEF: false, BILT: false },
      tonyNote: 'Linde plc appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 4.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NOC', name: 'NORTHROP GRUMMAN CORP', easyScore: 1, avgWeight: 4.81, proScore: 0.96, coverage: 0.2,
      price: 544.4, weeklyPrices: [539.22, 536.59, 526.06, 545.17, 544.40], weeklyChange: 0.96, sortRank: 0, periodReturns: { '1M': -2.5, '6M': -0.8, '1Y': 11.2 },
      priceHistory: { '1W': [539.22, 536.59, 526.06, 545.17, 544.4], '1M': [558.6, 559.6, 552.27, 549.52, 548.21, 551.8, 548.65, 540.69, 550, 556.34, 552.17, 551.58, 555.58, 556.8, 551.34, 563.68, 539.22, 536.59, 526.06, 545.17, 544.4], '6M': [548.97, 569.76, 568.46, 577.78, 610.61, 625.5, 664.16, 689.13, 689.75, 678.83, 736.87, 710.9, 740.01, 733.18, 724.84, 691.21, 697, 690.57, 672.77, 587.66, 579.48, 552.27, 548.65, 551.58, 563.68, 544.4], '1Y': [489.41, 516.72, 499.67, 499.98, 504.85, 516.82, 515.29, 568.62, 589.75, 580.24, 584.82, 586.74, 589.32, 571.63, 579.36, 577.08, 593.99, 618.52, 618.88, 602, 595.95, 575.41, 562.98, 563.03, 565.56, 546.97, 553.56, 575.79, 584.66, 574.57, 577.01, 653.14, 670.44, 695.35, 696.5, 695.06, 736.87, 710.9, 740.01, 736.3, 714.15, 691.99, 702.5, 673.73, 665.26, 575.11, 579.48, 552.27, 548.65, 551.58, 563.68, 544.4] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$77B', pe: 17.1, revenueGrowth: 4, eps: 31.9, grossMargin: 21, dividendYield: 1.73,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 4.81, BILT: false },
      tonyNote: 'NORTHROP GRUMMAN CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 4.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 2, avgWeight: 2.38, proScore: 0.95, coverage: 0.4,
      price: 32.22, weeklyPrices: [46.46, 48.09, 43.13, 43.53, 32.22], weeklyChange: -30.65, sortRank: 0, periodReturns: { '1M': -13.2, '6M': 152.3, '1Y': 451.7 },
      priceHistory: { '1W': [46.46, 48.09, 43.13, 43.53, 32.22], '1M': [37.13, 39.69, 35.24, 39.04, 41.84, 40.74, 43.04, 41.62, 41.61, 41.59, 42.66, 42.48, 44.35, 48.32, 50.48, 51.14, 46.46, 48.09, 43.13, 43.53, 32.22], '6M': [12.77, 18.24, 19.18, 19.87, 21.84, 25.32, 26.38, 27.88, 21.77, 21.65, 25.11, 25.6, 24.59, 25.44, 24.81, 35.37, 30.71, 34.23, 39.89, 38.29, 36.97, 35.24, 43.04, 42.48, 51.14, 32.22], '1Y': [5.84, 5.37, 5.3, 6.1, 6.93, 6.43, 7.03, 6.36, 6.54, 6.42, 6.84, 7.06, 6.65, 9.02, 9.75, 12.05, 12.79, 15.24, 15.25, 13.56, 13.31, 13.19, 13.39, 11.21, 11.54, 11.77, 12.95, 18.05, 20.6, 19.74, 22.61, 26.73, 26.06, 26.35, 20.43, 21.3, 25.11, 25.6, 24.59, 24.97, 26.96, 32.4, 35.88, 34.67, 38.48, 35.44, 36.97, 35.24, 43.04, 42.48, 51.14, 32.22] },
      velocityScore: { '1D': -17.4, '1W': -59.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: null, revenueGrowth: 42, eps: -1.16, grossMargin: 56, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 3.63, RSHO: false, IDEF: 1.13, BILT: false },
      tonyNote: 'Planet Labs is a satellite earth observation company. It holds a speculative position in Industrials ETFs as a data infrastructure name — providing satellite imagery and analytics that support agricultural, energy, and government decision-making. Revenue is growing from a small base; the ETF weight is minimal and the position is thematic.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.66, proScore: 4.66, coverage: 1,
      price: 227.81, weeklyPrices: [264.51, 260.58, 251.68, 259.67, 227.81], weeklyChange: -13.87, sortRank: 0, periodReturns: { '1M': 29.5, '6M': 132.4, '1Y': 371.9 },
      priceHistory: { '1W': [264.51, 260.58, 251.68, 259.67, 227.81], '1M': [175.92, 195.09, 184.77, 177.05, 186.1, 207.27, 221.15, 219.94, 199.86, 197.73, 191.82, 219.93, 214.77, 208.06, 208.37, 231.09, 264.51, 260.58, 251.68, 259.67, 227.81], '6M': [98.04, 87.69, 89.46, 86.04, 100.24, 105.43, 98.87, 100.43, 82.39, 88.61, 107.61, 104.88, 95.65, 112, 118.56, 115.09, 101.95, 136.33, 165.34, 157.08, 138.23, 184.77, 221.15, 219.93, 231.09, 227.81], '1Y': [48.28, 47.13, 47.48, 55.33, 47.1, 53.53, 52.37, 52.75, 54.17, 70.24, 72.54, 70.02, 65.72, 95.72, 89.43, 107.8, 110.22, 124.94, 135.46, 109, 125.43, 120.47, 109.95, 85.98, 91.9, 96.45, 100.33, 81.14, 93.23, 85.17, 96.21, 101.98, 96.85, 94.91, 73.87, 89.73, 107.61, 104.88, 95.65, 108.04, 121.52, 105.97, 108.82, 144.97, 157.14, 147.16, 138.23, 184.77, 221.15, 219.93, 231.09, 227.81] },
      velocityScore: { '1D': -3.1, '1W': 9.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$58B', pe: 87.6, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 3.33, MEME: 5.53, RKNG: 5.12 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 3, avgWeight: 4.07, proScore: 4.07, coverage: 1,
      price: 93.6, weeklyPrices: [105.65, 118.17, 107.73, 107.29, 93.60], weeklyChange: -11.41, sortRank: 0, periodReturns: { '1M': 46.5, '6M': 26.6, '1Y': 200.1 },
      priceHistory: { '1W': [105.65, 118.17, 107.73, 107.29, 93.6], '1M': [63.87, 70.68, 65.35, 75.05, 82.55, 74.81, 83.01, 83.67, 86.83, 88.1, 89.58, 96.23, 105.86, 119.7, 129.6, 113.41, 105.65, 118.17, 107.73, 107.29, 93.6], '6M': [73.92, 76.7, 75.84, 71.47, 97.49, 92.72, 103.5, 121.23, 103.5, 96.92, 86.4, 85.76, 93.86, 88.21, 90.74, 96.06, 83.99, 91.61, 90.94, 78.75, 73.9, 65.35, 83.01, 96.23, 113.41, 93.6], '1Y': [31.19, 38.37, 50.2, 46.73, 45.46, 51.12, 56.67, 54.22, 51.38, 45.92, 48.16, 50.01, 48.76, 36.91, 40.43, 54.8, 48.84, 72.9, 90.5, 82.81, 79.45, 71.14, 68.7, 56.6, 55, 56.89, 74, 67.81, 86.48, 74.68, 85.73, 95.22, 116.37, 122.09, 93.27, 82.22, 86.4, 85.76, 93.86, 87.09, 94.09, 87.86, 92.62, 94.9, 85.53, 76.4, 73.9, 65.35, 83.01, 96.23, 113.41, 93.6] },
      velocityScore: { '1D': 2.3, '1W': -11.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$36B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 3.67, MEME: 5.77, RKNG: 2.77 },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'NVTS', name: 'Navitas Semiconductor', easyScore: 2, avgWeight: 5.72, proScore: 3.82, coverage: 0.667,
      price: 25.08, weeklyPrices: [24.86, 25.86, 30.84, 30.67, 25.08], weeklyChange: 0.88, sortRank: 0, periodReturns: { '1M': 42.9, '6M': 164.6, '1Y': 305.8 },
      priceHistory: { '1W': [24.86, 25.86, 30.84, 30.67, 25.08], '1M': [17.55, 16.68, 15.79, 18.2, 22.65, 21.17, 22.32, 21.32, 19.67, 19.43, 22.99, 24.38, 29.25, 31.79, 28.88, 26.6, 24.86, 25.86, 30.84, 30.67, 25.08], '6M': [9.48, 8.59, 7.81, 7.21, 10.19, 9.45, 9.76, 10.19, 8.2, 8.76, 8.08, 9.51, 8.96, 10.84, 9.06, 9.48, 8.54, 9.42, 12.37, 18.51, 16.5, 15.79, 22.32, 24.38, 26.6, 25.08], '1Y': [6.18, 7.32, 6.52, 6.55, 6.58, 6.23, 8.47, 8.56, 8.05, 6.6, 6.77, 6.2, 5.76, 5.76, 5.89, 6.88, 7.19, 8.13, 9.97, 17.1, 13.91, 12.25, 9.6, 7.73, 8.29, 8.32, 9.6, 7.96, 7.9, 7.24, 10.31, 10.04, 11.29, 9.46, 7.43, 8.37, 8.08, 9.51, 8.96, 9.98, 9.17, 9.02, 8.8, 9.54, 12.32, 17.28, 16.5, 15.79, 22.32, 24.38, 26.6, 25.08] },
      velocityScore: { '1D': 2.4, '1W': -6.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.72, RKNG: 6.73 },
      tonyNote: 'Navitas Semiconductor is a small-cap wide-bandgap power semiconductor name — gallium nitride and silicon carbide for fast charging and EV applications. The $26.60 share price and small market cap position it as a speculative holding in ETFs willing to take higher-risk bets on next-generation power conversion.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 5.58, proScore: 3.72, coverage: 0.667,
      price: 1559.32, weeklyPrices: [1761.43, 1716.36, 1831.50, 1759.68, 1559.32], weeklyChange: -11.47, sortRank: 0, periodReturns: { '1M': 10.9, '6M': 582.5, '1Y': 3882.9 },
      priceHistory: { '1W': [1761.43, 1716.36, 1831.5, 1759.68, 1559.32], '1M': [1406.32, 1409.98, 1339.96, 1562.34, 1547.56, 1447.23, 1382.72, 1407.61, 1333.01, 1383.29, 1392.56, 1542.24, 1478.69, 1589.55, 1589.94, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32], '6M': [228.47, 206.18, 237.61, 244.25, 349.63, 389.81, 501.29, 527.63, 584.55, 599.34, 621.09, 651.9, 565.59, 655.43, 753.69, 677.86, 692.73, 851.57, 919.47, 932.43, 1096.51, 1339.96, 1382.72, 1542.24, 1694.98, 1559.32], '1Y': [39.15, 42.5, 46.95, 45.35, 46.17, 42.72, 41.61, 41.89, 42.51, 43.37, 45.52, 46.78, 51.07, 70.51, 91.55, 106.4, 113.5, 121.17, 134.61, 148.04, 176.49, 207.01, 267.95, 265.88, 226.96, 205.35, 225.47, 201.87, 241.05, 240.22, 353.56, 387.81, 503.44, 539.3, 576.2, 630.29, 621.09, 651.9, 565.59, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 989.9, 1096.51, 1339.96, 1382.72, 1542.24, 1694.98, 1559.32] },
      velocityScore: { '1D': -6.8, '1W': -17.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$231B', pe: 53.2, revenueGrowth: 251, eps: 29.32, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.21, RKNG: 5.94 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 2, avgWeight: 5.52, proScore: 3.68, coverage: 0.667,
      price: 177, weeklyPrices: [185.67, 202.37, 184.07, 202.89, 177.00], weeklyChange: -4.67, sortRank: 0, periodReturns: { '1M': -2, '6M': 565.7, '1Y': 951.7 },
      priceHistory: { '1W': [185.67, 202.37, 184.07, 202.89, 177], '1M': [180.57, 178.54, 157.55, 148.94, 184.9, 223.1, 203.57, 190.36, 173.26, 171.33, 165.26, 176.81, 181.49, 177.62, 179.83, 158.41, 185.67, 202.37, 184.07, 202.89, 177], '6M': [26.59, 32.06, 31.32, 36.75, 38.61, 34.18, 38.38, 45.23, 39.9, 48.4, 46.98, 53.69, 101.14, 127.01, 92.63, 114.41, 86.35, 133.3, 157.32, 137.73, 164.36, 157.55, 203.57, 176.81, 158.41, 177], '1Y': [16.83, 15.47, 22.57, 25.69, 26.88, 29.24, 28.23, 25.22, 22.19, 20.86, 26.13, 24.34, 23.35, 23.72, 28.93, 28.06, 25.94, 33.79, 29.1, 34.14, 37.22, 33.04, 25.42, 21.63, 22.47, 26.02, 27.84, 29.9, 39.1, 36.02, 38.06, 34.47, 38.15, 39.57, 38.13, 43.99, 46.98, 53.69, 101.14, 106.19, 101.92, 97.42, 103.91, 150.6, 159.42, 162.17, 164.36, 157.55, 203.57, 176.81, 158.41, 177] },
      velocityScore: { '1D': -15.2, '1W': -15.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$14B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.4, RKNG: 4.63 },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 3, avgWeight: 3.66, proScore: 3.66, coverage: 1,
      price: 39.62, weeklyPrices: [47.94, 47.86, 44.71, 44.15, 39.62], weeklyChange: -17.36, sortRank: 0, periodReturns: { '1M': -0.7, '6M': 26.9, '1Y': 185.9 },
      priceHistory: { '1W': [47.94, 47.86, 44.71, 44.15, 39.62], '1M': [39.88, 44.24, 41.53, 41.25, 44.59, 45.48, 46.71, 42.56, 39.14, 36.62, 39.52, 48.02, 45.87, 45.14, 48.98, 47.28, 47.94, 47.86, 44.71, 44.15, 39.62], '6M': [31.22, 27.86, 27.85, 24.81, 30.26, 36.71, 35.06, 40.22, 31.54, 36.6, 31.53, 28.65, 28.09, 28.52, 26.65, 28.37, 24.49, 25.57, 30.09, 36.35, 34.25, 41.53, 46.71, 48.02, 47.28, 39.62], '1Y': [13.86, 11.18, 9.87, 10.07, 9.22, 9.97, 11.09, 10.58, 13.95, 14.03, 16.34, 15.95, 15.26, 15.2, 19.46, 24.67, 22.15, 27.71, 34.24, 35.9, 34.35, 32.87, 31.44, 22.93, 23.79, 28.05, 32.11, 22.98, 27.78, 24.08, 29.56, 36.1, 34.74, 38.07, 27.84, 36.17, 31.53, 28.65, 28.09, 27.48, 26.7, 25.72, 24.56, 26.26, 31.53, 34.98, 34.25, 41.53, 46.71, 48.02, 47.28, 39.62] },
      velocityScore: { '1D': -0.3, '1W': -7.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.3, MEME: 5.06, RKNG: 3.62 },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab', easyScore: 3, avgWeight: 3.58, proScore: 3.58, coverage: 1,
      price: 110.08, weeklyPrices: [122.39, 123.32, 114.70, 119.95, 110.08], weeklyChange: -10.06, sortRank: 0, periodReturns: { '1M': 39.8, '6M': 124.4, '1Y': 280.6 },
      priceHistory: { '1W': [122.39, 123.32, 114.7, 119.95, 110.08], '1M': [78.76, 84.65, 78.58, 105.47, 117.35, 124.15, 132.55, 124.77, 131.16, 127.31, 134.28, 125.45, 135.76, 143.2, 150.23, 143.48, 122.39, 123.32, 114.7, 119.95, 110.08], '6M': [49.06, 61.49, 70.52, 70.12, 86.03, 86.58, 87.82, 88.57, 73.11, 69.62, 76.58, 72.65, 70, 71.96, 69.48, 72.88, 65.52, 66.74, 82.93, 84.6, 82.51, 78.58, 132.55, 125.45, 143.48, 110.08], '1Y': [28.92, 25.41, 32.78, 35.77, 38.74, 44.6, 47.19, 45.11, 44.54, 45.02, 44.97, 47.22, 49.31, 47.03, 47.24, 52.91, 47.01, 58.5, 65.42, 67.35, 65.62, 61.34, 51.9, 43.31, 42.45, 41.9, 51.56, 55.41, 77.55, 70.45, 84.08, 91.8, 87.98, 85.68, 66.32, 66.01, 76.58, 72.65, 70, 68.37, 71.93, 65.94, 67.73, 68.05, 84.8, 79.68, 82.51, 78.58, 132.55, 125.45, 143.48, 110.08] },
      velocityScore: { '1D': 6.5, '1W': -13.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$69B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 1.97, MEME: 4.88, RKNG: 3.9 },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 5.03, proScore: 3.35, coverage: 0.667,
      price: 263.61, weeklyPrices: [273.51, 302.85, 287.32, 291.37, 263.61], weeklyChange: -3.62, sortRank: 0, periodReturns: { '1M': -10.7, '6M': 121.2, '1Y': 1110.3 },
      priceHistory: { '1W': [273.51, 302.85, 287.32, 291.37, 263.61], '1M': [295.25, 285.47, 258.64, 261.03, 283.92, 289.76, 303.41, 275.95, 258.71, 261.34, 282.31, 307.88, 302.49, 302.4, 293.8, 285, 273.51, 302.85, 287.32, 291.37, 263.61], '6M': [119.18, 94.98, 88.82, 88.41, 103.05, 139.77, 150.56, 165.39, 147.35, 155.54, 159, 168.57, 159.99, 159.21, 156.58, 150.22, 132.45, 160.13, 210.06, 237.57, 283.36, 258.64, 303.41, 307.88, 285, 263.61], '1Y': [21.78, 21.95, 22.56, 23.92, 24.3, 25.31, 25.36, 34.78, 36.1, 37.65, 46.5, 49.35, 51.35, 55, 73.29, 77.38, 73.6, 86.97, 109.91, 109.06, 108.53, 142.37, 139.23, 107.11, 95.56, 105, 111.79, 89.58, 92.26, 87.26, 108, 133.46, 145.63, 156.51, 136.6, 139.03, 159, 168.57, 159.99, 157.17, 166.69, 133.52, 135.63, 166.7, 207.86, 231.17, 283.36, 258.64, 303.41, 307.88, 285, 263.61] },
      velocityScore: { '1D': -0.9, '1W': -17.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$75B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.89, RKNG: 4.17 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 4.44, proScore: 2.96, coverage: 0.667,
      price: 864.01, weeklyPrices: [1035.50, 1064.10, 1079.57, 996.00, 864.01], weeklyChange: -16.56, sortRank: 0, periodReturns: { '1M': 35, '6M': 264.2, '1Y': 695.9 },
      priceHistory: { '1W': [1035.5, 1064.1, 1079.57, 996, 864.01], '1M': [640.2, 666.59, 646.63, 746.81, 795.33, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 971, 1035.5, 1064.1, 1079.57, 996, 864.01], '6M': [237.22, 241.14, 265.92, 294.37, 343.43, 338.13, 389.11, 435.28, 379.4, 410.34, 417.35, 415.56, 397.05, 418.69, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 776.01, 762.1, 971, 864.01], '1Y': [108.56, 115.6, 122.08, 123.25, 124.42, 120.11, 113.23, 111.25, 107.77, 123.72, 123.55, 116.42, 118.48, 135.24, 158.82, 166.41, 163.9, 190.96, 192.77, 206.77, 220.1, 234.7, 253.3, 241.95, 223.93, 239.49, 246.92, 237.5, 276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 417.35, 415.56, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 517.16, 646.63, 776.01, 762.1, 971, 864.01] },
      velocityScore: { '1D': -5.1, '1W': -11.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$974B', pe: 40.8, revenueGrowth: 196, eps: 21.17, grossMargin: 58, dividendYield: 0.07,
      etfPresence: { BUZZ: 3.64, MEME: false, RKNG: 5.24 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 2, avgWeight: 4.25, proScore: 2.84, coverage: 0.667,
      price: 54.35, weeklyPrices: [65.33, 66.60, 65.48, 61.86, 54.35], weeklyChange: -16.81, sortRank: 0, periodReturns: { '1M': -0.7, '6M': 21.6, '1Y': 457.4 },
      priceHistory: { '1W': [65.33, 66.6, 65.48, 61.86, 54.35], '1M': [54.74, 60.98, 56.85, 61.2, 55.15, 55.17, 58.4, 52.94, 50.46, 47.74, 52.71, 58.06, 56.83, 59.78, 67.84, 63.54, 65.33, 66.6, 65.48, 61.86, 54.35], '6M': [44.71, 40.13, 39.92, 39.41, 45.91, 52.99, 53.48, 62.94, 44.94, 42.67, 43.29, 44.24, 40.13, 41.98, 42.21, 41.43, 34.09, 37.06, 47.7, 52.02, 45.51, 56.85, 58.4, 58.06, 63.54, 54.35], '1Y': [9.75, 9.83, 10.66, 14.57, 16.89, 16.88, 18.15, 16.58, 16.48, 17.97, 20.7, 23.12, 29.11, 30.19, 36.45, 41.77, 45.93, 57.75, 64.14, 59.22, 64.99, 67.75, 60.17, 47.41, 48.49, 41.12, 46.34, 35.48, 42.04, 38.3, 43.63, 52.88, 52.26, 59.84, 39.79, 40.03, 43.29, 44.24, 40.13, 41.37, 41.66, 37.45, 34.77, 39.32, 48.12, 50.64, 45.51, 56.85, 58.4, 58.06, 63.54, 54.35] },
      velocityScore: { '1D': -30, '1W': -30, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 70.6, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 3, MEME: 5.51, RKNG: false },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'ONDS', name: 'Ondas Holdings', easyScore: 2, avgWeight: 3.85, proScore: 2.57, coverage: 0.667,
      price: 10.43, weeklyPrices: [13.46, 13.58, 11.61, 11.97, 10.43], weeklyChange: -22.51, sortRank: 0, periodReturns: { '1M': 11.8, '6M': 15, '1Y': 513.5 },
      priceHistory: { '1W': [13.46, 13.58, 11.61, 11.97, 10.43], '1M': [9.33, 9.34, 8.89, 9.06, 9.42, 8.86, 11.21, 10.62, 9.7, 9.13, 9.36, 9.18, 9.06, 9.77, 10.8, 13.22, 13.46, 13.58, 11.61, 11.97, 10.43], '6M': [9.07, 8.75, 9.22, 8.46, 12.84, 13.89, 12.55, 12.27, 9.68, 9.23, 11.39, 10.45, 10.49, 9.83, 10.83, 10.31, 8.81, 9.14, 10.2, 10.54, 10.04, 8.89, 11.21, 9.18, 13.22, 10.43], '1Y': [1.7, 1.82, 1.43, 1.92, 1.79, 2.29, 2.25, 2, 2.67, 3.43, 4.01, 4.85, 5.46, 5.45, 6.09, 7.88, 7.87, 10.66, 10.81, 7.77, 7.53, 6.15, 5.88, 6.26, 8.72, 8.07, 9.02, 7.69, 9.27, 8.99, 12.18, 13.56, 12.62, 11.27, 8.48, 8.97, 11.39, 10.45, 10.49, 10.33, 10.75, 9.44, 9.6, 9.13, 10, 10.55, 10.04, 8.89, 11.21, 9.18, 13.22, 10.43] },
      velocityScore: { '1D': 0, '1W': -26.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: 115.9, revenueGrowth: 1080, eps: 0.09, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.09, RKNG: 2.61 },
      tonyNote: 'Ondas Holdings is a small-cap industrial automation and drone company. It appears in Meme ETFs on the autonomous systems and drone delivery narrative. Revenue is minimal and the path to profitability is unclear; the ETF allocation is speculative and reflects retail interest in autonomous systems themes.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 2, avgWeight: 3.77, proScore: 2.51, coverage: 0.667,
      price: 206.89, weeklyPrices: [226.10, 229.00, 214.60, 217.50, 206.89], weeklyChange: -8.5, sortRank: 0, periodReturns: { '1M': 6.9, '6M': 17.5, '1Y': 183.6 },
      priceHistory: { '1W': [226.1, 229, 214.6, 217.5, 206.89], '1M': [193.57, 198.29, 188.29, 188.51, 210.22, 189.36, 184.54, 172.17, 156.27, 168.99, 182.98, 193.39, 218.41, 221.64, 221.23, 236.03, 226.1, 229, 214.6, 217.5, 206.89], '6M': [176.04, 143.91, 150.13, 144.7, 132.95, 161.38, 139.16, 129.66, 96.95, 128.4, 130.66, 114.48, 114.74, 115.91, 101.72, 103.91, 95.92, 107.93, 158.93, 185.54, 174.01, 188.29, 184.54, 193.39, 236.03, 206.89], '1Y': [72.96, 73.49, 84.57, 92.59, 93.36, 102.59, 95.74, 107.95, 114.7, 118.57, 118.74, 115.41, 124.27, 149.03, 164.42, 162.26, 146.01, 147.42, 149.9, 151.66, 154.96, 180.64, 170.16, 145.58, 150.85, 188.44, 178.94, 142.02, 149.94, 144.92, 141, 156.84, 135.1, 129.47, 98.06, 121.78, 130.66, 114.48, 114.74, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 174.01, 188.29, 184.54, 193.39, 236.03, 206.89] },
      velocityScore: { '1D': 85.9, '1W': 3.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$38B', pe: 113.7, revenueGrowth: 157, eps: 1.82, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.42, RKNG: 4.11 },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'SPCE', name: 'Virgin Galactic Holdings', easyScore: 1, avgWeight: 7.41, proScore: 2.47, coverage: 0.333,
      price: 4.38, weeklyPrices: [7.52, 4.59, 4.29, 4.72, 4.38], weeklyChange: -41.76, sortRank: 0, periodReturns: { '1M': 78.8, '6M': 1.6, '1Y': 36 },
      priceHistory: { '1W': [7.52, 4.59, 4.29, 4.72, 4.38], '1M': [2.45, 2.66, 2.51, 2.94, 2.92, 2.88, 2.88, 2.81, 2.58, 2.5, 2.47, 2.75, 3.24, 3.51, 3.79, 6.18, 7.52, 4.59, 4.29, 4.72, 4.38], '6M': [4.31, 3.24, 3.5, 3.15, 3.35, 3.07, 3, 3.03, 2.57, 2.62, 2.55, 2.64, 2.56, 2.55, 2.58, 2.52, 2.4, 2.97, 3.06, 2.71, 2.38, 2.51, 2.88, 2.75, 6.18, 4.38], '1Y': [3.22, 3, 2.95, 2.73, 2.77, 3.16, 4.31, 3.92, 3.88, 2.97, 3, 3.31, 3.09, 3.17, 3.28, 3.75, 3.51, 4.08, 4.37, 4.14, 4.17, 3.66, 3.59, 3.58, 3.36, 3.9, 4.55, 3.02, 3.7, 3.3, 3.17, 3.09, 3.18, 2.93, 2.35, 2.55, 2.55, 2.64, 2.56, 2.51, 2.5, 2.39, 2.46, 3.02, 2.93, 2.58, 2.38, 2.51, 2.88, 2.75, 6.18, 4.38] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$457M', pe: null, revenueGrowth: -51, eps: -3.87, grossMargin: 0, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.41, RKNG: false },
      tonyNote: 'Virgin Galactic Holdings appears in 1 of 3 Meme ETFs (33% coverage) with average weight 7.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OKLO', name: 'Oklo Inc', easyScore: 2, avgWeight: 3.67, proScore: 2.45, coverage: 0.667,
      price: 58.09, weeklyPrices: [66.89, 73.47, 65.21, 65.39, 58.09], weeklyChange: -13.16, sortRank: 0, periodReturns: { '1M': -15, '6M': -44.5, '1Y': 15.5 },
      priceHistory: { '1W': [66.89, 73.47, 65.21, 65.39, 58.09], '1M': [68.38, 79.62, 71.83, 72.51, 78.13, 69.66, 67.21, 62.25, 58.56, 55.88, 62.58, 65.09, 65.88, 68.7, 67.82, 66.88, 66.89, 73.47, 65.21, 65.39, 58.09], '6M': [104.67, 87.42, 83.23, 74.09, 95.6, 97.09, 90.78, 94.39, 68.23, 66.23, 67.64, 69.07, 62.03, 62.76, 56.7, 55.27, 48.07, 47.75, 64.21, 76.46, 72.5, 71.83, 67.21, 65.09, 66.88, 58.09], '1Y': [50.29, 63.66, 55.11, 55.99, 53.52, 60.95, 62.51, 75.5, 76.41, 71.86, 68.99, 71.19, 73.59, 73.97, 95.83, 142.65, 116.51, 138.56, 171.01, 159.05, 137.43, 126.67, 111.52, 95.36, 89.55, 91.84, 104.61, 82.33, 83.44, 71.62, 97.6, 95.97, 90.93, 86.04, 62.14, 63.92, 67.64, 69.07, 62.03, 59.59, 54.69, 51.81, 48.13, 50.25, 66.81, 71, 72.5, 71.83, 67.21, 65.09, 66.88, 58.09] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$10B', pe: null, revenueGrowth: 0, eps: -0.84, grossMargin: 0, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.86, RKNG: 2.48 },
      tonyNote: 'Oklo Inc appears in 2 of 3 Meme ETFs (67% coverage) with average weight 3.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RGTI', name: 'Rigetti Computing', easyScore: 2, avgWeight: 3.65, proScore: 2.43, coverage: 0.667,
      price: 20.68, weeklyPrices: [25.63, 26.88, 24.09, 24.16, 20.68], weeklyChange: -19.31, sortRank: 0, periodReturns: { '1M': 13.2, '6M': -26.4, '1Y': 83.3 },
      priceHistory: { '1W': [25.63, 26.88, 24.09, 24.16, 20.68], '1M': [18.27, 20.09, 18.34, 18.94, 20.51, 18.42, 19.27, 17.85, 16.62, 15.96, 16.88, 22.04, 26.42, 25.07, 24.62, 25.54, 25.63, 26.88, 24.09, 24.16, 20.68], '6M': [28.11, 25.84, 23.76, 22.27, 25.38, 24.47, 23.67, 22.01, 17.19, 16.43, 16.6, 18.64, 16.97, 16.94, 15.67, 15.14, 13.5, 14.31, 19.45, 16.86, 17.45, 18.34, 19.27, 22.04, 25.54, 20.68], '1Y': [11.28, 11.4, 10.79, 11.86, 13.38, 12.72, 16.08, 15.57, 15.76, 15.98, 16.63, 14.47, 15.52, 16.5, 20, 31.46, 29.65, 41.71, 54.91, 43.31, 40.24, 39.12, 33.08, 24.69, 26.57, 23.88, 28.26, 23.53, 26.88, 22.41, 25.21, 25.72, 24.96, 19.85, 14.98, 14.99, 16.6, 18.64, 16.97, 16.07, 15.41, 14.41, 14.19, 14.68, 19.81, 16.61, 17.45, 18.34, 19.27, 22.04, 25.54, 20.68] },
      velocityScore: { '1D': 12, '1W': -15.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 199, eps: -0.89, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.98, RKNG: 3.31 },
      tonyNote: 'Rigetti Computing is a quantum hardware company using superconducting qubit technology. It holds a position in Meme ETFs alongside IonQ and D-Wave as part of the quantum computing basket. Revenue is minimal, the technology is earlier-stage than IonQ, and the ETF allocation is speculative. The weight score is low; this is a high-risk, long-duration positioning.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 2, avgWeight: 3.48, proScore: 2.32, coverage: 0.667,
      price: 56.78, weeklyPrices: [69.28, 71.40, 68.23, 65.66, 56.78], weeklyChange: -18.04, sortRank: 0, periodReturns: { '1M': 18.3, '6M': 7.8, '1Y': 45.5 },
      priceHistory: { '1W': [69.28, 71.4, 68.23, 65.66, 56.78], '1M': [48, 52.57, 47.68, 49.24, 56.89, 55.26, 57.47, 51.95, 49.31, 48.44, 52.47, 58.89, 63.64, 63.62, 65.4, 72.07, 69.28, 71.4, 68.23, 65.66, 56.78], '6M': [52.69, 50.35, 48.48, 45.25, 50.76, 48.94, 48.33, 45.8, 35.34, 33.61, 33.43, 40.88, 36.02, 34.27, 32.38, 31.96, 27.79, 28.08, 44.68, 43.63, 45.12, 47.68, 57.47, 58.89, 72.07, 56.78], '1Y': [39.02, 37.84, 41.14, 42.97, 44.97, 41.47, 44.43, 42.34, 39.86, 44.94, 40.23, 38.68, 42.99, 44, 62.26, 75.14, 64.26, 78.99, 82.09, 59.94, 62.8, 58.4, 55.37, 47.79, 46.76, 46.93, 54.36, 46.07, 53.86, 45.31, 49.78, 50.88, 49.33, 43.24, 30.43, 31.3, 33.43, 40.88, 36.02, 33.03, 31.9, 29.84, 29.3, 28.79, 46.09, 42.69, 45.12, 47.68, 57.47, 58.89, 72.07, 56.78] },
      velocityScore: { '1D': null, '1W': -26.1, '1M': null, '6M': null }, isNew: true,
      marketCap: '$21B', pe: 145.6, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: 1.98, MEME: 4.98, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'RDW', name: 'Redwire', easyScore: 1, avgWeight: 6.67, proScore: 2.22, coverage: 0.333,
      price: 18.45, weeklyPrices: [20.68, 20.58, 18.62, 21.43, 18.45], weeklyChange: -10.78, sortRank: 0, periodReturns: { '1M': 112.3, '6M': 188.7, '1Y': 0 },
      priceHistory: { '1W': [20.68, 20.58, 18.62, 21.43, 18.45], '1M': [8.69, 9.64, 9.2, 11.07, 12.16, 11.46, 13.99, 14.06, 13.96, 13.91, 14.77, 15.35, 17.49, 22.04, 24, 24.57, 20.68, 20.58, 18.62, 21.43, 18.45], '6M': [6.39, 7.29, 8, 7, 10.64, 10.14, 10.2, 13.29, 10.03, 9.01, 8.6, 9.55, 9.07, 9.46, 9.55, 9.16, 9.08, 9.22, 11.22, 10.04, 9.19, 9.2, 13.99, 15.35, 24.57, 18.45], '1Y': [18.45, 19.08, 15.36, 16.3, 15.15, 16.98, 17.37, 15.47, 14.77, 8.82, 9.04, 8.94, 8.92, 8.16, 9, 9.22, 8.93, 11.22, 9.06, 8.25, 8.24, 7.37, 6.17, 5.47, 5.39, 5.22, 6.82, 6.89, 8.52, 7.94, 9.83, 11.02, 11.98, 12.81, 8.8, 7.89, 8.6, 9.55, 9.07, 9.48, 9.63, 8.87, 9.73, 9.29, 10.34, 9.68, 9.19, 9.2, 13.99, 15.35, 24.57, 18.45] },
      velocityScore: { '1D': 2.3, '1W': -47.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: null, revenueGrowth: 58, eps: -2.59, grossMargin: 13, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.67, RKNG: false },
      tonyNote: 'Redwire Corp is a space infrastructure company — solar arrays, structures, and manufacturing in orbit. It appears in Meme and speculative ETFs as a high-risk space economy play. Revenue is growing from a small base but the business is pre-profitability; the ETF weight is minimal and reflects thematic positioning rather than fundamental conviction.',
    },
    {
      ticker: 'QBTS', name: 'D-Wave Quantum', easyScore: 1, avgWeight: 5.42, proScore: 1.81, coverage: 0.333,
      price: 23.85, weeklyPrices: [29.18, 29.91, 27.55, 27.64, 23.85], weeklyChange: -18.27, sortRank: 0, periodReturns: { '1M': 10.7, '6M': -11.7, '1Y': 28.1 },
      priceHistory: { '1W': [29.18, 29.91, 27.55, 27.64, 23.85], '1M': [21.54, 23.83, 21.99, 22.57, 24.03, 21.44, 22.13, 20.35, 19.06, 18.19, 19.3, 25.74, 29.4, 27.82, 27.48, 30.14, 29.18, 29.91, 27.55, 27.64, 23.85], '6M': [27, 26.1, 26.82, 26.15, 31.27, 28.82, 26.04, 24.97, 20.11, 19.64, 19.38, 20.14, 18.83, 18.91, 16.49, 16.19, 13.7, 13.87, 21.52, 19.31, 20.28, 21.99, 22.13, 25.74, 30.14, 23.85], '1Y': [18.62, 15.17, 14.94, 14.64, 15.99, 16.15, 18.39, 18.35, 17.18, 17.37, 16.56, 15.02, 15.85, 16.15, 18.98, 27.52, 25.31, 35.02, 40.62, 34.4, 35.04, 33.09, 29.37, 22.83, 23.11, 22.5, 28.44, 23.74, 32.19, 26.25, 30.2, 30.15, 27.43, 23.22, 17.21, 18.82, 19.38, 20.14, 18.83, 17.83, 16.1, 14.65, 14.32, 14.25, 21.69, 18.49, 20.28, 21.99, 22.13, 25.74, 30.14, 23.85] },
      velocityScore: { '1D': 2.8, '1W': -45, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: -81, eps: -1.14, grossMargin: 66, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.42, RKNG: false },
      tonyNote: 'D-Wave Quantum is a quantum computing company — the only publicly traded business built around quantum annealing hardware. Revenue is minimal and profitability is many years away, but it holds a position in Meme ETFs as the purest-play quantum computing stock available to retail investors. The ETF weight is small and the position is purely thematic.',
    },
    {
      ticker: 'AXTI', name: 'AXT Inc', easyScore: 1, avgWeight: 5.41, proScore: 1.8, coverage: 0.333,
      price: 89.04, weeklyPrices: [109.55, 110.85, 106.70, 105.99, 89.04], weeklyChange: -18.72, sortRank: 0, periodReturns: { '1M': -17.2, '6M': 668.9, '1Y': 4902.2 },
      priceHistory: { '1W': [109.55, 110.85, 106.7, 105.99, 89.04], '1M': [107.55, 104.83, 108.42, 116.36, 125.81, 121.94, 114.98, 123.78, 105.88, 112.88, 104.61, 121.02, 140.83, 132.6, 122.77, 103.16, 109.55, 110.85, 106.7, 105.99, 89.04], '6M': [11.58, 14.81, 14.65, 14.59, 20.17, 21.51, 19.78, 16.83, 18.75, 26.8, 23.81, 37.12, 38.8, 47.36, 48.76, 67.35, 47.14, 63.12, 81.78, 75.27, 79.22, 108.42, 114.98, 121.02, 103.16, 89.04], '1Y': [1.78, 2.16, 1.86, 2.09, 2.37, 2.36, 2.32, 2.44, 2.11, 2.18, 2.07, 2.84, 3.28, 3.04, 4.01, 4.8, 4.89, 5.4, 4.6, 4.91, 6.19, 8.46, 10.44, 10.25, 9.34, 11.76, 12.71, 14.83, 15.22, 15.8, 24.11, 22.1, 17.92, 16.38, 20.43, 24.79, 23.81, 37.12, 38.8, 46.73, 58.09, 58.51, 52.84, 64.18, 82.56, 76.16, 79.22, 108.42, 114.98, 121.02, 103.16, 89.04] },
      velocityScore: { '1D': 20, '1W': -27.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: 39, eps: -0.32, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.41, RKNG: false },
      tonyNote: 'AXT Inc is a compound semiconductor substrate manufacturer — gallium arsenide, indium phosphide, and germanium wafers used in data center optical transceivers, 5G RF chips, and solar cells. Revenue is growing with optical networking demand. Small market cap but positioned at a genuine supply-chain chokepoint for III-V semiconductor materials.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 1, avgWeight: 4.66, proScore: 1.55, coverage: 0.333,
      price: 511.72, weeklyPrices: [546.20, 563.10, 594.11, 575.50, 511.72], weeklyChange: -6.31, sortRank: 0, periodReturns: { '1M': 10, '6M': 203, '1Y': 822.8 },
      priceHistory: { '1W': [546.2, 563.1, 594.11, 575.5, 511.72], '1M': [465.26, 483.15, 463.91, 480, 515.83, 494.09, 489.15, 482.02, 458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72], '6M': [168.89, 176.34, 181.08, 179.68, 219.38, 214, 241.9, 279.7, 269.41, 273.74, 284.67, 282.25, 259.03, 268.81, 304.9, 296.14, 297.73, 337.88, 361.69, 403.12, 434.52, 463.91, 489.15, 486.46, 531.21, 511.72], '1Y': [55.45, 55.7, 60.38, 63.99, 64.02, 67.53, 68.74, 68.99, 77.29, 74.64, 76.29, 79.22, 81.91, 94.54, 103.09, 110.25, 116.74, 125.28, 118.86, 121.53, 126.67, 158.02, 174.22, 162.45, 150.93, 159.99, 169.78, 172.04, 176.76, 176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 284.67, 282.25, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 434.52, 463.91, 489.15, 486.46, 531.21, 511.72] },
      velocityScore: { '1D': -3.1, '1W': -37.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$176B', pe: 30.6, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.12,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.66 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
