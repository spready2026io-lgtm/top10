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
export const SPY_RET: Record<Period, number> = { '1W': -1.7, '1M': 3, '6M': 8.7, '1Y': 25.7 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 7.8 }, { t: 'MRVL', w: 4.8 }, { t: 'AMD', w: 4.5 }, { t: 'VRT', w: 3.7 }, { t: 'SIMO', w: 3.6 }],
  ARTY: [{ t: 'MRVL', w: 9.6 }, { t: 'AMD', w: 7.2 }, { t: 'MU', w: 7.2 }, { t: 'ORCL', w: 4.4 }, { t: 'CRWV', w: 4.1 }],
  BAI: [{ t: 'MU', w: 5.7 }, { t: 'AMD', w: 5.0 }, { t: 'AVGO', w: 4.8 }, { t: 'NVDA', w: 4.5 }, { t: 'TSM', w: 4.4 }],
  IVEP: [{ t: 'BE', w: 5.2 }, { t: 'COHR', w: 4.3 }, { t: 'PWR', w: 4.3 }, { t: 'SBGSY', w: 4.1 }, { t: 'VRT', w: 4.1 }],
  IGPT: [{ t: 'MU', w: 12.0 }, { t: 'AMD', w: 7.3 }, { t: 'INTC', w: 6.5 }, { t: 'GOOGL', w: 6.0 }, { t: 'NVDA', w: 5.8 }],
  IVES: [{ t: 'MU', w: 5.7 }, { t: 'TSM', w: 4.9 }, { t: 'AMD', w: 4.8 }, { t: 'NVDA', w: 4.7 }, { t: 'AAPL', w: 4.7 }],
  ALAI: [{ t: 'NVDA', w: 13.3 }, { t: 'AMZN', w: 5.8 }, { t: 'TSM', w: 5.6 }, { t: 'MSFT', w: 5.4 }, { t: 'GOOG', w: 4.9 }],
  CHAT: [{ t: 'MU', w: 6.1 }, { t: 'NVDA', w: 5.9 }, { t: 'AMD', w: 5.7 }, { t: 'GOOGL', w: 5.3 }, { t: 'ARM', w: 4.5 }],
  AIFD: [{ t: 'MRVL', w: 6.7 }, { t: 'MU', w: 6.7 }, { t: 'NVDA', w: 6.4 }, { t: 'AVGO', w: 6.3 }, { t: 'LITE', w: 6.1 }],
  SPRX: [{ t: 'COHR', w: 9.0 }, { t: 'ARM', w: 8.2 }, { t: 'ALAB', w: 7.2 }, { t: 'KLAC', w: 5.9 }, { t: 'WULF', w: 5.0 }],
  AOTG: [{ t: 'AMD', w: 16.2 }, { t: 'NVDA', w: 10.6 }, { t: 'MU', w: 10.6 }, { t: 'TSM', w: 7.1 }, { t: 'APP', w: 4.9 }],
  SOXX: [{ t: 'MU', w: 11.3 }, { t: 'AMD', w: 9.1 }, { t: 'MRVL', w: 9.0 }, { t: 'AVGO', w: 6.1 }, { t: 'NVDA', w: 5.8 }],
  PSI: [{ t: 'MU', w: 5.6 }, { t: 'AMAT', w: 5.5 }, { t: 'KLAC', w: 5.3 }, { t: 'LRCX', w: 5.2 }, { t: 'AMD', w: 5.2 }],
  XSD: [{ t: 'MXL', w: 6.0 }, { t: 'MRVL', w: 4.9 }, { t: 'ALAB', w: 4.1 }, { t: 'NVTS', w: 4.0 }, { t: 'AMD', w: 3.6 }],
  DRAM: [{ t: 'SNDK', w: 5.1 }, { t: 'STX', w: 4.2 }, { t: 'MU', w: 4.1 }, { t: 'WDC', w: 3.9 }],
  PTF: [{ t: 'SNDK', w: 7.6 }, { t: 'WDC', w: 4.8 }, { t: 'NVTS', w: 4.7 }, { t: 'STX', w: 4.7 }, { t: 'MU', w: 4.7 }],
  WCLD: [{ t: 'DOCN', w: 3.3 }, { t: 'FROG', w: 2.9 }, { t: 'DDOG', w: 2.9 }, { t: 'TWLO', w: 2.5 }, { t: 'PANW', w: 2.4 }],
  IGV: [{ t: 'ORCL', w: 10.6 }, { t: 'MSFT', w: 7.7 }, { t: 'PANW', w: 7.6 }, { t: 'PLTR', w: 6.8 }, { t: 'CRWD', w: 6.2 }],
  FDTX: [{ t: 'MU', w: 9.4 }, { t: 'MRVL', w: 8.1 }, { t: 'TSM', w: 6.0 }, { t: 'NVDA', w: 4.6 }, { t: 'STX', w: 4.0 }],
  GTEK: [{ t: 'MRVL', w: 4.7 }, { t: 'DELL', w: 3.0 }, { t: 'CDNS', w: 2.5 }, { t: 'NET', w: 2.3 }, { t: 'APH', w: 2.1 }],
  ARKK: [{ t: 'TSLA', w: 10.1 }, { t: 'CRSP', w: 5.1 }, { t: 'TEM', w: 5.1 }, { t: 'AMD', w: 4.9 }, { t: 'HOOD', w: 4.7 }],
  MARS: [{ t: 'RKLB', w: 13.6 }, { t: 'ASTS', w: 9.5 }, { t: 'SATS', w: 8.0 }, { t: 'PL', w: 5.6 }, { t: 'VSAT', w: 4.5 }],
  FRWD: [{ t: 'STX', w: 9.0 }, { t: 'NVDA', w: 8.1 }, { t: 'AMD', w: 7.5 }, { t: 'TSM', w: 5.8 }, { t: 'LRCX', w: 5.7 }],
  BCTK: [{ t: 'AVGO', w: 8.5 }, { t: 'TSM', w: 8.5 }, { t: 'LRCX', w: 6.6 }, { t: 'NVDA', w: 6.6 }, { t: 'GOOG', w: 4.9 }],
  FWD: [{ t: 'AVGO', w: 3.1 }, { t: 'AMD', w: 2.6 }, { t: 'NVDA', w: 2.1 }, { t: 'CAT', w: 1.7 }, { t: 'LRCX', w: 1.6 }],
  CBSE: [{ t: 'MRVL', w: 3.6 }, { t: 'MU', w: 3.0 }, { t: 'SNOW', w: 2.8 }, { t: 'STX', w: 2.8 }, { t: 'TXG', w: 2.7 }],
  FCUS: [{ t: 'LITE', w: 5.0 }, { t: 'CIEN', w: 4.7 }, { t: 'MU', w: 4.5 }, { t: 'BE', w: 4.4 }, { t: 'WDC', w: 4.3 }],
  WGMI: [{ t: 'CIFR', w: 16.3 }, { t: 'IREN', w: 13.4 }, { t: 'WULF', w: 8.9 }, { t: 'CORZ', w: 7.4 }, { t: 'KEEL', w: 7.2 }],
  POW: [{ t: 'POWL', w: 6.6 }, { t: 'VICR', w: 5.3 }, { t: 'PWR', w: 4.8 }, { t: 'PRY', w: 4.5 }, { t: 'ETN', w: 4.1 }],
  VOLT: [{ t: 'POWL', w: 8.0 }, { t: 'BELFB', w: 7.3 }, { t: 'PWR', w: 5.5 }, { t: 'ETN', w: 5.5 }, { t: 'BE', w: 4.5 }],
  PBD: [{ t: 'BLDP', w: 1.3 }, { t: 'SEDG', w: 1.3 }, { t: 'ENPH', w: 1.3 }, { t: 'SHLS', w: 1.2 }, { t: 'FSLR', w: 1.2 }],
  PBW: [{ t: 'HYLN', w: 4.2 }, { t: 'NVTS', w: 3.5 }, { t: 'FCEL', w: 3.3 }, { t: 'BLDP', w: 2.5 }, { t: 'SHLS', w: 2.1 }],
  AIRR: [{ t: 'STRL', w: 7.2 }, { t: 'FIX', w: 4.3 }, { t: 'AGX', w: 4.1 }, { t: 'CHRW', w: 4.0 }, { t: 'SAIA', w: 4.0 }],
  PRN: [{ t: 'TTMI', w: 5.8 }, { t: 'STRL', w: 5.1 }, { t: 'FIX', w: 4.7 }, { t: 'PL', w: 4.6 }, { t: 'AGX', w: 4.4 }],
  RSHO: [{ t: 'TKR', w: 9.0 }, { t: 'POWL', w: 8.1 }, { t: 'CGNX', w: 7.5 }, { t: 'CAT', w: 6.7 }, { t: 'ETN', w: 5.8 }],
  IDEF: [{ t: 'RTX', w: 7.5 }, { t: 'LMT', w: 6.6 }, { t: 'GD', w: 5.4 }, { t: 'PLTR', w: 4.9 }, { t: 'NOC', w: 4.8 }],
  BILT: [{ t: 'UNP', w: 5.5 }, { t: 'AEP', w: 4.4 }, { t: 'AENA', w: 4.1 }, { t: 'LNG', w: 3.9 }, { t: 'CP', w: 3.6 }],
  BUZZ: [{ t: 'NOW', w: 3.9 }, { t: 'SMCI', w: 3.9 }, { t: 'MU', w: 3.7 }, { t: 'ASTS', w: 3.5 }, { t: 'PLTR', w: 3.3 }],
  MEME: [{ t: 'AAOI', w: 8.8 }, { t: 'RDW', w: 6.5 }, { t: 'NBIS', w: 6.2 }, { t: 'BE', w: 6.0 }, { t: 'SNDK', w: 5.8 }],
  RKNG: [{ t: 'NVTS', w: 6.8 }, { t: 'SNDK', w: 6.2 }, { t: 'MU', w: 5.7 }, { t: 'NBIS', w: 5.0 }, { t: 'WDC', w: 4.8 }],
};
// @@END_GENERATED:ETF_TOP_HOLDINGS@@

