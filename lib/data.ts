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
export const SPY_RET: Record<Period, number> = { '1W': -0.4, '1M': 0.2, 'YTD': 10.3, '6M': 8.7, '1Y': 20.5 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 6.5 }, { t: 'AMD', w: 5.3 }, { t: 'VRT', w: 3.8 }, { t: 'SIMO', w: 3.8 }, { t: 'TSM', w: 3.4 }],
  ARTY: [{ t: 'AMD', w: 5.3 }, { t: 'NVDA', w: 5.1 }, { t: 'AVGO', w: 4.9 }, { t: 'MU', w: 4.6 }, { t: 'CRWV', w: 3.6 }],
  BAI: [{ t: 'MU', w: 6.0 }, { t: 'AMD', w: 5.3 }, { t: 'NVDA', w: 4.8 }, { t: 'AVGO', w: 4.7 }, { t: 'LRCX', w: 4.6 }],
  IGPT: [{ t: 'META', w: 9.7 }, { t: 'AMD', w: 8.8 }, { t: 'NVDA', w: 8.4 }, { t: 'GOOGL', w: 8.4 }, { t: 'MU', w: 7.4 }],
  IVES: [{ t: 'META', w: 5.6 }, { t: 'AAPL', w: 5.5 }, { t: 'NVDA', w: 5.1 }, { t: 'AMZN', w: 5.1 }, { t: 'GOOGL', w: 4.9 }],
  ALAI: [{ t: 'NVDA', w: 13.3 }, { t: 'TSM', w: 5.2 }, { t: 'MSFT', w: 5.1 }, { t: 'GOOG', w: 5.0 }, { t: 'AMZN', w: 5.0 }],
  CHAT: [{ t: 'NVDA', w: 7.6 }, { t: 'GOOGL', w: 5.8 }, { t: 'AVGO', w: 4.8 }, { t: 'AMD', w: 4.0 }, { t: 'MU', w: 3.4 }],
  AIFD: [{ t: 'NVDA', w: 6.6 }, { t: 'MU', w: 6.3 }, { t: 'PANW', w: 5.9 }, { t: 'ANET', w: 5.6 }, { t: 'AVGO', w: 5.5 }],
  SPRX: [{ t: 'ALAB', w: 9.9 }, { t: 'KLAC', w: 9.4 }, { t: 'NET', w: 9.2 }, { t: 'MKSI', w: 8.0 }, { t: 'COHR', w: 7.9 }],
  AOTG: [{ t: 'AMD', w: 16.4 }, { t: 'NVDA', w: 10.1 }, { t: 'MU', w: 9.8 }, { t: 'TSM', w: 7.1 }, { t: 'TOST', w: 5.2 }],
  SOXX: [{ t: 'AMD', w: 8.5 }, { t: 'NVDA', w: 8.3 }, { t: 'MU', w: 7.7 }, { t: 'AVGO', w: 7.3 }, { t: 'INTC', w: 5.4 }],
  PSI: [{ t: 'AMAT', w: 6.7 }, { t: 'KLAC', w: 5.9 }, { t: 'AMD', w: 5.5 }, { t: 'LRCX', w: 5.5 }, { t: 'MU', w: 5.3 }],
  XSD: [{ t: 'PENG', w: 3.1 }, { t: 'MXL', w: 3.0 }, { t: 'PI', w: 2.9 }, { t: 'AMD', w: 2.9 }, { t: 'ALGM', w: 2.8 }],
  DRAM: [{ t: 'SNDK', w: 4.5 }, { t: 'STX', w: 4.4 }, { t: 'WDC', w: 4.2 }, { t: 'MU', w: 2.5 }, { t: 'SKHY', w: 0.6 }],
  PTF: [{ t: 'SNDK', w: 5.0 }, { t: 'MU', w: 4.8 }, { t: 'KLAC', w: 4.2 }, { t: 'WDC', w: 4.1 }, { t: 'STX', w: 3.8 }],
  WCLD: [{ t: 'FROG', w: 3.0 }, { t: 'DDOG', w: 2.8 }, { t: 'PANW', w: 2.7 }, { t: 'TENB', w: 2.4 }, { t: 'DOCN', w: 2.4 }],
  IGV: [{ t: 'PANW', w: 10.4 }, { t: 'PLTR', w: 8.5 }, { t: 'MSFT', w: 8.3 }, { t: 'CRWD', w: 7.6 }, { t: 'ORCL', w: 5.5 }],
  FDTX: [{ t: 'MRVL', w: 9.7 }, { t: 'MU', w: 9.3 }, { t: 'TSM', w: 6.4 }, { t: 'WDC', w: 4.5 }, { t: 'PANW', w: 4.2 }],
  GTEK: [{ t: 'MRVL', w: 3.8 }, { t: 'NET', w: 3.1 }, { t: 'CDNS', w: 2.5 }, { t: 'DELL', w: 2.5 }, { t: 'APH', w: 2.4 }],
  ARKK: [{ t: 'TSLA', w: 10.1 }, { t: 'TEM', w: 5.6 }, { t: 'HOOD', w: 5.0 }, { t: 'CRSP', w: 4.7 }, { t: 'SHOP', w: 4.6 }],
  MARS: [{ t: 'SPCX', w: 22.0 }, { t: 'RKLB', w: 9.4 }, { t: 'ASTS', w: 7.3 }, { t: 'VSAT', w: 5.3 }, { t: 'GSAT', w: 5.3 }],
  FRWD: [{ t: 'NVDA', w: 8.9 }, { t: 'AMD', w: 7.7 }, { t: 'STX', w: 7.5 }, { t: 'TSM', w: 5.9 }, { t: 'LRCX', w: 5.5 }],
  BCTK: [{ t: 'TSM', w: 8.5 }, { t: 'SPCX', w: 7.7 }, { t: 'LRCX', w: 7.5 }, { t: 'AVGO', w: 7.2 }, { t: 'GOOG', w: 6.4 }],
  FWD: [{ t: 'NVDA', w: 3.1 }, { t: 'AVGO', w: 2.5 }, { t: 'AMD', w: 2.4 }, { t: 'AMAT', w: 2.4 }, { t: 'LRCX', w: 1.9 }],
  CBSE: [{ t: 'TENB', w: 3.5 }, { t: 'IBRX', w: 3.3 }, { t: 'KRYS', w: 3.2 }, { t: 'SBUX', w: 3.1 }, { t: 'GRAL', w: 3.0 }],
  FCUS: [{ t: 'INTC', w: 4.3 }, { t: 'MU', w: 4.3 }, { t: 'DELL', w: 4.2 }, { t: 'BE', w: 4.2 }, { t: 'WDC', w: 4.2 }],
  WGMI: [{ t: 'CIFR', w: 17.6 }, { t: 'HUT', w: 10.8 }, { t: 'KEEL', w: 10.2 }, { t: 'IREN', w: 10.2 }, { t: 'MARA', w: 5.1 }],
  CNEQ: [{ t: 'NVDA', w: 14.1 }, { t: 'MSFT', w: 6.4 }, { t: 'GOOG', w: 6.2 }, { t: 'TSM', w: 5.5 }, { t: 'AAPL', w: 5.2 }],
  SGRT: [{ t: 'VRT', w: 12.6 }, { t: 'WDC', w: 11.1 }, { t: 'MU', w: 6.8 }, { t: 'ARW', w: 5.9 }, { t: 'WELL', w: 5.3 }],
  SPMO: [{ t: 'MU', w: 10.6 }, { t: 'NVDA', w: 8.3 }, { t: 'AVGO', w: 6.6 }, { t: 'GOOGL', w: 4.4 }, { t: 'AMD', w: 4.4 }],
  XMMO: [{ t: 'CW', w: 4.2 }, { t: 'FTI', w: 3.6 }, { t: 'ATI', w: 3.3 }, { t: 'WWD', w: 3.0 }, { t: 'STRL', w: 2.9 }],
  POW: [{ t: 'PWR', w: 4.9 }, { t: 'POWL', w: 4.5 }, { t: 'ETN', w: 4.4 }, { t: 'PRY', w: 4.3 }, { t: 'NVT', w: 3.9 }],
  VOLT: [{ t: 'BELFB', w: 7.5 }, { t: 'POWL', w: 6.5 }, { t: 'ETN', w: 5.6 }, { t: 'NEE', w: 5.3 }, { t: 'PWR', w: 5.1 }],
  PBD: [{ t: 'SHLS', w: 1.3 }, { t: 'RIVN', w: 1.3 }, { t: 'NFI', w: 1.3 }, { t: 'SEDG', w: 1.1 }],
  PBW: [{ t: 'OPAL', w: 2.2 }, { t: 'BETA', w: 2.0 }, { t: 'RIVN', w: 1.9 }, { t: 'DAR', w: 1.9 }, { t: 'GEVO', w: 1.9 }],
  IVEP: [{ t: 'NEE', w: 4.3 }, { t: 'ETN', w: 4.2 }, { t: 'CEG', w: 4.2 }, { t: 'VRT', w: 4.1 }, { t: 'SBGSY', w: 4.1 }],
  AIRR: [{ t: 'STRL', w: 5.2 }, { t: 'CHRW', w: 4.6 }, { t: 'FIX', w: 4.2 }, { t: 'AGX', w: 3.9 }, { t: 'MTZ', w: 3.9 }],
  PRN: [{ t: 'FIX', w: 4.6 }, { t: 'HWM', w: 4.3 }, { t: 'PWR', w: 4.1 }, { t: 'STRL', w: 3.9 }, { t: 'JBL', w: 3.5 }],
  RSHO: [{ t: 'TKR', w: 8.7 }, { t: 'POWL', w: 7.3 }, { t: 'CGNX', w: 7.2 }, { t: 'CAT', w: 6.9 }, { t: 'AIT', w: 6.0 }],
  IDEF: [{ t: 'RTX', w: 8.7 }, { t: 'LMT', w: 7.0 }, { t: 'BA', w: 5.1 }, { t: 'GD', w: 4.6 }, { t: 'FTNT', w: 3.6 }],
  BILT: [{ t: 'UNP', w: 6.1 }, { t: 'AENA', w: 4.8 }, { t: 'AEP', w: 4.4 }, { t: 'TRP', w: 4.2 }, { t: 'TCL', w: 3.6 }],
  BUZZ: [{ t: 'META', w: 3.6 }, { t: 'IBRX', w: 3.5 }, { t: 'AMD', w: 3.5 }, { t: 'SOFI', w: 3.5 }, { t: 'NOW', w: 3.2 }],
  MEME: [{ t: 'BE', w: 7.6 }, { t: 'AAOI', w: 6.7 }, { t: 'HIMS', w: 6.2 }, { t: 'NBIS', w: 6.1 }, { t: 'IREN', w: 5.9 }],
  RKNG: [{ t: 'DELL', w: 4.4 }, { t: 'AMD', w: 4.1 }, { t: 'OPEN', w: 3.9 }, { t: 'BMNR', w: 3.9 }, { t: 'MU', w: 3.9 }],
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
  XSD: { name: "State Street SPDR S&P Semiconductor ETF", manager: "State Street Investment Management", aum: 3476073728 },
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
  PBW: { name: "Invesco WilderHill Clean Energy ETF", manager: "Invesco", aum: 484880768 },
  IVEP: { name: "Dan IVES Wedbush AI Power & Infrastructure ETF", manager: "Wedbush Funds", aum: 19010532 },
  AIRR: { name: "First Trust RBA American Industrial RenaissanceTM ETF", manager: "First Trust", aum: 11489859584 },
  PRN: { name: "Invesco Dorsey Wright Industrials Momentum ETF", manager: "Invesco", aum: 644142400 },
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
  'AI & ML':         { '1W': -6, '1M': -8.5, 'YTD': 36, '6M': 29.3, '1Y': 62.8 },
  'Semiconductors':  { '1W': -8.8, '1M': -13.2, 'YTD': 81.3, '6M': 65.1, '1Y': 113.5 },
  'Broad Tech':      { '1W': -4.1, '1M': -8, 'YTD': 19.5, '6M': 13.8, '1Y': 32.1 },
  'Electrification': { '1W': -1.8, '1M': -9.4, 'YTD': 20, '6M': 10.9, '1Y': 35 },
  'Industrials':     { '1W': -1.4, '1M': -4.8, 'YTD': 16.1, '6M': 4.1, '1Y': 27.1 },
  'Meme':            { '1W': -7.9, '1M': -17, 'YTD': 5.9, '6M': -6.4, '1Y': -7.9 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, IndexChartByPeriod> = {
  'AI & ML': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -2.6, spyReturn: -0.36, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 96.7, 97.19, 96.33, 93.95], spy: [100, 99.23, 99.59, 99.98, 99.61], top10Return: -6, spyReturn: -0.4, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100, 103.7, 105.11, 99.78, 98.16, 99.57, 97.38, 99.62, 102.53, 99.57, 95.5, 96.93, 94.39, 94.98, 97.29, 97.34, 94.16, 94.62, 93.8, 91.5], spy: [100, 98.75, 99.52, 99.21, 97.77, 97.72, 97.86, 97.16, 98.76, 99.53, 99.39, 99.26, 100.13, 99.65, 99.34, 100.18, 100.62, 99.85, 100.2, 100.6, 100.22], top10Return: -8.5, spyReturn: 0.2, xLabels: ["Jun 18", "Jun 25", "Jul 2", "Jul 9", "Jul 16"] },
    'YTD': { top10: [100, 102.26, 105.03, 104.9, 105.1, 103.99, 103.25, 104.79, 101.25, 100.28, 99.91, 95, 100.45, 113.32, 117.85, 119.14, 132.85, 137.97, 135.48, 149.07, 141.44, 152.44, 149.47, 153.9, 145.39, 136.04], spy: [100, 101.11, 101.43, 101.59, 101.98, 101.5, 100.64, 101.08, 99.91, 97.67, 95.11, 92.99, 96.63, 101.84, 103.25, 104.37, 107.61, 108.86, 108.7, 110.93, 108.16, 110.69, 107.58, 109.51, 110.23, 110.28], top10Return: 36, spyReturn: 10.3, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 99.82, 99.93, 99.22, 97.3, 98.62, 95.31, 96.66, 97.51, 96.28, 87.97, 96.16, 107.77, 112.09, 113.88, 122.09, 128.27, 124.89, 138.39, 148.79, 134.8, 141.95, 139.75, 141.38, 138.07, 129.35], spy: [100, 100.15, 100.54, 100.33, 98.73, 99.38, 98.36, 98.06, 96.73, 94.75, 91.37, 95.31, 100.4, 101.8, 102.9, 104.64, 106.73, 106.08, 108.5, 109.82, 106.56, 108.48, 106.01, 107.82, 108.68, 108.73], top10Return: 29.3, spyReturn: 8.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 102.07, 104.47, 104.8, 107.38, 102.47, 105.65, 104.97, 112.29, 114.6, 116.29, 118.49, 123.55, 121.16, 119.36, 129.5, 124.88, 122.5, 115.28, 117.62, 120.64, 124.29, 113.18, 121.25, 121.67, 123.52, 125.14, 124.89, 125.17, 124.49, 122.03, 123.8, 123.62, 121.75, 122.78, 121.24, 110.21, 120.64, 135.42, 140.83, 143.03, 153.65, 161.51, 157.25, 174.7, 188.33, 170.02, 179.16, 176.63, 178.5, 174.25, 162.79], spy: [100, 101.6, 101.64, 101.37, 103.31, 102.23, 103.59, 103.13, 104.48, 105.6, 105.91, 107.09, 107.83, 106.56, 106.98, 110.12, 108.55, 109.48, 106.15, 108.88, 109.56, 110.15, 107.56, 110.6, 109.44, 111.19, 110.8, 110.98, 111.4, 111.17, 109.39, 110.11, 109.96, 108.66, 107.18, 104.99, 101.24, 105.61, 111.25, 112.79, 114.01, 115.95, 118.26, 117.54, 120.22, 121.68, 118.08, 120.2, 117.47, 119.47, 120.42, 120.47], top10Return: 62.8, spyReturn: 20.5, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Semiconductors': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -3.6, spyReturn: -0.36, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 94.16, 97.75, 94.58, 91.14], spy: [100, 99.23, 99.59, 99.98, 99.61], top10Return: -8.8, spyReturn: -0.4, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 101.03, 108.61, 112.17, 101.8, 101.16, 106.31, 100.53, 103.93, 108.53, 100.69, 93.21, 96.25, 90.25, 92.24, 96.02, 95.26, 89.73, 93.12, 90.12, 86.86], spy: [100, 98.75, 99.52, 99.21, 97.77, 97.72, 97.86, 97.16, 98.76, 99.53, 99.39, 99.26, 100.13, 99.65, 99.34, 100.18, 100.62, 99.85, 100.2, 100.6, 100.22], top10Return: -13.2, spyReturn: 0.2, xLabels: ["Jun 18", "Jun 25", "Jul 2", "Jul 9", "Jul 16"] },
    'YTD': { top10: [100, 109.74, 115.62, 116.28, 118.59, 121.45, 122.96, 125.67, 127.7, 131.39, 131.8, 125.63, 135.26, 154.42, 168.37, 169.86, 183.78, 194.55, 195.62, 216.84, 204.47, 223.48, 205.65, 217.09, 194.72, 181.31], spy: [100, 101.11, 101.43, 101.59, 101.98, 101.5, 100.64, 101.08, 99.91, 97.67, 95.11, 92.99, 96.63, 101.84, 103.25, 104.37, 107.61, 108.86, 108.7, 110.93, 108.16, 110.69, 107.58, 109.51, 110.23, 110.28], top10Return: 81.3, spyReturn: 10.3, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 103.65, 106.6, 109.63, 109.87, 112.16, 107.63, 109.36, 117.6, 123.49, 117.17, 120.66, 136.41, 148.7, 158.37, 168.6, 171.29, 171.25, 189.47, 205.53, 191.94, 196.62, 185.59, 188.69, 177.2, 165.1], spy: [100, 100.15, 100.54, 100.33, 98.73, 99.38, 98.36, 98.06, 96.73, 94.75, 91.37, 95.31, 100.4, 101.8, 102.9, 104.64, 106.73, 106.08, 108.5, 109.82, 106.56, 108.48, 106.01, 107.82, 108.68, 108.73], top10Return: 65.1, spyReturn: 8.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 100.81, 105.17, 102.66, 108.75, 107.25, 109.87, 108.34, 112.36, 116.9, 118.8, 121.04, 125.46, 126.67, 125.2, 135.16, 136.52, 134.94, 133.95, 139.82, 145.12, 147.59, 133.9, 140.09, 143.75, 150.09, 160.62, 161.64, 165.08, 171.85, 173.72, 171.75, 165.02, 157.3, 156.22, 163.36, 160.5, 171.14, 193.15, 205.96, 200.66, 224.24, 230.17, 225.97, 240.63, 246.19, 228.21, 240.26, 242.47, 240, 229.66, 213.54], spy: [100, 101.6, 101.64, 101.37, 103.31, 102.23, 103.59, 103.13, 104.48, 105.6, 105.91, 107.09, 107.83, 106.56, 106.98, 110.12, 108.55, 109.48, 106.15, 108.88, 109.56, 110.15, 107.56, 110.6, 109.44, 111.19, 110.8, 110.98, 111.4, 111.17, 109.39, 110.11, 109.96, 108.66, 107.18, 104.99, 101.24, 105.61, 111.25, 112.79, 114.01, 115.95, 118.26, 117.54, 120.22, 121.68, 118.08, 120.2, 117.47, 119.47, 120.42, 120.47], top10Return: 113.5, spyReturn: 20.5, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Broad Tech': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -2, spyReturn: -0.36, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 97.71, 98.34, 97.52, 95.89], spy: [100, 99.23, 99.59, 99.98, 99.61], top10Return: -4.1, spyReturn: -0.4, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.3, 100.77, 101.3, 98.65, 96.81, 97.49, 96.81, 98.6, 100.65, 99.22, 95.93, 96.84, 94.63, 94.37, 96.04, 95.76, 93.69, 94.28, 93.52, 92.03], spy: [100, 98.75, 99.52, 99.21, 97.77, 97.72, 97.86, 97.16, 98.76, 99.53, 99.39, 99.26, 100.13, 99.65, 99.34, 100.18, 100.62, 99.85, 100.2, 100.6, 100.22], top10Return: -8, spyReturn: 0.2, xLabels: ["Jun 18", "Jun 25", "Jul 2", "Jul 9", "Jul 16"] },
    'YTD': { top10: [100, 103.22, 105.67, 104.32, 102.72, 102.18, 102.7, 105.01, 102.86, 100.75, 99.58, 96.24, 100.74, 109.87, 114.24, 114.61, 125.77, 124.69, 122.71, 131.66, 127.25, 131.02, 130.98, 131.49, 125.22, 119.47], spy: [100, 101.11, 101.43, 101.59, 101.98, 101.5, 100.64, 101.08, 99.91, 97.67, 95.11, 92.99, 96.63, 101.84, 103.25, 104.37, 107.61, 108.86, 108.7, 110.93, 108.16, 110.69, 107.58, 109.51, 110.23, 110.28], top10Return: 19.5, spyReturn: 10.3, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 99.68, 97.88, 97.26, 96.18, 97.03, 97.3, 96.83, 97.04, 96.45, 89.8, 96.07, 103.19, 107.85, 108.6, 115.7, 120.15, 114.82, 122.46, 128.29, 119.35, 123.8, 121.86, 123.04, 119.09, 113.84], spy: [100, 100.15, 100.54, 100.33, 98.73, 99.38, 98.36, 98.06, 96.73, 94.75, 91.37, 95.31, 100.4, 101.8, 102.9, 104.64, 106.73, 106.08, 108.5, 109.82, 106.56, 108.48, 106.01, 107.82, 108.68, 108.73], top10Return: 13.8, spyReturn: 8.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 101.78, 101.83, 101.95, 103.09, 101.23, 103.32, 103.04, 107.56, 109.92, 111.94, 114.01, 117.82, 119.46, 113.48, 119.2, 119.15, 115.62, 109.09, 112.04, 113.3, 114.91, 108.79, 113.84, 113.67, 116.8, 118.8, 118.42, 116.98, 117.68, 116.44, 118.08, 120.31, 117, 116.47, 115.68, 109.7, 115.9, 124.35, 127.51, 127.7, 134.95, 136.69, 133.65, 144.66, 149.54, 140.42, 145.72, 142.18, 142.21, 138.51, 132.1], spy: [100, 101.6, 101.64, 101.37, 103.31, 102.23, 103.59, 103.13, 104.48, 105.6, 105.91, 107.09, 107.83, 106.56, 106.98, 110.12, 108.55, 109.48, 106.15, 108.88, 109.56, 110.15, 107.56, 110.6, 109.44, 111.19, 110.8, 110.98, 111.4, 111.17, 109.39, 110.11, 109.96, 108.66, 107.18, 104.99, 101.24, 105.61, 111.25, 112.79, 114.01, 115.95, 118.26, 117.54, 120.22, 121.68, 118.08, 120.2, 117.47, 119.47, 120.42, 120.47], top10Return: 32.1, spyReturn: 20.5, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Electrification': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -1.7, spyReturn: -0.36, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 98.9, 98.89, 99.11, 98.17], spy: [100, 99.23, 99.59, 99.98, 99.61], top10Return: -1.8, spyReturn: -0.4, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.66, 101.31, 102.34, 100.08, 97.88, 98.02, 96.42, 96.35, 98.58, 97.49, 94.92, 95.08, 93.44, 91.56, 92.15, 92.32, 91.29, 91.31, 91.49, 90.61], spy: [100, 98.75, 99.52, 99.21, 97.77, 97.72, 97.86, 97.16, 98.76, 99.53, 99.39, 99.26, 100.13, 99.65, 99.34, 100.18, 100.62, 99.85, 100.2, 100.6, 100.22], top10Return: -9.4, spyReturn: 0.2, xLabels: ["Jun 18", "Jun 25", "Jul 2", "Jul 9", "Jul 16"] },
    'YTD': { top10: [100, 103.75, 109.42, 110.69, 110.56, 114.19, 115.44, 118.71, 111.64, 112.67, 112.38, 111.34, 114.56, 122.09, 124.91, 126.89, 134.96, 135.76, 130.22, 138.23, 133.94, 131.82, 132.15, 129.77, 121.62, 119.98], spy: [100, 101.11, 101.43, 101.59, 101.98, 101.5, 100.64, 101.08, 99.91, 97.67, 95.11, 92.99, 96.63, 101.84, 103.25, 104.37, 107.61, 108.86, 108.7, 110.93, 108.16, 110.69, 107.58, 109.51, 110.23, 110.28], top10Return: 20, spyReturn: 10.3, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 101.89, 101.98, 105.25, 106.68, 107.9, 107.24, 103.52, 104.44, 104.32, 102.23, 105.27, 113.47, 115.35, 118.78, 123.29, 126.09, 118.85, 128.43, 128.45, 119.68, 122.57, 119.2, 119.43, 112.42, 110.95], spy: [100, 100.15, 100.54, 100.33, 98.73, 99.38, 98.36, 98.06, 96.73, 94.75, 91.37, 95.31, 100.4, 101.8, 102.9, 104.64, 106.73, 106.08, 108.5, 109.82, 106.56, 108.48, 106.01, 107.82, 108.68, 108.73], top10Return: 10.9, spyReturn: 8.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 103.83, 102.27, 102.6, 104.24, 103.62, 106.01, 104.01, 106.2, 109.46, 110.61, 113.49, 117.65, 122.32, 116.95, 121.65, 120.29, 121.16, 117.19, 118.67, 118.88, 121.58, 116.69, 122.8, 123.72, 123.48, 127.08, 128.07, 127.14, 131.14, 128.99, 130.9, 131.65, 127.6, 130.45, 131.66, 129.54, 134.73, 143.64, 144.82, 143.02, 149.86, 153.21, 147.03, 153.93, 156.4, 146.64, 147.73, 145.61, 143.35, 137.7, 135.02], spy: [100, 101.6, 101.64, 101.37, 103.31, 102.23, 103.59, 103.13, 104.48, 105.6, 105.91, 107.09, 107.83, 106.56, 106.98, 110.12, 108.55, 109.48, 106.15, 108.88, 109.56, 110.15, 107.56, 110.6, 109.44, 111.19, 110.8, 110.98, 111.4, 111.17, 109.39, 110.11, 109.96, 108.66, 107.18, 104.99, 101.24, 105.61, 111.25, 112.79, 114.01, 115.95, 118.26, 117.54, 120.22, 121.68, 118.08, 120.2, 117.47, 119.47, 120.42, 120.47], top10Return: 35, spyReturn: 20.5, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Industrials': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -1.2, spyReturn: -0.36, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 98.59, 99.63, 99.57, 98.57], spy: [100, 99.23, 99.59, 99.98, 99.61], top10Return: -1.4, spyReturn: -0.4, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100.16, 100.13, 100.86, 99.16, 99.05, 100.07, 98.8, 100.15, 101.26, 99.36, 97.91, 99.26, 96.73, 96.39, 96.95, 96.5, 95.17, 96.16, 96.11, 95.15], spy: [100, 98.75, 99.52, 99.21, 97.77, 97.72, 97.86, 97.16, 98.76, 99.53, 99.39, 99.26, 100.13, 99.65, 99.34, 100.18, 100.62, 99.85, 100.2, 100.6, 100.22], top10Return: -4.8, spyReturn: 0.2, xLabels: ["Jun 18", "Jun 25", "Jul 2", "Jul 9", "Jul 16"] },
    'YTD': { top10: [100, 105.38, 111.97, 110.81, 110.38, 115.09, 116.56, 118.51, 114.12, 111.55, 110, 109.11, 113.38, 119.44, 118.69, 118.11, 125.08, 122.97, 119.73, 123.99, 120.33, 123.87, 121.72, 124.43, 118.35, 116.05], spy: [100, 101.11, 101.43, 101.59, 101.98, 101.5, 100.64, 101.08, 99.91, 97.67, 95.11, 92.99, 96.63, 101.84, 103.25, 104.37, 107.61, 108.86, 108.7, 110.93, 108.16, 110.69, 107.58, 109.51, 110.23, 110.28], top10Return: 16.1, spyReturn: 10.3, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 99.07, 99.12, 103.26, 104.16, 106.15, 104.88, 102.66, 101.01, 99.78, 95.67, 101.56, 107.07, 106.42, 105.9, 110.1, 109.76, 105.45, 111.06, 109.78, 107.62, 109.66, 108.93, 109.09, 106.09, 104.08], spy: [100, 100.15, 100.54, 100.33, 98.73, 99.38, 98.36, 98.06, 96.73, 94.75, 91.37, 95.31, 100.4, 101.8, 102.9, 104.64, 106.73, 106.08, 108.5, 109.82, 106.56, 108.48, 106.01, 107.82, 108.68, 108.73], top10Return: 4.1, spyReturn: 8.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 101.64, 102.41, 103.17, 104.63, 101.59, 104.18, 102.8, 104.47, 105.91, 107.56, 109.94, 112.72, 110.82, 108.31, 113.13, 111.19, 109.5, 106.02, 107.79, 107.67, 109.95, 106.86, 112.05, 111.94, 117.66, 122.79, 121.45, 121.63, 127.67, 127.19, 129.95, 129.39, 124.97, 122.72, 121.92, 116.95, 124.31, 130.65, 130.09, 129.06, 134.75, 134.1, 129.04, 135.76, 134.63, 131.8, 134.44, 133.55, 133.62, 129.69, 127.14], spy: [100, 101.6, 101.64, 101.37, 103.31, 102.23, 103.59, 103.13, 104.48, 105.6, 105.91, 107.09, 107.83, 106.56, 106.98, 110.12, 108.55, 109.48, 106.15, 108.88, 109.56, 110.15, 107.56, 110.6, 109.44, 111.19, 110.8, 110.98, 111.4, 111.17, 109.39, 110.11, 109.96, 108.66, 107.18, 104.99, 101.24, 105.61, 111.25, 112.79, 114.01, 115.95, 118.26, 117.54, 120.22, 121.68, 118.08, 120.2, 117.47, 119.47, 120.42, 120.47], top10Return: 27.1, spyReturn: 20.5, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Meme': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -4.1, spyReturn: -0.36, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 96.48, 95.47, 94.7, 92.1], spy: [100, 99.23, 99.59, 99.98, 99.61], top10Return: -7.9, spyReturn: -0.4, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 99.25, 101.57, 102.78, 99.85, 95.88, 93.98, 93.26, 95.18, 97.51, 96.31, 91.9, 90.68, 88.39, 87.45, 89.48, 89.9, 86.8, 85.91, 85.25, 82.96], spy: [100, 98.75, 99.52, 99.21, 97.77, 97.72, 97.86, 97.16, 98.76, 99.53, 99.39, 99.26, 100.13, 99.65, 99.34, 100.18, 100.62, 99.85, 100.2, 100.6, 100.22], top10Return: -17, spyReturn: 0.2, xLabels: ["Jun 18", "Jun 25", "Jul 2", "Jul 9", "Jul 16"] },
    'YTD': { top10: [100, 106.79, 106.11, 103.33, 99.33, 97.65, 94.29, 96.08, 93.73, 93.05, 90.91, 89.09, 94.45, 109.79, 113.13, 110.76, 124.96, 125.75, 127.15, 142.64, 125.13, 132.26, 125.71, 127.01, 115.07, 105.91], spy: [100, 101.11, 101.43, 101.59, 101.98, 101.5, 100.64, 101.08, 99.91, 97.67, 95.11, 92.99, 96.63, 101.84, 103.25, 104.37, 107.61, 108.86, 108.7, 110.93, 108.16, 110.69, 107.58, 109.51, 110.23, 110.28], top10Return: 5.9, spyReturn: 10.3, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 94.82, 85.76, 87.87, 83.33, 84.53, 81.37, 82.7, 83.73, 82.66, 73.54, 81.54, 93.9, 100.19, 94.25, 105.78, 110.07, 103.03, 122.21, 125.93, 108.19, 112.11, 107.46, 109.07, 101.16, 93.62], spy: [100, 100.15, 100.54, 100.33, 98.73, 99.38, 98.36, 98.06, 96.73, 94.75, 91.37, 95.31, 100.4, 101.8, 102.9, 104.64, 106.73, 106.08, 108.5, 109.82, 106.56, 108.48, 106.01, 107.82, 108.68, 108.73], top10Return: -6.4, spyReturn: 8.7, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 103.2, 98.99, 92.62, 91.22, 87.95, 87.74, 81.98, 83.52, 83.62, 87.07, 88.49, 91.49, 84.68, 86.79, 86.92, 89.49, 88.08, 85.73, 85.54, 85.95, 85.15, 81.57, 84.76, 87.3, 90.07, 91.01, 88.05, 89.23, 89.38, 87.84, 88.73, 89.54, 91.93, 95.01, 96.02, 92.88, 95.65, 103.69, 108.53, 103.07, 102.69, 113.57, 113.81, 114.04, 112.75, 107.28, 105.93, 103.78, 99.76, 97.37, 92.05], spy: [100, 101.6, 101.64, 101.37, 103.31, 102.23, 103.59, 103.13, 104.48, 105.6, 105.91, 107.09, 107.83, 106.56, 106.98, 110.12, 108.55, 109.48, 106.15, 108.88, 109.56, 110.15, 107.56, 110.6, 109.44, 111.19, 110.8, 110.98, 111.4, 111.17, 109.39, 110.11, 109.96, 108.66, 107.18, 104.99, 101.24, 105.61, 111.25, 112.79, 114.01, 115.95, 118.26, 117.54, 120.22, 121.68, 118.08, 120.2, 117.47, 119.47, 120.42, 120.47], top10Return: -7.9, spyReturn: 20.5, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
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
export const SCAN_TIMESTAMP    = '2026-07-16T13:38:15.056Z';
export const SCAN_TIMESTAMP_NY = 'July 16, 2026 at 9:38 AM ET';
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
export const HOLDINGS_COUNT = 1290;
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
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 13.30, bestProScore: 6.39, avgProScore: 4.43, price: 208.76, weeklyChange: -1.04 },
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.20, bestProScore: 4.92, avgProScore: 4.07, price: 876.46, weeklyChange: -10.50 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 11.16, bestProScore: 5.17, avgProScore: 3.72, price: 512.78, weeklyChange: -8.09 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 7.25, bestProScore: 3.12, avgProScore: 2.42, price: 379.90, weeklyChange: -5.02 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.63, bestProScore: 2.83, avgProScore: 2.31, price: 410.69, weeklyChange: -5.39 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.12, bestProScore: 3.04, avgProScore: 2.06, price: 99.42, weeklyChange: -9.49 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 4.12, bestProScore: 2.19, avgProScore: 2.06, price: 237.31, weeklyChange: 2.21 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.75, bestProScore: 2.46, avgProScore: 1.88, price: 325.79, weeklyChange: -7.00 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 3.28, bestProScore: 1.74, avgProScore: 1.64, price: 197.22, weeklyChange: -16.36 },
  { ticker: 'MSFT', name: `MICROSOFT CORP`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 3.07, bestProScore: 1.86, avgProScore: 1.54, price: 396.17, weeklyChange: 2.87 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': -9.9, '1M': -11.7, 'YTD': 82.4, '6M': 64.8, '1Y': 144.8 },
  ARTY: { '1W': -7.2, '1M': -10.4, 'YTD': 39.6, '6M': 30.3, '1Y': 60.8 },
  BAI:  { '1W': -7.5, '1M': -11.7, 'YTD': 32.6, '6M': 26.5, '1Y': 49.6 },
  IGPT: { '1W': -7.1, '1M': -8.1, 'YTD': 54.5, '6M': 46.7, '1Y': 84.7 },
  IVES: { '1W': -2.4, '1M': -1.9, 'YTD': 17.1, '6M': 11.7, '1Y': 35 },
  ALAI: { '1W': -3.1, '1M': -3.7, 'YTD': 21.7, '6M': 19.1, '1Y': 41.5 },
  CHAT: { '1W': -6.4, '1M': -10.2, 'YTD': 45.7, '6M': 39.2, '1Y': 73.6 },
  AIFD: { '1W': -5, '1M': -8.8, 'YTD': 34.2, '6M': 32.5, '1Y': 62.8 },
  SPRX: { '1W': -10.5, '1M': -17.3, 'YTD': 18.6, '6M': 8, '1Y': 50.1 },
  AOTG: { '1W': -1.4, '1M': -1.3, 'YTD': 13.9, '6M': 14.5, '1Y': 25.1 },
  // Semiconductors
  SOXX: { '1W': -7.2, '1M': -8.8, 'YTD': 79.1, '6M': 57.5, '1Y': 119.6 },
  PSI:  { '1W': -6.7, '1M': -10.8, 'YTD': 88.5, '6M': 60.7, '1Y': 142.5 },
  XSD:  { '1W': -8, '1M': -13, 'YTD': 61.2, '6M': 45.9, '1Y': 95.6 },
  DRAM: { '1W': -13.5, '1M': -20, 'YTD': 96.4, '6M': 96.4, '1Y': 96.4 },
  // Broad Tech
  PTF:  { '1W': -9.3, '1M': -20, 'YTD': 37.2, '6M': 25.7, '1Y': 54 },
  WCLD: { '1W': 2.8, '1M': 14.5, 'YTD': -0.6, '6M': 8.5, '1Y': -1.4 },
  IGV:  { '1W': 1, '1M': 2.1, 'YTD': -11.7, '6M': -5.1, '1Y': -15 },
  FDTX: { '1W': -5.6, '1M': -7.7, 'YTD': 27, '6M': 26.7, '1Y': 32.5 },
  GTEK: { '1W': -4.6, '1M': -7.3, 'YTD': 42.1, '6M': 36, '1Y': 58.4 },
  ARKK: { '1W': -2.3, '1M': -0.9, 'YTD': 1.9, '6M': -4, '1Y': 4.2 },
  MARS: { '1W': -9, '1M': -24.9, 'YTD': 2.5, '6M': 2.5, '1Y': 2.5 },
  FRWD: { '1W': -4.8, '1M': -7.2, 'YTD': 24.5, '6M': 23.9, '1Y': 24.5 },
  BCTK: { '1W': -3.1, '1M': -5.9, 'YTD': 20.2, '6M': 18.7, '1Y': 22.4 },
  FWD:  { '1W': -5.1, '1M': -8.3, 'YTD': 25.5, '6M': 15.2, '1Y': 45.4 },
  CBSE: { '1W': -1, '1M': -2.4, 'YTD': 25.8, '6M': 14.6, '1Y': 33.3 },
  FCUS: { '1W': -6.3, '1M': -15.7, 'YTD': 19.3, '6M': 3.5, '1Y': 40.9 },
  WGMI: { '1W': -8.1, '1M': -26.3, 'YTD': 33.3, '6M': -0.1, '1Y': 95 },
  CNEQ: { '1W': -1.7, '1M': -2.7, 'YTD': 16.3, '6M': 13.8, '1Y': 33.9 },
  SGRT: { '1W': -7.1, '1M': -11.6, 'YTD': 29.2, '6M': 21.4, '1Y': 61.6 },
  SPMO: { '1W': -4, '1M': -4.5, 'YTD': 23.7, '6M': 23, '1Y': 30.8 },
  XMMO: { '1W': -1.6, '1M': -6.7, 'YTD': 14.7, '6M': 11, '1Y': 22.7 },
  // Electrification
  POW:  { '1W': -1, '1M': -11.3, 'YTD': 40.9, '6M': 29.8, '1Y': 36.7 },
  VOLT: { '1W': -2.4, '1M': -5.2, 'YTD': 31.2, '6M': 20.6, '1Y': 46.8 },
  PBD:  { '1W': 0.2, '1M': -9.3, 'YTD': 16, '6M': 7.7, '1Y': 41.6 },
  PBW:  { '1W': -2.8, '1M': -14.4, 'YTD': 12.1, '6M': -3, '1Y': 50.4 },
  IVEP: { '1W': -3.2, '1M': -6.7, 'YTD': -0.4, '6M': -0.4, '1Y': -0.4 },
  // Industrials
  AIRR: { '1W': -0.8, '1M': -5.9, 'YTD': 24.7, '6M': 8, '1Y': 46.5 },
  PRN:  { '1W': -3, '1M': -10, 'YTD': 28, '6M': 13, '1Y': 39.8 },
  IDEF: { '1W': -2.3, '1M': -4.8, 'YTD': 1.4, '6M': -13.2, '1Y': 9 },
  BILT: { '1W': 0.4, '1M': 1.3, 'YTD': 10.1, '6M': 8.5, '1Y': 13.3 },
  // Meme
  BUZZ: { '1W': -3.9, '1M': -7, 'YTD': 7, '6M': -1.5, '1Y': 8.6 },
  MEME: { '1W': -12.4, '1M': -25.7, 'YTD': 17.3, '6M': -11.1, '1Y': -25.9 },
  RKNG: { '1W': -7.4, '1M': -18.3, 'YTD': -6.5, '6M': -6.5, '1Y': -6.5 },
};
// @@END_GENERATED:ETF_RETURNS@@

// @@GENERATED:ETF_DAY_CHANGE@@
// Today's % move per ETF ticker (1D, vs prior close). Refreshed by the 3×/day
// price jobs. Powers the 1D ranking in the theme-ETF side panel.
export const ETF_DAY_CHANGE: Record<string, number> = {
  AIS:  -3.95,
  ARTY: -2.09,
  BAI:  -2.8,
  IGPT: -2.56,
  IVES: -1.37,
  ALAI: -1.53,
  CHAT: -2.73,
  SPRX: -3.63,
  SOXX: -2.87,
  PSI:  -3.28,
  XSD:  -3.39,
  DRAM: -4.97,
  PTF:  -3.52,
  WCLD: 0.32,
  IGV:  -0.59,
  FDTX: -2.1,
  ARKK: -1.57,
  MARS: -3.84,
  FWD:  -2.11,
  FCUS: -2.52,
  WGMI: -3.74,
  SPMO: -1.58,
  XMMO: -1.14,
  VOLT: -1.56,
  PBW:  -2,
  IVEP: -1.63,
  AIRR: -0.48,
  PRN:  -2.08,
  IDEF: -0.95,
  MEME: -4.08,
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
  'AI & ML': { etfs: ['AIS', 'AIFD', 'ALAI'], series: { '1W': [100, 97, 97.03, 96.75, 93.99], '1M': [100, 99.64, 103.11, 104.72, 100.34, 98.11, 99.43, 98.01, 99.19, 102.09, 100.25, 95.91, 96.85, 95.1, 95.09, 97.2, 97.8, 94.86, 94.91, 94.63, 91.93], 'YTD': [100, 102.42, 104.82, 104.93, 106.09, 105.76, 106.2, 108.7, 104.59, 104.03, 104.47, 99.12, 105.08, 118.74, 124.15, 125.76, 140.95, 146.46, 143.84, 156.03, 152.14, 161.53, 161.35, 165, 155.83, 146.13], '6M': [100, 99.93, 100.93, 101.08, 100.3, 102.04, 99.49, 99.58, 101.53, 99.66, 92.57, 100.85, 113.13, 118.28, 121.08, 129.58, 136.93, 132.88, 146.43, 155.97, 143.64, 151.92, 149.81, 152.62, 147.8, 138.83], '1Y': [100, 102.22, 104.81, 104.92, 107.86, 103.9, 106.94, 106.56, 113.97, 116.44, 118.41, 121.75, 124.98, 123.15, 121.92, 132.35, 127.36, 125.87, 118.86, 121.52, 123.75, 128.26, 117.78, 125.65, 126.73, 128.65, 130.03, 130.05, 131.55, 131.93, 130.93, 133.41, 133.36, 131.33, 133.49, 131.08, 120.65, 131.72, 148.11, 154.93, 158.75, 170.71, 180.55, 175.06, 193.72, 208.61, 189.75, 200.9, 198.81, 202.08, 195.69, 183.02] }, returns: { '1W': -6, '1M': -8.1, 'YTD': 46.1, '6M': 38.8, '1Y': 83 } },
  'Semiconductors': { etfs: ['PSI', 'DRAM', 'XSD'], series: { '1W': [100, 93.8, 97.76, 94.26, 90.59], '1M': [100, 100.9, 108.76, 112.63, 101.71, 100.96, 106.5, 100.79, 103.93, 108.57, 100.44, 92.35, 95.55, 89.23, 91.3, 95.23, 94.23, 88.42, 92.14, 88.85, 85.4], 'YTD': [100, 110.95, 116.25, 117.07, 119.09, 123.03, 124.33, 128.07, 132.88, 138.64, 138.93, 131.7, 142.26, 161.48, 177.93, 177.92, 188.93, 200.93, 203.24, 226.14, 212.88, 228.42, 207.41, 218.53, 195.24, 182.05], '6M': [100, 104.8, 107.81, 111.84, 112.03, 114.3, 110.92, 113.07, 123.92, 131.9, 126.08, 127.04, 142.83, 157.32, 168.46, 177.81, 178.17, 179.99, 197.74, 215.16, 201.2, 204.61, 188.91, 193.21, 179.65, 167.64], '1Y': [100, 101.56, 106.58, 104.72, 110.55, 109.92, 112.38, 111.65, 115.41, 120.78, 121.88, 123.88, 127.71, 129.85, 128.37, 138.19, 140.57, 139.25, 140.38, 146.88, 151.5, 153.85, 139.82, 145.24, 149.09, 155.5, 167.68, 168.96, 172.23, 181.25, 183.57, 179.87, 172.25, 164.08, 162.44, 172.13, 171.96, 180.98, 203.08, 217.52, 208, 233.47, 236.86, 233.87, 244.29, 246.13, 227.98, 240.1, 241.65, 238.6, 227.26, 211.51] }, returns: { '1W': -9.4, '1M': -14.6, 'YTD': 82.1, '6M': 67.6, '1Y': 111.5 } },
  'Broad Tech': { etfs: ['WGMI', 'GTEK', 'SGRT'], series: { '1W': [100, 96.77, 96, 95.78, 93.41], '1M': [100, 99.06, 101.31, 103.42, 101.31, 97.91, 97.92, 97.15, 96.32, 97.73, 95.03, 89.88, 91, 88.35, 88.9, 91, 90.81, 88.03, 87.27, 87, 84.91], 'YTD': [100, 107.13, 114.87, 111.53, 108.95, 108.92, 107.84, 112.53, 105.29, 103.14, 103.87, 99.36, 103.96, 121.38, 124.7, 123.61, 144.67, 144.79, 140.07, 157.48, 150.54, 158.98, 162.4, 155.79, 144.84, 134.87], '6M': [100, 97.42, 95.36, 96.05, 94.9, 97.53, 94.69, 91.4, 93.27, 92.29, 85.23, 93.24, 106.84, 110.03, 109.71, 120.87, 126.62, 120.2, 137.77, 142.62, 130.39, 139.9, 136.99, 133.24, 127.47, 119.1], '1Y': [100, 103.1, 99.34, 101.73, 103.05, 105.74, 109.87, 112.01, 121.69, 130.03, 133.59, 137.92, 149.94, 161.69, 140.68, 149.44, 156.87, 139.83, 127.55, 134.68, 137.8, 138.83, 124.64, 134.68, 136.38, 141.15, 147.69, 145.06, 141.73, 143.09, 137.65, 139.03, 137.76, 130.76, 134.51, 135.81, 129.89, 138.82, 156.31, 158.4, 163.36, 178.77, 181.95, 180.2, 203.67, 205.61, 194.5, 207.45, 200.98, 189.43, 184.7, 171.66] }, returns: { '1W': -6.6, '1M': -15.1, 'YTD': 34.9, '6M': 19.1, '1Y': 71.7 } },
  'Electrification': { etfs: ['VOLT', 'POW', 'PBD'], series: { '1W': [100, 99.85, 98.5, 99.32, 98.93], '1M': [100, 99.38, 99.74, 101.24, 100.82, 98.05, 98.29, 97.21, 95.86, 98.36, 98.42, 95.78, 94.68, 94.58, 91.69, 91.82, 92.4, 92.22, 91.04, 91.77, 91.38], 'YTD': [100, 102.4, 109.24, 111.12, 111.57, 117.52, 119.18, 124.03, 115.62, 115.86, 117.94, 116.17, 119.42, 129.92, 132.28, 137.11, 147.91, 145.54, 138.19, 145.08, 142.58, 139.42, 143.03, 139.51, 130.01, 129.38], '6M': [100, 102.55, 103.57, 107.36, 110.32, 112.32, 112.2, 105.65, 107.32, 107.43, 106.31, 110.54, 119.88, 122.06, 127.31, 133.3, 138.09, 127.37, 135.86, 133.9, 126.28, 130.79, 128.27, 128.86, 119.94, 119.37], '1Y': [100, 103.29, 102.69, 102.76, 103.09, 101.95, 104.23, 102.45, 104.84, 106.5, 105.9, 109.02, 111.84, 114.54, 111.62, 116.86, 116.12, 118.27, 115.07, 115.81, 117.05, 120.1, 116.19, 121.41, 122.6, 120.1, 124.08, 126.62, 127.39, 131.47, 129.87, 133.27, 136.47, 132.83, 135.3, 137.44, 136.28, 143.23, 151.72, 152.6, 149.41, 156.78, 159.99, 153.74, 156.53, 157.14, 153.05, 153.42, 153.09, 149.37, 143.51, 141.69] }, returns: { '1W': -1.1, '1M': -8.6, 'YTD': 29.4, '6M': 19.4, '1Y': 41.7 } },
  'Industrials': { etfs: ['AIRR', 'BILT', 'IDEF'], series: { '1W': [100, 98.98, 99.71, 99.79, 99.1], '1M': [100, 99.9, 99.23, 99.23, 98.21, 98.2, 98.83, 98.25, 99.24, 100.02, 98.91, 98.97, 100.41, 98.43, 98.03, 98.13, 97.74, 96.77, 97.47, 97.55, 96.88], 'YTD': [100, 105.81, 111.55, 110.52, 109.9, 114.45, 115.86, 117.24, 114.26, 111.97, 109.87, 108.57, 112.99, 117.11, 115.78, 115.02, 119.28, 117.08, 115.12, 118.45, 115.39, 117.43, 113.94, 116.13, 113.52, 112.08], '6M': [100, 99.22, 99.24, 103.07, 104.09, 105.5, 105.57, 103.48, 101.79, 99.57, 96.22, 101.57, 105.55, 104.38, 103.72, 106.36, 105.49, 102.22, 106.42, 104.87, 103.68, 104.35, 102.71, 103.29, 102.35, 101.11], '1Y': [100, 101.92, 102.23, 103.6, 105, 101.96, 104.39, 103.27, 104.87, 106.56, 108.24, 110.3, 112.82, 110.15, 108.62, 112.12, 110.48, 109.43, 106.85, 108.09, 108.04, 109.69, 107.68, 111.52, 111.61, 118.26, 122.48, 121.27, 121.45, 127.39, 126.53, 128.69, 128.8, 125.3, 122.94, 121.15, 117.17, 123.88, 128.16, 127.04, 125.7, 129.63, 128.25, 124.56, 129.48, 128.17, 126.49, 127.45, 125.45, 125.99, 124.55, 122.93] }, returns: { '1W': -0.9, '1M': -3.1, 'YTD': 12.1, '6M': 1.1, '1Y': 22.9 } },
  'Meme': { etfs: ['BUZZ', 'RKNG', 'MEME'], series: { '1W': [100, 96.48, 95.47, 94.7, 92.1], '1M': [100, 99.25, 101.57, 102.78, 99.85, 95.88, 93.98, 93.26, 95.18, 97.51, 96.31, 91.9, 90.68, 88.39, 87.45, 89.48, 89.9, 86.8, 85.91, 85.25, 82.96], 'YTD': [100, 106.79, 106.11, 103.33, 99.33, 97.65, 94.29, 96.08, 93.73, 93.05, 90.91, 89.09, 94.45, 109.79, 113.13, 110.76, 124.96, 125.75, 127.15, 142.64, 125.13, 132.26, 125.71, 127.01, 115.07, 105.91], '6M': [100, 94.82, 85.76, 87.87, 83.33, 84.53, 81.37, 82.7, 83.73, 82.66, 73.54, 81.54, 93.9, 100.19, 94.25, 105.78, 110.07, 103.03, 122.21, 125.93, 108.19, 112.11, 107.46, 109.07, 101.16, 93.62], '1Y': [100, 103.2, 98.99, 92.62, 91.22, 87.95, 87.74, 81.98, 83.52, 83.62, 87.07, 88.49, 91.49, 84.68, 86.79, 86.92, 89.49, 88.08, 85.73, 85.54, 85.95, 85.15, 81.57, 84.76, 87.3, 90.07, 91.01, 88.05, 89.23, 89.38, 87.84, 88.73, 89.54, 91.93, 95.01, 96.02, 92.88, 95.65, 103.69, 108.53, 103.07, 102.69, 113.57, 113.81, 114.04, 112.75, 107.28, 105.93, 103.78, 99.76, 97.37, 92.05] }, returns: { '1W': -7.9, '1M': -17, 'YTD': 5.9, '6M': -6.4, '1Y': -8 } },
};
// @@END_GENERATED:THEME_REPRESENTATIVES@@

// @@GENERATED:THEME_UNIVERSE@@
export const THEME_UNIVERSE: Partial<Record<Theme, ThemeUniverseFund[]>> = {
  'AI & ML': [
    { t: 'AIS', chosen: true, anchor: true, score: 104.8, ret6: 64.8, ret1: 144.8, corr: 0.86, reason: 'anchor', series: { '1W': [100, 94.03, 96.77, 93.71, 90.05], '1M': [100, 102.36, 109.61, 113.24, 103.23, 102.82, 107.58, 102.24, 105.33, 109.27, 101.82, 95.08, 98.72, 92.7, 94.74, 98.92, 98, 92.15, 94.84, 91.84, 88.25], 'YTD': [100, 105.32, 110.67, 111.78, 115.2, 115.09, 116.94, 121.9, 114.16, 113.93, 114.22, 109.56, 116.02, 136.4, 143.18, 148.35, 175.11, 187.82, 180.78, 202.94, 187.53, 215.2, 213.37, 225.87, 204.47, 182.42], '6M': [100, 101, 104.09, 105.98, 105.02, 109.21, 103.06, 104.98, 108.68, 105.31, 94.64, 106.32, 123.25, 129.38, 134.04, 152.46, 162.54, 156.36, 181.22, 196.12, 174.33, 186.77, 192.03, 190.17, 184.76, 164.83] } },
    { t: 'IGPT', chosen: false, anchor: false, score: 65.7, ret6: 46.7, ret1: 84.7, corr: 0.96, reason: 'correlated', series: { '1W': [100, 95.52, 97.38, 95.3, 92.86], '1M': [100, 100.84, 106.44, 108.15, 100.54, 99.89, 102.98, 98.88, 101.35, 104.14, 100.18, 95.31, 98.18, 94.66, 95.6, 98.79, 99, 94.57, 96.41, 94.35, 91.93], 'YTD': [100, 103.85, 105.3, 107.7, 110.17, 105.43, 105.95, 108.05, 104.09, 102.22, 101.7, 95.71, 101.35, 115.03, 118.8, 126.1, 146.01, 153.99, 149.79, 167.65, 152.83, 173.15, 168.99, 175.05, 166.05, 154.51], '6M': [100, 102.28, 104.63, 101.17, 99.28, 101.87, 97.37, 98.79, 99.82, 97.83, 88.61, 96.6, 109.25, 112.82, 119.75, 133.42, 142.97, 137.75, 155.8, 163.17, 150.1, 159.63, 159.45, 159.92, 157.7, 146.74] } },
    { t: 'CHAT', chosen: false, anchor: false, score: 56.4, ret6: 39.2, ret1: 73.6, corr: 0.94, reason: 'correlated', series: { '1W': [100, 95.52, 96.78, 96.38, 93.65], '1M': [100, 101.24, 106.96, 108.77, 100.72, 100.08, 102.19, 97.84, 99.74, 103.14, 97.74, 92.8, 95.11, 91.56, 93.86, 96.56, 95.88, 91.59, 92.8, 92.41, 89.79], 'YTD': [100, 102.34, 104.65, 104.82, 105.87, 106.41, 108.94, 109.89, 105.29, 107.24, 106.05, 102.24, 108.6, 124.59, 128.46, 128.29, 145.64, 150.24, 146.37, 166.59, 153.75, 167.15, 163.45, 167.37, 156.7, 145.71], '6M': [100, 100.16, 101.17, 101.6, 103.19, 105.82, 99.38, 103.61, 105.43, 103.53, 95.72, 104.7, 119.06, 122.76, 122.59, 133.45, 136.53, 135.45, 152.03, 167.67, 147.59, 155.07, 155.2, 151.57, 149.74, 139.24] } },
    { t: 'AIFD', chosen: true, anchor: false, score: 47.6, ret6: 32.5, ret1: 62.8, corr: 0.84, reason: 'diversifier', series: { '1W': [100, 99.45, 97, 98.17, 95.02], '1M': [100, 97.03, 97.27, 99.81, 99.77, 94.83, 93.84, 95.33, 93.83, 96.99, 100.23, 97.17, 93.33, 95.73, 92.93, 94.09, 95.98, 95.46, 93.11, 94.23, 91.21], 'YTD': [100, 100.69, 101.61, 102.21, 103.1, 104.47, 105.34, 107.6, 104.7, 104.44, 107.39, 100.06, 105.56, 114.91, 121.97, 120.44, 130.84, 133.25, 132.2, 138.62, 149.07, 141.94, 146.83, 142.73, 138.46, 134.22], '6M': [100, 100.16, 100.88, 101.22, 103.06, 102.93, 104.86, 100.86, 102.55, 102.68, 98.81, 104.24, 113.48, 120.44, 123.02, 126, 133.87, 129.42, 137.14, 145.77, 139.45, 145.32, 137.82, 145.66, 136.73, 132.54] } },
    { t: 'ARTY', chosen: false, anchor: false, score: 45.5, ret6: 30.3, ret1: 60.8, corr: 0.94, reason: 'correlated', series: { '1W': [100, 96.07, 96.5, 94.86, 92.79], '1M': [100, 100.83, 105.12, 105.81, 99.15, 98.52, 99.6, 96.3, 98.73, 101.47, 97.44, 94.71, 96.52, 93.17, 94.7, 96.88, 96.59, 92.79, 93.21, 91.62, 89.62], 'YTD': [100, 102.74, 107.12, 108.57, 107.91, 106.72, 106.27, 107.49, 101.25, 100.21, 99.15, 95.16, 99.81, 116.77, 122.81, 124.18, 140.81, 140.66, 137.69, 154.96, 146.6, 160.59, 154.46, 158.07, 150.93, 139.62], '6M': [100, 101.36, 100.74, 100.23, 98.02, 99.01, 93.26, 95.39, 96.45, 95.12, 85.64, 93.74, 109.01, 114.65, 115.93, 126.33, 129.66, 123.6, 137.74, 156.46, 139.49, 145.44, 143.29, 141.72, 140.9, 130.34] } },
    { t: 'BAI', chosen: false, anchor: false, score: 38, ret6: 26.5, ret1: 49.6, corr: 0.94, reason: 'correlated', series: { '1W': [100, 95.2, 97.78, 95.22, 92.54], '1M': [100, 100.76, 106.42, 108.48, 99.88, 99.4, 102.9, 98.26, 101.68, 105.46, 99, 94.02, 96.42, 91.14, 92.88, 96.12, 95.44, 90.86, 93.32, 90.88, 88.32], 'YTD': [100, 100.96, 104.8, 103.78, 104.11, 104.92, 104.68, 105.86, 101.41, 100.18, 100.54, 97.96, 103.21, 118.95, 121.29, 122.85, 138.56, 145.41, 139.01, 149.73, 136.79, 156.46, 149.94, 158.32, 144.29, 132.58], '6M': [100, 99.03, 99.34, 101.26, 98.91, 101.03, 95.96, 97.19, 97.68, 99.11, 89.31, 99.6, 113.5, 115.73, 117.22, 128.31, 134.01, 128.94, 142.64, 148.77, 134.13, 143.24, 142.38, 141.81, 137.68, 126.5] } },
    { t: 'ALAI', chosen: true, anchor: false, score: 30.3, ret6: 19.1, ret1: 41.5, corr: 0.86, reason: 'diversifier', series: { '1W': [100, 97.53, 97.33, 98.37, 96.89], '1M': [100, 99.54, 102.45, 101.12, 98.01, 96.69, 96.86, 96.47, 98.4, 100.02, 98.69, 95.49, 98.51, 96.87, 97.6, 98.58, 99.43, 96.98, 96.78, 97.81, 96.34], 'YTD': [100, 101.24, 102.19, 100.8, 99.96, 97.71, 96.32, 96.61, 94.9, 93.71, 91.79, 87.74, 93.66, 104.9, 107.31, 108.49, 116.89, 118.31, 118.55, 126.53, 119.83, 127.44, 123.84, 126.39, 124.56, 121.74], '6M': [100, 98.64, 97.82, 96.05, 92.82, 93.98, 90.55, 92.91, 93.36, 90.98, 84.25, 91.98, 102.66, 105.01, 106.17, 110.27, 114.39, 112.85, 120.92, 126.02, 117.13, 123.66, 119.57, 122.03, 121.9, 119.13] } },
    { t: 'SPRX', chosen: false, anchor: false, score: 29.1, ret6: 8, ret1: 50.1, corr: 0.89, reason: 'correlated', series: { '1W': [100, 94.41, 95.31, 92.86, 89.46], '1M': [100, 100.81, 104.94, 106.04, 99.36, 97.54, 99.14, 95.95, 101.53, 105.03, 98.82, 91.92, 93.71, 88.31, 90.1, 93.8, 92.48, 87.31, 88.14, 85.87, 82.73], 'YTD': [100, 102.37, 109.87, 105.67, 105.25, 108.01, 101.82, 103.07, 99.31, 97.55, 97.61, 92.42, 98.05, 111.67, 113.75, 109.04, 119.53, 127.61, 127.72, 142.45, 133.61, 150.81, 142.47, 150.6, 134.5, 118.63], '6M': [100, 96.17, 95.79, 99.76, 92.39, 93.99, 90.16, 91.06, 91.75, 91.61, 78.35, 89.43, 101.63, 103.53, 99.24, 104.6, 111.19, 110.71, 130.83, 138.94, 122.91, 130.5, 127.29, 128.96, 122.41, 107.97] } },
    { t: 'IVES', chosen: false, anchor: false, score: 23.4, ret6: 11.7, ret1: 35, corr: 0.91, reason: 'correlated', series: { '1W': [100, 98.79, 99.02, 99.02, 97.63], '1M': [100, 99.02, 100.77, 99.52, 97.11, 95.79, 95.07, 95.87, 98.91, 100.95, 100.45, 98.78, 101.22, 99.52, 99.52, 101.09, 100.48, 99.26, 99.5, 99.5, 98.09], 'YTD': [100, 102.18, 104.87, 103.7, 102.44, 98.54, 96.58, 96.68, 96.05, 95.16, 92.57, 87, 91.24, 98.83, 103.16, 103.8, 111.89, 115.37, 115.75, 126.99, 118.22, 121.2, 115.94, 120.53, 120.69, 117.11], '6M': [100, 98.88, 97.68, 94.21, 91.07, 90.65, 88.87, 91.64, 91.61, 89.83, 81.81, 87.63, 94.24, 98.37, 98.97, 103.14, 108.48, 107.87, 114.15, 124.89, 111.43, 113.85, 109.05, 114.36, 115.08, 111.67] } },
    { t: 'AOTG', chosen: false, anchor: false, score: 19.8, ret6: 14.5, ret1: 25.1, corr: 0.87, reason: 'correlated', series: { '1W': [100, 100.5, 98.02, 99.37, 98.56], '1M': [100, 97.61, 97.01, 100.18, 100.02, 96.03, 95.57, 96.7, 96.74, 98.79, 101.31, 99.68, 97.59, 100.28, 97.89, 98.06, 100.12, 100.61, 98.13, 99.49, 98.67], 'YTD': [100, 100.91, 99.17, 99.99, 96.99, 92.64, 89.61, 90.71, 91.37, 88.19, 88.03, 82.15, 86.96, 91.12, 97.74, 99.82, 103.21, 107.06, 106.94, 114.27, 116.15, 110.44, 115.46, 114.04, 113.2, 113.9], '6M': [100, 100.48, 97.21, 90.72, 89.21, 87.7, 89.65, 90.13, 87.81, 86.82, 82.57, 87.41, 91.59, 98.25, 101.86, 102.89, 109.02, 105.99, 111.43, 120.13, 111.44, 116.04, 111.43, 117.56, 113.79, 114.5] } },
  ],
  'Semiconductors': [
    { t: 'PSI', chosen: true, anchor: true, score: 101.6, ret6: 60.7, ret1: 142.5, corr: 0.91, reason: 'anchor', series: { '1W': [100, 95.14, 99.05, 96.41, 93.26], '1M': [100, 100.44, 106.89, 110.62, 102.22, 101.21, 106.35, 100.86, 106.74, 112.64, 104.6, 94.76, 95.7, 88.96, 90.76, 95.64, 95.61, 90.97, 94.7, 92.17, 89.17], 'YTD': [100, 109.1, 117.35, 116.38, 120.87, 126.02, 126.67, 127.64, 119.55, 116.26, 120.02, 118.2, 125.29, 144.69, 154.89, 159.02, 183.38, 192.76, 189.08, 197.01, 183.91, 222.67, 216.13, 238.17, 202.22, 188.54], '6M': [100, 99.18, 103, 107.54, 108.47, 111.04, 103.07, 100.48, 102.54, 104.63, 95.66, 107.55, 123.3, 132, 135.51, 150.93, 161.49, 154.57, 173.01, 174.65, 164.19, 180.18, 182.35, 188.47, 172.33, 160.67] } },
    { t: 'DRAM', chosen: true, anchor: false, score: 96.4, ret6: 96.4, ret1: 96.4, corr: 0.05, reason: 'diversifier', series: { '1W': [100, 90.89, 97.13, 91.05, 86.48], '1M': [100, 102.69, 112.61, 118.5, 101.61, 102.66, 112.87, 105.52, 105.61, 108.41, 96.68, 89, 95.07, 88.95, 91.07, 94.48, 92.54, 84.12, 89.89, 84.26, 80.03], 'YTD': [100, 116.97, 120.86, 126.22, 126.33, 130.98, 134.47, 145.57, 175.36, 198.41, 196.47, 177.67, 195.75, 218.77, 244.96, 236.67, 218.01, 234.58, 245.39, 290.78, 276.98, 266.03, 218.41, 223.49, 206.41, 196.38], '6M': [100, 116.97, 120.86, 126.22, 126.33, 130.98, 134.47, 145.57, 175.36, 198.41, 196.47, 177.67, 195.75, 218.77, 244.96, 236.67, 218.01, 234.58, 245.39, 290.78, 276.98, 266.03, 218.41, 223.49, 206.41, 196.38] } },
    { t: 'SOXX', chosen: false, anchor: false, score: 88.5, ret6: 57.5, ret1: 119.6, corr: 0.94, reason: 'correlated', series: { '1W': [100, 95.23, 97.69, 95.52, 92.78], '1M': [100, 101.44, 108.15, 110.79, 102.06, 101.74, 105.74, 99.78, 103.91, 108.38, 101.43, 95.79, 98.35, 93.31, 95.06, 98.39, 98.33, 93.64, 96.06, 93.92, 91.23], 'YTD': [100, 106.12, 113.72, 113.92, 117.11, 116.7, 118.85, 118.48, 112.16, 109.64, 110.41, 107.41, 114.26, 133.24, 139.7, 145.68, 168.31, 175.42, 172.77, 188.97, 179.24, 208.68, 200.36, 212.77, 193.16, 179.1], '6M': [100, 100.18, 102.98, 103.01, 103.4, 105.71, 97.75, 98.22, 98.65, 98.28, 90.46, 101.54, 117.16, 122.84, 128.1, 140.96, 150.67, 145.05, 164.68, 176.66, 164.14, 172.64, 175.64, 175.11, 169.85, 157.49] } },
    { t: 'XSD', chosen: true, anchor: false, score: 70.8, ret6: 45.9, ret1: 95.6, corr: 0.91, reason: 'diversifier', series: { '1W': [100, 95.38, 97.11, 95.32, 92.03], '1M': [100, 99.56, 106.78, 108.78, 101.3, 99.01, 100.28, 95.98, 99.45, 104.67, 100.03, 93.28, 95.87, 89.79, 92.07, 95.57, 94.55, 90.18, 91.82, 90.12, 87.01], 'YTD': [100, 106.78, 110.53, 108.61, 110.06, 112.09, 111.85, 111, 103.74, 101.25, 100.31, 99.24, 105.74, 120.98, 133.94, 138.07, 165.4, 175.45, 175.25, 190.62, 177.76, 196.55, 187.7, 193.94, 177.08, 161.23], '6M': [100, 98.26, 99.57, 101.75, 101.29, 100.89, 95.21, 93.15, 93.86, 92.65, 86.1, 95.89, 109.45, 121.18, 124.91, 145.84, 155.01, 150.81, 174.82, 180.05, 162.43, 167.63, 165.97, 167.68, 160.21, 145.86] } },
  ],
  'Broad Tech': [
    { t: 'WGMI', chosen: true, anchor: true, score: 47.5, ret6: -0.1, ret1: 95, corr: 0.54, reason: 'anchor', series: { '1W': [100, 94.18, 94.11, 95.5, 91.93], '1M': [100, 99.25, 104.1, 103.93, 102.48, 96.39, 93.75, 94.9, 91.97, 91.06, 84.85, 76.8, 81.55, 75.99, 79.6, 82.57, 80.13, 75.47, 75.41, 76.52, 73.66], 'YTD': [100, 116.28, 133.42, 121.71, 116.12, 111.37, 104.63, 110.19, 102.56, 99.19, 98.46, 91.95, 95.9, 124.2, 124.07, 121.71, 158.77, 153.85, 149.78, 177.92, 160.94, 180.32, 185.47, 164.8, 149.43, 133.32], '6M': [100, 91.23, 87.03, 85.84, 78.34, 83.65, 74.19, 73.11, 79.22, 77.16, 63.32, 73.58, 93.09, 92.99, 91.23, 107.99, 113.06, 107.42, 134.74, 140.05, 123.64, 135.64, 130.75, 115.1, 112, 99.92] } },
    { t: 'GTEK', chosen: true, anchor: false, score: 47.2, ret6: 36, ret1: 58.4, corr: 0.54, reason: 'diversifier', series: { '1W': [100, 99.8, 95.43, 96.67, 95.41], '1M': [100, 97.38, 97.68, 101.27, 102.24, 98.23, 97.76, 98.15, 97.39, 99.62, 102.7, 100.85, 97.34, 98.67, 94.72, 94.58, 97.17, 96.98, 92.73, 93.94, 92.72], 'YTD': [100, 103.18, 104.7, 106.43, 104.7, 106.83, 107.3, 110.93, 103.35, 101.84, 106.55, 100.49, 105.15, 114.67, 124.79, 125.8, 134.97, 135.41, 133.97, 148.79, 153.34, 146.97, 156.64, 152.64, 144.91, 142.06], '6M': [100, 101.06, 99.47, 98.18, 102.56, 100.24, 104.24, 98.08, 97.39, 98.03, 96.21, 100.67, 109.78, 119.48, 122.07, 127.03, 133.38, 127.08, 141.03, 145.59, 139.03, 146.69, 144.1, 150.65, 138.74, 136.01] } },
    { t: 'SGRT', chosen: true, anchor: false, score: 41.5, ret6: 21.4, ret1: 61.6, corr: -0.04, reason: 'diversifier', series: { '1W': [100, 96.32, 98.47, 95.17, 92.88], '1M': [100, 100.55, 102.16, 105.06, 99.21, 99.1, 102.24, 98.41, 99.59, 102.52, 97.54, 91.99, 94.12, 90.38, 92.37, 95.84, 95.13, 91.63, 93.67, 90.54, 88.36], 'YTD': [100, 101.94, 106.48, 106.44, 106.04, 108.56, 111.58, 116.47, 109.96, 108.38, 106.6, 105.64, 110.84, 125.27, 125.23, 123.32, 140.26, 145.1, 136.47, 145.74, 137.33, 149.66, 145.1, 149.94, 140.18, 129.24], '6M': [100, 99.96, 99.59, 104.13, 103.79, 108.71, 105.63, 103, 103.19, 101.69, 96.17, 105.48, 117.65, 117.61, 115.82, 127.6, 133.42, 126.1, 137.55, 142.21, 128.5, 137.36, 136.12, 133.98, 131.66, 121.38] } },
    { t: 'PTF', chosen: false, anchor: false, score: 39.9, ret6: 25.7, ret1: 54, corr: 0.78, reason: 'diverse', series: { '1W': [100, 94.24, 97.74, 94.01, 90.7], '1M': [100, 100.61, 104.47, 105.38, 98.7, 96.46, 100.72, 95.99, 100.24, 103.82, 96.55, 86.37, 88.13, 82.35, 85.48, 89.63, 88.15, 83.07, 86.15, 82.87, 79.95], 'YTD': [100, 103.88, 109.18, 108.69, 114.43, 116.25, 118.71, 121.57, 116.58, 113.48, 115.64, 112.3, 120.66, 132.7, 141.09, 139.74, 159.07, 160.03, 154.4, 168.73, 159.21, 177.81, 169.42, 178.21, 153.86, 137.25], '6M': [100, 99.56, 104.81, 108.65, 106.8, 110.94, 108.26, 105.42, 107.32, 108.84, 97.53, 111.44, 121.54, 129.23, 128, 141.71, 144.84, 137.09, 155.01, 162.21, 145.96, 157.23, 151.66, 151.8, 140.93, 125.71] } },
    { t: 'FWD', chosen: false, anchor: false, score: 30.3, ret6: 15.2, ret1: 45.4, corr: 0.82, reason: 'correlated', series: { '1W': [100, 96.53, 98.13, 96.92, 94.88], '1M': [100, 99.71, 103, 104.14, 99.06, 98.77, 101.34, 98.51, 100.95, 103.64, 99.99, 96.24, 98.06, 94.42, 94.78, 96.98, 96.67, 93.32, 94.86, 93.69, 91.72], 'YTD': [100, 105.07, 108.98, 108.75, 108.28, 108.72, 110.41, 112.59, 107.68, 105.59, 103.47, 101.35, 106.54, 117.13, 117.8, 118.71, 128.45, 130.74, 128.06, 136.21, 129.21, 139.01, 135.59, 141.86, 132.76, 125.54], '6M': [100, 99.79, 99.36, 100.28, 100.42, 102.95, 99.59, 99.1, 98.43, 97.15, 90.83, 98.3, 107.48, 108.09, 108.93, 114.67, 117.76, 114.41, 122.95, 128.91, 119.95, 125.6, 124.05, 125.59, 121.81, 115.19] } },
    { t: 'FDTX', chosen: false, anchor: false, score: 29.6, ret6: 26.7, ret1: 32.5, corr: 0.83, reason: 'correlated', series: { '1W': [100, 97.02, 98.76, 96.56, 94.43], '1M': [100, 100.12, 103.32, 103.7, 98.77, 98.12, 100.12, 97.43, 101.03, 103.25, 100.3, 96.07, 98.01, 95.02, 95.68, 98.11, 97.7, 94.79, 96.49, 94.34, 92.25], 'YTD': [100, 101.9, 100.24, 101.79, 99.59, 96.36, 95.3, 95.95, 95.53, 93.76, 92.15, 87.82, 93.4, 102.27, 108.09, 109.85, 119.54, 123.14, 121.24, 132.55, 130.77, 141.26, 135.95, 142.11, 135.04, 126.98], '6M': [100, 101.55, 99.35, 95.76, 93.67, 94.13, 93.3, 95.3, 94.87, 93.68, 85.6, 93.63, 102.02, 107.82, 109.58, 117.02, 120.63, 118.15, 129.24, 142.83, 130.52, 137.3, 134.72, 137.71, 134.71, 126.67] } },
    { t: 'SPMO', chosen: false, anchor: false, score: 26.9, ret6: 23, ret1: 30.8, corr: 0.75, reason: 'diverse', series: { '1W': [100, 97.39, 99.42, 97.56, 96.01], '1M': [100, 100.56, 103.41, 104.55, 99.82, 99.46, 103.25, 99.73, 102.53, 104.48, 100.45, 97.55, 98.94, 96.64, 97.38, 99, 99.44, 96.84, 98.86, 97.01, 95.47], 'YTD': [100, 99.75, 100.57, 99.59, 100.8, 101.22, 100.01, 100.54, 100.28, 98.2, 95.36, 92.45, 96.94, 106.14, 106.14, 108.92, 118.66, 122.6, 120.11, 126.21, 120.92, 132.28, 129.35, 135.38, 128.29, 123.72], '6M': [100, 99.03, 100.22, 101.24, 99.05, 98.96, 99.35, 99.42, 97.79, 95.44, 89.87, 97.21, 105.54, 105.54, 108.3, 114.9, 120.37, 117.19, 124.67, 128.6, 122.92, 128.85, 128.16, 129.43, 127.57, 123.02] } },
    { t: 'FRWD', chosen: false, anchor: false, score: 24.2, ret6: 23.9, ret1: 24.5, corr: 0.01, reason: 'diverse', series: { '1W': [100, 96.93, 98.68, 97.22, 95.21], '1M': [100, 100.03, 103.15, 102.38, 97.31, 96.99, 98.45, 95.97, 98.61, 100.99, 97.78, 94.77, 97.15, 94.34, 95.41, 97.18, 97.51, 94.52, 96.23, 94.8, 92.84], 'YTD': [100, 100.4, 106.5, 95.49, 98.31, 97.68, 97.41, 96.45, 94.44, 96.35, 90.2, 92.98, 101.44, 108.33, 112.92, 114.35, 123.47, 118.96, 127.94, 135.9, 125.83, 134.13, 130.09, 131.15, 130.35, 124.53], '6M': [100, 101.61, 102.25, 97.99, 95.65, 96.88, 93.78, 95.84, 95.72, 94.44, 86.38, 94.63, 105.48, 107.69, 109.42, 115.56, 120.9, 117.17, 127.39, 135.23, 125.21, 133.47, 129.45, 130.51, 129.7, 123.92] } },
    { t: 'CBSE', chosen: false, anchor: false, score: 23.9, ret6: 14.6, ret1: 33.3, corr: 0.8, reason: 'correlated', series: { '1W': [100, 99.36, 98.28, 99.41, 98.95], '1M': [100, 97.59, 97.93, 101.84, 102.25, 98.78, 98.97, 100.41, 100.46, 101.43, 103.01, 100.27, 99.08, 99.51, 97.02, 96.57, 98.58, 97.95, 96.88, 98, 97.55], 'YTD': [100, 105.79, 110.62, 108.72, 106.51, 108.84, 109.38, 111.2, 105.94, 102.49, 105.43, 101.53, 102.31, 111.59, 116.14, 112.88, 121.48, 125.05, 122.56, 127.84, 132.12, 126.56, 131.82, 130.76, 124.49, 125.76], '6M': [100, 99.67, 97.21, 98.39, 98.31, 98.63, 98.99, 94.23, 92.66, 93.45, 92.56, 93.27, 101.73, 105.88, 106.14, 108.67, 114.56, 112.09, 117.17, 117.12, 112.76, 117.52, 116.1, 121.06, 113.49, 114.65] } },
    { t: 'CNEQ', chosen: false, anchor: false, score: 23.9, ret6: 13.8, ret1: 33.9, corr: 0.8, reason: 'correlated', series: { '1W': [100, 99.75, 97.37, 97.93, 98.3], '1M': [100, 100.51, 99.51, 101.85, 99.85, 97.44, 97.13, 96.35, 96.27, 98.76, 100.49, 98.66, 96.64, 98.29, 96.08, 96.79, 99.03, 98.78, 96.42, 96.98, 97.35], 'YTD': [100, 101.16, 101.69, 100.41, 98.87, 98.2, 97.21, 98.92, 95.84, 93.92, 94.12, 87.81, 92.58, 100.55, 105.35, 105.47, 107.88, 113.26, 115.47, 120.39, 119.6, 113.44, 119.28, 117.98, 115.62, 116.29], '6M': [100, 97.97, 96.61, 94.16, 93.79, 94.47, 93.5, 91.68, 91.34, 89.18, 85.91, 90.57, 98.37, 103.06, 104.89, 105.28, 109.91, 109.43, 114.99, 118.09, 111.86, 116.87, 113.88, 117.43, 113.11, 113.76] } },
    { t: 'FCUS', chosen: false, anchor: false, score: 22.2, ret6: 3.5, ret1: 40.9, corr: 0.71, reason: 'diverse', series: { '1W': [100, 96.46, 99.6, 96.12, 93.71], '1M': [100, 100.47, 103.06, 105.18, 101.22, 99.01, 101.58, 96.78, 98.72, 101, 97.09, 89.34, 91.62, 86.96, 88.74, 91.23, 89.98, 86.8, 89.63, 86.5, 84.32], 'YTD': [100, 108.28, 115.26, 117.36, 118.32, 119.52, 123.02, 125.51, 114.59, 113.14, 113.92, 112.95, 118.39, 124.27, 125.37, 125.53, 139.39, 143.12, 136.93, 142.3, 137.06, 145.32, 143.18, 142.88, 129.06, 119.28], '6M': [100, 101.82, 102.66, 105.39, 104.93, 107.91, 102.17, 98.84, 100.74, 100.61, 94.37, 103.09, 107.82, 108.77, 108.91, 120.69, 123.56, 117.04, 124.39, 129.04, 118.46, 122.73, 121.52, 119.17, 111.97, 103.49] } },
    { t: 'BCTK', chosen: false, anchor: false, score: 20.5, ret6: 18.7, ret1: 22.4, corr: 0.12, reason: 'diverse', series: { '1W': [100, 99.27, 96.33, 97.99, 96.94], '1M': [100, 97.97, 97.22, 99.69, 98.53, 94.56, 94.58, 95.41, 94.27, 98.19, 101.25, 98.04, 95.22, 97.35, 94.4, 95.03, 97.11, 96.4, 93.54, 95.16, 94.14], 'YTD': [100, 100.78, 101.56, 100.7, 99.26, 98.04, 97.49, 100.49, 99.36, 96.72, 98.32, 90.57, 94.12, 100.76, 107.21, 106.5, 111.43, 115.24, 115.7, 121.88, 126.06, 121.66, 125.84, 125.4, 121.37, 120.23], '6M': [100, 99.2, 97.66, 94.62, 94.92, 95.19, 98.35, 96.31, 94.77, 93.72, 89.41, 92.92, 99.47, 105.83, 108.21, 109.23, 115.33, 113.1, 119.73, 124.56, 118.7, 126.08, 119.22, 127.65, 119.81, 118.69] } },
    { t: 'XMMO', chosen: false, anchor: false, score: 16.9, ret6: 11, ret1: 22.7, corr: 0.71, reason: 'diverse', series: { '1W': [100, 98.25, 99.55, 99.49, 98.35], '1M': [100, 99.69, 100.94, 102.11, 99.64, 99.25, 100.52, 98.14, 98.35, 99.95, 97.52, 95.84, 96.82, 94.14, 94.17, 95.44, 94.88, 93.22, 94.45, 94.39, 93.31], 'YTD': [100, 101.24, 103.39, 102.17, 102.22, 105.75, 106.49, 108.85, 106.33, 103.39, 102.5, 103.47, 106.54, 114.15, 114.1, 112.88, 121.77, 121.34, 117.37, 121.94, 118.9, 123.72, 122.5, 122.88, 117.34, 114.73], '6M': [100, 98.82, 98.86, 102.51, 102.72, 104.03, 103.86, 102.49, 100.59, 101.39, 97.12, 103.35, 110.4, 110.35, 109.17, 113.66, 116.21, 111.09, 117.7, 118.71, 115.49, 118.91, 118.02, 115.95, 113.49, 110.96] } },
    { t: 'WCLD', chosen: false, anchor: false, score: 3.5, ret6: 8.5, ret1: -1.4, corr: 0.31, reason: 'diverse', series: { '1W': [100, 102.16, 103.32, 102.45, 102.78], '1M': [100, 97.43, 97.2, 95.19, 96.35, 97.01, 95.33, 101.02, 103.78, 105.45, 109.18, 110.26, 112.24, 113.29, 111.05, 113.55, 111.38, 113.78, 115.08, 114.11, 114.47], 'YTD': [100, 99.63, 91.6, 94.32, 85.98, 81.69, 79.89, 79.52, 84.26, 80.75, 79.86, 74.84, 79.27, 71.78, 79.55, 77.81, 82.42, 78.52, 85.8, 94.12, 91.97, 88.12, 83.66, 91.56, 98.6, 99.4], '6M': [100, 102.96, 93.86, 87.68, 86.19, 81.48, 88.18, 92.33, 88.09, 88.93, 82.81, 85.87, 78.36, 86.84, 84.94, 92.89, 87.93, 92.52, 91.8, 108.42, 97.16, 94.79, 91.96, 103.49, 107.64, 108.51] } },
    { t: 'MARS', chosen: false, anchor: false, score: 2.5, ret6: 2.5, ret1: 2.5, corr: 0.21, reason: 'diverse', series: { '1W': [100, 95.56, 96.2, 94.05, 90.96], '1M': [100, 99.32, 97.02, 91.08, 89.07, 84.84, 82.03, 83.19, 91.67, 95.48, 92.46, 92.67, 91.87, 85.7, 84.87, 84.34, 82.51, 78.84, 79.37, 77.6, 75.05], 'YTD': [100, 101.98, 102.95, 103.47, 105.45, 103.27, 116.71, 120.86, 132.89, 133.29, 121.87, 123.16, 123, 141.44, 151.69, 166.42, 183.98, 148.1, 133.37, 135.03, 132.49, 115.86, 130.39, 117.03, 112.67, 102.49], '6M': [100, 101.98, 102.95, 103.47, 105.45, 103.27, 116.71, 120.86, 132.89, 133.29, 121.87, 123.16, 123, 141.44, 151.69, 166.42, 183.98, 148.1, 133.37, 135.03, 132.49, 115.86, 130.39, 117.03, 112.67, 102.49] } },
    { t: 'ARKK', chosen: false, anchor: false, score: 0.1, ret6: -4, ret1: 4.2, corr: 0.72, reason: 'diverse', series: { '1W': [100, 97.5, 99.1, 99.2, 97.69], '1M': [100, 99.25, 101.4, 99.18, 96.97, 97.02, 96.79, 98.8, 101.96, 102.2, 103.5, 102.74, 105.73, 102.67, 101.37, 103.1, 101.47, 98.94, 100.56, 100.66, 99.13], 'YTD': [100, 104.72, 106.19, 103.9, 96.67, 93.94, 92.81, 97, 96.19, 91.84, 89.9, 84.02, 89.44, 97.28, 100.6, 98.09, 103.46, 101.47, 98.6, 106.54, 96.84, 103.52, 99.69, 105.07, 105.99, 101.91], '6M': [100, 97.85, 91.04, 88.69, 86.07, 88.23, 88.47, 90.95, 88.21, 86.83, 77.77, 84.18, 91.61, 94.74, 92.37, 93.76, 95.75, 90.4, 95.43, 97.83, 91.82, 96.82, 93.93, 100.21, 99.82, 95.97] } },
    { t: 'IGV', chosen: false, anchor: false, score: -10.1, ret6: -5.1, ret1: -15, corr: 0.52, reason: 'diverse', series: { '1W': [100, 100.31, 101.32, 101.66, 100.99], '1M': [100, 97.58, 97.5, 95.56, 95.57, 94.31, 92.77, 96.53, 98.38, 99.16, 102.16, 102.41, 103.74, 103.02, 101.21, 102.75, 101.14, 101.46, 102.47, 102.81, 102.14], 'YTD': [100, 98.82, 93.02, 93.49, 84.7, 80.81, 77.59, 78.15, 82.9, 80.41, 78.52, 72.75, 76.13, 75.2, 82.01, 80.42, 83.09, 83.83, 88.3, 96.19, 90.69, 87.69, 82.62, 85.72, 88.83, 88.3], '6M': [100, 100.51, 91.06, 86.52, 82.35, 79.76, 85.57, 89.22, 86.41, 85.89, 78.95, 81.88, 80.85, 88.17, 86.46, 89.79, 90.98, 93.53, 94.65, 106.53, 94.55, 92.94, 87.65, 94.94, 95.49, 94.93] } },
  ],
  'Electrification': [
    { t: 'VOLT', chosen: true, anchor: true, score: 33.7, ret6: 20.6, ret1: 46.8, corr: 0.64, reason: 'anchor', series: { '1W': [100, 98.25, 99.92, 99.15, 97.61], '1M': [100, 100.62, 102.7, 104.97, 101.3, 102.02, 104.32, 100.7, 101.77, 104.57, 100.8, 97.78, 98.93, 96.01, 95.73, 96.88, 97.08, 95.38, 97, 96.26, 94.76], 'YTD': [100, 101.4, 108.84, 109.01, 112.43, 118.79, 120.64, 123.8, 117.86, 117.34, 116.13, 117.48, 120.45, 131.75, 132.03, 133.69, 143.13, 139.95, 133.69, 135.07, 132.76, 139.12, 140.29, 144.82, 134.17, 131.24], '6M': [100, 100.16, 103.3, 108.7, 111.97, 114.48, 109.94, 108.19, 109.18, 109.15, 105.3, 111.72, 121.06, 121.31, 122.84, 130.68, 129.76, 121.09, 126.68, 125.89, 122.74, 127.25, 129.82, 128.27, 123.28, 120.58] } },
    { t: 'POW', chosen: true, anchor: false, score: 33.3, ret6: 29.8, ret1: 36.7, corr: 0.11, reason: 'diversifier', series: { '1W': [100, 101.25, 97.61, 99.46, 98.96], '1M': [100, 99.07, 98.85, 100.06, 101.79, 97.09, 96.83, 97.54, 94.11, 97.06, 99.17, 95.68, 92.54, 92.93, 88.48, 88.51, 89.6, 90.72, 87.46, 89.12, 88.67], 'YTD': [100, 102.18, 110.41, 112.09, 113.71, 121.09, 122.86, 131.25, 121.29, 120.67, 126.63, 122.25, 125, 138.98, 141.11, 152.45, 166.63, 163.28, 152.09, 160.63, 156.92, 152.27, 161.7, 154.18, 140.61, 140.86], '6M': [100, 102.8, 105.8, 109.33, 114.43, 116.58, 120.14, 108.99, 111.86, 112.51, 112.65, 115.18, 128.06, 130.02, 141.41, 148.15, 156.81, 139.77, 151.52, 146.7, 137.79, 146.37, 142.11, 145.15, 129.56, 129.79] } },
    { t: 'PBD', chosen: true, anchor: false, score: 24.7, ret6: 7.7, ret1: 41.6, corr: 0.64, reason: 'diversifier', series: { '1W': [100, 100.05, 97.96, 99.36, 100.21], '1M': [100, 98.44, 97.67, 98.69, 99.37, 95.04, 93.73, 93.39, 91.69, 93.44, 95.28, 93.87, 92.56, 94.8, 90.86, 90.08, 90.52, 90.57, 88.67, 89.94, 90.71], 'YTD': [100, 103.61, 108.46, 112.25, 108.58, 112.69, 114.05, 117.04, 107.71, 109.58, 111.07, 108.77, 112.81, 119.03, 123.69, 125.19, 133.96, 133.4, 128.79, 139.55, 138.06, 126.87, 127.11, 119.53, 115.24, 116.04], '6M': [100, 104.68, 101.62, 104.04, 104.56, 105.89, 106.52, 99.77, 100.92, 100.64, 100.98, 104.73, 110.51, 114.84, 117.67, 121.07, 127.71, 121.25, 129.39, 129.1, 118.3, 118.76, 112.88, 113.16, 106.99, 107.74] } },
    { t: 'PBW', chosen: false, anchor: false, score: 23.7, ret6: -3, ret1: 50.4, corr: 0.82, reason: 'correlated', series: { '1W': [100, 96.54, 99.32, 99.15, 97.25], '1M': [100, 99.9, 103.8, 103, 97.25, 94.4, 93.63, 92.08, 95.2, 97.48, 95.25, 91.4, 93.75, 88.21, 87.78, 89.16, 88.01, 84.96, 87.41, 87.26, 85.58], 'YTD': [100, 108.81, 115.62, 114.51, 110.31, 112.77, 109.82, 110.84, 103.47, 106.06, 101.05, 101.8, 104.19, 112.57, 118.43, 118.73, 131.24, 137.59, 129.5, 148.43, 133.53, 133.73, 127.44, 127.73, 116.83, 112.15], '6M': [100, 99.04, 95.41, 98.61, 94.68, 96.94, 89.75, 90.06, 92.41, 89.61, 85.19, 88.3, 97.37, 102.44, 102.69, 112.18, 116.34, 107.56, 127.5, 133.08, 111.16, 113.34, 107, 107.96, 101.05, 97] } },
    { t: 'IVEP', chosen: false, anchor: false, score: -0.4, ret6: -0.4, ret1: -0.4, corr: 0.22, reason: 'diverse', series: { '1W': [100, 98.4, 99.63, 98.44, 96.83], '1M': [100, 100.29, 103.52, 104.99, 100.68, 100.83, 101.58, 98.38, 98.99, 100.36, 96.95, 95.87, 97.63, 95.23, 94.97, 96.12, 96.37, 94.83, 96.02, 94.87, 93.32], 'YTD': [100, 102.76, 103.75, 105.59, 107.78, 105.63, 109.85, 110.61, 107.85, 109.69, 107.01, 106.4, 110.34, 108.12, 109.31, 104.37, 99.85, 104.6, 107.05, 107.47, 108.43, 107.13, 104.21, 102.61, 101.23, 99.62], '6M': [100, 102.76, 103.75, 105.59, 107.78, 105.63, 109.85, 110.61, 107.85, 109.69, 107.01, 106.4, 110.34, 108.12, 109.31, 104.37, 99.85, 104.6, 107.05, 107.47, 108.43, 107.13, 104.21, 102.61, 101.23, 99.62] } },
  ],
  'Industrials': [
    { t: 'AIRR', chosen: true, anchor: true, score: 27.3, ret6: 8, ret1: 46.5, corr: 0.71, reason: 'anchor', series: { '1W': [100, 98.24, 99.75, 99.68, 99.2], '1M': [100, 99.22, 100.48, 102.29, 99.42, 100.16, 102.03, 99.55, 101.01, 102.29, 99.3, 96.65, 97.47, 94.32, 94.08, 95.46, 94.9, 93.23, 94.66, 94.6, 94.14], 'YTD': [100, 107.26, 115.48, 114.29, 114.44, 121.22, 120.89, 121.89, 115.42, 111.14, 109.54, 111.65, 115.54, 124.89, 125.16, 125.7, 134.19, 131.69, 127.48, 131.39, 130.16, 132.6, 131.73, 135.53, 126.47, 124.73], '6M': [100, 98.97, 99.1, 105.6, 104.32, 105.72, 103.15, 99.62, 97.35, 97.28, 93.28, 99.9, 108.15, 108.38, 108.85, 115.1, 113.92, 107.93, 114, 113.43, 112.49, 114.73, 114.92, 113.93, 109.52, 108.01] } },
    { t: 'PRN', chosen: false, anchor: false, score: 26.4, ret6: 13, ret1: 39.8, corr: 0.9, reason: 'correlated', series: { '1W': [100, 97.42, 99.41, 98.93, 96.97], '1M': [100, 100.94, 102.83, 105.77, 102, 101.58, 103.81, 100.43, 102.88, 104.99, 100.71, 94.7, 95.8, 91.66, 91.46, 93.39, 92.78, 90.38, 92.22, 91.78, 89.96], 'YTD': [100, 104.08, 113.24, 111.67, 111.83, 117.01, 118.67, 122.32, 113.7, 110.3, 110.39, 110.73, 114.55, 126.41, 127.44, 127.35, 142.47, 140.66, 133.59, 140.61, 135.16, 143.2, 145.07, 149.34, 132.83, 127.96], '6M': [100, 98.61, 98.76, 103.85, 104.4, 108.11, 102.79, 100.21, 98.68, 100.42, 94, 101.52, 111.63, 112.53, 112.45, 121.33, 122.59, 115.16, 124.97, 124.49, 119.42, 125.6, 127.58, 126.49, 117.3, 112.99] } },
    { t: 'BILT', chosen: true, anchor: false, score: 10.9, ret6: 8.5, ret1: 13.3, corr: 0.12, reason: 'diversifier', series: { '1W': [100, 100.45, 100.85, 100.99, 100.35], '1M': [100, 100.35, 98.74, 98.8, 99.2, 99.63, 100.06, 100.83, 101.33, 100.94, 99.72, 99.75, 101.42, 100.96, 101.67, 101.1, 100.92, 101.38, 101.78, 101.92, 101.28], 'YTD': [100, 100.31, 102.35, 103.24, 103.99, 109.04, 111.65, 113.69, 112.55, 111, 110.38, 109.66, 112.2, 113, 112.43, 113.04, 113.52, 112.79, 112.77, 112.99, 112.33, 113.82, 107.81, 109.7, 109.87, 110.07], '6M': [100, 101.07, 103.37, 105.69, 111.12, 111.62, 113.01, 110.44, 109.9, 106.63, 108.1, 110.6, 111.39, 110.82, 111.28, 111.67, 110.93, 110.12, 112.38, 109.18, 109.98, 107.13, 106.73, 106.82, 108.31, 108.5] } },
    { t: 'IDEF', chosen: true, anchor: false, score: -2.1, ret6: -13.2, ret1: 9, corr: 0.71, reason: 'diversifier', series: { '1W': [100, 98.25, 98.53, 98.69, 97.75], '1M': [100, 100.12, 98.48, 96.59, 96.01, 94.82, 94.39, 94.37, 95.37, 96.83, 97.71, 100.52, 102.35, 100, 98.35, 97.84, 97.41, 95.7, 95.98, 96.13, 95.22], 'YTD': [100, 109.87, 116.82, 114.04, 111.27, 113.08, 115.03, 116.14, 114.8, 113.77, 109.68, 104.39, 111.23, 113.44, 109.74, 106.33, 110.13, 106.75, 105.1, 110.97, 103.67, 105.88, 102.28, 103.15, 104.22, 101.43], '6M': [100, 97.62, 95.25, 97.91, 96.82, 99.15, 100.55, 100.39, 98.11, 94.8, 87.29, 94.22, 97.11, 93.94, 91.03, 92.3, 91.61, 88.6, 92.89, 92, 88.58, 91.19, 86.47, 89.11, 89.22, 86.83] } },
  ],
  'Meme': [
    { t: 'BUZZ', chosen: true, anchor: true, score: 3.5, ret6: -1.5, ret1: 8.6, corr: 0.01, reason: 'anchor', series: { '1W': [100, 97.79, 98.23, 97.62, 96.09], '1M': [100, 99.33, 101.6, 100.21, 97.7, 95.7, 94.25, 95.27, 97.86, 98.8, 98.45, 97.14, 98.61, 95.67, 95.96, 97.41, 96.74, 94.6, 95.03, 94.44, 92.95], 'YTD': [100, 105.57, 108.62, 105.51, 101.23, 97.32, 94.24, 96.34, 97.2, 94.61, 91.32, 85.66, 90.6, 99.11, 103.45, 103.08, 113.73, 114.31, 112.77, 124.78, 113.45, 117.88, 112.47, 113.73, 112.13, 107], '6M': [100, 97.14, 93.2, 90.96, 85.78, 86.74, 86.8, 88.86, 88.61, 85.46, 77.13, 83.28, 91.24, 95.24, 94.9, 100.17, 104.45, 100.99, 110.91, 115.25, 104.48, 105.98, 101.42, 104.34, 103.23, 98.51] } },
    { t: 'RKNG', chosen: true, anchor: false, score: -6.5, ret6: -6.5, ret1: -6.5, corr: 0.03, reason: 'diversifier', series: { '1W': [100, 97.67, 92.88, 95.14, 92.61], '1M': [100, 96.69, 97.5, 101.89, 102.27, 97.05, 93.83, 94.71, 91.88, 95.35, 97.84, 92.86, 86.4, 88.61, 83.64, 85.13, 88.18, 86.13, 81.9, 83.89, 81.66], 'YTD': [100, 95.76, 77.78, 83.66, 82.9, 82.25, 77.98, 80.13, 78.34, 78.89, 73.19, 81.14, 89.13, 96.54, 92.38, 103.24, 104.38, 96.48, 114.64, 119.27, 103.23, 110.67, 107.39, 111.99, 97.44, 93.47], '6M': [100, 95.76, 77.78, 83.66, 82.9, 82.25, 77.98, 80.13, 78.34, 78.89, 73.19, 81.14, 89.13, 96.54, 92.38, 103.24, 104.38, 96.48, 114.64, 119.27, 103.23, 110.67, 107.39, 111.99, 97.44, 93.47] } },
    { t: 'MEME', chosen: true, anchor: false, score: -18.5, ret6: -11.1, ret1: -25.9, corr: 0.03, reason: 'diversifier', series: { '1W': [100, 93.98, 95.3, 91.33, 87.6], '1M': [100, 101.74, 105.62, 106.23, 99.59, 94.89, 93.87, 89.79, 95.81, 98.37, 92.65, 85.7, 87.03, 80.9, 82.74, 85.9, 84.78, 79.67, 80.8, 77.43, 74.27], 'YTD': [100, 119.03, 131.94, 120.81, 113.87, 113.39, 110.65, 111.77, 105.65, 105.65, 108.23, 100.48, 103.63, 133.71, 143.55, 125.97, 156.77, 166.45, 154.03, 183.87, 158.71, 168.23, 157.26, 155.32, 135.65, 117.27], '6M': [100, 91.56, 86.31, 89, 81.3, 84.6, 79.34, 79.1, 84.23, 83.62, 70.29, 80.2, 101.34, 108.8, 95.48, 113.94, 121.39, 111.61, 141.08, 143.28, 116.87, 119.68, 113.57, 110.88, 102.81, 88.89] } },
  ],
};
// @@END_GENERATED:THEME_UNIVERSE@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 9, avgWeight: 7.1, proScore: 6.39, coverage: 0.9,
      price: 208.76, weeklyPrices: [210.96, 203.53, 211.80, 212.50, 208.76], weeklyChange: -1.04, dayChange: -1.76, sortRank: 0, periodReturns: { '1M': 0.7, 'YTD': 11.9, '6M': 12.1, '1Y': 21.8 },
      priceHistory: { '1D': [212.5, 209.4, 208.76], '1W': [210.96, 203.53, 211.8, 212.5, 208.76], '1M': [207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 196.93, 204.12, 202.78, 210.96, 203.53, 211.8, 212.5, 208.76], 'YTD': [186.5, 185.04, 186.23, 186.47, 185.61, 188.54, 187.98, 184.89, 183.34, 183.14, 172.7, 167.52, 177.64, 196.51, 199.88, 213.17, 207.83, 225.83, 223.47, 211.14, 205.1, 212.45, 200.04, 200.09, 202.78, 208.76], '6M': [186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 222.82, 208.19, 207.41, 199, 197.58, 202.78, 208.76], '1Y': [171.37, 170.78, 179.27, 179.42, 181.59, 175.4, 181.6, 170.62, 177.33, 170.29, 176.97, 187.24, 189.11, 179.83, 180.28, 207.04, 195.21, 193.8, 186.52, 180.26, 179.59, 183.78, 170.94, 188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 222.82, 208.19, 207.41, 199, 197.58, 202.78, 208.76] },
      velocityScore: { '1D': 0.6, '1W': 4.2, '1M': 3.4, '6M': null }, isNew: false,
      marketCap: '$5.1T', pe: 32, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { AIS: 2.81, ARTY: 5.1, BAI: 4.78, IGPT: 8.42, IVES: 5.08, ALAI: 13.34, CHAT: 7.64, AIFD: 6.59, SPRX: false, AOTG: 10.13 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.74, proScore: 5.17, coverage: 0.9,
      price: 512.78, weeklyPrices: [557.89, 534.39, 548.13, 529.14, 512.78], weeklyChange: -8.09, dayChange: -3.09, sortRank: 0, periodReturns: { '1M': 1.1, 'YTD': 139.4, '6M': 121.2, '1Y': 220.3 },
      priceHistory: { '1D': [529.14, 516.07, 512.78], '1W': [557.89, 534.39, 548.13, 529.14, 512.78], '1M': [507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 517.41, 546.72, 557.89, 534.39, 548.13, 529.14, 512.78], 'YTD': [214.16, 204.68, 231.83, 251.31, 246.27, 213.57, 200.12, 203.68, 199.45, 197.74, 201.33, 201.99, 220.18, 255.07, 284.49, 323.21, 421.39, 445.5, 447.58, 516.1, 466.38, 547.26, 519.85, 580.91, 546.72, 512.78], '6M': [231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 521.54, 475.51, 507.29, 519.74, 540.88, 546.72, 512.78], '1Y': [160.08, 158.65, 179.51, 163.12, 184.42, 165.2, 167.13, 162.13, 159.54, 159.16, 160.88, 164.01, 235.56, 238.6, 230.23, 264.33, 256.33, 258.89, 223.55, 214.24, 217.6, 221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 521.54, 475.51, 507.29, 519.74, 540.88, 546.72, 512.78] },
      velocityScore: { '1D': -1.7, '1W': 3.2, '1M': 1.2, '6M': null }, isNew: false,
      marketCap: '$836B', pe: 169.8, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 5.3, ARTY: 5.25, BAI: 5.27, IGPT: 8.79, IVES: 4.72, ALAI: 1.31, CHAT: 3.96, AIFD: false, SPRX: 0.65, AOTG: 16.43 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 5.47, proScore: 4.92, coverage: 0.9,
      price: 876.46, weeklyPrices: [979.30, 937.00, 983.12, 904.28, 876.46], weeklyChange: -10.5, dayChange: -3.08, sortRank: 0, periodReturns: { '1M': -14.1, 'YTD': 207.1, '6M': 141.6, '1Y': 652.8 },
      priceHistory: { '1D': [904.28, 878.35, 876.46], '1W': [979.3, 937, 983.12, 904.28, 876.46], '1M': [1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 948.8, 991.64, 979.3, 937, 983.12, 904.28, 876.46], 'YTD': [285.41, 327.02, 362.75, 389.09, 437.8, 373.25, 420.95, 415.56, 397.05, 405.35, 422.9, 357.22, 377.76, 465.66, 449.38, 504.29, 666.59, 803.63, 731.99, 971, 864.01, 1087.99, 1051.77, 1154.29, 991.64, 876.46], '6M': [362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1064.1, 935.89, 1020.76, 1048.51, 1032.28, 991.64, 876.46], '1Y': [116.43, 109.83, 114.74, 108.78, 124.27, 117.21, 117.75, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 198.47, 226.63, 237.5, 244.9, 225.92, 230.26, 234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1064.1, 935.89, 1020.76, 1048.51, 1032.28, 991.64, 876.46] },
      velocityScore: { '1D': -5, '1W': -2.8, '1M': -21.7, '6M': null }, isNew: false,
      marketCap: '$990B', pe: 19.8, revenueGrowth: 346, eps: 44.22, grossMargin: 73, dividendYield: 0.06,
      etfPresence: { AIS: 6.52, ARTY: 4.64, BAI: 5.95, IGPT: 7.37, IVES: 4.25, ALAI: 0.99, CHAT: 3.39, AIFD: 6.3, SPRX: false, AOTG: 9.81 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.89, proScore: 3.12, coverage: 0.8,
      price: 379.9, weeklyPrices: [399.97, 384.05, 389.11, 394.28, 379.90], weeklyChange: -5.02, dayChange: -3.65, sortRank: 0, periodReturns: { '1M': 0.8, 'YTD': 9.8, '6M': 8, '1Y': 35.3 },
      priceHistory: { '1D': [394.28, 381.7, 379.9], '1W': [399.97, 384.05, 389.11, 394.28, 379.9], '1M': [376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 370.78, 388.69, 401.11, 399.97, 384.05, 389.11, 394.28, 379.9], 'YTD': [346.1, 332.48, 351.71, 324.85, 331.11, 340.44, 333.51, 321.7, 332.77, 335.97, 310.51, 300.68, 314.43, 380.78, 402.17, 399.83, 425.44, 416.79, 417.76, 446.77, 385.73, 393.94, 380.15, 377.75, 401.11, 379.9], '6M': [351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 481.57, 392.16, 376.71, 382.07, 369.34, 401.11, 379.9], '1Y': [280.81, 283.69, 302.62, 301.67, 309.09, 291.17, 300.25, 302.39, 369.57, 346.17, 339.31, 333.39, 345.5, 351.33, 340.3, 385.98, 358.98, 355.22, 354.42, 397.57, 380.61, 412.97, 326.02, 350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 481.57, 392.16, 376.71, 382.07, 369.34, 401.11, 379.9] },
      velocityScore: { '1D': 1.6, '1W': 3.7, '1M': 16.4, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63.4, revenueGrowth: 48, eps: 5.99, grossMargin: 76, dividendYield: 0.66,
      etfPresence: { AIS: 0.74, ARTY: 4.88, BAI: 4.73, IGPT: false, IVES: 4.85, ALAI: 4.11, CHAT: 4.81, AIFD: 5.53, SPRX: false, AOTG: 1.51 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 5.27, proScore: 3.16, coverage: 0.6,
      price: 369.99, weeklyPrices: [357.18, 352.51, 359.51, 370.92, 369.99], weeklyChange: 3.59, dayChange: -0.25, sortRank: 0, periodReturns: { '1M': -0.9, 'YTD': 18.2, '6M': 12.1, '1Y': 102.2 },
      priceHistory: { '1D': [370.92, 370.83, 369.99], '1W': [357.18, 352.51, 359.51, 370.92, 369.99], '1M': [373.25, 363.79, 368.03, 349.68, 346.13, 345.29, 343.71, 337.39, 353.65, 357.37, 361.21, 359.91, 366.46, 367.03, 361.92, 358.89, 357.18, 352.51, 359.51, 370.92, 369.99], 'YTD': [313, 325.44, 330, 333.26, 343.69, 318.58, 303.33, 307.38, 300.88, 303.55, 301, 274.34, 299.99, 332.91, 332.29, 349.78, 398.04, 402.62, 388.91, 380.34, 368.53, 369.35, 346.13, 357.37, 358.89, 369.99], '6M': [330, 333.26, 343.69, 324.32, 302.02, 310.9, 303.58, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 387.35, 387.66, 388.83, 361.85, 364.26, 373.25, 345.29, 361.21, 358.89, 369.99], '1Y': [182.97, 190.23, 196.53, 196.09, 201.96, 199.32, 207.48, 230.66, 239.17, 249.53, 247.14, 244.9, 244.62, 251.03, 251.69, 274.57, 284.31, 286.71, 292.81, 319.95, 319.63, 320.21, 296.72, 314.09, 315.15, 328.57, 330, 333.26, 343.69, 324.32, 302.02, 310.9, 306.52, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 387.35, 387.66, 388.83, 361.85, 364.26, 373.25, 345.29, 361.21, 358.89, 369.99] },
      velocityScore: { '1D': 2.6, '1W': 1.6, '1M': 12.9, '6M': null }, isNew: false,
      marketCap: '$4.5T', pe: 28.3, revenueGrowth: 22, eps: 13.09, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.51, IGPT: 8.41, IVES: 4.87, ALAI: false, CHAT: 5.84, AIFD: 5.07, SPRX: false, AOTG: 3.91 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 6, avgWeight: 4.73, proScore: 2.84, coverage: 0.6,
      price: 671.29, weeklyPrices: [669.21, 656.73, 661.04, 681.31, 671.29], weeklyChange: 0.31, dayChange: -1.47, sortRank: 0, periodReturns: { '1M': 11.8, 'YTD': 1.7, '6M': 8.2, '1Y': -4.5 },
      priceHistory: { '1D': [681.31, 672.49, 671.29], '1W': [669.21, 656.73, 661.04, 681.31, 671.29], '1M': [600.21, 567.58, 577.22, 563.85, 562.2, 557.67, 542.87, 550.25, 562.6, 563.29, 612.91, 582.9, 600.29, 615.58, 603.12, 631.48, 669.21, 656.73, 661.04, 681.31, 671.29], 'YTD': [660.09, 646.06, 620.25, 672.36, 706.41, 670.72, 643.22, 657.01, 660.57, 638.18, 593.66, 525.72, 573.02, 662.49, 668.84, 671.34, 612.88, 616.63, 605.06, 632.51, 593, 593.48, 562.2, 563.29, 631.48, 671.29], '6M': [620.25, 672.36, 706.41, 677.22, 639.29, 639.3, 655.08, 647.39, 627.45, 604.06, 536.38, 575.05, 662.49, 668.84, 671.34, 604.96, 603, 602.61, 635.26, 597.63, 584.59, 600.21, 557.67, 612.91, 631.48, 671.29], '1Y': [702.91, 713.58, 695.21, 771.99, 780.08, 747.72, 747.38, 737.05, 751.98, 775.72, 760.66, 717.34, 717.84, 717.55, 733.41, 751.67, 635.95, 609.01, 590.32, 633.61, 639.6, 650.13, 649.5, 667.55, 650.41, 653.06, 620.25, 672.36, 706.41, 677.22, 639.29, 639.3, 653.56, 647.39, 627.45, 604.06, 536.38, 575.05, 662.49, 668.84, 671.34, 604.96, 603, 602.61, 635.26, 597.63, 584.59, 600.21, 557.67, 612.91, 631.48, 671.29] },
      velocityScore: { '1D': 24, '1W': 35.2, '1M': 74.2, '6M': null }, isNew: false,
      marketCap: '$1.7T', pe: 24.4, revenueGrowth: 33, eps: 27.52, grossMargin: 82, dividendYield: 0.31,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 9.73, IVES: 5.57, ALAI: 4.69, CHAT: 2.54, AIFD: false, SPRX: 4.63, AOTG: 1.2 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 6, avgWeight: 4.72, proScore: 2.83, coverage: 0.6,
      price: 410.69, weeklyPrices: [434.11, 421.58, 420.39, 419.48, 410.69], weeklyChange: -5.39, dayChange: -2.14, sortRank: 0, periodReturns: { '1M': -3.6, 'YTD': 35.1, '6M': 19.9, '1Y': 72.9 },
      priceHistory: { '1D': [419.67, 412.18, 410.69], '1W': [434.11, 421.58, 420.39, 419.48, 410.69], '1M': [425.83, 432.15, 462.12, 467.67, 436.39, 440.83, 434.99, 432.35, 455.1, 477.57, 444.23, 434.16, 451.79, 432.57, 436.98, 436.96, 434.11, 421.58, 420.39, 419.48, 410.69], 'YTD': [303.89, 318.01, 342.4, 332.71, 341.36, 361.91, 362.26, 376.81, 353.86, 336.71, 329.24, 326.74, 341.76, 379.89, 368.08, 392.34, 419.5, 399.8, 401.62, 418.45, 415.17, 441.4, 436.39, 477.57, 436.96, 410.69], '6M': [342.4, 332.71, 341.36, 355.41, 364.2, 385.75, 353.13, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 392.61, 422.73, 446.69, 427.92, 425.83, 440.83, 444.23, 436.96, 410.69], '1Y': [237.56, 240.33, 242.91, 231.37, 241.44, 228.6, 239.29, 231.39, 260.44, 262.79, 280.71, 288.47, 304.52, 304.71, 288.88, 305.09, 293.64, 290.62, 282.37, 289.96, 295.45, 310.14, 276.96, 298.8, 319.61, 323.63, 342.4, 332.71, 341.36, 355.41, 364.2, 385.75, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 392.61, 422.73, 446.69, 427.92, 425.83, 440.83, 444.23, 436.96, 410.69] },
      velocityScore: { '1D': 0.4, '1W': -3.1, '1M': -1.4, '6M': null }, isNew: false,
      marketCap: '$2.1T', pe: 35.7, revenueGrowth: 35, eps: 11.49, grossMargin: 62, dividendYield: 0.9,
      etfPresence: { AIS: 3.41, ARTY: false, BAI: 4.56, IGPT: false, IVES: 4.69, ALAI: 5.18, CHAT: false, AIFD: 3.33, SPRX: false, AOTG: 7.13 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 6, avgWeight: 2.89, proScore: 1.74, coverage: 0.6,
      price: 197.22, weeklyPrices: [235.81, 217.53, 222.44, 206.26, 197.22], weeklyChange: -16.36, dayChange: -4.38, sortRank: 0, periodReturns: { '1M': -29.2, 'YTD': 132.1, '6M': 145.1, '1Y': 178.4 },
      priceHistory: { '1D': [206.26, 197.76, 197.1, 197.22], '1W': [235.81, 217.53, 222.44, 206.26, 197.22], '1M': [278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 245.29, 249.27, 230.7, 231.71, 243.27, 235.81, 217.53, 222.44, 206.26, 197.22], 'YTD': [84.98, 83.45, 80.46, 81.77, 78.66, 82.01, 79.09, 79.29, 75.68, 87.67, 87.91, 94.88, 109.51, 133.83, 151.31, 153.23, 172.15, 177.95, 186.8, 205, 263.47, 308.88, 279.04, 297.89, 243.27, 197.22], '6M': [80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 77.51, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 198.7, 290.79, 266.88, 278.67, 276.7, 272.05, 243.27, 197.22], '1Y': [70.85, 73.27, 81.74, 75.32, 79.32, 71.22, 74.79, 62.31, 67.1, 70.98, 80.09, 83.89, 92.5, 88.89, 81.05, 90.15, 92.9, 89.33, 81.32, 87.72, 100.2, 92.47, 81.7, 86.49, 89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 198.7, 290.79, 266.88, 278.67, 276.7, 272.05, 243.27, 197.22] },
      velocityScore: { '1D': -18.7, '1W': -22.7, '1M': -38.3, '6M': null }, isNew: false,
      marketCap: '$177B', pe: 67.8, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.12,
      etfPresence: { AIS: 3.31, ARTY: 3.45, BAI: 1.59, IGPT: false, IVES: false, ALAI: false, CHAT: 1.27, AIFD: 4.9, SPRX: 2.83, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 6, avgWeight: 2.66, proScore: 1.6, coverage: 0.6,
      price: 168.59, weeklyPrices: [186.96, 181.15, 182.57, 171.92, 168.59], weeklyChange: -9.83, dayChange: -1.94, sortRank: 0, periodReturns: { '1M': 0.3, 'YTD': 28.7, '6M': 29.9, '1Y': 55.7 },
      priceHistory: { '1D': [171.92, 168.83, 168.59, 168.59], '1W': [186.96, 181.15, 182.57, 171.92, 168.59], '1M': [168.01, 164.93, 169.67, 174.56, 162.2, 161.74, 165.45, 157.6, 164.1, 169.88, 166.62, 159.99, 173.28, 166.46, 181.05, 184.69, 186.96, 181.15, 182.57, 171.92, 168.59], 'YTD': [131.03, 123.72, 129.83, 143.72, 138.37, 143.45, 139.54, 130.25, 139.4, 134.03, 131.22, 120.77, 126.25, 154.37, 172.86, 165.29, 147.06, 140.69, 140.49, 159.47, 154.27, 169.09, 162.2, 169.88, 184.69, 168.59], '6M': [129.83, 143.72, 138.37, 141.74, 142.58, 128.77, 124.6, 137.17, 135.35, 135.88, 116.13, 133.64, 154.37, 172.86, 165.29, 170.22, 142.54, 141.58, 154.31, 175.33, 152.16, 168.01, 161.74, 166.62, 184.69, 168.59], '1Y': [108.3, 113.04, 122.09, 138.78, 138.01, 131.47, 133.27, 137.38, 150.72, 142.84, 142.64, 149.27, 157.36, 143.38, 146.59, 162.03, 140.42, 134.98, 124.81, 127.65, 127.8, 132.36, 122.36, 130.77, 133.6, 122.89, 129.83, 143.72, 138.37, 141.74, 142.58, 128.77, 129.3, 137.17, 135.35, 135.88, 116.13, 133.64, 154.37, 172.86, 165.29, 170.22, 142.54, 141.58, 154.31, 175.33, 152.16, 168.01, 161.74, 166.62, 184.69, 168.59] },
      velocityScore: { '1D': -2.4, '1W': 3.2, '1M': 5.3, '6M': null }, isNew: false,
      marketCap: '$212B', pe: 57.9, revenueGrowth: 35, eps: 2.91, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.64, ARTY: 2.7, BAI: 1.5, IGPT: false, IVES: false, ALAI: false, CHAT: 2.29, AIFD: 5.63, SPRX: 2.2, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 6 of 10 AI & ML ETFs (60% coverage) with average weight 2.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 4.1, proScore: 2.05, coverage: 0.5,
      price: 253.55, weeklyPrices: [245.34, 247.31, 247.49, 254.96, 253.55], weeklyChange: 3.35, dayChange: -0.55, sortRank: 0, periodReturns: { '1M': 3.1, 'YTD': 9.8, '6M': 6, '1Y': 13.6 },
      priceHistory: { '1D': [254.96, 253.68, 253.59, 253.55], '1W': [245.34, 247.31, 247.49, 254.96, 253.55], '1M': [246, 237.5, 244.39, 232.79, 234.11, 234.27, 227.01, 232.69, 240.14, 238.34, 241.7, 242.67, 244.16, 245.98, 243.62, 247.04, 245.34, 247.31, 247.49, 254.96, 253.55], 'YTD': [230.82, 246.29, 239.12, 238.42, 242.96, 206.96, 204.79, 207.92, 218.94, 209.53, 205.37, 199.34, 212.79, 249.02, 249.91, 259.7, 274.99, 270.13, 265.01, 270.64, 246.03, 246.02, 234.11, 238.34, 247.04, 253.55], '6M': [239.12, 238.42, 242.96, 208.72, 201.15, 208.56, 208.73, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 259.34, 271.85, 256.52, 244.19, 246, 234.27, 241.7, 247.04, 253.55], '1Y': [223.19, 228.29, 230.19, 222.31, 224.56, 223.81, 229.12, 225.99, 230.33, 231.62, 220.21, 220.63, 225.22, 215.57, 217.95, 230.3, 250.2, 244.2, 222.69, 229.16, 232.38, 231.78, 221.27, 232.38, 226.5, 247.38, 239.12, 238.42, 242.96, 208.72, 201.15, 208.56, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 259.34, 271.85, 256.52, 244.19, 246, 234.27, 241.7, 247.04, 253.55] },
      velocityScore: { '1D': 1.5, '1W': 2.5, '1M': 2, '6M': null }, isNew: false,
      marketCap: '$2.7T', pe: 30.3, revenueGrowth: 17, eps: 8.36, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 5.08, ALAI: 5.02, CHAT: 2.71, AIFD: 3.64, SPRX: false, AOTG: 4.05 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.73, proScore: 1.86, coverage: 0.5,
      price: 396.17, weeklyPrices: [385.10, 390.99, 384.93, 395.63, 396.17], weeklyChange: 2.87, dayChange: 0.14, sortRank: 0, periodReturns: { '1M': 0.6, 'YTD': -18.1, '6M': -13.8, '1Y': -21.6 },
      priceHistory: { '1D': [395.63, 395.99, 396, 396.17], '1W': [385.1, 390.99, 384.93, 395.63, 396.17], '1M': [393.83, 378.91, 379.4, 367.34, 373.94, 365.46, 352.83, 372.97, 368.57, 373.02, 384.28, 390.49, 386.74, 388.84, 383.34, 384.36, 385.1, 390.99, 384.93, 395.63, 396.17], 'YTD': [483.62, 478.11, 459.86, 470.28, 423.37, 413.27, 399.6, 401.72, 410.68, 401.86, 381.87, 356.77, 372.88, 393.11, 424.16, 429.25, 413.96, 405.21, 421.06, 450.24, 416.67, 399.76, 373.94, 373.02, 384.36, 396.17], '6M': [459.86, 470.28, 423.37, 413.6, 396.86, 389, 403.93, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 417.42, 412.67, 441.31, 403.41, 393.83, 365.46, 384.28, 384.36, 396.17], '1Y': [505.62, 505.87, 513.24, 524.94, 520.58, 505.72, 506.74, 505.35, 500.37, 510.02, 510.15, 519.71, 524.85, 513.43, 520.54, 541.55, 507.16, 511.14, 487.12, 485.5, 477.73, 478.56, 476.12, 488.02, 472.94, 479.28, 459.86, 470.28, 423.37, 413.6, 396.86, 389, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 417.42, 412.67, 441.31, 403.41, 393.83, 365.46, 384.28, 384.36, 396.17] },
      velocityScore: { '1D': 2.2, '1W': 1.1, '1M': 7.5, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 23.6, revenueGrowth: 18, eps: 16.77, grossMargin: 68, dividendYield: 0.92,
      etfPresence: { AIS: false, ARTY: 2.77, BAI: false, IGPT: false, IVES: 4.85, ALAI: 5.11, CHAT: 2.48, AIFD: false, SPRX: false, AOTG: 3.43 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.23, proScore: 1.62, coverage: 0.5,
      price: 331.61, weeklyPrices: [412.97, 362.05, 361.78, 350.62, 331.61], weeklyChange: -19.7, dayChange: -5.42, sortRank: 0, periodReturns: { '1M': -8.3, 'YTD': 99.3, '6M': 82.2, '1Y': 260.7 },
      priceHistory: { '1D': [350.62, 334.57, 331.61], '1W': [412.97, 362.05, 361.78, 350.62, 331.61], '1M': [361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42, 432.74, 382.89, 393.16, 417.45, 412.97, 362.05, 361.78, 350.62, 331.61], 'YTD': [166.36, 156.73, 182, 163.25, 152.44, 182.86, 129.58, 124.67, 120, 119.9, 116.04, 112.47, 117.99, 170.6, 191.97, 183.31, 213.91, 224.09, 287.48, 342.85, 317.06, 389.2, 397.02, 483.02, 417.45, 331.61], '6M': [182, 163.25, 152.44, 187.67, 123.69, 128.4, 109.8, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 325.33, 355.76, 341.7, 361.71, 399.92, 430.86, 417.45, 331.61], '1Y': [91.94, 119.48, 128.87, 174.39, 193.64, 172.45, 179.2, 176.61, 230.37, 249.38, 205.27, 194.5, 219.36, 161.46, 154.85, 173.62, 181.94, 157.79, 142.01, 154.22, 152.5, 164.32, 140.24, 169.97, 179.56, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.4, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 325.33, 355.76, 341.7, 361.71, 399.92, 430.86, 417.45, 331.61] },
      velocityScore: { '1D': -12.9, '1W': -15.2, '1M': 2.5, '6M': null }, isNew: false,
      marketCap: '$57B', pe: 225.6, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 1.99, ARTY: 1.27, BAI: false, IGPT: false, IVES: false, ALAI: 0.92, CHAT: 2.12, AIFD: false, SPRX: 9.87, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 5, avgWeight: 2.74, proScore: 1.37, coverage: 0.5,
      price: 728.01, weeklyPrices: [802.01, 768.15, 814.80, 752.00, 728.01], weeklyChange: -9.23, dayChange: -3.19, sortRank: 0, periodReturns: { '1M': -16.8, 'YTD': 97.5, '6M': 124.5, '1Y': 630.7 },
      priceHistory: { '1D': [752, 732.45, 730.22, 728.01], '1W': [802.01, 768.15, 814.8, 752, 728.01], '1M': [875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06, 801.16, 728.32, 731.25, 698.91, 707.1, 785.77, 802.01, 768.15, 814.8, 752, 728.01], 'YTD': [368.59, 348.26, 324.25, 332.45, 423.42, 561.13, 594.26, 677, 650.82, 616.09, 706.35, 702.73, 772.28, 852.79, 836.92, 791.37, 944.28, 1030.37, 868.07, 854.96, 863.66, 957.24, 827.92, 858.06, 785.77, 728.01], '6M': [324.25, 332.45, 423.42, 577.15, 600.42, 688.27, 694.43, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 890.09, 902.31, 1029.15, 821.76, 875.36, 842.53, 801.16, 785.77, 728.01], '1Y': [99.63, 102.13, 109.85, 110.01, 120.23, 115.89, 125.84, 134.12, 164.88, 163.34, 152.75, 171.4, 163.09, 156.57, 158.06, 214.28, 232.75, 253.81, 268.92, 308.28, 302.98, 366, 320.25, 395.92, 386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 600.42, 688.27, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 890.09, 902.31, 1029.15, 821.76, 875.36, 842.53, 801.16, 785.77, 728.01] },
      velocityScore: { '1D': -0.7, '1W': 6.2, '1M': -4.9, '6M': null }, isNew: false,
      marketCap: '$57B', pe: 127.3, revenueGrowth: 90, eps: 5.72, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.51, IGPT: false, IVES: false, ALAI: 1.25, CHAT: 1.48, AIFD: 4.45, SPRX: 4.01, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 5 of 10 AI & ML ETFs (50% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 5, avgWeight: 2.12, proScore: 1.06, coverage: 0.5,
      price: 1532.48, weeklyPrices: [1915.92, 1673.97, 1757.82, 1615.00, 1532.48], weeklyChange: -20.01, dayChange: -5.11, sortRank: 0, periodReturns: { '1M': -23.1, 'YTD': 545.6, '6M': 270.5, '1Y': 3605.2 },
      priceHistory: { '1D': [1615, 1536.74, 1534.3, 1532.48], '1W': [1915.92, 1673.97, 1757.82, 1615, 1532.48], '1M': [1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745, 1744.43, 1617.7, 1727.18, 1858.27, 1915.92, 1673.97, 1757.82, 1615, 1532.48], 'YTD': [237.38, 334.54, 413.62, 470.8, 665.24, 541.64, 600.4, 651.9, 565.59, 618.82, 709.71, 615.83, 724.63, 944.46, 903.49, 1002.35, 1409.98, 1447.23, 1392.56, 1694.98, 1559.32, 2107.86, 1963.6, 2273.73, 1858.27, 1532.48], '6M': [413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 565.41, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1716.36, 1646.54, 1991.55, 1914.46, 2032.22, 1858.27, 1532.48], '1Y': [41.36, 43, 43.39, 42.1, 47.01, 44.4, 48.44, 53.01, 73.92, 93.97, 99.83, 121.12, 131.88, 144.3, 146.95, 204.36, 216.5, 283.1, 245.96, 215.04, 194.38, 232.86, 206.83, 250.08, 275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1716.36, 1646.54, 1991.55, 1914.46, 2032.22, 1858.27, 1532.48] },
      velocityScore: { '1D': -5.4, '1W': -4.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$227B', pe: 52.4, revenueGrowth: 251, eps: 29.23, grossMargin: 56, dividendYield: null,
      etfPresence: { AIS: 2, ARTY: false, BAI: 2.72, IGPT: 3.71, IVES: false, ALAI: 0.45, CHAT: false, AIFD: false, SPRX: false, AOTG: 1.7 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'CRDO', name: 'Credo Technology Group Holding Ltd', easyScore: 5, avgWeight: 1.85, proScore: 0.92, coverage: 0.5,
      price: 218.21, weeklyPrices: [257.79, 236.88, 236.18, 226.74, 218.21], weeklyChange: -15.36, dayChange: -3.76, sortRank: 0, periodReturns: { '1M': -8.8, 'YTD': 51.6, '6M': 44.5, '1Y': 115.6 },
      priceHistory: { '1D': [226.74, 220.85, 218.6, 218.21], '1W': [257.79, 236.88, 236.18, 226.74, 218.21], '1M': [239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 265.55, 246.4, 258.69, 265.65, 257.79, 236.88, 236.18, 226.74, 218.21], 'YTD': [143.89, 141.59, 150.97, 128.02, 119.96, 134.72, 127.91, 114.48, 114.74, 111.57, 103.4, 95.24, 102.46, 159.52, 183.32, 165.92, 198.29, 189.36, 182.98, 236.03, 206.89, 259.41, 272.01, 271.95, 265.65, 218.21], '6M': [150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 97.3, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.23, 229, 234.32, 239.18, 268.99, 259.09, 265.65, 218.21], '1Y': [101.19, 98.41, 116.01, 117.34, 121.13, 105.99, 122.73, 124.77, 163.96, 164.44, 149.38, 144.91, 148.87, 131.41, 137.2, 171.52, 173.16, 160.34, 141.88, 164.01, 189.19, 157.98, 134.13, 150.19, 143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.23, 229, 234.32, 239.18, 268.99, 259.09, 265.65, 218.21] },
      velocityScore: { '1D': -7.1, '1W': -11.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$41B', pe: 86.6, revenueGrowth: 157, eps: 2.52, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: 1.04, ARTY: 1.19, BAI: 2.04, IGPT: false, IVES: false, ALAI: false, CHAT: 1.8, AIFD: false, SPRX: 3.16, AOTG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, avgWeight: 3.03, proScore: 1.21, coverage: 0.4,
      price: 297.81, weeklyPrices: [318.86, 305.87, 303.58, 304.57, 297.81], weeklyChange: -6.6, dayChange: -2.25, sortRank: 0, periodReturns: { '1M': -0.6, 'YTD': 83.8, '6M': 68.3, '1Y': 137.5 },
      priceHistory: { '1D': [304.66, 299.79, 298.2, 297.81], '1W': [318.86, 305.87, 303.58, 304.57, 297.81], '1M': [299.6, 317.58, 333.05, 357.96, 318.32, 316.43, 325.57, 303.95, 306.97, 334.82, 311.42, 300.53, 318.47, 305.58, 317.81, 323.92, 318.86, 305.87, 303.58, 304.57, 297.81], 'YTD': [162.01, 160.78, 176.93, 181.23, 190.01, 199.62, 243.21, 259.23, 249.75, 265.38, 255.88, 251.07, 258.73, 310.51, 312.44, 305.03, 358.92, 369.99, 315.67, 315.71, 300.51, 311.93, 318.32, 334.82, 323.92, 297.81], '6M': [176.93, 181.23, 190.01, 202, 243.53, 253.15, 244.44, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 322.63, 319.78, 334.49, 289.52, 299.6, 316.43, 311.42, 323.92, 297.81], '1Y': [125.4, 130.19, 144.17, 139.75, 137.4, 127.54, 129.31, 125.59, 136.74, 136.83, 141.62, 161.59, 167.38, 180.51, 171.59, 199.27, 190.71, 173.37, 170.65, 172.02, 178.88, 181.82, 149.83, 166.87, 175.61, 163.58, 176.93, 181.23, 190.01, 202, 243.53, 253.15, 257.75, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 322.63, 319.78, 334.49, 289.52, 299.6, 316.43, 311.42, 323.92, 297.81] },
      velocityScore: { '1D': 0.8, '1W': -1.6, '1M': 5.2, '6M': null }, isNew: false,
      marketCap: '$114B', pe: 74.6, revenueGrowth: 30, eps: 3.99, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.83, ARTY: false, BAI: 1.95, IGPT: false, IVES: false, ALAI: false, CHAT: 2.21, AIFD: 4.11, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 4, avgWeight: 2.71, proScore: 1.08, coverage: 0.4,
      price: 99.42, weeklyPrices: [109.84, 103.12, 107.76, 102.99, 99.42], weeklyChange: -9.49, dayChange: -3.47, sortRank: 0, periodReturns: { '1M': -15.1, 'YTD': 169.4, '6M': 111.7, '1Y': 338.2 },
      priceHistory: { '1D': [102.99, 100.12, 99.69, 99.42], '1W': [109.84, 103.12, 107.76, 102.99, 99.42], '1M': [117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.2, 110.39, 110.24, 112.54, 109.84, 103.12, 107.76, 102.99, 99.42], 'YTD': [36.9, 41.11, 46.96, 42.49, 48.81, 47.13, 45.46, 45.46, 45.95, 45.25, 43.87, 43.13, 50.78, 63.81, 66.26, 84.52, 113.01, 120.29, 118.96, 114.68, 99.17, 127.86, 132.28, 139.63, 112.54, 99.42], '6M': [46.96, 42.49, 48.81, 50.24, 46.18, 46.12, 43.1, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 121.77, 107.93, 107.92, 117.05, 131.65, 127.02, 112.54, 99.42], '1Y': [22.69, 23.49, 20.34, 20.41, 22.22, 23.54, 24.85, 24, 24.77, 24.9, 31.22, 35.94, 37.43, 37.15, 36.92, 41.34, 38.38, 37.89, 35.11, 36.81, 43.76, 40.78, 36.05, 36.16, 39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 46.12, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 121.77, 107.93, 107.92, 117.05, 131.65, 127.02, 112.54, 99.42] },
      velocityScore: { '1D': -3.6, '1W': -6.1, '1M': -27.5, '6M': null }, isNew: false,
      marketCap: '$500B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.09, ARTY: false, BAI: 2.75, IGPT: 4.02, IVES: false, ALAI: false, CHAT: 0.97, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 4, avgWeight: 2.65, proScore: 1.06, coverage: 0.4,
      price: 490.08, weeklyPrices: [582.59, 555.55, 563.32, 513.84, 490.08], weeklyChange: -15.88, dayChange: -4.62, sortRank: 0, periodReturns: { '1M': -28, 'YTD': 184.5, '6M': 121.2, '1Y': 636.6 },
      priceHistory: { '1D': [513.84, 489.45, 490.55, 490.08], '1W': [582.59, 555.55, 563.32, 513.84, 490.08], '1M': [681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 532.1, 550.3, 578.05, 582.59, 555.55, 563.32, 513.84, 490.08], 'YTD': [172.27, 187.68, 221.51, 240.85, 270.23, 262.56, 296.56, 282.25, 259.03, 261.18, 293.1, 275.34, 304.15, 366.22, 383.81, 390.99, 483.15, 494.09, 459.62, 531.21, 511.72, 653.53, 670.75, 638.72, 578.05, 490.08], '6M': [221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 563.1, 517.72, 681.08, 643.83, 598.37, 578.05, 490.08], '1Y': [66.53, 69.32, 71.43, 73.78, 76.07, 75.64, 80.67, 86, 95.02, 100.94, 109.69, 130.59, 121.18, 120.44, 120.47, 141.38, 160.1, 166.11, 153.97, 157.74, 155.59, 181.95, 166.26, 179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 563.1, 517.72, 681.08, 643.83, 598.37, 578.05, 490.08] },
      velocityScore: { '1D': -7.8, '1W': -6.2, '1M': -33.8, '6M': null }, isNew: false,
      marketCap: '$169B', pe: 29.3, revenueGrowth: 46, eps: 16.7, grossMargin: 45, dividendYield: 0.12,
      etfPresence: { AIS: 1.27, ARTY: 2.59, BAI: 2.95, IGPT: false, IVES: false, ALAI: 3.79, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 4, avgWeight: 2.51, proScore: 1.01, coverage: 0.4,
      price: 387.38, weeklyPrices: [407.76, 394.76, 396.18, 394.46, 387.38], weeklyChange: -5, dayChange: -1.79, sortRank: 0, periodReturns: { '1M': -4.3, 'YTD': -13.9, '6M': -11.5, '1Y': 20.4 },
      priceHistory: { '1D': [394.46, 388.8, 388.33, 387.38], '1W': [407.76, 394.76, 396.18, 394.46, 387.38], '1M': [404.66, 396.38, 400.49, 405.05, 381.61, 375.53, 375.12, 379.71, 411.84, 420.6, 425.3, 393.45, 419.77, 402.9, 394.06, 406.55, 407.76, 394.76, 396.18, 394.46, 387.38], 'YTD': [449.72, 435.8, 437.5, 435.2, 421.81, 425.21, 411.32, 408.58, 405.55, 395.01, 367.96, 361.83, 352.82, 364.2, 386.42, 376.02, 398.73, 445.27, 417.26, 435.79, 391, 411.15, 381.61, 420.6, 406.55, 387.38], '6M': [437.5, 435.2, 421.81, 417.32, 410.63, 409.38, 392.43, 398.68, 395.56, 380.85, 355.28, 346.65, 364.2, 386.42, 376.02, 389.37, 433.45, 404.11, 440.36, 423.74, 396.68, 404.66, 375.53, 425.3, 406.55, 387.38], '1Y': [321.67, 332.56, 319.04, 319.91, 339.38, 323.9, 349.6, 334.09, 347.79, 425.86, 442.79, 459.46, 438.69, 435.15, 438.97, 461.51, 462.07, 430.6, 403.99, 426.58, 446.74, 451.45, 467.26, 485.4, 438.07, 445.01, 437.5, 435.2, 421.81, 417.32, 410.63, 409.38, 403.32, 398.68, 395.56, 380.85, 355.28, 346.65, 364.2, 386.42, 376.02, 389.37, 433.45, 404.11, 440.36, 423.74, 396.68, 404.66, 375.53, 425.3, 406.55, 387.38] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 352.2, revenueGrowth: 16, eps: 1.1, grossMargin: 19, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 0.97, IGPT: false, IVES: 4.49, ALAI: 2.65, CHAT: false, AIFD: 1.95, SPRX: false, AOTG: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 4, avgWeight: 2.43, proScore: 0.97, coverage: 0.4,
      price: 128.81, weeklyPrices: [140.64, 131.54, 127.94, 132.49, 128.81], weeklyChange: -8.41, dayChange: -2.81, sortRank: 0, periodReturns: { '1M': -31.6, 'YTD': -33.9, '6M': -32.6, '1Y': -46.6 },
      priceHistory: { '1D': [132.53, 129.05, 128.86, 128.81], '1W': [140.64, 131.54, 127.94, 132.49, 128.81], '1M': [188.33, 183.53, 184.29, 175.07, 165.16, 157.53, 152.46, 148.53, 147.76, 146.55, 142.5, 140.27, 143.76, 141.6, 140.49, 144.22, 140.64, 131.54, 127.94, 132.49, 128.81], 'YTD': [194.91, 189.65, 191.09, 182.44, 160.06, 159.89, 156.17, 150.31, 154.79, 159.16, 149.68, 139.66, 145.54, 163, 181.17, 165.96, 194.03, 189.76, 188.16, 225.78, 213.68, 192.64, 165.16, 146.55, 144.22, 128.81], '6M': [191.09, 182.44, 160.06, 156.59, 153.97, 146.14, 149.01, 151.56, 155.97, 154.34, 138.8, 143.17, 163, 181.17, 165.96, 185.35, 186.83, 181.46, 190.96, 244.58, 205.81, 188.33, 157.53, 142.5, 144.22, 128.81], '1Y': [241.3, 241.9, 250.6, 256.43, 244.18, 235.06, 235.81, 223.45, 328.33, 301.41, 308.46, 289.01, 288.63, 303.62, 272.66, 275.3, 250.31, 226.99, 225.53, 204.96, 207.73, 223.01, 178.46, 197.49, 195.71, 198.52, 191.09, 182.44, 160.06, 156.59, 153.97, 146.14, 149.25, 151.56, 155.97, 154.34, 138.8, 143.17, 163, 181.17, 165.96, 185.35, 186.83, 181.46, 190.96, 244.58, 205.81, 188.33, 157.53, 142.5, 144.22, 128.81] },
      velocityScore: { '1D': null, '1W': -4, '1M': -18.5, '6M': null }, isNew: true,
      marketCap: '$371B', pe: 22.1, revenueGrowth: 21, eps: 5.83, grossMargin: 66, dividendYield: 1.51,
      etfPresence: { AIS: false, ARTY: 3.03, BAI: false, IGPT: false, IVES: 2.73, ALAI: false, CHAT: 1.84, AIFD: false, SPRX: false, AOTG: 2.1 },
      tonyNote: 'Oracle lands in 3 AI ETFs on the strength of its cloud database and AI infrastructure contracts. Revenue grew 22%, 67% gross margin, P/E of 40x. The 17.5% weekly return following a major earnings beat shows how quickly sentiment can reprice; the weight score at 2.04% is still modest, meaning ETF managers have started building positions but conviction is not yet deep.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 4.52, proScore: 4.52, coverage: 1,
      price: 876.46, weeklyPrices: [979.30, 937.00, 983.12, 904.28, 876.46], weeklyChange: -10.5, dayChange: -3.08, sortRank: 0, periodReturns: { '1M': -14.1, 'YTD': 207.1, '6M': 141.6, '1Y': 652.8 },
      priceHistory: { '1D': [904.28, 878.35, 876.46], '1W': [979.3, 937, 983.12, 904.28, 876.46], '1M': [1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 948.8, 991.64, 979.3, 937, 983.12, 904.28, 876.46], 'YTD': [285.41, 327.02, 362.75, 389.09, 437.8, 373.25, 420.95, 415.56, 397.05, 405.35, 422.9, 357.22, 377.76, 465.66, 449.38, 504.29, 666.59, 803.63, 731.99, 971, 864.01, 1087.99, 1051.77, 1154.29, 991.64, 876.46], '6M': [362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1064.1, 935.89, 1020.76, 1048.51, 1032.28, 991.64, 876.46], '1Y': [116.43, 109.83, 114.74, 108.78, 124.27, 117.21, 117.75, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 198.47, 226.63, 237.5, 244.9, 225.92, 230.26, 234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1064.1, 935.89, 1020.76, 1048.51, 1032.28, 991.64, 876.46] },
      velocityScore: { '1D': -6.8, '1W': -8.1, '1M': -28.3, '6M': null }, isNew: false,
      marketCap: '$990B', pe: 19.8, revenueGrowth: 346, eps: 44.22, grossMargin: 73, dividendYield: 0.06,
      etfPresence: { SOXX: 7.73, PSI: 5.33, XSD: 2.48, DRAM: 2.54 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.64, proScore: 4.23, coverage: 0.75,
      price: 512.78, weeklyPrices: [557.89, 534.39, 548.13, 529.14, 512.78], weeklyChange: -8.09, dayChange: -3.09, sortRank: 0, periodReturns: { '1M': 1.1, 'YTD': 139.4, '6M': 121.2, '1Y': 220.3 },
      priceHistory: { '1D': [529.14, 516.07, 512.78], '1W': [557.89, 534.39, 548.13, 529.14, 512.78], '1M': [507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 517.41, 546.72, 557.89, 534.39, 548.13, 529.14, 512.78], 'YTD': [214.16, 204.68, 231.83, 251.31, 246.27, 213.57, 200.12, 203.68, 199.45, 197.74, 201.33, 201.99, 220.18, 255.07, 284.49, 323.21, 421.39, 445.5, 447.58, 516.1, 466.38, 547.26, 519.85, 580.91, 546.72, 512.78], '6M': [231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 521.54, 475.51, 507.29, 519.74, 540.88, 546.72, 512.78], '1Y': [160.08, 158.65, 179.51, 163.12, 184.42, 165.2, 167.13, 162.13, 159.54, 159.16, 160.88, 164.01, 235.56, 238.6, 230.23, 264.33, 256.33, 258.89, 223.55, 214.24, 217.6, 221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 521.54, 475.51, 507.29, 519.74, 540.88, 546.72, 512.78] },
      velocityScore: { '1D': -1.2, '1W': 2.9, '1M': -5.8, '6M': null }, isNew: false,
      marketCap: '$836B', pe: 169.8, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 8.51, PSI: 5.54, XSD: 2.87, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 5.39, proScore: 4.04, coverage: 0.75,
      price: 208.76, weeklyPrices: [210.96, 203.53, 211.80, 212.50, 208.76], weeklyChange: -1.04, dayChange: -1.76, sortRank: 0, periodReturns: { '1M': 0.7, 'YTD': 11.9, '6M': 12.1, '1Y': 21.8 },
      priceHistory: { '1D': [212.5, 209.4, 208.76], '1W': [210.96, 203.53, 211.8, 212.5, 208.76], '1M': [207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 196.93, 204.12, 202.78, 210.96, 203.53, 211.8, 212.5, 208.76], 'YTD': [186.5, 185.04, 186.23, 186.47, 185.61, 188.54, 187.98, 184.89, 183.34, 183.14, 172.7, 167.52, 177.64, 196.51, 199.88, 213.17, 207.83, 225.83, 223.47, 211.14, 205.1, 212.45, 200.04, 200.09, 202.78, 208.76], '6M': [186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 222.82, 208.19, 207.41, 199, 197.58, 202.78, 208.76], '1Y': [171.37, 170.78, 179.27, 179.42, 181.59, 175.4, 181.6, 170.62, 177.33, 170.29, 176.97, 187.24, 189.11, 179.83, 180.28, 207.04, 195.21, 193.8, 186.52, 180.26, 179.59, 183.78, 170.94, 188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 222.82, 208.19, 207.41, 199, 197.58, 202.78, 208.76] },
      velocityScore: { '1D': 2.8, '1W': 4.7, '1M': 39.3, '6M': null }, isNew: false,
      marketCap: '$5.1T', pe: 32, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { SOXX: 8.35, PSI: 5.22, XSD: 2.59, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.05, proScore: 3.04, coverage: 0.75,
      price: 99.42, weeklyPrices: [109.84, 103.12, 107.76, 102.99, 99.42], weeklyChange: -9.49, dayChange: -3.47, sortRank: 0, periodReturns: { '1M': -15.1, 'YTD': 169.4, '6M': 111.7, '1Y': 338.2 },
      priceHistory: { '1D': [102.99, 100.12, 99.69, 99.42], '1W': [109.84, 103.12, 107.76, 102.99, 99.42], '1M': [117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.2, 110.39, 110.24, 112.54, 109.84, 103.12, 107.76, 102.99, 99.42], 'YTD': [36.9, 41.11, 46.96, 42.49, 48.81, 47.13, 45.46, 45.46, 45.95, 45.25, 43.87, 43.13, 50.78, 63.81, 66.26, 84.52, 113.01, 120.29, 118.96, 114.68, 99.17, 127.86, 132.28, 139.63, 112.54, 99.42], '6M': [46.96, 42.49, 48.81, 50.24, 46.18, 46.12, 43.1, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 121.77, 107.93, 107.92, 117.05, 131.65, 127.02, 112.54, 99.42], '1Y': [22.69, 23.49, 20.34, 20.41, 22.22, 23.54, 24.85, 24, 24.77, 24.9, 31.22, 35.94, 37.43, 37.15, 36.92, 41.34, 38.38, 37.89, 35.11, 36.81, 43.76, 40.78, 36.05, 36.16, 39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 46.12, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 121.77, 107.93, 107.92, 117.05, 131.65, 127.02, 112.54, 99.42] },
      velocityScore: { '1D': -1.9, '1W': -5.9, '1M': -18.5, '6M': null }, isNew: false,
      marketCap: '$500B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 5.39, PSI: 4.4, XSD: 2.36, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.75, proScore: 2.82, coverage: 0.75,
      price: 379.38, weeklyPrices: [395.65, 386.01, 392.75, 390.96, 379.38], weeklyChange: -4.11, dayChange: -2.96, sortRank: 0, periodReturns: { '1M': -8.8, 'YTD': 39.9, '6M': 26.4, '1Y': 57.7 },
      priceHistory: { '1D': [390.96, 381.73, 380.02, 379.38], '1W': [395.65, 386.01, 392.75, 390.96, 379.38], '1M': [416, 414.45, 434.46, 445.48, 407.26, 413.16, 417.93, 386.91, 391.78, 397.17, 388.98, 377.16, 388.83, 379.03, 385.4, 393.64, 395.65, 386.01, 392.75, 390.96, 379.38], 'YTD': [271.2, 299.16, 300.25, 304.01, 316.86, 325.16, 346.37, 354.35, 329.72, 307.27, 309.43, 307.44, 327.36, 348.6, 375.27, 383.26, 415.63, 432.39, 398.05, 413.85, 401.39, 427.58, 407.26, 397.17, 393.64, 379.38], '6M': [300.25, 304.01, 316.86, 322.97, 337.51, 356.09, 338.99, 319.71, 310.92, 312.19, 303.1, 327.41, 348.6, 375.27, 383.26, 404.77, 419.65, 414.31, 416.88, 423.2, 404.62, 416, 413.16, 388.98, 393.64, 379.38], '1Y': [240.61, 228.08, 231.11, 220.69, 237.63, 244.87, 255.5, 244.55, 247.21, 246.32, 248.61, 239.28, 237.93, 238.15, 240.36, 235.04, 236, 241.44, 232.2, 257.92, 278.24, 281.57, 271.04, 277.56, 273.74, 300.93, 300.25, 304.01, 316.86, 322.97, 337.51, 356.09, 352.41, 319.71, 310.92, 312.19, 303.1, 327.41, 348.6, 375.27, 383.26, 404.77, 419.65, 414.31, 416.88, 423.2, 404.62, 416, 413.16, 388.98, 393.64, 379.38] },
      velocityScore: { '1D': 2.2, '1W': 1.8, '1M': 20.5, '6M': null }, isNew: false,
      marketCap: '$185B', pe: 56.5, revenueGrowth: 37, eps: 6.72, grossMargin: 64, dividendYield: 1.13,
      etfPresence: { SOXX: 3.92, PSI: 4.91, XSD: 2.43, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.8% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 6.03, proScore: 3.01, coverage: 0.5,
      price: 571.08, weeklyPrices: [602.50, 575.39, 595.70, 579.43, 571.08], weeklyChange: -5.21, dayChange: -1.44, sortRank: 0, periodReturns: { '1M': 0.5, 'YTD': 122.2, '6M': 74.6, '1Y': 193.1 },
      priceHistory: { '1D': [579.43, 570.25, 572.26, 571.08], '1W': [602.5, 575.39, 595.7, 579.43, 571.08], '1M': [568.23, 592.92, 617.11, 640.18, 585.88, 588.97, 668, 626.84, 694.64, 723, 650.91, 603.04, 592.79, 554.5, 570.5, 588.66, 602.5, 575.39, 595.7, 579.43, 571.08], 'YTD': [256.99, 281.64, 327.01, 319.46, 328.4, 329.07, 369.3, 375.72, 346.53, 337.27, 357.06, 337.17, 352.62, 395.64, 394.33, 381.11, 428.62, 436.61, 426.85, 450.06, 453.01, 585.78, 585.88, 723, 588.66, 571.08], '6M': [327.01, 319.46, 328.4, 330.57, 359.13, 377.93, 351.32, 338.94, 346.18, 361.79, 323.12, 354.31, 395.64, 394.33, 381.11, 410.82, 431.2, 406.91, 448.25, 490.05, 499.21, 568.23, 588.97, 650.91, 588.66, 571.08], '1Y': [194.81, 187.01, 189.39, 178.14, 190.03, 160.96, 164.39, 156.25, 163.42, 178.13, 201.44, 217.74, 217.51, 227.58, 220.56, 235.75, 240.89, 230.73, 235.13, 249.97, 268.63, 275.15, 248.27, 260.78, 268.87, 301.18, 327.01, 319.46, 328.4, 330.57, 359.13, 377.93, 372.18, 338.94, 346.18, 361.79, 323.12, 354.31, 395.64, 394.33, 381.11, 410.82, 431.2, 406.91, 448.25, 490.05, 499.21, 568.23, 588.97, 650.91, 588.66, 571.08] },
      velocityScore: { '1D': -0.3, '1W': 1, '1M': 7.5, '6M': null }, isNew: false,
      marketCap: '$453B', pe: 55.4, revenueGrowth: 11, eps: 10.31, grossMargin: 49, dividendYield: 0.37,
      etfPresence: { SOXX: 5.34, PSI: 6.72, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 5.37, proScore: 2.68, coverage: 0.5,
      price: 220.87, weeklyPrices: [231.52, 222.25, 230.37, 224.50, 220.87], weeklyChange: -4.6, dayChange: -1.62, sortRank: 0, periodReturns: { '1M': -6.9, 'YTD': 81.8, '6M': 40.9, '1Y': 136.6 },
      priceHistory: { '1D': [224.5, 221.12, 220.93, 220.87], '1W': [231.52, 222.25, 230.37, 224.5, 220.87], '1M': [237.33, 238.73, 259.56, 269.16, 244.49, 240.48, 258.8, 248.64, 278.39, 301.71, 266.19, 235.55, 233.31, 216.47, 221.18, 229.52, 231.52, 222.25, 230.37, 224.5, 220.87], 'YTD': [121.51, 132.46, 156.78, 154.3, 141.04, 143.08, 148.03, 152.43, 142.94, 140.96, 149.87, 144.32, 154.01, 179.59, 178.54, 180.9, 181.63, 184.97, 182.95, 192.17, 192.92, 256.42, 244.49, 301.71, 229.52, 220.87], '6M': [156.78, 154.3, 141.04, 144.02, 147.02, 150.66, 144.13, 142.91, 143.82, 151.14, 138.26, 154.88, 179.59, 178.54, 180.9, 173.29, 181.13, 174.06, 195.72, 204.52, 213.94, 237.33, 240.48, 266.19, 229.52, 220.87], '1Y': [93.35, 89.71, 92.5, 88.83, 94.95, 87.84, 88.89, 84.39, 93.26, 98.99, 106.87, 112.89, 106.26, 108.7, 111.43, 123.53, 122.71, 119.9, 116.75, 115.91, 121.18, 123.89, 117.2, 127.7, 127.45, 140, 156.78, 154.3, 141.04, 144.02, 147.02, 150.66, 153.49, 142.91, 143.82, 151.14, 138.26, 154.88, 179.59, 178.54, 180.9, 173.29, 181.13, 174.06, 195.72, 204.52, 213.94, 237.33, 240.48, 266.19, 229.52, 220.87] },
      velocityScore: { '1D': -0.4, '1W': 1.1, '1M': 10.7, '6M': null }, isNew: false,
      marketCap: '$289B', pe: 62.7, revenueGrowth: 12, eps: 3.52, grossMargin: 61, dividendYield: 0.41,
      etfPresence: { SOXX: 4.85, PSI: 5.89, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 4.95, proScore: 2.48, coverage: 0.5,
      price: 379.9, weeklyPrices: [399.97, 384.05, 389.11, 394.28, 379.90], weeklyChange: -5.02, dayChange: -3.65, sortRank: 0, periodReturns: { '1M': 0.8, 'YTD': 9.8, '6M': 8, '1Y': 35.3 },
      priceHistory: { '1D': [394.28, 381.7, 379.9], '1W': [399.97, 384.05, 389.11, 394.28, 379.9], '1M': [376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 370.78, 388.69, 401.11, 399.97, 384.05, 389.11, 394.28, 379.9], 'YTD': [346.1, 332.48, 351.71, 324.85, 331.11, 340.44, 333.51, 321.7, 332.77, 335.97, 310.51, 300.68, 314.43, 380.78, 402.17, 399.83, 425.44, 416.79, 417.76, 446.77, 385.73, 393.94, 380.15, 377.75, 401.11, 379.9], '6M': [351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 481.57, 392.16, 376.71, 382.07, 369.34, 401.11, 379.9], '1Y': [280.81, 283.69, 302.62, 301.67, 309.09, 291.17, 300.25, 302.39, 369.57, 346.17, 339.31, 333.39, 345.5, 351.33, 340.3, 385.98, 358.98, 355.22, 354.42, 397.57, 380.61, 412.97, 326.02, 350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 481.57, 392.16, 376.71, 382.07, 369.34, 401.11, 379.9] },
      velocityScore: { '1D': 3.8, '1W': 3.3, '1M': 38.5, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63.4, revenueGrowth: 48, eps: 5.99, grossMargin: 76, dividendYield: 0.66,
      etfPresence: { SOXX: 7.32, PSI: false, XSD: 2.59, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 4.93, proScore: 2.46, coverage: 0.5,
      price: 325.79, weeklyPrices: [350.33, 329.92, 346.10, 335.43, 325.79], weeklyChange: -7, dayChange: -2.87, sortRank: 0, periodReturns: { '1M': -11.8, 'YTD': 90.3, '6M': 46.1, '1Y': 224.6 },
      priceHistory: { '1D': [335.43, 325.37, 326.33, 325.79], '1W': [350.33, 329.92, 346.1, 335.43, 325.79], '1M': [369.34, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82, 379.09, 410.91, 433.33, 391.26, 351.41, 350.2, 326.13, 333.15, 353.17, 350.33, 329.92, 346.1, 335.43, 325.79], 'YTD': [171.18, 200.96, 222.96, 222.87, 237.5, 226.61, 240.09, 239.07, 214.68, 209.49, 228.36, 211.41, 220.65, 272.41, 258.37, 251.23, 297.17, 295.44, 292.09, 318.18, 303.28, 388.92, 371.33, 433.33, 353.17, 325.79], '6M': [222.96, 222.87, 237.5, 229.28, 235.58, 244.25, 217.27, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 273.38, 318.93, 334.41, 327.16, 369.34, 374.8, 391.26, 353.17, 325.79], '1Y': [100.37, 97.1, 99.09, 95.94, 106.74, 99.15, 103.67, 97.74, 107.36, 121.9, 128.32, 142.79, 142.54, 144.78, 141.25, 160.67, 165.05, 161.42, 148.8, 155.14, 159.75, 168.26, 154.98, 177.33, 185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.58, 244.25, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 273.38, 318.93, 334.41, 327.16, 369.34, 374.8, 391.26, 353.17, 325.79] },
      velocityScore: { '1D': -0.8, '1W': 0.4, '1M': 5.6, '6M': null }, isNew: false,
      marketCap: '$407B', pe: 61.5, revenueGrowth: 24, eps: 5.3, grossMargin: 50, dividendYield: 0.31,
      etfPresence: { SOXX: 4.37, PSI: 5.48, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 3.35, proScore: 1.67, coverage: 0.5,
      price: 291.13, weeklyPrices: [311.46, 298.57, 305.55, 301.19, 291.13], weeklyChange: -6.53, dayChange: -3.34, sortRank: 0, periodReturns: { '1M': -4.8, 'YTD': 67.8, '6M': 52, '1Y': 34.4 },
      priceHistory: { '1D': [301.19, 292.7, 291.55, 291.13], '1W': [311.46, 298.57, 305.55, 301.19, 291.13], '1M': [305.71, 301.88, 322.86, 332.28, 304.36, 303.11, 311.81, 285.43, 285.48, 298.07, 298.41, 293.08, 303.5, 293.3, 301.32, 308.53, 311.46, 298.57, 305.55, 301.19, 291.13], 'YTD': [173.49, 188.45, 191.58, 196.59, 225.01, 220.92, 223.32, 212.63, 197.98, 190.05, 187.19, 190.33, 199.42, 218.87, 233.15, 265, 289.44, 306.34, 304.88, 305.68, 285.06, 313.34, 304.36, 298.07, 308.53, 291.13], '6M': [191.58, 196.59, 225.01, 218.77, 225.69, 213.35, 202.67, 196.2, 194.13, 188.63, 186.42, 199.74, 218.87, 233.15, 265, 281, 295.17, 302.31, 317.45, 308.12, 288.63, 305.71, 303.11, 298.41, 308.53, 291.13], '1Y': [216.64, 186.25, 189.52, 185.91, 193.29, 200.77, 205.47, 195.74, 184.01, 180.3, 184.44, 180.39, 181.6, 175.27, 170.71, 160.26, 163.57, 163.09, 157.09, 165.35, 182.6, 181.67, 174.49, 177.13, 177.52, 190.31, 191.58, 196.59, 225.01, 218.77, 225.69, 213.35, 209.82, 196.2, 194.13, 188.63, 186.42, 199.74, 218.87, 233.15, 265, 281, 295.17, 302.31, 317.45, 308.12, 288.63, 305.71, 303.11, 298.41, 308.53, 291.13] },
      velocityScore: { '1D': 0.6, '1W': 1.8, '1M': 20.1, '6M': null }, isNew: false,
      marketCap: '$265B', pe: 49.9, revenueGrowth: 19, eps: 5.84, grossMargin: 57, dividendYield: 1.89,
      etfPresence: { SOXX: 4.09, PSI: false, XSD: 2.61, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 3.09, proScore: 1.54, coverage: 0.5,
      price: 197.22, weeklyPrices: [235.81, 217.53, 222.44, 206.26, 197.22], weeklyChange: -16.36, dayChange: -4.38, sortRank: 0, periodReturns: { '1M': -29.2, 'YTD': 132.1, '6M': 145.1, '1Y': 178.4 },
      priceHistory: { '1D': [206.26, 197.76, 197.1, 197.22], '1W': [235.81, 217.53, 222.44, 206.26, 197.22], '1M': [278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 245.29, 249.27, 230.7, 231.71, 243.27, 235.81, 217.53, 222.44, 206.26, 197.22], 'YTD': [84.98, 83.45, 80.46, 81.77, 78.66, 82.01, 79.09, 79.29, 75.68, 87.67, 87.91, 94.88, 109.51, 133.83, 151.31, 153.23, 172.15, 177.95, 186.8, 205, 263.47, 308.88, 279.04, 297.89, 243.27, 197.22], '6M': [80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 77.51, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 198.7, 290.79, 266.88, 278.67, 276.7, 272.05, 243.27, 197.22], '1Y': [70.85, 73.27, 81.74, 75.32, 79.32, 71.22, 74.79, 62.31, 67.1, 70.98, 80.09, 83.89, 92.5, 88.89, 81.05, 90.15, 92.9, 89.33, 81.32, 87.72, 100.2, 92.47, 81.7, 86.49, 89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 198.7, 290.79, 266.88, 278.67, 276.7, 272.05, 243.27, 197.22] },
      velocityScore: { '1D': -5.5, '1W': -9.4, '1M': -53.9, '6M': null }, isNew: false,
      marketCap: '$177B', pe: 67.8, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.12,
      etfPresence: { SOXX: 4.17, PSI: false, XSD: 2, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.99, proScore: 1.5, coverage: 0.5,
      price: 271.85, weeklyPrices: [292.26, 278.39, 283.87, 279.01, 271.85], weeklyChange: -6.98, dayChange: -2.57, sortRank: 0, periodReturns: { '1M': -10.2, 'YTD': 25.2, '6M': 14.7, '1Y': 23.2 },
      priceHistory: { '1D': [279.01, 272.88, 271.8, 271.85], '1W': [292.26, 278.39, 283.87, 279.01, 271.85], '1M': [302.89, 298.2, 313.27, 323.24, 299.94, 294.06, 298.64, 277.02, 278.37, 281.03, 279.18, 273.36, 280.51, 273.15, 283.81, 290.54, 292.26, 278.39, 283.87, 279.01, 271.85], 'YTD': [217.06, 237.89, 237.11, 231.05, 231.08, 236.62, 237.33, 232.23, 210.58, 191.22, 191.37, 191.66, 197.08, 209.89, 224.5, 230.39, 303.55, 298.41, 310.15, 321.35, 295.96, 315.88, 299.94, 281.03, 290.54, 271.85], '6M': [237.11, 231.05, 231.08, 228.91, 245.09, 234.63, 215.25, 205.25, 191.89, 193.39, 187.39, 195.12, 209.89, 224.5, 230.39, 292.35, 294.23, 294.28, 329.24, 323.62, 297.41, 302.89, 294.06, 279.18, 290.54, 271.85], '1Y': [220.58, 224.71, 220.94, 205.92, 230.52, 228.77, 237.67, 228.2, 219.28, 221.89, 227.66, 224.91, 225.64, 217.23, 217.16, 204.71, 210.44, 204.08, 190.06, 193.76, 227.56, 230.78, 223.23, 225.26, 221.28, 241.15, 237.11, 231.05, 231.08, 228.91, 245.09, 234.63, 224.76, 205.25, 191.89, 193.39, 187.39, 195.12, 209.89, 224.5, 230.39, 292.35, 294.23, 294.28, 329.24, 323.62, 297.41, 302.89, 294.06, 279.18, 290.54, 271.85] },
      velocityScore: { '1D': 0.7, '1W': 0, '1M': 11.1, '6M': null }, isNew: false,
      marketCap: '$69B', pe: 26, revenueGrowth: 12, eps: 10.46, grossMargin: 56, dividendYield: 1.45,
      etfPresence: { SOXX: 3.6, PSI: false, XSD: 2.38, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.78, proScore: 1.39, coverage: 0.5,
      price: 1307.14, weeklyPrices: [1352.74, 1291.38, 1376.41, 1352.66, 1307.14], weeklyChange: -3.37, dayChange: -3.36, sortRank: 0, periodReturns: { '1M': -12.8, 'YTD': 44.2, '6M': 26.5, '1Y': 83.1 },
      priceHistory: { '1D': [1352.66, 1320.54, 1307.69, 1307.14], '1W': [1352.74, 1291.38, 1376.41, 1352.66, 1307.14], '1M': [1498.77, 1448.21, 1563.7, 1537.88, 1423.76, 1434.95, 1438.3, 1313.32, 1312.77, 1382.36, 1331.73, 1288.16, 1346.13, 1272.81, 1315.51, 1374.13, 1352.74, 1291.38, 1376.41, 1352.66, 1307.14], 'YTD': [906.36, 959.09, 1033.17, 1068.14, 1173.22, 1142.02, 1188.32, 1180.13, 1078.44, 1033.88, 1068.85, 1053.01, 1180.03, 1363.42, 1527.95, 1504.08, 1652.35, 1650.35, 1553.27, 1566.21, 1481.05, 1652.29, 1423.76, 1382.36, 1374.13, 1307.14], '6M': [1033.17, 1068.14, 1173.22, 1206.18, 1173.18, 1213.67, 1074.37, 1062, 1077.4, 1076.35, 1002.34, 1191.22, 1363.42, 1527.95, 1504.08, 1588.12, 1599.52, 1468.11, 1620.17, 1624.99, 1531.98, 1498.77, 1434.95, 1331.73, 1374.13, 1307.14], '1Y': [714.03, 720.01, 730.54, 805.85, 861.8, 826.27, 866.32, 827.56, 855.18, 877.66, 908.45, 915.87, 980.9, 1007.93, 1001.4, 1094.08, 1000.15, 958.35, 884.65, 924.95, 958.02, 979.02, 912.25, 953.25, 936.31, 958.97, 1033.17, 1068.14, 1173.22, 1206.18, 1173.18, 1213.67, 1142.58, 1062, 1077.4, 1076.35, 1002.34, 1191.22, 1363.42, 1527.95, 1504.08, 1588.12, 1599.52, 1468.11, 1620.17, 1624.99, 1531.98, 1498.77, 1434.95, 1331.73, 1374.13, 1307.14] },
      velocityScore: { '1D': 0.7, '1W': 4.5, '1M': 2.2, '6M': null }, isNew: false,
      marketCap: '$64B', pe: 93.8, revenueGrowth: 26, eps: 13.93, grossMargin: 55, dividendYield: 0.59,
      etfPresence: { SOXX: 3.31, PSI: false, XSD: 2.24, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.61, proScore: 1.31, coverage: 0.5,
      price: 171.98, weeklyPrices: [189.16, 183.98, 178.10, 177.98, 171.98], weeklyChange: -9.08, dayChange: -3.37, sortRank: 0, periodReturns: { '1M': -19.7, 'YTD': 0.5, '6M': 7.9, '1Y': 11.6 },
      priceHistory: { '1D': [177.98, 172.22, 172.36, 171.98], '1W': [189.16, 183.98, 178.1, 177.98, 171.98], '1M': [214.07, 212.97, 226.11, 221.9, 204.13, 197.41, 204.9, 189.39, 188.72, 184.79, 181.92, 176.25, 186.48, 182.97, 186.56, 191.11, 189.16, 183.98, 178.1, 177.98, 171.98], 'YTD': [171.05, 181.87, 159.42, 154.52, 152.62, 140.09, 143.24, 145.59, 137, 131.15, 129.9, 127.11, 125.73, 132.84, 135.56, 150, 192.57, 213.17, 202.51, 251.02, 215.94, 220.81, 204.13, 184.79, 191.11, 171.98], '6M': [159.42, 154.52, 152.62, 138.93, 142.63, 144.78, 138.13, 138.11, 129.39, 128.35, 127.07, 124.07, 132.84, 135.56, 150, 186.55, 210.31, 195.61, 233.4, 240.84, 205.42, 214.07, 197.41, 181.92, 191.11, 171.98], '1Y': [154.07, 159.88, 159.06, 145.84, 156.59, 155.44, 159.77, 157.28, 158.95, 165.26, 173.55, 166.49, 167.77, 162.97, 169.27, 178.67, 179.72, 176.67, 166.11, 165.14, 175.07, 182.21, 172.34, 174.77, 172.98, 177.78, 159.42, 154.52, 152.62, 138.93, 142.63, 144.78, 141.03, 138.11, 129.39, 128.35, 127.07, 124.07, 132.84, 135.56, 150, 186.55, 210.31, 195.61, 233.4, 240.84, 205.42, 214.07, 197.41, 181.92, 191.11, 171.98] },
      velocityScore: { '1D': 2.3, '1W': -2.2, '1M': -10.3, '6M': null }, isNew: false,
      marketCap: '$181B', pe: 18.5, revenueGrowth: -4, eps: 9.31, grossMargin: 55, dividendYield: 2.07,
      etfPresence: { SOXX: 2.94, PSI: false, XSD: 2.28, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 2.56, proScore: 1.28, coverage: 0.5,
      price: 331.61, weeklyPrices: [412.97, 362.05, 361.78, 350.62, 331.61], weeklyChange: -19.7, dayChange: -5.42, sortRank: 0, periodReturns: { '1M': -8.3, 'YTD': 99.3, '6M': 82.2, '1Y': 260.7 },
      priceHistory: { '1D': [350.62, 334.57, 331.61], '1W': [412.97, 362.05, 361.78, 350.62, 331.61], '1M': [361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42, 432.74, 382.89, 393.16, 417.45, 412.97, 362.05, 361.78, 350.62, 331.61], 'YTD': [166.36, 156.73, 182, 163.25, 152.44, 182.86, 129.58, 124.67, 120, 119.9, 116.04, 112.47, 117.99, 170.6, 191.97, 183.31, 213.91, 224.09, 287.48, 342.85, 317.06, 389.2, 397.02, 483.02, 417.45, 331.61], '6M': [182, 163.25, 152.44, 187.67, 123.69, 128.4, 109.8, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 325.33, 355.76, 341.7, 361.71, 399.92, 430.86, 417.45, 331.61], '1Y': [91.94, 119.48, 128.87, 174.39, 193.64, 172.45, 179.2, 176.61, 230.37, 249.38, 205.27, 194.5, 219.36, 161.46, 154.85, 173.62, 181.94, 157.79, 142.01, 154.22, 152.5, 164.32, 140.24, 169.97, 179.56, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.4, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 325.33, 355.76, 341.7, 361.71, 399.92, 430.86, 417.45, 331.61] },
      velocityScore: { '1D': -0.8, '1W': -9.2, '1M': -26.4, '6M': null }, isNew: false,
      marketCap: '$57B', pe: 225.6, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.53, PSI: false, XSD: 2.6, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.39, proScore: 1.19, coverage: 0.5,
      price: 83.89, weeklyPrices: [88.59, 84.23, 87.11, 86.26, 83.89], weeklyChange: -5.31, dayChange: -2.75, sortRank: 0, periodReturns: { '1M': -12.3, 'YTD': 31.7, '6M': 12.3, '1Y': 12.7 },
      priceHistory: { '1D': [86.26, 84.32, 83.9, 83.89], '1W': [88.59, 84.23, 87.11, 86.26, 83.89], '1M': [95.63, 94.11, 99.77, 102.71, 93.26, 92.48, 94.12, 87.93, 89.06, 91.2, 88.69, 84.64, 87.59, 84.15, 85.49, 88.26, 88.59, 84.23, 87.11, 86.26, 83.89], 'YTD': [63.72, 73.53, 74.7, 74.79, 78.08, 76.86, 79.11, 74.97, 67.81, 62.73, 62.97, 62, 67.22, 74.5, 80.93, 84.26, 102.92, 96.71, 94.02, 94.65, 88.34, 100.32, 93.26, 91.2, 88.26, 83.89], '6M': [74.7, 74.79, 78.08, 74.41, 78.94, 75.93, 71.39, 65, 63.83, 64.34, 60.06, 67.51, 74.5, 80.93, 84.26, 98.48, 97.7, 91.81, 96.85, 96.96, 91.47, 95.63, 92.48, 88.69, 88.26, 83.89], '1Y': [74.43, 70.25, 70.29, 66.17, 65.75, 66.76, 66.65, 63.28, 64.74, 65.78, 65.85, 64.11, 66.92, 65.21, 64.5, 62.54, 60.8, 55.63, 50.8, 52.57, 63.61, 67.9, 63.99, 65.36, 65.03, 75.22, 74.7, 74.79, 78.08, 74.41, 78.94, 75.93, 74.31, 65, 63.83, 64.34, 60.06, 67.51, 74.5, 80.93, 84.26, 98.48, 97.7, 91.81, 96.85, 96.96, 91.47, 95.63, 92.48, 88.69, 88.26, 83.89] },
      velocityScore: { '1D': 0.8, '1W': 2.6, '1M': 2.6, '6M': null }, isNew: false,
      marketCap: '$46B', pe: 381.3, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 2.11,
      etfPresence: { SOXX: 2.37, PSI: false, XSD: 2.4, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.14, proScore: 1.07, coverage: 0.5,
      price: 218.21, weeklyPrices: [257.79, 236.88, 236.18, 226.74, 218.21], weeklyChange: -15.36, dayChange: -3.76, sortRank: 0, periodReturns: { '1M': -8.8, 'YTD': 51.6, '6M': 44.5, '1Y': 115.6 },
      priceHistory: { '1D': [226.74, 220.85, 218.6, 218.21], '1W': [257.79, 236.88, 236.18, 226.74, 218.21], '1M': [239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 265.55, 246.4, 258.69, 265.65, 257.79, 236.88, 236.18, 226.74, 218.21], 'YTD': [143.89, 141.59, 150.97, 128.02, 119.96, 134.72, 127.91, 114.48, 114.74, 111.57, 103.4, 95.24, 102.46, 159.52, 183.32, 165.92, 198.29, 189.36, 182.98, 236.03, 206.89, 259.41, 272.01, 271.95, 265.65, 218.21], '6M': [150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 97.3, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.23, 229, 234.32, 239.18, 268.99, 259.09, 265.65, 218.21], '1Y': [101.19, 98.41, 116.01, 117.34, 121.13, 105.99, 122.73, 124.77, 163.96, 164.44, 149.38, 144.91, 148.87, 131.41, 137.2, 171.52, 173.16, 160.34, 141.88, 164.01, 189.19, 157.98, 134.13, 150.19, 143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.23, 229, 234.32, 239.18, 268.99, 259.09, 265.65, 218.21] },
      velocityScore: { '1D': -1.8, '1W': -10.8, '1M': -17.1, '6M': null }, isNew: false,
      marketCap: '$41B', pe: 86.6, revenueGrowth: 157, eps: 2.52, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 1.94, PSI: false, XSD: 2.34, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 1.96, proScore: 0.98, coverage: 0.5,
      price: 88.6, weeklyPrices: [95.96, 90.37, 93.73, 92.54, 88.60], weeklyChange: -7.67, dayChange: -4.26, sortRank: 0, periodReturns: { '1M': -25.1, 'YTD': 63.6, '6M': 46.9, '1Y': 48.9 },
      priceHistory: { '1D': [92.54, 89.53, 88.76, 88.6], '1W': [95.96, 90.37, 93.73, 92.54, 88.6], '1M': [118.25, 112.92, 121.62, 131.55, 117.06, 115.74, 118.74, 90.65, 88.57, 94.54, 94.63, 91.22, 94.69, 91.1, 93.79, 97.87, 95.96, 90.37, 93.73, 92.54, 88.6], 'YTD': [54.15, 60.89, 60.33, 61.13, 61.53, 67.38, 70.66, 68.16, 60.85, 57.69, 59.26, 58.35, 63.49, 72.05, 86.91, 93.3, 105.77, 115.71, 110.21, 120.62, 117.26, 125.9, 117.06, 94.54, 97.87, 88.6], '6M': [60.33, 61.13, 61.53, 65.1, 71.96, 70.03, 63.42, 59.23, 59.88, 59.89, 55.66, 63.79, 72.05, 86.91, 93.3, 102.67, 104.11, 106.02, 124.89, 128.64, 117, 118.25, 115.74, 94.63, 97.87, 88.6], '1Y': [59.52, 59.61, 58.05, 46.98, 51.89, 49.47, 51.25, 47.79, 48.13, 49.8, 50.94, 48.35, 50.88, 50.36, 51.93, 51.4, 50.08, 49.27, 46.12, 49.64, 57.15, 55.1, 53.33, 55.08, 56.7, 62.16, 60.33, 61.13, 61.53, 65.1, 71.96, 70.03, 66.48, 59.23, 59.88, 59.89, 55.66, 63.79, 72.05, 86.91, 93.3, 102.67, 104.11, 106.02, 124.89, 128.64, 117, 118.25, 115.74, 94.63, 97.87, 88.6] },
      velocityScore: { '1D': 1, '1W': 1, '1M': -26.3, '6M': null }, isNew: false,
      marketCap: '$34B', pe: 65.1, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 1.86, PSI: false, XSD: 2.05, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.53, proScore: 0.76, coverage: 0.5,
      price: 280.37, weeklyPrices: [308.52, 294.24, 301.76, 293.02, 280.37], weeklyChange: -9.12, dayChange: -4.32, sortRank: 0, periodReturns: { '1M': -23.9, 'YTD': 63.7, '6M': 27, '1Y': 103.5 },
      priceHistory: { '1D': [293.02, 283.46, 280.15, 280.37], '1W': [308.52, 294.24, 301.76, 293.02, 280.37], '1M': [368.32, 367.11, 391.41, 396.26, 372.15, 373.08, 390.19, 369.18, 372.59, 380.37, 350.63, 322.26, 327.64, 304.82, 305.23, 317.35, 308.52, 294.24, 301.76, 293.02, 280.37], 'YTD': [171.28, 167.66, 220.68, 218.89, 228.56, 230.54, 246.76, 247.11, 228.98, 215.94, 218.96, 225.44, 233.04, 263.92, 285.71, 265.61, 309.81, 381.55, 375.71, 364.64, 345.4, 384.77, 372.15, 380.37, 317.35, 280.37], '6M': [220.68, 218.89, 228.56, 235.7, 245.59, 248.29, 241.01, 218.73, 224.92, 229.26, 209.49, 236.99, 263.92, 285.71, 265.61, 303.57, 362.76, 358.98, 400.66, 382.35, 358.72, 368.32, 373.08, 350.63, 317.35, 280.37], '1Y': [137.76, 137.19, 140.02, 139.03, 125.99, 121.15, 129.63, 130.17, 131.7, 131.87, 126.66, 126.56, 133.19, 136.83, 135.91, 152.66, 149.68, 170.89, 161.57, 168.06, 183.46, 186.23, 168.31, 175.81, 174.96, 174.87, 220.68, 218.89, 228.56, 235.7, 245.59, 248.29, 258.54, 218.73, 224.92, 229.26, 209.49, 236.99, 263.92, 285.71, 265.61, 303.57, 362.76, 358.98, 400.66, 382.35, 358.72, 368.32, 373.08, 350.63, 317.35, 280.37] },
      velocityScore: { '1D': -1.3, '1W': -2.6, '1M': -17.4, '6M': null }, isNew: false,
      marketCap: '$21B', pe: 119.8, revenueGrowth: 23, eps: 2.34, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.04, PSI: false, XSD: 2.02, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SWKS', name: 'SKYWORKS SOLUTIONS INC', easyScore: 2, avgWeight: 1.22, proScore: 0.61, coverage: 0.5,
      price: 56.94, weeklyPrices: [60.38, 58.24, 56.58, 57.51, 56.94], weeklyChange: -5.7, dayChange: -0.99, sortRank: 0, periodReturns: { '1M': -20.3, 'YTD': -10.2, '6M': -1.4, '1Y': -21.9 },
      priceHistory: { '1D': [57.51, 56.91, 56.79, 56.94], '1W': [60.38, 58.24, 56.58, 57.51, 56.94], '1M': [71.42, 69.38, 72.45, 76.18, 73.44, 71.4, 69.94, 68, 67.71, 67.8, 65.93, 62.56, 61.91, 59.76, 58.49, 59.95, 60.38, 58.24, 56.58, 57.51, 56.94], 'YTD': [63.41, 60.66, 57.77, 59.76, 56.83, 62.31, 62, 59.61, 56.48, 55.2, 54.44, 53.65, 55.97, 57.28, 59.94, 60.98, 64.97, 68.14, 74.35, 77.85, 73.57, 76.26, 73.44, 67.8, 59.95, 56.94], '6M': [57.77, 59.76, 56.83, 61.55, 62.16, 59.9, 58.15, 55.28, 54.54, 54.49, 52.5, 55.06, 57.28, 59.94, 60.98, 72.56, 66.31, 70.35, 78.68, 79.12, 73.56, 71.42, 71.4, 65.93, 59.95, 56.94], '1Y': [72.87, 73.09, 71.33, 67.52, 73.65, 75.12, 76.2, 73.56, 73.6, 74.49, 80.66, 76.34, 76.1, 74.22, 73.97, 78.74, 73.46, 69.46, 62.59, 65.34, 69.37, 68.81, 65, 64.51, 64.4, 60.17, 57.77, 59.76, 56.83, 61.55, 62.16, 59.9, 58.93, 55.28, 54.54, 54.49, 52.5, 55.06, 57.28, 59.94, 60.98, 72.56, 66.31, 70.35, 78.68, 79.12, 73.56, 71.42, 71.4, 65.93, 59.95, 56.94] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$9B', pe: 23.7, revenueGrowth: -1, eps: 2.4, grossMargin: 41, dividendYield: 4.94,
      etfPresence: { SOXX: 0.44, PSI: false, XSD: 2, DRAM: false },
      tonyNote: 'SKYWORKS SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 8, avgWeight: 6.09, proScore: 2.87, coverage: 0.471,
      price: 208.76, weeklyPrices: [210.96, 203.53, 211.80, 212.50, 208.76], weeklyChange: -1.04, dayChange: -1.76, sortRank: 0, periodReturns: { '1M': 0.7, 'YTD': 11.9, '6M': 12.1, '1Y': 21.8 },
      priceHistory: { '1D': [212.5, 209.4, 208.76], '1W': [210.96, 203.53, 211.8, 212.5, 208.76], '1M': [207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 196.93, 204.12, 202.78, 210.96, 203.53, 211.8, 212.5, 208.76], 'YTD': [186.5, 185.04, 186.23, 186.47, 185.61, 188.54, 187.98, 184.89, 183.34, 183.14, 172.7, 167.52, 177.64, 196.51, 199.88, 213.17, 207.83, 225.83, 223.47, 211.14, 205.1, 212.45, 200.04, 200.09, 202.78, 208.76], '6M': [186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 222.82, 208.19, 207.41, 199, 197.58, 202.78, 208.76], '1Y': [171.37, 170.78, 179.27, 179.42, 181.59, 175.4, 181.6, 170.62, 177.33, 170.29, 176.97, 187.24, 189.11, 179.83, 180.28, 207.04, 195.21, 193.8, 186.52, 180.26, 179.59, 183.78, 170.94, 188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 222.82, 208.19, 207.41, 199, 197.58, 202.78, 208.76] },
      velocityScore: { '1D': 6.7, '1W': 11.7, '1M': 26.4, '6M': null }, isNew: false,
      marketCap: '$5.1T', pe: 32, revenueGrowth: 85, eps: 6.52, grossMargin: 74, dividendYield: 0.47,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.09, GTEK: false, ARKK: 1.69, MARS: false, FRWD: 8.89, BCTK: 6.2, FWD: 3.14, CBSE: false, FCUS: false, WGMI: 2.33, CNEQ: 14.14, SGRT: false, SPMO: 8.27, XMMO: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 8, avgWeight: 5.86, proScore: 2.76, coverage: 0.471,
      price: 876.46, weeklyPrices: [979.30, 937.00, 983.12, 904.28, 876.46], weeklyChange: -10.5, dayChange: -3.08, sortRank: 0, periodReturns: { '1M': -14.1, 'YTD': 207.1, '6M': 141.6, '1Y': 652.8 },
      priceHistory: { '1D': [904.28, 878.35, 876.46], '1W': [979.3, 937, 983.12, 904.28, 876.46], '1M': [1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 948.8, 991.64, 979.3, 937, 983.12, 904.28, 876.46], 'YTD': [285.41, 327.02, 362.75, 389.09, 437.8, 373.25, 420.95, 415.56, 397.05, 405.35, 422.9, 357.22, 377.76, 465.66, 449.38, 504.29, 666.59, 803.63, 731.99, 971, 864.01, 1087.99, 1051.77, 1154.29, 991.64, 876.46], '6M': [362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1064.1, 935.89, 1020.76, 1048.51, 1032.28, 991.64, 876.46], '1Y': [116.43, 109.83, 114.74, 108.78, 124.27, 117.21, 117.75, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 198.47, 226.63, 237.5, 244.9, 225.92, 230.26, 234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1064.1, 935.89, 1020.76, 1048.51, 1032.28, 991.64, 876.46] },
      velocityScore: { '1D': -0.7, '1W': 0.7, '1M': 21.1, '6M': null }, isNew: false,
      marketCap: '$990B', pe: 19.8, revenueGrowth: 346, eps: 44.22, grossMargin: 73, dividendYield: 0.06,
      etfPresence: { PTF: 4.77, WCLD: false, IGV: false, FDTX: 9.33, GTEK: false, ARKK: false, MARS: false, FRWD: 4.42, BCTK: 4.41, FWD: false, CBSE: false, FCUS: 4.32, WGMI: false, CNEQ: 2.32, SGRT: 6.76, SPMO: 10.58, XMMO: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 8, avgWeight: 3.73, proScore: 1.76, coverage: 0.471,
      price: 512.78, weeklyPrices: [557.89, 534.39, 548.13, 529.14, 512.78], weeklyChange: -8.09, dayChange: -3.09, sortRank: 0, periodReturns: { '1M': 1.1, 'YTD': 139.4, '6M': 121.2, '1Y': 220.3 },
      priceHistory: { '1D': [529.14, 516.07, 512.78], '1W': [557.89, 534.39, 548.13, 529.14, 512.78], '1M': [507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 517.41, 546.72, 557.89, 534.39, 548.13, 529.14, 512.78], 'YTD': [214.16, 204.68, 231.83, 251.31, 246.27, 213.57, 200.12, 203.68, 199.45, 197.74, 201.33, 201.99, 220.18, 255.07, 284.49, 323.21, 421.39, 445.5, 447.58, 516.1, 466.38, 547.26, 519.85, 580.91, 546.72, 512.78], '6M': [231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 521.54, 475.51, 507.29, 519.74, 540.88, 546.72, 512.78], '1Y': [160.08, 158.65, 179.51, 163.12, 184.42, 165.2, 167.13, 162.13, 159.54, 159.16, 160.88, 164.01, 235.56, 238.6, 230.23, 264.33, 256.33, 258.89, 223.55, 214.24, 217.6, 221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 521.54, 475.51, 507.29, 519.74, 540.88, 546.72, 512.78] },
      velocityScore: { '1D': 8, '1W': 13.5, '1M': 10, '6M': null }, isNew: false,
      marketCap: '$836B', pe: 169.8, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: 3.11, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.11, MARS: false, FRWD: 7.71, BCTK: 3.5, FWD: 2.39, CBSE: false, FCUS: false, WGMI: false, CNEQ: 1.1, SGRT: 3.55, SPMO: 4.38, XMMO: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 7, avgWeight: 4.37, proScore: 1.8, coverage: 0.412,
      price: 410.69, weeklyPrices: [434.11, 421.58, 420.39, 419.48, 410.69], weeklyChange: -5.39, dayChange: -2.14, sortRank: 0, periodReturns: { '1M': -3.6, 'YTD': 35.1, '6M': 19.9, '1Y': 72.9 },
      priceHistory: { '1D': [419.67, 412.18, 410.69], '1W': [434.11, 421.58, 420.39, 419.48, 410.69], '1M': [425.83, 432.15, 462.12, 467.67, 436.39, 440.83, 434.99, 432.35, 455.1, 477.57, 444.23, 434.16, 451.79, 432.57, 436.98, 436.96, 434.11, 421.58, 420.39, 419.48, 410.69], 'YTD': [303.89, 318.01, 342.4, 332.71, 341.36, 361.91, 362.26, 376.81, 353.86, 336.71, 329.24, 326.74, 341.76, 379.89, 368.08, 392.34, 419.5, 399.8, 401.62, 418.45, 415.17, 441.4, 436.39, 477.57, 436.96, 410.69], '6M': [342.4, 332.71, 341.36, 355.41, 364.2, 385.75, 353.13, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 392.61, 422.73, 446.69, 427.92, 425.83, 440.83, 444.23, 436.96, 410.69], '1Y': [237.56, 240.33, 242.91, 231.37, 241.44, 228.6, 239.29, 231.39, 260.44, 262.79, 280.71, 288.47, 304.52, 304.71, 288.88, 305.09, 293.64, 290.62, 282.37, 289.96, 295.45, 310.14, 276.96, 298.8, 319.61, 323.63, 342.4, 332.71, 341.36, 355.41, 364.2, 385.75, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 392.61, 422.73, 446.69, 427.92, 425.83, 440.83, 444.23, 436.96, 410.69] },
      velocityScore: { '1D': 0, '1W': -2.7, '1M': -4.3, '6M': null }, isNew: false,
      marketCap: '$2.1T', pe: 35.7, revenueGrowth: 35, eps: 11.49, grossMargin: 62, dividendYield: 0.9,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6.39, GTEK: false, ARKK: 0.9, MARS: false, FRWD: 5.92, BCTK: 8.52, FWD: false, CBSE: 2.61, FCUS: false, WGMI: 0.72, CNEQ: 5.55, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 7, avgWeight: 4, proScore: 1.65, coverage: 0.412,
      price: 379.9, weeklyPrices: [399.97, 384.05, 389.11, 394.28, 379.90], weeklyChange: -5.02, dayChange: -3.65, sortRank: 0, periodReturns: { '1M': 0.8, 'YTD': 9.8, '6M': 8, '1Y': 35.3 },
      priceHistory: { '1D': [394.28, 381.7, 379.9], '1W': [399.97, 384.05, 389.11, 394.28, 379.9], '1M': [376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 370.78, 388.69, 401.11, 399.97, 384.05, 389.11, 394.28, 379.9], 'YTD': [346.1, 332.48, 351.71, 324.85, 331.11, 340.44, 333.51, 321.7, 332.77, 335.97, 310.51, 300.68, 314.43, 380.78, 402.17, 399.83, 425.44, 416.79, 417.76, 446.77, 385.73, 393.94, 380.15, 377.75, 401.11, 379.9], '6M': [351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 481.57, 392.16, 376.71, 382.07, 369.34, 401.11, 379.9], '1Y': [280.81, 283.69, 302.62, 301.67, 309.09, 291.17, 300.25, 302.39, 369.57, 346.17, 339.31, 333.39, 345.5, 351.33, 340.3, 385.98, 358.98, 355.22, 354.42, 397.57, 380.61, 412.97, 326.02, 350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 481.57, 392.16, 376.71, 382.07, 369.34, 401.11, 379.9] },
      velocityScore: { '1D': 1.9, '1W': 9.3, '1M': 31, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63.4, revenueGrowth: 48, eps: 5.99, grossMargin: 76, dividendYield: 0.66,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.62, GTEK: false, ARKK: 1.13, MARS: false, FRWD: 5.03, BCTK: 7.15, FWD: 2.49, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.95, SGRT: false, SPMO: 6.64, XMMO: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'SPCX', name: 'SPACE EXPLORATION TECHN-CL A', easyScore: 6, avgWeight: 6.67, proScore: 2.35, coverage: 0.353,
      price: 137.1, weeklyPrices: [145.30, 139.14, 136.08, 135.27, 137.10], weeklyChange: -5.64, dayChange: 1.36, sortRank: 0, periodReturns: { '1M': -35.1, 'YTD': -14.8, '6M': -14.8, '1Y': -14.8 },
      priceHistory: { '1D': [135.27, 136.83, 135.86, 137.1], '1W': [145.3, 139.14, 136.08, 135.27, 137.1], '1M': [211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 148.3, 152.16, 145.3, 139.14, 136.08, 135.27, 137.1], 'YTD': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 148.3, 152.16, 145.3, 139.14, 136.08, 135.27, 137.1], '6M': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 148.3, 152.16, 145.3, 139.14, 136.08, 135.27, 137.1], '1Y': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 148.3, 152.16, 145.3, 139.14, 136.08, 135.27, 137.1] },
      velocityScore: { '1D': 0.4, '1W': -5.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: null, revenueGrowth: 15, eps: -0.68, grossMargin: 49, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.36, MARS: 22.02, FRWD: 2.2, BCTK: 7.69, FWD: 1.36, CBSE: false, FCUS: false, WGMI: false, CNEQ: 2.37, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'SPACE EXPLORATION TECHN-CL A appears in 6 of 17 Broad Tech ETFs (35% coverage) with average weight 6.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 6, avgWeight: 5.46, proScore: 1.93, coverage: 0.353,
      price: 490.08, weeklyPrices: [582.59, 555.55, 563.32, 513.84, 490.08], weeklyChange: -15.88, dayChange: -4.62, sortRank: 0, periodReturns: { '1M': -28, 'YTD': 184.5, '6M': 121.2, '1Y': 636.6 },
      priceHistory: { '1D': [513.84, 489.45, 490.55, 490.08], '1W': [582.59, 555.55, 563.32, 513.84, 490.08], '1M': [681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 532.1, 550.3, 578.05, 582.59, 555.55, 563.32, 513.84, 490.08], 'YTD': [172.27, 187.68, 221.51, 240.85, 270.23, 262.56, 296.56, 282.25, 259.03, 261.18, 293.1, 275.34, 304.15, 366.22, 383.81, 390.99, 483.15, 494.09, 459.62, 531.21, 511.72, 653.53, 670.75, 638.72, 578.05, 490.08], '6M': [221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 563.1, 517.72, 681.08, 643.83, 598.37, 578.05, 490.08], '1Y': [66.53, 69.32, 71.43, 73.78, 76.07, 75.64, 80.67, 86, 95.02, 100.94, 109.69, 130.59, 121.18, 120.44, 120.47, 141.38, 160.1, 166.11, 153.97, 157.74, 155.59, 181.95, 166.26, 179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 563.1, 517.72, 681.08, 643.83, 598.37, 578.05, 490.08] },
      velocityScore: { '1D': -2, '1W': -4.9, '1M': 36.9, '6M': null }, isNew: false,
      marketCap: '$169B', pe: 29.3, revenueGrowth: 46, eps: 16.7, grossMargin: 45, dividendYield: 0.12,
      etfPresence: { PTF: 4.14, WCLD: false, IGV: false, FDTX: 4.49, GTEK: false, ARKK: false, MARS: false, FRWD: 4.59, BCTK: false, FWD: false, CBSE: false, FCUS: 4.18, WGMI: false, CNEQ: 4.24, SGRT: 11.12, SPMO: false, XMMO: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'LRCX', name: 'Lam Research Corp', easyScore: 5, avgWeight: 4.38, proScore: 1.29, coverage: 0.294,
      price: 325.79, weeklyPrices: [350.33, 329.92, 346.10, 335.43, 325.79], weeklyChange: -7, dayChange: -2.87, sortRank: 0, periodReturns: { '1M': -11.8, 'YTD': 90.3, '6M': 46.1, '1Y': 224.6 },
      priceHistory: { '1D': [335.43, 325.37, 326.33, 325.79], '1W': [350.33, 329.92, 346.1, 335.43, 325.79], '1M': [369.34, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82, 379.09, 410.91, 433.33, 391.26, 351.41, 350.2, 326.13, 333.15, 353.17, 350.33, 329.92, 346.1, 335.43, 325.79], 'YTD': [171.18, 200.96, 222.96, 222.87, 237.5, 226.61, 240.09, 239.07, 214.68, 209.49, 228.36, 211.41, 220.65, 272.41, 258.37, 251.23, 297.17, 295.44, 292.09, 318.18, 303.28, 388.92, 371.33, 433.33, 353.17, 325.79], '6M': [222.96, 222.87, 237.5, 229.28, 235.58, 244.25, 217.27, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 273.38, 318.93, 334.41, 327.16, 369.34, 374.8, 391.26, 353.17, 325.79], '1Y': [100.37, 97.1, 99.09, 95.94, 106.74, 99.15, 103.67, 97.74, 107.36, 121.9, 128.32, 142.79, 142.54, 144.78, 141.25, 160.67, 165.05, 161.42, 148.8, 155.14, 159.75, 168.26, 154.98, 177.33, 185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.58, 244.25, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 273.38, 318.93, 334.41, 327.16, 369.34, 374.8, 391.26, 353.17, 325.79] },
      velocityScore: { '1D': 17.3, '1W': 2.4, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$407B', pe: 61.5, revenueGrowth: 24, eps: 5.3, grossMargin: 50, dividendYield: 0.31,
      etfPresence: { PTF: 3.1, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.55, BCTK: 7.49, FWD: 1.93, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 3.81, XMMO: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 5, avgWeight: 4.29, proScore: 1.26, coverage: 0.294,
      price: 781.54, weeklyPrices: [910.34, 860.66, 878.31, 828.30, 781.54], weeklyChange: -14.15, dayChange: -5.64, sortRank: 0, periodReturns: { '1M': -24.2, 'YTD': 183.8, '6M': 139.6, '1Y': 431.2 },
      priceHistory: { '1D': [828.3, 785.36, 785.16, 781.54], '1W': [910.34, 860.66, 878.31, 828.3, 781.54], '1M': [1031.34, 1066.07, 1070.23, 1094.04, 1038.59, 993.25, 1025.36, 899.9, 968.53, 965, 915.19, 820.16, 868.26, 827.64, 860.02, 890.09, 910.34, 860.66, 878.31, 828.3, 781.54], 'YTD': [275.39, 284.47, 326.23, 358.29, 432.95, 396.23, 424.14, 409.67, 367.34, 373.98, 411.23, 380.07, 453.3, 533.44, 559.9, 579.03, 786.42, 817.35, 751.07, 879.8, 847.47, 1018.8, 1038.59, 965, 890.09, 781.54], '6M': [326.23, 358.29, 432.95, 425, 415.94, 396.02, 357.62, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 579.03, 771.01, 808.8, 733.35, 870.66, 926.61, 846.01, 1031.34, 993.25, 915.19, 890.09, 781.54], '1Y': [147.12, 152.76, 147.42, 147.27, 156.92, 158.4, 167.24, 176.32, 193.04, 213.36, 223.7, 256.84, 224.35, 219.38, 215.05, 265.62, 275.77, 283.26, 259.14, 272.28, 258.67, 298.92, 277.65, 285.27, 287.54, 304.01, 326.23, 358.29, 432.95, 425, 415.94, 396.02, 379.52, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 579.03, 771.01, 808.8, 733.35, 870.66, 926.61, 846.01, 1031.34, 993.25, 915.19, 890.09, 781.54] },
      velocityScore: { '1D': 0, '1W': 11.5, '1M': -23.6, '6M': null }, isNew: false,
      marketCap: '$175B', pe: 74.3, revenueGrowth: 44, eps: 10.52, grossMargin: 42, dividendYield: 0.36,
      etfPresence: { PTF: 3.77, WCLD: false, IGV: false, FDTX: 4.14, GTEK: false, ARKK: false, MARS: false, FRWD: 7.49, BCTK: false, FWD: false, CBSE: false, FCUS: 4.13, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.9, XMMO: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 5, avgWeight: 4.25, proScore: 1.25, coverage: 0.294,
      price: 369.11, weeklyPrices: [355.03, 350.67, 357.33, 370.21, 369.11], weeklyChange: 3.97, dayChange: -0.3, sortRank: 0, periodReturns: { '1M': -0.5, 'YTD': 17.6, '6M': 11.7, '1Y': 100.9 },
      priceHistory: { '1D': [370.21, 369.67, 369.07, 369.11], '1W': [355.03, 350.67, 357.33, 370.21, 369.11], '1M': [371.1, 362.1, 367.46, 348.78, 346.08, 345.04, 342.19, 334.69, 351.28, 353.33, 357.89, 356.18, 364.9, 363.62, 358.71, 356.24, 355.03, 350.67, 357.33, 370.21, 369.11], 'YTD': [313.8, 326.01, 330.34, 333.59, 344.9, 318.63, 303.94, 307.15, 300.91, 303.21, 298.79, 273.76, 297.66, 330.58, 330.47, 347.5, 395.14, 399.04, 384.9, 376.43, 365.76, 367.11, 346.08, 353.33, 356.24, 369.11], '6M': [330.34, 333.59, 344.9, 324.4, 302.82, 310.92, 303.56, 306.01, 304.42, 299.02, 273.14, 303.93, 330.58, 330.47, 347.5, 384.27, 383.82, 384.9, 384.83, 358.39, 362.29, 371.1, 345.04, 357.89, 356.24, 369.11], '1Y': [183.77, 191.51, 197.44, 196.92, 203.03, 200.19, 208.21, 231.1, 239.56, 249.85, 247.83, 245.54, 245.46, 251.71, 252.53, 275.17, 284.75, 287.43, 292.99, 320.28, 320.62, 321, 298.06, 315.67, 315.32, 329.14, 330.34, 333.59, 344.9, 324.4, 302.82, 310.92, 306.36, 306.01, 304.42, 299.02, 273.14, 303.93, 330.58, 330.47, 347.5, 384.27, 383.82, 384.9, 384.83, 358.39, 362.29, 371.1, 345.04, 357.89, 356.24, 369.11] },
      velocityScore: { '1D': 0.8, '1W': 0, '1M': 45.3, '6M': null }, isNew: false,
      marketCap: '$4.5T', pe: 28.2, revenueGrowth: 22, eps: 13.11, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.21, GTEK: false, ARKK: 1.98, MARS: false, FRWD: false, BCTK: 6.41, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 6.15, SGRT: false, SPMO: 3.52, XMMO: false },
      tonyNote: 'Alphabet Inc Class C appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 4.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, avgWeight: 5.14, proScore: 1.21, coverage: 0.235,
      price: 396.17, weeklyPrices: [385.10, 390.99, 384.93, 395.63, 396.17], weeklyChange: 2.87, dayChange: 0.14, sortRank: 0, periodReturns: { '1M': 0.6, 'YTD': -18.1, '6M': -13.8, '1Y': -21.6 },
      priceHistory: { '1D': [395.63, 395.99, 396, 396.17], '1W': [385.1, 390.99, 384.93, 395.63, 396.17], '1M': [393.83, 378.91, 379.4, 367.34, 373.94, 365.46, 352.83, 372.97, 368.57, 373.02, 384.28, 390.49, 386.74, 388.84, 383.34, 384.36, 385.1, 390.99, 384.93, 395.63, 396.17], 'YTD': [483.62, 478.11, 459.86, 470.28, 423.37, 413.27, 399.6, 401.72, 410.68, 401.86, 381.87, 356.77, 372.88, 393.11, 424.16, 429.25, 413.96, 405.21, 421.06, 450.24, 416.67, 399.76, 373.94, 373.02, 384.36, 396.17], '6M': [459.86, 470.28, 423.37, 413.6, 396.86, 389, 403.93, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 417.42, 412.67, 441.31, 403.41, 393.83, 365.46, 384.28, 384.36, 396.17], '1Y': [505.62, 505.87, 513.24, 524.94, 520.58, 505.72, 506.74, 505.35, 500.37, 510.02, 510.15, 519.71, 524.85, 513.43, 520.54, 541.55, 507.16, 511.14, 487.12, 485.5, 477.73, 478.56, 476.12, 488.02, 472.94, 479.28, 459.86, 470.28, 423.37, 413.6, 396.86, 389, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 417.42, 412.67, 441.31, 403.41, 393.83, 365.46, 384.28, 384.36, 396.17] },
      velocityScore: { '1D': 1.7, '1W': 1.7, '1M': 7.1, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 23.6, revenueGrowth: 18, eps: 16.77, grossMargin: 68, dividendYield: 0.92,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.26, FDTX: 2.93, GTEK: false, ARKK: false, MARS: false, FRWD: 2.99, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 6.37, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 4, avgWeight: 4.67, proScore: 1.1, coverage: 0.235,
      price: 353.32, weeklyPrices: [325.91, 330.30, 352.89, 354.02, 353.32], weeklyChange: 8.41, dayChange: -0.2, sortRank: 0, periodReturns: { '1M': 26.2, 'YTD': 91.8, '6M': 88.3, '1Y': 83.5 },
      priceHistory: { '1D': [354.02, 354.14, 353.54, 353.32], '1W': [325.91, 330.3, 352.89, 354.02, 353.32], '1M': [279.9, 282.13, 287.78, 286.4, 290.92, 285.26, 293.09, 304.2, 332, 341.02, 352.04, 348.06, 357.53, 337.04, 320.59, 338.31, 325.91, 330.3, 352.89, 354.02, 353.32], 'YTD': [184.2, 190.8, 187.66, 184.22, 175.42, 165.51, 152.35, 149.4, 163.16, 168.12, 162.95, 147.02, 161.95, 161.59, 174.96, 180.99, 183.68, 227.79, 246.66, 281.69, 272.05, 284.54, 290.92, 341.02, 338.31, 353.32], '6M': [187.66, 184.22, 175.42, 166, 163.5, 141.67, 156.09, 165.1, 167.45, 164.05, 154.35, 169.87, 161.59, 174.96, 180.99, 183.98, 215.6, 240.13, 248.47, 297.18, 260.52, 279.9, 285.26, 352.04, 338.31, 353.32], '1Y': [192.59, 199.22, 183.03, 172.89, 176.86, 184.43, 187.61, 191.53, 197.33, 203.12, 200.7, 206.8, 217.79, 206.7, 212.42, 217.16, 213.18, 210.04, 199.9, 185.35, 193.63, 192.96, 183.44, 187.22, 179.37, 189.02, 187.66, 184.22, 175.42, 166, 163.5, 141.67, 150.15, 165.1, 167.45, 164.05, 154.35, 169.87, 161.59, 174.96, 180.99, 183.98, 215.6, 240.13, 248.47, 297.18, 260.52, 279.9, 285.26, 352.04, 338.31, 353.32] },
      velocityScore: { '1D': 0.9, '1W': 3.8, '1M': -9.1, '6M': null }, isNew: false,
      marketCap: '$288B', pe: 312.7, revenueGrowth: 31, eps: 1.13, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.73, IGV: 10.39, FDTX: 4.15, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.39, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 4, avgWeight: 4.46, proScore: 1.05, coverage: 0.235,
      price: 387.38, weeklyPrices: [407.76, 394.76, 396.18, 394.46, 387.38], weeklyChange: -5, dayChange: -1.79, sortRank: 0, periodReturns: { '1M': -4.3, 'YTD': -13.9, '6M': -11.5, '1Y': 20.4 },
      priceHistory: { '1D': [394.46, 388.8, 388.33, 387.38], '1W': [407.76, 394.76, 396.18, 394.46, 387.38], '1M': [404.66, 396.38, 400.49, 405.05, 381.61, 375.53, 375.12, 379.71, 411.84, 420.6, 425.3, 393.45, 419.77, 402.9, 394.06, 406.55, 407.76, 394.76, 396.18, 394.46, 387.38], 'YTD': [449.72, 435.8, 437.5, 435.2, 421.81, 425.21, 411.32, 408.58, 405.55, 395.01, 367.96, 361.83, 352.82, 364.2, 386.42, 376.02, 398.73, 445.27, 417.26, 435.79, 391, 411.15, 381.61, 420.6, 406.55, 387.38], '6M': [437.5, 435.2, 421.81, 417.32, 410.63, 409.38, 392.43, 398.68, 395.56, 380.85, 355.28, 346.65, 364.2, 386.42, 376.02, 389.37, 433.45, 404.11, 440.36, 423.74, 396.68, 404.66, 375.53, 425.3, 406.55, 387.38], '1Y': [321.67, 332.56, 319.04, 319.91, 339.38, 323.9, 349.6, 334.09, 347.79, 425.86, 442.79, 459.46, 438.69, 435.15, 438.97, 461.51, 462.07, 430.6, 403.99, 426.58, 446.74, 451.45, 467.26, 485.4, 438.07, 445.01, 437.5, 435.2, 421.81, 417.32, 410.63, 409.38, 403.32, 398.68, 395.56, 380.85, 355.28, 346.65, 364.2, 386.42, 376.02, 389.37, 433.45, 404.11, 440.36, 423.74, 396.68, 404.66, 375.53, 425.3, 406.55, 387.38] },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 352.2, revenueGrowth: 16, eps: 1.1, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 10.11, MARS: false, FRWD: false, BCTK: 3.3, FWD: 1.35, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.07, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 4, avgWeight: 3.67, proScore: 0.86, coverage: 0.235,
      price: 253.55, weeklyPrices: [245.34, 247.31, 247.49, 254.96, 253.55], weeklyChange: 3.35, dayChange: -0.55, sortRank: 0, periodReturns: { '1M': 3.1, 'YTD': 9.8, '6M': 6, '1Y': 13.6 },
      priceHistory: { '1D': [254.96, 253.68, 253.59, 253.55], '1W': [245.34, 247.31, 247.49, 254.96, 253.55], '1M': [246, 237.5, 244.39, 232.79, 234.11, 234.27, 227.01, 232.69, 240.14, 238.34, 241.7, 242.67, 244.16, 245.98, 243.62, 247.04, 245.34, 247.31, 247.49, 254.96, 253.55], 'YTD': [230.82, 246.29, 239.12, 238.42, 242.96, 206.96, 204.79, 207.92, 218.94, 209.53, 205.37, 199.34, 212.79, 249.02, 249.91, 259.7, 274.99, 270.13, 265.01, 270.64, 246.03, 246.02, 234.11, 238.34, 247.04, 253.55], '6M': [239.12, 238.42, 242.96, 208.72, 201.15, 208.56, 208.73, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 259.34, 271.85, 256.52, 244.19, 246, 234.27, 241.7, 247.04, 253.55], '1Y': [223.19, 228.29, 230.19, 222.31, 224.56, 223.81, 229.12, 225.99, 230.33, 231.62, 220.21, 220.63, 225.22, 215.57, 217.95, 230.3, 250.2, 244.2, 222.69, 229.16, 232.38, 231.78, 221.27, 232.38, 226.5, 247.38, 239.12, 238.42, 242.96, 208.72, 201.15, 208.56, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 259.34, 271.85, 256.52, 244.19, 246, 234.27, 241.7, 247.04, 253.55] },
      velocityScore: { '1D': -9.5, '1W': -21.8, '1M': -26.5, '6M': null }, isNew: false,
      marketCap: '$2.7T', pe: 30.3, revenueGrowth: 17, eps: 8.36, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.29, GTEK: false, ARKK: 2.54, MARS: false, FRWD: false, BCTK: 4.33, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.5, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 4, avgWeight: 3.66, proScore: 0.86, coverage: 0.235,
      price: 130.69, weeklyPrices: [126.79, 130.04, 133.72, 133.76, 130.69], weeklyChange: 3.08, dayChange: -2.29, sortRank: 0, periodReturns: { '1M': -1.9, 'YTD': -26.5, '6M': -23.6, '1Y': -13.4 },
      priceHistory: { '1D': [133.76, 130.5, 130.59, 130.69], '1W': [126.79, 130.04, 133.72, 133.76, 130.69], '1M': [133.25, 130.63, 128.47, 119.5, 116.7, 113.5, 107.27, 112.93, 115.7, 116.67, 125.73, 129.3, 132.54, 134.37, 132.22, 129.04, 126.79, 130.04, 133.72, 133.76, 130.69], 'YTD': [177.75, 176.86, 170.96, 167.47, 147.76, 139.51, 135.38, 135.94, 152.67, 153.5, 150.68, 143.06, 147.93, 135.7, 145.97, 141.18, 133.79, 130.05, 137.15, 156.54, 135.53, 134.71, 116.7, 116.67, 129.04, 130.69], '6M': [170.96, 167.47, 147.76, 142.91, 133.02, 128.84, 147.22, 156.43, 152.72, 160.84, 137.55, 150.07, 135.7, 145.97, 141.18, 135.91, 136, 135.26, 132.51, 152.17, 132.07, 133.25, 113.5, 125.73, 129.04, 130.69], '1Y': [150.91, 154.63, 158.61, 179.54, 184.37, 156.01, 156.72, 154.9, 166.74, 168.33, 179.56, 184.95, 183.56, 179.62, 175.49, 198.81, 187.9, 184.17, 165.42, 165.77, 176.08, 187.91, 177.29, 194.17, 167.86, 177.49, 170.96, 167.47, 147.76, 142.91, 133.02, 128.84, 145.17, 156.43, 152.72, 160.84, 137.55, 150.07, 135.7, 145.97, 141.18, 135.91, 136, 135.26, 132.51, 152.17, 132.07, 133.25, 113.5, 125.73, 129.04, 130.69] },
      velocityScore: { '1D': 0, '1W': -1.1, '1M': -11.3, '6M': null }, isNew: false,
      marketCap: '$313B', pe: 145.2, revenueGrowth: 85, eps: 0.9, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.52, FDTX: 2, GTEK: false, ARKK: 3.03, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.1, XMMO: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 4, avgWeight: 3.35, proScore: 0.79, coverage: 0.235,
      price: 1532.48, weeklyPrices: [1915.92, 1673.97, 1757.82, 1615.00, 1532.48], weeklyChange: -20.01, dayChange: -5.11, sortRank: 0, periodReturns: { '1M': -23.1, 'YTD': 545.6, '6M': 270.5, '1Y': 3605.2 },
      priceHistory: { '1D': [1615, 1536.74, 1534.3, 1532.48], '1W': [1915.92, 1673.97, 1757.82, 1615, 1532.48], '1M': [1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745, 1744.43, 1617.7, 1727.18, 1858.27, 1915.92, 1673.97, 1757.82, 1615, 1532.48], 'YTD': [237.38, 334.54, 413.62, 470.8, 665.24, 541.64, 600.4, 651.9, 565.59, 618.82, 709.71, 615.83, 724.63, 944.46, 903.49, 1002.35, 1409.98, 1447.23, 1392.56, 1694.98, 1559.32, 2107.86, 1963.6, 2273.73, 1858.27, 1532.48], '6M': [413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 565.41, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1716.36, 1646.54, 1991.55, 1914.46, 2032.22, 1858.27, 1532.48], '1Y': [41.36, 43, 43.39, 42.1, 47.01, 44.4, 48.44, 53.01, 73.92, 93.97, 99.83, 121.12, 131.88, 144.3, 146.95, 204.36, 216.5, 283.1, 245.96, 215.04, 194.38, 232.86, 206.83, 250.08, 275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1716.36, 1646.54, 1991.55, 1914.46, 2032.22, 1858.27, 1532.48] },
      velocityScore: { '1D': -1.2, '1W': 5.3, '1M': -32.5, '6M': null }, isNew: false,
      marketCap: '$227B', pe: 52.4, revenueGrowth: 251, eps: 29.23, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 5, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.72, CBSE: false, FCUS: 3.97, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.72, XMMO: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 3.04, proScore: 0.72, coverage: 0.235,
      price: 125.93, weeklyPrices: [122.54, 124.74, 125.68, 123.55, 125.93], weeklyChange: 2.77, dayChange: 1.93, sortRank: 0, periodReturns: { '1M': 11.2, 'YTD': -21.8, '6M': -19.2, '1Y': 4.9 },
      priceHistory: { '1D': [123.55, 124.53, 125.6, 125.93], '1W': [122.54, 124.74, 125.68, 123.55, 125.93], '1M': [113.23, 108.09, 108.85, 107.98, 107.68, 114.17, 111.62, 116.86, 114.21, 114.18, 121.63, 119.46, 120.14, 121.88, 119.22, 123.17, 122.54, 124.74, 125.68, 123.55, 125.93], 'YTD': [160.97, 168.28, 155.81, 136.31, 132.2, 127.24, 121.64, 125.94, 134.79, 126.17, 116.78, 111.85, 118.8, 117.64, 131.13, 122.05, 105.44, 95.4, 105.01, 118.71, 109.54, 112.49, 107.68, 114.18, 123.17, 125.93], '6M': [155.81, 136.31, 132.2, 118.4, 113.54, 116.93, 121.87, 133.5, 126.58, 121.1, 111.77, 117.06, 117.64, 131.13, 122.05, 107.63, 99.84, 101.01, 106.6, 117.01, 110.42, 113.23, 114.17, 121.63, 123.17, 125.93], '1Y': [120, 122.21, 123.01, 154.9, 150.09, 137.29, 139.89, 140.22, 142.2, 147.87, 148.83, 149.57, 166.43, 156.21, 162.01, 179.01, 162.92, 156.59, 146, 159.34, 160, 168.42, 161.73, 169.45, 157.2, 164.48, 155.81, 136.31, 132.2, 118.4, 113.54, 116.93, 119.38, 133.5, 126.58, 121.1, 111.77, 117.06, 117.64, 131.13, 122.05, 107.63, 99.84, 101.01, 106.6, 117.01, 110.42, 113.23, 114.17, 121.63, 123.17, 125.93] },
      velocityScore: { '1D': 0, '1W': 2.9, '1M': -19.1, '6M': null }, isNew: false,
      marketCap: '$163B', pe: 122.3, revenueGrowth: 34, eps: 1.03, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.59, GTEK: false, ARKK: 4.59, MARS: false, FRWD: 2.14, BCTK: 2.86, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DDOG', name: 'DDOG', easyScore: 4, avgWeight: 3.01, proScore: 0.71, coverage: 0.235,
      price: 259.76, weeklyPrices: [257.54, 260.24, 270.73, 264.46, 259.76], weeklyChange: 0.86, dayChange: -1.78, sortRank: 0, periodReturns: { '1M': 12.4, 'YTD': 91, '6M': 118.2, '1Y': 86.4 },
      priceHistory: { '1D': [264.46, 261.08, 260.42, 259.76], '1W': [257.54, 260.24, 270.73, 264.46, 259.76], '1M': [231.11, 226.63, 223, 221.37, 220.57, 222.65, 220.94, 239.77, 248.57, 260.36, 264.48, 260.36, 255.37, 256.81, 261.09, 269, 257.54, 260.24, 270.73, 264.46, 259.76], 'YTD': [135.99, 130.68, 119.02, 136.64, 129.05, 129.67, 121.78, 116.46, 122.36, 127.16, 125.08, 114.48, 116.5, 110.57, 129.29, 131.55, 143.71, 205.31, 212.24, 247.35, 234.11, 233.09, 220.57, 260.36, 269, 259.76], '6M': [119.02, 136.64, 129.05, 114.01, 122.56, 104.43, 111.77, 128.56, 126.57, 129.23, 115.81, 116.54, 110.57, 129.29, 131.55, 145.73, 199.94, 215.15, 221.81, 269.13, 227.34, 231.11, 222.65, 264.48, 269, 259.76], '1Y': [139.36, 144, 148.88, 136.96, 128.71, 128.46, 131.73, 132.6, 139.13, 134.23, 136.57, 152.7, 164.12, 160.02, 154.21, 156, 154.98, 190.89, 176.31, 158.4, 155.83, 151.2, 136.71, 138.04, 133.77, 125.49, 119.02, 136.64, 129.05, 114.01, 122.56, 104.43, 111.11, 128.56, 126.57, 129.23, 115.81, 116.54, 110.57, 129.29, 131.55, 145.73, 199.94, 215.15, 221.81, 269.13, 227.34, 231.11, 222.65, 264.48, 269, 259.76] },
      velocityScore: { '1D': -1.4, '1W': -1.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$92B', pe: 702.1, revenueGrowth: 32, eps: 0.37, grossMargin: 80, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.77, IGV: 3.19, FDTX: 2.39, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: 3.71, SPMO: false, XMMO: false },
      tonyNote: 'DDOG appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRWD', name: 'CROWDSTRIKE HOLDINGS INC CLASS A', easyScore: 4, avgWeight: 2.87, proScore: 0.67, coverage: 0.235,
      price: 202.69, weeklyPrices: [187.18, 187.91, 210.73, 206.77, 202.69], weeklyChange: 8.28, dayChange: -1.98, sortRank: 0, periodReturns: { '1M': 19.3, 'YTD': 73, '6M': 78.6, '1Y': 72.3 },
      priceHistory: { '1D': [206.77, 202.37, 202, 202.69], '1W': [187.18, 187.91, 210.73, 206.77, 202.69], '1M': [169.87, 170.74, 171.21, 168.86, 170.23, 168.26, 169.66, 175.27, 185.73, 190.79, 193.18, 193.98, 199.38, 194.62, 191.12, 198.4, 187.18, 187.91, 210.73, 206.77, 202.69], 'YTD': [117.19, 115.97, 113.47, 117.08, 109.71, 103.35, 103.94, 95.28, 106.54, 110.39, 102.25, 92.39, 99.65, 99.62, 112.4, 113.75, 117.02, 140.64, 162.53, 182.75, 167.76, 173.23, 170.23, 190.79, 198.4, 202.69], '6M': [113.47, 117.08, 109.71, 102.01, 103.57, 87.56, 97.86, 108.53, 105.96, 103.33, 95.01, 105.81, 99.62, 112.4, 113.75, 119.13, 136.54, 154.22, 161.34, 192.24, 161.23, 169.87, 168.26, 193.18, 198.4, 202.69], '1Y': [117.61, 115.38, 115.79, 112.92, 108.03, 104.79, 105.65, 103.3, 106.22, 111.38, 119.08, 124.99, 127.49, 122.25, 125.03, 136.38, 133.54, 136.46, 130.15, 125.39, 131.04, 129.88, 117.5, 119.28, 113.39, 117.65, 113.47, 117.08, 109.71, 102.01, 103.57, 87.56, 96.21, 108.53, 105.96, 103.33, 95.01, 105.81, 99.62, 112.4, 113.75, 119.13, 136.54, 154.22, 161.34, 192.24, 161.23, 169.87, 168.26, 193.18, 198.4, 202.69] },
      velocityScore: { '1D': -18.3, '1W': -15.2, '1M': -14.1, '6M': null }, isNew: false,
      marketCap: '$206B', pe: null, revenueGrowth: 26, eps: -0.02, grossMargin: 75, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 7.62, FDTX: 1.21, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.26, FWD: 1.38, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'CROWDSTRIKE HOLDINGS INC CLASS A appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 2.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASML', name: 'ASML Holding', easyScore: 4, avgWeight: 2.83, proScore: 0.66, coverage: 0.235,
      price: 1811.95, weeklyPrices: [1797.32, 1726.04, 1775.64, 1815.27, 1811.95], weeklyChange: 0.81, dayChange: -0.18, sortRank: 0, periodReturns: { '1M': 0.4, 'YTD': 69.4, '6M': 33.4, '1Y': 140.2 },
      priceHistory: { '1D': [1815.27, 1815, 1812.02, 1811.95], '1W': [1797.32, 1726.04, 1775.64, 1815.27, 1811.95], '1M': [1803.89, 1867.83, 1929.68, 1929.25, 1778.46, 1762.77, 1841.18, 1794.62, 1883.11, 1989.44, 1843.04, 1769.32, 1825.07, 1747.28, 1768.65, 1804.25, 1797.32, 1726.04, 1775.64, 1815.27, 1811.95], 'YTD': [1069.86, 1194.32, 1358.57, 1413.35, 1441.39, 1413.62, 1468.72, 1463.8, 1368.36, 1351.58, 1317.25, 1302.47, 1304.01, 1518.3, 1458.97, 1384.56, 1544.74, 1581.58, 1550.13, 1612.76, 1641.74, 1892.66, 1778.46, 1989.44, 1804.25, 1811.95], '6M': [1358.57, 1413.35, 1441.39, 1429.49, 1419.78, 1497.8, 1360.94, 1357.42, 1375.56, 1369.62, 1253.96, 1306.45, 1518.3, 1458.97, 1384.56, 1442.92, 1520.94, 1459.44, 1597.87, 1705.37, 1777.77, 1803.89, 1762.77, 1843.04, 1804.25, 1811.95], '1Y': [754.45, 716.93, 721.45, 690.96, 755.57, 749.49, 770, 736.82, 793.14, 872.27, 946.94, 1003.27, 987.81, 1009.81, 1011.57, 1070.84, 1043.75, 1037.33, 1039.33, 1040.97, 1140.92, 1119.32, 1015.43, 1065.52, 1163.78, 1273.88, 1358.57, 1413.35, 1441.39, 1429.49, 1419.78, 1497.8, 1423.54, 1357.42, 1375.56, 1369.62, 1253.96, 1306.45, 1518.3, 1458.97, 1384.56, 1442.92, 1520.94, 1459.44, 1597.87, 1705.37, 1777.77, 1803.89, 1762.77, 1843.04, 1804.25, 1811.95] },
      velocityScore: { '1D': 0, '1W': 0, '1M': -25, '6M': null }, isNew: false,
      marketCap: '$696B', pe: 57.7, revenueGrowth: 21, eps: 31.4, grossMargin: 53, dividendYield: 0.48,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 4.74, BCTK: 2.18, FWD: 1.81, CBSE: 2.57, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'ASML Holding appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 3, avgWeight: 4.72, proScore: 2.83, coverage: 0.6,
      price: 404.28, weeklyPrices: [407.28, 402.85, 415.52, 412.86, 404.28], weeklyChange: -0.74, dayChange: -2.08, sortRank: 0, periodReturns: { '1M': -0.8, 'YTD': 26.9, '6M': 17.6, '1Y': 11.4 },
      priceHistory: { '1D': [412.86, 405.48, 405.36, 404.28], '1W': [407.28, 402.85, 415.52, 412.86, 404.28], '1M': [407.71, 409.64, 421.77, 435.78, 405.28, 404.59, 419.87, 402.68, 408.26, 426.12, 412.31, 398.52, 413.42, 395.68, 399.56, 405.83, 407.28, 402.85, 415.52, 412.86, 404.28], 'YTD': [318.51, 320.58, 343.75, 332.28, 359.44, 377.47, 380.38, 374.59, 354.79, 348.64, 356.8, 357.36, 363.89, 401.9, 409.7, 413.07, 421.39, 406.94, 379.69, 400.6, 395.94, 407.06, 405.28, 426.12, 405.83, 404.28], '6M': [343.75, 332.28, 359.44, 377.06, 391.49, 374.56, 355.56, 353.87, 361.04, 359.74, 343.53, 368.85, 401.9, 409.7, 413.07, 410.86, 401.53, 371.88, 406.37, 417.62, 401.72, 407.71, 404.59, 412.31, 405.83, 404.28], '1Y': [362.89, 380.24, 390.09, 358.16, 357.49, 346.22, 351.4, 342.99, 362.25, 363.35, 372.21, 373.84, 376.7, 381.72, 360.6, 387.75, 385.44, 369.4, 345.65, 341.69, 335.57, 353.45, 315.82, 323.67, 327.31, 324.51, 343.75, 332.28, 359.44, 377.06, 391.49, 374.56, 377.4, 353.87, 361.04, 359.74, 343.53, 368.85, 401.9, 409.7, 413.07, 410.86, 401.53, 371.88, 406.37, 417.62, 401.72, 407.71, 404.59, 412.31, 405.83, 404.28] },
      velocityScore: { '1D': -0.4, '1W': 2.5, '1M': 6.4, '6M': null }, isNew: false,
      marketCap: '$157B', pe: 39.5, revenueGrowth: 17, eps: 10.24, grossMargin: 37, dividendYield: 1.07,
      etfPresence: { POW: 4.36, VOLT: 5.61, PBD: false, PBW: false, IVEP: 4.2 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 3, avgWeight: 4.63, proScore: 2.78, coverage: 0.6,
      price: 634.74, weeklyPrices: [658.56, 646.70, 660.94, 648.84, 634.74], weeklyChange: -3.62, dayChange: -2.17, sortRank: 0, periodReturns: { '1M': -11.8, 'YTD': 50.4, '6M': 36, '1Y': 63.1 },
      priceHistory: { '1D': [648.82, 640.9, 639.09, 634.74], '1W': [658.56, 646.7, 660.94, 648.84, 634.74], '1M': [719.29, 714.85, 702.25, 740.14, 702.29, 701.88, 718.59, 687.87, 714.45, 720.04, 691.4, 668.31, 674.04, 656.79, 666.33, 668.17, 658.56, 646.7, 660.94, 648.84, 634.74], 'YTD': [422.06, 413.17, 466.75, 470.77, 477.77, 510.64, 519.31, 565.05, 549.22, 566.91, 555.39, 549.98, 554.38, 594.4, 605.89, 630.94, 785.24, 773.72, 709.93, 711.73, 695.11, 724.35, 702.29, 720.04, 668.17, 634.74], '6M': [466.75, 470.77, 477.77, 514.56, 525.13, 568.21, 566, 568.04, 574.02, 567.45, 533.78, 555.57, 594.4, 605.89, 630.94, 771.61, 765.81, 714.13, 733.62, 706.06, 691.95, 719.29, 701.88, 691.4, 668.17, 634.74], '1Y': [389.12, 405.11, 411.11, 387.5, 379.96, 375.87, 381.56, 374.41, 390.17, 376.01, 402.87, 420.65, 443.45, 436.93, 412.21, 448.69, 453.45, 449.42, 445.47, 460.43, 456.02, 462.21, 414.25, 433.58, 439.68, 422.57, 466.75, 470.77, 477.77, 514.56, 525.13, 568.21, 572.66, 568.04, 574.02, 567.45, 533.78, 555.57, 594.4, 605.89, 630.94, 771.61, 765.81, 714.13, 733.62, 706.06, 691.95, 719.29, 701.88, 691.4, 668.17, 634.74] },
      velocityScore: { '1D': -1.4, '1W': -5.4, '1M': -5.1, '6M': null }, isNew: false,
      marketCap: '$95B', pe: 88.9, revenueGrowth: 26, eps: 7.14, grossMargin: 15, dividendYield: 0.07,
      etfPresence: { POW: 4.93, VOLT: 5.14, PBD: false, PBW: false, IVEP: 3.81 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 3, avgWeight: 3.96, proScore: 2.37, coverage: 0.6,
      price: 1027.3, weeklyPrices: [1091.57, 1042.60, 1066.01, 1055.28, 1027.30], weeklyChange: -5.89, dayChange: -2.69, sortRank: 0, periodReturns: { '1M': 4.6, 'YTD': 57.2, '6M': 50.7, '1Y': 83.1 },
      priceHistory: { '1D': [1055.66, 1024.97, 1028.22, 1027.3], '1W': [1091.57, 1042.6, 1066.01, 1055.28, 1027.3], '1M': [982.35, 1048.86, 1109.73, 1127.59, 1034.98, 1057.65, 1085.47, 1045.17, 1102.51, 1174.86, 1134.35, 1113.11, 1152.04, 1077.08, 1070.99, 1075.26, 1091.57, 1042.6, 1066.01, 1055.28, 1027.3], 'YTD': [653.57, 628.4, 681.55, 665.99, 754.97, 790.79, 817.55, 876.46, 815.01, 832.11, 851.07, 853.16, 897.36, 987.5, 991.3, 1088.93, 1118.96, 1062.57, 1024.52, 968.32, 933.61, 979.07, 1034.98, 1174.86, 1075.26, 1027.3], '6M': [681.55, 665.99, 754.97, 801.54, 819.15, 879.73, 842, 830.1, 827.37, 882.64, 817.35, 910.75, 987.5, 991.3, 1088.93, 1095.21, 1071.98, 1011.8, 1031.89, 969.67, 920.15, 982.35, 1057.65, 1134.35, 1075.26, 1027.3], '1Y': [561.17, 629.03, 655, 664.55, 634.31, 604.59, 622.39, 577.04, 643.56, 614.79, 628.97, 606.15, 625.45, 615.95, 576, 577.97, 559.7, 575.4, 595.37, 589.72, 601.97, 723, 614.19, 667.32, 679.55, 622.5, 681.55, 665.99, 754.97, 801.54, 819.15, 879.73, 881.18, 830.1, 827.37, 882.64, 817.35, 910.75, 987.5, 991.3, 1088.93, 1095.21, 1071.98, 1011.8, 1031.89, 969.67, 920.15, 982.35, 1057.65, 1134.35, 1075.26, 1027.3] },
      velocityScore: { '1D': -0.8, '1W': -5.6, '1M': 7.2, '6M': null }, isNew: false,
      marketCap: '$276B', pe: 30, revenueGrowth: 16, eps: 34.19, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { POW: 3.49, VOLT: 4.45, PBD: false, PBW: false, IVEP: 3.93 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 3, avgWeight: 3.96, proScore: 2.38, coverage: 0.6,
      price: 89.49, weeklyPrices: [87.96, 88.38, 89.54, 89.10, 89.49], weeklyChange: 1.74, dayChange: 0.42, sortRank: 0, periodReturns: { '1M': 3.8, 'YTD': 11.5, '6M': 7, '1Y': 19.7 },
      priceHistory: { '1D': [89.12, 89.46, 89.47, 89.49], '1W': [87.96, 88.38, 89.54, 89.1, 89.49], '1M': [86.23, 85.73, 86.75, 86.08, 86.43, 87.62, 87.7, 88.56, 88.66, 87.77, 86.37, 88.34, 87.44, 88.47, 87.44, 87.1, 87.96, 88.38, 89.54, 89.1, 89.49], 'YTD': [80.28, 79.49, 83.63, 85.47, 86.33, 90.83, 91.22, 91.99, 91.13, 91.73, 89.5, 91.4, 92.73, 91.31, 90.6, 96.51, 95.39, 94.85, 88.27, 87.01, 85.84, 86.12, 86.43, 87.77, 87.1, 89.49], '6M': [83.63, 85.47, 86.33, 89.48, 92.71, 95.68, 92.59, 92.01, 92.82, 90.23, 92.05, 93.67, 91.31, 90.6, 96.51, 96.28, 94.59, 90.06, 87.65, 85.68, 84.83, 86.23, 87.62, 86.37, 87.1, 89.49], '1Y': [74.77, 72.82, 70.99, 70.54, 72.3, 76.18, 73.89, 71.63, 71.04, 70.31, 73.83, 78.67, 84.04, 85.79, 82.84, 81.76, 82.14, 85.89, 84.27, 85.54, 84.95, 81.27, 80.29, 80.45, 80.93, 79.89, 83.63, 85.47, 86.33, 89.48, 92.71, 95.68, 92.71, 92.01, 92.82, 90.23, 92.05, 93.67, 91.31, 90.6, 96.51, 96.28, 94.59, 90.06, 87.65, 85.68, 84.83, 86.23, 87.62, 86.37, 87.1, 89.49] },
      velocityScore: { '1D': 0.4, '1W': 5.8, '1M': 13.3, '6M': null }, isNew: false,
      marketCap: '$187B', pe: 22.7, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.8,
      etfPresence: { POW: 2.23, VOLT: 5.32, PBD: false, PBW: false, IVEP: 4.33 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 3, avgWeight: 3.27, proScore: 1.96, coverage: 0.6,
      price: 154.25, weeklyPrices: [160.72, 158.02, 161.78, 159.46, 154.25], weeklyChange: -4.03, dayChange: -3.26, sortRank: 0, periodReturns: { '1M': -7.8, 'YTD': 51.3, '6M': 37.1, '1Y': 107.1 },
      priceHistory: { '1D': [159.44, 154.56, 155.15, 154.25], '1W': [160.72, 158.02, 161.78, 159.46, 154.25], '1M': [167.34, 170.94, 177.02, 184.34, 168.37, 167.55, 171.91, 162.92, 163.35, 169.61, 159.99, 152.15, 156.89, 153.18, 154.76, 158.05, 160.72, 158.02, 161.78, 159.46, 154.25], 'YTD': [101.97, 102.72, 112.5, 110.58, 115.79, 112.15, 115.65, 121.79, 110.55, 107.87, 116.3, 116.98, 117.41, 134.48, 137, 138.3, 172.49, 172.91, 161.86, 166.99, 162.86, 169, 168.37, 169.61, 158.05, 154.25], '6M': [112.5, 110.58, 115.79, 114.62, 115.22, 118.22, 111.65, 108.13, 114.3, 121, 112.75, 118.92, 134.48, 137, 138.3, 169.41, 170.74, 158.23, 167.8, 173.39, 163.8, 167.34, 167.55, 159.99, 158.05, 154.25], '1Y': [74.48, 76.63, 78.72, 90.24, 90.61, 88.04, 91.11, 89.49, 94.98, 96.46, 97.27, 100.12, 98.72, 101.1, 96.93, 106.28, 112.5, 111.46, 105.74, 106.53, 104.97, 108.87, 94.99, 103.97, 106.82, 105.38, 112.5, 110.58, 115.79, 114.62, 115.22, 118.22, 120.27, 108.13, 114.3, 121, 112.75, 118.92, 134.48, 137, 138.3, 169.41, 170.74, 158.23, 167.8, 173.39, 163.8, 167.34, 167.55, 159.99, 158.05, 154.25] },
      velocityScore: { '1D': -1, '1W': -1, '1M': -4.9, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 52.6, revenueGrowth: 54, eps: 2.93, grossMargin: 37, dividendYield: 0.53,
      etfPresence: { POW: 3.89, VOLT: 3.06, PBD: false, PBW: false, IVEP: 2.86 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 3, avgWeight: 3.16, proScore: 1.9, coverage: 0.6,
      price: 475.16, weeklyPrices: [490.94, 477.03, 483.89, 479.92, 475.16], weeklyChange: -3.21, dayChange: -1.02, sortRank: 0, periodReturns: { '1M': -5.5, 'YTD': 7, '6M': -2.9, '1Y': 13.6 },
      priceHistory: { '1D': [480.05, 474.59, 475.38, 475.16], '1W': [490.94, 477.03, 483.89, 479.92, 475.16], '1M': [502.65, 508.87, 523.69, 539.39, 509.96, 518.18, 536.04, 517.02, 514.71, 523.2, 490.12, 487.1, 495.6, 478.89, 480.5, 485.41, 490.94, 477.03, 483.89, 479.92, 475.16], 'YTD': [444.11, 460.87, 489.31, 486.82, 495.59, 503.1, 522.3, 524.19, 476.51, 468.41, 475.74, 480.97, 499.2, 545.62, 549.11, 544.71, 502.34, 483.79, 463.32, 473.61, 476.82, 489.73, 509.96, 523.2, 485.41, 475.16], '6M': [489.31, 486.82, 495.59, 506.14, 524.25, 526.75, 488.49, 487.76, 472.64, 489.07, 472.07, 499.31, 545.62, 549.11, 544.71, 507.81, 485.98, 461.5, 484.25, 480.46, 486.47, 502.65, 518.18, 490.12, 485.41, 475.16], '1Y': [418.42, 434.95, 437.44, 423.57, 443.95, 429.96, 446.06, 428.8, 442.33, 433.26, 431.16, 430.47, 419.67, 434.05, 422.63, 472.57, 468.06, 453, 419.09, 428.47, 429.34, 448.18, 429.68, 456.28, 463.03, 470.53, 489.31, 486.82, 495.59, 506.14, 524.25, 526.75, 516.98, 487.76, 472.64, 489.07, 472.07, 499.31, 545.62, 549.11, 544.71, 507.81, 485.98, 461.5, 484.25, 480.46, 486.47, 502.65, 518.18, 490.12, 485.41, 475.16] },
      velocityScore: { '1D': -0.5, '1W': 2.2, '1M': 10.5, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 28, revenueGrowth: 11, eps: 16.94, grossMargin: 36, dividendYield: 1.18,
      etfPresence: { POW: 2.9, VOLT: 3.78, PBD: false, PBW: false, IVEP: 2.81 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy Corp', easyScore: 3, avgWeight: 2.71, proScore: 1.63, coverage: 0.6,
      price: 224.41, weeklyPrices: [244.61, 233.49, 243.40, 239.38, 224.41], weeklyChange: -8.26, dayChange: -6.24, sortRank: 0, periodReturns: { '1M': -20.1, 'YTD': 158.3, '6M': 50.1, '1Y': 808.9 },
      priceHistory: { '1D': [239.36, 226.39, 226.04, 224.41], '1W': [244.61, 233.49, 243.4, 239.38, 224.41], '1M': [280.88, 284.99, 328.91, 345.85, 321.98, 326.19, 309.18, 252.02, 275.01, 302.7, 289.5, 270.89, 295.05, 269.57, 254.29, 257.02, 244.61, 233.49, 243.4, 239.38, 224.41], 'YTD': [86.89, 121.84, 149.5, 139.62, 156.13, 148.7, 157.27, 168.57, 159.99, 157.17, 150.12, 133.24, 135, 219.03, 220.91, 226.37, 285.47, 289.76, 282.31, 285, 263.61, 274.5, 321.98, 302.7, 257.02, 224.41], '6M': [149.5, 139.62, 156.13, 155.17, 145.32, 166.2, 153.02, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 261.34, 293.8, 302.85, 259.61, 280.88, 326.19, 289.5, 257.02, 224.41], '1Y': [24.69, 26.89, 37.62, 38.86, 44.08, 44.51, 50.85, 52.45, 62.96, 79.67, 69.18, 90.19, 87.58, 116.58, 94.37, 133.71, 141.41, 126.72, 108.93, 101.14, 102.5, 101.29, 76.97, 91.88, 98.69, 134.07, 149.5, 139.62, 156.13, 155.17, 145.32, 166.2, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 261.34, 293.8, 302.85, 259.61, 280.88, 326.19, 289.5, 257.02, 224.41] },
      velocityScore: { '1D': -0.6, '1W': -20.1, '1M': -26.2, '6M': null }, isNew: false,
      marketCap: '$64B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: 1.48, VOLT: 3.53, PBD: false, PBW: false, IVEP: 3.12 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'NRG', name: 'NRG Energy Inc', easyScore: 3, avgWeight: 1.48, proScore: 0.89, coverage: 0.6,
      price: 138.57, weeklyPrices: [140.42, 139.48, 138.36, 137.90, 138.57], weeklyChange: -1.32, dayChange: 0.52, sortRank: 0, periodReturns: { '1M': 4.9, 'YTD': -13, '6M': -8.9, '1Y': -4.4 },
      priceHistory: { '1D': [137.86, 137.39, 138.49, 138.57], '1W': [140.42, 139.48, 138.36, 137.9, 138.57], '1M': [132.1, 132.13, 135.06, 138.91, 137.66, 142.21, 147.11, 149.36, 149.11, 146.06, 140.8, 136.7, 141.01, 138.01, 137.48, 140.48, 140.42, 139.48, 138.36, 137.9, 138.57], 'YTD': [159.24, 143.53, 152.05, 149.93, 149.11, 156.43, 171.06, 181.34, 160.46, 152.1, 145.8, 147.74, 149.8, 170.96, 149.86, 154.81, 150.64, 131.08, 133.98, 134.08, 129.2, 130.4, 137.66, 146.06, 140.48, 138.57], '6M': [152.05, 149.93, 149.11, 155.72, 173.45, 184.03, 162.06, 155.42, 152.48, 151.77, 141.23, 153.06, 170.96, 149.86, 154.81, 157.43, 137.34, 123.71, 138, 133.51, 129.96, 132.1, 142.21, 140.8, 140.48, 138.57], '1Y': [144.96, 160.55, 166.59, 148.56, 155, 148.19, 148.12, 146.91, 161.21, 164.58, 165.58, 161.91, 167.52, 171.33, 160.42, 178.5, 173.19, 168.84, 168.8, 168.54, 166.77, 168.16, 149.48, 160.56, 166.16, 149.27, 152.05, 149.93, 149.11, 155.72, 173.45, 184.03, 175.58, 155.42, 152.48, 151.77, 141.23, 153.06, 170.96, 149.86, 154.81, 157.43, 137.34, 123.71, 138, 133.51, 129.96, 132.1, 142.21, 140.8, 140.48, 138.57] },
      velocityScore: { '1D': 0, '1W': 9.9, '1M': 41.3, '6M': null }, isNew: false,
      marketCap: '$29B', pe: 152.3, revenueGrowth: 20, eps: 0.91, grossMargin: 16, dividendYield: 1.38,
      etfPresence: { POW: 0.54, VOLT: 1.03, PBD: false, PBW: false, IVEP: 2.88 },
      tonyNote: 'NRG Energy Inc appears in 3 of 5 Electrification ETFs (60% coverage) with average weight 1.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, avgWeight: 5.55, proScore: 2.22, coverage: 0.4,
      price: 269.35, weeklyPrices: [272.58, 263.26, 279.39, 275.00, 269.35], weeklyChange: -1.18, dayChange: -2.05, sortRank: 0, periodReturns: { '1M': -8.1, 'YTD': 58.8, '6M': 34.6, '1Y': 172.7 },
      priceHistory: { '1D': [275, 268.44, 269.35], '1W': [272.58, 263.26, 279.39, 275, 269.35], '1M': [293.22, 299.84, 296.39, 304.33, 288.64, 294.15, 310.32, 310.64, 315.65, 333.04, 318.06, 266.94, 277.45, 251.53, 258.67, 267.69, 272.58, 263.26, 279.39, 275, 269.35], 'YTD': [169.63, 180.24, 200.11, 205.17, 215.59, 237.19, 221.19, 232.12, 202.58, 195.18, 204.09, 203.53, 206.9, 237.34, 257.41, 249.82, 286.89, 266.92, 254.75, 274.52, 262.56, 302.15, 288.64, 333.04, 267.69, 269.35], '6M': [200.11, 205.17, 215.59, 229.32, 235.3, 234.4, 213.65, 191.81, 205.11, 214.98, 197.83, 210.32, 237.34, 257.41, 249.82, 297.17, 298.22, 249.71, 280.13, 269.22, 276.04, 293.22, 294.15, 318.06, 267.69, 269.35], '1Y': [98.77, 107.07, 125.91, 131.1, 134.58, 128.41, 140.42, 138.07, 145.68, 144.6, 142.27, 142.5, 146.89, 150.77, 148.25, 152.46, 154.86, 153.75, 144.89, 152.69, 159.74, 172.82, 164.18, 176.17, 172.78, 187.43, 200.11, 205.17, 215.59, 229.32, 235.3, 234.4, 222.45, 191.81, 205.11, 214.98, 197.83, 210.32, 237.34, 257.41, 249.82, 297.17, 298.22, 249.71, 280.13, 269.22, 276.04, 293.22, 294.15, 318.06, 267.69, 269.35] },
      velocityScore: { '1D': -1.3, '1W': 5.7, '1M': -3.5, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 64.9, revenueGrowth: 17, eps: 4.15, grossMargin: 39, dividendYield: 0.1,
      etfPresence: { POW: 3.6, VOLT: 7.5, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 2, avgWeight: 5.47, proScore: 2.19, coverage: 0.4,
      price: 237.31, weeklyPrices: [232.19, 225.66, 234.25, 247.01, 237.31], weeklyChange: 2.21, dayChange: -3.93, sortRank: 0, periodReturns: { '1M': -18.9, 'YTD': 123.3, '6M': 69.5, '1Y': 227.2 },
      priceHistory: { '1D': [247.01, 241.17, 240.71, 237.31], '1W': [232.19, 225.66, 234.25, 247.01, 237.31], '1M': [292.7, 294.03, 297.2, 307.8, 291.5, 294.49, 309.2, 279.77, 281.09, 286.36, 264.86, 246.33, 248.05, 234.05, 231.85, 236.58, 232.19, 225.66, 234.25, 247.01, 237.31], 'YTD': [106.26, 119.94, 139.99, 141.15, 146.79, 190.09, 180.99, 176.96, 167.67, 171.19, 172, 179.35, 186.72, 234.42, 240.97, 255.56, 320.3, 300.84, 271.05, 284.42, 284.87, 303.53, 291.5, 286.36, 236.58, 237.31], '6M': [139.99, 141.15, 146.79, 187.3, 187.21, 186.39, 170.37, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 261.58, 295.94, 299.07, 283.51, 292.7, 294.49, 264.86, 236.58, 237.31], '1Y': [72.53, 78.32, 76.88, 75.95, 86.57, 82.17, 91.46, 85.72, 92.33, 97.11, 97.88, 105.74, 105.13, 109.92, 110.96, 136.12, 131.92, 118.74, 95.1, 107.26, 107.83, 119.95, 105.77, 112.06, 117.51, 121.83, 139.99, 141.15, 146.79, 187.3, 187.21, 186.39, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 261.58, 295.94, 299.07, 283.51, 292.7, 294.49, 264.86, 236.58, 237.31] },
      velocityScore: { '1D': 5.8, '1W': 5.8, '1M': -32.8, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 46.4, revenueGrowth: 7, eps: 5.11, grossMargin: 30, dividendYield: 0.15,
      etfPresence: { POW: 4.46, VOLT: 6.49, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 3.62, proScore: 1.45, coverage: 0.4,
      price: 133.31, weeklyPrices: [135.43, 135.63, 134.94, 132.50, 133.31], weeklyChange: -1.57, dayChange: 0.61, sortRank: 0, periodReturns: { '1M': 2.7, 'YTD': 15.6, '6M': 11.1, '1Y': 26.4 },
      priceHistory: { '1D': [132.5, 133.51, 133.48, 133.31], '1W': [135.43, 135.63, 134.94, 132.5, 133.31], '1M': [129.75, 128.27, 127.69, 130.3, 133.74, 134.96, 137, 138.69, 137.97, 136.81, 135.05, 138.51, 135.98, 137.53, 135.9, 133.85, 135.43, 135.63, 134.94, 132.5, 133.31], 'YTD': [115.31, 115.93, 119.96, 118.02, 118.33, 121.23, 127.27, 132.1, 132.04, 132.22, 125.66, 130.1, 132.36, 135.46, 131.89, 135.59, 132.56, 127.95, 128.87, 126.67, 129.14, 129.31, 133.74, 136.81, 133.85, 133.31], '6M': [119.96, 118.02, 118.33, 121.1, 130.24, 132.39, 131.92, 131.86, 134.15, 127.92, 131.12, 132.92, 135.46, 131.89, 135.59, 137.04, 131.94, 128.92, 129.57, 127.11, 127.76, 129.75, 134.96, 135.05, 133.85, 133.31], '1Y': [105.49, 108.89, 113.25, 113.49, 113.11, 113.55, 112.89, 110.03, 108.34, 107.52, 108.88, 112.75, 118.19, 118.53, 117.27, 122.11, 119.76, 122.68, 121.71, 122.72, 118.06, 114.16, 114.71, 115.31, 115.81, 116.91, 119.96, 118.02, 118.33, 121.1, 130.24, 132.39, 133.29, 131.86, 134.15, 127.92, 131.12, 132.92, 135.46, 131.89, 135.59, 137.04, 131.94, 128.92, 129.57, 127.11, 127.76, 129.75, 134.96, 135.05, 133.85, 133.31] },
      velocityScore: { '1D': -1.4, '1W': -2.7, '1M': 29.5, '6M': null }, isNew: false,
      marketCap: '$73B', pe: 20.1, revenueGrowth: 10, eps: 6.64, grossMargin: 47, dividendYield: 2.87,
      etfPresence: { POW: 2.79, VOLT: 4.45, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.28, proScore: 1.31, coverage: 0.4,
      price: 297.81, weeklyPrices: [318.86, 305.87, 303.58, 304.57, 297.81], weeklyChange: -6.6, dayChange: -2.25, sortRank: 0, periodReturns: { '1M': -0.6, 'YTD': 83.8, '6M': 68.3, '1Y': 137.5 },
      priceHistory: { '1D': [304.66, 299.79, 298.2, 297.81], '1W': [318.86, 305.87, 303.58, 304.57, 297.81], '1M': [299.6, 317.58, 333.05, 357.96, 318.32, 316.43, 325.57, 303.95, 306.97, 334.82, 311.42, 300.53, 318.47, 305.58, 317.81, 323.92, 318.86, 305.87, 303.58, 304.57, 297.81], 'YTD': [162.01, 160.78, 176.93, 181.23, 190.01, 199.62, 243.21, 259.23, 249.75, 265.38, 255.88, 251.07, 258.73, 310.51, 312.44, 305.03, 358.92, 369.99, 315.67, 315.71, 300.51, 311.93, 318.32, 334.82, 323.92, 297.81], '6M': [176.93, 181.23, 190.01, 202, 243.53, 253.15, 244.44, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 322.63, 319.78, 334.49, 289.52, 299.6, 316.43, 311.42, 323.92, 297.81], '1Y': [125.4, 130.19, 144.17, 139.75, 137.4, 127.54, 129.31, 125.59, 136.74, 136.83, 141.62, 161.59, 167.38, 180.51, 171.59, 199.27, 190.71, 173.37, 170.65, 172.02, 178.88, 181.82, 149.83, 166.87, 175.61, 163.58, 176.93, 181.23, 190.01, 202, 243.53, 253.15, 257.75, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 322.63, 319.78, 334.49, 289.52, 299.6, 316.43, 311.42, 323.92, 297.81] },
      velocityScore: { '1D': 0.8, '1W': -5.1, '1M': 1.6, '6M': null }, isNew: false,
      marketCap: '$114B', pe: 74.6, revenueGrowth: 30, eps: 3.99, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 2.48, PBD: false, PBW: false, IVEP: 4.09 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 3.01, proScore: 1.21, coverage: 0.4,
      price: 74.19, weeklyPrices: [75.02, 74.46, 75.98, 74.38, 74.19], weeklyChange: -1.1, dayChange: -0.24, sortRank: 0, periodReturns: { '1M': 3.8, 'YTD': 23.4, '6M': 20.5, '1Y': 26.9 },
      priceHistory: { '1D': [74.37, 74.31, 74.19, 74.19], '1W': [75.02, 74.46, 75.98, 74.38, 74.19], '1M': [71.48, 71.25, 73.12, 74.95, 75.79, 75.87, 77.53, 77.92, 75.06, 74.34, 72.77, 73.14, 72.82, 75.08, 75.27, 75.45, 75.02, 74.46, 75.98, 74.38, 74.19], 'YTD': [60.11, 61.15, 61.55, 64.29, 66.34, 68.84, 72.14, 74.77, 74.77, 73.52, 72.41, 73.58, 72.59, 71.44, 70.43, 73.04, 73.76, 75.71, 77.88, 71.39, 71.96, 71.49, 75.79, 74.34, 75.45, 74.19], '6M': [61.55, 64.29, 66.34, 67.85, 71.96, 73.5, 75.88, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 79.4, 74.37, 71.31, 71.59, 71.48, 75.87, 72.77, 75.45, 74.19], '1Y': [58.48, 57.71, 59.24, 58.64, 57.86, 57.22, 57.49, 57.73, 58.76, 59.02, 62.86, 63.69, 63.5, 63.78, 62.16, 56.98, 57.54, 60.43, 58.89, 60.22, 61.55, 60.5, 58.84, 59.46, 60.85, 60.32, 61.55, 64.29, 66.34, 67.85, 71.96, 73.5, 76.26, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 79.4, 74.37, 71.31, 71.59, 71.48, 75.87, 72.77, 75.45, 74.19] },
      velocityScore: { '1D': 7.1, '1W': 10, '1M': 21, '6M': null }, isNew: false,
      marketCap: '$91B', pe: 32.5, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.82,
      etfPresence: { POW: false, VOLT: 2.03, PBD: false, PBW: false, IVEP: 4 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 3.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.75, proScore: 1.1, coverage: 0.4,
      price: 153.49, weeklyPrices: [159.06, 155.99, 158.37, 157.04, 153.49], weeklyChange: -3.5, dayChange: -2.29, sortRank: 0, periodReturns: { '1M': -3.3, 'YTD': 13.6, '6M': -0.6, '1Y': 52.7 },
      priceHistory: { '1D': [157.09, 154.59, 154.57, 153.49], '1W': [159.06, 155.99, 158.37, 157.04, 153.49], '1M': [158.81, 161.11, 163.96, 165.96, 158.7, 162.78, 165.15, 163.72, 166.42, 176.32, 172.22, 164.59, 166.81, 158.61, 158.22, 162.24, 159.06, 155.99, 158.37, 157.04, 153.49], 'YTD': [135.14, 136.25, 154.39, 155.56, 144.93, 144.14, 147.73, 148.47, 136.24, 131.47, 126.74, 123.62, 126.49, 148.72, 151.93, 143.72, 138.47, 124.64, 123.05, 148.76, 138.81, 158.59, 158.7, 176.32, 162.24, 153.49], '6M': [154.39, 155.56, 144.93, 144.2, 148.57, 151.5, 129.58, 136.06, 136.8, 130.67, 119.15, 128.38, 148.72, 151.93, 143.72, 136.69, 127.87, 119.2, 140.24, 148.4, 154.07, 158.81, 162.78, 172.22, 162.24, 153.49], '1Y': [100.55, 100.71, 105.49, 109.5, 109.83, 108.65, 110.13, 110.69, 119.09, 118.41, 123.13, 124.66, 125.79, 125.6, 128.93, 139.75, 138.87, 141.92, 136.66, 138.72, 138.65, 138.68, 126.51, 137.94, 139.71, 140.16, 154.39, 155.56, 144.93, 144.2, 148.57, 151.5, 135.16, 136.06, 136.8, 130.67, 119.15, 128.38, 148.72, 151.93, 143.72, 136.69, 127.87, 119.2, 140.24, 148.4, 154.07, 158.81, 162.78, 172.22, 162.24, 153.49] },
      velocityScore: { '1D': 0, '1W': -0.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$189B', pe: 44, revenueGrowth: 58, eps: 3.49, grossMargin: 38, dividendYield: 0.64,
      etfPresence: { POW: 1.04, VOLT: 4.45, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'CEG', name: 'Constellation Energy Corp', easyScore: 2, avgWeight: 2.74, proScore: 1.1, coverage: 0.4,
      price: 254.37, weeklyPrices: [251.38, 257.57, 256.43, 258.11, 254.37], weeklyChange: 1.19, dayChange: -1.45, sortRank: 0, periodReturns: { '1M': -5.1, 'YTD': -28, '6M': -17.3, '1Y': -17.5 },
      priceHistory: { '1D': [258.12, 255.03, 255.58, 254.37], '1W': [251.38, 257.57, 256.43, 258.11, 254.37], '1M': [268, 267.17, 274.06, 275.53, 270.26, 267.97, 268.69, 264.02, 259.32, 248.37, 236.5, 239.25, 245.87, 239.71, 244.52, 250.74, 251.38, 257.57, 256.43, 258.11, 254.37], 'YTD': [353.27, 322.54, 307.71, 285.27, 270.88, 271.14, 294.05, 323.56, 332.07, 301.55, 281.99, 301.49, 275.16, 296.61, 277.7, 305.71, 322.78, 274.89, 281.26, 287.75, 254.83, 262.35, 270.26, 248.37, 250.74, 254.37], '6M': [307.71, 285.27, 270.88, 272.15, 303.01, 312.64, 324.87, 322.99, 305.58, 289.76, 298.61, 272.58, 296.61, 277.7, 305.71, 320.42, 293.6, 260.67, 288.68, 272.65, 251.65, 268, 267.97, 236.5, 250.74, 254.37], '1Y': [308.2, 323.7, 345.27, 338.46, 327.63, 314.21, 315.94, 308.48, 320, 321.27, 339.13, 350.9, 371, 403.95, 350.06, 401.43, 363.25, 354.02, 357.48, 359.09, 361.26, 362.07, 340.97, 363.95, 366.25, 342.52, 307.71, 285.27, 270.88, 272.15, 303.01, 312.64, 327.16, 322.99, 305.58, 289.76, 298.61, 272.58, 296.61, 277.7, 305.71, 320.42, 293.6, 260.67, 288.68, 272.65, 251.65, 268, 267.97, 236.5, 250.74, 254.37] },
      velocityScore: { '1D': 1.9, '1W': 20.9, '1M': 18.3, '6M': null }, isNew: false,
      marketCap: '$91B', pe: 22.1, revenueGrowth: 64, eps: 11.51, grossMargin: 23, dividendYield: 0.66,
      etfPresence: { POW: 1.33, VOLT: false, PBD: false, PBW: false, IVEP: 4.15 },
      tonyNote: 'Constellation Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.66, proScore: 1.06, coverage: 0.4,
      price: 139.28, weeklyPrices: [142.81, 143.93, 145.24, 142.76, 139.28], weeklyChange: -2.48, dayChange: -2.47, sortRank: 0, periodReturns: { '1M': -4.1, 'YTD': 16.3, '6M': 21.5, '1Y': 29.8 },
      priceHistory: { '1D': [142.8, 140.34, 139.68, 139.28], '1W': [142.81, 143.93, 145.24, 142.76, 139.28], '1M': [145.17, 143.62, 144.82, 148.21, 141.28, 142.81, 145.49, 138.4, 140.47, 146.11, 144.8, 140.76, 142.72, 140.62, 140.23, 140.53, 142.81, 143.93, 145.24, 142.76, 139.28], 'YTD': [119.75, 111.29, 114.61, 115.07, 122.98, 138.75, 139.48, 143.42, 137.18, 130.94, 129.7, 131.29, 133.75, 142.05, 139.72, 141.59, 143.14, 143.8, 137.75, 134.06, 143.65, 146.06, 141.28, 146.11, 140.53, 139.28], '6M': [114.61, 115.07, 122.98, 139, 142.21, 144.71, 139.58, 133.09, 131.69, 133.27, 126.58, 133.15, 142.05, 139.72, 141.59, 144.82, 141.04, 135.42, 138.2, 141.99, 147.75, 145.17, 142.81, 144.8, 140.53, 139.28], '1Y': [107.28, 110.13, 104.02, 104.67, 105.77, 106, 109.27, 105.34, 107.8, 107.41, 106.54, 108.89, 108.43, 110.82, 108.54, 113.34, 120.86, 122.66, 114.42, 116.29, 114.22, 115.81, 116.38, 121.39, 122.31, 110.85, 114.61, 115.07, 122.98, 139, 142.21, 144.71, 145.46, 133.09, 131.69, 133.27, 126.58, 133.15, 142.05, 139.72, 141.59, 144.82, 141.04, 135.42, 138.2, 141.99, 147.75, 145.17, 142.81, 144.8, 140.53, 139.28] },
      velocityScore: { '1D': -1.9, '1W': 2.9, '1M': 3.9, '6M': null }, isNew: false,
      marketCap: '$85B', pe: 42.6, revenueGrowth: 8, eps: 3.27, grossMargin: 37, dividendYield: 1.12,
      etfPresence: { POW: false, VOLT: 1.47, PBD: false, PBW: false, IVEP: 3.85 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VST', name: 'Vistra Corp', easyScore: 2, avgWeight: 2.55, proScore: 1.02, coverage: 0.4,
      price: 153.46, weeklyPrices: [158.86, 158.12, 158.43, 160.23, 153.46], weeklyChange: -3.4, dayChange: -4.2, sortRank: 0, periodReturns: { '1M': -3.2, 'YTD': -4.9, '6M': -7.9, '1Y': -16.7 },
      priceHistory: { '1D': [160.2, 154.61, 154.21, 153.46], '1W': [158.86, 158.12, 158.43, 160.23, 153.46], '1M': [158.61, 158.83, 163.75, 167.26, 162.39, 162.87, 167.77, 163.49, 162.38, 158.63, 153.16, 151.05, 157.22, 155.73, 154.82, 157.98, 158.86, 158.12, 158.43, 160.23, 153.46], 'YTD': [161.33, 150.6, 166.6, 158.81, 154.26, 159.6, 170.57, 176.82, 167.4, 159.58, 146.02, 155.48, 151.59, 163.97, 154.91, 161.12, 158.29, 142.61, 144, 160.23, 148.76, 153.52, 162.39, 158.63, 157.98, 153.46], '6M': [166.6, 158.81, 154.26, 152.97, 173.68, 171.62, 161.7, 163.62, 161.99, 151.29, 147.54, 153.68, 163.97, 154.91, 161.12, 160.38, 146.87, 134.71, 160.15, 157.97, 146.22, 158.61, 162.87, 153.16, 157.98, 153.46], '1Y': [184.13, 200.12, 207.05, 200.85, 205.28, 192.91, 194.6, 188.12, 209.21, 208.31, 202.06, 201.51, 206.55, 210.85, 185.83, 199.37, 189.39, 178.27, 179.14, 176.8, 171.65, 165.17, 159.97, 161.96, 165.23, 166.37, 166.6, 158.81, 154.26, 152.97, 173.68, 171.62, 165.99, 163.62, 161.99, 151.29, 147.54, 153.68, 163.97, 154.91, 161.12, 160.38, 146.87, 134.71, 160.15, 157.97, 146.22, 158.61, 162.87, 153.16, 157.98, 153.46] },
      velocityScore: { '1D': 2, '1W': 6.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$52B', pe: 25.4, revenueGrowth: 43, eps: 6.04, grossMargin: 39, dividendYield: 0.57,
      etfPresence: { POW: 1.53, VOLT: false, PBD: false, PBW: false, IVEP: 3.57 },
      tonyNote: 'Vistra Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.46, proScore: 0.98, coverage: 0.4,
      price: 294.23, weeklyPrices: [308.05, 298.52, 305.20, 301.88, 294.23], weeklyChange: -4.49, dayChange: -2.54, sortRank: 0, periodReturns: { '1M': -16, 'YTD': 40.5, '6M': 15.9, '1Y': 111 },
      priceHistory: { '1D': [301.88, 296, 294.29, 294.23], '1W': [308.05, 298.52, 305.2, 301.88, 294.23], '1M': [350.45, 353.32, 372.59, 388.23, 364.96, 359.61, 375.15, 348.11, 348.15, 372.87, 356.35, 311.27, 310.84, 287.73, 293.64, 309.27, 308.05, 298.52, 305.2, 301.88, 294.23], 'YTD': [209.37, 210.99, 253.86, 263.03, 261.82, 279.04, 321.34, 337.35, 311.42, 305.82, 317.21, 310.76, 331.9, 385.73, 385, 369.08, 360.81, 339.19, 313.05, 302.18, 294.81, 370.66, 364.96, 372.87, 309.27, 294.23], '6M': [253.86, 263.03, 261.82, 279.17, 314.12, 335.74, 322.47, 305.02, 308.31, 329.78, 298.29, 339.32, 385.73, 385, 369.08, 345.63, 339.42, 302.84, 328.34, 312.28, 311.64, 350.45, 359.61, 356.35, 309.27, 294.23], '1Y': [139.42, 142.84, 144.07, 139.81, 162.52, 147.74, 153.73, 145.25, 157.25, 157.79, 170.77, 176.2, 174.92, 189.96, 190.46, 208.05, 225.8, 212.79, 198.89, 209.9, 213.44, 221.47, 204.49, 217.23, 221.99, 219.59, 253.86, 263.03, 261.82, 279.17, 314.12, 335.74, 340.42, 305.02, 308.31, 329.78, 298.29, 339.32, 385.73, 385, 369.08, 345.63, 339.42, 302.84, 328.34, 312.28, 311.64, 350.45, 359.61, 356.35, 309.27, 294.23] },
      velocityScore: { '1D': -1, '1W': 2.1, '1M': 6.5, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 61.7, revenueGrowth: 26, eps: 4.77, grossMargin: 39, dividendYield: 0.13,
      etfPresence: { POW: 0.99, VOLT: 3.92, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'TLN', name: 'Talen Energy Corp', easyScore: 2, avgWeight: 2.31, proScore: 0.92, coverage: 0.4,
      price: 386.32, weeklyPrices: [385.80, 396.35, 396.95, 400.12, 386.32], weeklyChange: 0.13, dayChange: -3.45, sortRank: 0, periodReturns: { '1M': -5, 'YTD': 3.1, '6M': 3.9, '1Y': 45.9 },
      priceHistory: { '1D': [400.12, 386.32, 385.25, 386.32], '1W': [385.8, 396.35, 396.95, 400.12, 386.32], '1M': [406.51, 409.81, 436.29, 438.12, 411.92, 405.89, 416.8, 404.09, 399.34, 384.26, 360.79, 364.67, 377.79, 366.66, 367.88, 384.44, 385.8, 396.35, 396.95, 400.12, 386.32], 'YTD': [374.84, 356, 371.66, 350.41, 340.8, 357.93, 380.29, 390.05, 334.86, 311.45, 302.97, 324.54, 324.09, 345.76, 329.74, 361.17, 409.99, 351.03, 344.46, 386.8, 364.74, 386.21, 411.92, 384.26, 384.44, 386.32], '6M': [371.66, 350.41, 340.8, 353.66, 388.28, 375.24, 341.39, 335.11, 317.6, 311.02, 313.03, 330.07, 345.76, 329.74, 361.17, 384.9, 374.61, 314.57, 379.78, 385.51, 358.74, 406.51, 405.89, 360.79, 384.44, 386.32], '1Y': [264.78, 339.24, 373.36, 378.67, 380.25, 360.1, 381.5, 377.76, 402.65, 408.09, 416.94, 426.99, 445.84, 415.81, 380.69, 398.55, 403.49, 367.54, 390.51, 392.42, 365.46, 358.5, 351.96, 383.58, 396.73, 370.83, 371.66, 350.41, 340.8, 353.66, 388.28, 375.24, 353.24, 335.11, 317.6, 311.02, 313.03, 330.07, 345.76, 329.74, 361.17, 384.9, 374.61, 314.57, 379.78, 385.51, 358.74, 406.51, 405.89, 360.79, 384.44, 386.32] },
      velocityScore: { '1D': 1.1, '1W': 4.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: null, revenueGrowth: 97, eps: -0.52, grossMargin: 40, dividendYield: null,
      etfPresence: { POW: 1.83, VOLT: false, PBD: false, PBW: false, IVEP: 2.79 },
      tonyNote: 'Talen Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SO', name: 'Southern Co/The', easyScore: 2, avgWeight: 2.2, proScore: 0.88, coverage: 0.4,
      price: 95.57, weeklyPrices: [95.61, 96.47, 95.96, 94.60, 95.57], weeklyChange: -0.04, dayChange: 1.04, sortRank: 0, periodReturns: { '1M': 1.3, 'YTD': 9.6, '6M': 7.5, '1Y': 2.4 },
      priceHistory: { '1D': [94.59, 95.6, 95.55, 95.57], '1W': [95.61, 96.47, 95.96, 94.6, 95.57], '1M': [94.31, 92.53, 93.09, 93.43, 94.93, 95.78, 95.91, 97.16, 96.75, 95.71, 95.12, 97.98, 95.99, 97.29, 96.38, 95.17, 95.61, 96.47, 95.96, 94.6, 95.57], 'YTD': [87.2, 87.22, 88.9, 88.16, 88.19, 90.72, 91.04, 96.35, 97.2, 97.84, 93.39, 95.55, 96.94, 95.96, 91.92, 94.41, 93.51, 93.14, 93.62, 92.05, 92.6, 93.82, 94.93, 95.71, 95.17, 95.57], '6M': [88.9, 88.16, 88.19, 89.38, 92, 95.81, 96.79, 97.25, 99.11, 93.75, 96.93, 96.82, 95.96, 91.92, 94.41, 95.9, 93.47, 94.14, 93.74, 90.51, 92.95, 94.31, 95.78, 95.12, 95.17, 95.57], '1Y': [93.3, 95.13, 94.9, 94.68, 94.79, 94.93, 93.28, 91.66, 91.56, 91.63, 94.41, 94.8, 96.18, 99.72, 97.48, 93.51, 91.41, 91.89, 89.05, 90.24, 87.98, 84.08, 87.03, 87.17, 87.18, 87.01, 88.9, 88.16, 88.19, 89.38, 92, 95.81, 97.23, 97.25, 99.11, 93.75, 96.93, 96.82, 95.96, 91.92, 94.41, 95.9, 93.47, 94.14, 93.74, 90.51, 92.95, 94.31, 95.78, 95.12, 95.17, 95.57] },
      velocityScore: { '1D': -1.1, '1W': 3.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$108B', pe: 24.4, revenueGrowth: 8, eps: 3.91, grossMargin: 48, dividendYield: 3.21,
      etfPresence: { POW: 0.33, VOLT: false, PBD: false, PBW: false, IVEP: 4.08 },
      tonyNote: 'Southern Co/The appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.06, proScore: 2.03, coverage: 0.4,
      price: 892.39, weeklyPrices: [952.41, 931.47, 933.34, 914.30, 892.39], weeklyChange: -6.3, dayChange: -2.37, sortRank: 0, periodReturns: { '1M': -5.6, 'YTD': 55.8, '6M': 38, '1Y': 116.1 },
      priceHistory: { '1D': [914.09, 897.19, 895, 892.39], '1W': [952.41, 931.47, 933.34, 914.3, 892.39], '1M': [945.46, 955.92, 985.82, 1022.28, 984.24, 994.45, 1057.01, 997.47, 1033.19, 1064.9, 991.41, 963.53, 969.92, 940.12, 948.08, 938.39, 952.41, 931.47, 933.34, 914.3, 892.39], 'YTD': [572.87, 608.13, 646.89, 635.92, 690.91, 742.37, 751.97, 752.93, 706.08, 700.69, 680.88, 695.4, 721.24, 794.25, 800.45, 817.87, 926.93, 902.3, 872.56, 875.87, 904.28, 933.93, 984.24, 1064.9, 938.39, 892.39], '6M': [646.89, 635.92, 690.91, 742.12, 764.76, 768.23, 722.18, 704.82, 699.78, 701.7, 667.43, 724.44, 794.25, 800.45, 817.87, 904.59, 912.14, 860.15, 909.93, 909.81, 914.7, 945.46, 994.45, 991.41, 938.39, 892.39], '1Y': [412.88, 427.59, 434.12, 427.72, 413.7, 420.59, 432.67, 415.12, 422.91, 450.66, 469.79, 480.82, 502.12, 534.05, 513.91, 585.49, 569.15, 573.02, 553.11, 573.73, 591.49, 615.35, 561.89, 583.76, 598.41, 617.62, 646.89, 635.92, 690.91, 742.12, 764.76, 768.23, 752.32, 704.82, 699.78, 701.7, 667.43, 724.44, 794.25, 800.45, 817.87, 904.59, 912.14, 860.15, 909.93, 909.81, 914.7, 945.46, 994.45, 991.41, 938.39, 892.39] },
      velocityScore: { '1D': -0.5, '1W': -1, '1M': 2.5, '6M': null }, isNew: false,
      marketCap: '$411B', pe: 44.4, revenueGrowth: 22, eps: 20.11, grossMargin: 29, dividendYield: 0.71,
      etfPresence: { AIRR: false, PRN: 3.24, RSHO: 6.89, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 4.83, proScore: 1.93, coverage: 0.4,
      price: 237.31, weeklyPrices: [232.19, 225.66, 234.25, 247.01, 237.31], weeklyChange: 2.21, dayChange: -3.93, sortRank: 0, periodReturns: { '1M': -18.9, 'YTD': 123.3, '6M': 69.5, '1Y': 227.2 },
      priceHistory: { '1D': [247.01, 241.17, 240.71, 237.31], '1W': [232.19, 225.66, 234.25, 247.01, 237.31], '1M': [292.7, 294.03, 297.2, 307.8, 291.5, 294.49, 309.2, 279.77, 281.09, 286.36, 264.86, 246.33, 248.05, 234.05, 231.85, 236.58, 232.19, 225.66, 234.25, 247.01, 237.31], 'YTD': [106.26, 119.94, 139.99, 141.15, 146.79, 190.09, 180.99, 176.96, 167.67, 171.19, 172, 179.35, 186.72, 234.42, 240.97, 255.56, 320.3, 300.84, 271.05, 284.42, 284.87, 303.53, 291.5, 286.36, 236.58, 237.31], '6M': [139.99, 141.15, 146.79, 187.3, 187.21, 186.39, 170.37, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 261.58, 295.94, 299.07, 283.51, 292.7, 294.49, 264.86, 236.58, 237.31], '1Y': [72.53, 78.32, 76.88, 75.95, 86.57, 82.17, 91.46, 85.72, 92.33, 97.11, 97.88, 105.74, 105.13, 109.92, 110.96, 136.12, 131.92, 118.74, 95.1, 107.26, 107.83, 119.95, 105.77, 112.06, 117.51, 121.83, 139.99, 141.15, 146.79, 187.3, 187.21, 186.39, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 261.58, 295.94, 299.07, 283.51, 292.7, 294.49, 264.86, 236.58, 237.31] },
      velocityScore: { '1D': 1.6, '1W': 1.6, '1M': -8.1, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 46.4, revenueGrowth: 7, eps: 5.11, grossMargin: 30, dividendYield: 0.15,
      etfPresence: { AIRR: 2.32, PRN: false, RSHO: 7.33, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 4.55, proScore: 1.82, coverage: 0.4,
      price: 652.4, weeklyPrices: [682.29, 660.04, 679.62, 668.82, 652.40], weeklyChange: -4.38, dayChange: -2.46, sortRank: 0, periodReturns: { '1M': -23.9, 'YTD': 113, '6M': 85.9, '1Y': 168.2 },
      priceHistory: { '1D': [668.82, 651.86, 648.38, 652.4], '1W': [682.29, 660.04, 679.62, 668.82, 652.4], '1M': [857.76, 838.21, 861.88, 932.75, 892.25, 867.23, 881.92, 804.76, 813.77, 839.36, 776.55, 700.75, 717.11, 674.39, 660.72, 707.17, 682.29, 660.04, 679.62, 668.82, 652.4], 'YTD': [306.23, 297.62, 350.96, 361.21, 367.95, 415.19, 410.63, 433.34, 398.87, 404.59, 401.61, 420.24, 393.71, 464.54, 472.84, 471.85, 886.22, 854.28, 752, 860.84, 882.43, 866.67, 892.25, 839.36, 707.17, 652.4], '6M': [350.96, 361.21, 367.95, 418.61, 421.2, 459.72, 415.51, 411.38, 417.76, 422.55, 382.55, 382.22, 464.54, 472.84, 471.85, 806, 851.35, 728.29, 782.12, 875.52, 842.01, 857.76, 867.23, 776.55, 707.17, 652.4], '1Y': [243.23, 253.14, 263.35, 299.42, 292.47, 274.89, 289.36, 273.82, 301.13, 320.94, 344.05, 337.93, 366.99, 365.39, 332.75, 403.35, 411.07, 380.7, 334.17, 339.75, 323.46, 331.61, 283.57, 314, 319.16, 308.13, 350.96, 361.21, 367.95, 418.61, 421.2, 459.72, 432.87, 411.38, 417.76, 422.55, 382.55, 382.22, 464.54, 472.84, 471.85, 806, 851.35, 728.29, 782.12, 875.52, 842.01, 857.76, 867.23, 776.55, 707.17, 652.4] },
      velocityScore: { '1D': -1.1, '1W': 0.6, '1M': -15.3, '6M': null }, isNew: false,
      marketCap: '$20B', pe: 59.1, revenueGrowth: 92, eps: 11.04, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 5.17, PRN: 3.94, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.4, proScore: 1.76, coverage: 0.4,
      price: 1676.24, weeklyPrices: [1756.09, 1732.03, 1775.10, 1736.70, 1676.24], weeklyChange: -4.55, dayChange: -3.41, sortRank: 0, periodReturns: { '1M': -12.4, 'YTD': 79.6, '6M': 49.7, '1Y': 206.6 },
      priceHistory: { '1D': [1735.55, 1695.24, 1686.58, 1676.24], '1W': [1756.09, 1732.03, 1775.1, 1736.7, 1676.24], '1M': [1913.94, 1931.77, 1967.41, 2066.51, 1908.07, 1954.47, 2017.57, 1854.23, 1948.69, 1981.95, 1865.15, 1741.3, 1793.03, 1683.44, 1684.94, 1781.42, 1756.09, 1732.03, 1775.1, 1736.7, 1676.24], 'YTD': [933.29, 971.49, 1119.98, 1127.55, 1176.26, 1269.63, 1319.47, 1438.23, 1348.22, 1373.76, 1356.75, 1366.77, 1434.09, 1650.48, 1674.16, 1719.21, 2011.49, 2034.63, 1835.51, 1828.21, 1843.94, 1952.02, 1908.07, 1981.95, 1781.42, 1676.24], '6M': [1119.98, 1127.55, 1176.26, 1283.65, 1337.75, 1468.58, 1391.16, 1372.4, 1414.1, 1408.25, 1273.18, 1424.91, 1650.48, 1674.16, 1719.21, 1967.24, 2016.31, 1825.5, 1867.09, 1883.26, 1831.56, 1913.94, 1954.47, 1865.15, 1781.42, 1676.24], '1Y': [546.63, 547.91, 702.97, 690.45, 702.1, 681.08, 709.83, 700.69, 752.1, 762.91, 791.46, 834.33, 844.62, 837.11, 790.72, 1010.64, 987.78, 973.18, 930.5, 970.95, 949.3, 1021.36, 883.79, 958.07, 1003.64, 1010.41, 1119.98, 1127.55, 1176.26, 1283.65, 1337.75, 1468.58, 1438.24, 1372.4, 1414.1, 1408.25, 1273.18, 1424.91, 1650.48, 1674.16, 1719.21, 1967.24, 2016.31, 1825.5, 1867.09, 1883.26, 1831.56, 1913.94, 1954.47, 1865.15, 1781.42, 1676.24] },
      velocityScore: { '1D': -2.2, '1W': 2.3, '1M': -4.9, '6M': null }, isNew: false,
      marketCap: '$59B', pe: 48.5, revenueGrowth: 1, eps: 34.56, grossMargin: 25, dividendYield: 0.15,
      etfPresence: { AIRR: 4.18, PRN: 4.63, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.96, proScore: 1.59, coverage: 0.4,
      price: 330, weeklyPrices: [331.15, 329.35, 327.49, 327.65, 330.00], weeklyChange: -0.35, dayChange: 0.72, sortRank: 0, periodReturns: { '1M': 1.7, 'YTD': 28.5, '6M': 17.4, '1Y': 29.1 },
      priceHistory: { '1D': [327.64, 329.36, 329.9, 330], '1W': [331.15, 329.35, 327.49, 327.65, 330], '1M': [324.38, 329.89, 337.96, 338.07, 330.9, 333.78, 343.54, 337.08, 334.16, 338.15, 332.08, 330.85, 328.53, 315.33, 315.88, 322.49, 331.15, 329.35, 327.49, 327.65, 330], 'YTD': [256.77, 264.62, 281.21, 281.54, 270.02, 283.73, 279.27, 283.5, 274.97, 259.88, 253.77, 260.67, 269.55, 292.01, 293.59, 301.24, 315.39, 310.87, 306.25, 303.81, 315.29, 316.18, 330.9, 338.15, 322.49, 330], '6M': [281.21, 281.54, 270.02, 282.45, 278.31, 282.27, 277.7, 267.57, 256.83, 262.23, 258.01, 272.54, 292.01, 293.59, 301.24, 305.48, 313.7, 302.64, 312.65, 308.31, 322.81, 324.38, 333.78, 332.08, 322.49, 330], '1Y': [255.52, 267.01, 273.62, 264.97, 275.72, 262.46, 268.4, 261.53, 263.45, 259.5, 259.37, 257.98, 255.19, 247.97, 253.5, 254.1, 257.9, 256.26, 243.79, 257.32, 260.88, 264.32, 256.73, 264.33, 259.63, 272.25, 281.21, 281.54, 270.02, 282.45, 278.31, 282.27, 283.54, 267.57, 256.83, 262.23, 258.01, 272.54, 292.01, 293.59, 301.24, 305.48, 313.7, 302.64, 312.65, 308.31, 322.81, 324.38, 333.78, 332.08, 322.49, 330] },
      velocityScore: { '1D': 0.6, '1W': 1.3, '1M': 15.2, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 31.2, revenueGrowth: 7, eps: 10.58, grossMargin: 30, dividendYield: 0.62,
      etfPresence: { AIRR: 1.89, PRN: false, RSHO: 6.04, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 4.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'EME', name: 'EMCOR Group, Inc.', easyScore: 2, avgWeight: 3.58, proScore: 1.43, coverage: 0.4,
      price: 749.51, weeklyPrices: [781.78, 764.90, 774.74, 769.72, 749.51], weeklyChange: -4.13, dayChange: -2.51, sortRank: 0, periodReturns: { '1M': -10.2, 'YTD': 22.5, '6M': 7.3, '1Y': 35.5 },
      priceHistory: { '1D': [768.81, 759.54, 750.42, 749.51], '1W': [781.78, 764.9, 774.74, 769.72, 749.51], '1M': [834.77, 827.5, 836.59, 868.88, 838.61, 847.17, 862.66, 798.1, 814.41, 829.88, 804.33, 774.66, 787.29, 768.38, 768.98, 783.41, 781.78, 764.9, 774.74, 769.72, 749.51], 'YTD': [611.79, 628.27, 698.69, 706.87, 731.67, 779.09, 783.06, 746.18, 719.01, 710.53, 724.93, 732.89, 757.54, 814.18, 838.01, 863.78, 943.75, 923.01, 853.15, 826.82, 817.44, 842.3, 838.61, 829.88, 783.41, 749.51], '6M': [698.69, 706.87, 731.67, 776.24, 797.5, 806.8, 736.3, 719.18, 726.55, 744.66, 701.1, 750.42, 814.18, 838.01, 863.78, 933.27, 924.9, 854.36, 855.26, 827.28, 827.78, 834.77, 847.17, 804.33, 783.41, 749.51], '1Y': [553.3, 573.66, 639.33, 622.27, 616.71, 605.13, 624, 627.28, 634.4, 616.72, 626.57, 654.92, 695.03, 690.64, 662.93, 777, 675.42, 643.38, 605.84, 610.72, 612, 627.02, 596.47, 626.07, 638.65, 646.27, 698.69, 706.87, 731.67, 776.24, 797.5, 806.8, 735.78, 719.18, 726.55, 744.66, 701.1, 750.42, 814.18, 838.01, 863.78, 933.27, 924.9, 854.36, 855.26, 827.28, 827.78, 834.77, 847.17, 804.33, 783.41, 749.51] },
      velocityScore: { '1D': -0.7, '1W': -0.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$33B', pe: 25.2, revenueGrowth: 20, eps: 29.79, grossMargin: 19, dividendYield: 0.21,
      etfPresence: { AIRR: 3.76, PRN: 3.4, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'EMCOR Group is an electrical and mechanical construction services company. Revenue grew substantially, and EMCOR is a core Industrials ETF holding because it builds the electrical systems inside data centers, manufacturing plants, and commercial buildings. The $827 share price reflects years of consistent execution and market share gains in a fragmented contractor market.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 2, avgWeight: 3.31, proScore: 1.32, coverage: 0.4,
      price: 274.18, weeklyPrices: [270.85, 271.28, 276.78, 279.24, 274.18], weeklyChange: 1.23, dayChange: -1.8, sortRank: 0, periodReturns: { '1M': -1.2, 'YTD': 33.7, '6M': 21.9, '1Y': 48.8 },
      priceHistory: { '1D': [279.2, 276.08, 276.08, 274.18], '1W': [270.85, 271.28, 276.78, 279.24, 274.18], '1M': [277.42, 283.23, 277.66, 280.36, 275.13, 276.06, 273.14, 268.87, 268.57, 268.86, 267.41, 270.41, 277.91, 275.43, 271.58, 273.77, 270.85, 271.28, 276.78, 279.24, 274.18], 'YTD': [205.02, 210.02, 224.89, 215.39, 207.21, 224.47, 249.35, 260.31, 252.39, 243.82, 231.21, 227.9, 236.57, 258.03, 247.72, 240.43, 256.43, 273.1, 261.21, 258.25, 251.9, 270.44, 275.13, 268.86, 273.77, 274.18], '6M': [224.89, 215.39, 207.21, 225.15, 252.55, 260.95, 258.84, 254.14, 240.73, 236.04, 222.99, 236.02, 258.03, 247.72, 240.43, 242.69, 269.76, 253.12, 258.02, 250.72, 257.16, 277.42, 276.06, 267.41, 273.77, 274.18], '1Y': [184.3, 186.4, 192.14, 182.06, 176.8, 171.94, 175.65, 174.49, 183.8, 185.39, 190.22, 194.85, 191.65, 192.27, 191.23, 203.48, 206.31, 205.07, 202.06, 204.63, 194.29, 192.39, 191.19, 212.17, 211.71, 218.27, 224.89, 215.39, 207.21, 225.15, 252.55, 260.95, 265.11, 254.14, 240.73, 236.04, 222.99, 236.02, 258.03, 247.72, 240.43, 242.69, 269.76, 253.12, 258.02, 250.72, 257.16, 277.42, 276.06, 267.41, 273.77, 274.18] },
      velocityScore: { '1D': 0.8, '1W': 3.1, '1M': 21.1, '6M': null }, isNew: false,
      marketCap: '$110B', pe: 63.8, revenueGrowth: 19, eps: 4.3, grossMargin: 35, dividendYield: 0.17,
      etfPresence: { AIRR: false, PRN: 4.31, RSHO: false, IDEF: 2.31, BILT: false },
      tonyNote: 'Howmet Aerospace is an aerospace structures and engine components manufacturer. It appears in Industrials ETFs for its aerospace and defense exposure — commercial air travel recovery and defense spending growth are the two demand drivers. Revenue grew and margins are expanding as Howmet prices power over OEM customers.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.79, proScore: 1.12, coverage: 0.4,
      price: 216.52, weeklyPrices: [219.87, 215.14, 218.02, 217.59, 216.52], weeklyChange: -1.52, dayChange: -0.55, sortRank: 0, periodReturns: { '1M': -7.8, 'YTD': 8.2, '6M': -0.5, '1Y': 23.6 },
      priceHistory: { '1D': [217.72, 214.68, 216.52], '1W': [219.87, 215.14, 218.02, 217.59, 216.52], '1M': [234.8, 235.29, 242.97, 246.41, 236.07, 237.22, 244.56, 231.87, 238.21, 245.17, 231.72, 227.74, 232.19, 218.83, 213.56, 216.63, 219.87, 215.14, 218.02, 217.59, 216.52], 'YTD': [200.06, 207.44, 217.65, 215.21, 212.73, 231.2, 241.58, 231.59, 211.9, 202.65, 186.77, 200, 196.9, 224.82, 216.49, 216.36, 212.74, 203.79, 205.55, 216.66, 227.8, 237.06, 236.07, 245.17, 216.63, 216.52], '6M': [217.65, 215.21, 212.73, 223.86, 241.6, 243.04, 219.58, 209.8, 203.42, 194.52, 190.71, 195.43, 224.82, 216.49, 216.36, 207.81, 198.99, 195.79, 215.34, 230.08, 228.01, 234.8, 237.22, 231.72, 216.63, 216.52], '1Y': [175.13, 175.58, 181.26, 203.53, 191.88, 186.26, 192.47, 182.65, 188, 184.91, 182.39, 185.92, 188.45, 185.21, 187.4, 200, 223.06, 219.09, 205.32, 215.87, 209.57, 217.69, 207.33, 208.48, 203.26, 207.51, 217.65, 215.21, 212.73, 223.86, 241.6, 243.04, 225.02, 209.8, 203.42, 194.52, 190.71, 195.43, 224.82, 216.49, 216.36, 207.81, 198.99, 195.79, 215.34, 230.08, 228.01, 234.8, 237.22, 231.72, 216.63, 216.52] },
      velocityScore: { '1D': 0, '1W': 0.9, '1M': -0.9, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 41.5, revenueGrowth: 17, eps: 5.22, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.62, PRN: false, RSHO: 3.96, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.24, proScore: 0.9, coverage: 0.4,
      price: 173.46, weeklyPrices: [186.00, 177.14, 179.83, 176.91, 173.46], weeklyChange: -6.74, dayChange: -1.95, sortRank: 0, periodReturns: { '1M': -11.9, 'YTD': 0.4, '6M': -20.4, '1Y': 24 },
      priceHistory: { '1D': [176.92, 174.66, 174.48, 173.46], '1W': [186, 177.14, 179.83, 176.91, 173.46], '1M': [196.93, 203.07, 205.4, 210, 209.89, 205.65, 204.77, 197.91, 189.25, 194.65, 191.25, 191.06, 196.89, 186.08, 184.11, 186.99, 186, 177.14, 179.83, 176.91, 173.46], 'YTD': [172.84, 193.2, 217.89, 206.04, 206.04, 199.83, 202.25, 207.24, 195.5, 197.82, 199.75, 202.59, 215.98, 238.27, 216.66, 216.18, 215.2, 206.83, 202.66, 195.88, 185.95, 193.94, 209.89, 194.65, 186.99, 173.46], '6M': [217.89, 206.04, 206.04, 203, 201.09, 204.23, 205.83, 200.39, 204.67, 204.85, 191.59, 214.44, 238.27, 216.66, 216.18, 206.15, 206.83, 197.33, 198.95, 187.26, 188.96, 196.93, 205.65, 191.25, 186.99, 173.46], '1Y': [139.85, 143.37, 152.38, 179.74, 176.76, 163.56, 165.6, 160.95, 166.13, 168.38, 175.02, 187.18, 197.01, 203.82, 191.17, 213.69, 198.12, 196.77, 179.81, 178.18, 174.71, 179.65, 168.12, 177.18, 181.85, 201.46, 217.89, 206.04, 206.04, 203, 201.09, 204.23, 216.47, 200.39, 204.67, 204.85, 191.59, 214.44, 238.27, 216.66, 216.18, 206.15, 206.83, 197.33, 198.95, 187.26, 188.96, 196.93, 205.65, 191.25, 186.99, 173.46] },
      velocityScore: { '1D': -1.1, '1W': -3.2, '1M': -4.3, '6M': null }, isNew: false,
      marketCap: '$16B', pe: 46.3, revenueGrowth: 26, eps: 3.75, grossMargin: 23, dividendYield: 0.59,
      etfPresence: { AIRR: 2.92, PRN: false, RSHO: false, IDEF: 1.56, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.82, proScore: 0.73, coverage: 0.4,
      price: 277.17, weeklyPrices: [286.09, 284.86, 280.00, 277.79, 277.17], weeklyChange: -3.12, dayChange: -0.29, sortRank: 0, periodReturns: { '1M': -7.2, 'YTD': -18.5, '6M': -34.9, '1Y': 9.2 },
      priceHistory: { '1D': [277.96, 277.33, 277.45, 277.17], '1W': [286.09, 284.86, 280, 277.79, 277.17], '1M': [298.51, 296.89, 285.43, 278.19, 283.48, 279.62, 279.09, 281.99, 277.39, 279.89, 278.97, 291.5, 294.1, 289.46, 289.47, 286.21, 286.09, 284.86, 280, 277.79, 277.17], 'YTD': [340.07, 378.47, 425.9, 413.56, 420.3, 399.37, 424.89, 443, 421.17, 414.56, 407.98, 381.79, 407.66, 398.07, 378.21, 361.4, 319.54, 334.22, 321.92, 308.17, 293.04, 299.66, 283.48, 279.89, 286.21, 277.17], '6M': [425.9, 413.56, 420.3, 405.82, 417.83, 447.73, 440.33, 429.58, 416.59, 396.57, 369.08, 402.28, 398.07, 378.21, 361.4, 326.13, 333.56, 324.6, 317.56, 293.66, 297.52, 298.51, 279.62, 278.97, 286.21, 277.17], '1Y': [253.82, 265.56, 258.52, 267.49, 269.43, 267.09, 276.39, 269.33, 271.93, 272.46, 277.51, 286.01, 290.83, 284.96, 283.64, 298.42, 306.68, 317.89, 309.74, 314.31, 309.23, 323.14, 321.29, 355.45, 349.75, 386.99, 425.9, 413.56, 420.3, 405.82, 417.83, 447.73, 453.73, 429.58, 416.59, 396.57, 369.08, 402.28, 398.07, 378.21, 361.4, 326.13, 333.56, 324.6, 317.56, 293.66, 297.52, 298.51, 279.62, 278.97, 286.21, 277.17] },
      velocityScore: { '1D': 0, '1W': -3.9, '1M': -2.7, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 18, revenueGrowth: 13, eps: 15.39, grossMargin: 12, dividendYield: 1.99,
      etfPresence: { AIRR: 2.62, PRN: false, RSHO: false, IDEF: 1.02, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 1.79, proScore: 0.72, coverage: 0.4,
      price: 48.42, weeklyPrices: [48.19, 46.96, 50.36, 49.68, 48.42], weeklyChange: 0.48, dayChange: -2.54, sortRank: 0, periodReturns: { '1M': -14.1, 'YTD': -36.2, '6M': -63, '1Y': -10.8 },
      priceHistory: { '1D': [49.68, 48.7, 48.41, 48.42], '1W': [48.19, 46.96, 50.36, 49.68, 48.42], '1M': [56.34, 56.16, 54.21, 51.09, 50.8, 47.95, 46.32, 47.21, 46.95, 49.86, 53.04, 55.35, 53.54, 50.34, 50.38, 48.85, 48.19, 46.96, 50.36, 49.68, 48.42], 'YTD': [75.91, 104.04, 130.72, 111.32, 96.16, 93.48, 97.21, 92.14, 85.54, 89.46, 84.62, 71.94, 74.09, 73.66, 68.55, 61.66, 61.52, 52.49, 55.82, 64.13, 58.52, 57.02, 50.8, 49.86, 48.85, 48.42], '6M': [130.72, 111.32, 96.16, 98.81, 91.97, 90.68, 88.95, 92.47, 89.53, 83.69, 65.28, 71.96, 73.66, 68.55, 61.66, 59.31, 57.33, 53.47, 57.3, 63.27, 56.19, 56.34, 47.95, 53.04, 48.85, 48.42], '1Y': [54.28, 58.78, 58.01, 58.93, 68.75, 64.27, 67.92, 64.5, 65.66, 75.74, 81.18, 92.96, 105.67, 90.58, 84.3, 91.21, 77.41, 76.7, 70.67, 75.77, 72.78, 76.91, 69.77, 79.97, 79.29, 113.7, 130.72, 111.32, 96.16, 98.81, 91.97, 90.68, 90.72, 92.47, 89.53, 83.69, 65.28, 71.96, 73.66, 68.55, 61.66, 59.31, 57.33, 53.47, 57.3, 63.27, 56.19, 56.34, 47.95, 53.04, 48.85, 48.42] },
      velocityScore: { '1D': -1.4, '1W': -1.4, '1M': -7.7, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 284.8, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.62, PRN: false, RSHO: false, IDEF: 0.97, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'AIR', name: 'AIRBUS GROUP', easyScore: 2, avgWeight: 1.35, proScore: 0.54, coverage: 0.4,
      price: 131.86, weeklyPrices: [135.67, 130.90, 134.46, 135.73, 131.86], weeklyChange: -2.81, dayChange: -2.96, sortRank: 0, periodReturns: { '1M': 1.5, 'YTD': 59.3, '6M': 25.5, '1Y': 76.1 },
      priceHistory: { '1D': [135.88, 131.66, 131.86], '1W': [135.67, 130.9, 134.46, 135.73, 131.86], '1M': [129.96, 132.14, 134.88, 134.28, 132.26, 132.94, 138.51, 143.14, 141.85, 142.93, 142.76, 140.11, 143.61, 136.63, 133.3, 136.57, 135.67, 130.9, 134.46, 135.73, 131.86], 'YTD': [82.79, 94.73, 105.08, 104.26, 108, 113.11, 114.63, 118.17, 110.71, 103.78, 101.33, 107.25, 114, 125.99, 116.54, 108.86, 118.71, 107.47, 107.51, 112.62, 116.65, 131.18, 132.26, 142.93, 136.57, 131.86], '6M': [105.08, 104.26, 108, 114.34, 113.54, 118.26, 116.84, 107.87, 105.64, 103.49, 103.16, 113.86, 125.99, 116.54, 108.86, 111.9, 111.51, 100.89, 112.82, 110.61, 120.13, 129.96, 132.94, 142.76, 136.57, 131.86], '1Y': [74.88, 79.45, 75.82, 72.08, 78.68, 71.77, 75.82, 75.68, 74.05, 74.76, 81.62, 84.34, 84.01, 82.79, 81.33, 84.84, 83.6, 83.65, 78.56, 82.98, 82.64, 82.25, 81.21, 86.03, 84.45, 97.03, 105.08, 104.26, 108, 114.34, 113.54, 118.26, 119.77, 107.87, 105.64, 103.49, 103.16, 113.86, 125.99, 116.54, 108.86, 111.9, 111.51, 100.89, 112.82, 110.61, 120.13, 129.96, 132.94, 142.76, 136.57, 131.86] },
      velocityScore: { '1D': 0, '1W': 1.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: 29, revenueGrowth: 25, eps: 4.55, grossMargin: 19, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 2.53, BILT: false },
      tonyNote: 'AIRBUS GROUP appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 1.27, proScore: 0.51, coverage: 0.4,
      price: 74.19, weeklyPrices: [75.02, 74.46, 75.98, 74.38, 74.19], weeklyChange: -1.1, dayChange: -0.24, sortRank: 0, periodReturns: { '1M': 3.8, 'YTD': 23.4, '6M': 20.5, '1Y': 26.9 },
      priceHistory: { '1D': [74.37, 74.31, 74.19, 74.19], '1W': [75.02, 74.46, 75.98, 74.38, 74.19], '1M': [71.48, 71.25, 73.12, 74.95, 75.79, 75.87, 77.53, 77.92, 75.06, 74.34, 72.77, 73.14, 72.82, 75.08, 75.27, 75.45, 75.02, 74.46, 75.98, 74.38, 74.19], 'YTD': [60.11, 61.15, 61.55, 64.29, 66.34, 68.84, 72.14, 74.77, 74.77, 73.52, 72.41, 73.58, 72.59, 71.44, 70.43, 73.04, 73.76, 75.71, 77.88, 71.39, 71.96, 71.49, 75.79, 74.34, 75.45, 74.19], '6M': [61.55, 64.29, 66.34, 67.85, 71.96, 73.5, 75.88, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 79.4, 74.37, 71.31, 71.59, 71.48, 75.87, 72.77, 75.45, 74.19], '1Y': [58.48, 57.71, 59.24, 58.64, 57.86, 57.22, 57.49, 57.73, 58.76, 59.02, 62.86, 63.69, 63.5, 63.78, 62.16, 56.98, 57.54, 60.43, 58.89, 60.22, 61.55, 60.5, 58.84, 59.46, 60.85, 60.32, 61.55, 64.29, 66.34, 67.85, 71.96, 73.5, 76.26, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 79.4, 74.37, 71.31, 71.59, 71.48, 75.87, 72.77, 75.45, 74.19] },
      velocityScore: { '1D': 0, '1W': -8.9, '1M': -7.3, '6M': null }, isNew: false,
      marketCap: '$91B', pe: 32.5, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.82,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.92, IDEF: false, BILT: 1.61 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.16, proScore: 0.46, coverage: 0.4,
      price: 589.34, weeklyPrices: [595.49, 584.59, 588.18, 590.14, 589.34], weeklyChange: -1.03, dayChange: -0.11, sortRank: 0, periodReturns: { '1M': -5.1, 'YTD': 31.4, '6M': 18.1, '1Y': 51.3 },
      priceHistory: { '1D': [589.97, 589.44, 589.49, 589.34], '1W': [595.49, 584.59, 588.18, 590.14, 589.34], '1M': [621.08, 625.73, 639.18, 645.73, 633.44, 638.94, 648.89, 630.36, 634.78, 644.06, 620.47, 604.56, 609.6, 600.26, 593.89, 595.61, 595.49, 584.59, 588.18, 590.14, 589.34], 'YTD': [448.43, 485, 498.82, 504.5, 507.13, 547.51, 551.65, 576.5, 566.06, 547.31, 531.11, 532.25, 552.4, 598.23, 591.32, 594.39, 623.19, 618.91, 571.05, 571.96, 590.09, 616.95, 633.44, 644.06, 595.61, 589.34], '6M': [498.82, 504.5, 507.13, 548.2, 552.93, 571.57, 568.58, 565.64, 546.91, 537.2, 524.38, 553.31, 598.23, 591.32, 594.39, 607.5, 613.1, 565.22, 577.42, 578.34, 592.41, 621.08, 638.94, 620.47, 595.61, 589.34], '1Y': [389.57, 389.3, 384.87, 404.38, 410.61, 392.76, 399.53, 383.6, 378.08, 379.79, 378.54, 384.8, 382.19, 372.71, 393.88, 408.94, 431.36, 445.34, 430.24, 443.29, 438.15, 447.58, 444.99, 458.38, 458.79, 487.16, 498.82, 504.5, 507.13, 548.2, 552.93, 571.57, 584.89, 565.64, 546.91, 537.2, 524.38, 553.31, 598.23, 591.32, 594.39, 607.5, 613.1, 565.22, 577.42, 578.34, 592.41, 621.08, 638.94, 620.47, 595.61, 589.34] },
      velocityScore: { '1D': 0, '1W': -2.1, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 64.8, revenueGrowth: 18, eps: 9.09, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.83, PRN: false, RSHO: false, IDEF: 0.48, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 1.09, proScore: 0.44, coverage: 0.4,
      price: 48.13, weeklyPrices: [50.01, 45.13, 45.83, 48.78, 48.13], weeklyChange: -3.75, dayChange: -1.32, sortRank: 0, periodReturns: { '1M': -6.9, 'YTD': -34.2, '6M': -55.6, '1Y': -10.4 },
      priceHistory: { '1D': [48.78, 48.66, 48.13, 48.13], '1W': [50.01, 45.13, 45.83, 48.78, 48.13], '1M': [51.7, 52.03, 50.37, 47.7, 46.38, 44.84, 46.27, 46.42, 47.1, 49.92, 54.93, 56.37, 53.36, 51.47, 49.96, 50.05, 50.01, 45.13, 45.83, 48.78, 48.13], 'YTD': [73.17, 101.28, 108.5, 108.71, 102.87, 91.25, 81, 88.31, 97.14, 98.98, 99.38, 84.07, 86.1, 90.18, 82.06, 70.3, 63.19, 67.28, 65.76, 57.5, 49.44, 48.27, 46.38, 49.92, 50.05, 48.13], '6M': [108.5, 108.71, 102.87, 97.47, 75.11, 83.6, 91.11, 106.09, 104.08, 102.39, 74.82, 82, 90.18, 82.06, 70.3, 62.89, 62.48, 64.2, 63.52, 54.65, 48.37, 51.7, 44.84, 54.93, 50.05, 48.13], '1Y': [53.74, 49.1, 50.39, 48.6, 51.83, 50.76, 54.65, 53.26, 62.22, 64.11, 66.91, 73.47, 76.6, 75.96, 77.21, 85.79, 79.73, 67.74, 60.93, 67.43, 66.08, 67.27, 64.94, 80.81, 76.85, 106.22, 108.5, 108.71, 102.87, 97.47, 75.11, 83.6, 93.04, 106.09, 104.08, 102.39, 74.82, 82, 90.18, 82.06, 70.3, 62.89, 62.48, 64.2, 63.52, 54.65, 48.37, 51.7, 44.84, 54.93, 50.05, 48.13] },
      velocityScore: { '1D': 7.3, '1W': -2.2, '1M': 7.3, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 209.3, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.99, PRN: false, RSHO: false, IDEF: 0.2, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.04, proScore: 0.42, coverage: 0.4,
      price: 100.33, weeklyPrices: [107.98, 98.26, 100.32, 102.97, 100.33], weeklyChange: -7.08, dayChange: -2.56, sortRank: 0, periodReturns: { '1M': -10.8, 'YTD': 37.4, '6M': -2.6, '1Y': 94.1 },
      priceHistory: { '1D': [102.97, 100.67, 100.33], '1W': [107.98, 98.26, 100.32, 102.97, 100.33], '1M': [112.44, 115.5, 113.91, 111.76, 110.87, 105, 105.57, 109.38, 110.22, 122.33, 123.05, 126.21, 123.07, 115.83, 112.41, 114.25, 107.98, 98.26, 100.32, 102.97, 100.33], 'YTD': [73.01, 88.74, 103.02, 98.89, 93.89, 84.36, 86.66, 89.58, 84.96, 81.44, 77.26, 71.4, 75.76, 84.09, 83.36, 76.53, 91.66, 92.5, 94.81, 111.7, 111.27, 115.93, 110.87, 122.33, 114.25, 100.33], '6M': [103.02, 98.89, 93.89, 85.37, 83.32, 88.76, 89.43, 89.36, 80.71, 78.29, 69.86, 77.53, 84.09, 83.36, 76.53, 82.96, 92.32, 92.8, 97.11, 112.87, 108.82, 112.44, 105, 123.05, 114.25, 100.33], '1Y': [51.68, 52.91, 53, 53.93, 68.39, 64.54, 68.13, 67.47, 71.7, 73.82, 74.27, 81.18, 83.92, 78.15, 75.54, 77.44, 78.19, 73.1, 67.55, 69.62, 70.23, 75.19, 69.63, 74.7, 76.03, 93.48, 103.02, 98.89, 93.89, 85.37, 83.32, 88.76, 91.01, 89.36, 80.71, 78.29, 69.86, 77.53, 84.09, 83.36, 76.53, 82.96, 92.32, 92.8, 97.11, 112.87, 108.82, 112.44, 105, 123.05, 114.25, 100.33] },
      velocityScore: { '1D': 2.4, '1W': -6.7, '1M': -6.7, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.13, PRN: false, RSHO: false, IDEF: 0.96, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.57, proScore: 0.23, coverage: 0.4,
      price: 43.74, weeklyPrices: [44.15, 43.35, 44.37, 43.82, 43.74], weeklyChange: -0.93, dayChange: -0.18, sortRank: 0, periodReturns: { '1M': -4.1, 'YTD': 28.3, '6M': 2.7, '1Y': -8.9 },
      priceHistory: { '1D': [43.82, 43.85, 43.76, 43.74], '1W': [44.15, 43.35, 44.37, 43.82, 43.74], '1M': [45.59, 46.58, 46.08, 44.99, 45.74, 44.69, 44.36, 42.48, 40.95, 42.67, 42.69, 43.72, 45.37, 45.47, 44.71, 44.67, 44.15, 43.35, 44.37, 43.82, 43.74], 'YTD': [34.09, 38.84, 42.57, 40.63, 40.45, 39.48, 39.9, 43.34, 45.82, 45.91, 43.82, 44.84, 46.73, 47.54, 43.2, 40.18, 41.79, 42.5, 44.56, 48.76, 46.15, 46.68, 45.74, 42.67, 44.67, 43.74], '6M': [42.57, 40.63, 40.45, 40.22, 39.13, 43.82, 45.51, 47.41, 45.3, 44.4, 43.25, 46.19, 47.54, 43.2, 40.18, 39.7, 42.87, 42.81, 45.35, 47.39, 47.35, 45.59, 44.69, 42.69, 44.67, 43.74], '1Y': [48.01, 47.53, 43.24, 41.31, 41.9, 41.06, 42.03, 41.79, 41.14, 41.54, 42.55, 44.58, 45.43, 40.19, 39.94, 38.43, 35.76, 35.46, 33.43, 33.69, 33.79, 34.02, 32.55, 34.52, 34.78, 40.99, 42.57, 40.63, 40.45, 40.22, 39.13, 43.82, 45.49, 47.41, 45.3, 44.4, 43.25, 46.19, 47.54, 43.2, 40.18, 39.7, 42.87, 42.81, 45.35, 47.39, 47.35, 45.59, 44.69, 42.69, 44.67, 43.74] },
      velocityScore: { '1D': 0, '1W': 0, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 40.9, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.82,
      etfPresence: { AIRR: 0.85, PRN: false, RSHO: false, IDEF: 0.3, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.39, proScore: 0.15, coverage: 0.4,
      price: 78.2, weeklyPrices: [75.89, 74.74, 77.77, 79.29, 78.20], weeklyChange: 3.04, dayChange: -1.35, sortRank: 0, periodReturns: { '1M': 2.6, 'YTD': 16.7, '6M': 4.1, '1Y': 54 },
      priceHistory: { '1D': [79.27, 77.63, 78.2], '1W': [75.89, 74.74, 77.77, 79.29, 78.2], '1M': [76.19, 77.89, 77.99, 81.5, 81, 82.36, 81.56, 79.53, 81.88, 82.97, 79.51, 76.75, 79.91, 74.87, 75.49, 74.98, 75.89, 74.74, 77.77, 79.29, 78.2], 'YTD': [67.02, 70.17, 75.09, 77.34, 80.11, 86, 81.1, 89.38, 71.12, 69.2, 69.34, 76.15, 77.66, 86.16, 85.11, 86.87, 96.98, 80.64, 76.99, 71.49, 70.53, 76.55, 81, 82.97, 74.98, 78.2], '6M': [75.09, 77.34, 80.11, 84.07, 82.24, 85.87, 69.95, 72.04, 71.31, 72.44, 72.83, 77.31, 86.16, 85.11, 86.87, 97.31, 82.69, 74.91, 74.47, 74.29, 71.48, 76.19, 82.36, 79.51, 74.98, 78.2], '1Y': [50.77, 49.17, 47.65, 47.28, 57.75, 55.99, 58.79, 59.03, 62.46, 63.62, 64.78, 63.75, 63.58, 63.3, 64.22, 69.34, 67.92, 62.28, 60.11, 67.56, 67.63, 67.56, 66.02, 68.93, 69.35, 70.53, 75.09, 77.34, 80.11, 84.07, 82.24, 85.87, 73.57, 72.04, 71.31, 72.44, 72.83, 77.31, 86.16, 85.11, 86.87, 97.31, 82.69, 74.91, 74.47, 74.29, 71.48, 76.19, 82.36, 79.51, 74.98, 78.2] },
      velocityScore: { '1D': 0, '1W': 0, '1M': 7.1, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 53.6, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.3,
      etfPresence: { AIRR: 0.73, PRN: false, RSHO: false, IDEF: 0.04, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 8.72, proScore: 1.74, coverage: 0.2,
      price: 195.28, weeklyPrices: [195.93, 196.39, 193.39, 195.89, 195.28], weeklyChange: -0.33, dayChange: -0.31, sortRank: 0, periodReturns: { '1M': 4.6, 'YTD': 6.5, '6M': -3.3, '1Y': 30 },
      priceHistory: { '1D': [195.89, 196.46, 195.27, 195.28], '1W': [195.93, 196.39, 193.39, 195.89, 195.28], '1M': [186.77, 192.58, 185.6, 181.83, 186.39, 185.06, 186.59, 187.99, 187.33, 189.73, 191.78, 199.25, 201.37, 200.85, 194.91, 195.2, 195.93, 196.39, 193.39, 195.89, 195.28], 'YTD': [183.4, 187.17, 201.92, 194.13, 201.09, 195.19, 204.81, 197.63, 203.86, 203.04, 198.16, 189.71, 198.41, 202.81, 187.17, 175.68, 176.74, 178.11, 174.85, 179.66, 180.99, 183.64, 186.39, 189.73, 195.2, 195.28], '6M': [201.92, 194.13, 201.09, 196.19, 203.5, 198.46, 206.52, 208.23, 206.06, 194.82, 187.15, 197.92, 202.81, 187.17, 175.68, 172.87, 178.89, 174.49, 176.59, 174.26, 181.56, 186.77, 185.06, 191.78, 195.2, 195.28], '1Y': [150.17, 156.49, 158.4, 155.75, 155.71, 156.59, 159.84, 158.11, 155, 158.31, 161.38, 167.2, 168.57, 157, 177.98, 176.36, 174, 177.69, 173.77, 173.19, 168.45, 174.72, 177.2, 186.38, 187.25, 188.5, 201.92, 194.13, 201.09, 196.19, 203.5, 198.46, 212.16, 208.23, 206.06, 194.82, 187.15, 197.92, 202.81, 187.17, 175.68, 172.87, 178.89, 174.49, 176.59, 174.26, 181.56, 186.77, 185.06, 191.78, 195.2, 195.28] },
      velocityScore: { '1D': 1.2, '1W': null, '1M': 10.1, '6M': null }, isNew: false,
      marketCap: '$263B', pe: 36.1, revenueGrowth: 9, eps: 5.41, grossMargin: 20, dividendYield: 1.49,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 8.72, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'TIMKEN CO/THE', easyScore: 1, avgWeight: 8.69, proScore: 1.74, coverage: 0.2,
      price: 139.68, weeklyPrices: [137.31, 138.34, 139.60, 139.47, 139.68], weeklyChange: 1.72, dayChange: 0.18, sortRank: 0, periodReturns: { '1M': -0.4, 'YTD': 66, '6M': 49.3, '1Y': 82.2 },
      priceHistory: { '1D': [139.43, 139.17, 139.15, 139.68], '1W': [137.31, 138.34, 139.6, 139.47, 139.68], '1M': [140.28, 139.4, 142.36, 141.97, 137.64, 137.99, 144.01, 141.22, 143.5, 145.32, 141.75, 139.16, 142.36, 138.06, 137.23, 137.93, 137.31, 138.34, 139.6, 139.47, 139.68], 'YTD': [84.13, 90.6, 93.55, 94.02, 94.99, 109.41, 107.23, 109.88, 103.05, 99.7, 95.25, 97.56, 98.94, 106.81, 108.75, 106.88, 119.7, 115.74, 117.2, 127.98, 131.83, 139.12, 137.64, 145.32, 137.93, 139.68], '6M': [93.55, 94.02, 94.99, 108.93, 105.54, 109.52, 106.58, 100.58, 98.74, 98.99, 95.94, 99.17, 106.81, 108.75, 106.88, 109.63, 117.12, 109.36, 127.16, 131.9, 137.09, 140.28, 137.99, 141.75, 137.93, 139.68], '1Y': [76.68, 80.99, 74.77, 73.57, 80.39, 75.86, 79.01, 75.12, 76.4, 77.11, 75.67, 75.11, 75.86, 74.7, 75.85, 79.25, 78.46, 78.66, 74.82, 81.36, 82.52, 87.53, 84.14, 86.02, 86.29, 91.17, 93.55, 94.02, 94.99, 108.93, 105.54, 109.52, 109.99, 100.58, 98.74, 98.99, 95.94, 99.17, 106.81, 108.75, 106.88, 109.63, 117.12, 109.36, 127.16, 131.9, 137.09, 140.28, 137.99, 141.75, 137.93, 139.68] },
      velocityScore: { '1D': 0, '1W': 0, '1M': -6.5, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 31.8, revenueGrowth: 8, eps: 4.39, grossMargin: 31, dividendYield: 1.03,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.69, IDEF: false, BILT: false },
      tonyNote: 'TIMKEN CO/THE appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.11, proScore: 4.11, coverage: 1,
      price: 192, weeklyPrices: [219.65, 210.51, 194.09, 199.51, 192.00], weeklyChange: -12.59, dayChange: -3.76, sortRank: 0, periodReturns: { '1M': -27.6, 'YTD': 129.4, '6M': 76.6, '1Y': 260.2 },
      priceHistory: { '1D': [199.51, 191.4, 191, 192], '1W': [219.65, 210.51, 194.09, 199.51, 192], '1M': [265.1, 280.91, 286.69, 283.61, 275.25, 259.66, 256.63, 240.3, 261.15, 276.17, 229.18, 215.62, 213.02, 195.19, 216.48, 216.2, 219.65, 210.51, 194.09, 199.51, 192], 'YTD': [83.71, 97.3, 108.73, 91.46, 88.16, 91.79, 101.8, 104.88, 95.65, 108.04, 117.62, 100.82, 112.54, 161.94, 156.55, 135.51, 195.09, 207.27, 191.82, 231.09, 227.81, 260.07, 275.25, 276.17, 216.2, 192], '6M': [108.73, 91.46, 88.16, 92.88, 97.52, 102.58, 86.8, 94.94, 129.85, 114.15, 92.26, 117.4, 161.94, 156.55, 135.51, 175.92, 179.11, 197.73, 208.37, 260.58, 220.12, 265.1, 259.66, 229.18, 216.2, 192], '1Y': [53.31, 51.88, 51.29, 55.09, 70.63, 67.47, 70.1, 65.65, 93.39, 94.08, 113.23, 115.61, 122, 125.83, 98.62, 125.1, 117, 94.36, 95.07, 94.69, 98.92, 93.59, 75.45, 91.13, 89.95, 97.93, 108.73, 91.46, 88.16, 92.88, 97.52, 102.58, 91.01, 94.94, 129.85, 114.15, 92.26, 117.4, 161.94, 156.55, 135.51, 175.92, 179.11, 197.73, 208.37, 260.58, 220.12, 265.1, 259.66, 229.18, 216.2, 192] },
      velocityScore: { '1D': -4.2, '1W': -3.3, '1M': -7, '6M': null }, isNew: false,
      marketCap: '$49B', pe: 74.1, revenueGrowth: 684, eps: 2.59, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 3.03, MEME: 6.11, RKNG: 3.2 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 5.59, proScore: 3.73, coverage: 0.667,
      price: 224.41, weeklyPrices: [244.61, 233.49, 243.40, 239.38, 224.41], weeklyChange: -8.26, dayChange: -6.24, sortRank: 0, periodReturns: { '1M': -20.1, 'YTD': 158.3, '6M': 50.1, '1Y': 808.9 },
      priceHistory: { '1D': [239.36, 226.39, 226.04, 224.41], '1W': [244.61, 233.49, 243.4, 239.38, 224.41], '1M': [280.88, 284.99, 328.91, 345.85, 321.98, 326.19, 309.18, 252.02, 275.01, 302.7, 289.5, 270.89, 295.05, 269.57, 254.29, 257.02, 244.61, 233.49, 243.4, 239.38, 224.41], 'YTD': [86.89, 121.84, 149.5, 139.62, 156.13, 148.7, 157.27, 168.57, 159.99, 157.17, 150.12, 133.24, 135, 219.03, 220.91, 226.37, 285.47, 289.76, 282.31, 285, 263.61, 274.5, 321.98, 302.7, 257.02, 224.41], '6M': [149.5, 139.62, 156.13, 155.17, 145.32, 166.2, 153.02, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 261.34, 293.8, 302.85, 259.61, 280.88, 326.19, 289.5, 257.02, 224.41], '1Y': [24.69, 26.89, 37.62, 38.86, 44.08, 44.51, 50.85, 52.45, 62.96, 79.67, 69.18, 90.19, 87.58, 116.58, 94.37, 133.71, 141.41, 126.72, 108.93, 101.14, 102.5, 101.29, 76.97, 91.88, 98.69, 134.07, 149.5, 139.62, 156.13, 155.17, 145.32, 166.2, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 261.34, 293.8, 302.85, 259.61, 280.88, 326.19, 289.5, 257.02, 224.41] },
      velocityScore: { '1D': 4.2, '1W': 2.8, '1M': 17.7, '6M': null }, isNew: false,
      marketCap: '$64B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.61, RKNG: 3.57 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 2, avgWeight: 4.76, proScore: 3.17, coverage: 0.667,
      price: 105.6, weeklyPrices: [119.92, 111.88, 125.45, 109.09, 105.60], weeklyChange: -11.94, dayChange: -3.2, sortRank: 0, periodReturns: { '1M': -38.2, 'YTD': 202.9, '6M': 185.1, '1Y': 264.3 },
      priceHistory: { '1D': [109.09, 104, 104.26, 105.6], '1W': [119.92, 111.88, 125.45, 109.09, 105.6], '1M': [170.81, 167.34, 161.85, 171.23, 147.44, 146.97, 138.54, 135.69, 150.1, 148.16, 139, 120.95, 123.36, 114.41, 114.44, 122.21, 119.92, 111.88, 125.45, 109.09, 105.6], 'YTD': [34.86, 33.01, 37.04, 34.89, 44.16, 48.49, 43.44, 53.69, 101.14, 106.19, 87.54, 98.21, 107.45, 146.39, 150.57, 137.26, 178.54, 223.1, 165.26, 158.41, 177, 191.55, 147.44, 148.16, 122.21, 105.6], '6M': [37.04, 34.89, 44.16, 47.91, 43.91, 56.27, 95.34, 110.62, 94.07, 95.76, 85.19, 117.64, 146.39, 150.57, 137.26, 180.57, 188.28, 171.33, 179.83, 202.37, 162.88, 170.81, 146.97, 139, 122.21, 105.6], '1Y': [28.99, 26.31, 23.06, 23.23, 23.02, 21.93, 24.05, 23.02, 27.72, 29.47, 26.69, 28.42, 32.22, 32.95, 29.98, 35.48, 31.51, 23.94, 20.87, 25.57, 25.65, 34.98, 27.14, 41, 39.6, 34.04, 37.04, 34.89, 44.16, 47.91, 43.91, 56.27, 102.51, 110.62, 94.07, 95.76, 85.19, 117.64, 146.39, 150.57, 137.26, 180.57, 188.28, 171.33, 179.83, 202.37, 162.88, 170.81, 146.97, 139, 122.21, 105.6] },
      velocityScore: { '1D': 42.8, '1W': 38.4, '1M': -16.1, '6M': null }, isNew: false,
      marketCap: '$8B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.66, RKNG: 2.86 },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 4.48, proScore: 2.99, coverage: 0.667,
      price: 1532.48, weeklyPrices: [1915.92, 1673.97, 1757.82, 1615.00, 1532.48], weeklyChange: -20.01, dayChange: -5.11, sortRank: 0, periodReturns: { '1M': -23.1, 'YTD': 545.6, '6M': 270.5, '1Y': 3605.2 },
      priceHistory: { '1D': [1615, 1536.74, 1534.3, 1532.48], '1W': [1915.92, 1673.97, 1757.82, 1615, 1532.48], '1M': [1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745, 1744.43, 1617.7, 1727.18, 1858.27, 1915.92, 1673.97, 1757.82, 1615, 1532.48], 'YTD': [237.38, 334.54, 413.62, 470.8, 665.24, 541.64, 600.4, 651.9, 565.59, 618.82, 709.71, 615.83, 724.63, 944.46, 903.49, 1002.35, 1409.98, 1447.23, 1392.56, 1694.98, 1559.32, 2107.86, 1963.6, 2273.73, 1858.27, 1532.48], '6M': [413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 565.41, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1716.36, 1646.54, 1991.55, 1914.46, 2032.22, 1858.27, 1532.48], '1Y': [41.36, 43, 43.39, 42.1, 47.01, 44.4, 48.44, 53.01, 73.92, 93.97, 99.83, 121.12, 131.88, 144.3, 146.95, 204.36, 216.5, 283.1, 245.96, 215.04, 194.38, 232.86, 206.83, 250.08, 275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1716.36, 1646.54, 1991.55, 1914.46, 2032.22, 1858.27, 1532.48] },
      velocityScore: { '1D': null, '1W': -6, '1M': -28.1, '6M': null }, isNew: true,
      marketCap: '$227B', pe: 52.4, revenueGrowth: 251, eps: 29.23, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.52, RKNG: 3.44 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'LITE', name: 'LITE', easyScore: 2, avgWeight: 4.28, proScore: 2.85, coverage: 0.667,
      price: 728.01, weeklyPrices: [802.01, 768.15, 814.80, 752.00, 728.01], weeklyChange: -9.23, dayChange: -3.19, sortRank: 0, periodReturns: { '1M': -16.8, 'YTD': 97.5, '6M': 124.5, '1Y': 630.7 },
      priceHistory: { '1D': [752, 732.45, 730.22, 728.01], '1W': [802.01, 768.15, 814.8, 752, 728.01], '1M': [875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06, 801.16, 728.32, 731.25, 698.91, 707.1, 785.77, 802.01, 768.15, 814.8, 752, 728.01], 'YTD': [368.59, 348.26, 324.25, 332.45, 423.42, 561.13, 594.26, 677, 650.82, 616.09, 706.35, 702.73, 772.28, 852.79, 836.92, 791.37, 944.28, 1030.37, 868.07, 854.96, 863.66, 957.24, 827.92, 858.06, 785.77, 728.01], '6M': [324.25, 332.45, 423.42, 577.15, 600.42, 688.27, 694.43, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 890.09, 902.31, 1029.15, 821.76, 875.36, 842.53, 801.16, 785.77, 728.01], '1Y': [99.63, 102.13, 109.85, 110.01, 120.23, 115.89, 125.84, 134.12, 164.88, 163.34, 152.75, 171.4, 163.09, 156.57, 158.06, 214.28, 232.75, 253.81, 268.92, 308.28, 302.98, 366, 320.25, 395.92, 386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 600.42, 688.27, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 890.09, 902.31, 1029.15, 821.76, 875.36, 842.53, 801.16, 785.77, 728.01] },
      velocityScore: { '1D': 63.8, '1W': 6.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$57B', pe: 127.3, revenueGrowth: 90, eps: 5.72, grossMargin: 41, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.24, RKNG: 3.32 },
      tonyNote: 'LITE appears in 2 of 3 Meme ETFs (67% coverage) with average weight 4.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 2, avgWeight: 4.08, proScore: 2.72, coverage: 0.667,
      price: 37.31, weeklyPrices: [41.14, 38.98, 38.59, 38.28, 37.31], weeklyChange: -9.32, dayChange: -2.54, sortRank: 0, periodReturns: { '1M': -37, 'YTD': -1.2, '6M': -35.5, '1Y': 115.5 },
      priceHistory: { '1D': [38.28, 37.06, 37.22, 37.31], '1W': [41.14, 38.98, 38.59, 38.28, 37.31], '1M': [59.18, 58.11, 59.96, 56.87, 54.72, 50.3, 47.74, 47.21, 45.91, 45.73, 43.32, 38.82, 43.91, 39.81, 43.01, 41.72, 41.14, 38.98, 38.59, 38.28, 37.31], 'YTD': [37.77, 45.68, 57.82, 52.36, 53.08, 42.93, 42.08, 44.24, 40.13, 41.37, 41.29, 35.09, 35.13, 47.37, 45.17, 44.44, 60.98, 55.17, 52.71, 63.54, 54.35, 60.85, 54.72, 45.73, 41.72, 37.31], '6M': [57.82, 52.36, 53.08, 46.15, 40.97, 45.45, 38.85, 38.84, 44.94, 42.16, 31.62, 35.74, 47.37, 45.17, 44.44, 54.74, 56.56, 47.74, 67.84, 66.6, 54.02, 59.18, 50.3, 43.32, 41.72, 37.31], '1Y': [17.31, 18.99, 16.14, 18.32, 17.73, 19.76, 22.35, 28.21, 33.63, 37.9, 47.14, 47.08, 60.09, 67.98, 51.83, 60.42, 76.41, 55.7, 45.83, 48.45, 43.96, 43.92, 33.78, 41.98, 42.7, 46.03, 57.82, 52.36, 53.08, 46.15, 40.97, 45.45, 41.39, 38.84, 44.94, 42.16, 31.62, 35.74, 47.37, 45.17, 44.44, 54.74, 56.56, 47.74, 67.84, 66.6, 54.02, 59.18, 50.3, 43.32, 41.72, 37.31] },
      velocityScore: { '1D': 0.4, '1W': -9, '1M': -30.4, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 48.5, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 2.23, MEME: 5.94, RKNG: false },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'WULF', name: 'WULF', easyScore: 2, avgWeight: 4.03, proScore: 2.69, coverage: 0.667,
      price: 18.69, weeklyPrices: [21.97, 20.89, 19.41, 19.37, 18.69], weeklyChange: -14.93, dayChange: -3.51, sortRank: 0, periodReturns: { '1M': -33.3, 'YTD': 62.7, '6M': 34.9, '1Y': 256 },
      priceHistory: { '1D': [19.37, 18.56, 18.66, 18.69], '1W': [21.97, 20.89, 19.41, 19.37, 18.69], '1M': [28.01, 27.86, 28.98, 28.31, 28.78, 26.97, 26.06, 25.83, 25.58, 24.7, 23.58, 21.18, 22.21, 20.24, 22.83, 23.2, 21.97, 20.89, 19.41, 19.37, 18.69], 'YTD': [11.49, 12.84, 13.85, 13.79, 13.44, 16.63, 15.38, 17.88, 15.23, 14.67, 15.1, 14.89, 15.55, 20.95, 19.77, 20.8, 25.74, 23.12, 21.63, 25.56, 24, 28.17, 28.78, 24.7, 23.2, 18.69], '6M': [13.85, 13.79, 13.44, 16.65, 16.18, 17.56, 14.74, 13.85, 16.41, 16.19, 13.7, 16.57, 20.95, 19.77, 20.8, 23.49, 22.8, 21.34, 26.74, 26.49, 25.3, 28.01, 26.97, 23.58, 23.2, 18.69], '1Y': [5.25, 5.2, 5.01, 5.15, 5.46, 9.28, 9.13, 8.98, 10.55, 11.35, 11.4, 11.47, 12.3, 15.47, 12.62, 14.5, 15.36, 12.64, 12.23, 14.84, 14.43, 15.76, 11.57, 12.31, 12.74, 13.1, 13.85, 13.79, 13.44, 16.65, 16.18, 17.56, 16.02, 13.85, 16.41, 16.19, 13.7, 16.57, 20.95, 19.77, 20.8, 23.49, 22.8, 21.34, 26.74, 26.49, 25.3, 28.01, 26.97, 23.58, 23.2, 18.69] },
      velocityScore: { '1D': -6.3, '1W': -11.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: -1, eps: -2.51, grossMargin: 64, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.21, RKNG: 2.85 },
      tonyNote: 'WULF appears in 2 of 3 Meme ETFs (67% coverage) with average weight 4.0% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 2, avgWeight: 3.96, proScore: 2.64, coverage: 0.667,
      price: 59.98, weeklyPrices: [73.32, 67.58, 68.82, 66.31, 59.98], weeklyChange: -18.19, dayChange: -9.55, sortRank: 0, periodReturns: { '1M': -27.1, 'YTD': -17.4, '6M': -48.2, '1Y': 14 },
      priceHistory: { '1D': [66.31, 61.31, 59.8, 59.98], '1W': [73.32, 67.58, 68.82, 66.31, 59.98], '1M': [82.25, 85.43, 80.66, 73.19, 72.87, 68.01, 65.62, 71.45, 86.77, 88.86, 86.1, 85.13, 80.64, 74.21, 74.95, 73.88, 73.32, 67.58, 68.82, 66.31, 59.98], 'YTD': [72.63, 90.56, 115.77, 104.78, 104.55, 96.27, 84.43, 85.76, 93.86, 87.09, 89.93, 78.67, 94.81, 88.57, 80.01, 71.88, 70.68, 74.81, 89.58, 113.41, 93.6, 87.57, 72.87, 88.86, 73.88, 59.98], '6M': [115.77, 104.78, 104.55, 102.12, 83.03, 85.82, 92.68, 89.76, 89.11, 88.42, 73.82, 92.57, 88.57, 80.01, 71.88, 63.87, 72.96, 88.1, 129.6, 118.17, 88.71, 82.25, 68.01, 86.1, 73.88, 59.98], '1Y': [52.63, 58.92, 54.29, 51.79, 50.05, 45.08, 48.25, 45.22, 37.58, 41.19, 54.5, 56.94, 81.2, 95.69, 71.35, 80.06, 70.38, 64.49, 58.01, 55.52, 61.44, 79.05, 61.86, 78.05, 83.47, 97.67, 115.77, 104.78, 104.55, 102.12, 83.03, 85.82, 86.92, 89.76, 89.11, 88.42, 73.82, 92.57, 88.57, 80.01, 71.88, 63.87, 72.96, 88.1, 129.6, 118.17, 88.71, 82.25, 68.01, 86.1, 73.88, 59.98] },
      velocityScore: { '1D': 0.4, '1W': 3.1, '1M': -33.8, '6M': null }, isNew: false,
      marketCap: '$23B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.31, MEME: 5.61, RKNG: false },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'AMD', name: 'AMD', easyScore: 2, avgWeight: 3.81, proScore: 2.54, coverage: 0.667,
      price: 512.78, weeklyPrices: [557.89, 534.39, 548.13, 529.14, 512.78], weeklyChange: -8.09, dayChange: -3.09, sortRank: 0, periodReturns: { '1M': 1.1, 'YTD': 139.4, '6M': 121.2, '1Y': 220.3 },
      priceHistory: { '1D': [529.14, 516.07, 512.78], '1W': [557.89, 534.39, 548.13, 529.14, 512.78], '1M': [507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 517.41, 546.72, 557.89, 534.39, 548.13, 529.14, 512.78], 'YTD': [214.16, 204.68, 231.83, 251.31, 246.27, 213.57, 200.12, 203.68, 199.45, 197.74, 201.33, 201.99, 220.18, 255.07, 284.49, 323.21, 421.39, 445.5, 447.58, 516.1, 466.38, 547.26, 519.85, 580.91, 546.72, 512.78], '6M': [231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 521.54, 475.51, 507.29, 519.74, 540.88, 546.72, 512.78], '1Y': [160.08, 158.65, 179.51, 163.12, 184.42, 165.2, 167.13, 162.13, 159.54, 159.16, 160.88, 164.01, 235.56, 238.6, 230.23, 264.33, 256.33, 258.89, 223.55, 214.24, 217.6, 221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 521.54, 475.51, 507.29, 519.74, 540.88, 546.72, 512.78] },
      velocityScore: { '1D': 0.4, '1W': 8.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$836B', pe: 169.8, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { BUZZ: 3.5, MEME: false, RKNG: 4.11 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 3.44, proScore: 2.29, coverage: 0.667,
      price: 876.46, weeklyPrices: [979.30, 937.00, 983.12, 904.28, 876.46], weeklyChange: -10.5, dayChange: -3.08, sortRank: 0, periodReturns: { '1M': -14.1, 'YTD': 207.1, '6M': 141.6, '1Y': 652.8 },
      priceHistory: { '1D': [904.28, 878.35, 876.46], '1W': [979.3, 937, 983.12, 904.28, 876.46], '1M': [1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 948.8, 991.64, 979.3, 937, 983.12, 904.28, 876.46], 'YTD': [285.41, 327.02, 362.75, 389.09, 437.8, 373.25, 420.95, 415.56, 397.05, 405.35, 422.9, 357.22, 377.76, 465.66, 449.38, 504.29, 666.59, 803.63, 731.99, 971, 864.01, 1087.99, 1051.77, 1154.29, 991.64, 876.46], '6M': [362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1064.1, 935.89, 1020.76, 1048.51, 1032.28, 991.64, 876.46], '1Y': [116.43, 109.83, 114.74, 108.78, 124.27, 117.21, 117.75, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 198.47, 226.63, 237.5, 244.9, 225.92, 230.26, 234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1064.1, 935.89, 1020.76, 1048.51, 1032.28, 991.64, 876.46] },
      velocityScore: { '1D': 1.3, '1W': 3.6, '1M': -28.2, '6M': null }, isNew: false,
      marketCap: '$990B', pe: 19.8, revenueGrowth: 346, eps: 44.22, grossMargin: 73, dividendYield: 0.06,
      etfPresence: { BUZZ: 3.02, MEME: false, RKNG: 3.85 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'DELL', name: 'DELL', easyScore: 2, avgWeight: 3, proScore: 2, coverage: 0.667,
      price: 407, weeklyPrices: [434.97, 427.11, 457.54, 412.68, 407.00], weeklyChange: -6.43, dayChange: -1.25, sortRank: 0, periodReturns: { '1M': 0.7, 'YTD': 223.3, '6M': 237.7, '1Y': 229.4 },
      priceHistory: { '1D': [412.17, 409.57, 407.38, 407], '1W': [434.97, 427.11, 457.54, 412.68, 407], '1M': [404.08, 419.32, 409.5, 418.71, 427.78, 434.06, 409.45, 399.49, 414.61, 431.46, 425.25, 394.32, 411.8, 417.28, 431.97, 450.22, 434.97, 427.11, 457.54, 412.68, 407], 'YTD': [125.88, 118.5, 120.53, 115.93, 119.16, 126.01, 116.78, 121.45, 146.52, 149.91, 157.67, 171.81, 173.18, 184.51, 212.36, 205.93, 238.8, 243.87, 242.93, 420.91, 394.39, 409.07, 427.78, 431.46, 450.22, 407], '6M': [120.53, 115.93, 119.16, 120.91, 116.09, 119.78, 145.18, 146.51, 156.54, 164.59, 164.66, 177.69, 184.51, 212.36, 205.93, 216.32, 238.94, 235.26, 305.32, 435.31, 381.78, 404.08, 434.06, 425.25, 450.22, 407], '1Y': [123.57, 127.22, 133.54, 128.14, 139.14, 128.48, 132.5, 124.02, 124.45, 130.34, 132.09, 149.68, 164.53, 153.7, 150.13, 163.6, 152.41, 140.71, 119.38, 133.26, 133.63, 140.63, 127.89, 128.38, 127.8, 120.62, 120.53, 115.93, 119.16, 120.91, 116.09, 119.78, 153.55, 146.51, 156.54, 164.59, 164.66, 177.69, 184.51, 212.36, 205.93, 216.32, 238.94, 235.26, 305.32, 435.31, 381.78, 404.08, 434.06, 425.25, 450.22, 407] },
      velocityScore: { '1D': 3.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$263B', pe: 36, revenueGrowth: 88, eps: 11.31, grossMargin: 19, dividendYield: 0.61,
      etfPresence: { BUZZ: 1.59, MEME: false, RKNG: 4.4 },
      tonyNote: 'DELL appears in 2 of 3 Meme ETFs (67% coverage) with average weight 3.0% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HIMS', name: 'HIMS', easyScore: 1, avgWeight: 6.2, proScore: 2.07, coverage: 0.333,
      price: 36.9, weeklyPrices: [34.38, 34.38, 35.15, 37.17, 36.90], weeklyChange: 7.32, dayChange: -0.66, sortRank: 0, periodReturns: { '1M': 17.2, 'YTD': 13.6, '6M': 17.6, '1Y': -28.8 },
      priceHistory: { '1D': [37.14, 37.3, 37.1, 36.9], '1W': [34.38, 34.38, 35.15, 37.17, 36.9], '1M': [31.47, 31.89, 35.47, 33.54, 32.96, 32.7, 32.71, 33.94, 33.39, 34.67, 37.57, 36.8, 38.28, 36.17, 36.07, 35.45, 34.38, 34.38, 35.15, 37.17, 36.9], 'YTD': [32.47, 33.87, 31.38, 30.28, 26.44, 17.24, 15.84, 15.6, 15.88, 23.84, 22.02, 19.38, 20.33, 21.36, 29.76, 27.91, 26.88, 24.14, 23.04, 26.15, 26.19, 30.17, 32.96, 34.67, 35.45, 36.9], '6M': [31.38, 30.28, 26.44, 19.33, 16.27, 15.46, 15.82, 22.16, 24.88, 22.46, 18.78, 19.5, 21.36, 29.76, 27.91, 26.33, 25.03, 22.44, 25.2, 27.51, 28.98, 31.47, 32.7, 37.57, 35.45, 36.9], '1Y': [51.85, 58.02, 65.53, 51.13, 48.33, 43.38, 44.01, 44.46, 47.78, 50.35, 53.25, 56.31, 58.17, 62.76, 47.46, 46.63, 43.73, 39.02, 35.83, 38.4, 37.07, 37.88, 34.97, 34.67, 33.41, 31.69, 31.38, 30.28, 26.44, 19.33, 16.27, 15.46, 16.48, 22.16, 24.88, 22.46, 18.78, 19.5, 21.36, 29.76, 27.91, 26.33, 25.03, 22.44, 25.2, 27.51, 28.98, 31.47, 32.7, 37.57, 35.45, 36.9] },
      velocityScore: { '1D': 11.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: 4, eps: -0.09, grossMargin: 73, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.2, RKNG: false },
      tonyNote: 'HIMS appears in 1 of 3 Meme ETFs (33% coverage) with average weight 6.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 1, avgWeight: 5.26, proScore: 1.75, coverage: 0.333,
      price: 27.95, weeklyPrices: [31.15, 28.84, 28.47, 29.03, 27.95], weeklyChange: -10.29, dayChange: -3.74, sortRank: 0, periodReturns: { '1M': -39.6, 'YTD': 14, '6M': -25.3, '1Y': 177.8 },
      priceHistory: { '1D': [29.03, 27.91, 27.89, 27.95], '1W': [31.15, 28.84, 28.47, 29.03, 27.95], '1M': [46.27, 45.57, 46.59, 45.2, 45.27, 41.98, 40.95, 39.16, 37.77, 37.3, 35.52, 33.06, 33.5, 30.71, 31.44, 32.29, 31.15, 28.84, 28.47, 29.03, 27.95], 'YTD': [24.52, 31.94, 37.4, 36.18, 34.8, 37.47, 31.91, 28.65, 28.09, 27.48, 25.93, 23.76, 25.19, 31.47, 31.32, 32.11, 44.24, 45.48, 39.52, 47.28, 39.62, 46.47, 45.27, 37.3, 32.29, 27.95], '6M': [37.4, 36.18, 34.8, 38.26, 33.56, 30.66, 26.15, 27.03, 27.71, 27.26, 20.55, 25.18, 31.47, 31.32, 32.11, 39.88, 43.93, 36.62, 48.98, 47.86, 41.91, 46.27, 41.98, 35.52, 32.29, 27.95], '1Y': [10.06, 10.93, 10.03, 14.79, 14.8, 15.72, 16.7, 14.38, 16.98, 19.83, 23.45, 25, 27.94, 37.76, 30.62, 34.42, 33.09, 26.41, 23.09, 24.94, 29.36, 30.99, 22, 25.72, 28.11, 37.68, 37.4, 36.18, 34.8, 38.26, 33.56, 30.66, 27.93, 27.03, 27.71, 27.26, 20.55, 25.18, 31.47, 31.32, 32.11, 39.88, 43.93, 36.62, 48.98, 47.86, 41.91, 46.27, 41.98, 35.52, 32.29, 27.95] },
      velocityScore: { '1D': 2.9, '1W': 0, '1M': -52.6, '6M': null }, isNew: false,
      marketCap: '$8B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.26, RKNG: false },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 1, avgWeight: 5.05, proScore: 1.68, coverage: 0.333,
      price: 36.69, weeklyPrices: [42.86, 38.88, 39.29, 37.51, 36.69], weeklyChange: -14.4, dayChange: -2.19, sortRank: 0, periodReturns: { '1M': -34.6, 'YTD': -18.2, '6M': -27.8, '1Y': -15.7 },
      priceHistory: { '1D': [37.51, 36.69, 36.57, 36.69], '1W': [42.86, 38.88, 39.29, 37.51, 36.69], '1M': [56.06, 54.69, 56.55, 58.32, 57.85, 53.6, 50.56, 49.31, 53.88, 53.26, 51.4, 49.12, 48.87, 45.36, 45.08, 44.77, 42.86, 38.88, 39.29, 37.51, 36.69], 'YTD': [44.87, 50.45, 50.8, 43.37, 38.56, 35.19, 33.34, 40.88, 36.02, 33.03, 31.2, 27.51, 29.24, 35.76, 46.28, 43.08, 52.57, 55.26, 52.47, 72.07, 56.78, 61.18, 57.85, 53.26, 44.77, 36.69], '6M': [50.8, 43.37, 38.56, 35.48, 33.18, 31.62, 37.05, 35.87, 33.29, 33.11, 26.59, 28.49, 35.76, 46.28, 43.08, 48, 55.87, 48.44, 65.4, 71.4, 56.69, 56.06, 53.6, 51.4, 44.77, 36.69], '1Y': [43.54, 43.28, 39.88, 41.23, 41.21, 36.79, 41.42, 40.97, 43.86, 65.44, 73.86, 63.09, 74.3, 72.41, 55.45, 61.11, 55.41, 50.71, 47.88, 46.9, 48.65, 51.67, 45.85, 49.82, 46.77, 49.45, 50.8, 43.37, 38.56, 35.48, 33.18, 31.62, 38.34, 35.87, 33.29, 33.11, 26.59, 28.49, 35.76, 46.28, 43.08, 48, 55.87, 48.44, 65.4, 71.4, 56.69, 56.06, 53.6, 51.4, 44.77, 36.69] },
      velocityScore: { '1D': -1.2, '1W': -1.8, '1M': -27.3, '6M': null }, isNew: false,
      marketCap: '$14B', pe: 94.1, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.05, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 1, avgWeight: 4.91, proScore: 1.64, coverage: 0.333,
      price: 490.08, weeklyPrices: [582.59, 555.55, 563.32, 513.84, 490.08], weeklyChange: -15.88, dayChange: -4.62, sortRank: 0, periodReturns: { '1M': -28, 'YTD': 184.5, '6M': 121.2, '1Y': 636.6 },
      priceHistory: { '1D': [513.84, 489.45, 490.55, 490.08], '1W': [582.59, 555.55, 563.32, 513.84, 490.08], '1M': [681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 532.1, 550.3, 578.05, 582.59, 555.55, 563.32, 513.84, 490.08], 'YTD': [172.27, 187.68, 221.51, 240.85, 270.23, 262.56, 296.56, 282.25, 259.03, 261.18, 293.1, 275.34, 304.15, 366.22, 383.81, 390.99, 483.15, 494.09, 459.62, 531.21, 511.72, 653.53, 670.75, 638.72, 578.05, 490.08], '6M': [221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 563.1, 517.72, 681.08, 643.83, 598.37, 578.05, 490.08], '1Y': [66.53, 69.32, 71.43, 73.78, 76.07, 75.64, 80.67, 86, 95.02, 100.94, 109.69, 130.59, 121.18, 120.44, 120.47, 141.38, 160.1, 166.11, 153.97, 157.74, 155.59, 181.95, 166.26, 179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 563.1, 517.72, 681.08, 643.83, 598.37, 578.05, 490.08] },
      velocityScore: { '1D': -45.7, '1W': -45.2, '1M': 6.5, '6M': null }, isNew: false,
      marketCap: '$169B', pe: 29.3, revenueGrowth: 46, eps: 16.7, grossMargin: 45, dividendYield: 0.12,
      etfPresence: { BUZZ: false, MEME: 4.91, RKNG: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'STX', name: 'STX', easyScore: 1, avgWeight: 4.76, proScore: 1.59, coverage: 0.333,
      price: 781.54, weeklyPrices: [910.34, 860.66, 878.31, 828.30, 781.54], weeklyChange: -14.15, dayChange: -5.64, sortRank: 0, periodReturns: { '1M': -24.2, 'YTD': 183.8, '6M': 139.6, '1Y': 431.2 },
      priceHistory: { '1D': [828.3, 785.36, 785.16, 781.54], '1W': [910.34, 860.66, 878.31, 828.3, 781.54], '1M': [1031.34, 1066.07, 1070.23, 1094.04, 1038.59, 993.25, 1025.36, 899.9, 968.53, 965, 915.19, 820.16, 868.26, 827.64, 860.02, 890.09, 910.34, 860.66, 878.31, 828.3, 781.54], 'YTD': [275.39, 284.47, 326.23, 358.29, 432.95, 396.23, 424.14, 409.67, 367.34, 373.98, 411.23, 380.07, 453.3, 533.44, 559.9, 579.03, 786.42, 817.35, 751.07, 879.8, 847.47, 1018.8, 1038.59, 965, 890.09, 781.54], '6M': [326.23, 358.29, 432.95, 425, 415.94, 396.02, 357.62, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 579.03, 771.01, 808.8, 733.35, 870.66, 926.61, 846.01, 1031.34, 993.25, 915.19, 890.09, 781.54], '1Y': [147.12, 152.76, 147.42, 147.27, 156.92, 158.4, 167.24, 176.32, 193.04, 213.36, 223.7, 256.84, 224.35, 219.38, 215.05, 265.62, 275.77, 283.26, 259.14, 272.28, 258.67, 298.92, 277.65, 285.27, 287.54, 304.01, 326.23, 358.29, 432.95, 425, 415.94, 396.02, 379.52, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 579.03, 771.01, 808.8, 733.35, 870.66, 926.61, 846.01, 1031.34, 993.25, 915.19, 890.09, 781.54] },
      velocityScore: { '1D': -1.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$175B', pe: 74.3, revenueGrowth: 44, eps: 10.52, grossMargin: 42, dividendYield: 0.36,
      etfPresence: { BUZZ: false, MEME: 4.76, RKNG: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 1, avgWeight: 4.33, proScore: 1.44, coverage: 0.333,
      price: 218.21, weeklyPrices: [257.79, 236.88, 236.18, 226.74, 218.21], weeklyChange: -15.36, dayChange: -3.76, sortRank: 0, periodReturns: { '1M': -8.8, 'YTD': 51.6, '6M': 44.5, '1Y': 115.6 },
      priceHistory: { '1D': [226.74, 220.85, 218.6, 218.21], '1W': [257.79, 236.88, 236.18, 226.74, 218.21], '1M': [239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 265.55, 246.4, 258.69, 265.65, 257.79, 236.88, 236.18, 226.74, 218.21], 'YTD': [143.89, 141.59, 150.97, 128.02, 119.96, 134.72, 127.91, 114.48, 114.74, 111.57, 103.4, 95.24, 102.46, 159.52, 183.32, 165.92, 198.29, 189.36, 182.98, 236.03, 206.89, 259.41, 272.01, 271.95, 265.65, 218.21], '6M': [150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 97.3, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.23, 229, 234.32, 239.18, 268.99, 259.09, 265.65, 218.21], '1Y': [101.19, 98.41, 116.01, 117.34, 121.13, 105.99, 122.73, 124.77, 163.96, 164.44, 149.38, 144.91, 148.87, 131.41, 137.2, 171.52, 173.16, 160.34, 141.88, 164.01, 189.19, 157.98, 134.13, 150.19, 143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.23, 229, 234.32, 239.18, 268.99, 259.09, 265.65, 218.21] },
      velocityScore: { '1D': -2, '1W': -26.2, '1M': -51.8, '6M': null }, isNew: false,
      marketCap: '$41B', pe: 86.6, revenueGrowth: 157, eps: 2.52, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.33, RKNG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'ALAB', name: 'ALAB', easyScore: 1, avgWeight: 4.27, proScore: 1.42, coverage: 0.333,
      price: 331.61, weeklyPrices: [412.97, 362.05, 361.78, 350.62, 331.61], weeklyChange: -19.7, dayChange: -5.42, sortRank: 0, periodReturns: { '1M': -8.3, 'YTD': 99.3, '6M': 82.2, '1Y': 260.7 },
      priceHistory: { '1D': [350.62, 334.57, 331.61], '1W': [412.97, 362.05, 361.78, 350.62, 331.61], '1M': [361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42, 432.74, 382.89, 393.16, 417.45, 412.97, 362.05, 361.78, 350.62, 331.61], 'YTD': [166.36, 156.73, 182, 163.25, 152.44, 182.86, 129.58, 124.67, 120, 119.9, 116.04, 112.47, 117.99, 170.6, 191.97, 183.31, 213.91, 224.09, 287.48, 342.85, 317.06, 389.2, 397.02, 483.02, 417.45, 331.61], '6M': [182, 163.25, 152.44, 187.67, 123.69, 128.4, 109.8, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 325.33, 355.76, 341.7, 361.71, 399.92, 430.86, 417.45, 331.61], '1Y': [91.94, 119.48, 128.87, 174.39, 193.64, 172.45, 179.2, 176.61, 230.37, 249.38, 205.27, 194.5, 219.36, 161.46, 154.85, 173.62, 181.94, 157.79, 142.01, 154.22, 152.5, 164.32, 140.24, 169.97, 179.56, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.4, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 325.33, 355.76, 341.7, 361.71, 399.92, 430.86, 417.45, 331.61] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$57B', pe: 225.6, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.27, RKNG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'CBRS', name: 'CBRS', easyScore: 1, avgWeight: 4.15, proScore: 1.38, coverage: 0.333,
      price: 177.3, weeklyPrices: [215.08, 204.62, 203.81, 184.01, 177.30], weeklyChange: -17.57, dayChange: -3.65, sortRank: 0, periodReturns: { '1M': -16.5, 'YTD': -43, '6M': -43, '1Y': -43 },
      priceHistory: { '1D': [184.01, 177, 176.85, 177.3], '1W': [215.08, 204.62, 203.81, 184.01, 177.3], '1M': [212.25, 213.67, 234.71, 224.43, 226.72, 182.26, 168.52, 181.59, 216.16, 221, 221.27, 204.86, 192.01, 176.61, 181.72, 198.53, 215.08, 204.62, 203.81, 184.01, 177.3], 'YTD': [311.07, 296.65, 303.63, 281.86, 241.71, 266.9, 236.99, 236.52, 214.94, 201.01, 226.82, 237.33, 214, 212.25, 234.71, 224.43, 182.26, 181.59, 216.16, 221.27, 192.01, 176.61, 198.53, 204.62, 203.81, 177.3], '6M': [311.07, 296.65, 303.63, 281.86, 241.71, 266.9, 236.99, 236.52, 214.94, 201.01, 226.82, 237.33, 214, 212.25, 234.71, 224.43, 182.26, 181.59, 216.16, 221.27, 192.01, 176.61, 198.53, 204.62, 203.81, 177.3], '1Y': [311.07, 279.72, 296.65, 303.63, 290.69, 281.86, 256.78, 241.71, 266.9, 242.59, 236.99, 213.28, 236.52, 214.94, 215.4, 201.01, 237.83, 226.82, 237.33, 226.55, 214, 218.03, 212.25, 213.67, 234.71, 224.43, 226.72, 182.26, 168.52, 181.59, 216.16, 221, 221.27, 204.86, 192.01, 176.61, 181.72, 198.53, 215.08, 204.62, 203.81, 184.01, 177.3] },
      velocityScore: { '1D': -8, '1W': -10.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$40B', pe: 385.4, revenueGrowth: 94, eps: 0.46, grossMargin: 40, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.15, RKNG: false },
      tonyNote: 'CBRS appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TER', name: 'TER', easyScore: 1, avgWeight: 3.99, proScore: 1.33, coverage: 0.333,
      price: 329.99, weeklyPrices: [359.60, 341.11, 353.23, 342.12, 329.99], weeklyChange: -8.23, dayChange: -3.56, sortRank: 0, periodReturns: { '1M': -19.4, 'YTD': 70.5, '6M': 44.6, '1Y': 258.8 },
      priceHistory: { '1D': [342.12, 329.23, 327.26, 329.99], '1W': [359.6, 341.11, 353.23, 342.12, 329.99], '1M': [409.35, 408.56, 437.92, 457, 420.12, 427.2, 471.96, 436.86, 463.21, 483.84, 427.34, 369.09, 379.52, 343.11, 351.57, 362.75, 359.6, 341.11, 353.23, 342.12, 329.99], 'YTD': [193.56, 216.31, 228.15, 231.75, 249.53, 304.89, 314.82, 332.7, 305.58, 286.61, 290.83, 295.61, 315.43, 365.51, 379.93, 380.13, 382.48, 363.38, 344.34, 374.31, 357.93, 432.41, 420.12, 483.84, 362.75, 329.99], '6M': [228.15, 231.75, 249.53, 310.01, 305.53, 329.09, 304.22, 296.44, 298.27, 303.92, 276.35, 320.48, 365.51, 379.93, 380.13, 357.1, 358.45, 321.52, 375.83, 392.62, 369.21, 409.35, 427.2, 427.34, 362.75, 329.99], '1Y': [91.98, 93.03, 107.65, 104.88, 114.01, 109.52, 116.99, 119.63, 117.82, 114.32, 133.21, 141.12, 144.6, 141.03, 138.84, 173.94, 187.59, 179.27, 168.23, 179.38, 195.08, 204.01, 185.21, 198.53, 207.56, 217.26, 228.15, 231.75, 249.53, 310.01, 305.53, 329.09, 325.83, 296.44, 298.27, 303.92, 276.35, 320.48, 365.51, 379.93, 380.13, 357.1, 358.45, 321.52, 375.83, 392.62, 369.21, 409.35, 427.2, 427.34, 362.75, 329.99] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$52B', pe: 61, revenueGrowth: 87, eps: 5.41, grossMargin: 59, dividendYield: 0.15,
      etfPresence: { BUZZ: false, MEME: 3.99, RKNG: false },
      tonyNote: 'TER appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
