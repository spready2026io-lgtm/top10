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
export const SPY_RET: Record<Period, number> = { '1W': 3.7, '1M': 1.8, '6M': 10.8, '1Y': 24.8 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 8.4 }, { t: 'MRVL', w: 4.6 }, { t: 'AMD', w: 4.5 }, { t: 'VRT', w: 3.6 }, { t: 'SIMO', w: 3.6 }],
  ARTY: [{ t: 'MRVL', w: 9.5 }, { t: 'MU', w: 8.0 }, { t: 'AMD', w: 7.7 }, { t: 'CRWV', w: 4.1 }, { t: 'ORCL', w: 3.6 }],
  BAI: [{ t: 'MU', w: 6.3 }, { t: 'AMD', w: 4.9 }, { t: 'LRCX', w: 4.7 }, { t: 'TSM', w: 4.2 }, { t: 'NVDA', w: 4.2 }],
  IGPT: [{ t: 'MU', w: 12.9 }, { t: 'AMD', w: 7.5 }, { t: 'INTC', w: 7.3 }, { t: 'GOOGL', w: 5.8 }, { t: 'NVDA', w: 5.6 }],
  IVES: [{ t: 'MU', w: 6.5 }, { t: 'AMD', w: 5.2 }, { t: 'TSM', w: 5.1 }, { t: 'NVDA', w: 4.8 }, { t: 'AAPL', w: 4.6 }],
  ALAI: [{ t: 'NVDA', w: 13.3 }, { t: 'AMZN', w: 5.8 }, { t: 'TSM', w: 5.7 }, { t: 'MSFT', w: 5.3 }, { t: 'GOOG', w: 5.1 }],
  CHAT: [{ t: 'NVDA', w: 6.7 }, { t: 'GOOGL', w: 5.3 }, { t: 'AMD', w: 4.1 }, { t: 'AVGO', w: 4.1 }, { t: 'MU', w: 4.1 }],
  AIFD: [{ t: 'NVDA', w: 6.4 }, { t: 'MU', w: 6.4 }, { t: 'LITE', w: 6.3 }, { t: 'MRVL', w: 6.1 }, { t: 'DOCN', w: 5.8 }],
  SPRX: [{ t: 'COHR', w: 8.7 }, { t: 'ALAB', w: 7.8 }, { t: 'ARM', w: 7.3 }, { t: 'KLAC', w: 7.2 }, { t: 'NET', w: 6.9 }],
  AOTG: [{ t: 'AMD', w: 15.5 }, { t: 'NVDA', w: 10.8 }, { t: 'MU', w: 10.4 }, { t: 'TSM', w: 7.2 }, { t: 'TOST', w: 4.7 }],
  SOXX: [{ t: 'MU', w: 11.8 }, { t: 'AMD', w: 9.1 }, { t: 'MRVL', w: 8.4 }, { t: 'INTC', w: 6.3 }, { t: 'AVGO', w: 5.5 }],
  PSI: [{ t: 'AMAT', w: 6.0 }, { t: 'KLAC', w: 5.9 }, { t: 'MU', w: 5.6 }, { t: 'LRCX', w: 5.6 }, { t: 'AMD', w: 5.0 }],
  XSD: [{ t: 'MXL', w: 5.8 }, { t: 'MRVL', w: 4.9 }, { t: 'ALAB', w: 4.5 }, { t: 'AMD', w: 3.8 }, { t: 'INTC', w: 3.8 }],
  DRAM: [{ t: 'SNDK', w: 5.8 }, { t: 'STX', w: 4.4 }, { t: 'WDC', w: 4.2 }, { t: 'MU', w: 4.0 }],
  PTF: [{ t: 'SNDK', w: 9.0 }, { t: 'WDC', w: 5.4 }, { t: 'STX', w: 5.1 }, { t: 'MU', w: 5.1 }, { t: 'NVDA', w: 4.2 }],
  WCLD: [{ t: 'DOCN', w: 3.8 }, { t: 'FROG', w: 2.9 }, { t: 'DDOG', w: 2.8 }, { t: 'PANW', w: 2.6 }, { t: 'TWLO', w: 2.5 }],
  IGV: [{ t: 'ORCL', w: 9.3 }, { t: 'PANW', w: 8.4 }, { t: 'MSFT', w: 7.8 }, { t: 'PLTR', w: 7.0 }, { t: 'CRWD', w: 6.5 }],
  FDTX: [{ t: 'MU', w: 9.4 }, { t: 'MRVL', w: 8.1 }, { t: 'TSM', w: 6.0 }, { t: 'NVDA', w: 4.6 }, { t: 'STX', w: 4.0 }],
  GTEK: [{ t: 'MRVL', w: 4.6 }, { t: 'DELL', w: 3.0 }, { t: 'CDNS', w: 2.5 }, { t: 'APH', w: 2.3 }, { t: 'NET', w: 2.0 }],
  ARKK: [{ t: 'TSLA', w: 9.4 }, { t: 'TEM', w: 4.9 }, { t: 'HOOD', w: 4.8 }, { t: 'AMD', w: 4.6 }, { t: 'CRSP', w: 4.6 }],
  MARS: [{ t: 'SPCX', w: 21.1 }, { t: 'RKLB', w: 11.5 }, { t: 'ASTS', w: 8.1 }, { t: 'PL', w: 4.5 }, { t: 'GSAT', w: 4.4 }],
  FRWD: [{ t: 'NVDA', w: 8.5 }, { t: 'STX', w: 8.1 }, { t: 'AMD', w: 7.2 }, { t: 'LRCX', w: 6.1 }, { t: 'TSM', w: 5.8 }],
  BCTK: [{ t: 'TSM', w: 8.6 }, { t: 'LRCX', w: 7.7 }, { t: 'AVGO', w: 7.3 }, { t: 'NVDA', w: 6.5 }, { t: 'GOOG', w: 5.7 }],
  FWD: [{ t: 'AMD', w: 2.0 }, { t: 'GOOGL', w: 2.0 }, { t: 'NVDA', w: 2.0 }, { t: 'AVGO', w: 1.9 }, { t: 'AMAT', w: 1.9 }],
  CBSE: [{ t: 'SCI', w: 3.4 }, { t: 'SBUX', w: 3.4 }, { t: 'KLAC', w: 3.3 }, { t: 'VG', w: 3.1 }, { t: 'LRCX', w: 3.0 }],
  FCUS: [{ t: 'SNDK', w: 4.8 }, { t: 'INTC', w: 4.7 }, { t: 'SITM', w: 4.6 }, { t: 'DELL', w: 4.3 }, { t: 'MU', w: 4.2 }],
  WGMI: [{ t: 'CIFR', w: 16.5 }, { t: 'IREN', w: 13.1 }, { t: 'WULF', w: 9.5 }, { t: 'CORZ', w: 7.6 }, { t: 'KEEL', w: 7.1 }],
  POW: [{ t: 'POWL', w: 6.7 }, { t: 'VICR', w: 5.4 }, { t: 'PWR', w: 4.8 }, { t: 'ETN', w: 4.1 }, { t: 'NVT', w: 3.9 }],
  VOLT: [{ t: 'BELFB', w: 7.9 }, { t: 'POWL', w: 7.7 }, { t: 'PWR', w: 5.5 }, { t: 'ETN', w: 5.3 }, { t: 'NEE', w: 4.9 }],
  PBD: [{ t: 'SEDG', w: 1.1 }, { t: 'FSLR', w: 1.1 }, { t: 'RIVN', w: 1.1 }],
  PBW: [{ t: 'HYLN', w: 4.5 }, { t: 'FCEL', w: 3.0 }, { t: 'NVTS', w: 3.0 }, { t: 'BE', w: 2.2 }, { t: 'ASPN', w: 2.1 }],
  IVEP: [{ t: 'BE', w: 5.0 }, { t: 'PWR', w: 4.4 }, { t: 'COHR', w: 4.3 }, { t: 'MPWR', w: 4.1 }, { t: 'VRT', w: 4.0 }],
  AIRR: [{ t: 'STRL', w: 6.3 }, { t: 'FIX', w: 4.5 }, { t: 'CHRW', w: 4.2 }, { t: 'AGX', w: 4.2 }, { t: 'SAIA', w: 4.1 }],
  PRN: [{ t: 'TTMI', w: 6.4 }, { t: 'FIX', w: 4.8 }, { t: 'STRL', w: 4.4 }, { t: 'AGX', w: 4.4 }, { t: 'VICR', w: 4.2 }],
  RSHO: [{ t: 'TKR', w: 9.3 }, { t: 'POWL', w: 7.8 }, { t: 'CGNX', w: 7.0 }, { t: 'CAT', w: 6.6 }, { t: 'GTES', w: 5.6 }],
  IDEF: [{ t: 'RTX', w: 7.9 }, { t: 'LMT', w: 7.0 }, { t: 'GD', w: 5.9 }, { t: 'BA', w: 5.1 }, { t: 'NOC', w: 5.0 }],
  BILT: [{ t: 'UNP', w: 5.7 }, { t: 'AENA', w: 4.4 }, { t: 'AEP', w: 4.3 }, { t: 'XEL', w: 3.6 }, { t: 'ETR', w: 3.5 }],
  BUZZ: [{ t: 'MU', w: 3.9 }, { t: 'ASTS', w: 3.6 }, { t: 'AMD', w: 3.3 }, { t: 'NOW', w: 3.3 }, { t: 'SOFI', w: 3.2 }],
  MEME: [{ t: 'AAOI', w: 7.1 }, { t: 'RDW', w: 6.3 }, { t: 'BE', w: 5.7 }, { t: 'ASTS', w: 5.7 }, { t: 'SNDK', w: 5.6 }],
  RKNG: [{ t: 'SNDK', w: 6.8 }, { t: 'MU', w: 5.7 }, { t: 'CRDO', w: 5.4 }, { t: 'NVTS', w: 5.3 }, { t: 'NBIS', w: 4.7 }],
};
// @@END_GENERATED:ETF_TOP_HOLDINGS@@

