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
export const SPY_RET: Record<Period, number> = { '1W': 0.5, '1M': 0.7, '6M': 9, '1Y': 23.1 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 8.4 }, { t: 'MRVL', w: 4.6 }, { t: 'AMD', w: 4.5 }, { t: 'VRT', w: 3.6 }, { t: 'SIMO', w: 3.6 }],
  ARTY: [{ t: 'MRVL', w: 9.3 }, { t: 'MU', w: 7.8 }, { t: 'AMD', w: 7.4 }, { t: 'CRWV', w: 3.9 }, { t: 'ORCL', w: 3.7 }],
  BAI: [{ t: 'MU', w: 6.2 }, { t: 'LRCX', w: 4.8 }, { t: 'AMD', w: 4.7 }, { t: 'AVGO', w: 4.4 }, { t: 'TSM', w: 4.4 }],
  IGPT: [{ t: 'MU', w: 12.6 }, { t: 'AMD', w: 7.1 }, { t: 'INTC', w: 7.1 }, { t: 'GOOGL', w: 6.0 }, { t: 'NVDA', w: 5.7 }],
  IVES: [{ t: 'MU', w: 6.2 }, { t: 'TSM', w: 5.0 }, { t: 'AMD', w: 4.8 }, { t: 'AAPL', w: 4.8 }, { t: 'NVDA', w: 4.8 }],
  ALAI: [{ t: 'NVDA', w: 13.5 }, { t: 'AMZN', w: 5.9 }, { t: 'TSM', w: 5.7 }, { t: 'MSFT', w: 5.4 }, { t: 'GOOG', w: 5.1 }],
  CHAT: [{ t: 'NVDA', w: 7.0 }, { t: 'GOOGL', w: 5.5 }, { t: 'AVGO', w: 4.3 }, { t: 'MU', w: 4.0 }, { t: 'AMD', w: 4.0 }],
  AIFD: [{ t: 'NVDA', w: 6.6 }, { t: 'MRVL', w: 6.4 }, { t: 'MU', w: 6.2 }, { t: 'DOCN', w: 5.8 }, { t: 'LITE', w: 5.7 }],
  SPRX: [{ t: 'COHR', w: 8.5 }, { t: 'ALAB', w: 7.8 }, { t: 'ARM', w: 7.5 }, { t: 'KLAC', w: 7.0 }, { t: 'MKSI', w: 5.5 }],
  AOTG: [{ t: 'AMD', w: 15.0 }, { t: 'NVDA', w: 10.9 }, { t: 'MU', w: 9.8 }, { t: 'TSM', w: 7.4 }, { t: 'APP', w: 4.8 }],
  SOXX: [{ t: 'MU', w: 11.6 }, { t: 'AMD', w: 8.7 }, { t: 'MRVL', w: 8.2 }, { t: 'INTC', w: 6.1 }, { t: 'AVGO', w: 5.8 }],
  PSI: [{ t: 'AMAT', w: 6.0 }, { t: 'KLAC', w: 6.0 }, { t: 'LRCX', w: 5.6 }, { t: 'MU', w: 5.5 }, { t: 'ADI', w: 4.9 }],
  XSD: [{ t: 'MXL', w: 5.6 }, { t: 'MRVL', w: 4.7 }, { t: 'ALAB', w: 4.5 }, { t: 'INTC', w: 3.7 }, { t: 'AMD', w: 3.6 }],
  DRAM: [{ t: 'SNDK', w: 5.8 }, { t: 'MU', w: 4.3 }, { t: 'STX', w: 4.2 }, { t: 'WDC', w: 3.8 }],
  PTF: [{ t: 'SNDK', w: 8.5 }, { t: 'MU', w: 4.9 }, { t: 'STX', w: 4.6 }, { t: 'WDC', w: 4.6 }, { t: 'NVDA', w: 4.3 }],
  WCLD: [{ t: 'DOCN', w: 3.6 }, { t: 'FROG', w: 2.9 }, { t: 'DDOG', w: 2.7 }, { t: 'TWLO', w: 2.5 }, { t: 'PANW', w: 2.4 }],
  IGV: [{ t: 'ORCL', w: 9.1 }, { t: 'PANW', w: 8.4 }, { t: 'MSFT', w: 7.8 }, { t: 'PLTR', w: 7.0 }, { t: 'CRWD', w: 6.6 }],
  FDTX: [{ t: 'MU', w: 9.4 }, { t: 'MRVL', w: 8.1 }, { t: 'TSM', w: 6.0 }, { t: 'NVDA', w: 4.6 }, { t: 'STX', w: 4.0 }],
  GTEK: [{ t: 'MRVL', w: 4.3 }, { t: 'DELL', w: 2.8 }, { t: 'CDNS', w: 2.6 }, { t: 'APH', w: 2.3 }, { t: 'NET', w: 2.0 }],
  ARKK: [{ t: 'TSLA', w: 10.5 }, { t: 'TEM', w: 5.2 }, { t: 'HOOD', w: 5.0 }, { t: 'AMD', w: 5.0 }, { t: 'CRSP', w: 4.9 }],
  MARS: [{ t: 'RKLB', w: 13.6 }, { t: 'ASTS', w: 9.1 }, { t: 'SATS', w: 8.6 }, { t: 'VSAT', w: 4.7 }, { t: 'PL', w: 4.6 }],
  FRWD: [{ t: 'NVDA', w: 8.4 }, { t: 'STX', w: 8.3 }, { t: 'AMD', w: 7.1 }, { t: 'LRCX', w: 6.0 }, { t: 'TSM', w: 6.0 }],
  BCTK: [{ t: 'TSM', w: 8.7 }, { t: 'AVGO', w: 7.3 }, { t: 'LRCX', w: 7.1 }, { t: 'NVDA', w: 6.6 }, { t: 'GOOG', w: 5.9 }],
  FWD: [{ t: 'AVGO', w: 2.4 }, { t: 'GOOGL', w: 2.1 }, { t: 'NVDA', w: 2.0 }, { t: 'AMD', w: 2.0 }, { t: 'CAT', w: 1.9 }],
  CBSE: [{ t: 'SCI', w: 3.4 }, { t: 'SBUX', w: 3.4 }, { t: 'VG', w: 3.3 }, { t: 'SNOW', w: 3.0 }, { t: 'KLAC', w: 2.9 }],
  FCUS: [{ t: 'INTC', w: 4.5 }, { t: 'SITM', w: 4.3 }, { t: 'DELL', w: 4.3 }, { t: 'SNDK', w: 4.3 }, { t: 'BE', w: 4.2 }],
  WGMI: [{ t: 'CIFR', w: 16.2 }, { t: 'IREN', w: 12.4 }, { t: 'WULF', w: 9.7 }, { t: 'CORZ', w: 7.8 }, { t: 'KEEL', w: 7.2 }],
  POW: [{ t: 'POWL', w: 6.7 }, { t: 'VICR', w: 5.4 }, { t: 'PWR', w: 4.8 }, { t: 'PRY', w: 4.4 }, { t: 'ETN', w: 4.1 }],
  VOLT: [{ t: 'BELFB', w: 8.0 }, { t: 'POWL', w: 8.0 }, { t: 'PWR', w: 5.4 }, { t: 'ETN', w: 5.3 }, { t: 'NEE', w: 4.7 }],
  PBD: [{ t: 'FSLR', w: 1.1 }, { t: 'SEDG', w: 1.1 }, { t: 'ENPH', w: 1.1 }],
  PBW: [{ t: 'HYLN', w: 4.7 }, { t: 'FCEL', w: 3.1 }, { t: 'NVTS', w: 2.9 }, { t: 'ASPN', w: 2.1 }, { t: 'BE', w: 2.0 }],
  IVEP: [{ t: 'BE', w: 4.7 }, { t: 'PWR', w: 4.3 }, { t: 'SBGSY', w: 4.2 }, { t: 'MPWR', w: 4.1 }, { t: 'VRT', w: 4.0 }],
  AIRR: [{ t: 'STRL', w: 6.2 }, { t: 'CHRW', w: 4.3 }, { t: 'FIX', w: 4.3 }, { t: 'SAIA', w: 4.2 }, { t: 'AGX', w: 3.8 }],
  PRN: [{ t: 'TTMI', w: 6.0 }, { t: 'FIX', w: 4.7 }, { t: 'STRL', w: 4.4 }, { t: 'JBL', w: 4.2 }, { t: 'AGX', w: 4.1 }],
  RSHO: [{ t: 'TKR', w: 9.3 }, { t: 'POWL', w: 7.6 }, { t: 'CGNX', w: 7.0 }, { t: 'CAT', w: 6.7 }, { t: 'ETN', w: 5.6 }],
  IDEF: [{ t: 'RTX', w: 8.0 }, { t: 'LMT', w: 7.2 }, { t: 'GD', w: 5.9 }, { t: 'NOC', w: 5.1 }, { t: 'BA', w: 5.0 }],
  BILT: [{ t: 'UNP', w: 5.8 }, { t: 'AEP', w: 4.3 }, { t: 'AENA', w: 4.2 }, { t: 'XEL', w: 3.6 }, { t: 'LNG', w: 3.5 }],
  BUZZ: [{ t: 'SMCI', w: 3.8 }, { t: 'MU', w: 3.7 }, { t: 'NOW', w: 3.4 }, { t: 'ASTS', w: 3.3 }, { t: 'AMD', w: 3.2 }],
  MEME: [{ t: 'SPCE', w: 8.3 }, { t: 'AAOI', w: 6.6 }, { t: 'SNDK', w: 5.7 }, { t: 'ASTS', w: 5.6 }, { t: 'RDW', w: 5.6 }],
  RKNG: [{ t: 'SNDK', w: 6.2 }, { t: 'NVTS', w: 5.6 }, { t: 'MU', w: 5.5 }, { t: 'CRDO', w: 5.0 }, { t: 'NBIS', w: 4.9 }],
};
// @@END_GENERATED:ETF_TOP_HOLDINGS@@

