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
export const SPY_RET: Record<Period, number> = { '1W': 0.1, '1M': 5.2, '6M': 10.5, '1Y': 26.8 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 8.2 }, { t: 'AMD', w: 4.5 }, { t: 'MRVL', w: 4.4 }, { t: 'VRT', w: 3.8 }, { t: 'SIMO', w: 3.6 }],
  ARTY: [{ t: 'MRVL', w: 8.6 }, { t: 'MU', w: 7.5 }, { t: 'AMD', w: 7.0 }, { t: 'ORCL', w: 4.4 }, { t: 'CRWV', w: 4.4 }],
  BAI: [{ t: 'MU', w: 6.0 }, { t: 'AVGO', w: 5.6 }, { t: 'AMD', w: 4.9 }, { t: 'NVDA', w: 4.5 }, { t: 'TSM', w: 4.3 }],
  IVEP: [{ t: 'BE', w: 5.4 }, { t: 'COHR', w: 4.3 }, { t: 'VRT', w: 4.2 }, { t: 'PWR', w: 4.2 }, { t: 'SBGSY', w: 4.2 }],
  IGPT: [{ t: 'MU', w: 12.6 }, { t: 'AMD', w: 7.1 }, { t: 'INTC', w: 6.2 }, { t: 'NVDA', w: 5.9 }, { t: 'GOOGL', w: 5.7 }],
  IVES: [{ t: 'MU', w: 5.9 }, { t: 'AVGO', w: 5.0 }, { t: 'TSM', w: 4.7 }, { t: 'NVDA', w: 4.6 }, { t: 'AMD', w: 4.6 }],
  ALAI: [{ t: 'NVDA', w: 13.4 }, { t: 'AMZN', w: 5.8 }, { t: 'TSM', w: 5.6 }, { t: 'MSFT', w: 5.5 }, { t: 'AVGO', w: 4.9 }],
  CHAT: [{ t: 'MU', w: 6.3 }, { t: 'NVDA', w: 5.8 }, { t: 'AMD', w: 5.5 }, { t: 'GOOGL', w: 5.1 }, { t: 'ARM', w: 4.5 }],
  AIFD: [{ t: 'NVDA', w: 6.7 }, { t: 'MU', w: 6.5 }, { t: 'AVGO', w: 6.1 }, { t: 'LITE', w: 6.0 }, { t: 'DOCN', w: 5.7 }],
  SPRX: [{ t: 'COHR', w: 8.5 }, { t: 'ARM', w: 7.7 }, { t: 'ALAB', w: 7.7 }, { t: 'KLAC', w: 5.9 }, { t: 'WULF', w: 5.5 }],
  AOTG: [{ t: 'AMD', w: 14.8 }, { t: 'NVDA', w: 10.8 }, { t: 'MU', w: 9.9 }, { t: 'TSM', w: 6.9 }, { t: 'APP', w: 5.2 }],
  SOXX: [{ t: 'MU', w: 12.0 }, { t: 'AMD', w: 9.0 }, { t: 'MRVL', w: 8.3 }, { t: 'AVGO', w: 7.0 }, { t: 'NVDA', w: 5.8 }],
  PSI: [{ t: 'MXL', w: 8.3 }, { t: 'MU', w: 8.0 }, { t: 'AMD', w: 7.6 }, { t: 'AVGO', w: 4.6 }, { t: 'TXN', w: 4.5 }],
  XSD: [{ t: 'MXL', w: 5.7 }, { t: 'MRVL', w: 4.6 }, { t: 'ALAB', w: 4.1 }, { t: 'MU', w: 3.6 }, { t: 'AMD', w: 3.6 }],
  DRAM: [{ t: 'SNDK', w: 4.8 }, { t: 'MU', w: 4.4 }, { t: 'STX', w: 4.1 }, { t: 'WDC', w: 3.6 }],
  PTF: [{ t: 'SNDK', w: 7.3 }, { t: 'MU', w: 5.0 }, { t: 'STX', w: 4.7 }, { t: 'WDC', w: 4.7 }, { t: 'NVDA', w: 4.4 }],
  WCLD: [{ t: 'DOCN', w: 3.2 }, { t: 'DDOG', w: 2.8 }, { t: 'FROG', w: 2.8 }, { t: 'PANW', w: 2.4 }, { t: 'CRWD', w: 2.4 }],
  IGV: [{ t: 'ORCL', w: 10.5 }, { t: 'PANW', w: 7.8 }, { t: 'MSFT', w: 7.6 }, { t: 'PLTR', w: 7.0 }, { t: 'CRWD', w: 6.3 }],
  FDTX: [{ t: 'MU', w: 9.4 }, { t: 'MRVL', w: 8.1 }, { t: 'TSM', w: 6.0 }, { t: 'NVDA', w: 4.6 }, { t: 'STX', w: 4.0 }],
  GTEK: [{ t: 'MRVL', w: 3.5 }, { t: 'DELL', w: 3.3 }, { t: 'CDNS', w: 2.6 }, { t: 'NET', w: 2.3 }, { t: 'APH', w: 2.1 }],
  ARKK: [{ t: 'TSLA', w: 10.2 }, { t: 'AMD', w: 5.2 }, { t: 'TEM', w: 4.8 }, { t: 'HOOD', w: 4.7 }, { t: 'CRSP', w: 4.7 }],
  MARS: [{ t: 'RKLB', w: 13.3 }, { t: 'ASTS', w: 10.0 }, { t: 'SATS', w: 7.5 }, { t: 'PL', w: 5.9 }, { t: 'LUNR', w: 4.9 }],
  FRWD: [{ t: 'STX', w: 8.9 }, { t: 'AMD', w: 7.9 }, { t: 'NVDA', w: 7.9 }, { t: 'TSM', w: 5.7 }, { t: 'LRCX', w: 5.6 }],
  BCTK: [{ t: 'TSM', w: 8.4 }, { t: 'AVGO', w: 8.3 }, { t: 'NVDA', w: 6.7 }, { t: 'LRCX', w: 6.4 }, { t: 'MU', w: 5.2 }],
  FWD: [{ t: 'AVGO', w: 3.0 }, { t: 'AMD', w: 2.7 }, { t: 'NVDA', w: 2.0 }, { t: 'CAT', w: 1.8 }, { t: 'LRCX', w: 1.7 }],
  CBSE: [{ t: 'SNOW', w: 3.3 }, { t: 'MU', w: 3.0 }, { t: 'MRVL', w: 2.7 }, { t: 'TENB', w: 2.7 }, { t: 'WTTR', w: 2.6 }],
  FCUS: [{ t: 'MU', w: 6.7 }, { t: 'SNDK', w: 5.5 }, { t: 'WDC', w: 4.8 }, { t: 'STX', w: 4.8 }, { t: 'INTC', w: 4.8 }],
  WGMI: [{ t: 'CIFR', w: 15.4 }, { t: 'IREN', w: 13.5 }, { t: 'WULF', w: 9.0 }, { t: 'CORZ', w: 7.1 }, { t: 'KEEL', w: 7.0 }],
  POW: [{ t: 'POWL', w: 6.6 }, { t: 'VICR', w: 5.7 }, { t: 'PWR', w: 4.7 }, { t: 'PRY', w: 4.5 }, { t: 'ETN', w: 4.1 }],
  VOLT: [{ t: 'POWL', w: 8.0 }, { t: 'BELFB', w: 7.2 }, { t: 'ETN', w: 5.5 }, { t: 'PWR', w: 5.5 }, { t: 'BE', w: 4.7 }],
  PBD: [{ t: 'BLDP', w: 2.3 }, { t: 'SEDG', w: 1.7 }, { t: 'PLUG', w: 1.7 }, { t: 'BE', w: 1.6 }, { t: 'ENPH', w: 1.2 }],
  PBW: [{ t: 'FCEL', w: 3.7 }, { t: 'HYLN', w: 3.6 }, { t: 'NVTS', w: 2.8 }, { t: 'BLDP', w: 2.5 }, { t: 'BE', w: 2.1 }],
  AIRR: [{ t: 'STRL', w: 6.5 }, { t: 'FIX', w: 4.3 }, { t: 'SAIA', w: 4.1 }, { t: 'AGX', w: 4.1 }, { t: 'CHRW', w: 4.0 }],
  PRN: [{ t: 'TTMI', w: 5.7 }, { t: 'PL', w: 5.2 }, { t: 'FIX', w: 4.7 }, { t: 'STRL', w: 4.5 }, { t: 'VICR', w: 4.4 }],
  RSHO: [{ t: 'TKR', w: 8.8 }, { t: 'POWL', w: 7.9 }, { t: 'CGNX', w: 7.5 }, { t: 'CAT', w: 6.5 }, { t: 'ETN', w: 5.7 }],
  IDEF: [{ t: 'RTX', w: 7.3 }, { t: 'LMT', w: 6.5 }, { t: 'GD', w: 5.3 }, { t: 'PLTR', w: 5.2 }, { t: 'BA', w: 4.7 }],
  BILT: [{ t: 'UNP', w: 5.6 }, { t: 'AEP', w: 4.4 }, { t: 'AENA', w: 4.1 }, { t: 'LNG', w: 3.9 }, { t: 'CP', w: 3.7 }],
  BUZZ: [{ t: 'ASTS', w: 4.5 }, { t: 'SMCI', w: 3.5 }, { t: 'MU', w: 3.4 }, { t: 'AMD', w: 3.2 }, { t: 'NOW', w: 3.2 }],
  MEME: [{ t: 'AAOI', w: 8.2 }, { t: 'NBIS', w: 6.4 }, { t: 'RDW', w: 6.3 }, { t: 'IREN', w: 6.0 }, { t: 'ONDS', w: 5.9 }],
  RKNG: [{ t: 'SNDK', w: 6.0 }, { t: 'NVTS', w: 5.5 }, { t: 'MU', w: 5.5 }, { t: 'NBIS', w: 5.2 }, { t: 'WDC', w: 4.4 }],
};
// @@END_GENERATED:ETF_TOP_HOLDINGS@@

