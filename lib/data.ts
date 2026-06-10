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
export const SPY_RET: Record<Period, number> = { '1W': -3.1, '1M': -0.8, '6M': 6.7, '1Y': 21.7 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 7.9 }, { t: 'AMD', w: 4.5 }, { t: 'MRVL', w: 4.4 }, { t: 'VRT', w: 3.5 }, { t: 'SIMO', w: 3.4 }],
  ARTY: [{ t: 'MRVL', w: 8.7 }, { t: 'MU', w: 7.3 }, { t: 'AMD', w: 7.1 }, { t: 'ORCL', w: 4.1 }, { t: 'CRWV', w: 4.0 }],
  BAI: [{ t: 'MU', w: 5.9 }, { t: 'AMD', w: 4.7 }, { t: 'AVGO', w: 4.7 }, { t: 'NVDA', w: 4.6 }, { t: 'TSM', w: 4.5 }],
  IVEP: [{ t: 'BE', w: 4.9 }, { t: 'PWR', w: 4.4 }, { t: 'SBGSY', w: 4.0 }, { t: 'ETN', w: 4.0 }, { t: 'MPWR', w: 4.0 }],
  IGPT: [{ t: 'MU', w: 12.0 }, { t: 'AMD', w: 7.0 }, { t: 'INTC', w: 6.7 }, { t: 'GOOGL', w: 6.3 }, { t: 'NVDA', w: 5.9 }],
  IVES: [{ t: 'MU', w: 5.8 }, { t: 'TSM', w: 5.1 }, { t: 'NVDA', w: 4.8 }, { t: 'MSFT', w: 4.7 }, { t: 'AMD', w: 4.7 }],
  ALAI: [{ t: 'NVDA', w: 13.5 }, { t: 'AMZN', w: 5.8 }, { t: 'TSM', w: 5.7 }, { t: 'MSFT', w: 5.4 }, { t: 'GOOG', w: 5.1 }],
  CHAT: [{ t: 'NVDA', w: 7.0 }, { t: 'GOOGL', w: 5.5 }, { t: 'AVGO', w: 4.3 }, { t: 'AMD', w: 3.8 }, { t: 'MU', w: 3.7 }],
  AIFD: [{ t: 'MRVL', w: 6.8 }, { t: 'NVDA', w: 6.5 }, { t: 'MU', w: 6.2 }, { t: 'LITE', w: 6.1 }, { t: 'DOCN', w: 5.8 }],
  SPRX: [{ t: 'COHR', w: 9.1 }, { t: 'ARM', w: 7.9 }, { t: 'ALAB', w: 7.3 }, { t: 'KLAC', w: 6.3 }, { t: 'MKSI', w: 5.2 }],
  AOTG: [{ t: 'AMD', w: 14.8 }, { t: 'NVDA', w: 10.9 }, { t: 'MU', w: 9.1 }, { t: 'TSM', w: 7.2 }, { t: 'APP', w: 5.2 }],
  SOXX: [{ t: 'MU', w: 11.3 }, { t: 'AMD', w: 8.8 }, { t: 'MRVL', w: 8.2 }, { t: 'AVGO', w: 6.1 }, { t: 'INTC', w: 5.9 }],
  PSI: [{ t: 'AMAT', w: 5.9 }, { t: 'KLAC', w: 5.7 }, { t: 'MU', w: 5.6 }, { t: 'LRCX', w: 5.4 }, { t: 'NVDA', w: 5.2 }],
  XSD: [{ t: 'MXL', w: 5.2 }, { t: 'MRVL', w: 4.7 }, { t: 'ALAB', w: 4.3 }, { t: 'AMD', w: 3.7 }, { t: 'INTC', w: 3.6 }],
  DRAM: [{ t: 'SNDK', w: 5.0 }, { t: 'STX', w: 4.1 }, { t: 'MU', w: 3.9 }, { t: 'WDC', w: 3.7 }],
  PTF: [{ t: 'SNDK', w: 7.8 }, { t: 'MU', w: 4.9 }, { t: 'WDC', w: 4.8 }, { t: 'STX', w: 4.7 }, { t: 'NVDA', w: 4.6 }],
  WCLD: [{ t: 'DOCN', w: 3.6 }, { t: 'FROG', w: 3.0 }, { t: 'DDOG', w: 2.7 }, { t: 'TWLO', w: 2.5 }, { t: 'PANW', w: 2.4 }],
  IGV: [{ t: 'ORCL', w: 9.9 }, { t: 'MSFT', w: 7.8 }, { t: 'PANW', w: 7.7 }, { t: 'PLTR', w: 6.9 }, { t: 'CRWD', w: 6.0 }],
  FDTX: [{ t: 'MU', w: 9.4 }, { t: 'MRVL', w: 8.1 }, { t: 'TSM', w: 6.0 }, { t: 'NVDA', w: 4.6 }, { t: 'STX', w: 4.0 }],
  GTEK: [{ t: 'MRVL', w: 4.8 }, { t: 'DELL', w: 3.0 }, { t: 'CDNS', w: 2.6 }, { t: 'NET', w: 2.3 }, { t: 'APH', w: 2.2 }],
  ARKK: [{ t: 'TSLA', w: 10.2 }, { t: 'TEM', w: 5.1 }, { t: 'CRSP', w: 5.0 }, { t: 'HOOD', w: 4.8 }, { t: 'AMD', w: 4.7 }],
  MARS: [{ t: 'RKLB', w: 13.9 }, { t: 'ASTS', w: 8.9 }, { t: 'SATS', w: 8.5 }, { t: 'GSAT', w: 4.9 }, { t: 'OHB', w: 4.6 }],
  FRWD: [{ t: 'STX', w: 9.0 }, { t: 'NVDA', w: 8.3 }, { t: 'AMD', w: 7.5 }, { t: 'TSM', w: 6.0 }, { t: 'LRCX', w: 5.8 }],
  BCTK: [{ t: 'TSM', w: 8.6 }, { t: 'AVGO', w: 7.4 }, { t: 'NVDA', w: 6.6 }, { t: 'LRCX', w: 6.5 }, { t: 'GOOG', w: 6.0 }],
  FWD: [{ t: 'AVGO', w: 2.7 }, { t: 'AMD', w: 2.5 }, { t: 'GOOGL', w: 2.1 }, { t: 'CAT', w: 1.9 }, { t: 'LRCX', w: 1.6 }],
  CBSE: [{ t: 'SCI', w: 3.3 }, { t: 'SBUX', w: 3.2 }, { t: 'ROL', w: 3.1 }, { t: 'SNOW', w: 2.9 }, { t: 'KLAC', w: 2.8 }],
  FCUS: [{ t: 'DELL', w: 4.4 }, { t: 'STRL', w: 4.3 }, { t: 'BE', w: 4.3 }, { t: 'STX', w: 4.2 }, { t: 'SITM', w: 4.1 }],
  WGMI: [{ t: 'CIFR', w: 16.2 }, { t: 'IREN', w: 12.7 }, { t: 'WULF', w: 9.4 }, { t: 'CORZ', w: 7.6 }, { t: 'KEEL', w: 7.0 }],
  POW: [{ t: 'POWL', w: 6.5 }, { t: 'VICR', w: 5.1 }, { t: 'PWR', w: 4.8 }, { t: 'PRY', w: 4.4 }, { t: 'ETN', w: 4.1 }],
  VOLT: [{ t: 'POWL', w: 7.8 }, { t: 'BELFB', w: 7.5 }, { t: 'PWR', w: 5.5 }, { t: 'ETN', w: 5.4 }, { t: 'APH', w: 4.3 }],
  PBD: [{ t: 'SEDG', w: 1.1 }, { t: 'BLDP', w: 1.1 }, { t: 'FSLR', w: 1.1 }, { t: 'ENPH', w: 1.1 }, { t: 'ENRG', w: 1.1 }],
  PBW: [{ t: 'HYLN', w: 4.0 }, { t: 'FCEL', w: 3.1 }, { t: 'NVTS', w: 3.0 }, { t: 'BLDP', w: 2.2 }, { t: 'BE', w: 2.2 }],
  AIRR: [{ t: 'STRL', w: 6.3 }, { t: 'CHRW', w: 4.3 }, { t: 'FIX', w: 4.3 }, { t: 'SAIA', w: 4.2 }, { t: 'EME', w: 3.9 }],
  PRN: [{ t: 'TTMI', w: 5.7 }, { t: 'FIX', w: 4.8 }, { t: 'STRL', w: 4.5 }, { t: 'JBL', w: 4.2 }, { t: 'AGX', w: 4.2 }],
  RSHO: [{ t: 'TKR', w: 9.1 }, { t: 'POWL', w: 7.8 }, { t: 'CGNX', w: 7.0 }, { t: 'CAT', w: 6.8 }, { t: 'ETN', w: 5.6 }],
  IDEF: [{ t: 'RTX', w: 8.1 }, { t: 'LMT', w: 7.1 }, { t: 'GD', w: 5.9 }, { t: 'NOC', w: 5.1 }, { t: 'BA', w: 4.9 }],
  BILT: [{ t: 'UNP', w: 5.8 }, { t: 'AEP', w: 4.2 }, { t: 'AENA', w: 4.2 }, { t: 'LNG', w: 3.9 }, { t: 'CP', w: 3.7 }],
  BUZZ: [{ t: 'SMCI', w: 3.8 }, { t: 'NOW', w: 3.6 }, { t: 'ASTS', w: 3.5 }, { t: 'MU', w: 3.4 }, { t: 'AMD', w: 3.2 }],
  MEME: [{ t: 'SPCE', w: 8.0 }, { t: 'AAOI', w: 6.0 }, { t: 'BE', w: 5.9 }, { t: 'RDW', w: 5.8 }, { t: 'SNDK', w: 5.6 }],
  RKNG: [{ t: 'NVTS', w: 6.2 }, { t: 'SNDK', w: 5.9 }, { t: 'MU', w: 5.1 }, { t: 'NBIS', w: 5.0 }, { t: 'WDC', w: 4.6 }],
};
// @@END_GENERATED:ETF_TOP_HOLDINGS@@

