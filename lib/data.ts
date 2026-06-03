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
export const SPY_RET: Record<Period, number> = { '1W': 1.2, '1M': 5.4, '6M': 11.5, '1Y': 27.4 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 8.2 }, { t: 'AMD', w: 4.5 }, { t: 'MRVL', w: 4.4 }, { t: 'VRT', w: 3.8 }, { t: 'SIMO', w: 3.6 }],
  ARTY: [{ t: 'MU', w: 7.5 }, { t: 'AMD', w: 7.1 }, { t: 'MRVL', w: 6.7 }, { t: 'CRWV', w: 4.7 }, { t: 'ORCL', w: 4.6 }],
  BAI: [{ t: 'MU', w: 5.9 }, { t: 'AVGO', w: 5.5 }, { t: 'AMD', w: 4.9 }, { t: 'NVDA', w: 4.6 }, { t: 'TSM', w: 4.3 }],
  IVEP: [{ t: 'BE', w: 5.4 }, { t: 'COHR', w: 4.3 }, { t: 'VRT', w: 4.2 }, { t: 'PWR', w: 4.2 }, { t: 'SBGSY', w: 4.2 }],
  IGPT: [{ t: 'MU', w: 12.4 }, { t: 'AMD', w: 7.0 }, { t: 'INTC', w: 6.3 }, { t: 'GOOGL', w: 6.0 }, { t: 'NVDA', w: 5.9 }],
  IVES: [{ t: 'MU', w: 5.9 }, { t: 'AVGO', w: 5.0 }, { t: 'TSM', w: 4.7 }, { t: 'NVDA', w: 4.6 }, { t: 'AMD', w: 4.6 }],
  ALAI: [{ t: 'NVDA', w: 13.0 }, { t: 'AMZN', w: 6.3 }, { t: 'GOOG', w: 6.1 }, { t: 'TSM', w: 5.5 }, { t: 'MSFT', w: 5.4 }],
  CHAT: [{ t: 'MU', w: 6.2 }, { t: 'NVDA', w: 6.0 }, { t: 'AMD', w: 5.5 }, { t: 'GOOGL', w: 5.3 }, { t: 'ARM', w: 4.7 }],
  AIFD: [{ t: 'NVDA', w: 6.7 }, { t: 'MU', w: 6.5 }, { t: 'AVGO', w: 6.1 }, { t: 'LITE', w: 6.0 }, { t: 'DOCN', w: 5.7 }],
  SPRX: [{ t: 'COHR', w: 8.5 }, { t: 'ARM', w: 7.7 }, { t: 'ALAB', w: 7.7 }, { t: 'KLAC', w: 5.9 }, { t: 'WULF', w: 5.5 }],
  AOTG: [{ t: 'AMD', w: 14.8 }, { t: 'NVDA', w: 10.8 }, { t: 'MU', w: 9.9 }, { t: 'TSM', w: 6.9 }, { t: 'APP', w: 5.2 }],
  SOXX: [{ t: 'MU', w: 12.3 }, { t: 'AMD', w: 9.3 }, { t: 'AVGO', w: 7.1 }, { t: 'MRVL', w: 6.6 }, { t: 'NVDA', w: 6.2 }],
  PSI: [{ t: 'MXL', w: 8.5 }, { t: 'MU', w: 8.2 }, { t: 'AMD', w: 7.8 }, { t: 'AVGO', w: 4.6 }, { t: 'TXN', w: 4.5 }],
  XSD: [{ t: 'MXL', w: 5.9 }, { t: 'ALAB', w: 3.9 }, { t: 'AMD', w: 3.8 }, { t: 'MU', w: 3.7 }, { t: 'MRVL', w: 3.7 }],
  DRAM: [{ t: 'SNDK', w: 5.0 }, { t: 'MU', w: 4.7 }, { t: 'STX', w: 4.2 }, { t: 'WDC', w: 3.6 }],
  PTF: [{ t: 'SNDK', w: 7.8 }, { t: 'MU', w: 5.0 }, { t: 'STX', w: 4.8 }, { t: 'WDC', w: 4.7 }, { t: 'NVDA', w: 4.6 }],
  WCLD: [{ t: 'DOCN', w: 3.2 }, { t: 'DDOG', w: 2.8 }, { t: 'FROG', w: 2.8 }, { t: 'PANW', w: 2.4 }, { t: 'CRWD', w: 2.4 }],
  IGV: [{ t: 'ORCL', w: 10.3 }, { t: 'MSFT', w: 7.7 }, { t: 'PANW', w: 7.6 }, { t: 'PLTR', w: 7.2 }, { t: 'CRWD', w: 6.3 }],
  FDTX: [{ t: 'MU', w: 9.4 }, { t: 'MRVL', w: 8.1 }, { t: 'TSM', w: 6.0 }, { t: 'NVDA', w: 4.6 }, { t: 'STX', w: 4.0 }],
  GTEK: [{ t: 'MRVL', w: 3.5 }, { t: 'DELL', w: 3.3 }, { t: 'CDNS', w: 2.6 }, { t: 'NET', w: 2.3 }, { t: 'APH', w: 2.1 }],
  ARKK: [{ t: 'TSLA', w: 10.2 }, { t: 'AMD', w: 5.2 }, { t: 'TEM', w: 4.8 }, { t: 'HOOD', w: 4.7 }, { t: 'CRSP', w: 4.7 }],
  MARS: [{ t: 'RKLB', w: 13.3 }, { t: 'ASTS', w: 9.0 }, { t: 'SATS', w: 7.8 }, { t: 'PL', w: 5.8 }, { t: 'LUNR', w: 4.7 }],
  FRWD: [{ t: 'STX', w: 8.9 }, { t: 'AMD', w: 7.9 }, { t: 'NVDA', w: 7.9 }, { t: 'TSM', w: 5.7 }, { t: 'LRCX', w: 5.6 }],
  BCTK: [{ t: 'TSM', w: 8.4 }, { t: 'AVGO', w: 8.3 }, { t: 'NVDA', w: 6.7 }, { t: 'LRCX', w: 6.4 }, { t: 'MU', w: 5.2 }],
  FWD: [{ t: 'AVGO', w: 3.0 }, { t: 'AMD', w: 2.7 }, { t: 'NVDA', w: 2.0 }, { t: 'CAT', w: 1.8 }, { t: 'LRCX', w: 1.7 }],
  CBSE: [{ t: 'SNOW', w: 3.3 }, { t: 'MU', w: 3.0 }, { t: 'MRVL', w: 2.7 }, { t: 'TENB', w: 2.7 }, { t: 'WTTR', w: 2.6 }],
  FCUS: [{ t: 'MU', w: 6.7 }, { t: 'SNDK', w: 5.5 }, { t: 'WDC', w: 4.8 }, { t: 'STX', w: 4.8 }, { t: 'INTC', w: 4.8 }],
  WGMI: [{ t: 'CIFR', w: 15.4 }, { t: 'IREN', w: 13.5 }, { t: 'WULF', w: 9.0 }, { t: 'CORZ', w: 7.1 }, { t: 'KEEL', w: 7.0 }],
  POW: [{ t: 'POWL', w: 6.6 }, { t: 'VICR', w: 5.7 }, { t: 'PWR', w: 4.7 }, { t: 'PRY', w: 4.5 }, { t: 'ETN', w: 4.1 }],
  VOLT: [{ t: 'POWL', w: 8.0 }, { t: 'BELFB', w: 7.2 }, { t: 'ETN', w: 5.5 }, { t: 'PWR', w: 5.5 }, { t: 'BE', w: 4.7 }],
  PBD: [{ t: 'BLDP', w: 1.4 }, { t: 'SEDG', w: 1.4 }, { t: 'ENPH', w: 1.2 }, { t: 'SHLS', w: 1.2 }, { t: 'FSLR', w: 1.2 }],
  PBW: [{ t: 'HYLN', w: 3.4 }, { t: 'FCEL', w: 3.3 }, { t: 'NVTS', w: 2.8 }, { t: 'BLDP', w: 2.6 }, { t: 'IONQ', w: 2.1 }],
  AIRR: [{ t: 'STRL', w: 6.3 }, { t: 'SAIA', w: 4.2 }, { t: 'FIX', w: 4.2 }, { t: 'CHRW', w: 4.1 }, { t: 'AGX', w: 4.0 }],
  PRN: [{ t: 'TTMI', w: 5.6 }, { t: 'PL', w: 5.1 }, { t: 'FIX', w: 4.6 }, { t: 'STRL', w: 4.5 }, { t: 'VICR', w: 4.5 }],
  RSHO: [{ t: 'TKR', w: 8.8 }, { t: 'POWL', w: 7.9 }, { t: 'CGNX', w: 7.5 }, { t: 'CAT', w: 6.5 }, { t: 'ETN', w: 5.7 }],
  IDEF: [{ t: 'RTX', w: 7.0 }, { t: 'LMT', w: 6.2 }, { t: 'PLTR', w: 5.3 }, { t: 'GD', w: 5.2 }, { t: 'BA', w: 4.7 }],
  BILT: [{ t: 'UNP', w: 5.6 }, { t: 'AEP', w: 4.3 }, { t: 'AENA', w: 4.1 }, { t: 'LNG', w: 3.8 }, { t: 'CP', w: 3.6 }],
  BUZZ: [{ t: 'ASTS', w: 4.5 }, { t: 'SMCI', w: 3.5 }, { t: 'MU', w: 3.4 }, { t: 'AMD', w: 3.2 }, { t: 'NOW', w: 3.2 }],
  MEME: [{ t: 'AAOI', w: 8.2 }, { t: 'NBIS', w: 6.4 }, { t: 'RDW', w: 6.3 }, { t: 'IREN', w: 6.0 }, { t: 'ONDS', w: 5.9 }],
  RKNG: [{ t: 'SNDK', w: 6.0 }, { t: 'NVTS', w: 5.5 }, { t: 'MU', w: 5.5 }, { t: 'NBIS', w: 5.2 }, { t: 'WDC', w: 4.4 }],
};
// @@END_GENERATED:ETF_TOP_HOLDINGS@@

