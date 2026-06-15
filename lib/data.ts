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
export const SPY_RET: Record<Period, number> = { '1W': 2.4, '1M': 2.1, '6M': 10.9, '1Y': 25.3 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 8.0 }, { t: 'AMD', w: 4.6 }, { t: 'MRVL', w: 4.5 }, { t: 'VRT', w: 3.6 }, { t: 'SIMO', w: 3.6 }],
  ARTY: [{ t: 'MRVL', w: 9.1 }, { t: 'MU', w: 7.6 }, { t: 'AMD', w: 7.6 }, { t: 'CRWV', w: 4.0 }, { t: 'ORCL', w: 3.6 }],
  BAI: [{ t: 'MU', w: 6.0 }, { t: 'AMD', w: 4.9 }, { t: 'LRCX', w: 4.7 }, { t: 'TSM', w: 4.3 }, { t: 'AVGO', w: 4.3 }],
  IGPT: [{ t: 'MU', w: 12.3 }, { t: 'INTC', w: 7.5 }, { t: 'AMD', w: 7.4 }, { t: 'GOOGL', w: 6.0 }, { t: 'NVDA', w: 5.7 }],
  IVES: [{ t: 'MU', w: 6.1 }, { t: 'AMD', w: 5.1 }, { t: 'TSM', w: 5.0 }, { t: 'NVDA', w: 4.8 }, { t: 'AAPL', w: 4.7 }],
  ALAI: [{ t: 'NVDA', w: 13.1 }, { t: 'AMZN', w: 5.7 }, { t: 'TSM', w: 5.6 }, { t: 'MSFT', w: 5.2 }, { t: 'GOOG', w: 5.0 }],
  CHAT: [{ t: 'NVDA', w: 6.8 }, { t: 'GOOGL', w: 5.4 }, { t: 'AVGO', w: 4.2 }, { t: 'AMD', w: 4.1 }, { t: 'MU', w: 3.9 }],
  AIFD: [{ t: 'NVDA', w: 6.4 }, { t: 'MU', w: 6.4 }, { t: 'LITE', w: 6.3 }, { t: 'MRVL', w: 6.1 }, { t: 'DOCN', w: 5.8 }],
  SPRX: [{ t: 'COHR', w: 8.7 }, { t: 'ALAB', w: 7.8 }, { t: 'ARM', w: 7.3 }, { t: 'KLAC', w: 7.2 }, { t: 'NET', w: 6.9 }],
  AOTG: [{ t: 'AMD', w: 15.5 }, { t: 'NVDA', w: 10.8 }, { t: 'MU', w: 10.4 }, { t: 'TSM', w: 7.2 }, { t: 'TOST', w: 4.7 }],
  SOXX: [{ t: 'MU', w: 11.2 }, { t: 'AMD', w: 9.0 }, { t: 'MRVL', w: 8.1 }, { t: 'INTC', w: 6.4 }, { t: 'AVGO', w: 5.6 }],
  PSI: [{ t: 'KLAC', w: 6.1 }, { t: 'AMAT', w: 6.0 }, { t: 'LRCX', w: 5.5 }, { t: 'MU', w: 5.3 }, { t: 'AMD', w: 4.9 }],
  XSD: [{ t: 'MXL', w: 5.7 }, { t: 'MRVL', w: 4.7 }, { t: 'ALAB', w: 4.4 }, { t: 'INTC', w: 3.9 }, { t: 'AMD', w: 3.8 }],
  DRAM: [{ t: 'SNDK', w: 5.9 }, { t: 'STX', w: 4.4 }, { t: 'MU', w: 4.0 }, { t: 'WDC', w: 3.9 }],
  PTF: [{ t: 'SNDK', w: 8.8 }, { t: 'STX', w: 4.9 }, { t: 'WDC', w: 4.9 }, { t: 'MU', w: 4.8 }, { t: 'NVDA', w: 4.3 }],
  WCLD: [{ t: 'DOCN', w: 3.8 }, { t: 'FROG', w: 2.9 }, { t: 'DDOG', w: 2.8 }, { t: 'PANW', w: 2.6 }, { t: 'TWLO', w: 2.5 }],
  IGV: [{ t: 'ORCL', w: 9.1 }, { t: 'PANW', w: 8.4 }, { t: 'MSFT', w: 7.8 }, { t: 'PLTR', w: 6.8 }, { t: 'CRWD', w: 6.5 }],
  FDTX: [{ t: 'MU', w: 9.4 }, { t: 'MRVL', w: 8.1 }, { t: 'TSM', w: 6.0 }, { t: 'NVDA', w: 4.6 }, { t: 'STX', w: 4.0 }],
  GTEK: [{ t: 'MRVL', w: 4.6 }, { t: 'DELL', w: 3.0 }, { t: 'CDNS', w: 2.5 }, { t: 'APH', w: 2.3 }, { t: 'NET', w: 2.0 }],
  ARKK: [{ t: 'TSLA', w: 10.4 }, { t: 'AMD', w: 5.1 }, { t: 'HOOD', w: 5.0 }, { t: 'TEM', w: 4.9 }, { t: 'CRSP', w: 4.8 }],
  MARS: [{ t: 'RKLB', w: 11.2 }, { t: 'SPCX', w: 10.8 }, { t: 'SATS', w: 8.1 }, { t: 'ASTS', w: 7.9 }, { t: 'PL', w: 4.7 }],
  FRWD: [{ t: 'NVDA', w: 8.6 }, { t: 'STX', w: 7.6 }, { t: 'AMD', w: 7.0 }, { t: 'LRCX', w: 6.2 }, { t: 'TSM', w: 5.8 }],
  BCTK: [{ t: 'TSM', w: 8.6 }, { t: 'LRCX', w: 7.7 }, { t: 'AVGO', w: 7.3 }, { t: 'NVDA', w: 6.5 }, { t: 'GOOG', w: 5.7 }],
  FWD: [{ t: 'AVGO', w: 2.4 }, { t: 'GOOGL', w: 2.1 }, { t: 'NVDA', w: 2.0 }, { t: 'AMD', w: 2.0 }, { t: 'CAT', w: 1.9 }],
  CBSE: [{ t: 'SCI', w: 3.4 }, { t: 'SBUX', w: 3.4 }, { t: 'KLAC', w: 3.3 }, { t: 'VG', w: 3.1 }, { t: 'LRCX', w: 3.0 }],
  FCUS: [{ t: 'INTC', w: 4.5 }, { t: 'SITM', w: 4.4 }, { t: 'SNDK', w: 4.3 }, { t: 'DELL', w: 4.2 }, { t: 'STX', w: 4.1 }],
  WGMI: [{ t: 'CIFR', w: 15.8 }, { t: 'IREN', w: 12.8 }, { t: 'WULF', w: 9.6 }, { t: 'CORZ', w: 7.7 }, { t: 'KEEL', w: 7.2 }],
  POW: [{ t: 'POWL', w: 6.7 }, { t: 'VICR', w: 5.4 }, { t: 'PWR', w: 4.8 }, { t: 'PRY', w: 4.4 }, { t: 'ETN', w: 4.0 }],
  VOLT: [{ t: 'BELFB', w: 7.8 }, { t: 'POWL', w: 7.6 }, { t: 'PWR', w: 5.5 }, { t: 'ETN', w: 5.2 }, { t: 'NEE', w: 5.0 }],
  PBD: [{ t: 'SEDG', w: 1.2 }, { t: 'FSLR', w: 1.1 }, { t: 'RIVN', w: 1.1 }, { t: 'ENPH', w: 1.1 }, { t: 'SHLS', w: 1.1 }],
  PBW: [{ t: 'HYLN', w: 4.6 }, { t: 'NVTS', w: 3.0 }, { t: 'FCEL', w: 3.0 }, { t: 'ASPN', w: 2.1 }, { t: 'BE', w: 2.1 }],
  IVEP: [{ t: 'BE', w: 4.8 }, { t: 'PWR', w: 4.4 }, { t: 'COHR', w: 4.1 }, { t: 'MPWR', w: 4.0 }, { t: 'VRT', w: 4.0 }],
  AIRR: [{ t: 'STRL', w: 6.3 }, { t: 'CHRW', w: 4.3 }, { t: 'FIX', w: 4.3 }, { t: 'SAIA', w: 4.2 }, { t: 'AGX', w: 3.9 }],
  PRN: [{ t: 'TTMI', w: 6.2 }, { t: 'FIX', w: 4.7 }, { t: 'STRL', w: 4.5 }, { t: 'JBL', w: 4.3 }, { t: 'AGX', w: 4.2 }],
  RSHO: [{ t: 'TKR', w: 9.3 }, { t: 'POWL', w: 7.8 }, { t: 'CGNX', w: 7.0 }, { t: 'CAT', w: 6.6 }, { t: 'GTES', w: 5.6 }],
  IDEF: [{ t: 'RTX', w: 7.9 }, { t: 'LMT', w: 7.1 }, { t: 'GD', w: 5.9 }, { t: 'NOC', w: 5.1 }, { t: 'BA', w: 5.0 }],
  BILT: [{ t: 'UNP', w: 5.8 }, { t: 'AENA', w: 4.3 }, { t: 'AEP', w: 4.3 }, { t: 'XEL', w: 3.6 }, { t: 'LNG', w: 3.5 }],
  BUZZ: [{ t: 'MU', w: 3.9 }, { t: 'ASTS', w: 3.6 }, { t: 'AMD', w: 3.3 }, { t: 'NOW', w: 3.3 }, { t: 'SOFI', w: 3.2 }],
  MEME: [{ t: 'AAOI', w: 7.1 }, { t: 'RDW', w: 6.3 }, { t: 'BE', w: 5.7 }, { t: 'ASTS', w: 5.7 }, { t: 'SNDK', w: 5.6 }],
  RKNG: [{ t: 'SNDK', w: 6.4 }, { t: 'MU', w: 5.4 }, { t: 'CRDO', w: 5.2 }, { t: 'NBIS', w: 4.8 }, { t: 'AAOI', w: 4.6 }],
};
// @@END_GENERATED:ETF_TOP_HOLDINGS@@

