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
export const SPY_RET: Record<Period, number> = { '1W': -2.3, '1M': 0.6, '6M': 8.6, '1Y': 23.8 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 7.4 }, { t: 'AMD', w: 4.4 }, { t: 'MRVL', w: 4.4 }, { t: 'VRT', w: 3.8 }, { t: 'SIMO', w: 3.5 }],
  ARTY: [{ t: 'MRVL', w: 8.6 }, { t: 'AMD', w: 7.0 }, { t: 'MU', w: 6.8 }, { t: 'ORCL', w: 4.3 }, { t: 'CRWV', w: 4.1 }],
  BAI: [{ t: 'MU', w: 5.4 }, { t: 'AMD', w: 4.9 }, { t: 'AVGO', w: 4.8 }, { t: 'NVDA', w: 4.6 }, { t: 'TSM', w: 4.5 }],
  IVEP: [{ t: 'BE', w: 4.9 }, { t: 'PWR', w: 4.3 }, { t: 'COHR', w: 4.0 }, { t: 'EQIX', w: 4.0 }, { t: 'VRT', w: 4.0 }],
  IGPT: [{ t: 'MU', w: 11.5 }, { t: 'AMD', w: 7.2 }, { t: 'GOOGL', w: 6.5 }, { t: 'INTC', w: 6.3 }, { t: 'NVDA', w: 6.0 }],
  IVES: [{ t: 'MU', w: 5.3 }, { t: 'AAPL', w: 4.9 }, { t: 'TSM', w: 4.9 }, { t: 'MSFT', w: 4.8 }, { t: 'NVDA', w: 4.7 }],
  ALAI: [{ t: 'NVDA', w: 13.2 }, { t: 'AMZN', w: 5.9 }, { t: 'MSFT', w: 5.6 }, { t: 'TSM', w: 5.5 }, { t: 'GOOG', w: 5.1 }],
  CHAT: [{ t: 'NVDA', w: 6.0 }, { t: 'GOOGL', w: 5.7 }, { t: 'MU', w: 5.7 }, { t: 'AMD', w: 5.5 }, { t: 'ARM', w: 4.3 }],
  AIFD: [{ t: 'NVDA', w: 6.6 }, { t: 'MRVL', w: 6.3 }, { t: 'LITE', w: 6.0 }, { t: 'DOCN', w: 5.9 }, { t: 'MU', w: 5.8 }],
  SPRX: [{ t: 'COHR', w: 9.1 }, { t: 'ARM', w: 8.2 }, { t: 'ALAB', w: 7.4 }, { t: 'KLAC', w: 6.3 }, { t: 'MKSI', w: 5.1 }],
  AOTG: [{ t: 'AMD', w: 15.6 }, { t: 'NVDA', w: 10.9 }, { t: 'MU', w: 9.8 }, { t: 'TSM', w: 7.2 }, { t: 'APP', w: 4.8 }],
  SOXX: [{ t: 'MU', w: 10.9 }, { t: 'AMD', w: 9.0 }, { t: 'MRVL', w: 8.4 }, { t: 'AVGO', w: 6.3 }, { t: 'NVDA', w: 6.0 }],
  PSI: [{ t: 'AMAT', w: 5.6 }, { t: 'MU', w: 5.4 }, { t: 'KLAC', w: 5.4 }, { t: 'ADI', w: 5.4 }, { t: 'NVDA', w: 5.3 }],
  XSD: [{ t: 'MXL', w: 5.8 }, { t: 'MRVL', w: 4.6 }, { t: 'ALAB', w: 4.1 }, { t: 'NVTS', w: 3.7 }, { t: 'AMD', w: 3.6 }],
  DRAM: [{ t: 'SNDK', w: 5.0 }, { t: 'STX', w: 4.3 }, { t: 'WDC', w: 3.8 }, { t: 'MU', w: 3.8 }],
  PTF: [{ t: 'SNDK', w: 7.4 }, { t: 'STX', w: 4.8 }, { t: 'WDC', w: 4.7 }, { t: 'AAPL', w: 4.7 }, { t: 'NVDA', w: 4.5 }],
  WCLD: [{ t: 'DOCN', w: 3.6 }, { t: 'FROG', w: 2.9 }, { t: 'DDOG', w: 2.7 }, { t: 'TWLO', w: 2.7 }, { t: 'PANW', w: 2.4 }],
  IGV: [{ t: 'ORCL', w: 10.0 }, { t: 'MSFT', w: 7.9 }, { t: 'PANW', w: 7.8 }, { t: 'PLTR', w: 6.8 }, { t: 'CRM', w: 6.2 }],
  FDTX: [{ t: 'MU', w: 9.4 }, { t: 'MRVL', w: 8.1 }, { t: 'TSM', w: 6.0 }, { t: 'NVDA', w: 4.6 }, { t: 'STX', w: 4.0 }],
  GTEK: [{ t: 'MRVL', w: 4.4 }, { t: 'DELL', w: 2.9 }, { t: 'CDNS', w: 2.5 }, { t: 'NET', w: 2.2 }, { t: 'APH', w: 2.1 }],
  ARKK: [{ t: 'TSLA', w: 10.1 }, { t: 'CRSP', w: 5.0 }, { t: 'TEM', w: 4.8 }, { t: 'HOOD', w: 4.7 }, { t: 'AMD', w: 4.7 }],
  MARS: [{ t: 'RKLB', w: 13.6 }, { t: 'ASTS', w: 9.1 }, { t: 'SATS', w: 8.1 }, { t: 'GSAT', w: 4.7 }, { t: 'PL', w: 4.5 }],
  FRWD: [{ t: 'STX', w: 9.1 }, { t: 'NVDA', w: 8.2 }, { t: 'AMD', w: 7.6 }, { t: 'TSM', w: 5.9 }, { t: 'LRCX', w: 5.8 }],
  BCTK: [{ t: 'TSM', w: 8.6 }, { t: 'AVGO', w: 7.5 }, { t: 'LRCX', w: 6.8 }, { t: 'NVDA', w: 6.6 }, { t: 'GOOG', w: 5.6 }],
  FWD: [{ t: 'AVGO', w: 3.2 }, { t: 'AMD', w: 2.7 }, { t: 'NVDA', w: 1.9 }, { t: 'CAT', w: 1.8 }, { t: 'LRCX', w: 1.8 }],
  CBSE: [{ t: 'MRVL', w: 3.3 }, { t: 'TXG', w: 2.9 }, { t: 'SNOW', w: 2.8 }, { t: 'MU', w: 2.8 }, { t: 'STX', w: 2.7 }],
  FCUS: [{ t: 'STRL', w: 4.5 }, { t: 'DELL', w: 4.4 }, { t: 'BE', w: 4.4 }, { t: 'SITM', w: 4.3 }, { t: 'INTC', w: 4.3 }],
  WGMI: [{ t: 'CIFR', w: 16.4 }, { t: 'IREN', w: 12.9 }, { t: 'WULF', w: 9.1 }, { t: 'CORZ', w: 7.3 }, { t: 'KEEL', w: 7.2 }],
  POW: [{ t: 'POWL', w: 6.6 }, { t: 'VICR', w: 4.9 }, { t: 'PWR', w: 4.8 }, { t: 'PRY', w: 4.5 }, { t: 'ETN', w: 4.1 }],
  VOLT: [{ t: 'POWL', w: 7.9 }, { t: 'BELFB', w: 7.2 }, { t: 'PWR', w: 5.5 }, { t: 'ETN', w: 5.4 }, { t: 'AEP', w: 4.3 }],
  PBD: [{ t: 'SEDG', w: 1.2 }, { t: 'FSLR', w: 1.1 }, { t: 'BLDP', w: 1.1 }, { t: 'ENPH', w: 1.1 }, { t: 'SHLS', w: 1.1 }],
  PBW: [{ t: 'HYLN', w: 4.2 }, { t: 'NVTS', w: 3.2 }, { t: 'FCEL', w: 3.0 }, { t: 'BLDP', w: 2.2 }, { t: 'BE', w: 2.1 }],
  AIRR: [{ t: 'STRL', w: 6.6 }, { t: 'AGX', w: 4.3 }, { t: 'FIX', w: 4.3 }, { t: 'CHRW', w: 4.2 }, { t: 'SAIA', w: 4.1 }],
  PRN: [{ t: 'TTMI', w: 5.5 }, { t: 'FIX', w: 4.8 }, { t: 'STRL', w: 4.8 }, { t: 'AGX', w: 4.7 }, { t: 'PWR', w: 4.1 }],
  RSHO: [{ t: 'TKR', w: 9.0 }, { t: 'POWL', w: 8.0 }, { t: 'CGNX', w: 7.3 }, { t: 'CAT', w: 6.8 }, { t: 'ETN', w: 5.8 }],
  IDEF: [{ t: 'RTX', w: 7.7 }, { t: 'LMT', w: 6.8 }, { t: 'GD', w: 5.6 }, { t: 'NOC', w: 4.9 }, { t: 'BA', w: 4.8 }],
  BILT: [{ t: 'UNP', w: 5.8 }, { t: 'AEP', w: 4.4 }, { t: 'AENA', w: 4.1 }, { t: 'LNG', w: 3.9 }, { t: 'CP', w: 3.6 }],
  BUZZ: [{ t: 'SMCI', w: 4.0 }, { t: 'ASTS', w: 3.7 }, { t: 'MU', w: 3.6 }, { t: 'NOW', w: 3.5 }, { t: 'NBIS', w: 3.3 }],
  MEME: [{ t: 'SPCE', w: 7.4 }, { t: 'RDW', w: 6.7 }, { t: 'AAOI', w: 6.4 }, { t: 'BE', w: 5.9 }, { t: 'ASTS', w: 5.8 }],
  RKNG: [{ t: 'NVTS', w: 6.7 }, { t: 'SNDK', w: 5.9 }, { t: 'MU', w: 5.2 }, { t: 'NBIS', w: 5.1 }, { t: 'WDC', w: 4.7 }],
};
// @@END_GENERATED:ETF_TOP_HOLDINGS@@