// @@GENERATED:TOP10_RET@@
// Top10 composite returns per theme per period (average of all ETFs in theme)
const TOP10_RET: Record<Theme, Record<Period, number>> = {
  'AI & ML':         { '1W': -6.2, '1M': 9.7, '6M': 36.8, '1Y': 81.7 },
  'Semiconductors':  { '1W': -5.1, '1M': 15.9, '6M': 87.4, '1Y': 151.1 },
  'Broad Tech':      { '1W': -6.5, '1M': 7.3, '6M': 24, '1Y': 56.3 },
  'Electrification': { '1W': -4.9, '1M': -3.4, '6M': 33.8, '1Y': 77.7 },
  'Industrials':     { '1W': 0.2, '1M': -0.3, '6M': 23.9, '1Y': 43.2 },
  'Meme':            { '1W': -9.1, '1M': 5.2, '6M': 18.7, '1Y': 15.1 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, Record<Period, ChartPeriodData>> = {
  'AI & ML': {
    '1W': { top10: [100, 102.02, 101.06, 99.67, 93.79], spy: [100, 100.14, 99.43, 99.81, 98.26], top10Return: -6.2, spyReturn: -1.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 103.32, 101.17, 104.23, 106.49, 106.39, 107.43, 103.94, 101.95, 101.16, 104.35, 106.8, 107.75, 111.87, 111.55, 114.17, 117.14, 119.51, 118.38, 116.71, 109.71], spy: [100, 101.39, 101.08, 101.91, 102.15, 102.56, 103.37, 102.13, 102.06, 101.38, 102.42, 102.62, 103.02, 103.71, 103.69, 104.52, 104.8, 104.95, 104.21, 104.6, 102.98], top10Return: 9.7, spyReturn: 3, xLabels: ["May 8", "May 15", "May 22", "May 29", "Jun 5"] },
    '6M': { top10: [100, 97.42, 97.96, 99, 102.15, 102.56, 101.74, 106.09, 97.44, 101.88, 101.53, 102.61, 99.92, 101.35, 101.1, 100.46, 98.14, 104.05, 112.28, 115.73, 119.06, 125.74, 133.44, 133.03, 142.5, 136.76], spy: [100, 99.43, 99.26, 100.32, 100.89, 101.18, 99.96, 101.42, 100.07, 100.91, 99.82, 100.53, 99.36, 98.63, 96.46, 95.79, 95.56, 99.16, 102.33, 103.32, 104.81, 106.69, 109.11, 108.32, 110.32, 108.7], top10Return: 36.8, spyReturn: 8.7, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.46, 101.98, 107.7, 107.75, 108.52, 112.11, 113.5, 111.91, 116.26, 116.96, 115.11, 116.48, 119.74, 126.24, 130.71, 128.44, 134.33, 134.48, 134.25, 137.03, 141.3, 133.95, 129.91, 122.49, 131.35, 135.5, 128.49, 132.91, 132.38, 136.49, 136.11, 136.5, 142.78, 129.93, 136.86, 135.87, 137.48, 133.1, 131.87, 136.07, 127.56, 131.27, 142.24, 154.89, 157.44, 162.02, 172.08, 184.09, 183.21, 197.45, 189.32], spy: [100, 101.8, 100.21, 103.69, 104.66, 105.36, 106.02, 107.43, 104.83, 107.44, 108.5, 108.81, 108.77, 109.41, 111.44, 112.44, 111.91, 113.25, 111.8, 113.19, 114.2, 115.01, 113.14, 113.3, 111.13, 114.71, 115.27, 114.78, 115.48, 115.84, 116.28, 116.41, 115.57, 117.26, 115.71, 116.68, 115.42, 116.23, 114.88, 112.31, 111.26, 108.77, 110.59, 114.57, 119.74, 119.46, 121.18, 123.36, 126.16, 125.24, 127.56, 125.68], top10Return: 81.7, spyReturn: 25.7, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Semiconductors': {
    '1W': { top10: [100, 104.94, 106.22, 103.58, 94.95], spy: [100, 100.14, 99.43, 99.81, 98.26], top10Return: -5.1, spyReturn: -1.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 104.08, 101.52, 109.35, 113.04, 111.23, 111.13, 106.98, 103.61, 104.06, 108.63, 111.3, 113, 121.62, 120.63, 120.97, 122.83, 128.7, 130.19, 126.68, 115.89], spy: [100, 101.39, 101.08, 101.91, 102.15, 102.56, 103.37, 102.13, 102.06, 101.38, 102.42, 102.62, 103.02, 103.71, 103.69, 104.52, 104.8, 104.95, 104.21, 104.6, 102.98], top10Return: 15.9, spyReturn: 3, xLabels: ["May 8", "May 15", "May 22", "May 29", "Jun 5"] },
    '6M': { top10: [100, 99.35, 101.92, 102.49, 111.48, 111.77, 115.61, 116.81, 112.82, 122.52, 119.82, 121.46, 119.07, 125.48, 128.42, 133.49, 130.76, 136.91, 143.09, 154.25, 161.85, 177.01, 188.32, 192.37, 201.6, 187.41], spy: [100, 99.43, 99.26, 100.32, 100.89, 101.18, 99.96, 101.42, 100.07, 100.91, 99.82, 100.53, 99.36, 98.63, 96.46, 95.79, 95.56, 99.16, 102.33, 103.32, 104.81, 106.69, 109.11, 108.32, 110.32, 108.7], top10Return: 87.4, spyReturn: 8.7, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 105.26, 104.78, 110.95, 111.55, 113.35, 115.84, 112.83, 110.74, 113.88, 116.56, 118.48, 118.06, 120.9, 125.55, 132.64, 129.99, 138.77, 137.56, 142.23, 142.41, 146.39, 139.94, 135.13, 127.94, 138.98, 148.7, 142.02, 144.83, 143.69, 154.09, 157.34, 164.98, 167.55, 157.23, 172.43, 167.7, 168.98, 158.72, 154.78, 160.59, 156.88, 161.46, 181.67, 198.42, 211.88, 224.51, 240.3, 258.13, 257.57, 272.55, 264.85], spy: [100, 101.8, 100.21, 103.69, 104.66, 105.36, 106.02, 107.43, 104.83, 107.44, 108.5, 108.81, 108.77, 109.41, 111.44, 112.44, 111.91, 113.25, 111.8, 113.19, 114.2, 115.01, 113.14, 113.3, 111.13, 114.71, 115.27, 114.78, 115.48, 115.84, 116.28, 116.41, 115.57, 117.26, 115.71, 116.68, 115.42, 116.23, 114.88, 112.31, 111.26, 108.77, 110.59, 114.57, 119.74, 119.46, 121.18, 123.36, 126.16, 125.24, 127.56, 125.68], top10Return: 151.1, spyReturn: 25.7, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Broad Tech': {
    '1W': { top10: [100, 101.15, 99.5, 99.25, 93.5], spy: [100, 100.14, 99.43, 99.81, 98.26], top10Return: -6.5, spyReturn: -1.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 102.64, 100.91, 103.34, 105.14, 104.04, 105.59, 102.94, 102.11, 101.38, 103.86, 105.64, 107.23, 110.68, 110.73, 113.07, 115.05, 116.3, 114.28, 114.02, 107.35], spy: [100, 101.39, 101.08, 101.91, 102.15, 102.56, 103.37, 102.13, 102.06, 101.38, 102.42, 102.62, 103.02, 103.71, 103.69, 104.52, 104.8, 104.95, 104.21, 104.6, 102.98], top10Return: 7.3, spyReturn: 3, xLabels: ["May 8", "May 15", "May 22", "May 29", "Jun 5"] },
    '6M': { top10: [100, 98.75, 98.72, 98.81, 101.36, 102.49, 101.49, 103.12, 96.43, 99.17, 99.51, 101.29, 99.55, 98.95, 98.16, 97.52, 96.77, 100.87, 108.89, 111.95, 113.51, 119.37, 123.71, 123.92, 129.79, 124.02], spy: [100, 99.43, 99.26, 100.32, 100.89, 101.18, 99.96, 101.42, 100.07, 100.91, 99.82, 100.53, 99.36, 98.63, 96.46, 95.79, 95.56, 99.16, 102.33, 103.32, 104.81, 106.69, 109.11, 108.32, 110.32, 108.7], top10Return: 24, spyReturn: 8.7, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.49, 101.83, 106.01, 107.97, 108.59, 111, 111.11, 106.86, 108.84, 109.94, 111.13, 112.02, 112.81, 119.08, 124.83, 124.74, 130.89, 133.79, 133.53, 134.28, 134.66, 130.35, 121.77, 116.5, 124.9, 127.34, 120.38, 124.32, 121.25, 126.38, 129.45, 128.97, 132.58, 121.71, 125.56, 126.66, 129.39, 126.1, 124.32, 127.22, 122.98, 125.02, 130.61, 141.01, 142.7, 144.31, 151.95, 155.71, 155.75, 164.25, 156.27], spy: [100, 101.8, 100.21, 103.69, 104.66, 105.36, 106.02, 107.43, 104.83, 107.44, 108.5, 108.81, 108.77, 109.41, 111.44, 112.44, 111.91, 113.25, 111.8, 113.19, 114.2, 115.01, 113.14, 113.3, 111.13, 114.71, 115.27, 114.78, 115.48, 115.84, 116.28, 116.41, 115.57, 117.26, 115.71, 116.68, 115.42, 116.23, 114.88, 112.31, 111.26, 108.77, 110.59, 114.57, 119.74, 119.46, 121.18, 123.36, 126.16, 125.24, 127.56, 125.68], top10Return: 56.3, spyReturn: 25.7, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Electrification': {
    '1W': { top10: [100, 101.72, 100.65, 100.5, 95.03], spy: [100, 100.14, 99.43, 99.81, 98.26], top10Return: -4.9, spyReturn: -1.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 101.06, 98.87, 100.57, 102.81, 100.98, 100.94, 98.28, 95.24, 93.06, 95.32, 98.28, 99.92, 103.35, 102.72, 101.94, 101.85, 103.66, 102.45, 102.34, 96.58], spy: [100, 101.39, 101.08, 101.91, 102.15, 102.56, 103.37, 102.13, 102.06, 101.38, 102.42, 102.62, 103.02, 103.71, 103.69, 104.52, 104.8, 104.95, 104.21, 104.6, 102.98], top10Return: -3.4, spyReturn: 3, xLabels: ["May 8", "May 15", "May 22", "May 29", "Jun 5"] },
    '6M': { top10: [100, 98.8, 98.4, 98.82, 102.81, 105.01, 107.86, 111.47, 110, 114.97, 114.07, 117.03, 109.51, 112, 111.61, 114.55, 112.18, 118.61, 122.97, 129.25, 135.12, 137.61, 140.18, 136.34, 141.07, 133.75], spy: [100, 99.43, 99.26, 100.32, 100.89, 101.18, 99.96, 101.42, 100.07, 100.91, 99.82, 100.53, 99.36, 98.63, 96.46, 95.79, 95.56, 99.16, 102.33, 103.32, 104.81, 106.69, 109.11, 108.32, 110.32, 108.7], top10Return: 33.8, spyReturn: 8.7, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 103.64, 102.47, 105.06, 107.61, 109.55, 112.73, 116.28, 110.9, 114, 117.11, 118.51, 116.84, 117.42, 119.99, 125.33, 126.04, 134.33, 136.71, 139.34, 139.6, 140.61, 138.01, 134.7, 130.7, 136.73, 139.18, 138.26, 140.86, 137.27, 140.98, 145.29, 148.46, 151.04, 149.42, 151.29, 151.12, 155.02, 148.87, 150.15, 151.98, 151.47, 154.49, 162.83, 171.66, 175.43, 178.02, 177.01, 183.62, 181.38, 187.96, 177.67], spy: [100, 101.8, 100.21, 103.69, 104.66, 105.36, 106.02, 107.43, 104.83, 107.44, 108.5, 108.81, 108.77, 109.41, 111.44, 112.44, 111.91, 113.25, 111.8, 113.19, 114.2, 115.01, 113.14, 113.3, 111.13, 114.71, 115.27, 114.78, 115.48, 115.84, 116.28, 116.41, 115.57, 117.26, 115.71, 116.68, 115.42, 116.23, 114.88, 112.31, 111.26, 108.77, 110.59, 114.57, 119.74, 119.46, 121.18, 123.36, 126.16, 125.24, 127.56, 125.68], top10Return: 77.7, spyReturn: 25.7, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Industrials': {
    '1W': { top10: [100, 101.31, 101.06, 102.02, 100.21], spy: [100, 100.14, 99.43, 99.81, 98.26], top10Return: 0.2, spyReturn: -1.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 102.18, 99.67, 100.05, 101.13, 100.28, 100.96, 98.29, 96.95, 95.83, 97.66, 97.85, 98.74, 101.2, 101.19, 101.01, 99.52, 100.83, 100.58, 101.53, 99.71], spy: [100, 101.39, 101.08, 101.91, 102.15, 102.56, 103.37, 102.13, 102.06, 101.38, 102.42, 102.62, 103.02, 103.71, 103.69, 104.52, 104.8, 104.95, 104.21, 104.6, 102.98], top10Return: -0.3, spyReturn: 3, xLabels: ["May 8", "May 15", "May 22", "May 29", "Jun 5"] },
    '6M': { top10: [100, 101.07, 100.94, 101.76, 106.1, 109.07, 111.84, 111.41, 112.23, 117.44, 119.31, 119.97, 114.96, 114.2, 112.32, 114.11, 113.32, 119.57, 119.05, 121.5, 122.86, 123.71, 125.46, 121.37, 125.37, 123.86], spy: [100, 99.43, 99.26, 100.32, 100.89, 101.18, 99.96, 101.42, 100.07, 100.91, 99.82, 100.53, 99.36, 98.63, 96.46, 95.79, 95.56, 99.16, 102.33, 103.32, 104.81, 106.69, 109.11, 108.32, 110.32, 108.7], top10Return: 23.9, spyReturn: 8.7, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.09, 100.32, 103.85, 104.95, 106.15, 106.02, 109.15, 106.31, 108.33, 108.79, 110.28, 109.93, 110.76, 112.91, 114.07, 113.73, 117.13, 115.4, 116.08, 118.79, 118.33, 115.01, 112.11, 109.5, 112.64, 115.32, 116.09, 118.65, 117.02, 122.08, 127.06, 130.61, 130, 131, 136.46, 137.69, 137.8, 131.96, 128.44, 129.64, 127.82, 130.54, 137.29, 139.86, 140.65, 141.66, 143.02, 144.87, 140.26, 144.49, 143.18], spy: [100, 101.8, 100.21, 103.69, 104.66, 105.36, 106.02, 107.43, 104.83, 107.44, 108.5, 108.81, 108.77, 109.41, 111.44, 112.44, 111.91, 113.25, 111.8, 113.19, 114.2, 115.01, 113.14, 113.3, 111.13, 114.71, 115.27, 114.78, 115.48, 115.84, 116.28, 116.41, 115.57, 117.26, 115.71, 116.68, 115.42, 116.23, 114.88, 112.31, 111.26, 108.77, 110.59, 114.57, 119.74, 119.46, 121.18, 123.36, 126.16, 125.24, 127.56, 125.68], top10Return: 43.2, spyReturn: 25.7, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Meme': {
    '1W': { top10: [100, 102.46, 98.88, 99.41, 90.83], spy: [100, 100.14, 99.43, 99.81, 98.26], top10Return: -9.1, spyReturn: -1.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 104.18, 98.99, 102.35, 107.07, 106.28, 107.29, 103.09, 98.94, 97.41, 101.16, 107.27, 109.82, 113.49, 115.19, 115.72, 115.9, 118.78, 114.59, 115.23, 105.25], spy: [100, 101.39, 101.08, 101.91, 102.15, 102.56, 103.37, 102.13, 102.06, 101.38, 102.42, 102.62, 103.02, 103.71, 103.69, 104.52, 104.8, 104.95, 104.21, 104.6, 102.98], top10Return: 5.2, spyReturn: 3, xLabels: ["May 8", "May 15", "May 22", "May 29", "Jun 5"] },
    '6M': { top10: [100, 96.4, 93.16, 89.92, 94.86, 98.68, 98.14, 97.86, 87.02, 89.43, 89.68, 88.87, 84.99, 86.54, 89.15, 91.24, 88.45, 94.59, 105.04, 106.8, 106.45, 113.88, 118.62, 123.82, 131.46, 118.71], spy: [100, 99.43, 99.26, 100.32, 100.89, 101.18, 99.96, 101.42, 100.07, 100.91, 99.82, 100.53, 99.36, 98.63, 96.46, 95.79, 95.56, 99.16, 102.33, 103.32, 104.81, 106.69, 109.11, 108.32, 110.32, 108.7], top10Return: 18.7, spyReturn: 8.7, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.61, 102.11, 98.87, 96.56, 95.13, 94.02, 94.47, 86.94, 87.95, 86.77, 88.67, 89.25, 91.09, 92.84, 88.87, 93.94, 94.45, 94.93, 97.26, 99.84, 99.51, 95.16, 91.77, 85.87, 85.36, 91.55, 87, 90.8, 90.73, 92.76, 95.43, 94.9, 96.81, 93.91, 93.07, 89.79, 90.27, 93.89, 97.65, 99.97, 101.62, 99.27, 99.74, 104.47, 107.48, 112.94, 114.14, 119.75, 124.48, 128.24, 115.1], spy: [100, 101.8, 100.21, 103.69, 104.66, 105.36, 106.02, 107.43, 104.83, 107.44, 108.5, 108.81, 108.77, 109.41, 111.44, 112.44, 111.91, 113.25, 111.8, 113.19, 114.2, 115.01, 113.14, 113.3, 111.13, 114.71, 115.27, 114.78, 115.48, 115.84, 116.28, 116.41, 115.57, 117.26, 115.71, 116.68, 115.42, 116.23, 114.88, 112.31, 111.26, 108.77, 110.59, 114.57, 119.74, 119.46, 121.18, 123.36, 126.16, 125.24, 127.56, 125.68], top10Return: 15.1, spyReturn: 25.7, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
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
export const SCAN_TIMESTAMP    = '2026-06-05T16:23:18.644Z';
export const SCAN_TIMESTAMP_NY = 'June 5, 2026 at 12:23 PM ET';
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
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 14.27, bestProScore: 6.07, price: 914.51, weeklyChange: -11.68 },
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 10.97, bestProScore: 5.56, price: 208.44, weeklyChange: -7.09 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 10.67, bestProScore: 4.75, price: 478.76, weeklyChange: -6.15 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 7.40, bestProScore: 3.49, price: 286.51, weeklyChange: 30.57 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 5.97, bestProScore: 2.60, price: 393.52, weeklyChange: -14.45 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 6.29, bestProScore: 3.67, price: 291.24, weeklyChange: 1.08 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.49, bestProScore: 3.39, price: 102.94, weeklyChange: -5.84 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.26, bestProScore: 2.58, price: 422.15, weeklyChange: -3.09 },
  { ticker: 'ETN', name: `Eaton Corp PLC`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 3.58, bestProScore: 2.41, price: 400.90, weeklyChange: 0.20 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.43, bestProScore: 2.15, price: 316.38, weeklyChange: -0.23 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': -6.7, '1M': 15, '6M': 95.2, '1Y': 185.9 },
  ARTY: { '1W': -6.9, '1M': 11.5, '6M': 46.7, '1Y': 92.8 },
  BAI:  { '1W': -7.9, '1M': 4.8, '6M': 33.7, '1Y': 76 },
  IVEP: { '1W': 0.1, '1M': -4.5, '6M': 5.7, '1Y': 5.7 },
  IGPT: { '1W': -8.3, '1M': 11.8, '6M': 58.2, '1Y': 102.4 },
  IVES: { '1W': -9, '1M': 11.1, '6M': 15.5, '1Y': 50.4 },
  ALAI: { '1W': -6.2, '1M': 7.7, '6M': 17.7, '1Y': 52.9 },
  CHAT: { '1W': -8.7, '1M': 13.1, '6M': 50, '1Y': 113.4 },
  AIFD: { '1W': -3.5, '1M': 8.8, '6M': 40.4, '1Y': 88 },
  SPRX: { '1W': -4, '1M': 20.1, '6M': 31.5, '1Y': 97.8 },
  AOTG: { '1W': -7.2, '1M': 7.4, '6M': 9.7, '1Y': 33.4 },
  // Semiconductors
  SOXX: { '1W': -2, '1M': 16.1, '6M': 81.1, '1Y': 159.6 },
  PSI:  { '1W': -2.2, '1M': 7.6, '6M': 85.8, '1Y': 181 },
  XSD:  { '1W': -1.8, '1M': 13.9, '6M': 72.7, '1Y': 153.9 },
  DRAM: { '1W': -14.3, '1M': 25.9, '6M': 110, '1Y': 110 },
  // Broad Tech
  PTF:  { '1W': -4.1, '1M': 5.8, '6M': 55.5, '1Y': 90.5 },
  WCLD: { '1W': -10.7, '1M': 7.8, '6M': -8.7, '1Y': -12.2 },
  IGV:  { '1W': -10.4, '1M': 9.4, '6M': -11.8, '1Y': -7.8 },
  FDTX: { '1W': -2.4, '1M': 14.7, '6M': 33.1, '1Y': 49.3 },
  GTEK: { '1W': -4.6, '1M': 7.5, '6M': 43.8, '1Y': 69.2 },
  ARKK: { '1W': -7.2, '1M': -1.5, '6M': -7.9, '1Y': 33.8 },
  MARS: { '1W': -11.4, '1M': 14.8, '6M': 40, '1Y': 40 },
  FRWD: { '1W': -5.9, '1M': 9.1, '6M': 26.7, '1Y': 26.7 },
  BCTK: { '1W': -4.9, '1M': 7.6, '6M': 22.1, '1Y': 22.1 },
  FWD:  { '1W': -4.3, '1M': 5.3, '6M': 29.9, '1Y': 65.1 },
  CBSE: { '1W': -2.3, '1M': 3.3, '6M': 21.8, '1Y': 42.3 },
  FCUS: { '1W': -3.1, '1M': 0.4, '6M': 32.9, '1Y': 75.2 },
  WGMI: { '1W': -13.3, '1M': 11.3, '6M': 34.8, '1Y': 237.2 },
  // Electrification
  POW:  { '1W': -6, '1M': -10.2, '6M': 46.2, '1Y': 45.3 },
  VOLT: { '1W': 0.7, '1M': -5.8, '6M': 29.7, '1Y': 61.4 },
  PBD:  { '1W': -6.4, '1M': -2.9, '6M': 29.4, '1Y': 75.2 },
  PBW:  { '1W': -8.1, '1M': 5.2, '6M': 29.7, '1Y': 128.8 },
  // Industrials
  AIRR: { '1W': 1.9, '1M': -0.6, '6M': 31.2, '1Y': 66 },
  PRN:  { '1W': 0.1, '1M': 0.3, '6M': 38.4, '1Y': 59.4 },
  RSHO: { '1W': 0.6, '1M': 2.4, '6M': 29.4, '1Y': 53 },
  IDEF: { '1W': -3.7, '1M': -3.3, '6M': 8, '1Y': 20.9 },
  BILT: { '1W': 2.2, '1M': -0.3, '6M': 12.3, '1Y': 16.5 },
  // Meme
  BUZZ: { '1W': -8.7, '1M': 5.3, '6M': 7.2, '1Y': 37 },
  MEME: { '1W': -10.2, '1M': 8, '6M': 43.2, '1Y': 2.6 },
  RKNG: { '1W': -8.5, '1M': 2.4, '6M': 5.7, '1Y': 5.7 },
};
// @@END_GENERATED:ETF_RETURNS@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 6.97, proScore: 5.7, coverage: 0.818,
      price: 914.51, weeklyPrices: [1035.50, 1064.10, 1079.57, 996.00, 914.51], weeklyChange: -11.68, sortRank: 0, periodReturns: { '1M': 42.8, '6M': 285.5, '1Y': 760.4 },
      priceHistory: { '1W': [1035.5, 1064.1, 1079.57, 996, 914.51], '1M': [640.2, 666.59, 646.63, 746.81, 795.33, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 971, 1035.5, 1064.1, 1079.57, 996, 914.51], '6M': [237.22, 241.14, 265.92, 294.37, 343.43, 338.13, 389.11, 435.28, 379.4, 410.34, 417.35, 415.56, 397.05, 418.69, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 776.01, 762.1, 971, 914.51], '1Y': [106.29, 116.18, 123.6, 124.76, 119.92, 118.61, 113.23, 111.26, 104.88, 118.89, 120.87, 117.68, 119.01, 131.46, 157.77, 164.62, 163.9, 190.96, 192.77, 206.77, 219.02, 223.77, 237.92, 246.83, 207.37, 240.46, 246.92, 237.5, 276.59, 292.63, 339.55, 333.35, 389.11, 435.28, 379.4, 410.34, 417.35, 415.56, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 481.72, 517.16, 646.63, 776.01, 762.1, 971, 914.51] },
      velocityScore: { '1D': -3.7, '1W': -1.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.0T', pe: 43.1, revenueGrowth: 196, eps: 21.21, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { AIS: 7.77, ARTY: 7.18, BAI: 5.72, IVEP: false, IGPT: 12.01, IVES: 5.72, ALAI: 1.04, CHAT: 6.07, AIFD: 6.65, SPRX: false, AOTG: 10.59 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 6.11, proScore: 5.56, coverage: 0.909,
      price: 208.44, weeklyPrices: [224.36, 222.82, 214.75, 218.66, 208.44], weeklyChange: -7.09, sortRank: 0, periodReturns: { '1M': 6.1, '6M': 14.3, '1Y': 48.9 },
      priceHistory: { '1W': [224.36, 222.82, 214.75, 218.66, 208.44], '1M': [196.5, 207.83, 211.5, 215.2, 219.44, 225.83, 235.74, 225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 211.14, 224.36, 222.82, 214.75, 218.66, 208.44], '6M': [182.41, 175.02, 180.99, 188.22, 187.24, 185.81, 183.32, 191.52, 174.19, 190.05, 187.9, 184.89, 183.34, 186.03, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 199.57, 211.5, 235.74, 219.51, 211.14, 208.44], '1Y': [139.99, 145, 143.85, 157.75, 158.24, 164.07, 171.38, 173.5, 173.72, 182.7, 180.45, 177.99, 174.18, 168.31, 177.75, 183.61, 181.85, 185.54, 188.32, 182.64, 186.26, 202.49, 188.15, 190.17, 178.88, 179.92, 185.55, 176.29, 183.69, 187.54, 189.11, 183.14, 183.32, 191.52, 174.19, 190.05, 187.9, 184.89, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 199.64, 199.57, 211.5, 235.74, 219.51, 211.14, 208.44] },
      velocityScore: { '1D': 1.1, '1W': -4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.0T', pe: 31.9, revenueGrowth: 85, eps: 6.54, grossMargin: 74, dividendYield: 0.46,
      etfPresence: { AIS: 2.47, ARTY: 3.47, BAI: 4.52, IVEP: false, IGPT: 5.84, IVES: 4.71, ALAI: 13.33, CHAT: 5.89, AIFD: 6.36, SPRX: 3.93, AOTG: 10.62 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.81, proScore: 4.75, coverage: 0.818,
      price: 478.76, weeklyPrices: [510.13, 521.54, 542.52, 523.20, 478.76], weeklyChange: -6.15, sortRank: 0, periodReturns: { '1M': 34.8, '6M': 119.6, '1Y': 313.8 },
      priceHistory: { '1W': [510.13, 521.54, 542.52, 523.2, 478.76], '1M': [355.26, 421.39, 408.46, 455.19, 458.79, 445.5, 449.7, 424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 516.1, 510.13, 521.54, 542.52, 523.2, 478.76], '6M': [217.97, 210.78, 213.43, 215.61, 214.35, 220.97, 249.8, 252.74, 200.19, 213.58, 203.37, 203.68, 199.45, 204.83, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 354.49, 408.46, 449.7, 449.59, 516.1, 478.76], '1Y': [115.69, 118.5, 128.24, 143.81, 134.8, 146.24, 157, 166.47, 171.7, 172.76, 177.51, 167.76, 162.63, 151.41, 161.16, 159.79, 161.36, 203.71, 216.42, 240.56, 252.92, 256.12, 233.54, 246.81, 203.78, 219.76, 221.11, 207.58, 214.95, 215.34, 210.02, 223.6, 249.8, 252.74, 200.19, 213.58, 203.37, 203.68, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 305.33, 354.49, 408.46, 449.7, 449.59, 516.1, 478.76] },
      velocityScore: { '1D': 0.4, '1W': -11.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$781B', pe: 160.7, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.52, ARTY: 7.23, BAI: 5.04, IVEP: false, IGPT: 7.27, IVES: 4.81, ALAI: 1.07, CHAT: 5.68, AIFD: false, SPRX: 0.51, AOTG: 16.16 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 6, avgWeight: 4.85, proScore: 2.65, coverage: 0.545,
      price: 286.51, weeklyPrices: [219.43, 290.79, 301.65, 316.43, 286.51], weeklyChange: 30.57, sortRank: 0, periodReturns: { '1M': 69.8, '6M': 189.7, '1Y': 339.7 },
      priceHistory: { '1W': [219.43, 290.79, 301.65, 316.43, 286.51], '1M': [168.75, 172.15, 160.01, 170.13, 170.84, 177.95, 182.58, 176.89, 168.93, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 205, 219.43, 290.79, 301.65, 316.43, 286.51], '6M': [98.91, 84.43, 84.09, 85.76, 88.23, 83.05, 82.55, 83.62, 73.73, 81.34, 79.61, 79.29, 75.68, 90.44, 87.62, 98.45, 106.71, 119.93, 133.37, 165.56, 165.15, 160.01, 182.58, 190.69, 205, 286.51], '1Y': [65.16, 69.64, 73.51, 77.16, 71.55, 72.51, 73.06, 74.21, 74.45, 77.34, 76.19, 73, 62.87, 66, 67.43, 75.53, 82.39, 88.92, 89.39, 85.84, 84.13, 93.74, 90.92, 86.45, 77.45, 91.1, 92, 84.26, 84.8, 86.76, 84.64, 81.21, 82.55, 83.62, 73.73, 81.34, 79.61, 79.29, 75.68, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 165.56, 165.15, 160.01, 182.58, 190.69, 205, 286.51] },
      velocityScore: { '1D': 10, '1W': 23.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$251B', pe: 98.5, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.08,
      etfPresence: { AIS: 4.8, ARTY: 9.55, BAI: 1.71, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.95, AIFD: 6.71, SPRX: 4.4, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.58, proScore: 2.6, coverage: 0.727,
      price: 393.52, weeklyPrices: [459.97, 481.57, 479.23, 418.91, 393.52], weeklyChange: -14.45, sortRank: 0, periodReturns: { '1M': -7.9, '6M': 0.8, '1Y': 51.4 },
      priceHistory: { '1W': [459.97, 481.57, 479.23, 418.91, 393.52], '1M': [427.36, 425.44, 412.56, 430, 428.43, 416.79, 439.79, 425.19, 420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 446.77, 459.97, 481.57, 479.23, 418.91, 393.52], '6M': [390.24, 359.93, 340.36, 349.39, 343.77, 354.61, 328.8, 333.24, 308.05, 342.76, 333.99, 321.7, 332.77, 341.57, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 417.43, 412.56, 439.79, 414.57, 446.77, 393.52], '1Y': [259.93, 256.07, 249.99, 269.35, 274.18, 275.6, 288.21, 290.18, 288.64, 304.97, 306.34, 294, 297.39, 345.65, 364.09, 338.79, 327.9, 335.49, 356.7, 349.24, 354.13, 369.63, 349.43, 342.46, 340.2, 386.08, 401.1, 339.81, 341.45, 349.85, 343.5, 339.89, 328.8, 333.24, 308.05, 342.76, 333.99, 321.7, 332.77, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 419.94, 417.43, 412.56, 439.79, 414.57, 446.77, 393.52] },
      velocityScore: { '1D': -8.8, '1W': -28.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.9T', pe: 65.7, revenueGrowth: 48, eps: 5.99, grossMargin: 76, dividendYield: 0.62,
      etfPresence: { AIS: 0.7, ARTY: 3.43, BAI: 4.85, IVEP: false, IGPT: false, IVES: 4.5, ALAI: 4.04, CHAT: 3.01, AIFD: 6.31, SPRX: false, AOTG: 1.79 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 6, avgWeight: 4.73, proScore: 2.58, coverage: 0.545,
      price: 422.15, weeklyPrices: [435.63, 446.69, 436.69, 444.92, 422.15], weeklyChange: -3.09, sortRank: 0, periodReturns: { '1M': 7, '6M': 43.2, '1Y': 107.6 },
      priceHistory: { '1W': [435.63, 446.69, 436.69, 444.92, 422.15], '1M': [394.41, 419.5, 414.15, 411.68, 404.54, 399.8, 417.72, 404.35, 395.95, 392.61, 401.62, 407.15, 404.52, 412.32, 422.73, 418.45, 435.63, 446.69, 436.69, 444.92, 422.15], '6M': [294.72, 292.04, 288.95, 300.92, 327.43, 331.21, 326.12, 342.3, 325.74, 374.09, 360.39, 376.81, 353.86, 354.56, 339.57, 347.75, 341.49, 365.49, 363.35, 382.66, 396.06, 414.15, 417.72, 407.15, 418.45, 422.15], '1Y': [203.34, 215.43, 209.51, 228.57, 229.17, 228.67, 238.85, 245.6, 235.21, 241.83, 238.88, 232.99, 230.87, 247.19, 261.38, 272.63, 273.23, 302.4, 302.89, 297.7, 294.96, 300.43, 286.5, 284.82, 275.06, 287.68, 301.87, 287.74, 293.28, 299.58, 318.68, 327.11, 326.12, 342.3, 325.74, 374.09, 360.39, 376.81, 353.86, 336.71, 338.79, 326.11, 339.04, 370.6, 370.5, 382.66, 396.06, 414.15, 417.72, 407.15, 418.45, 422.15] },
      velocityScore: { '1D': 2, '1W': -16.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.2T', pe: 36.1, revenueGrowth: 35, eps: 11.7, grossMargin: 62, dividendYield: 0.85,
      etfPresence: { AIS: 3.18, ARTY: false, BAI: 4.41, IVEP: false, IGPT: false, IVES: 4.91, ALAI: 5.62, CHAT: false, AIFD: 3.16, SPRX: false, AOTG: 7.07 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 4.64, proScore: 2.53, coverage: 0.545,
      price: 369.55, weeklyPrices: [376.37, 361.85, 358.99, 372.19, 369.55], weeklyChange: -1.81, sortRank: 0, periodReturns: { '1M': -4.9, '6M': 15, '1Y': 119.7 },
      priceHistory: { '1W': [376.37, 361.85, 358.99, 372.19, 369.55], '1M': [388.43, 398.04, 397.99, 400.8, 388.64, 402.62, 401.07, 396.78, 396.94, 387.66, 388.91, 387.66, 382.97, 388.88, 388.83, 380.34, 376.37, 361.85, 358.99, 372.19, 369.55], '6M': [321.27, 309.29, 307.16, 313.56, 314.34, 335.97, 328.38, 336.01, 333.04, 310.96, 302.85, 307.38, 300.88, 308.7, 307.69, 290.93, 297.39, 318.49, 336.02, 338.89, 384.8, 397.99, 401.07, 387.66, 380.34, 369.55], '1Y': [168.21, 175.7, 166.64, 178.53, 176.79, 181.56, 190.1, 193.18, 189.13, 201.42, 203.9, 206.09, 212.91, 234.04, 251.61, 252.53, 244.05, 250.43, 244.15, 256.55, 259.92, 281.19, 278.83, 276.41, 299.66, 314.89, 313.72, 308.22, 309.78, 313.85, 321.98, 335.84, 328.38, 336.01, 333.04, 310.96, 302.85, 307.38, 300.88, 303.55, 307.13, 280.92, 295.77, 317.24, 341.68, 338.89, 384.8, 397.99, 401.07, 387.66, 380.34, 369.55] },
      velocityScore: { '1D': 4.1, '1W': -35, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.5T', pe: 28.2, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.53, IVEP: false, IGPT: 5.99, IVES: 4.35, ALAI: false, CHAT: 5.35, AIFD: 4.73, SPRX: false, AOTG: 3.88 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 4.12, proScore: 1.87, coverage: 0.455,
      price: 252.57, weeklyPrices: [261.26, 256.52, 250.02, 253.79, 252.57], weeklyChange: -3.32, sortRank: 0, periodReturns: { '1M': -7.7, '6M': 10, '1Y': 21.5 },
      priceHistory: { '1W': [261.26, 256.52, 250.02, 253.79, 252.57], '1M': [273.55, 274.99, 271.17, 272.68, 268.99, 270.13, 267.22, 264.14, 264.86, 259.34, 265.01, 268.46, 266.32, 265.29, 271.85, 270.64, 261.26, 256.52, 250.02, 253.79, 252.57], '6M': [229.53, 226.19, 227.35, 232.07, 240.93, 242.6, 231.31, 243.01, 232.99, 204.08, 204.86, 207.92, 218.94, 212.65, 209.87, 211.71, 210.57, 233.65, 249.7, 255.08, 265.06, 271.17, 267.22, 268.46, 270.64, 252.57], '1Y': [207.91, 213.24, 209.69, 223.3, 223.47, 225.69, 229.3, 231.44, 214.75, 222.69, 231.03, 228.84, 229, 235.84, 231.43, 227.63, 222.17, 220.9, 220.07, 216.48, 224.21, 244.22, 244.41, 234.69, 220.69, 233.88, 226.89, 222.54, 228.43, 232.53, 241.56, 236.65, 231.31, 243.01, 232.99, 204.08, 204.86, 207.92, 218.94, 209.53, 208.76, 207.54, 209.77, 238.38, 250.56, 255.08, 265.06, 271.17, 267.22, 268.46, 270.64, 252.57] },
      velocityScore: { '1D': 1.1, '1W': -41.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.7T', pe: 31.5, revenueGrowth: 17, eps: 8.02, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.29, ALAI: 5.77, CHAT: 3.09, AIFD: 3.37, SPRX: false, AOTG: 4.06 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.7, proScore: 1.68, coverage: 0.455,
      price: 419.93, weeklyPrices: [460.52, 441.31, 427.34, 428.05, 419.93], weeklyChange: -8.81, sortRank: 0, periodReturns: { '1M': 2.1, '6M': -13.1, '1Y': -10.2 },
      priceHistory: { '1W': [460.52, 441.31, 427.34, 428.05, 419.93], '1M': [411.38, 413.96, 420.77, 415.12, 412.66, 405.21, 409.43, 421.92, 423.54, 417.42, 421.06, 419.09, 418.57, 416.03, 412.67, 450.24, 460.52, 441.31, 427.34, 428.05, 419.93], '6M': [483.16, 478.53, 485.92, 487.1, 478.51, 470.67, 444.11, 481.63, 414.19, 404.37, 398.46, 401.72, 410.68, 404.88, 391.79, 371.04, 369.37, 373.07, 420.26, 415.75, 407.78, 420.77, 409.43, 419.09, 450.24, 419.93], '1Y': [467.68, 478.87, 477.4, 495.94, 497.72, 503.02, 510.06, 513.71, 524.11, 522.04, 520.17, 507.23, 506.69, 498.2, 515.36, 514.45, 514.6, 528.57, 514.05, 516.79, 523.61, 517.81, 496.82, 510.18, 472.12, 486.74, 491.02, 474.82, 484.92, 487.48, 483.47, 459.38, 444.11, 481.63, 414.19, 404.37, 398.46, 401.72, 410.68, 401.86, 389.02, 365.97, 373.46, 370.87, 422.79, 415.75, 407.78, 420.77, 409.43, 419.09, 450.24, 419.93] },
      velocityScore: { '1D': 27.3, '1W': -37.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.1T', pe: 25, revenueGrowth: 18, eps: 16.78, grossMargin: 68, dividendYield: 0.85,
      etfPresence: { AIS: false, ARTY: 1.73, BAI: false, IVEP: false, IGPT: false, IVES: 4.64, ALAI: 5.44, CHAT: 2.9, AIFD: false, SPRX: false, AOTG: 3.78 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 3.45, proScore: 1.57, coverage: 0.455,
      price: 610.54, weeklyPrices: [600.47, 597.63, 622.98, 627.57, 610.54], weeklyChange: 1.68, sortRank: 0, periodReturns: { '1M': 0.9, '6M': -9.3, '1Y': -10.8 },
      priceHistory: { '1W': [600.47, 597.63, 622.98, 627.57, 610.54], '1M': [604.96, 612.88, 616.81, 609.63, 598.86, 616.63, 618.43, 614.23, 611.21, 602.61, 605.06, 607.38, 610.26, 612.34, 635.26, 632.51, 600.47, 597.63, 622.98, 627.57, 610.54], '6M': [673.42, 644.23, 658.77, 658.69, 660.62, 631.09, 612.96, 668.73, 668.99, 668.69, 644.78, 657.01, 660.57, 654.86, 615.68, 594.89, 579.23, 628.39, 676.87, 659.15, 611.91, 616.81, 618.43, 607.38, 632.51, 610.54], '1Y': [684.62, 693.36, 682.35, 733.63, 718.35, 720.92, 712.97, 712.68, 750.01, 769.3, 785.23, 754.79, 738.7, 752.3, 764.7, 765.16, 743.4, 715.66, 715.7, 732.17, 738.36, 648.35, 621.71, 609.46, 594.25, 640.87, 666.8, 647.51, 661.5, 665.95, 648.69, 615.52, 612.96, 668.73, 668.99, 668.69, 644.78, 657.01, 660.57, 638.18, 606.7, 547.54, 574.46, 629.86, 688.55, 659.15, 611.91, 616.81, 618.43, 607.38, 632.51, 610.54] },
      velocityScore: { '1D': 2.6, '1W': -45.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 22.2, revenueGrowth: 33, eps: 27.49, grossMargin: 82, dividendYield: 0.33,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: 4.8, IVES: 4.51, ALAI: 4.4, CHAT: 2.36, AIFD: false, SPRX: false, AOTG: 1.17 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 7, avgWeight: 2.31, proScore: 1.47, coverage: 0.636,
      price: 154.56, weeklyPrices: [170.68, 175.33, 174.37, 166.01, 154.56], weeklyChange: -9.44, sortRank: 0, periodReturns: { '1M': -9.2, '6M': 20.2, '1Y': 62.4 },
      priceHistory: { '1W': [170.68, 175.33, 174.37, 166.01, 154.56], '1M': [170.22, 147.06, 141.75, 141.77, 136.43, 140.69, 147.81, 141.97, 141.71, 141.58, 140.49, 148.59, 154.03, 158.01, 154.31, 159.47, 170.68, 175.33, 174.37, 166.01, 154.56], '6M': [128.59, 124.76, 131.12, 134.15, 132.58, 129.93, 127.29, 150.15, 130.28, 140.66, 137.23, 130.25, 139.4, 138.23, 136.07, 135.01, 124.85, 146.05, 161.01, 172.55, 172.71, 141.75, 147.81, 148.59, 159.47, 154.56], '1Y': [95.18, 95.77, 86.25, 99.39, 101.47, 108.37, 111.61, 114.28, 117.57, 139.18, 137.3, 133.25, 136.55, 140.01, 145.43, 145.4, 143.37, 149.5, 147.45, 146.48, 153.82, 157.69, 134.65, 131.37, 117.43, 128.11, 129.11, 125.89, 130.73, 132.44, 130.08, 125.09, 127.29, 150.15, 130.28, 140.66, 137.23, 130.25, 139.4, 134.03, 136.26, 122.55, 126.68, 147.35, 164.23, 172.55, 172.71, 141.75, 147.81, 148.59, 159.47, 154.56] },
      velocityScore: { '1D': -2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$195B', pe: 53.1, revenueGrowth: 35, eps: 2.91, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.37, ARTY: 1.94, BAI: 1.39, IVEP: false, IGPT: false, IVES: false, ALAI: 0.91, CHAT: 2.35, AIFD: 4.96, SPRX: 3.26, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 7 of 11 AI & ML ETFs (64% coverage) with average weight 2.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.23, proScore: 1.47, coverage: 0.455,
      price: 326.99, weeklyPrices: [320.09, 355.76, 363.54, 358.05, 326.99], weeklyChange: 2.16, sortRank: 0, periodReturns: { '1M': 51.6, '6M': 102.8, '1Y': 260.5 },
      priceHistory: { '1W': [320.09, 355.76, 363.54, 358.05, 326.99], '1M': [215.69, 213.91, 195.65, 199.79, 207.35, 224.09, 228.64, 232.68, 215.58, 244.26, 287.48, 297.84, 306.88, 318.72, 325.33, 342.85, 320.09, 355.76, 363.54, 358.05, 326.99], '6M': [161.23, 148.85, 164.4, 170.1, 161.01, 180.56, 176.01, 167.9, 144.67, 143.71, 132.62, 124.67, 120, 124.71, 126.34, 120.33, 106.33, 129.46, 170.81, 197.54, 194.74, 195.65, 228.64, 297.84, 342.85, 326.99], '1Y': [90.71, 94.34, 93.07, 91.02, 89.62, 90.32, 121.89, 122.23, 131.1, 179.28, 185.85, 179.09, 182.2, 216.1, 231.29, 237.3, 198.8, 220.81, 199.53, 156.31, 164.97, 186.68, 165.49, 144.34, 141.8, 165.19, 175.74, 143.66, 172.62, 170.84, 165.77, 172.14, 176.01, 167.9, 144.67, 143.71, 132.62, 124.67, 120, 119.9, 126.16, 113.61, 117.14, 149.05, 174.05, 197.54, 194.74, 195.65, 228.64, 297.84, 342.85, 326.99] },
      velocityScore: { '1D': 0.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$56B', pe: 222.4, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 1.79, ARTY: 1.63, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 1.7, CHAT: 3.87, AIFD: false, SPRX: 7.15, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'ARM', name: 'ARM Holdings PLC', easyScore: 4, avgWeight: 3.87, proScore: 1.41, coverage: 0.364,
      price: 353.04, weeklyPrices: [408.85, 402.71, 411.83, 393.44, 353.04], weeklyChange: -13.65, sortRank: 0, periodReturns: { '1M': 69, '6M': 149.8, '1Y': 172.5 },
      priceHistory: { '1W': [408.85, 402.71, 411.83, 393.44, 353.04], '1M': [208.84, 237.3, 213.31, 213.27, 212.65, 221.21, 228.5, 209.16, 215.12, 223.15, 256.73, 298.23, 306.51, 321.22, 302.71, 353.29, 408.85, 402.71, 411.83, 393.44, 353.04], '6M': [141.31, 130.89, 114.03, 110.51, 115.53, 107.84, 113.92, 109.96, 104.9, 125.28, 126.93, 129.26, 120.62, 120.1, 128.36, 157.07, 155.07, 149.79, 162.33, 204.61, 210.32, 213.31, 228.5, 298.23, 353.29, 353.04], '1Y': [129.55, 138.62, 145.04, 165.46, 146.88, 144.54, 161.92, 163.17, 137.58, 138.5, 138.91, 137.92, 138.31, 139.14, 153.86, 144.48, 139.8, 156.22, 171.94, 171.5, 170.68, 169.82, 152.38, 139.77, 131.57, 135.01, 139.78, 124.37, 113.29, 110.86, 115.68, 104.99, 113.92, 109.96, 104.9, 125.28, 126.93, 129.26, 120.62, 115.12, 129.82, 154.8, 149.11, 148.93, 166.73, 204.61, 210.32, 213.31, 228.5, 298.23, 353.29, 353.04] },
      velocityScore: { '1D': -5.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$377B', pe: 405.8, revenueGrowth: 20, eps: 0.87, grossMargin: 98, dividendYield: null,
      etfPresence: { AIS: 2.26, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 0.51, CHAT: 4.55, AIFD: false, SPRX: 8.17, AOTG: false },
      tonyNote: 'Arm Holdings is held across Broad Tech and AI ETFs as the CPU architecture licensor embedded in every mobile device and increasingly in AI inference chips and data center CPUs. Revenue grew and the royalty model is high-margin; the weight score reflects consistent institutional positioning as the AI chip design ecosystem expands on Arm cores.',
    },
    {
      ticker: 'COHR', name: 'Coherent Corp', easyScore: 4, avgWeight: 3.83, proScore: 1.39, coverage: 0.364,
      price: 401.86, weeklyPrices: [362.90, 426.89, 417.43, 421.90, 401.86], weeklyChange: 10.73, sortRank: 0, periodReturns: { '1M': 19.7, '6M': 121.1, '1Y': 404.5 },
      priceHistory: { '1W': [362.9, 426.89, 417.43, 421.9, 401.86], '1M': [335.73, 344.67, 319.19, 335.26, 379.69, 403.71, 404.94, 382.45, 362.83, 353.63, 358.5, 378, 377.57, 381.35, 380.18, 361.47, 362.9, 426.89, 417.43, 421.9, 401.86], '6M': [181.79, 178.34, 185.83, 189.02, 194.11, 190.03, 201.46, 221.14, 211, 223.69, 232.48, 250.14, 253.87, 251.41, 257.21, 272.04, 247.8, 284.17, 328, 337.68, 319.71, 319.19, 404.94, 378, 361.47, 401.86], '1Y': [79.65, 80.95, 81.2, 87.23, 88.05, 94.52, 99.88, 100.14, 102.79, 115.44, 93.4, 89.9, 90.47, 98.67, 106.34, 114.6, 107.97, 114.77, 115.13, 120.2, 129.34, 131.96, 154.51, 139.33, 139.51, 163.5, 185.86, 178.45, 190.98, 186.81, 191.62, 184.11, 201.46, 221.14, 211, 223.69, 232.48, 250.14, 253.87, 241.27, 275.57, 243.29, 258.16, 307.5, 345.02, 337.68, 319.71, 319.19, 404.94, 378, 361.47, 401.86] },
      velocityScore: { '1D': 4.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$79B', pe: 190.5, revenueGrowth: 21, eps: 2.11, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 0.99, ARTY: false, BAI: false, IVEP: 4.31, IGPT: false, IVES: false, ALAI: false, CHAT: 1.02, AIFD: false, SPRX: 9, AOTG: false },
      tonyNote: 'Coherent Corp appears in 4 of 11 AI & ML ETFs (36% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 5, avgWeight: 2.94, proScore: 1.33, coverage: 0.455,
      price: 306.3, weeklyPrices: [323.39, 334.49, 331.44, 323.92, 306.30], weeklyChange: -5.29, sortRank: 0, periodReturns: { '1M': -10.2, '6M': 62, '1Y': 172.9 },
      priceHistory: { '1W': [323.39, 334.49, 331.44, 323.92, 306.3], '1M': [341.02, 358.92, 340.01, 339.97, 367.92, 369.99, 376.23, 370.94, 339.73, 322.63, 315.67, 323.4, 327.46, 323.91, 319.78, 315.71, 323.39, 334.49, 331.44, 323.92, 306.3], '6M': [189.02, 161.27, 159.82, 165.62, 174.95, 172.72, 181.47, 193.76, 182.56, 248.51, 243.06, 259.23, 249.75, 268.26, 264.71, 276.16, 259.37, 287.64, 294.13, 321.75, 328.49, 340.01, 376.23, 323.4, 315.71, 306.3], '1Y': [112.22, 114.5, 118.54, 127.16, 126.26, 124.72, 126.21, 137.47, 141.59, 139.93, 133.07, 125.97, 127.55, 121.82, 138.26, 151.96, 143.31, 162.8, 179, 175.73, 186.06, 192.86, 179.8, 170.97, 159.83, 179.22, 185.61, 161.74, 166.25, 164.34, 171.54, 170.86, 181.47, 193.76, 182.56, 248.51, 243.06, 259.23, 249.75, 265.38, 269.17, 252.4, 261.29, 295.11, 307.34, 321.75, 328.49, 340.01, 376.23, 323.4, 315.71, 306.3] },
      velocityScore: { '1D': -0.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$118B', pe: 77, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.67, ARTY: false, BAI: 1.97, IVEP: 4.11, IGPT: false, IVES: false, ALAI: false, CHAT: 0.85, AIFD: 4.08, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 4, avgWeight: 3.5, proScore: 1.27, coverage: 0.364,
      price: 906.49, weeklyPrices: [905.00, 1029.15, 938.00, 945.08, 906.49], weeklyChange: 0.16, sortRank: 0, periodReturns: { '1M': -8.9, '6M': 173.5, '1Y': 1010.4 },
      priceHistory: { '1W': [905, 1029.15, 938, 945.08, 906.49], '1M': [994.56, 944.28, 892.58, 903.8, 1053.09, 1030.37, 1001.81, 970.7, 884.98, 890.09, 868.07, 964.5, 946.9, 910.81, 902.31, 854.96, 905, 1029.15, 938, 945.08, 906.49], '6M': [331.41, 324.35, 371.43, 372.61, 397.42, 361.33, 362.44, 385, 465.54, 574.11, 635.64, 677, 650.82, 672, 700.81, 777.17, 764.65, 894.13, 891.22, 846.89, 902.32, 892.58, 1001.81, 964.5, 854.96, 906.49], '1Y': [81.64, 85.5, 89.66, 94.75, 91.08, 92.24, 103.84, 104.52, 106.68, 116.27, 115.86, 119.34, 132.81, 149.4, 168.77, 164.71, 162.58, 160.6, 160.56, 161, 179.3, 201.56, 240.11, 232.15, 255.59, 317.93, 342.56, 334.69, 389.88, 371.18, 392.88, 331.62, 362.44, 385, 465.54, 574.11, 635.64, 677, 650.82, 616.09, 772.13, 688.8, 826.88, 897.3, 894.07, 846.89, 902.32, 892.58, 1001.81, 964.5, 854.96, 906.49] },
      velocityScore: { '1D': -0.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$71B', pe: 159.9, revenueGrowth: 90, eps: 5.67, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.98, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.07, AIFD: 6.08, SPRX: 3.86, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 4 of 11 AI & ML ETFs (36% coverage) with average weight 3.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 4, avgWeight: 3.47, proScore: 1.26, coverage: 0.364,
      price: 216.31, weeklyPrices: [248.15, 244.58, 230.33, 236.34, 216.31], weeklyChange: -12.83, sortRank: 0, periodReturns: { '1M': 16.7, '6M': -0.6, '1Y': 26.4 },
      priceHistory: { '1W': [248.15, 244.58, 230.33, 236.34, 216.31], '1M': [185.35, 194.03, 194.59, 195.95, 193.84, 189.76, 195.61, 192.95, 186.61, 181.46, 188.16, 189.77, 192.08, 193.06, 190.96, 225.78, 248.15, 244.58, 230.33, 236.34, 216.31], '6M': [217.58, 189.97, 191.97, 195.38, 193.75, 202.29, 173.88, 172.8, 146.67, 157.16, 156.54, 150.31, 154.79, 163.12, 152.9, 146.02, 145.23, 137.86, 178.34, 176.28, 161.39, 194.59, 195.61, 189.77, 225.78, 216.31], '1Y': [171.14, 199.86, 205.17, 210.24, 232.26, 229.28, 243.54, 245.12, 244.42, 250.05, 248.28, 236.37, 226.13, 238.48, 302.14, 328.15, 282.76, 291.59, 308.01, 277.18, 283.33, 262.61, 239.26, 222.85, 198.76, 200.94, 220.54, 184.92, 198.38, 197.21, 192.84, 193.61, 173.88, 172.8, 146.67, 157.16, 156.54, 150.31, 154.79, 159.16, 155.52, 142.81, 146.38, 138.09, 175.06, 176.28, 161.39, 194.59, 195.61, 189.77, 225.78, 216.31] },
      velocityScore: { '1D': 1.6, '1W': -37.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$622B', pe: 38.8, revenueGrowth: 22, eps: 5.58, grossMargin: 67, dividendYield: 0.85,
      etfPresence: { AIS: false, ARTY: 4.37, BAI: false, IVEP: false, IGPT: false, IVES: 4.44, ALAI: false, CHAT: 1.72, AIFD: false, SPRX: false, AOTG: 3.34 },
      tonyNote: 'Oracle lands in 3 AI ETFs on the strength of its cloud database and AI infrastructure contracts. Revenue grew 22%, 67% gross margin, P/E of 40x. The 17.5% weekly return following a major earnings beat shows how quickly sentiment can reprice; the weight score at 2.04% is still modest, meaning ETF managers have started building positions but conviction is not yet deep.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 6, avgWeight: 2.26, proScore: 1.23, coverage: 0.545,
      price: 533.57, weeklyPrices: [546.20, 563.10, 594.11, 575.50, 533.57], weeklyChange: -2.31, sortRank: 0, periodReturns: { '1M': 14.7, '6M': 215.9, '1Y': 869.2 },
      priceHistory: { '1W': [546.2, 563.1, 594.11, 575.5, 533.57], '1M': [465.26, 483.15, 463.91, 480, 515.83, 494.09, 489.15, 482.02, 458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.21, 546.2, 563.1, 594.11, 575.5, 533.57], '6M': [168.89, 176.34, 181.08, 179.68, 219.38, 214, 241.9, 279.7, 269.41, 273.74, 284.67, 282.25, 259.03, 268.81, 304.9, 296.14, 297.73, 337.88, 361.69, 403.12, 434.52, 463.91, 489.15, 486.46, 531.21, 533.57], '1Y': [55.05, 55.78, 59.29, 63.29, 65.22, 66.93, 68.74, 68.82, 76.55, 74.97, 75.06, 76.97, 80.34, 93.29, 102.39, 112.41, 116.74, 125.28, 118.86, 121.53, 129.43, 150.21, 162.96, 157.83, 139.19, 163.54, 169.78, 172.04, 176.76, 176.06, 199.88, 215, 241.9, 279.7, 269.41, 273.74, 284.67, 282.25, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 403.12, 434.52, 463.91, 489.15, 486.46, 531.21, 533.57] },
      velocityScore: { '1D': -2.4, '1W': -40.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$184B', pe: 32, revenueGrowth: 46, eps: 16.69, grossMargin: 45, dividendYield: 0.1,
      etfPresence: { AIS: 1.55, ARTY: 2.7, BAI: 3, IVEP: false, IGPT: false, IVES: false, ALAI: 4.46, CHAT: 1.19, AIFD: false, SPRX: false, AOTG: 0.68 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 3, avgWeight: 4.04, proScore: 1.1, coverage: 0.273,
      price: 102.94, weeklyPrices: [109.33, 107.93, 112.71, 111.78, 102.94], weeklyChange: -5.84, sortRank: 0, periodReturns: { '1M': -4.8, '6M': 148.6, '1Y': 415 },
      priceHistory: { '1W': [109.33, 107.93, 112.71, 111.78, 102.94], '1M': [108.15, 113.01, 109.62, 124.92, 129.44, 120.29, 115.93, 108.77, 108.17, 110.8, 118.96, 118.5, 119.84, 123.52, 121.77, 114.68, 109.33, 107.93, 112.71, 111.78, 102.94], '6M': [41.41, 37.81, 36.82, 36.68, 40.04, 47.29, 54.25, 48.78, 48.6, 48.29, 44.62, 45.46, 45.95, 47.98, 45.03, 47.18, 48.03, 61.72, 68.5, 66.78, 94.48, 109.62, 115.93, 118.5, 114.68, 102.94], '1Y': [19.99, 20.77, 21.08, 22.69, 22, 23.3, 23.26, 20.7, 19.31, 19.95, 24.56, 24.8, 24.35, 24.48, 24.77, 28.76, 34.48, 36.59, 37.22, 38.1, 38.28, 39.99, 38.13, 35.52, 34.5, 40.01, 40.3, 37.51, 36.37, 37.3, 42.63, 48.72, 54.25, 48.78, 48.6, 48.29, 44.62, 45.46, 45.95, 45.25, 46.18, 44.1, 50.38, 62.38, 68.5, 66.78, 94.48, 109.62, 115.93, 118.5, 114.68, 102.94] },
      velocityScore: { '1D': 0.9, '1W': -59.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$517B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 2.93, ARTY: false, BAI: 2.72, IVEP: false, IGPT: 6.46, IVES: false, ALAI: false, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'NBIS', name: 'NEBIUS GROUP NV', easyScore: 4, avgWeight: 2.96, proScore: 1.08, coverage: 0.364,
      price: 228, weeklyPrices: [264.51, 260.58, 251.68, 259.67, 228.00], weeklyChange: -13.8, sortRank: 0, periodReturns: { '1M': 29.6, '6M': 132.6, '1Y': 392.4 },
      priceHistory: { '1W': [264.51, 260.58, 251.68, 259.67, 228], '1M': [175.92, 195.09, 184.77, 177.05, 186.1, 207.27, 221.15, 219.94, 199.86, 197.73, 191.82, 219.93, 214.77, 208.06, 208.37, 231.09, 264.51, 260.58, 251.68, 259.67, 228], '6M': [98.04, 87.69, 89.46, 86.04, 100.24, 105.43, 98.87, 100.43, 82.39, 88.61, 107.61, 104.88, 95.65, 112, 118.56, 115.09, 101.95, 136.33, 165.34, 157.08, 138.23, 184.77, 221.15, 219.93, 231.09, 228], '1Y': [46.3, 50.28, 47.97, 51.84, 47.84, 51.95, 52.37, 51.37, 52, 68.78, 71.62, 68.98, 68.32, 64.06, 90.96, 106.6, 110.22, 124.94, 135.46, 109, 117.26, 130.82, 111.28, 83.54, 83.26, 100.15, 100.33, 81.14, 93.23, 85.17, 96.21, 101.98, 98.87, 100.43, 82.39, 88.61, 107.61, 104.88, 95.65, 108.04, 121.52, 105.97, 108.82, 144.97, 157.14, 157.08, 138.23, 184.77, 221.15, 219.93, 231.09, 228] },
      velocityScore: { '1D': 2.9, '1W': -50.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$58B', pe: 87.7, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 2.62, ALAI: 4.5, CHAT: 2.99, AIFD: 1.74, SPRX: false, AOTG: false },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 6.07, proScore: 6.07, coverage: 1,
      price: 914.51, weeklyPrices: [1035.50, 1064.10, 1079.57, 996.00, 914.51], weeklyChange: -11.68, sortRank: 0, periodReturns: { '1M': 42.8, '6M': 285.5, '1Y': 760.4 },
      priceHistory: { '1W': [1035.5, 1064.1, 1079.57, 996, 914.51], '1M': [640.2, 666.59, 646.63, 746.81, 795.33, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 971, 1035.5, 1064.1, 1079.57, 996, 914.51], '6M': [237.22, 241.14, 265.92, 294.37, 343.43, 338.13, 389.11, 435.28, 379.4, 410.34, 417.35, 415.56, 397.05, 418.69, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 776.01, 762.1, 971, 914.51], '1Y': [106.29, 116.18, 123.6, 124.76, 119.92, 118.61, 113.23, 111.26, 104.88, 118.89, 120.87, 117.68, 119.01, 131.46, 157.77, 164.62, 163.9, 190.96, 192.77, 206.77, 219.02, 223.77, 237.92, 246.83, 207.37, 240.46, 246.92, 237.5, 276.59, 292.63, 339.55, 333.35, 389.11, 435.28, 379.4, 410.34, 417.35, 415.56, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 481.72, 517.16, 646.63, 776.01, 762.1, 971, 914.51] },
      velocityScore: { '1D': -6.2, '1W': -6.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.0T', pe: 43.1, revenueGrowth: 196, eps: 21.21, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { SOXX: 11.26, PSI: 5.59, XSD: 3.36, DRAM: 4.06 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.97, proScore: 4.48, coverage: 0.75,
      price: 478.76, weeklyPrices: [510.13, 521.54, 542.52, 523.20, 478.76], weeklyChange: -6.15, sortRank: 0, periodReturns: { '1M': 34.8, '6M': 119.6, '1Y': 313.8 },
      priceHistory: { '1W': [510.13, 521.54, 542.52, 523.2, 478.76], '1M': [355.26, 421.39, 408.46, 455.19, 458.79, 445.5, 449.7, 424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 516.1, 510.13, 521.54, 542.52, 523.2, 478.76], '6M': [217.97, 210.78, 213.43, 215.61, 214.35, 220.97, 249.8, 252.74, 200.19, 213.58, 203.37, 203.68, 199.45, 204.83, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 354.49, 408.46, 449.7, 449.59, 516.1, 478.76], '1Y': [115.69, 118.5, 128.24, 143.81, 134.8, 146.24, 157, 166.47, 171.7, 172.76, 177.51, 167.76, 162.63, 151.41, 161.16, 159.79, 161.36, 203.71, 216.42, 240.56, 252.92, 256.12, 233.54, 246.81, 203.78, 219.76, 221.11, 207.58, 214.95, 215.34, 210.02, 223.6, 249.8, 252.74, 200.19, 213.58, 203.37, 203.68, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 305.33, 354.49, 408.46, 449.7, 449.59, 516.1, 478.76] },
      velocityScore: { '1D': -2, '1W': -25.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$781B', pe: 160.7, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 9.08, PSI: 5.22, XSD: 3.6, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 6.99, proScore: 3.49, coverage: 0.5,
      price: 286.51, weeklyPrices: [219.43, 290.79, 301.65, 316.43, 286.51], weeklyChange: 30.57, sortRank: 0, periodReturns: { '1M': 69.8, '6M': 189.7, '1Y': 339.7 },
      priceHistory: { '1W': [219.43, 290.79, 301.65, 316.43, 286.51], '1M': [168.75, 172.15, 160.01, 170.13, 170.84, 177.95, 182.58, 176.89, 168.93, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 205, 219.43, 290.79, 301.65, 316.43, 286.51], '6M': [98.91, 84.43, 84.09, 85.76, 88.23, 83.05, 82.55, 83.62, 73.73, 81.34, 79.61, 79.29, 75.68, 90.44, 87.62, 98.45, 106.71, 119.93, 133.37, 165.56, 165.15, 160.01, 182.58, 190.69, 205, 286.51], '1Y': [65.16, 69.64, 73.51, 77.16, 71.55, 72.51, 73.06, 74.21, 74.45, 77.34, 76.19, 73, 62.87, 66, 67.43, 75.53, 82.39, 88.92, 89.39, 85.84, 84.13, 93.74, 90.92, 86.45, 77.45, 91.1, 92, 84.26, 84.8, 86.76, 84.64, 81.21, 82.55, 83.62, 73.73, 81.34, 79.61, 79.29, 75.68, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 165.56, 165.15, 160.01, 182.58, 190.69, 205, 286.51] },
      velocityScore: { '1D': 6.4, '1W': 4.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$251B', pe: 98.5, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.08,
      etfPresence: { SOXX: 9.03, PSI: false, XSD: 4.95, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.52, proScore: 3.39, coverage: 0.75,
      price: 102.94, weeklyPrices: [109.33, 107.93, 112.71, 111.78, 102.94], weeklyChange: -5.84, sortRank: 0, periodReturns: { '1M': -4.8, '6M': 148.6, '1Y': 415 },
      priceHistory: { '1W': [109.33, 107.93, 112.71, 111.78, 102.94], '1M': [108.15, 113.01, 109.62, 124.92, 129.44, 120.29, 115.93, 108.77, 108.17, 110.8, 118.96, 118.5, 119.84, 123.52, 121.77, 114.68, 109.33, 107.93, 112.71, 111.78, 102.94], '6M': [41.41, 37.81, 36.82, 36.68, 40.04, 47.29, 54.25, 48.78, 48.6, 48.29, 44.62, 45.46, 45.95, 47.98, 45.03, 47.18, 48.03, 61.72, 68.5, 66.78, 94.48, 109.62, 115.93, 118.5, 114.68, 102.94], '1Y': [19.99, 20.77, 21.08, 22.69, 22, 23.3, 23.26, 20.7, 19.31, 19.95, 24.56, 24.8, 24.35, 24.48, 24.77, 28.76, 34.48, 36.59, 37.22, 38.1, 38.28, 39.99, 38.13, 35.52, 34.5, 40.01, 40.3, 37.51, 36.37, 37.3, 42.63, 48.72, 54.25, 48.78, 48.6, 48.29, 44.62, 45.46, 45.95, 45.25, 46.18, 44.1, 50.38, 62.38, 68.5, 66.78, 94.48, 109.62, 115.93, 118.5, 114.68, 102.94] },
      velocityScore: { '1D': 0.6, '1W': -5.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$517B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 5.71, PSI: 4.55, XSD: 3.29, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 4.18, proScore: 3.13, coverage: 0.75,
      price: 208.44, weeklyPrices: [224.36, 222.82, 214.75, 218.66, 208.44], weeklyChange: -7.09, sortRank: 0, periodReturns: { '1M': 6.1, '6M': 14.3, '1Y': 48.9 },
      priceHistory: { '1W': [224.36, 222.82, 214.75, 218.66, 208.44], '1M': [196.5, 207.83, 211.5, 215.2, 219.44, 225.83, 235.74, 225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 211.14, 224.36, 222.82, 214.75, 218.66, 208.44], '6M': [182.41, 175.02, 180.99, 188.22, 187.24, 185.81, 183.32, 191.52, 174.19, 190.05, 187.9, 184.89, 183.34, 186.03, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 199.57, 211.5, 235.74, 219.51, 211.14, 208.44], '1Y': [139.99, 145, 143.85, 157.75, 158.24, 164.07, 171.38, 173.5, 173.72, 182.7, 180.45, 177.99, 174.18, 168.31, 177.75, 183.61, 181.85, 185.54, 188.32, 182.64, 186.26, 202.49, 188.15, 190.17, 178.88, 179.92, 185.55, 176.29, 183.69, 187.54, 189.11, 183.14, 183.32, 191.52, 174.19, 190.05, 187.9, 184.89, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 199.64, 199.57, 211.5, 235.74, 219.51, 211.14, 208.44] },
      velocityScore: { '1D': 3.3, '1W': -2.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.0T', pe: 31.9, revenueGrowth: 85, eps: 6.54, grossMargin: 74, dividendYield: 0.46,
      etfPresence: { SOXX: 5.75, PSI: 5.12, XSD: 1.66, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 5.12, proScore: 2.56, coverage: 0.5,
      price: 470.72, weeklyPrices: [458.17, 490.05, 500.77, 501.70, 470.72], weeklyChange: 2.74, sortRank: 0, periodReturns: { '1M': 14.6, '6M': 75.6, '1Y': 186.7 },
      priceHistory: { '1W': [458.17, 490.05, 500.77, 501.7, 470.72], '1M': [410.82, 428.62, 410.64, 435.44, 443.62, 436.61, 440.56, 436.62, 413.57, 406.91, 426.85, 427.36, 432.16, 454.89, 448.25, 450.06, 458.17, 490.05, 500.77, 501.7, 470.72], '6M': [268, 259.21, 256.41, 263.05, 296.01, 304.87, 325.24, 336.75, 297.6, 339.88, 369.83, 375.72, 346.53, 351.07, 349.47, 369.34, 353.8, 397.81, 389.9, 403.91, 394.49, 410.64, 440.56, 427.36, 450.06, 470.72], '1Y': [164.19, 175, 169.46, 183.21, 190.78, 197.1, 192.61, 185.69, 179.99, 184.87, 161.76, 162.49, 160.76, 162.05, 170.93, 200.52, 204.95, 223.91, 219.48, 228.13, 228.75, 233.1, 230.07, 226.01, 224.01, 254.75, 268.16, 261.27, 259.01, 259.97, 292.2, 301.89, 325.24, 336.75, 297.6, 339.88, 369.83, 375.72, 346.53, 337.27, 357.21, 338.55, 348.47, 399.49, 396.94, 403.91, 394.49, 410.64, 440.56, 427.36, 450.06, 470.72] },
      velocityScore: { '1D': 1.6, '1W': -12, '1M': null, '6M': null }, isNew: false,
      marketCap: '$374B', pe: 44.2, revenueGrowth: 11, eps: 10.64, grossMargin: 49, dividendYield: 0.42,
      etfPresence: { SOXX: 4.68, PSI: 5.55, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.28, proScore: 2.46, coverage: 0.75,
      price: 411.99, weeklyPrices: [402.69, 423.20, 437.67, 428.76, 411.99], weeklyChange: 2.31, sortRank: 0, periodReturns: { '1M': 1.8, '6M': 46.5, '1Y': 89 },
      priceHistory: { '1W': [402.69, 423.2, 437.67, 428.76, 411.99], '1M': [404.77, 415.63, 408.52, 416.52, 422.73, 432.39, 426.79, 417.49, 418.58, 414.31, 398.05, 384.21, 397.07, 419.94, 416.88, 413.85, 402.69, 423.2, 437.67, 428.76, 411.99], '6M': [281.29, 279.32, 274.44, 275.63, 292.94, 296.21, 304.97, 317.63, 320.44, 337, 345.3, 354.35, 329.72, 319.22, 308.59, 322.03, 320.58, 351.36, 353.8, 403.88, 402.26, 408.52, 426.79, 384.21, 413.85, 411.99], '1Y': [218.04, 232.12, 228.35, 236.96, 241.81, 243.46, 240.48, 227.82, 221.71, 223.95, 231.63, 252.2, 251.31, 248.98, 244.91, 247.34, 244.79, 242.5, 234.67, 246.22, 238.01, 234.13, 228.48, 234.89, 232.32, 266.51, 279.13, 280.44, 275.82, 274.82, 292.89, 297.99, 304.97, 317.63, 320.44, 337, 345.3, 354.35, 329.72, 307.27, 310.44, 313.42, 318.34, 350.14, 371.45, 403.88, 402.26, 408.52, 426.79, 384.21, 413.85, 411.99] },
      velocityScore: { '1D': -0.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$201B', pe: 61.2, revenueGrowth: 37, eps: 6.73, grossMargin: 64, dividendYield: 1.03,
      etfPresence: { SOXX: 2.81, PSI: 5.14, XSD: 1.9, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 4.29, proScore: 2.15, coverage: 0.5,
      price: 316.38, weeklyPrices: [317.12, 334.41, 343.71, 336.41, 316.38], weeklyChange: -0.23, sortRank: 0, periodReturns: { '1M': 14.7, '6M': 99.4, '1Y': 272.6 },
      priceHistory: { '1W': [317.12, 334.41, 343.71, 336.41, 316.38], '1M': [275.8, 297.17, 286.52, 294.05, 296.05, 295.44, 299.15, 284.72, 277.96, 273.38, 292.09, 302.24, 305.35, 322.68, 318.93, 318.18, 317.12, 334.41, 343.71, 336.41, 316.38], '6M': [158.7, 160.52, 172.27, 175.87, 206.96, 214.38, 228.39, 239.58, 209.78, 235.12, 237.39, 239.07, 214.68, 218.87, 224.71, 233.45, 222.01, 258.76, 260.96, 258.56, 257.86, 286.52, 299.15, 302.24, 318.18, 316.38], '1Y': [84.91, 91.66, 90.49, 97.2, 98.14, 99.62, 101.74, 96.96, 96.37, 101.75, 99.51, 100.08, 100.15, 105.07, 119.21, 132.2, 131.09, 149.15, 137.81, 144.05, 151.68, 157.46, 159.35, 148.26, 142.65, 154.79, 162.74, 164.3, 175.26, 173.78, 203.08, 208.79, 228.39, 239.58, 209.78, 235.12, 237.39, 239.07, 214.68, 209.49, 233.99, 211.62, 218.44, 263.66, 267.6, 258.56, 257.86, 286.52, 299.15, 302.24, 318.18, 316.38] },
      velocityScore: { '1D': -0.5, '1W': -18.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$396B', pe: 59.9, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.31,
      etfPresence: { SOXX: 3.35, PSI: 5.24, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 4.29, proScore: 2.15, coverage: 0.5,
      price: 2004.72, weeklyPrices: [1940.04, 2045.20, 2125.11, 2131.10, 2004.72], weeklyChange: 3.33, sortRank: 0, periodReturns: { '1M': 15.7, '6M': 65.1, '1Y': 153.2 },
      priceHistory: { '1W': [1940.04, 2045.2, 2125.11, 2131.1, 2004.72], '1M': [1732.9, 1816.29, 1763.25, 1869.19, 1845.19, 1849.71, 1892.94, 1804.32, 1756.45, 1740.58, 1829.47, 1842.18, 1888.38, 2011.39, 1957.19, 1921.71, 1940.04, 2045.2, 2125.11, 2131.1, 2004.72], '6M': [1214.46, 1193.92, 1245.67, 1260.39, 1395, 1441.82, 1520, 1627.2, 1307.22, 1479.5, 1469.9, 1524.31, 1429.36, 1465, 1482.36, 1543.82, 1519.84, 1727.26, 1734.85, 1815.43, 1750.35, 1763.25, 1892.94, 1842.18, 1921.71, 2004.72], '1Y': [791.89, 875, 850, 889.87, 912.62, 921.84, 937.76, 902.09, 886.64, 914.8, 874.94, 870.28, 872, 908.98, 988.91, 1071.25, 1064.13, 1139.71, 1025, 1152.89, 1182.82, 1208.74, 1193.37, 1134.32, 1097.12, 1157.18, 1224.59, 1225.11, 1265.66, 1243.65, 1359.69, 1434.5, 1520, 1627.2, 1307.22, 1479.5, 1469.9, 1524.31, 1429.36, 1409.57, 1511.52, 1451.13, 1516.84, 1737.28, 1791.44, 1815.43, 1750.35, 1763.25, 1892.94, 1842.18, 1921.71, 2004.72] },
      velocityScore: { '1D': 1.9, '1W': -15.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$262B', pe: 56.7, revenueGrowth: 12, eps: 35.38, grossMargin: 61, dividendYield: 0.43,
      etfPresence: { SOXX: 3.26, PSI: 5.33, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 3.92, proScore: 1.96, coverage: 0.5,
      price: 393.52, weeklyPrices: [459.97, 481.57, 479.23, 418.91, 393.52], weeklyChange: -14.45, sortRank: 0, periodReturns: { '1M': -7.9, '6M': 0.8, '1Y': 51.4 },
      priceHistory: { '1W': [459.97, 481.57, 479.23, 418.91, 393.52], '1M': [427.36, 425.44, 412.56, 430, 428.43, 416.79, 439.79, 425.19, 420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 446.77, 459.97, 481.57, 479.23, 418.91, 393.52], '6M': [390.24, 359.93, 340.36, 349.39, 343.77, 354.61, 328.8, 333.24, 308.05, 342.76, 333.99, 321.7, 332.77, 341.57, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 417.43, 412.56, 439.79, 414.57, 446.77, 393.52], '1Y': [259.93, 256.07, 249.99, 269.35, 274.18, 275.6, 288.21, 290.18, 288.64, 304.97, 306.34, 294, 297.39, 345.65, 364.09, 338.79, 327.9, 335.49, 356.7, 349.24, 354.13, 369.63, 349.43, 342.46, 340.2, 386.08, 401.1, 339.81, 341.45, 349.85, 343.5, 339.89, 328.8, 333.24, 308.05, 342.76, 333.99, 321.7, 332.77, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 419.94, 417.43, 412.56, 439.79, 414.57, 446.77, 393.52] },
      velocityScore: { '1D': -10.9, '1W': -46, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.9T', pe: 65.7, revenueGrowth: 48, eps: 5.99, grossMargin: 76, dividendYield: 0.62,
      etfPresence: { SOXX: 6.11, PSI: false, XSD: 1.73, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 3.26, proScore: 1.63, coverage: 0.5,
      price: 222.29, weeklyPrices: [228.99, 240.84, 250.01, 242.57, 222.29], weeklyChange: -2.92, sortRank: 0, periodReturns: { '1M': 19.2, '6M': 27.2, '1Y': 50.6 },
      priceHistory: { '1W': [228.99, 240.84, 250.01, 242.57, 222.29], '1M': [186.55, 192.57, 202.55, 219.09, 237.53, 213.17, 200.08, 201.49, 203.64, 195.61, 202.51, 213.41, 238.16, 248.82, 233.4, 251.02, 228.99, 240.84, 250.01, 242.57, 222.29], '6M': [174.81, 178.29, 175.25, 173.43, 182.45, 165.29, 156.37, 152.7, 148.89, 141.04, 141.27, 145.59, 137, 134.12, 130.47, 130.35, 127.28, 127.75, 134.47, 133.95, 179.58, 202.55, 200.08, 213.41, 251.02, 222.29], '1Y': [147.56, 158.7, 151.32, 158.54, 158.09, 154.29, 158.97, 158.4, 148.19, 147.56, 157.85, 158.01, 160.73, 160.24, 161.22, 169.72, 165.3, 168.62, 161.78, 167.04, 168.94, 180.9, 170.89, 173.98, 163.3, 168.04, 175.31, 179.26, 174.22, 173.65, 180.19, 164.54, 156.37, 152.7, 148.89, 141.04, 141.27, 145.59, 137, 131.15, 131.28, 130.54, 126.8, 128.06, 136.2, 133.95, 179.58, 202.55, 200.08, 213.41, 251.02, 222.29] },
      velocityScore: { '1D': -1.2, '1W': -32.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$234B', pe: 23.9, revenueGrowth: -4, eps: 9.29, grossMargin: 55, dividendYield: 1.52,
      etfPresence: { SOXX: 3.97, PSI: false, XSD: 2.55, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 3.2, proScore: 1.6, coverage: 0.5,
      price: 326.99, weeklyPrices: [320.09, 355.76, 363.54, 358.05, 326.99], weeklyChange: 2.16, sortRank: 0, periodReturns: { '1M': 51.6, '6M': 102.8, '1Y': 260.5 },
      priceHistory: { '1W': [320.09, 355.76, 363.54, 358.05, 326.99], '1M': [215.69, 213.91, 195.65, 199.79, 207.35, 224.09, 228.64, 232.68, 215.58, 244.26, 287.48, 297.84, 306.88, 318.72, 325.33, 342.85, 320.09, 355.76, 363.54, 358.05, 326.99], '6M': [161.23, 148.85, 164.4, 170.1, 161.01, 180.56, 176.01, 167.9, 144.67, 143.71, 132.62, 124.67, 120, 124.71, 126.34, 120.33, 106.33, 129.46, 170.81, 197.54, 194.74, 195.65, 228.64, 297.84, 342.85, 326.99], '1Y': [90.71, 94.34, 93.07, 91.02, 89.62, 90.32, 121.89, 122.23, 131.1, 179.28, 185.85, 179.09, 182.2, 216.1, 231.29, 237.3, 198.8, 220.81, 199.53, 156.31, 164.97, 186.68, 165.49, 144.34, 141.8, 165.19, 175.74, 143.66, 172.62, 170.84, 165.77, 172.14, 176.01, 167.9, 144.67, 143.71, 132.62, 124.67, 120, 119.9, 126.16, 113.61, 117.14, 149.05, 174.05, 197.54, 194.74, 195.65, 228.64, 297.84, 342.85, 326.99] },
      velocityScore: { '1D': -0.6, '1W': -30.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$56B', pe: 222.4, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.34, PSI: false, XSD: 4.06, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'MXL', name: 'MAXLINEAR INC', easyScore: 1, avgWeight: 6.01, proScore: 1.5, coverage: 0.25,
      price: 83.89, weeklyPrices: [86.23, 88.76, 91.39, 94.21, 83.89], weeklyChange: -2.71, sortRank: 0, periodReturns: { '1M': 2.7, '6M': 345.8, '1Y': 592.8 },
      priceHistory: { '1W': [86.23, 88.76, 91.39, 94.21, 83.89], '1M': [81.68, 81.23, 82.37, 99.83, 102.27, 87.73, 88.78, 92.34, 87.46, 94.86, 96.77, 99.67, 99.16, 96.12, 101.1, 92.93, 86.23, 88.76, 91.39, 94.21, 83.89], '6M': [18.82, 17.41, 17.63, 17.58, 19.57, 18.34, 19.96, 19.14, 17.23, 19.4, 18.24, 17.92, 16.39, 16.9, 16.46, 17.8, 17.69, 19.84, 23.35, 34.25, 70.75, 82.37, 88.78, 99.67, 92.93, 83.89], '1Y': [12.11, 12.34, 13.17, 14.14, 14.32, 14.96, 15.92, 16.36, 15.21, 15.13, 15.29, 16.35, 15.72, 15.86, 16.6, 17.11, 15.95, 16.52, 15.76, 17.64, 15.62, 15.15, 14.76, 13.9, 13.6, 16.08, 19.51, 17.2, 18.05, 17.7, 18.65, 18.08, 19.96, 19.14, 17.23, 19.4, 18.24, 17.92, 16.39, 16.5, 17.1, 17.16, 17.98, 20.69, 26.27, 34.25, 70.75, 82.37, 88.78, 99.67, 92.93, 83.89] },
      velocityScore: { '1D': 3.4, '1W': -73, '1M': null, '6M': null }, isNew: false,
      marketCap: '$8B', pe: null, revenueGrowth: 43, eps: -1.52, grossMargin: 57, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: 6.01, DRAM: false },
      tonyNote: 'MaxLinear holds the highest average weight in the Semiconductor theme at 7.71% across 2 ETFs. Revenue grew 43%, 57% gross margin, but EPS is negative at -$1.52 and the market cap is only $8B. The 716% 1-year return is an extreme recovery from the 2023 inventory correction lows; the two ETFs holding it are making a concentrated bet on a return to profitability in the analog semiconductor cycle.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 2.81, proScore: 1.41, coverage: 0.5,
      price: 121.04, weeklyPrices: [120.92, 128.64, 133.93, 131.82, 121.04], weeklyChange: 0.1, sortRank: 0, periodReturns: { '1M': 17.9, '6M': 121.1, '1Y': 144.3 },
      priceHistory: { '1W': [120.92, 128.64, 133.93, 131.82, 121.04], '1M': [102.67, 105.77, 100.61, 103.2, 107.24, 115.71, 118.37, 113.11, 109.43, 106.02, 110.21, 109.61, 116.2, 127, 124.89, 120.62, 120.92, 128.64, 133.93, 131.82, 121.04], '6M': [54.74, 54.96, 55.21, 54.02, 61.76, 59.41, 63.13, 64.93, 62.06, 71.18, 68.09, 68.16, 60.85, 59.24, 60.46, 63.1, 62.2, 68.49, 79.93, 97.78, 100.81, 100.61, 118.37, 109.61, 120.62, 121.04], '1Y': [49.54, 52.98, 52.82, 52.93, 54.61, 59.07, 60.55, 56.92, 56.82, 47.66, 51.09, 51.85, 49.59, 48.88, 48.11, 51.5, 49.76, 50.35, 50.11, 54.89, 50.71, 50.08, 47.83, 46.92, 46.7, 50.43, 56.38, 55.09, 56.37, 54.24, 61.89, 60.58, 63.13, 64.93, 62.06, 71.18, 68.09, 68.16, 60.85, 57.69, 59.29, 60.87, 62.19, 68.65, 83.01, 97.78, 100.81, 100.61, 118.37, 109.61, 120.62, 121.04] },
      velocityScore: { '1D': 0, '1W': -27.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$47B', pe: 89, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.49, PSI: false, XSD: 3.14, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.79, proScore: 1.4, coverage: 0.5,
      price: 301.4, weeklyPrices: [311.38, 323.62, 321.88, 322.22, 301.40], weeklyChange: -3.21, sortRank: 0, periodReturns: { '1M': 3.1, '6M': 32.2, '1Y': 45.7 },
      priceHistory: { '1W': [311.38, 323.62, 321.88, 322.22, 301.4], '1M': [292.35, 303.55, 290.22, 294.75, 305.99, 298.41, 294.17, 291.5, 291.68, 294.28, 310.15, 299.38, 316.47, 332.67, 329.24, 321.35, 311.38, 323.62, 321.88, 322.22, 301.4], '6M': [227.95, 228.16, 226.27, 220.46, 245.95, 239.09, 233.72, 240.03, 226.86, 249.75, 232.11, 232.23, 210.58, 199.87, 192.69, 197.61, 195.58, 205.67, 213.73, 241.16, 293.59, 290.22, 294.17, 299.38, 321.35, 301.4], '1Y': [206.9, 217.4, 209, 217.04, 226, 224.61, 228.27, 223.29, 209.92, 207.16, 228.78, 234.83, 234.85, 225.5, 219.27, 225.73, 226.11, 231.42, 216.7, 219.82, 219.16, 209.12, 204.56, 197.1, 191.35, 199.49, 229.01, 231.83, 228.94, 219.98, 239.34, 240.81, 233.72, 240.03, 226.86, 249.75, 232.11, 232.23, 210.58, 191.22, 192.35, 196.92, 194.55, 204.37, 216.03, 241.16, 293.59, 290.22, 294.17, 299.38, 321.35, 301.4] },
      velocityScore: { '1D': 2.2, '1W': -33.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$76B', pe: 28.8, revenueGrowth: 12, eps: 10.47, grossMargin: 56, dividendYield: 1.26,
      etfPresence: { SOXX: 3.31, PSI: false, XSD: 2.27, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.77, proScore: 1.39, coverage: 0.5,
      price: 1529.48, weeklyPrices: [1542.39, 1624.99, 1689.89, 1652.60, 1529.48], weeklyChange: -0.84, sortRank: 0, periodReturns: { '1M': -3.7, '6M': 58.8, '1Y': 124.6 },
      priceHistory: { '1W': [1542.39, 1624.99, 1689.89, 1652.6, 1529.48], '1M': [1588.12, 1652.35, 1575.96, 1600.84, 1661.1, 1650.35, 1613.97, 1550.02, 1486.33, 1468.11, 1553.27, 1561.25, 1589.81, 1662.98, 1620.17, 1566.21, 1542.39, 1624.99, 1689.89, 1652.6, 1529.48], '6M': [963.28, 946.51, 937.11, 930.04, 1005.38, 983.28, 1074.93, 1161.78, 1136.83, 1196.73, 1175.22, 1180.13, 1078.44, 1071.09, 1075.29, 1118.66, 1119.51, 1334.21, 1402.81, 1592.17, 1614.41, 1575.96, 1613.97, 1561.25, 1566.21, 1529.48], '1Y': [681.06, 718.57, 685.9, 736.03, 741.17, 721.14, 724.77, 714.68, 785.62, 804.29, 826.47, 844, 835.76, 864.32, 849.71, 922.81, 886.59, 968.1, 981.67, 1031.59, 1074.91, 1005, 958.26, 920.19, 872.35, 928.35, 983.58, 949.4, 945.16, 923.91, 959.08, 983.6, 1074.93, 1161.78, 1136.83, 1196.73, 1175.22, 1180.13, 1078.44, 1033.88, 1092.69, 1058.28, 1118.49, 1353.85, 1468.35, 1592.17, 1614.41, 1575.96, 1613.97, 1561.25, 1566.21, 1529.48] },
      velocityScore: { '1D': 0, '1W': -31.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$75B', pe: 108.9, revenueGrowth: 26, eps: 14.05, grossMargin: 55, dividendYield: 0.48,
      etfPresence: { SOXX: 3.37, PSI: false, XSD: 2.18, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 2.77, proScore: 1.38, coverage: 0.5,
      price: 288.83, weeklyPrices: [293.20, 308.12, 308.59, 305.37, 288.83], weeklyChange: -1.49, sortRank: 0, periodReturns: { '1M': 2.8, '6M': 58.2, '1Y': 51.6 },
      priceHistory: { '1W': [293.2, 308.12, 308.59, 305.37, 288.83], '1M': [281, 289.44, 285.24, 287.8, 297.76, 306.34, 308.17, 302.73, 300.6, 302.31, 304.88, 298.39, 309.21, 324.89, 317.45, 305.68, 293.2, 308.12, 308.59, 305.37, 288.83], '6M': [182.54, 179.42, 176.29, 175.69, 192.1, 188.53, 194.41, 216.17, 222.92, 226.56, 218.05, 212.63, 197.98, 198.67, 190.78, 196.77, 196.3, 214.98, 223.1, 282.23, 281.08, 285.24, 308.17, 298.39, 305.68, 288.83], '1Y': [190.49, 199.66, 198.2, 207.08, 213.41, 220.05, 214.57, 184.99, 180.86, 187.22, 194.57, 206.06, 202.48, 185.82, 178.2, 179.62, 183.23, 181.81, 175.11, 179.59, 169.13, 161.46, 160.55, 159.33, 159.4, 168.16, 180.94, 177.97, 178.82, 175.42, 185.71, 193.45, 194.41, 216.17, 222.92, 226.56, 218.05, 212.63, 197.98, 190.05, 188.29, 193.41, 194.87, 214.73, 229.82, 282.23, 281.08, 285.24, 308.17, 298.39, 305.68, 288.83] },
      velocityScore: { '1D': 0.7, '1W': -55.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$263B', pe: 49.3, revenueGrowth: 19, eps: 5.86, grossMargin: 57, dividendYield: 1.86,
      etfPresence: { SOXX: 3.36, PSI: false, XSD: 2.17, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp/DE', easyScore: 1, avgWeight: 5.1, proScore: 1.27, coverage: 0.25,
      price: 1620.93, weeklyPrices: [1761.43, 1716.36, 1831.50, 1759.68, 1620.93], weeklyChange: -7.98, sortRank: 0, periodReturns: { '1M': 15.3, '6M': 609.5, '1Y': 4043.5 },
      priceHistory: { '1W': [1761.43, 1716.36, 1831.5, 1759.68, 1620.93], '1M': [1406.32, 1409.98, 1339.96, 1562.34, 1547.56, 1447.23, 1382.72, 1407.61, 1333.01, 1383.29, 1392.56, 1542.24, 1478.69, 1589.55, 1589.94, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1620.93], '6M': [228.47, 206.18, 237.61, 244.25, 349.63, 389.81, 501.29, 527.63, 584.55, 599.34, 621.09, 651.9, 565.59, 655.43, 753.69, 677.86, 692.73, 851.57, 919.47, 932.43, 1096.51, 1339.96, 1382.72, 1542.24, 1694.98, 1620.93], '1Y': [39.12, 41.3, 46.58, 47.15, 45.22, 42.48, 41.61, 42.48, 41.33, 44.34, 44.54, 46.37, 52.47, 70.5, 90.09, 102.92, 113.5, 121.17, 134.61, 148.04, 186.16, 199.33, 239.48, 254.16, 200.27, 210.17, 225.47, 201.87, 241.05, 240.22, 353.56, 387.81, 501.29, 527.63, 584.55, 599.34, 621.09, 651.9, 565.59, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 932.43, 1096.51, 1339.96, 1382.72, 1542.24, 1694.98, 1620.93] },
      velocityScore: { '1D': 0, '1W': -50.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$240B', pe: 55.5, revenueGrowth: 251, eps: 29.21, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 5.1 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.26, proScore: 1.13, coverage: 0.5,
      price: 90.99, weeklyPrices: [91.52, 96.96, 96.55, 96.30, 90.99], weeklyChange: -0.58, sortRank: 0, periodReturns: { '1M': -7.6, '6M': 38.3, '1Y': 41.4 },
      priceHistory: { '1W': [91.52, 96.96, 96.55, 96.3, 90.99], '1M': [98.48, 102.92, 101.58, 99.09, 99.03, 96.71, 97.04, 93.85, 92.76, 91.81, 94.02, 91.11, 93.43, 98.05, 96.85, 94.65, 91.52, 96.96, 96.55, 96.3, 90.99], '6M': [65.81, 67.18, 64.91, 64.65, 74.87, 74.07, 76.2, 80.28, 78.23, 80.75, 77.16, 74.97, 67.81, 65.79, 64.71, 65.16, 65.38, 71.22, 76.87, 90.64, 92.91, 101.58, 97.04, 91.11, 94.65, 90.99], '1Y': [64.37, 67.93, 68.97, 70.49, 71.48, 74.05, 73.85, 69.21, 66.36, 61.87, 65.71, 69.14, 65, 65.3, 63.17, 65.4, 64.07, 66.59, 64.39, 67.07, 63.17, 62.42, 56.28, 53.48, 50.9, 53.43, 67.35, 67.18, 66.24, 64.68, 73.94, 74.68, 76.2, 80.28, 78.23, 80.75, 77.16, 74.97, 67.81, 62.73, 63.29, 64.2, 65.6, 71.56, 78.76, 90.64, 92.91, 101.58, 97.04, 91.11, 94.65, 90.99] },
      velocityScore: { '1D': 0.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$49B', pe: 413.6, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 1.89,
      etfPresence: { SOXX: 2.46, PSI: false, XSD: 2.07, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.17, proScore: 1.09, coverage: 0.5,
      price: 216.2, weeklyPrices: [226.10, 229.00, 214.60, 217.50, 216.20], weeklyChange: -4.38, sortRank: 0, periodReturns: { '1M': 11.7, '6M': 22.8, '1Y': 196.2 },
      priceHistory: { '1W': [226.1, 229, 214.6, 217.5, 216.2], '1M': [193.57, 198.29, 188.29, 188.51, 210.22, 189.36, 184.54, 172.17, 156.27, 168.99, 182.98, 193.39, 218.41, 221.64, 221.23, 236.03, 226.1, 229, 214.6, 217.5, 216.2], '6M': [176.04, 143.91, 150.13, 144.7, 132.95, 161.38, 139.16, 129.66, 96.95, 128.4, 130.66, 114.48, 114.74, 115.91, 101.72, 103.91, 95.92, 107.93, 158.93, 185.54, 174.01, 188.29, 184.54, 193.39, 236.03, 216.2], '1Y': [73, 74.34, 85.51, 93.49, 92.73, 98.7, 95.74, 101.22, 107.56, 120.41, 116.74, 114.04, 123.06, 147.53, 163.98, 164.1, 146.01, 147.42, 149.9, 151.66, 155.55, 187.62, 163.61, 145.52, 133.49, 171.13, 178.94, 142.02, 149.94, 144.92, 141, 156.84, 139.16, 129.66, 96.95, 128.4, 130.66, 114.48, 114.74, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 185.54, 174.01, 188.29, 184.54, 193.39, 236.03, 216.2] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$40B', pe: 118.1, revenueGrowth: 157, eps: 1.83, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 1.69, PSI: false, XSD: 2.65, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 7, avgWeight: 4.64, proScore: 2.5, coverage: 0.538,
      price: 914.51, weeklyPrices: [1035.50, 1064.10, 1079.57, 996.00, 914.51], weeklyChange: -11.68, sortRank: 0, periodReturns: { '1M': 42.8, '6M': 285.5, '1Y': 760.4 },
      priceHistory: { '1W': [1035.5, 1064.1, 1079.57, 996, 914.51], '1M': [640.2, 666.59, 646.63, 746.81, 795.33, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 971, 1035.5, 1064.1, 1079.57, 996, 914.51], '6M': [237.22, 241.14, 265.92, 294.37, 343.43, 338.13, 389.11, 435.28, 379.4, 410.34, 417.35, 415.56, 397.05, 418.69, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 776.01, 762.1, 971, 914.51], '1Y': [106.29, 116.18, 123.6, 124.76, 119.92, 118.61, 113.23, 111.26, 104.88, 118.89, 120.87, 117.68, 119.01, 131.46, 157.77, 164.62, 163.9, 190.96, 192.77, 206.77, 219.02, 223.77, 237.92, 246.83, 207.37, 240.46, 246.92, 237.5, 276.59, 292.63, 339.55, 333.35, 389.11, 435.28, 379.4, 410.34, 417.35, 415.56, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 481.72, 517.16, 646.63, 776.01, 762.1, 971, 914.51] },
      velocityScore: { '1D': -2.3, '1W': -7.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.0T', pe: 43.1, revenueGrowth: 196, eps: 21.21, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { PTF: 4.7, WCLD: false, IGV: false, FDTX: 9.36, GTEK: false, ARKK: false, MARS: false, FRWD: 4.76, BCTK: 4.77, FWD: 1.43, CBSE: 3.04, FCUS: 4.45, WGMI: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 7, avgWeight: 4.23, proScore: 2.28, coverage: 0.538,
      price: 208.44, weeklyPrices: [224.36, 222.82, 214.75, 218.66, 208.44], weeklyChange: -7.09, sortRank: 0, periodReturns: { '1M': 6.1, '6M': 14.3, '1Y': 48.9 },
      priceHistory: { '1W': [224.36, 222.82, 214.75, 218.66, 208.44], '1M': [196.5, 207.83, 211.5, 215.2, 219.44, 225.83, 235.74, 225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 211.14, 224.36, 222.82, 214.75, 218.66, 208.44], '6M': [182.41, 175.02, 180.99, 188.22, 187.24, 185.81, 183.32, 191.52, 174.19, 190.05, 187.9, 184.89, 183.34, 186.03, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 199.57, 211.5, 235.74, 219.51, 211.14, 208.44], '1Y': [139.99, 145, 143.85, 157.75, 158.24, 164.07, 171.38, 173.5, 173.72, 182.7, 180.45, 177.99, 174.18, 168.31, 177.75, 183.61, 181.85, 185.54, 188.32, 182.64, 186.26, 202.49, 188.15, 190.17, 178.88, 179.92, 185.55, 176.29, 183.69, 187.54, 189.11, 183.14, 183.32, 191.52, 174.19, 190.05, 187.9, 184.89, 183.34, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 199.64, 199.57, 211.5, 235.74, 219.51, 211.14, 208.44] },
      velocityScore: { '1D': -0.4, '1W': -52, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.0T', pe: 31.9, revenueGrowth: 85, eps: 6.54, grossMargin: 74, dividendYield: 0.46,
      etfPresence: { PTF: 4.4, WCLD: false, IGV: false, FDTX: 4.62, GTEK: false, ARKK: 1.73, MARS: false, FRWD: 8.12, BCTK: 6.58, FWD: 2.07, CBSE: false, FCUS: false, WGMI: 2.06 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 6, avgWeight: 4.3, proScore: 1.99, coverage: 0.462,
      price: 877.59, weeklyPrices: [921.26, 926.61, 940.69, 925.99, 877.59], weeklyChange: -4.74, sortRank: 0, periodReturns: { '1M': 13.8, '6M': 214.8, '1Y': 587.2 },
      priceHistory: { '1W': [921.26, 926.61, 940.69, 925.99, 877.59], '1M': [771.01, 786.42, 766.44, 782.64, 834.01, 817.35, 804.76, 795.47, 740.84, 733.35, 751.07, 810.46, 812.73, 845.76, 870.66, 879.8, 921.26, 926.61, 940.69, 925.99, 877.59], '6M': [278.79, 287.64, 296.36, 281.3, 330.42, 318.44, 344.22, 442.93, 418.63, 407.25, 408.97, 409.67, 367.34, 385.97, 406.77, 413.22, 423.12, 500.77, 531.81, 587.62, 673.64, 766.44, 804.76, 810.46, 879.8, 877.59], '1Y': [127.7, 126.07, 130.96, 141.44, 148.39, 149.08, 149.63, 150.89, 154.81, 150.45, 154.43, 159.21, 167.4, 189.24, 211.12, 229.33, 229.14, 242.83, 219.51, 214.4, 234.12, 255.88, 279.35, 258.21, 237.49, 270.1, 285.41, 285.58, 282.85, 280.08, 308.26, 312.28, 344.22, 442.93, 418.63, 407.25, 408.97, 409.67, 367.34, 373.98, 434.6, 378.79, 429.36, 503.13, 547.75, 587.62, 673.64, 766.44, 804.76, 810.46, 879.8, 877.59] },
      velocityScore: { '1D': -0.5, '1W': -15.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$199B', pe: 83.1, revenueGrowth: 44, eps: 10.56, grossMargin: 42, dividendYield: 0.32,
      etfPresence: { PTF: 4.71, WCLD: false, IGV: false, FDTX: 4.04, GTEK: false, ARKK: false, MARS: false, FRWD: 9.01, BCTK: false, FWD: 1.09, CBSE: 2.76, FCUS: 4.22, WGMI: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 5, avgWeight: 4.38, proScore: 1.68, coverage: 0.385,
      price: 422.15, weeklyPrices: [435.63, 446.69, 436.69, 444.92, 422.15], weeklyChange: -3.09, sortRank: 0, periodReturns: { '1M': 7, '6M': 43.2, '1Y': 107.6 },
      priceHistory: { '1W': [435.63, 446.69, 436.69, 444.92, 422.15], '1M': [394.41, 419.5, 414.15, 411.68, 404.54, 399.8, 417.72, 404.35, 395.95, 392.61, 401.62, 407.15, 404.52, 412.32, 422.73, 418.45, 435.63, 446.69, 436.69, 444.92, 422.15], '6M': [294.72, 292.04, 288.95, 300.92, 327.43, 331.21, 326.12, 342.3, 325.74, 374.09, 360.39, 376.81, 353.86, 354.56, 339.57, 347.75, 341.49, 365.49, 363.35, 382.66, 396.06, 414.15, 417.72, 407.15, 418.45, 422.15], '1Y': [203.34, 215.43, 209.51, 228.57, 229.17, 228.67, 238.85, 245.6, 235.21, 241.83, 238.88, 232.99, 230.87, 247.19, 261.38, 272.63, 273.23, 302.4, 302.89, 297.7, 294.96, 300.43, 286.5, 284.82, 275.06, 287.68, 301.87, 287.74, 293.28, 299.58, 318.68, 327.11, 326.12, 342.3, 325.74, 374.09, 360.39, 376.81, 353.86, 336.71, 338.79, 326.11, 339.04, 370.6, 370.5, 382.66, 396.06, 414.15, 417.72, 407.15, 418.45, 422.15] },
      velocityScore: { '1D': -10.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.2T', pe: 36.1, revenueGrowth: 35, eps: 11.7, grossMargin: 62, dividendYield: 0.85,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6, GTEK: false, ARKK: 0.99, MARS: false, FRWD: 5.84, BCTK: 8.48, FWD: false, CBSE: false, FCUS: false, WGMI: 0.58 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 4, avgWeight: 4.7, proScore: 1.44, coverage: 0.308,
      price: 478.76, weeklyPrices: [510.13, 521.54, 542.52, 523.20, 478.76], weeklyChange: -6.15, sortRank: 0, periodReturns: { '1M': 34.8, '6M': 119.6, '1Y': 313.8 },
      priceHistory: { '1W': [510.13, 521.54, 542.52, 523.2, 478.76], '1M': [355.26, 421.39, 408.46, 455.19, 458.79, 445.5, 449.7, 424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 516.1, 510.13, 521.54, 542.52, 523.2, 478.76], '6M': [217.97, 210.78, 213.43, 215.61, 214.35, 220.97, 249.8, 252.74, 200.19, 213.58, 203.37, 203.68, 199.45, 204.83, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 354.49, 408.46, 449.7, 449.59, 516.1, 478.76], '1Y': [115.69, 118.5, 128.24, 143.81, 134.8, 146.24, 157, 166.47, 171.7, 172.76, 177.51, 167.76, 162.63, 151.41, 161.16, 159.79, 161.36, 203.71, 216.42, 240.56, 252.92, 256.12, 233.54, 246.81, 203.78, 219.76, 221.11, 207.58, 214.95, 215.34, 210.02, 223.6, 249.8, 252.74, 200.19, 213.58, 203.37, 203.68, 199.45, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 305.33, 354.49, 408.46, 449.7, 449.59, 516.1, 478.76] },
      velocityScore: { '1D': -1.4, '1W': -52.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$781B', pe: 160.7, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.88, MARS: false, FRWD: 7.55, BCTK: 3.74, FWD: 2.61, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 5, avgWeight: 3.67, proScore: 1.41, coverage: 0.385,
      price: 393.52, weeklyPrices: [459.97, 481.57, 479.23, 418.91, 393.52], weeklyChange: -14.45, sortRank: 0, periodReturns: { '1M': -7.9, '6M': 0.8, '1Y': 51.4 },
      priceHistory: { '1W': [459.97, 481.57, 479.23, 418.91, 393.52], '1M': [427.36, 425.44, 412.56, 430, 428.43, 416.79, 439.79, 425.19, 420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 446.77, 459.97, 481.57, 479.23, 418.91, 393.52], '6M': [390.24, 359.93, 340.36, 349.39, 343.77, 354.61, 328.8, 333.24, 308.05, 342.76, 333.99, 321.7, 332.77, 341.57, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 417.43, 412.56, 439.79, 414.57, 446.77, 393.52], '1Y': [259.93, 256.07, 249.99, 269.35, 274.18, 275.6, 288.21, 290.18, 288.64, 304.97, 306.34, 294, 297.39, 345.65, 364.09, 338.79, 327.9, 335.49, 356.7, 349.24, 354.13, 369.63, 349.43, 342.46, 340.2, 386.08, 401.1, 339.81, 341.45, 349.85, 343.5, 339.89, 328.8, 333.24, 308.05, 342.76, 333.99, 321.7, 332.77, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 419.94, 417.43, 412.56, 439.79, 414.57, 446.77, 393.52] },
      velocityScore: { '1D': 2.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.9T', pe: 65.7, revenueGrowth: 48, eps: 5.99, grossMargin: 76, dividendYield: 0.62,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.79, GTEK: false, ARKK: 1.19, MARS: false, FRWD: 4.79, BCTK: 8.49, FWD: 3.07, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 4, avgWeight: 4.58, proScore: 1.41, coverage: 0.308,
      price: 533.57, weeklyPrices: [546.20, 563.10, 594.11, 575.50, 533.57], weeklyChange: -2.31, sortRank: 0, periodReturns: { '1M': 14.7, '6M': 215.9, '1Y': 869.2 },
      priceHistory: { '1W': [546.2, 563.1, 594.11, 575.5, 533.57], '1M': [465.26, 483.15, 463.91, 480, 515.83, 494.09, 489.15, 482.02, 458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.21, 546.2, 563.1, 594.11, 575.5, 533.57], '6M': [168.89, 176.34, 181.08, 179.68, 219.38, 214, 241.9, 279.7, 269.41, 273.74, 284.67, 282.25, 259.03, 268.81, 304.9, 296.14, 297.73, 337.88, 361.69, 403.12, 434.52, 463.91, 489.15, 486.46, 531.21, 533.57], '1Y': [55.05, 55.78, 59.29, 63.29, 65.22, 66.93, 68.74, 68.82, 76.55, 74.97, 75.06, 76.97, 80.34, 93.29, 102.39, 112.41, 116.74, 125.28, 118.86, 121.53, 129.43, 150.21, 162.96, 157.83, 139.19, 163.54, 169.78, 172.04, 176.76, 176.06, 199.88, 215, 241.9, 279.7, 269.41, 273.74, 284.67, 282.25, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 403.12, 434.52, 463.91, 489.15, 486.46, 531.21, 533.57] },
      velocityScore: { '1D': 0, '1W': -36.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$184B', pe: 32, revenueGrowth: 46, eps: 16.69, grossMargin: 45, dividendYield: 0.1,
      etfPresence: { PTF: 4.8, WCLD: false, IGV: false, FDTX: 4, GTEK: false, ARKK: false, MARS: false, FRWD: 5.22, BCTK: false, FWD: false, CBSE: false, FCUS: 4.29, WGMI: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 4, avgWeight: 4.15, proScore: 1.28, coverage: 0.308,
      price: 316.38, weeklyPrices: [317.12, 334.41, 343.71, 336.41, 316.38], weeklyChange: -0.23, sortRank: 0, periodReturns: { '1M': 14.7, '6M': 99.4, '1Y': 272.6 },
      priceHistory: { '1W': [317.12, 334.41, 343.71, 336.41, 316.38], '1M': [275.8, 297.17, 286.52, 294.05, 296.05, 295.44, 299.15, 284.72, 277.96, 273.38, 292.09, 302.24, 305.35, 322.68, 318.93, 318.18, 317.12, 334.41, 343.71, 336.41, 316.38], '6M': [158.7, 160.52, 172.27, 175.87, 206.96, 214.38, 228.39, 239.58, 209.78, 235.12, 237.39, 239.07, 214.68, 218.87, 224.71, 233.45, 222.01, 258.76, 260.96, 258.56, 257.86, 286.52, 299.15, 302.24, 318.18, 316.38], '1Y': [84.91, 91.66, 90.49, 97.2, 98.14, 99.62, 101.74, 96.96, 96.37, 101.75, 99.51, 100.08, 100.15, 105.07, 119.21, 132.2, 131.09, 149.15, 137.81, 144.05, 151.68, 157.46, 159.35, 148.26, 142.65, 154.79, 162.74, 164.3, 175.26, 173.78, 203.08, 208.79, 228.39, 239.58, 209.78, 235.12, 237.39, 239.07, 214.68, 209.49, 233.99, 211.62, 218.44, 263.66, 267.6, 258.56, 257.86, 286.52, 299.15, 302.24, 318.18, 316.38] },
      velocityScore: { '1D': 4.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$396B', pe: 59.9, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.31,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.67, BCTK: 6.61, FWD: 1.63, CBSE: 2.68, FCUS: false, WGMI: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'CIFR', name: 'CIPHER DIGITAL INC', easyScore: 2, avgWeight: 8.29, proScore: 1.28, coverage: 0.154,
      price: 22.3, weeklyPrices: [24.01, 26.29, 26.24, 25.55, 22.30], weeklyChange: -7.14, sortRank: 0, periodReturns: { '1M': 0.9, '6M': 15.6, '1Y': 531.6 },
      priceHistory: { '1W': [24.01, 26.29, 26.24, 25.55, 22.3], '1M': [22.1, 21.91, 20.68, 20.55, 20.28, 21.24, 22.29, 20.33, 19.12, 18.8, 19.48, 21.52, 21.97, 23.02, 25.16, 23.65, 24.01, 26.29, 26.24, 25.55, 22.3], '6M': [19.28, 17.05, 16.21, 15.08, 17.54, 18.25, 17.72, 18.97, 14.25, 16.28, 15.8, 16.48, 15.15, 14.11, 14.67, 15.88, 12.64, 16.36, 17.34, 18.69, 17.74, 20.68, 22.29, 21.52, 23.65, 22.3], '1Y': [3.53, 3.84, 3.79, 4.26, 5.79, 6.03, 6.25, 6.47, 4.93, 4.75, 5.21, 6.38, 7.64, 7.72, 10.85, 13.96, 12.65, 15.34, 20.34, 19.91, 20.66, 18.65, 20.69, 14.36, 14.15, 19.69, 19.48, 14.74, 16.34, 14.59, 16.08, 18.13, 17.72, 18.97, 14.25, 16.28, 15.8, 16.48, 15.15, 13.71, 14.64, 14.35, 12.82, 16.53, 19.37, 18.69, 17.74, 20.68, 22.29, 21.52, 23.65, 22.3] },
      velocityScore: { '1D': 8.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: -29, eps: -2.32, grossMargin: 12, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 0.26, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: 16.33 },
      tonyNote: 'CIPHER DIGITAL INC appears in 2 of 13 Broad Tech ETFs (15% coverage) with average weight 8.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'Marvell Technology Inc', easyScore: 3, avgWeight: 5.48, proScore: 1.26, coverage: 0.231,
      price: 286.51, weeklyPrices: [219.43, 290.79, 301.65, 316.43, 286.51], weeklyChange: 30.57, sortRank: 0, periodReturns: { '1M': 69.8, '6M': 189.7, '1Y': 339.7 },
      priceHistory: { '1W': [219.43, 290.79, 301.65, 316.43, 286.51], '1M': [168.75, 172.15, 160.01, 170.13, 170.84, 177.95, 182.58, 176.89, 168.93, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 205, 219.43, 290.79, 301.65, 316.43, 286.51], '6M': [98.91, 84.43, 84.09, 85.76, 88.23, 83.05, 82.55, 83.62, 73.73, 81.34, 79.61, 79.29, 75.68, 90.44, 87.62, 98.45, 106.71, 119.93, 133.37, 165.56, 165.15, 160.01, 182.58, 190.69, 205, 286.51], '1Y': [65.16, 69.64, 73.51, 77.16, 71.55, 72.51, 73.06, 74.21, 74.45, 77.34, 76.19, 73, 62.87, 66, 67.43, 75.53, 82.39, 88.92, 89.39, 85.84, 84.13, 93.74, 90.92, 86.45, 77.45, 91.1, 92, 84.26, 84.8, 86.76, 84.64, 81.21, 82.55, 83.62, 73.73, 81.34, 79.61, 79.29, 75.68, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 165.56, 165.15, 160.01, 182.58, 190.69, 205, 286.51] },
      velocityScore: { '1D': 1.6, '1W': -59, '1M': null, '6M': null }, isNew: false,
      marketCap: '$251B', pe: 98.5, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.08,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 8.06, GTEK: 4.73, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: 3.65, FCUS: false, WGMI: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 5, avgWeight: 3.16, proScore: 1.21, coverage: 0.385,
      price: 252.57, weeklyPrices: [261.26, 256.52, 250.02, 253.79, 252.57], weeklyChange: -3.32, sortRank: 0, periodReturns: { '1M': -7.7, '6M': 10, '1Y': 21.5 },
      priceHistory: { '1W': [261.26, 256.52, 250.02, 253.79, 252.57], '1M': [273.55, 274.99, 271.17, 272.68, 268.99, 270.13, 267.22, 264.14, 264.86, 259.34, 265.01, 268.46, 266.32, 265.29, 271.85, 270.64, 261.26, 256.52, 250.02, 253.79, 252.57], '6M': [229.53, 226.19, 227.35, 232.07, 240.93, 242.6, 231.31, 243.01, 232.99, 204.08, 204.86, 207.92, 218.94, 212.65, 209.87, 211.71, 210.57, 233.65, 249.7, 255.08, 265.06, 271.17, 267.22, 268.46, 270.64, 252.57], '1Y': [207.91, 213.24, 209.69, 223.3, 223.47, 225.69, 229.3, 231.44, 214.75, 222.69, 231.03, 228.84, 229, 235.84, 231.43, 227.63, 222.17, 220.9, 220.07, 216.48, 224.21, 244.22, 244.41, 234.69, 220.69, 233.88, 226.89, 222.54, 228.43, 232.53, 241.56, 236.65, 231.31, 243.01, 232.99, 204.08, 204.86, 207.92, 218.94, 209.53, 208.76, 207.54, 209.77, 238.38, 250.56, 255.08, 265.06, 271.17, 267.22, 268.46, 270.64, 252.57] },
      velocityScore: { '1D': -1.6, '1W': -70.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.7T', pe: 31.5, revenueGrowth: 17, eps: 8.02, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.01, GTEK: false, ARKK: 2.52, MARS: false, FRWD: 3.41, BCTK: 4.45, FWD: 1.39, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 3, avgWeight: 5.2, proScore: 1.2, coverage: 0.231,
      price: 419.93, weeklyPrices: [460.52, 441.31, 427.34, 428.05, 419.93], weeklyChange: -8.81, sortRank: 0, periodReturns: { '1M': 2.1, '6M': -13.1, '1Y': -10.2 },
      priceHistory: { '1W': [460.52, 441.31, 427.34, 428.05, 419.93], '1M': [411.38, 413.96, 420.77, 415.12, 412.66, 405.21, 409.43, 421.92, 423.54, 417.42, 421.06, 419.09, 418.57, 416.03, 412.67, 450.24, 460.52, 441.31, 427.34, 428.05, 419.93], '6M': [483.16, 478.53, 485.92, 487.1, 478.51, 470.67, 444.11, 481.63, 414.19, 404.37, 398.46, 401.72, 410.68, 404.88, 391.79, 371.04, 369.37, 373.07, 420.26, 415.75, 407.78, 420.77, 409.43, 419.09, 450.24, 419.93], '1Y': [467.68, 478.87, 477.4, 495.94, 497.72, 503.02, 510.06, 513.71, 524.11, 522.04, 520.17, 507.23, 506.69, 498.2, 515.36, 514.45, 514.6, 528.57, 514.05, 516.79, 523.61, 517.81, 496.82, 510.18, 472.12, 486.74, 491.02, 474.82, 484.92, 487.48, 483.47, 459.38, 444.11, 481.63, 414.19, 404.37, 398.46, 401.72, 410.68, 401.86, 389.02, 365.97, 373.46, 370.87, 422.79, 415.75, 407.78, 420.77, 409.43, 419.09, 450.24, 419.93] },
      velocityScore: { '1D': -0.8, '1W': -75.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.1T', pe: 25, revenueGrowth: 18, eps: 16.78, grossMargin: 68, dividendYield: 0.85,
      etfPresence: { PTF: false, WCLD: false, IGV: 7.73, FDTX: 3.79, GTEK: false, ARKK: false, MARS: false, FRWD: 4.07, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 3, avgWeight: 4.85, proScore: 1.12, coverage: 0.231,
      price: 399.83, weeklyPrices: [415.88, 423.74, 423.70, 418.45, 399.83], weeklyChange: -3.86, sortRank: 0, periodReturns: { '1M': 2.7, '6M': -12.1, '1Y': 40.4 },
      priceHistory: { '1W': [415.88, 423.74, 423.7, 418.45, 399.83], '1M': [389.37, 398.73, 411.79, 428.35, 445, 445.27, 443.3, 422.24, 409.99, 404.11, 417.26, 417.85, 426.01, 433.59, 440.36, 435.79, 415.88, 423.74, 423.7, 418.45, 399.83], '6M': [455, 458.96, 481.2, 459.64, 432.96, 447.2, 431.44, 431.46, 406.01, 428.27, 411.71, 408.58, 405.55, 407.82, 392.78, 385.95, 381.26, 345.62, 388.9, 373.72, 381.63, 411.79, 443.3, 417.85, 435.79, 399.83], '1Y': [284.7, 319.11, 322.16, 323.63, 293.94, 316.9, 328.49, 316.06, 302.63, 329.65, 330.56, 340.01, 333.87, 346.4, 410.04, 434.21, 443.21, 453.25, 435.9, 447.43, 433.72, 456.56, 429.52, 404.35, 391.09, 430.14, 439.58, 475.31, 488.73, 454.43, 431.41, 439.2, 431.44, 431.46, 406.01, 428.27, 411.71, 408.58, 405.55, 395.01, 380.3, 372.11, 360.59, 348.95, 400.62, 373.72, 381.63, 411.79, 443.3, 417.85, 435.79, 399.83] },
      velocityScore: { '1D': -2.6, '1W': -78.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 366.8, revenueGrowth: 16, eps: 1.09, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 10.11, MARS: false, FRWD: false, BCTK: 3.37, FWD: 1.08, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
    {
      ticker: 'PANW', name: 'PANW', easyScore: 3, avgWeight: 4.58, proScore: 1.06, coverage: 0.231,
      price: 275.23, weeklyPrices: [300.48, 297.18, 280.43, 279.25, 275.23], weeklyChange: -8.4, sortRank: 0, periodReturns: { '1M': 49.6, '6M': 38.4, '1Y': 39.6 },
      priceHistory: { '1W': [300.48, 297.18, 280.43, 279.25, 275.23], '1M': [183.98, 183.68, 196.53, 207.88, 213.66, 227.79, 238.21, 242.83, 247.55, 240.13, 246.66, 252.92, 260.58, 256.75, 248.47, 281.69, 300.48, 297.18, 280.43, 279.25, 275.23], '6M': [198.84, 191.69, 186.88, 186.85, 185.86, 190.85, 181.47, 183.74, 166.72, 165.3, 150.99, 149.4, 163.16, 164.93, 168.91, 153.22, 160.67, 166.99, 166.97, 173.21, 179.32, 196.53, 238.21, 252.92, 281.69, 275.23], '1Y': [197.11, 197.67, 199.24, 200.57, 201.42, 190.72, 199.88, 203.27, 172.88, 167.06, 177.09, 185.88, 190.52, 197.38, 201.28, 208.18, 203.96, 212.58, 213.28, 211.82, 217.11, 220.24, 212.29, 205.25, 182.9, 187.73, 195.35, 185.88, 189.49, 186.85, 193.9, 190.93, 181.47, 183.74, 166.72, 165.3, 150.99, 149.4, 163.16, 168.12, 169.74, 156.36, 163.21, 155.73, 167.85, 173.21, 179.32, 196.53, 238.21, 252.92, 281.69, 275.23] },
      velocityScore: { '1D': 0, '1W': -53.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$224B', pe: 241.4, revenueGrowth: 31, eps: 1.14, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.44, IGV: 7.64, FDTX: 3.67, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab Corp', easyScore: 1, avgWeight: 13.55, proScore: 1.04, coverage: 0.077,
      price: 111.64, weeklyPrices: [122.39, 123.32, 114.70, 119.95, 111.64], weeklyChange: -8.78, sortRank: 0, periodReturns: { '1M': 41.7, '6M': 127.6, '1Y': 322.1 },
      priceHistory: { '1W': [122.39, 123.32, 114.7, 119.95, 111.64], '1M': [78.76, 84.65, 78.58, 105.47, 117.35, 124.15, 132.55, 124.77, 131.16, 127.31, 134.28, 125.45, 135.76, 143.2, 150.23, 143.48, 122.39, 123.32, 114.7, 119.95, 111.64], '6M': [49.06, 61.49, 70.52, 70.12, 86.03, 86.58, 87.82, 88.57, 73.11, 69.62, 76.58, 72.65, 70, 71.96, 69.48, 72.88, 65.52, 66.74, 82.93, 84.6, 82.51, 78.58, 132.55, 125.45, 143.48, 111.64], '1Y': [26.45, 26.4, 30.04, 35.38, 38.88, 43.21, 47.19, 47.43, 44.81, 44.69, 44.27, 44.38, 48.6, 47.73, 54.04, 49.81, 47.01, 58.5, 65.42, 67.35, 64.56, 62.98, 51.64, 45.54, 40.3, 40.37, 51.56, 55.41, 77.55, 70.45, 84.08, 91.8, 87.82, 88.57, 73.11, 69.62, 76.58, 72.65, 70, 68.37, 71.93, 65.94, 67.73, 68.05, 84.8, 84.6, 82.51, 78.58, 132.55, 125.45, 143.48, 111.64] },
      velocityScore: { '1D': 2, '1W': -76.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$70B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 13.55, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 1, avgWeight: 13.45, proScore: 1.03, coverage: 0.077,
      price: 53.95, weeklyPrices: [65.33, 66.60, 65.48, 61.86, 53.95], weeklyChange: -17.42, sortRank: 0, periodReturns: { '1M': -1.4, '6M': 20.7, '1Y': 502.8 },
      priceHistory: { '1W': [65.33, 66.6, 65.48, 61.86, 53.95], '1M': [54.74, 60.98, 56.85, 61.2, 55.15, 55.17, 58.4, 52.94, 50.46, 47.74, 52.71, 58.06, 56.83, 59.78, 67.84, 63.54, 65.33, 66.6, 65.48, 61.86, 53.95], '6M': [44.71, 40.13, 39.92, 39.41, 45.91, 52.99, 53.48, 62.94, 44.94, 42.67, 43.29, 44.24, 40.13, 41.98, 42.21, 41.43, 34.09, 37.06, 47.7, 52.02, 45.51, 56.85, 58.4, 58.06, 63.54, 53.95], '1Y': [8.95, 10.17, 10.47, 14, 16.95, 17.28, 18.15, 17.72, 15.4, 18.45, 19.69, 21.43, 26.48, 26.19, 37.14, 41.9, 45.93, 57.75, 64.14, 59.22, 62.9, 60.75, 62.38, 46.37, 42.26, 48.49, 46.34, 35.48, 42.04, 38.3, 43.63, 52.88, 53.48, 62.94, 44.94, 42.67, 43.29, 44.24, 40.13, 41.37, 41.66, 37.45, 34.77, 39.32, 48.12, 52.02, 45.51, 56.85, 58.4, 58.06, 63.54, 53.95] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 70.1, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: 13.45 },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'COHR', name: 'Coherent Corp', easyScore: 4, avgWeight: 3.32, proScore: 1.02, coverage: 0.308,
      price: 401.86, weeklyPrices: [362.90, 426.89, 417.43, 421.90, 401.86], weeklyChange: 10.73, sortRank: 0, periodReturns: { '1M': 19.7, '6M': 121.1, '1Y': 404.5 },
      priceHistory: { '1W': [362.9, 426.89, 417.43, 421.9, 401.86], '1M': [335.73, 344.67, 319.19, 335.26, 379.69, 403.71, 404.94, 382.45, 362.83, 353.63, 358.5, 378, 377.57, 381.35, 380.18, 361.47, 362.9, 426.89, 417.43, 421.9, 401.86], '6M': [181.79, 178.34, 185.83, 189.02, 194.11, 190.03, 201.46, 221.14, 211, 223.69, 232.48, 250.14, 253.87, 251.41, 257.21, 272.04, 247.8, 284.17, 328, 337.68, 319.71, 319.19, 404.94, 378, 361.47, 401.86], '1Y': [79.65, 80.95, 81.2, 87.23, 88.05, 94.52, 99.88, 100.14, 102.79, 115.44, 93.4, 89.9, 90.47, 98.67, 106.34, 114.6, 107.97, 114.77, 115.13, 120.2, 129.34, 131.96, 154.51, 139.33, 139.51, 163.5, 185.86, 178.45, 190.98, 186.81, 191.62, 184.11, 201.46, 221.14, 211, 223.69, 232.48, 250.14, 253.87, 241.27, 275.57, 243.29, 258.16, 307.5, 345.02, 337.68, 319.71, 319.19, 404.94, 378, 361.47, 401.86] },
      velocityScore: { '1D': 7.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$79B', pe: 190.5, revenueGrowth: 21, eps: 2.11, grossMargin: 37, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.75, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 4.06, FWD: false, CBSE: 2.57, FCUS: 2.9, WGMI: false },
      tonyNote: 'Coherent Corp appears in 4 of 13 Broad Tech ETFs (31% coverage) with average weight 3.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 3, avgWeight: 4.24, proScore: 0.98, coverage: 0.231,
      price: 137.24, weeklyPrices: [160.65, 152.17, 142.20, 141.70, 137.24], weeklyChange: -14.57, sortRank: 0, periodReturns: { '1M': 1, '6M': -24.5, '1Y': 14.5 },
      priceHistory: { '1W': [160.65, 152.17, 142.2, 141.7, 137.24], '1M': [135.91, 133.79, 137.05, 137.8, 136.89, 130.05, 133.73, 133.99, 135.14, 135.26, 137.15, 137.41, 136.88, 136.6, 132.51, 156.54, 160.65, 152.17, 142.2, 141.7, 137.24], '6M': [181.76, 183.57, 193.38, 184.18, 179.71, 178.96, 165.33, 157.35, 139.54, 135.68, 134.89, 135.94, 152.67, 151.6, 152.77, 154.96, 146.49, 130.49, 142.76, 141.57, 139.11, 137.05, 133.73, 137.41, 156.54, 137.24], '1Y': [119.91, 135.19, 137.3, 130.74, 139.12, 149.15, 151.79, 158.8, 154.27, 186.96, 177.17, 158.74, 156.71, 156.1, 171.21, 179.33, 178.86, 179.53, 177.21, 181.59, 184.63, 200.47, 177.93, 174.01, 154.85, 167.49, 181.49, 183.25, 193.98, 180.84, 181.68, 178.4, 165.33, 157.35, 139.54, 135.68, 134.89, 135.94, 152.67, 153.5, 155.68, 147.56, 148.46, 128.06, 146.39, 141.57, 139.11, 137.05, 133.73, 137.41, 156.54, 137.24] },
      velocityScore: { '1D': -1, '1W': -57.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$329B', pe: 154.2, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 6.84, FDTX: 2.87, GTEK: false, ARKK: 3.02, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 2.98, proScore: 0.92, coverage: 0.308,
      price: 109.68, weeklyPrices: [124.12, 117.01, 112.94, 116.04, 109.68], weeklyChange: -11.63, sortRank: 0, periodReturns: { '1M': 1.9, '6M': -31.9, '1Y': 4.4 },
      priceHistory: { '1W': [124.12, 117.01, 112.94, 116.04, 109.68], '1M': [107.63, 105.44, 111.74, 110.41, 102.54, 95.4, 97.42, 100.28, 102.39, 101.01, 105.01, 104.86, 103, 104.9, 106.6, 118.71, 124.12, 117.01, 112.94, 116.04, 109.68], '6M': [161.08, 164.19, 169.57, 167.88, 168.45, 167.44, 138.54, 138.92, 114.02, 118.71, 123.8, 125.94, 134.79, 129.52, 123.75, 118.42, 118.52, 112.38, 126.94, 124.23, 121.13, 111.74, 97.42, 104.86, 118.71, 109.68], '1Y': [105.03, 109.21, 106.4, 113.65, 116.66, 116.74, 128.43, 124.43, 118.6, 149.61, 141.47, 142.11, 141.28, 146.22, 147.89, 157.12, 149, 164.5, 153.66, 164.71, 172.95, 173.86, 152.41, 146.04, 147.8, 149.28, 158.41, 159.85, 169.67, 163.74, 166.74, 157.51, 138.54, 138.92, 114.02, 118.71, 123.8, 125.94, 134.79, 126.17, 122.37, 115.43, 118.25, 110.79, 131.15, 124.23, 121.13, 111.74, 97.42, 104.86, 118.71, 109.68] },
      velocityScore: { '1D': -2.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$142B', pe: 107.5, revenueGrowth: 34, eps: 1.02, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.89, GTEK: false, ARKK: 4.38, MARS: false, FRWD: 1.96, BCTK: 2.68, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 13 Broad Tech ETFs (31% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 2, avgWeight: 5.88, proScore: 0.9, coverage: 0.154,
      price: 1620.93, weeklyPrices: [1761.43, 1716.36, 1831.50, 1759.68, 1620.93], weeklyChange: -7.98, sortRank: 0, periodReturns: { '1M': 15.3, '6M': 609.5, '1Y': 4043.5 },
      priceHistory: { '1W': [1761.43, 1716.36, 1831.5, 1759.68, 1620.93], '1M': [1406.32, 1409.98, 1339.96, 1562.34, 1547.56, 1447.23, 1382.72, 1407.61, 1333.01, 1383.29, 1392.56, 1542.24, 1478.69, 1589.55, 1589.94, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1620.93], '6M': [228.47, 206.18, 237.61, 244.25, 349.63, 389.81, 501.29, 527.63, 584.55, 599.34, 621.09, 651.9, 565.59, 655.43, 753.69, 677.86, 692.73, 851.57, 919.47, 932.43, 1096.51, 1339.96, 1382.72, 1542.24, 1694.98, 1620.93], '1Y': [39.12, 41.3, 46.58, 47.15, 45.22, 42.48, 41.61, 42.48, 41.33, 44.34, 44.54, 46.37, 52.47, 70.5, 90.09, 102.92, 113.5, 121.17, 134.61, 148.04, 186.16, 199.33, 239.48, 254.16, 200.27, 210.17, 225.47, 201.87, 241.05, 240.22, 353.56, 387.81, 501.29, 527.63, 584.55, 599.34, 621.09, 651.9, 565.59, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 932.43, 1096.51, 1339.96, 1382.72, 1542.24, 1694.98, 1620.93] },
      velocityScore: { '1D': -4.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$240B', pe: 55.5, revenueGrowth: 251, eps: 29.21, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 7.59, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: 4.16, WGMI: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 2, avgWeight: 7.33, proScore: 3.67, coverage: 0.5,
      price: 291.24, weeklyPrices: [288.12, 299.07, 299.73, 300.06, 291.24], weeklyChange: 1.08, sortRank: 0, periodReturns: { '1M': -1.2, '6M': 155.4, '1Y': 378.5 },
      priceHistory: { '1W': [288.12, 299.07, 299.73, 300.06, 291.24], '1M': [294.69, 320.3, 305.93, 309.39, 322.05, 300.84, 296.98, 292.65, 266.8, 261.58, 271.05, 270.75, 279.22, 291.97, 295.94, 284.42, 288.12, 299.07, 299.73, 300.06, 291.24], '6M': [114.04, 112.36, 110.97, 111.96, 120, 133.04, 140.62, 147.81, 175.77, 197.45, 178.79, 176.96, 167.67, 171.73, 167.41, 194.85, 184.68, 230.81, 232.81, 252.18, 277.27, 305.93, 296.98, 270.75, 284.42, 291.24], '1Y': [60.87, 64.44, 58.47, 70.97, 71.96, 70.19, 73.64, 82.79, 75.89, 81.28, 84.88, 87.65, 88.72, 90.8, 100.68, 100.97, 101.01, 103.9, 105.33, 116.4, 121.66, 127.8, 121.79, 109.89, 94.02, 106.53, 114.29, 109.31, 112.18, 109.16, 118.62, 133.76, 140.62, 147.81, 175.77, 197.45, 178.79, 176.96, 167.67, 171.19, 175.13, 174.8, 182.6, 230.94, 241.01, 252.18, 277.27, 305.93, 296.98, 270.75, 284.42, 291.24] },
      velocityScore: { '1D': 0.5, '1W': -21.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 56.8, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { POW: 6.63, VOLT: 8.03, PBD: false, PBW: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, avgWeight: 5.25, proScore: 2.63, coverage: 0.5,
      price: 268.33, weeklyPrices: [269.86, 269.22, 280.09, 276.54, 268.33], weeklyChange: -0.57, sortRank: 0, periodReturns: { '1M': -9.7, '6M': 61.6, '1Y': 262.1 },
      priceHistory: { '1W': [269.86, 269.22, 280.09, 276.54, 268.33], '1M': [297.17, 286.89, 290.46, 297.98, 302.73, 266.92, 268.73, 256.72, 258.28, 249.71, 254.75, 260.4, 270.01, 276.25, 280.13, 274.52, 269.86, 269.22, 280.09, 276.54, 268.33], '6M': [166, 173.12, 175.69, 174.34, 184, 193.82, 201.8, 207.78, 211.58, 238.4, 230.06, 232.12, 202.58, 200.88, 205.74, 220.77, 203.04, 235, 241.49, 268.31, 275.84, 290.46, 268.73, 260.4, 274.52, 268.33], '1Y': [74.11, 86.4, 90.51, 96.08, 99.27, 101.66, 103.72, 119.84, 127.5, 132.58, 131.03, 132.6, 134.56, 141.51, 145.86, 146.51, 140.37, 141.12, 145.02, 147.96, 157, 153.99, 161.53, 147.67, 140.95, 154.77, 172.21, 173.3, 174.02, 172.95, 181.03, 192.96, 201.8, 207.78, 211.58, 238.4, 230.06, 232.12, 202.58, 195.18, 214.95, 204.11, 204.65, 235.73, 254.25, 268.31, 275.84, 290.46, 268.73, 260.4, 274.52, 268.33] },
      velocityScore: { '1D': -1.1, '1W': -38.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 64.7, revenueGrowth: 17, eps: 4.15, grossMargin: 39, dividendYield: 0.1,
      etfPresence: { POW: 3.19, VOLT: 7.32, PBD: false, PBW: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 2, avgWeight: 5.15, proScore: 2.58, coverage: 0.5,
      price: 704.73, weeklyPrices: [687.48, 706.06, 715.67, 719.17, 704.73], weeklyChange: 2.51, sortRank: 0, periodReturns: { '1M': -8.7, '6M': 53, '1Y': 96 },
      priceHistory: { '1W': [687.48, 706.06, 715.67, 719.17, 704.73], '1M': [771.61, 785.24, 750.73, 745, 781.38, 773.72, 780.08, 769.99, 723.03, 714.13, 709.93, 716.91, 723.44, 742.18, 733.62, 711.73, 687.48, 706.06, 715.67, 719.17, 704.73], '6M': [460.64, 438.11, 426.66, 431.03, 438.22, 444.2, 473.24, 481.28, 464.57, 523.96, 554, 565.05, 549.22, 567.71, 572, 573.5, 560.12, 582.06, 587.42, 633.44, 727.77, 750.73, 780.08, 716.91, 711.73, 704.73], '1Y': [359.58, 358.65, 360.78, 381.26, 385.8, 387, 398.66, 421.68, 395.17, 386.15, 380.81, 379.84, 377.96, 375.53, 385.68, 396.02, 409.11, 427.8, 430.98, 440.74, 440.93, 449.13, 445.01, 429.3, 430.15, 452.23, 463.09, 435.87, 433.03, 428.81, 436.89, 437.07, 473.24, 481.28, 464.57, 523.96, 554, 565.05, 549.22, 566.91, 577.95, 545.64, 560.63, 585.36, 601.88, 633.44, 727.77, 750.73, 780.08, 716.91, 711.73, 704.73] },
      velocityScore: { '1D': 1.2, '1W': -21.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$106B', pe: 97.1, revenueGrowth: 26, eps: 7.26, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.77, VOLT: 5.54, PBD: false, PBW: false },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 2, avgWeight: 4.82, proScore: 2.41, coverage: 0.5,
      price: 400.9, weeklyPrices: [400.08, 417.62, 421.21, 418.61, 400.90], weeklyChange: 0.2, sortRank: 0, periodReturns: { '1M': -2.4, '6M': 18.7, '1Y': 22.8 },
      priceHistory: { '1W': [400.08, 417.62, 421.21, 418.61, 400.9], '1M': [410.86, 421.39, 399.15, 401.51, 419, 406.94, 408.1, 399.44, 381.87, 371.88, 379.69, 381.51, 391.35, 403.13, 406.37, 400.6, 400.08, 417.62, 421.21, 418.61, 400.9], '6M': [337.66, 331.98, 317.8, 321.45, 332.97, 332.38, 337.96, 347.32, 365, 396.09, 377.32, 374.59, 354.79, 355.79, 360.54, 375, 365.56, 400.44, 392.73, 424.5, 433.01, 399.15, 408.1, 381.51, 400.6, 400.9], '1Y': [326.48, 330.34, 331.23, 353.23, 358.49, 360.29, 373.66, 392.17, 381.29, 362.84, 351.03, 347.61, 349.14, 349.49, 375.54, 378.31, 367.15, 380.02, 375.37, 377.69, 376.29, 381.56, 373.77, 352.39, 331.71, 339.71, 343.39, 333.21, 320.39, 320.86, 322.67, 331.14, 337.96, 347.32, 365, 396.09, 377.32, 374.59, 354.79, 348.64, 360.23, 357.1, 361.1, 403, 406.21, 424.5, 433.01, 399.15, 408.1, 381.51, 400.6, 400.9] },
      velocityScore: { '1D': -0.4, '1W': -22, '1M': null, '6M': null }, isNew: false,
      marketCap: '$156B', pe: 39.3, revenueGrowth: 17, eps: 10.21, grossMargin: 37, dividendYield: 1.05,
      etfPresence: { POW: 4.12, VOLT: 5.52, PBD: false, PBW: false },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 2, avgWeight: 3.61, proScore: 1.8, coverage: 0.5,
      price: 165.81, weeklyPrices: [171.55, 173.39, 176.39, 173.88, 165.81], weeklyChange: -3.35, sortRank: 0, periodReturns: { '1M': -2.1, '6M': 53.9, '1Y': 150 },
      priceHistory: { '1W': [171.55, 173.39, 176.39, 173.88, 165.81], '1M': [169.41, 172.49, 166.73, 169.95, 173.39, 172.91, 173.96, 169.01, 160.69, 158.23, 161.86, 163.57, 164.66, 169.29, 167.8, 166.99, 171.55, 173.39, 176.39, 173.88, 165.81], '6M': [107.72, 101.71, 101.54, 103.26, 110.09, 106.64, 112.66, 114.15, 116.69, 112.75, 116.88, 121.79, 110.55, 111.09, 120.27, 127.01, 121.26, 128.63, 129.7, 142.76, 142.9, 166.73, 173.96, 163.57, 166.99, 165.81], '1Y': [66.32, 69.76, 70.26, 73.35, 74.51, 74.97, 74.96, 78.53, 89.88, 88.68, 88.01, 90.08, 90.39, 92.58, 96.35, 100.25, 96.7, 98, 99.5, 100.23, 102.2, 114.35, 111.03, 106.55, 100.55, 105.67, 107.11, 102.61, 102.79, 103.01, 106.48, 104.54, 112.66, 114.15, 116.69, 112.75, 116.88, 121.79, 110.55, 107.87, 122.58, 118.44, 117.96, 130.56, 134.69, 142.76, 142.9, 166.73, 173.96, 163.57, 166.99, 165.81] },
      velocityScore: { '1D': -1.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 56.4, revenueGrowth: 54, eps: 2.94, grossMargin: 37, dividendYield: 0.48,
      etfPresence: { POW: 3.97, VOLT: 3.24, PBD: false, PBW: false },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 2, avgWeight: 3.6, proScore: 1.8, coverage: 0.5,
      price: 944.5, weeklyPrices: [950.54, 969.67, 959.36, 963.33, 944.50], weeklyChange: -0.64, sortRank: 0, periodReturns: { '1M': -13.8, '6M': 49.6, '1Y': 95 },
      priceHistory: { '1W': [950.54, 969.67, 959.36, 963.33, 944.5], '1M': [1095.21, 1118.96, 1045.63, 1040.15, 1073.08, 1062.57, 1090.53, 1049.23, 1012.25, 1011.8, 1024.52, 1043.82, 1038.74, 1070.47, 1031.89, 968.32, 950.54, 969.67, 959.36, 963.33, 944.5], '6M': [631.32, 671.71, 658.28, 663.46, 686.33, 652.09, 667.89, 711.59, 746.22, 823.67, 834.61, 876.46, 815.01, 847.65, 858.47, 923.69, 894.78, 968.02, 978.32, 1149.53, 1083.46, 1045.63, 1090.53, 1043.82, 968.32, 944.5], '1Y': [484.31, 487.67, 486.96, 519.66, 530.28, 555.04, 565.91, 644.59, 656.5, 649.09, 621.91, 607.07, 612.97, 600.23, 628.68, 644.37, 602.43, 603.22, 648.25, 594.07, 584.39, 585.14, 575.13, 578.31, 555.84, 576.9, 621.9, 681.35, 661.81, 659.64, 662.32, 644.18, 667.89, 711.59, 746.22, 823.67, 834.61, 876.46, 815.01, 832.11, 877.39, 873.12, 898.57, 991.32, 1002.75, 1149.53, 1083.46, 1045.63, 1090.53, 1043.82, 968.32, 944.5] },
      velocityScore: { '1D': 0.6, '1W': -24.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$254B', pe: 27.6, revenueGrowth: 16, eps: 34.2, grossMargin: 20, dividendYield: 0.21,
      etfPresence: { POW: 3.25, VOLT: 3.95, PBD: false, PBW: false },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 2, avgWeight: 3.29, proScore: 1.65, coverage: 0.5,
      price: 267.56, weeklyPrices: [273.51, 302.85, 287.32, 291.37, 267.56], weeklyChange: -2.18, sortRank: 0, periodReturns: { '1M': -9.4, '6M': 124.5, '1Y': 1208.4 },
      priceHistory: { '1W': [273.51, 302.85, 287.32, 291.37, 267.56], '1M': [295.25, 285.47, 258.64, 261.03, 283.92, 289.76, 303.41, 275.95, 258.71, 261.34, 282.31, 307.88, 302.49, 302.4, 293.8, 285, 273.51, 302.85, 287.32, 291.37, 267.56], '6M': [119.18, 94.98, 88.82, 88.41, 103.05, 139.77, 150.56, 165.39, 147.35, 155.54, 159, 168.57, 159.99, 159.21, 156.58, 150.22, 132.45, 160.13, 210.06, 237.57, 283.36, 258.64, 303.41, 307.88, 285, 267.56], '1Y': [20.45, 22.25, 21.75, 22.18, 24.36, 25.96, 25.36, 34.34, 36.72, 36.8, 45.28, 48.54, 52.94, 53.44, 67.02, 86.27, 73.6, 86.97, 109.91, 109.06, 110.38, 132.16, 135.21, 111.89, 89.99, 98.93, 111.79, 89.58, 92.26, 87.26, 108, 133.46, 150.56, 165.39, 147.35, 155.54, 159, 168.57, 159.99, 157.17, 166.69, 133.52, 135.63, 166.7, 207.86, 237.57, 283.36, 258.64, 303.41, 307.88, 285, 267.56] },
      velocityScore: { '1D': 1.2, '1W': -39.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$76B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: 4.5, PBD: false, PBW: 2.09 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 2, avgWeight: 3.06, proScore: 1.53, coverage: 0.5,
      price: 478, weeklyPrices: [462.93, 480.46, 484.91, 485.27, 478.00], weeklyChange: 3.26, sortRank: 0, periodReturns: { '1M': -5.9, '6M': 8.5, '1Y': 23 },
      priceHistory: { '1W': [462.93, 480.46, 484.91, 485.27, 478], '1M': [507.81, 502.34, 493.04, 492.58, 490.16, 483.79, 482.03, 479.97, 470.87, 461.5, 463.32, 460.98, 475.01, 478.05, 484.25, 473.61, 462.93, 480.46, 484.91, 485.27, 478], '6M': [440.53, 448, 442.51, 451.39, 477.46, 481.68, 482.5, 485.73, 487.16, 516.03, 526.56, 524.19, 476.51, 477.97, 477.47, 503.2, 500.38, 534.67, 521.71, 557.85, 508.17, 493.04, 482.03, 460.98, 473.61, 478], '1Y': [388.61, 391.04, 395.79, 406.62, 412.97, 415.08, 422.27, 442.54, 426.74, 418.65, 427.65, 440.85, 430.99, 436.62, 438.11, 438.49, 426.44, 413.05, 418.72, 431.65, 434.39, 470, 462.43, 432.82, 421.84, 427.85, 441.51, 444.84, 451.03, 446.61, 468.2, 476.06, 482.5, 485.73, 487.16, 516.03, 526.56, 524.19, 476.51, 468.41, 492.65, 481.67, 494.25, 536.01, 535.57, 557.85, 508.17, 493.04, 482.03, 460.98, 473.61, 478] },
      velocityScore: { '1D': 0.7, '1W': -18.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 28.2, revenueGrowth: 11, eps: 16.94, grossMargin: 36, dividendYield: 1.17,
      etfPresence: { POW: 2.83, VOLT: 3.3, PBD: false, PBW: false },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 2, avgWeight: 2.92, proScore: 1.46, coverage: 0.5,
      price: 85.32, weeklyPrices: [83.66, 85.68, 84.58, 85.68, 85.32], weeklyChange: 1.98, sortRank: 0, periodReturns: { '1M': -11.4, '6M': 2.6, '1Y': 19.3 },
      priceHistory: { '1W': [83.66, 85.68, 84.58, 85.68, 85.32], '1M': [96.28, 95.39, 93.32, 93.1, 94.84, 94.85, 95.68, 93.36, 89.04, 90.06, 88.27, 89.69, 88.55, 87.65, 87.65, 87.01, 83.66, 85.68, 84.58, 85.68, 85.32], '6M': [83.13, 81.65, 79.54, 80.27, 81.05, 81.64, 83.85, 87.57, 89.97, 91.36, 91.64, 91.99, 91.13, 91.66, 90.96, 91.16, 92.85, 94.48, 91.83, 96.25, 97.88, 93.32, 95.68, 89.69, 87.01, 85.32], '1Y': [71.5, 73.84, 71.53, 70.89, 74.75, 75.04, 76.17, 71.85, 70.4, 72.41, 75.41, 76.32, 72.05, 69.77, 71.5, 72.35, 76.21, 82.11, 84.3, 84.77, 84.41, 81.4, 83.93, 83.88, 83.48, 84.65, 80.55, 81.65, 80.04, 80.53, 78.37, 81.98, 83.85, 87.57, 89.97, 91.36, 91.64, 91.99, 91.13, 91.73, 92.41, 91.16, 93.15, 94.08, 91.98, 96.25, 97.88, 93.32, 95.68, 89.69, 87.01, 85.32] },
      velocityScore: { '1D': 0.7, '1W': -37.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$178B', pe: 21.7, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.91,
      etfPresence: { POW: 1.93, VOLT: 3.92, PBD: false, PBW: false },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 2.75, proScore: 1.38, coverage: 0.5,
      price: 129.5, weeklyPrices: [123.79, 127.11, 126.31, 127.79, 129.50], weeklyChange: 4.62, sortRank: 0, periodReturns: { '1M': -5.5, '6M': 10.2, '1Y': 27.3 },
      priceHistory: { '1W': [123.79, 127.11, 126.31, 127.79, 129.5], '1M': [137.04, 132.56, 131.76, 130.16, 130.7, 127.95, 128.6, 125.15, 127.68, 128.92, 128.87, 129.61, 131.59, 130.9, 129.57, 126.67, 123.79, 127.11, 126.31, 127.79, 129.5], '6M': [117.54, 114.13, 114.49, 115.77, 115.04, 116.62, 118.98, 119.12, 119.98, 122.25, 128.42, 132.1, 132.04, 131.26, 130.97, 128.3, 131.67, 137.15, 134.56, 135.08, 137.11, 131.76, 128.6, 129.61, 126.67, 129.5], '1Y': [101.77, 103.02, 101.75, 102.46, 104.17, 105.02, 108.54, 109.79, 113.58, 112.5, 111.99, 114.02, 111.02, 107.55, 109.1, 107.05, 109.78, 115.66, 116.8, 117.82, 115.98, 120.26, 121.43, 121.3, 120.84, 120.51, 115.73, 115.77, 114.62, 115.99, 113.7, 118.11, 118.98, 119.12, 119.98, 122.25, 128.42, 132.1, 132.04, 132.22, 128.72, 128.85, 132.68, 136.3, 133.66, 135.08, 137.11, 131.76, 128.6, 129.61, 126.67, 129.5] },
      velocityScore: { '1D': 1.5, '1W': -43, '1M': null, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 19.2, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.97,
      etfPresence: { POW: 1.34, VOLT: 4.16, PBD: false, PBW: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, avgWeight: 5.29, proScore: 1.32, coverage: 0.25,
      price: 278.12, weeklyPrices: [328.85, 332.95, 330.48, 306.12, 278.12], weeklyChange: -15.43, sortRank: 0, periodReturns: { '1M': 4.6, '6M': 187.2, '1Y': 527.7 },
      priceHistory: { '1W': [328.85, 332.95, 330.48, 306.12, 278.12], '1M': [266.01, 280.34, 261.34, 256.47, 312.96, 309.27, 290.54, 273.67, 249.02, 243.43, 264.2, 268.29, 267.99, 332.95, 345.84, 334.84, 328.85, 332.95, 330.48, 306.12, 278.12], '6M': [96.83, 97.8, 104.4, 112, 138.92, 138.61, 162.08, 166.51, 152.09, 160.71, 152.84, 205.64, 181.92, 178.83, 191.84, 186, 158.16, 184.92, 203.1, 260.13, 269.27, 261.34, 290.54, 268.29, 334.84, 278.12], '1Y': [44.31, 45, 44.07, 46.66, 45.39, 46.16, 47.8, 46.41, 43.85, 46.84, 47.65, 50.95, 51.11, 50.56, 51.89, 54.72, 48.46, 49.97, 51.96, 58.04, 90.44, 90.73, 87.43, 89, 84.37, 89.73, 98.69, 95.59, 111.02, 113.7, 139.47, 145.32, 162.08, 166.51, 152.09, 160.71, 152.84, 205.64, 181.92, 167.81, 190.13, 157.96, 155.64, 185.61, 218.05, 260.13, 269.27, 261.34, 290.54, 268.29, 334.84, 278.12] },
      velocityScore: { '1D': -7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 92.7, revenueGrowth: 20, eps: 3, grossMargin: 54, dividendYield: null,
      etfPresence: { POW: 5.29, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Vicor Corp is a power conversion specialist — high-efficiency modules for AI server power delivery. It holds a niche position in Industrials ETFs on the data center power density thesis. Revenue growth has been lumpy, but when AI GPU clusters require Vicor\'s factorized power architecture, the order cycles are large.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.5, proScore: 1.25, coverage: 0.5,
      price: 305.59, weeklyPrices: [294.65, 312.28, 322.50, 320.92, 305.59], weeklyChange: 3.71, sortRank: 0, periodReturns: { '1M': -11.6, '6M': 39.3, '1Y': 155.4 },
      priceHistory: { '1W': [294.65, 312.28, 322.5, 320.92, 305.59], '1M': [345.63, 360.81, 351.94, 357.24, 354.97, 339.19, 344.6, 323.46, 309.06, 302.84, 313.05, 323.79, 324.86, 339.65, 328.34, 302.18, 294.65, 312.28, 322.5, 320.92, 305.59], '6M': [219.38, 215.07, 216.09, 217.26, 229.7, 233.92, 269, 263.76, 254.54, 308.77, 320.64, 337.35, 311.42, 314.84, 319.63, 342.87, 332.82, 374.98, 372.23, 382.47, 383.91, 351.94, 344.6, 323.79, 302.18, 305.59], '1Y': [119.64, 126.68, 128.63, 132.31, 136.61, 141.48, 142.66, 140.54, 135.25, 150.82, 151.4, 154.51, 149.68, 154.43, 156.74, 174.77, 166.76, 176.02, 182.15, 197.44, 202.61, 202.73, 216.73, 202.48, 196, 207.78, 221.85, 216.87, 217.76, 213.41, 224.4, 237.9, 269, 263.76, 254.54, 308.77, 320.64, 337.35, 311.42, 305.82, 327.8, 313.11, 332.31, 379.64, 375.6, 382.47, 383.91, 351.94, 344.6, 323.79, 302.18, 305.59] },
      velocityScore: { '1D': -0.8, '1W': -46.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 63.5, revenueGrowth: 26, eps: 4.81, grossMargin: 39, dividendYield: 0.12,
      etfPresence: { POW: 0.96, VOLT: 4.05, PBD: false, PBW: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.48, proScore: 1.24, coverage: 0.5,
      price: 141.04, weeklyPrices: [146.34, 148.40, 147.62, 146.77, 141.04], weeklyChange: -3.62, sortRank: 0, periodReturns: { '1M': 3.2, '6M': 1.2, '1Y': 52.4 },
      priceHistory: { '1W': [146.34, 148.4, 147.62, 146.77, 141.04], '1M': [136.69, 138.47, 136.62, 128.03, 122.47, 124.64, 129.19, 125, 121.72, 119.2, 123.05, 124.86, 132.06, 139.56, 140.24, 148.76, 146.34, 148.4, 147.62, 146.77, 141.04], '6M': [139.36, 129.24, 135.29, 136.9, 141.38, 148.97, 154.6, 145.96, 130, 144.04, 151.2, 148.47, 136.24, 134.54, 127.81, 128.73, 127.7, 137.68, 148.96, 150.18, 147.27, 136.62, 129.19, 124.86, 148.76, 141.04], '1Y': [92.52, 94.6, 93.82, 97.67, 98.55, 100.21, 103.71, 105.02, 104.31, 109.98, 109.21, 109.36, 108.86, 110.54, 119.24, 123.69, 121.01, 123.4, 123.91, 127.67, 133.82, 139.34, 139.09, 133.74, 131.6, 139.22, 140.06, 129.9, 135.14, 136.2, 138.91, 146.75, 154.6, 145.96, 130, 144.04, 151.2, 148.47, 136.24, 131.47, 130.65, 123.13, 128, 140.75, 151.06, 150.18, 147.27, 136.62, 129.19, 124.86, 148.76, 141.04] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$174B', pe: 40.5, revenueGrowth: 58, eps: 3.48, grossMargin: 38, dividendYield: 0.68,
      etfPresence: { POW: 0.92, VOLT: 4.03, PBD: false, PBW: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'PRY', name: 'Prysmian SpA', easyScore: 1, avgWeight: 4.45, proScore: 1.11, coverage: 0.25,
      price: 0, weeklyPrices: [0.00], weeklyChange: 0, sortRank: 0, periodReturns: { '1M': 0, '6M': 0, '1Y': 0 },
      priceHistory: undefined,
      velocityScore: { '1D': -1.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { POW: 4.45, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Prysmian SpA appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 4.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HYLN', name: 'Hyliion Holdings Corp', easyScore: 1, avgWeight: 4.15, proScore: 1.04, coverage: 0.25,
      price: 7.25, weeklyPrices: [6.25, 6.79, 6.46, 7.62, 7.25], weeklyChange: 15.92, sortRank: 0, periodReturns: { '1M': 213.6, '6M': 277.3, '1Y': 383 },
      priceHistory: { '1W': [6.25, 6.79, 6.46, 7.62, 7.25], '1M': [2.31, 2.39, 2.47, 2.46, 2.76, 3.59, 3.69, 4.67, 4.2, 4.09, 4.09, 4.2, 5.99, 6.6, 6.94, 6.99, 6.25, 6.79, 6.46, 7.62, 7.25], '6M': [1.92, 1.94, 1.86, 1.93, 1.94, 2.08, 2.16, 2.1, 2.07, 2.05, 2.06, 2.15, 2.01, 2.07, 1.91, 1.89, 1.75, 1.81, 1.92, 1.89, 1.91, 2.47, 3.69, 4.2, 6.99, 7.25], '1Y': [1.5, 1.51, 1.34, 1.35, 1.36, 1.45, 1.58, 1.7, 1.4, 1.53, 1.65, 1.76, 1.68, 1.65, 1.74, 2.09, 2.02, 2.07, 2.38, 2.13, 2.28, 2.37, 2.12, 1.7, 1.7, 1.84, 1.86, 1.84, 1.93, 1.9, 1.94, 2.1, 2.16, 2.1, 2.07, 2.05, 2.06, 2.15, 2.01, 2.08, 1.9, 1.78, 1.72, 1.84, 2, 1.89, 1.91, 2.47, 3.69, 4.2, 6.99, 7.25] },
      velocityScore: { '1D': 16.9, '1W': -54, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1B', pe: null, revenueGrowth: 479, eps: -0.3, grossMargin: 6, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 4.15 },
      tonyNote: 'Hyliion is a small-cap commercial truck powertrain electrification company. It holds a speculative position in Electrification ETFs on the heavy-duty vehicle decarbonization thesis. Revenue is early-stage and the path to profitability is long; the ETF weight is small, reflecting a lottery-ticket allocation to an electrification theme adjacent holding.',
    },
    {
      ticker: 'XEL', name: 'Xcel Energy Inc', easyScore: 2, avgWeight: 1.9, proScore: 0.95, coverage: 0.5,
      price: 79.14, weeklyPrices: [76.41, 77.87, 77.39, 77.77, 79.14], weeklyChange: 3.57, sortRank: 0, periodReturns: { '1M': -2.8, '6M': 2.5, '1Y': 15.4 },
      priceHistory: { '1W': [76.41, 77.87, 77.39, 77.77, 79.14], '1M': [81.45, 80.55, 80.43, 79.39, 80.6, 79.91, 80.03, 77.92, 78.1, 79.73, 79.86, 80.2, 81.08, 80.78, 81, 79.5, 76.41, 77.87, 77.39, 77.77, 79.14], '6M': [77.18, 75.15, 72.67, 74.12, 74.43, 74.94, 76.51, 76.01, 76.2, 77.92, 80.82, 83.47, 82.38, 81, 80.02, 77.7, 79.71, 82.77, 81.05, 79.48, 82.95, 80.43, 80.03, 80.2, 79.5, 79.14], '1Y': [68.57, 69.07, 66.64, 67.78, 67.88, 69.17, 71.57, 72.66, 73.47, 73.33, 71.93, 74.26, 72.39, 71.75, 73.05, 72.35, 80.05, 81, 80.16, 81.28, 80.39, 81.17, 80.91, 80.58, 79.67, 79.73, 75.73, 75.72, 73.85, 74.19, 73.22, 76.2, 76.51, 76.01, 76.2, 77.92, 80.82, 83.47, 82.38, 80.82, 79.53, 77.93, 80.74, 82.38, 81.08, 79.48, 82.95, 80.43, 80.03, 80.2, 79.5, 79.14] },
      velocityScore: { '1D': 1.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$49B', pe: 22.8, revenueGrowth: 3, eps: 3.47, grossMargin: 46, dividendYield: 3.05,
      etfPresence: { POW: 1.89, VOLT: 1.9, PBD: false, PBW: false },
      tonyNote: 'Xcel Energy Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BLDP', name: 'Ballard Power Systems Inc', easyScore: 2, avgWeight: 1.88, proScore: 0.94, coverage: 0.5,
      price: 5.01, weeklyPrices: [6.30, 6.38, 6.06, 6.07, 5.01], weeklyChange: -20.4, sortRank: 0, periodReturns: { '1M': 15.8, '6M': 77.8, '1Y': 253.2 },
      priceHistory: { '1W': [6.3, 6.38, 6.06, 6.07, 5.01], '1M': [4.33, 4.78, 4.7, 4.13, 4.17, 4.14, 4.13, 4.45, 4.33, 4.18, 4.76, 5.43, 5.54, 5.94, 6.09, 6.29, 6.3, 6.38, 6.06, 6.07, 5.01], '6M': [2.82, 2.72, 2.61, 2.57, 2.79, 2.77, 2.61, 2.58, 2.22, 2.16, 2.12, 2.21, 2.1, 2.15, 2.61, 2.54, 2.41, 2.64, 2.9, 3.38, 3.4, 4.7, 4.13, 5.43, 6.29, 5.01], '1Y': [1.42, 1.67, 1.52, 1.46, 1.7, 1.86, 1.94, 2.13, 1.79, 1.8, 2, 2.01, 2.02, 1.94, 2.17, 2.88, 2.74, 3.65, 3.49, 3.64, 3.44, 3.57, 3.5, 3.03, 2.71, 2.68, 2.8, 2.63, 2.65, 2.54, 2.71, 2.75, 2.61, 2.58, 2.22, 2.16, 2.12, 2.21, 2.1, 2.42, 2.48, 2.45, 2.48, 2.81, 2.96, 3.38, 3.4, 4.7, 4.13, 5.43, 6.29, 5.01] },
      velocityScore: { '1D': 0, '1W': -50.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2B', pe: null, revenueGrowth: 26, eps: -0.27, grossMargin: 11, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: 1.31, PBW: 2.45 },
      tonyNote: 'Ballard Power Systems is a hydrogen fuel cell technology company. It appears in Electrification ETFs as a long-duration bet on hydrogen as a zero-carbon fuel for heavy industry and transit. Revenue is small, the company is pre-profitability, and the weight is minimal — this is a thematic placeholder allocation, not a fundamental position.',
    },
    {
      ticker: 'OGE', name: 'OGE ENERGY CORP', easyScore: 1, avgWeight: 3.67, proScore: 0.92, coverage: 0.25,
      price: 47.58, weeklyPrices: [45.66, 46.61, 46.40, 46.97, 47.58], weeklyChange: 4.2, sortRank: 0, periodReturns: { '1M': -0.5, '6M': 9.7, '1Y': 8.4 },
      priceHistory: { '1W': [45.66, 46.61, 46.4, 46.97, 47.58], '1M': [47.84, 47.73, 47.33, 47.35, 47.4, 47.34, 47.51, 46.27, 47.31, 48.05, 47.9, 48.1, 48.54, 48.41, 48.18, 47.23, 45.66, 46.61, 46.4, 46.97, 47.58], '6M': [43.38, 43.05, 42.5, 42.9, 42.59, 42.97, 43.7, 43.51, 43.65, 45.24, 46.73, 48.58, 48.26, 47.08, 47.78, 47.36, 48.26, 49.86, 48.62, 47.53, 48.8, 47.33, 47.51, 48.1, 47.23, 47.58], '1Y': [43.9, 44.64, 43.96, 44.04, 43.99, 44.48, 45.12, 44.86, 45.33, 45.37, 45.09, 45.55, 44.66, 43.46, 44.35, 44.28, 45.9, 46.15, 45.96, 46.65, 46.37, 44.14, 44.32, 44.76, 44.3, 44.86, 42.88, 43.2, 43.03, 43.03, 42.16, 43.48, 43.7, 43.51, 43.65, 45.24, 46.73, 48.58, 48.26, 47.86, 47.37, 47.67, 48.76, 49.45, 48.16, 47.53, 48.8, 47.33, 47.51, 48.1, 47.23, 47.58] },
      velocityScore: { '1D': 1.1, '1W': -57.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 21.1, revenueGrowth: 1, eps: 2.25, grossMargin: 44, dividendYield: 3.62,
      etfPresence: { POW: false, VOLT: 3.67, PBD: false, PBW: false },
      tonyNote: 'OGE Energy is a regional Oklahoma utility held in Electrification ETFs. Revenue is regulated, dividend yield is the primary return driver, and the load growth thesis is less prominent than for AEP or NEE. The ETF allocation is defensive — utilities in electrification ETFs serve as yield anchors alongside the higher-growth infrastructure names.',
    },
    {
      ticker: 'MOD', name: 'MODINE MANUFACTURING CO', easyScore: 1, avgWeight: 3.58, proScore: 0.9, coverage: 0.25,
      price: 280.36, weeklyPrices: [288.52, 306.89, 302.03, 301.21, 280.36], weeklyChange: -2.83, sortRank: 0, periodReturns: { '1M': 3.2, '6M': 72.1, '1Y': 203.8 },
      priceHistory: { '1W': [288.52, 306.89, 302.03, 301.21, 280.36], '1M': [271.6, 274.22, 269.65, 273, 284.8, 279.2, 292.16, 271.26, 247.13, 244.49, 257.33, 250.11, 260.52, 295.88, 279.93, 278.91, 288.52, 306.89, 302.03, 301.21, 280.36], '6M': [162.87, 139.88, 136.16, 136.19, 129.97, 127.07, 143.68, 146.9, 199.53, 219.5, 218.54, 228.9, 204.77, 200.63, 200.42, 232.89, 222.97, 241.52, 235.25, 250.57, 254.63, 269.65, 292.16, 250.11, 278.91, 280.36], '1Y': [92.27, 97.07, 96.72, 101.34, 99.9, 91.74, 93.71, 103.71, 133.7, 136.2, 138.72, 140.37, 136.13, 138.65, 152.4, 151.23, 141.19, 153.92, 149.65, 157.73, 161.27, 153.21, 156.39, 132.02, 143.04, 158.66, 153.89, 142.27, 137.03, 135.15, 119.68, 125.05, 143.68, 146.9, 199.53, 219.5, 218.54, 228.9, 204.77, 191.93, 200.87, 215.81, 219.32, 241.46, 243.71, 250.57, 254.63, 269.65, 292.16, 250.11, 278.91, 280.36] },
      velocityScore: { '1D': 0, '1W': -52.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 124.1, revenueGrowth: 48, eps: 2.26, grossMargin: 23, dividendYield: null,
      etfPresence: { POW: false, VOLT: 3.58, PBD: false, PBW: false },
      tonyNote: 'Modine Manufacturing is a thermal management company — heat exchangers and liquid cooling systems for data centers and industrial applications. It holds a position in Industrials ETFs as a direct beneficiary of the AI server cooling challenge. Revenue grew materially as data center customers upgraded from air to liquid cooling; the growth runway remains substantial.',
    },
    {
      ticker: 'ETR', name: 'ENTERGY CORP', easyScore: 1, avgWeight: 3.53, proScore: 0.88, coverage: 0.25,
      price: 110.84, weeklyPrices: [104.97, 107.60, 108.66, 109.28, 110.84], weeklyChange: 5.59, sortRank: 0, periodReturns: { '1M': -5.6, '6M': 17.6, '1Y': 35.5 },
      priceHistory: { '1W': [104.97, 107.6, 108.66, 109.28, 110.84], '1M': [117.36, 112.96, 112.02, 111.59, 112.97, 112.35, 112.9, 109.03, 109.58, 110.55, 111.93, 112.27, 112.4, 111.97, 111.51, 109.05, 104.97, 107.6, 108.66, 109.28, 110.84], '6M': [94.22, 92.35, 91.5, 93.13, 93.32, 94.37, 95.73, 96.48, 96.83, 100.2, 103.33, 105.73, 105.48, 103.82, 104.26, 102.76, 113.58, 117.44, 115.51, 113.92, 117.91, 112.02, 112.9, 112.27, 109.05, 110.84], '1Y': [81.8, 83.29, 80.97, 82.48, 81.72, 82.79, 87.03, 88.16, 89.67, 90.47, 89.12, 89.33, 88.09, 86.83, 90.19, 89.24, 93.55, 97.48, 95.72, 96.71, 96.58, 96.09, 97.19, 95.05, 93.7, 94.59, 92.9, 93.75, 91.99, 93.37, 91.31, 95.17, 95.73, 96.48, 96.83, 100.2, 103.33, 105.73, 105.48, 104.52, 103.94, 102.86, 114.9, 116.47, 115.52, 113.92, 117.91, 112.02, 112.9, 112.27, 109.05, 110.84] },
      velocityScore: { '1D': 0, '1W': -57.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$51B', pe: 28.3, revenueGrowth: 12, eps: 3.92, grossMargin: 47, dividendYield: 2.34,
      etfPresence: { POW: false, VOLT: 3.53, PBD: false, PBW: false },
      tonyNote: 'Entergy is a regulated utility operating in the Gulf Coast region, held in Electrification ETFs for income and load growth from industrial and data center customers. The dividend is well-covered and the rate base is growing as Louisiana and Texas attract manufacturing reshoring and technology infrastructure investment.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 3, avgWeight: 4.37, proScore: 2.62, coverage: 0.6,
      price: 291.24, weeklyPrices: [288.12, 299.07, 299.73, 300.06, 291.24], weeklyChange: 1.08, sortRank: 0, periodReturns: { '1M': -1.2, '6M': 155.4, '1Y': 378.5 },
      priceHistory: { '1W': [288.12, 299.07, 299.73, 300.06, 291.24], '1M': [294.69, 320.3, 305.93, 309.39, 322.05, 300.84, 296.98, 292.65, 266.8, 261.58, 271.05, 270.75, 279.22, 291.97, 295.94, 284.42, 288.12, 299.07, 299.73, 300.06, 291.24], '6M': [114.04, 112.36, 110.97, 111.96, 120, 133.04, 140.62, 147.81, 175.77, 197.45, 178.79, 176.96, 167.67, 171.73, 167.41, 194.85, 184.68, 230.81, 232.81, 252.18, 277.27, 305.93, 296.98, 270.75, 284.42, 291.24], '1Y': [60.87, 64.44, 58.47, 70.97, 71.96, 70.19, 73.64, 82.79, 75.89, 81.28, 84.88, 87.65, 88.72, 90.8, 100.68, 100.97, 101.01, 103.9, 105.33, 116.4, 121.66, 127.8, 121.79, 109.89, 94.02, 106.53, 114.29, 109.31, 112.18, 109.16, 118.62, 133.76, 140.62, 147.81, 175.77, 197.45, 178.79, 176.96, 167.67, 171.19, 175.13, 174.8, 182.6, 230.94, 241.01, 252.18, 277.27, 305.93, 296.98, 270.75, 284.42, 291.24] },
      velocityScore: { '1D': 21.9, '1W': 44.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 56.8, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { AIRR: 2.63, PRN: 2.41, RSHO: 8.08, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 6.14, proScore: 2.45, coverage: 0.4,
      price: 921.09, weeklyPrices: [845.39, 875.52, 957.03, 993.74, 921.09], weeklyChange: 8.95, sortRank: 0, periodReturns: { '1M': 14.3, '6M': 183.3, '1Y': 371.8 },
      priceHistory: { '1W': [845.39, 875.52, 957.03, 993.74, 921.09], '1M': [806, 886.22, 811.41, 844.8, 868.18, 854.28, 889.03, 848.84, 770.76, 728.29, 752, 733.77, 732.94, 783.53, 782.12, 860.84, 845.39, 875.52, 957.03, 993.74, 921.09], '6M': [325.1, 315.15, 308.58, 310.79, 317.41, 321.6, 362.53, 373.52, 360.16, 433.91, 415.13, 433.34, 398.87, 420.6, 421.23, 452.92, 421.29, 435.65, 441.1, 495.67, 515.62, 811.41, 889.03, 733.77, 860.84, 921.09], '1Y': [195.24, 204.32, 217.97, 231.51, 237, 241.31, 247.65, 268.14, 263.05, 302.69, 275.35, 279.58, 278.53, 286.71, 322.9, 367.39, 341.1, 352.78, 355.27, 369.01, 379.08, 377.9, 377.84, 338.66, 315.1, 320.51, 324.62, 319.12, 313.04, 307.68, 312.24, 319.27, 362.53, 373.52, 360.16, 433.91, 415.13, 433.34, 398.87, 404.59, 431.78, 415.93, 416.34, 446.36, 463.65, 495.67, 515.62, 811.41, 889.03, 733.77, 860.84, 921.09] },
      velocityScore: { '1D': 2.1, '1W': -53.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$28B', pe: 82, revenueGrowth: 92, eps: 11.23, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 7.18, PRN: 5.09, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.03, proScore: 2.01, coverage: 0.4,
      price: 915.75, weeklyPrices: [865.36, 909.81, 926.18, 940.48, 915.75], weeklyChange: 5.82, sortRank: 0, periodReturns: { '1M': 1.2, '6M': 51.8, '1Y': 162.4 },
      priceHistory: { '1W': [865.36, 909.81, 926.18, 940.48, 915.75], '1M': [904.59, 926.93, 895.69, 897.45, 926.79, 902.3, 920.22, 888.31, 863.95, 860.15, 872.56, 865.95, 879.89, 908.55, 909.93, 875.87, 865.36, 909.81, 926.18, 940.48, 915.75], '6M': [603.17, 597.89, 576.22, 578.61, 623.09, 636.53, 645.38, 643.28, 691.82, 775, 760.53, 752.93, 706.08, 707.59, 693.62, 719.04, 730.32, 787.07, 772.66, 835.24, 890.11, 895.69, 920.22, 865.95, 875.87, 915.75], '1Y': [348.96, 360.96, 360.52, 384.71, 391.51, 405.77, 410.07, 433.75, 428.69, 416.52, 407.79, 435.67, 419.04, 422.78, 435.94, 472.1, 471.61, 495.38, 504.76, 531.18, 522.73, 577.26, 563.1, 554.03, 550.43, 568.06, 596.5, 589.76, 582.41, 577.39, 596.52, 638.75, 645.38, 643.28, 691.82, 775, 760.53, 752.93, 706.08, 700.69, 688.65, 703.19, 717.22, 790.66, 794.65, 835.24, 890.11, 895.69, 920.22, 865.95, 875.87, 915.75] },
      velocityScore: { '1D': 0.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$422B', pe: 45.5, revenueGrowth: 22, eps: 20.13, grossMargin: 29, dividendYield: 0.64,
      etfPresence: { AIRR: false, PRN: 3.33, RSHO: 6.72, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.53, proScore: 1.81, coverage: 0.4,
      price: 1882.63, weeklyPrices: [1787.88, 1883.26, 1850.04, 1914.65, 1882.63], weeklyChange: 5.3, sortRank: 0, periodReturns: { '1M': -4.3, '6M': 88, '1Y': 277.2 },
      priceHistory: { '1W': [1787.88, 1883.26, 1850.04, 1914.65, 1882.63], '1M': [1967.24, 2011.49, 1942.02, 1952.37, 2032.98, 2034.63, 2042.36, 1992.74, 1854.43, 1825.5, 1835.51, 1835.33, 1828.25, 1883.56, 1867.09, 1828.21, 1787.88, 1883.26, 1850.04, 1914.65, 1882.63], '6M': [1001.48, 967.95, 940.74, 950.67, 1035.11, 1073.14, 1148, 1169.05, 1119.81, 1338.65, 1373.52, 1438.23, 1348.22, 1407.32, 1423, 1470.64, 1428.52, 1574.45, 1605.97, 1773.91, 1840.25, 1942.02, 2042.36, 1835.33, 1828.21, 1882.63], '1Y': [499.13, 501.25, 500.02, 535, 541.48, 542.95, 544.95, 688.74, 695.3, 691.76, 680.86, 689.48, 703.38, 715.87, 782.05, 821.62, 801.8, 825.42, 845.99, 836.75, 981.66, 965.58, 955.26, 909.6, 894.08, 961.2, 989.48, 968.48, 950.79, 946.93, 1035.12, 1053.1, 1148, 1169.05, 1119.81, 1338.65, 1373.52, 1438.23, 1348.22, 1373.76, 1444.6, 1358.66, 1417.19, 1592.84, 1650.47, 1773.91, 1840.25, 1942.02, 2042.36, 1835.33, 1828.21, 1882.63] },
      velocityScore: { '1D': 2.3, '1W': -58.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 54.3, revenueGrowth: 1, eps: 34.66, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: 4.31, PRN: 4.75, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'TKR', name: 'TKR', easyScore: 1, avgWeight: 8.99, proScore: 1.8, coverage: 0.2,
      price: 130.42, weeklyPrices: [126.54, 131.90, 131.82, 133.66, 130.42], weeklyChange: 3.07, sortRank: 0, periodReturns: { '1M': 19, '6M': 56.7, '1Y': 84.3 },
      priceHistory: { '1W': [126.54, 131.9, 131.82, 133.66, 130.42], '1M': [109.63, 119.7, 116.34, 117.97, 117.39, 115.74, 116.74, 114.49, 112.73, 109.36, 117.2, 118.93, 119.95, 127.42, 127.16, 127.98, 126.54, 131.9, 131.82, 133.66, 130.42], '6M': [83.21, 87.38, 85.26, 86.33, 90.95, 91.68, 93.89, 93.4, 98.99, 108.82, 107.11, 109.88, 103.05, 103.33, 98.23, 101.9, 102.06, 106.92, 103.92, 108.7, 110.89, 116.34, 116.74, 118.93, 127.98, 130.42], '1Y': [70.75, 72.06, 70.56, 73.21, 75.52, 77.3, 78.63, 81.66, 73.5, 74.39, 76, 78.99, 77.23, 77.15, 77.38, 76.84, 75.23, 76.76, 72.55, 75.1, 78.12, 78.51, 78.99, 76.41, 77.48, 79.95, 83.44, 87.01, 86.34, 85.81, 88.05, 91.91, 93.89, 93.4, 98.99, 108.82, 107.11, 109.88, 103.05, 99.7, 97.44, 99.06, 98.92, 106.75, 107.66, 108.7, 110.89, 116.34, 116.74, 118.93, 127.98, 130.42] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 29.6, revenueGrowth: 8, eps: 4.4, grossMargin: 31, dividendYield: 1.08,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.99, IDEF: false, BILT: false },
      tonyNote: 'TKR appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 9.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, avgWeight: 4.28, proScore: 1.71, coverage: 0.4,
      price: 737.6, weeklyPrices: [646.89, 663.14, 686.37, 689.43, 737.60], weeklyChange: 14.02, sortRank: 0, periodReturns: { '1M': 2.4, '6M': 135.1, '1Y': 213.5 },
      priceHistory: { '1W': [646.89, 663.14, 686.37, 689.43, 737.6], '1M': [720, 727.54, 690, 680.26, 683.52, 719.92, 740.91, 722.31, 664.76, 639.58, 630.5, 644.64, 656.35, 670.66, 673.51, 667.02, 646.89, 663.14, 686.37, 689.43, 737.6], '6M': [313.7, 319.91, 325.59, 320.73, 330.42, 314.09, 397.42, 358.87, 354.14, 422.5, 432.18, 452.53, 430.25, 472.86, 469.81, 437.48, 571.38, 609.29, 601.83, 656.79, 669.98, 690, 740.91, 644.64, 667.02, 737.6], '1Y': [235.25, 222.12, 203.36, 219.74, 209.5, 220.73, 207.07, 235.91, 225.27, 239.02, 223.99, 222.16, 228.22, 203.84, 238.75, 268.34, 271.07, 263.53, 294.72, 290.27, 296.55, 306.21, 311.58, 351.64, 335.33, 363.73, 319.31, 317.58, 337.9, 315.44, 337.03, 317.76, 397.42, 358.87, 354.14, 422.5, 432.18, 452.53, 430.25, 459.3, 479.9, 410.85, 575.16, 603.84, 597.88, 656.79, 669.98, 690, 740.91, 644.64, 667.02, 737.6] },
      velocityScore: { '1D': -0.6, '1W': -59.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 64.8, revenueGrowth: 50, eps: 11.38, grossMargin: 21, dividendYield: 0.29,
      etfPresence: { AIRR: 4.13, PRN: 4.42, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Argan Inc is an engineering and construction company for power generation facilities — natural gas and renewable power plants. It appears in Industrials ETFs because power plant construction is one of the fastest-growing categories in U.S. infrastructure spending, driven by data center load additions that the grid cannot currently support.',
    },
    {
      ticker: 'CGNX', name: 'CGNX', easyScore: 1, avgWeight: 7.55, proScore: 1.51, coverage: 0.2,
      price: 61.6, weeklyPrices: [64.64, 66.08, 66.06, 64.67, 61.60], weeklyChange: -4.7, sortRank: 0, periodReturns: { '1M': 4.7, '6M': 60.3, '1Y': 103.7 },
      priceHistory: { '1W': [64.64, 66.08, 66.06, 64.67, 61.6], '1M': [58.83, 62.26, 65.92, 65.66, 67.26, 63.64, 66.09, 64.26, 61.91, 60.65, 63.37, 64.27, 66.09, 68.33, 66.7, 65.85, 64.64, 66.08, 66.06, 64.67, 61.6], '6M': [38.42, 35.65, 36.8, 36.47, 38.6, 39.63, 40.41, 39.05, 40.73, 43.03, 55.94, 55.36, 51.25, 50.99, 49.87, 51.61, 49.34, 53.91, 54.97, 54.1, 55.51, 65.92, 66.09, 64.27, 65.85, 61.6], '1Y': [30.24, 30.6, 29.61, 31.46, 31.85, 33.78, 33.73, 34.08, 40.47, 40.91, 42.7, 44.76, 43.94, 44.61, 44.16, 46.54, 45.55, 46.87, 43.74, 47.31, 48.35, 41.39, 39.27, 36.77, 36.89, 37.95, 38.42, 34.8, 36.58, 36.37, 37.93, 40.06, 40.41, 39.05, 40.73, 43.03, 55.94, 55.36, 51.25, 48.77, 50.25, 49.33, 49.17, 53.41, 55.5, 54.1, 55.51, 65.92, 66.09, 64.27, 65.85, 61.6] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 72.5, revenueGrowth: 24, eps: 0.85, grossMargin: 68, dividendYield: 0.52,
      etfPresence: { AIRR: false, PRN: false, RSHO: 7.55, IDEF: false, BILT: false },
      tonyNote: 'CGNX appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 7.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 7.51, proScore: 1.5, coverage: 0.2,
      price: 181.75, weeklyPrices: [174.41, 174.26, 172.55, 179.41, 181.75], weeklyChange: 4.21, sortRank: 0, periodReturns: { '1M': 5.1, '6M': 6.2, '1Y': 30.7 },
      priceHistory: { '1W': [174.41, 174.26, 172.55, 179.41, 181.75], '1M': [172.87, 176.74, 176.78, 176.09, 178.61, 178.11, 175.68, 171.18, 175.95, 174.49, 174.85, 175.98, 177.01, 178.97, 176.59, 179.66, 174.41, 174.26, 172.55, 179.41, 181.75], '6M': [171.1, 178.66, 182.01, 184.42, 190.4, 194.08, 197.5, 199.46, 196.74, 196.51, 205.41, 197.63, 203.86, 207.26, 204.56, 195, 194.72, 203.19, 195.85, 179.3, 176.07, 176.78, 175.68, 175.98, 179.66, 181.75], '1Y': [139.07, 140.98, 146.64, 144.66, 145.92, 149.28, 151.56, 156.88, 156.81, 154.86, 154.09, 156.24, 158.6, 154.22, 158.37, 159.43, 163.63, 168.8, 158.85, 160.71, 178.65, 178.5, 176.97, 175.57, 169.68, 168.02, 171.52, 182.11, 185.68, 184.01, 185.73, 198.84, 197.5, 199.46, 196.74, 196.51, 205.41, 197.63, 203.86, 203.04, 200.73, 192.85, 196.21, 201.56, 196.42, 179.3, 176.07, 176.78, 175.68, 175.98, 179.66, 181.75] },
      velocityScore: { '1D': 2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$245B', pe: 34.1, revenueGrowth: 9, eps: 5.33, grossMargin: 20, dividendYield: 1.54,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 7.51, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 7.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 3, avgWeight: 2.42, proScore: 1.45, coverage: 0.6,
      price: 228.68, weeklyPrices: [220.92, 230.08, 234.08, 236.14, 228.68], weeklyChange: 3.51, sortRank: 0, periodReturns: { '1M': 10, '6M': 9.6, '1Y': 46.4 },
      priceHistory: { '1W': [220.92, 230.08, 234.08, 236.14, 228.68], '1M': [207.81, 212.74, 205.27, 202.84, 203.24, 203.79, 203.5, 200.99, 200.47, 195.79, 205.55, 205.39, 207.8, 219.08, 215.34, 216.66, 220.92, 230.08, 234.08, 236.14, 228.68], '6M': [208.67, 219.94, 203.17, 205.66, 208.63, 211.07, 220.86, 211.34, 212.76, 233.46, 241.01, 231.59, 211.9, 210.15, 202.46, 201.27, 203.16, 215.54, 215.27, 223.96, 218.91, 205.27, 203.5, 205.39, 216.66, 228.68], '1Y': [156.24, 158.76, 154.42, 167.15, 169.97, 174.38, 174.44, 180.82, 196.36, 201.57, 186.39, 190.47, 187.11, 189.1, 186.95, 189.75, 184.24, 190.89, 180.71, 184.97, 194.03, 223.89, 221.92, 211.43, 204.57, 208.53, 206.16, 218.13, 207.18, 203.51, 208, 209.78, 220.86, 211.34, 212.76, 233.46, 241.01, 231.59, 211.9, 202.65, 202.36, 200.45, 197.29, 215.97, 223.52, 223.96, 218.91, 205.27, 203.5, 205.39, 216.66, 228.68] },
      velocityScore: { '1D': 28.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 43.8, revenueGrowth: 17, eps: 5.22, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.64, PRN: 1.64, RSHO: 3.97, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 3 of 5 Industrials ETFs (60% coverage) with average weight 2.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MTZ', name: 'MasTec, Inc.', easyScore: 2, avgWeight: 3.4, proScore: 1.36, coverage: 0.4,
      price: 368.95, weeklyPrices: [362.09, 366.30, 369.66, 374.73, 368.95], weeklyChange: 1.89, sortRank: 0, periodReturns: { '1M': -15.7, '6M': 68.1, '1Y': 131.3 },
      priceHistory: { '1W': [362.09, 366.3, 369.66, 374.73, 368.95], '1M': [437.51, 433.28, 412.27, 414.29, 421.37, 423.79, 434.77, 414.9, 385.58, 385, 384.21, 388.77, 382.11, 390.75, 387.52, 378.37, 362.09, 366.3, 369.66, 374.73, 368.95], '6M': [219.52, 221.01, 218.18, 222.76, 236.35, 226.07, 243.8, 244.75, 235.44, 264.99, 275.61, 289.96, 295.3, 303.73, 303.07, 323.55, 333.79, 357.37, 358.14, 382.88, 394.05, 412.27, 434.77, 388.77, 378.37, 368.95], '1Y': [159.52, 163.3, 163.71, 171.99, 171.98, 172.38, 175.33, 186.19, 174.05, 181.3, 177.8, 176.97, 181.69, 176.75, 193.25, 207.07, 209.55, 216.8, 203.26, 205.21, 211.88, 204.16, 200.44, 192.22, 193.08, 212.14, 220.58, 220.37, 224.58, 220.33, 235.75, 226, 243.8, 244.75, 235.44, 264.99, 275.61, 289.96, 295.3, 296.95, 312.72, 306.74, 336.25, 361.22, 370.89, 382.88, 394.05, 412.27, 434.77, 388.77, 378.37, 368.95] },
      velocityScore: { '1D': null, '1W': -51.1, '1M': null, '6M': null }, isNew: true,
      marketCap: '$29B', pe: 64.7, revenueGrowth: 35, eps: 5.7, grossMargin: 13, dividendYield: null,
      etfPresence: { AIRR: 3.81, PRN: 2.98, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'MasTec is an infrastructure construction company — fiber networks, power transmission, renewable energy installations. Revenue grew strongly as utility and telecom capex accelerated. The ETF weight in Industrials reflects MasTec\'s breadth across the electrification, connectivity, and clean energy build-outs that are reshaping U.S. infrastructure spending.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.36, proScore: 1.34, coverage: 0.4,
      price: 314.11, weeklyPrices: [300.98, 308.31, 313.39, 313.67, 314.11], weeklyChange: 4.36, sortRank: 0, periodReturns: { '1M': 2.8, '6M': 21.8, '1Y': 37.1 },
      priceHistory: { '1W': [300.98, 308.31, 313.39, 313.67, 314.11], '1M': [305.48, 315.39, 310.37, 308.87, 310.55, 310.87, 315.72, 307.17, 305.22, 302.64, 306.25, 305.66, 307.1, 311.33, 312.65, 303.81, 300.98, 308.31, 313.39, 313.67, 314.11], '6M': [257.91, 261.74, 262.41, 263.4, 265.39, 278.77, 284, 256.26, 289.94, 290.31, 281.13, 283.5, 274.97, 270.13, 258.51, 266, 269.36, 286.41, 284.39, 294.4, 305.75, 310.37, 315.72, 305.66, 303.81, 314.11], '1Y': [229.13, 230.24, 227.19, 231.69, 244.15, 256.98, 260.2, 272.13, 264.18, 263.13, 255.01, 267.11, 263.58, 266.22, 262.83, 265.48, 258.44, 259.04, 246.74, 249.57, 260.29, 257.09, 258.92, 248.96, 248.92, 256.44, 257.25, 259.81, 263.48, 261.16, 260.8, 277.62, 284, 256.26, 289.94, 290.31, 281.13, 283.5, 274.97, 259.88, 256.58, 260.51, 267.12, 289.01, 291.03, 294.4, 305.75, 310.37, 315.72, 305.66, 303.81, 314.11] },
      velocityScore: { '1D': -0.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 29.7, revenueGrowth: 7, eps: 10.57, grossMargin: 30, dividendYield: 0.65,
      etfPresence: { AIRR: 1.69, PRN: false, RSHO: 5.03, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LMT', name: 'LOCKHEED MARTIN CORP', easyScore: 1, avgWeight: 6.56, proScore: 1.31, coverage: 0.2,
      price: 523.22, weeklyPrices: [516.50, 513.43, 512.03, 519.05, 523.22], weeklyChange: 1.3, sortRank: 0, periodReturns: { '1M': 2.8, '6M': 15.7, '1Y': 9.5 },
      priceHistory: { '1W': [516.5, 513.43, 512.03, 519.05, 523.22], '1M': [508.93, 514.26, 512.41, 506.51, 512.25, 519.94, 520.41, 516.01, 528.31, 526.63, 522.59, 522.79, 533.24, 532.9, 531.14, 530.45, 516.5, 513.43, 512.03, 519.05, 523.22], '6M': [452.2, 480.25, 474.13, 488.87, 522.04, 558.3, 586.23, 597.27, 602.76, 628.7, 666.51, 641.63, 655, 649.47, 642.28, 624.2, 617.64, 623.87, 607.49, 529.79, 517.97, 512.41, 520.41, 522.79, 530.45, 523.22], '1Y': [478.03, 469.27, 470.56, 458.59, 469.06, 473.57, 460.53, 421.17, 421.01, 425.63, 437.56, 446.2, 455.63, 459.11, 473.25, 480.39, 491.98, 514.24, 503.83, 505.9, 485.41, 491.88, 458.35, 465.77, 460.78, 439.19, 465.38, 484.42, 483.57, 488, 496.87, 572.7, 586.23, 597.27, 602.76, 628.7, 666.51, 641.63, 655, 652.83, 637.51, 627.33, 622.79, 613.72, 592.19, 529.79, 517.97, 512.41, 520.41, 522.79, 530.45, 523.22] },
      velocityScore: { '1D': -0.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$121B', pe: 25.3, revenueGrowth: 0, eps: 20.66, grossMargin: 10, dividendYield: 2.66,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 6.56, BILT: false },
      tonyNote: 'LOCKHEED MARTIN CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 6.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DY', name: 'Dycom Industries, Inc.', easyScore: 2, avgWeight: 3.19, proScore: 1.28, coverage: 0.4,
      price: 476.13, weeklyPrices: [493.89, 485.97, 484.11, 488.57, 476.13], weeklyChange: -3.6, sortRank: 0, periodReturns: { '1M': 4.2, '6M': 35.3, '1Y': 100.2 },
      priceHistory: { '1W': [493.89, 485.97, 484.11, 488.57, 476.13], '1M': [457.14, 457.78, 426.36, 428.31, 430.95, 444.81, 450.98, 437.37, 419.66, 413.35, 412.78, 414.43, 411.2, 420.47, 529.13, 510, 493.89, 485.97, 484.11, 488.57, 476.13], '6M': [351.8, 345.78, 344.38, 343.5, 350.31, 356.9, 375.59, 369.99, 363.2, 429.68, 419.4, 420.51, 369.98, 366.95, 352.19, 353.52, 347.45, 391.62, 400.38, 414.35, 414.1, 426.36, 450.98, 414.43, 510, 476.13], '1Y': [237.79, 235.54, 234, 245.71, 252.13, 253.63, 256.73, 264.69, 263.29, 279.13, 269.36, 257.42, 252.47, 252.5, 255.59, 281.14, 294.01, 288.66, 290.9, 296.31, 291.96, 287.79, 286.41, 291.2, 326.49, 350.06, 348.91, 351.19, 347.11, 342.66, 354.53, 353.99, 375.59, 369.99, 363.2, 429.68, 419.4, 420.51, 369.98, 357.25, 355.6, 336.77, 348.15, 393, 399.45, 414.35, 414.1, 426.36, 450.98, 414.43, 510, 476.13] },
      velocityScore: { '1D': null, '1W': -55.4, '1M': null, '6M': null }, isNew: true,
      marketCap: '$14B', pe: 45.5, revenueGrowth: 56, eps: 10.46, grossMargin: 20, dividendYield: null,
      etfPresence: { AIRR: 3.67, PRN: 2.71, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Dycom Industries is a specialty contractor for telecommunications infrastructure — fiber deployment, 5G network builds, and utility infrastructure. It appears in Industrials ETFs as a direct play on broadband and connectivity infrastructure investment. Revenue grew as AT&T, Comcast, and Verizon accelerated fiber rollouts; the ETF allocation is a structural, multiyear conviction position.',
    },
    {
      ticker: 'ETN', name: 'ETN', easyScore: 1, avgWeight: 5.85, proScore: 1.17, coverage: 0.2,
      price: 400.9, weeklyPrices: [400.08, 417.62, 421.21, 418.61, 400.90], weeklyChange: 0.2, sortRank: 0, periodReturns: { '1M': -2.4, '6M': 18.7, '1Y': 22.8 },
      priceHistory: { '1W': [400.08, 417.62, 421.21, 418.61, 400.9], '1M': [410.86, 421.39, 399.15, 401.51, 419, 406.94, 408.1, 399.44, 381.87, 371.88, 379.69, 381.51, 391.35, 403.13, 406.37, 400.6, 400.08, 417.62, 421.21, 418.61, 400.9], '6M': [337.66, 331.98, 317.8, 321.45, 332.97, 332.38, 337.96, 347.32, 365, 396.09, 377.32, 374.59, 354.79, 355.79, 360.54, 375, 365.56, 400.44, 392.73, 424.5, 433.01, 399.15, 408.1, 381.51, 400.6, 400.9], '1Y': [326.48, 330.34, 331.23, 353.23, 358.49, 360.29, 373.66, 392.17, 381.29, 362.84, 351.03, 347.61, 349.14, 349.49, 375.54, 378.31, 367.15, 380.02, 375.37, 377.69, 376.29, 381.56, 373.77, 352.39, 331.71, 339.71, 343.39, 333.21, 320.39, 320.86, 322.67, 331.14, 337.96, 347.32, 365, 396.09, 377.32, 374.59, 354.79, 348.64, 360.23, 357.1, 361.1, 403, 406.21, 424.5, 433.01, 399.15, 408.1, 381.51, 400.6, 400.9] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$156B', pe: 39.3, revenueGrowth: 17, eps: 10.21, grossMargin: 37, dividendYield: 1.05,
      etfPresence: { AIRR: false, PRN: false, RSHO: 5.85, IDEF: false, BILT: false },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 2, avgWeight: 2.89, proScore: 1.15, coverage: 0.4,
      price: 33.22, weeklyPrices: [46.46, 48.09, 43.13, 43.53, 33.22], weeklyChange: -28.51, sortRank: 0, periodReturns: { '1M': -10.5, '6M': 160.1, '1Y': 457.3 },
      priceHistory: { '1W': [46.46, 48.09, 43.13, 43.53, 33.22], '1M': [37.13, 39.69, 35.24, 39.04, 41.84, 40.74, 43.04, 41.62, 41.61, 41.59, 42.66, 42.48, 44.35, 48.32, 50.48, 51.14, 46.46, 48.09, 43.13, 43.53, 33.22], '6M': [12.77, 18.24, 19.18, 19.87, 21.84, 25.32, 26.38, 27.88, 21.77, 21.65, 25.11, 25.6, 24.59, 25.44, 24.81, 35.37, 30.71, 34.23, 39.89, 38.29, 36.97, 35.24, 43.04, 42.48, 51.14, 33.22], '1Y': [5.96, 5.46, 5.03, 6.07, 6.83, 6.2, 7.03, 6.65, 6.18, 6.4, 6.78, 6.8, 7.09, 9.66, 9.86, 11.11, 12.79, 15.24, 15.25, 13.56, 13.61, 13.45, 12.81, 11.4, 11.16, 11.7, 12.95, 18.05, 20.6, 19.74, 22.61, 26.73, 26.38, 27.88, 21.77, 21.65, 25.11, 25.6, 24.59, 24.97, 26.96, 32.4, 35.88, 34.67, 38.48, 38.29, 36.97, 35.24, 43.04, 42.48, 51.14, 33.22] },
      velocityScore: { '1D': 0, '1W': -70.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: null, revenueGrowth: 42, eps: -1.16, grossMargin: 56, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 4.64, RSHO: false, IDEF: 1.13, BILT: false },
      tonyNote: 'Planet Labs is a satellite earth observation company. It holds a speculative position in Industrials ETFs as a data infrastructure name — providing satellite imagery and analytics that support agricultural, energy, and government decision-making. Revenue is growing from a small base; the ETF weight is minimal and the position is thematic.',
    },
    {
      ticker: 'TTMI', name: 'TTM Technologies Inc', easyScore: 1, avgWeight: 5.75, proScore: 1.15, coverage: 0.2,
      price: 173.61, weeklyPrices: [172.44, 179.62, 189.60, 184.84, 173.61], weeklyChange: 0.68, sortRank: 0, periodReturns: { '1M': 8.8, '6M': 135.4, '1Y': 440.7 },
      priceHistory: { '1W': [172.44, 179.62, 189.6, 184.84, 173.61], '1M': [159.58, 164.64, 153.77, 157.31, 162.99, 168.82, 171.87, 167.35, 158.86, 161.41, 169.36, 174.55, 189.92, 196.95, 190.67, 173.72, 172.44, 179.62, 189.6, 184.84, 173.61], '6M': [73.74, 73.43, 70.38, 71.21, 70.45, 93.24, 99.87, 97.99, 96.22, 91.9, 100.39, 107.56, 98.95, 95.44, 95.31, 108, 97.08, 107.53, 116.93, 132.98, 158.22, 153.77, 171.87, 174.55, 173.72, 173.61], '1Y': [32.11, 36.42, 36.69, 40.25, 41.88, 44.3, 47.47, 45.29, 43.34, 45.28, 41.8, 44.43, 44.57, 47, 49.4, 54.24, 57.75, 59.88, 55.53, 57.95, 58.75, 67.2, 66.72, 67.99, 58.79, 67.9, 75.43, 72.05, 70.9, 70.42, 70.18, 96.52, 99.87, 97.99, 96.22, 91.9, 100.39, 107.56, 98.95, 90.54, 97.08, 95.93, 97.48, 121.49, 126.24, 132.98, 158.22, 153.77, 171.87, 174.55, 173.72, 173.61] },
      velocityScore: { '1D': -3.4, '1W': -72, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 93.8, revenueGrowth: 30, eps: 1.85, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 5.75, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'TTM Technologies is a printed circuit board manufacturer held in Industrials ETFs. Revenue growth tracks data center and defense electronics demand. PCB manufacturing is essential hardware infrastructure; TTM\'s position in AI server and high-frequency trading hardware gives it exposure to two durable growth verticals.',
    },
    {
      ticker: 'GTES', name: 'GTES', easyScore: 1, avgWeight: 5.57, proScore: 1.11, coverage: 0.2,
      price: 25.58, weeklyPrices: [25.85, 26.51, 26.03, 26.11, 25.58], weeklyChange: -1.04, sortRank: 0, periodReturns: { '1M': 4.1, '6M': 17.1, '1Y': 19 },
      priceHistory: { '1W': [25.85, 26.51, 26.03, 26.11, 25.58], '1M': [24.57, 26.24, 25.98, 26.09, 25.98, 25.38, 25.67, 24.4, 24.09, 23.45, 24.18, 24.07, 24.48, 25.34, 25.71, 25.92, 25.85, 26.51, 26.03, 26.11, 25.58], '6M': [21.84, 21.91, 21.61, 21.83, 23, 22.41, 23.32, 22.96, 25.66, 26.51, 27.77, 27.18, 25.44, 23.87, 22.85, 23.64, 23.07, 25.41, 24.86, 25.5, 25.61, 25.98, 25.67, 24.07, 25.92, 25.58], '1Y': [21.49, 22.17, 21.99, 23.13, 23.68, 24.61, 24.28, 25.31, 24.34, 23.63, 24.1, 25.23, 25.56, 25.55, 25.51, 25.57, 24.81, 25.51, 24.59, 25.99, 26.13, 22.08, 22.12, 22.07, 21.81, 22.49, 21.61, 21.8, 22.02, 21.82, 21.72, 22.79, 23.32, 22.96, 25.66, 26.51, 27.77, 27.18, 25.44, 23.17, 22.14, 22.71, 22.04, 25.48, 25.58, 25.5, 25.61, 25.98, 25.67, 24.07, 25.92, 25.58] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 26.9, revenueGrowth: 0, eps: 0.95, grossMargin: 40, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: 5.57, IDEF: false, BILT: false },
      tonyNote: 'GTES appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 5.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'UNP', name: 'UNION PACIFIC CORP', easyScore: 1, avgWeight: 5.52, proScore: 1.1, coverage: 0.2,
      price: 270.93, weeklyPrices: [263.50, 264.68, 262.13, 263.90, 270.93], weeklyChange: 2.82, sortRank: 0, periodReturns: { '1M': 2.6, '6M': 15.1, '1Y': 22.8 },
      priceHistory: { '1W': [263.5, 264.68, 262.13, 263.9, 270.93], '1M': [264.01, 268.23, 264.89, 264.65, 263.35, 264.65, 269.34, 270.56, 275.13, 271.56, 265.8, 265.44, 265.88, 271.1, 279.39, 262.64, 263.5, 264.68, 262.13, 263.9, 270.93], '6M': [235.31, 239.95, 234.23, 234.53, 233.62, 229.29, 229.39, 227.71, 249.76, 262.81, 262.97, 265.45, 260.2, 251.11, 236.57, 241.33, 243.12, 251.15, 251.07, 271.26, 269.48, 264.89, 269.34, 265.44, 262.64, 270.93], '1Y': [220.65, 225.49, 222.51, 231.41, 235.35, 233.31, 225.85, 224.74, 219.4, 222.24, 220.78, 227.85, 223.57, 217.26, 216.25, 225.85, 236.18, 237.41, 225.85, 227.3, 216.61, 220.37, 221.48, 223.02, 226.22, 231.36, 235.44, 240.47, 234.61, 233.06, 224.48, 227.14, 229.39, 227.71, 249.76, 262.81, 262.97, 265.45, 260.2, 244.1, 234.18, 239.19, 244.71, 250.51, 251.14, 271.26, 269.48, 264.89, 269.34, 265.44, 262.64, 270.93] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$161B', pe: 22.3, revenueGrowth: 3, eps: 12.14, grossMargin: 57, dividendYield: 2.09,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: false, BILT: 5.52 },
      tonyNote: 'UNION PACIFIC CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 5.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GD', name: 'GENERAL DYNAMICS CORP', easyScore: 1, avgWeight: 5.43, proScore: 1.09, coverage: 0.2,
      price: 344.78, weeklyPrices: [339.20, 337.61, 337.04, 341.50, 344.78], weeklyChange: 1.65, sortRank: 0, periodReturns: { '1M': -1.3, '6M': 2.2, '1Y': 25.6 },
      priceHistory: { '1W': [339.2, 337.61, 337.04, 341.5, 344.78], '1M': [349.16, 347.27, 347.76, 346.53, 344.03, 341.36, 340.62, 334.5, 343.11, 340.14, 339.75, 338.71, 342.89, 344.64, 342.69, 346.82, 339.2, 337.61, 337.04, 341.5, 344.78], '6M': [337.31, 337.49, 339.36, 340.48, 360.71, 363.3, 364.78, 356.68, 353.37, 346.34, 354.34, 350.72, 360.7, 353.85, 353.36, 352.5, 350.53, 343.9, 334.92, 318.71, 344.3, 347.76, 340.62, 338.71, 346.82, 344.78], '1Y': [274.42, 279.93, 278.78, 290.74, 294.65, 304.85, 297.05, 314.02, 310.74, 314.13, 313.69, 319.61, 324.57, 322.72, 326.98, 322.66, 332.17, 346.5, 334.39, 337.19, 350.77, 344.9, 346.34, 344.25, 340.34, 332.38, 336.01, 340.69, 345.19, 339.47, 345.64, 366, 364.78, 356.68, 353.37, 346.34, 354.34, 350.72, 360.7, 355.23, 349.63, 355.28, 349.09, 335.15, 336.29, 318.71, 344.3, 347.76, 340.62, 338.71, 346.82, 344.78] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$93B', pe: 21.7, revenueGrowth: 10, eps: 15.88, grossMargin: 15, dividendYield: 1.86,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 5.43, BILT: false },
      tonyNote: 'GENERAL DYNAMICS CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 5.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PH', name: 'Parker-Hannifin Corp', easyScore: 2, avgWeight: 2.64, proScore: 1.06, coverage: 0.4,
      price: 886.46, weeklyPrices: [823.30, 836.32, 850.76, 872.23, 886.46], weeklyChange: 7.67, sortRank: 0, periodReturns: { '1M': 1.6, '6M': 0.7, '1Y': 33.9 },
      priceHistory: { '1W': [823.3, 836.32, 850.76, 872.23, 886.46], '1M': [872.69, 902.66, 886.85, 878.83, 874.36, 882.37, 880.43, 862.72, 858.43, 852.56, 859.44, 864.73, 866.96, 868.03, 856.68, 844.63, 823.3, 836.32, 850.76, 872.23, 886.46], '6M': [880, 884.87, 874.81, 890.55, 928.76, 938.35, 945.29, 916.27, 967.99, 995.83, 1012.44, 1014.97, 965.42, 940.48, 912.4, 921.56, 920.77, 982.99, 957, 973.88, 909.42, 886.85, 880.43, 864.73, 844.63, 886.46], '1Y': [661.97, 666.86, 652.73, 700.54, 706.59, 712.09, 711.22, 738.82, 712.13, 727.74, 729.96, 752.33, 759.35, 760.18, 759.96, 759.95, 753.57, 763.44, 728.66, 740.01, 772, 772.83, 844.01, 831.95, 839.57, 856.12, 879.67, 883.47, 886.47, 888.82, 908.39, 936.21, 945.29, 916.27, 967.99, 995.83, 1012.44, 1014.97, 965.42, 902.17, 900.01, 901.46, 908.06, 984.23, 988.8, 973.88, 909.42, 886.85, 880.43, 864.73, 844.63, 886.46] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$112B', pe: 32.7, revenueGrowth: 11, eps: 27.13, grossMargin: 37, dividendYield: 0.92,
      etfPresence: { AIRR: false, PRN: 1.97, RSHO: 3.31, IDEF: false, BILT: false },
      tonyNote: 'Parker-Hannifin Corp appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.81, proScore: 4.81, coverage: 1,
      price: 228, weeklyPrices: [264.51, 260.58, 251.68, 259.67, 228.00], weeklyChange: -13.8, sortRank: 0, periodReturns: { '1M': 29.6, '6M': 132.6, '1Y': 392.4 },
      priceHistory: { '1W': [264.51, 260.58, 251.68, 259.67, 228], '1M': [175.92, 195.09, 184.77, 177.05, 186.1, 207.27, 221.15, 219.94, 199.86, 197.73, 191.82, 219.93, 214.77, 208.06, 208.37, 231.09, 264.51, 260.58, 251.68, 259.67, 228], '6M': [98.04, 87.69, 89.46, 86.04, 100.24, 105.43, 98.87, 100.43, 82.39, 88.61, 107.61, 104.88, 95.65, 112, 118.56, 115.09, 101.95, 136.33, 165.34, 157.08, 138.23, 184.77, 221.15, 219.93, 231.09, 228], '1Y': [46.3, 50.28, 47.97, 51.84, 47.84, 51.95, 52.37, 51.37, 52, 68.78, 71.62, 68.98, 68.32, 64.06, 90.96, 106.6, 110.22, 124.94, 135.46, 109, 117.26, 130.82, 111.28, 83.54, 83.26, 100.15, 100.33, 81.14, 93.23, 85.17, 96.21, 101.98, 98.87, 100.43, 82.39, 88.61, 107.61, 104.88, 95.65, 108.04, 121.52, 105.97, 108.82, 144.97, 157.14, 157.08, 138.23, 184.77, 221.15, 219.93, 231.09, 228] },
      velocityScore: { '1D': 1.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$58B', pe: 87.7, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 3.29, MEME: 6.2, RKNG: 4.95 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 2, avgWeight: 6.51, proScore: 4.34, coverage: 0.667,
      price: 191.63, weeklyPrices: [185.67, 202.37, 184.07, 202.89, 191.63], weeklyChange: 3.21, sortRank: 0, periodReturns: { '1M': 6.1, '6M': 620.7, '1Y': 1078.6 },
      priceHistory: { '1W': [185.67, 202.37, 184.07, 202.89, 191.63], '1M': [180.57, 178.54, 157.55, 148.94, 184.9, 223.1, 203.57, 190.36, 173.26, 171.33, 165.26, 176.81, 181.49, 177.62, 179.83, 158.41, 185.67, 202.37, 184.07, 202.89, 191.63], '6M': [26.59, 32.06, 31.32, 36.75, 38.61, 34.18, 38.38, 45.23, 39.9, 48.4, 46.98, 53.69, 101.14, 127.01, 92.63, 114.41, 86.35, 133.3, 157.32, 137.73, 164.36, 157.55, 203.57, 176.81, 158.41, 191.63], '1Y': [16.26, 16.92, 23.45, 26.22, 26.44, 29.5, 28.23, 27.13, 21.53, 21.59, 22.36, 24.79, 24.2, 23.63, 29.56, 30.54, 25.94, 33.79, 29.1, 34.14, 34.01, 35.56, 28.57, 21.47, 20.58, 26.53, 27.84, 29.9, 39.1, 36.02, 38.06, 34.47, 38.38, 45.23, 39.9, 48.4, 46.98, 53.69, 101.14, 106.19, 101.92, 97.42, 103.91, 150.6, 159.42, 137.73, 164.36, 157.55, 203.57, 176.81, 158.41, 191.63] },
      velocityScore: { '1D': 0.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$15B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 8.83, RKNG: 4.19 },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 3, avgWeight: 4.06, proScore: 4.06, coverage: 1,
      price: 53.95, weeklyPrices: [65.33, 66.60, 65.48, 61.86, 53.95], weeklyChange: -17.42, sortRank: 0, periodReturns: { '1M': -1.4, '6M': 20.7, '1Y': 502.8 },
      priceHistory: { '1W': [65.33, 66.6, 65.48, 61.86, 53.95], '1M': [54.74, 60.98, 56.85, 61.2, 55.15, 55.17, 58.4, 52.94, 50.46, 47.74, 52.71, 58.06, 56.83, 59.78, 67.84, 63.54, 65.33, 66.6, 65.48, 61.86, 53.95], '6M': [44.71, 40.13, 39.92, 39.41, 45.91, 52.99, 53.48, 62.94, 44.94, 42.67, 43.29, 44.24, 40.13, 41.98, 42.21, 41.43, 34.09, 37.06, 47.7, 52.02, 45.51, 56.85, 58.4, 58.06, 63.54, 53.95], '1Y': [8.95, 10.17, 10.47, 14, 16.95, 17.28, 18.15, 17.72, 15.4, 18.45, 19.69, 21.43, 26.48, 26.19, 37.14, 41.9, 45.93, 57.75, 64.14, 59.22, 62.9, 60.75, 62.38, 46.37, 42.26, 48.49, 46.34, 35.48, 42.04, 38.3, 43.63, 52.88, 53.48, 62.94, 44.94, 42.67, 43.29, 44.24, 40.13, 41.37, 41.66, 37.45, 34.77, 39.32, 48.12, 52.02, 45.51, 56.85, 58.4, 58.06, 63.54, 53.95] },
      velocityScore: { '1D': -1.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 70.1, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 3.08, MEME: 5.6, RKNG: 3.5 },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 5.98, proScore: 3.99, coverage: 0.667,
      price: 1620.93, weeklyPrices: [1761.43, 1716.36, 1831.50, 1759.68, 1620.93], weeklyChange: -7.98, sortRank: 0, periodReturns: { '1M': 15.3, '6M': 609.5, '1Y': 4043.5 },
      priceHistory: { '1W': [1761.43, 1716.36, 1831.5, 1759.68, 1620.93], '1M': [1406.32, 1409.98, 1339.96, 1562.34, 1547.56, 1447.23, 1382.72, 1407.61, 1333.01, 1383.29, 1392.56, 1542.24, 1478.69, 1589.55, 1589.94, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1620.93], '6M': [228.47, 206.18, 237.61, 244.25, 349.63, 389.81, 501.29, 527.63, 584.55, 599.34, 621.09, 651.9, 565.59, 655.43, 753.69, 677.86, 692.73, 851.57, 919.47, 932.43, 1096.51, 1339.96, 1382.72, 1542.24, 1694.98, 1620.93], '1Y': [39.12, 41.3, 46.58, 47.15, 45.22, 42.48, 41.61, 42.48, 41.33, 44.34, 44.54, 46.37, 52.47, 70.5, 90.09, 102.92, 113.5, 121.17, 134.61, 148.04, 186.16, 199.33, 239.48, 254.16, 200.27, 210.17, 225.47, 201.87, 241.05, 240.22, 353.56, 387.81, 501.29, 527.63, 584.55, 599.34, 621.09, 651.9, 565.59, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 932.43, 1096.51, 1339.96, 1382.72, 1542.24, 1694.98, 1620.93] },
      velocityScore: { '1D': 8.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$240B', pe: 55.5, revenueGrowth: 251, eps: 29.21, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.79, RKNG: 6.17 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 3, avgWeight: 3.98, proScore: 3.98, coverage: 1,
      price: 94.7, weeklyPrices: [105.65, 118.17, 107.73, 107.29, 94.70], weeklyChange: -10.36, sortRank: 0, periodReturns: { '1M': 48.3, '6M': 28.1, '1Y': 207 },
      priceHistory: { '1W': [105.65, 118.17, 107.73, 107.29, 94.7], '1M': [63.87, 70.68, 65.35, 75.05, 82.55, 74.81, 83.01, 83.67, 86.83, 88.1, 89.58, 96.23, 105.86, 119.7, 129.6, 113.41, 105.65, 118.17, 107.73, 107.29, 94.7], '6M': [73.92, 76.7, 75.84, 71.47, 97.49, 92.72, 103.5, 121.23, 103.5, 96.92, 86.4, 85.76, 93.86, 88.21, 90.74, 96.06, 83.99, 91.61, 90.94, 78.75, 73.9, 65.35, 83.01, 96.23, 113.41, 94.7], '1Y': [30.85, 36.92, 45.94, 49.36, 45.69, 47.86, 56.67, 54.33, 52.46, 46.63, 48.08, 47.07, 48.94, 40.77, 40.97, 48.85, 48.84, 72.9, 90.5, 82.81, 73.7, 80.25, 69.19, 61.4, 51.37, 52.61, 74, 67.81, 86.48, 74.68, 85.73, 95.22, 103.5, 121.23, 103.5, 96.92, 86.4, 85.76, 93.86, 87.09, 94.09, 87.86, 92.62, 94.9, 85.53, 78.75, 73.9, 65.35, 83.01, 96.23, 113.41, 94.7] },
      velocityScore: { '1D': 84.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$37B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 3.51, MEME: 5.67, RKNG: 2.77 },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'NVTS', name: 'Navitas Semiconductor', easyScore: 2, avgWeight: 5.59, proScore: 3.73, coverage: 0.667,
      price: 25.87, weeklyPrices: [24.86, 25.86, 30.84, 30.67, 25.87], weeklyChange: 4.06, sortRank: 0, periodReturns: { '1M': 47.4, '6M': 172.9, '1Y': 327.6 },
      priceHistory: { '1W': [24.86, 25.86, 30.84, 30.67, 25.87], '1M': [17.55, 16.68, 15.79, 18.2, 22.65, 21.17, 22.32, 21.32, 19.67, 19.43, 22.99, 24.38, 29.25, 31.79, 28.88, 26.6, 24.86, 25.86, 30.84, 30.67, 25.87], '6M': [9.48, 8.59, 7.81, 7.21, 10.19, 9.45, 9.76, 10.19, 8.2, 8.76, 8.08, 9.51, 8.96, 10.84, 9.06, 9.48, 8.54, 9.42, 12.37, 18.51, 16.5, 15.79, 22.32, 24.38, 26.6, 25.87], '1Y': [6.05, 7.81, 7.01, 6.67, 6.15, 5.87, 8.47, 8.79, 7.96, 6.66, 6.92, 6.43, 5.86, 5.61, 6.11, 7.16, 7.19, 8.13, 9.97, 17.1, 14.07, 13.46, 7.84, 8.11, 7.56, 8.3, 9.6, 7.96, 7.9, 7.24, 10.31, 10.04, 9.76, 10.19, 8.2, 8.76, 8.08, 9.51, 8.96, 9.98, 9.17, 9.02, 8.8, 9.54, 12.32, 18.51, 16.5, 15.79, 22.32, 24.38, 26.6, 25.87] },
      velocityScore: { '1D': 22.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.42, RKNG: 6.76 },
      tonyNote: 'Navitas Semiconductor is a small-cap wide-bandgap power semiconductor name — gallium nitride and silicon carbide for fast charging and EV applications. The $26.60 share price and small market cap position it as a speculative holding in ETFs willing to take higher-risk bets on next-generation power conversion.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 3, avgWeight: 3.67, proScore: 3.67, coverage: 1,
      price: 39.34, weeklyPrices: [47.94, 47.86, 44.71, 44.15, 39.34], weeklyChange: -17.94, sortRank: 0, periodReturns: { '1M': -1.4, '6M': 26, '1Y': 208.1 },
      priceHistory: { '1W': [47.94, 47.86, 44.71, 44.15, 39.34], '1M': [39.88, 44.24, 41.53, 41.25, 44.59, 45.48, 46.71, 42.56, 39.14, 36.62, 39.52, 48.02, 45.87, 45.14, 48.98, 47.28, 47.94, 47.86, 44.71, 44.15, 39.34], '6M': [31.22, 27.86, 27.85, 24.81, 30.26, 36.71, 35.06, 40.22, 31.54, 36.6, 31.53, 28.65, 28.09, 28.52, 26.65, 28.37, 24.49, 25.57, 30.09, 36.35, 34.25, 41.53, 46.71, 48.02, 47.28, 39.34], '1Y': [12.77, 12.51, 10.33, 10.38, 9.66, 9.52, 11.09, 10.75, 12.52, 14.2, 14.09, 16.05, 15.98, 13.91, 19.35, 24.45, 22.15, 27.71, 34.24, 35.9, 33.43, 34.66, 30.98, 23.65, 21.09, 28.21, 32.11, 22.98, 27.78, 24.08, 29.56, 36.1, 35.06, 40.22, 31.54, 36.6, 31.53, 28.65, 28.09, 27.48, 26.7, 25.72, 24.56, 26.26, 31.53, 36.35, 34.25, 41.53, 46.71, 48.02, 47.28, 39.34] },
      velocityScore: { '1D': -3.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.43, MEME: 4.93, RKNG: 3.66 },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 5.07, proScore: 3.38, coverage: 0.667,
      price: 267.56, weeklyPrices: [273.51, 302.85, 287.32, 291.37, 267.56], weeklyChange: -2.18, sortRank: 0, periodReturns: { '1M': -9.4, '6M': 124.5, '1Y': 1208.4 },
      priceHistory: { '1W': [273.51, 302.85, 287.32, 291.37, 267.56], '1M': [295.25, 285.47, 258.64, 261.03, 283.92, 289.76, 303.41, 275.95, 258.71, 261.34, 282.31, 307.88, 302.49, 302.4, 293.8, 285, 273.51, 302.85, 287.32, 291.37, 267.56], '6M': [119.18, 94.98, 88.82, 88.41, 103.05, 139.77, 150.56, 165.39, 147.35, 155.54, 159, 168.57, 159.99, 159.21, 156.58, 150.22, 132.45, 160.13, 210.06, 237.57, 283.36, 258.64, 303.41, 307.88, 285, 267.56], '1Y': [20.45, 22.25, 21.75, 22.18, 24.36, 25.96, 25.36, 34.34, 36.72, 36.8, 45.28, 48.54, 52.94, 53.44, 67.02, 86.27, 73.6, 86.97, 109.91, 109.06, 110.38, 132.16, 135.21, 111.89, 89.99, 98.93, 111.79, 89.58, 92.26, 87.26, 108, 133.46, 150.56, 165.39, 147.35, 155.54, 159, 168.57, 159.99, 157.17, 166.69, 133.52, 135.63, 166.7, 207.86, 237.57, 283.36, 258.64, 303.41, 307.88, 285, 267.56] },
      velocityScore: { '1D': -1.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$76B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.03, RKNG: 4.11 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab', easyScore: 3, avgWeight: 3.36, proScore: 3.36, coverage: 1,
      price: 111.64, weeklyPrices: [122.39, 123.32, 114.70, 119.95, 111.64], weeklyChange: -8.78, sortRank: 0, periodReturns: { '1M': 41.7, '6M': 127.6, '1Y': 322.1 },
      priceHistory: { '1W': [122.39, 123.32, 114.7, 119.95, 111.64], '1M': [78.76, 84.65, 78.58, 105.47, 117.35, 124.15, 132.55, 124.77, 131.16, 127.31, 134.28, 125.45, 135.76, 143.2, 150.23, 143.48, 122.39, 123.32, 114.7, 119.95, 111.64], '6M': [49.06, 61.49, 70.52, 70.12, 86.03, 86.58, 87.82, 88.57, 73.11, 69.62, 76.58, 72.65, 70, 71.96, 69.48, 72.88, 65.52, 66.74, 82.93, 84.6, 82.51, 78.58, 132.55, 125.45, 143.48, 111.64], '1Y': [26.45, 26.4, 30.04, 35.38, 38.88, 43.21, 47.19, 47.43, 44.81, 44.69, 44.27, 44.38, 48.6, 47.73, 54.04, 49.81, 47.01, 58.5, 65.42, 67.35, 64.56, 62.98, 51.64, 45.54, 40.3, 40.37, 51.56, 55.41, 77.55, 70.45, 84.08, 91.8, 87.82, 88.57, 73.11, 69.62, 76.58, 72.65, 70, 68.37, 71.93, 65.94, 67.73, 68.05, 84.8, 84.6, 82.51, 78.58, 132.55, 125.45, 143.48, 111.64] },
      velocityScore: { '1D': -1.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$70B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 1.96, MEME: 4.39, RKNG: 3.73 },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 4.68, proScore: 3.12, coverage: 0.667,
      price: 914.51, weeklyPrices: [1035.50, 1064.10, 1079.57, 996.00, 914.51], weeklyChange: -11.68, sortRank: 0, periodReturns: { '1M': 42.8, '6M': 285.5, '1Y': 760.4 },
      priceHistory: { '1W': [1035.5, 1064.1, 1079.57, 996, 914.51], '1M': [640.2, 666.59, 646.63, 746.81, 795.33, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 971, 1035.5, 1064.1, 1079.57, 996, 914.51], '6M': [237.22, 241.14, 265.92, 294.37, 343.43, 338.13, 389.11, 435.28, 379.4, 410.34, 417.35, 415.56, 397.05, 418.69, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 517.16, 646.63, 776.01, 762.1, 971, 914.51], '1Y': [106.29, 116.18, 123.6, 124.76, 119.92, 118.61, 113.23, 111.26, 104.88, 118.89, 120.87, 117.68, 119.01, 131.46, 157.77, 164.62, 163.9, 190.96, 192.77, 206.77, 219.02, 223.77, 237.92, 246.83, 207.37, 240.46, 246.92, 237.5, 276.59, 292.63, 339.55, 333.35, 389.11, 435.28, 379.4, 410.34, 417.35, 415.56, 397.05, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 481.72, 517.16, 646.63, 776.01, 762.1, 971, 914.51] },
      velocityScore: { '1D': 2.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.0T', pe: 43.1, revenueGrowth: 196, eps: 21.21, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { BUZZ: 3.68, MEME: false, RKNG: 5.68 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'ONDS', name: 'Ondas Holdings', easyScore: 2, avgWeight: 3.85, proScore: 2.57, coverage: 0.667,
      price: 10.73, weeklyPrices: [13.46, 13.58, 11.61, 11.97, 10.73], weeklyChange: -20.28, sortRank: 0, periodReturns: { '1M': 15, '6M': 18.3, '1Y': 579.1 },
      priceHistory: { '1W': [13.46, 13.58, 11.61, 11.97, 10.73], '1M': [9.33, 9.34, 8.89, 9.06, 9.42, 8.86, 11.21, 10.62, 9.7, 9.13, 9.36, 9.18, 9.06, 9.77, 10.8, 13.22, 13.46, 13.58, 11.61, 11.97, 10.73], '6M': [9.07, 8.75, 9.22, 8.46, 12.84, 13.89, 12.55, 12.27, 9.68, 9.23, 11.39, 10.45, 10.49, 9.83, 10.83, 10.31, 8.81, 9.14, 10.2, 10.54, 10.04, 8.89, 11.21, 9.18, 13.22, 10.73], '1Y': [1.58, 1.71, 1.58, 1.83, 1.75, 2.31, 2.25, 2.13, 2.2, 3.55, 3.86, 4.49, 5.86, 6.06, 6.38, 7.26, 7.87, 10.66, 10.81, 7.77, 7.46, 6.44, 5.81, 7.18, 6.74, 7.58, 9.02, 7.69, 9.27, 8.99, 12.18, 13.56, 12.55, 12.27, 9.68, 9.23, 11.39, 10.45, 10.49, 10.33, 10.75, 9.44, 9.6, 9.13, 10, 10.54, 10.04, 8.89, 11.21, 9.18, 13.22, 10.73] },
      velocityScore: { '1D': -9.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: 119.2, revenueGrowth: 1080, eps: 0.09, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.18, RKNG: 2.53 },
      tonyNote: 'Ondas Holdings is a small-cap industrial automation and drone company. It appears in Meme ETFs on the autonomous systems and drone delivery narrative. Revenue is minimal and the path to profitability is unclear; the ETF allocation is speculative and reflects retail interest in autonomous systems themes.',
    },
    {
      ticker: 'RGTI', name: 'RGTI', easyScore: 2, avgWeight: 3.26, proScore: 2.17, coverage: 0.667,
      price: 20.89, weeklyPrices: [25.63, 26.88, 24.09, 24.16, 20.89], weeklyChange: -18.51, sortRank: 0, periodReturns: { '1M': 14.3, '6M': -25.7, '1Y': 91.8 },
      priceHistory: { '1W': [25.63, 26.88, 24.09, 24.16, 20.89], '1M': [18.27, 20.09, 18.34, 18.94, 20.51, 18.42, 19.27, 17.85, 16.62, 15.96, 16.88, 22.04, 26.42, 25.07, 24.62, 25.54, 25.63, 26.88, 24.09, 24.16, 20.89], '6M': [28.11, 25.84, 23.76, 22.27, 25.38, 24.47, 23.67, 22.01, 17.19, 16.43, 16.6, 18.64, 16.97, 16.94, 15.67, 15.14, 13.5, 14.31, 19.45, 16.86, 17.45, 18.34, 19.27, 22.04, 25.54, 20.89], '1Y': [10.89, 12.1, 11.06, 11.07, 13.75, 12.77, 16.08, 15.44, 14.12, 15.44, 16.65, 14.82, 16.23, 15.15, 19.21, 28.37, 29.65, 41.71, 54.91, 43.31, 38.84, 44.27, 33.77, 25.48, 23.59, 23.45, 28.26, 23.53, 26.88, 22.41, 25.21, 25.72, 23.67, 22.01, 17.19, 16.43, 16.6, 18.64, 16.97, 16.07, 15.41, 14.41, 14.19, 14.68, 19.81, 16.86, 17.45, 18.34, 19.27, 22.04, 25.54, 20.89] },
      velocityScore: { '1D': -7.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 199, eps: -0.89, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.22, RKNG: 3.3 },
      tonyNote: 'Rigetti Computing is a quantum hardware company using superconducting qubit technology. It holds a position in Meme ETFs alongside IonQ and D-Wave as part of the quantum computing basket. Revenue is minimal, the technology is earlier-stage than IonQ, and the ETF allocation is speculative. The weight score is low; this is a high-risk, long-duration positioning.',
    },
    {
      ticker: 'RDW', name: 'Redwire', easyScore: 1, avgWeight: 6.51, proScore: 2.17, coverage: 0.333,
      price: 18.63, weeklyPrices: [20.68, 20.58, 18.62, 21.43, 18.63], weeklyChange: -9.91, sortRank: 0, periodReturns: { '1M': 114.4, '6M': 191.5, '1Y': 5.4 },
      priceHistory: { '1W': [20.68, 20.58, 18.62, 21.43, 18.63], '1M': [8.69, 9.64, 9.2, 11.07, 12.16, 11.46, 13.99, 14.06, 13.96, 13.91, 14.77, 15.35, 17.49, 22.04, 24, 24.57, 20.68, 20.58, 18.62, 21.43, 18.63], '6M': [6.39, 7.29, 8, 7, 10.64, 10.14, 10.2, 13.29, 10.03, 9.01, 8.6, 9.55, 9.07, 9.46, 9.55, 9.16, 9.08, 9.22, 11.22, 10.04, 9.19, 9.2, 13.99, 15.35, 24.57, 18.63], '1Y': [17.68, 19.32, 15.86, 16.12, 15.48, 17.73, 17.37, 16.07, 13.87, 8.99, 8.94, 9.1, 8.91, 8.39, 9.06, 8.11, 8.93, 11.22, 9.06, 8.25, 8, 7.87, 6.56, 5.41, 5.3, 5.12, 6.82, 6.89, 8.52, 7.94, 9.83, 11.02, 10.2, 13.29, 10.03, 9.01, 8.6, 9.55, 9.07, 9.48, 9.63, 8.87, 9.73, 9.29, 10.34, 10.04, 9.19, 9.2, 13.99, 15.35, 24.57, 18.63] },
      velocityScore: { '1D': 8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: null, revenueGrowth: 58, eps: -2.59, grossMargin: 13, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.51, RKNG: false },
      tonyNote: 'Redwire Corp is a space infrastructure company — solar arrays, structures, and manufacturing in orbit. It appears in Meme and speculative ETFs as a high-risk space economy play. Revenue is growing from a small base but the business is pre-profitability; the ETF weight is minimal and reflects thematic positioning rather than fundamental conviction.',
    },
    {
      ticker: 'TE', name: 'T1 Energy', easyScore: 1, avgWeight: 5.66, proScore: 1.89, coverage: 0.333,
      price: 9.69, weeklyPrices: [10.41, 12.04, 11.50, 11.66, 9.69], weeklyChange: -6.92, sortRank: 0, periodReturns: { '1M': 81.5, '6M': 66.2, '1Y': 805.6 },
      priceHistory: { '1W': [10.41, 12.04, 11.5, 11.66, 9.69], '1M': [5.34, 5.27, 5.15, 6.16, 6.04, 5.61, 5.73, 5.67, 7, 6.88, 8.7, 8.72, 8.08, 10.45, 10.96, 10.56, 10.41, 12.04, 11.5, 11.66, 9.69], '6M': [5.83, 5.35, 6.43, 6.42, 7.65, 7.86, 7.82, 9.49, 7.73, 6.85, 6.31, 7.29, 6.81, 8.14, 7.33, 6.68, 4.48, 4.18, 4.99, 5.39, 4.8, 5.15, 5.73, 8.72, 10.56, 9.69], '1Y': [1.07, 1.39, 1.36, 1.25, 1.4, 1.4, 1.53, 1.42, 1.16, 1.28, 1.48, 1.59, 1.65, 1.98, 1.78, 2.03, 2.33, 2.8, 3.5, 4.76, 3.47, 3.72, 3.81, 3.36, 2.72, 4.47, 6.02, 5.06, 7.3, 6.5, 7.28, 7.86, 7.82, 9.49, 7.73, 6.85, 6.31, 7.29, 6.81, 7.74, 7.71, 6.28, 4.19, 4.69, 5.03, 5.39, 4.8, 5.15, 5.73, 8.72, 10.56, 9.69] },
      velocityScore: { '1D': 0.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3B', pe: null, revenueGrowth: 232, eps: -1.87, grossMargin: 8, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.66, RKNG: false },
      tonyNote: 'Tronox Holdings is a titanium dioxide producer — a commodity chemicals company that appears in some ETFs for its materials exposure. The small share price reflects commodity pricing pressure; this is a cyclical materials position rather than a technology or infrastructure allocation.',
    },
    {
      ticker: 'QBTS', name: 'D-Wave Quantum', easyScore: 1, avgWeight: 5.29, proScore: 1.76, coverage: 0.333,
      price: 24.39, weeklyPrices: [29.18, 29.91, 27.55, 27.64, 24.39], weeklyChange: -16.42, sortRank: 0, periodReturns: { '1M': 13.2, '6M': -9.7, '1Y': 48.1 },
      priceHistory: { '1W': [29.18, 29.91, 27.55, 27.64, 24.39], '1M': [21.54, 23.83, 21.99, 22.57, 24.03, 21.44, 22.13, 20.35, 19.06, 18.19, 19.3, 25.74, 29.4, 27.82, 27.48, 30.14, 29.18, 29.91, 27.55, 27.64, 24.39], '6M': [27, 26.1, 26.82, 26.15, 31.27, 28.82, 26.04, 24.97, 20.11, 19.64, 19.38, 20.14, 18.83, 18.91, 16.49, 16.19, 13.7, 13.87, 21.52, 19.31, 20.28, 21.99, 22.13, 25.74, 30.14, 24.39], '1Y': [16.47, 15.88, 15.65, 14.02, 16.76, 15.83, 18.39, 18.87, 16.38, 16.9, 17.01, 15.54, 15.62, 15.42, 18.32, 25.67, 25.31, 35.02, 40.62, 34.4, 32.65, 37.06, 29.5, 23.61, 20.41, 21.42, 28.44, 23.74, 32.19, 26.25, 30.2, 30.15, 26.04, 24.97, 20.11, 19.64, 19.38, 20.14, 18.83, 17.83, 16.1, 14.65, 14.32, 14.25, 21.69, 19.31, 20.28, 21.99, 22.13, 25.74, 30.14, 24.39] },
      velocityScore: { '1D': -4.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: -81, eps: -1.14, grossMargin: 66, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.29, RKNG: false },
      tonyNote: 'D-Wave Quantum is a quantum computing company — the only publicly traded business built around quantum annealing hardware. Revenue is minimal and profitability is many years away, but it holds a position in Meme ETFs as the purest-play quantum computing stock available to retail investors. The ETF weight is small and the position is purely thematic.',
    },
    {
      ticker: 'LUNR', name: 'Intuitive Machines', easyScore: 1, avgWeight: 4.94, proScore: 1.65, coverage: 0.333,
      price: 29.65, weeklyPrices: [38.21, 39.57, 33.83, 33.63, 29.65], weeklyChange: -22.4, sortRank: 0, periodReturns: { '1M': 19.6, '6M': 164.5, '1Y': 172.5 },
      priceHistory: { '1W': [38.21, 39.57, 33.83, 33.63, 29.65], '1M': [24.8, 26.33, 24.11, 28.97, 32.42, 35.68, 36.52, 33.89, 33.59, 32.46, 33.67, 34.24, 38.26, 34.86, 40.34, 43.83, 38.21, 39.57, 33.83, 33.63, 29.65], '6M': [11.21, 11.97, 14.94, 15.7, 18.82, 17.57, 19.6, 22.81, 16.61, 17.04, 18.19, 17.67, 17.67, 18.45, 18.11, 20.55, 20.24, 21.97, 27.28, 27.56, 25.35, 24.11, 36.52, 34.24, 43.83, 29.65], '1Y': [10.88, 10.89, 10.18, 10.96, 10.41, 11.07, 11.25, 12.82, 10.61, 9.81, 9.09, 8.97, 8.77, 8.44, 9.04, 10.13, 10.26, 11.98, 12.25, 12.89, 12.81, 11.93, 9.59, 9.53, 8.62, 9.26, 11.63, 11.12, 16.69, 15.94, 18.62, 19.76, 19.6, 22.81, 16.61, 17.04, 18.19, 17.67, 17.67, 17.64, 18.91, 19.23, 23.99, 23.57, 27.58, 27.56, 25.35, 24.11, 36.52, 34.24, 43.83, 29.65] },
      velocityScore: { '1D': -11.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: null, revenueGrowth: 199, eps: -0.87, grossMargin: 10, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.94, RKNG: false },
      tonyNote: 'Intuitive Machines is a lunar services company — it landed the first U.S. spacecraft on the Moon since 1972 in early 2024. It appears in Meme ETFs for the narrative value as much as the commercial contract pipeline. Revenue is growing via NASA contracts but the business is small and pre-profit; the ETF weight is speculative.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 1, avgWeight: 4.81, proScore: 1.6, coverage: 0.333,
      price: 533.57, weeklyPrices: [546.20, 563.10, 594.11, 575.50, 533.57], weeklyChange: -2.31, sortRank: 0, periodReturns: { '1M': 14.7, '6M': 215.9, '1Y': 869.2 },
      priceHistory: { '1W': [546.2, 563.1, 594.11, 575.5, 533.57], '1M': [465.26, 483.15, 463.91, 480, 515.83, 494.09, 489.15, 482.02, 458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.21, 546.2, 563.1, 594.11, 575.5, 533.57], '6M': [168.89, 176.34, 181.08, 179.68, 219.38, 214, 241.9, 279.7, 269.41, 273.74, 284.67, 282.25, 259.03, 268.81, 304.9, 296.14, 297.73, 337.88, 361.69, 403.12, 434.52, 463.91, 489.15, 486.46, 531.21, 533.57], '1Y': [55.05, 55.78, 59.29, 63.29, 65.22, 66.93, 68.74, 68.82, 76.55, 74.97, 75.06, 76.97, 80.34, 93.29, 102.39, 112.41, 116.74, 125.28, 118.86, 121.53, 129.43, 150.21, 162.96, 157.83, 139.19, 163.54, 169.78, 172.04, 176.76, 176.06, 199.88, 215, 241.9, 279.7, 269.41, 273.74, 284.67, 282.25, 259.03, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 403.12, 434.52, 463.91, 489.15, 486.46, 531.21, 533.57] },
      velocityScore: { '1D': 8.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$184B', pe: 32, revenueGrowth: 46, eps: 16.69, grossMargin: 45, dividendYield: 0.1,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.81 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'AXTI', name: 'AXT Inc', easyScore: 1, avgWeight: 4.5, proScore: 1.5, coverage: 0.333,
      price: 96.3, weeklyPrices: [109.55, 110.85, 106.70, 105.99, 96.30], weeklyChange: -12.09, sortRank: 0, periodReturns: { '1M': -10.5, '6M': 731.6, '1Y': 5434.5 },
      priceHistory: { '1W': [109.55, 110.85, 106.7, 105.99, 96.3], '1M': [107.55, 104.83, 108.42, 116.36, 125.81, 121.94, 114.98, 123.78, 105.88, 112.88, 104.61, 121.02, 140.83, 132.6, 122.77, 103.16, 109.55, 110.85, 106.7, 105.99, 96.3], '6M': [11.58, 14.81, 14.65, 14.59, 20.17, 21.51, 19.78, 16.83, 18.75, 26.8, 23.81, 37.12, 38.8, 47.36, 48.76, 67.35, 47.14, 63.12, 81.78, 75.27, 79.22, 108.42, 114.98, 121.02, 103.16, 96.3], '1Y': [1.74, 2.35, 1.84, 2.03, 2.28, 2.32, 2.32, 2.35, 1.92, 2.14, 2.05, 2.82, 2.9, 3.11, 3.98, 5.14, 4.89, 5.4, 4.6, 4.91, 6.06, 7.95, 9.46, 10.44, 8.93, 10.79, 12.71, 14.83, 15.22, 15.8, 24.11, 22.1, 19.78, 16.83, 18.75, 26.8, 23.81, 37.12, 38.8, 46.73, 58.09, 58.51, 52.84, 64.18, 82.56, 75.27, 79.22, 108.42, 114.98, 121.02, 103.16, 96.3] },
      velocityScore: { '1D': -0.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: 39, eps: -0.32, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.5, RKNG: false },
      tonyNote: 'AXT Inc is a compound semiconductor substrate manufacturer — gallium arsenide, indium phosphide, and germanium wafers used in data center optical transceivers, 5G RF chips, and solar cells. Revenue is growing with optical networking demand. Small market cap but positioned at a genuine supply-chain chokepoint for III-V semiconductor materials.',
    },
    {
      ticker: 'WOLF', name: 'Wolfspeed', easyScore: 1, avgWeight: 4.29, proScore: 1.43, coverage: 0.333,
      price: 57.48, weeklyPrices: [52.95, 61.06, 61.67, 67.06, 57.48], weeklyChange: 8.56, sortRank: 0, periodReturns: { '1M': 56.9, '6M': 160.4, '1Y': 160.1 },
      priceHistory: { '1W': [52.95, 61.06, 61.67, 67.06, 57.48], '1M': [36.63, 43.08, 45.16, 46.6, 50.31, 62.6, 69.96, 62.13, 59.35, 58.83, 58.62, 69.5, 69.89, 73.5, 63.26, 59.28, 52.95, 61.06, 61.67, 67.06, 57.48], '6M': [22.07, 18.56, 18.37, 17.31, 19.7, 19.51, 19.48, 17.46, 17.2, 18.03, 19.06, 20.21, 18.94, 18.2, 16.78, 18.5, 16.45, 24.43, 26.54, 27.55, 29.53, 45.16, 69.96, 69.5, 59.28, 57.48], '1Y': [22.1, 24.69, 30.36, 32.57, 32.44, 29.48, 30.89, 26.32, 20.25, 17.88, 17.48, 17.51, 18.06, 22.11, 22.75, 21.13, 17.74, 17.89, 18.43, 17.12, 17.98, 18.6, 19.49, 19.48, 17.4, 17.33, 17.2, 14.89, 16, 19.06, 20.15, 21.21, 18.94, 16.58, 18.34, 17.06, 16.67, 14.8, 17.47, 24.43, 23, 25.56, 27.55, 25.85, 36.76, 45.16, 53.72, 59.35, 69.5, 63.26, 61.06, 57.48] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$3B', pe: null, revenueGrowth: -19, eps: -13.28, grossMargin: -17, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.29, RKNG: false },
      tonyNote: 'Wolfspeed appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 1, avgWeight: 4.05, proScore: 1.35, coverage: 0.333,
      price: 216.2, weeklyPrices: [226.10, 229.00, 214.60, 217.50, 216.20], weeklyChange: -4.38, sortRank: 0, periodReturns: { '1M': 11.7, '6M': 22.8, '1Y': 196.2 },
      priceHistory: { '1W': [226.1, 229, 214.6, 217.5, 216.2], '1M': [193.57, 198.29, 188.29, 188.51, 210.22, 189.36, 184.54, 172.17, 156.27, 168.99, 182.98, 193.39, 218.41, 221.64, 221.23, 236.03, 226.1, 229, 214.6, 217.5, 216.2], '6M': [176.04, 143.91, 150.13, 144.7, 132.95, 161.38, 139.16, 129.66, 96.95, 128.4, 130.66, 114.48, 114.74, 115.91, 101.72, 103.91, 95.92, 107.93, 158.93, 185.54, 174.01, 188.29, 184.54, 193.39, 236.03, 216.2], '1Y': [73, 74.34, 85.51, 93.49, 92.73, 98.7, 95.74, 101.22, 107.56, 120.41, 116.74, 114.04, 123.06, 147.53, 163.98, 164.1, 146.01, 147.42, 149.9, 151.66, 155.55, 187.62, 163.61, 145.52, 133.49, 171.13, 178.94, 142.02, 149.94, 144.92, 141, 156.84, 139.16, 129.66, 96.95, 128.4, 130.66, 114.48, 114.74, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 185.54, 174.01, 188.29, 184.54, 193.39, 236.03, 216.2] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$40B', pe: 118.1, revenueGrowth: 157, eps: 1.83, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.05 },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