// @@GENERATED:TOP10_RET@@
// Top10 composite returns per theme per period (average of all ETFs in theme)
const TOP10_RET: Record<Theme, Record<Period, number>> = {
  'AI & ML':         { '1W': 8.2, '1M': 13.4, '6M': 56.7, '1Y': 96.4 },
  'Semiconductors':  { '1W': 13.8, '1M': 23.9, '6M': 120.5, '1Y': 174.8 },
  'Broad Tech':      { '1W': 6, '1M': 8.9, '6M': 35.1, '1Y': 60.5 },
  'Electrification': { '1W': 4.2, '1M': 0, '6M': 32.1, '1Y': 58.6 },
  'Industrials':     { '1W': 2.4, '1M': 3.1, '6M': 25, '1Y': 45.3 },
  'Meme':            { '1W': 8.6, '1M': 7.7, '6M': 36.3, '1Y': 19.2 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, Record<Period, ChartPeriodData>> = {
  'AI & ML': {
    '1W': { top10: [100, 96.86, 102.09, 102.79, 108.22], spy: [100, 98.42, 100.1, 100.64, 102.43], top10Return: 8.2, spyReturn: 2.4, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.08, 97.35, 100.48, 102.88, 103.84, 108.01, 107.82, 109.78, 110.75, 114.01, 116.15, 115.05, 113.28, 103.55, 106.84, 104.72, 101.4, 106.92, 107.66, 113.36], spy: [100, 99.93, 99.26, 100.28, 100.48, 100.88, 101.54, 101.53, 102.09, 102.34, 102.62, 102.76, 102.04, 102.42, 99.78, 100.01, 99.71, 98.14, 99.81, 100.35, 102.13], top10Return: 13.4, spyReturn: 2.1, xLabels: ["May 18", "May 25", "Jun 1", "Jun 8", "Jun 15"] },
    '6M': { top10: [100, 103.38, 102.99, 106.12, 105.78, 107.3, 109.42, 99.09, 103.99, 106.23, 105.23, 100.83, 101.97, 105.5, 98.93, 101.8, 110.18, 120.02, 125.39, 127.32, 138.05, 137.61, 143.1, 157.16, 147.39, 156.75], spy: [100, 100.6, 100.92, 101.3, 101.41, 101.21, 101.96, 99.54, 100.08, 101.28, 100.77, 98.77, 97.29, 96.93, 94.76, 96.34, 99.81, 104.32, 104.88, 105.86, 108.36, 108.58, 109.54, 111.43, 108.59, 110.9], top10Return: 56.7, spyReturn: 10.9, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.39, 103.12, 105.8, 106.76, 108.98, 110.71, 110.18, 114.55, 110.42, 112.17, 112.08, 119.91, 122.37, 124.17, 126.51, 128.59, 127.26, 129.42, 136.17, 132.2, 131.27, 122.34, 124.03, 128.81, 132.71, 124.46, 129.08, 127.04, 129.97, 132.73, 133.7, 132.6, 130.06, 130.68, 129.98, 131.44, 125.84, 127.34, 126.66, 121.05, 128.01, 141.21, 150.44, 156.54, 160.35, 172.67, 172.23, 179.22, 196.77, 184.61, 196.47], spy: [100, 100.68, 102.48, 103.55, 103.57, 105.23, 105.41, 104.2, 106.64, 106.16, 107.05, 106.81, 108.22, 109.37, 109.69, 110.91, 111.02, 109.88, 111.38, 114, 112.04, 113.33, 109.52, 112, 113.47, 114.09, 112.64, 114.15, 113.15, 114.41, 114.86, 114.36, 114.82, 114.59, 113.12, 113.23, 113.82, 111.57, 109.89, 107.61, 105.21, 109.33, 113.84, 117.59, 118.66, 119.14, 122.39, 122.65, 123.72, 125.86, 122.66, 125.26], top10Return: 96.4, spyReturn: 25.3, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Semiconductors': {
    '1W': { top10: [100, 96.64, 105.99, 107.52, 113.79], spy: [100, 98.42, 100.1, 100.64, 102.43], top10Return: 13.8, spyReturn: 2.4, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 96.85, 97.27, 101.55, 104.01, 105.65, 113.63, 112.69, 114, 112.97, 114.63, 120.14, 121.54, 118.3, 104.28, 110.54, 108.8, 105.1, 115.37, 116.97, 123.88], spy: [100, 99.93, 99.26, 100.28, 100.48, 100.88, 101.54, 101.53, 102.09, 102.34, 102.62, 102.76, 102.04, 102.42, 99.78, 100.01, 99.71, 98.14, 99.81, 100.35, 102.13], top10Return: 23.9, spyReturn: 2.1, xLabels: ["May 18", "May 25", "Jun 1", "Jun 8", "Jun 15"] },
    '6M': { top10: [100, 103, 105.05, 111.56, 114.11, 119.26, 119.99, 116.11, 123.31, 123.84, 124.15, 121.7, 123.92, 134.27, 131.82, 131.14, 140.59, 153.54, 172.57, 176.35, 195.36, 194.46, 190.24, 196.56, 200.54, 220.44], spy: [100, 100.6, 100.92, 101.3, 101.41, 101.21, 101.96, 99.54, 100.08, 101.28, 100.77, 98.77, 97.29, 96.93, 94.76, 96.34, 99.81, 104.32, 104.88, 105.86, 108.36, 108.58, 109.54, 111.43, 108.59, 110.9], top10Return: 120.5, spyReturn: 10.9, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 103.84, 104.84, 108.4, 108.11, 107.46, 108.8, 106.2, 111.71, 108.95, 113.35, 109.96, 116.43, 120.08, 124.04, 126.17, 128.41, 128.98, 133.46, 137.86, 132.39, 132.85, 122.75, 127.39, 138.38, 142.91, 133.4, 137.14, 134.27, 144.17, 151.28, 152.87, 152.65, 157.67, 160.48, 159.18, 157.64, 143.69, 147.28, 148.32, 145.68, 154.83, 175.75, 190.46, 206.86, 214.77, 240.95, 236.56, 251.36, 255.98, 254.61, 281.72], spy: [100, 100.68, 102.48, 103.55, 103.57, 105.23, 105.41, 104.2, 106.64, 106.16, 107.05, 106.81, 108.22, 109.37, 109.69, 110.91, 111.02, 109.88, 111.38, 114, 112.04, 113.33, 109.52, 112, 113.47, 114.09, 112.64, 114.15, 113.15, 114.41, 114.86, 114.36, 114.82, 114.59, 113.12, 113.23, 113.82, 111.57, 109.89, 107.61, 105.21, 109.33, 113.84, 117.59, 118.66, 119.14, 122.39, 122.65, 123.72, 125.86, 122.66, 125.26], top10Return: 174.8, spyReturn: 25.3, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Broad Tech': {
    '1W': { top10: [100, 97.61, 102.06, 102.28, 106.02], spy: [100, 98.42, 100.1, 100.64, 102.43], top10Return: 6, spyReturn: 2.4, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.17, 98.45, 100.84, 102.57, 104.05, 107.32, 107.34, 109.06, 109.75, 111.86, 113.05, 111.16, 110.87, 102.78, 104.86, 102.66, 100.17, 104.69, 105, 108.89], spy: [100, 99.93, 99.26, 100.28, 100.48, 100.88, 101.54, 101.53, 102.09, 102.34, 102.62, 102.76, 102.04, 102.42, 99.78, 100.01, 99.71, 98.14, 99.81, 100.35, 102.13], top10Return: 8.9, spyReturn: 2.1, xLabels: ["May 18", "May 25", "Jun 1", "Jun 8", "Jun 15"] },
    '6M': { top10: [100, 103.15, 101.17, 105.54, 105.63, 106.32, 104.93, 96.93, 100.79, 102.84, 103.64, 100.44, 99.82, 102.17, 98.71, 100.55, 105.47, 114.47, 116.72, 119.51, 127.35, 125.67, 127.78, 136.37, 128.76, 135.06], spy: [100, 100.6, 100.92, 101.3, 101.41, 101.21, 101.96, 99.54, 100.08, 101.28, 100.77, 98.77, 97.29, 96.93, 94.76, 96.34, 99.81, 104.32, 104.88, 105.86, 108.36, 108.58, 109.54, 111.43, 108.59, 110.9], top10Return: 35.1, spyReturn: 10.9, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.15, 103.21, 106.11, 106.37, 108.85, 107.74, 106.51, 106.89, 105.9, 108.61, 108.11, 112.79, 116.95, 119.87, 121.66, 125.9, 130.04, 127.32, 131.02, 127.86, 126.06, 116.9, 118.97, 122.23, 124.07, 117.33, 120.49, 117.3, 122.51, 125.73, 126.81, 122.73, 121.12, 123.29, 122.1, 124.99, 120.3, 121.19, 121.66, 119.08, 124.74, 132.17, 138.57, 138.79, 141.95, 149.12, 147.05, 150.15, 160.07, 153.11, 160.53], spy: [100, 100.68, 102.48, 103.55, 103.57, 105.23, 105.41, 104.2, 106.64, 106.16, 107.05, 106.81, 108.22, 109.37, 109.69, 110.91, 111.02, 109.88, 111.38, 114, 112.04, 113.33, 109.52, 112, 113.47, 114.09, 112.64, 114.15, 113.15, 114.41, 114.86, 114.36, 114.82, 114.59, 113.12, 113.23, 113.82, 111.57, 109.89, 107.61, 105.21, 109.33, 113.84, 117.59, 118.66, 119.14, 122.39, 122.65, 123.72, 125.86, 122.66, 125.26], top10Return: 60.5, spyReturn: 25.3, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Electrification': {
    '1W': { top10: [100, 96.77, 100.73, 101.68, 104.23], spy: [100, 98.42, 100.1, 100.64, 102.43], top10Return: 4.2, spyReturn: 2.4, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 97.2, 95.2, 97.49, 100.22, 101.59, 104.7, 103.84, 103.95, 102.84, 102.52, 104.65, 103.53, 103.45, 97, 97.11, 95.94, 92.84, 96.64, 97.56, 100], spy: [100, 99.93, 99.26, 100.28, 100.48, 100.88, 101.54, 101.53, 102.09, 102.34, 102.62, 102.76, 102.04, 102.42, 99.78, 100.01, 99.71, 98.14, 99.81, 100.35, 102.13], top10Return: 0, spyReturn: 2.1, xLabels: ["May 18", "May 25", "Jun 1", "Jun 8", "Jun 15"] },
    '6M': { top10: [100, 101.29, 100.83, 103.34, 106.67, 110.16, 112.02, 108.77, 112.76, 115.22, 115.7, 108.88, 111.53, 113.33, 111.55, 111.91, 118.36, 123.44, 128.33, 131.62, 135.41, 132.34, 133.26, 135.06, 128.02, 132.14], spy: [100, 100.6, 100.92, 101.3, 101.41, 101.21, 101.96, 99.54, 100.08, 101.28, 100.77, 98.77, 97.29, 96.93, 94.76, 96.34, 99.81, 104.32, 104.88, 105.86, 108.36, 108.58, 109.54, 111.43, 108.59, 110.9], top10Return: 32.1, spyReturn: 10.9, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 99.25, 101.28, 105.04, 105.35, 109.79, 107.21, 107.95, 110.04, 110.97, 113.7, 110.03, 111.32, 115.48, 118.95, 123.41, 126.27, 131.47, 130.49, 132.43, 129.63, 132.82, 126.28, 127.61, 130.56, 133.34, 131.29, 133.7, 129.44, 133.9, 138.46, 142.97, 140.34, 142.54, 143.31, 144.12, 145.83, 140.46, 143.65, 142.48, 145.13, 149.83, 158.27, 164.47, 166.49, 166.62, 172.75, 172.84, 175.35, 175.6, 166.05, 171.38], spy: [100, 100.68, 102.48, 103.55, 103.57, 105.23, 105.41, 104.2, 106.64, 106.16, 107.05, 106.81, 108.22, 109.37, 109.69, 110.91, 111.02, 109.88, 111.38, 114, 112.04, 113.33, 109.52, 112, 113.47, 114.09, 112.64, 114.15, 113.15, 114.41, 114.86, 114.36, 114.82, 114.59, 113.12, 113.23, 113.82, 111.57, 109.89, 107.61, 105.21, 109.33, 113.84, 117.59, 118.66, 119.14, 122.39, 122.65, 123.72, 125.86, 122.66, 125.26], top10Return: 58.6, spyReturn: 25.3, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Industrials': {
    '1W': { top10: [100, 97.33, 101.45, 101.77, 102.42], spy: [100, 98.42, 100.1, 100.64, 102.43], top10Return: 2.4, spyReturn: 2.4, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.67, 97.53, 99.39, 99.59, 100.49, 102.97, 102.97, 103.46, 102.79, 101.27, 102.58, 102.31, 103.29, 100.44, 100.58, 100.7, 98.01, 102.14, 102.46, 103.11], spy: [100, 99.93, 99.26, 100.28, 100.48, 100.88, 101.54, 101.53, 102.09, 102.34, 102.62, 102.76, 102.04, 102.42, 99.78, 100.01, 99.71, 98.14, 99.81, 100.35, 102.13], top10Return: 3.1, spyReturn: 2.1, xLabels: ["May 18", "May 25", "Jun 1", "Jun 8", "Jun 15"] },
    '6M': { top10: [100, 101.49, 100.34, 103.98, 108.25, 110.65, 110.8, 110.54, 115.37, 119.27, 117.98, 112.06, 110.05, 111.45, 109.43, 112.15, 118.28, 120.14, 119.78, 121.48, 123.12, 121.07, 121.42, 122.47, 121.72, 125.05], spy: [100, 100.6, 100.92, 101.3, 101.41, 101.21, 101.96, 99.54, 100.08, 101.28, 100.77, 98.77, 97.29, 96.93, 94.76, 96.34, 99.81, 104.32, 104.88, 105.86, 108.36, 108.58, 109.54, 111.43, 108.59, 110.9], top10Return: 25, spyReturn: 10.9, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.71, 103.35, 105.09, 105.44, 107.09, 107.14, 107.83, 109.18, 107.4, 110.18, 108.55, 110.29, 111.4, 112.45, 114.52, 115.33, 115.86, 116.01, 117.72, 115.66, 114.83, 110.04, 112.09, 113.51, 116.38, 115.1, 118.03, 115.39, 121.91, 128.19, 128.37, 127.98, 134, 136.19, 136.38, 135.81, 129.14, 126.74, 126.1, 126.52, 130.55, 137.88, 139.4, 139.71, 139.28, 142.99, 140.96, 140.76, 142.33, 141.42, 145.26], spy: [100, 100.68, 102.48, 103.55, 103.57, 105.23, 105.41, 104.2, 106.64, 106.16, 107.05, 106.81, 108.22, 109.37, 109.69, 110.91, 111.02, 109.88, 111.38, 114, 112.04, 113.33, 109.52, 112, 113.47, 114.09, 112.64, 114.15, 113.15, 114.41, 114.86, 114.36, 114.82, 114.59, 113.12, 113.23, 113.82, 111.57, 109.89, 107.61, 105.21, 109.33, 113.84, 117.59, 118.66, 119.14, 122.39, 122.65, 123.72, 125.86, 122.66, 125.26], top10Return: 45.3, spyReturn: 25.3, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Meme': {
    '1W': { top10: [100, 97.26, 103.6, 102.22, 108.55], spy: [100, 98.42, 100.1, 100.64, 102.43], top10Return: 8.6, spyReturn: 2.4, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 95.98, 94.5, 98.13, 104.03, 106.49, 110.05, 111.69, 113.73, 112.21, 112.41, 115.19, 111.16, 111.76, 100.34, 102.91, 99.26, 96.53, 102.78, 101.46, 107.72], spy: [100, 99.93, 99.26, 100.28, 100.48, 100.88, 101.54, 101.53, 102.09, 102.34, 102.62, 102.76, 102.04, 102.42, 99.78, 100.01, 99.71, 98.14, 99.81, 100.35, 102.13], top10Return: 7.7, spyReturn: 2.1, xLabels: ["May 18", "May 25", "Jun 1", "Jun 8", "Jun 15"] },
    '6M': { top10: [100, 106.83, 99.18, 105.03, 106.42, 106.95, 104.6, 91.14, 93.05, 95.26, 93.39, 89.83, 92.74, 96.19, 93.56, 97.27, 104.42, 115.69, 115.46, 119.75, 125.46, 128.17, 137.77, 142.98, 129.22, 136.26], spy: [100, 100.6, 100.92, 101.3, 101.41, 101.21, 101.96, 99.54, 100.08, 101.28, 100.77, 98.77, 97.29, 96.93, 94.76, 96.34, 99.81, 104.32, 104.88, 105.86, 108.36, 108.58, 109.54, 111.43, 108.59, 110.9], top10Return: 36.3, spyReturn: 10.9, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.97, 100.88, 96.38, 98.08, 93.56, 94.5, 91.48, 87.35, 85.64, 87.22, 85.25, 90.94, 90.24, 88.02, 89.33, 93.39, 93, 93.58, 98.19, 94.92, 95.01, 89.41, 87.12, 89.21, 90.58, 86.01, 90.42, 89.13, 92.01, 93.27, 94.67, 93.61, 92.66, 89.68, 88.63, 91.49, 95.76, 97.24, 100.19, 98.74, 95.31, 99.81, 108.88, 111.82, 113.07, 114.69, 120.91, 117.04, 120.74, 112.02, 119.25], spy: [100, 100.68, 102.48, 103.55, 103.57, 105.23, 105.41, 104.2, 106.64, 106.16, 107.05, 106.81, 108.22, 109.37, 109.69, 110.91, 111.02, 109.88, 111.38, 114, 112.04, 113.33, 109.52, 112, 113.47, 114.09, 112.64, 114.15, 113.15, 114.41, 114.86, 114.36, 114.82, 114.59, 113.12, 113.23, 113.82, 111.57, 109.89, 107.61, 105.21, 109.33, 113.84, 117.59, 118.66, 119.14, 122.39, 122.65, 123.72, 125.86, 122.66, 125.26], top10Return: 19.2, spyReturn: 25.3, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
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
export const SCAN_TIMESTAMP    = '2026-06-15T18:23:12.884Z';
export const SCAN_TIMESTAMP_NY = 'June 15, 2026 at 2:23 PM ET';
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
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 14.41, bestProScore: 6.16, avgProScore: 4.80, price: 1081.56, weeklyChange: 15.56 },
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 11.42, bestProScore: 6.19, avgProScore: 3.81, price: 211.96, weeklyChange: 1.81 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 11.09, bestProScore: 5.08, avgProScore: 3.70, price: 547.27, weeklyChange: 15.09 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 5.90, bestProScore: 2.76, avgProScore: 1.97, price: 394.66, weeklyChange: 0.64 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 5.93, bestProScore: 3.18, avgProScore: 2.96, price: 308.78, weeklyChange: 15.70 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 5.33, bestProScore: 3.80, avgProScore: 2.67, price: 127.84, weeklyChange: 18.46 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 5.33, bestProScore: 3.24, avgProScore: 2.67, price: 303.39, weeklyChange: 7.01 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.75, bestProScore: 2.86, avgProScore: 2.38, price: 441.26, weeklyChange: 3.12 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.73, bestProScore: 2.30, avgProScore: 1.86, price: 390.54, weeklyChange: 19.37 },
  { ticker: 'ALAB', name: `Astera Labs Inc`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 3.28, bestProScore: 1.72, avgProScore: 1.64, price: 389.32, weeklyChange: 13.94 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': 11.4, '1M': 19.7, '6M': 124, '1Y': 204.4 },
  ARTY: { '1W': 7.4, '1M': 17.5, '6M': 63.1, '1Y': 98.5 },
  BAI:  { '1W': 11.1, '1M': 11.2, '6M': 55.9, '1Y': 90.5 },
  IGPT: { '1W': 9.5, '1M': 17.4, '6M': 78.4, '1Y': 118.6 },
  IVES: { '1W': 3.9, '1M': 5.5, '6M': 22.5, '1Y': 46.3 },
  ALAI: { '1W': 6.3, '1M': 7.6, '6M': 27.3, '1Y': 56.5 },
  CHAT: { '1W': 8.4, '1M': 15.5, '6M': 68.1, '1Y': 113.3 },
  AIFD: { '1W': 6.6, '1M': 9.7, '6M': 51.5, '1Y': 89.8 },
  SPRX: { '1W': 11.9, '1M': 20.9, '6M': 58.5, '1Y': 109.7 },
  AOTG: { '1W': 5.7, '1M': 8.7, '6M': 18.1, '1Y': 36.9 },
  // Semiconductors
  SOXX: { '1W': 11.7, '1M': 23.5, '6M': 110.7, '1Y': 176 },
  PSI:  { '1W': 15.8, '1M': 18.6, '6M': 121.6, '1Y': 211.4 },
  XSD:  { '1W': 9.7, '1M': 15.2, '6M': 95.2, '1Y': 157.7 },
  DRAM: { '1W': 18, '1M': 38.2, '6M': 154.3, '1Y': 154.3 },
  // Broad Tech
  PTF:  { '1W': 11.7, '1M': 13.9, '6M': 81, '1Y': 105.7 },
  WCLD: { '1W': -0.9, '1M': 7.8, '6M': -11, '1Y': -12.6 },
  IGV:  { '1W': -0.2, '1M': 1, '6M': -12, '1Y': -13.7 },
  FDTX: { '1W': 7.7, '1M': 16.4, '6M': 44, '1Y': 54 },
  GTEK: { '1W': 6, '1M': 14.9, '6M': 55.9, '1Y': 76.5 },
  ARKK: { '1W': 6.1, '1M': 6.2, '6M': 0.4, '1Y': 22.5 },
  MARS: { '1W': 3, '1M': -6.6, '6M': 37.4, '1Y': 37.4 },
  FRWD: { '1W': 8.3, '1M': 12.9, '6M': 36.3, '1Y': 36.3 },
  BCTK: { '1W': 7.6, '1M': 9.7, '6M': 29.7, '1Y': 29.7 },
  FWD:  { '1W': 6.4, '1M': 9.2, '6M': 39.8, '1Y': 70.8 },
  CBSE: { '1W': 5.3, '1M': 3.7, '6M': 27.7, '1Y': 43.1 },
  FCUS: { '1W': 6.2, '1M': 3.9, '6M': 41.8, '1Y': 81.4 },
  WGMI: { '1W': 11, '1M': 22.5, '6M': 84.8, '1Y': 255.8 },
  // Electrification
  POW:  { '1W': 6.1, '1M': 1.8, '6M': 55.2, '1Y': 54.2 },
  VOLT: { '1W': 4.5, '1M': 1.7, '6M': 38, '1Y': 63.8 },
  PBD:  { '1W': 2, '1M': -3, '6M': 27.1, '1Y': 64.9 },
  PBW:  { '1W': 4.4, '1M': -0.9, '6M': 32.9, '1Y': 102.6 },
  IVEP: { '1W': 4.2, '1M': 0.4, '6M': 7.4, '1Y': 7.4 },
  // Industrials
  AIRR: { '1W': 2.7, '1M': 2.6, '6M': 30.7, '1Y': 67.8 },
  PRN:  { '1W': 6.4, '1M': 4.6, '6M': 44, '1Y': 66.4 },
  RSHO: { '1W': 3.6, '1M': 7.2, '6M': 35.4, '1Y': 59.4 },
  IDEF: { '1W': 2.6, '1M': 2.7, '6M': 7.2, '1Y': 20.7 },
  BILT: { '1W': -3.1, '1M': -1.6, '6M': 7.9, '1Y': 12 },
  // Meme
  BUZZ: { '1W': 4.2, '1M': 5.1, '6M': 18.4, '1Y': 35.5 },
  MEME: { '1W': 10.1, '1M': 6.3, '6M': 75.4, '1Y': 7.2 },
  RKNG: { '1W': 11.4, '1M': 11.7, '6M': 15, '1Y': 15 },
};
// @@END_GENERATED:ETF_RETURNS@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 6.19, proScore: 6.19, coverage: 1,
      price: 211.96, weeklyPrices: [208.19, 200.42, 204.87, 205.19, 211.96], weeklyChange: 1.81, sortRank: 0, periodReturns: { '1M': -5.9, '6M': 20.2, '1Y': 46.5 },
      priceHistory: { '1W': [208.19, 200.42, 204.87, 205.19, 211.96], '1M': [225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 211.96], '6M': [176.29, 183.69, 187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 177.19, 177.82, 180.25, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 215.33, 224.36, 208.64, 211.96], '1Y': [144.69, 147.9, 153.3, 162.88, 171.37, 170.78, 175.51, 178.26, 183.16, 175.64, 181.77, 170.62, 177.33, 170.29, 176.97, 187.24, 185.04, 180.03, 181.16, 201.03, 198.69, 193.16, 181.36, 177.82, 179.59, 183.78, 177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 215.2, 225.32, 215.33, 224.36, 208.64, 211.96] },
      velocityScore: { '1D': -1.9, '1W': 4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.1T', pe: 32.5, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.49,
      etfPresence: { AIS: 2.44, ARTY: 3.5, BAI: 4.27, IGPT: 5.68, IVES: 4.76, ALAI: 13.1, CHAT: 6.82, AIFD: 6.42, SPRX: 4.13, AOTG: 10.78 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 6.84, proScore: 6.16, coverage: 0.9,
      price: 1081.56, weeklyPrices: [935.89, 891.88, 995.87, 981.61, 1081.56], weeklyChange: 15.56, sortRank: 0, periodReturns: { '1M': 49.2, '6M': 355.4, '1Y': 802.5 },
      priceHistory: { '1W': [935.89, 891.88, 995.87, 981.61, 1081.56], '1M': [724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1081.56], '6M': [237.5, 276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 370.3, 426.13, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 1035.5, 949.28, 1081.56], '1Y': [119.84, 127.91, 120.89, 122.24, 116.43, 109.83, 111.96, 109.06, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 185.69, 187.06, 202.29, 221.91, 218.03, 241.11, 228.5, 224.53, 234.16, 263.71, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 746.81, 724.66, 751, 1035.5, 949.28, 1081.56] },
      velocityScore: { '1D': 0.8, '1W': 20.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 51, revenueGrowth: 196, eps: 21.2, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { AIS: 8.03, ARTY: 7.59, BAI: 6.03, IGPT: 12.28, IVES: 6.07, ALAI: 0.94, CHAT: 3.87, AIFD: 6.38, SPRX: false, AOTG: 10.38 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.64, proScore: 5.08, coverage: 0.9,
      price: 547.27, weeklyPrices: [475.51, 452.40, 488.45, 511.57, 547.27], weeklyChange: 15.09, sortRank: 0, periodReturns: { '1M': 29, '6M': 163.6, '1Y': 333 },
      priceHistory: { '1W': [475.51, 452.4, 488.45, 511.57, 547.27], '1M': [424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.27], '6M': [207.58, 214.95, 215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 192.43, 193.39, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 510.13, 490.33, 547.27], '1Y': [126.39, 138.43, 136.11, 138.41, 160.08, 158.65, 177.44, 174.31, 174.95, 166.55, 166.62, 162.13, 159.54, 159.16, 160.88, 164.01, 211.51, 218.09, 238.03, 258.01, 250.05, 237.52, 230.29, 206.13, 217.6, 221.42, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 455.19, 424.1, 467.51, 510.13, 490.33, 547.27] },
      velocityScore: { '1D': 3.3, '1W': 10, '1M': null, '6M': null }, isNew: false,
      marketCap: '$892B', pe: 181.2, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.63, ARTY: 7.58, BAI: 4.86, IGPT: 7.37, IVES: 5.06, ALAI: 1.19, CHAT: 4.08, AIFD: false, SPRX: 0.52, AOTG: 15.46 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.45, proScore: 2.76, coverage: 0.8,
      price: 394.66, weeklyPrices: [392.16, 372.10, 385.57, 382.07, 394.66], weeklyChange: 0.64, sortRank: 0, periodReturns: { '1M': -7.2, '6M': 16.1, '1Y': 56.5 },
      priceHistory: { '1W': [392.16, 372.1, 385.57, 382.07, 394.66], '1M': [425.19, 420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 394.66], '6M': [339.81, 341.45, 349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 319.55, 330.48, 322.16, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.14, 459.97, 396.6, 394.66], '1Y': [252.1, 263.77, 264.74, 277.9, 280.81, 283.69, 297.42, 292.93, 312.83, 294.91, 298.01, 302.39, 369.57, 346.17, 339.31, 333.39, 336.41, 344.13, 342.66, 372.97, 351.94, 351.96, 340.5, 385.03, 380.61, 412.97, 341.3, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 430, 425.19, 414.14, 459.97, 396.6, 394.66] },
      velocityScore: { '1D': -3.2, '1W': 3.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.9T', pe: 65.8, revenueGrowth: 48, eps: 6, grossMargin: 76, dividendYield: 0.68,
      etfPresence: { AIS: 0.67, ARTY: 3.36, BAI: 4.27, IGPT: false, IVES: 4.42, ALAI: 3.79, CHAT: 4.2, AIFD: 5.32, SPRX: false, AOTG: 1.53 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 7, avgWeight: 2.33, proScore: 1.63, coverage: 0.7,
      price: 167.06, weeklyPrices: [152.16, 151.76, 156.40, 163.24, 167.06], weeklyChange: 9.8, sortRank: 0, periodReturns: { '1M': 17.7, '6M': 32.7, '1Y': 75.7 },
      priceHistory: { '1W': [152.16, 151.76, 156.4, 163.24, 167.06], '1M': [141.97, 141.71, 141.58, 140.49, 148.59, 154.03, 158.01, 154.31, 155.27, 159.47, 170.68, 175.33, 174.37, 166.01, 154.27, 156.4, 152.16, 151.76, 156.4, 163.24, 167.06], '6M': [125.89, 130.73, 132.44, 130.08, 125.09, 138.41, 148.15, 128.67, 135.12, 132.79, 133.5, 132.89, 133.57, 136.26, 122.55, 126.68, 147.35, 164.23, 176.91, 172.7, 141.77, 141.97, 154.03, 170.68, 156.4, 167.06], '1Y': [95.09, 94.97, 98.91, 106.28, 108.3, 113.04, 118.62, 118.12, 141.25, 132.78, 134.27, 137.38, 150.72, 142.84, 142.64, 149.27, 145.29, 138.79, 145.94, 156.77, 153.55, 134.93, 123.45, 125.04, 127.8, 132.36, 126.13, 131.32, 131.03, 123.72, 130.59, 136.34, 141.74, 137.49, 141.59, 127.43, 133.5, 132.89, 133.57, 131.22, 120.77, 126.25, 152.02, 166.85, 172.47, 172.62, 141.77, 141.97, 154.03, 170.68, 156.4, 167.06] },
      velocityScore: { '1D': 10.1, '1W': 12.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$210B', pe: 57.4, revenueGrowth: 35, eps: 2.91, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.42, ARTY: 2.04, BAI: 1.4, IGPT: false, IVES: false, ALAI: 0.98, CHAT: 2.24, AIFD: 4.91, SPRX: 3.29, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 7 of 10 AI & ML ETFs (70% coverage) with average weight 2.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 6, avgWeight: 4.76, proScore: 2.86, coverage: 0.6,
      price: 441.26, weeklyPrices: [427.92, 408.75, 421.07, 423.93, 441.26], weeklyChange: 3.12, sortRank: 0, periodReturns: { '1M': 9.1, '6M': 53.4, '1Y': 104.6 },
      priceHistory: { '1W': [427.92, 408.75, 421.07, 423.93, 441.26], '1M': [404.35, 395.95, 392.61, 401.62, 407.15, 404.52, 412.32, 422.73, 424.86, 418.45, 435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93, 441.26], '6M': [287.74, 293.28, 299.58, 318.68, 327.11, 327.37, 339.55, 330.73, 368.1, 370.54, 374.58, 338.89, 338.31, 338.79, 326.11, 339.04, 370.6, 370.5, 402.46, 397.67, 411.68, 404.35, 404.52, 435.63, 426.8, 441.26], '1Y': [215.68, 220.09, 224.68, 231.84, 237.56, 240.33, 241.33, 232.47, 244.29, 232.7, 238.72, 231.39, 260.44, 262.79, 280.71, 288.47, 294.03, 295.94, 294.51, 301.53, 294.05, 291.17, 277.91, 284.68, 295.45, 310.14, 286.87, 296.95, 303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.04, 374.58, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 401.61, 411.68, 404.35, 404.52, 435.63, 426.8, 441.26] },
      velocityScore: { '1D': -1.4, '1W': 12.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 38, revenueGrowth: 35, eps: 11.62, grossMargin: 62, dividendYield: 0.9,
      etfPresence: { AIS: 3.17, ARTY: false, BAI: 4.3, IGPT: false, IVES: 5.04, ALAI: 5.59, CHAT: false, AIFD: 3.24, SPRX: false, AOTG: 7.24 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 4.74, proScore: 2.84, coverage: 0.6,
      price: 371.44, weeklyPrices: [364.26, 356.38, 357.77, 359.68, 371.44], weeklyChange: 1.97, sortRank: 0, periodReturns: { '1M': -6.4, '6M': 20.5, '1Y': 110.1 },
      priceHistory: { '1W': [364.26, 356.38, 357.77, 359.68, 371.44], '1M': [396.78, 396.94, 387.66, 388.91, 387.66, 382.97, 388.88, 388.83, 390.13, 380.34, 376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 371.44], '6M': [308.22, 309.78, 313.85, 321.98, 335.84, 330.54, 338.25, 331.25, 309, 314.98, 311.76, 298.52, 302.28, 307.13, 280.92, 295.77, 317.24, 341.68, 344.4, 385.69, 400.8, 396.78, 382.97, 376.37, 363.31, 371.44], '1Y': [176.77, 166.77, 175.84, 176.62, 182.97, 190.23, 195.75, 194.67, 203.34, 201.57, 207.14, 230.66, 239.17, 249.53, 247.14, 244.9, 245.76, 245.45, 250.46, 267.47, 277.54, 291.31, 284.28, 323.44, 319.63, 320.21, 306.57, 314.35, 313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 311.49, 311.76, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 383.25, 400.8, 396.78, 382.97, 376.37, 363.31, 371.44] },
      velocityScore: { '1D': -1.4, '1W': -5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.5T', pe: 28.4, revenueGrowth: 22, eps: 13.09, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.38, IGPT: 6.01, IVES: 4.53, ALAI: false, CHAT: 5.43, AIFD: 5, SPRX: false, AOTG: 4.1 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 6, avgWeight: 4.59, proScore: 2.75, coverage: 0.6,
      price: 308.78, weeklyPrices: [266.88, 252.59, 280.71, 279.70, 308.78], weeklyChange: 15.7, sortRank: 0, periodReturns: { '1M': 74.6, '6M': 266.5, '1Y': 338.5 },
      priceHistory: { '1W': [266.88, 252.59, 280.71, 279.7, 308.78], '1M': [176.89, 168.93, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 204.83, 205, 219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7, 308.78], '6M': [84.26, 84.8, 86.76, 84.64, 81.21, 83.1, 81.34, 74.21, 78.23, 79.48, 81.69, 89.57, 87.86, 89.53, 97.68, 107.11, 128.49, 139.69, 164.31, 164.95, 170.13, 176.89, 196.33, 219.43, 288.85, 308.78], '1Y': [70.42, 75.21, 76.24, 72.26, 70.85, 73.27, 76.34, 76.63, 77.81, 72.07, 74.26, 62.31, 67.1, 70.98, 80.09, 83.89, 86.97, 86.22, 84.26, 88.46, 87.59, 89.33, 78.68, 83.43, 100.2, 92.47, 84.07, 87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 81.69, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.13, 176.89, 196.33, 219.43, 288.85, 308.78] },
      velocityScore: { '1D': -2.8, '1W': 18.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$270B', pe: 106.1, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { AIS: 4.45, ARTY: 9.05, BAI: 1.9, IGPT: false, IVES: false, ALAI: false, CHAT: 1.58, AIFD: 6.1, SPRX: 4.46, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 4, proScore: 2, coverage: 0.5,
      price: 246.33, weeklyPrices: [244.19, 238.00, 241.51, 238.55, 246.33], weeklyChange: 0.88, sortRank: 0, periodReturns: { '1M': -6.7, '6M': 10.7, '1Y': 14 },
      priceHistory: { '1W': [244.19, 238, 241.51, 238.55, 246.33], '1M': [264.14, 264.86, 259.34, 265.01, 268.46, 266.32, 265.29, 271.85, 274, 270.64, 261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 244.19, 238, 241.51, 238.55, 246.33], '6M': [222.54, 228.43, 232.53, 241.56, 236.65, 234.34, 241.73, 222.69, 199.6, 210.11, 210, 213.21, 207.67, 208.76, 207.54, 209.77, 238.38, 250.56, 263.99, 268.26, 272.68, 264.14, 266.32, 261.26, 245.22, 246.33], '1Y': [216.1, 212.77, 220.46, 222.54, 223.19, 228.29, 231.01, 213.75, 221.47, 228.01, 228.71, 225.99, 230.33, 231.62, 220.21, 220.63, 221.78, 216.39, 222.03, 229.25, 249.32, 249.1, 222.55, 229.67, 232.38, 231.78, 222.56, 232.14, 230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 205.27, 210, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 272.05, 272.68, 264.14, 266.32, 261.26, 245.22, 246.33] },
      velocityScore: { '1D': -2.4, '1W': -6.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 32.7, revenueGrowth: 17, eps: 7.54, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 4.34, ALAI: 5.66, CHAT: 2.44, AIFD: 3.39, SPRX: false, AOTG: 4.17 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.47, proScore: 1.74, coverage: 0.5,
      price: 399.35, weeklyPrices: [403.41, 397.36, 390.34, 390.74, 399.35], weeklyChange: -1.01, sortRank: 0, periodReturns: { '1M': -5.4, '6M': -15.9, '1Y': -16.7 },
      priceHistory: { '1W': [403.41, 397.36, 390.34, 390.74, 399.35], '1M': [421.92, 423.54, 417.42, 421.06, 419.09, 418.57, 416.03, 412.67, 426.99, 450.24, 460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74, 399.35], '6M': [474.82, 484.92, 487.48, 483.47, 459.38, 451.14, 433.5, 393.67, 401.84, 397.23, 392.74, 408.96, 395.55, 389.02, 365.97, 373.46, 370.87, 422.79, 424.62, 414.44, 415.12, 421.92, 418.57, 460.52, 411.74, 399.35], '1Y': [479.14, 490.11, 492.05, 503.51, 505.62, 505.87, 512.57, 527.75, 529.24, 509.77, 502.04, 505.35, 500.37, 510.02, 510.15, 519.71, 523.98, 513.57, 517.66, 542.07, 514.33, 508.68, 493.79, 476.99, 477.73, 478.56, 476.39, 486.85, 483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 384.47, 392.74, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 413.62, 415.12, 421.92, 418.57, 460.52, 411.74, 399.35] },
      velocityScore: { '1D': -2.2, '1W': -8.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.0T', pe: 23.8, revenueGrowth: 18, eps: 16.8, grossMargin: 68, dividendYield: 0.93,
      etfPresence: { AIS: false, ARTY: 1.7, BAI: false, IGPT: false, IVES: 4.56, ALAI: 5.17, CHAT: 2.27, AIFD: false, SPRX: false, AOTG: 3.67 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 3.24, proScore: 1.62, coverage: 0.5,
      price: 595.46, weeklyPrices: [584.59, 570.98, 568.43, 566.98, 595.46], weeklyChange: 1.86, sortRank: 0, periodReturns: { '1M': -3.1, '6M': -8, '1Y': -15.2 },
      priceHistory: { '1W': [584.59, 570.98, 568.43, 566.98, 595.46], '1M': [614.23, 611.21, 602.61, 605.06, 607.38, 610.26, 612.34, 635.26, 635.29, 632.51, 600.47, 597.63, 622.98, 627.57, 593, 585.39, 584.59, 570.98, 568.43, 566.98, 595.46], '6M': [647.51, 661.5, 665.95, 648.69, 615.52, 647.63, 738.31, 670.21, 649.81, 655.66, 648.18, 644.86, 613.71, 606.7, 547.54, 574.46, 629.86, 688.55, 675.03, 608.75, 609.63, 614.23, 610.26, 600.47, 585.39, 595.46], '1Y': [702.12, 712.2, 719.22, 732.78, 702.91, 713.58, 700, 763.46, 790, 751.48, 754.1, 737.05, 751.98, 775.72, 760.66, 717.34, 713.08, 708.65, 733.27, 751.44, 627.32, 627.08, 597.69, 636.22, 639.6, 650.13, 657.15, 664.94, 660.09, 646.06, 620.8, 658.76, 716.5, 661.46, 639.77, 637.25, 648.18, 644.86, 613.71, 593.66, 525.72, 573.02, 634.53, 670.91, 678.62, 610.41, 609.63, 614.23, 610.26, 600.47, 585.39, 595.46] },
      velocityScore: { '1D': -1.8, '1W': -6.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 21.7, revenueGrowth: 33, eps: 27.5, grossMargin: 82, dividendYield: 0.37,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 4.5, IVES: 4.39, ALAI: 4.04, CHAT: 2.12, AIFD: false, SPRX: false, AOTG: 1.13 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.13, proScore: 1.56, coverage: 0.5,
      price: 389.32, weeklyPrices: [341.70, 330.86, 367.47, 367.15, 389.32], weeklyChange: 13.94, sortRank: 0, periodReturns: { '1M': 67.3, '6M': 171, '1Y': 308.5 },
      priceHistory: { '1W': [341.7, 330.86, 367.47, 367.15, 389.32], '1M': [232.68, 215.58, 244.26, 287.48, 297.84, 306.88, 318.72, 325.33, 349.17, 342.85, 320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 389.32], '6M': [143.66, 172.62, 170.84, 165.77, 172.14, 176.35, 160.46, 142.82, 126.58, 129.68, 118.83, 119.2, 120.31, 126.16, 113.61, 117.14, 149.05, 174.05, 212.84, 202.68, 199.79, 232.68, 306.88, 320.09, 346.33, 389.32], '1Y': [95.3, 87.26, 88.66, 99.86, 91.94, 119.48, 118.41, 135.54, 192, 171.06, 178.56, 176.61, 230.37, 249.38, 205.27, 194.5, 212.1, 161.55, 157.51, 168.25, 179.31, 167.55, 139.52, 144.78, 152.5, 164.32, 144.94, 168.83, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 118.83, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 199.79, 232.68, 306.88, 320.09, 346.33, 389.32] },
      velocityScore: { '1D': -1.9, '1W': 9.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$67B', pe: 264.8, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 1.92, ARTY: 1.79, BAI: false, IGPT: false, IVES: false, ALAI: 1.5, CHAT: 2.68, AIFD: false, SPRX: 7.76, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 5, avgWeight: 2.99, proScore: 1.5, coverage: 0.5,
      price: 959.37, weeklyPrices: [821.76, 853.26, 889.59, 921.56, 959.37], weeklyChange: 16.75, sortRank: 0, periodReturns: { '1M': -1.2, '6M': 186.6, '1Y': 1018.4 },
      priceHistory: { '1W': [821.76, 853.26, 889.59, 921.56, 959.37], '1M': [970.7, 884.98, 890.09, 868.07, 964.5, 946.9, 910.81, 902.31, 860.62, 854.96, 905, 1029.15, 938, 945.08, 863.66, 895.4, 821.76, 853.26, 889.59, 921.56, 959.37], '6M': [334.69, 389.88, 371.18, 392.88, 331.62, 354.49, 381.44, 504.42, 583.46, 667.77, 700.91, 558.44, 622.5, 772.13, 688.8, 826.88, 897.3, 894.07, 881.64, 949.93, 903.8, 970.7, 946.9, 905, 895.4, 959.37], '1Y': [85.78, 91.81, 91.49, 90.44, 99.63, 102.13, 109.48, 108.15, 119.66, 117.96, 124.62, 134.12, 164.88, 163.34, 152.75, 171.4, 157.15, 156.78, 162.95, 198.39, 188.36, 252.47, 247.43, 291.27, 302.98, 366, 316.15, 387.41, 368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 674.73, 700.91, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 903.8, 970.7, 946.9, 905, 895.4, 959.37] },
      velocityScore: { '1D': 10.3, '1W': 9.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$75B', pe: 168, revenueGrowth: 90, eps: 5.71, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.89, IGPT: false, IVES: false, ALAI: 0.45, CHAT: 1.57, AIFD: 6.31, SPRX: 3.74, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 5 of 10 AI & ML ETFs (50% coverage) with average weight 3.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'Credo Technology Group Holding Ltd', easyScore: 5, avgWeight: 1.92, proScore: 0.96, coverage: 0.5,
      price: 259, weeklyPrices: [234.32, 237.68, 264.76, 250.81, 259.00], weeklyChange: 10.53, sortRank: 0, periodReturns: { '1M': 50.4, '6M': 82.4, '1Y': 227.1 },
      priceHistory: { '1W': [234.32, 237.68, 264.76, 250.81, 259], '1M': [172.17, 156.27, 168.99, 182.98, 193.39, 218.41, 221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 259], '6M': [142.02, 149.94, 144.92, 141, 156.84, 135.1, 129.47, 98.06, 121.78, 124.06, 112.27, 109.83, 117.69, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 184.38, 188.51, 172.17, 218.41, 226.1, 222.27, 259], '1Y': [79.17, 91.92, 87.59, 97.59, 101.19, 98.41, 109.38, 110.29, 125.38, 106.3, 120.1, 124.77, 163.96, 164.44, 149.38, 144.91, 137.2, 129.75, 144.17, 162.18, 164.23, 158.5, 139.56, 154.18, 189.19, 157.98, 140.34, 147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 112.27, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 188.51, 172.17, 218.41, 226.1, 222.27, 259] },
      velocityScore: { '1D': -4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$48B', pe: 141.5, revenueGrowth: 157, eps: 1.83, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: 0.84, ARTY: 1.33, BAI: 2.09, IGPT: false, IVES: false, ALAI: false, CHAT: 2.25, AIFD: false, SPRX: 3.09, AOTG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 4, avgWeight: 3.83, proScore: 1.53, coverage: 0.4,
      price: 127.84, weeklyPrices: [107.92, 107.04, 116.96, 124.57, 127.84], weeklyChange: 18.46, sortRank: 0, periodReturns: { '1M': 17.5, '6M': 240.8, '1Y': 516.4 },
      priceHistory: { '1W': [107.92, 107.04, 116.96, 124.57, 127.84], '1M': [108.77, 108.17, 110.8, 118.96, 118.5, 119.84, 123.52, 121.77, 120.89, 114.68, 109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 127.84], '6M': [37.51, 36.37, 37.3, 42.63, 48.72, 54.32, 48.66, 48.24, 46.48, 44.11, 45.61, 43.42, 45.77, 46.18, 44.1, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 108.77, 119.84, 109.33, 110.27, 127.84], '1Y': [20.74, 22.55, 22.85, 23.44, 22.69, 23.49, 20.41, 20.19, 21.81, 25.31, 24.35, 24, 24.77, 24.9, 31.22, 35.94, 37.17, 35.63, 38.12, 41.53, 37.03, 37.88, 34.33, 35.83, 43.76, 40.78, 37.31, 36.35, 36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.61, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 124.92, 108.77, 119.84, 109.33, 110.27, 127.84] },
      velocityScore: { '1D': 4.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$643B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.43, ARTY: false, BAI: 3.12, IGPT: 7.47, IVES: false, ALAI: false, CHAT: 1.3, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'ARM', name: 'ARM Holdings PLC', easyScore: 4, avgWeight: 3.26, proScore: 1.3, coverage: 0.4,
      price: 414.7, weeklyPrices: [324.86, 307.43, 342.23, 380.81, 414.70], weeklyChange: 27.65, sortRank: 0, periodReturns: { '1M': 98.3, '6M': 233.4, '1Y': 192 },
      priceHistory: { '1W': [324.86, 307.43, 342.23, 380.81, 414.7], '1M': [209.16, 215.12, 223.15, 256.73, 298.23, 306.51, 321.22, 302.71, 335.27, 353.29, 408.85, 402.71, 411.83, 393.44, 342.93, 346.39, 324.86, 307.43, 342.23, 380.81, 414.7], '6M': [124.37, 113.29, 110.86, 115.68, 104.99, 119.2, 108.43, 110.88, 122.19, 125.58, 127.45, 114.38, 115.75, 129.82, 154.8, 149.11, 148.93, 166.73, 234.81, 211.18, 213.27, 209.16, 306.51, 408.85, 346.39, 414.7], '1Y': [142.04, 156.41, 156.33, 148.02, 153.9, 159.28, 163.47, 137.23, 142.39, 134.01, 140.26, 131.42, 154.14, 153.37, 144.3, 150.38, 159.35, 168.16, 169.38, 173.09, 160.73, 149.74, 136.04, 131.44, 139.19, 141.52, 121.1, 112.02, 109.31, 113.08, 105.11, 116.07, 105.36, 123.7, 125.28, 123.78, 127.45, 114.38, 115.75, 132.35, 144.13, 148.77, 157.58, 175.1, 215.88, 203.26, 213.27, 209.16, 306.51, 408.85, 346.39, 414.7] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$443B', pe: 493.7, revenueGrowth: 20, eps: 0.84, grossMargin: 98, dividendYield: null,
      etfPresence: { AIS: 2.29, ARTY: false, BAI: false, IGPT: false, IVES: false, ALAI: 0.51, CHAT: 2.96, AIFD: false, SPRX: 7.27, AOTG: false },
      tonyNote: 'Arm Holdings is held across Broad Tech and AI ETFs as the CPU architecture licensor embedded in every mobile device and increasingly in AI inference chips and data center CPUs. Revenue grew and the royalty model is high-margin; the weight score reflects consistent institutional positioning as the AI chip design ecosystem expands on Arm cores.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 4, avgWeight: 3.01, proScore: 1.21, coverage: 0.4,
      price: 646.35, weeklyPrices: [517.72, 490.09, 529.29, 562.93, 646.35], weeklyChange: 24.85, sortRank: 0, periodReturns: { '1M': 34.1, '6M': 275.7, '1Y': 1025.8 },
      priceHistory: { '1W': [517.72, 490.09, 529.29, 562.93, 646.35], '1M': [482.02, 458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 646.35], '6M': [172.04, 176.76, 176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 279.7, 245.25, 272.29, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 484.28, 546.2, 526.93, 646.35], '1Y': [57.41, 62.07, 63.84, 64.64, 66.53, 69.32, 70.61, 75.84, 75.91, 75.86, 79.71, 86, 95.02, 100.94, 109.69, 130.59, 119.93, 113.13, 121.41, 124.92, 152.18, 169.99, 152.86, 155.41, 155.59, 181.95, 174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 480, 482.02, 484.28, 546.2, 526.93, 646.35] },
      velocityScore: { '1D': 5.2, '1W': 5.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$223B', pe: 38.7, revenueGrowth: 46, eps: 16.72, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { AIS: 1.59, ARTY: 2.83, BAI: 3.02, IGPT: false, IVES: false, ALAI: 4.61, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 4, avgWeight: 2.97, proScore: 1.19, coverage: 0.4,
      price: 193.35, weeklyPrices: [205.81, 201.26, 184.10, 184.13, 193.35], weeklyChange: -6.05, sortRank: 0, periodReturns: { '1M': 0.2, '6M': 4.6, '1Y': -8.4 },
      priceHistory: { '1W': [205.81, 201.26, 184.1, 184.13, 193.35], '1M': [192.95, 186.61, 181.46, 188.16, 189.77, 192.08, 193.06, 190.96, 203.7, 225.78, 248.15, 244.58, 230.33, 236.34, 213.68, 211.82, 205.81, 201.26, 184.1, 184.13, 193.35], '6M': [184.92, 198.38, 197.21, 192.84, 193.61, 178.18, 169.01, 136.48, 156.48, 148.08, 145.4, 152.96, 155.11, 155.52, 142.81, 146.38, 138.09, 175.06, 173.28, 171.83, 195.95, 192.95, 192.08, 248.15, 211.82, 193.35], '1Y': [211.1, 215.27, 218.96, 235.81, 241.3, 241.9, 249.98, 255.67, 253.86, 234.62, 234.21, 223.45, 328.33, 301.41, 308.46, 289.01, 284.24, 299, 275.15, 280.83, 248.17, 236.15, 220.49, 197.03, 207.73, 223.01, 188.65, 195.34, 194.91, 189.65, 189.85, 177.16, 164.58, 142.82, 160.14, 141.31, 145.4, 152.96, 155.11, 149.68, 139.66, 145.54, 155.62, 177.58, 172.96, 180.29, 195.95, 192.95, 192.08, 248.15, 211.82, 193.35] },
      velocityScore: { '1D': -3.3, '1W': -13.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$556B', pe: 33.1, revenueGrowth: 21, eps: 5.84, grossMargin: 66, dividendYield: 1.09,
      etfPresence: { AIS: false, ARTY: 3.65, BAI: false, IGPT: false, IVES: 3.73, ALAI: false, CHAT: 1.66, AIFD: false, SPRX: false, AOTG: 2.84 },
      tonyNote: 'Oracle lands in 3 AI ETFs on the strength of its cloud database and AI infrastructure contracts. Revenue grew 22%, 67% gross margin, P/E of 40x. The 17.5% weekly return following a major earnings beat shows how quickly sentiment can reprice; the weight score at 2.04% is still modest, meaning ETF managers have started building positions but conviction is not yet deep.',
    },
    {
      ticker: 'NBIS', name: 'NEBIUS GROUP NV', easyScore: 4, avgWeight: 2.97, proScore: 1.19, coverage: 0.4,
      price: 261.76, weeklyPrices: [220.12, 211.69, 222.24, 232.36, 261.76], weeklyChange: 18.92, sortRank: 0, periodReturns: { '1M': 19, '6M': 222.6, '1Y': 418.7 },
      priceHistory: { '1W': [220.12, 211.69, 222.24, 232.36, 261.76], '1M': [219.94, 199.86, 197.73, 191.82, 219.93, 214.77, 208.06, 208.37, 226.34, 231.09, 264.51, 260.58, 251.68, 259.67, 227.81, 218, 220.12, 211.69, 222.24, 232.36, 261.76], '6M': [81.14, 93.23, 85.17, 96.21, 101.98, 96.85, 94.91, 73.87, 89.73, 97.92, 91.19, 89.33, 112.95, 121.52, 105.97, 108.82, 144.97, 157.14, 147.16, 154.49, 177.05, 219.94, 214.77, 264.51, 218, 261.76], '1Y': [50.46, 51.02, 50.31, 46.05, 53.31, 51.88, 50.4, 55.17, 75.33, 67.19, 70.48, 65.65, 93.39, 94.08, 113.23, 115.61, 117.7, 128.15, 104.28, 121.83, 110.54, 102.22, 90.54, 88.88, 98.92, 93.59, 80.95, 90.03, 83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 98.01, 100.61, 91.19, 89.33, 112.95, 117.62, 100.82, 112.54, 154.56, 159.16, 144.96, 176.42, 177.05, 219.94, 214.77, 264.51, 218, 261.76] },
      velocityScore: { '1D': null, '1W': 6.2, '1M': null, '6M': null }, isNew: true,
      marketCap: '$66B', pe: 101.5, revenueGrowth: 684, eps: 2.58, grossMargin: 72, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 2.53, ALAI: 4.25, CHAT: 3.4, AIFD: 1.7, SPRX: false, AOTG: false },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, avgWeight: 2.95, proScore: 1.18, coverage: 0.4,
      price: 996.37, weeklyPrices: [846.01, 815.99, 868.09, 931.04, 996.37], weeklyChange: 17.77, sortRank: 0, periodReturns: { '1M': 25.3, '6M': 248.9, '1Y': 660.4 },
      priceHistory: { '1W': [846.01, 815.99, 868.09, 931.04, 996.37], '1M': [795.47, 740.84, 733.35, 751.07, 810.46, 812.73, 845.76, 870.66, 880.72, 879.8, 921.26, 926.61, 940.69, 925.99, 847.47, 876.77, 846.01, 815.99, 868.09, 931.04, 996.37], '6M': [285.58, 282.85, 280.08, 308.26, 312.28, 346.53, 446.57, 405.45, 431.17, 411.11, 407.84, 352.8, 383.71, 434.6, 378.79, 429.36, 503.13, 547.75, 586.25, 726.93, 782.64, 795.47, 812.73, 921.26, 876.77, 996.37], '1Y': [131.04, 136.31, 145.04, 142.01, 147.12, 152.76, 152.68, 151.74, 155.59, 157.93, 165.24, 176.32, 193.04, 213.36, 223.7, 256.84, 225.01, 211.63, 214.57, 223, 250.38, 288, 253.86, 261.89, 258.67, 298.92, 288.13, 282.8, 275.39, 284.47, 320.32, 346.1, 407.69, 429.32, 425.99, 407.4, 407.84, 352.8, 383.71, 411.23, 380.07, 453.3, 513.28, 539.75, 595.86, 738.54, 782.64, 795.47, 812.73, 921.26, 876.77, 996.37] },
      velocityScore: { '1D': 6.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$225B', pe: 94.7, revenueGrowth: 44, eps: 10.52, grossMargin: 42, dividendYield: 0.32,
      etfPresence: { AIS: 2.83, ARTY: 3.2, BAI: false, IGPT: 3.51, IVES: false, ALAI: 2.25, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 6.01, proScore: 6.01, coverage: 1,
      price: 1081.56, weeklyPrices: [935.89, 891.88, 995.87, 981.61, 1081.56], weeklyChange: 15.56, sortRank: 0, periodReturns: { '1M': 49.2, '6M': 355.4, '1Y': 802.5 },
      priceHistory: { '1W': [935.89, 891.88, 995.87, 981.61, 1081.56], '1M': [724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1081.56], '6M': [237.5, 276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 370.3, 426.13, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 1035.5, 949.28, 1081.56], '1Y': [119.84, 127.91, 120.89, 122.24, 116.43, 109.83, 111.96, 109.06, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 185.69, 187.06, 202.29, 221.91, 218.03, 241.11, 228.5, 224.53, 234.16, 263.71, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 746.81, 724.66, 751, 1035.5, 949.28, 1081.56] },
      velocityScore: { '1D': -3.8, '1W': 2.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 51, revenueGrowth: 196, eps: 21.2, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { SOXX: 11.21, PSI: 5.3, XSD: 3.53, DRAM: 4.01 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.88, proScore: 4.41, coverage: 0.75,
      price: 547.27, weeklyPrices: [475.51, 452.40, 488.45, 511.57, 547.27], weeklyChange: 15.09, sortRank: 0, periodReturns: { '1M': 29, '6M': 163.6, '1Y': 333 },
      priceHistory: { '1W': [475.51, 452.4, 488.45, 511.57, 547.27], '1M': [424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.27], '6M': [207.58, 214.95, 215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 192.43, 193.39, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 510.13, 490.33, 547.27], '1Y': [126.39, 138.43, 136.11, 138.41, 160.08, 158.65, 177.44, 174.31, 174.95, 166.55, 166.62, 162.13, 159.54, 159.16, 160.88, 164.01, 211.51, 218.09, 238.03, 258.01, 250.05, 237.52, 230.29, 206.13, 217.6, 221.42, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 455.19, 424.1, 467.51, 510.13, 490.33, 547.27] },
      velocityScore: { '1D': 2.8, '1W': -1.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$892B', pe: 181.2, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 8.98, PSI: 4.91, XSD: 3.75, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 5.07, proScore: 3.8, coverage: 0.75,
      price: 127.84, weeklyPrices: [107.92, 107.04, 116.96, 124.57, 127.84], weeklyChange: 18.46, sortRank: 0, periodReturns: { '1M': 17.5, '6M': 240.8, '1Y': 516.4 },
      priceHistory: { '1W': [107.92, 107.04, 116.96, 124.57, 127.84], '1M': [108.77, 108.17, 110.8, 118.96, 118.5, 119.84, 123.52, 121.77, 120.89, 114.68, 109.33, 107.93, 112.71, 111.78, 99.17, 110.27, 107.92, 107.04, 116.96, 124.57, 127.84], '6M': [37.51, 36.37, 37.3, 42.63, 48.72, 54.32, 48.66, 48.24, 46.48, 44.11, 45.61, 43.42, 45.77, 46.18, 44.1, 50.38, 62.38, 68.5, 82.54, 99.62, 124.92, 108.77, 119.84, 109.33, 110.27, 127.84], '1Y': [20.74, 22.55, 22.85, 23.44, 22.69, 23.49, 20.41, 20.19, 21.81, 25.31, 24.35, 24, 24.77, 24.9, 31.22, 35.94, 37.17, 35.63, 38.12, 41.53, 37.03, 37.88, 34.33, 35.83, 43.76, 40.78, 37.31, 36.35, 36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.61, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 124.92, 108.77, 119.84, 109.33, 110.27, 127.84] },
      velocityScore: { '1D': 4.4, '1W': 13.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$643B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 6.43, PSI: 4.88, XSD: 3.91, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 3.91, proScore: 2.94, coverage: 0.75,
      price: 211.96, weeklyPrices: [208.19, 200.42, 204.87, 205.19, 211.96], weeklyChange: 1.81, sortRank: 0, periodReturns: { '1M': -5.9, '6M': 20.2, '1Y': 46.5 },
      priceHistory: { '1W': [208.19, 200.42, 204.87, 205.19, 211.96], '1M': [225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 211.96], '6M': [176.29, 183.69, 187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 177.19, 177.82, 180.25, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 215.33, 224.36, 208.64, 211.96], '1Y': [144.69, 147.9, 153.3, 162.88, 171.37, 170.78, 175.51, 178.26, 183.16, 175.64, 181.77, 170.62, 177.33, 170.29, 176.97, 187.24, 185.04, 180.03, 181.16, 201.03, 198.69, 193.16, 181.36, 177.82, 179.59, 183.78, 177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 215.2, 225.32, 215.33, 224.36, 208.64, 211.96] },
      velocityScore: { '1D': -1.7, '1W': -10.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.1T', pe: 32.5, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.49,
      etfPresence: { SOXX: 5.46, PSI: 4.62, XSD: 1.66, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.19, proScore: 2.39, coverage: 0.75,
      price: 430.8, weeklyPrices: [404.62, 392.67, 412.13, 417.79, 430.80], weeklyChange: 6.47, sortRank: 0, periodReturns: { '1M': 3.2, '6M': 53.6, '1Y': 85.8 },
      priceHistory: { '1W': [404.62, 392.67, 412.13, 417.79, 430.8], '1M': [417.49, 418.58, 414.31, 398.05, 384.21, 397.07, 419.94, 416.88, 419.01, 413.85, 402.69, 423.2, 437.67, 428.76, 401.39, 403.89, 404.62, 392.67, 412.13, 417.79, 430.8], '6M': [280.44, 275.82, 274.82, 292.89, 297.99, 308.52, 318.7, 322.12, 331.36, 355.03, 355.79, 315.81, 306.07, 310.44, 313.42, 318.34, 350.14, 371.45, 399.57, 397.69, 416.52, 417.49, 397.07, 402.69, 403.89, 430.8], '1Y': [231.8, 234.98, 240.64, 242.72, 240.61, 228.08, 230.75, 220.68, 232.04, 230.44, 255.63, 244.55, 247.21, 246.32, 248.61, 239.28, 233.75, 235.4, 246.37, 239.35, 229.38, 233.41, 230.13, 252.02, 278.24, 281.57, 278.4, 276.73, 271.2, 299.16, 302.1, 305.6, 310.88, 320.45, 337.1, 355.15, 355.79, 315.81, 306.07, 309.43, 307.44, 327.36, 350.01, 381.05, 392.59, 397.02, 416.52, 417.49, 397.07, 402.69, 403.89, 430.8] },
      velocityScore: { '1D': -0.8, '1W': -7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$210B', pe: 64, revenueGrowth: 37, eps: 6.73, grossMargin: 64, dividendYield: 1.05,
      etfPresence: { SOXX: 2.77, PSI: 4.82, XSD: 1.97, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 6.36, proScore: 3.18, coverage: 0.5,
      price: 308.78, weeklyPrices: [266.88, 252.59, 280.71, 279.70, 308.78], weeklyChange: 15.7, sortRank: 0, periodReturns: { '1M': 74.6, '6M': 266.5, '1Y': 338.5 },
      priceHistory: { '1W': [266.88, 252.59, 280.71, 279.7, 308.78], '1M': [176.89, 168.93, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 204.83, 205, 219.43, 290.79, 301.65, 316.43, 263.47, 288.85, 266.88, 252.59, 280.71, 279.7, 308.78], '6M': [84.26, 84.8, 86.76, 84.64, 81.21, 83.1, 81.34, 74.21, 78.23, 79.48, 81.69, 89.57, 87.86, 89.53, 97.68, 107.11, 128.49, 139.69, 164.31, 164.95, 170.13, 176.89, 196.33, 219.43, 288.85, 308.78], '1Y': [70.42, 75.21, 76.24, 72.26, 70.85, 73.27, 76.34, 76.63, 77.81, 72.07, 74.26, 62.31, 67.1, 70.98, 80.09, 83.89, 86.97, 86.22, 84.26, 88.46, 87.59, 89.33, 78.68, 83.43, 100.2, 92.47, 84.07, 87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 81.69, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.13, 176.89, 196.33, 219.43, 288.85, 308.78] },
      velocityScore: { '1D': -1.9, '1W': -2.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$270B', pe: 106.1, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.09,
      etfPresence: { SOXX: 8.06, PSI: false, XSD: 4.65, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 5.69, proScore: 2.84, coverage: 0.5,
      price: 589.59, weeklyPrices: [499.21, 497.01, 552.64, 567.25, 589.59], weeklyChange: 18.1, sortRank: 0, periodReturns: { '1M': 35, '6M': 125.7, '1Y': 234 },
      priceHistory: { '1W': [499.21, 497.01, 552.64, 567.25, 589.59], '1M': [436.62, 413.57, 406.91, 426.85, 427.36, 432.16, 454.89, 448.25, 449.68, 450.06, 458.17, 490.05, 500.77, 501.7, 453.01, 492.17, 499.21, 497.01, 552.64, 567.25, 589.59], '6M': [261.27, 259.01, 259.97, 292.2, 301.89, 318.79, 341.34, 303.99, 328.39, 375.38, 372.3, 324.74, 341.53, 357.21, 338.55, 348.47, 399.49, 396.94, 417.04, 389.08, 435.44, 436.62, 432.16, 458.17, 492.17, 589.59], '1Y': [176.55, 180.18, 183.76, 195.39, 194.81, 187.01, 188.41, 179.15, 188.45, 162.22, 164.51, 156.25, 163.42, 178.13, 201.44, 217.74, 211.56, 218.19, 226, 227.64, 230.19, 228.67, 225.12, 242.46, 268.63, 275.15, 258.84, 260.23, 256.99, 281.64, 319.08, 322.38, 322.32, 322.51, 354.91, 373.55, 372.3, 324.74, 341.53, 357.06, 337.17, 352.62, 395.73, 391.62, 404.86, 391.38, 435.44, 436.62, 432.16, 458.17, 492.17, 589.59] },
      velocityScore: { '1D': 0, '1W': 10.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$468B', pe: 55.6, revenueGrowth: 11, eps: 10.61, grossMargin: 49, dividendYield: 0.37,
      etfPresence: { SOXX: 5.35, PSI: 6.03, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 5.03, proScore: 2.51, coverage: 0.5,
      price: 253.63, weeklyPrices: [213.94, 213.56, 241.16, 254.54, 253.63], weeklyChange: 18.55, sortRank: 0, periodReturns: { '1M': 40.6, '6M': 107, '1Y': 184.2 },
      priceHistory: { '1W': [213.94, 213.56, 241.16, 254.54, 253.63], '1M': [180.43, 175.65, 174.06, 182.95, 184.22, 188.84, 201.14, 195.72, 192.76, 192.17, 194, 204.52, 212.51, 213.11, 192.92, 210.81, 213.94, 213.56, 241.16, 254.54, 253.63], '6M': [122.51, 126.57, 124.36, 135.97, 143.45, 150, 168.47, 133.1, 145.09, 149.6, 152.46, 134.46, 141.86, 151.15, 145.11, 151.68, 173.73, 179.14, 193.5, 172.63, 186.92, 180.43, 188.84, 194, 210.81, 253.63], '1Y': [89.24, 88.9, 89.89, 92.32, 93.35, 89.71, 91.61, 88.34, 93.55, 87.61, 88.81, 84.39, 93.26, 98.99, 106.87, 112.89, 108.47, 102.57, 114.74, 120.6, 119.35, 119.09, 112.31, 114.59, 121.18, 123.89, 122.34, 126.88, 121.51, 132.46, 154.5, 151.28, 142.79, 144.29, 146.41, 148.77, 152.46, 134.46, 141.86, 149.87, 144.32, 154.01, 176.88, 180.53, 190, 171.33, 186.92, 180.43, 188.84, 194, 210.81, 253.63] },
      velocityScore: { '1D': 2.9, '1W': 15.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$331B', pe: 71.6, revenueGrowth: 12, eps: 3.54, grossMargin: 61, dividendYield: 0.36,
      etfPresence: { SOXX: 3.93, PSI: 6.12, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 4.59, proScore: 2.3, coverage: 0.5,
      price: 390.54, weeklyPrices: [327.16, 321.80, 362.52, 366.81, 390.54], weeklyChange: 19.37, sortRank: 0, periodReturns: { '1M': 37.2, '6M': 137.7, '1Y': 318.1 },
      priceHistory: { '1W': [327.16, 321.8, 362.52, 366.81, 390.54], '1M': [284.72, 277.96, 273.38, 292.09, 302.24, 305.35, 322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 390.54], '6M': [164.3, 175.26, 173.78, 203.08, 208.79, 220.7, 248.17, 213.31, 231.29, 244.92, 233.89, 199.33, 212.2, 233.99, 211.62, 218.44, 263.66, 267.6, 267.78, 256.72, 294.05, 284.72, 305.35, 317.12, 324.45, 390.54], '1Y': [93.41, 95.63, 96.81, 99.81, 100.37, 97.1, 98.94, 96.68, 105.28, 100.33, 103.63, 97.74, 107.36, 121.9, 128.32, 142.79, 140.35, 138.31, 145.04, 155.62, 155.78, 159.18, 143.24, 151.93, 159.75, 168.26, 163.26, 175.16, 171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 242.27, 233.89, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 294.05, 284.72, 305.35, 317.12, 324.45, 390.54] },
      velocityScore: { '1D': -1.3, '1W': 6.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$488B', pe: 74, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.28,
      etfPresence: { SOXX: 3.69, PSI: 5.5, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 3.66, proScore: 1.83, coverage: 0.5,
      price: 394.66, weeklyPrices: [392.16, 372.10, 385.57, 382.07, 394.66], weeklyChange: 0.64, sortRank: 0, periodReturns: { '1M': -7.2, '6M': 16.1, '1Y': 56.5 },
      priceHistory: { '1W': [392.16, 372.1, 385.57, 382.07, 394.66], '1M': [425.19, 420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 394.66], '6M': [339.81, 341.45, 349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 319.55, 330.48, 322.16, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.14, 459.97, 396.6, 394.66], '1Y': [252.1, 263.77, 264.74, 277.9, 280.81, 283.69, 297.42, 292.93, 312.83, 294.91, 298.01, 302.39, 369.57, 346.17, 339.31, 333.39, 336.41, 344.13, 342.66, 372.97, 351.94, 351.96, 340.5, 385.03, 380.61, 412.97, 341.3, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 430, 425.19, 414.14, 459.97, 396.6, 394.66] },
      velocityScore: { '1D': -2.1, '1W': -9.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.9T', pe: 65.8, revenueGrowth: 48, eps: 6, grossMargin: 76, dividendYield: 0.68,
      etfPresence: { SOXX: 5.63, PSI: false, XSD: 1.68, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 3.43, proScore: 1.72, coverage: 0.5,
      price: 389.32, weeklyPrices: [341.70, 330.86, 367.47, 367.15, 389.32], weeklyChange: 13.94, sortRank: 0, periodReturns: { '1M': 67.3, '6M': 171, '1Y': 308.5 },
      priceHistory: { '1W': [341.7, 330.86, 367.47, 367.15, 389.32], '1M': [232.68, 215.58, 244.26, 287.48, 297.84, 306.88, 318.72, 325.33, 349.17, 342.85, 320.09, 355.76, 363.54, 358.05, 317.06, 346.33, 341.7, 330.86, 367.47, 367.15, 389.32], '6M': [143.66, 172.62, 170.84, 165.77, 172.14, 176.35, 160.46, 142.82, 126.58, 129.68, 118.83, 119.2, 120.31, 126.16, 113.61, 117.14, 149.05, 174.05, 212.84, 202.68, 199.79, 232.68, 306.88, 320.09, 346.33, 389.32], '1Y': [95.3, 87.26, 88.66, 99.86, 91.94, 119.48, 118.41, 135.54, 192, 171.06, 178.56, 176.61, 230.37, 249.38, 205.27, 194.5, 212.1, 161.55, 157.51, 168.25, 179.31, 167.55, 139.52, 144.78, 152.5, 164.32, 144.94, 168.83, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 118.83, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 199.79, 232.68, 306.88, 320.09, 346.33, 389.32] },
      velocityScore: { '1D': -1.1, '1W': 8.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$67B', pe: 264.8, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.43, PSI: false, XSD: 4.43, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.94, proScore: 1.47, coverage: 0.5,
      price: 221.39, weeklyPrices: [205.42, 191.20, 202.96, 211.72, 221.39], weeklyChange: 7.77, sortRank: 0, periodReturns: { '1M': 9.9, '6M': 23.5, '1Y': 41.1 },
      priceHistory: { '1W': [205.42, 191.2, 202.96, 211.72, 221.39], '1M': [201.49, 203.64, 195.61, 202.51, 213.41, 238.16, 248.82, 233.4, 243.29, 251.02, 228.99, 240.84, 250.01, 242.57, 215.94, 217.77, 205.42, 191.2, 202.96, 211.72, 221.39], '6M': [179.26, 174.22, 173.65, 180.19, 164.54, 157.8, 152.22, 136.3, 138.47, 142.88, 142.36, 135.69, 129.82, 131.28, 130.54, 126.8, 128.06, 136.2, 148.85, 177.01, 219.09, 201.49, 238.16, 228.99, 217.77, 221.39], '1Y': [156.87, 155.71, 159.4, 159.35, 154.07, 159.88, 162.08, 146.71, 153.73, 156.25, 159.17, 157.28, 158.95, 165.26, 173.55, 166.49, 165.46, 161.74, 168.83, 181.03, 172.84, 173.98, 165.06, 163.3, 175.07, 182.21, 176.12, 174.75, 171.05, 181.87, 161.39, 155.82, 151.59, 137.34, 140.7, 140.41, 142.36, 135.69, 129.82, 129.9, 127.11, 125.73, 131.24, 137.52, 150.26, 168.38, 219.09, 201.49, 238.16, 228.99, 217.77, 221.39] },
      velocityScore: { '1D': 2.8, '1W': -9.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$233B', pe: 23.8, revenueGrowth: -4, eps: 9.29, grossMargin: 55, dividendYield: 1.74,
      etfPresence: { SOXX: 3.5, PSI: false, XSD: 2.37, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 2.81, proScore: 1.41, coverage: 0.5,
      price: 312.47, weeklyPrices: [288.63, 282.01, 297.10, 301.12, 312.47], weeklyChange: 8.26, sortRank: 0, periodReturns: { '1M': 3.2, '6M': 75.6, '1Y': 56.8 },
      priceHistory: { '1W': [288.63, 282.01, 297.1, 301.12, 312.47], '1M': [302.73, 300.6, 302.31, 304.88, 298.39, 309.21, 324.89, 317.45, 315.95, 305.68, 293.2, 308.12, 308.59, 305.37, 285.06, 290.9, 288.63, 282.01, 297.1, 301.12, 312.47], '6M': [177.97, 178.82, 175.42, 185.71, 193.45, 194.99, 218.97, 223.98, 223, 219.73, 212.11, 193.23, 190.78, 188.29, 193.41, 194.87, 214.73, 229.82, 277.14, 281.02, 287.8, 302.73, 309.21, 293.2, 290.9, 312.47], '1Y': [199.22, 205.81, 210.45, 216.39, 216.64, 186.25, 191.38, 185.4, 192.97, 195.94, 205.98, 195.74, 184.01, 180.3, 184.44, 180.39, 177.05, 173.94, 180.84, 166.91, 159.36, 159.73, 157.32, 161.77, 182.6, 181.67, 177.56, 177.08, 173.49, 188.45, 189.12, 193.31, 215.55, 221.44, 226.16, 219.86, 212.11, 193.23, 190.78, 187.19, 190.33, 199.42, 216.71, 233.7, 269.5, 280.89, 287.8, 302.73, 309.21, 293.2, 290.9, 312.47] },
      velocityScore: { '1D': 0, '1W': -2.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$284B', pe: 53.5, revenueGrowth: 19, eps: 5.84, grossMargin: 57, dividendYield: 1.89,
      etfPresence: { SOXX: 3.34, PSI: false, XSD: 2.28, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.73, proScore: 1.37, coverage: 0.5,
      price: 1651.99, weeklyPrices: [1531.98, 1473.04, 1589.55, 1577.32, 1651.99], weeklyChange: 7.83, sortRank: 0, periodReturns: { '1M': 6.6, '6M': 74, '1Y': 133.8 },
      priceHistory: { '1W': [1531.98, 1473.04, 1589.55, 1577.32, 1651.99], '1M': [1550.02, 1486.33, 1468.11, 1553.27, 1561.25, 1589.81, 1662.98, 1620.17, 1633.17, 1566.21, 1542.39, 1624.99, 1689.89, 1652.6, 1481.05, 1559.18, 1531.98, 1473.04, 1589.55, 1577.32, 1651.99], '6M': [949.4, 945.16, 923.91, 959.08, 983.6, 1076.67, 1183.15, 1155.99, 1155.93, 1204.1, 1142.74, 1023.16, 1052.59, 1092.69, 1058.28, 1118.49, 1353.85, 1468.35, 1632.06, 1583.48, 1600.84, 1550.02, 1589.81, 1542.39, 1559.18, 1651.99], '1Y': [706.59, 716.58, 746.97, 751.14, 714.03, 720.01, 724.37, 802.78, 840.56, 844.8, 850.64, 827.56, 855.18, 877.66, 908.45, 915.87, 945.49, 968.25, 1028.67, 1086.36, 957.87, 954.71, 856.96, 908.61, 958.02, 979.02, 951.36, 943.55, 906.36, 959.09, 1009.54, 1063.74, 1124.15, 1229.82, 1171.47, 1190.06, 1142.74, 1023.16, 1052.59, 1068.85, 1053.01, 1180.03, 1372.23, 1490.86, 1587.57, 1573.3, 1600.84, 1550.02, 1589.81, 1542.39, 1559.18, 1651.99] },
      velocityScore: { '1D': -2.1, '1W': -1.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$81B', pe: 117.7, revenueGrowth: 26, eps: 14.04, grossMargin: 55, dividendYield: 0.51,
      etfPresence: { SOXX: 3.25, PSI: false, XSD: 2.21, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.73, proScore: 1.36, coverage: 0.5,
      price: 316.88, weeklyPrices: [297.41, 285.56, 302.55, 304.86, 316.88], weeklyChange: 6.55, sortRank: 0, periodReturns: { '1M': 8.7, '6M': 36.7, '1Y': 45.7 },
      priceHistory: { '1W': [297.41, 285.56, 302.55, 304.86, 316.88], '1M': [291.5, 291.68, 294.28, 310.15, 299.38, 316.47, 332.67, 329.24, 330.28, 321.35, 311.38, 323.62, 321.88, 322.22, 295.96, 301.14, 297.41, 285.56, 302.55, 304.86, 316.88], '6M': [231.83, 228.94, 219.98, 239.34, 240.81, 236.75, 233.5, 222.13, 242.19, 232.27, 227.01, 201.74, 190.86, 192.35, 196.92, 194.55, 204.37, 216.03, 244.04, 295.24, 294.75, 291.5, 316.47, 311.38, 301.14, 316.88], '1Y': [217.53, 218.51, 221.21, 230.42, 220.58, 224.71, 226.74, 208.47, 220.05, 229.27, 237.82, 228.2, 219.28, 221.89, 227.66, 224.91, 219.58, 216.11, 222.34, 212.96, 204.42, 202.86, 188.59, 191.02, 227.56, 230.78, 229.75, 225.98, 217.06, 237.89, 238.6, 232.48, 226.14, 224.32, 244.43, 231.16, 227.01, 201.74, 190.86, 191.37, 191.66, 197.08, 208, 221.34, 236.87, 290.76, 294.75, 291.5, 316.47, 311.38, 301.14, 316.88] },
      velocityScore: { '1D': -0.7, '1W': -5.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$80B', pe: 30.3, revenueGrowth: 12, eps: 10.46, grossMargin: 56, dividendYield: 1.33,
      etfPresence: { SOXX: 3.16, PSI: false, XSD: 2.29, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.61, proScore: 1.31, coverage: 0.5,
      price: 259, weeklyPrices: [234.32, 237.68, 264.76, 250.81, 259.00], weeklyChange: 10.53, sortRank: 0, periodReturns: { '1M': 50.4, '6M': 82.4, '1Y': 227.1 },
      priceHistory: { '1W': [234.32, 237.68, 264.76, 250.81, 259], '1M': [172.17, 156.27, 168.99, 182.98, 193.39, 218.41, 221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 259], '6M': [142.02, 149.94, 144.92, 141, 156.84, 135.1, 129.47, 98.06, 121.78, 124.06, 112.27, 109.83, 117.69, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 184.38, 188.51, 172.17, 218.41, 226.1, 222.27, 259], '1Y': [79.17, 91.92, 87.59, 97.59, 101.19, 98.41, 109.38, 110.29, 125.38, 106.3, 120.1, 124.77, 163.96, 164.44, 149.38, 144.91, 137.2, 129.75, 144.17, 162.18, 164.23, 158.5, 139.56, 154.18, 189.19, 157.98, 140.34, 147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 112.27, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 188.51, 172.17, 218.41, 226.1, 222.27, 259] },
      velocityScore: { '1D': -6.4, '1W': 12.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$48B', pe: 141.5, revenueGrowth: 157, eps: 1.83, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 1.97, PSI: false, XSD: 3.26, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 2.6, proScore: 1.3, coverage: 0.5,
      price: 125.29, weeklyPrices: [117.00, 110.17, 115.96, 116.79, 125.29], weeklyChange: 7.09, sortRank: 0, periodReturns: { '1M': 10.8, '6M': 127.4, '1Y': 132.5 },
      priceHistory: { '1W': [117, 110.17, 115.96, 116.79, 125.29], '1M': [113.11, 109.43, 106.02, 110.21, 109.61, 116.2, 127, 124.89, 123.77, 120.62, 120.92, 128.64, 133.93, 131.82, 117.26, 120.9, 117, 110.17, 115.96, 116.79, 125.29], '6M': [55.09, 56.37, 54.24, 61.89, 60.58, 63.07, 62.2, 63.1, 70.63, 69.11, 66.48, 56.87, 58.55, 59.29, 60.87, 62.19, 68.65, 83.01, 98.4, 103.03, 103.2, 113.11, 116.2, 120.92, 120.9, 125.29], '1Y': [53.88, 54.21, 53.6, 57.77, 59.52, 59.61, 58.38, 47.24, 50.01, 49.77, 50.99, 47.79, 48.13, 49.8, 50.94, 48.35, 48.17, 49.54, 55.08, 51.8, 48.28, 48.43, 45.56, 48.31, 57.15, 55.1, 54.56, 55.69, 54.15, 60.89, 60.28, 61.98, 59.89, 65.2, 72.21, 69.47, 66.48, 56.87, 58.55, 59.26, 58.35, 63.49, 71.02, 85.56, 98.04, 102.04, 103.2, 113.11, 116.2, 120.92, 120.9, 125.29] },
      velocityScore: { '1D': -0.8, '1W': -7.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$49B', pe: 92.8, revenueGrowth: 5, eps: 1.35, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.23, PSI: false, XSD: 2.96, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.32, proScore: 1.16, coverage: 0.5,
      price: 100.48, weeklyPrices: [91.47, 87.91, 92.94, 95.24, 100.48], weeklyChange: 9.85, sortRank: 0, periodReturns: { '1M': 7.1, '6M': 49.6, '1Y': 47.4 },
      priceHistory: { '1W': [91.47, 87.91, 92.94, 95.24, 100.48], '1M': [93.85, 92.76, 91.81, 94.02, 91.11, 93.43, 98.05, 96.85, 96.04, 94.65, 91.52, 96.96, 96.55, 96.3, 88.34, 91.37, 91.47, 87.91, 92.94, 95.24, 100.48], '6M': [67.18, 66.24, 64.68, 73.94, 74.68, 75.47, 79.36, 78.04, 78.92, 77.73, 74.64, 64.77, 61.94, 63.29, 64.2, 65.6, 71.56, 78.76, 89.44, 93.95, 99.09, 93.85, 93.43, 91.52, 91.37, 100.48], '1Y': [68.19, 70.43, 71.68, 74.68, 74.43, 70.25, 70.68, 67.13, 64.5, 64.71, 67.62, 63.28, 64.74, 65.78, 65.85, 64.11, 64.96, 64.6, 67.52, 63.64, 59.5, 54.71, 50.87, 51.83, 63.61, 67.9, 65.9, 65.35, 63.72, 73.53, 74.45, 74.71, 75.92, 76.01, 78.56, 76.6, 74.64, 64.77, 61.94, 62.97, 62, 67.22, 73.55, 80.39, 86.84, 95.3, 99.09, 93.85, 93.43, 91.52, 91.37, 100.48] },
      velocityScore: { '1D': 0.9, '1W': -0.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$54B', pe: 456.7, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 1.91,
      etfPresence: { SOXX: 2.46, PSI: false, XSD: 2.18, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.9, proScore: 0.95, coverage: 0.5,
      price: 388.32, weeklyPrices: [358.72, 354.40, 374.76, 379.87, 388.32], weeklyChange: 8.25, sortRank: 0, periodReturns: { '1M': 3.4, '6M': 121.5, '1Y': 196 },
      priceHistory: { '1W': [358.72, 354.4, 374.76, 379.87, 388.32], '1M': [375.6, 356.25, 358.98, 375.71, 380.45, 385.98, 409.68, 400.66, 391.09, 364.64, 353.79, 382.35, 390.34, 382.74, 345.4, 361.86, 358.72, 354.4, 374.76, 379.87, 388.32], '6M': [175.29, 175.19, 174.87, 170.62, 215.01, 224.29, 227.73, 227.8, 238.99, 243.59, 248.12, 207.51, 217.8, 224.54, 228.5, 238.3, 258.11, 276.97, 287.64, 284.18, 359.88, 375.6, 385.98, 353.79, 361.86, 388.32], '1Y': [131.18, 139.84, 137.38, 139.85, 137.76, 137.19, 140.02, 137.28, 125.45, 121, 128.33, 130.17, 131.7, 131.87, 126.66, 126.56, 127.97, 131.54, 139.41, 147.88, 144.13, 169.98, 158.22, 165.88, 183.46, 186.23, 175.69, 176.28, 171.28, 167.66, 218.93, 219.26, 219.06, 235.87, 244.16, 245.53, 248.12, 207.51, 217.8, 218.96, 225.44, 233.04, 263.63, 281.08, 279.44, 291.72, 359.88, 375.6, 385.98, 353.79, 361.86, 388.32] },
      velocityScore: { '1D': 0, '1W': 2.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$30B', pe: 164.5, revenueGrowth: 23, eps: 2.36, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.24, PSI: false, XSD: 2.56, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RMBS', name: 'RAMBUS INC', easyScore: 2, avgWeight: 1.57, proScore: 0.78, coverage: 0.5,
      price: 145.1, weeklyPrices: [146.84, 138.12, 144.47, 146.56, 145.10], weeklyChange: -1.18, sortRank: 0, periodReturns: { '1M': 14.2, '6M': 52, '1Y': 140.4 },
      priceHistory: { '1W': [146.84, 138.12, 144.47, 146.56, 145.1], '1M': [127.05, 123.76, 122.03, 133.56, 141.82, 142.98, 157.23, 148.66, 148.02, 145.46, 147.48, 166.78, 170.66, 169.35, 145.31, 152.03, 146.84, 138.12, 144.47, 146.56, 145.1], '6M': [95.45, 95.26, 94.69, 91.65, 100.62, 124.77, 121.6, 98.1, 95.8, 102.64, 99.66, 88.12, 94.01, 94.62, 91.44, 93.03, 110.44, 126.93, 158.4, 111.93, 129.25, 127.05, 142.98, 147.48, 152.03, 145.1], '1Y': [60.37, 62.3, 64.14, 64.79, 66.79, 65.95, 73.15, 73.79, 76.44, 69.78, 75.03, 73.67, 77.11, 97.52, 100.73, 103.14, 96.84, 94.85, 97.51, 103.72, 100.32, 104.93, 87.7, 92.45, 98.03, 106.84, 94.69, 94.19, 91.89, 91.34, 103.07, 115.31, 113.83, 107.1, 101.95, 95.27, 99.66, 88.12, 94.01, 91.7, 89.73, 92.22, 113.16, 126.87, 141.31, 111.5, 129.25, 127.05, 142.98, 147.48, 152.03, 145.1] },
      velocityScore: { '1D': 0, '1W': -6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$16B', pe: 69.1, revenueGrowth: 8, eps: 2.1, grossMargin: 80, dividendYield: null,
      etfPresence: { SOXX: 0.76, PSI: false, XSD: 2.38, DRAM: false },
      tonyNote: 'RAMBUS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 7, avgWeight: 4.26, proScore: 2.29, coverage: 0.538,
      price: 211.96, weeklyPrices: [208.19, 200.42, 204.87, 205.19, 211.96], weeklyChange: 1.81, sortRank: 0, periodReturns: { '1M': -5.9, '6M': 20.2, '1Y': 46.5 },
      priceHistory: { '1W': [208.19, 200.42, 204.87, 205.19, 211.96], '1M': [225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 214.75, 218.66, 205.1, 208.64, 208.19, 200.42, 204.87, 205.19, 211.96], '6M': [176.29, 183.69, 187.54, 189.11, 183.14, 184.84, 192.51, 171.88, 186.94, 189.82, 177.19, 177.82, 180.25, 178.56, 171.24, 177.39, 188.63, 201.68, 208.27, 198.45, 215.2, 225.32, 215.33, 224.36, 208.64, 211.96], '1Y': [144.69, 147.9, 153.3, 162.88, 171.37, 170.78, 175.51, 178.26, 183.16, 175.64, 181.77, 170.62, 177.33, 170.29, 176.97, 187.24, 185.04, 180.03, 181.16, 201.03, 198.69, 193.16, 181.36, 177.82, 179.59, 183.78, 177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 215.2, 225.32, 215.33, 224.36, 208.64, 211.96] },
      velocityScore: { '1D': -0.4, '1W': 0.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.1T', pe: 32.5, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.49,
      etfPresence: { PTF: 4.27, WCLD: false, IGV: false, FDTX: 4.62, GTEK: false, ARKK: 1.73, MARS: false, FRWD: 8.55, BCTK: 6.5, FWD: 2.02, CBSE: false, FCUS: false, WGMI: 2.13 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 6, avgWeight: 4.85, proScore: 2.24, coverage: 0.462,
      price: 1081.56, weeklyPrices: [935.89, 891.88, 995.87, 981.61, 1081.56], weeklyChange: 15.56, sortRank: 0, periodReturns: { '1M': 49.2, '6M': 355.4, '1Y': 802.5 },
      priceHistory: { '1W': [935.89, 891.88, 995.87, 981.61, 1081.56], '1M': [724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1081.56], '6M': [237.5, 276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 370.3, 426.13, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 1035.5, 949.28, 1081.56], '1Y': [119.84, 127.91, 120.89, 122.24, 116.43, 109.83, 111.96, 109.06, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 185.69, 187.06, 202.29, 221.91, 218.03, 241.11, 228.5, 224.53, 234.16, 263.71, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 746.81, 724.66, 751, 1035.5, 949.28, 1081.56] },
      velocityScore: { '1D': 1.4, '1W': -6.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 51, revenueGrowth: 196, eps: 21.2, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { PTF: 4.79, WCLD: false, IGV: false, FDTX: 9.36, GTEK: false, ARKK: false, MARS: false, FRWD: 4.91, BCTK: 4.79, FWD: 1.34, CBSE: false, FCUS: 3.94, WGMI: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 6, avgWeight: 4.09, proScore: 1.89, coverage: 0.462,
      price: 441.26, weeklyPrices: [427.92, 408.75, 421.07, 423.93, 441.26], weeklyChange: 3.12, sortRank: 0, periodReturns: { '1M': 9.1, '6M': 53.4, '1Y': 104.6 },
      priceHistory: { '1W': [427.92, 408.75, 421.07, 423.93, 441.26], '1M': [404.35, 395.95, 392.61, 401.62, 407.15, 404.52, 412.32, 422.73, 424.86, 418.45, 435.63, 446.69, 436.69, 444.92, 415.17, 426.8, 427.92, 408.75, 421.07, 423.93, 441.26], '6M': [287.74, 293.28, 299.58, 318.68, 327.11, 327.37, 339.55, 330.73, 368.1, 370.54, 374.58, 338.89, 338.31, 338.79, 326.11, 339.04, 370.6, 370.5, 402.46, 397.67, 411.68, 404.35, 404.52, 435.63, 426.8, 441.26], '1Y': [215.68, 220.09, 224.68, 231.84, 237.56, 240.33, 241.33, 232.47, 244.29, 232.7, 238.72, 231.39, 260.44, 262.79, 280.71, 288.47, 294.03, 295.94, 294.51, 301.53, 294.05, 291.17, 277.91, 284.68, 295.45, 310.14, 286.87, 296.95, 303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.04, 374.58, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 401.61, 411.68, 404.35, 404.52, 435.63, 426.8, 441.26] },
      velocityScore: { '1D': -1, '1W': 14.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 38, revenueGrowth: 35, eps: 11.62, grossMargin: 62, dividendYield: 0.9,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6, GTEK: false, ARKK: 1, MARS: false, FRWD: 5.83, BCTK: 8.59, FWD: false, CBSE: 2.52, FCUS: false, WGMI: 0.62 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 5, avgWeight: 4.17, proScore: 1.6, coverage: 0.385,
      price: 547.27, weeklyPrices: [475.51, 452.40, 488.45, 511.57, 547.27], weeklyChange: 15.09, sortRank: 0, periodReturns: { '1M': 29, '6M': 163.6, '1Y': 333 },
      priceHistory: { '1W': [475.51, 452.4, 488.45, 511.57, 547.27], '1M': [424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 542.52, 523.2, 466.38, 490.33, 475.51, 452.4, 488.45, 511.57, 547.27], '6M': [207.58, 214.95, 215.34, 210.02, 223.6, 253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 192.43, 193.39, 205.27, 203.77, 217.5, 245.04, 278.39, 347.81, 360.54, 455.19, 424.1, 467.51, 510.13, 490.33, 547.27], '1Y': [126.39, 138.43, 136.11, 138.41, 160.08, 158.65, 177.44, 174.31, 174.95, 166.55, 166.62, 162.13, 159.54, 159.16, 160.88, 164.01, 211.51, 218.09, 238.03, 258.01, 250.05, 237.52, 230.29, 206.13, 217.6, 221.42, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 455.19, 424.1, 467.51, 510.13, 490.33, 547.27] },
      velocityScore: { '1D': 0, '1W': -5.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$892B', pe: 181.2, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 5.06, MARS: false, FRWD: 6.98, BCTK: 3.76, FWD: 1.98, CBSE: false, FCUS: 3.05, WGMI: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 5, avgWeight: 3.41, proScore: 1.31, coverage: 0.385,
      price: 394.66, weeklyPrices: [392.16, 372.10, 385.57, 382.07, 394.66], weeklyChange: 0.64, sortRank: 0, periodReturns: { '1M': -7.2, '6M': 16.1, '1Y': 56.5 },
      priceHistory: { '1W': [392.16, 372.1, 385.57, 382.07, 394.66], '1M': [425.19, 420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 479.23, 418.91, 385.73, 396.6, 392.16, 372.1, 385.57, 382.07, 394.66], '6M': [339.81, 341.45, 349.85, 343.5, 339.89, 325.49, 330.73, 310.51, 331.17, 332.65, 319.55, 330.48, 322.16, 319.84, 309.42, 314.55, 371.55, 406.54, 422.76, 421.28, 430, 425.19, 414.14, 459.97, 396.6, 394.66], '1Y': [252.1, 263.77, 264.74, 277.9, 280.81, 283.69, 297.42, 292.93, 312.83, 294.91, 298.01, 302.39, 369.57, 346.17, 339.31, 333.39, 336.41, 344.13, 342.66, 372.97, 351.94, 351.96, 340.5, 385.03, 380.61, 412.97, 341.3, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 430, 425.19, 414.14, 459.97, 396.6, 394.66] },
      velocityScore: { '1D': 4.8, '1W': 0.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.9T', pe: 65.8, revenueGrowth: 48, eps: 6, grossMargin: 76, dividendYield: 0.68,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.79, GTEK: false, ARKK: 1.15, MARS: false, FRWD: 5.39, BCTK: 7.31, FWD: 2.43, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, avgWeight: 5.16, proScore: 1.59, coverage: 0.308,
      price: 996.37, weeklyPrices: [846.01, 815.99, 868.09, 931.04, 996.37], weeklyChange: 17.77, sortRank: 0, periodReturns: { '1M': 25.3, '6M': 248.9, '1Y': 660.4 },
      priceHistory: { '1W': [846.01, 815.99, 868.09, 931.04, 996.37], '1M': [795.47, 740.84, 733.35, 751.07, 810.46, 812.73, 845.76, 870.66, 880.72, 879.8, 921.26, 926.61, 940.69, 925.99, 847.47, 876.77, 846.01, 815.99, 868.09, 931.04, 996.37], '6M': [285.58, 282.85, 280.08, 308.26, 312.28, 346.53, 446.57, 405.45, 431.17, 411.11, 407.84, 352.8, 383.71, 434.6, 378.79, 429.36, 503.13, 547.75, 586.25, 726.93, 782.64, 795.47, 812.73, 921.26, 876.77, 996.37], '1Y': [131.04, 136.31, 145.04, 142.01, 147.12, 152.76, 152.68, 151.74, 155.59, 157.93, 165.24, 176.32, 193.04, 213.36, 223.7, 256.84, 225.01, 211.63, 214.57, 223, 250.38, 288, 253.86, 261.89, 258.67, 298.92, 288.13, 282.8, 275.39, 284.47, 320.32, 346.1, 407.69, 429.32, 425.99, 407.4, 407.84, 352.8, 383.71, 411.23, 380.07, 453.3, 513.28, 539.75, 595.86, 738.54, 782.64, 795.47, 812.73, 921.26, 876.77, 996.37] },
      velocityScore: { '1D': -2.5, '1W': -16.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$225B', pe: 94.7, revenueGrowth: 44, eps: 10.52, grossMargin: 42, dividendYield: 0.32,
      etfPresence: { PTF: 4.9, WCLD: false, IGV: false, FDTX: 4.04, GTEK: false, ARKK: false, MARS: false, FRWD: 7.62, BCTK: false, FWD: false, CBSE: false, FCUS: 4.06, WGMI: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 4, avgWeight: 4.66, proScore: 1.43, coverage: 0.308,
      price: 390.54, weeklyPrices: [327.16, 321.80, 362.52, 366.81, 390.54], weeklyChange: 19.37, sortRank: 0, periodReturns: { '1M': 37.2, '6M': 137.7, '1Y': 318.1 },
      priceHistory: { '1W': [327.16, 321.8, 362.52, 366.81, 390.54], '1M': [284.72, 277.96, 273.38, 292.09, 302.24, 305.35, 322.68, 318.93, 318, 318.18, 317.12, 334.41, 343.71, 336.41, 303.28, 324.45, 327.16, 321.8, 362.52, 366.81, 390.54], '6M': [164.3, 175.26, 173.78, 203.08, 208.79, 220.7, 248.17, 213.31, 231.29, 244.92, 233.89, 199.33, 212.2, 233.99, 211.62, 218.44, 263.66, 267.6, 267.78, 256.72, 294.05, 284.72, 305.35, 317.12, 324.45, 390.54], '1Y': [93.41, 95.63, 96.81, 99.81, 100.37, 97.1, 98.94, 96.68, 105.28, 100.33, 103.63, 97.74, 107.36, 121.9, 128.32, 142.79, 140.35, 138.31, 145.04, 155.62, 155.78, 159.18, 143.24, 151.93, 159.75, 168.26, 163.26, 175.16, 171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 242.27, 233.89, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 294.05, 284.72, 305.35, 317.12, 324.45, 390.54] },
      velocityScore: { '1D': 5.1, '1W': 30, '1M': null, '6M': null }, isNew: false,
      marketCap: '$488B', pe: 74, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.28,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 6.15, BCTK: 7.7, FWD: 1.81, CBSE: 2.99, FCUS: false, WGMI: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 4, avgWeight: 4.34, proScore: 1.34, coverage: 0.308,
      price: 646.35, weeklyPrices: [517.72, 490.09, 529.29, 562.93, 646.35], weeklyChange: 24.85, sortRank: 0, periodReturns: { '1M': 34.1, '6M': 275.7, '1Y': 1025.8 },
      priceHistory: { '1W': [517.72, 490.09, 529.29, 562.93, 646.35], '1M': [482.02, 458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 646.35], '6M': [172.04, 176.76, 176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 279.7, 245.25, 272.29, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 484.28, 546.2, 526.93, 646.35], '1Y': [57.41, 62.07, 63.84, 64.64, 66.53, 69.32, 70.61, 75.84, 75.91, 75.86, 79.71, 86, 95.02, 100.94, 109.69, 130.59, 119.93, 113.13, 121.41, 124.92, 152.18, 169.99, 152.86, 155.41, 155.59, 181.95, 174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 480, 482.02, 484.28, 546.2, 526.93, 646.35] },
      velocityScore: { '1D': -0.7, '1W': -5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$223B', pe: 38.7, revenueGrowth: 46, eps: 16.72, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { PTF: 4.86, WCLD: false, IGV: false, FDTX: 4, GTEK: false, ARKK: false, MARS: false, FRWD: 4.59, BCTK: false, FWD: false, CBSE: false, FCUS: 3.91, WGMI: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 4, avgWeight: 3.5, proScore: 1.08, coverage: 0.308,
      price: 246.33, weeklyPrices: [244.19, 238.00, 241.51, 238.55, 246.33], weeklyChange: 0.88, sortRank: 0, periodReturns: { '1M': -6.7, '6M': 10.7, '1Y': 14 },
      priceHistory: { '1W': [244.19, 238, 241.51, 238.55, 246.33], '1M': [264.14, 264.86, 259.34, 265.01, 268.46, 266.32, 265.29, 271.85, 274, 270.64, 261.26, 256.52, 250.02, 253.79, 246.03, 245.22, 244.19, 238, 241.51, 238.55, 246.33], '6M': [222.54, 228.43, 232.53, 241.56, 236.65, 234.34, 241.73, 222.69, 199.6, 210.11, 210, 213.21, 207.67, 208.76, 207.54, 209.77, 238.38, 250.56, 263.99, 268.26, 272.68, 264.14, 266.32, 261.26, 245.22, 246.33], '1Y': [216.1, 212.77, 220.46, 222.54, 223.19, 228.29, 231.01, 213.75, 221.47, 228.01, 228.71, 225.99, 230.33, 231.62, 220.21, 220.63, 221.78, 216.39, 222.03, 229.25, 249.32, 249.1, 222.55, 229.67, 232.38, 231.78, 222.56, 232.14, 230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 205.27, 210, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 272.05, 272.68, 264.14, 266.32, 261.26, 245.22, 246.33] },
      velocityScore: { '1D': -3.6, '1W': -11.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 32.7, revenueGrowth: 17, eps: 7.54, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.01, GTEK: false, ARKK: 2.51, MARS: false, FRWD: 3, BCTK: 4.5, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 2.98, proScore: 0.92, coverage: 0.308,
      price: 112.34, weeklyPrices: [110.42, 108.20, 110.47, 108.24, 112.34], weeklyChange: 1.74, sortRank: 0, periodReturns: { '1M': 12, '6M': -29.7, '1Y': 3.7 },
      priceHistory: { '1W': [110.42, 108.2, 110.47, 108.24, 112.34], '1M': [100.28, 102.39, 101.01, 105.01, 104.86, 103, 104.9, 106.6, 115.03, 118.71, 124.12, 117.01, 112.94, 116.04, 109.54, 110.78, 110.42, 108.2, 110.47, 108.24, 112.34], '6M': [159.85, 169.67, 163.74, 166.74, 157.51, 137.64, 143.64, 111.24, 110.66, 126.2, 120.73, 130.2, 122.96, 122.37, 115.43, 118.25, 110.79, 131.15, 125.83, 127.67, 110.41, 100.28, 103, 124.12, 110.78, 112.34], '1Y': [108.37, 114.42, 112.67, 114.32, 120, 122.21, 124.85, 127, 149.3, 139.25, 140.85, 140.22, 142.2, 147.87, 148.83, 149.57, 161.28, 152.88, 162.64, 178.96, 160.94, 158.94, 140.45, 157.37, 160, 168.42, 163.14, 169.53, 160.97, 168.28, 157.99, 137.89, 131.23, 112.05, 112.7, 117.28, 120.73, 130.2, 122.96, 116.78, 111.85, 118.8, 114.97, 135.14, 124.23, 127.55, 110.41, 100.28, 103, 124.12, 110.78, 112.34] },
      velocityScore: { '1D': -2.1, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$146B', pe: 110.1, revenueGrowth: 34, eps: 1.02, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.89, GTEK: false, ARKK: 4.34, MARS: false, FRWD: 1.96, BCTK: 2.72, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 13 Broad Tech ETFs (31% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASML', name: 'ASML Holding', easyScore: 4, avgWeight: 2.89, proScore: 0.89, coverage: 0.308,
      price: 1906.38, weeklyPrices: [1777.77, 1734.19, 1899.48, 1863.55, 1906.38], weeklyChange: 7.23, sortRank: 0, periodReturns: { '1M': 26.9, '6M': 75.2, '1Y': 145.9 },
      priceHistory: { '1W': [1777.77, 1734.19, 1899.48, 1863.55, 1906.38], '1M': [1501.81, 1472.39, 1459.44, 1550.13, 1592, 1632.9, 1632.03, 1597.87, 1605.77, 1612.76, 1628.57, 1705.37, 1726.36, 1757.47, 1641.74, 1749.04, 1777.77, 1734.19, 1899.48, 1863.55, 1906.38], '6M': [1087.82, 1056.98, 1072.14, 1228.47, 1263.72, 1395, 1455.16, 1350.16, 1406.87, 1469.59, 1450.56, 1292.8, 1345.69, 1366.39, 1329.5, 1317.23, 1478.28, 1459.8, 1457.7, 1427.02, 1592.02, 1501.81, 1632.9, 1628.57, 1749.04, 1906.38], '1Y': [775.23, 813.36, 790.47, 799.83, 754.45, 716.93, 718.49, 689.63, 741.79, 743.61, 763.2, 736.82, 793.14, 872.27, 946.94, 1003.27, 1002.3, 983.18, 1025.02, 1052.48, 1030.14, 1022.42, 1004.06, 1003.22, 1140.92, 1119.32, 1076.05, 1061.84, 1069.86, 1194.32, 1331.6, 1389.04, 1423, 1413.01, 1406.61, 1485.99, 1450.56, 1292.8, 1345.69, 1317.25, 1302.47, 1304.01, 1500.2, 1476.5, 1432.44, 1386.21, 1592.02, 1501.81, 1632.9, 1628.57, 1749.04, 1906.38] },
      velocityScore: { '1D': 25.4, '1W': 34.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$735B', pe: 63.9, revenueGrowth: 13, eps: 29.82, grossMargin: 53, dividendYield: 0.47,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.25, BCTK: 2.42, FWD: 1.58, CBSE: 2.31, FCUS: false, WGMI: false },
      tonyNote: 'ASML Holding appears in 4 of 13 Broad Tech ETFs (31% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NET', name: 'Cloudflare', easyScore: 4, avgWeight: 1.79, proScore: 0.55, coverage: 0.308,
      price: 236.42, weeklyPrices: [236.13, 219.67, 227.44, 228.48, 236.42], weeklyChange: 0.12, sortRank: 0, periodReturns: { '1M': 19.7, '6M': 20.2, '1Y': 31.9 },
      priceHistory: { '1W': [236.13, 219.67, 227.44, 228.48, 236.42], '1M': [197.56, 201.75, 206.73, 210.13, 212.65, 216.17, 217.54, 209.22, 228.11, 241.82, 270.82, 272.66, 265.33, 268.64, 250.11, 247.79, 236.13, 219.67, 227.44, 228.48, 236.42], '6M': [196.7, 202.06, 199.62, 202.81, 188.39, 173.3, 180.39, 163.05, 185.17, 177.14, 172.19, 195.19, 212.45, 221.36, 210.13, 211.69, 166.99, 200.99, 207.07, 217.5, 196.13, 197.56, 216.17, 270.82, 247.79, 236.42], '1Y': [179.27, 186.43, 184.95, 193.49, 189.81, 189.15, 199.43, 207.81, 202.33, 196.51, 198.55, 205.71, 222.97, 213.88, 217.57, 217.06, 217.39, 217.55, 212.98, 223.99, 232.91, 234.95, 196.53, 197.49, 204.35, 213.46, 197.53, 202.08, 197.15, 186.96, 184.14, 173.44, 177.35, 173.21, 195.85, 160.19, 172.19, 195.19, 212.45, 215.42, 203.02, 211.78, 184.02, 204.81, 212.36, 224.17, 196.13, 197.56, 216.17, 270.82, 247.79, 236.42] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$84B', pe: null, revenueGrowth: 34, eps: -0.25, grossMargin: 73, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 1.78, IGV: false, FDTX: 2.05, GTEK: 2.05, ARKK: false, MARS: false, FRWD: false, BCTK: 1.28, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Cloudflare appears in 4 of 13 Broad Tech ETFs (31% coverage) with average weight 1.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 3, avgWeight: 4.91, proScore: 1.13, coverage: 0.231,
      price: 399.35, weeklyPrices: [403.41, 397.36, 390.34, 390.74, 399.35], weeklyChange: -1.01, sortRank: 0, periodReturns: { '1M': -5.4, '6M': -15.9, '1Y': -16.7 },
      priceHistory: { '1W': [403.41, 397.36, 390.34, 390.74, 399.35], '1M': [421.92, 423.54, 417.42, 421.06, 419.09, 418.57, 416.03, 412.67, 426.99, 450.24, 460.52, 441.31, 427.34, 428.05, 416.67, 411.74, 403.41, 397.36, 390.34, 390.74, 399.35], '6M': [474.82, 484.92, 487.48, 483.47, 459.38, 451.14, 433.5, 393.67, 401.84, 397.23, 392.74, 408.96, 395.55, 389.02, 365.97, 373.46, 370.87, 422.79, 424.62, 414.44, 415.12, 421.92, 418.57, 460.52, 411.74, 399.35], '1Y': [479.14, 490.11, 492.05, 503.51, 505.62, 505.87, 512.57, 527.75, 529.24, 509.77, 502.04, 505.35, 500.37, 510.02, 510.15, 519.71, 523.98, 513.57, 517.66, 542.07, 514.33, 508.68, 493.79, 476.99, 477.73, 478.56, 476.39, 486.85, 483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 384.47, 392.74, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 413.62, 415.12, 421.92, 418.57, 460.52, 411.74, 399.35] },
      velocityScore: { '1D': -4.2, '1W': -6.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.0T', pe: 23.8, revenueGrowth: 18, eps: 16.8, grossMargin: 68, dividendYield: 0.93,
      etfPresence: { PTF: false, WCLD: false, IGV: 7.78, FDTX: 3.79, GTEK: false, ARKK: false, MARS: false, FRWD: 3.15, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 3, avgWeight: 4.9, proScore: 1.13, coverage: 0.231,
      price: 283.56, weeklyPrices: [260.52, 263.22, 279.53, 279.62, 283.56], weeklyChange: 8.85, sortRank: 0, periodReturns: { '1M': 16.8, '6M': 52.6, '1Y': 43.1 },
      priceHistory: { '1W': [260.52, 263.22, 279.53, 279.62, 283.56], '1M': [242.83, 247.55, 240.13, 246.66, 252.92, 260.58, 256.75, 248.47, 257.77, 281.69, 300.48, 297.18, 280.43, 279.25, 272.05, 266.33, 260.52, 263.22, 279.53, 279.62, 283.56], '6M': [185.88, 189.49, 186.85, 193.9, 190.93, 182.27, 176.2, 154.77, 162.81, 148.7, 148.92, 165.05, 167.02, 169.74, 156.36, 163.21, 155.73, 167.85, 178.54, 181.08, 207.88, 242.83, 260.58, 300.48, 266.33, 283.56], '1Y': [198.11, 201.69, 197.58, 206.06, 192.59, 199.22, 193.84, 169.09, 175.4, 181.56, 184.23, 191.53, 197.33, 203.12, 200.7, 206.8, 211.04, 207.56, 214.4, 221.38, 214.52, 218.27, 201, 186.27, 193.63, 192.96, 187.09, 188.12, 184.2, 190.8, 187.73, 180.18, 176.97, 159.32, 166.95, 144.14, 148.92, 165.05, 167.02, 162.95, 147.02, 161.95, 162.51, 169.56, 182.9, 184.56, 207.88, 242.83, 260.58, 300.48, 266.33, 283.56] },
      velocityScore: { '1D': 1.8, '1W': 5.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$231B', pe: 246.6, revenueGrowth: 31, eps: 1.15, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.6, IGV: 8.43, FDTX: 3.67, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 3, avgWeight: 4.19, proScore: 0.97, coverage: 0.231,
      price: 133.72, weeklyPrices: [132.07, 130.21, 131.08, 127.99, 133.72], weeklyChange: 1.25, sortRank: 0, periodReturns: { '1M': -0.2, '6M': -27, '1Y': -5.4 },
      priceHistory: { '1W': [132.07, 130.21, 131.08, 127.99, 133.72], '1M': [133.99, 135.14, 135.26, 137.15, 137.41, 136.88, 136.6, 132.51, 143.34, 156.54, 160.65, 152.17, 142.2, 141.7, 135.53, 136.47, 132.07, 130.21, 131.08, 127.99, 133.72], '6M': [183.25, 193.98, 180.84, 181.68, 178.4, 165.9, 151.86, 130.01, 129.13, 135.24, 137.19, 157.16, 150.95, 155.68, 147.56, 148.46, 128.06, 146.39, 143.09, 144.07, 137.8, 133.99, 136.88, 160.65, 136.47, 133.72], '1Y': [141.41, 143.23, 130.68, 143.13, 150.91, 154.63, 156.24, 173.27, 186.97, 157.75, 160.87, 154.9, 166.74, 168.33, 179.56, 184.95, 182.17, 179.74, 181.51, 189.6, 190.74, 190.96, 167.33, 163.55, 176.08, 187.91, 187.75, 194.13, 177.75, 176.86, 177.07, 169.6, 146.59, 135.9, 131.41, 130.6, 137.19, 157.16, 150.95, 150.68, 143.06, 147.93, 132.37, 145.89, 143.1, 146.03, 137.8, 133.99, 136.88, 160.65, 136.47, 133.72] },
      velocityScore: { '1D': -2, '1W': -1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$321B', pe: 148.6, revenueGrowth: 85, eps: 0.9, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 6.81, FDTX: 2.87, GTEK: false, ARKK: 2.9, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 3, avgWeight: 3.77, proScore: 0.87, coverage: 0.231,
      price: 369.26, weeklyPrices: [362.29, 353.32, 356.56, 358.16, 369.26], weeklyChange: 1.92, sortRank: 0, periodReturns: { '1M': -6.1, '6M': 19.4, '1Y': 107.5 },
      priceHistory: { '1W': [362.29, 353.32, 356.56, 358.16, 369.26], '1M': [393.32, 393.11, 384.9, 384.9, 383.47, 379.38, 384.84, 384.83, 386.12, 376.43, 372.58, 358.39, 355.68, 369.27, 365.76, 361.17, 362.29, 353.32, 356.56, 358.16, 369.26], '6M': [309.32, 311.33, 314.55, 322.43, 336.31, 330.84, 338.66, 331.33, 309.37, 314.9, 311.43, 298.3, 301.46, 305.73, 280.74, 294.46, 315.72, 339.4, 342.32, 383.22, 397.05, 393.32, 379.38, 372.58, 361.17, 369.26], '1Y': [177.94, 167.74, 176.91, 177.66, 183.77, 191.51, 196.43, 195.32, 204.16, 202.49, 207.95, 231.1, 239.56, 249.85, 247.83, 245.54, 247.13, 246.19, 251.34, 268.43, 278.06, 291.74, 284.96, 323.64, 320.62, 321, 307.73, 315.68, 313.8, 326.01, 333.16, 328.43, 338.53, 323.1, 306.02, 311.69, 311.43, 298.3, 301.46, 298.79, 273.76, 297.66, 319.21, 335.4, 348.52, 379.64, 397.05, 393.32, 379.38, 372.58, 361.17, 369.26] },
      velocityScore: { '1D': -2.2, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.5T', pe: 28.2, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.66, GTEK: false, ARKK: 1.91, MARS: false, FRWD: false, BCTK: 5.74, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Alphabet Inc Class C appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRWD', name: 'CrowdStrike', easyScore: 3, avgWeight: 3.4, proScore: 0.79, coverage: 0.231,
      price: 693.82, weeklyPrices: [644.93, 647.74, 691.53, 682.80, 693.82], weeklyChange: 7.58, sortRank: 0, periodReturns: { '1M': 16.8, '6M': 42.3, '1Y': 44.7 },
      priceHistory: { '1W': [644.93, 647.74, 691.53, 682.8, 693.82], '1M': [594.08, 618.83, 616.88, 650.11, 648.23, 663.46, 671.55, 645.36, 671, 731, 782.17, 768.95, 747.61, 719.09, 671.02, 658.79, 644.93, 647.74, 691.53, 682.8, 693.82], '6M': [487.47, 483.14, 475.63, 478.91, 460.7, 453.77, 444.62, 377.16, 411.54, 388.6, 371.98, 428.99, 441.78, 428.18, 392.62, 399.12, 379.02, 423.95, 448.13, 455.64, 527.77, 594.08, 663.46, 782.17, 658.79, 693.82], '1Y': [479.39, 485.38, 492.07, 513.51, 470.45, 461.52, 465.51, 441.75, 435.8, 418.6, 417.6, 413.2, 424.87, 445.5, 476.33, 499.96, 484.62, 488.94, 503.95, 546.94, 533.92, 556.73, 513.67, 512.34, 524.17, 519.54, 488.53, 478.84, 468.76, 463.87, 455, 452.49, 441.4, 395.5, 429.64, 350.33, 371.98, 428.99, 441.78, 409, 369.58, 398.61, 402.24, 433.15, 454.61, 469.24, 527.77, 594.08, 663.46, 782.17, 658.79, 693.82] },
      velocityScore: { '1D': 1.3, '1W': 6.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$177B', pe: null, revenueGrowth: 26, eps: -0.14, grossMargin: 75, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.47, IGV: 6.5, FDTX: 1.24, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'CrowdStrike appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 3.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'COHR', name: 'Coherent Corp', easyScore: 3, avgWeight: 3.32, proScore: 0.77, coverage: 0.231,
      price: 412.23, weeklyPrices: [355.94, 354.77, 363.58, 385.03, 412.23], weeklyChange: 15.81, sortRank: 0, periodReturns: { '1M': 7.8, '6M': 131, '1Y': 410.4 },
      priceHistory: { '1W': [355.94, 354.77, 363.58, 385.03, 412.23], '1M': [382.45, 362.83, 353.63, 358.5, 378, 377.57, 381.35, 380.18, 376.95, 361.47, 362.9, 426.89, 417.43, 421.9, 376.99, 401.93, 355.94, 354.77, 363.58, 385.03, 412.23], '6M': [178.45, 190.98, 186.81, 191.62, 184.11, 202.72, 215.86, 209.24, 216.1, 248.18, 258.93, 235.72, 242.76, 275.57, 243.29, 258.16, 307.5, 345.02, 336.09, 329.5, 335.26, 382.45, 377.57, 362.9, 401.93, 412.23], '1Y': [80.76, 80.96, 86.64, 91.25, 97.82, 98.43, 106.98, 105.6, 116.56, 87.76, 91.58, 88.47, 103.49, 103.41, 106.52, 114.65, 113.56, 109.37, 120.79, 134.24, 128.7, 158.01, 138.15, 148.85, 170.96, 197.45, 175.2, 191.87, 184.57, 173.15, 195.96, 196.94, 212.18, 227.68, 217.23, 248.89, 258.93, 235.72, 242.76, 253.63, 243.48, 253.22, 307.93, 347.51, 321.53, 329.89, 335.26, 382.45, 377.57, 362.9, 401.93, 412.23] },
      velocityScore: { '1D': 1.3, '1W': -3.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$81B', pe: 194.4, revenueGrowth: 21, eps: 2.12, grossMargin: 37, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.75, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 3.72, FWD: false, CBSE: 2.48, FCUS: false, WGMI: false },
      tonyNote: 'Coherent Corp appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 3.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CDNS', name: 'CADENCE DESIGN SYSTEMS INC', easyScore: 3, avgWeight: 2.81, proScore: 0.65, coverage: 0.231,
      price: 395.34, weeklyPrices: [390.90, 385.13, 383.74, 384.96, 395.34], weeklyChange: 1.14, sortRank: 0, periodReturns: { '1M': 13.9, '6M': 24.2, '1Y': 31.4 },
      priceHistory: { '1W': [390.9, 385.13, 383.74, 384.96, 395.34], '1M': [347.24, 345.99, 338.12, 350.89, 358.46, 373.59, 381.75, 374.05, 373.85, 374.93, 414.16, 416.39, 408, 411.68, 376.19, 394.24, 390.9, 385.13, 383.74, 384.96, 395.34], '6M': [318.43, 317.57, 315.6, 320.54, 313.17, 317.09, 302.67, 270.14, 288.33, 296.28, 301.4, 296.94, 287.03, 287.4, 280.62, 278.72, 265.66, 311.03, 332.89, 340.94, 362.7, 347.24, 373.59, 414.16, 394.24, 395.34], '1Y': [300.81, 296.8, 309.46, 322.91, 314.58, 326.46, 366.26, 360.5, 353.61, 346.88, 344.03, 347.32, 338.53, 347.27, 356.96, 351.97, 345.48, 325.75, 333.45, 341.3, 333.22, 318.51, 303.21, 303.66, 336.11, 338.06, 319.53, 316.93, 312.58, 318.8, 320.6, 318.32, 296.36, 283.52, 299.46, 279.8, 301.4, 296.94, 287.03, 283.9, 271.77, 279.39, 288.2, 318.5, 336.54, 349.51, 362.7, 347.24, 373.59, 414.16, 394.24, 395.34] },
      velocityScore: { '1D': -3, '1W': 3.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$109B', pe: 92.6, revenueGrowth: 19, eps: 4.27, grossMargin: 86, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 3.96, FDTX: false, GTEK: 2.52, ARKK: false, MARS: false, FRWD: 1.94, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'CADENCE DESIGN SYSTEMS INC appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DDOG', name: 'DDOG', easyScore: 3, avgWeight: 2.7, proScore: 0.62, coverage: 0.231,
      price: 235.84, weeklyPrices: [227.34, 227.63, 234.24, 229.90, 235.84], weeklyChange: 3.74, sortRank: 0, periodReturns: { '1M': 13.4, '6M': 66, '1Y': 93.4 },
      priceHistory: { '1W': [227.34, 227.63, 234.24, 229.9, 235.84], '1M': [207.98, 208.82, 215.15, 212.24, 218.04, 222.32, 223.65, 221.81, 225.24, 247.35, 277.49, 269.13, 250.33, 243.6, 234.11, 231.68, 227.34, 227.63, 234.24, 229.9, 235.84], '6M': [142.05, 141.84, 137.48, 141.45, 122.41, 131.25, 128.18, 106.73, 126.13, 115.66, 111.96, 125.75, 124.52, 129.94, 124.3, 120.36, 105.37, 126.61, 129.48, 140.53, 200.16, 207.98, 222.32, 277.49, 231.68, 235.84], '1Y': [121.93, 130.83, 132.33, 142.75, 139.36, 144, 150.27, 132.94, 128.96, 128.99, 126.31, 132.6, 139.13, 134.23, 136.57, 152.7, 154.52, 160.88, 156.25, 157.27, 157.51, 197.86, 176.46, 158.99, 155.83, 151.2, 140.05, 141.23, 135.99, 130.68, 120.86, 130.13, 129.32, 111.69, 125.2, 102.61, 111.96, 125.75, 124.52, 125.08, 114.48, 116.5, 110.08, 129.74, 132.66, 146.69, 200.16, 207.98, 222.32, 277.49, 231.68, 235.84] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$84B', pe: 604.7, revenueGrowth: 32, eps: 0.39, grossMargin: 80, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.81, IGV: 2.85, FDTX: 2.44, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'DDOG appears in 3 of 13 Broad Tech ETFs (23% coverage) with average weight 2.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 3, avgWeight: 5.4, proScore: 3.24, coverage: 0.6,
      price: 303.39, weeklyPrices: [283.51, 262.34, 290.50, 294.75, 303.39], weeklyChange: 7.01, sortRank: 0, periodReturns: { '1M': 3.7, '6M': 177.5, '1Y': 366.4 },
      priceHistory: { '1W': [283.51, 262.34, 290.5, 294.75, 303.39], '1M': [292.65, 266.8, 261.58, 271.05, 270.75, 279.22, 291.97, 295.94, 288.9, 284.42, 288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75, 303.39], '6M': [109.31, 112.18, 109.16, 118.62, 133.76, 142.29, 152.31, 179.6, 197.63, 182.27, 174.53, 161.22, 167.57, 175.13, 174.8, 182.6, 230.94, 241.01, 252.76, 275.33, 309.39, 292.65, 279.22, 288.12, 293.6, 303.39], '1Y': [65.05, 62.82, 70.01, 70.64, 72.53, 78.32, 77.77, 78.75, 90.06, 84.7, 91.08, 85.72, 92.33, 97.11, 97.88, 105.74, 104.42, 105.73, 116.11, 128.09, 126.71, 121.07, 107.22, 104.18, 107.83, 119.95, 110.88, 112.88, 106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 181.38, 174.53, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 269.95, 309.39, 292.65, 279.22, 288.12, 293.6, 303.39] },
      velocityScore: { '1D': -2.1, '1W': 23.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 59.1, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { POW: 6.73, VOLT: 7.59, PBD: false, PBW: 1.88, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 3, avgWeight: 4.92, proScore: 2.95, coverage: 0.6,
      price: 732.32, weeklyPrices: [691.95, 650.92, 683.29, 707.74, 732.32], weeklyChange: 5.83, sortRank: 0, periodReturns: { '1M': -4.9, '6M': 68, '1Y': 102.4 },
      priceHistory: { '1W': [691.95, 650.92, 683.29, 707.74, 732.32], '1M': [769.99, 723.03, 714.13, 709.93, 716.91, 723.44, 742.18, 733.62, 730.1, 711.73, 687.48, 706.06, 715.67, 719.17, 695.11, 693.81, 691.95, 650.92, 683.29, 707.74, 732.32], '6M': [435.87, 433.03, 428.81, 436.89, 437.07, 468.78, 483.43, 477.72, 515.88, 552.66, 563.08, 540.19, 559.02, 577.95, 545.64, 560.63, 585.36, 601.88, 624.84, 742.21, 745, 769.99, 723.44, 687.48, 693.81, 732.32], '1Y': [361.8, 372.26, 372.29, 382.12, 389.12, 405.11, 410.99, 389.12, 391.57, 379.27, 383.92, 374.41, 390.17, 376.01, 402.87, 420.65, 421.51, 431.6, 437.43, 439.57, 438.66, 448.91, 439.29, 450.14, 456.02, 462.21, 438.49, 435.2, 422.06, 413.17, 447.64, 468.76, 474.63, 508.11, 524.08, 549.11, 563.08, 540.19, 559.02, 555.39, 549.98, 554.38, 595.84, 604.97, 637.28, 757.34, 745, 769.99, 723.44, 687.48, 693.81, 732.32] },
      velocityScore: { '1D': 2.1, '1W': 59.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$110B', pe: 100.5, revenueGrowth: 26, eps: 7.29, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.85, VOLT: 5.5, PBD: false, PBW: false, IVEP: 4.41 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 3, avgWeight: 4.36, proScore: 2.62, coverage: 0.6,
      price: 410.86, weeklyPrices: [401.72, 375.46, 393.64, 391.39, 410.86], weeklyChange: 2.28, sortRank: 0, periodReturns: { '1M': 2.9, '6M': 23.3, '1Y': 21.6 },
      priceHistory: { '1W': [401.72, 375.46, 393.64, 391.39, 410.86], '1M': [399.44, 381.87, 371.88, 379.69, 381.51, 391.35, 403.13, 406.37, 401.94, 400.6, 400.08, 417.62, 421.21, 418.61, 395.94, 403.14, 401.72, 375.46, 393.64, 391.39, 410.86], '6M': [333.21, 320.39, 320.86, 322.67, 331.14, 334.04, 354.37, 354.67, 390.33, 373.38, 375.92, 347.75, 355.4, 360.23, 357.1, 361.1, 403, 406.21, 423.92, 425.55, 401.51, 399.44, 391.35, 400.08, 403.14, 410.86], '1Y': [338.01, 343.26, 355.04, 359.78, 362.89, 380.24, 390.01, 356.45, 363.3, 349, 352.02, 342.99, 362.25, 363.35, 372.21, 373.84, 370.94, 374.35, 373.46, 376.01, 377.72, 367.91, 338.29, 336.65, 335.57, 353.45, 329.93, 322.81, 318.51, 320.58, 333.46, 331.22, 351.42, 373.82, 389.25, 362.05, 375.92, 347.75, 355.4, 356.8, 357.36, 363.89, 403.36, 407.57, 416.77, 422.44, 401.51, 399.44, 391.35, 400.08, 403.14, 410.86] },
      velocityScore: { '1D': -1.9, '1W': 45.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$160B', pe: 40.2, revenueGrowth: 17, eps: 10.22, grossMargin: 37, dividendYield: 1.12,
      etfPresence: { POW: 3.99, VOLT: 5.21, PBD: false, PBW: false, IVEP: 3.88 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 3, avgWeight: 3.66, proScore: 2.19, coverage: 0.6,
      price: 979.63, weeklyPrices: [920.15, 867.09, 906.79, 940.66, 979.63], weeklyChange: 6.46, sortRank: 0, periodReturns: { '1M': -6.6, '6M': 43.8, '1Y': 100.8 },
      priceHistory: { '1W': [920.15, 867.09, 906.79, 940.66, 979.63], '1M': [1049.23, 1012.25, 1011.8, 1024.52, 1043.82, 1038.74, 1070.47, 1031.89, 996, 968.32, 950.54, 969.67, 959.36, 963.33, 933.61, 933.85, 920.15, 867.09, 906.79, 940.66, 979.63], '6M': [681.35, 661.81, 659.64, 662.32, 644.18, 661.67, 717.39, 737.53, 816.56, 830.34, 873.6, 789.23, 805.02, 877.39, 873.12, 898.57, 991.32, 1002.75, 1149.19, 1062.95, 1040.15, 1049.23, 1038.74, 950.54, 933.85, 979.63], '1Y': [487.88, 510.84, 506, 535.77, 561.17, 629.03, 632.67, 649.72, 657.44, 603.13, 625.91, 577.04, 643.56, 614.79, 628.97, 606.15, 606.12, 644.41, 585.33, 570.98, 547.96, 576.08, 554.93, 572.56, 601.97, 723, 686.22, 661.45, 653.57, 628.4, 642.23, 657.78, 726.37, 779.35, 802.13, 831.7, 873.6, 789.23, 805.02, 851.07, 853.16, 897.36, 991.12, 990.18, 1120.23, 1073.95, 1040.15, 1049.23, 1038.74, 950.54, 933.85, 979.63] },
      velocityScore: { '1D': 1.9, '1W': 65.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$263B', pe: 28.6, revenueGrowth: 16, eps: 34.24, grossMargin: 20, dividendYield: 0.21,
      etfPresence: { POW: 3.28, VOLT: 3.89, PBD: false, PBW: false, IVEP: 3.8 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 3, avgWeight: 3.57, proScore: 2.14, coverage: 0.6,
      price: 86.52, weeklyPrices: [84.83, 85.12, 84.84, 85.99, 86.52], weeklyChange: 1.99, sortRank: 0, periodReturns: { '1M': -7.3, '6M': 6, '1Y': 17.3 },
      priceHistory: { '1W': [84.83, 85.12, 84.84, 85.99, 86.52], '1M': [93.36, 89.04, 90.06, 88.27, 89.69, 88.55, 87.65, 87.65, 87.25, 87.01, 83.66, 85.68, 84.58, 85.68, 85.84, 84.01, 84.83, 85.12, 84.84, 85.99, 86.52], '6M': [81.65, 80.04, 80.53, 78.37, 81.98, 85.07, 88.18, 89.21, 91.93, 92.18, 93.77, 91.02, 92.78, 92.41, 91.16, 93.15, 94.08, 91.98, 95.28, 96.95, 93.1, 93.36, 88.55, 83.66, 84.01, 86.52], '1Y': [73.78, 71.4, 73.06, 73.65, 74.77, 72.82, 71.95, 71.18, 71.86, 76.51, 74.84, 71.63, 71.04, 70.31, 73.83, 78.67, 83.21, 84.64, 83.99, 83.57, 81.69, 85.76, 84.64, 84.83, 84.95, 81.27, 81.32, 79.79, 80.28, 79.49, 82.19, 84.81, 87.9, 89.47, 93.8, 94.06, 93.77, 91.02, 92.78, 89.5, 91.4, 92.73, 92.3, 92.01, 94.83, 95.51, 93.1, 93.36, 88.55, 83.66, 84.01, 86.52] },
      velocityScore: { '1D': 3.4, '1W': 57.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$180B', pe: 22, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.9,
      etfPresence: { POW: 2.02, VOLT: 5.03, PBD: false, PBW: false, IVEP: 3.65 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 3, avgWeight: 3.57, proScore: 2.14, coverage: 0.6,
      price: 276.27, weeklyPrices: [259.61, 234.23, 248.88, 260.22, 276.27], weeklyChange: 6.42, sortRank: 0, periodReturns: { '1M': 0.1, '6M': 208.4, '1Y': 1105.9 },
      priceHistory: { '1W': [259.61, 234.23, 248.88, 260.22, 276.27], '1M': [275.95, 258.71, 261.34, 282.31, 307.88, 302.49, 302.4, 293.8, 290.01, 285, 273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22, 276.27], '6M': [89.58, 92.26, 87.26, 108, 133.46, 145.63, 156.51, 136.6, 139.03, 147.55, 155.67, 135.19, 154.51, 166.69, 133.52, 135.63, 166.7, 207.86, 231.17, 290.52, 261.03, 275.95, 302.49, 273.51, 253.57, 276.27], '1Y': [22.91, 22.95, 22.13, 28.71, 24.69, 26.89, 34.75, 37.61, 41.25, 43.1, 49.94, 52.45, 62.96, 79.67, 69.18, 90.19, 86.06, 114.06, 104.38, 113.28, 129.05, 127.07, 104.97, 94.29, 102.5, 101.29, 87.61, 91.43, 86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 155.67, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 261.03, 275.95, 302.49, 273.51, 253.57, 276.27] },
      velocityScore: { '1D': 0.5, '1W': 1.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$79B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: 3.76, PBD: false, PBW: 2.13, IVEP: 4.82 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 3, avgWeight: 3.43, proScore: 2.06, coverage: 0.6,
      price: 171.16, weeklyPrices: [163.80, 156.79, 164.52, 165.84, 171.16], weeklyChange: 4.49, sortRank: 0, periodReturns: { '1M': 1.3, '6M': 66.8, '1Y': 143.1 },
      priceHistory: { '1W': [163.8, 156.79, 164.52, 165.84, 171.16], '1M': [169.01, 160.69, 158.23, 161.86, 163.57, 164.66, 169.29, 167.8, 164.87, 166.99, 171.55, 173.39, 176.39, 173.88, 162.86, 163.81, 163.8, 156.79, 164.52, 165.84, 171.16], '6M': [102.61, 102.79, 103.01, 106.48, 104.54, 111.57, 115.62, 113.87, 111.9, 116.87, 118.36, 106.02, 109.93, 122.58, 118.44, 117.96, 130.56, 134.69, 142.17, 158.92, 169.95, 169.01, 164.66, 171.55, 163.81, 171.16], '1Y': [70.4, 72.34, 72.16, 75.2, 74.48, 76.63, 79.72, 89.73, 91.84, 88.15, 90.84, 89.49, 94.98, 96.46, 97.27, 100.12, 96, 99.51, 99.65, 104.22, 109.62, 109.59, 104.31, 104.93, 104.97, 108.87, 102.41, 103.97, 101.97, 102.72, 107.98, 110.29, 112.26, 112.64, 113.25, 114.93, 118.36, 106.02, 109.93, 116.3, 116.98, 117.41, 133.16, 135.8, 141.71, 162.69, 169.95, 169.01, 164.66, 171.55, 163.81, 171.16] },
      velocityScore: { '1D': -0.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$28B', pe: 58.2, revenueGrowth: 54, eps: 2.94, grossMargin: 37, dividendYield: 0.51,
      etfPresence: { POW: 3.91, VOLT: 3.12, PBD: false, PBW: false, IVEP: 3.25 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 3, avgWeight: 2.87, proScore: 1.72, coverage: 0.6,
      price: 495.33, weeklyPrices: [486.47, 467.59, 469.32, 476.89, 495.33], weeklyChange: 1.82, sortRank: 0, periodReturns: { '1M': 3.2, '6M': 11.4, '1Y': 26.4 },
      priceHistory: { '1W': [486.47, 467.59, 469.32, 476.89, 495.33], '1M': [479.97, 470.87, 461.5, 463.32, 460.98, 475.01, 478.05, 484.25, 473.93, 473.61, 462.93, 480.46, 484.91, 485.27, 476.82, 485.03, 486.47, 467.59, 469.32, 476.89, 495.33], '6M': [444.84, 451.03, 446.61, 468.2, 476.06, 484.06, 497.97, 487.4, 516.02, 526.73, 511.63, 471.54, 467.38, 492.65, 481.67, 494.25, 536.01, 535.57, 553.07, 508.43, 492.58, 479.97, 475.01, 462.93, 485.03, 495.33], '1Y': [391.89, 402.99, 410.51, 417.71, 418.42, 434.95, 427.33, 427.67, 432.14, 432.81, 442.52, 428.8, 442.33, 433.26, 431.16, 430.47, 412.93, 427.43, 435.29, 455.34, 459.44, 450.12, 417.28, 429.82, 429.34, 448.18, 438.42, 455.92, 444.11, 460.87, 484.11, 485.53, 487.94, 503.8, 524.12, 516.99, 511.63, 471.54, 467.38, 475.74, 480.97, 499.2, 539.79, 546.23, 555.34, 516, 492.58, 479.97, 475.01, 462.93, 485.03, 495.33] },
      velocityScore: { '1D': 0, '1W': 53.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 29.3, revenueGrowth: 11, eps: 16.93, grossMargin: 36, dividendYield: 1.19,
      etfPresence: { POW: 2.88, VOLT: 3.27, PBD: false, PBW: false, IVEP: 2.45 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'NRG', name: 'NRG Energy Inc', easyScore: 3, avgWeight: 1.21, proScore: 0.72, coverage: 0.6,
      price: 130.12, weeklyPrices: [129.96, 120.65, 123.70, 125.47, 130.12], weeklyChange: 0.12, sortRank: 0, periodReturns: { '1M': 1.8, '6M': -18.7, '1Y': -15.5 },
      priceHistory: { '1W': [129.96, 120.65, 123.7, 125.47, 130.12], '1M': [127.81, 125.5, 123.71, 133.98, 136.92, 137.65, 140.43, 138, 137.5, 134.08, 129.47, 133.51, 133.76, 133.39, 129.2, 127.71, 129.96, 120.65, 123.7, 125.47, 130.12], '6M': [159.99, 156.96, 160.43, 148.91, 149.83, 151.09, 153.72, 144.44, 161.8, 179.18, 178.96, 154.32, 152.87, 161.4, 146.14, 152.69, 164.07, 167.73, 159.81, 153.37, 138.11, 127.81, 137.65, 129.47, 127.71, 130.12], '1Y': [153.94, 153.68, 155.96, 150.27, 144.96, 160.55, 159.87, 171.96, 156.69, 148.38, 146.23, 146.91, 161.21, 164.58, 165.58, 161.91, 162.61, 165.61, 163.59, 172.76, 167.99, 162.84, 166.45, 163.81, 166.77, 168.16, 160.15, 158.11, 159.24, 143.53, 158.5, 149.3, 152.63, 153.32, 172.35, 176.52, 178.96, 154.32, 152.87, 145.8, 147.74, 149.8, 170.24, 157.18, 160.15, 154.82, 138.11, 127.81, 137.65, 129.47, 127.71, 130.12] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 141.4, revenueGrowth: 20, eps: 0.92, grossMargin: 16, dividendYield: 1.51,
      etfPresence: { POW: 0.51, VOLT: 0.92, PBD: false, PBW: false, IVEP: 2.19 },
      tonyNote: 'NRG Energy Inc appears in 3 of 5 Electrification ETFs (60% coverage) with average weight 1.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, avgWeight: 5.68, proScore: 2.27, coverage: 0.4,
      price: 301.76, weeklyPrices: [276.04, 276.95, 296.55, 293.87, 301.76], weeklyChange: 9.32, sortRank: 0, periodReturns: { '1M': 17.5, '6M': 74.1, '1Y': 240.1 },
      priceHistory: { '1W': [276.04, 276.95, 296.55, 293.87, 301.76], '1M': [256.72, 258.28, 249.71, 254.75, 260.4, 270.01, 276.25, 280.13, 276.96, 274.52, 269.86, 269.22, 280.09, 276.54, 262.56, 279.13, 276.04, 276.95, 296.55, 293.87, 301.76], '6M': [173.3, 174.02, 172.95, 181.03, 192.96, 200.29, 210.44, 208, 231.48, 235.04, 229.71, 191.87, 197.65, 214.95, 204.11, 204.65, 235.73, 254.25, 276.65, 283.6, 297.98, 256.72, 270.01, 269.86, 279.13, 301.76], '1Y': [88.72, 92.48, 95.52, 102.24, 98.77, 107.07, 130.49, 131.71, 134.66, 127.8, 139.31, 138.07, 145.68, 144.6, 142.27, 142.5, 141.25, 147.14, 148, 154.78, 154.25, 152.12, 144.07, 150.84, 159.74, 172.82, 171.76, 177.23, 169.63, 180.24, 196.61, 196.5, 201.19, 220.78, 232.84, 231.83, 229.71, 191.87, 197.65, 204.09, 203.53, 206.9, 237.93, 254.38, 250.96, 286.69, 297.98, 256.72, 270.01, 269.86, 279.13, 301.76] },
      velocityScore: { '1D': -2.2, '1W': -5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 72.9, revenueGrowth: 17, eps: 4.14, grossMargin: 39, dividendYield: 0.1,
      etfPresence: { POW: 3.51, VOLT: 7.85, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.2, proScore: 1.28, coverage: 0.4,
      price: 313.78, weeklyPrices: [289.52, 280.98, 297.88, 302.87, 313.78], weeklyChange: 8.38, sortRank: 0, periodReturns: { '1M': -15.4, '6M': 94, '1Y': 169.5 },
      priceHistory: { '1W': [289.52, 280.98, 297.88, 302.87, 313.78], '1M': [370.94, 339.73, 322.63, 315.67, 323.4, 327.46, 323.91, 319.78, 314.18, 315.71, 323.39, 334.49, 331.44, 323.92, 300.51, 300.57, 289.52, 280.98, 297.88, 302.87, 313.78], '6M': [161.74, 166.25, 164.34, 171.54, 170.86, 181.12, 195.1, 177.75, 236.51, 243.75, 254.89, 241.78, 258.88, 269.17, 252.4, 261.29, 295.11, 307.34, 323.46, 328.31, 339.97, 370.94, 327.46, 323.39, 300.57, 313.78], '1Y': [116.45, 122.32, 122.54, 128.37, 125.4, 130.19, 142.7, 138.76, 143.72, 129.05, 127.93, 125.59, 136.74, 136.83, 141.62, 161.59, 158.87, 175.15, 174.8, 190.57, 180.82, 179.05, 164.86, 169.57, 178.88, 181.82, 160.66, 166.26, 162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 245.42, 254.89, 241.78, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 330.97, 339.97, 370.94, 327.46, 323.39, 300.57, 313.78] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$121B', pe: 79, revenueGrowth: 30, eps: 3.97, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 2.41, PBD: false, PBW: false, IVEP: 4 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 2.83, proScore: 1.13, coverage: 0.4,
      price: 129.88, weeklyPrices: [127.76, 128.53, 128.48, 129.23, 129.88], weeklyChange: 1.66, sortRank: 0, periodReturns: { '1M': 3.8, '6M': 12.2, '1Y': 27.4 },
      priceHistory: { '1W': [127.76, 128.53, 128.48, 129.23, 129.88], '1M': [125.15, 127.68, 128.92, 128.87, 129.61, 131.59, 130.9, 129.57, 127.76, 126.67, 123.79, 127.11, 126.31, 127.79, 129.14, 126.77, 127.76, 128.53, 128.48, 129.23, 129.88], '6M': [115.77, 114.62, 115.99, 113.7, 118.11, 117.18, 119.21, 120.61, 126.43, 129.37, 133.82, 131.87, 133.61, 128.72, 128.85, 132.68, 136.3, 133.66, 134.73, 136.91, 130.16, 125.15, 131.59, 123.79, 126.77, 129.88], '1Y': [101.91, 103.28, 104.39, 104.74, 105.49, 108.89, 109.22, 113.24, 111.99, 112.66, 112.63, 110.03, 108.34, 107.52, 108.88, 112.75, 118.16, 118.38, 117.43, 115.11, 120.3, 122.73, 123.51, 121.58, 118.06, 114.16, 114.57, 115.15, 115.31, 115.93, 119.4, 116.63, 119.78, 120.8, 129.94, 132.03, 133.82, 131.87, 133.61, 125.66, 130.1, 132.36, 134.46, 133.28, 135.07, 134.66, 130.16, 125.15, 131.59, 123.79, 126.77, 129.88] },
      velocityScore: { '1D': -0.9, '1W': -22.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$71B', pe: 19.2, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.94,
      etfPresence: { POW: 1.4, VOLT: 4.25, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.8, proScore: 1.12, coverage: 0.4,
      price: 370.83, weeklyPrices: [311.64, 308.17, 340.40, 354.37, 370.83], weeklyChange: 18.99, sortRank: 0, periodReturns: { '1M': 14.6, '6M': 71, '1Y': 196 },
      priceHistory: { '1W': [311.64, 308.17, 340.4, 354.37, 370.83], '1M': [323.46, 309.06, 302.84, 313.05, 323.79, 324.86, 339.65, 328.34, 317.08, 302.18, 294.65, 312.28, 322.5, 320.92, 294.81, 306.11, 311.64, 308.17, 340.4, 354.37, 370.83], '6M': [216.87, 217.76, 213.41, 224.4, 237.9, 275.57, 269.12, 257.64, 312.95, 331.23, 335.57, 290.78, 302.02, 327.8, 313.11, 332.31, 379.64, 375.6, 387.24, 389.05, 357.24, 323.46, 324.86, 294.65, 306.11, 370.83], '1Y': [125.26, 132.51, 133.59, 141.13, 139.42, 142.84, 142.21, 139.58, 158.81, 150.41, 154.44, 145.25, 157.25, 157.79, 170.77, 176.2, 173.09, 182.75, 196.58, 204.62, 195.05, 215.98, 199.22, 205.92, 213.44, 221.47, 215.16, 217.51, 209.37, 210.99, 257.29, 262.19, 255.36, 273.26, 314.27, 329.24, 335.57, 290.78, 302.02, 317.21, 310.76, 331.9, 378.94, 380.22, 385.68, 387.03, 357.24, 323.46, 324.86, 294.65, 306.11, 370.83] },
      velocityScore: { '1D': 2.8, '1W': -12.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 76.9, revenueGrowth: 26, eps: 4.82, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: 1.09, VOLT: 4.51, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.63, proScore: 1.05, coverage: 0.4,
      price: 158.37, weeklyPrices: [154.07, 149.22, 152.46, 153.80, 158.37], weeklyChange: 2.79, sortRank: 0, periodReturns: { '1M': 26.7, '6M': 21.9, '1Y': 69.6 },
      priceHistory: { '1W': [154.07, 149.22, 152.46, 153.8, 158.37], '1M': [125, 121.72, 119.2, 123.05, 124.86, 132.06, 139.56, 140.24, 147.68, 148.76, 146.34, 148.4, 147.62, 146.77, 138.81, 143.6, 154.07, 149.22, 152.46, 153.8, 158.37], '6M': [129.9, 135.14, 136.2, 138.91, 146.75, 152.5, 149.58, 127.63, 143.73, 151.04, 146.06, 131.87, 133.92, 130.65, 123.13, 128, 140.75, 151.06, 149.71, 142.3, 128.03, 125, 132.06, 146.34, 143.6, 158.37], '1Y': [93.38, 95.8, 97.39, 98.21, 100.55, 100.71, 105.31, 107.93, 111.85, 109.98, 109.9, 110.69, 119.09, 118.41, 123.13, 124.66, 124.53, 122.64, 124.44, 137.29, 136.7, 143.47, 132.44, 137.81, 138.65, 138.68, 129.13, 137.12, 135.14, 136.25, 154.22, 150.99, 144.08, 136.23, 146.72, 147.82, 146.06, 131.87, 133.92, 126.74, 123.62, 126.49, 145.27, 152.81, 148.64, 141.03, 128.03, 125, 132.06, 146.34, 143.6, 158.37] },
      velocityScore: { '1D': -0.9, '1W': -19.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$195B', pe: 45.5, revenueGrowth: 58, eps: 3.48, grossMargin: 38, dividendYield: 0.65,
      etfPresence: { POW: 1, VOLT: 4.27, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.58, proScore: 1.03, coverage: 0.4,
      price: 148.24, weeklyPrices: [147.75, 139.36, 144.01, 144.96, 148.24], weeklyChange: 0.33, sortRank: 0, periodReturns: { '1M': 3.6, '6M': 26.8, '1Y': 41.9 },
      priceHistory: { '1W': [147.75, 139.36, 144.01, 144.96, 148.24], '1M': [143.08, 137.31, 135.42, 137.75, 135.47, 138.36, 140.22, 138.2, 136.15, 134.06, 133.91, 141.99, 146.96, 147.4, 143.65, 144.05, 147.75, 139.36, 144.01, 144.96, 148.24], '6M': [116.88, 119.96, 120.94, 112.41, 112.13, 114.51, 120.28, 132.52, 138.57, 143.79, 144.3, 132.4, 130.16, 133.25, 131.57, 132.97, 142.53, 140.87, 141.92, 145.08, 139.52, 143.08, 138.36, 133.91, 144.05, 148.24], '1Y': [104.49, 103.6, 104.67, 106.5, 107.28, 110.13, 103.24, 104.84, 106.64, 104.52, 108.46, 105.34, 107.8, 107.41, 106.54, 108.89, 108.31, 107.85, 111.18, 112.21, 111.04, 121.94, 114.44, 114.65, 114.22, 115.81, 118.85, 121.13, 119.75, 111.29, 112.95, 113.59, 119.26, 137.65, 139.24, 142.83, 144.3, 132.4, 130.16, 129.7, 131.29, 133.75, 142.82, 140.98, 143.38, 144.4, 139.52, 143.08, 138.36, 133.91, 144.05, 148.24] },
      velocityScore: { '1D': -1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$90B', pe: 45.2, revenueGrowth: 8, eps: 3.28, grossMargin: 37, dividendYield: 1.1,
      etfPresence: { POW: false, VOLT: 1.46, PBD: false, PBW: false, IVEP: 3.7 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 2.57, proScore: 1.03, coverage: 0.4,
      price: 71.75, weeklyPrices: [71.59, 72.26, 71.62, 72.08, 71.75], weeklyChange: 0.22, sortRank: 0, periodReturns: { '1M': -7.7, '6M': 20.6, '1Y': 21.3 },
      priceHistory: { '1W': [71.59, 72.26, 71.62, 72.08, 71.75], '1M': [77.72, 77.69, 79.4, 77.88, 77.52, 78.47, 76.34, 74.37, 73.13, 71.39, 70.04, 71.31, 71.66, 72.43, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08, 71.75], '6M': [59.48, 58.92, 60.16, 60.39, 60.71, 63.72, 67.24, 67.42, 71.13, 72.98, 74.72, 74.24, 73.34, 74.06, 74.06, 72, 72.74, 71.15, 72.18, 75.54, 71.96, 77.72, 78.47, 70.04, 71.59, 71.75], '1Y': [59.15, 61.12, 58.72, 57.85, 58.48, 57.71, 58.89, 59, 57.76, 56.57, 57.13, 57.73, 58.76, 59.02, 62.86, 63.69, 63.97, 62.36, 62.34, 57.59, 56.51, 60.6, 59.17, 59.37, 61.55, 60.5, 58.41, 59.75, 60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 72.28, 72.98, 74.72, 74.24, 73.34, 72.41, 73.58, 72.59, 71.54, 70.91, 71.61, 75.41, 71.96, 77.72, 78.47, 70.04, 71.59, 71.75] },
      velocityScore: { '1D': -1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$88B', pe: 31.5, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.91,
      etfPresence: { POW: false, VOLT: 1.51, PBD: false, PBW: false, IVEP: 3.64 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CEG', name: 'Constellation Energy Corp', easyScore: 2, avgWeight: 2.32, proScore: 0.93, coverage: 0.4,
      price: 262.4, weeklyPrices: [251.65, 242.30, 246.71, 253.76, 262.40], weeklyChange: 4.27, sortRank: 0, periodReturns: { '1M': -1.8, '6M': -26.5, '1Y': -14.8 },
      priceHistory: { '1W': [251.65, 242.3, 246.71, 253.76, 262.4], '1M': [267.2, 262, 260.67, 281.26, 285.83, 294.07, 301.57, 288.68, 286.31, 287.75, 265.7, 272.65, 267.24, 264.59, 254.83, 250.67, 251.65, 242.3, 246.71, 253.76, 262.4], '6M': [357.14, 357.81, 357.12, 338.63, 330.38, 287.35, 287.45, 247.06, 276.12, 294.84, 329.88, 319.06, 301.77, 316.47, 295.19, 272.82, 286.5, 296.21, 313.53, 307.81, 303.63, 267.2, 294.07, 265.7, 250.67, 262.4], '1Y': [308.01, 320.66, 307.92, 317.11, 308.2, 323.7, 330.52, 343.57, 338.57, 317.23, 316.58, 308.48, 320, 321.27, 339.13, 350.9, 358.16, 389.56, 358.79, 384.95, 362.82, 351.67, 339.35, 351.6, 361.26, 362.07, 365.63, 361.33, 353.27, 322.54, 341.2, 289.06, 280.68, 261.42, 288.43, 293.8, 329.88, 319.06, 301.77, 281.99, 301.49, 275.16, 291.72, 287.56, 315.17, 321.05, 303.63, 267.2, 294.07, 265.7, 250.67, 262.4] },
      velocityScore: { '1D': 2.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$94B', pe: 22.8, revenueGrowth: 64, eps: 11.52, grossMargin: 23, dividendYield: 0.67,
      etfPresence: { POW: 1.33, VOLT: false, PBD: false, PBW: false, IVEP: 3.31 },
      tonyNote: 'Constellation Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX TECHNOLOGIES INC', easyScore: 2, avgWeight: 2.12, proScore: 0.85, coverage: 0.4,
      price: 195.09, weeklyPrices: [188.96, 183.00, 194.68, 193.45, 195.09], weeklyChange: 3.24, sortRank: 0, periodReturns: { '1M': -4.7, '6M': 11.9, '1Y': 39.7 },
      priceHistory: { '1W': [188.96, 183, 194.68, 193.45, 195.09], '1M': [204.72, 201.94, 197.33, 202.66, 202.52, 202.91, 204.38, 198.95, 199.27, 195.88, 188.39, 187.26, 184.72, 190.76, 185.95, 187.46, 188.96, 183, 194.68, 193.45, 195.09], '6M': [174.37, 178.41, 174.36, 192.24, 204.08, 206.33, 210.18, 187.42, 196.9, 206.44, 205.98, 195.23, 194.13, 210.12, 205.09, 214.98, 229.57, 235.78, 223.15, 216.31, 205.33, 204.72, 202.91, 188.39, 187.46, 195.09], '1Y': [139.67, 142.31, 140.37, 137.56, 139.85, 143.37, 150.28, 182, 179.51, 165.76, 166.52, 160.95, 166.13, 168.38, 175.02, 187.18, 191.39, 202.46, 205.24, 207.62, 200.39, 195.65, 175.91, 175.26, 174.71, 179.65, 173.2, 177.62, 172.84, 193.2, 213.25, 207.75, 205.43, 197.19, 200.4, 198.38, 205.98, 195.23, 194.13, 199.75, 202.59, 215.98, 232.83, 228.24, 222.07, 216.68, 205.33, 204.72, 202.91, 188.39, 187.46, 195.09] },
      velocityScore: { '1D': -1.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 52, revenueGrowth: 26, eps: 3.75, grossMargin: 23, dividendYield: 0.54,
      etfPresence: { POW: false, VOLT: 2.07, PBD: false, PBW: false, IVEP: 2.16 },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'SO', name: 'Southern Co/The', easyScore: 2, avgWeight: 2.02, proScore: 0.81, coverage: 0.4,
      price: 94.42, weeklyPrices: [92.95, 94.02, 93.27, 94.00, 94.42], weeklyChange: 1.58, sortRank: 0, periodReturns: { '1M': 2, '6M': 9.8, '1Y': 6.2 },
      priceHistory: { '1W': [92.95, 94.02, 93.27, 94, 94.42], '1M': [92.55, 93.71, 94.14, 93.62, 94.24, 94.55, 94.09, 93.74, 92.52, 92.05, 89.03, 90.51, 90.49, 91.62, 92.6, 91.28, 92.95, 94.02, 93.27, 94, 94.42], '6M': [86, 85.72, 87.57, 86.27, 88.42, 87.51, 89.14, 91.08, 92.56, 94.3, 97.38, 97.48, 98.01, 96.23, 95.42, 97.45, 97.15, 94.51, 93.49, 96.71, 91.8, 92.55, 94.55, 89.03, 91.28, 94.42], '1Y': [88.94, 90.89, 92.3, 91.96, 93.3, 95.13, 95.2, 94.39, 93.96, 94.18, 93.09, 91.66, 91.56, 91.63, 94.41, 94.8, 96.42, 99.68, 97, 93.91, 92.73, 91.14, 90.69, 89.29, 87.98, 84.08, 85.71, 86.39, 87.2, 87.22, 88.78, 87.54, 89.31, 90.08, 94.95, 95.18, 97.38, 97.48, 98.01, 93.39, 95.55, 96.94, 95.93, 93.51, 93.77, 95.99, 91.8, 92.55, 94.55, 89.03, 91.28, 94.42] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$106B', pe: 24.1, revenueGrowth: 8, eps: 3.91, grossMargin: 48, dividendYield: 3.23,
      etfPresence: { POW: 0.31, VOLT: false, PBD: false, PBW: false, IVEP: 3.73 },
      tonyNote: 'Southern Co/The appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'XEL', name: 'Xcel Energy Inc', easyScore: 2, avgWeight: 1.96, proScore: 0.78, coverage: 0.4,
      price: 79.06, weeklyPrices: [77.87, 78.10, 78.27, 79.22, 79.06], weeklyChange: 1.52, sortRank: 0, periodReturns: { '1M': 1.5, '6M': 4.4, '1Y': 18.4 },
      priceHistory: { '1W': [77.87, 78.1, 78.27, 79.22, 79.06], '1M': [77.92, 78.1, 79.73, 79.86, 80.2, 81.08, 80.78, 81, 79.26, 79.5, 76.41, 77.87, 77.39, 77.77, 79.04, 77.62, 77.87, 78.1, 78.27, 79.22, 79.06], '6M': [75.72, 73.85, 74.19, 73.22, 76.2, 75.86, 75.97, 76.12, 78.98, 81.55, 83.36, 82.52, 81.91, 79.53, 77.93, 80.74, 82.38, 81.08, 79.15, 82.58, 79.39, 77.92, 81.08, 76.41, 77.62, 79.06], '1Y': [66.79, 68.23, 68.71, 67.84, 69.17, 72.5, 72.34, 73.73, 72.39, 73.22, 72.54, 72.43, 72.31, 72.05, 77.93, 80.31, 81.85, 80.85, 80.64, 79.82, 81.59, 81.16, 81, 80.39, 78.39, 74.62, 73.73, 74.01, 73.86, 73.38, 75.36, 75.01, 76.06, 75.9, 81.59, 83.35, 83.36, 82.52, 81.91, 76.77, 78.09, 80.39, 80.45, 80.32, 79.41, 81.17, 79.39, 77.92, 81.08, 76.41, 77.62, 79.06] },
      velocityScore: { '1D': -1.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$49B', pe: 22.8, revenueGrowth: 3, eps: 3.47, grossMargin: 46, dividendYield: 2.99,
      etfPresence: { POW: 1.98, VOLT: 1.94, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Xcel Energy Inc appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 5.4, proScore: 2.16, coverage: 0.4,
      price: 876.1, weeklyPrices: [842.01, 770.25, 838.55, 858.99, 876.10], weeklyChange: 4.05, sortRank: 0, periodReturns: { '1M': 3.2, '6M': 174.5, '1Y': 318.1 },
      priceHistory: { '1W': [842.01, 770.25, 838.55, 858.99, 876.1], '1M': [848.84, 770.76, 728.29, 752, 733.77, 732.94, 783.53, 782.12, 842.96, 860.84, 845.39, 875.52, 957.03, 993.74, 882.43, 891.86, 842.01, 770.25, 838.55, 858.99, 876.1], '6M': [319.12, 313.04, 307.68, 312.24, 319.27, 364.25, 379.23, 365.07, 431.43, 435.5, 428.13, 395.11, 398.12, 431.78, 415.93, 416.34, 446.36, 463.65, 497.18, 532.67, 844.8, 848.84, 732.94, 845.39, 891.86, 876.1], '1Y': [209.55, 229.38, 222.54, 233.39, 243.23, 253.14, 264.08, 296.58, 308.4, 276.02, 292.95, 273.82, 301.13, 320.94, 344.05, 337.93, 348.57, 361.44, 364.32, 379.89, 382.57, 381.22, 333.88, 332.96, 323.46, 331.61, 319.13, 315.87, 306.23, 297.62, 336.31, 351.39, 357.91, 401.29, 437.77, 434.64, 428.13, 395.11, 398.12, 401.61, 420.24, 393.71, 459.02, 472.9, 505.45, 529.49, 844.8, 848.84, 732.94, 845.39, 891.86, 876.1] },
      velocityScore: { '1D': 1.4, '1W': -4.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 78.4, revenueGrowth: 92, eps: 11.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 6.32, PRN: 4.48, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 5.21, proScore: 2.09, coverage: 0.4,
      price: 303.39, weeklyPrices: [283.51, 262.34, 290.50, 294.75, 303.39], weeklyChange: 7.01, sortRank: 0, periodReturns: { '1M': 3.7, '6M': 177.5, '1Y': 366.4 },
      priceHistory: { '1W': [283.51, 262.34, 290.5, 294.75, 303.39], '1M': [292.65, 266.8, 261.58, 271.05, 270.75, 279.22, 291.97, 295.94, 288.9, 284.42, 288.12, 299.07, 299.73, 300.06, 284.87, 293.6, 283.51, 262.34, 290.5, 294.75, 303.39], '6M': [109.31, 112.18, 109.16, 118.62, 133.76, 142.29, 152.31, 179.6, 197.63, 182.27, 174.53, 161.22, 167.57, 175.13, 174.8, 182.6, 230.94, 241.01, 252.76, 275.33, 309.39, 292.65, 279.22, 288.12, 293.6, 303.39], '1Y': [65.05, 62.82, 70.01, 70.64, 72.53, 78.32, 77.77, 78.75, 90.06, 84.7, 91.08, 85.72, 92.33, 97.11, 97.88, 105.74, 104.42, 105.73, 116.11, 128.09, 126.71, 121.07, 107.22, 104.18, 107.83, 119.95, 110.88, 112.88, 106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 181.38, 174.53, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 269.95, 309.39, 292.65, 279.22, 288.12, 293.6, 303.39] },
      velocityScore: { '1D': 2, '1W': -0.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 59.1, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { AIRR: 2.63, PRN: false, RSHO: 7.8, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 4.94, proScore: 1.98, coverage: 0.4,
      price: 938.53, weeklyPrices: [914.70, 856.16, 897.63, 910.57, 938.53], weeklyChange: 2.61, sortRank: 0, periodReturns: { '1M': 5.7, '6M': 59.1, '1Y': 158.9 },
      priceHistory: { '1W': [914.7, 856.16, 897.63, 910.57, 938.53], '1M': [888.31, 863.95, 860.15, 872.56, 865.95, 879.89, 908.55, 909.93, 887.67, 875.87, 865.36, 909.81, 926.18, 940.48, 904.28, 915.64, 914.7, 856.16, 897.63, 910.57, 938.53], '6M': [589.76, 582.41, 577.39, 596.52, 638.75, 648.41, 665.24, 678.31, 758.29, 759.74, 742.83, 680.9, 693.99, 688.65, 703.19, 717.22, 790.66, 794.65, 830.79, 889.67, 897.45, 888.31, 879.89, 865.36, 915.64, 938.53], '1Y': [362.44, 373.02, 390.92, 402.18, 412.88, 427.59, 430.05, 434.23, 412.71, 416.09, 431.26, 415.12, 422.91, 450.66, 469.79, 480.82, 486.71, 527.47, 524.65, 524.47, 547.58, 567.93, 546.88, 566.61, 591.49, 615.35, 588.93, 582.42, 572.87, 608.13, 647.18, 626.62, 657.36, 726.2, 774.2, 756.47, 742.83, 680.9, 693.99, 680.88, 695.4, 721.24, 791.73, 798.4, 828.79, 874.78, 897.45, 888.31, 879.89, 865.36, 915.64, 938.53] },
      velocityScore: { '1D': -1, '1W': -2.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$432B', pe: 46.6, revenueGrowth: 22, eps: 20.12, grossMargin: 29, dividendYield: 0.72,
      etfPresence: { AIRR: false, PRN: 3.29, RSHO: 6.59, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.53, proScore: 1.81, coverage: 0.4,
      price: 1977.28, weeklyPrices: [1831.56, 1719.48, 1843.42, 1877.61, 1977.28], weeklyChange: 7.96, sortRank: 0, periodReturns: { '1M': -0.8, '6M': 104.2, '1Y': 294.7 },
      priceHistory: { '1W': [1831.56, 1719.48, 1843.42, 1877.61, 1977.28], '1M': [1992.74, 1854.43, 1825.5, 1835.51, 1835.33, 1828.25, 1883.56, 1867.09, 1855.15, 1828.21, 1787.88, 1883.26, 1850.04, 1914.65, 1843.94, 1852.03, 1831.56, 1719.48, 1843.42, 1877.61, 1977.28], '6M': [968.48, 950.79, 946.93, 1035.12, 1053.1, 1131.7, 1171.46, 1147.97, 1300.02, 1462.23, 1429.37, 1279.06, 1365.34, 1444.6, 1358.66, 1417.19, 1592.84, 1650.47, 1726.12, 1867.02, 1952.37, 1992.74, 1828.25, 1787.88, 1852.03, 1977.28], '1Y': [500.91, 513.32, 521.66, 535.02, 546.63, 547.91, 687.67, 691.45, 718.61, 683.93, 707.39, 700.69, 752.1, 762.91, 791.46, 834.33, 816.53, 831.89, 829.36, 980.97, 955.96, 954.53, 920.99, 957.04, 949.3, 1021.36, 968.5, 965.37, 933.29, 971.49, 1091.04, 1121.44, 1142.1, 1230.26, 1337.95, 1413.57, 1429.37, 1279.06, 1365.34, 1356.75, 1366.77, 1434.09, 1627.81, 1680.09, 1794.04, 1891.95, 1952.37, 1992.74, 1828.25, 1787.88, 1852.03, 1977.28] },
      velocityScore: { '1D': 1.1, '1W': -0.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 57.2, revenueGrowth: 1, eps: 34.55, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: 4.31, PRN: 4.74, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, avgWeight: 4.05, proScore: 1.62, coverage: 0.4,
      price: 690.77, weeklyPrices: [613.93, 588.90, 623.66, 641.68, 690.77], weeklyChange: 12.52, sortRank: 0, periodReturns: { '1M': -4.4, '6M': 117.5, '1Y': 216 },
      priceHistory: { '1W': [613.93, 588.9, 623.66, 641.68, 690.77], '1M': [722.31, 664.76, 639.58, 630.5, 644.64, 656.35, 670.66, 673.51, 677.45, 667.02, 646.89, 663.14, 686.37, 689.43, 694.72, 619.98, 613.93, 588.9, 623.66, 641.68, 690.77], '6M': [317.58, 337.9, 315.44, 337.03, 317.76, 380.36, 355.51, 345.97, 413.65, 437.61, 451.25, 414.2, 458.31, 479.9, 410.85, 575.16, 603.84, 597.88, 652.99, 702.27, 680.26, 722.31, 656.35, 646.89, 619.98, 690.77], '1Y': [218.59, 214.63, 203.78, 206.63, 213.25, 216.2, 238.15, 233.13, 239.05, 213.76, 230.02, 227.03, 225.82, 239.42, 260.56, 279.62, 268.53, 300.72, 281, 292.46, 303.2, 347.88, 344.36, 373.29, 351.09, 325.77, 320.1, 333.23, 313.32, 313.98, 329.66, 363.88, 347.11, 352.09, 409.95, 441.71, 451.25, 414.2, 458.31, 473.85, 566.62, 572.31, 598.44, 611.21, 660.85, 697.15, 680.26, 722.31, 656.35, 646.89, 619.98, 690.77] },
      velocityScore: { '1D': 1.9, '1W': -10, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 60.8, revenueGrowth: 50, eps: 11.36, grossMargin: 21, dividendYield: 0.31,
      etfPresence: { AIRR: 3.91, PRN: 4.19, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Argan Inc is an engineering and construction company for power generation facilities — natural gas and renewable power plants. It appears in Industrials ETFs because power plant construction is one of the fastest-growing categories in U.S. infrastructure spending, driven by data center load additions that the grid cannot currently support.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.46, proScore: 1.38, coverage: 0.4,
      price: 320.55, weeklyPrices: [322.81, 314.08, 318.89, 320.11, 320.55], weeklyChange: -0.7, sortRank: 0, periodReturns: { '1M': 4.4, '6M': 23.4, '1Y': 39.3 },
      priceHistory: { '1W': [322.81, 314.08, 318.89, 320.11, 320.55], '1M': [307.17, 305.22, 302.64, 306.25, 305.66, 307.1, 311.33, 312.65, 308.53, 303.81, 300.98, 308.31, 313.39, 313.67, 315.29, 314.42, 322.81, 314.08, 318.89, 320.11, 320.55], '6M': [259.81, 263.48, 261.16, 260.8, 277.62, 282.33, 259.51, 287.03, 279.03, 281.97, 282.58, 267.78, 255.65, 256.58, 260.51, 267.12, 289.01, 291.03, 293.35, 302.99, 308.87, 307.17, 307.1, 300.98, 314.42, 320.55], '1Y': [230.06, 234.89, 242.14, 251.4, 255.52, 267.01, 272.4, 269.28, 270.68, 262.92, 266.99, 261.53, 263.45, 259.5, 259.37, 257.98, 252.74, 252.95, 258.78, 258.03, 256.47, 255.53, 242.61, 255.78, 260.88, 264.32, 258.47, 263.58, 256.77, 264.62, 282.47, 280.14, 260.41, 291.74, 279.84, 278.74, 282.58, 267.78, 255.65, 253.77, 260.67, 269.55, 293.26, 293.92, 298.1, 303.99, 308.87, 307.17, 307.1, 300.98, 314.42, 320.55] },
      velocityScore: { '1D': -1.4, '1W': 1.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 30.2, revenueGrowth: 7, eps: 10.6, grossMargin: 30, dividendYield: 0.64,
      etfPresence: { AIRR: 1.75, PRN: false, RSHO: 5.17, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.81, proScore: 1.13, coverage: 0.4,
      price: 238.91, weeklyPrices: [228.01, 223.63, 233.49, 230.05, 238.91], weeklyChange: 4.78, sortRank: 0, periodReturns: { '1M': 18.9, '6M': 9.5, '1Y': 54.1 },
      priceHistory: { '1W': [228.01, 223.63, 233.49, 230.05, 238.91], '1M': [200.99, 200.47, 195.79, 205.55, 205.39, 207.8, 219.08, 215.34, 213.82, 216.66, 220.92, 230.08, 234.08, 236.14, 227.8, 229.95, 228.01, 223.63, 233.49, 230.05, 238.91], '6M': [218.13, 207.18, 203.51, 208, 209.78, 217.13, 211.84, 218.02, 230.92, 242.29, 226.94, 204.62, 199.45, 202.36, 200.45, 197.29, 215.97, 223.52, 222.82, 208.13, 202.84, 200.99, 207.8, 220.92, 229.95, 238.91], '1Y': [155.05, 162.31, 168.95, 172.78, 175.13, 175.58, 180.24, 203.71, 191.17, 188, 192.05, 182.65, 188, 184.91, 182.39, 185.92, 188.32, 185.28, 191.84, 197.07, 213.49, 221.42, 204.36, 215.7, 209.57, 217.69, 216.89, 205.46, 200.06, 207.44, 213.61, 211.03, 208.41, 222.32, 239, 237.18, 226.94, 204.62, 199.45, 186.77, 200, 196.9, 221.27, 217.61, 222.45, 201.12, 202.84, 200.99, 207.8, 220.92, 229.95, 238.91] },
      velocityScore: { '1D': 0.9, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 45.8, revenueGrowth: 17, eps: 5.22, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.63, PRN: false, RSHO: 4, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 2, avgWeight: 2.72, proScore: 1.09, coverage: 0.4,
      price: 272.7, weeklyPrices: [257.16, 249.49, 264.60, 264.67, 272.70], weeklyChange: 6.04, sortRank: 0, periodReturns: { '1M': 4.7, '6M': 38.3, '1Y': 58.9 },
      priceHistory: { '1W': [257.16, 249.49, 264.6, 264.67, 272.7], '1M': [260.35, 256.99, 253.12, 261.21, 259.89, 256.55, 261.89, 258.02, 259.89, 258.25, 255.52, 250.72, 248.63, 249.33, 251.9, 246.55, 257.16, 249.49, 264.6, 264.67, 272.7], '6M': [197.24, 208.17, 207.81, 210.9, 220.25, 217.7, 208.93, 209.63, 244.79, 258.1, 262.53, 250.13, 236.75, 232.94, 230.51, 232.68, 252.67, 255.69, 242.44, 239.51, 270.56, 260.35, 256.55, 255.52, 246.55, 272.7], '1Y': [171.6, 176.57, 176.22, 181.42, 184.3, 186.4, 189.17, 179.32, 180.9, 171.9, 175.92, 174.49, 183.8, 185.39, 190.22, 194.85, 191.46, 193.03, 197.18, 201.04, 205.02, 208.9, 201.22, 203.68, 194.29, 192.39, 195.18, 209.57, 205.02, 210.02, 224.26, 214.89, 208.08, 223.16, 250.21, 257.04, 262.53, 250.13, 236.75, 231.21, 227.9, 236.57, 256.14, 255.62, 241.7, 239.7, 270.56, 260.35, 256.55, 255.52, 246.55, 272.7] },
      velocityScore: { '1D': 0, '1W': 13.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$109B', pe: 63.3, revenueGrowth: 19, eps: 4.31, grossMargin: 35, dividendYield: 0.18,
      etfPresence: { AIRR: false, PRN: 3.32, RSHO: false, IDEF: 2.13, BILT: false },
      tonyNote: 'Howmet Aerospace is an aerospace structures and engine components manufacturer. It appears in Industrials ETFs for its aerospace and defense exposure — commercial air travel recovery and defense spending growth are the two demand drivers. Revenue grew and margins are expanding as Howmet prices power over OEM customers.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.35, proScore: 0.94, coverage: 0.4,
      price: 195.09, weeklyPrices: [188.96, 183.00, 194.68, 193.45, 195.09], weeklyChange: 3.24, sortRank: 0, periodReturns: { '1M': -4.7, '6M': 11.9, '1Y': 39.7 },
      priceHistory: { '1W': [188.96, 183, 194.68, 193.45, 195.09], '1M': [204.72, 201.94, 197.33, 202.66, 202.52, 202.91, 204.38, 198.95, 199.27, 195.88, 188.39, 187.26, 184.72, 190.76, 185.95, 187.46, 188.96, 183, 194.68, 193.45, 195.09], '6M': [174.37, 178.41, 174.36, 192.24, 204.08, 206.33, 210.18, 187.42, 196.9, 206.44, 205.98, 195.23, 194.13, 210.12, 205.09, 214.98, 229.57, 235.78, 223.15, 216.31, 205.33, 204.72, 202.91, 188.39, 187.46, 195.09], '1Y': [139.67, 142.31, 140.37, 137.56, 139.85, 143.37, 150.28, 182, 179.51, 165.76, 166.52, 160.95, 166.13, 168.38, 175.02, 187.18, 191.39, 202.46, 205.24, 207.62, 200.39, 195.65, 175.91, 175.26, 174.71, 179.65, 173.2, 177.62, 172.84, 193.2, 213.25, 207.75, 205.43, 197.19, 200.4, 198.38, 205.98, 195.23, 194.13, 199.75, 202.59, 215.98, 232.83, 228.24, 222.07, 216.68, 205.33, 204.72, 202.91, 188.39, 187.46, 195.09] },
      velocityScore: { '1D': -1.1, '1W': 3.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 52, revenueGrowth: 26, eps: 3.75, grossMargin: 23, dividendYield: 0.54,
      etfPresence: { AIRR: 3.04, PRN: false, RSHO: false, IDEF: 1.66, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 2, proScore: 0.8, coverage: 0.4,
      price: 58, weeklyPrices: [56.19, 54.82, 58.78, 57.75, 58.00], weeklyChange: 3.21, sortRank: 0, periodReturns: { '1M': 11.3, '6M': -21.9, '1Y': 40.7 },
      priceHistory: { '1W': [56.19, 54.82, 58.78, 57.75, 58], '1M': [52.09, 54.22, 53.47, 55.82, 54.67, 56.18, 56.8, 57.3, 65.19, 64.13, 63.49, 63.27, 58.43, 63.4, 58.52, 57.73, 56.19, 54.82, 58.78, 57.75, 58], '6M': [74.26, 81.53, 75.98, 91.44, 121.5, 113.85, 108.16, 85.25, 87.05, 96.08, 86.18, 87, 87.53, 92.78, 75.86, 67.31, 70.34, 70.99, 61.26, 62.05, 57.89, 52.09, 56.18, 63.49, 57.73, 58], '1Y': [41.21, 40.77, 43.07, 46.02, 54.28, 58.78, 57.09, 59.4, 69.14, 64.02, 68.05, 64.5, 65.66, 75.74, 81.18, 92.96, 103.69, 95.3, 90.62, 89.78, 90.22, 76.59, 70.36, 75.05, 72.78, 76.91, 73.13, 82.3, 75.91, 104.04, 124.56, 110.39, 103.01, 94.41, 89.06, 94.31, 86.18, 87, 87.53, 84.62, 71.94, 74.09, 73.55, 69.83, 63.16, 61.93, 57.89, 52.09, 56.18, 63.49, 57.73, 58] },
      velocityScore: { '1D': -2.4, '1W': -1.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 341.2, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.89, PRN: false, RSHO: false, IDEF: 1.1, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.88, proScore: 0.75, coverage: 0.4,
      price: 301.07, weeklyPrices: [297.52, 289.13, 300.95, 297.68, 301.07], weeklyChange: 1.19, sortRank: 0, periodReturns: { '1M': -7.7, '6M': -8.5, '1Y': 31.3 },
      priceHistory: { '1W': [297.52, 289.13, 300.95, 297.68, 301.07], '1M': [326.17, 329.35, 324.6, 321.92, 317.55, 320.63, 320.95, 317.56, 320.9, 308.17, 296.41, 293.66, 287.54, 294.53, 293.04, 292.26, 297.52, 289.13, 300.95, 297.68, 301.07], '6M': [329.16, 353.52, 341.98, 356.45, 415.39, 424.14, 427.83, 369.38, 406.76, 437.57, 444.52, 429.11, 415.71, 418.42, 384.79, 396.62, 394.41, 394.81, 359.29, 360.6, 316.28, 326.17, 320.63, 296.41, 292.26, 301.07], '1Y': [229.26, 231.63, 246.31, 248.92, 253.82, 265.56, 260.84, 270.92, 268, 265.4, 271.74, 269.33, 271.93, 272.46, 277.51, 286.01, 285.38, 291.94, 287.53, 299.14, 315.9, 324.19, 309.16, 314.73, 309.23, 323.14, 326.8, 354.52, 340.07, 378.47, 418.86, 418.58, 420.51, 397.77, 418.78, 438.01, 444.52, 429.11, 415.71, 407.98, 381.79, 407.66, 394.46, 392.19, 358.4, 363.37, 316.28, 326.17, 320.63, 296.41, 292.26, 301.07] },
      velocityScore: { '1D': -1.3, '1W': 1.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 19.6, revenueGrowth: 13, eps: 15.39, grossMargin: 12, dividendYield: 1.85,
      etfPresence: { AIRR: 2.68, PRN: false, RSHO: false, IDEF: 1.07, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 2, avgWeight: 1.77, proScore: 0.71, coverage: 0.4,
      price: 30.58, weeklyPrices: [31.17, 30.72, 34.17, 31.15, 30.58], weeklyChange: -1.89, sortRank: 0, periodReturns: { '1M': -26.5, '6M': 69.4, '1Y': 472.7 },
      priceHistory: { '1W': [31.17, 30.72, 34.17, 31.15, 30.58], '1M': [41.62, 41.61, 41.59, 42.66, 42.48, 44.35, 48.32, 50.48, 51.4, 51.14, 46.46, 48.09, 43.13, 43.53, 32.22, 32.74, 31.17, 30.72, 34.17, 31.15, 30.58], '6M': [18.05, 20.6, 19.74, 22.61, 26.73, 26.06, 26.35, 20.43, 21.3, 23.9, 24.14, 25.28, 24.79, 26.96, 32.4, 35.88, 34.67, 38.48, 35.44, 36.9, 39.04, 41.62, 44.35, 46.46, 32.74, 30.58], '1Y': [5.34, 5.57, 6.16, 6.85, 6.45, 6.86, 6.19, 6.39, 6.65, 6.38, 6.98, 6.44, 8.97, 10.23, 11.93, 13.77, 15.68, 14.78, 12.91, 12.84, 12.7, 12.47, 11.45, 11.73, 12.01, 12.94, 17.88, 20.73, 19.72, 22.44, 28.28, 26.94, 24.97, 22.26, 22.42, 23.78, 24.14, 25.28, 24.79, 33.83, 30.86, 35.02, 34.32, 37.5, 35.45, 38.54, 39.04, 41.62, 44.35, 46.46, 32.74, 30.58] },
      velocityScore: { '1D': -15.5, '1W': -21.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: null, revenueGrowth: 42, eps: -1.16, grossMargin: 56, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 3.38, RSHO: false, IDEF: 0.17, BILT: false },
      tonyNote: 'Planet Labs is a satellite earth observation company. It holds a speculative position in Industrials ETFs as a data infrastructure name — providing satellite imagery and analytics that support agricultural, energy, and government decision-making. Revenue is growing from a small base; the ETF weight is minimal and the position is thematic.',
    },
    {
      ticker: 'WMB', name: 'WMB', easyScore: 2, avgWeight: 1.38, proScore: 0.55, coverage: 0.4,
      price: 71.75, weeklyPrices: [71.59, 72.26, 71.62, 72.08, 71.75], weeklyChange: 0.22, sortRank: 0, periodReturns: { '1M': -7.7, '6M': 20.6, '1Y': 21.3 },
      priceHistory: { '1W': [71.59, 72.26, 71.62, 72.08, 71.75], '1M': [77.72, 77.69, 79.4, 77.88, 77.52, 78.47, 76.34, 74.37, 73.13, 71.39, 70.04, 71.31, 71.66, 72.43, 71.96, 71.59, 71.59, 72.26, 71.62, 72.08, 71.75], '6M': [59.48, 58.92, 60.16, 60.39, 60.71, 63.72, 67.24, 67.42, 71.13, 72.98, 74.72, 74.24, 73.34, 74.06, 74.06, 72, 72.74, 71.15, 72.18, 75.54, 71.96, 77.72, 78.47, 70.04, 71.59, 71.75], '1Y': [59.15, 61.12, 58.72, 57.85, 58.48, 57.71, 58.89, 59, 57.76, 56.57, 57.13, 57.73, 58.76, 59.02, 62.86, 63.69, 63.97, 62.36, 62.34, 57.59, 56.51, 60.6, 59.17, 59.37, 61.55, 60.5, 58.41, 59.75, 60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 72.28, 72.98, 74.72, 74.24, 73.34, 72.41, 73.58, 72.59, 71.54, 70.91, 71.61, 75.41, 71.96, 77.72, 78.47, 70.04, 71.59, 71.75] },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$88B', pe: 31.5, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.91,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.95, IDEF: false, BILT: 1.8 },
      tonyNote: 'WMB appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.18, proScore: 0.47, coverage: 0.4,
      price: 119.63, weeklyPrices: [108.82, 106.81, 119.32, 120.30, 119.63], weeklyChange: 9.93, sortRank: 0, periodReturns: { '1M': 30, '6M': 60.6, '1Y': 141.5 },
      priceHistory: { '1W': [108.82, 106.81, 119.32, 120.3, 119.63], '1M': [92.03, 93.39, 92.8, 94.81, 96.36, 98.55, 99.32, 97.11, 108.11, 111.7, 111.28, 112.87, 111.59, 117.82, 111.27, 110.94, 108.82, 106.81, 119.32, 120.3, 119.63], '6M': [74.49, 73.51, 73.85, 84.8, 98.62, 99.48, 98.29, 79.07, 80.25, 87.63, 89.03, 86.42, 78.16, 77.81, 76.16, 74.22, 79.6, 84.05, 77.99, 78.55, 90.34, 92.03, 98.55, 111.28, 110.94, 119.63], '1Y': [49.53, 49.96, 50.63, 52.4, 51.68, 52.91, 51.88, 54.24, 68.02, 64.22, 67.64, 67.47, 71.7, 73.82, 74.27, 81.18, 83.47, 77.76, 78.81, 77.6, 75.71, 72.74, 67.94, 69.05, 70.23, 75.19, 71.8, 75.07, 73.01, 88.74, 102.95, 99.05, 93.88, 82.2, 82.36, 85.9, 89.03, 86.42, 78.16, 77.26, 71.4, 75.76, 82.52, 84.12, 77.06, 78.53, 90.34, 92.03, 98.55, 111.28, 110.94, 119.63] },
      velocityScore: { '1D': 0, '1W': 11.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.26, PRN: false, RSHO: false, IDEF: 1.09, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.14, proScore: 0.45, coverage: 0.4,
      price: 617.77, weeklyPrices: [592.41, 576.74, 607.46, 603.64, 617.77], weeklyChange: 4.28, sortRank: 0, periodReturns: { '1M': 8.6, '6M': 33.5, '1Y': 67.4 },
      priceHistory: { '1W': [592.41, 576.74, 607.46, 603.64, 617.77], '1M': [569.06, 551.12, 565.22, 571.05, 566.96, 559.95, 584.4, 577.42, 577.83, 571.96, 566.14, 578.34, 584.18, 589.76, 590.09, 590.97, 592.41, 576.74, 607.46, 603.64, 617.77], '6M': [462.59, 459.83, 452.89, 467.37, 489.33, 504.99, 511.98, 520.16, 550.4, 559.18, 575.92, 552.91, 536.37, 540.83, 548.95, 548.11, 598.3, 589.77, 589.51, 595.76, 605.99, 569.06, 559.95, 566.14, 590.97, 617.77], '1Y': [369.08, 388.19, 381.43, 379.82, 389.57, 389.3, 385.08, 403.78, 404.99, 397.81, 399, 383.6, 378.08, 379.79, 378.54, 384.8, 373.47, 383.98, 392.33, 408.15, 427.24, 442.47, 423.39, 442.95, 438.15, 447.58, 451.17, 457.07, 448.43, 485, 497.06, 504.07, 499.67, 544.02, 552.44, 562.54, 575.92, 552.91, 536.37, 531.11, 532.25, 552.4, 595.74, 596.86, 591, 593.12, 605.99, 569.06, 559.95, 566.14, 590.97, 617.77] },
      velocityScore: { '1D': -2.2, '1W': -22.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 67.8, revenueGrowth: 18, eps: 9.11, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.79, PRN: false, RSHO: false, IDEF: 0.48, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 1.03, proScore: 0.41, coverage: 0.4,
      price: 47.53, weeklyPrices: [48.37, 45.87, 49.58, 47.83, 47.53], weeklyChange: -1.73, sortRank: 0, periodReturns: { '1M': -24.3, '6M': -30.2, '1Y': 0 },
      priceHistory: { '1W': [48.37, 45.87, 49.58, 47.83, 47.53], '1M': [62.77, 66.21, 64.2, 65.76, 65.3, 64.1, 60.66, 63.52, 65.86, 57.5, 53.65, 54.65, 51.84, 54.39, 49.44, 49.64, 48.37, 45.87, 49.58, 47.83, 47.53], '6M': [68.06, 78.87, 74.62, 91.72, 108.01, 111.61, 110.93, 89.78, 78.71, 81.62, 88.11, 100.54, 99.98, 105.95, 86.01, 85.83, 82.52, 83.58, 70.22, 65.73, 60.84, 62.77, 64.1, 53.65, 49.64, 47.53], '1Y': [47.51, 48.28, 44.91, 47.57, 53.74, 49.1, 51.41, 50.39, 49.03, 49.87, 54.69, 53.26, 62.22, 64.11, 66.91, 73.47, 75.2, 77, 78.99, 85.34, 84.7, 69.38, 58.95, 64.96, 66.08, 67.27, 67.19, 79.98, 73.17, 101.28, 109.49, 108.22, 103.8, 95.36, 75.79, 81.27, 88.11, 100.54, 99.98, 99.38, 84.07, 86.1, 87.79, 82.69, 71.95, 65.32, 60.84, 62.77, 64.1, 53.65, 49.64, 47.53] },
      velocityScore: { '1D': -4.7, '1W': -10.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 206.7, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.86, PRN: false, RSHO: false, IDEF: 0.19, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.61, proScore: 0.24, coverage: 0.4,
      price: 46.82, weeklyPrices: [47.35, 46.11, 49.69, 48.53, 46.82], weeklyChange: -1.12, sortRank: 0, periodReturns: { '1M': 12.8, '6M': 39, '1Y': 7.2 },
      priceHistory: { '1W': [47.35, 46.11, 49.69, 48.53, 46.82], '1M': [41.5, 42.84, 42.81, 44.56, 44.55, 44.92, 45.8, 45.35, 48.41, 48.76, 47.96, 47.39, 45.61, 46.71, 46.15, 46.55, 47.35, 46.11, 49.69, 48.53, 46.82], '6M': [33.68, 34.77, 34.09, 37.2, 41.42, 41.28, 41.3, 37.27, 37.77, 40.03, 43.39, 46.58, 45.3, 45.48, 46.53, 46.3, 46.06, 44.57, 39.98, 40.03, 41.36, 41.5, 44.92, 47.96, 46.55, 46.82], '1Y': [43.66, 43.12, 45.09, 47.01, 48.01, 47.53, 48.2, 41.48, 41.87, 41.17, 41.93, 41.79, 41.14, 41.54, 42.55, 44.58, 44.72, 43.85, 40.35, 40.18, 36.15, 35.59, 34, 33.78, 33.79, 34.02, 33.12, 34.62, 34.09, 38.84, 42.26, 40.99, 41.06, 38.93, 38.13, 38.14, 43.39, 46.58, 45.3, 43.82, 44.84, 46.73, 47.43, 44.24, 40.72, 40, 41.36, 41.5, 44.92, 47.96, 46.55, 46.82] },
      velocityScore: { '1D': -4, '1W': 4.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 43.8, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.74,
      etfPresence: { AIRR: 0.9, PRN: false, RSHO: false, IDEF: 0.32, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.35, proScore: 0.14, coverage: 0.4,
      price: 76.67, weeklyPrices: [71.48, 68.72, 73.61, 74.92, 76.67], weeklyChange: 7.27, sortRank: 0, periodReturns: { '1M': -3.5, '6M': 13.1, '1Y': 79.6 },
      priceHistory: { '1W': [71.48, 68.72, 73.61, 74.92, 76.67], '1M': [79.49, 75.43, 74.91, 76.99, 74.88, 72.76, 74.67, 74.47, 73.27, 71.49, 74.26, 74.29, 72.26, 72.38, 70.53, 72.13, 71.48, 68.72, 73.61, 74.92, 76.67], '6M': [67.81, 69.57, 67.92, 71.09, 73.89, 76.79, 79.86, 79.95, 81.73, 86.9, 75.37, 72.82, 67.76, 72.31, 76.24, 77.3, 83.35, 84.22, 86.76, 93.68, 82.85, 79.49, 72.76, 74.26, 72.13, 76.67], '1Y': [42.7, 44.53, 46.36, 47.45, 50.77, 49.17, 46.91, 47.66, 58.77, 56.02, 58.99, 59.03, 62.46, 63.62, 64.78, 63.75, 61.61, 63.27, 66.87, 68.4, 65.72, 62.63, 60.48, 65.16, 67.63, 67.56, 69.46, 68.65, 67.02, 70.17, 75.17, 76.01, 78.89, 83.48, 82.74, 84.99, 75.37, 72.82, 67.76, 69.34, 76.15, 77.66, 83.8, 84.38, 87.5, 92.76, 82.85, 79.49, 72.76, 74.26, 72.13, 76.67] },
      velocityScore: { '1D': 0, '1W': 7.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 52.5, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.32,
      etfPresence: { AIRR: 0.66, PRN: false, RSHO: false, IDEF: 0.03, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'Timken Company', easyScore: 1, avgWeight: 9.3, proScore: 1.86, coverage: 0.2,
      price: 140.4, weeklyPrices: [137.09, 132.39, 137.40, 137.06, 140.40], weeklyChange: 2.41, sortRank: 0, periodReturns: { '1M': 22.6, '6M': 61.4, '1Y': 96 },
      priceHistory: { '1W': [137.09, 132.39, 137.4, 137.06, 140.4], '1M': [114.49, 112.73, 109.36, 117.2, 118.93, 119.95, 127.42, 127.16, 126.78, 127.98, 126.54, 131.9, 131.82, 133.66, 131.83, 134.67, 137.09, 132.39, 137.4, 137.06, 140.4], '6M': [87.01, 86.34, 85.81, 88.05, 91.91, 94.6, 94.15, 102.15, 107.35, 108.16, 108.38, 99.68, 97.54, 97.44, 99.06, 98.92, 106.75, 107.66, 107.2, 109, 117.97, 114.49, 119.95, 126.54, 134.67, 140.4], '1Y': [71.63, 73.62, 75.44, 77.68, 76.68, 80.99, 80.98, 74.65, 76.91, 76.88, 78.96, 75.12, 76.4, 77.11, 75.67, 75.11, 75.83, 74.28, 77.3, 77.22, 76.29, 78.2, 74.33, 81.22, 82.52, 87.53, 85.77, 86.09, 84.13, 90.6, 93.73, 93.94, 93.19, 106.04, 107.84, 107.83, 108.38, 99.68, 97.54, 95.25, 97.56, 98.94, 106.9, 108.45, 108.7, 107.12, 117.97, 114.49, 119.95, 126.54, 134.67, 140.4] },
      velocityScore: { '1D': 0, '1W': 3.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 31.9, revenueGrowth: 8, eps: 4.4, grossMargin: 31, dividendYield: 1.05,
      etfPresence: { AIRR: false, PRN: false, RSHO: 9.3, IDEF: false, BILT: false },
      tonyNote: 'Timken Company appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 9.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 7.94, proScore: 1.59, coverage: 0.2,
      price: 186.09, weeklyPrices: [181.56, 177.41, 184.21, 183.53, 186.09], weeklyChange: 2.5, sortRank: 0, periodReturns: { '1M': 8.7, '6M': 2.2, '1Y': 27.1 },
      priceHistory: { '1W': [181.56, 177.41, 184.21, 183.53, 186.09], '1M': [171.18, 175.95, 174.49, 174.85, 175.98, 177.01, 178.97, 176.59, 178.96, 179.66, 174.41, 174.26, 172.55, 179.41, 180.99, 178.66, 181.56, 177.41, 184.21, 183.53, 186.09], '6M': [182.11, 185.68, 184.01, 185.73, 198.84, 196.34, 199.88, 195.97, 201.14, 204.92, 202.62, 209.76, 204.52, 200.73, 192.85, 196.21, 201.56, 196.42, 174.26, 173.99, 176.09, 171.18, 177.01, 174.41, 178.66, 186.09], '1Y': [146.46, 141.85, 144.19, 146.18, 150.17, 156.49, 157.12, 156.33, 155.49, 153.66, 159.57, 158.11, 155, 158.31, 161.38, 167.2, 169.27, 159.4, 173.04, 178.67, 175.61, 179.22, 174.72, 172.15, 168.45, 174.72, 179.93, 185.76, 183.4, 187.17, 199.83, 195.93, 200.93, 198.66, 200.06, 201.92, 202.62, 209.76, 204.52, 198.16, 189.71, 198.41, 201.41, 195.79, 173.38, 172.9, 176.09, 171.18, 177.01, 174.41, 178.66, 186.09] },
      velocityScore: { '1D': 0, '1W': 2.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$251B', pe: 35, revenueGrowth: 9, eps: 5.32, grossMargin: 20, dividendYield: 1.51,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 7.94, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 7.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.45, proScore: 4.45, coverage: 1,
      price: 261.76, weeklyPrices: [220.12, 211.69, 222.24, 232.36, 261.76], weeklyChange: 18.92, sortRank: 0, periodReturns: { '1M': 19, '6M': 222.6, '1Y': 418.7 },
      priceHistory: { '1W': [220.12, 211.69, 222.24, 232.36, 261.76], '1M': [219.94, 199.86, 197.73, 191.82, 219.93, 214.77, 208.06, 208.37, 226.34, 231.09, 264.51, 260.58, 251.68, 259.67, 227.81, 218, 220.12, 211.69, 222.24, 232.36, 261.76], '6M': [81.14, 93.23, 85.17, 96.21, 101.98, 96.85, 94.91, 73.87, 89.73, 97.92, 91.19, 89.33, 112.95, 121.52, 105.97, 108.82, 144.97, 157.14, 147.16, 154.49, 177.05, 219.94, 214.77, 264.51, 218, 261.76], '1Y': [50.46, 51.02, 50.31, 46.05, 53.31, 51.88, 50.4, 55.17, 75.33, 67.19, 70.48, 65.65, 93.39, 94.08, 113.23, 115.61, 117.7, 128.15, 104.28, 121.83, 110.54, 102.22, 90.54, 88.88, 98.92, 93.59, 80.95, 90.03, 83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 98.01, 100.61, 91.19, 89.33, 112.95, 117.62, 100.82, 112.54, 154.56, 159.16, 144.96, 176.42, 177.05, 219.94, 214.77, 264.51, 218, 261.76] },
      velocityScore: { '1D': 2.1, '1W': -4.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 101.5, revenueGrowth: 684, eps: 2.58, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 3.06, MEME: 5.47, RKNG: 4.82 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 3, avgWeight: 3.95, proScore: 3.95, coverage: 1,
      price: 89.66, weeklyPrices: [88.71, 87.32, 97.56, 82.41, 89.66], weeklyChange: 1.07, sortRank: 0, periodReturns: { '1M': 7.2, '6M': 32.2, '1Y': 113.9 },
      priceHistory: { '1W': [88.71, 87.32, 97.56, 82.41, 89.66], '1M': [83.67, 86.83, 88.1, 89.58, 96.23, 105.86, 119.7, 129.6, 133.09, 113.41, 105.65, 118.17, 107.73, 107.29, 93.6, 92.06, 88.71, 87.32, 97.56, 82.41, 89.66], '6M': [67.81, 86.48, 74.68, 85.73, 95.22, 116.37, 122.09, 93.27, 82.22, 80.2, 79.19, 89.47, 86.34, 94.09, 87.86, 92.62, 94.9, 85.53, 76.4, 70.89, 75.05, 83.67, 105.86, 105.65, 92.06, 89.66], '1Y': [41.91, 53.22, 45.11, 42.5, 52.63, 58.92, 53.09, 52.57, 49.76, 44.95, 50.43, 45.22, 37.58, 41.19, 54.5, 56.94, 74.75, 94.5, 78.61, 77.77, 70.05, 67.89, 58.22, 55.51, 61.44, 79.05, 68.37, 85.67, 72.63, 90.56, 101.25, 113.57, 111.21, 101.79, 82.51, 83.9, 79.19, 89.47, 86.34, 89.93, 78.67, 94.81, 98.97, 81, 77.2, 68.43, 75.05, 83.67, 105.86, 105.65, 92.06, 89.66] },
      velocityScore: { '1D': 2.1, '1W': -2.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$35B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 3.59, MEME: 5.67, RKNG: 2.6 },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 3, avgWeight: 3.88, proScore: 3.88, coverage: 1,
      price: 61.85, weeklyPrices: [54.02, 51.52, 56.71, 59.77, 61.85], weeklyChange: 14.49, sortRank: 0, periodReturns: { '1M': 16.8, '6M': 74.3, '1Y': 494.7 },
      priceHistory: { '1W': [54.02, 51.52, 56.71, 59.77, 61.85], '1M': [52.94, 50.46, 47.74, 52.71, 58.06, 56.83, 59.78, 67.84, 64.05, 63.54, 65.33, 66.6, 65.48, 61.86, 54.35, 59.19, 54.02, 51.52, 56.71, 59.77, 61.85], '6M': [35.48, 42.04, 38.3, 43.63, 52.88, 52.26, 59.84, 39.79, 40.03, 39.98, 40.95, 36.7, 41.58, 41.66, 37.45, 34.77, 39.32, 48.12, 50.64, 45.66, 61.2, 52.94, 56.83, 65.33, 59.19, 61.85], '1Y': [10.4, 11.54, 15.23, 16.96, 17.31, 18.99, 15.79, 16.45, 17.83, 18.73, 22.99, 28.21, 33.63, 37.9, 47.14, 47.08, 61.68, 69.56, 55.19, 62.42, 66.63, 57.38, 48.85, 47.47, 43.96, 43.92, 36.59, 42.07, 37.77, 45.68, 51.89, 56.68, 53.74, 41.83, 42.22, 42.36, 40.95, 36.7, 41.58, 41.29, 35.09, 35.13, 43.07, 48.72, 48.36, 49.48, 61.2, 52.94, 56.83, 65.33, 59.19, 61.85] },
      velocityScore: { '1D': 39.1, '1W': 36.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$22B', pe: 80.3, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 2.95, MEME: 5.52, RKNG: 3.18 },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 3, avgWeight: 3.7, proScore: 3.7, coverage: 1,
      price: 46.84, weeklyPrices: [41.91, 38.92, 41.47, 42.70, 46.84], weeklyChange: 11.76, sortRank: 0, periodReturns: { '1M': 10.1, '6M': 103.8, '1Y': 305.5 },
      priceHistory: { '1W': [41.91, 38.92, 41.47, 42.7, 46.84], '1M': [42.56, 39.14, 36.62, 39.52, 48.02, 45.87, 45.14, 48.98, 49.65, 47.28, 47.94, 47.86, 44.71, 44.15, 39.62, 40.94, 41.91, 38.92, 41.47, 42.7, 46.84], '6M': [22.98, 27.78, 24.08, 29.56, 36.1, 34.74, 38.07, 27.84, 36.17, 29.04, 27.27, 25.14, 27.05, 26.7, 25.72, 24.56, 26.26, 31.53, 34.98, 33.55, 41.25, 42.56, 45.87, 47.94, 40.94, 46.84], '1Y': [11.55, 10.32, 9.76, 9.51, 10.06, 10.93, 10.12, 14.89, 14.97, 15.34, 16.47, 14.38, 16.98, 19.83, 23.45, 25, 27.3, 35.04, 32.54, 34.33, 31.06, 28.57, 22.84, 23.74, 29.36, 30.99, 24.24, 26.08, 24.52, 31.94, 35.22, 37.69, 33.88, 34.95, 35.28, 30, 27.27, 25.14, 27.05, 25.93, 23.76, 25.19, 27.6, 32.19, 33.67, 35.63, 41.25, 42.56, 45.87, 47.94, 40.94, 46.84] },
      velocityScore: { '1D': -1.6, '1W': 1.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.33, MEME: 5.09, RKNG: 3.67 },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab', easyScore: 3, avgWeight: 3.68, proScore: 3.68, coverage: 1,
      price: 109.84, weeklyPrices: [108.23, 105.05, 114.78, 102.39, 109.84], weeklyChange: 1.49, sortRank: 0, periodReturns: { '1M': -12, '6M': 98.2, '1Y': 313.7 },
      priceHistory: { '1W': [108.23, 105.05, 114.78, 102.39, 109.84], '1M': [124.77, 131.16, 127.31, 134.28, 125.45, 135.76, 143.2, 150.23, 148.03, 143.48, 122.39, 123.32, 114.7, 119.95, 110.08, 113.65, 108.23, 105.05, 114.78, 102.39, 109.84], '6M': [55.41, 77.55, 70.45, 84.08, 91.8, 87.98, 85.68, 66.32, 66.01, 70.86, 69.1, 70.11, 68.41, 71.93, 65.94, 67.73, 68.05, 84.8, 79.68, 78.81, 105.47, 124.77, 135.76, 122.39, 113.65, 109.84], '1Y': [26.55, 33.46, 34.33, 39.14, 47.69, 49.15, 43.79, 44.75, 43.43, 40.92, 48.13, 43.53, 46.17, 48.08, 48.69, 47.97, 61.51, 68.03, 65.4, 63.75, 56.57, 51.24, 42.78, 42.6, 44.72, 57.52, 55.49, 77.18, 69.76, 83.08, 90.76, 88.9, 80.07, 72.32, 67.44, 70.21, 69.1, 70.11, 68.41, 67.23, 60.93, 67.67, 70.62, 89.46, 82.29, 80.31, 105.47, 124.77, 135.76, 122.39, 113.65, 109.84] },
      velocityScore: { '1D': 2.5, '1W': 2.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$69B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 2.03, MEME: 5.07, RKNG: 3.95 },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 6.03, proScore: 4.02, coverage: 0.667,
      price: 2105.05, weeklyPrices: [1646.54, 1643.23, 1881.51, 1980.10, 2105.05], weeklyChange: 27.85, sortRank: 0, periodReturns: { '1M': 49.5, '6M': 942.8, '1Y': 4661.5 },
      priceHistory: { '1W': [1646.54, 1643.23, 1881.51, 1980.1, 2105.05], '1M': [1407.61, 1333.01, 1383.29, 1392.56, 1542.24, 1478.69, 1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1831.5, 1759.68, 1559.32, 1642, 1646.54, 1643.23, 1881.51, 1980.1, 2105.05], '6M': [201.87, 241.05, 240.22, 353.56, 387.81, 503.44, 539.3, 576.2, 630.29, 649.97, 635.36, 527.33, 661.62, 772.09, 603.17, 701.59, 851.77, 920.99, 989.9, 1187, 1562.34, 1407.61, 1478.69, 1761.43, 1642, 2105.05], '1Y': [44.21, 47.34, 44.96, 46.2, 41.36, 43, 42.93, 41.93, 46.83, 44.58, 47.35, 53.01, 73.92, 93.97, 99.83, 121.12, 120.95, 127.29, 149.29, 175.53, 194.57, 271.58, 244.93, 220.5, 194.38, 232.86, 209.31, 244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1562.34, 1407.61, 1478.69, 1761.43, 1642, 2105.05] },
      velocityScore: { '1D': -2, '1W': 8.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$312B', pe: 71.8, revenueGrowth: 251, eps: 29.31, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.64, RKNG: 6.41 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 2, avgWeight: 5.86, proScore: 3.9, coverage: 0.667,
      price: 193.37, weeklyPrices: [162.88, 175.13, 172.78, 169.05, 193.37], weeklyChange: 18.72, sortRank: 0, periodReturns: { '1M': 1.6, '6M': 546.7, '1Y': 1031.5 },
      priceHistory: { '1W': [162.88, 175.13, 172.78, 169.05, 193.37], '1M': [190.36, 173.26, 171.33, 165.26, 176.81, 181.49, 177.62, 179.83, 169.02, 158.41, 185.67, 202.37, 184.07, 202.89, 177, 196.64, 162.88, 175.13, 172.78, 169.05, 193.37], '6M': [29.9, 39.1, 36.02, 38.06, 34.47, 38.15, 39.57, 38.13, 43.99, 51.68, 84.23, 95.58, 96.81, 101.92, 97.42, 103.91, 150.6, 159.42, 162.17, 183.51, 148.94, 190.36, 181.49, 185.67, 196.64, 193.37], '1Y': [17.09, 23.29, 25.35, 27.92, 28.99, 26.31, 24.11, 21.42, 22.79, 22.77, 25.07, 23.02, 27.72, 29.47, 26.69, 28.42, 31.33, 28.48, 33.4, 36.87, 29.5, 23.75, 20.89, 22.73, 25.65, 34.98, 28.96, 40.64, 34.86, 33.01, 37, 35.72, 43.61, 44.3, 44.46, 53.96, 84.23, 95.58, 96.81, 87.54, 98.21, 107.45, 153.19, 163.47, 145.78, 172.98, 148.94, 190.36, 181.49, 185.67, 196.64, 193.37] },
      velocityScore: { '1D': 14.7, '1W': 6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$16B', pe: null, revenueGrowth: 51, eps: -0.64, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.09, RKNG: 4.62 },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 4.78, proScore: 3.18, coverage: 0.667,
      price: 276.27, weeklyPrices: [259.61, 234.23, 248.88, 260.22, 276.27], weeklyChange: 6.42, sortRank: 0, periodReturns: { '1M': 0.1, '6M': 208.4, '1Y': 1105.9 },
      priceHistory: { '1W': [259.61, 234.23, 248.88, 260.22, 276.27], '1M': [275.95, 258.71, 261.34, 282.31, 307.88, 302.49, 302.4, 293.8, 290.01, 285, 273.51, 302.85, 287.32, 291.37, 263.61, 253.57, 259.61, 234.23, 248.88, 260.22, 276.27], '6M': [89.58, 92.26, 87.26, 108, 133.46, 145.63, 156.51, 136.6, 139.03, 147.55, 155.67, 135.19, 154.51, 166.69, 133.52, 135.63, 166.7, 207.86, 231.17, 290.52, 261.03, 275.95, 302.49, 273.51, 253.57, 276.27], '1Y': [22.91, 22.95, 22.13, 28.71, 24.69, 26.89, 34.75, 37.61, 41.25, 43.1, 49.94, 52.45, 62.96, 79.67, 69.18, 90.19, 86.06, 114.06, 104.38, 113.28, 129.05, 127.07, 104.97, 94.29, 102.5, 101.29, 87.61, 91.43, 86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 155.67, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 261.03, 275.95, 302.49, 273.51, 253.57, 276.27] },
      velocityScore: { '1D': 77.7, '1W': -5.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$79B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.68, RKNG: 3.87 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 4.67, proScore: 3.12, coverage: 0.667,
      price: 1081.56, weeklyPrices: [935.89, 891.88, 995.87, 981.61, 1081.56], weeklyChange: 15.56, sortRank: 0, periodReturns: { '1M': 49.2, '6M': 355.4, '1Y': 802.5 },
      priceHistory: { '1W': [935.89, 891.88, 995.87, 981.61, 1081.56], '1M': [724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1079.57, 996, 864.01, 949.28, 935.89, 891.88, 995.87, 981.61, 1081.56], '6M': [237.5, 276.59, 292.63, 339.55, 333.35, 397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 370.3, 426.13, 444.27, 355.46, 366.24, 420.59, 455.07, 496.72, 542.21, 746.81, 724.66, 751, 1035.5, 949.28, 1081.56], '1Y': [119.84, 127.91, 120.89, 122.24, 116.43, 109.83, 111.96, 109.06, 127.75, 122.05, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 185.69, 187.06, 202.29, 221.91, 218.03, 241.11, 228.5, 224.53, 234.16, 263.71, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 746.81, 724.66, 751, 1035.5, 949.28, 1081.56] },
      velocityScore: { '1D': 1.6, '1W': 5.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 51, revenueGrowth: 196, eps: 21.2, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { BUZZ: 3.92, MEME: false, RKNG: 5.43 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 2, avgWeight: 4.38, proScore: 2.92, coverage: 0.667,
      price: 259, weeklyPrices: [234.32, 237.68, 264.76, 250.81, 259.00], weeklyChange: 10.53, sortRank: 0, periodReturns: { '1M': 50.4, '6M': 82.4, '1Y': 227.1 },
      priceHistory: { '1W': [234.32, 237.68, 264.76, 250.81, 259], '1M': [172.17, 156.27, 168.99, 182.98, 193.39, 218.41, 221.64, 221.23, 222.35, 236.03, 226.1, 229, 214.6, 217.5, 206.89, 222.27, 234.32, 237.68, 264.76, 250.81, 259], '6M': [142.02, 149.94, 144.92, 141, 156.84, 135.1, 129.47, 98.06, 121.78, 124.06, 112.27, 109.83, 117.69, 107.09, 96.44, 101.45, 119.59, 160.69, 195.04, 184.38, 188.51, 172.17, 218.41, 226.1, 222.27, 259], '1Y': [79.17, 91.92, 87.59, 97.59, 101.19, 98.41, 109.38, 110.29, 125.38, 106.3, 120.1, 124.77, 163.96, 164.44, 149.38, 144.91, 137.2, 129.75, 144.17, 162.18, 164.23, 158.5, 139.56, 154.18, 189.19, 157.98, 140.34, 147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 112.27, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 188.51, 172.17, 218.41, 226.1, 222.27, 259] },
      velocityScore: { '1D': -4.6, '1W': 16.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$48B', pe: 141.5, revenueGrowth: 157, eps: 1.83, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.57, RKNG: 5.19 },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 2, avgWeight: 3.46, proScore: 2.31, coverage: 0.667,
      price: 62.86, weeklyPrices: [56.69, 56.63, 57.99, 57.85, 62.86], weeklyChange: 10.88, sortRank: 0, periodReturns: { '1M': 21, '6M': 36.4, '1Y': 63.6 },
      priceHistory: { '1W': [56.69, 56.63, 57.99, 57.85, 62.86], '1M': [51.95, 49.31, 48.44, 52.47, 58.89, 63.64, 63.62, 65.4, 70.14, 72.07, 69.28, 71.4, 68.23, 65.66, 56.78, 62.8, 56.69, 56.63, 57.99, 57.85, 62.86], '6M': [46.07, 53.86, 45.31, 49.78, 50.88, 49.33, 43.24, 30.43, 31.3, 31.9, 38.37, 35.73, 32.98, 31.9, 29.84, 29.3, 28.79, 46.09, 42.69, 46.2, 49.24, 51.95, 63.64, 69.28, 62.8, 62.86], '1Y': [38.43, 40.86, 40.1, 45.56, 43.54, 43.28, 40.53, 42.02, 43, 36.8, 40.75, 40.97, 43.86, 65.44, 73.86, 63.09, 79.23, 77.55, 59.5, 57.15, 53.38, 54.42, 49.12, 47.06, 48.65, 51.67, 49.67, 51.39, 44.87, 50.45, 47.56, 47.25, 39.98, 34.99, 34.11, 30.78, 38.37, 35.73, 32.98, 31.2, 27.51, 29.24, 29.76, 48.32, 43.84, 45.75, 49.24, 51.95, 63.64, 69.28, 62.8, 62.86] },
      velocityScore: { '1D': null, '1W': -0.4, '1M': null, '6M': null }, isNew: true,
      marketCap: '$23B', pe: 161.2, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: 1.88, MEME: 5.05, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'RGTI', name: 'Rigetti Computing', easyScore: 2, avgWeight: 3.24, proScore: 2.16, coverage: 0.667,
      price: 23.25, weeklyPrices: [19.69, 19.44, 20.63, 20.98, 23.25], weeklyChange: 18.08, sortRank: 0, periodReturns: { '1M': 30.3, '6M': -1.2, '1Y': 91.2 },
      priceHistory: { '1W': [19.69, 19.44, 20.63, 20.98, 23.25], '1M': [17.85, 16.62, 15.96, 16.88, 22.04, 26.42, 25.07, 24.62, 27.03, 25.54, 25.63, 26.88, 24.09, 24.16, 20.68, 21.76, 19.69, 19.44, 20.63, 20.98, 23.25], '6M': [23.53, 26.88, 22.41, 25.21, 25.72, 24.96, 19.85, 14.98, 14.99, 15.92, 17.42, 17.01, 16.17, 15.41, 14.41, 14.19, 14.68, 19.81, 16.61, 17.5, 18.94, 17.85, 26.42, 25.63, 21.76, 23.25], '1Y': [12.16, 11.5, 11.33, 13.51, 16.56, 16.14, 14.47, 16.47, 16.2, 15.16, 15.3, 15.04, 16.19, 21.99, 31.64, 29.85, 43.91, 56.12, 40, 37.07, 35.18, 31.4, 25.71, 26.08, 26.04, 26.12, 23.96, 25.11, 22.15, 25.25, 24.7, 23.45, 18.17, 17.71, 16.09, 16.02, 17.42, 17.01, 16.17, 14.88, 13.32, 14.2, 15.13, 19.64, 16.91, 17.7, 18.94, 17.85, 26.42, 25.63, 21.76, 23.25] },
      velocityScore: { '1D': -5.3, '1W': -11.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$8B', pe: null, revenueGrowth: 199, eps: -0.89, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.39, RKNG: 3.08 },
      tonyNote: 'Rigetti Computing is a quantum hardware company using superconducting qubit technology. It holds a position in Meme ETFs alongside IonQ and D-Wave as part of the quantum computing basket. Revenue is minimal, the technology is earlier-stage than IonQ, and the ETF allocation is speculative. The weight score is low; this is a high-risk, long-duration positioning.',
    },
    {
      ticker: 'GOOGL', name: 'GOOGL', easyScore: 2, avgWeight: 2.27, proScore: 1.52, coverage: 0.667,
      price: 371.44, weeklyPrices: [364.26, 356.38, 357.77, 359.68, 371.44], weeklyChange: 1.97, sortRank: 0, periodReturns: { '1M': -6.4, '6M': 20.5, '1Y': 110.1 },
      priceHistory: { '1W': [364.26, 356.38, 357.77, 359.68, 371.44], '1M': [396.78, 396.94, 387.66, 388.91, 387.66, 382.97, 388.88, 388.83, 390.13, 380.34, 376.37, 361.85, 358.99, 372.19, 368.53, 363.31, 364.26, 356.38, 357.77, 359.68, 371.44], '6M': [308.22, 309.78, 313.85, 321.98, 335.84, 330.54, 338.25, 331.25, 309, 314.98, 311.76, 298.52, 302.28, 307.13, 280.92, 295.77, 317.24, 341.68, 344.4, 385.69, 400.8, 396.78, 382.97, 376.37, 363.31, 371.44], '1Y': [176.77, 166.77, 175.84, 176.62, 182.97, 190.23, 195.75, 194.67, 203.34, 201.57, 207.14, 230.66, 239.17, 249.53, 247.14, 244.9, 245.76, 245.45, 250.46, 267.47, 277.54, 291.31, 284.28, 323.44, 319.63, 320.21, 306.57, 314.35, 313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 311.49, 311.76, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 383.25, 400.8, 396.78, 382.97, 376.37, 363.31, 371.44] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$4.5T', pe: 28.4, revenueGrowth: 22, eps: 13.09, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { BUZZ: 1.55, MEME: false, RKNG: 3 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'RDW', name: 'Redwire', easyScore: 1, avgWeight: 6.26, proScore: 2.09, coverage: 0.333,
      price: 15.13, weeklyPrices: [15.75, 14.87, 17.09, 15.12, 15.13], weeklyChange: -3.9, sortRank: 0, periodReturns: { '1M': 7.6, '6M': 119.7, '1Y': -26.4 },
      priceHistory: { '1W': [15.75, 14.87, 17.09, 15.12, 15.13], '1M': [14.06, 13.96, 13.91, 14.77, 15.35, 17.49, 22.04, 24, 25.9, 24.57, 20.68, 20.58, 18.62, 21.43, 18.45, 18.57, 15.75, 14.87, 17.09, 15.12, 15.13], '6M': [6.89, 8.52, 7.94, 9.83, 11.02, 11.98, 12.81, 8.8, 7.89, 7.99, 9.07, 8.55, 9.59, 9.63, 8.87, 9.73, 9.29, 10.34, 9.68, 9.34, 11.07, 14.06, 17.49, 20.68, 18.57, 15.13], '1Y': [20.57, 16.53, 15.31, 15.78, 17.5, 16.92, 14.46, 14.71, 9.42, 8.84, 9.29, 8.32, 8.23, 7.87, 9.35, 9.16, 10.97, 9.54, 7.97, 7.85, 6.95, 6.13, 5.43, 5.41, 5.57, 7.48, 6.59, 8.01, 7.6, 10.28, 10.86, 12.52, 11.75, 10.04, 8.02, 8.12, 9.07, 8.55, 9.59, 9.2, 8.16, 9.91, 9.99, 10.21, 9.33, 8.64, 11.07, 14.06, 17.49, 20.68, 18.57, 15.13] },
      velocityScore: { '1D': 5.6, '1W': -5.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3B', pe: null, revenueGrowth: 58, eps: -2.59, grossMargin: 13, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.26, RKNG: false },
      tonyNote: 'Redwire Corp is a space infrastructure company — solar arrays, structures, and manufacturing in orbit. It appears in Meme and speculative ETFs as a high-risk space economy play. Revenue is growing from a small base but the business is pre-profitability; the ETF weight is minimal and reflects thematic positioning rather than fundamental conviction.',
    },
    {
      ticker: 'VSH', name: 'VSH', easyScore: 1, avgWeight: 5.61, proScore: 1.87, coverage: 0.333,
      price: 64.14, weeklyPrices: [58.58, 54.65, 58.60, 59.38, 64.14], weeklyChange: 9.49, sortRank: 0, periodReturns: { '1M': 72.3, '6M': 323.4, '1Y': 307.8 },
      priceHistory: { '1W': [58.58, 54.65, 58.6, 59.38, 64.14], '1M': [37.23, 36.95, 37.04, 40.16, 42.17, 47.25, 50.37, 48.9, 52.24, 52.05, 55.99, 62.49, 63.97, 63.67, 57.2, 57.22, 58.58, 54.65, 58.6, 59.38, 64.14], '6M': [15.15, 14.93, 14.78, 16.2, 17.05, 19.08, 20.17, 19.65, 19.38, 19.67, 18.72, 16.69, 17.23, 17.73, 17.47, 18.58, 22.47, 25.92, 28.19, 29.58, 34.26, 37.23, 47.25, 55.99, 57.22, 64.14], '1Y': [15.73, 15.51, 16.05, 17.61, 17.01, 17.62, 17.22, 16.01, 14.77, 14.79, 15.43, 14.97, 15.29, 15.18, 15.23, 15.42, 15.37, 16.04, 17.22, 17.49, 16.1, 14.23, 12.42, 13.3, 14.95, 15.8, 14.88, 14.96, 14.49, 16.08, 17.87, 18.45, 20.15, 19.95, 18.88, 19.32, 18.72, 16.69, 17.23, 16.65, 17.02, 18.76, 22.84, 26.33, 27.77, 30.57, 34.26, 37.23, 47.25, 55.99, 57.22, 64.14] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$9B', pe: 6414, revenueGrowth: 17, eps: 0.01, grossMargin: 20, dividendYield: 0.67,
      etfPresence: { BUZZ: false, MEME: 5.61, RKNG: false },
      tonyNote: 'VSH appears in 1 of 3 Meme ETFs (33% coverage) with average weight 5.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PL', name: 'PL', easyScore: 1, avgWeight: 5.22, proScore: 1.74, coverage: 0.333,
      price: 30.58, weeklyPrices: [31.17, 30.72, 34.17, 31.15, 30.58], weeklyChange: -1.89, sortRank: 0, periodReturns: { '1M': -26.5, '6M': 69.4, '1Y': 472.7 },
      priceHistory: { '1W': [31.17, 30.72, 34.17, 31.15, 30.58], '1M': [41.62, 41.61, 41.59, 42.66, 42.48, 44.35, 48.32, 50.48, 51.4, 51.14, 46.46, 48.09, 43.13, 43.53, 32.22, 32.74, 31.17, 30.72, 34.17, 31.15, 30.58], '6M': [18.05, 20.6, 19.74, 22.61, 26.73, 26.06, 26.35, 20.43, 21.3, 23.9, 24.14, 25.28, 24.79, 26.96, 32.4, 35.88, 34.67, 38.48, 35.44, 36.9, 39.04, 41.62, 44.35, 46.46, 32.74, 30.58], '1Y': [5.34, 5.57, 6.16, 6.85, 6.45, 6.86, 6.19, 6.39, 6.65, 6.38, 6.98, 6.44, 8.97, 10.23, 11.93, 13.77, 15.68, 14.78, 12.91, 12.84, 12.7, 12.47, 11.45, 11.73, 12.01, 12.94, 17.88, 20.73, 19.72, 22.44, 28.28, 26.94, 24.97, 22.26, 22.42, 23.78, 24.14, 25.28, 24.79, 33.83, 30.86, 35.02, 34.32, 37.5, 35.45, 38.54, 39.04, 41.62, 44.35, 46.46, 32.74, 30.58] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$11B', pe: null, revenueGrowth: 42, eps: -1.16, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.22, RKNG: false },
      tonyNote: 'Planet Labs is a satellite earth observation company. It holds a speculative position in Industrials ETFs as a data infrastructure name — providing satellite imagery and analytics that support agricultural, energy, and government decision-making. Revenue is growing from a small base; the ETF weight is minimal and the position is thematic.',
    },
    {
      ticker: 'QNT', name: 'QNT', easyScore: 1, avgWeight: 5.17, proScore: 1.72, coverage: 0.333,
      price: 59.49, weeklyPrices: [59.49], weeklyChange: 7.66, sortRank: 0, periodReturns: { '1M': 0, '6M': 0, '1Y': 0 },
      priceHistory: undefined,
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$2B', pe: null, revenueGrowth: -73, eps: -1.76, grossMargin: 74, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.17, RKNG: false },
      tonyNote: 'QNT appears in 1 of 3 Meme ETFs (33% coverage) with average weight 5.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'QBTS', name: 'D-Wave Quantum', easyScore: 1, avgWeight: 5.12, proScore: 1.71, coverage: 0.333,
      price: 26.98, weeklyPrices: [23.52, 23.25, 23.82, 23.37, 26.98], weeklyChange: 14.69, sortRank: 0, periodReturns: { '1M': 32.6, '6M': 13.6, '1Y': 68.6 },
      priceHistory: { '1W': [23.52, 23.25, 23.82, 23.37, 26.98], '1M': [20.35, 19.06, 18.19, 19.3, 25.74, 29.4, 27.82, 27.48, 29.49, 30.14, 29.18, 29.91, 27.55, 27.64, 23.85, 25.83, 23.52, 23.25, 23.82, 23.37, 26.98], '6M': [23.74, 32.19, 26.25, 30.2, 30.15, 27.43, 23.22, 17.21, 18.82, 18.06, 18.78, 18.59, 17.55, 16.1, 14.65, 14.32, 14.25, 21.69, 18.49, 20.49, 22.57, 20.35, 29.4, 29.18, 25.83, 26.98], '1Y': [16, 14.97, 14.82, 16.39, 16.91, 20.3, 17.67, 18.3, 18.51, 15.32, 15.45, 15.3, 16.04, 22.54, 27.72, 25.63, 35.72, 43.06, 32.19, 32, 29.74, 28.99, 22.93, 22.59, 25.08, 26.8, 25.52, 29.12, 26.15, 29.28, 28.72, 25.63, 21.22, 20.72, 19.67, 18.05, 18.78, 18.59, 17.55, 15.73, 13.9, 14.14, 14.65, 21.66, 18.8, 20.92, 22.57, 20.35, 29.4, 29.18, 25.83, 26.98] },
      velocityScore: { '1D': -1.7, '1W': -5.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: -81, eps: -1.14, grossMargin: 66, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.12, RKNG: false },
      tonyNote: 'D-Wave Quantum is a quantum computing company — the only publicly traded business built around quantum annealing hardware. Revenue is minimal and profitability is many years away, but it holds a position in Meme ETFs as the purest-play quantum computing stock available to retail investors. The ETF weight is small and the position is purely thematic.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 1, avgWeight: 4.59, proScore: 1.53, coverage: 0.333,
      price: 646.35, weeklyPrices: [517.72, 490.09, 529.29, 562.93, 646.35], weeklyChange: 24.85, sortRank: 0, periodReturns: { '1M': 34.1, '6M': 275.7, '1Y': 1025.8 },
      priceHistory: { '1W': [517.72, 490.09, 529.29, 562.93, 646.35], '1M': [482.02, 458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 594.11, 575.5, 511.72, 526.93, 517.72, 490.09, 529.29, 562.93, 646.35], '6M': [172.04, 176.76, 176.06, 199.88, 215, 243.29, 278.41, 260.19, 284.1, 285.52, 279.7, 245.25, 272.29, 316.93, 273.35, 294.97, 343.43, 372.52, 404, 431.52, 480, 482.02, 484.28, 546.2, 526.93, 646.35], '1Y': [57.41, 62.07, 63.84, 64.64, 66.53, 69.32, 70.61, 75.84, 75.91, 75.86, 79.71, 86, 95.02, 100.94, 109.69, 130.59, 119.93, 113.13, 121.41, 124.92, 152.18, 169.99, 152.86, 155.41, 155.59, 181.95, 174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 480, 482.02, 484.28, 546.2, 526.93, 646.35] },
      velocityScore: { '1D': -2.5, '1W': -1.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$223B', pe: 38.7, revenueGrowth: 46, eps: 16.72, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.59 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'AXTI', name: 'AXT Inc', easyScore: 1, avgWeight: 4.34, proScore: 1.45, coverage: 0.333,
      price: 114.5, weeklyPrices: [78.36, 85.29, 88.34, 97.18, 114.50], weeklyChange: 46.12, sortRank: 0, periodReturns: { '1M': -7.5, '6M': 672.1, '1Y': 5404.8 },
      priceHistory: { '1W': [78.36, 85.29, 88.34, 97.18, 114.5], '1M': [123.78, 105.88, 112.88, 104.61, 121.02, 140.83, 132.6, 122.77, 115.7, 103.16, 109.55, 110.85, 106.7, 105.99, 89.04, 90.78, 78.36, 85.29, 88.34, 97.18, 114.5], '6M': [14.83, 15.22, 15.8, 24.11, 22.1, 17.92, 16.38, 20.43, 24.79, 29.68, 37.9, 32.37, 48.86, 58.09, 58.51, 52.84, 64.18, 82.56, 76.16, 96, 116.36, 123.78, 140.83, 109.55, 90.78, 114.5], '1Y': [2.08, 2.02, 2.01, 2.54, 2.39, 2.52, 2.29, 2.05, 2.23, 2.14, 2.77, 3.08, 3.36, 3.94, 4.83, 4.91, 5.31, 4.57, 5.17, 6.6, 8.54, 10.56, 9.9, 9.23, 11.48, 15.51, 13, 14.64, 16.35, 25.83, 25.72, 17.4, 18.54, 24.06, 24.24, 28.43, 37.9, 32.37, 48.86, 54.24, 60.63, 41.99, 66.45, 78.76, 70.15, 106, 116.36, 123.78, 140.83, 109.55, 90.78, 114.5] },
      velocityScore: { '1D': -15.7, '1W': -19.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 39, eps: -0.32, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.34, RKNG: false },
      tonyNote: 'AXT Inc is a compound semiconductor substrate manufacturer — gallium arsenide, indium phosphide, and germanium wafers used in data center optical transceivers, 5G RF chips, and solar cells. Revenue is growing with optical networking demand. Small market cap but positioned at a genuine supply-chain chokepoint for III-V semiconductor materials.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