// @@GENERATED:TOP10_RET@@
// Top10 composite returns per theme per period (average of all ETFs in theme)
const TOP10_RET: Record<Theme, Record<Period, number>> = {
  'AI & ML':         { '1W': -7.7, '1M': 5.6, '6M': 36.5, '1Y': 79.5 },
  'Semiconductors':  { '1W': -8.3, '1M': 7.6, '6M': 89, '1Y': 148.2 },
  'Broad Tech':      { '1W': -7.5, '1M': 4, '6M': 23.6, '1Y': 52.5 },
  'Electrification': { '1W': -7.1, '1M': -4.5, '6M': 32.9, '1Y': 71.9 },
  'Industrials':     { '1W': -1.6, '1M': -0.8, '6M': 23.1, '1Y': 41.1 },
  'Meme':            { '1W': -10.7, '1M': 3.5, '6M': 18.7, '1Y': 14.5 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, Record<Period, ChartPeriodData>> = {
  'AI & ML': {
    '1W': { top10: [100, 99.05, 97.69, 89.8, 92.27], spy: [100, 99.3, 99.67, 97.1, 97.73], top10Return: -7.7, spyReturn: -2.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 102.17, 99.73, 102.08, 103.09, 99.74, 97.83, 97.07, 100.13, 102.47, 103.38, 107.29, 106.99, 108.72, 109.47, 112.3, 114.58, 113.5, 111.91, 102.74, 105.63], spy: [100, 100.23, 100.08, 100.64, 101.43, 100.21, 100.14, 99.47, 100.49, 100.69, 101.09, 101.76, 101.74, 102.3, 102.56, 102.84, 102.98, 102.25, 102.64, 99.99, 100.64], top10Return: 5.6, spyReturn: 0.6, xLabels: ["May 11", "May 18", "May 25", "Jun 1", "Jun 8"] },
    '6M': { top10: [100, 95.59, 98.54, 98.31, 101.19, 100.85, 102.23, 104.29, 95.33, 99.38, 101.68, 100.8, 97.2, 98.08, 100.98, 95.34, 97.55, 104.48, 113.22, 118.06, 119.77, 129, 128.35, 133.29, 145.47, 136.54], spy: [100, 99.58, 100.18, 100.49, 100.87, 100.98, 100.78, 101.52, 99.12, 99.65, 100.85, 100.35, 98.35, 97.43, 96.51, 94.36, 95.93, 99.39, 103.88, 104.43, 105.42, 107.9, 108.12, 109.07, 110.96, 108.59], top10Return: 36.5, spyReturn: 8.6, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.33, 103.75, 104.49, 107.21, 108.18, 108.67, 112.18, 111.65, 116.09, 111.89, 113.66, 113.58, 121.52, 124.02, 125.84, 126.48, 130.33, 128.98, 131.17, 138.01, 133.98, 133.03, 123.99, 125.69, 130.54, 133.3, 126.13, 130.81, 128.73, 131.71, 134.51, 135.49, 134.39, 131.81, 132.44, 134.46, 133.22, 127.54, 129.06, 128.37, 122.69, 129.74, 143.13, 152.49, 158.66, 161.38, 175.01, 174.57, 181.66, 199.45, 186.91], spy: [100, 100.5, 101.18, 103, 104.07, 104.09, 104.87, 105.93, 104.72, 107.17, 106.69, 107.58, 107.35, 108.76, 109.92, 110.24, 111.09, 111.58, 110.43, 111.94, 114.57, 112.6, 113.89, 110.07, 112.56, 114.04, 113.9, 113.21, 114.72, 113.71, 114.98, 115.43, 114.93, 115.39, 115.16, 113.69, 114.97, 114.39, 112.12, 110.44, 108.15, 105.74, 109.88, 114.41, 118.18, 119.26, 120.17, 123, 123.26, 124.34, 126.49, 123.79], top10Return: 79.5, spyReturn: 23.8, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Semiconductors': {
    '1W': { top10: [100, 101.2, 98.67, 87.12, 91.74], spy: [100, 99.3, 99.67, 97.1, 97.73], top10Return: -8.3, spyReturn: -2.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 103.36, 98.56, 101.7, 101.62, 97.85, 94.77, 95.18, 99.38, 101.78, 103.4, 111.19, 110.26, 111.54, 110.52, 112.1, 117.5, 118.88, 115.74, 102.03, 107.55], spy: [100, 100.23, 100.08, 100.64, 101.43, 100.21, 100.14, 99.47, 100.49, 100.69, 101.09, 101.76, 101.74, 102.3, 102.56, 102.84, 102.98, 102.25, 102.64, 99.99, 100.64], top10Return: 7.6, spyReturn: 0.6, xLabels: ["May 11", "May 18", "May 25", "Jun 1", "Jun 8"] },
    '6M': { top10: [100, 98.13, 102.19, 101.67, 109.72, 110.88, 114.88, 118.17, 112.38, 119.36, 119.85, 120.24, 118.13, 121.84, 128.45, 125.23, 129.78, 135.94, 144.78, 161.75, 169.14, 184.48, 187.04, 196.36, 195.4, 188.95], spy: [100, 99.58, 100.18, 100.49, 100.87, 100.98, 100.78, 101.52, 99.12, 99.65, 100.85, 100.35, 98.35, 97.43, 96.51, 94.36, 95.93, 99.39, 103.88, 104.43, 105.42, 107.9, 108.12, 109.07, 110.96, 108.59], top10Return: 89, spyReturn: 8.6, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.11, 106.02, 107.05, 110.68, 110.38, 110.22, 111.1, 108.43, 114.06, 111.24, 115.73, 112.27, 118.87, 122.6, 126.65, 127.11, 131.1, 131.69, 136.26, 140.76, 135.18, 135.65, 125.33, 130.08, 141.29, 143.68, 136.21, 140.03, 137.1, 147.21, 154.47, 156.1, 155.88, 161, 163.87, 164, 160.98, 146.72, 150.39, 151.46, 148.76, 158.11, 179.47, 194.49, 211.24, 220.12, 246.04, 241.55, 256.66, 261.38, 258.63], spy: [100, 100.5, 101.18, 103, 104.07, 104.09, 104.87, 105.93, 104.72, 107.17, 106.69, 107.58, 107.35, 108.76, 109.92, 110.24, 111.09, 111.58, 110.43, 111.94, 114.57, 112.6, 113.89, 110.07, 112.56, 114.04, 113.9, 113.21, 114.72, 113.71, 114.98, 115.43, 114.93, 115.39, 115.16, 113.69, 114.97, 114.39, 112.12, 110.44, 108.15, 105.74, 109.88, 114.41, 118.18, 119.26, 120.17, 123, 123.26, 124.34, 126.49, 123.79], top10Return: 148.2, spyReturn: 23.8, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Broad Tech': {
    '1W': { top10: [100, 98.33, 98.1, 90.95, 92.52], spy: [100, 99.3, 99.67, 97.1, 97.73], top10Return: -7.5, spyReturn: -2.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 101.72, 99.75, 100.64, 102.1, 99.55, 98.74, 98.03, 100.41, 102.13, 103.63, 106.92, 106.94, 108.65, 109.27, 111.28, 112.49, 110.58, 110.3, 102.24, 104.01], spy: [100, 100.23, 100.08, 100.64, 101.43, 100.21, 100.14, 99.47, 100.49, 100.69, 101.09, 101.76, 101.74, 102.3, 102.56, 102.84, 102.98, 102.25, 102.64, 99.99, 100.64], top10Return: 4, spyReturn: 0.6, xLabels: ["May 11", "May 18", "May 25", "Jun 1", "Jun 8"] },
    '6M': { top10: [100, 96.41, 99.21, 97.92, 100.54, 101.33, 101.46, 100.72, 93.57, 97.05, 99.1, 100.18, 96.9, 96.14, 98.19, 94.69, 96.85, 100.86, 109.34, 112.44, 114.51, 121.39, 120.97, 123.17, 131.21, 123.62], spy: [100, 99.58, 100.18, 100.49, 100.87, 100.98, 100.78, 101.52, 99.12, 99.65, 100.85, 100.35, 98.35, 97.43, 96.51, 94.36, 95.93, 99.39, 103.88, 104.43, 105.42, 107.9, 108.12, 109.07, 110.96, 108.59], top10Return: 23.6, spyReturn: 8.6, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 99.8, 101.91, 103.63, 106.12, 106.88, 108.28, 107.35, 106.22, 107.35, 105.68, 108.83, 108.49, 112.38, 116.79, 119.8, 121.1, 125.72, 129.96, 127.16, 130.89, 127.8, 125.48, 117.02, 119.15, 122.04, 124.43, 117.76, 120.42, 117.2, 122.22, 125.44, 126.38, 122.75, 120.24, 122.67, 123.67, 124.09, 119.89, 120.36, 121.08, 117.85, 122.77, 131.26, 138.95, 139.93, 141.45, 148.9, 147.78, 152.12, 161.52, 152.54], spy: [100, 100.5, 101.18, 103, 104.07, 104.09, 104.87, 105.93, 104.72, 107.17, 106.69, 107.58, 107.35, 108.76, 109.92, 110.24, 111.09, 111.58, 110.43, 111.94, 114.57, 112.6, 113.89, 110.07, 112.56, 114.04, 113.9, 113.21, 114.72, 113.71, 114.98, 115.43, 114.93, 115.39, 115.16, 113.69, 114.97, 114.39, 112.12, 110.44, 108.15, 105.74, 109.88, 114.41, 118.18, 119.26, 120.17, 123, 123.26, 124.34, 126.49, 123.79], top10Return: 52.5, spyReturn: 23.8, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Electrification': {
    '1W': { top10: [100, 98.96, 98.8, 92.19, 92.92], spy: [100, 99.3, 99.67, 97.1, 97.73], top10Return: -7.1, spyReturn: -2.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 102.22, 99.58, 100.41, 100.37, 97.72, 94.7, 92.54, 94.77, 97.7, 99.32, 102.72, 102.09, 102.36, 101.29, 101.19, 103, 101.81, 101.7, 94.71, 95.49], spy: [100, 100.23, 100.08, 100.64, 101.43, 100.21, 100.14, 99.47, 100.49, 100.69, 101.09, 101.76, 101.74, 102.3, 102.56, 102.84, 102.98, 102.25, 102.64, 99.99, 100.64], top10Return: -4.5, spyReturn: 0.6, xLabels: ["May 11", "May 18", "May 25", "Jun 1", "Jun 8"] },
    '6M': { top10: [100, 98.41, 99.46, 98.3, 101.46, 105.18, 109.9, 111.27, 107.3, 112.62, 114.67, 115.2, 107.34, 110.18, 112.49, 110.05, 111.88, 119.53, 125.19, 131.24, 135.7, 139.78, 136.17, 138.27, 140.76, 132.85], spy: [100, 99.58, 100.18, 100.49, 100.87, 100.98, 100.78, 101.52, 99.12, 99.65, 100.85, 100.35, 98.35, 97.43, 96.51, 94.36, 95.93, 99.39, 103.88, 104.43, 105.42, 107.9, 108.12, 109.07, 110.96, 108.59], top10Return: 32.9, spyReturn: 8.6, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.19, 101.6, 103.26, 106.67, 107.29, 111.5, 110.5, 110.16, 112.91, 113.64, 115.82, 112.19, 114.05, 118.12, 122.27, 122.88, 130.05, 135.34, 133.55, 135.2, 132.81, 136.74, 130.03, 131.3, 133.47, 135.59, 134.2, 136.69, 132.34, 136.96, 141.68, 146.28, 142.43, 147.28, 145.64, 147.59, 148.57, 143.26, 145.69, 144.34, 148.73, 151.13, 160.2, 167.18, 169.95, 172.8, 175.51, 177.67, 179.32, 182.6, 171.94], spy: [100, 100.5, 101.18, 103, 104.07, 104.09, 104.87, 105.93, 104.72, 107.17, 106.69, 107.58, 107.35, 108.76, 109.92, 110.24, 111.09, 111.58, 110.43, 111.94, 114.57, 112.6, 113.89, 110.07, 112.56, 114.04, 113.9, 113.21, 114.72, 113.71, 114.98, 115.43, 114.93, 115.39, 115.16, 113.69, 114.97, 114.39, 112.12, 110.44, 108.15, 105.74, 109.88, 114.41, 118.18, 119.26, 120.17, 123, 123.26, 124.34, 126.49, 123.79], top10Return: 71.9, spyReturn: 23.8, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Industrials': {
    '1W': { top10: [100, 99.74, 100.7, 97.93, 98.44], spy: [100, 99.3, 99.67, 97.1, 97.73], top10Return: -1.6, spyReturn: -2.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 101.08, 100.21, 100.23, 100.91, 98.24, 96.92, 95.8, 97.63, 97.82, 98.7, 101.15, 101.15, 101.62, 100.96, 99.47, 100.77, 100.52, 101.48, 98.67, 99.19], spy: [100, 100.23, 100.08, 100.64, 101.43, 100.21, 100.14, 99.47, 100.49, 100.69, 101.09, 101.76, 101.74, 102.3, 102.56, 102.84, 102.98, 102.25, 102.64, 99.99, 100.64], top10Return: -0.8, spyReturn: 0.6, xLabels: ["May 11", "May 18", "May 25", "Jun 1", "Jun 8"] },
    '6M': { top10: [100, 100.82, 102.32, 101.16, 104.84, 109.15, 111.57, 111.71, 111.45, 116.31, 120.25, 118.94, 112.98, 111.73, 112.37, 110.32, 113.07, 119.24, 121.1, 120.74, 122.45, 124.1, 122.03, 122.38, 123.44, 123.13], spy: [100, 99.58, 100.18, 100.49, 100.87, 100.98, 100.78, 101.52, 99.12, 99.65, 100.85, 100.35, 98.35, 97.43, 96.51, 94.36, 95.93, 99.39, 103.88, 104.43, 105.42, 107.9, 108.12, 109.07, 110.96, 108.59], top10Return: 23.1, spyReturn: 8.6, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 100, 101.29, 102.99, 104.63, 104.96, 104.98, 107.02, 107.09, 109.03, 107.35, 109.97, 107.94, 110.02, 110.87, 111.66, 113.72, 115.23, 115.28, 115.41, 117.62, 115.2, 114.28, 109.4, 111.89, 113.13, 113.9, 114.65, 117.74, 115.1, 121.41, 127.73, 128.1, 127.24, 133.41, 135.37, 137.47, 135.25, 128.64, 126.19, 125.71, 126, 130.02, 137.28, 138.79, 139.08, 139.86, 142.19, 140.22, 140.1, 141.67, 141.07], spy: [100, 100.5, 101.18, 103, 104.07, 104.09, 104.87, 105.93, 104.72, 107.17, 106.69, 107.58, 107.35, 108.76, 109.92, 110.24, 111.09, 111.58, 110.43, 111.94, 114.57, 112.6, 113.89, 110.07, 112.56, 114.04, 113.9, 113.21, 114.72, 113.71, 114.98, 115.43, 114.93, 115.39, 115.16, 113.69, 114.97, 114.39, 112.12, 110.44, 108.15, 105.74, 109.88, 114.41, 118.18, 119.26, 120.17, 123, 123.26, 124.34, 126.49, 123.79], top10Return: 41.1, spyReturn: 23.8, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Meme': {
    '1W': { top10: [100, 96.53, 97.03, 87.18, 89.28], spy: [100, 99.3, 99.67, 97.1, 97.73], top10Return: -10.7, spyReturn: -2.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 104.65, 101.61, 103.87, 104.85, 100.74, 96.65, 95.15, 98.82, 104.83, 107.34, 110.94, 112.61, 114.66, 113.08, 113.26, 116.11, 112.01, 112.64, 101.07, 103.52], spy: [100, 100.23, 100.08, 100.64, 101.43, 100.21, 100.14, 99.47, 100.49, 100.69, 101.09, 101.76, 101.74, 102.3, 102.56, 102.84, 102.98, 102.25, 102.64, 99.99, 100.64], top10Return: 3.5, spyReturn: 0.6, xLabels: ["May 11", "May 18", "May 25", "Jun 1", "Jun 8"] },
    '6M': { top10: [100, 92.22, 95.72, 89.18, 93.34, 97.72, 98.63, 94.53, 81.99, 85.04, 86.54, 86.11, 81.58, 85.06, 89.4, 86.81, 89.88, 95.61, 106.81, 105.76, 109.66, 114.46, 116.89, 125.21, 131.28, 118.69], spy: [100, 99.58, 100.18, 100.49, 100.87, 100.98, 100.78, 101.52, 99.12, 99.65, 100.85, 100.35, 98.35, 97.43, 96.51, 94.36, 95.93, 99.39, 103.88, 104.43, 105.42, 107.9, 108.12, 109.07, 110.96, 108.59], top10Return: 18.7, spyReturn: 8.6, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.14, 100.78, 95.47, 96.01, 94.63, 94.15, 92.84, 86.41, 87.49, 86.64, 87.65, 87.48, 90.64, 89.29, 88.57, 92.42, 92.76, 95.07, 94.58, 99.33, 95.32, 95.16, 90.81, 86.8, 85.25, 89.92, 86.84, 90.86, 89.1, 92.67, 93.12, 94.67, 92.63, 93.13, 91.92, 87.68, 89.82, 93.55, 99.06, 99.58, 98.12, 98.55, 99.89, 104.51, 108.69, 113.66, 113.81, 118.33, 124.69, 124.89, 114.47], spy: [100, 100.5, 101.18, 103, 104.07, 104.09, 104.87, 105.93, 104.72, 107.17, 106.69, 107.58, 107.35, 108.76, 109.92, 110.24, 111.09, 111.58, 110.43, 111.94, 114.57, 112.6, 113.89, 110.07, 112.56, 114.04, 113.9, 113.21, 114.72, 113.71, 114.98, 115.43, 114.93, 115.39, 115.16, 113.69, 114.97, 114.39, 112.12, 110.44, 108.15, 105.74, 109.88, 114.41, 118.18, 119.26, 120.17, 123, 123.26, 124.34, 126.49, 123.79], top10Return: 14.5, spyReturn: 23.8, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
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
export const SCAN_TIMESTAMP    = '2026-06-08T13:51:27.954Z';
export const SCAN_TIMESTAMP_NY = 'June 8, 2026 at 9:51 AM ET';
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
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 13.56, bestProScore: 5.84, price: 939.54, weeklyChange: -11.71 },
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 11.20, bestProScore: 5.64, price: 208.44, weeklyChange: -6.45 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 10.77, bestProScore: 4.61, price: 487.18, weeklyChange: -6.59 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 6.98, bestProScore: 3.26, price: 284.86, weeklyChange: -2.04 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 5.81, bestProScore: 2.49, price: 395.90, weeklyChange: -17.79 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 5.73, bestProScore: 3.62, price: 291.06, weeklyChange: -2.68 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.25, bestProScore: 2.60, price: 430.42, weeklyChange: -3.64 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.26, bestProScore: 2.16, price: 319.28, weeklyChange: -4.52 },
  { ticker: 'AMZN', name: `AMAZON.COM INC`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 3.16, bestProScore: 1.94, price: 247.61, weeklyChange: -3.47 },
  { ticker: 'ALAB', name: `Astera Labs Inc`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 3.04, bestProScore: 1.59, price: 342.55, weeklyChange: -3.71 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': -9.4, '1M': 9.8, '6M': 94.6, '1Y': 183.4 },
  ARTY: { '1W': -8.9, '1M': 7.6, '6M': 48.3, '1Y': 91.6 },
  BAI:  { '1W': -8.5, '1M': 1.2, '6M': 34.1, '1Y': 77.2 },
  IVEP: { '1W': -4.2, '1M': -2.9, '6M': 4.8, '1Y': 4.8 },
  IGPT: { '1W': -7, '1M': 4.5, '6M': 60.4, '1Y': 102.6 },
  IVES: { '1W': -8.5, '1M': 4.2, '6M': 14.8, '1Y': 47 },
  ALAI: { '1W': -5.9, '1M': 4.7, '6M': 17.4, '1Y': 50.7 },
  CHAT: { '1W': -9.6, '1M': 8.5, '6M': 49.6, '1Y': 105.8 },
  AIFD: { '1W': -7.2, '1M': 6.3, '6M': 38.7, '1Y': 84.1 },
  SPRX: { '1W': -9.2, '1M': 16.3, '6M': 29.9, '1Y': 95.4 },
  AOTG: { '1W': -6.7, '1M': 1.9, '6M': 9.2, '1Y': 31.4 },
  // Semiconductors
  SOXX: { '1W': -6.3, '1M': 9, '6M': 81.3, '1Y': 154.9 },
  PSI:  { '1W': -6.2, '1M': -0.2, '6M': 84.8, '1Y': 174 },
  XSD:  { '1W': -6.9, '1M': 7.5, '6M': 73.2, '1Y': 147.1 },
  DRAM: { '1W': -13.6, '1M': 13.9, '6M': 116.6, '1Y': 116.6 },
  // Broad Tech
  PTF:  { '1W': -8, '1M': 3.1, '6M': 52.8, '1Y': 86.5 },
  WCLD: { '1W': -8.1, '1M': 7.4, '6M': -10.4, '1Y': -12.5 },
  IGV:  { '1W': -8.6, '1M': 5.1, '6M': -12.5, '1Y': -9.8 },
  FDTX: { '1W': -6.3, '1M': 10.2, '6M': 32.7, '1Y': 47 },
  GTEK: { '1W': -5.7, '1M': 5.8, '6M': 43.9, '1Y': 67.9 },
  ARKK: { '1W': -5.7, '1M': -4.8, '6M': -8.1, '1Y': 20.7 },
  MARS: { '1W': -11.2, '1M': 3.5, '6M': 41.1, '1Y': 41.1 },
  FRWD: { '1W': -6.5, '1M': 3.9, '6M': 27, '1Y': 27 },
  BCTK: { '1W': -6.3, '1M': 4.3, '6M': 22.5, '1Y': 22.5 },
  FWD:  { '1W': -6.2, '1M': 2.3, '6M': 29.5, '1Y': 63.7 },
  CBSE: { '1W': -6.9, '1M': 1.7, '6M': 19.3, '1Y': 38.8 },
  FCUS: { '1W': -6.2, '1M': 0.3, '6M': 32.4, '1Y': 75.2 },
  WGMI: { '1W': -11.3, '1M': 9.3, '6M': 36.6, '1Y': 214.7 },
  // Electrification
  POW:  { '1W': -6.3, '1M': -11.1, '6M': 44.8, '1Y': 44.6 },
  VOLT: { '1W': -2.6, '1M': -4.3, '6M': 29.6, '1Y': 59.4 },
  PBD:  { '1W': -7.6, '1M': -5.2, '6M': 28, '1Y': 70.2 },
  PBW:  { '1W': -11.8, '1M': 2.5, '6M': 29, '1Y': 113.5 },
  // Industrials
  AIRR: { '1W': -0.7, '1M': -1.3, '6M': 29, '1Y': 61.5 },
  PRN:  { '1W': -3.7, '1M': -1.1, '6M': 36.1, '1Y': 55.4 },
  RSHO: { '1W': -1.3, '1M': 1, '6M': 31, '1Y': 52.5 },
  IDEF: { '1W': -2.9, '1M': -3.3, '6M': 6.9, '1Y': 19.9 },
  BILT: { '1W': 0.8, '1M': 0.7, '6M': 12.6, '1Y': 16.1 },
  // Meme
  BUZZ: { '1W': -7.8, '1M': 0.8, '6M': 7.1, '1Y': 33.8 },
  MEME: { '1W': -13.8, '1M': 6, '6M': 42.3, '1Y': 2.9 },
  RKNG: { '1W': -10.6, '1M': 3.8, '6M': 6.7, '1Y': 6.7 },
};
// @@END_GENERATED:ETF_RETURNS@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 6.2, proScore: 5.64, coverage: 0.909,
      price: 208.44, weeklyPrices: [222.82, 214.75, 218.66, 205.10, 208.44], weeklyChange: -6.45, sortRank: 0, periodReturns: { '1M': -3.1, '6M': 12.3, '1Y': 46.1 },
      priceHistory: { '1W': [222.82, 214.75, 218.66, 205.1, 208.44], '1M': [215.2, 219.44, 220.78, 225.83, 235.74, 225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.44], '6M': [185.55, 176.29, 183.69, 187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 177.19, 177.82, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 215.33, 224.36, 208.44], '1Y': [142.63, 144.69, 147.9, 153.3, 162.88, 171.37, 167.03, 175.51, 178.26, 183.16, 175.64, 181.77, 170.62, 177.33, 170.29, 176.97, 186.58, 185.04, 180.03, 181.16, 201.03, 198.69, 193.16, 181.36, 177.82, 179.59, 184.97, 177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.45, 215.2, 225.32, 215.33, 224.36, 208.44] },
      velocityScore: { '1D': 1.4, '1W': 8.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.0T', pe: 32, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.49,
      etfPresence: { AIS: 2.56, ARTY: 3.54, BAI: 4.59, IVEP: false, IGPT: 6.04, IVES: 4.71, ALAI: 13.23, CHAT: 5.98, AIFD: 6.57, SPRX: 3.95, AOTG: 10.86 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 6.51, proScore: 5.32, coverage: 0.818,
      price: 939.54, weeklyPrices: [1064.10, 1079.57, 996.00, 864.01, 939.54], weeklyChange: -11.71, sortRank: 0, periodReturns: { '1M': 25.8, '6M': 280.5, '1Y': 746.8 },
      priceHistory: { '1W': [1064.1, 1079.57, 996, 864.01, 939.54], '1M': [746.81, 795.33, 766.58, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 939.54], '6M': [246.92, 237.5, 276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 370.3, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 1035.5, 939.54], '1Y': [110.95, 119.84, 127.91, 120.89, 122.24, 116.43, 109.22, 111.96, 109.06, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 167.32, 185.69, 187.06, 202.29, 221.91, 218.03, 241.11, 228.5, 224.53, 234.16, 252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 542.21, 746.81, 724.66, 751, 1035.5, 939.54] },
      velocityScore: { '1D': -6.7, '1W': -15.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 44.4, revenueGrowth: 196, eps: 21.17, grossMargin: 58, dividendYield: 0.07,
      etfPresence: { AIS: 7.43, ARTY: 6.77, BAI: 5.38, IVEP: false, IGPT: 11.49, IVES: 5.29, ALAI: 0.96, CHAT: 5.7, AIFD: 5.75, SPRX: false, AOTG: 9.8 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.63, proScore: 4.61, coverage: 0.818,
      price: 487.18, weeklyPrices: [521.54, 542.52, 523.20, 466.38, 487.18], weeklyChange: -6.59, sortRank: 0, periodReturns: { '1M': 7, '6M': 120.3, '1Y': 300.2 },
      priceHistory: { '1W': [521.54, 542.52, 523.2, 466.38, 487.18], '1M': [455.19, 458.79, 448.29, 445.5, 449.7, 424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 487.18], '6M': [221.11, 207.58, 214.95, 215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 192.43, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 510.13, 487.18], '1Y': [121.73, 126.39, 138.43, 136.11, 138.41, 160.08, 154.72, 177.44, 174.31, 174.95, 166.55, 166.62, 162.13, 159.54, 159.16, 160.88, 161.79, 211.51, 218.09, 238.03, 258.01, 250.05, 237.52, 230.29, 206.13, 217.6, 221.62, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 360.54, 455.19, 424.1, 467.51, 510.13, 487.18] },
      velocityScore: { '1D': -2.9, '1W': -11, '1M': null, '6M': null }, isNew: false,
      marketCap: '$794B', pe: 163.5, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.44, ARTY: 7.01, BAI: 4.87, IVEP: false, IGPT: 7.15, IVES: 4.57, ALAI: 1.01, CHAT: 5.48, AIFD: false, SPRX: 0.52, AOTG: 15.63 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.43, proScore: 2.49, coverage: 0.727,
      price: 395.9, weeklyPrices: [481.57, 479.23, 418.91, 385.73, 395.90], weeklyChange: -17.79, sortRank: 0, periodReturns: { '1M': -7.9, '6M': -1.3, '1Y': 62.1 },
      priceHistory: { '1W': [481.57, 479.23, 418.91, 385.73, 395.9], '1M': [430, 428.43, 419.3, 416.79, 439.79, 425.19, 420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 395.9], '6M': [401.1, 339.81, 341.45, 349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 319.55, 330.48, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.14, 459.97, 395.9], '1Y': [244.28, 252.1, 263.77, 264.74, 277.9, 280.81, 278.59, 297.42, 292.93, 312.83, 294.91, 298.01, 302.39, 369.57, 346.17, 339.31, 329.91, 336.41, 344.13, 342.66, 372.97, 351.94, 351.96, 340.5, 385.03, 380.61, 406.29, 341.3, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 421.28, 430, 425.19, 414.14, 459.97, 395.9] },
      velocityScore: { '1D': -4.2, '1W': -24.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.9T', pe: 65.8, revenueGrowth: 48, eps: 6.02, grossMargin: 76, dividendYield: 0.67,
      etfPresence: { AIS: 0.71, ARTY: 3.44, BAI: 4.84, IVEP: false, IGPT: false, IVES: 4.42, ALAI: 3.93, CHAT: 3.01, AIFD: 5.5, SPRX: false, AOTG: 1.57 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 7, avgWeight: 2.27, proScore: 1.45, coverage: 0.636,
      price: 156.96, weeklyPrices: [175.33, 174.37, 166.01, 154.27, 156.96], weeklyChange: -10.48, sortRank: 0, periodReturns: { '1M': 10.7, '6M': 21.6, '1Y': 62.1 },
      priceHistory: { '1W': [175.33, 174.37, 166.01, 154.27, 156.96], '1M': [141.77, 136.43, 142.54, 140.69, 147.81, 141.97, 141.71, 141.58, 140.49, 148.59, 154.03, 158.01, 154.31, 155.27, 159.47, 170.68, 175.33, 174.37, 166.01, 154.27, 156.96], '6M': [129.11, 125.89, 130.73, 132.44, 130.08, 125.09, 138.41, 148.15, 128.67, 135.12, 132.79, 133.5, 132.89, 134.03, 136.26, 122.55, 126.68, 147.35, 164.23, 176.91, 172.7, 141.77, 141.97, 154.03, 170.68, 156.96], '1Y': [96.8, 95.09, 94.97, 98.91, 106.28, 108.3, 109.78, 118.62, 118.12, 141.25, 132.78, 134.27, 137.38, 150.72, 142.84, 142.64, 145.71, 145.29, 138.79, 145.94, 156.77, 153.55, 134.93, 123.45, 125.04, 127.8, 130.04, 126.13, 131.32, 131.03, 123.72, 130.59, 136.34, 141.74, 137.49, 141.59, 132.79, 133.5, 132.89, 133.57, 131.22, 120.77, 126.25, 152.02, 166.85, 172.47, 172.7, 141.77, 141.97, 154.03, 170.68, 156.96] },
      velocityScore: { '1D': -1.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$198B', pe: 53.8, revenueGrowth: 35, eps: 2.92, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.41, ARTY: 1.95, BAI: 1.4, IVEP: false, IGPT: false, IVES: false, ALAI: 0.9, CHAT: 2.36, AIFD: 4.75, SPRX: 3.15, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 7 of 11 AI & ML ETFs (64% coverage) with average weight 2.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 4.99, proScore: 2.72, coverage: 0.545,
      price: 363.72, weeklyPrices: [361.85, 358.99, 372.19, 368.53, 363.72], weeklyChange: 0.52, sortRank: 0, periodReturns: { '1M': -9.3, '6M': 15.9, '1Y': 106.6 },
      priceHistory: { '1W': [361.85, 358.99, 372.19, 368.53, 363.72], '1M': [400.8, 388.64, 387.35, 402.62, 401.07, 396.78, 396.94, 387.66, 388.91, 387.66, 382.97, 388.88, 388.83, 390.13, 380.34, 376.37, 361.85, 358.99, 372.19, 368.53, 363.72], '6M': [313.72, 308.22, 309.78, 313.85, 321.98, 335.84, 330.54, 338.25, 331.25, 309, 314.98, 311.76, 298.52, 303.55, 307.13, 280.92, 295.77, 317.24, 341.68, 344.4, 385.69, 400.8, 396.78, 382.97, 376.37, 363.72], '1Y': [176.09, 176.77, 166.77, 175.84, 176.62, 182.97, 191.34, 195.75, 194.67, 203.34, 201.57, 207.14, 230.66, 239.17, 249.53, 247.14, 243.1, 245.76, 245.45, 250.46, 267.47, 277.54, 291.31, 284.28, 323.44, 319.63, 317.08, 306.57, 314.35, 313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 314.98, 311.76, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 385.69, 400.8, 396.78, 382.97, 376.37, 363.72] },
      velocityScore: { '1D': 7.5, '1W': -22.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.7, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.79, IVEP: false, IGPT: 6.54, IVES: 4.59, ALAI: false, CHAT: 5.73, AIFD: 5.25, SPRX: false, AOTG: 4.03 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 6, avgWeight: 4.77, proScore: 2.6, coverage: 0.545,
      price: 430.42, weeklyPrices: [446.69, 436.69, 444.92, 415.17, 430.42], weeklyChange: -3.64, sortRank: 0, periodReturns: { '1M': 4.6, '6M': 42.6, '1Y': 107.9 },
      priceHistory: { '1W': [446.69, 436.69, 444.92, 415.17, 430.42], '1M': [411.68, 404.54, 397.28, 399.8, 417.72, 404.35, 395.95, 392.61, 401.62, 407.15, 404.52, 412.32, 422.73, 424.86, 418.45, 435.63, 446.69, 436.69, 444.92, 415.17, 430.42], '6M': [301.87, 287.74, 293.28, 299.58, 318.68, 327.11, 327.37, 339.55, 330.73, 368.1, 370.54, 374.58, 338.89, 336.71, 338.79, 326.11, 339.04, 370.6, 370.5, 402.46, 397.67, 411.68, 404.35, 404.52, 435.63, 430.42], '1Y': [207, 215.68, 220.09, 224.68, 231.84, 237.56, 234.6, 241.33, 232.47, 244.29, 232.7, 238.72, 231.39, 260.44, 262.79, 280.71, 279.29, 294.03, 295.94, 294.51, 301.53, 294.05, 291.17, 277.91, 284.68, 295.45, 303.41, 286.87, 296.95, 303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.54, 374.58, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 397.67, 411.68, 404.35, 404.52, 435.63, 430.42] },
      velocityScore: { '1D': 0.8, '1W': -13, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.2T', pe: 36.9, revenueGrowth: 35, eps: 11.67, grossMargin: 62, dividendYield: 0.92,
      etfPresence: { AIS: 3.27, ARTY: false, BAI: 4.47, IVEP: false, IGPT: false, IVES: 4.88, ALAI: 5.54, CHAT: false, AIFD: 3.25, SPRX: false, AOTG: 7.22 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 6, avgWeight: 4.6, proScore: 2.51, coverage: 0.545,
      price: 284.86, weeklyPrices: [290.79, 301.65, 316.43, 263.47, 284.86], weeklyChange: -2.04, sortRank: 0, periodReturns: { '1M': 67.4, '6M': 209.6, '1Y': 312 },
      priceHistory: { '1W': [290.79, 301.65, 316.43, 263.47, 284.86], '1M': [170.13, 170.84, 164.5, 177.95, 182.58, 176.89, 168.93, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 204.83, 205, 219.43, 290.79, 301.65, 316.43, 263.47, 284.86], '6M': [92, 84.26, 84.8, 86.76, 84.64, 81.21, 83.1, 81.34, 74.21, 78.23, 79.48, 81.69, 89.57, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 164.31, 164.95, 170.13, 176.89, 196.33, 219.43, 284.86], '1Y': [69.14, 70.42, 75.21, 76.24, 72.26, 70.85, 71.99, 76.34, 76.63, 77.81, 72.07, 74.26, 62.31, 67.1, 70.98, 80.09, 84.07, 86.97, 86.22, 84.26, 88.46, 87.59, 89.33, 78.68, 83.43, 100.2, 88.9, 84.07, 87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 79.48, 81.69, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 164.95, 170.13, 176.89, 196.33, 219.43, 284.86] },
      velocityScore: { '1D': -5.3, '1W': 11.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$249B', pe: 98.2, revenueGrowth: 28, eps: 2.9, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { AIS: 4.4, ARTY: 8.64, BAI: 1.55, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.76, AIFD: 6.34, SPRX: 4.9, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 6, avgWeight: 2.17, proScore: 1.18, coverage: 0.545,
      price: 531.39, weeklyPrices: [563.10, 594.11, 575.50, 511.72, 531.39], weeklyChange: -5.63, sortRank: 0, periodReturns: { '1M': 10.7, '6M': 213, '1Y': 831.9 },
      priceHistory: { '1W': [563.1, 594.11, 575.5, 511.72, 531.39], '1M': [480, 515.83, 488.74, 494.09, 489.15, 482.02, 458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 531.39], '6M': [169.78, 172.04, 176.76, 176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 279.7, 245.25, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 484.28, 546.2, 531.39], '1Y': [57.02, 57.41, 62.07, 63.84, 64.64, 66.53, 67.06, 70.61, 75.84, 75.91, 75.86, 79.71, 86, 95.02, 100.94, 109.69, 120.06, 119.93, 113.13, 121.41, 124.92, 152.18, 169.99, 152.86, 155.41, 155.59, 169.54, 174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 431.52, 480, 482.02, 484.28, 546.2, 531.39] },
      velocityScore: { '1D': -4.1, '1W': -39.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$183B', pe: 31.8, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.12,
      etfPresence: { AIS: 1.52, ARTY: 2.61, BAI: 2.89, IVEP: false, IGPT: false, IVES: false, ALAI: 4.19, CHAT: 1.14, AIFD: false, SPRX: false, AOTG: 0.67 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 4.26, proScore: 1.94, coverage: 0.455,
      price: 247.61, weeklyPrices: [256.52, 250.02, 253.79, 246.03, 247.61], weeklyChange: -3.47, sortRank: 0, periodReturns: { '1M': -9.2, '6M': 9.1, '1Y': 14.1 },
      priceHistory: { '1W': [256.52, 250.02, 253.79, 246.03, 247.61], '1M': [272.68, 268.99, 265.82, 270.13, 267.22, 264.14, 264.86, 259.34, 265.01, 268.46, 266.32, 265.29, 271.85, 274, 270.64, 261.26, 256.52, 250.02, 253.79, 246.03, 247.61], '6M': [226.89, 222.54, 228.43, 232.53, 241.56, 236.65, 234.34, 241.73, 222.69, 199.6, 210.11, 210, 213.21, 209.53, 208.76, 207.54, 209.77, 238.38, 250.56, 263.99, 268.26, 272.68, 264.14, 266.32, 261.26, 247.61], '1Y': [216.98, 216.1, 212.77, 220.46, 222.54, 223.19, 227.47, 231.01, 213.75, 221.47, 228.01, 228.71, 225.99, 230.33, 231.62, 220.21, 219.57, 221.78, 216.39, 222.03, 229.25, 249.32, 249.1, 222.55, 229.67, 232.38, 227.92, 222.56, 232.14, 230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 210.11, 210, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 268.26, 272.68, 264.14, 266.32, 261.26, 247.61] },
      velocityScore: { '1D': 3.7, '1W': -32.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.7T', pe: 31.9, revenueGrowth: 17, eps: 7.77, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.43, ALAI: 5.92, CHAT: 3.24, AIFD: 3.58, SPRX: false, AOTG: 4.13 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.82, proScore: 1.74, coverage: 0.455,
      price: 412.66, weeklyPrices: [441.31, 427.34, 428.05, 416.67, 412.66], weeklyChange: -6.49, sortRank: 0, periodReturns: { '1M': -0.6, '6M': -16, '1Y': -12.7 },
      priceHistory: { '1W': [441.31, 427.34, 428.05, 416.67, 412.66], '1M': [415.12, 412.66, 407.77, 405.21, 409.43, 421.92, 423.54, 417.42, 421.06, 419.09, 418.57, 416.03, 412.67, 426.99, 450.24, 460.52, 441.31, 427.34, 428.05, 416.67, 412.66], '6M': [491.02, 474.82, 484.92, 487.48, 483.47, 459.38, 451.14, 433.5, 393.67, 401.84, 397.23, 392.74, 408.96, 401.86, 389.02, 365.97, 373.46, 370.87, 422.79, 424.62, 414.44, 415.12, 421.92, 418.57, 460.52, 412.66], '1Y': [472.75, 479.14, 490.11, 492.05, 503.51, 505.62, 505.27, 512.57, 527.75, 529.24, 509.77, 502.04, 505.35, 500.37, 510.02, 510.15, 517.95, 523.98, 513.57, 517.66, 542.07, 514.33, 508.68, 493.79, 476.99, 477.73, 492.02, 476.39, 486.85, 483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 397.23, 392.74, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 414.44, 415.12, 421.92, 418.57, 460.52, 412.66] },
      velocityScore: { '1D': 3.6, '1W': -33.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.1T', pe: 24.6, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 0.87,
      etfPresence: { AIS: false, ARTY: 1.83, BAI: false, IVEP: false, IGPT: false, IVES: 4.81, ALAI: 5.6, CHAT: 3.06, AIFD: false, SPRX: false, AOTG: 3.8 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 3.48, proScore: 1.58, coverage: 0.455,
      price: 587.35, weeklyPrices: [597.63, 622.98, 627.57, 593.00, 587.35], weeklyChange: -1.72, sortRank: 0, periodReturns: { '1M': -3.7, '6M': -11.9, '1Y': -15.4 },
      priceHistory: { '1W': [597.63, 622.98, 627.57, 593, 587.35], '1M': [609.63, 598.86, 603, 616.63, 618.43, 614.23, 611.21, 602.61, 605.06, 607.38, 610.26, 612.34, 635.26, 635.29, 632.51, 600.47, 597.63, 622.98, 627.57, 593, 587.35], '6M': [666.8, 647.51, 661.5, 665.95, 648.69, 615.52, 647.63, 738.31, 670.21, 649.81, 655.66, 648.18, 644.86, 638.18, 606.7, 547.54, 574.46, 629.86, 688.55, 675.03, 608.75, 609.63, 614.23, 610.26, 600.47, 587.35], '1Y': [694.06, 702.12, 712.2, 719.22, 732.78, 702.91, 704.81, 700, 763.46, 790, 751.48, 754.1, 737.05, 751.98, 775.72, 760.66, 734.38, 713.08, 708.65, 733.27, 751.44, 627.32, 627.08, 597.69, 636.22, 639.6, 656.96, 657.15, 664.94, 660.09, 646.06, 620.8, 658.76, 716.5, 661.46, 639.77, 655.66, 648.18, 644.86, 613.71, 593.66, 525.72, 573.02, 634.53, 670.91, 678.62, 608.75, 609.63, 614.23, 610.26, 600.47, 587.35] },
      velocityScore: { '1D': 0.6, '1W': -40.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 21.3, revenueGrowth: 33, eps: 27.52, grossMargin: 82, dividendYield: 0.35,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: 5, IVES: 4.54, ALAI: 4.28, CHAT: 2.42, AIFD: false, SPRX: false, AOTG: 1.18 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.19, proScore: 1.45, coverage: 0.455,
      price: 342.55, weeklyPrices: [355.76, 363.54, 358.05, 317.06, 342.55], weeklyChange: -3.71, sortRank: 0, periodReturns: { '1M': 71.5, '6M': 94.9, '1Y': 270.9 },
      priceHistory: { '1W': [355.76, 363.54, 358.05, 317.06, 342.55], '1M': [199.79, 207.35, 204.42, 224.09, 228.64, 232.68, 215.58, 244.26, 287.48, 297.84, 306.88, 318.72, 325.33, 349.17, 342.85, 320.09, 355.76, 363.54, 358.05, 317.06, 342.55], '6M': [175.74, 143.66, 172.62, 170.84, 165.77, 172.14, 176.35, 160.46, 142.82, 126.58, 129.68, 118.83, 119.2, 119.9, 126.16, 113.61, 117.14, 149.05, 174.05, 212.84, 202.68, 199.79, 232.68, 306.88, 320.09, 342.55], '1Y': [92.35, 95.3, 87.26, 88.66, 99.86, 91.94, 116.91, 118.41, 135.54, 192, 171.06, 178.56, 176.61, 230.37, 249.38, 205.27, 195.8, 212.1, 161.55, 157.51, 168.25, 179.31, 167.55, 139.52, 144.78, 152.5, 167.08, 144.94, 168.83, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 129.68, 118.83, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 202.68, 199.79, 232.68, 306.88, 320.09, 342.55] },
      velocityScore: { '1D': -1.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$59B', pe: 229.9, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 1.74, ARTY: 1.57, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 1.59, CHAT: 3.71, AIFD: false, SPRX: 7.36, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 5, avgWeight: 2.91, proScore: 1.32, coverage: 0.455,
      price: 306.1, weeklyPrices: [334.49, 331.44, 323.92, 300.51, 306.10], weeklyChange: -8.49, sortRank: 0, periodReturns: { '1M': -10, '6M': 64.9, '1Y': 173.3 },
      priceHistory: { '1W': [334.49, 331.44, 323.92, 300.51, 306.1], '1M': [339.97, 367.92, 367.13, 369.99, 376.23, 370.94, 339.73, 322.63, 315.67, 323.4, 327.46, 323.91, 319.78, 314.18, 315.71, 323.39, 334.49, 331.44, 323.92, 300.51, 306.1], '6M': [185.61, 161.74, 166.25, 164.34, 171.54, 170.86, 181.12, 195.1, 177.75, 236.51, 243.75, 254.89, 241.78, 265.38, 269.17, 252.4, 261.29, 295.11, 307.34, 323.46, 328.31, 339.97, 370.94, 327.46, 323.39, 306.1], '1Y': [112, 116.45, 122.32, 122.54, 128.37, 125.4, 125.29, 142.7, 138.76, 143.72, 129.05, 127.93, 125.59, 136.74, 136.83, 141.62, 150.86, 158.87, 175.15, 174.8, 190.57, 180.82, 179.05, 164.86, 169.57, 178.88, 178.38, 160.66, 166.26, 162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 243.75, 254.89, 241.78, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 328.31, 339.97, 370.94, 327.46, 323.39, 306.1] },
      velocityScore: { '1D': -0.8, '1W': -29.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$118B', pe: 77.1, revenueGrowth: 30, eps: 3.97, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.75, ARTY: false, BAI: 1.99, IVEP: 3.98, IGPT: false, IVES: false, ALAI: false, CHAT: 0.85, AIFD: 4, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 5, avgWeight: 1.54, proScore: 0.7, coverage: 0.455,
      price: 1639.48, weeklyPrices: [1716.36, 1831.50, 1759.68, 1559.32, 1639.48], weeklyChange: -4.48, sortRank: 0, periodReturns: { '1M': 4.9, '6M': 627.1, '1Y': 3820.3 },
      priceHistory: { '1W': [1716.36, 1831.5, 1759.68, 1559.32, 1639.48], '1M': [1562.34, 1547.56, 1452.02, 1447.23, 1382.72, 1407.61, 1333.01, 1383.29, 1392.56, 1542.24, 1478.69, 1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1639.48], '6M': [225.47, 201.87, 241.05, 240.22, 353.56, 387.81, 503.44, 539.3, 576.2, 630.29, 649.97, 635.36, 527.33, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 989.9, 1187, 1562.34, 1407.61, 1478.69, 1761.43, 1639.48], '1Y': [41.82, 44.21, 47.34, 44.96, 46.2, 41.36, 41.36, 42.93, 41.93, 46.83, 44.58, 47.35, 53.01, 73.92, 93.97, 99.83, 112.2, 120.95, 127.29, 149.29, 175.53, 194.57, 271.58, 244.93, 220.5, 194.38, 219.46, 209.31, 244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1187, 1562.34, 1407.61, 1478.69, 1761.43, 1639.48] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$243B', pe: 55.9, revenueGrowth: 251, eps: 29.32, grossMargin: 56, dividendYield: null,
      etfPresence: { AIS: 1.82, ARTY: false, BAI: 2.48, IVEP: false, IGPT: false, IVES: false, ALAI: 0.3, CHAT: 1.51, AIFD: false, SPRX: false, AOTG: 1.61 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'CRDO', name: 'Credo Technology Group Holding Ltd', easyScore: 5, avgWeight: 1.5, proScore: 0.68, coverage: 0.455,
      price: 221.85, weeklyPrices: [229.00, 214.60, 217.50, 206.89, 221.85], weeklyChange: -3.12, sortRank: 0, periodReturns: { '1M': 17.7, '6M': 24, '1Y': 212.1 },
      priceHistory: { '1W': [229, 214.6, 217.5, 206.89, 221.85], '1M': [188.51, 210.22, 198.57, 189.36, 184.54, 172.17, 156.27, 168.99, 182.98, 193.39, 218.41, 221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 221.85], '6M': [178.94, 142.02, 149.94, 144.92, 141, 156.84, 135.1, 129.47, 98.06, 121.78, 124.06, 112.27, 109.83, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 184.38, 188.51, 172.17, 218.41, 226.1, 221.85], '1Y': [71.09, 79.17, 91.92, 87.59, 97.59, 101.19, 92.93, 109.38, 110.29, 125.38, 106.3, 120.1, 124.77, 163.96, 164.44, 149.38, 145.61, 137.2, 129.75, 144.17, 162.18, 164.23, 158.5, 139.56, 154.18, 189.19, 170.29, 140.34, 147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.06, 112.27, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 184.38, 188.51, 172.17, 218.41, 226.1, 221.85] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$41B', pe: 121.9, revenueGrowth: 157, eps: 1.82, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: 0.73, ARTY: 1.11, BAI: 1.82, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.38, AIFD: false, SPRX: 2.48, AOTG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'ARM', name: 'ARM Holdings PLC', easyScore: 4, avgWeight: 3.77, proScore: 1.37, coverage: 0.364,
      price: 350.73, weeklyPrices: [402.71, 411.83, 393.44, 342.93, 350.73], weeklyChange: -12.91, sortRank: 0, periodReturns: { '1M': 64.5, '6M': 150.9, '1Y': 153 },
      priceHistory: { '1W': [402.71, 411.83, 393.44, 342.93, 350.73], '1M': [213.27, 212.65, 207.92, 221.21, 228.5, 209.16, 215.12, 223.15, 256.73, 298.23, 306.51, 321.22, 302.71, 335.27, 353.29, 408.85, 402.71, 411.83, 393.44, 342.93, 350.73], '6M': [139.78, 124.37, 113.29, 110.86, 115.68, 104.99, 119.2, 108.43, 110.88, 122.19, 125.58, 127.45, 114.38, 115.12, 129.82, 154.8, 149.11, 148.93, 166.73, 234.81, 211.18, 213.27, 209.16, 306.51, 408.85, 350.73], '1Y': [138.61, 142.04, 156.41, 156.33, 148.02, 153.9, 156.5, 163.47, 137.23, 142.39, 134.01, 140.26, 131.42, 154.14, 153.37, 144.3, 141.49, 159.35, 168.16, 169.38, 173.09, 160.73, 149.74, 136.04, 131.44, 139.19, 141.93, 121.1, 112.02, 109.31, 113.08, 105.11, 116.07, 105.36, 123.7, 125.28, 125.58, 127.45, 114.38, 115.75, 132.35, 144.13, 148.77, 157.58, 175.1, 215.88, 211.18, 213.27, 209.16, 306.51, 408.85, 350.73] },
      velocityScore: { '1D': -2.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$375B', pe: 407.8, revenueGrowth: 20, eps: 0.86, grossMargin: 98, dividendYield: null,
      etfPresence: { AIS: 2.17, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 0.47, CHAT: 4.3, AIFD: false, SPRX: 8.16, AOTG: false },
      tonyNote: 'Arm Holdings is held across Broad Tech and AI ETFs as the CPU architecture licensor embedded in every mobile device and increasingly in AI inference chips and data center CPUs. Revenue grew and the royalty model is high-margin; the weight score reflects consistent institutional positioning as the AI chip design ecosystem expands on Arm cores.',
    },
    {
      ticker: 'COHR', name: 'Coherent Corp', easyScore: 4, avgWeight: 3.77, proScore: 1.37, coverage: 0.364,
      price: 389.98, weeklyPrices: [426.89, 417.43, 421.90, 376.99, 389.98], weeklyChange: -8.65, sortRank: 0, periodReturns: { '1M': 16.3, '6M': 109.8, '1Y': 380.3 },
      priceHistory: { '1W': [426.89, 417.43, 421.9, 376.99, 389.98], '1M': [335.26, 379.69, 374.01, 403.71, 404.94, 382.45, 362.83, 353.63, 358.5, 378, 377.57, 381.35, 380.18, 376.95, 361.47, 362.9, 426.89, 417.43, 421.9, 376.99, 389.98], '6M': [185.86, 178.45, 190.98, 186.81, 191.62, 184.11, 202.72, 215.86, 209.24, 216.1, 248.18, 258.93, 235.72, 241.27, 275.57, 243.29, 258.16, 307.5, 345.02, 336.09, 329.5, 335.26, 382.45, 377.57, 362.9, 389.98], '1Y': [81.19, 80.76, 80.96, 86.64, 91.25, 97.82, 97.02, 106.98, 105.6, 116.56, 87.76, 91.58, 88.47, 103.49, 103.41, 106.52, 107.72, 113.56, 109.37, 120.79, 134.24, 128.7, 158.01, 138.15, 148.85, 170.96, 192.73, 175.2, 191.87, 184.57, 173.15, 195.96, 196.94, 212.18, 227.68, 217.23, 248.18, 258.93, 235.72, 242.76, 253.63, 243.48, 253.22, 307.93, 347.51, 321.53, 329.5, 335.26, 382.45, 377.57, 362.9, 389.98] },
      velocityScore: { '1D': -1.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$76B', pe: 184.8, revenueGrowth: 21, eps: 2.11, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 0.98, ARTY: false, BAI: false, IVEP: 4.02, IGPT: false, IVES: false, ALAI: false, CHAT: 0.99, AIFD: false, SPRX: 9.1, AOTG: false },
      tonyNote: 'Coherent Corp appears in 4 of 11 AI & ML ETFs (36% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 4, avgWeight: 3.42, proScore: 1.24, coverage: 0.364,
      price: 212, weeklyPrices: [244.58, 230.33, 236.34, 213.68, 212.00], weeklyChange: -13.32, sortRank: 0, periodReturns: { '1M': 8.2, '6M': -3.9, '1Y': 19.7 },
      priceHistory: { '1W': [244.58, 230.33, 236.34, 213.68, 212], '1M': [195.95, 193.84, 186.83, 189.76, 195.61, 192.95, 186.61, 181.46, 188.16, 189.77, 192.08, 193.06, 190.96, 203.7, 225.78, 248.15, 244.58, 230.33, 236.34, 213.68, 212], '6M': [220.54, 184.92, 198.38, 197.21, 192.84, 193.61, 178.18, 169.01, 136.48, 156.48, 148.08, 145.4, 152.96, 159.16, 155.52, 142.81, 146.38, 138.09, 175.06, 173.28, 171.83, 195.95, 192.95, 192.08, 248.15, 212], '1Y': [177.15, 211.1, 215.27, 218.96, 235.81, 241.3, 238.11, 249.98, 255.67, 253.86, 234.62, 234.21, 223.45, 328.33, 301.41, 308.46, 281.24, 284.24, 299, 275.15, 280.83, 248.17, 236.15, 220.49, 197.03, 207.73, 221.53, 188.65, 195.34, 194.91, 189.65, 189.85, 177.16, 164.58, 142.82, 160.14, 148.08, 145.4, 152.96, 155.11, 149.68, 139.66, 145.54, 155.62, 177.58, 172.96, 171.83, 195.95, 192.95, 192.08, 248.15, 212] },
      velocityScore: { '1D': -1.6, '1W': -39.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$610B', pe: 38, revenueGrowth: 22, eps: 5.58, grossMargin: 67, dividendYield: 0.94,
      etfPresence: { AIS: false, ARTY: 4.29, BAI: false, IVEP: false, IGPT: false, IVES: 4.28, ALAI: false, CHAT: 1.68, AIFD: false, SPRX: false, AOTG: 3.44 },
      tonyNote: 'Oracle lands in 3 AI ETFs on the strength of its cloud database and AI infrastructure contracts. Revenue grew 22%, 67% gross margin, P/E of 40x. The 17.5% weekly return following a major earnings beat shows how quickly sentiment can reprice; the weight score at 2.04% is still modest, meaning ETF managers have started building positions but conviction is not yet deep.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 4, avgWeight: 3.42, proScore: 1.25, coverage: 0.364,
      price: 872.47, weeklyPrices: [1029.15, 938.00, 945.08, 863.66, 872.47], weeklyChange: -15.22, sortRank: 0, periodReturns: { '1M': -3.5, '6M': 154.7, '1Y': 962.6 },
      priceHistory: { '1W': [1029.15, 938, 945.08, 863.66, 872.47], '1M': [903.8, 1053.09, 992.37, 1030.37, 1001.81, 970.7, 884.98, 890.09, 868.07, 964.5, 946.9, 910.81, 902.31, 860.62, 854.96, 905, 1029.15, 938, 945.08, 863.66, 872.47], '6M': [342.56, 334.69, 389.88, 371.18, 392.88, 331.62, 354.49, 381.44, 504.42, 583.46, 667.77, 700.91, 558.44, 616.09, 772.13, 688.8, 826.88, 897.3, 894.07, 881.64, 949.93, 903.8, 970.7, 946.9, 905, 872.47], '1Y': [82.11, 85.78, 91.81, 91.49, 90.44, 99.63, 99.63, 109.48, 108.15, 119.66, 117.96, 124.62, 134.12, 164.88, 163.34, 152.75, 162.71, 157.15, 156.78, 162.95, 198.39, 188.36, 252.47, 247.43, 291.27, 302.98, 360.33, 316.15, 387.41, 368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 667.77, 700.91, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 949.93, 903.8, 970.7, 946.9, 905, 872.47] },
      velocityScore: { '1D': -1.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$68B', pe: 153.1, revenueGrowth: 90, eps: 5.7, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.96, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.06, AIFD: 6.05, SPRX: 3.63, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 4 of 11 AI & ML ETFs (36% coverage) with average weight 3.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 5.84, proScore: 5.84, coverage: 1,
      price: 939.54, weeklyPrices: [1064.10, 1079.57, 996.00, 864.01, 939.54], weeklyChange: -11.71, sortRank: 0, periodReturns: { '1M': 25.8, '6M': 280.5, '1Y': 746.8 },
      priceHistory: { '1W': [1064.1, 1079.57, 996, 864.01, 939.54], '1M': [746.81, 795.33, 766.58, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 939.54], '6M': [246.92, 237.5, 276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 370.3, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 1035.5, 939.54], '1Y': [110.95, 119.84, 127.91, 120.89, 122.24, 116.43, 109.22, 111.96, 109.06, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 167.32, 185.69, 187.06, 202.29, 221.91, 218.03, 241.11, 228.5, 224.53, 234.16, 252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 542.21, 746.81, 724.66, 751, 1035.5, 939.54] },
      velocityScore: { '1D': -3.8, '1W': -14.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 44.4, revenueGrowth: 196, eps: 21.17, grossMargin: 58, dividendYield: 0.07,
      etfPresence: { SOXX: 10.89, PSI: 5.4, XSD: 3.29, DRAM: 3.79 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.94, proScore: 4.46, coverage: 0.75,
      price: 487.18, weeklyPrices: [521.54, 542.52, 523.20, 466.38, 487.18], weeklyChange: -6.59, sortRank: 0, periodReturns: { '1M': 7, '6M': 120.3, '1Y': 300.2 },
      priceHistory: { '1W': [521.54, 542.52, 523.2, 466.38, 487.18], '1M': [455.19, 458.79, 448.29, 445.5, 449.7, 424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 487.18], '6M': [221.11, 207.58, 214.95, 215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 192.43, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 510.13, 487.18], '1Y': [121.73, 126.39, 138.43, 136.11, 138.41, 160.08, 154.72, 177.44, 174.31, 174.95, 166.55, 166.62, 162.13, 159.54, 159.16, 160.88, 161.79, 211.51, 218.09, 238.03, 258.01, 250.05, 237.52, 230.29, 206.13, 217.6, 221.62, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 360.54, 455.19, 424.1, 467.51, 510.13, 487.18] },
      velocityScore: { '1D': -0.4, '1W': -26.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$794B', pe: 163.5, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 9.03, PSI: 5.18, XSD: 3.62, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.48, proScore: 3.36, coverage: 0.75,
      price: 108.77, weeklyPrices: [107.93, 112.71, 111.78, 99.17, 108.77], weeklyChange: 0.78, sortRank: 0, periodReturns: { '1M': -12.9, '6M': 169.9, '1Y': 431.1 },
      priceHistory: { '1W': [107.93, 112.71, 111.78, 99.17, 108.77], '1M': [124.92, 129.44, 120.61, 120.29, 115.93, 108.77, 108.17, 110.8, 118.96, 118.5, 119.84, 123.52, 121.77, 120.89, 114.68, 109.33, 107.93, 112.71, 111.78, 99.17, 108.77], '6M': [40.3, 37.51, 36.37, 37.3, 42.63, 48.72, 54.32, 48.66, 48.24, 46.48, 44.11, 45.61, 43.42, 45.25, 46.18, 44.1, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 108.77, 119.84, 109.33, 108.77], '1Y': [20.48, 20.74, 22.55, 22.85, 23.44, 22.69, 23.24, 20.41, 20.19, 21.81, 25.31, 24.35, 24, 24.77, 24.9, 31.22, 33.55, 37.17, 35.63, 38.12, 41.53, 37.03, 37.88, 34.33, 35.83, 43.76, 40.5, 37.31, 36.35, 36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 99.62, 124.92, 108.77, 119.84, 109.33, 108.77] },
      velocityScore: { '1D': -0.9, '1W': -2.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$547B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 5.65, PSI: 4.49, XSD: 3.3, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 4.38, proScore: 3.28, coverage: 0.75,
      price: 208.44, weeklyPrices: [222.82, 214.75, 218.66, 205.10, 208.44], weeklyChange: -6.45, sortRank: 0, periodReturns: { '1M': -3.1, '6M': 12.3, '1Y': 46.1 },
      priceHistory: { '1W': [222.82, 214.75, 218.66, 205.1, 208.44], '1M': [215.2, 219.44, 220.78, 225.83, 235.74, 225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.44], '6M': [185.55, 176.29, 183.69, 187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 177.19, 177.82, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 215.33, 224.36, 208.44], '1Y': [142.63, 144.69, 147.9, 153.3, 162.88, 171.37, 167.03, 175.51, 178.26, 183.16, 175.64, 181.77, 170.62, 177.33, 170.29, 176.97, 186.58, 185.04, 180.03, 181.16, 201.03, 198.69, 193.16, 181.36, 177.82, 179.59, 184.97, 177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.45, 215.2, 225.32, 215.33, 224.36, 208.44] },
      velocityScore: { '1D': 4.8, '1W': 2.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.0T', pe: 32, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.49,
      etfPresence: { SOXX: 6.02, PSI: 5.35, XSD: 1.76, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.43, proScore: 2.57, coverage: 0.75,
      price: 412.35, weeklyPrices: [423.20, 437.67, 428.76, 401.39, 412.35], weeklyChange: -2.56, sortRank: 0, periodReturns: { '1M': -1, '6M': 47.7, '1Y': 81.1 },
      priceHistory: { '1W': [423.2, 437.67, 428.76, 401.39, 412.35], '1M': [416.52, 422.73, 419.65, 432.39, 426.79, 417.49, 418.58, 414.31, 398.05, 384.21, 397.07, 419.94, 416.88, 419.01, 413.85, 402.69, 423.2, 437.67, 428.76, 401.39, 412.35], '6M': [279.13, 280.44, 275.82, 274.82, 292.89, 297.99, 308.52, 318.7, 322.12, 331.36, 355.03, 355.79, 315.81, 307.27, 310.44, 313.42, 318.34, 350.14, 371.45, 399.57, 397.69, 416.52, 417.49, 397.07, 402.69, 412.35], '1Y': [227.66, 231.8, 234.98, 240.64, 242.72, 240.61, 235.5, 230.75, 220.68, 232.04, 230.44, 255.63, 244.55, 247.21, 246.32, 248.61, 245.7, 233.75, 235.4, 246.37, 239.35, 229.38, 233.41, 230.13, 252.02, 278.24, 276.24, 278.4, 276.73, 271.2, 299.16, 302.1, 305.6, 310.88, 320.45, 337.1, 355.03, 355.79, 315.81, 306.07, 309.43, 307.44, 327.36, 350.01, 381.05, 392.59, 397.69, 416.52, 417.49, 397.07, 402.69, 412.35] },
      velocityScore: { '1D': 4.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$201B', pe: 61.5, revenueGrowth: 37, eps: 6.7, grossMargin: 64, dividendYield: 1.1,
      etfPresence: { SOXX: 2.93, PSI: 5.36, XSD: 2, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 6.51, proScore: 3.26, coverage: 0.5,
      price: 284.86, weeklyPrices: [290.79, 301.65, 316.43, 263.47, 284.86], weeklyChange: -2.04, sortRank: 0, periodReturns: { '1M': 67.4, '6M': 209.6, '1Y': 312 },
      priceHistory: { '1W': [290.79, 301.65, 316.43, 263.47, 284.86], '1M': [170.13, 170.84, 164.5, 177.95, 182.58, 176.89, 168.93, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 204.83, 205, 219.43, 290.79, 301.65, 316.43, 263.47, 284.86], '6M': [92, 84.26, 84.8, 86.76, 84.64, 81.21, 83.1, 81.34, 74.21, 78.23, 79.48, 81.69, 89.57, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 164.31, 164.95, 170.13, 176.89, 196.33, 219.43, 284.86], '1Y': [69.14, 70.42, 75.21, 76.24, 72.26, 70.85, 71.99, 76.34, 76.63, 77.81, 72.07, 74.26, 62.31, 67.1, 70.98, 80.09, 84.07, 86.97, 86.22, 84.26, 88.46, 87.59, 89.33, 78.68, 83.43, 100.2, 88.9, 84.07, 87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 79.48, 81.69, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 164.95, 170.13, 176.89, 196.33, 219.43, 284.86] },
      velocityScore: { '1D': -6.6, '1W': -3.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$249B', pe: 98.2, revenueGrowth: 28, eps: 2.9, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { SOXX: 8.38, PSI: false, XSD: 4.64, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 5.15, proScore: 2.58, coverage: 0.5,
      price: 481.76, weeklyPrices: [490.05, 500.77, 501.70, 453.01, 481.76], weeklyChange: -1.69, sortRank: 0, periodReturns: { '1M': 10.6, '6M': 79.7, '1Y': 183.7 },
      priceHistory: { '1W': [490.05, 500.77, 501.7, 453.01, 481.76], '1M': [435.44, 443.62, 431.2, 436.61, 440.56, 436.62, 413.57, 406.91, 426.85, 427.36, 432.16, 454.89, 448.25, 449.68, 450.06, 458.17, 490.05, 500.77, 501.7, 453.01, 481.76], '6M': [268.16, 261.27, 259.01, 259.97, 292.2, 301.89, 318.79, 341.34, 303.99, 328.39, 375.38, 372.3, 324.74, 337.27, 357.21, 338.55, 348.47, 399.49, 396.94, 417.04, 389.08, 435.44, 436.62, 432.16, 458.17, 481.76], '1Y': [169.79, 176.55, 180.18, 183.76, 195.39, 194.81, 187.14, 188.41, 179.15, 188.45, 162.22, 164.51, 156.25, 163.42, 178.13, 201.44, 204.74, 211.56, 218.19, 226, 227.64, 230.19, 228.67, 225.12, 242.46, 268.63, 267.14, 258.84, 260.23, 256.99, 281.64, 319.08, 322.38, 322.32, 322.51, 354.91, 375.38, 372.3, 324.74, 341.53, 357.06, 337.17, 352.62, 395.73, 391.62, 404.86, 389.08, 435.44, 436.62, 432.16, 458.17, 481.76] },
      velocityScore: { '1D': 0.8, '1W': -12.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$382B', pe: 45.2, revenueGrowth: 11, eps: 10.65, grossMargin: 49, dividendYield: 0.47,
      etfPresence: { SOXX: 4.72, PSI: 5.58, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 4.33, proScore: 2.17, coverage: 0.5,
      price: 2060.33, weeklyPrices: [2045.20, 2125.11, 2131.10, 1929.20, 2060.33], weeklyChange: 0.74, sortRank: 0, periodReturns: { '1M': 10.2, '6M': 68.2, '1Y': 148.4 },
      priceHistory: { '1W': [2045.2, 2125.11, 2131.1, 1929.2, 2060.33], '1M': [1869.19, 1845.19, 1811.35, 1849.71, 1892.94, 1804.32, 1756.45, 1740.58, 1829.47, 1842.18, 1888.38, 2011.39, 1957.19, 1927.63, 1921.71, 1940.04, 2045.2, 2125.11, 2131.1, 1929.2, 2060.33], '6M': [1224.59, 1225.11, 1265.66, 1243.65, 1359.69, 1434.5, 1500, 1684.71, 1331.03, 1450.85, 1496, 1524.55, 1344.55, 1409.57, 1511.52, 1451.13, 1516.84, 1737.28, 1791.44, 1935, 1726.26, 1869.19, 1804.32, 1888.38, 1940.04, 2060.33], '1Y': [829.29, 892.38, 889.03, 898.85, 923.18, 933.49, 892.22, 916.09, 883.41, 935.53, 876.08, 888.1, 843.9, 932.63, 989.87, 1068.67, 1078.6, 1084.74, 1025.71, 1147.43, 1206.04, 1193.49, 1190.9, 1123.09, 1145.89, 1211.75, 1225.61, 1223.37, 1268.75, 1215.08, 1324.6, 1544.96, 1512.78, 1427.94, 1442.95, 1464.13, 1496, 1524.55, 1344.55, 1418.64, 1498.67, 1443.21, 1540.06, 1768.78, 1805.32, 1900, 1726.26, 1869.19, 1804.32, 1888.38, 1940.04, 2060.33] },
      velocityScore: { '1D': 0.9, '1W': -15.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$269B', pe: 58.4, revenueGrowth: 12, eps: 35.3, grossMargin: 61, dividendYield: 0.48,
      etfPresence: { SOXX: 3.29, PSI: 5.37, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 4.31, proScore: 2.16, coverage: 0.5,
      price: 319.28, weeklyPrices: [334.41, 343.71, 336.41, 303.28, 319.28], weeklyChange: -4.52, sortRank: 0, periodReturns: { '1M': 8.6, '6M': 96.2, '1Y': 261.6 },
      priceHistory: { '1W': [334.41, 343.71, 336.41, 303.28, 319.28], '1M': [294.05, 296.05, 289.24, 295.44, 299.15, 284.72, 277.96, 273.38, 292.09, 302.24, 305.35, 322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 319.28], '6M': [162.74, 164.3, 175.26, 173.78, 203.08, 208.79, 220.7, 248.17, 213.31, 231.29, 244.92, 233.89, 199.33, 209.49, 233.99, 211.62, 218.44, 263.66, 267.6, 267.78, 256.72, 294.05, 284.72, 305.35, 317.12, 319.28], '1Y': [88.3, 93.41, 95.63, 96.81, 99.81, 100.37, 97.69, 98.94, 96.68, 105.28, 100.33, 103.63, 97.74, 107.36, 121.9, 128.32, 133.9, 140.35, 138.31, 145.04, 155.62, 155.78, 159.18, 143.24, 151.93, 159.75, 165.81, 163.26, 175.16, 171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 244.92, 233.89, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 256.72, 294.05, 284.72, 305.35, 317.12, 319.28] },
      velocityScore: { '1D': 0.5, '1W': -19.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$399B', pe: 60.5, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.34,
      etfPresence: { SOXX: 3.37, PSI: 5.26, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 4.04, proScore: 2.02, coverage: 0.5,
      price: 395.9, weeklyPrices: [481.57, 479.23, 418.91, 385.73, 395.90], weeklyChange: -17.79, sortRank: 0, periodReturns: { '1M': -7.9, '6M': -1.3, '1Y': 62.1 },
      priceHistory: { '1W': [481.57, 479.23, 418.91, 385.73, 395.9], '1M': [430, 428.43, 419.3, 416.79, 439.79, 425.19, 420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 395.9], '6M': [401.1, 339.81, 341.45, 349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 319.55, 330.48, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.14, 459.97, 395.9], '1Y': [244.28, 252.1, 263.77, 264.74, 277.9, 280.81, 278.59, 297.42, 292.93, 312.83, 294.91, 298.01, 302.39, 369.57, 346.17, 339.31, 329.91, 336.41, 344.13, 342.66, 372.97, 351.94, 351.96, 340.5, 385.03, 380.61, 406.29, 341.3, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 421.28, 430, 425.19, 414.14, 459.97, 395.9] },
      velocityScore: { '1D': 3.1, '1W': -47.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.9T', pe: 65.8, revenueGrowth: 48, eps: 6.02, grossMargin: 76, dividendYield: 0.67,
      etfPresence: { SOXX: 6.28, PSI: false, XSD: 1.8, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 3.25, proScore: 1.63, coverage: 0.5,
      price: 219.84, weeklyPrices: [240.84, 250.01, 242.57, 215.94, 219.84], weeklyChange: -8.72, sortRank: 0, periodReturns: { '1M': 0.3, '6M': 25.4, '1Y': 41.5 },
      priceHistory: { '1W': [240.84, 250.01, 242.57, 215.94, 219.84], '1M': [219.09, 237.53, 210.31, 213.17, 200.08, 201.49, 203.64, 195.61, 202.51, 213.41, 238.16, 248.82, 233.4, 243.29, 251.02, 228.99, 240.84, 250.01, 242.57, 215.94, 219.84], '6M': [175.31, 179.26, 174.22, 173.65, 180.19, 164.54, 157.8, 152.22, 136.3, 138.47, 142.88, 142.36, 135.69, 131.15, 131.28, 130.54, 126.8, 128.06, 136.2, 148.85, 177.01, 219.09, 201.49, 238.16, 228.99, 219.84], '1Y': [155.41, 156.87, 155.71, 159.4, 159.35, 154.07, 157.99, 162.08, 146.71, 153.73, 156.25, 159.17, 157.28, 158.95, 165.26, 173.55, 166.36, 165.46, 161.74, 168.83, 181.03, 172.84, 173.98, 165.06, 163.3, 175.07, 176, 176.12, 174.75, 171.05, 181.87, 161.39, 155.82, 151.59, 137.34, 140.7, 142.88, 142.36, 135.69, 129.82, 129.9, 127.11, 125.73, 131.24, 137.52, 150.26, 177.01, 219.09, 201.49, 238.16, 228.99, 219.84] },
      velocityScore: { '1D': 0, '1W': -35.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$232B', pe: 23.6, revenueGrowth: -4, eps: 9.31, grossMargin: 55, dividendYield: 1.7,
      etfPresence: { SOXX: 3.94, PSI: false, XSD: 2.56, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 3.18, proScore: 1.59, coverage: 0.5,
      price: 342.55, weeklyPrices: [355.76, 363.54, 358.05, 317.06, 342.55], weeklyChange: -3.71, sortRank: 0, periodReturns: { '1M': 71.5, '6M': 94.9, '1Y': 270.9 },
      priceHistory: { '1W': [355.76, 363.54, 358.05, 317.06, 342.55], '1M': [199.79, 207.35, 204.42, 224.09, 228.64, 232.68, 215.58, 244.26, 287.48, 297.84, 306.88, 318.72, 325.33, 349.17, 342.85, 320.09, 355.76, 363.54, 358.05, 317.06, 342.55], '6M': [175.74, 143.66, 172.62, 170.84, 165.77, 172.14, 176.35, 160.46, 142.82, 126.58, 129.68, 118.83, 119.2, 119.9, 126.16, 113.61, 117.14, 149.05, 174.05, 212.84, 202.68, 199.79, 232.68, 306.88, 320.09, 342.55], '1Y': [92.35, 95.3, 87.26, 88.66, 99.86, 91.94, 116.91, 118.41, 135.54, 192, 171.06, 178.56, 176.61, 230.37, 249.38, 205.27, 195.8, 212.1, 161.55, 157.51, 168.25, 179.31, 167.55, 139.52, 144.78, 152.5, 167.08, 144.94, 168.83, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 129.68, 118.83, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 202.68, 199.79, 232.68, 306.88, 320.09, 342.55] },
      velocityScore: { '1D': -0.6, '1W': -30.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$59B', pe: 229.9, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.31, PSI: false, XSD: 4.05, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 2.89, proScore: 1.44, coverage: 0.5,
      price: 290.76, weeklyPrices: [308.12, 308.59, 305.37, 285.06, 290.76], weeklyChange: -5.63, sortRank: 0, periodReturns: { '1M': 1, '6M': 60.7, '1Y': 46 },
      priceHistory: { '1W': [308.12, 308.59, 305.37, 285.06, 290.76], '1M': [287.8, 297.76, 295.17, 306.34, 308.17, 302.73, 300.6, 302.31, 304.88, 298.39, 309.21, 324.89, 317.45, 315.95, 305.68, 293.2, 308.12, 308.59, 305.37, 285.06, 290.76], '6M': [180.94, 177.97, 178.82, 175.42, 185.71, 193.45, 194.99, 218.97, 223.98, 223, 219.73, 212.11, 193.23, 190.05, 188.29, 193.41, 194.87, 214.73, 229.82, 277.14, 281.02, 287.8, 302.73, 309.21, 293.2, 290.76], '1Y': [199.21, 199.22, 205.81, 210.45, 216.39, 216.64, 214.92, 191.38, 185.4, 192.97, 195.94, 205.98, 195.74, 184.01, 180.3, 184.44, 183.73, 177.05, 173.94, 180.84, 166.91, 159.36, 159.73, 157.32, 161.77, 182.6, 179.52, 177.56, 177.08, 173.49, 188.45, 189.12, 193.31, 215.55, 221.44, 226.16, 219.73, 212.11, 193.23, 190.78, 187.19, 190.33, 199.42, 216.71, 233.7, 269.5, 281.02, 287.8, 302.73, 309.21, 293.2, 290.76] },
      velocityScore: { '1D': 4.3, '1W': -52.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$265B', pe: 49.8, revenueGrowth: 19, eps: 5.84, grossMargin: 57, dividendYield: 1.99,
      etfPresence: { SOXX: 3.49, PSI: false, XSD: 2.29, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.87, proScore: 1.44, coverage: 0.5,
      price: 303.65, weeklyPrices: [323.62, 321.88, 322.22, 295.96, 303.65], weeklyChange: -6.17, sortRank: 0, periodReturns: { '1M': 3, '6M': 32.6, '1Y': 42.5 },
      priceHistory: { '1W': [323.62, 321.88, 322.22, 295.96, 303.65], '1M': [294.75, 305.99, 294.23, 298.41, 294.17, 291.5, 291.68, 294.28, 310.15, 299.38, 316.47, 332.67, 329.24, 330.28, 321.35, 311.38, 323.62, 321.88, 322.22, 295.96, 303.65], '6M': [229.01, 231.83, 228.94, 219.98, 239.34, 240.81, 236.75, 233.5, 222.13, 242.19, 232.27, 227.01, 201.74, 191.22, 192.35, 196.92, 194.55, 204.37, 216.03, 244.04, 295.24, 294.75, 291.5, 316.47, 311.38, 303.65], '1Y': [213.08, 217.53, 218.51, 221.21, 230.42, 220.58, 228, 226.74, 208.47, 220.05, 229.27, 237.82, 228.2, 219.28, 221.89, 227.66, 227.73, 219.58, 216.11, 222.34, 212.96, 204.42, 202.86, 188.59, 191.02, 227.56, 228.05, 229.75, 225.98, 217.06, 237.89, 238.6, 232.48, 226.14, 224.32, 244.43, 232.27, 227.01, 201.74, 190.86, 191.37, 191.66, 197.08, 208, 221.34, 236.87, 295.24, 294.75, 291.5, 316.47, 311.38, 303.65] },
      velocityScore: { '1D': 2.9, '1W': -30.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$77B', pe: 29.1, revenueGrowth: 12, eps: 10.45, grossMargin: 56, dividendYield: 1.37,
      etfPresence: { SOXX: 3.39, PSI: false, XSD: 2.36, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 2.81, proScore: 1.4, coverage: 0.5,
      price: 122.24, weeklyPrices: [128.64, 133.93, 131.82, 117.26, 122.24], weeklyChange: -4.98, sortRank: 0, periodReturns: { '1M': 18.4, '6M': 116.8, '1Y': 133.4 },
      priceHistory: { '1W': [128.64, 133.93, 131.82, 117.26, 122.24], '1M': [103.2, 107.24, 104.11, 115.71, 118.37, 113.11, 109.43, 106.02, 110.21, 109.61, 116.2, 127, 124.89, 123.77, 120.62, 120.92, 128.64, 133.93, 131.82, 117.26, 122.24], '6M': [56.38, 55.09, 56.37, 54.24, 61.89, 60.58, 63.07, 62.2, 63.1, 70.63, 69.11, 66.48, 56.87, 57.69, 59.29, 60.87, 62.19, 68.65, 83.01, 98.4, 103.03, 103.2, 113.11, 116.2, 120.92, 122.24], '1Y': [52.38, 53.88, 54.21, 53.6, 57.77, 59.52, 62.45, 58.38, 47.24, 50.01, 49.77, 50.99, 47.79, 48.13, 49.8, 50.94, 49.31, 48.17, 49.54, 55.08, 51.8, 48.28, 48.43, 45.56, 48.31, 57.15, 55.23, 54.56, 55.69, 54.15, 60.89, 60.28, 61.98, 59.89, 65.2, 72.21, 69.11, 66.48, 56.87, 58.55, 59.26, 58.35, 63.49, 71.02, 85.56, 98.04, 103.03, 103.2, 113.11, 116.2, 120.92, 122.24] },
      velocityScore: { '1D': -0.7, '1W': -27.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$48B', pe: 89.9, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.47, PSI: false, XSD: 3.15, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.78, proScore: 1.39, coverage: 0.5,
      price: 1534.85, weeklyPrices: [1624.99, 1689.89, 1652.60, 1481.05, 1534.85], weeklyChange: -5.55, sortRank: 0, periodReturns: { '1M': -4.1, '6M': 56, '1Y': 117.3 },
      priceHistory: { '1W': [1624.99, 1689.89, 1652.6, 1481.05, 1534.85], '1M': [1600.84, 1661.1, 1599.52, 1650.35, 1613.97, 1550.02, 1486.33, 1468.11, 1553.27, 1561.25, 1589.81, 1662.98, 1620.17, 1633.17, 1566.21, 1542.39, 1624.99, 1689.89, 1652.6, 1481.05, 1534.85], '6M': [983.58, 949.4, 945.16, 923.91, 959.08, 983.6, 1076.67, 1183.15, 1155.99, 1155.93, 1204.1, 1142.74, 1023.16, 1033.88, 1092.69, 1058.28, 1118.49, 1353.85, 1468.35, 1632.06, 1583.48, 1600.84, 1550.02, 1589.81, 1542.39, 1534.85], '1Y': [706.28, 706.59, 716.58, 746.97, 751.14, 714.03, 719.98, 724.37, 802.78, 840.56, 844.8, 850.64, 827.56, 855.18, 877.66, 908.45, 920.64, 945.49, 968.25, 1028.67, 1086.36, 957.87, 954.71, 856.96, 908.61, 958.02, 962.95, 951.36, 943.55, 906.36, 959.09, 1009.54, 1063.74, 1124.15, 1229.82, 1171.47, 1204.1, 1142.74, 1023.16, 1052.59, 1068.85, 1053.01, 1180.03, 1372.23, 1490.86, 1587.57, 1583.48, 1600.84, 1550.02, 1589.81, 1542.39, 1534.85] },
      velocityScore: { '1D': 0, '1W': -29.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$75B', pe: 110.3, revenueGrowth: 26, eps: 13.92, grossMargin: 55, dividendYield: 0.54,
      etfPresence: { SOXX: 3.37, PSI: false, XSD: 2.2, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.33, proScore: 1.17, coverage: 0.5,
      price: 90.96, weeklyPrices: [96.96, 96.55, 96.30, 88.34, 90.96], weeklyChange: -6.19, sortRank: 0, periodReturns: { '1M': -8.2, '6M': 35.1, '1Y': 33.7 },
      priceHistory: { '1W': [96.96, 96.55, 96.3, 88.34, 90.96], '1M': [99.09, 99.03, 97.7, 96.71, 97.04, 93.85, 92.76, 91.81, 94.02, 91.11, 93.43, 98.05, 96.85, 96.04, 94.65, 91.52, 96.96, 96.55, 96.3, 88.34, 90.96], '6M': [67.35, 67.18, 66.24, 64.68, 73.94, 74.68, 75.47, 79.36, 78.04, 78.92, 77.73, 74.64, 64.77, 62.73, 63.29, 64.2, 65.6, 71.56, 78.76, 89.44, 93.95, 99.09, 93.85, 93.43, 91.52, 90.96], '1Y': [68.05, 68.19, 70.43, 71.68, 74.68, 74.43, 75.26, 70.68, 67.13, 64.5, 64.71, 67.62, 63.28, 64.74, 65.78, 65.85, 64.22, 64.96, 64.6, 67.52, 63.64, 59.5, 54.71, 50.87, 51.83, 63.61, 66.85, 65.9, 65.35, 63.72, 73.53, 74.45, 74.71, 75.92, 76.01, 78.56, 77.73, 74.64, 64.77, 61.94, 62.97, 62, 67.22, 73.55, 80.39, 86.84, 93.95, 99.09, 93.85, 93.43, 91.52, 90.96] },
      velocityScore: { '1D': 3.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$49B', pe: 413.5, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 2.06,
      etfPresence: { SOXX: 2.52, PSI: false, XSD: 2.14, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.32, proScore: 1.16, coverage: 0.5,
      price: 221.85, weeklyPrices: [229.00, 214.60, 217.50, 206.89, 221.85], weeklyChange: -3.12, sortRank: 0, periodReturns: { '1M': 17.7, '6M': 24, '1Y': 212.1 },
      priceHistory: { '1W': [229, 214.6, 217.5, 206.89, 221.85], '1M': [188.51, 210.22, 198.57, 189.36, 184.54, 172.17, 156.27, 168.99, 182.98, 193.39, 218.41, 221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 221.85], '6M': [178.94, 142.02, 149.94, 144.92, 141, 156.84, 135.1, 129.47, 98.06, 121.78, 124.06, 112.27, 109.83, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 184.38, 188.51, 172.17, 218.41, 226.1, 221.85], '1Y': [71.09, 79.17, 91.92, 87.59, 97.59, 101.19, 92.93, 109.38, 110.29, 125.38, 106.3, 120.1, 124.77, 163.96, 164.44, 149.38, 145.61, 137.2, 129.75, 144.17, 162.18, 164.23, 158.5, 139.56, 154.18, 189.19, 170.29, 140.34, 147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.06, 112.27, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 184.38, 188.51, 172.17, 218.41, 226.1, 221.85] },
      velocityScore: { '1D': 6.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$41B', pe: 121.9, revenueGrowth: 157, eps: 1.82, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 1.8, PSI: false, XSD: 2.85, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.86, proScore: 0.93, coverage: 0.5,
      price: 359.38, weeklyPrices: [382.35, 390.34, 382.74, 345.40, 359.38], weeklyChange: -6.01, sortRank: 0, periodReturns: { '1M': -0.1, '6M': 93.7, '1Y': 184.5 },
      priceHistory: { '1W': [382.35, 390.34, 382.74, 345.4, 359.38], '1M': [359.88, 365.88, 362.76, 381.55, 383.56, 375.6, 356.25, 358.98, 375.71, 380.45, 385.98, 409.68, 400.66, 391.09, 364.64, 353.79, 382.35, 390.34, 382.74, 345.4, 359.38], '6M': [185.54, 175.29, 175.19, 174.87, 170.62, 215.01, 224.29, 227.73, 227.8, 238.99, 243.59, 248.12, 207.51, 215.94, 224.54, 228.5, 238.3, 258.11, 276.97, 287.64, 284.18, 359.88, 375.6, 385.98, 353.79, 359.38], '1Y': [126.3, 131.18, 139.84, 137.38, 139.85, 137.76, 136.76, 140.02, 137.28, 125.45, 121, 128.33, 130.17, 131.7, 131.87, 126.66, 124.49, 127.97, 131.54, 139.41, 147.88, 144.13, 169.98, 158.22, 165.88, 183.46, 188.08, 175.69, 176.28, 171.28, 167.66, 218.93, 219.26, 219.06, 235.87, 244.16, 243.59, 248.12, 207.51, 217.8, 218.96, 225.44, 233.04, 263.63, 281.08, 279.44, 284.18, 359.88, 375.6, 385.98, 353.79, 359.38] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$27B', pe: 152.9, revenueGrowth: 23, eps: 2.35, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.25, PSI: false, XSD: 2.47, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RMBS', name: 'RAMBUS INC', easyScore: 2, avgWeight: 1.67, proScore: 0.83, coverage: 0.5,
      price: 151.52, weeklyPrices: [166.78, 170.66, 169.35, 145.31, 151.52], weeklyChange: -9.15, sortRank: 0, periodReturns: { '1M': 17.2, '6M': 45.6, '1Y': 156.7 },
      priceHistory: { '1W': [166.78, 170.66, 169.35, 145.31, 151.52], '1M': [129.25, 134.51, 130.28, 134.85, 130.46, 127.05, 123.76, 122.03, 133.56, 141.82, 142.98, 157.23, 148.66, 148.02, 145.46, 147.48, 166.78, 170.66, 169.35, 145.31, 151.52], '6M': [104.07, 95.45, 95.26, 94.69, 91.65, 100.62, 124.77, 121.6, 98.1, 95.8, 102.64, 99.66, 88.12, 89.78, 94.62, 91.44, 93.03, 110.44, 126.93, 158.4, 111.93, 129.25, 127.05, 142.98, 147.48, 151.52], '1Y': [59.03, 60.37, 62.3, 64.14, 64.79, 66.79, 66.61, 73.15, 73.79, 76.44, 69.78, 75.03, 73.67, 77.11, 97.52, 100.73, 104.2, 96.84, 94.85, 97.51, 103.72, 100.32, 104.93, 87.7, 92.45, 98.03, 104.71, 94.69, 94.19, 91.89, 91.34, 103.07, 115.31, 113.83, 107.1, 101.95, 102.64, 99.66, 88.12, 94.01, 91.7, 89.73, 92.22, 113.16, 126.87, 141.31, 111.93, 129.25, 127.05, 142.98, 147.48, 151.52] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$16B', pe: 71.8, revenueGrowth: 8, eps: 2.11, grossMargin: 80, dividendYield: null,
      etfPresence: { SOXX: 0.84, PSI: false, XSD: 2.5, DRAM: false },
      tonyNote: 'RAMBUS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 7, avgWeight: 4.46, proScore: 2.4, coverage: 0.538,
      price: 939.54, weeklyPrices: [1064.10, 1079.57, 996.00, 864.01, 939.54], weeklyChange: -11.71, sortRank: 0, periodReturns: { '1M': 25.8, '6M': 280.5, '1Y': 746.8 },
      priceHistory: { '1W': [1064.1, 1079.57, 996, 864.01, 939.54], '1M': [746.81, 795.33, 766.58, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 939.54], '6M': [246.92, 237.5, 276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 370.3, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 1035.5, 939.54], '1Y': [110.95, 119.84, 127.91, 120.89, 122.24, 116.43, 109.22, 111.96, 109.06, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 167.32, 185.69, 187.06, 202.29, 221.91, 218.03, 241.11, 228.5, 224.53, 234.16, 252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 542.21, 746.81, 724.66, 751, 1035.5, 939.54] },
      velocityScore: { '1D': -4, '1W': -10.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 44.4, revenueGrowth: 196, eps: 21.17, grossMargin: 58, dividendYield: 0.07,
      etfPresence: { PTF: 4.49, WCLD: false, IGV: false, FDTX: 9.36, GTEK: false, ARKK: false, MARS: false, FRWD: 4.48, BCTK: 4.53, FWD: 1.47, CBSE: 2.81, FCUS: 4.05, WGMI: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 7, avgWeight: 4.24, proScore: 2.28, coverage: 0.538,
      price: 208.44, weeklyPrices: [222.82, 214.75, 218.66, 205.10, 208.44], weeklyChange: -6.45, sortRank: 0, periodReturns: { '1M': -3.1, '6M': 12.3, '1Y': 46.1 },
      priceHistory: { '1W': [222.82, 214.75, 218.66, 205.1, 208.44], '1M': [215.2, 219.44, 220.78, 225.83, 235.74, 225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.44], '6M': [185.55, 176.29, 183.69, 187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 177.19, 177.82, 183.14, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 215.33, 224.36, 208.44], '1Y': [142.63, 144.69, 147.9, 153.3, 162.88, 171.37, 167.03, 175.51, 178.26, 183.16, 175.64, 181.77, 170.62, 177.33, 170.29, 176.97, 186.58, 185.04, 180.03, 181.16, 201.03, 198.69, 193.16, 181.36, 177.82, 179.59, 184.97, 177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.45, 215.2, 225.32, 215.33, 224.36, 208.44] },
      velocityScore: { '1D': 0, '1W': -48.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.0T', pe: 32, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.49,
      etfPresence: { PTF: 4.55, WCLD: false, IGV: false, FDTX: 4.62, GTEK: false, ARKK: 1.74, MARS: false, FRWD: 8.16, BCTK: 6.56, FWD: 1.95, CBSE: false, FCUS: false, WGMI: 2.09 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 5, avgWeight: 4.98, proScore: 1.91, coverage: 0.385,
      price: 873.48, weeklyPrices: [926.61, 940.69, 925.99, 847.47, 873.48], weeklyChange: -5.73, sortRank: 0, periodReturns: { '1M': 11.6, '6M': 206, '1Y': 571 },
      priceHistory: { '1W': [926.61, 940.69, 925.99, 847.47, 873.48], '1M': [782.64, 834.01, 808.8, 817.35, 804.76, 795.47, 740.84, 733.35, 751.07, 810.46, 812.73, 845.76, 870.66, 880.72, 879.8, 921.26, 926.61, 940.69, 925.99, 847.47, 873.48], '6M': [285.41, 285.58, 282.85, 280.08, 308.26, 312.28, 346.53, 446.57, 405.45, 431.17, 411.11, 407.84, 352.8, 373.98, 434.6, 378.79, 429.36, 503.13, 547.75, 586.25, 726.93, 782.64, 795.47, 812.73, 921.26, 873.48], '1Y': [130.17, 131.04, 136.31, 145.04, 142.01, 147.12, 146.59, 152.68, 151.74, 155.59, 157.93, 165.24, 176.32, 193.04, 213.36, 223.7, 236.06, 225.01, 211.63, 214.57, 223, 250.38, 288, 253.86, 261.89, 258.67, 282.86, 288.13, 282.8, 275.39, 284.47, 320.32, 346.1, 407.69, 429.32, 425.99, 411.11, 407.84, 352.8, 383.71, 411.23, 380.07, 453.3, 513.28, 539.75, 595.86, 726.93, 782.64, 795.47, 812.73, 921.26, 873.48] },
      velocityScore: { '1D': -4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$198B', pe: 83.1, revenueGrowth: 44, eps: 10.51, grossMargin: 42, dividendYield: 0.35,
      etfPresence: { PTF: 4.75, WCLD: false, IGV: false, FDTX: 4.04, GTEK: false, ARKK: false, MARS: false, FRWD: 9.13, BCTK: false, FWD: false, CBSE: 2.72, FCUS: 4.25, WGMI: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 5, avgWeight: 4.42, proScore: 1.7, coverage: 0.385,
      price: 487.18, weeklyPrices: [521.54, 542.52, 523.20, 466.38, 487.18], weeklyChange: -6.59, sortRank: 0, periodReturns: { '1M': 7, '6M': 120.3, '1Y': 300.2 },
      priceHistory: { '1W': [521.54, 542.52, 523.2, 466.38, 487.18], '1M': [455.19, 458.79, 448.29, 445.5, 449.7, 424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 487.18], '6M': [221.11, 207.58, 214.95, 215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 192.43, 197.74, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 510.13, 487.18], '1Y': [121.73, 126.39, 138.43, 136.11, 138.41, 160.08, 154.72, 177.44, 174.31, 174.95, 166.55, 166.62, 162.13, 159.54, 159.16, 160.88, 161.79, 211.51, 218.09, 238.03, 258.01, 250.05, 237.52, 230.29, 206.13, 217.6, 221.62, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 360.54, 455.19, 424.1, 467.51, 510.13, 487.18] },
      velocityScore: { '1D': 18.1, '1W': -12.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$794B', pe: 163.5, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.66, MARS: false, FRWD: 7.63, BCTK: 3.81, FWD: 2.74, CBSE: false, FCUS: 3.25, WGMI: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 5, avgWeight: 3.37, proScore: 1.3, coverage: 0.385,
      price: 395.9, weeklyPrices: [481.57, 479.23, 418.91, 385.73, 395.90], weeklyChange: -17.79, sortRank: 0, periodReturns: { '1M': -7.9, '6M': -1.3, '1Y': 62.1 },
      priceHistory: { '1W': [481.57, 479.23, 418.91, 385.73, 395.9], '1M': [430, 428.43, 419.3, 416.79, 439.79, 425.19, 420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 395.9], '6M': [401.1, 339.81, 341.45, 349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 319.55, 330.48, 335.97, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.14, 459.97, 395.9], '1Y': [244.28, 252.1, 263.77, 264.74, 277.9, 280.81, 278.59, 297.42, 292.93, 312.83, 294.91, 298.01, 302.39, 369.57, 346.17, 339.31, 329.91, 336.41, 344.13, 342.66, 372.97, 351.94, 351.96, 340.5, 385.03, 380.61, 406.29, 341.3, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 421.28, 430, 425.19, 414.14, 459.97, 395.9] },
      velocityScore: { '1D': -7.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.9T', pe: 65.8, revenueGrowth: 48, eps: 6.02, grossMargin: 76, dividendYield: 0.67,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.79, GTEK: false, ARKK: 1.17, MARS: false, FRWD: 4.25, BCTK: 7.5, FWD: 3.16, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 5, avgWeight: 3.17, proScore: 1.22, coverage: 0.385,
      price: 247.61, weeklyPrices: [256.52, 250.02, 253.79, 246.03, 247.61], weeklyChange: -3.47, sortRank: 0, periodReturns: { '1M': -9.2, '6M': 9.1, '1Y': 14.1 },
      priceHistory: { '1W': [256.52, 250.02, 253.79, 246.03, 247.61], '1M': [272.68, 268.99, 265.82, 270.13, 267.22, 264.14, 264.86, 259.34, 265.01, 268.46, 266.32, 265.29, 271.85, 274, 270.64, 261.26, 256.52, 250.02, 253.79, 246.03, 247.61], '6M': [226.89, 222.54, 228.43, 232.53, 241.56, 236.65, 234.34, 241.73, 222.69, 199.6, 210.11, 210, 213.21, 209.53, 208.76, 207.54, 209.77, 238.38, 250.56, 263.99, 268.26, 272.68, 264.14, 266.32, 261.26, 247.61], '1Y': [216.98, 216.1, 212.77, 220.46, 222.54, 223.19, 227.47, 231.01, 213.75, 221.47, 228.01, 228.71, 225.99, 230.33, 231.62, 220.21, 219.57, 221.78, 216.39, 222.03, 229.25, 249.32, 249.1, 222.55, 229.67, 232.38, 227.92, 222.56, 232.14, 230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 210.11, 210, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 268.26, 272.68, 264.14, 266.32, 261.26, 247.61] },
      velocityScore: { '1D': 0.8, '1W': -72.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.7T', pe: 31.9, revenueGrowth: 17, eps: 7.77, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.01, GTEK: false, ARKK: 2.61, MARS: false, FRWD: 3.45, BCTK: 4.47, FWD: 1.31, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 4, avgWeight: 5.38, proScore: 1.65, coverage: 0.308,
      price: 430.42, weeklyPrices: [446.69, 436.69, 444.92, 415.17, 430.42], weeklyChange: -3.64, sortRank: 0, periodReturns: { '1M': 4.6, '6M': 42.6, '1Y': 107.9 },
      priceHistory: { '1W': [446.69, 436.69, 444.92, 415.17, 430.42], '1M': [411.68, 404.54, 397.28, 399.8, 417.72, 404.35, 395.95, 392.61, 401.62, 407.15, 404.52, 412.32, 422.73, 424.86, 418.45, 435.63, 446.69, 436.69, 444.92, 415.17, 430.42], '6M': [301.87, 287.74, 293.28, 299.58, 318.68, 327.11, 327.37, 339.55, 330.73, 368.1, 370.54, 374.58, 338.89, 336.71, 338.79, 326.11, 339.04, 370.6, 370.5, 402.46, 397.67, 411.68, 404.35, 404.52, 435.63, 430.42], '1Y': [207, 215.68, 220.09, 224.68, 231.84, 237.56, 234.6, 241.33, 232.47, 244.29, 232.7, 238.72, 231.39, 260.44, 262.79, 280.71, 279.29, 294.03, 295.94, 294.51, 301.53, 294.05, 291.17, 277.91, 284.68, 295.45, 303.41, 286.87, 296.95, 303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.54, 374.58, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 397.67, 411.68, 404.35, 404.52, 435.63, 430.42] },
      velocityScore: { '1D': -1.8, '1W': -13.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.2T', pe: 36.9, revenueGrowth: 35, eps: 11.67, grossMargin: 62, dividendYield: 0.92,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6, GTEK: false, ARKK: 0.99, MARS: false, FRWD: 5.93, BCTK: 8.58, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 4, avgWeight: 4.59, proScore: 1.41, coverage: 0.308,
      price: 531.39, weeklyPrices: [563.10, 594.11, 575.50, 511.72, 531.39], weeklyChange: -5.63, sortRank: 0, periodReturns: { '1M': 10.7, '6M': 213, '1Y': 831.9 },
      priceHistory: { '1W': [563.1, 594.11, 575.5, 511.72, 531.39], '1M': [480, 515.83, 488.74, 494.09, 489.15, 482.02, 458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 531.39], '6M': [169.78, 172.04, 176.76, 176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 279.7, 245.25, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 484.28, 546.2, 531.39], '1Y': [57.02, 57.41, 62.07, 63.84, 64.64, 66.53, 67.06, 70.61, 75.84, 75.91, 75.86, 79.71, 86, 95.02, 100.94, 109.69, 120.06, 119.93, 113.13, 121.41, 124.92, 152.18, 169.99, 152.86, 155.41, 155.59, 169.54, 174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 431.52, 480, 482.02, 484.28, 546.2, 531.39] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$183B', pe: 31.8, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.12,
      etfPresence: { PTF: 4.71, WCLD: false, IGV: false, FDTX: 4, GTEK: false, ARKK: false, MARS: false, FRWD: 5.42, BCTK: false, FWD: false, CBSE: false, FCUS: 4.23, WGMI: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 3, proScore: 0.92, coverage: 0.308,
      price: 111.56, weeklyPrices: [117.01, 112.94, 116.04, 109.54, 111.56], weeklyChange: -4.65, sortRank: 0, periodReturns: { '1M': 1, '6M': -29.6, '1Y': 3.5 },
      priceHistory: { '1W': [117.01, 112.94, 116.04, 109.54, 111.56], '1M': [110.41, 102.54, 99.84, 95.4, 97.42, 100.28, 102.39, 101.01, 105.01, 104.86, 103, 104.9, 106.6, 115.03, 118.71, 124.12, 117.01, 112.94, 116.04, 109.54, 111.56], '6M': [158.41, 159.85, 169.67, 163.74, 166.74, 157.51, 137.64, 143.64, 111.24, 110.66, 126.2, 120.73, 130.2, 126.17, 122.37, 115.43, 118.25, 110.79, 131.15, 125.83, 127.67, 110.41, 100.28, 103, 124.12, 111.56], '1Y': [107.8, 108.37, 114.42, 112.67, 114.32, 120, 123.71, 124.85, 127, 149.3, 139.25, 140.85, 140.22, 142.2, 147.87, 148.83, 148.61, 161.28, 152.88, 162.64, 178.96, 160.94, 158.94, 140.45, 157.37, 160, 159.89, 163.14, 169.53, 160.97, 168.28, 157.99, 137.89, 131.23, 112.05, 112.7, 126.2, 120.73, 130.2, 122.96, 116.78, 111.85, 118.8, 114.97, 135.14, 124.23, 127.67, 110.41, 100.28, 103, 124.12, 111.56] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$145B', pe: 109.4, revenueGrowth: 34, eps: 1.02, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.89, GTEK: false, ARKK: 4.42, MARS: false, FRWD: 1.97, BCTK: 2.7, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 13 Broad Tech ETFs (31% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'Marvell Technology Inc', easyScore: 3, avgWeight: 5.23, proScore: 1.21, coverage: 0.231,
      price: 284.86, weeklyPrices: [290.79, 301.65, 316.43, 263.47, 284.86], weeklyChange: -2.04, sortRank: 0, periodReturns: { '1M': 67.4, '6M': 209.6, '1Y': 312 },
      priceHistory: { '1W': [290.79, 301.65, 316.43, 263.47, 284.86], '1M': [170.13, 170.84, 164.5, 177.95, 182.58, 176.89, 168.93, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 204.83, 205, 219.43, 290.79, 301.65, 316.43, 263.47, 284.86], '6M': [92, 84.26, 84.8, 86.76, 84.64, 81.21, 83.1, 81.34, 74.21, 78.23, 79.48, 81.69, 89.57, 87.67, 89.53, 97.68, 107.11, 128.49, 139.69, 164.31, 164.95, 170.13, 176.89, 196.33, 219.43, 284.86], '1Y': [69.14, 70.42, 75.21, 76.24, 72.26, 70.85, 71.99, 76.34, 76.63, 77.81, 72.07, 74.26, 62.31, 67.1, 70.98, 80.09, 84.07, 86.97, 86.22, 84.26, 88.46, 87.59, 89.33, 78.68, 83.43, 100.2, 88.9, 84.07, 87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 79.48, 81.69, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 164.95, 170.13, 176.89, 196.33, 219.43, 284.86] },
      velocityScore: { '1D': -4, '1W': -55.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$249B', pe: 98.2, revenueGrowth: 28, eps: 2.9, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 8.06, GTEK: 4.36, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: 3.26, FCUS: false, WGMI: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 3, avgWeight: 5.22, proScore: 1.21, coverage: 0.231,
      price: 412.66, weeklyPrices: [441.31, 427.34, 428.05, 416.67, 412.66], weeklyChange: -6.49, sortRank: 0, periodReturns: { '1M': -0.6, '6M': -16, '1Y': -12.7 },
      priceHistory: { '1W': [441.31, 427.34, 428.05, 416.67, 412.66], '1M': [415.12, 412.66, 407.77, 405.21, 409.43, 421.92, 423.54, 417.42, 421.06, 419.09, 418.57, 416.03, 412.67, 426.99, 450.24, 460.52, 441.31, 427.34, 428.05, 416.67, 412.66], '6M': [491.02, 474.82, 484.92, 487.48, 483.47, 459.38, 451.14, 433.5, 393.67, 401.84, 397.23, 392.74, 408.96, 401.86, 389.02, 365.97, 373.46, 370.87, 422.79, 424.62, 414.44, 415.12, 421.92, 418.57, 460.52, 412.66], '1Y': [472.75, 479.14, 490.11, 492.05, 503.51, 505.62, 505.27, 512.57, 527.75, 529.24, 509.77, 502.04, 505.35, 500.37, 510.02, 510.15, 517.95, 523.98, 513.57, 517.66, 542.07, 514.33, 508.68, 493.79, 476.99, 477.73, 492.02, 476.39, 486.85, 483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 397.23, 392.74, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 414.44, 415.12, 421.92, 418.57, 460.52, 412.66] },
      velocityScore: { '1D': 0.8, '1W': -77.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.1T', pe: 24.6, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 0.87,
      etfPresence: { PTF: false, WCLD: false, IGV: 7.86, FDTX: 3.79, GTEK: false, ARKK: false, MARS: false, FRWD: 4.02, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 3, avgWeight: 4.86, proScore: 1.12, coverage: 0.231,
      price: 399.01, weeklyPrices: [423.74, 423.70, 418.45, 391.00, 399.01], weeklyChange: -5.84, sortRank: 0, periodReturns: { '1M': -6.8, '6M': -9.2, '1Y': 29.3 },
      priceHistory: { '1W': [423.74, 423.7, 418.45, 391, 399.01], '1M': [428.35, 445, 433.45, 445.27, 443.3, 422.24, 409.99, 404.11, 417.26, 417.85, 426.01, 433.59, 440.36, 442.1, 435.79, 415.88, 423.74, 423.7, 418.45, 391, 399.01], '6M': [439.58, 475.31, 488.73, 454.43, 431.41, 439.2, 449.36, 416.56, 397.21, 417.07, 411.82, 402.51, 396.73, 395.01, 380.3, 372.11, 360.59, 348.95, 400.62, 376.3, 390.82, 428.35, 422.24, 426.01, 415.88, 399.01], '1Y': [308.58, 329.13, 340.47, 300.71, 295.88, 321.67, 332.11, 321.2, 308.72, 340.84, 329.31, 351.67, 334.09, 347.79, 425.86, 442.79, 444.72, 433.09, 429.24, 442.6, 460.55, 444.26, 439.62, 401.25, 419.4, 446.74, 445.17, 489.88, 485.56, 449.72, 435.8, 438.57, 449.06, 430.41, 411.11, 417.44, 411.82, 402.51, 396.73, 391.2, 367.96, 361.83, 352.82, 352.42, 392.5, 378.67, 390.82, 428.35, 422.24, 426.01, 415.88, 399.01] },
      velocityScore: { '1D': 0, '1W': -81.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 366.1, revenueGrowth: 16, eps: 1.09, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 10.12, MARS: false, FRWD: false, BCTK: 3.38, FWD: 1.08, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 3, avgWeight: 4.77, proScore: 1.1, coverage: 0.231,
      price: 319.28, weeklyPrices: [334.41, 343.71, 336.41, 303.28, 319.28], weeklyChange: -4.52, sortRank: 0, periodReturns: { '1M': 8.6, '6M': 96.2, '1Y': 261.6 },
      priceHistory: { '1W': [334.41, 343.71, 336.41, 303.28, 319.28], '1M': [294.05, 296.05, 289.24, 295.44, 299.15, 284.72, 277.96, 273.38, 292.09, 302.24, 305.35, 322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 319.28], '6M': [162.74, 164.3, 175.26, 173.78, 203.08, 208.79, 220.7, 248.17, 213.31, 231.29, 244.92, 233.89, 199.33, 209.49, 233.99, 211.62, 218.44, 263.66, 267.6, 267.78, 256.72, 294.05, 284.72, 305.35, 317.12, 319.28], '1Y': [88.3, 93.41, 95.63, 96.81, 99.81, 100.37, 97.69, 98.94, 96.68, 105.28, 100.33, 103.63, 97.74, 107.36, 121.9, 128.32, 133.9, 140.35, 138.31, 145.04, 155.62, 155.78, 159.18, 143.24, 151.93, 159.75, 165.81, 163.26, 175.16, 171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 244.92, 233.89, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 256.72, 294.05, 284.72, 305.35, 317.12, 319.28] },
      velocityScore: { '1D': -14.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$399B', pe: 60.5, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.34,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.79, BCTK: 6.76, FWD: 1.75, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 3, avgWeight: 4.62, proScore: 1.07, coverage: 0.231,
      price: 271.7, weeklyPrices: [297.18, 280.43, 279.25, 272.05, 271.70], weeklyChange: -8.57, sortRank: 0, periodReturns: { '1M': 30.7, '6M': 39.1, '1Y': 38.4 },
      priceHistory: { '1W': [297.18, 280.43, 279.25, 272.05, 271.7], '1M': [207.88, 213.66, 215.6, 227.79, 238.21, 242.83, 247.55, 240.13, 246.66, 252.92, 260.58, 256.75, 248.47, 257.77, 281.69, 300.48, 297.18, 280.43, 279.25, 272.05, 271.7], '6M': [195.35, 185.88, 189.49, 186.85, 193.9, 190.93, 182.27, 176.2, 154.77, 162.81, 148.7, 148.92, 165.05, 168.12, 169.74, 156.36, 163.21, 155.73, 167.85, 178.54, 181.08, 207.88, 242.83, 260.58, 300.48, 271.7], '1Y': [196.33, 198.11, 201.69, 197.58, 206.06, 192.59, 196.73, 193.84, 169.09, 175.4, 181.56, 184.23, 191.53, 197.33, 203.12, 200.7, 203.62, 211.04, 207.56, 214.4, 221.38, 214.52, 218.27, 201, 186.27, 193.63, 195, 187.09, 188.12, 184.2, 190.8, 187.73, 180.18, 176.97, 159.32, 166.95, 148.7, 148.92, 165.05, 167.02, 162.95, 147.02, 161.95, 162.51, 169.56, 182.9, 181.08, 207.88, 242.83, 260.58, 300.48, 271.7] },
      velocityScore: { '1D': 0.9, '1W': -58.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$221B', pe: 238.3, revenueGrowth: 31, eps: 1.14, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.41, IGV: 7.77, FDTX: 3.67, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 3, avgWeight: 4.27, proScore: 0.98, coverage: 0.231,
      price: 136.14, weeklyPrices: [152.17, 142.20, 141.70, 135.53, 136.14], weeklyChange: -10.53, sortRank: 0, periodReturns: { '1M': -1.2, '6M': -25, '1Y': 3.1 },
      priceHistory: { '1W': [152.17, 142.2, 141.7, 135.53, 136.14], '1M': [137.8, 136.89, 136, 130.05, 133.73, 133.99, 135.14, 135.26, 137.15, 137.41, 136.88, 136.6, 132.51, 143.34, 156.54, 160.65, 152.17, 142.2, 141.7, 135.53, 136.14], '6M': [181.49, 183.25, 193.98, 180.84, 181.68, 178.4, 165.9, 151.86, 130.01, 129.13, 135.24, 137.19, 157.16, 153.5, 155.68, 147.56, 148.46, 128.06, 146.39, 143.09, 144.07, 137.8, 133.99, 136.88, 160.65, 136.14], '1Y': [132.06, 141.41, 143.23, 130.68, 143.13, 150.91, 149.07, 156.24, 173.27, 186.97, 157.75, 160.87, 154.9, 166.74, 168.33, 179.56, 182.42, 182.17, 179.74, 181.51, 189.6, 190.74, 190.96, 167.33, 163.55, 176.08, 181.84, 187.75, 194.13, 177.75, 176.86, 177.07, 169.6, 146.59, 135.9, 131.41, 135.24, 137.19, 157.16, 150.95, 150.68, 143.06, 147.93, 132.37, 145.89, 143.1, 144.07, 137.8, 133.99, 136.88, 160.65, 136.14] },
      velocityScore: { '1D': 0, '1W': -65, '1M': null, '6M': null }, isNew: false,
      marketCap: '$326B', pe: 153, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 6.83, FDTX: 2.87, GTEK: false, ARKK: 3.1, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 3, avgWeight: 3.75, proScore: 0.87, coverage: 0.231,
      price: 361.33, weeklyPrices: [358.39, 355.68, 369.27, 365.76, 361.33], weeklyChange: 0.82, sortRank: 0, periodReturns: { '1M': -9, '6M': 14.9, '1Y': 103.4 },
      priceHistory: { '1W': [358.39, 355.68, 369.27, 365.76, 361.33], '1M': [397.05, 386.77, 383.82, 399.04, 397.17, 393.32, 393.11, 384.9, 384.9, 383.47, 379.38, 384.84, 384.83, 386.12, 376.43, 372.58, 358.39, 355.68, 369.27, 365.76, 361.33], '6M': [314.45, 309.32, 311.33, 314.55, 322.43, 336.31, 330.84, 338.66, 331.33, 309.37, 314.9, 311.43, 298.3, 303.21, 305.73, 280.74, 294.46, 315.72, 339.4, 342.32, 383.22, 397.05, 393.32, 379.38, 372.58, 361.33], '1Y': [177.63, 177.94, 167.74, 176.91, 177.66, 183.77, 192.11, 196.43, 195.32, 204.16, 202.49, 207.95, 231.1, 239.56, 249.85, 247.83, 243.55, 247.13, 246.19, 251.34, 268.43, 278.06, 291.74, 284.96, 323.64, 320.62, 317.75, 307.73, 315.68, 313.8, 326.01, 333.16, 328.43, 338.53, 323.1, 306.02, 314.9, 311.43, 298.3, 301.46, 298.79, 273.76, 297.66, 319.21, 335.4, 348.52, 383.22, 397.05, 393.32, 379.38, 372.58, 361.33] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$4.4T', pe: 27.6, revenueGrowth: 22, eps: 13.09, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.66, GTEK: false, ARKK: 1.97, MARS: false, FRWD: false, BCTK: 5.62, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Alphabet Inc Class C appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'COHR', name: 'Coherent Corp', easyScore: 3, avgWeight: 3.48, proScore: 0.8, coverage: 0.231,
      price: 389.98, weeklyPrices: [426.89, 417.43, 421.90, 376.99, 389.98], weeklyChange: -8.65, sortRank: 0, periodReturns: { '1M': 16.3, '6M': 109.8, '1Y': 380.3 },
      priceHistory: { '1W': [426.89, 417.43, 421.9, 376.99, 389.98], '1M': [335.26, 379.69, 374.01, 403.71, 404.94, 382.45, 362.83, 353.63, 358.5, 378, 377.57, 381.35, 380.18, 376.95, 361.47, 362.9, 426.89, 417.43, 421.9, 376.99, 389.98], '6M': [185.86, 178.45, 190.98, 186.81, 191.62, 184.11, 202.72, 215.86, 209.24, 216.1, 248.18, 258.93, 235.72, 241.27, 275.57, 243.29, 258.16, 307.5, 345.02, 336.09, 329.5, 335.26, 382.45, 377.57, 362.9, 389.98], '1Y': [81.19, 80.76, 80.96, 86.64, 91.25, 97.82, 97.02, 106.98, 105.6, 116.56, 87.76, 91.58, 88.47, 103.49, 103.41, 106.52, 107.72, 113.56, 109.37, 120.79, 134.24, 128.7, 158.01, 138.15, 148.85, 170.96, 192.73, 175.2, 191.87, 184.57, 173.15, 195.96, 196.94, 212.18, 227.68, 217.23, 248.18, 258.93, 235.72, 242.76, 253.63, 243.48, 253.22, 307.93, 347.51, 321.53, 329.5, 335.26, 382.45, 377.57, 362.9, 389.98] },
      velocityScore: { '1D': -21.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$76B', pe: 184.8, revenueGrowth: 21, eps: 2.11, grossMargin: 37, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.75, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 4.08, FWD: false, CBSE: 2.6, FCUS: false, WGMI: false },
      tonyNote: 'Coherent Corp appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 3.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRWD', name: 'CRWD', easyScore: 3, avgWeight: 3.22, proScore: 0.74, coverage: 0.231,
      price: 675.39, weeklyPrices: [768.95, 747.61, 719.09, 671.02, 675.39], weeklyChange: -12.17, sortRank: 0, periodReturns: { '1M': 28, '6M': 31.1, '1Y': 45.4 },
      priceHistory: { '1W': [768.95, 747.61, 719.09, 671.02, 675.39], '1M': [527.77, 542.26, 546.18, 562.57, 579.95, 594.08, 618.83, 616.88, 650.11, 648.23, 663.46, 671.55, 645.36, 671, 731, 782.17, 768.95, 747.61, 719.09, 671.02, 675.39], '6M': [515.19, 487.47, 483.14, 475.63, 478.91, 460.7, 453.77, 444.62, 377.16, 411.54, 388.6, 371.98, 428.99, 441.54, 428.18, 392.62, 399.12, 379.02, 423.95, 448.13, 455.64, 527.77, 594.08, 663.46, 782.17, 675.39], '1Y': [464.39, 479.39, 485.38, 492.07, 513.51, 470.45, 471.23, 465.51, 441.75, 435.8, 418.6, 417.6, 413.2, 424.87, 445.5, 476.33, 490.38, 484.62, 488.94, 503.95, 546.94, 533.92, 556.73, 513.67, 512.34, 524.17, 517.98, 488.53, 478.84, 468.76, 463.87, 455, 452.49, 441.4, 395.5, 429.64, 388.6, 371.98, 428.99, 441.78, 409, 369.58, 398.61, 402.24, 433.15, 454.61, 455.64, 527.77, 594.08, 663.46, 782.17, 675.39] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$172B', pe: null, revenueGrowth: 26, eps: -0.13, grossMargin: 75, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.38, IGV: 6.05, FDTX: 1.24, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'CRWD appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 3.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASML', name: 'ASML', easyScore: 3, avgWeight: 2.84, proScore: 0.66, coverage: 0.231,
      price: 1736.84, weeklyPrices: [1705.37, 1726.36, 1757.47, 1641.74, 1736.84], weeklyChange: 1.85, sortRank: 0, periodReturns: { '1M': 9.1, '6M': 55.1, '1Y': 125.5 },
      priceHistory: { '1W': [1705.37, 1726.36, 1757.47, 1641.74, 1736.84], '1M': [1592.02, 1565.81, 1520.94, 1581.58, 1584.51, 1501.81, 1472.39, 1459.44, 1550.13, 1592, 1632.9, 1632.03, 1597.87, 1605.77, 1612.76, 1628.57, 1705.37, 1726.36, 1757.47, 1641.74, 1736.84], '6M': [1119.69, 1087.82, 1056.98, 1072.14, 1228.47, 1263.72, 1395, 1455.16, 1350.16, 1406.87, 1469.59, 1450.56, 1292.8, 1351.58, 1366.39, 1329.5, 1317.23, 1478.28, 1459.8, 1457.7, 1427.02, 1592.02, 1501.81, 1632.9, 1628.57, 1736.84], '1Y': [770.2, 775.23, 813.36, 790.47, 799.83, 754.45, 705.48, 718.49, 689.63, 741.79, 743.61, 763.2, 736.82, 793.14, 872.27, 946.94, 968.09, 1002.3, 983.18, 1025.02, 1052.48, 1030.14, 1022.42, 1004.06, 1003.22, 1140.92, 1111.44, 1076.05, 1061.84, 1069.86, 1194.32, 1331.6, 1389.04, 1423, 1413.01, 1406.61, 1469.59, 1450.56, 1292.8, 1345.69, 1317.25, 1302.47, 1304.01, 1500.2, 1476.5, 1432.44, 1427.02, 1592.02, 1501.81, 1632.9, 1628.57, 1736.84] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$669B', pe: 57.8, revenueGrowth: 13, eps: 30.04, grossMargin: 53, dividendYield: 0.54,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 4.98, BCTK: 2.12, FWD: 1.42, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'ASML appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CDNS', name: 'CADENCE DESIGN SYSTEMS INC', easyScore: 3, avgWeight: 2.75, proScore: 0.63, coverage: 0.231,
      price: 389.13, weeklyPrices: [416.39, 408.00, 411.68, 376.19, 389.13], weeklyChange: -6.55, sortRank: 0, periodReturns: { '1M': 7.3, '6M': 15.4, '1Y': 29 },
      priceHistory: { '1W': [416.39, 408, 411.68, 376.19, 389.13], '1M': [362.7, 364.2, 358.04, 354.55, 352.84, 347.24, 345.99, 338.12, 350.89, 358.46, 373.59, 381.75, 374.05, 373.85, 374.93, 414.16, 416.39, 408, 411.68, 376.19, 389.13], '6M': [337.29, 318.43, 317.57, 315.6, 320.54, 313.17, 317.09, 302.67, 270.14, 288.33, 296.28, 301.4, 296.94, 290.32, 287.4, 280.62, 278.72, 265.66, 311.03, 332.89, 340.94, 362.7, 347.24, 373.59, 414.16, 389.13], '1Y': [301.66, 300.81, 296.8, 309.46, 322.91, 314.58, 319.6, 366.26, 360.5, 353.61, 346.88, 344.03, 347.32, 338.53, 347.27, 356.96, 351.26, 345.48, 325.75, 333.45, 341.3, 333.22, 318.51, 303.21, 303.66, 336.11, 335.07, 319.53, 316.93, 312.58, 318.8, 320.6, 318.32, 296.36, 283.52, 299.46, 296.28, 301.4, 296.94, 287.03, 283.9, 271.77, 279.39, 288.2, 318.5, 336.54, 340.94, 362.7, 347.24, 373.59, 414.16, 389.13] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$107B', pe: 90.7, revenueGrowth: 19, eps: 4.29, grossMargin: 86, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 3.66, FDTX: false, GTEK: 2.47, ARKK: false, MARS: false, FRWD: 2.12, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'CADENCE DESIGN SYSTEMS INC appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 2, avgWeight: 7.23, proScore: 3.62, coverage: 0.5,
      price: 291.06, weeklyPrices: [299.07, 299.73, 300.06, 284.87, 291.06], weeklyChange: -2.68, sortRank: 0, periodReturns: { '1M': -5.9, '6M': 154.7, '1Y': 359 },
      priceHistory: { '1W': [299.07, 299.73, 300.06, 284.87, 291.06], '1M': [309.39, 322.05, 308.05, 300.84, 296.98, 292.65, 266.8, 261.58, 271.05, 270.75, 279.22, 291.97, 295.94, 288.9, 284.42, 288.12, 299.07, 299.73, 300.06, 284.87, 291.06], '6M': [114.29, 109.31, 112.18, 109.16, 118.62, 133.76, 142.29, 152.31, 179.6, 197.63, 182.27, 174.53, 161.22, 171.19, 175.13, 174.8, 182.6, 230.94, 241.01, 252.76, 275.33, 309.39, 292.65, 279.22, 288.12, 291.06], '1Y': [63.41, 65.05, 62.82, 70.01, 70.64, 72.53, 73.67, 77.77, 78.75, 90.06, 84.7, 91.08, 85.72, 92.33, 97.11, 97.88, 101.6, 104.42, 105.73, 116.11, 128.09, 126.71, 121.07, 107.22, 104.18, 107.83, 115.02, 110.88, 112.88, 106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 182.27, 174.53, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 275.33, 309.39, 292.65, 279.22, 288.12, 291.06] },
      velocityScore: { '1D': -1.4, '1W': -26.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 56.7, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { POW: 6.58, VOLT: 7.88, PBD: false, PBW: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 2, avgWeight: 5.18, proScore: 2.59, coverage: 0.5,
      price: 689.48, weeklyPrices: [706.06, 715.67, 719.17, 695.11, 689.48], weeklyChange: -2.35, sortRank: 0, periodReturns: { '1M': -7.5, '6M': 48.9, '1Y': 93.9 },
      priceHistory: { '1W': [706.06, 715.67, 719.17, 695.11, 689.48], '1M': [745, 781.38, 765.81, 773.72, 780.08, 769.99, 723.03, 714.13, 709.93, 716.91, 723.44, 742.18, 733.62, 730.1, 711.73, 687.48, 706.06, 715.67, 719.17, 695.11, 689.48], '6M': [463.09, 435.87, 433.03, 428.81, 436.89, 437.07, 468.78, 483.43, 477.72, 515.88, 552.66, 563.08, 540.19, 566.91, 577.95, 545.64, 560.63, 585.36, 601.88, 624.84, 742.21, 745, 769.99, 723.44, 687.48, 689.48], '1Y': [355.66, 361.8, 372.26, 372.29, 382.12, 389.12, 394.93, 410.99, 389.12, 391.57, 379.27, 383.92, 374.41, 390.17, 376.01, 402.87, 414.42, 421.51, 431.6, 437.43, 439.57, 438.66, 448.91, 439.29, 450.14, 456.02, 457.96, 438.49, 435.2, 422.06, 413.17, 447.64, 468.76, 474.63, 508.11, 524.08, 552.66, 563.08, 540.19, 559.02, 555.39, 549.98, 554.38, 595.84, 604.97, 637.28, 742.21, 745, 769.99, 723.44, 687.48, 689.48] },
      velocityScore: { '1D': 0.4, '1W': -28.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$103B', pe: 94.4, revenueGrowth: 26, eps: 7.3, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.82, VOLT: 5.54, PBD: false, PBW: false },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, avgWeight: 5.17, proScore: 2.59, coverage: 0.5,
      price: 265.32, weeklyPrices: [269.22, 280.09, 276.54, 262.56, 265.32], weeklyChange: -1.45, sortRank: 0, periodReturns: { '1M': -11, '6M': 54.1, '1Y': 241.4 },
      priceHistory: { '1W': [269.22, 280.09, 276.54, 262.56, 265.32], '1M': [297.98, 302.73, 298.22, 266.92, 268.73, 256.72, 258.28, 249.71, 254.75, 260.4, 270.01, 276.25, 280.13, 276.96, 274.52, 269.86, 269.22, 280.09, 276.54, 262.56, 265.32], '6M': [172.21, 173.3, 174.02, 172.95, 181.03, 192.96, 200.29, 210.44, 208, 231.48, 235.04, 229.71, 191.87, 195.18, 214.95, 204.11, 204.65, 235.73, 254.25, 276.65, 283.6, 297.98, 256.72, 270.01, 269.86, 265.32], '1Y': [77.71, 88.72, 92.48, 95.52, 102.24, 98.77, 106, 130.49, 131.71, 134.66, 127.8, 139.31, 138.07, 145.68, 144.6, 142.27, 141.02, 141.25, 147.14, 148, 154.78, 154.25, 152.12, 144.07, 150.84, 159.74, 167.43, 171.76, 177.23, 169.63, 180.24, 196.61, 196.5, 201.19, 220.78, 232.84, 235.04, 229.71, 191.87, 197.65, 204.09, 203.53, 206.9, 237.93, 254.38, 250.96, 283.6, 297.98, 256.72, 270.01, 269.86, 265.32] },
      velocityScore: { '1D': -1.5, '1W': -30.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 63.9, revenueGrowth: 17, eps: 4.15, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: 3.17, VOLT: 7.18, PBD: false, PBW: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 2, avgWeight: 4.74, proScore: 2.37, coverage: 0.5,
      price: 402.64, weeklyPrices: [417.62, 421.21, 418.61, 395.94, 402.64], weeklyChange: -3.59, sortRank: 0, periodReturns: { '1M': 0.3, '6M': 17.3, '1Y': 23.6 },
      priceHistory: { '1W': [417.62, 421.21, 418.61, 395.94, 402.64], '1M': [401.51, 419, 401.53, 406.94, 408.1, 399.44, 381.87, 371.88, 379.69, 381.51, 391.35, 403.13, 406.37, 401.94, 400.6, 400.08, 417.62, 421.21, 418.61, 395.94, 402.64], '6M': [343.39, 333.21, 320.39, 320.86, 322.67, 331.14, 334.04, 354.37, 354.67, 390.33, 373.38, 375.92, 347.75, 348.64, 360.23, 357.1, 361.1, 403, 406.21, 423.92, 425.55, 401.51, 399.44, 391.35, 400.08, 402.64], '1Y': [325.81, 338.01, 343.26, 355.04, 359.78, 362.89, 372.65, 390.01, 356.45, 363.3, 349, 352.02, 342.99, 362.25, 363.35, 372.21, 374.25, 370.94, 374.35, 373.46, 376.01, 377.72, 367.91, 338.29, 336.65, 335.57, 341.76, 329.93, 322.81, 318.51, 320.58, 333.46, 331.22, 351.42, 373.82, 389.25, 373.38, 375.92, 347.75, 355.4, 356.8, 357.36, 363.89, 403.36, 407.57, 416.77, 425.55, 401.51, 399.44, 391.35, 400.08, 402.64] },
      velocityScore: { '1D': -1.7, '1W': -28, '1M': null, '6M': null }, isNew: false,
      marketCap: '$156B', pe: 39.4, revenueGrowth: 17, eps: 10.22, grossMargin: 37, dividendYield: 1.11,
      etfPresence: { POW: 4.07, VOLT: 5.4, PBD: false, PBW: false },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 2, avgWeight: 3.62, proScore: 1.81, coverage: 0.5,
      price: 946.34, weeklyPrices: [969.67, 959.36, 963.33, 933.61, 946.34], weeklyChange: -2.41, sortRank: 0, periodReturns: { '1M': -9, '6M': 52.2, '1Y': 97.2 },
      priceHistory: { '1W': [969.67, 959.36, 963.33, 933.61, 946.34], '1M': [1040.15, 1073.08, 1071.98, 1062.57, 1090.53, 1049.23, 1012.25, 1011.8, 1024.52, 1043.82, 1038.74, 1070.47, 1031.89, 996, 968.32, 950.54, 969.67, 959.36, 963.33, 933.61, 946.34], '6M': [621.9, 681.35, 661.81, 659.64, 662.32, 644.18, 661.67, 717.39, 737.53, 816.56, 830.34, 873.6, 789.23, 832.11, 877.39, 873.12, 898.57, 991.32, 1002.75, 1149.19, 1062.95, 1040.15, 1049.23, 1038.74, 950.54, 946.34], '1Y': [480, 487.88, 510.84, 506, 535.77, 561.17, 548.99, 632.67, 649.72, 657.44, 603.13, 625.91, 577.04, 643.56, 614.79, 628.97, 614.9, 606.12, 644.41, 585.33, 570.98, 547.96, 576.08, 554.93, 572.56, 601.97, 625.3, 686.22, 661.45, 653.57, 628.4, 642.23, 657.78, 726.37, 779.35, 802.13, 830.34, 873.6, 789.23, 805.02, 851.07, 853.16, 897.36, 991.12, 990.18, 1120.23, 1062.95, 1040.15, 1049.23, 1038.74, 950.54, 946.34] },
      velocityScore: { '1D': 0.6, '1W': -29.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$254B', pe: 27.6, revenueGrowth: 16, eps: 34.26, grossMargin: 20, dividendYield: 0.21,
      etfPresence: { POW: 3.29, VOLT: 3.95, PBD: false, PBW: false },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 2, avgWeight: 3.51, proScore: 1.75, coverage: 0.5,
      price: 163.95, weeklyPrices: [173.39, 176.39, 173.88, 162.86, 163.95], weeklyChange: -5.44, sortRank: 0, periodReturns: { '1M': -3.5, '6M': 53.1, '1Y': 140 },
      priceHistory: { '1W': [173.39, 176.39, 173.88, 162.86, 163.95], '1M': [169.95, 173.39, 170.74, 172.91, 173.96, 169.01, 160.69, 158.23, 161.86, 163.57, 164.66, 169.29, 167.8, 164.87, 166.99, 171.55, 173.39, 176.39, 173.88, 162.86, 163.95], '6M': [107.11, 102.61, 102.79, 103.01, 106.48, 104.54, 111.57, 115.62, 113.87, 111.9, 116.87, 118.36, 106.02, 107.87, 122.58, 118.44, 117.96, 130.56, 134.69, 142.17, 158.92, 169.95, 169.01, 164.66, 171.55, 163.95], '1Y': [68.32, 70.4, 72.34, 72.16, 75.2, 74.48, 74.63, 79.72, 89.73, 91.84, 88.15, 90.84, 89.49, 94.98, 96.46, 97.27, 98.64, 96, 99.51, 99.65, 104.22, 109.62, 109.59, 104.31, 104.93, 104.97, 107.42, 102.41, 103.97, 101.97, 102.72, 107.98, 110.29, 112.26, 112.64, 113.25, 116.87, 118.36, 106.02, 109.93, 116.3, 116.98, 117.41, 133.16, 135.8, 141.71, 158.92, 169.95, 169.01, 164.66, 171.55, 163.95] },
      velocityScore: { '1D': -2.8, '1W': -28.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 55.6, revenueGrowth: 54, eps: 2.95, grossMargin: 37, dividendYield: 0.52,
      etfPresence: { POW: 3.88, VOLT: 3.14, PBD: false, PBW: false },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 2, avgWeight: 3.17, proScore: 1.58, coverage: 0.5,
      price: 260.4, weeklyPrices: [302.85, 287.32, 291.37, 263.61, 260.40], weeklyChange: -14.02, sortRank: 0, periodReturns: { '1M': -0.2, '6M': 132.9, '1Y': 1115.1 },
      priceHistory: { '1W': [302.85, 287.32, 291.37, 263.61, 260.4], '1M': [261.03, 283.92, 280.69, 289.76, 303.41, 275.95, 258.71, 261.34, 282.31, 307.88, 302.49, 302.4, 293.8, 290.01, 285, 273.51, 302.85, 287.32, 291.37, 263.61, 260.4], '6M': [111.79, 89.58, 92.26, 87.26, 108, 133.46, 145.63, 156.51, 136.6, 139.03, 147.55, 155.67, 135.19, 157.17, 166.69, 133.52, 135.63, 166.7, 207.86, 231.17, 290.52, 261.03, 275.95, 302.49, 273.51, 260.4], '1Y': [21.43, 22.91, 22.95, 22.13, 28.71, 24.69, 25.93, 34.75, 37.61, 41.25, 43.1, 49.94, 52.45, 62.96, 79.67, 69.18, 84.57, 86.06, 114.06, 104.38, 113.28, 129.05, 127.07, 104.97, 94.29, 102.5, 109.44, 87.61, 91.43, 86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 147.55, 155.67, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 290.52, 261.03, 275.95, 302.49, 273.51, 260.4] },
      velocityScore: { '1D': -4.2, '1W': -32.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$74B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: 4.21, PBD: false, PBW: 2.12 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 2, avgWeight: 3.13, proScore: 1.56, coverage: 0.5,
      price: 478.05, weeklyPrices: [480.46, 484.91, 485.27, 476.82, 478.05], weeklyChange: -0.5, sortRank: 0, periodReturns: { '1M': -3, '6M': 8.3, '1Y': 21.8 },
      priceHistory: { '1W': [480.46, 484.91, 485.27, 476.82, 478.05], '1M': [492.58, 490.16, 485.98, 483.79, 482.03, 479.97, 470.87, 461.5, 463.32, 460.98, 475.01, 478.05, 484.25, 473.93, 473.61, 462.93, 480.46, 484.91, 485.27, 476.82, 478.05], '6M': [441.51, 444.84, 451.03, 446.61, 468.2, 476.06, 484.06, 497.97, 487.4, 516.02, 526.73, 511.63, 471.54, 468.41, 492.65, 481.67, 494.25, 536.01, 535.57, 553.07, 508.43, 492.58, 479.97, 475.01, 462.93, 478.05], '1Y': [392.34, 391.89, 402.99, 410.51, 417.71, 418.42, 428.55, 427.33, 427.67, 432.14, 432.81, 442.52, 428.8, 442.33, 433.26, 431.16, 430.31, 412.93, 427.43, 435.29, 455.34, 459.44, 450.12, 417.28, 429.82, 429.34, 438.7, 438.42, 455.92, 444.11, 460.87, 484.11, 485.53, 487.94, 503.8, 524.12, 526.73, 511.63, 471.54, 467.38, 475.74, 480.97, 499.2, 539.79, 546.23, 555.34, 508.43, 492.58, 479.97, 475.01, 462.93, 478.05] },
      velocityScore: { '1D': 2, '1W': -26.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 28.2, revenueGrowth: 11, eps: 16.93, grossMargin: 36, dividendYield: 1.19,
      etfPresence: { POW: 2.91, VOLT: 3.35, PBD: false, PBW: false },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 2, avgWeight: 3.06, proScore: 1.53, coverage: 0.5,
      price: 85.69, weeklyPrices: [85.68, 84.58, 85.68, 85.84, 85.69], weeklyChange: 0.01, sortRank: 0, periodReturns: { '1M': -8, '6M': 6.4, '1Y': 19.2 },
      priceHistory: { '1W': [85.68, 84.58, 85.68, 85.84, 85.69], '1M': [93.1, 94.84, 94.59, 94.85, 95.68, 93.36, 89.04, 90.06, 88.27, 89.69, 88.55, 87.65, 87.65, 87.25, 87.01, 83.66, 85.68, 84.58, 85.68, 85.84, 85.69], '6M': [80.55, 81.65, 80.04, 80.53, 78.37, 81.98, 85.07, 88.18, 89.21, 91.93, 92.18, 93.77, 91.02, 91.73, 92.41, 91.16, 93.15, 94.08, 91.98, 95.28, 96.95, 93.1, 93.36, 88.55, 83.66, 85.69], '1Y': [71.9, 73.78, 71.4, 73.06, 73.65, 74.77, 77.54, 71.95, 71.18, 71.86, 76.51, 74.84, 71.63, 71.04, 70.31, 73.83, 75.49, 83.21, 84.64, 83.99, 83.57, 81.69, 85.76, 84.64, 84.83, 84.95, 79.64, 81.32, 79.79, 80.28, 79.49, 82.19, 84.81, 87.9, 89.47, 93.8, 92.18, 93.77, 91.02, 92.78, 89.5, 91.4, 92.73, 92.3, 92.01, 94.83, 96.95, 93.1, 93.36, 88.55, 83.66, 85.69] },
      velocityScore: { '1D': 4.8, '1W': -28.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$179B', pe: 21.7, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.9,
      etfPresence: { POW: 2.03, VOLT: 4.09, PBD: false, PBW: false },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 2.88, proScore: 1.44, coverage: 0.5,
      price: 128.4, weeklyPrices: [127.11, 126.31, 127.79, 129.14, 128.40], weeklyChange: 1.01, sortRank: 0, periodReturns: { '1M': -1.4, '6M': 10.9, '1Y': 26.6 },
      priceHistory: { '1W': [127.11, 126.31, 127.79, 129.14, 128.4], '1M': [130.16, 130.7, 131.94, 127.95, 128.6, 125.15, 127.68, 128.92, 128.87, 129.61, 131.59, 130.9, 129.57, 127.76, 126.67, 123.79, 127.11, 126.31, 127.79, 129.14, 128.4], '6M': [115.73, 115.77, 114.62, 115.99, 113.7, 118.11, 117.18, 119.21, 120.61, 126.43, 129.37, 133.82, 131.87, 132.22, 128.72, 128.85, 132.68, 136.3, 133.66, 134.73, 136.91, 130.16, 125.15, 131.59, 123.79, 128.4], '1Y': [101.41, 101.91, 103.28, 104.39, 104.74, 105.49, 110.16, 109.22, 113.24, 111.99, 112.66, 112.63, 110.03, 108.34, 107.52, 108.88, 112.5, 118.16, 118.38, 117.43, 115.11, 120.3, 122.73, 123.51, 121.58, 118.06, 116.07, 114.57, 115.15, 115.31, 115.93, 119.4, 116.63, 119.78, 120.8, 129.94, 129.37, 133.82, 131.87, 133.61, 125.66, 130.1, 132.36, 134.46, 133.28, 135.07, 136.91, 130.16, 125.15, 131.59, 123.79, 128.4] },
      velocityScore: { '1D': 4.3, '1W': -26.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 19, revenueGrowth: 10, eps: 6.75, grossMargin: 47, dividendYield: 2.94,
      etfPresence: { POW: 1.42, VOLT: 4.35, PBD: false, PBW: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.42, proScore: 1.21, coverage: 0.5,
      price: 143.56, weeklyPrices: [148.40, 147.62, 146.77, 138.81, 143.56], weeklyChange: -3.26, sortRank: 0, periodReturns: { '1M': 12.1, '6M': 2.5, '1Y': 54.4 },
      priceHistory: { '1W': [148.4, 147.62, 146.77, 138.81, 143.56], '1M': [128.03, 122.47, 127.87, 124.64, 129.19, 125, 121.72, 119.2, 123.05, 124.86, 132.06, 139.56, 140.24, 147.68, 148.76, 146.34, 148.4, 147.62, 146.77, 138.81, 143.56], '6M': [140.06, 129.9, 135.14, 136.2, 138.91, 146.75, 152.5, 149.58, 127.63, 143.73, 151.04, 146.06, 131.87, 131.47, 130.65, 123.13, 128, 140.75, 151.06, 149.71, 142.3, 128.03, 125, 132.06, 146.34, 143.56], '1Y': [92.96, 93.38, 95.8, 97.39, 98.21, 100.55, 101.78, 105.31, 107.93, 111.85, 109.98, 109.9, 110.69, 119.09, 118.41, 123.13, 123.75, 124.53, 122.64, 124.44, 137.29, 136.7, 143.47, 132.44, 137.81, 138.65, 138.58, 129.13, 137.12, 135.14, 136.25, 154.22, 150.99, 144.08, 136.23, 146.72, 151.04, 146.06, 131.87, 133.92, 126.74, 123.62, 126.49, 145.27, 152.81, 148.64, 142.3, 128.03, 125, 132.06, 146.34, 143.56] },
      velocityScore: { '1D': -2.4, '1W': -32.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$177B', pe: 41.3, revenueGrowth: 58, eps: 3.48, grossMargin: 38, dividendYield: 0.72,
      etfPresence: { POW: 0.91, VOLT: 3.94, PBD: false, PBW: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.38, proScore: 1.19, coverage: 0.5,
      price: 303.06, weeklyPrices: [312.28, 322.50, 320.92, 294.81, 303.06], weeklyChange: -2.95, sortRank: 0, periodReturns: { '1M': -15.2, '6M': 36.6, '1Y': 141 },
      priceHistory: { '1W': [312.28, 322.5, 320.92, 294.81, 303.06], '1M': [357.24, 354.97, 339.42, 339.19, 344.6, 323.46, 309.06, 302.84, 313.05, 323.79, 324.86, 339.65, 328.34, 317.08, 302.18, 294.65, 312.28, 322.5, 320.92, 294.81, 303.06], '6M': [221.85, 216.87, 217.76, 213.41, 224.4, 237.9, 275.57, 269.12, 257.64, 312.95, 331.23, 335.57, 290.78, 305.82, 327.8, 313.11, 332.31, 379.64, 375.6, 387.24, 389.05, 357.24, 323.46, 324.86, 294.65, 303.06], '1Y': [125.73, 125.26, 132.51, 133.59, 141.13, 139.42, 140.68, 142.21, 139.58, 158.81, 150.41, 154.44, 145.25, 157.25, 157.79, 170.77, 170.14, 173.09, 182.75, 196.58, 204.62, 195.05, 215.98, 199.22, 205.92, 213.44, 221.27, 215.16, 217.51, 209.37, 210.99, 257.29, 262.19, 255.36, 273.26, 314.27, 331.23, 335.57, 290.78, 302.02, 317.21, 310.76, 331.9, 378.94, 380.22, 385.68, 389.05, 357.24, 323.46, 324.86, 294.65, 303.06] },
      velocityScore: { '1D': -4.8, '1W': -29.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 63.1, revenueGrowth: 26, eps: 4.8, grossMargin: 39, dividendYield: 0.14,
      etfPresence: { POW: 0.92, VOLT: 3.84, PBD: false, PBW: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'XEL', name: 'Xcel Energy Inc', easyScore: 2, avgWeight: 2, proScore: 1, coverage: 0.5,
      price: 78.89, weeklyPrices: [77.87, 77.39, 77.77, 79.04, 78.89], weeklyChange: 1.31, sortRank: 0, periodReturns: { '1M': -0.6, '6M': 4.2, '1Y': 15.4 },
      priceHistory: { '1W': [77.87, 77.39, 77.77, 79.04, 78.89], '1M': [79.39, 80.6, 79.9, 79.91, 80.03, 77.92, 78.1, 79.73, 79.86, 80.2, 81.08, 80.78, 81, 79.26, 79.5, 76.41, 77.87, 77.39, 77.77, 79.04, 78.89], '6M': [75.73, 75.72, 73.85, 74.19, 73.22, 76.2, 75.86, 75.97, 76.12, 78.98, 81.55, 83.36, 82.52, 80.82, 79.53, 77.93, 80.74, 82.38, 81.08, 79.15, 82.58, 79.39, 77.92, 81.08, 76.41, 78.89], '1Y': [68.38, 66.79, 68.23, 68.71, 67.84, 69.17, 73.06, 72.34, 73.73, 72.39, 73.22, 72.54, 72.43, 72.31, 72.05, 77.93, 80.65, 81.85, 80.85, 80.64, 79.82, 81.59, 81.16, 81, 80.39, 78.39, 75.72, 73.73, 74.01, 73.86, 73.38, 75.36, 75.01, 76.06, 75.9, 81.59, 81.55, 83.36, 82.52, 81.91, 76.77, 78.09, 80.39, 80.45, 80.32, 79.41, 82.58, 79.39, 77.92, 81.08, 76.41, 78.89] },
      velocityScore: { '1D': 5.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$49B', pe: 22.7, revenueGrowth: 3, eps: 3.47, grossMargin: 46, dividendYield: 3,
      etfPresence: { POW: 2.01, VOLT: 2, PBD: false, PBW: false },
      tonyNote: 'Xcel Energy Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BLDP', name: 'Ballard Power Systems Inc', easyScore: 2, avgWeight: 1.68, proScore: 0.84, coverage: 0.5,
      price: 4.96, weeklyPrices: [6.38, 6.06, 6.07, 4.92, 4.96], weeklyChange: -22.26, sortRank: 0, periodReturns: { '1M': 20.1, '6M': 77.1, '1Y': 202.4 },
      priceHistory: { '1W': [6.38, 6.06, 6.07, 4.92, 4.96], '1M': [4.13, 4.17, 4.16, 4.14, 4.13, 4.45, 4.33, 4.18, 4.76, 5.43, 5.54, 5.94, 6.09, 6.19, 6.29, 6.3, 6.38, 6.06, 6.07, 4.92, 4.96], '6M': [2.8, 2.63, 2.65, 2.54, 2.71, 2.75, 2.66, 2.49, 2.03, 2.07, 2.11, 2.14, 2.01, 2.42, 2.48, 2.45, 2.48, 2.81, 2.96, 3.28, 3.39, 4.13, 4.45, 5.54, 6.3, 4.96], '1Y': [1.64, 1.79, 1.47, 1.61, 1.95, 1.81, 2.04, 1.86, 1.86, 1.73, 1.94, 2.06, 1.89, 1.93, 2.52, 2.99, 2.72, 3.63, 3.98, 3.33, 3.44, 3.37, 3.57, 2.89, 2.69, 2.67, 2.82, 2.65, 2.67, 2.54, 2.73, 2.7, 2.64, 2.33, 2.15, 2.15, 2.11, 2.14, 2.01, 2.39, 2.41, 2.39, 2.53, 2.7, 3.17, 3.25, 3.39, 4.13, 4.45, 5.54, 6.3, 4.96] },
      velocityScore: { '1D': -10.6, '1W': -50.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1B', pe: null, revenueGrowth: 26, eps: -0.27, grossMargin: 11, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: 1.13, PBW: 2.22 },
      tonyNote: 'Ballard Power Systems is a hydrogen fuel cell technology company. It appears in Electrification ETFs as a long-duration bet on hydrogen as a zero-carbon fuel for heavy industry and transit. Revenue is small, the company is pre-profitability, and the weight is minimal — this is a thematic placeholder allocation, not a fundamental position.',
    },
    {
      ticker: 'SHLS', name: 'Shoals Technologies Group Inc', easyScore: 2, avgWeight: 1.55, proScore: 0.78, coverage: 0.5,
      price: 11.17, weeklyPrices: [12.46, 12.39, 12.77, 10.81, 11.17], weeklyChange: -10.39, sortRank: 0, periodReturns: { '1M': 26.3, '6M': 39.2, '1Y': 118.9 },
      priceHistory: { '1W': [12.46, 12.39, 12.77, 10.81, 11.17], '1M': [8.84, 9.32, 8.63, 9.11, 9.28, 10.33, 9.66, 9.28, 9.68, 9.55, 9.91, 10.82, 12.12, 12.2, 12.45, 12.18, 12.46, 12.39, 12.77, 10.81, 11.17], '6M': [8.02, 8.67, 9.32, 8.57, 8.84, 9.14, 9.66, 10.02, 9.65, 9.66, 10.61, 5.93, 5.71, 6.12, 6.04, 6.47, 6.82, 6.98, 7.16, 7.93, 8.16, 8.84, 10.33, 9.91, 12.18, 11.17], '1Y': [5.1, 5.34, 5, 5.26, 5.74, 5.81, 6, 5.58, 4.67, 4.62, 6.13, 6.84, 6.78, 6.88, 7.23, 7.7, 7.41, 8.54, 10.13, 10.48, 10.53, 9.24, 8.93, 7.98, 8.12, 7.61, 8.08, 8.54, 9.11, 8.5, 8.6, 9.37, 9.22, 9.44, 10.29, 10.24, 10.61, 5.93, 5.71, 6.13, 6.1, 6.62, 6.56, 6.67, 7.08, 7.8, 8.16, 8.84, 10.33, 9.91, 12.18, 11.17] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$2B', pe: 55.8, revenueGrowth: 75, eps: 0.2, grossMargin: 33, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: 1.1, PBW: 2.01 },
      tonyNote: 'Shoals Technologies Group Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 1.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SU', name: 'Schneider Electric SE', easyScore: 2, avgWeight: 1.36, proScore: 0.68, coverage: 0.5,
      price: 63.95, weeklyPrices: [65.31, 65.54, 65.47, 62.22, 63.95], weeklyChange: -2.08, sortRank: 0, periodReturns: { '1M': -0.1, '6M': 45.2, '1Y': 72.9 },
      priceHistory: { '1W': [65.31, 65.54, 65.47, 62.22, 63.95], '1M': [64.01, 65.12, 66.56, 66.07, 66.79, 68.29, 69.73, 69.65, 67.83, 67.73, 67.34, 65.56, 63.97, 63.31, 62.36, 63.76, 65.31, 65.54, 65.47, 62.22, 63.95], '6M': [44.03, 43.65, 42.95, 44.5, 45.3, 49.65, 49.87, 53.69, 53.13, 55.09, 55.74, 56.52, 56.84, 59.75, 63.32, 64.98, 65.9, 64.43, 61.16, 64, 67.55, 64.01, 68.29, 67.34, 63.76, 63.95], '1Y': [36.98, 40.67, 38.28, 37.83, 39.23, 39.15, 39.11, 40.07, 39.25, 38.84, 38.36, 40.08, 40.63, 42.26, 42.85, 42.41, 41.81, 41.37, 39.36, 38.17, 39.63, 39.51, 44.08, 45.2, 44.31, 44.68, 43.79, 42.22, 43.16, 44.36, 45.77, 48.97, 50.87, 52.97, 53.8, 55.99, 55.74, 56.52, 56.84, 59.59, 63.71, 66.66, 66.08, 64.84, 61.66, 64.47, 67.55, 64.01, 68.29, 67.34, 63.76, 63.95] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$76B', pe: 16.9, revenueGrowth: 18, eps: 3.78, grossMargin: 59, dividendYield: 2.78,
      etfPresence: { POW: 1.18, VOLT: 1.54, PBD: false, PBW: false },
      tonyNote: 'Schneider Electric SE appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ENPH', name: 'Enphase Energy Inc', easyScore: 2, avgWeight: 0.95, proScore: 0.48, coverage: 0.5,
      price: 58.64, weeklyPrices: [72.33, 69.02, 68.39, 56.07, 58.64], weeklyChange: -18.93, sortRank: 0, periodReturns: { '1M': 60.9, '6M': 87.7, '1Y': 35.6 },
      priceHistory: { '1W': [72.33, 69.02, 68.39, 56.07, 58.64], '1M': [36.45, 37.65, 37.48, 42, 48.01, 52.89, 49.69, 46.76, 53.15, 62.34, 64.03, 66.9, 70.28, 69.5, 68.36, 63.74, 72.33, 69.02, 68.39, 56.07, 58.64], '6M': [31.24, 31.37, 33.5, 32.19, 34.69, 36.13, 40.48, 38.25, 47.27, 44.14, 46.56, 42.27, 40.23, 42.6, 44.64, 40.18, 34.92, 31.19, 32.48, 35.77, 33.85, 36.45, 52.89, 64.03, 63.74, 58.64], '1Y': [43.26, 45.93, 38.38, 40.91, 42.85, 39.03, 42.5, 33.48, 31.91, 33.56, 36.23, 37.96, 37.08, 37.12, 38.72, 37.99, 35.39, 36.27, 36.44, 37.09, 36.7, 29.01, 30.84, 27.6, 27.71, 29.39, 31.55, 31.86, 32.22, 32.05, 35.43, 35.36, 39.46, 36.98, 49.8, 43.49, 46.56, 42.27, 40.23, 44.07, 44.11, 37.84, 33.64, 31.37, 33.88, 35.24, 33.85, 36.45, 52.89, 64.03, 63.74, 58.64] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$8B', pe: 58.1, revenueGrowth: -21, eps: 1.01, grossMargin: 27, dividendYield: null,
      etfPresence: { POW: 0.8, VOLT: false, PBD: 1.1, PBW: false },
      tonyNote: 'Enphase Energy Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 0.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CEG', name: 'Constellation Energy Corp', easyScore: 2, avgWeight: 0.9, proScore: 0.45, coverage: 0.5,
      price: 253.58, weeklyPrices: [272.65, 267.24, 264.59, 254.83, 253.58], weeklyChange: -6.99, sortRank: 0, periodReturns: { '1M': -16.5, '6M': -29.1, '1Y': -15.4 },
      priceHistory: { '1W': [272.65, 267.24, 264.59, 254.83, 253.58], '1M': [303.63, 299.69, 293.6, 274.89, 275.26, 267.2, 262, 260.67, 281.26, 285.83, 294.07, 301.57, 288.68, 286.31, 287.75, 265.7, 272.65, 267.24, 264.59, 254.83, 253.58], '6M': [357.67, 357.14, 357.81, 357.12, 338.63, 330.38, 287.35, 287.45, 247.06, 276.12, 294.84, 329.88, 319.06, 301.55, 316.47, 295.19, 272.82, 286.5, 296.21, 313.53, 307.81, 303.63, 267.2, 294.07, 265.7, 253.58], '1Y': [299.66, 308.01, 320.66, 307.92, 317.11, 308.2, 317.79, 330.52, 343.57, 338.57, 317.23, 316.58, 308.48, 320, 321.27, 339.13, 329.07, 358.16, 389.56, 358.79, 384.95, 362.82, 351.67, 339.35, 351.6, 361.26, 359.15, 365.63, 361.33, 353.27, 322.54, 341.2, 289.06, 280.68, 261.42, 288.43, 294.84, 329.88, 319.06, 301.77, 281.99, 301.49, 275.16, 291.72, 287.56, 315.17, 307.81, 303.63, 267.2, 294.07, 265.7, 253.58] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$91B', pe: 22, revenueGrowth: 64, eps: 11.52, grossMargin: 23, dividendYield: 0.67,
      etfPresence: { POW: 1.35, VOLT: 0.44, PBD: false, PBW: false },
      tonyNote: 'Constellation Energy Corp appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 0.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SEDG', name: 'SolarEdge Technologies Inc', easyScore: 2, avgWeight: 0.81, proScore: 0.4, coverage: 0.5,
      price: 66.08, weeklyPrices: [78.51, 74.02, 73.14, 63.17, 66.08], weeklyChange: -15.83, sortRank: 0, periodReturns: { '1M': 60, '6M': 117.2, '1Y': 253 },
      priceHistory: { '1W': [78.51, 74.02, 73.14, 63.17, 66.08], '1M': [41.3, 41.79, 40.42, 42.77, 50.24, 61.76, 55.23, 54.53, 56.22, 63, 61.95, 70.75, 73.23, 73.19, 76.35, 75.8, 78.51, 74.02, 73.14, 63.17, 66.08], '6M': [30.43, 28.54, 30.91, 29.02, 30.52, 34.78, 34.54, 34.04, 33.28, 34.41, 37.9, 35.4, 33.41, 35.19, 45.66, 50.27, 48.75, 41.76, 38.3, 45.83, 42.91, 41.3, 61.76, 61.95, 75.8, 66.08], '1Y': [18.72, 23.98, 18.93, 21.86, 27.09, 24.96, 31.86, 24.95, 26.12, 25.1, 31.99, 32.25, 33.21, 29.42, 34.11, 37.47, 37, 35.55, 37.73, 38.77, 37.84, 31.82, 44.7, 34.8, 34.99, 31.61, 30.26, 29.48, 30.48, 28.85, 30.26, 33.84, 34.6, 30.95, 35.92, 35.53, 37.9, 35.4, 33.41, 37.44, 51.73, 51.76, 45.09, 43.21, 39.82, 47.38, 42.91, 41.3, 61.76, 61.95, 75.8, 66.08] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$4B', pe: null, revenueGrowth: 42, eps: -6.13, grossMargin: 18, dividendYield: null,
      etfPresence: { POW: 0.43, VOLT: false, PBD: 1.19, PBW: false },
      tonyNote: 'SolarEdge Technologies Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 0.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NRG', name: 'NRG Energy Inc', easyScore: 2, avgWeight: 0.75, proScore: 0.38, coverage: 0.5,
      price: 128.56, weeklyPrices: [133.51, 133.76, 133.39, 129.20, 128.56], weeklyChange: -3.7, sortRank: 0, periodReturns: { '1M': -6.9, '6M': -21.7, '1Y': -17.1 },
      priceHistory: { '1W': [133.51, 133.76, 133.39, 129.2, 128.56], '1M': [138.11, 137.3, 137.34, 131.08, 134.72, 127.81, 125.5, 123.71, 133.98, 136.92, 137.65, 140.43, 138, 137.5, 134.08, 129.47, 133.51, 133.76, 133.39, 129.2, 128.56], '6M': [164.11, 159.99, 156.96, 160.43, 148.91, 149.83, 151.09, 153.72, 144.44, 161.8, 179.18, 178.96, 154.32, 152.1, 161.4, 146.14, 152.69, 164.07, 167.73, 159.81, 153.37, 138.11, 127.81, 137.65, 129.47, 128.56], '1Y': [155.05, 153.94, 153.68, 155.96, 150.27, 144.96, 153.96, 159.87, 171.96, 156.69, 148.38, 146.23, 146.91, 161.21, 164.58, 165.58, 161.95, 162.61, 165.61, 163.59, 172.76, 167.99, 162.84, 166.45, 163.81, 166.77, 166.75, 160.15, 158.11, 159.24, 143.53, 158.5, 149.3, 152.63, 153.32, 172.35, 179.18, 178.96, 154.32, 152.87, 145.8, 147.74, 149.8, 170.24, 157.18, 160.15, 153.37, 138.11, 127.81, 137.65, 129.47, 128.56] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$27B', pe: 142.8, revenueGrowth: 20, eps: 0.9, grossMargin: 16, dividendYield: 1.47,
      etfPresence: { POW: 0.53, VOLT: 0.97, PBD: false, PBW: false },
      tonyNote: 'NRG Energy Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 0.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 5.67, proScore: 2.27, coverage: 0.4,
      price: 870.02, weeklyPrices: [875.52, 957.03, 993.74, 882.43, 870.02], weeklyChange: -0.63, sortRank: 0, periodReturns: { '1M': 3, '6M': 168, '1Y': 328.8 },
      priceHistory: { '1W': [875.52, 957.03, 993.74, 882.43, 870.02], '1M': [844.8, 868.18, 851.35, 854.28, 889.03, 848.84, 770.76, 728.29, 752, 733.77, 732.94, 783.53, 782.12, 842.96, 860.84, 845.39, 875.52, 957.03, 993.74, 882.43, 870.02], '6M': [324.62, 319.12, 313.04, 307.68, 312.24, 319.27, 364.25, 379.23, 365.07, 431.43, 435.5, 428.13, 395.11, 404.59, 431.78, 415.93, 416.34, 446.36, 463.65, 497.18, 532.67, 844.8, 848.84, 732.94, 845.39, 870.02], '1Y': [202.91, 209.55, 229.38, 222.54, 233.39, 243.23, 242.01, 264.08, 296.58, 308.4, 276.02, 292.95, 273.82, 301.13, 320.94, 344.05, 339.68, 348.57, 361.44, 364.32, 379.89, 382.57, 381.22, 333.88, 332.96, 323.46, 324.1, 319.13, 315.87, 306.23, 297.62, 336.31, 351.39, 357.91, 401.29, 437.77, 435.5, 428.13, 395.11, 398.12, 401.61, 420.24, 393.71, 459.02, 472.9, 505.45, 532.67, 844.8, 848.84, 732.94, 845.39, 870.02] },
      velocityScore: { '1D': -7.3, '1W': -33.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 77.6, revenueGrowth: 92, eps: 11.21, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 6.57, PRN: 4.77, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 5.28, proScore: 2.11, coverage: 0.4,
      price: 291.06, weeklyPrices: [299.07, 299.73, 300.06, 284.87, 291.06], weeklyChange: -2.68, sortRank: 0, periodReturns: { '1M': -5.9, '6M': 154.7, '1Y': 359 },
      priceHistory: { '1W': [299.07, 299.73, 300.06, 284.87, 291.06], '1M': [309.39, 322.05, 308.05, 300.84, 296.98, 292.65, 266.8, 261.58, 271.05, 270.75, 279.22, 291.97, 295.94, 288.9, 284.42, 288.12, 299.07, 299.73, 300.06, 284.87, 291.06], '6M': [114.29, 109.31, 112.18, 109.16, 118.62, 133.76, 142.29, 152.31, 179.6, 197.63, 182.27, 174.53, 161.22, 171.19, 175.13, 174.8, 182.6, 230.94, 241.01, 252.76, 275.33, 309.39, 292.65, 279.22, 288.12, 291.06], '1Y': [63.41, 65.05, 62.82, 70.01, 70.64, 72.53, 73.67, 77.77, 78.75, 90.06, 84.7, 91.08, 85.72, 92.33, 97.11, 97.88, 101.6, 104.42, 105.73, 116.11, 128.09, 126.71, 121.07, 107.22, 104.18, 107.83, 115.02, 110.88, 112.88, 106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 182.27, 174.53, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 275.33, 309.39, 292.65, 279.22, 288.12, 291.06] },
      velocityScore: { '1D': -19.5, '1W': -36.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 56.7, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.13,
      etfPresence: { AIRR: 2.57, PRN: false, RSHO: 7.98, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.11, proScore: 2.04, coverage: 0.4,
      price: 912.46, weeklyPrices: [909.81, 926.18, 940.48, 904.28, 912.46], weeklyChange: 0.29, sortRank: 0, periodReturns: { '1M': 1.7, '6M': 53, '1Y': 154.8 },
      priceHistory: { '1W': [909.81, 926.18, 940.48, 904.28, 912.46], '1M': [897.45, 926.79, 912.14, 902.3, 920.22, 888.31, 863.95, 860.15, 872.56, 865.95, 879.89, 908.55, 909.93, 887.67, 875.87, 865.36, 909.81, 926.18, 940.48, 904.28, 912.46], '6M': [596.5, 589.76, 582.41, 577.39, 596.52, 638.75, 648.41, 665.24, 678.31, 758.29, 759.74, 742.83, 680.9, 700.69, 688.65, 703.19, 717.22, 790.66, 794.65, 830.79, 889.67, 897.45, 888.31, 879.89, 865.36, 912.46], '1Y': [358.07, 362.44, 373.02, 390.92, 402.18, 412.88, 417.19, 430.05, 434.23, 412.71, 416.09, 431.26, 415.12, 422.91, 450.66, 469.79, 477.15, 486.71, 527.47, 524.65, 524.47, 547.58, 567.93, 546.88, 566.61, 591.49, 594.36, 588.93, 582.42, 572.87, 608.13, 647.18, 626.62, 657.36, 726.2, 774.2, 759.74, 742.83, 680.9, 693.99, 680.88, 695.4, 721.24, 791.73, 798.4, 828.79, 889.67, 897.45, 888.31, 879.89, 865.36, 912.46] },
      velocityScore: { '1D': 1.5, '1W': -34, '1M': null, '6M': null }, isNew: false,
      marketCap: '$420B', pe: 45.4, revenueGrowth: 22, eps: 20.08, grossMargin: 29, dividendYield: 0.67,
      etfPresence: { AIRR: false, PRN: 3.38, RSHO: 6.83, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.55, proScore: 1.82, coverage: 0.4,
      price: 1823.65, weeklyPrices: [1883.26, 1850.04, 1914.65, 1843.94, 1823.65], weeklyChange: -3.17, sortRank: 0, periodReturns: { '1M': -6.6, '6M': 84.3, '1Y': 263.8 },
      priceHistory: { '1W': [1883.26, 1850.04, 1914.65, 1843.94, 1823.65], '1M': [1952.37, 2032.98, 2016.31, 2034.63, 2042.36, 1992.74, 1854.43, 1825.5, 1835.51, 1835.33, 1828.25, 1883.56, 1867.09, 1855.15, 1828.21, 1787.88, 1883.26, 1850.04, 1914.65, 1843.94, 1823.65], '6M': [989.48, 968.48, 950.79, 946.93, 1035.12, 1053.1, 1131.7, 1171.46, 1147.97, 1300.02, 1462.23, 1429.37, 1279.06, 1373.76, 1444.6, 1358.66, 1417.19, 1592.84, 1650.47, 1726.12, 1867.02, 1952.37, 1992.74, 1828.25, 1787.88, 1823.65], '1Y': [501.33, 500.91, 513.32, 521.66, 535.02, 546.63, 532.14, 687.67, 691.45, 718.61, 683.93, 707.39, 700.69, 752.1, 762.91, 791.46, 825.18, 816.53, 831.89, 829.36, 980.97, 955.96, 954.53, 920.99, 957.04, 949.3, 983.61, 968.5, 965.37, 933.29, 971.49, 1091.04, 1121.44, 1142.1, 1230.26, 1337.95, 1462.23, 1429.37, 1279.06, 1365.34, 1356.75, 1366.77, 1434.09, 1627.81, 1680.09, 1794.04, 1867.02, 1952.37, 1992.74, 1828.25, 1787.88, 1823.65] },
      velocityScore: { '1D': 0.6, '1W': -34.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$64B', pe: 52.6, revenueGrowth: 1, eps: 34.67, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: 4.28, PRN: 4.82, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, avgWeight: 4.49, proScore: 1.8, coverage: 0.4,
      price: 659.09, weeklyPrices: [663.14, 686.37, 689.43, 694.72, 659.09], weeklyChange: -0.61, sortRank: 0, periodReturns: { '1M': -3.1, '6M': 106.4, '1Y': 202.4 },
      priceHistory: { '1W': [663.14, 686.37, 689.43, 694.72, 659.09], '1M': [680.26, 683.52, 681.01, 719.92, 740.91, 722.31, 664.76, 639.58, 630.5, 644.64, 656.35, 670.66, 673.51, 677.45, 667.02, 646.89, 663.14, 686.37, 689.43, 694.72, 659.09], '6M': [319.31, 317.58, 337.9, 315.44, 337.03, 317.76, 380.36, 355.51, 345.97, 413.65, 437.61, 451.25, 414.2, 459.3, 479.9, 410.85, 575.16, 603.84, 597.88, 652.99, 702.27, 680.26, 722.31, 656.35, 646.89, 659.09], '1Y': [217.97, 218.59, 214.63, 203.78, 206.63, 213.25, 205.66, 238.15, 233.13, 239.05, 213.76, 230.02, 227.03, 225.82, 239.42, 260.56, 270.05, 268.53, 300.72, 281, 292.46, 303.2, 347.88, 344.36, 373.29, 351.09, 332.87, 320.1, 333.23, 313.32, 313.98, 329.66, 363.88, 347.11, 352.09, 409.95, 437.61, 451.25, 414.2, 458.31, 473.85, 566.62, 572.31, 598.44, 611.21, 660.85, 702.27, 680.26, 722.31, 656.35, 646.89, 659.09] },
      velocityScore: { '1D': 5.3, '1W': -31.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 57.9, revenueGrowth: 50, eps: 11.39, grossMargin: 21, dividendYield: 0.29,
      etfPresence: { AIRR: 4.28, PRN: 4.7, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Argan Inc is an engineering and construction company for power generation facilities — natural gas and renewable power plants. It appears in Industrials ETFs because power plant construction is one of the fastest-growing categories in U.S. infrastructure spending, driven by data center load additions that the grid cannot currently support.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.4, proScore: 1.36, coverage: 0.4,
      price: 315.28, weeklyPrices: [308.31, 313.39, 313.67, 315.29, 315.28], weeklyChange: 2.26, sortRank: 0, periodReturns: { '1M': 2.1, '6M': 22.6, '1Y': 35.2 },
      priceHistory: { '1W': [308.31, 313.39, 313.67, 315.29, 315.28], '1M': [308.87, 310.55, 313.7, 310.87, 315.72, 307.17, 305.22, 302.64, 306.25, 305.66, 307.1, 311.33, 312.65, 308.53, 303.81, 300.98, 308.31, 313.39, 313.67, 315.29, 315.28], '6M': [257.25, 259.81, 263.48, 261.16, 260.8, 277.62, 282.33, 259.51, 287.03, 279.03, 281.97, 282.58, 267.78, 259.88, 256.58, 260.51, 267.12, 289.01, 291.03, 293.35, 302.99, 308.87, 307.17, 307.1, 300.98, 315.28], '1Y': [233.17, 230.06, 234.89, 242.14, 251.4, 255.52, 264.89, 272.4, 269.28, 270.68, 262.92, 266.99, 261.53, 263.45, 259.5, 259.37, 261.05, 252.74, 252.95, 258.78, 258.03, 256.47, 255.53, 242.61, 255.78, 260.88, 257.3, 258.47, 263.58, 256.77, 264.62, 282.47, 280.14, 260.41, 291.74, 279.84, 281.97, 282.58, 267.78, 255.65, 253.77, 260.67, 269.55, 293.26, 293.92, 298.1, 302.99, 308.87, 307.17, 307.1, 300.98, 315.28] },
      velocityScore: { '1D': 1.5, '1W': -36.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 29.8, revenueGrowth: 7, eps: 10.59, grossMargin: 30, dividendYield: 0.65,
      etfPresence: { AIRR: 1.75, PRN: false, RSHO: 5.04, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.81, proScore: 1.13, coverage: 0.4,
      price: 229.84, weeklyPrices: [230.08, 234.08, 236.14, 227.80, 229.84], weeklyChange: -0.1, sortRank: 0, periodReturns: { '1M': 13.3, '6M': 11.5, '1Y': 43.7 },
      priceHistory: { '1W': [230.08, 234.08, 236.14, 227.8, 229.84], '1M': [202.84, 203.24, 198.99, 203.79, 203.5, 200.99, 200.47, 195.79, 205.55, 205.39, 207.8, 219.08, 215.34, 213.82, 216.66, 220.92, 230.08, 234.08, 236.14, 227.8, 229.84], '6M': [206.16, 218.13, 207.18, 203.51, 208, 209.78, 217.13, 211.84, 218.02, 230.92, 242.29, 226.94, 204.62, 202.65, 202.36, 200.45, 197.29, 215.97, 223.52, 222.82, 208.13, 202.84, 200.99, 207.8, 220.92, 229.84], '1Y': [160, 155.05, 162.31, 168.95, 172.78, 175.13, 173.83, 180.24, 203.71, 191.17, 188, 192.05, 182.65, 188, 184.91, 182.39, 186.78, 188.32, 185.28, 191.84, 197.07, 213.49, 221.42, 204.36, 215.7, 209.57, 209.32, 216.89, 205.46, 200.06, 207.44, 213.61, 211.03, 208.41, 222.32, 239, 242.29, 226.94, 204.62, 199.45, 186.77, 200, 196.9, 221.27, 217.61, 222.45, 208.13, 202.84, 200.99, 207.8, 220.92, 229.84] },
      velocityScore: { '1D': -22.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 43.9, revenueGrowth: 17, eps: 5.24, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.63, PRN: false, RSHO: 4, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 2, avgWeight: 2.41, proScore: 0.96, coverage: 0.4,
      price: 250.66, weeklyPrices: [250.72, 248.63, 249.33, 251.90, 250.66], weeklyChange: -0.02, sortRank: 0, periodReturns: { '1M': -7.4, '6M': 29.4, '1Y': 45 },
      priceHistory: { '1W': [250.72, 248.63, 249.33, 251.9, 250.66], '1M': [270.56, 273.58, 269.76, 273.1, 272.37, 260.35, 256.99, 253.12, 261.21, 259.89, 256.55, 261.89, 258.02, 259.89, 258.25, 255.52, 250.72, 248.63, 249.33, 251.9, 250.66], '6M': [193.64, 197.24, 208.17, 207.81, 210.9, 220.25, 217.7, 208.93, 209.63, 244.79, 258.1, 262.53, 250.13, 243.82, 232.94, 230.51, 232.68, 252.67, 255.69, 242.44, 239.51, 270.56, 260.35, 256.55, 255.52, 250.66], '1Y': [172.87, 171.6, 176.57, 176.22, 181.42, 184.3, 183.34, 189.17, 179.32, 180.9, 171.9, 175.92, 174.49, 183.8, 185.39, 190.22, 196.23, 191.46, 193.03, 197.18, 201.04, 205.02, 208.9, 201.22, 203.68, 194.29, 191.36, 195.18, 209.57, 205.02, 210.02, 224.26, 214.89, 208.08, 223.16, 250.21, 258.1, 262.53, 250.13, 236.75, 231.21, 227.9, 236.57, 256.14, 255.62, 241.7, 239.51, 270.56, 260.35, 256.55, 255.52, 250.66] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$100B', pe: 58.2, revenueGrowth: 19, eps: 4.31, grossMargin: 35, dividendYield: 0.19,
      etfPresence: { AIRR: false, PRN: 3.27, RSHO: false, IDEF: 1.54, BILT: false },
      tonyNote: 'Howmet Aerospace is an aerospace structures and engine components manufacturer. It appears in Industrials ETFs for its aerospace and defense exposure — commercial air travel recovery and defense spending growth are the two demand drivers. Revenue grew and margins are expanding as Howmet prices power over OEM customers.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.27, proScore: 0.91, coverage: 0.4,
      price: 186.94, weeklyPrices: [187.26, 184.72, 190.76, 185.95, 186.94], weeklyChange: -0.17, sortRank: 0, periodReturns: { '1M': -9, '6M': 4.6, '1Y': 41 },
      priceHistory: { '1W': [187.26, 184.72, 190.76, 185.95, 186.94], '1M': [205.33, 210.8, 206.83, 206.83, 210.94, 204.72, 201.94, 197.33, 202.66, 202.52, 202.91, 204.38, 198.95, 199.27, 195.88, 188.39, 187.26, 184.72, 190.76, 185.95, 186.94], '6M': [178.75, 174.37, 178.41, 174.36, 192.24, 204.08, 206.33, 210.18, 187.42, 196.9, 206.44, 205.98, 195.23, 197.82, 210.12, 205.09, 214.98, 229.57, 235.78, 223.15, 216.31, 205.33, 204.72, 202.91, 188.39, 186.94], '1Y': [132.62, 139.67, 142.31, 140.37, 137.56, 139.85, 140.04, 150.28, 182, 179.51, 165.76, 166.52, 160.95, 166.13, 168.38, 175.02, 184.37, 191.39, 202.46, 205.24, 207.62, 200.39, 195.65, 175.91, 175.26, 174.71, 177.16, 173.2, 177.62, 172.84, 193.2, 213.25, 207.75, 205.43, 197.19, 200.4, 206.44, 205.98, 195.23, 194.13, 199.75, 202.59, 215.98, 232.83, 228.24, 222.07, 216.31, 205.33, 204.72, 202.91, 188.39, 186.94] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$17B', pe: 49.7, revenueGrowth: 26, eps: 3.76, grossMargin: 23, dividendYield: 0.56,
      etfPresence: { AIRR: 2.95, PRN: false, RSHO: false, IDEF: 1.58, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 2, avgWeight: 2.25, proScore: 0.9, coverage: 0.4,
      price: 32.87, weeklyPrices: [48.09, 43.13, 43.53, 32.22, 32.87], weeklyChange: -31.66, sortRank: 0, periodReturns: { '1M': -15.8, '6M': 153.8, '1Y': 463.7 },
      priceHistory: { '1W': [48.09, 43.13, 43.53, 32.22, 32.87], '1M': [39.04, 41.84, 40.68, 40.74, 43.04, 41.62, 41.61, 41.59, 42.66, 42.48, 44.35, 48.32, 50.48, 51.4, 51.14, 46.46, 48.09, 43.13, 43.53, 32.22, 32.87], '6M': [12.95, 18.05, 20.6, 19.74, 22.61, 26.73, 26.06, 26.35, 20.43, 21.3, 23.9, 24.14, 25.28, 24.97, 26.96, 32.4, 35.88, 34.67, 38.48, 35.44, 36.9, 39.04, 41.62, 44.35, 46.46, 32.87], '1Y': [5.83, 5.34, 5.57, 6.16, 6.85, 6.45, 6.6, 6.19, 6.39, 6.65, 6.38, 6.98, 6.44, 8.97, 10.23, 11.93, 12.98, 15.68, 14.78, 12.91, 12.84, 12.7, 12.47, 11.45, 11.73, 12.01, 12.84, 17.88, 20.73, 19.72, 22.44, 28.28, 26.94, 24.97, 22.26, 22.42, 23.9, 24.14, 25.28, 24.79, 33.83, 30.86, 35.02, 34.32, 37.5, 35.45, 36.9, 39.04, 41.62, 44.35, 46.46, 32.87] },
      velocityScore: { '1D': -21.7, '1W': -62, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: null, revenueGrowth: 42, eps: -1.16, grossMargin: 56, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 3.63, RSHO: false, IDEF: 0.86, BILT: false },
      tonyNote: 'Planet Labs is a satellite earth observation company. It holds a speculative position in Industrials ETFs as a data infrastructure name — providing satellite imagery and analytics that support agricultural, energy, and government decision-making. Revenue is growing from a small base; the ETF weight is minimal and the position is thematic.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 2.03, proScore: 0.81, coverage: 0.4,
      price: 58.79, weeklyPrices: [63.27, 58.43, 63.40, 58.52, 58.79], weeklyChange: -7.08, sortRank: 0, periodReturns: { '1M': 1.6, '6M': -23.7, '1Y': 44.8 },
      priceHistory: { '1W': [63.27, 58.43, 63.4, 58.52, 58.79], '1M': [57.89, 56.99, 57.33, 52.49, 54.85, 52.09, 54.22, 53.47, 55.82, 54.67, 56.18, 56.8, 57.3, 65.19, 64.13, 63.49, 63.27, 58.43, 63.4, 58.52, 58.79], '6M': [77.03, 74.26, 81.53, 75.98, 91.44, 121.5, 113.85, 108.16, 85.25, 87.05, 96.08, 86.18, 87, 89.46, 92.78, 75.86, 67.31, 70.34, 70.99, 61.26, 62.05, 57.89, 52.09, 56.18, 63.49, 58.79], '1Y': [40.59, 41.21, 40.77, 43.07, 46.02, 54.28, 55.42, 57.09, 59.4, 69.14, 64.02, 68.05, 64.5, 65.66, 75.74, 81.18, 91.37, 103.69, 95.3, 90.62, 89.78, 90.22, 76.59, 70.36, 75.05, 72.78, 77.03, 73.13, 82.3, 75.91, 104.04, 124.56, 110.39, 103.01, 94.41, 89.06, 96.08, 86.18, 87, 87.53, 84.62, 71.94, 74.09, 73.55, 69.83, 63.16, 62.05, 57.89, 52.09, 56.18, 63.49, 58.79] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$11B', pe: 345.8, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.97, PRN: false, RSHO: false, IDEF: 1.08, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.85, proScore: 0.74, coverage: 0.4,
      price: 294.24, weeklyPrices: [293.66, 287.54, 294.53, 293.04, 294.24], weeklyChange: 0.2, sortRank: 0, periodReturns: { '1M': -7, '6M': -6.9, '1Y': 29 },
      priceHistory: { '1W': [293.66, 287.54, 294.53, 293.04, 294.24], '1M': [316.28, 317.75, 333.56, 334.22, 336.95, 326.17, 329.35, 324.6, 321.92, 317.55, 320.63, 320.95, 317.56, 320.9, 308.17, 296.41, 293.66, 287.54, 294.53, 293.04, 294.24], '6M': [315.88, 329.16, 353.52, 341.98, 356.45, 415.39, 424.14, 427.83, 369.38, 406.76, 437.57, 444.52, 429.11, 414.56, 418.42, 384.79, 396.62, 394.41, 394.81, 359.29, 360.6, 316.28, 326.17, 320.63, 296.41, 294.24], '1Y': [228.07, 229.26, 231.63, 246.31, 248.92, 253.82, 253.96, 260.84, 270.92, 268, 265.4, 271.74, 269.33, 271.93, 272.46, 277.51, 287.91, 285.38, 291.94, 287.53, 299.14, 315.9, 324.19, 309.16, 314.73, 309.23, 314.95, 326.8, 354.52, 340.07, 378.47, 418.86, 418.58, 420.51, 397.77, 418.78, 437.57, 444.52, 429.11, 415.71, 407.98, 381.79, 407.66, 394.46, 392.19, 358.4, 360.6, 316.28, 326.17, 320.63, 296.41, 294.24] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$12B', pe: 19.1, revenueGrowth: 13, eps: 15.38, grossMargin: 12, dividendYield: 1.88,
      etfPresence: { AIRR: 2.66, PRN: false, RSHO: false, IDEF: 1.03, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.44, proScore: 0.58, coverage: 0.4,
      price: 594.25, weeklyPrices: [578.34, 584.18, 589.76, 590.09, 594.25], weeklyChange: 2.75, sortRank: 0, periodReturns: { '1M': -1.9, '6M': 34, '1Y': 55.9 },
      priceHistory: { '1W': [578.34, 584.18, 589.76, 590.09, 594.25], '1M': [605.99, 613.59, 613.1, 618.91, 611.93, 569.06, 551.12, 565.22, 571.05, 566.96, 559.95, 584.4, 577.42, 577.83, 571.96, 566.14, 578.34, 584.18, 589.76, 590.09, 594.25], '6M': [443.51, 462.59, 459.83, 452.89, 467.37, 489.33, 504.99, 511.98, 520.16, 550.4, 559.18, 575.92, 552.91, 547.31, 540.83, 548.95, 548.11, 598.3, 589.77, 589.51, 595.76, 605.99, 569.06, 559.95, 566.14, 594.25], '1Y': [381.22, 369.08, 388.19, 381.43, 379.82, 389.57, 392.38, 385.08, 403.78, 404.99, 397.81, 399, 383.6, 378.08, 379.79, 378.54, 390.29, 373.47, 383.98, 392.33, 408.15, 427.24, 442.47, 423.39, 442.95, 438.15, 436.5, 451.17, 457.07, 448.43, 485, 497.06, 504.07, 499.67, 544.02, 552.44, 559.18, 575.92, 552.91, 536.37, 531.11, 532.25, 552.4, 595.74, 596.86, 591, 595.76, 605.99, 569.06, 559.95, 566.14, 594.25] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$19B', pe: 65.4, revenueGrowth: 18, eps: 9.09, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.77, PRN: false, RSHO: false, IDEF: 1.11, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WMB', name: 'WMB', easyScore: 2, avgWeight: 1.38, proScore: 0.55, coverage: 0.4,
      price: 72.06, weeklyPrices: [71.31, 71.66, 72.43, 71.96, 72.06], weeklyChange: 1.05, sortRank: 0, periodReturns: { '1M': 0.1, '6M': 16.3, '1Y': 20.8 },
      priceHistory: { '1W': [71.31, 71.66, 72.43, 71.96, 72.06], '1M': [71.96, 74.18, 74.73, 75.71, 77.69, 77.72, 77.69, 79.4, 77.88, 77.52, 78.47, 76.34, 74.37, 73.13, 71.39, 70.04, 71.31, 71.66, 72.43, 71.96, 72.06], '6M': [61.95, 59.48, 58.92, 60.16, 60.39, 60.71, 63.72, 67.24, 67.42, 71.13, 72.98, 74.72, 74.24, 73.52, 74.06, 74.06, 72, 72.74, 71.15, 72.18, 75.54, 71.96, 77.72, 78.47, 70.04, 72.06], '1Y': [59.66, 59.15, 61.12, 58.72, 57.85, 58.48, 57.36, 58.89, 59, 57.76, 56.57, 57.13, 57.73, 58.76, 59.02, 62.86, 63.35, 63.97, 62.36, 62.34, 57.59, 56.51, 60.6, 59.17, 59.37, 61.55, 61.55, 58.41, 59.75, 60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 72.28, 72.98, 74.72, 74.24, 73.34, 72.41, 73.58, 72.59, 71.54, 70.91, 71.61, 75.54, 71.96, 77.72, 78.47, 70.04, 72.06] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$88B', pe: 31.6, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.92,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.95, IDEF: false, BILT: 1.81 },
      tonyNote: 'WMB appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 1.15, proScore: 0.46, coverage: 0.4,
      price: 49.06, weeklyPrices: [54.65, 51.84, 54.39, 49.44, 49.06], weeklyChange: -10.23, sortRank: 0, periodReturns: { '1M': -19.4, '6M': -25.7, '1Y': 5.1 },
      priceHistory: { '1W': [54.65, 51.84, 54.39, 49.44, 49.06], '1M': [60.84, 58.82, 62.48, 67.28, 66.02, 62.77, 66.21, 64.2, 65.76, 65.3, 64.1, 60.66, 63.52, 65.86, 57.5, 53.65, 54.65, 51.84, 54.39, 49.44, 49.06], '6M': [66.06, 68.06, 78.87, 74.62, 91.72, 108.01, 111.61, 110.93, 89.78, 78.71, 81.62, 88.11, 100.54, 98.98, 105.95, 86.01, 85.83, 82.52, 83.58, 70.22, 65.73, 60.84, 62.77, 64.1, 53.65, 49.06], '1Y': [46.68, 47.51, 48.28, 44.91, 47.57, 53.74, 51.96, 51.41, 50.39, 49.03, 49.87, 54.69, 53.26, 62.22, 64.11, 66.91, 72.2, 75.2, 77, 78.99, 85.34, 84.7, 69.38, 58.95, 64.96, 66.08, 63.75, 67.19, 79.98, 73.17, 101.28, 109.49, 108.22, 103.8, 95.36, 75.79, 81.62, 88.11, 100.54, 99.98, 99.38, 84.07, 86.1, 87.79, 82.69, 71.95, 65.73, 60.84, 62.77, 64.1, 53.65, 49.06] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$7B', pe: 213.3, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.94, PRN: false, RSHO: false, IDEF: 0.36, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.06, proScore: 0.42, coverage: 0.4,
      price: 113.06, weeklyPrices: [112.87, 111.59, 117.82, 111.27, 113.06], weeklyChange: 0.16, sortRank: 0, periodReturns: { '1M': 25.1, '6M': 57.2, '1Y': 109.9 },
      priceHistory: { '1W': [112.87, 111.59, 117.82, 111.27, 113.06], '1M': [90.34, 91.95, 92.32, 92.5, 94.55, 92.03, 93.39, 92.8, 94.81, 96.36, 98.55, 99.32, 97.11, 108.11, 111.7, 111.28, 112.87, 111.59, 117.82, 111.27, 113.06], '6M': [71.94, 74.49, 73.51, 73.85, 84.8, 98.62, 99.48, 98.29, 79.07, 80.25, 87.63, 89.03, 86.42, 81.44, 77.81, 76.16, 74.22, 79.6, 84.05, 77.99, 78.55, 90.34, 92.03, 98.55, 111.28, 113.06], '1Y': [53.87, 49.53, 49.96, 50.63, 52.4, 51.68, 51.51, 51.88, 54.24, 68.02, 64.22, 67.64, 67.47, 71.7, 73.82, 74.27, 77.4, 83.47, 77.76, 78.81, 77.6, 75.71, 72.74, 67.94, 69.05, 70.23, 71.86, 71.8, 75.07, 73.01, 88.74, 102.95, 99.05, 93.88, 82.2, 82.36, 87.63, 89.03, 86.42, 78.16, 77.26, 71.4, 75.76, 82.52, 84.12, 77.06, 78.55, 90.34, 92.03, 98.55, 111.28, 113.06] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$7B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.18, PRN: false, RSHO: false, IDEF: 0.94, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.58, proScore: 0.23, coverage: 0.4,
      price: 46.45, weeklyPrices: [47.39, 45.61, 46.71, 46.15, 46.45], weeklyChange: -1.97, sortRank: 0, periodReturns: { '1M': 12.3, '6M': 37, '1Y': 4.3 },
      priceHistory: { '1W': [47.39, 45.61, 46.71, 46.15, 46.45], '1M': [41.36, 41.49, 42.87, 42.5, 42.86, 41.5, 42.84, 42.81, 44.56, 44.55, 44.92, 45.8, 45.35, 48.41, 48.76, 47.96, 47.39, 45.61, 46.71, 46.15, 46.45], '6M': [33.92, 33.68, 34.77, 34.09, 37.2, 41.42, 41.28, 41.3, 37.27, 37.77, 40.03, 43.39, 46.58, 45.91, 45.48, 46.53, 46.3, 46.06, 44.57, 39.98, 40.03, 41.36, 41.5, 44.92, 47.96, 46.45], '1Y': [44.54, 43.66, 43.12, 45.09, 47.01, 48.01, 46.14, 48.2, 41.48, 41.87, 41.17, 41.93, 41.79, 41.14, 41.54, 42.55, 45.4, 44.72, 43.85, 40.35, 40.18, 36.15, 35.59, 34, 33.78, 33.79, 33.96, 33.12, 34.62, 34.09, 38.84, 42.26, 40.99, 41.06, 38.93, 38.13, 40.03, 43.39, 46.58, 45.3, 43.82, 44.84, 46.73, 47.43, 44.24, 40.72, 40.03, 41.36, 41.5, 44.92, 47.96, 46.45] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$12B', pe: 43.4, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.78,
      etfPresence: { AIRR: 0.86, PRN: false, RSHO: false, IDEF: 0.31, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.33, proScore: 0.13, coverage: 0.4,
      price: 70.57, weeklyPrices: [74.29, 72.26, 72.38, 70.53, 70.57], weeklyChange: -5.01, sortRank: 0, periodReturns: { '1M': -14.8, '6M': 2.9, '1Y': 74 },
      priceHistory: { '1W': [74.29, 72.26, 72.38, 70.53, 70.57], '1M': [82.85, 82.79, 82.69, 80.64, 83.01, 79.49, 75.43, 74.91, 76.99, 74.88, 72.76, 74.67, 74.47, 73.27, 71.49, 74.26, 74.29, 72.26, 72.38, 70.53, 70.57], '6M': [68.6, 67.81, 69.57, 67.92, 71.09, 73.89, 76.79, 79.86, 79.95, 81.73, 86.9, 75.37, 72.82, 69.2, 72.31, 76.24, 77.3, 83.35, 84.22, 86.76, 93.68, 82.85, 79.49, 72.76, 74.26, 70.57], '1Y': [40.56, 42.7, 44.53, 46.36, 47.45, 50.77, 48.51, 46.91, 47.66, 58.77, 56.02, 58.99, 59.03, 62.46, 63.62, 64.78, 65.59, 61.61, 63.27, 66.87, 68.4, 65.72, 62.63, 60.48, 65.16, 67.63, 68.59, 69.46, 68.65, 67.02, 70.17, 75.17, 76.01, 78.89, 83.48, 82.74, 86.9, 75.37, 72.82, 67.76, 69.34, 76.15, 77.66, 83.8, 84.38, 87.5, 93.68, 82.85, 79.49, 72.76, 74.26, 70.57] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$4B', pe: 48.3, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.34,
      etfPresence: { AIRR: 0.63, PRN: false, RSHO: false, IDEF: 0.03, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'Timken Company', easyScore: 1, avgWeight: 8.96, proScore: 1.79, coverage: 0.2,
      price: 134.12, weeklyPrices: [131.90, 131.82, 133.66, 131.83, 134.12], weeklyChange: 1.68, sortRank: 0, periodReturns: { '1M': 13.7, '6M': 60.7, '1Y': 84.7 },
      priceHistory: { '1W': [131.9, 131.82, 133.66, 131.83, 134.12], '1M': [117.97, 117.39, 117.12, 115.74, 116.74, 114.49, 112.73, 109.36, 117.2, 118.93, 119.95, 127.42, 127.16, 126.78, 127.98, 126.54, 131.9, 131.82, 133.66, 131.83, 134.12], '6M': [83.44, 87.01, 86.34, 85.81, 88.05, 91.91, 94.6, 94.15, 102.15, 107.35, 108.16, 108.38, 99.68, 99.7, 97.44, 99.06, 98.92, 106.75, 107.66, 107.2, 109, 117.97, 114.49, 119.95, 126.54, 134.12], '1Y': [72.63, 71.63, 73.62, 75.44, 77.68, 76.68, 80.02, 80.98, 74.65, 76.91, 76.88, 78.96, 75.12, 76.4, 77.11, 75.67, 75.18, 75.83, 74.28, 77.3, 77.22, 76.29, 78.2, 74.33, 81.22, 82.52, 83.16, 85.77, 86.09, 84.13, 90.6, 93.73, 93.94, 93.19, 106.04, 107.84, 108.16, 108.38, 99.68, 97.54, 95.25, 97.56, 98.94, 106.9, 108.45, 108.7, 109, 117.97, 114.49, 119.95, 126.54, 134.12] },
      velocityScore: { '1D': -0.6, '1W': -54.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 30.5, revenueGrowth: 8, eps: 4.4, grossMargin: 31, dividendYield: 1.09,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.96, IDEF: false, BILT: false },
      tonyNote: 'Timken Company appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 9.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 7.73, proScore: 1.55, coverage: 0.2,
      price: 180.79, weeklyPrices: [174.26, 172.55, 179.41, 180.99, 180.79], weeklyChange: 3.75, sortRank: 0, periodReturns: { '1M': 2.7, '6M': 5.4, '1Y': 28.2 },
      priceHistory: { '1W': [174.26, 172.55, 179.41, 180.99, 180.79], '1M': [176.09, 178.61, 178.89, 178.11, 175.68, 171.18, 175.95, 174.49, 174.85, 175.98, 177.01, 178.97, 176.59, 178.96, 179.66, 174.41, 174.26, 172.55, 179.41, 180.99, 180.79], '6M': [171.52, 182.11, 185.68, 184.01, 185.73, 198.84, 196.34, 199.88, 195.97, 201.14, 204.92, 202.62, 209.76, 203.04, 200.73, 192.85, 196.21, 201.56, 196.42, 174.26, 173.99, 176.09, 171.18, 177.01, 174.41, 180.79], '1Y': [140.98, 146.46, 141.85, 144.19, 146.18, 150.17, 149.17, 157.12, 156.33, 155.49, 153.66, 159.57, 158.11, 155, 158.31, 161.38, 167.33, 169.27, 159.4, 173.04, 178.67, 175.61, 179.22, 174.72, 172.15, 168.45, 171.93, 179.93, 185.76, 183.4, 187.17, 199.83, 195.93, 200.93, 198.66, 200.06, 204.92, 202.62, 209.76, 204.52, 198.16, 189.71, 198.41, 201.41, 195.79, 173.38, 173.99, 176.09, 171.18, 177.01, 174.41, 180.79] },
      velocityScore: { '1D': 3.3, '1W': -50.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$243B', pe: 34, revenueGrowth: 9, eps: 5.32, grossMargin: 20, dividendYield: 1.53,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 7.73, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 7.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.66, proScore: 4.66, coverage: 1,
      price: 230.19, weeklyPrices: [260.58, 251.68, 259.67, 227.81, 230.19], weeklyChange: -11.66, sortRank: 0, periodReturns: { '1M': 30, '6M': 129.4, '1Y': 337.8 },
      priceHistory: { '1W': [260.58, 251.68, 259.67, 227.81, 230.19], '1M': [177.05, 186.1, 179.11, 207.27, 221.15, 219.94, 199.86, 197.73, 191.82, 219.93, 214.77, 208.06, 208.37, 226.34, 231.09, 264.51, 260.58, 251.68, 259.67, 227.81, 230.19], '6M': [100.33, 81.14, 93.23, 85.17, 96.21, 101.98, 96.85, 94.91, 73.87, 89.73, 97.92, 91.19, 89.33, 108.04, 121.52, 105.97, 108.82, 144.97, 157.14, 147.16, 154.49, 177.05, 219.94, 214.77, 264.51, 230.19], '1Y': [52.58, 50.46, 51.02, 50.31, 46.05, 53.31, 51.01, 50.4, 55.17, 75.33, 67.19, 70.48, 65.65, 93.39, 94.08, 113.23, 112.27, 117.7, 128.15, 104.28, 121.83, 110.54, 102.22, 90.54, 88.88, 98.92, 96.41, 80.95, 90.03, 83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 98.01, 97.92, 91.19, 89.33, 112.95, 117.62, 100.82, 112.54, 154.56, 159.16, 144.96, 154.49, 177.05, 219.94, 214.77, 264.51, 230.19] },
      velocityScore: { '1D': -3.1, '1W': 9.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$58B', pe: 88.5, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 3.33, MEME: 5.53, RKNG: 5.12 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 3, avgWeight: 4.07, proScore: 4.07, coverage: 1,
      price: 94.17, weeklyPrices: [118.17, 107.73, 107.29, 93.60, 94.17], weeklyChange: -20.31, sortRank: 0, periodReturns: { '1M': 25.5, '6M': 27.3, '1Y': 170.5 },
      priceHistory: { '1W': [118.17, 107.73, 107.29, 93.6, 94.17], '1M': [75.05, 82.55, 72.96, 74.81, 83.01, 83.67, 86.83, 88.1, 89.58, 96.23, 105.86, 119.7, 129.6, 133.09, 113.41, 105.65, 118.17, 107.73, 107.29, 93.6, 94.17], '6M': [74, 67.81, 86.48, 74.68, 85.73, 95.22, 116.37, 122.09, 93.27, 82.22, 80.2, 79.19, 89.47, 87.09, 94.09, 87.86, 92.62, 94.9, 85.53, 76.4, 70.89, 75.05, 83.67, 105.86, 105.65, 94.17], '1Y': [34.82, 41.91, 53.22, 45.11, 42.5, 52.63, 57.09, 53.09, 52.57, 49.76, 44.95, 50.43, 45.22, 37.58, 41.19, 54.5, 49.08, 74.75, 94.5, 78.61, 77.77, 70.05, 67.89, 58.22, 55.51, 61.44, 72.84, 68.37, 85.67, 72.63, 90.56, 101.25, 113.57, 111.21, 101.79, 82.51, 80.2, 79.19, 89.47, 86.34, 89.93, 78.67, 94.81, 98.97, 81, 77.2, 70.89, 75.05, 83.67, 105.86, 105.65, 94.17] },
      velocityScore: { '1D': 2.3, '1W': -11.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$37B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 3.67, MEME: 5.77, RKNG: 2.77 },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 3, avgWeight: 3.66, proScore: 3.66, coverage: 1,
      price: 40.51, weeklyPrices: [47.86, 44.71, 44.15, 39.62, 40.51], weeklyChange: -15.36, sortRank: 0, periodReturns: { '1M': -1.8, '6M': 26.2, '1Y': 211.1 },
      priceHistory: { '1W': [47.86, 44.71, 44.15, 39.62, 40.51], '1M': [41.25, 44.59, 43.93, 45.48, 46.71, 42.56, 39.14, 36.62, 39.52, 48.02, 45.87, 45.14, 48.98, 49.65, 47.28, 47.94, 47.86, 44.71, 44.15, 39.62, 40.51], '6M': [32.11, 22.98, 27.78, 24.08, 29.56, 36.1, 34.74, 38.07, 27.84, 36.17, 29.04, 27.27, 25.14, 27.48, 26.7, 25.72, 24.56, 26.26, 31.53, 34.98, 33.55, 41.25, 42.56, 45.87, 47.94, 40.51], '1Y': [13.02, 11.55, 10.32, 9.76, 9.51, 10.06, 10.95, 10.12, 14.89, 14.97, 15.34, 16.47, 14.38, 16.98, 19.83, 23.45, 22.94, 27.3, 35.04, 32.54, 34.33, 31.06, 28.57, 22.84, 23.74, 29.36, 32.77, 24.24, 26.08, 24.52, 31.94, 35.22, 37.69, 33.88, 34.95, 35.28, 29.04, 27.27, 25.14, 27.05, 25.93, 23.76, 25.19, 27.6, 32.19, 33.67, 33.55, 41.25, 42.56, 45.87, 47.94, 40.51] },
      velocityScore: { '1D': -0.3, '1W': -7.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.3, MEME: 5.06, RKNG: 3.62 },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab', easyScore: 3, avgWeight: 3.58, proScore: 3.58, coverage: 1,
      price: 114.71, weeklyPrices: [123.32, 114.70, 119.95, 110.08, 114.71], weeklyChange: -6.98, sortRank: 0, periodReturns: { '1M': 8.8, '6M': 122.5, '1Y': 287 },
      priceHistory: { '1W': [123.32, 114.7, 119.95, 110.08, 114.71], '1M': [105.47, 117.35, 117.56, 124.15, 132.55, 124.77, 131.16, 127.31, 134.28, 125.45, 135.76, 143.2, 150.23, 148.03, 143.48, 122.39, 123.32, 114.7, 119.95, 110.08, 114.71], '6M': [51.56, 55.41, 77.55, 70.45, 84.08, 91.8, 87.98, 85.68, 66.32, 66.01, 70.86, 69.1, 70.11, 68.37, 71.93, 65.94, 67.73, 68.05, 84.8, 79.68, 78.81, 105.47, 124.77, 135.76, 122.39, 114.71], '1Y': [29.64, 26.55, 33.46, 34.33, 39.14, 47.69, 46.88, 43.79, 44.75, 43.43, 40.92, 48.13, 43.53, 46.17, 48.08, 48.69, 47.91, 61.51, 68.03, 65.4, 63.75, 56.57, 51.24, 42.78, 42.6, 44.72, 53.43, 55.49, 77.18, 69.76, 83.08, 90.76, 88.9, 80.07, 72.32, 67.44, 70.86, 69.1, 70.11, 68.41, 67.23, 60.93, 67.67, 70.62, 89.46, 82.29, 78.81, 105.47, 124.77, 135.76, 122.39, 114.71] },
      velocityScore: { '1D': 6.5, '1W': -13.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$72B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 1.97, MEME: 4.88, RKNG: 3.9 },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'NVTS', name: 'Navitas Semiconductor', easyScore: 2, avgWeight: 5.72, proScore: 3.82, coverage: 0.667,
      price: 25.74, weeklyPrices: [25.86, 30.84, 30.67, 25.08, 25.74], weeklyChange: -0.46, sortRank: 0, periodReturns: { '1M': 41.4, '6M': 168.1, '1Y': 252.6 },
      priceHistory: { '1W': [25.86, 30.84, 30.67, 25.08, 25.74], '1M': [18.2, 22.65, 19.25, 21.17, 22.32, 21.32, 19.67, 19.43, 22.99, 24.38, 29.25, 31.79, 28.88, 28.51, 26.6, 24.86, 25.86, 30.84, 30.67, 25.08, 25.74], '6M': [9.6, 7.96, 7.9, 7.24, 10.31, 10.04, 11.29, 9.46, 7.43, 8.37, 7.88, 9, 8.2, 9.98, 9.17, 9.02, 8.8, 9.54, 12.32, 17.28, 17.45, 18.2, 21.32, 29.25, 24.86, 25.74], '1Y': [7.3, 7.19, 7.35, 6.27, 6.43, 6.15, 8.62, 7.52, 6.77, 6.96, 6.43, 6.09, 5.73, 5.64, 6.46, 6.86, 7.22, 7.78, 12.57, 15.03, 12.83, 10.46, 9.12, 7.78, 8.03, 8.69, 9.17, 7.83, 7.66, 7.14, 10.06, 10, 10.17, 8.58, 8.86, 8.3, 7.88, 9, 8.2, 10.1, 8.75, 8.28, 8.84, 9.82, 13.2, 18.3, 17.45, 18.2, 21.32, 29.25, 24.86, 25.74] },
      velocityScore: { '1D': 2.4, '1W': -6.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.72, RKNG: 6.73 },
      tonyNote: 'Navitas Semiconductor is a small-cap wide-bandgap power semiconductor name — gallium nitride and silicon carbide for fast charging and EV applications. The $26.60 share price and small market cap position it as a speculative holding in ETFs willing to take higher-risk bets on next-generation power conversion.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 5.58, proScore: 3.72, coverage: 0.667,
      price: 1639.48, weeklyPrices: [1716.36, 1831.50, 1759.68, 1559.32, 1639.48], weeklyChange: -4.48, sortRank: 0, periodReturns: { '1M': 4.9, '6M': 627.1, '1Y': 3820.3 },
      priceHistory: { '1W': [1716.36, 1831.5, 1759.68, 1559.32, 1639.48], '1M': [1562.34, 1547.56, 1452.02, 1447.23, 1382.72, 1407.61, 1333.01, 1383.29, 1392.56, 1542.24, 1478.69, 1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1639.48], '6M': [225.47, 201.87, 241.05, 240.22, 353.56, 387.81, 503.44, 539.3, 576.2, 630.29, 649.97, 635.36, 527.33, 618.82, 772.09, 603.17, 701.59, 851.77, 920.99, 989.9, 1187, 1562.34, 1407.61, 1478.69, 1761.43, 1639.48], '1Y': [41.82, 44.21, 47.34, 44.96, 46.2, 41.36, 41.36, 42.93, 41.93, 46.83, 44.58, 47.35, 53.01, 73.92, 93.97, 99.83, 112.2, 120.95, 127.29, 149.29, 175.53, 194.57, 271.58, 244.93, 220.5, 194.38, 219.46, 209.31, 244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1187, 1562.34, 1407.61, 1478.69, 1761.43, 1639.48] },
      velocityScore: { '1D': -6.8, '1W': -17.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$243B', pe: 55.9, revenueGrowth: 251, eps: 29.32, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.21, RKNG: 5.94 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 2, avgWeight: 5.52, proScore: 3.68, coverage: 0.667,
      price: 186.22, weeklyPrices: [202.37, 184.07, 202.89, 177.00, 186.22], weeklyChange: -7.98, sortRank: 0, periodReturns: { '1M': 25, '6M': 568.9, '1Y': 1003.9 },
      priceHistory: { '1W': [202.37, 184.07, 202.89, 177, 186.22], '1M': [148.94, 184.9, 188.28, 223.1, 203.57, 190.36, 173.26, 171.33, 165.26, 176.81, 181.49, 177.62, 179.83, 169.02, 158.41, 185.67, 202.37, 184.07, 202.89, 177, 186.22], '6M': [27.84, 29.9, 39.1, 36.02, 38.06, 34.47, 38.15, 39.57, 38.13, 43.99, 51.68, 84.23, 95.58, 106.19, 101.92, 97.42, 103.91, 150.6, 159.42, 162.17, 183.51, 148.94, 190.36, 181.49, 185.67, 186.22], '1Y': [16.87, 17.09, 23.29, 25.35, 27.92, 28.99, 26.35, 24.11, 21.42, 22.79, 22.77, 25.07, 23.02, 27.72, 29.47, 26.69, 25.93, 31.33, 28.48, 33.4, 36.87, 29.5, 23.75, 20.89, 22.73, 25.65, 30.38, 28.96, 40.64, 34.86, 33.01, 37, 35.72, 43.61, 44.3, 44.46, 51.68, 84.23, 95.58, 96.81, 87.54, 98.21, 107.45, 153.19, 163.47, 145.78, 183.51, 148.94, 190.36, 181.49, 185.67, 186.22] },
      velocityScore: { '1D': -15.2, '1W': -15.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$15B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.4, RKNG: 4.63 },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 5.03, proScore: 3.35, coverage: 0.667,
      price: 260.4, weeklyPrices: [302.85, 287.32, 291.37, 263.61, 260.40], weeklyChange: -14.02, sortRank: 0, periodReturns: { '1M': -0.2, '6M': 132.9, '1Y': 1115.1 },
      priceHistory: { '1W': [302.85, 287.32, 291.37, 263.61, 260.4], '1M': [261.03, 283.92, 280.69, 289.76, 303.41, 275.95, 258.71, 261.34, 282.31, 307.88, 302.49, 302.4, 293.8, 290.01, 285, 273.51, 302.85, 287.32, 291.37, 263.61, 260.4], '6M': [111.79, 89.58, 92.26, 87.26, 108, 133.46, 145.63, 156.51, 136.6, 139.03, 147.55, 155.67, 135.19, 157.17, 166.69, 133.52, 135.63, 166.7, 207.86, 231.17, 290.52, 261.03, 275.95, 302.49, 273.51, 260.4], '1Y': [21.43, 22.91, 22.95, 22.13, 28.71, 24.69, 25.93, 34.75, 37.61, 41.25, 43.1, 49.94, 52.45, 62.96, 79.67, 69.18, 84.57, 86.06, 114.06, 104.38, 113.28, 129.05, 127.07, 104.97, 94.29, 102.5, 109.44, 87.61, 91.43, 86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 147.55, 155.67, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 290.52, 261.03, 275.95, 302.49, 273.51, 260.4] },
      velocityScore: { '1D': -0.9, '1W': -17.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$74B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.89, RKNG: 4.17 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 4.44, proScore: 2.96, coverage: 0.667,
      price: 939.54, weeklyPrices: [1064.10, 1079.57, 996.00, 864.01, 939.54], weeklyChange: -11.71, sortRank: 0, periodReturns: { '1M': 25.8, '6M': 280.5, '1Y': 746.8 },
      priceHistory: { '1W': [1064.1, 1079.57, 996, 864.01, 939.54], '1M': [746.81, 795.33, 766.58, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 939.54], '6M': [246.92, 237.5, 276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 370.3, 405.35, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 1035.5, 939.54], '1Y': [110.95, 119.84, 127.91, 120.89, 122.24, 116.43, 109.22, 111.96, 109.06, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 167.32, 185.69, 187.06, 202.29, 221.91, 218.03, 241.11, 228.5, 224.53, 234.16, 252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 542.21, 746.81, 724.66, 751, 1035.5, 939.54] },
      velocityScore: { '1D': -5.1, '1W': -11.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 44.4, revenueGrowth: 196, eps: 21.17, grossMargin: 58, dividendYield: 0.07,
      etfPresence: { BUZZ: 3.64, MEME: false, RKNG: 5.24 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 2, avgWeight: 4.25, proScore: 2.84, coverage: 0.667,
      price: 56.45, weeklyPrices: [66.60, 65.48, 61.86, 54.35, 56.45], weeklyChange: -15.24, sortRank: 0, periodReturns: { '1M': -7.8, '6M': 21.8, '1Y': 445.9 },
      priceHistory: { '1W': [66.6, 65.48, 61.86, 54.35, 56.45], '1M': [61.2, 55.15, 56.56, 55.17, 58.4, 52.94, 50.46, 47.74, 52.71, 58.06, 56.83, 59.78, 67.84, 64.05, 63.54, 65.33, 66.6, 65.48, 61.86, 54.35, 56.45], '6M': [46.34, 35.48, 42.04, 38.3, 43.63, 52.88, 52.26, 59.84, 39.79, 40.03, 39.98, 40.95, 36.7, 41.37, 41.66, 37.45, 34.77, 39.32, 48.12, 50.64, 45.66, 61.2, 52.94, 56.83, 65.33, 56.45], '1Y': [10.34, 10.4, 11.54, 15.23, 16.96, 17.31, 18.59, 15.79, 16.45, 17.83, 18.73, 22.99, 28.21, 33.63, 37.9, 47.14, 46.93, 61.68, 69.56, 55.19, 62.42, 66.63, 57.38, 48.85, 47.47, 43.96, 46.84, 36.59, 42.07, 37.77, 45.68, 51.89, 56.68, 53.74, 41.83, 42.22, 39.98, 40.95, 36.7, 41.58, 41.29, 35.09, 35.13, 43.07, 48.72, 48.36, 45.66, 61.2, 52.94, 56.83, 65.33, 56.45] },
      velocityScore: { '1D': -30, '1W': -30, '1M': null, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 73.3, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 3, MEME: 5.51, RKNG: false },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'ONDS', name: 'Ondas Holdings', easyScore: 2, avgWeight: 3.85, proScore: 2.57, coverage: 0.667,
      price: 10.68, weeklyPrices: [13.58, 11.61, 11.97, 10.43, 10.68], weeklyChange: -21.35, sortRank: 0, periodReturns: { '1M': 17.9, '6M': 18.4, '1Y': 535.7 },
      priceHistory: { '1W': [13.58, 11.61, 11.97, 10.43, 10.68], '1M': [9.06, 9.42, 9.04, 8.86, 11.21, 10.62, 9.7, 9.13, 9.36, 9.18, 9.06, 9.77, 10.8, 13.25, 13.22, 13.46, 13.58, 11.61, 11.97, 10.43, 10.68], '6M': [9.02, 7.69, 9.27, 8.99, 12.18, 13.56, 12.62, 11.27, 8.48, 8.97, 10.03, 10.08, 9.83, 10.33, 10.75, 9.44, 9.6, 9.13, 10, 10.55, 10.32, 9.06, 10.62, 9.06, 13.46, 10.68], '1Y': [1.68, 1.69, 1.59, 1.96, 1.84, 2.4, 2.1, 1.82, 3.07, 4.29, 3.59, 4.97, 5.03, 5.56, 6.1, 7.35, 7.72, 11.09, 10.41, 7.19, 6.79, 5.96, 5.8, 7.84, 8.44, 8.92, 9.23, 8.09, 8.96, 9.76, 14.01, 12.82, 12.17, 10.36, 9.69, 9.31, 10.03, 10.08, 9.83, 10.16, 10.06, 8.8, 9.52, 9.47, 10.73, 10.95, 10.32, 9.06, 10.62, 9.06, 13.46, 10.68] },
      velocityScore: { '1D': 0, '1W': -26.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: 118.7, revenueGrowth: 1080, eps: 0.09, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.09, RKNG: 2.61 },
      tonyNote: 'Ondas Holdings is a small-cap industrial automation and drone company. It appears in Meme ETFs on the autonomous systems and drone delivery narrative. Revenue is minimal and the path to profitability is unclear; the ETF allocation is speculative and reflects retail interest in autonomous systems themes.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 2, avgWeight: 3.77, proScore: 2.51, coverage: 0.667,
      price: 221.85, weeklyPrices: [229.00, 214.60, 217.50, 206.89, 221.85], weeklyChange: -3.12, sortRank: 0, periodReturns: { '1M': 17.7, '6M': 24, '1Y': 212.1 },
      priceHistory: { '1W': [229, 214.6, 217.5, 206.89, 221.85], '1M': [188.51, 210.22, 198.57, 189.36, 184.54, 172.17, 156.27, 168.99, 182.98, 193.39, 218.41, 221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 221.85], '6M': [178.94, 142.02, 149.94, 144.92, 141, 156.84, 135.1, 129.47, 98.06, 121.78, 124.06, 112.27, 109.83, 111.57, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 184.38, 188.51, 172.17, 218.41, 226.1, 221.85], '1Y': [71.09, 79.17, 91.92, 87.59, 97.59, 101.19, 92.93, 109.38, 110.29, 125.38, 106.3, 120.1, 124.77, 163.96, 164.44, 149.38, 145.61, 137.2, 129.75, 144.17, 162.18, 164.23, 158.5, 139.56, 154.18, 189.19, 170.29, 140.34, 147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.06, 112.27, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 184.38, 188.51, 172.17, 218.41, 226.1, 221.85] },
      velocityScore: { '1D': 85.9, '1W': 3.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$41B', pe: 121.9, revenueGrowth: 157, eps: 1.82, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.42, RKNG: 4.11 },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'OKLO', name: 'Oklo Inc', easyScore: 2, avgWeight: 3.67, proScore: 2.45, coverage: 0.667,
      price: 58.59, weeklyPrices: [73.47, 65.21, 65.39, 58.09, 58.59], weeklyChange: -20.25, sortRank: 0, periodReturns: { '1M': -19.2, '6M': -44, '1Y': 8 },
      priceHistory: { '1W': [73.47, 65.21, 65.39, 58.09, 58.59], '1M': [72.51, 78.13, 73.63, 69.66, 67.21, 62.25, 58.56, 55.88, 62.58, 65.09, 65.88, 68.7, 67.82, 68.09, 66.88, 66.89, 73.47, 65.21, 65.39, 58.09, 58.59], '6M': [104.61, 82.33, 83.44, 71.62, 97.6, 95.97, 90.93, 86.04, 62.14, 63.92, 63.83, 62.95, 58.25, 59.59, 54.69, 51.81, 48.13, 50.25, 66.81, 71, 70.4, 72.51, 62.25, 65.88, 66.89, 58.59], '1Y': [54.26, 65.45, 60.71, 51.74, 53.93, 64.37, 61.32, 71.01, 84.09, 78.47, 65.41, 74.31, 72.23, 73.75, 95.29, 131.17, 111.63, 134.12, 174.14, 139.44, 132.28, 112.23, 104.22, 96.63, 85.77, 96.59, 103.93, 83.51, 81.88, 71.76, 97.6, 91.45, 87.63, 79.62, 71.1, 65.69, 63.83, 62.95, 58.25, 58.37, 53.97, 50.23, 48.76, 53.94, 68.13, 75.93, 70.4, 72.51, 62.25, 65.88, 66.89, 58.59] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$10B', pe: null, revenueGrowth: 0, eps: -0.84, grossMargin: 0, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.86, RKNG: 2.48 },
      tonyNote: 'Oklo Inc appears in 2 of 3 Meme ETFs (67% coverage) with average weight 3.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RGTI', name: 'Rigetti Computing', easyScore: 2, avgWeight: 3.65, proScore: 2.43, coverage: 0.667,
      price: 21.41, weeklyPrices: [26.88, 24.09, 24.16, 20.68, 21.41], weeklyChange: -20.33, sortRank: 0, periodReturns: { '1M': 13.1, '6M': -24.2, '1Y': 89.2 },
      priceHistory: { '1W': [26.88, 24.09, 24.16, 20.68, 21.41], '1M': [18.94, 20.51, 19.07, 18.42, 19.27, 17.85, 16.62, 15.96, 16.88, 22.04, 26.42, 25.07, 24.62, 27.03, 25.54, 25.63, 26.88, 24.09, 24.16, 20.68, 21.41], '6M': [28.26, 23.53, 26.88, 22.41, 25.21, 25.72, 24.96, 19.85, 14.98, 14.99, 15.92, 17.42, 17.01, 16.07, 15.41, 14.41, 14.19, 14.68, 19.81, 16.61, 17.5, 18.94, 17.85, 26.42, 25.63, 21.41], '1Y': [11.32, 12.16, 11.5, 11.33, 13.51, 16.56, 15.43, 14.47, 16.47, 16.2, 15.16, 15.3, 15.04, 16.19, 21.99, 31.64, 29.79, 43.91, 56.12, 40, 37.07, 35.18, 31.4, 25.71, 26.08, 26.04, 28.22, 23.96, 25.11, 22.15, 25.25, 24.7, 23.45, 18.17, 17.71, 16.09, 15.92, 17.42, 17.01, 16.17, 14.88, 13.32, 14.2, 15.13, 19.64, 16.91, 17.5, 18.94, 17.85, 26.42, 25.63, 21.41] },
      velocityScore: { '1D': 12, '1W': -15.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 199, eps: -0.89, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.98, RKNG: 3.31 },
      tonyNote: 'Rigetti Computing is a quantum hardware company using superconducting qubit technology. It holds a position in Meme ETFs alongside IonQ and D-Wave as part of the quantum computing basket. Revenue is minimal, the technology is earlier-stage than IonQ, and the ETF allocation is speculative. The weight score is low; this is a high-risk, long-duration positioning.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 2, avgWeight: 3.48, proScore: 2.32, coverage: 0.667,
      price: 60.56, weeklyPrices: [71.40, 68.23, 65.66, 56.78, 60.56], weeklyChange: -15.18, sortRank: 0, periodReturns: { '1M': 23, '6M': 11.4, '1Y': 51.2 },
      priceHistory: { '1W': [71.4, 68.23, 65.66, 56.78, 60.56], '1M': [49.24, 56.89, 55.87, 55.26, 57.47, 51.95, 49.31, 48.44, 52.47, 58.89, 63.64, 63.62, 65.4, 70.14, 72.07, 69.28, 71.4, 68.23, 65.66, 56.78, 60.56], '6M': [54.36, 46.07, 53.86, 45.31, 49.78, 50.88, 49.33, 43.24, 30.43, 31.3, 31.9, 38.37, 35.73, 33.03, 31.9, 29.84, 29.3, 28.79, 46.09, 42.69, 46.2, 49.24, 51.95, 63.64, 69.28, 60.56], '1Y': [40.06, 38.43, 40.86, 40.1, 45.56, 43.54, 41.94, 40.53, 42.02, 43, 36.8, 40.75, 40.97, 43.86, 65.44, 73.86, 61.5, 79.23, 77.55, 59.5, 57.15, 53.38, 54.42, 49.12, 47.06, 48.65, 54.44, 49.67, 51.39, 44.87, 50.45, 47.56, 47.25, 39.98, 34.99, 34.11, 31.9, 38.37, 35.73, 32.98, 31.2, 27.51, 29.24, 29.76, 48.32, 43.84, 46.2, 49.24, 51.95, 63.64, 69.28, 60.56] },
      velocityScore: { '1D': null, '1W': -26.1, '1M': null, '6M': null }, isNew: true,
      marketCap: '$23B', pe: 155.3, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: 1.98, MEME: 4.98, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'SPCE', name: 'Virgin Galactic Holdings', easyScore: 1, avgWeight: 7.41, proScore: 2.47, coverage: 0.333,
      price: 4.18, weeklyPrices: [4.59, 4.29, 4.72, 4.38, 4.18], weeklyChange: -8.93, sortRank: 0, periodReturns: { '1M': 42.2, '6M': -8.1, '1Y': 19.4 },
      priceHistory: { '1W': [4.59, 4.29, 4.72, 4.38, 4.18], '1M': [2.94, 2.92, 2.79, 2.88, 2.88, 2.81, 2.58, 2.5, 2.47, 2.75, 3.24, 3.51, 3.79, 4.53, 6.18, 7.52, 4.59, 4.29, 4.72, 4.38, 4.18], '6M': [4.55, 3.02, 3.7, 3.3, 3.17, 3.09, 3.18, 2.93, 2.35, 2.55, 2.46, 2.55, 2.52, 2.51, 2.5, 2.39, 2.46, 3.02, 2.93, 2.58, 2.65, 2.94, 2.81, 3.24, 7.52, 4.18], '1Y': [3.5, 3.06, 2.94, 2.82, 2.91, 3.25, 4.03, 3.74, 3.99, 2.99, 2.97, 3.14, 3.08, 3.13, 3.25, 3.74, 3.86, 3.97, 4.65, 3.94, 4.05, 3.5, 3.64, 3.55, 3.51, 4.35, 3.81, 3.1, 3.52, 3.21, 3.15, 3.03, 3.07, 2.85, 2.53, 2.56, 2.46, 2.55, 2.52, 2.45, 2.43, 2.26, 3.07, 2.99, 2.92, 2.54, 2.65, 2.94, 2.81, 3.24, 7.52, 4.18] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$437M', pe: null, revenueGrowth: -51, eps: -3.87, grossMargin: 0, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.41, RKNG: false },
      tonyNote: 'Virgin Galactic Holdings appears in 1 of 3 Meme ETFs (33% coverage) with average weight 7.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RDW', name: 'Redwire', easyScore: 1, avgWeight: 6.67, proScore: 2.22, coverage: 0.333,
      price: 19.27, weeklyPrices: [20.58, 18.62, 21.43, 18.45, 19.27], weeklyChange: -6.37, sortRank: 0, periodReturns: { '1M': 74.1, '6M': 182.5, '1Y': -3.5 },
      priceHistory: { '1W': [20.58, 18.62, 21.43, 18.45, 19.27], '1M': [11.07, 12.16, 11.56, 11.46, 13.99, 14.06, 13.96, 13.91, 14.77, 15.35, 17.49, 22.04, 24, 25.9, 24.57, 20.68, 20.58, 18.62, 21.43, 18.45, 19.27], '6M': [6.82, 6.89, 8.52, 7.94, 9.83, 11.02, 11.98, 12.81, 8.8, 7.89, 7.99, 9.07, 8.55, 9.48, 9.63, 8.87, 9.73, 9.29, 10.34, 9.68, 9.34, 11.07, 14.06, 17.49, 20.68, 19.27], '1Y': [19.96, 20.57, 16.53, 15.31, 15.78, 17.5, 16.36, 14.46, 14.71, 9.42, 8.84, 9.29, 8.32, 8.23, 7.87, 9.35, 8.99, 10.97, 9.54, 7.97, 7.85, 6.95, 6.13, 5.43, 5.41, 5.57, 7.29, 6.59, 8.01, 7.6, 10.28, 10.86, 12.52, 11.75, 10.04, 8.02, 7.99, 9.07, 8.55, 9.59, 9.2, 8.16, 9.91, 9.99, 10.21, 9.33, 9.34, 11.07, 14.06, 17.49, 20.68, 19.27] },
      velocityScore: { '1D': 2.3, '1W': -47.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: null, revenueGrowth: 58, eps: -2.59, grossMargin: 13, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.67, RKNG: false },
      tonyNote: 'Redwire Corp is a space infrastructure company — solar arrays, structures, and manufacturing in orbit. It appears in Meme and speculative ETFs as a high-risk space economy play. Revenue is growing from a small base but the business is pre-profitability; the ETF weight is minimal and reflects thematic positioning rather than fundamental conviction.',
    },
    {
      ticker: 'QBTS', name: 'D-Wave Quantum', easyScore: 1, avgWeight: 5.42, proScore: 1.81, coverage: 0.333,
      price: 25.28, weeklyPrices: [29.91, 27.55, 27.64, 23.85, 25.28], weeklyChange: -15.48, sortRank: 0, periodReturns: { '1M': 12, '6M': -11.1, '1Y': 40.8 },
      priceHistory: { '1W': [29.91, 27.55, 27.64, 23.85, 25.28], '1M': [22.57, 24.03, 22.35, 21.44, 22.13, 20.35, 19.06, 18.19, 19.3, 25.74, 29.4, 27.82, 27.48, 29.49, 30.14, 29.18, 29.91, 27.55, 27.64, 23.85, 25.28], '6M': [28.44, 23.74, 32.19, 26.25, 30.2, 30.15, 27.43, 23.22, 17.21, 18.82, 18.06, 18.78, 18.59, 17.83, 16.1, 14.65, 14.32, 14.25, 21.69, 18.49, 20.49, 22.57, 20.35, 29.4, 29.18, 25.28], '1Y': [17.95, 16, 14.97, 14.82, 16.39, 16.91, 17.59, 17.67, 18.3, 18.51, 15.32, 15.45, 15.3, 16.04, 22.54, 27.72, 24.71, 35.72, 43.06, 32.19, 32, 29.74, 28.99, 22.93, 22.59, 25.08, 28.33, 25.52, 29.12, 26.15, 29.28, 28.72, 25.63, 21.22, 20.72, 19.67, 18.06, 18.78, 18.59, 17.55, 15.73, 13.9, 14.14, 14.65, 21.66, 18.8, 20.49, 22.57, 20.35, 29.4, 29.18, 25.28] },
      velocityScore: { '1D': 2.8, '1W': -45, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: -81, eps: -1.14, grossMargin: 66, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.42, RKNG: false },
      tonyNote: 'D-Wave Quantum is a quantum computing company — the only publicly traded business built around quantum annealing hardware. Revenue is minimal and profitability is many years away, but it holds a position in Meme ETFs as the purest-play quantum computing stock available to retail investors. The ETF weight is small and the position is purely thematic.',
    },
    {
      ticker: 'AXTI', name: 'AXT Inc', easyScore: 1, avgWeight: 5.41, proScore: 1.8, coverage: 0.333,
      price: 94.25, weeklyPrices: [110.85, 106.70, 105.99, 89.04, 94.25], weeklyChange: -14.98, sortRank: 0, periodReturns: { '1M': -19, '6M': 641.5, '1Y': 5050.3 },
      priceHistory: { '1W': [110.85, 106.7, 105.99, 89.04, 94.25], '1M': [116.36, 125.81, 122.9, 121.94, 114.98, 123.78, 105.88, 112.88, 104.61, 121.02, 140.83, 132.6, 122.77, 115.7, 103.16, 109.55, 110.85, 106.7, 105.99, 89.04, 94.25], '6M': [12.71, 14.83, 15.22, 15.8, 24.11, 22.1, 17.92, 16.38, 20.43, 24.79, 29.68, 37.9, 32.37, 46.73, 58.09, 58.51, 52.84, 64.18, 82.56, 76.16, 96, 116.36, 123.78, 140.83, 109.55, 94.25], '1Y': [1.83, 2.08, 2.02, 2.01, 2.54, 2.39, 2.35, 2.29, 2.05, 2.23, 2.14, 2.77, 3.08, 3.36, 3.94, 4.83, 4.49, 5.31, 4.57, 5.17, 6.6, 8.54, 10.56, 9.9, 9.23, 11.48, 14.96, 13, 14.64, 16.35, 25.83, 25.72, 17.4, 18.54, 24.06, 24.24, 29.68, 37.9, 32.37, 48.86, 54.24, 60.63, 41.99, 66.45, 78.76, 70.15, 96, 116.36, 123.78, 140.83, 109.55, 94.25] },
      velocityScore: { '1D': 20, '1W': -27.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: 39, eps: -0.32, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.41, RKNG: false },
      tonyNote: 'AXT Inc is a compound semiconductor substrate manufacturer — gallium arsenide, indium phosphide, and germanium wafers used in data center optical transceivers, 5G RF chips, and solar cells. Revenue is growing with optical networking demand. Small market cap but positioned at a genuine supply-chain chokepoint for III-V semiconductor materials.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 1, avgWeight: 4.66, proScore: 1.55, coverage: 0.333,
      price: 531.39, weeklyPrices: [563.10, 594.11, 575.50, 511.72, 531.39], weeklyChange: -5.63, sortRank: 0, periodReturns: { '1M': 10.7, '6M': 213, '1Y': 831.9 },
      priceHistory: { '1W': [563.1, 594.11, 575.5, 511.72, 531.39], '1M': [480, 515.83, 488.74, 494.09, 489.15, 482.02, 458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 531.39], '6M': [169.78, 172.04, 176.76, 176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 279.7, 245.25, 261.18, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 484.28, 546.2, 531.39], '1Y': [57.02, 57.41, 62.07, 63.84, 64.64, 66.53, 67.06, 70.61, 75.84, 75.91, 75.86, 79.71, 86, 95.02, 100.94, 109.69, 120.06, 119.93, 113.13, 121.41, 124.92, 152.18, 169.99, 152.86, 155.41, 155.59, 169.54, 174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 431.52, 480, 482.02, 484.28, 546.2, 531.39] },
      velocityScore: { '1D': -3.1, '1W': -37.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$183B', pe: 31.8, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.12,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.66 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
