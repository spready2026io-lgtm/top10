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
export const SPY_RET: Record<Period, number> = { '1W': -3.6, '1M': -1.4, '6M': 6.5, '1Y': 21.3 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 8.1 }, { t: 'MRVL', w: 4.8 }, { t: 'AMD', w: 4.6 }, { t: 'VRT', w: 3.7 }, { t: 'SIMO', w: 3.5 }],
  ARTY: [{ t: 'MRVL', w: 9.3 }, { t: 'MU', w: 7.3 }, { t: 'AMD', w: 7.2 }, { t: 'ORCL', w: 4.2 }, { t: 'CRWV', w: 4.1 }],
  BAI: [{ t: 'MU', w: 5.8 }, { t: 'AMD', w: 5.0 }, { t: 'AVGO', w: 4.9 }, { t: 'NVDA', w: 4.6 }, { t: 'TSM', w: 4.5 }],
  IVEP: [{ t: 'BE', w: 4.7 }, { t: 'PWR', w: 4.3 }, { t: 'COHR', w: 4.3 }, { t: 'SBGSY', w: 4.1 }, { t: 'ETN', w: 4.0 }],
  IGPT: [{ t: 'MU', w: 12.2 }, { t: 'AMD', w: 7.3 }, { t: 'INTC', w: 6.8 }, { t: 'GOOGL', w: 6.2 }, { t: 'NVDA', w: 5.9 }],
  IVES: [{ t: 'MU', w: 5.8 }, { t: 'TSM', w: 5.0 }, { t: 'AAPL', w: 4.8 }, { t: 'AMD', w: 4.8 }, { t: 'NVDA', w: 4.7 }],
  ALAI: [{ t: 'NVDA', w: 13.4 }, { t: 'AMZN', w: 5.8 }, { t: 'TSM', w: 5.7 }, { t: 'MSFT', w: 5.5 }, { t: 'GOOG', w: 5.0 }],
  CHAT: [{ t: 'MU', w: 6.2 }, { t: 'NVDA', w: 6.0 }, { t: 'AMD', w: 5.7 }, { t: 'GOOGL', w: 5.6 }, { t: 'ARM', w: 4.3 }],
  AIFD: [{ t: 'NVDA', w: 6.6 }, { t: 'MRVL', w: 6.3 }, { t: 'LITE', w: 6.0 }, { t: 'DOCN', w: 5.9 }, { t: 'MU', w: 5.8 }],
  SPRX: [{ t: 'COHR', w: 9.1 }, { t: 'ARM', w: 8.2 }, { t: 'ALAB', w: 7.4 }, { t: 'KLAC', w: 6.3 }, { t: 'MKSI', w: 5.1 }],
  AOTG: [{ t: 'AMD', w: 14.8 }, { t: 'NVDA', w: 10.9 }, { t: 'MU', w: 9.1 }, { t: 'TSM', w: 7.2 }, { t: 'APP', w: 5.2 }],
  SOXX: [{ t: 'MU', w: 11.3 }, { t: 'AMD', w: 9.0 }, { t: 'MRVL', w: 8.7 }, { t: 'AVGO', w: 6.1 }, { t: 'INTC', w: 5.9 }],
  PSI: [{ t: 'AMAT', w: 5.8 }, { t: 'MU', w: 5.6 }, { t: 'KLAC', w: 5.6 }, { t: 'LRCX', w: 5.3 }, { t: 'AMD', w: 5.2 }],
  XSD: [{ t: 'MXL', w: 5.5 }, { t: 'MRVL', w: 4.9 }, { t: 'ALAB', w: 4.2 }, { t: 'AMD', w: 3.7 }, { t: 'INTC', w: 3.5 }],
  DRAM: [{ t: 'SNDK', w: 5.3 }, { t: 'STX', w: 4.5 }, { t: 'MU', w: 4.2 }, { t: 'WDC', w: 4.0 }],
  PTF: [{ t: 'SNDK', w: 7.6 }, { t: 'MU', w: 4.8 }, { t: 'STX', w: 4.8 }, { t: 'WDC', w: 4.7 }, { t: 'NVDA', w: 4.5 }],
  WCLD: [{ t: 'DOCN', w: 3.6 }, { t: 'FROG', w: 2.9 }, { t: 'DDOG', w: 2.7 }, { t: 'TWLO', w: 2.7 }, { t: 'PANW', w: 2.4 }],
  IGV: [{ t: 'ORCL', w: 9.9 }, { t: 'MSFT', w: 7.8 }, { t: 'PANW', w: 7.6 }, { t: 'PLTR', w: 6.9 }, { t: 'CRM', w: 6.0 }],
  FDTX: [{ t: 'MU', w: 9.4 }, { t: 'MRVL', w: 8.1 }, { t: 'TSM', w: 6.0 }, { t: 'NVDA', w: 4.6 }, { t: 'STX', w: 4.0 }],
  GTEK: [{ t: 'MRVL', w: 4.4 }, { t: 'DELL', w: 2.9 }, { t: 'CDNS', w: 2.5 }, { t: 'NET', w: 2.2 }, { t: 'APH', w: 2.1 }],
  ARKK: [{ t: 'TSLA', w: 10.4 }, { t: 'TEM', w: 5.0 }, { t: 'CRSP', w: 4.9 }, { t: 'AMD', w: 4.8 }, { t: 'HOOD', w: 4.8 }],
  MARS: [{ t: 'RKLB', w: 13.9 }, { t: 'ASTS', w: 8.9 }, { t: 'SATS', w: 8.1 }, { t: 'OHB', w: 4.8 }, { t: 'GSAT', w: 4.7 }],
  FRWD: [{ t: 'STX', w: 9.1 }, { t: 'NVDA', w: 8.2 }, { t: 'AMD', w: 7.6 }, { t: 'TSM', w: 5.9 }, { t: 'LRCX', w: 5.8 }],
  BCTK: [{ t: 'TSM', w: 8.6 }, { t: 'AVGO', w: 7.4 }, { t: 'NVDA', w: 6.6 }, { t: 'LRCX', w: 6.5 }, { t: 'GOOG', w: 6.0 }],
  FWD: [{ t: 'AVGO', w: 3.2 }, { t: 'AMD', w: 2.7 }, { t: 'NVDA', w: 1.9 }, { t: 'CAT', w: 1.8 }, { t: 'LRCX', w: 1.8 }],
  CBSE: [{ t: 'SNOW', w: 2.9 }, { t: 'TXG', w: 2.9 }, { t: 'VG', w: 2.8 }, { t: 'TENB', w: 2.7 }, { t: 'KRYS', w: 2.7 }],
  FCUS: [{ t: 'STRL', w: 4.5 }, { t: 'DELL', w: 4.4 }, { t: 'BE', w: 4.4 }, { t: 'SITM', w: 4.3 }, { t: 'INTC', w: 4.3 }],
  WGMI: [{ t: 'CIFR', w: 16.4 }, { t: 'IREN', w: 12.9 }, { t: 'WULF', w: 9.1 }, { t: 'CORZ', w: 7.3 }, { t: 'KEEL', w: 7.2 }],
  POW: [{ t: 'POWL', w: 6.8 }, { t: 'VICR', w: 5.0 }, { t: 'PWR', w: 4.8 }, { t: 'PRY', w: 4.6 }, { t: 'ETN', w: 4.2 }],
  VOLT: [{ t: 'POWL', w: 8.1 }, { t: 'BELFB', w: 7.6 }, { t: 'PWR', w: 5.5 }, { t: 'ETN', w: 5.5 }, { t: 'AEP', w: 4.3 }],
  PBD: [{ t: 'SEDG', w: 1.2 }, { t: 'BLDP', w: 1.2 }, { t: 'FSLR', w: 1.1 }, { t: 'ENPH', w: 1.1 }, { t: 'SHLS', w: 1.1 }],
  PBW: [{ t: 'HYLN', w: 4.4 }, { t: 'NVTS', w: 3.1 }, { t: 'FCEL', w: 2.7 }, { t: 'BLDP', w: 2.3 }, { t: 'IONQ', w: 2.1 }],
  AIRR: [{ t: 'STRL', w: 6.6 }, { t: 'FIX', w: 4.3 }, { t: 'CHRW', w: 4.2 }, { t: 'SAIA', w: 4.2 }, { t: 'EME', w: 3.9 }],
  PRN: [{ t: 'TTMI', w: 5.8 }, { t: 'FIX', w: 4.8 }, { t: 'STRL', w: 4.8 }, { t: 'AGX', w: 4.2 }, { t: 'JBL', w: 4.2 }],
  RSHO: [{ t: 'TKR', w: 9.0 }, { t: 'POWL', w: 8.0 }, { t: 'CGNX', w: 7.3 }, { t: 'CAT', w: 6.8 }, { t: 'ETN', w: 5.8 }],
  IDEF: [{ t: 'RTX', w: 7.7 }, { t: 'LMT', w: 6.8 }, { t: 'GD', w: 5.6 }, { t: 'NOC', w: 4.9 }, { t: 'BA', w: 4.8 }],
  BILT: [{ t: 'UNP', w: 5.8 }, { t: 'AEP', w: 4.4 }, { t: 'AENA', w: 4.2 }, { t: 'LNG', w: 3.9 }, { t: 'CP', w: 3.7 }],
  BUZZ: [{ t: 'SMCI', w: 4.0 }, { t: 'ASTS', w: 3.7 }, { t: 'MU', w: 3.6 }, { t: 'NOW', w: 3.5 }, { t: 'NBIS', w: 3.3 }],
  MEME: [{ t: 'SPCE', w: 7.4 }, { t: 'RDW', w: 6.7 }, { t: 'AAOI', w: 6.4 }, { t: 'BE', w: 5.9 }, { t: 'ASTS', w: 5.8 }],
  RKNG: [{ t: 'NVTS', w: 6.7 }, { t: 'SNDK', w: 5.9 }, { t: 'MU', w: 5.2 }, { t: 'NBIS', w: 5.1 }, { t: 'WDC', w: 4.7 }],
};
// @@END_GENERATED:ETF_TOP_HOLDINGS@@