// @@GENERATED:TOP10_RET@@
// Top10 composite returns per theme per period (average of all ETFs in theme)
const TOP10_RET: Record<Theme, Record<Period, number>> = {
  'AI & ML':         { '1W': 1.5, '1M': 8.7, '6M': 47.8, '1Y': 89.3 },
  'Semiconductors':  { '1W': 6.7, '1M': 17, '6M': 108.6, '1Y': 162.5 },
  'Broad Tech':      { '1W': 0.8, '1M': 5.5, '6M': 28.2, '1Y': 56.5 },
  'Electrification': { '1W': 0.9, '1M': -4, '6M': 29.2, '1Y': 57.1 },
  'Industrials':     { '1W': 2.2, '1M': 0.8, '6M': 24.2, '1Y': 44 },
  'Meme':            { '1W': -0.3, '1M': 1.8, '6M': 24.2, '1Y': 14.5 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, Record<Period, ChartPeriodData>> = {
  'AI & ML': {
    '1W': { top10: [100, 98.02, 94.94, 100.06, 101.49], spy: [100, 99.71, 98.13, 99.8, 100.55], top10Return: 1.5, spyReturn: 0.5, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 102.58, 103.6, 100.26, 98.32, 100.74, 103.15, 104.11, 108.28, 108.1, 110.07, 111.03, 114.29, 116.45, 115.34, 103.82, 107.11, 104.97, 101.66, 107.19, 108.73], spy: [100, 100.56, 101.35, 100.13, 100.06, 100.42, 100.62, 101.01, 101.68, 101.66, 102.22, 102.48, 102.76, 102.9, 102.18, 99.91, 100.14, 99.85, 98.27, 99.94, 100.69], top10Return: 8.7, spyReturn: 0.7, xLabels: ["May 15", "May 22", "May 29", "Jun 5", "Jun 12"] },
    '6M': { top10: [100, 100.53, 101.61, 104.97, 105.46, 104.47, 109.25, 99.42, 104.63, 103.87, 105.07, 101.81, 100.82, 103.27, 102.66, 99.93, 107.23, 116.43, 120.16, 123.71, 131.45, 140.39, 139.69, 150.53, 140.6, 147.8], spy: [100, 99.83, 100.89, 101.47, 101.76, 100.53, 102, 100.65, 101.5, 100.4, 101.11, 99.93, 97.7, 97.02, 96.34, 96.11, 99.73, 102.92, 103.91, 105.41, 107.31, 109.74, 108.94, 110.96, 108.18, 109.02], top10Return: 47.8, spyReturn: 9, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 99.53, 105.11, 105.17, 105.92, 109.42, 111.72, 109.23, 113.46, 114.15, 112.34, 113.68, 116.86, 123.19, 127.54, 125.33, 131.06, 131.21, 130.98, 136.72, 137.86, 130.7, 126.76, 119.52, 128.18, 132.22, 125.38, 129.69, 129.19, 133.19, 132.81, 134.79, 139.31, 126.77, 133.51, 132.54, 134.11, 129.85, 128.64, 132.74, 124.43, 128.05, 138.74, 151.08, 157.9, 158.03, 167.83, 179.53, 178.67, 192.55, 179.85, 189.26], spy: [100, 98.43, 101.85, 102.8, 103.49, 104.14, 105.5, 102.98, 105.54, 106.57, 106.88, 106.84, 107.47, 109.47, 110.45, 109.93, 111.24, 109.82, 111.19, 113.5, 112.97, 111.13, 111.29, 109.16, 112.67, 113.23, 112.75, 113.43, 113.79, 114.22, 114.35, 114.12, 115.18, 113.65, 114.61, 113.37, 114.17, 112.85, 110.32, 109.28, 106.85, 108.63, 112.54, 117.62, 118.25, 119.03, 121.17, 123.92, 123.02, 125.3, 122.16, 123.11], top10Return: 89.3, spyReturn: 23.1, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Semiconductors': {
    '1W': { top10: [100, 98.43, 95.13, 104.34, 106.65], spy: [100, 99.71, 98.13, 99.8, 100.55], top10Return: 6.7, spyReturn: 0.5, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 103.21, 103.12, 99.29, 96.16, 100.83, 103.28, 104.9, 112.83, 111.9, 113.2, 112.18, 113.82, 119.29, 120.69, 103.54, 109.75, 108.02, 104.35, 114.55, 117.03], spy: [100, 100.56, 101.35, 100.13, 100.06, 100.42, 100.62, 101.01, 101.68, 101.66, 102.22, 102.48, 102.76, 102.9, 102.18, 99.91, 100.14, 99.85, 98.27, 99.94, 100.69], top10Return: 17, spyReturn: 0.7, xLabels: ["May 15", "May 22", "May 29", "Jun 5", "Jun 12"] },
    '6M': { top10: [100, 101.44, 104.63, 112.02, 113.63, 118.55, 119.32, 115.18, 125.08, 122.31, 124.93, 124.86, 123.03, 130.76, 132.5, 132.44, 137.92, 147.5, 158.56, 172.31, 182.8, 197.9, 194.15, 197.42, 185.75, 208.66], spy: [100, 99.83, 100.89, 101.47, 101.76, 100.53, 102, 100.65, 101.5, 100.4, 101.11, 99.93, 97.7, 97.02, 96.34, 96.11, 99.73, 102.92, 103.91, 105.41, 107.31, 109.74, 108.94, 110.96, 108.18, 109.02], top10Return: 108.6, spyReturn: 9, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 99.54, 105.4, 105.98, 107.69, 110.04, 109.3, 105.2, 108.18, 110.73, 112.55, 112.15, 114.85, 119.27, 126.01, 123.48, 131.83, 130.68, 135.12, 138.65, 139.06, 132.94, 128.37, 121.54, 132.03, 141.27, 134.92, 137.58, 136.5, 146.38, 149.48, 156.97, 159.18, 149.37, 163.81, 159.32, 160.54, 150.78, 147.05, 152.56, 149.04, 153.38, 172.59, 188.5, 212.76, 213.28, 228.28, 245.22, 244.69, 258.91, 242.87, 271.23], spy: [100, 98.43, 101.85, 102.8, 103.49, 104.14, 105.5, 102.98, 105.54, 106.57, 106.88, 106.84, 107.47, 109.47, 110.45, 109.93, 111.24, 109.82, 111.19, 113.5, 112.97, 111.13, 111.29, 109.16, 112.67, 113.23, 112.75, 113.43, 113.79, 114.22, 114.35, 114.12, 115.18, 113.65, 114.61, 113.37, 114.17, 112.85, 110.32, 109.28, 106.85, 108.63, 112.54, 117.62, 118.25, 119.03, 121.17, 123.92, 123.02, 125.3, 122.16, 123.11], top10Return: 162.5, spyReturn: 23.1, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Broad Tech': {
    '1W': { top10: [100, 97.9, 95.56, 99.91, 100.83], spy: [100, 99.71, 98.13, 99.8, 100.55], top10Return: 0.8, spyReturn: 0.5, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100.87, 102.33, 99.8, 98.99, 100.66, 102.38, 103.87, 107.14, 107.16, 108.87, 109.57, 111.67, 112.84, 110.92, 102.58, 104.63, 102.43, 99.95, 104.45, 105.46], spy: [100, 100.56, 101.35, 100.13, 100.06, 100.42, 100.62, 101.01, 101.68, 101.66, 102.22, 102.48, 102.76, 102.9, 102.18, 99.91, 100.14, 99.85, 98.27, 99.94, 100.69], top10Return: 5.5, spyReturn: 0.7, xLabels: ["May 15", "May 22", "May 29", "Jun 5", "Jun 12"] },
    '6M': { top10: [100, 100.03, 99.64, 103.67, 104.06, 103.34, 104.65, 96.99, 100.63, 100.95, 102.97, 100.95, 98.56, 99.72, 99.85, 98.1, 102.29, 110.42, 113.34, 115.19, 121.9, 126.42, 124.78, 131.6, 123.8, 128.24], spy: [100, 99.83, 100.89, 101.47, 101.76, 100.53, 102, 100.65, 101.5, 100.4, 101.11, 99.93, 97.7, 97.02, 96.34, 96.11, 99.73, 102.92, 103.91, 105.41, 107.31, 109.74, 108.94, 110.96, 108.18, 109.02], top10Return: 28.2, spyReturn: 9, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 99.37, 103.71, 105.97, 106.04, 108.69, 109.36, 105.05, 106.45, 108.1, 108.88, 109.55, 110.59, 116.35, 121.99, 121.62, 127.58, 130.26, 129.99, 132.43, 131.33, 127.12, 118.99, 113.79, 121.81, 123.85, 117.63, 121.26, 118.32, 123.87, 126.4, 126.61, 130.23, 119.81, 124.5, 124.51, 127.53, 123.91, 121.59, 125.48, 120.88, 123.56, 129.38, 139.2, 139.35, 140.07, 146.94, 151.35, 151.03, 157.52, 150.69, 156.5], spy: [100, 98.43, 101.85, 102.8, 103.49, 104.14, 105.5, 102.98, 105.54, 106.57, 106.88, 106.84, 107.47, 109.47, 110.45, 109.93, 111.24, 109.82, 111.19, 113.5, 112.97, 111.13, 111.29, 109.16, 112.67, 113.23, 112.75, 113.43, 113.79, 114.22, 114.35, 114.12, 115.18, 113.65, 114.61, 113.37, 114.17, 112.85, 110.32, 109.28, 106.85, 108.63, 112.54, 117.62, 118.25, 119.03, 121.17, 123.92, 123.02, 125.3, 122.16, 123.11], top10Return: 56.5, spyReturn: 23.1, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Electrification': {
    '1W': { top10: [100, 98.81, 95.62, 99.53, 100.88], spy: [100, 99.71, 98.13, 99.8, 100.55], top10Return: 0.9, spyReturn: 0.5, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100.7, 100.81, 98, 95.24, 95.53, 98.21, 99.58, 102.62, 101.8, 101.92, 100.84, 100.52, 102.63, 101.51, 95.08, 95.18, 94.01, 90.97, 94.69, 95.99], spy: [100, 100.56, 101.35, 100.13, 100.06, 100.42, 100.62, 101.01, 101.68, 101.66, 102.22, 102.48, 102.76, 102.9, 102.18, 99.91, 100.14, 99.85, 98.27, 99.94, 100.69], top10Return: -4, spyReturn: 0.7, xLabels: ["May 15", "May 22", "May 29", "Jun 5", "Jun 12"] },
    '6M': { top10: [100, 100.08, 100.94, 104.09, 106.19, 108.12, 111.81, 110.65, 114.37, 114.43, 116.81, 111.11, 110.91, 112.33, 114.92, 111.87, 116.84, 121.24, 126.75, 131.06, 132.56, 135.19, 132.11, 135.02, 126.81, 129.16], spy: [100, 99.83, 100.89, 101.47, 101.76, 100.53, 102, 100.65, 101.5, 100.4, 101.11, 99.93, 97.7, 97.02, 96.34, 96.11, 99.73, 102.92, 103.91, 105.41, 107.31, 109.74, 108.94, 110.96, 108.18, 109.02], top10Return: 29.2, spyReturn: 9, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 98.7, 101.6, 104.45, 105.98, 109.25, 110.18, 106.96, 109.56, 112.63, 114.56, 112.82, 112.9, 115.56, 120.77, 121.19, 128.72, 131.29, 134.09, 134.4, 135.17, 133.03, 130.1, 126.06, 131.59, 133.68, 133.18, 135.61, 132.16, 135.63, 139.69, 145.02, 145.2, 143.82, 145.53, 145.45, 149.28, 143.5, 144.61, 146.43, 147.78, 149.03, 157.14, 165.21, 168.25, 168.83, 172.45, 177.95, 174.24, 180.22, 169.1, 170.2], spy: [100, 98.43, 101.85, 102.8, 103.49, 104.14, 105.5, 102.98, 105.54, 106.57, 106.88, 106.84, 107.47, 109.47, 110.45, 109.93, 111.24, 109.82, 111.19, 113.5, 112.97, 111.13, 111.29, 109.16, 112.67, 113.23, 112.75, 113.43, 113.79, 114.22, 114.35, 114.12, 115.18, 113.65, 114.61, 113.37, 114.17, 112.85, 110.32, 109.28, 106.85, 108.63, 112.54, 117.62, 118.25, 119.03, 121.17, 123.92, 123.02, 125.3, 122.16, 123.11], top10Return: 57.1, spyReturn: 23.1, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Industrials': {
    '1W': { top10: [100, 100.11, 97.45, 101.56, 102.21], spy: [100, 99.71, 98.13, 99.8, 100.55], top10Return: 2.2, spyReturn: 0.5, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100.02, 100.7, 98.04, 96.72, 97.43, 97.62, 98.5, 100.94, 100.94, 101.41, 100.76, 99.27, 100.56, 100.3, 98.46, 98.6, 98.71, 96.08, 100.13, 100.77], spy: [100, 100.56, 101.35, 100.13, 100.06, 100.42, 100.62, 101.01, 101.68, 101.66, 102.22, 102.48, 102.76, 102.9, 102.18, 99.91, 100.14, 99.85, 98.27, 99.94, 100.69], top10Return: 0.8, spyReturn: 0.7, xLabels: ["May 15", "May 22", "May 29", "Jun 5", "Jun 12"] },
    '6M': { top10: [100, 99.86, 100.67, 104.95, 107.86, 110.6, 110.18, 111.02, 116.18, 118.03, 118.69, 113.73, 110.66, 111.12, 112.89, 112.12, 118.3, 117.78, 120.22, 121.57, 122.41, 124.14, 120.09, 124.04, 121.28, 124.23], spy: [100, 99.83, 100.89, 101.47, 101.76, 100.53, 102, 100.65, 101.5, 100.4, 101.11, 99.93, 97.7, 97.02, 96.34, 96.11, 99.73, 102.92, 103.91, 105.41, 107.31, 109.74, 108.94, 110.96, 108.18, 109.02], top10Return: 24.2, spyReturn: 9, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 99.66, 103.07, 104.26, 105.47, 105.48, 107.41, 105.76, 107.27, 107.74, 109.27, 109.34, 109.73, 112.14, 113.6, 112.97, 115.98, 114.7, 115.54, 117.68, 117.59, 114.27, 111.53, 108.73, 111.77, 114.48, 115.25, 117.51, 116.16, 121.01, 125.96, 129.27, 129.3, 129.92, 135.5, 136.68, 136.68, 131, 127.41, 128.7, 126.9, 129.6, 136.28, 138.83, 138.89, 140.62, 141.8, 143.95, 139.22, 143.42, 140.35, 144.04], spy: [100, 98.43, 101.85, 102.8, 103.49, 104.14, 105.5, 102.98, 105.54, 106.57, 106.88, 106.84, 107.47, 109.47, 110.45, 109.93, 111.24, 109.82, 111.19, 113.5, 112.97, 111.13, 111.29, 109.16, 112.67, 113.23, 112.75, 113.43, 113.79, 114.22, 114.35, 114.12, 115.18, 113.65, 114.61, 113.37, 114.17, 112.85, 110.32, 109.28, 106.85, 108.63, 112.54, 117.62, 118.25, 119.03, 121.17, 123.92, 123.02, 125.3, 122.16, 123.11], top10Return: 44, spyReturn: 23.1, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Meme': {
    '1W': { top10: [100, 96.44, 93.79, 99.87, 99.74], spy: [100, 99.71, 98.13, 99.8, 100.55], top10Return: -0.3, spyReturn: 0.5, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 102.2, 103.19, 99.14, 95.15, 97.29, 103.15, 105.58, 109.11, 110.74, 112.77, 111.25, 111.45, 114.21, 110.2, 99.48, 102.03, 98.4, 95.69, 101.9, 101.76], spy: [100, 100.56, 101.35, 100.13, 100.06, 100.42, 100.62, 101.01, 101.68, 101.66, 102.22, 102.48, 102.76, 102.9, 102.18, 99.91, 100.14, 99.85, 98.27, 99.94, 100.69], top10Return: 1.8, spyReturn: 0.7, xLabels: ["May 15", "May 22", "May 29", "Jun 5", "Jun 12"] },
    '6M': { top10: [100, 100.31, 95.38, 101.51, 101.98, 101.33, 102.86, 90.89, 92.18, 91.8, 92.63, 91.04, 87.8, 90.93, 93.81, 91.17, 98.18, 109.33, 110.94, 110.58, 118.36, 123.59, 128.84, 138.16, 122.34, 124.2], spy: [100, 99.83, 100.89, 101.47, 101.76, 100.53, 102, 100.65, 101.5, 100.4, 101.11, 99.93, 97.7, 97.02, 96.34, 96.11, 99.73, 102.92, 103.91, 105.41, 107.31, 109.74, 108.94, 110.96, 108.18, 109.02], top10Return: 24.2, spyReturn: 9, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.66, 101.66, 96.42, 98.05, 93.75, 95.68, 92.03, 86.85, 87.44, 87.96, 86.45, 90.84, 91.81, 88.9, 89.42, 94.58, 94.01, 95.16, 98.33, 98.42, 94.57, 91.93, 86.38, 86.81, 89.54, 86.24, 91.08, 89.85, 92.66, 94.98, 95.19, 95.19, 92.45, 92.63, 88.77, 91.41, 94.47, 97.08, 102.84, 100.13, 97.25, 96.71, 108.02, 113.57, 113.65, 112.1, 123.31, 122.17, 121.74, 110.01, 114.48], spy: [100, 98.43, 101.85, 102.8, 103.49, 104.14, 105.5, 102.98, 105.54, 106.57, 106.88, 106.84, 107.47, 109.47, 110.45, 109.93, 111.24, 109.82, 111.19, 113.5, 112.97, 111.13, 111.29, 109.16, 112.67, 113.23, 112.75, 113.43, 113.79, 114.22, 114.35, 114.12, 115.18, 113.65, 114.61, 113.37, 114.17, 112.85, 110.32, 109.28, 106.85, 108.63, 112.54, 117.62, 118.25, 119.03, 121.17, 123.92, 123.02, 125.3, 122.16, 123.11], top10Return: 14.5, spyReturn: 23.1, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
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
export const SCAN_TIMESTAMP    = '2026-06-12T15:32:38.476Z';
export const SCAN_TIMESTAMP_NY = 'June 12, 2026 at 11:32 AM ET';
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
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 14.57, bestProScore: 6.25, avgProScore: 4.86, price: 1000.06, weeklyChange: 5.35 },
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 11.60, bestProScore: 6.31, avgProScore: 3.87, price: 206.81, weeklyChange: -0.88 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 10.81, bestProScore: 4.92, avgProScore: 3.60, price: 514.50, weeklyChange: 4.93 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 5.97, bestProScore: 2.85, avgProScore: 1.99, price: 383.03, weeklyChange: -3.42 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 6.07, bestProScore: 3.24, avgProScore: 3.04, price: 286.70, weeklyChange: -0.74 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 5.36, bestProScore: 3.31, avgProScore: 2.68, price: 301.84, weeklyChange: 2.81 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 5.10, bestProScore: 3.64, avgProScore: 2.55, price: 122.94, weeklyChange: 11.49 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.81, bestProScore: 2.90, avgProScore: 2.40, price: 426.13, weeklyChange: -0.16 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.69, bestProScore: 2.33, avgProScore: 1.85, price: 371.08, weeklyChange: 14.37 },
  { ticker: 'ALAB', name: `Astera Labs Inc`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 3.33, bestProScore: 1.74, avgProScore: 1.67, price: 381.79, weeklyChange: 10.24 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': 4.7, '1M': 14.1, '6M': 112.3, '1Y': 192.6 },
  ARTY: { '1W': -0.1, '1M': 10.4, '6M': 54.3, '1Y': 91.2 },
  BAI:  { '1W': 3, '1M': 5.4, '6M': 46, '1Y': 81.1 },
  IGPT: { '1W': 2.8, '1M': 9.2, '6M': 69.4, '1Y': 108.7 },
  IVES: { '1W': -1.5, '1M': 3.4, '6M': 16.6, '1Y': 42.1 },
  ALAI: { '1W': 0, '1M': 3.2, '6M': 19.3, '1Y': 49.5 },
  CHAT: { '1W': 0.4, '1M': 11.6, '6M': 57.6, '1Y': 106.1 },
  AIFD: { '1W': 1.3, '1M': 7.4, '6M': 45.4, '1Y': 85.1 },
  SPRX: { '1W': 4.3, '1M': 19.3, '6M': 45.4, '1Y': 104.7 },
  AOTG: { '1W': -0.2, '1M': 3.3, '6M': 11.5, '1Y': 31.6 },
  // Semiconductors
  SOXX: { '1W': 5.1, '1M': 16.4, '6M': 100.5, '1Y': 164.7 },
  PSI:  { '1W': 10.5, '1M': 12.8, '6M': 111.3, '1Y': 199.2 },
  XSD:  { '1W': 2.7, '1M': 11.1, '6M': 86.6, '1Y': 149.8 },
  DRAM: { '1W': 8.3, '1M': 27.8, '6M': 136.2, '1Y': 136.2 },
  // Broad Tech
  PTF:  { '1W': 5.6, '1M': 8.8, '6M': 69, '1Y': 98.7 },
  WCLD: { '1W': -3.7, '1M': 8.7, '6M': -14, '1Y': -13.8 },
  IGV:  { '1W': -5, '1M': 1.6, '6M': -15.9, '1Y': -15.1 },
  FDTX: { '1W': 0.8, '1M': 11.8, '6M': 36.4, '1Y': 47.7 },
  GTEK: { '1W': 0.5, '1M': 7.7, '6M': 47.5, '1Y': 68.4 },
  ARKK: { '1W': -0.2, '1M': -3.1, '6M': -5.8, '1Y': 22.1 },
  MARS: { '1W': 0.2, '1M': -0.6, '6M': 40.6, '1Y': 40.6 },
  FRWD: { '1W': 1.8, '1M': 6.8, '6M': 29.8, '1Y': 29.8 },
  BCTK: { '1W': 1.1, '1M': 5.5, '6M': 23.7, '1Y': 23.7 },
  FWD:  { '1W': 2.4, '1M': 5, '6M': 35, '1Y': 66.8 },
  CBSE: { '1W': 2.1, '1M': 1, '6M': 23.5, '1Y': 39.8 },
  FCUS: { '1W': 2.4, '1M': 0.9, '6M': 39.2, '1Y': 81.1 },
  WGMI: { '1W': 2.8, '1M': 17.1, '6M': 58.2, '1Y': 244.7 },
  // Electrification
  POW:  { '1W': 2.4, '1M': -6.2, '6M': 51.6, '1Y': 48.7 },
  VOLT: { '1W': 2.4, '1M': -3.4, '6M': 35.2, '1Y': 60.1 },
  PBD:  { '1W': -0.3, '1M': -4.8, '6M': 26.1, '1Y': 64.9 },
  PBW:  { '1W': -0.7, '1M': -1, '6M': 28.3, '1Y': 107.2 },
  IVEP: { '1W': 0.6, '1M': -4.7, '6M': 4.6, '1Y': 4.6 },
  // Industrials
  AIRR: { '1W': 1.4, '1M': 0.5, '6M': 29.2, '1Y': 65.6 },
  PRN:  { '1W': 3.9, '1M': 1.3, '6M': 39.5, '1Y': 61.3 },
  RSHO: { '1W': 2.1, '1M': 2.6, '6M': 32.5, '1Y': 54.9 },
  IDEF: { '1W': 1.9, '1M': -1.3, '6M': 6.7, '1Y': 21.5 },
  BILT: { '1W': 1.8, '1M': 0.7, '6M': 13.3, '1Y': 16.9 },
  // Meme
  BUZZ: { '1W': -1.7, '1M': 0.6, '6M': 10.1, '1Y': 33 },
  MEME: { '1W': 0.3, '1M': 1.9, '6M': 55.2, '1Y': 3.1 },
  RKNG: { '1W': 0.6, '1M': 2.8, '6M': 7.3, '1Y': 7.3 },
};
// @@END_GENERATED:ETF_RETURNS@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 6.31, proScore: 6.31, coverage: 1,
      price: 206.81, weeklyPrices: [208.64, 208.19, 200.42, 204.87, 206.81], weeklyChange: -0.88, sortRank: 0, periodReturns: { '1M': -6.3, '6M': 18.2, '1Y': 42.6 },
      priceHistory: { '1W': [208.64, 208.19, 200.42, 204.87, 206.81], '1M': [220.78, 225.83, 235.74, 225.32, 222.32, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 205.1, 208.64, 208.19, 200.42, 204.87, 206.81], '6M': [175.02, 180.99, 188.22, 187.24, 185.81, 183.32, 191.52, 174.19, 190.05, 187.9, 184.89, 183.34, 183.14, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 199.57, 211.5, 235.74, 219.51, 211.14, 205.1, 206.81], '1Y': [145, 143.85, 157.75, 158.24, 164.07, 171.38, 176.75, 173.72, 182.7, 180.45, 177.99, 174.18, 168.31, 177.75, 183.61, 181.85, 185.54, 188.32, 182.64, 191.49, 202.49, 188.15, 190.17, 178.88, 179.92, 185.55, 176.29, 183.69, 187.54, 189.11, 183.14, 184.84, 191.52, 174.19, 190.05, 187.9, 184.89, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 199.57, 211.5, 235.74, 219.51, 211.14, 205.1, 206.81] },
      velocityScore: { '1D': 9.4, '1W': 13.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.0T', pe: 31.6, revenueGrowth: 85, eps: 6.54, grossMargin: 74, dividendYield: 0.49,
      etfPresence: { AIS: 2.49, ARTY: 3.56, BAI: 4.36, IGPT: 5.73, IVES: 4.76, ALAI: 13.49, CHAT: 6.95, AIFD: 6.62, SPRX: 4.15, AOTG: 10.95 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.47, proScore: 4.92, coverage: 0.9,
      price: 514.5, weeklyPrices: [490.33, 475.51, 452.40, 488.45, 514.50], weeklyChange: 4.93, sortRank: 0, periodReturns: { '1M': 14.8, '6M': 144.1, '1Y': 334.2 },
      priceHistory: { '1W': [490.33, 475.51, 452.4, 488.45, 514.5], '1M': [448.29, 445.5, 449.7, 424.1, 420.99, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 466.38, 490.33, 475.51, 452.4, 488.45, 514.5], '6M': [210.78, 213.43, 215.61, 214.35, 220.97, 249.8, 252.74, 200.19, 213.58, 203.37, 203.68, 199.45, 197.74, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 354.49, 408.46, 449.7, 449.59, 516.1, 466.38, 514.5], '1Y': [118.5, 128.24, 143.81, 134.8, 146.24, 157, 173.66, 171.7, 172.76, 177.51, 167.76, 162.63, 151.41, 161.16, 159.79, 161.36, 203.71, 216.42, 240.56, 259.67, 256.12, 233.54, 246.81, 203.78, 219.76, 221.11, 207.58, 214.95, 215.34, 210.02, 223.6, 253.73, 252.74, 200.19, 213.58, 203.37, 203.68, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 354.49, 408.46, 449.7, 449.59, 516.1, 466.38, 514.5] },
      velocityScore: { '1D': 12.3, '1W': 3.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$839B', pe: 172.6, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.54, ARTY: 7.39, BAI: 4.74, IGPT: 7.12, IVES: 4.84, ALAI: 1.08, CHAT: 3.98, AIFD: false, SPRX: 0.52, AOTG: 15.04 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 8, avgWeight: 7.64, proScore: 6.11, coverage: 0.8,
      price: 1000.06, weeklyPrices: [949.28, 935.89, 891.88, 995.87, 1000.06], weeklyChange: 5.35, sortRank: 0, periodReturns: { '1M': 30.5, '6M': 314.7, '1Y': 760.8 },
      priceHistory: { '1W': [949.28, 935.89, 891.88, 995.87, 1000.06], '1M': [766.58, 803.63, 776.01, 724.66, 681.54, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 864.01, 949.28, 935.89, 891.88, 995.87, 1000.06], '6M': [241.14, 265.92, 294.37, 343.43, 338.13, 389.11, 435.28, 379.4, 410.34, 417.35, 415.56, 397.05, 405.35, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 776.01, 762.1, 971, 864.01, 1000.06], '1Y': [116.18, 123.6, 124.76, 119.92, 118.61, 113.23, 111.25, 104.88, 118.89, 120.87, 117.68, 119.01, 131.46, 157.77, 164.62, 163.9, 190.96, 192.77, 206.77, 220.1, 223.77, 237.92, 246.83, 207.37, 240.46, 246.92, 237.5, 276.59, 292.63, 339.55, 333.35, 397.58, 435.28, 379.4, 410.34, 417.35, 415.56, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 517.16, 646.63, 776.01, 762.1, 971, 864.01, 1000.06] },
      velocityScore: { '1D': 13.6, '1W': 7.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 47.2, revenueGrowth: 196, eps: 21.21, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { AIS: 8.36, ARTY: 7.85, BAI: 6.23, IGPT: 12.59, IVES: 6.17, ALAI: false, CHAT: 4.01, AIFD: 6.18, SPRX: false, AOTG: 9.75 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.56, proScore: 2.85, coverage: 0.8,
      price: 383.03, weeklyPrices: [396.60, 392.16, 372.10, 385.57, 383.03], weeklyChange: -3.42, sortRank: 0, periodReturns: { '1M': -8.7, '6M': 6.4, '1Y': 49.6 },
      priceHistory: { '1W': [396.6, 392.16, 372.1, 385.57, 383.03], '1M': [419.3, 416.79, 439.79, 425.19, 420.71, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 385.73, 396.6, 392.16, 372.1, 385.57, 383.03], '6M': [359.93, 340.36, 349.39, 343.77, 354.61, 328.8, 333.24, 308.05, 342.76, 333.99, 321.7, 332.77, 335.97, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 417.43, 412.56, 439.79, 414.57, 446.77, 385.73, 383.03], '1Y': [256.07, 249.99, 269.35, 274.18, 275.6, 288.21, 294.3, 288.64, 304.97, 306.34, 294, 297.39, 345.65, 364.09, 338.79, 327.9, 335.49, 356.7, 349.24, 362.05, 369.63, 349.43, 342.46, 340.2, 386.08, 401.1, 339.81, 341.45, 349.85, 343.5, 339.89, 325.49, 333.24, 308.05, 342.76, 333.99, 321.7, 332.77, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 417.43, 412.56, 439.79, 414.57, 446.77, 385.73, 383.03] },
      velocityScore: { '1D': 10.5, '1W': 9.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63.7, revenueGrowth: 48, eps: 6.01, grossMargin: 76, dividendYield: 0.67,
      etfPresence: { AIS: 0.69, ARTY: 3.46, BAI: 4.41, IGPT: false, IVES: 4.47, ALAI: 4.04, CHAT: 4.33, AIFD: 5.54, SPRX: false, AOTG: 1.56 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 6, avgWeight: 4.84, proScore: 2.9, coverage: 0.6,
      price: 426.13, weeklyPrices: [426.80, 427.92, 408.75, 421.07, 426.13], weeklyChange: -0.16, sortRank: 0, periodReturns: { '1M': 7.3, '6M': 45.9, '1Y': 97.8 },
      priceHistory: { '1W': [426.8, 427.92, 408.75, 421.07, 426.13], '1M': [397.28, 399.8, 417.72, 404.35, 395.95, 401.62, 407.15, 404.52, 412.32, 422.73, 424.86, 418.45, 435.63, 446.69, 436.69, 415.17, 426.8, 427.92, 408.75, 421.07, 426.13], '6M': [292.04, 288.95, 300.92, 327.43, 331.21, 326.12, 342.3, 325.74, 374.09, 360.39, 376.81, 353.86, 336.71, 339.57, 347.75, 341.49, 365.49, 363.35, 382.66, 396.06, 414.15, 417.72, 407.15, 418.45, 415.17, 426.13], '1Y': [215.43, 209.51, 228.57, 229.17, 228.67, 238.85, 242.75, 235.21, 241.83, 238.88, 232.99, 230.87, 247.19, 261.38, 272.63, 273.23, 302.4, 302.89, 297.7, 298.25, 300.43, 286.5, 284.82, 275.06, 287.68, 301.87, 287.74, 293.28, 299.58, 318.68, 327.11, 327.37, 342.3, 325.74, 374.09, 360.39, 376.81, 353.86, 336.71, 338.79, 326.11, 339.04, 370.6, 370.5, 402.46, 396.06, 414.15, 417.72, 407.15, 418.45, 415.17, 426.13] },
      velocityScore: { '1D': 9.8, '1W': 12.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.2T', pe: 36.7, revenueGrowth: 35, eps: 11.62, grossMargin: 62, dividendYield: 0.9,
      etfPresence: { AIS: 3.23, ARTY: false, BAI: 4.37, IGPT: false, IVES: 5.01, ALAI: 5.73, CHAT: false, AIFD: 3.33, SPRX: false, AOTG: 7.36 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 4.81, proScore: 2.88, coverage: 0.6,
      price: 365.21, weeklyPrices: [363.31, 364.26, 356.38, 357.77, 365.21], weeklyChange: 0.52, sortRank: 0, periodReturns: { '1M': -5.7, '6M': 18.1, '1Y': 107.9 },
      priceHistory: { '1W': [363.31, 364.26, 356.38, 357.77, 365.21], '1M': [387.35, 402.62, 401.07, 396.78, 396.94, 388.91, 387.66, 382.97, 388.88, 388.83, 390.13, 380.34, 376.37, 361.85, 358.99, 368.53, 363.31, 364.26, 356.38, 357.77, 365.21], '6M': [309.29, 307.16, 313.56, 314.34, 335.97, 328.38, 336.01, 333.04, 310.96, 302.85, 307.38, 300.88, 303.55, 307.69, 290.93, 297.39, 318.49, 336.02, 338.89, 384.8, 397.99, 401.07, 387.66, 380.34, 368.53, 365.21], '1Y': [175.7, 166.64, 178.53, 176.79, 181.56, 190.1, 192.58, 189.13, 201.42, 203.9, 206.09, 212.91, 234.04, 251.61, 252.53, 244.05, 250.43, 244.15, 256.55, 269.27, 281.19, 278.83, 276.41, 299.66, 314.89, 313.72, 308.22, 309.78, 313.85, 321.98, 335.84, 330.54, 336.01, 333.04, 310.96, 302.85, 307.38, 300.88, 303.55, 307.13, 280.92, 295.77, 317.24, 341.68, 344.4, 384.8, 397.99, 401.07, 387.66, 380.34, 368.53, 365.21] },
      velocityScore: { '1D': 7.1, '1W': 13.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.5T', pe: 27.9, revenueGrowth: 22, eps: 13.09, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.44, IGPT: 6.04, IVES: 4.51, ALAI: false, CHAT: 5.52, AIFD: 5.15, SPRX: false, AOTG: 4.18 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 6, avgWeight: 4.72, proScore: 2.83, coverage: 0.6,
      price: 286.7, weeklyPrices: [288.85, 266.88, 252.59, 280.71, 286.70], weeklyChange: -0.74, sortRank: 0, periodReturns: { '1M': 74.3, '6M': 239.6, '1Y': 311.7 },
      priceHistory: { '1W': [288.85, 266.88, 252.59, 280.71, 286.7], '1M': [164.5, 177.95, 182.58, 176.89, 168.93, 186.8, 190.69, 196.33, 208.26, 198.7, 204.83, 205, 219.43, 290.79, 301.65, 263.47, 288.85, 266.88, 252.59, 280.71, 286.7], '6M': [84.43, 84.09, 85.76, 88.23, 83.05, 82.55, 83.62, 73.73, 81.34, 79.61, 79.29, 75.68, 87.67, 87.62, 98.45, 106.71, 119.93, 133.37, 165.56, 165.15, 160.01, 182.58, 190.69, 205, 263.47, 286.7], '1Y': [69.64, 73.51, 77.16, 71.55, 72.51, 73.06, 75.91, 74.45, 77.34, 76.19, 73, 62.87, 66, 67.43, 75.53, 82.39, 88.92, 89.39, 85.84, 88.71, 93.74, 90.92, 86.45, 77.45, 91.1, 92, 84.26, 84.8, 86.76, 84.64, 81.21, 83.1, 83.62, 73.73, 81.34, 79.61, 79.29, 75.68, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 164.31, 165.15, 160.01, 182.58, 190.69, 205, 263.47, 286.7] },
      velocityScore: { '1D': 14.6, '1W': 6.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$251B', pe: 98.2, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { AIS: 4.58, ARTY: 9.27, BAI: 1.94, IGPT: false, IVES: false, ALAI: false, CHAT: 1.61, AIFD: 6.37, SPRX: 4.56, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 6, avgWeight: 2.47, proScore: 1.48, coverage: 0.6,
      price: 164.61, weeklyPrices: [156.40, 152.16, 151.76, 156.40, 164.61], weeklyChange: 5.25, sortRank: 0, periodReturns: { '1M': 15.5, '6M': 31.9, '1Y': 71.9 },
      priceHistory: { '1W': [156.4, 152.16, 151.76, 156.4, 164.61], '1M': [142.54, 140.69, 147.81, 141.97, 141.71, 140.49, 148.59, 154.03, 158.01, 154.31, 155.27, 159.47, 170.68, 175.33, 174.37, 154.27, 156.4, 152.16, 151.76, 156.4, 164.61], '6M': [124.76, 131.12, 134.15, 132.58, 129.93, 127.29, 150.15, 130.28, 140.66, 137.23, 130.25, 139.4, 134.03, 136.07, 135.01, 124.85, 146.05, 161.01, 172.55, 172.71, 141.75, 147.81, 148.59, 159.47, 154.27, 164.61], '1Y': [95.77, 86.25, 99.39, 101.47, 108.37, 111.61, 117.55, 117.57, 139.18, 137.3, 133.25, 136.55, 140.01, 145.43, 145.4, 143.37, 149.5, 147.45, 146.48, 156.81, 157.69, 134.65, 131.37, 117.43, 128.11, 129.11, 125.89, 130.73, 132.44, 130.08, 125.09, 138.41, 150.15, 130.28, 140.66, 137.23, 130.25, 139.4, 134.03, 136.26, 122.55, 126.68, 147.35, 164.23, 176.91, 172.71, 141.75, 147.81, 148.59, 159.47, 154.27, 164.61] },
      velocityScore: { '1D': 3.5, '1W': 0.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$207B', pe: 56.6, revenueGrowth: 35, eps: 2.91, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.39, ARTY: 2, BAI: 1.38, IGPT: false, IVES: false, ALAI: false, CHAT: 2.19, AIFD: 4.65, SPRX: 3.19, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 6 of 10 AI & ML ETFs (60% coverage) with average weight 2.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 4.11, proScore: 2.05, coverage: 0.5,
      price: 237.54, weeklyPrices: [245.22, 244.19, 238.00, 241.51, 237.54], weeklyChange: -3.13, sortRank: 0, periodReturns: { '1M': -10.6, '6M': 5, '1Y': 11.4 },
      priceHistory: { '1W': [245.22, 244.19, 238, 241.51, 237.54], '1M': [265.82, 270.13, 267.22, 264.14, 264.86, 265.01, 268.46, 266.32, 265.29, 271.85, 274, 270.64, 261.26, 256.52, 250.02, 246.03, 245.22, 244.19, 238, 241.51, 237.54], '6M': [226.19, 227.35, 232.07, 240.93, 242.6, 231.31, 243.01, 232.99, 204.08, 204.86, 207.92, 218.94, 209.53, 209.87, 211.71, 210.57, 233.65, 249.7, 255.08, 265.06, 271.17, 267.22, 268.46, 270.64, 246.03, 237.54], '1Y': [213.24, 209.69, 223.3, 223.47, 225.69, 229.3, 232.79, 214.75, 222.69, 231.03, 228.84, 229, 235.84, 231.43, 227.63, 222.17, 220.9, 220.07, 216.48, 226.97, 244.22, 244.41, 234.69, 220.69, 233.88, 226.89, 222.54, 228.43, 232.53, 241.56, 236.65, 234.34, 243.01, 232.99, 204.08, 204.86, 207.92, 218.94, 209.53, 208.76, 207.54, 209.77, 238.38, 250.56, 263.99, 265.06, 271.17, 267.22, 268.46, 270.64, 246.03, 237.54] },
      velocityScore: { '1D': 9.6, '1W': 9.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 31.1, revenueGrowth: 17, eps: 7.63, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 4.4, ALAI: 5.88, CHAT: 2.52, AIFD: 3.53, SPRX: false, AOTG: 4.21 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.57, proScore: 1.78, coverage: 0.5,
      price: 388.84, weeklyPrices: [411.74, 403.41, 397.36, 390.34, 388.84], weeklyChange: -5.56, sortRank: 0, periodReturns: { '1M': -4.6, '6M': -18.7, '1Y': -18.8 },
      priceHistory: { '1W': [411.74, 403.41, 397.36, 390.34, 388.84], '1M': [407.77, 405.21, 409.43, 421.92, 423.54, 421.06, 419.09, 418.57, 416.03, 412.67, 426.99, 450.24, 460.52, 441.31, 427.34, 416.67, 411.74, 403.41, 397.36, 390.34, 388.84], '6M': [478.53, 485.92, 487.1, 478.51, 470.67, 444.11, 481.63, 414.19, 404.37, 398.46, 401.72, 410.68, 401.86, 391.79, 371.04, 369.37, 373.07, 420.26, 415.75, 407.78, 420.77, 409.43, 419.09, 450.24, 416.67, 388.84], '1Y': [478.87, 477.4, 495.94, 497.72, 503.02, 510.06, 512.5, 524.11, 522.04, 520.17, 507.23, 506.69, 498.2, 515.36, 514.45, 514.6, 528.57, 514.05, 516.79, 531.52, 517.81, 496.82, 510.18, 472.12, 486.74, 491.02, 474.82, 484.92, 487.48, 483.47, 459.38, 451.14, 481.63, 414.19, 404.37, 398.46, 401.72, 410.68, 401.86, 389.02, 365.97, 373.46, 370.87, 422.79, 424.62, 407.78, 420.77, 409.43, 419.09, 450.24, 416.67, 388.84] },
      velocityScore: { '1D': 6.6, '1W': 6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 23.2, revenueGrowth: 18, eps: 16.78, grossMargin: 68, dividendYield: 0.93,
      etfPresence: { AIS: false, ARTY: 1.73, BAI: false, IGPT: false, IVES: 4.56, ALAI: 5.43, CHAT: 2.32, AIFD: false, SPRX: false, AOTG: 3.79 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 3.31, proScore: 1.65, coverage: 0.5,
      price: 571.99, weeklyPrices: [585.39, 584.59, 570.98, 568.43, 571.99], weeklyChange: -2.29, sortRank: 0, periodReturns: { '1M': -5.1, '6M': -11.2, '1Y': -17.5 },
      priceHistory: { '1W': [585.39, 584.59, 570.98, 568.43, 571.99], '1M': [603, 616.63, 618.43, 614.23, 611.21, 605.06, 607.38, 610.26, 612.34, 635.26, 635.29, 632.51, 600.47, 597.63, 622.98, 593, 585.39, 584.59, 570.98, 568.43, 571.99], '6M': [644.23, 658.77, 658.69, 660.62, 631.09, 612.96, 668.73, 668.99, 668.69, 644.78, 657.01, 660.57, 638.18, 615.68, 594.89, 579.23, 628.39, 676.87, 659.15, 611.91, 616.81, 618.43, 607.38, 632.51, 593, 571.99], '1Y': [693.36, 682.35, 733.63, 718.35, 720.92, 712.97, 717.63, 750.01, 769.3, 785.23, 754.79, 738.7, 752.3, 764.7, 765.16, 743.4, 715.66, 715.7, 732.17, 750.82, 648.35, 621.71, 609.46, 594.25, 640.87, 666.8, 647.51, 661.5, 665.95, 648.69, 615.52, 647.63, 668.73, 668.99, 668.69, 644.78, 657.01, 660.57, 638.18, 606.7, 547.54, 574.46, 629.86, 688.55, 675.03, 611.91, 616.81, 618.43, 607.38, 632.51, 593, 571.99] },
      velocityScore: { '1D': 6.5, '1W': 5.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 20.8, revenueGrowth: 33, eps: 27.51, grossMargin: 82, dividendYield: 0.37,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 4.56, IVES: 4.4, ALAI: 4.23, CHAT: 2.18, AIFD: false, SPRX: false, AOTG: 1.17 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.18, proScore: 1.59, coverage: 0.5,
      price: 381.79, weeklyPrices: [346.33, 341.70, 330.86, 367.47, 381.79], weeklyChange: 10.24, sortRank: 0, periodReturns: { '1M': 86.8, '6M': 156.5, '1Y': 304.7 },
      priceHistory: { '1W': [346.33, 341.7, 330.86, 367.47, 381.79], '1M': [204.42, 224.09, 228.64, 232.68, 215.58, 287.48, 297.84, 306.88, 318.72, 325.33, 349.17, 342.85, 320.09, 355.76, 363.54, 317.06, 346.33, 341.7, 330.86, 367.47, 381.79], '6M': [148.85, 164.4, 170.1, 161.01, 180.56, 176.01, 167.9, 144.67, 143.71, 132.62, 124.67, 120, 119.9, 126.34, 120.33, 106.33, 129.46, 170.81, 197.54, 194.74, 195.65, 228.64, 297.84, 342.85, 317.06, 381.79], '1Y': [94.34, 93.07, 91.02, 89.62, 90.32, 121.89, 124.05, 131.1, 179.28, 185.85, 179.09, 182.2, 216.1, 231.29, 237.3, 198.8, 220.81, 199.53, 156.31, 170.28, 186.68, 165.49, 144.34, 141.8, 165.19, 175.74, 143.66, 172.62, 170.84, 165.77, 172.14, 176.35, 167.9, 144.67, 143.71, 132.62, 124.67, 120, 119.9, 126.16, 113.61, 117.14, 149.05, 174.05, 212.84, 194.74, 195.65, 228.64, 297.84, 342.85, 317.06, 381.79] },
      velocityScore: { '1D': 15.2, '1W': 8.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$65B', pe: 259.7, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 1.97, ARTY: 1.83, BAI: false, IGPT: false, IVES: false, ALAI: 1.61, CHAT: 2.73, AIFD: false, SPRX: 7.76, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'CRDO', name: 'Credo Technology Group Holding Ltd', easyScore: 5, avgWeight: 2, proScore: 1, coverage: 0.5,
      price: 254.29, weeklyPrices: [222.27, 234.32, 237.68, 264.76, 254.29], weeklyChange: 14.41, sortRank: 0, periodReturns: { '1M': 28.1, '6M': 76.7, '1Y': 242.1 },
      priceHistory: { '1W': [222.27, 234.32, 237.68, 264.76, 254.29], '1M': [198.57, 189.36, 184.54, 172.17, 156.27, 182.98, 193.39, 218.41, 221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 206.89, 222.27, 234.32, 237.68, 264.76, 254.29], '6M': [143.91, 150.13, 144.7, 132.95, 161.38, 139.16, 129.66, 96.95, 128.4, 130.66, 114.48, 114.74, 111.57, 101.72, 103.91, 95.92, 107.93, 158.93, 185.54, 174.01, 188.29, 184.54, 193.39, 236.03, 206.89, 254.29], '1Y': [74.34, 85.51, 93.49, 92.73, 98.7, 95.74, 107.95, 107.56, 120.41, 116.74, 114.04, 123.06, 147.53, 163.98, 164.1, 146.01, 147.42, 149.9, 151.66, 154.96, 187.62, 163.61, 145.52, 133.49, 171.13, 178.94, 142.02, 149.94, 144.92, 141, 156.84, 135.1, 129.66, 96.95, 128.4, 130.66, 114.48, 114.74, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 174.01, 188.29, 184.54, 193.39, 236.03, 206.89, 254.29] },
      velocityScore: { '1D': 16.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$47B', pe: 139, revenueGrowth: 157, eps: 1.83, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: 0.91, ARTY: 1.43, BAI: 2.26, IGPT: false, IVES: false, ALAI: false, CHAT: 2.43, AIFD: false, SPRX: 2.95, AOTG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 4, avgWeight: 3.66, proScore: 1.46, coverage: 0.4,
      price: 122.94, weeklyPrices: [110.27, 107.92, 107.04, 116.96, 122.94], weeklyChange: 11.49, sortRank: 0, periodReturns: { '1M': 1.9, '6M': 225.2, '1Y': 491.9 },
      priceHistory: { '1W': [110.27, 107.92, 107.04, 116.96, 122.94], '1M': [120.61, 120.29, 115.93, 108.77, 108.17, 118.96, 118.5, 119.84, 123.52, 121.77, 120.89, 114.68, 109.33, 107.93, 112.71, 99.17, 110.27, 107.92, 107.04, 116.96, 122.94], '6M': [37.81, 36.82, 36.68, 40.04, 47.29, 54.25, 48.78, 48.6, 48.29, 44.62, 45.46, 45.95, 45.25, 45.03, 47.18, 48.03, 61.72, 68.5, 66.78, 94.48, 109.62, 115.93, 118.5, 114.68, 99.17, 122.94], '1Y': [20.77, 21.08, 22.69, 22, 23.3, 23.26, 20.68, 19.31, 19.95, 24.56, 24.8, 24.35, 24.48, 24.77, 28.76, 34.48, 36.59, 37.22, 38.1, 39.54, 39.99, 38.13, 35.52, 34.5, 40.01, 40.3, 37.51, 36.37, 37.3, 42.63, 48.72, 54.32, 48.78, 48.6, 48.29, 44.62, 45.46, 45.95, 45.25, 46.18, 44.1, 50.38, 62.38, 68.5, 82.54, 94.48, 109.62, 115.93, 118.5, 114.68, 99.17, 122.94] },
      velocityScore: { '1D': 14.1, '1W': 32.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$618B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.3, ARTY: false, BAI: 3, IGPT: 7.09, IVES: false, ALAI: false, CHAT: 1.24, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 4, avgWeight: 3.4, proScore: 1.36, coverage: 0.4,
      price: 922.79, weeklyPrices: [895.40, 821.76, 853.26, 889.59, 922.79], weeklyChange: 3.06, sortRank: 0, periodReturns: { '1M': -7, '6M': 184.5, '1Y': 979.3 },
      priceHistory: { '1W': [895.4, 821.76, 853.26, 889.59, 922.79], '1M': [992.37, 1030.37, 1001.81, 970.7, 884.98, 868.07, 964.5, 946.9, 910.81, 902.31, 860.62, 854.96, 905, 1029.15, 938, 863.66, 895.4, 821.76, 853.26, 889.59, 922.79], '6M': [324.35, 371.43, 372.61, 397.42, 361.33, 362.44, 385, 465.54, 574.11, 635.64, 677, 650.82, 616.09, 700.81, 777.17, 764.65, 894.13, 891.22, 846.89, 902.32, 892.58, 1001.81, 964.5, 854.96, 863.66, 922.79], '1Y': [85.5, 89.66, 94.75, 91.08, 92.24, 103.84, 107.17, 106.68, 116.27, 115.86, 119.34, 132.81, 149.4, 168.77, 164.71, 162.58, 160.6, 160.56, 161, 193.8, 201.56, 240.11, 232.15, 255.59, 317.93, 342.56, 334.69, 389.88, 371.18, 392.88, 331.62, 354.49, 385, 465.54, 574.11, 635.64, 677, 650.82, 616.09, 772.13, 688.8, 826.88, 897.3, 894.07, 881.64, 902.32, 892.58, 1001.81, 964.5, 854.96, 863.66, 922.79] },
      velocityScore: { '1D': 10.6, '1W': 7.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$72B', pe: 162.2, revenueGrowth: 90, eps: 5.69, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.85, IGPT: false, IVES: false, ALAI: false, CHAT: 1.55, AIFD: 5.71, SPRX: 3.49, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 4 of 10 AI & ML ETFs (40% coverage) with average weight 3.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 4, avgWeight: 3.08, proScore: 1.23, coverage: 0.4,
      price: 183.97, weeklyPrices: [211.82, 205.81, 201.26, 184.10, 183.97], weeklyChange: -13.15, sortRank: 0, periodReturns: { '1M': -1.5, '6M': -3.2, '1Y': -8 },
      priceHistory: { '1W': [211.82, 205.81, 201.26, 184.1, 183.97], '1M': [186.83, 189.76, 195.61, 192.95, 186.61, 188.16, 189.77, 192.08, 193.06, 190.96, 203.7, 225.78, 248.15, 244.58, 230.33, 213.68, 211.82, 205.81, 201.26, 184.1, 183.97], '6M': [189.97, 191.97, 195.38, 193.75, 202.29, 173.88, 172.8, 146.67, 157.16, 156.54, 150.31, 154.79, 159.16, 152.9, 146.02, 145.23, 137.86, 178.34, 176.28, 161.39, 194.59, 195.61, 189.77, 225.78, 213.68, 183.97], '1Y': [199.86, 205.17, 210.24, 232.26, 229.28, 243.54, 247.71, 244.42, 250.05, 248.28, 236.37, 226.13, 238.48, 302.14, 328.15, 282.76, 291.59, 308.01, 277.18, 281.4, 262.61, 239.26, 222.85, 198.76, 200.94, 220.54, 184.92, 198.38, 197.21, 192.84, 193.61, 178.18, 172.8, 146.67, 157.16, 156.54, 150.31, 154.79, 159.16, 155.52, 142.81, 146.38, 138.09, 175.06, 173.28, 161.39, 194.59, 195.61, 189.77, 225.78, 213.68, 183.97] },
      velocityScore: { '1D': 0, '1W': -2.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$529B', pe: 31.5, revenueGrowth: 21, eps: 5.84, grossMargin: 66, dividendYield: 1.09,
      etfPresence: { AIS: false, ARTY: 3.72, BAI: false, IGPT: false, IVES: 3.73, ALAI: false, CHAT: 1.69, AIFD: false, SPRX: false, AOTG: 3.17 },
      tonyNote: 'Oracle lands in 3 AI ETFs on the strength of its cloud database and AI infrastructure contracts. Revenue grew 22%, 67% gross margin, P/E of 40x. The 17.5% weekly return following a major earnings beat shows how quickly sentiment can reprice; the weight score at 2.04% is still modest, meaning ETF managers have started building positions but conviction is not yet deep.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, avgWeight: 2.88, proScore: 1.15, coverage: 0.4,
      price: 299.06, weeklyPrices: [300.57, 289.52, 280.98, 297.88, 299.06], weeklyChange: -0.5, sortRank: 0, periodReturns: { '1M': -18.5, '6M': 85.4, '1Y': 161.2 },
      priceHistory: { '1W': [300.57, 289.52, 280.98, 297.88, 299.06], '1M': [367.13, 369.99, 376.23, 370.94, 339.73, 315.67, 323.4, 327.46, 323.91, 319.78, 314.18, 315.71, 323.39, 334.49, 331.44, 300.51, 300.57, 289.52, 280.98, 297.88, 299.06], '6M': [161.27, 159.82, 165.62, 174.95, 172.72, 181.47, 193.76, 182.56, 248.51, 243.06, 259.23, 249.75, 265.38, 264.71, 276.16, 259.37, 287.64, 294.13, 321.75, 328.49, 340.01, 376.23, 323.4, 315.71, 300.51, 299.06], '1Y': [114.5, 118.54, 127.16, 126.26, 124.72, 126.21, 142.55, 141.59, 139.93, 133.07, 125.97, 127.55, 121.82, 138.26, 151.96, 143.31, 162.8, 179, 175.73, 192.9, 192.86, 179.8, 170.97, 159.83, 179.22, 185.61, 161.74, 166.25, 164.34, 171.54, 170.86, 181.12, 193.76, 182.56, 248.51, 243.06, 259.23, 249.75, 265.38, 269.17, 252.4, 261.29, 295.11, 307.34, 323.46, 328.49, 340.01, 376.23, 323.4, 315.71, 300.51, 299.06] },
      velocityScore: { '1D': -17.3, '1W': -13.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$115B', pe: 75, revenueGrowth: 30, eps: 3.99, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.63, ARTY: false, BAI: 1.88, IGPT: false, IVES: false, ALAI: false, CHAT: 2.21, AIFD: 3.82, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 4, avgWeight: 2.87, proScore: 1.15, coverage: 0.4,
      price: 561.14, weeklyPrices: [526.93, 517.72, 490.09, 529.29, 561.14], weeklyChange: 6.49, sortRank: 0, periodReturns: { '1M': 14.8, '6M': 218.2, '1Y': 906 },
      priceHistory: { '1W': [526.93, 517.72, 490.09, 529.29, 561.14], '1M': [488.74, 494.09, 489.15, 482.02, 458.68, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 511.72, 526.93, 517.72, 490.09, 529.29, 561.14], '6M': [176.34, 181.08, 179.68, 219.38, 214, 241.9, 279.7, 269.41, 273.74, 284.67, 282.25, 259.03, 261.18, 304.9, 296.14, 297.73, 337.88, 361.69, 403.12, 434.52, 463.91, 489.15, 486.46, 531.21, 511.72, 561.14], '1Y': [55.78, 59.29, 63.29, 65.22, 66.93, 68.74, 68.99, 76.55, 74.97, 75.06, 76.97, 80.34, 93.29, 102.39, 112.41, 116.74, 125.28, 118.86, 121.53, 126.67, 150.21, 162.96, 157.83, 139.19, 163.54, 169.78, 172.04, 176.76, 176.06, 199.88, 215, 243.29, 279.7, 269.41, 273.74, 284.67, 282.25, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 434.52, 463.91, 489.15, 486.46, 531.21, 511.72, 561.14] },
      velocityScore: { '1D': 13.9, '1W': -6.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$193B', pe: 33.5, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { AIS: 1.54, ARTY: 2.72, BAI: 2.91, IGPT: false, IVES: false, ALAI: 4.3, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, avgWeight: 2.78, proScore: 1.11, coverage: 0.4,
      price: 923.5, weeklyPrices: [876.77, 846.01, 815.99, 868.09, 923.50], weeklyChange: 5.33, sortRank: 0, periodReturns: { '1M': 14.2, '6M': 221.1, '1Y': 632.5 },
      priceHistory: { '1W': [876.77, 846.01, 815.99, 868.09, 923.5], '1M': [808.8, 817.35, 804.76, 795.47, 740.84, 751.07, 810.46, 812.73, 845.76, 870.66, 880.72, 879.8, 921.26, 926.61, 940.69, 847.47, 876.77, 846.01, 815.99, 868.09, 923.5], '6M': [287.64, 296.36, 281.3, 330.42, 318.44, 344.22, 442.93, 418.63, 407.25, 408.97, 409.67, 367.34, 373.98, 406.77, 413.22, 423.12, 500.77, 531.81, 587.62, 673.64, 766.44, 804.76, 810.46, 879.8, 847.47, 923.5], '1Y': [126.07, 130.96, 141.44, 148.39, 149.08, 149.63, 150.46, 154.81, 150.45, 154.43, 159.21, 167.4, 189.24, 211.12, 229.33, 229.14, 242.83, 219.51, 214.4, 230.32, 255.88, 279.35, 258.21, 237.49, 270.1, 285.41, 285.58, 282.85, 280.08, 308.26, 312.28, 346.53, 442.93, 418.63, 407.25, 408.97, 409.67, 367.34, 373.98, 434.6, 378.79, 429.36, 503.13, 547.75, 586.25, 673.64, 766.44, 804.76, 810.46, 879.8, 847.47, 923.5] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$209B', pe: 88, revenueGrowth: 44, eps: 10.5, grossMargin: 42, dividendYield: 0.34,
      etfPresence: { AIS: 2.71, ARTY: 3.05, BAI: false, IGPT: 3.3, IVES: false, ALAI: 2.08, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 4, avgWeight: 2.5, proScore: 1, coverage: 0.4,
      price: 399.4, weeklyPrices: [408.95, 396.68, 381.59, 399.15, 399.40], weeklyChange: -2.34, sortRank: 0, periodReturns: { '1M': -7.9, '6M': -13, '1Y': 25.2 },
      priceHistory: { '1W': [408.95, 396.68, 381.59, 399.15, 399.4], '1M': [433.45, 445.27, 443.3, 422.24, 409.99, 417.26, 417.85, 426.01, 433.59, 440.36, 442.1, 435.79, 415.88, 423.74, 423.7, 391, 408.95, 396.68, 381.59, 399.15, 399.4], '6M': [458.96, 481.2, 459.64, 432.96, 447.2, 431.44, 431.46, 406.01, 428.27, 411.71, 408.58, 405.55, 395.01, 392.78, 385.95, 381.26, 345.62, 388.9, 373.72, 381.63, 411.79, 443.3, 417.85, 435.79, 391, 399.4], '1Y': [319.11, 322.16, 323.63, 293.94, 316.9, 328.49, 325.59, 302.63, 329.65, 330.56, 340.01, 333.87, 346.4, 410.04, 434.21, 443.21, 453.25, 435.9, 447.43, 452.42, 456.56, 429.52, 404.35, 391.09, 430.14, 439.58, 475.31, 488.73, 454.43, 431.41, 439.2, 449.36, 431.46, 406.01, 428.27, 411.71, 408.58, 405.55, 395.01, 380.3, 372.11, 360.59, 348.95, 400.62, 376.3, 381.63, 411.79, 443.3, 417.85, 435.79, 391, 399.4] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$1.5T', pe: 369.8, revenueGrowth: 16, eps: 1.08, grossMargin: 19, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 1.09, IGPT: false, IVES: 4.42, ALAI: 2.56, CHAT: false, AIFD: 1.92, SPRX: false, AOTG: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 6.25, proScore: 6.25, coverage: 1,
      price: 1000.06, weeklyPrices: [949.28, 935.89, 891.88, 995.87, 1000.06], weeklyChange: 5.35, sortRank: 0, periodReturns: { '1M': 30.5, '6M': 314.7, '1Y': 760.8 },
      priceHistory: { '1W': [949.28, 935.89, 891.88, 995.87, 1000.06], '1M': [766.58, 803.63, 776.01, 724.66, 681.54, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 864.01, 949.28, 935.89, 891.88, 995.87, 1000.06], '6M': [241.14, 265.92, 294.37, 343.43, 338.13, 389.11, 435.28, 379.4, 410.34, 417.35, 415.56, 397.05, 405.35, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 776.01, 762.1, 971, 864.01, 1000.06], '1Y': [116.18, 123.6, 124.76, 119.92, 118.61, 113.23, 111.25, 104.88, 118.89, 120.87, 117.68, 119.01, 131.46, 157.77, 164.62, 163.9, 190.96, 192.77, 206.77, 220.1, 223.77, 237.92, 246.83, 207.37, 240.46, 246.92, 237.5, 276.59, 292.63, 339.55, 333.35, 397.58, 435.28, 379.4, 410.34, 417.35, 415.56, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 517.16, 646.63, 776.01, 762.1, 971, 864.01, 1000.06] },
      velocityScore: { '1D': 4, '1W': 3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 47.2, revenueGrowth: 196, eps: 21.21, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { SOXX: 11.55, PSI: 5.54, XSD: 3.63, DRAM: 4.28 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.72, proScore: 4.29, coverage: 0.75,
      price: 514.5, weeklyPrices: [490.33, 475.51, 452.40, 488.45, 514.50], weeklyChange: 4.93, sortRank: 0, periodReturns: { '1M': 14.8, '6M': 144.1, '1Y': 334.2 },
      priceHistory: { '1W': [490.33, 475.51, 452.4, 488.45, 514.5], '1M': [448.29, 445.5, 449.7, 424.1, 420.99, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 466.38, 490.33, 475.51, 452.4, 488.45, 514.5], '6M': [210.78, 213.43, 215.61, 214.35, 220.97, 249.8, 252.74, 200.19, 213.58, 203.37, 203.68, 199.45, 197.74, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 354.49, 408.46, 449.7, 449.59, 516.1, 466.38, 514.5], '1Y': [118.5, 128.24, 143.81, 134.8, 146.24, 157, 173.66, 171.7, 172.76, 177.51, 167.76, 162.63, 151.41, 161.16, 159.79, 161.36, 203.71, 216.42, 240.56, 259.67, 256.12, 233.54, 246.81, 203.78, 219.76, 221.11, 207.58, 214.95, 215.34, 210.02, 223.6, 253.73, 252.74, 200.19, 213.58, 203.37, 203.68, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 354.49, 408.46, 449.7, 449.59, 516.1, 466.38, 514.5] },
      velocityScore: { '1D': -0.5, '1W': -4.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$839B', pe: 172.6, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 8.7, PSI: 4.83, XSD: 3.63, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.86, proScore: 3.64, coverage: 0.75,
      price: 122.94, weeklyPrices: [110.27, 107.92, 107.04, 116.96, 122.94], weeklyChange: 11.49, sortRank: 0, periodReturns: { '1M': 1.9, '6M': 225.2, '1Y': 491.9 },
      priceHistory: { '1W': [110.27, 107.92, 107.04, 116.96, 122.94], '1M': [120.61, 120.29, 115.93, 108.77, 108.17, 118.96, 118.5, 119.84, 123.52, 121.77, 120.89, 114.68, 109.33, 107.93, 112.71, 99.17, 110.27, 107.92, 107.04, 116.96, 122.94], '6M': [37.81, 36.82, 36.68, 40.04, 47.29, 54.25, 48.78, 48.6, 48.29, 44.62, 45.46, 45.95, 45.25, 45.03, 47.18, 48.03, 61.72, 68.5, 66.78, 94.48, 109.62, 115.93, 118.5, 114.68, 99.17, 122.94], '1Y': [20.77, 21.08, 22.69, 22, 23.3, 23.26, 20.68, 19.31, 19.95, 24.56, 24.8, 24.35, 24.48, 24.77, 28.76, 34.48, 36.59, 37.22, 38.1, 39.54, 39.99, 38.13, 35.52, 34.5, 40.01, 40.3, 37.51, 36.37, 37.3, 42.63, 48.72, 54.32, 48.78, 48.6, 48.29, 44.62, 45.46, 45.95, 45.25, 46.18, 44.1, 50.38, 62.38, 68.5, 82.54, 94.48, 109.62, 115.93, 118.5, 114.68, 99.17, 122.94] },
      velocityScore: { '1D': 0.8, '1W': 7.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$618B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.13, PSI: 4.72, XSD: 3.72, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 3.99, proScore: 2.99, coverage: 0.75,
      price: 206.81, weeklyPrices: [208.64, 208.19, 200.42, 204.87, 206.81], weeklyChange: -0.88, sortRank: 0, periodReturns: { '1M': -6.3, '6M': 18.2, '1Y': 42.6 },
      priceHistory: { '1W': [208.64, 208.19, 200.42, 204.87, 206.81], '1M': [220.78, 225.83, 235.74, 225.32, 222.32, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 205.1, 208.64, 208.19, 200.42, 204.87, 206.81], '6M': [175.02, 180.99, 188.22, 187.24, 185.81, 183.32, 191.52, 174.19, 190.05, 187.9, 184.89, 183.34, 183.14, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 199.57, 211.5, 235.74, 219.51, 211.14, 205.1, 206.81], '1Y': [145, 143.85, 157.75, 158.24, 164.07, 171.38, 176.75, 173.72, 182.7, 180.45, 177.99, 174.18, 168.31, 177.75, 183.61, 181.85, 185.54, 188.32, 182.64, 191.49, 202.49, 188.15, 190.17, 178.88, 179.92, 185.55, 176.29, 183.69, 187.54, 189.11, 183.14, 184.84, 191.52, 174.19, 190.05, 187.9, 184.89, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 199.57, 211.5, 235.74, 219.51, 211.14, 205.1, 206.81] },
      velocityScore: { '1D': -6, '1W': -4.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.0T', pe: 31.6, revenueGrowth: 85, eps: 6.54, grossMargin: 74, dividendYield: 0.49,
      etfPresence: { SOXX: 5.53, PSI: 4.76, XSD: 1.68, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.21, proScore: 2.41, coverage: 0.75,
      price: 421.77, weeklyPrices: [403.89, 404.62, 392.67, 412.13, 421.77], weeklyChange: 4.43, sortRank: 0, periodReturns: { '1M': 0.5, '6M': 51, '1Y': 81.7 },
      priceHistory: { '1W': [403.89, 404.62, 392.67, 412.13, 421.77], '1M': [419.65, 432.39, 426.79, 417.49, 418.58, 398.05, 384.21, 397.07, 419.94, 416.88, 419.01, 413.85, 402.69, 423.2, 437.67, 401.39, 403.89, 404.62, 392.67, 412.13, 421.77], '6M': [279.32, 274.44, 275.63, 292.94, 296.21, 304.97, 317.63, 320.44, 337, 345.3, 354.35, 329.72, 307.27, 308.59, 322.03, 320.58, 351.36, 353.8, 403.88, 402.26, 408.52, 426.79, 384.21, 413.85, 401.39, 421.77], '1Y': [232.12, 228.35, 236.96, 241.81, 243.46, 240.48, 230.77, 221.71, 223.95, 231.63, 252.2, 251.31, 248.98, 244.91, 247.34, 244.79, 242.5, 234.67, 246.22, 243.01, 234.13, 228.48, 234.89, 232.32, 266.51, 279.13, 280.44, 275.82, 274.82, 292.89, 297.99, 308.52, 317.63, 320.44, 337, 345.3, 354.35, 329.72, 307.27, 310.44, 313.42, 318.34, 350.14, 371.45, 399.57, 402.26, 408.52, 426.79, 384.21, 413.85, 401.39, 421.77] },
      velocityScore: { '1D': -3.2, '1W': -2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$205B', pe: 62.8, revenueGrowth: 37, eps: 6.72, grossMargin: 64, dividendYield: 1.07,
      etfPresence: { SOXX: 2.77, PSI: 4.9, XSD: 1.97, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 6.48, proScore: 3.24, coverage: 0.5,
      price: 286.7, weeklyPrices: [288.85, 266.88, 252.59, 280.71, 286.70], weeklyChange: -0.74, sortRank: 0, periodReturns: { '1M': 74.3, '6M': 239.6, '1Y': 311.7 },
      priceHistory: { '1W': [288.85, 266.88, 252.59, 280.71, 286.7], '1M': [164.5, 177.95, 182.58, 176.89, 168.93, 186.8, 190.69, 196.33, 208.26, 198.7, 204.83, 205, 219.43, 290.79, 301.65, 263.47, 288.85, 266.88, 252.59, 280.71, 286.7], '6M': [84.43, 84.09, 85.76, 88.23, 83.05, 82.55, 83.62, 73.73, 81.34, 79.61, 79.29, 75.68, 87.67, 87.62, 98.45, 106.71, 119.93, 133.37, 165.56, 165.15, 160.01, 182.58, 190.69, 205, 263.47, 286.7], '1Y': [69.64, 73.51, 77.16, 71.55, 72.51, 73.06, 75.91, 74.45, 77.34, 76.19, 73, 62.87, 66, 67.43, 75.53, 82.39, 88.92, 89.39, 85.84, 88.71, 93.74, 90.92, 86.45, 77.45, 91.1, 92, 84.26, 84.8, 86.76, 84.64, 81.21, 83.1, 83.62, 73.73, 81.34, 79.61, 79.29, 75.68, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 164.31, 165.15, 160.01, 182.58, 190.69, 205, 263.47, 286.7] },
      velocityScore: { '1D': 2.9, '1W': -7.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$251B', pe: 98.2, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { SOXX: 8.22, PSI: false, XSD: 4.73, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 5.67, proScore: 2.84, coverage: 0.5,
      price: 564.47, weeklyPrices: [492.17, 499.21, 497.01, 552.64, 564.47], weeklyChange: 14.69, sortRank: 0, periodReturns: { '1M': 30.9, '6M': 117.8, '1Y': 222.6 },
      priceHistory: { '1W': [492.17, 499.21, 497.01, 552.64, 564.47], '1M': [431.2, 436.61, 440.56, 436.62, 413.57, 426.85, 427.36, 432.16, 454.89, 448.25, 449.68, 450.06, 458.17, 490.05, 500.77, 453.01, 492.17, 499.21, 497.01, 552.64, 564.47], '6M': [259.21, 256.41, 263.05, 296.01, 304.87, 325.24, 336.75, 297.6, 339.88, 369.83, 375.72, 346.53, 337.27, 349.47, 369.34, 353.8, 397.81, 389.9, 403.91, 394.49, 410.64, 440.56, 427.36, 450.06, 453.01, 564.47], '1Y': [175, 169.46, 183.21, 190.78, 197.1, 192.61, 190.27, 179.99, 184.87, 161.76, 162.49, 160.76, 162.05, 170.93, 200.52, 204.95, 223.91, 219.48, 228.13, 231.33, 233.1, 230.07, 226.01, 224.01, 254.75, 268.16, 261.27, 259.01, 259.97, 292.2, 301.89, 318.79, 336.75, 297.6, 339.88, 369.83, 375.72, 346.53, 337.27, 357.21, 338.55, 348.47, 399.49, 396.94, 417.04, 394.49, 410.64, 440.56, 427.36, 450.06, 453.01, 564.47] },
      velocityScore: { '1D': 2.2, '1W': 10.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$448B', pe: 53.2, revenueGrowth: 11, eps: 10.61, grossMargin: 49, dividendYield: 0.38,
      etfPresence: { SOXX: 5.3, PSI: 6.05, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 4.88, proScore: 2.44, coverage: 0.5,
      price: 250.19, weeklyPrices: [210.81, 213.94, 213.56, 241.16, 250.19], weeklyChange: 18.68, sortRank: 0, periodReturns: { '1M': 38.1, '6M': 109.6, '1Y': 185.9 },
      priceHistory: { '1W': [210.81, 213.94, 213.56, 241.16, 250.19], '1M': [181.13, 184.97, 189.29, 180.43, 175.65, 182.95, 184.22, 188.84, 201.14, 195.72, 192.76, 192.17, 194, 204.52, 212.51, 192.92, 210.81, 213.94, 213.56, 241.16, 250.19], '6M': [119.39, 124.57, 126.04, 139.5, 144.18, 152, 162.72, 130.72, 147.95, 146.99, 152.43, 142.94, 140.96, 148.24, 154.38, 151.98, 172.73, 173.49, 181.54, 175.04, 176.32, 189.29, 184.22, 192.17, 192.92, 250.19], '1Y': [87.5, 85, 88.99, 91.26, 92.18, 93.78, 92.32, 88.66, 91.48, 87.49, 87.03, 87.2, 90.9, 98.89, 107.13, 106.41, 113.97, 102.5, 115.29, 121.51, 120.87, 119.34, 113.43, 109.71, 115.72, 122.46, 122.51, 126.57, 124.36, 135.97, 143.45, 150, 162.72, 130.72, 147.95, 146.99, 152.43, 142.94, 140.96, 151.15, 145.11, 151.68, 173.73, 179.14, 193.5, 175.04, 176.32, 189.29, 184.22, 192.17, 192.92, 250.19] },
      velocityScore: { '1D': 3.8, '1W': 13.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$327B', pe: 71.1, revenueGrowth: 12, eps: 3.52, grossMargin: 61, dividendYield: 0.38,
      etfPresence: { SOXX: 3.78, PSI: 5.97, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 4.65, proScore: 2.33, coverage: 0.5,
      price: 371.08, weeklyPrices: [324.45, 327.16, 321.80, 362.52, 371.08], weeklyChange: 14.37, sortRank: 0, periodReturns: { '1M': 28.3, '6M': 131.2, '1Y': 304.8 },
      priceHistory: { '1W': [324.45, 327.16, 321.8, 362.52, 371.08], '1M': [289.24, 295.44, 299.15, 284.72, 277.96, 292.09, 302.24, 305.35, 322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 303.28, 324.45, 327.16, 321.8, 362.52, 371.08], '6M': [160.52, 172.27, 175.87, 206.96, 214.38, 228.39, 239.58, 209.78, 235.12, 237.39, 239.07, 214.68, 209.49, 224.71, 233.45, 222.01, 258.76, 260.96, 258.56, 257.86, 286.52, 299.15, 302.24, 318.18, 303.28, 371.08], '1Y': [91.66, 90.49, 97.2, 98.14, 99.62, 101.74, 98.62, 96.37, 101.75, 99.51, 100.08, 100.15, 105.07, 119.21, 132.2, 131.09, 149.15, 137.81, 144.05, 156.9, 157.46, 159.35, 148.26, 142.65, 154.79, 162.74, 164.3, 175.26, 173.78, 203.08, 208.79, 220.7, 239.58, 209.78, 235.12, 237.39, 239.07, 214.68, 209.49, 233.99, 211.62, 218.44, 263.66, 267.6, 267.78, 257.86, 286.52, 299.15, 302.24, 318.18, 303.28, 371.08] },
      velocityScore: { '1D': 3.6, '1W': 8.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$464B', pe: 70.1, revenueGrowth: 24, eps: 5.29, grossMargin: 50, dividendYield: 0.29,
      etfPresence: { SOXX: 3.71, PSI: 5.6, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 3.75, proScore: 1.87, coverage: 0.5,
      price: 383.03, weeklyPrices: [396.60, 392.16, 372.10, 385.57, 383.03], weeklyChange: -3.42, sortRank: 0, periodReturns: { '1M': -8.7, '6M': 6.4, '1Y': 49.6 },
      priceHistory: { '1W': [396.6, 392.16, 372.1, 385.57, 383.03], '1M': [419.3, 416.79, 439.79, 425.19, 420.71, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 385.73, 396.6, 392.16, 372.1, 385.57, 383.03], '6M': [359.93, 340.36, 349.39, 343.77, 354.61, 328.8, 333.24, 308.05, 342.76, 333.99, 321.7, 332.77, 335.97, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 417.43, 412.56, 439.79, 414.57, 446.77, 385.73, 383.03], '1Y': [256.07, 249.99, 269.35, 274.18, 275.6, 288.21, 294.3, 288.64, 304.97, 306.34, 294, 297.39, 345.65, 364.09, 338.79, 327.9, 335.49, 356.7, 349.24, 362.05, 369.63, 349.43, 342.46, 340.2, 386.08, 401.1, 339.81, 341.45, 349.85, 343.5, 339.89, 325.49, 333.24, 308.05, 342.76, 333.99, 321.7, 332.77, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 417.43, 412.56, 439.79, 414.57, 446.77, 385.73, 383.03] },
      velocityScore: { '1D': -4.6, '1W': -4.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63.7, revenueGrowth: 48, eps: 6.01, grossMargin: 76, dividendYield: 0.67,
      etfPresence: { SOXX: 5.77, PSI: false, XSD: 1.72, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 3.48, proScore: 1.74, coverage: 0.5,
      price: 381.79, weeklyPrices: [346.33, 341.70, 330.86, 367.47, 381.79], weeklyChange: 10.24, sortRank: 0, periodReturns: { '1M': 86.8, '6M': 156.5, '1Y': 304.7 },
      priceHistory: { '1W': [346.33, 341.7, 330.86, 367.47, 381.79], '1M': [204.42, 224.09, 228.64, 232.68, 215.58, 287.48, 297.84, 306.88, 318.72, 325.33, 349.17, 342.85, 320.09, 355.76, 363.54, 317.06, 346.33, 341.7, 330.86, 367.47, 381.79], '6M': [148.85, 164.4, 170.1, 161.01, 180.56, 176.01, 167.9, 144.67, 143.71, 132.62, 124.67, 120, 119.9, 126.34, 120.33, 106.33, 129.46, 170.81, 197.54, 194.74, 195.65, 228.64, 297.84, 342.85, 317.06, 381.79], '1Y': [94.34, 93.07, 91.02, 89.62, 90.32, 121.89, 124.05, 131.1, 179.28, 185.85, 179.09, 182.2, 216.1, 231.29, 237.3, 198.8, 220.81, 199.53, 156.31, 170.28, 186.68, 165.49, 144.34, 141.8, 165.19, 175.74, 143.66, 172.62, 170.84, 165.77, 172.14, 176.35, 167.9, 144.67, 143.71, 132.62, 124.67, 120, 119.9, 126.16, 113.61, 117.14, 149.05, 174.05, 212.84, 194.74, 195.65, 228.64, 297.84, 342.85, 317.06, 381.79] },
      velocityScore: { '1D': 3, '1W': 8.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$65B', pe: 259.7, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.47, PSI: false, XSD: 4.49, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.86, proScore: 1.43, coverage: 0.5,
      price: 213.9, weeklyPrices: [217.77, 205.42, 191.20, 202.96, 213.90], weeklyChange: -1.78, sortRank: 0, periodReturns: { '1M': 1.7, '6M': 20, '1Y': 34.8 },
      priceHistory: { '1W': [217.77, 205.42, 191.2, 202.96, 213.9], '1M': [210.31, 213.17, 200.08, 201.49, 203.64, 202.51, 213.41, 238.16, 248.82, 233.4, 243.29, 251.02, 228.99, 240.84, 250.01, 215.94, 217.77, 205.42, 191.2, 202.96, 213.9], '6M': [178.29, 175.25, 173.43, 182.45, 165.29, 156.37, 152.7, 148.89, 141.04, 141.27, 145.59, 137, 131.15, 130.47, 130.35, 127.28, 127.75, 134.47, 133.95, 179.58, 202.55, 200.08, 213.41, 251.02, 215.94, 213.9], '1Y': [158.7, 151.32, 158.54, 158.09, 154.29, 158.97, 161.05, 148.19, 147.56, 157.85, 158.01, 160.73, 160.24, 161.22, 169.72, 165.3, 168.62, 161.78, 167.04, 187.68, 180.9, 170.89, 173.98, 163.3, 168.04, 175.31, 179.26, 174.22, 173.65, 180.19, 164.54, 157.8, 152.7, 148.89, 141.04, 141.27, 145.59, 137, 131.15, 131.28, 130.54, 126.8, 128.06, 136.2, 148.85, 179.58, 202.55, 200.08, 213.41, 251.02, 215.94, 213.9] },
      velocityScore: { '1D': -1.4, '1W': -12.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$225B', pe: 23, revenueGrowth: -4, eps: 9.3, grossMargin: 55, dividendYield: 1.81,
      etfPresence: { SOXX: 3.41, PSI: false, XSD: 2.3, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 2.82, proScore: 1.41, coverage: 0.5,
      price: 302.82, weeklyPrices: [290.90, 288.63, 282.01, 297.10, 302.82], weeklyChange: 4.1, sortRank: 0, periodReturns: { '1M': 2.6, '6M': 68.8, '1Y': 51.7 },
      priceHistory: { '1W': [290.9, 288.63, 282.01, 297.1, 302.82], '1M': [295.17, 306.34, 308.17, 302.73, 300.6, 304.88, 298.39, 309.21, 324.89, 317.45, 315.95, 305.68, 293.2, 308.12, 308.59, 285.06, 290.9, 288.63, 282.01, 297.1, 302.82], '6M': [179.42, 176.29, 175.69, 192.1, 188.53, 194.41, 216.17, 222.92, 226.56, 218.05, 212.63, 197.98, 190.05, 190.78, 196.77, 196.3, 214.98, 223.1, 282.23, 281.08, 285.24, 308.17, 298.39, 305.68, 285.06, 302.82], '1Y': [199.66, 198.2, 207.08, 213.41, 220.05, 214.57, 189.25, 180.86, 187.22, 194.57, 206.06, 202.48, 185.82, 178.2, 179.62, 183.23, 181.81, 175.11, 179.59, 169.41, 161.46, 160.55, 159.33, 159.4, 168.16, 180.94, 177.97, 178.82, 175.42, 185.71, 193.45, 194.99, 216.17, 222.92, 226.56, 218.05, 212.63, 197.98, 190.05, 188.29, 193.41, 194.87, 214.73, 229.82, 277.14, 281.08, 285.24, 308.17, 298.39, 305.68, 285.06, 302.82] },
      velocityScore: { '1D': -2.1, '1W': 2.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$276B', pe: 51.8, revenueGrowth: 19, eps: 5.85, grossMargin: 57, dividendYield: 1.91,
      etfPresence: { SOXX: 3.35, PSI: false, XSD: 2.28, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.8, proScore: 1.4, coverage: 0.5,
      price: 254.29, weeklyPrices: [222.27, 234.32, 237.68, 264.76, 254.29], weeklyChange: 14.41, sortRank: 0, periodReturns: { '1M': 28.1, '6M': 76.7, '1Y': 242.1 },
      priceHistory: { '1W': [222.27, 234.32, 237.68, 264.76, 254.29], '1M': [198.57, 189.36, 184.54, 172.17, 156.27, 182.98, 193.39, 218.41, 221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 206.89, 222.27, 234.32, 237.68, 264.76, 254.29], '6M': [143.91, 150.13, 144.7, 132.95, 161.38, 139.16, 129.66, 96.95, 128.4, 130.66, 114.48, 114.74, 111.57, 101.72, 103.91, 95.92, 107.93, 158.93, 185.54, 174.01, 188.29, 184.54, 193.39, 236.03, 206.89, 254.29], '1Y': [74.34, 85.51, 93.49, 92.73, 98.7, 95.74, 107.95, 107.56, 120.41, 116.74, 114.04, 123.06, 147.53, 163.98, 164.1, 146.01, 147.42, 149.9, 151.66, 154.96, 187.62, 163.61, 145.52, 133.49, 171.13, 178.94, 142.02, 149.94, 144.92, 141, 156.84, 135.1, 129.66, 96.95, 128.4, 130.66, 114.48, 114.74, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 174.01, 188.29, 184.54, 193.39, 236.03, 206.89, 254.29] },
      velocityScore: { '1D': 3.7, '1W': 28.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$47B', pe: 139, revenueGrowth: 157, eps: 1.83, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 2.12, PSI: false, XSD: 3.48, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.79, proScore: 1.4, coverage: 0.5,
      price: 1594.57, weeklyPrices: [1559.18, 1531.98, 1473.04, 1589.55, 1594.57], weeklyChange: 2.27, sortRank: 0, periodReturns: { '1M': -0.3, '6M': 68.5, '1Y': 121.9 },
      priceHistory: { '1W': [1559.18, 1531.98, 1473.04, 1589.55, 1594.57], '1M': [1599.52, 1650.35, 1613.97, 1550.02, 1486.33, 1553.27, 1561.25, 1589.81, 1662.98, 1620.17, 1633.17, 1566.21, 1542.39, 1624.99, 1689.89, 1481.05, 1559.18, 1531.98, 1473.04, 1589.55, 1594.57], '6M': [946.51, 937.11, 930.04, 1005.38, 983.28, 1074.93, 1161.78, 1136.83, 1196.73, 1175.22, 1180.13, 1078.44, 1033.88, 1075.29, 1118.66, 1119.51, 1334.21, 1402.81, 1592.17, 1614.41, 1575.96, 1613.97, 1561.25, 1566.21, 1481.05, 1594.57], '1Y': [718.57, 685.9, 736.03, 741.17, 721.14, 724.77, 738.55, 785.62, 804.29, 826.47, 844, 835.76, 864.32, 849.71, 922.81, 886.59, 968.1, 981.67, 1031.59, 1105.05, 1005, 958.26, 920.19, 872.35, 928.35, 983.58, 949.4, 945.16, 923.91, 959.08, 983.6, 1076.67, 1161.78, 1136.83, 1196.73, 1175.22, 1180.13, 1078.44, 1033.88, 1092.69, 1058.28, 1118.49, 1353.85, 1468.35, 1632.06, 1614.41, 1575.96, 1613.97, 1561.25, 1566.21, 1481.05, 1594.57] },
      velocityScore: { '1D': 0, '1W': 0.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$78B', pe: 114, revenueGrowth: 26, eps: 13.99, grossMargin: 55, dividendYield: 0.5,
      etfPresence: { SOXX: 3.33, PSI: false, XSD: 2.26, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.75, proScore: 1.37, coverage: 0.5,
      price: 307.06, weeklyPrices: [301.14, 297.41, 285.56, 302.55, 307.06], weeklyChange: 1.97, sortRank: 0, periodReturns: { '1M': 4.4, '6M': 34.6, '1Y': 41.2 },
      priceHistory: { '1W': [301.14, 297.41, 285.56, 302.55, 307.06], '1M': [294.23, 298.41, 294.17, 291.5, 291.68, 310.15, 299.38, 316.47, 332.67, 329.24, 330.28, 321.35, 311.38, 323.62, 321.88, 295.96, 301.14, 297.41, 285.56, 302.55, 307.06], '6M': [228.16, 226.27, 220.46, 245.95, 239.09, 233.72, 240.03, 226.86, 249.75, 232.11, 232.23, 210.58, 191.22, 192.69, 197.61, 195.58, 205.67, 213.73, 241.16, 293.59, 290.22, 294.17, 299.38, 321.35, 295.96, 307.06], '1Y': [217.4, 209, 217.04, 226, 224.61, 228.27, 228.49, 209.92, 207.16, 228.78, 234.83, 234.85, 225.5, 219.27, 225.73, 226.11, 231.42, 216.7, 219.82, 221.56, 209.12, 204.56, 197.1, 191.35, 199.49, 229.01, 231.83, 228.94, 219.98, 239.34, 240.81, 236.75, 240.03, 226.86, 249.75, 232.11, 232.23, 210.58, 191.22, 192.35, 196.92, 194.55, 204.37, 216.03, 244.04, 293.59, 290.22, 294.17, 299.38, 321.35, 295.96, 307.06] },
      velocityScore: { '1D': -2.1, '1W': -2.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$78B', pe: 29.3, revenueGrowth: 12, eps: 10.47, grossMargin: 56, dividendYield: 1.34,
      etfPresence: { SOXX: 3.19, PSI: false, XSD: 2.3, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 2.61, proScore: 1.31, coverage: 0.5,
      price: 118.44, weeklyPrices: [120.90, 117.00, 110.17, 115.96, 118.44], weeklyChange: -2.04, sortRank: 0, periodReturns: { '1M': 13.8, '6M': 115.5, '1Y': 123.5 },
      priceHistory: { '1W': [120.9, 117, 110.17, 115.96, 118.44], '1M': [104.11, 115.71, 118.37, 113.11, 109.43, 110.21, 109.61, 116.2, 127, 124.89, 123.77, 120.62, 120.92, 128.64, 133.93, 117.26, 120.9, 117, 110.17, 115.96, 118.44], '6M': [54.96, 55.21, 54.02, 61.76, 59.41, 63.13, 64.93, 62.06, 71.18, 68.09, 68.16, 60.85, 57.69, 60.46, 63.1, 62.2, 68.49, 79.93, 97.78, 100.81, 100.61, 118.37, 109.61, 120.62, 117.26, 118.44], '1Y': [52.98, 52.82, 52.93, 54.61, 59.07, 60.55, 58.66, 56.82, 47.66, 51.09, 51.85, 49.59, 48.88, 48.11, 51.5, 49.76, 50.35, 50.11, 54.89, 52.68, 50.08, 47.83, 46.92, 46.7, 50.43, 56.38, 55.09, 56.37, 54.24, 61.89, 60.58, 63.07, 64.93, 62.06, 71.18, 68.09, 68.16, 60.85, 57.69, 59.29, 60.87, 62.19, 68.65, 83.01, 98.4, 100.81, 100.61, 118.37, 109.61, 120.62, 117.26, 118.44] },
      velocityScore: { '1D': -2.2, '1W': -7.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$46B', pe: 87.1, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.25, PSI: false, XSD: 2.98, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.3, proScore: 1.15, coverage: 0.5,
      price: 95.59, weeklyPrices: [91.37, 91.47, 87.91, 92.94, 95.59], weeklyChange: 4.62, sortRank: 0, periodReturns: { '1M': -2.2, '6M': 42.3, '1Y': 40.7 },
      priceHistory: { '1W': [91.37, 91.47, 87.91, 92.94, 95.59], '1M': [97.7, 96.71, 97.04, 93.85, 92.76, 94.02, 91.11, 93.43, 98.05, 96.85, 96.04, 94.65, 91.52, 96.96, 96.55, 88.34, 91.37, 91.47, 87.91, 92.94, 95.59], '6M': [67.18, 64.91, 64.65, 74.87, 74.07, 76.2, 80.28, 78.23, 80.75, 77.16, 74.97, 67.81, 62.73, 64.71, 65.16, 65.38, 71.22, 76.87, 90.64, 92.91, 101.58, 97.04, 91.11, 94.65, 88.34, 95.59], '1Y': [67.93, 68.97, 70.49, 71.48, 74.05, 73.85, 70.53, 66.36, 61.87, 65.71, 69.14, 65, 65.3, 63.17, 65.4, 64.07, 66.59, 64.39, 67.07, 64.55, 62.42, 56.28, 53.48, 50.9, 53.43, 67.35, 67.18, 66.24, 64.68, 73.94, 74.68, 75.47, 80.28, 78.23, 80.75, 77.16, 74.97, 67.81, 62.73, 63.29, 64.2, 65.6, 71.56, 78.76, 89.44, 92.91, 101.58, 97.04, 91.11, 94.65, 88.34, 95.59] },
      velocityScore: { '1D': -1.7, '1W': 1.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$52B', pe: 434.5, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 1.96,
      etfPresence: { SOXX: 2.44, PSI: false, XSD: 2.16, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.9, proScore: 0.95, coverage: 0.5,
      price: 384.1, weeklyPrices: [361.86, 358.72, 354.40, 374.76, 384.10], weeklyChange: 6.15, sortRank: 0, periodReturns: { '1M': 5.9, '6M': 116.6, '1Y': 190.3 },
      priceHistory: { '1W': [361.86, 358.72, 354.4, 374.76, 384.1], '1M': [362.76, 381.55, 383.56, 375.6, 356.25, 375.71, 380.45, 385.98, 409.68, 400.66, 391.09, 364.64, 353.79, 382.35, 390.34, 345.4, 361.86, 358.72, 354.4, 374.76, 384.1], '6M': [177.35, 174.42, 173.71, 171.77, 213.52, 226.25, 226.25, 215.03, 236.94, 242.56, 247.11, 228.98, 215.94, 218.89, 245.04, 229.36, 247.71, 261.42, 284.4, 281.61, 344.47, 383.56, 380.45, 364.64, 345.4, 384.1], '1Y': [132.29, 136.99, 142.05, 138.04, 136.63, 140.58, 139.58, 136.31, 120.94, 123.09, 126.15, 128.15, 130.25, 131.42, 129.49, 123.29, 131.71, 130.53, 140.33, 146.39, 148.13, 170.03, 162.5, 158.27, 172.85, 185.54, 175.29, 175.19, 174.87, 170.62, 215.01, 224.29, 226.25, 215.03, 236.94, 242.56, 247.11, 228.98, 215.94, 224.54, 228.5, 238.3, 258.11, 276.97, 287.64, 281.61, 344.47, 383.56, 380.45, 364.64, 345.4, 384.1] },
      velocityScore: { '1D': -2.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$29B', pe: 162.8, revenueGrowth: 23, eps: 2.36, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.24, PSI: false, XSD: 2.56, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RMBS', name: 'RAMBUS INC', easyScore: 2, avgWeight: 1.57, proScore: 0.78, coverage: 0.5,
      price: 150.3, weeklyPrices: [152.03, 146.84, 138.12, 144.47, 150.30], weeklyChange: -1.14, sortRank: 0, periodReturns: { '1M': 15.4, '6M': 59.5, '1Y': 147.8 },
      priceHistory: { '1W': [152.03, 146.84, 138.12, 144.47, 150.3], '1M': [130.28, 134.85, 130.46, 127.05, 123.76, 133.56, 141.82, 142.98, 157.23, 148.66, 148.02, 145.46, 147.48, 166.78, 170.66, 145.31, 152.03, 146.84, 138.12, 144.47, 150.3], '6M': [94.23, 96.4, 93.57, 97, 95.48, 125.93, 124.44, 100.85, 99.38, 104.13, 102.17, 91.91, 89.78, 93.32, 95.93, 89.95, 105.58, 120.03, 138.5, 115.11, 126.6, 130.46, 141.82, 145.46, 145.31, 150.3], '1Y': [60.66, 59.38, 64, 63.79, 63.28, 68.91, 64.24, 72.41, 72.86, 74.22, 73.77, 73.77, 73.28, 94.88, 106.94, 103.99, 101, 97.01, 97.77, 113.61, 102.84, 107.67, 95.25, 88.15, 94.19, 104.07, 95.45, 95.26, 94.69, 91.65, 100.62, 124.77, 124.44, 100.85, 99.38, 104.13, 102.17, 91.91, 89.78, 94.62, 91.44, 93.03, 110.44, 126.93, 158.4, 115.11, 126.6, 130.46, 141.82, 145.46, 145.31, 150.3] },
      velocityScore: { '1D': -3.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$16B', pe: 71.9, revenueGrowth: 8, eps: 2.09, grossMargin: 80, dividendYield: null,
      etfPresence: { SOXX: 0.76, PSI: false, XSD: 2.38, DRAM: false },
      tonyNote: 'RAMBUS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 7, avgWeight: 4.27, proScore: 2.3, coverage: 0.538,
      price: 206.81, weeklyPrices: [208.64, 208.19, 200.42, 204.87, 206.81], weeklyChange: -0.88, sortRank: 0, periodReturns: { '1M': -6.3, '6M': 18.2, '1Y': 42.6 },
      priceHistory: { '1W': [208.64, 208.19, 200.42, 204.87, 206.81], '1M': [220.78, 225.83, 235.74, 225.32, 222.32, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 205.1, 208.64, 208.19, 200.42, 204.87, 206.81], '6M': [175.02, 180.99, 188.22, 187.24, 185.81, 183.32, 191.52, 174.19, 190.05, 187.9, 184.89, 183.34, 183.14, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 199.57, 211.5, 235.74, 219.51, 211.14, 205.1, 206.81], '1Y': [145, 143.85, 157.75, 158.24, 164.07, 171.38, 176.75, 173.72, 182.7, 180.45, 177.99, 174.18, 168.31, 177.75, 183.61, 181.85, 185.54, 188.32, 182.64, 191.49, 202.49, 188.15, 190.17, 178.88, 179.92, 185.55, 176.29, 183.69, 187.54, 189.11, 183.14, 184.84, 191.52, 174.19, 190.05, 187.9, 184.89, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 199.57, 211.5, 235.74, 219.51, 211.14, 205.1, 206.81] },
      velocityScore: { '1D': 0, '1W': 0.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.0T', pe: 31.6, revenueGrowth: 85, eps: 6.54, grossMargin: 74, dividendYield: 0.49,
      etfPresence: { PTF: 4.32, WCLD: false, IGV: false, FDTX: 4.62, GTEK: false, ARKK: 1.77, MARS: false, FRWD: 8.4, BCTK: 6.6, FWD: 2.02, CBSE: false, FCUS: false, WGMI: 2.19 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 6, avgWeight: 4.78, proScore: 2.21, coverage: 0.462,
      price: 1000.06, weeklyPrices: [949.28, 935.89, 891.88, 995.87, 1000.06], weeklyChange: 5.35, sortRank: 0, periodReturns: { '1M': 30.5, '6M': 314.7, '1Y': 760.8 },
      priceHistory: { '1W': [949.28, 935.89, 891.88, 995.87, 1000.06], '1M': [766.58, 803.63, 776.01, 724.66, 681.54, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 864.01, 949.28, 935.89, 891.88, 995.87, 1000.06], '6M': [241.14, 265.92, 294.37, 343.43, 338.13, 389.11, 435.28, 379.4, 410.34, 417.35, 415.56, 397.05, 405.35, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 776.01, 762.1, 971, 864.01, 1000.06], '1Y': [116.18, 123.6, 124.76, 119.92, 118.61, 113.23, 111.25, 104.88, 118.89, 120.87, 117.68, 119.01, 131.46, 157.77, 164.62, 163.9, 190.96, 192.77, 206.77, 220.1, 223.77, 237.92, 246.83, 207.37, 240.46, 246.92, 237.5, 276.59, 292.63, 339.55, 333.35, 397.58, 435.28, 379.4, 410.34, 417.35, 415.56, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 517.16, 646.63, 776.01, 762.1, 971, 864.01, 1000.06] },
      velocityScore: { '1D': 1.8, '1W': -11.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 47.2, revenueGrowth: 196, eps: 21.21, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { PTF: 4.92, WCLD: false, IGV: false, FDTX: 9.36, GTEK: false, ARKK: false, MARS: false, FRWD: 4.53, BCTK: 4.45, FWD: 1.34, CBSE: false, FCUS: 4.09, WGMI: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 6, avgWeight: 4.14, proScore: 1.91, coverage: 0.462,
      price: 426.13, weeklyPrices: [426.80, 427.92, 408.75, 421.07, 426.13], weeklyChange: -0.16, sortRank: 0, periodReturns: { '1M': 7.3, '6M': 45.9, '1Y': 97.8 },
      priceHistory: { '1W': [426.8, 427.92, 408.75, 421.07, 426.13], '1M': [397.28, 399.8, 417.72, 404.35, 395.95, 401.62, 407.15, 404.52, 412.32, 422.73, 424.86, 418.45, 435.63, 446.69, 436.69, 415.17, 426.8, 427.92, 408.75, 421.07, 426.13], '6M': [292.04, 288.95, 300.92, 327.43, 331.21, 326.12, 342.3, 325.74, 374.09, 360.39, 376.81, 353.86, 336.71, 339.57, 347.75, 341.49, 365.49, 363.35, 382.66, 396.06, 414.15, 417.72, 407.15, 418.45, 415.17, 426.13], '1Y': [215.43, 209.51, 228.57, 229.17, 228.67, 238.85, 242.75, 235.21, 241.83, 238.88, 232.99, 230.87, 247.19, 261.38, 272.63, 273.23, 302.4, 302.89, 297.7, 298.25, 300.43, 286.5, 284.82, 275.06, 287.68, 301.87, 287.74, 293.28, 299.58, 318.68, 327.11, 327.37, 342.3, 325.74, 374.09, 360.39, 376.81, 353.86, 336.71, 338.79, 326.11, 339.04, 370.6, 370.5, 402.46, 396.06, 414.15, 417.72, 407.15, 418.45, 415.17, 426.13] },
      velocityScore: { '1D': 11.7, '1W': 13.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.2T', pe: 36.7, revenueGrowth: 35, eps: 11.62, grossMargin: 62, dividendYield: 0.9,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6, GTEK: false, ARKK: 1.02, MARS: false, FRWD: 5.97, BCTK: 8.66, FWD: false, CBSE: 2.54, FCUS: false, WGMI: 0.63 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 5, avgWeight: 4.16, proScore: 1.6, coverage: 0.385,
      price: 514.5, weeklyPrices: [490.33, 475.51, 452.40, 488.45, 514.50], weeklyChange: 4.93, sortRank: 0, periodReturns: { '1M': 14.8, '6M': 144.1, '1Y': 334.2 },
      priceHistory: { '1W': [490.33, 475.51, 452.4, 488.45, 514.5], '1M': [448.29, 445.5, 449.7, 424.1, 420.99, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 466.38, 490.33, 475.51, 452.4, 488.45, 514.5], '6M': [210.78, 213.43, 215.61, 214.35, 220.97, 249.8, 252.74, 200.19, 213.58, 203.37, 203.68, 199.45, 197.74, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 354.49, 408.46, 449.7, 449.59, 516.1, 466.38, 514.5], '1Y': [118.5, 128.24, 143.81, 134.8, 146.24, 157, 173.66, 171.7, 172.76, 177.51, 167.76, 162.63, 151.41, 161.16, 159.79, 161.36, 203.71, 216.42, 240.56, 259.67, 256.12, 233.54, 246.81, 203.78, 219.76, 221.11, 207.58, 214.95, 215.34, 210.02, 223.6, 253.73, 252.74, 200.19, 213.58, 203.37, 203.68, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 354.49, 408.46, 449.7, 449.59, 516.1, 466.38, 514.5] },
      velocityScore: { '1D': -0.6, '1W': 11.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$839B', pe: 172.6, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.95, MARS: false, FRWD: 7.07, BCTK: 3.62, FWD: 1.98, CBSE: false, FCUS: 3.17, WGMI: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 5, avgWeight: 3.26, proScore: 1.25, coverage: 0.385,
      price: 383.03, weeklyPrices: [396.60, 392.16, 372.10, 385.57, 383.03], weeklyChange: -3.42, sortRank: 0, periodReturns: { '1M': -8.7, '6M': 6.4, '1Y': 49.6 },
      priceHistory: { '1W': [396.6, 392.16, 372.1, 385.57, 383.03], '1M': [419.3, 416.79, 439.79, 425.19, 420.71, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 385.73, 396.6, 392.16, 372.1, 385.57, 383.03], '6M': [359.93, 340.36, 349.39, 343.77, 354.61, 328.8, 333.24, 308.05, 342.76, 333.99, 321.7, 332.77, 335.97, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 417.43, 412.56, 439.79, 414.57, 446.77, 385.73, 383.03], '1Y': [256.07, 249.99, 269.35, 274.18, 275.6, 288.21, 294.3, 288.64, 304.97, 306.34, 294, 297.39, 345.65, 364.09, 338.79, 327.9, 335.49, 356.7, 349.24, 362.05, 369.63, 349.43, 342.46, 340.2, 386.08, 401.1, 339.81, 341.45, 349.85, 343.5, 339.89, 325.49, 333.24, 308.05, 342.76, 333.99, 321.7, 332.77, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 417.43, 412.56, 439.79, 414.57, 446.77, 385.73, 383.03] },
      velocityScore: { '1D': 0.8, '1W': -11.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63.7, revenueGrowth: 48, eps: 6.01, grossMargin: 76, dividendYield: 0.67,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.79, GTEK: false, ARKK: 1.19, MARS: false, FRWD: 4.57, BCTK: 7.32, FWD: 2.43, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, avgWeight: 5.29, proScore: 1.63, coverage: 0.308,
      price: 923.5, weeklyPrices: [876.77, 846.01, 815.99, 868.09, 923.50], weeklyChange: 5.33, sortRank: 0, periodReturns: { '1M': 14.2, '6M': 221.1, '1Y': 632.5 },
      priceHistory: { '1W': [876.77, 846.01, 815.99, 868.09, 923.5], '1M': [808.8, 817.35, 804.76, 795.47, 740.84, 751.07, 810.46, 812.73, 845.76, 870.66, 880.72, 879.8, 921.26, 926.61, 940.69, 847.47, 876.77, 846.01, 815.99, 868.09, 923.5], '6M': [287.64, 296.36, 281.3, 330.42, 318.44, 344.22, 442.93, 418.63, 407.25, 408.97, 409.67, 367.34, 373.98, 406.77, 413.22, 423.12, 500.77, 531.81, 587.62, 673.64, 766.44, 804.76, 810.46, 879.8, 847.47, 923.5], '1Y': [126.07, 130.96, 141.44, 148.39, 149.08, 149.63, 150.46, 154.81, 150.45, 154.43, 159.21, 167.4, 189.24, 211.12, 229.33, 229.14, 242.83, 219.51, 214.4, 230.32, 255.88, 279.35, 258.21, 237.49, 270.1, 285.41, 285.58, 282.85, 280.08, 308.26, 312.28, 346.53, 442.93, 418.63, 407.25, 408.97, 409.67, 367.34, 373.98, 434.6, 378.79, 429.36, 503.13, 547.75, 586.25, 673.64, 766.44, 804.76, 810.46, 879.8, 847.47, 923.5] },
      velocityScore: { '1D': -3.6, '1W': -18.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$209B', pe: 88, revenueGrowth: 44, eps: 10.5, grossMargin: 42, dividendYield: 0.34,
      etfPresence: { PTF: 4.63, WCLD: false, IGV: false, FDTX: 4.04, GTEK: false, ARKK: false, MARS: false, FRWD: 8.35, BCTK: false, FWD: false, CBSE: false, FCUS: 4.16, WGMI: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 4, avgWeight: 4.41, proScore: 1.36, coverage: 0.308,
      price: 371.08, weeklyPrices: [324.45, 327.16, 321.80, 362.52, 371.08], weeklyChange: 14.37, sortRank: 0, periodReturns: { '1M': 28.3, '6M': 131.2, '1Y': 304.8 },
      priceHistory: { '1W': [324.45, 327.16, 321.8, 362.52, 371.08], '1M': [289.24, 295.44, 299.15, 284.72, 277.96, 292.09, 302.24, 305.35, 322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 303.28, 324.45, 327.16, 321.8, 362.52, 371.08], '6M': [160.52, 172.27, 175.87, 206.96, 214.38, 228.39, 239.58, 209.78, 235.12, 237.39, 239.07, 214.68, 209.49, 224.71, 233.45, 222.01, 258.76, 260.96, 258.56, 257.86, 286.52, 299.15, 302.24, 318.18, 303.28, 371.08], '1Y': [91.66, 90.49, 97.2, 98.14, 99.62, 101.74, 98.62, 96.37, 101.75, 99.51, 100.08, 100.15, 105.07, 119.21, 132.2, 131.09, 149.15, 137.81, 144.05, 156.9, 157.46, 159.35, 148.26, 142.65, 154.79, 162.74, 164.3, 175.26, 173.78, 203.08, 208.79, 220.7, 239.58, 209.78, 235.12, 237.39, 239.07, 214.68, 209.49, 233.99, 211.62, 218.44, 263.66, 267.6, 267.78, 257.86, 286.52, 299.15, 302.24, 318.18, 303.28, 371.08] },
      velocityScore: { '1D': 4.6, '1W': 6.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$464B', pe: 70.1, revenueGrowth: 24, eps: 5.29, grossMargin: 50, dividendYield: 0.29,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.99, BCTK: 7.1, FWD: 1.81, CBSE: 2.74, FCUS: false, WGMI: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 4, avgWeight: 4.38, proScore: 1.35, coverage: 0.308,
      price: 561.14, weeklyPrices: [526.93, 517.72, 490.09, 529.29, 561.14], weeklyChange: 6.49, sortRank: 0, periodReturns: { '1M': 14.8, '6M': 218.2, '1Y': 906 },
      priceHistory: { '1W': [526.93, 517.72, 490.09, 529.29, 561.14], '1M': [488.74, 494.09, 489.15, 482.02, 458.68, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 511.72, 526.93, 517.72, 490.09, 529.29, 561.14], '6M': [176.34, 181.08, 179.68, 219.38, 214, 241.9, 279.7, 269.41, 273.74, 284.67, 282.25, 259.03, 261.18, 304.9, 296.14, 297.73, 337.88, 361.69, 403.12, 434.52, 463.91, 489.15, 486.46, 531.21, 511.72, 561.14], '1Y': [55.78, 59.29, 63.29, 65.22, 66.93, 68.74, 68.99, 76.55, 74.97, 75.06, 76.97, 80.34, 93.29, 102.39, 112.41, 116.74, 125.28, 118.86, 121.53, 126.67, 150.21, 162.96, 157.83, 139.19, 163.54, 169.78, 172.04, 176.76, 176.06, 199.88, 215, 243.29, 279.7, 269.41, 273.74, 284.67, 282.25, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 434.52, 463.91, 489.15, 486.46, 531.21, 511.72, 561.14] },
      velocityScore: { '1D': -1.5, '1W': -4.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$193B', pe: 33.5, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { PTF: 4.63, WCLD: false, IGV: false, FDTX: 4, GTEK: false, ARKK: false, MARS: false, FRWD: 4.82, BCTK: false, FWD: false, CBSE: false, FCUS: 4.08, WGMI: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 4, avgWeight: 3.65, proScore: 1.12, coverage: 0.308,
      price: 237.54, weeklyPrices: [245.22, 244.19, 238.00, 241.51, 237.54], weeklyChange: -3.13, sortRank: 0, periodReturns: { '1M': -10.6, '6M': 5, '1Y': 11.4 },
      priceHistory: { '1W': [245.22, 244.19, 238, 241.51, 237.54], '1M': [265.82, 270.13, 267.22, 264.14, 264.86, 265.01, 268.46, 266.32, 265.29, 271.85, 274, 270.64, 261.26, 256.52, 250.02, 246.03, 245.22, 244.19, 238, 241.51, 237.54], '6M': [226.19, 227.35, 232.07, 240.93, 242.6, 231.31, 243.01, 232.99, 204.08, 204.86, 207.92, 218.94, 209.53, 209.87, 211.71, 210.57, 233.65, 249.7, 255.08, 265.06, 271.17, 267.22, 268.46, 270.64, 246.03, 237.54], '1Y': [213.24, 209.69, 223.3, 223.47, 225.69, 229.3, 232.79, 214.75, 222.69, 231.03, 228.84, 229, 235.84, 231.43, 227.63, 222.17, 220.9, 220.07, 216.48, 226.97, 244.22, 244.41, 234.69, 220.69, 233.88, 226.89, 222.54, 228.43, 232.53, 241.56, 236.65, 234.34, 243.01, 232.99, 204.08, 204.86, 207.92, 218.94, 209.53, 208.76, 207.54, 209.77, 238.38, 250.56, 263.99, 265.06, 271.17, 267.22, 268.46, 270.64, 246.03, 237.54] },
      velocityScore: { '1D': -0.9, '1W': -7.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 31.1, revenueGrowth: 17, eps: 7.63, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.01, GTEK: false, ARKK: 2.6, MARS: false, FRWD: 3.37, BCTK: 4.6, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 3.05, proScore: 0.94, coverage: 0.308,
      price: 110.19, weeklyPrices: [110.78, 110.42, 108.20, 110.47, 110.19], weeklyChange: -0.53, sortRank: 0, periodReturns: { '1M': 10.4, '6M': -32.9, '1Y': 0.9 },
      priceHistory: { '1W': [110.78, 110.42, 108.2, 110.47, 110.19], '1M': [99.84, 95.4, 97.42, 100.28, 102.39, 105.01, 104.86, 103, 104.9, 106.6, 115.03, 118.71, 124.12, 117.01, 112.94, 109.54, 110.78, 110.42, 108.2, 110.47, 110.19], '6M': [164.19, 169.57, 167.88, 168.45, 167.44, 138.54, 138.92, 114.02, 118.71, 123.8, 125.94, 134.79, 126.17, 123.75, 118.42, 118.52, 112.38, 126.94, 124.23, 121.13, 111.74, 97.42, 104.86, 118.71, 109.54, 110.19], '1Y': [109.21, 106.4, 113.65, 116.66, 116.74, 128.43, 126.84, 118.6, 149.61, 141.47, 142.11, 141.28, 146.22, 147.89, 157.12, 149, 164.5, 153.66, 164.71, 175.06, 173.86, 152.41, 146.04, 147.8, 149.28, 158.41, 159.85, 169.67, 163.74, 166.74, 157.51, 137.64, 138.92, 114.02, 118.71, 123.8, 125.94, 134.79, 126.17, 122.37, 115.43, 118.25, 110.79, 131.15, 125.83, 121.13, 111.74, 97.42, 104.86, 118.71, 109.54, 110.19] },
      velocityScore: { '1D': 1.1, '1W': 2.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$143B', pe: 108, revenueGrowth: 34, eps: 1.02, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.89, GTEK: false, ARKK: 4.53, MARS: false, FRWD: 2.01, BCTK: 2.76, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 13 Broad Tech ETFs (31% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NET', name: 'Cloudflare', easyScore: 4, avgWeight: 1.8, proScore: 0.55, coverage: 0.308,
      price: 228.01, weeklyPrices: [247.79, 236.13, 219.67, 227.44, 228.01], weeklyChange: -7.98, sortRank: 0, periodReturns: { '1M': 22.1, '6M': 12.6, '1Y': 33.5 },
      priceHistory: { '1W': [247.79, 236.13, 219.67, 227.44, 228.01], '1M': [186.79, 192.62, 199.81, 197.56, 201.75, 210.13, 212.65, 216.17, 217.54, 209.22, 228.11, 241.82, 270.82, 272.66, 265.33, 250.11, 247.79, 236.13, 219.67, 227.44, 228.01], '6M': [202.44, 195.68, 200.7, 198, 188.71, 169.97, 184.88, 166.88, 189.41, 192.64, 174.66, 192.31, 212.11, 225.48, 218, 205.43, 193.05, 197.38, 205, 204.97, 256.79, 199.81, 212.65, 241.82, 250.11, 228.01], '1Y': [170.81, 179.3, 194.05, 192.85, 182.9, 197.76, 199.41, 200.11, 204.6, 200.91, 196.17, 208.71, 217.92, 226.01, 228.28, 218.58, 221.03, 222.56, 213.04, 225.11, 253.3, 232.81, 210.6, 186.38, 197.2, 205.86, 196.7, 202.06, 199.62, 202.81, 188.39, 173.3, 184.88, 166.88, 189.41, 192.64, 174.66, 192.31, 212.11, 221.36, 210.13, 211.69, 166.99, 200.99, 207.07, 204.97, 256.79, 199.81, 212.65, 241.82, 250.11, 228.01] },
      velocityScore: { '1D': -3.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$81B', pe: null, revenueGrowth: 34, eps: -0.25, grossMargin: 73, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 1.82, IGV: false, FDTX: 2.05, GTEK: 2.03, ARKK: false, MARS: false, FRWD: false, BCTK: 1.28, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Cloudflare appears in 4 of 13 Broad Tech ETFs (31% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 3, avgWeight: 5.12, proScore: 1.18, coverage: 0.231,
      price: 388.84, weeklyPrices: [411.74, 403.41, 397.36, 390.34, 388.84], weeklyChange: -5.56, sortRank: 0, periodReturns: { '1M': -4.6, '6M': -18.7, '1Y': -18.8 },
      priceHistory: { '1W': [411.74, 403.41, 397.36, 390.34, 388.84], '1M': [407.77, 405.21, 409.43, 421.92, 423.54, 421.06, 419.09, 418.57, 416.03, 412.67, 426.99, 450.24, 460.52, 441.31, 427.34, 416.67, 411.74, 403.41, 397.36, 390.34, 388.84], '6M': [478.53, 485.92, 487.1, 478.51, 470.67, 444.11, 481.63, 414.19, 404.37, 398.46, 401.72, 410.68, 401.86, 391.79, 371.04, 369.37, 373.07, 420.26, 415.75, 407.78, 420.77, 409.43, 419.09, 450.24, 416.67, 388.84], '1Y': [478.87, 477.4, 495.94, 497.72, 503.02, 510.06, 512.5, 524.11, 522.04, 520.17, 507.23, 506.69, 498.2, 515.36, 514.45, 514.6, 528.57, 514.05, 516.79, 531.52, 517.81, 496.82, 510.18, 472.12, 486.74, 491.02, 474.82, 484.92, 487.48, 483.47, 459.38, 451.14, 481.63, 414.19, 404.37, 398.46, 401.72, 410.68, 401.86, 389.02, 365.97, 373.46, 370.87, 422.79, 424.62, 407.78, 420.77, 409.43, 419.09, 450.24, 416.67, 388.84] },
      velocityScore: { '1D': -1.7, '1W': -1.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 23.2, revenueGrowth: 18, eps: 16.78, grossMargin: 68, dividendYield: 0.93,
      etfPresence: { PTF: false, WCLD: false, IGV: 7.75, FDTX: 3.79, GTEK: false, ARKK: false, MARS: false, FRWD: 3.82, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 3, avgWeight: 4.82, proScore: 1.11, coverage: 0.231,
      price: 279.42, weeklyPrices: [266.33, 260.52, 263.22, 279.53, 279.42], weeklyChange: 4.91, sortRank: 0, periodReturns: { '1M': 29.6, '6M': 45.8, '1Y': 41.4 },
      priceHistory: { '1W': [266.33, 260.52, 263.22, 279.53, 279.42], '1M': [215.6, 227.79, 238.21, 242.83, 247.55, 246.66, 252.92, 260.58, 256.75, 248.47, 257.77, 281.69, 300.48, 297.18, 280.43, 272.05, 266.33, 260.52, 263.22, 279.53, 279.42], '6M': [191.69, 186.88, 186.85, 185.86, 190.85, 181.47, 183.74, 166.72, 165.3, 150.99, 149.4, 163.16, 168.12, 168.91, 153.22, 160.67, 166.99, 166.97, 173.21, 179.32, 196.53, 238.21, 252.92, 281.69, 272.05, 279.42], '1Y': [197.67, 199.24, 200.57, 201.42, 190.72, 199.88, 204.5, 172.88, 167.06, 177.09, 185.88, 190.52, 197.38, 201.28, 208.18, 203.96, 212.58, 213.28, 211.82, 220.29, 220.24, 212.29, 205.25, 182.9, 187.73, 195.35, 185.88, 189.49, 186.85, 193.9, 190.93, 182.27, 183.74, 166.72, 165.3, 150.99, 149.4, 163.16, 168.12, 169.74, 156.36, 163.21, 155.73, 167.85, 178.54, 179.32, 196.53, 238.21, 252.92, 281.69, 272.05, 279.42] },
      velocityScore: { '1D': 3.7, '1W': 4.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$228B', pe: 243, revenueGrowth: 31, eps: 1.15, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.39, IGV: 8.41, FDTX: 3.67, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 3, avgWeight: 4.29, proScore: 0.99, coverage: 0.231,
      price: 129.78, weeklyPrices: [136.47, 132.07, 130.21, 131.08, 129.78], weeklyChange: -4.9, sortRank: 0, periodReturns: { '1M': -4.6, '6M': -29.3, '1Y': -4 },
      priceHistory: { '1W': [136.47, 132.07, 130.21, 131.08, 129.78], '1M': [136, 130.05, 133.73, 133.99, 135.14, 137.15, 137.41, 136.88, 136.6, 132.51, 143.34, 156.54, 160.65, 152.17, 142.2, 135.53, 136.47, 132.07, 130.21, 131.08, 129.78], '6M': [183.57, 193.38, 184.18, 179.71, 178.96, 165.33, 157.35, 139.54, 135.68, 134.89, 135.94, 152.67, 153.5, 152.77, 154.96, 146.49, 130.49, 142.76, 141.57, 139.11, 137.05, 133.73, 137.41, 156.54, 135.53, 129.78], '1Y': [135.19, 137.3, 130.74, 139.12, 149.15, 151.79, 157.88, 154.27, 186.96, 177.17, 158.74, 156.71, 156.1, 171.21, 179.33, 178.86, 179.53, 177.21, 181.59, 189.18, 200.47, 177.93, 174.01, 154.85, 167.49, 181.49, 183.25, 193.98, 180.84, 181.68, 178.4, 165.9, 157.35, 139.54, 135.68, 134.89, 135.94, 152.67, 153.5, 155.68, 147.56, 148.46, 128.06, 146.39, 143.09, 139.11, 137.05, 133.73, 137.41, 156.54, 135.53, 129.78] },
      velocityScore: { '1D': 1, '1W': 1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$311B', pe: 145.8, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 6.95, FDTX: 2.87, GTEK: false, ARKK: 3.04, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 3, avgWeight: 3.84, proScore: 0.89, coverage: 0.231,
      price: 363.47, weeklyPrices: [361.17, 362.29, 353.32, 356.56, 363.47], weeklyChange: 0.64, sortRank: 0, periodReturns: { '1M': -5.3, '6M': 17.1, '1Y': 105.4 },
      priceHistory: { '1W': [361.17, 362.29, 353.32, 356.56, 363.47], '1M': [383.82, 399.04, 397.17, 393.32, 393.11, 384.9, 383.47, 379.38, 384.84, 384.83, 386.12, 376.43, 372.58, 358.39, 355.68, 365.76, 361.17, 362.29, 353.32, 356.56, 363.47], '6M': [310.52, 308.61, 314.39, 314.55, 336.43, 328.38, 336.28, 333.34, 311.33, 303.56, 307.15, 300.91, 303.21, 306.3, 289.59, 294.9, 316.37, 332.77, 337.75, 381.94, 395.3, 397.17, 383.47, 376.43, 365.76, 363.47], '1Y': [176.97, 167.73, 178.27, 177.56, 182.81, 191.15, 193.42, 189.95, 202.09, 204.91, 206.72, 213.53, 234.16, 251.76, 252.88, 244.36, 251.51, 244.64, 257.02, 269.93, 281.82, 279.7, 276.98, 299.65, 315.12, 314.45, 309.32, 311.33, 314.55, 322.43, 336.31, 330.84, 336.28, 333.34, 311.33, 303.56, 307.15, 300.91, 303.21, 305.73, 280.74, 294.46, 315.72, 339.4, 342.32, 381.94, 395.3, 397.17, 383.47, 376.43, 365.76, 363.47] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.7, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.66, GTEK: false, ARKK: 1.95, MARS: false, FRWD: false, BCTK: 5.9, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Alphabet Inc Class C appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRWD', name: 'CrowdStrike', easyScore: 3, avgWeight: 3.36, proScore: 0.78, coverage: 0.231,
      price: 692.04, weeklyPrices: [658.79, 644.93, 647.74, 691.53, 692.04], weeklyChange: 5.05, sortRank: 0, periodReturns: { '1M': 26.7, '6M': 37.1, '1Y': 43.7 },
      priceHistory: { '1W': [658.79, 644.93, 647.74, 691.53, 692.04], '1M': [546.18, 562.57, 579.95, 594.08, 618.83, 650.11, 648.23, 663.46, 671.55, 645.36, 671, 731, 782.17, 768.95, 747.61, 671.02, 658.79, 644.93, 647.74, 691.53, 692.04], '6M': [504.78, 481.28, 475.91, 458.32, 468.02, 445.88, 469.19, 415.36, 415.81, 422.14, 381.1, 426.16, 441.54, 435.81, 385.86, 393.31, 394.68, 418.2, 445.39, 445.75, 505.72, 579.95, 648.23, 731, 671.02, 692.04], '1Y': [481.73, 476.3, 499.33, 505.46, 476.18, 481.58, 472.18, 446.66, 424.49, 427.9, 420.55, 423.7, 428.06, 444.77, 493.14, 488.45, 495.95, 508.61, 503.61, 529.7, 543.01, 539.81, 537.55, 490.67, 504.13, 515.19, 487.47, 483.14, 475.63, 478.91, 460.7, 453.77, 469.19, 415.36, 415.81, 422.14, 381.1, 426.16, 441.54, 428.18, 392.62, 399.12, 379.02, 423.95, 448.13, 445.75, 505.72, 579.95, 648.23, 731, 671.02, 692.04] },
      velocityScore: { '1D': 5.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$176B', pe: null, revenueGrowth: 26, eps: -0.14, grossMargin: 75, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.27, IGV: 6.57, FDTX: 1.24, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'CrowdStrike appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 3.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'COHR', name: 'Coherent Corp', easyScore: 3, avgWeight: 3.3, proScore: 0.76, coverage: 0.231,
      price: 390.86, weeklyPrices: [401.93, 355.94, 354.77, 363.58, 390.86], weeklyChange: -2.75, sortRank: 0, periodReturns: { '1M': 4.5, '6M': 119.2, '1Y': 382.8 },
      priceHistory: { '1W': [401.93, 355.94, 354.77, 363.58, 390.86], '1M': [374.01, 403.71, 404.94, 382.45, 362.83, 358.5, 378, 377.57, 381.35, 380.18, 376.95, 361.47, 362.9, 426.89, 417.43, 376.99, 401.93, 355.94, 354.77, 363.58, 390.86], '6M': [178.34, 185.83, 189.02, 194.11, 190.03, 201.46, 221.14, 211, 223.69, 232.48, 250.14, 253.87, 241.27, 257.21, 272.04, 247.8, 284.17, 328, 337.68, 319.71, 319.19, 404.94, 378, 361.47, 376.99, 390.86], '1Y': [80.95, 81.2, 87.23, 88.05, 94.52, 99.88, 104.3, 102.79, 115.44, 93.4, 89.9, 90.47, 98.67, 106.34, 114.6, 107.97, 114.77, 115.13, 120.2, 134.99, 131.96, 154.51, 139.33, 139.51, 163.5, 185.86, 178.45, 190.98, 186.81, 191.62, 184.11, 202.72, 221.14, 211, 223.69, 232.48, 250.14, 253.87, 241.27, 275.57, 243.29, 258.16, 307.5, 345.02, 336.09, 319.71, 319.19, 404.94, 378, 361.47, 376.99, 390.86] },
      velocityScore: { '1D': null, '1W': -25.5, '1M': null, '6M': null }, isNew: true,
      marketCap: '$76B', pe: 185.2, revenueGrowth: 21, eps: 2.11, grossMargin: 37, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.75, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 3.77, FWD: false, CBSE: 2.39, FCUS: false, WGMI: false },
      tonyNote: 'Coherent Corp appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 3.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASML', name: 'ASML Holding', easyScore: 3, avgWeight: 3.06, proScore: 0.71, coverage: 0.231,
      price: 1884.71, weeklyPrices: [1749.04, 1777.77, 1734.19, 1899.48, 1884.71], weeklyChange: 7.76, sortRank: 0, periodReturns: { '1M': 23.9, '6M': 74.4, '1Y': 139.7 },
      priceHistory: { '1W': [1749.04, 1777.77, 1734.19, 1899.48, 1884.71], '1M': [1520.94, 1581.58, 1584.51, 1501.81, 1472.39, 1550.13, 1592, 1632.9, 1632.03, 1597.87, 1605.77, 1612.76, 1628.57, 1705.37, 1726.36, 1641.74, 1749.04, 1777.77, 1734.19, 1899.48, 1884.71], '6M': [1080.85, 1056.02, 1066, 1242.19, 1270.16, 1360.09, 1422.92, 1339.13, 1435.63, 1458.93, 1463.8, 1368.36, 1351.58, 1355.17, 1393.89, 1359.76, 1448.64, 1410.83, 1417.8, 1438.99, 1516.6, 1584.51, 1592, 1612.76, 1641.74, 1884.71], '1Y': [786.21, 756.53, 795.95, 785.09, 806.73, 719.68, 729.99, 689.82, 722.32, 742.16, 754.89, 742.62, 796.25, 867.3, 957.8, 962.61, 1043.3, 984.66, 1042.15, 1059.98, 1059.23, 1016.96, 1006.98, 966.57, 1087.99, 1119.69, 1087.82, 1056.98, 1072.14, 1228.47, 1263.72, 1395, 1422.92, 1339.13, 1435.63, 1458.93, 1463.8, 1368.36, 1351.58, 1366.39, 1329.5, 1317.23, 1478.28, 1459.8, 1457.7, 1438.99, 1516.6, 1584.51, 1592, 1612.76, 1641.74, 1884.71] },
      velocityScore: { '1D': 2.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$726B', pe: 63.2, revenueGrowth: 13, eps: 29.82, grossMargin: 53, dividendYield: 0.46,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.3, BCTK: 2.29, FWD: 1.58, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'ASML Holding appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 3.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CDNS', name: 'CADENCE DESIGN SYSTEMS INC', easyScore: 3, avgWeight: 2.89, proScore: 0.67, coverage: 0.231,
      price: 388.72, weeklyPrices: [394.24, 390.90, 385.13, 383.74, 388.72], weeklyChange: -1.4, sortRank: 0, periodReturns: { '1M': 8.6, '6M': 20.3, '1Y': 26.3 },
      priceHistory: { '1W': [394.24, 390.9, 385.13, 383.74, 388.72], '1M': [358.04, 354.55, 352.84, 347.24, 345.99, 350.89, 358.46, 373.59, 381.75, 374.05, 373.85, 374.93, 414.16, 416.39, 408, 376.19, 394.24, 390.9, 385.13, 383.74, 388.72], '6M': [323.22, 314.91, 317.71, 314.64, 323.06, 313.84, 320.49, 271.42, 299.65, 296.59, 297.6, 299.84, 290.32, 289.64, 281.39, 280.19, 281.01, 306.96, 314.33, 329.59, 356.9, 352.84, 358.46, 374.93, 376.19, 388.72], '1Y': [307.85, 295.4, 305.2, 320.3, 317.49, 316.32, 333.76, 356.97, 352.06, 349.88, 349.63, 350.43, 360.64, 351.52, 373.37, 348.52, 353.36, 332.23, 329.64, 351.4, 338.69, 325.05, 314.93, 300.58, 309.62, 337.29, 318.43, 317.57, 315.6, 320.54, 313.17, 317.09, 320.49, 271.42, 299.65, 296.59, 297.6, 299.84, 290.32, 287.4, 280.62, 278.72, 265.66, 311.03, 332.89, 329.59, 356.9, 352.84, 358.46, 374.93, 376.19, 388.72] },
      velocityScore: { '1D': 1.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$107B', pe: 90.4, revenueGrowth: 19, eps: 4.3, grossMargin: 86, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 3.93, FDTX: false, GTEK: 2.6, ARKK: false, MARS: false, FRWD: 2.14, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'CADENCE DESIGN SYSTEMS INC appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DDOG', name: 'DDOG', easyScore: 3, avgWeight: 2.68, proScore: 0.62, coverage: 0.231,
      price: 234.12, weeklyPrices: [231.68, 227.34, 227.63, 234.24, 234.12], weeklyChange: 1.05, sortRank: 0, periodReturns: { '1M': 17.1, '6M': 60.4, '1Y': 90.8 },
      priceHistory: { '1W': [231.68, 227.34, 227.63, 234.24, 234.12], '1M': [199.94, 205.31, 202.84, 207.98, 208.82, 212.24, 218.04, 222.32, 223.65, 221.81, 225.24, 247.35, 277.49, 269.13, 250.33, 234.11, 231.68, 227.34, 227.63, 234.24, 234.12], '6M': [146, 140.39, 137.94, 137.1, 125.5, 123.46, 140.56, 115.71, 127.33, 120.6, 116.46, 122.36, 127.16, 131.26, 123.29, 118.67, 108.98, 123.47, 127.86, 132.19, 188.73, 202.84, 218.04, 247.35, 234.11, 234.12], '1Y': [122.68, 127.5, 132.08, 152.41, 138.8, 145.27, 150.77, 135.6, 130.91, 127.25, 131.22, 136.68, 136.44, 138.65, 138.35, 145.26, 157.36, 164.2, 156.29, 157.62, 162.81, 191.24, 185.01, 157.55, 157.9, 154.28, 142.05, 141.84, 137.48, 141.45, 122.41, 131.25, 140.56, 115.71, 127.33, 120.6, 116.46, 122.36, 127.16, 129.94, 124.3, 120.36, 105.37, 126.61, 129.48, 132.19, 188.73, 202.84, 218.04, 247.35, 234.11, 234.12] },
      velocityScore: { '1D': 1.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$83B', pe: 585.3, revenueGrowth: 32, eps: 0.4, grossMargin: 80, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.69, IGV: 2.9, FDTX: 2.44, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'DDOG appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 2.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 3, avgWeight: 5.52, proScore: 3.31, coverage: 0.6,
      price: 301.84, weeklyPrices: [293.60, 283.51, 262.34, 290.50, 301.84], weeklyChange: 2.81, sortRank: 0, periodReturns: { '1M': -2, '6M': 168.6, '1Y': 368.4 },
      priceHistory: { '1W': [293.6, 283.51, 262.34, 290.5, 301.84], '1M': [308.05, 300.84, 296.98, 292.65, 266.8, 271.05, 270.75, 279.22, 291.97, 295.94, 288.9, 284.42, 288.12, 299.07, 299.73, 284.87, 293.6, 283.51, 262.34, 290.5, 301.84], '6M': [112.36, 110.97, 111.96, 120, 133.04, 140.62, 147.81, 175.77, 197.45, 178.79, 176.96, 167.67, 171.19, 167.41, 194.85, 184.68, 230.81, 232.81, 252.18, 277.27, 305.93, 296.98, 270.75, 284.42, 284.87, 301.84], '1Y': [64.44, 58.47, 70.97, 71.96, 70.19, 73.64, 80.8, 75.89, 81.28, 84.88, 87.65, 88.72, 90.8, 100.68, 100.97, 101.01, 103.9, 105.33, 116.4, 124.71, 127.8, 121.79, 109.89, 94.02, 106.53, 114.29, 109.31, 112.18, 109.16, 118.62, 133.76, 142.29, 147.81, 175.77, 197.45, 178.79, 176.96, 167.67, 171.19, 175.13, 174.8, 182.6, 230.94, 241.01, 252.76, 277.27, 305.93, 296.98, 270.75, 284.42, 284.87, 301.84] },
      velocityScore: { '1D': -14.2, '1W': -9.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 59.1, revenueGrowth: 7, eps: 5.11, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { POW: 6.73, VOLT: 7.95, PBD: false, PBW: 1.87, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 3, avgWeight: 4.82, proScore: 2.89, coverage: 0.6,
      price: 705.47, weeklyPrices: [693.81, 691.95, 650.92, 683.29, 705.47], weeklyChange: 1.68, sortRank: 0, periodReturns: { '1M': -7.9, '6M': 61, '1Y': 96.7 },
      priceHistory: { '1W': [693.81, 691.95, 650.92, 683.29, 705.47], '1M': [765.81, 773.72, 780.08, 769.99, 723.03, 709.93, 716.91, 723.44, 742.18, 733.62, 730.1, 711.73, 687.48, 706.06, 715.67, 695.11, 693.81, 691.95, 650.92, 683.29, 705.47], '6M': [438.11, 426.66, 431.03, 438.22, 444.2, 473.24, 481.28, 464.57, 523.96, 554, 565.05, 549.22, 566.91, 572, 573.5, 560.12, 582.06, 587.42, 633.44, 727.77, 750.73, 780.08, 716.91, 711.73, 695.11, 705.47], '1Y': [358.65, 360.78, 381.26, 385.8, 387, 398.66, 411.99, 395.17, 386.15, 380.81, 379.84, 377.96, 375.53, 385.68, 396.02, 409.11, 427.8, 430.98, 440.74, 441.82, 449.13, 445.01, 429.3, 430.15, 452.23, 463.09, 435.87, 433.03, 428.81, 436.89, 437.07, 468.78, 481.28, 464.57, 523.96, 554, 565.05, 549.22, 566.91, 577.95, 545.64, 560.63, 585.36, 601.88, 624.84, 727.77, 750.73, 780.08, 716.91, 711.73, 695.11, 705.47] },
      velocityScore: { '1D': 16.1, '1W': 12, '1M': null, '6M': null }, isNew: false,
      marketCap: '$106B', pe: 96.5, revenueGrowth: 26, eps: 7.31, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.75, VOLT: 5.38, PBD: false, PBW: false, IVEP: 4.32 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 3, avgWeight: 4.45, proScore: 2.67, coverage: 0.6,
      price: 392.74, weeklyPrices: [403.14, 401.72, 375.46, 393.64, 392.74], weeklyChange: -2.58, sortRank: 0, periodReturns: { '1M': -2.2, '6M': 18.3, '1Y': 18.9 },
      priceHistory: { '1W': [403.14, 401.72, 375.46, 393.64, 392.74], '1M': [401.53, 406.94, 408.1, 399.44, 381.87, 379.69, 381.51, 391.35, 403.13, 406.37, 401.94, 400.6, 400.08, 417.62, 421.21, 395.94, 403.14, 401.72, 375.46, 393.64, 392.74], '6M': [331.98, 317.8, 321.45, 332.97, 332.38, 337.96, 347.32, 365, 396.09, 377.32, 374.59, 354.79, 348.64, 360.54, 375, 365.56, 400.44, 392.73, 424.5, 433.01, 399.15, 408.1, 381.51, 400.6, 395.94, 392.74], '1Y': [330.34, 331.23, 353.23, 358.49, 360.29, 373.66, 392.76, 381.29, 362.84, 351.03, 347.61, 349.14, 349.49, 375.54, 378.31, 367.15, 380.02, 375.37, 377.69, 379.74, 381.56, 373.77, 352.39, 331.71, 339.71, 343.39, 333.21, 320.39, 320.86, 322.67, 331.14, 334.04, 347.32, 365, 396.09, 377.32, 374.59, 354.79, 348.64, 360.23, 357.1, 361.1, 403, 406.21, 423.92, 433.01, 399.15, 408.1, 381.51, 400.6, 395.94, 392.74] },
      velocityScore: { '1D': 15.6, '1W': 10.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$153B', pe: 38.4, revenueGrowth: 17, eps: 10.23, grossMargin: 37, dividendYield: 1.12,
      etfPresence: { POW: 4.07, VOLT: 5.31, PBD: false, PBW: false, IVEP: 3.96 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 3, avgWeight: 3.58, proScore: 2.15, coverage: 0.6,
      price: 928.42, weeklyPrices: [933.85, 920.15, 867.09, 906.79, 928.42], weeklyChange: -0.58, sortRank: 0, periodReturns: { '1M': -13.4, '6M': 38.2, '1Y': 90.4 },
      priceHistory: { '1W': [933.85, 920.15, 867.09, 906.79, 928.42], '1M': [1071.98, 1062.57, 1090.53, 1049.23, 1012.25, 1024.52, 1043.82, 1038.74, 1070.47, 1031.89, 996, 968.32, 950.54, 969.67, 959.36, 933.61, 933.85, 920.15, 867.09, 906.79, 928.42], '6M': [671.71, 658.28, 663.46, 686.33, 652.09, 667.89, 711.59, 746.22, 823.67, 834.61, 876.46, 815.01, 832.11, 858.47, 923.69, 894.78, 968.02, 978.32, 1149.53, 1083.46, 1045.63, 1090.53, 1043.82, 968.32, 933.61, 928.42], '1Y': [487.67, 486.96, 519.66, 530.28, 555.04, 565.91, 647.66, 656.5, 649.09, 621.91, 607.07, 612.97, 600.23, 628.68, 644.37, 602.43, 603.22, 648.25, 594.07, 584.39, 585.14, 575.13, 578.31, 555.84, 576.9, 621.9, 681.35, 661.81, 659.64, 662.32, 644.18, 661.67, 711.59, 746.22, 823.67, 834.61, 876.46, 815.01, 832.11, 877.39, 873.12, 898.57, 991.32, 1002.75, 1149.19, 1083.46, 1045.63, 1090.53, 1043.82, 968.32, 933.61, 928.42] },
      velocityScore: { '1D': 24.3, '1W': 19.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$249B', pe: 27.2, revenueGrowth: 16, eps: 34.19, grossMargin: 20, dividendYield: 0.22,
      etfPresence: { POW: 3.21, VOLT: 3.8, PBD: false, PBW: false, IVEP: 3.72 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 3, avgWeight: 3.55, proScore: 2.13, coverage: 0.6,
      price: 259.25, weeklyPrices: [253.57, 259.61, 234.23, 248.88, 259.25], weeklyChange: 2.24, sortRank: 0, periodReturns: { '1M': -7.6, '6M': 173, '1Y': 1065.2 },
      priceHistory: { '1W': [253.57, 259.61, 234.23, 248.88, 259.25], '1M': [280.69, 289.76, 303.41, 275.95, 258.71, 282.31, 307.88, 302.49, 302.4, 293.8, 290.01, 285, 273.51, 302.85, 287.32, 263.61, 253.57, 259.61, 234.23, 248.88, 259.25], '6M': [94.98, 88.82, 88.41, 103.05, 139.77, 150.56, 165.39, 147.35, 155.54, 159, 168.57, 159.99, 157.17, 156.58, 150.22, 132.45, 160.13, 210.06, 237.57, 283.36, 258.64, 303.41, 307.88, 285, 263.61, 259.25], '1Y': [22.25, 21.75, 22.18, 24.36, 25.96, 25.36, 34.78, 36.72, 36.8, 45.28, 48.54, 52.94, 53.44, 67.02, 86.27, 73.6, 86.97, 109.91, 109.06, 108.53, 132.16, 135.21, 111.89, 89.99, 98.93, 111.79, 89.58, 92.26, 87.26, 108, 133.46, 145.63, 165.39, 147.35, 155.54, 159, 168.57, 159.99, 157.17, 166.69, 133.52, 135.63, 166.7, 207.86, 231.17, 283.36, 258.64, 303.41, 307.88, 285, 263.61, 259.25] },
      velocityScore: { '1D': 44.9, '1W': 29.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$74B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: 3.93, PBD: false, PBW: 2.05, IVEP: 4.68 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 3, avgWeight: 3.45, proScore: 2.07, coverage: 0.6,
      price: 168.42, weeklyPrices: [163.81, 163.80, 156.79, 164.52, 168.42], weeklyChange: 2.81, sortRank: 0, periodReturns: { '1M': -1.4, '6M': 65.6, '1Y': 141.4 },
      priceHistory: { '1W': [163.81, 163.8, 156.79, 164.52, 168.42], '1M': [170.74, 172.91, 173.96, 169.01, 160.69, 161.86, 163.57, 164.66, 169.29, 167.8, 164.87, 166.99, 171.55, 173.39, 176.39, 162.86, 163.81, 163.8, 156.79, 164.52, 168.42], '6M': [101.71, 101.54, 103.26, 110.09, 106.64, 112.66, 114.15, 116.69, 112.75, 116.88, 121.79, 110.55, 107.87, 120.27, 127.01, 121.26, 128.63, 129.7, 142.76, 142.9, 166.73, 173.96, 163.57, 166.99, 162.86, 168.42], '1Y': [69.76, 70.26, 73.35, 74.51, 74.97, 74.96, 79.07, 89.88, 88.68, 88.01, 90.08, 90.39, 92.58, 96.35, 100.25, 96.7, 98, 99.5, 100.23, 103.91, 114.35, 111.03, 106.55, 100.55, 105.67, 107.11, 102.61, 102.79, 103.01, 106.48, 104.54, 111.57, 114.15, 116.69, 112.75, 116.88, 121.79, 110.55, 107.87, 122.58, 118.44, 117.96, 130.56, 134.69, 142.17, 142.9, 166.73, 173.96, 163.57, 166.99, 162.86, 168.42] },
      velocityScore: { '1D': 19.7, '1W': 15, '1M': null, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 57.3, revenueGrowth: 54, eps: 2.94, grossMargin: 37, dividendYield: 0.51,
      etfPresence: { POW: 3.94, VOLT: 3.13, PBD: false, PBW: false, IVEP: 3.28 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 3, avgWeight: 3.44, proScore: 2.07, coverage: 0.6,
      price: 85.74, weeklyPrices: [84.01, 84.83, 85.12, 84.84, 85.74], weeklyChange: 2.06, sortRank: 0, periodReturns: { '1M': -9.4, '6M': 5, '1Y': 16.1 },
      priceHistory: { '1W': [84.01, 84.83, 85.12, 84.84, 85.74], '1M': [94.59, 94.85, 95.68, 93.36, 89.04, 88.27, 89.69, 88.55, 87.65, 87.65, 87.25, 87.01, 83.66, 85.68, 84.58, 85.84, 84.01, 84.83, 85.12, 84.84, 85.74], '6M': [81.65, 79.54, 80.27, 81.05, 81.64, 83.85, 87.57, 89.97, 91.36, 91.64, 91.99, 91.13, 91.73, 90.96, 91.16, 92.85, 94.48, 91.83, 96.25, 97.88, 93.32, 95.68, 89.69, 87.01, 85.84, 85.74], '1Y': [73.84, 71.53, 70.89, 74.75, 75.04, 76.17, 71.34, 70.4, 72.41, 75.41, 76.32, 72.05, 69.77, 71.5, 72.35, 76.21, 82.11, 84.3, 84.77, 86.03, 81.4, 83.93, 83.88, 83.48, 84.65, 80.55, 81.65, 80.04, 80.53, 78.37, 81.98, 85.07, 87.57, 89.97, 91.36, 91.64, 91.99, 91.13, 91.73, 92.41, 91.16, 93.15, 94.08, 91.98, 95.28, 97.88, 93.32, 95.68, 89.69, 87.01, 85.84, 85.74] },
      velocityScore: { '1D': 32.7, '1W': 41.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$179B', pe: 21.8, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.94,
      etfPresence: { POW: 2.02, VOLT: 4.66, PBD: false, PBW: false, IVEP: 3.65 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 3, avgWeight: 2.86, proScore: 1.72, coverage: 0.6,
      price: 472.31, weeklyPrices: [485.03, 486.47, 467.59, 469.32, 472.31], weeklyChange: -2.62, sortRank: 0, periodReturns: { '1M': -2.8, '6M': 5.4, '1Y': 20.8 },
      priceHistory: { '1W': [485.03, 486.47, 467.59, 469.32, 472.31], '1M': [485.98, 483.79, 482.03, 479.97, 470.87, 463.32, 460.98, 475.01, 478.05, 484.25, 473.93, 473.61, 462.93, 480.46, 484.91, 476.82, 485.03, 486.47, 467.59, 469.32, 472.31], '6M': [448, 442.51, 451.39, 477.46, 481.68, 482.5, 485.73, 487.16, 516.03, 526.56, 524.19, 476.51, 468.41, 477.47, 503.2, 500.38, 534.67, 521.71, 557.85, 508.17, 493.04, 482.03, 460.98, 473.61, 476.82, 472.31], '1Y': [391.04, 395.79, 406.62, 412.97, 415.08, 422.27, 438.31, 426.74, 418.65, 427.65, 440.85, 430.99, 436.62, 438.11, 438.49, 426.44, 413.05, 418.72, 431.65, 433.98, 470, 462.43, 432.82, 421.84, 427.85, 441.51, 444.84, 451.03, 446.61, 468.2, 476.06, 484.06, 485.73, 487.16, 516.03, 526.56, 524.19, 476.51, 468.41, 492.65, 481.67, 494.25, 536.01, 535.57, 553.07, 508.17, 493.04, 482.03, 460.98, 473.61, 476.82, 472.31] },
      velocityScore: { '1D': 8.9, '1W': 12.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 27.9, revenueGrowth: 11, eps: 16.94, grossMargin: 36, dividendYield: 1.21,
      etfPresence: { POW: 2.87, VOLT: 3.26, PBD: false, PBW: false, IVEP: 2.45 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'NRG', name: 'NRG Energy Inc', easyScore: 3, avgWeight: 1.21, proScore: 0.72, coverage: 0.6,
      price: 124.13, weeklyPrices: [127.71, 129.96, 120.65, 123.70, 124.13], weeklyChange: -2.8, sortRank: 0, periodReturns: { '1M': -9.6, '6M': -23.1, '1Y': -17.8 },
      priceHistory: { '1W': [127.71, 129.96, 120.65, 123.7, 124.13], '1M': [137.34, 131.08, 134.72, 127.81, 125.5, 133.98, 136.92, 137.65, 140.43, 138, 137.5, 134.08, 129.47, 133.51, 133.76, 129.2, 127.71, 129.96, 120.65, 123.7, 124.13], '6M': [161.44, 156.2, 160.96, 159.63, 150.59, 150.68, 155.11, 143.99, 160.63, 175.01, 181.34, 160.46, 152.1, 159.11, 151.04, 149.9, 161.78, 168.5, 154.53, 155.58, 141.86, 134.72, 136.92, 134.08, 129.2, 124.13], '1Y': [151, 151.92, 162.67, 158.69, 151.06, 152.31, 158.54, 167.63, 152.54, 148.62, 145.09, 145.56, 147.76, 166.08, 170.97, 165.34, 163.95, 168.77, 167.01, 172.59, 171.86, 172.5, 165.19, 159.2, 165.66, 164.11, 159.99, 156.96, 160.43, 148.91, 149.83, 151.09, 155.11, 143.99, 160.63, 175.01, 181.34, 160.46, 152.1, 161.4, 146.14, 152.69, 164.07, 167.73, 159.81, 155.58, 141.86, 134.72, 136.92, 134.08, 129.2, 124.13] },
      velocityScore: { '1D': 100, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 134.9, revenueGrowth: 20, eps: 0.92, grossMargin: 16, dividendYield: 1.54,
      etfPresence: { POW: 0.51, VOLT: 0.92, PBD: false, PBW: false, IVEP: 2.19 },
      tonyNote: 'NRG Energy Inc appears in 3 of 5 Electrification ETFs (60% coverage) with average weight 1.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, avgWeight: 5.8, proScore: 2.32, coverage: 0.4,
      price: 296.5, weeklyPrices: [279.13, 276.04, 276.95, 296.55, 296.50], weeklyChange: 6.22, sortRank: 0, periodReturns: { '1M': -0.6, '6M': 71.3, '1Y': 243.2 },
      priceHistory: { '1W': [279.13, 276.04, 276.95, 296.55, 296.5], '1M': [298.22, 266.92, 268.73, 256.72, 258.28, 254.75, 260.4, 270.01, 276.25, 280.13, 276.96, 274.52, 269.86, 269.22, 280.09, 262.56, 279.13, 276.04, 276.95, 296.55, 296.5], '6M': [173.12, 175.69, 174.34, 184, 193.82, 201.8, 207.78, 211.58, 238.4, 230.06, 232.12, 202.58, 195.18, 205.74, 220.77, 203.04, 235, 241.49, 268.31, 275.84, 290.46, 268.73, 260.4, 274.52, 262.56, 296.5], '1Y': [86.4, 90.51, 96.08, 99.27, 101.66, 103.72, 126.75, 127.5, 132.58, 131.03, 132.6, 134.56, 141.51, 145.86, 146.51, 140.37, 141.12, 145.02, 147.96, 155.89, 153.99, 161.53, 147.67, 140.95, 154.77, 172.21, 173.3, 174.02, 172.95, 181.03, 192.96, 200.29, 207.78, 211.58, 238.4, 230.06, 232.12, 202.58, 195.18, 214.95, 204.11, 204.65, 235.73, 254.25, 276.65, 275.84, 290.46, 268.73, 260.4, 274.52, 262.56, 296.5] },
      velocityScore: { '1D': -17.1, '1W': -11.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 71.4, revenueGrowth: 17, eps: 4.15, grossMargin: 39, dividendYield: 0.09,
      etfPresence: { POW: 3.59, VOLT: 8.02, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.19, proScore: 1.28, coverage: 0.4,
      price: 299.06, weeklyPrices: [300.57, 289.52, 280.98, 297.88, 299.06], weeklyChange: -0.5, sortRank: 0, periodReturns: { '1M': -18.5, '6M': 85.4, '1Y': 161.2 },
      priceHistory: { '1W': [300.57, 289.52, 280.98, 297.88, 299.06], '1M': [367.13, 369.99, 376.23, 370.94, 339.73, 315.67, 323.4, 327.46, 323.91, 319.78, 314.18, 315.71, 323.39, 334.49, 331.44, 300.51, 300.57, 289.52, 280.98, 297.88, 299.06], '6M': [161.27, 159.82, 165.62, 174.95, 172.72, 181.47, 193.76, 182.56, 248.51, 243.06, 259.23, 249.75, 265.38, 264.71, 276.16, 259.37, 287.64, 294.13, 321.75, 328.49, 340.01, 376.23, 323.4, 315.71, 300.51, 299.06], '1Y': [114.5, 118.54, 127.16, 126.26, 124.72, 126.21, 142.55, 141.59, 139.93, 133.07, 125.97, 127.55, 121.82, 138.26, 151.96, 143.31, 162.8, 179, 175.73, 192.9, 192.86, 179.8, 170.97, 159.83, 179.22, 185.61, 161.74, 166.25, 164.34, 171.54, 170.86, 181.12, 193.76, 182.56, 248.51, 243.06, 259.23, 249.75, 265.38, 269.17, 252.4, 261.29, 295.11, 307.34, 323.46, 328.49, 340.01, 376.23, 323.4, 315.71, 300.51, 299.06] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$115B', pe: 75, revenueGrowth: 30, eps: 3.99, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 2.4, PBD: false, PBW: false, IVEP: 3.99 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 2.85, proScore: 1.14, coverage: 0.4,
      price: 128.61, weeklyPrices: [126.77, 127.76, 128.53, 128.48, 128.61], weeklyChange: 1.45, sortRank: 0, periodReturns: { '1M': -2.5, '6M': 12.7, '1Y': 24.8 },
      priceHistory: { '1W': [126.77, 127.76, 128.53, 128.48, 128.61], '1M': [131.94, 127.95, 128.6, 125.15, 127.68, 128.87, 129.61, 131.59, 130.9, 129.57, 127.76, 126.67, 123.79, 127.11, 126.31, 129.14, 126.77, 127.76, 128.53, 128.48, 128.61], '6M': [114.13, 114.49, 115.77, 115.04, 116.62, 118.98, 119.12, 119.98, 122.25, 128.42, 132.1, 132.04, 132.22, 130.97, 128.3, 131.67, 137.15, 134.56, 135.08, 137.11, 131.76, 128.6, 129.61, 126.67, 129.14, 128.61], '1Y': [103.02, 101.75, 102.46, 104.17, 105.02, 108.54, 107.95, 113.58, 112.5, 111.99, 114.02, 111.02, 107.55, 109.1, 107.05, 109.78, 115.66, 116.8, 117.82, 116.39, 120.26, 121.43, 121.3, 120.84, 120.51, 115.73, 115.77, 114.62, 115.99, 113.7, 118.11, 117.18, 119.12, 119.98, 122.25, 128.42, 132.1, 132.04, 132.22, 128.72, 128.85, 132.68, 136.3, 133.66, 134.73, 137.11, 131.76, 128.6, 129.61, 126.67, 129.14, 128.61] },
      velocityScore: { '1D': -22.4, '1W': -17.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 19, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.96,
      etfPresence: { POW: 1.41, VOLT: 4.28, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.73, proScore: 1.09, coverage: 0.4,
      price: 355.16, weeklyPrices: [306.11, 311.64, 308.17, 340.40, 355.16], weeklyChange: 16.02, sortRank: 0, periodReturns: { '1M': 4.6, '6M': 65.1, '1Y': 180.4 },
      priceHistory: { '1W': [306.11, 311.64, 308.17, 340.4, 355.16], '1M': [339.42, 339.19, 344.6, 323.46, 309.06, 313.05, 323.79, 324.86, 339.65, 328.34, 317.08, 302.18, 294.65, 312.28, 322.5, 294.81, 306.11, 311.64, 308.17, 340.4, 355.16], '6M': [215.07, 216.09, 217.26, 229.7, 233.92, 269, 263.76, 254.54, 308.77, 320.64, 337.35, 311.42, 305.82, 319.63, 342.87, 332.82, 374.98, 372.23, 382.47, 383.91, 351.94, 344.6, 323.79, 302.18, 294.81, 355.16], '1Y': [126.68, 128.63, 132.31, 136.61, 141.48, 142.66, 141.94, 135.25, 150.82, 151.4, 154.51, 149.68, 154.43, 156.74, 174.77, 166.76, 176.02, 182.15, 197.44, 205.12, 202.73, 216.73, 202.48, 196, 207.78, 221.85, 216.87, 217.76, 213.41, 224.4, 237.9, 275.57, 263.76, 254.54, 308.77, 320.64, 337.35, 311.42, 305.82, 327.8, 313.11, 332.31, 379.64, 375.6, 387.24, 383.91, 351.94, 344.6, 323.79, 302.18, 294.81, 355.16] },
      velocityScore: { '1D': -14.8, '1W': -12.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$14B', pe: 74, revenueGrowth: 26, eps: 4.8, grossMargin: 39, dividendYield: 0.12,
      etfPresence: { POW: 1.07, VOLT: 4.39, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.64, proScore: 1.06, coverage: 0.4,
      price: 154.43, weeklyPrices: [143.60, 154.07, 149.22, 152.46, 154.43], weeklyChange: 7.54, sortRank: 0, periodReturns: { '1M': 20.8, '6M': 19.5, '1Y': 63.2 },
      priceHistory: { '1W': [143.6, 154.07, 149.22, 152.46, 154.43], '1M': [127.87, 124.64, 129.19, 125, 121.72, 123.05, 124.86, 132.06, 139.56, 140.24, 147.68, 148.76, 146.34, 148.4, 147.62, 138.81, 143.6, 154.07, 149.22, 152.46, 154.43], '6M': [129.24, 135.29, 136.9, 141.38, 148.97, 154.6, 145.96, 130, 144.04, 151.2, 148.47, 136.24, 131.47, 127.81, 128.73, 127.7, 137.68, 148.96, 150.18, 147.27, 136.62, 129.19, 124.86, 148.76, 138.81, 154.43], '1Y': [94.6, 93.82, 97.67, 98.55, 100.21, 103.71, 106.7, 104.31, 109.98, 109.21, 109.36, 108.86, 110.54, 119.24, 123.69, 121.01, 123.4, 123.91, 127.67, 135.91, 139.34, 139.09, 133.74, 131.6, 139.22, 140.06, 129.9, 135.14, 136.2, 138.91, 146.75, 152.5, 145.96, 130, 144.04, 151.2, 148.47, 136.24, 131.47, 130.65, 123.13, 128, 140.75, 151.06, 149.71, 147.27, 136.62, 129.19, 124.86, 148.76, 138.81, 154.43] },
      velocityScore: { '1D': -20.9, '1W': -14.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$190B', pe: 44.4, revenueGrowth: 58, eps: 3.48, grossMargin: 38, dividendYield: 0.66,
      etfPresence: { POW: 1, VOLT: 4.28, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.61, proScore: 1.04, coverage: 0.4,
      price: 145.46, weeklyPrices: [144.05, 147.75, 139.36, 144.01, 145.46], weeklyChange: 0.98, sortRank: 0, periodReturns: { '1M': 3.1, '6M': 26.8, '1Y': 40.4 },
      priceHistory: { '1W': [144.05, 147.75, 139.36, 144.01, 145.46], '1M': [141.04, 143.8, 145.03, 143.08, 137.31, 137.75, 135.47, 138.36, 140.22, 138.2, 136.15, 134.06, 133.91, 141.99, 146.96, 143.65, 144.05, 147.75, 139.36, 144.01, 145.46], '6M': [114.76, 119.53, 121.71, 113.95, 112.09, 115.49, 116.74, 129.49, 140.96, 142.7, 143.42, 137.18, 130.94, 133.76, 137.48, 134.72, 141.85, 137.55, 141.73, 146.03, 139.25, 145.03, 135.47, 134.06, 143.65, 145.46], '1Y': [103.6, 102.25, 105.07, 105.98, 106.26, 108.27, 111.52, 106.48, 105.55, 103.52, 107.26, 106.89, 107.17, 107.81, 109.29, 108.16, 109.58, 106.38, 110.6, 113.05, 114.39, 122.25, 118.72, 113.55, 114.94, 114.98, 116.88, 119.96, 120.94, 112.41, 112.13, 114.51, 116.74, 129.49, 140.96, 142.7, 143.42, 137.18, 130.94, 133.25, 131.57, 132.97, 142.53, 140.87, 141.92, 146.03, 139.25, 145.03, 135.47, 134.06, 143.65, 145.46] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$89B', pe: 44.5, revenueGrowth: 8, eps: 3.27, grossMargin: 37, dividendYield: 1.11,
      etfPresence: { POW: false, VOLT: 1.48, PBD: false, PBW: false, IVEP: 3.73 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 2.59, proScore: 1.04, coverage: 0.4,
      price: 72.91, weeklyPrices: [71.59, 71.59, 72.26, 71.62, 72.91], weeklyChange: 1.84, sortRank: 0, periodReturns: { '1M': -2.4, '6M': 22, '1Y': 21.4 },
      priceHistory: { '1W': [71.59, 71.59, 72.26, 71.62, 72.91], '1M': [74.73, 75.71, 77.69, 77.72, 77.69, 77.88, 77.52, 78.47, 76.34, 74.37, 73.13, 71.39, 70.04, 71.31, 71.66, 71.96, 71.59, 71.59, 72.26, 71.62, 72.91], '6M': [59.74, 58.26, 59.8, 59.5, 60.49, 63.18, 66.92, 66.46, 71.12, 72.17, 74.77, 74.77, 73.52, 72.8, 73.81, 71.83, 72.82, 70.86, 71.65, 76.31, 72.95, 77.69, 77.52, 71.39, 71.96, 72.91], '1Y': [60.08, 60.49, 62.67, 58.48, 59.04, 57.68, 57.51, 60.27, 57.89, 57.46, 57.07, 57.88, 56.85, 58.4, 60.16, 63.97, 63.58, 62.68, 63.06, 57.67, 57.87, 59.58, 60.99, 59.61, 61.44, 61.95, 59.48, 58.92, 60.16, 60.39, 60.71, 63.72, 66.92, 66.46, 71.12, 72.17, 74.77, 74.77, 73.52, 74.06, 74.06, 72, 72.74, 71.15, 72.18, 76.31, 72.95, 77.69, 77.52, 71.39, 71.96, 72.91] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$89B', pe: 32, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.93,
      etfPresence: { POW: false, VOLT: 1.51, PBD: false, PBW: false, IVEP: 3.67 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CEG', name: 'Constellation Energy Corp', easyScore: 2, avgWeight: 2.29, proScore: 0.91, coverage: 0.4,
      price: 248.57, weeklyPrices: [250.67, 251.65, 242.30, 246.71, 248.57], weeklyChange: -0.84, sortRank: 0, periodReturns: { '1M': -15.3, '6M': -29.4, '1Y': -17.2 },
      priceHistory: { '1W': [250.67, 251.65, 242.3, 246.71, 248.57], '1M': [293.6, 274.89, 275.26, 267.2, 262, 281.26, 285.83, 294.07, 301.57, 288.68, 286.31, 287.75, 265.7, 272.65, 267.24, 254.83, 250.67, 251.65, 242.3, 246.71, 248.57], '6M': [351.98, 355.4, 358.33, 354.58, 333.53, 294.37, 287.95, 250.46, 276.85, 291.66, 323.56, 332.07, 301.55, 317.22, 303.32, 279.46, 280.25, 299.14, 292.77, 313, 311.28, 275.26, 285.83, 287.75, 254.83, 248.57], '1Y': [300.38, 304.92, 320.17, 318.25, 325.99, 317.88, 328.66, 340.77, 335.77, 322.23, 310.16, 307.98, 298.82, 330.42, 347.12, 334.27, 364.1, 380.91, 370, 391.15, 377, 358.39, 338.52, 338.11, 359.05, 357.67, 357.14, 357.81, 357.12, 338.63, 330.38, 287.35, 287.95, 250.46, 276.85, 291.66, 323.56, 332.07, 301.55, 316.47, 295.19, 272.82, 286.5, 296.21, 313.53, 313, 311.28, 275.26, 285.83, 287.75, 254.83, 248.57] },
      velocityScore: { '1D': 106.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$89B', pe: 21.6, revenueGrowth: 64, eps: 11.52, grossMargin: 23, dividendYield: 0.69,
      etfPresence: { POW: 1.31, VOLT: false, PBD: false, PBW: false, IVEP: 3.26 },
      tonyNote: 'Constellation Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX TECHNOLOGIES INC', easyScore: 2, avgWeight: 2.16, proScore: 0.86, coverage: 0.4,
      price: 196.83, weeklyPrices: [187.46, 188.96, 183.00, 194.68, 196.83], weeklyChange: 5, sortRank: 0, periodReturns: { '1M': -4.8, '6M': 12.5, '1Y': 42.9 },
      priceHistory: { '1W': [187.46, 188.96, 183, 194.68, 196.83], '1M': [206.83, 206.83, 210.94, 204.72, 201.94, 202.66, 202.52, 202.91, 204.38, 198.95, 199.27, 195.88, 188.39, 187.26, 184.72, 185.95, 187.46, 188.96, 183, 194.68, 196.83], '6M': [175.03, 176.43, 175.49, 195.3, 210.54, 209.52, 216.3, 190.1, 198.5, 209.07, 207.24, 195.5, 197.82, 208.98, 222.13, 212.81, 230.29, 230.8, 225.51, 216.39, 209.89, 210.94, 202.52, 195.88, 185.95, 196.83], '1Y': [137.78, 142.32, 143.19, 143.79, 138.65, 140.36, 149.83, 149.5, 179.19, 173.5, 163.09, 162.04, 163.75, 174.3, 178.19, 181.96, 191.38, 197.37, 207.72, 204.03, 213.61, 193.55, 178.31, 169.81, 174.93, 178.75, 174.37, 178.41, 174.36, 192.24, 204.08, 206.33, 216.3, 190.1, 198.5, 209.07, 207.24, 195.5, 197.82, 210.12, 205.09, 214.98, 229.57, 235.78, 223.15, 216.39, 209.89, 210.94, 202.52, 195.88, 185.95, 196.83] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$18B', pe: 52.3, revenueGrowth: 26, eps: 3.76, grossMargin: 23, dividendYield: 0.53,
      etfPresence: { POW: false, VOLT: 2.11, PBD: false, PBW: false, IVEP: 2.21 },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'SO', name: 'Southern Co/The', easyScore: 2, avgWeight: 2.04, proScore: 0.81, coverage: 0.4,
      price: 93.95, weeklyPrices: [91.28, 92.95, 94.02, 93.27, 93.95], weeklyChange: 2.93, sortRank: 0, periodReturns: { '1M': 0.5, '6M': 11.3, '1Y': 4 },
      priceHistory: { '1W': [91.28, 92.95, 94.02, 93.27, 93.95], '1M': [93.47, 93.14, 93.68, 92.55, 93.71, 93.62, 94.24, 94.55, 94.09, 93.74, 92.52, 92.05, 89.03, 90.51, 90.49, 92.6, 91.28, 92.95, 94.02, 93.27, 93.95], '6M': [84.44, 85.28, 87.54, 87.52, 87.55, 89.15, 88.33, 90.29, 90.86, 95.05, 96.35, 97.2, 97.84, 96.54, 94.61, 96.94, 97.59, 94.9, 93.91, 96.7, 92.43, 93.68, 94.24, 92.05, 92.6, 93.95], '1Y': [90.36, 89.3, 90.9, 91.66, 92.68, 94.79, 94.3, 94.99, 94.69, 94.07, 94.48, 92.3, 90.83, 92.28, 92.33, 93.91, 95.49, 98.08, 97.69, 95.4, 94.04, 91.44, 90.69, 89.27, 89.01, 85.56, 86, 85.72, 87.57, 86.27, 88.42, 87.51, 88.33, 90.29, 90.86, 95.05, 96.35, 97.2, 97.84, 96.23, 95.42, 97.45, 97.15, 94.51, 93.49, 96.7, 92.43, 93.68, 94.24, 92.05, 92.6, 93.95] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$106B', pe: 24, revenueGrowth: 8, eps: 3.91, grossMargin: 48, dividendYield: 3.26,
      etfPresence: { POW: 0.32, VOLT: false, PBD: false, PBW: false, IVEP: 3.75 },
      tonyNote: 'Southern Co/The appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'XEL', name: 'Xcel Energy Inc', easyScore: 2, avgWeight: 1.98, proScore: 0.79, coverage: 0.4,
      price: 78.89, weeklyPrices: [77.62, 77.87, 78.10, 78.27, 78.89], weeklyChange: 1.63, sortRank: 0, periodReturns: { '1M': -1.3, '6M': 5, '1Y': 14.2 },
      priceHistory: { '1W': [77.62, 77.87, 78.1, 78.27, 78.89], '1M': [79.9, 79.91, 80.03, 77.92, 78.1, 79.86, 80.2, 81.08, 80.78, 81, 79.26, 79.5, 76.41, 77.87, 77.39, 79.04, 77.62, 77.87, 78.1, 78.27, 78.89], '6M': [75.15, 72.67, 74.12, 74.43, 74.94, 76.51, 76.01, 76.2, 77.92, 80.82, 83.47, 82.38, 80.82, 80.02, 77.7, 79.71, 82.77, 81.05, 79.48, 82.95, 80.43, 80.03, 80.2, 79.5, 79.04, 78.89], '1Y': [69.07, 66.64, 67.78, 67.88, 69.17, 71.57, 71.14, 73.47, 73.33, 71.93, 74.26, 72.39, 71.75, 73.05, 72.35, 80.05, 81, 80.16, 81.28, 80.69, 81.17, 80.91, 80.58, 79.67, 79.73, 75.73, 75.72, 73.85, 74.19, 73.22, 76.2, 75.86, 76.01, 76.2, 77.92, 80.82, 83.47, 82.38, 80.82, 79.53, 77.93, 80.74, 82.38, 81.08, 79.15, 82.95, 80.43, 80.03, 80.2, 79.5, 79.04, 78.89] },
      velocityScore: { '1D': -22.5, '1W': -16.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$49B', pe: 22.7, revenueGrowth: 3, eps: 3.47, grossMargin: 46, dividendYield: 3.03,
      etfPresence: { POW: 2, VOLT: 1.96, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Xcel Energy Inc appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 5.32, proScore: 2.13, coverage: 0.4,
      price: 866.67, weeklyPrices: [891.86, 842.01, 770.25, 838.55, 866.67], weeklyChange: -2.82, sortRank: 0, periodReturns: { '1M': 1.8, '6M': 175, '1Y': 324.2 },
      priceHistory: { '1W': [891.86, 842.01, 770.25, 838.55, 866.67], '1M': [851.35, 854.28, 889.03, 848.84, 770.76, 752, 733.77, 732.94, 783.53, 782.12, 842.96, 860.84, 845.39, 875.52, 957.03, 882.43, 891.86, 842.01, 770.25, 838.55, 866.67], '6M': [315.15, 308.58, 310.79, 317.41, 321.6, 362.53, 373.52, 360.16, 433.91, 415.13, 433.34, 398.87, 404.59, 421.23, 452.92, 421.29, 435.65, 441.1, 495.67, 515.62, 811.41, 889.03, 733.77, 860.84, 882.43, 866.67], '1Y': [204.32, 217.97, 231.51, 237, 241.31, 247.65, 263.59, 263.05, 302.69, 275.35, 279.58, 278.53, 286.71, 322.9, 367.39, 341.1, 352.78, 355.27, 369.01, 376.74, 377.9, 377.84, 338.66, 315.1, 320.51, 324.62, 319.12, 313.04, 307.68, 312.24, 319.27, 364.25, 373.52, 360.16, 433.91, 415.13, 433.34, 398.87, 404.59, 431.78, 415.93, 416.34, 446.36, 463.65, 497.18, 515.62, 811.41, 889.03, 733.77, 860.84, 882.43, 866.67] },
      velocityScore: { '1D': 3.4, '1W': -13.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 77.7, revenueGrowth: 92, eps: 11.15, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 6.22, PRN: 4.42, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 5.12, proScore: 2.05, coverage: 0.4,
      price: 301.84, weeklyPrices: [293.60, 283.51, 262.34, 290.50, 301.84], weeklyChange: 2.81, sortRank: 0, periodReturns: { '1M': -2, '6M': 168.6, '1Y': 368.4 },
      priceHistory: { '1W': [293.6, 283.51, 262.34, 290.5, 301.84], '1M': [308.05, 300.84, 296.98, 292.65, 266.8, 271.05, 270.75, 279.22, 291.97, 295.94, 288.9, 284.42, 288.12, 299.07, 299.73, 284.87, 293.6, 283.51, 262.34, 290.5, 301.84], '6M': [112.36, 110.97, 111.96, 120, 133.04, 140.62, 147.81, 175.77, 197.45, 178.79, 176.96, 167.67, 171.19, 167.41, 194.85, 184.68, 230.81, 232.81, 252.18, 277.27, 305.93, 296.98, 270.75, 284.42, 284.87, 301.84], '1Y': [64.44, 58.47, 70.97, 71.96, 70.19, 73.64, 80.8, 75.89, 81.28, 84.88, 87.65, 88.72, 90.8, 100.68, 100.97, 101.01, 103.9, 105.33, 116.4, 124.71, 127.8, 121.79, 109.89, 94.02, 106.53, 114.29, 109.31, 112.18, 109.16, 118.62, 133.76, 142.29, 147.81, 175.77, 197.45, 178.79, 176.96, 167.67, 171.19, 175.13, 174.8, 182.6, 230.94, 241.01, 252.76, 277.27, 305.93, 296.98, 270.75, 284.42, 284.87, 301.84] },
      velocityScore: { '1D': -0.5, '1W': -21.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 59.1, revenueGrowth: 7, eps: 5.11, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { AIRR: 2.61, PRN: false, RSHO: 7.63, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5, proScore: 2, coverage: 0.4,
      price: 912.91, weeklyPrices: [915.64, 914.70, 856.16, 897.63, 912.91], weeklyChange: -0.3, sortRank: 0, periodReturns: { '1M': 0.1, '6M': 52.7, '1Y': 152.9 },
      priceHistory: { '1W': [915.64, 914.7, 856.16, 897.63, 912.91], '1M': [912.14, 902.3, 920.22, 888.31, 863.95, 872.56, 865.95, 879.89, 908.55, 909.93, 887.67, 875.87, 865.36, 909.81, 926.18, 904.28, 915.64, 914.7, 856.16, 897.63, 912.91], '6M': [597.89, 576.22, 578.61, 623.09, 636.53, 645.38, 643.28, 691.82, 775, 760.53, 752.93, 706.08, 700.69, 693.62, 719.04, 730.32, 787.07, 772.66, 835.24, 890.11, 895.69, 920.22, 865.95, 875.87, 904.28, 912.91], '1Y': [360.96, 360.52, 384.71, 391.51, 405.77, 410.07, 432.94, 428.69, 416.52, 407.79, 435.67, 419.04, 422.78, 435.94, 472.1, 471.61, 495.38, 504.76, 531.18, 527.07, 577.26, 563.1, 554.03, 550.43, 568.06, 596.5, 589.76, 582.41, 577.39, 596.52, 638.75, 648.41, 643.28, 691.82, 775, 760.53, 752.93, 706.08, 700.69, 688.65, 703.19, 717.22, 790.66, 794.65, 830.79, 890.11, 895.69, 920.22, 865.95, 875.87, 904.28, 912.91] },
      velocityScore: { '1D': -1, '1W': -0.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$420B', pe: 45.4, revenueGrowth: 22, eps: 20.11, grossMargin: 29, dividendYield: 0.73,
      etfPresence: { AIRR: false, PRN: 3.27, RSHO: 6.73, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.48, proScore: 1.79, coverage: 0.4,
      price: 1884.91, weeklyPrices: [1852.03, 1831.56, 1719.48, 1843.42, 1884.91], weeklyChange: 1.78, sortRank: 0, periodReturns: { '1M': -6.5, '6M': 94.7, '1Y': 276 },
      priceHistory: { '1W': [1852.03, 1831.56, 1719.48, 1843.42, 1884.91], '1M': [2016.31, 2034.63, 2042.36, 1992.74, 1854.43, 1835.51, 1835.33, 1828.25, 1883.56, 1867.09, 1855.15, 1828.21, 1787.88, 1883.26, 1850.04, 1843.94, 1852.03, 1831.56, 1719.48, 1843.42, 1884.91], '6M': [967.95, 940.74, 950.67, 1035.11, 1073.14, 1148, 1169.05, 1119.81, 1338.65, 1373.52, 1438.23, 1348.22, 1373.76, 1423, 1470.64, 1428.52, 1574.45, 1605.97, 1773.91, 1840.25, 1942.02, 2042.36, 1835.33, 1828.21, 1843.94, 1884.91], '1Y': [501.25, 500.02, 535, 541.48, 542.95, 544.95, 692.97, 695.3, 691.76, 680.86, 689.48, 703.38, 715.87, 782.05, 821.62, 801.8, 825.42, 845.99, 836.75, 976.45, 965.58, 955.26, 909.6, 894.08, 961.2, 989.48, 968.48, 950.79, 946.93, 1035.12, 1053.1, 1131.7, 1169.05, 1119.81, 1338.65, 1373.52, 1438.23, 1348.22, 1373.76, 1444.6, 1358.66, 1417.19, 1592.84, 1650.47, 1726.12, 1840.25, 1942.02, 2042.36, 1835.33, 1828.21, 1843.94, 1884.91] },
      velocityScore: { '1D': 1.1, '1W': -1.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 54.4, revenueGrowth: 1, eps: 34.66, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: 4.26, PRN: 4.7, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, avgWeight: 3.97, proScore: 1.59, coverage: 0.4,
      price: 641.79, weeklyPrices: [619.98, 613.93, 588.90, 623.66, 641.79], weeklyChange: 3.52, sortRank: 0, periodReturns: { '1M': -5.8, '6M': 100.6, '1Y': 188.9 },
      priceHistory: { '1W': [619.98, 613.93, 588.9, 623.66, 641.79], '1M': [681.01, 719.92, 740.91, 722.31, 664.76, 630.5, 644.64, 656.35, 670.66, 673.51, 677.45, 667.02, 646.89, 663.14, 686.37, 694.72, 619.98, 613.93, 588.9, 623.66, 641.79], '6M': [319.91, 325.59, 320.73, 330.42, 314.09, 397.42, 358.87, 354.14, 422.5, 432.18, 452.53, 430.25, 459.3, 469.81, 437.48, 571.38, 609.29, 601.83, 656.79, 669.98, 690, 740.91, 644.64, 667.02, 694.72, 641.79], '1Y': [222.12, 203.36, 219.74, 209.5, 220.73, 207.07, 236.89, 225.27, 239.02, 223.99, 222.16, 228.22, 203.84, 238.75, 268.34, 271.07, 263.53, 294.72, 290.27, 294.99, 306.21, 311.58, 351.64, 335.33, 363.73, 319.31, 317.58, 337.9, 315.44, 337.03, 317.76, 380.36, 358.87, 354.14, 422.5, 432.18, 452.53, 430.25, 459.3, 479.9, 410.85, 575.16, 603.84, 597.88, 652.99, 669.98, 690, 740.91, 644.64, 667.02, 694.72, 641.79] },
      velocityScore: { '1D': 0.6, '1W': -7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 56.5, revenueGrowth: 50, eps: 11.35, grossMargin: 21, dividendYield: 0.32,
      etfPresence: { AIRR: 3.83, PRN: 4.11, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Argan Inc is an engineering and construction company for power generation facilities — natural gas and renewable power plants. It appears in Industrials ETFs because power plant construction is one of the fastest-growing categories in U.S. infrastructure spending, driven by data center load additions that the grid cannot currently support.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.5, proScore: 1.4, coverage: 0.4,
      price: 320.5, weeklyPrices: [314.42, 322.81, 314.08, 318.89, 320.50], weeklyChange: 1.93, sortRank: 0, periodReturns: { '1M': 2.2, '6M': 22.5, '1Y': 39.2 },
      priceHistory: { '1W': [314.42, 322.81, 314.08, 318.89, 320.5], '1M': [313.7, 310.87, 315.72, 307.17, 305.22, 306.25, 305.66, 307.1, 311.33, 312.65, 308.53, 303.81, 300.98, 308.31, 313.39, 315.29, 314.42, 322.81, 314.08, 318.89, 320.5], '6M': [261.74, 262.41, 263.4, 265.39, 278.77, 284, 256.26, 289.94, 290.31, 281.13, 283.5, 274.97, 259.88, 258.51, 266, 269.36, 286.41, 284.39, 294.4, 305.75, 310.37, 315.72, 305.66, 303.81, 315.29, 320.5], '1Y': [230.24, 227.19, 231.69, 244.15, 256.98, 260.2, 274.69, 264.18, 263.13, 255.01, 267.11, 263.58, 266.22, 262.83, 265.48, 258.44, 259.04, 246.74, 249.57, 260, 257.09, 258.92, 248.96, 248.92, 256.44, 257.25, 259.81, 263.48, 261.16, 260.8, 277.62, 282.33, 256.26, 289.94, 290.31, 281.13, 283.5, 274.97, 259.88, 256.58, 260.51, 267.12, 289.01, 291.03, 293.35, 305.75, 310.37, 315.72, 305.66, 303.81, 315.29, 320.5] },
      velocityScore: { '1D': -0.7, '1W': 4.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 30.3, revenueGrowth: 7, eps: 10.59, grossMargin: 30, dividendYield: 0.64,
      etfPresence: { AIRR: 1.76, PRN: false, RSHO: 5.25, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.79, proScore: 1.12, coverage: 0.4,
      price: 228.07, weeklyPrices: [229.95, 228.01, 223.63, 233.49, 228.07], weeklyChange: -0.82, sortRank: 0, periodReturns: { '1M': 14.6, '6M': 3.7, '1Y': 43.7 },
      priceHistory: { '1W': [229.95, 228.01, 223.63, 233.49, 228.07], '1M': [198.99, 203.79, 203.5, 200.99, 200.47, 205.55, 205.39, 207.8, 219.08, 215.34, 213.82, 216.66, 220.92, 230.08, 234.08, 227.8, 229.95, 228.01, 223.63, 233.49, 228.07], '6M': [219.94, 203.17, 205.66, 208.63, 211.07, 220.86, 211.34, 212.76, 233.46, 241.01, 231.59, 211.9, 202.65, 202.46, 201.27, 203.16, 215.54, 215.27, 223.96, 218.91, 205.27, 203.5, 205.39, 216.66, 227.8, 228.07], '1Y': [158.76, 154.42, 167.15, 169.97, 174.38, 174.44, 180.42, 196.36, 201.57, 186.39, 190.47, 187.11, 189.1, 186.95, 189.75, 184.24, 190.89, 180.71, 184.97, 195.85, 223.89, 221.92, 211.43, 204.57, 208.53, 206.16, 218.13, 207.18, 203.51, 208, 209.78, 217.13, 211.34, 212.76, 233.46, 241.01, 231.59, 211.9, 202.65, 202.36, 200.45, 197.29, 215.97, 223.52, 222.82, 218.91, 205.27, 203.5, 205.39, 216.66, 227.8, 228.07] },
      velocityScore: { '1D': -0.9, '1W': -22.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 43.6, revenueGrowth: 17, eps: 5.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.67, PRN: false, RSHO: 3.91, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 2, avgWeight: 2.74, proScore: 1.09, coverage: 0.4,
      price: 262.94, weeklyPrices: [246.55, 257.16, 249.49, 264.60, 262.94], weeklyChange: 6.65, sortRank: 0, periodReturns: { '1M': -2.5, '6M': 32.6, '1Y': 53.3 },
      priceHistory: { '1W': [246.55, 257.16, 249.49, 264.6, 262.94], '1M': [269.76, 273.1, 272.37, 260.35, 256.99, 261.21, 259.89, 256.55, 261.89, 258.02, 259.89, 258.25, 255.52, 250.72, 248.63, 251.9, 246.55, 257.16, 249.49, 264.6, 262.94], '6M': [198.31, 203.49, 209.49, 214.69, 219.64, 225, 210.84, 208.61, 230.85, 251.3, 260.31, 252.39, 243.82, 241.93, 241.62, 239.04, 254.06, 247.6, 246.16, 243.04, 272.54, 272.37, 259.89, 258.25, 251.9, 262.94], '1Y': [171.52, 173.34, 184.9, 180.25, 184.32, 187.83, 188.17, 184.26, 180.75, 171.25, 171, 174.1, 179.43, 189.25, 192.15, 191.92, 190.48, 189.99, 192.52, 201.84, 205.95, 206.66, 203.29, 197.28, 198.74, 193.64, 197.24, 208.17, 207.81, 210.9, 220.25, 217.7, 210.84, 208.61, 230.85, 251.3, 260.31, 252.39, 243.82, 232.94, 230.51, 232.68, 252.67, 255.69, 242.44, 243.04, 272.54, 272.37, 259.89, 258.25, 251.9, 262.94] },
      velocityScore: { '1D': 0.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$105B', pe: 61, revenueGrowth: 19, eps: 4.31, grossMargin: 35, dividendYield: 0.18,
      etfPresence: { AIRR: false, PRN: 3.35, RSHO: false, IDEF: 2.12, BILT: false },
      tonyNote: 'Howmet Aerospace is an aerospace structures and engine components manufacturer. It appears in Industrials ETFs for its aerospace and defense exposure — commercial air travel recovery and defense spending growth are the two demand drivers. Revenue grew and margins are expanding as Howmet prices power over OEM customers.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.38, proScore: 0.95, coverage: 0.4,
      price: 196.83, weeklyPrices: [187.46, 188.96, 183.00, 194.68, 196.83], weeklyChange: 5, sortRank: 0, periodReturns: { '1M': -4.8, '6M': 12.5, '1Y': 42.9 },
      priceHistory: { '1W': [187.46, 188.96, 183, 194.68, 196.83], '1M': [206.83, 206.83, 210.94, 204.72, 201.94, 202.66, 202.52, 202.91, 204.38, 198.95, 199.27, 195.88, 188.39, 187.26, 184.72, 185.95, 187.46, 188.96, 183, 194.68, 196.83], '6M': [175.03, 176.43, 175.49, 195.3, 210.54, 209.52, 216.3, 190.1, 198.5, 209.07, 207.24, 195.5, 197.82, 208.98, 222.13, 212.81, 230.29, 230.8, 225.51, 216.39, 209.89, 210.94, 202.52, 195.88, 185.95, 196.83], '1Y': [137.78, 142.32, 143.19, 143.79, 138.65, 140.36, 149.83, 149.5, 179.19, 173.5, 163.09, 162.04, 163.75, 174.3, 178.19, 181.96, 191.38, 197.37, 207.72, 204.03, 213.61, 193.55, 178.31, 169.81, 174.93, 178.75, 174.37, 178.41, 174.36, 192.24, 204.08, 206.33, 216.3, 190.1, 198.5, 209.07, 207.24, 195.5, 197.82, 210.12, 205.09, 214.98, 229.57, 235.78, 223.15, 216.39, 209.89, 210.94, 202.52, 195.88, 185.95, 196.83] },
      velocityScore: { '1D': 2.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 52.3, revenueGrowth: 26, eps: 3.76, grossMargin: 23, dividendYield: 0.53,
      etfPresence: { AIRR: 3.08, PRN: false, RSHO: false, IDEF: 1.67, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 2, avgWeight: 2.11, proScore: 0.84, coverage: 0.4,
      price: 31.86, weeklyPrices: [32.74, 31.17, 30.72, 34.17, 31.86], weeklyChange: -2.7, sortRank: 0, periodReturns: { '1M': -21.7, '6M': 74.6, '1Y': 483.4 },
      priceHistory: { '1W': [32.74, 31.17, 30.72, 34.17, 31.86], '1M': [40.68, 40.74, 43.04, 41.62, 41.61, 42.66, 42.48, 44.35, 48.32, 50.48, 51.4, 51.14, 46.46, 48.09, 43.13, 32.22, 32.74, 31.17, 30.72, 34.17, 31.86], '6M': [18.24, 19.18, 19.87, 21.84, 25.32, 26.38, 27.88, 21.77, 21.65, 25.11, 25.6, 24.59, 24.97, 24.81, 35.37, 30.71, 34.23, 39.89, 38.29, 36.97, 35.24, 43.04, 42.48, 51.14, 32.22, 31.86], '1Y': [5.46, 5.03, 6.07, 6.83, 6.2, 7.03, 6.36, 6.18, 6.4, 6.78, 6.8, 7.09, 9.66, 9.86, 11.11, 12.79, 15.24, 15.25, 13.56, 13.31, 13.45, 12.81, 11.4, 11.16, 11.7, 12.95, 18.05, 20.6, 19.74, 22.61, 26.73, 26.06, 27.88, 21.77, 21.65, 25.11, 25.6, 24.59, 24.97, 26.96, 32.4, 35.88, 34.67, 38.48, 35.44, 36.97, 35.24, 43.04, 42.48, 51.14, 32.22, 31.86] },
      velocityScore: { '1D': 3.7, '1W': -27, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: null, revenueGrowth: 42, eps: -1.16, grossMargin: 56, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 3.75, RSHO: false, IDEF: 0.47, BILT: false },
      tonyNote: 'Planet Labs is a satellite earth observation company. It holds a speculative position in Industrials ETFs as a data infrastructure name — providing satellite imagery and analytics that support agricultural, energy, and government decision-making. Revenue is growing from a small base; the ETF weight is minimal and the position is thematic.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 2.04, proScore: 0.82, coverage: 0.4,
      price: 58.5, weeklyPrices: [57.73, 56.19, 54.82, 58.78, 58.50], weeklyChange: 1.33, sortRank: 0, periodReturns: { '1M': 2, '6M': -23, '1Y': 41.9 },
      priceHistory: { '1W': [57.73, 56.19, 54.82, 58.78, 58.5], '1M': [57.33, 52.49, 54.85, 52.09, 54.22, 55.82, 54.67, 56.18, 56.8, 57.3, 65.19, 64.13, 63.49, 63.27, 58.43, 58.52, 57.73, 56.19, 54.82, 58.78, 58.5], '6M': [75.96, 75.39, 77.47, 91.93, 119.72, 120.59, 112.67, 91.33, 87.78, 105.67, 92.14, 85.54, 89.46, 93.04, 79.98, 67.7, 68.33, 74.41, 65.52, 63.05, 57, 54.85, 54.67, 64.13, 58.52, 58.5], '1Y': [41.24, 43.11, 45.84, 44.78, 51.99, 58.78, 59.36, 56.71, 63.88, 68.5, 66.71, 65.84, 64.14, 70.74, 80.72, 88.08, 100.25, 96.28, 86.65, 90.68, 90.6, 77.88, 72.45, 69.14, 73.21, 77.03, 74.26, 81.53, 75.98, 91.44, 121.5, 113.85, 112.67, 91.33, 87.78, 105.67, 92.14, 85.54, 89.46, 92.78, 75.86, 67.31, 70.34, 70.99, 61.26, 63.05, 57, 54.85, 54.67, 64.13, 58.52, 58.5] },
      velocityScore: { '1D': 2.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 344.1, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.97, PRN: false, RSHO: false, IDEF: 1.12, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.91, proScore: 0.76, coverage: 0.4,
      price: 300.68, weeklyPrices: [292.26, 297.52, 289.13, 300.95, 300.68], weeklyChange: 2.88, sortRank: 0, periodReturns: { '1M': -9.9, '6M': -8, '1Y': 31.2 },
      priceHistory: { '1W': [292.26, 297.52, 289.13, 300.95, 300.68], '1M': [333.56, 334.22, 336.95, 326.17, 329.35, 321.92, 317.55, 320.63, 320.95, 317.56, 320.9, 308.17, 296.41, 293.66, 287.54, 293.04, 292.26, 297.52, 289.13, 300.95, 300.68], '6M': [326.92, 336.64, 345.73, 367.6, 411.66, 422.68, 425.39, 413.14, 392.7, 443.14, 443, 421.17, 414.56, 427.99, 402.56, 393.32, 403.37, 396.17, 370.14, 364.29, 314.72, 336.95, 317.55, 308.17, 293.04, 300.68], '1Y': [229.12, 234.54, 238.65, 253.53, 258.5, 252.93, 262.49, 269.83, 264.69, 266.25, 269.98, 270.79, 269.94, 273.02, 276.16, 279.53, 288.49, 287.9, 285.77, 301.69, 322.02, 309.56, 313.97, 305.49, 306.65, 315.88, 329.16, 353.52, 341.98, 356.45, 415.39, 424.14, 425.39, 413.14, 392.7, 443.14, 443, 421.17, 414.56, 418.42, 384.79, 396.62, 394.41, 394.81, 359.29, 364.29, 314.72, 336.95, 317.55, 308.17, 293.04, 300.68] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 19.6, revenueGrowth: 13, eps: 15.38, grossMargin: 12, dividendYield: 1.83,
      etfPresence: { AIRR: 2.73, PRN: false, RSHO: false, IDEF: 1.08, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'WMB', name: 'WMB', easyScore: 2, avgWeight: 1.38, proScore: 0.55, coverage: 0.4,
      price: 72.91, weeklyPrices: [71.59, 71.59, 72.26, 71.62, 72.91], weeklyChange: 1.84, sortRank: 0, periodReturns: { '1M': -2.4, '6M': 22, '1Y': 21.4 },
      priceHistory: { '1W': [71.59, 71.59, 72.26, 71.62, 72.91], '1M': [74.73, 75.71, 77.69, 77.72, 77.69, 77.88, 77.52, 78.47, 76.34, 74.37, 73.13, 71.39, 70.04, 71.31, 71.66, 71.96, 71.59, 71.59, 72.26, 71.62, 72.91], '6M': [59.74, 58.26, 59.8, 59.5, 60.49, 63.18, 66.92, 66.46, 71.12, 72.17, 74.77, 74.77, 73.52, 72.8, 73.81, 71.83, 72.82, 70.86, 71.65, 76.31, 72.95, 77.69, 77.52, 71.39, 71.96, 72.91], '1Y': [60.08, 60.49, 62.67, 58.48, 59.04, 57.68, 57.51, 60.27, 57.89, 57.46, 57.07, 57.88, 56.85, 58.4, 60.16, 63.97, 63.58, 62.68, 63.06, 57.67, 57.87, 59.58, 60.99, 59.61, 61.44, 61.95, 59.48, 58.92, 60.16, 60.39, 60.71, 63.72, 66.92, 66.46, 71.12, 72.17, 74.77, 74.77, 73.52, 74.06, 74.06, 72, 72.74, 71.15, 72.18, 76.31, 72.95, 77.69, 77.52, 71.39, 71.96, 72.91] },
      velocityScore: { '1D': -1.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$89B', pe: 32, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.93,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.95, IDEF: false, BILT: 1.81 },
      tonyNote: 'WMB appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.17, proScore: 0.47, coverage: 0.4,
      price: 119.5, weeklyPrices: [110.94, 108.82, 106.81, 119.32, 119.50], weeklyChange: 7.72, sortRank: 0, periodReturns: { '1M': 29.4, '6M': 60.4, '1Y': 131.7 },
      priceHistory: { '1W': [110.94, 108.82, 106.81, 119.32, 119.5], '1M': [92.32, 92.5, 94.55, 92.03, 93.39, 94.81, 96.36, 98.55, 99.32, 97.11, 108.11, 111.7, 111.28, 112.87, 111.59, 111.27, 110.94, 108.82, 106.81, 119.32, 119.5], '6M': [74.49, 69.65, 74.93, 84.25, 99.14, 99.57, 100.02, 77.12, 80.33, 89.86, 89.58, 84.96, 81.44, 78.97, 78.71, 74.75, 79.23, 84.91, 78.91, 78.91, 88.06, 94.55, 96.36, 111.7, 111.27, 119.5], '1Y': [51.57, 50.77, 53.41, 51.45, 51.27, 52.37, 52.76, 52.17, 52.83, 66.7, 66.83, 67.55, 68.68, 72.81, 76.57, 75.28, 84, 76.69, 77.04, 78.55, 77.41, 74.07, 70.85, 66.68, 66.8, 71.94, 74.49, 73.51, 73.85, 84.8, 98.62, 99.48, 100.02, 77.12, 80.33, 89.86, 89.58, 84.96, 81.44, 77.81, 76.16, 74.22, 79.6, 84.05, 77.99, 78.91, 88.06, 94.55, 96.36, 111.7, 111.27, 119.5] },
      velocityScore: { '1D': 9.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.26, PRN: false, RSHO: false, IDEF: 1.08, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.15, proScore: 0.46, coverage: 0.4,
      price: 602.83, weeklyPrices: [590.97, 592.41, 576.74, 607.46, 602.83], weeklyChange: 2.01, sortRank: 0, periodReturns: { '1M': -1.7, '6M': 31, '1Y': 62.2 },
      priceHistory: { '1W': [590.97, 592.41, 576.74, 607.46, 602.83], '1M': [613.1, 618.91, 611.93, 569.06, 551.12, 571.05, 566.96, 559.95, 584.4, 577.42, 577.83, 571.96, 566.14, 578.34, 584.18, 590.09, 590.97, 592.41, 576.74, 607.46, 602.83], '6M': [460.17, 451.06, 456.9, 475.7, 489.97, 504.71, 508.95, 516.78, 550.53, 551.42, 576.5, 566.06, 547.31, 547.81, 561.66, 551.99, 595.11, 571.61, 601.39, 599.09, 611.54, 611.93, 566.96, 571.96, 590.09, 602.83], '1Y': [371.75, 372.5, 381.36, 386.98, 376.71, 391.98, 385.62, 399.8, 398.07, 394.75, 401.56, 389.96, 381.97, 382.27, 383.5, 384.3, 374.45, 380.76, 387.73, 411.08, 428.53, 434.25, 432.04, 426.16, 441.76, 443.51, 462.59, 459.83, 452.89, 467.37, 489.33, 504.99, 508.95, 516.78, 550.53, 551.42, 576.5, 566.06, 547.31, 540.83, 548.95, 548.11, 598.3, 589.77, 589.51, 599.09, 611.54, 611.93, 566.96, 571.96, 590.09, 602.83] },
      velocityScore: { '1D': 2.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 66.2, revenueGrowth: 18, eps: 9.11, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.81, PRN: false, RSHO: false, IDEF: 0.48, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 1.06, proScore: 0.43, coverage: 0.4,
      price: 47.82, weeklyPrices: [49.64, 48.37, 45.87, 49.58, 47.82], weeklyChange: -3.67, sortRank: 0, periodReturns: { '1M': -23.5, '6M': -30.1, '1Y': 0.7 },
      priceHistory: { '1W': [49.64, 48.37, 45.87, 49.58, 47.82], '1M': [62.48, 67.28, 66.02, 62.77, 66.21, 65.76, 65.3, 64.1, 60.66, 63.52, 65.86, 57.5, 53.65, 54.65, 51.84, 49.44, 49.64, 48.37, 45.87, 49.58, 47.82], '6M': [68.44, 71.65, 77.57, 90.41, 107.49, 104.79, 115.29, 97.94, 79.52, 88.46, 88.31, 97.14, 98.98, 101.43, 99.6, 82.69, 84.22, 87.91, 76.6, 67.98, 60.45, 66.02, 65.3, 57.5, 49.44, 47.82], '1Y': [47.47, 46.24, 50.47, 45.24, 49.41, 56.22, 50.29, 50.22, 45.78, 50.6, 52.24, 53.41, 62.36, 63.8, 67.23, 71.35, 74.22, 79.07, 78.25, 83.87, 84.24, 70.68, 60.25, 60.07, 63.71, 66.06, 68.06, 78.87, 74.62, 91.72, 108.01, 111.61, 115.29, 97.94, 79.52, 88.46, 88.31, 97.14, 98.98, 105.95, 86.01, 85.83, 82.52, 83.58, 70.22, 67.98, 60.45, 66.02, 65.3, 57.5, 49.44, 47.82] },
      velocityScore: { '1D': 4.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 207.9, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.94, PRN: false, RSHO: false, IDEF: 0.19, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.63, proScore: 0.25, coverage: 0.4,
      price: 49.2, weeklyPrices: [46.55, 47.35, 46.11, 49.69, 49.20], weeklyChange: 5.69, sortRank: 0, periodReturns: { '1M': 14.8, '6M': 42.8, '1Y': 8.6 },
      priceHistory: { '1W': [46.55, 47.35, 46.11, 49.69, 49.2], '1M': [42.87, 42.5, 42.86, 41.5, 42.84, 44.56, 44.55, 44.92, 45.8, 45.35, 48.41, 48.76, 47.96, 47.39, 45.61, 46.15, 46.55, 47.35, 46.11, 49.69, 49.2], '6M': [34.46, 33.64, 34.13, 37.46, 40.85, 41.46, 42.47, 38.31, 37.87, 41.07, 43.34, 45.82, 45.91, 46.44, 46.32, 45.86, 47.1, 44.94, 41.41, 40.63, 41.44, 42.86, 44.55, 48.76, 46.15, 49.2], '1Y': [45.29, 44, 45.04, 47.16, 47.97, 46.79, 48.08, 41.67, 41.49, 41.67, 41.19, 41.66, 41.05, 42.02, 42.88, 43.76, 45.29, 43.67, 39.91, 41.31, 36.56, 35.33, 34.84, 33.24, 33.24, 33.92, 33.68, 34.77, 34.09, 37.2, 41.42, 41.28, 42.47, 38.31, 37.87, 41.07, 43.34, 45.82, 45.91, 45.48, 46.53, 46.3, 46.06, 44.57, 39.98, 40.63, 41.44, 42.86, 44.55, 48.76, 46.15, 49.2] },
      velocityScore: { '1D': 4.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 46, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.72,
      etfPresence: { AIRR: 0.93, PRN: false, RSHO: false, IDEF: 0.33, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.34, proScore: 0.14, coverage: 0.4,
      price: 75.69, weeklyPrices: [72.13, 71.48, 68.72, 73.61, 75.69], weeklyChange: 4.94, sortRank: 0, periodReturns: { '1M': -8.5, '6M': 12.4, '1Y': 77.2 },
      priceHistory: { '1W': [72.13, 71.48, 68.72, 73.61, 75.69], '1M': [82.69, 80.64, 83.01, 79.49, 75.43, 76.99, 74.88, 72.76, 74.67, 74.47, 73.27, 71.49, 74.26, 74.29, 72.26, 70.53, 72.13, 71.48, 68.72, 73.61, 75.69], '6M': [67.34, 69.99, 68.66, 71.14, 73.54, 75.27, 79.38, 78.83, 85.07, 84.9, 89.38, 71.12, 69.2, 71.21, 78.37, 78.71, 81.5, 84.39, 86.48, 92.92, 81.96, 83.01, 74.88, 71.49, 70.53, 75.69], '1Y': [42.72, 42.46, 46.85, 47.99, 49.51, 48.97, 47.63, 45.65, 56.41, 56.75, 58.43, 58.94, 61.83, 64.22, 66.81, 65.43, 62.84, 62.26, 67.11, 68.72, 67.36, 62.94, 59.08, 60.94, 66.43, 68.6, 67.81, 69.57, 67.92, 71.09, 73.89, 76.79, 79.38, 78.83, 85.07, 84.9, 89.38, 71.12, 69.2, 72.31, 76.24, 77.3, 83.35, 84.22, 86.76, 92.92, 81.96, 83.01, 74.88, 71.49, 70.53, 75.69] },
      velocityScore: { '1D': 7.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 51.8, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.33,
      etfPresence: { AIRR: 0.65, PRN: false, RSHO: false, IDEF: 0.03, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'Timken Company', easyScore: 1, avgWeight: 9.3, proScore: 1.86, coverage: 0.2,
      price: 137.78, weeklyPrices: [134.67, 137.09, 132.39, 137.40, 137.78], weeklyChange: 2.31, sortRank: 0, periodReturns: { '1M': 17.6, '6M': 57.7, '1Y': 91.2 },
      priceHistory: { '1W': [134.67, 137.09, 132.39, 137.4, 137.78], '1M': [117.12, 115.74, 116.74, 114.49, 112.73, 117.2, 118.93, 119.95, 127.42, 127.16, 126.78, 127.98, 126.54, 131.9, 131.82, 131.83, 134.67, 137.09, 132.39, 137.4, 137.78], '6M': [87.38, 85.26, 86.33, 90.95, 91.68, 93.89, 93.4, 98.99, 108.82, 107.11, 109.88, 103.05, 99.7, 98.23, 101.9, 102.06, 106.92, 103.92, 108.7, 110.89, 116.34, 116.74, 118.93, 127.98, 131.83, 137.78], '1Y': [72.06, 70.56, 73.21, 75.52, 77.3, 78.63, 81.69, 73.5, 74.39, 76, 78.99, 77.23, 77.15, 77.38, 76.84, 75.23, 76.76, 72.55, 75.1, 77.3, 78.51, 78.99, 76.41, 77.48, 79.95, 83.44, 87.01, 86.34, 85.81, 88.05, 91.91, 94.6, 93.4, 98.99, 108.82, 107.11, 109.88, 103.05, 99.7, 97.44, 99.06, 98.92, 106.75, 107.66, 107.2, 110.89, 116.34, 116.74, 118.93, 127.98, 131.83, 137.78] },
      velocityScore: { '1D': 2.2, '1W': 3.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 31.3, revenueGrowth: 8, eps: 4.4, grossMargin: 31, dividendYield: 1.05,
      etfPresence: { AIRR: false, PRN: false, RSHO: 9.3, IDEF: false, BILT: false },
      tonyNote: 'Timken Company appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 9.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 7.95, proScore: 1.59, coverage: 0.2,
      price: 184.19, weeklyPrices: [178.66, 181.56, 177.41, 184.21, 184.19], weeklyChange: 3.1, sortRank: 0, periodReturns: { '1M': 3, '6M': 3.1, '1Y': 30.6 },
      priceHistory: { '1W': [178.66, 181.56, 177.41, 184.21, 184.19], '1M': [178.89, 178.11, 175.68, 171.18, 175.95, 174.85, 175.98, 177.01, 178.97, 176.59, 178.96, 179.66, 174.41, 174.26, 172.55, 180.99, 178.66, 181.56, 177.41, 184.21, 184.19], '6M': [178.66, 182.01, 184.42, 190.4, 194.08, 197.5, 199.46, 196.74, 196.51, 205.41, 197.63, 203.86, 203.04, 204.56, 195, 194.72, 203.19, 195.85, 179.3, 176.07, 176.78, 175.68, 175.98, 179.66, 180.99, 184.19], '1Y': [140.98, 146.64, 144.66, 145.92, 149.28, 151.56, 156.07, 156.81, 154.86, 154.09, 156.24, 158.6, 154.22, 158.37, 159.43, 163.63, 168.8, 158.85, 160.71, 179.24, 178.5, 176.97, 175.57, 169.68, 168.02, 171.52, 182.11, 185.68, 184.01, 185.73, 198.84, 196.34, 199.46, 196.74, 196.51, 205.41, 197.63, 203.86, 203.04, 200.73, 192.85, 196.21, 201.56, 196.42, 174.26, 176.07, 176.78, 175.68, 175.98, 179.66, 180.99, 184.19] },
      velocityScore: { '1D': 0.6, '1W': 6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$248B', pe: 34.6, revenueGrowth: 9, eps: 5.32, grossMargin: 20, dividendYield: 1.5,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 7.95, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.42, proScore: 4.42, coverage: 1,
      price: 236.35, weeklyPrices: [218.00, 220.12, 211.69, 222.24, 236.35], weeklyChange: 8.42, sortRank: 0, periodReturns: { '1M': 32, '6M': 169.5, '1Y': 370.1 },
      priceHistory: { '1W': [218, 220.12, 211.69, 222.24, 236.35], '1M': [179.11, 207.27, 221.15, 219.94, 199.86, 191.82, 219.93, 214.77, 208.06, 208.37, 226.34, 231.09, 264.51, 260.58, 251.68, 227.81, 218, 220.12, 211.69, 222.24, 236.35], '6M': [87.69, 89.46, 86.04, 100.24, 105.43, 98.87, 100.43, 82.39, 88.61, 107.61, 104.88, 95.65, 108.04, 118.56, 115.09, 101.95, 136.33, 165.34, 157.08, 138.23, 184.77, 221.15, 219.93, 231.09, 227.81, 236.35], '1Y': [50.28, 47.97, 51.84, 47.84, 51.95, 52.37, 52.75, 52, 68.78, 71.62, 68.98, 68.32, 64.06, 90.96, 106.6, 110.22, 124.94, 135.46, 109, 125.43, 130.82, 111.28, 83.54, 83.26, 100.15, 100.33, 81.14, 93.23, 85.17, 96.21, 101.98, 96.85, 100.43, 82.39, 88.61, 107.61, 104.88, 95.65, 108.04, 121.52, 105.97, 108.82, 144.97, 157.14, 147.16, 138.23, 184.77, 221.15, 219.93, 231.09, 227.81, 236.35] },
      velocityScore: { '1D': -2, '1W': -8.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$60B', pe: 90.9, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 3.03, MEME: 5.37, RKNG: 4.87 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 3, avgWeight: 3.82, proScore: 3.82, coverage: 1,
      price: 86.7, weeklyPrices: [92.06, 88.71, 87.32, 97.56, 86.70], weeklyChange: -5.82, sortRank: 0, periodReturns: { '1M': 18.8, '6M': 13, '1Y': 134.8 },
      priceHistory: { '1W': [92.06, 88.71, 87.32, 97.56, 86.7], '1M': [72.96, 74.81, 83.01, 83.67, 86.83, 89.58, 96.23, 105.86, 119.7, 129.6, 133.09, 113.41, 105.65, 118.17, 107.73, 93.6, 92.06, 88.71, 87.32, 97.56, 86.7], '6M': [76.7, 75.84, 71.47, 97.49, 92.72, 103.5, 121.23, 103.5, 96.92, 86.4, 85.76, 93.86, 87.09, 90.74, 96.06, 83.99, 91.61, 90.94, 78.75, 73.9, 65.35, 83.01, 96.23, 113.41, 93.6, 86.7], '1Y': [36.92, 45.94, 49.36, 45.69, 47.86, 56.67, 54.22, 52.46, 46.63, 48.08, 47.07, 48.94, 40.77, 40.97, 48.85, 48.84, 72.9, 90.5, 82.81, 79.45, 80.25, 69.19, 61.4, 51.37, 52.61, 74, 67.81, 86.48, 74.68, 85.73, 95.22, 116.37, 121.23, 103.5, 96.92, 86.4, 85.76, 93.86, 87.09, 94.09, 87.86, 92.62, 94.9, 85.53, 76.4, 73.9, 65.35, 83.01, 96.23, 113.41, 93.6, 86.7] },
      velocityScore: { '1D': 92, '1W': -4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$34B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 3.26, MEME: 5.63, RKNG: 2.57 },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 3, avgWeight: 3.79, proScore: 3.79, coverage: 1,
      price: 44.45, weeklyPrices: [40.94, 41.91, 38.92, 41.47, 44.45], weeklyChange: 8.56, sortRank: 0, periodReturns: { '1M': 1.2, '6M': 59.5, '1Y': 255.3 },
      priceHistory: { '1W': [40.94, 41.91, 38.92, 41.47, 44.45], '1M': [43.93, 45.48, 46.71, 42.56, 39.14, 39.52, 48.02, 45.87, 45.14, 48.98, 49.65, 47.28, 47.94, 47.86, 44.71, 39.62, 40.94, 41.91, 38.92, 41.47, 44.45], '6M': [27.86, 27.85, 24.81, 30.26, 36.71, 35.06, 40.22, 31.54, 36.6, 31.53, 28.65, 28.09, 27.48, 26.65, 28.37, 24.49, 25.57, 30.09, 36.35, 34.25, 41.53, 46.71, 48.02, 47.28, 39.62, 44.45], '1Y': [12.51, 10.33, 10.38, 9.66, 9.52, 11.09, 10.58, 12.52, 14.2, 14.09, 16.05, 15.98, 13.91, 19.35, 24.45, 22.15, 27.71, 34.24, 35.9, 34.35, 34.66, 30.98, 23.65, 21.09, 28.21, 32.11, 22.98, 27.78, 24.08, 29.56, 36.1, 34.74, 40.22, 31.54, 36.6, 31.53, 28.65, 28.09, 27.48, 26.7, 25.72, 24.56, 26.26, 31.53, 34.98, 34.25, 41.53, 46.71, 48.02, 47.28, 39.62, 44.45] },
      velocityScore: { '1D': -0.8, '1W': 3.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.35, MEME: 5.19, RKNG: 3.84 },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab', easyScore: 3, avgWeight: 3.58, proScore: 3.58, coverage: 1,
      price: 106.6, weeklyPrices: [113.65, 108.23, 105.05, 114.78, 106.60], weeklyChange: -6.2, sortRank: 0, periodReturns: { '1M': -9.3, '6M': 73.4, '1Y': 303.8 },
      priceHistory: { '1W': [113.65, 108.23, 105.05, 114.78, 106.6], '1M': [117.56, 124.15, 132.55, 124.77, 131.16, 134.28, 125.45, 135.76, 143.2, 150.23, 148.03, 143.48, 122.39, 123.32, 114.7, 110.08, 113.65, 108.23, 105.05, 114.78, 106.6], '6M': [61.49, 70.52, 70.12, 86.03, 86.58, 87.82, 88.57, 73.11, 69.62, 76.58, 72.65, 70, 68.37, 69.48, 72.88, 65.52, 66.74, 82.93, 84.6, 82.51, 78.58, 132.55, 125.45, 143.48, 110.08, 106.6], '1Y': [26.4, 30.04, 35.38, 38.88, 43.21, 47.19, 45.11, 44.81, 44.69, 44.27, 44.38, 48.6, 47.73, 54.04, 49.81, 47.01, 58.5, 65.42, 67.35, 65.62, 62.98, 51.64, 45.54, 40.3, 40.37, 51.56, 55.41, 77.55, 70.45, 84.08, 91.8, 87.98, 88.57, 73.11, 69.62, 76.58, 72.65, 70, 68.37, 71.93, 65.94, 67.73, 68.05, 84.8, 79.68, 82.51, 78.58, 132.55, 125.45, 143.48, 110.08, 106.6] },
      velocityScore: { '1D': -0.8, '1W': 6.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$67B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 1.91, MEME: 4.87, RKNG: 3.95 },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 5.99, proScore: 3.99, coverage: 0.667,
      price: 1987.07, weeklyPrices: [1642.00, 1646.54, 1643.23, 1881.51, 1987.07], weeklyChange: 21.02, sortRank: 0, periodReturns: { '1M': 36.8, '6M': 863.8, '1Y': 4711.3 },
      priceHistory: { '1W': [1642, 1646.54, 1643.23, 1881.51, 1987.07], '1M': [1452.02, 1447.23, 1382.72, 1407.61, 1333.01, 1392.56, 1542.24, 1478.69, 1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1987.07], '6M': [206.18, 237.61, 244.25, 349.63, 389.81, 501.29, 527.63, 584.55, 599.34, 621.09, 651.9, 565.59, 618.82, 753.69, 677.86, 692.73, 851.57, 919.47, 932.43, 1096.51, 1339.96, 1382.72, 1542.24, 1694.98, 1559.32, 1987.07], '1Y': [41.3, 46.58, 47.15, 45.22, 42.48, 41.61, 41.89, 41.33, 44.34, 44.54, 46.37, 52.47, 70.5, 90.09, 102.92, 113.5, 121.17, 134.61, 148.04, 176.49, 199.33, 239.48, 254.16, 200.27, 210.17, 225.47, 201.87, 241.05, 240.22, 353.56, 387.81, 503.44, 527.63, 584.55, 599.34, 621.09, 651.9, 565.59, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 989.9, 1096.51, 1339.96, 1382.72, 1542.24, 1694.98, 1559.32, 1987.07] },
      velocityScore: { '1D': 3.9, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$294B', pe: 67.7, revenueGrowth: 251, eps: 29.35, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.74, RKNG: 6.23 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 2, avgWeight: 5.39, proScore: 3.6, coverage: 0.667,
      price: 171.31, weeklyPrices: [196.64, 162.88, 175.13, 172.78, 171.31], weeklyChange: -12.88, sortRank: 0, periodReturns: { '1M': -9, '6M': 434.3, '1Y': 912.5 },
      priceHistory: { '1W': [196.64, 162.88, 175.13, 172.78, 171.31], '1M': [188.28, 223.1, 203.57, 190.36, 173.26, 165.26, 176.81, 181.49, 177.62, 179.83, 169.02, 158.41, 185.67, 202.37, 184.07, 177, 196.64, 162.88, 175.13, 172.78, 171.31], '6M': [32.06, 31.32, 36.75, 38.61, 34.18, 38.38, 45.23, 39.9, 48.4, 46.98, 53.69, 101.14, 106.19, 92.63, 114.41, 86.35, 133.3, 157.32, 137.73, 164.36, 157.55, 203.57, 176.81, 158.41, 177, 171.31], '1Y': [16.92, 23.45, 26.22, 26.44, 29.5, 28.23, 25.22, 21.53, 21.59, 22.36, 24.79, 24.2, 23.63, 29.56, 30.54, 25.94, 33.79, 29.1, 34.14, 37.22, 35.56, 28.57, 21.47, 20.58, 26.53, 27.84, 29.9, 39.1, 36.02, 38.06, 34.47, 38.15, 45.23, 39.9, 48.4, 46.98, 53.69, 101.14, 106.19, 101.92, 97.42, 103.91, 150.6, 159.42, 162.17, 164.36, 157.55, 203.57, 176.81, 158.41, 177, 171.31] },
      velocityScore: { '1D': 2.3, '1W': -17.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$14B', pe: null, revenueGrowth: 51, eps: -0.66, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.62, RKNG: 4.17 },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'NVTS', name: 'Navitas Semiconductor', easyScore: 2, avgWeight: 4.82, proScore: 3.21, coverage: 0.667,
      price: 24.24, weeklyPrices: [24.48, 22.85, 20.50, 22.21, 24.24], weeklyChange: -0.98, sortRank: 0, periodReturns: { '1M': 25.9, '6M': 182.2, '1Y': 210.4 },
      priceHistory: { '1W': [24.48, 22.85, 20.5, 22.21, 24.24], '1M': [19.25, 21.17, 22.32, 21.32, 19.67, 22.99, 24.38, 29.25, 31.79, 28.88, 28.51, 26.6, 24.86, 25.86, 30.84, 25.08, 24.48, 22.85, 20.5, 22.21, 24.24], '6M': [8.59, 7.81, 7.21, 10.19, 9.45, 9.76, 10.19, 8.2, 8.76, 8.08, 9.51, 8.96, 9.98, 9.06, 9.48, 8.54, 9.42, 12.37, 18.51, 16.5, 15.79, 22.32, 24.38, 26.6, 25.08, 24.24], '1Y': [7.81, 7.01, 6.67, 6.15, 5.87, 8.47, 8.56, 7.96, 6.66, 6.92, 6.43, 5.86, 5.61, 6.11, 7.16, 7.19, 8.13, 9.97, 17.1, 13.91, 13.46, 7.84, 8.11, 7.56, 8.3, 9.6, 7.96, 7.9, 7.24, 10.31, 10.04, 11.29, 10.19, 8.2, 8.76, 8.08, 9.51, 8.96, 9.98, 9.17, 9.02, 8.8, 9.54, 12.32, 17.28, 16.5, 15.79, 22.32, 24.38, 26.6, 25.08, 24.24] },
      velocityScore: { '1D': -8.8, '1W': -13.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.03, RKNG: 5.61 },
      tonyNote: 'Navitas Semiconductor is a small-cap wide-bandgap power semiconductor name — gallium nitride and silicon carbide for fast charging and EV applications. The $26.60 share price and small market cap position it as a speculative holding in ETFs willing to take higher-risk bets on next-generation power conversion.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 4.61, proScore: 3.07, coverage: 0.667,
      price: 1000.06, weeklyPrices: [949.28, 935.89, 891.88, 995.87, 1000.06], weeklyChange: 5.35, sortRank: 0, periodReturns: { '1M': 30.5, '6M': 314.7, '1Y': 760.8 },
      priceHistory: { '1W': [949.28, 935.89, 891.88, 995.87, 1000.06], '1M': [766.58, 803.63, 776.01, 724.66, 681.54, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 864.01, 949.28, 935.89, 891.88, 995.87, 1000.06], '6M': [241.14, 265.92, 294.37, 343.43, 338.13, 389.11, 435.28, 379.4, 410.34, 417.35, 415.56, 397.05, 405.35, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 776.01, 762.1, 971, 864.01, 1000.06], '1Y': [116.18, 123.6, 124.76, 119.92, 118.61, 113.23, 111.25, 104.88, 118.89, 120.87, 117.68, 119.01, 131.46, 157.77, 164.62, 163.9, 190.96, 192.77, 206.77, 220.1, 223.77, 237.92, 246.83, 207.37, 240.46, 246.92, 237.5, 276.59, 292.63, 339.55, 333.35, 397.58, 435.28, 379.4, 410.34, 417.35, 415.56, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 517.16, 646.63, 776.01, 762.1, 971, 864.01, 1000.06] },
      velocityScore: { '1D': 5.1, '1W': -1.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 47.2, revenueGrowth: 196, eps: 21.21, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { BUZZ: 3.68, MEME: false, RKNG: 5.53 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 2, avgWeight: 4.54, proScore: 3.02, coverage: 0.667,
      price: 254.29, weeklyPrices: [222.27, 234.32, 237.68, 264.76, 254.29], weeklyChange: 14.41, sortRank: 0, periodReturns: { '1M': 28.1, '6M': 76.7, '1Y': 242.1 },
      priceHistory: { '1W': [222.27, 234.32, 237.68, 264.76, 254.29], '1M': [198.57, 189.36, 184.54, 172.17, 156.27, 182.98, 193.39, 218.41, 221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 206.89, 222.27, 234.32, 237.68, 264.76, 254.29], '6M': [143.91, 150.13, 144.7, 132.95, 161.38, 139.16, 129.66, 96.95, 128.4, 130.66, 114.48, 114.74, 111.57, 101.72, 103.91, 95.92, 107.93, 158.93, 185.54, 174.01, 188.29, 184.54, 193.39, 236.03, 206.89, 254.29], '1Y': [74.34, 85.51, 93.49, 92.73, 98.7, 95.74, 107.95, 107.56, 120.41, 116.74, 114.04, 123.06, 147.53, 163.98, 164.1, 146.01, 147.42, 149.9, 151.66, 154.96, 187.62, 163.61, 145.52, 133.49, 171.13, 178.94, 142.02, 149.94, 144.92, 141, 156.84, 135.1, 129.66, 96.95, 128.4, 130.66, 114.48, 114.74, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 174.01, 188.29, 184.54, 193.39, 236.03, 206.89, 254.29] },
      velocityScore: { '1D': 8.6, '1W': 123.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$47B', pe: 139, revenueGrowth: 157, eps: 1.83, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.1, RKNG: 4.97 },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 2, avgWeight: 4.14, proScore: 2.76, coverage: 0.667,
      price: 60.8, weeklyPrices: [59.19, 54.02, 51.52, 56.71, 60.80], weeklyChange: 2.73, sortRank: 0, periodReturns: { '1M': 7.5, '6M': 51.5, '1Y': 497.9 },
      priceHistory: { '1W': [59.19, 54.02, 51.52, 56.71, 60.8], '1M': [56.56, 55.17, 58.4, 52.94, 50.46, 52.71, 58.06, 56.83, 59.78, 67.84, 64.05, 63.54, 65.33, 66.6, 65.48, 54.35, 59.19, 54.02, 51.52, 56.71, 60.8], '6M': [40.13, 39.92, 39.41, 45.91, 52.99, 53.48, 62.94, 44.94, 42.67, 43.29, 44.24, 40.13, 41.37, 42.21, 41.43, 34.09, 37.06, 47.7, 52.02, 45.51, 56.85, 58.4, 58.06, 63.54, 54.35, 60.8], '1Y': [10.17, 10.47, 14, 16.95, 17.28, 18.15, 16.58, 15.4, 18.45, 19.69, 21.43, 26.48, 26.19, 37.14, 41.9, 45.93, 57.75, 64.14, 59.22, 64.99, 60.75, 62.38, 46.37, 42.26, 48.49, 46.34, 35.48, 42.04, 38.3, 43.63, 52.88, 52.26, 62.94, 44.94, 42.67, 43.29, 44.24, 40.13, 41.37, 41.66, 37.45, 34.77, 39.32, 48.12, 50.64, 45.51, 56.85, 58.4, 58.06, 63.54, 54.35, 60.8] },
      velocityScore: { '1D': -29, '1W': -32, '1M': null, '6M': null }, isNew: false,
      marketCap: '$22B', pe: 79, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 2.82, MEME: 5.46, RKNG: false },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'ONDS', name: 'Ondas Holdings', easyScore: 2, avgWeight: 3.55, proScore: 2.37, coverage: 0.667,
      price: 9.53, weeklyPrices: [10.30, 9.65, 9.31, 9.83, 9.53], weeklyChange: -7.48, sortRank: 0, periodReturns: { '1M': 5.4, '6M': 8.9, '1Y': 457.3 },
      priceHistory: { '1W': [10.3, 9.65, 9.31, 9.83, 9.53], '1M': [9.04, 8.86, 11.21, 10.62, 9.7, 9.36, 9.18, 9.06, 9.77, 10.8, 13.25, 13.22, 13.46, 13.58, 11.61, 10.43, 10.3, 9.65, 9.31, 9.83, 9.53], '6M': [8.75, 9.22, 8.46, 12.84, 13.89, 12.55, 12.27, 9.68, 9.23, 11.39, 10.45, 10.49, 10.33, 10.83, 10.31, 8.81, 9.14, 10.2, 10.54, 10.04, 8.89, 11.21, 9.18, 13.22, 10.43, 9.53], '1Y': [1.71, 1.58, 1.83, 1.75, 2.31, 2.25, 2, 2.2, 3.55, 3.86, 4.49, 5.86, 6.06, 6.38, 7.26, 7.87, 10.66, 10.81, 7.77, 7.53, 6.44, 5.81, 7.18, 6.74, 7.58, 9.02, 7.69, 9.27, 8.99, 12.18, 13.56, 12.62, 12.27, 9.68, 9.23, 11.39, 10.45, 10.49, 10.33, 10.75, 9.44, 9.6, 9.13, 10, 10.55, 10.04, 8.89, 11.21, 9.18, 13.22, 10.43, 9.53] },
      velocityScore: { '1D': -3.3, '1W': -7.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: 105.9, revenueGrowth: 1080, eps: 0.09, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.75, RKNG: 2.36 },
      tonyNote: 'Ondas Holdings is a small-cap industrial automation and drone company. It appears in Meme ETFs on the autonomous systems and drone delivery narrative. Revenue is minimal and the path to profitability is unclear; the ETF allocation is speculative and reflects retail interest in autonomous systems themes.',
    },
    {
      ticker: 'OKLO', name: 'Oklo Inc', easyScore: 2, avgWeight: 3.55, proScore: 2.37, coverage: 0.667,
      price: 57.98, weeklyPrices: [58.94, 56.48, 54.02, 57.86, 57.98], weeklyChange: -1.62, sortRank: 0, periodReturns: { '1M': -21.2, '6M': -33.7, '1Y': -10.1 },
      priceHistory: { '1W': [58.94, 56.48, 54.02, 57.86, 57.98], '1M': [73.63, 69.66, 67.21, 62.25, 58.56, 62.58, 65.09, 65.88, 68.7, 67.82, 68.09, 66.88, 66.89, 73.47, 65.21, 58.09, 58.94, 56.48, 54.02, 57.86, 57.98], '6M': [87.42, 83.23, 74.09, 95.6, 97.09, 90.78, 94.39, 68.23, 66.23, 67.64, 69.07, 62.03, 59.59, 56.7, 55.27, 48.07, 47.75, 64.21, 76.46, 72.5, 71.83, 67.21, 65.09, 66.88, 58.09, 57.98], '1Y': [64.48, 57.95, 55.26, 55.94, 62.41, 62.51, 75.5, 71.49, 75.32, 71.06, 70.38, 73.64, 70.72, 95.68, 140.3, 116.51, 138.56, 171.01, 159.05, 137.43, 132.77, 112.65, 97.57, 88.17, 87.36, 104.61, 82.33, 83.44, 71.62, 97.6, 95.97, 90.93, 94.39, 68.23, 66.23, 67.64, 69.07, 62.03, 59.59, 54.69, 51.81, 48.13, 50.25, 66.81, 71, 72.5, 71.83, 67.21, 65.09, 66.88, 58.09, 57.98] },
      velocityScore: { '1D': -2.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: 0, eps: -0.84, grossMargin: 0, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.72, RKNG: 2.39 },
      tonyNote: 'Oklo Inc appears in 2 of 3 Meme ETFs (67% coverage) with average weight 3.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RGTI', name: 'Rigetti Computing', easyScore: 2, avgWeight: 3.46, proScore: 2.31, coverage: 0.667,
      price: 21.64, weeklyPrices: [21.76, 19.69, 19.44, 20.63, 21.64], weeklyChange: -0.6, sortRank: 0, periodReturns: { '1M': 13.5, '6M': -16.3, '1Y': 78.8 },
      priceHistory: { '1W': [21.76, 19.69, 19.44, 20.63, 21.64], '1M': [19.07, 18.42, 19.27, 17.85, 16.62, 16.88, 22.04, 26.42, 25.07, 24.62, 27.03, 25.54, 25.63, 26.88, 24.09, 20.68, 21.76, 19.69, 19.44, 20.63, 21.64], '6M': [25.84, 23.76, 22.27, 25.38, 24.47, 23.67, 22.01, 17.19, 16.43, 16.6, 18.64, 16.97, 16.07, 15.67, 15.14, 13.5, 14.31, 19.45, 16.86, 17.45, 18.34, 19.27, 22.04, 25.54, 20.68, 21.64], '1Y': [12.1, 11.06, 11.07, 13.75, 12.77, 16.08, 15.57, 14.12, 15.44, 16.65, 14.82, 16.23, 15.15, 19.21, 28.37, 29.65, 41.71, 54.91, 43.31, 40.24, 44.27, 33.77, 25.48, 23.59, 23.45, 28.26, 23.53, 26.88, 22.41, 25.21, 25.72, 24.96, 22.01, 17.19, 16.43, 16.6, 18.64, 16.97, 16.07, 15.41, 14.41, 14.19, 14.68, 19.81, 16.61, 17.45, 18.34, 19.27, 22.04, 25.54, 20.68, 21.64] },
      velocityScore: { '1D': -1.7, '1W': 6.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 199, eps: -0.89, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.91, RKNG: 3.02 },
      tonyNote: 'Rigetti Computing is a quantum hardware company using superconducting qubit technology. It holds a position in Meme ETFs alongside IonQ and D-Wave as part of the quantum computing basket. Revenue is minimal, the technology is earlier-stage than IonQ, and the ETF allocation is speculative. The weight score is low; this is a high-risk, long-duration positioning.',
    },
    {
      ticker: 'SPCE', name: 'Virgin Galactic Holdings', easyScore: 1, avgWeight: 8.32, proScore: 2.77, coverage: 0.333,
      price: 4.24, weeklyPrices: [4.12, 4.59, 4.71, 5.73, 4.24], weeklyChange: 2.91, sortRank: 0, periodReturns: { '1M': 52, '6M': 30.9, '1Y': 40.9 },
      priceHistory: { '1W': [4.12, 4.59, 4.71, 5.73, 4.24], '1M': [2.79, 2.88, 2.88, 2.81, 2.58, 2.47, 2.75, 3.24, 3.51, 3.79, 4.53, 6.18, 7.52, 4.59, 4.29, 4.38, 4.12, 4.59, 4.71, 5.73, 4.24], '6M': [3.24, 3.5, 3.15, 3.35, 3.07, 3, 3.03, 2.57, 2.62, 2.55, 2.64, 2.56, 2.51, 2.58, 2.52, 2.4, 2.97, 3.06, 2.71, 2.38, 2.51, 2.88, 2.75, 6.18, 4.38, 4.24], '1Y': [3.01, 2.99, 2.86, 2.77, 3.21, 4.31, 3.92, 3.68, 3.1, 2.99, 3.15, 3.11, 3.25, 3.28, 3.36, 3.51, 4.08, 4.37, 4.14, 4.17, 3.94, 3.59, 3.67, 3.38, 3.79, 4.55, 3.02, 3.7, 3.3, 3.17, 3.09, 3.18, 3.03, 2.57, 2.62, 2.55, 2.64, 2.56, 2.51, 2.5, 2.39, 2.46, 3.02, 2.93, 2.58, 2.38, 2.51, 2.88, 2.75, 6.18, 4.38, 4.24] },
      velocityScore: { '1D': 4.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$471M', pe: null, revenueGrowth: -51, eps: -3.87, grossMargin: 0, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 8.32, RKNG: false },
      tonyNote: 'Virgin Galactic Holdings appears in 1 of 3 Meme ETFs (33% coverage) with average weight 8.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RDW', name: 'Redwire', easyScore: 1, avgWeight: 5.62, proScore: 1.87, coverage: 0.333,
      price: 15.72, weeklyPrices: [18.57, 15.75, 14.87, 17.09, 15.72], weeklyChange: -15.35, sortRank: 0, periodReturns: { '1M': 36, '6M': 115.6, '1Y': -18.6 },
      priceHistory: { '1W': [18.57, 15.75, 14.87, 17.09, 15.72], '1M': [11.56, 11.46, 13.99, 14.06, 13.96, 14.77, 15.35, 17.49, 22.04, 24, 25.9, 24.57, 20.68, 20.58, 18.62, 18.45, 18.57, 15.75, 14.87, 17.09, 15.72], '6M': [7.29, 8, 7, 10.64, 10.14, 10.2, 13.29, 10.03, 9.01, 8.6, 9.55, 9.07, 9.48, 9.55, 9.16, 9.08, 9.22, 11.22, 10.04, 9.19, 9.2, 13.99, 15.35, 24.57, 18.45, 15.72], '1Y': [19.32, 15.86, 16.12, 15.48, 17.73, 17.37, 15.47, 13.87, 8.99, 8.94, 9.1, 8.91, 8.39, 9.06, 8.11, 8.93, 11.22, 9.06, 8.25, 8.24, 7.87, 6.56, 5.41, 5.3, 5.12, 6.82, 6.89, 8.52, 7.94, 9.83, 11.02, 11.98, 13.29, 10.03, 9.01, 8.6, 9.55, 9.07, 9.48, 9.63, 8.87, 9.73, 9.29, 10.34, 9.68, 9.19, 9.2, 13.99, 15.35, 24.57, 18.45, 15.72] },
      velocityScore: { '1D': -3.6, '1W': -13.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3B', pe: null, revenueGrowth: 58, eps: -2.59, grossMargin: 13, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.62, RKNG: false },
      tonyNote: 'Redwire Corp is a space infrastructure company — solar arrays, structures, and manufacturing in orbit. It appears in Meme and speculative ETFs as a high-risk space economy play. Revenue is growing from a small base but the business is pre-profitability; the ETF weight is minimal and reflects thematic positioning rather than fundamental conviction.',
    },
    {
      ticker: 'QBTS', name: 'D-Wave Quantum', easyScore: 1, avgWeight: 5.52, proScore: 1.84, coverage: 0.333,
      price: 24, weeklyPrices: [25.83, 23.52, 23.25, 23.82, 24.00], weeklyChange: -7.08, sortRank: 0, periodReturns: { '1M': 7.4, '6M': -8, '1Y': 51.1 },
      priceHistory: { '1W': [25.83, 23.52, 23.25, 23.82, 24], '1M': [22.35, 21.44, 22.13, 20.35, 19.06, 19.3, 25.74, 29.4, 27.82, 27.48, 29.49, 30.14, 29.18, 29.91, 27.55, 23.85, 25.83, 23.52, 23.25, 23.82, 24], '6M': [26.1, 26.82, 26.15, 31.27, 28.82, 26.04, 24.97, 20.11, 19.64, 19.38, 20.14, 18.83, 17.83, 16.49, 16.19, 13.7, 13.87, 21.52, 19.31, 20.28, 21.99, 22.13, 25.74, 30.14, 23.85, 24], '1Y': [15.88, 15.65, 14.02, 16.76, 15.83, 18.39, 18.35, 16.38, 16.9, 17.01, 15.54, 15.62, 15.42, 18.32, 25.67, 25.31, 35.02, 40.62, 34.4, 35.04, 37.06, 29.5, 23.61, 20.41, 21.42, 28.44, 23.74, 32.19, 26.25, 30.2, 30.15, 27.43, 24.97, 20.11, 19.64, 19.38, 20.14, 18.83, 17.83, 16.1, 14.65, 14.32, 14.25, 21.69, 18.49, 20.28, 21.99, 22.13, 25.74, 30.14, 23.85, 24] },
      velocityScore: { '1D': null, '1W': 4.5, '1M': null, '6M': null }, isNew: true,
      marketCap: '$9B', pe: null, revenueGrowth: -81, eps: -1.14, grossMargin: 66, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.52, RKNG: false },
      tonyNote: 'D-Wave Quantum is a quantum computing company — the only publicly traded business built around quantum annealing hardware. Revenue is minimal and profitability is many years away, but it holds a position in Meme ETFs as the purest-play quantum computing stock available to retail investors. The ETF weight is small and the position is purely thematic.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 1, avgWeight: 5.47, proScore: 1.82, coverage: 0.333,
      price: 259.25, weeklyPrices: [253.57, 259.61, 234.23, 248.88, 259.25], weeklyChange: 2.24, sortRank: 0, periodReturns: { '1M': -7.6, '6M': 173, '1Y': 1065.2 },
      priceHistory: { '1W': [253.57, 259.61, 234.23, 248.88, 259.25], '1M': [280.69, 289.76, 303.41, 275.95, 258.71, 282.31, 307.88, 302.49, 302.4, 293.8, 290.01, 285, 273.51, 302.85, 287.32, 263.61, 253.57, 259.61, 234.23, 248.88, 259.25], '6M': [94.98, 88.82, 88.41, 103.05, 139.77, 150.56, 165.39, 147.35, 155.54, 159, 168.57, 159.99, 157.17, 156.58, 150.22, 132.45, 160.13, 210.06, 237.57, 283.36, 258.64, 303.41, 307.88, 285, 263.61, 259.25], '1Y': [22.25, 21.75, 22.18, 24.36, 25.96, 25.36, 34.78, 36.72, 36.8, 45.28, 48.54, 52.94, 53.44, 67.02, 86.27, 73.6, 86.97, 109.91, 109.06, 108.53, 132.16, 135.21, 111.89, 89.99, 98.93, 111.79, 89.58, 92.26, 87.26, 108, 133.46, 145.63, 165.39, 147.35, 155.54, 159, 168.57, 159.99, 157.17, 166.69, 133.52, 135.63, 166.7, 207.86, 231.17, 283.36, 258.64, 303.41, 307.88, 285, 263.61, 259.25] },
      velocityScore: { '1D': -46.3, '1W': -46.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$74B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.47, RKNG: false },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'AXTI', name: 'AXT Inc', easyScore: 1, avgWeight: 5.42, proScore: 1.81, coverage: 0.333,
      price: 99.38, weeklyPrices: [90.78, 78.36, 85.29, 88.34, 99.38], weeklyChange: 9.47, sortRank: 0, periodReturns: { '1M': -19.1, '6M': 571, '1Y': 4128.9 },
      priceHistory: { '1W': [90.78, 78.36, 85.29, 88.34, 99.38], '1M': [122.9, 121.94, 114.98, 123.78, 105.88, 104.61, 121.02, 140.83, 132.6, 122.77, 115.7, 103.16, 109.55, 110.85, 106.7, 89.04, 90.78, 78.36, 85.29, 88.34, 99.38], '6M': [14.81, 14.65, 14.59, 20.17, 21.51, 19.78, 16.83, 18.75, 26.8, 23.81, 37.12, 38.8, 46.73, 48.76, 67.35, 47.14, 63.12, 81.78, 75.27, 79.22, 108.42, 114.98, 121.02, 103.16, 89.04, 99.38], '1Y': [2.35, 1.84, 2.03, 2.28, 2.32, 2.32, 2.44, 1.92, 2.14, 2.05, 2.82, 2.9, 3.11, 3.98, 5.14, 4.89, 5.4, 4.6, 4.91, 6.19, 7.95, 9.46, 10.44, 8.93, 10.79, 12.71, 14.83, 15.22, 15.8, 24.11, 22.1, 17.92, 16.83, 18.75, 26.8, 23.81, 37.12, 38.8, 46.73, 58.09, 58.51, 52.84, 64.18, 82.56, 76.16, 79.22, 108.42, 114.98, 121.02, 103.16, 89.04, 99.38] },
      velocityScore: { '1D': 11, '1W': 20.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 39, eps: -0.32, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.42, RKNG: false },
      tonyNote: 'AXT Inc is a compound semiconductor substrate manufacturer — gallium arsenide, indium phosphide, and germanium wafers used in data center optical transceivers, 5G RF chips, and solar cells. Revenue is growing with optical networking demand. Small market cap but positioned at a genuine supply-chain chokepoint for III-V semiconductor materials.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 1, avgWeight: 4.7, proScore: 1.57, coverage: 0.333,
      price: 561.14, weeklyPrices: [526.93, 517.72, 490.09, 529.29, 561.14], weeklyChange: 6.49, sortRank: 0, periodReturns: { '1M': 14.8, '6M': 218.2, '1Y': 906 },
      priceHistory: { '1W': [526.93, 517.72, 490.09, 529.29, 561.14], '1M': [488.74, 494.09, 489.15, 482.02, 458.68, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 511.72, 526.93, 517.72, 490.09, 529.29, 561.14], '6M': [176.34, 181.08, 179.68, 219.38, 214, 241.9, 279.7, 269.41, 273.74, 284.67, 282.25, 259.03, 261.18, 304.9, 296.14, 297.73, 337.88, 361.69, 403.12, 434.52, 463.91, 489.15, 486.46, 531.21, 511.72, 561.14], '1Y': [55.78, 59.29, 63.29, 65.22, 66.93, 68.74, 68.99, 76.55, 74.97, 75.06, 76.97, 80.34, 93.29, 102.39, 112.41, 116.74, 125.28, 118.86, 121.53, 126.67, 150.21, 162.96, 157.83, 139.19, 163.54, 169.78, 172.04, 176.76, 176.06, 199.88, 215, 243.29, 279.7, 269.41, 273.74, 284.67, 282.25, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 434.52, 463.91, 489.15, 486.46, 531.21, 511.72, 561.14] },
      velocityScore: { '1D': 1.3, '1W': -1.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$193B', pe: 33.5, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.7 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'WULF', name: 'WULF', easyScore: 1, avgWeight: 4.28, proScore: 1.43, coverage: 0.333,
      price: 26.32, weeklyPrices: [25.86, 25.30, 23.19, 25.35, 26.32], weeklyChange: 1.76, sortRank: 0, periodReturns: { '1M': 15.4, '6M': 83.6, '1Y': 517.7 },
      priceHistory: { '1W': [25.86, 25.3, 23.19, 25.35, 26.32], '1M': [22.8, 23.12, 24.17, 22.32, 21.14, 21.63, 22.92, 22.82, 25.18, 26.74, 26.4, 25.56, 25.66, 26.49, 26.16, 24, 25.86, 25.3, 23.19, 25.35, 26.32], '6M': [14.33, 12.52, 11.42, 13.18, 14.14, 13.12, 15.11, 13.88, 16.03, 15.47, 17.88, 15.23, 14.67, 15.3, 16.86, 14.48, 19.03, 19.31, 20.37, 21.73, 24.02, 24.17, 22.92, 25.56, 24, 26.32], '1Y': [4.26, 3.74, 4.22, 4.8, 5.11, 4.99, 5.1, 4.76, 5.03, 8.97, 9.16, 9.45, 9.2, 10.49, 11.49, 11.6, 11.97, 14, 13.85, 13.64, 15.5, 13.94, 10.99, 11.29, 15.3, 14.96, 12.49, 12.47, 11.15, 12.49, 14.21, 12.89, 15.11, 13.88, 16.03, 15.47, 17.88, 15.23, 14.67, 15.74, 15.35, 14.88, 18.87, 20.64, 20.01, 21.73, 24.02, 24.17, 22.92, 25.56, 24, 26.32] },
      velocityScore: { '1D': 5.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: null, revenueGrowth: -1, eps: -2.51, grossMargin: 64, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.28 },
      tonyNote: 'WULF appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