// @@GENERATED:TOP10_RET@@
// Top10 composite returns per theme per period (average of all ETFs in theme)
const TOP10_RET: Record<Theme, Record<Period, number>> = {
  'AI & ML':         { '1W': 4, '1M': 20.4, '6M': 48.8, '1Y': 95.9 },
  'Semiconductors':  { '1W': 4.3, '1M': 34.5, '6M': 107.4, '1Y': 176.2 },
  'Broad Tech':      { '1W': 2.5, '1M': 16.6, '6M': 34.1, '1Y': 69.2 },
  'Electrification': { '1W': -0.4, '1M': 5.4, '6M': 44.5, '1Y': 89.2 },
  'Industrials':     { '1W': -1.4, '1M': 2.4, '6M': 25.4, '1Y': 44.2 },
  'Meme':            { '1W': 0.2, '1M': 21.6, '6M': 36.7, '1Y': 27.6 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, Record<Period, ChartPeriodData>> = {
  'AI & ML': {
    '1W': { top10: [100, 100.74, 103.29, 105.68, 104.04], spy: [100, 100.25, 100.52, 100.66, 100.13], top10Return: 4, spyReturn: 0.1, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 102.18, 105.58, 103.37, 106.52, 108.85, 106.2, 108.75, 109.79, 106.22, 103.46, 106.43, 109.11, 110.15, 114.04, 113.94, 115.7, 116.51, 119.49, 122.29, 120.35], spy: [100, 100.8, 102.2, 101.89, 102.73, 102.97, 102.81, 103.38, 104.2, 102.95, 102.19, 103.24, 103.44, 103.85, 104.54, 104.52, 105.1, 105.36, 105.64, 105.79, 105.23], top10Return: 20.4, spyReturn: 5.2, xLabels: ["May 6", "May 13", "May 20", "May 27", "Jun 3"] },
    '6M': { top10: [100, 102.95, 94.94, 100.86, 101.21, 102.69, 103.73, 103.97, 104.23, 103.39, 101.81, 103.22, 99.68, 101.65, 101.99, 101.12, 92.68, 100.59, 111.47, 115.44, 116.99, 125.73, 130.95, 127.67, 140.44, 148.85], spy: [100, 100.54, 98.17, 100.95, 99.89, 101.49, 101.14, 101.29, 101.68, 101.47, 99.85, 100.51, 99.48, 99.18, 97.83, 95.83, 92.41, 96.39, 101.55, 102.95, 104.06, 105.83, 107.94, 107.29, 109.73, 110.48], top10Return: 48.8, spyReturn: 10.5, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.07, 102.65, 106.28, 107.73, 108.67, 111.34, 112.59, 115.16, 115.56, 118.37, 112.96, 116.8, 117.31, 124.72, 128.97, 127.44, 132.28, 136.73, 133.59, 131.91, 142.55, 137.9, 134.66, 126.93, 130.27, 133.56, 136.4, 127.4, 133.49, 135.02, 137.81, 137.62, 138.09, 137.96, 137.85, 134.72, 136.83, 131.47, 134.81, 136.22, 133.18, 127.38, 139.96, 150.59, 155.77, 157.34, 170.08, 177.99, 173.45, 192.75, 204.55], spy: [100, 101.17, 100.24, 101.85, 104.09, 104.99, 105.36, 106.4, 106.44, 106.16, 108.19, 107.05, 108.48, 108.9, 110.32, 111.1, 110.39, 112.27, 112.59, 110.83, 112.03, 115.32, 113.67, 114.64, 111.16, 114.02, 114.81, 115.62, 113.48, 115.81, 115.37, 116.62, 116.03, 116.21, 116.66, 116.42, 114.55, 115.31, 114.13, 113.6, 112.53, 109.58, 109.1, 113.41, 117.42, 118.12, 119.39, 121.42, 123.84, 123.09, 125.9, 126.76], top10Return: 95.9, spyReturn: 26.8, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Semiconductors': {
    '1W': { top10: [100, 99.05, 100.35, 105.23, 104.32], spy: [100, 100.25, 100.52, 100.66, 100.13], top10Return: 4.3, spyReturn: 0.1, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 105.31, 109.62, 106.9, 115.22, 119.12, 113.51, 117.22, 117.09, 112.71, 109.63, 114.44, 117.3, 119.02, 128.21, 127.18, 128.72, 127.61, 129.67, 135.82, 134.55], spy: [100, 100.8, 102.2, 101.89, 102.73, 102.97, 102.81, 103.38, 104.2, 102.95, 102.19, 103.24, 103.44, 103.85, 104.54, 104.52, 105.1, 105.36, 105.64, 105.79, 105.23], top10Return: 34.5, spyReturn: 5.2, xLabels: ["May 6", "May 13", "May 20", "May 27", "Jun 3"] },
    '6M': { top10: [100, 103.95, 99.15, 103.62, 108.08, 111.11, 114.93, 113.69, 118.05, 119.85, 120.22, 122.31, 118.28, 122.41, 123.55, 129.35, 121.53, 132.85, 142.87, 148.84, 156.41, 168.56, 183.83, 181.4, 202.81, 207.44], spy: [100, 100.54, 98.17, 100.95, 99.89, 101.49, 101.14, 101.29, 101.68, 101.47, 99.85, 100.51, 99.48, 99.18, 97.83, 95.83, 92.41, 96.39, 101.55, 102.95, 104.06, 105.83, 107.94, 107.29, 109.73, 110.48], top10Return: 107.4, spyReturn: 10.5, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 106.09, 105.08, 110.78, 113.73, 115.84, 115.88, 114.13, 116.25, 112.52, 120.23, 115.14, 120.67, 118.78, 124.93, 132.41, 130.84, 136.91, 140.13, 141.3, 137.43, 148.36, 145.19, 142.42, 132.29, 138.14, 146.61, 151.28, 139.99, 145.59, 151.14, 157.4, 162.52, 161.25, 165.64, 169.4, 169.92, 172.45, 160.66, 159.52, 160.89, 164.04, 157.31, 176.06, 190.66, 204.11, 210.87, 237.37, 253.37, 244.2, 277.64, 286.63], spy: [100, 101.17, 100.24, 101.85, 104.09, 104.99, 105.36, 106.4, 106.44, 106.16, 108.19, 107.05, 108.48, 108.9, 110.32, 111.1, 110.39, 112.27, 112.59, 110.83, 112.03, 115.32, 113.67, 114.64, 111.16, 114.02, 114.81, 115.62, 113.48, 115.81, 115.37, 116.62, 116.03, 116.21, 116.66, 116.42, 114.55, 115.31, 114.13, 113.6, 112.53, 109.58, 109.1, 113.41, 117.42, 118.12, 119.39, 121.42, 123.84, 123.09, 125.9, 126.76], top10Return: 176.2, spyReturn: 26.8, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Broad Tech': {
    '1W': { top10: [100, 100.81, 102.69, 103.95, 102.51], spy: [100, 100.25, 100.52, 100.66, 100.13], top10Return: 2.5, spyReturn: 0.1, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 101.72, 104.44, 102.64, 105.1, 106.93, 104.87, 105.83, 107.42, 104.68, 103.14, 105.37, 107.29, 109, 112.32, 112.66, 114.32, 114.95, 116.81, 118.28, 116.58], spy: [100, 100.8, 102.2, 101.89, 102.73, 102.97, 102.81, 103.38, 104.2, 102.95, 102.19, 103.24, 103.44, 103.85, 104.54, 104.52, 105.1, 105.36, 105.64, 105.79, 105.23], top10Return: 16.6, spyReturn: 5.2, xLabels: ["May 6", "May 13", "May 20", "May 27", "Jun 3"] },
    '6M': { top10: [100, 102.65, 96.56, 101.1, 99.62, 102.5, 103.47, 102.1, 101.37, 100.82, 99.45, 101.2, 99.99, 99.55, 99.07, 98.89, 93.18, 99.73, 107.53, 111.29, 111.7, 119.97, 123, 121.03, 128.28, 134.14], spy: [100, 100.54, 98.17, 100.95, 99.89, 101.49, 101.14, 101.29, 101.68, 101.47, 99.85, 100.51, 99.48, 99.18, 97.83, 95.83, 92.41, 96.39, 101.55, 102.95, 104.06, 105.83, 107.94, 107.29, 109.73, 110.48], top10Return: 34.1, spyReturn: 10.5, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.06, 101.99, 104.52, 107.66, 108.63, 111.37, 111.73, 110.41, 110.19, 110.69, 108.55, 111.71, 111.02, 117.11, 122.34, 121.88, 127.87, 133.62, 132.77, 127.83, 136.1, 135.29, 128.1, 120.3, 124.8, 127.55, 128.74, 120.54, 123.58, 126.6, 129.15, 130.95, 129.55, 127.07, 127.29, 124.52, 128.26, 125.25, 125.33, 127.96, 125.75, 122.51, 130.62, 137.79, 141.16, 140.83, 151.47, 154.9, 149.17, 162.85, 169.2], spy: [100, 101.17, 100.24, 101.85, 104.09, 104.99, 105.36, 106.4, 106.44, 106.16, 108.19, 107.05, 108.48, 108.9, 110.32, 111.1, 110.39, 112.27, 112.59, 110.83, 112.03, 115.32, 113.67, 114.64, 111.16, 114.02, 114.81, 115.62, 113.48, 115.81, 115.37, 116.62, 116.03, 116.21, 116.66, 116.42, 114.55, 115.31, 114.13, 113.6, 112.53, 109.58, 109.1, 113.41, 117.42, 118.12, 119.39, 121.42, 123.84, 123.09, 125.9, 126.76], top10Return: 69.2, spyReturn: 26.8, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Electrification': {
    '1W': { top10: [100, 98.96, 98.85, 100.55, 99.58], spy: [100, 100.25, 100.52, 100.66, 100.13], top10Return: -0.4, spyReturn: 0.1, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 102.72, 103.81, 101.56, 103.31, 105.61, 102.87, 103.74, 103.69, 100.95, 95.58, 97.91, 100.96, 102.64, 106.18, 105.53, 105.84, 104.73, 104.64, 106.51, 105.39], spy: [100, 100.8, 102.2, 101.89, 102.73, 102.97, 102.81, 103.38, 104.2, 102.95, 102.19, 103.24, 103.44, 103.85, 104.54, 104.52, 105.1, 105.36, 105.64, 105.79, 105.23], top10Return: 5.4, spyReturn: 5.2, xLabels: ["May 6", "May 13", "May 20", "May 27", "Jun 3"] },
    '6M': { top10: [100, 102.78, 96.97, 101.52, 102.85, 104.06, 109.7, 110.84, 110.13, 115.6, 116, 119.42, 112.82, 112.2, 114.14, 113.81, 109, 114.09, 125.14, 127.16, 131.19, 141.7, 141.67, 131.5, 144.87, 144.49], spy: [100, 100.54, 98.17, 100.95, 99.89, 101.49, 101.14, 101.29, 101.68, 101.47, 99.85, 100.51, 99.48, 99.18, 97.83, 95.83, 92.41, 96.39, 101.55, 102.95, 104.06, 105.83, 107.94, 107.29, 109.73, 110.48], top10Return: 44.5, spyReturn: 10.5, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 103.13, 102.71, 103.52, 107.03, 109.79, 111.69, 114.97, 112.25, 112.8, 116.37, 115.31, 117.16, 116.25, 118.39, 123.26, 126.37, 130.06, 135.19, 139.17, 135.35, 141.18, 140.41, 139.21, 133.97, 136.85, 139.13, 142.01, 137.58, 138.99, 140.21, 144.59, 147.28, 149.02, 147.45, 151.44, 150.7, 153.93, 149.08, 151.12, 153.43, 153.19, 153.84, 160.75, 168.46, 170.52, 171.87, 180.26, 180.81, 174.47, 188.46, 189.21], spy: [100, 101.17, 100.24, 101.85, 104.09, 104.99, 105.36, 106.4, 106.44, 106.16, 108.19, 107.05, 108.48, 108.9, 110.32, 111.1, 110.39, 112.27, 112.59, 110.83, 112.03, 115.32, 113.67, 114.64, 111.16, 114.02, 114.81, 115.62, 113.48, 115.81, 115.37, 116.62, 116.03, 116.21, 116.66, 116.42, 114.55, 115.31, 114.13, 113.6, 112.53, 109.58, 109.1, 113.41, 117.42, 118.12, 119.39, 121.42, 123.84, 123.09, 125.9, 126.76], top10Return: 89.2, spyReturn: 26.8, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Industrials': {
    '1W': { top10: [100, 99.36, 97.9, 99.19, 98.54], spy: [100, 100.25, 100.52, 100.66, 100.13], top10Return: -1.4, spyReturn: 0.1, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 102.18, 104.42, 101.85, 102.24, 103.35, 102.45, 102.48, 103.18, 100.45, 97.89, 99.78, 99.97, 100.88, 103.4, 103.41, 103.88, 103.21, 101.69, 103.05, 102.37], spy: [100, 100.8, 102.2, 101.89, 102.73, 102.97, 102.81, 103.38, 104.2, 102.95, 102.19, 103.24, 103.44, 103.85, 104.54, 104.52, 105.1, 105.36, 105.64, 105.79, 105.23], top10Return: 2.4, spyReturn: 5.2, xLabels: ["May 6", "May 13", "May 20", "May 27", "Jun 3"] },
    '6M': { top10: [100, 102.1, 98.84, 103.43, 103.5, 108.01, 112.64, 111.66, 111.89, 117.73, 118.85, 121.12, 118.36, 115.66, 113.75, 112.72, 107.68, 114.57, 121.83, 120.61, 120.51, 125.03, 125.42, 119.67, 126.6, 125.38], spy: [100, 100.54, 98.17, 100.95, 99.89, 101.49, 101.14, 101.29, 101.68, 101.47, 99.85, 100.51, 99.48, 99.18, 97.83, 95.83, 92.41, 96.39, 101.55, 102.95, 104.06, 105.83, 107.94, 107.29, 109.73, 110.48], top10Return: 25.4, spyReturn: 10.5, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 101.07, 100.55, 101.86, 104.71, 105.94, 107.26, 107.86, 107.9, 108.2, 110.85, 108.38, 111, 110.56, 112.83, 113.72, 112.44, 116.01, 116.61, 115.19, 114.73, 119.56, 116.75, 115.91, 110.68, 114.11, 115.74, 118.77, 115.29, 118.61, 121.87, 126.39, 130.43, 130.09, 130.3, 136.62, 136.34, 138.46, 135.4, 131.65, 130.6, 130.82, 128.82, 136.76, 137.61, 139.03, 138.48, 143.46, 143.75, 137.65, 145.34, 144.17], spy: [100, 101.17, 100.24, 101.85, 104.09, 104.99, 105.36, 106.4, 106.44, 106.16, 108.19, 107.05, 108.48, 108.9, 110.32, 111.1, 110.39, 112.27, 112.59, 110.83, 112.03, 115.32, 113.67, 114.64, 111.16, 114.02, 114.81, 115.62, 113.48, 115.81, 115.37, 116.62, 116.03, 116.21, 116.66, 116.42, 114.55, 115.31, 114.13, 113.6, 112.53, 109.58, 109.1, 113.41, 117.42, 118.12, 119.39, 121.42, 123.84, 123.09, 125.9, 126.76], top10Return: 44.2, spyReturn: 26.8, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
  },
  'Meme': {
    '1W': { top10: [100, 98.72, 98.94, 101.33, 100.21], spy: [100, 100.25, 100.52, 100.66, 100.13], top10Return: 0.2, spyReturn: 0.1, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 103.63, 107.96, 102.56, 106.05, 110.98, 107.76, 110.17, 111.21, 106.85, 100.92, 104.82, 111.2, 113.86, 117.68, 119.45, 121.64, 119.96, 120.13, 123.15, 121.62], spy: [100, 100.8, 102.2, 101.89, 102.73, 102.97, 102.81, 103.38, 104.2, 102.95, 102.19, 103.24, 103.44, 103.85, 104.54, 104.52, 105.1, 105.36, 105.64, 105.79, 105.23], top10Return: 21.6, spyReturn: 5.2, xLabels: ["May 6", "May 13", "May 20", "May 27", "Jun 3"] },
    '6M': { top10: [100, 102.67, 89.17, 95.41, 93.25, 100.48, 103.42, 97.59, 93.92, 94.98, 90.06, 90.26, 87.16, 87.34, 90.84, 92.52, 86.06, 94.15, 103.75, 110.81, 105.65, 116.55, 118.92, 117.57, 135.26, 136.72], spy: [100, 100.54, 98.17, 100.95, 99.89, 101.49, 101.14, 101.29, 101.68, 101.47, 99.85, 100.51, 99.48, 99.18, 97.83, 95.83, 92.41, 96.39, 101.55, 102.95, 104.06, 105.83, 107.94, 107.29, 109.73, 110.48], top10Return: 36.7, spyReturn: 10.5, xLabels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    '1Y': { top10: [100, 102.64, 101.05, 97.88, 95.98, 94.32, 94.16, 94.97, 89.33, 87.14, 86.5, 86.51, 87.47, 90.65, 90.95, 88.6, 91.53, 93.28, 94.57, 97.16, 96.32, 100.26, 98.19, 94.19, 90.55, 88.85, 87.81, 90.11, 87.15, 90.59, 92.56, 93.17, 93.28, 95.39, 94.47, 93.98, 92.17, 87, 91.71, 95.38, 100.77, 99.73, 101.1, 100.03, 104.29, 106.45, 109.01, 114.49, 114.01, 120.32, 124.79, 127.64], spy: [100, 101.17, 100.24, 101.85, 104.09, 104.99, 105.36, 106.4, 106.44, 106.16, 108.19, 107.05, 108.48, 108.9, 110.32, 111.1, 110.39, 112.27, 112.59, 110.83, 112.03, 115.32, 113.67, 114.64, 111.16, 114.02, 114.81, 115.62, 113.48, 115.81, 115.37, 116.62, 116.03, 116.21, 116.66, 116.42, 114.55, 115.31, 114.13, 113.6, 112.53, 109.58, 109.1, 113.41, 117.42, 118.12, 119.39, 121.42, 123.84, 123.09, 125.9, 126.76], top10Return: 27.6, spyReturn: 26.8, xLabels: ["Jun '25", "Sep '25", "Dec '25", "Mar '26", "Jun '26"] },
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
export const SCAN_TIMESTAMP    = '2026-06-03T13:48:02.315Z';
export const SCAN_TIMESTAMP_NY = 'June 3, 2026 at 9:48 AM ET';
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
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 15.52, bestProScore: 6.99, price: 1048.39, weeklyChange: 13.52 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 11.11, bestProScore: 5.06, price: 530.09, weeklyChange: 2.32 },
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 10.67, bestProScore: 5.61, price: 217.65, weeklyChange: 1.59 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 7.63, bestProScore: 3.40, price: 475.55, weeklyChange: 11.48 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 6.52, bestProScore: 3.21, price: 298.29, weeklyChange: 45.63 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 5.77, bestProScore: 3.65, price: 285.77, weeklyChange: -1.08 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.39, bestProScore: 2.53, price: 438.28, weeklyChange: 3.16 },
  { ticker: 'ETN', name: `Eaton Corp PLC`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 3.55, bestProScore: 2.41, price: 416.47, weeklyChange: 3.62 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 3.22, bestProScore: 2.17, price: 113.41, weeklyChange: -6.19 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.15, bestProScore: 1.90, price: 335.27, weeklyChange: 5.43 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': 4.8, '1M': 33.4, '6M': 118.6, '1Y': 220.7 },
  ARTY: { '1W': 9, '1M': 24.8, '6M': 61.8, '1Y': 110.3 },
  BAI:  { '1W': 2, '1M': 16.9, '6M': 47.7, '1Y': 92.4 },
  IVEP: { '1W': 1.7, '1M': -0.2, '6M': 10, '1Y': 10 },
  IGPT: { '1W': 1.7, '1M': 26.7, '6M': 73.2, '1Y': 120.8 },
  IVES: { '1W': 3.5, '1M': 18.6, '6M': 24.5, '1Y': 58.9 },
  ALAI: { '1W': 1.8, '1M': 13.3, '6M': 24.5, '1Y': 61 },
  CHAT: { '1W': 4.4, '1M': 25.8, '6M': 65.7, '1Y': 133.6 },
  AIFD: { '1W': 8.4, '1M': 17.8, '6M': 50.5, '1Y': 99 },
  SPRX: { '1W': 1.7, '1M': 31.5, '6M': 42.2, '1Y': 106.4 },
  AOTG: { '1W': 5.4, '1M': 15.7, '6M': 18.6, '1Y': 42.3 },
  // Semiconductors
  SOXX: { '1W': 5.8, '1M': 30.5, '6M': 94.8, '1Y': 182.2 },
  PSI:  { '1W': 1.7, '1M': 19.2, '6M': 101, '1Y': 203.5 },
  XSD:  { '1W': 1.1, '1M': 28.4, '6M': 89, '1Y': 174.2 },
  DRAM: { '1W': 8.7, '1M': 60.1, '6M': 144.9, '1Y': 144.9 },
  // Broad Tech
  PTF:  { '1W': 4, '1M': 18.6, '6M': 74.3, '1Y': 108.3 },
  WCLD: { '1W': 8.4, '1M': 12.1, '6M': -5.1, '1Y': -9.2 },
  IGV:  { '1W': 5.1, '1M': 13.7, '6M': -5.8, '1Y': -4.2 },
  FDTX: { '1W': 7.7, '1M': 21.8, '6M': 40.8, '1Y': 59 },
  GTEK: { '1W': 4.2, '1M': 16.8, '6M': 55.3, '1Y': 83.3 },
  ARKK: { '1W': -3.8, '1M': -0.4, '6M': -3.5, '1Y': 34.4 },
  MARS: { '1W': -18.1, '1M': 22.3, '6M': 50.8, '1Y': 50.8 },
  FRWD: { '1W': 6.2, '1M': 18.8, '6M': 35.9, '1Y': 35.9 },
  BCTK: { '1W': 4.2, '1M': 14.8, '6M': 29.3, '1Y': 29.3 },
  FWD:  { '1W': 2.6, '1M': 13.3, '6M': 38.6, '1Y': 74.4 },
  CBSE: { '1W': 4.8, '1M': 12.4, '6M': 31.1, '1Y': 53.2 },
  FCUS: { '1W': 4.8, '1M': 10.5, '6M': 45.6, '1Y': 87.6 },
  WGMI: { '1W': 2.6, '1M': 40.8, '6M': 56.3, '1Y': 296.7 },
  // Electrification
  POW:  { '1W': -1.4, '1M': -1.5, '6M': 57.5, '1Y': 53.8 },
  VOLT: { '1W': 0.3, '1M': -2.8, '6M': 33.4, '1Y': 64.2 },
  PBD:  { '1W': -0.1, '1M': 6.9, '6M': 39.9, '1Y': 88.5 },
  PBW:  { '1W': -0.5, '1M': 18.9, '6M': 47.2, '1Y': 150.4 },
  // Industrials
  AIRR: { '1W': -1.8, '1M': 2.2, '6M': 29.8, '1Y': 63.7 },
  PRN:  { '1W': -1.1, '1M': 5.8, '6M': 44, '1Y': 63.2 },
  RSHO: { '1W': 2.2, '1M': 6.9, '6M': 32.5, '1Y': 56.2 },
  IDEF: { '1W': -5.5, '1M': -1.9, '6M': 10.1, '1Y': 22.6 },
  BILT: { '1W': -1, '1M': -1.2, '6M': 10.6, '1Y': 15.2 },
  // Meme
  BUZZ: { '1W': 1.7, '1M': 17.2, '6M': 19.9, '1Y': 48.5 },
  MEME: { '1W': -4.7, '1M': 27, '6M': 70.5, '1Y': 14.6 },
  RKNG: { '1W': 3.6, '1M': 20.7, '6M': 19.8, '1Y': 19.8 },
};
// @@END_GENERATED:ETF_RETURNS@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 7.12, proScore: 5.82, coverage: 0.818,
      price: 1048.39, weeklyPrices: [923.52, 971.00, 1035.50, 1064.10, 1048.39], weeklyChange: 13.52, sortRank: 0, periodReturns: { '1M': 81.9, '6M': 347.7, '1Y': 925.3 },
      priceHistory: { '1W': [923.52, 971, 1035.5, 1064.1, 1048.39], '1M': [576.45, 640.2, 666.59, 646.63, 746.81, 795.33, 766.58, 803.63, 776.01, 724.66, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1048.39], '6M': [234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1048.39], '1Y': [102.25, 114.14, 120.34, 127.25, 121.74, 123.11, 113.26, 109.83, 114.74, 108.78, 124.27, 117.21, 117.75, 124.21, 150.57, 168.89, 156.83, 183.75, 192.33, 202.53, 198.47, 226.63, 237.5, 244.9, 225.92, 230.26, 226.65, 258.46, 248.55, 284.79, 312.15, 345.87, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1048.39] },
      velocityScore: { '1D': -11.3, '1W': -3.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 49.5, revenueGrowth: 196, eps: 21.18, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { AIS: 8.22, ARTY: 7.48, BAI: 5.99, IVEP: false, IGPT: 12.64, IVES: 5.88, ALAI: 1.16, CHAT: 6.32, AIFD: 6.46, SPRX: false, AOTG: 9.91 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 10, avgWeight: 6.17, proScore: 5.61, coverage: 0.909,
      price: 217.65, weeklyPrices: [214.25, 211.14, 224.36, 222.82, 217.65], weeklyChange: 1.59, sortRank: 0, periodReturns: { '1M': 9.7, '6M': 21.2, '1Y': 54.1 },
      priceHistory: { '1W': [214.25, 211.14, 224.36, 222.82, 217.65], '1M': [198.48, 196.5, 207.83, 211.5, 215.2, 219.44, 220.78, 225.83, 235.74, 225.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 217.65], '6M': [179.59, 183.78, 170.94, 188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 217.65], '1Y': [141.22, 143.96, 144.12, 154.31, 157.25, 164.1, 173, 170.78, 179.27, 179.42, 181.59, 175.4, 181.6, 171.66, 177.17, 176.24, 177.69, 188.89, 192.57, 181.81, 180.28, 207.04, 195.21, 193.8, 186.52, 180.26, 183.38, 180.93, 174.14, 190.53, 188.12, 184.94, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 217.65] },
      velocityScore: { '1D': -4.9, '1W': 2.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.3T', pe: 33.3, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.45,
      etfPresence: { AIS: 2.5, ARTY: 3.45, BAI: 4.51, IVEP: false, IGPT: 5.86, IVES: 4.62, ALAI: 13.38, CHAT: 5.84, AIFD: 6.74, SPRX: 3.99, AOTG: 10.84 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.56, proScore: 4.55, coverage: 0.818,
      price: 530.09, weeklyPrices: [518.09, 516.10, 510.13, 521.54, 530.09], weeklyChange: 2.32, sortRank: 0, periodReturns: { '1M': 55.2, '6M': 143.6, '1Y': 351.9 },
      priceHistory: { '1W': [518.09, 516.1, 510.13, 521.54, 530.09], '1M': [341.54, 355.26, 421.39, 408.46, 455.19, 458.79, 448.29, 445.5, 449.7, 424.1, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 530.09], '6M': [217.6, 221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 530.09], '1Y': [117.31, 123.24, 127.1, 143.4, 138.52, 144.16, 160.41, 158.65, 179.51, 163.12, 184.42, 165.2, 167.13, 161.79, 155.67, 157.92, 161.27, 169.73, 232.89, 234.56, 230.23, 264.33, 256.33, 258.89, 223.55, 214.24, 215.98, 221.43, 201.06, 214.99, 221.08, 207.69, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 530.09] },
      velocityScore: { '1D': -15.4, '1W': -13.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$864B', pe: 175.5, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 4.46, ARTY: 7.03, BAI: 4.92, IVEP: false, IGPT: 7.14, IVES: 4.61, ALAI: 1.05, CHAT: 5.51, AIFD: false, SPRX: 0.54, AOTG: 14.82 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.92, proScore: 2.85, coverage: 0.727,
      price: 475.55, weeklyPrices: [426.58, 446.77, 459.97, 481.57, 475.55], weeklyChange: 11.48, sortRank: 0, periodReturns: { '1M': 14.2, '6M': 24.9, '1Y': 85.1 },
      priceHistory: { '1W': [426.58, 446.77, 459.97, 481.57, 475.55], '1M': [416.5, 427.36, 425.44, 412.56, 430, 428.43, 419.3, 416.79, 439.79, 425.19, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 475.55], '6M': [380.61, 412.97, 326.02, 350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 475.55], '1Y': [256.85, 244.63, 249.37, 264.65, 269.9, 275.4, 286.45, 283.69, 302.62, 301.67, 309.09, 291.17, 300.25, 306.1, 359.63, 345.35, 336.1, 338.18, 345.02, 354.15, 340.3, 385.98, 358.98, 355.22, 354.42, 397.57, 381.03, 406.37, 329.88, 352.13, 343.42, 352.21, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 475.55] },
      velocityScore: { '1D': -12.6, '1W': -11.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 92.3, revenueGrowth: 30, eps: 5.15, grossMargin: 77, dividendYield: 0.54,
      etfPresence: { AIS: 0.79, ARTY: 3.85, BAI: 5.63, IVEP: false, IGPT: false, IVES: 4.98, ALAI: 4.94, CHAT: 3.37, AIFD: 6.14, SPRX: false, AOTG: 1.68 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 6, avgWeight: 4.65, proScore: 2.53, coverage: 0.545,
      price: 438.28, weeklyPrices: [424.86, 418.45, 435.63, 446.69, 438.28], weeklyChange: 3.16, sortRank: 0, periodReturns: { '1M': 9.1, '6M': 48.3, '1Y': 121.8 },
      priceHistory: { '1W': [424.86, 418.45, 435.63, 446.69, 438.28], '1M': [401.61, 394.41, 419.5, 414.15, 411.68, 404.54, 397.28, 399.8, 417.72, 404.35, 392.61, 401.62, 407.15, 404.52, 412.32, 422.73, 424.86, 418.45, 435.63, 446.69, 438.28], '6M': [295.45, 310.14, 276.96, 298.8, 319.61, 323.63, 342.4, 332.71, 341.36, 355.41, 364.2, 385.75, 353.13, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 392.61, 422.73, 438.28], '1Y': [197.61, 212.46, 213.9, 222.74, 233.6, 229.76, 245.6, 240.33, 242.91, 231.37, 241.44, 228.6, 239.29, 235.21, 258.91, 268.64, 276.66, 288.11, 299.88, 299.84, 288.88, 305.09, 293.64, 290.62, 282.37, 289.96, 292.93, 304.85, 284.68, 302.84, 322.25, 331.77, 342.4, 332.71, 341.36, 355.41, 364.2, 385.75, 353.13, 347.09, 345.98, 343.25, 337.95, 365.9, 375.1, 368.08, 392.34, 394.41, 397.28, 392.61, 422.73, 438.28] },
      velocityScore: { '1D': -24.9, '1W': -16.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 37.5, revenueGrowth: 35, eps: 11.7, grossMargin: 62, dividendYield: 0.85,
      etfPresence: { AIS: 3.16, ARTY: false, BAI: 4.34, IVEP: false, IGPT: false, IVES: 4.74, ALAI: 5.56, CHAT: false, AIFD: 3.2, SPRX: false, AOTG: 6.88 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 4.54, proScore: 2.48, coverage: 0.545,
      price: 364.06, weeklyPrices: [390.13, 380.34, 376.37, 361.85, 364.06], weeklyChange: -6.68, sortRank: 0, periodReturns: { '1M': -5, '6M': 13.9, '1Y': 119.1 },
      priceHistory: { '1W': [390.13, 380.34, 376.37, 361.85, 364.06], '1M': [383.25, 388.43, 398.04, 397.99, 400.8, 388.64, 387.35, 402.62, 401.07, 396.78, 387.66, 388.91, 387.66, 382.97, 388.88, 388.83, 390.13, 380.34, 376.37, 361.85, 364.06], '6M': [319.63, 320.21, 296.72, 314.09, 315.15, 328.57, 330, 333.26, 343.69, 324.32, 302.02, 310.9, 303.58, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 387.35, 387.66, 388.83, 364.06], '1Y': [166.18, 178.6, 175.95, 170.68, 178.64, 177.62, 183.58, 190.23, 196.53, 196.09, 201.96, 199.32, 207.48, 232.3, 240.37, 252.03, 245.79, 245.69, 241.53, 251.46, 251.69, 274.57, 284.31, 286.71, 292.81, 319.95, 317.62, 312.43, 302.46, 313.51, 316.54, 331.86, 330, 333.26, 343.69, 324.32, 302.02, 310.9, 303.58, 307.04, 310.92, 290.44, 287.56, 317.32, 337.12, 332.29, 349.78, 388.43, 387.35, 387.66, 388.83, 364.06] },
      velocityScore: { '1D': -29.5, '1W': -33.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.8, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.37, IVEP: false, IGPT: 5.74, IVES: 4.07, ALAI: false, CHAT: 5.07, AIFD: 5.02, SPRX: false, AOTG: 3.97 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 6, avgWeight: 4.05, proScore: 2.21, coverage: 0.545,
      price: 298.29, weeklyPrices: [204.83, 205.00, 219.43, 290.79, 298.29], weeklyChange: 45.63, sortRank: 0, periodReturns: { '1M': 82.3, '6M': 197.7, '1Y': 378.3 },
      priceHistory: { '1W': [204.83, 205, 219.43, 290.79, 298.29], '1M': [163.66, 168.75, 172.15, 160.01, 170.13, 170.84, 164.5, 177.95, 182.58, 176.89, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 204.83, 205, 219.43, 290.79, 298.29], '6M': [100.2, 92.47, 81.7, 86.49, 89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 77.51, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 198.7, 298.29], '1Y': [62.36, 68.84, 69.99, 75.93, 74.25, 73.36, 72.01, 73.27, 81.74, 75.32, 79.32, 71.22, 74.79, 64.1, 66.59, 74.23, 83.81, 86.2, 90.68, 88.23, 81.05, 90.15, 92.9, 89.33, 81.32, 87.72, 98.19, 89.43, 84.47, 86.34, 90.23, 82.89, 80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 77.51, 93.3, 90.79, 92.36, 99.05, 114.45, 134.6, 151.31, 153.23, 168.75, 164.5, 176.27, 198.7, 298.29] },
      velocityScore: { '1D': -13.3, '1W': -7.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$261B', pe: 102.5, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.08,
      etfPresence: { AIS: 4.37, ARTY: 8.56, BAI: 1.38, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.74, AIFD: 4.95, SPRX: 3.32, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 4.13, proScore: 1.88, coverage: 0.455,
      price: 255.81, weeklyPrices: [274.00, 270.64, 261.26, 256.52, 255.81], weeklyChange: -6.64, sortRank: 0, periodReturns: { '1M': -6, '6M': 10.1, '1Y': 24.4 },
      priceHistory: { '1W': [274, 270.64, 261.26, 256.52, 255.81], '1M': [272.05, 273.55, 274.99, 271.17, 272.68, 268.99, 265.82, 270.13, 267.22, 264.14, 259.34, 265.01, 268.46, 266.32, 265.29, 271.85, 274, 270.64, 261.26, 256.52, 255.81], '6M': [232.38, 231.78, 221.27, 232.38, 226.5, 247.38, 239.12, 238.42, 242.96, 208.72, 201.15, 208.56, 208.73, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 259.34, 271.85, 255.81], '1Y': [205.71, 217.61, 214.82, 211.99, 219.92, 222.26, 223.88, 228.29, 230.19, 222.31, 224.56, 223.81, 229.12, 235.68, 229.95, 231.23, 218.15, 222.41, 227.74, 214.47, 217.95, 230.3, 250.2, 244.2, 222.69, 229.16, 229.11, 230.28, 226.76, 232.52, 233.06, 246.47, 239.12, 238.42, 242.96, 208.72, 201.15, 208.56, 208.73, 214.33, 215.2, 207.24, 208.27, 221.25, 248.5, 249.91, 259.7, 273.55, 265.82, 259.34, 271.85, 255.81] },
      velocityScore: { '1D': -26.8, '1W': -36.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.8T', pe: 31.5, revenueGrowth: 17, eps: 8.11, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 4.17, ALAI: 5.75, CHAT: 3.04, AIFD: 3.57, SPRX: false, AOTG: 4.14 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.75, proScore: 1.71, coverage: 0.455,
      price: 431.94, weeklyPrices: [426.99, 450.24, 460.52, 441.31, 431.94], weeklyChange: 1.16, sortRank: 0, periodReturns: { '1M': 4.4, '6M': -9.6, '1Y': -6.7 },
      priceHistory: { '1W': [426.99, 450.24, 460.52, 441.31, 431.94], '1M': [413.62, 411.38, 413.96, 420.77, 415.12, 412.66, 407.77, 405.21, 409.43, 421.92, 417.42, 421.06, 419.09, 418.57, 416.03, 412.67, 426.99, 450.24, 460.52, 441.31, 431.94], '6M': [477.73, 478.56, 476.12, 488.02, 472.94, 479.28, 459.86, 470.28, 423.37, 413.6, 396.86, 389, 403.93, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 417.42, 412.67, 431.94], '1Y': [462.97, 470.92, 478.04, 492.27, 491.09, 501.48, 511.7, 505.87, 513.24, 524.94, 520.58, 505.72, 506.74, 507.97, 501.01, 508.45, 507.03, 515.74, 522.4, 511.61, 520.54, 541.55, 507.16, 511.14, 487.12, 485.5, 480.84, 483.47, 483.98, 487.71, 472.85, 477.18, 459.86, 470.28, 423.37, 413.6, 396.86, 389, 403.93, 405.76, 399.41, 372.74, 370.17, 374.33, 411.22, 424.16, 429.25, 411.38, 407.77, 417.42, 412.67, 431.94] },
      velocityScore: { '1D': -31.9, '1W': -31.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.2T', pe: 25.8, revenueGrowth: 18, eps: 16.77, grossMargin: 68, dividendYield: 0.82,
      etfPresence: { AIS: false, ARTY: 1.74, BAI: false, IVEP: false, IGPT: false, IVES: 4.6, ALAI: 5.53, CHAT: 2.91, AIFD: false, SPRX: false, AOTG: 3.98 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.3, proScore: 1.5, coverage: 0.455,
      price: 344.01, weeklyPrices: [349.17, 342.85, 320.09, 355.76, 344.01], weeklyChange: -1.48, sortRank: 0, periodReturns: { '1M': 70.9, '6M': 125.6, '1Y': 261.8 },
      priceHistory: { '1W': [349.17, 342.85, 320.09, 355.76, 344.01], '1M': [201.25, 215.69, 213.91, 195.65, 199.79, 207.35, 204.42, 224.09, 228.64, 232.68, 244.26, 287.48, 297.84, 306.88, 318.72, 325.33, 349.17, 342.85, 320.09, 355.76, 344.01], '6M': [152.5, 164.32, 140.24, 169.97, 179.56, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.4, 109.8, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 325.33, 344.01], '1Y': [95.09, 91.46, 92.91, 89.63, 88.57, 97.02, 97.95, 119.48, 128.87, 174.39, 193.64, 172.45, 179.2, 187.95, 232.9, 251.88, 200.64, 209.6, 225.43, 163.55, 154.85, 173.62, 181.94, 157.79, 142.01, 154.22, 152.51, 173.7, 145.88, 167.26, 167.11, 172.57, 182, 163.25, 152.44, 187.67, 123.69, 128.4, 109.8, 116.48, 127.57, 121.76, 109.6, 125.46, 172.09, 191.97, 183.31, 215.69, 204.42, 244.26, 325.33, 344.01] },
      velocityScore: { '1D': -29.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$59B', pe: 230.9, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 1.76, ARTY: 1.58, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 1.76, CHAT: 3.75, AIFD: false, SPRX: 7.66, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 7, avgWeight: 2.35, proScore: 1.49, coverage: 0.636,
      price: 169.15, weeklyPrices: [155.27, 159.47, 170.68, 175.33, 169.15], weeklyChange: 8.94, sortRank: 0, periodReturns: { '1M': -2, '6M': 32.4, '1Y': 79 },
      priceHistory: { '1W': [155.27, 159.47, 170.68, 175.33, 169.15], '1M': [172.62, 170.22, 147.06, 141.75, 141.77, 136.43, 142.54, 140.69, 147.81, 141.97, 141.58, 140.49, 148.59, 154.03, 158.01, 154.31, 155.27, 159.47, 170.68, 175.33, 169.15], '6M': [127.8, 132.36, 122.36, 130.77, 133.6, 122.89, 129.83, 143.72, 138.37, 141.74, 142.58, 128.77, 124.6, 137.17, 135.35, 135.88, 116.13, 133.64, 154.37, 172.86, 165.29, 170.22, 142.54, 141.58, 154.31, 169.15], '1Y': [94.5, 93.7, 89.68, 96.31, 101.13, 106.29, 111.98, 113.04, 122.09, 138.78, 138.01, 131.47, 133.27, 141.17, 153.04, 146.66, 143.06, 144.46, 158.23, 146.01, 146.59, 162.03, 140.42, 134.98, 124.81, 127.65, 128.55, 134.39, 124.62, 131.84, 137.19, 123.42, 129.83, 143.72, 138.37, 141.74, 142.58, 128.77, 124.6, 139.62, 133.07, 130.8, 122.78, 145.07, 154.33, 172.86, 165.29, 170.22, 142.54, 141.58, 154.31, 169.15] },
      velocityScore: { '1D': -18.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$213B', pe: 58.1, revenueGrowth: 35, eps: 2.91, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.44, ARTY: 1.99, BAI: 1.44, IVEP: false, IGPT: false, IVES: false, ALAI: 1.03, CHAT: 2.42, AIFD: 4.93, SPRX: 3.17, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 7 of 11 AI & ML ETFs (64% coverage) with average weight 2.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 3.16, proScore: 1.43, coverage: 0.455,
      price: 608.75, weeklyPrices: [635.29, 632.51, 600.47, 597.63, 608.75], weeklyChange: -4.18, sortRank: 0, periodReturns: { '1M': -0.3, '6M': -4.8, '1Y': -8.7 },
      priceHistory: { '1W': [635.29, 632.51, 600.47, 597.63, 608.75], '1M': [610.41, 604.96, 612.88, 616.81, 609.63, 598.86, 603, 616.63, 618.43, 614.23, 602.61, 605.06, 607.38, 610.26, 612.34, 635.26, 635.29, 632.51, 600.47, 597.63, 608.75], '6M': [639.6, 650.13, 649.5, 667.55, 650.41, 653.06, 620.25, 672.36, 706.41, 677.22, 639.29, 639.3, 655.08, 647.39, 627.45, 604.06, 536.38, 575.05, 662.49, 668.84, 671.34, 604.96, 603, 602.61, 635.26, 608.75], '1Y': [666.85, 702.4, 697.23, 708.68, 713.57, 727.24, 701.41, 713.58, 695.21, 771.99, 780.08, 747.72, 747.38, 748.65, 750.9, 780.25, 748.91, 727.05, 733.51, 712.07, 733.41, 751.67, 635.95, 609.01, 590.32, 633.61, 661.53, 652.71, 664.45, 663.29, 658.79, 641.97, 620.25, 672.36, 706.41, 677.22, 639.29, 639.3, 655.08, 654.07, 622.66, 592.92, 572.13, 612.42, 671.58, 668.84, 671.34, 604.96, 603, 602.61, 635.26, 608.75] },
      velocityScore: { '1D': -29.9, '1W': -46.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 22.1, revenueGrowth: 33, eps: 27.49, grossMargin: 82, dividendYield: 0.35,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: 4.51, IVES: 4.13, ALAI: 3.85, CHAT: 2.19, AIFD: false, SPRX: false, AOTG: 1.1 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'ARM', name: 'ARM Holdings PLC', easyScore: 4, avgWeight: 3.78, proScore: 1.37, coverage: 0.364,
      price: 377.58, weeklyPrices: [335.27, 353.29, 408.85, 402.71, 377.58], weeklyChange: 12.62, sortRank: 0, periodReturns: { '1M': 85.8, '6M': 171.3, '1Y': 193.2 },
      priceHistory: { '1W': [335.27, 353.29, 408.85, 402.71, 377.58], '1M': [203.26, 208.84, 237.3, 213.31, 213.27, 212.65, 207.92, 221.21, 228.5, 209.16, 223.15, 256.73, 298.23, 306.51, 321.22, 302.71, 335.27, 353.29, 408.85, 402.71, 377.58], '6M': [139.19, 141.52, 114.58, 111.55, 114.73, 111.79, 105.78, 114.73, 106.93, 124.61, 126.89, 128.14, 121.72, 117.63, 121.7, 136.89, 136.96, 143.86, 161.22, 175.49, 198.65, 208.84, 207.92, 223.15, 302.71, 377.58], '1Y': [128.78, 140.63, 144.72, 157.31, 154.63, 148.55, 157.18, 159.28, 163.32, 136.12, 141.6, 131.16, 140.66, 135.48, 154.7, 146.54, 140.65, 152.15, 170.66, 171.19, 165.71, 170.39, 160.19, 148.75, 136.99, 132.61, 140.49, 136.14, 113.51, 110.27, 116.11, 111.14, 105.78, 114.73, 106.93, 124.61, 126.89, 128.14, 121.72, 120.55, 127.31, 134.96, 151.28, 148.91, 159.34, 175.49, 198.65, 208.84, 207.92, 223.15, 302.71, 377.58] },
      velocityScore: { '1D': -38.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$403B', pe: 444.2, revenueGrowth: 20, eps: 0.85, grossMargin: 98, dividendYield: null,
      etfPresence: { AIS: 2.29, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: false, ALAI: 0.62, CHAT: 4.54, AIFD: false, SPRX: 7.67, AOTG: false },
      tonyNote: 'Arm Holdings is held across Broad Tech and AI ETFs as the CPU architecture licensor embedded in every mobile device and increasingly in AI inference chips and data center CPUs. Revenue grew and the royalty model is high-margin; the weight score reflects consistent institutional positioning as the AI chip design ecosystem expands on Arm cores.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 5, avgWeight: 2.97, proScore: 1.35, coverage: 0.455,
      price: 329.73, weeklyPrices: [314.18, 315.71, 323.39, 334.49, 329.73], weeklyChange: 4.95, sortRank: 0, periodReturns: { '1M': -0.4, '6M': 84.3, '1Y': 193.5 },
      priceHistory: { '1W': [314.18, 315.71, 323.39, 334.49, 329.73], '1M': [330.97, 341.02, 358.92, 340.01, 339.97, 367.92, 367.13, 369.99, 376.23, 370.94, 322.63, 315.67, 323.4, 327.46, 323.91, 319.78, 314.18, 315.71, 323.39, 334.49, 329.73], '6M': [178.88, 181.82, 149.83, 166.87, 175.61, 163.58, 176.93, 181.23, 190.01, 202, 243.53, 253.15, 244.44, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 322.63, 319.78, 329.73], '1Y': [112.34, 108.47, 116.61, 121.64, 124.33, 120.72, 131.12, 130.19, 144.17, 139.75, 137.4, 127.54, 129.31, 125.7, 135.71, 141.96, 139.77, 161.64, 168.88, 177.82, 171.59, 199.27, 190.71, 173.37, 170.65, 172.02, 182.54, 178.66, 154.39, 167.58, 173.95, 170.03, 176.93, 181.23, 190.01, 202, 243.53, 253.15, 244.44, 270.06, 268.41, 270.89, 250.58, 281.03, 301.16, 312.44, 305.03, 341.02, 367.13, 322.63, 319.78, 329.73] },
      velocityScore: { '1D': -32.8, '1W': -29.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$127B', pe: 82.8, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.07,
      etfPresence: { AIS: 3.75, ARTY: false, BAI: 2, IVEP: 4.22, IGPT: false, IVES: false, ALAI: false, CHAT: 0.85, AIFD: 4.03, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'COHR', name: 'Coherent Corp', easyScore: 4, avgWeight: 3.7, proScore: 1.35, coverage: 0.364,
      price: 412.16, weeklyPrices: [376.95, 361.47, 362.90, 426.89, 412.16], weeklyChange: 9.34, sortRank: 0, periodReturns: { '1M': 24.9, '6M': 141.1, '1Y': 412 },
      priceHistory: { '1W': [376.95, 361.47, 362.9, 426.89, 412.16], '1M': [329.89, 335.73, 344.67, 319.19, 335.26, 379.69, 374.01, 403.71, 404.94, 382.45, 353.63, 358.5, 378, 377.57, 381.35, 380.18, 376.95, 361.47, 362.9, 426.89, 412.16], '6M': [170.96, 197.45, 170.44, 191.37, 194.33, 178.06, 191.04, 197.76, 222.44, 242.46, 219.96, 254.86, 280.81, 252.32, 247.37, 255.05, 219.65, 255.1, 313.42, 343.79, 303.97, 335.73, 374.01, 353.63, 380.18, 412.16], '1Y': [80.5, 82.02, 79.77, 85.63, 88.36, 93.72, 100.28, 98.43, 107.23, 107.15, 114.01, 86.55, 90.71, 95.62, 103.51, 108.05, 106.57, 112.79, 122.35, 115.96, 115.37, 138.06, 134.63, 156.67, 142.94, 154, 177.35, 198.5, 175.71, 191.72, 186.36, 185.18, 191.04, 197.76, 222.44, 242.46, 219.96, 254.86, 280.81, 260.64, 245.8, 272.33, 238.21, 281.79, 308.2, 343.79, 303.97, 335.73, 374.01, 353.63, 380.18, 412.16] },
      velocityScore: { '1D': -36.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$81B', pe: 197.2, revenueGrowth: 21, eps: 2.09, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 0.99, ARTY: false, BAI: false, IVEP: 4.34, IGPT: false, IVES: false, ALAI: false, CHAT: 1.01, AIFD: false, SPRX: 8.46, AOTG: false },
      tonyNote: 'Coherent Corp appears in 4 of 11 AI & ML ETFs (36% coverage) with average weight 3.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 4, avgWeight: 3.52, proScore: 1.28, coverage: 0.364,
      price: 230.75, weeklyPrices: [203.70, 225.78, 248.15, 244.58, 230.75], weeklyChange: 13.28, sortRank: 0, periodReturns: { '1M': 28, '6M': 11.1, '1Y': 36.4 },
      priceHistory: { '1W': [203.7, 225.78, 248.15, 244.58, 230.75], '1M': [180.29, 185.35, 194.03, 194.59, 195.95, 193.84, 186.83, 189.76, 195.61, 192.95, 181.46, 188.16, 189.77, 192.08, 193.06, 190.96, 203.7, 225.78, 248.15, 244.58, 230.75], '6M': [207.73, 223.01, 178.46, 197.49, 195.71, 198.52, 191.09, 182.44, 160.06, 156.59, 153.97, 146.14, 149.01, 151.56, 155.97, 154.34, 138.8, 143.17, 163, 181.17, 165.96, 185.35, 186.83, 181.46, 190.96, 230.75], '1Y': [169.14, 177.48, 208.18, 210.72, 229.98, 235, 248.75, 241.9, 250.6, 256.43, 244.18, 235.06, 235.81, 223, 307.86, 296.62, 291.33, 288.78, 296.96, 313, 272.66, 275.3, 250.31, 226.99, 225.53, 204.96, 214.33, 198.85, 180.03, 197.99, 192.59, 204.68, 191.09, 182.44, 160.06, 156.59, 153.97, 146.14, 149.01, 149.4, 154.69, 147.09, 147.11, 143.66, 169.81, 181.17, 165.96, 185.35, 186.83, 181.46, 190.96, 230.75] },
      velocityScore: { '1D': -30.4, '1W': -30.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$664B', pe: 41.4, revenueGrowth: 22, eps: 5.58, grossMargin: 67, dividendYield: 0.82,
      etfPresence: { AIS: false, ARTY: 4.41, BAI: false, IVEP: false, IGPT: false, IVES: 4.42, ALAI: false, CHAT: 1.73, AIFD: false, SPRX: false, AOTG: 3.51 },
      tonyNote: 'Oracle lands in 3 AI ETFs on the strength of its cloud database and AI infrastructure contracts. Revenue grew 22%, 67% gross margin, P/E of 40x. The 17.5% weekly return following a major earnings beat shows how quickly sentiment can reprice; the weight score at 2.04% is still modest, meaning ETF managers have started building positions but conviction is not yet deep.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 4, avgWeight: 3.41, proScore: 1.24, coverage: 0.364,
      price: 969.59, weeklyPrices: [860.62, 854.96, 905.00, 1029.15, 969.59], weeklyChange: 12.66, sortRank: 0, periodReturns: { '1M': -0.7, '6M': 220, '1Y': 1148.7 },
      priceHistory: { '1W': [860.62, 854.96, 905, 1029.15, 969.59], '1M': [976.18, 994.56, 944.28, 892.58, 903.8, 1053.09, 992.37, 1030.37, 1001.81, 970.7, 890.09, 868.07, 964.5, 946.9, 910.81, 902.31, 860.62, 854.96, 905, 1029.15, 969.59], '6M': [302.98, 366, 320.25, 395.92, 386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 600.42, 688.27, 694.43, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 890.09, 902.31, 969.59], '1Y': [77.65, 81.96, 86.35, 91.77, 91.24, 92.62, 102.64, 102.13, 109.85, 110.01, 120.23, 115.89, 125.84, 141.91, 164.88, 171.5, 159.11, 169.75, 159.76, 163.23, 158.06, 214.28, 232.75, 253.81, 268.92, 308.28, 327.85, 372.09, 337.13, 390.77, 357.05, 339.87, 324.25, 332.45, 423.42, 577.15, 600.42, 688.27, 694.43, 672, 649.56, 801.99, 702.76, 896.02, 824.01, 836.92, 791.37, 994.56, 992.37, 890.09, 902.31, 969.59] },
      velocityScore: { '1D': -36.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$75B', pe: 171.3, revenueGrowth: 90, eps: 5.66, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.14, IVEP: false, IGPT: false, IVES: false, ALAI: false, CHAT: 1.13, AIFD: 5.95, SPRX: 3.44, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 4 of 11 AI & ML ETFs (36% coverage) with average weight 3.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 5, avgWeight: 2.52, proScore: 1.14, coverage: 0.455,
      price: 586.86, weeklyPrices: [531.18, 531.21, 546.20, 563.10, 586.86], weeklyChange: 10.48, sortRank: 0, periodReturns: { '1M': 32.7, '6M': 277.2, '1Y': 991.4 },
      priceHistory: { '1W': [531.18, 531.21, 546.2, 563.1, 586.86], '1M': [442.36, 465.26, 483.15, 463.91, 480, 515.83, 488.74, 494.09, 489.15, 482.02, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 586.86], '6M': [155.59, 181.95, 166.26, 179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 586.86], '1Y': [53.77, 55.95, 58.57, 62.55, 65.78, 65.06, 67.02, 69.32, 71.43, 73.78, 76.07, 75.64, 80.67, 90.49, 96.15, 105.15, 107.21, 131.26, 119.7, 125.92, 120.47, 141.38, 160.1, 166.11, 153.97, 157.74, 161, 187.2, 175.01, 181.54, 187.88, 212.14, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 586.86] },
      velocityScore: { '1D': null, '1W': -43, '1M': null, '6M': null }, isNew: true,
      marketCap: '$202B', pe: 35.1, revenueGrowth: 46, eps: 16.72, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { AIS: 1.5, ARTY: 2.58, BAI: 2.88, IVEP: false, IGPT: false, IVES: false, ALAI: 4.5, CHAT: 1.13, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'NBIS', name: 'NEBIUS GROUP NV', easyScore: 4, avgWeight: 2.95, proScore: 1.07, coverage: 0.364,
      price: 250.22, weeklyPrices: [226.34, 231.09, 264.51, 260.58, 250.22], weeklyChange: 10.55, sortRank: 0, periodReturns: { '1M': 41.8, '6M': 153, '1Y': 571.4 },
      priceHistory: { '1W': [226.34, 231.09, 264.51, 260.58, 250.22], '1M': [176.42, 175.92, 195.09, 184.77, 177.05, 186.1, 179.11, 207.27, 221.15, 219.94, 197.73, 191.82, 219.93, 214.77, 208.06, 208.37, 226.34, 231.09, 264.51, 260.58, 250.22], '6M': [98.92, 93.59, 75.45, 91.13, 89.95, 97.93, 108.73, 91.46, 88.16, 92.88, 97.52, 102.58, 86.8, 94.94, 129.85, 114.15, 92.26, 117.4, 161.94, 156.55, 135.51, 175.92, 179.11, 197.73, 208.37, 250.22], '1Y': [37.27, 52.51, 48.33, 48.52, 49.97, 46.43, 53.69, 51.88, 51.29, 55.09, 70.63, 67.47, 70.1, 64.91, 89.19, 94.12, 107.94, 125.87, 132.64, 123.04, 98.62, 125.1, 117, 94.36, 95.07, 94.69, 102.8, 94.28, 78.09, 87.59, 92.83, 107.33, 108.73, 91.46, 88.16, 92.88, 97.52, 102.58, 86.8, 96.43, 116.33, 114.91, 103.76, 125, 166.77, 156.55, 135.51, 175.92, 179.11, 197.73, 208.37, 250.22] },
      velocityScore: { '1D': -43.7, '1W': -44.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$64B', pe: 97, revenueGrowth: 684, eps: 2.58, grossMargin: 72, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IVEP: false, IGPT: false, IVES: 2.53, ALAI: 4.5, CHAT: 2.93, AIFD: 1.85, SPRX: false, AOTG: false },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 3, avgWeight: 3.84, proScore: 1.05, coverage: 0.273,
      price: 113.41, weeklyPrices: [120.89, 114.68, 109.33, 107.93, 113.41], weeklyChange: -6.19, sortRank: 0, periodReturns: { '1M': 18.4, '6M': 159.2, '1Y': 458.9 },
      priceHistory: { '1W': [120.89, 114.68, 109.33, 107.93, 113.41], '1M': [95.78, 108.15, 113.01, 109.62, 124.92, 129.44, 120.61, 120.29, 115.93, 108.77, 110.8, 118.96, 118.5, 119.84, 123.52, 121.77, 120.89, 114.68, 109.33, 107.93, 113.41], '6M': [43.76, 40.78, 36.05, 36.16, 39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 46.12, 43.1, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 121.77, 113.41], '1Y': [20.29, 22.08, 20.8, 22.2, 21.88, 23.82, 22.8, 23.49, 20.34, 20.41, 22.22, 23.54, 24.85, 24.61, 24.61, 30.57, 33.99, 37.3, 37.8, 36.84, 36.92, 41.34, 38.38, 37.89, 35.11, 36.81, 40.5, 39.51, 36.28, 36.2, 39.37, 44.06, 46.96, 42.49, 48.81, 50.24, 46.18, 46.12, 43.1, 46.78, 44.06, 44.06, 44.13, 58.95, 64.94, 66.26, 84.52, 108.15, 120.61, 110.8, 121.77, 113.41] },
      velocityScore: { '1D': -49.3, '1W': -63.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$570B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 2.8, ARTY: false, BAI: 2.58, IVEP: false, IGPT: 6.15, IVES: false, ALAI: false, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 6.99, proScore: 6.99, coverage: 1,
      price: 1048.39, weeklyPrices: [923.52, 971.00, 1035.50, 1064.10, 1048.39], weeklyChange: 13.52, sortRank: 0, periodReturns: { '1M': 81.9, '6M': 347.7, '1Y': 925.3 },
      priceHistory: { '1W': [923.52, 971, 1035.5, 1064.1, 1048.39], '1M': [576.45, 640.2, 666.59, 646.63, 746.81, 795.33, 766.58, 803.63, 776.01, 724.66, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1048.39], '6M': [234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1048.39], '1Y': [102.25, 114.14, 120.34, 127.25, 121.74, 123.11, 113.26, 109.83, 114.74, 108.78, 124.27, 117.21, 117.75, 124.21, 150.57, 168.89, 156.83, 183.75, 192.33, 202.53, 198.47, 226.63, 237.5, 244.9, 225.92, 230.26, 226.65, 258.46, 248.55, 284.79, 312.15, 345.87, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1048.39] },
      velocityScore: { '1D': -3.2, '1W': 8.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 49.5, revenueGrowth: 196, eps: 21.18, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { SOXX: 11.97, PSI: 7.97, XSD: 3.62, DRAM: 4.4 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 6.75, proScore: 5.06, coverage: 0.75,
      price: 530.09, weeklyPrices: [518.09, 516.10, 510.13, 521.54, 530.09], weeklyChange: 2.32, sortRank: 0, periodReturns: { '1M': 55.2, '6M': 143.6, '1Y': 351.9 },
      priceHistory: { '1W': [518.09, 516.1, 510.13, 521.54, 530.09], '1M': [341.54, 355.26, 421.39, 408.46, 455.19, 458.79, 448.29, 445.5, 449.7, 424.1, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 530.09], '6M': [217.6, 221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 530.09], '1Y': [117.31, 123.24, 127.1, 143.4, 138.52, 144.16, 160.41, 158.65, 179.51, 163.12, 184.42, 165.2, 167.13, 161.79, 155.67, 157.92, 161.27, 169.73, 232.89, 234.56, 230.23, 264.33, 256.33, 258.89, 223.55, 214.24, 215.98, 221.43, 201.06, 214.99, 221.08, 207.69, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 530.09] },
      velocityScore: { '1D': -16.2, '1W': -13.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$864B', pe: 175.5, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 9.01, PSI: 7.62, XSD: 3.62, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'MXL', name: 'MaxLinear Inc', easyScore: 2, avgWeight: 7, proScore: 3.5, coverage: 0.5,
      price: 94.53, weeklyPrices: [97.76, 92.93, 86.23, 88.76, 94.53], weeklyChange: -3.3, sortRank: 0, periodReturns: { '1M': 21, '6M': 427.2, '1Y': 684.5 },
      priceHistory: { '1W': [97.76, 92.93, 86.23, 88.76, 94.53], '1M': [78.12, 81.68, 81.23, 82.37, 99.83, 102.27, 91.93, 87.73, 88.78, 92.34, 94.86, 96.77, 99.67, 99.16, 96.12, 101.1, 97.76, 92.93, 86.23, 88.76, 94.53], '6M': [17.93, 19.61, 16.98, 17.54, 18.51, 19, 19.3, 18.4, 17.64, 19.01, 19.82, 18.25, 17.29, 15.94, 17.32, 17.14, 16.08, 18.41, 21.56, 33.7, 52.01, 81.68, 91.93, 94.86, 101.1, 94.53], '1Y': [12.05, 12.57, 12.76, 13.71, 14.57, 15.13, 15.59, 15.32, 16.99, 15.2, 15.98, 14.27, 16.74, 15.55, 16.04, 16.7, 15.96, 16.2, 15.96, 17.47, 16.78, 15.21, 15.17, 14.88, 13.41, 15.44, 18.31, 18.57, 17.32, 17.73, 18.13, 18.42, 19.3, 18.4, 17.64, 19.01, 19.82, 18.25, 17.29, 16.2, 16.81, 17.64, 17.39, 19.14, 22.01, 33.7, 52.01, 81.68, 91.93, 94.86, 101.1, 94.53] },
      velocityScore: { '1D': -31.1, '1W': -34.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$8B', pe: null, revenueGrowth: 43, eps: -1.52, grossMargin: 57, dividendYield: null,
      etfPresence: { SOXX: false, PSI: 8.3, XSD: 5.71, DRAM: false },
      tonyNote: 'MaxLinear holds the highest average weight in the Semiconductor theme at 7.71% across 2 ETFs. Revenue grew 43%, 57% gross margin, but EPS is negative at -$1.52 and the market cap is only $8B. The 716% 1-year return is an extreme recovery from the 2023 inventory correction lows; the two ETFs holding it are making a concentrated bet on a return to profitability in the analog semiconductor cycle.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 3, avgWeight: 4.54, proScore: 3.4, coverage: 0.75,
      price: 475.55, weeklyPrices: [426.58, 446.77, 459.97, 481.57, 475.55], weeklyChange: 11.48, sortRank: 0, periodReturns: { '1M': 14.2, '6M': 24.9, '1Y': 85.1 },
      priceHistory: { '1W': [426.58, 446.77, 459.97, 481.57, 475.55], '1M': [416.5, 427.36, 425.44, 412.56, 430, 428.43, 419.3, 416.79, 439.79, 425.19, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 475.55], '6M': [380.61, 412.97, 326.02, 350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 475.55], '1Y': [256.85, 244.63, 249.37, 264.65, 269.9, 275.4, 286.45, 283.69, 302.62, 301.67, 309.09, 291.17, 300.25, 306.1, 359.63, 345.35, 336.1, 338.18, 345.02, 354.15, 340.3, 385.98, 358.98, 355.22, 354.42, 397.57, 381.03, 406.37, 329.88, 352.13, 343.42, 352.21, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 475.55] },
      velocityScore: { '1D': -14.4, '1W': -4.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 92.3, revenueGrowth: 30, eps: 5.15, grossMargin: 77, dividendYield: 0.54,
      etfPresence: { SOXX: 6.99, PSI: 4.62, XSD: 2.01, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 6.42, proScore: 3.21, coverage: 0.5,
      price: 298.29, weeklyPrices: [204.83, 205.00, 219.43, 290.79, 298.29], weeklyChange: 45.63, sortRank: 0, periodReturns: { '1M': 82.3, '6M': 197.7, '1Y': 378.3 },
      priceHistory: { '1W': [204.83, 205, 219.43, 290.79, 298.29], '1M': [163.66, 168.75, 172.15, 160.01, 170.13, 170.84, 164.5, 177.95, 182.58, 176.89, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 204.83, 205, 219.43, 290.79, 298.29], '6M': [100.2, 92.47, 81.7, 86.49, 89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 77.51, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 198.7, 298.29], '1Y': [62.36, 68.84, 69.99, 75.93, 74.25, 73.36, 72.01, 73.27, 81.74, 75.32, 79.32, 71.22, 74.79, 64.1, 66.59, 74.23, 83.81, 86.2, 90.68, 88.23, 81.05, 90.15, 92.9, 89.33, 81.32, 87.72, 98.19, 89.43, 84.47, 86.34, 90.23, 82.89, 80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 77.51, 93.3, 90.79, 92.36, 99.05, 114.45, 134.6, 151.31, 153.23, 168.75, 164.5, 176.27, 198.7, 298.29] },
      velocityScore: { '1D': -11.6, '1W': -5.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$261B', pe: 102.5, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.08,
      etfPresence: { SOXX: 8.26, PSI: false, XSD: 4.58, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 3.72, proScore: 2.79, coverage: 0.75,
      price: 217.65, weeklyPrices: [214.25, 211.14, 224.36, 222.82, 217.65], weeklyChange: 1.59, sortRank: 0, periodReturns: { '1M': 9.7, '6M': 21.2, '1Y': 54.1 },
      priceHistory: { '1W': [214.25, 211.14, 224.36, 222.82, 217.65], '1M': [198.48, 196.5, 207.83, 211.5, 215.2, 219.44, 220.78, 225.83, 235.74, 225.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 217.65], '6M': [179.59, 183.78, 170.94, 188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 217.65], '1Y': [141.22, 143.96, 144.12, 154.31, 157.25, 164.1, 173, 170.78, 179.27, 179.42, 181.59, 175.4, 181.6, 171.66, 177.17, 176.24, 177.69, 188.89, 192.57, 181.81, 180.28, 207.04, 195.21, 193.8, 186.52, 180.26, 183.38, 180.93, 174.14, 190.53, 188.12, 184.94, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 217.65] },
      velocityScore: { '1D': -18.7, '1W': -13.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.3T', pe: 33.3, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.45,
      etfPresence: { SOXX: 5.83, PSI: 3.61, XSD: 1.71, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 3, avgWeight: 3.37, proScore: 2.53, coverage: 0.75,
      price: 305.01, weeklyPrices: [315.95, 305.68, 293.20, 308.12, 305.01], weeklyChange: -3.46, sortRank: 0, periodReturns: { '1M': 8.6, '6M': 67, '1Y': 62.2 },
      priceHistory: { '1W': [315.95, 305.68, 293.2, 308.12, 305.01], '1M': [280.89, 281, 289.44, 285.24, 287.8, 297.76, 295.17, 306.34, 308.17, 302.73, 302.31, 304.88, 298.39, 309.21, 324.89, 317.45, 315.95, 305.68, 293.2, 308.12, 305.01], '6M': [182.6, 181.67, 174.49, 177.13, 177.52, 190.31, 191.58, 196.59, 225.01, 218.77, 225.69, 213.35, 202.67, 196.2, 194.13, 188.63, 186.42, 199.74, 218.87, 233.15, 265, 281, 295.17, 302.31, 317.45, 305.01], '1Y': [188.08, 202.29, 197.69, 205.38, 215.59, 219.66, 216.59, 186.25, 189.52, 185.91, 193.29, 200.77, 205.47, 187.29, 184.35, 181.62, 182.04, 182.32, 178.96, 175.48, 170.71, 160.26, 163.57, 163.09, 157.09, 165.35, 180.12, 181.67, 176.19, 176.88, 177.17, 189.07, 191.58, 196.59, 225.01, 218.77, 225.69, 213.35, 202.67, 197.46, 194.45, 194.63, 194.14, 208.9, 216.29, 233.15, 265, 281, 295.17, 302.31, 317.45, 305.01] },
      velocityScore: { '1D': -13.7, '1W': -19.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$278B', pe: 52.1, revenueGrowth: 19, eps: 5.85, grossMargin: 57, dividendYield: 1.84,
      etfPresence: { SOXX: 3.37, PSI: 4.52, XSD: 2.21, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 2, avgWeight: 4.35, proScore: 2.17, coverage: 0.5,
      price: 113.41, weeklyPrices: [120.89, 114.68, 109.33, 107.93, 113.41], weeklyChange: -6.19, sortRank: 0, periodReturns: { '1M': 18.4, '6M': 159.2, '1Y': 458.9 },
      priceHistory: { '1W': [120.89, 114.68, 109.33, 107.93, 113.41], '1M': [95.78, 108.15, 113.01, 109.62, 124.92, 129.44, 120.61, 120.29, 115.93, 108.77, 110.8, 118.96, 118.5, 119.84, 123.52, 121.77, 120.89, 114.68, 109.33, 107.93, 113.41], '6M': [43.76, 40.78, 36.05, 36.16, 39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 46.12, 43.1, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 121.77, 113.41], '1Y': [20.29, 22.08, 20.8, 22.2, 21.88, 23.82, 22.8, 23.49, 20.34, 20.41, 22.22, 23.54, 24.85, 24.61, 24.61, 30.57, 33.99, 37.3, 37.8, 36.84, 36.92, 41.34, 38.38, 37.89, 35.11, 36.81, 40.5, 39.51, 36.28, 36.2, 39.37, 44.06, 46.96, 42.49, 48.81, 50.24, 46.18, 46.12, 43.1, 46.78, 44.06, 44.06, 44.13, 58.95, 64.94, 66.26, 84.52, 108.15, 120.61, 110.8, 121.77, 113.41] },
      velocityScore: { '1D': -34.2, '1W': -40.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$570B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 5.49, PSI: false, XSD: 3.21, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 4.3, proScore: 2.15, coverage: 0.5,
      price: 492.44, weeklyPrices: [449.68, 450.06, 458.17, 490.05, 492.44], weeklyChange: 9.51, sortRank: 0, periodReturns: { '1M': 25.8, '6M': 83.3, '1Y': 204.5 },
      priceHistory: { '1W': [449.68, 450.06, 458.17, 490.05, 492.44], '1M': [391.38, 410.82, 428.62, 410.64, 435.44, 443.62, 431.2, 436.61, 440.56, 436.62, 406.91, 426.85, 427.36, 432.16, 454.89, 448.25, 449.68, 450.06, 458.17, 490.05, 492.44], '6M': [268.63, 275.15, 248.27, 260.78, 268.87, 301.18, 327.01, 319.46, 328.4, 330.57, 359.13, 377.93, 351.32, 338.94, 346.18, 361.79, 323.12, 354.31, 395.64, 394.33, 381.11, 410.82, 431.2, 406.91, 448.25, 492.44], '1Y': [161.74, 173.77, 174.09, 183.07, 190.01, 198.03, 192.52, 187.01, 189.39, 178.14, 190.03, 160.96, 164.39, 158.24, 170.15, 189.76, 199.6, 223.59, 220.3, 227.72, 220.56, 235.75, 240.89, 230.73, 235.13, 249.97, 269.44, 270.11, 253.5, 261.9, 284.32, 307.24, 327.01, 319.46, 328.4, 330.57, 359.13, 377.93, 351.32, 345.88, 352.46, 373.99, 341.79, 385.72, 394.26, 394.33, 381.11, 410.82, 431.2, 406.91, 448.25, 492.44] },
      velocityScore: { '1D': -28.6, '1W': -26.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$391B', pe: 46.3, revenueGrowth: 11, eps: 10.63, grossMargin: 49, dividendYield: 0.43,
      etfPresence: { SOXX: 4.55, PSI: 4.06, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 3.8, proScore: 1.9, coverage: 0.5,
      price: 335.27, weeklyPrices: [318.00, 318.18, 317.12, 334.41, 335.27], weeklyChange: 5.43, sortRank: 0, periodReturns: { '1M': 29.7, '6M': 109.9, '1Y': 300.8 },
      priceHistory: { '1W': [318, 318.18, 317.12, 334.41, 335.27], '1M': [258.57, 275.8, 297.17, 286.52, 294.05, 296.05, 289.24, 295.44, 299.15, 284.72, 273.38, 292.09, 302.24, 305.35, 322.68, 318.93, 318, 318.18, 317.12, 334.41, 335.27], '6M': [159.75, 168.26, 154.98, 177.33, 185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.58, 244.25, 217.27, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 273.38, 318.93, 335.27], '1Y': [83.66, 91, 92.66, 96.02, 98.83, 101.06, 100.79, 97.1, 99.09, 95.94, 106.74, 99.15, 103.67, 100.42, 115.58, 126.32, 128.13, 146.99, 141, 142.37, 141.25, 160.67, 165.05, 161.42, 148.8, 155.14, 157.09, 168.71, 164.7, 178.07, 194.76, 220.4, 222.96, 222.87, 237.5, 229.28, 235.58, 244.25, 217.27, 215.23, 226.47, 238.84, 213.66, 246.49, 265.16, 258.37, 251.23, 275.8, 289.24, 273.38, 318.93, 335.27] },
      velocityScore: { '1D': -29.4, '1W': -28.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$419B', pe: 63.5, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.31,
      etfPresence: { SOXX: 3.32, PSI: 4.28, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 3.69, proScore: 1.84, coverage: 0.5,
      price: 2042.92, weeklyPrices: [1927.63, 1921.71, 1940.04, 2045.20, 2042.92], weeklyChange: 5.98, sortRank: 0, periodReturns: { '1M': 19.2, '6M': 68.6, '1Y': 163.3 },
      priceHistory: { '1W': [1927.63, 1921.71, 1940.04, 2045.2, 2042.92], '1M': [1713.32, 1732.9, 1816.29, 1763.25, 1869.19, 1845.19, 1811.35, 1849.71, 1892.94, 1804.32, 1740.58, 1829.47, 1842.18, 1888.38, 2011.39, 1957.19, 1927.63, 1921.71, 1940.04, 2045.2, 2042.92], '6M': [1211.75, 1238.91, 1172.02, 1276.99, 1274.47, 1400, 1567.82, 1543.03, 1410.45, 1440.16, 1470.19, 1506.65, 1441.35, 1429.1, 1438.24, 1511.43, 1382.58, 1548.85, 1795.91, 1785.37, 1808.97, 1732.9, 1811.35, 1740.58, 1957.19, 2042.92], '1Y': [775.79, 856.59, 893, 893.46, 921.1, 928.62, 937.08, 897.09, 924.99, 888.28, 949.48, 878.44, 888.89, 873.29, 959.28, 1046.69, 1059.1, 1139.26, 1053.47, 1098.8, 1114.32, 1235.28, 1227.1, 1198.97, 1167.46, 1159.07, 1208.08, 1246.18, 1222.39, 1279.6, 1352.45, 1428.17, 1567.82, 1543.03, 1410.45, 1440.16, 1470.19, 1506.65, 1441.35, 1452.94, 1481.35, 1566.19, 1472.41, 1672.34, 1748.11, 1785.37, 1808.97, 1732.9, 1811.35, 1740.58, 1957.19, 2042.92] },
      velocityScore: { '1D': -29.5, '1W': -30, '1M': null, '6M': null }, isNew: false,
      marketCap: '$267B', pe: 57.7, revenueGrowth: 12, eps: 35.38, grossMargin: 61, dividendYield: 0.45,
      etfPresence: { SOXX: 3.11, PSI: 4.27, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 3.24, proScore: 1.62, coverage: 0.5,
      price: 238.62, weeklyPrices: [243.29, 251.02, 228.99, 240.84, 238.62], weeklyChange: -1.92, sortRank: 0, periodReturns: { '1M': 41.7, '6M': 36.3, '1Y': 60.2 },
      priceHistory: { '1W': [243.29, 251.02, 228.99, 240.84, 238.62], '1M': [168.38, 186.55, 192.57, 202.55, 219.09, 237.53, 210.31, 213.17, 200.08, 201.49, 195.61, 202.51, 213.41, 238.16, 248.82, 233.4, 243.29, 251.02, 228.99, 240.84, 238.62], '6M': [175.07, 182.21, 172.34, 174.77, 172.98, 177.78, 159.42, 154.52, 152.62, 138.93, 142.63, 144.78, 138.13, 138.11, 129.39, 128.35, 127.07, 124.07, 132.84, 135.56, 150, 186.55, 210.31, 195.61, 233.4, 238.62], '1Y': [148.94, 159.13, 154.46, 155.93, 162.32, 159.09, 152.61, 159.88, 159.06, 145.84, 156.59, 155.44, 159.77, 159.71, 161.51, 168.13, 169.68, 168.85, 165.66, 164.08, 169.27, 178.67, 179.72, 176.67, 166.11, 165.14, 174.35, 181.27, 174.19, 174.81, 176.31, 169.27, 159.42, 154.52, 152.62, 138.93, 142.63, 144.78, 138.13, 135.2, 131.59, 128.67, 128.78, 127.51, 133.05, 135.56, 150, 186.55, 210.31, 195.61, 233.4, 238.62] },
      velocityScore: { '1D': -29.9, '1W': -34.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$252B', pe: 25.7, revenueGrowth: -4, eps: 9.3, grossMargin: 55, dividendYield: 1.53,
      etfPresence: { SOXX: 3.92, PSI: false, XSD: 2.55, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 3.19, proScore: 1.6, coverage: 0.5,
      price: 344.01, weeklyPrices: [349.17, 342.85, 320.09, 355.76, 344.01], weeklyChange: -1.48, sortRank: 0, periodReturns: { '1M': 70.9, '6M': 125.6, '1Y': 261.8 },
      priceHistory: { '1W': [349.17, 342.85, 320.09, 355.76, 344.01], '1M': [201.25, 215.69, 213.91, 195.65, 199.79, 207.35, 204.42, 224.09, 228.64, 232.68, 244.26, 287.48, 297.84, 306.88, 318.72, 325.33, 349.17, 342.85, 320.09, 355.76, 344.01], '6M': [152.5, 164.32, 140.24, 169.97, 179.56, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.4, 109.8, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 325.33, 344.01], '1Y': [95.09, 91.46, 92.91, 89.63, 88.57, 97.02, 97.95, 119.48, 128.87, 174.39, 193.64, 172.45, 179.2, 187.95, 232.9, 251.88, 200.64, 209.6, 225.43, 163.55, 154.85, 173.62, 181.94, 157.79, 142.01, 154.22, 152.51, 173.7, 145.88, 167.26, 167.11, 172.57, 182, 163.25, 152.44, 187.67, 123.69, 128.4, 109.8, 116.48, 127.57, 121.76, 109.6, 125.46, 172.09, 191.97, 183.31, 215.69, 204.42, 244.26, 325.33, 344.01] },
      velocityScore: { '1D': -25.9, '1W': -23.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$59B', pe: 230.9, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.32, PSI: false, XSD: 4.07, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.81, proScore: 1.4, coverage: 0.5,
      price: 323.94, weeklyPrices: [330.28, 321.35, 311.38, 323.62, 323.94], weeklyChange: -1.92, sortRank: 0, periodReturns: { '1M': 11.4, '6M': 42.4, '1Y': 62.8 },
      priceHistory: { '1W': [330.28, 321.35, 311.38, 323.62, 323.94], '1M': [290.76, 292.35, 303.55, 290.22, 294.75, 305.99, 294.23, 298.41, 294.17, 291.5, 294.28, 310.15, 299.38, 316.47, 332.67, 329.24, 330.28, 321.35, 311.38, 323.62, 323.94], '6M': [227.56, 230.78, 223.23, 225.26, 221.28, 241.15, 237.11, 231.05, 231.08, 228.91, 245.09, 234.63, 215.25, 205.25, 191.89, 193.39, 187.39, 195.12, 209.89, 224.5, 230.39, 292.35, 294.23, 294.28, 329.24, 323.94], '1Y': [198.96, 218.72, 212.83, 216.28, 231.15, 233.19, 224.5, 224.71, 220.94, 205.92, 230.52, 228.77, 237.67, 225.39, 223.21, 226.51, 226.81, 227.71, 221.42, 217.41, 217.16, 204.71, 210.44, 204.08, 190.06, 193.76, 226.16, 231.83, 222.08, 222.87, 223.88, 238.33, 237.11, 231.05, 231.08, 228.91, 245.09, 234.63, 215.25, 203.03, 194.02, 196.4, 196.86, 204.27, 209.39, 224.5, 230.39, 292.35, 294.23, 294.28, 329.24, 323.94] },
      velocityScore: { '1D': -30.7, '1W': -34, '1M': null, '6M': null }, isNew: false,
      marketCap: '$82B', pe: 31, revenueGrowth: 12, eps: 10.45, grossMargin: 56, dividendYield: 1.25,
      etfPresence: { SOXX: 3.31, PSI: false, XSD: 2.3, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 2.75, proScore: 1.38, coverage: 0.5,
      price: 127.9, weeklyPrices: [123.77, 120.62, 120.92, 128.64, 127.90], weeklyChange: 3.34, sortRank: 0, periodReturns: { '1M': 25.3, '6M': 123.8, '1Y': 170 },
      priceHistory: { '1W': [123.77, 120.62, 120.92, 128.64, 127.9], '1M': [102.04, 102.67, 105.77, 100.61, 103.2, 107.24, 104.11, 115.71, 118.37, 113.11, 106.02, 110.21, 109.61, 116.2, 127, 124.89, 123.77, 120.62, 120.92, 128.64, 127.9], '6M': [57.15, 55.1, 53.33, 55.08, 56.7, 62.16, 60.33, 61.13, 61.53, 65.1, 71.96, 70.03, 63.42, 59.23, 59.88, 59.89, 55.66, 63.79, 72.05, 86.91, 93.3, 102.67, 104.11, 106.02, 124.89, 127.9], '1Y': [47.37, 53.8, 52.94, 53.74, 55.95, 59.52, 59.41, 59.61, 58.05, 46.98, 51.89, 49.47, 51.25, 48.06, 49.02, 51.83, 49.77, 48.74, 49.97, 52.97, 51.93, 51.4, 50.08, 49.27, 46.12, 49.64, 54.79, 55.97, 54.34, 54.93, 58.69, 58.75, 60.33, 61.13, 61.53, 65.1, 71.96, 70.03, 63.42, 59.59, 60.98, 62.34, 61.92, 68.38, 72.43, 86.91, 93.3, 102.67, 104.11, 106.02, 124.89, 127.9] },
      velocityScore: { '1D': -28.9, '1W': -30.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$50B', pe: 94, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 2.42, PSI: false, XSD: 3.09, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.73, proScore: 1.36, coverage: 0.5,
      price: 1639.58, weeklyPrices: [1633.17, 1566.21, 1542.39, 1624.99, 1639.58], weeklyChange: 0.39, sortRank: 0, periodReturns: { '1M': 4.2, '6M': 71.1, '1Y': 139.1 },
      priceHistory: { '1W': [1633.17, 1566.21, 1542.39, 1624.99, 1639.58], '1M': [1573.3, 1588.12, 1652.35, 1575.96, 1600.84, 1661.1, 1599.52, 1650.35, 1613.97, 1550.02, 1468.11, 1553.27, 1561.25, 1589.81, 1662.98, 1620.17, 1633.17, 1566.21, 1542.39, 1624.99, 1639.58], '6M': [958.02, 979.02, 912.25, 953.25, 936.31, 958.97, 1033.17, 1068.14, 1173.22, 1206.18, 1173.18, 1213.67, 1074.37, 1062, 1077.4, 1076.35, 1002.34, 1191.22, 1363.42, 1527.95, 1504.08, 1588.12, 1599.52, 1468.11, 1620.17, 1639.58], '1Y': [685.76, 731.84, 690.87, 722.82, 764.4, 740.45, 713.57, 720.01, 730.54, 805.85, 861.8, 826.27, 866.32, 848.11, 840.38, 917.78, 891.39, 930.51, 979.25, 1026.83, 1001.4, 1094.08, 1000.15, 958.35, 884.65, 924.95, 952.74, 981.48, 929.48, 946.32, 955.03, 967.16, 1033.17, 1068.14, 1173.22, 1206.18, 1173.18, 1213.67, 1074.37, 1055.82, 1066.66, 1101.59, 1093.35, 1312.94, 1353, 1527.95, 1504.08, 1588.12, 1599.52, 1468.11, 1620.17, 1639.58] },
      velocityScore: { '1D': -29.9, '1W': -33.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$81B', pe: 117.4, revenueGrowth: 26, eps: 13.97, grossMargin: 55, dividendYield: 0.49,
      etfPresence: { SOXX: 3.3, PSI: false, XSD: 2.16, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp/DE', easyScore: 1, avgWeight: 4.8, proScore: 1.2, coverage: 0.25,
      price: 1714.51, weeklyPrices: [1641.64, 1694.98, 1761.43, 1716.36, 1714.51], weeklyChange: 4.44, sortRank: 0, periodReturns: { '1M': 36.5, '6M': 782, '1Y': 4337.1 },
      priceHistory: { '1W': [1641.64, 1694.98, 1761.43, 1716.36, 1714.51], '1M': [1255.86, 1406.32, 1409.98, 1339.96, 1562.34, 1547.56, 1452.02, 1447.23, 1382.72, 1407.61, 1383.29, 1392.56, 1542.24, 1478.69, 1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1714.51], '6M': [194.38, 232.86, 206.83, 250.08, 275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 565.41, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1714.51], '1Y': [38.64, 41.59, 44.09, 47.25, 46.21, 46.95, 41.52, 43, 43.39, 42.1, 47.01, 44.4, 48.44, 62.5, 84.3, 98.87, 94.29, 124.14, 129.68, 144.27, 146.95, 204.36, 216.5, 283.1, 245.96, 215.04, 213.31, 241.61, 219.46, 250.05, 274.08, 389.27, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 565.41, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1714.51] },
      velocityScore: { '1D': -52.2, '1W': -53.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$254B', pe: 58.8, revenueGrowth: 251, eps: 29.18, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: false, PSI: false, XSD: false, DRAM: 4.8 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 2, avgWeight: 2.32, proScore: 1.16, coverage: 0.5,
      price: 421.6, weeklyPrices: [419.01, 413.85, 402.69, 423.20, 421.60], weeklyChange: 0.62, sortRank: 0, periodReturns: { '1M': 6.2, '6M': 51.5, '1Y': 93 },
      priceHistory: { '1W': [419.01, 413.85, 402.69, 423.2, 421.6], '1M': [397.02, 404.77, 415.63, 408.52, 416.52, 422.73, 419.65, 432.39, 426.79, 417.49, 414.31, 398.05, 384.21, 397.07, 419.94, 416.88, 419.01, 413.85, 402.69, 423.2, 421.6], '6M': [278.24, 281.57, 271.04, 277.56, 273.74, 300.93, 300.25, 304.01, 316.86, 322.97, 337.51, 356.09, 338.99, 319.71, 310.92, 312.19, 303.1, 327.41, 348.6, 375.27, 383.26, 404.77, 419.65, 414.31, 416.88, 421.6], '1Y': [218.43, 233.34, 227.44, 234.68, 245.15, 245.13, 240.97, 228.08, 231.11, 220.69, 237.63, 244.87, 255.5, 246.11, 248.24, 249.05, 247.53, 241.67, 237.88, 241.61, 240.36, 235.04, 236, 241.44, 232.2, 257.92, 277.26, 283.39, 274.92, 276.84, 277.29, 293.86, 300.25, 304.01, 316.86, 322.97, 337.51, 356.09, 338.99, 318.81, 313.66, 321.83, 318.14, 346.21, 347.94, 375.27, 383.26, 404.77, 419.65, 414.31, 416.88, 421.6] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$205B', pe: 62.6, revenueGrowth: 37, eps: 6.73, grossMargin: 64, dividendYield: 1.04,
      etfPresence: { SOXX: 2.76, PSI: false, XSD: 1.89, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.29, proScore: 1.15, coverage: 0.5,
      price: 206.52, weeklyPrices: [222.35, 236.03, 226.10, 229.00, 206.52], weeklyChange: -7.12, sortRank: 0, periodReturns: { '1M': 14.7, '6M': 9.2, '1Y': 187.2 },
      priceHistory: { '1W': [222.35, 236.03, 226.1, 229, 206.52], '1M': [180.06, 193.57, 198.29, 188.29, 188.51, 210.22, 198.57, 189.36, 184.54, 172.17, 168.99, 182.98, 193.39, 218.41, 221.64, 221.23, 222.35, 236.03, 226.1, 229, 206.52], '6M': [189.19, 157.98, 134.13, 150.19, 143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 97.3, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.23, 206.52], '1Y': [71.92, 68.53, 79.71, 92.2, 89.37, 97.29, 98.45, 98.41, 116.01, 117.34, 121.13, 105.99, 122.73, 134, 159.32, 172.31, 144.94, 149.63, 151.15, 136.53, 137.2, 171.52, 173.16, 160.34, 141.88, 164.01, 180.92, 154.47, 138.57, 144.83, 140.24, 156.07, 150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 97.3, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 183.32, 165.92, 193.57, 198.57, 168.99, 221.23, 206.52] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$38B', pe: 114.1, revenueGrowth: 157, eps: 1.81, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 1.77, PSI: false, XSD: 2.82, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.29, proScore: 1.14, coverage: 0.5,
      price: 95.79, weeklyPrices: [96.04, 94.65, 91.52, 96.96, 95.79], weeklyChange: -0.26, sortRank: 0, periodReturns: { '1M': 0.5, '6M': 50.6, '1Y': 50 },
      priceHistory: { '1W': [96.04, 94.65, 91.52, 96.96, 95.79], '1M': [95.3, 98.48, 102.92, 101.58, 99.09, 99.03, 97.7, 96.71, 97.04, 93.85, 91.81, 94.02, 91.11, 93.43, 98.05, 96.85, 96.04, 94.65, 91.52, 96.96, 95.79], '6M': [63.61, 67.9, 63.99, 65.36, 65.03, 75.22, 74.7, 74.79, 78.08, 74.41, 78.94, 75.93, 71.39, 65, 63.83, 64.34, 60.06, 67.51, 74.5, 80.93, 84.26, 98.48, 97.7, 91.81, 96.85, 95.79], '1Y': [63.84, 69.59, 67.69, 71.6, 73.16, 75.08, 74.3, 70.25, 70.29, 66.17, 65.75, 66.76, 66.65, 64.43, 65.02, 66.26, 64.84, 66.13, 65.86, 65.35, 64.5, 62.54, 60.8, 55.63, 50.8, 52.57, 64.72, 69.09, 64.06, 64.94, 67.06, 73.39, 74.7, 74.79, 78.08, 74.41, 78.94, 75.93, 71.39, 65.33, 64.59, 65.63, 64.61, 70.73, 74.49, 80.93, 84.26, 98.48, 97.7, 91.81, 96.85, 95.79] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$52B', pe: 435.4, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 1.88,
      etfPresence: { SOXX: 2.47, PSI: false, XSD: 2.1, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 7, avgWeight: 5.04, proScore: 2.71, coverage: 0.538,
      price: 1048.39, weeklyPrices: [923.52, 971.00, 1035.50, 1064.10, 1048.39], weeklyChange: 13.52, sortRank: 0, periodReturns: { '1M': 81.9, '6M': 347.7, '1Y': 925.3 },
      priceHistory: { '1W': [923.52, 971, 1035.5, 1064.1, 1048.39], '1M': [576.45, 640.2, 666.59, 646.63, 746.81, 795.33, 766.58, 803.63, 776.01, 724.66, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1048.39], '6M': [234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1048.39], '1Y': [102.25, 114.14, 120.34, 127.25, 121.74, 123.11, 113.26, 109.83, 114.74, 108.78, 124.27, 117.21, 117.75, 124.21, 150.57, 168.89, 156.83, 183.75, 192.33, 202.53, 198.47, 226.63, 237.5, 244.9, 225.92, 230.26, 226.65, 258.46, 248.55, 284.79, 312.15, 345.87, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1048.39] },
      velocityScore: { '1D': -25.5, '1W': 5.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 49.5, revenueGrowth: 196, eps: 21.18, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { PTF: 4.98, WCLD: false, IGV: false, FDTX: 9.36, GTEK: false, ARKK: false, MARS: false, FRWD: 4.61, BCTK: 5.23, FWD: 1.36, CBSE: 3, FCUS: 6.74, WGMI: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 7, avgWeight: 4.21, proScore: 2.27, coverage: 0.538,
      price: 217.65, weeklyPrices: [214.25, 211.14, 224.36, 222.82, 217.65], weeklyChange: 1.59, sortRank: 0, periodReturns: { '1M': 9.7, '6M': 21.2, '1Y': 54.1 },
      priceHistory: { '1W': [214.25, 211.14, 224.36, 222.82, 217.65], '1M': [198.48, 196.5, 207.83, 211.5, 215.2, 219.44, 220.78, 225.83, 235.74, 225.32, 220.61, 223.47, 219.51, 215.33, 214.86, 212.6, 214.25, 211.14, 224.36, 222.82, 217.65], '6M': [179.59, 183.78, 170.94, 188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 217.65], '1Y': [141.22, 143.96, 144.12, 154.31, 157.25, 164.1, 173, 170.78, 179.27, 179.42, 181.59, 175.4, 181.6, 171.66, 177.17, 176.24, 177.69, 188.89, 192.57, 181.81, 180.28, 207.04, 195.21, 193.8, 186.52, 180.26, 183.38, 180.93, 174.14, 190.53, 188.12, 184.94, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 217.65] },
      velocityScore: { '1D': -48.1, '1W': -52.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5.3T', pe: 33.3, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.45,
      etfPresence: { PTF: 4.44, WCLD: false, IGV: false, FDTX: 4.62, GTEK: false, ARKK: 1.77, MARS: false, FRWD: 7.89, BCTK: 6.74, FWD: 1.97, CBSE: false, FCUS: false, WGMI: 2.05 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 6, avgWeight: 4.03, proScore: 1.86, coverage: 0.462,
      price: 438.28, weeklyPrices: [424.86, 418.45, 435.63, 446.69, 438.28], weeklyChange: 3.16, sortRank: 0, periodReturns: { '1M': 9.1, '6M': 48.3, '1Y': 121.8 },
      priceHistory: { '1W': [424.86, 418.45, 435.63, 446.69, 438.28], '1M': [401.61, 394.41, 419.5, 414.15, 411.68, 404.54, 397.28, 399.8, 417.72, 404.35, 392.61, 401.62, 407.15, 404.52, 412.32, 422.73, 424.86, 418.45, 435.63, 446.69, 438.28], '6M': [295.45, 310.14, 276.96, 298.8, 319.61, 323.63, 342.4, 332.71, 341.36, 355.41, 364.2, 385.75, 353.13, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 392.61, 422.73, 438.28], '1Y': [197.61, 212.46, 213.9, 222.74, 233.6, 229.76, 245.6, 240.33, 242.91, 231.37, 241.44, 228.6, 239.29, 235.21, 258.91, 268.64, 276.66, 288.11, 299.88, 299.84, 288.88, 305.09, 293.64, 290.62, 282.37, 289.96, 292.93, 304.85, 284.68, 302.84, 322.25, 331.77, 342.4, 332.71, 341.36, 355.41, 364.2, 385.75, 353.13, 347.09, 345.98, 343.25, 337.95, 365.9, 375.1, 368.08, 392.34, 394.41, 397.28, 392.61, 422.73, 438.28] },
      velocityScore: { '1D': -36.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 37.5, revenueGrowth: 35, eps: 11.7, grossMargin: 62, dividendYield: 0.85,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6, GTEK: false, ARKK: 1, MARS: false, FRWD: 5.66, BCTK: 8.42, FWD: false, CBSE: 2.55, FCUS: false, WGMI: 0.57 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 5, avgWeight: 4.7, proScore: 1.81, coverage: 0.385,
      price: 933.87, weeklyPrices: [880.72, 879.80, 921.26, 926.61, 933.87], weeklyChange: 6.04, sortRank: 0, periodReturns: { '1M': 26.4, '6M': 261, '1Y': 657.8 },
      priceHistory: { '1W': [880.72, 879.8, 921.26, 926.61, 933.87], '1M': [738.54, 771.01, 786.42, 766.44, 782.64, 834.01, 808.8, 817.35, 804.76, 795.47, 733.35, 751.07, 810.46, 812.73, 845.76, 870.66, 880.72, 879.8, 921.26, 926.61, 933.87], '6M': [258.67, 298.92, 277.65, 285.27, 287.54, 304.01, 326.23, 358.29, 432.95, 425, 415.94, 396.02, 357.62, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 579.03, 771.01, 808.8, 733.35, 870.66, 933.87], '1Y': [123.23, 127.99, 130.87, 138.54, 151.94, 144.5, 146.72, 152.76, 147.42, 147.27, 156.92, 158.4, 167.24, 183.98, 196.81, 216.64, 219.85, 254.74, 221.7, 226.03, 215.05, 265.62, 275.77, 283.26, 259.14, 272.28, 265.63, 307.85, 292, 286.22, 289.83, 321.48, 326.23, 358.29, 432.95, 425, 415.94, 396.02, 357.62, 384.29, 421.09, 424.96, 391.76, 496.3, 519.6, 559.9, 579.03, 771.01, 808.8, 733.35, 870.66, 933.87] },
      velocityScore: { '1D': -38.2, '1W': -20.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$211B', pe: 88.4, revenueGrowth: 44, eps: 10.56, grossMargin: 42, dividendYield: 0.32,
      etfPresence: { PTF: 4.67, WCLD: false, IGV: false, FDTX: 4.04, GTEK: false, ARKK: false, MARS: false, FRWD: 8.95, BCTK: false, FWD: 1.05, CBSE: false, FCUS: 4.79, WGMI: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 4, avgWeight: 4.89, proScore: 1.5, coverage: 0.308,
      price: 530.09, weeklyPrices: [518.09, 516.10, 510.13, 521.54, 530.09], weeklyChange: 2.32, sortRank: 0, periodReturns: { '1M': 55.2, '6M': 143.6, '1Y': 351.9 },
      priceHistory: { '1W': [518.09, 516.1, 510.13, 521.54, 530.09], '1M': [341.54, 355.26, 421.39, 408.46, 455.19, 458.79, 448.29, 445.5, 449.7, 424.1, 414.05, 447.58, 449.59, 467.51, 503.89, 495.54, 518.09, 516.1, 510.13, 521.54, 530.09], '6M': [217.6, 221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 530.09], '1Y': [117.31, 123.24, 127.1, 143.4, 138.52, 144.16, 160.41, 158.65, 179.51, 163.12, 184.42, 165.2, 167.13, 161.79, 155.67, 157.92, 161.27, 169.73, 232.89, 234.56, 230.23, 264.33, 256.33, 258.89, 223.55, 214.24, 215.98, 221.43, 201.06, 214.99, 221.08, 207.69, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 530.09] },
      velocityScore: { '1D': -44.6, '1W': -50.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$864B', pe: 175.5, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 5.24, MARS: false, FRWD: 7.92, BCTK: 3.72, FWD: 2.68, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 4, avgWeight: 4.65, proScore: 1.43, coverage: 0.308,
      price: 586.86, weeklyPrices: [531.18, 531.21, 546.20, 563.10, 586.86], weeklyChange: 10.48, sortRank: 0, periodReturns: { '1M': 32.7, '6M': 277.2, '1Y': 991.4 },
      priceHistory: { '1W': [531.18, 531.21, 546.2, 563.1, 586.86], '1M': [442.36, 465.26, 483.15, 463.91, 480, 515.83, 488.74, 494.09, 489.15, 482.02, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 586.86], '6M': [155.59, 181.95, 166.26, 179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 586.86], '1Y': [53.77, 55.95, 58.57, 62.55, 65.78, 65.06, 67.02, 69.32, 71.43, 73.78, 76.07, 75.64, 80.67, 90.49, 96.15, 105.15, 107.21, 131.26, 119.7, 125.92, 120.47, 141.38, 160.1, 166.11, 153.97, 157.74, 161, 187.2, 175.01, 181.54, 187.88, 212.14, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 586.86] },
      velocityScore: { '1D': -44.6, '1W': -34.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$202B', pe: 35.1, revenueGrowth: 46, eps: 16.72, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { PTF: 4.65, WCLD: false, IGV: false, FDTX: 4, GTEK: false, ARKK: false, MARS: false, FRWD: 5.14, BCTK: false, FWD: false, CBSE: false, FCUS: 4.82, WGMI: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 5, avgWeight: 3.58, proScore: 1.38, coverage: 0.385,
      price: 475.55, weeklyPrices: [426.58, 446.77, 459.97, 481.57, 475.55], weeklyChange: 11.48, sortRank: 0, periodReturns: { '1M': 14.2, '6M': 24.9, '1Y': 85.1 },
      priceHistory: { '1W': [426.58, 446.77, 459.97, 481.57, 475.55], '1M': [416.5, 427.36, 425.44, 412.56, 430, 428.43, 419.3, 416.79, 439.79, 425.19, 411.07, 417.76, 414.57, 414.14, 422.01, 421.86, 426.58, 446.77, 459.97, 481.57, 475.55], '6M': [380.61, 412.97, 326.02, 350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 475.55], '1Y': [256.85, 244.63, 249.37, 264.65, 269.9, 275.4, 286.45, 283.69, 302.62, 301.67, 309.09, 291.17, 300.25, 306.1, 359.63, 345.35, 336.1, 338.18, 345.02, 354.15, 340.3, 385.98, 358.98, 355.22, 354.42, 397.57, 381.03, 406.37, 329.88, 352.13, 343.42, 352.21, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 475.55] },
      velocityScore: { '1D': -37.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 92.3, revenueGrowth: 30, eps: 5.15, grossMargin: 77, dividendYield: 0.54,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.79, GTEK: false, ARKK: 1.27, MARS: false, FRWD: 4.58, BCTK: 8.25, FWD: 3.02, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 5, avgWeight: 3.27, proScore: 1.26, coverage: 0.385,
      price: 255.81, weeklyPrices: [274.00, 270.64, 261.26, 256.52, 255.81], weeklyChange: -6.64, sortRank: 0, periodReturns: { '1M': -6, '6M': 10.1, '1Y': 24.4 },
      priceHistory: { '1W': [274, 270.64, 261.26, 256.52, 255.81], '1M': [272.05, 273.55, 274.99, 271.17, 272.68, 268.99, 265.82, 270.13, 267.22, 264.14, 259.34, 265.01, 268.46, 266.32, 265.29, 271.85, 274, 270.64, 261.26, 256.52, 255.81], '6M': [232.38, 231.78, 221.27, 232.38, 226.5, 247.38, 239.12, 238.42, 242.96, 208.72, 201.15, 208.56, 208.73, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 259.34, 271.85, 255.81], '1Y': [205.71, 217.61, 214.82, 211.99, 219.92, 222.26, 223.88, 228.29, 230.19, 222.31, 224.56, 223.81, 229.12, 235.68, 229.95, 231.23, 218.15, 222.41, 227.74, 214.47, 217.95, 230.3, 250.2, 244.2, 222.69, 229.16, 229.11, 230.28, 226.76, 232.52, 233.06, 246.47, 239.12, 238.42, 242.96, 208.72, 201.15, 208.56, 208.73, 214.33, 215.2, 207.24, 208.27, 221.25, 248.5, 249.91, 259.7, 273.55, 265.82, 259.34, 271.85, 255.81] },
      velocityScore: { '1D': -64, '1W': -69.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.8T', pe: 31.5, revenueGrowth: 17, eps: 8.11, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.01, GTEK: false, ARKK: 2.54, MARS: false, FRWD: 3.72, BCTK: 4.61, FWD: 1.46, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 4, avgWeight: 4.05, proScore: 1.25, coverage: 0.308,
      price: 335.27, weeklyPrices: [318.00, 318.18, 317.12, 334.41, 335.27], weeklyChange: 5.43, sortRank: 0, periodReturns: { '1M': 29.7, '6M': 109.9, '1Y': 300.8 },
      priceHistory: { '1W': [318, 318.18, 317.12, 334.41, 335.27], '1M': [258.57, 275.8, 297.17, 286.52, 294.05, 296.05, 289.24, 295.44, 299.15, 284.72, 273.38, 292.09, 302.24, 305.35, 322.68, 318.93, 318, 318.18, 317.12, 334.41, 335.27], '6M': [159.75, 168.26, 154.98, 177.33, 185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.58, 244.25, 217.27, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 273.38, 318.93, 335.27], '1Y': [83.66, 91, 92.66, 96.02, 98.83, 101.06, 100.79, 97.1, 99.09, 95.94, 106.74, 99.15, 103.67, 100.42, 115.58, 126.32, 128.13, 146.99, 141, 142.37, 141.25, 160.67, 165.05, 161.42, 148.8, 155.14, 157.09, 168.71, 164.7, 178.07, 194.76, 220.4, 222.96, 222.87, 237.5, 229.28, 235.58, 244.25, 217.27, 215.23, 226.47, 238.84, 213.66, 246.49, 265.16, 258.37, 251.23, 275.8, 289.24, 273.38, 318.93, 335.27] },
      velocityScore: { '1D': -44.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$419B', pe: 63.5, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.31,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.62, BCTK: 6.38, FWD: 1.66, CBSE: 2.54, FCUS: false, WGMI: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 3, avgWeight: 5.23, proScore: 1.21, coverage: 0.231,
      price: 431.94, weeklyPrices: [426.99, 450.24, 460.52, 441.31, 431.94], weeklyChange: 1.16, sortRank: 0, periodReturns: { '1M': 4.4, '6M': -9.6, '1Y': -6.7 },
      priceHistory: { '1W': [426.99, 450.24, 460.52, 441.31, 431.94], '1M': [413.62, 411.38, 413.96, 420.77, 415.12, 412.66, 407.77, 405.21, 409.43, 421.92, 417.42, 421.06, 419.09, 418.57, 416.03, 412.67, 426.99, 450.24, 460.52, 441.31, 431.94], '6M': [477.73, 478.56, 476.12, 488.02, 472.94, 479.28, 459.86, 470.28, 423.37, 413.6, 396.86, 389, 403.93, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 417.42, 412.67, 431.94], '1Y': [462.97, 470.92, 478.04, 492.27, 491.09, 501.48, 511.7, 505.87, 513.24, 524.94, 520.58, 505.72, 506.74, 507.97, 501.01, 508.45, 507.03, 515.74, 522.4, 511.61, 520.54, 541.55, 507.16, 511.14, 487.12, 485.5, 480.84, 483.47, 483.98, 487.71, 472.85, 477.18, 459.86, 470.28, 423.37, 413.6, 396.86, 389, 403.93, 405.76, 399.41, 372.74, 370.17, 374.33, 411.22, 424.16, 429.25, 411.38, 407.77, 417.42, 412.67, 431.94] },
      velocityScore: { '1D': -71, '1W': -75.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3.2T', pe: 25.8, revenueGrowth: 18, eps: 16.77, grossMargin: 68, dividendYield: 0.82,
      etfPresence: { PTF: false, WCLD: false, IGV: 7.62, FDTX: 3.79, GTEK: false, ARKK: false, MARS: false, FRWD: 4.28, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'CIFR', name: 'CIPHER DIGITAL INC', easyScore: 2, avgWeight: 7.84, proScore: 1.21, coverage: 0.154,
      price: 26.98, weeklyPrices: [24.59, 23.65, 24.01, 26.29, 26.98], weeklyChange: 9.72, sortRank: 0, periodReturns: { '1M': 50.8, '6M': 44.8, '1Y': 685.4 },
      priceHistory: { '1W': [24.59, 23.65, 24.01, 26.29, 26.98], '1M': [17.89, 22.1, 21.91, 20.68, 20.55, 20.28, 20.06, 21.24, 22.29, 20.33, 18.8, 19.48, 21.52, 21.97, 23.02, 25.16, 24.59, 23.65, 24.01, 26.29, 26.98], '6M': [18.63, 18.48, 14.39, 16.22, 16.2, 16.63, 18.8, 16.49, 15.81, 16.76, 15.64, 17.12, 14.71, 14.31, 15.14, 14.89, 12.02, 14.01, 18.45, 18.04, 17.26, 22.1, 20.06, 18.8, 25.16, 26.98], '1Y': [3.43, 4.06, 3.68, 3.85, 5.68, 6.24, 6.42, 6.68, 5.45, 5.21, 4.9, 5.95, 6.99, 7.4, 9.97, 11.85, 11.66, 13.81, 17.99, 18.72, 16.11, 19.59, 24.71, 17.38, 14.62, 19.15, 19.83, 18.88, 15.15, 15.19, 18.16, 17.68, 18.8, 16.49, 15.81, 16.76, 15.64, 17.12, 14.71, 13.96, 15.09, 14.88, 12.87, 15.42, 18, 18.04, 17.26, 22.1, 20.06, 18.8, 25.16, 26.98] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$11B', pe: null, revenueGrowth: -29, eps: -2.32, grossMargin: 12, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 0.25, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: 15.43 },
      tonyNote: 'CIPHER DIGITAL INC appears in 2 of 13 Broad Tech ETFs (15% coverage) with average weight 7.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 3, avgWeight: 4.91, proScore: 1.13, coverage: 0.231,
      price: 424.19, weeklyPrices: [442.10, 435.79, 415.88, 423.74, 424.19], weeklyChange: -4.05, sortRank: 0, periodReturns: { '1M': 8.1, '6M': -5, '1Y': 23.2 },
      priceHistory: { '1W': [442.1, 435.79, 415.88, 423.74, 424.19], '1M': [392.51, 389.37, 398.73, 411.79, 428.35, 445, 433.45, 445.27, 443.3, 422.24, 404.11, 417.26, 417.85, 426.01, 433.59, 440.36, 442.1, 435.79, 415.88, 423.74, 424.19], '6M': [446.74, 451.45, 467.26, 485.4, 438.07, 445.01, 437.5, 435.2, 421.81, 417.32, 410.63, 409.38, 392.43, 398.68, 395.56, 380.85, 355.28, 346.65, 364.2, 386.42, 376.02, 389.37, 433.45, 404.11, 440.36, 424.19], '1Y': [344.27, 326.09, 316.35, 327.55, 315.65, 309.87, 319.41, 332.56, 319.04, 319.91, 339.38, 323.9, 349.6, 338.53, 368.81, 416.85, 423.39, 436, 435.54, 428.75, 438.97, 461.51, 462.07, 430.6, 403.99, 426.58, 454.53, 446.89, 483.37, 475.19, 451.67, 448.96, 437.5, 435.2, 421.81, 417.32, 410.63, 409.38, 392.43, 399.24, 399.27, 383.03, 371.75, 343.25, 391.95, 386.42, 376.02, 389.37, 433.45, 404.11, 440.36, 424.19] },
      velocityScore: { '1D': -74.5, '1W': -78.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: 385.6, revenueGrowth: 16, eps: 1.1, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 10.23, MARS: false, FRWD: false, BCTK: 3.36, FWD: 1.15, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
    {
      ticker: 'MRVL', name: 'Marvell Technology Inc', easyScore: 3, avgWeight: 4.75, proScore: 1.1, coverage: 0.231,
      price: 298.29, weeklyPrices: [204.83, 205.00, 219.43, 290.79, 298.29], weeklyChange: 45.63, sortRank: 0, periodReturns: { '1M': 82.3, '6M': 197.7, '1Y': 378.3 },
      priceHistory: { '1W': [204.83, 205, 219.43, 290.79, 298.29], '1M': [163.66, 168.75, 172.15, 160.01, 170.13, 170.84, 164.5, 177.95, 182.58, 176.89, 176.27, 186.8, 190.69, 196.33, 208.26, 198.7, 204.83, 205, 219.43, 290.79, 298.29], '6M': [100.2, 92.47, 81.7, 86.49, 89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 77.51, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 198.7, 298.29], '1Y': [62.36, 68.84, 69.99, 75.93, 74.25, 73.36, 72.01, 73.27, 81.74, 75.32, 79.32, 71.22, 74.79, 64.1, 66.59, 74.23, 83.81, 86.2, 90.68, 88.23, 81.05, 90.15, 92.9, 89.33, 81.32, 87.72, 98.19, 89.43, 84.47, 86.34, 90.23, 82.89, 80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 77.51, 93.3, 90.79, 92.36, 99.05, 114.45, 134.6, 151.31, 153.23, 168.75, 164.5, 176.27, 198.7, 298.29] },
      velocityScore: { '1D': -51.1, '1W': -64.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$261B', pe: 102.5, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.08,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 8.06, GTEK: 3.45, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: 2.73, FCUS: false, WGMI: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'PANW', name: 'PANW', easyScore: 3, avgWeight: 4.61, proScore: 1.06, coverage: 0.231,
      price: 279.02, weeklyPrices: [257.77, 281.69, 300.48, 297.18, 279.02], weeklyChange: 8.24, sortRank: 0, periodReturns: { '1M': 51.2, '6M': 44.1, '1Y': 41.5 },
      priceHistory: { '1W': [257.77, 281.69, 300.48, 297.18, 279.02], '1M': [184.56, 183.98, 183.68, 196.53, 207.88, 213.66, 215.6, 227.79, 238.21, 242.83, 240.13, 246.66, 252.92, 260.58, 256.75, 248.47, 257.77, 281.69, 300.48, 297.18, 279.02], '6M': [193.63, 192.96, 183.44, 187.22, 179.37, 189.02, 187.66, 184.22, 175.42, 166, 163.5, 141.67, 156.09, 165.1, 167.45, 164.05, 154.35, 169.87, 161.59, 174.96, 180.99, 183.98, 215.6, 240.13, 248.47, 279.02], '1Y': [197.12, 195.95, 202.05, 204.3, 196.97, 192.07, 196.28, 199.22, 183.03, 172.89, 176.86, 184.43, 187.61, 192.35, 198.33, 205.68, 202.21, 209.3, 215.17, 205.51, 212.42, 217.16, 213.18, 210.04, 199.9, 185.35, 195.68, 190.36, 185.88, 188.45, 182.12, 188.88, 187.66, 184.22, 175.42, 166, 163.5, 141.67, 156.09, 165.58, 169.19, 157.21, 160.32, 173.78, 164.11, 174.96, 180.99, 183.98, 215.6, 240.13, 248.47, 279.02] },
      velocityScore: { '1D': -51.8, '1W': -50.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$226B', pe: 240.5, revenueGrowth: 15, eps: 1.16, grossMargin: 74, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.39, IGV: 7.76, FDTX: 3.67, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 1, avgWeight: 13.48, proScore: 1.04, coverage: 0.077,
      price: 67.63, weeklyPrices: [64.05, 63.54, 65.33, 66.60, 67.63], weeklyChange: 5.59, sortRank: 0, periodReturns: { '1M': 36.7, '6M': 53.8, '1Y': 660.7 },
      priceHistory: { '1W': [64.05, 63.54, 65.33, 66.6, 67.63], '1M': [49.48, 54.74, 60.98, 56.85, 61.2, 55.15, 56.56, 55.17, 58.4, 52.94, 47.74, 52.71, 58.06, 56.83, 59.78, 67.84, 64.05, 63.54, 65.33, 66.6, 67.63], '6M': [43.96, 43.92, 33.78, 41.98, 42.7, 46.03, 57.82, 52.36, 53.08, 46.15, 40.97, 45.45, 38.85, 38.84, 44.94, 42.16, 31.62, 35.74, 47.37, 45.17, 44.44, 54.74, 56.56, 47.74, 67.84, 67.63], '1Y': [8.89, 10.49, 9.77, 11.87, 15.66, 17.03, 18.05, 18.99, 16.14, 18.32, 17.73, 19.76, 22.35, 26.13, 32.85, 36.32, 46.29, 47.02, 63.85, 61.83, 51.83, 60.42, 76.41, 55.7, 45.83, 48.45, 46.45, 43.94, 35.8, 40.3, 48.24, 50.33, 57.82, 52.36, 53.08, 46.15, 40.97, 45.45, 38.85, 38.12, 42.96, 41.12, 34.28, 36.83, 48.82, 45.17, 44.44, 54.74, 56.56, 47.74, 67.84, 67.63] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$24B', pe: 87.8, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: 13.48 },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab Corp', easyScore: 1, avgWeight: 13.32, proScore: 1.02, coverage: 0.077,
      price: 117.17, weeklyPrices: [148.03, 143.48, 122.39, 123.32, 117.17], weeklyChange: -20.85, sortRank: 0, periodReturns: { '1M': 45.9, '6M': 162, '1Y': 338.5 },
      priceHistory: { '1W': [148.03, 143.48, 122.39, 123.32, 117.17], '1M': [80.31, 78.76, 84.65, 78.58, 105.47, 117.35, 117.56, 124.15, 132.55, 124.77, 127.31, 134.28, 125.45, 135.76, 143.2, 150.23, 148.03, 143.48, 122.39, 123.32, 117.17], '6M': [44.72, 57.52, 53.96, 77.18, 75.99, 84.85, 96.3, 80.48, 74.15, 75.84, 69.89, 69.97, 70.13, 71.48, 71.31, 68, 57.38, 66.32, 72.22, 86.64, 78.59, 78.76, 117.56, 127.31, 150.23, 117.17], '1Y': [26.72, 27.17, 26.42, 32.35, 35.68, 39.1, 51.33, 49.15, 46.44, 44.1, 43, 40.69, 46.25, 42.99, 48.43, 47.18, 46.63, 52.47, 66.42, 67, 60.56, 66.16, 56.42, 49.97, 43.62, 41.93, 49.37, 63.53, 59.92, 70.65, 78.14, 87.9, 96.3, 80.48, 74.15, 75.84, 69.89, 69.97, 70.13, 68.93, 78.59, 66.07, 64.22, 69.08, 73.6, 86.64, 78.59, 78.76, 117.56, 127.31, 150.23, 117.17] },
      velocityScore: { '1D': -72.3, '1W': -77, '1M': null, '6M': null }, isNew: false,
      marketCap: '$68B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: 13.32, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 3, avgWeight: 4.37, proScore: 1.01, coverage: 0.231,
      price: 145.91, weeklyPrices: [143.34, 156.54, 160.65, 152.17, 145.91], weeklyChange: 1.79, sortRank: 0, periodReturns: { '1M': -0.1, '6M': -17.1, '1Y': 9.6 },
      priceHistory: { '1W': [143.34, 156.54, 160.65, 152.17, 145.91], '1M': [146.03, 135.91, 133.79, 137.05, 137.8, 136.89, 136, 130.05, 133.73, 133.99, 135.26, 137.15, 137.41, 136.88, 136.6, 132.51, 143.34, 156.54, 160.65, 152.17, 145.91], '6M': [176.08, 187.91, 177.29, 194.17, 167.86, 177.49, 170.96, 167.47, 147.76, 142.91, 133.02, 128.84, 147.22, 156.43, 152.72, 160.84, 137.55, 150.07, 135.7, 145.97, 141.18, 135.91, 136, 135.26, 132.51, 145.91], '1Y': [133.17, 132.81, 138.2, 142.9, 132.12, 142.5, 153.99, 154.63, 158.61, 179.54, 184.37, 156.01, 156.72, 156.14, 164.36, 176.97, 179.12, 187.05, 185.47, 178.12, 175.49, 198.81, 187.9, 184.17, 165.42, 165.77, 177.92, 187.54, 185.69, 188.71, 174.04, 179.41, 170.96, 167.47, 147.76, 142.91, 133.02, 128.84, 147.22, 151.14, 155.08, 154.78, 146.28, 140.76, 142.15, 145.97, 141.18, 135.91, 136, 135.26, 132.51, 145.91] },
      velocityScore: { '1D': null, '1W': -55.9, '1M': null, '6M': null }, isNew: true,
      marketCap: '$350B', pe: 165.8, revenueGrowth: 85, eps: 0.88, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 7.01, FDTX: 2.87, GTEK: false, ARKK: 3.24, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp/DE', easyScore: 2, avgWeight: 6.42, proScore: 0.99, coverage: 0.154,
      price: 1714.51, weeklyPrices: [1641.64, 1694.98, 1761.43, 1716.36, 1714.51], weeklyChange: 4.44, sortRank: 0, periodReturns: { '1M': 36.5, '6M': 782, '1Y': 4337.1 },
      priceHistory: { '1W': [1641.64, 1694.98, 1761.43, 1716.36, 1714.51], '1M': [1255.86, 1406.32, 1409.98, 1339.96, 1562.34, 1547.56, 1452.02, 1447.23, 1382.72, 1407.61, 1383.29, 1392.56, 1542.24, 1478.69, 1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1714.51], '6M': [194.38, 232.86, 206.83, 250.08, 275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 565.41, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1714.51], '1Y': [38.64, 41.59, 44.09, 47.25, 46.21, 46.95, 41.52, 43, 43.39, 42.1, 47.01, 44.4, 48.44, 62.5, 84.3, 98.87, 94.29, 124.14, 129.68, 144.27, 146.95, 204.36, 216.5, 283.1, 245.96, 215.04, 213.31, 241.61, 219.46, 250.05, 274.08, 389.27, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 565.41, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1714.51] },
      velocityScore: { '1D': -61.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$254B', pe: 58.8, revenueGrowth: 251, eps: 29.18, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 7.33, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: 5.5, WGMI: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'COHR', name: 'Coherent Corp', easyScore: 4, avgWeight: 3.04, proScore: 0.94, coverage: 0.308,
      price: 412.16, weeklyPrices: [376.95, 361.47, 362.90, 426.89, 412.16], weeklyChange: 9.34, sortRank: 0, periodReturns: { '1M': 24.9, '6M': 141.1, '1Y': 412 },
      priceHistory: { '1W': [376.95, 361.47, 362.9, 426.89, 412.16], '1M': [329.89, 335.73, 344.67, 319.19, 335.26, 379.69, 374.01, 403.71, 404.94, 382.45, 353.63, 358.5, 378, 377.57, 381.35, 380.18, 376.95, 361.47, 362.9, 426.89, 412.16], '6M': [170.96, 197.45, 170.44, 191.37, 194.33, 178.06, 191.04, 197.76, 222.44, 242.46, 219.96, 254.86, 280.81, 252.32, 247.37, 255.05, 219.65, 255.1, 313.42, 343.79, 303.97, 335.73, 374.01, 353.63, 380.18, 412.16], '1Y': [80.5, 82.02, 79.77, 85.63, 88.36, 93.72, 100.28, 98.43, 107.23, 107.15, 114.01, 86.55, 90.71, 95.62, 103.51, 108.05, 106.57, 112.79, 122.35, 115.96, 115.37, 138.06, 134.63, 156.67, 142.94, 154, 177.35, 198.5, 175.71, 191.72, 186.36, 185.18, 191.04, 197.76, 222.44, 242.46, 219.96, 254.86, 280.81, 260.64, 245.8, 272.33, 238.21, 281.79, 308.2, 343.79, 303.97, 335.73, 374.01, 353.63, 380.18, 412.16] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$81B', pe: 197.2, revenueGrowth: 21, eps: 2.09, grossMargin: 37, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.75, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 3.51, FWD: false, CBSE: 2.3, FCUS: 2.6, WGMI: false },
      tonyNote: 'Coherent Corp appears in 4 of 13 Broad Tech ETFs (31% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 3.06, proScore: 0.94, coverage: 0.308,
      price: 113.86, weeklyPrices: [115.03, 118.71, 124.12, 117.01, 113.86], weeklyChange: -1.01, sortRank: 0, periodReturns: { '1M': -10.7, '6M': -28.8, '1Y': 8.3 },
      priceHistory: { '1W': [115.03, 118.71, 124.12, 117.01, 113.86], '1M': [127.55, 107.63, 105.44, 111.74, 110.41, 102.54, 99.84, 95.4, 97.42, 100.28, 101.01, 105.01, 104.86, 103, 104.9, 106.6, 115.03, 118.71, 124.12, 117.01, 113.86], '6M': [160, 168.42, 161.73, 169.45, 157.2, 164.48, 155.81, 136.31, 132.2, 118.4, 113.54, 116.93, 121.87, 133.5, 126.58, 121.1, 111.77, 117.06, 117.64, 131.13, 122.05, 107.63, 99.84, 101.01, 106.6, 113.86], '1Y': [105.11, 110.26, 106.53, 113.89, 114.77, 115.16, 126.75, 122.21, 123.01, 154.9, 150.09, 137.29, 139.89, 145.15, 145.03, 152.11, 143.45, 151.3, 163.87, 156.57, 162.01, 179.01, 162.92, 156.59, 146, 159.34, 162.31, 164.75, 166.8, 170.83, 166.21, 167.93, 155.81, 136.31, 132.2, 118.4, 113.54, 116.93, 121.87, 129.36, 127.8, 116.15, 118.62, 120.1, 127.41, 131.13, 122.05, 107.63, 99.84, 101.01, 106.6, 113.86] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$148B', pe: 111.6, revenueGrowth: 34, eps: 1.02, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.89, GTEK: false, ARKK: 4.41, MARS: false, FRWD: 2.06, BCTK: 2.89, FWD: false, CBSE: false, FCUS: false, WGMI: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 13 Broad Tech ETFs (31% coverage) with average weight 3.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 2, avgWeight: 7.29, proScore: 3.65, coverage: 0.5,
      price: 285.77, weeklyPrices: [288.90, 284.42, 288.12, 299.07, 285.77], weeklyChange: -1.08, sortRank: 0, periodReturns: { '1M': 5.9, '6M': 165, '1Y': 393.9 },
      priceHistory: { '1W': [288.9, 284.42, 288.12, 299.07, 285.77], '1M': [269.95, 294.69, 320.3, 305.93, 309.39, 322.05, 308.05, 300.84, 296.98, 292.65, 261.58, 271.05, 270.75, 279.22, 291.97, 295.94, 288.9, 284.42, 288.12, 299.07, 285.77], '6M': [107.83, 119.95, 105.77, 112.06, 117.51, 121.83, 139.99, 141.15, 146.79, 187.3, 187.21, 186.39, 170.37, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 261.58, 295.94, 285.77], '1Y': [57.87, 61.92, 60.3, 63.42, 72.84, 70.96, 78.84, 78.32, 76.88, 75.95, 86.57, 82.17, 91.46, 90.24, 97.47, 101.43, 94.58, 102.51, 103.18, 112.77, 110.96, 136.12, 131.92, 118.74, 95.1, 107.26, 112.31, 120.91, 109.59, 113.62, 120.46, 128.85, 139.99, 141.15, 146.79, 187.3, 187.21, 186.39, 170.37, 176.51, 174.04, 186.82, 180.36, 218.07, 229.73, 240.97, 255.56, 294.69, 308.05, 261.58, 295.94, 285.77] },
      velocityScore: { '1D': -27.7, '1W': -27.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 55.9, revenueGrowth: 7, eps: 5.11, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { POW: 6.56, VOLT: 8.03, PBD: false, PBW: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, avgWeight: 5.12, proScore: 2.56, coverage: 0.5,
      price: 270.76, weeklyPrices: [276.96, 274.52, 269.86, 269.22, 270.76], weeklyChange: -2.24, sortRank: 0, periodReturns: { '1M': -5.6, '6M': 69.5, '1Y': 269.7 },
      priceHistory: { '1W': [276.96, 274.52, 269.86, 269.22, 270.76], '1M': [286.69, 297.17, 286.89, 290.46, 297.98, 302.73, 298.22, 266.92, 268.73, 256.72, 249.71, 254.75, 260.4, 270.01, 276.25, 280.13, 276.96, 274.52, 269.86, 269.22, 270.76], '6M': [159.74, 172.82, 164.18, 176.17, 172.78, 187.43, 200.11, 205.17, 215.59, 229.32, 235.3, 234.4, 213.65, 191.81, 205.11, 214.98, 197.83, 210.32, 237.34, 257.41, 249.82, 297.17, 298.22, 249.71, 280.13, 270.76], '1Y': [73.23, 79.57, 87.35, 91.58, 98.83, 102.3, 101.32, 107.07, 125.91, 131.1, 134.58, 128.41, 140.42, 143.06, 148.32, 150.97, 142.72, 142.44, 142.94, 148.88, 148.25, 152.46, 154.86, 153.75, 144.89, 152.69, 163.19, 175.36, 166.55, 176.45, 175.77, 188, 200.11, 205.17, 215.59, 229.32, 235.3, 234.4, 213.65, 198.5, 209.52, 222.04, 197.98, 228.29, 236.04, 257.41, 249.82, 297.17, 298.22, 249.71, 280.13, 270.76] },
      velocityScore: { '1D': -30.8, '1W': -29.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 65.4, revenueGrowth: 17, eps: 4.14, grossMargin: 39, dividendYield: 0.1,
      etfPresence: { POW: 3.09, VOLT: 7.15, PBD: false, PBW: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 2, avgWeight: 5.05, proScore: 2.53, coverage: 0.5,
      price: 705.13, weeklyPrices: [730.10, 711.73, 687.48, 706.06, 705.13], weeklyChange: -3.42, sortRank: 0, periodReturns: { '1M': -6.9, '6M': 54.6, '1Y': 97.8 },
      priceHistory: { '1W': [730.1, 711.73, 687.48, 706.06, 705.13], '1M': [757.34, 771.61, 785.24, 750.73, 745, 781.38, 765.81, 773.72, 780.08, 769.99, 714.13, 709.93, 716.91, 723.44, 742.18, 733.62, 730.1, 711.73, 687.48, 706.06, 705.13], '6M': [456.02, 462.21, 414.25, 433.58, 439.68, 422.57, 466.75, 470.77, 477.77, 514.56, 525.13, 568.21, 566, 568.04, 574.02, 567.45, 533.78, 555.57, 594.4, 605.89, 630.94, 771.61, 765.81, 714.13, 733.62, 705.13], '1Y': [356.49, 348.76, 358.62, 374.07, 373.41, 380.09, 397.9, 405.11, 411.11, 387.5, 379.96, 375.87, 381.56, 376.09, 389.64, 390.65, 400.41, 420.86, 429.92, 437.52, 412.21, 448.69, 453.45, 449.42, 445.47, 460.43, 464.84, 466.91, 421.31, 432.67, 435.82, 432.66, 466.75, 470.77, 477.77, 514.56, 525.13, 568.21, 566, 564.05, 571.64, 578.44, 549.02, 576.24, 591.82, 605.89, 630.94, 771.61, 765.81, 714.13, 733.62, 705.13] },
      velocityScore: { '1D': -28.5, '1W': -31.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$106B', pe: 97, revenueGrowth: 26, eps: 7.27, grossMargin: 15, dividendYield: 0.06,
      etfPresence: { POW: 4.65, VOLT: 5.46, PBD: false, PBW: false },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 2, avgWeight: 4.81, proScore: 2.41, coverage: 0.5,
      price: 416.47, weeklyPrices: [401.94, 400.60, 400.08, 417.62, 416.47], weeklyChange: 3.62, sortRank: 0, periodReturns: { '1M': -1.4, '6M': 24.1, '1Y': 27.8 },
      priceHistory: { '1W': [401.94, 400.6, 400.08, 417.62, 416.47], '1M': [422.44, 410.86, 421.39, 399.15, 401.51, 419, 401.53, 406.94, 408.1, 399.44, 371.88, 379.69, 381.51, 391.35, 403.13, 406.37, 401.94, 400.6, 400.08, 417.62, 416.47], '6M': [335.57, 353.45, 315.82, 323.67, 327.31, 324.51, 343.75, 332.28, 359.44, 377.06, 391.49, 374.56, 355.56, 353.87, 361.04, 359.74, 343.53, 368.85, 401.9, 409.7, 413.07, 410.86, 401.53, 371.88, 406.37, 416.47], '1Y': [325.84, 324.24, 330.51, 342.35, 358.19, 357.64, 380.72, 380.24, 390.09, 358.16, 357.49, 346.22, 351.4, 348.22, 360.08, 371.27, 364.74, 376.76, 377.19, 375.59, 360.6, 387.75, 385.44, 369.4, 345.65, 341.69, 338.93, 350.36, 315.95, 322.17, 322.26, 329.1, 343.75, 332.28, 359.44, 377.06, 391.49, 374.56, 355.56, 361.06, 363.95, 374.1, 357.67, 385.58, 395.06, 409.7, 413.07, 410.86, 401.53, 371.88, 406.37, 416.47] },
      velocityScore: { '1D': -27.2, '1W': -24.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$162B', pe: 40.7, revenueGrowth: 17, eps: 10.23, grossMargin: 37, dividendYield: 1.05,
      etfPresence: { POW: 4.09, VOLT: 5.53, PBD: false, PBW: false },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'BE', name: 'BLOOM ENERGY CORP', easyScore: 3, avgWeight: 2.8, proScore: 2.1, coverage: 0.75,
      price: 285.69, weeklyPrices: [290.01, 285.00, 273.51, 302.85, 285.69], weeklyChange: -1.49, sortRank: 0, periodReturns: { '1M': -1, '6M': 178.7, '1Y': 1299.8 },
      priceHistory: { '1W': [290.01, 285, 273.51, 302.85, 285.69], '1M': [288.64, 295.25, 285.47, 258.64, 261.03, 283.92, 280.69, 289.76, 303.41, 275.95, 261.34, 282.31, 307.88, 302.49, 302.4, 293.8, 290.01, 285, 273.51, 302.85, 285.69], '6M': [102.5, 101.29, 76.97, 91.88, 98.69, 134.07, 149.5, 139.62, 156.13, 155.17, 145.32, 166.2, 153.02, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 261.34, 293.8, 285.69], '1Y': [20.41, 21.63, 21.34, 21.6, 22.56, 25.85, 24.31, 26.89, 37.62, 38.86, 44.08, 44.51, 50.85, 54.91, 67.29, 80.97, 68.69, 88, 86.65, 115.09, 94.37, 133.71, 141.41, 126.72, 108.93, 101.14, 118.09, 108.99, 80.21, 90.18, 103.87, 136.87, 149.5, 139.62, 156.13, 155.17, 145.32, 166.2, 153.02, 154, 160.05, 145.88, 135.49, 146.78, 213.84, 220.91, 226.37, 295.25, 280.69, 261.34, 293.8, 285.69] },
      velocityScore: { '1D': -6.7, '1W': -13.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$81B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: false, VOLT: 4.7, PBD: 1.6, PBW: 2.11 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 2, avgWeight: 3.62, proScore: 1.81, coverage: 0.5,
      price: 967.37, weeklyPrices: [996.00, 968.32, 950.54, 969.67, 967.37], weeklyChange: -2.87, sortRank: 0, periodReturns: { '1M': -9.9, '6M': 60.7, '1Y': 96.2 },
      priceHistory: { '1W': [996, 968.32, 950.54, 969.67, 967.37], '1M': [1073.95, 1095.21, 1118.96, 1045.63, 1040.15, 1073.08, 1071.98, 1062.57, 1090.53, 1049.23, 1011.8, 1024.52, 1043.82, 1038.74, 1070.47, 1031.89, 996, 968.32, 950.54, 969.67, 967.37], '6M': [601.97, 723, 614.19, 667.32, 679.55, 622.5, 681.55, 665.99, 754.97, 801.54, 819.15, 879.73, 842, 830.1, 827.37, 882.64, 817.35, 910.75, 987.5, 991.3, 1088.93, 1095.21, 1071.98, 1011.8, 1031.89, 967.37], '1Y': [492.97, 465.31, 488.66, 502.67, 505.07, 539.36, 570.17, 629.03, 655, 664.55, 634.31, 604.59, 622.39, 598.81, 634.15, 611, 607.52, 606.23, 634.27, 602, 576, 577.97, 559.7, 575.4, 595.37, 589.72, 629.11, 704.2, 639.43, 663.46, 680.86, 639.77, 681.55, 665.99, 754.97, 801.54, 819.15, 879.73, 842, 839.2, 844.05, 909.41, 872.9, 936.07, 985.92, 991.3, 1088.93, 1095.21, 1071.98, 1011.8, 1031.89, 967.37] },
      velocityScore: { '1D': -29, '1W': -34.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$260B', pe: 28.3, revenueGrowth: 16, eps: 34.23, grossMargin: 20, dividendYield: 0.21,
      etfPresence: { POW: 3.25, VOLT: 3.98, PBD: false, PBW: false },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 2, avgWeight: 3.58, proScore: 1.79, coverage: 0.5,
      price: 172.03, weeklyPrices: [164.87, 166.99, 171.55, 173.39, 172.03], weeklyChange: 4.35, sortRank: 0, periodReturns: { '1M': 5.7, '6M': 63.9, '1Y': 159.8 },
      priceHistory: { '1W': [164.87, 166.99, 171.55, 173.39, 172.03], '1M': [162.69, 169.41, 172.49, 166.73, 169.95, 173.39, 170.74, 172.91, 173.96, 169.01, 158.23, 161.86, 163.57, 164.66, 169.29, 167.8, 164.87, 166.99, 171.55, 173.39, 172.03], '6M': [104.97, 108.87, 94.99, 103.97, 106.82, 105.38, 112.5, 110.58, 115.79, 114.62, 115.22, 118.22, 111.65, 108.13, 114.3, 121, 112.75, 118.92, 134.48, 137, 138.3, 169.41, 170.74, 158.23, 167.8, 172.03], '1Y': [66.22, 67.96, 69.83, 72, 73.44, 74.67, 77.23, 76.63, 78.72, 90.24, 90.61, 88.04, 91.11, 91.93, 95.71, 98.65, 96.6, 99.43, 97.73, 100.54, 96.93, 106.28, 112.5, 111.46, 105.74, 106.53, 108.27, 109.15, 98.28, 104.18, 106.61, 106.39, 112.5, 110.58, 115.79, 114.62, 115.22, 118.22, 111.65, 109.13, 114.71, 125.61, 118.28, 127.11, 131.38, 137, 138.3, 169.41, 170.74, 158.23, 167.8, 172.03] },
      velocityScore: { '1D': -29.5, '1W': -26, '1M': null, '6M': null }, isNew: false,
      marketCap: '$28B', pe: 58.3, revenueGrowth: 54, eps: 2.95, grossMargin: 37, dividendYield: 0.48,
      etfPresence: { POW: 3.93, VOLT: 3.24, PBD: false, PBW: false },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 2, avgWeight: 3.04, proScore: 1.52, coverage: 0.5,
      price: 484.88, weeklyPrices: [473.93, 473.61, 462.93, 480.46, 484.88], weeklyChange: 2.31, sortRank: 0, periodReturns: { '1M': -6, '6M': 12.9, '1Y': 24.3 },
      priceHistory: { '1W': [473.93, 473.61, 462.93, 480.46, 484.88], '1M': [516, 507.81, 502.34, 493.04, 492.58, 490.16, 485.98, 483.79, 482.03, 479.97, 461.5, 463.32, 460.98, 475.01, 478.05, 484.25, 473.93, 473.61, 462.93, 480.46, 484.88], '6M': [429.34, 448.18, 429.68, 456.28, 463.03, 470.53, 489.31, 486.82, 495.59, 506.14, 524.25, 526.75, 488.49, 487.76, 472.64, 489.07, 472.07, 499.31, 545.62, 549.11, 544.71, 507.81, 485.98, 461.5, 484.25, 484.88], '1Y': [390.07, 388.09, 391.22, 399.06, 415.12, 422.26, 437.23, 434.95, 437.44, 423.57, 443.95, 429.96, 446.06, 437.16, 450.93, 440.1, 420.44, 423.42, 418.89, 428.82, 422.63, 472.57, 468.06, 453, 419.09, 428.47, 437.71, 462.82, 434.85, 454.94, 465.48, 472.88, 489.31, 486.82, 495.59, 506.14, 524.25, 526.75, 488.49, 478.06, 471.22, 505.62, 490.74, 527.21, 526.94, 549.11, 544.71, 507.81, 485.98, 461.5, 484.25, 484.88] },
      velocityScore: { '1D': -27.6, '1W': -27.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 28.7, revenueGrowth: 11, eps: 16.91, grossMargin: 36, dividendYield: 1.18,
      etfPresence: { POW: 2.79, VOLT: 3.28, PBD: false, PBW: false },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 2, avgWeight: 2.95, proScore: 1.48, coverage: 0.5,
      price: 86.09, weeklyPrices: [87.25, 87.01, 83.66, 85.68, 86.09], weeklyChange: -1.32, sortRank: 0, periodReturns: { '1M': -9.9, '6M': 1.3, '1Y': 21.3 },
      priceHistory: { '1W': [87.25, 87.01, 83.66, 85.68, 86.09], '1M': [95.51, 96.28, 95.39, 93.32, 93.1, 94.84, 94.59, 94.85, 95.68, 93.36, 90.06, 88.27, 89.69, 88.55, 87.65, 87.65, 87.25, 87.01, 83.66, 85.68, 86.09], '6M': [84.95, 81.27, 80.29, 80.45, 80.93, 79.89, 83.63, 85.47, 86.33, 89.48, 92.71, 95.68, 92.59, 92.01, 92.82, 90.23, 92.05, 93.67, 91.31, 90.6, 96.51, 96.28, 94.59, 90.06, 87.65, 86.09], '1Y': [70.95, 72.81, 71.86, 70.34, 73.02, 74.64, 75.18, 72.82, 70.99, 70.54, 72.3, 76.18, 73.89, 70.87, 71.32, 70.79, 74.65, 78.18, 83.71, 85.05, 82.84, 81.76, 82.14, 85.89, 84.27, 85.54, 83.39, 81.21, 80.85, 80.41, 81.32, 81.12, 83.63, 85.47, 86.33, 89.48, 92.71, 95.68, 92.59, 91.54, 92.53, 91.62, 92.88, 94.17, 91.24, 90.6, 96.51, 96.28, 94.59, 90.06, 87.65, 86.09] },
      velocityScore: { '1D': -28.8, '1W': -29.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$180B', pe: 21.9, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.91,
      etfPresence: { POW: 1.93, VOLT: 3.97, PBD: false, PBW: false },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'VICR', name: 'Vicor Corp', easyScore: 1, avgWeight: 5.72, proScore: 1.43, coverage: 0.25,
      price: 328.73, weeklyPrices: [342.09, 334.84, 328.85, 332.95, 328.73], weeklyChange: -3.91, sortRank: 0, periodReturns: { '1M': 31, '6M': 254.2, '1Y': 649 },
      priceHistory: { '1W': [342.09, 334.84, 328.85, 332.95, 328.73], '1M': [251.02, 266.01, 280.34, 261.34, 256.47, 312.96, 292.53, 309.27, 290.54, 273.67, 243.43, 264.2, 268.29, 267.99, 332.95, 345.84, 342.09, 334.84, 328.85, 332.95, 328.73], '6M': [92.82, 100.83, 97.19, 108.46, 116.86, 142.31, 149.88, 158.46, 165.35, 159.04, 157.28, 190.3, 201.97, 170.03, 185.42, 173.07, 142.22, 159.83, 190.1, 246.24, 248.7, 266.01, 292.53, 243.43, 345.84, 328.73], '1Y': [43.89, 45.79, 44.25, 46.05, 45.85, 47.06, 48.39, 52.68, 45.81, 46.13, 49.48, 46.49, 51.32, 51.9, 50.96, 53.84, 52.14, 48.88, 52.62, 60.47, 85.76, 91.17, 94.88, 94.35, 85.07, 89.54, 94.54, 100.97, 98.29, 111.02, 133.64, 139.12, 149.88, 158.46, 165.35, 159.04, 157.28, 190.3, 201.97, 175.8, 196.33, 180.5, 161, 179.99, 194.2, 246.24, 248.7, 266.01, 292.53, 243.43, 345.84, 328.73] },
      velocityScore: { '1D': -49.3, '1W': -48.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 109.9, revenueGrowth: 20, eps: 2.99, grossMargin: 54, dividendYield: null,
      etfPresence: { POW: 5.72, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Vicor Corp is a power conversion specialist — high-efficiency modules for AI server power delivery. It holds a niche position in Industrials ETFs on the data center power density thesis. Revenue growth has been lumpy, but when AI GPU clusters require Vicor\'s factorized power architecture, the order cycles are large.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 2.74, proScore: 1.37, coverage: 0.5,
      price: 128.98, weeklyPrices: [127.76, 126.67, 123.79, 127.11, 128.98], weeklyChange: 0.95, sortRank: 0, periodReturns: { '1M': -4.2, '6M': 9.2, '1Y': 25.4 },
      priceHistory: { '1W': [127.76, 126.67, 123.79, 127.11, 128.98], '1M': [134.66, 137.04, 132.56, 131.76, 130.16, 130.7, 131.94, 127.95, 128.6, 125.15, 128.92, 128.87, 129.61, 131.59, 130.9, 129.57, 127.76, 126.67, 123.79, 127.11, 128.98], '6M': [118.06, 114.16, 114.71, 115.31, 115.81, 116.91, 119.96, 118.02, 118.33, 121.1, 130.24, 132.39, 131.92, 131.86, 134.15, 127.92, 131.12, 132.92, 135.46, 131.89, 135.59, 137.04, 131.94, 128.92, 129.57, 128.98], '1Y': [102.83, 101.87, 101.62, 101.41, 103.26, 106.04, 105.93, 108.89, 113.25, 113.49, 113.11, 113.55, 112.89, 108.64, 108.74, 106.44, 107.86, 113.46, 116.91, 117.53, 117.27, 122.11, 119.76, 122.68, 121.71, 122.72, 118.04, 114.26, 115.58, 115.67, 114.07, 116.57, 119.96, 118.02, 118.33, 121.1, 130.24, 132.39, 131.92, 132.31, 133.62, 128.8, 131.08, 134.71, 134.39, 131.89, 135.59, 137.04, 131.94, 128.92, 129.57, 128.98] },
      velocityScore: { '1D': -29, '1W': -30.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 19.1, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.99,
      etfPresence: { POW: 1.33, VOLT: 4.15, PBD: false, PBW: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.5, proScore: 1.25, coverage: 0.5,
      price: 146.49, weeklyPrices: [147.68, 148.76, 146.34, 148.40, 146.49], weeklyChange: -0.81, sortRank: 0, periodReturns: { '1M': 3.9, '6M': 5.7, '1Y': 59.8 },
      priceHistory: { '1W': [147.68, 148.76, 146.34, 148.4, 146.49], '1M': [141.03, 136.69, 138.47, 136.62, 128.03, 122.47, 127.87, 124.64, 129.19, 125, 119.2, 123.05, 124.86, 132.06, 139.56, 140.24, 147.68, 148.76, 146.34, 148.4, 146.49], '6M': [138.65, 138.68, 126.51, 137.94, 139.71, 140.16, 154.39, 155.56, 144.93, 144.2, 148.57, 151.5, 129.58, 136.06, 136.8, 130.67, 119.15, 128.38, 148.72, 151.93, 143.72, 136.69, 127.87, 119.2, 140.24, 146.49], '1Y': [91.68, 92.49, 92.8, 97.02, 98.52, 98.31, 101.96, 100.71, 105.49, 109.5, 109.83, 108.65, 110.13, 112.75, 119.47, 122.07, 122.33, 123.58, 126.25, 127.36, 128.93, 139.75, 138.87, 141.92, 136.66, 138.72, 139.46, 139.09, 129.61, 137.43, 139.88, 145.11, 154.39, 155.56, 144.93, 144.2, 148.57, 151.5, 129.58, 136.74, 135.12, 127.96, 126.35, 135.32, 146.98, 151.93, 143.72, 136.69, 127.87, 119.2, 140.24, 146.49] },
      velocityScore: { '1D': -30.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$180B', pe: 42, revenueGrowth: 58, eps: 3.49, grossMargin: 38, dividendYield: 0.67,
      etfPresence: { POW: 0.92, VOLT: 4.09, PBD: false, PBW: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.44, proScore: 1.22, coverage: 0.5,
      price: 315.46, weeklyPrices: [317.08, 302.18, 294.65, 312.28, 315.46], weeklyChange: -0.51, sortRank: 0, periodReturns: { '1M': -18.5, '6M': 47.8, '1Y': 165.6 },
      priceHistory: { '1W': [317.08, 302.18, 294.65, 312.28, 315.46], '1M': [387.03, 345.63, 360.81, 351.94, 357.24, 354.97, 339.42, 339.19, 344.6, 323.46, 302.84, 313.05, 323.79, 324.86, 339.65, 328.34, 317.08, 302.18, 294.65, 312.28, 315.46], '6M': [213.44, 221.47, 204.49, 217.23, 221.99, 219.59, 253.86, 263.03, 261.82, 279.17, 314.12, 335.74, 322.47, 305.02, 308.31, 329.78, 298.29, 339.32, 385.73, 385, 369.08, 345.63, 339.42, 302.84, 328.34, 315.46], '1Y': [118.79, 126.91, 124.54, 133.28, 137.55, 143.62, 142.73, 142.84, 144.07, 139.81, 162.52, 147.74, 153.73, 150.14, 159.52, 169.75, 167.35, 178.08, 179.98, 192.22, 190.46, 208.05, 225.8, 212.79, 198.89, 209.9, 214.65, 224.11, 208.77, 217.86, 227.65, 227.59, 253.86, 263.03, 261.82, 279.17, 314.12, 335.74, 322.47, 311.39, 315.91, 356.38, 322.71, 366.95, 374.32, 385, 369.08, 345.63, 339.42, 302.84, 328.34, 315.46] },
      velocityScore: { '1D': -26.9, '1W': -33.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 65.6, revenueGrowth: 26, eps: 4.81, grossMargin: 39, dividendYield: 0.13,
      etfPresence: { POW: 0.93, VOLT: 3.95, PBD: false, PBW: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'BLDP', name: 'Ballard Power Systems Inc', easyScore: 2, avgWeight: 2.38, proScore: 1.19, coverage: 0.5,
      price: 6.09, weeklyPrices: [6.19, 6.29, 6.30, 6.38, 6.09], weeklyChange: -1.62, sortRank: 0, periodReturns: { '1M': 85.1, '6M': 128.1, '1Y': 368.5 },
      priceHistory: { '1W': [6.19, 6.29, 6.3, 6.38, 6.09], '1M': [3.29, 4.33, 4.78, 4.7, 4.13, 4.17, 4.16, 4.14, 4.13, 4.45, 4.18, 4.76, 5.43, 5.54, 5.94, 6.09, 6.19, 6.29, 6.3, 6.38, 6.09], '6M': [2.67, 2.78, 2.53, 2.69, 2.68, 2.76, 2.79, 2.56, 2.31, 2.17, 2.14, 2.12, 2.07, 1.99, 2.53, 2.51, 2.3, 2.4, 2.94, 3.1, 3.1, 4.33, 4.16, 4.18, 6.09, 6.09], '1Y': [1.3, 1.67, 1.57, 1.4, 1.67, 1.94, 1.84, 2.02, 1.83, 1.83, 1.87, 1.9, 2.02, 1.85, 2.05, 2.62, 2.93, 2.87, 3.59, 3.67, 3.28, 3.54, 3.65, 3.43, 2.85, 2.78, 2.8, 2.89, 2.63, 2.63, 2.76, 2.79, 2.79, 2.56, 2.31, 2.17, 2.14, 2.12, 2.07, 1.97, 2.68, 2.46, 2.42, 2.6, 3.07, 3.1, 3.1, 4.33, 4.16, 4.18, 6.09, 6.09] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$2B', pe: null, revenueGrowth: 26, eps: -0.27, grossMargin: 11, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: 2.26, PBW: 2.5 },
      tonyNote: 'Ballard Power Systems is a hydrogen fuel cell technology company. It appears in Electrification ETFs as a long-duration bet on hydrogen as a zero-carbon fuel for heavy industry and transit. Revenue is small, the company is pre-profitability, and the weight is minimal — this is a thematic placeholder allocation, not a fundamental position.',
    },
    {
      ticker: 'PRY', name: 'Prysmian SpA', easyScore: 1, avgWeight: 4.54, proScore: 1.14, coverage: 0.25,
      price: 0, weeklyPrices: [0.00], weeklyChange: 0, sortRank: 0, periodReturns: { '1M': 0, '6M': 0, '1Y': 0 },
      priceHistory: undefined,
      velocityScore: { '1D': -47.9, '1W': -46.7, '1M': null, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { POW: 4.54, VOLT: false, PBD: false, PBW: false },
      tonyNote: 'Prysmian SpA appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 4.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'XEL', name: 'Xcel Energy Inc', easyScore: 2, avgWeight: 1.9, proScore: 0.95, coverage: 0.5,
      price: 78.83, weeklyPrices: [79.26, 79.50, 76.41, 77.87, 78.83], weeklyChange: -0.54, sortRank: 0, periodReturns: { '1M': -2.9, '6M': 0.6, '1Y': 13.7 },
      priceHistory: { '1W': [79.26, 79.5, 76.41, 77.87, 78.83], '1M': [81.17, 81.45, 80.55, 80.43, 79.39, 80.6, 79.9, 79.91, 80.03, 77.92, 79.73, 79.86, 80.2, 81.08, 80.78, 81, 79.26, 79.5, 76.41, 77.87, 78.83], '6M': [78.39, 74.62, 73.14, 74.09, 74.68, 74.26, 75.61, 75.73, 74.5, 76.43, 80.75, 83.91, 83.17, 82.1, 81.63, 76.95, 79.17, 80.54, 79.83, 79.08, 79.48, 81.45, 79.9, 79.73, 81, 78.83], '1Y': [69.33, 68.96, 65.65, 67.32, 67.56, 68.45, 69.65, 72.5, 72.39, 73.3, 72.92, 73.17, 72.87, 72.24, 72.85, 72.17, 77.25, 79.6, 81.26, 81.1, 80.69, 79.69, 81.19, 80.72, 79.67, 81.25, 77.77, 74.68, 73.61, 74.42, 74.07, 74, 75.61, 75.73, 74.5, 76.43, 80.75, 83.91, 83.17, 81.88, 81.41, 77.96, 79.44, 81.46, 78.65, 79.08, 79.48, 81.45, 79.9, 79.73, 81, 78.83] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$49B', pe: 22.7, revenueGrowth: 3, eps: 3.47, grossMargin: 46, dividendYield: 3.04,
      etfPresence: { POW: 1.88, VOLT: 1.91, PBD: false, PBW: false },
      tonyNote: 'Xcel Energy Inc appears in 2 of 4 Electrification ETFs (50% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'FCEL', name: 'FuelCell Energy Inc', easyScore: 1, avgWeight: 3.7, proScore: 0.93, coverage: 0.25,
      price: 22.01, weeklyPrices: [24.39, 21.66, 21.31, 24.64, 22.01], weeklyChange: -9.76, sortRank: 0, periodReturns: { '1M': 69, '6M': 206.5, '1Y': 290.9 },
      priceHistory: { '1W': [24.39, 21.66, 21.31, 24.64, 22.01], '1M': [13.02, 13.55, 12.81, 12.28, 13.7, 15.94, 17.09, 19.92, 21.6, 21.36, 17.36, 20.22, 26.38, 25.01, 24.4, 23.69, 24.39, 21.66, 21.31, 24.64, 22.01], '6M': [7.18, 8.46, 7.9, 8.77, 8.17, 7.58, 8.04, 9.09, 7.35, 7.45, 7.28, 8.93, 7.93, 7.38, 6.91, 6.71, 6.23, 6.27, 7.3, 9.49, 9.94, 13.55, 17.09, 17.36, 23.69, 22.01], '1Y': [5.63, 6.72, 5.9, 5.8, 5.32, 5.74, 5.16, 5.89, 4.69, 4.41, 4.26, 3.93, 4.36, 3.92, 6.46, 8.33, 7.88, 8.68, 9.88, 9.3, 7.81, 8.18, 8.49, 7.71, 6.52, 6.22, 8.06, 8.75, 9.64, 8.48, 8.24, 7.55, 8.04, 9.09, 7.35, 7.45, 7.28, 8.93, 7.93, 7.05, 7.03, 6.94, 6.53, 6.41, 7.53, 9.49, 9.94, 13.55, 17.09, 17.36, 23.69, 22.01] },
      velocityScore: { '1D': -44, '1W': -51.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1B', pe: null, revenueGrowth: 61, eps: -6.49, grossMargin: -16, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 3.7 },
      tonyNote: 'FuelCell Energy Inc appears in 1 of 4 Electrification ETFs (25% coverage) with average weight 3.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MOD', name: 'MODINE MANUFACTURING CO', easyScore: 1, avgWeight: 3.66, proScore: 0.92, coverage: 0.25,
      price: 306.61, weeklyPrices: [270.70, 278.91, 288.52, 306.89, 306.61], weeklyChange: 13.27, sortRank: 0, periodReturns: { '1M': 18, '6M': 94.7, '1Y': 230.5 },
      priceHistory: { '1W': [270.7, 278.91, 288.52, 306.89, 306.61], '1M': [259.76, 271.6, 274.22, 269.65, 273, 284.8, 276.27, 279.2, 292.16, 271.26, 244.49, 257.33, 250.11, 260.52, 295.88, 279.93, 270.7, 278.91, 288.52, 306.89, 306.61], '6M': [157.46, 162.66, 128.39, 137.59, 140.81, 125.14, 136.88, 148.49, 196.07, 219.13, 216.84, 236.7, 212.32, 201.07, 197.95, 211.47, 202.18, 214, 253.66, 247.49, 237.06, 271.6, 276.27, 244.49, 279.93, 306.61], '1Y': [92.78, 91.93, 94.03, 102.34, 102.22, 92.65, 97.47, 98.8, 113.62, 136.59, 141.72, 134.93, 140.42, 135.99, 146.85, 158.57, 135.92, 147.82, 149.06, 160.43, 148.3, 155.26, 151.21, 147.4, 141.51, 158.97, 159.91, 165.19, 133.92, 137.65, 140.44, 127.23, 136.88, 148.49, 196.07, 219.13, 216.84, 236.7, 212.32, 201.27, 196.09, 228.58, 216.71, 234.84, 238.14, 247.49, 237.06, 271.6, 276.27, 244.49, 279.93, 306.61] },
      velocityScore: { '1D': -48, '1W': -47.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$16B', pe: 135.1, revenueGrowth: 48, eps: 2.27, grossMargin: 23, dividendYield: null,
      etfPresence: { POW: false, VOLT: 3.66, PBD: false, PBW: false },
      tonyNote: 'Modine Manufacturing is a thermal management company — heat exchangers and liquid cooling systems for data centers and industrial applications. It holds a position in Industrials ETFs as a direct beneficiary of the AI server cooling challenge. Revenue grew materially as data center customers upgraded from air to liquid cooling; the growth runway remains substantial.',
    },
    {
      ticker: 'OGE', name: 'OGE ENERGY CORP', easyScore: 1, avgWeight: 3.65, proScore: 0.91, coverage: 0.25,
      price: 47.15, weeklyPrices: [47.38, 47.23, 45.66, 46.61, 47.15], weeklyChange: -0.49, sortRank: 0, periodReturns: { '1M': -1.4, '6M': 6.6, '1Y': 6.6 },
      priceHistory: { '1W': [47.38, 47.23, 45.66, 46.61, 47.15], '1M': [47.84, 47.84, 47.73, 47.33, 47.35, 47.4, 47.64, 47.34, 47.51, 46.27, 48.05, 47.9, 48.1, 48.54, 48.41, 48.18, 47.38, 47.23, 45.66, 46.61, 47.15], '6M': [44.25, 42.89, 43.07, 42.99, 42.88, 42.83, 43.64, 43.27, 43.08, 44.3, 46.9, 48.39, 48.82, 47.93, 48.39, 46.65, 47.89, 49.01, 48.84, 46.5, 47.59, 47.84, 47.64, 48.05, 48.18, 47.15], '1Y': [44.24, 44, 43.9, 43.75, 44.23, 44.52, 44.11, 44.98, 44.89, 45.61, 45.65, 45.27, 45.27, 44.3, 44.2, 43.87, 45.09, 45.45, 45.35, 46.43, 46.45, 44.41, 44.05, 45.63, 44.08, 45.5, 43.49, 42.62, 43.27, 42.78, 42.18, 42.49, 43.64, 43.27, 43.08, 44.3, 46.9, 48.39, 48.82, 47.59, 48.2, 47.02, 47.96, 49.32, 48.55, 46.5, 47.59, 47.84, 47.64, 48.05, 48.18, 47.15] },
      velocityScore: { '1D': -50.5, '1W': -51.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 21, revenueGrowth: 1, eps: 2.25, grossMargin: 44, dividendYield: 3.65,
      etfPresence: { POW: false, VOLT: 3.65, PBD: false, PBW: false },
      tonyNote: 'OGE Energy is a regional Oklahoma utility held in Electrification ETFs. Revenue is regulated, dividend yield is the primary return driver, and the load growth thesis is less prominent than for AEP or NEE. The ETF allocation is defensive — utilities in electrification ETFs serve as yield anchors alongside the higher-growth infrastructure names.',
    },
    {
      ticker: 'HYLN', name: 'Hyliion Holdings Corp', easyScore: 1, avgWeight: 3.6, proScore: 0.9, coverage: 0.25,
      price: 6.34, weeklyPrices: [7.19, 6.99, 6.25, 6.79, 6.34], weeklyChange: -11.82, sortRank: 0, periodReturns: { '1M': 200.5, '6M': 235.4, '1Y': 317.1 },
      priceHistory: { '1W': [7.19, 6.99, 6.25, 6.79, 6.34], '1M': [2.11, 2.31, 2.39, 2.47, 2.46, 2.76, 2.68, 3.59, 3.69, 4.67, 4.09, 4.09, 4.2, 5.99, 6.6, 6.94, 7.19, 6.99, 6.25, 6.79, 6.34], '6M': [1.89, 1.94, 1.76, 1.98, 1.82, 1.94, 2.23, 2.1, 2.1, 2.14, 2.05, 1.99, 2.02, 1.97, 1.98, 1.9, 1.66, 1.7, 1.9, 1.89, 1.81, 2.31, 2.68, 4.09, 6.94, 6.34], '1Y': [1.52, 1.58, 1.42, 1.34, 1.4, 1.43, 1.58, 1.81, 1.55, 1.51, 1.66, 1.53, 1.69, 1.64, 1.63, 1.99, 2.18, 2.02, 2.32, 2.27, 2.02, 2.27, 2.18, 1.9, 1.66, 1.85, 1.98, 2.01, 1.82, 2, 1.92, 1.98, 2.23, 2.1, 2.1, 2.14, 2.05, 1.99, 2.02, 2.01, 1.93, 1.83, 1.76, 1.78, 1.94, 1.89, 1.81, 2.31, 2.68, 4.09, 6.94, 6.34] },
      velocityScore: { '1D': -47.7, '1W': -51.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1B', pe: null, revenueGrowth: 479, eps: -0.3, grossMargin: 6, dividendYield: null,
      etfPresence: { POW: false, VOLT: false, PBD: false, PBW: 3.6 },
      tonyNote: 'Hyliion is a small-cap commercial truck powertrain electrification company. It holds a speculative position in Electrification ETFs on the heavy-duty vehicle decarbonization thesis. Revenue is early-stage and the path to profitability is long; the ETF weight is small, reflecting a lottery-ticket allocation to an electrification theme adjacent holding.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 5.5, proScore: 2.2, coverage: 0.4,
      price: 899.68, weeklyPrices: [842.96, 860.84, 845.39, 875.52, 899.68], weeklyChange: 6.73, sortRank: 0, periodReturns: { '1M': 69.9, '6M': 178.1, '1Y': 363.2 },
      priceHistory: { '1W': [842.96, 860.84, 845.39, 875.52, 899.68], '1M': [529.49, 806, 886.22, 811.41, 844.8, 868.18, 851.35, 854.28, 889.03, 848.84, 728.29, 752, 733.77, 732.94, 783.53, 782.12, 842.96, 860.84, 845.39, 875.52, 899.68], '6M': [323.46, 331.61, 283.57, 314, 319.16, 308.13, 350.96, 361.21, 367.95, 418.61, 421.2, 459.72, 415.51, 411.38, 417.76, 422.55, 382.55, 382.22, 464.54, 472.84, 471.85, 806, 851.35, 728.29, 782.12, 899.68], '1Y': [194.23, 198.37, 221.36, 224.64, 228.72, 236.29, 250.69, 253.14, 263.35, 299.42, 292.47, 274.89, 289.36, 288.68, 316.16, 348.58, 338.44, 351.66, 355.53, 361.02, 332.75, 403.35, 411.07, 380.7, 334.17, 339.75, 332.29, 340.51, 302.3, 316.55, 327.11, 307.58, 350.96, 361.21, 367.95, 418.61, 421.2, 459.72, 415.51, 411.53, 425.51, 446.16, 407.27, 423.35, 456.08, 472.84, 471.85, 806, 851.35, 728.29, 782.12, 899.68] },
      velocityScore: { '1D': -35.7, '1W': -55.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$28B', pe: 80.3, revenueGrowth: 92, eps: 11.21, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 6.47, PRN: 4.54, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 5.3, proScore: 2.12, coverage: 0.4,
      price: 285.77, weeklyPrices: [288.90, 284.42, 288.12, 299.07, 285.77], weeklyChange: -1.08, sortRank: 0, periodReturns: { '1M': 5.9, '6M': 165, '1Y': 393.9 },
      priceHistory: { '1W': [288.9, 284.42, 288.12, 299.07, 285.77], '1M': [269.95, 294.69, 320.3, 305.93, 309.39, 322.05, 308.05, 300.84, 296.98, 292.65, 261.58, 271.05, 270.75, 279.22, 291.97, 295.94, 288.9, 284.42, 288.12, 299.07, 285.77], '6M': [107.83, 119.95, 105.77, 112.06, 117.51, 121.83, 139.99, 141.15, 146.79, 187.3, 187.21, 186.39, 170.37, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 261.58, 295.94, 285.77], '1Y': [57.87, 61.92, 60.3, 63.42, 72.84, 70.96, 78.84, 78.32, 76.88, 75.95, 86.57, 82.17, 91.46, 90.24, 97.47, 101.43, 94.58, 102.51, 103.18, 112.77, 110.96, 136.12, 131.92, 118.74, 95.1, 107.26, 112.31, 120.91, 109.59, 113.62, 120.46, 128.85, 139.99, 141.15, 146.79, 187.3, 187.21, 186.39, 170.37, 176.51, 174.04, 186.82, 180.36, 218.07, 229.73, 240.97, 255.56, 294.69, 308.05, 261.58, 295.94, 285.77] },
      velocityScore: { '1D': -36.3, '1W': 14, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 55.9, revenueGrowth: 7, eps: 5.11, grossMargin: 30, dividendYield: 0.12,
      etfPresence: { AIRR: 2.68, PRN: false, RSHO: 7.92, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 4.88, proScore: 1.95, coverage: 0.4,
      price: 919.99, weeklyPrices: [887.67, 875.87, 865.36, 909.81, 919.99], weeklyChange: 3.64, sortRank: 0, periodReturns: { '1M': 5.2, '6M': 55.5, '1Y': 163.3 },
      priceHistory: { '1W': [887.67, 875.87, 865.36, 909.81, 919.99], '1M': [874.78, 904.59, 926.93, 895.69, 897.45, 926.79, 912.14, 902.3, 920.22, 888.31, 860.15, 872.56, 865.95, 879.89, 908.55, 909.93, 887.67, 875.87, 865.36, 909.81, 919.99], '6M': [591.49, 615.35, 561.89, 583.76, 598.41, 617.62, 646.89, 635.92, 690.91, 742.12, 764.76, 768.23, 722.18, 704.82, 699.78, 701.7, 667.43, 724.44, 794.25, 800.45, 817.87, 904.59, 912.14, 860.15, 909.93, 919.99], '1Y': [349.4, 358.57, 357.68, 371.58, 398.43, 408.33, 418.07, 427.59, 434.12, 427.72, 413.7, 420.59, 432.67, 420.22, 431.38, 466.96, 463.72, 490.57, 500.36, 540.96, 513.91, 585.49, 569.15, 573.02, 553.11, 573.73, 599.15, 625.61, 565.83, 583, 616.1, 629.77, 646.89, 635.92, 690.91, 742.12, 764.76, 768.23, 722.18, 716.68, 702, 716.63, 708.46, 771.58, 770.17, 800.45, 817.87, 904.59, 912.14, 860.15, 909.93, 919.99] },
      velocityScore: { '1D': -37.3, '1W': -14.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$424B', pe: 45.7, revenueGrowth: 22, eps: 20.11, grossMargin: 29, dividendYield: 0.66,
      etfPresence: { AIRR: false, PRN: 3.26, RSHO: 6.5, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.53, proScore: 1.81, coverage: 0.4,
      price: 1879.01, weeklyPrices: [1855.15, 1828.21, 1787.88, 1883.26, 1879.01], weeklyChange: 1.29, sortRank: 0, periodReturns: { '1M': -0.7, '6M': 97.9, '1Y': 278.2 },
      priceHistory: { '1W': [1855.15, 1828.21, 1787.88, 1883.26, 1879.01], '1M': [1891.95, 1967.24, 2011.49, 1942.02, 1952.37, 2032.98, 2016.31, 2034.63, 2042.36, 1992.74, 1825.5, 1835.51, 1835.33, 1828.25, 1883.56, 1867.09, 1855.15, 1828.21, 1787.88, 1883.26, 1879.01], '6M': [949.3, 1021.36, 883.79, 958.07, 1003.64, 1010.41, 1119.98, 1127.55, 1176.26, 1283.65, 1337.75, 1468.58, 1391.16, 1372.4, 1414.1, 1408.25, 1273.18, 1424.91, 1650.48, 1674.16, 1719.21, 1967.24, 2016.31, 1825.5, 1867.09, 1879.01], '1Y': [496.78, 487.71, 495.37, 507.6, 529.9, 533.77, 550.5, 547.91, 702.97, 690.45, 702.1, 681.08, 709.83, 723.95, 764.91, 799.38, 781.88, 832.98, 834.7, 838.78, 790.72, 1010.64, 987.78, 973.18, 930.5, 970.95, 1004.65, 1024.92, 918.54, 963.83, 1032.31, 1038.18, 1119.98, 1127.55, 1176.26, 1283.65, 1337.75, 1468.58, 1391.16, 1383.62, 1424.46, 1461.52, 1378.99, 1525.16, 1648.96, 1674.16, 1719.21, 1967.24, 2016.31, 1825.5, 1867.09, 1879.01] },
      velocityScore: { '1D': -34.7, '1W': -60, '1M': null, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 54.2, revenueGrowth: 1, eps: 34.65, grossMargin: 25, dividendYield: 0.14,
      etfPresence: { AIRR: 4.34, PRN: 4.72, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'TKR', name: 'TKR', easyScore: 1, avgWeight: 8.77, proScore: 1.75, coverage: 0.2,
      price: 131.38, weeklyPrices: [126.78, 127.98, 126.54, 131.90, 131.38], weeklyChange: 3.62, sortRank: 0, periodReturns: { '1M': 22.6, '6M': 59.2, '1Y': 86.2 },
      priceHistory: { '1W': [126.78, 127.98, 126.54, 131.9, 131.38], '1M': [107.12, 109.63, 119.7, 116.34, 117.97, 117.39, 117.12, 115.74, 116.74, 114.49, 109.36, 117.2, 118.93, 119.95, 127.42, 127.16, 126.78, 127.98, 126.54, 131.9, 131.38], '6M': [82.52, 87.53, 84.14, 86.02, 86.29, 91.17, 93.55, 94.02, 94.99, 108.93, 105.54, 109.52, 106.58, 100.58, 98.74, 98.99, 95.94, 99.17, 106.81, 108.75, 106.88, 109.63, 117.12, 109.36, 127.16, 131.38], '1Y': [70.57, 73.15, 70.44, 73.05, 76.72, 78.57, 79.13, 80.99, 74.77, 73.57, 80.39, 75.86, 79.01, 77.42, 79.16, 79.09, 74.2, 75.99, 74.32, 74.04, 75.85, 79.25, 78.46, 78.66, 74.82, 81.36, 82.76, 88.71, 84.92, 86.52, 88.34, 90.83, 93.55, 94.02, 94.99, 108.93, 105.54, 109.52, 106.58, 102.18, 98.59, 101.03, 100.57, 105.88, 103.73, 108.75, 106.88, 109.63, 117.12, 109.36, 127.16, 131.38] },
      velocityScore: { '1D': -55.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 29.8, revenueGrowth: 8, eps: 4.41, grossMargin: 31, dividendYield: 1.09,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.77, IDEF: false, BILT: false },
      tonyNote: 'TKR appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AGX', name: 'Argan, Inc.', easyScore: 2, avgWeight: 4.18, proScore: 1.67, coverage: 0.4,
      price: 661.72, weeklyPrices: [677.45, 667.02, 646.89, 663.14, 661.72], weeklyChange: -2.32, sortRank: 0, periodReturns: { '1M': -5.1, '6M': 88.5, '1Y': 202.5 },
      priceHistory: { '1W': [677.45, 667.02, 646.89, 663.14, 661.72], '1M': [697.15, 720, 727.54, 690, 680.26, 683.52, 681.01, 719.92, 740.91, 722.31, 639.58, 630.5, 644.64, 656.35, 670.66, 673.51, 677.45, 667.02, 646.89, 663.14, 661.72], '6M': [351.09, 325.77, 296.56, 328.26, 325.96, 311.87, 383.66, 353.5, 355.77, 370, 406.88, 447.6, 438.93, 466.38, 466.52, 463.15, 513.98, 576.95, 603.91, 615.42, 630.7, 720, 681.01, 639.58, 673.51, 661.72], '1Y': [218.72, 209.45, 212.82, 209.05, 206.15, 208.46, 203.84, 216.2, 240.5, 229.9, 229.52, 215.89, 226.87, 237.83, 232.59, 259.58, 258.17, 271.34, 270.09, 296.39, 267.62, 292.22, 324.93, 364.78, 358.72, 380.62, 356.39, 330.6, 313.9, 325.14, 339.54, 309.26, 383.66, 353.5, 355.77, 370, 406.88, 447.6, 438.93, 458.71, 473.63, 444.83, 544.65, 588.28, 606.43, 615.42, 630.7, 720, 681.01, 639.58, 673.51, 661.72] },
      velocityScore: { '1D': -36.3, '1W': -60.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 67.9, revenueGrowth: 13, eps: 9.75, grossMargin: 20, dividendYield: 0.3,
      etfPresence: { AIRR: 4.06, PRN: 4.3, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Argan Inc is an engineering and construction company for power generation facilities — natural gas and renewable power plants. It appears in Industrials ETFs because power plant construction is one of the fastest-growing categories in U.S. infrastructure spending, driven by data center load additions that the grid cannot currently support.',
    },
    {
      ticker: 'CGNX', name: 'CGNX', easyScore: 1, avgWeight: 7.51, proScore: 1.5, coverage: 0.2,
      price: 65.81, weeklyPrices: [66.01, 65.85, 64.64, 66.08, 65.81], weeklyChange: -0.3, sortRank: 0, periodReturns: { '1M': 16.9, '6M': 74.6, '1Y': 115.6 },
      priceHistory: { '1W': [66.01, 65.85, 64.64, 66.08, 65.81], '1M': [56.3, 58.83, 62.26, 65.92, 65.66, 67.26, 65.68, 63.64, 66.09, 64.26, 60.65, 63.37, 64.27, 66.09, 68.33, 66.7, 66.01, 65.85, 64.64, 66.08, 65.81], '6M': [37.69, 37.91, 35.76, 36.6, 36.93, 39.01, 40.92, 39.37, 39.76, 43.72, 57.09, 57.88, 53.61, 50.82, 49.56, 50.8, 45.94, 51.69, 55.58, 53.72, 53.74, 58.83, 65.68, 60.65, 66.7, 65.81], '1Y': [30.53, 31.43, 29.9, 30.78, 32.78, 34.74, 33.81, 34.61, 33.76, 40.89, 44.18, 42.71, 44.25, 44.27, 44.95, 46.19, 44.87, 45.64, 46.57, 46.32, 46.29, 47.44, 40.5, 38.18, 36.1, 38.21, 38.9, 36.88, 36.17, 36.55, 37.37, 39.43, 40.92, 39.37, 39.76, 43.72, 57.09, 57.88, 53.61, 50.58, 50.12, 51.01, 48.99, 53.78, 54.64, 53.72, 53.74, 58.83, 65.68, 60.65, 66.7, 65.81] },
      velocityScore: { '1D': -56.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 77.4, revenueGrowth: 24, eps: 0.85, grossMargin: 68, dividendYield: 0.51,
      etfPresence: { AIRR: false, PRN: false, RSHO: 7.51, IDEF: false, BILT: false },
      tonyNote: 'CGNX appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 7.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 7.26, proScore: 1.45, coverage: 0.2,
      price: 174.34, weeklyPrices: [178.96, 179.66, 174.41, 174.26, 174.34], weeklyChange: -2.58, sortRank: 0, periodReturns: { '1M': 0.8, '6M': 3.5, '1Y': 26.8 },
      priceHistory: { '1W': [178.96, 179.66, 174.41, 174.26, 174.34], '1M': [172.9, 172.87, 176.74, 176.78, 176.09, 178.61, 178.89, 178.11, 175.68, 171.18, 174.49, 174.85, 175.98, 177.01, 178.97, 176.59, 178.96, 179.66, 174.41, 174.26, 174.34], '6M': [168.45, 174.72, 177.2, 186.38, 187.25, 188.5, 201.92, 194.13, 201.09, 196.19, 203.5, 198.46, 206.52, 208.23, 206.06, 194.82, 187.15, 197.92, 202.81, 187.17, 175.68, 172.87, 178.89, 174.49, 176.59, 174.34], '1Y': [137.5, 138.52, 148.48, 141.38, 144.52, 146.4, 151.5, 156.49, 158.4, 155.75, 155.71, 156.59, 159.84, 158.68, 157.65, 158.19, 160.51, 166.63, 162.18, 157.05, 177.98, 176.36, 174, 177.69, 173.77, 173.19, 171.31, 177.42, 178.29, 185.17, 188.26, 193.85, 201.92, 194.13, 201.09, 196.19, 203.5, 198.46, 206.52, 207, 203.33, 194, 192.9, 203.48, 198.39, 187.17, 175.68, 172.87, 178.89, 174.49, 176.59, 174.34] },
      velocityScore: { '1D': -53.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$235B', pe: 32.7, revenueGrowth: 9, eps: 5.33, grossMargin: 20, dividendYield: 1.59,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 7.26, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 7.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.35, proScore: 1.34, coverage: 0.4,
      price: 310.24, weeklyPrices: [308.53, 303.81, 300.98, 308.31, 310.24], weeklyChange: 0.55, sortRank: 0, periodReturns: { '1M': 2.1, '6M': 18.9, '1Y': 34.9 },
      priceHistory: { '1W': [308.53, 303.81, 300.98, 308.31, 310.24], '1M': [303.99, 305.48, 315.39, 310.37, 308.87, 310.55, 313.7, 310.87, 315.72, 307.17, 302.64, 306.25, 305.66, 307.1, 311.33, 312.65, 308.53, 303.81, 300.98, 308.31, 310.24], '6M': [260.88, 264.32, 256.73, 264.33, 259.63, 272.25, 281.21, 281.54, 270.02, 282.45, 278.31, 282.27, 277.7, 267.57, 256.83, 262.23, 258.01, 272.54, 292.01, 293.59, 301.24, 305.48, 313.7, 302.64, 312.65, 310.24], '1Y': [230.01, 233.71, 225.18, 224.6, 245.19, 255.95, 261.93, 267.01, 273.62, 264.97, 275.72, 262.46, 268.4, 267.96, 269.68, 262.77, 259.1, 259.16, 251.03, 244.84, 253.5, 254.1, 257.9, 256.26, 243.79, 257.32, 258.83, 262.84, 259.48, 264.78, 263.15, 273.7, 281.21, 281.54, 270.02, 282.45, 278.31, 282.27, 277.7, 264.31, 261.37, 264.14, 265.32, 280.74, 284.56, 293.59, 301.24, 305.48, 313.7, 302.64, 312.65, 310.24] },
      velocityScore: { '1D': -37.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 29.3, revenueGrowth: 7, eps: 10.58, grossMargin: 30, dividendYield: 0.66,
      etfPresence: { AIRR: 1.7, PRN: false, RSHO: 5, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PL', name: 'Planet Labs PBC', easyScore: 2, avgWeight: 3.28, proScore: 1.31, coverage: 0.4,
      price: 45.05, weeklyPrices: [51.40, 51.14, 46.46, 48.09, 45.05], weeklyChange: -12.35, sortRank: 0, periodReturns: { '1M': 16.9, '6M': 275.1, '1Y': 1073.2 },
      priceHistory: { '1W': [51.4, 51.14, 46.46, 48.09, 45.05], '1M': [38.54, 37.13, 39.69, 35.24, 39.04, 41.84, 40.68, 40.74, 43.04, 41.62, 41.59, 42.66, 42.48, 44.35, 48.32, 50.48, 51.4, 51.14, 46.46, 48.09, 45.05], '6M': [12.01, 12.94, 16.47, 20.32, 20.41, 22.71, 28.78, 25.87, 22.85, 24.02, 22.21, 24.71, 25.3, 25.82, 24.6, 33.82, 27.89, 35.17, 33.93, 38.03, 35.03, 37.13, 40.68, 41.59, 50.48, 45.05], '1Y': [3.84, 5.59, 5.1, 5.42, 6.14, 6.6, 6.63, 6.86, 6.28, 6.32, 6.74, 6.43, 7.08, 6.46, 9.67, 10.61, 11.96, 14.85, 15.66, 13.23, 12.5, 12.9, 13.25, 12.44, 11.79, 11.72, 12.94, 17.47, 17.49, 19.36, 21.39, 25.44, 28.78, 25.87, 22.85, 24.02, 22.21, 24.71, 25.3, 25.4, 27.08, 31.83, 27.95, 36.55, 34.41, 38.03, 35.03, 37.13, 40.68, 41.59, 50.48, 45.05] },
      velocityScore: { '1D': -41, '1W': -64, '1M': null, '6M': null }, isNew: false,
      marketCap: '$16B', pe: null, revenueGrowth: 41, eps: -0.8, grossMargin: 56, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 5.19, RSHO: false, IDEF: 1.37, BILT: false },
      tonyNote: 'Planet Labs is a satellite earth observation company. It holds a speculative position in Industrials ETFs as a data infrastructure name — providing satellite imagery and analytics that support agricultural, energy, and government decision-making. Revenue is growing from a small base; the ETF weight is minimal and the position is thematic.',
    },
    {
      ticker: 'LMT', name: 'LOCKHEED MARTIN CORP', easyScore: 1, avgWeight: 6.47, proScore: 1.29, coverage: 0.2,
      price: 517.23, weeklyPrices: [537.21, 530.45, 516.50, 513.43, 517.23], weeklyChange: -3.72, sortRank: 0, periodReturns: { '1M': -0.2, '6M': 15.8, '1Y': 7.7 },
      priceHistory: { '1W': [537.21, 530.45, 516.5, 513.43, 517.23], '1M': [518.15, 508.93, 514.26, 512.41, 506.51, 512.25, 521, 519.94, 520.41, 516.01, 526.63, 522.59, 522.79, 533.24, 532.9, 531.14, 537.21, 530.45, 516.5, 513.43, 517.23], '6M': [446.8, 467.94, 474.79, 485.75, 497.07, 542.92, 582.43, 581.66, 636, 638.29, 649.58, 664.43, 667.82, 664.15, 645.2, 616.25, 598.57, 627.7, 611.58, 571.95, 512.29, 508.93, 521, 526.63, 531.14, 517.23], '1Y': [480.17, 476.9, 479.34, 458.39, 462.55, 464.31, 469.2, 419.39, 418.68, 434.85, 442.57, 446, 454.47, 456.85, 470.73, 473.62, 484.34, 499.36, 507.76, 493.25, 487.14, 485.33, 473.14, 457.04, 469.91, 454.16, 448.35, 474.88, 470.14, 483.03, 511.57, 551.24, 582.43, 581.66, 636, 638.29, 649.58, 664.43, 667.82, 651.22, 636.33, 610.17, 604.39, 628.5, 611.1, 571.95, 512.29, 508.93, 521, 526.63, 531.14, 517.23] },
      velocityScore: { '1D': -53.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$119B', pe: 25.1, revenueGrowth: 0, eps: 20.64, grossMargin: 10, dividendYield: 2.69,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 6.47, BILT: false },
      tonyNote: 'LOCKHEED MARTIN CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 6.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ETN', name: 'ETN', easyScore: 1, avgWeight: 5.7, proScore: 1.14, coverage: 0.2,
      price: 416.47, weeklyPrices: [401.94, 400.60, 400.08, 417.62, 416.47], weeklyChange: 3.62, sortRank: 0, periodReturns: { '1M': -1.4, '6M': 24.1, '1Y': 27.8 },
      priceHistory: { '1W': [401.94, 400.6, 400.08, 417.62, 416.47], '1M': [422.44, 410.86, 421.39, 399.15, 401.51, 419, 401.53, 406.94, 408.1, 399.44, 371.88, 379.69, 381.51, 391.35, 403.13, 406.37, 401.94, 400.6, 400.08, 417.62, 416.47], '6M': [335.57, 353.45, 315.82, 323.67, 327.31, 324.51, 343.75, 332.28, 359.44, 377.06, 391.49, 374.56, 355.56, 353.87, 361.04, 359.74, 343.53, 368.85, 401.9, 409.7, 413.07, 410.86, 401.53, 371.88, 406.37, 416.47], '1Y': [325.84, 324.24, 330.51, 342.35, 358.19, 357.64, 380.72, 380.24, 390.09, 358.16, 357.49, 346.22, 351.4, 348.22, 360.08, 371.27, 364.74, 376.76, 377.19, 375.59, 360.6, 387.75, 385.44, 369.4, 345.65, 341.69, 338.93, 350.36, 315.95, 322.17, 322.26, 329.1, 343.75, 332.28, 359.44, 377.06, 391.49, 374.56, 355.56, 361.06, 363.95, 374.1, 357.67, 385.58, 395.06, 409.7, 413.07, 410.86, 401.53, 371.88, 406.37, 416.47] },
      velocityScore: { '1D': -55.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$162B', pe: 40.7, revenueGrowth: 17, eps: 10.23, grossMargin: 37, dividendYield: 1.05,
      etfPresence: { AIRR: false, PRN: false, RSHO: 5.7, IDEF: false, BILT: false },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'TTMI', name: 'TTM Technologies Inc', easyScore: 1, avgWeight: 5.65, proScore: 1.13, coverage: 0.2,
      price: 176.62, weeklyPrices: [187.79, 173.72, 172.44, 179.62, 176.62], weeklyChange: -5.95, sortRank: 0, periodReturns: { '1M': 12.2, '6M': 164.6, '1Y': 445.3 },
      priceHistory: { '1W': [187.79, 173.72, 172.44, 179.62, 176.62], '1M': [157.47, 159.58, 164.64, 153.77, 157.31, 162.99, 163.36, 168.82, 171.87, 167.35, 161.41, 169.36, 174.55, 189.92, 196.95, 190.67, 187.79, 173.72, 172.44, 179.62, 176.62], '6M': [66.76, 77.7, 61.58, 72.59, 70.61, 73.88, 101.01, 94.63, 102.76, 97.98, 90.91, 106.7, 104.05, 96.8, 96.51, 101.42, 88.29, 99.29, 120.74, 125.25, 137.59, 159.58, 163.36, 161.41, 190.67, 176.62], '1Y': [32.39, 36.19, 36.4, 39.2, 41.76, 43.88, 46.22, 46.46, 48.73, 43.21, 44.96, 40.06, 44.5, 46.07, 48.32, 52.84, 54.51, 60.28, 56.52, 58.45, 55.69, 63.53, 70.06, 70.5, 64.27, 68.29, 72.84, 80.24, 67.09, 71.72, 67.99, 77.89, 101.01, 94.63, 102.76, 97.98, 90.91, 106.7, 104.05, 96.43, 97.54, 106.99, 97.42, 105.85, 116.6, 125.25, 137.59, 159.58, 163.36, 161.41, 190.67, 176.62] },
      velocityScore: { '1D': -54.6, '1W': -73.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: 96.5, revenueGrowth: 30, eps: 1.83, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 5.65, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'TTM Technologies is a printed circuit board manufacturer held in Industrials ETFs. Revenue growth tracks data center and defense electronics demand. PCB manufacturing is essential hardware infrastructure; TTM\'s position in AI server and high-frequency trading hardware gives it exposure to two durable growth verticals.',
    },
    {
      ticker: 'UNP', name: 'UNION PACIFIC CORP', easyScore: 1, avgWeight: 5.56, proScore: 1.11, coverage: 0.2,
      price: 266.46, weeklyPrices: [267.00, 262.64, 263.50, 264.68, 266.46], weeklyChange: -0.2, sortRank: 0, periodReturns: { '1M': 1.2, '6M': 13.3, '1Y': 20.1 },
      priceHistory: { '1W': [267, 262.64, 263.5, 264.68, 266.46], '1M': [263.41, 264.01, 268.23, 264.89, 264.65, 263.35, 265.6, 264.65, 269.34, 270.56, 271.56, 265.8, 265.44, 265.88, 271.1, 279.39, 267, 262.64, 263.5, 264.68, 266.46], '6M': [235.23, 235.46, 236.74, 235.05, 231.91, 228.44, 229.49, 230.89, 235.23, 254.34, 262.8, 266.66, 265.84, 253.61, 242.21, 238.37, 239.23, 246.11, 252.04, 251.25, 267.74, 264.01, 265.6, 271.56, 279.39, 266.46], '1Y': [221.78, 226.6, 220.59, 226.81, 237.16, 237, 227.49, 231, 225.28, 225.46, 223.18, 225.68, 220.95, 223.06, 216.04, 220.36, 232, 234.52, 231.54, 224.04, 225.24, 216.37, 217.38, 223.55, 221.17, 230.66, 237.29, 236.12, 234.42, 233.44, 231.97, 229.5, 229.49, 230.89, 235.23, 254.34, 262.8, 266.66, 265.84, 250.21, 242.32, 239.67, 242.62, 249.11, 248.03, 251.25, 267.74, 264.01, 265.6, 271.56, 279.39, 266.46] },
      velocityScore: { '1D': -55.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$158B', pe: 21.9, revenueGrowth: 3, eps: 12.15, grossMargin: 57, dividendYield: 2.09,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: false, BILT: 5.56 },
      tonyNote: 'UNION PACIFIC CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 5.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.75, proScore: 1.1, coverage: 0.4,
      price: 234.33, weeklyPrices: [213.82, 216.66, 220.92, 230.08, 234.33], weeklyChange: 9.59, sortRank: 0, periodReturns: { '1M': 16.5, '6M': 11.8, '1Y': 48.3 },
      priceHistory: { '1W': [213.82, 216.66, 220.92, 230.08, 234.33], '1M': [201.12, 207.81, 212.74, 205.27, 202.84, 203.24, 198.99, 203.79, 203.5, 200.99, 195.79, 205.55, 205.39, 207.8, 219.08, 215.34, 213.82, 216.66, 220.92, 230.08, 234.33], '6M': [209.57, 217.69, 207.33, 208.48, 203.26, 207.51, 217.65, 215.21, 212.73, 223.86, 241.6, 243.04, 219.58, 209.8, 203.42, 194.52, 190.71, 195.43, 224.82, 216.49, 216.36, 207.81, 198.99, 195.79, 215.34, 234.33], '1Y': [158.02, 163.22, 155.12, 161.46, 172.55, 173.08, 180.12, 175.58, 181.26, 203.53, 191.88, 186.26, 192.47, 186.63, 190.25, 190.48, 182.95, 187.73, 185.97, 182.92, 187.4, 200, 223.06, 219.09, 205.32, 215.87, 208.24, 224.76, 210.34, 208.48, 205.44, 208.56, 217.65, 215.21, 212.73, 223.86, 241.6, 243.04, 219.58, 210.96, 204.62, 200.67, 199.94, 212.22, 219.99, 216.49, 216.36, 207.81, 198.99, 195.79, 215.34, 234.33] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$12B', pe: 44.9, revenueGrowth: 17, eps: 5.22, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.64, PRN: false, RSHO: 3.87, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GTES', name: 'GTES', easyScore: 1, avgWeight: 5.52, proScore: 1.1, coverage: 0.2,
      price: 26.21, weeklyPrices: [25.48, 25.92, 25.85, 26.51, 26.21], weeklyChange: 2.86, sortRank: 0, periodReturns: { '1M': 6.4, '6M': 18.1, '1Y': 21.6 },
      priceHistory: { '1W': [25.48, 25.92, 25.85, 26.51, 26.21], '1M': [24.64, 24.57, 26.24, 25.98, 26.09, 25.98, 25.68, 25.38, 25.67, 24.4, 23.45, 24.18, 24.07, 24.48, 25.34, 25.71, 25.48, 25.92, 25.85, 26.51, 26.21], '6M': [22.19, 22.29, 21.35, 22.02, 22.06, 22.79, 22.75, 22.85, 23.72, 27.01, 27.33, 28.05, 26.37, 24.11, 22.88, 22.78, 21.04, 22.52, 26.39, 25.61, 25.13, 24.57, 25.68, 23.45, 25.71, 26.21], '1Y': [21.56, 22.13, 21.72, 22.6, 23.9, 24.74, 24.86, 24.97, 25.07, 24.14, 25.33, 24.07, 25.98, 25.93, 26.05, 25.86, 24.48, 25.75, 25.29, 25.88, 25.42, 22.5, 21.85, 22.71, 21.54, 22.45, 22.06, 22.34, 21.44, 21.97, 22.46, 22.45, 22.75, 22.85, 23.72, 27.01, 27.33, 28.05, 26.37, 24.27, 23.24, 22.95, 22.61, 24.51, 24.91, 25.61, 25.13, 24.57, 25.68, 23.45, 25.71, 26.21] },
      velocityScore: { '1D': -54.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: 27.6, revenueGrowth: 0, eps: 0.95, grossMargin: 40, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: 5.52, IDEF: false, BILT: false },
      tonyNote: 'GTES appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 5.5% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GD', name: 'GENERAL DYNAMICS CORP', easyScore: 1, avgWeight: 5.35, proScore: 1.07, coverage: 0.2,
      price: 335.63, weeklyPrices: [348.96, 346.82, 339.20, 337.61, 335.63], weeklyChange: -3.82, sortRank: 0, periodReturns: { '1M': -3.9, '6M': -0.7, '1Y': 21.6 },
      priceHistory: { '1W': [348.96, 346.82, 339.2, 337.61, 335.63], '1M': [349.08, 349.16, 347.27, 347.76, 346.53, 344.03, 346.46, 341.36, 340.62, 334.5, 340.14, 339.75, 338.71, 342.89, 344.64, 342.69, 348.96, 346.82, 339.2, 337.61, 335.63], '6M': [338.08, 342.23, 336.41, 345.39, 343.4, 353.89, 367.38, 363.54, 346.37, 360.1, 342.52, 351.18, 364.7, 361.98, 354.36, 347.37, 340.79, 348.43, 339.88, 325.52, 313.68, 349.16, 346.46, 340.14, 342.69, 335.63], '1Y': [276.04, 277.37, 281.3, 285.91, 293.92, 303.38, 300.09, 316.94, 312.18, 314.99, 317.49, 317.48, 325.46, 322.44, 329.62, 324.57, 324.43, 341.05, 342.77, 330.59, 338.24, 343.48, 342.91, 349.45, 343.06, 340.04, 341.7, 341.48, 337.34, 342.2, 355.56, 360.94, 367.38, 363.54, 346.37, 360.1, 342.52, 351.18, 364.7, 355.59, 356.29, 346.23, 343.22, 350.02, 338.88, 325.52, 313.68, 349.16, 346.46, 340.14, 342.69, 335.63] },
      velocityScore: { '1D': -53.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$91B', pe: 21.1, revenueGrowth: 10, eps: 15.9, grossMargin: 15, dividendYield: 1.8,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 5.35, BILT: false },
      tonyNote: 'GENERAL DYNAMICS CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 5.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 1, avgWeight: 5.23, proScore: 1.05, coverage: 0.2,
      price: 145.91, weeklyPrices: [143.34, 156.54, 160.65, 152.17, 145.91], weeklyChange: 1.79, sortRank: 0, periodReturns: { '1M': -0.1, '6M': -17.1, '1Y': 9.6 },
      priceHistory: { '1W': [143.34, 156.54, 160.65, 152.17, 145.91], '1M': [146.03, 135.91, 133.79, 137.05, 137.8, 136.89, 136, 130.05, 133.73, 133.99, 135.26, 137.15, 137.41, 136.88, 136.6, 132.51, 143.34, 156.54, 160.65, 152.17, 145.91], '6M': [176.08, 187.91, 177.29, 194.17, 167.86, 177.49, 170.96, 167.47, 147.76, 142.91, 133.02, 128.84, 147.22, 156.43, 152.72, 160.84, 137.55, 150.07, 135.7, 145.97, 141.18, 135.91, 136, 135.26, 132.51, 145.91], '1Y': [133.17, 132.81, 138.2, 142.9, 132.12, 142.5, 153.99, 154.63, 158.61, 179.54, 184.37, 156.01, 156.72, 156.14, 164.36, 176.97, 179.12, 187.05, 185.47, 178.12, 175.49, 198.81, 187.9, 184.17, 165.42, 165.77, 177.92, 187.54, 185.69, 188.71, 174.04, 179.41, 170.96, 167.47, 147.76, 142.91, 133.02, 128.84, 147.22, 151.14, 155.08, 154.78, 146.28, 140.76, 142.15, 145.97, 141.18, 135.91, 136, 135.26, 132.51, 145.91] },
      velocityScore: { '1D': -55.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$350B', pe: 165.8, revenueGrowth: 85, eps: 0.88, grossMargin: 84, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 5.23, BILT: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'LIN', name: 'LIN', easyScore: 1, avgWeight: 4.85, proScore: 0.97, coverage: 0.2,
      price: 506.84, weeklyPrices: [501.98, 497.69, 497.41, 495.91, 506.84], weeklyChange: 0.97, sortRank: 0, periodReturns: { '1M': 2.7, '6M': 23.9, '1Y': 7.4 },
      priceHistory: { '1W': [501.98, 497.69, 497.41, 495.91, 506.84], '1M': [493.55, 500.29, 501.87, 493.85, 493.16, 504.4, 503.87, 513.26, 511.65, 506.11, 506.07, 506.63, 514.51, 517.58, 514.97, 507.87, 501.98, 497.69, 497.41, 495.91, 506.84], '6M': [409.15, 392.68, 422.34, 424.9, 429.11, 444.08, 438.96, 455.03, 460.16, 456.34, 482.22, 504, 501.68, 483.62, 497.41, 478.05, 499.26, 494.59, 499.65, 494.84, 510.29, 500.29, 503.87, 506.07, 507.87, 506.84], '1Y': [471.82, 475.56, 460.9, 460.2, 477.17, 470.34, 461.29, 469.99, 466.23, 471.48, 475.63, 482.36, 482.71, 472.39, 483.59, 476, 473.78, 469.48, 458.16, 444.24, 449.92, 432.01, 418.23, 428.96, 413.2, 407.9, 403.73, 403.3, 418.99, 424.77, 433.1, 443.63, 438.96, 455.03, 460.16, 456.34, 482.22, 504, 501.68, 477.94, 494.05, 479.84, 495.76, 500.48, 497.94, 494.84, 510.29, 500.29, 503.87, 506.07, 507.87, 506.84] },
      velocityScore: { '1D': -55.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$234B', pe: 33.6, revenueGrowth: 8, eps: 15.08, grossMargin: 49, dividendYield: 1.29,
      etfPresence: { AIRR: false, PRN: false, RSHO: 4.85, IDEF: false, BILT: false },
      tonyNote: 'LIN appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 4.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BA', name: 'BOEING', easyScore: 1, avgWeight: 4.74, proScore: 0.95, coverage: 0.2,
      price: 214.94, weeklyPrices: [228.78, 231.15, 224.30, 217.70, 214.94], weeklyChange: -6.05, sortRank: 0, periodReturns: { '1M': -2.9, '6M': 6.1, '1Y': 0.7 },
      priceHistory: { '1W': [228.78, 231.15, 224.3, 217.7, 214.94], '1M': [221.3, 224.38, 229.93, 231.03, 237.36, 238.21, 236.87, 240.6, 229.21, 220.49, 215.01, 222.2, 219.61, 219.02, 218.9, 224.3, 228.78, 231.15, 224.3, 217.7, 214.94], '6M': [202.54, 198.72, 206.33, 218.16, 227.77, 234.53, 247.68, 248.43, 233.02, 244.71, 244.04, 233.39, 224.12, 225, 213.47, 198.41, 189.21, 210, 223.77, 219.16, 230.72, 224.38, 236.87, 215.01, 224.3, 214.94], '1Y': [213.43, 215.73, 200.26, 198.9, 212.03, 226.09, 231, 233.88, 225.84, 225.04, 233.37, 225.62, 235.62, 230.75, 219.99, 215.66, 213.53, 217.43, 216, 211.89, 216.59, 213.58, 197.62, 195.5, 185.7, 186.92, 201.87, 200.71, 208.27, 216.44, 228.13, 239.81, 247.68, 248.43, 233.02, 244.71, 244.04, 233.39, 224.12, 217.76, 210.82, 196.42, 199.03, 217.8, 223.93, 219.16, 230.72, 224.38, 236.87, 215.01, 224.3, 214.94] },
      velocityScore: { '1D': -54.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$169B', pe: 85, revenueGrowth: 14, eps: 2.53, grossMargin: 5, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 4.74, BILT: false },
      tonyNote: 'BOEING appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 4.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.82, proScore: 4.82, coverage: 1,
      price: 250.22, weeklyPrices: [226.34, 231.09, 264.51, 260.58, 250.22], weeklyChange: 10.55, sortRank: 0, periodReturns: { '1M': 41.8, '6M': 153, '1Y': 571.4 },
      priceHistory: { '1W': [226.34, 231.09, 264.51, 260.58, 250.22], '1M': [176.42, 175.92, 195.09, 184.77, 177.05, 186.1, 179.11, 207.27, 221.15, 219.94, 197.73, 191.82, 219.93, 214.77, 208.06, 208.37, 226.34, 231.09, 264.51, 260.58, 250.22], '6M': [98.92, 93.59, 75.45, 91.13, 89.95, 97.93, 108.73, 91.46, 88.16, 92.88, 97.52, 102.58, 86.8, 94.94, 129.85, 114.15, 92.26, 117.4, 161.94, 156.55, 135.51, 175.92, 179.11, 197.73, 208.37, 250.22], '1Y': [37.27, 52.51, 48.33, 48.52, 49.97, 46.43, 53.69, 51.88, 51.29, 55.09, 70.63, 67.47, 70.1, 64.91, 89.19, 94.12, 107.94, 125.87, 132.64, 123.04, 98.62, 125.1, 117, 94.36, 95.07, 94.69, 102.8, 94.28, 78.09, 87.59, 92.83, 107.33, 108.73, 91.46, 88.16, 92.88, 97.52, 102.58, 86.8, 96.43, 116.33, 114.91, 103.76, 125, 166.77, 156.55, 135.51, 175.92, 179.11, 197.73, 208.37, 250.22] },
      velocityScore: { '1D': 13.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$64B', pe: 97, revenueGrowth: 684, eps: 2.58, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 2.87, MEME: 6.37, RKNG: 5.23 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 3, avgWeight: 4.18, proScore: 4.18, coverage: 1,
      price: 67.63, weeklyPrices: [64.05, 63.54, 65.33, 66.60, 67.63], weeklyChange: 5.59, sortRank: 0, periodReturns: { '1M': 36.7, '6M': 53.8, '1Y': 660.7 },
      priceHistory: { '1W': [64.05, 63.54, 65.33, 66.6, 67.63], '1M': [49.48, 54.74, 60.98, 56.85, 61.2, 55.15, 56.56, 55.17, 58.4, 52.94, 47.74, 52.71, 58.06, 56.83, 59.78, 67.84, 64.05, 63.54, 65.33, 66.6, 67.63], '6M': [43.96, 43.92, 33.78, 41.98, 42.7, 46.03, 57.82, 52.36, 53.08, 46.15, 40.97, 45.45, 38.85, 38.84, 44.94, 42.16, 31.62, 35.74, 47.37, 45.17, 44.44, 54.74, 56.56, 47.74, 67.84, 67.63], '1Y': [8.89, 10.49, 9.77, 11.87, 15.66, 17.03, 18.05, 18.99, 16.14, 18.32, 17.73, 19.76, 22.35, 26.13, 32.85, 36.32, 46.29, 47.02, 63.85, 61.83, 51.83, 60.42, 76.41, 55.7, 45.83, 48.45, 46.45, 43.94, 35.8, 40.3, 48.24, 50.33, 57.82, 52.36, 53.08, 46.15, 40.97, 45.45, 38.85, 38.12, 42.96, 41.12, 34.28, 36.83, 48.82, 45.17, 44.44, 54.74, 56.56, 47.74, 67.84, 67.63] },
      velocityScore: { '1D': 3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$24B', pe: 87.8, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 3.08, MEME: 5.97, RKNG: 3.5 },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 2, avgWeight: 6.2, proScore: 4.13, coverage: 0.667,
      price: 187.43, weeklyPrices: [169.02, 158.41, 185.67, 202.37, 187.43], weeklyChange: 10.89, sortRank: 0, periodReturns: { '1M': 8.4, '6M': 630.7, '1Y': 1018.3 },
      priceHistory: { '1W': [169.02, 158.41, 185.67, 202.37, 187.43], '1M': [172.98, 180.57, 178.54, 157.55, 148.94, 184.9, 188.28, 223.1, 203.57, 190.36, 171.33, 165.26, 176.81, 181.49, 177.62, 179.83, 169.02, 158.41, 185.67, 202.37, 187.43], '6M': [25.65, 34.98, 27.14, 41, 39.6, 34.04, 37.04, 34.89, 44.16, 47.91, 43.91, 56.27, 95.34, 110.62, 94.07, 95.76, 85.19, 117.64, 146.39, 150.57, 137.26, 180.57, 188.28, 171.33, 179.83, 187.43], '1Y': [16.76, 16.44, 16.78, 26.23, 26.69, 28.25, 29.42, 26.31, 23.06, 23.23, 23.02, 21.93, 24.05, 23.32, 26.85, 29.04, 26.34, 27.98, 32.37, 31.14, 29.98, 35.48, 31.51, 23.94, 20.87, 25.57, 26.24, 36.32, 29.25, 37.17, 34.99, 33.72, 37.04, 34.89, 44.16, 47.91, 43.91, 56.27, 95.34, 120.49, 86.33, 113.9, 84.59, 132.7, 142.55, 150.57, 137.26, 180.57, 188.28, 171.33, 179.83, 187.43] },
      velocityScore: { '1D': -5.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$15B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 8.15, RKNG: 4.25 },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 3, avgWeight: 3.97, proScore: 3.97, coverage: 1,
      price: 45.89, weeklyPrices: [49.65, 47.28, 47.94, 47.86, 45.89], weeklyChange: -7.58, sortRank: 0, periodReturns: { '1M': 28.8, '6M': 56.3, '1Y': 347.7 },
      priceHistory: { '1W': [49.65, 47.28, 47.94, 47.86, 45.89], '1M': [35.63, 39.88, 44.24, 41.53, 41.25, 44.59, 43.93, 45.48, 46.71, 42.56, 36.62, 39.52, 48.02, 45.87, 45.14, 48.98, 49.65, 47.28, 47.94, 47.86, 45.89], '6M': [29.36, 30.99, 22, 25.72, 28.11, 37.68, 37.4, 36.18, 34.8, 38.26, 33.56, 30.66, 26.15, 27.03, 27.71, 27.26, 20.55, 25.18, 31.47, 31.32, 32.11, 39.88, 43.93, 36.62, 48.98, 45.89], '1Y': [10.25, 12.48, 10.99, 9.82, 10.56, 9.33, 10.91, 10.93, 10.03, 14.79, 14.8, 15.72, 16.7, 14.33, 17.18, 19.91, 22.59, 26.47, 29.29, 36.64, 30.62, 34.42, 33.09, 26.41, 23.09, 24.94, 31.14, 30.76, 23.9, 24.05, 30.2, 38.21, 37.4, 36.18, 34.8, 38.26, 33.56, 30.66, 26.15, 27.4, 27.51, 26.79, 23.74, 27.79, 30.81, 31.32, 32.11, 39.88, 43.93, 36.62, 48.98, 45.89] },
      velocityScore: { '1D': 0.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$13B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.57, MEME: 5.4, RKNG: 3.94 },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 5.9, proScore: 3.94, coverage: 0.667,
      price: 1714.51, weeklyPrices: [1641.64, 1694.98, 1761.43, 1716.36, 1714.51], weeklyChange: 4.44, sortRank: 0, periodReturns: { '1M': 36.5, '6M': 782, '1Y': 4337.1 },
      priceHistory: { '1W': [1641.64, 1694.98, 1761.43, 1716.36, 1714.51], '1M': [1255.86, 1406.32, 1409.98, 1339.96, 1562.34, 1547.56, 1452.02, 1447.23, 1382.72, 1407.61, 1383.29, 1392.56, 1542.24, 1478.69, 1589.55, 1589.94, 1641.64, 1694.98, 1761.43, 1716.36, 1714.51], '6M': [194.38, 232.86, 206.83, 250.08, 275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 565.41, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1714.51], '1Y': [38.64, 41.59, 44.09, 47.25, 46.21, 46.95, 41.52, 43, 43.39, 42.1, 47.01, 44.4, 48.44, 62.5, 84.3, 98.87, 94.29, 124.14, 129.68, 144.27, 146.95, 204.36, 216.5, 283.1, 245.96, 215.04, 213.31, 241.61, 219.46, 250.05, 274.08, 389.27, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 565.41, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1714.51] },
      velocityScore: { '1D': -12.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$254B', pe: 58.8, revenueGrowth: 251, eps: 29.18, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.84, RKNG: 5.97 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'RKLB', name: 'Rocket Lab', easyScore: 3, avgWeight: 3.64, proScore: 3.64, coverage: 1,
      price: 117.17, weeklyPrices: [148.03, 143.48, 122.39, 123.32, 117.17], weeklyChange: -20.85, sortRank: 0, periodReturns: { '1M': 45.9, '6M': 162, '1Y': 338.5 },
      priceHistory: { '1W': [148.03, 143.48, 122.39, 123.32, 117.17], '1M': [80.31, 78.76, 84.65, 78.58, 105.47, 117.35, 117.56, 124.15, 132.55, 124.77, 127.31, 134.28, 125.45, 135.76, 143.2, 150.23, 148.03, 143.48, 122.39, 123.32, 117.17], '6M': [44.72, 57.52, 53.96, 77.18, 75.99, 84.85, 96.3, 80.48, 74.15, 75.84, 69.89, 69.97, 70.13, 71.48, 71.31, 68, 57.38, 66.32, 72.22, 86.64, 78.59, 78.76, 117.56, 127.31, 150.23, 117.17], '1Y': [26.72, 27.17, 26.42, 32.35, 35.68, 39.1, 51.33, 49.15, 46.44, 44.1, 43, 40.69, 46.25, 42.99, 48.43, 47.18, 46.63, 52.47, 66.42, 67, 60.56, 66.16, 56.42, 49.97, 43.62, 41.93, 49.37, 63.53, 59.92, 70.65, 78.14, 87.9, 96.3, 80.48, 74.15, 75.84, 69.89, 69.97, 70.13, 68.93, 78.59, 66.07, 64.22, 69.08, 73.6, 86.64, 78.59, 78.76, 117.56, 127.31, 150.23, 117.17] },
      velocityScore: { '1D': -12.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$68B', pe: null, revenueGrowth: 64, eps: -0.32, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 2.41, MEME: 4.52, RKNG: 4 },
      tonyNote: 'Rocket Lab is the small-launch and space systems name that Electrification and AI infrastructure ETFs hold for satellite connectivity exposure — relevant to both GPS-dependent grids and low-orbit broadband that supports remote AI compute. Small market cap, no earnings, but consistent revenue growth and a rapidly expanding backlog.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 4.82, proScore: 3.21, coverage: 0.667,
      price: 285.69, weeklyPrices: [290.01, 285.00, 273.51, 302.85, 285.69], weeklyChange: -1.49, sortRank: 0, periodReturns: { '1M': -1, '6M': 178.7, '1Y': 1299.8 },
      priceHistory: { '1W': [290.01, 285, 273.51, 302.85, 285.69], '1M': [288.64, 295.25, 285.47, 258.64, 261.03, 283.92, 280.69, 289.76, 303.41, 275.95, 261.34, 282.31, 307.88, 302.49, 302.4, 293.8, 290.01, 285, 273.51, 302.85, 285.69], '6M': [102.5, 101.29, 76.97, 91.88, 98.69, 134.07, 149.5, 139.62, 156.13, 155.17, 145.32, 166.2, 153.02, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 261.34, 293.8, 285.69], '1Y': [20.41, 21.63, 21.34, 21.6, 22.56, 25.85, 24.31, 26.89, 37.62, 38.86, 44.08, 44.51, 50.85, 54.91, 67.29, 80.97, 68.69, 88, 86.65, 115.09, 94.37, 133.71, 141.41, 126.72, 108.93, 101.14, 118.09, 108.99, 80.21, 90.18, 103.87, 136.87, 149.5, 139.62, 156.13, 155.17, 145.32, 166.2, 153.02, 154, 160.05, 145.88, 135.49, 146.78, 213.84, 220.91, 226.37, 295.25, 280.69, 261.34, 293.8, 285.69] },
      velocityScore: { '1D': -21.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$81B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.71, RKNG: 3.93 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'NVTS', name: 'Navitas Semiconductor', easyScore: 2, avgWeight: 4.54, proScore: 3.03, coverage: 0.667,
      price: 30.97, weeklyPrices: [28.51, 26.60, 24.86, 25.86, 30.97], weeklyChange: 8.63, sortRank: 0, periodReturns: { '1M': 94.5, '6M': 256.4, '1Y': 421.4 },
      priceHistory: { '1W': [28.51, 26.6, 24.86, 25.86, 30.97], '1M': [15.92, 17.55, 16.68, 15.79, 18.2, 22.65, 19.25, 21.17, 22.32, 21.32, 19.43, 22.99, 24.38, 29.25, 31.79, 28.88, 28.51, 26.6, 24.86, 25.86, 30.97], '6M': [8.69, 9.12, 7.38, 7.66, 8.38, 10.07, 10.91, 9.38, 8.62, 9.22, 8.22, 8.26, 8.9, 8.38, 10.49, 9.18, 7.83, 8.57, 9.87, 15.33, 15.12, 17.55, 19.25, 19.43, 28.88, 30.97], '1Y': [5.94, 8.09, 6.86, 7.02, 6.32, 6.26, 6.27, 8.82, 7.21, 6.35, 7.36, 6.25, 6.07, 5.54, 6.08, 6.73, 6.51, 8.19, 8, 15.63, 13.6, 13.57, 9.86, 8.64, 7.72, 8.34, 9.45, 9.18, 7.37, 7.4, 9.05, 10.43, 10.91, 9.38, 8.62, 9.22, 8.22, 8.26, 8.9, 8.68, 9.82, 9.28, 8.77, 9.55, 10.26, 15.33, 15.12, 17.55, 19.25, 19.43, 28.88, 30.97] },
      velocityScore: { '1D': -26.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: -39, eps: -0.63, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.61, RKNG: 5.48 },
      tonyNote: 'Navitas Semiconductor is a small-cap wide-bandgap power semiconductor name — gallium nitride and silicon carbide for fast charging and EV applications. The $26.60 share price and small market cap position it as a speculative holding in ETFs willing to take higher-risk bets on next-generation power conversion.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 4.41, proScore: 2.94, coverage: 0.667,
      price: 1048.39, weeklyPrices: [923.52, 971.00, 1035.50, 1064.10, 1048.39], weeklyChange: 13.52, sortRank: 0, periodReturns: { '1M': 81.9, '6M': 347.7, '1Y': 925.3 },
      priceHistory: { '1W': [923.52, 971, 1035.5, 1064.1, 1048.39], '1M': [576.45, 640.2, 666.59, 646.63, 746.81, 795.33, 766.58, 803.63, 776.01, 724.66, 698.74, 731.99, 762.1, 751, 895.88, 928.41, 923.52, 971, 1035.5, 1064.1, 1048.39], '6M': [234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1048.39], '1Y': [102.25, 114.14, 120.34, 127.25, 121.74, 123.11, 113.26, 109.83, 114.74, 108.78, 124.27, 117.21, 117.75, 124.21, 150.57, 168.89, 156.83, 183.75, 192.33, 202.53, 198.47, 226.63, 237.5, 244.9, 225.92, 230.26, 226.65, 258.46, 248.55, 284.79, 312.15, 345.87, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1048.39] },
      velocityScore: { '1D': -12.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.2T', pe: 49.5, revenueGrowth: 196, eps: 21.18, grossMargin: 58, dividendYield: 0.06,
      etfPresence: { BUZZ: 3.35, MEME: false, RKNG: 5.47 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'ONDS', name: 'Ondas Holdings', easyScore: 2, avgWeight: 4.41, proScore: 2.94, coverage: 0.667,
      price: 12.22, weeklyPrices: [13.25, 13.22, 13.46, 13.58, 12.22], weeklyChange: -7.77, sortRank: 0, periodReturns: { '1M': 25.6, '6M': 37, '1Y': 760.6 },
      priceHistory: { '1W': [13.25, 13.22, 13.46, 13.58, 12.22], '1M': [9.73, 9.33, 9.34, 8.89, 9.06, 9.42, 9.04, 8.86, 11.21, 10.62, 9.13, 9.36, 9.18, 9.06, 9.77, 10.8, 13.25, 13.22, 13.46, 13.58, 12.22], '6M': [8.92, 8.32, 7.37, 9.13, 11.02, 13.69, 12.16, 11.16, 10.64, 10.34, 10.05, 10.4, 10.02, 9.72, 10.53, 10.9, 8.15, 9.53, 9.4, 10.87, 10.48, 9.33, 9.04, 9.13, 10.8, 12.22], '1Y': [1.42, 1.52, 1.56, 1.6, 1.88, 2.01, 2.4, 2.18, 2.07, 3.33, 3.52, 3.61, 5.07, 5.33, 6.42, 6.6, 7.75, 9.21, 10.49, 8.2, 6.74, 6.75, 6, 5.51, 7.5, 8.24, 9.19, 9.02, 7.8, 8.48, 12.53, 13.19, 12.16, 11.16, 10.64, 10.34, 10.05, 10.4, 10.02, 10.01, 11.28, 10.68, 9.04, 9.45, 10.03, 10.87, 10.48, 9.33, 9.04, 9.13, 10.8, 12.22] },
      velocityScore: { '1D': -15.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 135.8, revenueGrowth: 1080, eps: 0.09, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.87, RKNG: 2.95 },
      tonyNote: 'Ondas Holdings is a small-cap industrial automation and drone company. It appears in Meme ETFs on the autonomous systems and drone delivery narrative. Revenue is minimal and the path to profitability is unclear; the ETF allocation is speculative and reflects retail interest in autonomous systems themes.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 2, avgWeight: 3.8, proScore: 2.54, coverage: 0.667,
      price: 69.06, weeklyPrices: [70.14, 72.07, 69.28, 71.40, 69.06], weeklyChange: -1.54, sortRank: 0, periodReturns: { '1M': 51, '6M': 42, '1Y': 73.5 },
      priceHistory: { '1W': [70.14, 72.07, 69.28, 71.4, 69.06], '1M': [45.75, 48, 52.57, 47.68, 49.24, 56.89, 55.87, 55.26, 57.47, 51.95, 48.44, 52.47, 58.89, 63.64, 63.62, 65.4, 70.14, 72.07, 69.28, 71.4, 69.06], '6M': [48.65, 51.67, 45.85, 49.82, 46.77, 49.45, 50.8, 43.37, 38.56, 35.48, 33.18, 31.62, 37.05, 35.87, 33.29, 33.11, 26.59, 28.49, 35.76, 46.28, 43.08, 48, 55.87, 48.44, 65.4, 69.06], '1Y': [39.81, 39.74, 38.04, 38.11, 44.75, 45.93, 44.84, 43.28, 39.88, 41.23, 41.21, 36.79, 41.42, 42.11, 47.05, 66.81, 69.43, 69.6, 77.5, 65.59, 55.45, 61.11, 55.41, 50.71, 47.88, 46.9, 54.76, 52.55, 46.44, 46, 48.71, 50.95, 50.8, 43.37, 38.56, 35.48, 33.18, 31.62, 37.05, 35.12, 33.31, 32.7, 28.83, 28.99, 43.25, 46.28, 43.08, 48, 55.87, 48.44, 65.4, 69.06] },
      velocityScore: { '1D': -19.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 177.1, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: 2.1, MEME: 5.51, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 2, avgWeight: 3.62, proScore: 2.41, coverage: 0.667,
      price: 108.61, weeklyPrices: [133.09, 113.41, 105.65, 118.17, 108.61], weeklyChange: -18.4, sortRank: 0, periodReturns: { '1M': 58.7, '6M': 76.8, '1Y': 331.3 },
      priceHistory: { '1W': [133.09, 113.41, 105.65, 118.17, 108.61], '1M': [68.43, 63.87, 70.68, 65.35, 75.05, 82.55, 72.96, 74.81, 83.01, 83.67, 88.1, 89.58, 96.23, 105.86, 119.7, 129.6, 133.09, 113.41, 105.65, 118.17, 108.61], '6M': [61.44, 79.05, 61.86, 78.05, 83.47, 97.67, 115.77, 104.78, 104.55, 102.12, 83.03, 85.82, 92.68, 89.76, 89.11, 88.42, 73.82, 92.57, 88.57, 80.01, 71.88, 63.87, 72.96, 88.1, 129.6, 108.61], '1Y': [25.18, 35.71, 40.1, 49.97, 45.71, 43.97, 57.45, 58.92, 54.29, 51.79, 50.05, 45.08, 48.25, 41.86, 38.37, 41.44, 49.39, 66.16, 86.79, 89.5, 71.35, 80.06, 70.38, 64.49, 58.01, 55.52, 72.65, 84.75, 65.93, 71.95, 90.92, 98.39, 115.77, 104.78, 104.55, 102.12, 83.03, 85.82, 92.68, 87.53, 95.7, 86.98, 82.87, 96.46, 86.91, 80.01, 71.88, 63.87, 72.96, 88.1, 129.6, 108.61] },
      velocityScore: { '1D': -47.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$42B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 4.51, MEME: false, RKNG: 2.73 },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'RGTI', name: 'RGTI', easyScore: 2, avgWeight: 3.48, proScore: 2.32, coverage: 0.667,
      price: 24.85, weeklyPrices: [27.03, 25.54, 25.63, 26.88, 24.85], weeklyChange: -8.07, sortRank: 0, periodReturns: { '1M': 40.4, '6M': -4.6, '1Y': 106.4 },
      priceHistory: { '1W': [27.03, 25.54, 25.63, 26.88, 24.85], '1M': [17.7, 18.27, 20.09, 18.34, 18.94, 20.51, 19.07, 18.42, 19.27, 17.85, 15.96, 16.88, 22.04, 26.42, 25.07, 24.62, 27.03, 25.54, 25.63, 26.88, 24.85], '6M': [26.04, 26.12, 22.47, 24.51, 23.6, 24.72, 25.62, 21.76, 17.71, 17.59, 15.59, 16.48, 16.96, 17.6, 16.14, 15.88, 12.9, 13.84, 16.87, 18.25, 16.39, 18.27, 19.07, 15.96, 24.62, 24.85], '1Y': [12.04, 11.24, 11.48, 11.09, 13.08, 13.03, 17.14, 16.14, 14.17, 15.99, 17.24, 14.76, 15.39, 15.12, 16.69, 24.74, 32.1, 35.4, 47.11, 47.97, 36.06, 39.41, 37.29, 28.3, 25.46, 25.57, 30.06, 26.88, 22.82, 22.38, 25.01, 25.53, 25.62, 21.76, 17.71, 17.59, 15.59, 16.48, 16.96, 16.99, 16.22, 15.6, 14.04, 14.53, 19.11, 18.25, 16.39, 18.27, 19.07, 15.96, 24.62, 24.85] },
      velocityScore: { '1D': -19.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$8B', pe: null, revenueGrowth: 199, eps: -0.89, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 3.44, RKNG: 3.53 },
      tonyNote: 'Rigetti Computing is a quantum hardware company using superconducting qubit technology. It holds a position in Meme ETFs alongside IonQ and D-Wave as part of the quantum computing basket. Revenue is minimal, the technology is earlier-stage than IonQ, and the ETF allocation is speculative. The weight score is low; this is a high-risk, long-duration positioning.',
    },
    {
      ticker: 'RDW', name: 'Redwire', easyScore: 1, avgWeight: 6.33, proScore: 2.11, coverage: 0.333,
      price: 18.76, weeklyPrices: [25.90, 24.57, 20.68, 20.58, 18.76], weeklyChange: -27.57, sortRank: 0, periodReturns: { '1M': 117.1, '6M': 236.8, '1Y': 26.4 },
      priceHistory: { '1W': [25.9, 24.57, 20.68, 20.58, 18.76], '1M': [8.64, 8.69, 9.64, 9.2, 11.07, 12.16, 11.56, 11.46, 13.99, 14.06, 13.91, 14.77, 15.35, 17.49, 22.04, 24, 25.9, 24.57, 20.68, 20.58, 18.76], '6M': [5.57, 7.48, 6.44, 7.82, 9.03, 10.98, 11.71, 10.96, 10.88, 10.09, 8, 8.42, 8.95, 9.65, 9.54, 9.38, 7.71, 9.65, 9.81, 10.31, 9.04, 8.69, 11.56, 13.91, 24, 18.76], '1Y': [14.84, 18.18, 16.7, 16.02, 15.6, 15.65, 19.09, 16.92, 14.06, 13.7, 9.66, 8.7, 8.99, 8.21, 8.45, 8.01, 8.96, 10.36, 9.65, 8.55, 7.64, 7.85, 7.3, 5.97, 5.48, 5.37, 6.14, 7.67, 7.02, 7.15, 10.26, 10.66, 11.71, 10.96, 10.88, 10.09, 8, 8.42, 8.95, 9.23, 10.13, 9.05, 8.5, 9.61, 9.91, 10.31, 9.04, 8.69, 11.56, 13.91, 24, 18.76] },
      velocityScore: { '1D': -50.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: null, revenueGrowth: 58, eps: -2.59, grossMargin: 13, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.33, RKNG: false },
      tonyNote: 'Redwire Corp is a space infrastructure company — solar arrays, structures, and manufacturing in orbit. It appears in Meme and speculative ETFs as a high-risk space economy play. Revenue is growing from a small base but the business is pre-profitability; the ETF weight is minimal and reflects thematic positioning rather than fundamental conviction.',
    },
    {
      ticker: 'LUNR', name: 'Intuitive Machines', easyScore: 1, avgWeight: 5.66, proScore: 1.89, coverage: 0.333,
      price: 36.18, weeklyPrices: [45.70, 43.83, 38.21, 39.57, 36.18], weeklyChange: -20.84, sortRank: 0, periodReturns: { '1M': 42.7, '6M': 254.7, '1Y': 228 },
      priceHistory: { '1W': [45.7, 43.83, 38.21, 39.57, 36.18], '1M': [25.35, 24.8, 26.33, 24.11, 28.97, 32.42, 32.09, 35.68, 36.52, 33.89, 32.46, 33.67, 34.24, 38.26, 34.86, 40.34, 45.7, 43.83, 38.21, 39.57, 36.18], '6M': [10.2, 11.83, 10.21, 16.71, 17.88, 18.56, 21.58, 18.42, 17.84, 19.45, 16.62, 18.9, 18.2, 18.08, 17.69, 20.31, 16.35, 22.73, 23.67, 27.82, 24.58, 24.8, 32.09, 32.46, 40.34, 36.18], '1Y': [11.03, 11.21, 10.23, 10.04, 10.71, 11.18, 12.25, 13.37, 11.55, 10.5, 10.49, 8.65, 8.99, 8.42, 8.52, 9.58, 10.1, 11.22, 12.74, 11.83, 11.35, 12.02, 10.44, 9.34, 8.77, 9.29, 11.4, 12.55, 10.85, 15.25, 18.36, 19.2, 21.58, 18.42, 17.84, 19.45, 16.62, 18.9, 18.2, 17.68, 18.9, 17.92, 18.56, 23.39, 23.88, 27.82, 24.58, 24.8, 32.09, 32.46, 40.34, 36.18] },
      velocityScore: { '1D': -48.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: 199, eps: -0.87, grossMargin: 10, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.66, RKNG: false },
      tonyNote: 'Intuitive Machines is a lunar services company — it landed the first U.S. spacecraft on the Moon since 1972 in early 2024. It appears in Meme ETFs for the narrative value as much as the commercial contract pipeline. Revenue is growing via NASA contracts but the business is small and pre-profit; the ETF weight is speculative.',
    },
    {
      ticker: 'QBTS', name: 'D-Wave Quantum', easyScore: 1, avgWeight: 5.63, proScore: 1.88, coverage: 0.333,
      price: 28.07, weeklyPrices: [29.49, 30.14, 29.18, 29.91, 28.07], weeklyChange: -4.83, sortRank: 0, periodReturns: { '1M': 34.2, '6M': 11.9, '1Y': 58.7 },
      priceHistory: { '1W': [29.49, 30.14, 29.18, 29.91, 28.07], '1M': [20.92, 21.54, 23.83, 21.99, 22.57, 24.03, 22.35, 21.44, 22.13, 20.35, 18.19, 19.3, 25.74, 29.4, 27.82, 27.48, 29.49, 30.14, 29.18, 29.91, 28.07], '6M': [25.08, 26.8, 23.8, 27.52, 28.13, 28.11, 28.83, 23.75, 20.97, 21.21, 18.44, 18.66, 18.24, 19.04, 17.46, 16.31, 12.98, 13.74, 16.97, 20.36, 18.11, 21.54, 22.35, 18.19, 27.48, 28.07], '1Y': [17.68, 16.93, 15.55, 14.18, 15.98, 16.01, 19.24, 20.3, 17.06, 17.58, 18.65, 15.06, 15.23, 15.29, 16.52, 24.02, 26.34, 29.21, 35.07, 40.46, 27.29, 34.26, 31.02, 26.4, 23.44, 22.41, 28.73, 27.98, 24.89, 25.29, 30.64, 28.8, 28.83, 23.75, 20.97, 21.21, 18.44, 18.66, 18.24, 18.76, 17.47, 15.93, 14.43, 14.57, 20.81, 20.36, 18.11, 21.54, 22.35, 18.19, 27.48, 28.07] },
      velocityScore: { '1D': -42.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: -81, eps: -1.14, grossMargin: 66, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.63, RKNG: false },
      tonyNote: 'D-Wave Quantum is a quantum computing company — the only publicly traded business built around quantum annealing hardware. Revenue is minimal and profitability is many years away, but it holds a position in Meme ETFs as the purest-play quantum computing stock available to retail investors. The ETF weight is small and the position is purely thematic.',
    },
    {
      ticker: 'TE', name: 'T1 Energy', easyScore: 1, avgWeight: 5.1, proScore: 1.7, coverage: 0.333,
      price: 11.88, weeklyPrices: [10.82, 10.56, 10.41, 12.04, 11.88], weeklyChange: 9.75, sortRank: 0, periodReturns: { '1M': 132.8, '6M': 162.7, '1Y': 941.7 },
      priceHistory: { '1W': [10.82, 10.56, 10.41, 12.04, 11.88], '1M': [5.1, 5.34, 5.27, 5.15, 6.16, 6.04, 5.85, 5.61, 5.73, 5.67, 6.88, 8.7, 8.72, 8.08, 10.45, 10.96, 10.82, 10.56, 10.41, 12.04, 11.88], '6M': [4.52, 6.15, 5.42, 7.05, 7.84, 6.94, 8.17, 8.14, 8.66, 7.64, 6.44, 7.09, 6.51, 7.16, 7.72, 6.84, 5.62, 3.93, 4.86, 5.09, 4.9, 5.34, 5.85, 6.88, 10.96, 11.88], '1Y': [1.14, 1.38, 1.29, 1.27, 1.41, 1.42, 1.5, 1.57, 1.29, 1.25, 1.34, 1.33, 1.58, 1.85, 1.88, 1.86, 2.27, 2.36, 3.83, 4.69, 4.11, 3.6, 4.09, 3.85, 2.89, 3.84, 5.11, 5.87, 6.02, 6.8, 8.2, 7.21, 8.17, 8.14, 8.66, 7.64, 6.44, 7.09, 6.51, 7.98, 7.79, 6.61, 4.39, 4.17, 5.34, 5.09, 4.9, 5.34, 5.85, 6.88, 10.96, 11.88] },
      velocityScore: { '1D': -41.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3B', pe: null, revenueGrowth: 232, eps: -1.87, grossMargin: 8, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.1, RKNG: false },
      tonyNote: 'Tronox Holdings is a titanium dioxide producer — a commodity chemicals company that appears in some ETFs for its materials exposure. The small share price reflects commodity pricing pressure; this is a cyclical materials position rather than a technology or infrastructure allocation.',
    },
    {
      ticker: 'AXTI', name: 'AXT Inc', easyScore: 1, avgWeight: 4.69, proScore: 1.56, coverage: 0.333,
      price: 106.36, weeklyPrices: [115.70, 103.16, 109.55, 110.85, 106.36], weeklyChange: -8.08, sortRank: 0, periodReturns: { '1M': 0.3, '6M': 826.4, '1Y': 6047.7 },
      priceHistory: { '1W': [115.7, 103.16, 109.55, 110.85, 106.36], '1M': [106, 107.55, 104.83, 108.42, 116.36, 125.81, 122.9, 121.94, 114.98, 123.78, 112.88, 104.61, 121.02, 140.83, 132.6, 122.77, 115.7, 103.16, 109.55, 110.85, 106.36], '6M': [11.48, 15.51, 12.36, 15.01, 16.76, 22.99, 22.09, 17.8, 20.94, 27.77, 23.21, 35.08, 41.76, 38.56, 48.39, 64.44, 52.73, 45.46, 67.3, 74.97, 68.71, 107.55, 122.9, 112.88, 122.77, 106.36], '1Y': [1.73, 1.94, 1.95, 2.13, 2.08, 2.26, 2.5, 2.52, 2.12, 2.07, 2.18, 2.51, 2.87, 2.96, 3.39, 3.96, 4.75, 4.7, 5.23, 4.93, 4.94, 7.07, 9.1, 10.98, 10.11, 10.45, 12.1, 16.38, 14.01, 15.37, 16.67, 22.24, 22.09, 17.8, 20.94, 27.77, 23.21, 35.08, 41.76, 44.3, 44.36, 68.44, 56.98, 53.18, 62.93, 74.97, 68.71, 107.55, 122.9, 112.88, 122.77, 106.36] },
      velocityScore: { '1D': -37.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 39, eps: -0.32, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.69, RKNG: false },
      tonyNote: 'AXT Inc is a compound semiconductor substrate manufacturer — gallium arsenide, indium phosphide, and germanium wafers used in data center optical transceivers, 5G RF chips, and solar cells. Revenue is growing with optical networking demand. Small market cap but positioned at a genuine supply-chain chokepoint for III-V semiconductor materials.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 1, avgWeight: 4.44, proScore: 1.48, coverage: 0.333,
      price: 586.86, weeklyPrices: [531.18, 531.21, 546.20, 563.10, 586.86], weeklyChange: 10.48, sortRank: 0, periodReturns: { '1M': 32.7, '6M': 277.2, '1Y': 991.4 },
      priceHistory: { '1W': [531.18, 531.21, 546.2, 563.1, 586.86], '1M': [442.36, 465.26, 483.15, 463.91, 480, 515.83, 488.74, 494.09, 489.15, 482.02, 455.8, 459.62, 486.46, 484.28, 524.65, 530.6, 531.18, 531.21, 546.2, 563.1, 586.86], '6M': [155.59, 181.95, 166.26, 179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 586.86], '1Y': [53.77, 55.95, 58.57, 62.55, 65.78, 65.06, 67.02, 69.32, 71.43, 73.78, 76.07, 75.64, 80.67, 90.49, 96.15, 105.15, 107.21, 131.26, 119.7, 125.92, 120.47, 141.38, 160.1, 166.11, 153.97, 157.74, 161, 187.2, 175.01, 181.54, 187.88, 212.14, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 586.86] },
      velocityScore: { '1D': -40.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$202B', pe: 35.1, revenueGrowth: 46, eps: 16.72, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.44 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'GOOGL', name: 'GOOGL', easyScore: 2, avgWeight: 2.15, proScore: 1.43, coverage: 0.667,
      price: 364.06, weeklyPrices: [390.13, 380.34, 376.37, 361.85, 364.06], weeklyChange: -6.68, sortRank: 0, periodReturns: { '1M': -5, '6M': 13.9, '1Y': 119.1 },
      priceHistory: { '1W': [390.13, 380.34, 376.37, 361.85, 364.06], '1M': [383.25, 388.43, 398.04, 397.99, 400.8, 388.64, 387.35, 402.62, 401.07, 396.78, 387.66, 388.91, 387.66, 382.97, 388.88, 388.83, 390.13, 380.34, 376.37, 361.85, 364.06], '6M': [319.63, 320.21, 296.72, 314.09, 315.15, 328.57, 330, 333.26, 343.69, 324.32, 302.02, 310.9, 303.58, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 387.35, 387.66, 388.83, 364.06], '1Y': [166.18, 178.6, 175.95, 170.68, 178.64, 177.62, 183.58, 190.23, 196.53, 196.09, 201.96, 199.32, 207.48, 232.3, 240.37, 252.03, 245.79, 245.69, 241.53, 251.46, 251.69, 274.57, 284.31, 286.71, 292.81, 319.95, 317.62, 312.43, 302.46, 313.51, 316.54, 331.86, 330, 333.26, 343.69, 324.32, 302.02, 310.9, 303.58, 307.04, 310.92, 290.44, 287.56, 317.32, 337.12, 332.29, 349.78, 388.43, 387.35, 387.66, 388.83, 364.06] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$4.4T', pe: 27.8, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { BUZZ: 1.55, MEME: false, RKNG: 2.75 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
