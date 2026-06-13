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
export const SPY_RET: Record<Period, number> = { '1W': 0.3, '1M': 0.5, '6M': 8.8, '1Y': 24.2 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 8.0 }, { t: 'AMD', w: 4.6 }, { t: 'MRVL', w: 4.5 }, { t: 'VRT', w: 3.6 }, { t: 'SIMO', w: 3.6 }],
  ARTY: [{ t: 'MRVL', w: 9.3 }, { t: 'MU', w: 7.8 }, { t: 'AMD', w: 7.4 }, { t: 'CRWV', w: 3.9 }, { t: 'ORCL', w: 3.7 }],
  BAI: [{ t: 'MU', w: 6.2 }, { t: 'LRCX', w: 4.8 }, { t: 'AMD', w: 4.7 }, { t: 'AVGO', w: 4.4 }, { t: 'TSM', w: 4.4 }],
  IGPT: [{ t: 'MU', w: 12.6 }, { t: 'AMD', w: 7.1 }, { t: 'INTC', w: 7.1 }, { t: 'GOOGL', w: 6.0 }, { t: 'NVDA', w: 5.7 }],
  IVES: [{ t: 'MU', w: 6.1 }, { t: 'AMD', w: 5.1 }, { t: 'TSM', w: 5.0 }, { t: 'NVDA', w: 4.8 }, { t: 'AAPL', w: 4.7 }],
  ALAI: [{ t: 'NVDA', w: 13.1 }, { t: 'AMZN', w: 5.7 }, { t: 'TSM', w: 5.6 }, { t: 'MSFT', w: 5.2 }, { t: 'GOOG', w: 5.0 }],
  CHAT: [{ t: 'NVDA', w: 6.8 }, { t: 'GOOGL', w: 5.4 }, { t: 'AVGO', w: 4.2 }, { t: 'AMD', w: 4.1 }, { t: 'MU', w: 3.9 }],
  AIFD: [{ t: 'MU', w: 6.5 }, { t: 'NVDA', w: 6.4 }, { t: 'MRVL', w: 6.1 }, { t: 'LITE', w: 6.1 }, { t: 'DOCN', w: 6.0 }],
  SPRX: [{ t: 'COHR', w: 8.7 }, { t: 'ALAB', w: 7.8 }, { t: 'ARM', w: 7.3 }, { t: 'KLAC', w: 7.2 }, { t: 'NET', w: 6.9 }],
  AOTG: [{ t: 'AMD', w: 14.8 }, { t: 'NVDA', w: 10.9 }, { t: 'MU', w: 9.6 }, { t: 'TSM', w: 7.3 }, { t: 'TOST', w: 4.8 }],
  SOXX: [{ t: 'MU', w: 11.6 }, { t: 'AMD', w: 8.7 }, { t: 'MRVL', w: 8.2 }, { t: 'INTC', w: 6.1 }, { t: 'AVGO', w: 5.8 }],
  PSI: [{ t: 'AMAT', w: 6.0 }, { t: 'KLAC', w: 6.0 }, { t: 'LRCX', w: 5.6 }, { t: 'MU', w: 5.5 }, { t: 'ADI', w: 4.9 }],
  XSD: [{ t: 'MXL', w: 5.6 }, { t: 'MRVL', w: 4.7 }, { t: 'ALAB', w: 4.5 }, { t: 'INTC', w: 3.7 }, { t: 'AMD', w: 3.6 }],
  DRAM: [{ t: 'SNDK', w: 5.9 }, { t: 'STX', w: 4.4 }, { t: 'MU', w: 4.0 }, { t: 'WDC', w: 3.9 }],
  PTF: [{ t: 'SNDK', w: 8.5 }, { t: 'MU', w: 4.9 }, { t: 'STX', w: 4.6 }, { t: 'WDC', w: 4.6 }, { t: 'NVDA', w: 4.3 }],
  WCLD: [{ t: 'DOCN', w: 3.8 }, { t: 'FROG', w: 2.9 }, { t: 'DDOG', w: 2.8 }, { t: 'PANW', w: 2.6 }, { t: 'TWLO', w: 2.5 }],
  IGV: [{ t: 'ORCL', w: 9.1 }, { t: 'PANW', w: 8.4 }, { t: 'MSFT', w: 7.8 }, { t: 'PLTR', w: 7.0 }, { t: 'CRWD', w: 6.6 }],
  FDTX: [{ t: 'MU', w: 9.4 }, { t: 'MRVL', w: 8.1 }, { t: 'TSM', w: 6.0 }, { t: 'NVDA', w: 4.6 }, { t: 'STX', w: 4.0 }],
  GTEK: [{ t: 'MRVL', w: 4.7 }, { t: 'DELL', w: 3.0 }, { t: 'CDNS', w: 2.6 }, { t: 'APH', w: 2.3 }, { t: 'NET', w: 2.1 }],
  ARKK: [{ t: 'TSLA', w: 10.5 }, { t: 'TEM', w: 5.2 }, { t: 'HOOD', w: 5.0 }, { t: 'AMD', w: 5.0 }, { t: 'CRSP', w: 4.9 }],
  MARS: [{ t: 'RKLB', w: 11.2 }, { t: 'SPCX', w: 10.8 }, { t: 'SATS', w: 8.1 }, { t: 'ASTS', w: 7.9 }, { t: 'PL', w: 4.7 }],
  FRWD: [{ t: 'NVDA', w: 8.6 }, { t: 'STX', w: 7.6 }, { t: 'AMD', w: 7.0 }, { t: 'LRCX', w: 6.2 }, { t: 'TSM', w: 5.8 }],
  BCTK: [{ t: 'TSM', w: 8.7 }, { t: 'AVGO', w: 7.3 }, { t: 'LRCX', w: 7.1 }, { t: 'NVDA', w: 6.6 }, { t: 'GOOG', w: 5.9 }],
  FWD: [{ t: 'AVGO', w: 2.4 }, { t: 'GOOGL', w: 2.1 }, { t: 'NVDA', w: 2.0 }, { t: 'AMD', w: 2.0 }, { t: 'CAT', w: 1.9 }],
  CBSE: [{ t: 'SBUX', w: 3.4 }, { t: 'SCI', w: 3.3 }, { t: 'KLAC', w: 3.2 }, { t: 'VG', w: 3.0 }, { t: 'LRCX', w: 3.0 }],
  FCUS: [{ t: 'INTC', w: 4.5 }, { t: 'SITM', w: 4.3 }, { t: 'DELL', w: 4.3 }, { t: 'SNDK', w: 4.3 }, { t: 'BE', w: 4.2 }],
  WGMI: [{ t: 'CIFR', w: 15.8 }, { t: 'IREN', w: 12.8 }, { t: 'WULF', w: 9.6 }, { t: 'CORZ', w: 7.7 }, { t: 'KEEL', w: 7.2 }],
  POW: [{ t: 'POWL', w: 6.7 }, { t: 'VICR', w: 5.4 }, { t: 'PWR', w: 4.8 }, { t: 'PRY', w: 4.4 }, { t: 'ETN', w: 4.0 }],
  VOLT: [{ t: 'BELFB', w: 7.8 }, { t: 'POWL', w: 7.6 }, { t: 'PWR', w: 5.5 }, { t: 'ETN', w: 5.2 }, { t: 'NEE', w: 5.0 }],
  PBD: [{ t: 'FSLR', w: 1.1 }, { t: 'SEDG', w: 1.1 }, { t: 'ENPH', w: 1.1 }],
  PBW: [{ t: 'HYLN', w: 4.7 }, { t: 'FCEL', w: 3.1 }, { t: 'NVTS', w: 2.9 }, { t: 'ASPN', w: 2.1 }, { t: 'BE', w: 2.0 }],
  IVEP: [{ t: 'BE', w: 4.8 }, { t: 'PWR', w: 4.4 }, { t: 'COHR', w: 4.1 }, { t: 'MPWR', w: 4.0 }, { t: 'VRT', w: 4.0 }],
  AIRR: [{ t: 'STRL', w: 6.3 }, { t: 'CHRW', w: 4.3 }, { t: 'FIX', w: 4.3 }, { t: 'SAIA', w: 4.2 }, { t: 'AGX', w: 3.9 }],
  PRN: [{ t: 'TTMI', w: 6.0 }, { t: 'FIX', w: 4.7 }, { t: 'STRL', w: 4.4 }, { t: 'JBL', w: 4.2 }, { t: 'AGX', w: 4.1 }],
  RSHO: [{ t: 'TKR', w: 9.3 }, { t: 'POWL', w: 7.8 }, { t: 'CGNX', w: 7.0 }, { t: 'CAT', w: 6.6 }, { t: 'GTES', w: 5.6 }],
  IDEF: [{ t: 'RTX', w: 8.0 }, { t: 'LMT', w: 7.2 }, { t: 'GD', w: 5.9 }, { t: 'NOC', w: 5.1 }, { t: 'BA', w: 5.0 }],
  BILT: [{ t: 'UNP', w: 5.8 }, { t: 'AEP', w: 4.3 }, { t: 'AENA', w: 4.2 }, { t: 'XEL', w: 3.6 }, { t: 'LNG', w: 3.5 }],
  BUZZ: [{ t: 'MU', w: 3.6 }, { t: 'NOW', w: 3.5 }, { t: 'ASTS', w: 3.3 }, { t: 'GME', w: 3.3 }, { t: 'AMD', w: 3.2 }],
  MEME: [{ t: 'SPCE', w: 9.3 }, { t: 'SNDK', w: 6.1 }, { t: 'AAOI', w: 6.0 }, { t: 'RDW', w: 6.0 }, { t: 'ASTS', w: 5.8 }],
  RKNG: [{ t: 'SNDK', w: 6.2 }, { t: 'NVTS', w: 5.6 }, { t: 'MU', w: 5.5 }, { t: 'CRDO', w: 5.0 }, { t: 'NBIS', w: 4.9 }],
};
// @@END_GENERATED:ETF_TOP_HOLDINGS@@

