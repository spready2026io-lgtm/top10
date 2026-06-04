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
export const SPY_RET: Record<Period, number> = { '1W': -0.5, '1M': 4.8, '6M': 10, '1Y': 26.3 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  ARTY: [{ t: 'MRVL', w: 8.9 }, { t: 'MU', w: 7.6 }, { t: 'AMD', w: 7.3 }, { t: 'ORCL', w: 4.2 }, { t: 'CRWV', w: 4.1 }],
  BAI: [{ t: 'MU', w: 6.1 }, { t: 'AVGO', w: 5.6 }, { t: 'AMD', w: 5.1 }, { t: 'NVDA', w: 4.3 }, { t: 'TSM', w: 4.2 }],
  IVEP: [{ t: 'BE', w: 5.1 }, { t: 'PWR', w: 4.3 }, { t: 'COHR', w: 4.3 }, { t: 'VRT', w: 4.2 }, { t: 'MPWR', w: 4.2 }],
  IGPT: [{ t: 'MU', w: 12.7 }, { t: 'AMD', w: 7.4 }, { t: 'INTC', w: 6.4 }, { t: 'GOOGL', w: 5.7 }, { t: 'NVDA', w: 5.6 }],
  IVES: [{ t: 'MU', w: 6.2 }, { t: 'AVGO', w: 5.1 }, { t: 'AMD', w: 4.9 }, { t: 'TSM', w: 4.8 }, { t: 'AAPL', w: 4.6 }],
  ALAI: [{ t: 'NVDA', w: 13.1 }, { t: 'AMZN', w: 5.7 }, { t: 'TSM', w: 5.5 }, { t: 'MSFT', w: 5.4 }, { t: 'WDC', w: 4.7 }],
  CHAT: [{ t: 'MU', w: 6.4 }, { t: 'AMD', w: 5.8 }, { t: 'NVDA', w: 5.6 }, { t: 'GOOGL', w: 5.0 }, { t: 'ARM', w: 4.7 }],
  AIFD: [{ t: 'LITE', w: 6.5 }, { t: 'NVDA', w: 6.5 }, { t: 'MU', w: 6.4 }, { t: 'MRVL', w: 6.3 }, { t: 'AVGO', w: 6.2 }],
  SPRX: [{ t: 'ARM', w: 8.8 }, { t: 'COHR', w: 8.4 }, { t: 'ALAB', w: 7.1 }, { t: 'KLAC', w: 5.9 }, { t: 'APLD', w: 5.5 }],
  AOTG: [{ t: 'AMD', w: 15.3 }, { t: 'NVDA', w: 10.8 }, { t: 'MU', w: 10.3 }, { t: 'TSM', w: 7.1 }, { t: 'APP', w: 5.2 }],
  SOXX: [{ t: 'MU', w: 11.9 }, { t: 'AMD', w: 9.2 }, { t: 'MRVL', w: 8.4 }, { t: 'AVGO', w: 6.8 }, { t: 'INTC', w: 5.6 }],
  PSI: [{ t: 'MU', w: 6.0 }, { t: 'AMAT', w: 5.5 }, { t: 'AMD', w: 5.4 }, { t: 'LRCX', w: 5.3 }, { t: 'KLAC', w: 5.3 }],
  XSD: [{ t: 'MXL', w: 5.8 }, { t: 'MRVL', w: 4.7 }, { t: 'ALAB', w: 4.1 }, { t: 'NVTS', w: 4.0 }, { t: 'AMD', w: 3.7 }],
  DRAM: [{ t: 'SNDK', w: 5.1 }, { t: 'MU', w: 4.3 }, { t: 'STX', w: 4.1 }, { t: 'WDC', w: 3.8 }],
  PTF: [{ t: 'SNDK', w: 7.8 }, { t: 'MU', w: 5.0 }, { t: 'WDC', w: 4.9 }, { t: 'STX', w: 4.7 }, { t: 'NVTS', w: 4.7 }],
  WCLD: [{ t: 'DOCN', w: 3.2 }, { t: 'DDOG', w: 2.8 }, { t: 'FROG', w: 2.8 }, { t: 'PANW', w: 2.4 }, { t: 'CRWD', w: 2.4 }],
  IGV: [{ t: 'ORCL', w: 10.3 }, { t: 'MSFT', w: 7.7 }, { t: 'PANW', w: 7.7 }, { t: 'PLTR', w: 6.8 }, { t: 'CRWD', w: 6.5 }],
  FDTX: [{ t: 'MU', w: 9.4 }, { t: 'MRVL', w: 8.1 }, { t: 'TSM', w: 6.0 }, { t: 'NVDA', w: 4.6 }, { t: 'STX', w: 4.0 }],
  GTEK: [{ t: 'MRVL', w: 4.6 }, { t: 'DELL', w: 3.1 }, { t: 'CDNS', w: 2.6 }, { t: 'NET', w: 2.4 }, { t: 'APH', w: 2.2 }],
  ARKK: [{ t: 'TSLA', w: 10.5 }, { t: 'AMD', w: 5.2 }, { t: 'CRSP', w: 4.8 }, { t: 'TEM', w: 4.7 }, { t: 'HOOD', w: 4.5 }],
  MARS: [{ t: 'RKLB', w: 13.3 }, { t: 'ASTS', w: 9.8 }, { t: 'SATS', w: 7.9 }, { t: 'PL', w: 5.7 }, { t: 'LUNR', w: 4.5 }],
  FRWD: [{ t: 'STX', w: 9.1 }, { t: 'NVDA', w: 8.2 }, { t: 'AMD', w: 7.5 }, { t: 'TSM', w: 5.7 }, { t: 'LRCX', w: 5.4 }],
  BCTK: [{ t: 'TSM', w: 8.4 }, { t: 'AVGO', w: 8.3 }, { t: 'NVDA', w: 6.7 }, { t: 'LRCX', w: 6.4 }, { t: 'MU', w: 5.2 }],
  FWD: [{ t: 'AVGO', w: 3.1 }, { t: 'AMD', w: 2.6 }, { t: 'NVDA', w: 2.1 }, { t: 'CAT', w: 1.7 }, { t: 'LRCX', w: 1.6 }],
  CBSE: [{ t: 'MRVL', w: 3.5 }, { t: 'SNOW', w: 3.0 }, { t: 'MU', w: 3.0 }, { t: 'TENB', w: 2.7 }, { t: 'STX', w: 2.7 }],
  FCUS: [{ t: 'LITE', w: 4.5 }, { t: 'MU', w: 4.5 }, { t: 'SNDK', w: 4.4 }, { t: 'CIEN', w: 4.4 }, { t: 'STX', w: 4.3 }],
  WGMI: [{ t: 'CIFR', w: 15.1 }, { t: 'IREN', w: 13.3 }, { t: 'WULF', w: 8.7 }, { t: 'CORZ', w: 7.3 }, { t: 'KEEL', w: 7.2 }],
  VOLT: [{ t: 'POWL', w: 8.0 }, { t: 'BELFB', w: 7.4 }, { t: 'ETN', w: 5.6 }, { t: 'PWR', w: 5.5 }, { t: 'BE', w: 4.5 }],
  PBD: [{ t: 'SEDG', w: 1.3 }, { t: 'BLDP', w: 1.3 }, { t: 'ENPH', w: 1.3 }, { t: 'FSLR', w: 1.2 }, { t: 'SHLS', w: 1.2 }],
  PBW: [{ t: 'HYLN', w: 3.6 }, { t: 'NVTS', w: 3.5 }, { t: 'FCEL', w: 3.4 }, { t: 'BLDP', w: 2.5 }, { t: 'IONQ', w: 2.1 }],
  PRN: [{ t: 'TTMI', w: 5.9 }, { t: 'STRL', w: 4.9 }, { t: 'PL', w: 4.6 }, { t: 'FIX', w: 4.6 }, { t: 'AGX', w: 4.4 }],
  RSHO: [{ t: 'TKR', w: 9.0 }, { t: 'POWL', w: 8.1 }, { t: 'CGNX', w: 7.5 }, { t: 'CAT', w: 6.7 }, { t: 'ETN', w: 5.8 }],
  IDEF: [{ t: 'RTX', w: 7.3 }, { t: 'LMT', w: 6.6 }, { t: 'GD', w: 5.5 }, { t: 'PLTR', w: 5.0 }, { t: 'NOC', w: 4.7 }],
  BILT: [{ t: 'UNP', w: 5.5 }, { t: 'AEP', w: 4.4 }, { t: 'AENA', w: 4.1 }, { t: 'LNG', w: 3.9 }, { t: 'CP', w: 3.6 }],
  BUZZ: [{ t: 'NOW', w: 3.9 }, { t: 'SMCI', w: 3.9 }, { t: 'MU', w: 3.7 }, { t: 'ASTS', w: 3.5 }, { t: 'PLTR', w: 3.3 }],
  MEME: [{ t: 'AAOI', w: 8.5 }, { t: 'BE', w: 6.0 }, { t: 'RDW', w: 6.0 }, { t: 'NBIS', w: 6.0 }, { t: 'IREN', w: 5.8 }],
  RKNG: [{ t: 'SNDK', w: 5.6 }, { t: 'NVTS', w: 5.5 }, { t: 'MU', w: 5.5 }, { t: 'NBIS', w: 5.0 }, { t: 'AAOI', w: 4.5 }],
};
// @@END_GENERATED:ETF_TOP_HOLDINGS@@

// @@GENERATED:TOP10_RET@@
// Top10 composite returns per theme per period (average of all ETFs in theme)
const TOP10_RET: Record<Theme, Record<Period, number>> = {
  'AI & ML':         { '1W': 1.1, '1M': 17.8, '6M': 45.2, '1Y': 90.2 },
  'Semiconductors':  { '1W': 3.1, '1M': 31.6, '6M': 103.3, '1Y': 167.4 },
  'Broad Tech':      { '1W': -0.5, '1M': 14.2, '6M': 29.9, '1Y': 62.9 },
  'Electrification': { '1W': -0.8, '1M': 4.4, '6M': 41.5, '1Y': 86.5 },
  'Industrials':     { '1W': -0.9, '1M': 2.7, '6M': 25.1, '1Y': 44.5 },
  'Meme':            { '1W': -3.2, '1M': 16, '6M': 25, '1Y': 21.5 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, Record<Period, ChartPeriodData>> = {
  'AI & ML': {
    '1W': { top10: [100, 102.46, 104.66, 104.17, 101.14], spy: [100, 100.27, 100.41, 99.7, 99.48], top10Return: 1.1, spyReturn: -0.5, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 102.18, 105.58, 103.37, 106.52, 106.52, 108.6, 109.43, 106.9, 104.6, 103.38, 106.65, 109.15, 110.13, 114.36, 115.66, 116.46, 119.37, 122.03, 121.4, 117.81], spy: [100, 100.8, 102.2, 101.89, 102.73, 102.81, 103.38, 104.2, 102.95, 102.87, 102.19, 103.24, 103.44, 103.85, 104.54, 105.1, 105.36, 105.64, 105.79, 105.05, 104.81], top10Return: 17.8, spyReturn: 4.8, xLabels: ["May 7", "May 14", "May 21", "May 28", "Jun 4"] },
    '6M': { top10: [100, 102.17, 96.07, 100.41, 101.25, 103.33, 101.57, 105.59, 103.09, 102.64, 102.11, 104.52, 101.06, 101.78, 102.3, 100.54, 96.01, 104.32, 111.59, 117.91, 117.71, 128.78, 133.57, 130.55, 142.23, 145.19], spy: [100, 100.7, 98.84, 100.87, 100.49, 101.57, 99, 101.62, 100.75, 101.13, 100.28, 101.28, 100.11, 98.95, 98.01, 95.44, 95.02, 98.78, 102.27, 103.92, 103.97, 107.22, 108.46, 108.31, 110.26, 109.95], top10Return: 45.2, spyReturn: 10, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.59, 102.38, 106.97, 108.31, 107.4, 110.97, 112.17, 114.44, 115.05, 116.35, 111.87, 118.07, 117.2, 123.69, 128.69, 126.17, 130.89, 130.47, 131.9, 133.3, 138.82, 133.65, 128.82, 121.64, 130.95, 133.69, 130.26, 129.89, 131.89, 136, 136.94, 133.69, 140.08, 135.37, 135.89, 134.6, 138.15, 132.99, 134.86, 134.57, 133.34, 129.66, 139.45, 151.43, 158.9, 157.74, 173.82, 181.17, 176.98, 194.49, 198.39], spy: [100, 100.91, 100.25, 102.67, 104.94, 104.65, 105.31, 106.46, 106.07, 106.09, 108.23, 106.65, 108.89, 108.61, 110.32, 111.37, 111.06, 112.3, 109.58, 111.49, 112.72, 114.08, 112.48, 112.77, 109.5, 114.68, 115.06, 114.4, 114.21, 115.42, 116.09, 116.42, 113.7, 116.71, 115.71, 116.14, 115.16, 116.31, 114.97, 113.49, 110.99, 110.22, 109.95, 114.09, 117.74, 119.34, 119.41, 123.14, 124.56, 124.39, 126.63, 126.28], top10Return: 90.2, spyReturn: 26.3, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Semiconductors': {
    '1W': { top10: [100, 101.26, 106.21, 107.48, 103.13], spy: [100, 100.27, 100.41, 99.7, 99.48], top10Return: 3.1, spyReturn: -0.5, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 105.31, 109.62, 106.9, 115.22, 113.51, 117.22, 117.09, 112.71, 109.16, 109.63, 114.44, 117.3, 119.02, 128.21, 128.72, 127.61, 129.67, 135.82, 137.37, 131.63], spy: [100, 100.8, 102.2, 101.89, 102.73, 102.81, 103.38, 104.2, 102.95, 102.87, 102.19, 103.24, 103.44, 103.85, 104.54, 105.1, 105.36, 105.64, 105.79, 105.05, 104.81], top10Return: 31.6, spyReturn: 4.8, xLabels: ["May 7", "May 14", "May 21", "May 28", "Jun 4"] },
    '6M': { top10: [100, 103.88, 100.84, 103.67, 109.33, 112.04, 114.08, 115.62, 115.91, 119.84, 120.59, 125, 121.39, 123.22, 124.15, 133.41, 129.5, 138.4, 141.85, 152.94, 160.26, 180.31, 188.61, 191.9, 205.19, 203.32], spy: [100, 100.7, 98.84, 100.87, 100.49, 101.57, 99, 101.62, 100.75, 101.13, 100.28, 101.28, 100.11, 98.95, 98.01, 95.44, 95.02, 98.78, 102.27, 103.92, 103.97, 107.22, 108.46, 108.31, 110.26, 109.95], top10Return: 103.3, spyReturn: 10, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 104.31, 104.51, 110.4, 112.98, 113.32, 114.41, 111.9, 111.11, 111.78, 118.11, 113.32, 120.12, 118.32, 122.97, 129.36, 129, 134.19, 128.66, 137.97, 139.46, 143.94, 140.19, 134.45, 124.32, 138.55, 145.81, 141.63, 141.48, 142.5, 154.51, 156.02, 157.94, 162.05, 160.16, 166.32, 167.52, 172.58, 160.18, 158.86, 157.39, 163.31, 158.92, 176.93, 191.28, 205.29, 214.48, 242.36, 254.79, 251.68, 274.46, 278.15], spy: [100, 100.91, 100.25, 102.67, 104.94, 104.65, 105.31, 106.46, 106.07, 106.09, 108.23, 106.65, 108.89, 108.61, 110.32, 111.37, 111.06, 112.3, 109.58, 111.49, 112.72, 114.08, 112.48, 112.77, 109.5, 114.68, 115.06, 114.4, 114.21, 115.42, 116.09, 116.42, 113.7, 116.71, 115.71, 116.14, 115.16, 116.31, 114.97, 113.49, 110.99, 110.22, 109.95, 114.09, 117.74, 119.34, 119.41, 123.14, 124.56, 124.39, 126.63, 126.28], top10Return: 167.4, spyReturn: 26.3, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Broad Tech': {
    '1W': { top10: [100, 101.65, 102.63, 101.49, 99.52], spy: [100, 100.27, 100.41, 99.7, 99.48], top10Return: -0.5, spyReturn: -0.5, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 101.72, 104.44, 102.64, 105.1, 105.13, 105.59, 107.36, 105.14, 103.93, 103.06, 105.59, 107.45, 109.05, 112.57, 114.21, 115.05, 116.8, 117.92, 116.46, 114.19], spy: [100, 100.8, 102.2, 101.89, 102.73, 102.81, 103.38, 104.2, 102.95, 102.87, 102.19, 103.24, 103.44, 103.85, 104.54, 105.1, 105.36, 105.64, 105.79, 105.05, 104.81], top10Return: 14.2, spyReturn: 4.8, xLabels: ["May 7", "May 14", "May 21", "May 28", "Jun 4"] },
    '6M': { top10: [100, 101.68, 96.7, 99.86, 99.99, 102.33, 101.25, 102.58, 99.6, 99.67, 99.4, 101.63, 100.62, 98.68, 98.89, 97.26, 95.37, 101.14, 107.5, 112.39, 111.03, 120.66, 122.03, 122.24, 128.3, 129.92], spy: [100, 100.7, 98.84, 100.87, 100.49, 101.57, 99, 101.62, 100.75, 101.13, 100.28, 101.28, 100.11, 98.95, 98.01, 95.44, 95.02, 98.78, 102.27, 103.92, 103.97, 107.22, 108.46, 108.31, 110.26, 109.95], top10Return: 29.9, spyReturn: 10, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.2, 101.67, 105.54, 108.2, 106.6, 110.34, 110.47, 109.23, 108.43, 109.52, 107.87, 112.07, 110.87, 116.04, 122.49, 120.99, 126.57, 127.79, 130.17, 128.93, 131.64, 129.03, 120.75, 114.91, 125.18, 125.09, 123.51, 121.86, 121.07, 126.01, 128.1, 126.69, 130.69, 124.84, 124.96, 123.94, 128.63, 126.47, 125.23, 125.7, 125.97, 122.61, 129.32, 136.48, 143.36, 139.14, 153.56, 153.47, 150.27, 161.52, 162.95], spy: [100, 100.91, 100.25, 102.67, 104.94, 104.65, 105.31, 106.46, 106.07, 106.09, 108.23, 106.65, 108.89, 108.61, 110.32, 111.37, 111.06, 112.3, 109.58, 111.49, 112.72, 114.08, 112.48, 112.77, 109.5, 114.68, 115.06, 114.4, 114.21, 115.42, 116.09, 116.42, 113.7, 116.71, 115.71, 116.14, 115.16, 116.31, 114.97, 113.49, 110.99, 110.22, 109.95, 114.09, 117.74, 119.34, 119.41, 123.14, 124.56, 124.39, 126.63, 126.28], top10Return: 62.9, spyReturn: 26.3, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Electrification': {
    '1W': { top10: [100, 99.08, 100.96, 100.18, 99.19], spy: [100, 100.27, 100.41, 99.7, 99.48], top10Return: -0.8, spyReturn: -0.5, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 102.72, 103.81, 101.56, 103.31, 104.74, 103.25, 103.88, 102.63, 98.79, 95.58, 97.91, 100.96, 102.64, 106.18, 105.77, 105.31, 104.39, 106.42, 105.48, 104.4], spy: [100, 100.8, 102.2, 101.89, 102.73, 102.81, 103.38, 104.2, 102.95, 102.87, 102.19, 103.24, 103.44, 103.85, 104.54, 105.1, 105.36, 105.64, 105.79, 105.05, 104.81], top10Return: 4.4, spyReturn: 4.8, xLabels: ["May 7", "May 14", "May 21", "May 28", "Jun 4"] },
    '6M': { top10: [100, 102.19, 96.99, 100.16, 102.31, 103.98, 107.59, 110.71, 110.1, 114.06, 114.47, 118.12, 112.27, 111.72, 113.1, 113.6, 109.88, 115.17, 123.78, 127.1, 130.15, 140.72, 140.48, 131.69, 143.37, 141.56], spy: [100, 100.7, 98.84, 100.87, 100.49, 101.57, 99, 101.62, 100.75, 101.13, 100.28, 101.28, 100.11, 98.95, 98.01, 95.44, 95.02, 98.78, 102.27, 103.92, 103.97, 107.22, 108.46, 108.31, 110.26, 109.95], top10Return: 41.5, spyReturn: 10, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 103.32, 102.88, 105.06, 108.48, 108.64, 112.17, 114.66, 111.52, 113.55, 115, 114.54, 117.39, 117.32, 117.97, 123.27, 125.78, 131.09, 133.18, 136.75, 136.7, 138.39, 137.21, 134.38, 129.72, 138.24, 138.4, 138.59, 138.47, 137.44, 140.52, 144.84, 145.15, 150.74, 149.78, 150.39, 149.96, 153.48, 149.77, 151.27, 151.63, 153.72, 153.94, 161.11, 168.56, 173.17, 171.9, 180.55, 181.06, 176.58, 188.38, 186.51], spy: [100, 100.91, 100.25, 102.67, 104.94, 104.65, 105.31, 106.46, 106.07, 106.09, 108.23, 106.65, 108.89, 108.61, 110.32, 111.37, 111.06, 112.3, 109.58, 111.49, 112.72, 114.08, 112.48, 112.77, 109.5, 114.68, 115.06, 114.4, 114.21, 115.42, 116.09, 116.42, 113.7, 116.71, 115.71, 116.14, 115.16, 116.31, 114.97, 113.49, 110.99, 110.22, 109.95, 114.09, 117.74, 119.34, 119.41, 123.14, 124.56, 124.39, 126.63, 126.28], top10Return: 86.5, spyReturn: 26.3, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Industrials': {
    '1W': { top10: [100, 99, 98.9, 99.2, 99.17], spy: [100, 100.27, 100.41, 99.7, 99.48], top10Return: -0.9, spyReturn: -0.5, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 102.18, 104.42, 101.85, 102.24, 102.67, 102.35, 102.89, 101.46, 99.57, 97.89, 99.78, 99.97, 100.88, 103.4, 103.96, 103.49, 102.46, 102.36, 102.68, 102.65], spy: [100, 100.8, 102.2, 101.89, 102.73, 102.81, 103.38, 104.2, 102.95, 102.87, 102.19, 103.24, 103.44, 103.85, 104.54, 105.1, 105.36, 105.64, 105.79, 105.05, 104.81], top10Return: 2.7, spyReturn: 4.8, xLabels: ["May 7", "May 14", "May 21", "May 28", "Jun 4"] },
    '6M': { top10: [100, 102.25, 99.11, 102.66, 104.63, 108.17, 110.8, 111.67, 112.74, 116.74, 118.53, 119.87, 118.1, 114.72, 113.55, 112.46, 109.98, 117.08, 120.02, 120.39, 118.92, 126.1, 124.61, 120.64, 126.52, 125.08], spy: [100, 100.7, 98.84, 100.87, 100.49, 101.57, 99, 101.62, 100.75, 101.13, 100.28, 101.28, 100.11, 98.95, 98.01, 95.44, 95.02, 98.78, 102.27, 103.92, 103.97, 107.22, 108.46, 108.31, 110.26, 109.95], top10Return: 25.1, spyReturn: 10, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.05, 100.49, 103.1, 105.47, 105.69, 107.05, 107.83, 107.94, 108.42, 109.78, 108.45, 111.19, 110.5, 112.2, 113.54, 113.21, 116.08, 114.3, 114.62, 116.94, 117.73, 114.93, 112.46, 108.53, 114.53, 115.38, 117.37, 116.19, 117.99, 122.96, 126.68, 128.47, 131.13, 132.42, 136, 136.63, 137.66, 135.78, 131.16, 129.62, 131.89, 130.52, 137.29, 137.18, 139.65, 137.27, 145.43, 143.51, 139.52, 145.93, 144.52], spy: [100, 100.91, 100.25, 102.67, 104.94, 104.65, 105.31, 106.46, 106.07, 106.09, 108.23, 106.65, 108.89, 108.61, 110.32, 111.37, 111.06, 112.3, 109.58, 111.49, 112.72, 114.08, 112.48, 112.77, 109.5, 114.68, 115.06, 114.4, 114.21, 115.42, 116.09, 116.42, 113.7, 116.71, 115.71, 116.14, 115.16, 116.31, 114.97, 113.49, 110.99, 110.22, 109.95, 114.09, 117.74, 119.34, 119.41, 123.14, 124.56, 124.39, 126.63, 126.28], top10Return: 44.5, spyReturn: 26.3, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Meme': {
    '1W': { top10: [100, 100.21, 102.66, 99.09, 96.78], spy: [100, 100.27, 100.41, 99.7, 99.48], top10Return: -3.2, spyReturn: -0.5, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 103.63, 107.96, 102.56, 106.05, 107.76, 110.17, 111.21, 106.85, 102.51, 100.92, 104.82, 111.2, 113.86, 117.68, 121.64, 119.96, 120.13, 123.15, 118.78, 116.05], spy: [100, 100.8, 102.2, 101.89, 102.73, 102.81, 103.38, 104.2, 102.95, 102.87, 102.19, 103.24, 103.44, 103.85, 104.54, 105.1, 105.36, 105.64, 105.79, 105.05, 104.81], top10Return: 16, spyReturn: 4.8, xLabels: ["May 7", "May 14", "May 21", "May 28", "Jun 4"] },
    '6M': { top10: [100, 99.52, 87.85, 89.59, 92.17, 97.49, 97.44, 96.06, 91.84, 89.4, 88.04, 87.42, 85.91, 84.39, 89.38, 88.49, 86.91, 92.75, 101.46, 107.07, 102.56, 115.71, 115.37, 117, 130.75, 125.05], spy: [100, 100.7, 98.84, 100.87, 100.49, 101.57, 99, 101.62, 100.75, 101.13, 100.28, 101.28, 100.11, 98.95, 98.01, 95.44, 95.02, 98.78, 102.27, 103.92, 103.97, 107.22, 108.46, 108.31, 110.26, 109.95], top10Return: 25, spyReturn: 10, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.51, 101.5, 98.44, 96.11, 94.03, 93.9, 93.98, 88.96, 87.21, 86.05, 86.22, 89.25, 90.61, 91.34, 89, 91.61, 92.72, 92.14, 96.11, 97.31, 97.73, 94.44, 91.54, 88.45, 89.31, 90.61, 87.94, 89.22, 90.05, 92.78, 94.68, 93.68, 95.73, 94.15, 93.13, 90.9, 89.55, 93.17, 95.7, 101.93, 101.58, 98.19, 98.62, 104.64, 105.01, 109.55, 116.14, 115.9, 121.4, 126.27, 121.55], spy: [100, 100.91, 100.25, 102.67, 104.94, 104.65, 105.31, 106.46, 106.07, 106.09, 108.23, 106.65, 108.89, 108.61, 110.32, 111.37, 111.06, 112.3, 109.58, 111.49, 112.72, 114.08, 112.48, 112.77, 109.5, 114.68, 115.06, 114.4, 114.21, 115.42, 116.09, 116.42, 113.7, 116.71, 115.71, 116.14, 115.16, 116.31, 114.97, 113.49, 110.99, 110.22, 109.95, 114.09, 117.74, 119.34, 119.41, 123.14, 124.56, 124.39, 126.63, 126.28], top10Return: 21.5, spyReturn: 26.3, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
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
export const SCAN_TIMESTAMP    = '2026-06-04T13:35:56.656Z';
export const SCAN_TIMESTAMP_NY = 'June 4, 2026 at 9:35 AM ET';
// @@END_GENERATED:SCAN_TIMESTAMP@@