// @@GENERATED:TOP10_RET@@
// Top10 composite returns per theme per period (average of all ETFs in theme)
const TOP10_RET: Record<Theme, Record<Period, number>> = {
  'AI & ML':         { '1W': -8.3, '1M': 0.6, '6M': 31.1, '1Y': 73.8 },
  'Semiconductors':  { '1W': -9, '1M': 1.8, '6M': 83.1, '1Y': 139.5 },
  'Broad Tech':      { '1W': -8.3, '1M': -0.3, '6M': 19.3, '1Y': 48.7 },
  'Electrification': { '1W': -7.7, '1M': -8.2, '6M': 29.8, '1Y': 67 },
  'Industrials':     { '1W': -2.8, '1M': -2.4, '6M': 20.7, '1Y': 40.7 },
  'Meme':            { '1W': -11.7, '1M': -5, '6M': 14.7, '1Y': 9.8 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, Record<Period, ChartPeriodData>> = {
  'AI & ML': {
    '1W': { top10: [100, 92.78, 94.35, 92.87, 91.66], spy: [100, 97.42, 97.64, 97.35, 96.91], top10Return: -8.3, spyReturn: -3.1, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 97.61, 99.91, 100.89, 97.63, 95.76, 95.02, 98, 100.29, 101.17, 104.74, 106.24, 107.06, 109.78, 111.93, 111.28, 109.56, 101.49, 103.32, 101.66, 100.34], spy: [100, 99.85, 100.41, 101.2, 99.98, 99.91, 99.25, 100.26, 100.46, 100.86, 101.51, 102.07, 102.32, 102.6, 102.74, 102.02, 102.41, 99.76, 99.99, 99.7, 99.24], top10Return: 0.6, spyReturn: -0.8, xLabels: ["May 13", "May 20", "May 27", "Jun 3", "Jun 10"] },
    '6M': { top10: [100, 92.36, 98.07, 98.46, 99.96, 100.94, 101.03, 101.43, 100.6, 98.74, 100.43, 97.01, 99.01, 99.23, 98.28, 90.28, 97.69, 108.29, 112.43, 113.97, 122.08, 127.13, 124.33, 136.74, 145.39, 131.14], spy: [100, 97.65, 100.41, 99.36, 100.95, 100.59, 100.75, 101.14, 100.93, 99.31, 99.97, 98.95, 98.49, 97.3, 95.32, 91.91, 95.88, 101, 102.4, 103.51, 105.26, 107.36, 106.71, 109.15, 109.7, 106.71], top10Return: 31.1, spyReturn: 6.7, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 100.6, 104.15, 105.29, 106.59, 109.28, 110.69, 112.93, 113.33, 116.12, 110.78, 114.3, 114.85, 122.21, 126.25, 124.82, 129.66, 134.04, 130.94, 131.41, 140.03, 135.44, 132.4, 124.86, 127.57, 131.01, 133.71, 124.85, 130.82, 132.33, 135.06, 132.28, 135.1, 135.43, 135.1, 131.91, 134.02, 128.78, 132.03, 133.41, 130.45, 124.74, 137.06, 147.47, 156.46, 153.84, 166.44, 174.18, 169.74, 188.64, 202.09, 180.91], spy: [100, 99.08, 100.67, 102.88, 103.77, 104.14, 105.2, 105.2, 104.92, 106.93, 105.81, 107.22, 107.63, 109.05, 109.81, 109.11, 110.97, 111.29, 109.54, 111.39, 113.98, 112.35, 113.31, 109.87, 112.7, 113.48, 114.28, 112.17, 114.46, 114.03, 115.27, 112.35, 114.87, 115.31, 115.07, 113.23, 113.97, 112.81, 112.29, 111.23, 108.31, 107.84, 112.09, 116.06, 117.93, 118.01, 120.01, 122.4, 121.66, 124.44, 125.06, 121.66], top10Return: 73.8, spyReturn: 21.7, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Semiconductors': {
    '1W': { top10: [100, 88.25, 93.48, 92.02, 91.04], spy: [100, 97.42, 97.64, 97.35, 96.91], top10Return: -9, spyReturn: -3.1, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 95.36, 98.39, 98.32, 94.67, 91.7, 92.09, 96.15, 98.46, 100.04, 106.66, 107.88, 106.9, 108.41, 113.65, 114.98, 111.95, 98.7, 104.61, 102.95, 101.81], spy: [100, 99.85, 100.41, 101.2, 99.98, 99.91, 99.25, 100.26, 100.46, 100.86, 101.51, 102.07, 102.32, 102.6, 102.74, 102.02, 102.41, 99.76, 99.99, 99.7, 99.24], top10Return: 1.8, spyReturn: -0.8, xLabels: ["May 13", "May 20", "May 27", "Jun 3", "Jun 10"] },
    '6M': { top10: [100, 94.21, 101.23, 103.87, 108.58, 111.8, 111.2, 115.36, 117.08, 117.44, 120.48, 117.5, 122.54, 120.92, 128.76, 122.01, 127.7, 138.54, 149.6, 158.51, 173.46, 181.91, 183.15, 196.22, 198.78, 183.11], spy: [100, 97.65, 100.41, 99.36, 100.95, 100.59, 100.75, 101.14, 100.93, 99.31, 99.97, 98.95, 98.49, 97.3, 95.32, 91.91, 95.88, 101, 102.4, 103.51, 105.26, 107.36, 106.71, 109.15, 109.7, 106.71], top10Return: 83.1, spyReturn: 6.7, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 99.05, 104.42, 107.2, 109.2, 109.23, 107.15, 109.58, 106.07, 113.33, 108.54, 113.76, 111.97, 117.77, 124.83, 123.35, 129.07, 132.11, 133.21, 133.55, 139.86, 136.86, 134.25, 124.69, 130.21, 138.2, 142.6, 131.95, 137.23, 142.46, 148.36, 151.22, 151.99, 156.12, 159.67, 160.15, 162.53, 151.43, 150.35, 151.64, 154.61, 148.27, 165.93, 179.69, 196.53, 198.75, 223.74, 238.82, 230.19, 261.72, 275.32, 249.07], spy: [100, 99.08, 100.67, 102.88, 103.77, 104.14, 105.2, 105.2, 104.92, 106.93, 105.81, 107.22, 107.63, 109.05, 109.81, 109.11, 110.97, 111.29, 109.54, 111.39, 113.98, 112.35, 113.31, 109.87, 112.7, 113.48, 114.28, 112.17, 114.46, 114.03, 115.27, 112.35, 114.87, 115.31, 115.07, 113.23, 113.97, 112.81, 112.29, 111.23, 108.31, 107.84, 112.09, 116.06, 117.93, 118.01, 120.01, 122.4, 121.66, 124.44, 125.06, 121.66], top10Return: 139.5, spyReturn: 21.7, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Broad Tech': {
    '1W': { top10: [100, 93.32, 94.45, 92.64, 91.67], spy: [100, 97.42, 97.64, 97.35, 96.91], top10Return: -8.3, spyReturn: -3.1, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.06, 98.91, 100.35, 97.87, 97.08, 96.38, 98.72, 100.4, 101.86, 105.22, 106.67, 107.46, 109.44, 110.35, 108.84, 108.49, 101.22, 102.48, 100.49, 99.44], spy: [100, 99.85, 100.41, 101.2, 99.98, 99.91, 99.25, 100.26, 100.46, 100.86, 101.51, 102.07, 102.32, 102.6, 102.74, 102.02, 102.41, 99.76, 99.99, 99.7, 99.24], top10Return: -0.3, spyReturn: -0.8, xLabels: ["May 13", "May 20", "May 27", "Jun 3", "Jun 10"] },
    '6M': { top10: [100, 94.3, 98.45, 97.76, 99.85, 100.85, 100.49, 98.13, 98.38, 97.17, 98.56, 98.12, 97.78, 96.79, 96.42, 91.31, 97.86, 105.35, 109.26, 110.03, 117.33, 120.78, 117.97, 124.99, 130.06, 119.33], spy: [100, 97.65, 100.41, 99.36, 100.95, 100.59, 100.75, 101.14, 100.93, 99.31, 99.97, 98.95, 98.49, 97.3, 95.32, 91.91, 95.88, 101, 102.4, 103.51, 105.26, 107.36, 106.71, 109.15, 109.7, 106.71], top10Return: 19.3, spyReturn: 6.7, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 99.07, 101.79, 105.03, 105.74, 108.4, 108.89, 107.76, 107.25, 108.07, 105.74, 109.21, 108.13, 113.69, 118.85, 118.83, 123.63, 129.09, 128.08, 126.41, 131.2, 130.77, 124.52, 116.44, 120.69, 123.37, 124.24, 116.73, 119.88, 122.28, 125.7, 124.75, 125.61, 123.67, 124.45, 122.76, 124.44, 122.89, 122.58, 124.83, 123.59, 119.82, 128.03, 135.06, 141, 136.97, 145.71, 148.2, 145.46, 156.42, 161.1, 148.69], spy: [100, 99.08, 100.67, 102.88, 103.77, 104.14, 105.2, 105.2, 104.92, 106.93, 105.81, 107.22, 107.63, 109.05, 109.81, 109.11, 110.97, 111.29, 109.54, 111.39, 113.98, 112.35, 113.31, 109.87, 112.7, 113.48, 114.28, 112.17, 114.46, 114.03, 115.27, 112.35, 114.87, 115.31, 115.07, 113.23, 113.97, 112.81, 112.29, 111.23, 108.31, 107.84, 112.09, 116.06, 117.93, 118.01, 120.01, 122.4, 121.66, 124.44, 125.06, 121.66], top10Return: 48.7, spyReturn: 21.7, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Electrification': {
    '1W': { top10: [100, 94.86, 93.75, 92.63, 92.26], spy: [100, 97.42, 97.64, 97.35, 96.91], top10Return: -7.7, spyReturn: -3.1, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 97.41, 98.21, 98.17, 95.58, 92.64, 90.53, 92.71, 95.56, 97.14, 100.05, 99.85, 99.34, 98.77, 100.59, 99.79, 99.5, 94.26, 93.13, 91.91, 91.55], spy: [100, 99.85, 100.41, 101.2, 99.98, 99.91, 99.25, 100.26, 100.46, 100.86, 101.51, 102.07, 102.32, 102.6, 102.74, 102.02, 102.41, 99.76, 99.99, 99.7, 99.24], top10Return: -8.2, spyReturn: -0.8, xLabels: ["May 13", "May 20", "May 27", "Jun 3", "Jun 10"] },
    '6M': { top10: [100, 95.19, 98.97, 99.58, 101.38, 106.93, 108.37, 107.78, 112.64, 113.16, 116.2, 111.68, 110.45, 110.81, 110.58, 106.73, 111.88, 121.7, 124.51, 128.54, 137.51, 139.38, 129.4, 141.71, 141.24, 129.83], spy: [100, 97.65, 100.41, 99.36, 100.95, 100.59, 100.75, 101.14, 100.93, 99.31, 99.97, 98.95, 98.49, 97.3, 95.32, 91.91, 95.88, 101, 102.4, 103.51, 105.26, 107.36, 106.71, 109.15, 109.7, 106.71], top10Return: 29.8, spyReturn: 6.7, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 99.44, 100.65, 104.43, 106.73, 108.8, 110.86, 109.09, 108.96, 112.78, 112.31, 114.42, 112.12, 114.58, 119.42, 121.74, 125.19, 130.37, 134.47, 131.42, 135.62, 135.96, 134.6, 128.84, 132.47, 134.76, 137.08, 132.74, 134.32, 135.39, 138.97, 141.67, 144.31, 142.54, 146.13, 146.23, 148.5, 146.66, 145.78, 147.93, 149.38, 147.67, 154.52, 163.81, 168.79, 166.37, 171.36, 177.28, 169.2, 182.39, 179.89, 167.01], spy: [100, 99.08, 100.67, 102.88, 103.77, 104.14, 105.2, 105.2, 104.92, 106.93, 105.81, 107.22, 107.63, 109.05, 109.81, 109.11, 110.97, 111.29, 109.54, 111.39, 113.98, 112.35, 113.31, 109.87, 112.7, 113.48, 114.28, 112.17, 114.46, 114.03, 115.27, 112.35, 114.87, 115.31, 115.07, 113.23, 113.97, 112.81, 112.29, 111.23, 108.31, 107.84, 112.09, 116.06, 117.93, 118.01, 120.01, 122.4, 121.66, 124.44, 125.06, 121.66], top10Return: 67, spyReturn: 21.7, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Industrials': {
    '1W': { top10: [100, 97.25, 97.68, 97.44, 97.23], spy: [100, 97.42, 97.64, 97.35, 96.91], top10Return: -2.8, spyReturn: -3.1, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.14, 99.16, 99.83, 97.2, 95.9, 94.79, 96.6, 96.79, 97.66, 100.09, 100.7, 99.96, 98.74, 99.49, 99.44, 100.31, 97.54, 97.97, 97.73, 97.52], spy: [100, 99.85, 100.41, 101.2, 99.98, 99.91, 99.25, 100.26, 100.46, 100.86, 101.51, 102.07, 102.32, 102.6, 102.74, 102.02, 102.41, 99.76, 99.99, 99.7, 99.24], top10Return: -2.4, spyReturn: -0.8, xLabels: ["May 13", "May 20", "May 27", "Jun 3", "Jun 10"] },
    '6M': { top10: [100, 96.81, 101.26, 101.26, 105.75, 110.07, 109.17, 109.7, 115.08, 116.35, 118.45, 116.15, 113.05, 111.26, 110.23, 105.4, 112.16, 119.19, 118.36, 117.92, 122.29, 122.64, 116.97, 123.87, 123.22, 120.7], spy: [100, 97.65, 100.41, 99.36, 100.95, 100.59, 100.75, 101.14, 100.93, 99.31, 99.97, 98.95, 98.49, 97.3, 95.32, 91.91, 95.88, 101, 102.4, 103.51, 105.26, 107.36, 106.71, 109.15, 109.7, 106.71], top10Return: 20.7, spyReturn: 6.7, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 99.91, 101.13, 104.03, 105.28, 106.73, 106.96, 107.35, 107.23, 109.87, 107.39, 110.41, 109.55, 112.02, 113.11, 111.63, 114.99, 115.9, 114.72, 115.85, 119.08, 116.11, 114.91, 110.02, 113.27, 114.9, 117.74, 114.23, 117.59, 120.83, 125.41, 127.52, 128.81, 129.07, 135.39, 135.64, 137.47, 134.52, 130.56, 129.6, 129.85, 127.96, 135.69, 136.61, 138.69, 137.44, 142.36, 143.05, 136.48, 144.22, 143.75, 140.72], spy: [100, 99.08, 100.67, 102.88, 103.77, 104.14, 105.2, 105.2, 104.92, 106.93, 105.81, 107.22, 107.63, 109.05, 109.81, 109.11, 110.97, 111.29, 109.54, 111.39, 113.98, 112.35, 113.31, 109.87, 112.7, 113.48, 114.28, 112.17, 114.46, 114.03, 115.27, 112.35, 114.87, 115.31, 115.07, 113.23, 113.97, 112.81, 112.29, 111.23, 108.31, 107.84, 112.09, 116.06, 117.93, 118.01, 120.01, 122.4, 121.66, 124.44, 125.06, 121.66], top10Return: 40.7, spyReturn: 21.7, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Meme': {
    '1W': { top10: [100, 89.83, 92.13, 88.88, 88.32], spy: [100, 97.42, 97.64, 97.35, 96.91], top10Return: -11.7, spyReturn: -3.1, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 97.1, 99.24, 100.19, 96.27, 92.41, 90.98, 94.48, 100.15, 102.51, 107.52, 109.49, 108.03, 108.22, 110.89, 107, 107.59, 96.6, 99.08, 95.55, 94.97], spy: [100, 99.85, 100.41, 101.2, 99.98, 99.91, 99.25, 100.26, 100.46, 100.86, 101.51, 102.07, 102.32, 102.6, 102.74, 102.02, 102.41, 99.76, 99.99, 99.7, 99.24], top10Return: -5, spyReturn: -0.8, xLabels: ["May 13", "May 20", "May 27", "Jun 3", "Jun 10"] },
    '6M': { top10: [100, 90.48, 94.82, 93.38, 96.59, 100.37, 96.37, 90.48, 91.35, 86.36, 88.38, 86.26, 82.94, 88.02, 88.87, 83.76, 90.15, 102.42, 107.43, 102.6, 113.67, 114.72, 114.07, 130.31, 129.46, 114.73], spy: [100, 97.65, 100.41, 99.36, 100.95, 100.59, 100.75, 101.14, 100.93, 99.31, 99.97, 98.95, 98.49, 97.3, 95.32, 91.91, 95.88, 101, 102.4, 103.51, 105.26, 107.36, 106.71, 109.15, 109.7, 106.71], top10Return: 14.7, spyReturn: 6.7, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.59, 100.66, 95.81, 97.22, 95.28, 94.31, 93.06, 85.99, 87.14, 86.38, 87.08, 89.94, 91.52, 90.14, 87.72, 92.29, 93.66, 93.71, 95.32, 98.2, 96.51, 94.72, 91.05, 86.44, 86.2, 89.68, 86.24, 89.03, 92.47, 93.02, 91.54, 94.78, 94.87, 92.41, 89.9, 89.45, 91.18, 97.02, 98.72, 102.18, 98.06, 96.37, 101.6, 107.61, 111.22, 112.08, 117.16, 121.16, 123.13, 115.91, 109.77], spy: [100, 99.08, 100.67, 102.88, 103.77, 104.14, 105.2, 105.2, 104.92, 106.93, 105.81, 107.22, 107.63, 109.05, 109.81, 109.11, 110.97, 111.29, 109.54, 111.39, 113.98, 112.35, 113.31, 109.87, 112.7, 113.48, 114.28, 112.17, 114.46, 114.03, 115.27, 112.35, 114.87, 115.31, 115.07, 113.23, 113.97, 112.81, 112.29, 111.23, 108.31, 107.84, 112.09, 116.06, 117.93, 118.01, 120.01, 122.4, 121.66, 124.44, 125.06, 121.66], top10Return: 9.8, spyReturn: 21.7, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
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
export const SCAN_TIMESTAMP    = '2026-06-10T13:36:38.078Z';
export const SCAN_TIMESTAMP_NY = 'June 10, 2026 at 9:36 AM ET';
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
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 13.58, bestProScore: 6.08, avgProScore: 4.53, price: 901.20, weeklyChange: -9.52 },
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 11.13, bestProScore: 5.77, avgProScore: 3.71, price: 205.43, weeklyChange: -6.05 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 10.43, bestProScore: 4.39, avgProScore: 3.48, price: 466.25, weeklyChange: -10.88 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 5.87, bestProScore: 2.62, avgProScore: 1.96, price: 376.43, weeklyChange: -10.14 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 6.11, bestProScore: 4.04, avgProScore: 3.05, price: 285.35, weeklyChange: -4.90 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 5.72, bestProScore: 3.21, avgProScore: 2.86, price: 262.72, weeklyChange: -16.97 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.77, bestProScore: 3.53, avgProScore: 2.38, price: 107.30, weeklyChange: -4.00 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.36, bestProScore: 2.65, avgProScore: 2.18, price: 413.24, weeklyChange: -7.12 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.52, bestProScore: 2.23, avgProScore: 1.76, price: 326.52, weeklyChange: -2.94 },
  { ticker: 'AMZN', name: `AMAZON.COM INC`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 3.12, bestProScore: 1.87, avgProScore: 1.56, price: 241.90, weeklyChange: -4.69 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': -10.3, '1M': 1.5, '6M': 85.4, '1Y': 173.6 },
  ARTY: { '1W': -10.2, '1M': 1.5, '6M': 40.8, '1Y': 83.6 },
  BAI:  { '1W': -8.2, '1M': -4.2, '6M': 29.4, '1Y': 72.7 },
  IVEP: { '1W': -4.8, '1M': -4.4, '6M': 3.1, '1Y': 3.1 },
  IGPT: { '1W': -7.9, '1M': -0.6, '6M': 54, '1Y': 95.2 },
  IVES: { '1W': -8.5, '1M': -0.2, '6M': 9.4, '1Y': 41 },
  ALAI: { '1W': -6.7, '1M': -0.3, '6M': 13, '1Y': 46.7 },
  CHAT: { '1W': -10.4, '1M': 3.4, '6M': 42.7, '1Y': 97.8 },
  AIFD: { '1W': -7.7, '1M': 1.5, '6M': 32.6, '1Y': 79.2 },
  SPRX: { '1W': -10.2, '1M': 7.7, '6M': 24.9, '1Y': 90 },
  AOTG: { '1W': -6.7, '1M': 0.5, '6M': 7.1, '1Y': 29.2 },
  // Semiconductors
  SOXX: { '1W': -7.7, '1M': 4.4, '6M': 75.8, '1Y': 144.6 },
  PSI:  { '1W': -5.8, '1M': -2.5, '6M': 80.6, '1Y': 170.2 },
  XSD:  { '1W': -11.4, '1M': -0.8, '6M': 65.4, '1Y': 132.4 },
  DRAM: { '1W': -11, '1M': 6.2, '6M': 110.7, '1Y': 110.7 },
  // Broad Tech
  PTF:  { '1W': -10.3, '1M': -4.2, '6M': 46.3, '1Y': 81.3 },
  WCLD: { '1W': -7.4, '1M': 5.9, '6M': -15.2, '1Y': -15.4 },
  IGV:  { '1W': -8.3, '1M': 1.2, '6M': -16.7, '1Y': -13.4 },
  FDTX: { '1W': -9.2, '1M': 4.3, '6M': 25.8, '1Y': 40.8 },
  GTEK: { '1W': -7.2, '1M': 2.2, '6M': 39, '1Y': 64.8 },
  ARKK: { '1W': -6.4, '1M': -6.4, '6M': -9.9, '1Y': 19 },
  MARS: { '1W': -13.3, '1M': -7.7, '6M': 32.8, '1Y': 32.8 },
  FRWD: { '1W': -7.2, '1M': 0.5, '6M': 24, '1Y': 24 },
  BCTK: { '1W': -7.2, '1M': 0.2, '6M': 19.1, '1Y': 19.1 },
  FWD:  { '1W': -6.9, '1M': -1.2, '6M': 25, '1Y': 60.7 },
  CBSE: { '1W': -7.1, '1M': 0.5, '6M': 17.4, '1Y': 37.5 },
  FCUS: { '1W': -8.5, '1M': -7.5, '6M': 26.3, '1Y': 71.1 },
  WGMI: { '1W': -9.2, '1M': 7.7, '6M': 37.2, '1Y': 210.6 },
  // Electrification
  POW:  { '1W': -4.6, '1M': -12.1, '6M': 44.3, '1Y': 45.3 },
  VOLT: { '1W': -3, '1M': -6.7, '6M': 28.9, '1Y': 59.7 },
  PBD:  { '1W': -9.2, '1M': -7.7, '6M': 25.2, '1Y': 64.5 },
  PBW:  { '1W': -14.1, '1M': -6.4, '6M': 21, '1Y': 98.6 },
  // Industrials
  AIRR: { '1W': -4, '1M': -3, '6M': 24.4, '1Y': 61 },
  PRN:  { '1W': -5.4, '1M': -3.9, '6M': 33.2, '1Y': 55.2 },
  RSHO: { '1W': -1.7, '1M': -0.7, '6M': 28.1, '1Y': 51.8 },
  IDEF: { '1W': -3.1, '1M': -4.6, '6M': 5.2, '1Y': 20.1 },
  BILT: { '1W': 0.4, '1M': 0.2, '6M': 12.5, '1Y': 15.6 },
  // Meme
  BUZZ: { '1W': -8.4, '1M': -3.4, '6M': 4.7, '1Y': 29.1 },
  MEME: { '1W': -14.3, '1M': -5.7, '6M': 37.7, '1Y': -1.5 },
  RKNG: { '1W': -12.3, '1M': -6, '6M': 1.7, '1Y': 1.7 },
};
// @@END_GENERATED:ETF_RETURNS@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 6.35, proScore: 5.77, coverage: 0.909,
      price: 205.43, weeklyPrices: [218.66, 205.10, 208.64, 208.19, 205.43], weeklyChange: -6.05, sortRank: 0, periodReturns: { '1M': -6.4, '6M': 11.8, '1Y': 42.7 },
      priceHistory: { '1W': [218.66, 205.1, 208.64, 208.19, 205.43], '1M': [219.44, 220.78, 225.83, 235.74, 225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 205.43], '6M': [183.78, 170.94, 188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 214.75, 205.43], '1Y': [143.96, 144.12, 154.31, 157.25, 164.1, 173, 173.74, 179.27, 179.42, 181.59, 175.4, 181.6, 171.66, 177.17, 176.24, 177.69, 188.89, 192.57, 181.81, 182.16, 207.04, 195.21, 193.8, 186.52, 180.26, 183.38, 180.93, 174.14, 190.53, 188.12, 184.94, 178.07, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 213.17, 196.5, 220.78, 220.61, 212.6, 214.75, 205.43] },
      velocityScore: { '1D': 1.9, '1W': 2.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.0T', pe: 31.4, revenueGrowth: 85, eps: 6.54, grossMargin: 74, dividendYield: 0.48,
      etfPresence: { AIS: 2.55, ARTY: 3.57, BAI: 4.59, IVEP: false, IGPT: 5.92, IVES: 4.83, ALAI: 13.5, CHAT: 6.98, AIFD: 6.54, SPRX: 4.13, AOTG: 10.86 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 6.54, proScore: 5.35, coverage: 0.818,
      price: 901.2, weeklyPrices: [996.00, 864.01, 949.28, 935.89, 901.20], weeklyChange: -9.52, sortRank: 0, periodReturns: { '1M': 13.3, '6M': 241.7, '1Y': 689.6 },
      priceHistory: { '1W': [996, 864.01, 949.28, 935.89, 901.2], '1M': [795.33, 766.58, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 901.2], '6M': [263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 901.2], '1Y': [114.14, 120.34, 127.25, 121.74, 123.11, 113.26, 111.73, 114.74, 108.78, 124.27, 117.21, 117.75, 124.21, 150.57, 168.89, 156.83, 183.75, 192.33, 202.53, 206.71, 226.63, 237.5, 244.9, 225.92, 230.26, 226.65, 258.46, 248.55, 284.79, 312.15, 345.87, 365, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 901.2] },
      velocityScore: { '1D': -3.8, '1W': -8.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.0T', pe: 42.6, revenueGrowth: 196, eps: 21.15, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { AIS: 7.92, ARTY: 7.28, BAI: 5.93, IVEP: false, IGPT: 12.02, IVES: 5.79, ALAI: 0.96, CHAT: 3.72, AIFD: 6.19, SPRX: false, AOTG: 9.06 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.37, proScore: 4.39, coverage: 0.818,
      price: 466.25, weeklyPrices: [523.20, 466.38, 490.33, 475.51, 466.25], weeklyChange: -10.88, sortRank: 0, periodReturns: { '1M': 1.6, '6M': 110.6, '1Y': 278.3 },
      priceHistory: { '1W': [523.2, 466.38, 490.33, 475.51, 466.25], '1M': [458.79, 448.29, 445.5, 449.7, 424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 466.25], '6M': [221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 466.25], '1Y': [123.24, 127.1, 143.4, 138.52, 144.16, 160.41, 162.12, 179.51, 163.12, 184.42, 165.2, 167.13, 161.79, 155.67, 157.92, 161.27, 169.73, 232.89, 234.56, 234.99, 264.33, 256.33, 258.89, 223.55, 214.24, 215.98, 221.43, 201.06, 214.99, 221.08, 207.69, 231.92, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 466.25] },
      velocityScore: { '1D': -5.6, '1W': -3.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$760B', pe: 155.4, revenueGrowth: 38, eps: 3, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.45, ARTY: 7.09, BAI: 4.74, IVEP: false, IGPT: 7.04, IVES: 4.71, ALAI: 1.08, CHAT: 3.82, AIFD: false, SPRX: 0.52, AOTG: 14.85 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.61, proScore: 2.62, coverage: 0.727,
      price: 376.43, weeklyPrices: [418.91, 385.73, 396.60, 392.16, 376.43], weeklyChange: -10.14, sortRank: 0, periodReturns: { '1M': -12.1, '6M': -8.8, '1Y': 53.9 },
      priceHistory: { '1W': [418.91, 385.73, 396.6, 392.16, 376.43], '1M': [428.43, 419.3, 416.79, 439.79, 425.19, 420.71, 411.07, 417.76, 414.57, 414.14, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 376.43], '6M': [412.97, 326.02, 350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 479.23, 376.43], '1Y': [244.63, 249.37, 264.65, 269.9, 275.4, 286.45, 288.71, 302.62, 301.67, 309.09, 291.17, 300.25, 306.1, 359.63, 345.35, 336.1, 338.18, 345.02, 354.15, 344.29, 385.98, 358.98, 355.22, 354.42, 397.57, 381.03, 406.37, 329.88, 352.13, 343.42, 352.21, 332.6, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 399.83, 427.36, 419.3, 411.07, 421.86, 479.23, 376.43] },
      velocityScore: { '1D': 4, '1W': -8.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 62.7, revenueGrowth: 48, eps: 6, grossMargin: 76, dividendYield: 0.66,
      etfPresence: { AIS: 0.71, ARTY: 3.47, BAI: 4.69, IVEP: false, IGPT: false, IVES: 4.54, ALAI: 4.04, CHAT: 4.35, AIFD: 5.53, SPRX: false, AOTG: 1.54 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 4.89, proScore: 2.67, coverage: 0.545,
      price: 363.24, weeklyPrices: [372.19, 368.53, 363.31, 364.26, 363.24], weeklyChange: -2.4, sortRank: 0, periodReturns: { '1M': -6.5, '6M': 13.4, '1Y': 103.4 },
      priceHistory: { '1W': [372.19, 368.53, 363.31, 364.26, 363.24], '1M': [388.64, 387.35, 402.62, 401.07, 396.78, 396.94, 387.66, 388.91, 387.66, 382.97, 388.83, 390.13, 380.34, 376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 363.24], '6M': [320.21, 296.72, 314.09, 315.15, 328.57, 330, 333.26, 343.69, 324.32, 302.02, 310.9, 303.58, 307.04, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 387.35, 387.66, 388.83, 358.99, 363.24], '1Y': [178.6, 175.95, 170.68, 178.64, 177.62, 183.58, 192.17, 196.53, 196.09, 201.96, 199.32, 207.48, 232.3, 240.37, 252.03, 245.79, 245.69, 241.53, 251.46, 253.08, 274.57, 284.31, 286.71, 292.81, 319.95, 317.62, 312.43, 302.46, 313.51, 316.54, 331.86, 322, 333.26, 343.69, 324.32, 302.02, 310.9, 303.58, 307.04, 310.92, 290.44, 287.56, 317.32, 337.12, 339.32, 349.78, 388.43, 387.35, 387.66, 388.83, 358.99, 363.24] },
      velocityScore: { '1D': -0.4, '1W': 7.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.7, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.62, IVEP: false, IGPT: 6.25, IVES: 4.59, ALAI: false, CHAT: 5.55, AIFD: 5.06, SPRX: false, AOTG: 4.25 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 6, avgWeight: 4.85, proScore: 2.65, coverage: 0.545,
      price: 413.24, weeklyPrices: [444.92, 415.17, 426.80, 427.92, 413.24], weeklyChange: -7.12, sortRank: 0, periodReturns: { '1M': 2.2, '6M': 33.2, '1Y': 94.5 },
      priceHistory: { '1W': [444.92, 415.17, 426.8, 427.92, 413.24], '1M': [404.54, 397.28, 399.8, 417.72, 404.35, 395.95, 392.61, 401.62, 407.15, 404.52, 422.73, 424.86, 418.45, 435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 427.92, 413.24], '6M': [310.14, 276.96, 298.8, 319.61, 323.63, 342.4, 332.71, 341.36, 355.41, 364.2, 385.75, 353.13, 347.09, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 392.61, 422.73, 436.69, 413.24], '1Y': [212.46, 213.9, 222.74, 233.6, 229.76, 245.6, 241.6, 242.91, 231.37, 241.44, 228.6, 239.29, 235.21, 258.91, 268.64, 276.66, 288.11, 299.88, 299.84, 290.73, 305.09, 293.64, 290.62, 282.37, 289.96, 292.93, 304.85, 284.68, 302.84, 322.25, 331.77, 327.16, 332.71, 341.36, 355.41, 364.2, 385.75, 353.13, 347.09, 345.98, 343.25, 337.95, 365.9, 375.1, 387.44, 392.34, 394.41, 397.28, 392.61, 422.73, 436.69, 413.24] },
      velocityScore: { '1D': -0.7, '1W': 4.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.1T', pe: 35.5, revenueGrowth: 35, eps: 11.64, grossMargin: 62, dividendYield: 0.89,
      etfPresence: { AIS: 3.31, ARTY: false, BAI: 4.53, IVEP: false, IGPT: false, IVES: 5.09, ALAI: 5.72, CHAT: false, AIFD: 3.27, SPRX: false, AOTG: 7.18 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 6, avgWeight: 4.6, proScore: 2.51, coverage: 0.545,
      price: 262.72, weeklyPrices: [316.43, 263.47, 288.85, 266.88, 262.72], weeklyChange: -16.97, sortRank: 0, periodReturns: { '1M': 53.8, '6M': 184.1, '1Y': 281.6 },
      priceHistory: { '1W': [316.43, 263.47, 288.85, 266.88, 262.72], '1M': [170.84, 164.5, 177.95, 182.58, 176.89, 168.93, 176.27, 186.8, 190.69, 196.33, 198.7, 204.83, 205, 219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 266.88, 262.72], '6M': [92.47, 81.7, 86.49, 89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 77.51, 93.3, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 198.7, 301.65, 262.72], '1Y': [68.84, 69.99, 75.93, 74.25, 73.36, 72.01, 74.04, 81.74, 75.32, 79.32, 71.22, 74.79, 64.1, 66.59, 74.23, 83.81, 86.2, 90.68, 88.23, 82.77, 90.15, 92.9, 89.33, 81.32, 87.72, 98.19, 89.43, 84.47, 86.34, 90.23, 82.89, 79.8, 81.77, 78.66, 82.35, 79.01, 78.39, 77.51, 93.3, 90.79, 92.36, 99.05, 114.45, 134.6, 157.32, 153.23, 168.75, 164.5, 176.27, 198.7, 301.65, 262.72] },
      velocityScore: { '1D': -4.6, '1W': 13.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$230B', pe: 90.3, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { AIS: 4.39, ARTY: 8.69, BAI: 1.67, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.51, AIFD: 6.8, SPRX: 4.55, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 6, avgWeight: 2.06, proScore: 1.12, coverage: 0.545,
      price: 149.75, weeklyPrices: [166.01, 154.27, 156.40, 152.16, 149.75], weeklyChange: -9.79, sortRank: 0, periodReturns: { '1M': 9.8, '6M': 13.1, '1Y': 59.8 },
      priceHistory: { '1W': [166.01, 154.27, 156.4, 152.16, 149.75], '1M': [136.43, 142.54, 140.69, 147.81, 141.97, 141.71, 141.58, 140.49, 148.59, 154.03, 154.31, 155.27, 159.47, 170.68, 175.33, 174.37, 166.01, 154.27, 156.4, 152.16, 149.75], '6M': [132.36, 122.36, 130.77, 133.6, 122.89, 129.83, 143.72, 138.37, 141.74, 142.58, 128.77, 124.6, 139.62, 135.35, 135.88, 116.13, 133.64, 154.37, 172.86, 165.29, 170.22, 142.54, 141.58, 154.31, 174.37, 149.75], '1Y': [93.7, 89.68, 96.31, 101.13, 106.29, 111.98, 114.04, 122.09, 138.78, 138.01, 131.47, 133.27, 141.17, 153.04, 146.66, 143.06, 144.46, 158.23, 146.01, 152.76, 162.03, 140.42, 134.98, 124.81, 127.65, 128.55, 134.39, 124.62, 131.84, 137.19, 123.42, 127.52, 143.72, 138.37, 141.74, 142.58, 128.77, 124.6, 139.62, 133.07, 130.8, 122.78, 145.07, 154.33, 177.73, 165.29, 170.22, 142.54, 141.58, 154.31, 174.37, 149.75] },
      velocityScore: { '1D': -22.8, '1W': -24.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$189B', pe: 51.5, revenueGrowth: 35, eps: 2.91, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.37, ARTY: 1.91, BAI: 1.36, IVEP: false, IGPT: false, IVES: false, ALAI: 0.89, CHAT: 2.1, AIFD: 4.71, SPRX: false, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 6 of 11 AI & ML ETFs (55% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 4.11, proScore: 1.87, coverage: 0.455,
      price: 241.9, weeklyPrices: [253.79, 246.03, 245.22, 244.19, 241.90], weeklyChange: -4.69, sortRank: 0, periodReturns: { '1M': -10.1, '6M': 4.4, '1Y': 11.2 },
      priceHistory: { '1W': [253.79, 246.03, 245.22, 244.19, 241.9], '1M': [268.99, 265.82, 270.13, 267.22, 264.14, 264.86, 259.34, 265.01, 268.46, 266.32, 271.85, 274, 270.64, 261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 244.19, 241.9], '6M': [231.78, 221.27, 232.38, 226.5, 247.38, 239.12, 238.42, 242.96, 208.72, 201.15, 208.56, 208.73, 214.33, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 259.34, 271.85, 250.02, 241.9], '1Y': [217.61, 214.82, 211.99, 219.92, 222.26, 223.88, 232.23, 230.19, 222.31, 224.56, 223.81, 229.12, 235.68, 229.95, 231.23, 218.15, 222.41, 227.74, 214.47, 221.09, 230.3, 250.2, 244.2, 222.69, 229.16, 229.11, 230.28, 226.76, 232.52, 233.06, 246.47, 231, 238.42, 242.96, 208.72, 201.15, 208.56, 208.73, 214.33, 215.2, 207.24, 208.27, 221.25, 248.5, 255.36, 259.7, 273.55, 265.82, 259.34, 271.85, 250.02, 241.9] },
      velocityScore: { '1D': -3.6, '1W': -0.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 31.3, revenueGrowth: 17, eps: 7.72, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.45, ALAI: 5.83, CHAT: 2.51, AIFD: 3.49, SPRX: false, AOTG: 4.27 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.64, proScore: 1.66, coverage: 0.455,
      price: 398.14, weeklyPrices: [428.05, 416.67, 411.74, 403.41, 398.14], weeklyChange: -6.99, sortRank: 0, periodReturns: { '1M': -3.5, '6M': -16.8, '1Y': -15.5 },
      priceHistory: { '1W': [428.05, 416.67, 411.74, 403.41, 398.14], '1M': [412.66, 407.77, 405.21, 409.43, 421.92, 423.54, 417.42, 421.06, 419.09, 418.57, 412.67, 426.99, 450.24, 460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 403.41, 398.14], '6M': [478.56, 476.12, 488.02, 472.94, 479.28, 459.86, 470.28, 423.37, 413.6, 396.86, 389, 403.93, 405.76, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 417.42, 412.67, 427.34, 398.14], '1Y': [470.92, 478.04, 492.27, 491.09, 501.48, 511.7, 510.88, 513.24, 524.94, 520.58, 505.72, 506.74, 507.97, 501.01, 508.45, 507.03, 515.74, 522.4, 511.61, 520.56, 541.55, 507.16, 511.14, 487.12, 485.5, 480.84, 483.47, 483.98, 487.71, 472.85, 477.18, 454.52, 470.28, 423.37, 413.6, 396.86, 389, 403.93, 405.76, 399.41, 372.74, 370.17, 374.33, 411.22, 432.92, 429.25, 411.38, 407.77, 417.42, 412.67, 427.34, 398.14] },
      velocityScore: { '1D': -3.5, '1W': -2.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.0T', pe: 23.7, revenueGrowth: 18, eps: 16.78, grossMargin: 68, dividendYield: 0.9,
      etfPresence: { AIS: false, ARTY: 1.76, BAI: false, IVEP: false, IGPT: false, IVES: 4.71, ALAI: 5.44, CHAT: 2.37, AIFD: false, SPRX: false, AOTG: 3.94 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 5, avgWeight: 3.06, proScore: 1.39, coverage: 0.455,
      price: 287.86, weeklyPrices: [323.92, 300.51, 300.57, 289.52, 287.86], weeklyChange: -11.13, sortRank: 0, periodReturns: { '1M': -21.8, '6M': 58.3, '1Y': 165.4 },
      priceHistory: { '1W': [323.92, 300.51, 300.57, 289.52, 287.86], '1M': [367.92, 367.13, 369.99, 376.23, 370.94, 339.73, 322.63, 315.67, 323.4, 327.46, 319.78, 314.18, 315.71, 323.39, 334.49, 331.44, 323.92, 300.51, 300.57, 289.52, 287.86], '6M': [181.82, 149.83, 166.87, 175.61, 163.58, 176.93, 181.23, 190.01, 202, 243.53, 253.15, 244.44, 270.06, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 322.63, 319.78, 331.44, 287.86], '1Y': [108.47, 116.61, 121.64, 124.33, 120.72, 131.12, 130.87, 144.17, 139.75, 137.4, 127.54, 129.31, 125.7, 135.71, 141.96, 139.77, 161.64, 168.88, 177.82, 183.2, 199.27, 190.71, 173.37, 170.65, 172.02, 182.54, 178.66, 154.39, 167.58, 173.95, 170.03, 175.18, 181.23, 190.01, 202, 243.53, 253.15, 244.44, 270.06, 268.41, 270.89, 250.58, 281.03, 301.16, 305.14, 305.03, 341.02, 367.13, 322.63, 319.78, 331.44, 287.86] },
      velocityScore: { '1D': 5.3, '1W': 3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$111B', pe: 72.5, revenueGrowth: 30, eps: 3.97, grossMargin: 37, dividendYield: 0.09,
      etfPresence: { AIS: 3.55, ARTY: false, BAI: 1.88, IVEP: 3.86, IGPT: false, IVES: false, ALAI: false, CHAT: 2.12, AIFD: 3.91, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 2.96, proScore: 1.35, coverage: 0.455,
      price: 337.2, weeklyPrices: [358.05, 317.06, 346.33, 341.70, 337.20], weeklyChange: -5.82, sortRank: 0, periodReturns: { '1M': 62.6, '6M': 105.2, '1Y': 268.7 },
      priceHistory: { '1W': [358.05, 317.06, 346.33, 341.7, 337.2], '1M': [207.35, 204.42, 224.09, 228.64, 232.68, 215.58, 244.26, 287.48, 297.84, 306.88, 325.33, 349.17, 342.85, 320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 337.2], '6M': [164.32, 140.24, 169.97, 179.56, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.4, 109.8, 116.48, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 325.33, 363.54, 337.2], '1Y': [91.46, 92.91, 89.63, 88.57, 97.02, 97.95, 121.68, 128.87, 174.39, 193.64, 172.45, 179.2, 187.95, 232.9, 251.88, 200.64, 209.6, 225.43, 163.55, 163.64, 173.62, 181.94, 157.79, 142.01, 154.22, 152.51, 173.7, 145.88, 167.26, 167.11, 172.57, 183.75, 163.25, 152.44, 187.67, 123.69, 128.4, 109.8, 116.48, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 183.31, 215.69, 204.42, 244.26, 325.33, 363.54, 337.2] },
      velocityScore: { '1D': -10.6, '1W': -10, '1M': null, '6M': null }, isNew: false,
      marketCap: '$58B', pe: 229.4, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 1.85, ARTY: 1.68, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 1.51, CHAT: 2.51, AIFD: false, SPRX: 7.27, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'CRDO', name: 'Credo Technology Group Holding Ltd', easyScore: 5, avgWeight: 1.77, proScore: 0.8, coverage: 0.455,
      price: 239.59, weeklyPrices: [217.50, 206.89, 222.27, 234.32, 239.59], weeklyChange: 10.15, sortRank: 0, periodReturns: { '1M': 14, '6M': 51.7, '1Y': 249.6 },
      priceHistory: { '1W': [217.5, 206.89, 222.27, 234.32, 239.59], '1M': [210.22, 198.57, 189.36, 184.54, 172.17, 156.27, 168.99, 182.98, 193.39, 218.41, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 234.32, 239.59], '6M': [157.98, 134.13, 150.19, 143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 97.3, 112.33, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.23, 214.6, 239.59], '1Y': [68.53, 79.71, 92.2, 89.37, 97.29, 98.45, 101.17, 116.01, 117.34, 121.13, 105.99, 122.73, 134, 159.32, 172.31, 144.94, 149.63, 151.15, 136.53, 150.97, 171.52, 173.16, 160.34, 141.88, 164.01, 180.92, 154.47, 138.57, 144.83, 140.24, 156.07, 153.22, 128.02, 119.96, 123.41, 124.8, 120.83, 97.3, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 165.92, 193.57, 198.57, 168.99, 221.23, 214.6, 239.59] },
      velocityScore: { '1D': 12.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$44B', pe: 130.9, revenueGrowth: 157, eps: 1.83, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: 0.81, ARTY: 1.25, BAI: 2.02, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 2.12, AIFD: false, SPRX: 2.63, AOTG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 4, avgWeight: 3.93, proScore: 1.43, coverage: 0.364,
      price: 584.8, weeklyPrices: [627.57, 593.00, 585.39, 584.59, 584.80], weeklyChange: -6.81, sortRank: 0, periodReturns: { '1M': -2.3, '6M': -10, '1Y': -16.7 },
      priceHistory: { '1W': [627.57, 593, 585.39, 584.59, 584.8], '1M': [598.86, 603, 616.63, 618.43, 614.23, 611.21, 602.61, 605.06, 607.38, 610.26, 635.26, 635.29, 632.51, 600.47, 597.63, 622.98, 627.57, 593, 585.39, 584.59, 584.8], '6M': [650.13, 649.5, 667.55, 650.41, 653.06, 620.25, 672.36, 706.41, 677.22, 639.29, 639.3, 655.08, 654.07, 627.45, 604.06, 536.38, 575.05, 662.49, 668.84, 671.34, 604.96, 603, 602.61, 635.26, 622.98, 584.8], '1Y': [702.4, 697.23, 708.68, 713.57, 727.24, 701.41, 714.8, 695.21, 771.99, 780.08, 747.72, 747.38, 748.65, 750.9, 780.25, 748.91, 727.05, 733.51, 712.07, 734, 751.67, 635.95, 609.01, 590.32, 633.61, 661.53, 652.71, 664.45, 663.29, 658.79, 641.97, 604.12, 672.36, 706.41, 677.22, 639.29, 639.3, 655.08, 654.07, 622.66, 592.92, 572.13, 612.42, 671.58, 674.72, 671.34, 604.96, 603, 602.61, 635.26, 622.98, 584.8] },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 21.3, revenueGrowth: 33, eps: 27.48, grossMargin: 82, dividendYield: 0.36,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: 4.77, IVES: 4.53, ALAI: 4.23, CHAT: 2.21, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'COHR', name: 'Coherent Corp', easyScore: 4, avgWeight: 3.79, proScore: 1.38, coverage: 0.364,
      price: 350.98, weeklyPrices: [421.90, 376.99, 401.93, 355.94, 350.98], weeklyChange: -16.81, sortRank: 0, periodReturns: { '1M': -7.6, '6M': 77.8, '1Y': 327.9 },
      priceHistory: { '1W': [421.9, 376.99, 401.93, 355.94, 350.98], '1M': [379.69, 374.01, 403.71, 404.94, 382.45, 362.83, 353.63, 358.5, 378, 377.57, 380.18, 376.95, 361.47, 362.9, 426.89, 417.43, 421.9, 376.99, 401.93, 355.94, 350.98], '6M': [197.45, 170.44, 191.37, 194.33, 178.06, 191.04, 197.76, 222.44, 242.46, 219.96, 254.86, 280.81, 260.64, 247.37, 255.05, 219.65, 255.1, 313.42, 343.79, 303.97, 335.73, 374.01, 353.63, 380.18, 417.43, 350.98], '1Y': [82.02, 79.77, 85.63, 88.36, 93.72, 100.28, 98.72, 107.23, 107.15, 114.01, 86.55, 90.71, 95.62, 103.51, 108.05, 106.57, 112.79, 122.35, 115.96, 121.52, 138.06, 134.63, 156.67, 142.94, 154, 177.35, 198.5, 175.71, 191.72, 186.36, 185.18, 193.46, 197.76, 222.44, 242.46, 219.96, 254.86, 280.81, 260.64, 245.8, 272.33, 238.21, 281.79, 308.2, 350.47, 303.97, 335.73, 374.01, 353.63, 380.18, 417.43, 350.98] },
      velocityScore: { '1D': -2.1, '1W': 2.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$69B', pe: 167.1, revenueGrowth: 21, eps: 2.1, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 0.91, ARTY: false, BAI: false, IVEP: 3.82, IGPT: false, IVES: false, ALAI: false, CHAT: 1.36, AIFD: false, SPRX: 9.07, AOTG: false },
      tonyNote: 'Coherent Corp appears in 4 of 11 AI & ML ETFs (36% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 4, avgWeight: 3.5, proScore: 1.27, coverage: 0.364,
      price: 838.12, weeklyPrices: [945.08, 863.66, 895.40, 821.76, 838.12], weeklyChange: -11.32, sortRank: 0, periodReturns: { '1M': -20.4, '6M': 129, '1Y': 922.6 },
      priceHistory: { '1W': [945.08, 863.66, 895.4, 821.76, 838.12], '1M': [1053.09, 992.37, 1030.37, 1001.81, 970.7, 884.98, 890.09, 868.07, 964.5, 946.9, 902.31, 860.62, 854.96, 905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 838.12], '6M': [366, 320.25, 395.92, 386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 600.42, 688.27, 694.43, 672, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 890.09, 902.31, 938, 838.12], '1Y': [81.96, 86.35, 91.77, 91.24, 92.62, 102.64, 102.85, 109.85, 110.01, 120.23, 115.89, 125.84, 141.91, 164.88, 171.5, 159.11, 169.75, 159.76, 163.23, 168.5, 214.28, 232.75, 253.81, 268.92, 308.28, 327.85, 372.09, 337.13, 390.77, 357.05, 339.87, 356.83, 332.45, 423.42, 577.15, 600.42, 688.27, 694.43, 672, 649.56, 801.99, 702.76, 896.02, 824.01, 873.6, 791.37, 994.56, 992.37, 890.09, 902.31, 938, 838.12] },
      velocityScore: { '1D': 1.6, '1W': 2.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$65B', pe: 147.8, revenueGrowth: 90, eps: 5.67, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.77, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.41, AIFD: 6.14, SPRX: 3.7, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 4 of 11 AI & ML ETFs (36% coverage) with average weight 3.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 4, avgWeight: 3.41, proScore: 1.24, coverage: 0.364,
      price: 107.3, weeklyPrices: [111.78, 99.17, 110.27, 107.92, 107.30], weeklyChange: -4, sortRank: 0, periodReturns: { '1M': -17.1, '6M': 163.1, '1Y': 386 },
      priceHistory: { '1W': [111.78, 99.17, 110.27, 107.92, 107.3], '1M': [129.44, 120.61, 120.29, 115.93, 108.77, 108.17, 110.8, 118.96, 118.5, 119.84, 121.77, 120.89, 114.68, 109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.3], '6M': [40.78, 36.05, 36.16, 39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 46.12, 43.1, 46.78, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 121.77, 112.71, 107.3], '1Y': [22.08, 20.8, 22.2, 21.88, 23.82, 22.8, 22.63, 20.34, 20.41, 22.22, 23.54, 24.85, 24.61, 24.61, 30.57, 33.99, 37.3, 37.8, 36.84, 38.16, 41.34, 38.38, 37.89, 35.11, 36.81, 40.5, 39.51, 36.28, 36.2, 39.37, 44.06, 48.56, 42.49, 48.81, 50.24, 46.18, 46.12, 43.1, 46.78, 44.06, 44.06, 44.13, 58.95, 64.94, 65.27, 84.52, 108.15, 120.61, 110.8, 121.77, 112.71, 107.3] },
      velocityScore: { '1D': null, '1W': 18.1, '1M': null, '6M': null }, isNew: true,
      marketCap: '$539B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.07, ARTY: false, BAI: 2.8, IVEP: false, IGPT: 6.65, IVES: false, ALAI: false, CHAT: 1.13, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 4, avgWeight: 3.36, proScore: 1.22, coverage: 0.364,
      price: 200.1, weeklyPrices: [236.34, 213.68, 211.82, 205.81, 200.10], weeklyChange: -15.33, sortRank: 0, periodReturns: { '1M': 3.2, '6M': -10.3, '1Y': 12.7 },
      priceHistory: { '1W': [236.34, 213.68, 211.82, 205.81, 200.1], '1M': [193.84, 186.83, 189.76, 195.61, 192.95, 186.61, 181.46, 188.16, 189.77, 192.08, 190.96, 203.7, 225.78, 248.15, 244.58, 230.33, 236.34, 213.68, 211.82, 205.81, 200.1], '6M': [223.01, 178.46, 197.49, 195.71, 198.52, 191.09, 182.44, 160.06, 156.59, 153.97, 146.14, 149.01, 149.4, 155.97, 154.34, 138.8, 143.17, 163, 181.17, 165.96, 185.35, 186.83, 181.46, 190.96, 230.33, 200.1], '1Y': [177.48, 208.18, 210.72, 229.98, 235, 248.75, 242.83, 250.6, 256.43, 244.18, 235.06, 235.81, 223, 307.86, 296.62, 291.33, 288.78, 296.96, 313, 280.07, 275.3, 250.31, 226.99, 225.53, 204.96, 214.33, 198.85, 180.03, 197.99, 192.59, 204.68, 179.92, 182.44, 160.06, 156.59, 153.97, 146.14, 149.01, 149.4, 154.69, 147.09, 147.11, 143.66, 169.81, 187.5, 165.96, 185.35, 186.83, 181.46, 190.96, 230.33, 200.1] },
      velocityScore: { '1D': 0.8, '1W': -4.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$575B', pe: 35.9, revenueGrowth: 22, eps: 5.58, grossMargin: 67, dividendYield: 0.97,
      etfPresence: { AIS: false, ARTY: 4.1, BAI: false, IVEP: false, IGPT: false, IVES: 4.17, ALAI: false, CHAT: 1.87, AIFD: false, SPRX: false, AOTG: 3.31 },
      tonyNote: 'Oracle lands in 3 AI ETFs on the strength of its cloud database and AI infrastructure contracts. Revenue grew 22%, 67% gross margin, P/E of 40x. The 17.5% weekly return following a major earnings beat shows how quickly sentiment can reprice; the weight score at 2.04% is still modest, meaning ETF managers have started building positions but conviction is not yet deep.',
    },
    {
      ticker: 'ARM', name: 'ARM Holdings PLC', easyScore: 4, avgWeight: 3.24, proScore: 1.18, coverage: 0.364,
      price: 318.87, weeklyPrices: [393.44, 342.93, 346.39, 324.86, 318.87], weeklyChange: -18.95, sortRank: 0, periodReturns: { '1M': 50, '6M': 125.3, '1Y': 126.7 },
      priceHistory: { '1W': [393.44, 342.93, 346.39, 324.86, 318.87], '1M': [212.65, 207.92, 221.21, 228.5, 209.16, 215.12, 223.15, 256.73, 298.23, 306.51, 302.71, 335.27, 353.29, 408.85, 402.71, 411.83, 393.44, 342.93, 346.39, 324.86, 318.87], '6M': [141.52, 114.58, 111.55, 114.73, 111.79, 105.78, 114.73, 106.93, 124.61, 126.89, 128.14, 121.72, 120.55, 121.7, 136.89, 136.96, 143.86, 161.22, 175.49, 198.65, 208.84, 207.92, 223.15, 302.71, 411.83, 318.87], '1Y': [140.63, 144.72, 157.31, 154.63, 148.55, 157.18, 159.99, 163.32, 136.12, 141.6, 131.16, 140.66, 135.48, 154.7, 146.54, 140.65, 152.15, 170.66, 171.19, 166.6, 170.39, 160.19, 148.75, 136.99, 132.61, 140.49, 136.14, 113.51, 110.27, 116.11, 111.14, 107.17, 114.73, 106.93, 124.61, 126.89, 128.14, 121.72, 120.55, 127.31, 134.96, 151.28, 148.91, 159.34, 196.57, 198.65, 208.84, 207.92, 223.15, 302.71, 411.83, 318.87] },
      velocityScore: { '1D': -13.9, '1W': -13.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$341B', pe: 379.6, revenueGrowth: 20, eps: 0.84, grossMargin: 98, dividendYield: null,
      etfPresence: { AIS: 2.02, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 0.44, CHAT: 2.55, AIFD: false, SPRX: 7.94, AOTG: false },
      tonyNote: 'Arm Holdings is held across Broad Tech and AI ETFs as the CPU architecture licensor embedded in every mobile device and increasingly in AI inference chips and data center CPUs. Revenue grew and the royalty model is high-margin; the weight score reflects consistent institutional positioning as the AI chip design ecosystem expands on Arm cores.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 4, avgWeight: 2.83, proScore: 1.03, coverage: 0.364,
      price: 491.02, weeklyPrices: [575.50, 511.72, 526.93, 517.72, 491.02], weeklyChange: -14.68, sortRank: 0, periodReturns: { '1M': -4.8, '6M': 169.9, '1Y': 777.6 },
      priceHistory: { '1W': [575.5, 511.72, 526.93, 517.72, 491.02], '1M': [515.83, 488.74, 494.09, 489.15, 482.02, 458.68, 455.8, 459.62, 486.46, 484.28, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 491.02], '6M': [181.95, 166.26, 179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 594.11, 491.02], '1Y': [55.95, 58.57, 62.55, 65.78, 65.06, 67.02, 69.02, 71.43, 73.78, 76.07, 75.64, 80.67, 90.49, 96.15, 105.15, 107.21, 131.26, 119.7, 125.92, 125.72, 141.38, 160.1, 166.11, 153.97, 157.74, 161, 187.2, 175.01, 181.54, 187.88, 212.14, 222.97, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 390.99, 465.26, 488.74, 455.8, 530.6, 594.11, 491.02] },
      velocityScore: { '1D': -10.4, '1W': -9.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$169B', pe: 29.4, revenueGrowth: 46, eps: 16.72, grossMargin: 45, dividendYield: 0.12,
      etfPresence: { AIS: 1.51, ARTY: 2.62, BAI: 2.88, IVEP: false, IGPT: false, IVES: false, ALAI: 4.31, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 6.08, proScore: 6.08, coverage: 1,
      price: 901.2, weeklyPrices: [996.00, 864.01, 949.28, 935.89, 901.20], weeklyChange: -9.52, sortRank: 0, periodReturns: { '1M': 13.3, '6M': 241.7, '1Y': 689.6 },
      priceHistory: { '1W': [996, 864.01, 949.28, 935.89, 901.2], '1M': [795.33, 766.58, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 901.2], '6M': [263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 901.2], '1Y': [114.14, 120.34, 127.25, 121.74, 123.11, 113.26, 111.73, 114.74, 108.78, 124.27, 117.21, 117.75, 124.21, 150.57, 168.89, 156.83, 183.75, 192.33, 202.53, 206.71, 226.63, 237.5, 244.9, 225.92, 230.26, 226.65, 258.46, 248.55, 284.79, 312.15, 345.87, 365, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 901.2] },
      velocityScore: { '1D': -1.3, '1W': -13, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.0T', pe: 42.6, revenueGrowth: 196, eps: 21.15, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { SOXX: 11.34, PSI: 5.58, XSD: 3.53, DRAM: 3.86 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.85, proScore: 4.39, coverage: 0.75,
      price: 466.25, weeklyPrices: [523.20, 466.38, 490.33, 475.51, 466.25], weeklyChange: -10.88, sortRank: 0, periodReturns: { '1M': 1.6, '6M': 110.6, '1Y': 278.3 },
      priceHistory: { '1W': [523.2, 466.38, 490.33, 475.51, 466.25], '1M': [458.79, 448.29, 445.5, 449.7, 424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 466.25], '6M': [221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 466.25], '1Y': [123.24, 127.1, 143.4, 138.52, 144.16, 160.41, 162.12, 179.51, 163.12, 184.42, 165.2, 167.13, 161.79, 155.67, 157.92, 161.27, 169.73, 232.89, 234.56, 234.99, 264.33, 256.33, 258.89, 223.55, 214.24, 215.98, 221.43, 201.06, 214.99, 221.08, 207.69, 231.92, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 466.25] },
      velocityScore: { '1D': -1.3, '1W': -13.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$760B', pe: 155.4, revenueGrowth: 38, eps: 3, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 8.85, PSI: 5.04, XSD: 3.66, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.71, proScore: 3.53, coverage: 0.75,
      price: 107.3, weeklyPrices: [111.78, 99.17, 110.27, 107.92, 107.30], weeklyChange: -4, sortRank: 0, periodReturns: { '1M': -17.1, '6M': 163.1, '1Y': 386 },
      priceHistory: { '1W': [111.78, 99.17, 110.27, 107.92, 107.3], '1M': [129.44, 120.61, 120.29, 115.93, 108.77, 108.17, 110.8, 118.96, 118.5, 119.84, 121.77, 120.89, 114.68, 109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.3], '6M': [40.78, 36.05, 36.16, 39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 46.12, 43.1, 46.78, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 121.77, 112.71, 107.3], '1Y': [22.08, 20.8, 22.2, 21.88, 23.82, 22.8, 22.63, 20.34, 20.41, 22.22, 23.54, 24.85, 24.61, 24.61, 30.57, 33.99, 37.3, 37.8, 36.84, 38.16, 41.34, 38.38, 37.89, 35.11, 36.81, 40.5, 39.51, 36.28, 36.2, 39.37, 44.06, 48.56, 42.49, 48.81, 50.24, 46.18, 46.12, 43.1, 46.78, 44.06, 44.06, 44.13, 58.95, 64.94, 65.27, 84.52, 108.15, 120.61, 110.8, 121.77, 112.71, 107.3] },
      velocityScore: { '1D': -0.6, '1W': 62.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$539B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 5.91, PSI: 4.67, XSD: 3.55, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 4.27, proScore: 3.2, coverage: 0.75,
      price: 205.43, weeklyPrices: [218.66, 205.10, 208.64, 208.19, 205.43], weeklyChange: -6.05, sortRank: 0, periodReturns: { '1M': -6.4, '6M': 11.8, '1Y': 42.7 },
      priceHistory: { '1W': [218.66, 205.1, 208.64, 208.19, 205.43], '1M': [219.44, 220.78, 225.83, 235.74, 225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 205.43], '6M': [183.78, 170.94, 188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 214.75, 205.43], '1Y': [143.96, 144.12, 154.31, 157.25, 164.1, 173, 173.74, 179.27, 179.42, 181.59, 175.4, 181.6, 171.66, 177.17, 176.24, 177.69, 188.89, 192.57, 181.81, 182.16, 207.04, 195.21, 193.8, 186.52, 180.26, 183.38, 180.93, 174.14, 190.53, 188.12, 184.94, 178.07, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 213.17, 196.5, 220.78, 220.61, 212.6, 214.75, 205.43] },
      velocityScore: { '1D': 0.9, '1W': 14.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.0T', pe: 31.4, revenueGrowth: 85, eps: 6.54, grossMargin: 74, dividendYield: 0.48,
      etfPresence: { SOXX: 5.87, PSI: 5.18, XSD: 1.77, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.33, proScore: 2.5, coverage: 0.75,
      price: 398.28, weeklyPrices: [428.76, 401.39, 403.89, 404.62, 398.28], weeklyChange: -7.11, sortRank: 0, periodReturns: { '1M': -5.8, '6M': 41.4, '1Y': 70.7 },
      priceHistory: { '1W': [428.76, 401.39, 403.89, 404.62, 398.28], '1M': [422.73, 419.65, 432.39, 426.79, 417.49, 418.58, 414.31, 398.05, 384.21, 397.07, 416.88, 419.01, 413.85, 402.69, 423.2, 437.67, 428.76, 401.39, 403.89, 404.62, 398.28], '6M': [281.57, 271.04, 277.56, 273.74, 300.93, 300.25, 304.01, 316.86, 322.97, 337.51, 356.09, 338.99, 318.81, 310.92, 312.19, 303.1, 327.41, 348.6, 375.27, 383.26, 404.77, 419.65, 414.31, 416.88, 437.67, 398.28], '1Y': [233.34, 227.44, 234.68, 245.15, 245.13, 240.97, 226.37, 231.11, 220.69, 237.63, 244.87, 255.5, 246.11, 248.24, 249.05, 247.53, 241.67, 237.88, 241.61, 243.29, 235.04, 236, 241.44, 232.2, 257.92, 277.26, 283.39, 274.92, 276.84, 277.29, 293.86, 295.67, 304.01, 316.86, 322.97, 337.51, 356.09, 338.99, 318.81, 313.66, 321.83, 318.14, 346.21, 347.94, 381.42, 383.26, 404.77, 419.65, 414.31, 416.88, 437.67, 398.28] },
      velocityScore: { '1D': 1.6, '1W': 115.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$194B', pe: 59.3, revenueGrowth: 37, eps: 6.72, grossMargin: 64, dividendYield: 1.09,
      etfPresence: { SOXX: 2.84, PSI: 5.16, XSD: 2, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 6.41, proScore: 3.21, coverage: 0.5,
      price: 262.72, weeklyPrices: [316.43, 263.47, 288.85, 266.88, 262.72], weeklyChange: -16.97, sortRank: 0, periodReturns: { '1M': 53.8, '6M': 184.1, '1Y': 281.6 },
      priceHistory: { '1W': [316.43, 263.47, 288.85, 266.88, 262.72], '1M': [170.84, 164.5, 177.95, 182.58, 176.89, 168.93, 176.27, 186.8, 190.69, 196.33, 198.7, 204.83, 205, 219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 266.88, 262.72], '6M': [92.47, 81.7, 86.49, 89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 77.51, 93.3, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 198.7, 301.65, 262.72], '1Y': [68.84, 69.99, 75.93, 74.25, 73.36, 72.01, 74.04, 81.74, 75.32, 79.32, 71.22, 74.79, 64.1, 66.59, 74.23, 83.81, 86.2, 90.68, 88.23, 82.77, 90.15, 92.9, 89.33, 81.32, 87.72, 98.19, 89.43, 84.47, 86.34, 90.23, 82.89, 79.8, 81.77, 78.66, 82.35, 79.01, 78.39, 77.51, 93.3, 90.79, 92.36, 99.05, 114.45, 134.6, 157.32, 153.23, 168.75, 164.5, 176.27, 198.7, 301.65, 262.72] },
      velocityScore: { '1D': -5.3, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$230B', pe: 90.3, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { SOXX: 8.16, PSI: false, XSD: 4.66, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 5.43, proScore: 2.71, coverage: 0.5,
      price: 503.89, weeklyPrices: [501.70, 453.01, 492.17, 499.21, 503.89], weeklyChange: 0.44, sortRank: 0, periodReturns: { '1M': 13.6, '6M': 83.1, '1Y': 190 },
      priceHistory: { '1W': [501.7, 453.01, 492.17, 499.21, 503.89], '1M': [443.62, 431.2, 436.61, 440.56, 436.62, 413.57, 406.91, 426.85, 427.36, 432.16, 448.25, 449.68, 450.06, 458.17, 490.05, 500.77, 501.7, 453.01, 492.17, 499.21, 503.89], '6M': [275.15, 248.27, 260.78, 268.87, 301.18, 327.01, 319.46, 328.4, 330.57, 359.13, 377.93, 351.32, 345.88, 346.18, 361.79, 323.12, 354.31, 395.64, 394.33, 381.11, 410.82, 431.2, 406.91, 448.25, 500.77, 503.89], '1Y': [173.77, 174.09, 183.07, 190.01, 198.03, 192.52, 188.12, 189.39, 178.14, 190.03, 160.96, 164.39, 158.24, 170.15, 189.76, 199.6, 223.59, 220.3, 227.72, 228.47, 235.75, 240.89, 230.73, 235.13, 249.97, 269.44, 270.11, 253.5, 261.9, 284.32, 307.24, 318.23, 319.46, 328.4, 330.57, 359.13, 377.93, 351.32, 345.88, 352.46, 373.99, 341.79, 385.72, 394.26, 403.48, 381.11, 410.82, 431.2, 406.91, 448.25, 500.77, 503.89] },
      velocityScore: { '1D': 2.3, '1W': 26, '1M': null, '6M': null }, isNew: false,
      marketCap: '$400B', pe: 47.4, revenueGrowth: 11, eps: 10.63, grossMargin: 49, dividendYield: 0.42,
      etfPresence: { SOXX: 4.99, PSI: 5.87, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 4.59, proScore: 2.29, coverage: 0.5,
      price: 2153.48, weeklyPrices: [2131.10, 1929.20, 2108.06, 2139.37, 2153.48], weeklyChange: 1.05, sortRank: 0, periodReturns: { '1M': 16.7, '6M': 73.8, '1Y': 151.4 },
      priceHistory: { '1W': [2131.1, 1929.2, 2108.06, 2139.37, 2153.48], '1M': [1845.19, 1811.35, 1849.71, 1892.94, 1804.32, 1756.45, 1740.58, 1829.47, 1842.18, 1888.38, 1957.19, 1927.63, 1921.71, 1940.04, 2045.2, 2125.11, 2131.1, 1929.2, 2108.06, 2139.37, 2153.48], '6M': [1238.91, 1172.02, 1276.99, 1274.47, 1400, 1567.82, 1543.03, 1410.45, 1440.16, 1470.19, 1506.65, 1441.35, 1452.94, 1438.24, 1511.43, 1382.58, 1548.85, 1795.91, 1785.37, 1808.97, 1732.9, 1811.35, 1740.58, 1957.19, 2125.11, 2153.48], '1Y': [856.59, 893, 893.46, 921.1, 928.62, 937.08, 904.18, 924.99, 888.28, 949.48, 878.44, 888.89, 873.29, 959.28, 1046.69, 1059.1, 1139.26, 1053.47, 1098.8, 1159, 1235.28, 1227.1, 1198.97, 1167.46, 1159.07, 1208.08, 1246.18, 1222.39, 1279.6, 1352.45, 1428.17, 1486.18, 1543.03, 1410.45, 1440.16, 1470.19, 1506.65, 1441.35, 1452.94, 1481.35, 1566.19, 1472.41, 1672.34, 1748.11, 1812.06, 1808.97, 1732.9, 1811.35, 1740.58, 1957.19, 2125.11, 2153.48] },
      velocityScore: { '1D': 1.8, '1W': 24.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$281B', pe: 61, revenueGrowth: 12, eps: 35.3, grossMargin: 61, dividendYield: 0.43,
      etfPresence: { SOXX: 3.5, PSI: 5.68, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 4.46, proScore: 2.23, coverage: 0.5,
      price: 326.52, weeklyPrices: [336.41, 303.28, 324.45, 327.16, 326.52], weeklyChange: -2.94, sortRank: 0, periodReturns: { '1M': 10.3, '6M': 94.1, '1Y': 258.8 },
      priceHistory: { '1W': [336.41, 303.28, 324.45, 327.16, 326.52], '1M': [296.05, 289.24, 295.44, 299.15, 284.72, 277.96, 273.38, 292.09, 302.24, 305.35, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 326.52], '6M': [168.26, 154.98, 177.33, 185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.58, 244.25, 217.27, 215.23, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 273.38, 318.93, 343.71, 326.52], '1Y': [91, 92.66, 96.02, 98.83, 101.06, 100.79, 97.78, 99.09, 95.94, 106.74, 99.15, 103.67, 100.42, 115.58, 126.32, 128.13, 146.99, 141, 142.37, 147.54, 160.67, 165.05, 161.42, 148.8, 155.14, 157.09, 168.71, 164.7, 178.07, 194.76, 220.4, 222.41, 222.87, 237.5, 229.28, 235.58, 244.25, 217.27, 215.23, 226.47, 238.84, 213.66, 246.49, 265.16, 265.55, 251.23, 275.8, 289.24, 273.38, 318.93, 343.71, 326.52] },
      velocityScore: { '1D': 1.8, '1W': 17.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$408B', pe: 61.6, revenueGrowth: 24, eps: 5.3, grossMargin: 50, dividendYield: 0.32,
      etfPresence: { SOXX: 3.49, PSI: 5.42, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 3.97, proScore: 1.99, coverage: 0.5,
      price: 376.43, weeklyPrices: [418.91, 385.73, 396.60, 392.16, 376.43], weeklyChange: -10.14, sortRank: 0, periodReturns: { '1M': -12.1, '6M': -8.8, '1Y': 53.9 },
      priceHistory: { '1W': [418.91, 385.73, 396.6, 392.16, 376.43], '1M': [428.43, 419.3, 416.79, 439.79, 425.19, 420.71, 411.07, 417.76, 414.57, 414.14, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 376.43], '6M': [412.97, 326.02, 350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 479.23, 376.43], '1Y': [244.63, 249.37, 264.65, 269.9, 275.4, 286.45, 288.71, 302.62, 301.67, 309.09, 291.17, 300.25, 306.1, 359.63, 345.35, 336.1, 338.18, 345.02, 354.15, 344.29, 385.98, 358.98, 355.22, 354.42, 397.57, 381.03, 406.37, 329.88, 352.13, 343.42, 352.21, 332.6, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 399.83, 427.36, 419.3, 411.07, 421.86, 479.23, 376.43] },
      velocityScore: { '1D': 1, '1W': -41.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 62.7, revenueGrowth: 48, eps: 6, grossMargin: 76, dividendYield: 0.66,
      etfPresence: { SOXX: 6.13, PSI: false, XSD: 1.81, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 3.36, proScore: 1.68, coverage: 0.5,
      price: 337.2, weeklyPrices: [358.05, 317.06, 346.33, 341.70, 337.20], weeklyChange: -5.82, sortRank: 0, periodReturns: { '1M': 62.6, '6M': 105.2, '1Y': 268.7 },
      priceHistory: { '1W': [358.05, 317.06, 346.33, 341.7, 337.2], '1M': [207.35, 204.42, 224.09, 228.64, 232.68, 215.58, 244.26, 287.48, 297.84, 306.88, 325.33, 349.17, 342.85, 320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 337.2], '6M': [164.32, 140.24, 169.97, 179.56, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.4, 109.8, 116.48, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 325.33, 363.54, 337.2], '1Y': [91.46, 92.91, 89.63, 88.57, 97.02, 97.95, 121.68, 128.87, 174.39, 193.64, 172.45, 179.2, 187.95, 232.9, 251.88, 200.64, 209.6, 225.43, 163.55, 163.64, 173.62, 181.94, 157.79, 142.01, 154.22, 152.51, 173.7, 145.88, 167.26, 167.11, 172.57, 183.75, 163.25, 152.44, 187.67, 123.69, 128.4, 109.8, 116.48, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 183.31, 215.69, 204.42, 244.26, 325.33, 363.54, 337.2] },
      velocityScore: { '1D': 1.2, '1W': 5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$58B', pe: 229.4, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.4, PSI: false, XSD: 4.33, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 3.01, proScore: 1.5, coverage: 0.5,
      price: 199.33, weeklyPrices: [242.57, 215.94, 217.77, 205.42, 199.33], weeklyChange: -17.83, sortRank: 0, periodReturns: { '1M': -16.1, '6M': 9.4, '1Y': 25.3 },
      priceHistory: { '1W': [242.57, 215.94, 217.77, 205.42, 199.33], '1M': [237.53, 210.31, 213.17, 200.08, 201.49, 203.64, 195.61, 202.51, 213.41, 238.16, 233.4, 243.29, 251.02, 228.99, 240.84, 250.01, 242.57, 215.94, 217.77, 205.42, 199.33], '6M': [182.21, 172.34, 174.77, 172.98, 177.78, 159.42, 154.52, 152.62, 138.93, 142.63, 144.78, 138.13, 135.2, 129.39, 128.35, 127.07, 124.07, 132.84, 135.56, 150, 186.55, 210.31, 195.61, 233.4, 250.01, 199.33], '1Y': [159.13, 154.46, 155.93, 162.32, 159.09, 152.61, 158.84, 159.06, 145.84, 156.59, 155.44, 159.77, 159.71, 161.51, 168.13, 169.68, 168.85, 165.66, 164.08, 170.03, 178.67, 179.72, 176.67, 166.11, 165.14, 174.35, 181.27, 174.19, 174.81, 176.31, 169.27, 154.07, 154.52, 152.62, 138.93, 142.63, 144.78, 138.13, 135.2, 131.59, 128.67, 128.78, 127.51, 133.05, 136.07, 150, 186.55, 210.31, 195.61, 233.4, 250.01, 199.33] },
      velocityScore: { '1D': -3.8, '1W': -7.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$210B', pe: 21.4, revenueGrowth: -4, eps: 9.31, grossMargin: 55, dividendYield: 1.79,
      etfPresence: { SOXX: 3.6, PSI: false, XSD: 2.41, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 2.85, proScore: 1.42, coverage: 0.5,
      price: 283.39, weeklyPrices: [305.37, 285.06, 290.90, 288.63, 283.39], weeklyChange: -7.2, sortRank: 0, periodReturns: { '1M': -4.8, '6M': 56, '1Y': 40.1 },
      priceHistory: { '1W': [305.37, 285.06, 290.9, 288.63, 283.39], '1M': [297.76, 295.17, 306.34, 308.17, 302.73, 300.6, 302.31, 304.88, 298.39, 309.21, 317.45, 315.95, 305.68, 293.2, 308.12, 308.59, 305.37, 285.06, 290.9, 288.63, 283.39], '6M': [181.67, 174.49, 177.13, 177.52, 190.31, 191.58, 196.59, 225.01, 218.77, 225.69, 213.35, 202.67, 197.46, 194.13, 188.63, 186.42, 199.74, 218.87, 233.15, 265, 281, 295.17, 302.31, 317.45, 308.59, 283.39], '1Y': [202.29, 197.69, 205.38, 215.59, 219.66, 216.59, 185.69, 189.52, 185.91, 193.29, 200.77, 205.47, 187.29, 184.35, 181.62, 182.04, 182.32, 178.96, 175.48, 172.19, 160.26, 163.57, 163.09, 157.09, 165.35, 180.12, 181.67, 176.19, 176.88, 177.17, 189.07, 189.59, 196.59, 225.01, 218.77, 225.69, 213.35, 202.67, 197.46, 194.45, 194.63, 194.14, 208.9, 216.29, 236.31, 265, 281, 295.17, 302.31, 317.45, 308.59, 283.39] },
      velocityScore: { '1D': 1.4, '1W': -43.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$258B', pe: 48.4, revenueGrowth: 19, eps: 5.86, grossMargin: 57, dividendYield: 1.97,
      etfPresence: { SOXX: 3.4, PSI: false, XSD: 2.29, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.81, proScore: 1.4, coverage: 0.5,
      price: 289.22, weeklyPrices: [322.22, 295.96, 301.14, 297.41, 289.22], weeklyChange: -10.24, sortRank: 0, periodReturns: { '1M': -5.5, '6M': 25.3, '1Y': 32.2 },
      priceHistory: { '1W': [322.22, 295.96, 301.14, 297.41, 289.22], '1M': [305.99, 294.23, 298.41, 294.17, 291.5, 291.68, 294.28, 310.15, 299.38, 316.47, 329.24, 330.28, 321.35, 311.38, 323.62, 321.88, 322.22, 295.96, 301.14, 297.41, 289.22], '6M': [230.78, 223.23, 225.26, 221.28, 241.15, 237.11, 231.05, 231.08, 228.91, 245.09, 234.63, 215.25, 203.03, 191.89, 193.39, 187.39, 195.12, 209.89, 224.5, 230.39, 292.35, 294.23, 294.28, 329.24, 321.88, 289.22], '1Y': [218.72, 212.83, 216.28, 231.15, 233.19, 224.5, 224.43, 220.94, 205.92, 230.52, 228.77, 237.67, 225.39, 223.21, 226.51, 226.81, 227.71, 221.42, 217.41, 220.73, 204.71, 210.44, 204.08, 190.06, 193.76, 226.16, 231.83, 222.08, 222.87, 223.88, 238.33, 230.7, 231.05, 231.08, 228.91, 245.09, 234.63, 215.25, 203.03, 194.02, 196.4, 196.86, 204.27, 209.39, 225.75, 230.39, 292.35, 294.23, 294.28, 329.24, 321.88, 289.22] },
      velocityScore: { '1D': 0.7, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$73B', pe: 27.6, revenueGrowth: 12, eps: 10.47, grossMargin: 56, dividendYield: 1.36,
      etfPresence: { SOXX: 3.27, PSI: false, XSD: 2.35, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.8, proScore: 1.4, coverage: 0.5,
      price: 1499.45, weeklyPrices: [1652.60, 1481.05, 1559.18, 1531.98, 1499.45], weeklyChange: -9.27, sortRank: 0, periodReturns: { '1M': -9.7, '6M': 53.2, '1Y': 104.9 },
      priceHistory: { '1W': [1652.6, 1481.05, 1559.18, 1531.98, 1499.45], '1M': [1661.1, 1599.52, 1650.35, 1613.97, 1550.02, 1486.33, 1468.11, 1553.27, 1561.25, 1589.81, 1620.17, 1633.17, 1566.21, 1542.39, 1624.99, 1689.89, 1652.6, 1481.05, 1559.18, 1531.98, 1499.45], '6M': [979.02, 912.25, 953.25, 936.31, 958.97, 1033.17, 1068.14, 1173.22, 1206.18, 1173.18, 1213.67, 1074.37, 1055.82, 1077.4, 1076.35, 1002.34, 1191.22, 1363.42, 1527.95, 1504.08, 1588.12, 1599.52, 1468.11, 1620.17, 1689.89, 1499.45], '1Y': [731.84, 690.87, 722.82, 764.4, 740.45, 713.57, 713, 730.54, 805.85, 861.8, 826.27, 866.32, 848.11, 840.38, 917.78, 891.39, 930.51, 979.25, 1026.83, 1070.8, 1094.08, 1000.15, 958.35, 884.65, 924.95, 952.74, 981.48, 929.48, 946.32, 955.03, 967.16, 1034.49, 1068.14, 1173.22, 1206.18, 1173.18, 1213.67, 1074.37, 1055.82, 1066.66, 1101.59, 1093.35, 1312.94, 1353, 1522.04, 1504.08, 1588.12, 1599.52, 1468.11, 1620.17, 1689.89, 1499.45] },
      velocityScore: { '1D': 0.7, '1W': 2.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$74B', pe: 107.6, revenueGrowth: 26, eps: 13.94, grossMargin: 55, dividendYield: 0.52,
      etfPresence: { SOXX: 3.35, PSI: false, XSD: 2.25, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 2.74, proScore: 1.37, coverage: 0.5,
      price: 112.91, weeklyPrices: [131.82, 117.26, 120.90, 117.00, 112.91], weeklyChange: -14.35, sortRank: 0, periodReturns: { '1M': 5.3, '6M': 104.9, '1Y': 109.9 },
      priceHistory: { '1W': [131.82, 117.26, 120.9, 117, 112.91], '1M': [107.24, 104.11, 115.71, 118.37, 113.11, 109.43, 106.02, 110.21, 109.61, 116.2, 124.89, 123.77, 120.62, 120.92, 128.64, 133.93, 131.82, 117.26, 120.9, 117, 112.91], '6M': [55.1, 53.33, 55.08, 56.7, 62.16, 60.33, 61.13, 61.53, 65.1, 71.96, 70.03, 63.42, 59.59, 59.88, 59.89, 55.66, 63.79, 72.05, 86.91, 93.3, 102.67, 104.11, 106.02, 124.89, 133.93, 112.91], '1Y': [53.8, 52.94, 53.74, 55.95, 59.52, 59.41, 55.44, 58.05, 46.98, 51.89, 49.47, 51.25, 48.06, 49.02, 51.83, 49.77, 48.74, 49.97, 52.97, 51.78, 51.4, 50.08, 49.27, 46.12, 49.64, 54.79, 55.97, 54.34, 54.93, 58.69, 58.75, 60.06, 61.13, 61.53, 65.1, 71.96, 70.03, 63.42, 59.59, 60.98, 62.34, 61.92, 68.38, 72.43, 88.99, 93.3, 102.67, 104.11, 106.02, 124.89, 133.93, 112.91] },
      velocityScore: { '1D': -0.7, '1W': -0.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$44B', pe: 83, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.37, PSI: false, XSD: 3.11, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.57, proScore: 1.29, coverage: 0.5,
      price: 239.59, weeklyPrices: [217.50, 206.89, 222.27, 234.32, 239.59], weeklyChange: 10.15, sortRank: 0, periodReturns: { '1M': 14, '6M': 51.7, '1Y': 249.6 },
      priceHistory: { '1W': [217.5, 206.89, 222.27, 234.32, 239.59], '1M': [210.22, 198.57, 189.36, 184.54, 172.17, 156.27, 168.99, 182.98, 193.39, 218.41, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 234.32, 239.59], '6M': [157.98, 134.13, 150.19, 143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 97.3, 112.33, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.23, 214.6, 239.59], '1Y': [68.53, 79.71, 92.2, 89.37, 97.29, 98.45, 101.17, 116.01, 117.34, 121.13, 105.99, 122.73, 134, 159.32, 172.31, 144.94, 149.63, 151.15, 136.53, 150.97, 171.52, 173.16, 160.34, 141.88, 164.01, 180.92, 154.47, 138.57, 144.83, 140.24, 156.07, 153.22, 128.02, 119.96, 123.41, 124.8, 120.83, 97.3, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 165.92, 193.57, 198.57, 168.99, 221.23, 214.6, 239.59] },
      velocityScore: { '1D': 8.4, '1W': 12.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$44B', pe: 130.9, revenueGrowth: 157, eps: 1.83, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 1.95, PSI: false, XSD: 3.19, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.35, proScore: 1.18, coverage: 0.5,
      price: 89.06, weeklyPrices: [96.30, 88.34, 91.37, 91.47, 89.06], weeklyChange: -7.52, sortRank: 0, periodReturns: { '1M': -10.1, '6M': 31.2, '1Y': 28 },
      priceHistory: { '1W': [96.3, 88.34, 91.37, 91.47, 89.06], '1M': [99.03, 97.7, 96.71, 97.04, 93.85, 92.76, 91.81, 94.02, 91.11, 93.43, 96.85, 96.04, 94.65, 91.52, 96.96, 96.55, 96.3, 88.34, 91.37, 91.47, 89.06], '6M': [67.9, 63.99, 65.36, 65.03, 75.22, 74.7, 74.79, 78.08, 74.41, 78.94, 75.93, 71.39, 65.33, 63.83, 64.34, 60.06, 67.51, 74.5, 80.93, 84.26, 98.48, 97.7, 91.81, 96.85, 96.55, 89.06], '1Y': [69.59, 67.69, 71.6, 73.16, 75.08, 74.3, 67.81, 70.29, 66.17, 65.75, 66.76, 66.65, 64.43, 65.02, 66.26, 64.84, 66.13, 65.86, 65.35, 65.09, 62.54, 60.8, 55.63, 50.8, 52.57, 64.72, 69.09, 64.06, 64.94, 67.06, 73.39, 73.17, 74.79, 78.08, 74.41, 78.94, 75.93, 71.39, 65.33, 64.59, 65.63, 64.61, 70.73, 74.49, 82.48, 84.26, 98.48, 97.7, 91.81, 96.85, 96.55, 89.06] },
      velocityScore: { '1D': 2.6, '1W': 3.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$48B', pe: 404.8, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 1.99,
      etfPresence: { SOXX: 2.51, PSI: false, XSD: 2.2, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.89, proScore: 0.95, coverage: 0.5,
      price: 357.33, weeklyPrices: [382.74, 345.40, 361.86, 358.72, 357.33], weeklyChange: -6.64, sortRank: 0, periodReturns: { '1M': -2.3, '6M': 91.9, '1Y': 178.6 },
      priceHistory: { '1W': [382.74, 345.4, 361.86, 358.72, 357.33], '1M': [365.88, 362.76, 381.55, 383.56, 375.6, 356.25, 358.98, 375.71, 380.45, 385.98, 400.66, 391.09, 364.64, 353.79, 382.35, 390.34, 382.74, 345.4, 361.86, 358.72, 357.33], '6M': [186.23, 168.31, 175.81, 174.96, 174.87, 220.68, 218.89, 228.56, 235.7, 245.59, 248.29, 241.01, 220.59, 224.92, 229.26, 209.49, 236.99, 263.92, 285.71, 265.61, 303.57, 362.76, 358.98, 400.66, 390.34, 357.33], '1Y': [128.27, 130.72, 139.17, 139.81, 137.19, 141.76, 137.29, 140.02, 139.03, 125.99, 121.15, 129.63, 131.89, 131.07, 129.73, 123.88, 128.09, 132.98, 137.94, 139.31, 152.66, 149.68, 170.89, 161.57, 168.06, 187.06, 189.86, 171.47, 175.01, 170.76, 197.55, 221.7, 218.89, 228.56, 235.7, 245.59, 248.29, 241.01, 220.59, 221.29, 237.23, 222.07, 247, 261.16, 277, 265.61, 303.57, 362.76, 358.98, 400.66, 390.34, 357.33] },
      velocityScore: { '1D': 2.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 150.8, revenueGrowth: 23, eps: 2.37, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.24, PSI: false, XSD: 2.54, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RMBS', name: 'RAMBUS INC', easyScore: 2, avgWeight: 1.66, proScore: 0.83, coverage: 0.5,
      price: 141.79, weeklyPrices: [169.35, 145.31, 152.03, 146.84, 141.79], weeklyChange: -16.27, sortRank: 0, periodReturns: { '1M': 5.4, '6M': 32.7, '1Y': 137.5 },
      priceHistory: { '1W': [169.35, 145.31, 152.03, 146.84, 141.79], '1M': [134.51, 130.28, 134.85, 130.46, 127.05, 123.76, 122.03, 133.56, 141.82, 142.98, 148.66, 148.02, 145.46, 147.48, 166.78, 170.66, 169.35, 145.31, 152.03, 146.84, 141.79], '6M': [106.84, 90.61, 94.48, 99.28, 93.38, 107.99, 114.19, 113.71, 110.92, 101.95, 98.57, 87.59, 89.61, 92.78, 93.35, 79.73, 91.87, 121.73, 130.45, 111.27, 118, 130.28, 122.03, 148.66, 170.66, 141.79], '1Y': [59.7, 59.94, 61.9, 65, 64.6, 68.17, 64.21, 75.09, 71.56, 76.79, 69.68, 75.05, 75.4, 88.58, 107.38, 100.76, 103.71, 98.72, 98.15, 101.61, 111.36, 108.61, 102.21, 90.22, 94.87, 98.81, 106.01, 91.49, 94.11, 97.5, 92.9, 110.1, 114.19, 113.71, 110.92, 101.95, 98.57, 87.59, 89.61, 93.5, 92.69, 86.03, 101.43, 120.02, 131.55, 111.27, 118, 130.28, 122.03, 148.66, 170.66, 141.79] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 67.5, revenueGrowth: 8, eps: 2.1, grossMargin: 80, dividendYield: null,
      etfPresence: { SOXX: 0.81, PSI: false, XSD: 2.5, DRAM: false },
      tonyNote: 'RAMBUS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 6, avgWeight: 4.68, proScore: 2.16, coverage: 0.462,
      price: 205.43, weeklyPrices: [218.66, 205.10, 208.64, 208.19, 205.43], weeklyChange: -6.05, sortRank: 0, periodReturns: { '1M': -6.4, '6M': 11.8, '1Y': 42.7 },
      priceHistory: { '1W': [218.66, 205.1, 208.64, 208.19, 205.43], '1M': [219.44, 220.78, 225.83, 235.74, 225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 205.43], '6M': [183.78, 170.94, 188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 214.75, 205.43], '1Y': [143.96, 144.12, 154.31, 157.25, 164.1, 173, 173.74, 179.27, 179.42, 181.59, 175.4, 181.6, 171.66, 177.17, 176.24, 177.69, 188.89, 192.57, 181.81, 182.16, 207.04, 195.21, 193.8, 186.52, 180.26, 183.38, 180.93, 174.14, 190.53, 188.12, 184.94, 178.07, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 213.17, 196.5, 220.78, 220.61, 212.6, 214.75, 205.43] },
      velocityScore: { '1D': -5.3, '1W': -4.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.0T', pe: 31.4, revenueGrowth: 85, eps: 6.54, grossMargin: 74, dividendYield: 0.48,
      etfPresence: { PTF: 4.61, WCLD: false, IGV: false, FDTX: 4.62, GTEK: false, ARKK: 1.76, MARS: false, FRWD: 8.25, BCTK: 6.6, FWD: false, CBSE: false, FCUS: false, WGMI: 2.21 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 6, avgWeight: 4.66, proScore: 2.15, coverage: 0.462,
      price: 901.2, weeklyPrices: [996.00, 864.01, 949.28, 935.89, 901.20], weeklyChange: -9.52, sortRank: 0, periodReturns: { '1M': 13.3, '6M': 241.7, '1Y': 689.6 },
      priceHistory: { '1W': [996, 864.01, 949.28, 935.89, 901.2], '1M': [795.33, 766.58, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 901.2], '6M': [263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 901.2], '1Y': [114.14, 120.34, 127.25, 121.74, 123.11, 113.26, 111.73, 114.74, 108.78, 124.27, 117.21, 117.75, 124.21, 150.57, 168.89, 156.83, 183.75, 192.33, 202.53, 206.71, 226.63, 237.5, 244.9, 225.92, 230.26, 226.65, 258.46, 248.55, 284.79, 312.15, 345.87, 365, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 901.2] },
      velocityScore: { '1D': -10, '1W': -20.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.0T', pe: 42.6, revenueGrowth: 196, eps: 21.15, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { PTF: 4.86, WCLD: false, IGV: false, FDTX: 9.36, GTEK: false, ARKK: false, MARS: false, FRWD: 4.49, BCTK: 4.22, FWD: 1.26, CBSE: false, FCUS: 3.78, WGMI: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 5, avgWeight: 4.6, proScore: 1.77, coverage: 0.385,
      price: 809.51, weeklyPrices: [925.99, 847.47, 876.77, 846.01, 809.51], weeklyChange: -12.58, sortRank: 0, periodReturns: { '1M': -2.9, '6M': 170.8, '1Y': 532.5 },
      priceHistory: { '1W': [925.99, 847.47, 876.77, 846.01, 809.51], '1M': [834.01, 808.8, 817.35, 804.76, 795.47, 740.84, 733.35, 751.07, 810.46, 812.73, 870.66, 880.72, 879.8, 921.26, 926.61, 940.69, 925.99, 847.47, 876.77, 846.01, 809.51], '6M': [298.92, 277.65, 285.27, 287.54, 304.01, 326.23, 358.29, 432.95, 425, 415.94, 396.02, 357.62, 384.29, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 579.03, 771.01, 808.8, 733.35, 870.66, 940.69, 809.51], '1Y': [127.99, 130.87, 138.54, 151.94, 144.5, 146.72, 152.73, 147.42, 147.27, 156.92, 158.4, 167.24, 183.98, 196.81, 216.64, 219.85, 254.74, 221.7, 226.03, 226.41, 265.62, 275.77, 283.26, 259.14, 272.28, 265.63, 307.85, 292, 286.22, 289.83, 321.48, 325.99, 358.29, 432.95, 425, 415.94, 396.02, 357.62, 384.29, 421.09, 424.96, 391.76, 496.3, 519.6, 579.88, 579.03, 771.01, 808.8, 733.35, 870.66, 940.69, 809.51] },
      velocityScore: { '1D': 3.5, '1W': -2.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$183B', pe: 76.5, revenueGrowth: 44, eps: 10.58, grossMargin: 42, dividendYield: 0.35,
      etfPresence: { PTF: 4.74, WCLD: false, IGV: false, FDTX: 4.04, GTEK: false, ARKK: false, MARS: false, FRWD: 9, BCTK: false, FWD: 1.06, CBSE: false, FCUS: 4.18, WGMI: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 5, avgWeight: 4.45, proScore: 1.71, coverage: 0.385,
      price: 413.24, weeklyPrices: [444.92, 415.17, 426.80, 427.92, 413.24], weeklyChange: -7.12, sortRank: 0, periodReturns: { '1M': 2.2, '6M': 33.2, '1Y': 94.5 },
      priceHistory: { '1W': [444.92, 415.17, 426.8, 427.92, 413.24], '1M': [404.54, 397.28, 399.8, 417.72, 404.35, 395.95, 392.61, 401.62, 407.15, 404.52, 422.73, 424.86, 418.45, 435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 427.92, 413.24], '6M': [310.14, 276.96, 298.8, 319.61, 323.63, 342.4, 332.71, 341.36, 355.41, 364.2, 385.75, 353.13, 347.09, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 392.61, 422.73, 436.69, 413.24], '1Y': [212.46, 213.9, 222.74, 233.6, 229.76, 245.6, 241.6, 242.91, 231.37, 241.44, 228.6, 239.29, 235.21, 258.91, 268.64, 276.66, 288.11, 299.88, 299.84, 290.73, 305.09, 293.64, 290.62, 282.37, 289.96, 292.93, 304.85, 284.68, 302.84, 322.25, 331.77, 327.16, 332.71, 341.36, 355.41, 364.2, 385.75, 353.13, 347.09, 345.98, 343.25, 337.95, 365.9, 375.1, 387.44, 392.34, 394.41, 397.28, 392.61, 422.73, 436.69, 413.24] },
      velocityScore: { '1D': 3, '1W': -8.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.1T', pe: 35.5, revenueGrowth: 35, eps: 11.64, grossMargin: 62, dividendYield: 0.89,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6, GTEK: false, ARKK: 1.02, MARS: false, FRWD: 6, BCTK: 8.6, FWD: false, CBSE: false, FCUS: false, WGMI: 0.63 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 5, avgWeight: 4.3, proScore: 1.65, coverage: 0.385,
      price: 466.25, weeklyPrices: [523.20, 466.38, 490.33, 475.51, 466.25], weeklyChange: -10.88, sortRank: 0, periodReturns: { '1M': 1.6, '6M': 110.6, '1Y': 278.3 },
      priceHistory: { '1W': [523.2, 466.38, 490.33, 475.51, 466.25], '1M': [458.79, 448.29, 445.5, 449.7, 424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 466.25], '6M': [221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 466.25], '1Y': [123.24, 127.1, 143.4, 138.52, 144.16, 160.41, 162.12, 179.51, 163.12, 184.42, 165.2, 167.13, 161.79, 155.67, 157.92, 161.27, 169.73, 232.89, 234.56, 234.99, 264.33, 256.33, 258.89, 223.55, 214.24, 215.98, 221.43, 201.06, 214.99, 221.08, 207.69, 231.92, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 466.25] },
      velocityScore: { '1D': -2.9, '1W': 10, '1M': null, '6M': null }, isNew: false,
      marketCap: '$760B', pe: 155.4, revenueGrowth: 38, eps: 3, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.73, MARS: false, FRWD: 7.47, BCTK: 3.65, FWD: 2.53, CBSE: false, FCUS: 3.11, WGMI: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 5, avgWeight: 3.28, proScore: 1.26, coverage: 0.385,
      price: 376.43, weeklyPrices: [418.91, 385.73, 396.60, 392.16, 376.43], weeklyChange: -10.14, sortRank: 0, periodReturns: { '1M': -12.1, '6M': -8.8, '1Y': 53.9 },
      priceHistory: { '1W': [418.91, 385.73, 396.6, 392.16, 376.43], '1M': [428.43, 419.3, 416.79, 439.79, 425.19, 420.71, 411.07, 417.76, 414.57, 414.14, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 376.43], '6M': [412.97, 326.02, 350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 479.23, 376.43], '1Y': [244.63, 249.37, 264.65, 269.9, 275.4, 286.45, 288.71, 302.62, 301.67, 309.09, 291.17, 300.25, 306.1, 359.63, 345.35, 336.1, 338.18, 345.02, 354.15, 344.29, 385.98, 358.98, 355.22, 354.42, 397.57, 381.03, 406.37, 329.88, 352.13, 343.42, 352.21, 332.6, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 399.83, 427.36, 419.3, 411.07, 421.86, 479.23, 376.43] },
      velocityScore: { '1D': -2.3, '1W': -8.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 62.7, revenueGrowth: 48, eps: 6, grossMargin: 76, dividendYield: 0.66,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.79, GTEK: false, ARKK: 1.19, MARS: false, FRWD: 4.28, BCTK: 7.42, FWD: 2.72, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 5, avgWeight: 3.26, proScore: 1.25, coverage: 0.385,
      price: 241.9, weeklyPrices: [253.79, 246.03, 245.22, 244.19, 241.90], weeklyChange: -4.69, sortRank: 0, periodReturns: { '1M': -10.1, '6M': 4.4, '1Y': 11.2 },
      priceHistory: { '1W': [253.79, 246.03, 245.22, 244.19, 241.9], '1M': [268.99, 265.82, 270.13, 267.22, 264.14, 264.86, 259.34, 265.01, 268.46, 266.32, 271.85, 274, 270.64, 261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 244.19, 241.9], '6M': [231.78, 221.27, 232.38, 226.5, 247.38, 239.12, 238.42, 242.96, 208.72, 201.15, 208.56, 208.73, 214.33, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 259.34, 271.85, 250.02, 241.9], '1Y': [217.61, 214.82, 211.99, 219.92, 222.26, 223.88, 232.23, 230.19, 222.31, 224.56, 223.81, 229.12, 235.68, 229.95, 231.23, 218.15, 222.41, 227.74, 214.47, 221.09, 230.3, 250.2, 244.2, 222.69, 229.16, 229.11, 230.28, 226.76, 232.52, 233.06, 246.47, 231, 238.42, 242.96, 208.72, 201.15, 208.56, 208.73, 214.33, 215.2, 207.24, 208.27, 221.25, 248.5, 255.36, 259.7, 273.55, 265.82, 259.34, 271.85, 250.02, 241.9] },
      velocityScore: { '1D': 1.6, '1W': -0.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 31.3, revenueGrowth: 17, eps: 7.72, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.01, GTEK: false, ARKK: 2.58, MARS: false, FRWD: 3.48, BCTK: 4.65, FWD: 1.58, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 4, avgWeight: 4.19, proScore: 1.29, coverage: 0.308,
      price: 326.52, weeklyPrices: [336.41, 303.28, 324.45, 327.16, 326.52], weeklyChange: -2.94, sortRank: 0, periodReturns: { '1M': 10.3, '6M': 94.1, '1Y': 258.8 },
      priceHistory: { '1W': [336.41, 303.28, 324.45, 327.16, 326.52], '1M': [296.05, 289.24, 295.44, 299.15, 284.72, 277.96, 273.38, 292.09, 302.24, 305.35, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 326.52], '6M': [168.26, 154.98, 177.33, 185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.58, 244.25, 217.27, 215.23, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 273.38, 318.93, 343.71, 326.52], '1Y': [91, 92.66, 96.02, 98.83, 101.06, 100.79, 97.78, 99.09, 95.94, 106.74, 99.15, 103.67, 100.42, 115.58, 126.32, 128.13, 146.99, 141, 142.37, 147.54, 160.67, 165.05, 161.42, 148.8, 155.14, 157.09, 168.71, 164.7, 178.07, 194.76, 220.4, 222.41, 222.87, 237.5, 229.28, 235.58, 244.25, 217.27, 215.23, 226.47, 238.84, 213.66, 246.49, 265.16, 265.55, 251.23, 275.8, 289.24, 273.38, 318.93, 343.71, 326.52] },
      velocityScore: { '1D': 0.8, '1W': 3.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$408B', pe: 61.6, revenueGrowth: 24, eps: 5.3, grossMargin: 50, dividendYield: 0.32,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.85, BCTK: 6.54, FWD: 1.65, CBSE: 2.7, FCUS: false, WGMI: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 4, avgWeight: 3.69, proScore: 1.14, coverage: 0.308,
      price: 258.73, weeklyPrices: [279.25, 272.05, 266.33, 260.52, 258.73], weeklyChange: -7.35, sortRank: 0, periodReturns: { '1M': 21.1, '6M': 34.1, '1Y': 32 },
      priceHistory: { '1W': [279.25, 272.05, 266.33, 260.52, 258.73], '1M': [213.66, 215.6, 227.79, 238.21, 242.83, 247.55, 240.13, 246.66, 252.92, 260.58, 248.47, 257.77, 281.69, 300.48, 297.18, 280.43, 279.25, 272.05, 266.33, 260.52, 258.73], '6M': [192.96, 183.44, 187.22, 179.37, 189.02, 187.66, 184.22, 175.42, 166, 163.5, 141.67, 156.09, 165.58, 167.45, 164.05, 154.35, 169.87, 161.59, 174.96, 180.99, 183.98, 215.6, 240.13, 248.47, 280.43, 258.73], '1Y': [195.95, 202.05, 204.3, 196.97, 192.07, 196.28, 201.16, 183.03, 172.89, 176.86, 184.43, 187.61, 192.35, 198.33, 205.68, 202.21, 209.3, 215.17, 205.51, 215.02, 217.16, 213.18, 210.04, 199.9, 185.35, 195.68, 190.36, 185.88, 188.45, 182.12, 188.88, 184.06, 184.22, 175.42, 166, 163.5, 141.67, 156.09, 165.58, 169.19, 157.21, 160.32, 173.78, 164.11, 181.2, 180.99, 183.98, 215.6, 240.13, 248.47, 280.43, 258.73] },
      velocityScore: { '1D': 8.6, '1W': 7.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$211B', pe: 225, revenueGrowth: 31, eps: 1.15, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.39, IGV: 7.66, FDTX: 3.67, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.05, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 3.02, proScore: 0.93, coverage: 0.308,
      price: 106.95, weeklyPrices: [116.04, 109.54, 110.78, 110.42, 106.95], weeklyChange: -7.83, sortRank: 0, periodReturns: { '1M': 4.3, '6M': -36.5, '1Y': -3 },
      priceHistory: { '1W': [116.04, 109.54, 110.78, 110.42, 106.95], '1M': [102.54, 99.84, 95.4, 97.42, 100.28, 102.39, 101.01, 105.01, 104.86, 103, 106.6, 115.03, 118.71, 124.12, 117.01, 112.94, 116.04, 109.54, 110.78, 110.42, 106.95], '6M': [168.42, 161.73, 169.45, 157.2, 164.48, 155.81, 136.31, 132.2, 118.4, 113.54, 116.93, 121.87, 129.36, 126.58, 121.1, 111.77, 117.06, 117.64, 131.13, 122.05, 107.63, 99.84, 101.01, 106.6, 112.94, 106.95], '1Y': [110.26, 106.53, 113.89, 114.77, 115.16, 126.75, 122.08, 123.01, 154.9, 150.09, 137.29, 139.89, 145.15, 145.03, 152.11, 143.45, 151.3, 163.87, 156.57, 167.03, 179.01, 162.92, 156.59, 146, 159.34, 162.31, 164.75, 166.8, 170.83, 166.21, 167.93, 144.5, 136.31, 132.2, 118.4, 113.54, 116.93, 121.87, 129.36, 127.8, 116.15, 118.62, 120.1, 127.41, 131.96, 122.05, 107.63, 99.84, 101.01, 106.6, 112.94, 106.95] },
      velocityScore: { '1D': 1.1, '1W': -1.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$139B', pe: 104.9, revenueGrowth: 34, eps: 1.02, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.89, GTEK: false, ARKK: 4.44, MARS: false, FRWD: 1.99, BCTK: 2.74, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 13 Broad Tech ETFs (31% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NET', name: 'Cloudflare', easyScore: 4, avgWeight: 1.9, proScore: 0.58, coverage: 0.308,
      price: 230.71, weeklyPrices: [268.64, 250.11, 247.79, 236.13, 230.71], weeklyChange: -14.12, sortRank: 0, periodReturns: { '1M': 19.2, '6M': 8.1, '1Y': 28.6 },
      priceHistory: { '1W': [268.64, 250.11, 247.79, 236.13, 230.71], '1M': [193.52, 186.79, 192.62, 199.81, 197.56, 201.75, 206.73, 210.13, 212.65, 216.17, 209.22, 228.11, 241.82, 270.82, 272.66, 265.33, 268.64, 250.11, 247.79, 236.13, 230.71], '6M': [213.46, 191.43, 202.66, 196.02, 182.78, 184.17, 189.35, 182.42, 173.75, 193.68, 163.81, 178.91, 207.49, 207.33, 220.65, 194.63, 216.29, 178.65, 207.67, 208.5, 244.43, 186.79, 206.73, 209.22, 265.33, 230.71], '1Y': [179.34, 181.23, 190.12, 185.64, 181.92, 191.25, 191.58, 200.85, 215.53, 199.34, 193.2, 205.24, 209.98, 224.64, 223.57, 218.2, 224.56, 220.95, 211.4, 217.16, 227.38, 228.51, 225.68, 196.2, 196.99, 204.15, 207.95, 193.83, 202.39, 197.66, 186.39, 177.42, 189.35, 182.42, 173.75, 193.68, 163.81, 178.91, 207.49, 211.52, 213.15, 206.34, 211.25, 190.13, 207.56, 208.5, 244.43, 186.79, 206.73, 209.22, 265.33, 230.71] },
      velocityScore: { '1D': -1.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$82B', pe: null, revenueGrowth: 34, eps: -0.26, grossMargin: 73, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 1.87, IGV: false, FDTX: 2.05, GTEK: 2.25, ARKK: false, MARS: false, FRWD: false, BCTK: 1.43, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Cloudflare appears in 4 of 13 Broad Tech ETFs (31% coverage) with average weight 1.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 3, avgWeight: 5.21, proScore: 1.2, coverage: 0.231,
      price: 398.14, weeklyPrices: [428.05, 416.67, 411.74, 403.41, 398.14], weeklyChange: -6.99, sortRank: 0, periodReturns: { '1M': -3.5, '6M': -16.8, '1Y': -15.5 },
      priceHistory: { '1W': [428.05, 416.67, 411.74, 403.41, 398.14], '1M': [412.66, 407.77, 405.21, 409.43, 421.92, 423.54, 417.42, 421.06, 419.09, 418.57, 412.67, 426.99, 450.24, 460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 403.41, 398.14], '6M': [478.56, 476.12, 488.02, 472.94, 479.28, 459.86, 470.28, 423.37, 413.6, 396.86, 389, 403.93, 405.76, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 417.42, 412.67, 427.34, 398.14], '1Y': [470.92, 478.04, 492.27, 491.09, 501.48, 511.7, 510.88, 513.24, 524.94, 520.58, 505.72, 506.74, 507.97, 501.01, 508.45, 507.03, 515.74, 522.4, 511.61, 520.56, 541.55, 507.16, 511.14, 487.12, 485.5, 480.84, 483.47, 483.98, 487.71, 472.85, 477.18, 454.52, 470.28, 423.37, 413.6, 396.86, 389, 403.93, 405.76, 399.41, 372.74, 370.17, 374.33, 411.22, 432.92, 429.25, 411.38, 407.77, 417.42, 412.67, 427.34, 398.14] },
      velocityScore: { '1D': 0, '1W': -0.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.0T', pe: 23.7, revenueGrowth: 18, eps: 16.78, grossMargin: 68, dividendYield: 0.9,
      etfPresence: { PTF: false, WCLD: false, IGV: 7.84, FDTX: 3.79, GTEK: false, ARKK: false, MARS: false, FRWD: 4.01, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 3, avgWeight: 4.89, proScore: 1.13, coverage: 0.231,
      price: 391.64, weeklyPrices: [418.45, 391.00, 408.95, 396.68, 391.64], weeklyChange: -6.41, sortRank: 0, periodReturns: { '1M': -12, '6M': -13.2, '1Y': 20.1 },
      priceHistory: { '1W': [418.45, 391, 408.95, 396.68, 391.64], '1M': [445, 433.45, 445.27, 443.3, 422.24, 409.99, 404.11, 417.26, 417.85, 426.01, 440.36, 442.1, 435.79, 415.88, 423.74, 423.7, 418.45, 391, 408.95, 396.68, 391.64], '6M': [451.45, 467.26, 485.4, 438.07, 445.01, 437.5, 435.2, 421.81, 417.32, 410.63, 409.38, 392.43, 399.24, 395.56, 380.85, 355.28, 346.65, 364.2, 386.42, 376.02, 389.37, 433.45, 404.11, 440.36, 423.7, 391.64], '1Y': [326.09, 316.35, 327.55, 315.65, 309.87, 319.41, 305.3, 319.04, 319.91, 339.38, 323.9, 349.6, 338.53, 368.81, 416.85, 423.39, 436, 435.54, 428.75, 448.98, 461.51, 462.07, 430.6, 403.99, 426.58, 454.53, 446.89, 483.37, 475.19, 451.67, 448.96, 419.25, 435.2, 421.81, 417.32, 410.63, 409.38, 392.43, 399.24, 399.27, 383.03, 371.75, 343.25, 391.95, 387.51, 376.02, 389.37, 433.45, 404.11, 440.36, 423.7, 391.64] },
      velocityScore: { '1D': -1.7, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 366, revenueGrowth: 16, eps: 1.07, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 10.22, MARS: false, FRWD: false, BCTK: 3.39, FWD: 1.07, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 3, avgWeight: 4.64, proScore: 1.07, coverage: 0.231,
      price: 491.02, weeklyPrices: [575.50, 511.72, 526.93, 517.72, 491.02], weeklyChange: -14.68, sortRank: 0, periodReturns: { '1M': -4.8, '6M': 169.9, '1Y': 777.6 },
      priceHistory: { '1W': [575.5, 511.72, 526.93, 517.72, 491.02], '1M': [515.83, 488.74, 494.09, 489.15, 482.02, 458.68, 455.8, 459.62, 486.46, 484.28, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 491.02], '6M': [181.95, 166.26, 179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 594.11, 491.02], '1Y': [55.95, 58.57, 62.55, 65.78, 65.06, 67.02, 69.02, 71.43, 73.78, 76.07, 75.64, 80.67, 90.49, 96.15, 105.15, 107.21, 131.26, 119.7, 125.92, 125.72, 141.38, 160.1, 166.11, 153.97, 157.74, 161, 187.2, 175.01, 181.54, 187.88, 212.14, 222.97, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 390.99, 465.26, 488.74, 455.8, 530.6, 594.11, 491.02] },
      velocityScore: { '1D': -24.1, '1W': -25.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$169B', pe: 29.4, revenueGrowth: 46, eps: 16.72, grossMargin: 45, dividendYield: 0.12,
      etfPresence: { PTF: 4.75, WCLD: false, IGV: false, FDTX: 4, GTEK: false, ARKK: false, MARS: false, FRWD: 5.16, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 3, avgWeight: 4.24, proScore: 0.98, coverage: 0.231,
      price: 129.15, weeklyPrices: [141.70, 135.53, 136.47, 132.07, 129.15], weeklyChange: -8.86, sortRank: 0, periodReturns: { '1M': -5.7, '6M': -31.3, '1Y': -2.8 },
      priceHistory: { '1W': [141.7, 135.53, 136.47, 132.07, 129.15], '1M': [136.89, 136, 130.05, 133.73, 133.99, 135.14, 135.26, 137.15, 137.41, 136.88, 132.51, 143.34, 156.54, 160.65, 152.17, 142.2, 141.7, 135.53, 136.47, 132.07, 129.15], '6M': [187.91, 177.29, 194.17, 167.86, 177.49, 170.96, 167.47, 147.76, 142.91, 133.02, 128.84, 147.22, 151.14, 152.72, 160.84, 137.55, 150.07, 135.7, 145.97, 141.18, 135.91, 136, 135.26, 132.51, 142.2, 129.15], '1Y': [132.81, 138.2, 142.9, 132.12, 142.5, 153.99, 154.86, 158.61, 179.54, 184.37, 156.01, 156.72, 156.14, 164.36, 176.97, 179.12, 187.05, 185.47, 178.12, 180.48, 198.81, 187.9, 184.17, 165.42, 165.77, 177.92, 187.54, 185.69, 188.71, 174.04, 179.41, 168.53, 167.47, 147.76, 142.91, 133.02, 128.84, 147.22, 151.14, 155.08, 154.78, 146.28, 140.76, 142.15, 152.62, 141.18, 135.91, 136, 135.26, 132.51, 142.2, 129.15] },
      velocityScore: { '1D': -1, '1W': -3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$310B', pe: 146.8, revenueGrowth: 85, eps: 0.88, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 6.86, FDTX: 2.87, GTEK: false, ARKK: 3, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 3, avgWeight: 3.86, proScore: 0.89, coverage: 0.231,
      price: 361.21, weeklyPrices: [369.27, 365.76, 361.17, 362.29, 361.21], weeklyChange: -2.18, sortRank: 0, periodReturns: { '1M': -6.6, '6M': 12.5, '1Y': 100.7 },
      priceHistory: { '1W': [369.27, 365.76, 361.17, 362.29, 361.21], '1M': [386.77, 383.82, 399.04, 397.17, 393.32, 393.11, 384.9, 384.9, 383.47, 379.38, 384.83, 386.12, 376.43, 372.58, 358.39, 355.68, 369.27, 365.76, 361.17, 362.29, 361.21], '6M': [321, 298.06, 315.67, 315.32, 329.14, 330.34, 333.59, 344.9, 324.4, 302.82, 310.92, 303.56, 306.93, 304.42, 299.02, 273.14, 303.93, 330.58, 330.47, 347.5, 384.27, 383.82, 384.9, 384.83, 355.68, 361.21], '1Y': [180.01, 177.23, 171.49, 179.76, 178.7, 184.7, 193.2, 197.44, 196.92, 203.03, 200.19, 208.21, 232.66, 240.78, 252.33, 246.57, 246.43, 242.21, 251.88, 253.73, 275.17, 284.75, 287.43, 292.99, 320.28, 318.39, 313.7, 303.75, 314.96, 317.32, 332.73, 322.16, 333.59, 344.9, 324.4, 302.82, 310.92, 303.56, 306.93, 309.41, 289.2, 286.86, 314.74, 334.47, 337.73, 347.5, 384.27, 383.82, 384.9, 384.83, 355.68, 361.21] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.6, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.66, GTEK: false, ARKK: 1.95, MARS: false, FRWD: false, BCTK: 5.97, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Alphabet Inc Class C appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 3.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRWD', name: 'CrowdStrike', easyScore: 3, avgWeight: 3.17, proScore: 0.73, coverage: 0.231,
      price: 639.25, weeklyPrices: [719.09, 671.02, 658.79, 644.93, 639.25], weeklyChange: -11.1, sortRank: 0, periodReturns: { '1M': 17.9, '6M': 23, '1Y': 36.7 },
      priceHistory: { '1W': [719.09, 671.02, 658.79, 644.93, 639.25], '1M': [542.26, 546.18, 562.57, 579.95, 594.08, 618.83, 616.88, 650.11, 648.23, 663.46, 645.36, 671, 731, 782.17, 768.95, 747.61, 719.09, 671.02, 658.79, 644.93, 639.25], '6M': [519.54, 470.02, 477.11, 453.58, 470.61, 453.88, 468.33, 438.85, 408.04, 414.29, 350.25, 391.42, 436.33, 423.84, 413.31, 380.06, 423.23, 398.49, 449.61, 454.99, 476.53, 546.18, 616.88, 645.36, 747.61, 639.25], '1Y': [467.65, 492.03, 494.09, 496.1, 487.11, 469.83, 462.03, 463.15, 451.69, 432.12, 419.17, 422.61, 412.46, 433.38, 502.63, 473.09, 496.8, 509.13, 482.23, 521.98, 545.5, 534.14, 545.86, 520.59, 501.54, 513.12, 517.65, 477.26, 481.19, 456.55, 466.99, 442.73, 468.33, 438.85, 408.04, 414.29, 350.25, 391.42, 436.33, 433.2, 392.99, 390.41, 426.51, 411.16, 466.68, 454.99, 476.53, 546.18, 616.88, 645.36, 747.61, 639.25] },
      velocityScore: { '1D': -1.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$163B', pe: null, revenueGrowth: 26, eps: -0.13, grossMargin: 75, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.27, IGV: 5.99, FDTX: 1.24, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'CrowdStrike appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 3.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASML', name: 'ASML Holding', easyScore: 3, avgWeight: 2.93, proScore: 0.68, coverage: 0.231,
      price: 1756.15, weeklyPrices: [1757.47, 1641.74, 1749.04, 1777.77, 1756.15], weeklyChange: -0.07, sortRank: 0, periodReturns: { '1M': 12.2, '6M': 56.9, '1Y': 123.7 },
      priceHistory: { '1W': [1757.47, 1641.74, 1749.04, 1777.77, 1756.15], '1M': [1565.81, 1520.94, 1581.58, 1584.51, 1501.81, 1472.39, 1459.44, 1550.13, 1592, 1632.9, 1597.87, 1605.77, 1612.76, 1628.57, 1705.37, 1726.36, 1757.47, 1641.74, 1749.04, 1777.77, 1756.15], '6M': [1119.32, 1015.43, 1065.52, 1163.78, 1273.88, 1358.57, 1413.35, 1441.39, 1429.49, 1419.78, 1497.8, 1360.94, 1383.4, 1375.56, 1369.62, 1253.96, 1306.45, 1518.3, 1458.97, 1384.56, 1442.92, 1520.94, 1459.44, 1597.87, 1726.36, 1756.15], '1Y': [784.97, 759.86, 815.24, 799.59, 802.09, 744.91, 725.08, 721.45, 690.96, 755.57, 749.49, 770, 753.43, 804.16, 927.8, 949.55, 1030.17, 980.54, 1019.59, 1036.41, 1070.84, 1043.75, 1037.33, 1039.33, 1040.97, 1110.08, 1122.84, 1036.31, 1072.75, 1228.19, 1281.23, 1326.07, 1413.35, 1441.39, 1429.49, 1419.78, 1497.8, 1360.94, 1383.4, 1389.16, 1399.42, 1320.83, 1421.05, 1481.77, 1443.66, 1384.56, 1442.92, 1520.94, 1459.44, 1597.87, 1726.36, 1756.15] },
      velocityScore: { '1D': 3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$677B', pe: 58.8, revenueGrowth: 13, eps: 29.87, grossMargin: 53, dividendYield: 0.49,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.21, BCTK: 2.12, FWD: 1.45, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'ASML Holding appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CDNS', name: 'CADENCE DESIGN SYSTEMS INC', easyScore: 3, avgWeight: 2.89, proScore: 0.67, coverage: 0.231,
      price: 386.45, weeklyPrices: [411.68, 376.19, 394.24, 390.90, 386.45], weeklyChange: -6.13, sortRank: 0, periodReturns: { '1M': 6.1, '6M': 14.3, '1Y': 26.4 },
      priceHistory: { '1W': [411.68, 376.19, 394.24, 390.9, 386.45], '1M': [364.2, 358.04, 354.55, 352.84, 347.24, 345.99, 338.12, 350.89, 358.46, 373.59, 374.05, 373.85, 374.93, 414.16, 416.39, 408, 411.68, 376.19, 394.24, 390.9, 386.45], '6M': [338.06, 313.02, 317.76, 310.4, 327.31, 317.45, 322.02, 289.19, 291, 283.46, 290.63, 300.63, 293.29, 292.72, 292.52, 270.88, 279.48, 292.37, 325.84, 325.31, 353.63, 358.04, 338.12, 374.05, 408, 386.45], '1Y': [305.69, 299, 297.53, 310.95, 322.66, 320.86, 324.64, 371.03, 360.16, 349.12, 345.45, 346.88, 349.33, 354.7, 364.88, 351.06, 347.24, 348.67, 324.25, 337.27, 341.43, 327.63, 315.54, 306.76, 306.35, 337.3, 335.43, 315.1, 318.89, 301.22, 325.51, 307, 322.02, 289.19, 291, 283.46, 290.63, 300.63, 293.29, 293.75, 284.32, 277.87, 289.5, 304.1, 331.61, 325.31, 353.63, 358.04, 338.12, 374.05, 408, 386.45] },
      velocityScore: { '1D': 3.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$107B', pe: 89.9, revenueGrowth: 19, eps: 4.3, grossMargin: 86, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 3.92, FDTX: false, GTEK: 2.62, ARKK: false, MARS: false, FRWD: 2.13, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'CADENCE DESIGN SYSTEMS INC appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DDOG', name: 'DDOG', easyScore: 3, avgWeight: 2.62, proScore: 0.61, coverage: 0.231,
      price: 224.29, weeklyPrices: [243.60, 234.11, 231.68, 227.34, 224.29], weeklyChange: -7.93, sortRank: 0, periodReturns: { '1M': 10.9, '6M': 48.3, '1Y': 87 },
      priceHistory: { '1W': [243.6, 234.11, 231.68, 227.34, 224.29], '1M': [202.32, 199.94, 205.31, 202.84, 207.98, 208.82, 215.15, 212.24, 218.04, 222.32, 221.81, 225.24, 247.35, 277.49, 269.13, 250.33, 243.6, 234.11, 231.68, 227.34, 224.29], '6M': [151.2, 136.71, 138.04, 133.77, 125.49, 119.02, 136.64, 129.05, 114.01, 122.56, 104.43, 111.77, 123.08, 126.57, 129.23, 115.81, 116.54, 110.57, 129.29, 131.55, 145.73, 199.94, 215.15, 221.81, 250.33, 224.29], '1Y': [119.91, 124.84, 130.24, 135.01, 137.49, 143.15, 146.56, 148.88, 136.96, 128.71, 128.46, 131.73, 131.78, 139.15, 136.81, 136.6, 151.57, 164.07, 151.17, 156.59, 156, 154.98, 190.89, 176.31, 158.4, 153, 149.9, 138.29, 138.32, 133.64, 126.57, 117, 136.64, 129.05, 114.01, 122.56, 104.43, 111.77, 123.08, 128.87, 122.57, 118.05, 116.5, 121.06, 132.14, 131.55, 145.73, 199.94, 215.15, 221.81, 250.33, 224.29] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$80B', pe: 575.1, revenueGrowth: 32, eps: 0.39, grossMargin: 80, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.68, IGV: 2.75, FDTX: 2.44, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'DDOG appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 2.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 3, avgWeight: 5.39, proScore: 4.04, coverage: 0.75,
      price: 285.35, weeklyPrices: [300.06, 284.87, 293.60, 283.51, 285.35], weeklyChange: -4.9, sortRank: 0, periodReturns: { '1M': -11.4, '6M': 137.9, '1Y': 360.8 },
      priceHistory: { '1W': [300.06, 284.87, 293.6, 283.51, 285.35], '1M': [322.05, 308.05, 300.84, 296.98, 292.65, 266.8, 261.58, 271.05, 270.75, 279.22, 295.94, 288.9, 284.42, 288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 283.51, 285.35], '6M': [119.95, 105.77, 112.06, 117.51, 121.83, 139.99, 141.15, 146.79, 187.3, 187.21, 186.39, 170.37, 176.51, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 261.58, 295.94, 299.73, 285.35], '1Y': [61.92, 60.3, 63.42, 72.84, 70.96, 78.84, 80.05, 76.88, 75.95, 86.57, 82.17, 91.46, 90.24, 97.47, 101.43, 94.58, 102.51, 103.18, 112.77, 113.88, 136.12, 131.92, 118.74, 95.1, 107.26, 112.31, 120.91, 109.59, 113.62, 120.46, 128.85, 142.76, 141.15, 146.79, 187.3, 187.21, 186.39, 170.37, 176.51, 174.04, 186.82, 180.36, 218.07, 229.73, 242.77, 255.56, 294.69, 308.05, 261.58, 295.94, 299.73, 285.35] },
      velocityScore: { '1D': -3.6, '1W': 10.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 55.6, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { POW: 6.53, VOLT: 7.8, PBD: false, PBW: 1.84 },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, avgWeight: 5.42, proScore: 2.71, coverage: 0.5,
      price: 282.76, weeklyPrices: [276.54, 262.56, 279.13, 276.04, 282.76], weeklyChange: 2.25, sortRank: 0, periodReturns: { '1M': -6.6, '6M': 63.6, '1Y': 255.4 },
      priceHistory: { '1W': [276.54, 262.56, 279.13, 276.04, 282.76], '1M': [302.73, 298.22, 266.92, 268.73, 256.72, 258.28, 249.71, 254.75, 260.4, 270.01, 280.13, 276.96, 274.52, 269.86, 269.22, 280.09, 276.54, 262.56, 279.13, 276.04, 282.76], '6M': [172.82, 164.18, 176.17, 172.78, 187.43, 200.11, 205.17, 215.59, 229.32, 235.3, 234.4, 213.65, 198.5, 205.11, 214.98, 197.83, 210.32, 237.34, 257.41, 249.82, 297.17, 298.22, 249.71, 280.13, 280.09, 282.76], '1Y': [79.57, 87.35, 91.58, 98.83, 102.3, 101.32, 102.98, 125.91, 131.1, 134.58, 128.41, 140.42, 143.06, 148.32, 150.97, 142.72, 142.44, 142.94, 148.88, 154.9, 152.46, 154.86, 153.75, 144.89, 152.69, 163.19, 175.36, 166.55, 176.45, 175.77, 188, 201.17, 205.17, 215.59, 229.32, 235.3, 234.4, 213.65, 198.5, 209.52, 222.04, 197.98, 228.29, 236.04, 262.68, 249.82, 297.17, 298.22, 249.71, 280.13, 280.09, 282.76] },
      velocityScore: { '1D': -1.5, '1W': 5.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 68.3, revenueGrowth: 17, eps: 4.14, grossMargin: 39, dividendYield: 0.1,
      etfPresence: { POW: 3.32, VOLT: 7.51, PBD: false, PBW: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 2, avgWeight: 5.13, proScore: 2.57, coverage: 0.5,
      price: 681.4, weeklyPrices: [719.17, 695.11, 693.81, 691.95, 681.40], weeklyChange: -5.25, sortRank: 0, periodReturns: { '1M': -12.8, '6M': 47.4, '1Y': 95.4 },
      priceHistory: { '1W': [719.17, 695.11, 693.81, 691.95, 681.4], '1M': [781.38, 765.81, 773.72, 780.08, 769.99, 723.03, 714.13, 709.93, 716.91, 723.44, 733.62, 730.1, 711.73, 687.48, 706.06, 715.67, 719.17, 695.11, 693.81, 691.95, 681.4], '6M': [462.21, 414.25, 433.58, 439.68, 422.57, 466.75, 470.77, 477.77, 514.56, 525.13, 568.21, 566, 564.05, 574.02, 567.45, 533.78, 555.57, 594.4, 605.89, 630.94, 771.61, 765.81, 714.13, 733.62, 715.67, 681.4], '1Y': [348.76, 358.62, 374.07, 373.41, 380.09, 397.9, 407.22, 411.11, 387.5, 379.96, 375.87, 381.56, 376.09, 389.64, 390.65, 400.41, 420.86, 429.92, 437.52, 427.36, 448.69, 453.45, 449.42, 445.47, 460.43, 464.84, 466.91, 421.31, 432.67, 435.82, 432.66, 463.49, 470.77, 477.77, 514.56, 525.13, 568.21, 566, 564.05, 571.64, 578.44, 549.02, 576.24, 591.82, 613.78, 630.94, 771.61, 765.81, 714.13, 733.62, 715.67, 681.4] },
      velocityScore: { '1D': -0.8, '1W': 1.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$102B', pe: 93.7, revenueGrowth: 26, eps: 7.27, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.78, VOLT: 5.48, PBD: false, PBW: false },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 2, avgWeight: 4.78, proScore: 2.39, coverage: 0.5,
      price: 396.96, weeklyPrices: [418.61, 395.94, 403.14, 401.72, 396.96], weeklyChange: -5.17, sortRank: 0, periodReturns: { '1M': -5.3, '6M': 12.3, '1Y': 22.4 },
      priceHistory: { '1W': [418.61, 395.94, 403.14, 401.72, 396.96], '1M': [419, 401.53, 406.94, 408.1, 399.44, 381.87, 371.88, 379.69, 381.51, 391.35, 406.37, 401.94, 400.6, 400.08, 417.62, 421.21, 418.61, 395.94, 403.14, 401.72, 396.96], '6M': [353.45, 315.82, 323.67, 327.31, 324.51, 343.75, 332.28, 359.44, 377.06, 391.49, 374.56, 355.56, 361.06, 361.04, 359.74, 343.53, 368.85, 401.9, 409.7, 413.07, 410.86, 401.53, 371.88, 406.37, 421.21, 396.96], '1Y': [324.24, 330.51, 342.35, 358.19, 357.64, 380.72, 384.9, 390.09, 358.16, 357.49, 346.22, 351.4, 348.22, 360.08, 371.27, 364.74, 376.76, 377.19, 375.59, 372.4, 387.75, 385.44, 369.4, 345.65, 341.69, 338.93, 350.36, 315.95, 322.17, 322.26, 329.1, 337.59, 332.28, 359.44, 377.06, 391.49, 374.56, 355.56, 361.06, 363.95, 374.1, 357.67, 385.58, 395.06, 413.87, 413.07, 410.86, 401.53, 371.88, 406.37, 421.21, 396.96] },
      velocityScore: { '1D': -0.8, '1W': -0.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$154B', pe: 38.9, revenueGrowth: 17, eps: 10.2, grossMargin: 37, dividendYield: 1.1,
      etfPresence: { POW: 4.12, VOLT: 5.44, PBD: false, PBW: false },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 2, avgWeight: 3.56, proScore: 1.78, coverage: 0.5,
      price: 888.92, weeklyPrices: [963.33, 933.61, 933.85, 920.15, 888.92], weeklyChange: -7.72, sortRank: 0, periodReturns: { '1M': -17.2, '6M': 22.9, '1Y': 91 },
      priceHistory: { '1W': [963.33, 933.61, 933.85, 920.15, 888.92], '1M': [1073.08, 1071.98, 1062.57, 1090.53, 1049.23, 1012.25, 1011.8, 1024.52, 1043.82, 1038.74, 1031.89, 996, 968.32, 950.54, 969.67, 959.36, 963.33, 933.61, 933.85, 920.15, 888.92], '6M': [723, 614.19, 667.32, 679.55, 622.5, 681.55, 665.99, 754.97, 801.54, 819.15, 879.73, 842, 839.2, 827.37, 882.64, 817.35, 910.75, 987.5, 991.3, 1088.93, 1095.21, 1071.98, 1011.8, 1031.89, 959.36, 888.92], '1Y': [465.31, 488.66, 502.67, 505.07, 539.36, 570.17, 623.97, 655, 664.55, 634.31, 604.59, 622.39, 598.81, 634.15, 611, 607.52, 606.23, 634.27, 602, 595.15, 577.97, 559.7, 575.4, 595.37, 589.72, 629.11, 704.2, 639.43, 663.46, 680.86, 639.77, 684.86, 665.99, 754.97, 801.54, 819.15, 879.73, 842, 839.2, 844.05, 909.41, 872.9, 936.07, 985.92, 1127.56, 1088.93, 1095.21, 1071.98, 1011.8, 1031.89, 959.36, 888.92] },
      velocityScore: { '1D': -1.7, '1W': -1.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$239B', pe: 26, revenueGrowth: 16, eps: 34.23, grossMargin: 20, dividendYield: 0.22,
      etfPresence: { POW: 3.24, VOLT: 3.87, PBD: false, PBW: false },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 2, avgWeight: 3.52, proScore: 1.76, coverage: 0.5,
      price: 162.12, weeklyPrices: [173.88, 162.86, 163.81, 163.80, 162.12], weeklyChange: -6.76, sortRank: 0, periodReturns: { '1M': -6.5, '6M': 48.9, '1Y': 138.6 },
      priceHistory: { '1W': [173.88, 162.86, 163.81, 163.8, 162.12], '1M': [173.39, 170.74, 172.91, 173.96, 169.01, 160.69, 158.23, 161.86, 163.57, 164.66, 167.8, 164.87, 166.99, 171.55, 173.39, 176.39, 173.88, 162.86, 163.81, 163.8, 162.12], '6M': [108.87, 94.99, 103.97, 106.82, 105.38, 112.5, 110.58, 115.79, 114.62, 115.22, 118.22, 111.65, 109.13, 114.3, 121, 112.75, 118.92, 134.48, 137, 138.3, 169.41, 170.74, 158.23, 167.8, 176.39, 162.12], '1Y': [67.96, 69.83, 72, 73.44, 74.67, 77.23, 77.09, 78.72, 90.24, 90.61, 88.04, 91.11, 91.93, 95.71, 98.65, 96.6, 99.43, 97.73, 100.54, 100.62, 106.28, 112.5, 111.46, 105.74, 106.53, 108.27, 109.15, 98.28, 104.18, 106.61, 106.39, 109.9, 110.58, 115.79, 114.62, 115.22, 118.22, 111.65, 109.13, 114.71, 125.61, 118.28, 127.11, 131.38, 140.13, 138.3, 169.41, 170.74, 158.23, 167.8, 176.39, 162.12] },
      velocityScore: { '1D': -0.6, '1W': -1.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 55.3, revenueGrowth: 54, eps: 2.93, grossMargin: 37, dividendYield: 0.51,
      etfPresence: { POW: 3.89, VOLT: 3.14, PBD: false, PBW: false },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 2, avgWeight: 3.18, proScore: 1.59, coverage: 0.5,
      price: 483.47, weeklyPrices: [485.27, 476.82, 485.03, 486.47, 483.47], weeklyChange: -0.37, sortRank: 0, periodReturns: { '1M': -1.4, '6M': 7.9, '1Y': 24.6 },
      priceHistory: { '1W': [485.27, 476.82, 485.03, 486.47, 483.47], '1M': [490.16, 485.98, 483.79, 482.03, 479.97, 470.87, 461.5, 463.32, 460.98, 475.01, 484.25, 473.93, 473.61, 462.93, 480.46, 484.91, 485.27, 476.82, 485.03, 486.47, 483.47], '6M': [448.18, 429.68, 456.28, 463.03, 470.53, 489.31, 486.82, 495.59, 506.14, 524.25, 526.75, 488.49, 478.06, 472.64, 489.07, 472.07, 499.31, 545.62, 549.11, 544.71, 507.81, 485.98, 461.5, 484.25, 484.91, 483.47], '1Y': [388.09, 391.22, 399.06, 415.12, 422.26, 437.23, 437.5, 437.44, 423.57, 443.95, 429.96, 446.06, 437.16, 450.93, 440.1, 420.44, 423.42, 418.89, 428.82, 433.27, 472.57, 468.06, 453, 419.09, 428.47, 437.71, 462.82, 434.85, 454.94, 465.48, 472.88, 472.54, 486.82, 495.59, 506.14, 524.25, 526.75, 488.49, 478.06, 471.22, 505.62, 490.74, 527.21, 526.94, 549.75, 544.71, 507.81, 485.98, 461.5, 484.25, 484.91, 483.47] },
      velocityScore: { '1D': 0, '1W': 4.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 28.6, revenueGrowth: 11, eps: 16.93, grossMargin: 36, dividendYield: 1.17,
      etfPresence: { POW: 2.96, VOLT: 3.4, PBD: false, PBW: false },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 2, avgWeight: 3.14, proScore: 1.57, coverage: 0.5,
      price: 250.78, weeklyPrices: [291.37, 263.61, 253.57, 259.61, 250.78], weeklyChange: -13.93, sortRank: 0, periodReturns: { '1M': -11.7, '6M': 147.6, '1Y': 1059.4 },
      priceHistory: { '1W': [291.37, 263.61, 253.57, 259.61, 250.78], '1M': [283.92, 280.69, 289.76, 303.41, 275.95, 258.71, 261.34, 282.31, 307.88, 302.49, 293.8, 290.01, 285, 273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 259.61, 250.78], '6M': [101.29, 76.97, 91.88, 98.69, 134.07, 149.5, 139.62, 156.13, 155.17, 145.32, 166.2, 153.02, 154, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 261.34, 293.8, 287.32, 250.78], '1Y': [21.63, 21.34, 21.6, 22.56, 25.85, 24.31, 33.06, 37.62, 38.86, 44.08, 44.51, 50.85, 54.91, 67.29, 80.97, 68.69, 88, 86.65, 115.09, 101.42, 133.71, 141.41, 126.72, 108.93, 101.14, 118.09, 108.99, 80.21, 90.18, 103.87, 136.87, 151.75, 139.62, 156.13, 155.17, 145.32, 166.2, 153.02, 154, 160.05, 145.88, 135.49, 146.78, 213.84, 229.75, 226.37, 295.25, 280.69, 261.34, 293.8, 287.32, 250.78] },
      velocityScore: { '1D': 3.3, '1W': -25.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$71B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: 4.12, PBD: false, PBW: 2.16 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 2, avgWeight: 3.01, proScore: 1.51, coverage: 0.5,
      price: 85.01, weeklyPrices: [85.68, 85.84, 84.01, 84.83, 85.01], weeklyChange: -0.78, sortRank: 0, periodReturns: { '1M': -10.4, '6M': 4.6, '1Y': 16.8 },
      priceHistory: { '1W': [85.68, 85.84, 84.01, 84.83, 85.01], '1M': [94.84, 94.59, 94.85, 95.68, 93.36, 89.04, 90.06, 88.27, 89.69, 88.55, 87.65, 87.25, 87.01, 83.66, 85.68, 84.58, 85.68, 85.84, 84.01, 84.83, 85.01], '6M': [81.27, 80.29, 80.45, 80.93, 79.89, 83.63, 85.47, 86.33, 89.48, 92.71, 95.68, 92.59, 91.54, 92.82, 90.23, 92.05, 93.67, 91.31, 90.6, 96.51, 96.28, 94.59, 90.06, 87.65, 84.58, 85.01], '1Y': [72.81, 71.86, 70.34, 73.02, 74.64, 75.18, 71.97, 70.99, 70.54, 72.3, 76.18, 73.89, 70.87, 71.32, 70.79, 74.65, 78.18, 83.71, 85.05, 83.25, 81.76, 82.14, 85.89, 84.27, 85.54, 83.39, 81.21, 80.85, 80.41, 81.32, 81.12, 83.51, 85.47, 86.33, 89.48, 92.71, 95.68, 92.59, 91.54, 92.53, 91.62, 92.88, 94.17, 91.24, 90, 96.51, 96.28, 94.59, 90.06, 87.65, 84.58, 85.01] },
      velocityScore: { '1D': 0.7, '1W': 2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$177B', pe: 21.6, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.94,
      etfPresence: { POW: 2.01, VOLT: 4.02, PBD: false, PBW: false },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 2.84, proScore: 1.42, coverage: 0.5,
      price: 127.94, weeklyPrices: [127.79, 129.14, 126.77, 127.76, 127.94], weeklyChange: 0.12, sortRank: 0, periodReturns: { '1M': -2.1, '6M': 12.1, '1Y': 25.6 },
      priceHistory: { '1W': [127.79, 129.14, 126.77, 127.76, 127.94], '1M': [130.7, 131.94, 127.95, 128.6, 125.15, 127.68, 128.92, 128.87, 129.61, 131.59, 129.57, 127.76, 126.67, 123.79, 127.11, 126.31, 127.79, 129.14, 126.77, 127.76, 127.94], '6M': [114.16, 114.71, 115.31, 115.81, 116.91, 119.96, 118.02, 118.33, 121.1, 130.24, 132.39, 131.92, 132.31, 134.15, 127.92, 131.12, 132.92, 135.46, 131.89, 135.59, 137.04, 131.94, 128.92, 129.57, 126.31, 127.94], '1Y': [101.87, 101.62, 101.41, 103.26, 106.04, 105.93, 108.97, 113.25, 113.49, 113.11, 113.55, 112.89, 108.64, 108.74, 106.44, 107.86, 113.46, 116.91, 117.53, 116.18, 122.11, 119.76, 122.68, 121.71, 122.72, 118.04, 114.26, 115.58, 115.67, 114.07, 116.57, 119.22, 118.02, 118.33, 121.1, 130.24, 132.39, 131.92, 132.31, 133.62, 128.8, 131.08, 134.71, 134.39, 131.62, 135.59, 137.04, 131.94, 128.92, 129.57, 126.31, 127.94] },
      velocityScore: { '1D': 0.7, '1W': 3.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 18.9, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.97,
      etfPresence: { POW: 1.4, VOLT: 4.28, PBD: false, PBW: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.68, proScore: 1.34, coverage: 0.5,
      price: 155.85, weeklyPrices: [146.77, 138.81, 143.60, 154.07, 155.85], weeklyChange: 6.19, sortRank: 0, periodReturns: { '1M': 27.3, '6M': 12.4, '1Y': 68.5 },
      priceHistory: { '1W': [146.77, 138.81, 143.6, 154.07, 155.85], '1M': [122.47, 127.87, 124.64, 129.19, 125, 121.72, 119.2, 123.05, 124.86, 132.06, 140.24, 147.68, 148.76, 146.34, 148.4, 147.62, 146.77, 138.81, 143.6, 154.07, 155.85], '6M': [138.68, 126.51, 137.94, 139.71, 140.16, 154.39, 155.56, 144.93, 144.2, 148.57, 151.5, 129.58, 136.74, 136.8, 130.67, 119.15, 128.38, 148.72, 151.93, 143.72, 136.69, 127.87, 119.2, 140.24, 147.62, 155.85], '1Y': [92.49, 92.8, 97.02, 98.52, 98.31, 101.96, 104.46, 105.49, 109.5, 109.83, 108.65, 110.13, 112.75, 119.47, 122.07, 122.33, 123.58, 126.25, 127.36, 135.31, 139.75, 138.87, 141.92, 136.66, 138.72, 139.46, 139.09, 129.61, 137.43, 139.88, 145.11, 152.33, 155.56, 144.93, 144.2, 148.57, 151.5, 129.58, 136.74, 135.12, 127.96, 126.35, 135.32, 146.98, 148.13, 143.72, 136.69, 127.87, 119.2, 140.24, 147.62, 155.85] },
      velocityScore: { '1D': 7.2, '1W': 7.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$192B', pe: 44.8, revenueGrowth: 58, eps: 3.48, grossMargin: 38, dividendYield: 0.65,
      etfPresence: { POW: 1.01, VOLT: 4.35, PBD: false, PBW: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.5, proScore: 1.25, coverage: 0.5,
      price: 314.23, weeklyPrices: [320.92, 294.81, 306.11, 311.64, 314.23], weeklyChange: -2.08, sortRank: 0, periodReturns: { '1M': -11.5, '6M': 41.9, '1Y': 147.6 },
      priceHistory: { '1W': [320.92, 294.81, 306.11, 311.64, 314.23], '1M': [354.97, 339.42, 339.19, 344.6, 323.46, 309.06, 302.84, 313.05, 323.79, 324.86, 328.34, 317.08, 302.18, 294.65, 312.28, 322.5, 320.92, 294.81, 306.11, 311.64, 314.23], '6M': [221.47, 204.49, 217.23, 221.99, 219.59, 253.86, 263.03, 261.82, 279.17, 314.12, 335.74, 322.47, 311.39, 308.31, 329.78, 298.29, 339.32, 385.73, 385, 369.08, 345.63, 339.42, 302.84, 328.34, 322.5, 314.23], '1Y': [126.91, 124.54, 133.28, 137.55, 143.62, 142.73, 140.91, 144.07, 139.81, 162.52, 147.74, 153.73, 150.14, 159.52, 169.75, 167.35, 178.08, 179.98, 192.22, 198.42, 208.05, 225.8, 212.79, 198.89, 209.9, 214.65, 224.11, 208.77, 217.86, 227.65, 227.59, 250.95, 263.03, 261.82, 279.17, 314.12, 335.74, 322.47, 311.39, 315.91, 356.38, 322.71, 366.95, 374.32, 377.19, 369.08, 345.63, 339.42, 302.84, 328.34, 322.5, 314.23] },
      velocityScore: { '1D': 1.6, '1W': 2.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 65.5, revenueGrowth: 26, eps: 4.8, grossMargin: 39, dividendYield: 0.13,
      etfPresence: { POW: 0.97, VOLT: 4.04, PBD: false, PBW: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'XEL', name: 'Xcel Energy Inc', easyScore: 2, avgWeight: 1.97, proScore: 0.98, coverage: 0.5,
      price: 78.11, weeklyPrices: [77.77, 79.04, 77.62, 77.87, 78.11], weeklyChange: 0.44, sortRank: 0, periodReturns: { '1M': -3.1, '6M': 4.7, '1Y': 13.3 },
      priceHistory: { '1W': [77.77, 79.04, 77.62, 77.87, 78.11], '1M': [80.6, 79.9, 79.91, 80.03, 77.92, 78.1, 79.73, 79.86, 80.2, 81.08, 81, 79.26, 79.5, 76.41, 77.87, 77.39, 77.77, 79.04, 77.62, 77.87, 78.11], '6M': [74.62, 73.14, 74.09, 74.68, 74.26, 75.61, 75.73, 74.5, 76.43, 80.75, 83.91, 83.17, 81.88, 81.63, 76.95, 79.17, 80.54, 79.83, 79.08, 79.48, 81.45, 79.9, 79.73, 81, 77.39, 78.11], '1Y': [68.96, 65.65, 67.32, 67.56, 68.45, 69.65, 72.78, 72.39, 73.3, 72.92, 73.17, 72.87, 72.24, 72.85, 72.17, 77.25, 79.6, 81.26, 81.1, 80.41, 79.69, 81.19, 80.72, 79.67, 81.25, 77.77, 74.68, 73.61, 74.42, 74.07, 74, 76.21, 75.73, 74.5, 76.43, 80.75, 83.91, 83.17, 81.88, 81.41, 77.96, 79.44, 81.46, 78.65, 78.11, 79.48, 81.45, 79.9, 79.73, 81, 77.39, 78.11] },
      velocityScore: { '1D': 0, '1W': 3.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$49B', pe: 22.5, revenueGrowth: 3, eps: 3.47, grossMargin: 46, dividendYield: 3.04,
      etfPresence: { POW: 1.98, VOLT: 1.96, PBD: false, PBW: false },
      tonyNote: 'Xcel Energy Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BLDP', name: 'Ballard Power Systems Inc', easyScore: 2, avgWeight: 1.67, proScore: 0.83, coverage: 0.5,
      price: 4.66, weeklyPrices: [6.07, 4.92, 5.16, 4.74, 4.66], weeklyChange: -23.23, sortRank: 0, periodReturns: { '1M': 11.8, '6M': 67.6, '1Y': 179 },
      priceHistory: { '1W': [6.07, 4.92, 5.16, 4.74, 4.66], '1M': [4.17, 4.16, 4.14, 4.13, 4.45, 4.33, 4.18, 4.76, 5.43, 5.54, 6.09, 6.19, 6.29, 6.3, 6.38, 6.06, 6.07, 4.92, 5.16, 4.74, 4.66], '6M': [2.78, 2.53, 2.69, 2.68, 2.76, 2.79, 2.56, 2.31, 2.17, 2.14, 2.12, 2.07, 1.97, 2.53, 2.51, 2.3, 2.4, 2.94, 3.1, 3.1, 4.33, 4.16, 4.18, 6.09, 6.06, 4.66], '1Y': [1.67, 1.57, 1.4, 1.67, 1.94, 1.84, 2.1, 1.83, 1.83, 1.87, 1.9, 2.02, 1.85, 2.05, 2.62, 2.93, 2.87, 3.59, 3.67, 3.28, 3.54, 3.65, 3.43, 2.85, 2.78, 2.8, 2.89, 2.63, 2.63, 2.76, 2.79, 2.64, 2.56, 2.31, 2.17, 2.14, 2.12, 2.07, 1.97, 2.68, 2.46, 2.42, 2.6, 3.07, 3.5, 3.1, 4.33, 4.16, 4.18, 6.09, 6.06, 4.66] },
      velocityScore: { '1D': -6.7, '1W': -30.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1B', pe: null, revenueGrowth: 26, eps: -0.27, grossMargin: 11, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: 1.11, PBW: 2.23 },
      tonyNote: 'Ballard Power Systems is a hydrogen fuel cell technology company. It appears in Electrification ETFs as a long-duration bet on hydrogen as a zero-carbon fuel for heavy industry and transit. Revenue is small, the company is pre-profitability, and the weight is minimal — this is a thematic placeholder allocation, not a fundamental position.',
    },
    {
      ticker: 'SU', name: 'Schneider Electric SE', easyScore: 2, avgWeight: 1.32, proScore: 0.66, coverage: 0.5,
      price: 61.73, weeklyPrices: [65.47, 62.22, 63.25, 61.20, 61.73], weeklyChange: -5.71, sortRank: 0, periodReturns: { '1M': -5.2, '6M': 39.8, '1Y': 64.1 },
      priceHistory: { '1W': [65.47, 62.22, 63.25, 61.2, 61.73], '1M': [65.12, 66.56, 66.07, 66.79, 68.29, 69.73, 69.65, 67.83, 67.73, 67.34, 63.97, 63.31, 62.36, 63.76, 65.31, 65.54, 65.47, 62.22, 63.25, 61.2, 61.73], '6M': [44.17, 42.82, 43.24, 45.59, 46.69, 49.74, 51.17, 52.66, 54.67, 55.09, 55.97, 57.14, 57.28, 60.62, 63.19, 65.98, 66.79, 63.56, 62.55, 65.19, 69.65, 66.56, 69.65, 63.97, 65.54, 61.73], '1Y': [37.62, 41.04, 37.97, 38.3, 39.41, 39.09, 39.7, 39.69, 39.23, 38.94, 38.6, 41.02, 40.15, 42.02, 42.72, 42.7, 41.11, 40.37, 38.58, 39.62, 40, 41.22, 44.23, 44.98, 44.45, 44.77, 44.31, 42.4, 43.11, 44.77, 46.63, 49.35, 51.17, 52.66, 54.67, 55.09, 55.97, 57.14, 57.28, 61.32, 64.11, 66.11, 64.54, 62.97, 63.43, 65.19, 69.65, 66.56, 69.65, 63.97, 65.54, 61.73] },
      velocityScore: { '1D': -4.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$73B', pe: 16.4, revenueGrowth: 18, eps: 3.77, grossMargin: 59, dividendYield: 2.82,
      etfPresence: { POW: 1.15, VOLT: 1.5, PBD: false, PBW: false },
      tonyNote: 'Schneider Electric SE appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 1.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ENPH', name: 'Enphase Energy Inc', easyScore: 2, avgWeight: 0.93, proScore: 0.46, coverage: 0.5,
      price: 51.84, weeklyPrices: [68.39, 56.07, 56.88, 53.51, 51.84], weeklyChange: -24.2, sortRank: 0, periodReturns: { '1M': 37.7, '6M': 58.1, '1Y': 15 },
      priceHistory: { '1W': [68.39, 56.07, 56.88, 53.51, 51.84], '1M': [37.65, 37.48, 42, 48.01, 52.89, 49.69, 46.76, 53.15, 62.34, 64.03, 70.28, 69.5, 68.36, 63.74, 72.33, 69.02, 68.39, 56.07, 56.88, 53.51, 51.84], '6M': [32.79, 31.61, 32.85, 33.75, 35.22, 34.98, 39.42, 36.47, 50.3, 45.64, 49.74, 43.2, 43.59, 45.89, 40.76, 35.64, 32.04, 32, 33.62, 34.3, 36.02, 37.48, 46.76, 70.28, 69.02, 51.84], '1Y': [45.08, 34.92, 38.11, 40.97, 42.97, 38.74, 35.52, 33.4, 30.11, 34.22, 35.68, 37.56, 36.52, 37.32, 38.44, 37.08, 37.74, 36.71, 37.56, 35.64, 31.14, 32.2, 30.71, 26.89, 27.82, 30.76, 33.01, 32.96, 33, 34, 36.68, 34.52, 39.42, 36.47, 50.3, 45.64, 49.74, 43.2, 43.59, 44.7, 40.97, 37.81, 32.56, 32.18, 35.36, 34.3, 36.02, 37.48, 46.76, 70.28, 69.02, 51.84] },
      velocityScore: { '1D': -6.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: 51.3, revenueGrowth: -21, eps: 1.01, grossMargin: 27, dividendYield: null,
      etfPresence: { POW: 0.77, VOLT: false, PBD: 1.08, PBW: false },
      tonyNote: 'Enphase Energy Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 0.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CEG', name: 'Constellation Energy Corp', easyScore: 2, avgWeight: 0.88, proScore: 0.44, coverage: 0.5,
      price: 245.82, weeklyPrices: [264.59, 254.83, 250.67, 251.65, 245.82], weeklyChange: -7.09, sortRank: 0, periodReturns: { '1M': -18, '6M': -32.1, '1Y': -15.5 },
      priceHistory: { '1W': [264.59, 254.83, 250.67, 251.65, 245.82], '1M': [299.69, 293.6, 274.89, 275.26, 267.2, 262, 260.67, 281.26, 285.83, 294.07, 288.68, 286.31, 287.75, 265.7, 272.65, 267.24, 264.59, 254.83, 250.67, 251.65, 245.82], '6M': [362.07, 340.97, 363.95, 366.25, 342.52, 307.71, 285.27, 270.88, 272.15, 303.01, 312.64, 324.87, 317.09, 305.58, 289.76, 298.61, 272.58, 296.61, 277.7, 305.71, 320.42, 293.6, 260.67, 288.68, 267.24, 245.82], '1Y': [291.02, 305.7, 315.14, 306.63, 313.62, 308.08, 321.67, 345.27, 338.46, 327.63, 314.21, 315.94, 309.06, 318, 322.71, 326.33, 357.46, 383.23, 396.53, 365.8, 401.43, 363.25, 354.02, 357.48, 359.09, 368.62, 378.6, 361.05, 360.46, 354.94, 335.86, 295.4, 285.27, 270.88, 272.15, 303.01, 312.64, 324.87, 317.09, 307.69, 294.85, 279.25, 284.27, 294.73, 287.16, 305.71, 320.42, 293.6, 260.67, 288.68, 267.24, 245.82] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$88B', pe: 21.4, revenueGrowth: 64, eps: 11.5, grossMargin: 23, dividendYield: 0.68,
      etfPresence: { POW: 1.33, VOLT: 0.43, PBD: false, PBW: false },
      tonyNote: 'Constellation Energy Corp appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 0.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SEDG', name: 'SolarEdge Technologies Inc', easyScore: 2, avgWeight: 0.76, proScore: 0.38, coverage: 0.5,
      price: 55.66, weeklyPrices: [73.14, 63.17, 63.95, 57.80, 55.66], weeklyChange: -23.91, sortRank: 0, periodReturns: { '1M': 33.2, '6M': 76.3, '1Y': 165.9 },
      priceHistory: { '1W': [73.14, 63.17, 63.95, 57.8, 55.66], '1M': [41.79, 40.42, 42.77, 50.24, 61.76, 55.23, 54.53, 56.22, 63, 61.95, 73.23, 73.19, 76.35, 75.8, 78.51, 74.02, 73.14, 63.17, 63.95, 57.8, 55.66], '6M': [31.56, 28.92, 30.74, 31.36, 32.89, 33.91, 34.41, 30.64, 36.8, 37.13, 43.07, 37.81, 38.11, 40.71, 46.73, 47.37, 43.85, 42.98, 40.57, 44.29, 44.64, 40.42, 54.53, 73.23, 74.02, 55.66], '1Y': [20.93, 15.96, 19.09, 23.6, 27.57, 25.25, 28.47, 25.81, 25.79, 26.46, 32.06, 33.09, 34.16, 29.49, 34.71, 37.9, 37.96, 38.61, 40.11, 37.82, 36.3, 41.02, 42.51, 33.46, 35.47, 31.94, 32.02, 28.47, 30.45, 31.26, 35.31, 32.49, 34.41, 30.64, 36.8, 37.13, 43.07, 37.81, 38.11, 42.88, 47.67, 51.05, 43.52, 37.83, 42.6, 44.29, 44.64, 40.42, 54.53, 73.23, 74.02, 55.66] },
      velocityScore: { '1D': -7.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3B', pe: null, revenueGrowth: 42, eps: -6.13, grossMargin: 18, dividendYield: null,
      etfPresence: { POW: 0.39, VOLT: false, PBD: 1.12, PBW: false },
      tonyNote: 'SolarEdge Technologies Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 0.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NRG', name: 'NRG Energy Inc', easyScore: 2, avgWeight: 0.75, proScore: 0.38, coverage: 0.5,
      price: 125.99, weeklyPrices: [133.39, 129.20, 127.71, 129.96, 125.99], weeklyChange: -5.55, sortRank: 0, periodReturns: { '1M': -8.2, '6M': -25.1, '1Y': -15.3 },
      priceHistory: { '1W': [133.39, 129.2, 127.71, 129.96, 125.99], '1M': [137.3, 137.34, 131.08, 134.72, 127.81, 125.5, 123.71, 133.98, 136.92, 137.65, 138, 137.5, 134.08, 129.47, 133.51, 133.76, 133.39, 129.2, 127.71, 129.96, 125.99], '6M': [168.16, 149.48, 160.56, 166.16, 149.27, 152.05, 149.93, 149.11, 155.72, 173.45, 184.03, 162.06, 155.15, 152.48, 151.77, 141.23, 153.06, 170.96, 149.86, 154.81, 157.43, 137.34, 123.71, 138, 133.76, 125.99], '1Y': [148.68, 152.08, 153.32, 155.54, 151.36, 147.38, 157.97, 166.59, 148.56, 155, 148.19, 148.12, 147.95, 157.92, 164.19, 162.96, 167.3, 168.25, 169.93, 163.81, 178.5, 173.19, 168.84, 168.8, 168.54, 169.36, 170.64, 154.64, 160.88, 161.59, 148.89, 148.91, 149.93, 149.11, 155.72, 173.45, 184.03, 162.06, 155.15, 154.75, 151.13, 146.14, 160.3, 168.45, 149.6, 154.81, 157.43, 137.34, 123.71, 138, 133.76, 125.99] },
      velocityScore: { '1D': 2.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 138.5, revenueGrowth: 20, eps: 0.91, grossMargin: 16, dividendYield: 1.46,
      etfPresence: { POW: 0.53, VOLT: 0.97, PBD: false, PBW: false },
      tonyNote: 'NRG Energy Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 0.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, avgWeight: 5.11, proScore: 1.28, coverage: 0.25,
      price: 287.9, weeklyPrices: [306.12, 271.04, 274.97, 283.48, 287.90], weeklyChange: -5.95, sortRank: 0, periodReturns: { '1M': -8, '6M': 185.5, '1Y': 528.7 },
      priceHistory: { '1W': [306.12, 271.04, 274.97, 283.48, 287.9], '1M': [312.96, 292.53, 309.27, 290.54, 273.67, 249.02, 243.43, 264.2, 268.29, 267.99, 345.84, 342.09, 334.84, 328.85, 332.95, 330.48, 306.12, 271.04, 274.97, 283.48, 287.9], '6M': [100.83, 97.19, 108.46, 116.86, 142.31, 149.88, 158.46, 165.35, 159.04, 157.28, 190.3, 201.97, 175.8, 185.42, 173.07, 142.22, 159.83, 190.1, 246.24, 248.7, 266.01, 292.53, 243.43, 345.84, 330.48, 287.9], '1Y': [45.79, 44.25, 46.05, 45.85, 47.06, 48.39, 47.15, 45.81, 46.13, 49.48, 46.49, 51.32, 51.9, 50.96, 53.84, 52.14, 48.88, 52.62, 60.47, 92.98, 91.17, 94.88, 94.35, 85.07, 89.54, 94.54, 100.97, 98.29, 111.02, 133.64, 139.12, 157.4, 158.46, 165.35, 159.04, 157.28, 190.3, 201.97, 175.8, 196.33, 180.5, 161, 179.99, 194.2, 265, 248.7, 266.01, 292.53, 243.43, 345.84, 330.48, 287.9] },
      velocityScore: { '1D': null, '1W': -10.5, '1M': null, '6M': null }, isNew: true,
      marketCap: '$13B', pe: 96.6, revenueGrowth: 20, eps: 2.98, grossMargin: 54, dividendYield: null,
      etfPresence: { POW: 5.11, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Vicor Corp is a power conversion specialist — high-efficiency modules for AI server power delivery. It holds a niche position in Industrials ETFs on the data center power density thesis. Revenue growth has been lumpy, but when AI GPU clusters require Vicor\'s factorized power architecture, the order cycles are large.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 5.42, proScore: 2.17, coverage: 0.4,
      price: 847.55, weeklyPrices: [993.74, 882.43, 891.86, 842.01, 847.55], weeklyChange: -14.71, sortRank: 0, periodReturns: { '1M': -2.4, '6M': 155.6, '1Y': 327.3 },
      priceHistory: { '1W': [993.74, 882.43, 891.86, 842.01, 847.55], '1M': [868.18, 851.35, 854.28, 889.03, 848.84, 770.76, 728.29, 752, 733.77, 732.94, 782.12, 842.96, 860.84, 845.39, 875.52, 957.03, 993.74, 882.43, 891.86, 842.01, 847.55], '6M': [331.61, 283.57, 314, 319.16, 308.13, 350.96, 361.21, 367.95, 418.61, 421.2, 459.72, 415.51, 411.53, 417.76, 422.55, 382.55, 382.22, 464.54, 472.84, 471.85, 806, 851.35, 728.29, 782.12, 957.03, 847.55], '1Y': [198.37, 221.36, 224.64, 228.72, 236.29, 250.69, 252.68, 263.35, 299.42, 292.47, 274.89, 289.36, 288.68, 316.16, 348.58, 338.44, 351.66, 355.53, 361.02, 353.8, 403.35, 411.07, 380.7, 334.17, 339.75, 332.29, 340.51, 302.3, 316.55, 327.11, 307.58, 349.59, 361.21, 367.95, 418.61, 421.2, 459.72, 415.51, 411.53, 425.51, 446.16, 407.27, 423.35, 456.08, 487.87, 471.85, 806, 851.35, 728.29, 782.12, 957.03, 847.55] },
      velocityScore: { '1D': -5.2, '1W': -1.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 75.7, revenueGrowth: 92, eps: 11.2, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 6.28, PRN: 4.55, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 5.18, proScore: 2.07, coverage: 0.4,
      price: 285.35, weeklyPrices: [300.06, 284.87, 293.60, 283.51, 285.35], weeklyChange: -4.9, sortRank: 0, periodReturns: { '1M': -11.4, '6M': 137.9, '1Y': 360.8 },
      priceHistory: { '1W': [300.06, 284.87, 293.6, 283.51, 285.35], '1M': [322.05, 308.05, 300.84, 296.98, 292.65, 266.8, 261.58, 271.05, 270.75, 279.22, 295.94, 288.9, 284.42, 288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 283.51, 285.35], '6M': [119.95, 105.77, 112.06, 117.51, 121.83, 139.99, 141.15, 146.79, 187.3, 187.21, 186.39, 170.37, 176.51, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 261.58, 295.94, 299.73, 285.35], '1Y': [61.92, 60.3, 63.42, 72.84, 70.96, 78.84, 80.05, 76.88, 75.95, 86.57, 82.17, 91.46, 90.24, 97.47, 101.43, 94.58, 102.51, 103.18, 112.77, 113.88, 136.12, 131.92, 118.74, 95.1, 107.26, 112.31, 120.91, 109.59, 113.62, 120.46, 128.85, 142.76, 141.15, 146.79, 187.3, 187.21, 186.39, 170.37, 176.51, 174.04, 186.82, 180.36, 218.07, 229.73, 242.77, 255.56, 294.69, 308.05, 261.58, 295.94, 299.73, 285.35] },
      velocityScore: { '1D': -2.8, '1W': -2.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 55.6, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { AIRR: 2.56, PRN: false, RSHO: 7.81, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.1, proScore: 2.04, coverage: 0.4,
      price: 898.01, weeklyPrices: [940.48, 904.28, 915.64, 914.70, 898.01], weeklyChange: -4.52, sortRank: 0, periodReturns: { '1M': -3.1, '6M': 45.9, '1Y': 150.4 },
      priceHistory: { '1W': [940.48, 904.28, 915.64, 914.7, 898.01], '1M': [926.79, 912.14, 902.3, 920.22, 888.31, 863.95, 860.15, 872.56, 865.95, 879.89, 909.93, 887.67, 875.87, 865.36, 909.81, 926.18, 940.48, 904.28, 915.64, 914.7, 898.01], '6M': [615.35, 561.89, 583.76, 598.41, 617.62, 646.89, 635.92, 690.91, 742.12, 764.76, 768.23, 722.18, 716.68, 699.78, 701.7, 667.43, 724.44, 794.25, 800.45, 817.87, 904.59, 912.14, 860.15, 909.93, 926.18, 898.01], '1Y': [358.57, 357.68, 371.58, 398.43, 408.33, 418.07, 429.52, 434.12, 427.72, 413.7, 420.59, 432.67, 420.22, 431.38, 466.96, 463.72, 490.57, 500.36, 540.96, 520.5, 585.49, 569.15, 573.02, 553.11, 573.73, 599.15, 625.61, 565.83, 583, 616.1, 629.77, 629, 635.92, 690.91, 742.12, 764.76, 768.23, 722.18, 716.68, 702, 716.63, 708.46, 771.58, 770.17, 808.87, 817.87, 904.59, 912.14, 860.15, 909.93, 926.18, 898.01] },
      velocityScore: { '1D': -0.5, '1W': 4.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$414B', pe: 44.6, revenueGrowth: 22, eps: 20.12, grossMargin: 29, dividendYield: 0.66,
      etfPresence: { AIRR: false, PRN: 3.42, RSHO: 6.78, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.53, proScore: 1.81, coverage: 0.4,
      price: 1809.99, weeklyPrices: [1914.65, 1843.94, 1852.03, 1831.56, 1809.99], weeklyChange: -5.47, sortRank: 0, periodReturns: { '1M': -11, '6M': 77.2, '1Y': 271.1 },
      priceHistory: { '1W': [1914.65, 1843.94, 1852.03, 1831.56, 1809.99], '1M': [2032.98, 2016.31, 2034.63, 2042.36, 1992.74, 1854.43, 1825.5, 1835.51, 1835.33, 1828.25, 1867.09, 1855.15, 1828.21, 1787.88, 1883.26, 1850.04, 1914.65, 1843.94, 1852.03, 1831.56, 1809.99], '6M': [1021.36, 883.79, 958.07, 1003.64, 1010.41, 1119.98, 1127.55, 1176.26, 1283.65, 1337.75, 1468.58, 1391.16, 1383.62, 1414.1, 1408.25, 1273.18, 1424.91, 1650.48, 1674.16, 1719.21, 1967.24, 2016.31, 1825.5, 1867.09, 1850.04, 1809.99], '1Y': [487.71, 495.37, 507.6, 529.9, 533.77, 550.5, 562.83, 702.97, 690.45, 702.1, 681.08, 709.83, 723.95, 764.91, 799.38, 781.88, 832.98, 834.7, 838.78, 825, 1010.64, 987.78, 973.18, 930.5, 970.95, 1004.65, 1024.92, 918.54, 963.83, 1032.31, 1038.18, 1134.75, 1127.55, 1176.26, 1283.65, 1337.75, 1468.58, 1391.16, 1383.62, 1424.46, 1461.52, 1378.99, 1525.16, 1648.96, 1724.49, 1719.21, 1967.24, 2016.31, 1825.5, 1867.09, 1850.04, 1809.99] },
      velocityScore: { '1D': -0.5, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$64B', pe: 52.3, revenueGrowth: 1, eps: 34.62, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: 4.26, PRN: 4.79, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, avgWeight: 3.97, proScore: 1.59, coverage: 0.4,
      price: 618.99, weeklyPrices: [689.43, 694.72, 619.98, 613.93, 618.99], weeklyChange: -10.22, sortRank: 0, periodReturns: { '1M': -9.4, '6M': 90, '1Y': 195.5 },
      priceHistory: { '1W': [689.43, 694.72, 619.98, 613.93, 618.99], '1M': [683.52, 681.01, 719.92, 740.91, 722.31, 664.76, 639.58, 630.5, 644.64, 656.35, 673.51, 677.45, 667.02, 646.89, 663.14, 686.37, 689.43, 694.72, 619.98, 613.93, 618.99], '6M': [325.77, 296.56, 328.26, 325.96, 311.87, 383.66, 353.5, 355.77, 370, 406.88, 447.6, 438.93, 458.71, 466.52, 463.15, 513.98, 576.95, 603.91, 615.42, 630.7, 720, 681.01, 639.58, 673.51, 686.37, 618.99], '1Y': [209.45, 212.82, 209.05, 206.15, 208.46, 203.84, 224.37, 240.5, 229.9, 229.52, 215.89, 226.87, 237.83, 232.59, 259.58, 258.17, 271.34, 270.09, 296.39, 276.12, 292.22, 324.93, 364.78, 358.72, 380.62, 356.39, 330.6, 313.9, 325.14, 339.54, 309.26, 384.34, 353.5, 355.77, 370, 406.88, 447.6, 438.93, 458.71, 473.63, 444.83, 544.65, 588.28, 606.43, 651.68, 630.7, 720, 681.01, 639.58, 673.51, 686.37, 618.99] },
      velocityScore: { '1D': -0.6, '1W': -4.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 54.5, revenueGrowth: 50, eps: 11.36, grossMargin: 21, dividendYield: 0.33,
      etfPresence: { AIRR: 3.79, PRN: 4.15, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Argan Inc is an engineering and construction company for power generation facilities — natural gas and renewable power plants. It appears in Industrials ETFs because power plant construction is one of the fastest-growing categories in U.S. infrastructure spending, driven by data center load additions that the grid cannot currently support.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.5, proScore: 1.4, coverage: 0.4,
      price: 322.19, weeklyPrices: [313.67, 315.29, 314.42, 322.81, 322.19], weeklyChange: 2.72, sortRank: 0, periodReturns: { '1M': 3.7, '6M': 21.9, '1Y': 37.9 },
      priceHistory: { '1W': [313.67, 315.29, 314.42, 322.81, 322.19], '1M': [310.55, 313.7, 310.87, 315.72, 307.17, 305.22, 302.64, 306.25, 305.66, 307.1, 312.65, 308.53, 303.81, 300.98, 308.31, 313.39, 313.67, 315.29, 314.42, 322.81, 322.19], '6M': [264.32, 256.73, 264.33, 259.63, 272.25, 281.21, 281.54, 270.02, 282.45, 278.31, 282.27, 277.7, 264.31, 256.83, 262.23, 258.01, 272.54, 292.01, 293.59, 301.24, 305.48, 313.7, 302.64, 312.65, 313.39, 322.19], '1Y': [233.71, 225.18, 224.6, 245.19, 255.95, 261.93, 268.07, 273.62, 264.97, 275.72, 262.46, 268.4, 267.96, 269.68, 262.77, 259.1, 259.16, 251.03, 244.84, 260, 254.1, 257.9, 256.26, 243.79, 257.32, 258.83, 262.84, 259.48, 264.78, 263.15, 273.7, 277.44, 281.54, 270.02, 282.45, 278.31, 282.27, 277.7, 264.31, 261.37, 264.14, 265.32, 280.74, 284.56, 289.82, 301.24, 305.48, 313.7, 302.64, 312.65, 313.39, 322.19] },
      velocityScore: { '1D': 2.9, '1W': 4.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 30.4, revenueGrowth: 7, eps: 10.59, grossMargin: 30, dividendYield: 0.63,
      etfPresence: { AIRR: 1.79, PRN: false, RSHO: 5.22, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.8, proScore: 1.12, coverage: 0.4,
      price: 231.5, weeklyPrices: [236.14, 227.80, 229.95, 228.01, 231.50], weeklyChange: -1.96, sortRank: 0, periodReturns: { '1M': 13.9, '6M': 6.3, '1Y': 41.8 },
      priceHistory: { '1W': [236.14, 227.8, 229.95, 228.01, 231.5], '1M': [203.24, 198.99, 203.79, 203.5, 200.99, 200.47, 195.79, 205.55, 205.39, 207.8, 215.34, 213.82, 216.66, 220.92, 230.08, 234.08, 236.14, 227.8, 229.95, 228.01, 231.5], '6M': [217.69, 207.33, 208.48, 203.26, 207.51, 217.65, 215.21, 212.73, 223.86, 241.6, 243.04, 219.58, 210.96, 203.42, 194.52, 190.71, 195.43, 224.82, 216.49, 216.36, 207.81, 198.99, 195.79, 215.34, 234.08, 231.5], '1Y': [163.22, 155.12, 161.46, 172.55, 173.08, 180.12, 175.41, 181.26, 203.53, 191.88, 186.26, 192.47, 186.63, 190.25, 190.48, 182.95, 187.73, 185.97, 182.92, 190.4, 200, 223.06, 219.09, 205.32, 215.87, 208.24, 224.76, 210.34, 208.48, 205.44, 208.56, 217.9, 215.21, 212.73, 223.86, 241.6, 243.04, 219.58, 210.96, 204.62, 200.67, 199.94, 212.22, 219.99, 220.62, 216.36, 207.81, 198.99, 195.79, 215.34, 234.08, 231.5] },
      velocityScore: { '1D': -0.9, '1W': 1.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 44.3, revenueGrowth: 17, eps: 5.22, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.63, PRN: false, RSHO: 3.98, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.33, proScore: 0.93, coverage: 0.4,
      price: 185.56, weeklyPrices: [190.76, 185.95, 187.46, 188.96, 185.56], weeklyChange: -2.72, sortRank: 0, periodReturns: { '1M': -12, '6M': 3.3, '1Y': 40.9 },
      priceHistory: { '1W': [190.76, 185.95, 187.46, 188.96, 185.56], '1M': [210.8, 206.83, 206.83, 210.94, 204.72, 201.94, 197.33, 202.66, 202.52, 202.91, 198.95, 199.27, 195.88, 188.39, 187.26, 184.72, 190.76, 185.95, 187.46, 188.96, 185.56], '6M': [179.65, 168.12, 177.18, 181.85, 201.46, 217.89, 206.04, 206.04, 203, 201.09, 204.23, 205.83, 195.91, 204.67, 204.85, 191.59, 214.44, 238.27, 216.66, 216.18, 206.15, 206.83, 197.33, 198.95, 184.72, 185.56], '1Y': [131.71, 141.12, 140.86, 140.77, 136.45, 142.34, 143.84, 152.38, 179.74, 176.76, 163.56, 165.6, 163.79, 170.1, 174.03, 176.21, 185.7, 195.6, 209.01, 199.92, 213.69, 198.12, 196.77, 179.81, 178.18, 178.33, 183.38, 170.75, 175.88, 189.02, 206.62, 206.07, 206.04, 206.04, 203, 201.09, 204.23, 205.83, 195.91, 207.48, 204.76, 204.49, 231.78, 238.42, 219.1, 216.18, 206.15, 206.83, 197.33, 198.95, 184.72, 185.56] },
      velocityScore: { '1D': 2.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$17B', pe: 49.6, revenueGrowth: 26, eps: 3.74, grossMargin: 23, dividendYield: 0.55,
      etfPresence: { AIRR: 3.01, PRN: false, RSHO: false, IDEF: 1.65, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 1.97, proScore: 0.79, coverage: 0.4,
      price: 55.77, weeklyPrices: [63.40, 58.52, 57.73, 56.19, 55.77], weeklyChange: -12.03, sortRank: 0, periodReturns: { '1M': -2.1, '6M': -27.5, '1Y': 41.9 },
      priceHistory: { '1W': [63.4, 58.52, 57.73, 56.19, 55.77], '1M': [56.99, 57.33, 52.49, 54.85, 52.09, 54.22, 53.47, 55.82, 54.67, 56.18, 57.3, 65.19, 64.13, 63.49, 63.27, 58.43, 63.4, 58.52, 57.73, 56.19, 55.77], '6M': [76.91, 69.77, 79.97, 79.29, 113.7, 130.72, 111.32, 96.16, 98.81, 91.97, 90.68, 88.95, 88.96, 89.53, 83.69, 65.28, 71.96, 73.66, 68.55, 61.66, 59.31, 57.33, 53.47, 57.3, 58.43, 55.77], '1Y': [39.3, 43.23, 42.33, 43.28, 46.27, 58.91, 58.66, 58.01, 58.93, 68.75, 64.27, 67.92, 63.59, 67.67, 80.65, 84.2, 95.03, 98.55, 88.62, 89.32, 91.21, 77.41, 76.7, 70.67, 75.77, 77.68, 78.78, 71.4, 77.7, 89.93, 117.86, 128.68, 111.32, 96.16, 98.81, 91.97, 90.68, 88.95, 88.96, 95.31, 77.49, 70.51, 74.46, 74.66, 68.61, 61.66, 59.31, 57.33, 53.47, 57.3, 58.43, 55.77] },
      velocityScore: { '1D': -1.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 328.1, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.85, PRN: false, RSHO: false, IDEF: 1.09, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 2, avgWeight: 1.97, proScore: 0.79, coverage: 0.4,
      price: 30.9, weeklyPrices: [43.53, 32.22, 32.74, 31.17, 30.90], weeklyChange: -29.01, sortRank: 0, periodReturns: { '1M': -26.1, '6M': 138.8, '1Y': 452.8 },
      priceHistory: { '1W': [43.53, 32.22, 32.74, 31.17, 30.9], '1M': [41.84, 40.68, 40.74, 43.04, 41.62, 41.61, 41.59, 42.66, 42.48, 44.35, 50.48, 51.4, 51.14, 46.46, 48.09, 43.13, 43.53, 32.22, 32.74, 31.17, 30.9], '6M': [12.94, 16.47, 20.32, 20.41, 22.71, 28.78, 25.87, 22.85, 24.02, 22.21, 24.71, 25.3, 25.4, 24.6, 33.82, 27.89, 35.17, 33.93, 38.03, 35.03, 37.13, 40.68, 41.59, 50.48, 43.13, 30.9], '1Y': [5.59, 5.1, 5.42, 6.14, 6.6, 6.63, 6.84, 6.28, 6.32, 6.74, 6.43, 7.08, 6.46, 9.67, 10.61, 11.96, 14.85, 15.66, 13.23, 12.95, 12.9, 13.25, 12.44, 11.79, 11.72, 12.94, 17.47, 17.49, 19.36, 21.39, 25.44, 28, 25.87, 22.85, 24.02, 22.21, 24.71, 25.3, 25.4, 27.08, 31.83, 27.95, 36.55, 34.41, 39.47, 35.03, 37.13, 40.68, 41.59, 50.48, 43.13, 30.9] },
      velocityScore: { '1D': -13.2, '1W': -39.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: null, revenueGrowth: 42, eps: -1.16, grossMargin: 56, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 3.51, RSHO: false, IDEF: 0.44, BILT: false },
      tonyNote: 'Planet Labs is a satellite earth observation company. It holds a speculative position in Industrials ETFs as a data infrastructure name — providing satellite imagery and analytics that support agricultural, energy, and government decision-making. Revenue is growing from a small base; the ETF weight is minimal and the position is thematic.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.9, proScore: 0.76, coverage: 0.4,
      price: 295.78, weeklyPrices: [294.53, 293.04, 292.26, 297.52, 295.78], weeklyChange: 0.42, sortRank: 0, periodReturns: { '1M': -6.9, '6M': -8.5, '1Y': 32.5 },
      priceHistory: { '1W': [294.53, 293.04, 292.26, 297.52, 295.78], '1M': [317.75, 333.56, 334.22, 336.95, 326.17, 329.35, 324.6, 321.92, 317.55, 320.63, 317.56, 320.9, 308.17, 296.41, 293.66, 287.54, 294.53, 293.04, 292.26, 297.52, 295.78], '6M': [323.14, 321.29, 355.45, 349.75, 386.99, 425.9, 413.56, 420.3, 405.82, 417.83, 447.73, 440.33, 417.51, 416.59, 396.57, 369.08, 402.28, 398.07, 378.21, 361.4, 326.13, 333.56, 324.6, 317.56, 287.54, 295.78], '1Y': [223.3, 234.08, 235.12, 250.15, 258.11, 255.35, 263.33, 258.52, 267.49, 269.43, 267.09, 276.39, 269.98, 276.07, 274.69, 271.25, 282.22, 286.14, 282.66, 290.09, 298.42, 306.68, 317.89, 309.74, 314.31, 315.88, 326.72, 322.63, 351.13, 363.48, 398.25, 415.58, 413.56, 420.3, 405.82, 417.83, 447.73, 440.33, 417.51, 422.94, 402.08, 379.9, 411.35, 398.13, 366.88, 361.4, 326.13, 333.56, 324.6, 317.56, 287.54, 295.78] },
      velocityScore: { '1D': 2.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 19.2, revenueGrowth: 13, eps: 15.38, grossMargin: 12, dividendYield: 1.86,
      etfPresence: { AIRR: 2.71, PRN: false, RSHO: false, IDEF: 1.09, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'WMB', name: 'WMB', easyScore: 2, avgWeight: 1.39, proScore: 0.56, coverage: 0.4,
      price: 72.36, weeklyPrices: [72.43, 71.96, 71.59, 71.59, 72.36], weeklyChange: -0.1, sortRank: 0, periodReturns: { '1M': -2.5, '6M': 19.6, '1Y': 22.7 },
      priceHistory: { '1W': [72.43, 71.96, 71.59, 71.59, 72.36], '1M': [74.18, 74.73, 75.71, 77.69, 77.72, 77.69, 79.4, 77.88, 77.52, 78.47, 74.37, 73.13, 71.39, 70.04, 71.31, 71.66, 72.43, 71.96, 71.59, 71.59, 72.36], '6M': [60.5, 58.84, 59.46, 60.85, 60.32, 61.55, 64.29, 66.34, 67.85, 71.96, 73.5, 75.88, 73.84, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 79.4, 74.37, 71.66, 72.36], '1Y': [58.96, 58.5, 60.69, 59.14, 57.78, 58.09, 58.75, 59.24, 58.64, 57.86, 57.22, 57.49, 57.58, 59.33, 60.38, 63.31, 64.06, 63.1, 62.53, 58.93, 56.98, 57.54, 60.43, 58.89, 60.22, 63.66, 60.92, 58.66, 59.52, 61.16, 59.56, 61.51, 64.29, 66.34, 67.85, 71.96, 73.5, 75.88, 73.84, 73.69, 74.46, 72.78, 73.01, 70.76, 71.1, 73.04, 76.12, 74.73, 79.4, 74.37, 71.66, 72.36] },
      velocityScore: { '1D': 1.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$88B', pe: 31.7, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.93,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.97, IDEF: false, BILT: 1.81 },
      tonyNote: 'WMB appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.16, proScore: 0.46, coverage: 0.4,
      price: 592.88, weeklyPrices: [589.76, 590.09, 590.97, 592.41, 592.88], weeklyChange: 0.53, sortRank: 0, periodReturns: { '1M': -3.4, '6M': 32.5, '1Y': 57.3 },
      priceHistory: { '1W': [589.76, 590.09, 590.97, 592.41, 592.88], '1M': [613.59, 613.1, 618.91, 611.93, 569.06, 551.12, 565.22, 571.05, 566.96, 559.95, 577.42, 577.83, 571.96, 566.14, 578.34, 584.18, 589.76, 590.09, 590.97, 592.41, 592.88], '6M': [447.58, 444.99, 458.38, 458.79, 487.16, 498.82, 504.5, 507.13, 548.2, 552.93, 571.57, 568.58, 560.28, 546.91, 537.2, 524.38, 553.31, 598.23, 591.32, 594.39, 607.5, 613.1, 565.22, 577.42, 584.18, 592.88], '1Y': [376.84, 367.05, 380.57, 383.13, 378.91, 397.03, 385.02, 384.87, 404.38, 410.61, 392.76, 399.53, 391.1, 385.08, 384.72, 379.44, 374.99, 384.43, 369.71, 407.3, 408.94, 431.36, 445.34, 430.24, 443.29, 443.22, 458.15, 449.77, 456.33, 461.21, 488.31, 495.29, 504.5, 507.13, 548.2, 552.93, 571.57, 568.58, 560.28, 544.55, 552.23, 543.12, 580.55, 586.98, 588.74, 594.39, 607.5, 613.1, 565.22, 577.42, 584.18, 592.88] },
      velocityScore: { '1D': -20.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 65.4, revenueGrowth: 18, eps: 9.06, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.78, PRN: false, RSHO: false, IDEF: 0.53, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.07, proScore: 0.43, coverage: 0.4,
      price: 107.53, weeklyPrices: [117.82, 111.27, 110.94, 108.82, 107.53], weeklyChange: -8.73, sortRank: 0, periodReturns: { '1M': 16.9, '6M': 43, '1Y': 104.7 },
      priceHistory: { '1W': [117.82, 111.27, 110.94, 108.82, 107.53], '1M': [91.95, 92.32, 92.5, 94.55, 92.03, 93.39, 92.8, 94.81, 96.36, 98.55, 97.11, 108.11, 111.7, 111.28, 112.87, 111.59, 117.82, 111.27, 110.94, 108.82, 107.53], '6M': [75.19, 69.63, 74.7, 76.03, 93.48, 103.02, 98.89, 93.89, 85.37, 83.32, 88.76, 89.43, 86.87, 80.71, 78.29, 69.86, 77.53, 84.09, 83.36, 76.53, 82.96, 92.32, 92.8, 97.11, 111.59, 107.53], '1Y': [52.52, 52.32, 50.13, 50.5, 50.62, 52.2, 52.46, 53, 53.93, 68.39, 64.54, 68.13, 67.89, 73.08, 77.1, 73.13, 82.56, 80.96, 77.1, 77.6, 77.44, 78.19, 73.1, 67.55, 69.62, 71.35, 76.61, 68.88, 74.22, 81.29, 97.02, 97.1, 98.89, 93.89, 85.37, 83.32, 88.76, 89.43, 86.87, 81.35, 74.49, 72.91, 80.81, 85.51, 82.61, 76.53, 82.96, 92.32, 92.8, 97.11, 111.59, 107.53] },
      velocityScore: { '1D': 2.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.15, PRN: false, RSHO: false, IDEF: 1, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 1.04, proScore: 0.42, coverage: 0.4,
      price: 47.53, weeklyPrices: [54.39, 49.44, 49.64, 48.37, 47.53], weeklyChange: -12.61, sortRank: 0, periodReturns: { '1M': -19.2, '6M': -29.3, '1Y': 7.7 },
      priceHistory: { '1W': [54.39, 49.44, 49.64, 48.37, 47.53], '1M': [58.82, 62.48, 67.28, 66.02, 62.77, 66.21, 64.2, 65.76, 65.3, 64.1, 63.52, 65.86, 57.5, 53.65, 54.65, 51.84, 54.39, 49.44, 49.64, 48.37, 47.53], '6M': [67.27, 64.94, 80.81, 76.85, 106.22, 108.5, 108.71, 102.87, 97.47, 75.11, 83.6, 91.11, 102.79, 104.08, 102.39, 74.82, 82, 90.18, 82.06, 70.3, 62.89, 62.48, 64.2, 63.52, 51.84, 47.53], '1Y': [44.15, 47.88, 48.89, 45.24, 47.44, 56.3, 49.41, 50.39, 48.6, 51.83, 50.76, 54.65, 53.38, 63.8, 65.45, 67.4, 73.41, 74.51, 76.85, 81.99, 85.79, 79.73, 67.74, 60.93, 67.43, 66.48, 69.37, 68.11, 77.55, 83.99, 107.5, 106.28, 108.71, 102.87, 97.47, 75.11, 83.6, 91.11, 102.79, 104.06, 101.84, 80.05, 87.75, 92.73, 82.11, 70.3, 62.89, 62.48, 64.2, 63.52, 51.84, 47.53] },
      velocityScore: { '1D': -8.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 206.7, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.9, PRN: false, RSHO: false, IDEF: 0.19, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.6, proScore: 0.24, coverage: 0.4,
      price: 47.24, weeklyPrices: [46.71, 46.15, 46.55, 47.35, 47.24], weeklyChange: 1.13, sortRank: 0, periodReturns: { '1M': 13.9, '6M': 38.9, '1Y': 8.5 },
      priceHistory: { '1W': [46.71, 46.15, 46.55, 47.35, 47.24], '1M': [41.49, 42.87, 42.5, 42.86, 41.5, 42.84, 42.81, 44.56, 44.55, 44.92, 45.35, 48.41, 48.76, 47.96, 47.39, 45.61, 46.71, 46.15, 46.55, 47.35, 47.24], '6M': [34.02, 32.55, 34.52, 34.78, 40.99, 42.57, 40.63, 40.45, 40.22, 39.13, 43.82, 45.51, 46.35, 45.3, 44.4, 43.25, 46.19, 47.54, 43.2, 40.18, 39.7, 42.87, 42.81, 45.35, 45.61, 47.24], '1Y': [43.54, 45.31, 43.47, 45.31, 46.24, 48.33, 47.45, 43.24, 41.31, 41.9, 41.06, 42.03, 40.91, 41.61, 42.58, 42.35, 44.63, 44.21, 39.6, 40.53, 38.43, 35.76, 35.46, 33.43, 33.69, 34.31, 34.78, 33.17, 34.28, 37.01, 41.27, 42.07, 40.63, 40.45, 40.22, 39.13, 43.82, 45.51, 46.35, 45.6, 44.06, 44.52, 47.93, 46.29, 42.07, 40.18, 39.7, 42.87, 42.81, 45.35, 45.61, 47.24] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 44.1, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.76,
      etfPresence: { AIRR: 0.89, PRN: false, RSHO: false, IDEF: 0.32, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.34, proScore: 0.13, coverage: 0.4,
      price: 71.7, weeklyPrices: [72.38, 70.53, 72.13, 71.48, 71.70], weeklyChange: -0.94, sortRank: 0, periodReturns: { '1M': -13.4, '6M': 6.1, '1Y': 77.4 },
      priceHistory: { '1W': [72.38, 70.53, 72.13, 71.48, 71.7], '1M': [82.79, 82.69, 80.64, 83.01, 79.49, 75.43, 74.91, 76.99, 74.88, 72.76, 74.47, 73.27, 71.49, 74.26, 74.29, 72.26, 72.38, 70.53, 72.13, 71.48, 71.7], '6M': [67.56, 66.02, 68.93, 69.35, 70.53, 75.09, 77.34, 80.11, 84.07, 82.24, 85.87, 69.95, 71.29, 71.31, 72.44, 72.83, 77.31, 86.16, 85.11, 86.87, 97.31, 82.69, 74.91, 74.47, 72.26, 71.7], '1Y': [40.41, 41.89, 44.08, 47.46, 48.06, 50.89, 48.29, 47.65, 47.28, 57.75, 55.99, 58.79, 61, 62.89, 66.22, 64.33, 62.04, 61.75, 64.19, 67.67, 69.34, 67.92, 62.28, 60.11, 67.56, 68.64, 70.46, 67.56, 69.06, 71.79, 74.25, 74.13, 77.34, 80.11, 84.07, 82.24, 85.87, 69.95, 71.29, 71.44, 75.25, 77.19, 80.54, 86.25, 84.19, 86.87, 97.31, 82.69, 74.91, 74.47, 72.26, 71.7] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 49.1, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.34,
      etfPresence: { AIRR: 0.64, PRN: false, RSHO: false, IDEF: 0.03, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'Timken Company', easyScore: 1, avgWeight: 9.11, proScore: 1.82, coverage: 0.2,
      price: 136.24, weeklyPrices: [133.66, 131.83, 134.67, 137.09, 136.24], weeklyChange: 1.93, sortRank: 0, periodReturns: { '1M': 16.1, '6M': 55.6, '1Y': 86.2 },
      priceHistory: { '1W': [133.66, 131.83, 134.67, 137.09, 136.24], '1M': [117.39, 117.12, 115.74, 116.74, 114.49, 112.73, 109.36, 117.2, 118.93, 119.95, 127.16, 126.78, 127.98, 126.54, 131.9, 131.82, 133.66, 131.83, 134.67, 137.09, 136.24], '6M': [87.53, 84.14, 86.02, 86.29, 91.17, 93.55, 94.02, 94.99, 108.93, 105.54, 109.52, 106.58, 102.18, 98.74, 98.99, 95.94, 99.17, 106.81, 108.75, 106.88, 109.63, 117.12, 109.36, 127.16, 131.82, 136.24], '1Y': [73.15, 70.44, 73.05, 76.72, 78.57, 79.13, 80.76, 74.77, 73.57, 80.39, 75.86, 79.01, 77.42, 79.16, 79.09, 74.2, 75.99, 74.32, 74.04, 77.71, 79.25, 78.46, 78.66, 74.82, 81.36, 82.76, 88.71, 84.92, 86.52, 88.34, 90.83, 90.65, 94.02, 94.99, 108.93, 105.54, 109.52, 106.58, 102.18, 98.59, 101.03, 100.57, 105.88, 103.73, 106.79, 106.88, 109.63, 117.12, 109.36, 127.16, 131.82, 136.24] },
      velocityScore: { '1D': 1.7, '1W': 4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 31, revenueGrowth: 8, eps: 4.4, grossMargin: 31, dividendYield: 1.05,
      etfPresence: { AIRR: false, PRN: false, RSHO: 9.11, IDEF: false, BILT: false },
      tonyNote: 'Timken Company appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 9.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 8.11, proScore: 1.62, coverage: 0.2,
      price: 180.67, weeklyPrices: [179.41, 180.99, 178.66, 181.56, 180.67], weeklyChange: 0.7, sortRank: 0, periodReturns: { '1M': 1.2, '6M': 3.4, '1Y': 30.4 },
      priceHistory: { '1W': [179.41, 180.99, 178.66, 181.56, 180.67], '1M': [178.61, 178.89, 178.11, 175.68, 171.18, 175.95, 174.49, 174.85, 175.98, 177.01, 176.59, 178.96, 179.66, 174.41, 174.26, 172.55, 179.41, 180.99, 178.66, 181.56, 180.67], '6M': [174.72, 177.2, 186.38, 187.25, 188.5, 201.92, 194.13, 201.09, 196.19, 203.5, 198.46, 206.52, 207, 206.06, 194.82, 187.15, 197.92, 202.81, 187.17, 175.68, 172.87, 178.89, 174.49, 176.59, 172.55, 180.67], '1Y': [138.52, 148.48, 141.38, 144.52, 146.4, 151.5, 155.22, 158.4, 155.75, 155.71, 156.59, 159.84, 158.68, 157.65, 158.19, 160.51, 166.63, 162.18, 157.05, 179.44, 176.36, 174, 177.69, 173.77, 173.19, 171.31, 177.42, 178.29, 185.17, 188.26, 193.85, 196.36, 194.13, 201.09, 196.19, 203.5, 198.46, 206.52, 207, 203.33, 194, 192.9, 203.48, 198.39, 180.91, 175.68, 172.87, 178.89, 174.49, 176.59, 172.55, 180.67] },
      velocityScore: { '1D': 5.2, '1W': 11.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$243B', pe: 33.8, revenueGrowth: 9, eps: 5.34, grossMargin: 20, dividendYield: 1.53,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 8.11, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LMT', name: 'LOCKHEED MARTIN CORP', easyScore: 1, avgWeight: 7.12, proScore: 1.42, coverage: 0.2,
      price: 527.18, weeklyPrices: [519.05, 523.76, 520.07, 530.13, 527.18], weeklyChange: 1.57, sortRank: 0, periodReturns: { '1M': 2.9, '6M': 12.7, '1Y': 10.5 },
      priceHistory: { '1W': [519.05, 523.76, 520.07, 530.13, 527.18], '1M': [512.25, 521, 519.94, 520.41, 516.01, 528.31, 526.63, 522.59, 522.79, 533.24, 531.14, 537.21, 530.45, 516.5, 513.43, 512.03, 519.05, 523.76, 520.07, 530.13, 527.18], '6M': [467.94, 474.79, 485.75, 497.07, 542.92, 582.43, 581.66, 636, 638.29, 649.58, 664.43, 667.82, 651.22, 645.2, 616.25, 598.57, 627.7, 611.58, 571.95, 512.29, 508.93, 521, 526.63, 531.14, 512.03, 527.18], '1Y': [476.9, 479.34, 458.39, 462.55, 464.31, 469.2, 420.55, 418.68, 434.85, 442.57, 446, 454.47, 456.85, 470.73, 473.62, 484.34, 499.36, 507.76, 493.25, 488.05, 485.33, 473.14, 457.04, 469.91, 454.16, 448.35, 474.88, 470.14, 483.03, 511.57, 551.24, 576.06, 581.66, 636, 638.29, 649.58, 664.43, 667.82, 651.22, 636.33, 610.17, 604.39, 628.5, 611.1, 555.43, 512.29, 508.93, 521, 526.63, 531.14, 512.03, 527.18] },
      velocityScore: { '1D': null, '1W': 10.1, '1M': null, '6M': null }, isNew: true,
      marketCap: '$122B', pe: 25.5, revenueGrowth: 0, eps: 20.68, grossMargin: 10, dividendYield: 2.6,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 7.12, BILT: false },
      tonyNote: 'LOCKHEED MARTIN CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 7.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.54, proScore: 4.54, coverage: 1,
      price: 219.57, weeklyPrices: [259.67, 227.81, 218.00, 220.12, 219.57], weeklyChange: -15.44, sortRank: 0, periodReturns: { '1M': 18, '6M': 134.6, '1Y': 318.1 },
      priceHistory: { '1W': [259.67, 227.81, 218, 220.12, 219.57], '1M': [186.1, 179.11, 207.27, 221.15, 219.94, 199.86, 197.73, 191.82, 219.93, 214.77, 208.37, 226.34, 231.09, 264.51, 260.58, 251.68, 259.67, 227.81, 218, 220.12, 219.57], '6M': [93.59, 75.45, 91.13, 89.95, 97.93, 108.73, 91.46, 88.16, 92.88, 97.52, 102.58, 86.8, 96.43, 129.85, 114.15, 92.26, 117.4, 161.94, 156.55, 135.51, 175.92, 179.11, 197.73, 208.37, 251.68, 219.57], '1Y': [52.51, 48.33, 48.52, 49.97, 46.43, 53.69, 52.16, 51.29, 55.09, 70.63, 67.47, 70.1, 64.91, 89.19, 94.12, 107.94, 125.87, 132.64, 123.04, 106.16, 125.1, 117, 94.36, 95.07, 94.69, 102.8, 94.28, 78.09, 87.59, 92.83, 107.33, 99.29, 91.46, 88.16, 92.88, 97.52, 102.58, 86.8, 96.43, 116.33, 114.91, 103.76, 125, 166.77, 156.14, 135.51, 175.92, 179.11, 197.73, 208.37, 251.68, 219.57] },
      velocityScore: { '1D': -2.6, '1W': -8.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$56B', pe: 84.4, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 3.14, MEME: 5.47, RKNG: 5.02 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 3, avgWeight: 3.78, proScore: 3.78, coverage: 1,
      price: 41.03, weeklyPrices: [44.15, 39.62, 40.94, 41.91, 41.03], weeklyChange: -7.06, sortRank: 0, periodReturns: { '1M': -8, '6M': 32.4, '1Y': 228.8 },
      priceHistory: { '1W': [44.15, 39.62, 40.94, 41.91, 41.03], '1M': [44.59, 43.93, 45.48, 46.71, 42.56, 39.14, 36.62, 39.52, 48.02, 45.87, 48.98, 49.65, 47.28, 47.94, 47.86, 44.71, 44.15, 39.62, 40.94, 41.91, 41.03], '6M': [30.99, 22, 25.72, 28.11, 37.68, 37.4, 36.18, 34.8, 38.26, 33.56, 30.66, 26.15, 27.4, 27.71, 27.26, 20.55, 25.18, 31.47, 31.32, 32.11, 39.88, 43.93, 36.62, 48.98, 44.71, 41.03], '1Y': [12.48, 10.99, 9.82, 10.56, 9.33, 10.91, 11.2, 10.03, 14.79, 14.8, 15.72, 16.7, 14.33, 17.18, 19.91, 22.59, 26.47, 29.29, 36.64, 33.38, 34.42, 33.09, 26.41, 23.09, 24.94, 31.14, 30.76, 23.9, 24.05, 30.2, 38.21, 35.46, 36.18, 34.8, 38.26, 33.56, 30.66, 26.15, 27.4, 27.51, 26.79, 23.74, 27.79, 30.81, 32.43, 32.11, 39.88, 43.93, 36.62, 48.98, 44.71, 41.03] },
      velocityScore: { '1D': 3.3, '1W': -3.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.23, MEME: 5.48, RKNG: 3.63 },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab', easyScore: 3, avgWeight: 3.63, proScore: 3.63, coverage: 1,
      price: 107.43, weeklyPrices: [119.95, 110.08, 113.65, 108.23, 107.43], weeklyChange: -10.44, sortRank: 0, periodReturns: { '1M': -8.5, '6M': 86.8, '1Y': 295.4 },
      priceHistory: { '1W': [119.95, 110.08, 113.65, 108.23, 107.43], '1M': [117.35, 117.56, 124.15, 132.55, 124.77, 131.16, 127.31, 134.28, 125.45, 135.76, 150.23, 148.03, 143.48, 122.39, 123.32, 114.7, 119.95, 110.08, 113.65, 108.23, 107.43], '6M': [57.52, 53.96, 77.18, 75.99, 84.85, 96.3, 80.48, 74.15, 75.84, 69.89, 69.97, 70.13, 68.93, 71.31, 68, 57.38, 66.32, 72.22, 86.64, 78.59, 78.76, 117.56, 127.31, 150.23, 114.7, 107.43], '1Y': [27.17, 26.42, 32.35, 35.68, 39.1, 51.33, 48.13, 46.44, 44.1, 43, 40.69, 46.25, 42.99, 48.43, 47.18, 46.63, 52.47, 66.42, 67, 63.57, 66.16, 56.42, 49.97, 43.62, 41.93, 49.37, 63.53, 59.92, 70.65, 78.14, 87.9, 89.16, 80.48, 74.15, 75.84, 69.89, 69.97, 70.13, 68.93, 78.59, 66.07, 64.22, 69.08, 73.6, 90.04, 78.59, 78.76, 117.56, 127.31, 150.23, 114.7, 107.43] },
      velocityScore: { '1D': 1.4, '1W': 4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$67B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 1.95, MEME: 4.92, RKNG: 4.01 },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 5.76, proScore: 3.84, coverage: 0.667,
      price: 1611, weeklyPrices: [1759.68, 1559.32, 1642.00, 1646.54, 1611.00], weeklyChange: -8.45, sortRank: 0, periodReturns: { '1M': 4.1, '6M': 591.8, '1Y': 3773.5 },
      priceHistory: { '1W': [1759.68, 1559.32, 1642, 1646.54, 1611], '1M': [1547.56, 1452.02, 1447.23, 1382.72, 1407.61, 1333.01, 1383.29, 1392.56, 1542.24, 1478.69, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1611], '6M': [232.86, 206.83, 250.08, 275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 565.41, 618.89, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1831.5, 1611], '1Y': [41.59, 44.09, 47.25, 46.21, 46.95, 41.52, 42.06, 43.39, 42.1, 47.01, 44.4, 48.44, 62.5, 84.3, 98.87, 94.29, 124.14, 129.68, 144.27, 167.05, 204.36, 216.5, 283.1, 245.96, 215.04, 213.31, 241.61, 219.46, 250.05, 274.08, 389.27, 453.12, 470.8, 665.24, 583.4, 590.59, 638.52, 565.41, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1831.5, 1611] },
      velocityScore: { '1D': 3.2, '1W': -2.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$239B', pe: 55, revenueGrowth: 251, eps: 29.31, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.64, RKNG: 5.89 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 2, avgWeight: 5.28, proScore: 3.52, coverage: 0.667,
      price: 176.39, weeklyPrices: [202.89, 177.00, 196.64, 162.88, 176.39], weeklyChange: -13.06, sortRank: 0, periodReturns: { '1M': -4.6, '6M': 404.3, '1Y': 972.9 },
      priceHistory: { '1W': [202.89, 177, 196.64, 162.88, 176.39], '1M': [184.9, 188.28, 223.1, 203.57, 190.36, 173.26, 171.33, 165.26, 176.81, 181.49, 179.83, 169.02, 158.41, 185.67, 202.37, 184.07, 202.89, 177, 196.64, 162.88, 176.39], '6M': [34.98, 27.14, 41, 39.6, 34.04, 37.04, 34.89, 44.16, 47.91, 43.91, 56.27, 95.34, 120.49, 94.07, 95.76, 85.19, 117.64, 146.39, 150.57, 137.26, 180.57, 188.28, 171.33, 179.83, 184.07, 176.39], '1Y': [16.44, 16.78, 26.23, 26.69, 28.25, 29.42, 25.84, 23.06, 23.23, 23.02, 21.93, 24.05, 23.32, 26.85, 29.04, 26.34, 27.98, 32.37, 31.14, 31.4, 35.48, 31.51, 23.94, 20.87, 25.57, 26.24, 36.32, 29.25, 37.17, 34.99, 33.72, 39.26, 34.89, 44.16, 47.91, 43.91, 56.27, 95.34, 120.49, 86.33, 113.9, 84.59, 132.7, 142.55, 149.42, 137.26, 180.57, 188.28, 171.33, 179.83, 184.07, 176.39] },
      velocityScore: { '1D': -4.3, '1W': -14.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$14B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.04, RKNG: 4.52 },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'NVTS', name: 'Navitas Semiconductor', easyScore: 2, avgWeight: 5.28, proScore: 3.52, coverage: 0.667,
      price: 22.25, weeklyPrices: [30.67, 25.08, 24.48, 22.85, 22.25], weeklyChange: -27.45, sortRank: 0, periodReturns: { '1M': -1.8, '6M': 144, '1Y': 175 },
      priceHistory: { '1W': [30.67, 25.08, 24.48, 22.85, 22.25], '1M': [22.65, 19.25, 21.17, 22.32, 21.32, 19.67, 19.43, 22.99, 24.38, 29.25, 28.88, 28.51, 26.6, 24.86, 25.86, 30.84, 30.67, 25.08, 24.48, 22.85, 22.25], '6M': [9.12, 7.38, 7.66, 8.38, 10.07, 10.91, 9.38, 8.62, 9.22, 8.22, 8.26, 8.9, 8.68, 10.49, 9.18, 7.83, 8.57, 9.87, 15.33, 15.12, 17.55, 19.25, 19.43, 28.88, 30.84, 22.25], '1Y': [8.09, 6.86, 7.02, 6.32, 6.26, 6.27, 8.98, 7.21, 6.35, 7.36, 6.25, 6.07, 5.54, 6.08, 6.73, 6.51, 8.19, 8, 15.63, 13.61, 13.57, 9.86, 8.64, 7.72, 8.34, 9.45, 9.18, 7.37, 7.4, 9.05, 10.43, 9.86, 9.38, 8.62, 9.22, 8.22, 8.26, 8.9, 8.68, 9.82, 9.28, 8.77, 9.55, 10.26, 18.47, 15.12, 17.55, 19.25, 19.43, 28.88, 30.84, 22.25] },
      velocityScore: { '1D': -7.9, '1W': 16.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.4, RKNG: 6.16 },
      tonyNote: 'Navitas Semiconductor is a small-cap wide-bandgap power semiconductor name — gallium nitride and silicon carbide for fast charging and EV applications. The $26.60 share price and small market cap position it as a speculative holding in ETFs willing to take higher-risk bets on next-generation power conversion.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 5.08, proScore: 3.39, coverage: 0.667,
      price: 250.78, weeklyPrices: [291.37, 263.61, 253.57, 259.61, 250.78], weeklyChange: -13.93, sortRank: 0, periodReturns: { '1M': -11.7, '6M': 147.6, '1Y': 1059.4 },
      priceHistory: { '1W': [291.37, 263.61, 253.57, 259.61, 250.78], '1M': [283.92, 280.69, 289.76, 303.41, 275.95, 258.71, 261.34, 282.31, 307.88, 302.49, 293.8, 290.01, 285, 273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 259.61, 250.78], '6M': [101.29, 76.97, 91.88, 98.69, 134.07, 149.5, 139.62, 156.13, 155.17, 145.32, 166.2, 153.02, 154, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 261.34, 293.8, 287.32, 250.78], '1Y': [21.63, 21.34, 21.6, 22.56, 25.85, 24.31, 33.06, 37.62, 38.86, 44.08, 44.51, 50.85, 54.91, 67.29, 80.97, 68.69, 88, 86.65, 115.09, 101.42, 133.71, 141.41, 126.72, 108.93, 101.14, 118.09, 108.99, 80.21, 90.18, 103.87, 136.87, 151.75, 139.62, 156.13, 155.17, 145.32, 166.2, 153.02, 154, 160.05, 145.88, 135.49, 146.78, 213.84, 229.75, 226.37, 295.25, 280.69, 261.34, 293.8, 287.32, 250.78] },
      velocityScore: { '1D': 1.2, '1W': 5.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$71B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.94, RKNG: 4.22 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 2, avgWeight: 4.43, proScore: 2.95, coverage: 0.667,
      price: 54.31, weeklyPrices: [61.86, 54.35, 59.19, 54.02, 54.31], weeklyChange: -12.2, sortRank: 0, periodReturns: { '1M': -1.5, '6M': 23.7, '1Y': 417.7 },
      priceHistory: { '1W': [61.86, 54.35, 59.19, 54.02, 54.31], '1M': [55.15, 56.56, 55.17, 58.4, 52.94, 50.46, 47.74, 52.71, 58.06, 56.83, 67.84, 64.05, 63.54, 65.33, 66.6, 65.48, 61.86, 54.35, 59.19, 54.02, 54.31], '6M': [43.92, 33.78, 41.98, 42.7, 46.03, 57.82, 52.36, 53.08, 46.15, 40.97, 45.45, 38.85, 38.12, 44.94, 42.16, 31.62, 35.74, 47.37, 45.17, 44.44, 54.74, 56.56, 47.74, 67.84, 65.48, 54.31], '1Y': [10.49, 9.77, 11.87, 15.66, 17.03, 18.05, 18.14, 16.14, 18.32, 17.73, 19.76, 22.35, 26.13, 32.85, 36.32, 46.29, 47.02, 63.85, 61.83, 55.86, 60.42, 76.41, 55.7, 45.83, 48.45, 46.45, 43.94, 35.8, 40.3, 48.24, 50.33, 54.26, 52.36, 53.08, 46.15, 40.97, 45.45, 38.85, 38.12, 42.96, 41.12, 34.28, 36.83, 48.82, 48.39, 44.44, 54.74, 56.56, 47.74, 67.84, 65.48, 54.31] },
      velocityScore: { '1D': 3.9, '1W': -29.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 70.5, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.61, RKNG: 3.25 },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 4.25, proScore: 2.83, coverage: 0.667,
      price: 901.2, weeklyPrices: [996.00, 864.01, 949.28, 935.89, 901.20], weeklyChange: -9.52, sortRank: 0, periodReturns: { '1M': 13.3, '6M': 241.7, '1Y': 689.6 },
      priceHistory: { '1W': [996, 864.01, 949.28, 935.89, 901.2], '1M': [795.33, 766.58, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 901.2], '6M': [263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 901.2], '1Y': [114.14, 120.34, 127.25, 121.74, 123.11, 113.26, 111.73, 114.74, 108.78, 124.27, 117.21, 117.75, 124.21, 150.57, 168.89, 156.83, 183.75, 192.33, 202.53, 206.71, 226.63, 237.5, 244.9, 225.92, 230.26, 226.65, 258.46, 248.55, 284.79, 312.15, 345.87, 365, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 901.2] },
      velocityScore: { '1D': -4.4, '1W': -7.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.0T', pe: 42.6, revenueGrowth: 196, eps: 21.15, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { BUZZ: 3.4, MEME: false, RKNG: 5.09 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 2, avgWeight: 4.17, proScore: 2.78, coverage: 0.667,
      price: 239.59, weeklyPrices: [217.50, 206.89, 222.27, 234.32, 239.59], weeklyChange: 10.15, sortRank: 0, periodReturns: { '1M': 14, '6M': 51.7, '1Y': 249.6 },
      priceHistory: { '1W': [217.5, 206.89, 222.27, 234.32, 239.59], '1M': [210.22, 198.57, 189.36, 184.54, 172.17, 156.27, 168.99, 182.98, 193.39, 218.41, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 234.32, 239.59], '6M': [157.98, 134.13, 150.19, 143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 97.3, 112.33, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.23, 214.6, 239.59], '1Y': [68.53, 79.71, 92.2, 89.37, 97.29, 98.45, 101.17, 116.01, 117.34, 121.13, 105.99, 122.73, 134, 159.32, 172.31, 144.94, 149.63, 151.15, 136.53, 150.97, 171.52, 173.16, 160.34, 141.88, 164.01, 180.92, 154.47, 138.57, 144.83, 140.24, 156.07, 153.22, 128.02, 119.96, 123.41, 124.8, 120.83, 97.3, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 165.92, 193.57, 198.57, 168.99, 221.23, 214.6, 239.59] },
      velocityScore: { '1D': 10.8, '1W': 94.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$44B', pe: 130.9, revenueGrowth: 157, eps: 1.83, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.97, RKNG: 4.37 },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'ONDS', name: 'Ondas Holdings', easyScore: 2, avgWeight: 3.68, proScore: 2.45, coverage: 0.667,
      price: 9.62, weeklyPrices: [11.97, 10.43, 10.30, 9.65, 9.62], weeklyChange: -19.67, sortRank: 0, periodReturns: { '1M': 2.1, '6M': 15.5, '1Y': 532.6 },
      priceHistory: { '1W': [11.97, 10.43, 10.3, 9.65, 9.62], '1M': [9.42, 9.04, 8.86, 11.21, 10.62, 9.7, 9.13, 9.36, 9.18, 9.06, 10.8, 13.25, 13.22, 13.46, 13.58, 11.61, 11.97, 10.43, 10.3, 9.65, 9.62], '6M': [8.32, 7.37, 9.13, 11.02, 13.69, 12.16, 11.16, 10.64, 10.34, 10.05, 10.4, 10.02, 10.01, 10.53, 10.9, 8.15, 9.53, 9.4, 10.87, 10.48, 9.33, 9.04, 9.13, 10.8, 11.61, 9.62], '1Y': [1.52, 1.56, 1.6, 1.88, 2.01, 2.4, 2.14, 2.07, 3.33, 3.52, 3.61, 5.07, 5.33, 6.42, 6.6, 7.75, 9.21, 10.49, 8.2, 7.06, 6.75, 6, 5.51, 7.5, 8.24, 9.19, 9.02, 7.8, 8.48, 12.53, 13.19, 13.13, 11.16, 10.64, 10.34, 10.05, 10.4, 10.02, 10.01, 11.28, 10.68, 9.04, 9.45, 10.03, 11.06, 10.48, 9.33, 9.04, 9.13, 10.8, 11.61, 9.62] },
      velocityScore: { '1D': -4.7, '1W': -16.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: 106.8, revenueGrowth: 1080, eps: 0.09, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.82, RKNG: 2.54 },
      tonyNote: 'Ondas Holdings is a small-cap industrial automation and drone company. It appears in Meme ETFs on the autonomous systems and drone delivery narrative. Revenue is minimal and the path to profitability is unclear; the ETF allocation is speculative and reflects retail interest in autonomous systems themes.',
    },
    {
      ticker: 'OKLO', name: 'Oklo Inc', easyScore: 2, avgWeight: 3.65, proScore: 2.43, coverage: 0.667,
      price: 55.85, weeklyPrices: [65.39, 58.09, 58.94, 56.48, 55.85], weeklyChange: -14.59, sortRank: 0, periodReturns: { '1M': -28.5, '6M': -44.5, '1Y': 6.3 },
      priceHistory: { '1W': [65.39, 58.09, 58.94, 56.48, 55.85], '1M': [78.13, 73.63, 69.66, 67.21, 62.25, 58.56, 55.88, 62.58, 65.09, 65.88, 67.82, 68.09, 66.88, 66.89, 73.47, 65.21, 65.39, 58.09, 58.94, 56.48, 55.85], '6M': [100.6, 75.94, 81.31, 77.8, 105.31, 94.95, 82.31, 73.62, 75.05, 67.64, 65.06, 63.3, 61.38, 59.69, 56.26, 45.58, 46.59, 58.58, 62.61, 69.09, 68.38, 73.63, 55.88, 67.82, 65.21, 55.85], '1Y': [52.54, 62.77, 55.57, 51.33, 55.45, 67.17, 74.59, 75.63, 83.1, 77.42, 66.57, 73.2, 69.61, 79.97, 104.97, 119.13, 128.8, 138.13, 162.14, 124.7, 143.42, 121.23, 111.17, 102.86, 88.72, 111.65, 103, 77.72, 76.92, 89.34, 102.5, 89.93, 82.31, 73.62, 75.05, 67.64, 65.06, 63.3, 61.38, 60.53, 54.96, 49.59, 50.21, 63.35, 72.41, 69.09, 68.38, 73.63, 55.88, 67.82, 65.21, 55.85] },
      velocityScore: { '1D': -0.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: 0, eps: -0.84, grossMargin: 0, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.84, RKNG: 2.46 },
      tonyNote: 'Oklo Inc appears in 2 of 3 Meme ETFs (67% coverage) with average weight 3.6% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RGTI', name: 'Rigetti Computing', easyScore: 2, avgWeight: 3.52, proScore: 2.35, coverage: 0.667,
      price: 19.8, weeklyPrices: [24.16, 20.68, 21.76, 19.69, 19.80], weeklyChange: -18.05, sortRank: 0, periodReturns: { '1M': -3.5, '6M': -24.2, '1Y': 76.2 },
      priceHistory: { '1W': [24.16, 20.68, 21.76, 19.69, 19.8], '1M': [20.51, 19.07, 18.42, 19.27, 17.85, 16.62, 15.96, 16.88, 22.04, 26.42, 24.62, 27.03, 25.54, 25.63, 26.88, 24.09, 24.16, 20.68, 21.76, 19.69, 19.8], '6M': [26.12, 22.47, 24.51, 23.6, 24.72, 25.62, 21.76, 17.71, 17.59, 15.59, 16.48, 16.96, 16.99, 16.14, 15.88, 12.9, 13.84, 16.87, 18.25, 16.39, 18.27, 19.07, 15.96, 24.62, 24.09, 19.8], '1Y': [11.24, 11.48, 11.09, 13.08, 13.03, 17.14, 15.95, 14.17, 15.99, 17.24, 14.76, 15.39, 15.12, 16.69, 24.74, 32.1, 35.4, 47.11, 47.97, 39.6, 39.41, 37.29, 28.3, 25.46, 25.57, 30.06, 26.88, 22.82, 22.38, 25.01, 25.53, 24.99, 21.76, 17.71, 17.59, 15.59, 16.48, 16.96, 16.99, 16.22, 15.6, 14.04, 14.53, 19.11, 18.38, 16.39, 18.27, 19.07, 15.96, 24.62, 24.09, 19.8] },
      velocityScore: { '1D': -3.3, '1W': 1.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 199, eps: -0.89, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.88, RKNG: 3.17 },
      tonyNote: 'Rigetti Computing is a quantum hardware company using superconducting qubit technology. It holds a position in Meme ETFs alongside IonQ and D-Wave as part of the quantum computing basket. Revenue is minimal, the technology is earlier-stage than IonQ, and the ETF allocation is speculative. The weight score is low; this is a high-risk, long-duration positioning.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 2, avgWeight: 3.46, proScore: 2.31, coverage: 0.667,
      price: 58.05, weeklyPrices: [65.66, 56.78, 62.80, 56.69, 58.05], weeklyChange: -11.6, sortRank: 0, periodReturns: { '1M': 2, '6M': 12.3, '1Y': 46.1 },
      priceHistory: { '1W': [65.66, 56.78, 62.8, 56.69, 58.05], '1M': [56.89, 55.87, 55.26, 57.47, 51.95, 49.31, 48.44, 52.47, 58.89, 63.64, 65.4, 70.14, 72.07, 69.28, 71.4, 68.23, 65.66, 56.78, 62.8, 56.69, 58.05], '6M': [51.67, 45.85, 49.82, 46.77, 49.45, 50.8, 43.37, 38.56, 35.48, 33.18, 31.62, 37.05, 35.12, 33.29, 33.11, 26.59, 28.49, 35.76, 46.28, 43.08, 48, 55.87, 48.44, 65.4, 68.23, 58.05], '1Y': [39.74, 38.04, 38.11, 44.75, 45.93, 44.84, 43.9, 39.88, 41.23, 41.21, 36.79, 41.42, 42.11, 47.05, 66.81, 69.43, 69.6, 77.5, 65.59, 59.37, 61.11, 55.41, 50.71, 47.88, 46.9, 54.76, 52.55, 46.44, 46, 48.71, 50.95, 50.66, 43.37, 38.56, 35.48, 33.18, 31.62, 37.05, 35.12, 33.31, 32.7, 28.83, 28.99, 43.25, 47.36, 43.08, 48, 55.87, 48.44, 65.4, 68.23, 58.05] },
      velocityScore: { '1D': -0.4, '1W': -8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$22B', pe: 148.8, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: 1.84, MEME: 5.09, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 2, avgWeight: 3.08, proScore: 2.05, coverage: 0.667,
      price: 88.45, weeklyPrices: [107.29, 93.60, 92.06, 88.71, 88.45], weeklyChange: -17.56, sortRank: 0, periodReturns: { '1M': 7.1, '6M': 11.9, '1Y': 147.7 },
      priceHistory: { '1W': [107.29, 93.6, 92.06, 88.71, 88.45], '1M': [82.55, 72.96, 74.81, 83.01, 83.67, 86.83, 88.1, 89.58, 96.23, 105.86, 129.6, 133.09, 113.41, 105.65, 118.17, 107.73, 107.29, 93.6, 92.06, 88.71, 88.45], '6M': [79.05, 61.86, 78.05, 83.47, 97.67, 115.77, 104.78, 104.55, 102.12, 83.03, 85.82, 92.68, 87.53, 89.11, 88.42, 73.82, 92.57, 88.57, 80.01, 71.88, 63.87, 72.96, 88.1, 129.6, 107.73, 88.45], '1Y': [35.71, 40.1, 49.97, 45.71, 43.97, 57.45, 60.06, 54.29, 51.79, 50.05, 45.08, 48.25, 41.86, 38.37, 41.44, 49.39, 66.16, 86.79, 89.5, 71.72, 80.06, 70.38, 64.49, 58.01, 55.52, 72.65, 84.75, 65.93, 71.95, 90.92, 98.39, 112.44, 104.78, 104.55, 102.12, 83.03, 85.82, 92.68, 87.53, 95.7, 86.98, 82.87, 96.46, 86.91, 84.66, 71.88, 63.87, 72.96, 88.1, 129.6, 107.73, 88.45] },
      velocityScore: { '1D': -49.6, '1W': -1.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$34B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 3.45, MEME: false, RKNG: 2.7 },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'SPCE', name: 'Virgin Galactic Holdings', easyScore: 1, avgWeight: 7.95, proScore: 2.65, coverage: 0.333,
      price: 4.71, weeklyPrices: [4.72, 4.38, 4.12, 4.59, 4.71], weeklyChange: -0.21, sortRank: 0, periodReturns: { '1M': 61.3, '6M': 31.6, '1Y': 37.7 },
      priceHistory: { '1W': [4.72, 4.38, 4.12, 4.59, 4.71], '1M': [2.92, 2.79, 2.88, 2.88, 2.81, 2.58, 2.5, 2.47, 2.75, 3.24, 3.79, 4.53, 6.18, 7.52, 4.59, 4.29, 4.72, 4.38, 4.12, 4.59, 4.71], '6M': [3.58, 3.21, 3.34, 3.29, 3.18, 3.1, 3.01, 2.68, 2.7, 2.5, 2.55, 2.54, 2.5, 2.48, 2.42, 2.17, 2.99, 2.89, 2.92, 2.38, 2.45, 2.79, 2.5, 3.79, 4.29, 4.71], '1Y': [3.42, 2.96, 2.9, 2.83, 3.05, 3.74, 4.32, 3.67, 3.78, 3.04, 2.98, 3.09, 3.08, 3.26, 3.29, 3.47, 4.04, 4.06, 4.43, 3.97, 4.02, 3.64, 3.62, 3.46, 3.7, 4.49, 3.55, 3.28, 3.16, 3.25, 3.19, 3, 3.01, 2.68, 2.7, 2.5, 2.55, 2.54, 2.5, 2.65, 2.38, 2.43, 2.97, 2.83, 2.9, 2.38, 2.45, 2.79, 2.5, 3.79, 4.29, 4.71] },
      velocityScore: { '1D': 7.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$492M', pe: null, revenueGrowth: -51, eps: -3.87, grossMargin: 0, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.95, RKNG: false },
      tonyNote: 'Virgin Galactic Holdings appears in 1 of 3 Meme ETFs (33% coverage) with average weight 8.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RDW', name: 'Redwire', easyScore: 1, avgWeight: 5.83, proScore: 1.94, coverage: 0.333,
      price: 15.4, weeklyPrices: [21.43, 18.45, 18.57, 15.75, 15.40], weeklyChange: -28.14, sortRank: 0, periodReturns: { '1M': 26.6, '6M': 105.9, '1Y': -15.3 },
      priceHistory: { '1W': [21.43, 18.45, 18.57, 15.75, 15.4], '1M': [12.16, 11.56, 11.46, 13.99, 14.06, 13.96, 13.91, 14.77, 15.35, 17.49, 24, 25.9, 24.57, 20.68, 20.58, 18.62, 21.43, 18.45, 18.57, 15.75, 15.4], '6M': [7.48, 6.44, 7.82, 9.03, 10.98, 11.71, 10.96, 10.88, 10.09, 8, 8.42, 8.95, 9.23, 9.54, 9.38, 7.71, 9.65, 9.81, 10.31, 9.04, 8.69, 11.56, 13.91, 24, 18.62, 15.4], '1Y': [18.18, 16.7, 16.02, 15.6, 15.65, 19.09, 16.02, 14.06, 13.7, 9.66, 8.7, 8.99, 8.21, 8.45, 8.01, 8.96, 10.36, 9.65, 8.55, 7.74, 7.85, 7.3, 5.97, 5.48, 5.37, 6.14, 7.67, 7.02, 7.15, 10.26, 10.66, 10.66, 10.96, 10.88, 10.09, 8, 8.42, 8.95, 9.23, 10.13, 9.05, 8.5, 9.61, 9.91, 11.93, 9.04, 8.69, 11.56, 13.91, 24, 18.62, 15.4] },
      velocityScore: { '1D': -12.6, '1W': -8.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3B', pe: null, revenueGrowth: 58, eps: -2.59, grossMargin: 13, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.83, RKNG: false },
      tonyNote: 'Redwire Corp is a space infrastructure company — solar arrays, structures, and manufacturing in orbit. It appears in Meme and speculative ETFs as a high-risk space economy play. Revenue is growing from a small base but the business is pre-profitability; the ETF weight is minimal and reflects thematic positioning rather than fundamental conviction.',
    },
    {
      ticker: 'AXTI', name: 'AXT Inc', easyScore: 1, avgWeight: 4.88, proScore: 1.63, coverage: 0.333,
      price: 86.05, weeklyPrices: [105.99, 89.04, 90.78, 78.36, 86.05], weeklyChange: -18.81, sortRank: 0, periodReturns: { '1M': -31.6, '6M': 454.8, '1Y': 4335.7 },
      priceHistory: { '1W': [105.99, 89.04, 90.78, 78.36, 86.05], '1M': [125.81, 122.9, 121.94, 114.98, 123.78, 105.88, 112.88, 104.61, 121.02, 140.83, 122.77, 115.7, 103.16, 109.55, 110.85, 106.7, 105.99, 89.04, 90.78, 78.36, 86.05], '6M': [15.51, 12.36, 15.01, 16.76, 22.99, 22.09, 17.8, 20.94, 27.77, 23.21, 35.08, 41.76, 44.3, 48.39, 64.44, 52.73, 45.46, 67.3, 74.97, 68.71, 107.55, 122.9, 112.88, 122.77, 106.7, 86.05], '1Y': [1.94, 1.95, 2.13, 2.08, 2.26, 2.5, 2.37, 2.12, 2.07, 2.18, 2.51, 2.87, 2.96, 3.39, 3.96, 4.75, 4.7, 5.23, 4.93, 5.18, 7.07, 9.1, 10.98, 10.11, 10.45, 12.1, 16.38, 14.01, 15.37, 16.67, 22.24, 21.41, 17.8, 20.94, 27.77, 23.21, 35.08, 41.76, 44.3, 44.36, 68.44, 56.98, 53.18, 62.93, 86.94, 68.71, 107.55, 122.9, 112.88, 122.77, 106.7, 86.05] },
      velocityScore: { '1D': -9.4, '1W': 4.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: 39, eps: -0.32, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.88, RKNG: false },
      tonyNote: 'AXT Inc is a compound semiconductor substrate manufacturer — gallium arsenide, indium phosphide, and germanium wafers used in data center optical transceivers, 5G RF chips, and solar cells. Revenue is growing with optical networking demand. Small market cap but positioned at a genuine supply-chain chokepoint for III-V semiconductor materials.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 1, avgWeight: 4.64, proScore: 1.55, coverage: 0.333,
      price: 491.02, weeklyPrices: [575.50, 511.72, 526.93, 517.72, 491.02], weeklyChange: -14.68, sortRank: 0, periodReturns: { '1M': -4.8, '6M': 169.9, '1Y': 777.6 },
      priceHistory: { '1W': [575.5, 511.72, 526.93, 517.72, 491.02], '1M': [515.83, 488.74, 494.09, 489.15, 482.02, 458.68, 455.8, 459.62, 486.46, 484.28, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 491.02], '6M': [181.95, 166.26, 179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 594.11, 491.02], '1Y': [55.95, 58.57, 62.55, 65.78, 65.06, 67.02, 69.02, 71.43, 73.78, 76.07, 75.64, 80.67, 90.49, 96.15, 105.15, 107.21, 131.26, 119.7, 125.92, 125.72, 141.38, 160.1, 166.11, 153.97, 157.74, 161, 187.2, 175.01, 181.54, 187.88, 212.14, 222.97, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 390.99, 465.26, 488.74, 455.8, 530.6, 594.11, 491.02] },
      velocityScore: { '1D': 0, '1W': 4.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$169B', pe: 29.4, revenueGrowth: 46, eps: 16.72, grossMargin: 45, dividendYield: 0.12,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.64 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'WULF', name: 'WULF', easyScore: 1, avgWeight: 4.06, proScore: 1.35, coverage: 0.333,
      price: 25, weeklyPrices: [26.19, 24.00, 25.86, 25.30, 25.00], weeklyChange: -4.54, sortRank: 0, periodReturns: { '1M': 7, '6M': 58.6, '1Y': 453.1 },
      priceHistory: { '1W': [26.19, 24, 25.86, 25.3, 25], '1M': [23.37, 22.8, 23.12, 24.17, 22.32, 21.14, 21.34, 21.63, 22.92, 22.82, 26.74, 26.4, 25.56, 25.66, 26.49, 26.16, 26.19, 24, 25.86, 25.3, 25], '6M': [15.76, 11.57, 12.31, 12.74, 13.1, 13.85, 13.79, 13.44, 16.65, 16.18, 17.56, 14.74, 14.35, 16.41, 16.19, 13.7, 16.57, 20.95, 19.77, 20.8, 23.49, 22.8, 21.34, 26.74, 26.16, 25], '1Y': [4.52, 3.95, 3.8, 5.04, 5.13, 5.36, 5.32, 5.01, 5.15, 5.46, 9.28, 9.13, 8.87, 10.64, 11.17, 10.97, 11.58, 13.59, 13.86, 12.88, 14.5, 15.36, 12.64, 12.23, 14.84, 15.1, 15.83, 11.79, 11.75, 13.62, 13.81, 13.33, 13.79, 13.44, 16.65, 16.18, 17.56, 14.74, 14.35, 16.04, 16.22, 14.43, 18.05, 19.67, 20.55, 20.8, 23.49, 22.8, 21.34, 26.74, 26.16, 25] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$12B', pe: null, revenueGrowth: -1, eps: -2.51, grossMargin: 64, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.06 },
      tonyNote: 'WULF appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