// @@GENERATED:TOP10_RET@@
// Top10 composite returns per theme per period (average of all ETFs in theme)
const TOP10_RET: Record<Theme, Record<Period, number>> = {
  'AI & ML':         { '1W': 9, '1M': 11.3, '6M': 53.9, '1Y': 92.7 },
  'Semiconductors':  { '1W': 14, '1M': 19.9, '6M': 114.7, '1Y': 166 },
  'Broad Tech':      { '1W': 7.9, '1M': 8.1, '6M': 33.9, '1Y': 59.7 },
  'Electrification': { '1W': 6.8, '1M': -0.3, '6M': 32.7, '1Y': 58 },
  'Industrials':     { '1W': 5.7, '1M': 3.5, '6M': 26.2, '1Y': 45.8 },
  'Meme':            { '1W': 8.6, '1M': 4.8, '6M': 31.3, '1Y': 16.2 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, Record<Period, ChartPeriodData>> = {
  'AI & ML': {
    '1W': { top10: [100, 103.22, 105.36, 109.7, 108.99], spy: [100, 101.7, 102.25, 104.05, 103.68], top10Return: 9, spyReturn: 3.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.29, 102.36, 104.74, 105.65, 109.36, 109.36, 111.44, 112.88, 116.35, 118.2, 116.76, 115.27, 106, 108.97, 106.75, 103.38, 108.38, 109.19, 114.68, 112.8], spy: [100, 99.33, 100.35, 100.55, 100.95, 101.62, 101.6, 102.16, 102.41, 102.69, 102.83, 102.11, 102.5, 99.85, 100.08, 99.78, 98.21, 99.88, 100.42, 102.19, 101.82], top10Return: 11.3, spyReturn: 1.8, xLabels: ["May 19", "May 26", "Jun 2", "Jun 9", "Jun 16"] },
    '6M': { top10: [100, 103.67, 102.03, 104.35, 106.49, 107.26, 106.37, 103, 104.67, 104.42, 105.62, 103.22, 104.1, 101.48, 96.99, 102.55, 113.03, 120.45, 125.31, 128.33, 139.97, 135.98, 147.2, 159.33, 145.22, 153.93], spy: [100, 101.34, 100.45, 101.57, 101.97, 101.53, 101.93, 101.73, 100.42, 100.52, 101.11, 99.91, 98.55, 95.54, 93.4, 97.06, 101.07, 104.4, 105.35, 105.77, 108.9, 108.81, 110.56, 111.89, 108.57, 110.79], top10Return: 53.9, spyReturn: 10.8, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.39, 103.12, 105.8, 106.76, 108.98, 111.39, 110.18, 114.55, 110.42, 112.17, 112.08, 119.91, 122.37, 124.17, 126.51, 131.15, 128.7, 127.86, 137.71, 132.2, 131.27, 122.34, 124.03, 128.81, 132.71, 121.63, 129.28, 129.07, 131.37, 133.36, 133.51, 132.6, 130.06, 130.68, 129.98, 131.87, 128.75, 129.91, 128.68, 118.39, 128.59, 144.3, 150.15, 153.34, 160.35, 174.91, 170, 184.14, 199.37, 181.72, 192.7], spy: [100, 100.68, 102.48, 103.55, 103.57, 105.23, 105.27, 104.2, 106.64, 106.16, 107.05, 106.81, 108.22, 109.37, 109.69, 110.91, 111.69, 110.37, 110.81, 114.06, 112.04, 113.33, 109.52, 112, 113.47, 114.09, 111.4, 114.55, 113.36, 115.16, 114.76, 114.94, 114.82, 114.59, 113.12, 113.23, 113.89, 112.54, 111.01, 108.74, 104.86, 109.38, 115.23, 116.82, 118.09, 119.14, 122.67, 122.56, 124.54, 126.03, 122.3, 124.8], top10Return: 92.7, spyReturn: 24.8, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Semiconductors': {
    '1W': { top10: [100, 109.69, 111.26, 117.86, 113.96], spy: [100, 101.7, 102.25, 104.05, 103.68], top10Return: 14, spyReturn: 3.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100.43, 104.85, 107.4, 109.08, 117.33, 116.36, 117.72, 116.64, 118.36, 124.05, 125.49, 122.15, 107.67, 114.13, 112.33, 108.52, 119.13, 120.78, 128.06, 123.83], spy: [100, 99.33, 100.35, 100.55, 100.95, 101.62, 101.6, 102.16, 102.41, 102.69, 102.83, 102.11, 102.5, 99.85, 100.08, 99.78, 98.21, 99.88, 100.42, 102.19, 101.82], top10Return: 19.9, spyReturn: 1.8, xLabels: ["May 19", "May 26", "Jun 2", "Jun 9", "Jun 16"] },
    '6M': { top10: [100, 103.61, 104.65, 111.25, 116.04, 117.96, 117.22, 121.29, 124.85, 123.81, 125.85, 125.4, 126.56, 129.46, 130.21, 131.33, 145.03, 154.47, 170.83, 177.5, 202.03, 187.93, 203.17, 203.88, 199.2, 214.74], spy: [100, 101.34, 100.45, 101.57, 101.97, 101.53, 101.93, 101.73, 100.42, 100.52, 101.11, 99.91, 98.55, 95.54, 93.4, 97.06, 101.07, 104.4, 105.35, 105.77, 108.9, 108.81, 110.56, 111.89, 108.57, 110.79], top10Return: 114.7, spyReturn: 10.8, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 104.14, 105.14, 110.54, 110.24, 109.8, 112.3, 111.68, 114.83, 113.27, 117.06, 114.05, 118.78, 123.65, 125.78, 128.13, 134.02, 133.33, 131.49, 140.18, 135.69, 137.89, 133.75, 139.38, 145.7, 154.74, 146.34, 149.2, 154.38, 159.29, 160.77, 158.26, 159.31, 164.64, 169.3, 166.95, 174, 166.48, 169.41, 170.25, 165.59, 179.58, 196.94, 203.27, 199.11, 215.58, 240.09, 223.64, 257.13, 261.66, 251.75, 265.97], spy: [100, 100.68, 102.48, 103.55, 103.57, 105.23, 105.27, 104.2, 106.64, 106.16, 107.05, 106.81, 108.22, 109.37, 109.69, 110.91, 111.69, 110.37, 110.81, 114.06, 112.04, 113.33, 109.52, 112, 113.47, 114.09, 111.4, 114.55, 113.36, 115.16, 114.76, 114.94, 114.82, 114.59, 113.12, 113.23, 113.89, 112.54, 111.01, 108.74, 104.86, 109.38, 115.23, 116.82, 118.09, 119.14, 122.67, 122.56, 124.54, 126.03, 122.3, 124.8], top10Return: 166, spyReturn: 24.8, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Broad Tech': {
    '1W': { top10: [100, 104.58, 104.81, 108.62, 107.92], spy: [100, 101.7, 102.25, 104.05, 103.68], top10Return: 7.9, spyReturn: 3.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.28, 101.69, 103.47, 104.94, 108.25, 108.27, 109.99, 110.67, 112.81, 114.05, 112.19, 111.87, 103.69, 105.81, 103.6, 101.07, 105.64, 106, 109.88, 109.16], spy: [100, 99.33, 100.35, 100.55, 100.95, 101.62, 101.6, 102.16, 102.41, 102.69, 102.83, 102.11, 102.5, 99.85, 100.08, 99.78, 98.21, 99.88, 100.42, 102.19, 101.82], top10Return: 8.1, spyReturn: 1.8, xLabels: ["May 19", "May 26", "Jun 2", "Jun 9", "Jun 16"] },
    '6M': { top10: [100, 102.67, 100.26, 104.2, 105.34, 106.15, 101.9, 101.03, 102.23, 101.31, 104.49, 102.44, 101.55, 98.94, 96.59, 101.46, 108.01, 114.72, 116.64, 120.78, 128.86, 122.95, 131.01, 137.87, 127.29, 133.89], spy: [100, 101.34, 100.45, 101.57, 101.97, 101.53, 101.93, 101.73, 100.42, 100.52, 101.11, 99.91, 98.55, 95.54, 93.4, 97.06, 101.07, 104.4, 105.35, 105.77, 108.9, 108.81, 110.56, 111.89, 108.57, 110.79], top10Return: 33.9, spyReturn: 10.8, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.15, 103.21, 106.11, 106.37, 108.85, 107.97, 106.14, 106.99, 105.73, 108.67, 108.11, 112.43, 116.95, 119.87, 121.8, 128.39, 131.57, 123.58, 131.36, 128.18, 125.97, 116.72, 118.92, 121.67, 123.52, 114.9, 120.58, 120.04, 123.66, 126.79, 125.98, 123.74, 121.79, 123.28, 122.71, 125.82, 122.66, 124.15, 124.31, 117.13, 125.3, 134.55, 136.26, 136.17, 142.63, 150.29, 145.18, 153.65, 162.84, 150.94, 159.69], spy: [100, 100.68, 102.48, 103.55, 103.57, 105.23, 105.27, 104.2, 106.64, 106.16, 107.05, 106.81, 108.22, 109.37, 109.69, 110.91, 111.69, 110.37, 110.81, 114.06, 112.04, 113.33, 109.52, 112, 113.47, 114.09, 111.4, 114.55, 113.36, 115.16, 114.76, 114.94, 114.82, 114.59, 113.12, 113.23, 113.89, 112.54, 111.01, 108.74, 104.86, 109.38, 115.23, 116.82, 118.09, 119.14, 122.67, 122.56, 124.54, 126.03, 122.3, 124.8], top10Return: 59.7, spyReturn: 24.8, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Electrification': {
    '1W': { top10: [100, 102.66, 104.49, 105.97, 106.8], spy: [100, 101.7, 102.25, 104.05, 103.68], top10Return: 6.8, spyReturn: 3.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 97.96, 100.32, 103.04, 104.86, 107.59, 106.94, 107.28, 106.15, 105.67, 108.47, 106.99, 107.25, 100.5, 100.29, 98.73, 95.41, 99.25, 100.41, 102.14, 102.15], spy: [100, 99.33, 100.35, 100.55, 100.95, 101.62, 101.6, 102.16, 102.41, 102.69, 102.83, 102.11, 102.5, 99.85, 100.08, 99.78, 98.21, 99.88, 100.42, 102.19, 101.82], top10Return: -0.3, spyReturn: 1.8, xLabels: ["May 19", "May 26", "Jun 2", "Jun 9", "Jun 16"] },
    '6M': { top10: [100, 101.82, 100.56, 103.66, 108.23, 110.81, 110.61, 112.37, 114.46, 115.84, 117.17, 111.11, 113.49, 111.12, 111.06, 112.84, 120.74, 125, 128.73, 132.32, 138.41, 130.82, 136.6, 137.4, 127.9, 132.73], spy: [100, 101.34, 100.45, 101.57, 101.97, 101.53, 101.93, 101.73, 100.42, 100.52, 101.11, 99.91, 98.55, 95.54, 93.4, 97.06, 101.07, 104.4, 105.35, 105.77, 108.9, 108.81, 110.56, 111.89, 108.57, 110.79], top10Return: 32.7, spyReturn: 10.8, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 99.25, 101.28, 105.04, 105.35, 109.79, 106.49, 107.95, 110.04, 110.97, 113.7, 110.03, 111.32, 115.48, 118.95, 123.41, 127.44, 134.01, 127.99, 133.76, 129.63, 132.82, 126.28, 127.61, 130.56, 133.34, 128.75, 134.11, 133.63, 134.85, 139.76, 141.95, 140.34, 142.54, 143.31, 144.12, 146.99, 142.91, 145.56, 145, 142.76, 148.87, 160.63, 163.52, 164.13, 166.62, 176.09, 168.47, 179.49, 178.99, 163.47, 170.56], spy: [100, 100.68, 102.48, 103.55, 103.57, 105.23, 105.27, 104.2, 106.64, 106.16, 107.05, 106.81, 108.22, 109.37, 109.69, 110.91, 111.69, 110.37, 110.81, 114.06, 112.04, 113.33, 109.52, 112, 113.47, 114.09, 111.4, 114.55, 113.36, 115.16, 114.76, 114.94, 114.82, 114.59, 113.12, 113.23, 113.89, 112.54, 111.01, 108.74, 104.86, 109.38, 115.23, 116.82, 118.09, 119.14, 122.67, 122.56, 124.54, 126.03, 122.3, 124.8], top10Return: 58, spyReturn: 24.8, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Industrials': {
    '1W': { top10: [100, 104.25, 104.59, 104.88, 105.68], spy: [100, 101.7, 102.25, 104.05, 103.68], top10Return: 5.7, spyReturn: 3.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.83, 100.73, 100.93, 101.85, 104.38, 104.38, 104.87, 104.19, 102.66, 104.01, 103.75, 104.74, 101.82, 101.98, 102.09, 99.34, 103.55, 103.9, 104.17, 104.97], spy: [100, 99.33, 100.35, 100.55, 100.95, 101.62, 101.6, 102.16, 102.41, 102.69, 102.83, 102.11, 102.5, 99.85, 100.08, 99.78, 98.21, 99.88, 100.42, 102.19, 101.82], top10Return: 3.5, spyReturn: 1.8, xLabels: ["May 19", "May 26", "Jun 2", "Jun 9", "Jun 16"] },
    '6M': { top10: [100, 102.46, 100.09, 105.24, 110.57, 110.45, 109.92, 115.2, 118.05, 118.8, 119.96, 114.57, 112.69, 109.34, 109.41, 113.45, 119.9, 120.98, 121.02, 121.05, 125.3, 119.99, 125.31, 124.95, 122.62, 126.25], spy: [100, 101.34, 100.45, 101.57, 101.97, 101.53, 101.93, 101.73, 100.42, 100.52, 101.11, 99.91, 98.55, 95.54, 93.4, 97.06, 101.07, 104.4, 105.35, 105.77, 108.9, 108.81, 110.56, 111.89, 108.57, 110.79], top10Return: 26.2, spyReturn: 10.8, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.71, 103.35, 105.09, 105.44, 106.9, 106.98, 107.83, 109.18, 107.4, 110.18, 108.55, 110.29, 111.4, 112.45, 114.52, 116.85, 115.68, 113.45, 118.69, 115.66, 114.76, 110.16, 112.09, 113.56, 116.36, 112.64, 118, 118.18, 123.94, 129.1, 128.59, 127.75, 134, 135.94, 136.37, 137.25, 130.79, 128.73, 128.78, 123.37, 130.37, 138.36, 138.02, 137.52, 139.17, 144.53, 138.62, 144.23, 144.11, 141.42, 145.77], spy: [100, 100.68, 102.48, 103.55, 103.57, 105.23, 105.27, 104.2, 106.64, 106.16, 107.05, 106.81, 108.22, 109.37, 109.69, 110.91, 111.69, 110.37, 110.81, 114.06, 112.04, 113.33, 109.52, 112, 113.47, 114.09, 111.4, 114.55, 113.36, 115.16, 114.76, 114.94, 114.82, 114.59, 113.12, 113.23, 113.89, 112.54, 111.01, 108.74, 104.86, 109.38, 115.23, 116.82, 118.09, 119.14, 122.67, 122.56, 124.54, 126.03, 122.3, 124.8], top10Return: 45.8, spyReturn: 24.8, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Meme': {
    '1W': { top10: [100, 106.5, 105.1, 110.98, 108.6], spy: [100, 101.7, 102.25, 104.05, 103.68], top10Return: 8.6, spyReturn: 3.7, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.45, 102.26, 108.47, 111.06, 114.79, 116.5, 118.62, 116.99, 117.19, 120.13, 115.91, 116.55, 104.59, 107.27, 103.43, 100.6, 107.16, 105.76, 111.69, 109.29], spy: [100, 99.33, 100.35, 100.55, 100.95, 101.62, 101.6, 102.16, 102.41, 102.69, 102.83, 102.11, 102.5, 99.85, 100.08, 99.78, 98.21, 99.88, 100.42, 102.19, 101.82], top10Return: 4.8, spyReturn: 1.8, xLabels: ["May 19", "May 26", "Jun 2", "Jun 9", "Jun 16"] },
    '6M': { top10: [100, 104.56, 97.74, 104.89, 105.21, 105.25, 100.19, 96.27, 93.6, 94.76, 94.93, 91.8, 94.08, 94.12, 91.88, 96.59, 107, 117.39, 115.98, 118.86, 127.21, 124.44, 139.37, 144.49, 123.52, 131.29], spy: [100, 101.34, 100.45, 101.57, 101.97, 101.53, 101.93, 101.73, 100.42, 100.52, 101.11, 99.91, 98.55, 95.54, 93.4, 97.06, 101.07, 104.4, 105.35, 105.77, 108.9, 108.81, 110.56, 111.89, 108.57, 110.79], top10Return: 31.3, spyReturn: 10.8, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.97, 100.88, 96.38, 98.08, 93.56, 94.88, 90.43, 87.35, 86.17, 86.28, 86.19, 90.49, 90.24, 88.02, 91.67, 94.45, 93.72, 92.84, 98.26, 94.92, 94.53, 89.41, 85.69, 86.77, 90.58, 85.16, 90.35, 91.06, 94.17, 94.63, 93.94, 93.95, 93.17, 90.53, 87.67, 93.25, 94.75, 101.02, 101.38, 96.49, 93.69, 101.47, 107.02, 111.33, 110.45, 119.59, 121.2, 120.7, 114.7, 113.97, 116.18], spy: [100, 100.68, 102.48, 103.55, 103.57, 105.23, 105.27, 104.2, 106.64, 106.16, 107.05, 106.81, 108.22, 109.37, 109.69, 110.91, 111.69, 110.37, 110.81, 114.06, 112.04, 113.33, 109.52, 112, 113.47, 114.09, 111.4, 114.55, 113.36, 115.16, 114.76, 114.94, 114.82, 114.59, 113.12, 113.23, 113.89, 112.54, 111.01, 108.74, 104.86, 109.38, 115.23, 116.82, 118.09, 119.14, 122.67, 122.56, 124.54, 126.03, 122.3, 124.8], top10Return: 16.2, spyReturn: 24.8, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
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
export const SCAN_TIMESTAMP    = '2026-06-16T18:28:53.141Z';
export const SCAN_TIMESTAMP_NY = 'June 16, 2026 at 2:28 PM ET';
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
  { ticker: 'MU', name: `MICRON TECHNOLOGY INC`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 14.86, bestProScore: 6.30, avgProScore: 4.95, price: 1044.91, weeklyChange: 17.16 },
  { ticker: 'NVDA', name: `NVIDIA CORP`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 11.35, bestProScore: 6.18, avgProScore: 3.78, price: 209.53, weeklyChange: 4.55 },
  { ticker: 'AMD', name: `ADVANCED MICRO DEVICES INC`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 11.20, bestProScore: 5.11, avgProScore: 3.73, price: 519.77, weeklyChange: 14.89 },
  { ticker: 'AVGO', name: `BROADCOM INC`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 5.73, bestProScore: 2.68, avgProScore: 1.91, price: 381.31, weeklyChange: 2.48 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 6.16, bestProScore: 3.34, avgProScore: 3.08, price: 293.02, weeklyChange: 16.01 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 5.36, bestProScore: 3.26, avgProScore: 2.68, price: 298.19, weeklyChange: 13.67 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 5.22, bestProScore: 3.73, avgProScore: 2.61, price: 120.08, weeklyChange: 12.18 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.75, bestProScore: 2.87, avgProScore: 2.38, price: 432.25, weeklyChange: 5.75 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.62, bestProScore: 2.33, avgProScore: 1.81, price: 373.94, weeklyChange: 16.20 },
  { ticker: 'ALAB', name: `ASTERA LABS INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 3.32, bestProScore: 1.74, avgProScore: 1.66, price: 373.81, weeklyChange: 12.98 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': 8.8, '1M': 16.9, '6M': 119.8, '1Y': 197.5 },
  ARTY: { '1W': 11, '1M': 15.7, '6M': 60.7, '1Y': 95.4 },
  BAI:  { '1W': 8.5, '1M': 8.5, '6M': 55.2, '1Y': 86 },
  IGPT: { '1W': 11.4, '1M': 15.3, '6M': 75.8, '1Y': 114.8 },
  IVES: { '1W': 5.2, '1M': 4.4, '6M': 20.4, '1Y': 44.8 },
  ALAI: { '1W': 10, '1M': 7.8, '6M': 26.7, '1Y': 56.8 },
  CHAT: { '1W': 10.4, '1M': 13.2, '6M': 65, '1Y': 109.1 },
  AIFD: { '1W': 6.1, '1M': 7.3, '6M': 48.3, '1Y': 85.6 },
  SPRX: { '1W': 11.9, '1M': 17, '6M': 52.1, '1Y': 103 },
  AOTG: { '1W': 6.5, '1M': 6.5, '6M': 15.3, '1Y': 34.1 },
  // Semiconductors
  SOXX: { '1W': 11.8, '1M': 19, '6M': 104.3, '1Y': 166.1 },
  PSI:  { '1W': 14.5, '1M': 14.9, '6M': 117.5, '1Y': 201.5 },
  XSD:  { '1W': 9.4, '1M': 10.9, '6M': 88.7, '1Y': 147.9 },
  DRAM: { '1W': 20.2, '1M': 35, '6M': 148.4, '1Y': 148.4 },
  // Broad Tech
  PTF:  { '1W': 11.2, '1M': 11.1, '6M': 75.5, '1Y': 100.6 },
  WCLD: { '1W': -1.3, '1M': 6.2, '6M': -13, '1Y': -13.9 },
  IGV:  { '1W': -0.2, '1M': -0.4, '6M': -14, '1Y': -14.9 },
  FDTX: { '1W': 9.3, '1M': 14.9, '6M': 41.4, '1Y': 52 },
  GTEK: { '1W': 7.6, '1M': 13.1, '6M': 54.2, '1Y': 73.7 },
  ARKK: { '1W': 9.7, '1M': 6.9, '6M': -0.1, '1Y': 23.3 },
  MARS: { '1W': 5.8, '1M': -5.3, '6M': 39.4, '1Y': 39.4 },
  FRWD: { '1W': 10.6, '1M': 12.1, '6M': 35.4, '1Y': 35.4 },
  BCTK: { '1W': 10.1, '1M': 9.4, '6M': 29.3, '1Y': 29.3 },
  FWD:  { '1W': 8.9, '1M': 8.4, '6M': 39.5, '1Y': 69.4 },
  CBSE: { '1W': 5, '1M': 1.9, '6M': 26.7, '1Y': 40.6 },
  FCUS: { '1W': 6.4, '1M': 2.7, '6M': 40.6, '1Y': 79.5 },
  WGMI: { '1W': 20, '1M': 24.5, '6M': 85.7, '1Y': 261.7 },
  // Electrification
  POW:  { '1W': 5.9, '1M': 1.5, '6M': 58, '1Y': 53.9 },
  VOLT: { '1W': 8.1, '1M': 1.9, '6M': 38.9, '1Y': 64.2 },
  PBD:  { '1W': 3.9, '1M': -4.1, '6M': 26.4, '1Y': 62.9 },
  PBW:  { '1W': 8.1, '1M': -1.5, '6M': 32.5, '1Y': 101.3 },
  IVEP: { '1W': 8, '1M': 0.8, '6M': 7.9, '1Y': 7.9 },
  // Industrials
  AIRR: { '1W': 7, '1M': 2.8, '6M': 31.3, '1Y': 68 },
  PRN:  { '1W': 10.5, '1M': 4.8, '6M': 44.6, '1Y': 66.6 },
  RSHO: { '1W': 8.8, '1M': 7.8, '6M': 36.1, '1Y': 60.3 },
  IDEF: { '1W': 4.9, '1M': 3.4, '6M': 9, '1Y': 21.4 },
  BILT: { '1W': -2.8, '1M': -1.3, '6M': 10.2, '1Y': 12.5 },
  // Meme
  BUZZ: { '1W': 6.3, '1M': 3.5, '6M': 15.4, '1Y': 33.5 },
  MEME: { '1W': 7.3, '1M': 1.5, '6M': 65.8, '1Y': 2.4 },
  RKNG: { '1W': 12.2, '1M': 9.5, '6M': 12.6, '1Y': 12.6 },
};
// @@END_GENERATED:ETF_RETURNS@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVDA', easyScore: 10, avgWeight: 6.18, proScore: 6.18, coverage: 1,
      price: 209.53, weeklyPrices: [200.42, 204.87, 205.19, 212.45, 209.53], weeklyChange: 4.55, sortRank: 0, periodReturns: { '1M': -7, '6M': 17.9, '1Y': 44.8 },
      priceHistory: { '1W': [200.42, 204.87, 205.19, 212.45, 209.53], '1M': [222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 209.53], '6M': [177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 222.32, 214.86, 222.82, 208.19, 209.53], '1Y': [144.69, 147.9, 153.3, 162.88, 171.37, 170.78, 179.27, 178.26, 183.16, 175.64, 181.77, 170.62, 177.33, 170.29, 176.97, 187.24, 189.11, 179.83, 180.28, 207.04, 198.69, 193.16, 181.36, 177.82, 179.59, 183.78, 170.94, 188.61, 188.85, 184.86, 186.23, 186.47, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 198.48, 219.44, 222.32, 214.86, 222.82, 208.19, 209.53] },
      velocityScore: { '1D': -0.2, '1W': 9.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.1T', pe: 32.1, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { AIS: 2.49, ARTY: 3.43, BAI: 4.18, IGPT: 5.57, IVES: 4.76, ALAI: 13.33, CHAT: 6.68, AIFD: 6.42, SPRX: 4.13, AOTG: 10.78 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'AMD', name: 'AMD', easyScore: 9, avgWeight: 5.68, proScore: 5.11, coverage: 0.9,
      price: 519.77, weeklyPrices: [452.40, 488.45, 511.57, 547.26, 519.77], weeklyChange: 14.89, sortRank: 0, periodReturns: { '1M': 22.6, '6M': 148.5, '1Y': 311.2 },
      priceHistory: { '1W': [452.4, 488.45, 511.57, 547.26, 519.77], '1M': [420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 519.77], '6M': [209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 503.89, 521.54, 475.51, 519.77], '1Y': [126.39, 138.43, 136.11, 138.41, 160.08, 158.65, 179.51, 174.31, 174.95, 166.55, 166.62, 162.13, 159.54, 159.16, 160.88, 164.01, 235.56, 238.6, 230.23, 264.33, 250.05, 237.52, 230.29, 206.13, 217.6, 221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 341.54, 458.79, 420.99, 503.89, 521.54, 475.51, 519.77] },
      velocityScore: { '1D': 0.6, '1W': 9.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$848B', pe: 172.7, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.54, ARTY: 7.69, BAI: 4.91, IGPT: 7.47, IVES: 5.23, ALAI: 1.16, CHAT: 4.13, AIFD: false, SPRX: 0.52, AOTG: 15.46 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 8, avgWeight: 7.86, proScore: 6.28, coverage: 0.8,
      price: 1044.91, weeklyPrices: [891.88, 995.87, 981.61, 1087.99, 1044.91], weeklyChange: 17.16, sortRank: 0, periodReturns: { '1M': 44.2, '6M': 349.4, '1Y': 771.9 },
      priceHistory: { '1W': [891.88, 995.87, 981.61, 1087.99, 1044.91], '1M': [681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1044.91], '6M': [232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1, 935.89, 1044.91], '1Y': [119.84, 127.91, 120.89, 122.24, 116.43, 109.83, 114.74, 109.06, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 198.47, 226.63, 218.03, 241.11, 228.5, 224.53, 234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 576.45, 795.33, 681.54, 895.88, 1064.1, 935.89, 1044.91] },
      velocityScore: { '1D': 1.9, '1W': 12.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 49.2, revenueGrowth: 196, eps: 21.22, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { AIS: 8.36, ARTY: 7.97, BAI: 6.32, IGPT: 12.88, IVES: 6.5, ALAI: false, CHAT: 4.06, AIFD: 6.38, SPRX: false, AOTG: 10.38 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 7, avgWeight: 3.83, proScore: 2.68, coverage: 0.7,
      price: 381.31, weeklyPrices: [372.10, 385.57, 382.07, 393.94, 381.31], weeklyChange: 2.48, sortRank: 0, periodReturns: { '1M': -10.3, '6M': 11.7, '1Y': 51.3 },
      priceHistory: { '1W': [372.1, 385.57, 382.07, 393.94, 381.31], '1M': [420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 381.31], '6M': [341.3, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 420.71, 422.01, 481.57, 392.16, 381.31], '1Y': [252.1, 263.77, 264.74, 277.9, 280.81, 283.69, 302.62, 292.93, 312.83, 294.91, 298.01, 302.39, 369.57, 346.17, 339.31, 333.39, 345.5, 351.33, 340.3, 385.98, 351.94, 351.96, 340.5, 385.03, 380.61, 412.97, 326.02, 350.22, 347.62, 344.97, 351.71, 324.85, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 416.5, 428.43, 420.71, 422.01, 481.57, 392.16, 381.31] },
      velocityScore: { '1D': -2.9, '1W': 6.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63.2, revenueGrowth: 48, eps: 6.03, grossMargin: 76, dividendYield: 0.66,
      etfPresence: { AIS: false, ARTY: 3.28, BAI: 4.17, IGPT: false, IVES: 4.4, ALAI: 3.99, CHAT: 4.1, AIFD: 5.32, SPRX: false, AOTG: 1.53 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'TSM', name: 'TSM', easyScore: 6, avgWeight: 4.78, proScore: 2.87, coverage: 0.6,
      price: 432.25, weeklyPrices: [408.75, 421.07, 423.93, 441.40, 432.25], weeklyChange: 5.75, sortRank: 0, periodReturns: { '1M': 6.9, '6M': 50.7, '1Y': 100.4 },
      priceHistory: { '1W': [408.75, 421.07, 423.93, 441.4, 432.25], '1M': [395.95, 392.61, 401.62, 407.15, 404.52, 412.32, 422.73, 424.86, 418.45, 435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93, 441.4, 432.25], '6M': [286.87, 296.95, 303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.04, 369.11, 348.7, 340.23, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 401.61, 404.54, 395.95, 412.32, 446.69, 427.92, 432.25], '1Y': [215.68, 220.09, 224.68, 231.84, 237.56, 240.33, 242.91, 232.47, 244.29, 232.7, 238.72, 231.39, 260.44, 262.79, 280.71, 288.47, 304.52, 304.71, 288.88, 305.09, 294.05, 291.17, 277.91, 284.68, 295.45, 310.14, 276.96, 298.8, 319.61, 323.63, 342.4, 332.71, 330.56, 348.85, 366.36, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 401.61, 404.54, 395.95, 412.32, 446.69, 427.92, 432.25] },
      velocityScore: { '1D': 0.3, '1W': 7.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.2T', pe: 37.1, revenueGrowth: 35, eps: 11.65, grossMargin: 62, dividendYield: 0.86,
      etfPresence: { AIS: 3.23, ARTY: false, BAI: 4.24, IGPT: false, IVES: 5.07, ALAI: 5.66, CHAT: false, AIFD: 3.24, SPRX: false, AOTG: 7.24 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'MRVL', name: 'MRVL', easyScore: 6, avgWeight: 4.71, proScore: 2.82, coverage: 0.6,
      price: 293.02, weeklyPrices: [252.59, 280.71, 279.70, 308.88, 293.02], weeklyChange: 16.01, sortRank: 0, periodReturns: { '1M': 65.7, '6M': 248.5, '1Y': 316.1 },
      priceHistory: { '1W': [252.59, 280.71, 279.7, 308.88, 293.02], '1M': [168.93, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 204.83, 205, 219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 293.02], '6M': [84.07, 87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 92.65, 91.58, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.84, 168.93, 208.26, 290.79, 266.88, 293.02], '1Y': [70.42, 75.21, 76.24, 72.26, 70.85, 73.27, 81.74, 76.63, 77.81, 72.07, 74.26, 62.31, 67.1, 70.98, 80.09, 83.89, 92.5, 88.89, 81.05, 90.15, 87.59, 89.33, 78.68, 83.43, 100.2, 92.47, 81.7, 86.49, 89.39, 83.22, 80.46, 81.77, 78.92, 80.28, 78.61, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 163.66, 170.84, 168.93, 208.26, 290.79, 266.88, 293.02] },
      velocityScore: { '1D': 2.5, '1W': 7.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$257B', pe: 101, revenueGrowth: 28, eps: 2.9, grossMargin: 52, dividendYield: 0.08,
      etfPresence: { AIS: 4.58, ARTY: 9.47, BAI: 1.98, IGPT: false, IVES: false, ALAI: false, CHAT: 1.65, AIFD: 6.1, SPRX: 4.46, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 4.66, proScore: 2.8, coverage: 0.6,
      price: 372.33, weeklyPrices: [356.38, 357.77, 359.68, 369.35, 372.33], weeklyChange: 4.48, sortRank: 0, periodReturns: { '1M': -6.2, '6M': 21.5, '1Y': 110.6 },
      priceHistory: { '1W': [356.38, 357.77, 359.68, 369.35, 372.33], '1M': [396.94, 387.66, 388.91, 387.66, 382.97, 388.88, 388.83, 390.13, 380.34, 376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 372.33], '6M': [306.57, 314.35, 313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 311.49, 306.52, 306.36, 305.56, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 383.25, 388.64, 396.94, 388.88, 361.85, 364.26, 372.33], '1Y': [176.77, 166.77, 175.84, 176.62, 182.97, 190.23, 196.53, 194.67, 203.34, 201.57, 207.14, 230.66, 239.17, 249.53, 247.14, 244.9, 244.62, 251.03, 251.69, 274.57, 277.54, 291.31, 284.28, 323.44, 319.63, 320.21, 296.72, 314.09, 315.15, 328.57, 330, 333.26, 338, 322.86, 305.72, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 383.25, 388.64, 396.94, 388.88, 361.85, 364.26, 372.33] },
      velocityScore: { '1D': -1.4, '1W': 4.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.5T', pe: 28.4, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.28, IGPT: 5.84, IVES: 4.49, ALAI: false, CHAT: 5.28, AIFD: 5, SPRX: false, AOTG: 4.1 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'ANET', name: 'ANET', easyScore: 6, avgWeight: 2.53, proScore: 1.52, coverage: 0.6,
      price: 168.36, weeklyPrices: [151.76, 156.40, 163.24, 169.09, 168.36], weeklyChange: 10.94, sortRank: 0, periodReturns: { '1M': 18.6, '6M': 33.5, '1Y': 77.1 },
      priceHistory: { '1W': [151.76, 156.4, 163.24, 169.09, 168.36], '1M': [141.71, 141.58, 140.49, 148.59, 154.03, 158.01, 154.31, 155.27, 159.47, 170.68, 175.33, 174.37, 166.01, 154.27, 156.4, 152.16, 151.76, 156.4, 163.24, 169.09, 168.36], '6M': [126.13, 131.32, 131.03, 123.72, 130.59, 136.34, 141.74, 137.49, 141.59, 127.43, 129.3, 137.17, 135.35, 131.22, 120.77, 126.25, 152.02, 166.85, 172.47, 172.62, 136.43, 141.71, 158.01, 175.33, 152.16, 168.36], '1Y': [95.09, 94.97, 98.91, 106.28, 108.3, 113.04, 122.09, 118.12, 141.25, 132.78, 134.27, 137.38, 150.72, 142.84, 142.64, 149.27, 157.36, 143.38, 146.59, 162.03, 153.55, 134.93, 123.45, 125.04, 127.8, 132.36, 122.36, 130.77, 133.6, 122.89, 129.83, 143.72, 141.74, 137.49, 141.59, 127.43, 129.3, 137.17, 135.35, 135.88, 116.13, 133.64, 154.37, 172.86, 165.29, 172.62, 136.43, 141.71, 158.01, 175.33, 152.16, 168.36] },
      velocityScore: { '1D': -6.7, '1W': 4.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$212B', pe: 57.9, revenueGrowth: 35, eps: 2.91, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.39, ARTY: 2, BAI: 1.38, IGPT: false, IVES: false, ALAI: false, CHAT: 2.19, AIFD: 4.91, SPRX: 3.29, AOTG: false },
      tonyNote: 'ANET appears in 6 of 10 AI & ML ETFs (60% coverage) with average weight 2.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 4.01, proScore: 2.01, coverage: 0.5,
      price: 246.34, weeklyPrices: [238.00, 241.51, 238.55, 246.02, 246.34], weeklyChange: 3.5, sortRank: 0, periodReturns: { '1M': -6.7, '6M': 10.7, '1Y': 14 },
      priceHistory: { '1W': [238, 241.51, 238.55, 246.02, 246.34], '1M': [264.86, 259.34, 265.01, 268.46, 266.32, 265.29, 271.85, 274, 270.64, 261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 244.19, 238, 241.51, 238.55, 246.02, 246.34], '6M': [222.56, 232.14, 230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 205.27, 208.39, 213.49, 211.74, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 272.05, 268.99, 264.86, 265.29, 256.52, 244.19, 246.34], '1Y': [216.1, 212.77, 220.46, 222.54, 223.19, 228.29, 230.19, 213.75, 221.47, 228.01, 228.71, 225.99, 230.33, 231.62, 220.21, 220.63, 225.22, 215.57, 217.95, 230.3, 249.32, 249.1, 222.55, 229.67, 232.38, 231.78, 221.27, 232.38, 226.5, 247.38, 239.12, 238.42, 239.3, 210.32, 198.79, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 272.05, 268.99, 264.86, 265.29, 256.52, 244.19, 246.34] },
      velocityScore: { '1D': 0.5, '1W': 3.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 31.7, revenueGrowth: 17, eps: 7.77, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 4.32, ALAI: 5.79, CHAT: 2.38, AIFD: 3.39, SPRX: false, AOTG: 4.17 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.46, proScore: 1.73, coverage: 0.5,
      price: 391.98, weeklyPrices: [397.36, 390.34, 390.74, 399.76, 391.98], weeklyChange: -1.35, sortRank: 0, periodReturns: { '1M': -7.1, '6M': -17.7, '1Y': -18.2 },
      priceHistory: { '1W': [397.36, 390.34, 390.74, 399.76, 391.98], '1M': [423.54, 417.42, 421.06, 419.09, 418.57, 416.03, 412.67, 426.99, 450.24, 460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74, 399.76, 391.98], '6M': [476.39, 486.85, 483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 384.47, 398.55, 409.41, 399.95, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 413.62, 412.66, 423.54, 416.03, 441.31, 403.41, 391.98], '1Y': [479.14, 490.11, 492.05, 503.51, 505.62, 505.87, 513.24, 527.75, 529.24, 509.77, 502.04, 505.35, 500.37, 510.02, 510.15, 519.71, 524.85, 513.43, 520.54, 541.55, 514.33, 508.68, 493.79, 476.99, 477.73, 478.56, 476.12, 488.02, 472.94, 479.28, 459.86, 470.28, 430.29, 401.14, 401.32, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 413.62, 412.66, 423.54, 416.03, 441.31, 403.41, 391.98] },
      velocityScore: { '1D': -0.6, '1W': 0.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 23.3, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 0.91,
      etfPresence: { AIS: false, ARTY: 1.65, BAI: false, IGPT: false, IVES: 4.51, ALAI: 5.27, CHAT: 2.2, AIFD: false, SPRX: false, AOTG: 3.67 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 3.25, proScore: 1.63, coverage: 0.5,
      price: 598.25, weeklyPrices: [570.98, 568.43, 566.98, 593.48, 598.25], weeklyChange: 4.78, sortRank: 0, periodReturns: { '1M': -2.6, '6M': -9, '1Y': -14.8 },
      priceHistory: { '1W': [570.98, 568.43, 566.98, 593.48, 598.25], '1M': [611.21, 602.61, 605.06, 607.38, 610.26, 612.34, 635.26, 635.29, 632.51, 600.47, 597.63, 622.98, 627.57, 593, 585.39, 584.59, 570.98, 568.43, 566.98, 593.48, 598.25], '6M': [657.15, 664.94, 660.09, 646.06, 620.8, 658.76, 716.5, 661.46, 639.77, 637.25, 653.56, 647.39, 627.45, 593.66, 525.72, 573.02, 634.53, 670.91, 678.62, 610.41, 598.86, 611.21, 612.34, 597.63, 584.59, 598.25], '1Y': [702.12, 712.2, 719.22, 732.78, 702.91, 713.58, 695.21, 763.46, 790, 751.48, 754.1, 737.05, 751.98, 775.72, 760.66, 717.34, 717.84, 717.55, 733.41, 751.67, 627.32, 627.08, 597.69, 636.22, 639.6, 650.13, 649.5, 667.55, 650.41, 653.06, 620.25, 672.36, 716.5, 661.46, 639.77, 637.25, 653.56, 647.39, 627.45, 604.06, 536.38, 575.05, 662.49, 668.84, 671.34, 610.41, 598.86, 611.21, 612.34, 597.63, 584.59, 598.25] },
      velocityScore: { '1D': 0.6, '1W': 14, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 21.8, revenueGrowth: 33, eps: 27.48, grossMargin: 82, dividendYield: 0.35,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 4.46, IVES: 4.44, ALAI: 4.13, CHAT: 2.11, AIFD: false, SPRX: false, AOTG: 1.13 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 5, avgWeight: 3.2, proScore: 1.6, coverage: 0.5,
      price: 691.92, weeklyPrices: [490.09, 529.29, 562.93, 653.53, 691.92], weeklyChange: 41.18, sortRank: 0, periodReturns: { '1M': 43.5, '6M': 296.3, '1Y': 1105.2 },
      priceHistory: { '1W': [490.09, 529.29, 562.93, 653.53, 691.92], '1M': [458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 691.92], '6M': [174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 286.21, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 458.68, 524.65, 563.1, 517.72, 691.92], '1Y': [57.41, 62.07, 63.84, 64.64, 66.53, 69.32, 71.43, 75.84, 75.91, 75.86, 79.71, 86, 95.02, 100.94, 109.69, 130.59, 121.18, 120.44, 120.47, 141.38, 152.18, 169.99, 152.86, 155.41, 155.59, 181.95, 166.26, 179.56, 187.7, 200.46, 221.51, 240.85, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 442.36, 515.83, 458.68, 524.65, 563.1, 517.72, 691.92] },
      velocityScore: { '1D': 32.2, '1W': 39.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$238B', pe: 41.4, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.09,
      etfPresence: { AIS: 1.54, ARTY: 3.12, BAI: 3.32, IGPT: 3.62, IVES: false, ALAI: 4.42, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'ALAB', name: 'ALAB', easyScore: 5, avgWeight: 3.17, proScore: 1.58, coverage: 0.5,
      price: 373.81, weeklyPrices: [330.86, 367.47, 367.15, 389.20, 373.81], weeklyChange: 12.98, sortRank: 0, periodReturns: { '1M': 60.7, '6M': 157.9, '1Y': 292.2 },
      priceHistory: { '1W': [330.86, 367.47, 367.15, 389.2, 373.81], '1M': [215.58, 244.26, 287.48, 297.84, 306.88, 318.72, 325.33, 349.17, 342.85, 320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 373.81], '6M': [144.94, 168.83, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 122.31, 127.48, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 215.58, 318.72, 355.76, 341.7, 373.81], '1Y': [95.3, 87.26, 88.66, 99.86, 91.94, 119.48, 128.87, 135.54, 192, 171.06, 178.56, 176.61, 230.37, 249.38, 205.27, 194.5, 219.36, 161.46, 154.85, 173.62, 179.31, 167.55, 139.52, 144.78, 152.5, 164.32, 140.24, 169.97, 179.56, 162.61, 182, 163.25, 150.62, 169.85, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 201.25, 207.35, 215.58, 318.72, 355.76, 341.7, 373.81] },
      velocityScore: { '1D': 1.3, '1W': 4.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$64B', pe: 252.6, revenueGrowth: 93, eps: 1.48, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 1.97, ARTY: 1.8, BAI: false, IGPT: false, IVES: false, ALAI: 1.63, CHAT: 2.68, AIFD: false, SPRX: 7.76, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'INTC', name: 'INTC', easyScore: 4, avgWeight: 3.71, proScore: 1.49, coverage: 0.4,
      price: 120.08, weeklyPrices: [107.04, 116.96, 124.57, 127.86, 120.08], weeklyChange: 12.18, sortRank: 0, periodReturns: { '1M': 10.4, '6M': 221.8, '1Y': 479 },
      priceHistory: { '1W': [107.04, 116.96, 124.57, 127.86, 120.08], '1M': [108.17, 110.8, 118.96, 118.5, 119.84, 123.52, 121.77, 120.89, 114.68, 109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 120.08], '6M': [37.31, 36.35, 36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.5, 45.58, 45.76, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.17, 123.52, 107.93, 107.92, 120.08], '1Y': [20.74, 22.55, 22.85, 23.44, 22.69, 23.49, 20.34, 20.19, 21.81, 25.31, 24.35, 24, 24.77, 24.9, 31.22, 35.94, 37.43, 37.15, 36.92, 41.34, 37.03, 37.88, 34.33, 35.83, 43.76, 40.78, 36.05, 36.16, 39.38, 45.55, 46.96, 42.49, 46.47, 50.59, 46.79, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 95.78, 129.44, 108.17, 123.52, 107.93, 107.92, 120.08] },
      velocityScore: { '1D': -2.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$604B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.3, ARTY: false, BAI: 3.03, IGPT: 7.26, IVES: false, ALAI: false, CHAT: 1.26, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 4, avgWeight: 3.61, proScore: 1.44, coverage: 0.4,
      price: 887.03, weeklyPrices: [853.26, 889.59, 921.56, 957.24, 887.03], weeklyChange: 3.96, sortRank: 0, periodReturns: { '1M': -8.6, '6M': 180.6, '1Y': 934.1 },
      priceHistory: { '1W': [853.26, 889.59, 921.56, 957.24, 887.03], '1M': [884.98, 890.09, 868.07, 964.5, 946.9, 910.81, 902.31, 860.62, 854.96, 905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 887.03], '6M': [316.15, 387.41, 368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 674.73, 783.25, 640.69, 624.84, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 884.98, 910.81, 1029.15, 821.76, 887.03], '1Y': [85.78, 91.81, 91.49, 90.44, 99.63, 102.13, 109.85, 108.15, 119.66, 117.96, 124.62, 134.12, 164.88, 163.34, 152.75, 171.4, 163.09, 156.57, 158.06, 214.28, 188.36, 252.47, 247.43, 291.27, 302.98, 366, 320.25, 395.92, 386.11, 351.42, 324.25, 332.45, 391.84, 551.99, 562.74, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 976.18, 1053.09, 884.98, 910.81, 1029.15, 821.76, 887.03] },
      velocityScore: { '1D': -4, '1W': 15.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$69B', pe: 157, revenueGrowth: 90, eps: 5.65, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.84, IGPT: false, IVES: false, ALAI: false, CHAT: 1.54, AIFD: 6.31, SPRX: 3.74, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 4 of 10 AI & ML ETFs (40% coverage) with average weight 3.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NBIS', name: 'NEBIUS GROUP NV', easyScore: 4, avgWeight: 3.04, proScore: 1.22, coverage: 0.4,
      price: 269.27, weeklyPrices: [211.69, 222.24, 232.36, 260.07, 269.27], weeklyChange: 27.2, sortRank: 0, periodReturns: { '1M': 22.4, '6M': 232.6, '1Y': 433.6 },
      priceHistory: { '1W': [211.69, 222.24, 232.36, 260.07, 269.27], '1M': [199.86, 197.73, 191.82, 219.93, 214.77, 208.06, 208.37, 226.34, 231.09, 264.51, 260.58, 251.68, 259.67, 227.81, 218, 220.12, 211.69, 222.24, 232.36, 260.07, 269.27], '6M': [80.95, 90.03, 83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 98.01, 100.61, 91.01, 94.94, 129.85, 117.62, 100.82, 112.54, 154.56, 159.16, 144.96, 176.42, 186.1, 199.86, 208.06, 260.58, 220.12, 269.27], '1Y': [50.46, 51.02, 50.31, 46.05, 53.31, 51.88, 51.29, 55.17, 75.33, 67.19, 70.48, 65.65, 93.39, 94.08, 113.23, 115.61, 122, 125.83, 98.62, 125.1, 110.54, 102.22, 90.54, 88.88, 98.92, 93.59, 75.45, 91.13, 89.95, 97.93, 108.73, 91.46, 85.19, 86.1, 98.01, 100.61, 91.01, 94.94, 129.85, 114.15, 92.26, 117.4, 161.94, 156.55, 135.51, 176.42, 186.1, 199.86, 208.06, 260.58, 220.12, 269.27] },
      velocityScore: { '1D': 2.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$68B', pe: 103.6, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 2.73, ALAI: 4.14, CHAT: 3.6, AIFD: 1.7, SPRX: false, AOTG: false },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 4, avgWeight: 2.97, proScore: 1.19, coverage: 0.4,
      price: 189.84, weeklyPrices: [201.26, 184.10, 184.13, 192.64, 189.84], weeklyChange: -5.67, sortRank: 0, periodReturns: { '1M': -1.6, '6M': 0.6, '1Y': -10.1 },
      priceHistory: { '1W': [201.26, 184.1, 184.13, 192.64, 189.84], '1M': [186.61, 181.46, 188.16, 189.77, 192.08, 193.06, 190.96, 203.7, 225.78, 248.15, 244.58, 230.33, 236.34, 213.68, 211.82, 205.81, 201.26, 184.1, 184.13, 192.64, 189.84], '6M': [188.65, 195.34, 194.91, 189.65, 189.85, 177.16, 164.58, 142.82, 160.14, 141.31, 149.25, 151.56, 155.97, 149.68, 139.66, 145.54, 155.62, 177.58, 172.96, 180.29, 193.84, 186.61, 193.06, 244.58, 205.81, 189.84], '1Y': [211.1, 215.27, 218.96, 235.81, 241.3, 241.9, 250.6, 255.67, 253.86, 234.62, 234.21, 223.45, 328.33, 301.41, 308.46, 289.01, 288.63, 303.62, 272.66, 275.3, 248.17, 236.15, 220.49, 197.03, 207.73, 223.01, 178.46, 197.49, 195.71, 198.52, 191.09, 182.44, 164.58, 142.82, 160.14, 141.31, 149.25, 151.56, 155.97, 154.34, 138.8, 143.17, 163, 181.17, 165.96, 180.29, 193.84, 186.61, 193.06, 244.58, 205.81, 189.84] },
      velocityScore: { '1D': 0, '1W': -1.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$546B', pe: 32.5, revenueGrowth: 21, eps: 5.84, grossMargin: 66, dividendYield: 1.04,
      etfPresence: { AIS: false, ARTY: 3.62, BAI: false, IGPT: false, IVES: 3.76, ALAI: false, CHAT: 1.64, AIFD: false, SPRX: false, AOTG: 2.84 },
      tonyNote: 'Oracle lands in 3 AI ETFs on the strength of its cloud database and AI infrastructure contracts. Revenue grew 22%, 67% gross margin, P/E of 40x. The 17.5% weekly return following a major earnings beat shows how quickly sentiment can reprice; the weight score at 2.04% is still modest, meaning ETF managers have started building positions but conviction is not yet deep.',
    },
    {
      ticker: 'STX', name: 'STX', easyScore: 4, avgWeight: 2.95, proScore: 1.18, coverage: 0.4,
      price: 1040.16, weeklyPrices: [815.99, 868.09, 931.04, 1018.80, 1040.16], weeklyChange: 27.47, sortRank: 0, periodReturns: { '1M': 30.8, '6M': 261, '1Y': 693.8 },
      priceHistory: { '1W': [815.99, 868.09, 931.04, 1018.8, 1040.16], '1M': [740.84, 733.35, 751.07, 810.46, 812.73, 845.76, 870.66, 880.72, 879.8, 921.26, 926.61, 940.69, 925.99, 847.47, 876.77, 846.01, 815.99, 868.09, 931.04, 1018.8, 1040.16], '6M': [288.13, 282.8, 275.39, 284.47, 320.32, 346.1, 407.69, 429.32, 425.99, 407.4, 379.52, 374.33, 398.78, 411.23, 380.07, 453.3, 513.28, 539.75, 595.86, 738.54, 834.01, 740.84, 845.76, 926.61, 846.01, 1040.16], '1Y': [131.04, 136.31, 145.04, 142.01, 147.12, 152.76, 147.42, 151.74, 155.59, 157.93, 165.24, 176.32, 193.04, 213.36, 223.7, 256.84, 224.35, 219.38, 215.05, 265.62, 250.38, 288, 253.86, 261.89, 258.67, 298.92, 277.65, 285.27, 287.54, 304.01, 326.23, 358.29, 407.69, 429.32, 425.99, 407.4, 379.52, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 579.03, 738.54, 834.01, 740.84, 845.76, 926.61, 846.01, 1040.16] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$233B', pe: 99.2, revenueGrowth: 44, eps: 10.49, grossMargin: 42, dividendYield: 0.29,
      etfPresence: { AIS: 2.71, ARTY: 3.32, BAI: false, IGPT: 3.63, IVES: false, ALAI: 2.14, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'VRT', name: 'VRT', easyScore: 4, avgWeight: 2.88, proScore: 1.15, coverage: 0.4,
      price: 308.06, weeklyPrices: [280.98, 297.88, 302.87, 311.93, 308.06], weeklyChange: 9.64, sortRank: 0, periodReturns: { '1M': -17, '6M': 91.7, '1Y': 164.5 },
      priceHistory: { '1W': [280.98, 297.88, 302.87, 311.93, 308.06], '1M': [339.73, 322.63, 315.67, 323.4, 327.46, 323.91, 319.78, 314.18, 315.71, 323.39, 334.49, 331.44, 323.92, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87, 311.93, 308.06], '6M': [160.66, 166.26, 162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 245.42, 257.75, 264.35, 264.74, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 330.97, 367.92, 339.73, 323.91, 334.49, 289.52, 308.06], '1Y': [116.45, 122.32, 122.54, 128.37, 125.4, 130.19, 144.17, 138.76, 143.72, 129.05, 127.93, 125.59, 136.74, 136.83, 141.62, 161.59, 167.38, 180.51, 171.59, 199.27, 180.82, 179.05, 164.86, 169.57, 178.88, 181.82, 149.83, 166.87, 175.61, 163.58, 176.93, 181.23, 186.18, 195.58, 234.53, 245.42, 257.75, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 330.97, 367.92, 339.73, 323.91, 334.49, 289.52, 308.06] },
      velocityScore: { '1D': null, '1W': -12.9, '1M': null, '6M': null }, isNew: true,
      marketCap: '$118B', pe: 77.2, revenueGrowth: 30, eps: 3.99, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.63, ARTY: false, BAI: 1.82, IGPT: false, IVES: false, ALAI: false, CHAT: 2.15, AIFD: 3.93, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'CRWV', name: 'COREWEAVE INC CLASS A', easyScore: 4, avgWeight: 2.56, proScore: 1.02, coverage: 0.4,
      price: 118.53, weeklyPrices: [95.61, 95.74, 100.55, 106.71, 118.53], weeklyChange: 23.97, sortRank: 0, periodReturns: { '1M': 10.5, '6M': 70.5, '1Y': -25.2 },
      priceHistory: { '1W': [95.61, 95.74, 100.55, 106.71, 118.53], '1M': [103.77, 99.81, 101.28, 107.58, 105.49, 105.89, 104.27, 106.86, 109.53, 124.82, 119.27, 110.93, 108.03, 100.39, 102.37, 98.45, 95.61, 95.74, 100.55, 106.71, 118.53], '6M': [69.5, 80.26, 71.61, 77.09, 95.01, 92.98, 93.19, 89.95, 96.04, 90.84, 78.05, 74.41, 85.86, 81.47, 74.81, 80.94, 110.27, 117.43, 112.06, 125.43, 114.7, 103.77, 105.89, 119.27, 98.45, 118.53], '1Y': [158.5, 172.62, 155.94, 153.05, 143.04, 126.05, 102.89, 111.84, 148.75, 92.89, 91.39, 89.88, 117.14, 120.86, 133.4, 137.05, 139.98, 139.24, 121.53, 139.93, 115.75, 88.39, 74.9, 71.29, 79.36, 88.16, 64.55, 78.87, 79.32, 80.14, 101.23, 98.31, 93.19, 89.95, 96.04, 90.84, 78.05, 74.41, 85.86, 81.96, 69.15, 85.24, 117.2, 115.16, 105.53, 125.43, 114.7, 103.77, 105.89, 119.27, 98.45, 118.53] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$65B', pe: null, revenueGrowth: 112, eps: -2.72, grossMargin: 69, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 4.07, BAI: 1.28, IGPT: false, IVES: 2.17, ALAI: false, CHAT: 2.71, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'COREWEAVE INC CLASS A appears in 4 of 10 AI & ML ETFs (40% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 6.3, proScore: 6.3, coverage: 1,
      price: 1044.91, weeklyPrices: [891.88, 995.87, 981.61, 1087.99, 1044.91], weeklyChange: 17.16, sortRank: 0, periodReturns: { '1M': 44.2, '6M': 349.4, '1Y': 771.9 },
      priceHistory: { '1W': [891.88, 995.87, 981.61, 1087.99, 1044.91], '1M': [681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1044.91], '6M': [232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1, 935.89, 1044.91], '1Y': [119.84, 127.91, 120.89, 122.24, 116.43, 109.83, 114.74, 109.06, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 198.47, 226.63, 218.03, 241.11, 228.5, 224.53, 234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 576.45, 795.33, 681.54, 895.88, 1064.1, 935.89, 1044.91] },
      velocityScore: { '1D': 4.8, '1W': 2.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 49.2, revenueGrowth: 196, eps: 21.22, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { SOXX: 11.79, PSI: 5.62, XSD: 3.75, DRAM: 4.05 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.99, proScore: 4.49, coverage: 0.75,
      price: 519.77, weeklyPrices: [452.40, 488.45, 511.57, 547.26, 519.77], weeklyChange: 14.89, sortRank: 0, periodReturns: { '1M': 22.6, '6M': 148.5, '1Y': 311.2 },
      priceHistory: { '1W': [452.4, 488.45, 511.57, 547.26, 519.77], '1M': [420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 519.77], '6M': [209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 503.89, 521.54, 475.51, 519.77], '1Y': [126.39, 138.43, 136.11, 138.41, 160.08, 158.65, 179.51, 174.31, 174.95, 166.55, 166.62, 162.13, 159.54, 159.16, 160.88, 164.01, 235.56, 238.6, 230.23, 264.33, 250.05, 237.52, 230.29, 206.13, 217.6, 221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 341.54, 458.79, 420.99, 503.89, 521.54, 475.51, 519.77] },
      velocityScore: { '1D': 1.8, '1W': 0.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$848B', pe: 172.7, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 9.11, PSI: 5.02, XSD: 3.84, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.97, proScore: 3.73, coverage: 0.75,
      price: 120.08, weeklyPrices: [107.04, 116.96, 124.57, 127.86, 120.08], weeklyChange: 12.18, sortRank: 0, periodReturns: { '1M': 10.4, '6M': 221.8, '1Y': 479 },
      priceHistory: { '1W': [107.04, 116.96, 124.57, 127.86, 120.08], '1M': [108.17, 110.8, 118.96, 118.5, 119.84, 123.52, 121.77, 120.89, 114.68, 109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 120.08], '6M': [37.31, 36.35, 36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.5, 45.58, 45.76, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.17, 123.52, 107.93, 107.92, 120.08], '1Y': [20.74, 22.55, 22.85, 23.44, 22.69, 23.49, 20.34, 20.19, 21.81, 25.31, 24.35, 24, 24.77, 24.9, 31.22, 35.94, 37.43, 37.15, 36.92, 41.34, 37.03, 37.88, 34.33, 35.83, 43.76, 40.78, 36.05, 36.16, 39.38, 45.55, 46.96, 42.49, 46.47, 50.59, 46.79, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 95.78, 129.44, 108.17, 123.52, 107.93, 107.92, 120.08] },
      velocityScore: { '1D': -1.8, '1W': 5.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$604B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.27, PSI: 4.79, XSD: 3.84, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 3.86, proScore: 2.9, coverage: 0.75,
      price: 209.53, weeklyPrices: [200.42, 204.87, 205.19, 212.45, 209.53], weeklyChange: 4.55, sortRank: 0, periodReturns: { '1M': -7, '6M': 17.9, '1Y': 44.8 },
      priceHistory: { '1W': [200.42, 204.87, 205.19, 212.45, 209.53], '1M': [222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 209.53], '6M': [177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 222.32, 214.86, 222.82, 208.19, 209.53], '1Y': [144.69, 147.9, 153.3, 162.88, 171.37, 170.78, 179.27, 178.26, 183.16, 175.64, 181.77, 170.62, 177.33, 170.29, 176.97, 187.24, 189.11, 179.83, 180.28, 207.04, 198.69, 193.16, 181.36, 177.82, 179.59, 183.78, 170.94, 188.61, 188.85, 184.86, 186.23, 186.47, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 198.48, 219.44, 222.32, 214.86, 222.82, 208.19, 209.53] },
      velocityScore: { '1D': -1.4, '1W': -8.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.1T', pe: 32.1, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { SOXX: 5.36, PSI: 4.58, XSD: 1.65, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.11, proScore: 2.34, coverage: 0.75,
      price: 423.87, weeklyPrices: [392.67, 412.13, 417.79, 427.58, 423.87], weeklyChange: 7.95, sortRank: 0, periodReturns: { '1M': 1.5, '6M': 52.3, '1Y': 82.9 },
      priceHistory: { '1W': [392.67, 412.13, 417.79, 427.58, 423.87], '1M': [418.58, 414.31, 398.05, 384.21, 397.07, 419.94, 416.88, 419.01, 413.85, 402.69, 423.2, 437.67, 428.76, 401.39, 403.89, 404.62, 392.67, 412.13, 417.79, 427.58, 423.87], '6M': [278.4, 276.73, 271.2, 299.16, 302.1, 305.6, 310.88, 320.45, 337.1, 355.15, 352.41, 319.71, 310.92, 309.43, 307.44, 327.36, 350.01, 381.05, 392.59, 397.02, 422.73, 418.58, 419.94, 423.2, 404.62, 423.87], '1Y': [231.8, 234.98, 240.64, 242.72, 240.61, 228.08, 231.11, 220.68, 232.04, 230.44, 255.63, 244.55, 247.21, 246.32, 248.61, 239.28, 237.93, 238.15, 240.36, 235.04, 229.38, 233.41, 230.13, 252.02, 278.24, 281.57, 271.04, 277.56, 273.74, 300.93, 300.25, 304.01, 310.88, 320.45, 337.1, 355.15, 352.41, 319.71, 310.92, 312.19, 303.1, 327.41, 348.6, 375.27, 383.26, 397.02, 422.73, 418.58, 419.94, 423.2, 404.62, 423.87] },
      velocityScore: { '1D': -2.1, '1W': -4.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$206B', pe: 63.2, revenueGrowth: 37, eps: 6.71, grossMargin: 64, dividendYield: 1.03,
      etfPresence: { SOXX: 2.69, PSI: 4.72, XSD: 1.93, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.1% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 6.69, proScore: 3.34, coverage: 0.5,
      price: 293.02, weeklyPrices: [252.59, 280.71, 279.70, 308.88, 293.02], weeklyChange: 16.01, sortRank: 0, periodReturns: { '1M': 65.7, '6M': 248.5, '1Y': 316.1 },
      priceHistory: { '1W': [252.59, 280.71, 279.7, 308.88, 293.02], '1M': [168.93, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 204.83, 205, 219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 293.02], '6M': [84.07, 87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 92.65, 91.58, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.84, 168.93, 208.26, 290.79, 266.88, 293.02], '1Y': [70.42, 75.21, 76.24, 72.26, 70.85, 73.27, 81.74, 76.63, 77.81, 72.07, 74.26, 62.31, 67.1, 70.98, 80.09, 83.89, 92.5, 88.89, 81.05, 90.15, 87.59, 89.33, 78.68, 83.43, 100.2, 92.47, 81.7, 86.49, 89.39, 83.22, 80.46, 81.77, 78.92, 80.28, 78.61, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 163.66, 170.84, 168.93, 208.26, 290.79, 266.88, 293.02] },
      velocityScore: { '1D': 5, '1W': -1.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$257B', pe: 101, revenueGrowth: 28, eps: 2.9, grossMargin: 52, dividendYield: 0.08,
      etfPresence: { SOXX: 8.45, PSI: false, XSD: 4.93, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 5.6, proScore: 2.8, coverage: 0.5,
      price: 579.6, weeklyPrices: [497.01, 552.64, 567.25, 585.78, 579.60], weeklyChange: 16.62, sortRank: 0, periodReturns: { '1M': 32.7, '6M': 123.9, '1Y': 228.3 },
      priceHistory: { '1W': [497.01, 552.64, 567.25, 585.78, 579.6], '1M': [413.57, 406.91, 426.85, 427.36, 432.16, 454.89, 448.25, 449.68, 450.06, 458.17, 490.05, 500.77, 501.7, 453.01, 492.17, 499.21, 497.01, 552.64, 567.25, 585.78, 579.6], '6M': [258.84, 260.23, 256.99, 281.64, 319.08, 322.38, 322.32, 322.51, 354.91, 373.55, 372.18, 338.94, 346.18, 357.06, 337.17, 352.62, 395.73, 391.62, 404.86, 391.38, 443.62, 413.57, 454.89, 490.05, 499.21, 579.6], '1Y': [176.55, 180.18, 183.76, 195.39, 194.81, 187.01, 189.39, 179.15, 188.45, 162.22, 164.51, 156.25, 163.42, 178.13, 201.44, 217.74, 217.51, 227.58, 220.56, 235.75, 230.19, 228.67, 225.12, 242.46, 268.63, 275.15, 248.27, 260.78, 268.87, 301.18, 327.01, 319.46, 322.32, 322.51, 354.91, 373.55, 372.18, 338.94, 346.18, 361.79, 323.12, 354.31, 395.64, 394.33, 381.11, 391.38, 443.62, 413.57, 454.89, 490.05, 499.21, 579.6] },
      velocityScore: { '1D': -1.4, '1W': 5.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$460B', pe: 54.7, revenueGrowth: 11, eps: 10.6, grossMargin: 49, dividendYield: 0.36,
      etfPresence: { SOXX: 5.24, PSI: 5.96, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 4.83, proScore: 2.42, coverage: 0.5,
      price: 242.18, weeklyPrices: [213.56, 241.16, 254.54, 256.42, 242.18], weeklyChange: 13.4, sortRank: 0, periodReturns: { '1M': 34.2, '6M': 98, '1Y': 171.4 },
      priceHistory: { '1W': [213.56, 241.16, 254.54, 256.42, 242.18], '1M': [175.65, 174.06, 182.95, 184.22, 188.84, 201.14, 195.72, 192.76, 192.17, 194, 204.52, 212.51, 213.11, 192.92, 210.81, 213.94, 213.56, 241.16, 254.54, 256.42, 242.18], '6M': [122.34, 126.88, 121.51, 132.46, 154.5, 151.28, 142.79, 144.29, 146.41, 148.77, 153.49, 142.91, 143.82, 149.87, 144.32, 154.01, 176.88, 180.53, 190, 171.33, 184.52, 175.65, 201.14, 204.52, 213.94, 242.18], '1Y': [89.24, 88.9, 89.89, 92.32, 93.35, 89.71, 92.5, 88.34, 93.55, 87.61, 88.81, 84.39, 93.26, 98.99, 106.87, 112.89, 106.26, 108.7, 111.43, 123.53, 119.35, 119.09, 112.31, 114.59, 121.18, 123.89, 117.2, 127.7, 127.45, 140, 156.78, 154.3, 142.79, 144.29, 146.41, 148.77, 153.49, 142.91, 143.82, 151.14, 138.26, 154.88, 179.59, 178.54, 180.9, 171.33, 184.52, 175.65, 201.14, 204.52, 213.94, 242.18] },
      velocityScore: { '1D': -3.6, '1W': 7.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$316B', pe: 68.4, revenueGrowth: 12, eps: 3.54, grossMargin: 61, dividendYield: 0.36,
      etfPresence: { SOXX: 3.76, PSI: 5.9, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 4.65, proScore: 2.33, coverage: 0.5,
      price: 373.94, weeklyPrices: [321.80, 362.52, 366.81, 388.92, 373.94], weeklyChange: 16.2, sortRank: 0, periodReturns: { '1M': 31.3, '6M': 129, '1Y': 300.3 },
      priceHistory: { '1W': [321.8, 362.52, 366.81, 388.92, 373.94], '1M': [277.96, 273.38, 292.09, 302.24, 305.35, 322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 373.94], '6M': [163.26, 175.16, 171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 242.27, 231, 211.15, 219.4, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 296.05, 277.96, 322.68, 334.41, 327.16, 373.94], '1Y': [93.41, 95.63, 96.81, 99.81, 100.37, 97.1, 99.09, 96.68, 105.28, 100.33, 103.63, 97.74, 107.36, 121.9, 128.32, 142.79, 142.54, 144.78, 141.25, 160.67, 155.78, 159.18, 143.24, 151.93, 159.75, 168.26, 154.98, 177.33, 185.06, 218.36, 222.96, 222.87, 233.46, 231.01, 235.53, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 258.57, 296.05, 277.96, 322.68, 334.41, 327.16, 373.94] },
      velocityScore: { '1D': 1.3, '1W': 6.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$468B', pe: 70.7, revenueGrowth: 24, eps: 5.29, grossMargin: 50, dividendYield: 0.27,
      etfPresence: { SOXX: 3.72, PSI: 5.58, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 3.59, proScore: 1.79, coverage: 0.5,
      price: 381.31, weeklyPrices: [372.10, 385.57, 382.07, 393.94, 381.31], weeklyChange: 2.48, sortRank: 0, periodReturns: { '1M': -10.3, '6M': 11.7, '1Y': 51.3 },
      priceHistory: { '1W': [372.1, 385.57, 382.07, 393.94, 381.31], '1M': [420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 381.31], '6M': [341.3, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 420.71, 422.01, 481.57, 392.16, 381.31], '1Y': [252.1, 263.77, 264.74, 277.9, 280.81, 283.69, 302.62, 292.93, 312.83, 294.91, 298.01, 302.39, 369.57, 346.17, 339.31, 333.39, 345.5, 351.33, 340.3, 385.98, 351.94, 351.96, 340.5, 385.03, 380.61, 412.97, 326.02, 350.22, 347.62, 344.97, 351.71, 324.85, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 416.5, 428.43, 420.71, 422.01, 481.57, 392.16, 381.31] },
      velocityScore: { '1D': -2.2, '1W': -9.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63.2, revenueGrowth: 48, eps: 6.03, grossMargin: 76, dividendYield: 0.66,
      etfPresence: { SOXX: 5.51, PSI: false, XSD: 1.66, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 3.47, proScore: 1.74, coverage: 0.5,
      price: 373.81, weeklyPrices: [330.86, 367.47, 367.15, 389.20, 373.81], weeklyChange: 12.98, sortRank: 0, periodReturns: { '1M': 60.7, '6M': 157.9, '1Y': 292.2 },
      priceHistory: { '1W': [330.86, 367.47, 367.15, 389.2, 373.81], '1M': [215.58, 244.26, 287.48, 297.84, 306.88, 318.72, 325.33, 349.17, 342.85, 320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 373.81], '6M': [144.94, 168.83, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 122.31, 127.48, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 215.58, 318.72, 355.76, 341.7, 373.81], '1Y': [95.3, 87.26, 88.66, 99.86, 91.94, 119.48, 128.87, 135.54, 192, 171.06, 178.56, 176.61, 230.37, 249.38, 205.27, 194.5, 219.36, 161.46, 154.85, 173.62, 179.31, 167.55, 139.52, 144.78, 152.5, 164.32, 140.24, 169.97, 179.56, 162.61, 182, 163.25, 150.62, 169.85, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 201.25, 207.35, 215.58, 318.72, 355.76, 341.7, 373.81] },
      velocityScore: { '1D': 1.2, '1W': 4.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$64B', pe: 252.6, revenueGrowth: 93, eps: 1.48, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.44, PSI: false, XSD: 4.5, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.92, proScore: 1.46, coverage: 0.5,
      price: 218.93, weeklyPrices: [191.20, 202.96, 211.72, 220.81, 218.93], weeklyChange: 14.5, sortRank: 0, periodReturns: { '1M': 8.7, '6M': 24.3, '1Y': 39.6 },
      priceHistory: { '1W': [191.2, 202.96, 211.72, 220.81, 218.93], '1M': [203.64, 195.61, 202.51, 213.41, 238.16, 248.82, 233.4, 243.29, 251.02, 228.99, 240.84, 250.01, 242.57, 215.94, 217.77, 205.42, 191.2, 202.96, 211.72, 220.81, 218.93], '6M': [176.12, 174.75, 171.05, 181.87, 161.39, 155.82, 151.59, 137.34, 140.7, 140.41, 141.03, 138.11, 129.39, 129.9, 127.11, 125.73, 131.24, 137.52, 150.26, 168.38, 237.53, 203.64, 248.82, 240.84, 205.42, 218.93], '1Y': [156.87, 155.71, 159.4, 159.35, 154.07, 159.88, 159.06, 146.71, 153.73, 156.25, 159.17, 157.28, 158.95, 165.26, 173.55, 166.49, 167.77, 162.97, 169.27, 178.67, 172.84, 173.98, 165.06, 163.3, 175.07, 182.21, 172.34, 174.77, 172.98, 177.78, 159.42, 154.52, 151.59, 137.34, 140.7, 140.41, 141.03, 138.11, 129.39, 128.35, 127.07, 124.07, 132.84, 135.56, 150, 168.38, 237.53, 203.64, 248.82, 240.84, 205.42, 218.93] },
      velocityScore: { '1D': -0.7, '1W': -6.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$231B', pe: 23.5, revenueGrowth: -4, eps: 9.3, grossMargin: 55, dividendYield: 1.67,
      etfPresence: { SOXX: 3.47, PSI: false, XSD: 2.37, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 2.79, proScore: 1.39, coverage: 0.5,
      price: 309.32, weeklyPrices: [282.01, 297.10, 301.12, 313.34, 309.32], weeklyChange: 9.68, sortRank: 0, periodReturns: { '1M': 2.2, '6M': 74.2, '1Y': 55.3 },
      priceHistory: { '1W': [282.01, 297.1, 301.12, 313.34, 309.32], '1M': [300.6, 302.31, 304.88, 298.39, 309.21, 324.89, 317.45, 315.95, 305.68, 293.2, 308.12, 308.59, 305.37, 285.06, 290.9, 288.63, 282.01, 297.1, 301.12, 313.34, 309.32], '6M': [177.56, 177.08, 173.49, 188.45, 189.12, 193.31, 215.55, 221.44, 226.16, 219.86, 209.82, 196.2, 194.13, 187.19, 190.33, 199.42, 216.71, 233.7, 269.5, 280.89, 297.76, 300.6, 324.89, 308.12, 288.63, 309.32], '1Y': [199.22, 205.81, 210.45, 216.39, 216.64, 186.25, 189.52, 185.4, 192.97, 195.94, 205.98, 195.74, 184.01, 180.3, 184.44, 180.39, 181.6, 175.27, 170.71, 160.26, 159.36, 159.73, 157.32, 161.77, 182.6, 181.67, 174.49, 177.13, 177.52, 190.31, 191.58, 196.59, 215.55, 221.44, 226.16, 219.86, 209.82, 196.2, 194.13, 188.63, 186.42, 199.74, 218.87, 233.15, 265, 280.89, 297.76, 300.6, 324.89, 308.12, 288.63, 309.32] },
      velocityScore: { '1D': -1.4, '1W': -0.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$282B', pe: 52.8, revenueGrowth: 19, eps: 5.86, grossMargin: 57, dividendYield: 1.81,
      etfPresence: { SOXX: 3.3, PSI: false, XSD: 2.27, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.73, proScore: 1.36, coverage: 0.5,
      price: 1552.38, weeklyPrices: [1473.04, 1589.55, 1577.32, 1652.29, 1552.38], weeklyChange: 5.39, sortRank: 0, periodReturns: { '1M': 0.2, '6M': 63.2, '1Y': 119.7 },
      priceHistory: { '1W': [1473.04, 1589.55, 1577.32, 1652.29, 1552.38], '1M': [1486.33, 1468.11, 1553.27, 1561.25, 1589.81, 1662.98, 1620.17, 1633.17, 1566.21, 1542.39, 1624.99, 1689.89, 1652.6, 1481.05, 1559.18, 1531.98, 1473.04, 1589.55, 1577.32, 1652.29, 1552.38], '6M': [951.36, 943.55, 906.36, 959.09, 1009.54, 1063.74, 1124.15, 1229.82, 1171.47, 1190.06, 1142.58, 1062, 1077.4, 1068.85, 1053.01, 1180.03, 1372.23, 1490.86, 1587.57, 1573.3, 1661.1, 1486.33, 1662.98, 1624.99, 1531.98, 1552.38], '1Y': [706.59, 716.58, 746.97, 751.14, 714.03, 720.01, 730.54, 802.78, 840.56, 844.8, 850.64, 827.56, 855.18, 877.66, 908.45, 915.87, 980.9, 1007.93, 1001.4, 1094.08, 957.87, 954.71, 856.96, 908.61, 958.02, 979.02, 912.25, 953.25, 936.31, 958.97, 1033.17, 1068.14, 1124.15, 1229.82, 1171.47, 1190.06, 1142.58, 1062, 1077.4, 1076.35, 1002.34, 1191.22, 1363.42, 1527.95, 1504.08, 1573.3, 1661.1, 1486.33, 1662.98, 1624.99, 1531.98, 1552.38] },
      velocityScore: { '1D': -0.7, '1W': -2.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$76B', pe: 110.6, revenueGrowth: 26, eps: 14.04, grossMargin: 55, dividendYield: 0.48,
      etfPresence: { SOXX: 3.23, PSI: false, XSD: 2.22, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.69, proScore: 1.35, coverage: 0.5,
      price: 308.69, weeklyPrices: [285.56, 302.55, 304.86, 315.88, 308.69], weeklyChange: 8.1, sortRank: 0, periodReturns: { '1M': 5.9, '6M': 34.4, '1Y': 41.9 },
      priceHistory: { '1W': [285.56, 302.55, 304.86, 315.88, 308.69], '1M': [291.68, 294.28, 310.15, 299.38, 316.47, 332.67, 329.24, 330.28, 321.35, 311.38, 323.62, 321.88, 322.22, 295.96, 301.14, 297.41, 285.56, 302.55, 304.86, 315.88, 308.69], '6M': [229.75, 225.98, 217.06, 237.89, 238.6, 232.48, 226.14, 224.32, 244.43, 231.16, 224.76, 205.25, 191.89, 191.37, 191.66, 197.08, 208, 221.34, 236.87, 290.76, 305.99, 291.68, 332.67, 323.62, 297.41, 308.69], '1Y': [217.53, 218.51, 221.21, 230.42, 220.58, 224.71, 220.94, 208.47, 220.05, 229.27, 237.82, 228.2, 219.28, 221.89, 227.66, 224.91, 225.64, 217.23, 217.16, 204.71, 204.42, 202.86, 188.59, 191.02, 227.56, 230.78, 223.23, 225.26, 221.28, 241.15, 237.11, 231.05, 226.14, 224.32, 244.43, 231.16, 224.76, 205.25, 191.89, 193.39, 187.39, 195.12, 209.89, 224.5, 230.39, 290.76, 305.99, 291.68, 332.67, 323.62, 297.41, 308.69] },
      velocityScore: { '1D': -0.7, '1W': -2.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$78B', pe: 29.5, revenueGrowth: 12, eps: 10.46, grossMargin: 56, dividendYield: 1.28,
      etfPresence: { SOXX: 3.11, PSI: false, XSD: 2.27, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 2.67, proScore: 1.33, coverage: 0.5,
      price: 121.3, weeklyPrices: [110.17, 115.96, 116.79, 125.90, 121.30], weeklyChange: 10.1, sortRank: 0, periodReturns: { '1M': 7.2, '6M': 122.3, '1Y': 125.1 },
      priceHistory: { '1W': [110.17, 115.96, 116.79, 125.9, 121.3], '1M': [109.43, 106.02, 110.21, 109.61, 116.2, 127, 124.89, 123.77, 120.62, 120.92, 128.64, 133.93, 131.82, 117.26, 120.9, 117, 110.17, 115.96, 116.79, 125.9, 121.3], '6M': [54.56, 55.69, 54.15, 60.89, 60.28, 61.98, 59.89, 65.2, 72.21, 69.47, 66.48, 59.23, 59.88, 59.26, 58.35, 63.49, 71.02, 85.56, 98.04, 102.04, 107.24, 109.43, 127, 128.64, 117, 121.3], '1Y': [53.88, 54.21, 53.6, 57.77, 59.52, 59.61, 58.05, 47.24, 50.01, 49.77, 50.99, 47.79, 48.13, 49.8, 50.94, 48.35, 50.88, 50.36, 51.93, 51.4, 48.28, 48.43, 45.56, 48.31, 57.15, 55.1, 53.33, 55.08, 56.7, 62.16, 60.33, 61.13, 59.89, 65.2, 72.21, 69.47, 66.48, 59.23, 59.88, 59.89, 55.66, 63.79, 72.05, 86.91, 93.3, 102.04, 107.24, 109.43, 127, 128.64, 117, 121.3] },
      velocityScore: { '1D': 2.3, '1W': -3.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$47B', pe: 89.2, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.28, PSI: false, XSD: 3.06, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.58, proScore: 1.29, coverage: 0.5,
      price: 246.03, weeklyPrices: [237.68, 264.76, 250.81, 259.41, 246.03], weeklyChange: 3.52, sortRank: 0, periodReturns: { '1M': 42.9, '6M': 75.3, '1Y': 210.8 },
      priceHistory: { '1W': [237.68, 264.76, 250.81, 259.41, 246.03], '1M': [156.27, 168.99, 182.98, 193.39, 218.41, 221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 246.03], '6M': [140.34, 147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 115.98, 116.88, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 156.27, 221.64, 229, 234.32, 246.03], '1Y': [79.17, 91.92, 87.59, 97.59, 101.19, 98.41, 116.01, 110.29, 125.38, 106.3, 120.1, 124.77, 163.96, 164.44, 149.38, 144.91, 148.87, 131.41, 137.2, 171.52, 164.23, 158.5, 139.56, 154.18, 189.19, 157.98, 134.13, 150.19, 143.22, 150.42, 150.97, 128.02, 125.28, 111.4, 121.44, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 180.06, 210.22, 156.27, 221.64, 229, 234.32, 246.03] },
      velocityScore: { '1D': -1.5, '1W': 8.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$45B', pe: 97.6, revenueGrowth: 157, eps: 2.52, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 1.94, PSI: false, XSD: 3.23, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.33, proScore: 1.16, coverage: 0.5,
      price: 97.41, weeklyPrices: [87.91, 92.94, 95.24, 100.32, 97.41], weeklyChange: 10.81, sortRank: 0, periodReturns: { '1M': 3.8, '6M': 47.8, '1Y': 42.9 },
      priceHistory: { '1W': [87.91, 92.94, 95.24, 100.32, 97.41], '1M': [92.76, 91.81, 94.02, 91.11, 93.43, 98.05, 96.85, 96.04, 94.65, 91.52, 96.96, 96.55, 96.3, 88.34, 91.37, 91.47, 87.91, 92.94, 95.24, 100.32, 97.41], '6M': [65.9, 65.35, 63.72, 73.53, 74.45, 74.71, 75.92, 76.01, 78.56, 76.6, 74.31, 65, 63.83, 62.97, 62, 67.22, 73.55, 80.39, 86.84, 95.3, 99.03, 92.76, 98.05, 96.96, 91.47, 97.41], '1Y': [68.19, 70.43, 71.68, 74.68, 74.43, 70.25, 70.29, 67.13, 64.5, 64.71, 67.62, 63.28, 64.74, 65.78, 65.85, 64.11, 66.92, 65.21, 64.5, 62.54, 59.5, 54.71, 50.87, 51.83, 63.61, 67.9, 63.99, 65.36, 65.03, 75.22, 74.7, 74.79, 75.92, 76.01, 78.56, 76.6, 74.31, 65, 63.83, 64.34, 60.06, 67.51, 74.5, 80.93, 84.26, 95.3, 99.03, 92.76, 98.05, 96.96, 91.47, 97.41] },
      velocityScore: { '1D': 0, '1W': 0.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$53B', pe: 442.8, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 1.81,
      etfPresence: { SOXX: 2.46, PSI: false, XSD: 2.2, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.84, proScore: 0.92, coverage: 0.5,
      price: 374.79, weeklyPrices: [354.40, 374.76, 379.87, 384.77, 374.79], weeklyChange: 5.75, sortRank: 0, periodReturns: { '1M': -0.2, '6M': 113.3, '1Y': 185.7 },
      priceHistory: { '1W': [354.4, 374.76, 379.87, 384.77, 374.79], '1M': [356.25, 358.98, 375.71, 380.45, 385.98, 409.68, 400.66, 391.09, 364.64, 353.79, 382.35, 390.34, 382.74, 345.4, 361.86, 358.72, 354.4, 374.76, 379.87, 384.77, 374.79], '6M': [175.69, 176.28, 171.28, 167.66, 218.93, 219.26, 219.06, 235.87, 244.16, 245.53, 258.54, 218.73, 224.92, 218.96, 225.44, 233.04, 263.63, 281.08, 279.44, 291.72, 365.88, 356.25, 409.68, 382.35, 358.72, 374.79], '1Y': [131.18, 139.84, 137.38, 139.85, 137.76, 137.19, 140.02, 137.28, 125.45, 121, 128.33, 130.17, 131.7, 131.87, 126.66, 126.56, 133.19, 136.83, 135.91, 152.66, 144.13, 169.98, 158.22, 165.88, 183.46, 186.23, 168.31, 175.81, 174.96, 174.87, 220.68, 218.89, 219.06, 235.87, 244.16, 245.53, 258.54, 218.73, 224.92, 229.26, 209.49, 236.99, 263.92, 285.71, 265.61, 291.72, 365.88, 356.25, 409.68, 382.35, 358.72, 374.79] },
      velocityScore: { '1D': -3.2, '1W': -1.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$29B', pe: 159.5, revenueGrowth: 23, eps: 2.35, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.19, PSI: false, XSD: 2.49, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RMBS', name: 'RAMBUS INC', easyScore: 2, avgWeight: 1.47, proScore: 0.73, coverage: 0.5,
      price: 136.08, weeklyPrices: [138.12, 144.47, 146.56, 143.29, 136.08], weeklyChange: -1.48, sortRank: 0, periodReturns: { '1M': 7.1, '6M': 43.7, '1Y': 125.4 },
      priceHistory: { '1W': [138.12, 144.47, 146.56, 143.29, 136.08], '1M': [123.76, 122.03, 133.56, 141.82, 142.98, 157.23, 148.66, 148.02, 145.46, 147.48, 166.78, 170.66, 169.35, 145.31, 152.03, 146.84, 138.12, 144.47, 146.56, 143.29, 136.08], '6M': [94.69, 94.19, 91.89, 91.34, 103.07, 115.31, 113.83, 107.1, 101.95, 95.27, 98.88, 88.52, 92.78, 91.7, 89.73, 92.22, 113.16, 126.87, 141.31, 111.5, 134.51, 123.76, 157.23, 166.78, 146.84, 136.08], '1Y': [60.37, 62.3, 64.14, 64.79, 66.79, 65.95, 75.09, 73.79, 76.44, 69.78, 75.03, 73.67, 77.11, 97.52, 100.73, 103.14, 99.43, 97.22, 94.45, 111.36, 100.32, 104.93, 87.7, 92.45, 98.03, 106.84, 90.61, 94.48, 99.28, 93.38, 107.99, 114.19, 113.83, 107.1, 101.95, 95.27, 98.88, 88.52, 92.78, 93.35, 79.73, 91.87, 121.73, 130.45, 111.27, 111.5, 134.51, 123.76, 157.23, 166.78, 146.84, 136.08] },
      velocityScore: { '1D': -6.4, '1W': -12, '1M': null, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 64.5, revenueGrowth: 8, eps: 2.11, grossMargin: 80, dividendYield: null,
      etfPresence: { SOXX: 0.71, PSI: false, XSD: 2.23, DRAM: false },
      tonyNote: 'RAMBUS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 7, avgWeight: 4.21, proScore: 2.27, coverage: 0.538,
      price: 209.53, weeklyPrices: [200.42, 204.87, 205.19, 212.45, 209.53], weeklyChange: 4.55, sortRank: 0, periodReturns: { '1M': -7, '6M': 17.9, '1Y': 44.8 },
      priceHistory: { '1W': [200.42, 204.87, 205.19, 212.45, 209.53], '1M': [222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 209.53], '6M': [177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 222.32, 214.86, 222.82, 208.19, 209.53], '1Y': [144.69, 147.9, 153.3, 162.88, 171.37, 170.78, 179.27, 178.26, 183.16, 175.64, 181.77, 170.62, 177.33, 170.29, 176.97, 187.24, 189.11, 179.83, 180.28, 207.04, 198.69, 193.16, 181.36, 177.82, 179.59, 183.78, 170.94, 188.61, 188.85, 184.86, 186.23, 186.47, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 198.48, 219.44, 222.32, 214.86, 222.82, 208.19, 209.53] },
      velocityScore: { '1D': -0.9, '1W': -0.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.1T', pe: 32.1, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { PTF: 4.22, WCLD: false, IGV: false, FDTX: 4.62, GTEK: false, ARKK: 1.64, MARS: false, FRWD: 8.46, BCTK: 6.5, FWD: 1.97, CBSE: false, FCUS: false, WGMI: 2.07 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 6, avgWeight: 4.95, proScore: 2.28, coverage: 0.462,
      price: 1044.91, weeklyPrices: [891.88, 995.87, 981.61, 1087.99, 1044.91], weeklyChange: 17.16, sortRank: 0, periodReturns: { '1M': 44.2, '6M': 349.4, '1Y': 771.9 },
      priceHistory: { '1W': [891.88, 995.87, 981.61, 1087.99, 1044.91], '1M': [681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1044.91], '6M': [232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1, 935.89, 1044.91], '1Y': [119.84, 127.91, 120.89, 122.24, 116.43, 109.83, 114.74, 109.06, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 198.47, 226.63, 218.03, 241.11, 228.5, 224.53, 234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 576.45, 795.33, 681.54, 895.88, 1064.1, 935.89, 1044.91] },
      velocityScore: { '1D': 1.8, '1W': -4.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 49.2, revenueGrowth: 196, eps: 21.22, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { PTF: 5.07, WCLD: false, IGV: false, FDTX: 9.36, GTEK: false, ARKK: false, MARS: false, FRWD: 4.78, BCTK: 4.79, FWD: 1.43, CBSE: false, FCUS: 4.24, WGMI: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 6, avgWeight: 4.07, proScore: 1.88, coverage: 0.462,
      price: 432.25, weeklyPrices: [408.75, 421.07, 423.93, 441.40, 432.25], weeklyChange: 5.75, sortRank: 0, periodReturns: { '1M': 6.9, '6M': 50.7, '1Y': 100.4 },
      priceHistory: { '1W': [408.75, 421.07, 423.93, 441.4, 432.25], '1M': [395.95, 392.61, 401.62, 407.15, 404.52, 412.32, 422.73, 424.86, 418.45, 435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93, 441.4, 432.25], '6M': [286.87, 296.95, 303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.04, 369.11, 348.7, 340.23, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 401.61, 404.54, 395.95, 412.32, 446.69, 427.92, 432.25], '1Y': [215.68, 220.09, 224.68, 231.84, 237.56, 240.33, 242.91, 232.47, 244.29, 232.7, 238.72, 231.39, 260.44, 262.79, 280.71, 288.47, 304.52, 304.71, 288.88, 305.09, 294.05, 291.17, 277.91, 284.68, 295.45, 310.14, 276.96, 298.8, 319.61, 323.63, 342.4, 332.71, 330.56, 348.85, 366.36, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 401.61, 404.54, 395.95, 412.32, 446.69, 427.92, 432.25] },
      velocityScore: { '1D': -0.5, '1W': 13.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.2T', pe: 37.1, revenueGrowth: 35, eps: 11.65, grossMargin: 62, dividendYield: 0.86,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6, GTEK: false, ARKK: 0.92, MARS: false, FRWD: 5.8, BCTK: 8.59, FWD: false, CBSE: 2.52, FCUS: false, WGMI: 0.6 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 5, avgWeight: 4.16, proScore: 1.6, coverage: 0.385,
      price: 519.77, weeklyPrices: [452.40, 488.45, 511.57, 547.26, 519.77], weeklyChange: 14.89, sortRank: 0, periodReturns: { '1M': 22.6, '6M': 148.5, '1Y': 311.2 },
      priceHistory: { '1W': [452.4, 488.45, 511.57, 547.26, 519.77], '1M': [420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 519.77], '6M': [209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 503.89, 521.54, 475.51, 519.77], '1Y': [126.39, 138.43, 136.11, 138.41, 160.08, 158.65, 179.51, 174.31, 174.95, 166.55, 166.62, 162.13, 159.54, 159.16, 160.88, 164.01, 235.56, 238.6, 230.23, 264.33, 250.05, 237.52, 230.29, 206.13, 217.6, 221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 341.54, 458.79, 420.99, 503.89, 521.54, 475.51, 519.77] },
      velocityScore: { '1D': 0, '1W': -5.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$848B', pe: 172.7, revenueGrowth: 38, eps: 3.01, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.6, MARS: false, FRWD: 7.22, BCTK: 3.76, FWD: 2.05, CBSE: false, FCUS: 3.18, WGMI: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 5, avgWeight: 3.28, proScore: 1.26, coverage: 0.385,
      price: 381.31, weeklyPrices: [372.10, 385.57, 382.07, 393.94, 381.31], weeklyChange: 2.48, sortRank: 0, periodReturns: { '1M': -10.3, '6M': 11.7, '1Y': 51.3 },
      priceHistory: { '1W': [372.1, 385.57, 382.07, 393.94, 381.31], '1M': [420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 381.31], '6M': [341.3, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 420.71, 422.01, 481.57, 392.16, 381.31], '1Y': [252.1, 263.77, 264.74, 277.9, 280.81, 283.69, 302.62, 292.93, 312.83, 294.91, 298.01, 302.39, 369.57, 346.17, 339.31, 333.39, 345.5, 351.33, 340.3, 385.98, 351.94, 351.96, 340.5, 385.03, 380.61, 412.97, 326.02, 350.22, 347.62, 344.97, 351.71, 324.85, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 416.5, 428.43, 420.71, 422.01, 481.57, 392.16, 381.31] },
      velocityScore: { '1D': -3.8, '1W': -2.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63.2, revenueGrowth: 48, eps: 6.03, grossMargin: 76, dividendYield: 0.66,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.79, GTEK: false, ARKK: 1.09, MARS: false, FRWD: 5.28, BCTK: 7.31, FWD: 1.95, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 5, avgWeight: 3.04, proScore: 1.17, coverage: 0.385,
      price: 246.34, weeklyPrices: [238.00, 241.51, 238.55, 246.02, 246.34], weeklyChange: 3.5, sortRank: 0, periodReturns: { '1M': -6.7, '6M': 10.7, '1Y': 14 },
      priceHistory: { '1W': [238, 241.51, 238.55, 246.02, 246.34], '1M': [264.86, 259.34, 265.01, 268.46, 266.32, 265.29, 271.85, 274, 270.64, 261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 244.19, 238, 241.51, 238.55, 246.02, 246.34], '6M': [222.56, 232.14, 230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 205.27, 208.39, 213.49, 211.74, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 272.05, 268.99, 264.86, 265.29, 256.52, 244.19, 246.34], '1Y': [216.1, 212.77, 220.46, 222.54, 223.19, 228.29, 230.19, 213.75, 221.47, 228.01, 228.71, 225.99, 230.33, 231.62, 220.21, 220.63, 225.22, 215.57, 217.95, 230.3, 249.32, 249.1, 222.55, 229.67, 232.38, 231.78, 221.27, 232.38, 226.5, 247.38, 239.12, 238.42, 239.3, 210.32, 198.79, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 272.05, 268.99, 264.86, 265.29, 256.52, 244.19, 246.34] },
      velocityScore: { '1D': 8.3, '1W': -4.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 31.7, revenueGrowth: 17, eps: 7.77, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.01, GTEK: false, ARKK: 2.21, MARS: false, FRWD: 2.93, BCTK: 4.5, FWD: 1.53, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, avgWeight: 5.35, proScore: 1.65, coverage: 0.308,
      price: 1040.16, weeklyPrices: [815.99, 868.09, 931.04, 1018.80, 1040.16], weeklyChange: 27.47, sortRank: 0, periodReturns: { '1M': 30.8, '6M': 261, '1Y': 693.8 },
      priceHistory: { '1W': [815.99, 868.09, 931.04, 1018.8, 1040.16], '1M': [740.84, 733.35, 751.07, 810.46, 812.73, 845.76, 870.66, 880.72, 879.8, 921.26, 926.61, 940.69, 925.99, 847.47, 876.77, 846.01, 815.99, 868.09, 931.04, 1018.8, 1040.16], '6M': [288.13, 282.8, 275.39, 284.47, 320.32, 346.1, 407.69, 429.32, 425.99, 407.4, 379.52, 374.33, 398.78, 411.23, 380.07, 453.3, 513.28, 539.75, 595.86, 738.54, 834.01, 740.84, 845.76, 926.61, 846.01, 1040.16], '1Y': [131.04, 136.31, 145.04, 142.01, 147.12, 152.76, 147.42, 151.74, 155.59, 157.93, 165.24, 176.32, 193.04, 213.36, 223.7, 256.84, 224.35, 219.38, 215.05, 265.62, 250.38, 288, 253.86, 261.89, 258.67, 298.92, 277.65, 285.27, 287.54, 304.01, 326.23, 358.29, 407.69, 429.32, 425.99, 407.4, 379.52, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 579.03, 738.54, 834.01, 740.84, 845.76, 926.61, 846.01, 1040.16] },
      velocityScore: { '1D': 3.8, '1W': -3.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$233B', pe: 99.2, revenueGrowth: 44, eps: 10.49, grossMargin: 42, dividendYield: 0.29,
      etfPresence: { PTF: 5.12, WCLD: false, IGV: false, FDTX: 4.04, GTEK: false, ARKK: false, MARS: false, FRWD: 8.07, BCTK: false, FWD: false, CBSE: false, FCUS: 4.17, WGMI: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 4, avgWeight: 4.57, proScore: 1.41, coverage: 0.308,
      price: 691.92, weeklyPrices: [490.09, 529.29, 562.93, 653.53, 691.92], weeklyChange: 41.18, sortRank: 0, periodReturns: { '1M': 43.5, '6M': 296.3, '1Y': 1105.2 },
      priceHistory: { '1W': [490.09, 529.29, 562.93, 653.53, 691.92], '1M': [458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 691.92], '6M': [174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 286.21, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 458.68, 524.65, 563.1, 517.72, 691.92], '1Y': [57.41, 62.07, 63.84, 64.64, 66.53, 69.32, 71.43, 75.84, 75.91, 75.86, 79.71, 86, 95.02, 100.94, 109.69, 130.59, 121.18, 120.44, 120.47, 141.38, 152.18, 169.99, 152.86, 155.41, 155.59, 181.95, 166.26, 179.56, 187.7, 200.46, 221.51, 240.85, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 442.36, 515.83, 458.68, 524.65, 563.1, 517.72, 691.92] },
      velocityScore: { '1D': 5.2, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$238B', pe: 41.4, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.09,
      etfPresence: { PTF: 5.38, WCLD: false, IGV: false, FDTX: 4, GTEK: false, ARKK: false, MARS: false, FRWD: 4.82, BCTK: false, FWD: false, CBSE: false, FCUS: 4.07, WGMI: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 4, avgWeight: 3.93, proScore: 1.21, coverage: 0.308,
      price: 278.42, weeklyPrices: [263.22, 279.53, 279.62, 284.54, 278.42], weeklyChange: 5.77, sortRank: 0, periodReturns: { '1M': 14.7, '6M': 48.8, '1Y': 40.5 },
      priceHistory: { '1W': [263.22, 279.53, 279.62, 284.54, 278.42], '1M': [247.55, 240.13, 246.66, 252.92, 260.58, 256.75, 248.47, 257.77, 281.69, 300.48, 297.18, 280.43, 279.25, 272.05, 266.33, 260.52, 263.22, 279.53, 279.62, 284.54, 278.42], '6M': [187.09, 188.12, 184.2, 190.8, 187.73, 180.18, 176.97, 159.32, 166.95, 144.14, 150.15, 165.1, 167.45, 162.95, 147.02, 161.95, 162.51, 169.56, 182.9, 184.56, 213.66, 247.55, 256.75, 297.18, 260.52, 278.42], '1Y': [198.11, 201.69, 197.58, 206.06, 192.59, 199.22, 183.03, 169.09, 175.4, 181.56, 184.23, 191.53, 197.33, 203.12, 200.7, 206.8, 217.79, 206.7, 212.42, 217.16, 214.52, 218.27, 201, 186.27, 193.63, 192.96, 183.44, 187.22, 179.37, 189.02, 187.66, 184.22, 176.97, 159.32, 166.95, 144.14, 150.15, 165.1, 167.45, 164.05, 154.35, 169.87, 161.59, 174.96, 180.99, 184.56, 213.66, 247.55, 256.75, 297.18, 260.52, 278.42] },
      velocityScore: { '1D': 7.1, '1W': 15.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$227B', pe: 244.2, revenueGrowth: 31, eps: 1.14, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.6, IGV: 8.4, FDTX: 3.67, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.06, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 2.89, proScore: 0.89, coverage: 0.308,
      price: 113.63, weeklyPrices: [108.20, 110.47, 108.24, 112.49, 113.63], weeklyChange: 5.02, sortRank: 0, periodReturns: { '1M': 13.3, '6M': -30.3, '1Y': 4.9 },
      priceHistory: { '1W': [108.2, 110.47, 108.24, 112.49, 113.63], '1M': [102.39, 101.01, 105.01, 104.86, 103, 104.9, 106.6, 115.03, 118.71, 124.12, 117.01, 112.94, 116.04, 109.54, 110.78, 110.42, 108.2, 110.47, 108.24, 112.49, 113.63], '6M': [163.14, 169.53, 160.97, 168.28, 157.99, 137.89, 131.23, 112.05, 112.7, 117.28, 119.38, 133.5, 126.58, 116.78, 111.85, 118.8, 114.97, 135.14, 124.23, 127.55, 102.54, 102.39, 104.9, 117.01, 110.42, 113.63], '1Y': [108.37, 114.42, 112.67, 114.32, 120, 122.21, 123.01, 127, 149.3, 139.25, 140.85, 140.22, 142.2, 147.87, 148.83, 149.57, 166.43, 156.21, 162.01, 179.01, 160.94, 158.94, 140.45, 157.37, 160, 168.42, 161.73, 169.45, 157.2, 164.48, 155.81, 136.31, 131.23, 112.05, 112.7, 117.28, 119.38, 133.5, 126.58, 121.1, 111.77, 117.06, 117.64, 131.13, 122.05, 127.55, 102.54, 102.39, 104.9, 117.01, 110.42, 113.63] },
      velocityScore: { '1D': -3.3, '1W': -3.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$147B', pe: 111.4, revenueGrowth: 34, eps: 1.02, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.89, GTEK: false, ARKK: 4.04, MARS: false, FRWD: 1.9, BCTK: 2.72, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 13 Broad Tech ETFs (31% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASML', name: 'ASML Holding', easyScore: 4, avgWeight: 2.87, proScore: 0.88, coverage: 0.308,
      price: 1835.88, weeklyPrices: [1734.19, 1899.48, 1863.55, 1892.66, 1835.88], weeklyChange: 5.86, sortRank: 0, periodReturns: { '1M': 22.2, '6M': 70.6, '1Y': 136.8 },
      priceHistory: { '1W': [1734.19, 1899.48, 1863.55, 1892.66, 1835.88], '1M': [1472.39, 1459.44, 1550.13, 1592, 1632.9, 1632.03, 1597.87, 1605.77, 1612.76, 1628.57, 1705.37, 1726.36, 1757.47, 1641.74, 1749.04, 1777.77, 1734.19, 1899.48, 1863.55, 1892.66, 1835.88], '6M': [1076.05, 1061.84, 1069.86, 1194.32, 1331.6, 1389.04, 1423, 1413.01, 1406.61, 1485.99, 1423.54, 1357.42, 1375.56, 1317.25, 1302.47, 1304.01, 1500.2, 1476.5, 1432.44, 1386.21, 1565.81, 1472.39, 1632.03, 1705.37, 1777.77, 1835.88], '1Y': [775.23, 813.36, 790.47, 799.83, 754.45, 716.93, 721.45, 689.63, 741.79, 743.61, 763.2, 736.82, 793.14, 872.27, 946.94, 1003.27, 987.81, 1009.81, 1011.57, 1070.84, 1030.14, 1022.42, 1004.06, 1003.22, 1140.92, 1119.32, 1015.43, 1065.52, 1163.78, 1273.88, 1358.57, 1413.35, 1423, 1413.01, 1406.61, 1485.99, 1423.54, 1357.42, 1375.56, 1369.62, 1253.96, 1306.45, 1518.3, 1458.97, 1384.56, 1386.21, 1565.81, 1472.39, 1632.03, 1705.37, 1777.77, 1835.88] },
      velocityScore: { '1D': -1.1, '1W': 33.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$708B', pe: 61.4, revenueGrowth: 13, eps: 29.9, grossMargin: 53, dividendYield: 0.46,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.08, BCTK: 2.42, FWD: 1.66, CBSE: 2.31, FCUS: false, WGMI: false },
      tonyNote: 'ASML Holding appears in 4 of 13 Broad Tech ETFs (31% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NET', name: 'Cloudflare', easyScore: 4, avgWeight: 1.79, proScore: 0.55, coverage: 0.308,
      price: 231.16, weeklyPrices: [219.67, 227.44, 228.48, 235.71, 231.16], weeklyChange: 5.23, sortRank: 0, periodReturns: { '1M': 17, '6M': 17, '1Y': 28.9 },
      priceHistory: { '1W': [219.67, 227.44, 228.48, 235.71, 231.16], '1M': [201.75, 206.73, 210.13, 212.65, 216.17, 217.54, 209.22, 228.11, 241.82, 270.82, 272.66, 265.33, 268.64, 250.11, 247.79, 236.13, 219.67, 227.44, 228.48, 235.71, 231.16], '6M': [197.53, 202.08, 197.15, 186.96, 184.14, 173.44, 177.35, 173.21, 195.85, 160.19, 181.02, 201.48, 207.33, 215.42, 203.02, 211.78, 184.02, 204.81, 212.36, 224.17, 193.52, 201.75, 217.54, 272.66, 236.13, 231.16], '1Y': [179.27, 186.43, 184.95, 193.49, 189.81, 189.15, 200.85, 207.81, 202.33, 196.51, 198.55, 205.71, 222.97, 213.88, 217.57, 217.06, 220, 217.38, 210.73, 227.38, 232.91, 234.95, 196.53, 197.49, 204.35, 213.46, 191.43, 202.66, 196.02, 182.78, 184.17, 189.35, 177.35, 173.21, 195.85, 160.19, 181.02, 201.48, 207.33, 220.65, 194.63, 216.29, 178.65, 207.67, 208.5, 224.17, 193.52, 201.75, 217.54, 272.66, 236.13, 231.16] },
      velocityScore: { '1D': 0, '1W': -6.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$82B', pe: null, revenueGrowth: 34, eps: -0.26, grossMargin: 73, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 1.78, IGV: false, FDTX: 2.05, GTEK: 2.05, ARKK: false, MARS: false, FRWD: false, BCTK: 1.28, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Cloudflare appears in 4 of 13 Broad Tech ETFs (31% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 3, avgWeight: 5.61, proScore: 1.29, coverage: 0.231,
      price: 373.94, weeklyPrices: [321.80, 362.52, 366.81, 388.92, 373.94], weeklyChange: 16.2, sortRank: 0, periodReturns: { '1M': 31.3, '6M': 129, '1Y': 300.3 },
      priceHistory: { '1W': [321.8, 362.52, 366.81, 388.92, 373.94], '1M': [277.96, 273.38, 292.09, 302.24, 305.35, 322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 373.94], '6M': [163.26, 175.16, 171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 242.27, 231, 211.15, 219.4, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 296.05, 277.96, 322.68, 334.41, 327.16, 373.94], '1Y': [93.41, 95.63, 96.81, 99.81, 100.37, 97.1, 99.09, 96.68, 105.28, 100.33, 103.63, 97.74, 107.36, 121.9, 128.32, 142.79, 142.54, 144.78, 141.25, 160.67, 155.78, 159.18, 143.24, 151.93, 159.75, 168.26, 154.98, 177.33, 185.06, 218.36, 222.96, 222.87, 233.46, 231.01, 235.53, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 258.57, 296.05, 277.96, 322.68, 334.41, 327.16, 373.94] },
      velocityScore: { '1D': -9.8, '1W': 0.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$468B', pe: 70.7, revenueGrowth: 24, eps: 5.29, grossMargin: 50, dividendYield: 0.27,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 6.14, BCTK: 7.7, FWD: false, CBSE: 2.99, FCUS: false, WGMI: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 3, avgWeight: 5.05, proScore: 1.17, coverage: 0.231,
      price: 2025.31, weeklyPrices: [1643.23, 1881.51, 1980.10, 2107.86, 2025.31], weeklyChange: 23.25, sortRank: 0, periodReturns: { '1M': 43.9, '6M': 867.6, '1Y': 4481.1 },
      priceHistory: { '1W': [1643.23, 1881.51, 1980.1, 2107.86, 2025.31], '1M': [1333.01, 1383.29, 1392.56, 1542.24, 1478.69, 1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 2025.31], '6M': [209.31, 244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 588.73, 703.63, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1589.55, 1716.36, 1646.54, 2025.31], '1Y': [44.21, 47.34, 44.96, 46.2, 41.36, 43, 43.39, 41.93, 46.83, 44.58, 47.35, 53.01, 73.92, 93.97, 99.83, 121.12, 131.88, 144.3, 146.95, 204.36, 194.57, 271.58, 244.93, 220.5, 194.38, 232.86, 206.83, 250.08, 275.24, 377.41, 413.62, 470.8, 576.25, 597.95, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1255.86, 1547.56, 1333.01, 1589.55, 1716.36, 1646.54, 2025.31] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$300B', pe: 69.1, revenueGrowth: 251, eps: 29.3, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 8.97, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.44, CBSE: false, FCUS: 4.75, WGMI: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 3, avgWeight: 4.9, proScore: 1.13, coverage: 0.231,
      price: 391.98, weeklyPrices: [397.36, 390.34, 390.74, 399.76, 391.98], weeklyChange: -1.35, sortRank: 0, periodReturns: { '1M': -7.1, '6M': -17.7, '1Y': -18.2 },
      priceHistory: { '1W': [397.36, 390.34, 390.74, 399.76, 391.98], '1M': [423.54, 417.42, 421.06, 419.09, 418.57, 416.03, 412.67, 426.99, 450.24, 460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74, 399.76, 391.98], '6M': [476.39, 486.85, 483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 384.47, 398.55, 409.41, 399.95, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 413.62, 412.66, 423.54, 416.03, 441.31, 403.41, 391.98], '1Y': [479.14, 490.11, 492.05, 503.51, 505.62, 505.87, 513.24, 527.75, 529.24, 509.77, 502.04, 505.35, 500.37, 510.02, 510.15, 519.71, 524.85, 513.43, 520.54, 541.55, 514.33, 508.68, 493.79, 476.99, 477.73, 478.56, 476.12, 488.02, 472.94, 479.28, 459.86, 470.28, 430.29, 401.14, 401.32, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 413.62, 412.66, 423.54, 416.03, 441.31, 403.41, 391.98] },
      velocityScore: { '1D': 0, '1W': -5.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 23.3, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 0.91,
      etfPresence: { PTF: false, WCLD: false, IGV: 7.8, FDTX: 3.79, GTEK: false, ARKK: false, MARS: false, FRWD: 3.11, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 3, avgWeight: 4.19, proScore: 0.97, coverage: 0.231,
      price: 131.15, weeklyPrices: [130.21, 131.08, 127.99, 134.71, 131.15], weeklyChange: 0.72, sortRank: 0, periodReturns: { '1M': -2.1, '6M': -30.1, '1Y': -7.3 },
      priceHistory: { '1W': [130.21, 131.08, 127.99, 134.71, 131.15], '1M': [135.14, 135.26, 137.15, 137.41, 136.88, 136.6, 132.51, 143.34, 156.54, 160.65, 152.17, 142.2, 141.7, 135.53, 136.47, 132.07, 130.21, 131.08, 127.99, 134.71, 131.15], '6M': [187.75, 194.13, 177.75, 176.86, 177.07, 169.6, 146.59, 135.9, 131.41, 130.6, 145.17, 156.43, 152.72, 150.68, 143.06, 147.93, 132.37, 145.89, 143.1, 146.03, 136.89, 135.14, 136.6, 152.17, 132.07, 131.15], '1Y': [141.41, 143.23, 130.68, 143.13, 150.91, 154.63, 158.61, 173.27, 186.97, 157.75, 160.87, 154.9, 166.74, 168.33, 179.56, 184.95, 183.56, 179.62, 175.49, 198.81, 190.74, 190.96, 167.33, 163.55, 176.08, 187.91, 177.29, 194.17, 167.86, 177.49, 170.96, 167.47, 146.59, 135.9, 131.41, 130.6, 145.17, 156.43, 152.72, 160.84, 137.55, 150.07, 135.7, 145.97, 141.18, 146.03, 136.89, 135.14, 136.6, 152.17, 132.07, 131.15] },
      velocityScore: { '1D': 0, '1W': -2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$314B', pe: 147.4, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 7.02, FDTX: 2.87, GTEK: false, ARKK: 2.67, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 3, avgWeight: 3.73, proScore: 0.86, coverage: 0.231,
      price: 370.15, weeklyPrices: [353.32, 356.56, 358.16, 367.11, 370.15], weeklyChange: 4.76, sortRank: 0, periodReturns: { '1M': -5.9, '6M': 20.3, '1Y': 108 },
      priceHistory: { '1W': [353.32, 356.56, 358.16, 367.11, 370.15], '1M': [393.11, 384.9, 384.9, 383.47, 379.38, 384.84, 384.83, 386.12, 376.43, 372.58, 358.39, 355.68, 369.27, 365.76, 361.17, 362.29, 353.32, 356.56, 358.16, 367.11, 370.15], '6M': [307.73, 315.68, 313.8, 326.01, 333.16, 328.43, 338.53, 323.1, 306.02, 311.69, 306.36, 306.01, 304.42, 298.79, 273.76, 297.66, 319.21, 335.4, 348.52, 379.64, 386.77, 393.11, 384.84, 358.39, 362.29, 370.15], '1Y': [177.94, 167.74, 176.91, 177.66, 183.77, 191.51, 197.44, 195.32, 204.16, 202.49, 207.95, 231.1, 239.56, 249.85, 247.83, 245.54, 245.46, 251.71, 252.53, 275.17, 278.06, 291.74, 284.96, 323.64, 320.62, 321, 298.06, 315.67, 315.32, 329.14, 330.34, 333.59, 338.53, 323.1, 306.02, 311.69, 306.36, 306.01, 304.42, 299.02, 273.14, 303.93, 330.58, 330.47, 347.5, 379.64, 386.77, 393.11, 384.84, 358.39, 362.29, 370.15] },
      velocityScore: { '1D': -1.1, '1W': -3.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.5T', pe: 28.2, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.66, GTEK: false, ARKK: 1.79, MARS: false, FRWD: false, BCTK: 5.74, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Alphabet Inc Class C appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 3.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRWD', name: 'CrowdStrike', easyScore: 3, avgWeight: 3.39, proScore: 0.78, coverage: 0.231,
      price: 679, weeklyPrices: [647.74, 691.53, 682.80, 692.91, 679.00], weeklyChange: 4.83, sortRank: 0, periodReturns: { '1M': 14.3, '6M': 39, '1Y': 41.6 },
      priceHistory: { '1W': [647.74, 691.53, 682.8, 692.91, 679], '1M': [618.83, 616.88, 650.11, 648.23, 663.46, 671.55, 645.36, 671, 731, 782.17, 768.95, 747.61, 719.09, 671.02, 658.79, 644.93, 647.74, 691.53, 682.8, 692.91, 679], '6M': [488.53, 478.84, 468.76, 463.87, 455, 452.49, 441.4, 395.5, 429.64, 350.33, 384.86, 434.13, 423.84, 409, 369.58, 398.61, 402.24, 433.15, 454.61, 469.24, 542.26, 618.83, 671.55, 768.95, 644.93, 679], '1Y': [479.39, 485.38, 492.07, 513.51, 470.45, 461.52, 463.15, 441.75, 435.8, 418.6, 417.6, 413.2, 424.87, 445.5, 476.33, 499.96, 509.95, 489.02, 500.11, 545.5, 533.92, 556.73, 513.67, 512.34, 524.17, 519.54, 470.02, 477.11, 453.58, 470.61, 453.88, 468.33, 441.4, 395.5, 429.64, 350.33, 384.86, 434.13, 423.84, 413.31, 380.06, 423.23, 398.49, 449.61, 454.99, 469.24, 542.26, 618.83, 671.55, 768.95, 644.93, 679] },
      velocityScore: { '1D': -1.3, '1W': 5.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$173B', pe: null, revenueGrowth: 26, eps: -0.14, grossMargin: 75, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.47, IGV: 6.46, FDTX: 1.24, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'CrowdStrike appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 3.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'COHR', name: 'Coherent Corp', easyScore: 3, avgWeight: 3.32, proScore: 0.77, coverage: 0.231,
      price: 392.93, weeklyPrices: [354.77, 363.58, 385.03, 413.84, 392.93], weeklyChange: 10.76, sortRank: 0, periodReturns: { '1M': 2.7, '6M': 124.3, '1Y': 386.5 },
      priceHistory: { '1W': [354.77, 363.58, 385.03, 413.84, 392.93], '1M': [362.83, 353.63, 358.5, 378, 377.57, 381.35, 380.18, 376.95, 361.47, 362.9, 426.89, 417.43, 421.9, 376.99, 401.93, 355.94, 354.77, 363.58, 385.03, 413.84, 392.93], '6M': [175.2, 191.87, 184.57, 173.15, 195.96, 196.94, 212.18, 227.68, 217.23, 248.89, 298.91, 252.32, 247.37, 253.63, 243.48, 253.22, 307.93, 347.51, 321.53, 329.89, 379.69, 362.83, 381.35, 426.89, 355.94, 392.93], '1Y': [80.76, 80.96, 86.64, 91.25, 97.82, 98.43, 107.23, 105.6, 116.56, 87.76, 91.58, 88.47, 103.49, 103.41, 106.52, 114.65, 116.67, 110.41, 115.37, 138.06, 128.7, 158.01, 138.15, 148.85, 170.96, 197.45, 170.44, 191.37, 194.33, 178.06, 191.04, 197.76, 212.18, 227.68, 217.23, 248.89, 298.91, 252.32, 247.37, 255.05, 219.65, 255.1, 313.42, 343.79, 303.97, 329.89, 379.69, 362.83, 381.35, 426.89, 355.94, 392.93] },
      velocityScore: { '1D': 0, '1W': -1.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$77B', pe: 186.2, revenueGrowth: 21, eps: 2.11, grossMargin: 37, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.75, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 3.72, FWD: false, CBSE: 2.48, FCUS: false, WGMI: false },
      tonyNote: 'Coherent Corp appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 3.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CDNS', name: 'CADENCE DESIGN SYSTEMS INC', easyScore: 3, avgWeight: 2.8, proScore: 0.65, coverage: 0.231,
      price: 391.52, weeklyPrices: [385.13, 383.74, 384.96, 394.50, 391.52], weeklyChange: 1.66, sortRank: 0, periodReturns: { '1M': 12.8, '6M': 22.5, '1Y': 30.2 },
      priceHistory: { '1W': [385.13, 383.74, 384.96, 394.5, 391.52], '1M': [345.99, 338.12, 350.89, 358.46, 373.59, 381.75, 374.05, 373.85, 374.93, 414.16, 416.39, 408, 411.68, 376.19, 394.24, 390.9, 385.13, 383.74, 384.96, 394.5, 391.52], '6M': [319.53, 316.93, 312.58, 318.8, 320.6, 318.32, 296.36, 283.52, 299.46, 279.8, 303.36, 298.05, 292.72, 283.9, 271.77, 279.39, 288.2, 318.5, 336.54, 349.51, 364.2, 345.99, 381.75, 416.39, 390.9, 391.52], '1Y': [300.81, 296.8, 309.46, 322.91, 314.58, 326.46, 371.03, 360.5, 353.61, 346.88, 344.03, 347.32, 338.53, 347.27, 356.96, 351.97, 350, 324.1, 330.51, 341.43, 333.22, 318.51, 303.21, 303.66, 336.11, 338.06, 313.02, 317.76, 310.4, 327.31, 317.45, 322.02, 296.36, 283.52, 299.46, 279.8, 303.36, 298.05, 292.72, 292.52, 270.88, 279.48, 292.37, 325.84, 325.31, 349.51, 364.2, 345.99, 381.75, 416.39, 390.9, 391.52] },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$108B', pe: 91.1, revenueGrowth: 19, eps: 4.3, grossMargin: 86, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 3.97, FDTX: false, GTEK: 2.52, ARKK: false, MARS: false, FRWD: 1.92, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'CADENCE DESIGN SYSTEMS INC appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'POWL', easyScore: 3, avgWeight: 5.43, proScore: 3.26, coverage: 0.6,
      price: 298.19, weeklyPrices: [262.34, 290.50, 294.75, 303.53, 298.19], weeklyChange: 13.67, sortRank: 0, periodReturns: { '1M': 1.9, '6M': 168.9, '1Y': 358.4 },
      priceHistory: { '1W': [262.34, 290.5, 294.75, 303.53, 298.19], '1M': [266.8, 261.58, 271.05, 270.75, 279.22, 291.97, 295.94, 288.9, 284.42, 288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75, 303.53, 298.19], '6M': [110.88, 112.88, 106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 181.38, 177.5, 173.36, 170.61, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 269.95, 322.05, 266.8, 291.97, 299.07, 283.51, 298.19], '1Y': [65.05, 62.82, 70.01, 70.64, 72.53, 78.32, 76.88, 78.75, 90.06, 84.7, 91.08, 85.72, 92.33, 97.11, 97.88, 105.74, 105.13, 109.92, 110.96, 136.12, 126.71, 121.07, 107.22, 104.18, 107.83, 119.95, 105.77, 112.06, 117.51, 121.83, 139.99, 141.15, 147.86, 194.74, 195.02, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 269.95, 322.05, 266.8, 291.97, 299.07, 283.51, 298.19] },
      velocityScore: { '1D': 0.6, '1W': -22.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 58.1, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { POW: 6.73, VOLT: 7.65, PBD: false, PBW: 1.9, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'PWR', name: 'PWR', easyScore: 3, avgWeight: 4.89, proScore: 2.93, coverage: 0.6,
      price: 730.37, weeklyPrices: [650.92, 683.29, 707.74, 724.35, 730.37], weeklyChange: 12.21, sortRank: 0, periodReturns: { '1M': -5.1, '6M': 66.6, '1Y': 101.9 },
      priceHistory: { '1W': [650.92, 683.29, 707.74, 724.35, 730.37], '1M': [723.03, 714.13, 709.93, 716.91, 723.44, 742.18, 733.62, 730.1, 711.73, 687.48, 706.06, 715.67, 719.17, 695.11, 693.81, 691.95, 650.92, 683.29, 707.74, 724.35, 730.37], '6M': [438.49, 435.2, 422.06, 413.17, 447.64, 468.76, 474.63, 508.11, 524.08, 549.11, 572.66, 568.04, 574.02, 555.39, 549.98, 554.38, 595.84, 604.97, 637.28, 757.34, 781.38, 723.03, 742.18, 706.06, 691.95, 730.37], '1Y': [361.8, 372.26, 372.29, 382.12, 389.12, 405.11, 411.11, 389.12, 391.57, 379.27, 383.92, 374.41, 390.17, 376.01, 402.87, 420.65, 443.45, 436.93, 412.21, 448.69, 438.66, 448.91, 439.29, 450.14, 456.02, 462.21, 414.25, 433.58, 439.68, 422.57, 466.75, 470.77, 474.63, 508.11, 524.08, 549.11, 572.66, 568.04, 574.02, 567.45, 533.78, 555.57, 594.4, 605.89, 630.94, 757.34, 781.38, 723.03, 742.18, 706.06, 691.95, 730.37] },
      velocityScore: { '1D': -0.7, '1W': 13.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$110B', pe: 99.8, revenueGrowth: 26, eps: 7.32, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.75, VOLT: 5.51, PBD: false, PBW: false, IVEP: 4.41 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'ETN', name: 'ETN', easyScore: 3, avgWeight: 4.44, proScore: 2.66, coverage: 0.6,
      price: 413.24, weeklyPrices: [375.46, 393.64, 391.39, 407.06, 413.24], weeklyChange: 10.06, sortRank: 0, periodReturns: { '1M': 3.5, '6M': 25.3, '1Y': 22.3 },
      priceHistory: { '1W': [375.46, 393.64, 391.39, 407.06, 413.24], '1M': [381.87, 371.88, 379.69, 381.51, 391.35, 403.13, 406.37, 401.94, 400.6, 400.08, 417.62, 421.21, 418.61, 395.94, 403.14, 401.72, 375.46, 393.64, 391.39, 407.06, 413.24], '6M': [329.93, 322.81, 318.51, 320.58, 333.46, 331.22, 351.42, 373.82, 389.25, 362.05, 377.4, 353.87, 361.04, 356.8, 357.36, 363.89, 403.36, 407.57, 416.77, 422.44, 419, 381.87, 403.13, 417.62, 401.72, 413.24], '1Y': [338.01, 343.26, 355.04, 359.78, 362.89, 380.24, 390.09, 356.45, 363.3, 349, 352.02, 342.99, 362.25, 363.35, 372.21, 373.84, 376.7, 381.72, 360.6, 387.75, 377.72, 367.91, 338.29, 336.65, 335.57, 353.45, 315.82, 323.67, 327.31, 324.51, 343.75, 332.28, 351.42, 373.82, 389.25, 362.05, 377.4, 353.87, 361.04, 359.74, 343.53, 368.85, 401.9, 409.7, 413.07, 422.44, 419, 381.87, 403.13, 417.62, 401.72, 413.24] },
      velocityScore: { '1D': 1.5, '1W': 10.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$160B', pe: 40.4, revenueGrowth: 17, eps: 10.22, grossMargin: 37, dividendYield: 1.08,
      etfPresence: { POW: 4.07, VOLT: 5.31, PBD: false, PBW: false, IVEP: 3.94 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'GEV', name: 'GEV', easyScore: 3, avgWeight: 3.68, proScore: 2.21, coverage: 0.6,
      price: 1005.29, weeklyPrices: [920.15, 867.09, 906.79, 940.66, 1005.29], weeklyChange: 9.25, sortRank: 0, periodReturns: { '1M': -4.2, '6M': 46.5, '1Y': 106.1 },
      priceHistory: { '1W': [920.15, 867.09, 906.79, 940.66, 1005.29], '1M': [1012.25, 1011.8, 1024.52, 1043.82, 1038.74, 1070.47, 1031.89, 996, 968.32, 950.54, 969.67, 959.36, 963.33, 933.61, 933.85, 920.15, 867.09, 906.79, 940.66, 1005.29], '6M': [686.22, 661.45, 653.57, 628.4, 642.23, 657.78, 726.37, 737.53, 816.56, 830.34, 873.6, 789.23, 805.02, 851.07, 853.16, 897.36, 991.12, 990.18, 1120.23, 1062.95, 1040.15, 1049.23, 1038.74, 950.54, 933.85, 1005.29], '1Y': [487.88, 510.84, 506, 535.77, 561.17, 629.03, 632.67, 649.72, 657.44, 603.13, 625.91, 577.04, 643.56, 614.79, 628.97, 606.15, 606.12, 644.41, 585.33, 570.98, 547.96, 576.08, 554.93, 572.56, 601.97, 723, 686.22, 661.45, 653.57, 628.4, 642.23, 657.78, 726.37, 779.35, 802.13, 831.7, 873.6, 789.23, 805.02, 851.07, 853.16, 897.36, 991.12, 990.18, 1120.23, 1073.95, 1040.15, 1049.23, 1038.74, 950.54, 933.85, 1005.29] },
      velocityScore: { '1D': 0.9, '1W': 22.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$270B', pe: 29.3, revenueGrowth: 16, eps: 34.27, grossMargin: 20, dividendYield: 0.2,
      etfPresence: { POW: 3.21, VOLT: 3.96, PBD: false, PBW: false, IVEP: 3.86 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 3, avgWeight: 3.68, proScore: 2.21, coverage: 0.6,
      price: 289.76, weeklyPrices: [234.23, 248.88, 260.22, 274.50, 289.76], weeklyChange: 23.71, sortRank: 0, periodReturns: { '1M': 5, '6M': 230.7, '1Y': 1164.8 },
      priceHistory: { '1W': [234.23, 248.88, 260.22, 274.5, 289.76], '1M': [258.71, 261.34, 282.31, 307.88, 302.49, 302.4, 293.8, 290.01, 285, 273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22, 274.5, 289.76], '6M': [87.61, 91.43, 86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 166, 151.32, 153.68, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 283.92, 258.71, 302.4, 302.85, 259.61, 289.76], '1Y': [22.91, 22.95, 22.13, 28.71, 24.69, 26.89, 37.62, 37.61, 41.25, 43.1, 49.94, 52.45, 62.96, 79.67, 69.18, 90.19, 87.58, 116.58, 94.37, 133.71, 129.05, 127.07, 104.97, 94.29, 102.5, 101.29, 76.97, 91.88, 98.69, 134.07, 149.5, 139.62, 151.37, 143.03, 139.74, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 288.64, 283.92, 258.71, 302.4, 302.85, 259.61, 289.76] },
      velocityScore: { '1D': 3.3, '1W': 45.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$82B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: 3.88, PBD: false, PBW: 2.2, IVEP: 4.97 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'NEE', name: 'NEE', easyScore: 3, avgWeight: 3.51, proScore: 2.1, coverage: 0.6,
      price: 86.36, weeklyPrices: [85.12, 84.84, 85.99, 86.12, 86.36], weeklyChange: 1.46, sortRank: 0, periodReturns: { '1M': -7.5, '6M': 6.2, '1Y': 17.1 },
      priceHistory: { '1W': [85.12, 84.84, 85.99, 86.12, 86.36], '1M': [89.04, 90.06, 88.27, 89.69, 88.55, 87.65, 87.65, 87.25, 87.01, 83.66, 85.68, 84.58, 85.68, 85.84, 84.01, 84.83, 85.12, 84.84, 85.99, 86.12, 86.36], '6M': [81.32, 79.79, 80.28, 79.49, 82.19, 84.81, 87.9, 89.47, 93.8, 94.06, 92.71, 92.01, 92.82, 89.5, 91.4, 92.73, 92.3, 92.01, 94.83, 95.51, 94.84, 89.04, 87.65, 85.68, 84.83, 86.36], '1Y': [73.78, 71.4, 73.06, 73.65, 74.77, 72.82, 70.99, 71.18, 71.86, 76.51, 74.84, 71.63, 71.04, 70.31, 73.83, 78.67, 84.04, 85.79, 82.84, 81.76, 81.69, 85.76, 84.64, 84.83, 84.95, 81.27, 80.29, 80.45, 80.93, 79.89, 83.63, 85.47, 87.9, 89.47, 93.8, 94.06, 92.71, 92.01, 92.82, 90.23, 92.05, 93.67, 91.31, 90.6, 96.51, 95.51, 94.84, 89.04, 87.65, 85.68, 84.83, 86.36] },
      velocityScore: { '1D': -1.9, '1W': 40, '1M': null, '6M': null }, isNew: false,
      marketCap: '$180B', pe: 21.9, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.89,
      etfPresence: { POW: 2.02, VOLT: 4.93, PBD: false, PBW: false, IVEP: 3.57 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'NVT', name: 'NVT', easyScore: 3, avgWeight: 3.43, proScore: 2.06, coverage: 0.6,
      price: 171.77, weeklyPrices: [156.79, 164.52, 165.84, 169.00, 171.77], weeklyChange: 9.55, sortRank: 0, periodReturns: { '1M': 1.6, '6M': 67.7, '1Y': 144 },
      priceHistory: { '1W': [156.79, 164.52, 165.84, 169, 171.77], '1M': [160.69, 158.23, 161.86, 163.57, 164.66, 169.29, 167.8, 164.87, 166.99, 171.55, 173.39, 176.39, 173.88, 162.86, 163.81, 163.8, 156.79, 164.52, 165.84, 169, 171.77], '6M': [102.41, 103.97, 101.97, 102.72, 107.98, 110.29, 112.26, 112.64, 113.25, 114.93, 120.27, 108.13, 114.3, 116.3, 116.98, 117.41, 133.16, 135.8, 141.71, 162.69, 173.39, 160.69, 169.29, 173.39, 163.8, 171.77], '1Y': [70.4, 72.34, 72.16, 75.2, 74.48, 76.63, 78.72, 89.73, 91.84, 88.15, 90.84, 89.49, 94.98, 96.46, 97.27, 100.12, 98.72, 101.1, 96.93, 106.28, 109.62, 109.59, 104.31, 104.93, 104.97, 108.87, 94.99, 103.97, 106.82, 105.38, 112.5, 110.58, 112.26, 112.64, 113.25, 114.93, 120.27, 108.13, 114.3, 121, 112.75, 118.92, 134.48, 137, 138.3, 162.69, 173.39, 160.69, 169.29, 173.39, 163.8, 171.77] },
      velocityScore: { '1D': 0, '1W': 16.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$28B', pe: 58.4, revenueGrowth: 54, eps: 2.94, grossMargin: 37, dividendYield: 0.5,
      etfPresence: { POW: 3.94, VOLT: 3.11, PBD: false, PBW: false, IVEP: 3.24 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'HUBB', name: 'HUBB', easyScore: 3, avgWeight: 2.87, proScore: 1.72, coverage: 0.6,
      price: 509.5, weeklyPrices: [467.59, 469.32, 476.89, 489.73, 509.50], weeklyChange: 8.96, sortRank: 0, periodReturns: { '1M': 6.2, '6M': 16.2, '1Y': 30 },
      priceHistory: { '1W': [467.59, 469.32, 476.89, 489.73, 509.5], '1M': [470.87, 461.5, 463.32, 460.98, 475.01, 478.05, 484.25, 473.93, 473.61, 462.93, 480.46, 484.91, 485.27, 476.82, 485.03, 486.47, 467.59, 469.32, 476.89, 489.73, 509.5], '6M': [438.42, 455.92, 444.11, 460.87, 484.11, 485.53, 487.94, 503.8, 524.12, 516.99, 516.98, 487.76, 472.64, 475.74, 480.97, 499.2, 539.79, 546.23, 555.34, 516, 490.16, 470.87, 478.05, 480.46, 486.47, 509.5], '1Y': [391.89, 402.99, 410.51, 417.71, 418.42, 434.95, 437.44, 427.67, 432.14, 432.81, 442.52, 428.8, 442.33, 433.26, 431.16, 430.47, 419.67, 434.05, 422.63, 472.57, 459.44, 450.12, 417.28, 429.82, 429.34, 448.18, 429.68, 456.28, 463.03, 470.53, 489.31, 486.82, 487.94, 503.8, 524.12, 516.99, 516.98, 487.76, 472.64, 489.07, 472.07, 499.31, 545.62, 549.11, 544.71, 516, 490.16, 470.87, 478.05, 480.46, 486.47, 509.5] },
      velocityScore: { '1D': 0, '1W': 8.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 30.1, revenueGrowth: 11, eps: 16.9, grossMargin: 36, dividendYield: 1.16,
      etfPresence: { POW: 2.87, VOLT: 3.29, PBD: false, PBW: false, IVEP: 2.46 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'BELFB', name: 'BELFB', easyScore: 2, avgWeight: 5.75, proScore: 2.3, coverage: 0.4,
      price: 295.41, weeklyPrices: [276.95, 296.55, 293.87, 302.15, 295.41], weeklyChange: 6.67, sortRank: 0, periodReturns: { '1M': 15.1, '6M': 72, '1Y': 233 },
      priceHistory: { '1W': [276.95, 296.55, 293.87, 302.15, 295.41], '1M': [258.28, 249.71, 254.75, 260.4, 270.01, 276.25, 280.13, 276.96, 274.52, 269.86, 269.22, 280.09, 276.54, 262.56, 279.13, 276.04, 276.95, 296.55, 293.87, 302.15, 295.41], '6M': [171.76, 177.23, 169.63, 180.24, 196.61, 196.5, 201.19, 220.78, 232.84, 231.83, 222.45, 191.81, 205.11, 204.09, 203.53, 206.9, 237.93, 254.38, 250.96, 286.69, 302.73, 258.28, 276.25, 269.22, 276.04, 295.41], '1Y': [88.72, 92.48, 95.52, 102.24, 98.77, 107.07, 125.91, 131.71, 134.66, 127.8, 139.31, 138.07, 145.68, 144.6, 142.27, 142.5, 146.89, 150.77, 148.25, 152.46, 154.25, 152.12, 144.07, 150.84, 159.74, 172.82, 164.18, 176.17, 172.78, 187.43, 200.11, 205.17, 201.19, 220.78, 232.84, 231.83, 222.45, 191.81, 205.11, 214.98, 197.83, 210.32, 237.34, 257.41, 249.82, 286.69, 302.73, 258.28, 276.25, 269.22, 276.04, 295.41] },
      velocityScore: { '1D': 1.3, '1W': -16.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 71.4, revenueGrowth: 17, eps: 4.14, grossMargin: 39, dividendYield: 0.09,
      etfPresence: { POW: 3.59, VOLT: 7.91, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.23, proScore: 1.29, coverage: 0.4,
      price: 308.06, weeklyPrices: [280.98, 297.88, 302.87, 311.93, 308.06], weeklyChange: 9.64, sortRank: 0, periodReturns: { '1M': -17, '6M': 91.7, '1Y': 164.5 },
      priceHistory: { '1W': [280.98, 297.88, 302.87, 311.93, 308.06], '1M': [339.73, 322.63, 315.67, 323.4, 327.46, 323.91, 319.78, 314.18, 315.71, 323.39, 334.49, 331.44, 323.92, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87, 311.93, 308.06], '6M': [160.66, 166.26, 162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 245.42, 257.75, 264.35, 264.74, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 330.97, 367.92, 339.73, 323.91, 334.49, 289.52, 308.06], '1Y': [116.45, 122.32, 122.54, 128.37, 125.4, 130.19, 144.17, 138.76, 143.72, 129.05, 127.93, 125.59, 136.74, 136.83, 141.62, 161.59, 167.38, 180.51, 171.59, 199.27, 180.82, 179.05, 164.86, 169.57, 178.88, 181.82, 149.83, 166.87, 175.61, 163.58, 176.93, 181.23, 186.18, 195.58, 234.53, 245.42, 257.75, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 330.97, 367.92, 339.73, 323.91, 334.49, 289.52, 308.06] },
      velocityScore: { '1D': 0.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$118B', pe: 77.2, revenueGrowth: 30, eps: 3.99, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 2.43, PBD: false, PBW: false, IVEP: 4.02 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'AEP', name: 'AEP', easyScore: 2, avgWeight: 2.79, proScore: 1.12, coverage: 0.4,
      price: 130.07, weeklyPrices: [128.53, 128.48, 129.23, 129.31, 130.07], weeklyChange: 1.2, sortRank: 0, periodReturns: { '1M': 3.9, '6M': 13.5, '1Y': 27.6 },
      priceHistory: { '1W': [128.53, 128.48, 129.23, 129.31, 130.07], '1M': [127.68, 128.92, 128.87, 129.61, 131.59, 130.9, 129.57, 127.76, 126.67, 123.79, 127.11, 126.31, 127.79, 129.14, 126.77, 127.76, 128.53, 128.48, 129.23, 129.31, 130.07], '6M': [114.57, 115.15, 115.31, 115.93, 119.4, 116.63, 119.78, 120.8, 129.94, 132.03, 133.29, 131.86, 134.15, 125.66, 130.1, 132.36, 134.46, 133.28, 135.07, 134.66, 130.7, 127.68, 130.9, 127.11, 127.76, 130.07], '1Y': [101.91, 103.28, 104.39, 104.74, 105.49, 108.89, 113.25, 113.24, 111.99, 112.66, 112.63, 110.03, 108.34, 107.52, 108.88, 112.75, 118.19, 118.53, 117.27, 122.11, 120.3, 122.73, 123.51, 121.58, 118.06, 114.16, 114.71, 115.31, 115.81, 116.91, 119.96, 118.02, 119.78, 120.8, 129.94, 132.03, 133.29, 131.86, 134.15, 127.92, 131.12, 132.92, 135.46, 131.89, 135.59, 134.66, 130.7, 127.68, 130.9, 127.11, 127.76, 130.07] },
      velocityScore: { '1D': -0.9, '1W': -20.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$71B', pe: 19.2, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.94,
      etfPresence: { POW: 1.41, VOLT: 4.17, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.55, proScore: 1.02, coverage: 0.4,
      price: 147, weeklyPrices: [147.75, 139.36, 144.01, 144.96, 147.00], weeklyChange: -0.51, sortRank: 0, periodReturns: { '1M': 2.7, '6M': 23.7, '1Y': 40.7 },
      priceHistory: { '1W': [147.75, 139.36, 144.01, 144.96, 147], '1M': [137.31, 135.42, 137.75, 135.47, 138.36, 140.22, 138.2, 136.15, 134.06, 133.91, 141.99, 146.96, 147.4, 143.65, 144.05, 147.75, 139.36, 144.01, 144.96, 147], '6M': [118.85, 121.13, 119.75, 111.29, 112.95, 113.59, 119.26, 132.52, 138.57, 143.79, 144.3, 132.4, 130.16, 129.7, 131.29, 133.75, 142.82, 140.98, 143.38, 145.08, 139.52, 143.08, 138.36, 133.91, 144.05, 147], '1Y': [104.49, 103.6, 104.67, 106.5, 107.28, 110.13, 103.24, 104.84, 106.64, 104.52, 108.46, 105.34, 107.8, 107.41, 106.54, 108.89, 108.31, 107.85, 111.18, 112.21, 111.04, 121.94, 114.44, 114.65, 114.22, 115.81, 118.85, 121.13, 119.75, 111.29, 112.95, 113.59, 119.26, 137.65, 139.24, 142.83, 144.3, 132.4, 130.16, 129.7, 131.29, 133.75, 142.82, 140.98, 143.38, 144.4, 139.52, 143.08, 138.36, 133.91, 144.05, 147] },
      velocityScore: { '1D': -1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$90B', pe: 45, revenueGrowth: 8, eps: 3.27, grossMargin: 37, dividendYield: 1.1,
      etfPresence: { POW: false, VOLT: 1.45, PBD: false, PBW: false, IVEP: 3.64 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 2.5, proScore: 1, coverage: 0.4,
      price: 71.57, weeklyPrices: [72.26, 71.62, 72.08, 71.49, 71.57], weeklyChange: -0.95, sortRank: 0, periodReturns: { '1M': -7.9, '6M': 22.5, '1Y': 21 },
      priceHistory: { '1W': [72.26, 71.62, 72.08, 71.49, 71.57], '1M': [77.69, 79.4, 77.88, 77.52, 78.47, 76.34, 74.37, 73.13, 71.39, 70.04, 71.31, 71.66, 72.43, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08, 71.49, 71.57], '6M': [58.41, 59.75, 60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 72.28, 72.98, 76.26, 73.18, 73.89, 72.41, 73.58, 72.59, 71.54, 70.91, 71.61, 75.41, 74.18, 77.69, 76.34, 71.31, 71.59, 71.57], '1Y': [59.15, 61.12, 58.72, 57.85, 58.48, 57.71, 59.24, 59, 57.76, 56.57, 57.13, 57.73, 58.76, 59.02, 62.86, 63.69, 63.5, 63.78, 62.16, 56.98, 56.51, 60.6, 59.17, 59.37, 61.55, 60.5, 58.84, 59.46, 60.85, 60.32, 61.55, 64.29, 67.26, 66.92, 72.28, 72.98, 76.26, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 75.41, 74.18, 77.69, 76.34, 71.31, 71.59, 71.57] },
      velocityScore: { '1D': -2.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$88B', pe: 31.4, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.94,
      etfPresence: { POW: false, VOLT: 1.47, PBD: false, PBW: false, IVEP: 3.53 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CEG', name: 'CEG', easyScore: 2, avgWeight: 2.33, proScore: 0.93, coverage: 0.4,
      price: 269.63, weeklyPrices: [242.30, 246.71, 253.76, 262.35, 269.63], weeklyChange: 11.28, sortRank: 0, periodReturns: { '1M': 0.9, '6M': -26.3, '1Y': -12.5 },
      priceHistory: { '1W': [242.3, 246.71, 253.76, 262.35, 269.63], '1M': [262, 260.67, 281.26, 285.83, 294.07, 301.57, 288.68, 286.31, 287.75, 265.7, 272.65, 267.24, 264.59, 254.83, 250.67, 251.65, 242.3, 246.71, 253.76, 262.35, 269.63], '6M': [365.63, 361.33, 353.27, 322.54, 341.2, 289.06, 280.68, 261.42, 288.43, 293.8, 327.16, 322.99, 305.58, 281.99, 301.49, 275.16, 291.72, 287.56, 315.17, 321.05, 299.69, 262, 301.57, 272.65, 251.65, 269.63], '1Y': [308.01, 320.66, 307.92, 317.11, 308.2, 323.7, 345.27, 343.57, 338.57, 317.23, 316.58, 308.48, 320, 321.27, 339.13, 350.9, 371, 403.95, 350.06, 401.43, 362.82, 351.67, 339.35, 351.6, 361.26, 362.07, 340.97, 363.95, 366.25, 342.52, 307.71, 285.27, 280.68, 261.42, 288.43, 293.8, 327.16, 322.99, 305.58, 289.76, 298.61, 272.58, 296.61, 277.7, 305.71, 321.05, 299.69, 262, 301.57, 272.65, 251.65, 269.63] },
      velocityScore: { '1D': 0, '1W': 111.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$96B', pe: 23.4, revenueGrowth: 64, eps: 11.52, grossMargin: 23, dividendYield: 0.65,
      etfPresence: { POW: 1.31, VOLT: false, PBD: false, PBW: false, IVEP: 3.34 },
      tonyNote: 'CEG appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX TECHNOLOGIES INC', easyScore: 2, avgWeight: 2.07, proScore: 0.83, coverage: 0.4,
      price: 199.03, weeklyPrices: [183.00, 194.68, 193.45, 193.94, 199.03], weeklyChange: 8.76, sortRank: 0, periodReturns: { '1M': -2.8, '6M': 14.9, '1Y': 42.5 },
      priceHistory: { '1W': [183, 194.68, 193.45, 193.94, 199.03], '1M': [201.94, 197.33, 202.66, 202.52, 202.91, 204.38, 198.95, 199.27, 195.88, 188.39, 187.26, 184.72, 190.76, 185.95, 187.46, 188.96, 183, 194.68, 193.45, 193.94, 199.03], '6M': [173.2, 177.62, 172.84, 193.2, 213.25, 207.75, 205.43, 197.19, 200.4, 198.38, 216.47, 200.39, 204.67, 199.75, 202.59, 215.98, 232.83, 228.24, 222.07, 216.68, 210.8, 201.94, 204.38, 187.26, 188.96, 199.03], '1Y': [139.67, 142.31, 140.37, 137.56, 139.85, 143.37, 152.38, 182, 179.51, 165.76, 166.52, 160.95, 166.13, 168.38, 175.02, 187.18, 197.01, 203.82, 191.17, 213.69, 200.39, 195.65, 175.91, 175.26, 174.71, 179.65, 168.12, 177.18, 181.85, 201.46, 217.89, 206.04, 205.43, 197.19, 200.4, 198.38, 216.47, 200.39, 204.67, 204.85, 191.59, 214.44, 238.27, 216.66, 216.18, 216.68, 210.8, 201.94, 204.38, 187.26, 188.96, 199.03] },
      velocityScore: { '1D': -2.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 53.2, revenueGrowth: 26, eps: 3.74, grossMargin: 23, dividendYield: 0.54,
      etfPresence: { POW: false, VOLT: 2.03, PBD: false, PBW: false, IVEP: 2.12 },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'XEL', name: 'XEL', easyScore: 2, avgWeight: 1.96, proScore: 0.78, coverage: 0.4,
      price: 79.17, weeklyPrices: [78.10, 78.27, 79.22, 79.35, 79.17], weeklyChange: 1.38, sortRank: 0, periodReturns: { '1M': 1.6, '6M': 7.4, '1Y': 18.5 },
      priceHistory: { '1W': [78.1, 78.27, 79.22, 79.35, 79.17], '1M': [78.1, 79.73, 79.86, 80.2, 81.08, 80.78, 81, 79.26, 79.5, 76.41, 77.87, 77.39, 77.77, 79.04, 77.62, 77.87, 78.1, 78.27, 79.22, 79.35, 79.17], '6M': [73.73, 74.01, 73.86, 73.38, 75.36, 75.01, 76.06, 75.9, 81.59, 83.35, 83.8, 82.1, 81.63, 76.77, 78.09, 80.39, 80.45, 80.32, 79.41, 81.17, 80.6, 78.1, 80.78, 77.87, 77.87, 79.17], '1Y': [66.79, 68.23, 68.71, 67.84, 69.17, 72.5, 72.39, 73.73, 72.39, 73.22, 72.54, 72.43, 72.31, 72.05, 77.93, 80.31, 81.85, 81.8, 80.69, 79.69, 81.59, 81.16, 81, 80.39, 78.39, 74.62, 73.14, 74.09, 74.68, 74.26, 75.61, 75.73, 76.06, 75.9, 81.59, 83.35, 83.8, 82.1, 81.63, 76.95, 79.17, 80.54, 79.83, 79.08, 79.48, 81.17, 80.6, 78.1, 80.78, 77.87, 77.87, 79.17] },
      velocityScore: { '1D': 0, '1W': -20.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$49B', pe: 22.8, revenueGrowth: 3, eps: 3.47, grossMargin: 46, dividendYield: 2.99,
      etfPresence: { POW: 2, VOLT: 1.92, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'XEL appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NRG', name: 'NRG ENERGY INC', easyScore: 2, avgWeight: 1.58, proScore: 0.63, coverage: 0.4,
      price: 134.38, weeklyPrices: [120.65, 123.70, 125.47, 130.40, 134.38], weeklyChange: 11.38, sortRank: 0, periodReturns: { '1M': 5.1, '6M': -16.1, '1Y': -12.7 },
      priceHistory: { '1W': [120.65, 123.7, 125.47, 130.4, 134.38], '1M': [125.5, 123.71, 133.98, 136.92, 137.65, 140.43, 138, 137.5, 134.08, 129.47, 133.51, 133.76, 133.39, 129.2, 127.71, 129.96, 120.65, 123.7, 125.47, 130.4, 134.38], '6M': [160.15, 158.11, 159.24, 143.53, 158.5, 149.3, 152.63, 153.32, 172.35, 176.52, 175.58, 155.42, 152.48, 145.8, 147.74, 149.8, 170.24, 157.18, 160.15, 154.82, 137.3, 125.5, 140.43, 133.51, 129.96, 134.38], '1Y': [153.94, 153.68, 155.96, 150.27, 144.96, 160.55, 166.59, 171.96, 156.69, 148.38, 146.23, 146.91, 161.21, 164.58, 165.58, 161.91, 167.52, 171.33, 160.42, 178.5, 167.99, 162.84, 166.45, 163.81, 166.77, 168.16, 149.48, 160.56, 166.16, 149.27, 152.05, 149.93, 152.63, 153.32, 172.35, 176.52, 175.58, 155.42, 152.48, 151.77, 141.23, 153.06, 170.96, 149.86, 154.81, 154.82, 137.3, 125.5, 140.43, 133.51, 129.96, 134.38] },
      velocityScore: { '1D': -12.5, '1W': 70.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$28B', pe: 147.7, revenueGrowth: 20, eps: 0.91, grossMargin: 16, dividendYield: 1.46,
      etfPresence: { POW: false, VOLT: 0.94, PBD: false, PBW: false, IVEP: 2.22 },
      tonyNote: 'NRG ENERGY INC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 1.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VICR', name: 'VICR', easyScore: 1, avgWeight: 5.4, proScore: 1.08, coverage: 0.2,
      price: 326.98, weeklyPrices: [275.51, 298.06, 303.77, 322.41, 326.98], weeklyChange: 18.68, sortRank: 0, periodReturns: { '1M': 19.5, '6M': 249.9, '1Y': 629.2 },
      priceHistory: { '1W': [275.51, 298.06, 303.77, 322.41, 326.98], '1M': [249.02, 243.43, 264.2, 268.29, 267.99, 332.95, 345.84, 342.09, 334.84, 328.85, 332.95, 330.48, 306.12, 271.04, 274.97, 283.48, 275.51, 298.06, 303.77, 322.41, 326.98], '6M': [93.45, 108.97, 109.6, 136.11, 145.48, 153.29, 157.67, 159.87, 155.96, 171.8, 209.19, 170.03, 185.42, 164.54, 153.02, 155.71, 186.22, 224.81, 268.61, 251.02, 312.96, 249.02, 332.95, 332.95, 283.48, 326.98], '1Y': [44.84, 45.39, 45.34, 46.72, 47.32, 52.68, 45.81, 46.91, 48.43, 47.24, 51.51, 50.51, 50.09, 52.21, 52.81, 49.31, 51.5, 57.31, 85.76, 91.17, 88.36, 92.58, 84.66, 88.15, 92.82, 100.83, 97.19, 108.46, 116.86, 142.31, 149.88, 158.46, 157.67, 159.87, 155.96, 171.8, 209.19, 170.03, 185.42, 173.07, 142.22, 159.83, 190.1, 246.24, 248.7, 251.02, 312.96, 249.02, 332.95, 332.95, 283.48, 326.98] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$15B', pe: 109, revenueGrowth: 20, eps: 3, grossMargin: 54, dividendYield: null,
      etfPresence: { POW: 5.4, VOLT: false, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Vicor Corp is a power conversion specialist — high-efficiency modules for AI server power delivery. It holds a niche position in Industrials ETFs on the data center power density thesis. Revenue growth has been lumpy, but when AI GPU clusters require Vicor\'s factorized power architecture, the order cycles are large.',
    },
    {
      ticker: 'AEIS', name: 'ADVANCED ENERGY INDUSTRIES INC', easyScore: 1, avgWeight: 4.62, proScore: 0.92, coverage: 0.2,
      price: 354.68, weeklyPrices: [308.17, 340.40, 354.37, 370.66, 354.68], weeklyChange: 15.09, sortRank: 0, periodReturns: { '1M': 9.7, '6M': 64.8, '1Y': 183.2 },
      priceHistory: { '1W': [308.17, 340.4, 354.37, 370.66, 354.68], '1M': [309.06, 302.84, 313.05, 323.79, 324.86, 339.65, 328.34, 317.08, 302.18, 294.65, 312.28, 322.5, 320.92, 294.81, 306.11, 311.64, 308.17, 340.4, 354.37, 370.66, 354.68], '6M': [215.16, 217.51, 209.37, 210.99, 257.29, 262.19, 255.36, 273.26, 314.27, 329.24, 340.42, 305.02, 308.31, 317.21, 310.76, 331.9, 378.94, 380.22, 385.68, 387.03, 354.97, 309.06, 339.65, 312.28, 311.64, 354.68], '1Y': [125.26, 132.51, 133.59, 141.13, 139.42, 142.84, 144.07, 139.58, 158.81, 150.41, 154.44, 145.25, 157.25, 157.79, 170.77, 176.2, 174.92, 189.96, 190.46, 208.05, 195.05, 215.98, 199.22, 205.92, 213.44, 221.47, 204.49, 217.23, 221.99, 219.59, 253.86, 263.03, 255.36, 273.26, 314.27, 329.24, 340.42, 305.02, 308.31, 329.78, 298.29, 339.32, 385.73, 385, 369.08, 387.03, 354.97, 309.06, 339.65, 312.28, 311.64, 354.68] },
      velocityScore: { '1D': -17.9, '1W': -25.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$14B', pe: 73.6, revenueGrowth: 26, eps: 4.82, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: false, VOLT: 4.62, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'HYLN', name: 'Hyliion Holdings Corp', easyScore: 1, avgWeight: 4.53, proScore: 0.91, coverage: 0.2,
      price: 7.57, weeklyPrices: [6.92, 7.51, 7.40, 7.41, 7.57], weeklyChange: 9.39, sortRank: 0, periodReturns: { '1M': 62.1, '6M': 315.9, '1Y': 385.3 },
      priceHistory: { '1W': [6.92, 7.51, 7.4, 7.41, 7.57], '1M': [4.2, 4.09, 4.09, 4.2, 5.99, 6.6, 6.94, 7.19, 6.99, 6.25, 6.79, 6.46, 7.62, 6.9, 7.22, 6.34, 6.92, 7.51, 7.4, 7.41, 7.57], '6M': [1.82, 1.99, 1.84, 1.98, 2.23, 2.19, 2.05, 2.01, 2.04, 1.95, 2.23, 1.97, 1.98, 1.77, 1.8, 1.7, 1.84, 1.96, 1.84, 2.11, 2.76, 4.2, 6.6, 6.79, 6.34, 7.57], '1Y': [1.56, 1.39, 1.37, 1.51, 1.52, 1.81, 1.55, 1.53, 1.69, 1.57, 1.83, 1.59, 1.64, 1.77, 2.24, 2.05, 2.51, 2.5, 2.02, 2.27, 2.09, 2.18, 1.68, 1.84, 1.89, 1.94, 1.76, 1.98, 1.82, 1.94, 2.23, 2.1, 2.05, 2.01, 2.04, 1.95, 2.23, 1.97, 1.98, 1.9, 1.66, 1.7, 1.9, 1.89, 1.81, 2.11, 2.76, 4.2, 6.6, 6.79, 6.34, 7.57] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$1B', pe: null, revenueGrowth: 479, eps: -0.3, grossMargin: 6, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 4.53, IVEP: false },
      tonyNote: 'Hyliion is a small-cap commercial truck powertrain electrification company. It holds a speculative position in Electrification ETFs on the heavy-duty vehicle decarbonization thesis. Revenue is early-stage and the path to profitability is long; the ETF weight is small, reflecting a lottery-ticket allocation to an electrification theme adjacent holding.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 5.38, proScore: 2.15, coverage: 0.4,
      price: 866.9, weeklyPrices: [770.25, 838.55, 858.99, 866.67, 866.90], weeklyChange: 12.55, sortRank: 0, periodReturns: { '1M': 2.1, '6M': 171.6, '1Y': 313.7 },
      priceHistory: { '1W': [770.25, 838.55, 858.99, 866.67, 866.9], '1M': [770.76, 728.29, 752, 733.77, 732.94, 783.53, 782.12, 842.96, 860.84, 845.39, 875.52, 957.03, 993.74, 882.43, 891.86, 842.01, 770.25, 838.55, 858.99, 866.67, 866.9], '6M': [319.13, 315.87, 306.23, 297.62, 336.31, 351.39, 357.91, 401.29, 437.77, 434.64, 432.87, 411.38, 417.76, 401.61, 420.24, 393.71, 459.02, 472.9, 505.45, 529.49, 868.18, 770.76, 783.53, 875.52, 842.01, 866.9], '1Y': [209.55, 229.38, 222.54, 233.39, 243.23, 253.14, 263.35, 296.58, 308.4, 276.02, 292.95, 273.82, 301.13, 320.94, 344.05, 337.93, 366.99, 365.39, 332.75, 403.35, 382.57, 381.22, 333.88, 332.96, 323.46, 331.61, 283.57, 314, 319.16, 308.13, 350.96, 361.21, 357.91, 401.29, 437.77, 434.64, 432.87, 411.38, 417.76, 422.55, 382.55, 382.22, 464.54, 472.84, 471.85, 529.49, 868.18, 770.76, 783.53, 875.52, 842.01, 866.9] },
      velocityScore: { '1D': -0.5, '1W': -6.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 77.5, revenueGrowth: 92, eps: 11.18, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 6.33, PRN: 4.42, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 5.25, proScore: 2.1, coverage: 0.4,
      price: 298.19, weeklyPrices: [262.34, 290.50, 294.75, 303.53, 298.19], weeklyChange: 13.67, sortRank: 0, periodReturns: { '1M': 1.9, '6M': 168.9, '1Y': 358.4 },
      priceHistory: { '1W': [262.34, 290.5, 294.75, 303.53, 298.19], '1M': [266.8, 261.58, 271.05, 270.75, 279.22, 291.97, 295.94, 288.9, 284.42, 288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75, 303.53, 298.19], '6M': [110.88, 112.88, 106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 181.38, 177.5, 173.36, 170.61, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 269.95, 322.05, 266.8, 291.97, 299.07, 283.51, 298.19], '1Y': [65.05, 62.82, 70.01, 70.64, 72.53, 78.32, 76.88, 78.75, 90.06, 84.7, 91.08, 85.72, 92.33, 97.11, 97.88, 105.74, 105.13, 109.92, 110.96, 136.12, 126.71, 121.07, 107.22, 104.18, 107.83, 119.95, 105.77, 112.06, 117.51, 121.83, 139.99, 141.15, 147.86, 194.74, 195.02, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 269.95, 322.05, 266.8, 291.97, 299.07, 283.51, 298.19] },
      velocityScore: { '1D': 0.5, '1W': -1.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 58.1, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { AIRR: 2.69, PRN: false, RSHO: 7.8, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 4.95, proScore: 1.98, coverage: 0.4,
      price: 958.36, weeklyPrices: [856.16, 897.63, 910.57, 933.93, 958.36], weeklyChange: 11.94, sortRank: 0, periodReturns: { '1M': 7.9, '6M': 62.7, '1Y': 164.4 },
      priceHistory: { '1W': [856.16, 897.63, 910.57, 933.93, 958.36], '1M': [863.95, 860.15, 872.56, 865.95, 879.89, 908.55, 909.93, 887.67, 875.87, 865.36, 909.81, 926.18, 940.48, 904.28, 915.64, 914.7, 856.16, 897.63, 910.57, 933.93, 958.36], '6M': [588.93, 582.42, 572.87, 608.13, 647.18, 626.62, 657.36, 726.2, 774.2, 756.47, 752.32, 704.82, 699.78, 680.88, 695.4, 721.24, 791.73, 798.4, 828.79, 874.78, 926.79, 863.95, 908.55, 909.81, 914.7, 958.36], '1Y': [362.44, 373.02, 390.92, 402.18, 412.88, 427.59, 434.12, 434.23, 412.71, 416.09, 431.26, 415.12, 422.91, 450.66, 469.79, 480.82, 502.12, 534.05, 513.91, 585.49, 547.58, 567.93, 546.88, 566.61, 591.49, 615.35, 561.89, 583.76, 598.41, 617.62, 646.89, 635.92, 657.36, 726.2, 774.2, 756.47, 752.32, 704.82, 699.78, 701.7, 667.43, 724.44, 794.25, 800.45, 817.87, 874.78, 926.79, 863.95, 908.55, 909.81, 914.7, 958.36] },
      velocityScore: { '1D': 0, '1W': -3.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$441B', pe: 47.7, revenueGrowth: 22, eps: 20.08, grossMargin: 29, dividendYield: 0.7,
      etfPresence: { AIRR: false, PRN: 3.3, RSHO: 6.59, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.63, proScore: 1.85, coverage: 0.4,
      price: 1950.69, weeklyPrices: [1719.48, 1843.42, 1877.61, 1952.02, 1950.69], weeklyChange: 13.45, sortRank: 0, periodReturns: { '1M': -2.1, '6M': 101.4, '1Y': 289.4 },
      priceHistory: { '1W': [1719.48, 1843.42, 1877.61, 1952.02, 1950.69], '1M': [1854.43, 1825.5, 1835.51, 1835.33, 1828.25, 1883.56, 1867.09, 1855.15, 1828.21, 1787.88, 1883.26, 1850.04, 1914.65, 1843.94, 1852.03, 1831.56, 1719.48, 1843.42, 1877.61, 1952.02, 1950.69], '6M': [968.5, 965.37, 933.29, 971.49, 1091.04, 1121.44, 1142.1, 1230.26, 1337.95, 1413.57, 1438.24, 1372.4, 1414.1, 1356.75, 1366.77, 1434.09, 1627.81, 1680.09, 1794.04, 1891.95, 2032.98, 1854.43, 1883.56, 1883.26, 1831.56, 1950.69], '1Y': [500.91, 513.32, 521.66, 535.02, 546.63, 547.91, 702.97, 691.45, 718.61, 683.93, 707.39, 700.69, 752.1, 762.91, 791.46, 834.33, 844.62, 837.11, 790.72, 1010.64, 955.96, 954.53, 920.99, 957.04, 949.3, 1021.36, 883.79, 958.07, 1003.64, 1010.41, 1119.98, 1127.55, 1142.1, 1230.26, 1337.95, 1413.57, 1438.24, 1372.4, 1414.1, 1408.25, 1273.18, 1424.91, 1650.48, 1674.16, 1719.21, 1891.95, 2032.98, 1854.43, 1883.56, 1883.26, 1831.56, 1950.69] },
      velocityScore: { '1D': 2.2, '1W': 1.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$69B', pe: 56.5, revenueGrowth: 1, eps: 34.55, grossMargin: 25, dividendYield: 0.13,
      etfPresence: { AIRR: 4.45, PRN: 4.82, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, avgWeight: 4.29, proScore: 1.71, coverage: 0.4,
      price: 699.96, weeklyPrices: [588.90, 623.66, 641.68, 688.87, 699.96], weeklyChange: 18.86, sortRank: 0, periodReturns: { '1M': -3.1, '6M': 118.7, '1Y': 220.2 },
      priceHistory: { '1W': [588.9, 623.66, 641.68, 688.87, 699.96], '1M': [664.76, 639.58, 630.5, 644.64, 656.35, 670.66, 673.51, 677.45, 667.02, 646.89, 663.14, 686.37, 689.43, 694.72, 619.98, 613.93, 588.9, 623.66, 641.68, 688.87, 699.96], '6M': [320.1, 333.23, 313.32, 313.98, 329.66, 363.88, 347.11, 352.09, 409.95, 441.71, 445.36, 466.38, 466.52, 473.85, 566.62, 572.31, 598.44, 611.21, 660.85, 697.15, 683.52, 664.76, 670.66, 663.14, 613.93, 699.96], '1Y': [218.59, 214.63, 203.78, 206.63, 213.25, 216.2, 240.5, 233.13, 239.05, 213.76, 230.02, 227.03, 225.82, 239.42, 260.56, 279.62, 281.67, 312.5, 267.62, 292.22, 303.2, 347.88, 344.36, 373.29, 351.09, 325.77, 296.56, 328.26, 325.96, 311.87, 383.66, 353.5, 347.11, 352.09, 409.95, 441.71, 445.36, 466.38, 466.52, 463.15, 513.98, 576.95, 603.91, 615.42, 630.7, 697.15, 683.52, 664.76, 670.66, 663.14, 613.93, 699.96] },
      velocityScore: { '1D': 5.6, '1W': 6.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 61.6, revenueGrowth: 50, eps: 11.37, grossMargin: 21, dividendYield: 0.29,
      etfPresence: { AIRR: 4.17, PRN: 4.4, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Argan Inc is an engineering and construction company for power generation facilities — natural gas and renewable power plants. It appears in Industrials ETFs because power plant construction is one of the fastest-growing categories in U.S. infrastructure spending, driven by data center load additions that the grid cannot currently support.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.44, proScore: 1.38, coverage: 0.4,
      price: 326.05, weeklyPrices: [314.08, 318.89, 320.11, 316.18, 326.05], weeklyChange: 3.81, sortRank: 0, periodReturns: { '1M': 6.1, '6M': 26.1, '1Y': 41.7 },
      priceHistory: { '1W': [314.08, 318.89, 320.11, 316.18, 326.05], '1M': [305.22, 302.64, 306.25, 305.66, 307.1, 311.33, 312.65, 308.53, 303.81, 300.98, 308.31, 313.39, 313.67, 315.29, 314.42, 322.81, 314.08, 318.89, 320.11, 316.18, 326.05], '6M': [258.47, 263.58, 256.77, 264.62, 282.47, 280.14, 260.41, 291.74, 279.84, 278.74, 283.54, 267.57, 256.83, 253.77, 260.67, 269.55, 293.26, 293.92, 298.1, 303.99, 310.55, 305.22, 311.33, 308.31, 322.81, 326.05], '1Y': [230.06, 234.89, 242.14, 251.4, 255.52, 267.01, 273.62, 269.28, 270.68, 262.92, 266.99, 261.53, 263.45, 259.5, 259.37, 257.98, 255.19, 247.97, 253.5, 254.1, 256.47, 255.53, 242.61, 255.78, 260.88, 264.32, 256.73, 264.33, 259.63, 272.25, 281.21, 281.54, 260.41, 291.74, 279.84, 278.74, 283.54, 267.57, 256.83, 262.23, 258.01, 272.54, 292.01, 293.59, 301.24, 303.99, 310.55, 305.22, 311.33, 308.31, 322.81, 326.05] },
      velocityScore: { '1D': 0, '1W': 1.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 30.8, revenueGrowth: 7, eps: 10.59, grossMargin: 30, dividendYield: 0.65,
      etfPresence: { AIRR: 1.72, PRN: false, RSHO: 5.17, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.83, proScore: 1.13, coverage: 0.4,
      price: 240.54, weeklyPrices: [223.63, 233.49, 230.05, 237.06, 240.54], weeklyChange: 7.56, sortRank: 0, periodReturns: { '1M': 19.7, '6M': 10.9, '1Y': 55.1 },
      priceHistory: { '1W': [223.63, 233.49, 230.05, 237.06, 240.54], '1M': [200.47, 195.79, 205.55, 205.39, 207.8, 219.08, 215.34, 213.82, 216.66, 220.92, 230.08, 234.08, 236.14, 227.8, 229.95, 228.01, 223.63, 233.49, 230.05, 237.06, 240.54], '6M': [216.89, 205.46, 200.06, 207.44, 213.61, 211.03, 208.41, 222.32, 239, 237.18, 225.02, 209.8, 203.42, 186.77, 200, 196.9, 221.27, 217.61, 222.45, 201.12, 203.24, 200.47, 219.08, 230.08, 228.01, 240.54], '1Y': [155.05, 162.31, 168.95, 172.78, 175.13, 175.58, 181.26, 203.71, 191.17, 188, 192.05, 182.65, 188, 184.91, 182.39, 185.92, 188.45, 185.21, 187.4, 200, 213.49, 221.42, 204.36, 215.7, 209.57, 217.69, 207.33, 208.48, 203.26, 207.51, 217.65, 215.21, 208.41, 222.32, 239, 237.18, 225.02, 209.8, 203.42, 194.52, 190.71, 195.43, 224.82, 216.49, 216.36, 201.12, 203.24, 200.47, 219.08, 230.08, 228.01, 240.54] },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 45.9, revenueGrowth: 17, eps: 5.24, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.67, PRN: false, RSHO: 4, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 2, avgWeight: 2.74, proScore: 1.09, coverage: 0.4,
      price: 278.89, weeklyPrices: [249.49, 264.60, 264.67, 270.44, 278.89], weeklyChange: 11.78, sortRank: 0, periodReturns: { '1M': 7.1, '6M': 42.9, '1Y': 62.5 },
      priceHistory: { '1W': [249.49, 264.6, 264.67, 270.44, 278.89], '1M': [256.99, 253.12, 261.21, 259.89, 256.55, 261.89, 258.02, 259.89, 258.25, 255.52, 250.72, 248.63, 249.33, 251.9, 246.55, 257.16, 249.49, 264.6, 264.67, 270.44, 278.89], '6M': [195.18, 209.57, 205.02, 210.02, 224.26, 214.89, 208.08, 223.16, 250.21, 257.04, 265.11, 254.14, 240.73, 231.21, 227.9, 236.57, 256.14, 255.62, 241.7, 239.7, 273.58, 256.99, 261.89, 250.72, 257.16, 278.89], '1Y': [171.6, 176.57, 176.22, 181.42, 184.3, 186.4, 192.14, 179.32, 180.9, 171.9, 175.92, 174.49, 183.8, 185.39, 190.22, 194.85, 191.65, 192.27, 191.23, 203.48, 205.02, 208.9, 201.22, 203.68, 194.29, 192.39, 191.19, 212.17, 211.71, 218.27, 224.89, 215.39, 208.08, 223.16, 250.21, 257.04, 265.11, 254.14, 240.73, 236.04, 222.99, 236.02, 258.03, 247.72, 240.43, 239.7, 273.58, 256.99, 261.89, 250.72, 257.16, 278.89] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$112B', pe: 64.9, revenueGrowth: 19, eps: 4.3, grossMargin: 35, dividendYield: 0.18,
      etfPresence: { AIRR: false, PRN: 3.31, RSHO: false, IDEF: 2.16, BILT: false },
      tonyNote: 'Howmet Aerospace is an aerospace structures and engine components manufacturer. It appears in Industrials ETFs for its aerospace and defense exposure — commercial air travel recovery and defense spending growth are the two demand drivers. Revenue grew and margins are expanding as Howmet prices power over OEM customers.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.34, proScore: 0.94, coverage: 0.4,
      price: 199.03, weeklyPrices: [183.00, 194.68, 193.45, 193.94, 199.03], weeklyChange: 8.76, sortRank: 0, periodReturns: { '1M': -2.8, '6M': 14.9, '1Y': 42.5 },
      priceHistory: { '1W': [183, 194.68, 193.45, 193.94, 199.03], '1M': [201.94, 197.33, 202.66, 202.52, 202.91, 204.38, 198.95, 199.27, 195.88, 188.39, 187.26, 184.72, 190.76, 185.95, 187.46, 188.96, 183, 194.68, 193.45, 193.94, 199.03], '6M': [173.2, 177.62, 172.84, 193.2, 213.25, 207.75, 205.43, 197.19, 200.4, 198.38, 216.47, 200.39, 204.67, 199.75, 202.59, 215.98, 232.83, 228.24, 222.07, 216.68, 210.8, 201.94, 204.38, 187.26, 188.96, 199.03], '1Y': [139.67, 142.31, 140.37, 137.56, 139.85, 143.37, 152.38, 182, 179.51, 165.76, 166.52, 160.95, 166.13, 168.38, 175.02, 187.18, 197.01, 203.82, 191.17, 213.69, 200.39, 195.65, 175.91, 175.26, 174.71, 179.65, 168.12, 177.18, 181.85, 201.46, 217.89, 206.04, 205.43, 197.19, 200.4, 198.38, 216.47, 200.39, 204.67, 204.85, 191.59, 214.44, 238.27, 216.66, 216.18, 216.68, 210.8, 201.94, 204.38, 187.26, 188.96, 199.03] },
      velocityScore: { '1D': 0, '1W': 3.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 53.2, revenueGrowth: 26, eps: 3.74, grossMargin: 23, dividendYield: 0.54,
      etfPresence: { AIRR: 3.02, PRN: false, RSHO: false, IDEF: 1.66, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 1.96, proScore: 0.78, coverage: 0.4,
      price: 56.72, weeklyPrices: [54.82, 58.78, 57.75, 57.02, 56.72], weeklyChange: 3.46, sortRank: 0, periodReturns: { '1M': 8.9, '6M': -22.4, '1Y': 37.6 },
      priceHistory: { '1W': [54.82, 58.78, 57.75, 57.02, 56.72], '1M': [54.22, 53.47, 55.82, 54.67, 56.18, 56.8, 57.3, 65.19, 64.13, 63.49, 63.27, 58.43, 63.4, 58.52, 57.73, 56.19, 54.82, 58.78, 57.75, 57.02, 56.72], '6M': [73.13, 82.3, 75.91, 104.04, 124.56, 110.39, 103.01, 94.41, 89.06, 94.31, 90.72, 92.47, 89.53, 84.62, 71.94, 74.09, 73.55, 69.83, 63.16, 61.93, 56.99, 54.22, 56.8, 63.27, 56.19, 56.72], '1Y': [41.21, 40.77, 43.07, 46.02, 54.28, 58.78, 58.01, 59.4, 69.14, 64.02, 68.05, 64.5, 65.66, 75.74, 81.18, 92.96, 105.67, 90.58, 84.3, 91.21, 90.22, 76.59, 70.36, 75.05, 72.78, 76.91, 69.77, 79.97, 79.29, 113.7, 130.72, 111.32, 103.01, 94.41, 89.06, 94.31, 90.72, 92.47, 89.53, 83.69, 65.28, 71.96, 73.66, 68.55, 61.66, 61.93, 56.99, 54.22, 56.8, 63.27, 56.19, 56.72] },
      velocityScore: { '1D': -2.5, '1W': -2.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 333.6, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.84, PRN: false, RSHO: false, IDEF: 1.08, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.88, proScore: 0.75, coverage: 0.4,
      price: 300.14, weeklyPrices: [297.52, 289.13, 300.95, 297.68, 300.14], weeklyChange: 0.88, sortRank: 0, periodReturns: { '1M': -8, '6M': -8.2, '1Y': 30.9 },
      priceHistory: { '1W': [297.52, 289.13, 300.95, 297.68, 300.14], '1M': [329.35, 324.6, 321.92, 317.55, 320.63, 320.95, 317.56, 320.9, 308.17, 296.41, 293.66, 287.54, 294.53, 293.04, 292.26, 297.52, 289.13, 300.95, 297.68, 300.14], '6M': [326.8, 354.52, 340.07, 378.47, 418.86, 418.58, 420.51, 369.38, 406.76, 437.57, 444.52, 429.11, 415.71, 407.98, 381.79, 407.66, 394.46, 392.19, 358.4, 360.6, 316.28, 326.17, 320.63, 296.41, 292.26, 300.14], '1Y': [229.26, 231.63, 246.31, 248.92, 253.82, 265.56, 260.84, 270.92, 268, 265.4, 271.74, 269.33, 271.93, 272.46, 277.51, 286.01, 285.38, 291.94, 287.53, 299.14, 315.9, 324.19, 309.16, 314.73, 309.23, 323.14, 326.8, 354.52, 340.07, 378.47, 418.86, 418.58, 420.51, 397.77, 418.78, 438.01, 444.52, 429.11, 415.71, 407.98, 381.79, 407.66, 394.46, 392.19, 358.4, 363.37, 316.28, 326.17, 320.63, 296.41, 292.26, 300.14] },
      velocityScore: { '1D': 0, '1W': 1.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 19.5, revenueGrowth: 13, eps: 15.4, grossMargin: 12, dividendYield: 1.84,
      etfPresence: { AIRR: 2.68, PRN: false, RSHO: false, IDEF: 1.07, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'WMB', name: 'WMB', easyScore: 2, avgWeight: 1.37, proScore: 0.55, coverage: 0.4,
      price: 71.57, weeklyPrices: [72.26, 71.62, 72.08, 71.49, 71.57], weeklyChange: -0.95, sortRank: 0, periodReturns: { '1M': -7.9, '6M': 22.5, '1Y': 21 },
      priceHistory: { '1W': [72.26, 71.62, 72.08, 71.49, 71.57], '1M': [77.69, 79.4, 77.88, 77.52, 78.47, 76.34, 74.37, 73.13, 71.39, 70.04, 71.31, 71.66, 72.43, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08, 71.49, 71.57], '6M': [58.41, 59.75, 60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 72.28, 72.98, 76.26, 73.18, 73.89, 72.41, 73.58, 72.59, 71.54, 70.91, 71.61, 75.41, 74.18, 77.69, 76.34, 71.31, 71.59, 71.57], '1Y': [59.15, 61.12, 58.72, 57.85, 58.48, 57.71, 59.24, 59, 57.76, 56.57, 57.13, 57.73, 58.76, 59.02, 62.86, 63.69, 63.5, 63.78, 62.16, 56.98, 56.51, 60.6, 59.17, 59.37, 61.55, 60.5, 58.84, 59.46, 60.85, 60.32, 61.55, 64.29, 67.26, 66.92, 72.28, 72.98, 76.26, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 75.41, 74.18, 77.69, 76.34, 71.31, 71.59, 71.57] },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$88B', pe: 31.4, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.94,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.95, IDEF: false, BILT: 1.79 },
      tonyNote: 'WMB appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.15, proScore: 0.46, coverage: 0.4,
      price: 623.45, weeklyPrices: [576.74, 607.46, 603.64, 616.95, 623.45], weeklyChange: 8.1, sortRank: 0, periodReturns: { '1M': 9.6, '6M': 38.2, '1Y': 68.9 },
      priceHistory: { '1W': [576.74, 607.46, 603.64, 616.95, 623.45], '1M': [551.12, 565.22, 571.05, 566.96, 559.95, 584.4, 577.42, 577.83, 571.96, 566.14, 578.34, 584.18, 589.76, 590.09, 590.97, 592.41, 576.74, 607.46, 603.64, 616.95, 623.45], '6M': [451.17, 457.07, 448.43, 485, 497.06, 504.07, 499.67, 544.02, 552.44, 562.54, 584.89, 565.64, 546.91, 531.11, 532.25, 552.4, 595.74, 596.86, 591, 593.12, 613.59, 551.12, 584.4, 578.34, 592.41, 623.45], '1Y': [369.08, 388.19, 381.43, 379.82, 389.57, 389.3, 384.87, 403.78, 404.99, 397.81, 399, 383.6, 378.08, 379.79, 378.54, 384.8, 382.19, 372.71, 393.88, 408.94, 427.24, 442.47, 423.39, 442.95, 438.15, 447.58, 444.99, 458.38, 458.79, 487.16, 498.82, 504.5, 499.67, 544.02, 552.44, 562.54, 584.89, 565.64, 546.91, 537.2, 524.38, 553.31, 598.23, 591.32, 594.39, 593.12, 613.59, 551.12, 584.4, 578.34, 592.41, 623.45] },
      velocityScore: { '1D': 2.2, '1W': -20.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 68.7, revenueGrowth: 18, eps: 9.07, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.81, PRN: false, RSHO: false, IDEF: 0.49, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.13, proScore: 0.45, coverage: 0.4,
      price: 113.89, weeklyPrices: [106.81, 119.32, 120.30, 115.93, 113.89], weeklyChange: 6.63, sortRank: 0, periodReturns: { '1M': 23.8, '6M': 58.6, '1Y': 129.9 },
      priceHistory: { '1W': [106.81, 119.32, 120.3, 115.93, 113.89], '1M': [93.39, 92.8, 94.81, 96.36, 98.55, 99.32, 97.11, 108.11, 111.7, 111.28, 112.87, 111.59, 117.82, 111.27, 110.94, 108.82, 106.81, 119.32, 120.3, 115.93, 113.89], '6M': [71.8, 75.07, 73.01, 88.74, 102.95, 99.05, 93.88, 82.2, 82.36, 85.9, 91.01, 89.36, 80.71, 77.26, 71.4, 75.76, 82.52, 84.12, 77.06, 78.53, 91.95, 93.39, 99.32, 112.87, 108.82, 113.89], '1Y': [49.53, 49.96, 50.63, 52.4, 51.68, 52.91, 53, 54.24, 68.02, 64.22, 67.64, 67.47, 71.7, 73.82, 74.27, 81.18, 83.92, 78.15, 75.54, 77.44, 75.71, 72.74, 67.94, 69.05, 70.23, 75.19, 69.63, 74.7, 76.03, 93.48, 103.02, 98.89, 93.88, 82.2, 82.36, 85.9, 91.01, 89.36, 80.71, 78.29, 69.86, 77.53, 84.09, 83.36, 76.53, 78.53, 91.95, 93.39, 99.32, 112.87, 108.82, 113.89] },
      velocityScore: { '1D': -4.3, '1W': 7.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.21, PRN: false, RSHO: false, IDEF: 1.04, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 1.03, proScore: 0.41, coverage: 0.4,
      price: 50.98, weeklyPrices: [45.87, 49.58, 47.83, 48.27, 50.98], weeklyChange: 11.14, sortRank: 0, periodReturns: { '1M': -18.8, '6M': -24.1, '1Y': 7.3 },
      priceHistory: { '1W': [45.87, 49.58, 47.83, 48.27, 50.98], '1M': [66.21, 64.2, 65.76, 65.3, 64.1, 60.66, 63.52, 65.86, 57.5, 53.65, 54.65, 51.84, 54.39, 49.44, 49.64, 48.37, 45.87, 49.58, 47.83, 48.27, 50.98], '6M': [67.19, 79.98, 73.17, 101.28, 109.49, 108.22, 103.8, 95.36, 75.79, 81.27, 93.04, 106.09, 104.08, 99.38, 84.07, 86.1, 87.79, 82.69, 71.95, 65.32, 58.82, 66.21, 60.66, 54.65, 48.37, 50.98], '1Y': [47.51, 48.28, 44.91, 47.57, 53.74, 49.1, 50.39, 50.39, 49.03, 49.87, 54.69, 53.26, 62.22, 64.11, 66.91, 73.47, 76.6, 75.96, 77.21, 85.79, 84.7, 69.38, 58.95, 64.96, 66.08, 67.27, 64.94, 80.81, 76.85, 106.22, 108.5, 108.71, 103.8, 95.36, 75.79, 81.27, 93.04, 106.09, 104.08, 102.39, 74.82, 82, 90.18, 82.06, 70.3, 65.32, 58.82, 66.21, 60.66, 54.65, 48.37, 50.98] },
      velocityScore: { '1D': 0, '1W': -10.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: 221.7, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.86, PRN: false, RSHO: false, IDEF: 0.19, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.58, proScore: 0.23, coverage: 0.4,
      price: 45.95, weeklyPrices: [46.11, 49.69, 48.53, 46.68, 45.95], weeklyChange: -0.35, sortRank: 0, periodReturns: { '1M': 10.7, '6M': 38.7, '1Y': 5.2 },
      priceHistory: { '1W': [46.11, 49.69, 48.53, 46.68, 45.95], '1M': [42.84, 42.81, 44.56, 44.55, 44.92, 45.8, 45.35, 48.41, 48.76, 47.96, 47.39, 45.61, 46.71, 46.15, 46.55, 47.35, 46.11, 49.69, 48.53, 46.68, 45.95], '6M': [33.12, 34.62, 34.09, 38.84, 42.26, 40.99, 41.06, 38.93, 38.13, 38.14, 45.49, 47.41, 45.3, 43.82, 44.84, 46.73, 47.43, 44.24, 40.72, 40, 41.49, 42.84, 45.8, 47.39, 47.35, 45.95], '1Y': [43.66, 43.12, 45.09, 47.01, 48.01, 47.53, 43.24, 41.48, 41.87, 41.17, 41.93, 41.79, 41.14, 41.54, 42.55, 44.58, 45.43, 40.19, 39.94, 38.43, 36.15, 35.59, 34, 33.78, 33.79, 34.02, 32.55, 34.52, 34.78, 40.99, 42.57, 40.63, 41.06, 38.93, 38.13, 38.14, 45.49, 47.41, 45.3, 44.4, 43.25, 46.19, 47.54, 43.2, 40.18, 40, 41.49, 42.84, 45.8, 47.39, 47.35, 45.95] },
      velocityScore: { '1D': -4.2, '1W': -4.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 42.9, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.77,
      etfPresence: { AIRR: 0.86, PRN: false, RSHO: false, IDEF: 0.31, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.35, proScore: 0.14, coverage: 0.4,
      price: 78.27, weeklyPrices: [68.72, 73.61, 74.92, 76.55, 78.27], weeklyChange: 13.9, sortRank: 0, periodReturns: { '1M': -1.5, '6M': 12.7, '1Y': 83.3 },
      priceHistory: { '1W': [68.72, 73.61, 74.92, 76.55, 78.27], '1M': [75.43, 74.91, 76.99, 74.88, 72.76, 74.67, 74.47, 73.27, 71.49, 74.26, 74.29, 72.26, 72.38, 70.53, 72.13, 71.48, 68.72, 73.61, 74.92, 76.55, 78.27], '6M': [69.46, 68.65, 67.02, 70.17, 75.17, 76.01, 78.89, 83.48, 82.74, 84.99, 73.57, 72.04, 71.31, 69.34, 76.15, 77.66, 83.8, 84.38, 87.5, 92.76, 82.79, 75.43, 74.67, 74.29, 71.48, 78.27], '1Y': [42.7, 44.53, 46.36, 47.45, 50.77, 49.17, 47.65, 47.66, 58.77, 56.02, 58.99, 59.03, 62.46, 63.62, 64.78, 63.75, 63.58, 63.3, 64.22, 69.34, 65.72, 62.63, 60.48, 65.16, 67.63, 67.56, 66.02, 68.93, 69.35, 70.53, 75.09, 77.34, 78.89, 83.48, 82.74, 84.99, 73.57, 72.04, 71.31, 72.44, 72.83, 77.31, 86.16, 85.11, 86.87, 92.76, 82.79, 75.43, 74.67, 74.29, 71.48, 78.27] },
      velocityScore: { '1D': 0, '1W': 7.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 53.6, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.31,
      etfPresence: { AIRR: 0.67, PRN: false, RSHO: false, IDEF: 0.03, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'Timken Company', easyScore: 1, avgWeight: 9.3, proScore: 1.86, coverage: 0.2,
      price: 141.84, weeklyPrices: [132.39, 137.40, 137.06, 139.12, 141.84], weeklyChange: 7.14, sortRank: 0, periodReturns: { '1M': 23.9, '6M': 65.4, '1Y': 98 },
      priceHistory: { '1W': [132.39, 137.4, 137.06, 139.12, 141.84], '1M': [112.73, 109.36, 117.2, 118.93, 119.95, 127.42, 127.16, 126.78, 127.98, 126.54, 131.9, 131.82, 133.66, 131.83, 134.67, 137.09, 132.39, 137.4, 137.06, 139.12, 141.84], '6M': [85.77, 86.09, 84.13, 90.6, 93.73, 93.94, 93.19, 106.04, 107.84, 107.83, 109.99, 100.58, 98.74, 95.25, 97.56, 98.94, 106.9, 108.45, 108.7, 107.12, 117.39, 112.73, 127.42, 131.9, 137.09, 141.84], '1Y': [71.63, 73.62, 75.44, 77.68, 76.68, 80.99, 74.77, 74.65, 76.91, 76.88, 78.96, 75.12, 76.4, 77.11, 75.67, 75.11, 75.86, 74.7, 75.85, 79.25, 76.29, 78.2, 74.33, 81.22, 82.52, 87.53, 84.14, 86.02, 86.29, 91.17, 93.55, 94.02, 93.19, 106.04, 107.84, 107.83, 109.99, 100.58, 98.74, 98.99, 95.94, 99.17, 106.81, 108.75, 106.88, 107.12, 117.39, 112.73, 127.42, 131.9, 137.09, 141.84] },
      velocityScore: { '1D': 0, '1W': 3.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 32.2, revenueGrowth: 8, eps: 4.4, grossMargin: 31, dividendYield: 1.04,
      etfPresence: { AIRR: false, PRN: false, RSHO: 9.3, IDEF: false, BILT: false },
      tonyNote: 'Timken Company appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 9.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 7.89, proScore: 1.58, coverage: 0.2,
      price: 185.73, weeklyPrices: [177.41, 184.21, 183.53, 183.64, 185.73], weeklyChange: 4.69, sortRank: 0, periodReturns: { '1M': 8.5, '6M': 3.2, '1Y': 26.8 },
      priceHistory: { '1W': [177.41, 184.21, 183.53, 183.64, 185.73], '1M': [175.95, 174.49, 174.85, 175.98, 177.01, 178.97, 176.59, 178.96, 179.66, 174.41, 174.26, 172.55, 179.41, 180.99, 178.66, 181.56, 177.41, 184.21, 183.53, 183.64, 185.73], '6M': [179.93, 185.76, 183.4, 187.17, 199.83, 195.93, 200.93, 198.66, 200.06, 201.92, 212.16, 208.23, 206.06, 198.16, 189.71, 198.41, 201.41, 195.79, 173.38, 172.9, 178.61, 175.95, 178.97, 174.26, 181.56, 185.73], '1Y': [146.46, 141.85, 144.19, 146.18, 150.17, 156.49, 158.4, 156.33, 155.49, 153.66, 159.57, 158.11, 155, 158.31, 161.38, 167.2, 168.57, 157, 177.98, 176.36, 175.61, 179.22, 174.72, 172.15, 168.45, 174.72, 177.2, 186.38, 187.25, 188.5, 201.92, 194.13, 200.93, 198.66, 200.06, 201.92, 212.16, 208.23, 206.06, 194.82, 187.15, 197.92, 202.81, 187.17, 175.68, 172.9, 178.61, 175.95, 178.97, 174.26, 181.56, 185.73] },
      velocityScore: { '1D': -0.6, '1W': 2.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$250B', pe: 34.8, revenueGrowth: 9, eps: 5.33, grossMargin: 20, dividendYield: 1.51,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 7.89, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 7.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CGNX', name: 'Cognex Corporation', easyScore: 1, avgWeight: 7.05, proScore: 1.41, coverage: 0.2,
      price: 66.8, weeklyPrices: [58.69, 62.11, 63.61, 65.90, 66.80], weeklyChange: 13.82, sortRank: 0, periodReturns: { '1M': 4, '6M': 81.4, '1Y': 118.7 },
      priceHistory: { '1W': [58.69, 62.11, 63.61, 65.9, 66.8], '1M': [61.91, 60.65, 63.37, 64.27, 66.09, 68.33, 66.7, 66.01, 65.85, 64.64, 66.08, 66.06, 64.67, 60.82, 62.39, 61.32, 58.69, 62.11, 63.61, 65.9, 66.8], '6M': [36.83, 36.66, 35.98, 37.74, 40.59, 39.76, 38.74, 42.37, 58.79, 56.47, 53.83, 50.82, 49.56, 49.24, 47.59, 49.52, 54.39, 55.48, 55.09, 56.3, 67.26, 61.91, 68.33, 66.08, 61.32, 66.8], '1Y': [30.54, 30.71, 32.05, 33.32, 33.32, 34.61, 33.76, 41.86, 42.2, 43.4, 43.89, 43.97, 44.4, 44.08, 45.52, 45.83, 46.75, 45.79, 46.29, 47.44, 40, 38.4, 35.91, 37.76, 37.69, 37.91, 35.76, 36.6, 36.93, 39.01, 40.92, 39.37, 38.74, 42.37, 58.79, 56.47, 53.83, 50.82, 49.56, 50.8, 45.94, 51.69, 55.58, 53.72, 53.74, 56.3, 67.26, 61.91, 68.33, 66.08, 61.32, 66.8] },
      velocityScore: { '1D': null, '1W': -2.8, '1M': null, '6M': null }, isNew: true,
      marketCap: '$11B', pe: 78.6, revenueGrowth: 24, eps: 0.85, grossMargin: 68, dividendYield: 0.51,
      etfPresence: { AIRR: false, PRN: false, RSHO: 7.05, IDEF: false, BILT: false },
      tonyNote: 'Cognex Corporation appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 7.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.42, proScore: 4.42, coverage: 1,
      price: 269.27, weeklyPrices: [211.69, 222.24, 232.36, 260.07, 269.27], weeklyChange: 27.2, sortRank: 0, periodReturns: { '1M': 22.4, '6M': 232.6, '1Y': 433.6 },
      priceHistory: { '1W': [211.69, 222.24, 232.36, 260.07, 269.27], '1M': [199.86, 197.73, 191.82, 219.93, 214.77, 208.06, 208.37, 226.34, 231.09, 264.51, 260.58, 251.68, 259.67, 227.81, 218, 220.12, 211.69, 222.24, 232.36, 260.07, 269.27], '6M': [80.95, 90.03, 83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 98.01, 100.61, 91.01, 94.94, 129.85, 117.62, 100.82, 112.54, 154.56, 159.16, 144.96, 176.42, 186.1, 199.86, 208.06, 260.58, 220.12, 269.27], '1Y': [50.46, 51.02, 50.31, 46.05, 53.31, 51.88, 51.29, 55.17, 75.33, 67.19, 70.48, 65.65, 93.39, 94.08, 113.23, 115.61, 122, 125.83, 98.62, 125.1, 110.54, 102.22, 90.54, 88.88, 98.92, 93.59, 75.45, 91.13, 89.95, 97.93, 108.73, 91.46, 85.19, 86.1, 98.01, 100.61, 91.01, 94.94, 129.85, 114.15, 92.26, 117.4, 161.94, 156.55, 135.51, 176.42, 186.1, 199.86, 208.06, 260.58, 220.12, 269.27] },
      velocityScore: { '1D': -0.7, '1W': -5.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$68B', pe: 103.6, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 3.06, MEME: 5.47, RKNG: 4.72 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 3, avgWeight: 3.99, proScore: 3.99, coverage: 1,
      price: 83.16, weeklyPrices: [87.32, 97.56, 82.41, 87.57, 83.16], weeklyChange: -4.76, sortRank: 0, periodReturns: { '1M': -0.6, '6M': 21.6, '1Y': 98.4 },
      priceHistory: { '1W': [87.32, 97.56, 82.41, 87.57, 83.16], '1M': [86.83, 88.1, 89.58, 96.23, 105.86, 119.7, 129.6, 133.09, 113.41, 105.65, 118.17, 107.73, 107.29, 93.6, 92.06, 88.71, 87.32, 97.56, 82.41, 87.57, 83.16], '6M': [68.37, 85.67, 72.63, 90.56, 101.25, 113.57, 111.21, 101.79, 82.51, 83.9, 86.92, 89.76, 89.11, 89.93, 78.67, 94.81, 98.97, 81, 77.2, 68.43, 82.55, 86.83, 119.7, 118.17, 88.71, 83.16], '1Y': [41.91, 53.22, 45.11, 42.5, 52.63, 58.92, 54.29, 52.57, 49.76, 44.95, 50.43, 45.22, 37.58, 41.19, 54.5, 56.94, 81.2, 95.69, 71.35, 80.06, 70.05, 67.89, 58.22, 55.51, 61.44, 79.05, 61.86, 78.05, 83.47, 97.67, 115.77, 104.78, 111.21, 101.79, 82.51, 83.9, 86.92, 89.76, 89.11, 88.42, 73.82, 92.57, 88.57, 80.01, 71.88, 68.43, 82.55, 86.83, 119.7, 118.17, 88.71, 83.16] },
      velocityScore: { '1D': 1, '1W': -2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$32B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 3.59, MEME: 5.67, RKNG: 2.71 },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 3, avgWeight: 3.91, proScore: 3.91, coverage: 1,
      price: 61.52, weeklyPrices: [51.52, 56.71, 59.77, 60.85, 61.52], weeklyChange: 19.41, sortRank: 0, periodReturns: { '1M': 16.2, '6M': 68.1, '1Y': 491.5 },
      priceHistory: { '1W': [51.52, 56.71, 59.77, 60.85, 61.52], '1M': [50.46, 47.74, 52.71, 58.06, 56.83, 59.78, 67.84, 64.05, 63.54, 65.33, 66.6, 65.48, 61.86, 54.35, 59.19, 54.02, 51.52, 56.71, 59.77, 60.85, 61.52], '6M': [36.59, 42.07, 37.77, 45.68, 51.89, 56.68, 53.74, 41.83, 42.22, 42.36, 41.39, 38.84, 44.94, 41.29, 35.09, 35.13, 43.07, 48.72, 48.36, 49.48, 55.15, 50.46, 59.78, 66.6, 54.02, 61.52], '1Y': [10.4, 11.54, 15.23, 16.96, 17.31, 18.99, 16.14, 16.45, 17.83, 18.73, 22.99, 28.21, 33.63, 37.9, 47.14, 47.08, 60.09, 67.98, 51.83, 60.42, 66.63, 57.38, 48.85, 47.47, 43.96, 43.92, 33.78, 41.98, 42.7, 46.03, 57.82, 52.36, 53.74, 41.83, 42.22, 42.36, 41.39, 38.84, 44.94, 42.16, 31.62, 35.74, 47.37, 45.17, 44.44, 49.48, 55.15, 50.46, 59.78, 66.6, 54.02, 61.52] },
      velocityScore: { '1D': 0.8, '1W': 37.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$22B', pe: 79.9, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 2.95, MEME: 5.52, RKNG: 3.26 },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab', easyScore: 3, avgWeight: 3.71, proScore: 3.71, coverage: 1,
      price: 107, weeklyPrices: [105.05, 114.78, 102.39, 109.25, 107.00], weeklyChange: 1.85, sortRank: 0, periodReturns: { '1M': -14.2, '6M': 92.8, '1Y': 303 },
      priceHistory: { '1W': [105.05, 114.78, 102.39, 109.25, 107], '1M': [131.16, 127.31, 134.28, 125.45, 135.76, 143.2, 150.23, 148.03, 143.48, 122.39, 123.32, 114.7, 119.95, 110.08, 113.65, 108.23, 105.05, 114.78, 102.39, 109.25, 107], '6M': [55.49, 77.18, 69.76, 83.08, 90.76, 88.9, 80.07, 72.32, 67.44, 70.21, 70.97, 71.48, 71.31, 67.23, 60.93, 67.67, 70.62, 89.46, 82.29, 80.31, 117.35, 131.16, 143.2, 123.32, 108.23, 107], '1Y': [26.55, 33.46, 34.33, 39.14, 47.69, 49.15, 46.44, 44.75, 43.43, 40.92, 48.13, 43.53, 46.17, 48.08, 48.69, 47.97, 65.31, 69.27, 60.56, 66.16, 56.57, 51.24, 42.78, 42.6, 44.72, 57.52, 53.96, 77.18, 75.99, 84.85, 96.3, 80.48, 80.07, 72.32, 67.44, 70.21, 70.97, 71.48, 71.31, 68, 57.38, 66.32, 72.22, 86.64, 78.59, 80.31, 117.35, 131.16, 143.2, 123.32, 108.23, 107] },
      velocityScore: { '1D': 0.8, '1W': 3.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$67B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 2.03, MEME: 5.07, RKNG: 4.03 },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 3, avgWeight: 3.69, proScore: 3.69, coverage: 1,
      price: 47.7, weeklyPrices: [38.92, 41.47, 42.70, 46.47, 47.70], weeklyChange: 22.56, sortRank: 0, periodReturns: { '1M': 12.1, '6M': 96.8, '1Y': 313 },
      priceHistory: { '1W': [38.92, 41.47, 42.7, 46.47, 47.7], '1M': [39.14, 36.62, 39.52, 48.02, 45.87, 45.14, 48.98, 49.65, 47.28, 47.94, 47.86, 44.71, 44.15, 39.62, 40.94, 41.91, 38.92, 41.47, 42.7, 46.47, 47.7], '6M': [24.24, 26.08, 24.52, 31.94, 35.22, 37.69, 33.88, 34.95, 35.28, 30, 27.93, 27.03, 27.71, 25.93, 23.76, 25.19, 27.6, 32.19, 33.67, 35.63, 44.59, 39.14, 45.14, 47.86, 41.91, 47.7], '1Y': [11.55, 10.32, 9.76, 9.51, 10.06, 10.93, 10.03, 14.89, 14.97, 15.34, 16.47, 14.38, 16.98, 19.83, 23.45, 25, 27.94, 37.76, 30.62, 34.42, 31.06, 28.57, 22.84, 23.74, 29.36, 30.99, 22, 25.72, 28.11, 37.68, 37.4, 36.18, 33.88, 34.95, 35.28, 30, 27.93, 27.03, 27.71, 27.26, 20.55, 25.18, 31.47, 31.32, 32.11, 35.63, 44.59, 39.14, 45.14, 47.86, 41.91, 47.7] },
      velocityScore: { '1D': -0.3, '1W': 0.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$14B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.33, MEME: 5.09, RKNG: 3.65 },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 6.24, proScore: 4.16, coverage: 0.667,
      price: 2025.31, weeklyPrices: [1643.23, 1881.51, 1980.10, 2107.86, 2025.31], weeklyChange: 23.25, sortRank: 0, periodReturns: { '1M': 43.9, '6M': 867.6, '1Y': 4481.1 },
      priceHistory: { '1W': [1643.23, 1881.51, 1980.1, 2107.86, 2025.31], '1M': [1333.01, 1383.29, 1392.56, 1542.24, 1478.69, 1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 2025.31], '6M': [209.31, 244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 588.73, 703.63, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1589.55, 1716.36, 1646.54, 2025.31], '1Y': [44.21, 47.34, 44.96, 46.2, 41.36, 43, 43.39, 41.93, 46.83, 44.58, 47.35, 53.01, 73.92, 93.97, 99.83, 121.12, 131.88, 144.3, 146.95, 204.36, 194.57, 271.58, 244.93, 220.5, 194.38, 232.86, 206.83, 250.08, 275.24, 377.41, 413.62, 470.8, 576.25, 597.95, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1255.86, 1547.56, 1333.01, 1589.55, 1716.36, 1646.54, 2025.31] },
      velocityScore: { '1D': 3.5, '1W': 11.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$300B', pe: 69.1, revenueGrowth: 251, eps: 29.3, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.64, RKNG: 6.85 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 2, avgWeight: 5.67, proScore: 3.78, coverage: 0.667,
      price: 175.9, weeklyPrices: [175.13, 172.78, 169.05, 191.55, 175.90], weeklyChange: 0.44, sortRank: 0, periodReturns: { '1M': -7.6, '6M': 507.4, '1Y': 929.3 },
      priceHistory: { '1W': [175.13, 172.78, 169.05, 191.55, 175.9], '1M': [173.26, 171.33, 165.26, 176.81, 181.49, 177.62, 179.83, 169.02, 158.41, 185.67, 202.37, 184.07, 202.89, 177, 196.64, 162.88, 175.13, 172.78, 169.05, 191.55, 175.9], '6M': [28.96, 40.64, 34.86, 33.01, 37, 35.72, 43.61, 44.3, 44.46, 53.96, 102.51, 110.62, 94.07, 87.54, 98.21, 107.45, 153.19, 163.47, 145.78, 172.98, 184.9, 173.26, 177.62, 202.37, 162.88, 175.9], '1Y': [17.09, 23.29, 25.35, 27.92, 28.99, 26.31, 23.06, 21.42, 22.79, 22.77, 25.07, 23.02, 27.72, 29.47, 26.69, 28.42, 32.22, 32.95, 29.98, 35.48, 29.5, 23.75, 20.89, 22.73, 25.65, 34.98, 27.14, 41, 39.6, 34.04, 37.04, 34.89, 43.61, 44.3, 44.46, 53.96, 102.51, 110.62, 94.07, 95.76, 85.19, 117.64, 146.39, 150.57, 137.26, 172.98, 184.9, 173.26, 177.62, 202.37, 162.88, 175.9] },
      velocityScore: { '1D': -3.1, '1W': 2.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$14B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.09, RKNG: 4.25 },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 4.79, proScore: 3.19, coverage: 0.667,
      price: 1044.91, weeklyPrices: [891.88, 995.87, 981.61, 1087.99, 1044.91], weeklyChange: 17.16, sortRank: 0, periodReturns: { '1M': 44.2, '6M': 349.4, '1Y': 771.9 },
      priceHistory: { '1W': [891.88, 995.87, 981.61, 1087.99, 1044.91], '1M': [681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1044.91], '6M': [232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1, 935.89, 1044.91], '1Y': [119.84, 127.91, 120.89, 122.24, 116.43, 109.83, 114.74, 109.06, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 198.47, 226.63, 218.03, 241.11, 228.5, 224.53, 234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 576.45, 795.33, 681.54, 895.88, 1064.1, 935.89, 1044.91] },
      velocityScore: { '1D': 2.2, '1W': 7.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 49.2, revenueGrowth: 196, eps: 21.22, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { BUZZ: 3.92, MEME: false, RKNG: 5.65 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 4.76, proScore: 3.17, coverage: 0.667,
      price: 289.76, weeklyPrices: [234.23, 248.88, 260.22, 274.50, 289.76], weeklyChange: 23.71, sortRank: 0, periodReturns: { '1M': 5, '6M': 230.7, '1Y': 1164.8 },
      priceHistory: { '1W': [234.23, 248.88, 260.22, 274.5, 289.76], '1M': [258.71, 261.34, 282.31, 307.88, 302.49, 302.4, 293.8, 290.01, 285, 273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22, 274.5, 289.76], '6M': [87.61, 91.43, 86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 166, 151.32, 153.68, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 283.92, 258.71, 302.4, 302.85, 259.61, 289.76], '1Y': [22.91, 22.95, 22.13, 28.71, 24.69, 26.89, 37.62, 37.61, 41.25, 43.1, 49.94, 52.45, 62.96, 79.67, 69.18, 90.19, 87.58, 116.58, 94.37, 133.71, 129.05, 127.07, 104.97, 94.29, 102.5, 101.29, 76.97, 91.88, 98.69, 134.07, 149.5, 139.62, 151.37, 143.03, 139.74, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 288.64, 283.92, 258.71, 302.4, 302.85, 259.61, 289.76] },
      velocityScore: { '1D': -0.3, '1W': -5.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$82B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.68, RKNG: 3.84 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'NVTS', name: 'Navitas Semiconductor', easyScore: 2, avgWeight: 4.56, proScore: 3.04, coverage: 0.667,
      price: 22.41, weeklyPrices: [20.50, 22.21, 23.39, 23.73, 22.41], weeklyChange: 9.29, sortRank: 0, periodReturns: { '1M': 5.1, '6M': 186.1, '1Y': 211.6 },
      priceHistory: { '1W': [20.5, 22.21, 23.39, 23.73, 22.41], '1M': [19.67, 19.43, 22.99, 24.38, 29.25, 31.79, 28.88, 28.51, 26.6, 24.86, 25.86, 30.84, 30.67, 25.08, 24.48, 22.85, 20.5, 22.21, 23.39, 23.73, 22.41], '6M': [7.83, 7.66, 7.14, 10.06, 10, 10.17, 8.58, 8.86, 8.3, 8.12, 9.55, 8.38, 10.49, 8.75, 8.28, 8.84, 9.82, 13.2, 18.3, 15.92, 22.65, 19.67, 31.79, 25.86, 22.85, 22.41], '1Y': [7.19, 7.35, 6.27, 6.43, 6.15, 8.82, 7.21, 6.77, 6.96, 6.43, 6.09, 5.73, 5.64, 6.46, 6.86, 7.3, 7.74, 15.16, 13.6, 13.57, 10.46, 9.12, 7.78, 8.03, 8.69, 9.12, 7.38, 7.66, 8.38, 10.07, 10.91, 9.38, 8.58, 8.86, 8.3, 8.12, 9.55, 8.38, 10.49, 9.18, 7.83, 8.57, 9.87, 15.33, 15.12, 15.92, 22.65, 19.67, 31.79, 25.86, 22.85, 22.41] },
      velocityScore: { '1D': null, '1W': -20.4, '1M': null, '6M': null }, isNew: true,
      marketCap: '$5B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.88, RKNG: 5.25 },
      tonyNote: 'Navitas Semiconductor is a small-cap wide-bandgap power semiconductor name — gallium nitride and silicon carbide for fast charging and EV applications. The $26.60 share price and small market cap position it as a speculative holding in ETFs willing to take higher-risk bets on next-generation power conversion.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 2, avgWeight: 4.49, proScore: 2.99, coverage: 0.667,
      price: 246.03, weeklyPrices: [237.68, 264.76, 250.81, 259.41, 246.03], weeklyChange: 3.52, sortRank: 0, periodReturns: { '1M': 42.9, '6M': 75.3, '1Y': 210.8 },
      priceHistory: { '1W': [237.68, 264.76, 250.81, 259.41, 246.03], '1M': [156.27, 168.99, 182.98, 193.39, 218.41, 221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 246.03], '6M': [140.34, 147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 115.98, 116.88, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 156.27, 221.64, 229, 234.32, 246.03], '1Y': [79.17, 91.92, 87.59, 97.59, 101.19, 98.41, 116.01, 110.29, 125.38, 106.3, 120.1, 124.77, 163.96, 164.44, 149.38, 144.91, 148.87, 131.41, 137.2, 171.52, 164.23, 158.5, 139.56, 154.18, 189.19, 157.98, 134.13, 150.19, 143.22, 150.42, 150.97, 128.02, 125.28, 111.4, 121.44, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 180.06, 210.22, 156.27, 221.64, 229, 234.32, 246.03] },
      velocityScore: { '1D': 2.4, '1W': 19.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$45B', pe: 97.6, revenueGrowth: 157, eps: 2.52, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.57, RKNG: 5.4 },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 2, avgWeight: 3.46, proScore: 2.31, coverage: 0.667,
      price: 57.8, weeklyPrices: [56.63, 57.99, 57.85, 61.18, 57.80], weeklyChange: 2.07, sortRank: 0, periodReturns: { '1M': 11.3, '6M': 16.4, '1Y': 50.4 },
      priceHistory: { '1W': [56.63, 57.99, 57.85, 61.18, 57.8], '1M': [49.31, 48.44, 52.47, 58.89, 63.64, 63.62, 65.4, 70.14, 72.07, 69.28, 71.4, 68.23, 65.66, 56.78, 62.8, 56.69, 56.63, 57.99, 57.85, 61.18, 57.8], '6M': [49.67, 51.39, 44.87, 50.45, 47.56, 47.25, 39.98, 34.99, 34.11, 30.78, 38.34, 35.87, 33.29, 31.2, 27.51, 29.24, 29.76, 48.32, 43.84, 45.75, 56.89, 49.31, 63.62, 71.4, 56.69, 57.8], '1Y': [38.43, 40.86, 40.1, 45.56, 43.54, 43.28, 39.88, 42.02, 43, 36.8, 40.75, 40.97, 43.86, 65.44, 73.86, 63.09, 74.3, 72.41, 55.45, 61.11, 53.38, 54.42, 49.12, 47.06, 48.65, 51.67, 45.85, 49.82, 46.77, 49.45, 50.8, 43.37, 39.98, 34.99, 34.11, 30.78, 38.34, 35.87, 33.29, 33.11, 26.59, 28.49, 35.76, 46.28, 43.08, 45.75, 56.89, 49.31, 63.62, 71.4, 56.69, 57.8] },
      velocityScore: { '1D': 0, '1W': -0.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$22B', pe: 148.2, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: 1.88, MEME: 5.05, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'RGTI', name: 'Rigetti Computing', easyScore: 2, avgWeight: 3.21, proScore: 2.14, coverage: 0.667,
      price: 21.15, weeklyPrices: [19.44, 20.63, 20.98, 22.70, 21.15], weeklyChange: 8.77, sortRank: 0, periodReturns: { '1M': 18.5, '6M': -11.7, '1Y': 73.9 },
      priceHistory: { '1W': [19.44, 20.63, 20.98, 22.7, 21.15], '1M': [16.62, 15.96, 16.88, 22.04, 26.42, 25.07, 24.62, 27.03, 25.54, 25.63, 26.88, 24.09, 24.16, 20.68, 21.76, 19.69, 19.44, 20.63, 20.98, 22.7, 21.15], '6M': [23.96, 25.11, 22.15, 25.25, 24.7, 23.45, 18.17, 17.71, 16.09, 16.02, 17.69, 17.6, 16.14, 14.88, 13.32, 14.2, 15.13, 19.64, 16.91, 17.7, 20.51, 16.62, 25.07, 26.88, 19.69, 21.15], '1Y': [12.16, 11.5, 11.33, 13.51, 16.56, 16.14, 14.17, 16.47, 16.2, 15.16, 15.3, 15.04, 16.19, 21.99, 31.64, 29.85, 43.23, 56.34, 36.06, 39.41, 35.18, 31.4, 25.71, 26.08, 26.04, 26.12, 22.47, 24.51, 23.6, 24.72, 25.62, 21.76, 18.17, 17.71, 16.09, 16.02, 17.69, 17.6, 16.14, 15.88, 12.9, 13.84, 16.87, 18.25, 16.39, 17.7, 20.51, 16.62, 25.07, 26.88, 19.69, 21.15] },
      velocityScore: { '1D': -0.9, '1W': -11.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 199, eps: -0.89, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.39, RKNG: 3.04 },
      tonyNote: 'Rigetti Computing is a quantum hardware company using superconducting qubit technology. It holds a position in Meme ETFs alongside IonQ and D-Wave as part of the quantum computing basket. Revenue is minimal, the technology is earlier-stage than IonQ, and the ETF allocation is speculative. The weight score is low; this is a high-risk, long-duration positioning.',
    },
    {
      ticker: 'GOOGL', name: 'GOOGL', easyScore: 2, avgWeight: 2.18, proScore: 1.45, coverage: 0.667,
      price: 372.33, weeklyPrices: [356.38, 357.77, 359.68, 369.35, 372.33], weeklyChange: 4.48, sortRank: 0, periodReturns: { '1M': -6.2, '6M': 21.5, '1Y': 110.6 },
      priceHistory: { '1W': [356.38, 357.77, 359.68, 369.35, 372.33], '1M': [396.94, 387.66, 388.91, 387.66, 382.97, 388.88, 388.83, 390.13, 380.34, 376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 372.33], '6M': [306.57, 314.35, 313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 311.49, 306.52, 306.36, 305.56, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 383.25, 388.64, 396.94, 388.88, 361.85, 364.26, 372.33], '1Y': [176.77, 166.77, 175.84, 176.62, 182.97, 190.23, 196.53, 194.67, 203.34, 201.57, 207.14, 230.66, 239.17, 249.53, 247.14, 244.9, 244.62, 251.03, 251.69, 274.57, 277.54, 291.31, 284.28, 323.44, 319.63, 320.21, 296.72, 314.09, 315.15, 328.57, 330, 333.26, 338, 322.86, 305.72, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 383.25, 388.64, 396.94, 388.88, 361.85, 364.26, 372.33] },
      velocityScore: { '1D': -4.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.5T', pe: 28.4, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { BUZZ: 1.55, MEME: false, RKNG: 2.81 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'RDW', name: 'Redwire', easyScore: 1, avgWeight: 6.26, proScore: 2.09, coverage: 0.333,
      price: 13.97, weeklyPrices: [14.87, 17.09, 15.12, 14.83, 13.97], weeklyChange: -6.05, sortRank: 0, periodReturns: { '1M': -0.6, '6M': 112, '1Y': -32.1 },
      priceHistory: { '1W': [14.87, 17.09, 15.12, 14.83, 13.97], '1M': [13.96, 13.91, 14.77, 15.35, 17.49, 22.04, 24, 25.9, 24.57, 20.68, 20.58, 18.62, 21.43, 18.45, 18.57, 15.75, 14.87, 17.09, 15.12, 14.83, 13.97], '6M': [6.59, 8.01, 7.6, 10.28, 10.86, 12.52, 11.75, 10.04, 8.02, 8.12, 9.52, 9.65, 9.54, 9.2, 8.16, 9.91, 9.99, 10.21, 9.33, 8.64, 12.16, 13.96, 22.04, 20.58, 15.75, 13.97], '1Y': [20.57, 16.53, 15.31, 15.78, 17.5, 16.92, 14.06, 14.71, 9.42, 8.84, 9.29, 8.32, 8.23, 7.87, 9.35, 9.16, 9.79, 8.94, 7.64, 7.85, 6.95, 6.13, 5.43, 5.41, 5.57, 7.48, 6.44, 7.82, 9.03, 10.98, 11.71, 10.96, 11.75, 10.04, 8.02, 8.12, 9.52, 9.65, 9.54, 9.38, 7.71, 9.65, 9.81, 10.31, 9.04, 8.64, 12.16, 13.96, 22.04, 20.58, 15.75, 13.97] },
      velocityScore: { '1D': 0, '1W': -5.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3B', pe: null, revenueGrowth: 58, eps: -2.59, grossMargin: 13, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.26, RKNG: false },
      tonyNote: 'Redwire Corp is a space infrastructure company — solar arrays, structures, and manufacturing in orbit. It appears in Meme and speculative ETFs as a high-risk space economy play. Revenue is growing from a small base but the business is pre-profitability; the ETF weight is minimal and reflects thematic positioning rather than fundamental conviction.',
    },
    {
      ticker: 'VSH', name: 'VSH', easyScore: 1, avgWeight: 5.61, proScore: 1.87, coverage: 0.333,
      price: 61.07, weeklyPrices: [58.58, 54.65, 58.60, 59.38, 61.07], weeklyChange: 4.25, sortRank: 0, periodReturns: { '1M': 64, '6M': 310.4, '1Y': 288.2 },
      priceHistory: { '1W': [58.58, 54.65, 58.6, 59.38, 61.07], '1M': [36.95, 37.04, 40.16, 42.17, 47.25, 50.37, 48.9, 52.24, 52.05, 55.99, 62.49, 63.97, 63.67, 57.2, 57.22, 58.58, 54.65, 58.6, 59.38, 61.07], '6M': [14.88, 14.96, 14.49, 16.08, 17.87, 18.45, 20.15, 19.65, 19.38, 19.67, 18.72, 16.69, 17.23, 16.65, 17.02, 18.76, 22.84, 26.33, 27.77, 29.58, 34.26, 37.23, 47.25, 55.99, 57.22, 61.07], '1Y': [15.73, 15.51, 16.05, 17.61, 17.01, 17.62, 17.22, 16.01, 14.77, 14.79, 15.43, 14.97, 15.29, 15.18, 15.23, 15.42, 15.37, 16.04, 17.22, 17.49, 16.1, 14.23, 12.42, 13.3, 14.95, 15.8, 14.88, 14.96, 14.49, 16.08, 17.87, 18.45, 20.15, 19.95, 18.88, 19.32, 18.72, 16.69, 17.23, 16.65, 17.02, 18.76, 22.84, 26.33, 27.77, 30.57, 34.26, 37.23, 47.25, 55.99, 57.22, 61.07] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$8B', pe: 6107, revenueGrowth: 17, eps: 0.01, grossMargin: 20, dividendYield: 0.63,
      etfPresence: { BUZZ: false, MEME: 5.61, RKNG: false },
      tonyNote: 'VSH appears in 1 of 3 Meme ETFs (33% coverage) with average weight 5.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PL', name: 'PL', easyScore: 1, avgWeight: 5.22, proScore: 1.74, coverage: 0.333,
      price: 28.18, weeklyPrices: [30.72, 34.17, 31.15, 30.58, 28.18], weeklyChange: -8.27, sortRank: 0, periodReturns: { '1M': -32.3, '6M': 57.6, '1Y': 427.7 },
      priceHistory: { '1W': [30.72, 34.17, 31.15, 30.58, 28.18], '1M': [41.61, 41.59, 42.66, 42.48, 44.35, 48.32, 50.48, 51.4, 51.14, 46.46, 48.09, 43.13, 43.53, 32.22, 32.74, 31.17, 30.72, 34.17, 31.15, 30.58, 28.18], '6M': [17.88, 20.73, 19.72, 22.44, 28.28, 26.94, 24.97, 22.26, 22.42, 23.78, 26.36, 25.82, 24.6, 33.83, 30.86, 35.02, 34.32, 37.5, 35.45, 38.54, 41.84, 41.61, 48.32, 48.09, 31.17, 28.18], '1Y': [5.34, 5.57, 6.16, 6.85, 6.45, 6.86, 6.28, 6.39, 6.65, 6.38, 6.98, 6.44, 8.97, 10.23, 11.93, 13.77, 15.6, 15.09, 12.5, 12.9, 12.7, 12.47, 11.45, 11.73, 12.01, 12.94, 16.47, 20.32, 20.41, 22.71, 28.78, 25.87, 24.97, 22.26, 22.42, 23.78, 26.36, 25.82, 24.6, 33.82, 27.89, 35.17, 33.93, 38.03, 35.03, 38.54, 41.84, 41.61, 48.32, 48.09, 31.17, 28.18] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: 42, eps: -1.16, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.22, RKNG: false },
      tonyNote: 'Planet Labs is a satellite earth observation company. It holds a speculative position in Industrials ETFs as a data infrastructure name — providing satellite imagery and analytics that support agricultural, energy, and government decision-making. Revenue is growing from a small base; the ETF weight is minimal and the position is thematic.',
    },
    {
      ticker: 'QNT', name: 'QNT', easyScore: 1, avgWeight: 5.17, proScore: 1.72, coverage: 0.333,
      price: 57.4, weeklyPrices: [57.40], weeklyChange: -0.88, sortRank: 0, periodReturns: { '1M': 0, '6M': 0, '1Y': 0 },
      priceHistory: undefined,
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2B', pe: null, revenueGrowth: -73, eps: -1.76, grossMargin: 74, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.17, RKNG: false },
      tonyNote: 'QNT appears in 1 of 3 Meme ETFs (33% coverage) with average weight 5.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'QBTS', name: 'D-Wave Quantum', easyScore: 1, avgWeight: 5.12, proScore: 1.71, coverage: 0.333,
      price: 24.81, weeklyPrices: [23.25, 23.82, 23.37, 26.26, 24.81], weeklyChange: 6.71, sortRank: 0, periodReturns: { '1M': 21.9, '6M': -2.8, '1Y': 55.1 },
      priceHistory: { '1W': [23.25, 23.82, 23.37, 26.26, 24.81], '1M': [19.06, 18.19, 19.3, 25.74, 29.4, 27.82, 27.48, 29.49, 30.14, 29.18, 29.91, 27.55, 27.64, 23.85, 25.83, 23.52, 23.25, 23.82, 23.37, 26.26, 24.81], '6M': [25.52, 29.12, 26.15, 29.28, 28.72, 25.63, 21.22, 20.72, 19.67, 18.05, 18.94, 19.04, 17.46, 15.73, 13.9, 14.14, 14.65, 21.66, 18.8, 20.92, 24.03, 19.06, 27.82, 29.91, 23.52, 24.81], '1Y': [16, 14.97, 14.82, 16.39, 16.91, 20.3, 17.06, 18.3, 18.51, 15.32, 15.45, 15.3, 16.04, 22.54, 27.72, 25.63, 34.25, 44.78, 27.29, 34.26, 29.74, 28.99, 22.93, 22.59, 25.08, 26.8, 23.8, 27.52, 28.13, 28.11, 28.83, 23.75, 21.22, 20.72, 19.67, 18.05, 18.94, 19.04, 17.46, 16.31, 12.98, 13.74, 16.97, 20.36, 18.11, 20.92, 24.03, 19.06, 27.82, 29.91, 23.52, 24.81] },
      velocityScore: { '1D': 0, '1W': -5.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: -81, eps: -1.14, grossMargin: 66, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.12, RKNG: false },
      tonyNote: 'D-Wave Quantum is a quantum computing company — the only publicly traded business built around quantum annealing hardware. Revenue is minimal and profitability is many years away, but it holds a position in Meme ETFs as the purest-play quantum computing stock available to retail investors. The ETF weight is small and the position is purely thematic.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 1, avgWeight: 4.62, proScore: 1.54, coverage: 0.333,
      price: 691.92, weeklyPrices: [490.09, 529.29, 562.93, 653.53, 691.92], weeklyChange: 41.18, sortRank: 0, periodReturns: { '1M': 43.5, '6M': 296.3, '1Y': 1105.2 },
      priceHistory: { '1W': [490.09, 529.29, 562.93, 653.53, 691.92], '1M': [458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 691.92], '6M': [174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 286.21, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 458.68, 524.65, 563.1, 517.72, 691.92], '1Y': [57.41, 62.07, 63.84, 64.64, 66.53, 69.32, 71.43, 75.84, 75.91, 75.86, 79.71, 86, 95.02, 100.94, 109.69, 130.59, 121.18, 120.44, 120.47, 141.38, 152.18, 169.99, 152.86, 155.41, 155.59, 181.95, 166.26, 179.56, 187.7, 200.46, 221.51, 240.85, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 442.36, 515.83, 458.68, 524.65, 563.1, 517.72, 691.92] },
      velocityScore: { '1D': 0.7, '1W': -0.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$238B', pe: 41.4, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.09,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.62 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