// @@GENERATED:TOP10_RET@@
// Top10 composite returns per theme per period (average of all ETFs in theme)
const TOP10_RET: Record<Theme, Record<Period, number>> = {
  'AI & ML':         { '1W': -11.4, '1M': 0.4, '6M': 29.4, '1Y': 70.2 },
  'Semiconductors':  { '1W': -14.8, '1M': 1.1, '6M': 78, '1Y': 133.5 },
  'Broad Tech':      { '1W': -10, '1M': -0.5, '6M': 17.6, '1Y': 46.1 },
  'Electrification': { '1W': -9.9, '1M': -8.5, '6M': 27.8, '1Y': 64.4 },
  'Industrials':     { '1W': -3.5, '1M': -3, '6M': 20.8, '1Y': 37.8 },
  'Meme':            { '1W': -13.8, '1M': -3.7, '6M': 9.3, '1Y': 6.8 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, Record<Period, ChartPeriodData>> = {
  'AI & ML': {
    '1W': { top10: [100, 98.63, 90.67, 93.2, 88.63], spy: [100, 100.38, 97.79, 98.01, 96.42], top10Return: -11.4, spyReturn: -3.6, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 97.61, 99.91, 100.89, 97.63, 95.76, 95.02, 98, 100.29, 101.17, 104.99, 104.69, 106.39, 107.15, 109.93, 112.14, 111.07, 109.52, 100.56, 103.43, 98.29], spy: [100, 99.85, 100.41, 101.2, 99.98, 99.91, 99.25, 100.26, 100.46, 100.86, 101.53, 101.51, 102.07, 102.32, 102.6, 102.74, 102.02, 102.41, 99.76, 99.99, 98.37], top10Return: 0.4, spyReturn: -1.4, xLabels: ["May 12", "May 19", "May 26", "Jun 2", "Jun 9"] },
    '6M': { top10: [100, 95.38, 98.58, 97.27, 99.46, 101.1, 101.98, 101.46, 99.3, 99.78, 99.62, 100.99, 99.48, 97.62, 97.3, 93.52, 97.79, 106.67, 113.47, 117.86, 120.36, 131.32, 126.11, 138.32, 147.61, 129.43], spy: [100, 99.39, 100.72, 99.84, 100.95, 101.35, 100.91, 101.31, 101.11, 99.81, 99.9, 100.49, 99.3, 96.96, 94.95, 92.83, 96.47, 100.45, 103.76, 104.7, 105.12, 108.24, 108.14, 109.89, 111.2, 106.47], top10Return: 29.4, spyReturn: 6.5, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.33, 103.75, 104.49, 107.21, 108.18, 110.43, 112.18, 111.65, 116.09, 111.89, 113.66, 113.58, 121.52, 124.02, 125.84, 128.22, 133.72, 131.11, 129.15, 138.01, 133.98, 133.03, 123.99, 125.69, 130.54, 134.49, 122.43, 131.18, 131.64, 133.63, 135.41, 135.49, 134.39, 131.81, 132.44, 131.74, 133.75, 131.71, 132.82, 131.17, 118.76, 130.71, 147.08, 152.21, 158.66, 162.53, 179.05, 171.03, 189.47, 203.73, 177.1], spy: [100, 100.5, 101.18, 103, 104.07, 104.09, 105.76, 105.93, 104.72, 107.17, 106.69, 107.58, 107.35, 108.76, 109.92, 110.24, 111.47, 112.24, 110.92, 111.36, 114.57, 112.6, 113.89, 110.07, 112.56, 114.04, 114.66, 111.96, 115.12, 113.92, 115.74, 115.34, 114.93, 115.39, 115.16, 113.69, 113.79, 114.46, 113.11, 111.56, 109.29, 105.38, 109.93, 115.81, 117.41, 119.26, 119.73, 123.28, 123.17, 125.17, 126.66, 121.27], top10Return: 70.2, spyReturn: 21.3, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Semiconductors': {
    '1W': { top10: [100, 97.48, 86.06, 91.14, 85.25], spy: [100, 100.38, 97.79, 98.01, 96.42], top10Return: -14.8, spyReturn: -3.6, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 95.36, 98.39, 98.32, 94.67, 91.7, 92.09, 96.15, 98.46, 100.04, 107.56, 106.66, 107.88, 106.9, 108.41, 113.65, 114.98, 111.95, 98.7, 104.61, 97.84], spy: [100, 99.85, 100.41, 101.2, 99.98, 99.91, 99.25, 100.26, 100.46, 100.86, 101.53, 101.51, 102.07, 102.32, 102.6, 102.74, 102.02, 102.41, 99.76, 99.99, 98.37], top10Return: 1.1, spyReturn: -1.4, xLabels: ["May 12", "May 19", "May 26", "Jun 2", "Jun 9"] },
    '6M': { top10: [100, 97.61, 102.25, 101.78, 108.85, 112.14, 113.03, 114.92, 117.46, 119.06, 119.19, 121.22, 121.07, 120.35, 128.56, 126.66, 130.87, 137.97, 147.76, 157.7, 169.02, 189.07, 183.33, 203.73, 194.55, 177.99], spy: [100, 99.39, 100.72, 99.84, 100.95, 101.35, 100.91, 101.31, 101.11, 99.81, 99.9, 100.49, 99.3, 96.96, 94.95, 92.83, 96.47, 100.45, 103.76, 104.7, 105.12, 108.24, 108.14, 109.89, 111.2, 106.47], top10Return: 78, spyReturn: 6.5, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.11, 106.02, 107.05, 110.68, 110.38, 109.72, 111.1, 108.43, 114.06, 111.24, 115.73, 112.27, 118.87, 122.6, 126.65, 128.82, 135.16, 135.74, 132.12, 140.76, 135.18, 135.65, 125.33, 130.08, 141.29, 145.93, 131.71, 140.23, 143.3, 150.91, 156.22, 156.1, 155.88, 161, 163.87, 162.55, 162.71, 152.21, 153.93, 154.31, 142.07, 159.21, 182.67, 196.2, 211.24, 219.3, 253.49, 234.14, 270.23, 276.53, 242.95], spy: [100, 100.5, 101.18, 103, 104.07, 104.09, 105.76, 105.93, 104.72, 107.17, 106.69, 107.58, 107.35, 108.76, 109.92, 110.24, 111.47, 112.24, 110.92, 111.36, 114.57, 112.6, 113.89, 110.07, 112.56, 114.04, 114.66, 111.96, 115.12, 113.92, 115.74, 115.34, 114.93, 115.39, 115.16, 113.69, 113.79, 114.46, 113.11, 111.56, 109.29, 105.38, 109.93, 115.81, 117.41, 119.26, 119.73, 123.28, 123.17, 125.17, 126.66, 121.27], top10Return: 133.5, spyReturn: 21.3, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Broad Tech': {
    '1W': { top10: [100, 99.79, 92.53, 94.35, 89.99], spy: [100, 100.38, 97.79, 98.01, 96.42], top10Return: -10, spyReturn: -3.6, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.06, 98.91, 100.35, 97.87, 97.08, 96.38, 98.72, 100.4, 101.86, 105.07, 105.08, 106.77, 107.44, 109.5, 110.65, 108.76, 108.49, 100.58, 102.6, 97.84], spy: [100, 99.85, 100.41, 101.2, 99.98, 99.91, 99.25, 100.26, 100.46, 100.86, 101.53, 101.51, 102.07, 102.32, 102.6, 102.74, 102.02, 102.41, 99.76, 99.99, 98.37], top10Return: -0.5, spyReturn: -1.4, xLabels: ["May 12", "May 19", "May 26", "Jun 2", "Jun 9"] },
    '6M': { top10: [100, 96.2, 98.54, 96.89, 99.36, 100.76, 100.98, 97.56, 96.94, 97.8, 97.32, 100.74, 98.16, 95.87, 95.2, 93.13, 97.34, 103.73, 109.9, 111.27, 115.75, 122.08, 119.55, 125.94, 132.61, 117.64], spy: [100, 99.39, 100.72, 99.84, 100.95, 101.35, 100.91, 101.31, 101.11, 99.81, 99.9, 100.49, 99.3, 96.96, 94.95, 92.83, 96.47, 100.45, 103.76, 104.7, 105.12, 108.24, 108.14, 109.89, 111.2, 106.47], top10Return: 17.6, spyReturn: 6.5, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 99.8, 101.91, 103.63, 106.12, 106.88, 109.04, 107.35, 106.22, 107.55, 105.75, 108.83, 108.17, 112.28, 116.86, 119.69, 121.86, 128.38, 131.38, 123.64, 130.93, 127.96, 125.2, 116.73, 119.1, 121.48, 124.1, 114.95, 120.87, 119.54, 123.72, 126.67, 126.38, 123.23, 119.96, 122.67, 122.13, 125.64, 122.91, 123.06, 123.56, 115.47, 123.59, 134.08, 137.71, 140.28, 142.53, 151.12, 145.4, 156.64, 162.25, 146.06], spy: [100, 100.5, 101.18, 103, 104.07, 104.09, 105.76, 105.93, 104.72, 107.17, 106.69, 107.58, 107.35, 108.76, 109.92, 110.24, 111.47, 112.24, 110.92, 111.36, 114.57, 112.6, 113.89, 110.07, 112.56, 114.04, 114.66, 111.96, 115.12, 113.92, 115.74, 115.34, 114.93, 115.39, 115.16, 113.69, 113.79, 114.46, 113.11, 111.56, 109.29, 105.38, 109.93, 115.81, 117.41, 119.26, 119.73, 123.28, 123.17, 125.17, 126.66, 121.27], top10Return: 46.1, spyReturn: 21.3, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Electrification': {
    '1W': { top10: [100, 99.85, 93.13, 93.36, 90.11], spy: [100, 100.38, 97.79, 98.01, 96.42], top10Return: -9.9, spyReturn: -3.6, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 97.41, 98.21, 98.17, 95.58, 92.64, 90.53, 92.71, 95.56, 97.14, 100.46, 99.83, 100.1, 99.06, 98.96, 100.71, 99.56, 99.45, 92.63, 92.84, 89.52], spy: [100, 99.85, 100.41, 101.2, 99.98, 99.91, 99.25, 100.26, 100.46, 100.86, 101.53, 101.51, 102.07, 102.32, 102.6, 102.74, 102.02, 102.41, 99.76, 99.99, 98.37], top10Return: -8.5, spyReturn: -1.4, xLabels: ["May 12", "May 19", "May 26", "Jun 2", "Jun 9"] },
    '6M': { top10: [100, 97.79, 99.49, 97.36, 101.2, 106.43, 109.44, 108.59, 111.9, 114.05, 114.96, 116.27, 110.43, 110.25, 109.05, 109.69, 112.66, 121.26, 125.91, 131.01, 135.74, 143.19, 132.37, 143.42, 143.41, 127.85], spy: [100, 99.39, 100.72, 99.84, 100.95, 101.35, 100.91, 101.31, 101.11, 99.81, 99.9, 100.49, 99.3, 96.96, 94.95, 92.83, 96.47, 100.45, 103.76, 104.7, 105.12, 108.24, 108.14, 109.89, 111.2, 106.47], top10Return: 27.8, spyReturn: 6.5, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.19, 101.6, 103.26, 106.67, 107.29, 111.57, 110.5, 110.16, 112.91, 113.64, 115.82, 112.19, 114.05, 118.12, 122.27, 125.99, 131.25, 137.96, 130.97, 135.2, 132.81, 136.74, 130.03, 131.3, 133.47, 136.74, 131.89, 137.1, 135.92, 138, 143.19, 145.99, 143.53, 145.81, 146.56, 147.39, 150.26, 146.03, 148.75, 148.14, 145.78, 152, 164.06, 167.05, 170.13, 171.16, 180.15, 172.51, 183.68, 185.56, 164.4], spy: [100, 100.5, 101.18, 103, 104.07, 104.09, 105.76, 105.93, 104.72, 107.17, 106.69, 107.58, 107.35, 108.76, 109.92, 110.24, 111.47, 112.24, 110.92, 111.36, 114.57, 112.6, 113.89, 110.07, 112.56, 114.04, 114.66, 111.96, 115.12, 113.92, 115.74, 115.34, 114.93, 115.39, 115.16, 113.69, 113.79, 114.46, 113.11, 111.56, 109.29, 105.38, 109.93, 115.81, 117.41, 119.26, 119.73, 123.28, 123.17, 125.17, 126.66, 121.27], top10Return: 64.4, spyReturn: 21.3, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Industrials': {
    '1W': { top10: [100, 100.96, 98.19, 98.32, 96.51], spy: [100, 100.38, 97.79, 98.01, 96.42], top10Return: -3.5, spyReturn: -3.6, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.14, 99.16, 99.83, 97.2, 95.9, 94.79, 96.6, 96.79, 97.66, 100.07, 100.07, 100.54, 99.89, 98.41, 99.69, 99.44, 100.39, 97.62, 97.75, 95.96], spy: [100, 99.85, 100.41, 101.2, 99.98, 99.91, 99.25, 100.26, 100.46, 100.86, 101.53, 101.51, 102.07, 102.32, 102.6, 102.74, 102.02, 102.41, 99.76, 99.99, 98.37], top10Return: -3, spyReturn: -1.4, xLabels: ["May 12", "May 19", "May 26", "Jun 2", "Jun 9"] },
    '6M': { top10: [100, 100.53, 102.99, 100.61, 105.8, 111.17, 111.05, 110.51, 115.84, 118.69, 119.44, 120.61, 115.18, 111.38, 109.91, 109.98, 114.05, 120.55, 121.64, 121.68, 121.69, 125.99, 120.63, 125.99, 125.64, 120.78], spy: [100, 99.39, 100.72, 99.84, 100.95, 101.35, 100.91, 101.31, 101.11, 99.81, 99.9, 100.49, 99.3, 96.96, 94.95, 92.83, 96.47, 100.45, 103.76, 104.7, 105.12, 108.24, 108.14, 109.89, 111.2, 106.47], top10Return: 20.8, spyReturn: 6.5, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 100, 101.29, 102.99, 104.63, 104.96, 106.46, 107.07, 107.09, 109.03, 107.35, 109.97, 107.97, 110.02, 110.87, 111.66, 114.03, 116.89, 115.09, 113.07, 117.62, 115.13, 114.34, 109.4, 111.89, 113.13, 115.69, 112.19, 117.56, 117.86, 123.43, 128.8, 128.27, 127.26, 133.41, 135.5, 135.7, 136.85, 130.27, 128.23, 128.41, 122.87, 129.83, 137.76, 137.4, 138.88, 138.54, 143.85, 137.84, 143.55, 143.42, 137.81], spy: [100, 100.5, 101.18, 103, 104.07, 104.09, 105.76, 105.93, 104.72, 107.17, 106.69, 107.58, 107.35, 108.76, 109.92, 110.24, 111.47, 112.24, 110.92, 111.36, 114.57, 112.6, 113.89, 110.07, 112.56, 114.04, 114.66, 111.96, 115.12, 113.92, 115.74, 115.34, 114.93, 115.39, 115.16, 113.69, 113.79, 114.46, 113.11, 111.56, 109.29, 105.38, 109.93, 115.81, 117.41, 119.26, 119.73, 123.28, 123.17, 125.17, 126.66, 121.27], top10Return: 37.8, spyReturn: 21.3, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Meme': {
    '1W': { top10: [100, 100.54, 90.3, 92.61, 86.14], spy: [100, 100.38, 97.79, 98.01, 96.42], top10Return: -13.8, spyReturn: -3.6, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 97.1, 99.24, 100.19, 96.27, 92.41, 90.98, 94.48, 100.15, 102.51, 105.94, 107.52, 109.49, 108.03, 108.22, 110.89, 107, 107.59, 96.6, 99.08, 92.13], spy: [100, 99.85, 100.41, 101.2, 99.98, 99.91, 99.25, 100.26, 100.46, 100.86, 101.53, 101.51, 102.07, 102.32, 102.6, 102.74, 102.02, 102.41, 99.76, 99.99, 98.37], top10Return: -3.7, spyReturn: -1.4, xLabels: ["May 12", "May 19", "May 26", "Jun 2", "Jun 9"] },
    '6M': { top10: [100, 92.16, 93.65, 87.84, 93.06, 96.49, 97, 89.48, 86.32, 85.41, 85.92, 87.34, 81.45, 84.62, 85.97, 84.76, 88.24, 98.22, 106.78, 106.2, 108.5, 115.4, 113.57, 127.16, 131.17, 109.27], spy: [100, 99.39, 100.72, 99.84, 100.95, 101.35, 100.91, 101.31, 101.11, 99.81, 99.9, 100.49, 99.3, 96.96, 94.95, 92.83, 96.47, 100.45, 103.76, 104.7, 105.12, 108.24, 108.14, 109.89, 111.2, 106.47], top10Return: 9.3, spyReturn: 6.5, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.14, 100.78, 95.47, 96.01, 94.63, 94.71, 92.84, 86.41, 87.49, 86.85, 87.65, 87.48, 91.22, 89.29, 88.57, 92.19, 93.58, 94.89, 92.86, 99.33, 96.5, 95.16, 91.08, 85.91, 85.07, 89.54, 85.47, 89.93, 90.77, 94.23, 92.96, 95.7, 93.48, 93.13, 92.26, 85.97, 92.12, 95.51, 98.68, 102.45, 97.22, 97.42, 100.51, 106.48, 112, 113.17, 115.07, 119.87, 123.28, 121.28, 106.83], spy: [100, 100.5, 101.18, 103, 104.07, 104.09, 105.76, 105.93, 104.72, 107.17, 106.69, 107.58, 107.35, 108.76, 109.92, 110.24, 111.47, 112.24, 110.92, 111.36, 114.57, 112.6, 113.89, 110.07, 112.56, 114.04, 114.66, 111.96, 115.12, 113.92, 115.74, 115.34, 114.93, 115.39, 115.16, 113.69, 113.79, 114.46, 113.11, 111.56, 109.29, 105.38, 109.93, 115.81, 117.41, 119.26, 119.73, 123.28, 123.17, 125.17, 126.66, 121.27], top10Return: 6.8, spyReturn: 21.3, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
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
export const SCAN_TIMESTAMP    = '2026-06-09T16:27:07.017Z';
export const SCAN_TIMESTAMP_NY = 'June 9, 2026 at 12:27 PM ET';
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
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 14.11, bestProScore: 6.16, avgProScore: 4.70, price: 875.96, weeklyChange: -18.86 },
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 11.11, bestProScore: 5.66, avgProScore: 3.70, price: 201.43, weeklyChange: -6.20 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 10.80, bestProScore: 4.65, avgProScore: 3.60, price: 448.52, weeklyChange: -17.33 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 5.78, bestProScore: 2.52, avgProScore: 1.93, price: 376.49, weeklyChange: -21.44 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 6.32, bestProScore: 4.19, avgProScore: 3.16, price: 274.00, weeklyChange: -8.58 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 6.02, bestProScore: 3.39, avgProScore: 3.01, price: 250.31, weeklyChange: -17.02 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.33, bestProScore: 2.67, avgProScore: 2.17, price: 411.00, weeklyChange: -5.88 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.47, bestProScore: 2.19, avgProScore: 1.73, price: 314.33, weeklyChange: -8.55 },
  { ticker: 'AMZN', name: `AMAZON.COM INC`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 3.17, bestProScore: 1.94, avgProScore: 1.58, price: 243.24, weeklyChange: -2.71 },
  { ticker: 'ALAB', name: `Astera Labs Inc`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 3.17, bestProScore: 1.66, avgProScore: 1.58, price: 313.05, weeklyChange: -13.89 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': -15.6, '1M': 3, '6M': 82.5, '1Y': 165.7 },
  ARTY: { '1W': -13.4, '1M': 1.3, '6M': 40, '1Y': 80.4 },
  BAI:  { '1W': -12.9, '1M': -4.1, '6M': 26.5, '1Y': 67.9 },
  IVEP: { '1W': -6.5, '1M': -6.1, '6M': 1.3, '1Y': 1.3 },
  IGPT: { '1W': -11.3, '1M': 0, '6M': 53.1, '1Y': 93.9 },
  IVES: { '1W': -10.6, '1M': -1.2, '6M': 8.8, '1Y': 39.5 },
  ALAI: { '1W': -9, '1M': 0, '6M': 11.8, '1Y': 44 },
  CHAT: { '1W': -14.4, '1M': 2.1, '6M': 40.8, '1Y': 93.6 },
  AIFD: { '1W': -10.8, '1M': 0.5, '6M': 30, '1Y': 74 },
  SPRX: { '1W': -14.2, '1M': 8.1, '6M': 21.2, '1Y': 81.6 },
  AOTG: { '1W': -6.3, '1M': 1, '6M': 7.6, '1Y': 30.2 },
  // Semiconductors
  SOXX: { '1W': -13.3, '1M': 2.6, '6M': 71.1, '1Y': 140.1 },
  PSI:  { '1W': -11.7, '1M': -4.7, '6M': 76.2, '1Y': 161.7 },
  XSD:  { '1W': -15.7, '1M': -1.2, '6M': 59.7, '1Y': 127.1 },
  DRAM: { '1W': -18.4, '1M': 7.8, '6M': 105, '1Y': 105 },
  // Broad Tech
  PTF:  { '1W': -14.1, '1M': -3.4, '6M': 41.8, '1Y': 74.7 },
  WCLD: { '1W': -8.2, '1M': 2, '6M': -15.3, '1Y': -16.8 },
  IGV:  { '1W': -9.2, '1M': -0.1, '6M': -17.2, '1Y': -14.2 },
  FDTX: { '1W': -10.8, '1M': 4.4, '6M': 25.3, '1Y': 39.3 },
  GTEK: { '1W': -7.6, '1M': 3.2, '6M': 40.1, '1Y': 63.8 },
  ARKK: { '1W': -6.7, '1M': -7.8, '6M': -11.6, '1Y': 16.9 },
  MARS: { '1W': -11.9, '1M': -4.3, '6M': 30.5, '1Y': 30.5 },
  FRWD: { '1W': -9.9, '1M': -0.4, '6M': 21.8, '1Y': 21.8 },
  BCTK: { '1W': -9.9, '1M': -0.6, '6M': 16.8, '1Y': 16.8 },
  FWD:  { '1W': -9, '1M': -1, '6M': 25.1, '1Y': 58.3 },
  CBSE: { '1W': -8.9, '1M': -1.4, '6M': 15.1, '1Y': 34.6 },
  FCUS: { '1W': -10.8, '1M': -3.7, '6M': 27.3, '1Y': 68.2 },
  WGMI: { '1W': -13.1, '1M': 6, '6M': 29.6, '1Y': 205 },
  // Electrification
  POW:  { '1W': -8.7, '1M': -13.3, '6M': 42.5, '1Y': 41 },
  VOLT: { '1W': -4.5, '1M': -6.1, '6M': 28, '1Y': 56.5 },
  PBD:  { '1W': -10.7, '1M': -9.2, '6M': 23.1, '1Y': 63 },
  PBW:  { '1W': -15.6, '1M': -5.4, '6M': 17.8, '1Y': 97.1 },
  // Industrials
  AIRR: { '1W': -3.6, '1M': -3.7, '6M': 26.2, '1Y': 57.6 },
  PRN:  { '1W': -7.7, '1M': -4.6, '6M': 31.5, '1Y': 49.8 },
  RSHO: { '1W': -3.4, '1M': -1, '6M': 29.3, '1Y': 49.4 },
  IDEF: { '1W': -3, '1M': -5.8, '6M': 4.4, '1Y': 16.7 },
  BILT: { '1W': 0.3, '1M': 0.1, '6M': 12.4, '1Y': 15.5 },
  // Meme
  BUZZ: { '1W': -9.6, '1M': -3.7, '6M': 2.3, '1Y': 27.8 },
  MEME: { '1W': -17, '1M': -3.4, '6M': 26.7, '1Y': -6.2 },
  RKNG: { '1W': -14.9, '1M': -3.9, '6M': -1.2, '1Y': -1.2 },
};
// @@END_GENERATED:ETF_RETURNS@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 6.22, proScore: 5.66, coverage: 0.909,
      price: 201.43, weeklyPrices: [214.75, 218.66, 205.10, 208.64, 201.43], weeklyChange: -6.2, sortRank: 0, periodReturns: { '1M': -6.4, '6M': 8.9, '1Y': 41.2 },
      priceHistory: { '1W': [214.75, 218.66, 205.1, 208.64, 201.43], '1M': [219.44, 220.78, 225.83, 235.74, 225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 201.43], '6M': [184.97, 177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 222.32, 214.86, 222.82, 201.43], '1Y': [142.63, 144.69, 147.9, 153.3, 162.88, 171.37, 170.78, 175.51, 178.26, 183.16, 175.64, 181.77, 170.62, 177.33, 170.29, 176.97, 187.24, 189.11, 179.83, 180.28, 201.03, 198.69, 193.16, 181.36, 177.82, 179.59, 183.78, 170.94, 188.61, 188.85, 184.86, 186.23, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 216.61, 198.48, 219.44, 222.32, 214.86, 222.82, 201.43] },
      velocityScore: { '1D': -4.9, '1W': -4.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.9T', pe: 30.8, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.48,
      etfPresence: { AIS: 2.58, ARTY: 3.53, BAI: 4.59, IVEP: false, IGPT: 5.93, IVES: 4.75, ALAI: 13.4, CHAT: 6.05, AIFD: 6.57, SPRX: 3.95, AOTG: 10.86 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 6.8, proScore: 5.56, coverage: 0.818,
      price: 875.96, weeklyPrices: [1079.57, 996.00, 864.01, 949.28, 875.96], weeklyChange: -18.86, sortRank: 0, periodReturns: { '1M': 17.3, '6M': 247, '1Y': 689.5 },
      priceHistory: { '1W': [1079.57, 996, 864.01, 949.28, 875.96], '1M': [795.33, 766.58, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 875.96], '6M': [252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1, 875.96], '1Y': [110.95, 119.84, 127.91, 120.89, 122.24, 116.43, 109.83, 111.96, 109.06, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 198.47, 221.91, 218.03, 241.11, 228.5, 224.53, 234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1, 875.96] },
      velocityScore: { '1D': 8.8, '1W': -15.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$988B', pe: 41.4, revenueGrowth: 196, eps: 21.17, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { AIS: 8.09, ARTY: 7.29, BAI: 5.8, IVEP: false, IGPT: 12.18, IVES: 5.76, ALAI: 1.04, CHAT: 6.24, AIFD: 5.75, SPRX: false, AOTG: 9.06 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.68, proScore: 4.65, coverage: 0.818,
      price: 448.52, weeklyPrices: [542.52, 523.20, 466.38, 490.33, 448.52], weeklyChange: -17.33, sortRank: 0, periodReturns: { '1M': -1.5, '6M': 102.4, '1Y': 268.5 },
      priceHistory: { '1W': [542.52, 523.2, 466.38, 490.33, 448.52], '1M': [458.79, 448.29, 445.5, 449.7, 424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 448.52], '6M': [221.62, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 503.89, 521.54, 448.52], '1Y': [121.73, 126.39, 138.43, 136.11, 138.41, 160.08, 158.65, 177.44, 174.31, 174.95, 166.55, 166.62, 162.13, 159.54, 159.16, 160.88, 164.01, 235.56, 238.6, 230.23, 258.01, 250.05, 237.52, 230.29, 206.13, 217.6, 221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 334.63, 341.54, 458.79, 420.99, 503.89, 521.54, 448.52] },
      velocityScore: { '1D': 0.6, '1W': -13.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$731B', pe: 150, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.62, ARTY: 7.23, BAI: 5.03, IVEP: false, IGPT: 7.25, IVES: 4.76, ALAI: 1.11, CHAT: 5.74, AIFD: false, SPRX: 0.52, AOTG: 14.85 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.47, proScore: 2.52, coverage: 0.727,
      price: 376.49, weeklyPrices: [479.23, 418.91, 385.73, 396.60, 376.49], weeklyChange: -21.44, sortRank: 0, periodReturns: { '1M': -12.4, '6M': -7.3, '1Y': 54.1 },
      priceHistory: { '1W': [479.23, 418.91, 385.73, 396.6, 376.49], '1M': [428.43, 419.3, 416.79, 439.79, 425.19, 420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 376.49], '6M': [406.29, 341.3, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 420.71, 422.01, 481.57, 376.49], '1Y': [244.28, 252.1, 263.77, 264.74, 277.9, 280.81, 283.69, 297.42, 292.93, 312.83, 294.91, 298.01, 302.39, 369.57, 346.17, 339.31, 333.39, 345.5, 351.33, 340.3, 372.97, 351.94, 351.96, 340.5, 385.03, 380.61, 412.97, 326.02, 350.22, 347.62, 344.97, 351.71, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 418.2, 416.5, 428.43, 420.71, 422.01, 481.57, 376.49] },
      velocityScore: { '1D': -5.6, '1W': -22.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 62.4, revenueGrowth: 48, eps: 6.03, grossMargin: 76, dividendYield: 0.66,
      etfPresence: { AIS: 0.72, ARTY: 3.46, BAI: 4.89, IVEP: false, IGPT: false, IVES: 4.5, ALAI: 4.04, CHAT: 3.08, AIFD: 5.5, SPRX: false, AOTG: 1.54 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 7, avgWeight: 4.19, proScore: 2.67, coverage: 0.636,
      price: 411, weeklyPrices: [436.69, 444.92, 415.17, 426.80, 411.00], weeklyChange: -5.88, sortRank: 0, periodReturns: { '1M': -0.2, '6M': 35.5, '1Y': 98.6 },
      priceHistory: { '1W': [436.69, 444.92, 415.17, 426.8, 411], '1M': [404.54, 397.28, 399.8, 417.72, 404.35, 395.95, 392.61, 401.62, 407.15, 404.52, 412.32, 422.73, 424.86, 418.45, 435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 411], '6M': [303.41, 286.87, 296.95, 303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.04, 369.11, 348.7, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 401.61, 404.54, 395.95, 412.32, 446.69, 411], '1Y': [207, 215.68, 220.09, 224.68, 231.84, 237.56, 240.33, 241.33, 232.47, 244.29, 232.7, 238.72, 231.39, 260.44, 262.79, 280.71, 288.47, 304.52, 304.71, 288.88, 301.53, 294.05, 291.17, 277.91, 284.68, 295.45, 310.14, 276.96, 298.8, 319.61, 323.63, 342.4, 334.87, 330.56, 348.85, 366.36, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 404.98, 401.61, 404.54, 395.95, 412.32, 446.69, 411] },
      velocityScore: { '1D': 5.1, '1W': -20.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.1T', pe: 35.3, revenueGrowth: 35, eps: 11.65, grossMargin: 62, dividendYield: 0.89,
      etfPresence: { AIS: 3.33, ARTY: false, BAI: 4.51, IVEP: false, IGPT: false, IVES: 4.97, ALAI: 5.65, CHAT: 0.44, AIFD: 3.25, SPRX: false, AOTG: 7.18 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 7, avgWeight: 2.28, proScore: 1.45, coverage: 0.636,
      price: 147.55, weeklyPrices: [174.37, 166.01, 154.27, 156.40, 147.55], weeklyChange: -15.38, sortRank: 0, periodReturns: { '1M': 4.1, '6M': 13.5, '1Y': 52.4 },
      priceHistory: { '1W': [174.37, 166.01, 154.27, 156.4, 147.55], '1M': [136.43, 142.54, 140.69, 147.81, 141.97, 141.71, 141.58, 140.49, 148.59, 154.03, 158.01, 154.31, 155.27, 159.47, 170.68, 175.33, 174.37, 166.01, 154.27, 156.4, 147.55], '6M': [130.04, 126.13, 131.32, 131.03, 123.72, 130.59, 136.34, 141.74, 137.49, 141.59, 127.43, 129.3, 137.17, 133.57, 131.22, 120.77, 126.25, 152.02, 166.85, 172.47, 172.62, 136.43, 141.71, 158.01, 175.33, 147.55], '1Y': [96.8, 95.09, 94.97, 98.91, 106.28, 108.3, 113.04, 118.62, 118.12, 141.25, 132.78, 134.27, 137.38, 150.72, 142.84, 142.64, 149.27, 157.36, 143.38, 146.59, 156.77, 153.55, 134.93, 123.45, 125.04, 127.8, 132.36, 122.36, 130.77, 133.6, 122.89, 129.83, 136.34, 141.74, 137.49, 141.59, 127.43, 129.3, 137.17, 135.35, 135.88, 116.13, 133.64, 154.37, 172.86, 172.47, 172.62, 136.43, 141.71, 158.01, 175.33, 147.55] },
      velocityScore: { '1D': 0, '1W': -20.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$186B', pe: 50.7, revenueGrowth: 35, eps: 2.91, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.41, ARTY: 1.94, BAI: 1.39, IVEP: false, IGPT: false, IVES: false, ALAI: 0.9, CHAT: 2.39, AIFD: 4.75, SPRX: 3.15, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 7 of 11 AI & ML ETFs (64% coverage) with average weight 2.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 4.92, proScore: 2.68, coverage: 0.545,
      price: 359.94, weeklyPrices: [358.99, 372.19, 368.53, 363.31, 359.94], weeklyChange: 0.27, sortRank: 0, periodReturns: { '1M': -10.2, '6M': 13.5, '1Y': 104.4 },
      priceHistory: { '1W': [358.99, 372.19, 368.53, 363.31, 359.94], '1M': [388.64, 387.35, 402.62, 401.07, 396.78, 396.94, 387.66, 388.91, 387.66, 382.97, 388.88, 388.83, 390.13, 380.34, 376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 359.94], '6M': [317.08, 306.57, 314.35, 313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 311.49, 306.52, 306.36, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 383.25, 388.64, 396.94, 388.88, 361.85, 359.94], '1Y': [176.09, 176.77, 166.77, 175.84, 176.62, 182.97, 190.23, 195.75, 194.67, 203.34, 201.57, 207.14, 230.66, 239.17, 249.53, 247.14, 244.9, 244.62, 251.03, 251.69, 267.47, 277.54, 291.31, 284.28, 323.44, 319.63, 320.21, 296.72, 314.09, 315.15, 328.57, 330, 327.93, 338, 322.86, 305.72, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 350.34, 383.25, 388.64, 396.94, 388.88, 361.85, 359.94] },
      velocityScore: { '1D': -10.4, '1W': -23.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.4, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.67, IVEP: false, IGPT: 6.23, IVES: 4.48, ALAI: false, CHAT: 5.63, AIFD: 5.25, SPRX: false, AOTG: 4.25 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 6, avgWeight: 4.82, proScore: 2.63, coverage: 0.545,
      price: 250.31, weeklyPrices: [301.65, 316.43, 263.47, 288.85, 250.31], weeklyChange: -17.02, sortRank: 0, periodReturns: { '1M': 47.1, '6M': 181.6, '1Y': 262 },
      priceHistory: { '1W': [301.65, 316.43, 263.47, 288.85, 250.31], '1M': [170.84, 164.5, 177.95, 182.58, 176.89, 168.93, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 204.83, 205, 219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 250.31], '6M': [88.9, 84.07, 87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 92.65, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.84, 168.93, 208.26, 290.79, 250.31], '1Y': [69.14, 70.42, 75.21, 76.24, 72.26, 70.85, 73.27, 76.34, 76.63, 77.81, 72.07, 74.26, 62.31, 67.1, 70.98, 80.09, 83.89, 92.5, 88.89, 81.05, 88.46, 87.59, 89.33, 78.68, 83.43, 100.2, 92.47, 81.7, 86.49, 89.39, 83.22, 80.46, 80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 158.21, 163.66, 170.84, 168.93, 208.26, 290.79, 250.31] },
      velocityScore: { '1D': 13.4, '1W': 3.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$219B', pe: 85.7, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.08,
      etfPresence: { AIS: 4.79, ARTY: 9.29, BAI: 1.66, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.92, AIFD: 6.34, SPRX: 4.9, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 4.26, proScore: 1.94, coverage: 0.455,
      price: 243.24, weeklyPrices: [250.02, 253.79, 246.03, 245.22, 243.24], weeklyChange: -2.71, sortRank: 0, periodReturns: { '1M': -10.8, '6M': 6.7, '1Y': 12.1 },
      priceHistory: { '1W': [250.02, 253.79, 246.03, 245.22, 243.24], '1M': [268.99, 265.82, 270.13, 267.22, 264.14, 264.86, 259.34, 265.01, 268.46, 266.32, 265.29, 271.85, 274, 270.64, 261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 243.24], '6M': [227.92, 222.56, 232.14, 230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 205.27, 208.39, 213.49, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 272.05, 268.99, 264.86, 265.29, 256.52, 243.24], '1Y': [216.98, 216.1, 212.77, 220.46, 222.54, 223.19, 228.29, 231.01, 213.75, 221.47, 228.01, 228.71, 225.99, 230.33, 231.62, 220.21, 220.63, 225.22, 215.57, 217.95, 229.25, 249.32, 249.1, 222.55, 229.67, 232.38, 231.78, 221.27, 232.38, 226.5, 247.38, 239.12, 239.16, 239.3, 210.32, 198.79, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 261.12, 272.05, 268.99, 264.86, 265.29, 256.52, 243.24] },
      velocityScore: { '1D': -8.9, '1W': -24.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 31.4, revenueGrowth: 17, eps: 7.75, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.38, ALAI: 5.85, CHAT: 3.22, AIFD: 3.58, SPRX: false, AOTG: 4.27 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.79, proScore: 1.72, coverage: 0.455,
      price: 401.64, weeklyPrices: [427.34, 428.05, 416.67, 411.74, 401.64], weeklyChange: -6.01, sortRank: 0, periodReturns: { '1M': -3.2, '6M': -18.4, '1Y': -15 },
      priceHistory: { '1W': [427.34, 428.05, 416.67, 411.74, 401.64], '1M': [412.66, 407.77, 405.21, 409.43, 421.92, 423.54, 417.42, 421.06, 419.09, 418.57, 416.03, 412.67, 426.99, 450.24, 460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 401.64], '6M': [492.02, 476.39, 486.85, 483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 384.47, 398.55, 409.41, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 413.62, 412.66, 423.54, 416.03, 441.31, 401.64], '1Y': [472.75, 479.14, 490.11, 492.05, 503.51, 505.62, 505.87, 512.57, 527.75, 529.24, 509.77, 502.04, 505.35, 500.37, 510.02, 510.15, 519.71, 524.85, 513.43, 520.54, 542.07, 514.33, 508.68, 493.79, 476.99, 477.73, 478.56, 476.12, 488.02, 472.94, 479.28, 459.86, 465.95, 430.29, 401.14, 401.32, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 424.82, 413.62, 412.66, 423.54, 416.03, 441.31, 401.64] },
      velocityScore: { '1D': -9.9, '1W': -31.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.0T', pe: 23.9, revenueGrowth: 18, eps: 16.8, grossMargin: 68, dividendYield: 0.88,
      etfPresence: { AIS: false, ARTY: 1.78, BAI: false, IVEP: false, IGPT: false, IVES: 4.71, ALAI: 5.49, CHAT: 3.01, AIFD: false, SPRX: false, AOTG: 3.94 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.32, proScore: 1.51, coverage: 0.455,
      price: 313.05, weeklyPrices: [363.54, 358.05, 317.06, 346.33, 313.05], weeklyChange: -13.89, sortRank: 0, periodReturns: { '1M': 56.7, '6M': 87.4, '1Y': 239 },
      priceHistory: { '1W': [363.54, 358.05, 317.06, 346.33, 313.05], '1M': [207.35, 204.42, 224.09, 228.64, 232.68, 215.58, 244.26, 287.48, 297.84, 306.88, 318.72, 325.33, 349.17, 342.85, 320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 313.05], '6M': [167.08, 144.94, 168.83, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 122.31, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 215.58, 318.72, 355.76, 313.05], '1Y': [92.35, 95.3, 87.26, 88.66, 99.86, 91.94, 119.48, 118.41, 135.54, 192, 171.06, 178.56, 176.61, 230.37, 249.38, 205.27, 194.5, 219.36, 161.46, 154.85, 168.25, 179.31, 167.55, 139.52, 144.78, 152.5, 164.32, 140.24, 169.97, 179.56, 162.61, 182, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 196.64, 201.25, 207.35, 215.58, 318.72, 355.76, 313.05] },
      velocityScore: { '1D': 6.3, '1W': -29.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$54B', pe: 210.1, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 1.89, ARTY: 1.68, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 1.62, CHAT: 4.04, AIFD: false, SPRX: 7.36, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 5, avgWeight: 2.9, proScore: 1.32, coverage: 0.455,
      price: 281.86, weeklyPrices: [331.44, 323.92, 300.51, 300.57, 281.86], weeklyChange: -14.96, sortRank: 0, periodReturns: { '1M': -17.1, '6M': 58, '1Y': 151.7 },
      priceHistory: { '1W': [331.44, 323.92, 300.51, 300.57, 281.86], '1M': [367.92, 367.13, 369.99, 376.23, 370.94, 339.73, 322.63, 315.67, 323.4, 327.46, 323.91, 319.78, 314.18, 315.71, 323.39, 334.49, 331.44, 323.92, 300.51, 300.57, 281.86], '6M': [178.38, 160.66, 166.26, 162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 245.42, 257.75, 264.35, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 330.97, 367.92, 339.73, 323.91, 334.49, 281.86], '1Y': [112, 116.45, 122.32, 122.54, 128.37, 125.4, 130.19, 142.7, 138.76, 143.72, 129.05, 127.93, 125.59, 136.74, 136.83, 141.62, 161.59, 167.38, 180.51, 171.59, 190.57, 180.82, 179.05, 164.86, 169.57, 178.88, 181.82, 149.83, 166.87, 175.61, 163.58, 176.93, 182.49, 186.18, 195.58, 234.53, 245.42, 257.75, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 322.43, 330.97, 367.92, 339.73, 323.91, 334.49, 281.86] },
      velocityScore: { '1D': 22.2, '1W': -34.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$108B', pe: 71, revenueGrowth: 30, eps: 3.97, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.72, ARTY: false, BAI: 1.95, IVEP: 3.98, IGPT: false, IVES: false, ALAI: false, CHAT: 0.85, AIFD: 4, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 5, avgWeight: 2.53, proScore: 1.15, coverage: 0.455,
      price: 494.99, weeklyPrices: [594.11, 575.50, 511.72, 526.93, 494.99], weeklyChange: -16.68, sortRank: 0, periodReturns: { '1M': 3.1, '6M': 192, '1Y': 768.1 },
      priceHistory: { '1W': [594.11, 575.5, 511.72, 526.93, 494.99], '1M': [515.83, 488.74, 494.09, 489.15, 482.02, 458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 494.99], '6M': [169.54, 174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 458.68, 524.65, 563.1, 494.99], '1Y': [57.02, 57.41, 62.07, 63.84, 64.64, 66.53, 69.32, 70.61, 75.84, 75.91, 75.86, 79.71, 86, 95.02, 100.94, 109.69, 130.59, 121.18, 120.44, 120.47, 124.92, 152.18, 169.99, 152.86, 155.41, 155.59, 181.95, 166.26, 179.56, 187.7, 200.46, 221.51, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 400.73, 442.36, 515.83, 458.68, 524.65, 563.1, 494.99] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$171B', pe: 29.6, revenueGrowth: 46, eps: 16.7, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { AIS: 1.55, ARTY: 2.64, BAI: 2.93, IVEP: false, IGPT: false, IVES: false, ALAI: 4.34, CHAT: 1.17, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 5, avgWeight: 1.59, proScore: 0.72, coverage: 0.455,
      price: 1595.48, weeklyPrices: [1831.50, 1759.68, 1559.32, 1642.00, 1595.48], weeklyChange: -12.89, sortRank: 0, periodReturns: { '1M': 2.1, '6M': 627, '1Y': 3715.1 },
      priceHistory: { '1W': [1831.5, 1759.68, 1559.32, 1642, 1595.48], '1M': [1547.56, 1452.02, 1447.23, 1382.72, 1407.61, 1333.01, 1383.29, 1392.56, 1542.24, 1478.69, 1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1595.48], '6M': [219.46, 209.31, 244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 588.73, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1589.55, 1716.36, 1595.48], '1Y': [41.82, 44.21, 47.34, 44.96, 46.2, 41.36, 43, 42.93, 41.93, 46.83, 44.58, 47.35, 53.01, 73.92, 93.97, 99.83, 121.12, 131.88, 144.3, 146.95, 175.53, 194.57, 271.58, 244.93, 220.5, 194.38, 232.86, 206.83, 250.08, 275.24, 377.41, 413.62, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1070.2, 1255.86, 1547.56, 1333.01, 1589.55, 1716.36, 1595.48] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$236B', pe: 54.6, revenueGrowth: 251, eps: 29.23, grossMargin: 56, dividendYield: null,
      etfPresence: { AIS: 1.9, ARTY: false, BAI: 2.56, IVEP: false, IGPT: false, IVES: false, ALAI: 0.37, CHAT: 1.58, AIFD: false, SPRX: false, AOTG: 1.52 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'CRDO', name: 'Credo Technology Group Holding Ltd', easyScore: 5, avgWeight: 1.57, proScore: 0.71, coverage: 0.455,
      price: 216.64, weeklyPrices: [214.60, 217.50, 206.89, 222.27, 216.64], weeklyChange: 0.95, sortRank: 0, periodReturns: { '1M': 14.9, '6M': 27.2, '1Y': 204.7 },
      priceHistory: { '1W': [214.6, 217.5, 206.89, 222.27, 216.64], '1M': [210.22, 198.57, 189.36, 184.54, 172.17, 156.27, 168.99, 182.98, 193.39, 218.41, 221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 216.64], '6M': [170.29, 140.34, 147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 115.98, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 156.27, 221.64, 229, 216.64], '1Y': [71.09, 79.17, 91.92, 87.59, 97.59, 101.19, 98.41, 109.38, 110.29, 125.38, 106.3, 120.1, 124.77, 163.96, 164.44, 149.38, 144.91, 148.87, 131.41, 137.2, 162.18, 164.23, 158.5, 139.56, 154.18, 189.19, 157.98, 134.13, 150.19, 143.22, 150.42, 150.97, 133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 180.5, 180.06, 210.22, 156.27, 221.64, 229, 216.64] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$40B', pe: 119, revenueGrowth: 157, eps: 1.82, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: 0.78, ARTY: 1.17, BAI: 1.92, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.48, AIFD: false, SPRX: 2.48, AOTG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 4, avgWeight: 3.95, proScore: 1.43, coverage: 0.364,
      price: 585.91, weeklyPrices: [622.98, 627.57, 593.00, 585.39, 585.91], weeklyChange: -5.95, sortRank: 0, periodReturns: { '1M': -3.9, '6M': -10.8, '1Y': -15.6 },
      priceHistory: { '1W': [622.98, 627.57, 593, 585.39, 585.91], '1M': [598.86, 603, 616.63, 618.43, 614.23, 611.21, 602.61, 605.06, 607.38, 610.26, 612.34, 635.26, 635.29, 632.51, 600.47, 597.63, 622.98, 627.57, 593, 585.39, 585.91], '6M': [656.96, 657.15, 664.94, 660.09, 646.06, 620.8, 658.76, 716.5, 661.46, 639.77, 637.25, 653.56, 647.39, 613.71, 593.66, 525.72, 573.02, 634.53, 670.91, 678.62, 610.41, 598.86, 611.21, 612.34, 597.63, 585.91], '1Y': [694.06, 702.12, 712.2, 719.22, 732.78, 702.91, 713.58, 700, 763.46, 790, 751.48, 754.1, 737.05, 751.98, 775.72, 760.66, 717.34, 717.84, 717.55, 733.41, 751.44, 627.32, 627.08, 597.69, 636.22, 639.6, 650.13, 649.5, 667.55, 650.41, 653.06, 620.25, 658.76, 716.5, 661.46, 639.77, 637.25, 653.56, 647.39, 627.45, 604.06, 536.38, 575.05, 662.49, 668.84, 678.62, 610.41, 598.86, 611.21, 612.34, 597.63, 585.91] },
      velocityScore: { '1D': -17.8, '1W': -29.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 21.3, revenueGrowth: 33, eps: 27.51, grossMargin: 82, dividendYield: 0.36,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: 4.77, IVES: 4.44, ALAI: 4.19, CHAT: 2.38, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'COHR', name: 'Coherent Corp', easyScore: 4, avgWeight: 3.87, proScore: 1.41, coverage: 0.364,
      price: 347.02, weeklyPrices: [417.43, 421.90, 376.99, 401.93, 347.02], weeklyChange: -16.87, sortRank: 0, periodReturns: { '1M': 3.5, '6M': 80.1, '1Y': 327.4 },
      priceHistory: { '1W': [417.43, 421.9, 376.99, 401.93, 347.02], '1M': [379.69, 374.01, 403.71, 404.94, 382.45, 362.83, 353.63, 358.5, 378, 377.57, 381.35, 380.18, 376.95, 361.47, 362.9, 426.89, 417.43, 421.9, 376.99, 401.93, 347.02], '6M': [192.73, 175.2, 191.87, 184.57, 173.15, 195.96, 196.94, 212.18, 227.68, 217.23, 248.89, 298.91, 252.32, 242.76, 253.63, 243.48, 253.22, 307.93, 347.51, 321.53, 329.89, 379.69, 362.83, 381.35, 426.89, 347.02], '1Y': [81.19, 80.76, 80.96, 86.64, 91.25, 97.82, 98.43, 106.98, 105.6, 116.56, 87.76, 91.58, 88.47, 103.49, 103.41, 106.52, 114.65, 116.67, 110.41, 115.37, 134.24, 128.7, 158.01, 138.15, 148.85, 170.96, 197.45, 170.44, 191.37, 194.33, 178.06, 191.04, 196.94, 212.18, 227.68, 217.23, 248.89, 298.91, 252.32, 247.37, 255.05, 219.65, 255.1, 313.42, 343.79, 321.53, 329.89, 379.69, 362.83, 381.35, 426.89, 347.02] },
      velocityScore: { '1D': null, '1W': -34.1, '1M': null, '6M': null }, isNew: true,
      marketCap: '$68B', pe: 166, revenueGrowth: 21, eps: 2.09, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 1.03, ARTY: false, BAI: false, IVEP: 4.28, IGPT: false, IVES: false, ALAI: false, CHAT: 1.05, AIFD: false, SPRX: 9.1, AOTG: false },
      tonyNote: 'Coherent Corp appears in 4 of 11 AI & ML ETFs (36% coverage) with average weight 3.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ARM', name: 'ARM Holdings PLC', easyScore: 4, avgWeight: 3.78, proScore: 1.37, coverage: 0.364,
      price: 307.54, weeklyPrices: [411.83, 393.44, 342.93, 346.39, 307.54], weeklyChange: -25.32, sortRank: 0, periodReturns: { '1M': 44.2, '6M': 116.7, '1Y': 121.9 },
      priceHistory: { '1W': [411.83, 393.44, 342.93, 346.39, 307.54], '1M': [212.65, 207.92, 221.21, 228.5, 209.16, 215.12, 223.15, 256.73, 298.23, 306.51, 321.22, 302.71, 335.27, 353.29, 408.85, 402.71, 411.83, 393.44, 342.93, 346.39, 307.54], '6M': [141.93, 121.1, 112.02, 109.31, 113.08, 105.11, 116.07, 105.36, 123.7, 125.28, 123.78, 124.37, 117.63, 115.75, 132.35, 144.13, 148.77, 157.58, 175.1, 215.88, 203.26, 212.65, 215.12, 321.22, 402.71, 307.54], '1Y': [138.61, 142.04, 156.41, 156.33, 148.02, 153.9, 159.28, 163.47, 137.23, 142.39, 134.01, 140.26, 131.42, 154.14, 153.37, 144.3, 150.38, 166.77, 170.67, 165.71, 173.09, 160.73, 149.74, 136.04, 131.44, 139.19, 141.52, 114.58, 111.55, 114.73, 111.79, 105.78, 116.07, 105.36, 123.7, 125.28, 123.78, 124.37, 117.63, 121.7, 136.89, 136.96, 143.86, 161.22, 175.49, 215.88, 203.26, 212.65, 215.12, 321.22, 402.71, 307.54] },
      velocityScore: { '1D': null, '1W': -38.8, '1M': null, '6M': null }, isNew: true,
      marketCap: '$328B', pe: 353.5, revenueGrowth: 20, eps: 0.87, grossMargin: 98, dividendYield: null,
      etfPresence: { AIS: 2.17, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 0.47, CHAT: 4.32, AIFD: false, SPRX: 8.16, AOTG: false },
      tonyNote: 'Arm Holdings is held across Broad Tech and AI ETFs as the CPU architecture licensor embedded in every mobile device and increasingly in AI inference chips and data center CPUs. Revenue grew and the royalty model is high-margin; the weight score reflects consistent institutional positioning as the AI chip design ecosystem expands on Arm cores.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 4, avgWeight: 3.44, proScore: 1.25, coverage: 0.364,
      price: 799.26, weeklyPrices: [938.00, 945.08, 863.66, 895.40, 799.26], weeklyChange: -14.79, sortRank: 0, periodReturns: { '1M': -11.6, '6M': 121.8, '1Y': 873.4 },
      priceHistory: { '1W': [938, 945.08, 863.66, 895.4, 799.26], '1M': [1053.09, 992.37, 1030.37, 1001.81, 970.7, 884.98, 890.09, 868.07, 964.5, 946.9, 910.81, 902.31, 860.62, 854.96, 905, 1029.15, 938, 945.08, 863.66, 895.4, 799.26], '6M': [360.33, 316.15, 387.41, 368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 674.73, 783.25, 640.69, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 884.98, 910.81, 1029.15, 799.26], '1Y': [82.11, 85.78, 91.81, 91.49, 90.44, 99.63, 102.13, 109.48, 108.15, 119.66, 117.96, 124.62, 134.12, 164.88, 163.34, 152.75, 171.4, 163.09, 156.57, 158.06, 198.39, 188.36, 252.47, 247.43, 291.27, 302.98, 366, 320.25, 395.92, 386.11, 351.42, 324.25, 339.19, 391.84, 551.99, 562.74, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 859.68, 976.18, 1053.09, 884.98, 910.81, 1029.15, 799.26] },
      velocityScore: { '1D': -8.8, '1W': -36.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$62B', pe: 141.7, revenueGrowth: 90, eps: 5.64, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.01, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.09, AIFD: 6.05, SPRX: 3.63, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 4 of 11 AI & ML ETFs (36% coverage) with average weight 3.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 4, avgWeight: 3.34, proScore: 1.21, coverage: 0.364,
      price: 201.36, weeklyPrices: [230.33, 236.34, 213.68, 211.82, 201.36], weeklyChange: -12.58, sortRank: 0, periodReturns: { '1M': 2.8, '6M': -9.1, '1Y': 13.7 },
      priceHistory: { '1W': [230.33, 236.34, 213.68, 211.82, 201.36], '1M': [193.84, 186.83, 189.76, 195.61, 192.95, 186.61, 181.46, 188.16, 189.77, 192.08, 193.06, 190.96, 203.7, 225.78, 248.15, 244.58, 230.33, 236.34, 213.68, 211.82, 201.36], '6M': [221.53, 188.65, 195.34, 194.91, 189.65, 189.85, 177.16, 164.58, 142.82, 160.14, 141.31, 149.25, 151.56, 155.11, 149.68, 139.66, 145.54, 155.62, 177.58, 172.96, 180.29, 193.84, 186.61, 193.06, 244.58, 201.36], '1Y': [177.15, 211.1, 215.27, 218.96, 235.81, 241.3, 241.9, 249.98, 255.67, 253.86, 234.62, 234.21, 223.45, 328.33, 301.41, 308.46, 289.01, 288.63, 303.62, 272.66, 280.83, 248.17, 236.15, 220.49, 197.03, 207.73, 223.01, 178.46, 197.49, 195.71, 198.52, 191.09, 177.16, 164.58, 142.82, 160.14, 141.31, 149.25, 151.56, 155.97, 154.34, 138.8, 143.17, 163, 181.17, 172.96, 180.29, 193.84, 186.61, 193.06, 244.58, 201.36] },
      velocityScore: { '1D': -11.7, '1W': -34.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$579B', pe: 36.2, revenueGrowth: 22, eps: 5.57, grossMargin: 67, dividendYield: 0.94,
      etfPresence: { AIS: false, ARTY: 4.17, BAI: false, IVEP: false, IGPT: false, IVES: 4.2, ALAI: false, CHAT: 1.66, AIFD: false, SPRX: false, AOTG: 3.31 },
      tonyNote: 'Oracle lands in 3 AI ETFs on the strength of its cloud database and AI infrastructure contracts. Revenue grew 22%, 67% gross margin, P/E of 40x. The 17.5% weekly return following a major earnings beat shows how quickly sentiment can reprice; the weight score at 2.04% is still modest, meaning ETF managers have started building positions but conviction is not yet deep.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 6.16, proScore: 6.16, coverage: 1,
      price: 875.96, weeklyPrices: [1079.57, 996.00, 864.01, 949.28, 875.96], weeklyChange: -18.86, sortRank: 0, periodReturns: { '1M': 17.3, '6M': 247, '1Y': 689.5 },
      priceHistory: { '1W': [1079.57, 996, 864.01, 949.28, 875.96], '1M': [795.33, 766.58, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 875.96], '6M': [252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1, 875.96], '1Y': [110.95, 119.84, 127.91, 120.89, 122.24, 116.43, 109.83, 111.96, 109.06, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 198.47, 221.91, 218.03, 241.11, 228.5, 224.53, 234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1, 875.96] },
      velocityScore: { '1D': 5.5, '1W': -14.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$988B', pe: 41.4, revenueGrowth: 196, eps: 21.17, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { SOXX: 11.31, PSI: 5.64, XSD: 3.47, DRAM: 4.21 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.94, proScore: 4.45, coverage: 0.75,
      price: 448.52, weeklyPrices: [542.52, 523.20, 466.38, 490.33, 448.52], weeklyChange: -17.33, sortRank: 0, periodReturns: { '1M': -1.5, '6M': 102.4, '1Y': 268.5 },
      priceHistory: { '1W': [542.52, 523.2, 466.38, 490.33, 448.52], '1M': [458.79, 448.29, 445.5, 449.7, 424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 448.52], '6M': [221.62, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 503.89, 521.54, 448.52], '1Y': [121.73, 126.39, 138.43, 136.11, 138.41, 160.08, 158.65, 177.44, 174.31, 174.95, 166.55, 166.62, 162.13, 159.54, 159.16, 160.88, 164.01, 235.56, 238.6, 230.23, 258.01, 250.05, 237.52, 230.29, 206.13, 217.6, 221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 334.63, 341.54, 458.79, 420.99, 503.89, 521.54, 448.52] },
      velocityScore: { '1D': -0.2, '1W': -26.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$731B', pe: 150, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 8.98, PSI: 5.18, XSD: 3.65, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.73, proScore: 3.55, coverage: 0.75,
      price: 102.46, weeklyPrices: [112.71, 111.78, 99.17, 110.27, 102.46], weeklyChange: -9.09, sortRank: 0, periodReturns: { '1M': -18, '6M': 153, '1Y': 400.3 },
      priceHistory: { '1W': [112.71, 111.78, 99.17, 110.27, 102.46], '1M': [129.44, 120.61, 120.29, 115.93, 108.77, 108.17, 110.8, 118.96, 118.5, 119.84, 123.52, 121.77, 120.89, 114.68, 109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 102.46], '6M': [40.5, 37.31, 36.35, 36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.5, 45.58, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.17, 123.52, 107.93, 102.46], '1Y': [20.48, 20.74, 22.55, 22.85, 23.44, 22.69, 23.49, 20.41, 20.19, 21.81, 25.31, 24.35, 24, 24.77, 24.9, 31.22, 35.94, 37.43, 37.15, 36.92, 41.53, 37.03, 37.88, 34.33, 35.83, 43.76, 40.78, 36.05, 36.16, 39.38, 45.55, 46.96, 45.07, 46.47, 50.59, 46.79, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.99, 95.78, 129.44, 108.17, 123.52, 107.93, 102.46] },
      velocityScore: { '1D': 5.7, '1W': 7.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$515B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 5.94, PSI: 4.75, XSD: 3.51, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 4.23, proScore: 3.17, coverage: 0.75,
      price: 201.43, weeklyPrices: [214.75, 218.66, 205.10, 208.64, 201.43], weeklyChange: -6.2, sortRank: 0, periodReturns: { '1M': -6.4, '6M': 8.9, '1Y': 41.2 },
      priceHistory: { '1W': [214.75, 218.66, 205.1, 208.64, 201.43], '1M': [219.44, 220.78, 225.83, 235.74, 225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 201.43], '6M': [184.97, 177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 222.32, 214.86, 222.82, 201.43], '1Y': [142.63, 144.69, 147.9, 153.3, 162.88, 171.37, 170.78, 175.51, 178.26, 183.16, 175.64, 181.77, 170.62, 177.33, 170.29, 176.97, 187.24, 189.11, 179.83, 180.28, 201.03, 198.69, 193.16, 181.36, 177.82, 179.59, 183.78, 170.94, 188.61, 188.85, 184.86, 186.23, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 216.61, 198.48, 219.44, 222.32, 214.86, 222.82, 201.43] },
      velocityScore: { '1D': -3.4, '1W': -7.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.9T', pe: 30.8, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.48,
      etfPresence: { SOXX: 5.79, PSI: 5.18, XSD: 1.71, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.28, proScore: 2.46, coverage: 0.75,
      price: 390.35, weeklyPrices: [437.67, 428.76, 401.39, 403.89, 390.35], weeklyChange: -10.81, sortRank: 0, periodReturns: { '1M': -6.3, '6M': 41.3, '1Y': 71.5 },
      priceHistory: { '1W': [437.67, 428.76, 401.39, 403.89, 390.35], '1M': [422.73, 419.65, 432.39, 426.79, 417.49, 418.58, 414.31, 398.05, 384.21, 397.07, 419.94, 416.88, 419.01, 413.85, 402.69, 423.2, 437.67, 428.76, 401.39, 403.89, 390.35], '6M': [276.24, 278.4, 276.73, 271.2, 299.16, 302.1, 305.6, 310.88, 320.45, 337.1, 355.15, 352.41, 319.71, 306.07, 309.43, 307.44, 327.36, 350.01, 381.05, 392.59, 397.02, 422.73, 418.58, 419.94, 423.2, 390.35], '1Y': [227.66, 231.8, 234.98, 240.64, 242.72, 240.61, 228.08, 230.75, 220.68, 232.04, 230.44, 255.63, 244.55, 247.21, 246.32, 248.61, 239.28, 237.93, 238.15, 240.36, 239.35, 229.38, 233.41, 230.13, 252.02, 278.24, 281.57, 271.04, 277.56, 273.74, 300.93, 300.25, 305.6, 310.88, 320.45, 337.1, 355.15, 352.41, 319.71, 310.92, 312.19, 303.1, 327.41, 348.6, 375.27, 392.59, 397.02, 422.73, 418.58, 419.94, 423.2, 390.35] },
      velocityScore: { '1D': -4.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$190B', pe: 58.3, revenueGrowth: 37, eps: 6.7, grossMargin: 64, dividendYield: 1.09,
      etfPresence: { SOXX: 2.79, PSI: 5.13, XSD: 1.93, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 6.79, proScore: 3.39, coverage: 0.5,
      price: 250.31, weeklyPrices: [301.65, 316.43, 263.47, 288.85, 250.31], weeklyChange: -17.02, sortRank: 0, periodReturns: { '1M': 47.1, '6M': 181.6, '1Y': 262 },
      priceHistory: { '1W': [301.65, 316.43, 263.47, 288.85, 250.31], '1M': [170.84, 164.5, 177.95, 182.58, 176.89, 168.93, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 204.83, 205, 219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 250.31], '6M': [88.9, 84.07, 87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 92.65, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.84, 168.93, 208.26, 290.79, 250.31], '1Y': [69.14, 70.42, 75.21, 76.24, 72.26, 70.85, 73.27, 76.34, 76.63, 77.81, 72.07, 74.26, 62.31, 67.1, 70.98, 80.09, 83.89, 92.5, 88.89, 81.05, 88.46, 87.59, 89.33, 78.68, 83.43, 100.2, 92.47, 81.7, 86.49, 89.39, 83.22, 80.46, 80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 158.21, 163.66, 170.84, 168.93, 208.26, 290.79, 250.31] },
      velocityScore: { '1D': 4, '1W': -6.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$219B', pe: 85.7, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.08,
      etfPresence: { SOXX: 8.69, PSI: false, XSD: 4.88, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 5.3, proScore: 2.65, coverage: 0.5,
      price: 479.44, weeklyPrices: [500.77, 501.70, 453.01, 492.17, 479.44], weeklyChange: -4.26, sortRank: 0, periodReturns: { '1M': 10.1, '6M': 79.5, '1Y': 182.4 },
      priceHistory: { '1W': [500.77, 501.7, 453.01, 492.17, 479.44], '1M': [443.62, 431.2, 436.61, 440.56, 436.62, 413.57, 406.91, 426.85, 427.36, 432.16, 454.89, 448.25, 449.68, 450.06, 458.17, 490.05, 500.77, 501.7, 453.01, 492.17, 479.44], '6M': [267.14, 258.84, 260.23, 256.99, 281.64, 319.08, 322.38, 322.32, 322.51, 354.91, 373.55, 372.18, 338.94, 341.53, 357.06, 337.17, 352.62, 395.73, 391.62, 404.86, 391.38, 443.62, 413.57, 454.89, 490.05, 479.44], '1Y': [169.79, 176.55, 180.18, 183.76, 195.39, 194.81, 187.01, 188.41, 179.15, 188.45, 162.22, 164.51, 156.25, 163.42, 178.13, 201.44, 217.74, 217.51, 227.58, 220.56, 227.64, 230.19, 228.67, 225.12, 242.46, 268.63, 275.15, 248.27, 260.78, 268.87, 301.18, 327.01, 322.38, 322.32, 322.51, 354.91, 373.55, 372.18, 338.94, 346.18, 361.79, 323.12, 354.31, 395.64, 394.33, 404.86, 391.38, 443.62, 413.57, 454.89, 490.05, 479.44] },
      velocityScore: { '1D': 2.7, '1W': -12, '1M': null, '6M': null }, isNew: false,
      marketCap: '$381B', pe: 45.1, revenueGrowth: 11, eps: 10.63, grossMargin: 49, dividendYield: 0.43,
      etfPresence: { SOXX: 4.85, PSI: 5.76, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 4.49, proScore: 2.25, coverage: 0.5,
      price: 2047.48, weeklyPrices: [2125.11, 2131.10, 1929.20, 2108.06, 2047.48], weeklyChange: -3.65, sortRank: 0, periodReturns: { '1M': 9.5, '6M': 67.1, '1Y': 146.9 },
      priceHistory: { '1W': [2125.11, 2131.1, 1929.2, 2108.06, 2047.48], '1M': [1845.19, 1811.35, 1849.71, 1892.94, 1804.32, 1756.45, 1740.58, 1829.47, 1842.18, 1888.38, 2011.39, 1957.19, 1927.63, 1921.71, 1940.04, 2045.2, 2125.11, 2131.1, 1929.2, 2108.06, 2047.48], '6M': [1225.61, 1223.37, 1268.75, 1215.08, 1324.6, 1544.96, 1512.78, 1427.94, 1442.95, 1464.13, 1487.66, 1534.95, 1429.1, 1418.64, 1498.67, 1443.21, 1540.06, 1768.78, 1805.32, 1900, 1713.32, 1845.19, 1756.45, 2011.39, 2045.2, 2047.48], '1Y': [829.29, 892.38, 889.03, 898.85, 923.18, 933.49, 897.09, 916.09, 883.41, 935.53, 876.08, 888.1, 843.9, 932.63, 989.87, 1068.67, 1128.87, 1062.59, 1087.01, 1114.32, 1206.04, 1193.49, 1190.9, 1123.09, 1145.89, 1211.75, 1238.91, 1172.02, 1276.99, 1274.47, 1400, 1567.82, 1512.78, 1427.94, 1442.95, 1464.13, 1487.66, 1534.95, 1429.1, 1438.24, 1511.43, 1382.58, 1548.85, 1795.91, 1785.37, 1900, 1713.32, 1845.19, 1756.45, 2011.39, 2045.2, 2047.48] },
      velocityScore: { '1D': 3.7, '1W': -13.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$267B', pe: 58.2, revenueGrowth: 12, eps: 35.2, grossMargin: 61, dividendYield: 0.44,
      etfPresence: { SOXX: 3.4, PSI: 5.58, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 4.38, proScore: 2.19, coverage: 0.5,
      price: 314.33, weeklyPrices: [343.71, 336.41, 303.28, 324.45, 314.33], weeklyChange: -8.55, sortRank: 0, periodReturns: { '1M': 6.9, '6M': 89.6, '1Y': 256 },
      priceHistory: { '1W': [343.71, 336.41, 303.28, 324.45, 314.33], '1M': [296.05, 289.24, 295.44, 299.15, 284.72, 277.96, 273.38, 292.09, 302.24, 305.35, 322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 314.33], '6M': [165.81, 163.26, 175.16, 171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 242.27, 231, 211.15, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 296.05, 277.96, 322.68, 334.41, 314.33], '1Y': [88.3, 93.41, 95.63, 96.81, 99.81, 100.37, 97.1, 98.94, 96.68, 105.28, 100.33, 103.63, 97.74, 107.36, 121.9, 128.32, 142.79, 142.54, 144.78, 141.25, 155.62, 155.78, 159.18, 143.24, 151.93, 159.75, 168.26, 154.98, 177.33, 185.06, 218.36, 222.96, 217.94, 233.46, 231.01, 235.53, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 259.47, 258.57, 296.05, 277.96, 322.68, 334.41, 314.33] },
      velocityScore: { '1D': 1.4, '1W': -18.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$393B', pe: 59.4, revenueGrowth: 24, eps: 5.29, grossMargin: 50, dividendYield: 0.32,
      etfPresence: { SOXX: 3.41, PSI: 5.35, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 3.94, proScore: 1.97, coverage: 0.5,
      price: 376.49, weeklyPrices: [479.23, 418.91, 385.73, 396.60, 376.49], weeklyChange: -21.44, sortRank: 0, periodReturns: { '1M': -12.4, '6M': -7.3, '1Y': 54.1 },
      priceHistory: { '1W': [479.23, 418.91, 385.73, 396.6, 376.49], '1M': [428.43, 419.3, 416.79, 439.79, 425.19, 420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 376.49], '6M': [406.29, 341.3, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 420.71, 422.01, 481.57, 376.49], '1Y': [244.28, 252.1, 263.77, 264.74, 277.9, 280.81, 283.69, 297.42, 292.93, 312.83, 294.91, 298.01, 302.39, 369.57, 346.17, 339.31, 333.39, 345.5, 351.33, 340.3, 372.97, 351.94, 351.96, 340.5, 385.03, 380.61, 412.97, 326.02, 350.22, 347.62, 344.97, 351.71, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 418.2, 416.5, 428.43, 420.71, 422.01, 481.57, 376.49] },
      velocityScore: { '1D': -2.5, '1W': -50.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 62.4, revenueGrowth: 48, eps: 6.03, grossMargin: 76, dividendYield: 0.66,
      etfPresence: { SOXX: 6.1, PSI: false, XSD: 1.78, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 3.32, proScore: 1.66, coverage: 0.5,
      price: 313.05, weeklyPrices: [363.54, 358.05, 317.06, 346.33, 313.05], weeklyChange: -13.89, sortRank: 0, periodReturns: { '1M': 56.7, '6M': 87.4, '1Y': 239 },
      priceHistory: { '1W': [363.54, 358.05, 317.06, 346.33, 313.05], '1M': [207.35, 204.42, 224.09, 228.64, 232.68, 215.58, 244.26, 287.48, 297.84, 306.88, 318.72, 325.33, 349.17, 342.85, 320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 313.05], '6M': [167.08, 144.94, 168.83, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 122.31, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 215.58, 318.72, 355.76, 313.05], '1Y': [92.35, 95.3, 87.26, 88.66, 99.86, 91.94, 119.48, 118.41, 135.54, 192, 171.06, 178.56, 176.61, 230.37, 249.38, 205.27, 194.5, 219.36, 161.46, 154.85, 168.25, 179.31, 167.55, 139.52, 144.78, 152.5, 164.32, 140.24, 169.97, 179.56, 162.61, 182, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 196.64, 201.25, 207.35, 215.58, 318.72, 355.76, 313.05] },
      velocityScore: { '1D': 4.4, '1W': -23.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$54B', pe: 210.1, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.39, PSI: false, XSD: 4.25, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 3.12, proScore: 1.56, coverage: 0.5,
      price: 198.42, weeklyPrices: [250.01, 242.57, 215.94, 217.77, 198.42], weeklyChange: -20.64, sortRank: 0, periodReturns: { '1M': -9.4, '6M': 12.7, '1Y': 27.7 },
      priceHistory: { '1W': [250.01, 242.57, 215.94, 217.77, 198.42], '1M': [237.53, 210.31, 213.17, 200.08, 201.49, 203.64, 195.61, 202.51, 213.41, 238.16, 248.82, 233.4, 243.29, 251.02, 228.99, 240.84, 250.01, 242.57, 215.94, 217.77, 198.42], '6M': [176, 176.12, 174.75, 171.05, 181.87, 161.39, 155.82, 151.59, 137.34, 140.7, 140.41, 141.03, 138.11, 129.82, 129.9, 127.11, 125.73, 131.24, 137.52, 150.26, 168.38, 237.53, 203.64, 248.82, 240.84, 198.42], '1Y': [155.41, 156.87, 155.71, 159.4, 159.35, 154.07, 159.88, 162.08, 146.71, 153.73, 156.25, 159.17, 157.28, 158.95, 165.26, 173.55, 166.49, 167.77, 162.97, 169.27, 181.03, 172.84, 173.98, 165.06, 163.3, 175.07, 182.21, 172.34, 174.77, 172.98, 177.78, 159.42, 155.82, 151.59, 137.34, 140.7, 140.41, 141.03, 138.11, 129.39, 128.35, 127.07, 124.07, 132.84, 135.56, 150.26, 168.38, 237.53, 203.64, 248.82, 240.84, 198.42] },
      velocityScore: { '1D': -4.3, '1W': -32.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$209B', pe: 21.3, revenueGrowth: -4, eps: 9.3, grossMargin: 55, dividendYield: 1.69,
      etfPresence: { SOXX: 3.76, PSI: false, XSD: 2.48, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 2.8, proScore: 1.4, coverage: 0.5,
      price: 278.03, weeklyPrices: [308.59, 305.37, 285.06, 290.90, 278.03], weeklyChange: -9.9, sortRank: 0, periodReturns: { '1M': -3.4, '6M': 54.9, '1Y': 39.6 },
      priceHistory: { '1W': [308.59, 305.37, 285.06, 290.9, 278.03], '1M': [297.76, 295.17, 306.34, 308.17, 302.73, 300.6, 302.31, 304.88, 298.39, 309.21, 324.89, 317.45, 315.95, 305.68, 293.2, 308.12, 308.59, 305.37, 285.06, 290.9, 278.03], '6M': [179.52, 177.56, 177.08, 173.49, 188.45, 189.12, 193.31, 215.55, 221.44, 226.16, 219.86, 209.82, 196.2, 190.78, 187.19, 190.33, 199.42, 216.71, 233.7, 269.5, 280.89, 297.76, 300.6, 324.89, 308.12, 278.03], '1Y': [199.21, 199.22, 205.81, 210.45, 216.39, 216.64, 186.25, 191.38, 185.4, 192.97, 195.94, 205.98, 195.74, 184.01, 180.3, 184.44, 180.39, 181.6, 175.27, 170.71, 166.91, 159.36, 159.73, 157.32, 161.77, 182.6, 181.67, 174.49, 177.13, 177.52, 190.31, 191.58, 193.31, 215.55, 221.44, 226.16, 219.86, 209.82, 196.2, 194.13, 188.63, 186.42, 199.74, 218.87, 233.15, 269.5, 280.89, 297.76, 300.6, 324.89, 308.12, 278.03] },
      velocityScore: { '1D': -2.8, '1W': -52.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$253B', pe: 47.5, revenueGrowth: 19, eps: 5.85, grossMargin: 57, dividendYield: 1.95,
      etfPresence: { SOXX: 3.37, PSI: false, XSD: 2.24, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.79, proScore: 1.39, coverage: 0.5,
      price: 1444.87, weeklyPrices: [1689.89, 1652.60, 1481.05, 1559.18, 1444.87], weeklyChange: -14.5, sortRank: 0, periodReturns: { '1M': -9.7, '6M': 50, '1Y': 104.6 },
      priceHistory: { '1W': [1689.89, 1652.6, 1481.05, 1559.18, 1444.87], '1M': [1661.1, 1599.52, 1650.35, 1613.97, 1550.02, 1486.33, 1468.11, 1553.27, 1561.25, 1589.81, 1662.98, 1620.17, 1633.17, 1566.21, 1542.39, 1624.99, 1689.89, 1652.6, 1481.05, 1559.18, 1444.87], '6M': [962.95, 951.36, 943.55, 906.36, 959.09, 1009.54, 1063.74, 1124.15, 1229.82, 1171.47, 1190.06, 1142.58, 1062, 1052.59, 1068.85, 1053.01, 1180.03, 1372.23, 1490.86, 1587.57, 1573.3, 1661.1, 1486.33, 1662.98, 1624.99, 1444.87], '1Y': [706.28, 706.59, 716.58, 746.97, 751.14, 714.03, 720.01, 724.37, 802.78, 840.56, 844.8, 850.64, 827.56, 855.18, 877.66, 908.45, 915.87, 980.9, 1007.93, 1001.4, 1086.36, 957.87, 954.71, 856.96, 908.61, 958.02, 979.02, 912.25, 953.25, 936.31, 958.97, 1033.17, 1063.74, 1124.15, 1229.82, 1171.47, 1190.06, 1142.58, 1062, 1077.4, 1076.35, 1002.34, 1191.22, 1363.42, 1527.95, 1587.57, 1573.3, 1661.1, 1486.33, 1662.98, 1624.99, 1444.87] },
      velocityScore: { '1D': 0, '1W': -28.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$71B', pe: 103, revenueGrowth: 26, eps: 14.03, grossMargin: 55, dividendYield: 0.51,
      etfPresence: { SOXX: 3.35, PSI: false, XSD: 2.22, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.78, proScore: 1.39, coverage: 0.5,
      price: 285.73, weeklyPrices: [321.88, 322.22, 295.96, 301.14, 285.73], weeklyChange: -11.23, sortRank: 0, periodReturns: { '1M': -3.1, '6M': 25.3, '1Y': 34.1 },
      priceHistory: { '1W': [321.88, 322.22, 295.96, 301.14, 285.73], '1M': [305.99, 294.23, 298.41, 294.17, 291.5, 291.68, 294.28, 310.15, 299.38, 316.47, 332.67, 329.24, 330.28, 321.35, 311.38, 323.62, 321.88, 322.22, 295.96, 301.14, 285.73], '6M': [228.05, 229.75, 225.98, 217.06, 237.89, 238.6, 232.48, 226.14, 224.32, 244.43, 231.16, 224.76, 205.25, 190.86, 191.37, 191.66, 197.08, 208, 221.34, 236.87, 290.76, 305.99, 291.68, 332.67, 323.62, 285.73], '1Y': [213.08, 217.53, 218.51, 221.21, 230.42, 220.58, 224.71, 226.74, 208.47, 220.05, 229.27, 237.82, 228.2, 219.28, 221.89, 227.66, 224.91, 225.64, 217.23, 217.16, 212.96, 204.42, 202.86, 188.59, 191.02, 227.56, 230.78, 223.23, 225.26, 221.28, 241.15, 237.11, 232.48, 226.14, 224.32, 244.43, 231.16, 224.76, 205.25, 191.89, 193.39, 187.39, 195.12, 209.89, 224.5, 236.87, 290.76, 305.99, 291.68, 332.67, 323.62, 285.73] },
      velocityScore: { '1D': -3.5, '1W': -31.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$72B', pe: 27.3, revenueGrowth: 12, eps: 10.45, grossMargin: 56, dividendYield: 1.35,
      etfPresence: { SOXX: 3.26, PSI: false, XSD: 2.3, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 2.76, proScore: 1.38, coverage: 0.5,
      price: 110.99, weeklyPrices: [133.93, 131.82, 117.26, 120.90, 110.99], weeklyChange: -17.13, sortRank: 0, periodReturns: { '1M': 7.6, '6M': 101, '1Y': 111.9 },
      priceHistory: { '1W': [133.93, 131.82, 117.26, 120.9, 110.99], '1M': [107.24, 104.11, 115.71, 118.37, 113.11, 109.43, 106.02, 110.21, 109.61, 116.2, 127, 124.89, 123.77, 120.62, 120.92, 128.64, 133.93, 131.82, 117.26, 120.9, 110.99], '6M': [55.23, 54.56, 55.69, 54.15, 60.89, 60.28, 61.98, 59.89, 65.2, 72.21, 69.47, 66.48, 59.23, 58.55, 59.26, 58.35, 63.49, 71.02, 85.56, 98.04, 102.04, 107.24, 109.43, 127, 128.64, 110.99], '1Y': [52.38, 53.88, 54.21, 53.6, 57.77, 59.52, 59.61, 58.38, 47.24, 50.01, 49.77, 50.99, 47.79, 48.13, 49.8, 50.94, 48.35, 50.88, 50.36, 51.93, 51.8, 48.28, 48.43, 45.56, 48.31, 57.15, 55.1, 53.33, 55.08, 56.7, 62.16, 60.33, 61.98, 59.89, 65.2, 72.21, 69.47, 66.48, 59.23, 59.88, 59.89, 55.66, 63.79, 72.05, 86.91, 98.04, 102.04, 107.24, 109.43, 127, 128.64, 110.99] },
      velocityScore: { '1D': -1.4, '1W': -28.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$43B', pe: 82.2, revenueGrowth: 5, eps: 1.35, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.41, PSI: false, XSD: 3.11, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.38, proScore: 1.19, coverage: 0.5,
      price: 216.64, weeklyPrices: [214.60, 217.50, 206.89, 222.27, 216.64], weeklyChange: 0.95, sortRank: 0, periodReturns: { '1M': 14.9, '6M': 27.2, '1Y': 204.7 },
      priceHistory: { '1W': [214.6, 217.5, 206.89, 222.27, 216.64], '1M': [210.22, 198.57, 189.36, 184.54, 172.17, 156.27, 168.99, 182.98, 193.39, 218.41, 221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 216.64], '6M': [170.29, 140.34, 147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 115.98, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 156.27, 221.64, 229, 216.64], '1Y': [71.09, 79.17, 91.92, 87.59, 97.59, 101.19, 98.41, 109.38, 110.29, 125.38, 106.3, 120.1, 124.77, 163.96, 164.44, 149.38, 144.91, 148.87, 131.41, 137.2, 162.18, 164.23, 158.5, 139.56, 154.18, 189.19, 157.98, 134.13, 150.19, 143.22, 150.42, 150.97, 133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 180.5, 180.06, 210.22, 156.27, 221.64, 229, 216.64] },
      velocityScore: { '1D': 2.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$40B', pe: 119, revenueGrowth: 157, eps: 1.82, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 1.82, PSI: false, XSD: 2.93, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.29, proScore: 1.15, coverage: 0.5,
      price: 87.63, weeklyPrices: [96.55, 96.30, 88.34, 91.37, 87.63], weeklyChange: -9.24, sortRank: 0, periodReturns: { '1M': -11.6, '6M': 31.1, '1Y': 28.8 },
      priceHistory: { '1W': [96.55, 96.3, 88.34, 91.37, 87.63], '1M': [99.03, 97.7, 96.71, 97.04, 93.85, 92.76, 91.81, 94.02, 91.11, 93.43, 98.05, 96.85, 96.04, 94.65, 91.52, 96.96, 96.55, 96.3, 88.34, 91.37, 87.63], '6M': [66.85, 65.9, 65.35, 63.72, 73.53, 74.45, 74.71, 75.92, 76.01, 78.56, 76.6, 74.31, 65, 61.94, 62.97, 62, 67.22, 73.55, 80.39, 86.84, 95.3, 99.03, 92.76, 98.05, 96.96, 87.63], '1Y': [68.05, 68.19, 70.43, 71.68, 74.68, 74.43, 70.25, 70.68, 67.13, 64.5, 64.71, 67.62, 63.28, 64.74, 65.78, 65.85, 64.11, 66.92, 65.21, 64.5, 63.64, 59.5, 54.71, 50.87, 51.83, 63.61, 67.9, 63.99, 65.36, 65.03, 75.22, 74.7, 74.71, 75.92, 76.01, 78.56, 76.6, 74.31, 65, 63.83, 64.34, 60.06, 67.51, 74.5, 80.93, 86.84, 95.3, 99.03, 92.76, 98.05, 96.96, 87.63] },
      velocityScore: { '1D': -1.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$48B', pe: 398.3, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 1.99,
      etfPresence: { SOXX: 2.46, PSI: false, XSD: 2.12, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.86, proScore: 0.93, coverage: 0.5,
      price: 341.39, weeklyPrices: [390.34, 382.74, 345.40, 361.86, 341.39], weeklyChange: -12.54, sortRank: 0, periodReturns: { '1M': -5.1, '6M': 81.5, '1Y': 170.3 },
      priceHistory: { '1W': [390.34, 382.74, 345.4, 361.86, 341.39], '1M': [365.88, 362.76, 381.55, 383.56, 375.6, 356.25, 358.98, 375.71, 380.45, 385.98, 409.68, 400.66, 391.09, 364.64, 353.79, 382.35, 390.34, 382.74, 345.4, 361.86, 341.39], '6M': [188.08, 175.69, 176.28, 171.28, 167.66, 218.93, 219.26, 219.06, 235.87, 244.16, 245.53, 258.54, 218.73, 217.8, 218.96, 225.44, 233.04, 263.63, 281.08, 279.44, 291.72, 365.88, 356.25, 409.68, 382.35, 341.39], '1Y': [126.3, 131.18, 139.84, 137.38, 139.85, 137.76, 137.19, 140.02, 137.28, 125.45, 121, 128.33, 130.17, 131.7, 131.87, 126.66, 126.56, 133.19, 136.83, 135.91, 147.88, 144.13, 169.98, 158.22, 165.88, 183.46, 186.23, 168.31, 175.81, 174.96, 174.87, 220.68, 219.26, 219.06, 235.87, 244.16, 245.53, 258.54, 218.73, 224.92, 229.26, 209.49, 236.99, 263.92, 285.71, 279.44, 291.72, 365.88, 356.25, 409.68, 382.35, 341.39] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 145.3, revenueGrowth: 23, eps: 2.35, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.23, PSI: false, XSD: 2.48, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RMBS', name: 'RAMBUS INC', easyScore: 2, avgWeight: 1.67, proScore: 0.83, coverage: 0.5,
      price: 135.94, weeklyPrices: [170.66, 169.35, 145.31, 152.03, 135.94], weeklyChange: -20.35, sortRank: 0, periodReturns: { '1M': 5.2, '6M': 29.8, '1Y': 130.3 },
      priceHistory: { '1W': [170.66, 169.35, 145.31, 152.03, 135.94], '1M': [134.51, 130.28, 134.85, 130.46, 127.05, 123.76, 122.03, 133.56, 141.82, 142.98, 157.23, 148.66, 148.02, 145.46, 147.48, 166.78, 170.66, 169.35, 145.31, 152.03, 135.94], '6M': [104.71, 94.69, 94.19, 91.89, 91.34, 103.07, 115.31, 113.83, 107.1, 101.95, 95.27, 98.88, 88.52, 94.01, 91.7, 89.73, 92.22, 113.16, 126.87, 141.31, 111.5, 134.51, 123.76, 157.23, 166.78, 135.94], '1Y': [59.03, 60.37, 62.3, 64.14, 64.79, 66.79, 65.95, 73.15, 73.79, 76.44, 69.78, 75.03, 73.67, 77.11, 97.52, 100.73, 103.14, 99.43, 97.22, 94.45, 103.72, 100.32, 104.93, 87.7, 92.45, 98.03, 106.84, 90.61, 94.48, 99.28, 93.38, 107.99, 115.31, 113.83, 107.1, 101.95, 95.27, 98.88, 88.52, 92.78, 93.35, 79.73, 91.87, 121.73, 130.45, 141.31, 111.5, 134.51, 123.76, 157.23, 166.78, 135.94] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 64.7, revenueGrowth: 8, eps: 2.1, grossMargin: 80, dividendYield: null,
      etfPresence: { SOXX: 0.83, PSI: false, XSD: 2.51, DRAM: false },
      tonyNote: 'RAMBUS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 7, avgWeight: 4.43, proScore: 2.39, coverage: 0.538,
      price: 875.96, weeklyPrices: [1079.57, 996.00, 864.01, 949.28, 875.96], weeklyChange: -18.86, sortRank: 0, periodReturns: { '1M': 17.3, '6M': 247, '1Y': 689.5 },
      priceHistory: { '1W': [1079.57, 996, 864.01, 949.28, 875.96], '1M': [795.33, 766.58, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 875.96], '6M': [252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1, 875.96], '1Y': [110.95, 119.84, 127.91, 120.89, 122.24, 116.43, 109.83, 111.96, 109.06, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 198.47, 221.91, 218.03, 241.11, 228.5, 224.53, 234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1, 875.96] },
      velocityScore: { '1D': -0.4, '1W': -34.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$988B', pe: 41.4, revenueGrowth: 196, eps: 21.17, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { PTF: 4.82, WCLD: false, IGV: false, FDTX: 9.36, GTEK: false, ARKK: false, MARS: false, FRWD: 4.48, BCTK: 4.22, FWD: 1.47, CBSE: 2.64, FCUS: 4.05, WGMI: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 7, avgWeight: 4.24, proScore: 2.28, coverage: 0.538,
      price: 201.43, weeklyPrices: [214.75, 218.66, 205.10, 208.64, 201.43], weeklyChange: -6.2, sortRank: 0, periodReturns: { '1M': -6.4, '6M': 8.9, '1Y': 41.2 },
      priceHistory: { '1W': [214.75, 218.66, 205.1, 208.64, 201.43], '1M': [219.44, 220.78, 225.83, 235.74, 225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 201.43], '6M': [184.97, 177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 222.32, 214.86, 222.82, 201.43], '1Y': [142.63, 144.69, 147.9, 153.3, 162.88, 171.37, 170.78, 175.51, 178.26, 183.16, 175.64, 181.77, 170.62, 177.33, 170.29, 176.97, 187.24, 189.11, 179.83, 180.28, 201.03, 198.69, 193.16, 181.36, 177.82, 179.59, 183.78, 170.94, 188.61, 188.85, 184.86, 186.23, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 216.61, 198.48, 219.44, 222.32, 214.86, 222.82, 201.43] },
      velocityScore: { '1D': 0, '1W': -47.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.9T', pe: 30.8, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.48,
      etfPresence: { PTF: 4.52, WCLD: false, IGV: false, FDTX: 4.62, GTEK: false, ARKK: 1.74, MARS: false, FRWD: 8.16, BCTK: 6.6, FWD: 1.95, CBSE: false, FCUS: false, WGMI: 2.09 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 5, avgWeight: 4.42, proScore: 1.7, coverage: 0.385,
      price: 448.52, weeklyPrices: [542.52, 523.20, 466.38, 490.33, 448.52], weeklyChange: -17.33, sortRank: 0, periodReturns: { '1M': -1.5, '6M': 102.4, '1Y': 268.5 },
      priceHistory: { '1W': [542.52, 523.2, 466.38, 490.33, 448.52], '1M': [458.79, 448.29, 445.5, 449.7, 424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 448.52], '6M': [221.62, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 503.89, 521.54, 448.52], '1Y': [121.73, 126.39, 138.43, 136.11, 138.41, 160.08, 158.65, 177.44, 174.31, 174.95, 166.55, 166.62, 162.13, 159.54, 159.16, 160.88, 164.01, 235.56, 238.6, 230.23, 258.01, 250.05, 237.52, 230.29, 206.13, 217.6, 221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 334.63, 341.54, 458.79, 420.99, 503.89, 521.54, 448.52] },
      velocityScore: { '1D': 0, '1W': -37.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$731B', pe: 150, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.82, MARS: false, FRWD: 7.63, BCTK: 3.65, FWD: 2.74, CBSE: false, FCUS: 3.25, WGMI: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 5, avgWeight: 3.36, proScore: 1.29, coverage: 0.385,
      price: 376.49, weeklyPrices: [479.23, 418.91, 385.73, 396.60, 376.49], weeklyChange: -21.44, sortRank: 0, periodReturns: { '1M': -12.4, '6M': -7.3, '1Y': 54.1 },
      priceHistory: { '1W': [479.23, 418.91, 385.73, 396.6, 376.49], '1M': [428.43, 419.3, 416.79, 439.79, 425.19, 420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 376.49], '6M': [406.29, 341.3, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 420.71, 422.01, 481.57, 376.49], '1Y': [244.28, 252.1, 263.77, 264.74, 277.9, 280.81, 283.69, 297.42, 292.93, 312.83, 294.91, 298.01, 302.39, 369.57, 346.17, 339.31, 333.39, 345.5, 351.33, 340.3, 372.97, 351.94, 351.96, 340.5, 385.03, 380.61, 412.97, 326.02, 350.22, 347.62, 344.97, 351.71, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 418.2, 416.5, 428.43, 420.71, 422.01, 481.57, 376.49] },
      velocityScore: { '1D': -0.8, '1W': -41.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 62.4, revenueGrowth: 48, eps: 6.03, grossMargin: 76, dividendYield: 0.66,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.79, GTEK: false, ARKK: 1.19, MARS: false, FRWD: 4.25, BCTK: 7.42, FWD: 3.16, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 5, avgWeight: 3.2, proScore: 1.23, coverage: 0.385,
      price: 243.24, weeklyPrices: [250.02, 253.79, 246.03, 245.22, 243.24], weeklyChange: -2.71, sortRank: 0, periodReturns: { '1M': -10.8, '6M': 6.7, '1Y': 12.1 },
      priceHistory: { '1W': [250.02, 253.79, 246.03, 245.22, 243.24], '1M': [268.99, 265.82, 270.13, 267.22, 264.14, 264.86, 259.34, 265.01, 268.46, 266.32, 265.29, 271.85, 274, 270.64, 261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 243.24], '6M': [227.92, 222.56, 232.14, 230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 205.27, 208.39, 213.49, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 272.05, 268.99, 264.86, 265.29, 256.52, 243.24], '1Y': [216.98, 216.1, 212.77, 220.46, 222.54, 223.19, 228.29, 231.01, 213.75, 221.47, 228.01, 228.71, 225.99, 230.33, 231.62, 220.21, 220.63, 225.22, 215.57, 217.95, 229.25, 249.32, 249.1, 222.55, 229.67, 232.38, 231.78, 221.27, 232.38, 226.5, 247.38, 239.12, 239.16, 239.3, 210.32, 198.79, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 261.12, 272.05, 268.99, 264.86, 265.29, 256.52, 243.24] },
      velocityScore: { '1D': 0.8, '1W': -64.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 31.4, revenueGrowth: 17, eps: 7.75, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.01, GTEK: false, ARKK: 2.56, MARS: false, FRWD: 3.45, BCTK: 4.65, FWD: 1.31, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, avgWeight: 5.56, proScore: 1.71, coverage: 0.308,
      price: 825.28, weeklyPrices: [940.69, 925.99, 847.47, 876.77, 825.28], weeklyChange: -12.27, sortRank: 0, periodReturns: { '1M': 5.4, '6M': 191.8, '1Y': 534 },
      priceHistory: { '1W': [940.69, 925.99, 847.47, 876.77, 825.28], '1M': [834.01, 808.8, 817.35, 804.76, 795.47, 740.84, 733.35, 751.07, 810.46, 812.73, 845.76, 870.66, 880.72, 879.8, 921.26, 926.61, 940.69, 925.99, 847.47, 876.77, 825.28], '6M': [282.86, 288.13, 282.8, 275.39, 284.47, 320.32, 346.1, 407.69, 429.32, 425.99, 407.4, 379.52, 374.33, 383.71, 411.23, 380.07, 453.3, 513.28, 539.75, 595.86, 738.54, 834.01, 740.84, 845.76, 926.61, 825.28], '1Y': [130.17, 131.04, 136.31, 145.04, 142.01, 147.12, 152.76, 152.68, 151.74, 155.59, 157.93, 165.24, 176.32, 193.04, 213.36, 223.7, 256.84, 224.35, 219.38, 215.05, 223, 250.38, 288, 253.86, 261.89, 258.67, 298.92, 277.65, 285.27, 287.54, 304.01, 326.23, 346.1, 407.69, 429.32, 425.99, 407.4, 379.52, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 595.86, 738.54, 834.01, 740.84, 845.76, 926.61, 825.28] },
      velocityScore: { '1D': -10.5, '1W': -41.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$187B', pe: 78.4, revenueGrowth: 44, eps: 10.52, grossMargin: 42, dividendYield: 0.34,
      etfPresence: { PTF: 4.81, WCLD: false, IGV: false, FDTX: 4.04, GTEK: false, ARKK: false, MARS: false, FRWD: 9.13, BCTK: false, FWD: false, CBSE: false, FCUS: 4.25, WGMI: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 4, avgWeight: 5.38, proScore: 1.66, coverage: 0.308,
      price: 411, weeklyPrices: [436.69, 444.92, 415.17, 426.80, 411.00], weeklyChange: -5.88, sortRank: 0, periodReturns: { '1M': -0.2, '6M': 35.5, '1Y': 98.6 },
      priceHistory: { '1W': [436.69, 444.92, 415.17, 426.8, 411], '1M': [404.54, 397.28, 399.8, 417.72, 404.35, 395.95, 392.61, 401.62, 407.15, 404.52, 412.32, 422.73, 424.86, 418.45, 435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 411], '6M': [303.41, 286.87, 296.95, 303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.04, 369.11, 348.7, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 401.61, 404.54, 395.95, 412.32, 446.69, 411], '1Y': [207, 215.68, 220.09, 224.68, 231.84, 237.56, 240.33, 241.33, 232.47, 244.29, 232.7, 238.72, 231.39, 260.44, 262.79, 280.71, 288.47, 304.52, 304.71, 288.88, 301.53, 294.05, 291.17, 277.91, 284.68, 295.45, 310.14, 276.96, 298.8, 319.61, 323.63, 342.4, 334.87, 330.56, 348.85, 366.36, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 404.98, 401.61, 404.54, 395.95, 412.32, 446.69, 411] },
      velocityScore: { '1D': 0.6, '1W': -43, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.1T', pe: 35.3, revenueGrowth: 35, eps: 11.65, grossMargin: 62, dividendYield: 0.89,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6, GTEK: false, ARKK: 1, MARS: false, FRWD: 5.93, BCTK: 8.6, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 4, avgWeight: 4.6, proScore: 1.41, coverage: 0.308,
      price: 494.99, weeklyPrices: [594.11, 575.50, 511.72, 526.93, 494.99], weeklyChange: -16.68, sortRank: 0, periodReturns: { '1M': 3.1, '6M': 192, '1Y': 768.1 },
      priceHistory: { '1W': [594.11, 575.5, 511.72, 526.93, 494.99], '1M': [515.83, 488.74, 494.09, 489.15, 482.02, 458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 494.99], '6M': [169.54, 174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 458.68, 524.65, 563.1, 494.99], '1Y': [57.02, 57.41, 62.07, 63.84, 64.64, 66.53, 69.32, 70.61, 75.84, 75.91, 75.86, 79.71, 86, 95.02, 100.94, 109.69, 130.59, 121.18, 120.44, 120.47, 124.92, 152.18, 169.99, 152.86, 155.41, 155.59, 181.95, 166.26, 179.56, 187.7, 200.46, 221.51, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 400.73, 442.36, 515.83, 458.68, 524.65, 563.1, 494.99] },
      velocityScore: { '1D': 0, '1W': -45.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$171B', pe: 29.6, revenueGrowth: 46, eps: 16.7, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { PTF: 4.74, WCLD: false, IGV: false, FDTX: 4, GTEK: false, ARKK: false, MARS: false, FRWD: 5.42, BCTK: false, FWD: false, CBSE: false, FCUS: 4.23, WGMI: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 4, avgWeight: 4.16, proScore: 1.28, coverage: 0.308,
      price: 314.33, weeklyPrices: [343.71, 336.41, 303.28, 324.45, 314.33], weeklyChange: -8.55, sortRank: 0, periodReturns: { '1M': 6.9, '6M': 89.6, '1Y': 256 },
      priceHistory: { '1W': [343.71, 336.41, 303.28, 324.45, 314.33], '1M': [296.05, 289.24, 295.44, 299.15, 284.72, 277.96, 273.38, 292.09, 302.24, 305.35, 322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 314.33], '6M': [165.81, 163.26, 175.16, 171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 242.27, 231, 211.15, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 296.05, 277.96, 322.68, 334.41, 314.33], '1Y': [88.3, 93.41, 95.63, 96.81, 99.81, 100.37, 97.1, 98.94, 96.68, 105.28, 100.33, 103.63, 97.74, 107.36, 121.9, 128.32, 142.79, 142.54, 144.78, 141.25, 155.62, 155.78, 159.18, 143.24, 151.93, 159.75, 168.26, 154.98, 177.33, 185.06, 218.36, 222.96, 217.94, 233.46, 231.01, 235.53, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 259.47, 258.57, 296.05, 277.96, 322.68, 334.41, 314.33] },
      velocityScore: { '1D': 16.4, '1W': -43.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$393B', pe: 59.4, revenueGrowth: 24, eps: 5.29, grossMargin: 50, dividendYield: 0.32,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.79, BCTK: 6.54, FWD: 1.75, CBSE: 2.57, FCUS: false, WGMI: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 3, proScore: 0.92, coverage: 0.308,
      price: 108.42, weeklyPrices: [112.94, 116.04, 109.54, 110.78, 108.42], weeklyChange: -4, sortRank: 0, periodReturns: { '1M': -1.8, '6M': -32.2, '1Y': 0.6 },
      priceHistory: { '1W': [112.94, 116.04, 109.54, 110.78, 108.42], '1M': [102.54, 99.84, 95.4, 97.42, 100.28, 102.39, 101.01, 105.01, 104.86, 103, 104.9, 106.6, 115.03, 118.71, 124.12, 117.01, 112.94, 116.04, 109.54, 110.78, 108.42], '6M': [159.89, 163.14, 169.53, 160.97, 168.28, 157.99, 137.89, 131.23, 112.05, 112.7, 117.28, 119.38, 133.5, 122.96, 116.78, 111.85, 118.8, 114.97, 135.14, 124.23, 127.55, 102.54, 102.39, 104.9, 117.01, 108.42], '1Y': [107.8, 108.37, 114.42, 112.67, 114.32, 120, 122.21, 124.85, 127, 149.3, 139.25, 140.85, 140.22, 142.2, 147.87, 148.83, 149.57, 166.43, 156.21, 162.01, 178.96, 160.94, 158.94, 140.45, 157.37, 160, 168.42, 161.73, 169.45, 157.2, 164.48, 155.81, 137.89, 131.23, 112.05, 112.7, 117.28, 119.38, 133.5, 126.58, 121.1, 111.77, 117.06, 117.64, 131.13, 124.23, 127.55, 102.54, 102.39, 104.9, 117.01, 108.42] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$141B', pe: 106.3, revenueGrowth: 34, eps: 1.02, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.89, GTEK: false, ARKK: 4.41, MARS: false, FRWD: 1.97, BCTK: 2.74, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 13 Broad Tech ETFs (31% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NET', name: 'Cloudflare', easyScore: 4, avgWeight: 1.92, proScore: 0.59, coverage: 0.308,
      price: 232.54, weeklyPrices: [265.33, 268.64, 250.11, 247.79, 232.54], weeklyChange: -12.36, sortRank: 0, periodReturns: { '1M': 18.6, '6M': 11.3, '1Y': 30.8 },
      priceHistory: { '1W': [265.33, 268.64, 250.11, 247.79, 232.54], '1M': [193.52, 186.79, 192.62, 199.81, 197.56, 201.75, 206.73, 210.13, 212.65, 216.17, 217.54, 209.22, 228.11, 241.82, 270.82, 272.66, 265.33, 268.64, 250.11, 247.79, 232.54], '6M': [208.93, 197.53, 202.08, 197.15, 186.96, 184.14, 173.44, 177.35, 173.21, 195.85, 160.19, 181.02, 201.48, 212.45, 215.42, 203.02, 211.78, 184.02, 204.81, 212.36, 224.17, 193.52, 201.75, 217.54, 272.66, 232.54], '1Y': [177.8, 179.27, 186.43, 184.95, 193.49, 189.81, 189.15, 199.43, 207.81, 202.33, 196.51, 198.55, 205.71, 222.97, 213.88, 217.57, 217.06, 220, 217.38, 210.73, 223.99, 232.91, 234.95, 196.53, 197.49, 204.35, 213.46, 191.43, 202.66, 196.02, 182.78, 184.17, 173.44, 177.35, 173.21, 195.85, 160.19, 181.02, 201.48, 207.33, 220.65, 194.63, 216.29, 178.65, 207.67, 212.36, 224.17, 193.52, 201.75, 217.54, 272.66, 232.54] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$82B', pe: null, revenueGrowth: 34, eps: -0.25, grossMargin: 73, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 1.95, IGV: false, FDTX: 2.05, GTEK: 2.24, ARKK: false, MARS: false, FRWD: false, BCTK: 1.43, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Cloudflare appears in 4 of 13 Broad Tech ETFs (31% coverage) with average weight 1.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 3, avgWeight: 5.2, proScore: 1.2, coverage: 0.231,
      price: 401.64, weeklyPrices: [427.34, 428.05, 416.67, 411.74, 401.64], weeklyChange: -6.01, sortRank: 0, periodReturns: { '1M': -3.2, '6M': -18.4, '1Y': -15 },
      priceHistory: { '1W': [427.34, 428.05, 416.67, 411.74, 401.64], '1M': [412.66, 407.77, 405.21, 409.43, 421.92, 423.54, 417.42, 421.06, 419.09, 418.57, 416.03, 412.67, 426.99, 450.24, 460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 401.64], '6M': [492.02, 476.39, 486.85, 483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 384.47, 398.55, 409.41, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 413.62, 412.66, 423.54, 416.03, 441.31, 401.64], '1Y': [472.75, 479.14, 490.11, 492.05, 503.51, 505.62, 505.87, 512.57, 527.75, 529.24, 509.77, 502.04, 505.35, 500.37, 510.02, 510.15, 519.71, 524.85, 513.43, 520.54, 542.07, 514.33, 508.68, 493.79, 476.99, 477.73, 478.56, 476.12, 488.02, 472.94, 479.28, 459.86, 465.95, 430.29, 401.14, 401.32, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 424.82, 413.62, 412.66, 423.54, 416.03, 441.31, 401.64] },
      velocityScore: { '1D': -0.8, '1W': -71.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.0T', pe: 23.9, revenueGrowth: 18, eps: 16.8, grossMargin: 68, dividendYield: 0.88,
      etfPresence: { PTF: false, WCLD: false, IGV: 7.78, FDTX: 3.79, GTEK: false, ARKK: false, MARS: false, FRWD: 4.02, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 3, avgWeight: 4.96, proScore: 1.15, coverage: 0.231,
      price: 390.27, weeklyPrices: [423.70, 418.45, 391.00, 408.95, 390.27], weeklyChange: -7.89, sortRank: 0, periodReturns: { '1M': -8.9, '6M': -12.3, '1Y': 26.5 },
      priceHistory: { '1W': [423.7, 418.45, 391, 408.95, 390.27], '1M': [445, 433.45, 445.27, 443.3, 422.24, 409.99, 404.11, 417.26, 417.85, 426.01, 433.59, 440.36, 442.1, 435.79, 415.88, 423.74, 423.7, 418.45, 391, 408.95, 390.27], '6M': [445.17, 489.88, 485.56, 449.72, 435.8, 438.57, 449.06, 430.41, 411.11, 417.44, 399.83, 403.32, 398.68, 391.2, 367.96, 361.83, 352.82, 352.42, 392.5, 378.67, 392.51, 445, 409.99, 433.59, 423.74, 390.27], '1Y': [308.58, 329.13, 340.47, 300.71, 295.88, 321.67, 332.56, 321.2, 308.72, 340.84, 329.31, 351.67, 334.09, 347.79, 425.86, 442.79, 459.46, 438.69, 435.15, 438.97, 460.55, 444.26, 439.62, 401.25, 419.4, 446.74, 451.45, 467.26, 485.4, 438.07, 445.01, 437.5, 449.06, 430.41, 411.11, 417.44, 399.83, 403.32, 398.68, 395.56, 380.85, 355.28, 346.65, 364.2, 386.42, 378.67, 392.51, 445, 409.99, 433.59, 423.74, 390.27] },
      velocityScore: { '1D': 2.7, '1W': -74.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 354.8, revenueGrowth: 16, eps: 1.1, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 10.42, MARS: false, FRWD: false, BCTK: 3.39, FWD: 1.08, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 3, avgWeight: 4.57, proScore: 1.05, coverage: 0.231,
      price: 254.14, weeklyPrices: [280.43, 279.25, 272.05, 266.33, 254.14], weeklyChange: -9.37, sortRank: 0, periodReturns: { '1M': 22.3, '6M': 30.3, '1Y': 29.4 },
      priceHistory: { '1W': [280.43, 279.25, 272.05, 266.33, 254.14], '1M': [213.66, 215.6, 227.79, 238.21, 242.83, 247.55, 240.13, 246.66, 252.92, 260.58, 256.75, 248.47, 257.77, 281.69, 300.48, 297.18, 280.43, 279.25, 272.05, 266.33, 254.14], '6M': [195, 187.09, 188.12, 184.2, 190.8, 187.73, 180.18, 176.97, 159.32, 166.95, 144.14, 150.15, 165.1, 167.02, 162.95, 147.02, 161.95, 162.51, 169.56, 182.9, 184.56, 213.66, 247.55, 256.75, 297.18, 254.14], '1Y': [196.33, 198.11, 201.69, 197.58, 206.06, 192.59, 199.22, 193.84, 169.09, 175.4, 181.56, 184.23, 191.53, 197.33, 203.12, 200.7, 206.8, 217.79, 206.7, 212.42, 221.38, 214.52, 218.27, 201, 186.27, 193.63, 192.96, 183.44, 187.22, 179.37, 189.02, 187.66, 180.18, 176.97, 159.32, 166.95, 144.14, 150.15, 165.1, 167.45, 164.05, 154.35, 169.87, 161.59, 174.96, 182.9, 184.56, 213.66, 247.55, 256.75, 297.18, 254.14] },
      velocityScore: { '1D': -1.9, '1W': -52.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$207B', pe: 221, revenueGrowth: 31, eps: 1.15, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.41, IGV: 7.62, FDTX: 3.67, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 3, avgWeight: 4.28, proScore: 0.99, coverage: 0.231,
      price: 128.84, weeklyPrices: [142.20, 141.70, 135.53, 136.47, 128.84], weeklyChange: -9.39, sortRank: 0, periodReturns: { '1M': -6.5, '6M': -29.1, '1Y': -2.4 },
      priceHistory: { '1W': [142.2, 141.7, 135.53, 136.47, 128.84], '1M': [136.89, 136, 130.05, 133.73, 133.99, 135.14, 135.26, 137.15, 137.41, 136.88, 136.6, 132.51, 143.34, 156.54, 160.65, 152.17, 142.2, 141.7, 135.53, 136.47, 128.84], '6M': [181.84, 187.75, 194.13, 177.75, 176.86, 177.07, 169.6, 146.59, 135.9, 131.41, 130.6, 145.17, 156.43, 150.95, 150.68, 143.06, 147.93, 132.37, 145.89, 143.1, 146.03, 136.89, 135.14, 136.6, 152.17, 128.84], '1Y': [132.06, 141.41, 143.23, 130.68, 143.13, 150.91, 154.63, 156.24, 173.27, 186.97, 157.75, 160.87, 154.9, 166.74, 168.33, 179.56, 184.95, 183.56, 179.62, 175.49, 189.6, 190.74, 190.96, 167.33, 163.55, 176.08, 187.91, 177.29, 194.17, 167.86, 177.49, 170.96, 169.6, 146.59, 135.9, 131.41, 130.6, 145.17, 156.43, 152.72, 160.84, 137.55, 150.07, 135.7, 145.97, 143.1, 146.03, 136.89, 135.14, 136.6, 152.17, 128.84] },
      velocityScore: { '1D': 1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$309B', pe: 144.8, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 6.89, FDTX: 2.87, GTEK: false, ARKK: 3.07, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 3, avgWeight: 3.85, proScore: 0.89, coverage: 0.231,
      price: 357.45, weeklyPrices: [355.68, 369.27, 365.76, 361.17, 357.45], weeklyChange: 0.5, sortRank: 0, periodReturns: { '1M': -10, '6M': 12.5, '1Y': 101.2 },
      priceHistory: { '1W': [355.68, 369.27, 365.76, 361.17, 357.45], '1M': [386.77, 383.82, 399.04, 397.17, 393.32, 393.11, 384.9, 384.9, 383.47, 379.38, 384.84, 384.83, 386.12, 376.43, 372.58, 358.39, 355.68, 369.27, 365.76, 361.17, 357.45], '6M': [317.75, 307.73, 315.68, 313.8, 326.01, 333.16, 328.43, 338.53, 323.1, 306.02, 311.69, 306.36, 306.01, 301.46, 298.79, 273.76, 297.66, 319.21, 335.4, 348.52, 379.64, 386.77, 393.11, 384.84, 358.39, 357.45], '1Y': [177.63, 177.94, 167.74, 176.91, 177.66, 183.77, 191.51, 196.43, 195.32, 204.16, 202.49, 207.95, 231.1, 239.56, 249.85, 247.83, 245.54, 245.46, 251.71, 252.53, 268.43, 278.06, 291.74, 284.96, 323.64, 320.62, 321, 298.06, 315.67, 315.32, 329.14, 330.34, 328.43, 338.53, 323.1, 306.02, 311.69, 306.36, 306.01, 304.42, 299.02, 273.14, 303.93, 330.58, 330.47, 348.52, 379.64, 386.77, 393.11, 384.84, 358.39, 357.45] },
      velocityScore: { '1D': 2.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.3, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.66, GTEK: false, ARKK: 1.92, MARS: false, FRWD: false, BCTK: 5.97, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Alphabet Inc Class C appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 3.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'COHR', name: 'Coherent Corp', easyScore: 3, avgWeight: 3.39, proScore: 0.78, coverage: 0.231,
      price: 347.02, weeklyPrices: [417.43, 421.90, 376.99, 401.93, 347.02], weeklyChange: -16.87, sortRank: 0, periodReturns: { '1M': 3.5, '6M': 80.1, '1Y': 327.4 },
      priceHistory: { '1W': [417.43, 421.9, 376.99, 401.93, 347.02], '1M': [379.69, 374.01, 403.71, 404.94, 382.45, 362.83, 353.63, 358.5, 378, 377.57, 381.35, 380.18, 376.95, 361.47, 362.9, 426.89, 417.43, 421.9, 376.99, 401.93, 347.02], '6M': [192.73, 175.2, 191.87, 184.57, 173.15, 195.96, 196.94, 212.18, 227.68, 217.23, 248.89, 298.91, 252.32, 242.76, 253.63, 243.48, 253.22, 307.93, 347.51, 321.53, 329.89, 379.69, 362.83, 381.35, 426.89, 347.02], '1Y': [81.19, 80.76, 80.96, 86.64, 91.25, 97.82, 98.43, 106.98, 105.6, 116.56, 87.76, 91.58, 88.47, 103.49, 103.41, 106.52, 114.65, 116.67, 110.41, 115.37, 134.24, 128.7, 158.01, 138.15, 148.85, 170.96, 197.45, 170.44, 191.37, 194.33, 178.06, 191.04, 196.94, 212.18, 227.68, 217.23, 248.89, 298.91, 252.32, 247.37, 255.05, 219.65, 255.1, 313.42, 343.79, 321.53, 329.89, 379.69, 362.83, 381.35, 426.89, 347.02] },
      velocityScore: { '1D': -2.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$68B', pe: 166, revenueGrowth: 21, eps: 2.09, grossMargin: 37, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.75, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 3.91, FWD: false, CBSE: 2.52, FCUS: false, WGMI: false },
      tonyNote: 'Coherent Corp appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 3.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRWD', name: 'CrowdStrike', easyScore: 3, avgWeight: 3.19, proScore: 0.74, coverage: 0.231,
      price: 626.38, weeklyPrices: [747.61, 719.09, 671.02, 658.79, 626.38], weeklyChange: -16.22, sortRank: 0, periodReturns: { '1M': 18.7, '6M': 20.9, '1Y': 34.9 },
      priceHistory: { '1W': [747.61, 719.09, 671.02, 658.79, 626.38], '1M': [542.26, 546.18, 562.57, 579.95, 594.08, 618.83, 616.88, 650.11, 648.23, 663.46, 671.55, 645.36, 671, 731, 782.17, 768.95, 747.61, 719.09, 671.02, 658.79, 626.38], '6M': [517.98, 488.53, 478.84, 468.76, 463.87, 455, 452.49, 441.4, 395.5, 429.64, 350.33, 384.86, 434.13, 441.78, 409, 369.58, 398.61, 402.24, 433.15, 454.61, 469.24, 542.26, 618.83, 671.55, 768.95, 626.38], '1Y': [464.39, 479.39, 485.38, 492.07, 513.51, 470.45, 461.52, 465.51, 441.75, 435.8, 418.6, 417.6, 413.2, 424.87, 445.5, 476.33, 499.96, 509.95, 489.02, 500.11, 546.94, 533.92, 556.73, 513.67, 512.34, 524.17, 519.54, 470.02, 477.11, 453.58, 470.61, 453.88, 452.49, 441.4, 395.5, 429.64, 350.33, 384.86, 434.13, 423.84, 413.31, 380.06, 423.23, 398.49, 449.61, 454.61, 469.24, 542.26, 618.83, 671.55, 768.95, 626.38] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$159B', pe: null, revenueGrowth: 26, eps: -0.13, grossMargin: 75, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.38, IGV: 5.95, FDTX: 1.24, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'CrowdStrike appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 3.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASML', name: 'ASML Holding', easyScore: 3, avgWeight: 2.84, proScore: 0.66, coverage: 0.231,
      price: 1712.92, weeklyPrices: [1726.36, 1757.47, 1641.74, 1749.04, 1712.92], weeklyChange: -0.78, sortRank: 0, periodReturns: { '1M': 7.6, '6M': 54.1, '1Y': 122.4 },
      priceHistory: { '1W': [1726.36, 1757.47, 1641.74, 1749.04, 1712.92], '1M': [1565.81, 1520.94, 1581.58, 1584.51, 1501.81, 1472.39, 1459.44, 1550.13, 1592, 1632.9, 1632.03, 1597.87, 1605.77, 1612.76, 1628.57, 1705.37, 1726.36, 1757.47, 1641.74, 1749.04, 1712.92], '6M': [1111.44, 1076.05, 1061.84, 1069.86, 1194.32, 1331.6, 1389.04, 1423, 1413.01, 1406.61, 1485.99, 1423.54, 1357.42, 1345.69, 1317.25, 1302.47, 1304.01, 1500.2, 1476.5, 1432.44, 1386.21, 1565.81, 1472.39, 1632.03, 1705.37, 1712.92], '1Y': [770.2, 775.23, 813.36, 790.47, 799.83, 754.45, 716.93, 718.49, 689.63, 741.79, 743.61, 763.2, 736.82, 793.14, 872.27, 946.94, 1003.27, 987.81, 1009.81, 1011.57, 1052.48, 1030.14, 1022.42, 1004.06, 1003.22, 1140.92, 1119.32, 1015.43, 1065.52, 1163.78, 1273.88, 1358.57, 1389.04, 1423, 1413.01, 1406.61, 1485.99, 1423.54, 1357.42, 1375.56, 1369.62, 1253.96, 1306.45, 1518.3, 1458.97, 1432.44, 1386.21, 1565.81, 1472.39, 1632.03, 1705.37, 1712.92] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$660B', pe: 57.6, revenueGrowth: 13, eps: 29.73, grossMargin: 53, dividendYield: 0.5,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 4.98, BCTK: 2.12, FWD: 1.42, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'ASML Holding appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CDNS', name: 'CADENCE DESIGN SYSTEMS INC', easyScore: 3, avgWeight: 2.81, proScore: 0.65, coverage: 0.231,
      price: 381.94, weeklyPrices: [408.00, 411.68, 376.19, 394.24, 381.94], weeklyChange: -6.39, sortRank: 0, periodReturns: { '1M': 5.3, '6M': 14, '1Y': 26.6 },
      priceHistory: { '1W': [408, 411.68, 376.19, 394.24, 381.94], '1M': [364.2, 358.04, 354.55, 352.84, 347.24, 345.99, 338.12, 350.89, 358.46, 373.59, 381.75, 374.05, 373.85, 374.93, 414.16, 416.39, 408, 411.68, 376.19, 394.24, 381.94], '6M': [335.07, 319.53, 316.93, 312.58, 318.8, 320.6, 318.32, 296.36, 283.52, 299.46, 279.8, 303.36, 298.05, 287.03, 283.9, 271.77, 279.39, 288.2, 318.5, 336.54, 349.51, 364.2, 345.99, 381.75, 416.39, 381.94], '1Y': [301.66, 300.81, 296.8, 309.46, 322.91, 314.58, 326.46, 366.26, 360.5, 353.61, 346.88, 344.03, 347.32, 338.53, 347.27, 356.96, 351.97, 350, 324.1, 330.51, 341.3, 333.22, 318.51, 303.21, 303.66, 336.11, 338.06, 313.02, 317.76, 310.4, 327.31, 317.45, 318.32, 296.36, 283.52, 299.46, 279.8, 303.36, 298.05, 292.72, 292.52, 270.88, 279.48, 292.37, 325.84, 336.54, 349.51, 364.2, 345.99, 381.75, 416.39, 381.94] },
      velocityScore: { '1D': 3.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$105B', pe: 88.8, revenueGrowth: 19, eps: 4.3, grossMargin: 86, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 3.84, FDTX: false, GTEK: 2.47, ARKK: false, MARS: false, FRWD: 2.12, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'CADENCE DESIGN SYSTEMS INC appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 3, avgWeight: 5.59, proScore: 4.19, coverage: 0.75,
      price: 274, weeklyPrices: [299.73, 300.06, 284.87, 293.60, 274.00], weeklyChange: -8.58, sortRank: 0, periodReturns: { '1M': -11.4, '6M': 138.2, '1Y': 332.1 },
      priceHistory: { '1W': [299.73, 300.06, 284.87, 293.6, 274], '1M': [322.05, 308.05, 300.84, 296.98, 292.65, 266.8, 261.58, 271.05, 270.75, 279.22, 291.97, 295.94, 288.9, 284.42, 288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 274], '6M': [115.02, 110.88, 112.88, 106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 181.38, 177.5, 173.36, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 269.95, 322.05, 266.8, 291.97, 299.07, 274], '1Y': [63.41, 65.05, 62.82, 70.01, 70.64, 72.53, 78.32, 77.77, 78.75, 90.06, 84.7, 91.08, 85.72, 92.33, 97.11, 97.88, 105.74, 105.13, 109.92, 110.96, 128.09, 126.71, 121.07, 107.22, 104.18, 107.83, 119.95, 105.77, 112.06, 117.51, 121.83, 139.99, 139.32, 147.86, 194.74, 195.02, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 260.52, 269.95, 322.05, 266.8, 291.97, 299.07, 274] },
      velocityScore: { '1D': 59.3, '1W': -17, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 53.3, revenueGrowth: 7, eps: 5.14, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { POW: 6.83, VOLT: 8.09, PBD: false, PBW: 1.84 },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, avgWeight: 5.5, proScore: 2.75, coverage: 0.5,
      price: 265.08, weeklyPrices: [280.09, 276.54, 262.56, 279.13, 265.08], weeklyChange: -5.36, sortRank: 0, periodReturns: { '1M': -11, '6M': 58.3, '1Y': 241.1 },
      priceHistory: { '1W': [280.09, 276.54, 262.56, 279.13, 265.08], '1M': [302.73, 298.22, 266.92, 268.73, 256.72, 258.28, 249.71, 254.75, 260.4, 270.01, 276.25, 280.13, 276.96, 274.52, 269.86, 269.22, 280.09, 276.54, 262.56, 279.13, 265.08], '6M': [167.43, 171.76, 177.23, 169.63, 180.24, 196.61, 196.5, 201.19, 220.78, 232.84, 231.83, 222.45, 191.81, 197.65, 204.09, 203.53, 206.9, 237.93, 254.38, 250.96, 286.69, 302.73, 258.28, 276.25, 269.22, 265.08], '1Y': [77.71, 88.72, 92.48, 95.52, 102.24, 98.77, 107.07, 130.49, 131.71, 134.66, 127.8, 139.31, 138.07, 145.68, 144.6, 142.27, 142.5, 146.89, 150.77, 148.25, 154.78, 154.25, 152.12, 144.07, 150.84, 159.74, 172.82, 164.18, 176.17, 172.78, 187.43, 200.11, 196.5, 201.19, 220.78, 232.84, 231.83, 222.45, 191.81, 205.11, 214.98, 197.83, 210.32, 237.34, 257.41, 250.96, 286.69, 302.73, 258.28, 276.25, 269.22, 265.08] },
      velocityScore: { '1D': 15.1, '1W': -25.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 63.7, revenueGrowth: 17, eps: 4.16, grossMargin: 39, dividendYield: 0.1,
      etfPresence: { POW: 3.4, VOLT: 7.6, PBD: false, PBW: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 2, avgWeight: 5.17, proScore: 2.59, coverage: 0.5,
      price: 678.28, weeklyPrices: [715.67, 719.17, 695.11, 693.81, 678.28], weeklyChange: -5.22, sortRank: 0, periodReturns: { '1M': -9, '6M': 48.1, '1Y': 90.7 },
      priceHistory: { '1W': [715.67, 719.17, 695.11, 693.81, 678.28], '1M': [781.38, 765.81, 773.72, 780.08, 769.99, 723.03, 714.13, 709.93, 716.91, 723.44, 742.18, 733.62, 730.1, 711.73, 687.48, 706.06, 715.67, 719.17, 695.11, 693.81, 678.28], '6M': [457.96, 438.49, 435.2, 422.06, 413.17, 447.64, 468.76, 474.63, 508.11, 524.08, 549.11, 572.66, 568.04, 559.02, 555.39, 549.98, 554.38, 595.84, 604.97, 637.28, 757.34, 781.38, 723.03, 742.18, 706.06, 678.28], '1Y': [355.66, 361.8, 372.26, 372.29, 382.12, 389.12, 405.11, 410.99, 389.12, 391.57, 379.27, 383.92, 374.41, 390.17, 376.01, 402.87, 420.65, 443.45, 436.93, 412.21, 439.57, 438.66, 448.91, 439.29, 450.14, 456.02, 462.21, 414.25, 433.58, 439.68, 422.57, 466.75, 468.76, 474.63, 508.11, 524.08, 549.11, 572.66, 568.04, 574.02, 567.45, 533.78, 555.57, 594.4, 605.89, 637.28, 757.34, 781.38, 723.03, 742.18, 706.06, 678.28] },
      velocityScore: { '1D': 40, '1W': -26.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$102B', pe: 93, revenueGrowth: 26, eps: 7.29, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.85, VOLT: 5.5, PBD: false, PBW: false },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 2, avgWeight: 4.82, proScore: 2.41, coverage: 0.5,
      price: 392.01, weeklyPrices: [421.21, 418.61, 395.94, 403.14, 392.01], weeklyChange: -6.93, sortRank: 0, periodReturns: { '1M': -2.4, '6M': 14.7, '1Y': 20.3 },
      priceHistory: { '1W': [421.21, 418.61, 395.94, 403.14, 392.01], '1M': [419, 401.53, 406.94, 408.1, 399.44, 381.87, 371.88, 379.69, 381.51, 391.35, 403.13, 406.37, 401.94, 400.6, 400.08, 417.62, 421.21, 418.61, 395.94, 403.14, 392.01], '6M': [341.76, 329.93, 322.81, 318.51, 320.58, 333.46, 331.22, 351.42, 373.82, 389.25, 362.05, 377.4, 353.87, 355.4, 356.8, 357.36, 363.89, 403.36, 407.57, 416.77, 422.44, 419, 381.87, 403.13, 417.62, 392.01], '1Y': [325.81, 338.01, 343.26, 355.04, 359.78, 362.89, 380.24, 390.01, 356.45, 363.3, 349, 352.02, 342.99, 362.25, 363.35, 372.21, 373.84, 376.7, 381.72, 360.6, 376.01, 377.72, 367.91, 338.29, 336.65, 335.57, 353.45, 315.82, 323.67, 327.31, 324.51, 343.75, 331.22, 351.42, 373.82, 389.25, 362.05, 377.4, 353.87, 361.04, 359.74, 343.53, 368.85, 401.9, 409.7, 416.77, 422.44, 419, 381.87, 403.13, 417.62, 392.01] },
      velocityScore: { '1D': 33.9, '1W': -27.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$152B', pe: 38.3, revenueGrowth: 17, eps: 10.24, grossMargin: 37, dividendYield: 1.09,
      etfPresence: { POW: 4.18, VOLT: 5.47, PBD: false, PBW: false },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 2, avgWeight: 3.63, proScore: 1.81, coverage: 0.5,
      price: 892, weeklyPrices: [959.36, 963.33, 933.61, 933.85, 892.00], weeklyChange: -7.02, sortRank: 0, periodReturns: { '1M': -14.2, '6M': 42.7, '1Y': 85.8 },
      priceHistory: { '1W': [959.36, 963.33, 933.61, 933.85, 892], '1M': [1073.08, 1071.98, 1062.57, 1090.53, 1049.23, 1012.25, 1011.8, 1024.52, 1043.82, 1038.74, 1070.47, 1031.89, 996, 968.32, 950.54, 969.67, 959.36, 963.33, 933.61, 933.85, 892], '6M': [625.3, 686.22, 661.45, 653.57, 628.4, 642.23, 657.78, 726.37, 779.35, 802.13, 831.7, 881.18, 830.1, 805.02, 851.07, 853.16, 897.36, 991.12, 990.18, 1120.23, 1073.95, 1073.08, 1012.25, 1070.47, 969.67, 892], '1Y': [480, 487.88, 510.84, 506, 535.77, 561.17, 629.03, 632.67, 649.72, 657.44, 603.13, 625.91, 577.04, 643.56, 614.79, 628.97, 606.15, 625.45, 615.95, 576, 570.98, 547.96, 576.08, 554.93, 572.56, 601.97, 723, 614.19, 667.32, 679.55, 622.5, 681.55, 657.78, 726.37, 779.35, 802.13, 831.7, 881.18, 830.1, 827.37, 882.64, 817.35, 910.75, 987.5, 991.3, 1120.23, 1073.95, 1073.08, 1012.25, 1070.47, 969.67, 892] },
      velocityScore: { '1D': 37.1, '1W': -29, '1M': null, '6M': null }, isNew: false,
      marketCap: '$240B', pe: 26.1, revenueGrowth: 16, eps: 34.18, grossMargin: 20, dividendYield: 0.21,
      etfPresence: { POW: 3.32, VOLT: 3.94, PBD: false, PBW: false },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 2, avgWeight: 3.54, proScore: 1.77, coverage: 0.5,
      price: 158.63, weeklyPrices: [176.39, 173.88, 162.86, 163.81, 158.63], weeklyChange: -10.07, sortRank: 0, periodReturns: { '1M': -6.7, '6M': 47.7, '1Y': 132.2 },
      priceHistory: { '1W': [176.39, 173.88, 162.86, 163.81, 158.63], '1M': [173.39, 170.74, 172.91, 173.96, 169.01, 160.69, 158.23, 161.86, 163.57, 164.66, 169.29, 167.8, 164.87, 166.99, 171.55, 173.39, 176.39, 173.88, 162.86, 163.81, 158.63], '6M': [107.42, 102.41, 103.97, 101.97, 102.72, 107.98, 110.29, 112.26, 112.64, 113.25, 114.93, 120.27, 108.13, 109.93, 116.3, 116.98, 117.41, 133.16, 135.8, 141.71, 162.69, 173.39, 160.69, 169.29, 173.39, 158.63], '1Y': [68.32, 70.4, 72.34, 72.16, 75.2, 74.48, 76.63, 79.72, 89.73, 91.84, 88.15, 90.84, 89.49, 94.98, 96.46, 97.27, 100.12, 98.72, 101.1, 96.93, 104.22, 109.62, 109.59, 104.31, 104.93, 104.97, 108.87, 94.99, 103.97, 106.82, 105.38, 112.5, 110.29, 112.26, 112.64, 113.25, 114.93, 120.27, 108.13, 114.3, 121, 112.75, 118.92, 134.48, 137, 141.71, 162.69, 173.39, 160.69, 169.29, 173.39, 158.63] },
      velocityScore: { '1D': null, '1W': -30.3, '1M': null, '6M': null }, isNew: true,
      marketCap: '$26B', pe: 54.1, revenueGrowth: 54, eps: 2.93, grossMargin: 37, dividendYield: 0.51,
      etfPresence: { POW: 3.94, VOLT: 3.14, PBD: false, PBW: false },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 2, avgWeight: 3.19, proScore: 1.59, coverage: 0.5,
      price: 477.64, weeklyPrices: [484.91, 485.27, 476.82, 485.03, 477.64], weeklyChange: -1.5, sortRank: 0, periodReturns: { '1M': -3, '6M': 8.9, '1Y': 21.7 },
      priceHistory: { '1W': [484.91, 485.27, 476.82, 485.03, 477.64], '1M': [490.16, 485.98, 483.79, 482.03, 479.97, 470.87, 461.5, 463.32, 460.98, 475.01, 478.05, 484.25, 473.93, 473.61, 462.93, 480.46, 484.91, 485.27, 476.82, 485.03, 477.64], '6M': [438.7, 438.42, 455.92, 444.11, 460.87, 484.11, 485.53, 487.94, 503.8, 524.12, 516.99, 516.98, 487.76, 467.38, 475.74, 480.97, 499.2, 539.79, 546.23, 555.34, 516, 490.16, 470.87, 478.05, 480.46, 477.64], '1Y': [392.34, 391.89, 402.99, 410.51, 417.71, 418.42, 434.95, 427.33, 427.67, 432.14, 432.81, 442.52, 428.8, 442.33, 433.26, 431.16, 430.47, 419.67, 434.05, 422.63, 455.34, 459.44, 450.12, 417.28, 429.82, 429.34, 448.18, 429.68, 456.28, 463.03, 470.53, 489.31, 485.53, 487.94, 503.8, 524.12, 516.99, 516.98, 487.76, 472.64, 489.07, 472.07, 499.31, 545.62, 549.11, 555.34, 516, 490.16, 470.87, 478.05, 480.46, 477.64] },
      velocityScore: { '1D': 42, '1W': -24.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 28.2, revenueGrowth: 11, eps: 16.93, grossMargin: 36, dividendYield: 1.17,
      etfPresence: { POW: 2.98, VOLT: 3.39, PBD: false, PBW: false },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 2, avgWeight: 3.03, proScore: 1.52, coverage: 0.5,
      price: 248.71, weeklyPrices: [287.32, 291.37, 263.61, 253.57, 248.71], weeklyChange: -13.44, sortRank: 0, periodReturns: { '1M': -4.7, '6M': 127.3, '1Y': 1060.6 },
      priceHistory: { '1W': [287.32, 291.37, 263.61, 253.57, 248.71], '1M': [283.92, 280.69, 289.76, 303.41, 275.95, 258.71, 261.34, 282.31, 307.88, 302.49, 302.4, 293.8, 290.01, 285, 273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 248.71], '6M': [109.44, 87.61, 91.43, 86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 166, 151.32, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 283.92, 258.71, 302.4, 302.85, 248.71], '1Y': [21.43, 22.91, 22.95, 22.13, 28.71, 24.69, 26.89, 34.75, 37.61, 41.25, 43.1, 49.94, 52.45, 62.96, 79.67, 69.18, 90.19, 87.58, 116.58, 94.37, 113.28, 129.05, 127.07, 104.97, 94.29, 102.5, 101.29, 76.97, 91.88, 98.69, 134.07, 149.5, 144.89, 151.37, 143.03, 139.74, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 234.68, 288.64, 283.92, 258.71, 302.4, 302.85, 248.71] },
      velocityScore: { '1D': -28, '1W': -32.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$71B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: 4.03, PBD: false, PBW: 2.03 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 2, avgWeight: 3, proScore: 1.5, coverage: 0.5,
      price: 84.87, weeklyPrices: [84.58, 85.68, 85.84, 84.01, 84.87], weeklyChange: 0.34, sortRank: 0, periodReturns: { '1M': -8.8, '6M': 6.6, '1Y': 18 },
      priceHistory: { '1W': [84.58, 85.68, 85.84, 84.01, 84.87], '1M': [94.84, 94.59, 94.85, 95.68, 93.36, 89.04, 90.06, 88.27, 89.69, 88.55, 87.65, 87.65, 87.25, 87.01, 83.66, 85.68, 84.58, 85.68, 85.84, 84.01, 84.87], '6M': [79.64, 81.32, 79.79, 80.28, 79.49, 82.19, 84.81, 87.9, 89.47, 93.8, 94.06, 92.71, 92.01, 92.78, 89.5, 91.4, 92.73, 92.3, 92.01, 94.83, 95.51, 94.84, 89.04, 87.65, 85.68, 84.87], '1Y': [71.9, 73.78, 71.4, 73.06, 73.65, 74.77, 72.82, 71.95, 71.18, 71.86, 76.51, 74.84, 71.63, 71.04, 70.31, 73.83, 78.67, 84.04, 85.79, 82.84, 83.57, 81.69, 85.76, 84.64, 84.83, 84.95, 81.27, 80.29, 80.45, 80.93, 79.89, 83.63, 84.81, 87.9, 89.47, 93.8, 94.06, 92.71, 92.01, 92.82, 90.23, 92.05, 93.67, 91.31, 90.6, 94.83, 95.51, 94.84, 89.04, 87.65, 85.68, 84.87] },
      velocityScore: { '1D': 10.3, '1W': -27.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$177B', pe: 21.5, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.97,
      etfPresence: { POW: 2.01, VOLT: 3.99, PBD: false, PBW: false },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 2.83, proScore: 1.41, coverage: 0.5,
      price: 128.23, weeklyPrices: [126.31, 127.79, 129.14, 126.77, 128.23], weeklyChange: 1.52, sortRank: 0, periodReturns: { '1M': -1.5, '6M': 10.5, '1Y': 26.4 },
      priceHistory: { '1W': [126.31, 127.79, 129.14, 126.77, 128.23], '1M': [130.7, 131.94, 127.95, 128.6, 125.15, 127.68, 128.92, 128.87, 129.61, 131.59, 130.9, 129.57, 127.76, 126.67, 123.79, 127.11, 126.31, 127.79, 129.14, 126.77, 128.23], '6M': [116.07, 114.57, 115.15, 115.31, 115.93, 119.4, 116.63, 119.78, 120.8, 129.94, 132.03, 133.29, 131.86, 133.61, 125.66, 130.1, 132.36, 134.46, 133.28, 135.07, 134.66, 130.7, 127.68, 130.9, 127.11, 128.23], '1Y': [101.41, 101.91, 103.28, 104.39, 104.74, 105.49, 108.89, 109.22, 113.24, 111.99, 112.66, 112.63, 110.03, 108.34, 107.52, 108.88, 112.75, 118.19, 118.53, 117.27, 115.11, 120.3, 122.73, 123.51, 121.58, 118.06, 114.16, 114.71, 115.31, 115.81, 116.91, 119.96, 116.63, 119.78, 120.8, 129.94, 132.03, 133.29, 131.86, 134.15, 127.92, 131.12, 132.92, 135.46, 131.89, 135.07, 134.66, 130.7, 127.68, 130.9, 127.11, 128.23] },
      velocityScore: { '1D': -2.8, '1W': -26.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 19, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 3,
      etfPresence: { POW: 1.4, VOLT: 4.25, PBD: false, PBW: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.5, proScore: 1.25, coverage: 0.5,
      price: 147.04, weeklyPrices: [147.62, 146.77, 138.81, 143.60, 147.04], weeklyChange: -0.39, sortRank: 0, periodReturns: { '1M': 14.8, '6M': 6.1, '1Y': 58.2 },
      priceHistory: { '1W': [147.62, 146.77, 138.81, 143.6, 147.04], '1M': [122.47, 127.87, 124.64, 129.19, 125, 121.72, 119.2, 123.05, 124.86, 132.06, 139.56, 140.24, 147.68, 148.76, 146.34, 148.4, 147.62, 146.77, 138.81, 143.6, 147.04], '6M': [138.58, 129.13, 137.12, 135.14, 136.25, 154.22, 150.99, 144.08, 136.23, 146.72, 147.82, 135.16, 136.06, 133.92, 126.74, 123.62, 126.49, 145.27, 152.81, 148.64, 141.03, 122.47, 121.72, 139.56, 148.4, 147.04], '1Y': [92.96, 93.38, 95.8, 97.39, 98.21, 100.55, 100.71, 105.31, 107.93, 111.85, 109.98, 109.9, 110.69, 119.09, 118.41, 123.13, 124.66, 125.79, 125.6, 128.93, 137.29, 136.7, 143.47, 132.44, 137.81, 138.65, 138.68, 126.51, 137.94, 139.71, 140.16, 154.39, 150.99, 144.08, 136.23, 146.72, 147.82, 135.16, 136.06, 136.8, 130.67, 119.15, 128.38, 148.72, 151.93, 148.64, 141.03, 122.47, 121.72, 139.56, 148.4, 147.04] },
      velocityScore: { '1D': -4.6, '1W': -30.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$181B', pe: 42.3, revenueGrowth: 58, eps: 3.48, grossMargin: 38, dividendYield: 0.7,
      etfPresence: { POW: 0.95, VOLT: 4.06, PBD: false, PBW: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.46, proScore: 1.23, coverage: 0.5,
      price: 301.39, weeklyPrices: [322.50, 320.92, 294.81, 306.11, 301.39], weeklyChange: -6.55, sortRank: 0, periodReturns: { '1M': -15.6, '6M': 36.2, '1Y': 139.7 },
      priceHistory: { '1W': [322.5, 320.92, 294.81, 306.11, 301.39], '1M': [354.97, 339.42, 339.19, 344.6, 323.46, 309.06, 302.84, 313.05, 323.79, 324.86, 339.65, 328.34, 317.08, 302.18, 294.65, 312.28, 322.5, 320.92, 294.81, 306.11, 301.39], '6M': [221.27, 215.16, 217.51, 209.37, 210.99, 257.29, 262.19, 255.36, 273.26, 314.27, 329.24, 340.42, 305.02, 302.02, 317.21, 310.76, 331.9, 378.94, 380.22, 385.68, 387.03, 354.97, 309.06, 339.65, 312.28, 301.39], '1Y': [125.73, 125.26, 132.51, 133.59, 141.13, 139.42, 142.84, 142.21, 139.58, 158.81, 150.41, 154.44, 145.25, 157.25, 157.79, 170.77, 176.2, 174.92, 189.96, 190.46, 204.62, 195.05, 215.98, 199.22, 205.92, 213.44, 221.47, 204.49, 217.23, 221.99, 219.59, 253.86, 262.19, 255.36, 273.26, 314.27, 329.24, 340.42, 305.02, 308.31, 329.78, 298.29, 339.32, 385.73, 385, 385.68, 387.03, 354.97, 309.06, 339.65, 312.28, 301.39] },
      velocityScore: { '1D': -3.9, '1W': -26.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 62.8, revenueGrowth: 26, eps: 4.8, grossMargin: 39, dividendYield: 0.13,
      etfPresence: { POW: 0.96, VOLT: 3.97, PBD: false, PBW: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'XEL', name: 'Xcel Energy Inc', easyScore: 2, avgWeight: 1.97, proScore: 0.98, coverage: 0.5,
      price: 78.44, weeklyPrices: [77.39, 77.77, 79.04, 77.62, 78.44], weeklyChange: 1.36, sortRank: 0, periodReturns: { '1M': -1.2, '6M': 3.6, '1Y': 14.7 },
      priceHistory: { '1W': [77.39, 77.77, 79.04, 77.62, 78.44], '1M': [80.6, 79.9, 79.91, 80.03, 77.92, 78.1, 79.73, 79.86, 80.2, 81.08, 80.78, 81, 79.26, 79.5, 76.41, 77.87, 77.39, 77.77, 79.04, 77.62, 78.44], '6M': [75.72, 73.73, 74.01, 73.86, 73.38, 75.36, 75.01, 76.06, 75.9, 81.59, 83.35, 83.8, 82.1, 81.91, 76.77, 78.09, 80.39, 80.45, 80.32, 79.41, 81.17, 80.6, 78.1, 80.78, 77.87, 78.44], '1Y': [68.38, 66.79, 68.23, 68.71, 67.84, 69.17, 72.5, 72.34, 73.73, 72.39, 73.22, 72.54, 72.43, 72.31, 72.05, 77.93, 80.31, 81.85, 81.8, 80.69, 79.82, 81.59, 81.16, 81, 80.39, 78.39, 74.62, 73.14, 74.09, 74.68, 74.26, 75.61, 75.01, 76.06, 75.9, 81.59, 83.35, 83.8, 82.1, 81.63, 76.95, 79.17, 80.54, 79.83, 79.08, 79.41, 81.17, 80.6, 78.1, 80.78, 77.87, 78.44] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$49B', pe: 22.6, revenueGrowth: 3, eps: 3.47, grossMargin: 46, dividendYield: 3.05,
      etfPresence: { POW: 1.99, VOLT: 1.95, PBD: false, PBW: false },
      tonyNote: 'Xcel Energy Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BLDP', name: 'Ballard Power Systems Inc', easyScore: 2, avgWeight: 1.77, proScore: 0.89, coverage: 0.5,
      price: 4.59, weeklyPrices: [6.06, 6.07, 4.92, 5.16, 4.59], weeklyChange: -24.26, sortRank: 0, periodReturns: { '1M': 11.1, '6M': 62.8, '1Y': 179.9 },
      priceHistory: { '1W': [6.06, 6.07, 4.92, 5.16, 4.59], '1M': [4.17, 4.16, 4.14, 4.13, 4.45, 4.33, 4.18, 4.76, 5.43, 5.54, 5.94, 6.09, 6.19, 6.29, 6.3, 6.38, 6.06, 6.07, 4.92, 5.16, 4.59], '6M': [2.82, 2.65, 2.67, 2.54, 2.73, 2.7, 2.64, 2.33, 2.15, 2.15, 2.11, 2.16, 1.99, 2.39, 2.41, 2.39, 2.53, 2.7, 3.17, 3.25, 3.29, 4.17, 4.33, 5.94, 6.38, 4.59], '1Y': [1.64, 1.79, 1.47, 1.61, 1.95, 1.81, 2.02, 1.86, 1.86, 1.73, 1.94, 2.06, 1.89, 1.93, 2.52, 2.99, 2.96, 3.61, 3.76, 3.28, 3.44, 3.37, 3.57, 2.89, 2.69, 2.67, 2.78, 2.53, 2.69, 2.68, 2.76, 2.79, 2.64, 2.33, 2.15, 2.15, 2.11, 2.16, 1.99, 2.53, 2.51, 2.3, 2.4, 2.94, 3.1, 3.25, 3.29, 4.17, 4.33, 5.94, 6.38, 4.59] },
      velocityScore: { '1D': -20.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1B', pe: null, revenueGrowth: 26, eps: -0.27, grossMargin: 11, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: 1.21, PBW: 2.33 },
      tonyNote: 'Ballard Power Systems is a hydrogen fuel cell technology company. It appears in Electrification ETFs as a long-duration bet on hydrogen as a zero-carbon fuel for heavy industry and transit. Revenue is small, the company is pre-profitability, and the weight is minimal — this is a thematic placeholder allocation, not a fundamental position.',
    },
    {
      ticker: 'SHLS', name: 'Shoals Technologies Group Inc', easyScore: 2, avgWeight: 1.57, proScore: 0.79, coverage: 0.5,
      price: 9.63, weeklyPrices: [12.39, 12.77, 10.81, 10.88, 9.63], weeklyChange: -22.32, sortRank: 0, periodReturns: { '1M': 8.9, '6M': 19.1, '1Y': 88.7 },
      priceHistory: { '1W': [12.39, 12.77, 10.81, 10.88, 9.63], '1M': [9.32, 8.63, 9.11, 9.28, 10.33, 9.66, 9.28, 9.68, 9.55, 9.91, 10.82, 12.12, 12.2, 12.45, 12.18, 12.46, 12.39, 12.77, 10.81, 10.88, 9.63], '6M': [8.08, 8.54, 9.11, 8.5, 8.6, 9.37, 9.22, 9.44, 10.29, 10.24, 9.9, 5.96, 5.75, 6.13, 6.1, 6.62, 6.56, 6.67, 7.08, 7.8, 8.27, 9.32, 9.66, 10.82, 12.46, 9.63], '1Y': [5.1, 5.34, 5, 5.26, 5.74, 5.81, 5.81, 5.58, 4.67, 4.62, 6.13, 6.84, 6.78, 6.88, 7.23, 7.7, 7.93, 8.84, 10.85, 9.94, 10.53, 9.24, 8.93, 7.98, 8.12, 7.61, 8.6, 8.42, 9.19, 9.09, 8.66, 9.27, 9.22, 9.44, 10.29, 10.24, 9.9, 5.96, 5.75, 6.2, 6.24, 6.25, 6.41, 7.22, 6.87, 7.8, 8.27, 9.32, 9.66, 10.82, 12.46, 9.63] },
      velocityScore: { '1D': -24, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2B', pe: 48.1, revenueGrowth: 75, eps: 0.2, grossMargin: 33, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: 1.13, PBW: 2.02 },
      tonyNote: 'Shoals Technologies Group Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 1.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SU', name: 'Schneider Electric SE', easyScore: 2, avgWeight: 1.37, proScore: 0.69, coverage: 0.5,
      price: 60.95, weeklyPrices: [65.54, 65.47, 62.22, 63.25, 60.95], weeklyChange: -7, sortRank: 0, periodReturns: { '1M': -4.8, '6M': 39.2, '1Y': 64.8 },
      priceHistory: { '1W': [65.54, 65.47, 62.22, 63.25, 60.95], '1M': [65.12, 66.56, 66.07, 66.79, 68.29, 69.73, 69.65, 67.83, 67.73, 67.34, 65.56, 63.97, 63.31, 62.36, 63.76, 65.31, 65.54, 65.47, 62.22, 63.25, 60.95], '6M': [43.79, 42.22, 43.16, 44.36, 45.77, 48.97, 50.87, 52.97, 53.8, 55.99, 56.27, 57.78, 57.4, 59.59, 63.71, 66.66, 66.08, 64.84, 61.66, 64.47, 68.56, 65.12, 69.73, 65.56, 65.31, 60.95], '1Y': [36.98, 40.67, 38.28, 37.83, 39.23, 39.15, 39.69, 40.07, 39.25, 38.84, 38.36, 40.08, 40.63, 42.26, 42.85, 42.41, 41.26, 40.84, 39.1, 39.09, 39.63, 39.51, 44.08, 45.2, 44.31, 44.68, 44.17, 42.82, 43.24, 45.59, 46.69, 49.74, 50.87, 52.97, 53.8, 55.99, 56.27, 57.78, 57.4, 60.62, 63.19, 65.98, 66.79, 63.56, 62.55, 64.47, 68.56, 65.12, 69.73, 65.56, 65.31, 60.95] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$72B', pe: 16.1, revenueGrowth: 18, eps: 3.78, grossMargin: 59, dividendYield: 2.73,
      etfPresence: { POW: 1.2, VOLT: 1.54, PBD: false, PBW: false },
      tonyNote: 'Schneider Electric SE appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ENPH', name: 'Enphase Energy Inc', easyScore: 2, avgWeight: 0.98, proScore: 0.49, coverage: 0.5,
      price: 49.75, weeklyPrices: [69.02, 68.39, 56.07, 56.88, 49.75], weeklyChange: -27.92, sortRank: 0, periodReturns: { '1M': 36.5, '6M': 57.7, '1Y': 15 },
      priceHistory: { '1W': [69.02, 68.39, 56.07, 56.88, 49.75], '1M': [37.65, 37.48, 42, 48.01, 52.89, 49.69, 46.76, 53.15, 62.34, 64.03, 66.9, 70.28, 69.5, 68.36, 63.74, 72.33, 69.02, 68.39, 56.07, 56.88, 49.75], '6M': [31.55, 31.86, 32.22, 32.05, 35.43, 35.36, 39.46, 36.98, 49.8, 43.49, 47.4, 44.71, 40.86, 44.07, 44.11, 37.84, 33.64, 31.37, 33.88, 35.24, 32.54, 37.65, 49.69, 66.9, 72.33, 49.75], '1Y': [43.26, 45.93, 38.38, 40.91, 42.85, 39.03, 36.48, 33.48, 31.91, 33.56, 36.23, 37.96, 37.08, 37.12, 38.72, 37.99, 37.01, 36.03, 37.54, 36.08, 36.7, 29.01, 30.84, 27.6, 27.71, 29.39, 32.79, 31.61, 32.85, 33.75, 35.22, 34.98, 39.46, 36.98, 49.8, 43.49, 47.4, 44.71, 40.86, 45.89, 40.76, 35.64, 32.04, 32, 33.62, 35.24, 32.54, 37.65, 49.69, 66.9, 72.33, 49.75] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$7B', pe: 49.3, revenueGrowth: -21, eps: 1.01, grossMargin: 27, dividendYield: null,
      etfPresence: { POW: 0.82, VOLT: false, PBD: 1.14, PBW: false },
      tonyNote: 'Enphase Energy Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 1.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CEG', name: 'Constellation Energy Corp', easyScore: 2, avgWeight: 0.88, proScore: 0.44, coverage: 0.5,
      price: 248.21, weeklyPrices: [267.24, 264.59, 254.83, 250.67, 248.21], weeklyChange: -7.12, sortRank: 0, periodReturns: { '1M': -18.3, '6M': -30.9, '1Y': -17.2 },
      priceHistory: { '1W': [267.24, 264.59, 254.83, 250.67, 248.21], '1M': [299.69, 293.6, 274.89, 275.26, 267.2, 262, 260.67, 281.26, 285.83, 294.07, 301.57, 288.68, 286.31, 287.75, 265.7, 272.65, 267.24, 264.59, 254.83, 250.67, 248.21], '6M': [359.15, 365.63, 361.33, 353.27, 322.54, 341.2, 289.06, 280.68, 261.42, 288.43, 293.8, 327.16, 322.99, 301.77, 281.99, 301.49, 275.16, 291.72, 287.56, 315.17, 321.05, 299.69, 262, 301.57, 272.65, 248.21], '1Y': [299.66, 308.01, 320.66, 307.92, 317.11, 308.2, 323.7, 330.52, 343.57, 338.57, 317.23, 316.58, 308.48, 320, 321.27, 339.13, 350.9, 371, 403.95, 350.06, 384.95, 362.82, 351.67, 339.35, 351.6, 361.26, 362.07, 340.97, 363.95, 366.25, 342.52, 307.71, 289.06, 280.68, 261.42, 288.43, 293.8, 327.16, 322.99, 305.58, 289.76, 298.61, 272.58, 296.61, 277.7, 315.17, 321.05, 299.69, 262, 301.57, 272.65, 248.21] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$89B', pe: 21.6, revenueGrowth: 64, eps: 11.51, grossMargin: 23, dividendYield: 0.68,
      etfPresence: { POW: 1.33, VOLT: 0.43, PBD: false, PBW: false },
      tonyNote: 'Constellation Energy Corp appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 0.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SEDG', name: 'SolarEdge Technologies Inc', easyScore: 2, avgWeight: 0.83, proScore: 0.41, coverage: 0.5,
      price: 55.85, weeklyPrices: [74.02, 73.14, 63.17, 63.95, 55.85], weeklyChange: -24.55, sortRank: 0, periodReturns: { '1M': 35.2, '6M': 84.6, '1Y': 198.3 },
      priceHistory: { '1W': [74.02, 73.14, 63.17, 63.95, 55.85], '1M': [41.79, 40.42, 42.77, 50.24, 61.76, 55.23, 54.53, 56.22, 63, 61.95, 70.75, 73.23, 73.19, 76.35, 75.8, 78.51, 74.02, 73.14, 63.17, 63.95, 55.85], '6M': [30.26, 29.48, 30.48, 28.85, 30.26, 33.84, 34.6, 30.95, 35.92, 35.53, 39.38, 40.6, 34.59, 37.44, 51.73, 51.76, 45.09, 43.21, 39.82, 47.38, 41.52, 41.79, 55.23, 70.75, 78.51, 55.85], '1Y': [18.72, 23.98, 18.93, 21.86, 27.09, 24.96, 29.07, 24.95, 26.12, 25.1, 31.99, 32.25, 33.21, 29.42, 34.11, 37.47, 38.62, 35.66, 40.53, 37.5, 37.84, 31.82, 44.7, 34.8, 34.99, 31.61, 31.56, 28.92, 30.74, 31.36, 32.89, 33.91, 34.6, 30.95, 35.92, 35.53, 39.38, 40.6, 34.59, 40.71, 46.73, 47.37, 43.85, 42.98, 40.57, 47.38, 41.52, 41.79, 55.23, 70.75, 78.51, 55.85] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$3B', pe: null, revenueGrowth: 42, eps: -6.13, grossMargin: 18, dividendYield: null,
      etfPresence: { POW: 0.44, VOLT: false, PBD: 1.22, PBW: false },
      tonyNote: 'SolarEdge Technologies Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 0.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NRG', name: 'NRG Energy Inc', easyScore: 2, avgWeight: 0.74, proScore: 0.37, coverage: 0.5,
      price: 127.16, weeklyPrices: [133.76, 133.39, 129.20, 127.71, 127.16], weeklyChange: -4.94, sortRank: 0, periodReturns: { '1M': -7.9, '6M': -23.7, '1Y': -18 },
      priceHistory: { '1W': [133.76, 133.39, 129.2, 127.71, 127.16], '1M': [137.3, 137.34, 131.08, 134.72, 127.81, 125.5, 123.71, 133.98, 136.92, 137.65, 140.43, 138, 137.5, 134.08, 129.47, 133.51, 133.76, 133.39, 129.2, 127.71, 127.16], '6M': [166.75, 160.15, 158.11, 159.24, 143.53, 158.5, 149.3, 152.63, 153.32, 172.35, 176.52, 175.58, 155.42, 152.87, 145.8, 147.74, 149.8, 170.24, 157.18, 160.15, 154.82, 137.3, 125.5, 140.43, 133.51, 127.16], '1Y': [155.05, 153.94, 153.68, 155.96, 150.27, 144.96, 160.55, 159.87, 171.96, 156.69, 148.38, 146.23, 146.91, 161.21, 164.58, 165.58, 161.91, 167.52, 171.33, 160.42, 172.76, 167.99, 162.84, 166.45, 163.81, 166.77, 168.16, 149.48, 160.56, 166.16, 149.27, 152.05, 149.3, 152.63, 153.32, 172.35, 176.52, 175.58, 155.42, 152.48, 151.77, 141.23, 153.06, 170.96, 149.86, 160.15, 154.82, 137.3, 125.5, 140.43, 133.51, 127.16] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$27B', pe: 139.7, revenueGrowth: 20, eps: 0.91, grossMargin: 16, dividendYield: 1.49,
      etfPresence: { POW: 0.52, VOLT: 0.96, PBD: false, PBW: false },
      tonyNote: 'NRG Energy Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 0.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 5.72, proScore: 2.29, coverage: 0.4,
      price: 807.3, weeklyPrices: [957.03, 993.74, 882.43, 891.86, 807.30], weeklyChange: -15.65, sortRank: 0, periodReturns: { '1M': -4.4, '6M': 149.1, '1Y': 297.9 },
      priceHistory: { '1W': [957.03, 993.74, 882.43, 891.86, 807.3], '1M': [868.18, 851.35, 854.28, 889.03, 848.84, 770.76, 728.29, 752, 733.77, 732.94, 783.53, 782.12, 842.96, 860.84, 845.39, 875.52, 957.03, 993.74, 882.43, 891.86, 807.3], '6M': [324.1, 319.13, 315.87, 306.23, 297.62, 336.31, 351.39, 357.91, 401.29, 437.77, 434.64, 432.87, 411.38, 398.12, 401.61, 420.24, 393.71, 459.02, 472.9, 505.45, 529.49, 868.18, 770.76, 783.53, 875.52, 807.3], '1Y': [202.91, 209.55, 229.38, 222.54, 233.39, 243.23, 253.14, 264.08, 296.58, 308.4, 276.02, 292.95, 273.82, 301.13, 320.94, 344.05, 337.93, 366.99, 365.39, 332.75, 379.89, 382.57, 381.22, 333.88, 332.96, 323.46, 331.61, 283.57, 314, 319.16, 308.13, 350.96, 351.39, 357.91, 401.29, 437.77, 434.64, 432.87, 411.38, 417.76, 422.55, 382.55, 382.22, 464.54, 472.84, 505.45, 529.49, 868.18, 770.76, 783.53, 875.52, 807.3] },
      velocityScore: { '1D': 0.9, '1W': -33, '1M': null, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 72.4, revenueGrowth: 92, eps: 11.15, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 6.63, PRN: 4.81, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 5.32, proScore: 2.13, coverage: 0.4,
      price: 274, weeklyPrices: [299.73, 300.06, 284.87, 293.60, 274.00], weeklyChange: -8.58, sortRank: 0, periodReturns: { '1M': -11.4, '6M': 138.2, '1Y': 332.1 },
      priceHistory: { '1W': [299.73, 300.06, 284.87, 293.6, 274], '1M': [322.05, 308.05, 300.84, 296.98, 292.65, 266.8, 261.58, 271.05, 270.75, 279.22, 291.97, 295.94, 288.9, 284.42, 288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 274], '6M': [115.02, 110.88, 112.88, 106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 181.38, 177.5, 173.36, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 269.95, 322.05, 266.8, 291.97, 299.07, 274], '1Y': [63.41, 65.05, 62.82, 70.01, 70.64, 72.53, 78.32, 77.77, 78.75, 90.06, 84.7, 91.08, 85.72, 92.33, 97.11, 97.88, 105.74, 105.13, 109.92, 110.96, 128.09, 126.71, 121.07, 107.22, 104.18, 107.83, 119.95, 105.77, 112.06, 117.51, 121.83, 139.99, 139.32, 147.86, 194.74, 195.02, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 260.52, 269.95, 322.05, 266.8, 291.97, 299.07, 274] },
      velocityScore: { '1D': 0.9, '1W': -36, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 53.3, revenueGrowth: 7, eps: 5.14, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { AIRR: 2.65, PRN: false, RSHO: 7.98, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.13, proScore: 2.05, coverage: 0.4,
      price: 889.62, weeklyPrices: [926.18, 940.48, 904.28, 915.64, 889.62], weeklyChange: -3.95, sortRank: 0, periodReturns: { '1M': -0.9, '6M': 49.7, '1Y': 148.4 },
      priceHistory: { '1W': [926.18, 940.48, 904.28, 915.64, 889.62], '1M': [926.79, 912.14, 902.3, 920.22, 888.31, 863.95, 860.15, 872.56, 865.95, 879.89, 908.55, 909.93, 887.67, 875.87, 865.36, 909.81, 926.18, 940.48, 904.28, 915.64, 889.62], '6M': [594.36, 588.93, 582.42, 572.87, 608.13, 647.18, 626.62, 657.36, 726.2, 774.2, 756.47, 752.32, 704.82, 693.99, 680.88, 695.4, 721.24, 791.73, 798.4, 828.79, 874.78, 926.79, 863.95, 908.55, 909.81, 889.62], '1Y': [358.07, 362.44, 373.02, 390.92, 402.18, 412.88, 427.59, 430.05, 434.23, 412.71, 416.09, 431.26, 415.12, 422.91, 450.66, 469.79, 480.82, 502.12, 534.05, 513.91, 524.47, 547.58, 567.93, 546.88, 566.61, 591.49, 615.35, 561.89, 583.76, 598.41, 617.62, 646.89, 626.62, 657.36, 726.2, 774.2, 756.47, 752.32, 704.82, 699.78, 701.7, 667.43, 724.44, 794.25, 800.45, 828.79, 874.78, 926.79, 863.95, 908.55, 909.81, 889.62] },
      velocityScore: { '1D': 0.5, '1W': -34.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$410B', pe: 44.4, revenueGrowth: 22, eps: 20.05, grossMargin: 29, dividendYield: 0.66,
      etfPresence: { AIRR: false, PRN: 3.42, RSHO: 6.83, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.56, proScore: 1.82, coverage: 0.4,
      price: 1773.04, weeklyPrices: [1850.04, 1914.65, 1843.94, 1852.03, 1773.04], weeklyChange: -4.16, sortRank: 0, periodReturns: { '1M': -9.2, '6M': 80.3, '1Y': 253.7 },
      priceHistory: { '1W': [1850.04, 1914.65, 1843.94, 1852.03, 1773.04], '1M': [2032.98, 2016.31, 2034.63, 2042.36, 1992.74, 1854.43, 1825.5, 1835.51, 1835.33, 1828.25, 1883.56, 1867.09, 1855.15, 1828.21, 1787.88, 1883.26, 1850.04, 1914.65, 1843.94, 1852.03, 1773.04], '6M': [983.61, 968.5, 965.37, 933.29, 971.49, 1091.04, 1121.44, 1142.1, 1230.26, 1337.95, 1413.57, 1438.24, 1372.4, 1365.34, 1356.75, 1366.77, 1434.09, 1627.81, 1680.09, 1794.04, 1891.95, 2032.98, 1854.43, 1883.56, 1883.26, 1773.04], '1Y': [501.33, 500.91, 513.32, 521.66, 535.02, 546.63, 547.91, 687.67, 691.45, 718.61, 683.93, 707.39, 700.69, 752.1, 762.91, 791.46, 834.33, 844.62, 837.11, 790.72, 980.97, 955.96, 954.53, 920.99, 957.04, 949.3, 1021.36, 883.79, 958.07, 1003.64, 1010.41, 1119.98, 1121.44, 1142.1, 1230.26, 1337.95, 1413.57, 1438.24, 1372.4, 1414.1, 1408.25, 1273.18, 1424.91, 1650.48, 1674.16, 1794.04, 1891.95, 2032.98, 1854.43, 1883.56, 1883.26, 1773.04] },
      velocityScore: { '1D': 0, '1W': -34.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$62B', pe: 51.2, revenueGrowth: 1, eps: 34.63, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: 4.29, PRN: 4.83, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, avgWeight: 4, proScore: 1.6, coverage: 0.4,
      price: 589.52, weeklyPrices: [686.37, 689.43, 694.72, 619.98, 589.52], weeklyChange: -14.11, sortRank: 0, periodReturns: { '1M': -13.3, '6M': 77.1, '1Y': 170.5 },
      priceHistory: { '1W': [686.37, 689.43, 694.72, 619.98, 589.52], '1M': [683.52, 681.01, 719.92, 740.91, 722.31, 664.76, 639.58, 630.5, 644.64, 656.35, 670.66, 673.51, 677.45, 667.02, 646.89, 663.14, 686.37, 689.43, 694.72, 619.98, 589.52], '6M': [332.87, 320.1, 333.23, 313.32, 313.98, 329.66, 363.88, 347.11, 352.09, 409.95, 441.71, 445.36, 466.38, 458.31, 473.85, 566.62, 572.31, 598.44, 611.21, 660.85, 697.15, 683.52, 664.76, 670.66, 663.14, 589.52], '1Y': [217.97, 218.59, 214.63, 203.78, 206.63, 213.25, 216.2, 238.15, 233.13, 239.05, 213.76, 230.02, 227.03, 225.82, 239.42, 260.56, 279.62, 281.67, 312.5, 267.62, 292.46, 303.2, 347.88, 344.36, 373.29, 351.09, 325.77, 296.56, 328.26, 325.96, 311.87, 383.66, 363.88, 347.11, 352.09, 409.95, 441.71, 445.36, 466.38, 466.52, 463.15, 513.98, 576.95, 603.91, 615.42, 660.85, 697.15, 683.52, 664.76, 670.66, 663.14, 589.52] },
      velocityScore: { '1D': -11.1, '1W': -38.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$8B', pe: 51.7, revenueGrowth: 50, eps: 11.41, grossMargin: 21, dividendYield: 0.32,
      etfPresence: { AIRR: 3.82, PRN: 4.18, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Argan Inc is an engineering and construction company for power generation facilities — natural gas and renewable power plants. It appears in Industrials ETFs because power plant construction is one of the fastest-growing categories in U.S. infrastructure spending, driven by data center load additions that the grid cannot currently support.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.39, proScore: 1.36, coverage: 0.4,
      price: 318.08, weeklyPrices: [313.39, 313.67, 315.29, 314.42, 318.08], weeklyChange: 1.5, sortRank: 0, periodReturns: { '1M': 3, '6M': 23.6, '1Y': 36.4 },
      priceHistory: { '1W': [313.39, 313.67, 315.29, 314.42, 318.08], '1M': [310.55, 313.7, 310.87, 315.72, 307.17, 305.22, 302.64, 306.25, 305.66, 307.1, 311.33, 312.65, 308.53, 303.81, 300.98, 308.31, 313.39, 313.67, 315.29, 314.42, 318.08], '6M': [257.3, 258.47, 263.58, 256.77, 264.62, 282.47, 280.14, 260.41, 291.74, 279.84, 278.74, 283.54, 267.57, 255.65, 253.77, 260.67, 269.55, 293.26, 293.92, 298.1, 303.99, 310.55, 305.22, 311.33, 308.31, 318.08], '1Y': [233.17, 230.06, 234.89, 242.14, 251.4, 255.52, 267.01, 272.4, 269.28, 270.68, 262.92, 266.99, 261.53, 263.45, 259.5, 259.37, 257.98, 255.19, 247.97, 253.5, 258.03, 256.47, 255.53, 242.61, 255.78, 260.88, 264.32, 256.73, 264.33, 259.63, 272.25, 281.21, 280.14, 260.41, 291.74, 279.84, 278.74, 283.54, 267.57, 256.83, 262.23, 258.01, 272.54, 292.01, 293.59, 298.1, 303.99, 310.55, 305.22, 311.33, 308.31, 318.08] },
      velocityScore: { '1D': 0, '1W': -36.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 30.1, revenueGrowth: 7, eps: 10.56, grossMargin: 30, dividendYield: 0.65,
      etfPresence: { AIRR: 1.74, PRN: false, RSHO: 5.04, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.82, proScore: 1.13, coverage: 0.4,
      price: 223.42, weeklyPrices: [234.08, 236.14, 227.80, 229.95, 223.42], weeklyChange: -4.55, sortRank: 0, periodReturns: { '1M': 10.1, '6M': 6.7, '1Y': 39.6 },
      priceHistory: { '1W': [234.08, 236.14, 227.8, 229.95, 223.42], '1M': [203.24, 198.99, 203.79, 203.5, 200.99, 200.47, 195.79, 205.55, 205.39, 207.8, 219.08, 215.34, 213.82, 216.66, 220.92, 230.08, 234.08, 236.14, 227.8, 229.95, 223.42], '6M': [209.32, 216.89, 205.46, 200.06, 207.44, 213.61, 211.03, 208.41, 222.32, 239, 237.18, 225.02, 209.8, 199.45, 186.77, 200, 196.9, 221.27, 217.61, 222.45, 201.12, 203.24, 200.47, 219.08, 230.08, 223.42], '1Y': [160, 155.05, 162.31, 168.95, 172.78, 175.13, 175.58, 180.24, 203.71, 191.17, 188, 192.05, 182.65, 188, 184.91, 182.39, 185.92, 188.45, 185.21, 187.4, 197.07, 213.49, 221.42, 204.36, 215.7, 209.57, 217.69, 207.33, 208.48, 203.26, 207.51, 217.65, 211.03, 208.41, 222.32, 239, 237.18, 225.02, 209.8, 203.42, 194.52, 190.71, 195.43, 224.82, 216.49, 222.45, 201.12, 203.24, 200.47, 219.08, 230.08, 223.42] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 42.8, revenueGrowth: 17, eps: 5.22, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.64, PRN: false, RSHO: 4, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.29, proScore: 0.91, coverage: 0.4,
      price: 182.89, weeklyPrices: [184.72, 190.76, 185.95, 187.46, 182.89], weeklyChange: -0.99, sortRank: 0, periodReturns: { '1M': -10.9, '6M': 3.2, '1Y': 37.9 },
      priceHistory: { '1W': [184.72, 190.76, 185.95, 187.46, 182.89], '1M': [210.8, 206.83, 206.83, 210.94, 204.72, 201.94, 197.33, 202.66, 202.52, 202.91, 204.38, 198.95, 199.27, 195.88, 188.39, 187.26, 184.72, 190.76, 185.95, 187.46, 182.89], '6M': [177.16, 173.2, 177.62, 172.84, 193.2, 213.25, 207.75, 205.43, 197.19, 200.4, 198.38, 216.47, 200.39, 194.13, 199.75, 202.59, 215.98, 232.83, 228.24, 222.07, 216.68, 210.8, 201.94, 204.38, 187.26, 182.89], '1Y': [132.62, 139.67, 142.31, 140.37, 137.56, 139.85, 143.37, 150.28, 182, 179.51, 165.76, 166.52, 160.95, 166.13, 168.38, 175.02, 187.18, 197.01, 203.82, 191.17, 207.62, 200.39, 195.65, 175.91, 175.26, 174.71, 179.65, 168.12, 177.18, 181.85, 201.46, 217.89, 207.75, 205.43, 197.19, 200.4, 198.38, 216.47, 200.39, 204.67, 204.85, 191.59, 214.44, 238.27, 216.66, 222.07, 216.68, 210.8, 201.94, 204.38, 187.26, 182.89] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$17B', pe: 48.8, revenueGrowth: 26, eps: 3.75, grossMargin: 23, dividendYield: 0.55,
      etfPresence: { AIRR: 2.97, PRN: false, RSHO: false, IDEF: 1.6, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 2, avgWeight: 2.27, proScore: 0.91, coverage: 0.4,
      price: 29.82, weeklyPrices: [43.13, 43.53, 32.22, 32.74, 29.82], weeklyChange: -30.86, sortRank: 0, periodReturns: { '1M': -23.6, '6M': 132.2, '1Y': 411.5 },
      priceHistory: { '1W': [43.13, 43.53, 32.22, 32.74, 29.82], '1M': [41.84, 40.68, 40.74, 43.04, 41.62, 41.61, 41.59, 42.66, 42.48, 44.35, 48.32, 50.48, 51.4, 51.14, 46.46, 48.09, 43.13, 43.53, 32.22, 32.74, 29.82], '6M': [12.84, 17.88, 20.73, 19.72, 22.44, 28.28, 26.94, 24.97, 22.26, 22.42, 23.78, 26.36, 25.82, 24.79, 33.83, 30.86, 35.02, 34.32, 37.5, 35.45, 38.54, 41.84, 41.61, 48.32, 48.09, 29.82], '1Y': [5.83, 5.34, 5.57, 6.16, 6.85, 6.45, 6.86, 6.19, 6.39, 6.65, 6.38, 6.98, 6.44, 8.97, 10.23, 11.93, 13.77, 15.6, 15.09, 12.5, 12.84, 12.7, 12.47, 11.45, 11.73, 12.01, 12.94, 16.47, 20.32, 20.41, 22.71, 28.78, 26.94, 24.97, 22.26, 22.42, 23.78, 26.36, 25.82, 24.6, 33.82, 27.89, 35.17, 33.93, 38.03, 35.45, 38.54, 41.84, 41.61, 48.32, 48.09, 29.82] },
      velocityScore: { '1D': 1.1, '1W': -59, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: null, revenueGrowth: 42, eps: -1.16, grossMargin: 56, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 3.68, RSHO: false, IDEF: 0.87, BILT: false },
      tonyNote: 'Planet Labs is a satellite earth observation company. It holds a speculative position in Industrials ETFs as a data infrastructure name — providing satellite imagery and analytics that support agricultural, energy, and government decision-making. Revenue is growing from a small base; the ETF weight is minimal and the position is thematic.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 2, proScore: 0.8, coverage: 0.4,
      price: 54.33, weeklyPrices: [58.43, 63.40, 58.52, 57.73, 54.33], weeklyChange: -7.03, sortRank: 0, periodReturns: { '1M': -6.2, '6M': -29.5, '1Y': 33.8 },
      priceHistory: { '1W': [58.43, 63.4, 58.52, 57.73, 54.33], '1M': [56.99, 57.33, 52.49, 54.85, 52.09, 54.22, 53.47, 55.82, 54.67, 56.18, 56.8, 57.3, 65.19, 64.13, 63.49, 63.27, 58.43, 63.4, 58.52, 57.73, 54.33], '6M': [77.03, 73.13, 82.3, 75.91, 104.04, 124.56, 110.39, 103.01, 94.41, 89.06, 94.31, 90.72, 92.47, 87.53, 84.62, 71.94, 74.09, 73.55, 69.83, 63.16, 61.93, 56.99, 54.22, 56.8, 63.27, 54.33], '1Y': [40.59, 41.21, 40.77, 43.07, 46.02, 54.28, 58.78, 57.09, 59.4, 69.14, 64.02, 68.05, 64.5, 65.66, 75.74, 81.18, 92.96, 105.67, 90.58, 84.3, 89.78, 90.22, 76.59, 70.36, 75.05, 72.78, 76.91, 69.77, 79.97, 79.29, 113.7, 130.72, 110.39, 103.01, 94.41, 89.06, 94.31, 90.72, 92.47, 89.53, 83.69, 65.28, 71.96, 73.66, 68.55, 63.16, 61.93, 56.99, 54.22, 56.8, 63.27, 54.33] },
      velocityScore: { '1D': -1.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 319.6, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.92, PRN: false, RSHO: false, IDEF: 1.07, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.84, proScore: 0.74, coverage: 0.4,
      price: 295.88, weeklyPrices: [287.54, 294.53, 293.04, 292.26, 295.88], weeklyChange: 2.9, sortRank: 0, periodReturns: { '1M': -6.4, '6M': -6.1, '1Y': 29.7 },
      priceHistory: { '1W': [287.54, 294.53, 293.04, 292.26, 295.88], '1M': [317.75, 333.56, 334.22, 336.95, 326.17, 329.35, 324.6, 321.92, 317.55, 320.63, 320.95, 317.56, 320.9, 308.17, 296.41, 293.66, 287.54, 294.53, 293.04, 292.26, 295.88], '6M': [314.95, 326.8, 354.52, 340.07, 378.47, 418.86, 418.58, 420.51, 397.77, 418.78, 438.01, 453.73, 429.58, 415.71, 407.98, 381.79, 407.66, 394.46, 392.19, 358.4, 363.37, 317.75, 329.35, 320.95, 293.66, 295.88], '1Y': [228.07, 229.26, 231.63, 246.31, 248.92, 253.82, 265.56, 260.84, 270.92, 268, 265.4, 271.74, 269.33, 271.93, 272.46, 277.51, 286.01, 290.83, 284.96, 283.64, 299.14, 315.9, 324.19, 309.16, 314.73, 309.23, 323.14, 321.29, 355.45, 349.75, 386.99, 425.9, 418.58, 420.51, 397.77, 418.78, 438.01, 453.73, 429.58, 416.59, 396.57, 369.08, 402.28, 398.07, 378.21, 358.4, 363.37, 317.75, 329.35, 320.95, 293.66, 295.88] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 19.2, revenueGrowth: 13, eps: 15.4, grossMargin: 12, dividendYield: 1.89,
      etfPresence: { AIRR: 2.65, PRN: false, RSHO: false, IDEF: 1.03, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.45, proScore: 0.58, coverage: 0.4,
      price: 578.49, weeklyPrices: [584.18, 589.76, 590.09, 590.97, 578.49], weeklyChange: -0.97, sortRank: 0, periodReturns: { '1M': -4.5, '6M': 32.5, '1Y': 51.7 },
      priceHistory: { '1W': [584.18, 589.76, 590.09, 590.97, 578.49], '1M': [613.59, 613.1, 618.91, 611.93, 569.06, 551.12, 565.22, 571.05, 566.96, 559.95, 584.4, 577.42, 577.83, 571.96, 566.14, 578.34, 584.18, 589.76, 590.09, 590.97, 578.49], '6M': [436.5, 451.17, 457.07, 448.43, 485, 497.06, 504.07, 499.67, 544.02, 552.44, 562.54, 584.89, 565.64, 536.37, 531.11, 532.25, 552.4, 595.74, 596.86, 591, 593.12, 613.59, 551.12, 584.4, 578.34, 578.49], '1Y': [381.22, 369.08, 388.19, 381.43, 379.82, 389.57, 389.3, 385.08, 403.78, 404.99, 397.81, 399, 383.6, 378.08, 379.79, 378.54, 384.8, 382.19, 372.71, 393.88, 408.15, 427.24, 442.47, 423.39, 442.95, 438.15, 447.58, 444.99, 458.38, 458.79, 487.16, 498.82, 504.07, 499.67, 544.02, 552.44, 562.54, 584.89, 565.64, 546.91, 537.2, 524.38, 553.31, 598.23, 591.32, 591, 593.12, 613.59, 551.12, 584.4, 578.34, 578.49] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 63.6, revenueGrowth: 18, eps: 9.1, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.77, PRN: false, RSHO: false, IDEF: 1.12, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WMB', name: 'WMB', easyScore: 2, avgWeight: 1.39, proScore: 0.55, coverage: 0.4,
      price: 71.39, weeklyPrices: [71.66, 72.43, 71.96, 71.59, 71.39], weeklyChange: -0.37, sortRank: 0, periodReturns: { '1M': -0.8, '6M': 16, '1Y': 19.7 },
      priceHistory: { '1W': [71.66, 72.43, 71.96, 71.59, 71.39], '1M': [74.18, 74.73, 75.71, 77.69, 77.72, 77.69, 79.4, 77.88, 77.52, 78.47, 76.34, 74.37, 73.13, 71.39, 70.04, 71.31, 71.66, 72.43, 71.96, 71.59, 71.39], '6M': [61.55, 58.41, 59.75, 60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 72.28, 72.98, 76.26, 73.18, 73.34, 72.41, 73.58, 72.59, 71.54, 70.91, 71.61, 75.41, 74.18, 77.69, 76.34, 71.31, 71.39], '1Y': [59.66, 59.15, 61.12, 58.72, 57.85, 58.48, 57.71, 58.89, 59, 57.76, 56.57, 57.13, 57.73, 58.76, 59.02, 62.86, 63.69, 63.5, 63.78, 62.16, 57.59, 56.51, 60.6, 59.17, 59.37, 61.55, 60.5, 58.84, 59.46, 60.85, 60.32, 61.55, 64.96, 67.26, 66.92, 72.28, 72.98, 76.26, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 71.61, 75.41, 74.18, 77.69, 76.34, 71.31, 71.39] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$87B', pe: 31.3, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.93,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.95, IDEF: false, BILT: 1.82 },
      tonyNote: 'WMB appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 1.16, proScore: 0.46, coverage: 0.4,
      price: 47.19, weeklyPrices: [51.84, 54.39, 49.44, 49.64, 47.19], weeklyChange: -8.97, sortRank: 0, periodReturns: { '1M': -22.4, '6M': -26, '1Y': 1.1 },
      priceHistory: { '1W': [51.84, 54.39, 49.44, 49.64, 47.19], '1M': [58.82, 62.48, 67.28, 66.02, 62.77, 66.21, 64.2, 65.76, 65.3, 64.1, 60.66, 63.52, 65.86, 57.5, 53.65, 54.65, 51.84, 54.39, 49.44, 49.64, 47.19], '6M': [63.75, 67.19, 79.98, 73.17, 101.28, 109.49, 108.22, 103.8, 95.36, 75.79, 81.27, 93.04, 106.09, 99.98, 99.38, 84.07, 86.1, 87.79, 82.69, 71.95, 65.32, 58.82, 66.21, 60.66, 54.65, 47.19], '1Y': [46.68, 47.51, 48.28, 44.91, 47.57, 53.74, 49.1, 51.41, 50.39, 49.03, 49.87, 54.69, 53.26, 62.22, 64.11, 66.91, 73.47, 76.6, 75.96, 77.21, 85.34, 84.7, 69.38, 58.95, 64.96, 66.08, 67.27, 64.94, 80.81, 76.85, 106.22, 108.5, 108.22, 103.8, 95.36, 75.79, 81.27, 93.04, 106.09, 104.08, 102.39, 74.82, 82, 90.18, 82.06, 71.95, 65.32, 58.82, 66.21, 60.66, 54.65, 47.19] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 205.2, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.95, PRN: false, RSHO: false, IDEF: 0.36, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.05, proScore: 0.42, coverage: 0.4,
      price: 104.14, weeklyPrices: [111.59, 117.82, 111.27, 110.94, 104.14], weeklyChange: -6.68, sortRank: 0, periodReturns: { '1M': 15.3, '6M': 44.9, '1Y': 93.3 },
      priceHistory: { '1W': [111.59, 117.82, 111.27, 110.94, 104.14], '1M': [91.95, 92.32, 92.5, 94.55, 92.03, 93.39, 92.8, 94.81, 96.36, 98.55, 99.32, 97.11, 108.11, 111.7, 111.28, 112.87, 111.59, 117.82, 111.27, 110.94, 104.14], '6M': [71.86, 71.8, 75.07, 73.01, 88.74, 102.95, 99.05, 93.88, 82.2, 82.36, 85.9, 91.01, 89.36, 78.16, 77.26, 71.4, 75.76, 82.52, 84.12, 77.06, 78.53, 91.95, 93.39, 99.32, 112.87, 104.14], '1Y': [53.87, 49.53, 49.96, 50.63, 52.4, 51.68, 52.91, 51.88, 54.24, 68.02, 64.22, 67.64, 67.47, 71.7, 73.82, 74.27, 81.18, 83.92, 78.15, 75.54, 77.6, 75.71, 72.74, 67.94, 69.05, 70.23, 75.19, 69.63, 74.7, 76.03, 93.48, 103.02, 99.05, 93.88, 82.2, 82.36, 85.9, 91.01, 89.36, 80.71, 78.29, 69.86, 77.53, 84.09, 83.36, 77.06, 78.53, 91.95, 93.39, 99.32, 112.87, 104.14] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.17, PRN: false, RSHO: false, IDEF: 0.94, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.59, proScore: 0.24, coverage: 0.4,
      price: 46.22, weeklyPrices: [45.61, 46.71, 46.15, 46.55, 46.22], weeklyChange: 1.34, sortRank: 0, periodReturns: { '1M': 11.8, '6M': 36.1, '1Y': 3.8 },
      priceHistory: { '1W': [45.61, 46.71, 46.15, 46.55, 46.22], '1M': [41.49, 42.87, 42.5, 42.86, 41.5, 42.84, 42.81, 44.56, 44.55, 44.92, 45.8, 45.35, 48.41, 48.76, 47.96, 47.39, 45.61, 46.71, 46.15, 46.55, 46.22], '6M': [33.96, 33.12, 34.62, 34.09, 38.84, 42.26, 40.99, 41.06, 38.93, 38.13, 38.14, 45.49, 47.41, 45.3, 43.82, 44.84, 46.73, 47.43, 44.24, 40.72, 40, 41.49, 42.84, 45.8, 47.39, 46.22], '1Y': [44.54, 43.66, 43.12, 45.09, 47.01, 48.01, 47.53, 48.2, 41.48, 41.87, 41.17, 41.93, 41.79, 41.14, 41.54, 42.55, 44.58, 45.43, 40.19, 39.94, 40.18, 36.15, 35.59, 34, 33.78, 33.79, 34.02, 32.55, 34.52, 34.78, 40.99, 42.57, 40.99, 41.06, 38.93, 38.13, 38.14, 45.49, 47.41, 45.3, 44.4, 43.25, 46.19, 47.54, 43.2, 40.72, 40, 41.49, 42.84, 45.8, 47.39, 46.22] },
      velocityScore: { '1D': 4.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 43.2, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.77,
      etfPresence: { AIRR: 0.87, PRN: false, RSHO: false, IDEF: 0.31, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.34, proScore: 0.13, coverage: 0.4,
      price: 70.39, weeklyPrices: [72.26, 72.38, 70.53, 72.13, 70.39], weeklyChange: -2.58, sortRank: 0, periodReturns: { '1M': -15, '6M': 2.6, '1Y': 73.6 },
      priceHistory: { '1W': [72.26, 72.38, 70.53, 72.13, 70.39], '1M': [82.79, 82.69, 80.64, 83.01, 79.49, 75.43, 74.91, 76.99, 74.88, 72.76, 74.67, 74.47, 73.27, 71.49, 74.26, 74.29, 72.26, 72.38, 70.53, 72.13, 70.39], '6M': [68.59, 69.46, 68.65, 67.02, 70.17, 75.17, 76.01, 78.89, 83.48, 82.74, 84.99, 73.57, 72.04, 67.76, 69.34, 76.15, 77.66, 83.8, 84.38, 87.5, 92.76, 82.79, 75.43, 74.67, 74.29, 70.39], '1Y': [40.56, 42.7, 44.53, 46.36, 47.45, 50.77, 49.17, 46.91, 47.66, 58.77, 56.02, 58.99, 59.03, 62.46, 63.62, 64.78, 63.75, 63.58, 63.3, 64.22, 68.4, 65.72, 62.63, 60.48, 65.16, 67.63, 67.56, 66.02, 68.93, 69.35, 70.53, 75.09, 76.01, 78.89, 83.48, 82.74, 84.99, 73.57, 72.04, 71.31, 72.44, 72.83, 77.31, 86.16, 85.11, 87.5, 92.76, 82.79, 75.43, 74.67, 74.29, 70.39] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 48.2, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.33,
      etfPresence: { AIRR: 0.64, PRN: false, RSHO: false, IDEF: 0.03, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'Timken Company', easyScore: 1, avgWeight: 8.96, proScore: 1.79, coverage: 0.2,
      price: 133.64, weeklyPrices: [131.82, 133.66, 131.83, 134.67, 133.64], weeklyChange: 1.38, sortRank: 0, periodReturns: { '1M': 13.3, '6M': 60.7, '1Y': 84 },
      priceHistory: { '1W': [131.82, 133.66, 131.83, 134.67, 133.64], '1M': [117.39, 117.12, 115.74, 116.74, 114.49, 112.73, 109.36, 117.2, 118.93, 119.95, 127.42, 127.16, 126.78, 127.98, 126.54, 131.9, 131.82, 133.66, 131.83, 134.67, 133.64], '6M': [83.16, 85.77, 86.09, 84.13, 90.6, 93.73, 93.94, 93.19, 106.04, 107.84, 107.83, 109.99, 100.58, 97.54, 95.25, 97.56, 98.94, 106.9, 108.45, 108.7, 107.12, 117.39, 112.73, 127.42, 131.9, 133.64], '1Y': [72.63, 71.63, 73.62, 75.44, 77.68, 76.68, 80.99, 80.98, 74.65, 76.91, 76.88, 78.96, 75.12, 76.4, 77.11, 75.67, 75.11, 75.86, 74.7, 75.85, 77.22, 76.29, 78.2, 74.33, 81.22, 82.52, 87.53, 84.14, 86.02, 86.29, 91.17, 93.55, 93.94, 93.19, 106.04, 107.84, 107.83, 109.99, 100.58, 98.74, 98.99, 95.94, 99.17, 106.81, 108.75, 108.7, 107.12, 117.39, 112.73, 127.42, 131.9, 133.64] },
      velocityScore: { '1D': 0, '1W': -54.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 30.4, revenueGrowth: 8, eps: 4.4, grossMargin: 31, dividendYield: 1.07,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.96, IDEF: false, BILT: false },
      tonyNote: 'Timken Company appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 9.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 7.68, proScore: 1.54, coverage: 0.2,
      price: 181.08, weeklyPrices: [172.55, 179.41, 180.99, 178.66, 181.08], weeklyChange: 4.94, sortRank: 0, periodReturns: { '1M': 2.8, '6M': 5.3, '1Y': 28.4 },
      priceHistory: { '1W': [172.55, 179.41, 180.99, 178.66, 181.08], '1M': [178.61, 178.89, 178.11, 175.68, 171.18, 175.95, 174.49, 174.85, 175.98, 177.01, 178.97, 176.59, 178.96, 179.66, 174.41, 174.26, 172.55, 179.41, 180.99, 178.66, 181.08], '6M': [171.93, 179.93, 185.76, 183.4, 187.17, 199.83, 195.93, 200.93, 198.66, 200.06, 201.92, 212.16, 208.23, 204.52, 198.16, 189.71, 198.41, 201.41, 195.79, 173.38, 172.9, 178.61, 175.95, 178.97, 174.26, 181.08], '1Y': [140.98, 146.46, 141.85, 144.19, 146.18, 150.17, 156.49, 157.12, 156.33, 155.49, 153.66, 159.57, 158.11, 155, 158.31, 161.38, 167.2, 168.57, 157, 177.98, 178.67, 175.61, 179.22, 174.72, 172.15, 168.45, 174.72, 177.2, 186.38, 187.25, 188.5, 201.92, 195.93, 200.93, 198.66, 200.06, 201.92, 212.16, 208.23, 206.06, 194.82, 187.15, 197.92, 202.81, 187.17, 173.38, 172.9, 178.61, 175.95, 178.97, 174.26, 181.08] },
      velocityScore: { '1D': -0.6, '1W': -50.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$244B', pe: 34, revenueGrowth: 9, eps: 5.32, grossMargin: 20, dividendYield: 1.55,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 7.68, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 7.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CGNX', name: 'Cognex Corporation', easyScore: 1, avgWeight: 7.27, proScore: 1.45, coverage: 0.2,
      price: 59.96, weeklyPrices: [66.06, 64.67, 60.82, 62.39, 59.96], weeklyChange: -9.23, sortRank: 0, periodReturns: { '1M': -8.7, '6M': 56.9, '1Y': 92.5 },
      priceHistory: { '1W': [66.06, 64.67, 60.82, 62.39, 59.96], '1M': [67.26, 65.68, 63.64, 66.09, 64.26, 61.91, 60.65, 63.37, 64.27, 66.09, 68.33, 66.7, 66.01, 65.85, 64.64, 66.08, 66.06, 64.67, 60.82, 62.39, 59.96], '6M': [38.22, 36.83, 36.66, 35.98, 37.74, 40.59, 39.76, 38.74, 42.37, 58.79, 56.47, 53.83, 50.82, 47.98, 49.24, 47.59, 49.52, 54.39, 55.48, 55.09, 56.3, 67.26, 61.91, 68.33, 66.08, 59.96], '1Y': [31.14, 30.54, 30.71, 32.05, 33.32, 33.32, 34.61, 34.26, 41.86, 42.2, 43.4, 43.89, 43.97, 44.4, 44.08, 45.52, 45.83, 46.75, 45.79, 46.29, 47.29, 40, 38.4, 35.91, 37.76, 37.69, 37.91, 35.76, 36.6, 36.93, 39.01, 40.92, 39.76, 38.74, 42.37, 58.79, 56.47, 53.83, 50.82, 49.56, 50.8, 45.94, 51.69, 55.58, 53.72, 55.09, 56.3, 67.26, 61.91, 68.33, 66.08, 59.96] },
      velocityScore: { '1D': null, '1W': -57.6, '1M': null, '6M': null }, isNew: true,
      marketCap: '$10B', pe: 70.5, revenueGrowth: 24, eps: 0.85, grossMargin: 68, dividendYield: 0.54,
      etfPresence: { AIRR: false, PRN: false, RSHO: 7.27, IDEF: false, BILT: false },
      tonyNote: 'Cognex Corporation appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 7.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.66, proScore: 4.66, coverage: 1,
      price: 204.66, weeklyPrices: [251.68, 259.67, 227.81, 218.00, 204.66], weeklyChange: -18.68, sortRank: 0, periodReturns: { '1M': 15.6, '6M': 112.3, '1Y': 289.2 },
      priceHistory: { '1W': [251.68, 259.67, 227.81, 218, 204.66], '1M': [186.1, 179.11, 207.27, 221.15, 219.94, 199.86, 197.73, 191.82, 219.93, 214.77, 208.06, 208.37, 226.34, 231.09, 264.51, 260.58, 251.68, 259.67, 227.81, 218, 204.66], '6M': [96.41, 80.95, 90.03, 83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 98.01, 100.61, 91.01, 94.94, 112.95, 117.62, 100.82, 112.54, 154.56, 159.16, 144.96, 176.42, 186.1, 199.86, 208.06, 260.58, 204.66], '1Y': [52.58, 50.46, 51.02, 50.31, 46.05, 53.31, 51.88, 50.4, 55.17, 75.33, 67.19, 70.48, 65.65, 93.39, 94.08, 113.23, 115.61, 122, 125.83, 98.62, 121.83, 110.54, 102.22, 90.54, 88.88, 98.92, 93.59, 75.45, 91.13, 89.95, 97.93, 108.73, 94.5, 85.19, 86.1, 98.01, 100.61, 91.01, 94.94, 129.85, 114.15, 92.26, 117.4, 161.94, 156.55, 144.96, 176.42, 186.1, 199.86, 208.06, 260.58, 204.66] },
      velocityScore: { '1D': 0, '1W': 9.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$52B', pe: 79, revenueGrowth: 684, eps: 2.59, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 3.33, MEME: 5.53, RKNG: 5.12 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 3, avgWeight: 4.07, proScore: 4.07, coverage: 1,
      price: 86.87, weeklyPrices: [107.73, 107.29, 93.60, 92.06, 86.87], weeklyChange: -19.36, sortRank: 0, periodReturns: { '1M': 15.8, '6M': 19.3, '1Y': 149.5 },
      priceHistory: { '1W': [107.73, 107.29, 93.6, 92.06, 86.87], '1M': [82.55, 72.96, 74.81, 83.01, 83.67, 86.83, 88.1, 89.58, 96.23, 105.86, 119.7, 129.6, 133.09, 113.41, 105.65, 118.17, 107.73, 107.29, 93.6, 92.06, 86.87], '6M': [72.84, 68.37, 85.67, 72.63, 90.56, 101.25, 113.57, 111.21, 101.79, 82.51, 83.9, 86.92, 89.76, 86.34, 89.93, 78.67, 94.81, 98.97, 81, 77.2, 68.43, 82.55, 86.83, 119.7, 118.17, 86.87], '1Y': [34.82, 41.91, 53.22, 45.11, 42.5, 52.63, 58.92, 53.09, 52.57, 49.76, 44.95, 50.43, 45.22, 37.58, 41.19, 54.5, 56.94, 81.2, 95.69, 71.35, 77.77, 70.05, 67.89, 58.22, 55.51, 61.44, 79.05, 61.86, 78.05, 83.47, 97.67, 115.77, 113.57, 111.21, 101.79, 82.51, 83.9, 86.92, 89.76, 89.11, 88.42, 73.82, 92.57, 88.57, 80.01, 77.2, 68.43, 82.55, 86.83, 119.7, 118.17, 86.87] },
      velocityScore: { '1D': 0, '1W': -11.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$34B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 3.67, MEME: 5.77, RKNG: 2.77 },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 3, avgWeight: 3.66, proScore: 3.66, coverage: 1,
      price: 39.47, weeklyPrices: [44.71, 44.15, 39.62, 40.94, 39.47], weeklyChange: -11.72, sortRank: 0, periodReturns: { '1M': -4.3, '6M': 20.4, '1Y': 203.1 },
      priceHistory: { '1W': [44.71, 44.15, 39.62, 40.94, 39.47], '1M': [44.59, 43.93, 45.48, 46.71, 42.56, 39.14, 36.62, 39.52, 48.02, 45.87, 45.14, 48.98, 49.65, 47.28, 47.94, 47.86, 44.71, 44.15, 39.62, 40.94, 39.47], '6M': [32.77, 24.24, 26.08, 24.52, 31.94, 35.22, 37.69, 33.88, 34.95, 35.28, 30, 27.93, 27.03, 27.05, 25.93, 23.76, 25.19, 27.6, 32.19, 33.67, 35.63, 44.59, 39.14, 45.14, 47.86, 39.47], '1Y': [13.02, 11.55, 10.32, 9.76, 9.51, 10.06, 10.93, 10.12, 14.89, 14.97, 15.34, 16.47, 14.38, 16.98, 19.83, 23.45, 25, 27.94, 37.76, 30.62, 34.33, 31.06, 28.57, 22.84, 23.74, 29.36, 30.99, 22, 25.72, 28.11, 37.68, 37.4, 37.69, 33.88, 34.95, 35.28, 30, 27.93, 27.03, 27.71, 27.26, 20.55, 25.18, 31.47, 31.32, 33.67, 35.63, 44.59, 39.14, 45.14, 47.86, 39.47] },
      velocityScore: { '1D': 0, '1W': -7.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.3, MEME: 5.06, RKNG: 3.62 },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab', easyScore: 3, avgWeight: 3.58, proScore: 3.58, coverage: 1,
      price: 103.33, weeklyPrices: [114.70, 119.95, 110.08, 113.65, 103.33], weeklyChange: -9.91, sortRank: 0, periodReturns: { '1M': -2, '6M': 93.4, '1Y': 248.6 },
      priceHistory: { '1W': [114.7, 119.95, 110.08, 113.65, 103.33], '1M': [117.35, 117.56, 124.15, 132.55, 124.77, 131.16, 127.31, 134.28, 125.45, 135.76, 143.2, 150.23, 148.03, 143.48, 122.39, 123.32, 114.7, 119.95, 110.08, 113.65, 103.33], '6M': [53.43, 55.49, 77.18, 69.76, 83.08, 90.76, 88.9, 80.07, 72.32, 67.44, 70.21, 70.97, 71.48, 68.41, 67.23, 60.93, 67.67, 70.62, 89.46, 82.29, 80.31, 117.35, 131.16, 143.2, 123.32, 103.33], '1Y': [29.64, 26.55, 33.46, 34.33, 39.14, 47.69, 49.15, 43.79, 44.75, 43.43, 40.92, 48.13, 43.53, 46.17, 48.08, 48.69, 47.97, 65.31, 69.27, 60.56, 63.75, 56.57, 51.24, 42.78, 42.6, 44.72, 57.52, 53.96, 77.18, 75.99, 84.85, 96.3, 88.9, 80.07, 72.32, 67.44, 70.21, 70.97, 71.48, 71.31, 68, 57.38, 66.32, 72.22, 86.64, 82.29, 80.31, 117.35, 131.16, 143.2, 123.32, 103.33] },
      velocityScore: { '1D': 0, '1W': -13.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$65B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 1.97, MEME: 4.88, RKNG: 3.9 },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'NVTS', name: 'Navitas Semiconductor', easyScore: 2, avgWeight: 5.72, proScore: 3.82, coverage: 0.667,
      price: 21.14, weeklyPrices: [30.84, 30.67, 25.08, 24.48, 21.14], weeklyChange: -31.44, sortRank: 0, periodReturns: { '1M': 16.2, '6M': 130.6, '1Y': 189.6 },
      priceHistory: { '1W': [30.84, 30.67, 25.08, 24.48, 21.14], '1M': [22.65, 19.25, 21.17, 22.32, 21.32, 19.67, 19.43, 22.99, 24.38, 29.25, 31.79, 28.88, 28.51, 26.6, 24.86, 25.86, 30.84, 30.67, 25.08, 24.48, 21.14], '6M': [9.17, 7.83, 7.66, 7.14, 10.06, 10, 10.17, 8.58, 8.86, 8.3, 8.12, 9.55, 8.38, 10.1, 8.75, 8.28, 8.84, 9.82, 13.2, 18.3, 15.92, 22.65, 19.67, 31.79, 25.86, 21.14], '1Y': [7.3, 7.19, 7.35, 6.27, 6.43, 6.15, 8.82, 7.52, 6.77, 6.96, 6.43, 6.09, 5.73, 5.64, 6.46, 6.86, 7.3, 7.74, 15.16, 13.6, 12.83, 10.46, 9.12, 7.78, 8.03, 8.69, 9.12, 7.38, 7.66, 8.38, 10.07, 10.91, 10.17, 8.58, 8.86, 8.3, 8.12, 9.55, 8.38, 10.49, 9.18, 7.83, 8.57, 9.87, 15.33, 18.3, 15.92, 22.65, 19.67, 31.79, 25.86, 21.14] },
      velocityScore: { '1D': 0, '1W': -6.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.72, RKNG: 6.73 },
      tonyNote: 'Navitas Semiconductor is a small-cap wide-bandgap power semiconductor name — gallium nitride and silicon carbide for fast charging and EV applications. The $26.60 share price and small market cap position it as a speculative holding in ETFs willing to take higher-risk bets on next-generation power conversion.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 5.58, proScore: 3.72, coverage: 0.667,
      price: 1595.48, weeklyPrices: [1831.50, 1759.68, 1559.32, 1642.00, 1595.48], weeklyChange: -12.89, sortRank: 0, periodReturns: { '1M': 2.1, '6M': 627, '1Y': 3715.1 },
      priceHistory: { '1W': [1831.5, 1759.68, 1559.32, 1642, 1595.48], '1M': [1547.56, 1452.02, 1447.23, 1382.72, 1407.61, 1333.01, 1383.29, 1392.56, 1542.24, 1478.69, 1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1595.48], '6M': [219.46, 209.31, 244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 588.73, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1589.55, 1716.36, 1595.48], '1Y': [41.82, 44.21, 47.34, 44.96, 46.2, 41.36, 43, 42.93, 41.93, 46.83, 44.58, 47.35, 53.01, 73.92, 93.97, 99.83, 121.12, 131.88, 144.3, 146.95, 175.53, 194.57, 271.58, 244.93, 220.5, 194.38, 232.86, 206.83, 250.08, 275.24, 377.41, 413.62, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1070.2, 1255.86, 1547.56, 1333.01, 1589.55, 1716.36, 1595.48] },
      velocityScore: { '1D': 0, '1W': -17.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$236B', pe: 54.6, revenueGrowth: 251, eps: 29.23, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.21, RKNG: 5.94 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 2, avgWeight: 5.52, proScore: 3.68, coverage: 0.667,
      price: 164.57, weeklyPrices: [184.07, 202.89, 177.00, 196.64, 164.57], weeklyChange: -10.59, sortRank: 0, periodReturns: { '1M': 10.5, '6M': 441.7, '1Y': 875.5 },
      priceHistory: { '1W': [184.07, 202.89, 177, 196.64, 164.57], '1M': [184.9, 188.28, 223.1, 203.57, 190.36, 173.26, 171.33, 165.26, 176.81, 181.49, 177.62, 179.83, 169.02, 158.41, 185.67, 202.37, 184.07, 202.89, 177, 196.64, 164.57], '6M': [30.38, 28.96, 40.64, 34.86, 33.01, 37, 35.72, 43.61, 44.3, 44.46, 53.96, 102.51, 110.62, 96.81, 87.54, 98.21, 107.45, 153.19, 163.47, 145.78, 172.98, 184.9, 173.26, 177.62, 202.37, 164.57], '1Y': [16.87, 17.09, 23.29, 25.35, 27.92, 28.99, 26.31, 24.11, 21.42, 22.79, 22.77, 25.07, 23.02, 27.72, 29.47, 26.69, 28.42, 32.22, 32.95, 29.98, 36.87, 29.5, 23.75, 20.89, 22.73, 25.65, 34.98, 27.14, 41, 39.6, 34.04, 37.04, 35.72, 43.61, 44.3, 44.46, 53.96, 102.51, 110.62, 94.07, 95.76, 85.19, 117.64, 146.39, 150.57, 145.78, 172.98, 184.9, 173.26, 177.62, 202.37, 164.57] },
      velocityScore: { '1D': 0, '1W': -15.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.4, RKNG: 4.63 },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 5.03, proScore: 3.35, coverage: 0.667,
      price: 248.71, weeklyPrices: [287.32, 291.37, 263.61, 253.57, 248.71], weeklyChange: -13.44, sortRank: 0, periodReturns: { '1M': -4.7, '6M': 127.3, '1Y': 1060.6 },
      priceHistory: { '1W': [287.32, 291.37, 263.61, 253.57, 248.71], '1M': [283.92, 280.69, 289.76, 303.41, 275.95, 258.71, 261.34, 282.31, 307.88, 302.49, 302.4, 293.8, 290.01, 285, 273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 248.71], '6M': [109.44, 87.61, 91.43, 86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 166, 151.32, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 283.92, 258.71, 302.4, 302.85, 248.71], '1Y': [21.43, 22.91, 22.95, 22.13, 28.71, 24.69, 26.89, 34.75, 37.61, 41.25, 43.1, 49.94, 52.45, 62.96, 79.67, 69.18, 90.19, 87.58, 116.58, 94.37, 113.28, 129.05, 127.07, 104.97, 94.29, 102.5, 101.29, 76.97, 91.88, 98.69, 134.07, 149.5, 144.89, 151.37, 143.03, 139.74, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 234.68, 288.64, 283.92, 258.71, 302.4, 302.85, 248.71] },
      velocityScore: { '1D': 0, '1W': -17.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$71B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.89, RKNG: 4.17 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 4.44, proScore: 2.96, coverage: 0.667,
      price: 875.96, weeklyPrices: [1079.57, 996.00, 864.01, 949.28, 875.96], weeklyChange: -18.86, sortRank: 0, periodReturns: { '1M': 17.3, '6M': 247, '1Y': 689.5 },
      priceHistory: { '1W': [1079.57, 996, 864.01, 949.28, 875.96], '1M': [795.33, 766.58, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 875.96], '6M': [252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1, 875.96], '1Y': [110.95, 119.84, 127.91, 120.89, 122.24, 116.43, 109.83, 111.96, 109.06, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 198.47, 221.91, 218.03, 241.11, 228.5, 224.53, 234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1, 875.96] },
      velocityScore: { '1D': 0, '1W': -11.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$988B', pe: 41.4, revenueGrowth: 196, eps: 21.17, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { BUZZ: 3.64, MEME: false, RKNG: 5.24 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 2, avgWeight: 4.25, proScore: 2.84, coverage: 0.667,
      price: 52.47, weeklyPrices: [65.48, 61.86, 54.35, 59.19, 52.47], weeklyChange: -19.87, sortRank: 0, periodReturns: { '1M': -14.3, '6M': 12, '1Y': 407.4 },
      priceHistory: { '1W': [65.48, 61.86, 54.35, 59.19, 52.47], '1M': [55.15, 56.56, 55.17, 58.4, 52.94, 50.46, 47.74, 52.71, 58.06, 56.83, 59.78, 67.84, 64.05, 63.54, 65.33, 66.6, 65.48, 61.86, 54.35, 59.19, 52.47], '6M': [46.84, 36.59, 42.07, 37.77, 45.68, 51.89, 56.68, 53.74, 41.83, 42.22, 42.36, 41.39, 38.84, 41.58, 41.29, 35.09, 35.13, 43.07, 48.72, 48.36, 49.48, 55.15, 50.46, 59.78, 66.6, 52.47], '1Y': [10.34, 10.4, 11.54, 15.23, 16.96, 17.31, 18.99, 15.79, 16.45, 17.83, 18.73, 22.99, 28.21, 33.63, 37.9, 47.14, 47.08, 60.09, 67.98, 51.83, 62.42, 66.63, 57.38, 48.85, 47.47, 43.96, 43.92, 33.78, 41.98, 42.7, 46.03, 57.82, 56.68, 53.74, 41.83, 42.22, 42.36, 41.39, 38.84, 44.94, 42.16, 31.62, 35.74, 47.37, 45.17, 48.36, 49.48, 55.15, 50.46, 59.78, 66.6, 52.47] },
      velocityScore: { '1D': 0, '1W': -30, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 68.1, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 3, MEME: 5.51, RKNG: false },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'ONDS', name: 'Ondas Holdings', easyScore: 2, avgWeight: 3.85, proScore: 2.57, coverage: 0.667,
      price: 9.22, weeklyPrices: [11.61, 11.97, 10.43, 10.30, 9.22], weeklyChange: -20.59, sortRank: 0, periodReturns: { '1M': 1.8, '6M': -0.1, '1Y': 448.8 },
      priceHistory: { '1W': [11.61, 11.97, 10.43, 10.3, 9.22], '1M': [9.42, 9.04, 8.86, 11.21, 10.62, 9.7, 9.13, 9.36, 9.18, 9.06, 9.77, 10.8, 13.25, 13.22, 13.46, 13.58, 11.61, 11.97, 10.43, 10.3, 9.22], '6M': [9.23, 8.09, 8.96, 9.76, 14.01, 12.82, 12.17, 10.36, 9.69, 9.31, 10.19, 10.67, 9.72, 10.16, 10.06, 8.8, 9.52, 9.47, 10.73, 10.95, 9.73, 9.42, 9.7, 9.77, 13.58, 9.22], '1Y': [1.68, 1.69, 1.59, 1.96, 1.84, 2.4, 2.18, 1.82, 3.07, 4.29, 3.59, 4.97, 5.03, 5.56, 6.1, 7.35, 7.31, 11.26, 9.51, 6.74, 6.79, 5.96, 5.8, 7.84, 8.44, 8.92, 8.32, 7.37, 9.13, 11.02, 13.69, 12.16, 12.17, 10.36, 9.69, 9.31, 10.19, 10.67, 9.72, 10.53, 10.9, 8.15, 9.53, 9.4, 10.87, 10.95, 9.73, 9.42, 9.7, 9.77, 13.58, 9.22] },
      velocityScore: { '1D': 0, '1W': -26.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: 102.4, revenueGrowth: 1080, eps: 0.09, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.09, RKNG: 2.61 },
      tonyNote: 'Ondas Holdings is a small-cap industrial automation and drone company. It appears in Meme ETFs on the autonomous systems and drone delivery narrative. Revenue is minimal and the path to profitability is unclear; the ETF allocation is speculative and reflects retail interest in autonomous systems themes.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 2, avgWeight: 3.77, proScore: 2.51, coverage: 0.667,
      price: 216.64, weeklyPrices: [214.60, 217.50, 206.89, 222.27, 216.64], weeklyChange: 0.95, sortRank: 0, periodReturns: { '1M': 14.9, '6M': 27.2, '1Y': 204.7 },
      priceHistory: { '1W': [214.6, 217.5, 206.89, 222.27, 216.64], '1M': [210.22, 198.57, 189.36, 184.54, 172.17, 156.27, 168.99, 182.98, 193.39, 218.41, 221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 216.64], '6M': [170.29, 140.34, 147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 115.98, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 156.27, 221.64, 229, 216.64], '1Y': [71.09, 79.17, 91.92, 87.59, 97.59, 101.19, 98.41, 109.38, 110.29, 125.38, 106.3, 120.1, 124.77, 163.96, 164.44, 149.38, 144.91, 148.87, 131.41, 137.2, 162.18, 164.23, 158.5, 139.56, 154.18, 189.19, 157.98, 134.13, 150.19, 143.22, 150.42, 150.97, 133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 180.5, 180.06, 210.22, 156.27, 221.64, 229, 216.64] },
      velocityScore: { '1D': 0, '1W': 3.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$40B', pe: 119, revenueGrowth: 157, eps: 1.82, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.42, RKNG: 4.11 },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'OKLO', name: 'Oklo Inc', easyScore: 2, avgWeight: 3.67, proScore: 2.45, coverage: 0.667,
      price: 54.15, weeklyPrices: [65.21, 65.39, 58.09, 58.94, 54.15], weeklyChange: -16.97, sortRank: 0, periodReturns: { '1M': -25.3, '6M': -47.9, '1Y': -0.2 },
      priceHistory: { '1W': [65.21, 65.39, 58.09, 58.94, 54.15], '1M': [78.13, 73.63, 69.66, 67.21, 62.25, 58.56, 55.88, 62.58, 65.09, 65.88, 68.7, 67.82, 68.09, 66.88, 66.89, 73.47, 65.21, 65.39, 58.09, 58.94, 54.15], '6M': [103.93, 83.51, 81.88, 71.76, 97.6, 91.45, 87.63, 79.62, 71.1, 65.69, 63.09, 64.68, 61.78, 58.37, 53.97, 50.23, 48.76, 53.94, 68.13, 75.93, 68.6, 78.13, 58.56, 68.7, 73.47, 54.15], '1Y': [54.26, 65.45, 60.71, 51.74, 53.93, 64.37, 66.97, 71.01, 84.09, 78.47, 65.41, 74.31, 72.23, 73.75, 95.29, 131.17, 115.93, 134.77, 171.56, 120.12, 132.28, 112.23, 104.22, 96.63, 85.77, 96.59, 100.6, 75.94, 81.31, 77.8, 105.31, 94.95, 87.63, 79.62, 71.1, 65.69, 63.09, 64.68, 61.78, 59.69, 56.26, 45.58, 46.59, 58.58, 62.61, 75.93, 68.6, 78.13, 58.56, 68.7, 73.47, 54.15] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: 0, eps: -0.84, grossMargin: 0, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.86, RKNG: 2.48 },
      tonyNote: 'Oklo Inc appears in 2 of 3 Meme ETFs (67% coverage) with average weight 3.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RGTI', name: 'Rigetti Computing', easyScore: 2, avgWeight: 3.65, proScore: 2.43, coverage: 0.667,
      price: 18.91, weeklyPrices: [24.09, 24.16, 20.68, 21.76, 18.91], weeklyChange: -21.5, sortRank: 0, periodReturns: { '1M': -0.1, '6M': -33, '1Y': 67.1 },
      priceHistory: { '1W': [24.09, 24.16, 20.68, 21.76, 18.91], '1M': [20.51, 19.07, 18.42, 19.27, 17.85, 16.62, 15.96, 16.88, 22.04, 26.42, 25.07, 24.62, 27.03, 25.54, 25.63, 26.88, 24.09, 24.16, 20.68, 21.76, 18.91], '6M': [28.22, 23.96, 25.11, 22.15, 25.25, 24.7, 23.45, 18.17, 17.71, 16.09, 16.02, 17.69, 17.6, 16.17, 14.88, 13.32, 14.2, 15.13, 19.64, 16.91, 17.7, 20.51, 16.62, 25.07, 26.88, 18.91], '1Y': [11.32, 12.16, 11.5, 11.33, 13.51, 16.56, 16.14, 14.47, 16.47, 16.2, 15.16, 15.3, 15.04, 16.19, 21.99, 31.64, 29.85, 43.23, 56.34, 36.06, 37.07, 35.18, 31.4, 25.71, 26.08, 26.04, 26.12, 22.47, 24.51, 23.6, 24.72, 25.62, 23.45, 18.17, 17.71, 16.09, 16.02, 17.69, 17.6, 16.14, 15.88, 12.9, 13.84, 16.87, 18.25, 16.91, 17.7, 20.51, 16.62, 25.07, 26.88, 18.91] },
      velocityScore: { '1D': 0, '1W': -15.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: 199, eps: -0.89, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.98, RKNG: 3.31 },
      tonyNote: 'Rigetti Computing is a quantum hardware company using superconducting qubit technology. It holds a position in Meme ETFs alongside IonQ and D-Wave as part of the quantum computing basket. Revenue is minimal, the technology is earlier-stage than IonQ, and the ETF allocation is speculative. The weight score is low; this is a high-risk, long-duration positioning.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 2, avgWeight: 3.48, proScore: 2.32, coverage: 0.667,
      price: 54.59, weeklyPrices: [68.23, 65.66, 56.78, 62.80, 54.59], weeklyChange: -19.99, sortRank: 0, periodReturns: { '1M': 10.9, '6M': 0.3, '1Y': 36.3 },
      priceHistory: { '1W': [68.23, 65.66, 56.78, 62.8, 54.59], '1M': [56.89, 55.87, 55.26, 57.47, 51.95, 49.31, 48.44, 52.47, 58.89, 63.64, 63.62, 65.4, 70.14, 72.07, 69.28, 71.4, 68.23, 65.66, 56.78, 62.8, 54.59], '6M': [54.44, 49.67, 51.39, 44.87, 50.45, 47.56, 47.25, 39.98, 34.99, 34.11, 30.78, 38.34, 35.87, 32.98, 31.2, 27.51, 29.24, 29.76, 48.32, 43.84, 45.75, 56.89, 49.31, 63.62, 71.4, 54.59], '1Y': [40.06, 38.43, 40.86, 40.1, 45.56, 43.54, 43.28, 40.53, 42.02, 43, 36.8, 40.75, 40.97, 43.86, 65.44, 73.86, 63.09, 74.3, 72.41, 55.45, 57.15, 53.38, 54.42, 49.12, 47.06, 48.65, 51.67, 45.85, 49.82, 46.77, 49.45, 50.8, 47.25, 39.98, 34.99, 34.11, 30.78, 38.34, 35.87, 33.29, 33.11, 26.59, 28.49, 35.76, 46.28, 43.84, 45.75, 56.89, 49.31, 63.62, 71.4, 54.59] },
      velocityScore: { '1D': 0, '1W': -26.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 140, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: 1.98, MEME: 4.98, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'SPCE', name: 'Virgin Galactic Holdings', easyScore: 1, avgWeight: 7.41, proScore: 2.47, coverage: 0.333,
      price: 4.29, weeklyPrices: [4.29, 4.72, 4.38, 4.12, 4.29], weeklyChange: 0.12, sortRank: 0, periodReturns: { '1M': 46.1, '6M': 12.7, '1Y': 22.7 },
      priceHistory: { '1W': [4.29, 4.72, 4.38, 4.12, 4.29], '1M': [2.92, 2.79, 2.88, 2.88, 2.81, 2.58, 2.5, 2.47, 2.75, 3.24, 3.51, 3.79, 4.53, 6.18, 7.52, 4.59, 4.29, 4.72, 4.38, 4.12, 4.29], '6M': [3.81, 3.1, 3.52, 3.21, 3.15, 3.03, 3.07, 2.85, 2.53, 2.56, 2.43, 2.6, 2.54, 2.45, 2.43, 2.26, 3.07, 2.99, 2.92, 2.54, 2.52, 2.92, 2.58, 3.51, 4.59, 4.29], '1Y': [3.5, 3.06, 2.94, 2.82, 2.91, 3.25, 4.44, 3.74, 3.99, 2.99, 2.97, 3.14, 3.08, 3.13, 3.25, 3.74, 3.84, 4.12, 4.6, 3.72, 4.05, 3.5, 3.64, 3.55, 3.51, 4.35, 3.58, 3.21, 3.34, 3.29, 3.18, 3.1, 3.07, 2.85, 2.53, 2.56, 2.43, 2.6, 2.54, 2.48, 2.42, 2.17, 2.99, 2.89, 2.92, 2.54, 2.52, 2.92, 2.58, 3.51, 4.59, 4.29] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$449M', pe: null, revenueGrowth: -51, eps: -3.87, grossMargin: 0, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.41, RKNG: false },
      tonyNote: 'Virgin Galactic Holdings appears in 1 of 3 Meme ETFs (33% coverage) with average weight 7.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RDW', name: 'Redwire', easyScore: 1, avgWeight: 6.67, proScore: 2.22, coverage: 0.333,
      price: 15.2, weeklyPrices: [18.62, 21.43, 18.45, 18.57, 15.20], weeklyChange: -18.39, sortRank: 0, periodReturns: { '1M': 37.3, '6M': 108.4, '1Y': -23.9 },
      priceHistory: { '1W': [18.62, 21.43, 18.45, 18.57, 15.2], '1M': [12.16, 11.56, 11.46, 13.99, 14.06, 13.96, 13.91, 14.77, 15.35, 17.49, 22.04, 24, 25.9, 24.57, 20.68, 20.58, 18.62, 21.43, 18.45, 18.57, 15.2], '6M': [7.29, 6.59, 8.01, 7.6, 10.28, 10.86, 12.52, 11.75, 10.04, 8.02, 8.12, 9.52, 9.65, 9.59, 9.2, 8.16, 9.91, 9.99, 10.21, 9.33, 8.64, 12.16, 13.96, 22.04, 20.58, 15.2], '1Y': [19.96, 20.57, 16.53, 15.31, 15.78, 17.5, 16.92, 14.46, 14.71, 9.42, 8.84, 9.29, 8.32, 8.23, 7.87, 9.35, 9.16, 9.79, 8.94, 7.64, 7.85, 6.95, 6.13, 5.43, 5.41, 5.57, 7.48, 6.44, 7.82, 9.03, 10.98, 11.71, 12.52, 11.75, 10.04, 8.02, 8.12, 9.52, 9.65, 9.54, 9.38, 7.71, 9.65, 9.81, 10.31, 9.33, 8.64, 12.16, 13.96, 22.04, 20.58, 15.2] },
      velocityScore: { '1D': 0, '1W': -47.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3B', pe: null, revenueGrowth: 58, eps: -2.59, grossMargin: 13, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.67, RKNG: false },
      tonyNote: 'Redwire Corp is a space infrastructure company — solar arrays, structures, and manufacturing in orbit. It appears in Meme and speculative ETFs as a high-risk space economy play. Revenue is growing from a small base but the business is pre-profitability; the ETF weight is minimal and reflects thematic positioning rather than fundamental conviction.',
    },
    {
      ticker: 'QBTS', name: 'D-Wave Quantum', easyScore: 1, avgWeight: 5.42, proScore: 1.81, coverage: 0.333,
      price: 22.93, weeklyPrices: [27.55, 27.64, 23.85, 25.83, 22.93], weeklyChange: -16.75, sortRank: 0, periodReturns: { '1M': 1.6, '6M': -19, '1Y': 27.8 },
      priceHistory: { '1W': [27.55, 27.64, 23.85, 25.83, 22.93], '1M': [24.03, 22.35, 21.44, 22.13, 20.35, 19.06, 18.19, 19.3, 25.74, 29.4, 27.82, 27.48, 29.49, 30.14, 29.18, 29.91, 27.55, 27.64, 23.85, 25.83, 22.93], '6M': [28.33, 25.52, 29.12, 26.15, 29.28, 28.72, 25.63, 21.22, 20.72, 19.67, 18.05, 18.94, 19.04, 17.55, 15.73, 13.9, 14.14, 14.65, 21.66, 18.8, 20.92, 24.03, 19.06, 27.82, 29.91, 22.93], '1Y': [17.95, 16, 14.97, 14.82, 16.39, 16.91, 20.3, 17.67, 18.3, 18.51, 15.32, 15.45, 15.3, 16.04, 22.54, 27.72, 25.63, 34.25, 44.78, 27.29, 32, 29.74, 28.99, 22.93, 22.59, 25.08, 26.8, 23.8, 27.52, 28.13, 28.11, 28.83, 25.63, 21.22, 20.72, 19.67, 18.05, 18.94, 19.04, 17.46, 16.31, 12.98, 13.74, 16.97, 20.36, 18.8, 20.92, 24.03, 19.06, 27.82, 29.91, 22.93] },
      velocityScore: { '1D': 0, '1W': -45, '1M': null, '6M': null }, isNew: false,
      marketCap: '$8B', pe: null, revenueGrowth: -81, eps: -1.14, grossMargin: 66, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.42, RKNG: false },
      tonyNote: 'D-Wave Quantum is a quantum computing company — the only publicly traded business built around quantum annealing hardware. Revenue is minimal and profitability is many years away, but it holds a position in Meme ETFs as the purest-play quantum computing stock available to retail investors. The ETF weight is small and the position is purely thematic.',
    },
    {
      ticker: 'AXTI', name: 'AXT Inc', easyScore: 1, avgWeight: 5.41, proScore: 1.8, coverage: 0.333,
      price: 78.45, weeklyPrices: [106.70, 105.99, 89.04, 90.78, 78.45], weeklyChange: -26.48, sortRank: 0, periodReturns: { '1M': -32.6, '6M': 424.4, '1Y': 4186.9 },
      priceHistory: { '1W': [106.7, 105.99, 89.04, 90.78, 78.45], '1M': [125.81, 122.9, 121.94, 114.98, 123.78, 105.88, 112.88, 104.61, 121.02, 140.83, 132.6, 122.77, 115.7, 103.16, 109.55, 110.85, 106.7, 105.99, 89.04, 90.78, 78.45], '6M': [14.96, 13, 14.64, 16.35, 25.83, 25.72, 17.4, 18.54, 24.06, 24.24, 28.43, 46.32, 38.56, 48.86, 54.24, 60.63, 41.99, 66.45, 78.76, 70.15, 106, 125.81, 105.88, 132.6, 110.85, 78.45], '1Y': [1.83, 2.08, 2.02, 2.01, 2.54, 2.39, 2.52, 2.29, 2.05, 2.23, 2.14, 2.77, 3.08, 3.36, 3.94, 4.83, 4.91, 5.31, 4.59, 4.94, 6.6, 8.54, 10.56, 9.9, 9.23, 11.48, 15.51, 12.36, 15.01, 16.76, 22.99, 22.09, 17.4, 18.54, 24.06, 24.24, 28.43, 46.32, 38.56, 48.39, 64.44, 52.73, 45.46, 67.3, 74.97, 70.15, 106, 125.81, 105.88, 132.6, 110.85, 78.45] },
      velocityScore: { '1D': 0, '1W': -27.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: null, revenueGrowth: 39, eps: -0.32, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.41, RKNG: false },
      tonyNote: 'AXT Inc is a compound semiconductor substrate manufacturer — gallium arsenide, indium phosphide, and germanium wafers used in data center optical transceivers, 5G RF chips, and solar cells. Revenue is growing with optical networking demand. Small market cap but positioned at a genuine supply-chain chokepoint for III-V semiconductor materials.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 1, avgWeight: 4.66, proScore: 1.55, coverage: 0.333,
      price: 494.99, weeklyPrices: [594.11, 575.50, 511.72, 526.93, 494.99], weeklyChange: -16.68, sortRank: 0, periodReturns: { '1M': 3.1, '6M': 192, '1Y': 768.1 },
      priceHistory: { '1W': [594.11, 575.5, 511.72, 526.93, 494.99], '1M': [515.83, 488.74, 494.09, 489.15, 482.02, 458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 494.99], '6M': [169.54, 174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 458.68, 524.65, 563.1, 494.99], '1Y': [57.02, 57.41, 62.07, 63.84, 64.64, 66.53, 69.32, 70.61, 75.84, 75.91, 75.86, 79.71, 86, 95.02, 100.94, 109.69, 130.59, 121.18, 120.44, 120.47, 124.92, 152.18, 169.99, 152.86, 155.41, 155.59, 181.95, 166.26, 179.56, 187.7, 200.46, 221.51, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 400.73, 442.36, 515.83, 458.68, 524.65, 563.1, 494.99] },
      velocityScore: { '1D': 0, '1W': -37.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$171B', pe: 29.6, revenueGrowth: 46, eps: 16.7, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.66 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