// @@GENERATED:TOP10_RET@@
// Top10 composite returns per theme per period (average of all ETFs in theme)
const TOP10_RET: Record<Theme, Record<Period, number>> = {
  'AI & ML':         { '1W': 0.7, '1M': 7.9, '6M': 46.7, '1Y': 91.1 },
  'Semiconductors':  { '1W': 5.8, '1M': 16.1, '6M': 107.1, '1Y': 166.6 },
  'Broad Tech':      { '1W': 0.1, '1M': 4.7, '6M': 27.2, '1Y': 57.4 },
  'Electrification': { '1W': 0.5, '1M': -4.4, '6M': 28.6, '1Y': 57.3 },
  'Industrials':     { '1W': 1.9, '1M': 0.5, '6M': 23.8, '1Y': 44.8 },
  'Meme':            { '1W': -1.4, '1M': 0.6, '6M': 22.4, '1Y': 13.7 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, Record<Period, ChartPeriodData>> = {
  'AI & ML': {
    '1W': { top10: [100, 98.02, 94.94, 100.06, 100.75], spy: [100, 99.71, 98.13, 99.8, 100.34], top10Return: 0.7, spyReturn: 0.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 102.58, 103.6, 100.26, 98.32, 100.74, 103.15, 104.11, 108.28, 108.1, 110.07, 111.03, 114.29, 116.45, 115.34, 103.82, 107.11, 104.97, 101.66, 107.19, 107.93], spy: [100, 100.56, 101.35, 100.13, 100.06, 100.42, 100.62, 101.01, 101.68, 101.66, 102.22, 102.48, 102.76, 102.9, 102.18, 99.91, 100.14, 99.85, 98.27, 99.94, 100.48], top10Return: 7.9, spyReturn: 0.5, xLabels: ["May 16", "May 23", "May 30", "Jun 6", "Jun 13"] },
    '6M': { top10: [100, 100.53, 101.61, 104.97, 105.46, 104.47, 109.25, 99.42, 104.63, 103.87, 105.07, 101.81, 100.82, 103.27, 102.66, 99.93, 107.23, 116.43, 120.16, 123.71, 131.45, 140.39, 139.69, 150.53, 140.6, 146.69], spy: [100, 99.83, 100.89, 101.47, 101.76, 100.53, 102, 100.65, 101.5, 100.4, 101.11, 99.93, 97.7, 97.02, 96.34, 96.11, 99.73, 102.92, 103.91, 105.41, 107.31, 109.74, 108.94, 110.96, 108.18, 108.8], top10Return: 46.7, spyReturn: 8.8, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.94, 107.75, 107.38, 108.91, 109.83, 113.63, 113.73, 115.16, 116.26, 114.05, 114.26, 120.19, 125.42, 128.31, 127.82, 133.31, 133.46, 133.23, 139.06, 140.79, 137.04, 127.34, 126.61, 131.01, 134.73, 127.53, 131.92, 131.41, 135.48, 135.1, 137.11, 139.83, 126.67, 133.02, 135.91, 136.42, 132.09, 130.86, 135.03, 126.58, 130.26, 141.13, 153.69, 160.64, 163.12, 170.74, 182.66, 181.78, 195.91, 182.99, 191.1], spy: [100, 100.53, 103.49, 103.91, 104.21, 105.34, 106.69, 105.72, 106.52, 107.76, 107.62, 107.25, 108.93, 110.55, 111.09, 111.59, 112.5, 111.06, 112.45, 114.78, 114.46, 114.14, 111.5, 112.02, 114.16, 114.41, 114.03, 114.71, 115.08, 115.51, 115.64, 115.41, 116.25, 113.5, 114.12, 115.48, 115.46, 114.12, 111.57, 110.52, 108.06, 109.85, 113.81, 118.95, 119.59, 120.71, 122.54, 125.32, 124.41, 126.71, 123.54, 124.25], top10Return: 91.1, spyReturn: 24.2, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Semiconductors': {
    '1W': { top10: [100, 98.43, 95.13, 104.34, 105.85], spy: [100, 99.71, 98.13, 99.8, 100.34], top10Return: 5.8, spyReturn: 0.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 103.21, 103.12, 99.29, 96.16, 100.83, 103.28, 104.9, 112.83, 111.9, 113.2, 112.18, 113.82, 119.29, 120.69, 103.54, 109.75, 108.02, 104.35, 114.55, 116.14], spy: [100, 100.56, 101.35, 100.13, 100.06, 100.42, 100.62, 101.01, 101.68, 101.66, 102.22, 102.48, 102.76, 102.9, 102.18, 99.91, 100.14, 99.85, 98.27, 99.94, 100.48], top10Return: 16.1, spyReturn: 0.5, xLabels: ["May 16", "May 23", "May 30", "Jun 6", "Jun 13"] },
    '6M': { top10: [100, 101.44, 104.63, 112.02, 113.63, 118.55, 119.32, 115.18, 125.08, 122.31, 124.93, 124.86, 123.03, 130.76, 132.5, 132.44, 137.92, 147.5, 158.56, 172.31, 182.8, 197.9, 194.15, 197.42, 185.75, 207.11], spy: [100, 99.83, 100.89, 101.47, 101.76, 100.53, 102, 100.65, 101.5, 100.4, 101.11, 99.93, 97.7, 97.02, 96.34, 96.11, 99.73, 102.92, 103.91, 105.41, 107.31, 109.74, 108.94, 110.96, 108.18, 108.8], top10Return: 107.1, spyReturn: 8.8, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 103.05, 108.6, 111.25, 111.54, 111.5, 112.58, 110.59, 111.07, 114.92, 115.38, 114.06, 118.65, 123.64, 129.38, 128.6, 135.8, 134.61, 139.19, 142.82, 143.38, 140.71, 129.25, 130.8, 138.94, 145.34, 138.97, 141.72, 140.6, 150.78, 153.96, 161.68, 164.15, 154.6, 164.34, 165.87, 165.35, 155.3, 151.45, 157.13, 153.5, 157.98, 177.75, 194.15, 219.14, 222.66, 235.14, 252.59, 252.04, 266.69, 250.16, 277.4], spy: [100, 100.53, 103.49, 103.91, 104.21, 105.34, 106.69, 105.72, 106.52, 107.76, 107.62, 107.25, 108.93, 110.55, 111.09, 111.59, 112.5, 111.06, 112.45, 114.78, 114.46, 114.14, 111.5, 112.02, 114.16, 114.41, 114.03, 114.71, 115.08, 115.51, 115.64, 115.41, 116.25, 113.5, 114.12, 115.48, 115.46, 114.12, 111.57, 110.52, 108.06, 109.85, 113.81, 118.95, 119.59, 120.71, 122.54, 125.32, 124.41, 126.71, 123.54, 124.25], top10Return: 166.6, spyReturn: 24.2, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Broad Tech': {
    '1W': { top10: [100, 97.9, 95.56, 99.91, 100.13], spy: [100, 99.71, 98.13, 99.8, 100.34], top10Return: 0.1, spyReturn: 0.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100.87, 102.33, 99.8, 98.99, 100.66, 102.38, 103.87, 107.14, 107.16, 108.87, 109.57, 111.67, 112.84, 110.92, 102.58, 104.63, 102.43, 99.95, 104.45, 104.74], spy: [100, 100.56, 101.35, 100.13, 100.06, 100.42, 100.62, 101.01, 101.68, 101.66, 102.22, 102.48, 102.76, 102.9, 102.18, 99.91, 100.14, 99.85, 98.27, 99.94, 100.48], top10Return: 4.7, spyReturn: 0.5, xLabels: ["May 16", "May 23", "May 30", "Jun 6", "Jun 13"] },
    '6M': { top10: [100, 100.03, 99.64, 103.67, 104.06, 103.34, 104.65, 96.99, 100.63, 100.95, 102.97, 100.95, 98.56, 99.72, 99.85, 98.1, 102.29, 110.42, 113.34, 115.19, 121.9, 126.42, 124.78, 131.6, 123.8, 127.24], spy: [100, 99.83, 100.89, 101.47, 101.76, 100.53, 102, 100.65, 101.5, 100.4, 101.11, 99.93, 97.7, 97.02, 96.34, 96.11, 99.73, 102.92, 103.91, 105.41, 107.31, 109.74, 108.94, 110.96, 108.18, 108.8], top10Return: 27.2, spyReturn: 8.8, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 100.9, 105.97, 107.31, 107.07, 110.01, 110.68, 108.66, 107.18, 110.46, 109.95, 110.5, 113.72, 118.55, 122.38, 123.22, 129.38, 132.19, 131.89, 134.38, 135.05, 130.39, 119.44, 120.15, 122.61, 126.29, 119.16, 122.9, 119.88, 125.55, 128.15, 128.33, 129.32, 117.47, 123.67, 125.6, 129.17, 125.49, 123.13, 127.06, 122.38, 125.06, 131.02, 141.03, 141.21, 143.38, 148.98, 153.5, 153.17, 159.85, 152.87, 157.39], spy: [100, 100.53, 103.49, 103.91, 104.21, 105.34, 106.69, 105.72, 106.52, 107.76, 107.62, 107.25, 108.93, 110.55, 111.09, 111.59, 112.5, 111.06, 112.45, 114.78, 114.46, 114.14, 111.5, 112.02, 114.16, 114.41, 114.03, 114.71, 115.08, 115.51, 115.64, 115.41, 116.25, 113.5, 114.12, 115.48, 115.46, 114.12, 111.57, 110.52, 108.06, 109.85, 113.81, 118.95, 119.59, 120.71, 122.54, 125.32, 124.41, 126.71, 123.54, 124.25], top10Return: 57.4, spyReturn: 24.2, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Electrification': {
    '1W': { top10: [100, 98.81, 95.62, 99.53, 100.47], spy: [100, 99.71, 98.13, 99.8, 100.34], top10Return: 0.5, spyReturn: 0.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100.7, 100.81, 98, 95.24, 95.53, 98.21, 99.58, 102.62, 101.8, 101.92, 100.84, 100.52, 102.63, 101.51, 95.08, 95.18, 94.01, 90.97, 94.69, 95.59], spy: [100, 100.56, 101.35, 100.13, 100.06, 100.42, 100.62, 101.01, 101.68, 101.66, 102.22, 102.48, 102.76, 102.9, 102.18, 99.91, 100.14, 99.85, 98.27, 99.94, 100.48], top10Return: -4.4, spyReturn: 0.5, xLabels: ["May 16", "May 23", "May 30", "Jun 6", "Jun 13"] },
    '6M': { top10: [100, 100.08, 100.94, 104.09, 106.19, 108.12, 111.81, 110.65, 114.37, 114.43, 116.81, 111.11, 110.91, 112.33, 114.92, 111.87, 116.84, 121.24, 126.75, 131.06, 132.56, 135.19, 132.11, 135.02, 126.81, 128.6], spy: [100, 99.83, 100.89, 101.47, 101.76, 100.53, 102, 100.65, 101.5, 100.4, 101.11, 99.93, 97.7, 97.02, 96.34, 96.11, 99.73, 102.92, 103.91, 105.41, 107.31, 109.74, 108.94, 110.96, 108.18, 108.8], top10Return: 28.6, spyReturn: 8.8, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 99.3, 102.71, 105.71, 107.05, 111.68, 110.98, 109.24, 110.78, 114.23, 114.88, 112.16, 112.76, 116.78, 120.41, 122.61, 129.64, 132.23, 135.04, 135.36, 135.8, 136.97, 129.53, 128.59, 132.78, 134.71, 134.1, 136.54, 133.08, 136.57, 140.67, 146.03, 145.64, 141.6, 143.45, 146.94, 150.35, 144.5, 145.63, 147.45, 148.78, 150.06, 158.23, 166.34, 169.42, 170.97, 173.68, 179.2, 175.46, 181.49, 170.29, 170.43], spy: [100, 100.53, 103.49, 103.91, 104.21, 105.34, 106.69, 105.72, 106.52, 107.76, 107.62, 107.25, 108.93, 110.55, 111.09, 111.59, 112.5, 111.06, 112.45, 114.78, 114.46, 114.14, 111.5, 112.02, 114.16, 114.41, 114.03, 114.71, 115.08, 115.51, 115.64, 115.41, 116.25, 113.5, 114.12, 115.48, 115.46, 114.12, 111.57, 110.52, 108.06, 109.85, 113.81, 118.95, 119.59, 120.71, 122.54, 125.32, 124.41, 126.71, 123.54, 124.25], top10Return: 57.3, spyReturn: 24.2, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Industrials': {
    '1W': { top10: [100, 100.11, 97.45, 101.56, 101.88], spy: [100, 99.71, 98.13, 99.8, 100.34], top10Return: 1.9, spyReturn: 0.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100.02, 100.7, 98.04, 96.72, 97.43, 97.62, 98.5, 100.94, 100.94, 101.41, 100.76, 99.27, 100.56, 100.3, 98.46, 98.6, 98.71, 96.08, 100.13, 100.45], spy: [100, 100.56, 101.35, 100.13, 100.06, 100.42, 100.62, 101.01, 101.68, 101.66, 102.22, 102.48, 102.76, 102.9, 102.18, 99.91, 100.14, 99.85, 98.27, 99.94, 100.48], top10Return: 0.5, spyReturn: 0.5, xLabels: ["May 16", "May 23", "May 30", "Jun 6", "Jun 13"] },
    '6M': { top10: [100, 99.86, 100.67, 104.95, 107.86, 110.6, 110.18, 111.02, 116.18, 118.03, 118.69, 113.73, 110.66, 111.12, 112.89, 112.12, 118.3, 117.78, 120.22, 121.57, 122.41, 124.14, 120.09, 124.04, 121.28, 123.83], spy: [100, 99.83, 100.89, 101.47, 101.76, 100.53, 102, 100.65, 101.5, 100.4, 101.11, 99.93, 97.7, 97.02, 96.34, 96.11, 99.73, 102.92, 103.91, 105.41, 107.31, 109.74, 108.94, 110.96, 108.18, 108.8], top10Return: 23.8, spyReturn: 8.8, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.51, 104.12, 104.95, 105.46, 106.17, 108.22, 107.63, 107.64, 109.13, 109.79, 109.71, 109.58, 112.64, 114.32, 114.85, 116.84, 115.54, 116.4, 118.57, 118.28, 116.42, 110.87, 111.4, 113.15, 114.99, 116.13, 118.4, 117.05, 121.92, 126.9, 130.25, 130.57, 130.12, 135.13, 138.83, 137.76, 132.01, 128.37, 129.67, 127.87, 130.59, 137.37, 139.94, 140.01, 141.5, 142.97, 145.14, 140.36, 144.59, 141.52, 144.77], spy: [100, 100.53, 103.49, 103.91, 104.21, 105.34, 106.69, 105.72, 106.52, 107.76, 107.62, 107.25, 108.93, 110.55, 111.09, 111.59, 112.5, 111.06, 112.45, 114.78, 114.46, 114.14, 111.5, 112.02, 114.16, 114.41, 114.03, 114.71, 115.08, 115.51, 115.64, 115.41, 116.25, 113.5, 114.12, 115.48, 115.46, 114.12, 111.57, 110.52, 108.06, 109.85, 113.81, 118.95, 119.59, 120.71, 122.54, 125.32, 124.41, 126.71, 123.54, 124.25], top10Return: 44.8, spyReturn: 24.2, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Meme': {
    '1W': { top10: [100, 96.44, 93.79, 99.87, 98.57], spy: [100, 99.71, 98.13, 99.8, 100.34], top10Return: -1.4, spyReturn: 0.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 102.2, 103.19, 99.14, 95.15, 97.29, 103.15, 105.58, 109.11, 110.74, 112.77, 111.25, 111.45, 114.21, 110.2, 99.48, 102.03, 98.4, 95.69, 101.9, 100.57], spy: [100, 100.56, 101.35, 100.13, 100.06, 100.42, 100.62, 101.01, 101.68, 101.66, 102.22, 102.48, 102.76, 102.9, 102.18, 99.91, 100.14, 99.85, 98.27, 99.94, 100.48], top10Return: 0.6, spyReturn: 0.5, xLabels: ["May 16", "May 23", "May 30", "Jun 6", "Jun 13"] },
    '6M': { top10: [100, 100.31, 95.38, 101.51, 101.98, 101.33, 102.86, 90.89, 92.18, 91.8, 92.63, 91.04, 87.8, 90.93, 93.81, 91.17, 98.18, 109.33, 110.94, 110.58, 118.36, 123.59, 128.84, 138.16, 122.34, 122.4], spy: [100, 99.83, 100.89, 101.47, 101.76, 100.53, 102, 100.65, 101.5, 100.4, 101.11, 99.93, 97.7, 97.02, 96.34, 96.11, 99.73, 102.92, 103.91, 105.41, 107.31, 109.74, 108.94, 110.96, 108.18, 108.8], top10Return: 22.4, spyReturn: 8.8, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.92, 102.52, 97.1, 98.55, 94.1, 96.14, 93.31, 87.4, 88.04, 88.21, 86.55, 92.15, 92.27, 89.4, 89.75, 95.12, 94.55, 95.7, 98.88, 98.31, 96.13, 91.49, 88.79, 87.49, 90.05, 86.7, 91.57, 90.32, 93.15, 95.47, 95.69, 94.89, 90.96, 91.67, 88.84, 91.85, 94.92, 97.51, 103.28, 100.54, 97.67, 97.13, 108.5, 114.06, 114.75, 112.61, 123.84, 122.7, 122.31, 110.53, 113.73], spy: [100, 100.53, 103.49, 103.91, 104.21, 105.34, 106.69, 105.72, 106.52, 107.76, 107.62, 107.25, 108.93, 110.55, 111.09, 111.59, 112.5, 111.06, 112.45, 114.78, 114.46, 114.14, 111.5, 112.02, 114.16, 114.41, 114.03, 114.71, 115.08, 115.51, 115.64, 115.41, 116.25, 113.5, 114.12, 115.48, 115.46, 114.12, 111.57, 110.52, 108.06, 109.85, 113.81, 118.95, 119.59, 120.71, 122.54, 125.32, 124.41, 126.71, 123.54, 124.25], top10Return: 13.7, spyReturn: 24.2, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
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
export const SCAN_TIMESTAMP    = '2026-06-13T13:36:27.566Z';
export const SCAN_TIMESTAMP_NY = 'June 13, 2026 at 9:36 AM ET';
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
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 14.59, bestProScore: 6.18, avgProScore: 4.86, price: 981.61, weeklyChange: 3.41 },
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 11.48, bestProScore: 6.18, avgProScore: 3.83, price: 205.19, weeklyChange: -1.65 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 10.83, bestProScore: 4.95, avgProScore: 3.61, price: 511.57, weeklyChange: 4.33 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 5.98, bestProScore: 2.79, avgProScore: 1.99, price: 382.07, weeklyChange: -3.66 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 5.99, bestProScore: 3.24, avgProScore: 3.00, price: 279.70, weeklyChange: -3.17 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 5.33, bestProScore: 3.24, avgProScore: 2.67, price: 294.75, weeklyChange: 0.39 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 5.12, bestProScore: 3.64, avgProScore: 2.56, price: 124.57, weeklyChange: 12.97 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.57, bestProScore: 2.87, avgProScore: 2.29, price: 423.93, weeklyChange: -0.67 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.72, bestProScore: 2.33, avgProScore: 1.86, price: 366.81, weeklyChange: 13.06 },
  { ticker: 'ALAB', name: `Astera Labs Inc`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 3.31, bestProScore: 1.74, avgProScore: 1.66, price: 367.15, weeklyChange: 6.01 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': 3.8, '1M': 13.1, '6M': 110.5, '1Y': 196 },
  ARTY: { '1W': -0.8, '1M': 9.5, '6M': 53.1, '1Y': 93.3 },
  BAI:  { '1W': 2.3, '1M': 4.6, '6M': 45, '1Y': 82.3 },
  IGPT: { '1W': 2.2, '1M': 8.6, '6M': 68.5, '1Y': 111.4 },
  IVES: { '1W': -2, '1M': 2.8, '6M': 16, '1Y': 43.7 },
  ALAI: { '1W': -0.4, '1M': 2.8, '6M': 18.8, '1Y': 49.6 },
  CHAT: { '1W': -0.5, '1M': 10.6, '6M': 56.2, '1Y': 107.8 },
  AIFD: { '1W': 0.5, '1M': 6.5, '6M': 44.3, '1Y': 86.6 },
  SPRX: { '1W': 2.8, '1M': 17.6, '6M': 43.4, '1Y': 106.3 },
  AOTG: { '1W': -0.4, '1M': 3.2, '6M': 11.3, '1Y': 34 },
  // Semiconductors
  SOXX: { '1W': 4.3, '1M': 15.6, '6M': 99.1, '1Y': 169.8 },
  PSI:  { '1W': 10.1, '1M': 12.3, '6M': 110.5, '1Y': 207 },
  XSD:  { '1W': 1.6, '1M': 9.9, '6M': 84.6, '1Y': 155.3 },
  DRAM: { '1W': 7.4, '1M': 26.7, '6M': 134.2, '1Y': 134.2 },
  // Broad Tech
  PTF:  { '1W': 4.2, '1M': 7.3, '6M': 66.7, '1Y': 99.5 },
  WCLD: { '1W': -3.8, '1M': 8.5, '6M': -14.1, '1Y': -11.8 },
  IGV:  { '1W': -5.2, '1M': 1.4, '6M': -16, '1Y': -14.7 },
  FDTX: { '1W': 0.2, '1M': 11.1, '6M': 35.5, '1Y': 49.9 },
  GTEK: { '1W': 1.2, '1M': 8.5, '6M': 48.6, '1Y': 72.3 },
  ARKK: { '1W': -0.3, '1M': -3.3, '6M': -5.9, '1Y': 21.6 },
  MARS: { '1W': -3.8, '1M': -4.5, '6M': 35, '1Y': 35 },
  FRWD: { '1W': 1.2, '1M': 6.2, '6M': 29, '1Y': 29 },
  BCTK: { '1W': 1.2, '1M': 5.6, '6M': 23.9, '1Y': 23.9 },
  FWD:  { '1W': 2.1, '1M': 4.8, '6M': 34.6, '1Y': 68.2 },
  CBSE: { '1W': 2.3, '1M': 1.2, '6M': 23.8, '1Y': 41.8 },
  FCUS: { '1W': 2.1, '1M': 0.5, '6M': 38.7, '1Y': 81.4 },
  WGMI: { '1W': 0.3, '1M': 14.3, '6M': 54.4, '1Y': 249.8 },
  // Electrification
  POW:  { '1W': 1.8, '1M': -6.7, '6M': 50.7, '1Y': 47.8 },
  VOLT: { '1W': 2.3, '1M': -3.5, '6M': 35, '1Y': 61.7 },
  PBD:  { '1W': -0.5, '1M': -4.9, '6M': 25.9, '1Y': 66.8 },
  PBW:  { '1W': -1.9, '1M': -2.3, '6M': 26.7, '1Y': 105.5 },
  IVEP: { '1W': 0.6, '1M': -4.6, '6M': 4.6, '1Y': 4.6 },
  // Industrials
  AIRR: { '1W': 1, '1M': 0.1, '6M': 28.7, '1Y': 66.8 },
  PRN:  { '1W': 3.4, '1M': 0.9, '6M': 38.9, '1Y': 62.4 },
  RSHO: { '1W': 1.8, '1M': 2.4, '6M': 32.2, '1Y': 57.4 },
  IDEF: { '1W': 1.1, '1M': -2, '6M': 5.9, '1Y': 20 },
  BILT: { '1W': 2, '1M': 0.9, '6M': 13.5, '1Y': 17.2 },
  // Meme
  BUZZ: { '1W': -2.5, '1M': -0.2, '6M': 9.2, '1Y': 33.6 },
  MEME: { '1W': -3.1, '1M': -1.5, '6M': 50, '1Y': -0.4 },
  RKNG: { '1W': 1.3, '1M': 3.5, '6M': 8, '1Y': 8 },
};
// @@END_GENERATED:ETF_RETURNS@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 6.18, proScore: 6.18, coverage: 1,
      price: 205.19, weeklyPrices: [208.64, 208.19, 200.42, 204.87, 205.19], weeklyChange: -1.65, sortRank: 0, periodReturns: { '1M': -7.1, '6M': 17.2, '1Y': 44.5 },
      priceHistory: { '1W': [208.64, 208.19, 200.42, 204.87, 205.19], '1M': [220.78, 225.83, 235.74, 225.32, 222.32, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19], '6M': [175.02, 180.99, 188.22, 187.24, 185.81, 183.32, 191.52, 174.19, 190.05, 187.9, 184.89, 183.34, 183.14, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 199.57, 211.5, 235.74, 219.51, 211.14, 205.1, 205.19], '1Y': [141.97, 144.17, 157.99, 160, 170.7, 167.03, 176.75, 180, 182.06, 182.01, 179.81, 170.78, 170.76, 174.88, 178.43, 186.58, 185.54, 188.32, 182.64, 191.49, 206.88, 199.05, 186.6, 182.55, 181.46, 184.97, 176.29, 183.69, 187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 184.89, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 211.5, 235.74, 219.51, 211.14, 205.1, 205.19] },
      velocityScore: { '1D': -2.1, '1W': 11.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.0T', pe: 31.4, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.49,
      etfPresence: { AIS: 2.44, ARTY: 3.56, BAI: 4.36, IGPT: 5.73, IVES: 4.76, ALAI: 13.1, CHAT: 6.82, AIFD: 6.43, SPRX: 3.66, AOTG: 10.91 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 6.85, proScore: 6.17, coverage: 0.9,
      price: 981.61, weeklyPrices: [949.28, 935.89, 891.88, 995.87, 981.61], weeklyChange: 3.41, sortRank: 0, periodReturns: { '1M': 28.1, '6M': 307.1, '1Y': 749.1 },
      priceHistory: { '1W': [949.28, 935.89, 891.88, 995.87, 981.61], '1M': [766.58, 803.63, 776.01, 724.66, 681.54, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61], '6M': [241.14, 265.92, 294.37, 343.43, 338.13, 389.11, 435.28, 379.4, 410.34, 417.35, 415.56, 397.05, 405.35, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 776.01, 762.1, 971, 864.01, 981.61], '1Y': [115.6, 122.08, 123.25, 124.42, 120.11, 109.22, 111.25, 107.77, 123.72, 123.55, 116.42, 118.48, 135.24, 158.82, 166.41, 167.32, 190.96, 192.77, 206.77, 220.1, 234.7, 253.3, 241.95, 223.93, 239.49, 252.42, 237.5, 276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 415.56, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 646.63, 776.01, 762.1, 971, 864.01, 981.61] },
      velocityScore: { '1D': 1, '1W': 8.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 46.3, revenueGrowth: 196, eps: 21.2, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { AIS: 8.03, ARTY: 7.85, BAI: 6.23, IGPT: 12.59, IVES: 6.07, ALAI: 0.94, CHAT: 3.87, AIFD: 6.49, SPRX: false, AOTG: 9.61 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.5, proScore: 4.95, coverage: 0.9,
      price: 511.57, weeklyPrices: [490.33, 475.51, 452.40, 488.45, 511.57], weeklyChange: 4.33, sortRank: 0, periodReturns: { '1M': 14.1, '6M': 142.7, '1Y': 340.4 },
      priceHistory: { '1W': [490.33, 475.51, 452.4, 488.45, 511.57], '1M': [448.29, 445.5, 449.7, 424.1, 420.99, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57], '6M': [210.78, 213.43, 215.61, 214.35, 220.97, 249.8, 252.74, 200.19, 213.58, 203.37, 203.68, 199.45, 197.74, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 354.49, 408.46, 449.7, 449.59, 516.1, 466.38, 511.57], '1Y': [116.16, 129.58, 141.9, 137.82, 155.61, 154.72, 173.66, 176.78, 172.28, 176.14, 163.36, 162.32, 155.82, 160.46, 160.9, 161.79, 203.71, 216.42, 240.56, 259.67, 259.65, 243.98, 240.52, 215.05, 215.24, 221.62, 207.58, 214.95, 215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 203.68, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 408.46, 449.7, 449.59, 516.1, 466.38, 511.57] },
      velocityScore: { '1D': 0.6, '1W': 4.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$834B', pe: 169.4, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.63, ARTY: 7.39, BAI: 4.74, IGPT: 7.12, IVES: 5.06, ALAI: 1.19, CHAT: 4.08, AIFD: false, SPRX: 0.52, AOTG: 14.81 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.48, proScore: 2.79, coverage: 0.8,
      price: 382.07, weeklyPrices: [396.60, 392.16, 372.10, 385.57, 382.07], weeklyChange: -3.66, sortRank: 0, periodReturns: { '1M': -8.9, '6M': 6.2, '1Y': 53.6 },
      priceHistory: { '1W': [396.6, 392.16, 372.1, 385.57, 382.07], '1M': [419.3, 416.79, 439.79, 425.19, 420.71, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07], '6M': [359.93, 340.36, 349.39, 343.77, 354.61, 328.8, 333.24, 308.05, 342.76, 333.99, 321.7, 332.77, 335.97, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 417.43, 412.56, 439.79, 414.57, 446.77, 385.73, 382.07], '1Y': [248.7, 253.77, 275.65, 271.8, 280.94, 278.59, 294.3, 297.72, 303.9, 305.76, 294.23, 298.24, 336.67, 360, 338.94, 329.91, 335.49, 356.7, 349.24, 362.05, 362.55, 358.39, 342.65, 377.96, 381.57, 406.29, 339.81, 341.45, 349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 321.7, 332.77, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 412.56, 439.79, 414.57, 446.77, 385.73, 382.07] },
      velocityScore: { '1D': -2.1, '1W': 7.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63.7, revenueGrowth: 48, eps: 6, grossMargin: 76, dividendYield: 0.68,
      etfPresence: { AIS: 0.67, ARTY: 3.46, BAI: 4.41, IGPT: false, IVES: 4.42, ALAI: 3.79, CHAT: 4.2, AIFD: 5.38, SPRX: false, AOTG: 1.53 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 7, avgWeight: 2.05, proScore: 1.44, coverage: 0.7,
      price: 163.24, weeklyPrices: [156.40, 152.16, 151.76, 156.40, 163.24], weeklyChange: 4.37, sortRank: 0, periodReturns: { '1M': 14.5, '6M': 30.8, '1Y': 76.8 },
      priceHistory: { '1W': [156.4, 152.16, 151.76, 156.4, 163.24], '1M': [142.54, 140.69, 147.81, 141.97, 141.71, 140.49, 148.59, 154.03, 158.01, 154.31, 155.27, 159.47, 170.68, 175.33, 174.37, 154.27, 156.4, 152.16, 151.76, 156.4, 163.24], '6M': [124.76, 131.12, 134.15, 132.58, 129.93, 127.29, 150.15, 130.28, 140.66, 137.23, 130.25, 139.4, 134.03, 136.07, 135.01, 124.85, 146.05, 161.01, 172.55, 172.71, 141.75, 147.81, 148.59, 159.47, 154.27, 163.24], '1Y': [92.35, 91.95, 102.31, 103.39, 107.37, 109.78, 117.55, 120.35, 137.65, 138.04, 133.04, 135.87, 141.91, 142.16, 144.09, 145.71, 149.5, 147.45, 146.48, 156.81, 157.59, 137.26, 127.26, 122.17, 127.22, 130.04, 125.89, 130.73, 132.44, 130.08, 125.09, 138.41, 148.15, 128.67, 135.12, 132.79, 130.25, 139.4, 134.03, 136.26, 122.55, 126.68, 147.35, 164.23, 176.91, 172.7, 141.75, 147.81, 148.59, 159.47, 154.27, 163.24] },
      velocityScore: { '1D': -2.7, '1W': -2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$206B', pe: 56.1, revenueGrowth: 35, eps: 2.91, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.42, ARTY: 2, BAI: 1.38, IGPT: false, IVES: false, ALAI: 0.98, CHAT: 2.24, AIFD: 4.71, SPRX: 1.63, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 7 of 10 AI & ML ETFs (70% coverage) with average weight 2.0% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 6, avgWeight: 4.78, proScore: 2.87, coverage: 0.6,
      price: 423.93, weeklyPrices: [426.80, 427.92, 408.75, 421.07, 423.93], weeklyChange: -0.67, sortRank: 0, periodReturns: { '1M': 6.7, '6M': 45.2, '1Y': 100.8 },
      priceHistory: { '1W': [426.8, 427.92, 408.75, 421.07, 423.93], '1M': [397.28, 399.8, 417.72, 404.35, 395.95, 401.62, 407.15, 404.52, 412.32, 422.73, 424.86, 418.45, 435.63, 446.69, 436.69, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93], '6M': [292.04, 288.95, 300.92, 327.43, 331.21, 326.12, 342.3, 325.74, 374.09, 360.39, 376.81, 353.86, 336.71, 339.57, 347.75, 341.49, 365.49, 363.35, 382.66, 396.06, 414.15, 417.72, 407.15, 418.45, 415.17, 423.93], '1Y': [211.1, 210.32, 226.49, 227.86, 236.95, 234.6, 242.75, 239, 242.09, 241.41, 235.59, 228.39, 250.92, 262.06, 282.71, 279.29, 302.4, 302.89, 297.7, 298.25, 304.86, 295.27, 282.01, 284.64, 292.09, 303.41, 287.74, 293.28, 299.58, 318.68, 327.11, 327.37, 339.55, 330.73, 368.1, 370.54, 376.81, 353.86, 336.71, 338.79, 326.11, 339.04, 370.6, 370.5, 402.46, 397.67, 414.15, 417.72, 407.15, 418.45, 415.17, 423.93] },
      velocityScore: { '1D': -1, '1W': 11.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.2T', pe: 36.5, revenueGrowth: 35, eps: 11.62, grossMargin: 62, dividendYield: 0.9,
      etfPresence: { AIS: 3.17, ARTY: false, BAI: 4.37, IGPT: false, IVES: 5.04, ALAI: 5.59, CHAT: false, AIFD: 3.23, SPRX: false, AOTG: 7.26 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 4.78, proScore: 2.87, coverage: 0.6,
      price: 359.68, weeklyPrices: [363.31, 364.26, 356.38, 357.77, 359.68], weeklyChange: -1, sortRank: 0, periodReturns: { '1M': -7.1, '6M': 16.3, '1Y': 105.9 },
      priceHistory: { '1W': [363.31, 364.26, 356.38, 357.77, 359.68], '1M': [387.35, 402.62, 401.07, 396.78, 396.94, 388.91, 387.66, 382.97, 388.88, 388.83, 390.13, 380.34, 376.37, 361.85, 358.99, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68], '6M': [309.29, 307.16, 313.56, 314.34, 335.97, 328.38, 336.01, 333.04, 310.96, 302.85, 307.38, 300.88, 303.55, 307.69, 290.93, 297.39, 318.49, 336.02, 338.89, 384.8, 397.99, 401.07, 387.66, 380.34, 368.53, 359.68], '1Y': [174.67, 165.19, 176.23, 174.36, 182, 191.34, 192.58, 195.04, 201, 203.5, 208.49, 211.35, 239.63, 251.16, 251.66, 243.1, 250.43, 244.15, 256.55, 269.27, 283.72, 290.1, 285.02, 318.58, 315.81, 317.08, 308.22, 309.78, 313.85, 321.98, 335.84, 330.54, 338.25, 331.25, 309, 314.98, 307.38, 300.88, 303.55, 307.13, 280.92, 295.77, 317.24, 341.68, 344.4, 385.69, 397.99, 401.07, 387.66, 380.34, 368.53, 359.68] },
      velocityScore: { '1D': -0.3, '1W': 13.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.5, revenueGrowth: 22, eps: 13.09, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.44, IGPT: 6.04, IVES: 4.53, ALAI: false, CHAT: 5.43, AIFD: 4.99, SPRX: false, AOTG: 4.23 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 6, avgWeight: 4.59, proScore: 2.75, coverage: 0.6,
      price: 279.7, weeklyPrices: [288.85, 266.88, 252.59, 280.71, 279.70], weeklyChange: -3.17, sortRank: 0, periodReturns: { '1M': 70, '6M': 231.3, '1Y': 316.3 },
      priceHistory: { '1W': [288.85, 266.88, 252.59, 280.71, 279.7], '1M': [164.5, 177.95, 182.58, 176.89, 168.93, 186.8, 190.69, 196.33, 208.26, 198.7, 204.83, 205, 219.43, 290.79, 301.65, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7], '6M': [84.43, 84.09, 85.76, 88.23, 83.05, 82.55, 83.62, 73.73, 81.34, 79.61, 79.29, 75.68, 87.67, 87.62, 98.45, 106.71, 119.93, 133.37, 165.56, 165.15, 160.01, 182.58, 190.69, 205, 263.47, 279.7], '1Y': [67.19, 70.78, 77.4, 71.95, 72.41, 71.99, 75.91, 76.53, 77.28, 76.74, 72.95, 64.6, 66.84, 68.86, 74.62, 84.07, 88.92, 89.39, 85.84, 88.71, 90.37, 93.23, 83.45, 83.79, 92.89, 88.9, 84.26, 84.8, 86.76, 84.64, 81.21, 83.1, 81.34, 74.21, 78.23, 79.48, 79.29, 75.68, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 164.31, 164.95, 160.01, 182.58, 190.69, 205, 263.47, 279.7] },
      velocityScore: { '1D': -2.8, '1W': 3.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$245B', pe: 96.1, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { AIS: 4.45, ARTY: 9.27, BAI: 1.94, IGPT: false, IVES: false, ALAI: false, CHAT: 1.58, AIFD: 6.13, SPRX: 4.16, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 4.03, proScore: 2.01, coverage: 0.5,
      price: 238.55, weeklyPrices: [245.22, 244.19, 238.00, 241.51, 238.55], weeklyChange: -2.72, sortRank: 0, periodReturns: { '1M': -10.3, '6M': 5.5, '1Y': 12.5 },
      priceHistory: { '1W': [245.22, 244.19, 238, 241.51, 238.55], '1M': [265.82, 270.13, 267.22, 264.14, 264.86, 265.01, 268.46, 266.32, 265.29, 271.85, 274, 270.64, 261.26, 256.52, 250.02, 246.03, 245.22, 244.19, 238, 241.51, 238.55], '6M': [226.19, 227.35, 232.07, 240.93, 242.6, 231.31, 243.01, 232.99, 204.08, 204.86, 207.92, 218.94, 209.53, 209.87, 211.71, 210.57, 233.65, 249.7, 255.08, 265.06, 271.17, 267.22, 268.46, 270.64, 246.03, 238.55], '1Y': [212.1, 208.47, 219.39, 219.36, 226.35, 227.47, 232.79, 211.65, 221.3, 231.49, 227.94, 225.34, 238.24, 234.05, 220.71, 219.57, 220.9, 220.07, 216.48, 226.97, 254, 248.4, 232.87, 226.28, 234.42, 227.92, 222.54, 228.43, 232.53, 241.56, 236.65, 234.34, 241.73, 222.69, 199.6, 210.11, 207.92, 218.94, 209.53, 208.76, 207.54, 209.77, 238.38, 250.56, 263.99, 268.26, 271.17, 267.22, 268.46, 270.64, 246.03, 238.55] },
      velocityScore: { '1D': -2, '1W': 7.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 31.6, revenueGrowth: 17, eps: 7.54, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 4.34, ALAI: 5.66, CHAT: 2.44, AIFD: 3.44, SPRX: false, AOTG: 4.25 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.52, proScore: 1.76, coverage: 0.5,
      price: 390.74, weeklyPrices: [411.74, 403.41, 397.36, 390.34, 390.74], weeklyChange: -5.1, sortRank: 0, periodReturns: { '1M': -4.2, '6M': -18.3, '1Y': -17.7 },
      priceHistory: { '1W': [411.74, 403.41, 397.36, 390.34, 390.74], '1M': [407.77, 405.21, 409.43, 421.92, 423.54, 421.06, 419.09, 418.57, 416.03, 412.67, 426.99, 450.24, 460.52, 441.31, 427.34, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74], '6M': [478.53, 485.92, 487.1, 478.51, 470.67, 444.11, 481.63, 414.19, 404.37, 398.46, 401.72, 410.68, 401.86, 391.79, 371.04, 369.37, 373.07, 420.26, 415.75, 407.78, 420.77, 409.43, 419.09, 450.24, 416.67, 390.74], '1Y': [474.96, 486, 497.41, 496.62, 505.82, 505.27, 512.5, 535.64, 521.77, 517.1, 504.26, 505.12, 498.41, 509.04, 509.23, 517.95, 528.57, 514.05, 516.79, 531.52, 517.03, 506, 507.49, 474, 490, 492.02, 474.82, 484.92, 487.48, 483.47, 459.38, 451.14, 433.5, 393.67, 401.84, 397.23, 401.72, 410.68, 401.86, 389.02, 365.97, 373.46, 370.87, 422.79, 424.62, 414.44, 420.77, 409.43, 419.09, 450.24, 416.67, 390.74] },
      velocityScore: { '1D': -1.1, '1W': 4.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 23.3, revenueGrowth: 18, eps: 16.8, grossMargin: 68, dividendYield: 0.93,
      etfPresence: { AIS: false, ARTY: 1.73, BAI: false, IGPT: false, IVES: 4.56, ALAI: 5.17, CHAT: 2.27, AIFD: false, SPRX: false, AOTG: 3.87 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 3.26, proScore: 1.63, coverage: 0.5,
      price: 566.98, weeklyPrices: [585.39, 584.59, 570.98, 568.43, 566.98], weeklyChange: -3.14, sortRank: 0, periodReturns: { '1M': -6, '6M': -12, '1Y': -17 },
      priceHistory: { '1W': [585.39, 584.59, 570.98, 568.43, 566.98], '1M': [603, 616.63, 618.43, 614.23, 611.21, 605.06, 607.38, 610.26, 612.34, 635.26, 635.29, 632.51, 600.47, 597.63, 622.98, 593, 585.39, 584.59, 570.98, 568.43, 566.98], '6M': [644.23, 658.77, 658.69, 660.62, 631.09, 612.96, 668.73, 668.99, 668.69, 644.78, 657.01, 660.57, 638.18, 615.68, 594.89, 579.23, 628.39, 676.87, 659.15, 611.91, 616.81, 618.43, 607.38, 632.51, 593, 566.98], '1Y': [682.87, 698.53, 738.09, 720.67, 710.39, 704.81, 717.63, 776.37, 765.87, 767.37, 753.3, 735.11, 765.7, 779, 755.4, 734.38, 715.66, 715.7, 732.17, 750.82, 637.71, 631.76, 602.01, 613.05, 647.1, 656.96, 647.51, 661.5, 665.95, 648.69, 615.52, 647.63, 738.31, 670.21, 649.81, 655.66, 657.01, 660.57, 638.18, 606.7, 547.54, 574.46, 629.86, 688.55, 675.03, 608.75, 616.81, 618.43, 607.38, 632.51, 593, 566.98] },
      velocityScore: { '1D': -1.2, '1W': 3.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.4T', pe: 20.6, revenueGrowth: 33, eps: 27.5, grossMargin: 82, dividendYield: 0.37,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 4.56, IVES: 4.39, ALAI: 4.04, CHAT: 2.12, AIFD: false, SPRX: false, AOTG: 1.18 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.14, proScore: 1.57, coverage: 0.5,
      price: 367.15, weeklyPrices: [346.33, 341.70, 330.86, 367.47, 367.15], weeklyChange: 6.01, sortRank: 0, periodReturns: { '1M': 79.6, '6M': 146.7, '1Y': 309.2 },
      priceHistory: { '1W': [346.33, 341.7, 330.86, 367.47, 367.15], '1M': [204.42, 224.09, 228.64, 232.68, 215.58, 287.48, 297.84, 306.88, 318.72, 325.33, 349.17, 342.85, 320.09, 355.76, 363.54, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15], '6M': [148.85, 164.4, 170.1, 161.01, 180.56, 176.01, 167.9, 144.67, 143.71, 132.62, 124.67, 120, 119.9, 126.34, 120.33, 106.33, 129.46, 170.81, 197.54, 194.74, 195.65, 228.64, 297.84, 342.85, 317.06, 367.15], '1Y': [89.73, 85.95, 90.42, 92.3, 92.36, 116.91, 124.05, 137.93, 179.43, 186.43, 174.15, 174.24, 214.49, 238.79, 230.11, 195.8, 220.81, 199.53, 156.31, 170.28, 191.56, 173.74, 141.39, 147.75, 142.94, 167.08, 143.66, 172.62, 170.84, 165.77, 172.14, 176.35, 160.46, 142.82, 126.58, 129.68, 124.67, 120, 119.9, 126.16, 113.61, 117.14, 149.05, 174.05, 212.84, 202.68, 195.65, 228.64, 297.84, 342.85, 317.06, 367.15] },
      velocityScore: { '1D': -1.3, '1W': 6.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$63B', pe: 249.8, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 1.92, ARTY: 1.83, BAI: false, IGPT: false, IVES: false, ALAI: 1.5, CHAT: 2.68, AIFD: false, SPRX: 7.76, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 5, avgWeight: 2.94, proScore: 1.47, coverage: 0.5,
      price: 921.56, weeklyPrices: [895.40, 821.76, 853.26, 889.59, 921.56], weeklyChange: 2.92, sortRank: 0, periodReturns: { '1M': -7.1, '6M': 184.1, '1Y': 1017.5 },
      priceHistory: { '1W': [895.4, 821.76, 853.26, 889.59, 921.56], '1M': [992.37, 1030.37, 1001.81, 970.7, 884.98, 868.07, 964.5, 946.9, 910.81, 902.31, 860.62, 854.96, 905, 1029.15, 938, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56], '6M': [324.35, 371.43, 372.61, 397.42, 361.33, 362.44, 385, 465.54, 574.11, 635.64, 677, 650.82, 616.09, 700.81, 777.17, 764.65, 894.13, 891.22, 846.89, 902.32, 892.58, 1001.81, 964.5, 854.96, 863.66, 921.56], '1Y': [82.46, 89.16, 95.06, 91.31, 98.14, 99.63, 107.17, 111.13, 115.03, 118.98, 123.42, 132.55, 151.73, 170.9, 163.99, 162.71, 160.6, 160.56, 161, 193.8, 199.58, 259.89, 242.07, 299.36, 302.81, 360.33, 334.69, 389.88, 371.18, 392.88, 331.62, 354.49, 381.44, 504.42, 583.46, 667.77, 677, 650.82, 616.09, 772.13, 688.8, 826.88, 897.3, 894.07, 881.64, 949.93, 892.58, 1001.81, 964.5, 854.96, 863.66, 921.56] },
      velocityScore: { '1D': 8.1, '1W': 15.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$72B', pe: 161.4, revenueGrowth: 90, eps: 5.71, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.85, IGPT: false, IVES: false, ALAI: 0.45, CHAT: 1.57, AIFD: 6.1, SPRX: 3.74, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 5 of 10 AI & ML ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'Credo Technology Group Holding Ltd', easyScore: 5, avgWeight: 1.97, proScore: 0.99, coverage: 0.5,
      price: 250.81, weeklyPrices: [222.27, 234.32, 237.68, 264.76, 250.81], weeklyChange: 12.84, sortRank: 0, periodReturns: { '1M': 26.3, '6M': 74.3, '1Y': 241.3 },
      priceHistory: { '1W': [222.27, 234.32, 237.68, 264.76, 250.81], '1M': [198.57, 189.36, 184.54, 172.17, 156.27, 182.98, 193.39, 218.41, 221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81], '6M': [143.91, 150.13, 144.7, 132.95, 161.38, 139.16, 129.66, 96.95, 128.4, 130.66, 114.48, 114.74, 111.57, 101.72, 103.91, 95.92, 107.93, 158.93, 185.54, 174.01, 188.29, 184.54, 193.39, 236.03, 206.89, 250.81], '1Y': [73.49, 84.57, 92.59, 93.36, 102.59, 92.93, 107.95, 114.7, 118.57, 118.74, 115.41, 124.27, 149.03, 164.42, 162.26, 145.61, 147.42, 149.9, 151.66, 154.96, 180.64, 170.16, 145.58, 150.85, 188.44, 170.29, 142.02, 149.94, 144.92, 141, 156.84, 135.1, 129.47, 98.06, 121.78, 124.06, 114.48, 114.74, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 184.38, 188.29, 184.54, 193.39, 236.03, 206.89, 250.81] },
      velocityScore: { '1D': -1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$46B', pe: 137.1, revenueGrowth: 157, eps: 1.83, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: 0.84, ARTY: 1.43, BAI: 2.26, IGPT: false, IVES: false, ALAI: false, CHAT: 2.25, AIFD: false, SPRX: 3.09, AOTG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 4, avgWeight: 3.71, proScore: 1.48, coverage: 0.4,
      price: 124.57, weeklyPrices: [110.27, 107.92, 107.04, 116.96, 124.57], weeklyChange: 12.97, sortRank: 0, periodReturns: { '1M': 3.3, '6M': 229.5, '1Y': 518.5 },
      priceHistory: { '1W': [110.27, 107.92, 107.04, 116.96, 124.57], '1M': [120.61, 120.29, 115.93, 108.77, 108.17, 118.96, 118.5, 119.84, 123.52, 121.77, 120.89, 114.68, 109.33, 107.93, 112.71, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57], '6M': [37.81, 36.82, 36.68, 40.04, 47.29, 54.25, 48.78, 48.6, 48.29, 44.62, 45.46, 45.95, 45.25, 45.03, 47.18, 48.03, 61.72, 68.5, 66.78, 94.48, 109.62, 115.93, 118.5, 114.68, 99.17, 124.57], '1Y': [20.14, 21.19, 22.4, 23.59, 22.92, 23.24, 20.68, 19.5, 20.65, 23.66, 24.55, 24.21, 24.44, 25.27, 29.34, 33.55, 36.59, 37.22, 38.1, 39.54, 39.5, 38.45, 34.71, 35.79, 43.47, 40.5, 37.51, 36.37, 37.3, 42.63, 48.72, 54.32, 48.66, 48.24, 46.48, 44.11, 45.46, 45.95, 45.25, 46.18, 44.1, 50.38, 62.38, 68.5, 82.54, 99.62, 109.62, 115.93, 118.5, 114.68, 99.17, 124.57] },
      velocityScore: { '1D': 1.4, '1W': 34.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$626B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.43, ARTY: false, BAI: 3, IGPT: 7.09, IVES: false, ALAI: false, CHAT: 1.3, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'ARM', name: 'ARM Holdings PLC', easyScore: 4, avgWeight: 3.26, proScore: 1.3, coverage: 0.4,
      price: 380.81, weeklyPrices: [346.39, 324.86, 307.43, 342.23, 380.81], weeklyChange: 9.94, sortRank: 0, periodReturns: { '1M': 83.2, '6M': 190.9, '1Y': 180.9 },
      priceHistory: { '1W': [346.39, 324.86, 307.43, 342.23, 380.81], '1M': [207.92, 221.21, 228.5, 209.16, 215.12, 256.73, 298.23, 306.51, 321.22, 302.71, 335.27, 353.29, 408.85, 402.71, 411.83, 342.93, 346.39, 324.86, 307.43, 342.23, 380.81], '6M': [130.89, 114.03, 110.51, 115.53, 107.84, 113.92, 109.96, 104.9, 125.28, 126.93, 129.26, 120.62, 115.12, 128.36, 157.07, 155.07, 149.79, 162.33, 204.61, 210.32, 213.31, 228.5, 298.23, 353.29, 342.93, 380.81], '1Y': [135.55, 149.33, 161.74, 147.79, 147.11, 156.5, 164.37, 140.05, 141.05, 141.06, 137.78, 132.34, 140.8, 153.85, 140.99, 141.49, 156.22, 171.94, 171.5, 178.62, 168.68, 154.84, 140.26, 134.71, 136.48, 141.93, 124.37, 113.29, 110.86, 115.68, 104.99, 119.2, 108.43, 110.88, 122.19, 125.58, 129.26, 120.62, 115.12, 129.82, 154.8, 149.11, 148.93, 166.73, 234.81, 211.18, 213.31, 228.5, 298.23, 353.29, 342.93, 380.81] },
      velocityScore: { '1D': null, '1W': -7.8, '1M': null, '6M': null }, isNew: true,
      marketCap: '$407B', pe: 453.3, revenueGrowth: 20, eps: 0.84, grossMargin: 98, dividendYield: null,
      etfPresence: { AIS: 2.29, ARTY: false, BAI: false, IGPT: false, IVES: false, ALAI: 0.51, CHAT: 2.96, AIFD: false, SPRX: 7.27, AOTG: false },
      tonyNote: 'Arm Holdings is held across Broad Tech and AI ETFs as the CPU architecture licensor embedded in every mobile device and increasingly in AI inference chips and data center CPUs. Revenue grew and the royalty model is high-margin; the weight score reflects consistent institutional positioning as the AI chip design ecosystem expands on Arm cores.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 4, avgWeight: 3.08, proScore: 1.23, coverage: 0.4,
      price: 184.13, weeklyPrices: [211.82, 205.81, 201.26, 184.10, 184.13], weeklyChange: -13.07, sortRank: 0, periodReturns: { '1M': -1.4, '6M': -3.1, '1Y': -14.4 },
      priceHistory: { '1W': [211.82, 205.81, 201.26, 184.1, 184.13], '1M': [186.83, 189.76, 195.61, 192.95, 186.61, 188.16, 189.77, 192.08, 193.06, 190.96, 203.7, 225.78, 248.15, 244.58, 230.33, 213.68, 211.82, 205.81, 201.26, 184.1, 184.13], '6M': [189.97, 191.97, 195.38, 193.75, 202.29, 173.88, 172.8, 146.67, 157.16, 156.54, 150.31, 154.79, 159.16, 152.9, 146.02, 145.23, 137.86, 178.34, 176.28, 161.39, 194.59, 195.61, 189.77, 225.78, 213.68, 184.13], '1Y': [215.22, 207.04, 218.63, 234.5, 234.96, 238.11, 247.71, 252.53, 252.68, 249.07, 235.41, 225.3, 241.51, 306.65, 313.83, 281.24, 291.59, 308.01, 277.18, 281.4, 257.85, 240.83, 219.86, 200.28, 201.1, 221.53, 184.92, 198.38, 197.21, 192.84, 193.61, 178.18, 169.01, 136.48, 156.48, 148.08, 150.31, 154.79, 159.16, 155.52, 142.81, 146.38, 138.09, 175.06, 173.28, 171.83, 194.59, 195.61, 189.77, 225.78, 213.68, 184.13] },
      velocityScore: { '1D': 0, '1W': -2.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$530B', pe: 31.5, revenueGrowth: 21, eps: 5.84, grossMargin: 66, dividendYield: 1.09,
      etfPresence: { AIS: false, ARTY: 3.72, BAI: false, IGPT: false, IVES: 3.73, ALAI: false, CHAT: 1.66, AIFD: false, SPRX: false, AOTG: 3.21 },
      tonyNote: 'Oracle lands in 3 AI ETFs on the strength of its cloud database and AI infrastructure contracts. Revenue grew 22%, 67% gross margin, P/E of 40x. The 17.5% weekly return following a major earnings beat shows how quickly sentiment can reprice; the weight score at 2.04% is still modest, meaning ETF managers have started building positions but conviction is not yet deep.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 4, avgWeight: 2.96, proScore: 1.18, coverage: 0.4,
      price: 562.92, weeklyPrices: [526.93, 517.72, 490.09, 529.29, 562.92], weeklyChange: 6.83, sortRank: 0, periodReturns: { '1M': 15.2, '6M': 219.2, '1Y': 910.6 },
      priceHistory: { '1W': [526.93, 517.72, 490.09, 529.29, 562.92], '1M': [488.74, 494.09, 489.15, 482.02, 458.68, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 511.72, 526.93, 517.72, 490.09, 529.29, 562.92], '6M': [176.34, 181.08, 179.68, 219.38, 214, 241.9, 279.7, 269.41, 273.74, 284.67, 282.25, 259.03, 261.18, 304.9, 296.14, 297.73, 337.88, 361.69, 403.12, 434.52, 463.91, 489.15, 486.46, 531.21, 511.72, 562.92], '1Y': [55.7, 60.38, 63.99, 64.02, 67.53, 67.06, 68.99, 77.29, 74.64, 76.29, 79.22, 81.91, 94.54, 103.09, 110.25, 120.06, 125.28, 118.86, 121.53, 126.67, 158.02, 174.22, 162.45, 150.93, 159.99, 169.54, 172.04, 176.76, 176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 282.25, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 463.91, 489.15, 486.46, 531.21, 511.72, 562.92] },
      velocityScore: { '1D': 2.6, '1W': -4.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$194B', pe: 33.7, revenueGrowth: 46, eps: 16.72, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { AIS: 1.59, ARTY: 2.72, BAI: 2.91, IGPT: false, IVES: false, ALAI: 4.61, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, avgWeight: 2.89, proScore: 1.16, coverage: 0.4,
      price: 302.87, weeklyPrices: [300.57, 289.52, 280.98, 297.88, 302.87], weeklyChange: 0.77, sortRank: 0, periodReturns: { '1M': -17.5, '6M': 87.8, '1Y': 172.9 },
      priceHistory: { '1W': [300.57, 289.52, 280.98, 297.88, 302.87], '1M': [367.13, 369.99, 376.23, 370.94, 339.73, 315.67, 323.4, 327.46, 323.91, 319.78, 314.18, 315.71, 323.39, 334.49, 331.44, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87], '6M': [161.27, 159.82, 165.62, 174.95, 172.72, 181.47, 193.76, 182.56, 248.51, 243.06, 259.23, 249.75, 265.38, 264.71, 276.16, 259.37, 287.64, 294.13, 321.75, 328.49, 340.01, 376.23, 323.4, 315.71, 300.51, 302.87], '1Y': [110.97, 116.54, 128.41, 125.89, 127.37, 125.29, 142.55, 140.2, 139.83, 135.69, 125.02, 124.01, 125.58, 136.65, 142.61, 150.86, 162.8, 179, 175.73, 192.9, 191.4, 187.84, 166.65, 168.91, 180.91, 178.38, 161.74, 166.25, 164.34, 171.54, 170.86, 181.12, 195.1, 177.75, 236.51, 243.75, 259.23, 249.75, 265.38, 269.17, 252.4, 261.29, 295.11, 307.34, 323.46, 328.31, 340.01, 376.23, 323.4, 315.71, 300.51, 302.87] },
      velocityScore: { '1D': 0.9, '1W': -12.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$116B', pe: 76.3, revenueGrowth: 30, eps: 3.97, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.6, ARTY: false, BAI: 1.88, IGPT: false, IVES: false, ALAI: false, CHAT: 2.2, AIFD: 3.88, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, avgWeight: 2.86, proScore: 1.14, coverage: 0.4,
      price: 931.04, weeklyPrices: [876.77, 846.01, 815.99, 868.09, 931.04], weeklyChange: 6.19, sortRank: 0, periodReturns: { '1M': 15.1, '6M': 223.7, '1Y': 631.5 },
      priceHistory: { '1W': [876.77, 846.01, 815.99, 868.09, 931.04], '1M': [808.8, 817.35, 804.76, 795.47, 740.84, 751.07, 810.46, 812.73, 845.76, 870.66, 880.72, 879.8, 921.26, 926.61, 940.69, 847.47, 876.77, 846.01, 815.99, 868.09, 931.04], '6M': [287.64, 296.36, 281.3, 330.42, 318.44, 344.22, 442.93, 418.63, 407.25, 408.97, 409.67, 367.34, 373.98, 406.77, 413.22, 423.12, 500.77, 531.81, 587.62, 673.64, 766.44, 804.76, 810.46, 879.8, 847.47, 931.04], '1Y': [127.27, 133.08, 144.33, 144.47, 149.05, 146.59, 150.46, 154.81, 151.69, 158.7, 164, 170.5, 191.59, 211.13, 228.13, 236.06, 242.83, 219.51, 214.4, 230.32, 265.55, 293.99, 261.38, 253.38, 266.87, 282.86, 285.58, 282.85, 280.08, 308.26, 312.28, 346.53, 446.57, 405.45, 431.17, 411.11, 409.67, 367.34, 373.98, 434.6, 378.79, 429.36, 503.13, 547.75, 586.25, 726.93, 766.44, 804.76, 810.46, 879.8, 847.47, 931.04] },
      velocityScore: { '1D': 2.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$211B', pe: 88.5, revenueGrowth: 44, eps: 10.52, grossMargin: 42, dividendYield: 0.32,
      etfPresence: { AIS: 2.83, ARTY: 3.05, BAI: false, IGPT: 3.3, IVES: false, ALAI: 2.25, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 6.18, proScore: 6.18, coverage: 1,
      price: 981.61, weeklyPrices: [949.28, 935.89, 891.88, 995.87, 981.61], weeklyChange: 3.41, sortRank: 0, periodReturns: { '1M': 28.1, '6M': 307.1, '1Y': 749.1 },
      priceHistory: { '1W': [949.28, 935.89, 891.88, 995.87, 981.61], '1M': [766.58, 803.63, 776.01, 724.66, 681.54, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61], '6M': [241.14, 265.92, 294.37, 343.43, 338.13, 389.11, 435.28, 379.4, 410.34, 417.35, 415.56, 397.05, 405.35, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 776.01, 762.1, 971, 864.01, 981.61], '1Y': [115.6, 122.08, 123.25, 124.42, 120.11, 109.22, 111.25, 107.77, 123.72, 123.55, 116.42, 118.48, 135.24, 158.82, 166.41, 167.32, 190.96, 192.77, 206.77, 220.1, 234.7, 253.3, 241.95, 223.93, 239.49, 252.42, 237.5, 276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 415.56, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 646.63, 776.01, 762.1, 971, 864.01, 981.61] },
      velocityScore: { '1D': -1.1, '1W': 1.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 46.3, revenueGrowth: 196, eps: 21.2, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { SOXX: 11.55, PSI: 5.54, XSD: 3.63, DRAM: 4.01 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.72, proScore: 4.29, coverage: 0.75,
      price: 511.57, weeklyPrices: [490.33, 475.51, 452.40, 488.45, 511.57], weeklyChange: 4.33, sortRank: 0, periodReturns: { '1M': 14.1, '6M': 142.7, '1Y': 340.4 },
      priceHistory: { '1W': [490.33, 475.51, 452.4, 488.45, 511.57], '1M': [448.29, 445.5, 449.7, 424.1, 420.99, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57], '6M': [210.78, 213.43, 215.61, 214.35, 220.97, 249.8, 252.74, 200.19, 213.58, 203.37, 203.68, 199.45, 197.74, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 354.49, 408.46, 449.7, 449.59, 516.1, 466.38, 511.57], '1Y': [116.16, 129.58, 141.9, 137.82, 155.61, 154.72, 173.66, 176.78, 172.28, 176.14, 163.36, 162.32, 155.82, 160.46, 160.9, 161.79, 203.71, 216.42, 240.56, 259.67, 259.65, 243.98, 240.52, 215.05, 215.24, 221.62, 207.58, 214.95, 215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 203.68, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 408.46, 449.7, 449.59, 516.1, 466.38, 511.57] },
      velocityScore: { '1D': 0, '1W': -4.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$834B', pe: 169.4, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 8.7, PSI: 4.83, XSD: 3.63, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.86, proScore: 3.64, coverage: 0.75,
      price: 124.57, weeklyPrices: [110.27, 107.92, 107.04, 116.96, 124.57], weeklyChange: 12.97, sortRank: 0, periodReturns: { '1M': 3.3, '6M': 229.5, '1Y': 518.5 },
      priceHistory: { '1W': [110.27, 107.92, 107.04, 116.96, 124.57], '1M': [120.61, 120.29, 115.93, 108.77, 108.17, 118.96, 118.5, 119.84, 123.52, 121.77, 120.89, 114.68, 109.33, 107.93, 112.71, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57], '6M': [37.81, 36.82, 36.68, 40.04, 47.29, 54.25, 48.78, 48.6, 48.29, 44.62, 45.46, 45.95, 45.25, 45.03, 47.18, 48.03, 61.72, 68.5, 66.78, 94.48, 109.62, 115.93, 118.5, 114.68, 99.17, 124.57], '1Y': [20.14, 21.19, 22.4, 23.59, 22.92, 23.24, 20.68, 19.5, 20.65, 23.66, 24.55, 24.21, 24.44, 25.27, 29.34, 33.55, 36.59, 37.22, 38.1, 39.54, 39.5, 38.45, 34.71, 35.79, 43.47, 40.5, 37.51, 36.37, 37.3, 42.63, 48.72, 54.32, 48.66, 48.24, 46.48, 44.11, 45.46, 45.95, 45.25, 46.18, 44.1, 50.38, 62.38, 68.5, 82.54, 99.62, 109.62, 115.93, 118.5, 114.68, 99.17, 124.57] },
      velocityScore: { '1D': 0, '1W': 7.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$626B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.13, PSI: 4.72, XSD: 3.72, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 3.99, proScore: 2.99, coverage: 0.75,
      price: 205.19, weeklyPrices: [208.64, 208.19, 200.42, 204.87, 205.19], weeklyChange: -1.65, sortRank: 0, periodReturns: { '1M': -7.1, '6M': 17.2, '1Y': 44.5 },
      priceHistory: { '1W': [208.64, 208.19, 200.42, 204.87, 205.19], '1M': [220.78, 225.83, 235.74, 225.32, 222.32, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19], '6M': [175.02, 180.99, 188.22, 187.24, 185.81, 183.32, 191.52, 174.19, 190.05, 187.9, 184.89, 183.34, 183.14, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 199.57, 211.5, 235.74, 219.51, 211.14, 205.1, 205.19], '1Y': [141.97, 144.17, 157.99, 160, 170.7, 167.03, 176.75, 180, 182.06, 182.01, 179.81, 170.78, 170.76, 174.88, 178.43, 186.58, 185.54, 188.32, 182.64, 191.49, 206.88, 199.05, 186.6, 182.55, 181.46, 184.97, 176.29, 183.69, 187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 184.89, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 211.5, 235.74, 219.51, 211.14, 205.1, 205.19] },
      velocityScore: { '1D': 0, '1W': -4.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.0T', pe: 31.4, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.49,
      etfPresence: { SOXX: 5.53, PSI: 4.76, XSD: 1.68, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.21, proScore: 2.41, coverage: 0.75,
      price: 417.79, weeklyPrices: [403.89, 404.62, 392.67, 412.13, 417.79], weeklyChange: 3.44, sortRank: 0, periodReturns: { '1M': -0.4, '6M': 49.6, '1Y': 85.7 },
      priceHistory: { '1W': [403.89, 404.62, 392.67, 412.13, 417.79], '1M': [419.65, 432.39, 426.79, 417.49, 418.58, 398.05, 384.21, 397.07, 419.94, 416.88, 419.01, 413.85, 402.69, 423.2, 437.67, 401.39, 403.89, 404.62, 392.67, 412.13, 417.79], '6M': [279.32, 274.44, 275.63, 292.94, 296.21, 304.97, 317.63, 320.44, 337, 345.3, 354.35, 329.72, 307.27, 308.59, 322.03, 320.58, 351.36, 353.8, 403.88, 402.26, 408.52, 426.79, 384.21, 413.85, 401.39, 417.79], '1Y': [225.03, 230.98, 238.02, 245.15, 240.42, 235.5, 230.77, 222.4, 224.07, 231.55, 254.49, 248.32, 248.18, 244.1, 246.78, 245.7, 242.5, 234.67, 246.22, 243.01, 233.61, 232, 229.94, 239.4, 272.97, 276.24, 280.44, 275.82, 274.82, 292.89, 297.99, 308.52, 318.7, 322.12, 331.36, 355.03, 354.35, 329.72, 307.27, 310.44, 313.42, 318.34, 350.14, 371.45, 399.57, 397.69, 408.52, 426.79, 384.21, 413.85, 401.39, 417.79] },
      velocityScore: { '1D': 0, '1W': -2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$204B', pe: 62.1, revenueGrowth: 37, eps: 6.73, grossMargin: 64, dividendYield: 1.05,
      etfPresence: { SOXX: 2.77, PSI: 4.9, XSD: 1.97, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 6.48, proScore: 3.24, coverage: 0.5,
      price: 279.7, weeklyPrices: [288.85, 266.88, 252.59, 280.71, 279.70], weeklyChange: -3.17, sortRank: 0, periodReturns: { '1M': 70, '6M': 231.3, '1Y': 316.3 },
      priceHistory: { '1W': [288.85, 266.88, 252.59, 280.71, 279.7], '1M': [164.5, 177.95, 182.58, 176.89, 168.93, 186.8, 190.69, 196.33, 208.26, 198.7, 204.83, 205, 219.43, 290.79, 301.65, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7], '6M': [84.43, 84.09, 85.76, 88.23, 83.05, 82.55, 83.62, 73.73, 81.34, 79.61, 79.29, 75.68, 87.67, 87.62, 98.45, 106.71, 119.93, 133.37, 165.56, 165.15, 160.01, 182.58, 190.69, 205, 263.47, 279.7], '1Y': [67.19, 70.78, 77.4, 71.95, 72.41, 71.99, 75.91, 76.53, 77.28, 76.74, 72.95, 64.6, 66.84, 68.86, 74.62, 84.07, 88.92, 89.39, 85.84, 88.71, 90.37, 93.23, 83.45, 83.79, 92.89, 88.9, 84.26, 84.8, 86.76, 84.64, 81.21, 83.1, 81.34, 74.21, 78.23, 79.48, 79.29, 75.68, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 164.31, 164.95, 160.01, 182.58, 190.69, 205, 263.47, 279.7] },
      velocityScore: { '1D': 0, '1W': -7.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$245B', pe: 96.1, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { SOXX: 8.22, PSI: false, XSD: 4.73, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 5.67, proScore: 2.84, coverage: 0.5,
      price: 567.25, weeklyPrices: [492.17, 499.21, 497.01, 552.64, 567.25], weeklyChange: 15.25, sortRank: 0, periodReturns: { '1M': 31.6, '6M': 118.8, '1Y': 232.5 },
      priceHistory: { '1W': [492.17, 499.21, 497.01, 552.64, 567.25], '1M': [431.2, 436.61, 440.56, 436.62, 413.57, 426.85, 427.36, 432.16, 454.89, 448.25, 449.68, 450.06, 458.17, 490.05, 500.77, 453.01, 492.17, 499.21, 497.01, 552.64, 567.25], '6M': [259.21, 256.41, 263.05, 296.01, 304.87, 325.24, 336.75, 297.6, 339.88, 369.83, 375.72, 346.53, 337.27, 349.47, 369.34, 353.8, 397.81, 389.9, 403.91, 394.49, 410.64, 440.56, 427.36, 450.06, 453.01, 567.25], '1Y': [170.59, 171.96, 183.07, 194.99, 199.29, 187.14, 190.27, 182.82, 184.38, 163.53, 161.99, 157.57, 163.5, 173.54, 200.87, 204.74, 223.91, 219.48, 228.13, 231.33, 237.71, 235.08, 228.71, 230.91, 265.33, 267.14, 261.27, 259.01, 259.97, 292.2, 301.89, 318.79, 341.34, 303.99, 328.39, 375.38, 375.72, 346.53, 337.27, 357.21, 338.55, 348.47, 399.49, 396.94, 417.04, 389.08, 410.64, 440.56, 427.36, 450.06, 453.01, 567.25] },
      velocityScore: { '1D': 0, '1W': 10.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$450B', pe: 53.5, revenueGrowth: 11, eps: 10.61, grossMargin: 49, dividendYield: 0.37,
      etfPresence: { SOXX: 5.3, PSI: 6.05, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 4.88, proScore: 2.44, coverage: 0.5,
      price: 254.54, weeklyPrices: [210.81, 213.94, 213.56, 241.16, 254.54], weeklyChange: 20.75, sortRank: 0, periodReturns: { '1M': 40.5, '6M': 113.2, '1Y': 193.4 },
      priceHistory: { '1W': [210.81, 213.94, 213.56, 241.16, 254.54], '1M': [181.13, 184.97, 189.29, 180.43, 175.65, 182.95, 184.22, 188.84, 201.14, 195.72, 192.76, 192.17, 194, 204.52, 212.51, 192.92, 210.81, 213.94, 213.56, 241.16, 254.54], '6M': [119.39, 124.57, 126.04, 139.5, 144.18, 152, 162.72, 130.72, 147.95, 146.99, 152.43, 142.94, 140.96, 148.24, 154.38, 151.98, 172.73, 173.49, 181.54, 175.04, 176.32, 189.29, 184.22, 192.17, 192.92, 254.54], '1Y': [86.77, 85.63, 89.57, 91.92, 93.65, 89.22, 92.32, 91.56, 91.02, 88.34, 87.96, 84.64, 91.77, 99.06, 107.12, 107.86, 113.97, 102.5, 115.29, 121.51, 121.91, 121.79, 113.37, 113.67, 118.99, 122.56, 122.51, 126.57, 124.36, 135.97, 143.45, 150, 168.47, 133.1, 145.09, 149.6, 152.43, 142.94, 140.96, 151.15, 145.11, 151.68, 173.73, 179.14, 193.5, 172.63, 176.32, 189.29, 184.22, 192.17, 192.92, 254.54] },
      velocityScore: { '1D': 0, '1W': 13.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$332B', pe: 71.9, revenueGrowth: 12, eps: 3.54, grossMargin: 61, dividendYield: 0.36,
      etfPresence: { SOXX: 3.78, PSI: 5.97, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 4.65, proScore: 2.33, coverage: 0.5,
      price: 366.81, weeklyPrices: [324.45, 327.16, 321.80, 362.52, 366.81], weeklyChange: 13.06, sortRank: 0, periodReturns: { '1M': 26.8, '6M': 128.5, '1Y': 309.8 },
      priceHistory: { '1W': [324.45, 327.16, 321.8, 362.52, 366.81], '1M': [289.24, 295.44, 299.15, 284.72, 277.96, 292.09, 302.24, 305.35, 322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81], '6M': [160.52, 172.27, 175.87, 206.96, 214.38, 228.39, 239.58, 209.78, 235.12, 237.39, 239.07, 214.68, 209.49, 224.71, 233.45, 222.01, 258.76, 260.96, 258.56, 257.86, 286.52, 299.15, 302.24, 318.18, 303.28, 366.81], '1Y': [89.52, 91.61, 97.34, 99.83, 101.07, 97.69, 98.62, 98.41, 102, 98.88, 101.28, 97.03, 105.57, 120.47, 131.93, 133.9, 149.15, 137.81, 144.05, 156.9, 161.24, 166.37, 147.46, 150.38, 158.19, 165.81, 164.3, 175.26, 173.78, 203.08, 208.79, 220.7, 248.17, 213.31, 231.29, 244.92, 239.07, 214.68, 209.49, 233.99, 211.62, 218.44, 263.66, 267.6, 267.78, 256.72, 286.52, 299.15, 302.24, 318.18, 303.28, 366.81] },
      velocityScore: { '1D': 0, '1W': 8.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$459B', pe: 69.5, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.28,
      etfPresence: { SOXX: 3.71, PSI: 5.6, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 3.75, proScore: 1.87, coverage: 0.5,
      price: 382.07, weeklyPrices: [396.60, 392.16, 372.10, 385.57, 382.07], weeklyChange: -3.66, sortRank: 0, periodReturns: { '1M': -8.9, '6M': 6.2, '1Y': 53.6 },
      priceHistory: { '1W': [396.6, 392.16, 372.1, 385.57, 382.07], '1M': [419.3, 416.79, 439.79, 425.19, 420.71, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07], '6M': [359.93, 340.36, 349.39, 343.77, 354.61, 328.8, 333.24, 308.05, 342.76, 333.99, 321.7, 332.77, 335.97, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 417.43, 412.56, 439.79, 414.57, 446.77, 385.73, 382.07], '1Y': [248.7, 253.77, 275.65, 271.8, 280.94, 278.59, 294.3, 297.72, 303.9, 305.76, 294.23, 298.24, 336.67, 360, 338.94, 329.91, 335.49, 356.7, 349.24, 362.05, 362.55, 358.39, 342.65, 377.96, 381.57, 406.29, 339.81, 341.45, 349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 321.7, 332.77, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 412.56, 439.79, 414.57, 446.77, 385.73, 382.07] },
      velocityScore: { '1D': 0, '1W': -4.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63.7, revenueGrowth: 48, eps: 6, grossMargin: 76, dividendYield: 0.68,
      etfPresence: { SOXX: 5.77, PSI: false, XSD: 1.72, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 3.48, proScore: 1.74, coverage: 0.5,
      price: 367.15, weeklyPrices: [346.33, 341.70, 330.86, 367.47, 367.15], weeklyChange: 6.01, sortRank: 0, periodReturns: { '1M': 79.6, '6M': 146.7, '1Y': 309.2 },
      priceHistory: { '1W': [346.33, 341.7, 330.86, 367.47, 367.15], '1M': [204.42, 224.09, 228.64, 232.68, 215.58, 287.48, 297.84, 306.88, 318.72, 325.33, 349.17, 342.85, 320.09, 355.76, 363.54, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15], '6M': [148.85, 164.4, 170.1, 161.01, 180.56, 176.01, 167.9, 144.67, 143.71, 132.62, 124.67, 120, 119.9, 126.34, 120.33, 106.33, 129.46, 170.81, 197.54, 194.74, 195.65, 228.64, 297.84, 342.85, 317.06, 367.15], '1Y': [89.73, 85.95, 90.42, 92.3, 92.36, 116.91, 124.05, 137.93, 179.43, 186.43, 174.15, 174.24, 214.49, 238.79, 230.11, 195.8, 220.81, 199.53, 156.31, 170.28, 191.56, 173.74, 141.39, 147.75, 142.94, 167.08, 143.66, 172.62, 170.84, 165.77, 172.14, 176.35, 160.46, 142.82, 126.58, 129.68, 124.67, 120, 119.9, 126.16, 113.61, 117.14, 149.05, 174.05, 212.84, 202.68, 195.65, 228.64, 297.84, 342.85, 317.06, 367.15] },
      velocityScore: { '1D': 0, '1W': 8.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$63B', pe: 249.8, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.47, PSI: false, XSD: 4.49, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.86, proScore: 1.43, coverage: 0.5,
      price: 211.72, weeklyPrices: [217.77, 205.42, 191.20, 202.96, 211.72], weeklyChange: -2.78, sortRank: 0, periodReturns: { '1M': 0.7, '6M': 18.8, '1Y': 36.8 },
      priceHistory: { '1W': [217.77, 205.42, 191.2, 202.96, 211.72], '1M': [210.31, 213.17, 200.08, 201.49, 203.64, 202.51, 213.41, 238.16, 248.82, 233.4, 243.29, 251.02, 228.99, 240.84, 250.01, 215.94, 217.77, 205.42, 191.2, 202.96, 211.72], '6M': [178.29, 175.25, 173.43, 182.45, 165.29, 156.37, 152.7, 148.89, 141.04, 141.27, 145.59, 137, 131.15, 130.47, 130.35, 127.28, 127.75, 134.47, 133.95, 179.58, 202.55, 200.08, 213.41, 251.02, 215.94, 211.72], '1Y': [154.72, 153.14, 159.26, 159.45, 154.3, 157.99, 161.05, 147.51, 147.97, 158.9, 156.42, 158.78, 158.66, 164.14, 169.53, 166.36, 168.62, 161.78, 167.04, 187.68, 180.72, 171.57, 166.75, 165.06, 170.7, 176, 179.26, 174.22, 173.65, 180.19, 164.54, 157.8, 152.22, 136.3, 138.47, 142.88, 145.59, 137, 131.15, 131.28, 130.54, 126.8, 128.06, 136.2, 148.85, 177.01, 202.55, 200.08, 213.41, 251.02, 215.94, 211.72] },
      velocityScore: { '1D': 0, '1W': -12.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$223B', pe: 22.8, revenueGrowth: -4, eps: 9.29, grossMargin: 55, dividendYield: 1.74,
      etfPresence: { SOXX: 3.41, PSI: false, XSD: 2.3, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 2.82, proScore: 1.41, coverage: 0.5,
      price: 301.12, weeklyPrices: [290.90, 288.63, 282.01, 297.10, 301.12], weeklyChange: 3.51, sortRank: 0, periodReturns: { '1M': 2, '6M': 67.8, '1Y': 54.4 },
      priceHistory: { '1W': [290.9, 288.63, 282.01, 297.1, 301.12], '1M': [295.17, 306.34, 308.17, 302.73, 300.6, 304.88, 298.39, 309.21, 324.89, 317.45, 315.95, 305.68, 293.2, 308.12, 308.59, 285.06, 290.9, 288.63, 282.01, 297.1, 301.12], '6M': [179.42, 176.29, 175.69, 192.1, 188.53, 194.41, 216.17, 222.92, 226.56, 218.05, 212.63, 197.98, 190.05, 190.78, 196.77, 196.3, 214.98, 223.1, 282.23, 281.08, 285.24, 308.17, 298.39, 305.68, 285.06, 301.12], '1Y': [195, 201.39, 207.62, 216.63, 218.36, 214.92, 189.25, 182.73, 183.71, 194.33, 205.97, 199.81, 185.03, 177.63, 182.04, 183.73, 181.81, 175.11, 179.59, 169.41, 161.46, 160.58, 154.99, 161.26, 175.26, 179.52, 177.97, 178.82, 175.42, 185.71, 193.45, 194.99, 218.97, 223.98, 223, 219.73, 212.63, 197.98, 190.05, 188.29, 193.41, 194.87, 214.73, 229.82, 277.14, 281.02, 285.24, 308.17, 298.39, 305.68, 285.06, 301.12] },
      velocityScore: { '1D': 0, '1W': 2.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$274B', pe: 51.6, revenueGrowth: 19, eps: 5.84, grossMargin: 57, dividendYield: 1.89,
      etfPresence: { SOXX: 3.35, PSI: false, XSD: 2.28, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.8, proScore: 1.4, coverage: 0.5,
      price: 250.81, weeklyPrices: [222.27, 234.32, 237.68, 264.76, 250.81], weeklyChange: 12.84, sortRank: 0, periodReturns: { '1M': 26.3, '6M': 74.3, '1Y': 241.3 },
      priceHistory: { '1W': [222.27, 234.32, 237.68, 264.76, 250.81], '1M': [198.57, 189.36, 184.54, 172.17, 156.27, 182.98, 193.39, 218.41, 221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81], '6M': [143.91, 150.13, 144.7, 132.95, 161.38, 139.16, 129.66, 96.95, 128.4, 130.66, 114.48, 114.74, 111.57, 101.72, 103.91, 95.92, 107.93, 158.93, 185.54, 174.01, 188.29, 184.54, 193.39, 236.03, 206.89, 250.81], '1Y': [73.49, 84.57, 92.59, 93.36, 102.59, 92.93, 107.95, 114.7, 118.57, 118.74, 115.41, 124.27, 149.03, 164.42, 162.26, 145.61, 147.42, 149.9, 151.66, 154.96, 180.64, 170.16, 145.58, 150.85, 188.44, 170.29, 142.02, 149.94, 144.92, 141, 156.84, 135.1, 129.47, 98.06, 121.78, 124.06, 114.48, 114.74, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 184.38, 188.29, 184.54, 193.39, 236.03, 206.89, 250.81] },
      velocityScore: { '1D': 0, '1W': 28.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$46B', pe: 137.1, revenueGrowth: 157, eps: 1.83, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 2.12, PSI: false, XSD: 3.48, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.79, proScore: 1.4, coverage: 0.5,
      price: 1577.32, weeklyPrices: [1559.18, 1531.98, 1473.04, 1589.55, 1577.32], weeklyChange: 1.16, sortRank: 0, periodReturns: { '1M': -1.4, '6M': 66.6, '1Y': 134.4 },
      priceHistory: { '1W': [1559.18, 1531.98, 1473.04, 1589.55, 1577.32], '1M': [1599.52, 1650.35, 1613.97, 1550.02, 1486.33, 1553.27, 1561.25, 1589.81, 1662.98, 1620.17, 1633.17, 1566.21, 1542.39, 1624.99, 1689.89, 1481.05, 1559.18, 1531.98, 1473.04, 1589.55, 1577.32], '6M': [946.51, 937.11, 930.04, 1005.38, 983.28, 1074.93, 1161.78, 1136.83, 1196.73, 1175.22, 1180.13, 1078.44, 1033.88, 1075.29, 1118.66, 1119.51, 1334.21, 1402.81, 1592.17, 1614.41, 1575.96, 1613.97, 1561.25, 1566.21, 1481.05, 1577.32], '1Y': [673.01, 692.62, 731.38, 761.31, 717.62, 719.98, 738.55, 830.63, 797.51, 850.31, 837.86, 823.65, 857.87, 857.02, 914.27, 920.64, 968.1, 981.67, 1031.59, 1105.05, 1003.93, 976.31, 897.01, 892.97, 952.18, 962.95, 949.4, 945.16, 923.91, 959.08, 983.6, 1076.67, 1183.15, 1155.99, 1155.93, 1204.1, 1180.13, 1078.44, 1033.88, 1092.69, 1058.28, 1118.49, 1353.85, 1468.35, 1632.06, 1583.48, 1575.96, 1613.97, 1561.25, 1566.21, 1481.05, 1577.32] },
      velocityScore: { '1D': 0, '1W': 0.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$77B', pe: 112.3, revenueGrowth: 26, eps: 14.04, grossMargin: 55, dividendYield: 0.51,
      etfPresence: { SOXX: 3.33, PSI: false, XSD: 2.26, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.75, proScore: 1.37, coverage: 0.5,
      price: 304.86, weeklyPrices: [301.14, 297.41, 285.56, 302.55, 304.86], weeklyChange: 1.24, sortRank: 0, periodReturns: { '1M': 3.6, '6M': 33.6, '1Y': 44.6 },
      priceHistory: { '1W': [301.14, 297.41, 285.56, 302.55, 304.86], '1M': [294.23, 298.41, 294.17, 291.5, 291.68, 310.15, 299.38, 316.47, 332.67, 329.24, 330.28, 321.35, 311.38, 323.62, 321.88, 295.96, 301.14, 297.41, 285.56, 302.55, 304.86], '6M': [228.16, 226.27, 220.46, 245.95, 239.09, 233.72, 240.03, 226.86, 249.75, 232.11, 232.23, 210.58, 191.22, 192.69, 197.61, 195.58, 205.67, 213.73, 241.16, 293.59, 290.22, 294.17, 299.38, 321.35, 295.96, 304.86], '1Y': [210.9, 210.86, 218.49, 232.34, 221.06, 228, 228.49, 211.99, 205.16, 232.01, 236.67, 232.66, 223.69, 220.99, 225.62, 227.73, 231.42, 216.7, 219.82, 221.56, 210.39, 205.13, 190.51, 191.56, 215.35, 228.05, 231.83, 228.94, 219.98, 239.34, 240.81, 236.75, 233.5, 222.13, 242.19, 232.27, 232.23, 210.58, 191.22, 192.35, 196.92, 194.55, 204.37, 216.03, 244.04, 295.24, 290.22, 294.17, 299.38, 321.35, 295.96, 304.86] },
      velocityScore: { '1D': 0, '1W': -2.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$77B', pe: 29.1, revenueGrowth: 12, eps: 10.46, grossMargin: 56, dividendYield: 1.33,
      etfPresence: { SOXX: 3.19, PSI: false, XSD: 2.3, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 2.61, proScore: 1.31, coverage: 0.5,
      price: 116.79, weeklyPrices: [120.90, 117.00, 110.17, 115.96, 116.79], weeklyChange: -3.4, sortRank: 0, periodReturns: { '1M': 12.2, '6M': 112.5, '1Y': 128.9 },
      priceHistory: { '1W': [120.9, 117, 110.17, 115.96, 116.79], '1M': [104.11, 115.71, 118.37, 113.11, 109.43, 110.21, 109.61, 116.2, 127, 124.89, 123.77, 120.62, 120.92, 128.64, 133.93, 117.26, 120.9, 117, 110.17, 115.96, 116.79], '6M': [54.96, 55.21, 54.02, 61.76, 59.41, 63.13, 64.93, 62.06, 71.18, 68.09, 68.16, 60.85, 57.69, 60.46, 63.1, 62.2, 68.49, 79.93, 97.78, 100.81, 100.61, 118.37, 109.61, 120.62, 117.26, 116.79], '1Y': [51.02, 53.17, 52.41, 57.62, 58.93, 62.45, 58.66, 47.97, 47.1, 50.53, 50.95, 48.94, 48.62, 49.56, 50.42, 49.31, 50.35, 50.11, 54.89, 52.68, 50.46, 48.54, 46.02, 47.39, 51.48, 55.23, 55.09, 56.37, 54.24, 61.89, 60.58, 63.07, 62.2, 63.1, 70.63, 69.11, 68.16, 60.85, 57.69, 59.29, 60.87, 62.19, 68.65, 83.01, 98.4, 103.03, 100.61, 118.37, 109.61, 120.62, 117.26, 116.79] },
      velocityScore: { '1D': 0, '1W': -7.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$45B', pe: 86.5, revenueGrowth: 5, eps: 1.35, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.25, PSI: false, XSD: 2.98, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.3, proScore: 1.15, coverage: 0.5,
      price: 95.24, weeklyPrices: [91.37, 91.47, 87.91, 92.94, 95.24], weeklyChange: 4.24, sortRank: 0, periodReturns: { '1M': -2.5, '6M': 41.8, '1Y': 44.9 },
      priceHistory: { '1W': [91.37, 91.47, 87.91, 92.94, 95.24], '1M': [97.7, 96.71, 97.04, 93.85, 92.76, 94.02, 91.11, 93.43, 98.05, 96.85, 96.04, 94.65, 91.52, 96.96, 96.55, 88.34, 91.37, 91.47, 87.91, 92.94, 95.24], '6M': [67.18, 64.91, 64.65, 74.87, 74.07, 76.2, 80.28, 78.23, 80.75, 77.16, 74.97, 67.81, 62.73, 64.71, 65.16, 65.38, 71.22, 76.87, 90.64, 92.91, 101.58, 97.04, 91.11, 94.65, 88.34, 95.24], '1Y': [65.73, 68.58, 70.37, 74.56, 73.11, 75.26, 70.53, 66.59, 60.95, 65.56, 68.55, 63.6, 64.76, 64.45, 64.71, 64.22, 66.59, 64.39, 67.07, 64.55, 62.41, 55.41, 51.7, 51.25, 56.71, 66.85, 67.18, 66.24, 64.68, 73.94, 74.68, 75.47, 79.36, 78.04, 78.92, 77.73, 74.97, 67.81, 62.73, 63.29, 64.2, 65.6, 71.56, 78.76, 89.44, 93.95, 101.58, 97.04, 91.11, 94.65, 88.34, 95.24] },
      velocityScore: { '1D': 0, '1W': 1.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$52B', pe: 432.9, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 1.91,
      etfPresence: { SOXX: 2.44, PSI: false, XSD: 2.16, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.9, proScore: 0.95, coverage: 0.5,
      price: 379.87, weeklyPrices: [361.86, 358.72, 354.40, 374.76, 379.87], weeklyChange: 4.98, sortRank: 0, periodReturns: { '1M': 4.7, '6M': 114.2, '1Y': 194.5 },
      priceHistory: { '1W': [361.86, 358.72, 354.4, 374.76, 379.87], '1M': [362.76, 381.55, 383.56, 375.6, 356.25, 375.71, 380.45, 385.98, 409.68, 400.66, 391.09, 364.64, 353.79, 382.35, 390.34, 345.4, 361.86, 358.72, 354.4, 374.76, 379.87], '6M': [177.35, 174.42, 173.71, 171.77, 213.52, 226.25, 226.25, 215.03, 236.94, 242.56, 247.11, 228.98, 215.94, 218.89, 245.04, 229.36, 247.71, 261.42, 284.4, 281.61, 344.47, 383.56, 380.45, 364.64, 345.4, 379.87], '1Y': [128.97, 138.65, 143.29, 137.37, 137.3, 136.76, 139.58, 140, 118.35, 124.55, 126.69, 131.05, 129.79, 131.18, 128.8, 124.49, 131.71, 130.53, 140.33, 146.39, 150.19, 178.42, 159.83, 165.97, 177.91, 188.08, 175.29, 175.19, 174.87, 170.62, 215.01, 224.29, 227.73, 227.8, 238.99, 243.59, 247.11, 228.98, 215.94, 224.54, 228.5, 238.3, 258.11, 276.97, 287.64, 284.18, 344.47, 383.56, 380.45, 364.64, 345.4, 379.87] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$29B', pe: 161, revenueGrowth: 23, eps: 2.36, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.24, PSI: false, XSD: 2.56, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RMBS', name: 'RAMBUS INC', easyScore: 2, avgWeight: 1.57, proScore: 0.78, coverage: 0.5,
      price: 146.56, weeklyPrices: [152.03, 146.84, 138.12, 144.47, 146.56], weeklyChange: -3.6, sortRank: 0, periodReturns: { '1M': 12.5, '6M': 55.5, '1Y': 152.3 },
      priceHistory: { '1W': [152.03, 146.84, 138.12, 144.47, 146.56], '1M': [130.28, 134.85, 130.46, 127.05, 123.76, 133.56, 141.82, 142.98, 157.23, 148.66, 148.02, 145.46, 147.48, 166.78, 170.66, 145.31, 152.03, 146.84, 138.12, 144.47, 146.56], '6M': [94.23, 96.4, 93.57, 97, 95.48, 125.93, 124.44, 100.85, 99.38, 104.13, 102.17, 91.91, 89.78, 93.32, 95.93, 89.95, 105.58, 120.03, 138.5, 115.11, 126.6, 130.46, 141.82, 145.46, 145.31, 146.56], '1Y': [58.1, 60, 64.02, 65.18, 64.53, 66.61, 64.24, 75.73, 72.77, 75.77, 73.3, 73.49, 74.55, 97.05, 102.62, 104.2, 101, 97.01, 97.77, 113.61, 105.76, 110.6, 91.13, 92.75, 96.21, 104.71, 95.45, 95.26, 94.69, 91.65, 100.62, 124.77, 121.6, 98.1, 95.8, 102.64, 102.17, 91.91, 89.78, 94.62, 91.44, 93.03, 110.44, 126.93, 158.4, 111.93, 126.6, 130.46, 141.82, 145.46, 145.31, 146.56] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$16B', pe: 69.8, revenueGrowth: 8, eps: 2.1, grossMargin: 80, dividendYield: null,
      etfPresence: { SOXX: 0.76, PSI: false, XSD: 2.38, DRAM: false },
      tonyNote: 'RAMBUS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 7, avgWeight: 4.29, proScore: 2.31, coverage: 0.538,
      price: 205.19, weeklyPrices: [208.64, 208.19, 200.42, 204.87, 205.19], weeklyChange: -1.65, sortRank: 0, periodReturns: { '1M': -7.1, '6M': 17.2, '1Y': 44.5 },
      priceHistory: { '1W': [208.64, 208.19, 200.42, 204.87, 205.19], '1M': [220.78, 225.83, 235.74, 225.32, 222.32, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19], '6M': [175.02, 180.99, 188.22, 187.24, 185.81, 183.32, 191.52, 174.19, 190.05, 187.9, 184.89, 183.34, 183.14, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 199.57, 211.5, 235.74, 219.51, 211.14, 205.1, 205.19], '1Y': [141.97, 144.17, 157.99, 160, 170.7, 167.03, 176.75, 180, 182.06, 182.01, 179.81, 170.78, 170.76, 174.88, 178.43, 186.58, 185.54, 188.32, 182.64, 191.49, 206.88, 199.05, 186.6, 182.55, 181.46, 184.97, 176.29, 183.69, 187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 184.89, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 211.5, 235.74, 219.51, 211.14, 205.1, 205.19] },
      velocityScore: { '1D': 0.4, '1W': 1.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.0T', pe: 31.4, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.49,
      etfPresence: { PTF: 4.32, WCLD: false, IGV: false, FDTX: 4.62, GTEK: false, ARKK: 1.77, MARS: false, FRWD: 8.55, BCTK: 6.6, FWD: 2.02, CBSE: false, FCUS: false, WGMI: 2.13 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 6, avgWeight: 4.84, proScore: 2.24, coverage: 0.462,
      price: 981.61, weeklyPrices: [949.28, 935.89, 891.88, 995.87, 981.61], weeklyChange: 3.41, sortRank: 0, periodReturns: { '1M': 28.1, '6M': 307.1, '1Y': 749.1 },
      priceHistory: { '1W': [949.28, 935.89, 891.88, 995.87, 981.61], '1M': [766.58, 803.63, 776.01, 724.66, 681.54, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61], '6M': [241.14, 265.92, 294.37, 343.43, 338.13, 389.11, 435.28, 379.4, 410.34, 417.35, 415.56, 397.05, 405.35, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 776.01, 762.1, 971, 864.01, 981.61], '1Y': [115.6, 122.08, 123.25, 124.42, 120.11, 109.22, 111.25, 107.77, 123.72, 123.55, 116.42, 118.48, 135.24, 158.82, 166.41, 167.32, 190.96, 192.77, 206.77, 220.1, 234.7, 253.3, 241.95, 223.93, 239.49, 252.42, 237.5, 276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 415.56, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 646.63, 776.01, 762.1, 971, 864.01, 981.61] },
      velocityScore: { '1D': 1.4, '1W': -10.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 46.3, revenueGrowth: 196, eps: 21.2, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { PTF: 4.92, WCLD: false, IGV: false, FDTX: 9.36, GTEK: false, ARKK: false, MARS: false, FRWD: 4.91, BCTK: 4.45, FWD: 1.34, CBSE: false, FCUS: 4.09, WGMI: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 5, avgWeight: 4.43, proScore: 1.7, coverage: 0.385,
      price: 423.93, weeklyPrices: [426.80, 427.92, 408.75, 421.07, 423.93], weeklyChange: -0.67, sortRank: 0, periodReturns: { '1M': 6.7, '6M': 45.2, '1Y': 100.8 },
      priceHistory: { '1W': [426.8, 427.92, 408.75, 421.07, 423.93], '1M': [397.28, 399.8, 417.72, 404.35, 395.95, 401.62, 407.15, 404.52, 412.32, 422.73, 424.86, 418.45, 435.63, 446.69, 436.69, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93], '6M': [292.04, 288.95, 300.92, 327.43, 331.21, 326.12, 342.3, 325.74, 374.09, 360.39, 376.81, 353.86, 336.71, 339.57, 347.75, 341.49, 365.49, 363.35, 382.66, 396.06, 414.15, 417.72, 407.15, 418.45, 415.17, 423.93], '1Y': [211.1, 210.32, 226.49, 227.86, 236.95, 234.6, 242.75, 239, 242.09, 241.41, 235.59, 228.39, 250.92, 262.06, 282.71, 279.29, 302.4, 302.89, 297.7, 298.25, 304.86, 295.27, 282.01, 284.64, 292.09, 303.41, 287.74, 293.28, 299.58, 318.68, 327.11, 327.37, 339.55, 330.73, 368.1, 370.54, 376.81, 353.86, 336.71, 338.79, 326.11, 339.04, 370.6, 370.5, 402.46, 397.67, 414.15, 417.72, 407.15, 418.45, 415.17, 423.93] },
      velocityScore: { '1D': -11, '1W': 1.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.2T', pe: 36.5, revenueGrowth: 35, eps: 11.62, grossMargin: 62, dividendYield: 0.9,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6, GTEK: false, ARKK: 1.02, MARS: false, FRWD: 5.83, BCTK: 8.66, FWD: false, CBSE: false, FCUS: false, WGMI: 0.62 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 5, avgWeight: 4.14, proScore: 1.59, coverage: 0.385,
      price: 511.57, weeklyPrices: [490.33, 475.51, 452.40, 488.45, 511.57], weeklyChange: 4.33, sortRank: 0, periodReturns: { '1M': 14.1, '6M': 142.7, '1Y': 340.4 },
      priceHistory: { '1W': [490.33, 475.51, 452.4, 488.45, 511.57], '1M': [448.29, 445.5, 449.7, 424.1, 420.99, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57], '6M': [210.78, 213.43, 215.61, 214.35, 220.97, 249.8, 252.74, 200.19, 213.58, 203.37, 203.68, 199.45, 197.74, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 354.49, 408.46, 449.7, 449.59, 516.1, 466.38, 511.57], '1Y': [116.16, 129.58, 141.9, 137.82, 155.61, 154.72, 173.66, 176.78, 172.28, 176.14, 163.36, 162.32, 155.82, 160.46, 160.9, 161.79, 203.71, 216.42, 240.56, 259.67, 259.65, 243.98, 240.52, 215.05, 215.24, 221.62, 207.58, 214.95, 215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 203.68, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 408.46, 449.7, 449.59, 516.1, 466.38, 511.57] },
      velocityScore: { '1D': -0.6, '1W': 10.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$834B', pe: 169.4, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.95, MARS: false, FRWD: 6.98, BCTK: 3.62, FWD: 1.98, CBSE: false, FCUS: 3.17, WGMI: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 5, avgWeight: 3.42, proScore: 1.32, coverage: 0.385,
      price: 382.07, weeklyPrices: [396.60, 392.16, 372.10, 385.57, 382.07], weeklyChange: -3.66, sortRank: 0, periodReturns: { '1M': -8.9, '6M': 6.2, '1Y': 53.6 },
      priceHistory: { '1W': [396.6, 392.16, 372.1, 385.57, 382.07], '1M': [419.3, 416.79, 439.79, 425.19, 420.71, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07], '6M': [359.93, 340.36, 349.39, 343.77, 354.61, 328.8, 333.24, 308.05, 342.76, 333.99, 321.7, 332.77, 335.97, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 417.43, 412.56, 439.79, 414.57, 446.77, 385.73, 382.07], '1Y': [248.7, 253.77, 275.65, 271.8, 280.94, 278.59, 294.3, 297.72, 303.9, 305.76, 294.23, 298.24, 336.67, 360, 338.94, 329.91, 335.49, 356.7, 349.24, 362.05, 362.55, 358.39, 342.65, 377.96, 381.57, 406.29, 339.81, 341.45, 349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 321.7, 332.77, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 412.56, 439.79, 414.57, 446.77, 385.73, 382.07] },
      velocityScore: { '1D': 5.6, '1W': -6.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63.7, revenueGrowth: 48, eps: 6, grossMargin: 76, dividendYield: 0.68,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.79, GTEK: false, ARKK: 1.19, MARS: false, FRWD: 5.39, BCTK: 7.32, FWD: 2.43, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, avgWeight: 5.11, proScore: 1.57, coverage: 0.308,
      price: 931.04, weeklyPrices: [876.77, 846.01, 815.99, 868.09, 931.04], weeklyChange: 6.19, sortRank: 0, periodReturns: { '1M': 15.1, '6M': 223.7, '1Y': 631.5 },
      priceHistory: { '1W': [876.77, 846.01, 815.99, 868.09, 931.04], '1M': [808.8, 817.35, 804.76, 795.47, 740.84, 751.07, 810.46, 812.73, 845.76, 870.66, 880.72, 879.8, 921.26, 926.61, 940.69, 847.47, 876.77, 846.01, 815.99, 868.09, 931.04], '6M': [287.64, 296.36, 281.3, 330.42, 318.44, 344.22, 442.93, 418.63, 407.25, 408.97, 409.67, 367.34, 373.98, 406.77, 413.22, 423.12, 500.77, 531.81, 587.62, 673.64, 766.44, 804.76, 810.46, 879.8, 847.47, 931.04], '1Y': [127.27, 133.08, 144.33, 144.47, 149.05, 146.59, 150.46, 154.81, 151.69, 158.7, 164, 170.5, 191.59, 211.13, 228.13, 236.06, 242.83, 219.51, 214.4, 230.32, 265.55, 293.99, 261.38, 253.38, 266.87, 282.86, 285.58, 282.85, 280.08, 308.26, 312.28, 346.53, 446.57, 405.45, 431.17, 411.11, 409.67, 367.34, 373.98, 434.6, 378.79, 429.36, 503.13, 547.75, 586.25, 726.93, 766.44, 804.76, 810.46, 879.8, 847.47, 931.04] },
      velocityScore: { '1D': -3.7, '1W': -21.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$211B', pe: 88.5, revenueGrowth: 44, eps: 10.52, grossMargin: 42, dividendYield: 0.32,
      etfPresence: { PTF: 4.63, WCLD: false, IGV: false, FDTX: 4.04, GTEK: false, ARKK: false, MARS: false, FRWD: 7.62, BCTK: false, FWD: false, CBSE: false, FCUS: 4.16, WGMI: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 4, avgWeight: 4.51, proScore: 1.39, coverage: 0.308,
      price: 366.81, weeklyPrices: [324.45, 327.16, 321.80, 362.52, 366.81], weeklyChange: 13.06, sortRank: 0, periodReturns: { '1M': 26.8, '6M': 128.5, '1Y': 309.8 },
      priceHistory: { '1W': [324.45, 327.16, 321.8, 362.52, 366.81], '1M': [289.24, 295.44, 299.15, 284.72, 277.96, 292.09, 302.24, 305.35, 322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81], '6M': [160.52, 172.27, 175.87, 206.96, 214.38, 228.39, 239.58, 209.78, 235.12, 237.39, 239.07, 214.68, 209.49, 224.71, 233.45, 222.01, 258.76, 260.96, 258.56, 257.86, 286.52, 299.15, 302.24, 318.18, 303.28, 366.81], '1Y': [89.52, 91.61, 97.34, 99.83, 101.07, 97.69, 98.62, 98.41, 102, 98.88, 101.28, 97.03, 105.57, 120.47, 131.93, 133.9, 149.15, 137.81, 144.05, 156.9, 161.24, 166.37, 147.46, 150.38, 158.19, 165.81, 164.3, 175.26, 173.78, 203.08, 208.79, 220.7, 248.17, 213.31, 231.29, 244.92, 239.07, 214.68, 209.49, 233.99, 211.62, 218.44, 263.66, 267.6, 267.78, 256.72, 286.52, 299.15, 302.24, 318.18, 303.28, 366.81] },
      velocityScore: { '1D': 2.2, '1W': 8.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$459B', pe: 69.5, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.28,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 6.15, BCTK: 7.1, FWD: 1.81, CBSE: 2.98, FCUS: false, WGMI: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 4, avgWeight: 4.32, proScore: 1.33, coverage: 0.308,
      price: 562.92, weeklyPrices: [526.93, 517.72, 490.09, 529.29, 562.92], weeklyChange: 6.83, sortRank: 0, periodReturns: { '1M': 15.2, '6M': 219.2, '1Y': 910.6 },
      priceHistory: { '1W': [526.93, 517.72, 490.09, 529.29, 562.92], '1M': [488.74, 494.09, 489.15, 482.02, 458.68, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 511.72, 526.93, 517.72, 490.09, 529.29, 562.92], '6M': [176.34, 181.08, 179.68, 219.38, 214, 241.9, 279.7, 269.41, 273.74, 284.67, 282.25, 259.03, 261.18, 304.9, 296.14, 297.73, 337.88, 361.69, 403.12, 434.52, 463.91, 489.15, 486.46, 531.21, 511.72, 562.92], '1Y': [55.7, 60.38, 63.99, 64.02, 67.53, 67.06, 68.99, 77.29, 74.64, 76.29, 79.22, 81.91, 94.54, 103.09, 110.25, 120.06, 125.28, 118.86, 121.53, 126.67, 158.02, 174.22, 162.45, 150.93, 159.99, 169.54, 172.04, 176.76, 176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 282.25, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 463.91, 489.15, 486.46, 531.21, 511.72, 562.92] },
      velocityScore: { '1D': -1.5, '1W': -5.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$194B', pe: 33.7, revenueGrowth: 46, eps: 16.72, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { PTF: 4.63, WCLD: false, IGV: false, FDTX: 4, GTEK: false, ARKK: false, MARS: false, FRWD: 4.59, BCTK: false, FWD: false, CBSE: false, FCUS: 4.08, WGMI: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 4, avgWeight: 3.55, proScore: 1.09, coverage: 0.308,
      price: 238.55, weeklyPrices: [245.22, 244.19, 238.00, 241.51, 238.55], weeklyChange: -2.72, sortRank: 0, periodReturns: { '1M': -10.3, '6M': 5.5, '1Y': 12.5 },
      priceHistory: { '1W': [245.22, 244.19, 238, 241.51, 238.55], '1M': [265.82, 270.13, 267.22, 264.14, 264.86, 265.01, 268.46, 266.32, 265.29, 271.85, 274, 270.64, 261.26, 256.52, 250.02, 246.03, 245.22, 244.19, 238, 241.51, 238.55], '6M': [226.19, 227.35, 232.07, 240.93, 242.6, 231.31, 243.01, 232.99, 204.08, 204.86, 207.92, 218.94, 209.53, 209.87, 211.71, 210.57, 233.65, 249.7, 255.08, 265.06, 271.17, 267.22, 268.46, 270.64, 246.03, 238.55], '1Y': [212.1, 208.47, 219.39, 219.36, 226.35, 227.47, 232.79, 211.65, 221.3, 231.49, 227.94, 225.34, 238.24, 234.05, 220.71, 219.57, 220.9, 220.07, 216.48, 226.97, 254, 248.4, 232.87, 226.28, 234.42, 227.92, 222.54, 228.43, 232.53, 241.56, 236.65, 234.34, 241.73, 222.69, 199.6, 210.11, 207.92, 218.94, 209.53, 208.76, 207.54, 209.77, 238.38, 250.56, 263.99, 268.26, 271.17, 267.22, 268.46, 270.64, 246.03, 238.55] },
      velocityScore: { '1D': -2.7, '1W': -9.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 31.6, revenueGrowth: 17, eps: 7.54, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.01, GTEK: false, ARKK: 2.6, MARS: false, FRWD: 3, BCTK: 4.6, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 3.03, proScore: 0.93, coverage: 0.308,
      price: 108.24, weeklyPrices: [110.78, 110.42, 108.20, 110.47, 108.24], weeklyChange: -2.29, sortRank: 0, periodReturns: { '1M': 8.4, '6M': -34.1, '1Y': 2.8 },
      priceHistory: { '1W': [110.78, 110.42, 108.2, 110.47, 108.24], '1M': [99.84, 95.4, 97.42, 100.28, 102.39, 105.01, 104.86, 103, 104.9, 106.6, 115.03, 118.71, 124.12, 117.01, 112.94, 109.54, 110.78, 110.42, 108.2, 110.47, 108.24], '6M': [164.19, 169.57, 167.88, 168.45, 167.44, 138.54, 138.92, 114.02, 118.71, 123.8, 125.94, 134.79, 126.17, 123.75, 118.42, 118.52, 112.38, 126.94, 124.23, 121.13, 111.74, 97.42, 104.86, 118.71, 109.54, 108.24], '1Y': [105.34, 109.98, 115.35, 112.48, 115.05, 123.71, 126.84, 125.21, 147.5, 143.11, 140.53, 139.04, 143.44, 147.21, 149.94, 148.61, 164.5, 153.66, 164.71, 175.06, 172.94, 158.88, 139.93, 155.31, 156.83, 159.89, 159.85, 169.67, 163.74, 166.74, 157.51, 137.64, 143.64, 111.24, 110.66, 126.2, 125.94, 134.79, 126.17, 122.37, 115.43, 118.25, 110.79, 131.15, 125.83, 127.67, 111.74, 97.42, 104.86, 118.71, 109.54, 108.24] },
      velocityScore: { '1D': -1.1, '1W': 1.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$140B', pe: 106.1, revenueGrowth: 34, eps: 1.02, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.89, GTEK: false, ARKK: 4.53, MARS: false, FRWD: 1.96, BCTK: 2.76, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 13 Broad Tech ETFs (31% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASML', name: 'ASML Holding', easyScore: 4, avgWeight: 2.87, proScore: 0.88, coverage: 0.308,
      price: 1863.55, weeklyPrices: [1749.04, 1777.77, 1734.19, 1899.48, 1863.55], weeklyChange: 6.55, sortRank: 0, periodReturns: { '1M': 22.5, '6M': 72.4, '1Y': 144.9 },
      priceHistory: { '1W': [1749.04, 1777.77, 1734.19, 1899.48, 1863.55], '1M': [1520.94, 1581.58, 1584.51, 1501.81, 1472.39, 1550.13, 1592, 1632.9, 1632.03, 1597.87, 1605.77, 1612.76, 1628.57, 1705.37, 1726.36, 1641.74, 1749.04, 1777.77, 1734.19, 1899.48, 1863.55], '6M': [1080.85, 1056.02, 1066, 1242.19, 1270.16, 1360.09, 1422.92, 1339.13, 1435.63, 1458.93, 1463.8, 1368.36, 1351.58, 1355.17, 1393.89, 1359.76, 1448.64, 1410.83, 1417.8, 1438.99, 1516.6, 1584.51, 1592, 1612.76, 1641.74, 1863.55], '1Y': [761, 779.72, 801.39, 794.1, 823.02, 705.48, 729.99, 699.36, 721.31, 747.55, 754.46, 725.85, 805.13, 878.42, 963.51, 968.09, 1043.3, 984.66, 1042.15, 1059.98, 1066.82, 1038.79, 1020, 987.82, 1108.78, 1111.44, 1087.82, 1056.98, 1072.14, 1228.47, 1263.72, 1395, 1455.16, 1350.16, 1406.87, 1469.59, 1463.8, 1368.36, 1351.58, 1366.39, 1329.5, 1317.23, 1478.28, 1459.8, 1457.7, 1427.02, 1516.6, 1584.51, 1592, 1612.76, 1641.74, 1863.55] },
      velocityScore: { '1D': 23.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$718B', pe: 62.5, revenueGrowth: 13, eps: 29.82, grossMargin: 53, dividendYield: 0.47,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.25, BCTK: 2.29, FWD: 1.58, CBSE: 2.37, FCUS: false, WGMI: false },
      tonyNote: 'ASML Holding appears in 4 of 13 Broad Tech ETFs (31% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NET', name: 'Cloudflare', easyScore: 4, avgWeight: 1.8, proScore: 0.55, coverage: 0.308,
      price: 228.48, weeklyPrices: [247.79, 236.13, 219.67, 227.44, 228.48], weeklyChange: -7.79, sortRank: 0, periodReturns: { '1M': 22.3, '6M': 12.9, '1Y': 32.9 },
      priceHistory: { '1W': [247.79, 236.13, 219.67, 227.44, 228.48], '1M': [186.79, 192.62, 199.81, 197.56, 201.75, 210.13, 212.65, 216.17, 217.54, 209.22, 228.11, 241.82, 270.82, 272.66, 265.33, 250.11, 247.79, 236.13, 219.67, 227.44, 228.48], '6M': [202.44, 195.68, 200.7, 198, 188.71, 169.97, 184.88, 166.88, 189.41, 192.64, 174.66, 192.31, 212.11, 225.48, 218, 205.43, 193.05, 197.38, 205, 204.97, 256.79, 199.81, 212.65, 241.82, 250.11, 228.48], '1Y': [171.97, 183.87, 195.83, 192.81, 186.97, 190.55, 199.41, 208.8, 201.17, 202.37, 195.88, 208.05, 218.56, 219.24, 223.26, 214.59, 221.03, 222.56, 213.04, 225.11, 248.11, 240.53, 202.25, 193.99, 201.26, 208.93, 196.7, 202.06, 199.62, 202.81, 188.39, 173.3, 180.39, 163.05, 185.17, 177.14, 174.66, 192.31, 212.11, 221.36, 210.13, 211.69, 166.99, 200.99, 207.07, 217.5, 256.79, 199.81, 212.65, 241.82, 250.11, 228.48] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$81B', pe: null, revenueGrowth: 34, eps: -0.25, grossMargin: 73, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 1.78, IGV: false, FDTX: 2.05, GTEK: 2.07, ARKK: false, MARS: false, FRWD: false, BCTK: 1.28, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Cloudflare appears in 4 of 13 Broad Tech ETFs (31% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 3, avgWeight: 4.9, proScore: 1.13, coverage: 0.231,
      price: 390.74, weeklyPrices: [411.74, 403.41, 397.36, 390.34, 390.74], weeklyChange: -5.1, sortRank: 0, periodReturns: { '1M': -4.2, '6M': -18.3, '1Y': -17.7 },
      priceHistory: { '1W': [411.74, 403.41, 397.36, 390.34, 390.74], '1M': [407.77, 405.21, 409.43, 421.92, 423.54, 421.06, 419.09, 418.57, 416.03, 412.67, 426.99, 450.24, 460.52, 441.31, 427.34, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74], '6M': [478.53, 485.92, 487.1, 478.51, 470.67, 444.11, 481.63, 414.19, 404.37, 398.46, 401.72, 410.68, 401.86, 391.79, 371.04, 369.37, 373.07, 420.26, 415.75, 407.78, 420.77, 409.43, 419.09, 450.24, 416.67, 390.74], '1Y': [474.96, 486, 497.41, 496.62, 505.82, 505.27, 512.5, 535.64, 521.77, 517.1, 504.26, 505.12, 498.41, 509.04, 509.23, 517.95, 528.57, 514.05, 516.79, 531.52, 517.03, 506, 507.49, 474, 490, 492.02, 474.82, 484.92, 487.48, 483.47, 459.38, 451.14, 433.5, 393.67, 401.84, 397.23, 401.72, 410.68, 401.86, 389.02, 365.97, 373.46, 370.87, 422.79, 424.62, 414.44, 420.77, 409.43, 419.09, 450.24, 416.67, 390.74] },
      velocityScore: { '1D': -4.2, '1W': -5.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 23.3, revenueGrowth: 18, eps: 16.8, grossMargin: 68, dividendYield: 0.93,
      etfPresence: { PTF: false, WCLD: false, IGV: 7.75, FDTX: 3.79, GTEK: false, ARKK: false, MARS: false, FRWD: 3.15, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 3, avgWeight: 4.89, proScore: 1.13, coverage: 0.231,
      price: 279.62, weeklyPrices: [266.33, 260.52, 263.22, 279.53, 279.62], weeklyChange: 4.99, sortRank: 0, periodReturns: { '1M': 29.7, '6M': 45.9, '1Y': 42.5 },
      priceHistory: { '1W': [266.33, 260.52, 263.22, 279.53, 279.62], '1M': [215.6, 227.79, 238.21, 242.83, 247.55, 246.66, 252.92, 260.58, 256.75, 248.47, 257.77, 281.69, 300.48, 297.18, 280.43, 272.05, 266.33, 260.52, 263.22, 279.53, 279.62], '6M': [191.69, 186.88, 186.85, 185.86, 190.85, 181.47, 183.74, 166.72, 165.3, 150.99, 149.4, 163.16, 168.12, 168.91, 153.22, 160.67, 166.99, 166.97, 173.21, 179.32, 196.53, 238.21, 252.92, 281.69, 272.05, 279.62], '1Y': [196.27, 203.32, 204.64, 203.99, 192.25, 196.73, 204.5, 171, 168.17, 176.17, 184.55, 190.52, 197.55, 201.34, 203.25, 203.62, 212.58, 213.28, 211.82, 220.29, 219.23, 216.54, 202.9, 183.89, 189.88, 195, 185.88, 189.49, 186.85, 193.9, 190.93, 182.27, 176.2, 154.77, 162.81, 148.7, 149.4, 163.16, 168.12, 169.74, 156.36, 163.21, 155.73, 167.85, 178.54, 181.08, 196.53, 238.21, 252.92, 281.69, 272.05, 279.62] },
      velocityScore: { '1D': 1.8, '1W': 6.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$228B', pe: 243.1, revenueGrowth: 31, eps: 1.15, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.6, IGV: 8.41, FDTX: 3.67, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 3, avgWeight: 4.29, proScore: 0.99, coverage: 0.231,
      price: 127.99, weeklyPrices: [136.47, 132.07, 130.21, 131.08, 127.99], weeklyChange: -6.21, sortRank: 0, periodReturns: { '1M': -5.9, '6M': -30.3, '1Y': -6.8 },
      priceHistory: { '1W': [136.47, 132.07, 130.21, 131.08, 127.99], '1M': [136, 130.05, 133.73, 133.99, 135.14, 137.15, 137.41, 136.88, 136.6, 132.51, 143.34, 156.54, 160.65, 152.17, 142.2, 135.53, 136.47, 132.07, 130.21, 131.08, 127.99], '6M': [183.57, 193.38, 184.18, 179.71, 178.96, 165.33, 157.35, 139.54, 135.68, 134.89, 135.94, 152.67, 153.5, 152.77, 154.96, 146.49, 130.49, 142.76, 141.57, 139.11, 137.05, 133.73, 137.41, 156.54, 135.53, 127.99], '1Y': [137.4, 139.92, 136.32, 139.71, 148.58, 149.07, 157.88, 160.66, 182.68, 174.03, 157.17, 157.09, 162.36, 170.26, 182.55, 182.42, 179.53, 177.21, 181.59, 189.18, 207.18, 193.61, 171.25, 162.25, 170.69, 181.84, 183.25, 193.98, 180.84, 181.68, 178.4, 165.9, 151.86, 130.01, 129.13, 135.24, 135.94, 152.67, 153.5, 155.68, 147.56, 148.46, 128.06, 146.39, 143.09, 144.07, 137.05, 133.73, 137.41, 156.54, 135.53, 127.99] },
      velocityScore: { '1D': 0, '1W': 1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$307B', pe: 142.2, revenueGrowth: 85, eps: 0.9, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 6.95, FDTX: 2.87, GTEK: false, ARKK: 3.04, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 3, avgWeight: 3.84, proScore: 0.89, coverage: 0.231,
      price: 358.16, weeklyPrices: [361.17, 362.29, 353.32, 356.56, 358.16], weeklyChange: -0.83, sortRank: 0, periodReturns: { '1M': -6.7, '6M': 15.3, '1Y': 103.6 },
      priceHistory: { '1W': [361.17, 362.29, 353.32, 356.56, 358.16], '1M': [383.82, 399.04, 397.17, 393.32, 393.11, 384.9, 383.47, 379.38, 384.84, 384.83, 386.12, 376.43, 372.58, 358.39, 355.68, 365.76, 361.17, 362.29, 353.32, 356.56, 358.16], '6M': [310.52, 308.61, 314.39, 314.55, 336.43, 328.38, 336.28, 333.34, 311.33, 303.56, 307.15, 300.91, 303.21, 306.3, 289.59, 294.9, 316.37, 332.77, 337.75, 381.94, 395.3, 397.17, 383.47, 376.43, 365.76, 358.16], '1Y': [175.88, 166.01, 177.39, 175.16, 183.1, 192.11, 193.42, 195.75, 201.63, 204.29, 209.16, 211.99, 239.94, 251.42, 252.34, 243.55, 251.51, 244.64, 257.02, 269.93, 284.12, 290.59, 285.6, 318.47, 316.02, 317.75, 309.32, 311.33, 314.55, 322.43, 336.31, 330.84, 338.66, 331.33, 309.37, 314.9, 307.15, 300.91, 303.21, 305.73, 280.74, 294.46, 315.72, 339.4, 342.32, 383.22, 395.3, 397.17, 383.47, 376.43, 365.76, 358.16] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.3, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.66, GTEK: false, ARKK: 1.95, MARS: false, FRWD: false, BCTK: 5.9, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Alphabet Inc Class C appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRWD', name: 'CrowdStrike', easyScore: 3, avgWeight: 3.43, proScore: 0.79, coverage: 0.231,
      price: 682.8, weeklyPrices: [658.79, 644.93, 647.74, 691.53, 682.80], weeklyChange: 3.64, sortRank: 0, periodReturns: { '1M': 25, '6M': 35.3, '1Y': 42.1 },
      priceHistory: { '1W': [658.79, 644.93, 647.74, 691.53, 682.8], '1M': [546.18, 562.57, 579.95, 594.08, 618.83, 650.11, 648.23, 663.46, 671.55, 645.36, 671, 731, 782.17, 768.95, 747.61, 671.02, 658.79, 644.93, 647.74, 691.53, 682.8], '6M': [504.78, 481.28, 475.91, 458.32, 468.02, 445.88, 469.19, 415.36, 415.81, 422.14, 381.1, 426.16, 441.54, 435.81, 385.86, 393.31, 394.68, 418.2, 445.39, 445.75, 505.72, 579.95, 648.23, 731, 671.02, 682.8], '1Y': [480.62, 491.81, 509.31, 507.71, 473.28, 471.23, 472.18, 454.86, 426.43, 426.34, 418.83, 413.5, 423.51, 444.98, 484.1, 490.38, 495.95, 508.61, 503.61, 529.7, 551.92, 557.53, 529.78, 506.82, 516.55, 517.98, 487.47, 483.14, 475.63, 478.91, 460.7, 453.77, 444.62, 377.16, 411.54, 388.6, 381.1, 426.16, 441.54, 428.18, 392.62, 399.12, 379.02, 423.95, 448.13, 455.64, 505.72, 579.95, 648.23, 731, 671.02, 682.8] },
      velocityScore: { '1D': 1.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$174B', pe: null, revenueGrowth: 26, eps: -0.14, grossMargin: 75, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.47, IGV: 6.57, FDTX: 1.24, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'CrowdStrike appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 3.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'COHR', name: 'Coherent Corp', easyScore: 3, avgWeight: 3.29, proScore: 0.76, coverage: 0.231,
      price: 385.03, weeklyPrices: [401.93, 355.94, 354.77, 363.58, 385.03], weeklyChange: -4.2, sortRank: 0, periodReturns: { '1M': 2.9, '6M': 115.9, '1Y': 397.6 },
      priceHistory: { '1W': [401.93, 355.94, 354.77, 363.58, 385.03], '1M': [374.01, 403.71, 404.94, 382.45, 362.83, 358.5, 378, 377.57, 381.35, 380.18, 376.95, 361.47, 362.9, 426.89, 417.43, 376.99, 401.93, 355.94, 354.77, 363.58, 385.03], '6M': [178.34, 185.83, 189.02, 194.11, 190.03, 201.46, 221.14, 211, 223.69, 232.48, 250.14, 253.87, 241.27, 257.21, 272.04, 247.8, 284.17, 328, 337.68, 319.71, 319.19, 404.94, 378, 361.47, 376.99, 385.03], '1Y': [77.37, 80.64, 89.21, 90.4, 96.07, 97.02, 104.3, 106.74, 113.6, 90.49, 90.5, 87.8, 99.22, 104.47, 109.29, 107.72, 114.77, 115.13, 120.2, 134.99, 132, 166.72, 139.07, 151.81, 164.89, 192.73, 178.45, 190.98, 186.81, 191.62, 184.11, 202.72, 215.86, 209.24, 216.1, 248.18, 250.14, 253.87, 241.27, 275.57, 243.29, 258.16, 307.5, 345.02, 336.09, 329.5, 319.19, 404.94, 378, 361.47, 376.99, 385.03] },
      velocityScore: { '1D': 0, '1W': -25.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$75B', pe: 181.6, revenueGrowth: 21, eps: 2.12, grossMargin: 37, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.75, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 3.77, FWD: false, CBSE: 2.35, FCUS: false, WGMI: false },
      tonyNote: 'Coherent Corp appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 3.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CDNS', name: 'CADENCE DESIGN SYSTEMS INC', easyScore: 3, avgWeight: 2.81, proScore: 0.65, coverage: 0.231,
      price: 384.96, weeklyPrices: [394.24, 390.90, 385.13, 383.74, 384.96], weeklyChange: -2.35, sortRank: 0, periodReturns: { '1M': 7.5, '6M': 19.1, '1Y': 28.3 },
      priceHistory: { '1W': [394.24, 390.9, 385.13, 383.74, 384.96], '1M': [358.04, 354.55, 352.84, 347.24, 345.99, 350.89, 358.46, 373.59, 381.75, 374.05, 373.85, 374.93, 414.16, 416.39, 408, 376.19, 394.24, 390.9, 385.13, 383.74, 384.96], '6M': [323.22, 314.91, 317.71, 314.64, 323.06, 313.84, 320.49, 271.42, 299.65, 296.59, 297.6, 299.84, 290.32, 289.64, 281.39, 280.19, 281.01, 306.96, 314.33, 329.59, 356.9, 352.84, 358.46, 374.93, 376.19, 384.96], '1Y': [300, 293.56, 308.15, 323.28, 318.04, 319.6, 333.76, 364.88, 349.09, 356.25, 345.19, 342.81, 361.77, 349.01, 366.3, 351.26, 353.36, 332.23, 329.64, 351.4, 335.41, 328.94, 311.29, 304.47, 317.94, 335.07, 318.43, 317.57, 315.6, 320.54, 313.17, 317.09, 302.67, 270.14, 288.33, 296.28, 297.6, 299.84, 290.32, 287.4, 280.62, 278.72, 265.66, 311.03, 332.89, 340.94, 356.9, 352.84, 358.46, 374.93, 376.19, 384.96] },
      velocityScore: { '1D': -3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$106B', pe: 90.2, revenueGrowth: 19, eps: 4.27, grossMargin: 86, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 3.93, FDTX: false, GTEK: 2.56, ARKK: false, MARS: false, FRWD: 1.94, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'CADENCE DESIGN SYSTEMS INC appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DDOG', name: 'DDOG', easyScore: 3, avgWeight: 2.72, proScore: 0.63, coverage: 0.231,
      price: 229.9, weeklyPrices: [231.68, 227.34, 227.63, 234.24, 229.90], weeklyChange: -0.77, sortRank: 0, periodReturns: { '1M': 15, '6M': 57.5, '1Y': 90.9 },
      priceHistory: { '1W': [231.68, 227.34, 227.63, 234.24, 229.9], '1M': [199.94, 205.31, 202.84, 207.98, 208.82, 212.24, 218.04, 222.32, 223.65, 221.81, 225.24, 247.35, 277.49, 269.13, 250.33, 234.11, 231.68, 227.34, 227.63, 234.24, 229.9], '6M': [146, 140.39, 137.94, 137.1, 125.5, 123.46, 140.56, 115.71, 127.33, 120.6, 116.46, 122.36, 127.16, 131.26, 123.29, 118.67, 108.98, 123.47, 127.86, 132.19, 188.73, 202.84, 218.04, 247.35, 234.11, 229.9], '1Y': [120.45, 129.52, 134.33, 145.94, 140.56, 144.89, 150.77, 139.13, 128.83, 129.07, 128.38, 134.69, 140.46, 134.59, 137.49, 142.4, 157.36, 164.2, 156.29, 157.62, 162.08, 199.72, 180.26, 158.44, 156.48, 152.57, 142.05, 141.84, 137.48, 141.45, 122.41, 131.25, 128.18, 106.73, 126.13, 115.66, 116.46, 122.36, 127.16, 129.94, 124.3, 120.36, 105.37, 126.61, 129.48, 140.53, 188.73, 202.84, 218.04, 247.35, 234.11, 229.9] },
      velocityScore: { '1D': 1.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$82B', pe: 589.5, revenueGrowth: 32, eps: 0.39, grossMargin: 80, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.81, IGV: 2.9, FDTX: 2.44, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'DDOG appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 2.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 3, avgWeight: 5.4, proScore: 3.24, coverage: 0.6,
      price: 294.75, weeklyPrices: [293.60, 283.51, 262.34, 290.50, 294.75], weeklyChange: 0.39, sortRank: 0, periodReturns: { '1M': -4.3, '6M': 162.3, '1Y': 370.7 },
      priceHistory: { '1W': [293.6, 283.51, 262.34, 290.5, 294.75], '1M': [308.05, 300.84, 296.98, 292.65, 266.8, 271.05, 270.75, 279.22, 291.97, 295.94, 288.9, 284.42, 288.12, 299.07, 299.73, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75], '6M': [112.36, 110.97, 111.96, 120, 133.04, 140.62, 147.81, 175.77, 197.45, 178.79, 176.96, 167.67, 171.19, 167.41, 194.85, 184.68, 230.81, 232.81, 252.18, 277.27, 305.93, 296.98, 270.75, 284.42, 284.87, 294.75], '1Y': [62.62, 60.17, 70.15, 72.14, 70.37, 73.67, 80.8, 76.72, 88.28, 86.57, 86.12, 87.92, 92.3, 99.41, 97.41, 101.6, 103.9, 105.33, 116.4, 124.71, 130.23, 124.62, 105.94, 100.03, 107.5, 115.02, 109.31, 112.18, 109.16, 118.62, 133.76, 142.29, 152.31, 179.6, 197.63, 182.27, 176.96, 167.67, 171.19, 175.13, 174.8, 182.6, 230.94, 241.01, 252.76, 275.33, 305.93, 296.98, 270.75, 284.42, 284.87, 294.75] },
      velocityScore: { '1D': -2.1, '1W': -11.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 57.5, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { POW: 6.73, VOLT: 7.59, PBD: false, PBW: 1.87, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 3, avgWeight: 4.92, proScore: 2.95, coverage: 0.6,
      price: 707.74, weeklyPrices: [693.81, 691.95, 650.92, 683.29, 707.74], weeklyChange: 2.01, sortRank: 0, periodReturns: { '1M': -7.6, '6M': 61.5, '1Y': 97.5 },
      priceHistory: { '1W': [693.81, 691.95, 650.92, 683.29, 707.74], '1M': [765.81, 773.72, 780.08, 769.99, 723.03, 709.93, 716.91, 723.44, 742.18, 733.62, 730.1, 711.73, 687.48, 706.06, 715.67, 695.11, 693.81, 691.95, 650.92, 683.29, 707.74], '6M': [438.11, 426.66, 431.03, 438.22, 444.2, 473.24, 481.28, 464.57, 523.96, 554, 565.05, 549.22, 566.91, 572, 573.5, 560.12, 582.06, 587.42, 633.44, 727.77, 750.73, 780.08, 716.91, 711.73, 695.11, 707.74], '1Y': [358.26, 365.76, 378.08, 377.56, 386.54, 394.93, 411.99, 393.62, 384.12, 383.32, 378.31, 374.68, 373.47, 378.24, 389.53, 414.42, 427.8, 430.98, 440.74, 441.82, 450.82, 450.38, 426.87, 442.64, 454.72, 457.96, 435.87, 433.03, 428.81, 436.89, 437.07, 468.78, 483.43, 477.72, 515.88, 552.66, 565.05, 549.22, 566.91, 577.95, 545.64, 560.63, 585.36, 601.88, 624.84, 742.21, 750.73, 780.08, 716.91, 711.73, 695.11, 707.74] },
      velocityScore: { '1D': 2.1, '1W': 14.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$106B', pe: 97.1, revenueGrowth: 26, eps: 7.29, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.85, VOLT: 5.5, PBD: false, PBW: false, IVEP: 4.41 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 3, avgWeight: 4.36, proScore: 2.62, coverage: 0.6,
      price: 391.39, weeklyPrices: [403.14, 401.72, 375.46, 393.64, 391.39], weeklyChange: -2.91, sortRank: 0, periodReturns: { '1M': -2.5, '6M': 17.9, '1Y': 20.9 },
      priceHistory: { '1W': [403.14, 401.72, 375.46, 393.64, 391.39], '1M': [401.53, 406.94, 408.1, 399.44, 381.87, 379.69, 381.51, 391.35, 403.13, 406.37, 401.94, 400.6, 400.08, 417.62, 421.21, 395.94, 403.14, 401.72, 375.46, 393.64, 391.39], '6M': [331.98, 317.8, 321.45, 332.97, 332.38, 337.96, 347.32, 365, 396.09, 377.32, 374.59, 354.79, 348.64, 360.54, 375, 365.56, 400.44, 392.73, 424.5, 433.01, 399.15, 408.1, 381.51, 400.6, 395.94, 391.39], '1Y': [323.66, 332.95, 356.99, 356.98, 362.11, 372.65, 392.76, 384.76, 360.11, 353.5, 345.76, 343.75, 348.23, 371.19, 368.52, 374.25, 380.02, 375.37, 377.69, 379.74, 386.57, 379.57, 342.75, 330.43, 333.11, 341.76, 333.21, 320.39, 320.86, 322.67, 331.14, 334.04, 354.37, 354.67, 390.33, 373.38, 374.59, 354.79, 348.64, 360.23, 357.1, 361.1, 403, 406.21, 423.92, 425.55, 399.15, 408.1, 381.51, 400.6, 395.94, 391.39] },
      velocityScore: { '1D': -1.9, '1W': 8.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$152B', pe: 38.3, revenueGrowth: 17, eps: 10.22, grossMargin: 37, dividendYield: 1.12,
      etfPresence: { POW: 3.99, VOLT: 5.21, PBD: false, PBW: false, IVEP: 3.88 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 3, avgWeight: 3.66, proScore: 2.19, coverage: 0.6,
      price: 940.66, weeklyPrices: [933.85, 920.15, 867.09, 906.79, 940.66], weeklyChange: 0.73, sortRank: 0, periodReturns: { '1M': -12.3, '6M': 40, '1Y': 96.6 },
      priceHistory: { '1W': [933.85, 920.15, 867.09, 906.79, 940.66], '1M': [1071.98, 1062.57, 1090.53, 1049.23, 1012.25, 1024.52, 1043.82, 1038.74, 1070.47, 1031.89, 996, 968.32, 950.54, 969.67, 959.36, 933.61, 933.85, 920.15, 867.09, 906.79, 940.66], '6M': [671.71, 658.28, 663.46, 686.33, 652.09, 667.89, 711.59, 746.22, 823.67, 834.61, 876.46, 815.01, 832.11, 858.47, 923.69, 894.78, 968.02, 978.32, 1149.53, 1083.46, 1045.63, 1090.53, 1043.82, 968.32, 933.61, 940.66], '1Y': [478.45, 499.88, 529.15, 530, 559.61, 548.99, 647.66, 662.77, 650.76, 625.02, 602.31, 579.68, 605.7, 617.91, 633.41, 614.9, 603.22, 648.25, 594.07, 584.39, 581.26, 579.8, 577.02, 580.49, 601.58, 625.3, 681.35, 661.81, 659.64, 662.32, 644.18, 661.67, 717.39, 737.53, 816.56, 830.34, 876.46, 815.01, 832.11, 877.39, 873.12, 898.57, 991.32, 1002.75, 1149.19, 1062.95, 1045.63, 1090.53, 1043.82, 968.32, 933.61, 940.66] },
      velocityScore: { '1D': 1.9, '1W': 21.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$253B', pe: 27.5, revenueGrowth: 16, eps: 34.24, grossMargin: 20, dividendYield: 0.21,
      etfPresence: { POW: 3.28, VOLT: 3.89, PBD: false, PBW: false, IVEP: 3.8 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 3, avgWeight: 3.57, proScore: 2.14, coverage: 0.6,
      price: 85.99, weeklyPrices: [84.01, 84.83, 85.12, 84.84, 85.99], weeklyChange: 2.36, sortRank: 0, periodReturns: { '1M': -9.1, '6M': 5.3, '1Y': 15 },
      priceHistory: { '1W': [84.01, 84.83, 85.12, 84.84, 85.99], '1M': [94.59, 94.85, 95.68, 93.36, 89.04, 88.27, 89.69, 88.55, 87.65, 87.65, 87.25, 87.01, 83.66, 85.68, 84.58, 85.84, 84.01, 84.83, 85.12, 84.84, 85.99], '6M': [81.65, 79.54, 80.27, 81.05, 81.64, 83.85, 87.57, 89.97, 91.36, 91.64, 91.99, 91.13, 91.73, 90.96, 91.16, 92.85, 94.48, 91.83, 96.25, 97.88, 93.32, 95.68, 89.69, 87.01, 85.84, 85.99], '1Y': [74.78, 70.73, 69.42, 72.46, 74.7, 77.54, 71.34, 70.53, 72.45, 75.72, 75.32, 72.65, 70.07, 69.83, 72.32, 75.49, 82.11, 84.3, 84.77, 86.03, 81.78, 84.77, 85.75, 84.23, 84.58, 79.64, 81.65, 80.04, 80.53, 78.37, 81.98, 85.07, 88.18, 89.21, 91.93, 92.18, 91.99, 91.13, 91.73, 92.41, 91.16, 93.15, 94.08, 91.98, 95.28, 96.95, 93.32, 95.68, 89.69, 87.01, 85.84, 85.99] },
      velocityScore: { '1D': 3.4, '1W': 46.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$179B', pe: 21.8, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.9,
      etfPresence: { POW: 2.02, VOLT: 5.03, PBD: false, PBW: false, IVEP: 3.65 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 3, avgWeight: 3.54, proScore: 2.13, coverage: 0.6,
      price: 260.22, weeklyPrices: [253.57, 259.61, 234.23, 248.88, 260.22], weeklyChange: 2.62, sortRank: 0, periodReturns: { '1M': -7.3, '6M': 174, '1Y': 1085.5 },
      priceHistory: { '1W': [253.57, 259.61, 234.23, 248.88, 260.22], '1M': [280.69, 289.76, 303.41, 275.95, 258.71, 282.31, 307.88, 302.49, 302.4, 293.8, 290.01, 285, 273.51, 302.85, 287.32, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22], '6M': [94.98, 88.82, 88.41, 103.05, 139.77, 150.56, 165.39, 147.35, 155.54, 159, 168.57, 159.99, 157.17, 156.58, 150.22, 132.45, 160.13, 210.06, 237.57, 283.36, 258.64, 303.41, 307.88, 285, 263.61, 260.22], '1Y': [21.95, 22.56, 23.92, 24.3, 25.31, 25.93, 34.78, 36.1, 37.65, 46.5, 49.35, 51.35, 55, 73.29, 77.38, 84.57, 86.97, 109.91, 109.06, 108.53, 142.37, 139.23, 107.11, 95.56, 105, 109.44, 89.58, 92.26, 87.26, 108, 133.46, 145.63, 156.51, 136.6, 139.03, 147.55, 168.57, 159.99, 157.17, 166.69, 133.52, 135.63, 166.7, 207.86, 231.17, 290.52, 258.64, 303.41, 307.88, 285, 263.61, 260.22] },
      velocityScore: { '1D': 0, '1W': 29.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$74B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: 3.76, PBD: false, PBW: 2.05, IVEP: 4.82 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 3, avgWeight: 3.43, proScore: 2.06, coverage: 0.6,
      price: 165.84, weeklyPrices: [163.81, 163.80, 156.79, 164.52, 165.84], weeklyChange: 1.24, sortRank: 0, periodReturns: { '1M': -2.9, '6M': 63.1, '1Y': 143.4 },
      priceHistory: { '1W': [163.81, 163.8, 156.79, 164.52, 165.84], '1M': [170.74, 172.91, 173.96, 169.01, 160.69, 161.86, 163.57, 164.66, 169.29, 167.8, 164.87, 166.99, 171.55, 173.39, 176.39, 162.86, 163.81, 163.8, 156.79, 164.52, 165.84], '6M': [101.71, 101.54, 103.26, 110.09, 106.64, 112.66, 114.15, 116.69, 112.75, 116.88, 121.79, 110.55, 107.87, 120.27, 127.01, 121.26, 128.63, 129.7, 142.76, 142.9, 166.73, 173.96, 163.57, 166.99, 162.86, 165.84], '1Y': [68.13, 70.75, 73.25, 74.2, 74.55, 74.63, 79.07, 90.49, 88.76, 89.41, 89.4, 89.48, 91.44, 96.2, 97.7, 98.64, 98, 99.5, 100.23, 103.91, 112.36, 112.33, 104.09, 104.1, 105.36, 107.42, 102.61, 102.79, 103.01, 106.48, 104.54, 111.57, 115.62, 113.87, 111.9, 116.87, 121.79, 110.55, 107.87, 122.58, 118.44, 117.96, 130.56, 134.69, 142.17, 158.92, 166.73, 173.96, 163.57, 166.99, 162.86, 165.84] },
      velocityScore: { '1D': -0.5, '1W': 14.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 56.4, revenueGrowth: 54, eps: 2.94, grossMargin: 37, dividendYield: 0.51,
      etfPresence: { POW: 3.91, VOLT: 3.12, PBD: false, PBW: false, IVEP: 3.25 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 3, avgWeight: 2.87, proScore: 1.72, coverage: 0.6,
      price: 476.89, weeklyPrices: [485.03, 486.47, 467.59, 469.32, 476.89], weeklyChange: -1.68, sortRank: 0, periodReturns: { '1M': -1.9, '6M': 6.4, '1Y': 24.8 },
      priceHistory: { '1W': [485.03, 486.47, 467.59, 469.32, 476.89], '1M': [485.98, 483.79, 482.03, 479.97, 470.87, 463.32, 460.98, 475.01, 478.05, 484.25, 473.93, 473.61, 462.93, 480.46, 484.91, 476.82, 485.03, 486.47, 467.59, 469.32, 476.89], '6M': [448, 442.51, 451.39, 477.46, 481.68, 482.5, 485.73, 487.16, 516.03, 526.56, 524.19, 476.51, 468.41, 477.47, 503.2, 500.38, 534.67, 521.71, 557.85, 508.17, 493.04, 482.03, 460.98, 473.61, 476.82, 476.89], '1Y': [382.03, 394.69, 408.41, 412.5, 414.86, 428.55, 438.31, 429.06, 417.54, 432.22, 437.56, 430.15, 437.24, 435.44, 435.23, 430.31, 413.05, 418.72, 431.65, 433.98, 467.61, 462.28, 420.57, 424.08, 427.48, 438.7, 444.84, 451.03, 446.61, 468.2, 476.06, 484.06, 497.97, 487.4, 516.02, 526.73, 524.19, 476.51, 468.41, 492.65, 481.67, 494.25, 536.01, 535.57, 553.07, 508.43, 493.04, 482.03, 460.98, 473.61, 476.82, 476.89] },
      velocityScore: { '1D': 0, '1W': 12.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 28.2, revenueGrowth: 11, eps: 16.93, grossMargin: 36, dividendYield: 1.19,
      etfPresence: { POW: 2.88, VOLT: 3.27, PBD: false, PBW: false, IVEP: 2.45 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'NRG', name: 'NRG Energy Inc', easyScore: 3, avgWeight: 1.21, proScore: 0.72, coverage: 0.6,
      price: 125.47, weeklyPrices: [127.71, 129.96, 120.65, 123.70, 125.47], weeklyChange: -1.75, sortRank: 0, periodReturns: { '1M': -8.6, '6M': -22.3, '1Y': -17.5 },
      priceHistory: { '1W': [127.71, 129.96, 120.65, 123.7, 125.47], '1M': [137.34, 131.08, 134.72, 127.81, 125.5, 133.98, 136.92, 137.65, 140.43, 138, 137.5, 134.08, 129.47, 133.51, 133.76, 129.2, 127.71, 129.96, 120.65, 123.7, 125.47], '6M': [161.44, 156.2, 160.96, 159.63, 150.59, 150.68, 155.11, 143.99, 160.63, 175.01, 181.34, 160.46, 152.1, 159.11, 151.04, 149.9, 161.78, 168.5, 154.53, 155.58, 141.86, 134.72, 136.92, 134.08, 129.2, 125.47], '1Y': [152.04, 152.05, 160.58, 151.27, 146.88, 153.96, 158.54, 173.91, 152.03, 150.44, 144.77, 145.11, 152.26, 164.22, 167.43, 161.95, 163.95, 168.77, 167.01, 172.59, 174.48, 166.72, 163.21, 166.85, 164.08, 166.75, 159.99, 156.96, 160.43, 148.91, 149.83, 151.09, 153.72, 144.44, 161.8, 179.18, 181.34, 160.46, 152.1, 161.4, 146.14, 152.69, 164.07, 167.73, 159.81, 153.37, 141.86, 134.72, 136.92, 134.08, 129.2, 125.47] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 136.4, revenueGrowth: 20, eps: 0.92, grossMargin: 16, dividendYield: 1.51,
      etfPresence: { POW: 0.51, VOLT: 0.92, PBD: false, PBW: false, IVEP: 2.19 },
      tonyNote: 'NRG Energy Inc appears in 3 of 5 Electrification ETFs (60% coverage) with average weight 1.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, avgWeight: 5.68, proScore: 2.27, coverage: 0.4,
      price: 293.87, weeklyPrices: [279.13, 276.04, 276.95, 296.55, 293.87], weeklyChange: 5.28, sortRank: 0, periodReturns: { '1M': -1.5, '6M': 69.7, '1Y': 241.1 },
      priceHistory: { '1W': [279.13, 276.04, 276.95, 296.55, 293.87], '1M': [298.22, 266.92, 268.73, 256.72, 258.28, 254.75, 260.4, 270.01, 276.25, 280.13, 276.96, 274.52, 269.86, 269.22, 280.09, 262.56, 279.13, 276.04, 276.95, 296.55, 293.87], '6M': [173.12, 175.69, 174.34, 184, 193.82, 201.8, 207.78, 211.58, 238.4, 230.06, 232.12, 202.58, 195.18, 205.74, 220.77, 203.04, 235, 241.49, 268.31, 275.84, 290.46, 268.73, 260.4, 274.52, 262.56, 293.87], '1Y': [86.16, 93.31, 97.69, 101.2, 98.24, 106, 126.75, 131.51, 128.22, 131.57, 137.03, 135.97, 143.15, 148.78, 146.79, 141.02, 141.12, 145.02, 147.96, 155.89, 158.57, 166.99, 141.86, 145.88, 161.55, 167.43, 173.3, 174.02, 172.95, 181.03, 192.96, 200.29, 210.44, 208, 231.48, 235.04, 232.12, 202.58, 195.18, 214.95, 204.11, 204.65, 235.73, 254.25, 276.65, 283.6, 290.46, 268.73, 260.4, 274.52, 262.56, 293.87] },
      velocityScore: { '1D': -2.2, '1W': -13.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 71, revenueGrowth: 17, eps: 4.14, grossMargin: 39, dividendYield: 0.1,
      etfPresence: { POW: 3.51, VOLT: 7.85, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.2, proScore: 1.28, coverage: 0.4,
      price: 302.87, weeklyPrices: [300.57, 289.52, 280.98, 297.88, 302.87], weeklyChange: 0.77, sortRank: 0, periodReturns: { '1M': -17.5, '6M': 87.8, '1Y': 172.9 },
      priceHistory: { '1W': [300.57, 289.52, 280.98, 297.88, 302.87], '1M': [367.13, 369.99, 376.23, 370.94, 339.73, 315.67, 323.4, 327.46, 323.91, 319.78, 314.18, 315.71, 323.39, 334.49, 331.44, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87], '6M': [161.27, 159.82, 165.62, 174.95, 172.72, 181.47, 193.76, 182.56, 248.51, 243.06, 259.23, 249.75, 265.38, 264.71, 276.16, 259.37, 287.64, 294.13, 321.75, 328.49, 340.01, 376.23, 323.4, 315.71, 300.51, 302.87], '1Y': [110.97, 116.54, 128.41, 125.89, 127.37, 125.29, 142.55, 140.2, 139.83, 135.69, 125.02, 124.01, 125.58, 136.65, 142.61, 150.86, 162.8, 179, 175.73, 192.9, 191.4, 187.84, 166.65, 168.91, 180.91, 178.38, 161.74, 166.25, 164.34, 171.54, 170.86, 181.12, 195.1, 177.75, 236.51, 243.75, 259.23, 249.75, 265.38, 269.17, 252.4, 261.29, 295.11, 307.34, 323.46, 328.31, 340.01, 376.23, 323.4, 315.71, 300.51, 302.87] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$116B', pe: 76.3, revenueGrowth: 30, eps: 3.97, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 2.41, PBD: false, PBW: false, IVEP: 4 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 2.83, proScore: 1.13, coverage: 0.4,
      price: 129.23, weeklyPrices: [126.77, 127.76, 128.53, 128.48, 129.23], weeklyChange: 1.94, sortRank: 0, periodReturns: { '1M': -2.1, '6M': 13.2, '1Y': 25.6 },
      priceHistory: { '1W': [126.77, 127.76, 128.53, 128.48, 129.23], '1M': [131.94, 127.95, 128.6, 125.15, 127.68, 128.87, 129.61, 131.59, 130.9, 129.57, 127.76, 126.67, 123.79, 127.11, 126.31, 129.14, 126.77, 127.76, 128.53, 128.48, 129.23], '6M': [114.13, 114.49, 115.77, 115.04, 116.62, 118.98, 119.12, 119.98, 122.25, 128.42, 132.1, 132.04, 132.22, 130.97, 128.3, 131.67, 137.15, 134.56, 135.08, 137.11, 131.76, 128.6, 129.61, 126.67, 129.14, 129.23], '1Y': [102.9, 103.31, 103.76, 103.96, 104.4, 110.16, 107.95, 115, 112, 110.7, 113.01, 110.09, 108.36, 106.84, 108.14, 112.5, 115.66, 116.8, 117.82, 116.39, 119.92, 122.56, 123.72, 122.04, 119.23, 116.07, 115.77, 114.62, 115.99, 113.7, 118.11, 117.18, 119.21, 120.61, 126.43, 129.37, 132.1, 132.04, 132.22, 128.72, 128.85, 132.68, 136.3, 133.66, 134.73, 136.91, 131.76, 128.6, 129.61, 126.67, 129.14, 129.23] },
      velocityScore: { '1D': -0.9, '1W': -18.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 19.1, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.94,
      etfPresence: { POW: 1.4, VOLT: 4.25, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.8, proScore: 1.12, coverage: 0.4,
      price: 354.37, weeklyPrices: [306.11, 311.64, 308.17, 340.40, 354.37], weeklyChange: 15.77, sortRank: 0, periodReturns: { '1M': 4.4, '6M': 64.8, '1Y': 188.6 },
      priceHistory: { '1W': [306.11, 311.64, 308.17, 340.4, 354.37], '1M': [339.42, 339.19, 344.6, 323.46, 309.06, 313.05, 323.79, 324.86, 339.65, 328.34, 317.08, 302.18, 294.65, 312.28, 322.5, 294.81, 306.11, 311.64, 308.17, 340.4, 354.37], '6M': [215.07, 216.09, 217.26, 229.7, 233.92, 269, 263.76, 254.54, 308.77, 320.64, 337.35, 311.42, 305.82, 319.63, 342.87, 332.82, 374.98, 372.23, 382.47, 383.91, 351.94, 344.6, 323.79, 302.18, 294.81, 354.37], '1Y': [122.8, 130.03, 132.5, 138.07, 139.1, 140.68, 141.94, 140.56, 151.61, 153.23, 153.01, 145.49, 154.76, 158.03, 176.59, 170.14, 176.02, 182.15, 197.44, 205.12, 205.61, 219.3, 198.54, 206.04, 210.94, 221.27, 216.87, 217.76, 213.41, 224.4, 237.9, 275.57, 269.12, 257.64, 312.95, 331.23, 337.35, 311.42, 305.82, 327.8, 313.11, 332.31, 379.64, 375.6, 387.24, 389.05, 351.94, 344.6, 323.79, 302.18, 294.81, 354.37] },
      velocityScore: { '1D': 2.8, '1W': -10.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$14B', pe: 73.5, revenueGrowth: 26, eps: 4.82, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: 1.09, VOLT: 4.51, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.63, proScore: 1.05, coverage: 0.4,
      price: 153.8, weeklyPrices: [143.60, 154.07, 149.22, 152.46, 153.80], weeklyChange: 7.1, sortRank: 0, periodReturns: { '1M': 20.3, '6M': 19, '1Y': 66.3 },
      priceHistory: { '1W': [143.6, 154.07, 149.22, 152.46, 153.8], '1M': [127.87, 124.64, 129.19, 125, 121.72, 123.05, 124.86, 132.06, 139.56, 140.24, 147.68, 148.76, 146.34, 148.4, 147.62, 138.81, 143.6, 154.07, 149.22, 152.46, 153.8], '6M': [129.24, 135.29, 136.9, 141.38, 148.97, 154.6, 145.96, 130, 144.04, 151.2, 148.47, 136.24, 131.47, 127.81, 128.73, 127.7, 137.68, 148.96, 150.18, 147.27, 136.62, 129.19, 124.86, 148.76, 138.81, 153.8], '1Y': [92.49, 95.25, 98.75, 97.41, 99.44, 101.78, 106.7, 108.63, 109.81, 111.06, 109.73, 109.25, 116.79, 119.04, 125.4, 123.75, 123.4, 123.91, 127.67, 135.91, 141.55, 143.85, 132.33, 137.88, 141.49, 138.58, 129.9, 135.14, 136.2, 138.91, 146.75, 152.5, 149.58, 127.63, 143.73, 151.04, 148.47, 136.24, 131.47, 130.65, 123.13, 128, 140.75, 151.06, 149.71, 142.3, 136.62, 129.19, 124.86, 148.76, 138.81, 153.8] },
      velocityScore: { '1D': -0.9, '1W': -15.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$189B', pe: 44.2, revenueGrowth: 58, eps: 3.48, grossMargin: 38, dividendYield: 0.65,
      etfPresence: { POW: 1, VOLT: 4.27, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.58, proScore: 1.03, coverage: 0.4,
      price: 144.96, weeklyPrices: [144.05, 147.75, 139.36, 144.01, 144.96], weeklyChange: 0.63, sortRank: 0, periodReturns: { '1M': 2.8, '6M': 26.3, '1Y': 42.2 },
      priceHistory: { '1W': [144.05, 147.75, 139.36, 144.01, 144.96], '1M': [141.04, 143.8, 145.03, 143.08, 137.31, 137.75, 135.47, 138.36, 140.22, 138.2, 136.15, 134.06, 133.91, 141.99, 146.96, 143.65, 144.05, 147.75, 139.36, 144.01, 144.96], '6M': [114.76, 119.53, 121.71, 113.95, 112.09, 115.49, 116.74, 129.49, 140.96, 142.7, 143.42, 137.18, 130.94, 133.76, 137.48, 134.72, 141.85, 137.55, 141.73, 146.03, 139.25, 145.03, 135.47, 134.06, 143.65, 144.96], '1Y': [101.97, 103.35, 105.62, 105.5, 106.02, 108.3, 111.52, 106.48, 105.71, 105.71, 106.4, 105.96, 106.29, 106.96, 108.29, 109.95, 109.58, 106.38, 110.6, 113.05, 113.18, 122.58, 116.38, 114.19, 115.28, 115.77, 116.88, 119.96, 120.94, 112.41, 112.13, 114.51, 120.28, 132.52, 138.57, 143.79, 143.42, 137.18, 130.94, 133.25, 131.57, 132.97, 142.53, 140.87, 141.92, 145.08, 139.25, 145.03, 135.47, 134.06, 143.65, 144.96] },
      velocityScore: { '1D': -1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$88B', pe: 44.2, revenueGrowth: 8, eps: 3.28, grossMargin: 37, dividendYield: 1.1,
      etfPresence: { POW: false, VOLT: 1.46, PBD: false, PBW: false, IVEP: 3.7 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 2.57, proScore: 1.03, coverage: 0.4,
      price: 72.08, weeklyPrices: [71.59, 71.59, 72.26, 71.62, 72.08], weeklyChange: 0.68, sortRank: 0, periodReturns: { '1M': -3.5, '6M': 20.7, '1Y': 20.6 },
      priceHistory: { '1W': [71.59, 71.59, 72.26, 71.62, 72.08], '1M': [74.73, 75.71, 77.69, 77.72, 77.69, 77.88, 77.52, 78.47, 76.34, 74.37, 73.13, 71.39, 70.04, 71.31, 71.66, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08], '6M': [59.74, 58.26, 59.8, 59.5, 60.49, 63.18, 66.92, 66.46, 71.12, 72.17, 74.77, 74.77, 73.52, 72.8, 73.81, 71.83, 72.82, 70.86, 71.65, 76.31, 72.95, 77.69, 77.52, 71.39, 71.96, 72.08], '1Y': [59.78, 60.48, 62.81, 57.69, 58.37, 57.36, 57.51, 60.26, 58.06, 56.52, 56.83, 57.38, 57.57, 57.95, 61.39, 63.35, 63.58, 62.68, 63.06, 57.67, 59.03, 60.6, 59.91, 59.43, 60.21, 61.55, 59.48, 58.92, 60.16, 60.39, 60.71, 63.72, 67.24, 67.42, 71.13, 72.98, 74.77, 74.77, 73.52, 74.06, 74.06, 72, 72.74, 71.15, 72.18, 75.54, 72.95, 77.69, 77.52, 71.39, 71.96, 72.08] },
      velocityScore: { '1D': -1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$88B', pe: 31.6, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.91,
      etfPresence: { POW: false, VOLT: 1.51, PBD: false, PBW: false, IVEP: 3.64 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CEG', name: 'Constellation Energy Corp', easyScore: 2, avgWeight: 2.32, proScore: 0.93, coverage: 0.4,
      price: 253.76, weeklyPrices: [250.67, 251.65, 242.30, 246.71, 253.76], weeklyChange: 1.23, sortRank: 0, periodReturns: { '1M': -13.6, '6M': -27.9, '1Y': -14.5 },
      priceHistory: { '1W': [250.67, 251.65, 242.3, 246.71, 253.76], '1M': [293.6, 274.89, 275.26, 267.2, 262, 281.26, 285.83, 294.07, 301.57, 288.68, 286.31, 287.75, 265.7, 272.65, 267.24, 254.83, 250.67, 251.65, 242.3, 246.71, 253.76], '6M': [351.98, 355.4, 358.33, 354.58, 333.53, 294.37, 287.95, 250.46, 276.85, 291.66, 323.56, 332.07, 301.55, 317.22, 303.32, 279.46, 280.25, 299.14, 292.77, 313, 311.28, 275.26, 285.83, 287.75, 254.83, 253.76], '1Y': [296.89, 315.21, 322.76, 312.84, 317.99, 317.79, 328.66, 354.89, 331.49, 322.77, 310.68, 307.19, 300.82, 322.91, 336.65, 329.07, 364.1, 380.91, 370, 391.15, 377.71, 360.93, 338.67, 354.11, 363.67, 359.15, 357.14, 357.81, 357.12, 338.63, 330.38, 287.35, 287.45, 247.06, 276.12, 294.84, 323.56, 332.07, 301.55, 316.47, 295.19, 272.82, 286.5, 296.21, 313.53, 307.81, 311.28, 275.26, 285.83, 287.75, 254.83, 253.76] },
      velocityScore: { '1D': 2.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$91B', pe: 22, revenueGrowth: 64, eps: 11.52, grossMargin: 23, dividendYield: 0.67,
      etfPresence: { POW: 1.33, VOLT: false, PBD: false, PBW: false, IVEP: 3.31 },
      tonyNote: 'Constellation Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX TECHNOLOGIES INC', easyScore: 2, avgWeight: 2.12, proScore: 0.85, coverage: 0.4,
      price: 193.45, weeklyPrices: [187.46, 188.96, 183.00, 194.68, 193.45], weeklyChange: 3.2, sortRank: 0, periodReturns: { '1M': -6.5, '6M': 10.5, '1Y': 40.1 },
      priceHistory: { '1W': [187.46, 188.96, 183, 194.68, 193.45], '1M': [206.83, 206.83, 210.94, 204.72, 201.94, 202.66, 202.52, 202.91, 204.38, 198.95, 199.27, 195.88, 188.39, 187.26, 184.72, 185.95, 187.46, 188.96, 183, 194.68, 193.45], '6M': [175.03, 176.43, 175.49, 195.3, 210.54, 209.52, 216.3, 190.1, 198.5, 209.07, 207.24, 195.5, 197.82, 208.98, 222.13, 212.81, 230.29, 230.8, 225.51, 216.39, 209.89, 210.94, 202.52, 195.88, 185.95, 193.45], '1Y': [138.07, 142.06, 144.06, 137.37, 137.45, 140.04, 149.83, 154.51, 177.89, 170.94, 162.84, 160.03, 162.23, 176.65, 178.02, 184.37, 191.38, 197.37, 207.72, 204.03, 215.86, 198.79, 176.18, 174.62, 176.2, 177.16, 174.37, 178.41, 174.36, 192.24, 204.08, 206.33, 210.18, 187.42, 196.9, 206.44, 207.24, 195.5, 197.82, 210.12, 205.09, 214.98, 229.57, 235.78, 223.15, 216.31, 209.89, 210.94, 202.52, 195.88, 185.95, 193.45] },
      velocityScore: { '1D': -1.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 51.6, revenueGrowth: 26, eps: 3.75, grossMargin: 23, dividendYield: 0.54,
      etfPresence: { POW: false, VOLT: 2.07, PBD: false, PBW: false, IVEP: 2.16 },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'SO', name: 'Southern Co/The', easyScore: 2, avgWeight: 2.02, proScore: 0.81, coverage: 0.4,
      price: 94, weeklyPrices: [91.28, 92.95, 94.02, 93.27, 94.00], weeklyChange: 2.98, sortRank: 0, periodReturns: { '1M': 0.6, '6M': 11.3, '1Y': 4 },
      priceHistory: { '1W': [91.28, 92.95, 94.02, 93.27, 94], '1M': [93.47, 93.14, 93.68, 92.55, 93.71, 93.62, 94.24, 94.55, 94.09, 93.74, 92.52, 92.05, 89.03, 90.51, 90.49, 92.6, 91.28, 92.95, 94.02, 93.27, 94], '6M': [84.44, 85.28, 87.54, 87.52, 87.55, 89.15, 88.33, 90.29, 90.86, 95.05, 96.35, 97.2, 97.84, 96.54, 94.61, 96.94, 97.59, 94.9, 93.91, 96.7, 92.43, 93.68, 94.24, 92.05, 92.6, 94], '1Y': [90.35, 90.67, 91.83, 91.26, 92.47, 95.85, 94.3, 96, 94.57, 92.85, 93.13, 92.09, 91.21, 91.36, 93.72, 94.77, 95.49, 98.08, 97.69, 95.4, 93.15, 90.76, 90.58, 89.14, 89.04, 85.49, 86, 85.72, 87.57, 86.27, 88.42, 87.51, 89.14, 91.08, 92.56, 94.3, 96.35, 97.2, 97.84, 96.23, 95.42, 97.45, 97.15, 94.51, 93.49, 96.71, 92.43, 93.68, 94.24, 92.05, 92.6, 94] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$106B', pe: 24, revenueGrowth: 8, eps: 3.91, grossMargin: 48, dividendYield: 3.23,
      etfPresence: { POW: 0.31, VOLT: false, PBD: false, PBW: false, IVEP: 3.73 },
      tonyNote: 'Southern Co/The appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'XEL', name: 'Xcel Energy Inc', easyScore: 2, avgWeight: 1.96, proScore: 0.78, coverage: 0.4,
      price: 79.22, weeklyPrices: [77.62, 77.87, 78.10, 78.27, 79.22], weeklyChange: 2.06, sortRank: 0, periodReturns: { '1M': -0.9, '6M': 5.4, '1Y': 17.2 },
      priceHistory: { '1W': [77.62, 77.87, 78.1, 78.27, 79.22], '1M': [79.9, 79.91, 80.03, 77.92, 78.1, 79.86, 80.2, 81.08, 80.78, 81, 79.26, 79.5, 76.41, 77.87, 77.39, 79.04, 77.62, 77.87, 78.1, 78.27, 79.22], '6M': [75.15, 72.67, 74.12, 74.43, 74.94, 76.51, 76.01, 76.2, 77.92, 80.82, 83.47, 82.38, 80.82, 80.02, 77.7, 79.71, 82.77, 81.05, 79.48, 82.95, 80.43, 80.03, 80.2, 79.5, 79.04, 79.22], '1Y': [67.62, 67.91, 68.1, 67.56, 68.33, 73.06, 71.14, 74.24, 72.68, 72.21, 73.03, 72.14, 72.02, 72.11, 73.04, 80.65, 81, 80.16, 81.28, 80.69, 81.26, 80.4, 81.31, 80.26, 79.04, 75.72, 75.72, 73.85, 74.19, 73.22, 76.2, 75.86, 75.97, 76.12, 78.98, 81.55, 83.47, 82.38, 80.82, 79.53, 77.93, 80.74, 82.38, 81.08, 79.15, 82.58, 80.43, 80.03, 80.2, 79.5, 79.04, 79.22] },
      velocityScore: { '1D': -1.3, '1W': -17.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$49B', pe: 22.8, revenueGrowth: 3, eps: 3.47, grossMargin: 46, dividendYield: 2.99,
      etfPresence: { POW: 1.98, VOLT: 1.94, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Xcel Energy Inc appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 5.37, proScore: 2.15, coverage: 0.4,
      price: 858.99, weeklyPrices: [891.86, 842.01, 770.25, 838.55, 858.99], weeklyChange: -3.69, sortRank: 0, periodReturns: { '1M': 0.9, '6M': 172.6, '1Y': 323.2 },
      priceHistory: { '1W': [891.86, 842.01, 770.25, 838.55, 858.99], '1M': [851.35, 854.28, 889.03, 848.84, 770.76, 752, 733.77, 732.94, 783.53, 782.12, 842.96, 860.84, 845.39, 875.52, 957.03, 882.43, 891.86, 842.01, 770.25, 838.55, 858.99], '6M': [315.15, 308.58, 310.79, 317.41, 321.6, 362.53, 373.52, 360.16, 433.91, 415.13, 433.34, 398.87, 404.59, 421.23, 452.92, 421.29, 435.65, 441.1, 495.67, 515.62, 811.41, 889.03, 733.77, 860.84, 882.43, 858.99], '1Y': [202.99, 222.5, 230.73, 227.02, 238.4, 242.01, 263.59, 271.74, 289.86, 283.2, 286.49, 276.91, 286.69, 319.38, 371.84, 339.68, 352.78, 355.27, 369.01, 376.74, 392.77, 384.45, 332.82, 342.44, 327.78, 324.1, 319.12, 313.04, 307.68, 312.24, 319.27, 364.25, 379.23, 365.07, 431.43, 435.5, 433.34, 398.87, 404.59, 431.78, 415.93, 416.34, 446.36, 463.65, 497.18, 532.67, 811.41, 889.03, 733.77, 860.84, 882.43, 858.99] },
      velocityScore: { '1D': 0.9, '1W': -12.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 76.9, revenueGrowth: 92, eps: 11.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 6.32, PRN: 4.42, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 5.21, proScore: 2.09, coverage: 0.4,
      price: 294.75, weeklyPrices: [293.60, 283.51, 262.34, 290.50, 294.75], weeklyChange: 0.39, sortRank: 0, periodReturns: { '1M': -4.3, '6M': 162.3, '1Y': 370.7 },
      priceHistory: { '1W': [293.6, 283.51, 262.34, 290.5, 294.75], '1M': [308.05, 300.84, 296.98, 292.65, 266.8, 271.05, 270.75, 279.22, 291.97, 295.94, 288.9, 284.42, 288.12, 299.07, 299.73, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75], '6M': [112.36, 110.97, 111.96, 120, 133.04, 140.62, 147.81, 175.77, 197.45, 178.79, 176.96, 167.67, 171.19, 167.41, 194.85, 184.68, 230.81, 232.81, 252.18, 277.27, 305.93, 296.98, 270.75, 284.42, 284.87, 294.75], '1Y': [62.62, 60.17, 70.15, 72.14, 70.37, 73.67, 80.8, 76.72, 88.28, 86.57, 86.12, 87.92, 92.3, 99.41, 97.41, 101.6, 103.9, 105.33, 116.4, 124.71, 130.23, 124.62, 105.94, 100.03, 107.5, 115.02, 109.31, 112.18, 109.16, 118.62, 133.76, 142.29, 152.31, 179.6, 197.63, 182.27, 176.96, 167.67, 171.19, 175.13, 174.8, 182.6, 230.94, 241.01, 252.76, 275.33, 305.93, 296.98, 270.75, 284.42, 284.87, 294.75] },
      velocityScore: { '1D': 2, '1W': -20.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 57.5, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { AIRR: 2.63, PRN: false, RSHO: 7.8, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 4.93, proScore: 1.97, coverage: 0.4,
      price: 910.57, weeklyPrices: [915.64, 914.70, 856.16, 897.63, 910.57], weeklyChange: -0.55, sortRank: 0, periodReturns: { '1M': -0.2, '6M': 52.3, '1Y': 155 },
      priceHistory: { '1W': [915.64, 914.7, 856.16, 897.63, 910.57], '1M': [912.14, 902.3, 920.22, 888.31, 863.95, 872.56, 865.95, 879.89, 908.55, 909.93, 887.67, 875.87, 865.36, 909.81, 926.18, 904.28, 915.64, 914.7, 856.16, 897.63, 910.57], '6M': [597.89, 576.22, 578.61, 623.09, 636.53, 645.38, 643.28, 691.82, 775, 760.53, 752.93, 706.08, 700.69, 693.62, 719.04, 730.32, 787.07, 772.66, 835.24, 890.11, 895.69, 920.22, 865.95, 875.87, 904.28, 910.57], '1Y': [357.05, 366.23, 388.21, 394.29, 404.64, 417.19, 432.94, 433.7, 408.54, 412.64, 432.3, 416.05, 418.09, 440.67, 471.26, 477.15, 495.38, 504.76, 531.18, 527.07, 570.59, 570.85, 552.05, 559.6, 582.47, 594.36, 589.76, 582.41, 577.39, 596.52, 638.75, 648.41, 665.24, 678.31, 758.29, 759.74, 752.93, 706.08, 700.69, 688.65, 703.19, 717.22, 790.66, 794.65, 830.79, 889.67, 895.69, 920.22, 865.95, 875.87, 904.28, 910.57] },
      velocityScore: { '1D': -1.5, '1W': -2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$419B', pe: 45.3, revenueGrowth: 22, eps: 20.12, grossMargin: 29, dividendYield: 0.72,
      etfPresence: { AIRR: false, PRN: 3.27, RSHO: 6.59, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.5, proScore: 1.8, coverage: 0.4,
      price: 1877.61, weeklyPrices: [1852.03, 1831.56, 1719.48, 1843.42, 1877.61], weeklyChange: 1.38, sortRank: 0, periodReturns: { '1M': -6.9, '6M': 94, '1Y': 281.1 },
      priceHistory: { '1W': [1852.03, 1831.56, 1719.48, 1843.42, 1877.61], '1M': [2016.31, 2034.63, 2042.36, 1992.74, 1854.43, 1835.51, 1835.33, 1828.25, 1883.56, 1867.09, 1855.15, 1828.21, 1787.88, 1883.26, 1850.04, 1843.94, 1852.03, 1831.56, 1719.48, 1843.42, 1877.61], '6M': [967.95, 940.74, 950.67, 1035.11, 1073.14, 1148, 1169.05, 1119.81, 1338.65, 1373.52, 1438.23, 1348.22, 1373.76, 1423, 1470.64, 1428.52, 1574.45, 1605.97, 1773.91, 1840.25, 1942.02, 2042.36, 1835.33, 1828.21, 1843.94, 1877.61], '1Y': [492.72, 502.98, 536.21, 527.42, 539.02, 532.14, 692.97, 699.16, 693.31, 695.76, 691.18, 698.61, 709.53, 777.18, 804.24, 825.18, 825.42, 845.99, 836.75, 976.45, 977.67, 974.14, 919.82, 945.07, 935.78, 983.61, 968.48, 950.79, 946.93, 1035.12, 1053.1, 1131.7, 1171.46, 1147.97, 1300.02, 1462.23, 1438.23, 1348.22, 1373.76, 1444.6, 1358.66, 1417.19, 1592.84, 1650.47, 1726.12, 1867.02, 1942.02, 2042.36, 1835.33, 1828.21, 1843.94, 1877.61] },
      velocityScore: { '1D': 0.6, '1W': -0.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 54.3, revenueGrowth: 1, eps: 34.55, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: 4.31, PRN: 4.7, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, avgWeight: 4.01, proScore: 1.6, coverage: 0.4,
      price: 641.68, weeklyPrices: [619.98, 613.93, 588.90, 623.66, 641.68], weeklyChange: 3.5, sortRank: 0, periodReturns: { '1M': -5.8, '6M': 100.6, '1Y': 194.1 },
      priceHistory: { '1W': [619.98, 613.93, 588.9, 623.66, 641.68], '1M': [681.01, 719.92, 740.91, 722.31, 664.76, 630.5, 644.64, 656.35, 670.66, 673.51, 677.45, 667.02, 646.89, 663.14, 686.37, 694.72, 619.98, 613.93, 588.9, 623.66, 641.68], '6M': [319.91, 325.59, 320.73, 330.42, 314.09, 397.42, 358.87, 354.14, 422.5, 432.18, 452.53, 430.25, 459.3, 469.81, 437.48, 571.38, 609.29, 601.83, 656.79, 669.98, 690, 740.91, 644.64, 667.02, 694.72, 641.68], '1Y': [218.17, 208.55, 220.48, 202.53, 222.2, 205.66, 236.89, 223.41, 228.08, 225.32, 226.88, 224.09, 217.41, 238.22, 266.64, 270.05, 263.53, 294.72, 290.27, 294.99, 310.41, 335.96, 346.35, 371.95, 357.48, 332.87, 317.58, 337.9, 315.44, 337.03, 317.76, 380.36, 355.51, 345.97, 413.65, 437.61, 452.53, 430.25, 459.3, 479.9, 410.85, 575.16, 603.84, 597.88, 652.99, 702.27, 690, 740.91, 644.64, 667.02, 694.72, 641.68] },
      velocityScore: { '1D': 0.6, '1W': -6.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 56.5, revenueGrowth: 50, eps: 11.36, grossMargin: 21, dividendYield: 0.31,
      etfPresence: { AIRR: 3.91, PRN: 4.11, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Argan Inc is an engineering and construction company for power generation facilities — natural gas and renewable power plants. It appears in Industrials ETFs because power plant construction is one of the fastest-growing categories in U.S. infrastructure spending, driven by data center load additions that the grid cannot currently support.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.46, proScore: 1.38, coverage: 0.4,
      price: 320.11, weeklyPrices: [314.42, 322.81, 314.08, 318.89, 320.11], weeklyChange: 1.81, sortRank: 0, periodReturns: { '1M': 2, '6M': 22.3, '1Y': 41.9 },
      priceHistory: { '1W': [314.42, 322.81, 314.08, 318.89, 320.11], '1M': [313.7, 310.87, 315.72, 307.17, 305.22, 306.25, 305.66, 307.1, 311.33, 312.65, 308.53, 303.81, 300.98, 308.31, 313.39, 315.29, 314.42, 322.81, 314.08, 318.89, 320.11], '6M': [261.74, 262.41, 263.4, 265.39, 278.77, 284, 256.26, 289.94, 290.31, 281.13, 283.5, 274.97, 259.88, 258.51, 266, 269.36, 286.41, 284.39, 294.4, 305.75, 310.37, 315.72, 305.66, 303.81, 315.29, 320.11], '1Y': [225.66, 231.96, 232.45, 247.66, 254.41, 264.89, 274.69, 267.16, 262.51, 262.36, 264.21, 263.15, 261.61, 262.58, 264.9, 261.05, 259.04, 246.74, 249.57, 260, 253.33, 259.74, 240.63, 249.05, 257.32, 257.3, 259.81, 263.48, 261.16, 260.8, 277.62, 282.33, 259.51, 287.03, 279.03, 281.97, 283.5, 274.97, 259.88, 256.58, 260.51, 267.12, 289.01, 291.03, 293.35, 302.99, 310.37, 315.72, 305.66, 303.81, 315.29, 320.11] },
      velocityScore: { '1D': -1.4, '1W': 3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 30.2, revenueGrowth: 7, eps: 10.6, grossMargin: 30, dividendYield: 0.64,
      etfPresence: { AIRR: 1.75, PRN: false, RSHO: 5.17, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.81, proScore: 1.13, coverage: 0.4,
      price: 230.05, weeklyPrices: [229.95, 228.01, 223.63, 233.49, 230.05], weeklyChange: 0.04, sortRank: 0, periodReturns: { '1M': 15.6, '6M': 4.6, '1Y': 48.9 },
      priceHistory: { '1W': [229.95, 228.01, 223.63, 233.49, 230.05], '1M': [198.99, 203.79, 203.5, 200.99, 200.47, 205.55, 205.39, 207.8, 219.08, 215.34, 213.82, 216.66, 220.92, 230.08, 234.08, 227.8, 229.95, 228.01, 223.63, 233.49, 230.05], '6M': [219.94, 203.17, 205.66, 208.63, 211.07, 220.86, 211.34, 212.76, 233.46, 241.01, 231.59, 211.9, 202.65, 202.46, 201.27, 203.16, 215.54, 215.27, 223.96, 218.91, 205.27, 203.5, 205.39, 216.66, 227.8, 230.05], '1Y': [154.45, 158, 167.68, 170.53, 170.82, 173.83, 180.42, 200.98, 200.51, 187.85, 188.95, 184.11, 186.04, 185.77, 187.6, 186.78, 190.89, 180.71, 184.97, 195.85, 215.13, 224.93, 207.28, 211.97, 209.18, 209.32, 218.13, 207.18, 203.51, 208, 209.78, 217.13, 211.84, 218.02, 230.92, 242.29, 231.59, 211.9, 202.65, 202.36, 200.45, 197.29, 215.97, 223.52, 222.82, 208.13, 205.27, 203.5, 205.39, 216.66, 227.8, 230.05] },
      velocityScore: { '1D': 0.9, '1W': -22.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 44.1, revenueGrowth: 17, eps: 5.22, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.63, PRN: false, RSHO: 4, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 2, avgWeight: 2.74, proScore: 1.09, coverage: 0.4,
      price: 264.67, weeklyPrices: [246.55, 257.16, 249.49, 264.60, 264.67], weeklyChange: 7.35, sortRank: 0, periodReturns: { '1M': -1.9, '6M': 33.5, '1Y': 54.6 },
      priceHistory: { '1W': [246.55, 257.16, 249.49, 264.6, 264.67], '1M': [269.76, 273.1, 272.37, 260.35, 256.99, 261.21, 259.89, 256.55, 261.89, 258.02, 259.89, 258.25, 255.52, 250.72, 248.63, 251.9, 246.55, 257.16, 249.49, 264.6, 264.67], '6M': [198.31, 203.49, 209.49, 214.69, 219.64, 225, 210.84, 208.61, 230.85, 251.3, 260.31, 252.39, 243.82, 241.93, 241.62, 239.04, 254.06, 247.6, 246.16, 243.04, 272.54, 272.37, 259.89, 258.25, 251.9, 264.67], '1Y': [171.2, 175.63, 186.13, 179.46, 184.68, 183.34, 188.17, 181.16, 179.88, 173.05, 171.24, 173.22, 178.98, 187.46, 193.58, 196.23, 190.48, 189.99, 192.52, 201.84, 206.74, 209.74, 200.28, 200.12, 196.26, 191.36, 197.24, 208.17, 207.81, 210.9, 220.25, 217.7, 208.93, 209.63, 244.79, 258.1, 260.31, 252.39, 243.82, 232.94, 230.51, 232.68, 252.67, 255.69, 242.44, 239.51, 272.54, 272.37, 259.89, 258.25, 251.9, 264.67] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$106B', pe: 61.4, revenueGrowth: 19, eps: 4.31, grossMargin: 35, dividendYield: 0.18,
      etfPresence: { AIRR: false, PRN: 3.35, RSHO: false, IDEF: 2.12, BILT: false },
      tonyNote: 'Howmet Aerospace is an aerospace structures and engine components manufacturer. It appears in Industrials ETFs for its aerospace and defense exposure — commercial air travel recovery and defense spending growth are the two demand drivers. Revenue grew and margins are expanding as Howmet prices power over OEM customers.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.35, proScore: 0.94, coverage: 0.4,
      price: 193.45, weeklyPrices: [187.46, 188.96, 183.00, 194.68, 193.45], weeklyChange: 3.2, sortRank: 0, periodReturns: { '1M': -6.5, '6M': 10.5, '1Y': 40.1 },
      priceHistory: { '1W': [187.46, 188.96, 183, 194.68, 193.45], '1M': [206.83, 206.83, 210.94, 204.72, 201.94, 202.66, 202.52, 202.91, 204.38, 198.95, 199.27, 195.88, 188.39, 187.26, 184.72, 185.95, 187.46, 188.96, 183, 194.68, 193.45], '6M': [175.03, 176.43, 175.49, 195.3, 210.54, 209.52, 216.3, 190.1, 198.5, 209.07, 207.24, 195.5, 197.82, 208.98, 222.13, 212.81, 230.29, 230.8, 225.51, 216.39, 209.89, 210.94, 202.52, 195.88, 185.95, 193.45], '1Y': [138.07, 142.06, 144.06, 137.37, 137.45, 140.04, 149.83, 154.51, 177.89, 170.94, 162.84, 160.03, 162.23, 176.65, 178.02, 184.37, 191.38, 197.37, 207.72, 204.03, 215.86, 198.79, 176.18, 174.62, 176.2, 177.16, 174.37, 178.41, 174.36, 192.24, 204.08, 206.33, 210.18, 187.42, 196.9, 206.44, 207.24, 195.5, 197.82, 210.12, 205.09, 214.98, 229.57, 235.78, 223.15, 216.31, 209.89, 210.94, 202.52, 195.88, 185.95, 193.45] },
      velocityScore: { '1D': -1.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 51.6, revenueGrowth: 26, eps: 3.75, grossMargin: 23, dividendYield: 0.54,
      etfPresence: { AIRR: 3.04, PRN: false, RSHO: false, IDEF: 1.67, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 2, avgWeight: 2.11, proScore: 0.84, coverage: 0.4,
      price: 31.15, weeklyPrices: [32.74, 31.17, 30.72, 34.17, 31.15], weeklyChange: -4.86, sortRank: 0, periodReturns: { '1M': -23.4, '6M': 70.8, '1Y': 480.1 },
      priceHistory: { '1W': [32.74, 31.17, 30.72, 34.17, 31.15], '1M': [40.68, 40.74, 43.04, 41.62, 41.61, 42.66, 42.48, 44.35, 48.32, 50.48, 51.4, 51.14, 46.46, 48.09, 43.13, 32.22, 32.74, 31.17, 30.72, 34.17, 31.15], '6M': [18.24, 19.18, 19.87, 21.84, 25.32, 26.38, 27.88, 21.77, 21.65, 25.11, 25.6, 24.59, 24.97, 24.81, 35.37, 30.71, 34.23, 39.89, 38.29, 36.97, 35.24, 43.04, 42.48, 51.14, 32.22, 31.15], '1Y': [5.37, 5.3, 6.1, 6.93, 6.43, 6.6, 6.36, 6.54, 6.42, 6.84, 7.06, 6.65, 9.02, 9.75, 12.05, 12.98, 15.24, 15.25, 13.56, 13.31, 13.19, 13.39, 11.21, 11.54, 11.77, 12.84, 18.05, 20.6, 19.74, 22.61, 26.73, 26.06, 26.35, 20.43, 21.3, 23.9, 25.6, 24.59, 24.97, 26.96, 32.4, 35.88, 34.67, 38.48, 35.44, 36.9, 35.24, 43.04, 42.48, 51.14, 32.22, 31.15] },
      velocityScore: { '1D': 0, '1W': -27, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: null, revenueGrowth: 42, eps: -1.16, grossMargin: 56, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 3.75, RSHO: false, IDEF: 0.47, BILT: false },
      tonyNote: 'Planet Labs is a satellite earth observation company. It holds a speculative position in Industrials ETFs as a data infrastructure name — providing satellite imagery and analytics that support agricultural, energy, and government decision-making. Revenue is growing from a small base; the ETF weight is minimal and the position is thematic.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 2, proScore: 0.8, coverage: 0.4,
      price: 57.75, weeklyPrices: [57.73, 56.19, 54.82, 58.78, 57.75], weeklyChange: 0.03, sortRank: 0, periodReturns: { '1M': 0.7, '6M': -24, '1Y': 38.3 },
      priceHistory: { '1W': [57.73, 56.19, 54.82, 58.78, 57.75], '1M': [57.33, 52.49, 54.85, 52.09, 54.22, 55.82, 54.67, 56.18, 56.8, 57.3, 65.19, 64.13, 63.49, 63.27, 58.43, 58.52, 57.73, 56.19, 54.82, 58.78, 57.75], '6M': [75.96, 75.39, 77.47, 91.93, 119.72, 120.59, 112.67, 91.33, 87.78, 105.67, 92.14, 85.54, 89.46, 93.04, 79.98, 67.7, 68.33, 74.41, 65.52, 63.05, 57, 54.85, 54.67, 64.13, 58.52, 57.75], '1Y': [41.76, 43.63, 46.45, 44.34, 51.12, 55.42, 59.36, 59.5, 65.41, 68.74, 66.9, 66.09, 64.56, 76.35, 83.9, 91.37, 100.25, 96.28, 86.65, 90.68, 91.1, 79.18, 70.24, 74.11, 70.96, 77.03, 74.26, 81.53, 75.98, 91.44, 121.5, 113.85, 108.16, 85.25, 87.05, 96.08, 92.14, 85.54, 89.46, 92.78, 75.86, 67.31, 70.34, 70.99, 61.26, 62.05, 57, 54.85, 54.67, 64.13, 58.52, 57.75] },
      velocityScore: { '1D': -2.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 339.7, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.89, PRN: false, RSHO: false, IDEF: 1.12, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.88, proScore: 0.75, coverage: 0.4,
      price: 297.68, weeklyPrices: [292.26, 297.52, 289.13, 300.95, 297.68], weeklyChange: 1.85, sortRank: 0, periodReturns: { '1M': -10.8, '6M': -8.9, '1Y': 27.9 },
      priceHistory: { '1W': [292.26, 297.52, 289.13, 300.95, 297.68], '1M': [333.56, 334.22, 336.95, 326.17, 329.35, 321.92, 317.55, 320.63, 320.95, 317.56, 320.9, 308.17, 296.41, 293.66, 287.54, 293.04, 292.26, 297.52, 289.13, 300.95, 297.68], '6M': [326.92, 336.64, 345.73, 367.6, 411.66, 422.68, 425.39, 413.14, 392.7, 443.14, 443, 421.17, 414.56, 427.99, 402.56, 393.32, 403.37, 396.17, 370.14, 364.29, 314.72, 336.95, 317.55, 308.17, 293.04, 297.68], '1Y': [232.73, 237.1, 241.46, 247.95, 253.68, 253.96, 262.49, 265.67, 266.65, 267.6, 270.72, 269.71, 267.07, 273.19, 276.01, 287.91, 288.49, 287.9, 285.77, 301.69, 317.54, 318.66, 309.74, 309.92, 307.2, 314.95, 329.16, 353.52, 341.98, 356.45, 415.39, 424.14, 427.83, 369.38, 406.76, 437.57, 443, 421.17, 414.56, 418.42, 384.79, 396.62, 394.41, 394.81, 359.29, 360.6, 314.72, 336.95, 317.55, 308.17, 293.04, 297.68] },
      velocityScore: { '1D': -1.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 19.3, revenueGrowth: 13, eps: 15.39, grossMargin: 12, dividendYield: 1.85,
      etfPresence: { AIRR: 2.68, PRN: false, RSHO: false, IDEF: 1.08, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'WMB', name: 'WMB', easyScore: 2, avgWeight: 1.38, proScore: 0.55, coverage: 0.4,
      price: 72.08, weeklyPrices: [71.59, 71.59, 72.26, 71.62, 72.08], weeklyChange: 0.68, sortRank: 0, periodReturns: { '1M': -3.5, '6M': 20.7, '1Y': 20.6 },
      priceHistory: { '1W': [71.59, 71.59, 72.26, 71.62, 72.08], '1M': [74.73, 75.71, 77.69, 77.72, 77.69, 77.88, 77.52, 78.47, 76.34, 74.37, 73.13, 71.39, 70.04, 71.31, 71.66, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08], '6M': [59.74, 58.26, 59.8, 59.5, 60.49, 63.18, 66.92, 66.46, 71.12, 72.17, 74.77, 74.77, 73.52, 72.8, 73.81, 71.83, 72.82, 70.86, 71.65, 76.31, 72.95, 77.69, 77.52, 71.39, 71.96, 72.08], '1Y': [59.78, 60.48, 62.81, 57.69, 58.37, 57.36, 57.51, 60.26, 58.06, 56.52, 56.83, 57.38, 57.57, 57.95, 61.39, 63.35, 63.58, 62.68, 63.06, 57.67, 59.03, 60.6, 59.91, 59.43, 60.21, 61.55, 59.48, 58.92, 60.16, 60.39, 60.71, 63.72, 67.24, 67.42, 71.13, 72.98, 74.77, 74.77, 73.52, 74.06, 74.06, 72, 72.74, 71.15, 72.18, 75.54, 72.95, 77.69, 77.52, 71.39, 71.96, 72.08] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$88B', pe: 31.6, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.91,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.95, IDEF: false, BILT: 1.81 },
      tonyNote: 'WMB appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.17, proScore: 0.47, coverage: 0.4,
      price: 120.3, weeklyPrices: [110.94, 108.82, 106.81, 119.32, 120.30], weeklyChange: 8.44, sortRank: 0, periodReturns: { '1M': 30.3, '6M': 61.5, '1Y': 127.1 },
      priceHistory: { '1W': [110.94, 108.82, 106.81, 119.32, 120.3], '1M': [92.32, 92.5, 94.55, 92.03, 93.39, 94.81, 96.36, 98.55, 99.32, 97.11, 108.11, 111.7, 111.28, 112.87, 111.59, 111.27, 110.94, 108.82, 106.81, 119.32, 120.3], '6M': [74.49, 69.65, 74.93, 84.25, 99.14, 99.57, 100.02, 77.12, 80.33, 89.86, 89.58, 84.96, 81.44, 78.97, 78.71, 74.75, 79.23, 84.91, 78.91, 78.91, 88.06, 94.55, 96.36, 111.7, 111.27, 120.3], '1Y': [52.98, 51.83, 53.86, 52, 50.09, 51.51, 52.76, 53.56, 53.58, 66.8, 67.98, 67.66, 68.69, 74.59, 75.34, 77.4, 84, 76.69, 77.04, 78.55, 77.78, 74.65, 68.35, 66.67, 67.69, 71.86, 74.49, 73.51, 73.85, 84.8, 98.62, 99.48, 98.29, 79.07, 80.25, 87.63, 89.58, 84.96, 81.44, 77.81, 76.16, 74.22, 79.6, 84.05, 77.99, 78.55, 88.06, 94.55, 96.36, 111.7, 111.27, 120.3] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.26, PRN: false, RSHO: false, IDEF: 1.08, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.14, proScore: 0.45, coverage: 0.4,
      price: 603.64, weeklyPrices: [590.97, 592.41, 576.74, 607.46, 603.64], weeklyChange: 2.14, sortRank: 0, periodReturns: { '1M': -1.5, '6M': 31.2, '1Y': 62.9 },
      priceHistory: { '1W': [590.97, 592.41, 576.74, 607.46, 603.64], '1M': [613.1, 618.91, 611.93, 569.06, 551.12, 571.05, 566.96, 559.95, 584.4, 577.42, 577.83, 571.96, 566.14, 578.34, 584.18, 590.09, 590.97, 592.41, 576.74, 607.46, 603.64], '6M': [460.17, 451.06, 456.9, 475.7, 489.97, 504.71, 508.95, 516.78, 550.53, 551.42, 576.5, 566.06, 547.31, 547.81, 561.66, 551.99, 595.11, 571.61, 601.39, 599.09, 611.54, 611.93, 566.96, 571.96, 590.09, 603.64], '1Y': [370.55, 381.25, 384.8, 381.6, 375.51, 392.38, 385.62, 405.98, 396.84, 398.93, 399.58, 387.71, 374.88, 378.73, 383.7, 390.29, 374.45, 380.76, 387.73, 411.08, 428.4, 441.04, 429.28, 430, 440.04, 436.5, 462.59, 459.83, 452.89, 467.37, 489.33, 504.99, 511.98, 520.16, 550.4, 559.18, 576.5, 566.06, 547.31, 540.83, 548.95, 548.11, 598.3, 589.77, 589.51, 595.76, 611.54, 611.93, 566.96, 571.96, 590.09, 603.64] },
      velocityScore: { '1D': -2.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 66.3, revenueGrowth: 18, eps: 9.11, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.79, PRN: false, RSHO: false, IDEF: 0.48, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 1.03, proScore: 0.41, coverage: 0.4,
      price: 47.83, weeklyPrices: [49.64, 48.37, 45.87, 49.58, 47.83], weeklyChange: -3.65, sortRank: 0, periodReturns: { '1M': -23.4, '6M': -30.1, '1Y': 0.9 },
      priceHistory: { '1W': [49.64, 48.37, 45.87, 49.58, 47.83], '1M': [62.48, 67.28, 66.02, 62.77, 66.21, 65.76, 65.3, 64.1, 60.66, 63.52, 65.86, 57.5, 53.65, 54.65, 51.84, 49.44, 49.64, 48.37, 45.87, 49.58, 47.83], '6M': [68.44, 71.65, 77.57, 90.41, 107.49, 104.79, 115.29, 97.94, 79.52, 88.46, 88.31, 97.14, 98.98, 101.43, 99.6, 82.69, 84.22, 87.91, 76.6, 67.98, 60.45, 66.02, 65.3, 57.5, 49.44, 47.83], '1Y': [47.41, 47.15, 50.37, 45.03, 48.31, 51.96, 50.29, 51.41, 46.7, 51.78, 53.04, 53.89, 62.51, 64.86, 68.71, 72.2, 74.22, 79.07, 78.25, 83.87, 87.04, 72.31, 58.28, 63.9, 63.83, 63.75, 68.06, 78.87, 74.62, 91.72, 108.01, 111.61, 110.93, 89.78, 78.71, 81.62, 88.31, 97.14, 98.98, 105.95, 86.01, 85.83, 82.52, 83.58, 70.22, 65.73, 60.45, 66.02, 65.3, 57.5, 49.44, 47.83] },
      velocityScore: { '1D': -4.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 208, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.86, PRN: false, RSHO: false, IDEF: 0.19, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.61, proScore: 0.25, coverage: 0.4,
      price: 48.53, weeklyPrices: [46.55, 47.35, 46.11, 49.69, 48.53], weeklyChange: 4.25, sortRank: 0, periodReturns: { '1M': 13.2, '6M': 40.8, '1Y': 5.3 },
      priceHistory: { '1W': [46.55, 47.35, 46.11, 49.69, 48.53], '1M': [42.87, 42.5, 42.86, 41.5, 42.84, 44.56, 44.55, 44.92, 45.8, 45.35, 48.41, 48.76, 47.96, 47.39, 45.61, 46.15, 46.55, 47.35, 46.11, 49.69, 48.53], '6M': [34.46, 33.64, 34.13, 37.46, 40.85, 41.46, 42.47, 38.31, 37.87, 41.07, 43.34, 45.82, 45.91, 46.44, 46.32, 45.86, 47.1, 44.94, 41.41, 40.63, 41.44, 42.86, 44.55, 48.76, 46.15, 48.53], '1Y': [46.07, 44.73, 46.48, 46.44, 47.59, 46.14, 48.08, 42.25, 41.58, 42.73, 41.03, 42.01, 40.33, 41.78, 43.1, 45.4, 45.29, 43.67, 39.91, 41.31, 36.62, 35.61, 34.28, 33.63, 33.18, 33.96, 33.68, 34.77, 34.09, 37.2, 41.42, 41.28, 41.3, 37.27, 37.77, 40.03, 43.34, 45.82, 45.91, 45.48, 46.53, 46.3, 46.06, 44.57, 39.98, 40.03, 41.44, 42.86, 44.55, 48.76, 46.15, 48.53] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 45.4, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.74,
      etfPresence: { AIRR: 0.9, PRN: false, RSHO: false, IDEF: 0.33, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.35, proScore: 0.14, coverage: 0.4,
      price: 74.92, weeklyPrices: [72.13, 71.48, 68.72, 73.61, 74.92], weeklyChange: 3.87, sortRank: 0, periodReturns: { '1M': -9.4, '6M': 11.3, '1Y': 78 },
      priceHistory: { '1W': [72.13, 71.48, 68.72, 73.61, 74.92], '1M': [82.69, 80.64, 83.01, 79.49, 75.43, 76.99, 74.88, 72.76, 74.67, 74.47, 73.27, 71.49, 74.26, 74.29, 72.26, 70.53, 72.13, 71.48, 68.72, 73.61, 74.92], '6M': [67.34, 69.99, 68.66, 71.14, 73.54, 75.27, 79.38, 78.83, 85.07, 84.9, 89.38, 71.12, 69.2, 71.21, 78.37, 78.71, 81.5, 84.39, 86.48, 92.92, 81.96, 83.01, 74.88, 71.49, 70.53, 74.92], '1Y': [42.08, 43.3, 46.78, 47.15, 48.83, 48.51, 47.63, 46.18, 56.6, 57.44, 58.52, 59.13, 60.47, 63.88, 66.54, 65.59, 62.84, 62.26, 67.11, 68.72, 68.21, 63.97, 58.76, 64.01, 66.47, 68.59, 67.81, 69.57, 67.92, 71.09, 73.89, 76.79, 79.86, 79.95, 81.73, 86.9, 89.38, 71.12, 69.2, 72.31, 76.24, 77.3, 83.35, 84.22, 86.76, 93.68, 81.96, 83.01, 74.88, 71.49, 70.53, 74.92] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 51.3, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.32,
      etfPresence: { AIRR: 0.66, PRN: false, RSHO: false, IDEF: 0.03, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'Timken Company', easyScore: 1, avgWeight: 9.3, proScore: 1.86, coverage: 0.2,
      price: 137.06, weeklyPrices: [134.67, 137.09, 132.39, 137.40, 137.06], weeklyChange: 1.77, sortRank: 0, periodReturns: { '1M': 17, '6M': 56.9, '1Y': 93.9 },
      priceHistory: { '1W': [134.67, 137.09, 132.39, 137.4, 137.06], '1M': [117.12, 115.74, 116.74, 114.49, 112.73, 117.2, 118.93, 119.95, 127.42, 127.16, 126.78, 127.98, 126.54, 131.9, 131.82, 131.83, 134.67, 137.09, 132.39, 137.4, 137.06], '6M': [87.38, 85.26, 86.33, 90.95, 91.68, 93.89, 93.4, 98.99, 108.82, 107.11, 109.88, 103.05, 99.7, 98.23, 101.9, 102.06, 106.92, 103.92, 108.7, 110.89, 116.34, 116.74, 118.93, 127.98, 131.83, 137.06], '1Y': [70.68, 71.18, 72.55, 76.94, 76.33, 80.02, 81.69, 73.94, 74.15, 76.69, 79.25, 76.49, 76.14, 77.91, 76.75, 75.18, 76.76, 72.55, 75.1, 77.3, 77.95, 78.9, 74.42, 79.9, 79.82, 83.16, 87.01, 86.34, 85.81, 88.05, 91.91, 94.6, 94.15, 102.15, 107.35, 108.16, 109.88, 103.05, 99.7, 97.44, 99.06, 98.92, 106.75, 107.66, 107.2, 109, 116.34, 116.74, 118.93, 127.98, 131.83, 137.06] },
      velocityScore: { '1D': 0, '1W': 3.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 31.1, revenueGrowth: 8, eps: 4.4, grossMargin: 31, dividendYield: 1.05,
      etfPresence: { AIRR: false, PRN: false, RSHO: 9.3, IDEF: false, BILT: false },
      tonyNote: 'Timken Company appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 9.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 7.95, proScore: 1.59, coverage: 0.2,
      price: 183.53, weeklyPrices: [178.66, 181.56, 177.41, 184.21, 183.53], weeklyChange: 2.73, sortRank: 0, periodReturns: { '1M': 2.6, '6M': 2.7, '1Y': 26 },
      priceHistory: { '1W': [178.66, 181.56, 177.41, 184.21, 183.53], '1M': [178.89, 178.11, 175.68, 171.18, 175.95, 174.85, 175.98, 177.01, 178.97, 176.59, 178.96, 179.66, 174.41, 174.26, 172.55, 180.99, 178.66, 181.56, 177.41, 184.21, 183.53], '6M': [178.66, 182.01, 184.42, 190.4, 194.08, 197.5, 199.46, 196.74, 196.51, 205.41, 197.63, 203.86, 203.04, 204.56, 195, 194.72, 203.19, 195.85, 179.3, 176.07, 176.78, 175.68, 175.98, 179.66, 180.99, 183.53], '1Y': [145.69, 145.81, 146.02, 144.91, 148.68, 149.17, 156.07, 157.38, 154.8, 155.5, 156.27, 158.01, 151.75, 158.58, 160.54, 167.33, 168.8, 158.85, 160.71, 179.24, 177.04, 179.03, 175.63, 173.21, 168.8, 171.93, 182.11, 185.68, 184.01, 185.73, 198.84, 196.34, 199.88, 195.97, 201.14, 204.92, 197.63, 203.86, 203.04, 200.73, 192.85, 196.21, 201.56, 196.42, 174.26, 173.99, 176.78, 175.68, 175.98, 179.66, 180.99, 183.53] },
      velocityScore: { '1D': 0, '1W': 6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$247B', pe: 34.5, revenueGrowth: 9, eps: 5.32, grossMargin: 20, dividendYield: 1.51,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 7.95, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.36, proScore: 4.36, coverage: 1,
      price: 232.36, weeklyPrices: [218.00, 220.12, 211.69, 222.24, 232.36], weeklyChange: 6.59, sortRank: 0, periodReturns: { '1M': 29.7, '6M': 165, '1Y': 393 },
      priceHistory: { '1W': [218, 220.12, 211.69, 222.24, 232.36], '1M': [179.11, 207.27, 221.15, 219.94, 199.86, 191.82, 219.93, 214.77, 208.06, 208.37, 226.34, 231.09, 264.51, 260.58, 251.68, 227.81, 218, 220.12, 211.69, 222.24, 232.36], '6M': [87.69, 89.46, 86.04, 100.24, 105.43, 98.87, 100.43, 82.39, 88.61, 107.61, 104.88, 95.65, 108.04, 118.56, 115.09, 101.95, 136.33, 165.34, 157.08, 138.23, 184.77, 221.15, 219.93, 231.09, 227.81, 232.36], '1Y': [47.13, 47.48, 55.33, 47.1, 53.53, 51.01, 52.75, 54.17, 70.24, 72.54, 70.02, 65.72, 95.72, 89.43, 107.8, 112.27, 124.94, 135.46, 109, 125.43, 120.47, 109.95, 85.98, 91.9, 96.45, 96.41, 81.14, 93.23, 85.17, 96.21, 101.98, 96.85, 94.91, 73.87, 89.73, 97.92, 104.88, 95.65, 108.04, 121.52, 105.97, 108.82, 144.97, 157.14, 147.16, 154.49, 184.77, 221.15, 219.93, 231.09, 227.81, 232.36] },
      velocityScore: { '1D': 0, '1W': -9.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$59B', pe: 90.1, revenueGrowth: 684, eps: 2.58, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 3.02, MEME: 5.19, RKNG: 4.87 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 3, avgWeight: 3.9, proScore: 3.9, coverage: 1,
      price: 82.41, weeklyPrices: [92.06, 88.71, 87.32, 97.56, 82.41], weeklyChange: -10.48, sortRank: 0, periodReturns: { '1M': 13, '6M': 7.4, '1Y': 114.8 },
      priceHistory: { '1W': [92.06, 88.71, 87.32, 97.56, 82.41], '1M': [72.96, 74.81, 83.01, 83.67, 86.83, 89.58, 96.23, 105.86, 119.7, 129.6, 133.09, 113.41, 105.65, 118.17, 107.73, 93.6, 92.06, 88.71, 87.32, 97.56, 82.41], '6M': [76.7, 75.84, 71.47, 97.49, 92.72, 103.5, 121.23, 103.5, 96.92, 86.4, 85.76, 93.86, 87.09, 90.74, 96.06, 83.99, 91.61, 90.94, 78.75, 73.9, 65.35, 83.01, 96.23, 113.41, 93.6, 82.41], '1Y': [38.37, 50.2, 46.73, 45.46, 51.12, 57.09, 54.22, 51.38, 45.92, 48.16, 50.01, 48.76, 36.91, 40.43, 54.8, 49.08, 72.9, 90.5, 82.81, 79.45, 71.14, 68.7, 56.6, 55, 56.89, 72.84, 67.81, 86.48, 74.68, 85.73, 95.22, 116.37, 122.09, 93.27, 82.22, 80.2, 85.76, 93.86, 87.09, 94.09, 87.86, 92.62, 94.9, 85.53, 76.4, 70.89, 65.35, 83.01, 96.23, 113.41, 93.6, 82.41] },
      velocityScore: { '1D': 0.8, '1W': -2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$32B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 3.33, MEME: 5.79, RKNG: 2.57 },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 3, avgWeight: 3.73, proScore: 3.73, coverage: 1,
      price: 42.7, weeklyPrices: [40.94, 41.91, 38.92, 41.47, 42.70], weeklyChange: 4.29, sortRank: 0, periodReturns: { '1M': -2.8, '6M': 53.3, '1Y': 281.9 },
      priceHistory: { '1W': [40.94, 41.91, 38.92, 41.47, 42.7], '1M': [43.93, 45.48, 46.71, 42.56, 39.14, 39.52, 48.02, 45.87, 45.14, 48.98, 49.65, 47.28, 47.94, 47.86, 44.71, 39.62, 40.94, 41.91, 38.92, 41.47, 42.7], '6M': [27.86, 27.85, 24.81, 30.26, 36.71, 35.06, 40.22, 31.54, 36.6, 31.53, 28.65, 28.09, 27.48, 26.65, 28.37, 24.49, 25.57, 30.09, 36.35, 34.25, 41.53, 46.71, 48.02, 47.28, 39.62, 42.7], '1Y': [11.18, 9.87, 10.07, 9.22, 9.97, 10.95, 10.58, 13.95, 14.03, 16.34, 15.95, 15.26, 15.2, 19.46, 24.67, 22.94, 27.71, 34.24, 35.9, 34.35, 32.87, 31.44, 22.93, 23.79, 28.05, 32.77, 22.98, 27.78, 24.08, 29.56, 36.1, 34.74, 38.07, 27.84, 36.17, 29.04, 28.65, 28.09, 27.48, 26.7, 25.72, 24.56, 26.26, 31.53, 34.98, 33.55, 41.53, 46.71, 48.02, 47.28, 39.62, 42.7] },
      velocityScore: { '1D': -0.8, '1W': 1.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.26, MEME: 5.1, RKNG: 3.84 },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab', easyScore: 3, avgWeight: 3.59, proScore: 3.59, coverage: 1,
      price: 102.39, weeklyPrices: [113.65, 108.23, 105.05, 114.78, 102.39], weeklyChange: -9.91, sortRank: 0, periodReturns: { '1M': -12.9, '6M': 66.5, '1Y': 303 },
      priceHistory: { '1W': [113.65, 108.23, 105.05, 114.78, 102.39], '1M': [117.56, 124.15, 132.55, 124.77, 131.16, 134.28, 125.45, 135.76, 143.2, 150.23, 148.03, 143.48, 122.39, 123.32, 114.7, 110.08, 113.65, 108.23, 105.05, 114.78, 102.39], '6M': [61.49, 70.52, 70.12, 86.03, 86.58, 87.82, 88.57, 73.11, 69.62, 76.58, 72.65, 70, 68.37, 69.48, 72.88, 65.52, 66.74, 82.93, 84.6, 82.51, 78.58, 132.55, 125.45, 143.48, 110.08, 102.39], '1Y': [25.41, 32.78, 35.77, 38.74, 44.6, 46.88, 45.11, 44.54, 45.02, 44.97, 47.22, 49.31, 47.03, 47.24, 52.91, 47.91, 58.5, 65.42, 67.35, 65.62, 61.34, 51.9, 43.31, 42.45, 41.9, 53.43, 55.41, 77.55, 70.45, 84.08, 91.8, 87.98, 85.68, 66.32, 66.01, 70.86, 72.65, 70, 68.37, 71.93, 65.94, 67.73, 68.05, 84.8, 79.68, 78.81, 78.58, 132.55, 125.45, 143.48, 110.08, 102.39] },
      velocityScore: { '1D': 0, '1W': 6.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$64B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 1.92, MEME: 4.9, RKNG: 3.95 },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 6.14, proScore: 4.1, coverage: 0.667,
      price: 1980.1, weeklyPrices: [1642.00, 1646.54, 1643.23, 1881.51, 1980.10], weeklyChange: 20.59, sortRank: 0, periodReturns: { '1M': 36.4, '6M': 860.4, '1Y': 4559.1 },
      priceHistory: { '1W': [1642, 1646.54, 1643.23, 1881.51, 1980.1], '1M': [1452.02, 1447.23, 1382.72, 1407.61, 1333.01, 1392.56, 1542.24, 1478.69, 1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1], '6M': [206.18, 237.61, 244.25, 349.63, 389.81, 501.29, 527.63, 584.55, 599.34, 621.09, 651.9, 565.59, 618.82, 753.69, 677.86, 692.73, 851.57, 919.47, 932.43, 1096.51, 1339.96, 1382.72, 1542.24, 1694.98, 1559.32, 1980.1], '1Y': [42.5, 46.95, 45.35, 46.17, 42.72, 41.36, 41.89, 42.51, 43.37, 45.52, 46.78, 51.07, 70.51, 91.55, 106.4, 112.2, 121.17, 134.61, 148.04, 176.49, 207.01, 267.95, 265.88, 226.96, 205.35, 219.46, 201.87, 241.05, 240.22, 353.56, 387.81, 503.44, 539.3, 576.2, 630.29, 649.97, 651.9, 565.59, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 989.9, 1187, 1339.96, 1382.72, 1542.24, 1694.98, 1559.32, 1980.1] },
      velocityScore: { '1D': 0, '1W': 2.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$293B', pe: 67.6, revenueGrowth: 251, eps: 29.31, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.06, RKNG: 6.23 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 2, avgWeight: 5.09, proScore: 3.4, coverage: 0.667,
      price: 169.05, weeklyPrices: [196.64, 162.88, 175.13, 172.78, 169.05], weeklyChange: -14.03, sortRank: 0, periodReturns: { '1M': -10.2, '6M': 427.3, '1Y': 992.8 },
      priceHistory: { '1W': [196.64, 162.88, 175.13, 172.78, 169.05], '1M': [188.28, 223.1, 203.57, 190.36, 173.26, 165.26, 176.81, 181.49, 177.62, 179.83, 169.02, 158.41, 185.67, 202.37, 184.07, 177, 196.64, 162.88, 175.13, 172.78, 169.05], '6M': [32.06, 31.32, 36.75, 38.61, 34.18, 38.38, 45.23, 39.9, 48.4, 46.98, 53.69, 101.14, 106.19, 92.63, 114.41, 86.35, 133.3, 157.32, 137.73, 164.36, 157.55, 203.57, 176.81, 158.41, 177, 169.05], '1Y': [15.47, 22.57, 25.69, 26.88, 29.24, 26.35, 25.22, 22.19, 20.86, 26.13, 24.34, 23.35, 23.72, 28.93, 28.06, 25.93, 33.79, 29.1, 34.14, 37.22, 33.04, 25.42, 21.63, 22.47, 26.02, 30.38, 29.9, 39.1, 36.02, 38.06, 34.47, 38.15, 39.57, 38.13, 43.99, 51.68, 53.69, 101.14, 106.19, 101.92, 97.42, 103.91, 150.6, 159.42, 162.17, 183.51, 157.55, 203.57, 176.81, 158.41, 177, 169.05] },
      velocityScore: { '1D': 0, '1W': -21.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$14B', pe: null, revenueGrowth: 51, eps: -0.64, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.02, RKNG: 4.17 },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'NVTS', name: 'Navitas Semiconductor', easyScore: 2, avgWeight: 4.81, proScore: 3.21, coverage: 0.667,
      price: 23.39, weeklyPrices: [24.48, 22.85, 20.50, 22.21, 23.39], weeklyChange: -4.45, sortRank: 0, periodReturns: { '1M': 21.5, '6M': 172.3, '1Y': 219.5 },
      priceHistory: { '1W': [24.48, 22.85, 20.5, 22.21, 23.39], '1M': [19.25, 21.17, 22.32, 21.32, 19.67, 22.99, 24.38, 29.25, 31.79, 28.88, 28.51, 26.6, 24.86, 25.86, 30.84, 25.08, 24.48, 22.85, 20.5, 22.21, 23.39], '6M': [8.59, 7.81, 7.21, 10.19, 9.45, 9.76, 10.19, 8.2, 8.76, 8.08, 9.51, 8.96, 9.98, 9.06, 9.48, 8.54, 9.42, 12.37, 18.51, 16.5, 15.79, 22.32, 24.38, 26.6, 25.08, 23.39], '1Y': [7.32, 6.52, 6.55, 6.58, 6.23, 8.62, 8.56, 8.05, 6.6, 6.77, 6.2, 5.76, 5.76, 5.89, 6.88, 7.22, 8.13, 9.97, 17.1, 13.91, 12.25, 9.6, 7.73, 8.29, 8.32, 9.17, 7.96, 7.9, 7.24, 10.31, 10.04, 11.29, 9.46, 7.43, 8.37, 7.88, 9.51, 8.96, 9.98, 9.17, 9.02, 8.8, 9.54, 12.32, 17.28, 17.45, 15.79, 22.32, 24.38, 26.6, 25.08, 23.39] },
      velocityScore: { '1D': 0, '1W': -13.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.02, RKNG: 5.61 },
      tonyNote: 'Navitas Semiconductor is a small-cap wide-bandgap power semiconductor name — gallium nitride and silicon carbide for fast charging and EV applications. The $26.60 share price and small market cap position it as a speculative holding in ETFs willing to take higher-risk bets on next-generation power conversion.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 2, avgWeight: 4.59, proScore: 3.06, coverage: 0.667,
      price: 250.81, weeklyPrices: [222.27, 234.32, 237.68, 264.76, 250.81], weeklyChange: 12.84, sortRank: 0, periodReturns: { '1M': 26.3, '6M': 74.3, '1Y': 241.3 },
      priceHistory: { '1W': [222.27, 234.32, 237.68, 264.76, 250.81], '1M': [198.57, 189.36, 184.54, 172.17, 156.27, 182.98, 193.39, 218.41, 221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81], '6M': [143.91, 150.13, 144.7, 132.95, 161.38, 139.16, 129.66, 96.95, 128.4, 130.66, 114.48, 114.74, 111.57, 101.72, 103.91, 95.92, 107.93, 158.93, 185.54, 174.01, 188.29, 184.54, 193.39, 236.03, 206.89, 250.81], '1Y': [73.49, 84.57, 92.59, 93.36, 102.59, 92.93, 107.95, 114.7, 118.57, 118.74, 115.41, 124.27, 149.03, 164.42, 162.26, 145.61, 147.42, 149.9, 151.66, 154.96, 180.64, 170.16, 145.58, 150.85, 188.44, 170.29, 142.02, 149.94, 144.92, 141, 156.84, 135.1, 129.47, 98.06, 121.78, 124.06, 114.48, 114.74, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 184.38, 188.29, 184.54, 193.39, 236.03, 206.89, 250.81] },
      velocityScore: { '1D': 0, '1W': 126.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$46B', pe: 137.1, revenueGrowth: 157, eps: 1.83, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.21, RKNG: 4.97 },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 4.58, proScore: 3.05, coverage: 0.667,
      price: 981.61, weeklyPrices: [949.28, 935.89, 891.88, 995.87, 981.61], weeklyChange: 3.41, sortRank: 0, periodReturns: { '1M': 28.1, '6M': 307.1, '1Y': 749.1 },
      priceHistory: { '1W': [949.28, 935.89, 891.88, 995.87, 981.61], '1M': [766.58, 803.63, 776.01, 724.66, 681.54, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61], '6M': [241.14, 265.92, 294.37, 343.43, 338.13, 389.11, 435.28, 379.4, 410.34, 417.35, 415.56, 397.05, 405.35, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 776.01, 762.1, 971, 864.01, 981.61], '1Y': [115.6, 122.08, 123.25, 124.42, 120.11, 109.22, 111.25, 107.77, 123.72, 123.55, 116.42, 118.48, 135.24, 158.82, 166.41, 167.32, 190.96, 192.77, 206.77, 220.1, 234.7, 253.3, 241.95, 223.93, 239.49, 252.42, 237.5, 276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 415.56, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 646.63, 776.01, 762.1, 971, 864.01, 981.61] },
      velocityScore: { '1D': -0.7, '1W': -2.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 46.3, revenueGrowth: 196, eps: 21.2, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { BUZZ: 3.63, MEME: false, RKNG: 5.53 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 2, avgWeight: 4.16, proScore: 2.77, coverage: 0.667,
      price: 59.77, weeklyPrices: [59.19, 54.02, 51.52, 56.71, 59.77], weeklyChange: 0.98, sortRank: 0, periodReturns: { '1M': 5.7, '6M': 48.9, '1Y': 508 },
      priceHistory: { '1W': [59.19, 54.02, 51.52, 56.71, 59.77], '1M': [56.56, 55.17, 58.4, 52.94, 50.46, 52.71, 58.06, 56.83, 59.78, 67.84, 64.05, 63.54, 65.33, 66.6, 65.48, 54.35, 59.19, 54.02, 51.52, 56.71, 59.77], '6M': [40.13, 39.92, 39.41, 45.91, 52.99, 53.48, 62.94, 44.94, 42.67, 43.29, 44.24, 40.13, 41.37, 42.21, 41.43, 34.09, 37.06, 47.7, 52.02, 45.51, 56.85, 58.4, 58.06, 63.54, 54.35, 59.77], '1Y': [9.83, 10.66, 14.57, 16.89, 16.88, 18.59, 16.58, 16.48, 17.97, 20.7, 23.12, 29.11, 30.19, 36.45, 41.77, 46.93, 57.75, 64.14, 59.22, 64.99, 67.75, 60.17, 47.41, 48.49, 41.12, 46.84, 35.48, 42.04, 38.3, 43.63, 52.88, 52.26, 59.84, 39.79, 40.03, 39.98, 44.24, 40.13, 41.37, 41.66, 37.45, 34.77, 39.32, 48.12, 50.64, 45.66, 56.85, 58.4, 58.06, 63.54, 54.35, 59.77] },
      velocityScore: { '1D': -0.7, '1W': -31.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$21B', pe: 77.6, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 2.78, MEME: 5.54, RKNG: false },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'OKLO', name: 'Oklo Inc', easyScore: 2, avgWeight: 3.53, proScore: 2.35, coverage: 0.667,
      price: 57.49, weeklyPrices: [58.94, 56.48, 54.02, 57.86, 57.49], weeklyChange: -2.46, sortRank: 0, periodReturns: { '1M': -21.9, '6M': -34.2, '1Y': -9.7 },
      priceHistory: { '1W': [58.94, 56.48, 54.02, 57.86, 57.49], '1M': [73.63, 69.66, 67.21, 62.25, 58.56, 62.58, 65.09, 65.88, 68.7, 67.82, 68.09, 66.88, 66.89, 73.47, 65.21, 58.09, 58.94, 56.48, 54.02, 57.86, 57.49], '6M': [87.42, 83.23, 74.09, 95.6, 97.09, 90.78, 94.39, 68.23, 66.23, 67.64, 69.07, 62.03, 59.59, 56.7, 55.27, 48.07, 47.75, 64.21, 76.46, 72.5, 71.83, 67.21, 65.09, 66.88, 58.09, 57.49], '1Y': [63.66, 55.11, 55.99, 53.52, 60.95, 61.32, 75.5, 76.41, 71.86, 68.99, 71.19, 73.59, 73.97, 95.83, 142.65, 111.63, 138.56, 171.01, 159.05, 137.43, 126.67, 111.52, 95.36, 89.55, 91.84, 103.93, 82.33, 83.44, 71.62, 97.6, 95.97, 90.93, 86.04, 62.14, 63.92, 63.83, 69.07, 62.03, 59.59, 54.69, 51.81, 48.13, 50.25, 66.81, 71, 70.4, 71.83, 67.21, 65.09, 66.88, 58.09, 57.49] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: 0, eps: -0.84, grossMargin: 0, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.66, RKNG: 2.39 },
      tonyNote: 'Oklo Inc appears in 2 of 3 Meme ETFs (67% coverage) with average weight 3.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ONDS', name: 'Ondas Holdings', easyScore: 2, avgWeight: 3.49, proScore: 2.33, coverage: 0.667,
      price: 9.33, weeklyPrices: [10.30, 9.65, 9.31, 9.83, 9.33], weeklyChange: -9.42, sortRank: 0, periodReturns: { '1M': 3.2, '6M': 6.6, '1Y': 412.6 },
      priceHistory: { '1W': [10.3, 9.65, 9.31, 9.83, 9.33], '1M': [9.04, 8.86, 11.21, 10.62, 9.7, 9.36, 9.18, 9.06, 9.77, 10.8, 13.25, 13.22, 13.46, 13.58, 11.61, 10.43, 10.3, 9.65, 9.31, 9.83, 9.33], '6M': [8.75, 9.22, 8.46, 12.84, 13.89, 12.55, 12.27, 9.68, 9.23, 11.39, 10.45, 10.49, 10.33, 10.83, 10.31, 8.81, 9.14, 10.2, 10.54, 10.04, 8.89, 11.21, 9.18, 13.22, 10.43, 9.33], '1Y': [1.82, 1.43, 1.92, 1.79, 2.29, 2.1, 2, 2.67, 3.43, 4.01, 4.85, 5.46, 5.45, 6.09, 7.88, 7.72, 10.66, 10.81, 7.77, 7.53, 6.15, 5.88, 6.26, 8.72, 8.07, 9.23, 7.69, 9.27, 8.99, 12.18, 13.56, 12.62, 11.27, 8.48, 8.97, 10.03, 10.45, 10.49, 10.33, 10.75, 9.44, 9.6, 9.13, 10, 10.55, 10.32, 8.89, 11.21, 9.18, 13.22, 10.43, 9.33] },
      velocityScore: { '1D': 0, '1W': -9.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: 103.7, revenueGrowth: 1080, eps: 0.09, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.62, RKNG: 2.36 },
      tonyNote: 'Ondas Holdings is a small-cap industrial automation and drone company. It appears in Meme ETFs on the autonomous systems and drone delivery narrative. Revenue is minimal and the path to profitability is unclear; the ETF allocation is speculative and reflects retail interest in autonomous systems themes.',
    },
    {
      ticker: 'RGTI', name: 'Rigetti Computing', easyScore: 2, avgWeight: 3.42, proScore: 2.28, coverage: 0.667,
      price: 20.98, weeklyPrices: [21.76, 19.69, 19.44, 20.63, 20.98], weeklyChange: -3.61, sortRank: 0, periodReturns: { '1M': 10, '6M': -18.8, '1Y': 84 },
      priceHistory: { '1W': [21.76, 19.69, 19.44, 20.63, 20.98], '1M': [19.07, 18.42, 19.27, 17.85, 16.62, 16.88, 22.04, 26.42, 25.07, 24.62, 27.03, 25.54, 25.63, 26.88, 24.09, 20.68, 21.76, 19.69, 19.44, 20.63, 20.98], '6M': [25.84, 23.76, 22.27, 25.38, 24.47, 23.67, 22.01, 17.19, 16.43, 16.6, 18.64, 16.97, 16.07, 15.67, 15.14, 13.5, 14.31, 19.45, 16.86, 17.45, 18.34, 19.27, 22.04, 25.54, 20.68, 20.98], '1Y': [11.4, 10.79, 11.86, 13.38, 12.72, 15.43, 15.57, 15.76, 15.98, 16.63, 14.47, 15.52, 16.5, 20, 31.46, 29.79, 41.71, 54.91, 43.31, 40.24, 39.12, 33.08, 24.69, 26.57, 23.88, 28.22, 23.53, 26.88, 22.41, 25.21, 25.72, 24.96, 19.85, 14.98, 14.99, 15.92, 18.64, 16.97, 16.07, 15.41, 14.41, 14.19, 14.68, 19.81, 16.61, 17.5, 18.34, 19.27, 22.04, 25.54, 20.68, 20.98] },
      velocityScore: { '1D': 0, '1W': 5.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 199, eps: -0.89, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.82, RKNG: 3.02 },
      tonyNote: 'Rigetti Computing is a quantum hardware company using superconducting qubit technology. It holds a position in Meme ETFs alongside IonQ and D-Wave as part of the quantum computing basket. Revenue is minimal, the technology is earlier-stage than IonQ, and the ETF allocation is speculative. The weight score is low; this is a high-risk, long-duration positioning.',
    },
    {
      ticker: 'SPCE', name: 'Virgin Galactic Holdings', easyScore: 1, avgWeight: 9.33, proScore: 3.11, coverage: 0.333,
      price: 3.91, weeklyPrices: [4.12, 4.59, 4.71, 5.73, 3.91], weeklyChange: -5.1, sortRank: 0, periodReturns: { '1M': 40.1, '6M': 20.7, '1Y': 30.3 },
      priceHistory: { '1W': [4.12, 4.59, 4.71, 5.73, 3.91], '1M': [2.79, 2.88, 2.88, 2.81, 2.58, 2.47, 2.75, 3.24, 3.51, 3.79, 4.53, 6.18, 7.52, 4.59, 4.29, 4.38, 4.12, 4.59, 4.71, 5.73, 3.91], '6M': [3.24, 3.5, 3.15, 3.35, 3.07, 3, 3.03, 2.57, 2.62, 2.55, 2.64, 2.56, 2.51, 2.58, 2.52, 2.4, 2.97, 3.06, 2.71, 2.38, 2.51, 2.88, 2.75, 6.18, 4.38, 3.91], '1Y': [3, 2.95, 2.73, 2.77, 3.16, 4.03, 3.92, 3.88, 2.97, 3, 3.31, 3.09, 3.17, 3.28, 3.75, 3.86, 4.08, 4.37, 4.14, 4.17, 3.66, 3.59, 3.58, 3.36, 3.9, 3.81, 3.02, 3.7, 3.3, 3.17, 3.09, 3.18, 2.93, 2.35, 2.55, 2.46, 2.64, 2.56, 2.51, 2.5, 2.39, 2.46, 3.02, 2.93, 2.58, 2.65, 2.51, 2.88, 2.75, 6.18, 4.38, 3.91] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$435M', pe: null, revenueGrowth: -51, eps: -3.87, grossMargin: 0, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 9.33, RKNG: false },
      tonyNote: 'Virgin Galactic Holdings appears in 1 of 3 Meme ETFs (33% coverage) with average weight 9.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RDW', name: 'Redwire', easyScore: 1, avgWeight: 5.95, proScore: 1.98, coverage: 0.333,
      price: 15.12, weeklyPrices: [18.57, 15.75, 14.87, 17.09, 15.12], weeklyChange: -18.58, sortRank: 0, periodReturns: { '1M': 30.8, '6M': 107.4, '1Y': -20.8 },
      priceHistory: { '1W': [18.57, 15.75, 14.87, 17.09, 15.12], '1M': [11.56, 11.46, 13.99, 14.06, 13.96, 14.77, 15.35, 17.49, 22.04, 24, 25.9, 24.57, 20.68, 20.58, 18.62, 18.45, 18.57, 15.75, 14.87, 17.09, 15.12], '6M': [7.29, 8, 7, 10.64, 10.14, 10.2, 13.29, 10.03, 9.01, 8.6, 9.55, 9.07, 9.48, 9.55, 9.16, 9.08, 9.22, 11.22, 10.04, 9.19, 9.2, 13.99, 15.35, 24.57, 18.45, 15.12], '1Y': [19.08, 15.36, 16.3, 15.15, 16.98, 16.36, 15.47, 14.77, 8.82, 9.04, 8.94, 8.92, 8.16, 9, 9.22, 8.99, 11.22, 9.06, 8.25, 8.24, 7.37, 6.17, 5.47, 5.39, 5.22, 7.29, 6.89, 8.52, 7.94, 9.83, 11.02, 11.98, 12.81, 8.8, 7.89, 7.99, 9.55, 9.07, 9.48, 9.63, 8.87, 9.73, 9.29, 10.34, 9.68, 9.34, 9.2, 13.99, 15.35, 24.57, 18.45, 15.12] },
      velocityScore: { '1D': 0, '1W': -8.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3B', pe: null, revenueGrowth: 58, eps: -2.59, grossMargin: 13, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.95, RKNG: false },
      tonyNote: 'Redwire Corp is a space infrastructure company — solar arrays, structures, and manufacturing in orbit. It appears in Meme and speculative ETFs as a high-risk space economy play. Revenue is growing from a small base but the business is pre-profitability; the ETF weight is minimal and reflects thematic positioning rather than fundamental conviction.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 1, avgWeight: 5.36, proScore: 1.79, coverage: 0.333,
      price: 260.22, weeklyPrices: [253.57, 259.61, 234.23, 248.88, 260.22], weeklyChange: 2.62, sortRank: 0, periodReturns: { '1M': -7.3, '6M': 174, '1Y': 1085.5 },
      priceHistory: { '1W': [253.57, 259.61, 234.23, 248.88, 260.22], '1M': [280.69, 289.76, 303.41, 275.95, 258.71, 282.31, 307.88, 302.49, 302.4, 293.8, 290.01, 285, 273.51, 302.85, 287.32, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22], '6M': [94.98, 88.82, 88.41, 103.05, 139.77, 150.56, 165.39, 147.35, 155.54, 159, 168.57, 159.99, 157.17, 156.58, 150.22, 132.45, 160.13, 210.06, 237.57, 283.36, 258.64, 303.41, 307.88, 285, 263.61, 260.22], '1Y': [21.95, 22.56, 23.92, 24.3, 25.31, 25.93, 34.78, 36.1, 37.65, 46.5, 49.35, 51.35, 55, 73.29, 77.38, 84.57, 86.97, 109.91, 109.06, 108.53, 142.37, 139.23, 107.11, 95.56, 105, 109.44, 89.58, 92.26, 87.26, 108, 133.46, 145.63, 156.51, 136.6, 139.03, 147.55, 168.57, 159.99, 157.17, 166.69, 133.52, 135.63, 166.7, 207.86, 231.17, 290.52, 258.64, 303.41, 307.88, 285, 263.61, 260.22] },
      velocityScore: { '1D': 0, '1W': -47, '1M': null, '6M': null }, isNew: false,
      marketCap: '$74B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.36, RKNG: false },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'QBTS', name: 'D-Wave Quantum', easyScore: 1, avgWeight: 5.21, proScore: 1.74, coverage: 0.333,
      price: 23.37, weeklyPrices: [25.83, 23.52, 23.25, 23.82, 23.37], weeklyChange: -9.52, sortRank: 0, periodReturns: { '1M': 4.6, '6M': -10.5, '1Y': 54.1 },
      priceHistory: { '1W': [25.83, 23.52, 23.25, 23.82, 23.37], '1M': [22.35, 21.44, 22.13, 20.35, 19.06, 19.3, 25.74, 29.4, 27.82, 27.48, 29.49, 30.14, 29.18, 29.91, 27.55, 23.85, 25.83, 23.52, 23.25, 23.82, 23.37], '6M': [26.1, 26.82, 26.15, 31.27, 28.82, 26.04, 24.97, 20.11, 19.64, 19.38, 20.14, 18.83, 17.83, 16.49, 16.19, 13.7, 13.87, 21.52, 19.31, 20.28, 21.99, 22.13, 25.74, 30.14, 23.85, 23.37], '1Y': [15.17, 14.94, 14.64, 15.99, 16.15, 17.59, 18.35, 17.18, 17.37, 16.56, 15.02, 15.85, 16.15, 18.98, 27.52, 24.71, 35.02, 40.62, 34.4, 35.04, 33.09, 29.37, 22.83, 23.11, 22.5, 28.33, 23.74, 32.19, 26.25, 30.2, 30.15, 27.43, 23.22, 17.21, 18.82, 18.06, 20.14, 18.83, 17.83, 16.1, 14.65, 14.32, 14.25, 21.69, 18.49, 20.49, 21.99, 22.13, 25.74, 30.14, 23.85, 23.37] },
      velocityScore: { '1D': 0, '1W': -1.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: -81, eps: -1.14, grossMargin: 66, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.21, RKNG: false },
      tonyNote: 'D-Wave Quantum is a quantum computing company — the only publicly traded business built around quantum annealing hardware. Revenue is minimal and profitability is many years away, but it holds a position in Meme ETFs as the purest-play quantum computing stock available to retail investors. The ETF weight is small and the position is purely thematic.',
    },
    {
      ticker: 'AXTI', name: 'AXT Inc', easyScore: 1, avgWeight: 5.17, proScore: 1.72, coverage: 0.333,
      price: 97.18, weeklyPrices: [90.78, 78.36, 85.29, 88.34, 97.18], weeklyChange: 7.05, sortRank: 0, periodReturns: { '1M': -20.9, '6M': 556.2, '1Y': 4399.1 },
      priceHistory: { '1W': [90.78, 78.36, 85.29, 88.34, 97.18], '1M': [122.9, 121.94, 114.98, 123.78, 105.88, 104.61, 121.02, 140.83, 132.6, 122.77, 115.7, 103.16, 109.55, 110.85, 106.7, 89.04, 90.78, 78.36, 85.29, 88.34, 97.18], '6M': [14.81, 14.65, 14.59, 20.17, 21.51, 19.78, 16.83, 18.75, 26.8, 23.81, 37.12, 38.8, 46.73, 48.76, 67.35, 47.14, 63.12, 81.78, 75.27, 79.22, 108.42, 114.98, 121.02, 103.16, 89.04, 97.18], '1Y': [2.16, 1.86, 2.09, 2.37, 2.36, 2.35, 2.44, 2.11, 2.18, 2.07, 2.84, 3.28, 3.04, 4.01, 4.8, 4.49, 5.4, 4.6, 4.91, 6.19, 8.46, 10.44, 10.25, 9.34, 11.76, 14.96, 14.83, 15.22, 15.8, 24.11, 22.1, 17.92, 16.38, 20.43, 24.79, 29.68, 37.12, 38.8, 46.73, 58.09, 58.51, 52.84, 64.18, 82.56, 76.16, 96, 108.42, 114.98, 121.02, 103.16, 89.04, 97.18] },
      velocityScore: { '1D': 0, '1W': 14.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: 39, eps: -0.32, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.17, RKNG: false },
      tonyNote: 'AXT Inc is a compound semiconductor substrate manufacturer — gallium arsenide, indium phosphide, and germanium wafers used in data center optical transceivers, 5G RF chips, and solar cells. Revenue is growing with optical networking demand. Small market cap but positioned at a genuine supply-chain chokepoint for III-V semiconductor materials.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 1, avgWeight: 4.7, proScore: 1.57, coverage: 0.333,
      price: 562.92, weeklyPrices: [526.93, 517.72, 490.09, 529.29, 562.92], weeklyChange: 6.83, sortRank: 0, periodReturns: { '1M': 15.2, '6M': 219.2, '1Y': 910.6 },
      priceHistory: { '1W': [526.93, 517.72, 490.09, 529.29, 562.92], '1M': [488.74, 494.09, 489.15, 482.02, 458.68, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 511.72, 526.93, 517.72, 490.09, 529.29, 562.92], '6M': [176.34, 181.08, 179.68, 219.38, 214, 241.9, 279.7, 269.41, 273.74, 284.67, 282.25, 259.03, 261.18, 304.9, 296.14, 297.73, 337.88, 361.69, 403.12, 434.52, 463.91, 489.15, 486.46, 531.21, 511.72, 562.92], '1Y': [55.7, 60.38, 63.99, 64.02, 67.53, 67.06, 68.99, 77.29, 74.64, 76.29, 79.22, 81.91, 94.54, 103.09, 110.25, 120.06, 125.28, 118.86, 121.53, 126.67, 158.02, 174.22, 162.45, 150.93, 159.99, 169.54, 172.04, 176.76, 176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 282.25, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 463.91, 489.15, 486.46, 531.21, 511.72, 562.92] },
      velocityScore: { '1D': 0, '1W': -1.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$194B', pe: 33.7, revenueGrowth: 46, eps: 16.72, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.7 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'WULF', name: 'WULF', easyScore: 1, avgWeight: 4.28, proScore: 1.43, coverage: 0.333,
      price: 26.06, weeklyPrices: [25.86, 25.30, 23.19, 25.35, 26.06], weeklyChange: 0.77, sortRank: 0, periodReturns: { '1M': 14.3, '6M': 81.9, '1Y': 548.3 },
      priceHistory: { '1W': [25.86, 25.3, 23.19, 25.35, 26.06], '1M': [22.8, 23.12, 24.17, 22.32, 21.14, 21.63, 22.92, 22.82, 25.18, 26.74, 26.4, 25.56, 25.66, 26.49, 26.16, 24, 25.86, 25.3, 23.19, 25.35, 26.06], '6M': [14.33, 12.52, 11.42, 13.18, 14.14, 13.12, 15.11, 13.88, 16.03, 15.47, 17.88, 15.23, 14.67, 15.3, 16.86, 14.48, 19.03, 19.31, 20.37, 21.73, 24.02, 24.17, 22.92, 25.56, 24, 26.06], '1Y': [4.02, 3.57, 4.38, 4.82, 4.87, 5.26, 5.1, 4.89, 5.4, 9.38, 8.93, 9.63, 10.3, 10.94, 11.24, 11.42, 11.97, 14, 13.85, 13.64, 16.1, 14.3, 11.05, 12.63, 14.22, 15.59, 12.49, 12.47, 11.15, 12.49, 14.21, 12.89, 14.54, 11.92, 15.91, 15.01, 17.88, 15.23, 14.67, 15.74, 15.35, 14.88, 18.87, 20.64, 20.01, 21.31, 24.02, 24.17, 22.92, 25.56, 24, 26.06] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: null, revenueGrowth: -1, eps: -2.51, grossMargin: 64, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.28 },
      tonyNote: 'WULF appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