// Number of ETFs per theme — denominator for Coverage Score display (x/n badge)
// @@GENERATED:THEME_ETF_COUNT@@
export const THEME_ETF_COUNT: Record<Theme, number> = {
  'AI & ML':         10,
  'Semiconductors':  4,
  'Broad Tech':      13,
  'Electrification': 3,
  'Industrials':     4,
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
  { ticker: 'MU', name: `MICRON TECHNOLOGY INC`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 14.72, bestProScore: 6.47, price: 1011.75, weeklyChange: 4.20 },
  { ticker: 'NVDA', name: `NVIDIA CORP`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 11.13, bestProScore: 5.81, price: 214.35, weeklyChange: 1.52 },
  { ticker: 'AMD', name: `ADVANCED MICRO DEVICES INC`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 10.77, bestProScore: 4.74, price: 513.68, weeklyChange: -0.47 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 6.72, bestProScore: 3.28, price: 285.39, weeklyChange: 39.21 },
  { ticker: 'AVGO', name: `BROADCOM INC`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 6.64, bestProScore: 3.06, price: 409.17, weeklyChange: -8.42 },
  { ticker: 'POWL', name: `POWELL INDUSTRIES INC`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 4.70, bestProScore: 2.68, price: 292.19, weeklyChange: 2.73 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.35, bestProScore: 2.48, price: 432.86, weeklyChange: 3.44 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.39, bestProScore: 2.16, price: 331.06, weeklyChange: 4.05 },
  { ticker: 'ETN', name: `EATON CORP PLC`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 3.32, bestProScore: 1.86, price: 413.01, weeklyChange: 3.10 },
  { ticker: 'AMZN', name: `AMAZON.COM INC`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 3.26, bestProScore: 2.03, price: 253.49, weeklyChange: -6.34 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': 3, '1M': 29.9, '6M': 113.2, '1Y': 208.6 },
  ARTY: { '1W': 3.1, '1M': 21.3, '6M': 56.5, '1Y': 102.9 },
  BAI:  { '1W': -0.5, '1M': 13.4, '6M': 42.6, '1Y': 85.4 },
  IVEP: { '1W': 0.2, '1M': -1.6, '6M': 8.4, '1Y': 8.4 },
  IGPT: { '1W': 0.2, '1M': 25.1, '6M': 71.9, '1Y': 115.7 },
  IVES: { '1W': -1.8, '1M': 16, '6M': 21, '1Y': 55.2 },
  ALAI: { '1W': 2.1, '1M': 13.5, '6M': 24.8, '1Y': 60.1 },
  CHAT: { '1W': 0.5, '1M': 22.8, '6M': 60.9, '1Y': 123.9 },
  AIFD: { '1W': 2.2, '1M': 13.2, '6M': 43.6, '1Y': 89.8 },
  SPRX: { '1W': 1.5, '1M': 28.5, '6M': 38.1, '1Y': 102.5 },
  AOTG: { '1W': 1.9, '1M': 13.8, '6M': 16.2, '1Y': 39.8 },
  // Semiconductors
  SOXX: { '1W': 3.9, '1M': 28, '6M': 93.1, '1Y': 172.8 },
  PSI:  { '1W': 2.2, '1M': 17.4, '6M': 98.4, '1Y': 194.5 },
  XSD:  { '1W': 3, '1M': 27.3, '6M': 86.4, '1Y': 167.1 },
  DRAM: { '1W': 3.4, '1M': 53.8, '6M': 135.3, '1Y': 135.3 },
  // Broad Tech
  PTF:  { '1W': 2.3, '1M': 15.7, '6M': 64.2, '1Y': 101.8 },
  WCLD: { '1W': -0.5, '1M': 11.1, '6M': -6.3, '1Y': -10.1 },
  IGV:  { '1W': -2.4, '1M': 12.2, '6M': -8.1, '1Y': -5.4 },
  FDTX: { '1W': 4.7, '1M': 20, '6M': 38.5, '1Y': 55.3 },
  GTEK: { '1W': 3.1, '1M': 15.7, '6M': 53.8, '1Y': 80.1 },
  ARKK: { '1W': -4.5, '1M': 0.1, '6M': -5.3, '1Y': 35 },
  MARS: { '1W': -15.3, '1M': 19.1, '6M': 46.9, '1Y': 46.9 },
  FRWD: { '1W': 1.1, '1M': 15.6, '6M': 32.2, '1Y': 32.2 },
  BCTK: { '1W': 0.2, '1M': 11.5, '6M': 25.6, '1Y': 25.6 },
  FWD:  { '1W': 0.2, '1M': 11.2, '6M': 35.2, '1Y': 70.3 },
  CBSE: { '1W': 3.4, '1M': 10.9, '6M': 29.4, '1Y': 50.6 },
  FCUS: { '1W': 1.3, '1M': 6.4, '6M': 38.6, '1Y': 80.7 },
  WGMI: { '1W': 0.1, '1M': 35, '6M': 44.2, '1Y': 255.3 },
  // Electrification
  POW:  { '1W': -0.9, '1M': -1, '6M': 58.2, '1Y': 54.5 },
  VOLT: { '1W': 0.3, '1M': -3.5, '6M': 31.3, '1Y': 63.8 },
  PBD:  { '1W': -0.8, '1M': 6.1, '6M': 38.9, '1Y': 85.6 },
  PBW:  { '1W': -1.8, '1M': 16, '6M': 37.8, '1Y': 142.1 },
  // Industrials
  AIRR: { '1W': -0.1, '1M': 3.1, '6M': 29.6, '1Y': 65.6 },
  PRN:  { '1W': -0.2, '1M': 6.9, '6M': 45.4, '1Y': 64.4 },
  RSHO: { '1W': 2.1, '1M': 6.7, '6M': 31.3, '1Y': 55.5 },
  IDEF: { '1W': -5.1, '1M': -2.1, '6M': 8.6, '1Y': 21.9 },
  BILT: { '1W': -1, '1M': -1.2, '6M': 10.6, '1Y': 15.2 },
  // Meme
  BUZZ: { '1W': -3.6, '1M': 12.4, '6M': 11.4, '1Y': 41.7 },
  MEME: { '1W': -4.2, '1M': 23.2, '6M': 52, '1Y': 11.2 },
  RKNG: { '1W': -1.8, '1M': 12.5, '6M': 11.7, '1Y': 11.7 },
};
// @@END_GENERATED:ETF_RETURNS@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 9, avgWeight: 6.46, proScore: 5.81, coverage: 0.9,
      price: 214.35, weeklyPrices: [211.14, 224.36, 222.82, 214.75, 214.35], weeklyChange: 1.52, sortRank: 0, periodReturns: { '1M': 8, '6M': 16.9, '1Y': 51 },
      priceHistory: { '1W': [211.14, 224.36, 222.82, 214.75, 214.35], '1M': [198.48, 196.5, 207.83, 211.5, 215.2, 220.78, 225.83, 235.74, 225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 214.25, 211.14, 224.36, 222.82, 214.75, 214.35], '6M': [183.38, 180.93, 174.14, 190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 214.25, 214.35], '1Y': [141.92, 142.83, 145.48, 155.02, 159.34, 164.92, 172.41, 173.74, 177.87, 180.77, 182.02, 174.98, 180.17, 167.02, 177.82, 176.67, 178.19, 187.62, 183.16, 183.22, 182.16, 202.89, 188.08, 186.86, 180.64, 177, 182.41, 175.02, 180.99, 188.22, 187.24, 185.81, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 186.03, 180.4, 178.68, 175.75, 183.91, 198.35, 202.5, 209.25, 207.83, 225.83, 223.47, 214.25, 214.35] },
      velocityScore: { '1D': 3.6, '1W': 38, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.2T', pe: 32.8, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { AIS: false, ARTY: 3.34, BAI: 4.34, IVEP: false, IGPT: 5.61, IVES: 4.59, ALAI: 13.06, CHAT: 5.64, AIFD: 6.48, SPRX: 4.2, AOTG: 10.85 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 8, avgWeight: 7.11, proScore: 5.69, coverage: 0.8,
      price: 1011.75, weeklyPrices: [971.00, 1035.50, 1064.10, 1079.57, 1011.75], weeklyChange: 4.2, sortRank: 0, periodReturns: { '1M': 75.5, '6M': 346.4, '1Y': 879.9 },
      priceHistory: { '1W': [971, 1035.5, 1064.1, 1079.57, 1011.75], '1M': [576.45, 640.2, 666.59, 646.63, 746.81, 766.58, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 923.52, 971, 1035.5, 1064.1, 1079.57, 1011.75], '6M': [226.65, 258.46, 248.55, 284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 1011.75], '1Y': [103.25, 116.03, 121.82, 126, 122.29, 124.53, 114.39, 111.73, 109.14, 111.87, 125.29, 115.79, 122, 131.37, 157.23, 162.73, 157.27, 187.83, 181.6, 202.38, 206.71, 224.01, 238.33, 236.95, 201.37, 236.48, 237.22, 241.14, 265.92, 294.37, 343.43, 338.13, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.73, 382.09, 367.85, 421.51, 457.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 1011.75] },
      velocityScore: { '1D': -2.2, '1W': -19.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 47.8, revenueGrowth: 196, eps: 21.16, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { AIS: false, ARTY: 7.62, BAI: 6.07, IVEP: false, IGPT: 12.73, IVES: 6.15, ALAI: 1.2, CHAT: 6.43, AIFD: 6.43, SPRX: false, AOTG: 10.26 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 8, avgWeight: 5.93, proScore: 4.74, coverage: 0.8,
      price: 513.68, weeklyPrices: [516.10, 510.13, 521.54, 542.52, 513.68], weeklyChange: -0.47, sortRank: 0, periodReturns: { '1M': 50.4, '6M': 137.8, '1Y': 333.2 },
      priceHistory: { '1W': [516.1, 510.13, 521.54, 542.52, 513.68], '1M': [341.54, 355.26, 421.39, 408.46, 455.19, 448.29, 445.5, 449.7, 424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 518.09, 516.1, 510.13, 521.54, 542.52, 513.68], '6M': [215.98, 221.43, 201.06, 214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 518.09, 513.68], '1Y': [118.58, 121.14, 126.79, 143.68, 137.91, 146.42, 156.99, 162.12, 176.31, 172.4, 180.95, 163.71, 168.58, 151.14, 158.57, 157.39, 159.46, 164.67, 214.9, 233.08, 234.99, 254.84, 237.7, 247.96, 206.02, 217.53, 217.97, 210.78, 213.43, 215.61, 214.35, 220.97, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 204.83, 199.46, 220.27, 210.21, 236.64, 278.26, 303.46, 337.11, 421.39, 445.5, 447.58, 518.09, 513.68] },
      velocityScore: { '1D': 4.2, '1W': -18, '1M': null, '6M': null }, isNew: false,
      marketCap: '$838B', pe: 172.4, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 7.34, BAI: 5.11, IVEP: false, IGPT: 7.38, IVES: 4.94, ALAI: 1.11, CHAT: 5.75, AIFD: false, SPRX: 0.53, AOTG: 15.28 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 7, avgWeight: 4.37, proScore: 3.06, coverage: 0.7,
      price: 409.17, weeklyPrices: [446.77, 459.97, 481.57, 479.23, 409.17], weeklyChange: -8.42, sortRank: 0, periodReturns: { '1M': -1.8, '6M': 7.4, '1Y': 56.7 },
      priceHistory: { '1W': [446.77, 459.97, 481.57, 479.23, 409.17], '1M': [416.5, 427.36, 425.44, 412.56, 430, 419.3, 416.79, 439.79, 425.19, 420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 426.58, 446.77, 459.97, 481.57, 479.23, 409.17], '6M': [381.03, 406.37, 329.88, 352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 417.76, 426.58, 409.17], '1Y': [261.08, 252.91, 251.26, 270.17, 275.18, 274.38, 283.34, 288.71, 293.7, 303.76, 311.23, 289.6, 308.65, 334.89, 359.87, 344.94, 334.53, 338.37, 324.63, 349.33, 344.29, 376.47, 355.59, 339.98, 346.82, 402.96, 390.24, 359.93, 340.36, 349.39, 343.77, 354.61, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 341.57, 315.93, 318.81, 313.49, 354.91, 398.47, 422.65, 405.45, 425.44, 416.79, 417.76, 426.58, 409.17] },
      velocityScore: { '1D': 7.4, '1W': 2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.9T', pe: 68.3, revenueGrowth: 30, eps: 5.99, grossMargin: 77, dividendYield: 0.54,
      etfPresence: { AIS: false, ARTY: 3.84, BAI: 5.6, IVEP: false, IGPT: false, IVES: 5.11, ALAI: 4.67, CHAT: 3.37, AIFD: 6.23, SPRX: false, AOTG: 1.77 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 4.45, proScore: 2.67, coverage: 0.6,
      price: 364.37, weeklyPrices: [380.34, 376.37, 361.85, 358.99, 364.37], weeklyChange: -4.2, sortRank: 0, periodReturns: { '1M': -4.9, '6M': 14.7, '1Y': 116.8 },
      priceHistory: { '1W': [380.34, 376.37, 361.85, 358.99, 364.37], '1M': [383.25, 388.43, 398.04, 397.99, 400.8, 387.35, 402.62, 401.07, 396.78, 396.94, 387.66, 388.91, 387.66, 382.97, 388.88, 390.13, 380.34, 376.37, 361.85, 358.99, 364.37], '6M': [317.62, 312.43, 302.46, 313.51, 316.54, 331.86, 322, 334.55, 339.71, 318.58, 303.33, 312.9, 303.13, 307.04, 310.92, 290.44, 287.56, 317.32, 337.12, 339.32, 349.94, 398.04, 402.62, 388.91, 390.13, 364.37], '1Y': [168.05, 177.35, 173.32, 173.54, 179.53, 180.19, 185.06, 192.17, 191.9, 196.52, 202.94, 199.75, 211.64, 235, 240.8, 254.72, 246.54, 245.35, 236.57, 253.3, 253.08, 281.48, 284.75, 278.57, 289.45, 320.18, 321.27, 309.29, 307.16, 313.56, 314.34, 335.97, 322, 334.55, 339.71, 318.58, 303.33, 312.9, 303.13, 308.7, 307.69, 290.93, 297.39, 318.49, 336.02, 339.32, 349.94, 398.04, 402.62, 388.91, 390.13, 364.37] },
      velocityScore: { '1D': 7.7, '1W': -32.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.8, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.33, IVEP: false, IGPT: 5.66, IVES: 4.16, ALAI: false, CHAT: 5.04, AIFD: 4.68, SPRX: false, AOTG: 3.84 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'TSM', name: 'TAIWAN SEMICONDUCTOR MANUFACTURING', easyScore: 5, avgWeight: 4.96, proScore: 2.48, coverage: 0.5,
      price: 432.86, weeklyPrices: [418.45, 435.63, 446.69, 436.69, 432.86], weeklyChange: 3.44, sortRank: 0, periodReturns: { '1M': 7.8, '6M': 47.8, '1Y': 113.9 },
      priceHistory: { '1W': [418.45, 435.63, 446.69, 436.69, 432.86], '1M': [401.61, 394.41, 419.5, 414.15, 411.68, 397.28, 399.8, 417.72, 404.35, 395.95, 392.61, 401.62, 407.15, 404.52, 412.32, 424.86, 418.45, 435.63, 446.69, 436.69, 432.86], '6M': [292.93, 304.85, 284.68, 302.84, 322.25, 331.77, 327.16, 338.34, 335.75, 361.91, 362.26, 387.73, 357.44, 347.09, 345.98, 343.25, 337.95, 365.9, 375.1, 387.44, 393.83, 419.5, 399.8, 401.62, 424.86, 432.86], '1Y': [202.4, 214.1, 213.5, 224.01, 234.8, 230.4, 240.4, 241.6, 241.62, 242.62, 241, 227.33, 238.27, 243.41, 259.33, 264.87, 273.36, 292.19, 280.66, 295.08, 290.73, 303.22, 289.24, 282.2, 277.5, 291.51, 294.72, 292.04, 288.95, 300.92, 327.43, 331.21, 327.16, 338.34, 335.75, 361.91, 362.26, 387.73, 357.44, 354.56, 339.57, 347.75, 341.49, 365.49, 363.35, 387.44, 393.83, 419.5, 399.8, 401.62, 424.86, 432.86] },
      velocityScore: { '1D': -2, '1W': -5.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.2T', pe: 36.8, revenueGrowth: 35, eps: 11.75, grossMargin: 62, dividendYield: 0.87,
      etfPresence: { AIS: false, ARTY: false, BAI: 4.24, IVEP: false, IGPT: false, IVES: 4.78, ALAI: 5.51, CHAT: false, AIFD: 3.18, SPRX: false, AOTG: 7.11 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 5, avgWeight: 4.41, proScore: 2.2, coverage: 0.5,
      price: 285.39, weeklyPrices: [205.00, 219.43, 290.79, 301.65, 285.39], weeklyChange: 39.21, sortRank: 0, periodReturns: { '1M': 74.4, '6M': 190.7, '1Y': 330.5 },
      priceHistory: { '1W': [205, 219.43, 290.79, 301.65, 285.39], '1M': [163.66, 168.75, 172.15, 160.01, 170.13, 164.5, 177.95, 182.58, 176.89, 168.93, 176.27, 186.8, 190.69, 196.33, 208.26, 204.83, 205, 219.43, 290.79, 301.65, 285.39], '6M': [98.19, 89.43, 84.47, 86.34, 90.23, 82.89, 79.8, 82.93, 75.54, 82.01, 79.09, 80.92, 78.09, 93.3, 90.79, 92.36, 99.05, 114.45, 134.6, 157.32, 156.57, 172.15, 177.95, 186.8, 204.83, 285.39], '1Y': [66.3, 68.24, 74.95, 79.97, 75.18, 72.71, 74.65, 74.04, 80.37, 75.85, 79.04, 71.21, 77.23, 63.33, 67.35, 74.26, 83.17, 86.22, 85.61, 87.95, 82.77, 88.57, 93.33, 87.52, 76.68, 89.4, 98.91, 84.43, 84.09, 85.76, 88.23, 83.05, 79.8, 82.93, 75.54, 82.01, 79.09, 80.92, 78.09, 90.44, 87.62, 98.45, 106.71, 119.93, 133.37, 157.32, 156.57, 172.15, 177.95, 186.8, 204.83, 285.39] },
      velocityScore: { '1D': -0.5, '1W': -9.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$250B', pe: 98.4, revenueGrowth: 28, eps: 2.9, grossMargin: 52, dividendYield: 0.08,
      etfPresence: { AIS: false, ARTY: 8.91, BAI: 1.43, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.82, AIFD: 6.35, SPRX: 3.53, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 4.07, proScore: 2.03, coverage: 0.5,
      price: 253.49, weeklyPrices: [270.64, 261.26, 256.52, 250.02, 253.49], weeklyChange: -6.34, sortRank: 0, periodReturns: { '1M': -6.8, '6M': 10.6, '1Y': 22.3 },
      priceHistory: { '1W': [270.64, 261.26, 256.52, 250.02, 253.49], '1M': [272.05, 273.55, 274.99, 271.17, 272.68, 265.82, 270.13, 267.22, 264.14, 264.86, 259.34, 265.01, 268.46, 266.32, 265.29, 274, 270.64, 261.26, 256.52, 250.02, 253.49], '6M': [229.11, 230.28, 226.76, 232.52, 233.06, 246.47, 231, 244.68, 238.62, 206.96, 204.79, 210.64, 216.82, 214.33, 215.2, 207.24, 208.27, 221.25, 248.5, 255.36, 263.04, 274.99, 270.13, 265.01, 274, 253.49], '1Y': [207.23, 213.2, 212.52, 217.12, 223.41, 225.02, 226.13, 232.23, 234.11, 223.13, 230.98, 221.95, 231.6, 232.33, 228.15, 231.48, 219.78, 219.51, 216.37, 213.04, 221.09, 222.86, 243.04, 237.58, 217.14, 233.22, 229.53, 226.19, 227.35, 232.07, 240.93, 242.6, 231, 244.68, 238.62, 206.96, 204.79, 210.64, 216.82, 212.65, 209.87, 211.71, 210.57, 233.65, 249.7, 255.36, 263.04, 274.99, 270.13, 265.01, 274, 253.49] },
      velocityScore: { '1D': 8, '1W': -9.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.7T', pe: 32.1, revenueGrowth: 17, eps: 7.9, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.19, ALAI: 5.68, CHAT: 2.97, AIFD: 3.39, SPRX: false, AOTG: 4.1 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 3.36, proScore: 1.68, coverage: 0.5,
      price: 634.25, weeklyPrices: [632.51, 600.47, 597.63, 622.98, 634.25], weeklyChange: 0.28, sortRank: 0, periodReturns: { '1M': 3.9, '6M': -4.1, '1Y': -7.8 },
      priceHistory: { '1W': [632.51, 600.47, 597.63, 622.98, 634.25], '1M': [610.41, 604.96, 612.88, 616.81, 609.63, 603, 616.63, 618.43, 614.23, 611.21, 602.61, 605.06, 607.38, 610.26, 612.34, 635.29, 632.51, 600.47, 597.63, 622.98, 634.25], '6M': [661.53, 652.71, 664.45, 663.29, 658.79, 641.97, 604.12, 672.97, 691.7, 670.72, 643.22, 653.69, 667.73, 654.07, 622.66, 592.92, 572.13, 612.42, 671.58, 674.72, 669.12, 612.88, 616.63, 605.06, 635.29, 634.25], '1Y': [687.95, 694.14, 695.77, 726.09, 719.01, 717.51, 704.28, 714.8, 773.44, 761.83, 782.13, 739.1, 751.11, 752.45, 755.59, 778.38, 743.75, 710.56, 705.3, 716.92, 734, 666.47, 618.94, 609.89, 589.15, 647.95, 673.42, 644.23, 658.77, 658.69, 660.62, 631.09, 604.12, 672.97, 691.7, 670.72, 643.22, 653.69, 667.73, 654.86, 615.68, 594.89, 579.23, 628.39, 676.87, 674.72, 669.12, 612.88, 616.63, 605.06, 635.29, 634.25] },
      velocityScore: { '1D': 17.5, '1W': -32.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: 23.1, revenueGrowth: 33, eps: 27.47, grossMargin: 82, dividendYield: 0.34,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: 4.67, IVES: 4.44, ALAI: 4.31, CHAT: 2.29, AIFD: false, SPRX: false, AOTG: 1.1 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'ANET', name: 'ARISTA NETWORKS INC', easyScore: 6, avgWeight: 2.52, proScore: 1.51, coverage: 0.6,
      price: 161.47, weeklyPrices: [159.47, 170.68, 175.33, 174.37, 161.47], weeklyChange: 1.26, sortRank: 0, periodReturns: { '1M': -6.5, '6M': 25.6, '1Y': 70.1 },
      priceHistory: { '1W': [159.47, 170.68, 175.33, 174.37, 161.47], '1M': [172.62, 170.22, 147.06, 141.75, 141.77, 142.54, 140.69, 147.81, 141.97, 141.71, 141.58, 140.49, 148.59, 154.03, 158.01, 155.27, 159.47, 170.68, 175.33, 174.37, 161.47], '6M': [128.55, 134.39, 124.62, 131.84, 137.19, 123.42, 127.52, 146.69, 139.39, 143.45, 139.54, 132.89, 134.83, 139.62, 133.07, 130.8, 122.78, 145.07, 154.33, 177.73, 168.68, 147.06, 140.69, 140.49, 155.27, 161.47], '1Y': [94.94, 94.21, 90.24, 101.59, 102.52, 108.57, 111.78, 114.04, 123.22, 139.28, 136.48, 132.03, 136.23, 142.85, 139.39, 149.61, 142.5, 145.5, 154.1, 143.1, 152.76, 158.44, 134.02, 130.3, 119.59, 130.68, 128.59, 124.76, 131.12, 134.15, 132.58, 129.93, 127.52, 146.69, 139.39, 143.45, 139.54, 132.89, 134.83, 138.23, 136.07, 135.01, 124.85, 146.05, 161.01, 177.73, 168.68, 147.06, 140.69, 140.49, 155.27, 161.47] },
      velocityScore: { '1D': 1.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$203B', pe: 55.5, revenueGrowth: 35, eps: 2.91, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 1.99, BAI: 1.43, IVEP: false, IGPT: false, IVES: false, ALAI: 1.04, CHAT: 2.41, AIFD: 4.9, SPRX: 3.37, AOTG: false },
      tonyNote: 'ARISTA NETWORKS INC appears in 6 of 10 AI & ML ETFs (60% coverage) with average weight 2.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, avgWeight: 3.64, proScore: 1.45, coverage: 0.4,
      price: 429.69, weeklyPrices: [450.24, 460.52, 441.31, 427.34, 429.69], weeklyChange: -4.56, sortRank: 0, periodReturns: { '1M': 3.9, '6M': -10.6, '1Y': -7.4 },
      priceHistory: { '1W': [450.24, 460.52, 441.31, 427.34, 429.69], '1M': [413.62, 411.38, 413.96, 420.77, 415.12, 407.77, 405.21, 409.43, 421.92, 423.54, 417.42, 421.06, 419.09, 418.57, 416.03, 426.99, 450.24, 460.52, 441.31, 427.34, 429.69], '6M': [480.84, 483.47, 483.98, 487.71, 472.85, 477.18, 454.52, 480.58, 411.21, 413.27, 399.6, 400.6, 405.2, 405.76, 399.41, 372.74, 370.17, 374.33, 411.22, 432.92, 424.46, 413.96, 405.21, 421.06, 426.99, 429.69], '1Y': [463.87, 472.62, 480.24, 497.45, 498.84, 503.32, 510.05, 510.88, 533.5, 520.84, 522.48, 504.24, 509.64, 495, 509.9, 517.93, 511.46, 517.35, 510.96, 513.58, 520.56, 525.76, 497.1, 503.29, 478.43, 492.01, 483.16, 478.53, 485.92, 487.1, 478.51, 470.67, 454.52, 480.58, 411.21, 413.27, 399.6, 400.6, 405.2, 404.88, 391.79, 371.04, 369.37, 373.07, 420.26, 432.92, 424.46, 413.96, 405.21, 421.06, 426.99, 429.69] },
      velocityScore: { '1D': -15.2, '1W': -24.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.2T', pe: 25.6, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 0.85,
      etfPresence: { AIS: false, ARTY: 1.69, BAI: false, IVEP: false, IGPT: false, IVES: 4.59, ALAI: 5.43, CHAT: 2.83, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 4, avgWeight: 3.58, proScore: 1.43, coverage: 0.4,
      price: 354.93, weeklyPrices: [342.85, 320.09, 355.76, 363.54, 354.93], weeklyChange: 3.52, sortRank: 0, periodReturns: { '1M': 76.4, '6M': 132.7, '1Y': 272.7 },
      priceHistory: { '1W': [342.85, 320.09, 355.76, 363.54, 354.93], '1M': [201.25, 215.69, 213.91, 195.65, 199.79, 204.42, 224.09, 228.64, 232.68, 215.58, 244.26, 287.48, 297.84, 306.88, 318.72, 349.17, 342.85, 320.09, 355.76, 363.54, 354.93], '6M': [152.51, 173.7, 145.88, 167.26, 167.11, 172.57, 183.75, 170.93, 158.52, 182.86, 129.58, 128.15, 113.77, 116.48, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 224.09, 287.48, 349.17, 354.93], '1Y': [95.22, 94.54, 99.53, 97.96, 90.8, 95.9, 102.13, 121.68, 136.73, 170.89, 190.69, 177.53, 189.15, 191.2, 229.5, 245.2, 197.78, 200.74, 206.21, 159.8, 163.64, 169.55, 162.83, 144.47, 139.29, 157.57, 161.23, 148.85, 164.4, 170.1, 161.01, 180.56, 183.75, 170.93, 158.52, 182.86, 129.58, 128.15, 113.77, 124.71, 126.34, 120.33, 106.33, 129.46, 170.81, 194.06, 196.85, 213.91, 224.09, 287.48, 349.17, 354.93] },
      velocityScore: { '1D': -4.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$61B', pe: 238.2, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 1.62, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 1.77, CHAT: 3.84, AIFD: false, SPRX: 7.1, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 4, avgWeight: 3.51, proScore: 1.41, coverage: 0.4,
      price: 879.99, weeklyPrices: [854.96, 905.00, 1029.15, 938.00, 879.99], weeklyChange: 2.93, sortRank: 0, periodReturns: { '1M': -9.9, '6M': 168.4, '1Y': 996.2 },
      priceHistory: { '1W': [854.96, 905, 1029.15, 938, 879.99], '1M': [976.18, 994.56, 944.28, 892.58, 903.8, 992.37, 1030.37, 1001.81, 970.7, 884.98, 890.09, 868.07, 964.5, 946.9, 910.81, 860.62, 854.96, 905, 1029.15, 938, 879.99], '6M': [327.85, 372.09, 337.13, 390.77, 357.05, 339.87, 356.83, 370.66, 435.1, 561.13, 594.26, 723.39, 680.8, 672, 649.56, 801.99, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 1030.37, 868.07, 860.62, 879.99], '1Y': [80.28, 82.36, 88.46, 94.71, 92.75, 92.99, 102.22, 102.85, 110.08, 111.13, 114.62, 117.43, 135.55, 149.46, 163.02, 168.73, 160.75, 163.81, 149.61, 164.77, 168.5, 200.13, 239.68, 226.86, 233.24, 325.16, 331.41, 324.35, 371.43, 372.61, 397.42, 361.33, 356.83, 370.66, 435.1, 561.13, 594.26, 723.39, 680.8, 672, 700.81, 777.17, 764.65, 894.13, 891.22, 873.6, 858.32, 944.28, 1030.37, 868.07, 860.62, 879.99] },
      velocityScore: { '1D': 13.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$68B', pe: 153.8, revenueGrowth: 90, eps: 5.72, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.86, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.04, AIFD: 6.55, SPRX: 3.61, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 4 of 10 AI & ML ETFs (40% coverage) with average weight 3.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ARM', name: 'ARM Holdings PLC Sponsored ADR', easyScore: 3, avgWeight: 4.7, proScore: 1.41, coverage: 0.3,
      price: 386.85, weeklyPrices: [353.29, 408.85, 402.71, 411.83, 386.85], weeklyChange: 9.5, sortRank: 0, periodReturns: { '1M': 90.3, '6M': 175.4, '1Y': 196.8 },
      priceHistory: { '1W': [353.29, 408.85, 402.71, 411.83, 386.85], '1M': [203.26, 208.84, 237.3, 213.31, 213.27, 207.92, 221.21, 228.5, 209.16, 215.12, 223.15, 256.73, 298.23, 306.51, 321.22, 335.27, 353.29, 408.85, 402.71, 411.83, 386.85], '6M': [140.49, 136.14, 113.51, 110.27, 116.11, 111.14, 107.17, 114.88, 104.55, 125.95, 127.24, 131.74, 124.11, 120.55, 127.31, 134.96, 151.28, 148.91, 159.34, 196.57, 201.69, 237.3, 221.21, 256.73, 335.27, 386.85], '1Y': [130.36, 140.38, 146.05, 158.15, 155.09, 145.94, 156.74, 159.99, 141.38, 135.57, 140.55, 133.28, 142.55, 138.17, 150.64, 142.91, 139.62, 152.64, 154.81, 165.61, 166.6, 165.45, 158.25, 140.31, 132.53, 135.56, 141.31, 130.89, 114.03, 110.51, 115.53, 107.84, 107.17, 114.88, 104.55, 125.95, 127.24, 131.74, 124.11, 120.1, 128.36, 157.07, 155.07, 149.79, 162.33, 196.57, 201.69, 237.3, 221.21, 256.73, 335.27, 386.85] },
      velocityScore: { '1D': 2.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$413B', pe: 449.8, revenueGrowth: 20, eps: 0.86, grossMargin: 98, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 0.64, CHAT: 4.66, AIFD: false, SPRX: 8.81, AOTG: false },
      tonyNote: 'Arm Holdings is held across Broad Tech and AI ETFs as the CPU architecture licensor embedded in every mobile device and increasingly in AI inference chips and data center CPUs. Revenue grew and the royalty model is high-margin; the weight score reflects consistent institutional positioning as the AI chip design ecosystem expands on Arm cores.',
    },
    {
      ticker: 'COHR', name: 'COHERENT CORP', easyScore: 3, avgWeight: 4.57, proScore: 1.37, coverage: 0.3,
      price: 397.47, weeklyPrices: [361.47, 362.90, 426.89, 417.43, 397.47], weeklyChange: 9.96, sortRank: 0, periodReturns: { '1M': 20.5, '6M': 124.1, '1Y': 386.9 },
      priceHistory: { '1W': [361.47, 362.9, 426.89, 417.43, 397.47], '1M': [329.89, 335.73, 344.67, 319.19, 335.26, 374.01, 403.71, 404.94, 382.45, 362.83, 353.63, 358.5, 378, 377.57, 381.35, 376.95, 361.47, 362.9, 426.89, 417.43, 397.47], '6M': [177.35, 198.5, 175.71, 191.72, 186.36, 185.18, 193.46, 214, 229.18, 228.37, 223.89, 267.9, 274.86, 260.64, 245.8, 272.33, 238.21, 281.79, 308.2, 350.47, 304.93, 344.67, 403.71, 358.5, 376.95, 397.47], '1Y': [81.63, 81.51, 82.29, 89.88, 90.9, 93.3, 99.6, 98.72, 107.6, 113.82, 91.65, 86.6, 95.2, 97.84, 102.99, 109.11, 106.99, 113.58, 111.1, 116.35, 121.52, 132.71, 159.3, 139.97, 135.61, 164.26, 181.79, 178.34, 185.83, 189.02, 194.11, 190.03, 193.46, 214, 229.18, 228.37, 223.89, 267.9, 274.86, 251.41, 257.21, 272.04, 247.8, 284.17, 328, 350.47, 304.93, 344.67, 403.71, 358.5, 376.95, 397.47] },
      velocityScore: { '1D': 1.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$78B', pe: 190.2, revenueGrowth: 21, eps: 2.09, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: 4.28, IGPT: false, IVES: false, ALAI: false, CHAT: 0.99, AIFD: false, SPRX: 8.43, AOTG: false },
      tonyNote: 'COHERENT CORP appears in 3 of 10 AI & ML ETFs (30% coverage) with average weight 4.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 4, avgWeight: 3.4, proScore: 1.36, coverage: 0.4,
      price: 226.1, weeklyPrices: [225.78, 248.15, 244.58, 230.33, 226.10], weeklyChange: 0.14, sortRank: 0, periodReturns: { '1M': 25.4, '6M': 5.5, '1Y': 34.5 },
      priceHistory: { '1W': [225.78, 248.15, 244.58, 230.33, 226.1], '1M': [180.29, 185.35, 194.03, 194.59, 195.95, 186.83, 189.76, 195.61, 192.95, 186.61, 181.46, 188.16, 189.77, 192.08, 193.06, 203.7, 225.78, 248.15, 244.58, 230.33, 226.1], '6M': [214.33, 198.85, 180.03, 197.99, 192.59, 204.68, 179.92, 174.9, 154.67, 159.89, 156.17, 147.89, 152.37, 149.4, 154.69, 147.09, 147.11, 143.66, 169.81, 187.5, 163.83, 194.03, 189.76, 188.16, 203.7, 226.1], '1Y': [168.1, 176.38, 210.87, 212.82, 237.32, 230.56, 245.45, 242.83, 253.77, 249.39, 244.96, 233.16, 240.32, 232.8, 292.18, 308.66, 283.46, 286.14, 292.96, 291.31, 280.07, 256.89, 243.8, 217.57, 210.69, 201.95, 217.58, 189.97, 191.97, 195.38, 193.75, 202.29, 179.92, 174.9, 154.67, 159.89, 156.17, 147.89, 152.37, 163.12, 152.9, 146.02, 145.23, 137.86, 178.34, 187.5, 163.83, 194.03, 189.76, 188.16, 203.7, 226.1] },
      velocityScore: { '1D': 6.3, '1W': -30.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$650B', pe: 40.6, revenueGrowth: 22, eps: 5.57, grossMargin: 67, dividendYield: 0.87,
      etfPresence: { AIS: false, ARTY: 4.17, BAI: false, IVEP: false, IGPT: false, IVES: 4.29, ALAI: false, CHAT: 1.64, AIFD: false, SPRX: false, AOTG: 3.49 },
      tonyNote: 'Oracle lands in 3 AI ETFs on the strength of its cloud database and AI infrastructure contracts. Revenue grew 22%, 67% gross margin, P/E of 40x. The 17.5% weekly return following a major earnings beat shows how quickly sentiment can reprice; the weight score at 2.04% is still modest, meaning ETF managers have started building positions but conviction is not yet deep.',
    },
    {
      ticker: 'WDC', name: 'WESTERN DIGITAL CORP', easyScore: 5, avgWeight: 2.46, proScore: 1.23, coverage: 0.5,
      price: 587.85, weeklyPrices: [531.21, 546.20, 563.10, 594.11, 587.85], weeklyChange: 10.66, sortRank: 0, periodReturns: { '1M': 32.9, '6M': 265.1, '1Y': 980 },
      priceHistory: { '1W': [531.21, 546.2, 563.1, 594.11, 587.85], '1M': [442.36, 465.26, 483.15, 463.91, 480, 488.74, 494.09, 489.15, 482.02, 458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 531.18, 531.21, 546.2, 563.1, 594.11, 587.85], '6M': [161, 187.2, 175.01, 181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 459.62, 531.18, 587.85], '1Y': [54.43, 55.67, 59.19, 63.51, 66.08, 66.14, 68, 69.02, 78.69, 74.44, 76.24, 74.66, 82.04, 92.04, 97.66, 106.63, 106.88, 131.31, 115.42, 126.2, 125.72, 138.13, 163.6, 157.16, 140.23, 163.33, 168.89, 176.34, 181.08, 179.68, 219.38, 214, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 268.81, 304.9, 296.14, 297.73, 337.88, 361.69, 389.1, 412.76, 483.15, 494.09, 459.62, 531.18, 587.85] },
      velocityScore: { '1D': 7.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$203B', pe: 35.2, revenueGrowth: 46, eps: 16.69, grossMargin: 45, dividendYield: 0.1,
      etfPresence: { AIS: false, ARTY: 2.73, BAI: 3.03, IVEP: false, IGPT: false, IVES: false, ALAI: 4.7, CHAT: 1.2, AIFD: false, SPRX: false, AOTG: 0.64 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'NBIS', name: 'NEBIUS GROUP NV', easyScore: 4, avgWeight: 2.88, proScore: 1.15, coverage: 0.4,
      price: 239.2, weeklyPrices: [231.09, 264.51, 260.58, 251.68, 239.20], weeklyChange: 3.51, sortRank: 0, periodReturns: { '1M': 35.6, '6M': 132.7, '1Y': 507.3 },
      priceHistory: { '1W': [231.09, 264.51, 260.58, 251.68, 239.2], '1M': [176.42, 175.92, 195.09, 184.77, 177.05, 179.11, 207.27, 221.15, 219.94, 199.86, 197.73, 191.82, 219.93, 214.77, 208.06, 226.34, 231.09, 264.51, 260.58, 251.68, 239.2], '6M': [102.8, 94.28, 78.09, 87.59, 92.83, 107.33, 99.29, 97.87, 89.95, 91.79, 101.8, 106.12, 97.78, 96.43, 116.33, 114.91, 103.76, 125, 166.77, 156.14, 141.19, 195.09, 207.27, 191.82, 226.34, 239.2], '1Y': [39.39, 50.57, 48.32, 52.6, 50.25, 44.3, 52.79, 52.16, 54.43, 65.31, 68.46, 66.18, 72.04, 65.47, 90.41, 99.31, 107.7, 127.98, 129.58, 113.44, 106.16, 124.18, 109.44, 88.63, 84.64, 94.87, 98.04, 87.69, 89.46, 86.04, 100.24, 105.43, 99.29, 97.87, 89.95, 91.79, 101.8, 106.12, 97.78, 112, 118.56, 115.09, 101.95, 136.33, 165.34, 156.14, 141.19, 195.09, 207.27, 191.82, 226.34, 239.2] },
      velocityScore: { '1D': 7.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$61B', pe: 92.4, revenueGrowth: 684, eps: 2.59, grossMargin: 72, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 2.52, ALAI: 4.4, CHAT: 2.84, AIFD: 1.77, SPRX: false, AOTG: false },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CLASS A', easyScore: 4, avgWeight: 2.77, proScore: 1.11, coverage: 0.4,
      price: 314.32, weeklyPrices: [315.71, 323.39, 334.49, 331.44, 314.32], weeklyChange: -0.44, sortRank: 0, periodReturns: { '1M': -5, '6M': 72.2, '1Y': 178.5 },
      priceHistory: { '1W': [315.71, 323.39, 334.49, 331.44, 314.32], '1M': [330.97, 341.02, 358.92, 340.01, 339.97, 367.13, 369.99, 376.23, 370.94, 339.73, 322.63, 315.67, 323.4, 327.46, 323.91, 314.18, 315.71, 323.39, 334.49, 331.44, 314.32], '6M': [182.54, 178.66, 154.39, 167.58, 173.95, 170.03, 175.18, 189.21, 190.15, 199.62, 243.21, 262.19, 251.28, 270.06, 268.41, 270.89, 250.58, 281.03, 301.16, 305.14, 306.18, 358.92, 369.99, 315.67, 314.18, 314.32], '1Y': [112.85, 110.59, 119.08, 123.8, 127.84, 123.3, 129.06, 130.87, 145.6, 139.39, 132.52, 126.58, 134.23, 124, 134.84, 143.6, 138.62, 160.2, 169.01, 174, 183.2, 193.76, 183.02, 163.64, 159.61, 179.73, 189.02, 161.27, 159.82, 165.62, 174.95, 172.72, 175.18, 189.21, 190.15, 199.62, 243.21, 262.19, 251.28, 268.26, 264.71, 276.16, 259.37, 287.64, 294.13, 305.14, 306.18, 358.92, 369.99, 315.67, 314.18, 314.32] },
      velocityScore: { '1D': -17.8, '1W': -45.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$121B', pe: 79, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: false, ARTY: false, BAI: 1.98, IVEP: 4.22, IGPT: false, IVES: false, ALAI: false, CHAT: 0.85, AIFD: 4.04, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 4, avgWeight: 2.46, proScore: 0.98, coverage: 0.4,
      price: 423.6, weeklyPrices: [435.79, 415.88, 423.74, 423.70, 423.60], weeklyChange: -2.8, sortRank: 0, periodReturns: { '1M': 7.9, '6M': -6.8, '1Y': 27.6 },
      priceHistory: { '1W': [435.79, 415.88, 423.74, 423.7, 423.6], '1M': [392.51, 389.37, 398.73, 411.79, 428.35, 433.45, 445.27, 443.3, 422.24, 409.99, 404.11, 417.26, 417.85, 426.01, 433.59, 442.1, 435.79, 415.88, 423.74, 423.7, 423.6], '6M': [454.53, 446.89, 483.37, 475.19, 451.67, 448.96, 419.25, 430.9, 421.96, 425.21, 411.32, 417.4, 405.94, 399.24, 399.27, 383.03, 371.75, 343.25, 391.95, 387.51, 372.8, 398.73, 445.27, 417.26, 442.1, 423.6], '1Y': [332.05, 326.43, 322.05, 325.78, 315.35, 313.51, 329.65, 305.3, 308.27, 322.27, 335.58, 320.11, 345.98, 350.84, 395.94, 426.07, 440.4, 429.83, 413.49, 439.31, 448.98, 440.1, 445.91, 401.99, 395.23, 430.17, 455, 458.96, 481.2, 459.64, 432.96, 447.2, 419.25, 430.9, 421.96, 425.21, 411.32, 417.4, 405.94, 407.82, 392.78, 385.95, 381.26, 345.62, 388.9, 387.51, 372.8, 398.73, 445.27, 417.26, 442.1, 423.6] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$1.6T', pe: 385.1, revenueGrowth: 16, eps: 1.1, grossMargin: 19, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 1.22, IVEP: false, IGPT: false, IVES: 4.31, ALAI: 2.43, CHAT: false, AIFD: 1.88, SPRX: false, AOTG: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 6.47, proScore: 6.47, coverage: 1,
      price: 1011.75, weeklyPrices: [971.00, 1035.50, 1064.10, 1079.57, 1011.75], weeklyChange: 4.2, sortRank: 0, periodReturns: { '1M': 75.5, '6M': 346.4, '1Y': 879.9 },
      priceHistory: { '1W': [971, 1035.5, 1064.1, 1079.57, 1011.75], '1M': [576.45, 640.2, 666.59, 646.63, 746.81, 766.58, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 923.52, 971, 1035.5, 1064.1, 1079.57, 1011.75], '6M': [226.65, 258.46, 248.55, 284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 1011.75], '1Y': [103.25, 116.03, 121.82, 126, 122.29, 124.53, 114.39, 111.73, 109.14, 111.87, 125.29, 115.79, 122, 131.37, 157.23, 162.73, 157.27, 187.83, 181.6, 202.38, 206.71, 224.01, 238.33, 236.95, 201.37, 236.48, 237.22, 241.14, 265.92, 294.37, 343.43, 338.13, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.73, 382.09, 367.85, 421.51, 457.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 1011.75] },
      velocityScore: { '1D': -7.4, '1W': -2.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 47.8, revenueGrowth: 196, eps: 21.16, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { SOXX: 11.94, PSI: 6.01, XSD: 3.62, DRAM: 4.3 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 6.1, proScore: 4.57, coverage: 0.75,
      price: 513.68, weeklyPrices: [516.10, 510.13, 521.54, 542.52, 513.68], weeklyChange: -0.47, sortRank: 0, periodReturns: { '1M': 50.4, '6M': 137.8, '1Y': 333.2 },
      priceHistory: { '1W': [516.1, 510.13, 521.54, 542.52, 513.68], '1M': [341.54, 355.26, 421.39, 408.46, 455.19, 448.29, 445.5, 449.7, 424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 518.09, 516.1, 510.13, 521.54, 542.52, 513.68], '6M': [215.98, 221.43, 201.06, 214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 518.09, 513.68], '1Y': [118.58, 121.14, 126.79, 143.68, 137.91, 146.42, 156.99, 162.12, 176.31, 172.4, 180.95, 163.71, 168.58, 151.14, 158.57, 157.39, 159.46, 164.67, 214.9, 233.08, 234.99, 254.84, 237.7, 247.96, 206.02, 217.53, 217.97, 210.78, 213.43, 215.61, 214.35, 220.97, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 204.83, 199.46, 220.27, 210.21, 236.64, 278.26, 303.46, 337.11, 421.39, 445.5, 447.58, 518.09, 513.68] },
      velocityScore: { '1D': -9.7, '1W': -21.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$838B', pe: 172.4, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 9.22, PSI: 5.36, XSD: 3.71, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.49, proScore: 3.37, coverage: 0.75,
      price: 111.02, weeklyPrices: [114.68, 109.33, 107.93, 112.71, 111.02], weeklyChange: -3.19, sortRank: 0, periodReturns: { '1M': 15.9, '6M': 174.1, '1Y': 448.2 },
      priceHistory: { '1W': [114.68, 109.33, 107.93, 112.71, 111.02], '1M': [95.78, 108.15, 113.01, 109.62, 124.92, 120.61, 120.29, 115.93, 108.77, 108.17, 110.8, 118.96, 118.5, 119.84, 123.52, 120.89, 114.68, 109.33, 107.93, 112.71, 111.02], '6M': [40.5, 39.51, 36.28, 36.2, 39.37, 44.06, 48.56, 43.93, 49.25, 47.13, 45.46, 46.88, 45.58, 46.78, 44.06, 44.06, 44.13, 58.95, 64.94, 65.27, 94.75, 113.01, 120.29, 118.96, 120.89, 111.02], '1Y': [20.25, 20.68, 21.49, 22.5, 22.49, 23.43, 23.1, 22.63, 19.8, 19.77, 23.86, 23.5, 24.93, 24.49, 24.08, 29.58, 35.5, 36.83, 36.37, 37.01, 38.16, 40.16, 37.24, 35.91, 33.62, 40.56, 41.41, 37.81, 36.82, 36.68, 40.04, 47.29, 48.56, 43.93, 49.25, 47.13, 45.46, 46.88, 45.58, 47.98, 45.03, 47.18, 48.03, 61.72, 68.5, 65.27, 94.75, 113.01, 120.29, 118.96, 120.89, 111.02] },
      velocityScore: { '1D': 55.3, '1W': -8.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$558B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 5.64, PSI: 4.54, XSD: 3.3, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 6.55, proScore: 3.28, coverage: 0.5,
      price: 285.39, weeklyPrices: [205.00, 219.43, 290.79, 301.65, 285.39], weeklyChange: 39.21, sortRank: 0, periodReturns: { '1M': 74.4, '6M': 190.7, '1Y': 330.5 },
      priceHistory: { '1W': [205, 219.43, 290.79, 301.65, 285.39], '1M': [163.66, 168.75, 172.15, 160.01, 170.13, 164.5, 177.95, 182.58, 176.89, 168.93, 176.27, 186.8, 190.69, 196.33, 208.26, 204.83, 205, 219.43, 290.79, 301.65, 285.39], '6M': [98.19, 89.43, 84.47, 86.34, 90.23, 82.89, 79.8, 82.93, 75.54, 82.01, 79.09, 80.92, 78.09, 93.3, 90.79, 92.36, 99.05, 114.45, 134.6, 157.32, 156.57, 172.15, 177.95, 186.8, 204.83, 285.39], '1Y': [66.3, 68.24, 74.95, 79.97, 75.18, 72.71, 74.65, 74.04, 80.37, 75.85, 79.04, 71.21, 77.23, 63.33, 67.35, 74.26, 83.17, 86.22, 85.61, 87.95, 82.77, 88.57, 93.33, 87.52, 76.68, 89.4, 98.91, 84.43, 84.09, 85.76, 88.23, 83.05, 79.8, 82.93, 75.54, 82.01, 79.09, 80.92, 78.09, 90.44, 87.62, 98.45, 106.71, 119.93, 133.37, 157.32, 156.57, 172.15, 177.95, 186.8, 204.83, 285.39] },
      velocityScore: { '1D': 2.2, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$250B', pe: 98.4, revenueGrowth: 28, eps: 2.9, grossMargin: 52, dividendYield: 0.08,
      etfPresence: { SOXX: 8.42, PSI: false, XSD: 4.68, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 4.04, proScore: 3.03, coverage: 0.75,
      price: 214.35, weeklyPrices: [211.14, 224.36, 222.82, 214.75, 214.35], weeklyChange: 1.52, sortRank: 0, periodReturns: { '1M': 8, '6M': 16.9, '1Y': 51 },
      priceHistory: { '1W': [211.14, 224.36, 222.82, 214.75, 214.35], '1M': [198.48, 196.5, 207.83, 211.5, 215.2, 220.78, 225.83, 235.74, 225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 214.25, 211.14, 224.36, 222.82, 214.75, 214.35], '6M': [183.38, 180.93, 174.14, 190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 214.25, 214.35], '1Y': [141.92, 142.83, 145.48, 155.02, 159.34, 164.92, 172.41, 173.74, 177.87, 180.77, 182.02, 174.98, 180.17, 167.02, 177.82, 176.67, 178.19, 187.62, 183.16, 183.22, 182.16, 202.89, 188.08, 186.86, 180.64, 177, 182.41, 175.02, 180.99, 188.22, 187.24, 185.81, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 186.03, 180.4, 178.68, 175.75, 183.91, 198.35, 202.5, 209.25, 207.83, 225.83, 223.47, 214.25, 214.35] },
      velocityScore: { '1D': 8.6, '1W': -5.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.2T', pe: 32.8, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { SOXX: 5.53, PSI: 4.98, XSD: 1.62, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 5.03, proScore: 2.52, coverage: 0.5,
      price: 483.38, weeklyPrices: [450.06, 458.17, 490.05, 500.77, 483.38], weeklyChange: 7.4, sortRank: 0, periodReturns: { '1M': 23.5, '6M': 79.4, '1Y': 198.5 },
      priceHistory: { '1W': [450.06, 458.17, 490.05, 500.77, 483.38], '1M': [391.38, 410.82, 428.62, 410.64, 435.44, 431.2, 436.61, 440.56, 436.62, 413.57, 406.91, 426.85, 427.36, 432.16, 454.89, 449.68, 450.06, 458.17, 490.05, 500.77, 483.38], '6M': [269.44, 270.11, 253.5, 261.9, 284.32, 307.24, 318.23, 332.71, 318.67, 329.07, 369.3, 394.95, 357.76, 345.88, 352.46, 373.99, 341.79, 385.72, 394.26, 403.48, 382.59, 428.62, 436.61, 426.85, 449.68, 483.38], '1Y': [161.93, 172.79, 172.84, 183.52, 191.05, 197.93, 190.44, 188.12, 180.06, 183.15, 188.24, 159.84, 165.27, 162.75, 167.8, 190.1, 203.92, 217.53, 209.95, 224.99, 228.47, 232.55, 233.53, 223.23, 220.23, 252.25, 268, 259.21, 256.41, 263.05, 296.01, 304.87, 318.23, 332.71, 318.67, 329.07, 369.3, 394.95, 357.76, 351.07, 349.47, 369.34, 353.8, 397.81, 389.9, 403.48, 382.59, 428.62, 436.61, 426.85, 449.68, 483.38] },
      velocityScore: { '1D': 17.2, '1W': -13.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$384B', pe: 45.5, revenueGrowth: 11, eps: 10.62, grossMargin: 49, dividendYield: 0.42,
      etfPresence: { SOXX: 4.58, PSI: 5.48, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.31, proScore: 2.48, coverage: 0.75,
      price: 430.04, weeklyPrices: [413.85, 402.69, 423.20, 437.67, 430.04], weeklyChange: 3.91, sortRank: 0, periodReturns: { '1M': 8.3, '6M': 55.1, '1Y': 96.8 },
      priceHistory: { '1W': [413.85, 402.69, 423.2, 437.67, 430.04], '1M': [397.02, 404.77, 415.63, 408.52, 416.52, 419.65, 432.39, 426.79, 417.49, 418.58, 414.31, 398.05, 384.21, 397.07, 419.94, 419.01, 413.85, 402.69, 423.2, 437.67, 430.04], '6M': [277.26, 283.39, 274.92, 276.84, 277.29, 293.86, 295.67, 303.83, 311.29, 325.16, 346.37, 360.8, 341.51, 318.81, 313.66, 321.83, 318.14, 346.21, 347.94, 381.42, 389.31, 415.63, 432.39, 398.05, 419.01, 430.04], '1Y': [218.5, 232.54, 229.65, 237.3, 245.68, 244.68, 241.85, 226.37, 224.63, 223.12, 236.21, 246.95, 254.25, 247.07, 245.21, 245.33, 247.56, 241.99, 225.32, 242.87, 243.29, 232.9, 232.88, 237.53, 225.2, 265.34, 281.29, 279.32, 274.44, 275.63, 292.94, 296.21, 295.67, 303.83, 311.29, 325.16, 346.37, 360.8, 341.51, 319.22, 308.59, 322.03, 320.58, 351.36, 353.8, 381.42, 389.31, 415.63, 432.39, 398.05, 419.01, 430.04] },
      velocityScore: { '1D': 113.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$209B', pe: 63.8, revenueGrowth: 37, eps: 6.74, grossMargin: 64, dividendYield: 1.01,
      etfPresence: { SOXX: 2.81, PSI: 5.2, XSD: 1.92, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 4.4, proScore: 2.2, coverage: 0.5,
      price: 409.17, weeklyPrices: [446.77, 459.97, 481.57, 479.23, 409.17], weeklyChange: -8.42, sortRank: 0, periodReturns: { '1M': -1.8, '6M': 7.4, '1Y': 56.7 },
      priceHistory: { '1W': [446.77, 459.97, 481.57, 479.23, 409.17], '1M': [416.5, 427.36, 425.44, 412.56, 430, 419.3, 416.79, 439.79, 425.19, 420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 426.58, 446.77, 459.97, 481.57, 479.23, 409.17], '6M': [381.03, 406.37, 329.88, 352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 417.76, 426.58, 409.17], '1Y': [261.08, 252.91, 251.26, 270.17, 275.18, 274.38, 283.34, 288.71, 293.7, 303.76, 311.23, 289.6, 308.65, 334.89, 359.87, 344.94, 334.53, 338.37, 324.63, 349.33, 344.29, 376.47, 355.59, 339.98, 346.82, 402.96, 390.24, 359.93, 340.36, 349.39, 343.77, 354.61, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 341.57, 315.93, 318.81, 313.49, 354.91, 398.47, 422.65, 405.45, 425.44, 416.79, 417.76, 426.58, 409.17] },
      velocityScore: { '1D': -35.3, '1W': -38.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.9T', pe: 68.3, revenueGrowth: 30, eps: 5.99, grossMargin: 77, dividendYield: 0.54,
      etfPresence: { SOXX: 6.84, PSI: false, XSD: 1.97, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 4.33, proScore: 2.16, coverage: 0.5,
      price: 331.06, weeklyPrices: [318.18, 317.12, 334.41, 343.71, 331.06], weeklyChange: 4.05, sortRank: 0, periodReturns: { '1M': 28, '6M': 110.7, '1Y': 290.5 },
      priceHistory: { '1W': [318.18, 317.12, 334.41, 343.71, 331.06], '1M': [258.57, 275.8, 297.17, 286.52, 294.05, 289.24, 295.44, 299.15, 284.72, 277.96, 273.38, 292.09, 302.24, 305.35, 322.68, 318, 318.18, 317.12, 334.41, 343.71, 331.06], '6M': [157.09, 168.71, 164.7, 178.07, 194.76, 220.4, 222.41, 238.46, 230.1, 226.61, 240.09, 249.48, 222.99, 215.23, 226.47, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 295.44, 292.09, 318, 331.06], '1Y': [84.77, 90.95, 92.24, 96.84, 98.81, 101.73, 100.66, 97.78, 94.84, 99.15, 107.38, 98.41, 104.09, 102.95, 116.96, 126.92, 128.33, 145.81, 131.37, 141.51, 147.54, 161.01, 162.19, 153.32, 139.59, 156, 158.7, 160.52, 172.27, 175.87, 206.96, 214.38, 222.41, 238.46, 230.1, 226.61, 240.09, 249.48, 222.99, 218.87, 224.71, 233.45, 222.01, 258.76, 260.96, 265.55, 248.75, 297.17, 295.44, 292.09, 318, 331.06] },
      velocityScore: { '1D': 13.7, '1W': -18.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$414B', pe: 62.6, revenueGrowth: 24, eps: 5.29, grossMargin: 50, dividendYield: 0.3,
      etfPresence: { SOXX: 3.35, PSI: 5.3, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 4.22, proScore: 2.11, coverage: 0.5,
      price: 2070.5, weeklyPrices: [1921.71, 1940.04, 2045.20, 2125.11, 2070.50], weeklyChange: 7.74, sortRank: 0, periodReturns: { '1M': 20.8, '6M': 71.4, '1Y': 164.7 },
      priceHistory: { '1W': [1921.71, 1940.04, 2045.2, 2125.11, 2070.5], '1M': [1713.32, 1732.9, 1816.29, 1763.25, 1869.19, 1811.35, 1849.71, 1892.94, 1804.32, 1756.45, 1740.58, 1829.47, 1842.18, 1888.38, 2011.39, 1927.63, 1921.71, 1940.04, 2045.2, 2125.11, 2070.5], '6M': [1208.08, 1246.18, 1222.39, 1279.6, 1352.45, 1428.17, 1486.18, 1616.33, 1355.54, 1430.84, 1480.3, 1546.68, 1475.91, 1452.94, 1481.35, 1566.19, 1472.41, 1672.34, 1748.11, 1812.06, 1816.21, 1816.29, 1849.71, 1829.47, 1927.63, 2070.5], '1Y': [782.09, 872, 871.16, 902.94, 924.58, 924.58, 931.12, 904.18, 879.03, 912.06, 955.41, 872.39, 894, 905.09, 964.02, 1044.81, 1064.29, 1101.55, 982.75, 1106.66, 1159, 1214.41, 1206.4, 1161.72, 1102.45, 1175.47, 1214.46, 1193.92, 1245.67, 1260.39, 1395, 1441.82, 1486.18, 1616.33, 1355.54, 1430.84, 1480.3, 1546.68, 1475.91, 1465, 1482.36, 1543.82, 1519.84, 1727.26, 1734.85, 1812.06, 1816.21, 1816.29, 1849.71, 1829.47, 1927.63, 2070.5] },
      velocityScore: { '1D': 14.7, '1W': -18.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$270B', pe: 58.7, revenueGrowth: 12, eps: 35.28, grossMargin: 61, dividendYield: 0.43,
      etfPresence: { SOXX: 3.18, PSI: 5.26, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 3.31, proScore: 1.65, coverage: 0.5,
      price: 245.6, weeklyPrices: [251.02, 228.99, 240.84, 250.01, 245.60], weeklyChange: -2.16, sortRank: 0, periodReturns: { '1M': 45.9, '6M': 40.9, '1Y': 64.8 },
      priceHistory: { '1W': [251.02, 228.99, 240.84, 250.01, 245.6], '1M': [168.38, 186.55, 192.57, 202.55, 219.09, 210.31, 213.17, 200.08, 201.49, 203.64, 195.61, 202.51, 213.41, 238.16, 248.82, 243.29, 251.02, 228.99, 240.84, 250.01, 245.6], '6M': [174.35, 181.27, 174.19, 174.81, 176.31, 169.27, 154.07, 153.04, 147.18, 140.09, 143.24, 145.82, 139.51, 135.2, 131.59, 128.67, 128.78, 127.51, 133.05, 136.07, 156, 192.57, 213.17, 202.51, 243.29, 245.6], '1Y': [149.05, 159.48, 153.63, 158.19, 162.21, 157.46, 154.8, 158.84, 146.76, 145.9, 158.09, 154.13, 160.8, 159.84, 161.83, 166.85, 169.2, 169.18, 153.59, 163.45, 170.03, 177.26, 173.2, 174.5, 159.59, 168.09, 174.81, 178.29, 175.25, 173.43, 182.45, 165.29, 154.07, 153.04, 147.18, 140.09, 143.24, 145.82, 139.51, 134.12, 130.47, 130.35, 127.28, 127.75, 134.47, 136.07, 156, 192.57, 213.17, 202.51, 243.29, 245.6] },
      velocityScore: { '1D': 1.9, '1W': -29.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$259B', pe: 26.4, revenueGrowth: -4, eps: 9.3, grossMargin: 55, dividendYield: 1.47,
      etfPresence: { SOXX: 4.01, PSI: false, XSD: 2.6, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 3.21, proScore: 1.61, coverage: 0.5,
      price: 354.93, weeklyPrices: [342.85, 320.09, 355.76, 363.54, 354.93], weeklyChange: 3.52, sortRank: 0, periodReturns: { '1M': 76.4, '6M': 132.7, '1Y': 272.7 },
      priceHistory: { '1W': [342.85, 320.09, 355.76, 363.54, 354.93], '1M': [201.25, 215.69, 213.91, 195.65, 199.79, 204.42, 224.09, 228.64, 232.68, 215.58, 244.26, 287.48, 297.84, 306.88, 318.72, 349.17, 342.85, 320.09, 355.76, 363.54, 354.93], '6M': [152.51, 173.7, 145.88, 167.26, 167.11, 172.57, 183.75, 170.93, 158.52, 182.86, 129.58, 128.15, 113.77, 116.48, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 224.09, 287.48, 349.17, 354.93], '1Y': [95.22, 94.54, 99.53, 97.96, 90.8, 95.9, 102.13, 121.68, 136.73, 170.89, 190.69, 177.53, 189.15, 191.2, 229.5, 245.2, 197.78, 200.74, 206.21, 159.8, 163.64, 169.55, 162.83, 144.47, 139.29, 157.57, 161.23, 148.85, 164.4, 170.1, 161.01, 180.56, 183.75, 170.93, 158.52, 182.86, 129.58, 128.15, 113.77, 124.71, 126.34, 120.33, 106.33, 129.46, 170.81, 194.06, 196.85, 213.91, 224.09, 287.48, 349.17, 354.93] },
      velocityScore: { '1D': 0.6, '1W': -25.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$61B', pe: 238.2, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.33, PSI: false, XSD: 4.09, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'MXL', name: 'MAXLINEAR INC', easyScore: 1, avgWeight: 5.79, proScore: 1.45, coverage: 0.25,
      price: 92.84, weeklyPrices: [92.93, 86.23, 88.76, 91.39, 92.84], weeklyChange: -0.09, sortRank: 0, periodReturns: { '1M': 18.8, '6M': 407.1, '1Y': 660.4 },
      priceHistory: { '1W': [92.93, 86.23, 88.76, 91.39, 92.84], '1M': [78.12, 81.68, 81.23, 82.37, 99.83, 91.93, 87.73, 88.78, 92.34, 87.46, 94.86, 96.77, 99.67, 99.16, 96.12, 97.76, 92.93, 86.23, 88.76, 91.39, 92.84], '6M': [18.31, 18.57, 17.32, 17.73, 18.13, 18.42, 19.37, 18.84, 16.94, 18.86, 18.47, 18.64, 17.42, 16.2, 16.81, 17.64, 17.39, 19.14, 22.01, 33.89, 67.52, 81.23, 87.73, 96.77, 97.76, 92.84], '1Y': [12.21, 12.43, 13.11, 14.32, 14.79, 14.94, 16.2, 17.25, 15.82, 15.31, 15.54, 15.15, 16.76, 15.63, 15.75, 16.19, 16.09, 16.45, 14.33, 16.97, 17.52, 15.25, 14.82, 13.78, 13.05, 15.57, 18.82, 17.41, 17.63, 17.58, 19.57, 18.34, 19.37, 18.84, 16.94, 18.86, 18.47, 18.64, 17.42, 16.9, 16.46, 17.8, 17.69, 19.84, 23.35, 33.89, 67.52, 81.23, 87.73, 96.77, 97.76, 92.84] },
      velocityScore: { '1D': -58.6, '1W': -74.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$8B', pe: null, revenueGrowth: 43, eps: -1.52, grossMargin: 57, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: 5.79, DRAM: false },
      tonyNote: 'MaxLinear holds the highest average weight in the Semiconductor theme at 7.71% across 2 ETFs. Revenue grew 43%, 57% gross margin, but EPS is negative at -$1.52 and the market cap is only $8B. The 716% 1-year return is an extreme recovery from the 2023 inventory correction lows; the two ETFs holding it are making a concentrated bet on a return to profitability in the analog semiconductor cycle.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 2.82, proScore: 1.41, coverage: 0.5,
      price: 127.77, weeklyPrices: [120.62, 120.92, 128.64, 133.93, 127.77], weeklyChange: 5.93, sortRank: 0, periodReturns: { '1M': 25.2, '6M': 133.2, '1Y': 154.1 },
      priceHistory: { '1W': [120.62, 120.92, 128.64, 133.93, 127.77], '1M': [102.04, 102.67, 105.77, 100.61, 103.2, 104.11, 115.71, 118.37, 113.11, 109.43, 106.02, 110.21, 109.61, 116.2, 127, 123.77, 120.62, 120.92, 128.64, 133.93, 127.77], '6M': [54.79, 55.97, 54.34, 54.93, 58.69, 58.75, 60.06, 62.63, 59.43, 67.38, 70.66, 69.68, 62.53, 59.59, 60.98, 62.34, 61.92, 68.38, 72.43, 88.99, 98.86, 105.77, 115.71, 110.21, 123.77, 127.77], '1Y': [50.28, 51.78, 52.26, 53.65, 56.6, 59.73, 60.72, 55.44, 56.36, 47.59, 51.62, 48.81, 50.78, 49.11, 48.26, 51.07, 50.16, 49.27, 45.74, 52.53, 51.78, 50.85, 48.8, 48.13, 44.9, 50.24, 54.74, 54.96, 55.21, 54.02, 61.76, 59.41, 60.06, 62.63, 59.43, 67.38, 70.66, 69.68, 62.53, 59.24, 60.46, 63.1, 62.2, 68.49, 79.93, 88.99, 98.86, 105.77, 115.71, 110.21, 123.77, 127.77] },
      velocityScore: { '1D': 2.2, '1W': -28.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$50B', pe: 93.3, revenueGrowth: 5, eps: 1.37, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.48, PSI: false, XSD: 3.17, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.79, proScore: 1.39, coverage: 0.5,
      price: 1641.97, weeklyPrices: [1566.21, 1542.39, 1624.99, 1689.89, 1641.97], weeklyChange: 4.84, sortRank: 0, periodReturns: { '1M': 4.4, '6M': 72.3, '1Y': 136.3 },
      priceHistory: { '1W': [1566.21, 1542.39, 1624.99, 1689.89, 1641.97], '1M': [1573.3, 1588.12, 1652.35, 1575.96, 1600.84, 1599.52, 1650.35, 1613.97, 1550.02, 1486.33, 1468.11, 1553.27, 1561.25, 1589.81, 1662.98, 1633.17, 1566.21, 1542.39, 1624.99, 1689.89, 1641.97], '6M': [952.74, 981.48, 929.48, 946.32, 955.03, 967.16, 1034.49, 1095.49, 1164.83, 1142.02, 1188.32, 1231.95, 1099.02, 1055.82, 1066.66, 1101.59, 1093.35, 1312.94, 1353, 1522.04, 1526.84, 1652.35, 1650.35, 1553.27, 1633.17, 1641.97], '1Y': [694.75, 720.83, 693.24, 735.17, 758.64, 736.06, 725.24, 713, 711.24, 797.94, 848.81, 820.74, 858.46, 865.86, 834.14, 916.36, 887.55, 918.83, 904.44, 1004.65, 1070.8, 1087.56, 958.07, 924.29, 857.19, 928.17, 963.28, 946.51, 937.11, 930.04, 1005.38, 983.28, 1034.49, 1095.49, 1164.83, 1142.02, 1188.32, 1231.95, 1099.02, 1071.09, 1075.29, 1118.66, 1119.51, 1334.21, 1402.81, 1522.04, 1526.84, 1652.35, 1650.35, 1553.27, 1633.17, 1641.97] },
      velocityScore: { '1D': 2.2, '1W': -31.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$81B', pe: 117, revenueGrowth: 26, eps: 14.03, grossMargin: 55, dividendYield: 0.47,
      etfPresence: { SOXX: 3.37, PSI: false, XSD: 2.21, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 2.75, proScore: 1.37, coverage: 0.5,
      price: 309.25, weeklyPrices: [305.68, 293.20, 308.12, 308.59, 309.25], weeklyChange: 1.17, sortRank: 0, periodReturns: { '1M': 10.1, '6M': 71.7, '1Y': 62.2 },
      priceHistory: { '1W': [305.68, 293.2, 308.12, 308.59, 309.25], '1M': [280.89, 281, 289.44, 285.24, 287.8, 295.17, 306.34, 308.17, 302.73, 300.6, 302.31, 304.88, 298.39, 309.21, 324.89, 315.95, 305.68, 293.2, 308.12, 308.59, 309.25], '6M': [180.12, 181.67, 176.19, 176.88, 177.17, 189.07, 189.59, 196.63, 225.21, 220.92, 223.32, 213.9, 202.39, 197.46, 194.45, 194.63, 194.14, 208.9, 216.29, 236.31, 269.22, 289.44, 306.34, 304.88, 315.95, 309.25], '1Y': [190.72, 199.69, 198.35, 206.31, 216.02, 221.25, 216.62, 185.69, 181.06, 185.91, 193.71, 200.71, 204.09, 187.93, 182.6, 179.37, 184.55, 180.32, 171.7, 176.58, 172.19, 160.51, 161.38, 162.23, 153.33, 168.27, 182.54, 179.42, 176.29, 175.69, 192.1, 188.53, 189.59, 196.63, 225.21, 220.92, 223.32, 213.9, 202.39, 198.67, 190.78, 196.77, 196.3, 214.98, 223.1, 236.31, 269.22, 289.44, 306.34, 304.88, 315.95, 309.25] },
      velocityScore: { '1D': -45.8, '1W': -55.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$281B', pe: 52.8, revenueGrowth: 19, eps: 5.86, grossMargin: 57, dividendYield: 1.84,
      etfPresence: { SOXX: 3.32, PSI: false, XSD: 2.18, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.74, proScore: 1.37, coverage: 0.5,
      price: 321.74, weeklyPrices: [321.35, 311.38, 323.62, 321.88, 321.74], weeklyChange: 0.12, sortRank: 0, periodReturns: { '1M': 10.7, '6M': 42.3, '1Y': 53.2 },
      priceHistory: { '1W': [321.35, 311.38, 323.62, 321.88, 321.74], '1M': [290.76, 292.35, 303.55, 290.22, 294.75, 294.23, 298.41, 294.17, 291.5, 291.68, 294.28, 310.15, 299.38, 316.47, 332.67, 330.28, 321.35, 311.38, 323.62, 321.88, 321.74], '6M': [226.16, 231.83, 222.08, 222.87, 223.88, 238.33, 230.7, 229.42, 220.66, 236.62, 237.33, 235.07, 216.37, 203.03, 194.02, 196.4, 196.86, 204.27, 209.39, 225.75, 289.25, 303.55, 298.41, 310.15, 330.28, 321.74], '1Y': [210.02, 217.41, 211.45, 218.3, 232.1, 228.92, 225.9, 224.43, 213.77, 205.91, 231.54, 223.93, 239.07, 226.74, 218.82, 224.05, 226.04, 228.89, 205.37, 214.35, 220.73, 206.38, 206.45, 201.22, 184.19, 194.94, 227.95, 228.16, 226.27, 220.46, 245.95, 239.09, 230.7, 229.42, 220.66, 236.62, 237.33, 235.07, 216.37, 199.87, 192.69, 197.61, 195.58, 205.67, 213.73, 225.75, 289.25, 303.55, 298.41, 310.15, 330.28, 321.74] },
      velocityScore: { '1D': -2.1, '1W': -35.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$81B', pe: 30.8, revenueGrowth: 12, eps: 10.46, grossMargin: 56, dividendYield: 1.26,
      etfPresence: { SOXX: 3.23, PSI: false, XSD: 2.25, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp/DE', easyScore: 1, avgWeight: 5.08, proScore: 1.27, coverage: 0.25,
      price: 1781.34, weeklyPrices: [1694.98, 1761.43, 1716.36, 1831.50, 1781.34], weeklyChange: 5.1, sortRank: 0, periodReturns: { '1M': 41.8, '6M': 735.1, '1Y': 4373.5 },
      priceHistory: { '1W': [1694.98, 1761.43, 1716.36, 1831.5, 1781.34], '1M': [1255.86, 1406.32, 1409.98, 1339.96, 1562.34, 1452.02, 1447.23, 1382.72, 1407.61, 1333.01, 1383.29, 1392.56, 1542.24, 1478.69, 1589.55, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1781.34], '6M': [213.31, 241.61, 219.46, 250.05, 274.08, 389.27, 453.12, 481.43, 695.51, 541.64, 600.4, 632.38, 599.06, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1392.56, 1641.64, 1781.34], '1Y': [39.82, 40.23, 46.62, 47.44, 46.41, 46.09, 42.19, 42.06, 42.92, 40.69, 46.68, 45.5, 50.87, 68.55, 86.13, 102.21, 97.12, 128.41, 116.91, 140.16, 167.05, 195.82, 207.69, 243.57, 195.96, 223.28, 228.47, 206.18, 237.61, 244.25, 349.63, 389.81, 453.12, 481.43, 695.51, 541.64, 600.4, 632.38, 599.06, 655.43, 753.69, 677.86, 692.73, 851.57, 919.47, 979.07, 1064.21, 1409.98, 1447.23, 1392.56, 1641.64, 1781.34] },
      velocityScore: { '1D': 5.8, '1W': -49.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$264B', pe: 60.8, revenueGrowth: 251, eps: 29.3, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 5.08 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'DIOD', name: 'Diodes Inc', easyScore: 2, avgWeight: 2.32, proScore: 1.16, coverage: 0.5,
      price: 110.09, weeklyPrices: [105.32, 101.96, 114.13, 116.22, 110.09], weeklyChange: 4.53, sortRank: 0, periodReturns: { '1M': 1.3, '6M': 113, '1Y': 129.7 },
      priceHistory: { '1W': [105.32, 101.96, 114.13, 116.22, 110.09], '1M': [108.7, 112.5, 116.05, 112.59, 111.41, 103.45, 101.96, 103.65, 100.04, 94.84, 93.75, 97.15, 96.3, 99.65, 108.24, 109.89, 105.32, 101.96, 114.13, 116.22, 110.09], '6M': [51.69, 52.01, 50.86, 50.39, 52.03, 54.29, 56.34, 58.16, 58.38, 61.7, 67.84, 70.8, 66.15, 63.01, 66.59, 72.26, 68.26, 78.6, 90.26, 97.7, 101, 116.05, 101.96, 97.15, 109.89, 110.09], '1Y': [47.92, 50.92, 50.33, 52.83, 57.47, 57.39, 54.98, 50.65, 49.37, 47.17, 53.92, 53.21, 55.82, 53.06, 52.62, 53.94, 53.1, 52.58, 48.37, 54.52, 57.85, 52.9, 51.8, 45, 42.36, 46.21, 52.58, 50.59, 50.9, 50.02, 54.84, 54.26, 56.34, 58.16, 58.38, 61.7, 67.84, 70.8, 66.15, 63.73, 66.75, 73.47, 68.92, 82.29, 93.95, 97.7, 101, 116.05, 101.96, 97.15, 109.89, 110.09] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$5B', pe: 59.5, revenueGrowth: 22, eps: 1.85, grossMargin: 31, dividendYield: null,
      etfPresence: { SOXX: false, PSI: 2.92, XSD: 1.72, DRAM: false },
      tonyNote: 'Diodes Inc appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.24, proScore: 1.12, coverage: 0.5,
      price: 96.82, weeklyPrices: [94.65, 91.52, 96.96, 96.55, 96.82], weeklyChange: 2.29, sortRank: 0, periodReturns: { '1M': 1.6, '6M': 49.6, '1Y': 49.7 },
      priceHistory: { '1W': [94.65, 91.52, 96.96, 96.55, 96.82], '1M': [95.3, 98.48, 102.92, 101.58, 99.09, 97.7, 96.71, 97.04, 93.85, 92.76, 91.81, 94.02, 91.11, 93.43, 98.05, 96.04, 94.65, 91.52, 96.96, 96.55, 96.82], '6M': [64.72, 69.09, 64.06, 64.94, 67.06, 73.39, 73.17, 75.16, 76.66, 76.86, 79.11, 75.47, 69.9, 65.33, 64.59, 65.63, 64.61, 70.73, 74.49, 82.48, 90.17, 102.92, 96.71, 94.02, 96.04, 96.82], '1Y': [64.67, 69.6, 68.02, 70.78, 73.06, 74.56, 74.78, 67.81, 67.59, 66.22, 65.99, 66.1, 65.25, 65.92, 64.7, 65.15, 64.42, 66.54, 60.41, 65.14, 65.09, 62.07, 59.35, 54.81, 49.02, 53.58, 65.81, 67.18, 64.91, 64.65, 74.87, 74.07, 73.17, 75.16, 76.66, 76.86, 79.11, 75.47, 69.9, 65.79, 64.71, 65.16, 65.38, 71.22, 76.87, 82.48, 90.17, 102.92, 96.71, 94.02, 96.04, 96.82] },
      velocityScore: { '1D': -1.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$52B', pe: 440.1, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 1.89,
      etfPresence: { SOXX: 2.42, PSI: false, XSD: 2.06, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 7, avgWeight: 4.75, proScore: 2.56, coverage: 0.538,
      price: 1011.75, weeklyPrices: [971.00, 1035.50, 1064.10, 1079.57, 1011.75], weeklyChange: 4.2, sortRank: 0, periodReturns: { '1M': 75.5, '6M': 346.4, '1Y': 879.9 },
      priceHistory: { '1W': [971, 1035.5, 1064.1, 1079.57, 1011.75], '1M': [576.45, 640.2, 666.59, 646.63, 746.81, 766.58, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 923.52, 971, 1035.5, 1064.1, 1079.57, 1011.75], '6M': [226.65, 258.46, 248.55, 284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 1011.75], '1Y': [103.25, 116.03, 121.82, 126, 122.29, 124.53, 114.39, 111.73, 109.14, 111.87, 125.29, 115.79, 122, 131.37, 157.23, 162.73, 157.27, 187.83, 181.6, 202.38, 206.71, 224.01, 238.33, 236.95, 201.37, 236.48, 237.22, 241.14, 265.92, 294.37, 343.43, 338.13, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.73, 382.09, 367.85, 421.51, 457.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 1011.75] },
      velocityScore: { '1D': -5.5, '1W': -1.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 47.8, revenueGrowth: 196, eps: 21.16, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { PTF: 5.04, WCLD: false, IGV: false, FDTX: 9.36, GTEK: false, ARKK: false, MARS: false, FRWD: 4.73, BCTK: 5.23, FWD: 1.43, CBSE: 2.97, FCUS: 4.47, WGMI: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 7, avgWeight: 4.25, proScore: 2.29, coverage: 0.538,
      price: 214.35, weeklyPrices: [211.14, 224.36, 222.82, 214.75, 214.35], weeklyChange: 1.52, sortRank: 0, periodReturns: { '1M': 8, '6M': 16.9, '1Y': 51 },
      priceHistory: { '1W': [211.14, 224.36, 222.82, 214.75, 214.35], '1M': [198.48, 196.5, 207.83, 211.5, 215.2, 220.78, 225.83, 235.74, 225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 214.25, 211.14, 224.36, 222.82, 214.75, 214.35], '6M': [183.38, 180.93, 174.14, 190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 214.25, 214.35], '1Y': [141.92, 142.83, 145.48, 155.02, 159.34, 164.92, 172.41, 173.74, 177.87, 180.77, 182.02, 174.98, 180.17, 167.02, 177.82, 176.67, 178.19, 187.62, 183.16, 183.22, 182.16, 202.89, 188.08, 186.86, 180.64, 177, 182.41, 175.02, 180.99, 188.22, 187.24, 185.81, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 186.03, 180.4, 178.68, 175.75, 183.91, 198.35, 202.5, 209.25, 207.83, 225.83, 223.47, 214.25, 214.35] },
      velocityScore: { '1D': 0.9, '1W': -52.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.2T', pe: 32.8, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { PTF: 4.27, WCLD: false, IGV: false, FDTX: 4.62, GTEK: false, ARKK: 1.74, MARS: false, FRWD: 8.2, BCTK: 6.74, FWD: 2.07, CBSE: false, FCUS: false, WGMI: 2.1 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 6, avgWeight: 4.33, proScore: 2, coverage: 0.462,
      price: 916.19, weeklyPrices: [879.80, 921.26, 926.61, 940.69, 916.19], weeklyChange: 4.14, sortRank: 0, periodReturns: { '1M': 24.1, '6M': 244.9, '1Y': 617.8 },
      priceHistory: { '1W': [879.8, 921.26, 926.61, 940.69, 916.19], '1M': [738.54, 771.01, 786.42, 766.44, 782.64, 808.8, 817.35, 804.76, 795.47, 740.84, 733.35, 751.07, 810.46, 812.73, 845.76, 880.72, 879.8, 921.26, 926.61, 940.69, 916.19], '6M': [265.63, 307.85, 292, 286.22, 289.83, 321.48, 325.99, 371.76, 444.45, 396.23, 424.14, 421.85, 375.01, 384.29, 421.09, 424.96, 391.76, 496.3, 519.6, 579.88, 643.3, 786.42, 817.35, 751.07, 880.72, 916.19], '1Y': [127.64, 126.49, 131.3, 140.69, 149.44, 147.18, 149.07, 152.73, 157.01, 148.1, 155.73, 154.6, 172.38, 188.16, 195.99, 221.23, 217.51, 252.79, 214.38, 225.4, 226.41, 268.34, 278.47, 262.56, 240.5, 276.69, 278.79, 287.64, 296.36, 281.3, 330.42, 318.44, 325.99, 371.76, 444.45, 396.23, 424.14, 421.85, 375.01, 385.97, 406.77, 413.22, 423.12, 500.77, 531.81, 579.88, 643.3, 786.42, 817.35, 751.07, 880.72, 916.19] },
      velocityScore: { '1D': 10.5, '1W': -14.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$207B', pe: 86.9, revenueGrowth: 44, eps: 10.54, grossMargin: 42, dividendYield: 0.31,
      etfPresence: { PTF: 4.73, WCLD: false, IGV: false, FDTX: 4.04, GTEK: false, ARKK: false, MARS: false, FRWD: 9.07, BCTK: false, FWD: 1.09, CBSE: 2.69, FCUS: 4.33, WGMI: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 6, avgWeight: 4.04, proScore: 1.87, coverage: 0.462,
      price: 432.86, weeklyPrices: [418.45, 435.63, 446.69, 436.69, 432.86], weeklyChange: 3.44, sortRank: 0, periodReturns: { '1M': 7.8, '6M': 47.8, '1Y': 113.9 },
      priceHistory: { '1W': [418.45, 435.63, 446.69, 436.69, 432.86], '1M': [401.61, 394.41, 419.5, 414.15, 411.68, 397.28, 399.8, 417.72, 404.35, 395.95, 392.61, 401.62, 407.15, 404.52, 412.32, 424.86, 418.45, 435.63, 446.69, 436.69, 432.86], '6M': [292.93, 304.85, 284.68, 302.84, 322.25, 331.77, 327.16, 338.34, 335.75, 361.91, 362.26, 387.73, 357.44, 347.09, 345.98, 343.25, 337.95, 365.9, 375.1, 387.44, 393.83, 419.5, 399.8, 401.62, 424.86, 432.86], '1Y': [202.4, 214.1, 213.5, 224.01, 234.8, 230.4, 240.4, 241.6, 241.62, 242.62, 241, 227.33, 238.27, 243.41, 259.33, 264.87, 273.36, 292.19, 280.66, 295.08, 290.73, 303.22, 289.24, 282.2, 277.5, 291.51, 294.72, 292.04, 288.95, 300.92, 327.43, 331.21, 327.16, 338.34, 335.75, 361.91, 362.26, 387.73, 357.44, 354.56, 339.57, 347.75, 341.49, 365.49, 363.35, 387.44, 393.83, 419.5, 399.8, 401.62, 424.86, 432.86] },
      velocityScore: { '1D': 0.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.2T', pe: 36.8, revenueGrowth: 35, eps: 11.75, grossMargin: 62, dividendYield: 0.87,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6, GTEK: false, ARKK: 1, MARS: false, FRWD: 5.74, BCTK: 8.42, FWD: false, CBSE: 2.52, FCUS: false, WGMI: 0.57 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 4, avgWeight: 4.76, proScore: 1.46, coverage: 0.308,
      price: 513.68, weeklyPrices: [516.10, 510.13, 521.54, 542.52, 513.68], weeklyChange: -0.47, sortRank: 0, periodReturns: { '1M': 50.4, '6M': 137.8, '1Y': 333.2 },
      priceHistory: { '1W': [516.1, 510.13, 521.54, 542.52, 513.68], '1M': [341.54, 355.26, 421.39, 408.46, 455.19, 448.29, 445.5, 449.7, 424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 518.09, 516.1, 510.13, 521.54, 542.52, 513.68], '6M': [215.98, 221.43, 201.06, 214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 518.09, 513.68], '1Y': [118.58, 121.14, 126.79, 143.68, 137.91, 146.42, 156.99, 162.12, 176.31, 172.4, 180.95, 163.71, 168.58, 151.14, 158.57, 157.39, 159.46, 164.67, 214.9, 233.08, 234.99, 254.84, 237.7, 247.96, 206.02, 217.53, 217.97, 210.78, 213.43, 215.61, 214.35, 220.97, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 204.83, 199.46, 220.27, 210.21, 236.64, 278.26, 303.46, 337.11, 421.39, 445.5, 447.58, 518.09, 513.68] },
      velocityScore: { '1D': -2.7, '1W': -51, '1M': null, '6M': null }, isNew: false,
      marketCap: '$838B', pe: 172.4, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 5.17, MARS: false, FRWD: 7.54, BCTK: 3.72, FWD: 2.61, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 4, avgWeight: 4.58, proScore: 1.41, coverage: 0.308,
      price: 587.85, weeklyPrices: [531.21, 546.20, 563.10, 594.11, 587.85], weeklyChange: 10.66, sortRank: 0, periodReturns: { '1M': 32.9, '6M': 265.1, '1Y': 980 },
      priceHistory: { '1W': [531.21, 546.2, 563.1, 594.11, 587.85], '1M': [442.36, 465.26, 483.15, 463.91, 480, 488.74, 494.09, 489.15, 482.02, 458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 531.18, 531.21, 546.2, 563.1, 594.11, 587.85], '6M': [161, 187.2, 175.01, 181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 459.62, 531.18, 587.85], '1Y': [54.43, 55.67, 59.19, 63.51, 66.08, 66.14, 68, 69.02, 78.69, 74.44, 76.24, 74.66, 82.04, 92.04, 97.66, 106.63, 106.88, 131.31, 115.42, 126.2, 125.72, 138.13, 163.6, 157.16, 140.23, 163.33, 168.89, 176.34, 181.08, 179.68, 219.38, 214, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 268.81, 304.9, 296.14, 297.73, 337.88, 361.69, 389.1, 412.76, 483.15, 494.09, 459.62, 531.18, 587.85] },
      velocityScore: { '1D': -1.4, '1W': -36.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$203B', pe: 35.2, revenueGrowth: 46, eps: 16.69, grossMargin: 45, dividendYield: 0.1,
      etfPresence: { PTF: 4.9, WCLD: false, IGV: false, FDTX: 4, GTEK: false, ARKK: false, MARS: false, FRWD: 5.12, BCTK: false, FWD: false, CBSE: false, FCUS: 4.3, WGMI: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 5, avgWeight: 3.6, proScore: 1.38, coverage: 0.385,
      price: 409.17, weeklyPrices: [446.77, 459.97, 481.57, 479.23, 409.17], weeklyChange: -8.42, sortRank: 0, periodReturns: { '1M': -1.8, '6M': 7.4, '1Y': 56.7 },
      priceHistory: { '1W': [446.77, 459.97, 481.57, 479.23, 409.17], '1M': [416.5, 427.36, 425.44, 412.56, 430, 419.3, 416.79, 439.79, 425.19, 420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 426.58, 446.77, 459.97, 481.57, 479.23, 409.17], '6M': [381.03, 406.37, 329.88, 352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 417.76, 426.58, 409.17], '1Y': [261.08, 252.91, 251.26, 270.17, 275.18, 274.38, 283.34, 288.71, 293.7, 303.76, 311.23, 289.6, 308.65, 334.89, 359.87, 344.94, 334.53, 338.37, 324.63, 349.33, 344.29, 376.47, 355.59, 339.98, 346.82, 402.96, 390.24, 359.93, 340.36, 349.39, 343.77, 354.61, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 341.57, 315.93, 318.81, 313.49, 354.91, 398.47, 422.65, 405.45, 425.44, 416.79, 417.76, 426.58, 409.17] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.9T', pe: 68.3, revenueGrowth: 30, eps: 5.99, grossMargin: 77, dividendYield: 0.54,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.79, GTEK: false, ARKK: 1.29, MARS: false, FRWD: 4.6, BCTK: 8.25, FWD: 3.07, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'Marvell Technology Inc', easyScore: 3, avgWeight: 5.39, proScore: 1.24, coverage: 0.231,
      price: 285.39, weeklyPrices: [205.00, 219.43, 290.79, 301.65, 285.39], weeklyChange: 39.21, sortRank: 0, periodReturns: { '1M': 74.4, '6M': 190.7, '1Y': 330.5 },
      priceHistory: { '1W': [205, 219.43, 290.79, 301.65, 285.39], '1M': [163.66, 168.75, 172.15, 160.01, 170.13, 164.5, 177.95, 182.58, 176.89, 168.93, 176.27, 186.8, 190.69, 196.33, 208.26, 204.83, 205, 219.43, 290.79, 301.65, 285.39], '6M': [98.19, 89.43, 84.47, 86.34, 90.23, 82.89, 79.8, 82.93, 75.54, 82.01, 79.09, 80.92, 78.09, 93.3, 90.79, 92.36, 99.05, 114.45, 134.6, 157.32, 156.57, 172.15, 177.95, 186.8, 204.83, 285.39], '1Y': [66.3, 68.24, 74.95, 79.97, 75.18, 72.71, 74.65, 74.04, 80.37, 75.85, 79.04, 71.21, 77.23, 63.33, 67.35, 74.26, 83.17, 86.22, 85.61, 87.95, 82.77, 88.57, 93.33, 87.52, 76.68, 89.4, 98.91, 84.43, 84.09, 85.76, 88.23, 83.05, 79.8, 82.93, 75.54, 82.01, 79.09, 80.92, 78.09, 90.44, 87.62, 98.45, 106.71, 119.93, 133.37, 157.32, 156.57, 172.15, 177.95, 186.8, 204.83, 285.39] },
      velocityScore: { '1D': 12.7, '1W': -59.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$250B', pe: 98.4, revenueGrowth: 28, eps: 2.9, grossMargin: 52, dividendYield: 0.08,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 8.06, GTEK: 4.62, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: 3.49, FCUS: false, WGMI: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 5, avgWeight: 3.21, proScore: 1.23, coverage: 0.385,
      price: 253.49, weeklyPrices: [270.64, 261.26, 256.52, 250.02, 253.49], weeklyChange: -6.34, sortRank: 0, periodReturns: { '1M': -6.8, '6M': 10.6, '1Y': 22.3 },
      priceHistory: { '1W': [270.64, 261.26, 256.52, 250.02, 253.49], '1M': [272.05, 273.55, 274.99, 271.17, 272.68, 265.82, 270.13, 267.22, 264.14, 264.86, 259.34, 265.01, 268.46, 266.32, 265.29, 274, 270.64, 261.26, 256.52, 250.02, 253.49], '6M': [229.11, 230.28, 226.76, 232.52, 233.06, 246.47, 231, 244.68, 238.62, 206.96, 204.79, 210.64, 216.82, 214.33, 215.2, 207.24, 208.27, 221.25, 248.5, 255.36, 263.04, 274.99, 270.13, 265.01, 274, 253.49], '1Y': [207.23, 213.2, 212.52, 217.12, 223.41, 225.02, 226.13, 232.23, 234.11, 223.13, 230.98, 221.95, 231.6, 232.33, 228.15, 231.48, 219.78, 219.51, 216.37, 213.04, 221.09, 222.86, 243.04, 237.58, 217.14, 233.22, 229.53, 226.19, 227.35, 232.07, 240.93, 242.6, 231, 244.68, 238.62, 206.96, 204.79, 210.64, 216.82, 212.65, 209.87, 211.71, 210.57, 233.65, 249.7, 255.36, 263.04, 274.99, 270.13, 265.01, 274, 253.49] },
      velocityScore: { '1D': -2.4, '1W': -70.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.7T', pe: 32.1, revenueGrowth: 17, eps: 7.9, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.01, GTEK: false, ARKK: 2.53, MARS: false, FRWD: 3.5, BCTK: 4.61, FWD: 1.39, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 4, avgWeight: 4.01, proScore: 1.23, coverage: 0.308,
      price: 331.06, weeklyPrices: [318.18, 317.12, 334.41, 343.71, 331.06], weeklyChange: 4.05, sortRank: 0, periodReturns: { '1M': 28, '6M': 110.7, '1Y': 290.5 },
      priceHistory: { '1W': [318.18, 317.12, 334.41, 343.71, 331.06], '1M': [258.57, 275.8, 297.17, 286.52, 294.05, 289.24, 295.44, 299.15, 284.72, 277.96, 273.38, 292.09, 302.24, 305.35, 322.68, 318, 318.18, 317.12, 334.41, 343.71, 331.06], '6M': [157.09, 168.71, 164.7, 178.07, 194.76, 220.4, 222.41, 238.46, 230.1, 226.61, 240.09, 249.48, 222.99, 215.23, 226.47, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 295.44, 292.09, 318, 331.06], '1Y': [84.77, 90.95, 92.24, 96.84, 98.81, 101.73, 100.66, 97.78, 94.84, 99.15, 107.38, 98.41, 104.09, 102.95, 116.96, 126.92, 128.33, 145.81, 131.37, 141.51, 147.54, 161.01, 162.19, 153.32, 139.59, 156, 158.7, 160.52, 172.27, 175.87, 206.96, 214.38, 222.41, 238.46, 230.1, 226.61, 240.09, 249.48, 222.99, 218.87, 224.71, 233.45, 222.01, 258.76, 260.96, 265.55, 248.75, 297.17, 295.44, 292.09, 318, 331.06] },
      velocityScore: { '1D': -1.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$414B', pe: 62.6, revenueGrowth: 24, eps: 5.29, grossMargin: 50, dividendYield: 0.3,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.43, BCTK: 6.38, FWD: 1.63, CBSE: 2.59, FCUS: false, WGMI: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 3, avgWeight: 5.26, proScore: 1.21, coverage: 0.231,
      price: 429.69, weeklyPrices: [450.24, 460.52, 441.31, 427.34, 429.69], weeklyChange: -4.56, sortRank: 0, periodReturns: { '1M': 3.9, '6M': -10.6, '1Y': -7.4 },
      priceHistory: { '1W': [450.24, 460.52, 441.31, 427.34, 429.69], '1M': [413.62, 411.38, 413.96, 420.77, 415.12, 407.77, 405.21, 409.43, 421.92, 423.54, 417.42, 421.06, 419.09, 418.57, 416.03, 426.99, 450.24, 460.52, 441.31, 427.34, 429.69], '6M': [480.84, 483.47, 483.98, 487.71, 472.85, 477.18, 454.52, 480.58, 411.21, 413.27, 399.6, 400.6, 405.2, 405.76, 399.41, 372.74, 370.17, 374.33, 411.22, 432.92, 424.46, 413.96, 405.21, 421.06, 426.99, 429.69], '1Y': [463.87, 472.62, 480.24, 497.45, 498.84, 503.32, 510.05, 510.88, 533.5, 520.84, 522.48, 504.24, 509.64, 495, 509.9, 517.93, 511.46, 517.35, 510.96, 513.58, 520.56, 525.76, 497.1, 503.29, 478.43, 492.01, 483.16, 478.53, 485.92, 487.1, 478.51, 470.67, 454.52, 480.58, 411.21, 413.27, 399.6, 400.6, 405.2, 404.88, 391.79, 371.04, 369.37, 373.07, 420.26, 432.92, 424.46, 413.96, 405.21, 421.06, 426.99, 429.69] },
      velocityScore: { '1D': 0, '1W': -75.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.2T', pe: 25.6, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 0.85,
      etfPresence: { PTF: false, WCLD: false, IGV: 7.71, FDTX: 3.79, GTEK: false, ARKK: false, MARS: false, FRWD: 4.28, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'CIFR', name: 'CIPHER DIGITAL INC', easyScore: 2, avgWeight: 7.68, proScore: 1.18, coverage: 0.154,
      price: 25.05, weeklyPrices: [23.65, 24.01, 26.29, 26.24, 25.05], weeklyChange: 5.92, sortRank: 0, periodReturns: { '1M': 40, '6M': 26.3, '1Y': 569.8 },
      priceHistory: { '1W': [23.65, 24.01, 26.29, 26.24, 25.05], '1M': [17.89, 22.1, 21.91, 20.68, 20.55, 20.06, 21.24, 22.29, 20.33, 19.12, 18.8, 19.48, 21.52, 21.97, 23.02, 24.59, 23.65, 24.01, 26.29, 26.24, 25.05], '6M': [19.83, 18.88, 15.15, 15.19, 18.16, 17.68, 17.92, 18.75, 16.26, 17.1, 15.42, 16.61, 16.04, 13.96, 15.09, 14.88, 12.87, 15.42, 18, 19.44, 16.92, 21.91, 21.24, 19.48, 24.59, 25.05], '1Y': [3.74, 4.08, 3.81, 4.19, 6.05, 5.87, 6.36, 6.65, 5.46, 4.87, 5.32, 5.9, 7.02, 7.52, 10.85, 12.28, 11.47, 14.7, 16.97, 18.76, 17.25, 19.07, 21.71, 14.93, 14.56, 20.35, 19.28, 17.05, 16.21, 15.08, 17.54, 18.25, 17.92, 18.75, 16.26, 17.1, 15.42, 16.61, 16.04, 14.11, 14.67, 15.88, 12.64, 16.36, 17.34, 19.44, 16.92, 21.91, 21.24, 19.48, 24.59, 25.05] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: -29, eps: -2.32, grossMargin: 12, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 0.26, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: 15.1 },
      tonyNote: 'CIPHER DIGITAL INC appears in 2 of 13 Broad Tech ETFs (15% coverage) with average weight 7.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 3, avgWeight: 4.97, proScore: 1.15, coverage: 0.231,
      price: 423.6, weeklyPrices: [435.79, 415.88, 423.74, 423.70, 423.60], weeklyChange: -2.8, sortRank: 0, periodReturns: { '1M': 7.9, '6M': -6.8, '1Y': 27.6 },
      priceHistory: { '1W': [435.79, 415.88, 423.74, 423.7, 423.6], '1M': [392.51, 389.37, 398.73, 411.79, 428.35, 433.45, 445.27, 443.3, 422.24, 409.99, 404.11, 417.26, 417.85, 426.01, 433.59, 442.1, 435.79, 415.88, 423.74, 423.7, 423.6], '6M': [454.53, 446.89, 483.37, 475.19, 451.67, 448.96, 419.25, 430.9, 421.96, 425.21, 411.32, 417.4, 405.94, 399.24, 399.27, 383.03, 371.75, 343.25, 391.95, 387.51, 372.8, 398.73, 445.27, 417.26, 442.1, 423.6], '1Y': [332.05, 326.43, 322.05, 325.78, 315.35, 313.51, 329.65, 305.3, 308.27, 322.27, 335.58, 320.11, 345.98, 350.84, 395.94, 426.07, 440.4, 429.83, 413.49, 439.31, 448.98, 440.1, 445.91, 401.99, 395.23, 430.17, 455, 458.96, 481.2, 459.64, 432.96, 447.2, 419.25, 430.9, 421.96, 425.21, 411.32, 417.4, 405.94, 407.82, 392.78, 385.95, 381.26, 345.62, 388.9, 387.51, 372.8, 398.73, 445.27, 417.26, 442.1, 423.6] },
      velocityScore: { '1D': 1.8, '1W': -78.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: 385.1, revenueGrowth: 16, eps: 1.1, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 10.47, MARS: false, FRWD: false, BCTK: 3.36, FWD: 1.08, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
    {
      ticker: 'PANW', name: 'PANW', easyScore: 3, avgWeight: 4.57, proScore: 1.06, coverage: 0.231,
      price: 273.68, weeklyPrices: [281.69, 300.48, 297.18, 280.43, 273.68], weeklyChange: -2.84, sortRank: 0, periodReturns: { '1M': 48.3, '6M': 39.9, '1Y': 41 },
      priceHistory: { '1W': [281.69, 300.48, 297.18, 280.43, 273.68], '1M': [184.56, 183.98, 183.68, 196.53, 207.88, 215.6, 227.79, 238.21, 242.83, 247.55, 240.13, 246.66, 252.92, 260.58, 256.75, 257.77, 281.69, 300.48, 297.18, 280.43, 273.68], '6M': [195.68, 190.36, 185.88, 188.45, 182.12, 188.88, 184.06, 183.5, 166.24, 165.51, 152.35, 144.84, 158.56, 165.58, 169.19, 157.21, 160.32, 173.78, 164.11, 181.2, 181.54, 183.68, 227.79, 246.66, 257.77, 273.68], '1Y': [194.07, 194.39, 199.78, 202.34, 201.82, 187.39, 195.78, 201.16, 173.6, 168.1, 173.55, 183.32, 191.02, 194.46, 196.29, 208.19, 202.37, 207.19, 208.55, 207.89, 215.02, 218.27, 211.37, 204.77, 185.07, 190.13, 198.84, 191.69, 186.88, 186.85, 185.86, 190.85, 184.06, 183.5, 166.24, 165.51, 152.35, 144.84, 158.56, 164.93, 168.91, 153.22, 160.67, 166.99, 166.97, 181.2, 181.54, 183.68, 227.79, 246.66, 257.77, 273.68] },
      velocityScore: { '1D': 0, '1W': -50.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$223B', pe: 238, revenueGrowth: 31, eps: 1.15, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.39, IGV: 7.66, FDTX: 3.67, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 1, avgWeight: 13.35, proScore: 1.03, coverage: 0.077,
      price: 62.26, weeklyPrices: [63.54, 65.33, 66.60, 65.48, 62.26], weeklyChange: -2.01, sortRank: 0, periodReturns: { '1M': 25.8, '6M': 34, '1Y': 560.2 },
      priceHistory: { '1W': [63.54, 65.33, 66.6, 65.48, 62.26], '1M': [49.48, 54.74, 60.98, 56.85, 61.2, 56.56, 55.17, 58.4, 52.94, 50.46, 47.74, 52.71, 58.06, 56.83, 59.78, 64.05, 63.54, 65.33, 66.6, 65.48, 62.26], '6M': [46.45, 43.94, 35.8, 40.3, 48.24, 50.33, 54.26, 59.99, 54.39, 42.93, 42.08, 44.03, 43.84, 38.12, 42.96, 41.12, 34.28, 36.83, 48.82, 48.39, 42.86, 60.98, 55.17, 52.71, 64.05, 62.26], '1Y': [9.43, 10.3, 9.8, 13.11, 16.82, 16.23, 17.94, 18.14, 16.11, 18.57, 19.08, 19.59, 23.04, 26.15, 33.96, 38.64, 41.86, 50.46, 59.77, 60.72, 55.86, 58.22, 66.96, 48.65, 43.47, 47.81, 44.71, 40.13, 39.92, 39.41, 45.91, 52.99, 54.26, 59.99, 54.39, 42.93, 42.08, 44.03, 43.84, 41.98, 42.21, 41.43, 34.09, 37.06, 47.7, 48.39, 42.86, 60.98, 55.17, 52.71, 64.05, 62.26] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$22B', pe: 80.9, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: 13.35 },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab Corp', easyScore: 1, avgWeight: 13.25, proScore: 1.02, coverage: 0.077,
      price: 113.39, weeklyPrices: [143.48, 122.39, 123.32, 114.70, 113.39], weeklyChange: -20.97, sortRank: 0, periodReturns: { '1M': 41.2, '6M': 129.7, '1Y': 321.4 },
      priceHistory: { '1W': [143.48, 122.39, 123.32, 114.7, 113.39], '1M': [80.31, 78.76, 84.65, 78.58, 105.47, 117.56, 124.15, 132.55, 124.77, 131.16, 127.31, 134.28, 125.45, 135.76, 143.2, 148.03, 143.48, 122.39, 123.32, 114.7, 113.39], '6M': [49.37, 63.53, 59.92, 70.65, 78.14, 87.9, 89.16, 87, 81.27, 72.03, 74.42, 70.2, 71.91, 68.93, 78.59, 66.07, 64.22, 69.08, 73.6, 90.04, 77.02, 84.65, 124.15, 134.28, 148.03, 113.39], '1Y': [26.91, 27.36, 27.85, 36.14, 35.66, 39.03, 51.39, 48.13, 45.92, 44.21, 42.81, 41.53, 47.91, 45.84, 53.34, 47.79, 46.26, 56.16, 64.26, 66.27, 63.57, 60.92, 49.61, 45.25, 39.48, 42.14, 49.06, 61.49, 70.52, 70.12, 86.03, 86.58, 89.16, 87, 81.27, 72.03, 74.42, 70.2, 71.91, 71.96, 69.48, 72.88, 65.52, 66.74, 82.93, 90.04, 77.02, 84.65, 124.15, 134.28, 148.03, 113.39] },
      velocityScore: { '1D': 0, '1W': -77.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$66B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 13.25, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 3, avgWeight: 4.27, proScore: 0.99, coverage: 0.231,
      price: 143.31, weeklyPrices: [156.54, 160.65, 152.17, 142.20, 143.31], weeklyChange: -8.45, sortRank: 0, periodReturns: { '1M': -1.9, '6M': -19.4, '1Y': 10.2 },
      priceHistory: { '1W': [156.54, 160.65, 152.17, 142.2, 143.31], '1M': [146.03, 135.91, 133.79, 137.05, 137.8, 136, 130.05, 133.73, 133.99, 135.14, 135.26, 137.15, 137.41, 136.88, 136.6, 143.34, 156.54, 160.65, 152.17, 142.2, 143.31], '6M': [177.92, 187.54, 185.69, 188.71, 174.04, 179.41, 168.53, 165.7, 157.88, 139.51, 135.38, 134.19, 153.19, 151.14, 155.08, 154.78, 146.28, 140.76, 142.15, 152.62, 137.97, 133.79, 130.05, 137.15, 143.34, 143.31], '1Y': [130.01, 136.39, 139.96, 144.25, 134.36, 142.1, 153.52, 154.86, 158.35, 182.2, 181.02, 156.18, 158.12, 153.11, 171.43, 182.39, 177.57, 173.07, 175.44, 178.15, 180.48, 194.55, 175.05, 172.14, 155.74, 168.45, 181.76, 183.57, 193.38, 184.18, 179.71, 178.96, 168.53, 165.7, 157.88, 139.51, 135.38, 134.19, 153.19, 151.6, 152.77, 154.96, 146.49, 130.49, 142.76, 152.62, 137.97, 133.79, 130.05, 137.15, 143.34, 143.31] },
      velocityScore: { '1D': -2, '1W': -56, '1M': null, '6M': null }, isNew: false,
      marketCap: '$344B', pe: 159.2, revenueGrowth: 85, eps: 0.9, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 6.85, FDTX: 2.87, GTEK: false, ARKK: 3.1, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'COHR', name: 'Coherent Corp', easyScore: 4, avgWeight: 3.1, proScore: 0.95, coverage: 0.308,
      price: 397.47, weeklyPrices: [361.47, 362.90, 426.89, 417.43, 397.47], weeklyChange: 9.96, sortRank: 0, periodReturns: { '1M': 20.5, '6M': 124.1, '1Y': 386.9 },
      priceHistory: { '1W': [361.47, 362.9, 426.89, 417.43, 397.47], '1M': [329.89, 335.73, 344.67, 319.19, 335.26, 374.01, 403.71, 404.94, 382.45, 362.83, 353.63, 358.5, 378, 377.57, 381.35, 376.95, 361.47, 362.9, 426.89, 417.43, 397.47], '6M': [177.35, 198.5, 175.71, 191.72, 186.36, 185.18, 193.46, 214, 229.18, 228.37, 223.89, 267.9, 274.86, 260.64, 245.8, 272.33, 238.21, 281.79, 308.2, 350.47, 304.93, 344.67, 403.71, 358.5, 376.95, 397.47], '1Y': [81.63, 81.51, 82.29, 89.88, 90.9, 93.3, 99.6, 98.72, 107.6, 113.82, 91.65, 86.6, 95.2, 97.84, 102.99, 109.11, 106.99, 113.58, 111.1, 116.35, 121.52, 132.71, 159.3, 139.97, 135.61, 164.26, 181.79, 178.34, 185.83, 189.02, 194.11, 190.03, 193.46, 214, 229.18, 228.37, 223.89, 267.9, 274.86, 251.41, 257.21, 272.04, 247.8, 284.17, 328, 350.47, 304.93, 344.67, 403.71, 358.5, 376.95, 397.47] },
      velocityScore: { '1D': 1.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$78B', pe: 190.2, revenueGrowth: 21, eps: 2.09, grossMargin: 37, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.75, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 3.51, FWD: false, CBSE: 2.6, FCUS: 2.54, WGMI: false },
      tonyNote: 'Coherent Corp appears in 4 of 13 Broad Tech ETFs (31% coverage) with average weight 3.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 3.06, proScore: 0.94, coverage: 0.308,
      price: 114.78, weeklyPrices: [118.71, 124.12, 117.01, 112.94, 114.78], weeklyChange: -3.31, sortRank: 0, periodReturns: { '1M': -10, '6M': -29.3, '1Y': 10.8 },
      priceHistory: { '1W': [118.71, 124.12, 117.01, 112.94, 114.78], '1M': [127.55, 107.63, 105.44, 111.74, 110.41, 99.84, 95.4, 97.42, 100.28, 102.39, 101.01, 105.01, 104.86, 103, 104.9, 115.03, 118.71, 124.12, 117.01, 112.94, 114.78], '6M': [162.31, 164.75, 166.8, 170.83, 166.21, 167.93, 144.5, 137.5, 119.29, 127.24, 121.64, 120.31, 129.65, 129.36, 127.8, 116.15, 118.62, 120.1, 127.41, 131.96, 121.26, 105.44, 95.4, 105.01, 115.03, 114.78], '1Y': [103.58, 114.13, 105.97, 113.07, 116.52, 112.11, 127.07, 122.08, 122.21, 151.07, 144.27, 136.68, 141.54, 146.82, 143.38, 153.3, 140.25, 161.14, 151.02, 157.76, 167.03, 173.61, 156.05, 146.34, 144.56, 158.64, 161.08, 164.19, 169.57, 167.88, 168.45, 167.44, 144.5, 137.5, 119.29, 127.24, 121.64, 120.31, 129.65, 129.52, 123.75, 118.42, 118.52, 112.38, 126.94, 131.96, 121.26, 105.44, 95.4, 105.01, 115.03, 114.78] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$149B', pe: 112.5, revenueGrowth: 34, eps: 1.02, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.89, GTEK: false, ARKK: 4.36, MARS: false, FRWD: 2.1, BCTK: 2.89, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 13 Broad Tech ETFs (31% coverage) with average weight 3.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp/DE', easyScore: 2, avgWeight: 6.11, proScore: 0.94, coverage: 0.154,
      price: 1781.34, weeklyPrices: [1694.98, 1761.43, 1716.36, 1831.50, 1781.34], weeklyChange: 5.1, sortRank: 0, periodReturns: { '1M': 41.8, '6M': 735.1, '1Y': 4373.5 },
      priceHistory: { '1W': [1694.98, 1761.43, 1716.36, 1831.5, 1781.34], '1M': [1255.86, 1406.32, 1409.98, 1339.96, 1562.34, 1452.02, 1447.23, 1382.72, 1407.61, 1333.01, 1383.29, 1392.56, 1542.24, 1478.69, 1589.55, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1781.34], '6M': [213.31, 241.61, 219.46, 250.05, 274.08, 389.27, 453.12, 481.43, 695.51, 541.64, 600.4, 632.38, 599.06, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1392.56, 1641.64, 1781.34], '1Y': [39.82, 40.23, 46.62, 47.44, 46.41, 46.09, 42.19, 42.06, 42.92, 40.69, 46.68, 45.5, 50.87, 68.55, 86.13, 102.21, 97.12, 128.41, 116.91, 140.16, 167.05, 195.82, 207.69, 243.57, 195.96, 223.28, 228.47, 206.18, 237.61, 244.25, 349.63, 389.81, 453.12, 481.43, 695.51, 541.64, 600.4, 632.38, 599.06, 655.43, 753.69, 677.86, 692.73, 851.57, 919.47, 979.07, 1064.21, 1409.98, 1447.23, 1392.56, 1641.64, 1781.34] },
      velocityScore: { '1D': -5.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$264B', pe: 60.8, revenueGrowth: 251, eps: 29.3, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 7.81, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: 4.41, WGMI: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'POWELL INDUSTRIES INC', easyScore: 1, avgWeight: 8.04, proScore: 2.68, coverage: 0.333,
      price: 292.19, weeklyPrices: [284.42, 288.12, 299.07, 299.73, 292.19], weeklyChange: 2.73, sortRank: 0, periodReturns: { '1M': 8.2, '6M': 160.2, '1Y': 394 },
      priceHistory: { '1W': [284.42, 288.12, 299.07, 299.73, 292.19], '1M': [269.95, 294.69, 320.3, 305.93, 309.39, 308.05, 300.84, 296.98, 292.65, 266.8, 261.58, 271.05, 270.75, 279.22, 291.97, 288.9, 284.42, 288.12, 299.07, 299.73, 292.19], '6M': [112.31, 120.91, 109.59, 113.62, 120.46, 128.85, 142.76, 147.43, 151.08, 190.09, 180.99, 183, 170.96, 176.51, 174.04, 186.82, 180.36, 218.07, 229.73, 242.77, 253.49, 320.3, 300.84, 271.05, 288.9, 292.19], '1Y': [59.14, 64.27, 59.64, 66.46, 72.55, 70.87, 76.08, 80.05, 79.03, 77.8, 85.17, 83.64, 90.42, 89.41, 95.89, 99.1, 96.99, 101.35, 100.35, 110.24, 113.88, 125.9, 125, 109.4, 98.12, 107.74, 114.04, 112.36, 110.97, 111.96, 120, 133.04, 142.76, 147.43, 151.08, 190.09, 180.99, 183, 170.96, 171.73, 167.41, 194.85, 184.68, 230.81, 232.81, 242.77, 253.49, 320.3, 300.84, 271.05, 288.9, 292.19] },
      velocityScore: { '1D': -26.6, '1W': -47.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 57, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { POW: false, VOLT: 8.04, PBD: false, PBW: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'BELFB', name: 'BEL FUSE INC', easyScore: 1, avgWeight: 7.43, proScore: 2.48, coverage: 0.333,
      price: 275, weeklyPrices: [274.52, 269.86, 269.22, 280.09, 275.00], weeklyChange: 0.17, sortRank: 0, periodReturns: { '1M': -4.1, '6M': 68.5, '1Y': 273.1 },
      priceHistory: { '1W': [274.52, 269.86, 269.22, 280.09, 275], '1M': [286.69, 297.17, 286.89, 290.46, 297.98, 298.22, 266.92, 268.73, 256.72, 258.28, 249.71, 254.75, 260.4, 270.01, 276.25, 276.96, 274.52, 269.86, 269.22, 280.09, 275], '6M': [163.19, 175.36, 166.55, 176.45, 175.77, 188, 201.17, 210.66, 217.25, 237.19, 221.19, 234.67, 213.8, 198.5, 209.52, 222.04, 197.98, 228.29, 236.04, 262.68, 258.26, 286.89, 266.92, 254.75, 276.96, 275], '1Y': [73.71, 83.05, 89.16, 93.87, 100.1, 101.14, 101.69, 102.98, 130.04, 132.61, 132.13, 128.91, 136.29, 143.88, 141.73, 142.08, 142.84, 138.97, 137.73, 146.11, 154.9, 150.62, 160.16, 146.49, 134.36, 154.03, 166, 173.12, 175.69, 174.34, 184, 193.82, 201.17, 210.66, 217.25, 237.19, 221.19, 234.67, 213.8, 200.88, 205.74, 220.77, 203.04, 235, 241.49, 262.68, 258.26, 286.89, 266.92, 254.75, 276.96, 275] },
      velocityScore: { '1D': -3.1, '1W': -33.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 66.3, revenueGrowth: 17, eps: 4.15, grossMargin: 39, dividendYield: 0.1,
      etfPresence: { POW: false, VOLT: 7.43, PBD: false, PBW: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 2, avgWeight: 3.27, proScore: 2.18, coverage: 0.667,
      price: 276.25, weeklyPrices: [285.00, 273.51, 302.85, 287.32, 276.25], weeklyChange: -3.07, sortRank: 0, periodReturns: { '1M': -4.3, '6M': 133.9, '1Y': 1264.2 },
      priceHistory: { '1W': [285, 273.51, 302.85, 287.32, 276.25], '1M': [288.64, 295.25, 285.47, 258.64, 261.03, 280.69, 289.76, 303.41, 275.95, 258.71, 261.34, 282.31, 307.88, 302.49, 302.4, 290.01, 285, 273.51, 302.85, 287.32, 276.25], '6M': [118.09, 108.99, 80.21, 90.18, 103.87, 136.87, 151.75, 152.31, 168.89, 148.7, 157.27, 174.77, 164.78, 154, 160.05, 145.88, 135.49, 146.78, 213.84, 229.75, 287.97, 285.47, 289.76, 282.31, 290.01, 276.25], '1Y': [20.25, 22.53, 21.5, 22.33, 24.24, 25.4, 24.99, 33.06, 37.39, 36.8, 45.11, 44.83, 54.8, 57.07, 67.26, 84.93, 70.32, 90.29, 86.87, 111.5, 101.42, 127.85, 136.86, 103.55, 93.38, 109.24, 119.18, 94.98, 88.82, 88.41, 103.05, 139.77, 151.75, 152.31, 168.89, 148.7, 157.27, 174.77, 164.78, 159.21, 156.58, 150.22, 132.45, 160.13, 210.06, 229.75, 287.97, 285.47, 289.76, 282.31, 290.01, 276.25] },
      velocityScore: { '1D': 3.8, '1W': -8.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$79B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: 4.45, PBD: false, PBW: 2.08 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'ETN', name: 'EATON CORP PLC', easyScore: 1, avgWeight: 5.57, proScore: 1.86, coverage: 0.333,
      price: 413.01, weeklyPrices: [400.60, 400.08, 417.62, 421.21, 413.01], weeklyChange: 3.1, sortRank: 0, periodReturns: { '1M': -2.2, '6M': 21.9, '1Y': 26.3 },
      priceHistory: { '1W': [400.6, 400.08, 417.62, 421.21, 413.01], '1M': [422.44, 410.86, 421.39, 399.15, 401.51, 401.53, 406.94, 408.1, 399.44, 381.87, 371.88, 379.69, 381.51, 391.35, 403.13, 401.94, 400.6, 400.08, 417.62, 421.21, 413.01], '6M': [338.93, 350.36, 315.95, 322.17, 322.26, 329.1, 337.59, 341.19, 362.53, 377.47, 380.38, 373.53, 354.46, 361.06, 363.95, 374.1, 357.67, 385.58, 395.06, 413.87, 410.77, 421.39, 406.94, 379.69, 401.94, 413.01], '1Y': [327.08, 325.71, 334.86, 348.14, 362.22, 360.62, 378.62, 384.9, 384.72, 360.16, 355.1, 345.38, 355.34, 349.03, 365.9, 374.5, 365.58, 373.46, 369.08, 373.3, 372.4, 383.09, 377.4, 354.07, 328.19, 345.89, 337.66, 331.98, 317.8, 321.45, 332.97, 332.38, 337.59, 341.19, 362.53, 377.47, 380.38, 373.53, 354.46, 355.79, 360.54, 375, 365.56, 400.44, 392.73, 413.87, 410.77, 421.39, 406.94, 379.69, 401.94, 413.01] },
      velocityScore: { '1D': -22.8, '1W': -42.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$160B', pe: 40.3, revenueGrowth: 17, eps: 10.24, grossMargin: 37, dividendYield: 1.04,
      etfPresence: { POW: false, VOLT: 5.57, PBD: false, PBW: false },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'PWR', name: 'QUANTA SERVICES INC', easyScore: 1, avgWeight: 5.52, proScore: 1.84, coverage: 0.333,
      price: 699.98, weeklyPrices: [711.73, 687.48, 706.06, 715.67, 699.98], weeklyChange: -1.65, sortRank: 0, periodReturns: { '1M': -7.6, '6M': 50.6, '1Y': 94.9 },
      priceHistory: { '1W': [711.73, 687.48, 706.06, 715.67, 699.98], '1M': [757.34, 771.61, 785.24, 750.73, 745, 765.81, 773.72, 780.08, 769.99, 723.03, 714.13, 709.93, 716.91, 723.44, 742.18, 730.1, 711.73, 687.48, 706.06, 715.67, 699.98], '6M': [464.84, 466.91, 421.31, 432.67, 435.82, 432.66, 463.49, 479.27, 488.6, 510.64, 519.31, 562.77, 568.38, 564.05, 571.64, 578.44, 549.02, 576.24, 591.82, 613.78, 628.6, 785.24, 773.72, 709.93, 730.1, 699.98], '1Y': [359.11, 355.78, 360.43, 379.47, 386.51, 383.78, 403.31, 407.22, 406.13, 387.35, 377.51, 378.21, 385.96, 372.5, 382.53, 388.58, 405.44, 421.17, 417.61, 433.85, 427.36, 453.83, 442.9, 426.93, 429.78, 464.88, 460.64, 438.11, 426.66, 431.03, 438.22, 444.2, 463.49, 479.27, 488.6, 510.64, 519.31, 562.77, 568.38, 567.71, 572, 573.5, 560.12, 582.06, 587.42, 613.78, 628.6, 785.24, 773.72, 709.93, 730.1, 699.98] },
      velocityScore: { '1D': -27.3, '1W': -49.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$105B', pe: 95.9, revenueGrowth: 26, eps: 7.3, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: false, VOLT: 5.52, PBD: false, PBW: false },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'AEP', name: 'AMERICAN ELECTRIC POWER CO INC', easyScore: 1, avgWeight: 4.12, proScore: 1.37, coverage: 0.333,
      price: 127.76, weeklyPrices: [126.67, 123.79, 127.11, 126.31, 127.76], weeklyChange: 0.86, sortRank: 0, periodReturns: { '1M': -5.1, '6M': 8.2, '1Y': 25.4 },
      priceHistory: { '1W': [126.67, 123.79, 127.11, 126.31, 127.76], '1M': [134.66, 137.04, 132.56, 131.76, 130.16, 131.94, 127.95, 128.6, 125.15, 127.68, 128.92, 128.87, 129.61, 131.59, 130.9, 127.76, 126.67, 123.79, 127.11, 126.31, 127.76], '6M': [118.04, 114.26, 115.58, 115.67, 114.07, 116.57, 119.22, 119.43, 120.67, 121.23, 127.27, 132.46, 133.52, 132.31, 133.62, 128.8, 131.08, 134.71, 134.39, 131.62, 134.44, 132.56, 127.95, 128.87, 127.76, 127.76], '1Y': [101.85, 101.94, 101.2, 102.35, 103.86, 105.34, 107.4, 108.97, 113.14, 113.73, 112.86, 113.14, 111.78, 108.11, 109.46, 107.06, 109.14, 114.06, 117.04, 117.53, 116.18, 121.89, 119.53, 121.48, 120.9, 123.77, 117.54, 114.13, 114.49, 115.77, 115.04, 116.62, 119.22, 119.43, 120.67, 121.23, 127.27, 132.46, 133.52, 131.26, 130.97, 128.3, 131.67, 137.15, 134.56, 131.62, 134.44, 132.56, 127.95, 128.87, 127.76, 127.76] },
      velocityScore: { '1D': 0, '1W': -29.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 18.9, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 3.01,
      etfPresence: { POW: false, VOLT: 4.12, PBD: false, PBW: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'AEIS', name: 'ADVANCED ENERGY INDUSTRIES INC', easyScore: 1, avgWeight: 4.07, proScore: 1.36, coverage: 0.333,
      price: 318.6, weeklyPrices: [302.18, 294.65, 312.28, 322.50, 318.60], weeklyChange: 5.43, sortRank: 0, periodReturns: { '1M': -17.7, '6M': 48.4, '1Y': 165.3 },
      priceHistory: { '1W': [302.18, 294.65, 312.28, 322.5, 318.6], '1M': [387.03, 345.63, 360.81, 351.94, 357.24, 339.42, 339.19, 344.6, 323.46, 309.06, 302.84, 313.05, 323.79, 324.86, 339.65, 317.08, 302.18, 294.65, 312.28, 322.5, 318.6], '6M': [214.65, 224.11, 208.77, 217.86, 227.65, 227.59, 250.95, 259.55, 263.03, 279.04, 321.34, 338.51, 330.54, 311.39, 315.91, 356.38, 322.71, 366.95, 374.32, 377.19, 361.39, 360.81, 339.19, 313.05, 317.08, 318.6], '1Y': [120.09, 127.72, 128.97, 133.84, 138.14, 140.73, 143.25, 140.91, 138.92, 146.5, 161.89, 148.07, 155.55, 153.74, 157.44, 174.35, 166.46, 173.86, 169.62, 191.98, 198.42, 205.61, 219.2, 202.82, 188.88, 211.19, 219.38, 215.07, 216.09, 217.26, 229.7, 233.92, 250.95, 259.55, 263.03, 279.04, 321.34, 338.51, 330.54, 314.84, 319.63, 342.87, 332.82, 374.98, 372.23, 377.19, 361.39, 360.81, 339.19, 313.05, 317.08, 318.6] },
      velocityScore: { '1D': 11.5, '1W': -24, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 66.2, revenueGrowth: 26, eps: 4.81, grossMargin: 39, dividendYield: 0.12,
      etfPresence: { POW: false, VOLT: 4.07, PBD: false, PBW: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'APH', name: 'AMPHENOL CORP', easyScore: 1, avgWeight: 4.06, proScore: 1.35, coverage: 0.333,
      price: 144.59, weeklyPrices: [148.76, 146.34, 148.40, 147.62, 144.59], weeklyChange: -2.8, sortRank: 0, periodReturns: { '1M': 2.5, '6M': 3.7, '1Y': 57.3 },
      priceHistory: { '1W': [148.76, 146.34, 148.4, 147.62, 144.59], '1M': [141.03, 136.69, 138.47, 136.62, 128.03, 127.87, 124.64, 129.19, 125, 121.72, 119.2, 123.05, 124.86, 132.06, 139.56, 147.68, 148.76, 146.34, 148.4, 147.62, 144.59], '6M': [139.46, 139.09, 129.61, 137.43, 139.88, 145.11, 152.33, 166.25, 147.06, 144.14, 147.73, 152.64, 132.75, 136.74, 135.12, 127.96, 126.35, 135.32, 146.98, 148.13, 148.38, 138.47, 124.64, 123.05, 147.68, 144.59], '1Y': [91.91, 93.07, 93.47, 96.98, 99.46, 98.76, 103.34, 104.46, 106.51, 108.55, 110.74, 108.81, 111.94, 110.45, 118.68, 123.94, 122.6, 122.22, 121.7, 125.65, 135.31, 139.11, 138.11, 135.25, 130.36, 140.9, 139.36, 129.24, 135.29, 136.9, 141.38, 148.97, 152.33, 166.25, 147.06, 144.14, 147.73, 152.64, 132.75, 134.54, 127.81, 128.73, 127.7, 137.68, 148.96, 148.13, 148.38, 138.47, 124.64, 123.05, 147.68, 144.59] },
      velocityScore: { '1D': 8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$178B', pe: 41.5, revenueGrowth: 58, eps: 3.48, grossMargin: 38, dividendYield: 0.68,
      etfPresence: { POW: false, VOLT: 4.06, PBD: false, PBW: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'GEV', name: 'GE VERNOVA INC', easyScore: 1, avgWeight: 3.94, proScore: 1.31, coverage: 0.333,
      price: 936.23, weeklyPrices: [968.32, 950.54, 969.67, 959.36, 936.23], weeklyChange: -3.31, sortRank: 0, periodReturns: { '1M': -12.8, '6M': 48.8, '1Y': 91.8 },
      priceHistory: { '1W': [968.32, 950.54, 969.67, 959.36, 936.23], '1M': [1073.95, 1095.21, 1118.96, 1045.63, 1040.15, 1071.98, 1062.57, 1090.53, 1049.23, 1012.25, 1011.8, 1024.52, 1043.82, 1038.74, 1070.47, 996, 968.32, 950.54, 969.67, 959.36, 936.23], '6M': [629.11, 704.2, 639.43, 663.46, 680.86, 639.77, 684.86, 692.7, 780.25, 790.79, 817.55, 876.01, 841.27, 839.2, 844.05, 909.41, 872.9, 936.07, 985.92, 1127.56, 1063.11, 1118.96, 1062.57, 1024.52, 996, 936.23], '1Y': [488.13, 483.47, 490.19, 506.81, 517.04, 539.16, 574.6, 623.97, 660.29, 645.86, 625.27, 606, 633.69, 582.08, 625.55, 624.17, 605.17, 594.99, 604.56, 600, 595.15, 574.07, 550.17, 558.17, 558.03, 599.77, 631.32, 671.71, 658.28, 663.46, 686.33, 652.09, 684.86, 692.7, 780.25, 790.79, 817.55, 876.01, 841.27, 847.65, 858.47, 923.69, 894.78, 968.02, 978.32, 1127.56, 1063.11, 1118.96, 1062.57, 1024.52, 996, 936.23] },
      velocityScore: { '1D': -27.6, '1W': -51.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$252B', pe: 27.3, revenueGrowth: 16, eps: 34.25, grossMargin: 20, dividendYield: 0.21,
      etfPresence: { POW: false, VOLT: 3.94, PBD: false, PBW: false },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'NEE', name: 'NEXTERA ENERGY INC', easyScore: 1, avgWeight: 3.91, proScore: 1.3, coverage: 0.333,
      price: 85.49, weeklyPrices: [87.01, 83.66, 85.68, 84.58, 85.49], weeklyChange: -1.75, sortRank: 0, periodReturns: { '1M': -10.5, '6M': 2.5, '1Y': 22.3 },
      priceHistory: { '1W': [87.01, 83.66, 85.68, 84.58, 85.49], '1M': [95.51, 96.28, 95.39, 93.32, 93.1, 94.59, 94.85, 95.68, 93.36, 89.04, 90.06, 88.27, 89.69, 88.55, 87.65, 87.25, 87.01, 83.66, 85.68, 84.58, 85.49], '6M': [83.39, 81.21, 80.85, 80.41, 81.32, 81.12, 83.51, 87.15, 88.82, 90.83, 91.22, 95.11, 92.6, 91.54, 92.53, 91.62, 92.88, 94.17, 91.24, 90, 94.17, 95.39, 94.85, 88.27, 87.25, 85.49], '1Y': [69.88, 73, 71.57, 70.99, 73.88, 74.4, 75.95, 71.97, 71.06, 72.58, 72.24, 76.08, 72.09, 70.9, 71.64, 71.08, 75.85, 80.06, 83.35, 84.53, 83.25, 81.64, 82, 83.99, 84.3, 86.29, 83.13, 81.65, 79.54, 80.27, 81.05, 81.64, 83.51, 87.15, 88.82, 90.83, 91.22, 95.11, 92.6, 91.66, 90.96, 91.16, 92.85, 94.48, 91.83, 90, 94.17, 95.39, 94.85, 88.27, 87.25, 85.49] },
      velocityScore: { '1D': -12.2, '1W': -38.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$178B', pe: 21.7, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.95,
      etfPresence: { POW: false, VOLT: 3.91, PBD: false, PBW: false },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'BLDP', name: 'Ballard Power Systems Inc', easyScore: 2, avgWeight: 1.89, proScore: 1.26, coverage: 0.667,
      price: 5.92, weeklyPrices: [6.29, 6.30, 6.38, 6.06, 5.92], weeklyChange: -5.8, sortRank: 0, periodReturns: { '1M': 80.1, '6M': 111.6, '1Y': 329.3 },
      priceHistory: { '1W': [6.29, 6.3, 6.38, 6.06, 5.92], '1M': [3.29, 4.33, 4.78, 4.7, 4.13, 4.16, 4.14, 4.13, 4.45, 4.33, 4.18, 4.76, 5.43, 5.54, 5.94, 6.19, 6.29, 6.3, 6.38, 6.06, 5.92], '6M': [2.8, 2.89, 2.63, 2.63, 2.76, 2.79, 2.64, 2.57, 2.32, 2.16, 2.13, 2.18, 2.15, 1.97, 2.68, 2.46, 2.42, 2.6, 3.07, 3.5, 3.32, 4.78, 4.14, 4.76, 6.19, 5.92], '1Y': [1.38, 1.68, 1.6, 1.51, 1.77, 1.87, 1.89, 2.1, 1.83, 1.85, 1.83, 1.89, 2.03, 1.99, 2.07, 2.74, 2.75, 3.53, 3.27, 3.63, 3.28, 3.44, 3.55, 3.19, 2.68, 2.84, 2.82, 2.72, 2.61, 2.57, 2.79, 2.77, 2.64, 2.57, 2.32, 2.16, 2.13, 2.18, 2.15, 2.15, 2.61, 2.54, 2.41, 2.64, 2.9, 3.5, 3.32, 4.78, 4.14, 4.76, 6.19, 5.92] },
      velocityScore: { '1D': 5.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2B', pe: null, revenueGrowth: 26, eps: -0.27, grossMargin: 11, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: 1.3, PBW: 2.47 },
      tonyNote: 'Ballard Power Systems is a hydrogen fuel cell technology company. It appears in Electrification ETFs as a long-duration bet on hydrogen as a zero-carbon fuel for heavy industry and transit. Revenue is small, the company is pre-profitability, and the weight is minimal — this is a thematic placeholder allocation, not a fundamental position.',
    },
    {
      ticker: 'OGE', name: 'OGE ENERGY CORP', easyScore: 1, avgWeight: 3.63, proScore: 1.21, coverage: 0.333,
      price: 47.02, weeklyPrices: [47.23, 45.66, 46.61, 46.40, 47.02], weeklyChange: -0.43, sortRank: 0, periodReturns: { '1M': -1.7, '6M': 8.1, '1Y': 7.5 },
      priceHistory: { '1W': [47.23, 45.66, 46.61, 46.4, 47.02], '1M': [47.84, 47.84, 47.73, 47.33, 47.35, 47.64, 47.34, 47.51, 46.27, 47.31, 48.05, 47.9, 48.1, 48.54, 48.41, 47.38, 47.23, 45.66, 46.61, 46.4, 47.02], '6M': [43.49, 42.62, 43.27, 42.78, 42.18, 42.49, 43.7, 43.86, 43.31, 45.04, 46.49, 48.41, 48.89, 47.59, 48.2, 47.02, 47.96, 49.32, 48.55, 46.04, 47.34, 47.73, 47.34, 47.9, 47.38, 47.02], '1Y': [43.76, 44.19, 43.88, 43.99, 44.48, 44.28, 44.54, 44.92, 45.42, 45.84, 45.67, 44.96, 44.63, 44.15, 44.47, 44.13, 45.73, 45.92, 45.79, 46.5, 46.19, 44.46, 44.08, 44.97, 44.13, 45.78, 43.38, 43.05, 42.5, 42.9, 42.59, 42.97, 43.7, 43.86, 43.31, 45.04, 46.49, 48.41, 48.89, 47.08, 47.78, 47.36, 48.26, 49.86, 48.62, 46.04, 47.34, 47.73, 47.34, 47.9, 47.38, 47.02] },
      velocityScore: { '1D': 33, '1W': -35.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 20.9, revenueGrowth: 1, eps: 2.25, grossMargin: 44, dividendYield: 3.66,
      etfPresence: { POW: false, VOLT: 3.63, PBD: false, PBW: false },
      tonyNote: 'OGE Energy is a regional Oklahoma utility held in Electrification ETFs. Revenue is regulated, dividend yield is the primary return driver, and the load growth thesis is less prominent than for AEP or NEE. The ETF allocation is defensive — utilities in electrification ETFs serve as yield anchors alongside the higher-growth infrastructure names.',
    },
    {
      ticker: 'MOD', name: 'MODINE MANUFACTURING CO', easyScore: 1, avgWeight: 3.6, proScore: 1.2, coverage: 0.333,
      price: 289.94, weeklyPrices: [278.91, 288.52, 306.89, 302.03, 289.94], weeklyChange: 3.95, sortRank: 0, periodReturns: { '1M': 11.6, '6M': 81.3, '1Y': 216.3 },
      priceHistory: { '1W': [278.91, 288.52, 306.89, 302.03, 289.94], '1M': [259.76, 271.6, 274.22, 269.65, 273, 276.27, 279.2, 292.16, 271.26, 247.13, 244.49, 257.33, 250.11, 260.52, 295.88, 270.7, 278.91, 288.52, 306.89, 302.03, 289.94], '6M': [159.91, 165.19, 133.92, 137.65, 140.44, 127.23, 136.36, 146.9, 199.48, 219.76, 217.53, 230.19, 209.93, 201.27, 196.09, 228.58, 216.71, 234.84, 238.14, 253.15, 233.39, 274.22, 279.2, 257.33, 270.7, 289.94], '1Y': [91.66, 94.15, 96.1, 101.75, 104.54, 91.91, 97.76, 97.87, 134.56, 135.15, 139.51, 134.89, 142.43, 135.19, 149.68, 154.95, 138.65, 147.61, 145.23, 153.79, 152.4, 153.2, 149.09, 128.73, 139.01, 162.13, 162.87, 139.88, 136.16, 136.19, 129.97, 127.07, 136.36, 146.9, 199.48, 219.76, 217.53, 230.19, 209.93, 200.63, 200.42, 232.89, 222.97, 241.52, 235.25, 253.15, 233.39, 274.22, 279.2, 257.33, 270.7, 289.94] },
      velocityScore: { '1D': 30.4, '1W': -27.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 127.7, revenueGrowth: 48, eps: 2.27, grossMargin: 23, dividendYield: null,
      etfPresence: { POW: false, VOLT: 3.6, PBD: false, PBW: false },
      tonyNote: 'Modine Manufacturing is a thermal management company — heat exchangers and liquid cooling systems for data centers and industrial applications. It holds a position in Industrials ETFs as a direct beneficiary of the AI server cooling challenge. Revenue grew materially as data center customers upgraded from air to liquid cooling; the growth runway remains substantial.',
    },
    {
      ticker: 'HYLN', name: 'Hyliion Holdings Corp', easyScore: 1, avgWeight: 3.56, proScore: 1.19, coverage: 0.333,
      price: 6.63, weeklyPrices: [6.99, 6.25, 6.79, 6.46, 6.63], weeklyChange: -5.08, sortRank: 0, periodReturns: { '1M': 214.5, '6M': 235.1, '1Y': 328.1 },
      priceHistory: { '1W': [6.99, 6.25, 6.79, 6.46, 6.63], '1M': [2.11, 2.31, 2.39, 2.47, 2.46, 2.68, 3.59, 3.69, 4.67, 4.2, 4.09, 4.09, 4.2, 5.99, 6.6, 7.19, 6.99, 6.25, 6.79, 6.46, 6.63], '6M': [1.98, 2.01, 1.82, 2, 1.92, 1.98, 2.07, 2.17, 2.15, 2.1, 2.08, 1.92, 2.03, 2.01, 1.93, 1.83, 1.76, 1.78, 1.94, 1.92, 1.79, 2.39, 3.59, 4.09, 7.19, 6.63], '1Y': [1.55, 1.59, 1.44, 1.37, 1.44, 1.46, 1.66, 1.75, 1.5, 1.49, 1.69, 1.58, 1.72, 1.76, 1.62, 1.98, 2.08, 2.11, 2.26, 2.07, 2.17, 2.3, 2.08, 1.68, 1.58, 1.88, 1.92, 1.94, 1.86, 1.93, 1.94, 2.08, 2.07, 2.17, 2.15, 2.1, 2.08, 1.92, 2.03, 2.07, 1.91, 1.89, 1.75, 1.81, 1.92, 1.92, 1.79, 2.39, 3.59, 4.09, 7.19, 6.63] },
      velocityScore: { '1D': 32.2, '1W': -38, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1B', pe: null, revenueGrowth: 479, eps: -0.3, grossMargin: 6, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 3.56 },
      tonyNote: 'Hyliion is a small-cap commercial truck powertrain electrification company. It holds a speculative position in Electrification ETFs on the heavy-duty vehicle decarbonization thesis. Revenue is early-stage and the path to profitability is long; the ETF weight is small, reflecting a lottery-ticket allocation to an electrification theme adjacent holding.',
    },
    {
      ticker: 'ETR', name: 'ENTERGY CORP', easyScore: 1, avgWeight: 3.52, proScore: 1.17, coverage: 0.333,
      price: 109.48, weeklyPrices: [109.05, 104.97, 107.60, 108.66, 109.48], weeklyChange: 0.39, sortRank: 0, periodReturns: { '1M': -5.9, '6M': 15.9, '1Y': 33.7 },
      priceHistory: { '1W': [109.05, 104.97, 107.6, 108.66, 109.48], '1M': [116.4, 117.36, 112.96, 112.02, 111.59, 112.93, 112.35, 112.9, 109.03, 109.58, 110.55, 111.93, 112.27, 112.4, 111.97, 109.62, 109.05, 104.97, 107.6, 108.66, 109.48], '6M': [94.46, 93.32, 92.21, 92.85, 92.55, 93.5, 94.75, 96.58, 97.35, 99.71, 102.39, 106.26, 106.49, 104.76, 106.07, 102.52, 112.36, 114.61, 114.95, 110.47, 114.67, 112.96, 112.35, 111.93, 109.62, 109.48], '1Y': [81.89, 82.15, 80.92, 81.86, 81.92, 81.75, 86.4, 88.15, 90.43, 90.53, 90.29, 89.22, 88.13, 87.75, 90.29, 88.67, 92.25, 95.39, 95.26, 95.84, 95.67, 96.05, 95.7, 94.42, 93.35, 97.52, 94.22, 92.35, 91.5, 93.13, 93.32, 94.37, 94.75, 96.58, 97.35, 99.71, 102.39, 106.26, 106.49, 103.82, 104.26, 102.76, 113.58, 117.44, 115.51, 110.47, 114.67, 112.96, 112.35, 111.93, 109.62, 109.48] },
      velocityScore: { '1D': null, '1W': -34.6, '1M': null, '6M': null }, isNew: true,
      marketCap: '$50B', pe: 27.9, revenueGrowth: 12, eps: 3.92, grossMargin: 47, dividendYield: 2.36,
      etfPresence: { POW: false, VOLT: 3.52, PBD: false, PBW: false },
      tonyNote: 'Entergy is a regulated utility operating in the Gulf Coast region, held in Electrification ETFs for income and load growth from industrial and data center customers. The dividend is well-covered and the rate base is growing as Louisiana and Texas attract manufacturing reshoring and technology infrastructure investment.',
    },
    {
      ticker: 'NVTS', name: 'Navitas Semiconductor Corp', easyScore: 1, avgWeight: 3.51, proScore: 1.17, coverage: 0.333,
      price: 30.25, weeklyPrices: [26.60, 24.86, 25.86, 30.84, 30.25], weeklyChange: 13.72, sortRank: 0, periodReturns: { '1M': 90, '6M': 220.1, '1Y': 346.2 },
      priceHistory: { '1W': [26.6, 24.86, 25.86, 30.84, 30.25], '1M': [15.92, 17.55, 16.68, 15.79, 18.2, 19.25, 21.17, 22.32, 21.32, 19.67, 19.43, 22.99, 24.38, 29.25, 31.79, 28.51, 26.6, 24.86, 25.86, 30.84, 30.25], '6M': [9.45, 9.18, 7.37, 7.4, 9.05, 10.43, 9.86, 9.56, 9.05, 8.79, 8.09, 9.88, 9.22, 8.68, 9.82, 9.28, 8.77, 9.55, 10.26, 18.47, 15.48, 16.68, 21.17, 22.99, 28.51, 30.25], '1Y': [6.78, 7.96, 7, 6.61, 6.44, 5.84, 6.79, 8.98, 7.33, 6.79, 7.25, 6.21, 6.04, 5.6, 6.17, 7.01, 6.43, 7.82, 8.23, 14.66, 13.61, 12.56, 8.84, 7.91, 7.55, 8.74, 9.48, 8.59, 7.81, 7.21, 10.19, 9.45, 9.86, 9.56, 9.05, 8.79, 8.09, 9.88, 9.22, 10.84, 9.06, 9.48, 8.54, 9.42, 12.37, 18.47, 15.48, 16.68, 21.17, 22.99, 28.51, 30.25] },
      velocityScore: { '1D': null, '1W': -29.5, '1M': null, '6M': null }, isNew: true,
      marketCap: '$7B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 3.51 },
      tonyNote: 'Navitas Semiconductor is a small-cap wide-bandgap power semiconductor name — gallium nitride and silicon carbide for fast charging and EV applications. The $26.60 share price and small market cap position it as a speculative holding in ETFs willing to take higher-risk bets on next-generation power conversion.',
    },
    {
      ticker: 'ET', name: 'ENERGY TRANSFER LP', easyScore: 1, avgWeight: 3.46, proScore: 1.15, coverage: 0.333,
      price: 19.61, weeklyPrices: [19.17, 19.27, 19.54, 19.55, 19.61], weeklyChange: 2.32, sortRank: 0, periodReturns: { '1M': -2.3, '6M': 16.8, '1Y': 11.9 },
      priceHistory: { '1W': [19.17, 19.27, 19.54, 19.55, 19.61], '1M': [20.08, 20.39, 19.87, 19.92, 19.34, 20, 20.1, 20.36, 20.15, 20.19, 20.39, 20.16, 20.01, 20.07, 19.6, 19.42, 19.17, 19.27, 19.54, 19.55, 19.61], '6M': [16.8, 16.41, 16.21, 16.25, 16.42, 17.15, 17.44, 17.95, 18.41, 18.11, 18.86, 18.59, 18.76, 18.3, 18.79, 19.21, 19.3, 19.08, 18.71, 19.07, 19.76, 19.87, 20.1, 20.16, 19.42, 19.61], '1Y': [17.53, 18.25, 17.88, 18.18, 17.97, 17.46, 17.47, 17.72, 18.04, 17.62, 17.38, 17.46, 17.66, 17.39, 17.45, 17.3, 17.46, 16.8, 16.29, 16.45, 16.85, 16.77, 16.87, 16.63, 16.64, 16.71, 16.8, 16.56, 16.39, 16.27, 16.25, 17.4, 17.44, 17.95, 18.41, 18.11, 18.86, 18.59, 18.76, 18.75, 18.66, 19.14, 19.02, 19.09, 18.87, 19.07, 19.76, 19.87, 20.1, 20.16, 19.42, 19.61] },
      velocityScore: { '1D': null, '1W': -32.4, '1M': null, '6M': null }, isNew: true,
      marketCap: '$67B', pe: 16.3, revenueGrowth: 32, eps: 1.2, grossMargin: 19, dividendYield: 6.83,
      etfPresence: { POW: false, VOLT: 3.46, PBD: false, PBW: false },
      tonyNote: 'Energy Transfer is a midstream pipeline MLP held in Electrification ETFs for its natural gas infrastructure exposure — power plants running on natural gas are a key bridge fuel for data center load growth in states where renewables cannot meet baseload demand. High dividend yield and steady fee-based revenue make it an income-oriented allocation.',
    },
    {
      ticker: 'FCEL', name: 'FuelCell Energy Inc', easyScore: 1, avgWeight: 3.4, proScore: 1.13, coverage: 0.333,
      price: 21.18, weeklyPrices: [21.66, 21.31, 24.64, 21.81, 21.18], weeklyChange: -2.19, sortRank: 0, periodReturns: { '1M': 62.7, '6M': 162.8, '1Y': 275.6 },
      priceHistory: { '1W': [21.66, 21.31, 24.64, 21.81, 21.18], '1M': [13.02, 13.55, 12.81, 12.28, 13.7, 17.09, 19.92, 21.6, 21.36, 17.74, 17.36, 20.22, 26.38, 25.01, 24.4, 24.39, 21.66, 21.31, 24.64, 21.81, 21.18], '6M': [8.06, 8.75, 9.64, 8.48, 8.24, 7.55, 8.64, 9.59, 7.72, 7.42, 7.43, 8.6, 8.57, 7.05, 7.03, 6.94, 6.53, 6.41, 7.53, 11.8, 13.64, 12.81, 19.92, 20.22, 24.39, 21.18], '1Y': [5.64, 6.64, 6.08, 5.96, 5.5, 5.37, 5.31, 5.66, 4.96, 4.34, 4.23, 3.98, 4.34, 4.05, 6.87, 8.36, 7.9, 10.21, 9.26, 8.48, 7.77, 7.73, 7.72, 7.04, 6.28, 6.71, 8.37, 8.76, 8.34, 8.16, 8.3, 7.52, 8.64, 9.59, 7.72, 7.42, 7.43, 8.6, 8.57, 7.11, 6.79, 7.1, 6.46, 6.55, 7.35, 11.8, 13.64, 12.81, 19.92, 20.22, 24.39, 21.18] },
      velocityScore: { '1D': 21.5, '1W': -38.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1B', pe: null, revenueGrowth: 61, eps: -6.49, grossMargin: -16, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 3.4 },
      tonyNote: 'FuelCell Energy Inc appears in 1 of 3 Electrification ETFs (33% coverage) with average weight 3.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HUBB', name: 'HUBBELL INC', easyScore: 1, avgWeight: 3.3, proScore: 1.1, coverage: 0.333,
      price: 476.4, weeklyPrices: [473.61, 462.93, 480.46, 484.91, 476.40], weeklyChange: 0.59, sortRank: 0, periodReturns: { '1M': -7.7, '6M': 8.8, '1Y': 21.9 },
      priceHistory: { '1W': [473.61, 462.93, 480.46, 484.91, 476.4], '1M': [516, 507.81, 502.34, 493.04, 492.58, 485.98, 483.79, 482.03, 479.97, 470.87, 461.5, 463.32, 460.98, 475.01, 478.05, 473.93, 473.61, 462.93, 480.46, 484.91, 476.4], '6M': [437.71, 462.82, 434.85, 454.94, 465.48, 472.88, 472.54, 484.14, 503.86, 503.1, 522.3, 527.9, 490.78, 478.06, 471.22, 505.62, 490.74, 527.21, 526.94, 549.75, 545.93, 502.34, 483.79, 463.32, 473.93, 476.4], '1Y': [390.72, 388.99, 398.73, 405.26, 414.84, 419.24, 430.28, 437.5, 437.48, 417.84, 437.67, 427.57, 445.8, 436.04, 437.43, 441.44, 425.22, 413, 408.46, 425.71, 433.27, 469.96, 461.47, 437.65, 407.36, 431.43, 440.53, 448, 442.51, 451.39, 477.46, 481.68, 472.54, 484.14, 503.86, 503.1, 522.3, 527.9, 490.78, 477.97, 477.47, 503.2, 500.38, 534.67, 521.71, 549.75, 545.93, 502.34, 483.79, 463.32, 473.93, 476.4] },
      velocityScore: { '1D': -27.6, '1W': -48.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 28.2, revenueGrowth: 11, eps: 16.92, grossMargin: 36, dividendYield: 1.17,
      etfPresence: { POW: false, VOLT: 3.3, PBD: false, PBW: false },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'NVT', name: 'NVENT ELECTRIC PLC', easyScore: 1, avgWeight: 3.29, proScore: 1.1, coverage: 0.333,
      price: 170.29, weeklyPrices: [166.99, 171.55, 173.39, 176.39, 170.29], weeklyChange: 1.98, sortRank: 0, periodReturns: { '1M': 4.7, '6M': 57.3, '1Y': 156.7 },
      priceHistory: { '1W': [166.99, 171.55, 173.39, 176.39, 170.29], '1M': [162.69, 169.41, 172.49, 166.73, 169.95, 170.74, 172.91, 173.96, 169.01, 160.69, 158.23, 161.86, 163.57, 164.66, 169.29, 164.87, 166.99, 171.55, 173.39, 176.39, 170.29], '6M': [108.27, 109.15, 98.28, 104.18, 106.61, 106.39, 109.9, 113.16, 119.43, 112.15, 115.65, 121.8, 113.83, 109.13, 114.71, 125.61, 118.28, 127.11, 131.38, 140.13, 137.37, 172.49, 172.91, 161.86, 164.87, 170.29], '1Y': [66.35, 68.6, 70.47, 73.13, 74.91, 74.87, 75.91, 77.09, 78.42, 89.1, 89.8, 88.02, 92.58, 92.8, 94.78, 98.99, 97, 97.8, 95.98, 99.33, 100.62, 104.35, 109.97, 105.92, 101.52, 107.27, 107.72, 101.71, 101.54, 103.26, 110.09, 106.64, 109.9, 113.16, 119.43, 112.15, 115.65, 121.8, 113.83, 111.09, 120.27, 127.01, 121.26, 128.63, 129.7, 140.13, 137.37, 172.49, 172.91, 161.86, 164.87, 170.29] },
      velocityScore: { '1D': -38.5, '1W': -54.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$28B', pe: 57.7, revenueGrowth: 54, eps: 2.95, grossMargin: 37, dividendYield: 0.48,
      etfPresence: { POW: false, VOLT: 3.29, PBD: false, PBW: false },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.01, proScore: 2.5, coverage: 0.5,
      price: 913.37, weeklyPrices: [875.87, 865.36, 909.81, 926.18, 913.37], weeklyChange: 4.28, sortRank: 0, periodReturns: { '1M': 4.4, '6M': 52.4, '1Y': 161.5 },
      priceHistory: { '1W': [875.87, 865.36, 909.81, 926.18, 913.37], '1M': [874.78, 904.59, 926.93, 895.69, 897.45, 912.14, 902.3, 920.22, 888.31, 863.95, 860.15, 872.56, 865.95, 879.89, 908.55, 887.67, 875.87, 865.36, 909.81, 926.18, 913.37], '6M': [599.15, 625.61, 565.83, 583, 616.1, 629.77, 629, 638.91, 702.89, 742.37, 751.97, 766.61, 731.97, 716.68, 702, 716.63, 708.46, 771.58, 770.17, 808.87, 810.05, 926.93, 902.3, 872.56, 887.67, 913.37], '1Y': [349.33, 363.14, 359.8, 381.88, 397.86, 405.92, 413.71, 429.52, 438.02, 417.12, 417.5, 417.89, 434.91, 423.08, 431.52, 466.54, 465.76, 497.85, 491.3, 527.08, 520.5, 583.15, 569.78, 553.55, 546.13, 575.76, 603.17, 597.89, 576.22, 578.61, 623.09, 636.53, 629, 638.91, 702.89, 742.37, 751.97, 766.61, 731.97, 707.59, 693.62, 719.04, 730.32, 787.07, 772.66, 808.87, 810.05, 926.93, 902.3, 872.56, 887.67, 913.37] },
      velocityScore: { '1D': 28.2, '1W': 10.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$421B', pe: 45.4, revenueGrowth: 22, eps: 20.1, grossMargin: 29, dividendYield: 0.65,
      etfPresence: { AIRR: false, PRN: 3.3, RSHO: 6.72, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'TKR', name: 'TKR', easyScore: 1, avgWeight: 8.99, proScore: 2.25, coverage: 0.25,
      price: 131.72, weeklyPrices: [127.98, 126.54, 131.90, 131.82, 131.72], weeklyChange: 2.92, sortRank: 0, periodReturns: { '1M': 23, '6M': 59.2, '1Y': 86.6 },
      priceHistory: { '1W': [127.98, 126.54, 131.9, 131.82, 131.72], '1M': [107.12, 109.63, 119.7, 116.34, 117.97, 117.12, 115.74, 116.74, 114.49, 112.73, 109.36, 117.2, 118.93, 119.95, 127.42, 126.78, 127.98, 126.54, 131.9, 131.82, 131.72], '6M': [82.76, 88.71, 84.92, 86.52, 88.34, 90.83, 90.65, 93.89, 96.14, 109.41, 107.23, 107.69, 105.59, 102.18, 98.59, 101.03, 100.57, 105.88, 103.73, 106.79, 106.53, 119.7, 115.74, 117.2, 126.78, 131.72], '1Y': [70.59, 72.24, 70.6, 74.03, 76.67, 78.07, 79.16, 80.76, 76.09, 73.91, 77.08, 75.32, 78.21, 77.78, 77.51, 77.5, 75.55, 76.54, 70.79, 73.17, 77.71, 78.68, 77.95, 77.85, 74.55, 81.39, 83.21, 87.38, 85.26, 86.33, 90.95, 91.68, 90.65, 93.89, 96.14, 109.41, 107.23, 107.69, 105.59, 103.33, 98.23, 101.9, 102.06, 106.92, 103.92, 106.79, 106.53, 119.7, 115.74, 117.2, 126.78, 131.72] },
      velocityScore: { '1D': 28.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 29.9, revenueGrowth: 8, eps: 4.4, grossMargin: 31, dividendYield: 1.09,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.99, IDEF: false, BILT: false },
      tonyNote: 'TKR appears in 1 of 4 Industrials ETFs (25% coverage) with average weight 9.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'POWL', name: 'POWL', easyScore: 1, avgWeight: 8.08, proScore: 2.02, coverage: 0.25,
      price: 292.19, weeklyPrices: [284.42, 288.12, 299.07, 299.73, 292.19], weeklyChange: 2.73, sortRank: 0, periodReturns: { '1M': 8.2, '6M': 160.2, '1Y': 394 },
      priceHistory: { '1W': [284.42, 288.12, 299.07, 299.73, 292.19], '1M': [269.95, 294.69, 320.3, 305.93, 309.39, 308.05, 300.84, 296.98, 292.65, 266.8, 261.58, 271.05, 270.75, 279.22, 291.97, 288.9, 284.42, 288.12, 299.07, 299.73, 292.19], '6M': [112.31, 120.91, 109.59, 113.62, 120.46, 128.85, 142.76, 147.43, 151.08, 190.09, 180.99, 183, 170.96, 176.51, 174.04, 186.82, 180.36, 218.07, 229.73, 242.77, 253.49, 320.3, 300.84, 271.05, 288.9, 292.19], '1Y': [59.14, 64.27, 59.64, 66.46, 72.55, 70.87, 76.08, 80.05, 79.03, 77.8, 85.17, 83.64, 90.42, 89.41, 95.89, 99.1, 96.99, 101.35, 100.35, 110.24, 113.88, 125.9, 125, 109.4, 98.12, 107.74, 114.04, 112.36, 110.97, 111.96, 120, 133.04, 142.76, 147.43, 151.08, 190.09, 180.99, 183, 170.96, 171.73, 167.41, 194.85, 184.68, 230.81, 232.81, 242.77, 253.49, 320.3, 300.84, 271.05, 288.9, 292.19] },
      velocityScore: { '1D': -4.7, '1W': 8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 57, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.08, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'CGNX', name: 'CGNX', easyScore: 1, avgWeight: 7.55, proScore: 1.89, coverage: 0.25,
      price: 65.39, weeklyPrices: [65.85, 64.64, 66.08, 66.06, 65.39], weeklyChange: -0.7, sortRank: 0, periodReturns: { '1M': 16.1, '6M': 68.1, '1Y': 119.3 },
      priceHistory: { '1W': [65.85, 64.64, 66.08, 66.06, 65.39], '1M': [56.3, 58.83, 62.26, 65.92, 65.66, 65.68, 63.64, 66.09, 64.26, 61.91, 60.65, 63.37, 64.27, 66.09, 68.33, 66.01, 65.85, 64.64, 66.08, 66.06, 65.39], '6M': [38.9, 36.88, 36.17, 36.55, 37.37, 39.43, 38.92, 39.46, 40.85, 43.58, 56.72, 57.42, 53.17, 50.58, 50.12, 51.01, 48.99, 53.78, 54.64, 54.03, 53.52, 62.26, 63.64, 63.37, 66.01, 65.39], '1Y': [29.82, 30.84, 29.97, 31.6, 32.52, 34.34, 34.07, 34.17, 40.77, 41.36, 43.52, 42.74, 44.03, 44.94, 44.39, 46.48, 45.79, 46.3, 40.78, 46.04, 48.04, 41.31, 39.54, 37.05, 34.86, 38.1, 38.42, 35.65, 36.8, 36.47, 38.6, 39.63, 38.92, 39.46, 40.85, 43.58, 56.72, 57.42, 53.17, 50.99, 49.87, 51.61, 49.34, 53.91, 54.97, 54.03, 53.52, 62.26, 63.64, 63.37, 66.01, 65.39] },
      velocityScore: { '1D': 26, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 76.9, revenueGrowth: 24, eps: 0.85, grossMargin: 68, dividendYield: 0.51,
      etfPresence: { AIRR: false, PRN: false, RSHO: 7.55, IDEF: false, BILT: false },
      tonyNote: 'CGNX appears in 1 of 4 Industrials ETFs (25% coverage) with average weight 7.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 7.35, proScore: 1.84, coverage: 0.25,
      price: 179.12, weeklyPrices: [179.66, 174.41, 174.26, 172.55, 179.12], weeklyChange: -0.3, sortRank: 0, periodReturns: { '1M': 3.6, '6M': 4.6, '1Y': 29.3 },
      priceHistory: { '1W': [179.66, 174.41, 174.26, 172.55, 179.12], '1M': [172.9, 172.87, 176.74, 176.78, 176.09, 178.89, 178.11, 175.68, 171.18, 175.95, 174.49, 174.85, 175.98, 177.01, 178.97, 178.96, 179.66, 174.41, 174.26, 172.55, 179.12], '6M': [171.31, 177.42, 178.29, 185.17, 188.26, 193.85, 196.36, 201.28, 203.5, 195.19, 204.81, 195.98, 208.82, 207, 203.33, 194, 192.9, 203.48, 198.39, 180.91, 172.79, 176.74, 178.11, 174.85, 178.96, 179.12], '1Y': [138.55, 141.81, 145.87, 142.67, 145.75, 146.87, 151.5, 155.22, 157.57, 155.76, 155.08, 156.32, 160.66, 157.52, 155.85, 158.24, 163.35, 166.58, 157.7, 157.95, 179.44, 177.42, 175.1, 173.96, 172.73, 174.91, 171.1, 178.66, 182.01, 184.42, 190.4, 194.08, 196.36, 201.28, 203.5, 195.19, 204.81, 195.98, 208.82, 207.26, 204.56, 195, 194.72, 203.19, 195.85, 180.91, 172.79, 176.74, 178.11, 174.85, 178.96, 179.12] },
      velocityScore: { '1D': 26.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$241B', pe: 33.6, revenueGrowth: 9, eps: 5.33, grossMargin: 20, dividendYield: 1.61,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 7.35, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 4 Industrials ETFs (25% coverage) with average weight 7.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LMT', name: 'LOCKHEED MARTIN CORP', easyScore: 1, avgWeight: 6.59, proScore: 1.65, coverage: 0.25,
      price: 519.87, weeklyPrices: [530.45, 516.50, 513.43, 512.03, 519.87], weeklyChange: -1.99, sortRank: 0, periodReturns: { '1M': 0.3, '6M': 16, '1Y': 7.8 },
      priceHistory: { '1W': [530.45, 516.5, 513.43, 512.03, 519.87], '1M': [518.15, 508.93, 514.26, 512.41, 506.51, 521, 519.94, 520.41, 516.01, 528.31, 526.63, 522.59, 522.79, 533.24, 532.9, 537.21, 530.45, 516.5, 513.43, 512.03, 519.87], '6M': [448.35, 474.88, 470.14, 483.03, 511.57, 551.24, 576.06, 594.95, 628.26, 629.56, 649.81, 647.5, 664.48, 651.22, 636.33, 610.17, 604.39, 628.5, 611.1, 555.43, 509.81, 514.26, 519.94, 522.59, 537.21, 519.87], '1Y': [482.21, 456.6, 468.6, 457.9, 462.52, 467.51, 463.96, 420.55, 420.98, 430.75, 437.32, 447.2, 456.18, 463.9, 471.31, 472.94, 487.44, 504.49, 505.05, 495.15, 488.05, 489.72, 468.92, 455.85, 468.26, 457.86, 452.2, 480.25, 474.13, 488.87, 522.04, 558.3, 576.06, 594.95, 628.26, 629.56, 649.81, 647.5, 664.48, 649.47, 642.28, 624.2, 617.64, 623.87, 607.49, 555.43, 509.81, 514.26, 519.94, 522.59, 537.21, 519.87] },
      velocityScore: { '1D': 27.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$120B', pe: 25.2, revenueGrowth: 0, eps: 20.63, grossMargin: 10, dividendYield: 2.7,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 6.59, BILT: false },
      tonyNote: 'LOCKHEED MARTIN CORP appears in 1 of 4 Industrials ETFs (25% coverage) with average weight 6.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TTMI', name: 'TTM Technologies Inc', easyScore: 1, avgWeight: 5.94, proScore: 1.49, coverage: 0.25,
      price: 178.56, weeklyPrices: [173.72, 172.44, 179.62, 189.60, 178.56], weeklyChange: 2.79, sortRank: 0, periodReturns: { '1M': 13.4, '6M': 145.1, '1Y': 451.6 },
      priceHistory: { '1W': [173.72, 172.44, 179.62, 189.6, 178.56], '1M': [157.47, 159.58, 164.64, 153.77, 157.31, 163.36, 168.82, 171.87, 167.35, 158.86, 161.41, 169.36, 174.55, 189.92, 196.95, 187.79, 173.72, 172.44, 179.62, 189.6, 178.56], '6M': [72.84, 80.24, 67.09, 71.72, 67.99, 77.89, 97.83, 94.61, 107.57, 93.77, 93.97, 108.86, 105.14, 96.43, 97.54, 106.99, 97.42, 105.85, 116.6, 126.71, 137.5, 164.64, 168.82, 169.36, 187.79, 178.56], '1Y': [32.37, 36.58, 36.97, 39.86, 44.02, 44.11, 45.03, 44.27, 47.25, 43.36, 42.62, 40.78, 46.9, 47.7, 46.77, 52.12, 55.78, 59.18, 53.58, 57.16, 58.4, 61.98, 68.11, 63.1, 58.45, 70.18, 73.74, 73.43, 70.38, 71.21, 70.45, 93.24, 97.83, 94.61, 107.57, 93.77, 93.97, 108.86, 105.14, 95.44, 95.31, 108, 97.08, 107.53, 116.93, 126.71, 137.5, 164.64, 168.82, 169.36, 187.79, 178.56] },
      velocityScore: { '1D': 31.9, '1W': -64.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 97, revenueGrowth: 30, eps: 1.84, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 5.94, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'TTM Technologies is a printed circuit board manufacturer held in Industrials ETFs. Revenue growth tracks data center and defense electronics demand. PCB manufacturing is essential hardware infrastructure; TTM\'s position in AI server and high-frequency trading hardware gives it exposure to two durable growth verticals.',
    },
    {
      ticker: 'ETN', name: 'ETN', easyScore: 1, avgWeight: 5.85, proScore: 1.46, coverage: 0.25,
      price: 413.01, weeklyPrices: [400.60, 400.08, 417.62, 421.21, 413.01], weeklyChange: 3.1, sortRank: 0, periodReturns: { '1M': -2.2, '6M': 21.9, '1Y': 26.3 },
      priceHistory: { '1W': [400.6, 400.08, 417.62, 421.21, 413.01], '1M': [422.44, 410.86, 421.39, 399.15, 401.51, 401.53, 406.94, 408.1, 399.44, 381.87, 371.88, 379.69, 381.51, 391.35, 403.13, 401.94, 400.6, 400.08, 417.62, 421.21, 413.01], '6M': [338.93, 350.36, 315.95, 322.17, 322.26, 329.1, 337.59, 341.19, 362.53, 377.47, 380.38, 373.53, 354.46, 361.06, 363.95, 374.1, 357.67, 385.58, 395.06, 413.87, 410.77, 421.39, 406.94, 379.69, 401.94, 413.01], '1Y': [327.08, 325.71, 334.86, 348.14, 362.22, 360.62, 378.62, 384.9, 384.72, 360.16, 355.1, 345.38, 355.34, 349.03, 365.9, 374.5, 365.58, 373.46, 369.08, 373.3, 372.4, 383.09, 377.4, 354.07, 328.19, 345.89, 337.66, 331.98, 317.8, 321.45, 332.97, 332.38, 337.59, 341.19, 362.53, 377.47, 380.38, 373.53, 354.46, 355.79, 360.54, 375, 365.56, 400.44, 392.73, 413.87, 410.77, 421.39, 406.94, 379.69, 401.94, 413.01] },
      velocityScore: { '1D': 28.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$160B', pe: 40.3, revenueGrowth: 17, eps: 10.24, grossMargin: 37, dividendYield: 1.04,
      etfPresence: { AIRR: false, PRN: false, RSHO: 5.85, IDEF: false, BILT: false },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 2, avgWeight: 2.88, proScore: 1.44, coverage: 0.5,
      price: 42.5, weeklyPrices: [51.14, 46.46, 48.09, 43.13, 42.50], weeklyChange: -16.89, sortRank: 0, periodReturns: { '1M': 10.3, '6M': 228.4, '1Y': 965.2 },
      priceHistory: { '1W': [51.14, 46.46, 48.09, 43.13, 42.5], '1M': [38.54, 37.13, 39.69, 35.24, 39.04, 40.68, 40.74, 43.04, 41.62, 41.61, 41.59, 42.66, 42.48, 44.35, 48.32, 51.4, 51.14, 46.46, 48.09, 43.13, 42.5], '6M': [12.94, 17.47, 17.49, 19.36, 21.39, 25.44, 28, 28.07, 23.95, 22.79, 23.74, 24.63, 26, 25.4, 27.08, 31.83, 27.95, 36.55, 34.41, 39.47, 34.08, 39.69, 40.74, 42.66, 51.4, 42.5], '1Y': [3.99, 5.43, 5.11, 6.06, 6.85, 6.14, 6.79, 6.84, 6.25, 6.27, 6.82, 6.48, 7.21, 6.53, 9.78, 11.11, 12.2, 15.31, 14.7, 13.11, 12.95, 12.86, 12.46, 11.41, 11.23, 11.9, 12.77, 18.24, 19.18, 19.87, 21.84, 25.32, 28, 28.07, 23.95, 22.79, 23.74, 24.63, 26, 25.44, 24.81, 35.37, 30.71, 34.23, 39.89, 39.47, 34.08, 39.69, 40.74, 42.66, 51.4, 42.5] },
      velocityScore: { '1D': 9.9, '1W': -62, '1M': null, '6M': null }, isNew: false,
      marketCap: '$15B', pe: null, revenueGrowth: 41, eps: -0.8, grossMargin: 56, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 4.63, RSHO: false, IDEF: 1.14, BILT: false },
      tonyNote: 'Planet Labs is a satellite earth observation company. It holds a speculative position in Industrials ETFs as a data infrastructure name — providing satellite imagery and analytics that support agricultural, energy, and government decision-making. Revenue is growing from a small base; the ETF weight is minimal and the position is thematic.',
    },
    {
      ticker: 'GTES', name: 'GTES', easyScore: 1, avgWeight: 5.57, proScore: 1.39, coverage: 0.25,
      price: 25.88, weeklyPrices: [25.92, 25.85, 26.51, 26.03, 25.88], weeklyChange: -0.17, sortRank: 0, periodReturns: { '1M': 5, '6M': 17.3, '1Y': 20.8 },
      priceHistory: { '1W': [25.92, 25.85, 26.51, 26.03, 25.88], '1M': [24.64, 24.57, 26.24, 25.98, 26.09, 25.68, 25.38, 25.67, 24.4, 24.09, 23.45, 24.18, 24.07, 24.48, 25.34, 25.48, 25.92, 25.85, 26.51, 26.03, 25.88], '6M': [22.06, 22.34, 21.44, 21.97, 22.46, 22.45, 22.48, 22.72, 23.76, 26.76, 27.13, 27.51, 26.24, 24.27, 23.24, 22.95, 22.61, 24.51, 24.91, 25.53, 24.84, 26.24, 25.38, 24.18, 25.48, 25.88], '1Y': [21.42, 22.16, 21.95, 22.9, 24.01, 24.44, 24.71, 24.96, 24.8, 23.88, 24.52, 24.29, 26.14, 25.93, 25.62, 25.29, 24.9, 25.74, 24.45, 25.93, 26.05, 21.86, 21.53, 22.47, 21.18, 22.76, 21.84, 21.91, 21.61, 21.83, 23, 22.41, 22.48, 22.72, 23.76, 26.76, 27.13, 27.51, 26.24, 23.87, 22.85, 23.64, 23.07, 25.41, 24.86, 25.53, 24.84, 26.24, 25.38, 24.18, 25.48, 25.88] },
      velocityScore: { '1D': 26.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: 27.2, revenueGrowth: 0, eps: 0.95, grossMargin: 40, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: 5.57, IDEF: false, BILT: false },
      tonyNote: 'GTES appears in 1 of 4 Industrials ETFs (25% coverage) with average weight 5.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'UNP', name: 'UNION PACIFIC CORP', easyScore: 1, avgWeight: 5.52, proScore: 1.38, coverage: 0.25,
      price: 268.05, weeklyPrices: [262.64, 263.50, 264.68, 262.13, 268.05], weeklyChange: 2.06, sortRank: 0, periodReturns: { '1M': 1.8, '6M': 13, '1Y': 21.4 },
      priceHistory: { '1W': [262.64, 263.5, 264.68, 262.13, 268.05], '1M': [263.41, 264.01, 268.23, 264.89, 264.65, 265.6, 264.65, 269.34, 270.56, 275.13, 271.56, 265.8, 265.44, 265.88, 271.1, 267, 262.64, 263.5, 264.68, 262.13, 268.05], '6M': [237.29, 236.12, 234.42, 233.44, 231.97, 229.5, 221.69, 232.55, 241.49, 261.32, 265, 264.25, 266.7, 250.21, 242.32, 239.67, 242.62, 249.11, 248.03, 249.4, 264.78, 268.23, 264.65, 265.8, 267, 268.05], '1Y': [220.87, 225.72, 222.01, 229.39, 236.28, 235.1, 224.87, 220.52, 221.97, 222.66, 221.52, 225.3, 222.35, 220.31, 214.91, 220.61, 235.2, 236.8, 225.45, 226.04, 220.04, 218.83, 217.99, 221.48, 221.21, 231.83, 235.31, 239.95, 234.23, 234.53, 233.62, 229.29, 221.69, 232.55, 241.49, 261.32, 265, 264.25, 266.7, 251.11, 236.57, 241.33, 243.12, 251.15, 251.07, 249.4, 264.78, 268.23, 264.65, 265.8, 267, 268.05] },
      velocityScore: { '1D': 24.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$159B', pe: 22, revenueGrowth: 3, eps: 12.16, grossMargin: 57, dividendYield: 2.11,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: false, BILT: 5.52 },
      tonyNote: 'UNION PACIFIC CORP appears in 1 of 4 Industrials ETFs (25% coverage) with average weight 5.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GD', name: 'GENERAL DYNAMICS CORP', easyScore: 1, avgWeight: 5.46, proScore: 1.36, coverage: 0.25,
      price: 341.94, weeklyPrices: [346.82, 339.20, 337.61, 337.04, 341.94], weeklyChange: -1.41, sortRank: 0, periodReturns: { '1M': -2, '6M': 0.1, '1Y': 24.3 },
      priceHistory: { '1W': [346.82, 339.2, 337.61, 337.04, 341.94], '1M': [349.08, 349.16, 347.27, 347.76, 346.53, 346.46, 341.36, 340.62, 334.5, 343.11, 340.14, 339.75, 338.71, 342.89, 344.64, 348.96, 346.82, 339.2, 337.61, 337.04, 341.94], '6M': [341.7, 341.48, 337.34, 342.2, 355.56, 360.94, 359.17, 366.62, 355.31, 358.83, 349.49, 343.14, 366.12, 355.59, 356.29, 346.23, 343.22, 350.02, 338.88, 320.74, 338.73, 347.27, 341.36, 339.75, 348.96, 341.94], '1Y': [275.03, 275.83, 278.53, 291.39, 294.76, 302.2, 298.98, 314.24, 311.61, 312.73, 315.84, 316.53, 324.91, 322.86, 326.15, 324.08, 330.34, 343.62, 332.94, 331.15, 341.5, 344.66, 340.3, 344.06, 339.44, 341.63, 337.31, 337.49, 339.36, 340.48, 360.71, 363.3, 359.17, 366.62, 355.31, 358.83, 349.49, 343.14, 366.12, 353.85, 353.36, 352.5, 350.53, 343.9, 334.92, 320.74, 338.73, 347.27, 341.36, 339.75, 348.96, 341.94] },
      velocityScore: { '1D': 27.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$92B', pe: 21.5, revenueGrowth: 10, eps: 15.87, grossMargin: 15, dividendYield: 1.81,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 5.46, BILT: false },
      tonyNote: 'GENERAL DYNAMICS CORP appears in 1 of 4 Industrials ETFs (25% coverage) with average weight 5.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AIT', name: 'AIT', easyScore: 1, avgWeight: 5.03, proScore: 1.26, coverage: 0.25,
      price: 314.29, weeklyPrices: [303.81, 300.98, 308.31, 313.39, 314.29], weeklyChange: 3.45, sortRank: 0, periodReturns: { '1M': 3.4, '6M': 21.4, '1Y': 37.1 },
      priceHistory: { '1W': [303.81, 300.98, 308.31, 313.39, 314.29], '1M': [303.99, 305.48, 315.39, 310.37, 308.87, 313.7, 310.87, 315.72, 307.17, 305.22, 302.64, 306.25, 305.66, 307.1, 311.33, 308.53, 303.81, 300.98, 308.31, 313.39, 314.29], '6M': [258.83, 262.84, 259.48, 264.78, 263.15, 273.7, 277.44, 262.34, 273.22, 283.73, 279.27, 280.76, 279.91, 264.31, 261.37, 264.14, 265.32, 280.74, 284.56, 289.82, 296.57, 315.39, 310.87, 306.25, 308.53, 314.29], '1Y': [229.21, 230.19, 226.18, 232.21, 245.74, 253.91, 260.7, 268.07, 271.5, 263.43, 273.04, 258.76, 266.47, 265.44, 263.19, 260.45, 261.43, 258.41, 246.04, 247.92, 260, 255.91, 259.66, 250.89, 242.52, 258.82, 257.91, 261.74, 262.41, 263.4, 265.39, 278.77, 277.44, 262.34, 273.22, 283.73, 279.27, 280.76, 279.91, 270.13, 258.51, 266, 269.36, 286.41, 284.39, 289.82, 296.57, 315.39, 310.87, 306.25, 308.53, 314.29] },
      velocityScore: { '1D': -6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 29.7, revenueGrowth: 7, eps: 10.59, grossMargin: 30, dividendYield: 0.65,
      etfPresence: { AIRR: false, PRN: false, RSHO: 5.03, IDEF: false, BILT: false },
      tonyNote: 'AIT appears in 1 of 4 Industrials ETFs (25% coverage) with average weight 5.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 1, avgWeight: 5, proScore: 1.25, coverage: 0.25,
      price: 143.31, weeklyPrices: [156.54, 160.65, 152.17, 142.20, 143.31], weeklyChange: -8.45, sortRank: 0, periodReturns: { '1M': -1.9, '6M': -19.4, '1Y': 10.2 },
      priceHistory: { '1W': [156.54, 160.65, 152.17, 142.2, 143.31], '1M': [146.03, 135.91, 133.79, 137.05, 137.8, 136, 130.05, 133.73, 133.99, 135.14, 135.26, 137.15, 137.41, 136.88, 136.6, 143.34, 156.54, 160.65, 152.17, 142.2, 143.31], '6M': [177.92, 187.54, 185.69, 188.71, 174.04, 179.41, 168.53, 165.7, 157.88, 139.51, 135.38, 134.19, 153.19, 151.14, 155.08, 154.78, 146.28, 140.76, 142.15, 152.62, 137.97, 133.79, 130.05, 137.15, 143.34, 143.31], '1Y': [130.01, 136.39, 139.96, 144.25, 134.36, 142.1, 153.52, 154.86, 158.35, 182.2, 181.02, 156.18, 158.12, 153.11, 171.43, 182.39, 177.57, 173.07, 175.44, 178.15, 180.48, 194.55, 175.05, 172.14, 155.74, 168.45, 181.76, 183.57, 193.38, 184.18, 179.71, 178.96, 168.53, 165.7, 157.88, 139.51, 135.38, 134.19, 153.19, 151.6, 152.77, 154.96, 146.49, 130.49, 142.76, 152.62, 137.97, 133.79, 130.05, 137.15, 143.34, 143.31] },
      velocityScore: { '1D': 19, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$344B', pe: 159.2, revenueGrowth: 85, eps: 0.9, grossMargin: 84, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 5, BILT: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'STRL', name: 'Sterling Infrastructure Inc', easyScore: 1, avgWeight: 4.94, proScore: 1.24, coverage: 0.25,
      price: 935, weeklyPrices: [860.84, 845.39, 875.52, 957.03, 935.00], weeklyChange: 8.61, sortRank: 0, periodReturns: { '1M': 76.6, '6M': 181.4, '1Y': 382.4 },
      priceHistory: { '1W': [860.84, 845.39, 875.52, 957.03, 935], '1M': [529.49, 806, 886.22, 811.41, 844.8, 851.35, 854.28, 889.03, 848.84, 770.76, 728.29, 752, 733.77, 732.94, 783.53, 842.96, 860.84, 845.39, 875.52, 957.03, 935], '6M': [332.29, 340.51, 302.3, 316.55, 327.11, 307.58, 349.59, 372.25, 386.78, 415.19, 410.63, 455.25, 420.22, 411.53, 425.51, 446.16, 407.27, 423.35, 456.08, 487.87, 469.75, 886.22, 854.28, 752, 842.96, 935], '1Y': [193.81, 204.46, 223.97, 228.65, 236.67, 241.76, 250.95, 252.68, 267.59, 299.64, 282.14, 278.03, 290.95, 285.98, 313.56, 360.25, 342.11, 349.3, 336.63, 355.58, 353.8, 379.03, 388.68, 326.6, 314.56, 344.31, 325.1, 315.15, 308.58, 310.79, 317.41, 321.6, 349.59, 372.25, 386.78, 415.19, 410.63, 455.25, 420.22, 420.6, 421.23, 452.92, 421.29, 435.65, 441.1, 487.87, 469.75, 886.22, 854.28, 752, 842.96, 935] },
      velocityScore: { '1D': -43.6, '1W': -74.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$29B', pe: 83.5, revenueGrowth: 92, eps: 11.2, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 4.94, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'LIN', name: 'LIN', easyScore: 1, avgWeight: 4.75, proScore: 1.19, coverage: 0.25,
      price: 510.02, weeklyPrices: [497.69, 497.41, 495.91, 507.57, 510.02], weeklyChange: 2.48, sortRank: 0, periodReturns: { '1M': 3.3, '6M': 26.3, '1Y': 7.7 },
      priceHistory: { '1W': [497.69, 497.41, 495.91, 507.57, 510.02], '1M': [493.55, 500.29, 501.87, 493.85, 493.16, 503.87, 513.26, 511.65, 506.11, 510.86, 506.07, 506.63, 514.51, 517.58, 514.97, 501.98, 497.69, 497.41, 495.91, 507.57, 510.02], '6M': [403.73, 403.3, 418.99, 424.77, 433.1, 443.63, 433.15, 453.03, 463.57, 460.51, 485.28, 508.27, 499.19, 477.94, 494.05, 479.84, 495.76, 500.48, 497.94, 494.62, 504.71, 501.87, 513.26, 506.63, 501.98, 510.02], '1Y': [473.77, 468.54, 458.7, 464.46, 475.58, 468.81, 465.01, 471.49, 460.26, 469.43, 477.63, 480.71, 482.15, 469.52, 482.04, 479.01, 474.41, 466.73, 453.82, 450.89, 450.08, 429.91, 415.32, 428.64, 408.51, 410.32, 399.57, 416.24, 421.43, 426.54, 437.16, 442.9, 433.15, 453.03, 463.57, 460.51, 485.28, 508.27, 499.19, 481.55, 488.57, 492.34, 493.83, 503.3, 499.22, 494.62, 504.71, 501.87, 513.26, 506.63, 501.98, 510.02] },
      velocityScore: { '1D': 22.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$236B', pe: 33.8, revenueGrowth: 8, eps: 15.07, grossMargin: 49, dividendYield: 1.26,
      etfPresence: { AIRR: false, PRN: false, RSHO: 4.75, IDEF: false, BILT: false },
      tonyNote: 'LIN appears in 1 of 4 Industrials ETFs (25% coverage) with average weight 4.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NOC', name: 'NORTHROP GRUMMAN CORP', easyScore: 1, avgWeight: 4.73, proScore: 1.18, coverage: 0.25,
      price: 534.74, weeklyPrices: [563.68, 539.22, 536.59, 526.06, 534.74], weeklyChange: -5.13, sortRank: 0, periodReturns: { '1M': -5.7, '6M': -3.3, '1Y': 8.8 },
      priceHistory: { '1W': [563.68, 539.22, 536.59, 526.06, 534.74], '1M': [567, 558.6, 559.6, 552.27, 549.52, 558.3, 551.8, 548.65, 540.69, 550, 556.34, 552.17, 551.58, 555.58, 556.8, 559.29, 563.68, 539.22, 536.59, 526.06, 534.74], '6M': [553, 560.04, 559.52, 577.37, 611.32, 629.32, 657.3, 678.74, 704.98, 685, 724.83, 703.65, 753.84, 734.98, 724.03, 682.16, 682.24, 687.47, 678.59, 589.62, 572.41, 559.6, 551.8, 552.17, 559.29, 534.74], '1Y': [491.29, 488.46, 494.65, 493.66, 504.2, 514.6, 519.04, 568.48, 576.61, 587.38, 583.72, 597.21, 587.9, 580.8, 575.96, 573.03, 594.52, 609.54, 623.49, 594.5, 605.74, 578.6, 571.96, 558, 567.35, 572.25, 548.97, 569.76, 568.46, 577.78, 610.61, 625.5, 657.3, 678.74, 704.98, 685, 724.83, 703.65, 753.84, 733.18, 724.84, 691.21, 697, 690.57, 672.77, 589.62, 572.41, 559.6, 551.8, 552.17, 559.29, 534.74] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$76B', pe: 16.8, revenueGrowth: 4, eps: 31.88, grossMargin: 21, dividendYield: 1.79,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 4.73, BILT: false },
      tonyNote: 'NORTHROP GRUMMAN CORP appears in 1 of 4 Industrials ETFs (25% coverage) with average weight 4.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BA', name: 'BOEING', easyScore: 1, avgWeight: 4.69, proScore: 1.17, coverage: 0.25,
      price: 214.79, weeklyPrices: [231.15, 224.30, 217.70, 210.58, 214.79], weeklyChange: -7.08, sortRank: 0, periodReturns: { '1M': -2.9, '6M': 6.4, '1Y': 1.3 },
      priceHistory: { '1W': [231.15, 224.3, 217.7, 210.58, 214.79], '1M': [221.3, 224.38, 229.93, 231.03, 237.36, 236.87, 240.6, 229.21, 220.49, 220.61, 215.01, 222.2, 219.61, 219.02, 218.9, 228.78, 231.15, 224.3, 217.7, 210.58, 214.79], '6M': [201.87, 200.71, 208.27, 216.44, 228.13, 239.81, 249, 244.56, 233.15, 242.59, 238.93, 230.36, 227.31, 217.76, 210.82, 196.42, 199.03, 217.8, 223.93, 231.28, 224.11, 229.93, 240.6, 222.2, 228.78, 214.79], '1Y': [211.98, 214, 197.68, 202.58, 215.92, 226.84, 229.34, 231.27, 221.84, 227.33, 233.19, 224.46, 236.16, 229.61, 215.94, 215.65, 221.26, 216.3, 210.73, 212.94, 217.77, 200.08, 196.5, 194.58, 179.38, 189, 201.89, 204.38, 214.08, 217.25, 229.84, 244.55, 249, 244.56, 233.15, 242.59, 238.93, 230.36, 227.31, 214.1, 205.99, 199.61, 207.32, 220.06, 218.88, 231.28, 224.11, 229.93, 240.6, 222.2, 228.78, 214.79] },
      velocityScore: { '1D': 23.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$169B', pe: 84.9, revenueGrowth: 14, eps: 2.53, grossMargin: 5, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 4.69, BILT: false },
      tonyNote: 'BOEING appears in 1 of 4 Industrials ETFs (25% coverage) with average weight 4.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA Inc', easyScore: 1, avgWeight: 4.62, proScore: 1.16, coverage: 0.25,
      price: 1830, weeklyPrices: [1828.21, 1787.88, 1883.26, 1850.04, 1830.00], weeklyChange: 0.1, sortRank: 0, periodReturns: { '1M': -3.3, '6M': 82.2, '1Y': 267 },
      priceHistory: { '1W': [1828.21, 1787.88, 1883.26, 1850.04, 1830], '1M': [1891.95, 1967.24, 2011.49, 1942.02, 1952.37, 2016.31, 2034.63, 2042.36, 1992.74, 1854.43, 1825.5, 1835.51, 1835.33, 1828.25, 1883.56, 1855.15, 1828.21, 1787.88, 1883.26, 1850.04, 1830], '6M': [1004.65, 1024.92, 918.54, 963.83, 1032.31, 1038.18, 1134.75, 1160.38, 1209.97, 1269.63, 1319.47, 1450.6, 1430.38, 1383.62, 1424.46, 1461.52, 1378.99, 1525.16, 1648.96, 1724.49, 1724.14, 2011.49, 2034.63, 1835.51, 1855.15, 1830], '1Y': [498.63, 496.7, 499.02, 516.08, 540.98, 539.5, 554.18, 562.83, 703.3, 694.43, 689.86, 694, 730.01, 706.31, 753.69, 797.71, 804.36, 818.01, 816.07, 827.92, 825, 963.3, 957.78, 897.52, 876.19, 976.94, 1001.48, 967.95, 940.74, 950.67, 1035.11, 1073.14, 1134.75, 1160.38, 1209.97, 1269.63, 1319.47, 1450.6, 1430.38, 1407.32, 1423, 1470.64, 1428.52, 1574.45, 1605.97, 1724.49, 1724.14, 2011.49, 2034.63, 1835.51, 1855.15, 1830] },
      velocityScore: { '1D': -35.9, '1W': -73.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$64B', pe: 52.9, revenueGrowth: 1, eps: 34.6, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: false, PRN: 4.62, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'ATI', name: 'ATI', easyScore: 1, avgWeight: 4.58, proScore: 1.15, coverage: 0.25,
      price: 177.44, weeklyPrices: [175.16, 178.98, 178.48, 179.94, 177.44], weeklyChange: 1.3, sortRank: 0, periodReturns: { '1M': 15.3, '6M': 76.7, '1Y': 113.8 },
      priceHistory: { '1W': [175.16, 178.98, 178.48, 179.94, 177.44], '1M': [153.89, 155.35, 165.08, 162.66, 158.39, 161.01, 164.83, 162.57, 154.22, 149.62, 150.44, 153.73, 160.41, 162.29, 168.76, 170.53, 175.16, 178.98, 178.48, 179.94, 177.44], '6M': [100.4, 110.65, 109.76, 116.95, 119.9, 123.46, 123.28, 124.15, 128.34, 137.04, 148.57, 160.02, 161.82, 158.97, 148.83, 149.59, 145.46, 156.39, 156.83, 153.3, 146.23, 165.08, 164.83, 153.73, 170.53, 177.44], '1Y': [82.98, 83.89, 82.18, 85.68, 86.85, 89.31, 93.41, 93.27, 76.94, 73.74, 74.02, 71.8, 78.47, 77.63, 76.14, 80.73, 82.81, 81.28, 80.04, 80.33, 89.55, 101.18, 96.21, 98.56, 94.8, 100.8, 100.41, 108.96, 113.28, 116.63, 120.86, 124.42, 123.28, 124.15, 128.34, 137.04, 148.57, 160.02, 161.82, 157.47, 149.64, 149, 151.25, 159.63, 155.83, 153.3, 146.23, 165.08, 164.83, 153.73, 170.53, 177.44] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$24B', pe: 58.8, revenueGrowth: 1, eps: 3.02, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: 4.58, IDEF: false, BILT: false },
      tonyNote: 'ATI appears in 1 of 4 Industrials ETFs (25% coverage) with average weight 4.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.76, proScore: 4.76, coverage: 1,
      price: 239.2, weeklyPrices: [231.09, 264.51, 260.58, 251.68, 239.20], weeklyChange: 3.51, sortRank: 0, periodReturns: { '1M': 35.6, '6M': 132.7, '1Y': 507.3 },
      priceHistory: { '1W': [231.09, 264.51, 260.58, 251.68, 239.2], '1M': [176.42, 175.92, 195.09, 184.77, 177.05, 179.11, 207.27, 221.15, 219.94, 199.86, 197.73, 191.82, 219.93, 214.77, 208.06, 226.34, 231.09, 264.51, 260.58, 251.68, 239.2], '6M': [102.8, 94.28, 78.09, 87.59, 92.83, 107.33, 99.29, 97.87, 89.95, 91.79, 101.8, 106.12, 97.78, 96.43, 116.33, 114.91, 103.76, 125, 166.77, 156.14, 141.19, 195.09, 207.27, 191.82, 226.34, 239.2], '1Y': [39.39, 50.57, 48.32, 52.6, 50.25, 44.3, 52.79, 52.16, 54.43, 65.31, 68.46, 66.18, 72.04, 65.47, 90.41, 99.31, 107.7, 127.98, 129.58, 113.44, 106.16, 124.18, 109.44, 88.63, 84.64, 94.87, 98.04, 87.69, 89.46, 86.04, 100.24, 105.43, 99.29, 97.87, 89.95, 91.79, 101.8, 106.12, 97.78, 112, 118.56, 115.09, 101.95, 136.33, 165.34, 156.14, 141.19, 195.09, 207.27, 191.82, 226.34, 239.2] },
      velocityScore: { '1D': -4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$61B', pe: 92.4, revenueGrowth: 684, eps: 2.59, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 3.29, MEME: 6.01, RKNG: 4.99 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 2, avgWeight: 6.5, proScore: 4.33, coverage: 0.667,
      price: 179.95, weeklyPrices: [158.41, 185.67, 202.37, 184.07, 179.95], weeklyChange: 13.6, sortRank: 0, periodReturns: { '1M': 4, '6M': 585.8, '1Y': 951.7 },
      priceHistory: { '1W': [158.41, 185.67, 202.37, 184.07, 179.95], '1M': [172.98, 180.57, 178.54, 157.55, 148.94, 188.28, 223.1, 203.57, 190.36, 173.26, 171.33, 165.26, 176.81, 181.49, 177.62, 169.02, 158.41, 185.67, 202.37, 184.07, 179.95], '6M': [26.24, 36.32, 29.25, 37.17, 34.99, 33.72, 39.26, 37.39, 46.12, 48.49, 43.44, 58.12, 99.71, 120.49, 86.33, 113.9, 84.59, 132.7, 142.55, 149.42, 152.83, 178.54, 223.1, 165.26, 169.02, 179.95], '1Y': [17.11, 16.32, 19.77, 27.77, 28.66, 28.4, 28.63, 25.84, 22.87, 22.33, 21.01, 23.7, 25.49, 23.99, 27.07, 28.99, 25.77, 27.93, 27.15, 31.92, 31.4, 35.07, 29.1, 20.91, 19.49, 26.78, 26.59, 32.06, 31.32, 36.75, 38.61, 34.18, 39.26, 37.39, 46.12, 48.49, 43.44, 58.12, 99.71, 127.01, 92.63, 114.41, 86.35, 133.3, 157.32, 149.42, 152.83, 178.54, 223.1, 165.26, 169.02, 179.95] },
      velocityScore: { '1D': 4.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$14B', pe: null, revenueGrowth: 51, eps: -0.64, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 8.5, RKNG: 4.49 },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 3, avgWeight: 4.12, proScore: 4.12, coverage: 1,
      price: 62.26, weeklyPrices: [63.54, 65.33, 66.60, 65.48, 62.26], weeklyChange: -2.01, sortRank: 0, periodReturns: { '1M': 25.8, '6M': 34, '1Y': 560.2 },
      priceHistory: { '1W': [63.54, 65.33, 66.6, 65.48, 62.26], '1M': [49.48, 54.74, 60.98, 56.85, 61.2, 56.56, 55.17, 58.4, 52.94, 50.46, 47.74, 52.71, 58.06, 56.83, 59.78, 64.05, 63.54, 65.33, 66.6, 65.48, 62.26], '6M': [46.45, 43.94, 35.8, 40.3, 48.24, 50.33, 54.26, 59.99, 54.39, 42.93, 42.08, 44.03, 43.84, 38.12, 42.96, 41.12, 34.28, 36.83, 48.82, 48.39, 42.86, 60.98, 55.17, 52.71, 64.05, 62.26], '1Y': [9.43, 10.3, 9.8, 13.11, 16.82, 16.23, 17.94, 18.14, 16.11, 18.57, 19.08, 19.59, 23.04, 26.15, 33.96, 38.64, 41.86, 50.46, 59.77, 60.72, 55.86, 58.22, 66.96, 48.65, 43.47, 47.81, 44.71, 40.13, 39.92, 39.41, 45.91, 52.99, 54.26, 59.99, 54.39, 42.93, 42.08, 44.03, 43.84, 41.98, 42.21, 41.43, 34.09, 37.06, 47.7, 48.39, 42.86, 60.98, 55.17, 52.71, 64.05, 62.26] },
      velocityScore: { '1D': -1.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$22B', pe: 80.9, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 3.08, MEME: 5.82, RKNG: 3.46 },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 3, avgWeight: 3.8, proScore: 3.8, coverage: 1,
      price: 44.09, weeklyPrices: [47.28, 47.94, 47.86, 44.71, 44.09], weeklyChange: -6.75, sortRank: 0, periodReturns: { '1M': 23.7, '6M': 41.6, '1Y': 232.8 },
      priceHistory: { '1W': [47.28, 47.94, 47.86, 44.71, 44.09], '1M': [35.63, 39.88, 44.24, 41.53, 41.25, 43.93, 45.48, 46.71, 42.56, 39.14, 36.62, 39.52, 48.02, 45.87, 45.14, 49.65, 47.28, 47.94, 47.86, 44.71, 44.09], '6M': [31.14, 30.76, 23.9, 24.05, 30.2, 38.21, 35.46, 41.35, 36.7, 37.47, 31.91, 29.08, 28.65, 27.4, 27.51, 26.79, 23.74, 27.79, 30.81, 32.43, 32.69, 44.24, 45.48, 39.52, 49.65, 44.09], '1Y': [13.25, 12.05, 10.61, 10.56, 10.45, 9.18, 11.93, 11.2, 13.14, 14.24, 14.55, 15.77, 16.6, 13.89, 18.68, 20.48, 21.71, 26.53, 33.99, 34.24, 33.38, 33.95, 31.08, 23.06, 21.37, 27.1, 31.22, 27.86, 27.85, 24.81, 30.26, 36.71, 35.46, 41.35, 36.7, 37.47, 31.91, 29.08, 28.65, 28.52, 26.65, 28.37, 24.49, 25.57, 30.09, 32.43, 32.69, 44.24, 45.48, 39.52, 49.65, 44.09] },
      velocityScore: { '1D': -3.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.43, MEME: 5.16, RKNG: 3.81 },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 5.54, proScore: 3.69, coverage: 0.667,
      price: 1781.34, weeklyPrices: [1694.98, 1761.43, 1716.36, 1831.50, 1781.34], weeklyChange: 5.1, sortRank: 0, periodReturns: { '1M': 41.8, '6M': 735.1, '1Y': 4373.5 },
      priceHistory: { '1W': [1694.98, 1761.43, 1716.36, 1831.5, 1781.34], '1M': [1255.86, 1406.32, 1409.98, 1339.96, 1562.34, 1452.02, 1447.23, 1382.72, 1407.61, 1333.01, 1383.29, 1392.56, 1542.24, 1478.69, 1589.55, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1781.34], '6M': [213.31, 241.61, 219.46, 250.05, 274.08, 389.27, 453.12, 481.43, 695.51, 541.64, 600.4, 632.38, 599.06, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1392.56, 1641.64, 1781.34], '1Y': [39.82, 40.23, 46.62, 47.44, 46.41, 46.09, 42.19, 42.06, 42.92, 40.69, 46.68, 45.5, 50.87, 68.55, 86.13, 102.21, 97.12, 128.41, 116.91, 140.16, 167.05, 195.82, 207.69, 243.57, 195.96, 223.28, 228.47, 206.18, 237.61, 244.25, 349.63, 389.81, 453.12, 481.43, 695.51, 541.64, 600.4, 632.38, 599.06, 655.43, 753.69, 677.86, 692.73, 851.57, 919.47, 979.07, 1064.21, 1409.98, 1447.23, 1392.56, 1641.64, 1781.34] },
      velocityScore: { '1D': -6.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$264B', pe: 60.8, revenueGrowth: 251, eps: 29.3, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.45, RKNG: 5.63 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 5.13, proScore: 3.42, coverage: 0.667,
      price: 276.25, weeklyPrices: [285.00, 273.51, 302.85, 287.32, 276.25], weeklyChange: -3.07, sortRank: 0, periodReturns: { '1M': -4.3, '6M': 133.9, '1Y': 1264.2 },
      priceHistory: { '1W': [285, 273.51, 302.85, 287.32, 276.25], '1M': [288.64, 295.25, 285.47, 258.64, 261.03, 280.69, 289.76, 303.41, 275.95, 258.71, 261.34, 282.31, 307.88, 302.49, 302.4, 290.01, 285, 273.51, 302.85, 287.32, 276.25], '6M': [118.09, 108.99, 80.21, 90.18, 103.87, 136.87, 151.75, 152.31, 168.89, 148.7, 157.27, 174.77, 164.78, 154, 160.05, 145.88, 135.49, 146.78, 213.84, 229.75, 287.97, 285.47, 289.76, 282.31, 290.01, 276.25], '1Y': [20.25, 22.53, 21.5, 22.33, 24.24, 25.4, 24.99, 33.06, 37.39, 36.8, 45.11, 44.83, 54.8, 57.07, 67.26, 84.93, 70.32, 90.29, 86.87, 111.5, 101.42, 127.85, 136.86, 103.55, 93.38, 109.24, 119.18, 94.98, 88.82, 88.41, 103.05, 139.77, 151.75, 152.31, 168.89, 148.7, 157.27, 174.77, 164.78, 159.21, 156.58, 150.22, 132.45, 160.13, 210.06, 229.75, 287.97, 285.47, 289.76, 282.31, 290.01, 276.25] },
      velocityScore: { '1D': 6.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$79B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.05, RKNG: 4.21 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab', easyScore: 3, avgWeight: 3.41, proScore: 3.41, coverage: 1,
      price: 113.39, weeklyPrices: [143.48, 122.39, 123.32, 114.70, 113.39], weeklyChange: -20.97, sortRank: 0, periodReturns: { '1M': 41.2, '6M': 129.7, '1Y': 321.4 },
      priceHistory: { '1W': [143.48, 122.39, 123.32, 114.7, 113.39], '1M': [80.31, 78.76, 84.65, 78.58, 105.47, 117.56, 124.15, 132.55, 124.77, 131.16, 127.31, 134.28, 125.45, 135.76, 143.2, 148.03, 143.48, 122.39, 123.32, 114.7, 113.39], '6M': [49.37, 63.53, 59.92, 70.65, 78.14, 87.9, 89.16, 87, 81.27, 72.03, 74.42, 70.2, 71.91, 68.93, 78.59, 66.07, 64.22, 69.08, 73.6, 90.04, 77.02, 84.65, 124.15, 134.28, 148.03, 113.39], '1Y': [26.91, 27.36, 27.85, 36.14, 35.66, 39.03, 51.39, 48.13, 45.92, 44.21, 42.81, 41.53, 47.91, 45.84, 53.34, 47.79, 46.26, 56.16, 64.26, 66.27, 63.57, 60.92, 49.61, 45.25, 39.48, 42.14, 49.06, 61.49, 70.52, 70.12, 86.03, 86.58, 89.16, 87, 81.27, 72.03, 74.42, 70.2, 71.91, 71.96, 69.48, 72.88, 65.52, 66.74, 82.93, 90.04, 77.02, 84.65, 124.15, 134.28, 148.03, 113.39] },
      velocityScore: { '1D': -2.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$66B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 1.96, MEME: 4.36, RKNG: 3.9 },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 4.57, proScore: 3.04, coverage: 0.667,
      price: 1011.75, weeklyPrices: [971.00, 1035.50, 1064.10, 1079.57, 1011.75], weeklyChange: 4.2, sortRank: 0, periodReturns: { '1M': 75.5, '6M': 346.4, '1Y': 879.9 },
      priceHistory: { '1W': [971, 1035.5, 1064.1, 1079.57, 1011.75], '1M': [576.45, 640.2, 666.59, 646.63, 746.81, 766.58, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 923.52, 971, 1035.5, 1064.1, 1079.57, 1011.75], '6M': [226.65, 258.46, 248.55, 284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 1011.75], '1Y': [103.25, 116.03, 121.82, 126, 122.29, 124.53, 114.39, 111.73, 109.14, 111.87, 125.29, 115.79, 122, 131.37, 157.23, 162.73, 157.27, 187.83, 181.6, 202.38, 206.71, 224.01, 238.33, 236.95, 201.37, 236.48, 237.22, 241.14, 265.92, 294.37, 343.43, 338.13, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 418.69, 461.73, 382.09, 367.85, 421.51, 457.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 1011.75] },
      velocityScore: { '1D': -0.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 47.8, revenueGrowth: 196, eps: 21.16, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { BUZZ: 3.68, MEME: false, RKNG: 5.45 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'NVTS', name: 'Navitas Semiconductor', easyScore: 2, avgWeight: 4.56, proScore: 3.04, coverage: 0.667,
      price: 30.25, weeklyPrices: [26.60, 24.86, 25.86, 30.84, 30.25], weeklyChange: 13.72, sortRank: 0, periodReturns: { '1M': 90, '6M': 220.1, '1Y': 346.2 },
      priceHistory: { '1W': [26.6, 24.86, 25.86, 30.84, 30.25], '1M': [15.92, 17.55, 16.68, 15.79, 18.2, 19.25, 21.17, 22.32, 21.32, 19.67, 19.43, 22.99, 24.38, 29.25, 31.79, 28.51, 26.6, 24.86, 25.86, 30.84, 30.25], '6M': [9.45, 9.18, 7.37, 7.4, 9.05, 10.43, 9.86, 9.56, 9.05, 8.79, 8.09, 9.88, 9.22, 8.68, 9.82, 9.28, 8.77, 9.55, 10.26, 18.47, 15.48, 16.68, 21.17, 22.99, 28.51, 30.25], '1Y': [6.78, 7.96, 7, 6.61, 6.44, 5.84, 6.79, 8.98, 7.33, 6.79, 7.25, 6.21, 6.04, 5.6, 6.17, 7.01, 6.43, 7.82, 8.23, 14.66, 13.61, 12.56, 8.84, 7.91, 7.55, 8.74, 9.48, 8.59, 7.81, 7.21, 10.19, 9.45, 9.86, 9.56, 9.05, 8.79, 8.09, 9.88, 9.22, 10.84, 9.06, 9.48, 8.54, 9.42, 12.37, 18.47, 15.48, 16.68, 21.17, 22.99, 28.51, 30.25] },
      velocityScore: { '1D': 0.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.6, RKNG: 5.52 },
      tonyNote: 'Navitas Semiconductor is a small-cap wide-bandgap power semiconductor name — gallium nitride and silicon carbide for fast charging and EV applications. The $26.60 share price and small market cap position it as a speculative holding in ETFs willing to take higher-risk bets on next-generation power conversion.',
    },
    {
      ticker: 'ONDS', name: 'Ondas Holdings', easyScore: 2, avgWeight: 4.28, proScore: 2.85, coverage: 0.667,
      price: 11.28, weeklyPrices: [13.22, 13.46, 13.58, 11.61, 11.28], weeklyChange: -14.67, sortRank: 0, periodReturns: { '1M': 15.9, '6M': 22.7, '1Y': 544.6 },
      priceHistory: { '1W': [13.22, 13.46, 13.58, 11.61, 11.28], '1M': [9.73, 9.33, 9.34, 8.89, 9.06, 9.04, 8.86, 11.21, 10.62, 9.7, 9.13, 9.36, 9.18, 9.06, 9.77, 13.25, 13.22, 13.46, 13.58, 11.61, 11.28], '6M': [9.19, 9.02, 7.8, 8.48, 12.53, 13.19, 13.13, 12.26, 11.38, 9.68, 11.07, 10.3, 10.51, 10.01, 11.28, 10.68, 9.04, 9.45, 10.03, 11.06, 9.49, 9.34, 8.86, 9.36, 13.25, 11.28], '1Y': [1.75, 1.48, 1.55, 1.75, 1.85, 2.12, 2.23, 2.14, 2.12, 3.25, 3.93, 3.8, 5.7, 5.63, 6.56, 6.72, 7.66, 9.91, 9.22, 7.61, 7.06, 6.29, 5.25, 6.56, 6.27, 7.9, 9.07, 8.75, 9.22, 8.46, 12.84, 13.89, 13.13, 12.26, 11.38, 9.68, 11.07, 10.3, 10.51, 9.83, 10.83, 10.31, 8.81, 9.14, 10.2, 11.06, 9.49, 9.34, 8.86, 9.36, 13.25, 11.28] },
      velocityScore: { '1D': -3.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 125.3, revenueGrowth: 1080, eps: 0.09, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.67, RKNG: 2.88 },
      tonyNote: 'Ondas Holdings is a small-cap industrial automation and drone company. It appears in Meme ETFs on the autonomous systems and drone delivery narrative. Revenue is minimal and the path to profitability is unclear; the ETF allocation is speculative and reflects retail interest in autonomous systems themes.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 2, avgWeight: 3.73, proScore: 2.49, coverage: 0.667,
      price: 67.17, weeklyPrices: [72.07, 69.28, 71.40, 68.23, 67.17], weeklyChange: -6.8, sortRank: 0, periodReturns: { '1M': 46.8, '6M': 22.7, '1Y': 69.5 },
      priceHistory: { '1W': [72.07, 69.28, 71.4, 68.23, 67.17], '1M': [45.75, 48, 52.57, 47.68, 49.24, 55.87, 55.26, 57.47, 51.95, 49.31, 48.44, 52.47, 58.89, 63.64, 63.62, 70.14, 72.07, 69.28, 71.4, 68.23, 67.17], '6M': [54.76, 52.55, 46.44, 46, 48.71, 50.95, 50.66, 45.49, 38.47, 35.19, 33.34, 33.59, 37.13, 35.12, 33.31, 32.7, 28.83, 28.99, 43.25, 47.36, 42.11, 52.57, 55.26, 52.47, 70.14, 67.17], '1Y': [39.64, 39.7, 39.63, 41.12, 44.39, 41.81, 46.51, 43.9, 39.87, 40.49, 41.03, 37.17, 43.3, 41.8, 55.61, 70.41, 67.28, 73.28, 70.65, 62.94, 59.37, 60.17, 57.43, 45.4, 41, 49.3, 52.69, 50.35, 48.48, 45.25, 50.76, 48.94, 50.66, 45.49, 38.47, 35.19, 33.34, 33.59, 37.13, 34.27, 32.38, 31.96, 27.79, 28.08, 44.68, 47.36, 42.11, 52.57, 55.26, 52.47, 70.14, 67.17] },
      velocityScore: { '1D': -0.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 172.2, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: 2.03, MEME: 5.43, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'RGTI', name: 'RGTI', easyScore: 2, avgWeight: 3.52, proScore: 2.34, coverage: 0.667,
      price: 23.37, weeklyPrices: [25.54, 25.63, 26.88, 24.09, 23.37], weeklyChange: -8.49, sortRank: 0, periodReturns: { '1M': 32, '6M': -22.3, '1Y': 97.7 },
      priceHistory: { '1W': [25.54, 25.63, 26.88, 24.09, 23.37], '1M': [17.7, 18.27, 20.09, 18.34, 18.94, 19.07, 18.42, 19.27, 17.85, 16.62, 15.96, 16.88, 22.04, 26.42, 25.07, 27.03, 25.54, 25.63, 26.88, 24.09, 23.37], '6M': [30.06, 26.88, 22.82, 22.38, 25.01, 25.53, 24.99, 22.31, 18.21, 16.97, 16.18, 17.63, 17.76, 16.99, 16.22, 15.6, 14.04, 14.53, 19.11, 18.38, 16.08, 20.09, 18.42, 16.88, 27.03, 23.37], '1Y': [11.82, 12.52, 11.35, 11.11, 13.45, 12.18, 17.16, 15.95, 14.5, 15.66, 17.98, 14.27, 16.58, 15.1, 19.09, 28.52, 31.18, 40.06, 43.92, 46.38, 39.6, 42.52, 34.36, 25.2, 22.8, 25.57, 28.11, 25.84, 23.76, 22.27, 25.38, 24.47, 24.99, 22.31, 18.21, 16.97, 16.18, 17.63, 17.76, 16.94, 15.67, 15.14, 13.5, 14.31, 19.45, 18.38, 16.08, 20.09, 18.42, 16.88, 27.03, 23.37] },
      velocityScore: { '1D': 0.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$8B', pe: null, revenueGrowth: 199, eps: -0.89, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.45, RKNG: 3.58 },
      tonyNote: 'Rigetti Computing is a quantum hardware company using superconducting qubit technology. It holds a position in Meme ETFs alongside IonQ and D-Wave as part of the quantum computing basket. Revenue is minimal, the technology is earlier-stage than IonQ, and the ETF allocation is speculative. The weight score is low; this is a high-risk, long-duration positioning.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 2, avgWeight: 3.23, proScore: 2.16, coverage: 0.667,
      price: 105.19, weeklyPrices: [113.41, 105.65, 118.17, 107.73, 105.19], weeklyChange: -7.25, sortRank: 0, periodReturns: { '1M': 53.7, '6M': 44.8, '1Y': 266.6 },
      priceHistory: { '1W': [113.41, 105.65, 118.17, 107.73, 105.19], '1M': [68.43, 63.87, 70.68, 65.35, 75.05, 72.96, 74.81, 83.01, 83.67, 86.83, 88.1, 89.58, 96.23, 105.86, 119.7, 133.09, 113.41, 105.65, 118.17, 107.73, 105.19], '6M': [72.65, 84.75, 65.93, 71.95, 90.92, 98.39, 112.44, 111.34, 115.76, 96.27, 84.43, 82.36, 104.89, 87.53, 95.7, 86.98, 82.87, 96.46, 86.91, 84.66, 69.85, 70.68, 74.81, 89.58, 133.09, 105.19], '1Y': [28.69, 36.47, 44.35, 50.62, 45.6, 45.58, 57.98, 60.06, 53.17, 47.71, 48.5, 44.98, 48.95, 42.41, 38.72, 45.1, 49.09, 67.76, 82.03, 83.49, 71.72, 76.68, 65.28, 61.44, 50.7, 56.2, 73.92, 76.7, 75.84, 71.47, 97.49, 92.72, 112.44, 111.34, 115.76, 96.27, 84.43, 82.36, 104.89, 88.21, 90.74, 96.06, 83.99, 91.61, 90.94, 84.66, 69.85, 70.68, 74.81, 89.58, 133.09, 105.19] },
      velocityScore: { '1D': 3.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$41B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 3.51, MEME: false, RKNG: 2.96 },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'RDW', name: 'Redwire', easyScore: 1, avgWeight: 6.03, proScore: 2.01, coverage: 0.333,
      price: 19.95, weeklyPrices: [24.57, 20.68, 20.58, 18.62, 19.95], weeklyChange: -18.8, sortRank: 0, periodReturns: { '1M': 130.9, '6M': 224.9, '1Y': 17.2 },
      priceHistory: { '1W': [24.57, 20.68, 20.58, 18.62, 19.95], '1M': [8.64, 8.69, 9.64, 9.2, 11.07, 11.56, 11.46, 13.99, 14.06, 13.96, 13.91, 14.77, 15.35, 17.49, 22.04, 25.9, 24.57, 20.68, 20.58, 18.62, 19.95], '6M': [6.14, 7.67, 7.02, 7.15, 10.26, 10.66, 10.66, 14.2, 11.26, 9.38, 8.4, 8.62, 9.28, 9.23, 10.13, 9.05, 8.5, 9.61, 9.91, 11.93, 8.6, 9.64, 11.46, 14.77, 25.9, 19.95], '1Y': [17.02, 20.06, 16.61, 16.96, 15.99, 16.64, 19.41, 16.02, 14.29, 9.47, 9.09, 8.7, 9.2, 8.32, 8.69, 7.95, 8.83, 10.73, 8.74, 7.97, 7.74, 7.64, 5.98, 5.56, 5.06, 5.51, 6.39, 7.29, 8, 7, 10.64, 10.14, 10.66, 14.2, 11.26, 9.38, 8.4, 8.62, 9.28, 9.46, 9.55, 9.16, 9.08, 9.22, 11.22, 11.93, 8.6, 9.64, 11.46, 14.77, 25.9, 19.95] },
      velocityScore: { '1D': -4.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: null, revenueGrowth: 58, eps: -2.59, grossMargin: 13, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.03, RKNG: false },
      tonyNote: 'Redwire Corp is a space infrastructure company — solar arrays, structures, and manufacturing in orbit. It appears in Meme and speculative ETFs as a high-risk space economy play. Revenue is growing from a small base but the business is pre-profitability; the ETF weight is minimal and reflects thematic positioning rather than fundamental conviction.',
    },
    {
      ticker: 'TE', name: 'T1 Energy', easyScore: 1, avgWeight: 5.65, proScore: 1.88, coverage: 0.333,
      price: 12.4, weeklyPrices: [10.56, 10.41, 12.04, 11.50, 12.40], weeklyChange: 17.47, sortRank: 0, periodReturns: { '1M': 143.2, '6M': 142.8, '1Y': 997.8 },
      priceHistory: { '1W': [10.56, 10.41, 12.04, 11.5, 12.4], '1M': [5.1, 5.34, 5.27, 5.15, 6.16, 5.85, 5.61, 5.73, 5.67, 7, 6.88, 8.7, 8.72, 8.08, 10.45, 10.82, 10.56, 10.41, 12.04, 11.5, 12.4], '6M': [5.11, 5.87, 6.02, 6.8, 8.2, 7.21, 8.28, 9.12, 9.09, 7.51, 6.46, 7.22, 7.1, 7.98, 7.79, 6.61, 4.39, 4.17, 5.34, 5.39, 4.89, 5.27, 5.61, 8.7, 10.82, 12.4], '1Y': [1.13, 1.42, 1.47, 1.3, 1.44, 1.38, 1.48, 1.48, 1.19, 1.27, 1.26, 1.48, 1.64, 1.98, 1.86, 1.95, 2.2, 2.53, 3.64, 4.32, 3.71, 3.64, 3.68, 3.49, 2.72, 4.12, 5.83, 5.35, 6.43, 6.42, 7.65, 7.86, 8.28, 9.12, 9.09, 7.51, 6.46, 7.22, 7.1, 8.14, 7.33, 6.68, 4.48, 4.18, 4.99, 5.39, 4.89, 5.27, 5.61, 8.7, 10.82, 12.4] },
      velocityScore: { '1D': 10.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3B', pe: null, revenueGrowth: 232, eps: -1.87, grossMargin: 8, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.65, RKNG: false },
      tonyNote: 'Tronox Holdings is a titanium dioxide producer — a commodity chemicals company that appears in some ETFs for its materials exposure. The small share price reflects commodity pricing pressure; this is a cyclical materials position rather than a technology or infrastructure allocation.',
    },
    {
      ticker: 'LUNR', name: 'Intuitive Machines', easyScore: 1, avgWeight: 5.62, proScore: 1.87, coverage: 0.333,
      price: 32.79, weeklyPrices: [43.83, 38.21, 39.57, 33.83, 32.79], weeklyChange: -25.19, sortRank: 0, periodReturns: { '1M': 29.3, '6M': 187.6, '1Y': 196.5 },
      priceHistory: { '1W': [43.83, 38.21, 39.57, 33.83, 32.79], '1M': [25.35, 24.8, 26.33, 24.11, 28.97, 32.09, 35.68, 36.52, 33.89, 33.59, 32.46, 33.67, 34.24, 38.26, 34.86, 45.7, 43.83, 38.21, 39.57, 33.83, 32.79], '6M': [11.4, 12.55, 10.85, 15.25, 18.36, 19.2, 21.19, 20.29, 19.61, 18.62, 17.74, 15.89, 18.62, 17.68, 18.9, 17.92, 18.56, 23.39, 23.88, 29.94, 24.79, 26.33, 35.68, 33.67, 45.7, 32.79], '1Y': [11.06, 11.22, 10.16, 11.36, 10.79, 10.86, 12.41, 12.79, 11.16, 10.05, 8.99, 8.64, 8.9, 8.49, 8.78, 9.71, 10.08, 11.44, 12.23, 12.4, 12.29, 11.37, 9.56, 8.66, 8.05, 9.5, 11.21, 11.97, 14.94, 15.7, 18.82, 17.57, 21.19, 20.29, 19.61, 18.62, 17.74, 15.89, 18.62, 18.45, 18.11, 20.55, 20.24, 21.97, 27.28, 29.94, 24.79, 26.33, 35.68, 33.67, 45.7, 32.79] },
      velocityScore: { '1D': -1.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: null, revenueGrowth: 199, eps: -0.87, grossMargin: 10, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.62, RKNG: false },
      tonyNote: 'Intuitive Machines is a lunar services company — it landed the first U.S. spacecraft on the Moon since 1972 in early 2024. It appears in Meme ETFs for the narrative value as much as the commercial contract pipeline. Revenue is growing via NASA contracts but the business is small and pre-profit; the ETF weight is speculative.',
    },
    {
      ticker: 'QBTS', name: 'D-Wave Quantum', easyScore: 1, avgWeight: 5.53, proScore: 1.84, coverage: 0.333,
      price: 26.95, weeklyPrices: [30.14, 29.18, 29.91, 27.55, 26.95], weeklyChange: -10.58, sortRank: 0, periodReturns: { '1M': 28.8, '6M': -6.2, '1Y': 51.2 },
      priceHistory: { '1W': [30.14, 29.18, 29.91, 27.55, 26.95], '1M': [20.92, 21.54, 23.83, 21.99, 22.57, 22.35, 21.44, 22.13, 20.35, 19.06, 18.19, 19.3, 25.74, 29.4, 27.82, 29.49, 30.14, 29.18, 29.91, 27.55, 26.95], '6M': [28.73, 27.98, 24.89, 25.29, 30.64, 28.8, 27.04, 24.69, 21.4, 20.44, 19.07, 19.65, 18.91, 18.76, 17.47, 15.93, 14.43, 14.57, 20.81, 21.24, 18.27, 23.83, 21.44, 19.3, 29.49, 26.95], '1Y': [17.82, 16.53, 15.71, 14.06, 16.79, 14.81, 18.89, 19.76, 17.19, 17.17, 18.18, 14.81, 15.92, 15.37, 17.76, 26.88, 26.76, 32.7, 33.02, 38.33, 31.06, 36.11, 28.39, 23.39, 20.51, 22.67, 27, 26.1, 26.82, 26.15, 31.27, 28.82, 27.04, 24.69, 21.4, 20.44, 19.07, 19.65, 18.91, 18.91, 16.49, 16.19, 13.7, 13.87, 21.52, 21.24, 18.27, 23.83, 21.44, 19.3, 29.49, 26.95] },
      velocityScore: { '1D': -2.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: -81, eps: -1.14, grossMargin: 66, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.53, RKNG: false },
      tonyNote: 'D-Wave Quantum is a quantum computing company — the only publicly traded business built around quantum annealing hardware. Revenue is minimal and profitability is many years away, but it holds a position in Meme ETFs as the purest-play quantum computing stock available to retail investors. The ETF weight is small and the position is purely thematic.',
    },
    {
      ticker: 'AXTI', name: 'AXT Inc', easyScore: 1, avgWeight: 4.54, proScore: 1.51, coverage: 0.333,
      price: 108.86, weeklyPrices: [103.16, 109.55, 110.85, 106.70, 108.86], weeklyChange: 5.52, sortRank: 0, periodReturns: { '1M': 2.7, '6M': 799.6, '1Y': 6265.8 },
      priceHistory: { '1W': [103.16, 109.55, 110.85, 106.7, 108.86], '1M': [106, 107.55, 104.83, 108.42, 116.36, 122.9, 121.94, 114.98, 123.78, 105.88, 112.88, 104.61, 121.02, 140.83, 132.6, 115.7, 103.16, 109.55, 110.85, 106.7, 108.86], '6M': [12.1, 16.38, 14.01, 15.37, 16.67, 22.24, 21.41, 17.2, 19.74, 24.35, 23.54, 40.97, 39.13, 44.3, 44.36, 68.44, 56.98, 53.18, 62.93, 86.94, 71.07, 104.83, 121.94, 104.61, 115.7, 108.86], '1Y': [1.71, 1.98, 1.91, 2.17, 2.14, 2.2, 2.44, 2.37, 2.08, 2.06, 2.16, 2.48, 2.92, 3.11, 3.66, 4.34, 4.66, 5.13, 4.03, 4.51, 5.18, 7.32, 8.87, 10.44, 9.45, 10.7, 11.58, 14.81, 14.65, 14.59, 20.17, 21.51, 21.41, 17.2, 19.74, 24.35, 23.54, 40.97, 39.13, 47.36, 48.76, 67.35, 47.14, 63.12, 81.78, 86.94, 71.07, 104.83, 121.94, 104.61, 115.7, 108.86] },
      velocityScore: { '1D': -3.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 39, eps: -0.32, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.54, RKNG: false },
      tonyNote: 'AXT Inc is a compound semiconductor substrate manufacturer — gallium arsenide, indium phosphide, and germanium wafers used in data center optical transceivers, 5G RF chips, and solar cells. Revenue is growing with optical networking demand. Small market cap but positioned at a genuine supply-chain chokepoint for III-V semiconductor materials.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 1, avgWeight: 4.43, proScore: 1.48, coverage: 0.333,
      price: 587.85, weeklyPrices: [531.21, 546.20, 563.10, 594.11, 587.85], weeklyChange: 10.66, sortRank: 0, periodReturns: { '1M': 32.9, '6M': 265.1, '1Y': 980 },
      priceHistory: { '1W': [531.21, 546.2, 563.1, 594.11, 587.85], '1M': [442.36, 465.26, 483.15, 463.91, 480, 488.74, 494.09, 489.15, 482.02, 458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 531.18, 531.21, 546.2, 563.1, 594.11, 587.85], '6M': [161, 187.2, 175.01, 181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 459.62, 531.18, 587.85], '1Y': [54.43, 55.67, 59.19, 63.51, 66.08, 66.14, 68, 69.02, 78.69, 74.44, 76.24, 74.66, 82.04, 92.04, 97.66, 106.63, 106.88, 131.31, 115.42, 126.2, 125.72, 138.13, 163.6, 157.16, 140.23, 163.33, 168.89, 176.34, 181.08, 179.68, 219.38, 214, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 268.81, 304.9, 296.14, 297.73, 337.88, 361.69, 389.1, 412.76, 483.15, 494.09, 459.62, 531.18, 587.85] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$203B', pe: 35.2, revenueGrowth: 46, eps: 16.69, grossMargin: 45, dividendYield: 0.1,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.43 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'NOW', name: 'NOW', easyScore: 1, avgWeight: 3.93, proScore: 1.31, coverage: 0.333,
      price: 119.71, weeklyPrices: [124.37, 135.86, 127.65, 117.90, 119.71], weeklyChange: -3.75, sortRank: 0, periodReturns: { '1M': 30.2, '6M': -28.6, '1Y': -40.9 },
      priceHistory: { '1W': [124.37, 135.86, 127.65, 117.9, 119.71], '1M': [91.97, 92.01, 89.05, 93.59, 91.18, 89, 87.05, 90.5, 95.07, 103.42, 101.83, 103.3, 99.69, 102.13, 99.92, 108.73, 124.37, 135.86, 127.65, 117.9, 119.71], '6M': [167.77, 173.5, 153.38, 153.89, 147.6, 142.64, 125.4, 131.8, 109.77, 106.48, 107.81, 104.23, 113.86, 116.61, 116.72, 104.65, 104.55, 97.47, 94.19, 103.07, 88.89, 89.05, 87.05, 103.3, 108.73, 119.71], '1Y': [202.55, 200.87, 196.42, 202.29, 208.94, 187.76, 192.68, 199.24, 188.62, 174.82, 170.17, 175.39, 185.72, 182.76, 185.79, 192.23, 187.2, 182.47, 177.74, 180.72, 187.83, 186.94, 171.75, 169.94, 160.09, 162.48, 170.87, 173.01, 155.31, 154.58, 148.81, 138.19, 125.4, 131.8, 109.77, 106.48, 107.81, 104.23, 113.86, 115.63, 113.71, 103.06, 104.04, 89.81, 96.44, 103.07, 88.89, 89.05, 87.05, 103.3, 108.73, 119.71] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$123B', pe: 71.7, revenueGrowth: 22, eps: 1.67, grossMargin: 77, dividendYield: null,
      etfPresence: { BUZZ: 3.93, MEME: false, RKNG: false },
      tonyNote: 'NOW appears in 1 of 3 Meme ETFs (33% coverage) with average weight 3.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