// @@GENERATED:TOP10_RET@@
// Top10 composite returns per theme per period (average of all ETFs in theme)
const TOP10_RET: Record<Theme, Record<Period, number>> = {
  'AI & ML':         { '1W': 7.1, '1M': 23, '6M': 52, '1Y': 99 },
  'Semiconductors':  { '1W': 6.4, '1M': 37.5, '6M': 113.6, '1Y': 178.4 },
  'Broad Tech':      { '1W': 5.6, '1M': 19.8, '6M': 37.5, '1Y': 71.2 },
  'Electrification': { '1W': 0.8, '1M': 6.2, '6M': 45.8, '1Y': 91.5 },
  'Industrials':     { '1W': -0.4, '1M': 2, '6M': 27.3, '1Y': 45.1 },
  'Meme':            { '1W': 3.2, '1M': 24.6, '6M': 41.5, '1Y': 29 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, Record<Period, ChartPeriodData>> = {
  'AI & ML': {
    '1W': { top10: [100, 101.61, 102.36, 105.01, 107.09], spy: [100, 100.55, 100.8, 101.08, 101.21], top10Return: 7.1, spyReturn: 1.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 102.18, 105.58, 103.37, 106.52, 108.85, 106.2, 108.75, 109.79, 106.22, 104.18, 103.38, 106.65, 109.15, 110.13, 114.36, 114.04, 115.91, 116.71, 119.76, 122.18], spy: [100, 100.8, 102.2, 101.89, 102.73, 102.97, 102.81, 103.38, 104.2, 102.95, 102.87, 102.19, 103.24, 103.44, 103.85, 104.54, 104.52, 105.1, 105.36, 105.64, 105.79], top10Return: 23, spyReturn: 5.4, xLabels: ["May 6", "May 13", "May 20", "May 27", "Jun 3"] },
    '6M': { top10: [100, 102.73, 97.84, 101.16, 99.76, 101.95, 103.67, 104.72, 104.02, 101.83, 102.31, 102.14, 103.52, 99.47, 100.14, 99.87, 95.78, 100.79, 109.71, 115.99, 120.54, 123.47, 135.06, 129.28, 141.82, 151.98], spy: [100, 100.22, 99.61, 100.94, 100.06, 101.17, 101.57, 101.13, 101.53, 101.33, 100.03, 100.13, 100.71, 98.66, 97.18, 95.16, 93.04, 96.68, 100.67, 103.99, 104.94, 105.35, 108.48, 108.38, 110.13, 111.45], top10Return: 52, spyReturn: 11.5, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.07, 102.65, 106.28, 107.73, 108.75, 110.39, 112.59, 115.16, 115.56, 118.37, 112.96, 116.8, 117.15, 124.67, 128.78, 128.11, 130.88, 136.3, 133.6, 131.91, 142.55, 138.19, 135.09, 127.42, 130.15, 133.13, 136.95, 125.1, 133.7, 134.2, 136.24, 138.05, 137.87, 138.24, 137.88, 135.01, 134.6, 136.24, 134.35, 135.5, 133.8, 121.17, 133.35, 150.06, 155.31, 161.69, 165.9, 182.79, 174.58, 193.42, 207.99], spy: [100, 101.17, 100.24, 101.85, 104.09, 104.99, 104.72, 106.4, 106.44, 106.16, 108.19, 107.05, 108.48, 108.9, 110.32, 111.1, 110.91, 112.14, 112.92, 111.59, 112.03, 115.32, 113.67, 114.64, 111.16, 114.02, 114.73, 115.35, 112.63, 115.82, 114.61, 116.44, 116.03, 116.21, 116.66, 116.42, 114.37, 114.48, 115.15, 113.79, 112.24, 109.95, 106.02, 110.59, 116.5, 118.12, 119.98, 120.45, 124.02, 123.92, 125.92, 127.43], top10Return: 99, spyReturn: 27.4, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Semiconductors': {
    '1W': { top10: [100, 101.11, 100.17, 101.52, 106.45], spy: [100, 100.55, 100.8, 101.08, 101.21], top10Return: 6.4, spyReturn: 1.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 105.31, 109.62, 106.9, 115.22, 119.12, 113.51, 117.22, 117.09, 112.71, 109.16, 109.63, 114.44, 117.3, 119.02, 128.21, 127.18, 128.72, 127.61, 129.67, 135.82], spy: [100, 100.8, 102.2, 101.89, 102.73, 102.97, 102.81, 103.38, 104.2, 102.95, 102.87, 102.19, 103.24, 103.44, 103.85, 104.54, 104.52, 105.1, 105.36, 105.64, 105.79], top10Return: 37.5, spyReturn: 5.4, xLabels: ["May 6", "May 13", "May 20", "May 27", "Jun 3"] },
    '6M': { top10: [100, 104.96, 103.61, 105.65, 106.89, 111.39, 116.34, 116.77, 118.64, 121.32, 124.11, 123.07, 125.12, 118.28, 125.87, 130.13, 130.71, 135.33, 143.87, 150.47, 161.59, 168.55, 192.76, 184.07, 204.38, 213.59], spy: [100, 100.22, 99.61, 100.94, 100.06, 101.17, 101.57, 101.13, 101.53, 101.33, 100.03, 100.13, 100.71, 98.66, 97.18, 95.16, 93.04, 96.68, 100.67, 103.99, 104.94, 105.35, 108.48, 108.38, 110.13, 111.45], top10Return: 113.6, spyReturn: 11.5, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 106.09, 105.08, 110.78, 113.73, 115.84, 114.83, 114.13, 116.25, 112.52, 120.23, 115.14, 120.67, 118.78, 124.93, 132.41, 131.73, 134, 140.59, 141.19, 137.43, 148.36, 145.19, 142.42, 132.29, 138.14, 146.98, 151.8, 137.01, 145.87, 149.07, 157, 162.52, 161.25, 165.64, 169.4, 170.48, 169.1, 169.27, 158.35, 160.15, 160.54, 147.81, 165.64, 190.05, 204.11, 219.77, 228.15, 263.71, 243.58, 281.11, 287.67], spy: [100, 101.17, 100.24, 101.85, 104.09, 104.99, 104.72, 106.4, 106.44, 106.16, 108.19, 107.05, 108.48, 108.9, 110.32, 111.1, 110.91, 112.14, 112.92, 111.59, 112.03, 115.32, 113.67, 114.64, 111.16, 114.02, 114.73, 115.35, 112.63, 115.82, 114.61, 116.44, 116.03, 116.21, 116.66, 116.42, 114.37, 114.48, 115.15, 113.79, 112.24, 109.95, 106.02, 110.59, 116.5, 118.12, 119.98, 120.45, 124.02, 123.92, 125.92, 127.43], top10Return: 178.4, spyReturn: 27.4, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Broad Tech': {
    '1W': { top10: [100, 101.62, 102.4, 104.5, 105.6], spy: [100, 100.55, 100.8, 101.08, 101.21], top10Return: 5.6, spyReturn: 1.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 101.72, 104.44, 102.64, 105.1, 106.93, 104.87, 105.83, 107.42, 104.68, 103.81, 103.06, 105.59, 107.45, 109.05, 112.57, 112.67, 114.44, 115.01, 117.07, 118.36], spy: [100, 100.8, 102.2, 101.89, 102.73, 102.97, 102.81, 103.38, 104.2, 102.95, 102.87, 102.19, 103.24, 103.44, 103.85, 104.54, 104.52, 105.1, 105.36, 105.64, 105.79], top10Return: 19.8, spyReturn: 5.4, xLabels: ["May 6", "May 13", "May 20", "May 27", "Jun 3"] },
    '6M': { top10: [100, 103.57, 99.46, 102.09, 99.35, 102.83, 104.26, 103.59, 102.12, 99.88, 101, 100.42, 103.58, 98.8, 99, 98.27, 96.22, 100.44, 106, 113.49, 115.22, 119.25, 125.53, 122.65, 130.99, 137.5], spy: [100, 100.22, 99.61, 100.94, 100.06, 101.17, 101.57, 101.13, 101.53, 101.33, 100.03, 100.13, 100.71, 98.66, 97.18, 95.16, 93.04, 96.68, 100.67, 103.99, 104.94, 105.35, 108.48, 108.38, 110.13, 111.45], top10Return: 37.5, spyReturn: 11.5, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.06, 101.99, 104.52, 107.66, 108.63, 110.11, 112.03, 110.41, 110.19, 110.69, 108.55, 112.22, 111.15, 117.11, 122.34, 124.01, 125.92, 133.01, 136.57, 127.83, 135.7, 135.31, 128.1, 120.44, 124.82, 125.98, 128.38, 119.25, 124.61, 123.64, 127.51, 130.34, 129.65, 127.07, 126.64, 125.75, 124.21, 128.46, 125.22, 126.71, 126.74, 117.55, 126.72, 136.75, 140.32, 143.07, 147.66, 157.1, 151.41, 161.57, 171.18], spy: [100, 101.17, 100.24, 101.85, 104.09, 104.99, 104.72, 106.4, 106.44, 106.16, 108.19, 107.05, 108.48, 108.9, 110.32, 111.1, 110.91, 112.14, 112.92, 111.59, 112.03, 115.32, 113.67, 114.64, 111.16, 114.02, 114.73, 115.35, 112.63, 115.82, 114.61, 116.44, 116.03, 116.21, 116.66, 116.42, 114.37, 114.48, 115.15, 113.79, 112.24, 109.95, 106.02, 110.59, 116.5, 118.12, 119.98, 120.45, 124.02, 123.92, 125.92, 127.43], top10Return: 71.2, spyReturn: 27.4, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Electrification': {
    '1W': { top10: [100, 100.21, 99.17, 99.06, 100.77], spy: [100, 100.55, 100.8, 101.08, 101.21], top10Return: 0.8, spyReturn: 1.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 102.72, 103.81, 101.56, 103.31, 105.61, 102.87, 103.74, 103.69, 100.95, 97.83, 95.58, 97.91, 100.96, 102.64, 106.18, 105.53, 105.84, 104.73, 104.64, 106.51], spy: [100, 100.8, 102.2, 101.89, 102.73, 102.97, 102.81, 103.38, 104.2, 102.95, 102.87, 102.19, 103.24, 103.44, 103.85, 104.54, 104.52, 105.1, 105.36, 105.64, 105.79], top10Return: 6.2, spyReturn: 5.4, xLabels: ["May 6", "May 13", "May 20", "May 27", "Jun 3"] },
    '6M': { top10: [100, 101.68, 99.41, 101.16, 98.96, 102.92, 108.23, 111.31, 110.37, 113.72, 115.85, 116.77, 118.08, 109.31, 111.99, 110.75, 111.4, 114.41, 123.12, 127.89, 133.07, 137.85, 145.47, 134.49, 145.79, 145.85], spy: [100, 100.22, 99.61, 100.94, 100.06, 101.17, 101.57, 101.13, 101.53, 101.33, 100.03, 100.13, 100.71, 98.66, 97.18, 95.16, 93.04, 96.68, 100.67, 103.99, 104.94, 105.35, 108.48, 108.38, 110.13, 111.45], top10Return: 45.8, spyReturn: 11.5, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 103.13, 102.71, 103.52, 107.03, 109.79, 109.57, 114.97, 112.25, 112.8, 116.37, 115.31, 117.16, 116.25, 118.39, 123.26, 125.93, 129.29, 135.03, 142.5, 135.35, 141.18, 140.41, 139.21, 133.97, 136.85, 137.12, 140.52, 135.41, 140.86, 139.7, 141.88, 147.28, 149.02, 147.45, 151.44, 149.63, 151.24, 153.76, 149.6, 151.56, 150.75, 149.94, 153.93, 166.8, 170.52, 176.09, 178.46, 183.03, 175.93, 189.22, 191.44], spy: [100, 101.17, 100.24, 101.85, 104.09, 104.99, 104.72, 106.4, 106.44, 106.16, 108.19, 107.05, 108.48, 108.9, 110.32, 111.1, 110.91, 112.14, 112.92, 111.59, 112.03, 115.32, 113.67, 114.64, 111.16, 114.02, 114.73, 115.35, 112.63, 115.82, 114.61, 116.44, 116.03, 116.21, 116.66, 116.42, 114.37, 114.48, 115.15, 113.79, 112.24, 109.95, 106.02, 110.59, 116.5, 118.12, 119.98, 120.45, 124.02, 123.92, 125.92, 127.43], top10Return: 91.5, spyReturn: 27.4, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Industrials': {
    '1W': { top10: [100, 100.47, 99.82, 98.35, 99.63], spy: [100, 100.55, 100.8, 101.08, 101.21], top10Return: -0.4, spyReturn: 1.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 102.18, 104.42, 101.85, 102.24, 103.35, 102.45, 102.48, 103.18, 100.45, 99.06, 97.89, 99.78, 99.97, 100.88, 103.4, 103.41, 103.88, 103.21, 101.69, 103.05], spy: [100, 100.8, 102.2, 101.89, 102.73, 102.97, 102.81, 103.38, 104.2, 102.95, 102.87, 102.19, 103.24, 103.44, 103.85, 104.54, 104.52, 105.1, 105.36, 105.64, 105.79], top10Return: 2, spyReturn: 5.4, xLabels: ["May 6", "May 13", "May 20", "May 27", "Jun 3"] },
    '6M': { top10: [100, 101.27, 101.81, 104.33, 101.9, 107.19, 112.66, 112.53, 111.96, 117.35, 120.22, 120.99, 122.17, 114.86, 112.8, 111.33, 111.37, 115.51, 122.13, 123.24, 123.27, 123.29, 127.67, 122.22, 127.67, 127.31], spy: [100, 100.22, 99.61, 100.94, 100.06, 101.17, 101.57, 101.13, 101.53, 101.33, 100.03, 100.13, 100.71, 98.66, 97.18, 95.16, 93.04, 96.68, 100.67, 103.99, 104.94, 105.35, 108.48, 108.38, 110.13, 111.45], top10Return: 27.3, spyReturn: 11.5, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.07, 100.55, 101.86, 104.94, 105.94, 105.91, 107.86, 107.9, 108.2, 110.85, 108.32, 111.04, 110.56, 112.83, 113.72, 112.95, 115.53, 118.11, 116.16, 114.5, 119.55, 116.75, 115.91, 110.68, 114.11, 114.43, 117.19, 113.61, 119.05, 119.37, 124.93, 130.43, 130.08, 130.15, 136.45, 137.05, 137.26, 138.42, 131.91, 129.77, 129.87, 124.25, 131.31, 139.36, 139, 140.69, 140.15, 145.54, 139.44, 145.42, 145.12], spy: [100, 101.17, 100.24, 101.85, 104.09, 104.99, 104.72, 106.4, 106.44, 106.16, 108.19, 107.05, 108.48, 108.9, 110.32, 111.1, 110.91, 112.14, 112.92, 111.59, 112.03, 115.32, 113.67, 114.64, 111.16, 114.02, 114.73, 115.35, 112.63, 115.82, 114.61, 116.44, 116.03, 116.21, 116.66, 116.42, 114.37, 114.48, 115.15, 113.79, 112.24, 109.95, 106.02, 110.59, 116.5, 118.12, 119.98, 120.45, 124.02, 123.92, 125.92, 127.43], top10Return: 45.1, spyReturn: 27.4, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Meme': {
    '1W': { top10: [100, 101.82, 100.53, 100.75, 103.17], spy: [100, 100.55, 100.8, 101.08, 101.21], top10Return: 3.2, spyReturn: 1.2, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 103.63, 107.96, 102.56, 106.05, 110.98, 107.76, 110.17, 111.21, 106.85, 102.51, 100.92, 104.82, 111.2, 113.86, 117.68, 119.45, 121.64, 119.96, 120.13, 123.15], spy: [100, 100.8, 102.2, 101.89, 102.73, 102.97, 102.81, 103.38, 104.2, 102.95, 102.87, 102.19, 103.24, 103.44, 103.85, 104.54, 104.52, 105.1, 105.36, 105.64, 105.79], top10Return: 24.6, spyReturn: 5.4, xLabels: ["May 6", "May 13", "May 20", "May 27", "Jun 3"] },
    '6M': { top10: [100, 106.13, 93.92, 97.42, 92.74, 100.23, 102.95, 101.89, 96.21, 93.17, 92.05, 90.84, 93.48, 86.5, 90.52, 92.09, 90.64, 93.72, 104.73, 114.2, 113.07, 115.76, 125.36, 120.31, 135.78, 141.53], spy: [100, 100.22, 99.61, 100.94, 100.06, 101.17, 101.57, 101.13, 101.53, 101.33, 100.03, 100.13, 100.71, 98.66, 97.18, 95.16, 93.04, 96.68, 100.67, 103.99, 104.94, 105.35, 108.48, 108.38, 110.13, 111.45], top10Return: 41.5, spyReturn: 11.5, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.64, 101.05, 97.88, 95.98, 94.32, 93.33, 94.97, 91.98, 87.14, 86.5, 87.45, 87.47, 90.41, 90.41, 89.66, 92.8, 92.23, 94.53, 97.23, 95.25, 100.26, 98.19, 95.34, 91.77, 88.15, 86.47, 90.06, 86.08, 89.12, 91.18, 94.2, 92.89, 94.82, 94.7, 95.2, 92.2, 88.08, 90.84, 94.8, 99.38, 102.37, 97.57, 98.6, 103.57, 106.79, 106.12, 112.9, 115.2, 119.02, 124.83, 128.98], spy: [100, 101.17, 100.24, 101.85, 104.09, 104.99, 104.72, 106.4, 106.44, 106.16, 108.19, 107.05, 108.48, 108.9, 110.32, 111.1, 110.91, 112.14, 112.92, 111.59, 112.03, 115.32, 113.67, 114.64, 111.16, 114.02, 114.73, 115.35, 112.63, 115.82, 114.61, 116.44, 116.03, 116.21, 116.66, 116.42, 114.37, 114.48, 115.15, 113.79, 112.24, 109.95, 106.02, 110.59, 116.5, 118.12, 119.98, 120.45, 124.02, 123.92, 125.92, 127.43], top10Return: 29, spyReturn: 27.4, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
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
  proScore: number;       // confidence-adjusted score: avgWeight × sqrt(coverage%)
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
export const SCAN_TIMESTAMP    = '2026-06-03T08:45:57.304Z';
export const SCAN_TIMESTAMP_NY = 'June 3, 2026 at 4:45 AM ET';
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
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 17.31, bestProScore: 7.22, price: 1064.10, weeklyChange: 14.62 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 13.78, bestProScore: 6.04, price: 521.54, weeklyChange: 5.25 },
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.43, bestProScore: 5.89, price: 222.82, weeklyChange: 4.81 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 9.45, bestProScore: 3.97, price: 481.57, weeklyChange: 14.15 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 8.66, bestProScore: 3.63, price: 290.79, weeklyChange: 46.35 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 8.02, bestProScore: 4.68, price: 299.07, weeklyChange: 1.06 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 6.15, bestProScore: 3.41, price: 446.69, weeklyChange: 5.67 },
  { ticker: 'ETN', name: `Eaton Corp PLC`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 5.95, bestProScore: 3.40, price: 417.62, weeklyChange: 2.77 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 5.34, bestProScore: 3.30, price: 107.93, weeklyChange: -11.37 },
  { ticker: 'SNDK', name: `Sandisk Corp/DE`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 5.12, bestProScore: 2.61, price: 1716.36, weeklyChange: 7.95 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': 8.2, '1M': 34.9, '6M': 121.7, '1Y': 224.4 },
  ARTY: { '1W': 13.6, '1M': 28.5, '6M': 67.5, '1Y': 114.4 },
  BAI:  { '1W': 4.3, '1M': 19, '6M': 49.8, '1Y': 95.2 },
  IVEP: { '1W': 0.6, '1M': -0.8, '6M': 9.3, '1Y': 9.3 },
  IGPT: { '1W': 4.7, '1M': 29, '6M': 75.6, '1Y': 123 },
  IVES: { '1W': 9.4, '1M': 23.2, '6M': 28.5, '1Y': 63.1 },
  ALAI: { '1W': 4.2, '1M': 16, '6M': 26.1, '1Y': 63.5 },
  CHAT: { '1W': 10.3, '1M': 30.5, '6M': 70.5, '1Y': 138.9 },
  AIFD: { '1W': 10.7, '1M': 20.6, '6M': 53.6, '1Y': 102 },
  SPRX: { '1W': 6.2, '1M': 36.3, '6M': 50.2, '1Y': 112.9 },
  AOTG: { '1W': 5.7, '1M': 16, '6M': 18.9, '1Y': 42.7 },
  // Semiconductors
  SOXX: { '1W': 7.3, '1M': 29.9, '6M': 99.8, '1Y': 183.2 },
  PSI:  { '1W': 0.9, '1M': 19.6, '6M': 107.2, '1Y': 204.5 },
  XSD:  { '1W': 3, '1M': 28.4, '6M': 96.7, '1Y': 175.3 },
  DRAM: { '1W': 14.6, '1M': 72.2, '6M': 150.6, '1Y': 150.6 },
  // Broad Tech
  PTF:  { '1W': 4.6, '1M': 18.9, '6M': 76.9, '1Y': 108.5 },
  WCLD: { '1W': 18.1, '1M': 20.6, '6M': 1.5, '1Y': -4.6 },
  IGV:  { '1W': 12.6, '1M': 20.9, '6M': -0.5, '1Y': -0.2 },
  FDTX: { '1W': 10.5, '1M': 24.9, '6M': 44.7, '1Y': 61.5 },
  GTEK: { '1W': 5.2, '1M': 17.2, '6M': 55.3, '1Y': 82.3 },
  ARKK: { '1W': 2.5, '1M': 3.9, '6M': 2.2, '1Y': 37.9 },
  MARS: { '1W': -11.9, '1M': 29.1, '6M': 59, '1Y': 59 },
  FRWD: { '1W': 6.2, '1M': 18.7, '6M': 35.9, '1Y': 35.9 },
  BCTK: { '1W': 6.8, '1M': 16.8, '6M': 30.7, '1Y': 30.7 },
  FWD:  { '1W': 4.9, '1M': 14.2, '6M': 40.9, '1Y': 76.2 },
  CBSE: { '1W': 5.6, '1M': 13, '6M': 33, '1Y': 52.6 },
  FCUS: { '1W': 3.7, '1M': 11.4, '6M': 44.1, '1Y': 86.4 },
  WGMI: { '1W': 3.9, '1M': 48.4, '6M': 63.7, '1Y': 299.1 },
  // Electrification
  POW:  { '1W': -1.8, '1M': -1, '6M': 57.5, '1Y': 54.3 },
  VOLT: { '1W': -0.6, '1M': -2.6, '6M': 33.8, '1Y': 64.8 },
  PBD:  { '1W': 1.1, '1M': 7, '6M': 40.8, '1Y': 88.9 },
  PBW:  { '1W': 4.4, '1M': 21.4, '6M': 51.3, '1Y': 157.8 },
  // Industrials
  AIRR: { '1W': -0.5, '1M': 1.2, '6M': 31.9, '1Y': 64.6 },
  PRN:  { '1W': -0.4, '1M': 5.7, '6M': 45.8, '1Y': 63.9 },
  RSHO: { '1W': 1.7, '1M': 6, '6M': 35, '1Y': 57.1 },
  IDEF: { '1W': -1, '1M': -0.7, '6M': 13.3, '1Y': 24.8 },
  BILT: { '1W': -1.7, '1M': -2.1, '6M': 10.6, '1Y': 15.2 },
  // Meme
  BUZZ: { '1W': 3.9, '1M': 18.6, '6M': 22.5, '1Y': 48.3 },
  MEME: { '1W': 1.6, '1M': 34.4, '6M': 82.8, '1Y': 19.4 },
  RKNG: { '1W': 4, '1M': 20.9, '6M': 19.3, '1Y': 19.3 },
};
// @@END_GENERATED:ETF_RETURNS@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 7.06, proScore: 6.39, coverage: 0.818,
      price: 1064.1, weeklyPrices: [928.41, 923.52, 971.00, 1035.50, 1064.10], weeklyChange: 14.62, sortRank: 0, periodReturns: { '1M': 96.3, '6M': 344.3, '1Y': 940.7 },
      priceHistory: { '1W': [928.41, 923.52, 971, 1035.5, 1064.1], '1M': [576.45, 640.2, 666.59, 646.63, 746.81, 795.33, 766.58, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1], '6M': [239.49, 252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1], '1Y': [102.25, 114.14, 120.34, 127.25, 121.74, 123.11, 116.43, 109.83, 114.74, 108.78, 124.27, 117.21, 117.75, 124.21, 150.57, 168.89, 161.71, 182.15, 196.54, 191.94, 198.47, 226.63, 237.5, 244.9, 225.92, 230.26, 234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1] },
      velocityScore: { '1D': -1.2, '1W': 5.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 50.2, revenueGrowth: 196, eps: 21.18, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { AIS: 8.22, ARTY: 7.51, BAI: 5.92, IVEP: false, IGPT: 12.36, IVES: 5.88, ALAI: 1.04, CHAT: 6.24, AIFD: 6.46, SPRX: false, AOTG: 9.91 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 6.18, proScore: 5.89, coverage: 0.909,
      price: 222.82, weeklyPrices: [212.60, 214.25, 211.14, 224.36, 222.82], weeklyChange: 4.81, sortRank: 0, periodReturns: { '1M': 12.3, '6M': 22.8, '1Y': 57.8 },
      priceHistory: { '1W': [212.6, 214.25, 211.14, 224.36, 222.82], '1M': [198.48, 196.5, 207.83, 211.5, 215.2, 219.44, 220.78, 225.83, 235.74, 225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 222.82], '6M': [181.46, 184.97, 177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 222.32, 214.86, 222.82], '1Y': [141.22, 143.96, 144.12, 154.31, 157.25, 164.1, 171.37, 170.78, 179.27, 179.42, 181.59, 175.4, 181.6, 171.66, 177.17, 176.24, 176.97, 187.24, 189.11, 179.83, 180.28, 207.04, 195.21, 193.8, 186.52, 180.26, 179.59, 183.78, 170.94, 188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 216.61, 198.48, 219.44, 222.32, 214.86, 222.82] },
      velocityScore: { '1D': 0.5, '1W': 7.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.4T', pe: 34.1, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.45,
      etfPresence: { AIS: 2.5, ARTY: 3.59, BAI: 4.61, IVEP: false, IGPT: 5.93, IVES: 4.62, ALAI: 13.02, CHAT: 5.97, AIFD: 6.74, SPRX: 3.99, AOTG: 10.84 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.56, proScore: 5.03, coverage: 0.818,
      price: 521.54, weeklyPrices: [495.54, 518.09, 516.10, 510.13, 521.54], weeklyChange: 5.25, sortRank: 0, periodReturns: { '1M': 44.7, '6M': 142.3, '1Y': 344.6 },
      priceHistory: { '1W': [495.54, 518.09, 516.1, 510.13, 521.54], '1M': [341.54, 355.26, 421.39, 408.46, 455.19, 458.79, 448.29, 445.5, 449.7, 424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 521.54], '6M': [215.24, 221.62, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 503.89, 521.54], '1Y': [117.31, 123.24, 127.1, 143.4, 138.52, 144.16, 160.08, 158.65, 179.51, 163.12, 184.42, 165.2, 167.13, 161.79, 155.67, 157.92, 160.88, 164.01, 235.56, 238.6, 230.23, 264.33, 256.33, 258.89, 223.55, 214.24, 217.6, 221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 334.63, 341.54, 458.79, 420.99, 503.89, 521.54] },
      velocityScore: { '1D': -7.7, '1W': -4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$850B', pe: 172.7, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.46, ARTY: 7.1, BAI: 4.89, IVEP: false, IGPT: 7.03, IVES: 4.61, ALAI: 1.08, CHAT: 5.48, AIFD: false, SPRX: 0.54, AOTG: 14.82 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 4.66, proScore: 3.44, coverage: 0.545,
      price: 361.85, weeklyPrices: [388.83, 390.13, 380.34, 376.37, 361.85], weeklyChange: -6.94, sortRank: 0, periodReturns: { '1M': -6.2, '6M': 14.6, '1Y': 117.7 },
      priceHistory: { '1W': [388.83, 390.13, 380.34, 376.37, 361.85], '1M': [383.25, 388.43, 398.04, 397.99, 400.8, 388.64, 387.35, 402.62, 401.07, 396.78, 396.94, 387.66, 388.91, 387.66, 382.97, 388.88, 388.83, 390.13, 380.34, 376.37, 361.85], '6M': [315.81, 317.08, 306.57, 314.35, 313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 311.49, 306.52, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 383.25, 388.64, 396.94, 388.88, 361.85], '1Y': [166.18, 178.6, 175.95, 170.68, 178.64, 177.62, 182.97, 190.23, 196.53, 196.09, 201.96, 199.32, 207.48, 232.3, 240.37, 252.03, 247.14, 244.9, 244.62, 251.03, 251.69, 274.57, 284.31, 286.71, 292.81, 319.95, 319.63, 320.21, 296.72, 314.09, 315.15, 328.57, 330, 333.26, 343.69, 324.32, 305.72, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 350.34, 383.25, 388.64, 396.94, 388.88, 361.85] },
      velocityScore: { '1D': -3.4, '1W': -7.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.6, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.56, IVEP: false, IGPT: 6, IVES: 4.07, ALAI: false, CHAT: 5.35, AIFD: 5.02, SPRX: false, AOTG: 3.97 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 6, avgWeight: 4.62, proScore: 3.41, coverage: 0.545,
      price: 446.69, weeklyPrices: [422.73, 424.86, 418.45, 435.63, 446.69], weeklyChange: 5.67, sortRank: 0, periodReturns: { '1M': 12.3, '6M': 52.9, '1Y': 126 },
      priceHistory: { '1W': [422.73, 424.86, 418.45, 435.63, 446.69], '1M': [401.61, 394.41, 419.5, 414.15, 411.68, 404.54, 397.28, 399.8, 417.72, 404.35, 395.95, 392.61, 401.62, 407.15, 404.52, 412.32, 422.73, 424.86, 418.45, 435.63, 446.69], '6M': [292.09, 303.41, 286.87, 296.95, 303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.04, 369.11, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 401.61, 404.54, 395.95, 412.32, 446.69], '1Y': [197.61, 212.46, 213.9, 222.74, 233.6, 229.76, 237.56, 240.33, 242.91, 231.37, 241.44, 228.6, 239.29, 235.21, 258.91, 268.64, 280.71, 288.47, 304.52, 304.71, 288.88, 305.09, 293.64, 290.62, 282.37, 289.96, 295.45, 310.14, 276.96, 298.8, 319.61, 323.63, 342.4, 332.71, 341.36, 355.41, 366.36, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 404.98, 401.61, 404.54, 395.95, 412.32, 446.69] },
      velocityScore: { '1D': 1.5, '1W': 12.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 38.2, revenueGrowth: 35, eps: 11.7, grossMargin: 62, dividendYield: 0.85,
      etfPresence: { AIS: 3.16, ARTY: false, BAI: 4.3, IVEP: false, IGPT: false, IVES: 4.74, ALAI: 5.45, CHAT: false, AIFD: 3.2, SPRX: false, AOTG: 6.88 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.83, proScore: 3.26, coverage: 0.727,
      price: 481.57, weeklyPrices: [421.86, 426.58, 446.77, 459.97, 481.57], weeklyChange: 14.15, sortRank: 0, periodReturns: { '1M': 14.3, '6M': 26.2, '1Y': 87.5 },
      priceHistory: { '1W': [421.86, 426.58, 446.77, 459.97, 481.57], '1M': [416.5, 427.36, 425.44, 412.56, 430, 428.43, 419.3, 416.79, 439.79, 425.19, 420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 481.57], '6M': [381.57, 406.29, 341.3, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 420.71, 422.01, 481.57], '1Y': [256.85, 244.63, 249.37, 264.65, 269.9, 275.4, 280.81, 283.69, 302.62, 301.67, 309.09, 291.17, 300.25, 306.1, 359.63, 345.35, 339.31, 333.39, 345.5, 351.33, 340.3, 385.98, 358.98, 355.22, 354.42, 397.57, 380.61, 412.97, 326.02, 350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 418.2, 416.5, 428.43, 420.71, 422.01, 481.57] },
      velocityScore: { '1D': -0.3, '1W': 0.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 93.5, revenueGrowth: 30, eps: 5.15, grossMargin: 77, dividendYield: 0.54,
      etfPresence: { AIS: 0.79, ARTY: 3.8, BAI: 5.46, IVEP: false, IGPT: false, IVES: 4.98, ALAI: 4.51, CHAT: 3.27, AIFD: 6.14, SPRX: false, AOTG: 1.68 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 4.27, proScore: 2.88, coverage: 0.455,
      price: 256.52, weeklyPrices: [271.85, 274.00, 270.64, 261.26, 256.52], weeklyChange: -5.64, sortRank: 0, periodReturns: { '1M': -4.4, '6M': 9.4, '1Y': 24.7 },
      priceHistory: { '1W': [271.85, 274, 270.64, 261.26, 256.52], '1M': [272.05, 273.55, 274.99, 271.17, 272.68, 268.99, 265.82, 270.13, 267.22, 264.14, 264.86, 259.34, 265.01, 268.46, 266.32, 265.29, 271.85, 274, 270.64, 261.26, 256.52], '6M': [234.42, 227.92, 222.56, 232.14, 230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 205.27, 208.39, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 272.05, 268.99, 264.86, 265.29, 256.52], '1Y': [205.71, 217.61, 214.82, 211.99, 219.92, 222.26, 223.19, 228.29, 230.19, 222.31, 224.56, 223.81, 229.12, 235.68, 229.95, 231.23, 220.21, 220.63, 225.22, 215.57, 217.95, 230.3, 250.2, 244.2, 222.69, 229.16, 232.38, 231.78, 221.27, 232.38, 226.5, 247.38, 239.12, 238.42, 242.96, 208.72, 198.79, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 261.12, 272.05, 268.99, 264.86, 265.29, 256.52] },
      velocityScore: { '1D': 10.8, '1W': -2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.8T', pe: 31.6, revenueGrowth: 17, eps: 8.11, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.17, ALAI: 6.33, CHAT: 3.15, AIFD: 3.57, SPRX: false, AOTG: 4.14 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 5, avgWeight: 4.07, proScore: 2.75, coverage: 0.455,
      price: 290.79, weeklyPrices: [198.70, 204.83, 205.00, 219.43, 290.79], weeklyChange: 46.35, sortRank: 0, periodReturns: { '1M': 76.3, '6M': 213, '1Y': 366.3 },
      priceHistory: { '1W': [198.7, 204.83, 205, 219.43, 290.79], '1M': [163.66, 168.75, 172.15, 160.01, 170.13, 170.84, 164.5, 177.95, 182.58, 176.89, 168.93, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 204.83, 205, 219.43, 290.79], '6M': [92.89, 88.9, 84.07, 87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.84, 168.93, 208.26, 290.79], '1Y': [62.36, 68.84, 69.99, 75.93, 74.25, 73.36, 70.85, 73.27, 81.74, 75.32, 79.32, 71.22, 74.79, 64.1, 66.59, 74.23, 80.09, 83.89, 92.5, 88.89, 81.05, 90.15, 92.9, 89.33, 81.32, 87.72, 100.2, 92.47, 81.7, 86.49, 89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 78.61, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 158.21, 163.66, 170.84, 168.93, 208.26, 290.79] },
      velocityScore: { '1D': 0.7, '1W': 15.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$254B', pe: 99.9, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.08,
      etfPresence: { AIS: 4.37, ARTY: 6.67, BAI: 1.05, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: false, AIFD: 4.95, SPRX: 3.32, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.78, proScore: 2.55, coverage: 0.455,
      price: 441.31, weeklyPrices: [412.67, 426.99, 450.24, 460.52, 441.31], weeklyChange: 6.94, sortRank: 0, periodReturns: { '1M': 6.5, '6M': -9.9, '1Y': -4.7 },
      priceHistory: { '1W': [412.67, 426.99, 450.24, 460.52, 441.31], '1M': [413.62, 411.38, 413.96, 420.77, 415.12, 412.66, 407.77, 405.21, 409.43, 421.92, 423.54, 417.42, 421.06, 419.09, 418.57, 416.03, 412.67, 426.99, 450.24, 460.52, 441.31], '6M': [490, 492.02, 476.39, 486.85, 483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 384.47, 398.55, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 413.62, 412.66, 423.54, 416.03, 441.31], '1Y': [462.97, 470.92, 478.04, 492.27, 491.09, 501.48, 505.62, 505.87, 513.24, 524.94, 520.58, 505.72, 506.74, 507.97, 501.01, 508.45, 510.15, 519.71, 524.85, 513.43, 520.54, 541.55, 507.16, 511.14, 487.12, 485.5, 477.73, 478.56, 476.12, 488.02, 472.94, 479.28, 459.86, 470.28, 423.37, 413.6, 401.32, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 424.82, 413.62, 412.66, 423.54, 416.03, 441.31] },
      velocityScore: { '1D': 1.2, '1W': 2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.3T', pe: 26.3, revenueGrowth: 18, eps: 16.81, grossMargin: 68, dividendYield: 0.82,
      etfPresence: { AIS: false, ARTY: 1.88, BAI: false, IVEP: false, IGPT: false, IVES: 4.6, ALAI: 5.37, CHAT: 3.09, AIFD: false, SPRX: false, AOTG: 3.98 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'ARM', name: 'ARM Holdings PLC', easyScore: 3, avgWeight: 4.88, proScore: 2.55, coverage: 0.273,
      price: 402.71, weeklyPrices: [302.71, 335.27, 353.29, 408.85, 402.71], weeklyChange: 33.03, sortRank: 0, periodReturns: { '1M': 90.7, '6M': 195.1, '1Y': 212.7 },
      priceHistory: { '1W': [302.71, 335.27, 353.29, 408.85, 402.71], '1M': [203.26, 208.84, 237.3, 213.31, 213.27, 212.65, 207.92, 221.21, 228.5, 209.16, 215.12, 223.15, 256.73, 298.23, 306.51, 321.22, 302.71, 335.27, 353.29, 408.85, 402.71], '6M': [136.48, 141.93, 121.1, 112.02, 109.31, 113.08, 105.11, 116.07, 105.36, 123.7, 125.28, 123.78, 124.37, 114.38, 115.75, 132.35, 144.13, 148.77, 157.58, 175.1, 215.88, 203.26, 212.65, 215.12, 321.22, 402.71], '1Y': [128.78, 140.63, 144.72, 157.31, 154.63, 148.55, 153.9, 159.28, 163.32, 136.12, 141.6, 131.16, 140.66, 135.48, 154.7, 146.54, 144.3, 150.38, 166.77, 170.67, 165.71, 170.39, 160.19, 148.75, 136.99, 132.61, 139.19, 141.52, 114.58, 111.55, 114.73, 111.79, 105.78, 114.73, 106.93, 124.61, 125.28, 123.78, 124.37, 117.63, 121.7, 136.89, 136.96, 143.86, 161.22, 175.49, 215.88, 203.26, 212.65, 215.12, 321.22, 402.71] },
      velocityScore: { '1D': 18.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$430B', pe: 473.8, revenueGrowth: 20, eps: 0.85, grossMargin: 98, dividendYield: null,
      etfPresence: { AIS: 2.29, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 4.68, AIFD: false, SPRX: 7.67, AOTG: false },
      tonyNote: 'Arm Holdings is held across Broad Tech and AI ETFs as the CPU architecture licensor embedded in every mobile device and increasingly in AI inference chips and data center CPUs. Revenue grew and the royalty model is high-margin; the weight score reflects consistent institutional positioning as the AI chip design ecosystem expands on Arm cores.',
    },
    {
      ticker: 'COHR', name: 'Coherent Corp', easyScore: 3, avgWeight: 4.6, proScore: 2.4, coverage: 0.273,
      price: 426.89, weeklyPrices: [380.18, 376.95, 361.47, 362.90, 426.89], weeklyChange: 12.29, sortRank: 0, periodReturns: { '1M': 29.6, '6M': 158.9, '1Y': 430.3 },
      priceHistory: { '1W': [380.18, 376.95, 361.47, 362.9, 426.89], '1M': [329.89, 335.73, 344.67, 319.19, 335.26, 379.69, 374.01, 403.71, 404.94, 382.45, 362.83, 353.63, 358.5, 378, 377.57, 381.35, 380.18, 376.95, 361.47, 362.9, 426.89], '6M': [164.89, 192.73, 175.2, 191.87, 184.57, 173.15, 195.96, 196.94, 212.18, 227.68, 217.23, 248.89, 298.91, 235.72, 242.76, 253.63, 243.48, 253.22, 307.93, 347.51, 321.53, 329.89, 379.69, 362.83, 381.35, 426.89], '1Y': [80.5, 82.02, 79.77, 85.63, 88.36, 93.72, 97.82, 98.43, 107.23, 107.15, 114.01, 86.55, 90.71, 95.62, 103.51, 108.05, 106.52, 114.65, 116.67, 110.41, 115.37, 138.06, 134.63, 156.67, 142.94, 154, 170.96, 197.45, 170.44, 191.37, 194.33, 178.06, 191.04, 197.76, 222.44, 242.46, 217.23, 248.89, 298.91, 252.32, 247.37, 255.05, 219.65, 255.1, 313.42, 343.79, 321.53, 329.89, 379.69, 362.83, 381.35, 426.89] },
      velocityScore: { '1D': 3.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$84B', pe: 204.3, revenueGrowth: 21, eps: 2.09, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 0.99, ARTY: false, BAI: false, IVEP: 4.34, IGPT: false, IVES: false, ALAI: false, CHAT: false, AIFD: false, SPRX: 8.46, AOTG: false },
      tonyNote: 'Coherent Corp appears in 3 of 11 AI & ML ETFs (27% coverage) with average weight 4.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 3.25, proScore: 2.19, coverage: 0.455,
      price: 597.63, weeklyPrices: [635.26, 635.29, 632.51, 600.47, 597.63], weeklyChange: -5.92, sortRank: 0, periodReturns: { '1M': -1.8, '6M': -7.6, '1Y': -10.4 },
      priceHistory: { '1W': [635.26, 635.29, 632.51, 600.47, 597.63], '1M': [610.41, 604.96, 612.88, 616.81, 609.63, 598.86, 603, 616.63, 618.43, 614.23, 611.21, 602.61, 605.06, 607.38, 610.26, 612.34, 635.26, 635.29, 632.51, 600.47, 597.63], '6M': [647.1, 656.96, 657.15, 664.94, 660.09, 646.06, 620.8, 658.76, 716.5, 661.46, 639.77, 637.25, 653.56, 644.86, 613.71, 593.66, 525.72, 573.02, 634.53, 670.91, 678.62, 610.41, 598.86, 611.21, 612.34, 597.63], '1Y': [666.85, 702.4, 697.23, 708.68, 713.57, 727.24, 702.91, 713.58, 695.21, 771.99, 780.08, 747.72, 747.38, 748.65, 750.9, 780.25, 760.66, 717.34, 717.84, 717.55, 733.41, 751.67, 635.95, 609.01, 590.32, 633.61, 639.6, 650.13, 649.5, 667.55, 650.41, 653.06, 620.25, 672.36, 706.41, 677.22, 639.77, 637.25, 653.56, 647.39, 627.45, 604.06, 536.38, 575.05, 662.49, 668.84, 678.62, 610.41, 598.86, 611.21, 612.34, 597.63] },
      velocityScore: { '1D': 6.3, '1W': -18, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 21.7, revenueGrowth: 33, eps: 27.49, grossMargin: 82, dividendYield: 0.35,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: 4.55, IVES: 4.13, ALAI: 4.22, CHAT: 2.24, AIFD: false, SPRX: false, AOTG: 1.1 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 4, avgWeight: 3.58, proScore: 2.16, coverage: 0.364,
      price: 244.58, weeklyPrices: [190.96, 203.70, 225.78, 248.15, 244.58], weeklyChange: 28.08, sortRank: 0, periodReturns: { '1M': 42.3, '6M': 21.6, '1Y': 44.6 },
      priceHistory: { '1W': [190.96, 203.7, 225.78, 248.15, 244.58], '1M': [180.29, 185.35, 194.03, 194.59, 195.95, 193.84, 186.83, 189.76, 195.61, 192.95, 186.61, 181.46, 188.16, 189.77, 192.08, 193.06, 190.96, 203.7, 225.78, 248.15, 244.58], '6M': [201.1, 221.53, 188.65, 195.34, 194.91, 189.65, 189.85, 177.16, 164.58, 142.82, 160.14, 141.31, 149.25, 152.96, 155.11, 149.68, 139.66, 145.54, 155.62, 177.58, 172.96, 180.29, 193.84, 186.61, 193.06, 244.58], '1Y': [169.14, 177.48, 208.18, 210.72, 229.98, 235, 241.3, 241.9, 250.6, 256.43, 244.18, 235.06, 235.81, 223, 307.86, 296.62, 308.46, 289.01, 288.63, 303.62, 272.66, 275.3, 250.31, 226.99, 225.53, 204.96, 207.73, 223.01, 178.46, 197.49, 195.71, 198.52, 191.09, 182.44, 160.06, 156.59, 160.14, 141.31, 149.25, 151.56, 155.97, 154.34, 138.8, 143.17, 163, 181.17, 172.96, 180.29, 193.84, 186.61, 193.06, 244.58] },
      velocityScore: { '1D': 21.3, '1W': 17.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$703B', pe: 44, revenueGrowth: 22, eps: 5.56, grossMargin: 67, dividendYield: 0.82,
      etfPresence: { AIS: false, ARTY: 4.62, BAI: false, IVEP: false, IGPT: false, IVES: 4.42, ALAI: false, CHAT: 1.79, AIFD: false, SPRX: false, AOTG: 3.51 },
      tonyNote: 'Oracle lands in 3 AI ETFs on the strength of its cloud database and AI infrastructure contracts. Revenue grew 22%, 67% gross margin, P/E of 40x. The 17.5% weekly return following a major earnings beat shows how quickly sentiment can reprice; the weight score at 2.04% is still modest, meaning ETF managers have started building positions but conviction is not yet deep.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 6, avgWeight: 2.89, proScore: 2.13, coverage: 0.545,
      price: 355.76, weeklyPrices: [325.33, 349.17, 342.85, 320.09, 355.76], weeklyChange: 9.35, sortRank: 0, periodReturns: { '1M': 75.5, '6M': 148.9, '1Y': 274.1 },
      priceHistory: { '1W': [325.33, 349.17, 342.85, 320.09, 355.76], '1M': [201.25, 215.69, 213.91, 195.65, 199.79, 207.35, 204.42, 224.09, 228.64, 232.68, 215.58, 244.26, 287.48, 297.84, 306.88, 318.72, 325.33, 349.17, 342.85, 320.09, 355.76], '6M': [142.94, 167.08, 144.94, 168.83, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 215.58, 318.72, 355.76], '1Y': [95.09, 91.46, 92.91, 89.63, 88.57, 97.02, 91.94, 119.48, 128.87, 174.39, 193.64, 172.45, 179.2, 187.95, 232.9, 251.88, 205.27, 194.5, 219.36, 161.46, 154.85, 173.62, 181.94, 157.79, 142.01, 154.22, 152.5, 164.32, 140.24, 169.97, 179.56, 162.61, 182, 163.25, 152.44, 187.67, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 196.64, 201.25, 207.35, 215.58, 318.72, 355.76] },
      velocityScore: { '1D': 0.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$61B', pe: 238.8, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 1.76, ARTY: 1.47, BAI: false, IVEP: false, IGPT: 0.8, IVES: false, ALAI: 2.23, CHAT: 3.42, AIFD: false, SPRX: 7.66, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 3, avgWeight: 4.06, proScore: 2.12, coverage: 0.273,
      price: 1029.15, weeklyPrices: [902.31, 860.62, 854.96, 905.00, 1029.15], weeklyChange: 14.06, sortRank: 0, periodReturns: { '1M': 8.3, '6M': 239.9, '1Y': 1225.4 },
      priceHistory: { '1W': [902.31, 860.62, 854.96, 905, 1029.15], '1M': [976.18, 994.56, 944.28, 892.58, 903.8, 1053.09, 992.37, 1030.37, 1001.81, 970.7, 884.98, 890.09, 868.07, 964.5, 946.9, 910.81, 902.31, 860.62, 854.96, 905, 1029.15], '6M': [302.81, 360.33, 316.15, 387.41, 368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 674.73, 783.25, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 884.98, 910.81, 1029.15], '1Y': [77.65, 81.96, 86.35, 91.77, 91.24, 92.62, 99.63, 102.13, 109.85, 110.01, 120.23, 115.89, 125.84, 141.91, 164.88, 171.5, 152.75, 171.4, 163.09, 156.57, 158.06, 214.28, 232.75, 253.81, 268.92, 308.28, 302.98, 366, 320.25, 395.92, 386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 562.74, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 859.68, 976.18, 1053.09, 884.98, 910.81, 1029.15] },
      velocityScore: { '1D': 2.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$80B', pe: 181.8, revenueGrowth: 90, eps: 5.66, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.8, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: false, AIFD: 5.95, SPRX: 3.44, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 3 of 11 AI & ML ETFs (27% coverage) with average weight 4.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, avgWeight: 3.49, proScore: 2.1, coverage: 0.364,
      price: 334.49, weeklyPrices: [319.78, 314.18, 315.71, 323.39, 334.49], weeklyChange: 4.6, sortRank: 0, periodReturns: { '1M': 1.9, '6M': 84.9, '1Y': 197.7 },
      priceHistory: { '1W': [319.78, 314.18, 315.71, 323.39, 334.49], '1M': [330.97, 341.02, 358.92, 340.01, 339.97, 367.92, 367.13, 369.99, 376.23, 370.94, 339.73, 322.63, 315.67, 323.4, 327.46, 323.91, 319.78, 314.18, 315.71, 323.39, 334.49], '6M': [180.91, 178.38, 160.66, 166.26, 162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 245.42, 257.75, 241.78, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 330.97, 367.92, 339.73, 323.91, 334.49], '1Y': [112.34, 108.47, 116.61, 121.64, 124.33, 120.72, 125.4, 130.19, 144.17, 139.75, 137.4, 127.54, 129.31, 125.7, 135.71, 141.96, 141.62, 161.59, 167.38, 180.51, 171.59, 199.27, 190.71, 173.37, 170.65, 172.02, 178.88, 181.82, 149.83, 166.87, 175.61, 163.58, 176.93, 181.23, 190.01, 202, 234.53, 245.42, 257.75, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 322.43, 330.97, 367.92, 339.73, 323.91, 334.49] },
      velocityScore: { '1D': -0.5, '1W': 9.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$128B', pe: 84, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.07,
      etfPresence: { AIS: 3.75, ARTY: false, BAI: 1.96, IVEP: 4.22, IGPT: false, IVES: false, ALAI: false, CHAT: false, AIFD: 4.03, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 3, avgWeight: 3.91, proScore: 2.04, coverage: 0.273,
      price: 107.93, weeklyPrices: [121.77, 120.89, 114.68, 109.33, 107.93], weeklyChange: -11.37, sortRank: 0, periodReturns: { '1M': 8.3, '6M': 148.3, '1Y': 431.9 },
      priceHistory: { '1W': [121.77, 120.89, 114.68, 109.33, 107.93], '1M': [95.78, 108.15, 113.01, 109.62, 124.92, 129.44, 120.61, 120.29, 115.93, 108.77, 108.17, 110.8, 118.96, 118.5, 119.84, 123.52, 121.77, 120.89, 114.68, 109.33, 107.93], '6M': [43.47, 40.5, 37.31, 36.35, 36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.5, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.17, 123.52, 107.93], '1Y': [20.29, 22.08, 20.8, 22.2, 21.88, 23.82, 22.69, 23.49, 20.34, 20.41, 22.22, 23.54, 24.85, 24.61, 24.61, 30.57, 31.22, 35.94, 37.43, 37.15, 36.92, 41.34, 38.38, 37.89, 35.11, 36.81, 43.76, 40.78, 36.05, 36.16, 39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.79, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.99, 95.78, 129.44, 108.17, 123.52, 107.93] },
      velocityScore: { '1D': -2.9, '1W': -28.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$542B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 2.8, ARTY: false, BAI: 2.65, IVEP: false, IGPT: 6.27, IVES: false, ALAI: false, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 5, avgWeight: 2.87, proScore: 1.93, coverage: 0.455,
      price: 563.1, weeklyPrices: [530.60, 531.18, 531.21, 546.20, 563.10], weeklyChange: 6.13, sortRank: 0, periodReturns: { '1M': 30.5, '6M': 252, '1Y': 947.2 },
      priceHistory: { '1W': [530.6, 531.18, 531.21, 546.2, 563.1], '1M': [442.36, 465.26, 483.15, 463.91, 480, 515.83, 488.74, 494.09, 489.15, 482.02, 458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 563.1], '6M': [159.99, 169.54, 174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 458.68, 524.65, 563.1], '1Y': [53.77, 55.95, 58.57, 62.55, 65.78, 65.06, 66.53, 69.32, 71.43, 73.78, 76.07, 75.64, 80.67, 90.49, 96.15, 105.15, 109.69, 130.59, 121.18, 120.44, 120.47, 141.38, 160.1, 166.11, 153.97, 157.74, 155.59, 181.95, 166.26, 179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 400.73, 442.36, 515.83, 458.68, 524.65, 563.1] },
      velocityScore: { '1D': 0, '1W': -3.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$194B', pe: 33.7, revenueGrowth: 46, eps: 16.72, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { AIS: 1.5, ARTY: 2.58, BAI: 2.83, IVEP: false, IGPT: 3.05, IVES: false, ALAI: 4.37, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'GOOG', name: 'GOOG', easyScore: 2, avgWeight: 4.51, proScore: 1.93, coverage: 0.182,
      price: 358.39, weeklyPrices: [384.83, 386.12, 376.43, 372.58, 358.39], weeklyChange: -6.87, sortRank: 0, periodReturns: { '1M': -6.5, '6M': 13.4, '1Y': 113.7 },
      priceHistory: { '1W': [384.83, 386.12, 376.43, 372.58, 358.39], '1M': [379.64, 384.27, 395.14, 395.3, 397.05, 386.77, 383.82, 399.04, 397.17, 393.32, 393.11, 384.9, 384.9, 383.47, 379.38, 384.84, 384.83, 386.12, 376.43, 372.58, 358.39], '6M': [316.02, 317.75, 307.73, 315.68, 313.8, 326.01, 333.16, 328.43, 338.53, 323.1, 306.02, 311.69, 306.36, 298.3, 301.46, 298.79, 273.76, 297.66, 319.21, 335.4, 348.52, 379.64, 386.77, 393.11, 384.84, 358.39], '1Y': [167.71, 180.01, 177.23, 171.49, 179.76, 178.7, 183.77, 191.51, 197.44, 196.92, 203.03, 200.19, 208.21, 232.66, 240.78, 252.33, 247.83, 245.54, 245.46, 251.71, 252.53, 275.17, 284.75, 287.43, 292.99, 320.28, 320.62, 321, 298.06, 315.67, 315.32, 329.14, 330.34, 333.59, 344.9, 324.4, 306.02, 311.69, 306.36, 306.01, 304.42, 299.02, 273.14, 303.93, 330.58, 330.47, 348.52, 379.64, 386.77, 393.11, 384.84, 358.39] },
      velocityScore: { '1D': null, '1W': -12.7, '1M': null, '6M': null }, isNew: true,
      marketCap: '$4.3T', pe: 27.3, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 6.14, CHAT: false, AIFD: false, SPRX: false, AOTG: 2.89 },
      tonyNote: 'GOOG appears in 2 of 11 AI & ML ETFs (18% coverage) with average weight 4.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 6, avgWeight: 2.56, proScore: 1.89, coverage: 0.545,
      price: 175.33, weeklyPrices: [154.31, 155.27, 159.47, 170.68, 175.33], weeklyChange: 13.62, sortRank: 0, periodReturns: { '1M': 1.5, '6M': 37.8, '1Y': 85.5 },
      priceHistory: { '1W': [154.31, 155.27, 159.47, 170.68, 175.33], '1M': [172.62, 170.22, 147.06, 141.75, 141.77, 136.43, 142.54, 140.69, 147.81, 141.97, 141.71, 141.58, 140.49, 148.59, 154.03, 158.01, 154.31, 155.27, 159.47, 170.68, 175.33], '6M': [127.22, 130.04, 126.13, 131.32, 131.03, 123.72, 130.59, 136.34, 141.74, 137.49, 141.59, 127.43, 129.3, 132.89, 133.57, 131.22, 120.77, 126.25, 152.02, 166.85, 172.47, 172.62, 136.43, 141.71, 158.01, 175.33], '1Y': [94.5, 93.7, 89.68, 96.31, 101.13, 106.29, 108.3, 113.04, 122.09, 138.78, 138.01, 131.47, 133.27, 141.17, 153.04, 146.66, 142.64, 149.27, 157.36, 143.38, 146.59, 162.03, 140.42, 134.98, 124.81, 127.65, 127.8, 132.36, 122.36, 130.77, 133.6, 122.89, 129.83, 143.72, 138.37, 141.74, 141.59, 127.43, 129.3, 137.17, 135.35, 135.88, 116.13, 133.64, 154.37, 172.86, 172.47, 172.62, 136.43, 141.71, 158.01, 175.33] },
      velocityScore: { '1D': 5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$221B', pe: 60.3, revenueGrowth: 35, eps: 2.91, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.44, ARTY: 2, BAI: 1.42, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 2.39, AIFD: 4.93, SPRX: 3.17, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 6 of 11 AI & ML ETFs (55% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 7.22, proScore: 7.22, coverage: 1,
      price: 1064.1, weeklyPrices: [928.41, 923.52, 971.00, 1035.50, 1064.10], weeklyChange: 14.62, sortRank: 0, periodReturns: { '1M': 96.3, '6M': 344.3, '1Y': 940.7 },
      priceHistory: { '1W': [928.41, 923.52, 971, 1035.5, 1064.1], '1M': [576.45, 640.2, 666.59, 646.63, 746.81, 795.33, 766.58, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1], '6M': [239.49, 252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1], '1Y': [102.25, 114.14, 120.34, 127.25, 121.74, 123.11, 116.43, 109.83, 114.74, 108.78, 124.27, 117.21, 117.75, 124.21, 150.57, 168.89, 161.71, 182.15, 196.54, 191.94, 198.47, 226.63, 237.5, 244.9, 225.92, 230.26, 234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1] },
      velocityScore: { '1D': 4.5, '1W': 11.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 50.2, revenueGrowth: 196, eps: 21.18, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { SOXX: 12.33, PSI: 8.15, XSD: 3.75, DRAM: 4.65 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 6.98, proScore: 6.04, coverage: 0.75,
      price: 521.54, weeklyPrices: [495.54, 518.09, 516.10, 510.13, 521.54], weeklyChange: 5.25, sortRank: 0, periodReturns: { '1M': 44.7, '6M': 142.3, '1Y': 344.6 },
      priceHistory: { '1W': [495.54, 518.09, 516.1, 510.13, 521.54], '1M': [341.54, 355.26, 421.39, 408.46, 455.19, 458.79, 448.29, 445.5, 449.7, 424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 521.54], '6M': [215.24, 221.62, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 503.89, 521.54], '1Y': [117.31, 123.24, 127.1, 143.4, 138.52, 144.16, 160.08, 158.65, 179.51, 163.12, 184.42, 165.2, 167.13, 161.79, 155.67, 157.92, 160.88, 164.01, 235.56, 238.6, 230.23, 264.33, 256.33, 258.89, 223.55, 214.24, 217.6, 221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 334.63, 341.54, 458.79, 420.99, 503.89, 521.54] },
      velocityScore: { '1D': -0.8, '1W': 3.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$850B', pe: 172.7, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 9.33, PSI: 7.84, XSD: 3.77, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'MXL', name: 'MaxLinear Inc', easyScore: 2, avgWeight: 7.19, proScore: 5.08, coverage: 0.5,
      price: 88.76, weeklyPrices: [101.10, 97.76, 92.93, 86.23, 88.76], weeklyChange: -12.21, sortRank: 0, periodReturns: { '1M': 15, '6M': 435, '1Y': 636.6 },
      priceHistory: { '1W': [101.1, 97.76, 92.93, 86.23, 88.76], '1M': [78.12, 81.68, 81.23, 82.37, 99.83, 102.27, 91.93, 87.73, 88.78, 92.34, 87.46, 94.86, 96.77, 99.67, 99.16, 96.12, 101.1, 97.76, 92.93, 86.23, 88.76], '6M': [16.59, 19.45, 17.14, 17.69, 17.43, 18.57, 19.19, 18.41, 17.35, 18.72, 19.53, 17.94, 17.99, 15.72, 16.89, 16.56, 17, 18.45, 21.31, 31.73, 51.65, 78.12, 102.27, 87.46, 96.12, 88.76], '1Y': [12.05, 12.57, 12.76, 13.71, 14.57, 15.13, 14.58, 15.32, 16.99, 15.2, 15.98, 14.27, 16.74, 15.55, 16.04, 16.7, 16.08, 16.36, 16.23, 17.4, 16.78, 15.21, 15.17, 14.88, 13.41, 15.44, 17.93, 19.61, 16.98, 17.54, 18.51, 19, 19.3, 18.4, 17.64, 19.01, 19.53, 17.94, 17.99, 15.94, 17.32, 17.14, 16.08, 18.41, 21.56, 33.7, 51.65, 78.12, 102.27, 87.46, 96.12, 88.76] },
      velocityScore: { '1D': -3.8, '1W': -5.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$8B', pe: null, revenueGrowth: 43, eps: -1.52, grossMargin: 57, dividendYield: null,
      etfPresence: { SOXX: false, PSI: 8.48, XSD: 5.9, DRAM: false },
      tonyNote: 'MaxLinear holds the highest average weight in the Semiconductor theme at 7.71% across 2 ETFs. Revenue grew 43%, 57% gross margin, but EPS is negative at -$1.52 and the market cap is only $8B. The 716% 1-year return is an extreme recovery from the 2023 inventory correction lows; the two ETFs holding it are making a concentrated bet on a return to profitability in the analog semiconductor cycle.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 3, avgWeight: 4.59, proScore: 3.97, coverage: 0.75,
      price: 481.57, weeklyPrices: [421.86, 426.58, 446.77, 459.97, 481.57], weeklyChange: 14.15, sortRank: 0, periodReturns: { '1M': 14.3, '6M': 26.2, '1Y': 87.5 },
      priceHistory: { '1W': [421.86, 426.58, 446.77, 459.97, 481.57], '1M': [416.5, 427.36, 425.44, 412.56, 430, 428.43, 419.3, 416.79, 439.79, 425.19, 420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 481.57], '6M': [381.57, 406.29, 341.3, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 420.71, 422.01, 481.57], '1Y': [256.85, 244.63, 249.37, 264.65, 269.9, 275.4, 280.81, 283.69, 302.62, 301.67, 309.09, 291.17, 300.25, 306.1, 359.63, 345.35, 339.31, 333.39, 345.5, 351.33, 340.3, 385.98, 358.98, 355.22, 354.42, 397.57, 380.61, 412.97, 326.02, 350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 418.2, 416.5, 428.43, 420.71, 422.01, 481.57] },
      velocityScore: { '1D': 2.6, '1W': 11.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 93.5, revenueGrowth: 30, eps: 5.15, grossMargin: 77, dividendYield: 0.54,
      etfPresence: { SOXX: 7.07, PSI: 4.65, XSD: 2.04, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 5.13, proScore: 3.63, coverage: 0.5,
      price: 290.79, weeklyPrices: [198.70, 204.83, 205.00, 219.43, 290.79], weeklyChange: 46.35, sortRank: 0, periodReturns: { '1M': 76.3, '6M': 213, '1Y': 366.3 },
      priceHistory: { '1W': [198.7, 204.83, 205, 219.43, 290.79], '1M': [163.66, 168.75, 172.15, 160.01, 170.13, 170.84, 164.5, 177.95, 182.58, 176.89, 168.93, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 204.83, 205, 219.43, 290.79], '6M': [92.89, 88.9, 84.07, 87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.84, 168.93, 208.26, 290.79], '1Y': [62.36, 68.84, 69.99, 75.93, 74.25, 73.36, 70.85, 73.27, 81.74, 75.32, 79.32, 71.22, 74.79, 64.1, 66.59, 74.23, 80.09, 83.89, 92.5, 88.89, 81.05, 90.15, 92.9, 89.33, 81.32, 87.72, 100.2, 92.47, 81.7, 86.49, 89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 78.61, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 158.21, 163.66, 170.84, 168.93, 208.26, 290.79] },
      velocityScore: { '1D': 4, '1W': 7.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$254B', pe: 99.9, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.08,
      etfPresence: { SOXX: 6.59, PSI: false, XSD: 3.68, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 3.96, proScore: 3.43, coverage: 0.75,
      price: 222.82, weeklyPrices: [212.60, 214.25, 211.14, 224.36, 222.82], weeklyChange: 4.81, sortRank: 0, periodReturns: { '1M': 12.3, '6M': 22.8, '1Y': 57.8 },
      priceHistory: { '1W': [212.6, 214.25, 211.14, 224.36, 222.82], '1M': [198.48, 196.5, 207.83, 211.5, 215.2, 219.44, 220.78, 225.83, 235.74, 225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 222.82], '6M': [181.46, 184.97, 177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 222.32, 214.86, 222.82], '1Y': [141.22, 143.96, 144.12, 154.31, 157.25, 164.1, 171.37, 170.78, 179.27, 179.42, 181.59, 175.4, 181.6, 171.66, 177.17, 176.24, 176.97, 187.24, 189.11, 179.83, 180.28, 207.04, 195.21, 193.8, 186.52, 180.26, 179.59, 183.78, 170.94, 188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 216.61, 198.48, 219.44, 222.32, 214.86, 222.82] },
      velocityScore: { '1D': 5.5, '1W': 6.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.4T', pe: 34.1, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.45,
      etfPresence: { SOXX: 6.22, PSI: 3.83, XSD: 1.83, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 2, avgWeight: 4.67, proScore: 3.3, coverage: 0.5,
      price: 107.93, weeklyPrices: [121.77, 120.89, 114.68, 109.33, 107.93], weeklyChange: -11.37, sortRank: 0, periodReturns: { '1M': 8.3, '6M': 148.3, '1Y': 431.9 },
      priceHistory: { '1W': [121.77, 120.89, 114.68, 109.33, 107.93], '1M': [95.78, 108.15, 113.01, 109.62, 124.92, 129.44, 120.61, 120.29, 115.93, 108.77, 108.17, 110.8, 118.96, 118.5, 119.84, 123.52, 121.77, 120.89, 114.68, 109.33, 107.93], '6M': [43.47, 40.5, 37.31, 36.35, 36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.5, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.17, 123.52, 107.93], '1Y': [20.29, 22.08, 20.8, 22.2, 21.88, 23.82, 22.69, 23.49, 20.34, 20.41, 22.22, 23.54, 24.85, 24.61, 24.61, 30.57, 31.22, 35.94, 37.43, 37.15, 36.92, 41.34, 38.38, 37.89, 35.11, 36.81, 43.76, 40.78, 36.05, 36.16, 39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.79, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.99, 95.78, 129.44, 108.17, 123.52, 107.93] },
      velocityScore: { '1D': -3.2, '1W': -10.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$542B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 5.88, PSI: false, XSD: 3.45, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 4.25, proScore: 3, coverage: 0.5,
      price: 490.05, weeklyPrices: [448.25, 449.68, 450.06, 458.17, 490.05], weeklyChange: 9.33, sortRank: 0, periodReturns: { '1M': 26, '6M': 84.7, '1Y': 203 },
      priceHistory: { '1W': [448.25, 449.68, 450.06, 458.17, 490.05], '1M': [391.38, 410.82, 428.62, 410.64, 435.44, 443.62, 431.2, 436.61, 440.56, 436.62, 413.57, 406.91, 426.85, 427.36, 432.16, 454.89, 448.25, 449.68, 450.06, 458.17, 490.05], '6M': [265.33, 267.14, 258.84, 260.23, 256.99, 281.64, 319.08, 322.38, 322.32, 322.51, 354.91, 373.55, 372.18, 324.74, 341.53, 357.06, 337.17, 352.62, 395.73, 391.62, 404.86, 391.38, 443.62, 413.57, 454.89, 490.05], '1Y': [161.74, 173.77, 174.09, 183.07, 190.01, 198.03, 194.81, 187.01, 189.39, 178.14, 190.03, 160.96, 164.39, 158.24, 170.15, 189.76, 201.44, 217.74, 217.51, 227.58, 220.56, 235.75, 240.89, 230.73, 235.13, 249.97, 268.63, 275.15, 248.27, 260.78, 268.87, 301.18, 327.01, 319.46, 328.4, 330.57, 354.91, 373.55, 372.18, 338.94, 346.18, 361.79, 323.12, 354.31, 395.64, 394.33, 404.86, 391.38, 443.62, 413.57, 454.89, 490.05] },
      velocityScore: { '1D': 1.7, '1W': 2.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$389B', pe: 46.1, revenueGrowth: 11, eps: 10.63, grossMargin: 49, dividendYield: 0.43,
      etfPresence: { SOXX: 4.5, PSI: 4, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 3, avgWeight: 3.38, proScore: 2.93, coverage: 0.75,
      price: 308.12, weeklyPrices: [317.45, 315.95, 305.68, 293.20, 308.12], weeklyChange: -2.94, sortRank: 0, periodReturns: { '1M': 9.6, '6M': 75.8, '1Y': 63.8 },
      priceHistory: { '1W': [317.45, 315.95, 305.68, 293.2, 308.12], '1M': [280.89, 281, 289.44, 285.24, 287.8, 297.76, 295.17, 306.34, 308.17, 302.73, 300.6, 302.31, 304.88, 298.39, 309.21, 324.89, 317.45, 315.95, 305.68, 293.2, 308.12], '6M': [175.26, 179.52, 177.56, 177.08, 173.49, 188.45, 189.12, 193.31, 215.55, 221.44, 226.16, 219.86, 209.82, 193.23, 190.78, 187.19, 190.33, 199.42, 216.71, 233.7, 269.5, 280.89, 297.76, 300.6, 324.89, 308.12], '1Y': [188.08, 202.29, 197.69, 205.38, 215.59, 219.66, 216.64, 186.25, 189.52, 185.91, 193.29, 200.77, 205.47, 187.29, 184.35, 181.62, 184.44, 180.39, 181.6, 175.27, 170.71, 160.26, 163.57, 163.09, 157.09, 165.35, 182.6, 181.67, 174.49, 177.13, 177.52, 190.31, 191.58, 196.59, 225.01, 218.77, 226.16, 219.86, 209.82, 196.2, 194.13, 188.63, 186.42, 199.74, 218.87, 233.15, 269.5, 280.89, 297.76, 300.6, 324.89, 308.12] },
      velocityScore: { '1D': -3, '1W': -6.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$280B', pe: 52.7, revenueGrowth: 19, eps: 5.85, grossMargin: 57, dividendYield: 1.84,
      etfPresence: { SOXX: 3.39, PSI: 4.52, XSD: 2.24, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 3.8, proScore: 2.69, coverage: 0.5,
      price: 334.41, weeklyPrices: [318.93, 318.00, 318.18, 317.12, 334.41], weeklyChange: 4.85, sortRank: 0, periodReturns: { '1M': 30.3, '6M': 111.4, '1Y': 299.7 },
      priceHistory: { '1W': [318.93, 318, 318.18, 317.12, 334.41], '1M': [258.57, 275.8, 297.17, 286.52, 294.05, 296.05, 289.24, 295.44, 299.15, 284.72, 277.96, 273.38, 292.09, 302.24, 305.35, 322.68, 318.93, 318, 318.18, 317.12, 334.41], '6M': [158.19, 165.81, 163.26, 175.16, 171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 242.27, 231, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 296.05, 277.96, 322.68, 334.41], '1Y': [83.66, 91, 92.66, 96.02, 98.83, 101.06, 100.37, 97.1, 99.09, 95.94, 106.74, 99.15, 103.67, 100.42, 115.58, 126.32, 128.32, 142.79, 142.54, 144.78, 141.25, 160.67, 165.05, 161.42, 148.8, 155.14, 159.75, 168.26, 154.98, 177.33, 185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.53, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 259.47, 258.57, 296.05, 277.96, 322.68, 334.41] },
      velocityScore: { '1D': 0, '1W': 1.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$418B', pe: 63.3, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.31,
      etfPresence: { SOXX: 3.33, PSI: 4.27, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 3.69, proScore: 2.61, coverage: 0.5,
      price: 2045.2, weeklyPrices: [1957.19, 1927.63, 1921.71, 1940.04, 2045.20], weeklyChange: 4.5, sortRank: 0, periodReturns: { '1M': 18.5, '6M': 71.9, '1Y': 163.6 },
      priceHistory: { '1W': [1957.19, 1927.63, 1921.71, 1940.04, 2045.2], '1M': [1713.32, 1732.9, 1816.29, 1763.25, 1869.19, 1845.19, 1811.35, 1849.71, 1892.94, 1804.32, 1756.45, 1740.58, 1829.47, 1842.18, 1888.38, 2011.39, 1957.19, 1927.63, 1921.71, 1940.04, 2045.2], '6M': [1189.86, 1225.61, 1223.37, 1268.75, 1215.08, 1324.6, 1544.96, 1512.78, 1427.94, 1442.95, 1464.13, 1487.66, 1534.95, 1344.55, 1418.64, 1498.67, 1443.21, 1540.06, 1768.78, 1805.32, 1900, 1713.32, 1845.19, 1756.45, 2011.39, 2045.2], '1Y': [775.79, 856.59, 893, 893.46, 921.1, 928.62, 933.49, 897.09, 924.99, 888.28, 949.48, 878.44, 888.89, 873.29, 959.28, 1046.69, 1068.67, 1128.87, 1062.59, 1087.01, 1114.32, 1235.28, 1227.1, 1198.97, 1167.46, 1159.07, 1211.75, 1238.91, 1172.02, 1276.99, 1274.47, 1400, 1567.82, 1543.03, 1410.45, 1440.16, 1464.13, 1487.66, 1534.95, 1429.1, 1438.24, 1511.43, 1382.58, 1548.85, 1795.91, 1785.37, 1900, 1713.32, 1845.19, 1756.45, 2011.39, 2045.2] },
      velocityScore: { '1D': 1.6, '1W': -0.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$267B', pe: 57.8, revenueGrowth: 12, eps: 35.38, grossMargin: 61, dividendYield: 0.45,
      etfPresence: { SOXX: 3.12, PSI: 4.26, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 1, avgWeight: 5.02, proScore: 2.51, coverage: 0.25,
      price: 1716.36, weeklyPrices: [1589.94, 1641.64, 1694.98, 1761.43, 1716.36], weeklyChange: 7.95, sortRank: 0, periodReturns: { '1M': 44.6, '6M': 735.8, '1Y': 4341.9 },
      priceHistory: { '1W': [1589.94, 1641.64, 1694.98, 1761.43, 1716.36], '1M': [1255.86, 1406.32, 1409.98, 1339.96, 1562.34, 1547.56, 1452.02, 1447.23, 1382.72, 1407.61, 1333.01, 1383.29, 1392.56, 1542.24, 1478.69, 1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36], '6M': [205.35, 219.46, 209.31, 244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1589.55, 1716.36], '1Y': [38.64, 41.59, 44.09, 47.25, 46.21, 46.95, 41.36, 43, 43.39, 42.1, 47.01, 44.4, 48.44, 62.5, 84.3, 98.87, 99.83, 121.12, 131.88, 144.3, 146.95, 204.36, 216.5, 283.1, 245.96, 215.04, 194.38, 232.86, 206.83, 250.08, 275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1070.2, 1255.86, 1547.56, 1333.01, 1589.55, 1716.36] },
      velocityScore: { '1D': -2, '1W': -3.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$254B', pe: 58.8, revenueGrowth: 251, eps: 29.18, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 5.02 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 3, avgWeight: 2.86, proScore: 2.48, coverage: 0.75,
      price: 128.64, weeklyPrices: [124.89, 123.77, 120.62, 120.92, 128.64], weeklyChange: 3, sortRank: 0, periodReturns: { '1M': 24.9, '6M': 149.9, '1Y': 171.6 },
      priceHistory: { '1W': [124.89, 123.77, 120.62, 120.92, 128.64], '1M': [102.04, 102.67, 105.77, 100.61, 103.2, 107.24, 104.11, 115.71, 118.37, 113.11, 109.43, 106.02, 110.21, 109.61, 116.2, 127, 124.89, 123.77, 120.62, 120.92, 128.64], '6M': [51.48, 55.23, 54.56, 55.69, 54.15, 60.89, 60.28, 61.98, 59.89, 65.2, 72.21, 69.47, 66.48, 56.87, 58.55, 59.26, 58.35, 63.49, 71.02, 85.56, 98.04, 102.04, 107.24, 109.43, 127, 128.64], '1Y': [47.37, 53.8, 52.94, 53.74, 55.95, 59.52, 59.52, 59.61, 58.05, 46.98, 51.89, 49.47, 51.25, 48.06, 49.02, 51.83, 50.94, 48.35, 50.88, 50.36, 51.93, 51.4, 50.08, 49.27, 46.12, 49.64, 57.15, 55.1, 53.33, 55.08, 56.7, 62.16, 60.33, 61.13, 61.53, 65.1, 72.21, 69.47, 66.48, 59.23, 59.88, 59.89, 55.66, 63.79, 72.05, 86.91, 98.04, 102.04, 107.24, 109.43, 127, 128.64] },
      velocityScore: { '1D': 0.4, '1W': 25.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$50B', pe: 94.6, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.4, PSI: 3.1, XSD: 3.09, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 3.27, proScore: 2.31, coverage: 0.5,
      price: 240.84, weeklyPrices: [233.40, 243.29, 251.02, 228.99, 240.84], weeklyChange: 3.19, sortRank: 0, periodReturns: { '1M': 36.1, '6M': 41.1, '1Y': 61.7 },
      priceHistory: { '1W': [233.4, 243.29, 251.02, 228.99, 240.84], '1M': [168.38, 186.55, 192.57, 202.55, 219.09, 237.53, 210.31, 213.17, 200.08, 201.49, 203.64, 195.61, 202.51, 213.41, 238.16, 248.82, 233.4, 243.29, 251.02, 228.99, 240.84], '6M': [170.7, 176, 176.12, 174.75, 171.05, 181.87, 161.39, 155.82, 151.59, 137.34, 140.7, 140.41, 141.03, 135.69, 129.82, 129.9, 127.11, 125.73, 131.24, 137.52, 150.26, 168.38, 237.53, 203.64, 248.82, 240.84], '1Y': [148.94, 159.13, 154.46, 155.93, 162.32, 159.09, 154.07, 159.88, 159.06, 145.84, 156.59, 155.44, 159.77, 159.71, 161.51, 168.13, 173.55, 166.49, 167.77, 162.97, 169.27, 178.67, 179.72, 176.67, 166.11, 165.14, 175.07, 182.21, 172.34, 174.77, 172.98, 177.78, 159.42, 154.52, 152.62, 138.93, 140.7, 140.41, 141.03, 138.11, 129.39, 128.35, 127.07, 124.07, 132.84, 135.56, 150.26, 168.38, 237.53, 203.64, 248.82, 240.84] },
      velocityScore: { '1D': -5.7, '1W': -6.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$254B', pe: 25.9, revenueGrowth: -4, eps: 9.3, grossMargin: 55, dividendYield: 1.53,
      etfPresence: { SOXX: 3.95, PSI: false, XSD: 2.58, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 3, avgWeight: 2.59, proScore: 2.25, coverage: 0.75,
      price: 1624.99, weeklyPrices: [1620.17, 1633.17, 1566.21, 1542.39, 1624.99], weeklyChange: 0.3, sortRank: 0, periodReturns: { '1M': 2.6, '6M': 70.7, '1Y': 137 },
      priceHistory: { '1W': [1620.17, 1633.17, 1566.21, 1542.39, 1624.99], '1M': [1573.3, 1588.12, 1652.35, 1575.96, 1600.84, 1661.1, 1599.52, 1650.35, 1613.97, 1550.02, 1486.33, 1468.11, 1553.27, 1561.25, 1589.81, 1662.98, 1620.17, 1633.17, 1566.21, 1542.39, 1624.99], '6M': [952.18, 962.95, 951.36, 943.55, 906.36, 959.09, 1009.54, 1063.74, 1124.15, 1229.82, 1171.47, 1190.06, 1142.58, 1023.16, 1052.59, 1068.85, 1053.01, 1180.03, 1372.23, 1490.86, 1587.57, 1573.3, 1661.1, 1486.33, 1662.98, 1624.99], '1Y': [685.76, 731.84, 690.87, 722.82, 764.4, 740.45, 714.03, 720.01, 730.54, 805.85, 861.8, 826.27, 866.32, 848.11, 840.38, 917.78, 908.45, 915.87, 980.9, 1007.93, 1001.4, 1094.08, 1000.15, 958.35, 884.65, 924.95, 958.02, 979.02, 912.25, 953.25, 936.31, 958.97, 1033.17, 1068.14, 1173.22, 1206.18, 1171.47, 1190.06, 1142.58, 1062, 1077.4, 1076.35, 1002.34, 1191.22, 1363.42, 1527.95, 1587.57, 1573.3, 1661.1, 1486.33, 1662.98, 1624.99] },
      velocityScore: { '1D': -0.9, '1W': 9.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$80B', pe: 116.3, revenueGrowth: 26, eps: 13.97, grossMargin: 55, dividendYield: 0.49,
      etfPresence: { SOXX: 3.31, PSI: 2.29, XSD: 2.18, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 3.05, proScore: 2.16, coverage: 0.5,
      price: 355.76, weeklyPrices: [325.33, 349.17, 342.85, 320.09, 355.76], weeklyChange: 9.35, sortRank: 0, periodReturns: { '1M': 75.5, '6M': 148.9, '1Y': 274.1 },
      priceHistory: { '1W': [325.33, 349.17, 342.85, 320.09, 355.76], '1M': [201.25, 215.69, 213.91, 195.65, 199.79, 207.35, 204.42, 224.09, 228.64, 232.68, 215.58, 244.26, 287.48, 297.84, 306.88, 318.72, 325.33, 349.17, 342.85, 320.09, 355.76], '6M': [142.94, 167.08, 144.94, 168.83, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 215.58, 318.72, 355.76], '1Y': [95.09, 91.46, 92.91, 89.63, 88.57, 97.02, 91.94, 119.48, 128.87, 174.39, 193.64, 172.45, 179.2, 187.95, 232.9, 251.88, 205.27, 194.5, 219.36, 161.46, 154.85, 173.62, 181.94, 157.79, 142.01, 154.22, 152.5, 164.32, 140.24, 169.97, 179.56, 162.61, 182, 163.25, 152.44, 187.67, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 196.64, 201.25, 207.35, 215.58, 318.72, 355.76] },
      velocityScore: { '1D': -2.7, '1W': 3.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$61B', pe: 238.8, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.21, PSI: false, XSD: 3.89, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'STX', name: 'STX', easyScore: 1, avgWeight: 4.15, proScore: 2.08, coverage: 0.25,
      price: 926.61, weeklyPrices: [870.66, 880.72, 879.80, 921.26, 926.61], weeklyChange: 6.43, sortRank: 0, periodReturns: { '1M': 27.5, '6M': 247.2, '1Y': 651.9 },
      priceHistory: { '1W': [870.66, 880.72, 879.8, 921.26, 926.61], '1M': [738.54, 771.01, 786.42, 766.44, 782.64, 834.01, 808.8, 817.35, 804.76, 795.47, 740.84, 733.35, 751.07, 810.46, 812.73, 845.76, 870.66, 880.72, 879.8, 921.26, 926.61], '6M': [266.87, 282.86, 288.13, 282.8, 275.39, 284.47, 320.32, 346.1, 407.69, 429.32, 425.99, 407.4, 379.52, 352.8, 383.71, 411.23, 380.07, 453.3, 513.28, 539.75, 595.86, 738.54, 834.01, 740.84, 845.76, 926.61], '1Y': [123.23, 127.99, 130.87, 138.54, 151.94, 144.5, 147.12, 152.76, 147.42, 147.27, 156.92, 158.4, 167.24, 183.98, 196.81, 216.64, 223.7, 256.84, 224.35, 219.38, 215.05, 265.62, 275.77, 283.26, 259.14, 272.28, 258.67, 298.92, 277.65, 285.27, 287.54, 304.01, 326.23, 358.29, 432.95, 425, 425.99, 407.4, 379.52, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 595.86, 738.54, 834.01, 740.84, 845.76, 926.61] },
      velocityScore: { '1D': -1, '1W': -5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$210B', pe: 87.7, revenueGrowth: 44, eps: 10.56, grossMargin: 42, dividendYield: 0.32,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 4.15 },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'SITM', name: 'SiTime Corp', easyScore: 2, avgWeight: 2.91, proScore: 2.06, coverage: 0.5,
      price: 701.08, weeklyPrices: [726.21, 729.51, 710.20, 665.01, 701.08], weeklyChange: -3.46, sortRank: 0, periodReturns: { '1M': 25.5, '6M': 127.7, '1Y': 241.2 },
      priceHistory: { '1W': [726.21, 729.51, 710.2, 665.01, 701.08], '1M': [564.68, 596.64, 623.33, 797.31, 833.08, 901.48, 847.19, 835.31, 820.21, 774.06, 725.59, 693.66, 697, 711.79, 728.56, 743.12, 726.21, 729.51, 710.2, 665.01, 701.08], '6M': [307.9, 366.49, 363.6, 381.83, 353.19, 333.1, 353.52, 342.9, 363.11, 418.69, 420.23, 396.01, 440.8, 327.35, 326.13, 325.32, 327.2, 363.94, 447.08, 528.1, 547.98, 564.68, 901.48, 725.59, 743.12, 701.08], '1Y': [205.49, 215.25, 220.64, 203.75, 209.36, 209.47, 205.65, 197.84, 195.38, 210.7, 218.24, 221.6, 238.75, 230.5, 258.57, 305.37, 293.69, 295.71, 312.79, 290, 265.49, 277.63, 279.07, 305.85, 270.3, 289.29, 346.5, 376.36, 356.09, 378.07, 369.96, 342.2, 371.44, 345.49, 374.18, 417.36, 420.23, 396.01, 440.8, 356.34, 341.69, 346.17, 311.23, 371.5, 446.04, 523.57, 547.98, 564.68, 901.48, 725.59, 743.12, 701.08] },
      velocityScore: { '1D': -2.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: null, revenueGrowth: 88, eps: -0.91, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: false, PSI: 2.95, XSD: 2.87, DRAM: false },
      tonyNote: 'SiTime Corp appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.86, proScore: 2.02, coverage: 0.5,
      price: 323.62, weeklyPrices: [329.24, 330.28, 321.35, 311.38, 323.62], weeklyChange: -1.71, sortRank: 0, periodReturns: { '1M': 9.6, '6M': 50.3, '1Y': 62.7 },
      priceHistory: { '1W': [329.24, 330.28, 321.35, 311.38, 323.62], '1M': [290.76, 292.35, 303.55, 290.22, 294.75, 305.99, 294.23, 298.41, 294.17, 291.5, 291.68, 294.28, 310.15, 299.38, 316.47, 332.67, 329.24, 330.28, 321.35, 311.38, 323.62], '6M': [215.35, 228.05, 229.75, 225.98, 217.06, 237.89, 238.6, 232.48, 226.14, 224.32, 244.43, 231.16, 224.76, 201.74, 190.86, 191.37, 191.66, 197.08, 208, 221.34, 236.87, 290.76, 305.99, 291.68, 332.67, 323.62], '1Y': [198.96, 218.72, 212.83, 216.28, 231.15, 233.19, 220.58, 224.71, 220.94, 205.92, 230.52, 228.77, 237.67, 225.39, 223.21, 226.51, 227.66, 224.91, 225.64, 217.23, 217.16, 204.71, 210.44, 204.08, 190.06, 193.76, 227.56, 230.78, 223.23, 225.26, 221.28, 241.15, 237.11, 231.05, 231.08, 228.91, 244.43, 231.16, 224.76, 205.25, 191.89, 193.39, 187.39, 195.12, 209.89, 224.5, 236.87, 290.76, 305.99, 291.68, 332.67, 323.62] },
      velocityScore: { '1D': -2.4, '1W': -4.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$82B', pe: 31, revenueGrowth: 12, eps: 10.45, grossMargin: 56, dividendYield: 1.25,
      etfPresence: { SOXX: 3.37, PSI: false, XSD: 2.36, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'SMTC', name: 'Semtech Corp', easyScore: 2, avgWeight: 2.81, proScore: 1.99, coverage: 0.5,
      price: 166.63, weeklyPrices: [157.20, 166.33, 152.54, 149.58, 166.63], weeklyChange: 6, sortRank: 0, periodReturns: { '1M': 54.6, '6M': 128.8, '1Y': 337.2 },
      priceHistory: { '1W': [157.2, 166.33, 152.54, 149.58, 166.63], '1M': [107.1, 112.98, 119.19, 121.5, 121.81, 136.53, 132.08, 139.74, 141.16, 137.64, 132.39, 134.79, 141.85, 146.53, 156.78, 164.46, 157.2, 166.33, 152.54, 149.58, 166.63], '6M': [72.83, 80.54, 71.13, 75.91, 73.69, 72.19, 77.26, 80.52, 79.75, 86.5, 87.12, 86.82, 96.3, 82.02, 84.85, 73.6, 72.16, 82.64, 91.83, 105.91, 101.29, 107.1, 136.53, 132.39, 164.46, 166.63], '1Y': [38.11, 42.16, 40.23, 44.49, 43.96, 48.56, 48.66, 51.65, 53.71, 50.97, 53.24, 48.47, 58.13, 59.9, 60.91, 61.15, 59.83, 71.68, 70.54, 69.79, 65.13, 69.56, 67.5, 71.7, 64.49, 73.45, 73.46, 79.44, 67.13, 75.55, 75.26, 77.79, 77.56, 81.17, 87.76, 88.75, 87.12, 86.82, 96.3, 85.14, 89, 76.52, 70.61, 83.08, 90.12, 103.48, 101.29, 107.1, 136.53, 132.39, 164.46, 166.63] },
      velocityScore: { '1D': -0.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$16B', pe: null, revenueGrowth: 16, eps: -0.42, grossMargin: 52, dividendYield: null,
      etfPresence: { SOXX: false, PSI: 2.98, XSD: 2.64, DRAM: false },
      tonyNote: 'Semtech Corp appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 1, avgWeight: 13.48, proScore: 3.74, coverage: 0.077,
      price: 66.6, weeklyPrices: [67.84, 64.05, 63.54, 65.33, 66.60], weeklyChange: -1.83, sortRank: 0, periodReturns: { '1M': 45.9, '6M': 62, '1Y': 649.2 },
      priceHistory: { '1W': [67.84, 64.05, 63.54, 65.33, 66.6], '1M': [49.48, 54.74, 60.98, 56.85, 61.2, 55.15, 56.56, 55.17, 58.4, 52.94, 50.46, 47.74, 52.71, 58.06, 56.83, 59.78, 67.84, 64.05, 63.54, 65.33, 66.6], '6M': [41.12, 46.84, 36.59, 42.07, 37.77, 45.68, 51.89, 56.68, 53.74, 41.83, 42.22, 42.36, 41.39, 36.7, 41.58, 41.29, 35.09, 35.13, 43.07, 48.72, 48.36, 49.48, 55.15, 50.46, 59.78, 66.6], '1Y': [8.89, 10.49, 9.77, 11.87, 15.66, 17.03, 17.31, 18.99, 16.14, 18.32, 17.73, 19.76, 22.35, 26.13, 32.85, 36.32, 47.14, 47.08, 60.09, 67.98, 51.83, 60.42, 76.41, 55.7, 45.83, 48.45, 43.96, 43.92, 33.78, 41.98, 42.7, 46.03, 57.82, 52.36, 53.08, 46.15, 42.22, 42.36, 41.39, 38.84, 44.94, 42.16, 31.62, 35.74, 47.37, 45.17, 48.36, 49.48, 55.15, 50.46, 59.78, 66.6] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$24B', pe: 86.5, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: 13.48 },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 7, avgWeight: 5.05, proScore: 3.7, coverage: 0.538,
      price: 1064.1, weeklyPrices: [928.41, 923.52, 971.00, 1035.50, 1064.10], weeklyChange: 14.62, sortRank: 0, periodReturns: { '1M': 96.3, '6M': 344.3, '1Y': 940.7 },
      priceHistory: { '1W': [928.41, 923.52, 971, 1035.5, 1064.1], '1M': [576.45, 640.2, 666.59, 646.63, 746.81, 795.33, 766.58, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1], '6M': [239.49, 252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1], '1Y': [102.25, 114.14, 120.34, 127.25, 121.74, 123.11, 116.43, 109.83, 114.74, 108.78, 124.27, 117.21, 117.75, 124.21, 150.57, 168.89, 161.71, 182.15, 196.54, 191.94, 198.47, 226.63, 237.5, 244.9, 225.92, 230.26, 234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1] },
      velocityScore: { '1D': 2.5, '1W': 44, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 50.2, revenueGrowth: 196, eps: 21.18, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { PTF: 5.03, WCLD: false, IGV: false, FDTX: 9.36, GTEK: false, ARKK: false, MARS: false, FRWD: 4.61, BCTK: 5.23, FWD: 1.36, CBSE: 3, FCUS: 6.74, WGMI: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab', easyScore: 1, avgWeight: 13.26, proScore: 3.68, coverage: 0.077,
      price: 123.32, weeklyPrices: [150.23, 148.03, 143.48, 122.39, 123.32], weeklyChange: -17.91, sortRank: 0, periodReturns: { '1M': 56.5, '6M': 194.3, '1Y': 361.5 },
      priceHistory: { '1W': [150.23, 148.03, 143.48, 122.39, 123.32], '1M': [80.31, 78.76, 84.65, 78.58, 105.47, 117.35, 117.56, 124.15, 132.55, 124.77, 131.16, 127.31, 134.28, 125.45, 135.76, 143.2, 150.23, 148.03, 143.48, 122.39, 123.32], '6M': [41.9, 53.43, 55.49, 77.18, 69.76, 83.08, 90.76, 88.9, 80.07, 72.32, 67.44, 70.21, 70.97, 70.11, 68.41, 67.23, 60.93, 67.67, 70.62, 89.46, 82.29, 80.31, 117.35, 131.16, 143.2, 123.32], '1Y': [26.72, 27.17, 26.42, 32.35, 35.68, 39.1, 47.69, 49.15, 46.44, 44.1, 43, 40.69, 46.25, 42.99, 48.43, 47.18, 48.69, 47.97, 65.31, 69.27, 60.56, 66.16, 56.42, 49.97, 43.62, 41.93, 44.72, 57.52, 53.96, 77.18, 75.99, 84.85, 96.3, 80.48, 74.15, 75.84, 67.44, 70.21, 70.97, 71.48, 71.31, 68, 57.38, 66.32, 72.22, 86.64, 82.29, 80.31, 117.35, 131.16, 143.2, 123.32] },
      velocityScore: { '1D': -6.4, '1W': -16.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$71B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 13.26, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 7, avgWeight: 4.24, proScore: 3.11, coverage: 0.538,
      price: 222.82, weeklyPrices: [212.60, 214.25, 211.14, 224.36, 222.82], weeklyChange: 4.81, sortRank: 0, periodReturns: { '1M': 12.3, '6M': 22.8, '1Y': 57.8 },
      priceHistory: { '1W': [212.6, 214.25, 211.14, 224.36, 222.82], '1M': [198.48, 196.5, 207.83, 211.5, 215.2, 219.44, 220.78, 225.83, 235.74, 225.32, 222.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 222.82], '6M': [181.46, 184.97, 177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 222.32, 214.86, 222.82], '1Y': [141.22, 143.96, 144.12, 154.31, 157.25, 164.1, 171.37, 170.78, 179.27, 179.42, 181.59, 175.4, 181.6, 171.66, 177.17, 176.24, 176.97, 187.24, 189.11, 179.83, 180.28, 207.04, 195.21, 193.8, 186.52, 180.26, 179.59, 183.78, 170.94, 188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 216.61, 198.48, 219.44, 222.32, 214.86, 222.82] },
      velocityScore: { '1D': -28.5, '1W': -34.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.4T', pe: 34.1, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.45,
      etfPresence: { PTF: 4.64, WCLD: false, IGV: false, FDTX: 4.62, GTEK: false, ARKK: 1.77, MARS: false, FRWD: 7.89, BCTK: 6.74, FWD: 1.97, CBSE: false, FCUS: false, WGMI: 2.05 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'CIFR', name: 'CIPHER DIGITAL INC', easyScore: 2, avgWeight: 7.83, proScore: 3.07, coverage: 0.154,
      price: 26.29, weeklyPrices: [25.16, 24.59, 23.65, 24.01, 26.29], weeklyChange: 4.49, sortRank: 0, periodReturns: { '1M': 54.3, '6M': 49, '1Y': 665.4 },
      priceHistory: { '1W': [25.16, 24.59, 23.65, 24.01, 26.29], '1M': [17.89, 22.1, 21.91, 20.68, 20.55, 20.28, 20.06, 21.24, 22.29, 20.33, 19.12, 18.8, 19.48, 21.52, 21.97, 23.02, 25.16, 24.59, 23.65, 24.01, 26.29], '6M': [17.64, 19.56, 14.99, 15.91, 14.76, 16.55, 17.52, 17.57, 15.96, 14.73, 16.42, 15.22, 15.76, 13.62, 14.08, 14.01, 13.74, 13.35, 17.76, 19.29, 18.16, 17.89, 20.28, 19.12, 23.02, 26.29], '1Y': [3.43, 4.06, 3.68, 3.85, 5.68, 6.24, 6.27, 6.68, 5.45, 5.21, 4.9, 5.95, 6.99, 7.4, 9.97, 11.85, 14.14, 12.6, 17.6, 21.03, 16.11, 19.59, 24.71, 17.38, 14.62, 19.15, 18.63, 18.48, 14.39, 16.22, 16.2, 16.63, 18.8, 16.49, 15.81, 16.76, 16.42, 15.22, 15.76, 14.31, 15.14, 14.89, 12.02, 14.01, 18.45, 18.04, 18.16, 17.89, 20.28, 19.12, 23.02, 26.29] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$11B', pe: null, revenueGrowth: -29, eps: -2.32, grossMargin: 12, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 0.22, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: 15.43 },
      tonyNote: 'CIPHER DIGITAL INC appears in 2 of 13 Broad Tech ETFs (15% coverage) with average weight 7.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 5, avgWeight: 4.73, proScore: 2.93, coverage: 0.385,
      price: 926.61, weeklyPrices: [870.66, 880.72, 879.80, 921.26, 926.61], weeklyChange: 6.43, sortRank: 0, periodReturns: { '1M': 27.5, '6M': 247.2, '1Y': 651.9 },
      priceHistory: { '1W': [870.66, 880.72, 879.8, 921.26, 926.61], '1M': [738.54, 771.01, 786.42, 766.44, 782.64, 834.01, 808.8, 817.35, 804.76, 795.47, 740.84, 733.35, 751.07, 810.46, 812.73, 845.76, 870.66, 880.72, 879.8, 921.26, 926.61], '6M': [266.87, 282.86, 288.13, 282.8, 275.39, 284.47, 320.32, 346.1, 407.69, 429.32, 425.99, 407.4, 379.52, 352.8, 383.71, 411.23, 380.07, 453.3, 513.28, 539.75, 595.86, 738.54, 834.01, 740.84, 845.76, 926.61], '1Y': [123.23, 127.99, 130.87, 138.54, 151.94, 144.5, 147.12, 152.76, 147.42, 147.27, 156.92, 158.4, 167.24, 183.98, 196.81, 216.64, 223.7, 256.84, 224.35, 219.38, 215.05, 265.62, 275.77, 283.26, 259.14, 272.28, 258.67, 298.92, 277.65, 285.27, 287.54, 304.01, 326.23, 358.29, 432.95, 425, 425.99, 407.4, 379.52, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 595.86, 738.54, 834.01, 740.84, 845.76, 926.61] },
      velocityScore: { '1D': 0.3, '1W': 28.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$210B', pe: 87.7, revenueGrowth: 44, eps: 10.56, grossMargin: 42, dividendYield: 0.32,
      etfPresence: { PTF: 4.82, WCLD: false, IGV: false, FDTX: 4.04, GTEK: false, ARKK: false, MARS: false, FRWD: 8.95, BCTK: false, FWD: 1.05, CBSE: false, FCUS: 4.79, WGMI: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 1, avgWeight: 10.35, proScore: 2.87, coverage: 0.077,
      price: 244.58, weeklyPrices: [190.96, 203.70, 225.78, 248.15, 244.58], weeklyChange: 28.08, sortRank: 0, periodReturns: { '1M': 42.3, '6M': 21.6, '1Y': 44.6 },
      priceHistory: { '1W': [190.96, 203.7, 225.78, 248.15, 244.58], '1M': [180.29, 185.35, 194.03, 194.59, 195.95, 193.84, 186.83, 189.76, 195.61, 192.95, 186.61, 181.46, 188.16, 189.77, 192.08, 193.06, 190.96, 203.7, 225.78, 248.15, 244.58], '6M': [201.1, 221.53, 188.65, 195.34, 194.91, 189.65, 189.85, 177.16, 164.58, 142.82, 160.14, 141.31, 149.25, 152.96, 155.11, 149.68, 139.66, 145.54, 155.62, 177.58, 172.96, 180.29, 193.84, 186.61, 193.06, 244.58], '1Y': [169.14, 177.48, 208.18, 210.72, 229.98, 235, 241.3, 241.9, 250.6, 256.43, 244.18, 235.06, 235.81, 223, 307.86, 296.62, 308.46, 289.01, 288.63, 303.62, 272.66, 275.3, 250.31, 226.99, 225.53, 204.96, 207.73, 223.01, 178.46, 197.49, 195.71, 198.52, 191.09, 182.44, 160.06, 156.59, 160.14, 141.31, 149.25, 151.56, 155.97, 154.34, 138.8, 143.17, 163, 181.17, 172.96, 180.29, 193.84, 186.61, 193.06, 244.58] },
      velocityScore: { '1D': 3.6, '1W': 29.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$703B', pe: 44, revenueGrowth: 22, eps: 5.56, grossMargin: 67, dividendYield: 0.82,
      etfPresence: { PTF: false, WCLD: false, IGV: 10.35, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Oracle lands in 3 AI ETFs on the strength of its cloud database and AI infrastructure contracts. Revenue grew 22%, 67% gross margin, P/E of 40x. The 17.5% weekly return following a major earnings beat shows how quickly sentiment can reprice; the weight score at 2.04% is still modest, meaning ETF managers have started building positions but conviction is not yet deep.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 6, avgWeight: 4.03, proScore: 2.74, coverage: 0.462,
      price: 446.69, weeklyPrices: [422.73, 424.86, 418.45, 435.63, 446.69], weeklyChange: 5.67, sortRank: 0, periodReturns: { '1M': 12.3, '6M': 52.9, '1Y': 126 },
      priceHistory: { '1W': [422.73, 424.86, 418.45, 435.63, 446.69], '1M': [401.61, 394.41, 419.5, 414.15, 411.68, 404.54, 397.28, 399.8, 417.72, 404.35, 395.95, 392.61, 401.62, 407.15, 404.52, 412.32, 422.73, 424.86, 418.45, 435.63, 446.69], '6M': [292.09, 303.41, 286.87, 296.95, 303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.04, 369.11, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 401.61, 404.54, 395.95, 412.32, 446.69], '1Y': [197.61, 212.46, 213.9, 222.74, 233.6, 229.76, 237.56, 240.33, 242.91, 231.37, 241.44, 228.6, 239.29, 235.21, 258.91, 268.64, 280.71, 288.47, 304.52, 304.71, 288.88, 305.09, 293.64, 290.62, 282.37, 289.96, 295.45, 310.14, 276.96, 298.8, 319.61, 323.63, 342.4, 332.71, 341.36, 355.41, 366.36, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 404.98, 401.61, 404.54, 395.95, 412.32, 446.69] },
      velocityScore: { '1D': -5.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 38.2, revenueGrowth: 35, eps: 11.7, grossMargin: 62, dividendYield: 0.85,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6, GTEK: false, ARKK: 1, MARS: false, FRWD: 5.66, BCTK: 8.42, FWD: false, CBSE: 2.55, FCUS: false, WGMI: 0.57 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 4, avgWeight: 4.89, proScore: 2.71, coverage: 0.308,
      price: 521.54, weeklyPrices: [495.54, 518.09, 516.10, 510.13, 521.54], weeklyChange: 5.25, sortRank: 0, periodReturns: { '1M': 44.7, '6M': 142.3, '1Y': 344.6 },
      priceHistory: { '1W': [495.54, 518.09, 516.1, 510.13, 521.54], '1M': [341.54, 355.26, 421.39, 408.46, 455.19, 458.79, 448.29, 445.5, 449.7, 424.1, 420.99, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 521.54], '6M': [215.24, 221.62, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 503.89, 521.54], '1Y': [117.31, 123.24, 127.1, 143.4, 138.52, 144.16, 160.08, 158.65, 179.51, 163.12, 184.42, 165.2, 167.13, 161.79, 155.67, 157.92, 160.88, 164.01, 235.56, 238.6, 230.23, 264.33, 256.33, 258.89, 223.55, 214.24, 217.6, 221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 334.63, 341.54, 458.79, 420.99, 503.89, 521.54] },
      velocityScore: { '1D': 0, '1W': -10, '1M': null, '6M': null }, isNew: false,
      marketCap: '$850B', pe: 172.7, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 5.24, MARS: false, FRWD: 7.92, BCTK: 3.72, FWD: 2.68, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp/DE', easyScore: 2, avgWeight: 6.66, proScore: 2.61, coverage: 0.154,
      price: 1716.36, weeklyPrices: [1589.94, 1641.64, 1694.98, 1761.43, 1716.36], weeklyChange: 7.95, sortRank: 0, periodReturns: { '1M': 44.6, '6M': 735.8, '1Y': 4341.9 },
      priceHistory: { '1W': [1589.94, 1641.64, 1694.98, 1761.43, 1716.36], '1M': [1255.86, 1406.32, 1409.98, 1339.96, 1562.34, 1547.56, 1452.02, 1447.23, 1382.72, 1407.61, 1333.01, 1383.29, 1392.56, 1542.24, 1478.69, 1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36], '6M': [205.35, 219.46, 209.31, 244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1589.55, 1716.36], '1Y': [38.64, 41.59, 44.09, 47.25, 46.21, 46.95, 41.36, 43, 43.39, 42.1, 47.01, 44.4, 48.44, 62.5, 84.3, 98.87, 99.83, 121.12, 131.88, 144.3, 146.95, 204.36, 216.5, 283.1, 245.96, 215.04, 194.38, 232.86, 206.83, 250.08, 275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1070.2, 1255.86, 1547.56, 1333.01, 1589.55, 1716.36] },
      velocityScore: { '1D': 3.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$254B', pe: 58.8, revenueGrowth: 251, eps: 29.18, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 7.81, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: 5.5, WGMI: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 4, avgWeight: 4.66, proScore: 2.59, coverage: 0.308,
      price: 563.1, weeklyPrices: [530.60, 531.18, 531.21, 546.20, 563.10], weeklyChange: 6.13, sortRank: 0, periodReturns: { '1M': 30.5, '6M': 252, '1Y': 947.2 },
      priceHistory: { '1W': [530.6, 531.18, 531.21, 546.2, 563.1], '1M': [442.36, 465.26, 483.15, 463.91, 480, 515.83, 488.74, 494.09, 489.15, 482.02, 458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 563.1], '6M': [159.99, 169.54, 174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 458.68, 524.65, 563.1], '1Y': [53.77, 55.95, 58.57, 62.55, 65.78, 65.06, 66.53, 69.32, 71.43, 73.78, 76.07, 75.64, 80.67, 90.49, 96.15, 105.15, 109.69, 130.59, 121.18, 120.44, 120.47, 141.38, 160.1, 166.11, 153.97, 157.74, 155.59, 181.95, 166.26, 179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 400.73, 442.36, 515.83, 458.68, 524.65, 563.1] },
      velocityScore: { '1D': 0.8, '1W': 18.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$194B', pe: 33.7, revenueGrowth: 46, eps: 16.72, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { PTF: 4.69, WCLD: false, IGV: false, FDTX: 4, GTEK: false, ARKK: false, MARS: false, FRWD: 5.14, BCTK: false, FWD: false, CBSE: false, FCUS: 4.82, WGMI: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 3, avgWeight: 5.27, proScore: 2.53, coverage: 0.231,
      price: 441.31, weeklyPrices: [412.67, 426.99, 450.24, 460.52, 441.31], weeklyChange: 6.94, sortRank: 0, periodReturns: { '1M': 6.5, '6M': -9.9, '1Y': -4.7 },
      priceHistory: { '1W': [412.67, 426.99, 450.24, 460.52, 441.31], '1M': [413.62, 411.38, 413.96, 420.77, 415.12, 412.66, 407.77, 405.21, 409.43, 421.92, 423.54, 417.42, 421.06, 419.09, 418.57, 416.03, 412.67, 426.99, 450.24, 460.52, 441.31], '6M': [490, 492.02, 476.39, 486.85, 483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 384.47, 398.55, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 413.62, 412.66, 423.54, 416.03, 441.31], '1Y': [462.97, 470.92, 478.04, 492.27, 491.09, 501.48, 505.62, 505.87, 513.24, 524.94, 520.58, 505.72, 506.74, 507.97, 501.01, 508.45, 510.15, 519.71, 524.85, 513.43, 520.54, 541.55, 507.16, 511.14, 487.12, 485.5, 477.73, 478.56, 476.12, 488.02, 472.94, 479.28, 459.86, 470.28, 423.37, 413.6, 401.32, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 424.82, 413.62, 412.66, 423.54, 416.03, 441.31] },
      velocityScore: { '1D': -39.9, '1W': -49.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.3T', pe: 26.3, revenueGrowth: 18, eps: 16.81, grossMargin: 68, dividendYield: 0.82,
      etfPresence: { PTF: false, WCLD: false, IGV: 7.73, FDTX: 3.79, GTEK: false, ARKK: false, MARS: false, FRWD: 4.28, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 3, avgWeight: 4.91, proScore: 2.36, coverage: 0.231,
      price: 423.74, weeklyPrices: [440.36, 442.10, 435.79, 415.88, 423.74], weeklyChange: -3.77, sortRank: 0, periodReturns: { '1M': 8.4, '6M': -1.3, '1Y': 23.1 },
      priceHistory: { '1W': [440.36, 442.1, 435.79, 415.88, 423.74], '1M': [392.51, 389.37, 398.73, 411.79, 428.35, 445, 433.45, 445.27, 443.3, 422.24, 409.99, 404.11, 417.26, 417.85, 426.01, 433.59, 440.36, 442.1, 435.79, 415.88, 423.74], '6M': [429.24, 445.17, 489.88, 485.56, 449.72, 435.8, 438.57, 449.06, 430.41, 411.11, 417.44, 399.83, 403.32, 396.73, 391.2, 367.96, 361.83, 352.82, 352.42, 392.5, 378.67, 392.51, 445, 409.99, 433.59, 423.74], '1Y': [344.27, 326.09, 316.35, 327.55, 315.65, 309.87, 321.67, 332.56, 319.04, 319.91, 339.38, 323.9, 349.6, 338.53, 368.81, 416.85, 442.79, 459.46, 438.69, 435.15, 438.97, 461.51, 462.07, 430.6, 403.99, 426.58, 446.74, 451.45, 467.26, 485.4, 438.07, 445.01, 437.5, 435.2, 421.81, 417.32, 417.44, 399.83, 403.32, 398.68, 395.56, 380.85, 355.28, 346.65, 364.2, 386.42, 378.67, 392.51, 445, 409.99, 433.59, 423.74] },
      velocityScore: { '1D': -46.8, '1W': -54.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: 385.2, revenueGrowth: 16, eps: 1.1, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 10.23, MARS: false, FRWD: false, BCTK: 3.36, FWD: 1.15, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
    {
      ticker: 'LRCX', name: 'Lam Research Corp', easyScore: 5, avgWeight: 3.74, proScore: 2.32, coverage: 0.385,
      price: 334.41, weeklyPrices: [318.93, 318.00, 318.18, 317.12, 334.41], weeklyChange: 4.85, sortRank: 0, periodReturns: { '1M': 30.3, '6M': 111.4, '1Y': 299.7 },
      priceHistory: { '1W': [318.93, 318, 318.18, 317.12, 334.41], '1M': [258.57, 275.8, 297.17, 286.52, 294.05, 296.05, 289.24, 295.44, 299.15, 284.72, 277.96, 273.38, 292.09, 302.24, 305.35, 322.68, 318.93, 318, 318.18, 317.12, 334.41], '6M': [158.19, 165.81, 163.26, 175.16, 171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 242.27, 231, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 296.05, 277.96, 322.68, 334.41], '1Y': [83.66, 91, 92.66, 96.02, 98.83, 101.06, 100.37, 97.1, 99.09, 95.94, 106.74, 99.15, 103.67, 100.42, 115.58, 126.32, 128.32, 142.79, 142.54, 144.78, 141.25, 160.67, 165.05, 161.42, 148.8, 155.14, 159.75, 168.26, 154.98, 177.33, 185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.53, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 259.47, 258.57, 296.05, 277.96, 322.68, 334.41] },
      velocityScore: { '1D': -1.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$418B', pe: 63.3, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.31,
      etfPresence: { PTF: 2.52, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.62, BCTK: 6.38, FWD: 1.66, CBSE: 2.54, FCUS: false, WGMI: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'MRVL', name: 'Marvell Technology Inc', easyScore: 3, avgWeight: 4.75, proScore: 2.28, coverage: 0.231,
      price: 290.79, weeklyPrices: [198.70, 204.83, 205.00, 219.43, 290.79], weeklyChange: 46.35, sortRank: 0, periodReturns: { '1M': 76.3, '6M': 213, '1Y': 366.3 },
      priceHistory: { '1W': [198.7, 204.83, 205, 219.43, 290.79], '1M': [163.66, 168.75, 172.15, 160.01, 170.13, 170.84, 164.5, 177.95, 182.58, 176.89, 168.93, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 204.83, 205, 219.43, 290.79], '6M': [92.89, 88.9, 84.07, 87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.84, 168.93, 208.26, 290.79], '1Y': [62.36, 68.84, 69.99, 75.93, 74.25, 73.36, 70.85, 73.27, 81.74, 75.32, 79.32, 71.22, 74.79, 64.1, 66.59, 74.23, 80.09, 83.89, 92.5, 88.89, 81.05, 90.15, 92.9, 89.33, 81.32, 87.72, 100.2, 92.47, 81.7, 86.49, 89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 78.61, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 158.21, 163.66, 170.84, 168.93, 208.26, 290.79] },
      velocityScore: { '1D': 1.3, '1W': -26, '1M': null, '6M': null }, isNew: false,
      marketCap: '$254B', pe: 99.9, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.08,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 8.06, GTEK: 3.45, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: 2.73, FCUS: false, WGMI: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 5, avgWeight: 3.58, proScore: 2.22, coverage: 0.385,
      price: 481.57, weeklyPrices: [421.86, 426.58, 446.77, 459.97, 481.57], weeklyChange: 14.15, sortRank: 0, periodReturns: { '1M': 14.3, '6M': 26.2, '1Y': 87.5 },
      priceHistory: { '1W': [421.86, 426.58, 446.77, 459.97, 481.57], '1M': [416.5, 427.36, 425.44, 412.56, 430, 428.43, 419.3, 416.79, 439.79, 425.19, 420.71, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 481.57], '6M': [381.57, 406.29, 341.3, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 420.71, 422.01, 481.57], '1Y': [256.85, 244.63, 249.37, 264.65, 269.9, 275.4, 280.81, 283.69, 302.62, 301.67, 309.09, 291.17, 300.25, 306.1, 359.63, 345.35, 339.31, 333.39, 345.5, 351.33, 340.3, 385.98, 358.98, 355.22, 354.42, 397.57, 380.61, 412.97, 326.02, 350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 418.2, 416.5, 428.43, 420.71, 422.01, 481.57] },
      velocityScore: { '1D': 0.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 93.5, revenueGrowth: 30, eps: 5.15, grossMargin: 77, dividendYield: 0.54,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.79, GTEK: false, ARKK: 1.27, MARS: false, FRWD: 4.58, BCTK: 8.25, FWD: 3.02, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'PANW', name: 'PANW', easyScore: 3, avgWeight: 4.57, proScore: 2.19, coverage: 0.231,
      price: 297.18, weeklyPrices: [248.47, 257.77, 281.69, 300.48, 297.18], weeklyChange: 19.6, sortRank: 0, periodReturns: { '1M': 64.1, '6M': 56.5, '1Y': 50.8 },
      priceHistory: { '1W': [248.47, 257.77, 281.69, 300.48, 297.18], '1M': [184.56, 183.98, 183.68, 196.53, 207.88, 213.66, 215.6, 227.79, 238.21, 242.83, 247.55, 240.13, 246.66, 252.92, 260.58, 256.75, 248.47, 257.77, 281.69, 300.48, 297.18], '6M': [189.88, 195, 187.09, 188.12, 184.2, 190.8, 187.73, 180.18, 176.97, 159.32, 166.95, 144.14, 150.15, 165.05, 167.02, 162.95, 147.02, 161.95, 162.51, 169.56, 182.9, 184.56, 213.66, 247.55, 256.75, 297.18], '1Y': [197.12, 195.95, 202.05, 204.3, 196.97, 192.07, 192.59, 199.22, 183.03, 172.89, 176.86, 184.43, 187.61, 192.35, 198.33, 205.68, 200.7, 206.8, 217.79, 206.7, 212.42, 217.16, 213.18, 210.04, 199.9, 185.35, 193.63, 192.96, 183.44, 187.22, 179.37, 189.02, 187.66, 184.22, 175.42, 166, 166.95, 144.14, 150.15, 165.1, 167.45, 164.05, 154.35, 169.87, 161.59, 174.96, 182.9, 184.56, 213.66, 247.55, 256.75, 297.18] },
      velocityScore: { '1D': 0, '1W': 1.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$241B', pe: 256.2, revenueGrowth: 15, eps: 1.16, grossMargin: 74, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.39, IGV: 7.64, FDTX: 3.67, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'SATS', name: 'SATS', easyScore: 1, avgWeight: 7.81, proScore: 2.17, coverage: 0.077,
      price: 123.55, weeklyPrices: [122.46, 131.07, 129.19, 127.42, 123.55], weeklyChange: 0.89, sortRank: 0, periodReturns: { '1M': 0.3, '6M': 66.8, '1Y': 665 },
      priceHistory: { '1W': [122.46, 131.07, 129.19, 127.42, 123.55], '1M': [120.34, 117.34, 125.75, 122.62, 127.15, 129.14, 129.38, 133.23, 135.11, 137.23, 136.45, 136.52, 141.8, 128.44, 124.2, 123.12, 122.46, 131.07, 129.19, 127.42, 123.55], '6M': [74.06, 93.54, 103.64, 106.76, 108.7, 116.95, 123.55, 126.5, 113.22, 111.61, 113.15, 107.42, 118.68, 106.24, 108.34, 109.84, 115.21, 126.95, 125.55, 135.11, 121.63, 120.34, 129.14, 136.45, 123.12, 123.55], '1Y': [16.15, 16.74, 24.38, 24.63, 29.49, 32.13, 29.09, 29.61, 32.82, 26.99, 28.41, 27.65, 58.76, 67.22, 77.04, 71.22, 73.1, 79.5, 76.25, 74.85, 72.23, 73.62, 72.32, 69.63, 69.1, 70.88, 74.03, 103.98, 100.89, 106.95, 112.18, 120, 123.27, 119.72, 116.55, 115.19, 113.15, 107.42, 118.68, 109.92, 114.33, 109.49, 112.23, 124.77, 130.47, 123.86, 121.63, 120.34, 129.14, 136.45, 123.12, 123.55] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$36B', pe: null, revenueGrowth: -5, eps: -50.21, grossMargin: 27, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 7.81, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'EchoStar and satellite infrastructure names appear in Electrification ETFs on the connectivity-for-remote-grid thesis. This is a niche allocation — modest weight, selective coverage — reflecting ETF managers building a small satellite and connectivity basket as adjacent infrastructure to the energy transition.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 3, avgWeight: 4.44, proScore: 2.13, coverage: 0.231,
      price: 152.17, weeklyPrices: [132.51, 143.34, 156.54, 160.65, 152.17], weeklyChange: 14.84, sortRank: 0, periodReturns: { '1M': 5.6, '6M': -10.9, '1Y': 14.3 },
      priceHistory: { '1W': [132.51, 143.34, 156.54, 160.65, 152.17], '1M': [146.03, 135.91, 133.79, 137.05, 137.8, 136.89, 136, 130.05, 133.73, 133.99, 135.14, 135.26, 137.15, 137.41, 136.88, 136.6, 132.51, 143.34, 156.54, 160.65, 152.17], '6M': [170.69, 181.84, 187.75, 194.13, 177.75, 176.86, 177.07, 169.6, 146.59, 135.9, 131.41, 130.6, 145.17, 157.16, 150.95, 150.68, 143.06, 147.93, 132.37, 145.89, 143.1, 146.03, 136.89, 135.14, 136.6, 152.17], '1Y': [133.17, 132.81, 138.2, 142.9, 132.12, 142.5, 150.91, 154.63, 158.61, 179.54, 184.37, 156.01, 156.72, 156.14, 164.36, 176.97, 179.56, 184.95, 183.56, 179.62, 175.49, 198.81, 187.9, 184.17, 165.42, 165.77, 176.08, 187.91, 177.29, 194.17, 167.86, 177.49, 170.96, 167.47, 147.76, 142.91, 131.41, 130.6, 145.17, 156.43, 152.72, 160.84, 137.55, 150.07, 135.7, 145.97, 143.1, 146.03, 136.89, 135.14, 136.6, 152.17] },
      velocityScore: { '1D': -2.7, '1W': -7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$365B', pe: 172.9, revenueGrowth: 85, eps: 0.88, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 7.21, FDTX: 2.87, GTEK: false, ARKK: 3.24, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile Inc', easyScore: 2, avgWeight: 5.43, proScore: 2.13, coverage: 0.154,
      price: 118.17, weeklyPrices: [129.60, 133.09, 113.41, 105.65, 118.17], weeklyChange: -8.82, sortRank: 0, periodReturns: { '1M': 66.7, '6M': 107.7, '1Y': 369.3 },
      priceHistory: { '1W': [129.6, 133.09, 113.41, 105.65, 118.17], '1M': [68.43, 63.87, 70.68, 65.35, 75.05, 82.55, 72.96, 74.81, 83.01, 83.67, 86.83, 88.1, 89.58, 96.23, 105.86, 119.7, 129.6, 133.09, 113.41, 105.65, 118.17], '6M': [56.89, 72.84, 68.37, 85.67, 72.63, 90.56, 101.25, 113.57, 111.21, 101.79, 82.51, 83.9, 86.92, 89.47, 86.34, 89.93, 78.67, 94.81, 98.97, 81, 77.2, 68.43, 82.55, 86.83, 119.7, 118.17], '1Y': [25.18, 35.71, 40.1, 49.97, 45.71, 43.97, 52.63, 58.92, 54.29, 51.79, 50.05, 45.08, 48.25, 41.86, 38.37, 41.44, 54.5, 56.94, 81.2, 95.69, 71.35, 80.06, 70.38, 64.49, 58.01, 55.52, 61.44, 79.05, 61.86, 78.05, 83.47, 97.67, 115.77, 104.78, 104.55, 102.12, 82.51, 83.9, 86.92, 89.76, 89.11, 88.42, 73.82, 92.57, 88.57, 80.01, 77.2, 68.43, 82.55, 86.83, 119.7, 118.17] },
      velocityScore: { '1D': null, '1W': -26.8, '1M': null, '6M': null }, isNew: true,
      marketCap: '$46B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { PTF: 1.87, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 9, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 3, avgWeight: 5.4, proScore: 4.68, coverage: 0.75,
      price: 299.07, weeklyPrices: [295.94, 288.90, 284.42, 288.12, 299.07], weeklyChange: 1.06, sortRank: 0, periodReturns: { '1M': 8.6, '6M': 178.2, '1Y': 416.8 },
      priceHistory: { '1W': [295.94, 288.9, 284.42, 288.12, 299.07], '1M': [269.95, 294.69, 320.3, 305.93, 309.39, 322.05, 308.05, 300.84, 296.98, 292.65, 266.8, 261.58, 271.05, 270.75, 279.22, 291.97, 295.94, 288.9, 284.42, 288.12, 299.07], '6M': [107.5, 115.02, 110.88, 112.88, 106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 181.38, 177.5, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 269.95, 322.05, 266.8, 291.97, 299.07], '1Y': [57.87, 61.92, 60.3, 63.42, 72.84, 70.96, 72.53, 78.32, 76.88, 75.95, 86.57, 82.17, 91.46, 90.24, 97.47, 101.43, 97.88, 105.74, 105.13, 109.92, 110.96, 136.12, 131.92, 118.74, 95.1, 107.26, 107.83, 119.95, 105.77, 112.06, 117.51, 121.83, 139.99, 141.15, 146.79, 187.3, 195.02, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 260.52, 269.95, 322.05, 266.8, 291.97, 299.07] },
      velocityScore: { '1D': 2, '1W': -7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 58.5, revenueGrowth: 7, eps: 5.11, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { POW: 6.56, VOLT: 8.03, PBD: false, PBW: 1.62 },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 2, avgWeight: 4.81, proScore: 3.4, coverage: 0.5,
      price: 417.62, weeklyPrices: [406.37, 401.94, 400.60, 400.08, 417.62], weeklyChange: 2.77, sortRank: 0, periodReturns: { '1M': -1.9, '6M': 25.4, '1Y': 28.2 },
      priceHistory: { '1W': [406.37, 401.94, 400.6, 400.08, 417.62], '1M': [422.44, 410.86, 421.39, 399.15, 401.51, 419, 401.53, 406.94, 408.1, 399.44, 381.87, 371.88, 379.69, 381.51, 391.35, 403.13, 406.37, 401.94, 400.6, 400.08, 417.62], '6M': [333.11, 341.76, 329.93, 322.81, 318.51, 320.58, 333.46, 331.22, 351.42, 373.82, 389.25, 362.05, 377.4, 347.75, 355.4, 356.8, 357.36, 363.89, 403.36, 407.57, 416.77, 422.44, 419, 381.87, 403.13, 417.62], '1Y': [325.84, 324.24, 330.51, 342.35, 358.19, 357.64, 362.89, 380.24, 390.09, 358.16, 357.49, 346.22, 351.4, 348.22, 360.08, 371.27, 372.21, 373.84, 376.7, 381.72, 360.6, 387.75, 385.44, 369.4, 345.65, 341.69, 335.57, 353.45, 315.82, 323.67, 327.31, 324.51, 343.75, 332.28, 359.44, 377.06, 389.25, 362.05, 377.4, 353.87, 361.04, 359.74, 343.53, 368.85, 401.9, 409.7, 416.77, 422.44, 419, 381.87, 403.13, 417.62] },
      velocityScore: { '1D': 2.7, '1W': 5.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$162B', pe: 40.8, revenueGrowth: 17, eps: 10.23, grossMargin: 37, dividendYield: 1.05,
      etfPresence: { POW: 4.09, VOLT: 5.53, PBD: false, PBW: false },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 3, avgWeight: 3.84, proScore: 3.32, coverage: 0.75,
      price: 269.22, weeklyPrices: [280.13, 276.96, 274.52, 269.86, 269.22], weeklyChange: -3.89, sortRank: 0, periodReturns: { '1M': -5.1, '6M': 66.6, '1Y': 267.6 },
      priceHistory: { '1W': [280.13, 276.96, 274.52, 269.86, 269.22], '1M': [286.69, 297.17, 286.89, 290.46, 297.98, 302.73, 298.22, 266.92, 268.73, 256.72, 258.28, 249.71, 254.75, 260.4, 270.01, 276.25, 280.13, 276.96, 274.52, 269.86, 269.22], '6M': [161.55, 167.43, 171.76, 177.23, 169.63, 180.24, 196.61, 196.5, 201.19, 220.78, 232.84, 231.83, 222.45, 191.87, 197.65, 204.09, 203.53, 206.9, 237.93, 254.38, 250.96, 286.69, 302.73, 258.28, 276.25, 269.22], '1Y': [73.23, 79.57, 87.35, 91.58, 98.83, 102.3, 98.77, 107.07, 125.91, 131.1, 134.58, 128.41, 140.42, 143.06, 148.32, 150.97, 142.27, 142.5, 146.89, 150.77, 148.25, 152.46, 154.86, 153.75, 144.89, 152.69, 159.74, 172.82, 164.18, 176.17, 172.78, 187.43, 200.11, 205.17, 215.59, 229.32, 232.84, 231.83, 222.45, 191.81, 205.11, 214.98, 197.83, 210.32, 237.34, 257.41, 250.96, 286.69, 302.73, 258.28, 276.25, 269.22] },
      velocityScore: { '1D': -2.4, '1W': -8.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 65, revenueGrowth: 17, eps: 4.14, grossMargin: 39, dividendYield: 0.1,
      etfPresence: { POW: 3.09, VOLT: 7.15, PBD: false, PBW: 1.27 },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 3, avgWeight: 3.78, proScore: 3.27, coverage: 0.75,
      price: 706.06, weeklyPrices: [733.62, 730.10, 711.73, 687.48, 706.06], weeklyChange: -3.76, sortRank: 0, periodReturns: { '1M': -4.9, '6M': 55.3, '1Y': 98.1 },
      priceHistory: { '1W': [733.62, 730.1, 711.73, 687.48, 706.06], '1M': [757.34, 771.61, 785.24, 750.73, 745, 781.38, 765.81, 773.72, 780.08, 769.99, 723.03, 714.13, 709.93, 716.91, 723.44, 742.18, 733.62, 730.1, 711.73, 687.48, 706.06], '6M': [454.72, 457.96, 438.49, 435.2, 422.06, 413.17, 447.64, 468.76, 474.63, 508.11, 524.08, 549.11, 572.66, 540.19, 559.02, 555.39, 549.98, 554.38, 595.84, 604.97, 637.28, 757.34, 781.38, 723.03, 742.18, 706.06], '1Y': [356.49, 348.76, 358.62, 374.07, 373.41, 380.09, 389.12, 405.11, 411.11, 387.5, 379.96, 375.87, 381.56, 376.09, 389.64, 390.65, 402.87, 420.65, 443.45, 436.93, 412.21, 448.69, 453.45, 449.42, 445.47, 460.43, 456.02, 462.21, 414.25, 433.58, 439.68, 422.57, 466.75, 470.77, 477.77, 514.56, 524.08, 549.11, 572.66, 568.04, 574.02, 567.45, 533.78, 555.57, 594.4, 605.89, 637.28, 757.34, 781.38, 723.03, 742.18, 706.06] },
      velocityScore: { '1D': 0.6, '1W': -10.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$106B', pe: 97.1, revenueGrowth: 26, eps: 7.27, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.65, VOLT: 5.46, PBD: false, PBW: 1.23 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, avgWeight: 5.72, proScore: 2.86, coverage: 0.25,
      price: 332.95, weeklyPrices: [345.84, 342.09, 334.84, 328.85, 332.95], weeklyChange: -3.73, sortRank: 0, periodReturns: { '1M': 24.1, '6M': 265.3, '1Y': 658.6 },
      priceHistory: { '1W': [345.84, 342.09, 334.84, 328.85, 332.95], '1M': [251.02, 266.01, 280.34, 261.34, 256.47, 312.96, 292.53, 309.27, 290.54, 273.67, 249.02, 243.43, 264.2, 268.29, 267.99, 332.95, 345.84, 342.09, 334.84, 328.85, 332.95], '6M': [91.14, 99.3, 93.45, 108.97, 109.6, 136.11, 145.48, 153.29, 157.67, 159.87, 155.96, 171.8, 209.19, 162.67, 172.57, 164.54, 153.02, 155.71, 186.22, 224.81, 268.61, 251.02, 312.96, 249.02, 332.95, 332.95], '1Y': [43.89, 45.79, 44.25, 46.05, 45.85, 47.06, 47.32, 52.68, 45.81, 46.13, 49.48, 46.49, 51.32, 51.9, 50.96, 53.84, 52.81, 49.31, 51.5, 57.31, 85.76, 91.17, 94.88, 94.35, 85.07, 89.54, 92.82, 100.83, 97.19, 108.46, 116.86, 142.31, 149.88, 158.46, 165.35, 159.04, 155.96, 171.8, 209.19, 170.03, 185.42, 173.07, 142.22, 159.83, 190.1, 246.24, 268.61, 251.02, 312.96, 249.02, 332.95, 332.95] },
      velocityScore: { '1D': 1.4, '1W': 3.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 111.4, revenueGrowth: 20, eps: 2.99, grossMargin: 54, dividendYield: null,
      etfPresence: { POW: 5.72, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Vicor Corp is a power conversion specialist — high-efficiency modules for AI server power delivery. It holds a niche position in Industrials ETFs on the data center power density thesis. Revenue growth has been lumpy, but when AI GPU clusters require Vicor\'s factorized power architecture, the order cycles are large.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 2, avgWeight: 3.62, proScore: 2.56, coverage: 0.5,
      price: 969.67, weeklyPrices: [1031.89, 996.00, 968.32, 950.54, 969.67], weeklyChange: -6.03, sortRank: 0, periodReturns: { '1M': -8.8, '6M': 61.2, '1Y': 96.7 },
      priceHistory: { '1W': [1031.89, 996, 968.32, 950.54, 969.67], '1M': [1073.95, 1095.21, 1118.96, 1045.63, 1040.15, 1073.08, 1071.98, 1062.57, 1090.53, 1049.23, 1012.25, 1011.8, 1024.52, 1043.82, 1038.74, 1070.47, 1031.89, 996, 968.32, 950.54, 969.67], '6M': [601.58, 625.3, 686.22, 661.45, 653.57, 628.4, 642.23, 657.78, 726.37, 779.35, 802.13, 831.7, 881.18, 789.23, 805.02, 851.07, 853.16, 897.36, 991.12, 990.18, 1120.23, 1073.95, 1073.08, 1012.25, 1070.47, 969.67], '1Y': [492.97, 465.31, 488.66, 502.67, 505.07, 539.36, 561.17, 629.03, 655, 664.55, 634.31, 604.59, 622.39, 598.81, 634.15, 611, 628.97, 606.15, 625.45, 615.95, 576, 577.97, 559.7, 575.4, 595.37, 589.72, 601.97, 723, 614.19, 667.32, 679.55, 622.5, 681.55, 665.99, 754.97, 801.54, 802.13, 831.7, 881.18, 830.1, 827.37, 882.64, 817.35, 910.75, 987.5, 991.3, 1120.23, 1073.95, 1073.08, 1012.25, 1070.47, 969.67] },
      velocityScore: { '1D': 0.4, '1W': -7.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$261B', pe: 28.3, revenueGrowth: 16, eps: 34.23, grossMargin: 20, dividendYield: 0.21,
      etfPresence: { POW: 3.25, VOLT: 3.98, PBD: false, PBW: false },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 2, avgWeight: 3.58, proScore: 2.53, coverage: 0.5,
      price: 173.39, weeklyPrices: [167.80, 164.87, 166.99, 171.55, 173.39], weeklyChange: 3.33, sortRank: 0, periodReturns: { '1M': 9.1, '6M': 64.6, '1Y': 161.8 },
      priceHistory: { '1W': [167.8, 164.87, 166.99, 171.55, 173.39], '1M': [162.69, 169.41, 172.49, 166.73, 169.95, 173.39, 170.74, 172.91, 173.96, 169.01, 160.69, 158.23, 161.86, 163.57, 164.66, 169.29, 167.8, 164.87, 166.99, 171.55, 173.39], '6M': [105.36, 107.42, 102.41, 103.97, 101.97, 102.72, 107.98, 110.29, 112.26, 112.64, 113.25, 114.93, 120.27, 106.02, 109.93, 116.3, 116.98, 117.41, 133.16, 135.8, 141.71, 162.69, 173.39, 160.69, 169.29, 173.39], '1Y': [66.22, 67.96, 69.83, 72, 73.44, 74.67, 74.48, 76.63, 78.72, 90.24, 90.61, 88.04, 91.11, 91.93, 95.71, 98.65, 97.27, 100.12, 98.72, 101.1, 96.93, 106.28, 112.5, 111.46, 105.74, 106.53, 104.97, 108.87, 94.99, 103.97, 106.82, 105.38, 112.5, 110.58, 115.79, 114.62, 113.25, 114.93, 120.27, 108.13, 114.3, 121, 112.75, 118.92, 134.48, 137, 141.71, 162.69, 173.39, 160.69, 169.29, 173.39] },
      velocityScore: { '1D': -0.4, '1W': 4.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$28B', pe: 58.8, revenueGrowth: 54, eps: 2.95, grossMargin: 37, dividendYield: 0.48,
      etfPresence: { POW: 3.93, VOLT: 3.24, PBD: false, PBW: false },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 3, avgWeight: 2.5, proScore: 2.16, coverage: 0.75,
      price: 302.85, weeklyPrices: [293.80, 290.01, 285.00, 273.51, 302.85], weeklyChange: 3.08, sortRank: 0, periodReturns: { '1M': 4.2, '6M': 188.4, '1Y': 1383.8 },
      priceHistory: { '1W': [293.8, 290.01, 285, 273.51, 302.85], '1M': [288.64, 295.25, 285.47, 258.64, 261.03, 283.92, 280.69, 289.76, 303.41, 275.95, 258.71, 261.34, 282.31, 307.88, 302.49, 302.4, 293.8, 290.01, 285, 273.51, 302.85], '6M': [105, 109.44, 87.61, 91.43, 86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 166, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 283.92, 258.71, 302.4, 302.85], '1Y': [20.41, 21.63, 21.34, 21.6, 22.56, 25.85, 24.69, 26.89, 37.62, 38.86, 44.08, 44.51, 50.85, 54.91, 67.29, 80.97, 69.18, 90.19, 87.58, 116.58, 94.37, 133.71, 141.41, 126.72, 108.93, 101.14, 102.5, 101.29, 76.97, 91.88, 98.69, 134.07, 149.5, 139.62, 156.13, 155.17, 139.74, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 234.68, 288.64, 283.92, 258.71, 302.4, 302.85] },
      velocityScore: { '1D': -6.1, '1W': -11.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$86B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: 4.7, PBD: 0.81, PBW: 1.98 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 2, avgWeight: 2.95, proScore: 2.09, coverage: 0.5,
      price: 85.68, weeklyPrices: [87.65, 87.25, 87.01, 83.66, 85.68], weeklyChange: -2.25, sortRank: 0, periodReturns: { '1M': -11.6, '6M': 1.3, '1Y': 20.8 },
      priceHistory: { '1W': [87.65, 87.25, 87.01, 83.66, 85.68], '1M': [95.51, 96.28, 95.39, 93.32, 93.1, 94.84, 94.59, 94.85, 95.68, 93.36, 89.04, 90.06, 88.27, 89.69, 88.55, 87.65, 87.65, 87.25, 87.01, 83.66, 85.68], '6M': [84.58, 79.64, 81.32, 79.79, 80.28, 79.49, 82.19, 84.81, 87.9, 89.47, 93.8, 94.06, 92.71, 91.02, 92.78, 89.5, 91.4, 92.73, 92.3, 92.01, 94.83, 95.51, 94.84, 89.04, 87.65, 85.68], '1Y': [70.95, 72.81, 71.86, 70.34, 73.02, 74.64, 74.77, 72.82, 70.99, 70.54, 72.3, 76.18, 73.89, 70.87, 71.32, 70.79, 73.83, 78.67, 84.04, 85.79, 82.84, 81.76, 82.14, 85.89, 84.27, 85.54, 84.95, 81.27, 80.29, 80.45, 80.93, 79.89, 83.63, 85.47, 86.33, 89.48, 93.8, 94.06, 92.71, 92.01, 92.82, 90.23, 92.05, 93.67, 91.31, 90.6, 94.83, 95.51, 94.84, 89.04, 87.65, 85.68] },
      velocityScore: { '1D': 0.5, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$179B', pe: 21.7, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.91,
      etfPresence: { POW: 1.93, VOLT: 3.97, PBD: false, PBW: false },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 3, avgWeight: 2.31, proScore: 2, coverage: 0.75,
      price: 480.46, weeklyPrices: [484.25, 473.93, 473.61, 462.93, 480.46], weeklyChange: -0.78, sortRank: 0, periodReturns: { '1M': -5.5, '6M': 12.4, '1Y': 23.2 },
      priceHistory: { '1W': [484.25, 473.93, 473.61, 462.93, 480.46], '1M': [516, 507.81, 502.34, 493.04, 492.58, 490.16, 485.98, 483.79, 482.03, 479.97, 470.87, 461.5, 463.32, 460.98, 475.01, 478.05, 484.25, 473.93, 473.61, 462.93, 480.46], '6M': [427.48, 438.7, 438.42, 455.92, 444.11, 460.87, 484.11, 485.53, 487.94, 503.8, 524.12, 516.99, 516.98, 471.54, 467.38, 475.74, 480.97, 499.2, 539.79, 546.23, 555.34, 516, 490.16, 470.87, 478.05, 480.46], '1Y': [390.07, 388.09, 391.22, 399.06, 415.12, 422.26, 418.42, 434.95, 437.44, 423.57, 443.95, 429.96, 446.06, 437.16, 450.93, 440.1, 431.16, 430.47, 419.67, 434.05, 422.63, 472.57, 468.06, 453, 419.09, 428.47, 429.34, 448.18, 429.68, 456.28, 463.03, 470.53, 489.31, 486.82, 495.59, 506.14, 524.12, 516.99, 516.98, 487.76, 472.64, 489.07, 472.07, 499.31, 545.62, 549.11, 555.34, 516, 490.16, 470.87, 478.05, 480.46] },
      velocityScore: { '1D': 4.7, '1W': -4.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 28.4, revenueGrowth: 11, eps: 16.91, grossMargin: 36, dividendYield: 1.18,
      etfPresence: { POW: 2.79, VOLT: 3.28, PBD: 0.87, PBW: false },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 2.74, proScore: 1.94, coverage: 0.5,
      price: 127.11, weeklyPrices: [129.57, 127.76, 126.67, 123.79, 127.11], weeklyChange: -1.9, sortRank: 0, periodReturns: { '1M': -7.2, '6M': 6.6, '1Y': 23.6 },
      priceHistory: { '1W': [129.57, 127.76, 126.67, 123.79, 127.11], '1M': [134.66, 137.04, 132.56, 131.76, 130.16, 130.7, 131.94, 127.95, 128.6, 125.15, 127.68, 128.92, 128.87, 129.61, 131.59, 130.9, 129.57, 127.76, 126.67, 123.79, 127.11], '6M': [119.23, 116.07, 114.57, 115.15, 115.31, 115.93, 119.4, 116.63, 119.78, 120.8, 129.94, 132.03, 133.29, 131.87, 133.61, 125.66, 130.1, 132.36, 134.46, 133.28, 135.07, 134.66, 130.7, 127.68, 130.9, 127.11], '1Y': [102.83, 101.87, 101.62, 101.41, 103.26, 106.04, 105.49, 108.89, 113.25, 113.49, 113.11, 113.55, 112.89, 108.64, 108.74, 106.44, 108.88, 112.75, 118.19, 118.53, 117.27, 122.11, 119.76, 122.68, 121.71, 122.72, 118.06, 114.16, 114.71, 115.31, 115.81, 116.91, 119.96, 118.02, 118.33, 121.1, 129.94, 132.03, 133.29, 131.86, 134.15, 127.92, 131.12, 132.92, 135.46, 131.89, 135.07, 134.66, 130.7, 127.68, 130.9, 127.11] },
      velocityScore: { '1D': 0.5, '1W': -1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$69B', pe: 18.8, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.99,
      etfPresence: { POW: 1.33, VOLT: 4.15, PBD: false, PBW: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'PRY', name: 'Prysmian SpA', easyScore: 2, avgWeight: 2.7, proScore: 1.91, coverage: 0.5,
      price: 0, weeklyPrices: [0.00], weeklyChange: 0, sortRank: 0, periodReturns: { '1M': 0, '6M': 0, '1Y': 0 },
      priceHistory: undefined,
      velocityScore: { '1D': -0.5, '1W': -10.7, '1M': null, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { POW: 4.54, VOLT: false, PBD: 0.86, PBW: false },
      tonyNote: 'Prysmian SpA appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MOD', name: 'MODINE MANUFACTURING CO', easyScore: 1, avgWeight: 3.66, proScore: 1.83, coverage: 0.25,
      price: 306.89, weeklyPrices: [279.93, 270.70, 278.91, 288.52, 306.89], weeklyChange: 9.63, sortRank: 0, periodReturns: { '1M': 15, '6M': 91.3, '1Y': 230.8 },
      priceHistory: { '1W': [279.93, 270.7, 278.91, 288.52, 306.89], '1M': [259.76, 271.6, 274.22, 269.65, 273, 284.8, 276.27, 279.2, 292.16, 271.26, 247.13, 244.49, 257.33, 250.11, 260.52, 295.88, 279.93, 270.7, 278.91, 288.52, 306.89], '6M': [160.45, 152.95, 138.59, 137.64, 133.51, 120, 131.86, 145.99, 184.66, 215.72, 216.5, 222.5, 238.5, 187.29, 188.54, 196.55, 213.96, 214.88, 256.99, 251.5, 244.95, 259.76, 284.8, 247.13, 295.88, 306.89], '1Y': [92.78, 91.93, 94.03, 102.34, 102.22, 92.65, 91.3, 98.8, 113.62, 136.59, 141.72, 134.93, 140.42, 135.99, 146.85, 158.57, 141.28, 147.87, 154.54, 162.07, 148.3, 155.26, 151.21, 147.4, 141.51, 158.97, 157.46, 162.66, 128.39, 137.59, 140.81, 125.14, 136.88, 148.49, 196.07, 219.13, 216.5, 222.5, 238.5, 201.07, 197.95, 211.47, 202.18, 214, 253.66, 247.49, 244.95, 259.76, 284.8, 247.13, 295.88, 306.89] },
      velocityScore: { '1D': 3.4, '1W': 5.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$16B', pe: 135.2, revenueGrowth: 48, eps: 2.27, grossMargin: 23, dividendYield: null,
      etfPresence: { POW: false, VOLT: 3.66, PBD: false, PBW: false },
      tonyNote: 'Modine Manufacturing is a thermal management company — heat exchangers and liquid cooling systems for data centers and industrial applications. It holds a position in Industrials ETFs as a direct beneficiary of the AI server cooling challenge. Revenue grew materially as data center customers upgraded from air to liquid cooling; the growth runway remains substantial.',
    },
    {
      ticker: 'OGE', name: 'OGE ENERGY CORP', easyScore: 1, avgWeight: 3.65, proScore: 1.82, coverage: 0.25,
      price: 46.61, weeklyPrices: [48.18, 47.38, 47.23, 45.66, 46.61], weeklyChange: -3.26, sortRank: 0, periodReturns: { '1M': -3.3, '6M': 4.9, '1Y': 5.4 },
      priceHistory: { '1W': [48.18, 47.38, 47.23, 45.66, 46.61], '1M': [47.84, 47.84, 47.73, 47.33, 47.35, 47.4, 47.64, 47.34, 47.51, 46.27, 47.31, 48.05, 47.9, 48.1, 48.54, 48.41, 48.18, 47.38, 47.23, 45.66, 46.61], '6M': [44.42, 43.07, 43.07, 42.98, 42.7, 42.71, 43.72, 42.69, 43.68, 43.96, 46.98, 48.13, 49.25, 48.2, 48.35, 46.14, 47.54, 48.61, 48.6, 47.3, 47.59, 47.84, 47.4, 47.31, 48.41, 46.61], '1Y': [44.24, 44, 43.9, 43.75, 44.23, 44.52, 44.12, 44.98, 44.89, 45.61, 45.65, 45.27, 45.27, 44.3, 44.2, 43.87, 45.31, 45.71, 45.85, 47.04, 46.45, 44.41, 44.05, 45.63, 44.08, 45.5, 44.25, 42.89, 43.07, 42.99, 42.88, 42.83, 43.64, 43.27, 43.08, 44.3, 46.98, 48.13, 49.25, 47.93, 48.39, 46.65, 47.89, 49.01, 48.84, 46.5, 47.59, 47.84, 47.4, 47.31, 48.41, 46.61] },
      velocityScore: { '1D': -1.1, '1W': -2.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 20.7, revenueGrowth: 1, eps: 2.25, grossMargin: 44, dividendYield: 3.65,
      etfPresence: { POW: false, VOLT: 3.65, PBD: false, PBW: false },
      tonyNote: 'OGE Energy is a regional Oklahoma utility held in Electrification ETFs. Revenue is regulated, dividend yield is the primary return driver, and the load growth thesis is less prominent than for AEP or NEE. The ETF allocation is defensive — utilities in electrification ETFs serve as yield anchors alongside the higher-growth infrastructure names.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.5, proScore: 1.77, coverage: 0.5,
      price: 148.4, weeklyPrices: [140.24, 147.68, 148.76, 146.34, 148.40], weeklyChange: 5.82, sortRank: 0, periodReturns: { '1M': 4.3, '6M': 4.9, '1Y': 61.9 },
      priceHistory: { '1W': [140.24, 147.68, 148.76, 146.34, 148.4], '1M': [141.03, 136.69, 138.47, 136.62, 128.03, 122.47, 127.87, 124.64, 129.19, 125, 121.72, 119.2, 123.05, 124.86, 132.06, 139.56, 140.24, 147.68, 148.76, 146.34, 148.4], '6M': [141.49, 138.58, 129.13, 137.12, 135.14, 136.25, 154.22, 150.99, 144.08, 136.23, 146.72, 147.82, 135.16, 131.87, 133.92, 126.74, 123.62, 126.49, 145.27, 152.81, 148.64, 141.03, 122.47, 121.72, 139.56, 148.4], '1Y': [91.68, 92.49, 92.8, 97.02, 98.52, 98.31, 100.55, 100.71, 105.49, 109.5, 109.83, 108.65, 110.13, 112.75, 119.47, 122.07, 123.13, 124.66, 125.79, 125.6, 128.93, 139.75, 138.87, 141.92, 136.66, 138.72, 138.65, 138.68, 126.51, 137.94, 139.71, 140.16, 154.39, 155.56, 144.93, 144.2, 146.72, 147.82, 135.16, 136.06, 136.8, 130.67, 119.15, 128.38, 148.72, 151.93, 148.64, 141.03, 122.47, 121.72, 139.56, 148.4] },
      velocityScore: { '1D': -1.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$183B', pe: 42.5, revenueGrowth: 58, eps: 3.49, grossMargin: 38, dividendYield: 0.67,
      etfPresence: { POW: 0.92, VOLT: 4.09, PBD: false, PBW: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'ETR', name: 'ENTERGY CORP', easyScore: 1, avgWeight: 3.49, proScore: 1.75, coverage: 0.25,
      price: 107.6, weeklyPrices: [111.51, 109.62, 109.05, 104.97, 107.60], weeklyChange: -3.51, sortRank: 0, periodReturns: { '1M': -7.6, '6M': 15.7, '1Y': 29.7 },
      priceHistory: { '1W': [111.51, 109.62, 109.05, 104.97, 107.6], '1M': [116.4, 117.36, 112.96, 112.02, 111.59, 112.97, 112.93, 112.35, 112.9, 109.03, 109.58, 110.55, 111.93, 112.27, 112.4, 111.97, 111.51, 109.62, 109.05, 104.97, 107.6], '6M': [92.97, 93.23, 92.81, 92.33, 92.43, 91.19, 95.67, 93.19, 95.89, 97.96, 105.07, 104.87, 106.63, 104.7, 105.58, 99.9, 109.88, 114.57, 115.33, 113.66, 113.44, 116.4, 112.97, 109.58, 111.97, 107.6], '1Y': [82.93, 82.21, 80.98, 81.32, 81.32, 82.12, 83.55, 88.12, 89.29, 90.28, 90.98, 89.83, 89.55, 88.18, 89.86, 87.83, 91.59, 93.4, 96.66, 97.65, 96, 95.46, 96.28, 96.54, 94.03, 96.55, 94.24, 93.33, 91.83, 92.67, 93.86, 93.52, 96.42, 94.97, 95.49, 98.15, 105.07, 104.87, 106.63, 104.65, 106.17, 101.34, 111.06, 113.87, 115.57, 111.24, 113.44, 116.4, 112.97, 109.58, 111.97, 107.6] },
      velocityScore: { '1D': 0, '1W': -2.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$49B', pe: 27.4, revenueGrowth: 12, eps: 3.92, grossMargin: 47, dividendYield: 2.38,
      etfPresence: { POW: false, VOLT: 3.49, PBD: false, PBW: false },
      tonyNote: 'Entergy is a regulated utility operating in the Gulf Coast region, held in Electrification ETFs for income and load growth from industrial and data center customers. The dividend is well-covered and the rate base is growing as Louisiana and Texas attract manufacturing reshoring and technology infrastructure investment.',
    },
    {
      ticker: 'ET', name: 'ENERGY TRANSFER LP', easyScore: 1, avgWeight: 3.46, proScore: 1.73, coverage: 0.25,
      price: 19.54, weeklyPrices: [19.33, 19.42, 19.17, 19.27, 19.54], weeklyChange: 1.09, sortRank: 0, periodReturns: { '1M': -2, '6M': 17.8, '1Y': 9.2 },
      priceHistory: { '1W': [19.33, 19.42, 19.17, 19.27, 19.54], '1M': [20.08, 20.39, 19.87, 19.92, 19.34, 19.61, 20, 20.1, 20.36, 20.15, 20.19, 20.39, 20.16, 20.01, 20.07, 19.6, 19.33, 19.42, 19.17, 19.27, 19.54], '6M': [16.59, 16.67, 16.36, 16.36, 16.49, 16.89, 17.46, 17.99, 18.45, 17.94, 18.75, 18.82, 19.1, 18.74, 18.75, 19.01, 19.67, 18.96, 18.85, 18.91, 19.05, 20.08, 19.61, 20.19, 19.6, 19.54], '1Y': [17.9, 17.99, 17.93, 17.67, 17.9, 17.44, 17.44, 17.44, 18.05, 17.86, 17.49, 17.33, 17.57, 17.65, 17.49, 17.44, 17.4, 16.99, 16.67, 16.9, 16.91, 16.93, 16.91, 16.58, 16.92, 16.43, 16.71, 16.45, 16.39, 16.39, 16.59, 16.96, 17.35, 17.96, 18.14, 18.05, 18.75, 18.82, 19.1, 18.59, 18.74, 19.06, 19.59, 19.12, 18.73, 18.96, 19.05, 20.08, 19.61, 20.19, 19.6, 19.54] },
      velocityScore: { '1D': -1.1, '1W': 1.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$67B', pe: 16.3, revenueGrowth: 32, eps: 1.2, grossMargin: 19, dividendYield: 6.83,
      etfPresence: { POW: false, VOLT: 3.46, PBD: false, PBW: false },
      tonyNote: 'Energy Transfer is a midstream pipeline MLP held in Electrification ETFs for its natural gas infrastructure exposure — power plants running on natural gas are a key bridge fuel for data center load growth in states where renewables cannot meet baseload demand. High dividend yield and steady fee-based revenue make it an income-oriented allocation.',
    },
    {
      ticker: 'HYLN', name: 'Hyliion Holdings Corp', easyScore: 1, avgWeight: 3.44, proScore: 1.72, coverage: 0.25,
      price: 6.79, weeklyPrices: [6.94, 7.19, 6.99, 6.25, 6.79], weeklyChange: -2.16, sortRank: 0, periodReturns: { '1M': 232.8, '6M': 275.1, '1Y': 346.7 },
      priceHistory: { '1W': [6.94, 7.19, 6.99, 6.25, 6.79], '1M': [2.11, 2.31, 2.39, 2.47, 2.46, 2.76, 2.68, 3.59, 3.69, 4.67, 4.2, 4.09, 4.09, 4.2, 5.99, 6.6, 6.94, 7.19, 6.99, 6.25, 6.79], '6M': [1.81, 1.92, 1.82, 1.99, 1.84, 1.98, 2.23, 2.19, 2.05, 2.01, 2.04, 1.95, 2.23, 2, 2.01, 1.77, 1.8, 1.7, 1.84, 1.96, 1.84, 2.11, 2.76, 4.2, 6.6, 6.79], '1Y': [1.52, 1.58, 1.42, 1.34, 1.4, 1.43, 1.52, 1.81, 1.55, 1.51, 1.66, 1.53, 1.69, 1.64, 1.63, 1.99, 2.24, 2.05, 2.51, 2.5, 2.02, 2.27, 2.18, 1.9, 1.66, 1.85, 1.89, 1.94, 1.76, 1.98, 1.82, 1.94, 2.23, 2.1, 2.1, 2.14, 2.04, 1.95, 2.23, 1.97, 1.98, 1.9, 1.66, 1.7, 1.9, 1.89, 1.84, 2.11, 2.76, 4.2, 6.6, 6.79] },
      velocityScore: { '1D': -10.4, '1W': -6.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1B', pe: null, revenueGrowth: 479, eps: -0.3, grossMargin: 6, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 3.44 },
      tonyNote: 'Hyliion is a small-cap commercial truck powertrain electrification company. It holds a speculative position in Electrification ETFs on the heavy-duty vehicle decarbonization thesis. Revenue is early-stage and the path to profitability is long; the ETF weight is small, reflecting a lottery-ticket allocation to an electrification theme adjacent holding.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 3, avgWeight: 1.93, proScore: 1.67, coverage: 0.75,
      price: 312.28, weeklyPrices: [328.34, 317.08, 302.18, 294.65, 312.28], weeklyChange: -4.89, sortRank: 0, periodReturns: { '1M': -19.7, '6M': 48, '1Y': 162.9 },
      priceHistory: { '1W': [328.34, 317.08, 302.18, 294.65, 312.28], '1M': [387.03, 345.63, 360.81, 351.94, 357.24, 354.97, 339.42, 339.19, 344.6, 323.46, 309.06, 302.84, 313.05, 323.79, 324.86, 339.65, 328.34, 317.08, 302.18, 294.65, 312.28], '6M': [210.94, 221.27, 215.16, 217.51, 209.37, 210.99, 257.29, 262.19, 255.36, 273.26, 314.27, 329.24, 340.42, 290.78, 302.02, 317.21, 310.76, 331.9, 378.94, 380.22, 385.68, 387.03, 354.97, 309.06, 339.65, 312.28], '1Y': [118.79, 126.91, 124.54, 133.28, 137.55, 143.62, 139.42, 142.84, 144.07, 139.81, 162.52, 147.74, 153.73, 150.14, 159.52, 169.75, 170.77, 176.2, 174.92, 189.96, 190.46, 208.05, 225.8, 212.79, 198.89, 209.9, 213.44, 221.47, 204.49, 217.23, 221.99, 219.59, 253.86, 263.03, 261.82, 279.17, 314.27, 329.24, 340.42, 305.02, 308.31, 329.78, 298.29, 339.32, 385.73, 385, 385.68, 387.03, 354.97, 309.06, 339.65, 312.28] },
      velocityScore: { '1D': null, '1W': -9.2, '1M': null, '6M': null }, isNew: true,
      marketCap: '$12B', pe: 64.9, revenueGrowth: 26, eps: 4.81, grossMargin: 39, dividendYield: 0.13,
      etfPresence: { POW: 0.93, VOLT: 3.95, PBD: false, PBW: 0.91 },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'FCEL', name: 'FuelCell Energy Inc', easyScore: 1, avgWeight: 3.32, proScore: 1.66, coverage: 0.25,
      price: 24.64, weeklyPrices: [23.69, 24.39, 21.66, 21.31, 24.64], weeklyChange: 4.01, sortRank: 0, periodReturns: { '1M': 85.1, '6M': 255.6, '1Y': 337.7 },
      priceHistory: { '1W': [23.69, 24.39, 21.66, 21.31, 24.64], '1M': [13.02, 13.55, 12.81, 12.28, 13.7, 15.94, 17.09, 19.92, 21.6, 21.36, 17.74, 17.36, 20.22, 26.38, 25.01, 24.4, 23.69, 24.39, 21.66, 21.31, 24.64], '6M': [6.93, 8.36, 8.47, 8.79, 7.31, 7.8, 7.45, 10.13, 8.19, 7.19, 7.22, 7.69, 8.33, 7.6, 6.63, 6.59, 6.53, 6.67, 6.83, 8.65, 10.68, 13.02, 15.94, 17.74, 24.4, 24.64], '1Y': [5.63, 6.72, 5.9, 5.8, 5.32, 5.74, 4.99, 5.89, 4.69, 4.41, 4.26, 3.93, 4.36, 3.92, 6.46, 8.33, 8.67, 8.73, 10.23, 10.71, 7.81, 8.18, 8.49, 7.71, 6.52, 6.22, 7.18, 8.46, 7.9, 8.77, 8.17, 7.58, 8.04, 9.09, 7.35, 7.45, 7.22, 7.69, 8.33, 7.38, 6.91, 6.71, 6.23, 6.27, 7.3, 9.49, 10.68, 13.02, 15.94, 17.74, 24.4, 24.64] },
      velocityScore: { '1D': -1.8, '1W': -14, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1B', pe: null, revenueGrowth: 61, eps: -6.49, grossMargin: -16, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 3.32 },
      tonyNote: 'FuelCell Energy Inc appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 3.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'TKR', name: 'TKR', easyScore: 1, avgWeight: 8.77, proScore: 3.92, coverage: 0.2,
      price: 131.9, weeklyPrices: [127.16, 126.78, 127.98, 126.54, 131.90], weeklyChange: 3.73, sortRank: 0, periodReturns: { '1M': 21, '6M': 65.2, '1Y': 86.9 },
      priceHistory: { '1W': [127.16, 126.78, 127.98, 126.54, 131.9], '1M': [107.12, 109.63, 119.7, 116.34, 117.97, 117.39, 117.12, 115.74, 116.74, 114.49, 112.73, 109.36, 117.2, 118.93, 119.95, 127.42, 127.16, 126.78, 127.98, 126.54, 131.9], '6M': [79.82, 83.16, 85.77, 86.09, 84.13, 90.6, 93.73, 93.94, 93.19, 106.04, 107.84, 107.83, 109.99, 99.68, 97.54, 95.25, 97.56, 98.94, 106.9, 108.45, 108.7, 107.12, 117.39, 112.73, 127.42, 131.9], '1Y': [70.57, 73.15, 70.44, 73.05, 76.72, 78.57, 76.68, 80.99, 74.77, 73.57, 80.39, 75.86, 79.01, 77.42, 79.16, 79.09, 75.67, 75.11, 75.86, 74.7, 75.85, 79.25, 78.46, 78.66, 74.82, 81.36, 82.52, 87.53, 84.14, 86.02, 86.29, 91.17, 93.55, 94.02, 94.99, 108.93, 107.84, 107.83, 109.99, 100.58, 98.74, 98.99, 95.94, 99.17, 106.81, 108.75, 108.7, 107.12, 117.39, 112.73, 127.42, 131.9] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 29.9, revenueGrowth: 8, eps: 4.41, grossMargin: 31, dividendYield: 1.09,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.77, IDEF: false, BILT: false },
      tonyNote: 'TKR appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 5.4, proScore: 3.41, coverage: 0.4,
      price: 875.52, weeklyPrices: [782.12, 842.96, 860.84, 845.39, 875.52], weeklyChange: 11.94, sortRank: 0, periodReturns: { '1M': 64.4, '6M': 167.1, '1Y': 350.8 },
      priceHistory: { '1W': [782.12, 842.96, 860.84, 845.39, 875.52], '1M': [529.49, 806, 886.22, 811.41, 844.8, 868.18, 851.35, 854.28, 889.03, 848.84, 770.76, 728.29, 752, 733.77, 732.94, 783.53, 782.12, 842.96, 860.84, 845.39, 875.52], '6M': [327.78, 324.1, 319.13, 315.87, 306.23, 297.62, 336.31, 351.39, 357.91, 401.29, 437.77, 434.64, 432.87, 395.11, 398.12, 401.61, 420.24, 393.71, 459.02, 472.9, 505.45, 529.49, 868.18, 770.76, 783.53, 875.52], '1Y': [194.23, 198.37, 221.36, 224.64, 228.72, 236.29, 243.23, 253.14, 263.35, 299.42, 292.47, 274.89, 289.36, 288.68, 316.16, 348.58, 344.05, 337.93, 366.99, 365.39, 332.75, 403.35, 411.07, 380.7, 334.17, 339.75, 323.46, 331.61, 283.57, 314, 319.16, 308.13, 350.96, 361.21, 367.95, 418.61, 437.77, 434.64, 432.87, 411.38, 417.76, 422.55, 382.55, 382.22, 464.54, 472.84, 505.45, 529.49, 868.18, 770.76, 783.53, 875.52] },
      velocityScore: { '1D': 0, '1W': -30.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 78.1, revenueGrowth: 92, eps: 11.21, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 6.31, PRN: 4.49, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'CGNX', name: 'CGNX', easyScore: 1, avgWeight: 7.51, proScore: 3.36, coverage: 0.2,
      price: 66.08, weeklyPrices: [66.70, 66.01, 65.85, 64.64, 66.08], weeklyChange: -0.93, sortRank: 0, periodReturns: { '1M': 18.1, '6M': 73, '1Y': 116.4 },
      priceHistory: { '1W': [66.7, 66.01, 65.85, 64.64, 66.08], '1M': [56.3, 58.83, 62.26, 65.92, 65.66, 67.26, 65.68, 63.64, 66.09, 64.26, 61.91, 60.65, 63.37, 64.27, 66.09, 68.33, 66.7, 66.01, 65.85, 64.64, 66.08], '6M': [38.19, 38.22, 36.83, 36.66, 35.98, 37.74, 40.59, 39.76, 38.74, 42.37, 58.79, 56.47, 53.83, 49.45, 47.98, 49.24, 47.59, 49.52, 54.39, 55.48, 55.09, 56.3, 67.26, 61.91, 68.33, 66.08], '1Y': [30.53, 31.43, 29.9, 30.78, 32.78, 34.74, 33.32, 34.61, 33.76, 40.89, 44.18, 42.71, 44.25, 44.27, 44.95, 46.19, 45.52, 45.83, 46.75, 45.79, 46.29, 47.44, 40.5, 38.18, 36.1, 38.21, 37.69, 37.91, 35.76, 36.6, 36.93, 39.01, 40.92, 39.37, 39.76, 43.72, 58.79, 56.47, 53.83, 50.82, 49.56, 50.8, 45.94, 51.69, 55.58, 53.72, 55.09, 56.3, 67.26, 61.91, 68.33, 66.08] },
      velocityScore: { '1D': -1.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 77.7, revenueGrowth: 24, eps: 0.85, grossMargin: 68, dividendYield: 0.51,
      etfPresence: { AIRR: false, PRN: false, RSHO: 7.51, IDEF: false, BILT: false },
      tonyNote: 'CGNX appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 7.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 3, avgWeight: 4.31, proScore: 3.34, coverage: 0.6,
      price: 299.07, weeklyPrices: [295.94, 288.90, 284.42, 288.12, 299.07], weeklyChange: 1.06, sortRank: 0, periodReturns: { '1M': 8.6, '6M': 178.2, '1Y': 416.8 },
      priceHistory: { '1W': [295.94, 288.9, 284.42, 288.12, 299.07], '1M': [269.95, 294.69, 320.3, 305.93, 309.39, 322.05, 308.05, 300.84, 296.98, 292.65, 266.8, 261.58, 271.05, 270.75, 279.22, 291.97, 295.94, 288.9, 284.42, 288.12, 299.07], '6M': [107.5, 115.02, 110.88, 112.88, 106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 181.38, 177.5, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 269.95, 322.05, 266.8, 291.97, 299.07], '1Y': [57.87, 61.92, 60.3, 63.42, 72.84, 70.96, 72.53, 78.32, 76.88, 75.95, 86.57, 82.17, 91.46, 90.24, 97.47, 101.43, 97.88, 105.74, 105.13, 109.92, 110.96, 136.12, 131.92, 118.74, 95.1, 107.26, 107.83, 119.95, 105.77, 112.06, 117.51, 121.83, 139.99, 141.15, 146.79, 187.3, 195.02, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 260.52, 269.95, 322.05, 266.8, 291.97, 299.07] },
      velocityScore: { '1D': 0, '1W': 79.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 58.5, revenueGrowth: 7, eps: 5.11, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { AIRR: 2.61, PRN: 2.4, RSHO: 7.92, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 6.99, proScore: 3.13, coverage: 0.2,
      price: 174.26, weeklyPrices: [176.59, 178.96, 179.66, 174.41, 174.26], weeklyChange: -1.32, sortRank: 0, periodReturns: { '1M': 0.2, '6M': 3.2, '1Y': 26.7 },
      priceHistory: { '1W': [176.59, 178.96, 179.66, 174.41, 174.26], '1M': [172.9, 172.87, 176.74, 176.78, 176.09, 178.61, 178.89, 178.11, 175.68, 171.18, 175.95, 174.49, 174.85, 175.98, 177.01, 178.97, 176.59, 178.96, 179.66, 174.41, 174.26], '6M': [168.8, 171.93, 179.93, 185.76, 183.4, 187.17, 199.83, 195.93, 200.93, 198.66, 200.06, 201.92, 212.16, 209.76, 204.52, 198.16, 189.71, 198.41, 201.41, 195.79, 173.38, 172.9, 178.61, 175.95, 178.97, 174.26], '1Y': [137.5, 138.52, 148.48, 141.38, 144.52, 146.4, 150.17, 156.49, 158.4, 155.75, 155.71, 156.59, 159.84, 158.68, 157.65, 158.19, 161.38, 167.2, 168.57, 157, 177.98, 176.36, 174, 177.69, 173.77, 173.19, 168.45, 174.72, 177.2, 186.38, 187.25, 188.5, 201.92, 194.13, 201.09, 196.19, 200.06, 201.92, 212.16, 208.23, 206.06, 194.82, 187.15, 197.92, 202.81, 187.17, 173.38, 172.9, 178.61, 175.95, 178.97, 174.26] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$235B', pe: 32.7, revenueGrowth: 9, eps: 5.33, grossMargin: 20, dividendYield: 1.59,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 6.99, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 7.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 4.84, proScore: 3.06, coverage: 0.4,
      price: 909.81, weeklyPrices: [909.93, 887.67, 875.87, 865.36, 909.81], weeklyChange: -0.01, sortRank: 0, periodReturns: { '1M': 2.3, '6M': 56.2, '1Y': 160.4 },
      priceHistory: { '1W': [909.93, 887.67, 875.87, 865.36, 909.81], '1M': [874.78, 904.59, 926.93, 895.69, 897.45, 926.79, 912.14, 902.3, 920.22, 888.31, 863.95, 860.15, 872.56, 865.95, 879.89, 908.55, 909.93, 887.67, 875.87, 865.36, 909.81], '6M': [582.47, 594.36, 588.93, 582.42, 572.87, 608.13, 647.18, 626.62, 657.36, 726.2, 774.2, 756.47, 752.32, 680.9, 693.99, 680.88, 695.4, 721.24, 791.73, 798.4, 828.79, 874.78, 926.79, 863.95, 908.55, 909.81], '1Y': [349.4, 358.57, 357.68, 371.58, 398.43, 408.33, 412.88, 427.59, 434.12, 427.72, 413.7, 420.59, 432.67, 420.22, 431.38, 466.96, 469.79, 480.82, 502.12, 534.05, 513.91, 585.49, 569.15, 573.02, 553.11, 573.73, 591.49, 615.35, 561.89, 583.76, 598.41, 617.62, 646.89, 635.92, 690.91, 742.12, 774.2, 756.47, 752.32, 704.82, 699.78, 701.7, 667.43, 724.44, 794.25, 800.45, 828.79, 874.78, 926.79, 863.95, 908.55, 909.81] },
      velocityScore: { '1D': -1.6, '1W': 34.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$419B', pe: 45.2, revenueGrowth: 22, eps: 20.11, grossMargin: 29, dividendYield: 0.66,
      etfPresence: { AIRR: false, PRN: 3.18, RSHO: 6.5, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'LMT', name: 'LOCKHEED MARTIN CORP', easyScore: 1, avgWeight: 6.21, proScore: 2.78, coverage: 0.2,
      price: 513.43, weeklyPrices: [531.14, 537.21, 530.45, 516.50, 513.43], weeklyChange: -3.33, sortRank: 0, periodReturns: { '1M': 0.1, '6M': 16.2, '1Y': 6.9 },
      priceHistory: { '1W': [531.14, 537.21, 530.45, 516.5, 513.43], '1M': [518.15, 508.93, 514.26, 512.41, 506.51, 512.25, 521, 519.94, 520.41, 516.01, 528.31, 526.63, 522.59, 522.79, 533.24, 532.9, 531.14, 537.21, 530.45, 516.5, 513.43], '6M': [441.82, 466.89, 477.06, 482.55, 483.67, 518.44, 577.89, 590.82, 634.22, 623.58, 652.58, 660.62, 676.7, 671.77, 646, 627.43, 615.84, 637.9, 619.69, 581.28, 513.35, 518.15, 512.25, 528.31, 532.9, 513.43], '1Y': [480.17, 476.9, 479.34, 458.39, 462.55, 464.31, 471.47, 419.39, 418.68, 434.85, 442.57, 446, 454.47, 456.85, 470.73, 473.62, 486.25, 499, 514.02, 499.41, 487.14, 485.33, 473.14, 457.04, 469.91, 454.16, 446.8, 467.94, 474.79, 485.75, 497.07, 542.92, 582.43, 581.66, 636, 638.29, 652.58, 660.62, 676.7, 664.15, 645.2, 616.25, 598.57, 627.7, 611.58, 571.95, 513.35, 518.15, 512.25, 528.31, 532.9, 513.43] },
      velocityScore: { '1D': 0.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$118B', pe: 24.9, revenueGrowth: 0, eps: 20.64, grossMargin: 10, dividendYield: 2.69,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 6.21, BILT: false },
      tonyNote: 'LOCKHEED MARTIN CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 6.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.38, proScore: 2.77, coverage: 0.4,
      price: 1883.26, weeklyPrices: [1867.09, 1855.15, 1828.21, 1787.88, 1883.26], weeklyChange: 0.87, sortRank: 0, periodReturns: { '1M': 0.9, '6M': 101.3, '1Y': 279.1 },
      priceHistory: { '1W': [1867.09, 1855.15, 1828.21, 1787.88, 1883.26], '1M': [1891.95, 1967.24, 2011.49, 1942.02, 1952.37, 2032.98, 2016.31, 2034.63, 2042.36, 1992.74, 1854.43, 1825.5, 1835.51, 1835.33, 1828.25, 1883.56, 1867.09, 1855.15, 1828.21, 1787.88, 1883.26], '6M': [935.78, 983.61, 968.5, 965.37, 933.29, 971.49, 1091.04, 1121.44, 1142.1, 1230.26, 1337.95, 1413.57, 1438.24, 1279.06, 1365.34, 1356.75, 1366.77, 1434.09, 1627.81, 1680.09, 1794.04, 1891.95, 2032.98, 1854.43, 1883.56, 1883.26], '1Y': [496.78, 487.71, 495.37, 507.6, 529.9, 533.77, 546.63, 547.91, 702.97, 690.45, 702.1, 681.08, 709.83, 723.95, 764.91, 799.38, 791.46, 834.33, 844.62, 837.11, 790.72, 1010.64, 987.78, 973.18, 930.5, 970.95, 949.3, 1021.36, 883.79, 958.07, 1003.64, 1010.41, 1119.98, 1127.55, 1176.26, 1283.65, 1337.95, 1413.57, 1438.24, 1372.4, 1414.1, 1408.25, 1273.18, 1424.91, 1650.48, 1674.16, 1794.04, 1891.95, 2032.98, 1854.43, 1883.56, 1883.26] },
      velocityScore: { '1D': 0, '1W': -38.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 54.4, revenueGrowth: 1, eps: 34.65, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: 4.16, PRN: 4.59, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, avgWeight: 4.15, proScore: 2.62, coverage: 0.4,
      price: 663.14, weeklyPrices: [673.51, 677.45, 667.02, 646.89, 663.14], weeklyChange: -1.54, sortRank: 0, periodReturns: { '1M': -5.6, '6M': 85.5, '1Y': 203.2 },
      priceHistory: { '1W': [673.51, 677.45, 667.02, 646.89, 663.14], '1M': [697.15, 720, 727.54, 690, 680.26, 683.52, 681.01, 719.92, 740.91, 722.31, 664.76, 639.58, 630.5, 644.64, 656.35, 670.66, 673.51, 677.45, 667.02, 646.89, 663.14], '6M': [357.48, 332.87, 320.1, 333.23, 313.32, 313.98, 329.66, 363.88, 347.11, 352.09, 409.95, 441.71, 445.36, 414.2, 458.31, 473.85, 566.62, 572.31, 598.44, 611.21, 660.85, 697.15, 683.52, 664.76, 670.66, 663.14], '1Y': [218.72, 209.45, 212.82, 209.05, 206.15, 208.46, 213.25, 216.2, 240.5, 229.9, 229.52, 215.89, 226.87, 237.83, 232.59, 259.58, 260.56, 279.62, 281.67, 312.5, 267.62, 292.22, 324.93, 364.78, 358.72, 380.62, 351.09, 325.77, 296.56, 328.26, 325.96, 311.87, 383.66, 353.5, 355.77, 370, 409.95, 441.71, 445.36, 466.38, 466.52, 463.15, 513.98, 576.95, 603.91, 615.42, 660.85, 697.15, 683.52, 664.76, 670.66, 663.14] },
      velocityScore: { '1D': 0, '1W': -37.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 68, revenueGrowth: 13, eps: 9.75, grossMargin: 20, dividendYield: 0.3,
      etfPresence: { AIRR: 4, PRN: 4.3, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Argan Inc is an engineering and construction company for power generation facilities — natural gas and renewable power plants. It appears in Industrials ETFs because power plant construction is one of the fastest-growing categories in U.S. infrastructure spending, driven by data center load additions that the grid cannot currently support.',
    },
    {
      ticker: 'ETN', name: 'ETN', easyScore: 1, avgWeight: 5.7, proScore: 2.55, coverage: 0.2,
      price: 417.62, weeklyPrices: [406.37, 401.94, 400.60, 400.08, 417.62], weeklyChange: 2.77, sortRank: 0, periodReturns: { '1M': -1.9, '6M': 25.4, '1Y': 28.2 },
      priceHistory: { '1W': [406.37, 401.94, 400.6, 400.08, 417.62], '1M': [422.44, 410.86, 421.39, 399.15, 401.51, 419, 401.53, 406.94, 408.1, 399.44, 381.87, 371.88, 379.69, 381.51, 391.35, 403.13, 406.37, 401.94, 400.6, 400.08, 417.62], '6M': [333.11, 341.76, 329.93, 322.81, 318.51, 320.58, 333.46, 331.22, 351.42, 373.82, 389.25, 362.05, 377.4, 347.75, 355.4, 356.8, 357.36, 363.89, 403.36, 407.57, 416.77, 422.44, 419, 381.87, 403.13, 417.62], '1Y': [325.84, 324.24, 330.51, 342.35, 358.19, 357.64, 362.89, 380.24, 390.09, 358.16, 357.49, 346.22, 351.4, 348.22, 360.08, 371.27, 372.21, 373.84, 376.7, 381.72, 360.6, 387.75, 385.44, 369.4, 345.65, 341.69, 335.57, 353.45, 315.82, 323.67, 327.31, 324.51, 343.75, 332.28, 359.44, 377.06, 389.25, 362.05, 377.4, 353.87, 361.04, 359.74, 343.53, 368.85, 401.9, 409.7, 416.77, 422.44, 419, 381.87, 403.13, 417.62] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$162B', pe: 40.8, revenueGrowth: 17, eps: 10.23, grossMargin: 37, dividendYield: 1.05,
      etfPresence: { AIRR: false, PRN: false, RSHO: 5.7, IDEF: false, BILT: false },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'UNP', name: 'UNION PACIFIC CORP', easyScore: 1, avgWeight: 5.59, proScore: 2.5, coverage: 0.2,
      price: 264.68, weeklyPrices: [279.39, 267.00, 262.64, 263.50, 264.68], weeklyChange: -5.27, sortRank: 0, periodReturns: { '1M': -0.6, '6M': 14, '1Y': 19.3 },
      priceHistory: { '1W': [279.39, 267, 262.64, 263.5, 264.68], '1M': [263.41, 264.01, 268.23, 264.89, 264.65, 263.35, 265.6, 264.65, 269.34, 270.56, 275.13, 271.56, 265.8, 265.44, 265.88, 271.1, 279.39, 267, 262.64, 263.5, 264.68], '6M': [232.24, 231.56, 235.88, 234.15, 231.32, 229.85, 230.51, 229.65, 235.1, 252.62, 260.68, 263.76, 266.97, 254.11, 242.44, 234.92, 238.79, 245.54, 251.34, 252.18, 268.91, 263.41, 263.35, 275.13, 271.1, 264.68], '1Y': [221.78, 226.6, 220.59, 226.81, 237.16, 237, 231.18, 231, 225.28, 225.46, 223.18, 225.68, 220.95, 223.06, 216.04, 220.36, 230.36, 234.74, 232.65, 225.72, 225.24, 216.37, 217.38, 223.55, 221.17, 230.66, 235.23, 235.46, 236.74, 235.05, 231.91, 228.44, 229.49, 230.89, 235.23, 254.34, 260.68, 263.76, 266.97, 253.61, 242.21, 238.37, 239.23, 246.11, 252.04, 251.25, 268.91, 263.41, 263.35, 275.13, 271.1, 264.68] },
      velocityScore: { '1D': 2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$157B', pe: 21.8, revenueGrowth: 3, eps: 12.15, grossMargin: 57, dividendYield: 2.09,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: false, BILT: 5.59 },
      tonyNote: 'UNION PACIFIC CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 5.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TTMI', name: 'TTM Technologies Inc', easyScore: 1, avgWeight: 5.56, proScore: 2.49, coverage: 0.2,
      price: 179.62, weeklyPrices: [190.67, 187.79, 173.72, 172.44, 179.62], weeklyChange: -5.8, sortRank: 0, periodReturns: { '1M': 13, '6M': 169.1, '1Y': 454.6 },
      priceHistory: { '1W': [190.67, 187.79, 173.72, 172.44, 179.62], '1M': [157.47, 159.58, 164.64, 153.77, 157.31, 162.99, 163.36, 168.82, 171.87, 167.35, 158.86, 161.41, 169.36, 174.55, 189.92, 196.95, 190.67, 187.79, 173.72, 172.44, 179.62], '6M': [66.75, 76.74, 67.63, 71.59, 69, 66.86, 100.9, 95.02, 98.2, 98.58, 91.8, 106.85, 113, 87.91, 90.64, 91.54, 95.47, 95.7, 123.49, 125.81, 144.17, 157.47, 162.99, 158.86, 196.95, 179.62], '1Y': [32.39, 36.19, 36.4, 39.2, 41.76, 43.88, 45.81, 46.46, 48.73, 43.21, 44.96, 40.06, 44.5, 46.07, 48.32, 52.84, 54.15, 59.07, 58.53, 58.21, 55.69, 63.53, 70.06, 70.5, 64.27, 68.29, 66.76, 77.7, 61.58, 72.59, 70.61, 73.88, 101.01, 94.63, 102.76, 97.98, 91.8, 106.85, 113, 96.8, 96.51, 101.42, 88.29, 99.29, 120.74, 125.25, 144.17, 157.47, 162.99, 158.86, 196.95, 179.62] },
      velocityScore: { '1D': 0, '1W': -42.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 98.2, revenueGrowth: 30, eps: 1.83, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 5.56, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'TTM Technologies is a printed circuit board manufacturer held in Industrials ETFs. Revenue growth tracks data center and defense electronics demand. PCB manufacturing is essential hardware infrastructure; TTM\'s position in AI server and high-frequency trading hardware gives it exposure to two durable growth verticals.',
    },
    {
      ticker: 'GTES', name: 'GTES', easyScore: 1, avgWeight: 5.52, proScore: 2.47, coverage: 0.2,
      price: 26.51, weeklyPrices: [25.71, 25.48, 25.92, 25.85, 26.51], weeklyChange: 3.11, sortRank: 0, periodReturns: { '1M': 10.2, '6M': 19.3, '1Y': 23 },
      priceHistory: { '1W': [25.71, 25.48, 25.92, 25.85, 26.51], '1M': [24.64, 24.57, 26.24, 25.98, 26.09, 25.98, 25.68, 25.38, 25.67, 24.4, 24.09, 23.45, 24.18, 24.07, 24.48, 25.34, 25.71, 25.48, 25.92, 25.85, 26.51], '6M': [22.23, 21.54, 21.59, 22.19, 21.47, 22.49, 23.05, 23.09, 23.02, 26.81, 27.97, 27.74, 27.6, 23.98, 22.75, 21.74, 22.11, 22.5, 25.65, 25.77, 25.54, 24.64, 25.98, 24.09, 25.34, 26.51], '1Y': [21.56, 22.13, 21.72, 22.6, 23.9, 24.74, 24.44, 24.97, 25.07, 24.14, 25.33, 24.07, 25.98, 25.93, 26.05, 25.86, 24.34, 25.21, 25.54, 25.75, 25.42, 22.5, 21.85, 22.71, 21.54, 22.45, 22.19, 22.29, 21.35, 22.02, 22.06, 22.79, 22.75, 22.85, 23.72, 27.01, 27.97, 27.74, 27.6, 24.11, 22.88, 22.78, 21.04, 22.52, 26.39, 25.61, 25.54, 24.64, 25.98, 24.09, 25.34, 26.51] },
      velocityScore: { '1D': 1.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: 27.9, revenueGrowth: 0, eps: 0.95, grossMargin: 40, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: 5.52, IDEF: false, BILT: false },
      tonyNote: 'GTES appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 5.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 1, avgWeight: 5.29, proScore: 2.37, coverage: 0.2,
      price: 152.17, weeklyPrices: [132.51, 143.34, 156.54, 160.65, 152.17], weeklyChange: 14.84, sortRank: 0, periodReturns: { '1M': 5.6, '6M': -10.9, '1Y': 14.3 },
      priceHistory: { '1W': [132.51, 143.34, 156.54, 160.65, 152.17], '1M': [146.03, 135.91, 133.79, 137.05, 137.8, 136.89, 136, 130.05, 133.73, 133.99, 135.14, 135.26, 137.15, 137.41, 136.88, 136.6, 132.51, 143.34, 156.54, 160.65, 152.17], '6M': [170.69, 181.84, 187.75, 194.13, 177.75, 176.86, 177.07, 169.6, 146.59, 135.9, 131.41, 130.6, 145.17, 157.16, 150.95, 150.68, 143.06, 147.93, 132.37, 145.89, 143.1, 146.03, 136.89, 135.14, 136.6, 152.17], '1Y': [133.17, 132.81, 138.2, 142.9, 132.12, 142.5, 150.91, 154.63, 158.61, 179.54, 184.37, 156.01, 156.72, 156.14, 164.36, 176.97, 179.56, 184.95, 183.56, 179.62, 175.49, 198.81, 187.9, 184.17, 165.42, 165.77, 176.08, 187.91, 177.29, 194.17, 167.86, 177.49, 170.96, 167.47, 147.76, 142.91, 131.41, 130.6, 145.17, 156.43, 152.72, 160.84, 137.55, 150.07, 135.7, 145.97, 143.1, 146.03, 136.89, 135.14, 136.6, 152.17] },
      velocityScore: { '1D': 5.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$365B', pe: 172.9, revenueGrowth: 85, eps: 0.88, grossMargin: 84, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 5.29, BILT: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'GD', name: 'GENERAL DYNAMICS CORP', easyScore: 1, avgWeight: 5.16, proScore: 2.31, coverage: 0.2,
      price: 337.61, weeklyPrices: [342.69, 348.96, 346.82, 339.20, 337.61], weeklyChange: -1.48, sortRank: 0, periodReturns: { '1M': -2.4, '6M': 0.5, '1Y': 22.3 },
      priceHistory: { '1W': [342.69, 348.96, 346.82, 339.2, 337.61], '1M': [349.08, 349.16, 347.27, 347.76, 346.53, 344.03, 346.46, 341.36, 340.62, 334.5, 343.11, 340.14, 339.75, 338.71, 342.89, 344.64, 342.69, 348.96, 346.82, 339.2, 337.61], '6M': [335.8, 334.27, 337.49, 343.84, 336.66, 351.44, 368.69, 363.27, 351.09, 360.07, 347.64, 348.98, 364.78, 363.49, 351.52, 345.78, 346.76, 351.39, 340.76, 332.14, 312.53, 349.08, 344.03, 343.11, 344.64, 337.61], '1Y': [276.04, 277.37, 281.3, 285.91, 293.92, 303.38, 300, 316.94, 312.18, 314.99, 317.49, 317.48, 325.46, 322.44, 329.62, 324.57, 323.62, 340.75, 346.44, 332.04, 338.24, 343.48, 342.91, 349.45, 343.06, 340.04, 338.08, 342.23, 336.41, 345.39, 343.4, 353.89, 367.38, 363.54, 346.37, 360.1, 347.64, 348.98, 364.78, 361.98, 354.36, 347.37, 340.79, 348.43, 339.88, 325.52, 312.53, 349.08, 344.03, 343.11, 344.64, 337.61] },
      velocityScore: { '1D': 0.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$91B', pe: 21.2, revenueGrowth: 10, eps: 15.9, grossMargin: 15, dividendYield: 1.8,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 5.16, BILT: false },
      tonyNote: 'GENERAL DYNAMICS CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 5.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 2, avgWeight: 3.51, proScore: 2.22, coverage: 0.4,
      price: 48.09, weeklyPrices: [50.48, 51.40, 51.14, 46.46, 48.09], weeklyChange: -4.73, sortRank: 0, periodReturns: { '1M': 30.3, '6M': 308.6, '1Y': 1152.3 },
      priceHistory: { '1W': [50.48, 51.4, 51.14, 46.46, 48.09], '1M': [38.54, 37.13, 39.69, 35.24, 39.04, 41.84, 40.68, 40.74, 43.04, 41.62, 41.61, 41.59, 42.66, 42.48, 44.35, 48.32, 50.48, 51.4, 51.14, 46.46, 48.09], '6M': [11.77, 12.84, 17.88, 20.73, 19.72, 22.44, 28.28, 26.94, 24.97, 22.26, 22.42, 23.78, 26.36, 25.28, 24.79, 33.83, 30.86, 35.02, 34.32, 37.5, 35.45, 38.54, 41.84, 41.61, 48.32, 48.09], '1Y': [3.84, 5.59, 5.1, 5.42, 6.14, 6.6, 6.45, 6.86, 6.28, 6.32, 6.74, 6.43, 7.08, 6.46, 9.67, 10.61, 11.93, 13.77, 15.6, 15.09, 12.5, 12.9, 13.25, 12.44, 11.79, 11.72, 12.01, 12.94, 16.47, 20.32, 20.41, 22.71, 28.78, 25.87, 22.85, 24.02, 22.42, 23.78, 26.36, 25.82, 24.6, 33.82, 27.89, 35.17, 33.93, 38.03, 35.45, 38.54, 41.84, 41.61, 48.32, 48.09] },
      velocityScore: { '1D': -1.8, '1W': -39, '1M': null, '6M': null }, isNew: false,
      marketCap: '$17B', pe: null, revenueGrowth: 41, eps: -0.8, grossMargin: 56, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 5.13, RSHO: false, IDEF: 1.89, BILT: false },
      tonyNote: 'Planet Labs is a satellite earth observation company. It holds a speculative position in Industrials ETFs as a data infrastructure name — providing satellite imagery and analytics that support agricultural, energy, and government decision-making. Revenue is growing from a small base; the ETF weight is minimal and the position is thematic.',
    },
    {
      ticker: 'LIN', name: 'LIN', easyScore: 1, avgWeight: 4.85, proScore: 2.17, coverage: 0.2,
      price: 495.91, weeklyPrices: [507.87, 501.98, 497.69, 497.41, 495.91], weeklyChange: -2.35, sortRank: 0, periodReturns: { '1M': -2.4, '6M': 21.3, '1Y': 5.1 },
      priceHistory: { '1W': [507.87, 501.98, 497.69, 497.41, 495.91], '1M': [493.55, 500.29, 501.87, 493.85, 493.16, 504.4, 503.87, 513.26, 511.65, 506.11, 510.86, 506.07, 506.63, 514.51, 517.58, 514.97, 507.87, 501.98, 497.69, 497.41, 495.91], '6M': [408.79, 390.38, 423.51, 425.1, 426.39, 439.69, 440.04, 451.57, 456.97, 448.24, 481, 498.19, 509.34, 484.74, 493.92, 488.15, 491.12, 499.47, 508.87, 498.15, 510.75, 493.55, 504.4, 510.86, 514.97, 495.91], '1Y': [471.82, 475.56, 460.9, 460.2, 477.17, 470.34, 459.67, 469.99, 466.23, 471.48, 475.63, 482.36, 482.71, 472.39, 483.59, 476, 474.13, 466.81, 467.83, 451.42, 449.92, 432.01, 418.23, 428.96, 413.2, 407.9, 409.15, 392.68, 422.34, 424.9, 429.11, 444.08, 438.96, 455.03, 460.16, 456.34, 481, 498.19, 509.34, 483.62, 497.41, 478.05, 499.26, 494.59, 499.65, 494.84, 510.75, 493.55, 504.4, 510.86, 514.97, 495.91] },
      velocityScore: { '1D': -0.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$229B', pe: 32.9, revenueGrowth: 8, eps: 15.08, grossMargin: 49, dividendYield: 1.29,
      etfPresence: { AIRR: false, PRN: false, RSHO: 4.85, IDEF: false, BILT: false },
      tonyNote: 'LIN appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 4.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MTZ', name: 'MasTec, Inc.', easyScore: 2, avgWeight: 3.39, proScore: 2.15, coverage: 0.4,
      price: 366.3, weeklyPrices: [387.52, 383.33, 378.37, 362.09, 366.30], weeklyChange: -5.48, sortRank: 0, periodReturns: { '1M': -12.2, '6M': 72, '1Y': 129.5 },
      priceHistory: { '1W': [387.52, 383.33, 378.37, 362.09, 366.3], '1M': [425.39, 437.51, 433.28, 412.27, 414.29, 421.37, 420.3, 423.79, 434.77, 414.9, 385.58, 385, 384.21, 388.77, 382.11, 390.75, 387.52, 383.33, 378.37, 362.09, 366.3], '6M': [212.98, 220.38, 218.19, 224.98, 217.37, 219.03, 235.89, 241.8, 240.48, 259.16, 269.53, 278.49, 304.53, 285.61, 290, 300.58, 316.01, 337.27, 365.55, 371.59, 385.89, 425.39, 421.37, 385.58, 390.75, 366.3], '1Y': [159.61, 158.43, 162.65, 168.56, 169.36, 168.77, 174.36, 182.39, 189.87, 183.11, 181.59, 172.51, 180, 182.51, 189.18, 199.45, 205.94, 215, 218.92, 204.56, 196.76, 221.36, 199.08, 199.54, 197.01, 210.47, 218.29, 228.8, 209.27, 223.5, 227.65, 218.91, 242.31, 245.29, 245.4, 262.11, 269.53, 278.49, 304.53, 297.81, 300.26, 310.63, 305.8, 338.19, 365.89, 371.41, 385.89, 425.39, 421.37, 385.58, 390.75, 366.3] },
      velocityScore: { '1D': 0, '1W': -25.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$29B', pe: 64.2, revenueGrowth: 35, eps: 5.71, grossMargin: 13, dividendYield: null,
      etfPresence: { AIRR: 3.8, PRN: 2.98, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'MasTec is an infrastructure construction company — fiber networks, power transmission, renewable energy installations. Revenue grew strongly as utility and telecom capex accelerated. The ETF weight in Industrials reflects MasTec\'s breadth across the electrification, connectivity, and clean energy build-outs that are reshaping U.S. infrastructure spending.',
    },
    {
      ticker: 'DY', name: 'Dycom Industries, Inc.', easyScore: 2, avgWeight: 3.33, proScore: 2.11, coverage: 0.4,
      price: 485.97, weeklyPrices: [529.13, 535.20, 510.00, 493.89, 485.97], weeklyChange: -8.16, sortRank: 0, periodReturns: { '1M': 12.1, '6M': 37.2, '1Y': 106.5 },
      priceHistory: { '1W': [529.13, 535.2, 510, 493.89, 485.97], '1M': [429.47, 457.14, 457.78, 426.36, 428.31, 430.95, 429.4, 444.81, 450.98, 437.37, 419.66, 413.35, 412.78, 414.43, 411.2, 420.47, 529.13, 535.2, 510, 493.89, 485.97], '6M': [354.31, 347.21, 347.61, 348.95, 337.9, 339.68, 365.65, 368.21, 364.39, 400.47, 427.48, 420.34, 418.73, 357.07, 347.23, 336.38, 341.96, 348.63, 396.95, 410.26, 416.01, 429.47, 430.95, 419.66, 420.47, 485.97], '1Y': [235.29, 233.33, 231.83, 237.56, 247.19, 250.27, 252.82, 261, 268.49, 270.9, 273.94, 257.26, 255.63, 254, 258.83, 270.71, 276.53, 291.66, 294.09, 298.82, 279.52, 288.44, 290.15, 295.57, 325.29, 354.96, 352.8, 355.83, 340.02, 348.4, 347.56, 338.81, 370.61, 373.27, 383.58, 415.28, 427.48, 420.34, 418.73, 360.29, 357.96, 349.74, 324.73, 356.79, 392.25, 404.81, 416.01, 429.47, 430.95, 419.66, 420.47, 485.97] },
      velocityScore: { '1D': null, '1W': -7.9, '1M': null, '6M': null }, isNew: true,
      marketCap: '$15B', pe: 46.5, revenueGrowth: 56, eps: 10.45, grossMargin: 20, dividendYield: null,
      etfPresence: { AIRR: 3.83, PRN: 2.83, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Dycom Industries is a specialty contractor for telecommunications infrastructure — fiber deployment, 5G network builds, and utility infrastructure. It appears in Industrials ETFs as a direct play on broadband and connectivity infrastructure investment. Revenue grew as AT&T, Comcast, and Verizon accelerated fiber rollouts; the ETF allocation is a structural, multiyear conviction position.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.33, proScore: 2.11, coverage: 0.4,
      price: 308.31, weeklyPrices: [312.65, 308.53, 303.81, 300.98, 308.31], weeklyChange: -1.39, sortRank: 0, periodReturns: { '1M': 1.8, '6M': 19.8, '1Y': 34 },
      priceHistory: { '1W': [312.65, 308.53, 303.81, 300.98, 308.31], '1M': [303.99, 305.48, 315.39, 310.37, 308.87, 310.55, 313.7, 310.87, 315.72, 307.17, 305.22, 302.64, 306.25, 305.66, 307.1, 311.33, 312.65, 308.53, 303.81, 300.98, 308.31], '6M': [257.32, 257.3, 258.47, 263.58, 256.77, 264.62, 282.47, 280.14, 260.41, 291.74, 279.84, 278.74, 283.54, 267.78, 255.65, 253.77, 260.67, 269.55, 293.26, 293.92, 298.1, 303.99, 310.55, 305.22, 311.33, 308.31], '1Y': [230.01, 233.71, 225.18, 224.6, 245.19, 255.95, 255.52, 267.01, 273.62, 264.97, 275.72, 262.46, 268.4, 267.96, 269.68, 262.77, 259.37, 257.98, 255.19, 247.97, 253.5, 254.1, 257.9, 256.26, 243.79, 257.32, 260.88, 264.32, 256.73, 264.33, 259.63, 272.25, 281.21, 281.54, 270.02, 282.45, 279.84, 278.74, 283.54, 267.57, 256.83, 262.23, 258.01, 272.54, 292.01, 293.59, 298.1, 303.99, 310.55, 305.22, 311.33, 308.31] },
      velocityScore: { '1D': -1.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 29.1, revenueGrowth: 7, eps: 10.58, grossMargin: 30, dividendYield: 0.66,
      etfPresence: { AIRR: 1.67, PRN: false, RSHO: 5, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BA', name: 'BOEING', easyScore: 1, avgWeight: 4.69, proScore: 2.1, coverage: 0.2,
      price: 223.31, weeklyPrices: [224.30, 228.78, 231.15, 224.30, 223.31], weeklyChange: -0.44, sortRank: 0, periodReturns: { '1M': -1.8, '6M': 8.7, '1Y': 5.6 },
      priceHistory: { '1W': [224.3, 228.78, 231.15, 224.3, 223.31], '1M': [221.3, 224.38, 229.93, 231.03, 237.36, 238.21, 236.87, 240.6, 229.21, 220.49, 220.61, 215.01, 222.2, 219.61, 219.02, 218.9, 224.3, 228.78, 231.15, 224.3, 223.31], '6M': [205.38, 200.37, 206.71, 216.85, 217.12, 227.38, 247.74, 252.15, 233.72, 243.03, 242.96, 230.44, 229.74, 231.11, 209.89, 195.12, 190.52, 212.3, 222.14, 225.08, 231.33, 221.3, 238.21, 220.61, 218.9, 223.31], '1Y': [211.47, 217.51, 201.7, 200.94, 209.79, 226.6, 229.9, 228.48, 226.08, 224.86, 232.61, 225, 234.83, 232.38, 227.52, 214.63, 215.1, 215.2, 225.32, 214, 217.26, 223.33, 198.05, 195.21, 189.63, 182.44, 202.54, 198.72, 206.33, 218.16, 227.77, 234.53, 247.74, 252.15, 233.72, 243.03, 242.96, 230.44, 229.74, 225, 213.47, 198.41, 189.21, 210, 223.77, 225.08, 231.33, 221.3, 238.21, 220.61, 218.9, 223.31] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$176B', pe: 88.3, revenueGrowth: 14, eps: 2.53, grossMargin: 5, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 4.69, BILT: false },
      tonyNote: 'BOEING appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 4.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 2, avgWeight: 6.2, proScore: 5.06, coverage: 0.667,
      price: 202.37, weeklyPrices: [179.83, 169.02, 158.41, 185.67, 202.37], weeklyChange: 12.53, sortRank: 0, periodReturns: { '1M': 10.3, '6M': 677.7, '1Y': 1107.5 },
      priceHistory: { '1W': [179.83, 169.02, 158.41, 185.67, 202.37], '1M': [172.98, 180.57, 178.54, 157.55, 148.94, 184.9, 188.28, 223.1, 203.57, 190.36, 173.26, 171.33, 165.26, 176.81, 181.49, 177.62, 179.83, 169.02, 158.41, 185.67, 202.37], '6M': [26.02, 30.38, 28.96, 40.64, 34.86, 33.01, 37, 35.72, 43.61, 44.3, 44.46, 53.96, 102.51, 95.58, 96.81, 87.54, 98.21, 107.45, 153.19, 163.47, 145.78, 172.98, 184.9, 173.26, 177.62, 202.37], '1Y': [16.76, 16.44, 16.78, 26.23, 26.69, 28.25, 28.99, 26.31, 23.06, 23.23, 23.02, 21.93, 24.05, 23.32, 26.85, 29.04, 26.69, 28.42, 32.22, 32.95, 29.98, 35.48, 31.51, 23.94, 20.87, 25.57, 25.65, 34.98, 27.14, 41, 39.6, 34.04, 37.04, 34.89, 44.16, 47.91, 44.46, 53.96, 102.51, 110.62, 94.07, 95.76, 85.19, 117.64, 146.39, 150.57, 145.78, 172.98, 184.9, 173.26, 177.62, 202.37] },
      velocityScore: { '1D': 16.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$16B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 8.15, RKNG: 4.25 },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.82, proScore: 4.82, coverage: 1,
      price: 260.58, weeklyPrices: [208.37, 226.34, 231.09, 264.51, 260.58], weeklyChange: 25.06, sortRank: 0, periodReturns: { '1M': 68.7, '6M': 170.2, '1Y': 599.2 },
      priceHistory: { '1W': [208.37, 226.34, 231.09, 264.51, 260.58], '1M': [176.42, 175.92, 195.09, 184.77, 177.05, 186.1, 179.11, 207.27, 221.15, 219.94, 199.86, 197.73, 191.82, 219.93, 214.77, 208.06, 208.37, 226.34, 231.09, 264.51, 260.58], '6M': [96.45, 96.41, 80.95, 90.03, 83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 98.01, 100.61, 91.01, 89.33, 112.95, 117.62, 100.82, 112.54, 154.56, 159.16, 144.96, 176.42, 186.1, 199.86, 208.06, 260.58], '1Y': [37.27, 52.51, 48.33, 48.52, 49.97, 46.43, 53.31, 51.88, 51.29, 55.09, 70.63, 67.47, 70.1, 64.91, 89.19, 94.12, 113.23, 115.61, 122, 125.83, 98.62, 125.1, 117, 94.36, 95.07, 94.69, 98.92, 93.59, 75.45, 91.13, 89.95, 97.93, 108.73, 91.46, 88.16, 92.88, 98.01, 100.61, 91.01, 94.94, 129.85, 114.15, 92.26, 117.4, 161.94, 156.55, 144.96, 176.42, 186.1, 199.86, 208.06, 260.58] },
      velocityScore: { '1D': 13.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 101, revenueGrowth: 684, eps: 2.58, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 2.87, MEME: 6.37, RKNG: 5.23 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 5.9, proScore: 4.82, coverage: 0.667,
      price: 1716.36, weeklyPrices: [1589.94, 1641.64, 1694.98, 1761.43, 1716.36], weeklyChange: 7.95, sortRank: 0, periodReturns: { '1M': 44.6, '6M': 735.8, '1Y': 4341.9 },
      priceHistory: { '1W': [1589.94, 1641.64, 1694.98, 1761.43, 1716.36], '1M': [1255.86, 1406.32, 1409.98, 1339.96, 1562.34, 1547.56, 1452.02, 1447.23, 1382.72, 1407.61, 1333.01, 1383.29, 1392.56, 1542.24, 1478.69, 1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36], '6M': [205.35, 219.46, 209.31, 244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1589.55, 1716.36], '1Y': [38.64, 41.59, 44.09, 47.25, 46.21, 46.95, 41.36, 43, 43.39, 42.1, 47.01, 44.4, 48.44, 62.5, 84.3, 98.87, 99.83, 121.12, 131.88, 144.3, 146.95, 204.36, 216.5, 283.1, 245.96, 215.04, 194.38, 232.86, 206.83, 250.08, 275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1070.2, 1255.86, 1547.56, 1333.01, 1589.55, 1716.36] },
      velocityScore: { '1D': 6.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$254B', pe: 58.8, revenueGrowth: 251, eps: 29.18, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.84, RKNG: 5.97 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 3, avgWeight: 4.18, proScore: 4.18, coverage: 1,
      price: 66.6, weeklyPrices: [67.84, 64.05, 63.54, 65.33, 66.60], weeklyChange: -1.83, sortRank: 0, periodReturns: { '1M': 45.9, '6M': 62, '1Y': 649.2 },
      priceHistory: { '1W': [67.84, 64.05, 63.54, 65.33, 66.6], '1M': [49.48, 54.74, 60.98, 56.85, 61.2, 55.15, 56.56, 55.17, 58.4, 52.94, 50.46, 47.74, 52.71, 58.06, 56.83, 59.78, 67.84, 64.05, 63.54, 65.33, 66.6], '6M': [41.12, 46.84, 36.59, 42.07, 37.77, 45.68, 51.89, 56.68, 53.74, 41.83, 42.22, 42.36, 41.39, 36.7, 41.58, 41.29, 35.09, 35.13, 43.07, 48.72, 48.36, 49.48, 55.15, 50.46, 59.78, 66.6], '1Y': [8.89, 10.49, 9.77, 11.87, 15.66, 17.03, 17.31, 18.99, 16.14, 18.32, 17.73, 19.76, 22.35, 26.13, 32.85, 36.32, 47.14, 47.08, 60.09, 67.98, 51.83, 60.42, 76.41, 55.7, 45.83, 48.45, 43.96, 43.92, 33.78, 41.98, 42.7, 46.03, 57.82, 52.36, 53.08, 46.15, 42.22, 42.36, 41.39, 38.84, 44.94, 42.16, 31.62, 35.74, 47.37, 45.17, 48.36, 49.48, 55.15, 50.46, 59.78, 66.6] },
      velocityScore: { '1D': 3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$24B', pe: 86.5, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 3.08, MEME: 5.97, RKNG: 3.5 },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 3, avgWeight: 3.97, proScore: 3.97, coverage: 1,
      price: 47.86, weeklyPrices: [48.98, 49.65, 47.28, 47.94, 47.86], weeklyChange: -2.29, sortRank: 0, periodReturns: { '1M': 42.7, '6M': 70.6, '1Y': 366.9 },
      priceHistory: { '1W': [48.98, 49.65, 47.28, 47.94, 47.86], '1M': [35.63, 39.88, 44.24, 41.53, 41.25, 44.59, 43.93, 45.48, 46.71, 42.56, 39.14, 36.62, 39.52, 48.02, 45.87, 45.14, 48.98, 49.65, 47.28, 47.94, 47.86], '6M': [28.05, 32.77, 24.24, 26.08, 24.52, 31.94, 35.22, 37.69, 33.88, 34.95, 35.28, 30, 27.93, 25.14, 27.05, 25.93, 23.76, 25.19, 27.6, 32.19, 33.67, 35.63, 44.59, 39.14, 45.14, 47.86], '1Y': [10.25, 12.48, 10.99, 9.82, 10.56, 9.33, 10.06, 10.93, 10.03, 14.79, 14.8, 15.72, 16.7, 14.33, 17.18, 19.91, 23.45, 25, 27.94, 37.76, 30.62, 34.42, 33.09, 26.41, 23.09, 24.94, 29.36, 30.99, 22, 25.72, 28.11, 37.68, 37.4, 36.18, 34.8, 38.26, 35.28, 30, 27.93, 27.03, 27.71, 27.26, 20.55, 25.18, 31.47, 31.32, 33.67, 35.63, 44.59, 39.14, 45.14, 47.86] },
      velocityScore: { '1D': 0.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$14B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.57, MEME: 5.4, RKNG: 3.94 },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 4.82, proScore: 3.94, coverage: 0.667,
      price: 302.85, weeklyPrices: [293.80, 290.01, 285.00, 273.51, 302.85], weeklyChange: 3.08, sortRank: 0, periodReturns: { '1M': 4.2, '6M': 188.4, '1Y': 1383.8 },
      priceHistory: { '1W': [293.8, 290.01, 285, 273.51, 302.85], '1M': [288.64, 295.25, 285.47, 258.64, 261.03, 283.92, 280.69, 289.76, 303.41, 275.95, 258.71, 261.34, 282.31, 307.88, 302.49, 302.4, 293.8, 290.01, 285, 273.51, 302.85], '6M': [105, 109.44, 87.61, 91.43, 86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 166, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 283.92, 258.71, 302.4, 302.85], '1Y': [20.41, 21.63, 21.34, 21.6, 22.56, 25.85, 24.69, 26.89, 37.62, 38.86, 44.08, 44.51, 50.85, 54.91, 67.29, 80.97, 69.18, 90.19, 87.58, 116.58, 94.37, 133.71, 141.41, 126.72, 108.93, 101.14, 102.5, 101.29, 76.97, 91.88, 98.69, 134.07, 149.5, 139.62, 156.13, 155.17, 139.74, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 234.68, 288.64, 283.92, 258.71, 302.4, 302.85] },
      velocityScore: { '1D': -3.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$86B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.71, RKNG: 3.93 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'NVTS', name: 'Navitas Semiconductor', easyScore: 2, avgWeight: 4.54, proScore: 3.71, coverage: 0.667,
      price: 25.86, weeklyPrices: [28.88, 28.51, 26.60, 24.86, 25.86], weeklyChange: -10.46, sortRank: 0, periodReturns: { '1M': 48.2, '6M': 210.8, '1Y': 335.4 },
      priceHistory: { '1W': [28.88, 28.51, 26.6, 24.86, 25.86], '1M': [15.92, 17.55, 16.68, 15.79, 18.2, 22.65, 19.25, 21.17, 22.32, 21.32, 19.67, 19.43, 22.99, 24.38, 29.25, 31.79, 28.88, 28.51, 26.6, 24.86, 25.86], '6M': [8.32, 9.17, 7.83, 7.66, 7.14, 10.06, 10, 10.17, 8.58, 8.86, 8.3, 8.12, 9.55, 8.2, 10.1, 8.75, 8.28, 8.84, 9.82, 13.2, 18.3, 15.92, 22.65, 19.67, 31.79, 25.86], '1Y': [5.94, 8.09, 6.86, 7.02, 6.32, 6.26, 6.15, 8.82, 7.21, 6.35, 7.36, 6.25, 6.07, 5.54, 6.08, 6.73, 6.86, 7.3, 7.74, 15.16, 13.6, 13.57, 9.86, 8.64, 7.72, 8.34, 8.69, 9.12, 7.38, 7.66, 8.38, 10.07, 10.91, 9.38, 8.62, 9.22, 8.3, 8.12, 9.55, 8.38, 10.49, 9.18, 7.83, 8.57, 9.87, 15.33, 18.3, 15.92, 22.65, 19.67, 31.79, 25.86] },
      velocityScore: { '1D': -9.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.61, RKNG: 5.48 },
      tonyNote: 'Navitas Semiconductor is a small-cap wide-bandgap power semiconductor name — gallium nitride and silicon carbide for fast charging and EV applications. The $26.60 share price and small market cap position it as a speculative holding in ETFs willing to take higher-risk bets on next-generation power conversion.',
    },
    {
      ticker: 'RDW', name: 'Redwire', easyScore: 1, avgWeight: 6.33, proScore: 3.65, coverage: 0.333,
      price: 20.58, weeklyPrices: [24.00, 25.90, 24.57, 20.68, 20.58], weeklyChange: -14.25, sortRank: 0, periodReturns: { '1M': 120.3, '6M': 294.3, '1Y': 38.7 },
      priceHistory: { '1W': [24, 25.9, 24.57, 20.68, 20.58], '1M': [8.64, 8.69, 9.64, 9.2, 11.07, 12.16, 11.56, 11.46, 13.99, 14.06, 13.96, 13.91, 14.77, 15.35, 17.49, 22.04, 24, 25.9, 24.57, 20.68, 20.58], '6M': [5.22, 7.29, 6.59, 8.01, 7.6, 10.28, 10.86, 12.52, 11.75, 10.04, 8.02, 8.12, 9.52, 8.55, 9.59, 9.2, 8.16, 9.91, 9.99, 10.21, 9.33, 8.64, 12.16, 13.96, 22.04, 20.58], '1Y': [14.84, 18.18, 16.7, 16.02, 15.6, 15.65, 17.5, 16.92, 14.06, 13.7, 9.66, 8.7, 8.99, 8.21, 8.45, 8.01, 9.35, 9.16, 9.79, 8.94, 7.64, 7.85, 7.3, 5.97, 5.48, 5.37, 5.57, 7.48, 6.44, 7.82, 9.03, 10.98, 11.71, 10.96, 10.88, 10.09, 8.02, 8.12, 9.52, 9.65, 9.54, 9.38, 7.71, 9.65, 9.81, 10.31, 9.33, 8.64, 12.16, 13.96, 22.04, 20.58] },
      velocityScore: { '1D': -14.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: null, revenueGrowth: 58, eps: -2.59, grossMargin: 13, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.33, RKNG: false },
      tonyNote: 'Redwire Corp is a space infrastructure company — solar arrays, structures, and manufacturing in orbit. It appears in Meme and speculative ETFs as a high-risk space economy play. Revenue is growing from a small base but the business is pre-profitability; the ETF weight is minimal and reflects thematic positioning rather than fundamental conviction.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab', easyScore: 3, avgWeight: 3.64, proScore: 3.64, coverage: 1,
      price: 123.32, weeklyPrices: [150.23, 148.03, 143.48, 122.39, 123.32], weeklyChange: -17.91, sortRank: 0, periodReturns: { '1M': 56.5, '6M': 194.3, '1Y': 361.5 },
      priceHistory: { '1W': [150.23, 148.03, 143.48, 122.39, 123.32], '1M': [80.31, 78.76, 84.65, 78.58, 105.47, 117.35, 117.56, 124.15, 132.55, 124.77, 131.16, 127.31, 134.28, 125.45, 135.76, 143.2, 150.23, 148.03, 143.48, 122.39, 123.32], '6M': [41.9, 53.43, 55.49, 77.18, 69.76, 83.08, 90.76, 88.9, 80.07, 72.32, 67.44, 70.21, 70.97, 70.11, 68.41, 67.23, 60.93, 67.67, 70.62, 89.46, 82.29, 80.31, 117.35, 131.16, 143.2, 123.32], '1Y': [26.72, 27.17, 26.42, 32.35, 35.68, 39.1, 47.69, 49.15, 46.44, 44.1, 43, 40.69, 46.25, 42.99, 48.43, 47.18, 48.69, 47.97, 65.31, 69.27, 60.56, 66.16, 56.42, 49.97, 43.62, 41.93, 44.72, 57.52, 53.96, 77.18, 75.99, 84.85, 96.3, 80.48, 74.15, 75.84, 67.44, 70.21, 70.97, 71.48, 71.31, 68, 57.38, 66.32, 72.22, 86.64, 82.29, 80.31, 117.35, 131.16, 143.2, 123.32] },
      velocityScore: { '1D': -12.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$71B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 2.41, MEME: 4.52, RKNG: 4 },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 4.41, proScore: 3.6, coverage: 0.667,
      price: 1064.1, weeklyPrices: [928.41, 923.52, 971.00, 1035.50, 1064.10], weeklyChange: 14.62, sortRank: 0, periodReturns: { '1M': 96.3, '6M': 344.3, '1Y': 940.7 },
      priceHistory: { '1W': [928.41, 923.52, 971, 1035.5, 1064.1], '1M': [576.45, 640.2, 666.59, 646.63, 746.81, 795.33, 766.58, 803.63, 776.01, 724.66, 681.54, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1], '6M': [239.49, 252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1], '1Y': [102.25, 114.14, 120.34, 127.25, 121.74, 123.11, 116.43, 109.83, 114.74, 108.78, 124.27, 117.21, 117.75, 124.21, 150.57, 168.89, 161.71, 182.15, 196.54, 191.94, 198.47, 226.63, 237.5, 244.9, 225.92, 230.26, 234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1] },
      velocityScore: { '1D': 7.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 50.2, revenueGrowth: 196, eps: 21.18, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { BUZZ: 3.35, MEME: false, RKNG: 5.47 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'ONDS', name: 'Ondas Holdings', easyScore: 2, avgWeight: 4.41, proScore: 3.6, coverage: 0.667,
      price: 13.58, weeklyPrices: [10.80, 13.25, 13.22, 13.46, 13.58], weeklyChange: 25.74, sortRank: 0, periodReturns: { '1M': 31.6, '6M': 68.3, '1Y': 856.3 },
      priceHistory: { '1W': [10.8, 13.25, 13.22, 13.46, 13.58], '1M': [9.73, 9.33, 9.34, 8.89, 9.06, 9.42, 9.04, 8.86, 11.21, 10.62, 9.7, 9.13, 9.36, 9.18, 9.06, 9.77, 10.8, 13.25, 13.22, 13.46, 13.58], '6M': [8.07, 9.23, 8.09, 8.96, 9.76, 14.01, 12.82, 12.17, 10.36, 9.69, 9.31, 10.19, 10.67, 9.83, 10.16, 10.06, 8.8, 9.52, 9.47, 10.73, 10.95, 9.73, 9.42, 9.7, 9.77, 13.58], '1Y': [1.42, 1.52, 1.56, 1.6, 1.88, 2.01, 2.4, 2.18, 2.07, 3.33, 3.52, 3.61, 5.07, 5.33, 6.42, 6.6, 7.35, 7.31, 11.26, 9.51, 6.74, 6.75, 6, 5.51, 7.5, 8.24, 8.92, 8.32, 7.37, 9.13, 11.02, 13.69, 12.16, 11.16, 10.64, 10.34, 9.31, 10.19, 10.67, 9.72, 10.53, 10.9, 8.15, 9.53, 9.4, 10.87, 10.95, 9.73, 9.42, 9.7, 9.77, 13.58] },
      velocityScore: { '1D': 3.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: 150.9, revenueGrowth: 1080, eps: 0.09, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.87, RKNG: 2.95 },
      tonyNote: 'Ondas Holdings is a small-cap industrial automation and drone company. It appears in Meme ETFs on the autonomous systems and drone delivery narrative. Revenue is minimal and the path to profitability is unclear; the ETF allocation is speculative and reflects retail interest in autonomous systems themes.',
    },
    {
      ticker: 'LUNR', name: 'Intuitive Machines', easyScore: 1, avgWeight: 5.66, proScore: 3.27, coverage: 0.333,
      price: 39.57, weeklyPrices: [40.34, 45.70, 43.83, 38.21, 39.57], weeklyChange: -1.91, sortRank: 0, periodReturns: { '1M': 54.4, '6M': 320.1, '1Y': 258.7 },
      priceHistory: { '1W': [40.34, 45.7, 43.83, 38.21, 39.57], '1M': [25.35, 24.8, 26.33, 24.11, 28.97, 32.42, 32.09, 35.68, 36.52, 33.89, 33.59, 32.46, 33.67, 34.24, 38.26, 34.86, 40.34, 45.7, 43.83, 38.21, 39.57], '6M': [9.42, 11.66, 10.78, 16.51, 16.23, 19.63, 19.5, 20.03, 18.99, 17.52, 16.13, 18.14, 17.99, 17.63, 17.6, 17.83, 17.52, 22.92, 24.41, 27.52, 26.2, 25.35, 32.42, 33.59, 34.86, 39.57], '1Y': [11.03, 11.21, 10.23, 10.04, 10.71, 11.18, 11.22, 13.37, 11.55, 10.5, 10.49, 8.65, 8.99, 8.42, 8.52, 9.58, 9.99, 10.61, 12.48, 12.88, 11.35, 12.02, 10.44, 9.34, 8.77, 9.29, 10.2, 11.83, 10.21, 16.71, 17.88, 18.56, 21.58, 18.42, 17.84, 19.45, 16.13, 18.14, 17.99, 18.08, 17.69, 20.31, 16.35, 22.73, 23.67, 27.82, 26.2, 25.35, 32.42, 33.59, 34.86, 39.57] },
      velocityScore: { '1D': -10.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: 199, eps: -0.87, grossMargin: 10, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.66, RKNG: false },
      tonyNote: 'Intuitive Machines is a lunar services company — it landed the first U.S. spacecraft on the Moon since 1972 in early 2024. It appears in Meme ETFs for the narrative value as much as the commercial contract pipeline. Revenue is growing via NASA contracts but the business is small and pre-profit; the ETF weight is speculative.',
    },
    {
      ticker: 'QBTS', name: 'D-Wave Quantum', easyScore: 1, avgWeight: 5.63, proScore: 3.25, coverage: 0.333,
      price: 29.91, weeklyPrices: [27.48, 29.49, 30.14, 29.18, 29.91], weeklyChange: 8.84, sortRank: 0, periodReturns: { '1M': 46, '6M': 32.9, '1Y': 69.2 },
      priceHistory: { '1W': [27.48, 29.49, 30.14, 29.18, 29.91], '1M': [20.92, 21.54, 23.83, 21.99, 22.57, 24.03, 22.35, 21.44, 22.13, 20.35, 19.06, 18.19, 19.3, 25.74, 29.4, 27.82, 27.48, 29.49, 30.14, 29.18, 29.91], '6M': [22.5, 28.33, 25.52, 29.12, 26.15, 29.28, 28.72, 25.63, 21.22, 20.72, 19.67, 18.05, 18.94, 18.59, 17.55, 15.73, 13.9, 14.14, 14.65, 21.66, 18.8, 20.92, 24.03, 19.06, 27.82, 29.91], '1Y': [17.68, 16.93, 15.55, 14.18, 15.98, 16.01, 16.91, 20.3, 17.06, 17.58, 18.65, 15.06, 15.23, 15.29, 16.52, 24.02, 27.72, 25.63, 34.25, 44.78, 27.29, 34.26, 31.02, 26.4, 23.44, 22.41, 25.08, 26.8, 23.8, 27.52, 28.13, 28.11, 28.83, 23.75, 20.97, 21.21, 19.67, 18.05, 18.94, 19.04, 17.46, 16.31, 12.98, 13.74, 16.97, 20.36, 18.8, 20.92, 24.03, 19.06, 27.82, 29.91] },
      velocityScore: { '1D': -1.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: null, revenueGrowth: -81, eps: -1.14, grossMargin: 66, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.63, RKNG: false },
      tonyNote: 'D-Wave Quantum is a quantum computing company — the only publicly traded business built around quantum annealing hardware. Revenue is minimal and profitability is many years away, but it holds a position in Meme ETFs as the purest-play quantum computing stock available to retail investors. The ETF weight is small and the position is purely thematic.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 2, avgWeight: 3.8, proScore: 3.11, coverage: 0.667,
      price: 71.4, weeklyPrices: [65.40, 70.14, 72.07, 69.28, 71.40], weeklyChange: 9.17, sortRank: 0, periodReturns: { '1M': 54.5, '6M': 52.1, '1Y': 79.4 },
      priceHistory: { '1W': [65.4, 70.14, 72.07, 69.28, 71.4], '1M': [45.75, 48, 52.57, 47.68, 49.24, 56.89, 55.87, 55.26, 57.47, 51.95, 49.31, 48.44, 52.47, 58.89, 63.64, 63.62, 65.4, 70.14, 72.07, 69.28, 71.4], '6M': [46.93, 54.44, 49.67, 51.39, 44.87, 50.45, 47.56, 47.25, 39.98, 34.99, 34.11, 30.78, 38.34, 35.73, 32.98, 31.2, 27.51, 29.24, 29.76, 48.32, 43.84, 45.75, 56.89, 49.31, 63.62, 71.4], '1Y': [39.81, 39.74, 38.04, 38.11, 44.75, 45.93, 43.54, 43.28, 39.88, 41.23, 41.21, 36.79, 41.42, 42.11, 47.05, 66.81, 73.86, 63.09, 74.3, 72.41, 55.45, 61.11, 55.41, 50.71, 47.88, 46.9, 48.65, 51.67, 45.85, 49.82, 46.77, 49.45, 50.8, 43.37, 38.56, 35.48, 34.11, 30.78, 38.34, 35.87, 33.29, 33.11, 26.59, 28.49, 35.76, 46.28, 43.84, 45.75, 56.89, 49.31, 63.62, 71.4] },
      velocityScore: { '1D': -1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$27B', pe: 183.1, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: 2.1, MEME: 5.51, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 2, avgWeight: 3.62, proScore: 2.96, coverage: 0.667,
      price: 118.17, weeklyPrices: [129.60, 133.09, 113.41, 105.65, 118.17], weeklyChange: -8.82, sortRank: 0, periodReturns: { '1M': 66.7, '6M': 107.7, '1Y': 369.3 },
      priceHistory: { '1W': [129.6, 133.09, 113.41, 105.65, 118.17], '1M': [68.43, 63.87, 70.68, 65.35, 75.05, 82.55, 72.96, 74.81, 83.01, 83.67, 86.83, 88.1, 89.58, 96.23, 105.86, 119.7, 129.6, 133.09, 113.41, 105.65, 118.17], '6M': [56.89, 72.84, 68.37, 85.67, 72.63, 90.56, 101.25, 113.57, 111.21, 101.79, 82.51, 83.9, 86.92, 89.47, 86.34, 89.93, 78.67, 94.81, 98.97, 81, 77.2, 68.43, 82.55, 86.83, 119.7, 118.17], '1Y': [25.18, 35.71, 40.1, 49.97, 45.71, 43.97, 52.63, 58.92, 54.29, 51.79, 50.05, 45.08, 48.25, 41.86, 38.37, 41.44, 54.5, 56.94, 81.2, 95.69, 71.35, 80.06, 70.38, 64.49, 58.01, 55.52, 61.44, 79.05, 61.86, 78.05, 83.47, 97.67, 115.77, 104.78, 104.55, 102.12, 82.51, 83.9, 86.92, 89.76, 89.11, 88.42, 73.82, 92.57, 88.57, 80.01, 77.2, 68.43, 82.55, 86.83, 119.7, 118.17] },
      velocityScore: { '1D': -35.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$46B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 4.51, MEME: false, RKNG: 2.73 },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'TE', name: 'T1 Energy', easyScore: 1, avgWeight: 5.1, proScore: 2.94, coverage: 0.333,
      price: 12.04, weeklyPrices: [10.96, 10.82, 10.56, 10.41, 12.04], weeklyChange: 9.85, sortRank: 0, periodReturns: { '1M': 133.8, '6M': 154, '1Y': 956.1 },
      priceHistory: { '1W': [10.96, 10.82, 10.56, 10.41, 12.04], '1M': [5.1, 5.34, 5.27, 5.15, 6.16, 6.04, 5.85, 5.61, 5.73, 5.67, 7, 6.88, 8.7, 8.72, 8.08, 10.45, 10.96, 10.82, 10.56, 10.41, 12.04], '6M': [4.74, 6.73, 5.44, 7.11, 6.68, 6.81, 7.41, 8.5, 8.33, 8.27, 6.12, 6.29, 6.84, 6.72, 7.62, 6.6, 5.76, 4.05, 5.11, 4.98, 5.31, 5.1, 6.04, 7, 10.45, 12.04], '1Y': [1.14, 1.38, 1.29, 1.27, 1.41, 1.42, 1.39, 1.57, 1.29, 1.25, 1.34, 1.33, 1.58, 1.85, 1.88, 1.86, 2.2, 2.39, 2.93, 5.24, 4.11, 3.6, 4.09, 3.85, 2.89, 3.84, 4.52, 6.15, 5.42, 7.05, 7.84, 6.94, 8.17, 8.14, 8.66, 7.64, 6.12, 6.29, 6.84, 7.16, 7.72, 6.84, 5.62, 3.93, 4.86, 5.09, 5.31, 5.1, 6.04, 7, 10.45, 12.04] },
      velocityScore: { '1D': 0.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3B', pe: null, revenueGrowth: 232, eps: -1.87, grossMargin: 8, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.1, RKNG: false },
      tonyNote: 'Tronox Holdings is a titanium dioxide producer — a commodity chemicals company that appears in some ETFs for its materials exposure. The small share price reflects commodity pricing pressure; this is a cyclical materials position rather than a technology or infrastructure allocation.',
    },
    {
      ticker: 'RGTI', name: 'RGTI', easyScore: 2, avgWeight: 3.48, proScore: 2.85, coverage: 0.667,
      price: 26.88, weeklyPrices: [24.62, 27.03, 25.54, 25.63, 26.88], weeklyChange: 9.18, sortRank: 0, periodReturns: { '1M': 53.6, '6M': 12.6, '1Y': 123.3 },
      priceHistory: { '1W': [24.62, 27.03, 25.54, 25.63, 26.88], '1M': [17.7, 18.27, 20.09, 18.34, 18.94, 20.51, 19.07, 18.42, 19.27, 17.85, 16.62, 15.96, 16.88, 22.04, 26.42, 25.07, 24.62, 27.03, 25.54, 25.63, 26.88], '6M': [23.88, 28.22, 23.96, 25.11, 22.15, 25.25, 24.7, 23.45, 18.17, 17.71, 16.09, 16.02, 17.69, 17.01, 16.17, 14.88, 13.32, 14.2, 15.13, 19.64, 16.91, 17.7, 20.51, 16.62, 25.07, 26.88], '1Y': [12.04, 11.24, 11.48, 11.09, 13.08, 13.03, 16.56, 16.14, 14.17, 15.99, 17.24, 14.76, 15.39, 15.12, 16.69, 24.74, 31.64, 29.85, 43.23, 56.34, 36.06, 39.41, 37.29, 28.3, 25.46, 25.57, 26.04, 26.12, 22.47, 24.51, 23.6, 24.72, 25.62, 21.76, 17.71, 17.59, 16.09, 16.02, 17.69, 17.6, 16.14, 15.88, 12.9, 13.84, 16.87, 18.25, 16.91, 17.7, 20.51, 16.62, 25.07, 26.88] },
      velocityScore: { '1D': -1.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: 199, eps: -0.89, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.44, RKNG: 3.53 },
      tonyNote: 'Rigetti Computing is a quantum hardware company using superconducting qubit technology. It holds a position in Meme ETFs alongside IonQ and D-Wave as part of the quantum computing basket. Revenue is minimal, the technology is earlier-stage than IonQ, and the ETF allocation is speculative. The weight score is low; this is a high-risk, long-duration positioning.',
    },
    {
      ticker: 'AXTI', name: 'AXT Inc', easyScore: 1, avgWeight: 4.69, proScore: 2.71, coverage: 0.333,
      price: 110.85, weeklyPrices: [122.77, 115.70, 103.16, 109.55, 110.85], weeklyChange: -9.71, sortRank: 0, periodReturns: { '1M': 15.5, '6M': 842.6, '1Y': 6307.5 },
      priceHistory: { '1W': [122.77, 115.7, 103.16, 109.55, 110.85], '1M': [106, 107.55, 104.83, 108.42, 116.36, 125.81, 122.9, 121.94, 114.98, 123.78, 105.88, 112.88, 104.61, 121.02, 140.83, 132.6, 122.77, 115.7, 103.16, 109.55, 110.85], '6M': [11.76, 14.96, 13, 14.64, 16.35, 25.83, 25.72, 17.4, 18.54, 24.06, 24.24, 28.43, 46.32, 32.37, 48.86, 54.24, 60.63, 41.99, 66.45, 78.76, 70.15, 106, 125.81, 105.88, 132.6, 110.85], '1Y': [1.73, 1.94, 1.95, 2.13, 2.08, 2.26, 2.39, 2.52, 2.12, 2.07, 2.18, 2.51, 2.87, 2.96, 3.39, 3.96, 4.83, 4.91, 5.31, 4.59, 4.94, 7.07, 9.1, 10.98, 10.11, 10.45, 11.48, 15.51, 12.36, 15.01, 16.76, 22.99, 22.09, 17.8, 20.94, 27.77, 24.24, 28.43, 46.32, 38.56, 48.39, 64.44, 52.73, 45.46, 67.3, 74.97, 70.15, 106, 125.81, 105.88, 132.6, 110.85] },
      velocityScore: { '1D': 8.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 39, eps: -0.32, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.69, RKNG: false },
      tonyNote: 'AXT Inc is a compound semiconductor substrate manufacturer — gallium arsenide, indium phosphide, and germanium wafers used in data center optical transceivers, 5G RF chips, and solar cells. Revenue is growing with optical networking demand. Small market cap but positioned at a genuine supply-chain chokepoint for III-V semiconductor materials.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 1, avgWeight: 4.44, proScore: 2.56, coverage: 0.333,
      price: 563.1, weeklyPrices: [530.60, 531.18, 531.21, 546.20, 563.10], weeklyChange: 6.13, sortRank: 0, periodReturns: { '1M': 30.5, '6M': 252, '1Y': 947.2 },
      priceHistory: { '1W': [530.6, 531.18, 531.21, 546.2, 563.1], '1M': [442.36, 465.26, 483.15, 463.91, 480, 515.83, 488.74, 494.09, 489.15, 482.02, 458.68, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 563.1], '6M': [159.99, 169.54, 174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 458.68, 524.65, 563.1], '1Y': [53.77, 55.95, 58.57, 62.55, 65.78, 65.06, 66.53, 69.32, 71.43, 73.78, 76.07, 75.64, 80.67, 90.49, 96.15, 105.15, 109.69, 130.59, 121.18, 120.44, 120.47, 141.38, 160.1, 166.11, 153.97, 157.74, 155.59, 181.95, 166.26, 179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 400.73, 442.36, 515.83, 458.68, 524.65, 563.1] },
      velocityScore: { '1D': 2.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$194B', pe: 33.7, revenueGrowth: 46, eps: 16.72, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.44 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 1, avgWeight: 4.29, proScore: 2.48, coverage: 0.333,
      price: 229, weeklyPrices: [221.23, 222.35, 236.03, 226.10, 229.00], weeklyChange: 3.51, sortRank: 0, periodReturns: { '1M': 24.2, '6M': 21.5, '1Y': 218.4 },
      priceHistory: { '1W': [221.23, 222.35, 236.03, 226.1, 229], '1M': [180.06, 193.57, 198.29, 188.29, 188.51, 210.22, 198.57, 189.36, 184.54, 172.17, 156.27, 168.99, 182.98, 193.39, 218.41, 221.64, 221.23, 222.35, 236.03, 226.1, 229], '6M': [188.44, 170.29, 140.34, 147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 156.27, 221.64, 229], '1Y': [71.92, 68.53, 79.71, 92.2, 89.37, 97.29, 101.19, 98.41, 116.01, 117.34, 121.13, 105.99, 122.73, 134, 159.32, 172.31, 149.38, 144.91, 148.87, 131.41, 137.2, 171.52, 173.16, 160.34, 141.88, 164.01, 189.19, 157.98, 134.13, 150.19, 143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 121.44, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 180.5, 180.06, 210.22, 156.27, 221.64, 229] },
      velocityScore: { '1D': 2.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$42B', pe: 126.5, revenueGrowth: 157, eps: 1.81, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.29 },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
