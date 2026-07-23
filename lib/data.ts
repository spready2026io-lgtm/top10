// ── Index chart types & data ──────────────────────────────────────────────────

export type Period = '1W' | '1M' | 'YTD' | '6M' | '1Y';

// Chart-only period union. 1D is an intraday view (vs. prior close) shown on the
// tile and index charts. It is NOT part of the core Period set used by the
// returns/benchmark structures (SPY_RET, TOP10_RET, ETF_RETURNS, BASE_INDEX),
// so adding it here does not cascade through those Record<Period, …> shapes.
export type ChartPeriod = '1D' | Period;

export type ChartPeriodData = {
  top10: number[];
  spy: number[];
  top10Return: number;
  spyReturn: number;
  xLabels: string[];
};

// Index chart data keyed by period. 1D is optional so the file compiles even if
// a price build hasn't produced intraday data yet (degrades to the other periods).
export type IndexChartByPeriod = Record<Period, ChartPeriodData> & { '1D'?: ChartPeriodData };

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

const N: Record<Period, number> = { '1W': 5, '1M': 21, 'YTD': 26, '6M': 26, '1Y': 52 };

// @@GENERATED:SPY_RET@@
export const SPY_RET: Record<Period, number> = { '1W': -0.3, '1M': 1.1, 'YTD': 8.7, '6M': 7.6, '1Y': 16.9 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 7.1 }, { t: 'AMD', w: 5.7 }, { t: 'VRT', w: 3.9 }, { t: 'SIMO', w: 3.7 }, { t: 'TSM', w: 3.5 }],
  ARTY: [{ t: 'AMD', w: 5.5 }, { t: 'NVDA', w: 5.1 }, { t: 'MU', w: 4.9 }, { t: 'AVGO', w: 4.9 }, { t: 'CRWV', w: 3.9 }],
  BAI: [{ t: 'MU', w: 6.4 }, { t: 'AMD', w: 5.6 }, { t: 'NVDA', w: 4.8 }, { t: 'AVGO', w: 4.8 }, { t: 'TSM', w: 4.6 }],
  IGPT: [{ t: 'META', w: 9.3 }, { t: 'AMD', w: 9.2 }, { t: 'NVDA', w: 8.3 }, { t: 'MU', w: 8.0 }, { t: 'GOOGL', w: 8.0 }],
  IVES: [{ t: 'AAPL', w: 5.1 }, { t: 'NVDA', w: 5.0 }, { t: 'MSFT', w: 4.9 }, { t: 'AVGO', w: 4.9 }, { t: 'TSM', w: 4.8 }],
  ALAI: [{ t: 'NVDA', w: 13.7 }, { t: 'TSM', w: 5.3 }, { t: 'MSFT', w: 5.2 }, { t: 'AMZN', w: 4.8 }, { t: 'AVGO', w: 4.3 }],
  CHAT: [{ t: 'NVDA', w: 7.8 }, { t: 'GOOGL', w: 5.5 }, { t: 'AVGO', w: 5.0 }, { t: 'AMD', w: 4.2 }, { t: 'MU', w: 3.7 }],
  AIFD: [{ t: 'NVDA', w: 6.8 }, { t: 'PANW', w: 6.7 }, { t: 'MU', w: 6.0 }, { t: 'AVGO', w: 5.6 }, { t: 'ANET', w: 5.5 }],
  SPRX: [{ t: 'KLAC', w: 9.8 }, { t: 'NET', w: 9.7 }, { t: 'ALAB', w: 9.5 }, { t: 'MKSI', w: 8.1 }, { t: 'COHR', w: 7.7 }],
  AOTG: [{ t: 'AMD', w: 15.7 }, { t: 'NVDA', w: 10.8 }, { t: 'MU', w: 8.8 }, { t: 'TSM', w: 7.0 }, { t: 'TOST', w: 5.7 }],
  SOXX: [{ t: 'AMD', w: 8.9 }, { t: 'NVDA', w: 8.3 }, { t: 'MU', w: 8.2 }, { t: 'AVGO', w: 7.4 }, { t: 'INTC', w: 5.4 }],
  PSI: [{ t: 'AMAT', w: 6.4 }, { t: 'AMD', w: 5.8 }, { t: 'MU', w: 5.7 }, { t: 'KLAC', w: 5.6 }, { t: 'LRCX', w: 5.2 }],
  XSD: [{ t: 'AMD', w: 3.0 }, { t: 'MXL', w: 3.0 }, { t: 'PI', w: 2.8 }, { t: 'ALGM', w: 2.8 }, { t: 'AMBA', w: 2.7 }],
  DRAM: [{ t: 'STX', w: 5.0 }, { t: 'WDC', w: 4.7 }, { t: 'SNDK', w: 4.6 }, { t: 'MU', w: 2.6 }, { t: 'SKHY', w: 0.5 }],
  PTF: [{ t: 'MU', w: 5.0 }, { t: 'SNDK', w: 4.9 }, { t: 'WDC', w: 4.4 }, { t: 'STX', w: 4.1 }, { t: 'KLAC', w: 4.0 }],
  WCLD: [{ t: 'FROG', w: 2.9 }, { t: 'PANW', w: 2.9 }, { t: 'DDOG', w: 2.8 }, { t: 'CRWD', w: 2.5 }, { t: 'OKTA', w: 2.4 }],
  IGV: [{ t: 'PANW', w: 10.4 }, { t: 'MSFT', w: 8.6 }, { t: 'PLTR', w: 8.4 }, { t: 'CRWD', w: 7.3 }, { t: 'ORCL', w: 5.5 }],
  FDTX: [{ t: 'MRVL', w: 9.7 }, { t: 'MU', w: 9.3 }, { t: 'TSM', w: 6.4 }, { t: 'WDC', w: 4.5 }, { t: 'PANW', w: 4.2 }],
  GTEK: [{ t: 'MRVL', w: 3.4 }, { t: 'NET', w: 3.2 }, { t: 'APH', w: 2.5 }, { t: 'CDNS', w: 2.4 }, { t: 'DELL', w: 2.3 }],
  ARKK: [{ t: 'TSLA', w: 10.0 }, { t: 'TEM', w: 4.9 }, { t: 'CRSP', w: 4.5 }, { t: 'COIN', w: 4.4 }, { t: 'SPCX', w: 4.4 }],
  MARS: [{ t: 'SPCX', w: 20.1 }, { t: 'RKLB', w: 9.2 }, { t: 'ASTS', w: 7.3 }, { t: 'VSAT', w: 6.0 }, { t: 'GSAT', w: 5.6 }],
  FRWD: [{ t: 'NVDA', w: 9.3 }, { t: 'AMD', w: 7.4 }, { t: 'STX', w: 7.0 }, { t: 'TSM', w: 5.9 }, { t: 'LRCX', w: 5.4 }],
  BCTK: [{ t: 'TSM', w: 8.4 }, { t: 'LRCX', w: 7.2 }, { t: 'AVGO', w: 7.1 }, { t: 'SPCX', w: 7.0 }, { t: 'GOOG', w: 6.7 }],
  FWD: [{ t: 'NVDA', w: 3.1 }, { t: 'AVGO', w: 2.5 }, { t: 'AMD', w: 2.3 }, { t: 'AMAT', w: 2.3 }, { t: 'LRCX', w: 1.9 }],
  CBSE: [{ t: 'META', w: 3.9 }, { t: 'TXG', w: 3.2 }, { t: 'SCI', w: 3.2 }, { t: 'SBUX', w: 3.1 }, { t: 'VG', w: 3.1 }],
  FCUS: [{ t: 'DELL', w: 4.6 }, { t: 'MU', w: 4.2 }, { t: 'STX', w: 4.1 }, { t: 'HPE', w: 4.0 }, { t: 'WDC', w: 3.9 }],
  WGMI: [{ t: 'CIFR', w: 18.1 }, { t: 'HUT', w: 11.3 }, { t: 'IREN', w: 10.6 }, { t: 'KEEL', w: 9.7 }, { t: 'CLSK', w: 5.4 }],
  CNEQ: [{ t: 'NVDA', w: 14.4 }, { t: 'MSFT', w: 6.4 }, { t: 'GOOG', w: 5.8 }, { t: 'TSM', w: 5.7 }, { t: 'AAPL', w: 5.3 }],
  SGRT: [{ t: 'VRT', w: 12.6 }, { t: 'WDC', w: 10.0 }, { t: 'ARW', w: 6.5 }, { t: 'MU', w: 6.4 }, { t: 'WELL', w: 6.1 }],
  SPMO: [{ t: 'MU', w: 9.8 }, { t: 'NVDA', w: 8.5 }, { t: 'AVGO', w: 6.6 }, { t: 'GOOGL', w: 4.6 }, { t: 'JNJ', w: 4.5 }],
  XMMO: [{ t: 'CW', w: 4.1 }, { t: 'FTI', w: 3.7 }, { t: 'ATI', w: 3.5 }, { t: 'STRL', w: 3.0 }, { t: 'WWD', w: 3.0 }],
  POW: [{ t: 'PWR', w: 5.0 }, { t: 'POWL', w: 4.4 }, { t: 'ETN', w: 4.4 }, { t: 'PRY', w: 4.2 }, { t: 'NVT', w: 4.0 }],
  VOLT: [{ t: 'BELFB', w: 7.7 }, { t: 'POWL', w: 6.3 }, { t: 'ETN', w: 5.5 }, { t: 'NEE', w: 5.3 }, { t: 'PWR', w: 5.1 }],
  PBD: [{ t: 'NFI', w: 1.3 }, { t: 'RIVN', w: 1.3 }, { t: 'SHLS', w: 1.2 }, { t: 'BLBD', w: 1.2 }, { t: 'LCID', w: 1.2 }],
  PBW: [{ t: 'OPAL', w: 2.4 }, { t: 'GEVO', w: 2.1 }, { t: 'DAR', w: 2.1 }, { t: 'BETA', w: 2.0 }, { t: 'RIVN', w: 1.9 }],
  IVEP: [{ t: 'NEE', w: 4.2 }, { t: 'CEG', w: 4.2 }, { t: 'SMERY', w: 4.2 }, { t: 'SBGSY', w: 4.2 }, { t: 'ETN', w: 4.2 }],
  AIRR: [{ t: 'IESC', w: 3.4 }, { t: 'STRL', w: 3.4 }, { t: 'DY', w: 3.3 }, { t: 'CHRW', w: 3.2 }, { t: 'POWL', w: 3.2 }],
  PRN: [{ t: 'FIX', w: 4.7 }, { t: 'HWM', w: 4.3 }, { t: 'STRL', w: 4.2 }, { t: 'PWR', w: 4.1 }, { t: 'JBL', w: 3.4 }],
  RSHO: [{ t: 'TKR', w: 8.7 }, { t: 'POWL', w: 7.3 }, { t: 'CGNX', w: 7.2 }, { t: 'CAT', w: 6.9 }, { t: 'AIT', w: 6.0 }],
  IDEF: [{ t: 'RTX', w: 8.7 }, { t: 'LMT', w: 7.0 }, { t: 'BA', w: 4.8 }, { t: 'GD', w: 4.7 }, { t: 'NOC', w: 3.5 }],
  BILT: [{ t: 'UNP', w: 6.1 }, { t: 'AENA', w: 4.8 }, { t: 'AEP', w: 4.5 }, { t: 'TRP', w: 4.2 }, { t: 'XEL', w: 3.8 }],
  BUZZ: [{ t: 'PLTR', w: 3.3 }, { t: 'META', w: 3.3 }, { t: 'MSTR', w: 3.3 }, { t: 'NVDA', w: 3.3 }, { t: 'GME', w: 3.3 }],
  MEME: [{ t: 'NBIS', w: 7.3 }, { t: 'IREN', w: 7.0 }, { t: 'AAOI', w: 6.6 }, { t: 'BE', w: 6.6 }, { t: 'SNDK', w: 6.3 }],
  RKNG: [{ t: 'OPEN', w: 4.4 }, { t: 'DELL', w: 4.2 }, { t: 'AMD', w: 4.2 }, { t: 'VRT', w: 4.1 }, { t: 'BMNR', w: 4.1 }],
};
// @@END_GENERATED:ETF_TOP_HOLDINGS@@

// @@GENERATED:ETF_INFO@@
export const ETF_INFO: Record<string, { name: string; manager: string; aum?: number }> = {
  AIS: { name: "VistaShares Artificial Intelligence Supercycle ETF", manager: "VistaShares Advisors LLC", aum: 969790784 },
  ARTY: { name: "iShares Future AI & Tech ETF", manager: "iShares", aum: 3930527488 },
  BAI: { name: "iShares A.I. Innovation and Tech Active ETF", manager: "iShares", aum: 15693548544 },
  IGPT: { name: "Invesco AI and Next Gen Software ETF", manager: "Invesco", aum: 1341310592 },
  IVES: { name: "Dan IVES Wedbush AI Revolution ETF", manager: "Wedbush Funds", aum: 1109999360 },
  ALAI: { name: "Alger AI Enablers & Adopters ETF", manager: "Alger", aum: 451164832 },
  CHAT: { name: "Roundhill Generative AI & Technology ETF", manager: "Roundhill Investments", aum: 2134398080 },
  AIFD: { name: "TCW Artificial Intelligence ETF", manager: "TCW", aum: 141635056 },
  SPRX: { name: "Spear Alpha ETF", manager: "Spear", aum: 291538048 },
  AOTG: { name: "AOT Growth and Innovation ETF", manager: "AOT Invest LLC", aum: 105217664 },
  SOXX: { name: "iShares Semiconductor ETF", manager: "iShares", aum: 47824830464 },
  PSI: { name: "Invesco Semiconductors ETF", manager: "Invesco", aum: 3097870848 },
  XSD: { name: "State Street SPDR S&P Semicondu", manager: "State Street Investment Management", aum: 3476073728 },
  DRAM: { name: "Roundhill Memory ETF", manager: "Roundhill Investments", aum: 25910761472 },
  PTF: { name: "Invesco Dorsey Wright Technology Momentum ETF", manager: "Invesco", aum: 1150875008 },
  WCLD: { name: "WisdomTree Cloud Computing Fund", manager: "WisdomTree", aum: 245218432 },
  IGV: { name: "iShares Expanded Tech-Software Sector ETF", manager: "iShares", aum: 13542322176 },
  FDTX: { name: "Fidelity Disruptive Technology ETF", manager: "Fidelity Investments", aum: 299134528 },
  GTEK: { name: "Goldman Sachs Future Tech Leaders Equity ETF", manager: "Goldman Sachs", aum: 248555232 },
  ARKK: { name: "ARK Innovation ETF", manager: "ARK ETF Trust", aum: 6534055424 },
  MARS: { name: "Roundhill Space & Technology ETF", manager: "Roundhill Investments", aum: 74903600 },
  FRWD: { name: "Nomura Transformational Technologies ETF", manager: "Nomura", aum: 284891584 },
  BCTK: { name: "Baron Technology ETF", manager: "Baron Capital Group, Inc.", aum: 205235040 },
  FWD: { name: "AB Disruptors ETF", manager: "AllianceBernstein", aum: 3163472384 },
  CBSE: { name: "Clough Select Equity ETF", manager: "Clough Capital Partners L.P.", aum: 54983204 },
  FCUS: { name: "Pinnacle Focused Opportunities ETF", manager: "Pinnacle", aum: 100523352 },
  WGMI: { name: "CoinShares Bitcoin Mining ETF", manager: "CoinShares ETF Trust", aum: 343591904 },
  CNEQ: { name: "Alger Concentrated Equity ETF", manager: "Alger", aum: 731520704 },
  SGRT: { name: "SMART Earnings Growth 30 ETF", manager: "SmartWay ETFs", aum: 62753768 },
  SPMO: { name: "Invesco S&P 500 Momentum ETF", manager: "Invesco", aum: 22210627584 },
  XMMO: { name: "Invesco S&P MidCap Momentum ETF", manager: "Invesco", aum: 7917685760 },
  POW: { name: "VistaShares Electrification Supercycle ETF", manager: "VistaShares Advisors LLC", aum: 68422496 },
  VOLT: { name: "Tema Electrification ETF", manager: "Tema ETFs", aum: 809755840 },
  PBD: { name: "Invesco Global Clean Energy ETF", manager: "Invesco", aum: 206513408 },
  PBW: { name: "Invesco WilderHill Clean Energy", manager: "Invesco", aum: 484880768 },
  IVEP: { name: "Dan IVES Wedbush AI Power & Infrastructure ETF", manager: "Wedbush Funds", aum: 19010532 },
  AIRR: { name: "First Trust RBA American Industrial RenaissanceTM ETF", manager: "First Trust", aum: 11489859584 },
  PRN: { name: "Invesco Dorsey Wright Industria", manager: "Invesco", aum: 644142400 },
  IDEF: { name: "iShares Defense Industrials Act", manager: "BlackRock", aum: 4074098176 },
  BILT: { name: "iShares Infrastructure Active ETF", manager: "BlackRock", aum: 31458192 },
  BUZZ: { name: "VanEck Social Sentiment ETF", manager: "VanEck", aum: 104506896 },
  MEME: { name: "Roundhill ETF Trust - Roundhill Meme Stock ETF", manager: "" },
  RKNG: { name: "Defiance Retail Kings ETF", manager: "Defiance ETFs LLC", aum: 7150748 },
};
// @@END_GENERATED:ETF_INFO@@

// @@GENERATED:TOP10_RET@@
// Top10 composite returns per theme per period (average of all ETFs in theme)
const TOP10_RET: Record<Theme, Record<Period, number>> = {
  'AI & ML':         { '1W': 4, '1M': -7.4, 'YTD': 37.3, '6M': 30.4, '1Y': 60.9 },
  'Semiconductors':  { '1W': 6.8, '1M': -12, 'YTD': 87.3, '6M': 70.8, '1Y': 121.4 },
  'Broad Tech':      { '1W': 3.1, '1M': -7.3, 'YTD': 19.9, '6M': 14, '1Y': 31 },
  'Electrification': { '1W': 1.8, '1M': -8.7, 'YTD': 19.8, '6M': 9.2, '1Y': 29.9 },
  'Industrials':     { '1W': 2.8, '1M': -2.1, 'YTD': 18.5, '6M': 7.2, '1Y': 28.3 },
  'Meme':            { '1W': 8.1, '1M': -15.6, 'YTD': 8.9, '6M': -2.4, '1Y': -6.6 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, IndexChartByPeriod> = {
  'AI & ML': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -0.6, spyReturn: -0.82, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.13, 104.13, 104.76, 103.97], spy: [100, 99.84, 100.67, 100.55, 99.73], top10Return: 4, spyReturn: -0.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.59, 100.1, 97.67, 100.17, 103.12, 99.83, 95.86, 97.31, 94.71, 97.82, 97.64, 94.6, 95.19, 93.98, 90.61, 89.19, 89.29, 92.74, 93.32, 92.59], spy: [100, 99.95, 100.1, 99.37, 101.01, 101.8, 101.66, 101.53, 102.41, 101.93, 102.47, 102.91, 102.13, 102.49, 102.89, 102.34, 101.32, 101.16, 102, 101.89, 101.05], top10Return: -7.4, spyReturn: 1.1, xLabels: ["Jun 25", "Jul 2", "Jul 9", "Jul 16", "Jul 23"] },
    'YTD': { top10: [100, 103.72, 105.03, 107.32, 103.63, 104.07, 103.31, 103.13, 98.84, 102.81, 101.1, 97.05, 106.54, 115.79, 122.31, 124.78, 138.06, 131.35, 145.5, 153.4, 144.07, 158.29, 149.64, 141.77, 139.3, 137.32], spy: [100, 101.78, 101.43, 101.99, 101.12, 101.47, 100.38, 100.6, 98.6, 98.11, 95.79, 95.37, 99.71, 102.89, 104.7, 105.68, 108.41, 107.6, 110.05, 111.02, 108.19, 109.16, 108.66, 109.31, 110.69, 108.71], top10Return: 37.3, spyReturn: 8.7, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 99.81, 96.62, 97.57, 97.54, 98.52, 96.81, 97.5, 96.42, 87.88, 96.33, 107.73, 112.1, 116.59, 119.36, 131.08, 125.88, 138.13, 149.25, 134.55, 141.55, 139.67, 141.01, 138.13, 127.27, 130.43], spy: [100, 100.4, 100.2, 98.91, 99.01, 99.59, 98.41, 97.07, 95.09, 91.69, 95.65, 100.76, 102.15, 103.76, 104.18, 107.26, 107.17, 108.9, 110.21, 106.94, 108.86, 106.39, 108.2, 109.07, 108.92, 107.56], top10Return: 30.4, spyReturn: 7.6, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 102.34, 102.66, 105.18, 100.38, 103.55, 103.85, 109.98, 112.24, 113.89, 116.04, 120.99, 118.65, 116.9, 126.82, 122.67, 119.98, 112.99, 115.24, 118.49, 121.72, 110.87, 118.75, 119.15, 120.96, 122.55, 122.43, 122.6, 121.88, 119.55, 121.25, 116.87, 119.22, 120.21, 118.71, 107.51, 118.28, 132.5, 137.85, 139.76, 150.74, 157.96, 153.88, 170.69, 183.2, 165.93, 174.96, 172.87, 174.36, 170.75, 156.82, 160.93], spy: [100, 100.04, 99.77, 101.68, 100.61, 101.96, 102.35, 102.84, 103.94, 104.24, 105.4, 106.13, 104.88, 105.3, 108.39, 106.84, 107.75, 104.48, 107.17, 107.91, 108.41, 105.86, 108.86, 107.72, 109.44, 109.06, 109.23, 109.65, 109.42, 107.67, 108.38, 107.27, 106.95, 105.49, 103.34, 99.65, 103.94, 109.5, 111.02, 112.22, 114.12, 116.39, 115.69, 118.33, 118.93, 116.22, 118.31, 115.61, 117.59, 118.53, 118.37, 116.89], top10Return: 60.9, spyReturn: 16.9, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Semiconductors': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -0.4, spyReturn: -0.82, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.39, 107.77, 107.28, 106.85], spy: [100, 99.84, 100.67, 100.55, 99.73], top10Return: 6.8, spyReturn: -0.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.37, 104.43, 98.75, 102.09, 106.6, 98.9, 91.56, 94.55, 88.66, 94.32, 93.57, 88.13, 91.46, 88.52, 83.17, 82.38, 82.7, 88.7, 88.33, 87.95], spy: [100, 99.95, 100.1, 99.37, 101.01, 101.8, 101.66, 101.53, 102.41, 101.93, 102.47, 102.91, 102.13, 102.49, 102.89, 102.34, 101.32, 101.16, 102, 101.89, 101.05], top10Return: -12, spyReturn: 1.1, xLabels: ["Jun 25", "Jul 2", "Jul 9", "Jul 16", "Jul 23"] },
    'YTD': { top10: [100, 111.75, 115.62, 118.03, 116.9, 124.61, 123.04, 126.17, 122.08, 130.26, 132.07, 128.94, 148.77, 163.2, 177.47, 174.16, 197.02, 191.25, 208.22, 216.06, 206.17, 217.81, 210.27, 188.97, 184.35, 187.31], spy: [100, 101.78, 101.43, 101.99, 101.12, 101.47, 100.38, 100.6, 98.6, 98.11, 95.79, 95.37, 99.71, 102.89, 104.7, 105.68, 108.41, 107.6, 110.05, 111.02, 108.19, 109.16, 108.66, 109.31, 110.69, 108.71], top10Return: 87.3, spyReturn: 8.7, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 104.09, 107.48, 110.18, 109.42, 111.53, 107.44, 112.06, 115.87, 114.31, 122.33, 133.93, 148.58, 162.56, 164.41, 175.57, 170.96, 192.87, 195.29, 187.52, 189.53, 185.65, 189.69, 177.38, 161.46, 170.85], spy: [100, 100.4, 100.2, 98.91, 99.01, 99.59, 98.41, 97.07, 95.09, 91.69, 95.65, 100.76, 102.15, 103.76, 104.18, 107.26, 107.17, 108.9, 110.21, 106.94, 108.86, 106.39, 108.2, 109.07, 108.92, 107.56], top10Return: 70.8, spyReturn: 7.6, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 102.65, 103.18, 108.16, 105.87, 111.32, 109.59, 113.29, 115.24, 120.14, 121.55, 127.11, 127.19, 125.72, 135.73, 137.1, 135.51, 134.49, 136.98, 145.46, 145.78, 134.45, 142.25, 146.91, 157.67, 161.5, 162.9, 170.11, 174.12, 170.84, 167.84, 159.5, 162.73, 163.81, 166.87, 160.15, 181.57, 187.25, 203.39, 203.32, 222.5, 225.81, 218.8, 237.01, 249.92, 231.54, 240.75, 238.64, 237.14, 226.94, 214.15, 221.34], spy: [100, 100.04, 99.77, 101.68, 100.61, 101.96, 102.35, 102.84, 103.94, 104.24, 105.4, 106.13, 104.88, 105.3, 108.39, 106.84, 107.75, 104.48, 107.17, 107.91, 108.41, 105.86, 108.86, 107.72, 109.44, 109.06, 109.23, 109.65, 109.42, 107.67, 108.38, 107.27, 106.95, 105.49, 103.34, 99.65, 103.94, 109.5, 111.02, 112.22, 114.12, 116.39, 115.69, 118.33, 118.93, 116.22, 118.31, 115.61, 117.59, 118.53, 118.37, 116.89], top10Return: 121.4, spyReturn: 16.9, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Broad Tech': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -0.5, spyReturn: -0.82, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.58, 103.26, 103.71, 103.13], spy: [100, 99.84, 100.67, 100.55, 99.73], top10Return: 3.1, spyReturn: -0.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.05, 98.16, 98.46, 99.95, 101.96, 100.76, 97.73, 98.09, 96, 97.22, 97.05, 94.88, 95.33, 95.09, 92.15, 90.52, 90.91, 93.1, 93.3, 92.73], spy: [100, 99.95, 100.1, 99.37, 101.01, 101.8, 101.66, 101.53, 102.41, 101.93, 102.47, 102.91, 102.13, 102.49, 102.89, 102.34, 101.32, 101.16, 102, 101.89, 101.05], top10Return: -7.3, spyReturn: 1.1, xLabels: ["Jun 25", "Jul 2", "Jul 9", "Jul 16", "Jul 23"] },
    'YTD': { top10: [100, 104.26, 105.87, 106.04, 101.82, 102.44, 103.08, 103.66, 100.44, 101.6, 99.83, 98.14, 106.02, 112.3, 116.27, 119.98, 125.76, 120.55, 129.58, 133.88, 125.39, 133.35, 129.61, 122.45, 121.44, 119.86], spy: [100, 101.78, 101.43, 101.99, 101.12, 101.47, 100.38, 100.6, 98.6, 98.11, 95.79, 95.37, 99.71, 102.89, 104.7, 105.68, 108.41, 107.6, 110.05, 111.02, 108.19, 109.16, 108.66, 109.31, 110.69, 108.71], top10Return: 19.9, spyReturn: 8.7, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 98.15, 95.06, 96.37, 96.2, 98.61, 96.61, 96.57, 96.65, 90.1, 95.76, 103.38, 108.08, 110.49, 113.22, 121, 116.83, 121.93, 127.94, 119.82, 124.01, 121.95, 123.57, 118.84, 112.5, 114], spy: [100, 100.4, 100.2, 98.91, 99.01, 99.59, 98.41, 97.07, 95.09, 91.69, 95.65, 100.76, 102.15, 103.76, 104.18, 107.26, 107.17, 108.9, 110.21, 106.94, 108.86, 106.39, 108.2, 109.07, 108.92, 107.56], top10Return: 14, spyReturn: 7.6, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 99.96, 100.15, 101.05, 99.89, 102.11, 101.3, 105.36, 107.94, 109.66, 111.46, 116.43, 117.38, 111.94, 117.35, 116.65, 113.3, 107.56, 110.09, 112.58, 113.05, 107.24, 111.98, 111.71, 114.82, 116.88, 116.92, 115.18, 116.04, 115.56, 117.11, 116.68, 114.77, 114.46, 113.14, 107.38, 114.89, 122.29, 125.69, 125.92, 131.43, 134.65, 132.62, 141.75, 146.35, 137.07, 143.15, 140.22, 140.38, 135.22, 128.23, 131.01], spy: [100, 100.04, 99.77, 101.68, 100.61, 101.96, 102.35, 102.84, 103.94, 104.24, 105.4, 106.13, 104.88, 105.3, 108.39, 106.84, 107.75, 104.48, 107.17, 107.91, 108.41, 105.86, 108.86, 107.72, 109.44, 109.06, 109.23, 109.65, 109.42, 107.67, 108.38, 107.27, 106.95, 105.49, 103.34, 99.65, 103.94, 109.5, 111.02, 112.22, 114.12, 116.39, 115.69, 118.33, 118.93, 116.22, 118.31, 115.61, 117.59, 118.53, 118.37, 116.89], top10Return: 31, spyReturn: 16.9, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Electrification': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 0, spyReturn: -0.82, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 99.36, 101.54, 101.75, 101.8], spy: [100, 99.84, 100.67, 100.55, 99.73], top10Return: 1.8, spyReturn: -0.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.66, 98.98, 96.54, 97.78, 99.86, 97.64, 95.11, 95.98, 93.32, 93.15, 93.32, 91.39, 92.41, 92.16, 89.93, 89.66, 89.08, 91.05, 91.24, 91.29], spy: [100, 99.95, 100.1, 99.37, 101.01, 101.8, 101.66, 101.53, 102.41, 101.93, 102.47, 102.91, 102.13, 102.49, 102.89, 102.34, 101.32, 101.16, 102, 101.89, 101.05], top10Return: -8.7, spyReturn: 1.1, xLabels: ["Jun 25", "Jul 2", "Jul 9", "Jul 16", "Jul 23"] },
    'YTD': { top10: [100, 104.65, 109.5, 112.24, 113.07, 115.83, 115.85, 117.25, 110.56, 114.38, 113.63, 113.04, 119.05, 122.99, 128.47, 131.71, 138.71, 129.14, 138.82, 137.51, 128.41, 133.99, 128.01, 121.14, 120.36, 119.83], spy: [100, 101.78, 101.43, 101.99, 101.12, 101.47, 100.38, 100.6, 98.6, 98.11, 95.79, 95.37, 99.71, 102.89, 104.7, 105.68, 108.41, 107.6, 110.05, 111.02, 108.19, 109.16, 108.66, 109.31, 110.69, 108.71], top10Return: 19.8, spyReturn: 8.7, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 100.7, 102.32, 104.16, 106.09, 106.38, 102.69, 104.23, 103.86, 100.95, 103.39, 111.63, 113.55, 117.89, 120.39, 124.6, 118.62, 126.35, 126.4, 117.2, 119.69, 116.82, 116.67, 111.06, 107.44, 109.21], spy: [100, 100.4, 100.2, 98.91, 99.01, 99.59, 98.41, 97.07, 95.09, 91.69, 95.65, 100.76, 102.15, 103.76, 104.18, 107.26, 107.17, 108.9, 110.21, 106.94, 108.86, 106.39, 108.2, 109.07, 108.92, 107.56], top10Return: 9.2, spyReturn: 7.6, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 99.02, 98.8, 101.5, 100.24, 101.59, 100.91, 101.86, 105.05, 107.26, 108.94, 113.3, 117.27, 113.22, 116.84, 116.58, 116.58, 113.06, 113.98, 115.2, 117.1, 113.38, 117.82, 119.71, 119.31, 122.37, 122.6, 123.11, 125.95, 123.39, 125.88, 124.22, 124.05, 126.64, 128.48, 127.22, 131.41, 138.36, 139.69, 138.18, 145.77, 146.93, 138.84, 146.99, 149.72, 141.63, 141.4, 137.99, 136.1, 131.63, 128.99, 129.88], spy: [100, 100.04, 99.77, 101.68, 100.61, 101.96, 102.35, 102.84, 103.94, 104.24, 105.4, 106.13, 104.88, 105.3, 108.39, 106.84, 107.75, 104.48, 107.17, 107.91, 108.41, 105.86, 108.86, 107.72, 109.44, 109.06, 109.23, 109.65, 109.42, 107.67, 108.38, 107.27, 106.95, 105.49, 103.34, 99.65, 103.94, 109.5, 111.02, 112.22, 114.12, 116.39, 115.69, 118.33, 118.93, 116.22, 118.31, 115.61, 117.59, 118.53, 118.37, 116.89], top10Return: 29.9, spyReturn: 16.9, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Industrials': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 1.3, spyReturn: -0.82, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 99.63, 101.39, 101.99, 102.84], spy: [100, 99.84, 100.67, 100.55, 99.73], top10Return: 2.8, spyReturn: -0.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.88, 100.98, 99.65, 100.77, 101.69, 100.13, 99.14, 99.97, 97.73, 97.69, 97.4, 96.06, 96.98, 96.73, 95.64, 95.32, 94.95, 96.54, 97.14, 97.96], spy: [100, 99.95, 100.1, 99.37, 101.01, 101.8, 101.66, 101.53, 102.41, 101.93, 102.47, 102.91, 102.13, 102.49, 102.89, 102.34, 101.32, 101.16, 102, 101.89, 101.05], top10Return: -2.1, spyReturn: 1.1, xLabels: ["Jun 25", "Jul 2", "Jul 9", "Jul 16", "Jul 23"] },
    'YTD': { top10: [100, 107.06, 111.97, 112.23, 112.58, 115.61, 117.83, 117.62, 112.77, 112.75, 111.95, 110.3, 118.2, 118.07, 119.22, 121.31, 123.47, 117.74, 123.88, 123.89, 122.25, 124.17, 122.86, 117.34, 117.09, 118.56], spy: [100, 101.78, 101.43, 101.99, 101.12, 101.47, 100.38, 100.6, 98.6, 98.11, 95.79, 95.37, 99.71, 102.89, 104.7, 105.68, 108.41, 107.6, 110.05, 111.02, 108.19, 109.16, 108.66, 109.31, 110.69, 108.71], top10Return: 18.5, spyReturn: 8.7, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 99.3, 102.83, 105.07, 106.34, 107.47, 103.46, 101.98, 100.75, 96.5, 102.41, 108.01, 106.89, 108.22, 108.72, 111.56, 107.62, 111.8, 110.99, 108.7, 110.71, 109.99, 110.05, 106.93, 104.58, 107.18], spy: [100, 100.4, 100.2, 98.91, 99.01, 99.59, 98.41, 97.07, 95.09, 91.69, 95.65, 100.76, 102.15, 103.76, 104.18, 107.26, 107.17, 108.9, 110.21, 106.94, 108.86, 106.39, 108.2, 109.07, 108.92, 107.56], top10Return: 7.2, spyReturn: 7.6, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 101.06, 101.69, 103.61, 100.73, 102.91, 102.68, 102.94, 104.29, 106, 108.64, 111.23, 109.64, 107.28, 111.48, 109.98, 108.35, 104.31, 106.58, 107.59, 108.57, 105.53, 110.58, 110.36, 115.84, 121.05, 120.2, 119.93, 125.63, 125.23, 128.14, 125.72, 123.3, 121.22, 120.49, 115.37, 122.79, 129.03, 128.48, 127.46, 133.07, 132.44, 127.45, 133.85, 132.67, 130.17, 132.31, 132.1, 132.42, 128.03, 125.11, 128.29], spy: [100, 100.04, 99.77, 101.68, 100.61, 101.96, 102.35, 102.84, 103.94, 104.24, 105.4, 106.13, 104.88, 105.3, 108.39, 106.84, 107.75, 104.48, 107.17, 107.91, 108.41, 105.86, 108.86, 107.72, 109.44, 109.06, 109.23, 109.65, 109.42, 107.67, 108.38, 107.27, 106.95, 105.49, 103.34, 99.65, 103.94, 109.5, 111.02, 112.22, 114.12, 116.39, 115.69, 118.33, 118.93, 116.22, 118.31, 115.61, 117.59, 118.53, 118.37, 116.89], top10Return: 28.3, spyReturn: 16.9, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Meme': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 0.4, spyReturn: -0.82, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.09, 104.39, 108.24, 108.14], spy: [100, 99.84, 100.67, 100.55, 99.73], top10Return: 8.1, spyReturn: -0.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 95.89, 93.83, 92.27, 93.7, 96.55, 95.76, 91.7, 89.6, 88.76, 88.42, 89.52, 86.92, 85.21, 84.86, 81.48, 78.38, 78.37, 81.5, 84.54, 84.42], spy: [100, 99.95, 100.1, 99.37, 101.01, 101.8, 101.66, 101.53, 102.41, 101.93, 102.47, 102.91, 102.13, 102.49, 102.89, 102.34, 101.32, 101.16, 102, 101.89, 101.05], top10Return: -15.6, spyReturn: 1.1, xLabels: ["Jun 25", "Jul 2", "Jul 9", "Jul 16", "Jul 23"] },
    'YTD': { top10: [100, 109.04, 106.11, 104.61, 100.49, 95.31, 94, 92.59, 89.64, 92.76, 93.3, 91.13, 100.94, 113.7, 112.1, 116.32, 127.57, 122.6, 140.1, 136.92, 129.46, 131.93, 124.31, 112.74, 108.37, 108.91], spy: [100, 101.78, 101.43, 101.99, 101.12, 101.47, 100.38, 100.6, 98.6, 98.11, 95.79, 95.37, 99.71, 102.89, 104.7, 105.68, 108.41, 107.6, 110.05, 111.02, 108.19, 109.16, 108.66, 109.31, 110.69, 108.71], top10Return: 8.9, spyReturn: 8.7, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 94.93, 83.39, 83.45, 84.74, 84.82, 81.83, 84.17, 82.63, 74.61, 81.21, 93.37, 101.79, 99.38, 103.23, 113.32, 108.76, 120.58, 127.23, 112.14, 116.29, 111.36, 111.11, 102.44, 93.98, 97.67], spy: [100, 100.4, 100.2, 98.91, 99.01, 99.59, 98.41, 97.07, 95.09, 91.69, 95.65, 100.76, 102.15, 103.76, 104.18, 107.26, 107.17, 108.9, 110.21, 106.94, 108.86, 106.39, 108.2, 109.07, 108.92, 107.56], top10Return: -2.4, spyReturn: 7.6, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 102.21, 97.42, 93.96, 87.19, 88.26, 85.12, 82.6, 82.2, 85.95, 87.24, 89.19, 87.8, 82.58, 87.58, 85.27, 87.05, 85.42, 84.55, 83.18, 86.05, 80.57, 85.3, 85.89, 89, 89.12, 90.21, 86.29, 87.74, 88.4, 85.69, 88.88, 91.75, 91.47, 96.88, 94.14, 94.78, 103.24, 108.4, 102.96, 106.91, 114.46, 115.5, 109.4, 109.77, 110.07, 104.09, 100.57, 95.85, 94.27, 88.6, 93.41], spy: [100, 100.04, 99.77, 101.68, 100.61, 101.96, 102.35, 102.84, 103.94, 104.24, 105.4, 106.13, 104.88, 105.3, 108.39, 106.84, 107.75, 104.48, 107.17, 107.91, 108.41, 105.86, 108.86, 107.72, 109.44, 109.06, 109.23, 109.65, 109.42, 107.67, 108.38, 107.27, 106.95, 105.49, 103.34, 99.65, 103.94, 109.5, 111.02, 112.22, 114.12, 116.39, 115.69, 118.33, 118.93, 116.22, 118.31, 115.61, 117.59, 118.53, 118.37, 116.89], top10Return: -6.6, spyReturn: 16.9, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
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
  currency?: string;      // ISO trading currency (EUR, AUD…); absent = USD. price/eps/marketCap are denominated in it
  weeklyPrices: number[];
  weeklyChange: number;
  dayChange?: number;     // today's % move vs. prior close (1D); refreshed intraday by the 3×/day price jobs
  periodReturns: { '1M': number; 'YTD': number; '6M': number; '1Y': number };
  priceHistory?: { '1D'?: number[]; '1W': number[]; '1M': number[]; 'YTD': number[]; '6M': number[]; '1Y': number[] };
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
  currency?: string;         // ISO trading currency (EUR, AUD…); absent = USD
  weeklyChange: number;
};

// ── Theme configuration ───────────────────────────────────────────────────────

export const THEMES: Theme[] = ['AI & ML', 'Semiconductors', 'Broad Tech', 'Electrification', 'Industrials', 'Meme'];

// Last scan timestamp — patched by build-data-ts.js after each run
// @@GENERATED:SCAN_TIMESTAMP@@
export const SCAN_TIMESTAMP    = '2026-07-23T13:37:02.177Z';
export const SCAN_TIMESTAMP_NY = 'July 23, 2026 at 9:37 AM ET';
// @@END_GENERATED:SCAN_TIMESTAMP@@

// Number of ETFs per theme — denominator for Coverage Score display (x/n badge)
// @@GENERATED:THEME_ETF_COUNT@@
export const THEME_ETF_COUNT: Record<Theme, number> = {
  'AI & ML':         10,
  'Semiconductors':  4,
  'Broad Tech':      17,
  'Electrification': 5,
  'Industrials':     5,
  'Meme':            3,
};
// @@END_GENERATED:THEME_ETF_COUNT@@

// @@GENERATED:HOLDINGS_COUNT@@
// Total holdings rows across all theme ETFs (every position, counting a stock
// once per ETF that holds it). Powers the home carousel's "shares tracked" stat.
export const HOLDINGS_COUNT = 1302;
// @@END_GENERATED:HOLDINGS_COUNT@@

export const THEME_ETFS: Record<Theme, string[]> = {
  'AI & ML':        ['AIS', 'ARTY', 'BAI', 'IGPT', 'IVES', 'ALAI', 'CHAT', 'AIFD', 'SPRX', 'AOTG'],
  'Semiconductors': ['SOXX', 'PSI', 'XSD', 'DRAM'],
  'Broad Tech':     ['PTF', 'WCLD', 'IGV', 'FDTX', 'GTEK', 'ARKK', 'MARS', 'FRWD', 'BCTK', 'FWD', 'CBSE', 'FCUS', 'WGMI', 'CNEQ', 'SGRT', 'SPMO', 'XMMO'],
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
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 13.68, bestProScore: 6.52, avgProScore: 4.56, price: 209.08, weeklyChange: 3.09 },
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.53, bestProScore: 5.06, avgProScore: 4.18, price: 974.72, weeklyChange: 14.81 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 11.41, bestProScore: 5.26, avgProScore: 3.80, price: 547.81, weeklyChange: 10.50 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 7.46, bestProScore: 3.16, avgProScore: 2.49, price: 393.27, weeklyChange: 6.05 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.65, bestProScore: 2.85, avgProScore: 2.33, price: 416.28, weeklyChange: 4.50 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 4.26, bestProScore: 2.16, avgProScore: 2.13, price: 243.61, weeklyChange: 4.65 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.14, bestProScore: 3.03, avgProScore: 2.07, price: 101.31, weeklyChange: 6.59 },
  { ticker: 'META', name: `Meta Platforms Inc Class A`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 3.48, bestProScore: 2.68, avgProScore: 1.74, price: 606.92, weeklyChange: -6.05 },
  { ticker: 'WDC', name: `Western Digital Corp`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 3.42, bestProScore: 1.96, avgProScore: 1.71, price: 568.09, weeklyChange: 19.04 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.41, bestProScore: 2.35, avgProScore: 1.71, price: 318.76, weeklyChange: 1.74 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': 6.5, '1M': -12.4, 'YTD': 87, '6M': 66.5, '1Y': 143.1 },
  ARTY: { '1W': 5.9, '1M': -6.9, 'YTD': 43.8, '6M': 32.8, '1Y': 62.4 },
  BAI:  { '1W': 5.9, '1M': -9.7, 'YTD': 35.4, '6M': 30.4, '1Y': 49.3 },
  IGPT: { '1W': 4.2, '1M': -8.3, 'YTD': 55, '6M': 43.1, '1Y': 82.7 },
  IVES: { '1W': -1.1, '1M': -1.8, 'YTD': 13.9, '6M': 9.7, '1Y': 29 },
  ALAI: { '1W': 1.8, '1M': -4.3, 'YTD': 22.3, '6M': 21.8, '1Y': 39.1 },
  CHAT: { '1W': 5.9, '1M': -9.9, 'YTD': 47.2, '6M': 41, '1Y': 71.6 },
  AIFD: { '1W': 2.4, '1M': -3.5, 'YTD': 34.7, '6M': 32.8, '1Y': 61.2 },
  SPRX: { '1W': 5.9, '1M': -14.8, 'YTD': 21.4, '6M': 12.8, '1Y': 48 },
  AOTG: { '1W': 2.3, '1M': -2.4, 'YTD': 12.7, '6M': 13.5, '1Y': 22.9 },
  // Semiconductors
  SOXX: { '1W': 5.5, '1M': -8.7, 'YTD': 82.9, '6M': 59.7, '1Y': 127.5 },
  PSI:  { '1W': 6.5, '1M': -10.5, 'YTD': 93.3, '6M': 65.2, '1Y': 151.6 },
  XSD:  { '1W': 4.8, '1M': -13.1, 'YTD': 63, '6M': 48.4, '1Y': 96.3 },
  DRAM: { '1W': 10.6, '1M': -15.8, 'YTD': 110, '6M': 110, '1Y': 110 },
  // Broad Tech
  PTF:  { '1W': 9.5, '1M': -15.3, 'YTD': 43.5, '6M': 32.4, '1Y': 57.9 },
  WCLD: { '1W': -7.7, '1M': 9.7, 'YTD': -8.3, '6M': -0.8, '1Y': -11.7 },
  IGV:  { '1W': -5, '1M': 1, 'YTD': -16.6, '6M': -9.8, '1Y': -21.2 },
  FDTX: { '1W': 1.6, '1M': -11, 'YTD': 27, '6M': 27, '1Y': 30.8 },
  GTEK: { '1W': 3.2, '1M': -7.3, 'YTD': 39.5, '6M': 32.2, '1Y': 53.6 },
  ARKK: { '1W': -0.7, '1M': -2.7, 'YTD': -3, '6M': -7.5, '1Y': -3.5 },
  MARS: { '1W': -0.8, '1M': -19.7, 'YTD': -2.3, '6M': -2.3, '1Y': -2.3 },
  FRWD: { '1W': 3.9, '1M': -3.8, 'YTD': 25.6, '6M': 23.6, '1Y': 25.6 },
  BCTK: { '1W': -0.1, '1M': -5, 'YTD': 14.8, '6M': 14.2, '1Y': 16.8 },
  FWD:  { '1W': 2.5, '1M': -7.8, 'YTD': 25.1, '6M': 15, '1Y': 42.4 },
  CBSE: { '1W': 0.7, '1M': -5.3, 'YTD': 24.8, '6M': 12.2, '1Y': 28.4 },
  FCUS: { '1W': 7.9, '1M': -16.7, 'YTD': 23.9, '6M': 3.2, '1Y': 45.5 },
  WGMI: { '1W': 21.5, '1M': -18.6, 'YTD': 51, '6M': 17.6, '1Y': 111.4 },
  CNEQ: { '1W': 1.2, '1M': -3.1, 'YTD': 12.8, '6M': 12.7, '1Y': 27.5 },
  SGRT: { '1W': 7.6, '1M': -11.2, 'YTD': 36.5, '6M': 26.1, '1Y': 70.7 },
  SPMO: { '1W': 4.3, '1M': -2.7, 'YTD': 25.8, '6M': 27.3, '1Y': 31.3 },
  XMMO: { '1W': 3.4, '1M': -4.2, 'YTD': 17.4, '6M': 14.9, '1Y': 24.1 },
  // Electrification
  POW:  { '1W': 2, '1M': -9, 'YTD': 40.3, '6M': 25.8, '1Y': 36.2 },
  VOLT: { '1W': 2.4, '1M': -4.8, 'YTD': 33.6, '6M': 23.7, '1Y': 44.2 },
  PBD:  { '1W': 0, '1M': -10.9, 'YTD': 13.2, '6M': 1.1, '1Y': 30.4 },
  PBW:  { '1W': 1.1, '1M': -13.3, 'YTD': 10.5, '6M': -6, '1Y': 37.1 },
  IVEP: { '1W': 3.4, '1M': -5.6, 'YTD': 1.5, '6M': 1.5, '1Y': 1.5 },
  // Industrials
  AIRR: { '1W': 2.4, '1M': -4.2, 'YTD': 26.2, '6M': 10.7, '1Y': 44.6 },
  PRN:  { '1W': 4.7, '1M': -8.6, 'YTD': 32.6, '6M': 19.3, '1Y': 43.7 },
  IDEF: { '1W': 3.5, '1M': 2.1, 'YTD': 4.4, '6M': -9.5, '1Y': 10.5 },
  BILT: { '1W': 0.7, '1M': 2.5, 'YTD': 11, '6M': 8.3, '1Y': 14.3 },
  // Meme
  BUZZ: { '1W': 2.7, '1M': -6.8, 'YTD': 7.5, '6M': -0.3, '1Y': 6.9 },
  MEME: { '1W': 12, '1M': -20.7, 'YTD': 24.7, '6M': -1.3, '1Y': -21.2 },
  RKNG: { '1W': 9.7, '1M': -19.2, 'YTD': -5.5, '6M': -5.5, '1Y': -5.5 },
};
// @@END_GENERATED:ETF_RETURNS@@

// @@GENERATED:ETF_DAY_CHANGE@@
// Today's % move per ETF ticker (1D, vs prior close). Refreshed by the 3×/day
// price jobs. Powers the 1D ranking in the theme-ETF side panel.
export const ETF_DAY_CHANGE: Record<string, number> = {
  AIS:  -0.32,
  ARTY: -0.22,
  BAI:  -0.42,
  IGPT: -1.21,
  IVES: -1.29,
  CHAT: -0.71,
  SPRX: -0.21,
  SOXX: -0.87,
  PSI:  -0.78,
  XSD:  -1,
  DRAM: 0.99,
  PTF:  -0.15,
  WCLD: -0.4,
  IGV:  -1.04,
  GTEK: -1.28,
  ARKK: -1.82,
  FWD:  -0.7,
  WGMI: 1.12,
  CNEQ: -1.29,
  SPMO: 0.04,
  XMMO: 0.4,
  VOLT: 0.34,
  PBW:  -0.27,
  AIRR: 0.36,
  IDEF: 2.29,
  MEME: 0.39,
};
// @@END_GENERATED:ETF_DAY_CHANGE@@

// ── Portfolio builder: base index + theme representatives ───────────────────────

// Selectable index core for the portfolio builder.
export type BaseIndexId = 'SPY' | 'QQQ';

// A theme's representative ETF pair for the builder dial: the average of the two
// highest (0.5*6M + 0.5*1Y) performing, non-correlated ETFs in the theme. The
// blended price series and its endpoint return drive the dial + performance line.
export type ThemeRep = {
  etfs: string[];
  series: Record<Period, number[]>;
  returns: Record<Period, number>;
};

// The full ranked fund universe for a theme, powering the builder's
// "Why these three?" panel and its per-theme override. One entry per ETF in
// the theme, ranked by the same 0.5*6M + 0.5*1Y score the dial uses.
//   • chosen   — the ETF is in the default equal-weight representative trio.
//   • anchor   — the top-ranked ETF (always chosen).
//   • score    — 0.5*6M + 0.5*1Y return, the ranking metric (display only).
//   • ret6/ret1 — the fund's 6M / 1Y return, shown in the panel. Kept here (not
//                read from ETF_RETURNS) so the panel is one self-consistent snapshot.
//   • corr     — max 1Y-increment correlation vs the chosen trio (for a chosen
//                ETF, vs the OTHER picks). The honest "does it move differently".
//   • reason   — why it landed where it did: anchor | diversifier | correlated | diverse.
//   • series   — real indexed-to-100 price path per period (PERF_PERIODS only),
//                so an override can re-blend the exact same way the pipeline does.
export type ThemeUniverseFund = {
  t: string;
  chosen: boolean;
  anchor: boolean;
  score: number;
  ret6: number;
  ret1: number;
  corr: number;
  reason: 'anchor' | 'diversifier' | 'correlated' | 'diverse';
  series: Partial<Record<Period, number[]>>;
};

// @@GENERATED:BASE_INDEX@@
export const BASE_INDEX_NAMES: Record<BaseIndexId, string> = { SPY: 'S&P 500', QQQ: 'Nasdaq 100' };
export const BASE_INDEX_HOLDINGS: Record<BaseIndexId, EtfHolding[]> = {
  SPY: [{ t: 'NVDA', w: 7.95 }, { t: 'AAPL', w: 6.79 }, { t: 'MSFT', w: 4.37 }, { t: 'AMZN', w: 3.71 }, { t: 'GOOGL', w: 3.35 }],
  QQQ: [{ t: 'NVDA', w: 8.12 }, { t: 'AAPL', w: 6.93 }, { t: 'MU', w: 5.58 }, { t: 'MSFT', w: 4.47 }, { t: 'AMZN', w: 4.16 }],
};
export const BASE_INDEX_CHART: Record<BaseIndexId, Record<Period, number[]>> = {
  SPY: { '1W': [100, 101.76, 101.16, 99.89, 100.67], '1M': [100, 99.33, 100.35, 100.55, 100.95, 101.6, 102.16, 102.41, 102.69, 102.83, 102.11, 102.5, 99.85, 100.08, 99.78, 99.88, 100.42, 102.19, 101.58, 100.31, 101.1], 'YTD': [100, 101.11, 101.24, 101.04, 101.78, 100.63, 101.47, 100.64, 101.65, 100.47, 99.3, 98.37, 95.79, 92.68, 96.67, 101.84, 103.93, 104.88, 105.29, 108.17, 108.4, 108.92, 110.93, 108.16, 108.19, 109.51], '6M': [100, 102.05, 101.66, 102.76, 100.16, 102.81, 101.93, 102.31, 101.45, 102.47, 101.28, 99.98, 97.78, 96.56, 96.14, 99.93, 103.47, 105.14, 105.19, 108.48, 109.73, 109.58, 111.55, 111.92, 109.06, 110.39], '1Y': [100, 103.47, 104.44, 105.14, 105.8, 107.18, 104.62, 107.22, 108.27, 108.59, 108.54, 109.18, 111.21, 112.21, 111.68, 113.01, 109.88, 111.8, 113.96, 114.77, 112.9, 113.07, 110.9, 114.47, 115.03, 114.55, 114.52, 115.75, 116.41, 116.74, 115.33, 117.02, 115.47, 116.44, 115.18, 115.99, 115.29, 113.81, 111.3, 110.52, 110.26, 114.41, 118.07, 119.21, 120.93, 123.1, 124.91, 124.73, 126.98, 127.4, 124.14, 125.65] },
  QQQ: { '1W': [100, 103.14, 101.18, 100.16, 102.67], '1M': [100, 99.38, 101.03, 101.22, 101.65, 103.34, 104.21, 104.59, 105.22, 105.71, 105.43, 104.92, 99.88, 101.44, 100.28, 101.59, 102.19, 105.4, 103.4, 102.36, 104.92], 'YTD': [100, 101, 100.85, 101.05, 102.46, 98.61, 99.8, 98.61, 100.39, 99.42, 98.94, 98.21, 95.06, 90.88, 95.81, 102.33, 105.29, 108.13, 109.53, 115.78, 115.4, 116.31, 120.19, 114.77, 116.74, 120.56], '6M': [100, 102.43, 101.46, 102.96, 99.83, 103.62, 101.22, 100.39, 99.45, 101.24, 100.27, 99.77, 97.67, 95.87, 94.76, 99.5, 104.64, 107.55, 108.61, 114.23, 117.34, 117.08, 120.77, 121.59, 117.73, 121.59], '1Y': [100, 104.04, 104.78, 105.58, 107.09, 107.84, 105.13, 109.06, 109.59, 108.57, 108.27, 109.88, 112.31, 114.31, 113.65, 115.35, 111.9, 114.63, 117.13, 119.41, 115.74, 115.57, 112, 117.15, 118.5, 115.89, 117.13, 117.85, 118.33, 118.87, 116.98, 120.19, 114.98, 116.38, 114.55, 115.64, 115.93, 115.35, 112.92, 111.58, 110.91, 115.82, 121.57, 123.65, 126.75, 131.91, 135.66, 135.37, 139.63, 140.58, 136.12, 140.58] },
};
// @@END_GENERATED:BASE_INDEX@@

// @@GENERATED:THEME_REPRESENTATIVES@@
export const THEME_REPRESENTATIVES: Partial<Record<Theme, ThemeRep>> = {
  'AI & ML': { etfs: ['AIS', 'ALAI', 'SPRX'], series: { '1W': [100, 100.13, 104.38, 105.48, 104.74], '1M': [100, 98.23, 99.87, 97.13, 99.88, 102.96, 99, 94.07, 94.79, 92.03, 95.58, 95.17, 91.82, 92.16, 90.37, 87.1, 85.56, 85.62, 89.1, 90.17, 89.5], 'YTD': [100, 104.98, 107.58, 109.45, 106.56, 106.61, 105.31, 105.54, 99.95, 105.5, 103.46, 98.31, 109.64, 118.85, 125.84, 127.97, 142.66, 136.9, 155.53, 162.93, 153.09, 171.87, 161.74, 149.14, 145.08, 143.54], '6M': [100, 99.81, 97.3, 97.64, 98.42, 99.57, 96.31, 97.81, 96.24, 86.89, 96.46, 109, 113.49, 117.66, 119.48, 132.72, 128.56, 144.54, 154.66, 139.13, 148.08, 147.52, 148.32, 143.3, 129.69, 133.69], '1Y': [100, 103.23, 105.04, 108.08, 102.52, 106.19, 106.52, 114, 117.3, 119.72, 122.35, 127.91, 125.31, 122.12, 133.56, 129.37, 125.71, 117.23, 119.81, 123.72, 127.65, 114.74, 124.52, 125.99, 128.1, 131.37, 129.71, 130.35, 131.82, 127.68, 130.32, 125.48, 127.02, 129.28, 126.68, 113.03, 126.45, 143.24, 149.13, 150.43, 162.31, 172.36, 168.43, 191.71, 204.65, 183.89, 196.19, 195.91, 196.73, 190.05, 171.01, 176.73] }, returns: { '1W': 4.7, '1M': -10.5, 'YTD': 43.5, '6M': 33.7, '1Y': 76.7 } },
  'Semiconductors': { etfs: ['DRAM', 'PSI', 'XSD'], series: { '1W': [100, 100.37, 108.39, 107.55, 107.29], '1M': [100, 99.26, 104.7, 99.08, 102.18, 106.74, 98.74, 90.79, 93.94, 87.73, 93.63, 92.65, 86.93, 90.58, 87.35, 81.59, 81.02, 81.31, 87.74, 87.09, 86.85], 'YTD': [100, 112.61, 116.25, 118.51, 117.62, 126.28, 124.67, 129.23, 126.96, 136.29, 138.35, 135.55, 156.45, 172.67, 185.54, 180.65, 203.72, 200.02, 215.2, 221.36, 209.92, 217.91, 212.35, 189.76, 184.34, 188.79], '6M': [100, 105.3, 109.61, 112.61, 111.38, 114.66, 110.73, 116.75, 121.94, 122.45, 129.47, 139.77, 157.42, 172.7, 174.54, 182.58, 180, 202.03, 201.88, 195.67, 195.53, 189.37, 194.93, 180.26, 163.98, 174.55], '1Y': [100, 102.72, 104.94, 109.25, 107.6, 113.82, 112.5, 116.16, 118.06, 123.13, 124.01, 129.33, 129.97, 128.5, 138.34, 140.73, 139.42, 140.53, 142.51, 151.77, 150.81, 139.99, 147.51, 152.68, 164.95, 168.18, 169.95, 178.24, 183.57, 179.03, 173.94, 166.57, 170.65, 171.89, 176.14, 170.87, 194.2, 194.42, 213.26, 210.69, 230.18, 230.03, 223.33, 238.35, 248.44, 231.31, 239.58, 235.35, 233.6, 222.48, 212.47, 219.28] }, returns: { '1W': 7.3, '1M': -13.2, 'YTD': 88.8, '6M': 74.6, '1Y': 119.3 } },
  'Broad Tech': { etfs: ['WGMI', 'SGRT', 'PTF'], series: { '1W': [100, 103.62, 109.66, 112.32, 112.89], '1M': [100, 95.4, 95.95, 95.73, 94.99, 96.28, 92.73, 85.1, 85.47, 82.39, 86.44, 86.24, 82.79, 82.7, 82.6, 77.33, 75.64, 78.06, 82.51, 84.6, 85], 'YTD': [100, 109.34, 116.36, 118.16, 113.17, 112.8, 112.43, 113.64, 103.39, 110.92, 110.42, 103.51, 119.46, 127.7, 134.66, 135.28, 152.43, 142.95, 165.12, 169.45, 155.99, 172.8, 160.82, 141, 139.25, 143.7], '6M': [100, 97.93, 94.92, 97.64, 99.05, 101.5, 93.3, 96.67, 96.08, 87.19, 97.02, 111.26, 114.61, 118.27, 120.45, 133.35, 127, 139.3, 148.22, 134.86, 145.83, 140.87, 136.99, 127.69, 114.04, 125.37], '1Y': [100, 98.08, 98.81, 101.01, 102.2, 106.97, 106.93, 117.43, 124.35, 131.86, 132.53, 149.42, 162.35, 139.71, 149.32, 153.53, 136.48, 126.64, 133.74, 139, 137.84, 123.06, 132.69, 133.3, 138.29, 146.48, 142.12, 142.19, 144.92, 140.04, 142.31, 134.69, 133.9, 138.42, 136.07, 128.66, 142.63, 158.8, 163.63, 163.08, 182.35, 186.87, 179.7, 206.68, 213.39, 194.25, 208.68, 204.43, 191.88, 184.57, 162.31, 180] }, returns: { '1W': 12.9, '1M': -15, 'YTD': 43.7, '6M': 25.4, '1Y': 80 } },
  'Electrification': { etfs: ['VOLT', 'POW', 'PBD'], series: { '1W': [100, 99.07, 100.53, 101.4, 101.48], '1M': [100, 98.7, 99.25, 96.77, 97.57, 99.8, 97.98, 95.44, 95.51, 93.77, 92.86, 93.46, 91.79, 92.26, 92.29, 90.72, 90.4, 89.56, 90.9, 91.68, 91.76], 'YTD': [100, 103.68, 109.24, 113.35, 114.25, 119.96, 119.74, 122.69, 113.6, 118.12, 119.6, 117.7, 126.82, 129.92, 138.8, 144, 149.73, 136.94, 146.36, 144.27, 136.18, 144.44, 137.47, 129.81, 129.74, 129.04], '6M': [100, 102.25, 104.03, 107.88, 109.58, 111.08, 104.92, 106.08, 106.75, 103.42, 108.77, 117.91, 119.64, 125.37, 130.23, 135.45, 125.66, 132.29, 131.17, 123.89, 127.83, 125.75, 124.77, 118.23, 115.29, 116.84], '1Y': [100, 100.32, 99.54, 100.95, 99.54, 99.59, 99.87, 100.86, 102.49, 103.5, 105, 108.17, 110.07, 108.89, 112.49, 113.56, 114.15, 111.46, 111.13, 112.58, 116.63, 113.1, 116.66, 118.92, 117.38, 120.5, 121.79, 123.45, 126.6, 125.73, 129.07, 130.85, 128.82, 131.23, 135.62, 134.47, 140.98, 148.17, 147.7, 145.98, 153.61, 155.15, 145.24, 150.24, 153.93, 148.62, 147.32, 145.09, 142.52, 138.33, 135.96, 136.94] }, returns: { '1W': 1.5, '1M': -8.2, 'YTD': 29, '6M': 16.8, '1Y': 36.9 } },
  'Industrials': { etfs: ['PRN', 'BILT', 'IDEF'], series: { '1W': [100, 99.76, 101.29, 101.96, 102.97], '1M': [100, 99.6, 100.43, 99.49, 100.5, 101.3, 100.21, 99.78, 100.62, 98.69, 98.25, 98.06, 96.82, 97.56, 97.26, 96.05, 95.92, 95.67, 97.03, 97.71, 98.68], 'YTD': [100, 106.26, 110.8, 111.24, 110.98, 113.34, 116.2, 116.76, 112.92, 112.86, 111.21, 109.5, 116.71, 116.61, 116.88, 118.61, 120.41, 115.45, 121.3, 120.51, 119.47, 120.38, 119.2, 114.91, 114.34, 116.01], '6M': [100, 99.63, 101.87, 104.66, 106.35, 107.77, 104.31, 103.1, 101.49, 97.16, 102.81, 107.5, 105.92, 106.93, 107.7, 109.97, 106.32, 110.91, 109.69, 106.95, 108.87, 107.85, 108.26, 105.6, 103.09, 106.01], '1Y': [100, 100.95, 101.62, 102.26, 99.72, 101.18, 101.16, 101.58, 103.05, 104.66, 107.21, 109.71, 108.45, 106.11, 109.67, 108.31, 106.38, 102.84, 103.86, 104.76, 105.25, 102.93, 107.96, 107.71, 112.66, 117.29, 116.61, 116.2, 120.93, 120.97, 124.23, 122.12, 120.47, 118.69, 117.75, 112.68, 119.66, 124.34, 123.51, 121.94, 126.67, 126.35, 122.34, 128.19, 126.59, 123.94, 125.81, 125.45, 126.31, 122.41, 119.32, 122.85] }, returns: { '1W': 3, '1M': -1.3, 'YTD': 16, '6M': 6, '1Y': 22.8 } },
  'Meme': { etfs: ['BUZZ', 'RKNG', 'MEME'], series: { '1W': [100, 100.09, 104.39, 108.24, 108.14], '1M': [100, 95.89, 93.83, 92.27, 93.7, 96.55, 95.76, 91.7, 89.6, 88.76, 88.42, 89.52, 86.92, 85.21, 84.86, 81.48, 78.38, 78.37, 81.5, 84.54, 84.42], 'YTD': [100, 109.04, 106.11, 104.61, 100.49, 95.31, 94, 92.59, 89.64, 92.76, 93.3, 91.13, 100.94, 113.7, 112.1, 116.32, 127.57, 122.6, 140.1, 136.92, 129.46, 131.93, 124.31, 112.74, 108.37, 108.91], '6M': [100, 94.93, 83.39, 83.45, 84.74, 84.82, 81.83, 84.17, 82.63, 74.61, 81.21, 93.37, 101.79, 99.38, 103.23, 113.32, 108.76, 120.58, 127.23, 112.14, 116.29, 111.36, 111.11, 102.44, 93.98, 97.67], '1Y': [100, 102.21, 97.42, 93.96, 87.19, 88.26, 85.12, 82.6, 82.2, 85.95, 87.24, 89.19, 87.8, 82.58, 87.58, 85.27, 87.05, 85.42, 84.55, 83.18, 86.05, 80.57, 85.3, 85.89, 89, 89.12, 90.21, 86.29, 87.74, 88.4, 85.69, 88.88, 91.75, 91.47, 96.88, 94.14, 94.78, 103.24, 108.4, 102.96, 106.91, 114.46, 115.5, 109.4, 109.77, 110.07, 104.09, 100.57, 95.85, 94.27, 88.6, 93.41] }, returns: { '1W': 8.1, '1M': -15.6, 'YTD': 8.9, '6M': -2.3, '1Y': -6.6 } },
};
// @@END_GENERATED:THEME_REPRESENTATIVES@@

// @@GENERATED:THEME_UNIVERSE@@
export const THEME_UNIVERSE: Partial<Record<Theme, ThemeUniverseFund[]>> = {
  'AI & ML': [
    { t: 'AIS', chosen: true, anchor: true, score: 104.8, ret6: 66.5, ret1: 143.1, corr: 0.88, reason: 'anchor', series: { '1W': [100, 100.3, 107.08, 106.89, 106.47], '1M': [100, 99.6, 104.22, 99.04, 102.04, 105.86, 98.64, 92.11, 95.63, 89.8, 95.83, 94.94, 89.27, 91.87, 88.97, 83.45, 82.32, 82.57, 88.15, 87.99, 87.64], 'YTD': [100, 106.94, 110.67, 114.27, 114.51, 118.48, 116.79, 120.65, 110.91, 120.28, 116.79, 110.96, 127.69, 137.68, 153.75, 160.92, 187.79, 173.05, 200.56, 212.47, 201.85, 234.07, 217.71, 195.82, 189.83, 187], '6M': [100, 100.4, 101.89, 104.05, 105.07, 107.26, 103.44, 107.1, 103.77, 93.26, 104.76, 121.45, 127.49, 137.41, 143.26, 167.21, 154.88, 180.83, 193.26, 171.78, 184.04, 189.23, 187.39, 182.06, 158.53, 166.5] } },
    { t: 'IGPT', chosen: false, anchor: false, score: 62.9, ret6: 43.1, ret1: 82.7, corr: 0.96, reason: 'correlated', series: { '1W': [100, 100.57, 105.52, 105.48, 104.16], '1M': [100, 99.35, 102.43, 98.35, 100.81, 103.58, 99.64, 94.8, 97.65, 94.15, 98.26, 98.47, 94.06, 95.89, 93.84, 89.29, 88.03, 88.53, 92.89, 92.86, 91.69], 'YTD': [100, 105.23, 105.3, 109.57, 107.82, 106.15, 105.48, 107.23, 101.06, 105.11, 101.38, 97.63, 107.53, 117.3, 126.67, 133.24, 156.62, 145.05, 164.05, 169.04, 162.91, 181.79, 170.35, 160.69, 158.58, 154.95], '6M': [100, 100.53, 97.3, 97.62, 96.99, 98.51, 96.09, 97.1, 95.15, 86.19, 93.96, 106.26, 109.74, 118.3, 124.11, 144.67, 134.72, 151.74, 158.71, 145.99, 155.27, 155.09, 155.55, 153.39, 139.39, 143.13] } },
    { t: 'CHAT', chosen: false, anchor: false, score: 56.3, ret6: 41, ret1: 71.6, corr: 0.95, reason: 'correlated', series: { '1W': [100, 100.18, 105.8, 106.53, 105.93], '1M': [100, 99.37, 101.46, 97.14, 99.02, 102.4, 97.04, 92.13, 94.43, 90.9, 95.87, 95.2, 90.93, 92.13, 91.75, 86.88, 85.03, 85.18, 89.96, 90.58, 90.07], 'YTD': [100, 103.66, 104.65, 107.92, 104.99, 106.38, 109.21, 108.36, 103.29, 110.33, 108.02, 104.9, 116.3, 125.92, 134.31, 134.5, 147.29, 141.74, 159.09, 170, 156.77, 176.51, 161.86, 152.32, 149.97, 147.22], '6M': [100, 100.36, 98.7, 102.87, 103.69, 103.52, 103.83, 105.65, 103.75, 95.92, 104.92, 119.31, 123.01, 127.58, 130.63, 141.04, 136.72, 152.96, 168.02, 147.9, 155.4, 155.53, 151.89, 150.06, 135.99, 140.98] } },
    { t: 'ARTY', chosen: false, anchor: false, score: 47.6, ret6: 32.8, ret1: 62.4, corr: 0.95, reason: 'correlated', series: { '1W': [100, 100.35, 105.07, 106.17, 105.87], '1M': [100, 99.37, 100.46, 97.12, 99.58, 102.34, 98.28, 95.53, 97.35, 93.97, 97.72, 97.42, 93.59, 94.01, 92.41, 88.75, 87.92, 88.23, 92.38, 93.35, 93.08], 'YTD': [100, 104.5, 107.12, 111.15, 106.14, 107.66, 106.04, 105.87, 99.58, 103.32, 100.62, 96.58, 106.1, 119.66, 128.85, 130.39, 143.86, 132.4, 147.55, 162.72, 150.46, 164.84, 153.82, 147.53, 142.74, 143.77], '6M': [100, 98.77, 97.18, 97.91, 95.72, 97.03, 94.4, 95.46, 94.13, 84.76, 92.77, 107.88, 113.46, 118.12, 121.69, 132.91, 123.62, 137.49, 154.84, 138.04, 143.93, 141.8, 140.25, 139.44, 126.65, 132.83] } },
    { t: 'AIFD', chosen: false, anchor: false, score: 47, ret6: 32.8, ret1: 61.2, corr: 0.89, reason: 'correlated', series: { '1W': [100, 100.4, 103.86, 103.5, 102.45], '1M': [100, 98.95, 100.53, 98.94, 102.27, 105.69, 102.47, 98.41, 100.94, 98, 101.21, 100.66, 98.18, 99.36, 97.74, 94.59, 94.19, 94.57, 97.82, 97.49, 96.5], 'YTD': [100, 101.7, 101.61, 103.95, 101.03, 105.49, 105.53, 105.11, 102.14, 105.69, 106.28, 102.61, 112.36, 119.16, 124.68, 126.39, 135.57, 129.9, 137.67, 149.07, 141.4, 146.83, 142.73, 138.46, 136.4, 134.67], '6M': [100, 100.72, 101.06, 102.9, 102.77, 104.7, 103.86, 104.21, 104.7, 95.81, 105.66, 115.31, 119.72, 122.83, 125.8, 133.66, 129.22, 136.93, 150.32, 136.54, 140.79, 136.15, 140.99, 139.27, 130.15, 132.78] } },
    { t: 'BAI', chosen: false, anchor: false, score: 39.8, ret6: 30.4, ret1: 49.3, corr: 0.94, reason: 'correlated', series: { '1W': [100, 100.28, 106.62, 106.36, 105.87], '1M': [100, 99.52, 103.02, 98.38, 101.8, 105.59, 99.12, 94.13, 96.54, 91.25, 96.23, 95.55, 90.97, 93.43, 90.99, 86.4, 85.28, 85.52, 90.93, 90.71, 90.29], 'YTD': [100, 103.09, 104.8, 106.4, 102.88, 105.98, 104.53, 105.14, 98.2, 102.37, 104.32, 98.95, 112.16, 120.18, 128.35, 131.02, 145.23, 135.14, 149.49, 151.62, 146.67, 162.85, 152.64, 139.43, 136.43, 135.38], '6M': [100, 99.71, 99.51, 99.97, 100.12, 102.17, 98.12, 98.61, 100.06, 90.16, 100.55, 114.58, 116.84, 122.77, 126.61, 139.89, 131.65, 144.63, 150.19, 135.41, 144.61, 143.74, 143.16, 138.99, 124.79, 130.4] } },
    { t: 'ALAI', chosen: true, anchor: false, score: 30.5, ret6: 21.8, ret1: 39.1, corr: 0.8, reason: 'diversifier', series: { '1W': [100, 98.87, 99.26, 103.37, 101.82], '1M': [100, 96.92, 95.62, 95.78, 95.41, 97.31, 98.92, 97.59, 94.43, 97.42, 96.52, 97.49, 98.33, 95.9, 95.71, 96.73, 93.97, 92.91, 93.28, 97.14, 95.69], 'YTD': [100, 102.49, 102.19, 102.53, 98.03, 97.06, 96.26, 94.75, 92.88, 95.4, 92.97, 91.5, 97.78, 106.29, 107.86, 111.02, 115.79, 116.01, 122.29, 127.17, 115.87, 129.47, 121.91, 122.4, 122.29, 122.27], '6M': [100, 101.3, 92.91, 94.43, 96.07, 94.39, 92.52, 92.66, 91.43, 87.4, 93.3, 101.77, 107.28, 109.54, 110.59, 115.34, 117.8, 120.19, 128.86, 120.11, 126.95, 123.37, 125.9, 122.86, 123.12, 121.79] } },
    { t: 'SPRX', chosen: true, anchor: false, score: 30.4, ret6: 12.8, ret1: 48, corr: 0.88, reason: 'diversifier', series: { '1W': [100, 101.22, 106.8, 106.19, 105.94], '1M': [100, 98.17, 99.78, 96.57, 102.19, 105.71, 99.45, 92.51, 94.32, 88.88, 94.4, 93.07, 87.87, 88.71, 86.42, 81.13, 80.4, 81.39, 85.87, 85.38, 85.18], 'YTD': [100, 105.52, 109.87, 111.54, 107.15, 104.28, 102.88, 101.21, 96.07, 100.81, 100.62, 92.46, 103.46, 112.58, 115.9, 111.98, 124.41, 121.64, 143.74, 149.15, 141.56, 152.06, 145.59, 129.2, 123.13, 121.35], '6M': [100, 97.74, 97.1, 94.44, 94.13, 97.07, 92.98, 93.67, 93.53, 80, 91.31, 103.77, 105.7, 106.02, 104.6, 115.6, 113.01, 132.59, 141.85, 125.49, 133.24, 129.96, 131.67, 124.98, 107.41, 112.77] } },
    { t: 'IVES', chosen: false, anchor: false, score: 19.4, ret6: 9.7, ret1: 29, corr: 0.92, reason: 'correlated', series: { '1W': [100, 100.63, 101.84, 100.14, 98.87], '1M': [100, 98.64, 97.9, 98.72, 101.86, 103.96, 103.44, 101.72, 104.23, 102.48, 104.09, 103.47, 102.21, 102.46, 102.46, 100.27, 99.32, 99.95, 101.15, 99.45, 98.2], 'YTD': [100, 103.1, 104.87, 105.44, 100.19, 97.91, 96.65, 94.21, 94.59, 96.08, 92.19, 89.75, 93.17, 102.31, 105.57, 106.3, 115.63, 113.13, 119.71, 126, 116.93, 118.82, 118.1, 118.82, 118.79, 113.86], '6M': [100, 98.17, 92.78, 92.66, 89.91, 91.13, 92.57, 92.54, 90.74, 82.63, 88.51, 95.19, 99.36, 101.86, 103.53, 111.37, 110.09, 115.9, 126.14, 112.55, 114.99, 110.15, 115.51, 116.24, 111.97, 109.66] } },
    { t: 'AOTG', chosen: false, anchor: false, score: 18.2, ret6: 13.5, ret1: 22.9, corr: 0.89, reason: 'correlated', series: { '1W': [100, 98.51, 99.5, 102.97, 102.28], '1M': [100, 96.01, 95.55, 96.68, 96.72, 98.78, 101.3, 99.66, 97.58, 100.26, 98.04, 100.1, 100.6, 98.11, 99.47, 98.65, 95.43, 94.01, 94.96, 98.27, 97.61], 'YTD': [100, 100.98, 99.17, 100.47, 93.51, 91.31, 89.73, 88.76, 89.66, 88.73, 87.85, 85.13, 88.84, 96.81, 97.19, 102.05, 108.37, 105.45, 110.85, 116.75, 106.32, 115.64, 111.67, 113, 114.84, 112.7], '6M': [100, 100.38, 87.73, 88.81, 90.9, 89.38, 90.29, 87.97, 86.98, 82.72, 87.57, 91.76, 98.43, 101.51, 102.76, 109.13, 107.12, 107.99, 120.35, 111.64, 116.25, 111.63, 117.77, 113.99, 114.7, 113.49] } },
  ],
  'Semiconductors': [
    { t: 'DRAM', chosen: true, anchor: true, score: 110, ret6: 110, ret1: 110, corr: -0.1, reason: 'anchor', series: { '1W': [100, 100.64, 111.63, 109.58, 110.58], '1M': [100, 101.03, 111.08, 103.84, 103.93, 106.69, 95.15, 87.59, 93.56, 87.53, 92.98, 91.07, 82.78, 88.46, 82.92, 75.61, 76.16, 76.65, 85.02, 83.46, 84.22], 'YTD': [100, 116.97, 120.86, 126.22, 125.83, 134.01, 137.72, 152.99, 167.69, 184.8, 184.08, 185.55, 217.98, 244.96, 236.67, 215.63, 234.19, 251.98, 249.35, 258.93, 237.25, 218.26, 227.09, 206.77, 191.14, 210.01], '6M': [100, 116.97, 120.86, 126.22, 125.83, 134.01, 137.72, 152.99, 167.69, 184.8, 184.08, 185.55, 217.98, 244.96, 236.67, 215.63, 234.19, 251.98, 249.35, 258.93, 237.25, 218.26, 227.09, 206.77, 191.14, 210.01] } },
    { t: 'PSI', chosen: true, anchor: false, score: 108.4, ret6: 65.2, ret1: 151.6, corr: 0.92, reason: 'diversifier', series: { '1W': [100, 100.24, 107.85, 107.16, 106.46], '1M': [100, 99.01, 104.04, 98.67, 104.42, 110.2, 102.33, 92.71, 93.62, 87.03, 93.56, 93.53, 88.99, 92.64, 90.17, 85.2, 84.03, 84.23, 90.62, 90.04, 89.46], 'YTD': [100, 112.69, 117.35, 119.33, 119.05, 130.15, 125.98, 125.54, 113.11, 120.33, 126.85, 119.68, 138.11, 147.41, 171.01, 171.34, 198.02, 181.38, 203.02, 204.81, 206.7, 233.9, 225.69, 191.9, 194.89, 193.34], '6M': [100, 100.81, 106.43, 109.01, 108.35, 109.24, 100.77, 102.84, 104.93, 95.94, 107.87, 123.66, 132.38, 141.67, 146.49, 169.24, 154.93, 175.17, 175.16, 164.67, 180.71, 182.89, 189.02, 172.83, 157.38, 165.24] } },
    { t: 'SOXX', chosen: false, anchor: false, score: 93.6, ret6: 59.7, ret1: 127.5, corr: 0.94, reason: 'correlated', series: { '1W': [100, 100.45, 105.92, 106.46, 105.53], '1M': [100, 99.69, 103.61, 97.77, 101.82, 106.19, 99.39, 93.86, 96.37, 91.43, 96.41, 96.35, 91.75, 94.12, 92.03, 87.92, 86.48, 86.87, 91.6, 92.07, 91.26], 'YTD': [100, 109.17, 113.72, 116.58, 114.77, 119.61, 118.16, 116.98, 107.42, 112.18, 113.24, 109.13, 125.73, 134.8, 153.28, 154.66, 176.91, 164.95, 187.28, 200.14, 194.9, 217.5, 204, 186.63, 184.38, 182.85], '6M': [100, 100.46, 101.1, 102.89, 103.51, 102.13, 97.58, 98, 97.64, 89.87, 100.88, 116.4, 122.04, 132.11, 134.04, 154.55, 143.85, 165.38, 175.52, 163.08, 171.52, 174.49, 173.97, 168.75, 153.9, 159.75] } },
    { t: 'XSD', chosen: true, anchor: false, score: 72.3, ret6: 48.4, ret1: 96.3, corr: 0.92, reason: 'diversifier', series: { '1W': [100, 100.24, 105.69, 105.91, 104.82], '1M': [100, 97.74, 98.99, 94.74, 98.18, 103.32, 98.74, 92.08, 94.64, 88.64, 94.34, 93.34, 89.02, 90.64, 88.97, 83.96, 82.86, 83.06, 87.58, 87.76, 86.86], 'YTD': [100, 108.18, 110.53, 109.99, 107.97, 114.68, 110.32, 109.15, 100.08, 103.75, 104.13, 101.41, 113.27, 125.63, 148.94, 154.99, 178.95, 166.69, 193.23, 200.35, 185.81, 201.56, 184.28, 170.6, 166.99, 163.03], '6M': [100, 98.12, 101.55, 102.6, 99.97, 100.74, 93.71, 94.43, 93.21, 86.62, 96.47, 110.11, 121.91, 131.48, 140.46, 162.87, 150.87, 178.93, 181.14, 163.41, 168.64, 166.97, 168.69, 161.17, 143.43, 148.39] } },
  ],
  'Broad Tech': [
    { t: 'WGMI', chosen: true, anchor: true, score: 64.5, ret6: 17.6, ret1: 111.4, corr: 0.79, reason: 'anchor', series: { '1W': [100, 110.78, 117.95, 120.16, 121.51], '1M': [100, 94.05, 91.48, 92.6, 89.74, 88.86, 82.8, 74.94, 79.57, 74.15, 80.56, 78.19, 73.64, 73.58, 74.67, 67.77, 67.02, 74.25, 79.05, 80.53, 81.43], 'YTD': [100, 117.64, 133.42, 133, 118.37, 108.81, 106.32, 104.21, 94.25, 105.7, 101.57, 90.99, 108.07, 121.71, 129.66, 125.92, 152.78, 143.32, 179.78, 181.24, 167.02, 188.08, 166.45, 144.06, 138.49, 151.03], '6M': [100, 91.7, 82.28, 84.13, 80.91, 82.28, 75.97, 82.32, 80.18, 65.79, 76.46, 96.72, 96.62, 99.84, 102.77, 118.99, 113.04, 131.93, 145.52, 128.47, 140.94, 135.86, 119.6, 116.37, 97.88, 117.62] } },
    { t: 'SGRT', chosen: true, anchor: false, score: 48.4, ret6: 26.1, ret1: 70.7, corr: 0.09, reason: 'diversifier', series: { '1W': [100, 99.78, 100.6, 107.12, 107.63], '1M': [100, 94.43, 94.33, 97.32, 93.68, 94.8, 97.58, 92.84, 87.56, 89.59, 87.93, 91.23, 90.55, 87.22, 89.16, 86.18, 82.54, 82.36, 83.03, 88.42, 88.84], 'YTD': [100, 103.92, 106.48, 109.08, 106.45, 111.56, 112.59, 116.39, 105.84, 109.88, 108.28, 106.68, 120.43, 124.47, 128.59, 130.99, 140.1, 135.87, 146.34, 151.46, 133.8, 149.42, 143.94, 132.19, 137.01, 136.51], '6M': [100, 99.87, 95.52, 101.43, 106.34, 107.48, 97.73, 99.6, 98.43, 97.55, 102.35, 114.64, 117.04, 120.77, 120.96, 129.38, 129.6, 129.07, 135.76, 129.09, 138.2, 133.99, 138.46, 124.76, 122.29, 126.05] } },
    { t: 'PTF', chosen: true, anchor: false, score: 45.1, ret6: 32.4, ret1: 57.9, corr: 0.79, reason: 'diversifier', series: { '1W': [100, 100.29, 110.44, 109.69, 109.53], '1M': [100, 97.73, 102.04, 97.26, 101.56, 105.19, 97.82, 87.51, 89.29, 83.43, 90.82, 89.31, 84.17, 87.29, 83.96, 78.03, 77.36, 77.58, 85.44, 84.85, 84.73], 'YTD': [100, 106.47, 109.18, 112.39, 114.69, 118.04, 118.37, 120.33, 110.09, 117.17, 121.4, 112.86, 129.87, 136.93, 145.72, 148.93, 164.41, 149.67, 169.24, 175.64, 167.15, 180.89, 172.06, 146.74, 142.25, 143.55], '6M': [100, 102.21, 106.97, 107.36, 109.9, 114.73, 106.19, 108.09, 109.62, 98.24, 112.24, 122.42, 130.17, 134.19, 137.61, 151.68, 138.37, 156.91, 163.38, 147.01, 158.36, 152.76, 152.9, 141.95, 121.96, 132.43] } },
    { t: 'GTEK', chosen: false, anchor: false, score: 42.9, ret6: 32.2, ret1: 53.6, corr: 0.87, reason: 'correlated', series: { '1W': [100, 99.76, 104.13, 104.48, 103.21], '1M': [100, 99.52, 99.92, 99.15, 101.42, 104.55, 102.67, 99.09, 100.44, 96.43, 98.92, 98.72, 94.4, 95.63, 94.39, 91.53, 89.83, 89.61, 93.54, 93.85, 92.71], 'YTD': [100, 104.18, 104.7, 108.54, 103.19, 107.25, 106.57, 109.04, 102.44, 104.8, 105.25, 102.34, 110.83, 120.61, 127.99, 131.48, 139.31, 130.34, 146.5, 153.34, 146.75, 156.64, 152.64, 144.91, 142.06, 139.54], '6M': [100, 98.43, 97.16, 101.49, 99.19, 103.15, 98.85, 99.29, 100.76, 93.4, 100.07, 110.81, 117.87, 120.79, 125.71, 131.98, 125.76, 139.56, 145.99, 136.52, 141.36, 141.91, 146.39, 141.06, 130.51, 132.2] } },
    { t: 'SPMO', chosen: false, anchor: false, score: 29.3, ret6: 27.3, ret1: 31.3, corr: 0.85, reason: 'correlated', series: { '1W': [100, 100.44, 104.04, 104.29, 104.32], '1M': [100, 99.64, 103.43, 99.91, 102.71, 104.67, 100.63, 97.73, 99.12, 96.81, 99.18, 99.62, 97.01, 99.04, 97.19, 94.13, 93.23, 93.64, 96.99, 97.23, 97.26], 'YTD': [100, 100.6, 100.57, 100.24, 100.17, 101.06, 100.06, 100.13, 99.09, 98.35, 96.25, 93.96, 102.88, 106.22, 110.22, 112.66, 122.42, 117.86, 125.38, 128.08, 126.2, 135.48, 132.86, 126.19, 125.71, 125.8], '6M': [100, 101.65, 101.63, 100.28, 100.02, 101.86, 101.17, 99.52, 97.13, 91.45, 98.92, 107.4, 107.4, 112.03, 114.01, 123.87, 119.93, 127.04, 130.87, 125.09, 131.12, 130.42, 131.72, 129.82, 123.2, 127.29] } },
    { t: 'FDTX', chosen: false, anchor: false, score: 28.9, ret6: 27, ret1: 30.8, corr: 0.72, reason: 'diverse', series: { '1W': [100, 99.04, 99.4, 103.34, 101.58], '1M': [100, 95.25, 94.61, 96.55, 93.95, 97.42, 99.56, 96.72, 92.64, 94.51, 92.26, 94.61, 94.21, 91.4, 93.04, 90.97, 87.61, 86.77, 87.09, 90.54, 88.99], 'YTD': [100, 102.2, 100.24, 103.12, 96.05, 96.22, 94.59, 95.03, 93.71, 95.1, 93.91, 90.62, 97.36, 104.99, 109.03, 114.6, 121.74, 119.08, 129.8, 142.39, 127.27, 142.21, 134.1, 130.78, 132.8, 127.03], '6M': [100, 101.04, 91.44, 93.67, 95.62, 94.98, 93.66, 93.4, 92.1, 87.77, 93.35, 99.53, 107.7, 112.15, 114.55, 121.68, 121.01, 124.8, 137.75, 134.01, 141.19, 135.88, 142.04, 131.62, 129.78, 126.96] } },
    { t: 'FWD', chosen: false, anchor: false, score: 28.7, ret6: 15, ret1: 42.4, corr: 0.91, reason: 'correlated', series: { '1W': [100, 99.92, 103.56, 103.27, 102.54], '1M': [100, 99.71, 102.3, 99.45, 101.91, 104.63, 100.95, 97.16, 99, 95.32, 97.91, 97.59, 94.21, 95.77, 94.58, 91.33, 89.96, 89.88, 93.16, 92.9, 92.24], 'YTD': [100, 107.09, 108.98, 111.03, 108.2, 110.45, 110.76, 112.29, 104.58, 107.27, 106.24, 103.97, 113.23, 117.16, 121.84, 122.99, 130.5, 124.69, 133.99, 138.47, 133.46, 142.55, 138.19, 129.74, 128.24, 125.07], '6M': [100, 99.3, 98.82, 100.83, 101.66, 103.7, 99.32, 98.64, 97.36, 91.03, 98.51, 107.71, 108.32, 111.65, 112.87, 120.01, 115.9, 124.37, 129.19, 120.21, 125.87, 124.32, 125.86, 122.07, 113.88, 115.01] } },
    { t: 'FRWD', chosen: false, anchor: false, score: 24.6, ret6: 23.6, ret1: 25.6, corr: 0.15, reason: 'diverse', series: { '1W': [100, 100.66, 104.96, 104.54, 103.91], '1M': [100, 99.67, 101.17, 98.63, 101.34, 103.79, 100.49, 97.4, 99.84, 96.95, 99.87, 100.21, 97.14, 98.89, 97.43, 93.72, 92.6, 93.21, 97.19, 96.8, 96.21], 'YTD': [100, 100.4, 106.5, 94.12, 96.5, 98.35, 96.96, 96.31, 96.19, 94.9, 86.8, 99.61, 106.99, 110.76, 111.26, 119.68, 123.96, 123.37, 130.8, 127.47, 136.6, 130.51, 135.46, 130.35, 122.31, 125.57], '6M': [100, 99.94, 95.83, 94.98, 94.97, 94.93, 94.82, 94.7, 93.42, 85.45, 93.62, 104.35, 106.54, 111.16, 112.57, 121.55, 117.11, 125.95, 133.79, 123.87, 132.04, 128.06, 129.11, 128.32, 120.41, 123.62] } },
    { t: 'FCUS', chosen: false, anchor: false, score: 24.4, ret6: 3.2, ret1: 45.5, corr: 0.8, reason: 'correlated', series: { '1W': [100, 101.17, 101.3, 108.1, 107.94], '1M': [100, 96.23, 94.13, 96.57, 92.01, 93.86, 96.03, 92.31, 84.94, 87.1, 84.36, 86.74, 85.55, 82.52, 85.21, 82.23, 77.17, 78.07, 78.17, 83.41, 83.29], 'YTD': [100, 112.12, 115.26, 119.81, 120.72, 122.28, 122.73, 124.76, 107.87, 116.11, 115.97, 114.56, 120.48, 125.43, 127.49, 133.5, 138.98, 134.61, 144.61, 150.06, 134.89, 145.79, 136.9, 123.01, 126.78, 123.93], '6M': [100, 99.71, 94.4, 99.2, 103.12, 103.9, 89.84, 93.77, 94.87, 94.07, 98.59, 102.92, 104.62, 106.48, 111.18, 115.75, 116.3, 117.15, 120.01, 116.8, 121.02, 119.24, 118.99, 104.54, 101.9, 103.21] } },
    { t: 'CBSE', chosen: false, anchor: false, score: 20.3, ret6: 12.2, ret1: 28.4, corr: 0.74, reason: 'diverse', series: { '1W': [100, 99.48, 99.11, 100.54, 100.67], '1M': [100, 96.61, 96.79, 98.19, 98.25, 99.2, 100.74, 98.06, 96.9, 97.31, 94.44, 96.41, 95.79, 94.75, 95.84, 95.4, 94.04, 93.55, 93.21, 94.56, 94.68], 'YTD': [100, 106.86, 110.62, 109.18, 107.14, 108.61, 109.68, 108.56, 103.36, 103.45, 104.67, 100.99, 107.17, 114.01, 117.83, 118.06, 122.13, 122.96, 128.53, 132.18, 121, 131.29, 129.51, 125.08, 126.34, 124.8], '6M': [100, 98.23, 92.57, 95.17, 98.16, 97.57, 92.9, 91.36, 92.13, 91.25, 91.96, 100.3, 104.38, 106.37, 106.11, 109.77, 112.05, 112.8, 115.47, 111.17, 115.87, 114.46, 119.35, 111.89, 113.03, 112.17] } },
    { t: 'CNEQ', chosen: false, anchor: false, score: 20.1, ret6: 12.7, ret1: 27.5, corr: 0.79, reason: 'diverse', series: { '1W': [100, 100.5, 103.11, 102.66, 101.23], '1M': [100, 99.68, 98.88, 98.8, 101.35, 103.12, 101.25, 99.18, 100.87, 98.6, 101.62, 101.37, 98.95, 99.53, 99.9, 97.14, 95.75, 96.23, 98.73, 98.3, 96.93], 'YTD': [100, 102.36, 101.69, 101.8, 97.88, 98.23, 97.61, 95.52, 93.72, 95.46, 92.15, 90.52, 97.32, 104.48, 107.01, 106.84, 112.35, 111.37, 117.51, 119.6, 112.97, 119.28, 117.98, 115.62, 116.29, 112.83], '6M': [100, 98.61, 96.11, 95.73, 96.43, 95.44, 95.47, 95.32, 92.77, 86.2, 92.74, 102.88, 104.39, 107.06, 107.46, 112.18, 111.69, 117.37, 120.65, 113.22, 119.9, 115.86, 117.69, 118.12, 112.91, 112.66] } },
    { t: 'XMMO', chosen: false, anchor: false, score: 19.5, ret6: 14.9, ret1: 24.1, corr: 0.86, reason: 'correlated', series: { '1W': [100, 99.43, 102.26, 102.97, 103.44], '1M': [100, 99.62, 100.89, 98.5, 98.71, 100.31, 97.87, 96.19, 97.17, 94.49, 95.79, 95.22, 93.56, 94.79, 94.73, 93.11, 92.61, 92.09, 94.71, 95.37, 95.8], 'YTD': [100, 102.07, 103.39, 102.99, 103.06, 104.95, 106.98, 108.37, 104.04, 104, 106.66, 104.74, 111.43, 112.49, 115.74, 115.72, 120.84, 114.86, 121.7, 124.02, 121.38, 125.54, 120.92, 115.77, 116.05, 117.36], '6M': [100, 99.22, 103.73, 103.41, 103.99, 107.48, 103.78, 101.85, 102.67, 98.34, 104.65, 111.79, 111.74, 113.15, 113.18, 118.34, 113.78, 119.83, 120.21, 116.94, 120.41, 119.51, 117.41, 114.92, 111.7, 114.93] } },
    { t: 'BCTK', chosen: false, anchor: false, score: 15.5, ret6: 14.2, ret1: 16.8, corr: -0.03, reason: 'diverse', series: { '1W': [100, 100.25, 103.05, 101.67, 99.92], '1M': [100, 100.02, 100.9, 99.69, 103.84, 107.07, 103.68, 100.7, 102.95, 99.83, 102.69, 101.94, 98.93, 100.63, 99.55, 96.45, 95.11, 95.35, 98.02, 96.7, 95.04], 'YTD': [100, 101.82, 101.56, 102.35, 96.46, 98.58, 97.93, 98.07, 97.56, 97.41, 96.65, 92.87, 97.94, 105.08, 109.63, 109.97, 116.82, 113.32, 120.21, 126.06, 119.41, 125.84, 125.4, 121.37, 120.23, 114.77], '6M': [100, 98.45, 95.38, 95.68, 95.95, 99.14, 99.07, 96.93, 96.73, 88, 94.2, 102.38, 106.12, 109.08, 110.11, 116.25, 114.01, 120.69, 127.8, 117.78, 124.52, 120.2, 124.6, 123.42, 115.91, 114.21] } },
    { t: 'MARS', chosen: false, anchor: false, score: -2.3, ret6: -2.3, ret1: -2.3, corr: 0.02, reason: 'diverse', series: { '1W': [100, 98.24, 102.34, 100.49, 99.18], '1M': [100, 95.26, 92.1, 93.4, 102.92, 107.2, 103.82, 104.05, 103.15, 96.22, 94.69, 92.63, 88.52, 89.12, 87.13, 82.28, 80.96, 79.53, 82.85, 81.35, 80.29], 'YTD': [100, 101.98, 106.46, 106.13, 105.45, 107.38, 120.34, 123.37, 132.45, 122.92, 117.68, 121.99, 143.79, 147.18, 157.02, 183.98, 159, 140.31, 135.03, 132.49, 112.03, 126.27, 117.03, 107.67, 98.47, 97.66], '6M': [100, 101.98, 106.46, 106.13, 105.45, 107.38, 120.34, 123.37, 132.45, 122.92, 117.68, 121.99, 143.79, 147.18, 157.02, 183.98, 159, 140.31, 135.03, 132.49, 112.03, 126.27, 117.03, 107.67, 98.47, 97.66] } },
    { t: 'ARKK', chosen: false, anchor: false, score: -5.5, ret6: -7.5, ret1: -3.5, corr: 0.71, reason: 'diverse', series: { '1W': [100, 99.67, 103.32, 101.1, 99.26], '1M': [100, 100.05, 99.82, 101.89, 105.15, 105.4, 106.74, 105.96, 109.04, 105.88, 106.32, 104.65, 102.03, 103.7, 103.81, 99.99, 98.07, 97.74, 101.32, 99.15, 97.34], 'YTD': [100, 104.38, 106.19, 103.71, 95.48, 92.13, 93.92, 94.79, 94.12, 93.67, 89.7, 87.87, 89.6, 100.55, 99.45, 100, 104.04, 96, 101.34, 104.1, 98.1, 101.96, 104.82, 104.21, 103.48, 97.04], '6M': [100, 92.78, 87.25, 87.05, 86.74, 91.97, 92.06, 89.28, 87.88, 78.71, 85.2, 92.73, 95.89, 94.86, 96.94, 99.17, 92.33, 95.7, 99.02, 92.94, 97.99, 95.07, 101.43, 101.03, 95.01, 92.49] } },
    { t: 'WCLD', chosen: false, anchor: false, score: -6.3, ret6: -0.8, ret1: -11.7, corr: 0.11, reason: 'diverse', series: { '1W': [100, 100.23, 96.9, 92.7, 92.33], '1M': [100, 100.68, 98.94, 104.85, 107.72, 109.44, 113.32, 114.44, 116.49, 117.58, 117.86, 115.6, 118.09, 119.44, 118.44, 119.02, 118.78, 119.05, 115.09, 110.11, 109.66], 'YTD': [100, 98.97, 91.6, 92.72, 80.41, 78.81, 79.52, 77.92, 84.96, 80.69, 77.41, 78.03, 72.44, 77.21, 77.49, 82.35, 82.78, 84.75, 84.09, 94.66, 87.6, 82.66, 90.12, 96.43, 99.09, 91.75], '6M': [100, 93.01, 86.12, 87.08, 78.15, 85.69, 91.47, 87.27, 88.1, 82.04, 85.06, 77.63, 86.03, 84.12, 91.16, 89.52, 91.1, 93.14, 107.41, 96.26, 93.91, 91.1, 102.53, 106.64, 107.69, 99.22] } },
    { t: 'IGV', chosen: false, anchor: false, score: -15.5, ret6: -9.8, ret1: -21.2, corr: 0.32, reason: 'diverse', series: { '1W': [100, 100.19, 98.94, 95.93, 95], '1M': [100, 98.68, 97.07, 101.01, 102.94, 103.76, 106.89, 107.16, 108.55, 107.8, 107.51, 105.83, 106.16, 107.23, 107.58, 107.31, 106.28, 106.48, 105.15, 101.95, 100.96], 'YTD': [100, 99.35, 93.02, 92.5, 80.79, 78.75, 77.38, 77.18, 83.23, 80.38, 76.47, 75.74, 72.51, 79.82, 80.61, 81.97, 85.81, 87, 88.04, 94.67, 86.03, 82.61, 85.05, 87.5, 88.88, 83.41], '6M': [100, 92.43, 84.39, 84.71, 78.74, 84.71, 89.77, 86.94, 86.42, 79.44, 82.39, 81.34, 88.71, 87.43, 90.51, 92.82, 95.05, 96.25, 107.18, 95.13, 93.51, 88.19, 95.53, 96.08, 95.9, 90.23] } },
  ],
  'Electrification': [
    { t: 'VOLT', chosen: true, anchor: true, score: 34, ret6: 23.7, ret1: 44.2, corr: 0.61, reason: 'anchor', series: { '1W': [100, 99.34, 101.72, 102.09, 102.44], '1M': [100, 100.71, 102.98, 99.41, 100.47, 103.23, 99.51, 96.53, 97.66, 94.78, 95.64, 95.84, 94.16, 95.76, 95.02, 92.9, 92.93, 92.31, 94.53, 94.87, 95.19], 'YTD': [100, 102.86, 108.84, 111.36, 114.4, 121.66, 121.94, 123.46, 115.06, 118.82, 121.24, 118.38, 129.54, 130.13, 136.35, 140.71, 142.92, 131.79, 137.87, 137.53, 134.59, 145.38, 140.95, 132.58, 133.31, 133.55], '6M': [100, 103.17, 108.23, 112.94, 113.29, 114.47, 109.06, 110.05, 110.02, 106.15, 112.62, 122.03, 122.29, 125.39, 130.04, 132.37, 123.21, 128.98, 126.9, 123.73, 128.27, 130.87, 129.3, 124.27, 120.72, 123.7] } },
    { t: 'POW', chosen: true, anchor: false, score: 31, ret6: 25.8, ret1: 36.2, corr: -0.02, reason: 'diversifier', series: { '1W': [100, 98.19, 101.4, 102.11, 102.01], '1M': [100, 99.74, 100.46, 96.93, 99.97, 102.14, 98.55, 95.32, 95.72, 91.13, 92.29, 93.44, 90.08, 91.79, 91.33, 87.97, 89.19, 87.57, 90.44, 91.07, 90.99], 'YTD': [100, 103.65, 110.41, 115.14, 117.22, 124.49, 124.03, 130.44, 118.29, 124.03, 126.73, 123.23, 135.19, 137.56, 155.55, 160.69, 170.19, 148.43, 161.85, 156.92, 152.12, 161.7, 154.18, 140.61, 140.86, 140.33], '6M': [100, 102.92, 106.35, 111.31, 113.41, 116.87, 109.81, 111.18, 113.5, 107.05, 113.02, 125.48, 126.24, 137.56, 144.12, 152.55, 135.96, 147.4, 142.53, 134.23, 141.07, 137.88, 136.24, 127.58, 121.61, 125.78] } },
    { t: 'PBD', chosen: true, anchor: false, score: 15.8, ret6: 1.1, ret1: 30.4, corr: 0.61, reason: 'diversifier', series: { '1W': [100, 99.67, 98.46, 100, 100], '1M': [100, 95.65, 94.32, 93.98, 92.27, 94.03, 95.89, 94.47, 93.15, 95.4, 90.66, 91.1, 91.14, 89.24, 90.51, 91.29, 89.09, 88.8, 87.72, 89.09, 89.09], 'YTD': [100, 104.54, 108.46, 113.56, 111.13, 113.74, 113.25, 114.18, 107.46, 111.5, 110.82, 111.5, 115.73, 122.08, 124.5, 130.6, 136.07, 130.6, 139.37, 138.37, 121.83, 126.24, 117.29, 116.23, 115.05, 113.25], '6M': [100, 100.67, 97.5, 99.39, 102.05, 101.89, 95.89, 97, 96.73, 97.06, 100.67, 106.22, 110.38, 113.15, 116.54, 121.42, 117.81, 120.48, 124.08, 113.71, 114.15, 108.49, 108.77, 102.83, 103.55, 101.05] } },
    { t: 'PBW', chosen: false, anchor: false, score: 15.6, ret6: -6, ret1: 37.1, corr: 0.8, reason: 'correlated', series: { '1W': [100, 99.46, 102.55, 101.32, 101.11], '1M': [100, 97.07, 96.27, 94.68, 97.89, 100.23, 97.94, 93.99, 96.4, 90.7, 91.68, 90.49, 87.36, 89.88, 89.72, 85.89, 85.79, 85.33, 87.98, 86.92, 86.74], 'YTD': [100, 109.43, 115.62, 117.22, 113.72, 113, 109.89, 106.12, 101.05, 106.84, 105.53, 103.41, 106.68, 115.88, 121.58, 126.72, 137.36, 124.36, 147.41, 149.71, 130.03, 134.97, 124.75, 115.03, 114.34, 110.54], '6M': [100, 93.96, 95.35, 93.23, 92.82, 92.37, 88.55, 90.87, 88.11, 83.76, 86.83, 95.74, 100.72, 104.04, 106.88, 116.82, 109.11, 124.37, 130.85, 109.3, 111.45, 105.21, 106.15, 99.36, 93.09, 94.01] } },
    { t: 'IVEP', chosen: false, anchor: false, score: 1.5, ret6: 1.5, ret1: 1.5, corr: 0.07, reason: 'diverse', series: { '1W': [100, 100.12, 103.59, 103.24, 103.44], '1M': [100, 100.14, 100.89, 97.72, 98.32, 99.68, 96.29, 95.22, 96.97, 94.58, 95.47, 95.72, 94.19, 95.37, 94.22, 91.59, 91.3, 91.41, 94.58, 94.26, 94.44], 'YTD': [100, 102.76, 104.18, 103.91, 108.89, 106.28, 110.15, 112.07, 110.92, 110.73, 103.83, 108.66, 108.12, 109.31, 104.37, 99.85, 107.01, 110.5, 107.62, 105.02, 103.49, 101.65, 102.87, 101.26, 98.24, 101.49], '6M': [100, 102.76, 104.18, 103.91, 108.89, 106.28, 110.15, 112.07, 110.92, 110.73, 103.83, 108.66, 108.12, 109.31, 104.37, 99.85, 107.01, 110.5, 107.62, 105.02, 103.49, 101.65, 102.87, 101.26, 98.24, 101.49] } },
  ],
  'Industrials': [
    { t: 'PRN', chosen: true, anchor: true, score: 31.5, ret6: 19.3, ret1: 43.7, corr: 0.64, reason: 'anchor', series: { '1W': [100, 100.23, 103.96, 104.05, 104.72], '1M': [100, 99.59, 101.78, 98.46, 100.86, 102.94, 98.74, 92.85, 93.92, 89.86, 91.56, 90.96, 88.61, 90.42, 89.99, 87.2, 87.25, 87.46, 90.71, 90.79, 91.37], 'YTD': [100, 106.03, 113.24, 113.35, 113.68, 117.76, 120.81, 119.01, 110.89, 111.75, 115.58, 111.43, 123.46, 124.46, 130.36, 133.34, 140.55, 130.41, 141.52, 142.67, 138.68, 150.44, 146.32, 130.09, 130.55, 132.55], '6M': [100, 99.33, 103.91, 106.34, 108.7, 108.02, 102.1, 100.54, 102.31, 95.76, 103.43, 113.73, 114.65, 117.63, 119.39, 126.45, 119.52, 126.87, 126.83, 121.66, 127.96, 129.98, 128.87, 119.51, 113.82, 119.25] } },
    { t: 'AIRR', chosen: false, anchor: false, score: 27.6, ret6: 10.7, ret1: 44.6, corr: 0.9, reason: 'correlated', series: { '1W': [100, 99.25, 101.67, 102.07, 102.44], '1M': [100, 100.74, 102.63, 100.13, 101.59, 102.88, 99.88, 97.21, 98.03, 94.87, 96.01, 95.44, 93.77, 95.21, 95.14, 94.39, 93.51, 92.81, 95.07, 95.45, 95.8], 'YTD': [100, 109.44, 115.48, 115.23, 117.4, 122.41, 122.72, 120.21, 112.3, 112.42, 114.18, 112.67, 122.69, 122.45, 126.23, 129.43, 132.63, 124.63, 131.64, 134.05, 130.58, 135.53, 133.83, 124.65, 125.34, 126.2], '6M': [100, 98.31, 105.72, 106.29, 106.31, 106.58, 100.91, 98.61, 98.54, 94.49, 101.2, 109.55, 109.79, 112.1, 111.76, 116.34, 111.51, 114.46, 114.9, 113.94, 116.22, 116.41, 115.41, 110.94, 109.07, 110.7] } },
    { t: 'BILT', chosen: true, anchor: false, score: 11.3, ret6: 8.3, ret1: 14.3, corr: 0.04, reason: 'diversifier', series: { '1W': [100, 99.53, 99.3, 100.64, 100.7], '1M': [100, 100.44, 101.2, 101.71, 101.31, 100.09, 100.12, 101.8, 101.34, 102.05, 101.3, 101.75, 102.16, 102.3, 101.66, 102.23, 101.84, 101.35, 101.12, 102.49, 102.55], 'YTD': [100, 100.25, 102.35, 104.1, 105.33, 110.12, 111.73, 114.84, 112.04, 112.23, 109.06, 110.88, 114.49, 112.59, 112.72, 114.24, 112.54, 112.43, 113.86, 112.33, 113.2, 107.81, 109.7, 109.87, 110.07, 111.03], '6M': [100, 102.28, 104.57, 109.95, 110.44, 111.82, 109.22, 109.46, 106.2, 107.38, 109.63, 110.49, 108.03, 110.11, 110.49, 109.76, 108.96, 111.19, 109.13, 109.54, 106.37, 106.06, 105.73, 106.98, 107.96, 108.29] } },
    { t: 'IDEF', chosen: true, anchor: false, score: 0.5, ret6: -9.5, ret1: 10.5, corr: 0.64, reason: 'diversifier', series: { '1W': [100, 99.52, 100.61, 101.19, 103.5], '1M': [100, 98.76, 98.32, 98.29, 99.33, 100.86, 101.78, 104.7, 106.6, 104.16, 101.9, 101.46, 99.68, 99.97, 100.13, 98.73, 98.67, 98.19, 99.27, 99.84, 102.12], 'YTD': [100, 112.5, 116.82, 116.26, 113.93, 112.14, 116.07, 116.43, 115.83, 114.61, 108.99, 106.2, 112.18, 112.79, 107.56, 108.25, 108.15, 103.5, 108.51, 106.53, 106.53, 102.89, 101.59, 104.77, 102.41, 104.45], '6M': [100, 97.27, 97.12, 97.69, 99.92, 103.48, 101.6, 99.3, 95.95, 88.35, 95.36, 98.28, 95.08, 93.05, 93.22, 93.7, 90.49, 94.66, 93.11, 89.65, 92.29, 87.51, 90.19, 90.3, 87.49, 90.49] } },
  ],
  'Meme': [
    { t: 'BUZZ', chosen: true, anchor: true, score: 3.3, ret6: -0.3, ret1: 6.9, corr: 0.09, reason: 'anchor', series: { '1W': [100, 99, 99.88, 103.5, 102.71], '1M': [100, 97.49, 95.49, 94.05, 95.06, 97.65, 98.59, 98.24, 96.93, 98.4, 95.76, 97.2, 96.53, 94.4, 94.82, 94.24, 90.74, 89.83, 90.64, 93.92, 93.2], 'YTD': [100, 107.17, 108.62, 107.33, 100.92, 95.94, 94.74, 94.52, 94.88, 96.24, 92.83, 88.55, 92.4, 103.69, 104.43, 105.51, 114.5, 111.08, 118.65, 122.01, 109.57, 116.96, 109.66, 110.13, 109.39, 107.51], '6M': [100, 98.09, 84.92, 85.69, 87.04, 87.69, 88.02, 87.41, 84.72, 79.47, 84.05, 89.09, 97.72, 97.69, 97.89, 106.23, 104.37, 107.71, 116.5, 107.68, 109.37, 104.34, 105.51, 102.48, 100.86, 99.74] } },
    { t: 'RKNG', chosen: true, anchor: false, score: -5.5, ret6: -5.5, ret1: -5.5, corr: 0.08, reason: 'diversifier', series: { '1W': [100, 99.82, 101.37, 109.64, 109.69], '1M': [100, 94.9, 91.75, 92.61, 89.84, 93.23, 95.67, 90.81, 84.49, 86.64, 83.24, 86.23, 84.22, 80.09, 82.03, 79.85, 73.64, 73.5, 74.65, 80.73, 80.77], 'YTD': [100, 95.76, 77.78, 79.73, 80.08, 78.38, 74.83, 77.12, 75.82, 70.91, 75.79, 85.15, 93.98, 94.83, 98.64, 102.81, 102.89, 109.45, 115.52, 106.65, 114.46, 111.08, 111.99, 97.44, 93.47, 94.55], '6M': [100, 95.76, 77.78, 79.73, 80.08, 78.38, 74.83, 77.12, 75.82, 70.91, 75.79, 85.15, 93.98, 94.83, 98.64, 102.81, 102.89, 109.45, 115.52, 106.65, 114.46, 111.08, 111.99, 97.44, 93.47, 94.55] } },
    { t: 'MEME', chosen: true, anchor: false, score: -11.3, ret6: -1.3, ret1: -21.2, corr: 0.09, reason: 'diversifier', series: { '1W': [100, 101.45, 111.93, 111.59, 112.03], '1M': [100, 95.28, 94.26, 90.15, 96.21, 98.77, 93.03, 86.05, 87.38, 81.23, 86.26, 85.13, 80, 81.13, 77.74, 70.36, 70.77, 71.79, 79.21, 78.97, 79.28], 'YTD': [100, 124.19, 131.94, 126.77, 120.48, 111.61, 112.42, 106.13, 98.23, 111.13, 111.29, 99.68, 116.45, 142.58, 133.23, 140.65, 165.32, 147.26, 186.13, 182.1, 164.35, 167.74, 151.29, 130.65, 122.26, 124.68], '6M': [100, 90.93, 87.48, 84.93, 87.1, 88.38, 82.63, 87.99, 87.36, 73.44, 83.78, 105.87, 113.67, 105.62, 113.15, 130.91, 119.03, 144.57, 149.68, 122.09, 125.03, 118.65, 115.84, 107.41, 87.61, 98.72] } },
  ],
};
// @@END_GENERATED:THEME_UNIVERSE@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 9, avgWeight: 7.25, proScore: 6.52, coverage: 0.9,
      price: 209.08, weeklyPrices: [202.81, 203.28, 207.29, 212.06, 209.08], weeklyChange: 3.09, dayChange: -1.41, sortRank: 0, periodReturns: { '1M': 4.5, 'YTD': 12.1, '6M': 11.4, '1Y': 22.4 },
      priceHistory: { '1D': [212.06, 209.1, 209.08], '1W': [202.81, 203.28, 207.29, 212.06, 209.08], '1M': [200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 196.93, 202.78, 210.96, 203.53, 211.8, 212.5, 207.4, 202.81, 203.28, 207.29, 212.06, 209.08], 'YTD': [186.5, 184.86, 186.23, 188.52, 180.34, 190.05, 187.9, 177.19, 177.82, 183.22, 175.2, 174.4, 183.91, 198.35, 208.27, 198.45, 219.44, 220.61, 212.6, 218.66, 204.87, 208.65, 194.97, 204.12, 212.5, 209.08], '6M': [187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 216.61, 198.48, 219.44, 222.32, 214.86, 222.82, 208.19, 207.41, 199, 197.58, 202.78, 207.4, 209.08], '1Y': [170.78, 179.27, 179.42, 181.59, 175.4, 181.6, 171.66, 177.33, 170.29, 176.97, 187.24, 189.11, 179.83, 180.28, 207.04, 195.21, 193.8, 186.52, 180.26, 183.38, 183.78, 170.94, 188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 214.75, 208.19, 207.41, 199, 197.58, 202.78, 207.4, 209.08] },
      velocityScore: { '1D': 1.1, '1W': 2, '1M': 4.7, '6M': null }, isNew: false,
      marketCap: '$5.1T', pe: 32, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { AIS: 2.87, ARTY: 5.07, BAI: 4.83, IGPT: 8.3, IVES: 4.98, ALAI: 13.7, CHAT: 7.78, AIFD: 6.85, SPRX: false, AOTG: 10.84 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.84, proScore: 5.26, coverage: 0.9,
      price: 547.81, weeklyPrices: [495.76, 503.57, 544.43, 552.33, 547.81], weeklyChange: 10.5, dayChange: -0.82, sortRank: 0, periodReturns: { '1M': 5.4, 'YTD': 155.8, '6M': 111, '1Y': 245.3 },
      priceHistory: { '1D': [552.33, 547.3, 547.81], '1W': [495.76, 503.57, 544.43, 552.33, 547.81], '1M': [519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 546.72, 557.89, 534.39, 548.13, 529.14, 500.94, 495.76, 503.57, 544.43, 552.33, 547.81], 'YTD': [214.16, 203.17, 231.83, 252.03, 242.11, 213.58, 203.37, 200.21, 192.43, 196.58, 205.37, 203.43, 236.64, 278.26, 347.81, 360.54, 458.79, 414.05, 495.54, 523.2, 488.45, 551.63, 539.49, 517.41, 529.14, 547.81], '6M': [259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 334.63, 341.54, 458.79, 420.99, 503.89, 521.54, 475.51, 507.29, 519.74, 540.88, 546.72, 500.94, 547.81], '1Y': [158.65, 179.51, 163.12, 184.42, 165.2, 167.13, 161.79, 159.54, 159.16, 160.88, 164.01, 235.56, 238.6, 230.23, 264.33, 256.33, 258.89, 223.55, 214.24, 215.98, 221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 475.51, 507.29, 519.74, 540.88, 546.72, 500.94, 547.81] },
      velocityScore: { '1D': 0, '1W': 1.7, '1M': 5.6, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 183.8, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 5.66, ARTY: 5.46, BAI: 5.57, IGPT: 9.15, IVES: 4.72, ALAI: 1.44, CHAT: 4.22, AIFD: false, SPRX: 0.64, AOTG: 15.74 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 5.62, proScore: 5.06, coverage: 0.9,
      price: 974.72, weeklyPrices: [848.95, 865.46, 970.82, 959.48, 974.72], weeklyChange: 14.81, dayChange: 1.59, sortRank: 0, periodReturns: { '1M': -7.3, 'YTD': 241.5, '6M': 143.9, '1Y': 787.5 },
      priceHistory: { '1D': [959.48, 975.05, 974.72], '1W': [848.95, 865.46, 970.82, 959.48, 974.72], '1M': [1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 991.64, 979.3, 937, 983.12, 904.28, 853.2, 848.95, 865.46, 970.82, 959.48, 974.72], 'YTD': [285.41, 345.09, 362.75, 410.24, 419.44, 410.34, 417.35, 412.37, 370.3, 441.8, 395.53, 337.84, 421.51, 457.23, 496.72, 542.21, 795.33, 698.74, 928.41, 996, 995.87, 1211.38, 1145.28, 948.8, 904.28, 974.72], '6M': [399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1032.28, 991.64, 853.2, 974.72], '1Y': [109.83, 114.74, 108.78, 124.27, 117.21, 117.75, 124.21, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 198.47, 226.63, 237.5, 244.9, 225.92, 230.26, 226.65, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 935.89, 1020.76, 1048.51, 1032.28, 991.64, 853.2, 974.72] },
      velocityScore: { '1D': -0.8, '1W': 2.8, '1M': -16.8, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 22, revenueGrowth: 346, eps: 44.23, grossMargin: 73, dividendYield: 0.06,
      etfPresence: { AIS: 7.07, ARTY: 4.9, BAI: 6.38, IGPT: 8, IVES: 4.6, ALAI: 1.15, CHAT: 3.67, AIFD: 5.95, SPRX: false, AOTG: 8.83 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.95, proScore: 3.16, coverage: 0.8,
      price: 393.27, weeklyPrices: [370.83, 378.16, 386.50, 396.81, 393.27], weeklyChange: 6.05, dayChange: -0.89, sortRank: 0, periodReturns: { '1M': 3.5, 'YTD': 13.6, '6M': 22.9, '1Y': 38.6 },
      priceHistory: { '1D': [396.81, 393.76, 393.27], '1W': [370.83, 378.16, 386.5, 396.81, 393.27], '1M': [380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 370.78, 401.11, 399.97, 384.05, 389.11, 394.28, 374.45, 370.83, 378.16, 386.5, 396.81, 393.27], 'YTD': [346.1, 344.97, 351.71, 332.79, 320.33, 342.76, 333.99, 319.55, 330.48, 324.92, 318.29, 309.51, 354.91, 398.47, 422.76, 421.28, 428.43, 411.07, 421.86, 418.91, 385.57, 392.13, 372.45, 388.69, 394.28, 393.27], '6M': [320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 418.2, 416.5, 428.43, 420.71, 422.01, 481.57, 392.16, 376.71, 382.07, 369.34, 401.11, 374.45, 393.27], '1Y': [283.69, 302.62, 301.67, 309.09, 291.17, 300.25, 306.1, 369.57, 346.17, 339.31, 333.39, 345.5, 351.33, 340.3, 385.98, 358.98, 355.22, 354.42, 397.57, 381.03, 412.97, 326.02, 350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 479.23, 392.16, 376.71, 382.07, 369.34, 401.11, 374.45, 393.27] },
      velocityScore: { '1D': 1.6, '1W': 1.3, '1M': 14.5, '6M': null }, isNew: false,
      marketCap: '$1.9T', pe: 65.7, revenueGrowth: 48, eps: 5.99, grossMargin: 76, dividendYield: 0.66,
      etfPresence: { AIS: 0.77, ARTY: 4.89, BAI: 4.81, IGPT: false, IVES: 4.88, ALAI: 4.25, CHAT: 4.95, AIFD: 5.57, SPRX: false, AOTG: 1.48 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 7, avgWeight: 2.35, proScore: 1.65, coverage: 0.7,
      price: 175.75, weeklyPrices: [168.61, 169.35, 174.58, 174.87, 175.75], weeklyChange: 4.23, dayChange: 0.47, sortRank: 0, periodReturns: { '1M': 8.4, 'YTD': 34.1, '6M': 28.9, '1Y': 55.5 },
      priceHistory: { '1D': [174.94, 175.84, 175.75], '1W': [168.61, 169.35, 174.58, 174.87, 175.75], '1M': [162.2, 161.74, 165.45, 157.6, 164.1, 169.88, 166.62, 159.99, 173.28, 166.46, 184.69, 186.96, 181.15, 182.57, 171.92, 168.56, 168.61, 169.35, 174.58, 174.87, 175.75], 'YTD': [131.03, 122.89, 129.83, 146.69, 139.39, 140.66, 137.23, 133.5, 132.89, 135.35, 130.8, 122.78, 146.05, 161.01, 176.91, 172.7, 136.43, 141.58, 154.31, 166.01, 156.4, 174.56, 164.1, 181.05, 171.92, 175.75], '6M': [136.34, 141.74, 137.49, 141.59, 127.43, 129.3, 137.17, 135.35, 135.88, 116.13, 133.64, 154.37, 172.86, 172.47, 172.62, 136.43, 141.71, 158.01, 175.33, 152.16, 168.01, 161.74, 166.62, 184.69, 168.56, 175.75], '1Y': [113.04, 122.09, 138.78, 138.01, 131.47, 133.27, 141.17, 150.72, 142.84, 142.64, 149.27, 157.36, 143.38, 146.59, 162.03, 140.42, 134.98, 124.81, 127.65, 128.55, 132.36, 122.36, 130.77, 133.6, 122.89, 129.83, 143.72, 138.37, 141.74, 142.58, 128.77, 124.6, 137.17, 135.35, 135.88, 116.13, 133.64, 154.37, 172.86, 165.29, 170.22, 142.54, 141.58, 154.31, 174.37, 152.16, 168.01, 161.74, 166.62, 184.69, 168.56, 175.75] },
      velocityScore: { '1D': 0, '1W': 3.1, '1M': 23.1, '6M': null }, isNew: false,
      marketCap: '$221B', pe: 60.6, revenueGrowth: 35, eps: 2.9, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.71, ARTY: 2.74, BAI: 1.54, IGPT: false, IVES: false, ALAI: 0.41, CHAT: 2.38, AIFD: 5.47, SPRX: 2.22, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 7 of 10 AI & ML ETFs (70% coverage) with average weight 2.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 5.09, proScore: 3.05, coverage: 0.6,
      price: 320.96, weeklyPrices: [346.77, 351.99, 347.15, 342.09, 320.96], weeklyChange: -7.44, dayChange: -6.18, sortRank: 0, periodReturns: { '1M': -7.3, 'YTD': 2.5, '6M': -2.1, '1Y': 68.7 },
      priceHistory: { '1D': [342.09, 321.29, 320.96], '1W': [346.77, 351.99, 347.15, 342.09, 320.96], '1M': [346.13, 345.29, 343.71, 337.39, 353.65, 357.37, 361.21, 359.91, 366.46, 367.03, 358.89, 357.18, 352.51, 359.51, 370.92, 354.46, 346.77, 351.99, 347.15, 342.09, 320.96], 'YTD': [313, 328.57, 330, 334.55, 339.71, 310.96, 302.85, 311.76, 298.52, 305.56, 290.44, 287.56, 318.49, 336.02, 344.4, 385.69, 388.64, 387.66, 388.83, 372.19, 357.77, 349.68, 353.65, 361.92, 370.92, 320.96], '6M': [327.93, 338, 322.86, 305.72, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 350.34, 383.25, 388.64, 396.94, 388.88, 361.85, 364.26, 373.25, 345.29, 361.21, 358.89, 354.46, 320.96], '1Y': [190.23, 196.53, 196.09, 201.96, 199.32, 207.48, 232.3, 239.17, 249.53, 247.14, 244.9, 244.62, 251.03, 251.69, 274.57, 284.31, 286.71, 292.81, 319.95, 317.62, 320.21, 296.72, 314.09, 315.15, 328.57, 330, 333.26, 343.69, 324.32, 302.02, 310.9, 303.58, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 387.35, 387.66, 388.83, 358.99, 364.26, 373.25, 345.29, 361.21, 358.89, 354.46, 320.96] },
      velocityScore: { '1D': -1, '1W': -3.5, '1M': 7.4, '6M': null }, isNew: false,
      marketCap: '$3.9T', pe: 16.1, revenueGrowth: 24, eps: 19.94, grossMargin: 61, dividendYield: 0.26,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.27, IGPT: 7.96, IVES: 4.57, ALAI: false, CHAT: 5.5, AIFD: 5.2, SPRX: false, AOTG: 4.04 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 6, avgWeight: 4.76, proScore: 2.85, coverage: 0.6,
      price: 416.28, weeklyPrices: [398.37, 402.30, 424.61, 421.21, 416.28], weeklyChange: 4.5, dayChange: -1.15, sortRank: 0, periodReturns: { '1M': -4.6, 'YTD': 37, '6M': 24.3, '1Y': 73.2 },
      priceHistory: { '1D': [421.13, 415.99, 416.28], '1W': [398.37, 402.3, 424.61, 421.21, 416.28], '1M': [436.39, 440.83, 434.99, 432.35, 455.1, 477.57, 444.23, 434.16, 451.79, 432.57, 436.96, 434.11, 421.58, 420.39, 419.48, 409.74, 398.37, 402.3, 424.61, 421.21, 416.28], 'YTD': [303.89, 323.63, 342.4, 338.34, 335.75, 374.09, 360.39, 374.58, 338.89, 340.23, 343.25, 337.95, 365.49, 363.35, 402.46, 397.67, 404.54, 392.61, 422.73, 444.92, 421.07, 467.67, 455.1, 436.98, 419.48, 416.28], '6M': [334.87, 330.56, 348.85, 366.36, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 404.98, 401.61, 404.54, 395.95, 412.32, 446.69, 427.92, 425.83, 440.83, 444.23, 436.96, 409.74, 416.28], '1Y': [240.33, 242.91, 231.37, 241.44, 228.6, 239.29, 235.21, 260.44, 262.79, 280.71, 288.47, 304.52, 304.71, 288.88, 305.09, 293.64, 290.62, 282.37, 289.96, 292.93, 310.14, 276.96, 298.8, 319.61, 323.63, 342.4, 332.71, 341.36, 355.41, 364.2, 385.75, 353.13, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 392.61, 422.73, 436.69, 427.92, 425.83, 440.83, 444.23, 436.96, 409.74, 416.28] },
      velocityScore: { '1D': -0.3, '1W': 0.7, '1M': -3.7, '6M': null }, isNew: false,
      marketCap: '$2.2T', pe: 36.6, revenueGrowth: 36, eps: 11.37, grossMargin: 64, dividendYield: 0.9,
      etfPresence: { AIS: 3.5, ARTY: false, BAI: 4.63, IGPT: false, IVES: 4.83, ALAI: 5.3, CHAT: false, AIFD: 3.29, SPRX: false, AOTG: 7 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 6, avgWeight: 4.46, proScore: 2.68, coverage: 0.6,
      price: 606.92, weeklyPrices: [646.01, 645.85, 643.81, 627.17, 606.92], weeklyChange: -6.05, dayChange: -3.23, sortRank: 0, periodReturns: { '1M': 8, 'YTD': -8.1, '6M': -7.9, '1Y': -14.9 },
      priceHistory: { '1D': [627.17, 607.39, 606.92], '1W': [646.01, 645.85, 643.81, 627.17, 606.92], '1M': [562.2, 557.67, 542.87, 550.25, 562.6, 563.29, 612.91, 582.9, 600.29, 615.58, 631.48, 669.21, 656.73, 661.04, 681.31, 664.54, 646.01, 645.85, 643.81, 627.17, 606.92], 'YTD': [660.09, 653.06, 620.25, 672.97, 691.7, 668.69, 644.78, 648.18, 644.86, 627.45, 592.92, 572.13, 628.39, 676.87, 675.03, 608.75, 598.86, 602.61, 635.26, 627.57, 568.43, 563.85, 562.6, 603.12, 681.31, 606.92], '6M': [658.76, 716.5, 661.46, 639.77, 637.25, 653.56, 647.39, 627.45, 604.06, 536.38, 575.05, 662.49, 668.84, 678.62, 610.41, 598.86, 611.21, 612.34, 597.63, 584.59, 600.21, 557.67, 612.91, 631.48, 664.54, 606.92], '1Y': [713.58, 695.21, 771.99, 780.08, 747.72, 747.38, 748.65, 751.98, 775.72, 760.66, 717.34, 717.84, 717.55, 733.41, 751.67, 635.95, 609.01, 590.32, 633.61, 661.53, 650.13, 649.5, 667.55, 650.41, 653.06, 620.25, 672.36, 706.41, 677.22, 639.29, 639.3, 655.08, 647.39, 627.45, 604.06, 536.38, 575.05, 662.49, 668.84, 671.34, 604.96, 603, 602.61, 635.26, 622.98, 584.59, 600.21, 557.67, 612.91, 631.48, 664.54, 606.92] },
      velocityScore: { '1D': -4.3, '1W': -5.6, '1M': 43.3, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 22.1, revenueGrowth: 33, eps: 27.47, grossMargin: 82, dividendYield: 0.33,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 9.29, IVES: 4.51, ALAI: 4.19, CHAT: 2.38, AIFD: false, SPRX: 5.08, AOTG: 1.32 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 6, avgWeight: 2.83, proScore: 1.7, coverage: 0.6,
      price: 210.01, weeklyPrices: [188.68, 194.94, 207.96, 210.99, 210.01], weeklyChange: 11.3, dayChange: -0.46, sortRank: 0, periodReturns: { '1M': -24.7, 'YTD': 147.1, '6M': 161.8, '1Y': 186.6 },
      priceHistory: { '1D': [210.99, 210.07, 210.01], '1W': [188.68, 194.94, 207.96, 210.99, 210.01], '1M': [279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 245.29, 249.27, 230.7, 243.27, 235.81, 217.53, 222.44, 206.26, 188.3, 188.68, 194.94, 207.96, 210.99, 210.01], 'YTD': [84.98, 83.22, 80.46, 82.93, 75.54, 81.34, 79.61, 81.69, 89.57, 91.58, 92.36, 99.05, 119.93, 133.37, 164.31, 164.95, 170.84, 176.27, 198.7, 316.43, 280.71, 307.86, 277.75, 231.71, 206.26, 210.01], '6M': [80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 158.21, 163.66, 170.84, 168.93, 208.26, 290.79, 266.88, 278.67, 276.7, 272.05, 243.27, 188.3, 210.01], '1Y': [73.27, 81.74, 75.32, 79.32, 71.22, 74.79, 64.1, 67.1, 70.98, 80.09, 83.89, 92.5, 88.89, 81.05, 90.15, 92.9, 89.33, 81.32, 87.72, 98.19, 92.47, 81.7, 86.49, 89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 77.51, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 198.7, 301.65, 266.88, 278.67, 276.7, 272.05, 243.27, 188.3, 210.01] },
      velocityScore: { '1D': 0.6, '1W': -2.3, '1M': -38, '6M': null }, isNew: false,
      marketCap: '$188B', pe: 71.2, revenueGrowth: 28, eps: 2.95, grossMargin: 52, dividendYield: 0.11,
      etfPresence: { AIS: 3.46, ARTY: 3.52, BAI: 1.64, IGPT: false, IVES: false, ALAI: false, CHAT: 1.33, AIFD: 4.44, SPRX: 2.61, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 4.07, proScore: 2.03, coverage: 0.5,
      price: 236.33, weeklyPrices: [247.23, 249.99, 247.55, 244.85, 236.33], weeklyChange: -4.41, dayChange: -3.48, sortRank: 0, periodReturns: { '1M': 0.9, 'YTD': 2.4, '6M': -1.2, '1Y': 3.5 },
      priceHistory: { '1D': [244.85, 236.28, 236.33], '1W': [247.23, 249.99, 247.55, 244.85, 236.33], '1M': [234.11, 234.27, 227.01, 232.69, 240.14, 238.34, 241.7, 242.67, 244.16, 245.98, 247.04, 245.34, 247.31, 247.49, 254.96, 249.89, 247.23, 249.99, 247.55, 244.85, 236.33], 'YTD': [230.82, 247.38, 239.12, 244.68, 238.62, 204.08, 204.86, 210, 213.21, 211.74, 207.24, 208.27, 233.65, 249.7, 263.99, 268.26, 268.99, 259.34, 271.85, 253.79, 241.51, 232.79, 240.14, 243.62, 254.96, 236.33], '6M': [239.16, 239.3, 210.32, 198.79, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 261.12, 272.05, 268.99, 264.86, 265.29, 256.52, 244.19, 246, 234.27, 241.7, 247.04, 249.89, 236.33], '1Y': [228.29, 230.19, 222.31, 224.56, 223.81, 229.12, 235.68, 230.33, 231.62, 220.21, 220.63, 225.22, 215.57, 217.95, 230.3, 250.2, 244.2, 222.69, 229.16, 229.11, 231.78, 221.27, 232.38, 226.5, 247.38, 239.12, 238.42, 242.96, 208.72, 201.15, 208.56, 208.73, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 259.34, 271.85, 250.02, 244.19, 246, 234.27, 241.7, 247.04, 249.89, 236.33] },
      velocityScore: { '1D': -1.5, '1W': -1, '1M': 36.2, '6M': null }, isNew: false,
      marketCap: '$2.5T', pe: 28.3, revenueGrowth: 17, eps: 8.35, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 4.78, ALAI: 4.83, CHAT: 2.66, AIFD: 3.79, SPRX: false, AOTG: 4.28 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.82, proScore: 1.91, coverage: 0.5,
      price: 390.85, weeklyPrices: [393.82, 402.29, 397.75, 390.34, 390.85], weeklyChange: -0.75, dayChange: 0.13, sortRank: 0, periodReturns: { '1M': 4.5, 'YTD': -19.2, '6M': -16.1, '1Y': -22.7 },
      priceHistory: { '1D': [390.34, 391.5, 390.85], '1W': [393.82, 402.29, 397.75, 390.34, 390.85], '1M': [373.94, 365.46, 352.83, 372.97, 368.57, 373.02, 384.28, 390.49, 386.74, 388.84, 384.36, 385.1, 390.99, 384.93, 395.63, 401.1, 393.82, 402.29, 397.75, 390.34, 390.85], 'YTD': [483.62, 479.28, 459.86, 480.58, 411.21, 404.37, 398.46, 392.74, 408.96, 399.95, 372.74, 370.17, 373.07, 420.26, 424.62, 414.44, 412.66, 417.42, 412.67, 428.05, 390.34, 367.34, 368.57, 383.34, 395.63, 390.85], '6M': [465.95, 430.29, 401.14, 401.32, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 424.82, 413.62, 412.66, 423.54, 416.03, 441.31, 403.41, 393.83, 365.46, 384.28, 384.36, 401.1, 390.85], '1Y': [505.87, 513.24, 524.94, 520.58, 505.72, 506.74, 507.97, 500.37, 510.02, 510.15, 519.71, 524.85, 513.43, 520.54, 541.55, 507.16, 511.14, 487.12, 485.5, 480.84, 478.56, 476.12, 488.02, 472.94, 479.28, 459.86, 470.28, 423.37, 413.6, 396.86, 389, 403.93, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 417.42, 412.67, 427.34, 403.41, 393.83, 365.46, 384.28, 384.36, 401.1, 390.85] },
      velocityScore: { '1D': -1, '1W': 2.7, '1M': 15.8, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 23.3, revenueGrowth: 18, eps: 16.78, grossMargin: 68, dividendYield: 0.93,
      etfPresence: { AIS: false, ARTY: 2.72, BAI: false, IGPT: false, IVES: 4.93, ALAI: 5.2, CHAT: 2.5, AIFD: false, SPRX: false, AOTG: 3.75 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.11, proScore: 1.55, coverage: 0.5,
      price: 331.43, weeklyPrices: [303.62, 309.09, 319.79, 330.89, 331.43], weeklyChange: 9.16, dayChange: 0.16, sortRank: 0, periodReturns: { '1M': -16.5, 'YTD': 99.2, '6M': 95.3, '1Y': 177.4 },
      priceHistory: { '1D': [330.89, 330.89, 331.43], '1W': [303.62, 309.09, 319.79, 330.89, 331.43], '1M': [397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42, 432.74, 382.89, 417.45, 412.97, 362.05, 361.78, 350.62, 319.74, 303.62, 309.09, 319.79, 330.89, 331.43], 'YTD': [166.36, 162.61, 182, 170.93, 158.52, 143.71, 132.62, 118.83, 119.2, 127.48, 121.76, 109.6, 129.46, 170.81, 212.84, 202.68, 207.35, 244.26, 325.33, 358.05, 367.47, 439.66, 455.96, 393.16, 350.62, 331.43], '6M': [169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 196.64, 201.25, 207.35, 215.58, 318.72, 355.76, 341.7, 361.71, 399.92, 430.86, 417.45, 319.74, 331.43], '1Y': [119.48, 128.87, 174.39, 193.64, 172.45, 179.2, 187.95, 230.37, 249.38, 205.27, 194.5, 219.36, 161.46, 154.85, 173.62, 181.94, 157.79, 142.01, 154.22, 152.51, 164.32, 140.24, 169.97, 179.56, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.4, 109.8, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 325.33, 363.54, 341.7, 361.71, 399.92, 430.86, 417.45, 319.74, 331.43] },
      velocityScore: { '1D': 0.6, '1W': -4.3, '1M': -3.1, '6M': null }, isNew: false,
      marketCap: '$57B', pe: 222.4, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 1.92, ARTY: 1.19, BAI: false, IGPT: false, IVES: false, ALAI: 0.87, CHAT: 2.05, AIFD: false, SPRX: 9.52, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 5, avgWeight: 2.92, proScore: 1.46, coverage: 0.5,
      price: 568.09, weeklyPrices: [477.22, 487.42, 548.39, 556.67, 568.09], weeklyChange: 19.04, dayChange: 2.05, sortRank: 0, periodReturns: { '1M': -15.3, 'YTD': 229.8, '6M': 140.3, '1Y': 719.5 },
      priceHistory: { '1D': [556.67, 568.09, 568.09], '1W': [477.22, 487.42, 548.39, 556.67, 568.09], '1M': [670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 532.1, 578.05, 582.59, 555.55, 563.32, 513.84, 466.81, 477.22, 487.42, 548.39, 556.67, 568.09], 'YTD': [172.27, 200.46, 221.51, 252.66, 290.24, 273.74, 284.67, 279.7, 245.25, 286.21, 301.05, 270.49, 337.88, 361.69, 404, 431.52, 515.83, 455.8, 530.6, 575.5, 529.29, 732.62, 651.88, 550.3, 513.84, 568.09], '6M': [236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 400.73, 442.36, 515.83, 458.68, 524.65, 563.1, 517.72, 681.08, 643.83, 598.37, 578.05, 466.81, 568.09], '1Y': [69.32, 71.43, 73.78, 76.07, 75.64, 80.67, 90.49, 95.02, 100.94, 109.69, 130.59, 121.18, 120.44, 120.47, 141.38, 160.1, 166.11, 153.97, 157.74, 161, 181.95, 166.26, 179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 594.11, 517.72, 681.08, 643.83, 598.37, 578.05, 466.81, 568.09] },
      velocityScore: { '1D': 1.4, '1W': 37.7, '1M': -18.9, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 34, revenueGrowth: 46, eps: 16.7, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { AIS: 1.41, ARTY: 2.79, BAI: 3.23, IGPT: 2.97, IVES: false, ALAI: 4.21, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 5, avgWeight: 2.82, proScore: 1.41, coverage: 0.5,
      price: 849.5, weeklyPrices: [732.82, 765.55, 837.56, 829.70, 849.50], weeklyChange: 15.92, dayChange: 2.39, sortRank: 0, periodReturns: { '1M': 2.6, 'YTD': 130.5, '6M': 150.4, '1Y': 731.8 },
      priceHistory: { '1D': [829.7, 849.49, 849.5], '1W': [732.82, 765.55, 837.56, 829.7, 849.5], '1M': [827.92, 842.53, 861.97, 816.98, 851.4, 858.06, 801.16, 728.32, 731.25, 698.91, 785.77, 802.01, 768.15, 814.8, 752, 706.23, 732.82, 765.55, 837.56, 829.7, 849.5], 'YTD': [368.59, 351.42, 324.25, 370.66, 435.1, 574.11, 635.64, 700.91, 558.44, 624.84, 801.99, 702.76, 894.13, 891.22, 881.64, 949.93, 1053.09, 890.09, 902.31, 945.08, 889.59, 893.93, 851.4, 707.1, 752, 849.5], '6M': [339.19, 391.84, 551.99, 562.74, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 859.68, 976.18, 1053.09, 884.98, 910.81, 1029.15, 821.76, 875.36, 842.53, 801.16, 785.77, 706.23, 849.5], '1Y': [102.13, 109.85, 110.01, 120.23, 115.89, 125.84, 141.91, 164.88, 163.34, 152.75, 171.4, 163.09, 156.57, 158.06, 214.28, 232.75, 253.81, 268.92, 308.28, 327.85, 366, 320.25, 395.92, 386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 600.42, 688.27, 694.43, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 890.09, 902.31, 938, 821.76, 875.36, 842.53, 801.16, 785.77, 706.23, 849.5] },
      velocityScore: { '1D': -0.7, '1W': 2.9, '1M': 6.8, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 150.6, revenueGrowth: 90, eps: 5.64, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.8, IGPT: false, IVES: false, ALAI: 1.41, CHAT: 1.66, AIFD: 4.43, SPRX: 3.8, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 5 of 10 AI & ML ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'Credo Technology Group Holding Ltd', easyScore: 5, avgWeight: 1.85, proScore: 0.92, coverage: 0.5,
      price: 226.51, weeklyPrices: [202.68, 212.07, 223.87, 228.27, 226.51], weeklyChange: 11.76, dayChange: -0.77, sortRank: 0, periodReturns: { '1M': -16.7, 'YTD': 57.4, '6M': 70.1, '1Y': 130.2 },
      priceHistory: { '1D': [228.27, 226.89, 226.51], '1W': [202.68, 212.07, 223.87, 228.27, 226.51], '1M': [272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 265.55, 246.4, 265.65, 257.79, 236.88, 236.18, 226.74, 207.97, 202.68, 212.07, 223.87, 228.27, 226.51], 'YTD': [143.89, 150.42, 150.97, 129.57, 111.31, 128.4, 130.66, 112.27, 109.83, 116.88, 100.3, 93.87, 107.93, 158.93, 195.04, 184.38, 210.22, 168.99, 221.23, 217.5, 264.76, 302.52, 245.68, 258.69, 226.74, 226.51], '6M': [133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 180.5, 180.06, 210.22, 156.27, 221.64, 229, 234.32, 239.18, 268.99, 259.09, 265.65, 207.97, 226.51], '1Y': [98.41, 116.01, 117.34, 121.13, 105.99, 122.73, 134, 163.96, 164.44, 149.38, 144.91, 148.87, 131.41, 137.2, 171.52, 173.16, 160.34, 141.88, 164.01, 180.92, 157.98, 134.13, 150.19, 143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 97.3, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.23, 214.6, 234.32, 239.18, 268.99, 259.09, 265.65, 207.97, 226.51] },
      velocityScore: { '1D': 1.1, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$42B', pe: 90.2, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: 1.07, ARTY: 1.19, BAI: 2.08, IGPT: false, IVES: false, ALAI: false, CHAT: 1.85, AIFD: false, SPRX: 3.04, AOTG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, avgWeight: 3.03, proScore: 1.21, coverage: 0.4,
      price: 305.65, weeklyPrices: [289.56, 291.67, 304.50, 301.16, 305.65], weeklyChange: 5.56, dayChange: 1.47, sortRank: 0, periodReturns: { '1M': -4, 'YTD': 88.7, '6M': 67.5, '1Y': 134.8 },
      priceHistory: { '1D': [301.22, 306.45, 305.65], '1W': [289.56, 291.67, 304.5, 301.16, 305.65], '1M': [318.32, 316.43, 325.57, 303.95, 306.97, 334.82, 311.42, 300.53, 318.47, 305.58, 323.92, 318.86, 305.87, 303.58, 304.57, 294.11, 289.56, 291.67, 304.5, 301.16, 305.65], 'YTD': [162.01, 163.58, 176.93, 189.21, 190.15, 248.51, 243.06, 254.89, 241.78, 264.74, 270.89, 250.58, 287.64, 294.13, 323.46, 328.31, 367.92, 322.63, 319.78, 323.92, 297.88, 357.96, 306.97, 317.81, 304.57, 305.65], '6M': [182.49, 186.18, 195.58, 234.53, 245.42, 257.75, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 322.43, 330.97, 367.92, 339.73, 323.91, 334.49, 289.52, 299.6, 316.43, 311.42, 323.92, 294.11, 305.65], '1Y': [130.19, 144.17, 139.75, 137.4, 127.54, 129.31, 125.7, 136.74, 136.83, 141.62, 161.59, 167.38, 180.51, 171.59, 199.27, 190.71, 173.37, 170.65, 172.02, 182.54, 181.82, 149.83, 166.87, 175.61, 163.58, 176.93, 181.23, 190.01, 202, 243.53, 253.15, 244.44, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 322.63, 319.78, 331.44, 289.52, 299.6, 316.43, 311.42, 323.92, 294.11, 305.65] },
      velocityScore: { '1D': -0.8, '1W': 0, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$117B', pe: 76.8, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.87, ARTY: false, BAI: 1.95, IGPT: false, IVES: false, ALAI: false, CHAT: 2.23, AIFD: 4.06, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 4, avgWeight: 2.77, proScore: 1.11, coverage: 0.4,
      price: 101.31, weeklyPrices: [95.04, 97.06, 105.45, 102.62, 101.31], weeklyChange: 6.59, dayChange: -1.28, sortRank: 0, periodReturns: { '1M': -23.4, 'YTD': 174.5, '6M': 124.8, '1Y': 331.3 },
      priceHistory: { '1D': [102.62, 101.39, 101.31], '1W': [95.04, 97.06, 105.45, 102.62, 101.31], '1M': [132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.2, 110.39, 112.54, 109.84, 103.12, 107.76, 102.99, 96.98, 95.04, 97.06, 105.45, 102.62, 101.31], 'YTD': [36.9, 45.55, 46.96, 43.93, 49.25, 48.29, 44.62, 45.61, 43.42, 45.76, 44.06, 44.13, 61.72, 68.5, 82.54, 99.62, 129.44, 110.8, 121.77, 111.78, 116.96, 140.94, 131.72, 110.24, 102.99, 101.31], '6M': [45.07, 46.47, 50.59, 46.79, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.99, 95.78, 129.44, 108.17, 123.52, 107.93, 107.92, 117.05, 131.65, 127.02, 112.54, 96.98, 101.31], '1Y': [23.49, 20.34, 20.41, 22.22, 23.54, 24.85, 24.61, 24.77, 24.9, 31.22, 35.94, 37.43, 37.15, 36.92, 41.34, 38.38, 37.89, 35.11, 36.81, 40.5, 40.78, 36.05, 36.16, 39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 46.12, 43.1, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 121.77, 112.71, 107.92, 117.05, 131.65, 127.02, 112.54, 96.98, 101.31] },
      velocityScore: { '1D': -1.8, '1W': 2.8, '1M': -14, '6M': null }, isNew: false,
      marketCap: '$509B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.15, ARTY: false, BAI: 2.78, IGPT: 4.16, IVES: false, ALAI: false, CHAT: 0.98, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks Inc', easyScore: 4, avgWeight: 2.7, proScore: 1.08, coverage: 0.4,
      price: 329.75, weeklyPrices: [358.68, 348.66, 342.15, 335.28, 329.75], weeklyChange: -8.07, dayChange: -1.65, sortRank: 0, periodReturns: { '1M': 13.3, 'YTD': 79, '6M': 83, '1Y': 65.5 },
      priceHistory: { '1D': [335.28, 329.8, 329.75], '1W': [358.68, 348.66, 342.15, 335.28, 329.75], '1M': [290.92, 285.26, 293.09, 304.2, 332, 341.02, 352.04, 348.06, 357.53, 337.04, 338.31, 325.91, 330.3, 352.89, 354.02, 353.99, 358.68, 348.66, 342.15, 335.28, 329.75], 'YTD': [184.2, 189.02, 187.66, 183.5, 166.24, 165.3, 150.99, 148.92, 165.05, 167.45, 157.21, 160.32, 166.99, 166.97, 178.54, 181.08, 213.66, 240.13, 248.47, 279.25, 279.53, 286.4, 332, 320.59, 354.02, 329.75], '6M': [180.18, 176.97, 159.32, 166.95, 144.14, 150.15, 165.1, 167.45, 164.05, 154.35, 169.87, 161.59, 174.96, 182.9, 184.56, 213.66, 247.55, 256.75, 297.18, 260.52, 279.9, 285.26, 352.04, 338.31, 353.99, 329.75], '1Y': [199.22, 183.03, 172.89, 176.86, 184.43, 187.61, 192.35, 197.33, 203.12, 200.7, 206.8, 217.79, 206.7, 212.42, 217.16, 213.18, 210.04, 199.9, 185.35, 195.68, 192.96, 183.44, 187.22, 179.37, 189.02, 187.66, 184.22, 175.42, 166, 163.5, 141.67, 156.09, 165.1, 167.45, 164.05, 154.35, 169.87, 161.59, 174.96, 180.99, 183.98, 215.6, 240.13, 248.47, 280.43, 260.52, 279.9, 285.26, 352.04, 338.31, 353.99, 329.75] },
      velocityScore: { '1D': -6.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$269B', pe: 289.3, revenueGrowth: 31, eps: 1.14, grossMargin: 72, dividendYield: null,
      etfPresence: { AIS: 0.53, ARTY: false, BAI: false, IGPT: false, IVES: 3.47, ALAI: 0.09, CHAT: false, AIFD: 6.69, SPRX: false, AOTG: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, avgWeight: 2.64, proScore: 1.06, coverage: 0.4,
      price: 923.43, weeklyPrices: [787.66, 802.45, 891.83, 908.10, 923.43], weeklyChange: 17.24, dayChange: 1.69, sortRank: 0, periodReturns: { '1M': -11.1, 'YTD': 235.3, '6M': 166.8, '1Y': 504.5 },
      priceHistory: { '1D': [908.1, 922.93, 923.43], '1W': [787.66, 802.45, 891.83, 908.1, 923.43], '1M': [1038.59, 993.25, 1025.36, 899.9, 968.53, 965, 915.19, 820.16, 868.26, 827.64, 890.09, 910.34, 860.66, 878.31, 828.3, 745.49, 787.66, 802.45, 891.83, 908.1, 923.43], 'YTD': [275.39, 304.01, 326.23, 371.76, 444.45, 407.25, 408.97, 407.84, 352.8, 398.78, 424.96, 391.76, 500.77, 531.81, 586.25, 726.93, 834.01, 733.35, 870.66, 925.99, 868.09, 1094.04, 968.53, 860.02, 828.3, 923.43], '6M': [346.1, 407.69, 429.32, 425.99, 407.4, 379.52, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 595.86, 738.54, 834.01, 740.84, 845.76, 926.61, 846.01, 1031.34, 993.25, 915.19, 890.09, 745.49, 923.43], '1Y': [152.76, 147.42, 147.27, 156.92, 158.4, 167.24, 183.98, 193.04, 213.36, 223.7, 256.84, 224.35, 219.38, 215.05, 265.62, 275.77, 283.26, 259.14, 272.28, 265.63, 298.92, 277.65, 285.27, 287.54, 304.01, 326.23, 358.29, 432.95, 425, 415.94, 396.02, 357.62, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 579.03, 771.01, 808.8, 733.35, 870.66, 940.69, 846.01, 1031.34, 993.25, 915.19, 890.09, 745.49, 923.43] },
      velocityScore: { '1D': 1.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 87.7, revenueGrowth: 44, eps: 10.53, grossMargin: 42, dividendYield: 0.33,
      etfPresence: { AIS: 2.58, ARTY: 2.89, BAI: false, IGPT: 3.14, IVES: false, ALAI: 1.95, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'CRWV', name: 'COREWEAVE INC CLASS A', easyScore: 4, avgWeight: 2.48, proScore: 0.99, coverage: 0.4,
      price: 82.39, weeklyPrices: [73.21, 73.06, 79.58, 82.64, 82.39], weeklyChange: 12.53, dayChange: -0.31, sortRank: 0, periodReturns: { '1M': -22.1, 'YTD': 15, '6M': -11.4, '1Y': -34.6 },
      priceHistory: { '1D': [82.64, 82.64, 82.39], '1W': [73.21, 73.06, 79.58, 82.64, 82.39], '1M': [105.72, 100.88, 98.76, 96.58, 95.51, 99.54, 85.68, 81.75, 86.46, 83.53, 89.7, 88.88, 83.31, 79.94, 77.12, 72.91, 73.21, 73.06, 79.58, 82.64, 82.39], 'YTD': [71.61, 80.14, 101.23, 108.86, 90.06, 95.15, 97.14, 79.56, 72.99, 85.86, 83.02, 77.47, 92, 119.56, 110.14, 119.01, 114.7, 99.81, 104.27, 108.03, 95.74, 111.29, 95.51, 90, 77.12, 82.39], '6M': [92.98, 93.19, 89.95, 96.04, 90.84, 78.05, 74.41, 85.86, 81.96, 69.15, 85.24, 117.2, 115.16, 112.06, 125.43, 114.7, 103.77, 105.89, 119.27, 98.45, 117.03, 100.88, 85.68, 89.7, 72.91, 82.39], '1Y': [126.05, 102.89, 110.24, 117.76, 91.52, 96.93, 87.48, 117.14, 120.86, 133.4, 137.05, 139.98, 139.24, 121.53, 139.93, 114.42, 85.43, 74.92, 74.29, 85.75, 88.16, 64.55, 78.87, 79.32, 80.14, 101.23, 98.31, 88.94, 96.79, 91, 99.3, 73.78, 74.41, 85.86, 81.96, 69.15, 85.24, 117.2, 115.16, 105.53, 127.89, 107.75, 99.81, 104.27, 110.93, 98.45, 117.03, 100.88, 85.68, 89.7, 72.91, 82.39] },
      velocityScore: { '1D': 5.3, '1W': null, '1M': -9.2, '6M': null }, isNew: false,
      marketCap: '$45B', pe: null, revenueGrowth: 112, eps: -2.72, grossMargin: 69, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 3.89, BAI: 1.15, IGPT: false, IVES: 2.1, ALAI: false, CHAT: 2.79, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'COREWEAVE INC CLASS A appears in 4 of 10 AI & ML ETFs (40% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 4.79, proScore: 4.79, coverage: 1,
      price: 974.72, weeklyPrices: [848.95, 865.46, 970.82, 959.48, 974.72], weeklyChange: 14.81, dayChange: 1.59, sortRank: 0, periodReturns: { '1M': -7.3, 'YTD': 241.5, '6M': 143.9, '1Y': 787.5 },
      priceHistory: { '1D': [959.48, 975.05, 974.72], '1W': [848.95, 865.46, 970.82, 959.48, 974.72], '1M': [1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 991.64, 979.3, 937, 983.12, 904.28, 853.2, 848.95, 865.46, 970.82, 959.48, 974.72], 'YTD': [285.41, 345.09, 362.75, 410.24, 419.44, 410.34, 417.35, 412.37, 370.3, 441.8, 395.53, 337.84, 421.51, 457.23, 496.72, 542.21, 795.33, 698.74, 928.41, 996, 995.87, 1211.38, 1145.28, 948.8, 904.28, 974.72], '6M': [399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1032.28, 991.64, 853.2, 974.72], '1Y': [109.83, 114.74, 108.78, 124.27, 117.21, 117.75, 124.21, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 198.47, 226.63, 237.5, 244.9, 225.92, 230.26, 226.65, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 935.89, 1020.76, 1048.51, 1032.28, 991.64, 853.2, 974.72] },
      velocityScore: { '1D': -1.6, '1W': 6, '1M': -15.2, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 22, revenueGrowth: 346, eps: 44.23, grossMargin: 73, dividendYield: 0.06,
      etfPresence: { SOXX: 8.19, PSI: 5.66, XSD: 2.67, DRAM: 2.63 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.9, proScore: 4.42, coverage: 0.75,
      price: 547.81, weeklyPrices: [495.76, 503.57, 544.43, 552.33, 547.81], weeklyChange: 10.5, dayChange: -0.82, sortRank: 0, periodReturns: { '1M': 5.4, 'YTD': 155.8, '6M': 111, '1Y': 245.3 },
      priceHistory: { '1D': [552.33, 547.3, 547.81], '1W': [495.76, 503.57, 544.43, 552.33, 547.81], '1M': [519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 546.72, 557.89, 534.39, 548.13, 529.14, 500.94, 495.76, 503.57, 544.43, 552.33, 547.81], 'YTD': [214.16, 203.17, 231.83, 252.03, 242.11, 213.58, 203.37, 200.21, 192.43, 196.58, 205.37, 203.43, 236.64, 278.26, 347.81, 360.54, 458.79, 414.05, 495.54, 523.2, 488.45, 551.63, 539.49, 517.41, 529.14, 547.81], '6M': [259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 334.63, 341.54, 458.79, 420.99, 503.89, 521.54, 475.51, 507.29, 519.74, 540.88, 546.72, 500.94, 547.81], '1Y': [158.65, 179.51, 163.12, 184.42, 165.2, 167.13, 161.79, 159.54, 159.16, 160.88, 164.01, 235.56, 238.6, 230.23, 264.33, 256.33, 258.89, 223.55, 214.24, 215.98, 221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 475.51, 507.29, 519.74, 540.88, 546.72, 500.94, 547.81] },
      velocityScore: { '1D': 1.4, '1W': 4.5, '1M': 19.5, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 183.8, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 8.87, PSI: 5.8, XSD: 3.03, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 5.39, proScore: 4.04, coverage: 0.75,
      price: 209.08, weeklyPrices: [202.81, 203.28, 207.29, 212.06, 209.08], weeklyChange: 3.09, dayChange: -1.41, sortRank: 0, periodReturns: { '1M': 4.5, 'YTD': 12.1, '6M': 11.4, '1Y': 22.4 },
      priceHistory: { '1D': [212.06, 209.1, 209.08], '1W': [202.81, 203.28, 207.29, 212.06, 209.08], '1M': [200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 196.93, 202.78, 210.96, 203.53, 211.8, 212.5, 207.4, 202.81, 203.28, 207.29, 212.06, 209.08], 'YTD': [186.5, 184.86, 186.23, 188.52, 180.34, 190.05, 187.9, 177.19, 177.82, 183.22, 175.2, 174.4, 183.91, 198.35, 208.27, 198.45, 219.44, 220.61, 212.6, 218.66, 204.87, 208.65, 194.97, 204.12, 212.5, 209.08], '6M': [187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 216.61, 198.48, 219.44, 222.32, 214.86, 222.82, 208.19, 207.41, 199, 197.58, 202.78, 207.4, 209.08], '1Y': [170.78, 179.27, 179.42, 181.59, 175.4, 181.6, 171.66, 177.33, 170.29, 176.97, 187.24, 189.11, 179.83, 180.28, 207.04, 195.21, 193.8, 186.52, 180.26, 183.38, 183.78, 170.94, 188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 214.75, 208.19, 207.41, 199, 197.58, 202.78, 207.4, 209.08] },
      velocityScore: { '1D': 2.3, '1W': 0, '1M': 21.3, '6M': null }, isNew: false,
      marketCap: '$5.1T', pe: 32, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { SOXX: 8.33, PSI: 5.22, XSD: 2.61, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.05, proScore: 3.03, coverage: 0.75,
      price: 101.31, weeklyPrices: [95.04, 97.06, 105.45, 102.62, 101.31], weeklyChange: 6.59, dayChange: -1.28, sortRank: 0, periodReturns: { '1M': -23.4, 'YTD': 174.5, '6M': 124.8, '1Y': 331.3 },
      priceHistory: { '1D': [102.62, 101.39, 101.31], '1W': [95.04, 97.06, 105.45, 102.62, 101.31], '1M': [132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.2, 110.39, 112.54, 109.84, 103.12, 107.76, 102.99, 96.98, 95.04, 97.06, 105.45, 102.62, 101.31], 'YTD': [36.9, 45.55, 46.96, 43.93, 49.25, 48.29, 44.62, 45.61, 43.42, 45.76, 44.06, 44.13, 61.72, 68.5, 82.54, 99.62, 129.44, 110.8, 121.77, 111.78, 116.96, 140.94, 131.72, 110.24, 102.99, 101.31], '6M': [45.07, 46.47, 50.59, 46.79, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.99, 95.78, 129.44, 108.17, 123.52, 107.93, 107.92, 117.05, 131.65, 127.02, 112.54, 96.98, 101.31], '1Y': [23.49, 20.34, 20.41, 22.22, 23.54, 24.85, 24.61, 24.77, 24.9, 31.22, 35.94, 37.43, 37.15, 36.92, 41.34, 38.38, 37.89, 35.11, 36.81, 40.5, 40.78, 36.05, 36.16, 39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 46.12, 43.1, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 121.77, 112.71, 107.92, 117.05, 131.65, 127.02, 112.54, 96.98, 101.31] },
      velocityScore: { '1D': -2.9, '1W': -0.3, '1M': -12.9, '6M': null }, isNew: false,
      marketCap: '$509B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 5.37, PSI: 4.39, XSD: 2.38, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.72, proScore: 2.79, coverage: 0.75,
      price: 379.88, weeklyPrices: [375.36, 372.46, 382.81, 386.73, 379.88], weeklyChange: 1.2, dayChange: -1.77, sortRank: 0, periodReturns: { '1M': -6.7, 'YTD': 40.1, '6M': 24.3, '1Y': 66.6 },
      priceHistory: { '1D': [386.73, 379.88, 379.88], '1W': [375.36, 372.46, 382.81, 386.73, 379.88], '1M': [407.26, 413.16, 417.93, 386.91, 391.78, 397.17, 388.98, 377.16, 388.83, 379.03, 393.64, 395.65, 386.01, 392.75, 390.96, 380.53, 375.36, 372.46, 382.81, 386.73, 379.88], 'YTD': [271.2, 300.93, 300.25, 303.83, 311.29, 337, 345.3, 355.79, 315.81, 310.92, 321.83, 318.14, 351.36, 353.8, 399.57, 397.69, 422.73, 414.31, 416.88, 428.76, 412.13, 445.48, 391.78, 385.4, 390.96, 379.88], '6M': [305.6, 310.88, 320.45, 337.1, 355.15, 352.41, 319.71, 310.92, 312.19, 303.1, 327.41, 348.6, 375.27, 392.59, 397.02, 422.73, 418.58, 419.94, 423.2, 404.62, 416, 413.16, 388.98, 393.64, 380.53, 379.88], '1Y': [228.08, 231.11, 220.69, 237.63, 244.87, 255.5, 246.11, 247.21, 246.32, 248.61, 239.28, 237.93, 238.15, 240.36, 235.04, 236, 241.44, 232.2, 257.92, 277.26, 281.57, 271.04, 277.56, 273.74, 300.93, 300.25, 304.01, 316.86, 322.97, 337.51, 356.09, 338.99, 319.71, 310.92, 312.19, 303.1, 327.41, 348.6, 375.27, 383.26, 404.77, 419.65, 414.31, 416.88, 437.67, 404.62, 416, 413.16, 388.98, 393.64, 380.53, 379.88] },
      velocityScore: { '1D': 1.1, '1W': -1.1, '1M': 4.1, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 55.8, revenueGrowth: 37, eps: 6.81, grossMargin: 64, dividendYield: 1.14,
      etfPresence: { SOXX: 3.87, PSI: 4.87, XSD: 2.43, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 5.77, proScore: 2.88, coverage: 0.5,
      price: 555.61, weeklyPrices: [529.66, 525.70, 564.55, 553.92, 555.61], weeklyChange: 4.9, dayChange: 0.3, sortRank: 0, periodReturns: { '1M': -5.2, 'YTD': 116.2, '6M': 72.3, '1Y': 197.1 },
      priceHistory: { '1D': [553.92, 555.12, 555.61], '1W': [529.66, 525.7, 564.55, 553.92, 555.61], '1M': [585.88, 588.97, 668, 626.84, 694.64, 723, 650.91, 603.04, 592.79, 554.5, 588.66, 602.5, 575.39, 595.7, 579.43, 560.93, 529.66, 525.7, 564.55, 553.92, 555.61], 'YTD': [256.99, 301.18, 327.01, 332.71, 318.67, 339.88, 369.83, 372.3, 324.74, 346.18, 373.99, 341.79, 397.81, 389.9, 417.04, 389.08, 443.62, 406.91, 448.25, 501.7, 552.64, 640.18, 694.64, 570.5, 579.43, 555.61], '6M': [322.38, 322.32, 322.51, 354.91, 373.55, 372.18, 338.94, 346.18, 361.79, 323.12, 354.31, 395.64, 394.33, 404.86, 391.38, 443.62, 413.57, 454.89, 490.05, 499.21, 568.23, 588.97, 650.91, 588.66, 560.93, 555.61], '1Y': [187.01, 189.39, 178.14, 190.03, 160.96, 164.39, 158.24, 163.42, 178.13, 201.44, 217.74, 217.51, 227.58, 220.56, 235.75, 240.89, 230.73, 235.13, 249.97, 269.44, 275.15, 248.27, 260.78, 268.87, 301.18, 327.01, 319.46, 328.4, 330.57, 359.13, 377.93, 351.32, 338.94, 346.18, 361.79, 323.12, 354.31, 395.64, 394.33, 381.11, 410.82, 431.2, 406.91, 448.25, 500.77, 499.21, 568.23, 588.97, 650.91, 588.66, 560.93, 555.61] },
      velocityScore: { '1D': -1.7, '1W': -4.3, '1M': 2.9, '6M': null }, isNew: false,
      marketCap: '$441B', pe: 52.2, revenueGrowth: 11, eps: 10.64, grossMargin: 49, dividendYield: 0.38,
      etfPresence: { SOXX: 5.1, PSI: 6.44, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 5.13, proScore: 2.57, coverage: 0.5,
      price: 216.09, weeklyPrices: [212.75, 207.60, 217.56, 214.69, 216.09], weeklyChange: 1.57, dayChange: 0.65, sortRank: 0, periodReturns: { '1M': -11.6, 'YTD': 77.8, '6M': 42.8, '1Y': 140.9 },
      priceHistory: { '1D': [214.69, 216.5, 216.09], '1W': [212.75, 207.6, 217.56, 214.69, 216.09], '1M': [244.49, 240.48, 258.8, 248.64, 278.39, 301.71, 266.19, 235.55, 233.31, 216.47, 229.52, 231.52, 222.25, 230.37, 224.5, 219.37, 212.75, 207.6, 217.56, 214.69, 216.09], 'YTD': [121.51, 140, 156.78, 161.63, 135.55, 147.95, 146.99, 152.46, 134.46, 143.82, 156.62, 147.24, 172.73, 173.49, 193.5, 172.63, 184.52, 174.06, 195.72, 213.11, 241.16, 269.16, 278.39, 221.18, 224.5, 216.09], '6M': [151.28, 142.79, 144.29, 146.41, 148.77, 153.49, 142.91, 143.82, 151.14, 138.26, 154.88, 179.59, 178.54, 190, 171.33, 184.52, 175.65, 201.14, 204.52, 213.94, 237.33, 240.48, 266.19, 229.52, 219.37, 216.09], '1Y': [89.71, 92.5, 88.83, 94.95, 87.84, 88.89, 87.33, 93.26, 98.99, 106.87, 112.89, 106.26, 108.7, 111.43, 123.53, 122.71, 119.9, 116.75, 115.91, 120.81, 123.89, 117.2, 127.7, 127.45, 140, 156.78, 154.3, 141.04, 144.02, 147.02, 150.66, 144.13, 142.91, 143.82, 151.14, 138.26, 154.88, 179.59, 178.54, 180.9, 173.29, 181.13, 174.06, 195.72, 212.51, 213.94, 237.33, 240.48, 266.19, 229.52, 219.37, 216.09] },
      velocityScore: { '1D': -1.2, '1W': -4.1, '1M': -4.8, '6M': null }, isNew: false,
      marketCap: '$282B', pe: 61.4, revenueGrowth: 12, eps: 3.52, grossMargin: 61, dividendYield: 0.43,
      etfPresence: { SOXX: 4.63, PSI: 5.64, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 5, proScore: 2.5, coverage: 0.5,
      price: 393.27, weeklyPrices: [370.83, 378.16, 386.50, 396.81, 393.27], weeklyChange: 6.05, dayChange: -0.89, sortRank: 0, periodReturns: { '1M': 3.5, 'YTD': 13.6, '6M': 22.9, '1Y': 38.6 },
      priceHistory: { '1D': [396.81, 393.76, 393.27], '1W': [370.83, 378.16, 386.5, 396.81, 393.27], '1M': [380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 370.78, 401.11, 399.97, 384.05, 389.11, 394.28, 374.45, 370.83, 378.16, 386.5, 396.81, 393.27], 'YTD': [346.1, 344.97, 351.71, 332.79, 320.33, 342.76, 333.99, 319.55, 330.48, 324.92, 318.29, 309.51, 354.91, 398.47, 422.76, 421.28, 428.43, 411.07, 421.86, 418.91, 385.57, 392.13, 372.45, 388.69, 394.28, 393.27], '6M': [320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 418.2, 416.5, 428.43, 420.71, 422.01, 481.57, 392.16, 376.71, 382.07, 369.34, 401.11, 374.45, 393.27], '1Y': [283.69, 302.62, 301.67, 309.09, 291.17, 300.25, 306.1, 369.57, 346.17, 339.31, 333.39, 345.5, 351.33, 340.3, 385.98, 358.98, 355.22, 354.42, 397.57, 381.03, 412.97, 326.02, 350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 479.23, 392.16, 376.71, 382.07, 369.34, 401.11, 374.45, 393.27] },
      velocityScore: { '1D': 2.5, '1W': 0.8, '1M': 20.8, '6M': null }, isNew: false,
      marketCap: '$1.9T', pe: 65.7, revenueGrowth: 48, eps: 5.99, grossMargin: 76, dividendYield: 0.66,
      etfPresence: { SOXX: 7.36, PSI: false, XSD: 2.63, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 4.7, proScore: 2.35, coverage: 0.5,
      price: 318.76, weeklyPrices: [313.30, 306.76, 322.00, 319.29, 318.76], weeklyChange: 1.74, dayChange: -0.17, sortRank: 0, periodReturns: { '1M': -14.2, 'YTD': 86.2, '6M': 46.3, '1Y': 228.3 },
      priceHistory: { '1D': [319.29, 318.62, 318.76], '1W': [313.3, 306.76, 322, 319.29, 318.76], '1M': [371.33, 374.8, 401.82, 379.09, 410.91, 433.33, 391.26, 351.41, 350.2, 326.13, 353.17, 350.33, 329.92, 346.1, 335.43, 320.96, 313.3, 306.76, 322, 319.29, 318.76], 'YTD': [171.18, 218.36, 222.96, 238.46, 230.1, 235.12, 237.39, 233.89, 199.33, 219.4, 238.84, 213.66, 258.76, 260.96, 267.78, 256.72, 296.05, 273.38, 318.93, 336.41, 362.52, 409.54, 410.91, 333.15, 335.43, 318.76], '6M': [217.94, 233.46, 231.01, 235.53, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 259.47, 258.57, 296.05, 277.96, 322.68, 334.41, 327.16, 369.34, 374.8, 391.26, 353.17, 320.96, 318.76], '1Y': [97.1, 99.09, 95.94, 106.74, 99.15, 103.67, 100.42, 107.36, 121.9, 128.32, 142.79, 142.54, 144.78, 141.25, 160.67, 165.05, 161.42, 148.8, 155.14, 157.09, 168.26, 154.98, 177.33, 185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.58, 244.25, 217.27, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 273.38, 318.93, 343.71, 327.16, 369.34, 374.8, 391.26, 353.17, 320.96, 318.76] },
      velocityScore: { '1D': -0.4, '1W': -4.5, '1M': -6.7, '6M': null }, isNew: false,
      marketCap: '$399B', pe: 60.1, revenueGrowth: 24, eps: 5.3, grossMargin: 50, dividendYield: 0.33,
      etfPresence: { SOXX: 4.16, PSI: 5.23, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 3.28, proScore: 1.64, coverage: 0.5,
      price: 286.53, weeklyPrices: [284.02, 284.07, 291.30, 294.19, 286.53], weeklyChange: 0.88, dayChange: -2.6, sortRank: 0, periodReturns: { '1M': -5.9, 'YTD': 65.2, '6M': 48.2, '1Y': 53.8 },
      priceHistory: { '1D': [294.19, 287.23, 286.53], '1W': [284.02, 284.07, 291.3, 294.19, 286.53], '1M': [304.36, 303.11, 311.81, 285.43, 285.48, 298.07, 298.41, 293.08, 303.5, 293.3, 308.53, 311.46, 298.57, 305.55, 301.19, 291.22, 284.02, 284.07, 291.3, 294.19, 286.53], 'YTD': [173.49, 190.31, 191.58, 196.63, 225.21, 226.56, 218.05, 212.11, 193.23, 194.13, 194.63, 194.14, 214.98, 223.1, 277.14, 281.02, 297.76, 302.31, 317.45, 305.37, 297.1, 332.28, 285.48, 301.32, 301.19, 286.53], '6M': [193.31, 215.55, 221.44, 226.16, 219.86, 209.82, 196.2, 194.13, 188.63, 186.42, 199.74, 218.87, 233.15, 269.5, 280.89, 297.76, 300.6, 324.89, 308.12, 288.63, 305.71, 303.11, 298.41, 308.53, 291.22, 286.53], '1Y': [186.25, 189.52, 185.91, 193.29, 200.77, 205.47, 187.29, 184.01, 180.3, 184.44, 180.39, 181.6, 175.27, 170.71, 160.26, 163.57, 163.09, 157.09, 165.35, 180.12, 181.67, 174.49, 177.13, 177.52, 190.31, 191.58, 196.59, 225.01, 218.77, 225.69, 213.35, 202.67, 196.2, 194.13, 188.63, 186.42, 199.74, 218.87, 233.15, 265, 281, 295.17, 302.31, 317.45, 308.59, 288.63, 305.71, 303.11, 298.41, 308.53, 291.22, 286.53] },
      velocityScore: { '1D': 0.6, '1W': -1.8, '1M': 5.8, '6M': null }, isNew: false,
      marketCap: '$261B', pe: 49, revenueGrowth: 19, eps: 5.85, grossMargin: 57, dividendYield: 1.93,
      etfPresence: { SOXX: 3.99, PSI: false, XSD: 2.58, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 3.17, proScore: 1.59, coverage: 0.5,
      price: 210.01, weeklyPrices: [188.68, 194.94, 207.96, 210.99, 210.01], weeklyChange: 11.3, dayChange: -0.46, sortRank: 0, periodReturns: { '1M': -24.7, 'YTD': 147.1, '6M': 161.8, '1Y': 186.6 },
      priceHistory: { '1D': [210.99, 210.07, 210.01], '1W': [188.68, 194.94, 207.96, 210.99, 210.01], '1M': [279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 245.29, 249.27, 230.7, 243.27, 235.81, 217.53, 222.44, 206.26, 188.3, 188.68, 194.94, 207.96, 210.99, 210.01], 'YTD': [84.98, 83.22, 80.46, 82.93, 75.54, 81.34, 79.61, 81.69, 89.57, 91.58, 92.36, 99.05, 119.93, 133.37, 164.31, 164.95, 170.84, 176.27, 198.7, 316.43, 280.71, 307.86, 277.75, 231.71, 206.26, 210.01], '6M': [80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 158.21, 163.66, 170.84, 168.93, 208.26, 290.79, 266.88, 278.67, 276.7, 272.05, 243.27, 188.3, 210.01], '1Y': [73.27, 81.74, 75.32, 79.32, 71.22, 74.79, 64.1, 67.1, 70.98, 80.09, 83.89, 92.5, 88.89, 81.05, 90.15, 92.9, 89.33, 81.32, 87.72, 98.19, 92.47, 81.7, 86.49, 89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 77.51, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 198.7, 301.65, 266.88, 278.67, 276.7, 272.05, 243.27, 188.3, 210.01] },
      velocityScore: { '1D': 1.3, '1W': 3.2, '1M': -18, '6M': null }, isNew: false,
      marketCap: '$188B', pe: 71.2, revenueGrowth: 28, eps: 2.95, grossMargin: 52, dividendYield: 0.11,
      etfPresence: { SOXX: 4.27, PSI: false, XSD: 2.07, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 3.01, proScore: 1.5, coverage: 0.5,
      price: 274.15, weeklyPrices: [266.53, 267.18, 273.15, 278.80, 274.15], weeklyChange: 2.86, dayChange: -1.67, sortRank: 0, periodReturns: { '1M': -8.6, 'YTD': 26.3, '6M': 17.9, '1Y': 22 },
      priceHistory: { '1D': [278.8, 274.02, 274.15], '1W': [266.53, 267.18, 273.15, 278.8, 274.15], '1M': [299.94, 294.06, 298.64, 277.02, 278.37, 281.03, 279.18, 273.36, 280.51, 273.15, 290.54, 292.26, 278.39, 283.87, 279.01, 270.66, 266.53, 267.18, 273.15, 278.8, 274.15], 'YTD': [217.06, 241.15, 237.11, 229.42, 220.66, 249.75, 232.11, 227.01, 201.74, 191.89, 196.4, 196.86, 205.67, 213.73, 244.04, 295.24, 305.99, 294.28, 329.24, 322.22, 302.55, 323.24, 278.37, 283.81, 279.01, 274.15], '6M': [232.48, 226.14, 224.32, 244.43, 231.16, 224.76, 205.25, 191.89, 193.39, 187.39, 195.12, 209.89, 224.5, 236.87, 290.76, 305.99, 291.68, 332.67, 323.62, 297.41, 302.89, 294.06, 279.18, 290.54, 270.66, 274.15], '1Y': [224.71, 220.94, 205.92, 230.52, 228.77, 237.67, 225.39, 219.28, 221.89, 227.66, 224.91, 225.64, 217.23, 217.16, 204.71, 210.44, 204.08, 190.06, 193.76, 226.16, 230.78, 223.23, 225.26, 221.28, 241.15, 237.11, 231.05, 231.08, 228.91, 245.09, 234.63, 215.25, 205.25, 191.89, 193.39, 187.39, 195.12, 209.89, 224.5, 230.39, 292.35, 294.23, 294.28, 329.24, 321.88, 297.41, 302.89, 294.06, 279.18, 290.54, 270.66, 274.15] },
      velocityScore: { '1D': 1.4, '1W': 0, '1M': 3.4, '6M': null }, isNew: false,
      marketCap: '$69B', pe: 26.2, revenueGrowth: 12, eps: 10.46, grossMargin: 56, dividendYield: 1.45,
      etfPresence: { SOXX: 3.6, PSI: false, XSD: 2.41, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.88, proScore: 1.44, coverage: 0.5,
      price: 1399.32, weeklyPrices: [1312.00, 1328.80, 1383.26, 1398.45, 1399.32], weeklyChange: 6.66, dayChange: 0.06, sortRank: 0, periodReturns: { '1M': -1.7, 'YTD': 54.4, '6M': 31.5, '1Y': 94.3 },
      priceHistory: { '1D': [1398.45, 1392.31, 1399.32], '1W': [1312, 1328.8, 1383.26, 1398.45, 1399.32], '1M': [1423.76, 1434.95, 1438.3, 1313.32, 1312.77, 1382.36, 1331.73, 1288.16, 1346.13, 1272.81, 1374.13, 1352.74, 1291.38, 1376.41, 1352.66, 1305.65, 1312, 1328.8, 1383.26, 1398.45, 1399.32], 'YTD': [906.36, 958.97, 1033.17, 1095.49, 1164.83, 1196.73, 1175.22, 1142.74, 1023.16, 1077.4, 1101.59, 1093.35, 1334.21, 1402.81, 1632.06, 1583.48, 1661.1, 1468.11, 1620.17, 1652.6, 1589.55, 1537.88, 1312.77, 1315.51, 1352.66, 1399.32], '6M': [1063.74, 1124.15, 1229.82, 1171.47, 1190.06, 1142.58, 1062, 1077.4, 1076.35, 1002.34, 1191.22, 1363.42, 1527.95, 1587.57, 1573.3, 1661.1, 1486.33, 1662.98, 1624.99, 1531.98, 1498.77, 1434.95, 1331.73, 1374.13, 1305.65, 1399.32], '1Y': [720.01, 730.54, 805.85, 861.8, 826.27, 866.32, 848.11, 855.18, 877.66, 908.45, 915.87, 980.9, 1007.93, 1001.4, 1094.08, 1000.15, 958.35, 884.65, 924.95, 952.74, 979.02, 912.25, 953.25, 936.31, 958.97, 1033.17, 1068.14, 1173.22, 1206.18, 1173.18, 1213.67, 1074.37, 1062, 1077.4, 1076.35, 1002.34, 1191.22, 1363.42, 1527.95, 1504.08, 1588.12, 1599.52, 1468.11, 1620.17, 1689.89, 1531.98, 1498.77, 1434.95, 1331.73, 1374.13, 1305.65, 1399.32] },
      velocityScore: { '1D': 0.7, '1W': 3.6, '1M': 9.1, '6M': null }, isNew: false,
      marketCap: '$69B', pe: 100.1, revenueGrowth: 26, eps: 13.98, grossMargin: 55, dividendYield: 0.57,
      etfPresence: { SOXX: 3.42, PSI: false, XSD: 2.35, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.59, proScore: 1.29, coverage: 0.5,
      price: 171.7, weeklyPrices: [171.78, 170.32, 173.50, 175.63, 171.70], weeklyChange: -0.05, dayChange: -2.24, sortRank: 0, periodReturns: { '1M': -15.9, 'YTD': 0.4, '6M': 10.2, '1Y': 7.4 },
      priceHistory: { '1D': [175.63, 171.94, 171.7], '1W': [171.78, 170.32, 173.5, 175.63, 171.7], '1M': [204.13, 197.41, 204.9, 189.39, 188.72, 184.79, 181.92, 176.25, 186.48, 182.97, 191.11, 189.16, 183.98, 178.1, 177.98, 170.61, 171.78, 170.32, 173.5, 175.63, 171.7], 'YTD': [171.05, 177.78, 159.42, 153.04, 147.18, 141.04, 141.27, 142.36, 135.69, 129.39, 128.67, 128.78, 127.75, 134.47, 148.85, 177.01, 237.53, 195.61, 233.4, 242.57, 202.96, 221.9, 188.72, 186.56, 177.98, 171.7], '6M': [155.82, 151.59, 137.34, 140.7, 140.41, 141.03, 138.11, 129.39, 128.35, 127.07, 124.07, 132.84, 135.56, 150.26, 168.38, 237.53, 203.64, 248.82, 240.84, 205.42, 214.07, 197.41, 181.92, 191.11, 170.61, 171.7], '1Y': [159.88, 159.06, 145.84, 156.59, 155.44, 159.77, 159.71, 158.95, 165.26, 173.55, 166.49, 167.77, 162.97, 169.27, 178.67, 179.72, 176.67, 166.11, 165.14, 174.35, 182.21, 172.34, 174.77, 172.98, 177.78, 159.42, 154.52, 152.62, 138.93, 142.63, 144.78, 138.13, 138.11, 129.39, 128.35, 127.07, 124.07, 132.84, 135.56, 150, 186.55, 210.31, 195.61, 233.4, 250.01, 205.42, 214.07, 197.41, 181.92, 191.11, 170.61, 171.7] },
      velocityScore: { '1D': 0.8, '1W': -1.5, '1M': -5.8, '6M': null }, isNew: false,
      marketCap: '$181B', pe: 18.4, revenueGrowth: -4, eps: 9.31, grossMargin: 55, dividendYield: 2.1,
      etfPresence: { SOXX: 2.9, PSI: false, XSD: 2.28, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 2.44, proScore: 1.22, coverage: 0.5,
      price: 331.43, weeklyPrices: [303.62, 309.09, 319.79, 330.89, 331.43], weeklyChange: 9.16, dayChange: 0.16, sortRank: 0, periodReturns: { '1M': -16.5, 'YTD': 99.2, '6M': 95.3, '1Y': 177.4 },
      priceHistory: { '1D': [330.89, 330.89, 331.43], '1W': [303.62, 309.09, 319.79, 330.89, 331.43], '1M': [397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42, 432.74, 382.89, 417.45, 412.97, 362.05, 361.78, 350.62, 319.74, 303.62, 309.09, 319.79, 330.89, 331.43], 'YTD': [166.36, 162.61, 182, 170.93, 158.52, 143.71, 132.62, 118.83, 119.2, 127.48, 121.76, 109.6, 129.46, 170.81, 212.84, 202.68, 207.35, 244.26, 325.33, 358.05, 367.47, 439.66, 455.96, 393.16, 350.62, 331.43], '6M': [169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 196.64, 201.25, 207.35, 215.58, 318.72, 355.76, 341.7, 361.71, 399.92, 430.86, 417.45, 319.74, 331.43], '1Y': [119.48, 128.87, 174.39, 193.64, 172.45, 179.2, 187.95, 230.37, 249.38, 205.27, 194.5, 219.36, 161.46, 154.85, 173.62, 181.94, 157.79, 142.01, 154.22, 152.51, 164.32, 140.24, 169.97, 179.56, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.4, 109.8, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 325.33, 363.54, 341.7, 361.71, 399.92, 430.86, 417.45, 319.74, 331.43] },
      velocityScore: { '1D': 3.4, '1W': -4.7, '1M': -9.6, '6M': null }, isNew: false,
      marketCap: '$57B', pe: 222.4, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.39, PSI: false, XSD: 2.48, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.36, proScore: 1.18, coverage: 0.5,
      price: 82.26, weeklyPrices: [80.96, 80.51, 83.38, 85.02, 82.26], weeklyChange: 1.61, dayChange: -3.25, sortRank: 0, periodReturns: { '1M': -11.8, 'YTD': 29.1, '6M': 10.1, '1Y': 17.1 },
      priceHistory: { '1D': [85.02, 82.18, 82.26], '1W': [80.96, 80.51, 83.38, 85.02, 82.26], '1M': [93.26, 92.48, 94.12, 87.93, 89.06, 91.2, 88.69, 84.64, 87.59, 84.15, 88.26, 88.59, 84.23, 87.11, 86.26, 81.68, 80.96, 80.51, 83.38, 85.02, 82.26], 'YTD': [63.72, 75.22, 74.7, 75.16, 76.66, 80.75, 77.16, 74.64, 64.77, 63.83, 65.63, 64.61, 71.22, 76.87, 89.44, 93.95, 99.03, 91.81, 96.85, 96.3, 92.94, 102.71, 89.06, 85.49, 86.26, 82.26], '6M': [74.71, 75.92, 76.01, 78.56, 76.6, 74.31, 65, 63.83, 64.34, 60.06, 67.51, 74.5, 80.93, 86.84, 95.3, 99.03, 92.76, 98.05, 96.96, 91.47, 95.63, 92.48, 88.69, 88.26, 81.68, 82.26], '1Y': [70.25, 70.29, 66.17, 65.75, 66.76, 66.65, 64.43, 64.74, 65.78, 65.85, 64.11, 66.92, 65.21, 64.5, 62.54, 60.8, 55.63, 50.8, 52.57, 64.72, 67.9, 63.99, 65.36, 65.03, 75.22, 74.7, 74.79, 78.08, 74.41, 78.94, 75.93, 71.39, 65, 63.83, 64.34, 60.06, 67.51, 74.5, 80.93, 84.26, 98.48, 97.7, 91.81, 96.85, 96.55, 91.47, 95.63, 92.48, 88.69, 88.26, 81.68, 82.26] },
      velocityScore: { '1D': 1.7, '1W': -0.8, '1M': -0.8, '6M': null }, isNew: false,
      marketCap: '$45B', pe: 373.9, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 2.14,
      etfPresence: { SOXX: 2.33, PSI: false, XSD: 2.4, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.17, proScore: 1.08, coverage: 0.5,
      price: 226.51, weeklyPrices: [202.68, 212.07, 223.87, 228.27, 226.51], weeklyChange: 11.76, dayChange: -0.77, sortRank: 0, periodReturns: { '1M': -16.7, 'YTD': 57.4, '6M': 70.1, '1Y': 130.2 },
      priceHistory: { '1D': [228.27, 226.89, 226.51], '1W': [202.68, 212.07, 223.87, 228.27, 226.51], '1M': [272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 265.55, 246.4, 265.65, 257.79, 236.88, 236.18, 226.74, 207.97, 202.68, 212.07, 223.87, 228.27, 226.51], 'YTD': [143.89, 150.42, 150.97, 129.57, 111.31, 128.4, 130.66, 112.27, 109.83, 116.88, 100.3, 93.87, 107.93, 158.93, 195.04, 184.38, 210.22, 168.99, 221.23, 217.5, 264.76, 302.52, 245.68, 258.69, 226.74, 226.51], '6M': [133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 180.5, 180.06, 210.22, 156.27, 221.64, 229, 234.32, 239.18, 268.99, 259.09, 265.65, 207.97, 226.51], '1Y': [98.41, 116.01, 117.34, 121.13, 105.99, 122.73, 134, 163.96, 164.44, 149.38, 144.91, 148.87, 131.41, 137.2, 171.52, 173.16, 160.34, 141.88, 164.01, 180.92, 157.98, 134.13, 150.19, 143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 97.3, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.23, 214.6, 234.32, 239.18, 268.99, 259.09, 265.65, 207.97, 226.51] },
      velocityScore: { '1D': 0.9, '1W': 0.9, '1M': -9.2, '6M': null }, isNew: false,
      marketCap: '$42B', pe: 90.2, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 1.95, PSI: false, XSD: 2.38, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 1.97, proScore: 0.98, coverage: 0.5,
      price: 89.66, weeklyPrices: [87.37, 86.70, 91.06, 92.33, 89.66], weeklyChange: 2.62, dayChange: -2.89, sortRank: 0, periodReturns: { '1M': -23.4, 'YTD': 65.6, '6M': 44.7, '1Y': 50.4 },
      priceHistory: { '1D': [92.33, 89.52, 89.66], '1W': [87.37, 86.7, 91.06, 92.33, 89.66], '1M': [117.06, 115.74, 118.74, 90.65, 88.57, 94.54, 94.63, 91.22, 94.69, 91.1, 97.87, 95.96, 90.37, 93.73, 92.54, 88.12, 87.37, 86.7, 91.06, 92.33, 89.66], 'YTD': [54.15, 62.16, 60.33, 62.63, 59.43, 71.18, 68.09, 66.48, 56.87, 59.88, 62.34, 61.92, 68.49, 79.93, 98.4, 103.03, 107.24, 106.02, 124.89, 131.82, 115.96, 131.55, 88.57, 93.79, 92.54, 89.66], '6M': [61.98, 59.89, 65.2, 72.21, 69.47, 66.48, 59.23, 59.88, 59.89, 55.66, 63.79, 72.05, 86.91, 98.04, 102.04, 107.24, 109.43, 127, 128.64, 117, 118.25, 115.74, 94.63, 97.87, 88.12, 89.66], '1Y': [59.61, 58.05, 46.98, 51.89, 49.47, 51.25, 48.06, 48.13, 49.8, 50.94, 48.35, 50.88, 50.36, 51.93, 51.4, 50.08, 49.27, 46.12, 49.64, 54.79, 55.1, 53.33, 55.08, 56.7, 62.16, 60.33, 61.13, 61.53, 65.1, 71.96, 70.03, 63.42, 59.23, 59.88, 59.89, 55.66, 63.79, 72.05, 86.91, 93.3, 102.67, 104.11, 106.02, 124.89, 133.93, 117, 118.25, 115.74, 94.63, 97.87, 88.12, 89.66] },
      velocityScore: { '1D': 1, '1W': 0, '1M': -15.5, '6M': null }, isNew: false,
      marketCap: '$35B', pe: 65, revenueGrowth: 5, eps: 1.38, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 1.86, PSI: false, XSD: 2.07, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.49, proScore: 0.75, coverage: 0.5,
      price: 275.83, weeklyPrices: [267.36, 269.80, 283.03, 282.62, 275.83], weeklyChange: 3.17, dayChange: -2.4, sortRank: 0, periodReturns: { '1M': -25.9, 'YTD': 61, '6M': 25.8, '1Y': 101.1 },
      priceHistory: { '1W': [267.36, 269.8, 283.03, 282.62, 275.83], '1M': [372.15, 373.08, 390.19, 369.18, 372.59, 380.37, 350.63, 322.26, 327.64, 304.82, 317.35, 308.52, 294.24, 301.76, 293.02, 275.49, 267.36, 269.8, 283.03, 282.62, 275.83], 'YTD': [171.28, 174.87, 220.68, 219.2, 226.71, 236.94, 242.56, 248.12, 207.51, 224.92, 237.23, 222.07, 247.71, 261.42, 287.64, 284.18, 365.88, 358.98, 400.66, 382.74, 374.76, 396.26, 372.59, 305.23, 293.02, 275.83], '6M': [219.26, 219.06, 235.87, 244.16, 245.53, 258.54, 218.73, 224.92, 229.26, 209.49, 236.99, 263.92, 285.71, 279.44, 291.72, 365.88, 356.25, 409.68, 382.35, 358.72, 368.32, 373.08, 350.63, 317.35, 275.49, 275.83], '1Y': [137.19, 140.02, 139.03, 125.99, 121.15, 129.63, 131.89, 131.7, 131.87, 126.66, 126.56, 133.19, 136.83, 135.91, 152.66, 149.68, 170.89, 161.57, 168.06, 187.06, 186.23, 168.31, 175.81, 174.96, 174.87, 220.68, 218.89, 228.56, 235.7, 245.59, 248.29, 241.01, 218.73, 224.92, 229.26, 209.49, 236.99, 263.92, 285.71, 265.61, 303.57, 362.76, 358.98, 400.66, 390.34, 358.72, 368.32, 373.08, 350.63, 317.35, 275.49, 275.83] },
      velocityScore: { '1D': 0, '1W': -1.3, '1M': -12.8, '6M': null }, isNew: false,
      marketCap: '$21B', pe: 117.4, revenueGrowth: 23, eps: 2.35, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.01, PSI: false, XSD: 1.97, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SWKS', name: 'SKYWORKS SOLUTIONS INC', easyScore: 2, avgWeight: 1.36, proScore: 0.68, coverage: 0.5,
      price: 62.13, weeklyPrices: [59.35, 59.80, 62.95, 63.16, 62.13], weeklyChange: 4.68, dayChange: -1.63, sortRank: 0, periodReturns: { '1M': -15.4, 'YTD': -2, '6M': 5.4, '1Y': -15 },
      priceHistory: { '1D': [63.16, 62.51, 62.13], '1W': [59.35, 59.8, 62.95, 63.16, 62.13], '1M': [73.44, 71.4, 69.94, 68, 67.71, 67.8, 65.93, 62.56, 61.91, 59.76, 59.95, 60.38, 58.24, 56.58, 57.51, 57.63, 59.35, 59.8, 62.95, 63.16, 62.13], 'YTD': [63.41, 60.17, 57.77, 60.05, 55.93, 63.68, 59.22, 59.58, 54.81, 54.54, 55.36, 53.55, 56.56, 58.7, 63.65, 69.4, 70.13, 70.35, 78.68, 79.93, 72.73, 76.18, 67.71, 58.49, 57.51, 62.13], '6M': [58.96, 55.76, 62.1, 62.1, 59.78, 58.93, 55.28, 54.54, 54.49, 52.5, 55.06, 57.28, 59.94, 62.12, 68.85, 70.13, 70.35, 83.42, 79.12, 73.56, 71.42, 71.4, 65.93, 59.95, 57.63, 62.13], '1Y': [73.09, 71.33, 67.52, 73.65, 75.12, 76.2, 74.64, 73.6, 74.49, 80.66, 76.34, 76.1, 74.22, 73.97, 78.74, 73.46, 69.46, 62.59, 65.34, 69.01, 68.81, 65, 64.51, 64.4, 60.17, 57.77, 59.76, 56.83, 61.55, 62.16, 59.9, 58.15, 55.28, 54.54, 54.49, 52.5, 55.06, 57.28, 59.94, 60.98, 72.56, 66.31, 70.35, 78.68, 80.66, 73.56, 71.42, 71.4, 65.93, 59.95, 57.63, 62.13] },
      velocityScore: { '1D': 0, '1W': 11.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 25.8, revenueGrowth: -1, eps: 2.41, grossMargin: 41, dividendYield: 4.5,
      etfPresence: { SOXX: 0.49, PSI: false, XSD: 2.22, DRAM: false },
      tonyNote: 'SKYWORKS SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 9, avgWeight: 5.89, proScore: 3.12, coverage: 0.529,
      price: 209.08, weeklyPrices: [202.81, 203.28, 207.29, 212.06, 209.08], weeklyChange: 3.09, dayChange: -1.41, sortRank: 0, periodReturns: { '1M': 4.5, 'YTD': 12.1, '6M': 11.4, '1Y': 22.4 },
      priceHistory: { '1D': [212.06, 209.1, 209.08], '1W': [202.81, 203.28, 207.29, 212.06, 209.08], '1M': [200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 196.93, 202.78, 210.96, 203.53, 211.8, 212.5, 207.4, 202.81, 203.28, 207.29, 212.06, 209.08], 'YTD': [186.5, 184.86, 186.23, 188.52, 180.34, 190.05, 187.9, 177.19, 177.82, 183.22, 175.2, 174.4, 183.91, 198.35, 208.27, 198.45, 219.44, 220.61, 212.6, 218.66, 204.87, 208.65, 194.97, 204.12, 212.5, 209.08], '6M': [187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 216.61, 198.48, 219.44, 222.32, 214.86, 222.82, 208.19, 207.41, 199, 197.58, 202.78, 207.4, 209.08], '1Y': [170.78, 179.27, 179.42, 181.59, 175.4, 181.6, 171.66, 177.33, 170.29, 176.97, 187.24, 189.11, 179.83, 180.28, 207.04, 195.21, 193.8, 186.52, 180.26, 183.38, 183.78, 170.94, 188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 214.75, 208.19, 207.41, 199, 197.58, 202.78, 207.4, 209.08] },
      velocityScore: { '1D': 1, '1W': 8.7, '1M': -5.7, '6M': null }, isNew: false,
      marketCap: '$5.1T', pe: 32, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.09, GTEK: false, ARKK: 1.77, MARS: false, FRWD: 9.26, BCTK: 6.4, FWD: 3.14, CBSE: 3.05, FCUS: false, WGMI: 2.44, CNEQ: 14.41, SGRT: false, SPMO: 8.49, XMMO: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 8, avgWeight: 5.69, proScore: 2.68, coverage: 0.471,
      price: 974.72, weeklyPrices: [848.95, 865.46, 970.82, 959.48, 974.72], weeklyChange: 14.81, dayChange: 1.59, sortRank: 0, periodReturns: { '1M': -7.3, 'YTD': 241.5, '6M': 143.9, '1Y': 787.5 },
      priceHistory: { '1D': [959.48, 975.05, 974.72], '1W': [848.95, 865.46, 970.82, 959.48, 974.72], '1M': [1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 991.64, 979.3, 937, 983.12, 904.28, 853.2, 848.95, 865.46, 970.82, 959.48, 974.72], 'YTD': [285.41, 345.09, 362.75, 410.24, 419.44, 410.34, 417.35, 412.37, 370.3, 441.8, 395.53, 337.84, 421.51, 457.23, 496.72, 542.21, 795.33, 698.74, 928.41, 996, 995.87, 1211.38, 1145.28, 948.8, 904.28, 974.72], '6M': [399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1032.28, 991.64, 853.2, 974.72], '1Y': [109.83, 114.74, 108.78, 124.27, 117.21, 117.75, 124.21, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 198.47, 226.63, 237.5, 244.9, 225.92, 230.26, 226.65, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 935.89, 1020.76, 1048.51, 1032.28, 991.64, 853.2, 974.72] },
      velocityScore: { '1D': 0, '1W': -2.9, '1M': -14.4, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 22, revenueGrowth: 346, eps: 44.23, grossMargin: 73, dividendYield: 0.06,
      etfPresence: { PTF: 5, WCLD: false, IGV: false, FDTX: 9.33, GTEK: false, ARKK: false, MARS: false, FRWD: 4.05, BCTK: 4.1, FWD: false, CBSE: false, FCUS: 4.17, WGMI: false, CNEQ: 2.63, SGRT: 6.43, SPMO: 9.8, XMMO: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.82, proScore: 1.8, coverage: 0.471,
      price: 393.27, weeklyPrices: [370.83, 378.16, 386.50, 396.81, 393.27], weeklyChange: 6.05, dayChange: -0.89, sortRank: 0, periodReturns: { '1M': 3.5, 'YTD': 13.6, '6M': 22.9, '1Y': 38.6 },
      priceHistory: { '1D': [396.81, 393.76, 393.27], '1W': [370.83, 378.16, 386.5, 396.81, 393.27], '1M': [380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 370.78, 401.11, 399.97, 384.05, 389.11, 394.28, 374.45, 370.83, 378.16, 386.5, 396.81, 393.27], 'YTD': [346.1, 344.97, 351.71, 332.79, 320.33, 342.76, 333.99, 319.55, 330.48, 324.92, 318.29, 309.51, 354.91, 398.47, 422.76, 421.28, 428.43, 411.07, 421.86, 418.91, 385.57, 392.13, 372.45, 388.69, 394.28, 393.27], '6M': [320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 418.2, 416.5, 428.43, 420.71, 422.01, 481.57, 392.16, 376.71, 382.07, 369.34, 401.11, 374.45, 393.27], '1Y': [283.69, 302.62, 301.67, 309.09, 291.17, 300.25, 306.1, 369.57, 346.17, 339.31, 333.39, 345.5, 351.33, 340.3, 385.98, 358.98, 355.22, 354.42, 397.57, 381.03, 412.97, 326.02, 350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 479.23, 392.16, 376.71, 382.07, 369.34, 401.11, 374.45, 393.27] },
      velocityScore: { '1D': 9.8, '1W': 9.1, '1M': 23.3, '6M': null }, isNew: false,
      marketCap: '$1.9T', pe: 65.7, revenueGrowth: 48, eps: 5.99, grossMargin: 76, dividendYield: 0.66,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.62, GTEK: false, ARKK: 1.19, MARS: false, FRWD: 4.97, BCTK: 7.11, FWD: 2.52, CBSE: 2.52, FCUS: false, WGMI: false, CNEQ: 5.08, SGRT: false, SPMO: 6.58, XMMO: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 8, avgWeight: 3.68, proScore: 1.73, coverage: 0.471,
      price: 547.81, weeklyPrices: [495.76, 503.57, 544.43, 552.33, 547.81], weeklyChange: 10.5, dayChange: -0.82, sortRank: 0, periodReturns: { '1M': 5.4, 'YTD': 155.8, '6M': 111, '1Y': 245.3 },
      priceHistory: { '1D': [552.33, 547.3, 547.81], '1W': [495.76, 503.57, 544.43, 552.33, 547.81], '1M': [519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 546.72, 557.89, 534.39, 548.13, 529.14, 500.94, 495.76, 503.57, 544.43, 552.33, 547.81], 'YTD': [214.16, 203.17, 231.83, 252.03, 242.11, 213.58, 203.37, 200.21, 192.43, 196.58, 205.37, 203.43, 236.64, 278.26, 347.81, 360.54, 458.79, 414.05, 495.54, 523.2, 488.45, 551.63, 539.49, 517.41, 529.14, 547.81], '6M': [259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 334.63, 341.54, 458.79, 420.99, 503.89, 521.54, 475.51, 507.29, 519.74, 540.88, 546.72, 500.94, 547.81], '1Y': [158.65, 179.51, 163.12, 184.42, 165.2, 167.13, 161.79, 159.54, 159.16, 160.88, 164.01, 235.56, 238.6, 230.23, 264.33, 256.33, 258.89, 223.55, 214.24, 215.98, 221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 475.51, 507.29, 519.74, 540.88, 546.72, 500.94, 547.81] },
      velocityScore: { '1D': 0.6, '1W': -1.7, '1M': 3.6, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 183.8, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: 3.21, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.32, MARS: false, FRWD: 7.38, BCTK: 3.34, FWD: 2.3, CBSE: false, FCUS: false, WGMI: false, CNEQ: 1.28, SGRT: 3.46, SPMO: 4.16, XMMO: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 7, avgWeight: 4.76, proScore: 1.96, coverage: 0.412,
      price: 568.09, weeklyPrices: [477.22, 487.42, 548.39, 556.67, 568.09], weeklyChange: 19.04, dayChange: 2.05, sortRank: 0, periodReturns: { '1M': -15.3, 'YTD': 229.8, '6M': 140.3, '1Y': 719.5 },
      priceHistory: { '1D': [556.67, 568.09, 568.09], '1W': [477.22, 487.42, 548.39, 556.67, 568.09], '1M': [670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 532.1, 578.05, 582.59, 555.55, 563.32, 513.84, 466.81, 477.22, 487.42, 548.39, 556.67, 568.09], 'YTD': [172.27, 200.46, 221.51, 252.66, 290.24, 273.74, 284.67, 279.7, 245.25, 286.21, 301.05, 270.49, 337.88, 361.69, 404, 431.52, 515.83, 455.8, 530.6, 575.5, 529.29, 732.62, 651.88, 550.3, 513.84, 568.09], '6M': [236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 400.73, 442.36, 515.83, 458.68, 524.65, 563.1, 517.72, 681.08, 643.83, 598.37, 578.05, 466.81, 568.09], '1Y': [69.32, 71.43, 73.78, 76.07, 75.64, 80.67, 90.49, 95.02, 100.94, 109.69, 130.59, 121.18, 120.44, 120.47, 141.38, 160.1, 166.11, 153.97, 157.74, 161, 181.95, 166.26, 179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 594.11, 517.72, 681.08, 643.83, 598.37, 578.05, 466.81, 568.09] },
      velocityScore: { '1D': 0.5, '1W': 1.6, '1M': -16.6, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 34, revenueGrowth: 46, eps: 16.7, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { PTF: 4.44, WCLD: false, IGV: false, FDTX: 4.49, GTEK: false, ARKK: false, MARS: false, FRWD: 4.07, BCTK: false, FWD: false, CBSE: false, FCUS: 3.94, WGMI: false, CNEQ: 4.69, SGRT: 10.01, SPMO: 1.66, XMMO: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 7, avgWeight: 4.36, proScore: 1.8, coverage: 0.412,
      price: 416.28, weeklyPrices: [398.37, 402.30, 424.61, 421.21, 416.28], weeklyChange: 4.5, dayChange: -1.15, sortRank: 0, periodReturns: { '1M': -4.6, 'YTD': 37, '6M': 24.3, '1Y': 73.2 },
      priceHistory: { '1D': [421.13, 415.99, 416.28], '1W': [398.37, 402.3, 424.61, 421.21, 416.28], '1M': [436.39, 440.83, 434.99, 432.35, 455.1, 477.57, 444.23, 434.16, 451.79, 432.57, 436.96, 434.11, 421.58, 420.39, 419.48, 409.74, 398.37, 402.3, 424.61, 421.21, 416.28], 'YTD': [303.89, 323.63, 342.4, 338.34, 335.75, 374.09, 360.39, 374.58, 338.89, 340.23, 343.25, 337.95, 365.49, 363.35, 402.46, 397.67, 404.54, 392.61, 422.73, 444.92, 421.07, 467.67, 455.1, 436.98, 419.48, 416.28], '6M': [334.87, 330.56, 348.85, 366.36, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 404.98, 401.61, 404.54, 395.95, 412.32, 446.69, 427.92, 425.83, 440.83, 444.23, 436.96, 409.74, 416.28], '1Y': [240.33, 242.91, 231.37, 241.44, 228.6, 239.29, 235.21, 260.44, 262.79, 280.71, 288.47, 304.52, 304.71, 288.88, 305.09, 293.64, 290.62, 282.37, 289.96, 292.93, 310.14, 276.96, 298.8, 319.61, 323.63, 342.4, 332.71, 341.36, 355.41, 364.2, 385.75, 353.13, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 392.61, 422.73, 436.69, 427.92, 425.83, 440.83, 444.23, 436.96, 409.74, 416.28] },
      velocityScore: { '1D': 0.6, '1W': 0, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$2.2T', pe: 36.6, revenueGrowth: 36, eps: 11.37, grossMargin: 64, dividendYield: 0.9,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6.39, GTEK: false, ARKK: 0.95, MARS: false, FRWD: 5.89, BCTK: 8.39, FWD: false, CBSE: 2.57, FCUS: false, WGMI: 0.67, CNEQ: 5.69, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'SPCX', name: 'SPACE EXPLORATION TECHN-CL A', easyScore: 6, avgWeight: 6.18, proScore: 2.18, coverage: 0.353,
      price: 115.5, weeklyPrices: [123.99, 119.85, 123.54, 115.26, 115.50], weeklyChange: -6.84, dayChange: 0.21, sortRank: 0, periodReturns: { '1M': -26, 'YTD': -28.2, '6M': -28.2, '1Y': -28.2 },
      priceHistory: { '1D': [115.26, 115.15, 115.5], '1W': [123.99, 119.85, 123.54, 115.26, 115.5], '1M': [156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 152.16, 145.3, 139.14, 136.08, 135.27, 131.11, 123.99, 119.85, 123.54, 115.26, 115.5], 'YTD': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 148.3, 152.16, 145.3, 139.14, 135.27, 131.11, 123.99, 119.85, 123.54, 115.26, 115.5], '6M': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 148.3, 152.16, 145.3, 139.14, 135.27, 131.11, 123.99, 119.85, 123.54, 115.26, 115.5], '1Y': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 148.3, 152.16, 145.3, 139.14, 136.08, 135.27, 131.11, 123.99, 119.85, 123.54, 115.26, 115.5] },
      velocityScore: { '1D': -3.1, '1W': -7.2, '1M': -13.8, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: null, revenueGrowth: 15, eps: -0.67, grossMargin: 49, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.41, MARS: 20.14, FRWD: 2.06, BCTK: 7.04, FWD: 1.35, CBSE: false, FCUS: false, WGMI: false, CNEQ: 2.06, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'SPACE EXPLORATION TECHN-CL A appears in 6 of 17 Broad Tech ETFs (35% coverage) with average weight 6.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 6, avgWeight: 3.26, proScore: 1.15, coverage: 0.353,
      price: 236.33, weeklyPrices: [247.23, 249.99, 247.55, 244.85, 236.33], weeklyChange: -4.41, dayChange: -3.48, sortRank: 0, periodReturns: { '1M': 0.9, 'YTD': 2.4, '6M': -1.2, '1Y': 3.5 },
      priceHistory: { '1D': [244.85, 236.28, 236.33], '1W': [247.23, 249.99, 247.55, 244.85, 236.33], '1M': [234.11, 234.27, 227.01, 232.69, 240.14, 238.34, 241.7, 242.67, 244.16, 245.98, 247.04, 245.34, 247.31, 247.49, 254.96, 249.89, 247.23, 249.99, 247.55, 244.85, 236.33], 'YTD': [230.82, 247.38, 239.12, 244.68, 238.62, 204.08, 204.86, 210, 213.21, 211.74, 207.24, 208.27, 233.65, 249.7, 263.99, 268.26, 268.99, 259.34, 271.85, 253.79, 241.51, 232.79, 240.14, 243.62, 254.96, 236.33], '6M': [239.16, 239.3, 210.32, 198.79, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 261.12, 272.05, 268.99, 264.86, 265.29, 256.52, 244.19, 246, 234.27, 241.7, 247.04, 249.89, 236.33], '1Y': [228.29, 230.19, 222.31, 224.56, 223.81, 229.12, 235.68, 230.33, 231.62, 220.21, 220.63, 225.22, 215.57, 217.95, 230.3, 250.2, 244.2, 222.69, 229.16, 229.11, 231.78, 221.27, 232.38, 226.5, 247.38, 239.12, 238.42, 242.96, 208.72, 201.15, 208.56, 208.73, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 259.34, 271.85, 250.02, 244.19, 246, 234.27, 241.7, 247.04, 249.89, 236.33] },
      velocityScore: { '1D': -1.7, '1W': 33.7, '1M': -4.2, '6M': null }, isNew: false,
      marketCap: '$2.5T', pe: 28.3, revenueGrowth: 17, eps: 8.35, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.29, GTEK: false, ARKK: 2.55, MARS: false, FRWD: 3.26, BCTK: 4.68, FWD: 1.67, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.09, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc Class A', easyScore: 6, avgWeight: 2.25, proScore: 0.8, coverage: 0.353,
      price: 606.92, weeklyPrices: [646.01, 645.85, 643.81, 627.17, 606.92], weeklyChange: -6.05, dayChange: -3.23, sortRank: 0, periodReturns: { '1M': 8, 'YTD': -8.1, '6M': -7.9, '1Y': -14.9 },
      priceHistory: { '1D': [627.17, 607.39, 606.92], '1W': [646.01, 645.85, 643.81, 627.17, 606.92], '1M': [562.2, 557.67, 542.87, 550.25, 562.6, 563.29, 612.91, 582.9, 600.29, 615.58, 631.48, 669.21, 656.73, 661.04, 681.31, 664.54, 646.01, 645.85, 643.81, 627.17, 606.92], 'YTD': [660.09, 653.06, 620.25, 672.97, 691.7, 668.69, 644.78, 648.18, 644.86, 627.45, 592.92, 572.13, 628.39, 676.87, 675.03, 608.75, 598.86, 602.61, 635.26, 627.57, 568.43, 563.85, 562.6, 603.12, 681.31, 606.92], '6M': [658.76, 716.5, 661.46, 639.77, 637.25, 653.56, 647.39, 627.45, 604.06, 536.38, 575.05, 662.49, 668.84, 678.62, 610.41, 598.86, 611.21, 612.34, 597.63, 584.59, 600.21, 557.67, 612.91, 631.48, 664.54, 606.92], '1Y': [713.58, 695.21, 771.99, 780.08, 747.72, 747.38, 748.65, 751.98, 775.72, 760.66, 717.34, 717.84, 717.55, 733.41, 751.67, 635.95, 609.01, 590.32, 633.61, 661.53, 650.13, 649.5, 667.55, 650.41, 653.06, 620.25, 672.36, 706.41, 677.22, 639.29, 639.3, 655.08, 647.39, 627.45, 604.06, 536.38, 575.05, 662.49, 668.84, 671.34, 604.96, 603, 602.61, 635.26, 622.98, 584.59, 600.21, 557.67, 612.91, 631.48, 664.54, 606.92] },
      velocityScore: { '1D': 5.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 22.1, revenueGrowth: 33, eps: 27.47, grossMargin: 82, dividendYield: 0.33,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.36, GTEK: false, ARKK: 1.47, MARS: false, FRWD: false, BCTK: 1.17, FWD: 1.19, CBSE: 3.87, FCUS: false, WGMI: false, CNEQ: 3.47, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 5, avgWeight: 4.26, proScore: 1.25, coverage: 0.294,
      price: 320.52, weeklyPrices: [346.12, 351.37, 346.19, 341.91, 320.52], weeklyChange: -7.4, dayChange: -6.25, sortRank: 0, periodReturns: { '1M': -7.4, 'YTD': 2.1, '6M': -2.4, '1Y': 67.4 },
      priceHistory: { '1D': [341.91, 320.74, 320.52], '1W': [346.12, 351.37, 346.19, 341.91, 320.52], '1M': [346.08, 345.04, 342.19, 334.69, 351.28, 353.33, 357.89, 356.18, 364.9, 363.62, 356.24, 355.03, 350.67, 357.33, 370.21, 353.81, 346.12, 351.37, 346.19, 341.91, 320.52], 'YTD': [313.8, 329.14, 330.34, 335, 340.7, 311.33, 303.56, 311.43, 298.3, 304.42, 289.2, 286.86, 316.37, 332.77, 342.32, 383.22, 386.77, 384.9, 384.83, 369.27, 356.56, 348.78, 351.28, 358.71, 370.21, 320.52], '6M': [328.43, 338.53, 323.1, 306.02, 311.69, 306.36, 306.01, 304.42, 299.02, 273.14, 303.93, 330.58, 330.47, 348.52, 379.64, 386.77, 393.11, 384.84, 358.39, 362.29, 371.1, 345.04, 357.89, 356.24, 353.81, 320.52], '1Y': [191.51, 197.44, 196.92, 203.03, 200.19, 208.21, 232.66, 239.56, 249.85, 247.83, 245.54, 245.46, 251.71, 252.53, 275.17, 284.75, 287.43, 292.99, 320.28, 318.39, 321, 298.06, 315.67, 315.32, 329.14, 330.34, 333.59, 344.9, 324.4, 302.82, 310.92, 303.56, 306.01, 304.42, 299.02, 273.14, 303.93, 330.58, 330.47, 347.5, 384.27, 383.82, 384.9, 384.83, 355.68, 362.29, 371.1, 345.04, 357.89, 356.24, 353.81, 320.52] },
      velocityScore: { '1D': 0, '1W': 0, '1M': 5.9, '6M': null }, isNew: false,
      marketCap: '$3.9T', pe: 16.1, revenueGrowth: 24, eps: 19.93, grossMargin: 61, dividendYield: 0.26,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.21, GTEK: false, ARKK: 1.91, MARS: false, FRWD: false, BCTK: 6.71, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.79, SGRT: false, SPMO: 3.67, XMMO: false },
      tonyNote: 'Alphabet Inc Class C appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 4.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 5, avgWeight: 4.21, proScore: 1.24, coverage: 0.294,
      price: 923.43, weeklyPrices: [787.66, 802.45, 891.83, 908.10, 923.43], weeklyChange: 17.24, dayChange: 1.69, sortRank: 0, periodReturns: { '1M': -11.1, 'YTD': 235.3, '6M': 166.8, '1Y': 504.5 },
      priceHistory: { '1D': [908.1, 922.93, 923.43], '1W': [787.66, 802.45, 891.83, 908.1, 923.43], '1M': [1038.59, 993.25, 1025.36, 899.9, 968.53, 965, 915.19, 820.16, 868.26, 827.64, 890.09, 910.34, 860.66, 878.31, 828.3, 745.49, 787.66, 802.45, 891.83, 908.1, 923.43], 'YTD': [275.39, 304.01, 326.23, 371.76, 444.45, 407.25, 408.97, 407.84, 352.8, 398.78, 424.96, 391.76, 500.77, 531.81, 586.25, 726.93, 834.01, 733.35, 870.66, 925.99, 868.09, 1094.04, 968.53, 860.02, 828.3, 923.43], '6M': [346.1, 407.69, 429.32, 425.99, 407.4, 379.52, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 595.86, 738.54, 834.01, 740.84, 845.76, 926.61, 846.01, 1031.34, 993.25, 915.19, 890.09, 745.49, 923.43], '1Y': [152.76, 147.42, 147.27, 156.92, 158.4, 167.24, 183.98, 193.04, 213.36, 223.7, 256.84, 224.35, 219.38, 215.05, 265.62, 275.77, 283.26, 259.14, 272.28, 265.63, 298.92, 277.65, 285.27, 287.54, 304.01, 326.23, 358.29, 432.95, 425, 415.94, 396.02, 357.62, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 579.03, 771.01, 808.8, 733.35, 870.66, 940.69, 846.01, 1031.34, 993.25, 915.19, 890.09, 745.49, 923.43] },
      velocityScore: { '1D': 0.8, '1W': -1.6, '1M': -16.2, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 87.7, revenueGrowth: 44, eps: 10.53, grossMargin: 42, dividendYield: 0.33,
      etfPresence: { PTF: 4.08, WCLD: false, IGV: false, FDTX: 4.14, GTEK: false, ARKK: false, MARS: false, FRWD: 6.96, BCTK: false, FWD: false, CBSE: false, FCUS: 4.13, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.76, XMMO: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, avgWeight: 5.31, proScore: 1.25, coverage: 0.235,
      price: 390.85, weeklyPrices: [393.82, 402.29, 397.75, 390.34, 390.85], weeklyChange: -0.75, dayChange: 0.13, sortRank: 0, periodReturns: { '1M': 4.5, 'YTD': -19.2, '6M': -16.1, '1Y': -22.7 },
      priceHistory: { '1D': [390.34, 391.5, 390.85], '1W': [393.82, 402.29, 397.75, 390.34, 390.85], '1M': [373.94, 365.46, 352.83, 372.97, 368.57, 373.02, 384.28, 390.49, 386.74, 388.84, 384.36, 385.1, 390.99, 384.93, 395.63, 401.1, 393.82, 402.29, 397.75, 390.34, 390.85], 'YTD': [483.62, 479.28, 459.86, 480.58, 411.21, 404.37, 398.46, 392.74, 408.96, 399.95, 372.74, 370.17, 373.07, 420.26, 424.62, 414.44, 412.66, 417.42, 412.67, 428.05, 390.34, 367.34, 368.57, 383.34, 395.63, 390.85], '6M': [465.95, 430.29, 401.14, 401.32, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 424.82, 413.62, 412.66, 423.54, 416.03, 441.31, 403.41, 393.83, 365.46, 384.28, 384.36, 401.1, 390.85], '1Y': [505.87, 513.24, 524.94, 520.58, 505.72, 506.74, 507.97, 500.37, 510.02, 510.15, 519.71, 524.85, 513.43, 520.54, 541.55, 507.16, 511.14, 487.12, 485.5, 480.84, 478.56, 476.12, 488.02, 472.94, 479.28, 459.86, 470.28, 423.37, 413.6, 396.86, 389, 403.93, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 417.42, 412.67, 427.34, 403.41, 393.83, 365.46, 384.28, 384.36, 401.1, 390.85] },
      velocityScore: { '1D': 0, '1W': 3.3, '1M': 1.6, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 23.3, revenueGrowth: 18, eps: 16.78, grossMargin: 68, dividendYield: 0.93,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.59, FDTX: 2.93, GTEK: false, ARKK: false, MARS: false, FRWD: 3.3, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 6.42, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 4, avgWeight: 4.69, proScore: 1.1, coverage: 0.235,
      price: 329.75, weeklyPrices: [358.68, 348.66, 342.15, 335.28, 329.75], weeklyChange: -8.07, dayChange: -1.65, sortRank: 0, periodReturns: { '1M': 13.3, 'YTD': 79, '6M': 83, '1Y': 65.5 },
      priceHistory: { '1D': [335.28, 329.8, 329.75], '1W': [358.68, 348.66, 342.15, 335.28, 329.75], '1M': [290.92, 285.26, 293.09, 304.2, 332, 341.02, 352.04, 348.06, 357.53, 337.04, 338.31, 325.91, 330.3, 352.89, 354.02, 353.99, 358.68, 348.66, 342.15, 335.28, 329.75], 'YTD': [184.2, 189.02, 187.66, 183.5, 166.24, 165.3, 150.99, 148.92, 165.05, 167.45, 157.21, 160.32, 166.99, 166.97, 178.54, 181.08, 213.66, 240.13, 248.47, 279.25, 279.53, 286.4, 332, 320.59, 354.02, 329.75], '6M': [180.18, 176.97, 159.32, 166.95, 144.14, 150.15, 165.1, 167.45, 164.05, 154.35, 169.87, 161.59, 174.96, 182.9, 184.56, 213.66, 247.55, 256.75, 297.18, 260.52, 279.9, 285.26, 352.04, 338.31, 353.99, 329.75], '1Y': [199.22, 183.03, 172.89, 176.86, 184.43, 187.61, 192.35, 197.33, 203.12, 200.7, 206.8, 217.79, 206.7, 212.42, 217.16, 213.18, 210.04, 199.9, 185.35, 195.68, 192.96, 183.44, 187.22, 179.37, 189.02, 187.66, 184.22, 175.42, 166, 163.5, 141.67, 156.09, 165.1, 167.45, 164.05, 154.35, 169.87, 161.59, 174.96, 180.99, 183.98, 215.6, 240.13, 248.47, 280.43, 260.52, 279.9, 285.26, 352.04, 338.31, 353.99, 329.75] },
      velocityScore: { '1D': 0, '1W': 0, '1M': 13.4, '6M': null }, isNew: false,
      marketCap: '$269B', pe: 289.3, revenueGrowth: 31, eps: 1.14, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.86, IGV: 10.37, FDTX: 4.15, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.39, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 4, avgWeight: 4.52, proScore: 1.06, coverage: 0.235,
      price: 318.76, weeklyPrices: [313.30, 306.76, 322.00, 319.29, 318.76], weeklyChange: 1.74, dayChange: -0.17, sortRank: 0, periodReturns: { '1M': -14.2, 'YTD': 86.2, '6M': 46.3, '1Y': 228.3 },
      priceHistory: { '1D': [319.29, 318.62, 318.76], '1W': [313.3, 306.76, 322, 319.29, 318.76], '1M': [371.33, 374.8, 401.82, 379.09, 410.91, 433.33, 391.26, 351.41, 350.2, 326.13, 353.17, 350.33, 329.92, 346.1, 335.43, 320.96, 313.3, 306.76, 322, 319.29, 318.76], 'YTD': [171.18, 218.36, 222.96, 238.46, 230.1, 235.12, 237.39, 233.89, 199.33, 219.4, 238.84, 213.66, 258.76, 260.96, 267.78, 256.72, 296.05, 273.38, 318.93, 336.41, 362.52, 409.54, 410.91, 333.15, 335.43, 318.76], '6M': [217.94, 233.46, 231.01, 235.53, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 259.47, 258.57, 296.05, 277.96, 322.68, 334.41, 327.16, 369.34, 374.8, 391.26, 353.17, 320.96, 318.76], '1Y': [97.1, 99.09, 95.94, 106.74, 99.15, 103.67, 100.42, 107.36, 121.9, 128.32, 142.79, 142.54, 144.78, 141.25, 160.67, 165.05, 161.42, 148.8, 155.14, 157.09, 168.26, 154.98, 177.33, 185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.58, 244.25, 217.27, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 273.38, 318.93, 343.71, 327.16, 369.34, 374.8, 391.26, 353.17, 320.96, 318.76] },
      velocityScore: { '1D': 0, '1W': -17.8, '1M': -20.9, '6M': null }, isNew: false,
      marketCap: '$399B', pe: 60.1, revenueGrowth: 24, eps: 5.3, grossMargin: 50, dividendYield: 0.33,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.38, BCTK: 7.18, FWD: 1.87, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 3.64, XMMO: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 4, avgWeight: 3.63, proScore: 0.86, coverage: 0.235,
      price: 122.68, weeklyPrices: [132.38, 134.85, 132.66, 124.57, 122.68], weeklyChange: -7.33, dayChange: -1.52, sortRank: 0, periodReturns: { '1M': 5.1, 'YTD': -31, '6M': -27.7, '1Y': -20.7 },
      priceHistory: { '1D': [124.57, 123.51, 122.68], '1W': [132.38, 134.85, 132.66, 124.57, 122.68], '1M': [116.7, 113.5, 107.27, 112.93, 115.7, 116.67, 125.73, 129.3, 132.54, 134.37, 129.04, 126.79, 130.04, 133.72, 133.76, 134.44, 132.38, 134.85, 132.66, 124.57, 122.68], 'YTD': [177.75, 177.49, 170.96, 165.7, 157.88, 135.68, 134.89, 137.19, 157.16, 152.72, 154.78, 146.28, 130.49, 142.76, 143.09, 144.07, 136.89, 135.26, 132.51, 141.7, 131.08, 119.5, 115.7, 132.22, 133.76, 122.68], '6M': [169.6, 146.59, 135.9, 131.41, 130.6, 145.17, 156.43, 152.72, 160.84, 137.55, 150.07, 135.7, 145.97, 143.1, 146.03, 136.89, 135.14, 136.6, 152.17, 132.07, 133.25, 113.5, 125.73, 129.04, 134.44, 122.68], '1Y': [154.63, 158.61, 179.54, 184.37, 156.01, 156.72, 156.14, 166.74, 168.33, 179.56, 184.95, 183.56, 179.62, 175.49, 198.81, 187.9, 184.17, 165.42, 165.77, 177.92, 187.91, 177.29, 194.17, 167.86, 177.49, 170.96, 167.47, 147.76, 142.91, 133.02, 128.84, 147.22, 156.43, 152.72, 160.84, 137.55, 150.07, 135.7, 145.97, 141.18, 135.91, 136, 135.26, 132.51, 142.2, 132.07, 133.25, 113.5, 125.73, 129.04, 134.44, 122.68] },
      velocityScore: { '1D': -2.3, '1W': 0, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$294B', pe: 139.4, revenueGrowth: 85, eps: 0.88, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.36, FDTX: 2, GTEK: false, ARKK: 2.95, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.23, XMMO: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'CRWD', name: 'CrowdStrike', easyScore: 4, avgWeight: 3.12, proScore: 0.73, coverage: 0.235,
      price: 186.62, weeklyPrices: [203.08, 198.49, 191.15, 188.42, 186.62], weeklyChange: -8.11, dayChange: -0.96, sortRank: 0, periodReturns: { '1M': 9.6, 'YTD': 59.2, '6M': 65, '1Y': 61.7 },
      priceHistory: { '1D': [188.42, 187.43, 186.62], '1W': [203.08, 198.49, 191.15, 188.42, 186.62], '1M': [170.23, 168.26, 169.66, 175.27, 185.73, 190.79, 193.18, 193.98, 199.38, 194.62, 198.4, 187.18, 187.91, 210.73, 206.77, 203.76, 203.08, 198.49, 191.15, 188.42, 186.62], 'YTD': [117.19, 117.65, 113.47, 119.17, 105.43, 103.95, 105.54, 93, 107.25, 105.96, 98.25, 97.6, 98.67, 104.55, 112.03, 113.91, 135.57, 154.22, 161.34, 179.77, 172.88, 168.86, 185.73, 191.12, 206.77, 186.62], '6M': [113.12, 110.35, 98.88, 107.41, 87.58, 96.21, 108.53, 105.96, 103.33, 95.01, 105.81, 99.62, 112.4, 113.65, 117.31, 135.57, 154.71, 167.89, 192.24, 161.23, 169.87, 168.26, 193.18, 198.4, 203.76, 186.62], '1Y': [115.38, 115.79, 112.92, 108.03, 104.79, 105.65, 103.11, 106.22, 111.38, 119.08, 124.99, 127.49, 122.25, 125.03, 136.38, 133.54, 136.46, 130.15, 125.39, 128.28, 129.88, 117.5, 119.28, 113.39, 117.65, 113.47, 117.08, 109.71, 102.01, 103.57, 87.56, 97.86, 108.53, 105.96, 103.33, 95.01, 105.81, 99.62, 112.4, 113.75, 119.13, 136.54, 154.22, 161.34, 186.9, 161.23, 169.87, 168.26, 193.18, 198.4, 203.76, 186.62] },
      velocityScore: { '1D': 0, '1W': 9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$190B', pe: null, revenueGrowth: 26, eps: -0.04, grossMargin: 75, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.5, IGV: 7.31, FDTX: 1.21, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.46, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'CrowdStrike appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DDOG', name: 'DDOG', easyScore: 4, avgWeight: 3.1, proScore: 0.73, coverage: 0.235,
      price: 245.84, weeklyPrices: [258.69, 263.20, 254.79, 245.77, 245.84], weeklyChange: -4.97, dayChange: 0.03, sortRank: 0, periodReturns: { '1M': 11.5, 'YTD': 80.8, '6M': 88.9, '1Y': 70.7 },
      priceHistory: { '1D': [245.77, 247.77, 245.84], '1W': [258.69, 263.2, 254.79, 245.77, 245.84], '1M': [220.57, 222.65, 220.94, 239.77, 248.57, 260.36, 264.48, 260.36, 255.37, 256.81, 269, 257.54, 260.24, 270.73, 264.46, 262.32, 258.69, 263.2, 254.79, 245.77, 245.84], 'YTD': [135.99, 125.49, 119.02, 138.21, 119.66, 127.33, 120.6, 111.96, 125.75, 126.57, 122.57, 118.05, 108.98, 123.47, 129.48, 140.53, 202.32, 215.15, 221.81, 243.6, 234.24, 221.37, 248.57, 261.09, 264.46, 245.84], '6M': [130.13, 129.32, 111.69, 125.2, 102.61, 111.11, 128.56, 126.57, 129.23, 115.81, 116.54, 110.57, 129.29, 132.66, 146.69, 202.32, 208.82, 223.65, 269.13, 227.34, 231.11, 222.65, 264.48, 269, 262.32, 245.84], '1Y': [144, 148.88, 136.96, 128.71, 128.46, 131.73, 131.78, 139.13, 134.23, 136.57, 152.7, 164.12, 160.02, 154.21, 156, 154.98, 190.89, 176.31, 158.4, 153, 151.2, 136.71, 138.04, 133.77, 125.49, 119.02, 136.64, 129.05, 114.01, 122.56, 104.43, 111.77, 128.56, 126.57, 129.23, 115.81, 116.54, 110.57, 129.29, 131.55, 145.73, 199.94, 215.15, 221.81, 250.33, 227.34, 231.11, 222.65, 264.48, 269, 262.32, 245.84] },
      velocityScore: { '1D': 0, '1W': 2.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$88B', pe: 630.4, revenueGrowth: 32, eps: 0.39, grossMargin: 80, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.78, IGV: 3.12, FDTX: 2.39, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: 4.09, SPMO: false, XMMO: false },
      tonyNote: 'DDOG appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 3.08, proScore: 0.72, coverage: 0.235,
      price: 115.6, weeklyPrices: [123.56, 124.48, 123.03, 118.42, 115.60], weeklyChange: -6.44, dayChange: -2.38, sortRank: 0, periodReturns: { '1M': 7.4, 'YTD': -28.2, '6M': -16.2, '1Y': -5.4 },
      priceHistory: { '1D': [118.42, 116.3, 115.6], '1W': [123.56, 124.48, 123.03, 118.42, 115.6], '1M': [107.68, 114.17, 111.62, 116.86, 114.21, 114.18, 121.63, 119.46, 120.14, 121.88, 123.17, 122.54, 124.74, 125.68, 123.55, 125.06, 123.56, 124.48, 123.03, 118.42, 115.6], 'YTD': [160.97, 164.48, 155.81, 137.5, 119.29, 118.71, 123.8, 120.73, 130.2, 126.58, 116.15, 118.62, 112.38, 126.94, 125.83, 127.67, 102.54, 101.01, 106.6, 116.04, 110.47, 107.98, 114.21, 119.22, 123.55, 115.6], '6M': [137.89, 131.23, 112.05, 112.7, 117.28, 119.38, 133.5, 126.58, 121.1, 111.77, 117.06, 117.64, 131.13, 124.23, 127.55, 102.54, 102.39, 104.9, 117.01, 110.42, 113.23, 114.17, 121.63, 123.17, 125.06, 115.6], '1Y': [122.21, 123.01, 154.9, 150.09, 137.29, 139.89, 145.15, 142.2, 147.87, 148.83, 149.57, 166.43, 156.21, 162.01, 179.01, 162.92, 156.59, 146, 159.34, 162.31, 168.42, 161.73, 169.45, 157.2, 164.48, 155.81, 136.31, 132.2, 118.4, 113.54, 116.93, 121.87, 133.5, 126.58, 121.1, 111.77, 117.06, 117.64, 131.13, 122.05, 107.63, 99.84, 101.01, 106.6, 112.94, 110.42, 113.23, 114.17, 121.63, 123.17, 125.06, 115.6] },
      velocityScore: { '1D': -1.4, '1W': 0, '1M': 9.1, '6M': null }, isNew: false,
      marketCap: '$150B', pe: 113.3, revenueGrowth: 34, eps: 1.02, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.59, GTEK: false, ARKK: 4.32, MARS: false, FRWD: 2.31, BCTK: 3.09, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 4, avgWeight: 3.01, proScore: 0.71, coverage: 0.235,
      price: 1606.37, weeklyPrices: [1354.82, 1390.95, 1589.40, 1599.27, 1606.37], weeklyChange: 18.57, dayChange: 0.44, sortRank: 0, periodReturns: { '1M': -18.2, 'YTD': 576.7, '6M': 239, '1Y': 3635.7 },
      priceHistory: { '1D': [1599.27, 1596.61, 1606.37], '1W': [1354.82, 1390.95, 1589.4, 1599.27, 1606.37], '1M': [1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745, 1744.43, 1617.7, 1858.27, 1915.92, 1673.97, 1757.82, 1615, 1411.08, 1354.82, 1390.95, 1589.4, 1599.27, 1606.37], 'YTD': [237.38, 377.41, 413.62, 481.43, 695.51, 599.34, 621.09, 635.36, 527.33, 703.63, 702.48, 635.34, 851.57, 919.47, 989.9, 1187, 1547.56, 1383.29, 1589.94, 1759.68, 1881.51, 2273.73, 2050.39, 1727.18, 1615, 1606.37], '6M': [473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1070.2, 1255.86, 1547.56, 1333.01, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46, 2032.22, 1858.27, 1411.08, 1606.37], '1Y': [43, 43.39, 42.1, 47.01, 44.4, 48.44, 62.5, 73.92, 93.97, 99.83, 121.12, 131.88, 144.3, 146.95, 204.36, 216.5, 283.1, 245.96, 215.04, 213.31, 232.86, 206.83, 250.08, 275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 565.41, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1831.5, 1646.54, 1991.55, 1914.46, 2032.22, 1858.27, 1411.08, 1606.37] },
      velocityScore: { '1D': 1.4, '1W': -10.1, '1M': -37.7, '6M': null }, isNew: false,
      marketCap: '$238B', pe: 54.9, revenueGrowth: 251, eps: 29.27, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 4.89, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.58, CBSE: false, FCUS: 3.51, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.06, XMMO: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'ASML', name: 'ASML Holding', easyScore: 4, avgWeight: 2.94, proScore: 0.69, coverage: 0.235,
      price: 1791.27, weeklyPrices: [1747.58, 1739.02, 1801.51, 1801.86, 1791.27], weeklyChange: 2.5, dayChange: -0.59, sortRank: 0, periodReturns: { '1M': 0.7, 'YTD': 67.4, '6M': 29, '1Y': 149.9 },
      priceHistory: { '1D': [1801.86, 1792.71, 1791.27], '1W': [1747.58, 1739.02, 1801.51, 1801.86, 1791.27], '1M': [1778.46, 1762.77, 1841.18, 1794.62, 1883.11, 1989.44, 1843.04, 1769.32, 1825.07, 1747.28, 1804.25, 1797.32, 1726.04, 1775.64, 1815.27, 1784.87, 1747.58, 1739.02, 1801.51, 1801.86, 1791.27], 'YTD': [1069.86, 1273.88, 1358.57, 1454.59, 1395.88, 1435.63, 1458.93, 1450.56, 1292.8, 1375.56, 1399.42, 1320.83, 1448.64, 1410.83, 1457.7, 1427.02, 1565.81, 1459.44, 1597.87, 1757.47, 1899.48, 1929.25, 1883.11, 1768.65, 1815.27, 1791.27], '6M': [1389.04, 1423, 1413.01, 1406.61, 1485.99, 1423.54, 1357.42, 1375.56, 1369.62, 1253.96, 1306.45, 1518.3, 1458.97, 1432.44, 1386.21, 1565.81, 1472.39, 1632.03, 1705.37, 1777.77, 1803.89, 1762.77, 1843.04, 1804.25, 1784.87, 1791.27], '1Y': [716.93, 721.45, 690.96, 755.57, 749.49, 770, 753.43, 793.14, 872.27, 946.94, 1003.27, 987.81, 1009.81, 1011.57, 1070.84, 1043.75, 1037.33, 1039.33, 1040.97, 1110.08, 1119.32, 1015.43, 1065.52, 1163.78, 1273.88, 1358.57, 1413.35, 1441.39, 1429.49, 1419.78, 1497.8, 1360.94, 1357.42, 1375.56, 1369.62, 1253.96, 1306.45, 1518.3, 1458.97, 1384.56, 1442.92, 1520.94, 1459.44, 1597.87, 1726.36, 1777.77, 1803.89, 1762.77, 1843.04, 1804.25, 1784.87, 1791.27] },
      velocityScore: { '1D': null, '1W': 4.5, '1M': null, '6M': null }, isNew: true,
      marketCap: '$688B', pe: 61.7, revenueGrowth: 21, eps: 29.01, grossMargin: 53, dividendYield: 0.5,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5, BCTK: 2.27, FWD: 1.84, CBSE: 2.66, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'ASML Holding appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 3, avgWeight: 4.69, proScore: 2.82, coverage: 0.6,
      price: 410.03, weeklyPrices: [399.99, 401.41, 402.95, 406.91, 410.03], weeklyChange: 2.51, dayChange: 0.73, sortRank: 0, periodReturns: { '1M': 1.2, 'YTD': 28.7, '6M': 23.8, '1Y': 7.8 },
      priceHistory: { '1D': [407.06, 409.97, 410.03], '1W': [399.99, 401.41, 402.95, 406.91, 410.03], '1M': [405.28, 404.59, 419.87, 402.68, 408.26, 426.12, 412.31, 398.52, 413.42, 395.68, 405.83, 407.28, 402.85, 415.52, 412.86, 396.27, 399.99, 401.41, 402.95, 406.91, 410.03], 'YTD': [318.51, 324.51, 343.75, 341.19, 362.53, 396.09, 377.32, 375.92, 347.75, 361.04, 374.1, 357.67, 400.44, 392.73, 423.92, 425.55, 419, 371.88, 406.37, 418.61, 393.64, 435.78, 408.26, 399.56, 412.86, 410.03], '6M': [331.22, 351.42, 373.82, 389.25, 362.05, 377.4, 353.87, 361.04, 359.74, 343.53, 368.85, 401.9, 409.7, 416.77, 422.44, 419, 381.87, 403.13, 417.62, 401.72, 407.71, 404.59, 412.31, 405.83, 396.27, 410.03], '1Y': [380.24, 390.09, 358.16, 357.49, 346.22, 351.4, 348.22, 362.25, 363.35, 372.21, 373.84, 376.7, 381.72, 360.6, 387.75, 385.44, 369.4, 345.65, 341.69, 338.93, 353.45, 315.82, 323.67, 327.31, 324.51, 343.75, 332.28, 359.44, 377.06, 391.49, 374.56, 355.56, 353.87, 361.04, 359.74, 343.53, 368.85, 401.9, 409.7, 413.07, 410.86, 401.53, 371.88, 406.37, 421.21, 401.72, 407.71, 404.59, 412.31, 405.83, 396.27, 410.03] },
      velocityScore: { '1D': 0.7, '1W': -0.4, '1M': 4.1, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 40.2, revenueGrowth: 17, eps: 10.21, grossMargin: 37, dividendYield: 1.08,
      etfPresence: { POW: 4.38, VOLT: 5.55, PBD: false, PBW: false, IVEP: 4.15 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 3, avgWeight: 4.66, proScore: 2.8, coverage: 0.6,
      price: 650.05, weeklyPrices: [628.53, 632.56, 639.20, 643.14, 650.05], weeklyChange: 3.42, dayChange: 1.05, sortRank: 0, periodReturns: { '1M': -7.4, 'YTD': 54, '6M': 38.7, '1Y': 60.5 },
      priceHistory: { '1D': [643.27, 649.83, 650.05], '1W': [628.53, 632.56, 639.2, 643.14, 650.05], '1M': [702.29, 701.88, 718.59, 687.87, 714.45, 720.04, 691.4, 668.31, 674.04, 656.79, 668.17, 658.56, 646.7, 660.94, 648.84, 631.02, 628.53, 632.56, 639.2, 643.14, 650.05], 'YTD': [422.06, 422.57, 466.75, 479.27, 488.6, 523.96, 554, 563.08, 540.19, 574.02, 578.44, 549.02, 582.06, 587.42, 624.84, 742.21, 781.38, 714.13, 733.62, 719.17, 683.29, 740.14, 714.45, 666.33, 648.84, 650.05], '6M': [468.76, 474.63, 508.11, 524.08, 549.11, 572.66, 568.04, 574.02, 567.45, 533.78, 555.57, 594.4, 605.89, 637.28, 757.34, 781.38, 723.03, 742.18, 706.06, 691.95, 719.29, 701.88, 691.4, 668.17, 631.02, 650.05], '1Y': [405.11, 411.11, 387.5, 379.96, 375.87, 381.56, 376.09, 390.17, 376.01, 402.87, 420.65, 443.45, 436.93, 412.21, 448.69, 453.45, 449.42, 445.47, 460.43, 464.84, 462.21, 414.25, 433.58, 439.68, 422.57, 466.75, 470.77, 477.77, 514.56, 525.13, 568.21, 566, 568.04, 574.02, 567.45, 533.78, 555.57, 594.4, 605.89, 630.94, 771.61, 765.81, 714.13, 733.62, 715.67, 691.95, 719.29, 701.88, 691.4, 668.17, 631.02, 650.05] },
      velocityScore: { '1D': 0.4, '1W': 0.7, '1M': -2.1, '6M': null }, isNew: false,
      marketCap: '$98B', pe: 89.4, revenueGrowth: 26, eps: 7.27, grossMargin: 15, dividendYield: 0.07,
      etfPresence: { POW: 4.99, VOLT: 5.11, PBD: false, PBW: false, IVEP: 3.89 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 3, avgWeight: 3.95, proScore: 2.37, coverage: 0.6,
      price: 89.45, weeklyPrices: [88.80, 88.00, 87.93, 89.41, 89.45], weeklyChange: 0.73, dayChange: 0.06, sortRank: 0, periodReturns: { '1M': 3.5, 'YTD': 11.4, '6M': 5.5, '1Y': 22.8 },
      priceHistory: { '1D': [89.4, 89.38, 89.45], '1W': [88.8, 88, 87.93, 89.41, 89.45], '1M': [86.43, 87.62, 87.7, 88.56, 88.66, 87.77, 86.37, 88.34, 87.44, 88.47, 87.1, 87.96, 88.38, 89.54, 89.1, 89.35, 88.8, 88, 87.93, 89.41, 89.45], 'YTD': [80.28, 79.89, 83.63, 87.15, 88.82, 91.36, 91.64, 93.77, 91.02, 92.82, 91.62, 92.88, 94.48, 91.83, 95.28, 96.95, 94.84, 90.06, 87.65, 85.68, 84.84, 86.08, 88.66, 87.44, 89.1, 89.45], '6M': [84.81, 87.9, 89.47, 93.8, 94.06, 92.71, 92.01, 92.82, 90.23, 92.05, 93.67, 91.31, 90.6, 94.83, 95.51, 94.84, 89.04, 87.65, 85.68, 84.83, 86.23, 87.62, 86.37, 87.1, 89.35, 89.45], '1Y': [72.82, 70.99, 70.54, 72.3, 76.18, 73.89, 70.87, 71.04, 70.31, 73.83, 78.67, 84.04, 85.79, 82.84, 81.76, 82.14, 85.89, 84.27, 85.54, 83.39, 81.27, 80.29, 80.45, 80.93, 79.89, 83.63, 85.47, 86.33, 89.48, 92.71, 95.68, 92.59, 92.01, 92.82, 90.23, 92.05, 93.67, 91.31, 90.6, 96.51, 96.28, 94.59, 90.06, 87.65, 84.58, 84.83, 86.23, 87.62, 86.37, 87.1, 89.35, 89.45] },
      velocityScore: { '1D': 1.3, '1W': -0.4, '1M': 17.9, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 22.7, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.79,
      etfPresence: { POW: 2.28, VOLT: 5.35, PBD: false, PBW: false, IVEP: 4.23 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 3, avgWeight: 3.75, proScore: 2.25, coverage: 0.6,
      price: 993.02, weeklyPrices: [1057.84, 1079.18, 1078.81, 985.03, 993.02], weeklyChange: -6.13, dayChange: 0.6, sortRank: 0, periodReturns: { '1M': -4.1, 'YTD': 51.9, '6M': 51, '1Y': 57.9 },
      priceHistory: { '1D': [987.08, 997.23, 993.02], '1W': [1057.84, 1079.18, 1078.81, 985.03, 993.02], '1M': [1034.98, 1057.65, 1085.47, 1045.17, 1102.51, 1174.86, 1134.35, 1113.11, 1152.04, 1077.08, 1075.26, 1091.57, 1042.6, 1066.01, 1055.28, 1036.22, 1057.84, 1079.18, 1078.81, 985.03, 993.02], 'YTD': [653.57, 622.5, 681.55, 692.7, 780.25, 823.67, 834.61, 873.6, 789.23, 827.37, 909.41, 872.9, 968.02, 978.32, 1149.19, 1062.95, 1073.08, 1011.8, 1031.89, 963.33, 906.79, 1127.59, 1102.51, 1070.99, 1055.28, 993.02], '6M': [657.78, 726.37, 779.35, 802.13, 831.7, 881.18, 830.1, 827.37, 882.64, 817.35, 910.75, 987.5, 991.3, 1120.23, 1073.95, 1073.08, 1012.25, 1070.47, 969.67, 920.15, 982.35, 1057.65, 1134.35, 1075.26, 1036.22, 993.02], '1Y': [629.03, 655, 664.55, 634.31, 604.59, 622.39, 598.81, 643.56, 614.79, 628.97, 606.15, 625.45, 615.95, 576, 577.97, 559.7, 575.4, 595.37, 589.72, 629.11, 723, 614.19, 667.32, 679.55, 622.5, 681.55, 665.99, 754.97, 801.54, 819.15, 879.73, 842, 830.1, 827.37, 882.64, 817.35, 910.75, 987.5, 991.3, 1088.93, 1095.21, 1071.98, 1011.8, 1031.89, 959.36, 920.15, 982.35, 1057.65, 1134.35, 1075.26, 1036.22, 993.02] },
      velocityScore: { '1D': -9.3, '1W': -5.1, '1M': -8.5, '6M': null }, isNew: false,
      marketCap: '$264B', pe: 28.5, revenueGrowth: 16, eps: 34.87, grossMargin: 20, dividendYield: 0.2,
      etfPresence: { POW: 3.33, VOLT: 4.16, PBD: false, PBW: false, IVEP: 3.77 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 3, avgWeight: 3.35, proScore: 2.01, coverage: 0.6,
      price: 480.75, weeklyPrices: [488.67, 484.98, 479.93, 476.84, 480.75], weeklyChange: -1.62, dayChange: 0.78, sortRank: 0, periodReturns: { '1M': -5.7, 'YTD': 8.3, '6M': -1, '1Y': 10.5 },
      priceHistory: { '1D': [477.02, 480.62, 480.75], '1W': [488.67, 484.98, 479.93, 476.84, 480.75], '1M': [509.96, 518.18, 536.04, 517.02, 514.71, 523.2, 490.12, 487.1, 495.6, 478.89, 485.41, 490.94, 477.03, 483.89, 479.92, 482.04, 488.67, 484.98, 479.93, 476.84, 480.75], 'YTD': [444.11, 470.53, 489.31, 484.14, 503.86, 516.03, 526.56, 511.63, 471.54, 472.64, 505.62, 490.74, 534.67, 521.71, 553.07, 508.43, 490.16, 461.5, 484.25, 485.27, 469.32, 539.39, 514.71, 480.5, 479.92, 480.75], '6M': [485.53, 487.94, 503.8, 524.12, 516.99, 516.98, 487.76, 472.64, 489.07, 472.07, 499.31, 545.62, 549.11, 555.34, 516, 490.16, 470.87, 478.05, 480.46, 486.47, 502.65, 518.18, 490.12, 485.41, 482.04, 480.75], '1Y': [434.95, 437.44, 423.57, 443.95, 429.96, 446.06, 437.16, 442.33, 433.26, 431.16, 430.47, 419.67, 434.05, 422.63, 472.57, 468.06, 453, 419.09, 428.47, 437.71, 448.18, 429.68, 456.28, 463.03, 470.53, 489.31, 486.82, 495.59, 506.14, 524.25, 526.75, 488.49, 487.76, 472.64, 489.07, 472.07, 499.31, 545.62, 549.11, 544.71, 507.81, 485.98, 461.5, 484.25, 484.91, 486.47, 502.65, 518.18, 490.12, 485.41, 482.04, 480.75] },
      velocityScore: { '1D': -1, '1W': 5.8, '1M': 10.4, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 28.4, revenueGrowth: 11, eps: 16.93, grossMargin: 36, dividendYield: 1.19,
      etfPresence: { POW: 2.95, VOLT: 4.32, PBD: false, PBW: false, IVEP: 2.77 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 3, avgWeight: 3.27, proScore: 1.96, coverage: 0.6,
      price: 158.53, weeklyPrices: [154.92, 154.78, 160.68, 158.47, 158.53], weeklyChange: 2.33, dayChange: -0.07, sortRank: 0, periodReturns: { '1M': -5.8, 'YTD': 55.5, '6M': 43.7, '1Y': 106.9 },
      priceHistory: { '1D': [158.64, 158.8, 158.53], '1W': [154.92, 154.78, 160.68, 158.47, 158.53], '1M': [168.37, 167.55, 171.91, 162.92, 163.35, 169.61, 159.99, 152.15, 156.89, 153.18, 158.05, 160.72, 158.02, 161.78, 159.46, 153.65, 154.92, 154.78, 160.68, 158.47, 158.53], 'YTD': [101.97, 105.38, 112.5, 113.16, 119.43, 112.75, 116.88, 118.36, 106.02, 114.3, 125.61, 118.28, 128.63, 129.7, 142.17, 158.92, 173.39, 158.23, 167.8, 173.88, 164.52, 184.34, 163.35, 154.76, 159.46, 158.53], '6M': [110.29, 112.26, 112.64, 113.25, 114.93, 120.27, 108.13, 114.3, 121, 112.75, 118.92, 134.48, 137, 141.71, 162.69, 173.39, 160.69, 169.29, 173.39, 163.8, 167.34, 167.55, 159.99, 158.05, 153.65, 158.53], '1Y': [76.63, 78.72, 90.24, 90.61, 88.04, 91.11, 91.93, 94.98, 96.46, 97.27, 100.12, 98.72, 101.1, 96.93, 106.28, 112.5, 111.46, 105.74, 106.53, 108.27, 108.87, 94.99, 103.97, 106.82, 105.38, 112.5, 110.58, 115.79, 114.62, 115.22, 118.22, 111.65, 108.13, 114.3, 121, 112.75, 118.92, 134.48, 137, 138.3, 169.41, 170.74, 158.23, 167.8, 176.39, 163.8, 167.34, 167.55, 159.99, 158.05, 153.65, 158.53] },
      velocityScore: { '1D': -2, '1W': 0, '1M': -7.5, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 53.7, revenueGrowth: 54, eps: 2.95, grossMargin: 37, dividendYield: 0.53,
      etfPresence: { POW: 3.95, VOLT: 3.05, PBD: false, PBW: false, IVEP: 2.82 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy Corp', easyScore: 3, avgWeight: 2.6, proScore: 1.56, coverage: 0.6,
      price: 217.75, weeklyPrices: [214.96, 197.06, 226.26, 218.22, 217.75], weeklyChange: 1.3, dayChange: -0.22, sortRank: 0, periodReturns: { '1M': -32.4, 'YTD': 150.6, '6M': 50.3, '1Y': 709.8 },
      priceHistory: { '1D': [218.22, 217.16, 217.75], '1W': [214.96, 197.06, 226.26, 218.22, 217.75], '1M': [321.98, 326.19, 309.18, 252.02, 275.01, 302.7, 289.5, 270.89, 295.05, 269.57, 257.02, 244.61, 233.49, 243.4, 239.38, 206.73, 214.96, 197.06, 226.26, 218.22, 217.75], 'YTD': [86.89, 134.07, 149.5, 152.31, 168.89, 155.54, 159, 155.67, 135.19, 153.68, 145.88, 135.49, 160.13, 210.06, 231.17, 290.52, 283.92, 261.34, 293.8, 291.37, 248.88, 345.85, 275.01, 254.29, 239.38, 217.75], '6M': [144.89, 151.37, 143.03, 139.74, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 234.68, 288.64, 283.92, 258.71, 302.4, 302.85, 259.61, 280.88, 326.19, 289.5, 257.02, 206.73, 217.75], '1Y': [26.89, 37.62, 38.86, 44.08, 44.51, 50.85, 54.91, 62.96, 79.67, 69.18, 90.19, 87.58, 116.58, 94.37, 133.71, 141.41, 126.72, 108.93, 101.14, 118.09, 101.29, 76.97, 91.88, 98.69, 134.07, 149.5, 139.62, 156.13, 155.17, 145.32, 166.2, 153.02, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 261.34, 293.8, 287.32, 259.61, 280.88, 326.19, 289.5, 257.02, 206.73, 217.75] },
      velocityScore: { '1D': -4.3, '1W': -4.3, '1M': -41.6, '6M': null }, isNew: false,
      marketCap: '$62B', pe: null, revenueGrowth: 130, eps: -0.04, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: 1.37, VOLT: 3.23, PBD: false, PBW: false, IVEP: 3.21 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'NRG', name: 'NRG Energy Inc', easyScore: 3, avgWeight: 1.51, proScore: 0.9, coverage: 0.6,
      price: 139.85, weeklyPrices: [129.11, 130.58, 131.60, 139.98, 139.85], weeklyChange: 8.32, dayChange: -0.06, sortRank: 0, periodReturns: { '1M': 1.6, 'YTD': -12.2, '6M': -6.3, '1Y': -12.9 },
      priceHistory: { '1D': [139.93, 139.45, 139.85], '1W': [129.11, 130.58, 131.6, 139.98, 139.85], '1M': [137.66, 142.21, 147.11, 149.36, 149.11, 146.06, 140.8, 136.7, 141.01, 138.01, 140.48, 140.42, 139.48, 138.36, 137.9, 132.75, 129.11, 130.58, 131.6, 139.98, 139.85], 'YTD': [159.24, 149.27, 152.05, 156.04, 152.18, 160.63, 175.01, 178.96, 154.32, 152.48, 151.13, 146.14, 161.78, 168.5, 159.81, 153.37, 137.3, 123.71, 138, 133.39, 123.7, 138.91, 149.11, 137.48, 137.9, 139.85], '6M': [149.3, 152.63, 153.32, 172.35, 176.52, 175.58, 155.42, 152.48, 151.77, 141.23, 153.06, 170.96, 149.86, 160.15, 154.82, 137.3, 125.5, 140.43, 133.51, 129.96, 132.1, 142.21, 140.8, 140.48, 132.75, 139.85], '1Y': [160.55, 166.59, 148.56, 155, 148.19, 148.12, 147.95, 161.21, 164.58, 165.58, 161.91, 167.52, 171.33, 160.42, 178.5, 173.19, 168.84, 168.8, 168.54, 169.36, 168.16, 149.48, 160.56, 166.16, 149.27, 152.05, 149.93, 149.11, 155.72, 173.45, 184.03, 162.06, 155.42, 152.48, 151.77, 141.23, 153.06, 170.96, 149.86, 154.81, 157.43, 137.34, 123.71, 138, 133.76, 129.96, 132.1, 142.21, 140.8, 140.48, 132.75, 139.85] },
      velocityScore: { '1D': 5.9, '1W': 1.1, '1M': 40.6, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 153.7, revenueGrowth: 20, eps: 0.91, grossMargin: 16, dividendYield: 1.36,
      etfPresence: { POW: 0.56, VOLT: 1.05, PBD: false, PBW: false, IVEP: 2.91 },
      tonyNote: 'NRG Energy Inc appears in 3 of 5 Electrification ETFs (60% coverage) with average weight 1.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, avgWeight: 5.75, proScore: 2.3, coverage: 0.4,
      price: 281.85, weeklyPrices: [266.80, 270.56, 266.11, 281.51, 281.85], weeklyChange: 5.64, dayChange: -0.07, sortRank: 0, periodReturns: { '1M': -7.4, 'YTD': 66.2, '6M': 40.7, '1Y': 163.2 },
      priceHistory: { '1W': [266.8, 270.56, 266.11, 281.51, 281.85], '1M': [304.33, 288.64, 294.15, 310.32, 310.64, 315.65, 333.04, 318.06, 266.94, 277.45, 258.67, 267.69, 272.58, 263.26, 279.39, 275, 266.8, 270.56, 266.11, 281.51, 281.85], 'YTD': [169.63, 187.43, 200.11, 210.66, 217.25, 238.4, 230.06, 229.71, 191.87, 205.11, 214.98, 197.98, 228.29, 241.49, 268.31, 283.6, 297.98, 258.28, 276.25, 280.09, 276.95, 296.39, 310.64, 251.53, 279.39, 281.85], '6M': [200.29, 210.44, 208, 231.48, 235.04, 229.71, 191.87, 197.65, 204.09, 203.53, 206.9, 237.93, 254.38, 276.65, 283.6, 297.98, 256.72, 270.01, 269.86, 279.13, 302.15, 288.64, 333.04, 258.67, 275, 281.85], '1Y': [107.07, 125.91, 131.1, 134.58, 128.41, 140.42, 138.07, 145.68, 144.6, 142.27, 142.5, 146.89, 150.77, 148.25, 152.46, 154.86, 152.12, 144.07, 150.84, 159.74, 172.82, 164.18, 176.17, 172.78, 187.43, 200.11, 196.5, 201.19, 220.78, 232.84, 231.83, 222.45, 191.81, 205.11, 214.98, 197.83, 206.9, 237.93, 254.38, 250.96, 286.69, 302.73, 258.28, 276.25, 269.22, 276.04, 302.15, 288.64, 333.04, 258.67, 275, 281.85] },
      velocityScore: { '1D': 0, '1W': 3.6, '1M': 4.5, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 67.9, revenueGrowth: 17, eps: 4.15, grossMargin: 39, dividendYield: 0.1,
      etfPresence: { POW: 3.77, VOLT: 7.72, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 2, avgWeight: 5.39, proScore: 2.16, coverage: 0.4,
      price: 243.61, weeklyPrices: [232.79, 228.28, 244.39, 240.68, 243.61], weeklyChange: 4.65, dayChange: 1.22, sortRank: 0, periodReturns: { '1M': -16.4, 'YTD': 129.3, '6M': 74.9, '1Y': 211.1 },
      priceHistory: { '1D': [240.68, 241.96, 243.61], '1W': [232.79, 228.28, 244.39, 240.68, 243.61], '1M': [291.5, 294.49, 309.2, 279.77, 281.09, 286.36, 264.86, 246.33, 248.05, 234.05, 236.58, 232.19, 225.66, 234.25, 247.01, 235.79, 232.79, 228.28, 244.39, 240.68, 243.61], 'YTD': [106.26, 121.83, 139.99, 147.43, 151.08, 197.45, 178.79, 174.53, 161.22, 170.61, 186.82, 180.36, 230.81, 232.81, 252.76, 275.33, 322.05, 261.58, 295.94, 300.06, 290.5, 307.8, 281.09, 231.85, 247.01, 243.61], '6M': [139.32, 147.86, 194.74, 195.02, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 260.52, 269.95, 322.05, 266.8, 291.97, 299.07, 283.51, 292.7, 294.49, 264.86, 236.58, 235.79, 243.61], '1Y': [78.32, 76.88, 75.95, 86.57, 82.17, 91.46, 90.24, 92.33, 97.11, 97.88, 105.74, 105.13, 109.92, 110.96, 136.12, 131.92, 118.74, 95.1, 107.26, 112.31, 119.95, 105.77, 112.06, 117.51, 121.83, 139.99, 141.15, 146.79, 187.3, 187.21, 186.39, 170.37, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 261.58, 295.94, 299.73, 283.51, 292.7, 294.49, 264.86, 236.58, 235.79, 243.61] },
      velocityScore: { '1D': -1.4, '1W': -1.4, '1M': -31.6, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 47.5, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.15,
      etfPresence: { POW: 4.43, VOLT: 6.35, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 3.67, proScore: 1.47, coverage: 0.4,
      price: 133.33, weeklyPrices: [132.14, 131.05, 130.48, 133.07, 133.33], weeklyChange: 0.9, dayChange: 0.2, sortRank: 0, periodReturns: { '1M': -0.3, 'YTD': 15.6, '6M': 14.3, '1Y': 22.4 },
      priceHistory: { '1D': [133.07, 133.2, 133.33], '1W': [132.14, 131.05, 130.48, 133.07, 133.33], '1M': [133.74, 134.96, 137, 138.69, 137.97, 136.81, 135.05, 138.51, 135.98, 137.53, 133.85, 135.43, 135.63, 134.94, 132.5, 133.13, 132.14, 131.05, 130.48, 133.07, 133.33], 'YTD': [115.31, 116.91, 119.96, 119.43, 120.67, 122.25, 128.42, 133.82, 131.87, 134.15, 128.8, 131.08, 137.15, 134.56, 134.73, 136.91, 130.7, 128.92, 129.57, 127.79, 128.48, 130.3, 137.97, 135.9, 132.5, 133.33], '6M': [116.63, 119.78, 120.8, 129.94, 132.03, 133.29, 131.86, 134.15, 127.92, 131.12, 132.92, 135.46, 131.89, 135.07, 134.66, 130.7, 127.68, 130.9, 127.11, 127.76, 129.75, 134.96, 135.05, 133.85, 133.13, 133.33], '1Y': [108.89, 113.25, 113.49, 113.11, 113.55, 112.89, 108.64, 108.34, 107.52, 108.88, 112.75, 118.19, 118.53, 117.27, 122.11, 119.76, 122.68, 121.71, 122.72, 118.04, 114.16, 114.71, 115.31, 115.81, 116.91, 119.96, 118.02, 118.33, 121.1, 130.24, 132.39, 131.92, 131.86, 134.15, 127.92, 131.12, 132.92, 135.46, 131.89, 135.59, 137.04, 131.94, 128.92, 129.57, 126.31, 127.76, 129.75, 134.96, 135.05, 133.85, 133.13, 133.33] },
      velocityScore: { '1D': 1.4, '1W': 1.4, '1M': 37.4, '6M': null }, isNew: false,
      marketCap: '$73B', pe: 19.7, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.86,
      etfPresence: { POW: 2.86, VOLT: 4.48, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.19, proScore: 1.28, coverage: 0.4,
      price: 305.65, weeklyPrices: [289.56, 291.67, 304.50, 301.16, 305.65], weeklyChange: 5.56, dayChange: 1.47, sortRank: 0, periodReturns: { '1M': -4, 'YTD': 88.7, '6M': 67.5, '1Y': 134.8 },
      priceHistory: { '1D': [301.22, 306.45, 305.65], '1W': [289.56, 291.67, 304.5, 301.16, 305.65], '1M': [318.32, 316.43, 325.57, 303.95, 306.97, 334.82, 311.42, 300.53, 318.47, 305.58, 323.92, 318.86, 305.87, 303.58, 304.57, 294.11, 289.56, 291.67, 304.5, 301.16, 305.65], 'YTD': [162.01, 163.58, 176.93, 189.21, 190.15, 248.51, 243.06, 254.89, 241.78, 264.74, 270.89, 250.58, 287.64, 294.13, 323.46, 328.31, 367.92, 322.63, 319.78, 323.92, 297.88, 357.96, 306.97, 317.81, 304.57, 305.65], '6M': [182.49, 186.18, 195.58, 234.53, 245.42, 257.75, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 322.43, 330.97, 367.92, 339.73, 323.91, 334.49, 289.52, 299.6, 316.43, 311.42, 323.92, 294.11, 305.65], '1Y': [130.19, 144.17, 139.75, 137.4, 127.54, 129.31, 125.7, 136.74, 136.83, 141.62, 161.59, 167.38, 180.51, 171.59, 199.27, 190.71, 173.37, 170.65, 172.02, 182.54, 181.82, 149.83, 166.87, 175.61, 163.58, 176.93, 181.23, 190.01, 202, 243.53, 253.15, 244.44, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 322.63, 319.78, 331.44, 289.52, 299.6, 316.43, 311.42, 323.92, 294.11, 305.65] },
      velocityScore: { '1D': -0.8, '1W': -2.3, '1M': -9.2, '6M': null }, isNew: false,
      marketCap: '$117B', pe: 76.8, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 2.46, PBD: false, PBW: false, IVEP: 3.92 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 2.96, proScore: 1.19, coverage: 0.4,
      price: 74.97, weeklyPrices: [73.38, 74.16, 73.36, 74.49, 74.97], weeklyChange: 2.16, dayChange: 0.65, sortRank: 0, periodReturns: { '1M': -1.1, 'YTD': 24.7, '6M': 15.4, '1Y': 29.9 },
      priceHistory: { '1D': [74.48, 75.01, 74.97], '1W': [73.38, 74.16, 73.36, 74.49, 74.97], '1M': [75.79, 75.87, 77.53, 77.92, 75.06, 74.34, 72.77, 73.14, 72.82, 75.08, 75.45, 75.02, 74.46, 75.98, 74.38, 74.73, 73.38, 74.16, 73.36, 74.49, 74.97], 'YTD': [60.11, 60.32, 61.55, 65.48, 68.5, 71.12, 72.17, 74.72, 74.24, 73.89, 74.46, 72.78, 72.82, 70.86, 72.18, 75.54, 74.18, 79.4, 74.37, 72.43, 71.62, 74.95, 75.06, 75.27, 74.38, 74.97], '6M': [64.96, 67.26, 66.92, 72.28, 72.98, 76.26, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 71.61, 75.41, 74.18, 77.69, 76.34, 71.31, 71.59, 71.48, 75.87, 72.77, 75.45, 74.73, 74.97], '1Y': [57.71, 59.24, 58.64, 57.86, 57.22, 57.49, 57.58, 58.76, 59.02, 62.86, 63.69, 63.5, 63.78, 62.16, 56.98, 57.54, 60.43, 58.89, 60.22, 63.66, 60.5, 58.84, 59.46, 60.85, 60.32, 61.55, 64.29, 66.34, 67.85, 71.96, 73.5, 75.88, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 79.4, 74.37, 71.66, 71.59, 71.48, 75.87, 72.77, 75.45, 74.73, 74.97] },
      velocityScore: { '1D': 1.7, '1W': -1.7, '1M': 19, '6M': null }, isNew: false,
      marketCap: '$92B', pe: 32.9, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.82,
      etfPresence: { POW: false, VOLT: 2.04, PBD: false, PBW: false, IVEP: 3.89 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 3.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CEG', name: 'Constellation Energy Corp', easyScore: 2, avgWeight: 2.82, proScore: 1.13, coverage: 0.4,
      price: 274.13, weeklyPrices: [252.39, 253.50, 262.22, 274.90, 274.13], weeklyChange: 8.61, dayChange: -0.28, sortRank: 0, periodReturns: { '1M': 1.4, 'YTD': -22.4, '6M': -5.2, '1Y': -15.3 },
      priceHistory: { '1D': [274.9, 274.14, 274.13], '1W': [252.39, 253.5, 262.22, 274.9, 274.13], '1M': [270.26, 267.97, 268.69, 264.02, 259.32, 248.37, 236.5, 239.25, 245.87, 239.71, 250.74, 251.38, 257.57, 256.43, 258.11, 251.77, 252.39, 253.5, 262.22, 274.9, 274.13], 'YTD': [353.27, 342.52, 307.71, 288.76, 268.45, 276.85, 291.66, 329.88, 319.06, 305.58, 294.85, 279.25, 280.25, 299.14, 313.53, 307.81, 299.69, 260.67, 288.68, 264.59, 246.71, 275.53, 259.32, 244.52, 258.11, 274.13], '6M': [289.06, 280.68, 261.42, 288.43, 293.8, 327.16, 322.99, 305.58, 289.76, 298.61, 272.58, 296.61, 277.7, 315.17, 321.05, 299.69, 262, 301.57, 272.65, 251.65, 268, 267.97, 236.5, 250.74, 251.77, 274.13], '1Y': [323.7, 345.27, 338.46, 327.63, 314.21, 315.94, 309.06, 320, 321.27, 339.13, 350.9, 371, 403.95, 350.06, 401.43, 363.25, 354.02, 357.48, 359.09, 368.62, 362.07, 340.97, 363.95, 366.25, 342.52, 307.71, 285.27, 270.88, 272.15, 303.01, 312.64, 324.87, 322.99, 305.58, 289.76, 298.61, 272.58, 296.61, 277.7, 305.71, 320.42, 293.6, 260.67, 288.68, 267.24, 251.65, 268, 267.97, 236.5, 250.74, 251.77, 274.13] },
      velocityScore: { '1D': 4.6, '1W': 2.7, '1M': 20.2, '6M': null }, isNew: false,
      marketCap: '$98B', pe: 23.8, revenueGrowth: 64, eps: 11.52, grossMargin: 23, dividendYield: 0.62,
      etfPresence: { POW: 1.44, VOLT: false, PBD: false, PBW: false, IVEP: 4.2 },
      tonyNote: 'Constellation Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.76, proScore: 1.11, coverage: 0.4,
      price: 158.43, weeklyPrices: [151.20, 150.51, 157.81, 157.51, 158.43], weeklyChange: 4.78, dayChange: 0.6, sortRank: 0, periodReturns: { '1M': -0.2, 'YTD': 17.2, '6M': 4.9, '1Y': 57.3 },
      priceHistory: { '1D': [157.49, 158.91, 158.43], '1W': [151.2, 150.51, 157.81, 157.51, 158.43], '1M': [158.7, 162.78, 165.15, 163.72, 166.42, 176.32, 172.22, 164.59, 166.81, 158.61, 162.24, 159.06, 155.99, 158.37, 157.04, 153.14, 151.2, 150.51, 157.81, 157.51, 158.43], 'YTD': [135.14, 140.16, 154.39, 166.25, 147.06, 144.04, 151.2, 146.06, 131.87, 136.8, 127.96, 126.35, 137.68, 148.96, 149.71, 142.3, 122.47, 119.2, 140.24, 146.77, 152.46, 165.96, 166.42, 158.22, 157.04, 158.43], '6M': [150.99, 144.08, 136.23, 146.72, 147.82, 135.16, 136.06, 136.8, 130.67, 119.15, 128.38, 148.72, 151.93, 148.64, 141.03, 122.47, 121.72, 139.56, 148.4, 154.07, 158.81, 162.78, 172.22, 162.24, 153.14, 158.43], '1Y': [100.71, 105.49, 109.5, 109.83, 108.65, 110.13, 112.75, 119.09, 118.41, 123.13, 124.66, 125.79, 125.6, 128.93, 139.75, 138.87, 141.92, 136.66, 138.72, 139.46, 138.68, 126.51, 137.94, 139.71, 140.16, 154.39, 155.56, 144.93, 144.2, 148.57, 151.5, 129.58, 136.06, 136.8, 130.67, 119.15, 128.38, 148.72, 151.93, 143.72, 136.69, 127.87, 119.2, 140.24, 147.62, 154.07, 158.81, 162.78, 172.22, 162.24, 153.14, 158.43] },
      velocityScore: { '1D': 0, '1W': 0.9, '1M': null, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 45.5, revenueGrowth: 58, eps: 3.48, grossMargin: 38, dividendYield: 0.63,
      etfPresence: { POW: 1.06, VOLT: 4.47, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.66, proScore: 1.07, coverage: 0.4,
      price: 144.42, weeklyPrices: [140.46, 139.37, 141.71, 142.49, 144.42], weeklyChange: 2.82, dayChange: 1.36, sortRank: 0, periodReturns: { '1M': 2.2, 'YTD': 20.6, '6M': 27.1, '1Y': 31.1 },
      priceHistory: { '1D': [142.48, 144.43, 144.42], '1W': [140.46, 139.37, 141.71, 142.49, 144.42], '1M': [141.28, 142.81, 145.49, 138.4, 140.47, 146.11, 144.8, 140.76, 142.72, 140.62, 140.53, 142.81, 143.93, 145.24, 142.76, 141.26, 140.46, 139.37, 141.71, 142.49, 144.42], 'YTD': [119.75, 110.85, 114.61, 116.96, 124.01, 140.96, 142.7, 144.3, 132.4, 131.69, 136.43, 130.95, 141.85, 137.55, 141.92, 145.08, 141.78, 135.42, 138.2, 147.4, 144.01, 148.21, 140.47, 140.23, 142.76, 144.42], '6M': [113.59, 119.26, 137.65, 139.24, 142.83, 145.46, 133.09, 131.69, 133.27, 126.58, 133.15, 142.05, 139.72, 143.38, 144.4, 141.78, 137.31, 140.22, 141.99, 147.75, 145.17, 142.81, 144.8, 140.53, 141.26, 144.42], '1Y': [110.13, 104.02, 104.67, 105.77, 106, 109.27, 107.09, 107.8, 107.41, 106.54, 108.89, 108.43, 110.82, 108.54, 113.34, 120.86, 122.66, 114.42, 116.29, 114.2, 115.81, 116.38, 121.39, 122.31, 110.85, 114.61, 115.07, 122.98, 139, 142.21, 144.71, 139.58, 133.09, 131.69, 133.27, 126.58, 133.15, 142.05, 139.72, 141.59, 144.82, 141.04, 135.42, 138.2, 146.96, 147.75, 145.17, 142.81, 144.8, 140.53, 141.26, 144.42] },
      velocityScore: { '1D': 0.9, '1W': 0.9, '1M': 9.2, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 44.3, revenueGrowth: 8, eps: 3.26, grossMargin: 37, dividendYield: 1.12,
      etfPresence: { POW: false, VOLT: 1.47, PBD: false, PBW: false, IVEP: 3.86 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VST', name: 'Vistra Corp', easyScore: 2, avgWeight: 2.61, proScore: 1.04, coverage: 0.4,
      price: 166.75, weeklyPrices: [155.44, 157.99, 162.33, 166.74, 166.75], weeklyChange: 7.28, dayChange: 0.03, sortRank: 0, periodReturns: { '1M': 2.7, 'YTD': 3.4, '6M': 4.1, '1Y': -16.7 },
      priceHistory: { '1D': [166.71, 167.13, 166.75], '1W': [155.44, 157.99, 162.33, 166.74, 166.75], '1M': [162.39, 162.87, 167.77, 163.49, 162.38, 158.63, 153.16, 151.05, 157.22, 155.73, 157.98, 158.86, 158.12, 158.43, 160.23, 152.56, 155.44, 157.99, 162.33, 166.74, 166.75], 'YTD': [161.33, 166.37, 166.6, 164.26, 153, 160.15, 172.5, 173.89, 158.65, 161.99, 152.72, 150.33, 152.75, 165.53, 164.35, 155.28, 152.05, 134.71, 160.15, 153.7, 146.38, 167.26, 162.38, 154.82, 160.23, 166.75], '6M': [160.12, 158.35, 149.65, 171.49, 167.8, 165.99, 163.62, 161.99, 151.29, 147.54, 153.68, 163.97, 154.91, 166.58, 160.85, 152.05, 136.75, 164.56, 157.97, 146.22, 158.61, 162.87, 153.16, 157.98, 152.56, 166.75], '1Y': [200.12, 207.05, 200.85, 205.28, 192.91, 194.6, 189.73, 209.21, 208.31, 202.06, 201.51, 206.55, 210.85, 185.83, 199.37, 189.39, 178.27, 179.14, 176.8, 176.07, 165.17, 159.97, 161.96, 165.23, 166.37, 166.6, 158.81, 154.26, 152.97, 173.68, 171.62, 161.7, 163.62, 161.99, 151.29, 147.54, 153.68, 163.97, 154.91, 161.12, 160.38, 146.87, 134.71, 160.15, 153.8, 146.22, 158.61, 162.87, 153.16, 157.98, 152.56, 166.75] },
      velocityScore: { '1D': 2, '1W': 2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$56B', pe: 27.8, revenueGrowth: 43, eps: 5.99, grossMargin: 39, dividendYield: 0.55,
      etfPresence: { POW: 1.62, VOLT: false, PBD: false, PBW: false, IVEP: 3.59 },
      tonyNote: 'Vistra Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.59, proScore: 1.04, coverage: 0.4,
      price: 318.98, weeklyPrices: [284.05, 280.67, 303.71, 317.31, 318.98], weeklyChange: 12.3, dayChange: 0.52, sortRank: 0, periodReturns: { '1M': -12.6, 'YTD': 52.3, '6M': 21.7, '1Y': 123.3 },
      priceHistory: { '1D': [317.31, 318.97, 318.98], '1W': [284.05, 280.67, 303.71, 317.31, 318.98], '1M': [364.96, 359.61, 375.15, 348.11, 348.15, 372.87, 356.35, 311.27, 310.84, 287.73, 309.27, 308.05, 298.52, 305.2, 301.88, 285.89, 284.05, 280.67, 303.71, 317.31, 318.98], 'YTD': [209.37, 219.59, 253.86, 259.55, 263.03, 308.77, 320.64, 335.57, 290.78, 308.31, 356.38, 322.71, 374.98, 372.23, 387.24, 389.05, 354.97, 302.84, 328.34, 320.92, 340.4, 388.23, 348.15, 293.64, 301.88, 318.98], '6M': [262.19, 255.36, 273.26, 314.27, 329.24, 340.42, 305.02, 308.31, 329.78, 298.29, 339.32, 385.73, 385, 385.68, 387.03, 354.97, 309.06, 339.65, 312.28, 311.64, 350.45, 359.61, 356.35, 309.27, 285.89, 318.98], '1Y': [142.84, 144.07, 139.81, 162.52, 147.74, 153.73, 150.14, 157.25, 157.79, 170.77, 176.2, 174.92, 189.96, 190.46, 208.05, 225.8, 212.79, 198.89, 209.9, 214.65, 221.47, 204.49, 217.23, 221.99, 219.59, 253.86, 263.03, 261.82, 279.17, 314.12, 335.74, 322.47, 305.02, 308.31, 329.78, 298.29, 339.32, 385.73, 385, 369.08, 345.63, 339.42, 302.84, 328.34, 322.5, 311.64, 350.45, 359.61, 356.35, 309.27, 285.89, 318.98] },
      velocityScore: { '1D': 4, '1W': 6.1, '1M': 13, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 66.2, revenueGrowth: 26, eps: 4.82, grossMargin: 39, dividendYield: 0.13,
      etfPresence: { POW: 1.06, VOLT: 4.13, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'SO', name: 'Southern Co/The', easyScore: 2, avgWeight: 2.21, proScore: 0.89, coverage: 0.4,
      price: 95.68, weeklyPrices: [95.30, 94.46, 93.85, 95.80, 95.68], weeklyChange: 0.4, dayChange: -0.12, sortRank: 0, periodReturns: { '1M': 0.8, 'YTD': 9.7, '6M': 9.3, '1Y': 0.6 },
      priceHistory: { '1D': [95.8, 95.68, 95.68], '1W': [95.3, 94.46, 93.85, 95.8, 95.68], '1M': [94.93, 95.78, 95.91, 97.16, 96.75, 95.71, 95.12, 97.98, 95.99, 97.29, 95.17, 95.61, 96.47, 95.96, 94.6, 96.07, 95.3, 94.46, 93.85, 95.8, 95.68], 'YTD': [87.2, 87.01, 88.9, 88.84, 90.13, 90.86, 95.05, 97.38, 97.48, 99.11, 93.98, 96.52, 97.59, 94.9, 93.49, 96.71, 93.1, 94.14, 93.74, 91.62, 93.27, 93.43, 96.75, 96.38, 94.6, 95.68], '6M': [87.54, 89.31, 90.08, 94.95, 95.18, 97.23, 97.25, 99.11, 93.75, 96.93, 96.82, 95.96, 91.92, 93.77, 95.99, 93.1, 93.71, 94.09, 90.51, 92.95, 94.31, 95.78, 95.12, 95.17, 96.07, 95.68], '1Y': [95.13, 94.9, 94.68, 94.79, 94.93, 93.28, 91.87, 91.56, 91.63, 94.41, 94.8, 96.18, 99.72, 97.48, 93.51, 91.41, 91.89, 89.05, 90.24, 87.33, 84.08, 87.03, 87.17, 87.18, 87.01, 88.9, 88.16, 88.19, 89.38, 92, 95.81, 96.79, 97.25, 99.11, 93.75, 96.93, 96.82, 95.96, 91.92, 94.41, 95.9, 93.47, 94.14, 93.74, 90.49, 92.95, 94.31, 95.78, 95.12, 95.17, 96.07, 95.68] },
      velocityScore: { '1D': 2.3, '1W': 1.1, '1M': null, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 24.5, revenueGrowth: 8, eps: 3.91, grossMargin: 48, dividendYield: 3.17,
      etfPresence: { POW: 0.34, VOLT: false, PBD: false, PBW: false, IVEP: 4.09 },
      tonyNote: 'Southern Co/The appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'XEL', name: 'Xcel Energy Inc', easyScore: 2, avgWeight: 2.14, proScore: 0.86, coverage: 0.4,
      price: 80.23, weeklyPrices: [78.77, 78.67, 78.72, 80.19, 80.23], weeklyChange: 1.86, dayChange: 0.06, sortRank: 0, periodReturns: { '1M': -0.1, 'YTD': 8.6, '6M': 7, '1Y': 10.7 },
      priceHistory: { '1D': [80.19, 80.23, 80.23], '1W': [78.77, 78.67, 78.72, 80.19, 80.23], '1M': [80.33, 81.47, 81.75, 82.23, 81.98, 80.3, 79.7, 81.96, 80.37, 80.67, 79.02, 80.06, 80.48, 80.17, 79.25, 79.98, 78.77, 78.67, 78.72, 80.19, 80.23], 'YTD': [73.86, 74.26, 75.61, 76.33, 75.95, 77.92, 80.82, 83.36, 82.52, 81.63, 77.96, 79.44, 82.77, 81.05, 79.15, 82.58, 80.6, 79.73, 81, 77.77, 78.27, 78.81, 81.98, 79.62, 79.25, 80.23], '6M': [75.01, 76.06, 75.9, 81.59, 83.35, 83.8, 82.1, 81.63, 76.95, 79.17, 80.54, 79.83, 79.08, 79.41, 81.17, 80.6, 78.1, 80.78, 77.87, 77.87, 78.98, 81.47, 79.7, 79.02, 79.98, 80.23], '1Y': [72.5, 72.39, 73.3, 72.92, 73.17, 72.87, 72.24, 72.31, 72.05, 77.93, 80.31, 81.85, 81.8, 80.69, 79.69, 81.19, 80.72, 79.67, 81.25, 77.77, 74.62, 73.14, 74.09, 74.68, 74.26, 75.61, 75.73, 74.5, 76.43, 80.75, 83.91, 83.17, 82.1, 81.63, 76.95, 79.17, 80.54, 79.83, 79.08, 79.48, 81.45, 79.9, 79.73, 81, 77.39, 77.87, 78.98, 81.47, 79.7, 79.02, 79.98, 80.23] },
      velocityScore: { '1D': 2.4, '1W': null, '1M': 16.2, '6M': null }, isNew: false,
      marketCap: '$50B', pe: 23.1, revenueGrowth: 3, eps: 3.47, grossMargin: 46, dividendYield: 2.96,
      etfPresence: { POW: 2.25, VOLT: 2.03, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Xcel Energy Inc appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 5.26, proScore: 2.1, coverage: 0.4,
      price: 243.61, weeklyPrices: [232.79, 228.28, 244.39, 240.68, 243.61], weeklyChange: 4.65, dayChange: 1.22, sortRank: 0, periodReturns: { '1M': -16.4, 'YTD': 129.3, '6M': 74.9, '1Y': 211.1 },
      priceHistory: { '1D': [240.68, 241.96, 243.61], '1W': [232.79, 228.28, 244.39, 240.68, 243.61], '1M': [291.5, 294.49, 309.2, 279.77, 281.09, 286.36, 264.86, 246.33, 248.05, 234.05, 236.58, 232.19, 225.66, 234.25, 247.01, 235.79, 232.79, 228.28, 244.39, 240.68, 243.61], 'YTD': [106.26, 121.83, 139.99, 147.43, 151.08, 197.45, 178.79, 174.53, 161.22, 170.61, 186.82, 180.36, 230.81, 232.81, 252.76, 275.33, 322.05, 261.58, 295.94, 300.06, 290.5, 307.8, 281.09, 231.85, 247.01, 243.61], '6M': [139.32, 147.86, 194.74, 195.02, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 260.52, 269.95, 322.05, 266.8, 291.97, 299.07, 283.51, 292.7, 294.49, 264.86, 236.58, 235.79, 243.61], '1Y': [78.32, 76.88, 75.95, 86.57, 82.17, 91.46, 90.24, 92.33, 97.11, 97.88, 105.74, 105.13, 109.92, 110.96, 136.12, 131.92, 118.74, 95.1, 107.26, 112.31, 119.95, 105.77, 112.06, 117.51, 121.83, 139.99, 141.15, 146.79, 187.3, 187.21, 186.39, 170.37, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 261.58, 295.94, 299.73, 283.51, 292.7, 294.49, 264.86, 236.58, 235.79, 243.61] },
      velocityScore: { '1D': -0.5, '1W': 8.8, '1M': 5, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 47.5, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.15,
      etfPresence: { AIRR: 3.19, PRN: false, RSHO: 7.33, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.01, proScore: 2, coverage: 0.4,
      price: 894.07, weeklyPrices: [880.28, 864.30, 889.97, 889.31, 894.07], weeklyChange: 1.57, dayChange: 0.53, sortRank: 0, periodReturns: { '1M': -9.2, 'YTD': 56.1, '6M': 42.7, '1Y': 109.1 },
      priceHistory: { '1D': [889.38, 893.8, 894.07], '1W': [880.28, 864.3, 889.97, 889.31, 894.07], '1M': [984.24, 994.45, 1057.01, 997.47, 1033.19, 1064.9, 991.41, 963.53, 969.92, 940.12, 938.39, 952.41, 931.47, 933.34, 914.3, 877.17, 880.28, 864.3, 889.97, 889.31, 894.07], 'YTD': [572.87, 617.62, 646.89, 638.91, 702.89, 775, 760.53, 742.83, 680.9, 699.78, 716.63, 708.46, 787.07, 772.66, 830.79, 889.67, 926.79, 860.15, 909.93, 940.48, 897.63, 1022.28, 1033.19, 948.08, 914.3, 894.07], '6M': [626.62, 657.36, 726.2, 774.2, 756.47, 752.32, 704.82, 699.78, 701.7, 667.43, 724.44, 794.25, 800.45, 828.79, 874.78, 926.79, 863.95, 908.55, 909.81, 914.7, 945.46, 994.45, 991.41, 938.39, 877.17, 894.07], '1Y': [427.59, 434.12, 427.72, 413.7, 420.59, 432.67, 420.22, 422.91, 450.66, 469.79, 480.82, 502.12, 534.05, 513.91, 585.49, 569.15, 573.02, 553.11, 573.73, 599.15, 615.35, 561.89, 583.76, 598.41, 617.62, 646.89, 635.92, 690.91, 742.12, 764.76, 768.23, 722.18, 704.82, 699.78, 701.7, 667.43, 724.44, 794.25, 800.45, 817.87, 904.59, 912.14, 860.15, 909.93, 926.18, 914.7, 945.46, 994.45, 991.41, 938.39, 877.17, 894.07] },
      velocityScore: { '1D': 0, '1W': -1.5, '1M': -3.4, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 44.5, revenueGrowth: 22, eps: 20.1, grossMargin: 29, dividendYield: 0.73,
      etfPresence: { AIRR: false, PRN: 3.13, RSHO: 6.89, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.8, proScore: 1.52, coverage: 0.4,
      price: 345.19, weeklyPrices: [336.41, 335.94, 341.13, 341.44, 345.19], weeklyChange: 2.61, dayChange: 1.19, sortRank: 0, periodReturns: { '1M': 4.3, 'YTD': 34.4, '6M': 23.2, '1Y': 29.3 },
      priceHistory: { '1D': [341.13, 342.99, 345.19], '1W': [336.41, 335.94, 341.13, 341.44, 345.19], '1M': [330.9, 333.78, 343.54, 337.08, 334.16, 338.15, 332.08, 330.85, 328.53, 315.33, 322.49, 331.15, 329.35, 327.49, 327.65, 332.13, 336.41, 335.94, 341.13, 341.44, 345.19], 'YTD': [256.77, 272.25, 281.21, 262.34, 273.22, 290.31, 281.13, 282.58, 267.78, 256.83, 264.14, 265.32, 286.41, 284.39, 293.35, 302.99, 310.55, 302.64, 312.65, 313.67, 318.89, 338.07, 334.16, 315.88, 327.65, 345.19], '6M': [280.14, 260.41, 291.74, 279.84, 278.74, 283.54, 267.57, 256.83, 262.23, 258.01, 272.54, 292.01, 293.59, 298.1, 303.99, 310.55, 305.22, 311.33, 308.31, 322.81, 324.38, 333.78, 332.08, 322.49, 332.13, 345.19], '1Y': [267.01, 273.62, 264.97, 275.72, 262.46, 268.4, 267.96, 263.45, 259.5, 259.37, 257.98, 255.19, 247.97, 253.5, 254.1, 257.9, 256.26, 243.79, 257.32, 258.83, 264.32, 256.73, 264.33, 259.63, 272.25, 281.21, 281.54, 270.02, 282.45, 278.31, 282.27, 277.7, 267.57, 256.83, 262.23, 258.01, 272.54, 292.01, 293.59, 301.24, 305.48, 313.7, 302.64, 312.65, 313.39, 322.81, 324.38, 333.78, 332.08, 322.49, 332.13, 345.19] },
      velocityScore: { '1D': 0, '1W': -4.4, '1M': -3.2, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 32.6, revenueGrowth: 7, eps: 10.58, grossMargin: 30, dividendYield: 0.6,
      etfPresence: { AIRR: 1.56, PRN: false, RSHO: 6.04, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 3.79, proScore: 1.52, coverage: 0.4,
      price: 730.7, weeklyPrices: [638.56, 650.22, 694.40, 719.34, 730.70], weeklyChange: 14.43, dayChange: 1.58, sortRank: 0, periodReturns: { '1M': -18.1, 'YTD': 138.6, '6M': 107.9, '1Y': 188.7 },
      priceHistory: { '1D': [719.34, 729.99, 730.7], '1W': [638.56, 650.22, 694.4, 719.34, 730.7], '1M': [892.25, 867.23, 881.92, 804.76, 813.77, 839.36, 776.55, 700.75, 717.11, 674.39, 707.17, 682.29, 660.04, 679.62, 668.82, 641.35, 638.56, 650.22, 694.4, 719.34, 730.7], 'YTD': [306.23, 308.13, 350.96, 372.25, 386.78, 433.91, 415.13, 428.13, 395.11, 417.76, 446.16, 407.27, 435.65, 441.1, 497.18, 532.67, 868.18, 728.29, 782.12, 993.74, 838.55, 932.75, 813.77, 660.72, 668.82, 730.7], '6M': [351.39, 357.91, 401.29, 437.77, 434.64, 432.87, 411.38, 417.76, 422.55, 382.55, 382.22, 464.54, 472.84, 505.45, 529.49, 868.18, 770.76, 783.53, 875.52, 842.01, 857.76, 867.23, 776.55, 707.17, 641.35, 730.7], '1Y': [253.14, 263.35, 299.42, 292.47, 274.89, 289.36, 288.68, 301.13, 320.94, 344.05, 337.93, 366.99, 365.39, 332.75, 403.35, 411.07, 380.7, 334.17, 339.75, 332.29, 331.61, 283.57, 314, 319.16, 308.13, 350.96, 361.21, 367.95, 418.61, 421.2, 459.72, 415.51, 411.38, 417.76, 422.55, 382.55, 382.22, 464.54, 472.84, 471.85, 806, 851.35, 728.29, 782.12, 957.03, 842.01, 857.76, 867.23, 776.55, 707.17, 641.35, 730.7] },
      velocityScore: { '1D': 3.4, '1W': -16.5, '1M': -32.1, '6M': null }, isNew: false,
      marketCap: '$22B', pe: 65.1, revenueGrowth: 92, eps: 11.22, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 3.39, PRN: 4.2, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 3.52, proScore: 1.41, coverage: 0.4,
      price: 219.05, weeklyPrices: [215.96, 211.73, 212.86, 217.02, 219.05], weeklyChange: 1.43, dayChange: 0.94, sortRank: 0, periodReturns: { '1M': -11.1, 'YTD': 9.5, '6M': 0.9, '1Y': 24.8 },
      priceHistory: { '1W': [215.96, 211.73, 212.86, 217.02, 219.05], '1M': [246.41, 236.07, 237.22, 244.56, 231.87, 238.21, 245.17, 231.72, 227.74, 232.19, 213.56, 216.63, 219.87, 215.14, 218.02, 217.59, 215.96, 211.73, 212.86, 217.02, 219.05], 'YTD': [200.06, 207.51, 217.65, 215.68, 215.43, 233.46, 241.01, 226.94, 204.62, 203.42, 194.52, 199.94, 212.22, 215.27, 223.96, 208.13, 202.84, 200.47, 219.08, 234.08, 223.63, 242.97, 231.87, 218.83, 218.02, 219.05], '6M': [217.13, 211.84, 218.02, 230.92, 242.29, 226.94, 204.62, 199.45, 186.77, 200, 196.9, 221.27, 217.61, 222.82, 208.13, 202.84, 200.99, 207.8, 220.92, 229.95, 237.06, 236.07, 245.17, 213.56, 217.59, 219.05], '1Y': [175.58, 181.26, 203.53, 191.88, 186.26, 192.47, 182.65, 188, 184.91, 182.39, 185.92, 188.45, 185.21, 187.4, 200, 223.06, 221.42, 204.36, 215.7, 209.57, 217.69, 207.33, 208.48, 203.26, 207.51, 217.65, 211.03, 208.41, 222.32, 239, 237.18, 225.02, 209.8, 203.42, 194.52, 190.71, 196.9, 221.27, 217.61, 222.45, 201.12, 203.24, 200.47, 219.08, 230.08, 228.01, 237.06, 236.07, 245.17, 213.56, 217.59, 219.05] },
      velocityScore: { '1D': 0.7, '1W': 25.9, '1M': 24.8, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 41.8, revenueGrowth: 17, eps: 5.24, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 3.09, PRN: false, RSHO: 3.96, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 2, avgWeight: 3.31, proScore: 1.32, coverage: 0.4,
      price: 285.69, weeklyPrices: [272.43, 271.98, 279.00, 280.70, 285.69], weeklyChange: 4.87, dayChange: 1.73, sortRank: 0, periodReturns: { '1M': 3.8, 'YTD': 39.3, '6M': 32.9, '1Y': 53.3 },
      priceHistory: { '1D': [280.83, 284.88, 285.69], '1W': [272.43, 271.98, 279, 280.7, 285.69], '1M': [275.13, 276.06, 273.14, 268.87, 268.57, 268.86, 267.41, 270.41, 277.91, 275.43, 273.77, 270.85, 271.28, 276.78, 279.24, 271.19, 272.43, 271.98, 279, 280.7, 285.69], 'YTD': [205.02, 218.27, 224.89, 215.53, 213.49, 230.85, 251.3, 262.53, 250.13, 240.73, 239.51, 230.46, 254.06, 247.6, 242.44, 239.51, 273.58, 253.12, 258.02, 249.33, 264.6, 280.36, 268.57, 271.58, 279.24, 285.69], '6M': [214.89, 208.08, 223.16, 250.21, 257.04, 265.11, 254.14, 240.73, 236.04, 222.99, 236.02, 258.03, 247.72, 241.7, 239.7, 273.58, 256.99, 261.89, 250.72, 257.16, 277.42, 276.06, 267.41, 273.77, 271.19, 285.69], '1Y': [186.4, 192.14, 182.06, 176.8, 171.94, 175.65, 179.53, 183.8, 185.39, 190.22, 194.85, 191.65, 192.27, 191.23, 203.48, 206.31, 205.07, 202.06, 204.63, 196.27, 192.39, 191.19, 212.17, 211.71, 218.27, 224.89, 215.39, 207.21, 225.15, 252.55, 260.95, 258.84, 254.14, 240.73, 236.04, 222.99, 236.02, 258.03, 247.72, 240.43, 242.69, 269.76, 253.12, 258.02, 248.63, 257.16, 277.42, 276.06, 267.41, 273.77, 271.19, 285.69] },
      velocityScore: { '1D': 0, '1W': 0, '1M': 18.9, '6M': null }, isNew: false,
      marketCap: '$114B', pe: 66.1, revenueGrowth: 19, eps: 4.32, grossMargin: 35, dividendYield: 0.17,
      etfPresence: { AIRR: false, PRN: 4.3, RSHO: false, IDEF: 2.32, BILT: false },
      tonyNote: 'Howmet Aerospace is an aerospace structures and engine components manufacturer. It appears in Industrials ETFs for its aerospace and defense exposure — commercial air travel recovery and defense spending growth are the two demand drivers. Revenue grew and margins are expanding as Howmet prices power over OEM customers.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.29, proScore: 0.91, coverage: 0.4,
      price: 176.57, weeklyPrices: [171.18, 169.56, 173.09, 175.17, 176.57], weeklyChange: 3.15, dayChange: 0.82, sortRank: 0, periodReturns: { '1M': -15.9, 'YTD': 2.2, '6M': -15, '1Y': 23.2 },
      priceHistory: { '1D': [175.14, 176.57, 176.57], '1W': [171.18, 169.56, 173.09, 175.17, 176.57], '1M': [209.89, 205.65, 204.77, 197.91, 189.25, 194.65, 191.25, 191.06, 196.89, 186.08, 186.99, 186, 177.14, 179.83, 176.91, 173.74, 171.18, 169.56, 173.09, 175.17, 176.57], 'YTD': [172.84, 201.46, 217.89, 212.4, 210.88, 198.5, 209.07, 205.98, 195.23, 204.67, 204.76, 204.49, 230.29, 230.8, 223.15, 216.31, 210.8, 197.33, 198.95, 190.76, 194.68, 210, 189.25, 184.11, 176.91, 176.57], '6M': [207.75, 205.43, 197.19, 200.4, 198.38, 216.47, 200.39, 204.67, 204.85, 191.59, 214.44, 238.27, 216.66, 222.07, 216.68, 210.8, 201.94, 204.38, 187.26, 188.96, 196.93, 205.65, 191.25, 186.99, 173.74, 176.57], '1Y': [143.37, 152.38, 179.74, 176.76, 163.56, 165.6, 163.79, 166.13, 168.38, 175.02, 187.18, 197.01, 203.82, 191.17, 213.69, 198.12, 196.77, 179.81, 178.18, 178.33, 179.65, 168.12, 177.18, 181.85, 201.46, 217.89, 206.04, 206.04, 203, 201.09, 204.23, 205.83, 200.39, 204.67, 204.85, 191.59, 214.44, 238.27, 216.66, 216.18, 206.15, 206.83, 197.33, 198.95, 184.72, 188.96, 196.93, 205.65, 191.25, 186.99, 173.74, 176.57] },
      velocityScore: { '1D': 0, '1W': 1.1, '1M': -9.9, '6M': null }, isNew: false,
      marketCap: '$16B', pe: 47.1, revenueGrowth: 26, eps: 3.75, grossMargin: 23, dividendYield: 0.59,
      etfPresence: { AIRR: 3.02, PRN: false, RSHO: false, IDEF: 1.55, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 1.94, proScore: 0.77, coverage: 0.4,
      price: 49.25, weeklyPrices: [46.03, 45.94, 48.21, 47.89, 49.25], weeklyChange: 7, dayChange: 2.84, sortRank: 0, periodReturns: { '1M': -3.1, 'YTD': -35.1, '6M': -55.4, '1Y': -16.2 },
      priceHistory: { '1D': [47.89, 49.03, 49.28, 49.25], '1W': [46.03, 45.94, 48.21, 47.89, 49.25], '1M': [50.8, 47.95, 46.32, 47.21, 46.95, 49.86, 53.04, 55.35, 53.54, 50.34, 48.85, 48.19, 46.96, 50.36, 49.68, 46.96, 46.03, 45.94, 48.21, 47.89, 49.25], 'YTD': [75.91, 113.7, 130.72, 118.06, 103.37, 87.78, 105.67, 86.18, 87, 89.53, 77.49, 70.51, 68.33, 74.41, 61.26, 62.05, 56.99, 53.47, 57.3, 63.4, 58.78, 51.09, 46.95, 50.38, 49.68, 49.25], '6M': [110.39, 103.01, 94.41, 89.06, 94.31, 90.72, 92.47, 89.53, 83.69, 65.28, 71.96, 73.66, 68.55, 63.16, 61.93, 56.99, 54.22, 56.8, 63.27, 56.19, 56.34, 47.95, 53.04, 48.85, 46.96, 49.25], '1Y': [58.78, 58.01, 58.93, 68.75, 64.27, 67.92, 63.59, 65.66, 75.74, 81.18, 92.96, 105.67, 90.58, 84.3, 91.21, 77.41, 76.7, 70.67, 75.77, 77.68, 76.91, 69.77, 79.97, 79.29, 113.7, 130.72, 111.32, 96.16, 98.81, 91.97, 90.68, 88.95, 92.47, 89.53, 83.69, 65.28, 71.96, 73.66, 68.55, 61.66, 59.31, 57.33, 53.47, 57.3, 58.43, 56.19, 56.34, 47.95, 53.04, 48.85, 46.96, 49.25] },
      velocityScore: { '1D': -1.3, '1W': 6.9, '1M': 10, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 289.7, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.93, PRN: false, RSHO: false, IDEF: 0.94, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.68, proScore: 0.67, coverage: 0.4,
      price: 595, weeklyPrices: [575.22, 568.90, 585.35, 591.50, 595.00], weeklyChange: 3.44, dayChange: 0.58, sortRank: 0, periodReturns: { '1M': -6.1, 'YTD': 32.7, '6M': 18, '1Y': 52.8 },
      priceHistory: { '1W': [575.22, 568.9, 585.35, 591.5, 595], '1M': [633.44, 638.94, 648.89, 630.36, 634.78, 644.06, 620.47, 604.56, 609.6, 600.26, 595.61, 595.49, 584.59, 588.18, 590.14, 580.27, 575.22, 568.9, 585.35, 591.5, 595], 'YTD': [448.43, 487.16, 498.82, 504.54, 516.1, 550.53, 551.42, 575.92, 552.91, 546.91, 552.23, 543.12, 595.11, 571.61, 589.51, 595.76, 613.59, 565.22, 577.42, 589.76, 607.46, 645.73, 634.78, 593.89, 590.14, 595], '6M': [504.07, 499.67, 544.02, 552.44, 562.54, 584.89, 565.64, 546.91, 537.2, 524.38, 553.31, 598.23, 591.32, 591, 593.12, 613.59, 551.12, 584.4, 578.34, 592.41, 621.08, 638.94, 620.47, 595.61, 580.27, 595], '1Y': [389.3, 384.87, 404.38, 410.61, 392.76, 399.53, 391.1, 378.08, 379.79, 378.54, 384.8, 382.19, 372.71, 393.88, 408.94, 431.36, 445.34, 430.24, 443.29, 443.22, 447.58, 444.99, 458.38, 458.79, 487.16, 498.82, 504.5, 507.13, 548.2, 552.93, 571.57, 568.58, 565.64, 546.91, 537.2, 524.38, 553.31, 598.23, 591.32, 594.39, 607.5, 613.1, 565.22, 577.42, 584.18, 592.41, 621.08, 638.94, 620.47, 595.61, 580.27, 595] },
      velocityScore: { '1D': 1.5, '1W': 45.7, '1M': 39.6, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 65.3, revenueGrowth: 18, eps: 9.11, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 2.87, PRN: false, RSHO: false, IDEF: 0.49, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.67, proScore: 0.67, coverage: 0.4,
      price: 287.85, weeklyPrices: [269.13, 270.04, 268.76, 277.28, 287.85], weeklyChange: 6.96, dayChange: 3.8, sortRank: 0, periodReturns: { '1M': 1.5, 'YTD': -15.4, '6M': -31.2, '1Y': 8.4 },
      priceHistory: { '1D': [277.29, 288.5, 288.23, 287.85], '1W': [269.13, 270.04, 268.76, 277.28, 287.85], '1M': [283.48, 279.62, 279.09, 281.99, 277.39, 279.89, 278.97, 291.5, 294.1, 289.46, 286.21, 286.09, 284.86, 280, 277.79, 271.05, 269.13, 270.04, 268.76, 277.28, 287.85], 'YTD': [340.07, 386.99, 425.9, 422.79, 429.64, 392.7, 443.14, 444.52, 429.11, 416.59, 402.08, 379.9, 403.37, 396.17, 359.29, 360.6, 317.75, 324.6, 317.56, 294.53, 300.95, 278.19, 277.39, 289.47, 277.79, 287.85], '6M': [418.58, 420.51, 397.77, 418.78, 438.01, 453.73, 429.58, 416.59, 396.57, 369.08, 402.28, 398.07, 378.21, 358.4, 363.37, 317.75, 329.35, 320.95, 293.66, 297.52, 298.51, 279.62, 278.97, 286.21, 271.05, 287.85], '1Y': [265.56, 258.52, 267.49, 269.43, 267.09, 276.39, 269.98, 271.93, 272.46, 277.51, 286.01, 290.83, 284.96, 283.64, 298.42, 306.68, 317.89, 309.74, 314.31, 315.88, 323.14, 321.29, 355.45, 349.75, 386.99, 425.9, 413.56, 420.3, 405.82, 417.83, 447.73, 440.33, 429.58, 416.59, 396.57, 369.08, 402.28, 398.07, 378.21, 361.4, 326.13, 333.56, 324.6, 317.56, 287.54, 297.52, 298.51, 279.62, 278.97, 286.21, 271.05, 287.85] },
      velocityScore: { '1D': 3.1, '1W': -8.2, '1M': -2.9, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 18.7, revenueGrowth: 13, eps: 15.39, grossMargin: 12, dividendYield: 1.99,
      etfPresence: { AIRR: 2.32, PRN: false, RSHO: false, IDEF: 1.02, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 1.51, proScore: 0.61, coverage: 0.4,
      price: 49.32, weeklyPrices: [46.17, 44.88, 46.67, 47.59, 49.32], weeklyChange: 6.82, dayChange: 3.63, sortRank: 0, periodReturns: { '1M': 6.3, 'YTD': -32.6, '6M': -54.4, '1Y': 0.4 },
      priceHistory: { '1D': [47.59, 48.97, 49.32, 49.32], '1W': [46.17, 44.88, 46.67, 47.59, 49.32], '1M': [46.38, 44.84, 46.27, 46.42, 47.1, 49.92, 54.93, 56.37, 53.36, 51.47, 50.05, 50.01, 45.13, 45.83, 48.78, 47.45, 46.17, 44.88, 46.67, 47.59, 49.32], 'YTD': [73.17, 106.22, 108.5, 113.34, 111.72, 79.52, 88.46, 88.11, 100.54, 104.08, 101.84, 80.05, 84.22, 87.91, 70.22, 65.73, 58.82, 64.2, 63.52, 54.39, 49.58, 47.7, 47.1, 49.96, 48.78, 49.32], '6M': [108.22, 103.8, 95.36, 75.79, 81.27, 93.04, 106.09, 104.08, 102.39, 74.82, 82, 90.18, 82.06, 71.95, 65.32, 58.82, 66.21, 60.66, 54.65, 48.37, 51.7, 44.84, 54.93, 50.05, 47.45, 49.32], '1Y': [49.1, 50.39, 48.6, 51.83, 50.76, 54.65, 53.38, 62.22, 64.11, 66.91, 73.47, 76.6, 75.96, 77.21, 85.79, 79.73, 67.74, 60.93, 67.43, 66.48, 67.27, 64.94, 80.81, 76.85, 106.22, 108.5, 108.71, 102.87, 97.47, 75.11, 83.6, 91.11, 106.09, 104.08, 102.39, 74.82, 82, 90.18, 82.06, 70.3, 62.89, 62.48, 64.2, 63.52, 51.84, 48.37, 51.7, 44.84, 54.93, 50.05, 47.45, 49.32] },
      velocityScore: { '1D': 1.7, '1W': 38.6, '1M': 52.5, '6M': null }, isNew: false,
      marketCap: '$7B', pe: 214.4, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 2.84, PRN: false, RSHO: false, IDEF: 0.19, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AIR', name: 'AIRBUS GROUP', easyScore: 2, avgWeight: 1.43, proScore: 0.57, coverage: 0.4,
      price: 125.72, weeklyPrices: [135.34, 135.69, 141.40, 127.60, 125.72], weeklyChange: -7.11, dayChange: -1.37, sortRank: 0, periodReturns: { '1M': -4.9, 'YTD': 51.9, '6M': 19, '1Y': 58.2 },
      priceHistory: { '1D': [127.46, 126.36, 125.72], '1W': [135.34, 135.69, 141.4, 127.6, 125.72], '1M': [132.26, 132.94, 138.51, 143.14, 141.85, 142.93, 142.76, 140.11, 143.61, 136.63, 136.57, 135.67, 130.9, 134.46, 135.73, 133.48, 135.34, 135.69, 141.4, 127.6, 125.72], 'YTD': [82.79, 97.03, 105.08, 105.47, 109.89, 113.57, 115.55, 117.17, 108.52, 105.64, 107.81, 109.46, 123.04, 118.51, 110.54, 110.35, 117.57, 100.89, 112.82, 115.53, 127.23, 134.28, 141.85, 133.3, 135.73, 125.72], '6M': [105.66, 105.91, 113.09, 112.98, 116.69, 119.77, 107.87, 105.64, 103.49, 103.16, 113.86, 125.99, 116.54, 110.2, 109.56, 117.57, 103.79, 112.74, 110.61, 120.13, 129.96, 132.94, 142.76, 136.57, 133.48, 125.72], '1Y': [79.45, 75.82, 72.08, 78.68, 71.77, 75.82, 77.11, 74.05, 74.76, 81.62, 84.34, 84.01, 82.79, 81.33, 84.84, 83.6, 83.65, 78.56, 82.98, 83.79, 82.25, 81.21, 86.03, 84.45, 97.03, 105.08, 104.26, 108, 114.34, 113.54, 118.26, 116.84, 107.87, 105.64, 103.49, 103.16, 113.86, 125.99, 116.54, 108.86, 111.9, 111.51, 100.89, 112.82, 111.36, 120.13, 129.96, 132.94, 142.76, 136.57, 133.48, 125.72] },
      velocityScore: { '1D': 5.6, '1W': 5.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: 27.6, revenueGrowth: 23, eps: 4.56, grossMargin: 19, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 2.69, BILT: false },
      tonyNote: 'AIRBUS GROUP appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 1.26, proScore: 0.5, coverage: 0.4,
      price: 74.97, weeklyPrices: [73.38, 74.16, 73.36, 74.49, 74.97], weeklyChange: 2.16, dayChange: 0.65, sortRank: 0, periodReturns: { '1M': -1.1, 'YTD': 24.7, '6M': 15.4, '1Y': 29.9 },
      priceHistory: { '1D': [74.48, 75.01, 74.97], '1W': [73.38, 74.16, 73.36, 74.49, 74.97], '1M': [75.79, 75.87, 77.53, 77.92, 75.06, 74.34, 72.77, 73.14, 72.82, 75.08, 75.45, 75.02, 74.46, 75.98, 74.38, 74.73, 73.38, 74.16, 73.36, 74.49, 74.97], 'YTD': [60.11, 60.32, 61.55, 65.48, 68.5, 71.12, 72.17, 74.72, 74.24, 73.89, 74.46, 72.78, 72.82, 70.86, 72.18, 75.54, 74.18, 79.4, 74.37, 72.43, 71.62, 74.95, 75.06, 75.27, 74.38, 74.97], '6M': [64.96, 67.26, 66.92, 72.28, 72.98, 76.26, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 71.61, 75.41, 74.18, 77.69, 76.34, 71.31, 71.59, 71.48, 75.87, 72.77, 75.45, 74.73, 74.97], '1Y': [57.71, 59.24, 58.64, 57.86, 57.22, 57.49, 57.58, 58.76, 59.02, 62.86, 63.69, 63.5, 63.78, 62.16, 56.98, 57.54, 60.43, 58.89, 60.22, 63.66, 60.5, 58.84, 59.46, 60.85, 60.32, 61.55, 64.29, 66.34, 67.85, 71.96, 73.5, 75.88, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 79.4, 74.37, 71.66, 71.59, 71.48, 75.87, 72.77, 75.45, 74.73, 74.97] },
      velocityScore: { '1D': 0, '1W': -2, '1M': -10.7, '6M': null }, isNew: false,
      marketCap: '$92B', pe: 32.9, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.82,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.92, IDEF: false, BILT: 1.6 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.2, proScore: 0.48, coverage: 0.4,
      price: 100.62, weeklyPrices: [96.08, 94.73, 98.64, 98.92, 100.62], weeklyChange: 4.73, dayChange: 1.72, sortRank: 0, periodReturns: { '1M': -9.2, 'YTD': 37.8, '6M': 1.6, '1Y': 90.2 },
      priceHistory: { '1D': [98.92, 98.93, 101.24, 100.62], '1W': [96.08, 94.73, 98.64, 98.92, 100.62], '1M': [110.87, 105, 105.57, 109.38, 110.22, 122.33, 123.05, 126.21, 123.07, 115.83, 114.25, 107.98, 98.26, 100.32, 102.97, 96, 96.08, 94.73, 98.64, 98.92, 100.62], 'YTD': [73.01, 93.48, 103.02, 101.04, 99.28, 80.33, 89.86, 89.03, 86.42, 80.71, 74.49, 72.91, 79.23, 84.91, 77.99, 78.55, 91.95, 92.8, 97.11, 117.82, 119.32, 111.76, 110.22, 112.41, 102.97, 100.62], '6M': [99.05, 93.88, 82.2, 82.36, 85.9, 91.01, 89.36, 80.71, 78.29, 69.86, 77.53, 84.09, 83.36, 77.06, 78.53, 91.95, 93.39, 99.32, 112.87, 108.82, 112.44, 105, 123.05, 114.25, 96, 100.62], '1Y': [52.91, 53, 53.93, 68.39, 64.54, 68.13, 67.89, 71.7, 73.82, 74.27, 81.18, 83.92, 78.15, 75.54, 77.44, 78.19, 73.1, 67.55, 69.62, 71.35, 75.19, 69.63, 74.7, 76.03, 93.48, 103.02, 98.89, 93.89, 85.37, 83.32, 88.76, 89.43, 89.36, 80.71, 78.29, 69.86, 77.53, 84.09, 83.36, 76.53, 82.96, 92.32, 92.8, 97.11, 111.59, 108.82, 112.44, 105, 123.05, 114.25, 96, 100.62] },
      velocityScore: { '1D': 0, '1W': 14.3, '1M': 11.6, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.48, PRN: false, RSHO: false, IDEF: 0.92, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MWH', name: 'SOLV Energy, Inc. (Class A)', easyScore: 2, avgWeight: 0.96, proScore: 0.38, coverage: 0.4,
      price: 29.25, weeklyPrices: [28.41, 27.98, 28.54, 28.97, 29.25], weeklyChange: 2.94, dayChange: 0.95, sortRank: 0, periodReturns: { '1M': -10.4, 'YTD': -5.4, '6M': -5.4, '1Y': -5.4 },
      priceHistory: { '1D': [28.97, 29.15, 29.25], '1W': [28.41, 27.98, 28.54, 28.97, 29.25], '1M': [32.63, 34.46, 36.84, 35.84, 35.35, 34.05, 31.52, 30.45, 31.34, 29.03, 28.43, 28.92, 27.32, 28.81, 29.76, 28.74, 28.41, 27.98, 28.54, 28.97, 29.25], 'YTD': [30.91, 30.5, 30.29, 29.71, 28.88, 30, 28.45, 28.51, 28.9, 32.67, 34.47, 37.63, 39.84, 42.27, 46.77, 37.56, 39.48, 36.46, 33.18, 32.18, 34.46, 35.84, 31.34, 28.92, 28.41, 29.25], '6M': [30.91, 30.5, 30.29, 29.71, 28.88, 30, 28.45, 28.51, 28.9, 32.67, 34.47, 37.63, 39.84, 42.27, 46.77, 37.56, 39.48, 36.46, 33.18, 32.18, 34.46, 35.84, 31.34, 28.92, 28.41, 29.25], '1Y': [30.91, 31.86, 30.5, 31.34, 30.29, 31.53, 29.71, 27.04, 28.15, 28.54, 30, 28.5, 28.45, 29.48, 28.2, 30.03, 28.9, 28.94, 31.66, 33.97, 33.91, 34.85, 36.68, 37.99, 37.53, 40.65, 45.19, 42.07, 44.83, 44.82, 40.42, 38.72, 38.44, 38.11, 35.53, 36.46, 32.81, 32.8, 31.89, 32.18, 34.69, 34.46, 36.84, 35.35, 31.52, 31.34, 28.97, 28.92, 29.76, 28.41, 28.54, 29.25] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 46.4, revenueGrowth: 66, eps: 0.63, grossMargin: 19, dividendYield: null,
      etfPresence: { AIRR: 1.09, PRN: false, RSHO: 0.82, IDEF: false, BILT: false },
      tonyNote: 'SOLV Energy, Inc. (Class A) appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DCO', name: 'Ducommun Incorporated', easyScore: 2, avgWeight: 0.54, proScore: 0.22, coverage: 0.4,
      price: 175.07, weeklyPrices: [168.47, 168.66, 175.11, 174.59, 175.07], weeklyChange: 3.92, dayChange: 0.25, sortRank: 0, periodReturns: { '1M': 7.9, 'YTD': 84, '6M': 55.1, '1Y': 94.9 },
      priceHistory: { '1D': [174.63, 174.44, 175.07], '1W': [168.47, 168.66, 175.11, 174.59, 175.07], '1M': [162.26, 165.31, 170.41, 177.66, 184.42, 185.21, 190.25, 186.6, 189.18, 179.95, 170.84, 165.05, 163.5, 168.75, 174.45, 168.67, 168.47, 168.66, 175.11, 174.59, 175.07], 'YTD': [95.13, 107.75, 114.24, 111.29, 121.42, 120.52, 126.18, 123.59, 128.91, 126.91, 123.91, 122, 140.59, 136.61, 139.41, 141.24, 140.68, 141.75, 148.66, 150.14, 165, 164.9, 184.42, 172.64, 174.45, 175.07], '6M': [112.87, 113.35, 121.08, 123.96, 124.73, 130.28, 131.48, 126.91, 122.73, 117.1, 134.4, 141.29, 141.48, 141.43, 137.01, 140.68, 145.36, 150.03, 150.26, 156.28, 162.6, 165.31, 190.25, 170.84, 168.67, 175.07], '1Y': [89.85, 91.53, 91.37, 92.36, 87.8, 92.21, 91.37, 91.19, 94.96, 90.49, 95.43, 97.46, 92.89, 96.24, 93.42, 91.86, 96.02, 88.51, 91.19, 90.04, 92.47, 91.7, 97.99, 96.8, 107.75, 114.24, 110.46, 115.02, 122.48, 125.19, 125.8, 135.11, 131.48, 126.91, 122.73, 117.1, 134.4, 141.29, 141.48, 143.11, 142.56, 145.03, 141.75, 148.66, 146.92, 156.28, 162.6, 165.31, 190.25, 170.84, 168.67, 175.07] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: null, revenueGrowth: 9, eps: -1.73, grossMargin: 27, dividendYield: null,
      etfPresence: { AIRR: 0.73, PRN: false, RSHO: false, IDEF: 0.36, BILT: false },
      tonyNote: 'Ducommun Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.53, proScore: 0.21, coverage: 0.4,
      price: 47.02, weeklyPrices: [44.14, 44.41, 45.46, 45.91, 47.02], weeklyChange: 6.51, dayChange: 2.41, sortRank: 0, periodReturns: { '1M': 2.8, 'YTD': 37.9, '6M': 14.7, '1Y': -1.1 },
      priceHistory: { '1D': [45.91, 47, 47, 47.02], '1W': [44.14, 44.41, 45.46, 45.91, 47.02], '1M': [45.74, 44.69, 44.36, 42.48, 40.95, 42.67, 42.69, 43.72, 45.37, 45.47, 44.67, 44.15, 43.35, 44.37, 43.82, 43.1, 44.14, 44.41, 45.46, 45.91, 47.02], 'YTD': [34.09, 40.99, 42.57, 42.16, 41.51, 37.87, 41.07, 43.39, 46.58, 45.3, 44.06, 44.52, 47.1, 44.94, 39.98, 40.03, 41.49, 42.81, 45.35, 46.71, 49.69, 44.99, 40.95, 44.71, 43.82, 47.02], '6M': [40.99, 41.06, 38.93, 38.13, 38.14, 45.49, 47.41, 45.3, 44.4, 43.25, 46.19, 47.54, 43.2, 40.72, 40, 41.49, 42.84, 45.8, 47.39, 47.35, 45.59, 44.69, 42.69, 44.67, 43.1, 47.02], '1Y': [47.53, 43.24, 41.31, 41.9, 41.06, 42.03, 40.91, 41.14, 41.54, 42.55, 44.58, 45.43, 40.19, 39.94, 38.43, 35.76, 35.46, 33.43, 33.69, 34.31, 34.02, 32.55, 34.52, 34.78, 40.99, 42.57, 40.63, 40.45, 40.22, 39.13, 43.82, 45.51, 47.41, 45.3, 44.4, 43.25, 46.19, 47.54, 43.2, 40.18, 39.7, 42.87, 42.81, 45.35, 45.61, 47.35, 45.59, 44.69, 42.69, 44.67, 43.1, 47.02] },
      velocityScore: { '1D': 0, '1W': -8.7, '1M': -4.5, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 43.9, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.78,
      etfPresence: { AIRR: 0.74, PRN: false, RSHO: false, IDEF: 0.31, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.4, proScore: 0.16, coverage: 0.4,
      price: 86.49, weeklyPrices: [78.62, 80.54, 86.78, 87.00, 86.49], weeklyChange: 10.01, dayChange: -0.6, sortRank: 0, periodReturns: { '1M': 6.8, 'YTD': 29.1, '6M': 13.8, '1Y': 75.9 },
      priceHistory: { '1D': [87.01, 87.48, 87.26, 86.49], '1W': [78.62, 80.54, 86.78, 87, 86.49], '1M': [81, 82.36, 81.56, 79.53, 81.88, 82.97, 79.51, 76.75, 79.91, 74.87, 74.98, 75.89, 74.74, 77.77, 79.29, 78.89, 78.62, 80.54, 86.78, 87, 86.49], 'YTD': [67.02, 70.53, 75.09, 78.53, 82.33, 85.07, 84.9, 75.37, 72.82, 71.31, 75.25, 77.19, 81.5, 84.39, 86.76, 93.68, 82.79, 74.91, 74.47, 72.38, 73.61, 81.5, 81.88, 75.49, 79.29, 86.49], '6M': [76.01, 78.89, 83.48, 82.74, 84.99, 73.57, 72.04, 71.31, 72.44, 72.83, 77.31, 86.16, 85.11, 87.5, 92.76, 82.79, 75.43, 74.67, 74.29, 71.48, 76.19, 82.36, 79.51, 74.98, 78.89, 86.49], '1Y': [49.17, 47.65, 47.28, 57.75, 55.99, 58.79, 61, 62.46, 63.62, 64.78, 63.75, 63.58, 63.3, 64.22, 69.34, 67.92, 62.28, 60.11, 67.56, 68.64, 67.56, 66.02, 68.93, 69.35, 70.53, 75.09, 77.34, 80.11, 84.07, 82.24, 85.87, 69.95, 72.04, 71.31, 72.44, 72.83, 77.31, 86.16, 85.11, 86.87, 97.31, 82.69, 74.91, 74.47, 72.26, 71.48, 76.19, 82.36, 79.51, 74.98, 78.89, 86.49] },
      velocityScore: { '1D': 0, '1W': 6.7, '1M': 6.7, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 59.2, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.28,
      etfPresence: { AIRR: 0.76, PRN: false, RSHO: false, IDEF: 0.04, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVEX', name: 'AEVEX Corp. (Class A)', easyScore: 2, avgWeight: 0.34, proScore: 0.14, coverage: 0.4,
      price: 15.32, weeklyPrices: [14.50, 13.32, 14.75, 14.83, 15.32], weeklyChange: 5.66, dayChange: 3.2, sortRank: 0, periodReturns: { '1M': -14.6, 'YTD': -43.1, '6M': -43.1, '1Y': -43.1 },
      priceHistory: { '1D': [14.85, 15.34, 15.41, 15.32], '1W': [14.5, 13.32, 14.75, 14.83, 15.32], '1M': [17.94, 15.34, 15.43, 17.2, 17.94, 20.89, 19.63, 20.69, 19.6, 17.42, 16.54, 16.46, 15.91, 16.61, 17.79, 15.82, 14.5, 13.32, 14.75, 14.83, 15.32], 'YTD': [26.93, 30.17, 29.7, 30.79, 26.87, 26.12, 24.41, 25.89, 28.58, 26.72, 28.89, 38.47, 27.66, 22.87, 20.35, 21.69, 19.82, 17.94, 17.2, 20.89, 19.6, 17.35, 15.91, 15.82, 13.32, 15.32], '6M': [26.93, 30.17, 29.7, 30.79, 26.87, 26.12, 24.41, 25.89, 28.58, 26.72, 28.89, 38.47, 27.66, 22.87, 20.35, 21.69, 19.82, 17.94, 17.2, 20.89, 19.6, 17.35, 15.91, 15.82, 13.32, 15.32], '1Y': [26.93, 33.41, 30.17, 31.77, 29.7, 33.95, 30.79, 30.25, 27.89, 25.21, 26.12, 23.83, 24.41, 28.15, 25.89, 24.15, 28.58, 26.33, 26.27, 26.82, 28.89, 30.87, 40.48, 38.61, 32.44, 27.66, 22.87, 23.01, 22.2, 21.46, 20.56, 21.69, 19.85, 18.3, 17.48, 17.94, 15.43, 17.2, 17.94, 20.89, 20.69, 19.6, 17.42, 16.54, 16.46, 15.91, 17.79, 15.82, 14.5, 13.32, 14.83, 15.32] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$865M', pe: 39.3, revenueGrowth: 307, eps: 0.39, grossMargin: 25, dividendYield: null,
      etfPresence: { AIRR: 0.48, PRN: false, RSHO: false, IDEF: 0.21, BILT: false },
      tonyNote: 'AEVEX Corp. (Class A) appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'TIMKEN CO/THE', easyScore: 1, avgWeight: 8.69, proScore: 1.74, coverage: 0.2,
      price: 142.87, weeklyPrices: [137.78, 134.38, 139.11, 141.64, 142.87], weeklyChange: 3.69, dayChange: 0.85, sortRank: 0, periodReturns: { '1M': 3.8, 'YTD': 69.8, '6M': 52.1, '1Y': 76.4 },
      priceHistory: { '1D': [141.66, 142.99, 142.87], '1W': [137.78, 134.38, 139.11, 141.64, 142.87], '1M': [137.64, 137.99, 144.01, 141.22, 143.5, 145.32, 141.75, 139.16, 142.36, 138.06, 137.93, 137.31, 138.34, 139.6, 139.47, 137.69, 137.78, 134.38, 139.11, 141.64, 142.87], 'YTD': [84.13, 91.17, 93.55, 93.89, 96.14, 108.82, 107.11, 108.38, 99.68, 98.74, 101.03, 100.57, 106.92, 103.92, 107.2, 109, 117.39, 109.36, 127.16, 133.66, 137.4, 141.97, 143.5, 137.23, 139.47, 142.87], '6M': [93.94, 93.19, 106.04, 107.84, 107.83, 109.99, 100.58, 98.74, 98.99, 95.94, 99.17, 106.81, 108.75, 108.7, 107.12, 117.39, 112.73, 127.42, 131.9, 137.09, 140.28, 137.99, 141.75, 137.93, 137.69, 142.87], '1Y': [80.99, 74.77, 73.57, 80.39, 75.86, 79.01, 77.42, 76.4, 77.11, 75.67, 75.11, 75.86, 74.7, 75.85, 79.25, 78.46, 78.66, 74.82, 81.36, 82.76, 87.53, 84.14, 86.02, 86.29, 91.17, 93.55, 94.02, 94.99, 108.93, 105.54, 109.52, 106.58, 100.58, 98.74, 98.99, 95.94, 99.17, 106.81, 108.75, 106.88, 109.63, 117.12, 109.36, 127.16, 131.82, 137.09, 140.28, 137.99, 141.75, 137.93, 137.69, 142.87] },
      velocityScore: { '1D': null, '1W': 0, '1M': 0, '6M': null }, isNew: true,
      marketCap: '$10B', pe: 32.4, revenueGrowth: 8, eps: 4.41, grossMargin: 31, dividendYield: 1.02,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.69, IDEF: false, BILT: false },
      tonyNote: 'TIMKEN CO/THE appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.37, proScore: 4.37, coverage: 1,
      price: 216.47, weeklyPrices: [177.71, 182.62, 216.92, 218.16, 216.47], weeklyChange: 21.81, dayChange: -0.77, sortRank: 0, periodReturns: { '1M': -21.4, 'YTD': 158.6, '6M': 129.1, '1Y': 317.3 },
      priceHistory: { '1D': [218.16, 216.76, 217.12, 216.47], '1W': [177.71, 182.62, 216.92, 218.16, 216.47], '1M': [275.25, 259.66, 256.63, 240.3, 261.15, 276.17, 229.18, 215.62, 213.02, 195.19, 216.2, 219.65, 210.51, 194.09, 199.51, 171.77, 177.71, 182.62, 216.92, 218.16, 216.47], 'YTD': [83.71, 97.93, 108.73, 97.87, 89.95, 88.61, 107.61, 91.19, 89.33, 129.85, 114.91, 103.76, 136.33, 165.34, 147.16, 154.49, 186.1, 197.73, 208.37, 259.67, 222.24, 283.61, 261.15, 216.48, 199.51, 216.47], '6M': [94.5, 85.19, 86.1, 98.01, 100.61, 91.01, 94.94, 129.85, 114.15, 92.26, 117.4, 161.94, 156.55, 144.96, 176.42, 186.1, 199.86, 208.06, 260.58, 220.12, 265.1, 259.66, 229.18, 216.2, 171.77, 216.47], '1Y': [51.88, 51.29, 55.09, 70.63, 67.47, 70.1, 64.91, 93.39, 94.08, 113.23, 115.61, 122, 125.83, 98.62, 125.1, 117, 94.36, 95.07, 94.69, 102.8, 93.59, 75.45, 91.13, 89.95, 97.93, 108.73, 91.46, 88.16, 92.88, 97.52, 102.58, 86.8, 94.94, 129.85, 114.15, 92.26, 117.4, 161.94, 156.55, 135.51, 175.92, 179.11, 197.73, 208.37, 251.68, 220.12, 265.1, 259.66, 229.18, 216.2, 171.77, 216.47] },
      velocityScore: { '1D': 4.8, '1W': 6.3, '1M': -20.1, '6M': null }, isNew: false,
      marketCap: '$55B', pe: 83.3, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 2.68, MEME: 7.27, RKNG: 3.15 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 5, proScore: 3.33, coverage: 0.667,
      price: 217.75, weeklyPrices: [214.96, 197.06, 226.26, 218.22, 217.75], weeklyChange: 1.3, dayChange: -0.22, sortRank: 0, periodReturns: { '1M': -32.4, 'YTD': 150.6, '6M': 50.3, '1Y': 709.8 },
      priceHistory: { '1D': [218.22, 217.16, 217.75], '1W': [214.96, 197.06, 226.26, 218.22, 217.75], '1M': [321.98, 326.19, 309.18, 252.02, 275.01, 302.7, 289.5, 270.89, 295.05, 269.57, 257.02, 244.61, 233.49, 243.4, 239.38, 206.73, 214.96, 197.06, 226.26, 218.22, 217.75], 'YTD': [86.89, 134.07, 149.5, 152.31, 168.89, 155.54, 159, 155.67, 135.19, 153.68, 145.88, 135.49, 160.13, 210.06, 231.17, 290.52, 283.92, 261.34, 293.8, 291.37, 248.88, 345.85, 275.01, 254.29, 239.38, 217.75], '6M': [144.89, 151.37, 143.03, 139.74, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 234.68, 288.64, 283.92, 258.71, 302.4, 302.85, 259.61, 280.88, 326.19, 289.5, 257.02, 206.73, 217.75], '1Y': [26.89, 37.62, 38.86, 44.08, 44.51, 50.85, 54.91, 62.96, 79.67, 69.18, 90.19, 87.58, 116.58, 94.37, 133.71, 141.41, 126.72, 108.93, 101.14, 118.09, 101.29, 76.97, 91.88, 98.69, 134.07, 149.5, 139.62, 156.13, 155.17, 145.32, 166.2, 153.02, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 261.34, 293.8, 287.32, 259.61, 280.88, 326.19, 289.5, 257.02, 206.73, 217.75] },
      velocityScore: { '1D': 0.3, '1W': -10.7, '1M': -8.5, '6M': null }, isNew: false,
      marketCap: '$62B', pe: null, revenueGrowth: 130, eps: -0.04, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.63, RKNG: 3.37 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 2, avgWeight: 4.81, proScore: 3.21, coverage: 0.667,
      price: 41.53, weeklyPrices: [33.62, 40.20, 41.29, 41.28, 41.53], weeklyChange: 23.53, dayChange: 0.61, sortRank: 0, periodReturns: { '1M': -24.1, 'YTD': 10, '6M': -26.7, '1Y': 118.7 },
      priceHistory: { '1D': [41.28, 41.67, 41.68, 41.53], '1W': [33.62, 40.2, 41.29, 41.28, 41.53], '1M': [54.72, 50.3, 47.74, 47.21, 45.91, 45.73, 43.32, 38.82, 43.91, 39.81, 41.72, 41.14, 38.98, 38.59, 38.28, 34.83, 33.62, 40.2, 41.29, 41.28, 41.53], 'YTD': [37.77, 46.03, 57.82, 59.99, 54.39, 42.67, 43.29, 40.95, 36.7, 44.94, 41.12, 34.28, 37.06, 47.7, 50.64, 45.66, 55.15, 47.74, 67.84, 61.86, 56.71, 56.87, 45.91, 43.01, 38.28, 41.53], '6M': [56.68, 53.74, 41.83, 42.22, 42.36, 41.39, 38.84, 44.94, 42.16, 31.62, 35.74, 47.37, 45.17, 48.36, 49.48, 55.15, 50.46, 59.78, 66.6, 54.02, 59.18, 50.3, 43.32, 41.72, 34.83, 41.53], '1Y': [18.99, 16.14, 18.32, 17.73, 19.76, 22.35, 26.13, 33.63, 37.9, 47.14, 47.08, 60.09, 67.98, 51.83, 60.42, 76.41, 55.7, 45.83, 48.45, 46.45, 43.92, 33.78, 41.98, 42.7, 46.03, 57.82, 52.36, 53.08, 46.15, 40.97, 45.45, 38.85, 38.84, 44.94, 42.16, 31.62, 35.74, 47.37, 45.17, 44.44, 54.74, 56.56, 47.74, 67.84, 65.48, 54.02, 59.18, 50.3, 43.32, 41.72, 34.83, 41.53] },
      velocityScore: { '1D': -4.7, '1W': 18, '1M': -23, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 53.9, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 2.63, MEME: 6.99, RKNG: false },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 4.67, proScore: 3.11, coverage: 0.667,
      price: 1606.37, weeklyPrices: [1354.82, 1390.95, 1589.40, 1599.27, 1606.37], weeklyChange: 18.57, dayChange: 0.44, sortRank: 0, periodReturns: { '1M': -18.2, 'YTD': 576.7, '6M': 239, '1Y': 3635.7 },
      priceHistory: { '1D': [1599.27, 1596.61, 1606.37], '1W': [1354.82, 1390.95, 1589.4, 1599.27, 1606.37], '1M': [1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745, 1744.43, 1617.7, 1858.27, 1915.92, 1673.97, 1757.82, 1615, 1411.08, 1354.82, 1390.95, 1589.4, 1599.27, 1606.37], 'YTD': [237.38, 377.41, 413.62, 481.43, 695.51, 599.34, 621.09, 635.36, 527.33, 703.63, 702.48, 635.34, 851.57, 919.47, 989.9, 1187, 1547.56, 1383.29, 1589.94, 1759.68, 1881.51, 2273.73, 2050.39, 1727.18, 1615, 1606.37], '6M': [473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1070.2, 1255.86, 1547.56, 1333.01, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46, 2032.22, 1858.27, 1411.08, 1606.37], '1Y': [43, 43.39, 42.1, 47.01, 44.4, 48.44, 62.5, 73.92, 93.97, 99.83, 121.12, 131.88, 144.3, 146.95, 204.36, 216.5, 283.1, 245.96, 215.04, 213.31, 232.86, 206.83, 250.08, 275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 565.41, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1831.5, 1646.54, 1991.55, 1914.46, 2032.22, 1858.27, 1411.08, 1606.37] },
      velocityScore: { '1D': 3, '1W': 4, '1M': -30.1, '6M': null }, isNew: false,
      marketCap: '$238B', pe: 54.9, revenueGrowth: 251, eps: 29.27, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.27, RKNG: 3.07 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 2, avgWeight: 4.37, proScore: 2.91, coverage: 0.667,
      price: 568.09, weeklyPrices: [477.22, 487.42, 548.39, 556.67, 568.09], weeklyChange: 19.04, dayChange: 2.05, sortRank: 0, periodReturns: { '1M': -15.3, 'YTD': 229.8, '6M': 140.3, '1Y': 719.5 },
      priceHistory: { '1D': [556.67, 568.09, 568.09], '1W': [477.22, 487.42, 548.39, 556.67, 568.09], '1M': [670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 532.1, 578.05, 582.59, 555.55, 563.32, 513.84, 466.81, 477.22, 487.42, 548.39, 556.67, 568.09], 'YTD': [172.27, 200.46, 221.51, 252.66, 290.24, 273.74, 284.67, 279.7, 245.25, 286.21, 301.05, 270.49, 337.88, 361.69, 404, 431.52, 515.83, 455.8, 530.6, 575.5, 529.29, 732.62, 651.88, 550.3, 513.84, 568.09], '6M': [236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 400.73, 442.36, 515.83, 458.68, 524.65, 563.1, 517.72, 681.08, 643.83, 598.37, 578.05, 466.81, 568.09], '1Y': [69.32, 71.43, 73.78, 76.07, 75.64, 80.67, 90.49, 95.02, 100.94, 109.69, 130.59, 121.18, 120.44, 120.47, 141.38, 160.1, 166.11, 153.97, 157.74, 161, 181.95, 166.26, 179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 594.11, 517.72, 681.08, 643.83, 598.37, 578.05, 466.81, 568.09] },
      velocityScore: { '1D': 2.1, '1W': 77.4, '1M': -24.8, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 34, revenueGrowth: 46, eps: 16.7, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { BUZZ: false, MEME: 5.17, RKNG: 3.56 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'ONDS', name: 'Ondas Holdings', easyScore: 2, avgWeight: 4.32, proScore: 2.88, coverage: 0.667,
      price: 7.95, weeklyPrices: [6.53, 6.87, 7.66, 8.00, 7.95], weeklyChange: 21.81, dayChange: -0.65, sortRank: 0, periodReturns: { '1M': -6.8, 'YTD': -18.6, '6M': -34.7, '1Y': 264.6 },
      priceHistory: { '1D': [8, 7.93, 7.98, 7.95], '1W': [6.53, 6.87, 7.66, 8, 7.95], '1M': [8.53, 7.68, 7.68, 7.83, 8.02, 8.24, 7.92, 7.41, 7.82, 7.35, 7.65, 7.26, 6.96, 7.36, 7.05, 6.65, 6.53, 6.87, 7.66, 8, 7.95], 'YTD': [9.76, 13.69, 12.16, 12.26, 11.38, 9.23, 11.39, 10.08, 9.83, 10.53, 10.68, 9.04, 9.14, 10.2, 10.55, 10.32, 9.42, 9.13, 10.8, 11.97, 9.83, 8.89, 8.02, 7.52, 7.05, 7.95], '6M': [12.17, 10.36, 9.69, 9.31, 10.19, 10.67, 9.72, 10.53, 10.9, 8.15, 9.53, 9.4, 10.87, 10.95, 9.73, 9.42, 9.7, 9.77, 13.58, 9.65, 9.21, 7.68, 7.92, 7.65, 6.65, 7.95], '1Y': [2.18, 2.07, 3.33, 3.52, 3.61, 5.07, 5.33, 5.56, 6.1, 7.35, 7.31, 11.26, 9.51, 6.74, 6.75, 6, 5.51, 7.5, 8.24, 9.19, 8.32, 7.37, 9.13, 11.02, 13.69, 12.16, 11.16, 10.64, 10.34, 10.05, 10.4, 10.02, 9.72, 10.53, 10.9, 8.15, 9.53, 9.4, 10.87, 10.48, 9.33, 9.04, 9.13, 10.8, 11.61, 9.65, 9.21, 7.68, 7.92, 7.65, 6.65, 7.95] },
      velocityScore: { '1D': 4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: 88.3, revenueGrowth: 1080, eps: 0.09, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.61, RKNG: 3.03 },
      tonyNote: 'Ondas Holdings is a small-cap industrial automation and drone company. It appears in Meme ETFs on the autonomous systems and drone delivery narrative. Revenue is minimal and the path to profitability is unclear; the ETF allocation is speculative and reflects retail interest in autonomous systems themes.',
    },
    {
      ticker: 'LITE', name: 'LITE', easyScore: 2, avgWeight: 4.17, proScore: 2.78, coverage: 0.667,
      price: 849.5, weeklyPrices: [732.82, 765.55, 837.56, 829.70, 849.50], weeklyChange: 15.92, dayChange: 2.39, sortRank: 0, periodReturns: { '1M': 2.6, 'YTD': 130.5, '6M': 150.4, '1Y': 731.8 },
      priceHistory: { '1D': [829.7, 849.49, 849.5], '1W': [732.82, 765.55, 837.56, 829.7, 849.5], '1M': [827.92, 842.53, 861.97, 816.98, 851.4, 858.06, 801.16, 728.32, 731.25, 698.91, 785.77, 802.01, 768.15, 814.8, 752, 706.23, 732.82, 765.55, 837.56, 829.7, 849.5], 'YTD': [368.59, 351.42, 324.25, 370.66, 435.1, 574.11, 635.64, 700.91, 558.44, 624.84, 801.99, 702.76, 894.13, 891.22, 881.64, 949.93, 1053.09, 890.09, 902.31, 945.08, 889.59, 893.93, 851.4, 707.1, 752, 849.5], '6M': [339.19, 391.84, 551.99, 562.74, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 859.68, 976.18, 1053.09, 884.98, 910.81, 1029.15, 821.76, 875.36, 842.53, 801.16, 785.77, 706.23, 849.5], '1Y': [102.13, 109.85, 110.01, 120.23, 115.89, 125.84, 141.91, 164.88, 163.34, 152.75, 171.4, 163.09, 156.57, 158.06, 214.28, 232.75, 253.81, 268.92, 308.28, 327.85, 366, 320.25, 395.92, 386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 600.42, 688.27, 694.43, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 890.09, 902.31, 938, 821.76, 875.36, 842.53, 801.16, 785.77, 706.23, 849.5] },
      velocityScore: { '1D': -0.7, '1W': -2.5, '1M': -5.8, '6M': null }, isNew: false,
      marketCap: '$66B', pe: 150.6, revenueGrowth: 90, eps: 5.64, grossMargin: 41, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.13, RKNG: 3.2 },
      tonyNote: 'LITE appears in 2 of 3 Meme ETFs (67% coverage) with average weight 4.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WULF', name: 'WULF', easyScore: 2, avgWeight: 4.08, proScore: 2.72, coverage: 0.667,
      price: 19.69, weeklyPrices: [18.16, 18.86, 19.87, 19.49, 19.69], weeklyChange: 8.43, dayChange: 1.03, sortRank: 0, periodReturns: { '1M': -31.6, 'YTD': 71.4, '6M': 39.4, '1Y': 278.7 },
      priceHistory: { '1D': [19.49, 19.79, 19.81, 19.69], '1W': [18.16, 18.86, 19.87, 19.49, 19.69], '1M': [28.78, 26.97, 26.06, 25.83, 25.58, 24.7, 23.58, 21.18, 22.21, 20.24, 23.2, 21.97, 20.89, 19.41, 19.37, 17.98, 18.16, 18.86, 19.87, 19.49, 19.69], 'YTD': [11.49, 13.1, 13.85, 15.31, 14.8, 16.03, 15.47, 16.22, 13.75, 16.41, 16.22, 14.43, 19.03, 19.31, 20.01, 21.31, 23.37, 21.34, 26.74, 26.19, 25.35, 28.31, 25.58, 22.83, 19.37, 19.69], '6M': [14.12, 13.37, 14.29, 16.26, 15.68, 16.02, 13.85, 16.41, 16.19, 13.7, 16.57, 20.95, 19.77, 21.43, 22.29, 23.37, 21.14, 25.18, 26.49, 25.3, 28.01, 26.97, 23.58, 23.2, 17.98, 19.69], '1Y': [5.2, 5.01, 5.15, 5.46, 9.28, 9.13, 8.87, 10.55, 11.35, 11.4, 11.47, 12.3, 15.47, 12.62, 14.5, 15.36, 12.64, 12.23, 14.84, 15.1, 15.76, 11.57, 12.31, 12.74, 13.1, 13.85, 13.79, 13.44, 16.65, 16.18, 17.56, 14.74, 13.85, 16.41, 16.19, 13.7, 16.57, 20.95, 19.77, 20.8, 23.49, 22.8, 21.34, 26.74, 26.16, 25.3, 28.01, 26.97, 23.58, 23.2, 17.98, 19.69] },
      velocityScore: { '1D': -3.9, '1W': 1.1, '1M': 86.3, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: -1, eps: -2.51, grossMargin: 64, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.22, RKNG: 2.93 },
      tonyNote: 'WULF appears in 2 of 3 Meme ETFs (67% coverage) with average weight 4.1% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMD', name: 'AMD', easyScore: 2, avgWeight: 3.33, proScore: 2.22, coverage: 0.667,
      price: 547.81, weeklyPrices: [495.76, 503.57, 544.43, 552.33, 547.81], weeklyChange: 10.5, dayChange: -0.82, sortRank: 0, periodReturns: { '1M': 5.4, 'YTD': 155.8, '6M': 111, '1Y': 245.3 },
      priceHistory: { '1D': [552.33, 547.3, 547.81], '1W': [495.76, 503.57, 544.43, 552.33, 547.81], '1M': [519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 546.72, 557.89, 534.39, 548.13, 529.14, 500.94, 495.76, 503.57, 544.43, 552.33, 547.81], 'YTD': [214.16, 203.17, 231.83, 252.03, 242.11, 213.58, 203.37, 200.21, 192.43, 196.58, 205.37, 203.43, 236.64, 278.26, 347.81, 360.54, 458.79, 414.05, 495.54, 523.2, 488.45, 551.63, 539.49, 517.41, 529.14, 547.81], '6M': [259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 334.63, 341.54, 458.79, 420.99, 503.89, 521.54, 475.51, 507.29, 519.74, 540.88, 546.72, 500.94, 547.81], '1Y': [158.65, 179.51, 163.12, 184.42, 165.2, 167.13, 161.79, 159.54, 159.16, 160.88, 164.01, 235.56, 238.6, 230.23, 264.33, 256.33, 258.89, 223.55, 214.24, 215.98, 221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 475.51, 507.29, 519.74, 540.88, 546.72, 500.94, 547.81] },
      velocityScore: { '1D': 0, '1W': -12.6, '1M': null, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 183.8, revenueGrowth: 38, eps: 2.98, grossMargin: 53, dividendYield: null,
      etfPresence: { BUZZ: 2.47, MEME: false, RKNG: 4.18 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'INTC', name: 'INTC', easyScore: 2, avgWeight: 2.87, proScore: 1.91, coverage: 0.667,
      price: 101.31, weeklyPrices: [95.04, 97.06, 105.45, 102.62, 101.31], weeklyChange: 6.59, dayChange: -1.28, sortRank: 0, periodReturns: { '1M': -23.4, 'YTD': 174.5, '6M': 124.8, '1Y': 331.3 },
      priceHistory: { '1D': [102.62, 101.39, 101.31], '1W': [95.04, 97.06, 105.45, 102.62, 101.31], '1M': [132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.2, 110.39, 112.54, 109.84, 103.12, 107.76, 102.99, 96.98, 95.04, 97.06, 105.45, 102.62, 101.31], 'YTD': [36.9, 45.55, 46.96, 43.93, 49.25, 48.29, 44.62, 45.61, 43.42, 45.76, 44.06, 44.13, 61.72, 68.5, 82.54, 99.62, 129.44, 110.8, 121.77, 111.78, 116.96, 140.94, 131.72, 110.24, 102.99, 101.31], '6M': [45.07, 46.47, 50.59, 46.79, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.99, 95.78, 129.44, 108.17, 123.52, 107.93, 107.92, 117.05, 131.65, 127.02, 112.54, 96.98, 101.31], '1Y': [23.49, 20.34, 20.41, 22.22, 23.54, 24.85, 24.61, 24.77, 24.9, 31.22, 35.94, 37.43, 37.15, 36.92, 41.34, 38.38, 37.89, 35.11, 36.81, 40.5, 40.78, 36.05, 36.16, 39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 46.12, 43.1, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 121.77, 112.71, 107.92, 117.05, 131.65, 127.02, 112.54, 96.98, 101.31] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$509B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 2.41, MEME: false, RKNG: 3.32 },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 1, avgWeight: 6.64, proScore: 2.21, coverage: 0.333,
      price: 112.02, weeklyPrices: [102.41, 103.02, 119.26, 110.52, 112.02], weeklyChange: 9.38, dayChange: 1.36, sortRank: 0, periodReturns: { '1M': -24, 'YTD': 221.3, '6M': 213.6, '1Y': 325.9 },
      priceHistory: { '1D': [110.52, 112.68, 112.33, 112.02], '1W': [102.41, 103.02, 119.26, 110.52, 112.02], '1M': [147.44, 146.97, 138.54, 135.69, 150.1, 148.16, 139, 120.95, 123.36, 114.41, 122.21, 119.92, 111.88, 125.45, 109.09, 100.24, 102.41, 103.02, 119.26, 110.52, 112.02], 'YTD': [34.86, 34.04, 37.04, 37.39, 46.12, 48.4, 46.98, 84.23, 95.58, 94.07, 113.9, 84.59, 133.3, 157.32, 162.17, 183.51, 184.9, 171.33, 179.83, 202.89, 172.78, 171.23, 150.1, 114.44, 109.09, 112.02], '6M': [35.72, 43.61, 44.3, 44.46, 53.96, 102.51, 110.62, 94.07, 95.76, 85.19, 117.64, 146.39, 150.57, 145.78, 172.98, 184.9, 173.26, 177.62, 202.37, 162.88, 170.81, 146.97, 139, 122.21, 100.24, 112.02], '1Y': [26.31, 23.06, 23.23, 23.02, 21.93, 24.05, 23.32, 27.72, 29.47, 26.69, 28.42, 32.22, 32.95, 29.98, 35.48, 31.51, 23.94, 20.87, 25.57, 26.24, 34.98, 27.14, 41, 39.6, 34.04, 37.04, 34.89, 44.16, 47.91, 43.91, 56.27, 95.34, 110.62, 94.07, 95.76, 85.19, 117.64, 146.39, 150.57, 137.26, 180.57, 188.28, 171.33, 179.83, 184.07, 162.88, 170.81, 146.97, 139, 122.21, 100.24, 112.02] },
      velocityScore: { '1D': -2.6, '1W': -30.3, '1M': -43.3, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.64, RKNG: false },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'COHR', name: 'COHR', easyScore: 1, avgWeight: 5.3, proScore: 1.77, coverage: 0.333,
      price: 311.73, weeklyPrices: [277.60, 285.40, 317.22, 312.19, 311.73], weeklyChange: 12.29, dayChange: -0.17, sortRank: 0, periodReturns: { '1M': -18.2, 'YTD': 68.9, '6M': 58.3, '1Y': 216.7 },
      priceHistory: { '1D': [312.26, 310.97, 312.76, 311.73], '1W': [277.6, 285.4, 317.22, 312.19, 311.73], '1M': [381.22, 392.5, 407.25, 380.56, 391.22, 394.47, 368.65, 333.36, 335.7, 314.13, 327.24, 324.5, 307.39, 310.77, 299.38, 276.96, 277.6, 285.4, 317.22, 312.19, 311.73], 'YTD': [184.57, 178.06, 191.04, 214, 229.18, 223.69, 232.48, 258.93, 235.72, 247.37, 272.33, 238.21, 284.17, 328, 336.09, 329.5, 379.69, 353.63, 380.18, 421.9, 363.58, 425.48, 391.22, 317.05, 299.38, 311.73], '6M': [196.94, 212.18, 227.68, 217.23, 248.89, 298.91, 252.32, 247.37, 255.05, 219.65, 255.1, 313.42, 343.79, 321.53, 329.89, 379.69, 362.83, 381.35, 426.89, 355.94, 382.81, 392.5, 368.65, 327.24, 276.96, 311.73], '1Y': [98.43, 107.23, 107.15, 114.01, 86.55, 90.71, 95.62, 103.49, 103.41, 106.52, 114.65, 116.67, 110.41, 115.37, 138.06, 134.63, 156.67, 142.94, 154, 177.35, 197.45, 170.44, 191.37, 194.33, 178.06, 191.04, 197.76, 222.44, 242.46, 219.96, 254.86, 280.81, 252.32, 247.37, 255.05, 219.65, 255.1, 313.42, 343.79, 303.97, 335.73, 374.01, 353.63, 380.18, 417.43, 355.94, 382.81, 392.5, 368.65, 327.24, 276.96, 311.73] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$61B', pe: 149.2, revenueGrowth: 21, eps: 2.09, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.3, RKNG: false },
      tonyNote: 'COHR appears in 1 of 3 Meme ETFs (33% coverage) with average weight 5.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 1, avgWeight: 5.24, proScore: 1.75, coverage: 0.333,
      price: 226.51, weeklyPrices: [202.68, 212.07, 223.87, 228.27, 226.51], weeklyChange: 11.76, dayChange: -0.77, sortRank: 0, periodReturns: { '1M': -16.7, 'YTD': 57.4, '6M': 70.1, '1Y': 130.2 },
      priceHistory: { '1D': [228.27, 226.89, 226.51], '1W': [202.68, 212.07, 223.87, 228.27, 226.51], '1M': [272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 265.55, 246.4, 265.65, 257.79, 236.88, 236.18, 226.74, 207.97, 202.68, 212.07, 223.87, 228.27, 226.51], 'YTD': [143.89, 150.42, 150.97, 129.57, 111.31, 128.4, 130.66, 112.27, 109.83, 116.88, 100.3, 93.87, 107.93, 158.93, 195.04, 184.38, 210.22, 168.99, 221.23, 217.5, 264.76, 302.52, 245.68, 258.69, 226.74, 226.51], '6M': [133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 180.5, 180.06, 210.22, 156.27, 221.64, 229, 234.32, 239.18, 268.99, 259.09, 265.65, 207.97, 226.51], '1Y': [98.41, 116.01, 117.34, 121.13, 105.99, 122.73, 134, 163.96, 164.44, 149.38, 144.91, 148.87, 131.41, 137.2, 171.52, 173.16, 160.34, 141.88, 164.01, 180.92, 157.98, 134.13, 150.19, 143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 97.3, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.23, 214.6, 234.32, 239.18, 268.99, 259.09, 265.65, 207.97, 226.51] },
      velocityScore: { '1D': -1.7, '1W': 21.5, '1M': 7.4, '6M': null }, isNew: false,
      marketCap: '$42B', pe: 90.2, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.24, RKNG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'ALAB', name: 'ALAB', easyScore: 1, avgWeight: 5.2, proScore: 1.73, coverage: 0.333,
      price: 331.43, weeklyPrices: [303.62, 309.09, 319.79, 330.89, 331.43], weeklyChange: 9.16, dayChange: 0.16, sortRank: 0, periodReturns: { '1M': -16.5, 'YTD': 99.2, '6M': 95.3, '1Y': 177.4 },
      priceHistory: { '1D': [330.89, 330.89, 331.43], '1W': [303.62, 309.09, 319.79, 330.89, 331.43], '1M': [397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42, 432.74, 382.89, 417.45, 412.97, 362.05, 361.78, 350.62, 319.74, 303.62, 309.09, 319.79, 330.89, 331.43], 'YTD': [166.36, 162.61, 182, 170.93, 158.52, 143.71, 132.62, 118.83, 119.2, 127.48, 121.76, 109.6, 129.46, 170.81, 212.84, 202.68, 207.35, 244.26, 325.33, 358.05, 367.47, 439.66, 455.96, 393.16, 350.62, 331.43], '6M': [169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 196.64, 201.25, 207.35, 215.58, 318.72, 355.76, 341.7, 361.71, 399.92, 430.86, 417.45, 319.74, 331.43], '1Y': [119.48, 128.87, 174.39, 193.64, 172.45, 179.2, 187.95, 230.37, 249.38, 205.27, 194.5, 219.36, 161.46, 154.85, 173.62, 181.94, 157.79, 142.01, 154.22, 152.51, 164.32, 140.24, 169.97, 179.56, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.4, 109.8, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 325.33, 363.54, 341.7, 361.71, 399.92, 430.86, 417.45, 319.74, 331.43] },
      velocityScore: { '1D': -2.8, '1W': 21.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$57B', pe: 222.4, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.2, RKNG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'CRWV', name: 'CRWV', easyScore: 1, avgWeight: 5.02, proScore: 1.67, coverage: 0.333,
      price: 82.39, weeklyPrices: [73.21, 73.06, 79.58, 82.64, 82.39], weeklyChange: 12.53, dayChange: -0.31, sortRank: 0, periodReturns: { '1M': -22.1, 'YTD': 15, '6M': -11.4, '1Y': -34.6 },
      priceHistory: { '1D': [82.64, 82.64, 82.39], '1W': [73.21, 73.06, 79.58, 82.64, 82.39], '1M': [105.72, 100.88, 98.76, 96.58, 95.51, 99.54, 85.68, 81.75, 86.46, 83.53, 89.7, 88.88, 83.31, 79.94, 77.12, 72.91, 73.21, 73.06, 79.58, 82.64, 82.39], 'YTD': [71.61, 80.14, 101.23, 108.86, 90.06, 95.15, 97.14, 79.56, 72.99, 85.86, 83.02, 77.47, 92, 119.56, 110.14, 119.01, 114.7, 99.81, 104.27, 108.03, 95.74, 111.29, 95.51, 90, 77.12, 82.39], '6M': [92.98, 93.19, 89.95, 96.04, 90.84, 78.05, 74.41, 85.86, 81.96, 69.15, 85.24, 117.2, 115.16, 112.06, 125.43, 114.7, 103.77, 105.89, 119.27, 98.45, 117.03, 100.88, 85.68, 89.7, 72.91, 82.39], '1Y': [126.05, 102.89, 110.24, 117.76, 91.52, 96.93, 87.48, 117.14, 120.86, 133.4, 137.05, 139.98, 139.24, 121.53, 139.93, 114.42, 85.43, 74.92, 74.29, 85.75, 88.16, 64.55, 78.87, 79.32, 80.14, 101.23, 98.31, 88.94, 96.79, 91, 99.3, 73.78, 74.41, 85.86, 81.96, 69.15, 85.24, 117.2, 115.16, 105.53, 127.89, 107.75, 99.81, 104.27, 110.93, 98.45, 117.03, 100.88, 85.68, 89.7, 72.91, 82.39] },
      velocityScore: { '1D': 2.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$45B', pe: null, revenueGrowth: 112, eps: -2.72, grossMargin: 69, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.02, RKNG: false },
      tonyNote: 'CRWV appears in 1 of 3 Meme ETFs (33% coverage) with average weight 5.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PENG', name: 'PENG', easyScore: 1, avgWeight: 4.99, proScore: 1.66, coverage: 0.333,
      price: 58.65, weeklyPrices: [60.41, 53.23, 58.10, 59.20, 58.65], weeklyChange: -2.91, dayChange: -0.93, sortRank: 0, periodReturns: { '1M': -12.4, 'YTD': 199.8, '6M': 193.3, '1Y': 135.5 },
      priceHistory: { '1D': [59.2, 58.51, 58.65, 58.65], '1W': [60.41, 53.23, 58.1, 59.2, 58.65], '1M': [66.96, 64.72, 66.77, 62.28, 67.94, 76.01, 68.81, 61.47, 67.71, 62.71, 81.39, 78.35, 77.21, 77.8, 72.85, 65.97, 60.41, 53.23, 58.1, 59.2, 58.65], 'YTD': [19.56, 19.08, 19.96, 19.76, 18.21, 18.93, 18.81, 20.78, 18.26, 17.54, 17.8, 17.6, 22.85, 26.09, 30.69, 31.24, 43.54, 46.27, 54.44, 71.16, 64.33, 67.94, 67.94, 78.47, 72.85, 58.65], '6M': [20, 19.21, 18.78, 19.37, 19.25, 20.05, 18.45, 17.54, 17.89, 16.24, 20.63, 25.72, 27.92, 29.05, 32.4, 43.54, 45.71, 54.95, 70.65, 61.69, 60.38, 64.72, 68.81, 81.39, 65.97, 58.65], '1Y': [24.9, 23.99, 22.9, 24.14, 23.26, 24.26, 24.71, 25.64, 26.28, 27.1, 27.07, 22.67, 22.65, 21.53, 22.39, 22.2, 20.76, 17.86, 20.31, 21.68, 22.41, 19.67, 20.21, 20.28, 19.08, 19.96, 19.79, 19.8, 19, 19.35, 20.23, 18.95, 18.45, 17.54, 17.89, 16.24, 20.63, 25.72, 27.92, 28.12, 36.45, 44.13, 46.27, 54.44, 71.41, 61.69, 60.38, 64.72, 68.81, 81.39, 65.97, 58.65] },
      velocityScore: { '1D': 1.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3B', pe: 42.2, revenueGrowth: 48, eps: 1.39, grossMargin: 28, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.99, RKNG: false },
      tonyNote: 'PENG appears in 1 of 3 Meme ETFs (33% coverage) with average weight 5.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'STX', easyScore: 1, avgWeight: 4.91, proScore: 1.64, coverage: 0.333,
      price: 923.43, weeklyPrices: [787.66, 802.45, 891.83, 908.10, 923.43], weeklyChange: 17.24, dayChange: 1.69, sortRank: 0, periodReturns: { '1M': -11.1, 'YTD': 235.3, '6M': 166.8, '1Y': 504.5 },
      priceHistory: { '1D': [908.1, 922.93, 923.43], '1W': [787.66, 802.45, 891.83, 908.1, 923.43], '1M': [1038.59, 993.25, 1025.36, 899.9, 968.53, 965, 915.19, 820.16, 868.26, 827.64, 890.09, 910.34, 860.66, 878.31, 828.3, 745.49, 787.66, 802.45, 891.83, 908.1, 923.43], 'YTD': [275.39, 304.01, 326.23, 371.76, 444.45, 407.25, 408.97, 407.84, 352.8, 398.78, 424.96, 391.76, 500.77, 531.81, 586.25, 726.93, 834.01, 733.35, 870.66, 925.99, 868.09, 1094.04, 968.53, 860.02, 828.3, 923.43], '6M': [346.1, 407.69, 429.32, 425.99, 407.4, 379.52, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 595.86, 738.54, 834.01, 740.84, 845.76, 926.61, 846.01, 1031.34, 993.25, 915.19, 890.09, 745.49, 923.43], '1Y': [152.76, 147.42, 147.27, 156.92, 158.4, 167.24, 183.98, 193.04, 213.36, 223.7, 256.84, 224.35, 219.38, 215.05, 265.62, 275.77, 283.26, 259.14, 272.28, 265.63, 298.92, 277.65, 285.27, 287.54, 304.01, 326.23, 358.29, 432.95, 425, 415.94, 396.02, 357.62, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 579.03, 771.01, 808.8, 733.35, 870.66, 940.69, 846.01, 1031.34, 993.25, 915.19, 890.09, 745.49, 923.43] },
      velocityScore: { '1D': 3.1, '1W': 3.1, '1M': null, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 87.7, revenueGrowth: 44, eps: 10.53, grossMargin: 42, dividendYield: 0.33,
      etfPresence: { BUZZ: false, MEME: 4.91, RKNG: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'TER', name: 'TER', easyScore: 1, avgWeight: 4.59, proScore: 1.53, coverage: 0.333,
      price: 369.24, weeklyPrices: [322.36, 333.76, 374.04, 369.46, 369.24], weeklyChange: 14.54, dayChange: -0.06, sortRank: 0, periodReturns: { '1M': -12.1, 'YTD': 90.8, '6M': 61.1, '1Y': 296.9 },
      priceHistory: { '1D': [369.46, 369.49, 370.1, 369.24], '1W': [322.36, 333.76, 374.04, 369.46, 369.24], '1M': [420.12, 427.2, 471.96, 436.86, 463.21, 483.84, 427.34, 369.09, 379.52, 343.11, 362.75, 359.6, 341.11, 353.23, 342.12, 322.3, 322.36, 333.76, 374.04, 369.46, 369.24], 'YTD': [193.56, 217.26, 228.15, 238.94, 282.98, 321.45, 315.9, 320.03, 273.05, 298.27, 320.14, 296.46, 364.21, 365.92, 418.08, 345.42, 366.64, 321.52, 375.83, 406.86, 381.4, 457, 463.21, 351.57, 342.12, 369.24], '6M': [229.18, 241.05, 300.11, 314.66, 318.5, 325.83, 296.44, 298.27, 303.92, 276.35, 320.48, 365.51, 379.93, 402, 337.44, 366.64, 321.05, 389.14, 392.62, 369.21, 409.35, 427.2, 427.34, 362.75, 322.3, 369.24], '1Y': [93.03, 107.65, 104.88, 114.01, 109.52, 116.99, 119.39, 117.82, 114.32, 133.21, 141.12, 144.6, 141.03, 138.84, 173.94, 187.59, 179.27, 168.23, 179.38, 198.63, 204.01, 185.21, 198.53, 207.56, 217.26, 228.15, 231.75, 249.53, 310.01, 305.53, 329.09, 304.22, 296.44, 298.27, 303.92, 276.35, 320.48, 365.51, 379.93, 380.13, 357.1, 358.45, 321.52, 375.83, 409.67, 369.21, 409.35, 427.2, 427.34, 362.75, 322.3, 369.24] },
      velocityScore: { '1D': 0.7, '1W': 15, '1M': null, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 68.5, revenueGrowth: 87, eps: 5.39, grossMargin: 59, dividendYield: 0.14,
      etfPresence: { BUZZ: false, MEME: 4.59, RKNG: false },
      tonyNote: 'TER appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OPEN', name: 'OPEN', easyScore: 1, avgWeight: 4.37, proScore: 1.46, coverage: 0.333,
      price: 4.25, weeklyPrices: [4.50, 4.45, 4.48, 4.38, 4.25], weeklyChange: -5.55, dayChange: -2.96, sortRank: 0, periodReturns: { '1M': 1.2, 'YTD': -27.1, '6M': -29.3, '1Y': 85.6 },
      priceHistory: { '1D': [4.38, 4.28, 4.28, 4.25], '1W': [4.5, 4.45, 4.48, 4.38, 4.25], '1M': [4.2, 4.28, 4.3, 4.37, 4.6, 4.62, 4.94, 4.9, 5.09, 4.79, 5.3, 4.76, 4.49, 4.55, 4.75, 4.57, 4.5, 4.45, 4.48, 4.38, 4.25], 'YTD': [5.83, 7.29, 6.67, 5.81, 5.13, 4.76, 4.65, 5.42, 5, 5.18, 5.18, 4.68, 4.31, 5.27, 5.51, 5.44, 4.85, 4.3, 4.75, 4.95, 4.47, 4.28, 4.6, 4.79, 4.75, 4.25], '6M': [6.01, 5.15, 4.88, 4.45, 4.78, 5.05, 5.08, 5.18, 5.21, 4.43, 4.55, 4.51, 5.45, 5.39, 5.13, 4.85, 4.28, 4.48, 5.41, 4.34, 4.75, 4.28, 4.94, 5.3, 4.57, 4.25], '1Y': [2.29, 2.07, 1.9, 2.42, 3.22, 4.02, 5.96, 5.86, 10.21, 8.23, 8.06, 8.49, 7.38, 6.82, 7.65, 7.23, 9.37, 6.69, 7.78, 7.58, 7, 6.12, 6.28, 6.07, 7.29, 6.67, 5.87, 4.82, 4.94, 4.33, 5.11, 4.97, 5.08, 5.18, 5.21, 4.43, 4.55, 4.51, 5.45, 5.48, 5.23, 4.71, 4.3, 4.75, 4.87, 4.34, 4.75, 4.28, 4.94, 5.3, 4.57, 4.25] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$4B', pe: null, revenueGrowth: -38, eps: -1.76, grossMargin: 8, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.37 },
      tonyNote: 'OPEN appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 1, avgWeight: 4.28, proScore: 1.43, coverage: 0.333,
      price: 34.45, weeklyPrices: [34.78, 34.24, 35.51, 34.68, 34.45], weeklyChange: -0.95, dayChange: -0.69, sortRank: 0, periodReturns: { '1M': -40.4, 'YTD': -23.2, '6M': -27.1, '1Y': -20.4 },
      priceHistory: { '1D': [34.69, 34.56, 34.54, 34.45], '1W': [34.78, 34.24, 35.51, 34.68, 34.45], '1M': [57.85, 53.6, 50.56, 49.31, 53.88, 53.26, 51.4, 49.12, 48.87, 45.36, 44.77, 42.86, 38.88, 39.29, 37.51, 35.1, 34.78, 34.24, 35.51, 34.68, 34.45], 'YTD': [44.87, 49.45, 50.8, 45.49, 38.47, 33.61, 33.43, 38.37, 35.73, 33.29, 32.7, 28.83, 28.08, 44.68, 42.69, 46.2, 56.89, 48.44, 65.4, 65.66, 57.99, 58.32, 53.88, 45.08, 37.51, 34.45], '6M': [47.25, 39.98, 34.99, 34.11, 30.78, 38.34, 35.87, 33.29, 33.11, 26.59, 28.49, 35.76, 46.28, 43.84, 45.75, 56.89, 49.31, 63.62, 71.4, 56.69, 56.06, 53.6, 51.4, 44.77, 35.1, 34.45], '1Y': [43.28, 39.88, 41.23, 41.21, 36.79, 41.42, 42.11, 43.86, 65.44, 73.86, 63.09, 74.3, 72.41, 55.45, 61.11, 55.41, 50.71, 47.88, 46.9, 54.76, 51.67, 45.85, 49.82, 46.77, 49.45, 50.8, 43.37, 38.56, 35.48, 33.18, 31.62, 37.05, 35.87, 33.29, 33.11, 26.59, 28.49, 35.76, 46.28, 43.08, 48, 55.87, 48.44, 65.4, 68.23, 56.69, 56.06, 53.6, 51.4, 44.77, 35.1, 34.45] },
      velocityScore: { '1D': -7.7, '1W': -14.9, '1M': -43.9, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 88.3, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.28, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
