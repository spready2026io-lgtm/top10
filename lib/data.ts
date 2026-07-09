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
export const SPY_RET: Record<Period, number> = { '1W': 0.9, '1M': 2, 'YTD': 10.2, '6M': 8.3, '1Y': 20.1 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 6.7 }, { t: 'AMD', w: 5.1 }, { t: 'SIMO', w: 4.0 }, { t: 'VRT', w: 3.9 }, { t: 'MRVL', w: 3.6 }],
  ARTY: [{ t: 'AMD', w: 5.0 }, { t: 'NVDA', w: 4.8 }, { t: 'MU', w: 4.8 }, { t: 'AVGO', w: 4.7 }, { t: 'CRWV', w: 4.1 }],
  BAI: [{ t: 'MU', w: 6.2 }, { t: 'AMD', w: 5.1 }, { t: 'TSM', w: 4.7 }, { t: 'AVGO', w: 4.5 }, { t: 'LRCX', w: 4.5 }],
  IGPT: [{ t: 'META', w: 8.5 }, { t: 'AMD', w: 8.5 }, { t: 'GOOGL', w: 8.1 }, { t: 'NVDA', w: 8.0 }, { t: 'MU', w: 7.7 }],
  IVES: [{ t: 'AAPL', w: 5.3 }, { t: 'META', w: 4.9 }, { t: 'TSM', w: 4.9 }, { t: 'NVDA', w: 4.9 }, { t: 'AMZN', w: 4.8 }],
  ALAI: [{ t: 'NVDA', w: 13.0 }, { t: 'TSM', w: 5.5 }, { t: 'MSFT', w: 5.1 }, { t: 'GOOG', w: 4.9 }, { t: 'AMZN', w: 4.9 }],
  CHAT: [{ t: 'NVDA', w: 7.3 }, { t: 'GOOGL', w: 5.7 }, { t: 'AVGO', w: 4.7 }, { t: 'AMD', w: 3.8 }, { t: 'MU', w: 3.5 }],
  AIFD: [{ t: 'MU', w: 6.5 }, { t: 'NVDA', w: 6.3 }, { t: 'PANW', w: 6.2 }, { t: 'MRVL', w: 5.5 }, { t: 'AVGO', w: 5.2 }],
  SPRX: [{ t: 'ALAB', w: 12.1 }, { t: 'COHR', w: 8.8 }, { t: 'KLAC', w: 8.3 }, { t: 'NET', w: 8.3 }, { t: 'ARM', w: 8.0 }],
  AOTG: [{ t: 'AMD', w: 15.9 }, { t: 'NVDA', w: 10.0 }, { t: 'MU', w: 9.9 }, { t: 'TSM', w: 7.3 }, { t: 'TOST', w: 5.3 }],
  SOXX: [{ t: 'AMD', w: 8.2 }, { t: 'MU', w: 8.0 }, { t: 'NVDA', w: 7.9 }, { t: 'AVGO', w: 7.1 }, { t: 'INTC', w: 5.7 }],
  PSI: [{ t: 'AMAT', w: 6.7 }, { t: 'KLAC', w: 5.9 }, { t: 'MU', w: 5.7 }, { t: 'LRCX', w: 5.5 }, { t: 'AMD', w: 5.5 }],
  XSD: [{ t: 'PENG', w: 3.2 }, { t: 'MXL', w: 2.9 }, { t: 'AMBA', w: 2.9 }, { t: 'ALAB', w: 2.8 }, { t: 'PI', w: 2.8 }],
  DRAM: [{ t: 'SNDK', w: 4.8 }, { t: 'STX', w: 4.5 }, { t: 'WDC', w: 4.5 }, { t: 'MU', w: 3.5 }, { t: 'JPY', w: 1.5 }],
  PTF: [{ t: 'SNDK', w: 5.2 }, { t: 'MU', w: 4.8 }, { t: 'WDC', w: 4.3 }, { t: 'KLAC', w: 4.0 }, { t: 'AXTI', w: 4.0 }],
  WCLD: [{ t: 'FROG', w: 3.2 }, { t: 'PANW', w: 3.0 }, { t: 'DDOG', w: 2.9 }, { t: 'DOCN', w: 2.6 }, { t: 'CRWD', w: 2.5 }],
  IGV: [{ t: 'PANW', w: 9.5 }, { t: 'PLTR', w: 8.5 }, { t: 'MSFT', w: 8.1 }, { t: 'CRWD', w: 7.1 }, { t: 'ORCL', w: 5.9 }],
  FDTX: [{ t: 'MRVL', w: 9.7 }, { t: 'MU', w: 9.3 }, { t: 'TSM', w: 6.4 }, { t: 'WDC', w: 4.5 }, { t: 'PANW', w: 4.2 }],
  GTEK: [{ t: 'MRVL', w: 4.0 }, { t: 'CDNS', w: 2.4 }, { t: 'AXON', w: 2.3 }, { t: 'NET', w: 2.1 }, { t: 'DELL', w: 2.1 }],
  ARKK: [{ t: 'TSLA', w: 10.0 }, { t: 'TEM', w: 5.5 }, { t: 'CRSP', w: 5.3 }, { t: 'HOOD', w: 5.1 }, { t: 'SHOP', w: 4.4 }],
  MARS: [{ t: 'SPCX', w: 22.2 }, { t: 'RKLB', w: 9.4 }, { t: 'ASTS', w: 7.5 }, { t: 'VSAT', w: 5.1 }, { t: 'PL', w: 4.8 }],
  FRWD: [{ t: 'NVDA', w: 8.2 }, { t: 'AMD', w: 7.7 }, { t: 'STX', w: 7.2 }, { t: 'TSM', w: 6.2 }, { t: 'LRCX', w: 5.6 }],
  BCTK: [{ t: 'TSM', w: 8.8 }, { t: 'SPCX', w: 8.4 }, { t: 'LRCX', w: 7.4 }, { t: 'AVGO', w: 6.6 }, { t: 'GOOG', w: 6.5 }],
  FWD: [{ t: 'AMD', w: 2.3 }, { t: 'AMAT', w: 2.0 }, { t: 'AVGO', w: 1.9 }, { t: 'LRCX', w: 1.9 }, { t: 'SPCX', w: 1.8 }],
  CBSE: [{ t: 'TENB', w: 3.7 }, { t: 'IBRX', w: 3.5 }, { t: 'KRYS', w: 3.2 }, { t: 'SCI', w: 3.1 }, { t: 'SBUX', w: 3.0 }],
  FCUS: [{ t: 'INTC', w: 4.3 }, { t: 'MU', w: 4.3 }, { t: 'DELL', w: 4.2 }, { t: 'BE', w: 4.2 }, { t: 'WDC', w: 4.2 }],
  WGMI: [{ t: 'CIFR', w: 17.6 }, { t: 'HUT', w: 10.8 }, { t: 'KEEL', w: 10.2 }, { t: 'IREN', w: 10.2 }, { t: 'MARA', w: 5.1 }],
  CNEQ: [{ t: 'NVDA', w: 13.8 }, { t: 'MSFT', w: 6.2 }, { t: 'GOOG', w: 5.9 }, { t: 'TSM', w: 5.8 }, { t: 'AAPL', w: 4.9 }],
  SGRT: [{ t: 'VRT', w: 12.3 }, { t: 'WDC', w: 10.7 }, { t: 'MU', w: 7.0 }, { t: 'ARW', w: 5.8 }, { t: 'WELL', w: 5.6 }],
  SPMO: [{ t: 'MU', w: 10.4 }, { t: 'NVDA', w: 7.9 }, { t: 'AVGO', w: 6.3 }, { t: 'GOOGL', w: 4.7 }, { t: 'JNJ', w: 4.6 }],
  XMMO: [{ t: 'CW', w: 4.4 }, { t: 'ATI', w: 3.3 }, { t: 'FTI', w: 3.2 }, { t: 'WWD', w: 3.0 }, { t: 'STRL', w: 3.0 }],
  POW: [{ t: 'PWR', w: 5.1 }, { t: 'PRY', w: 4.3 }, { t: 'ETN', w: 4.3 }, { t: 'POWL', w: 4.2 }, { t: 'NVT', w: 3.8 }],
  VOLT: [{ t: 'BELFB', w: 7.1 }, { t: 'POWL', w: 6.1 }, { t: 'ETN', w: 5.5 }, { t: 'PWR', w: 5.3 }, { t: 'NEE', w: 5.2 }],
  PBD: [{ t: 'RIVN', w: 1.2 }, { t: 'BLBD', w: 1.1 }, { t: 'SHLS', w: 1.1 }],
  PBW: [{ t: 'OPAL', w: 2.0 }, { t: 'DAR', w: 1.9 }, { t: 'BETA', w: 1.8 }, { t: 'REX', w: 1.8 }, { t: 'RIVN', w: 1.8 }],
  IVEP: [{ t: 'BE', w: 4.8 }, { t: 'GEV', w: 4.4 }, { t: 'VRT', w: 4.3 }, { t: 'PWR', w: 4.3 }, { t: 'SBGSY', w: 4.1 }],
  AIRR: [{ t: 'STRL', w: 5.1 }, { t: 'CHRW', w: 4.5 }, { t: 'AGX', w: 4.3 }, { t: 'MTZ', w: 4.2 }, { t: 'FIX', w: 4.1 }],
  PRN: [{ t: 'FIX', w: 4.5 }, { t: 'PWR', w: 4.3 }, { t: 'HWM', w: 4.2 }, { t: 'STRL', w: 3.9 }, { t: 'JBL', w: 3.5 }],
  RSHO: [{ t: 'TKR', w: 8.7 }, { t: 'POWL', w: 7.3 }, { t: 'CGNX', w: 7.2 }, { t: 'CAT', w: 6.9 }, { t: 'AIT', w: 6.0 }],
  IDEF: [{ t: 'RTX', w: 8.5 }, { t: 'LMT', w: 7.0 }, { t: 'BA', w: 5.1 }, { t: 'GD', w: 4.6 }, { t: 'NOC', w: 3.5 }],
  BILT: [{ t: 'UNP', w: 5.9 }, { t: 'AEP', w: 4.4 }, { t: 'AENA', w: 4.4 }, { t: 'TRP', w: 4.0 }, { t: 'TCL', w: 3.6 }],
  BUZZ: [{ t: 'IBRX', w: 3.8 }, { t: 'META', w: 3.4 }, { t: 'NOW', w: 3.3 }, { t: 'SOFI', w: 3.3 }, { t: 'AMD', w: 3.3 }],
  MEME: [{ t: 'BE', w: 7.0 }, { t: 'AAOI', w: 6.9 }, { t: 'IREN', w: 6.8 }, { t: 'NBIS', w: 6.6 }, { t: 'SNDK', w: 6.2 }],
  RKNG: [{ t: 'OPEN', w: 4.1 }, { t: 'BE', w: 3.9 }, { t: 'AMD', w: 3.8 }, { t: 'PL', w: 3.7 }, { t: 'MU', w: 3.7 }],
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
  SGRT: { name: "SMART Earnings Growth 30 ETF", manager: "" },
  SPMO: { name: "Invesco S&P 500 Momentum ETF", manager: "Invesco", aum: 22210627584 },
  XMMO: { name: "Invesco S&P MidCap Momentum ETF", manager: "Invesco", aum: 7917685760 },
  POW: { name: "VistaShares Electrification Supercycle ETF", manager: "" },
  VOLT: { name: "Tema Electrification ETF", manager: "Tema ETFs", aum: 809755840 },
  PBD: { name: "Invesco Global Clean Energy ETF", manager: "Invesco", aum: 206513408 },
  PBW: { name: "Invesco WilderHill Clean Energy ETF", manager: "Invesco", aum: 484880768 },
  IVEP: { name: "Dan IVES Wedbush AI Power & Infrastructure ETF", manager: "Wedbush Funds", aum: 19010532 },
  AIRR: { name: "First Trust RBA American Industrial RenaissanceTM ETF", manager: "First Trust", aum: 11489859584 },
  PRN: { name: "Invesco Dorsey Wright Industrials Momentum ETF", manager: "Invesco", aum: 644142400 },
  RSHO: { name: "Tema U.S. Manufacturing & Reshoring ETF", manager: "Tema Global Limited", aum: 274074464 },
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
  'AI & ML':         { '1W': 2.9, '1M': 3.1, 'YTD': 45.9, '6M': 40.4, '1Y': 77.1 },
  'Semiconductors':  { '1W': 3.1, '1M': 3.6, 'YTD': 101.1, '6M': 88, '1Y': 134.3 },
  'Broad Tech':      { '1W': 1.3, '1M': 1, 'YTD': 26.1, '6M': 20.9, '1Y': 40.9 },
  'Electrification': { '1W': -1.7, '1M': -4.4, 'YTD': 22.3, '6M': 17.6, '1Y': 38.1 },
  'Industrials':     { '1W': -0.9, '1M': -0.3, 'YTD': 22.5, '6M': 15.8, '1Y': 34.4 },
  'Meme':            { '1W': 0.9, '1M': -5.1, 'YTD': 16.2, '6M': 4.9, '1Y': 1.3 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, IndexChartByPeriod> = {
  'AI & ML': {
    '1D': { top10: [100, 103.18, 103.58, 102.47, 102.77, 102.79, 103.14, 103.26, 103.31, 103.4, 103.41, 103.21, 103.21, 103.37, 103.56, 103.61, 103.52, 103.53, 103.41, 103.48, 103.1, 103.05, 103.05, 102.89], spy: [100, 100.4, 100.44, 100.12, 100.4, 100.34, 100.51, 100.59, 100.63, 100.66, 100.69, 100.69, 100.67, 100.78, 100.85, 100.86, 100.82, 100.84, 100.77, 100.77, 100.74, 100.76, 100.78, 100.85], top10Return: 2.8, spyReturn: 0.85, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 102.67, 98.89, 100.22, 102.93], spy: [100, 100.87, 100.39, 100.08, 100.93], top10Return: 2.9, spyReturn: 0.9, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 96.86, 102.09, 102.79, 108.18, 104.97, 105.51, 110.06, 110.94, 104.37, 103.45, 105.39, 102.63, 105.71, 108.83, 104.59, 100.14, 102.82, 99.04, 100.36, 103.08], spy: [100, 98.42, 100.1, 100.64, 102.41, 101.8, 100.53, 101.31, 101, 99.53, 99.48, 99.63, 98.91, 100.54, 101.32, 101.18, 101.05, 101.93, 101.45, 101.13, 101.99], top10Return: 3.1, spyReturn: 2, xLabels: ["Jun 11", "Jun 18", "Jun 25", "Jul 2", "Jul 9"] },
    'YTD': { top10: [100, 102.26, 104.35, 105.09, 105.1, 104.71, 102.24, 104.01, 99.72, 102.27, 102.71, 102.1, 99.39, 106.63, 115.79, 119.47, 124.78, 135.27, 134.83, 140.17, 153.97, 144.36, 148.76, 147.04, 148.23, 145.9], spy: [100, 101.11, 101.51, 101.07, 101.98, 101.76, 100.14, 100.8, 99.77, 99.3, 97, 96.32, 96.09, 99.71, 102.89, 103.89, 105.68, 108.17, 108.4, 109.34, 111.24, 108.4, 110.03, 107.53, 109.36, 110.23], top10Return: 45.9, spyReturn: 10.2, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 101.23, 101.11, 101.29, 100.89, 98.51, 100.2, 99.72, 98.31, 99.06, 97.85, 88.69, 97.5, 109.58, 113.39, 114.74, 124.06, 129.55, 126.29, 140.57, 151.16, 136.15, 143.12, 141.43, 142.61, 140.4], spy: [100, 99.65, 99.81, 100.19, 99.98, 98.38, 99.03, 98.89, 97.72, 96.39, 94.43, 91.05, 94.98, 100.06, 101.44, 102.54, 104.28, 106.36, 105.71, 108.14, 109.44, 106.19, 108.11, 105.64, 107.45, 108.3], top10Return: 40.4, spyReturn: 8.3, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 102.52, 103.89, 106, 106.56, 107.76, 103.91, 107.2, 107.71, 114.6, 118.38, 117.05, 121.68, 125.67, 122.71, 123.42, 131.3, 127.01, 124.17, 117.11, 119.64, 122.86, 125.3, 117.33, 122.71, 124.3, 125.21, 126.86, 126.69, 127.01, 126.65, 123.67, 125.87, 120.64, 123.71, 125.17, 122.87, 111.27, 122.45, 137.75, 142.56, 144.24, 156.15, 163.16, 159.05, 176.93, 190.76, 171.71, 180.62, 178.65, 180.02, 177.09], spy: [100, 100.35, 101.37, 101, 101.03, 103.06, 101.96, 103.33, 103.72, 105.08, 105.82, 105.15, 106.93, 107.24, 105.56, 107.34, 109.84, 108.27, 109.2, 105.88, 108.61, 109.36, 110.12, 108.09, 110.3, 109.89, 110.91, 110.52, 110.69, 111.12, 110.89, 109.11, 109.83, 108.71, 108.21, 107.19, 104.72, 100.98, 105.34, 110.97, 112.51, 113.72, 115.65, 117.95, 117.24, 119.92, 121.37, 117.77, 119.9, 117.16, 119.17, 120.12], top10Return: 77.1, spyReturn: 20.1, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Semiconductors': {
    '1D': { top10: [100, 105.75, 106.16, 104.69, 105.14, 105.18, 105.99, 105.73, 105.78, 105.84, 105.74, 105.24, 105.52, 105.8, 105.95, 105.92, 105.66, 105.63, 105.3, 105.35, 104.63, 104.7, 104.49, 104.11], spy: [100, 100.4, 100.44, 100.12, 100.4, 100.34, 100.51, 100.59, 100.63, 100.66, 100.69, 100.69, 100.67, 100.78, 100.85, 100.86, 100.82, 100.84, 100.77, 100.77, 100.74, 100.76, 100.78, 100.85], top10Return: 4.1, spyReturn: 0.85, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 103.31, 96.87, 99.01, 103.06], spy: [100, 100.87, 100.39, 100.08, 100.93], top10Return: 3.1, spyReturn: 0.9, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 96.64, 105.99, 107.52, 113.9, 107.98, 109.13, 117.35, 121.26, 109.93, 109.27, 114.97, 108.69, 112.31, 117.25, 108.68, 100.57, 103.9, 97.41, 99.56, 103.65], spy: [100, 98.42, 100.1, 100.64, 102.41, 101.8, 100.53, 101.31, 101, 99.53, 99.48, 99.63, 98.91, 100.54, 101.32, 101.18, 101.05, 101.93, 101.45, 101.13, 101.99], top10Return: 3.6, spyReturn: 2, xLabels: ["Jun 11", "Jun 18", "Jun 25", "Jul 2", "Jul 9"] },
    'YTD': { top10: [100, 109.74, 113.64, 116.38, 118.59, 122.54, 123.94, 124.94, 122.59, 125.67, 133.5, 135.47, 129.52, 143.22, 156.65, 173.18, 183.03, 188.89, 190.6, 204.3, 212, 204.49, 213, 208.61, 209.73, 201.08], spy: [100, 101.11, 101.51, 101.07, 101.98, 101.76, 100.14, 100.8, 99.77, 99.3, 97, 96.32, 96.09, 99.71, 102.89, 103.89, 105.68, 108.17, 108.4, 109.34, 111.24, 108.4, 110.03, 107.53, 109.36, 110.23], top10Return: 101.1, spyReturn: 10.2, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 106.86, 106.21, 110.11, 112.39, 114.63, 116.95, 115.13, 113.78, 118.28, 126.1, 118.89, 123.76, 139.5, 152, 161.78, 176.03, 175.37, 175.18, 198.25, 206.55, 189.32, 199.42, 194.91, 195.82, 187.97], spy: [100, 99.65, 99.81, 100.19, 99.98, 98.38, 99.03, 98.89, 97.72, 96.39, 94.43, 91.05, 94.98, 100.06, 101.44, 102.54, 104.28, 106.36, 105.71, 108.14, 109.44, 106.19, 108.11, 105.64, 107.45, 108.3], top10Return: 88, spyReturn: 8.3, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 101.29, 102.84, 102.24, 102.72, 107.9, 105.6, 109.69, 108.96, 112.34, 119.32, 117.47, 123.38, 124.36, 125.93, 127.15, 134.31, 135.69, 136.04, 133.19, 139.03, 141.11, 147.04, 136.64, 138.66, 142.65, 150.55, 152.75, 158.86, 163.55, 166.53, 171.19, 174.23, 163.13, 153.47, 158.6, 155.53, 154.28, 165.72, 186.96, 195.06, 205.52, 226.3, 226.93, 227.28, 244.42, 252.71, 231.42, 237.34, 242.36, 242.57, 234.34], spy: [100, 100.35, 101.37, 101, 101.03, 103.06, 101.96, 103.33, 103.72, 105.08, 105.82, 105.15, 106.93, 107.24, 105.56, 107.34, 109.84, 108.27, 109.2, 105.88, 108.61, 109.36, 110.12, 108.09, 110.3, 109.89, 110.91, 110.52, 110.69, 111.12, 110.89, 109.11, 109.83, 108.71, 108.21, 107.19, 104.72, 100.98, 105.34, 110.97, 112.51, 113.72, 115.65, 117.95, 117.24, 119.92, 121.37, 117.77, 119.9, 117.16, 119.17, 120.12], top10Return: 134.3, spyReturn: 20.1, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Broad Tech': {
    '1D': { top10: [100, 102.42, 102.69, 102.2, 102.12, 102.3, 102.43, 102.57, 102.63, 102.7, 102.66, 102.59, 102.61, 102.62, 102.68, 102.78, 102.75, 102.79, 102.75, 102.74, 102.57, 102.46, 102.28, 102.26], spy: [100, 100.4, 100.44, 100.12, 100.4, 100.34, 100.51, 100.59, 100.63, 100.66, 100.69, 100.69, 100.67, 100.78, 100.85, 100.86, 100.82, 100.84, 100.77, 100.77, 100.74, 100.76, 100.78, 100.85], top10Return: 2.3, spyReturn: 0.85, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 101.93, 98.43, 99.03, 101.33], spy: [100, 100.87, 100.39, 100.08, 100.93], top10Return: 1.3, spyReturn: 0.9, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 97.59, 101.96, 102.42, 106.07, 104.33, 103.94, 106.35, 106.06, 102.5, 101.38, 102.26, 101.27, 103.84, 105.97, 103.24, 99.74, 101.63, 98.23, 98.75, 101.02], spy: [100, 98.42, 100.1, 100.64, 102.41, 101.8, 100.53, 101.31, 101, 99.53, 99.48, 99.63, 98.91, 100.54, 101.32, 101.18, 101.05, 101.93, 101.45, 101.13, 101.99], top10Return: 1, spyReturn: 2, xLabels: ["Jun 11", "Jun 18", "Jun 25", "Jul 2", "Jul 9"] },
    'YTD': { top10: [100, 103.16, 105.26, 104.6, 103.09, 102.31, 101.82, 103.45, 101.97, 102.51, 101.93, 101.02, 99.58, 105.69, 112.17, 115.01, 118.74, 126.1, 123.06, 126.12, 133.98, 127.37, 130.22, 128.3, 129.25, 126.07], spy: [100, 101.11, 101.51, 101.07, 101.98, 101.76, 100.14, 100.8, 99.77, 99.3, 97, 96.32, 96.09, 99.71, 102.89, 103.89, 105.68, 108.17, 108.4, 109.34, 111.24, 108.4, 110.03, 107.53, 109.36, 110.23], top10Return: 26.1, spyReturn: 10.2, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 100.87, 100.72, 98.34, 99.02, 96.48, 99.2, 100.16, 98.16, 98.2, 97.36, 89.91, 97.16, 105.48, 108.97, 109, 117.07, 121, 115.51, 124.02, 130.02, 120.2, 124.6, 122.79, 123.91, 120.91], spy: [100, 99.65, 99.81, 100.19, 99.98, 98.38, 99.03, 98.89, 97.72, 96.39, 94.43, 91.05, 94.98, 100.06, 101.44, 102.54, 104.28, 106.36, 105.71, 108.14, 109.44, 106.19, 108.11, 105.64, 107.45, 108.3], top10Return: 20.9, spyReturn: 8.3, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 101.96, 102.65, 102.65, 102.57, 103.87, 101.91, 104.53, 104.36, 109.11, 112.03, 112.17, 116.15, 119.08, 117.75, 115.99, 120.94, 120.46, 116.69, 109.97, 113.53, 115.23, 116.29, 111.32, 114.19, 115.78, 116.83, 120.17, 119.34, 118.69, 119.19, 117.1, 118.94, 118.31, 118.51, 118.69, 117.37, 110.52, 117.19, 125.06, 127.98, 129.2, 136.83, 137.77, 134.94, 145.04, 150.14, 141.36, 146.93, 144.9, 143.14, 140.9], spy: [100, 100.35, 101.37, 101, 101.03, 103.06, 101.96, 103.33, 103.72, 105.08, 105.82, 105.15, 106.93, 107.24, 105.56, 107.34, 109.84, 108.27, 109.2, 105.88, 108.61, 109.36, 110.12, 108.09, 110.3, 109.89, 110.91, 110.52, 110.69, 111.12, 110.89, 109.11, 109.83, 108.71, 108.21, 107.19, 104.72, 100.98, 105.34, 110.97, 112.51, 113.72, 115.65, 117.95, 117.24, 119.92, 121.37, 117.77, 119.9, 117.16, 119.17, 120.12], top10Return: 40.9, spyReturn: 20.1, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Electrification': {
    '1D': { top10: [100, 101.69, 101.79, 101.44, 101.58, 101.55, 101.85, 101.81, 101.88, 101.84, 101.66, 101.68, 101.68, 101.69, 101.74, 101.75, 101.66, 101.66, 101.58, 101.53, 101.32, 101.27, 101.13, 101.13], spy: [100, 100.4, 100.44, 100.12, 100.4, 100.34, 100.51, 100.59, 100.63, 100.66, 100.69, 100.69, 100.67, 100.78, 100.85, 100.86, 100.82, 100.84, 100.77, 100.77, 100.74, 100.76, 100.78, 100.85], top10Return: 1.1, spyReturn: 0.85, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 101.68, 97.56, 97.19, 98.3], spy: [100, 100.87, 100.39, 100.08, 100.93], top10Return: -1.7, spyReturn: 0.9, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 96.77, 100.73, 101.68, 103.97, 102.89, 102.86, 105.21, 106.34, 101.63, 100.91, 101.46, 98.66, 100.63, 102.78, 99.81, 97.24, 98.86, 94.88, 94.53, 95.61], spy: [100, 98.42, 100.1, 100.64, 102.41, 101.8, 100.53, 101.31, 101, 99.53, 99.48, 99.63, 98.91, 100.54, 101.32, 101.18, 101.05, 101.93, 101.45, 101.13, 101.99], top10Return: -4.4, spyReturn: 2, xLabels: ["Jun 11", "Jun 18", "Jun 25", "Jul 2", "Jul 9"] },
    'YTD': { top10: [100, 103.75, 108.25, 111.09, 110.24, 115.01, 115.01, 118.55, 113.6, 113.56, 113.77, 115.22, 113.52, 119.6, 122.75, 128.16, 133.45, 135.72, 132.76, 135.24, 138.06, 130.38, 131.57, 128.44, 128.14, 122.35], spy: [100, 101.11, 101.51, 101.07, 101.98, 101.76, 100.14, 100.8, 99.77, 99.3, 97, 96.32, 96.09, 99.71, 102.89, 103.89, 105.68, 108.17, 108.4, 109.34, 111.24, 108.4, 110.03, 107.53, 109.36, 110.23], top10Return: 22.3, spyReturn: 10.2, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 104.9, 105.98, 105.86, 110.2, 110.91, 113.23, 113.02, 108.84, 110.08, 109.65, 104.99, 109.2, 118.49, 119.56, 122.92, 130.84, 129.7, 121.85, 133.55, 134.27, 123.92, 126.34, 123.4, 123.1, 117.59], spy: [100, 99.65, 99.81, 100.19, 99.98, 98.38, 99.03, 98.89, 97.72, 96.39, 94.43, 91.05, 94.98, 100.06, 101.44, 102.54, 104.28, 106.36, 105.71, 108.14, 109.44, 106.19, 108.11, 105.64, 107.45, 108.3], top10Return: 17.6, spyReturn: 8.3, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 102.06, 104.26, 102.62, 102.69, 103.38, 104.01, 105.77, 105.41, 107.54, 110.45, 110.99, 114.08, 117.73, 120.81, 119.13, 122.5, 122.2, 121.31, 117.42, 118.85, 121.89, 123.1, 119.22, 122.79, 123.36, 122.82, 127.6, 128.87, 126.58, 129.94, 130.32, 132.67, 128.89, 129.52, 131.22, 131.81, 130.62, 135.73, 143.41, 144.51, 143.81, 151.53, 152.91, 146.64, 154.66, 157.36, 146.5, 147.52, 144.63, 143.27, 138.07], spy: [100, 100.35, 101.37, 101, 101.03, 103.06, 101.96, 103.33, 103.72, 105.08, 105.82, 105.15, 106.93, 107.24, 105.56, 107.34, 109.84, 108.27, 109.2, 105.88, 108.61, 109.36, 110.12, 108.09, 110.3, 109.89, 110.91, 110.52, 110.69, 111.12, 110.89, 109.11, 109.83, 108.71, 108.21, 107.19, 104.72, 100.98, 105.34, 110.97, 112.51, 113.72, 115.65, 117.95, 117.24, 119.92, 121.37, 117.77, 119.9, 117.16, 119.17, 120.12], top10Return: 38.1, spyReturn: 20.1, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Industrials': {
    '1D': { top10: [100, 101, 100.9, 100.95, 101.1, 101.01, 101.13, 101.11, 101.1, 101.16, 101.12, 101.13, 101.21, 101.14, 101.22, 101.19, 101.18, 101.21, 101.04, 101.03, 100.9, 100.79, 100.77, 100.73], spy: [100, 100.4, 100.44, 100.12, 100.4, 100.34, 100.51, 100.59, 100.63, 100.66, 100.69, 100.69, 100.67, 100.78, 100.85, 100.86, 100.82, 100.84, 100.77, 100.77, 100.74, 100.76, 100.78, 100.85], top10Return: 0.7, spyReturn: 0.85, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.77, 99.41, 98.21, 99.09], spy: [100, 100.87, 100.39, 100.08, 100.93], top10Return: -0.9, spyReturn: 0.9, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.22, 101.45, 100.94, 101.11, 101.26, 100.16, 101.43, 102.26, 101.2, 101.11, 102.48, 101.35, 101.79, 102.76, 102.09, 100.58, 101.37, 100.02, 98.79, 99.67], spy: [100, 98.42, 100.1, 100.64, 102.41, 101.8, 100.53, 101.31, 101, 99.53, 99.48, 99.63, 98.91, 100.54, 101.32, 101.18, 101.05, 101.93, 101.45, 101.13, 101.99], top10Return: -0.3, spyReturn: 2, xLabels: ["Jun 11", "Jun 18", "Jun 25", "Jul 2", "Jul 9"] },
    'YTD': { top10: [100, 105.14, 110.48, 110.36, 110.22, 116.48, 117.95, 119.46, 118.03, 113.99, 112.02, 113.02, 111.52, 117.43, 119.47, 120.8, 121.92, 123.29, 122.45, 120.96, 123.54, 122.94, 123.38, 124.66, 125.8, 122.52], spy: [100, 101.11, 101.51, 101.07, 101.98, 101.76, 100.14, 100.8, 99.77, 99.3, 97, 96.32, 96.09, 99.71, 102.89, 103.89, 105.68, 108.17, 108.4, 109.34, 111.24, 108.4, 110.03, 107.53, 109.36, 110.23], top10Return: 22.5, spyReturn: 10.2, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 104.36, 104.15, 103.85, 108.23, 110.5, 112.88, 113.43, 108.94, 106.92, 105.35, 102.12, 106.68, 111.76, 112.94, 112.66, 116.3, 116.64, 113.75, 116.36, 117.58, 116.15, 116.45, 117.78, 118.86, 115.8], spy: [100, 99.65, 99.81, 100.19, 99.98, 98.38, 99.03, 98.89, 97.72, 96.39, 94.43, 91.05, 94.98, 100.06, 101.44, 102.54, 104.28, 106.36, 105.71, 108.14, 109.44, 106.19, 108.11, 105.64, 107.45, 108.3], top10Return: 15.8, spyReturn: 8.3, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 101.82, 102.35, 102.68, 102.8, 103.89, 101.98, 104.62, 103.74, 106.02, 107.34, 106.75, 109.98, 110.38, 109.05, 110.13, 113.2, 110.58, 109.92, 105.34, 107.69, 109.13, 112.01, 109.04, 111.73, 113.79, 117.18, 122.5, 121.65, 122.36, 127.6, 129.01, 131.04, 128.74, 125.33, 123.11, 122.29, 118.13, 123.99, 131.7, 130.79, 131.48, 135.64, 136.13, 132.1, 136.12, 136.48, 135.15, 136.5, 137.06, 138.12, 134.4], spy: [100, 100.35, 101.37, 101, 101.03, 103.06, 101.96, 103.33, 103.72, 105.08, 105.82, 105.15, 106.93, 107.24, 105.56, 107.34, 109.84, 108.27, 109.2, 105.88, 108.61, 109.36, 110.12, 108.09, 110.3, 109.89, 110.91, 110.52, 110.69, 111.12, 110.89, 109.11, 109.83, 108.71, 108.21, 107.19, 104.72, 100.98, 105.34, 110.97, 112.51, 113.72, 115.65, 117.95, 117.24, 119.92, 121.37, 117.77, 119.9, 117.16, 119.17, 120.12], top10Return: 34.4, spyReturn: 20.1, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Meme': {
    '1D': { top10: [100, 103.03, 103.46, 102.72, 102.17, 102.59, 103, 103.25, 103.47, 103.42, 103.19, 103.18, 103.19, 103.53, 103.73, 103.53, 103.56, 103.53, 103.81, 103.4, 103.27, 103.16, 102.78, 102.66], spy: [100, 100.4, 100.44, 100.12, 100.4, 100.34, 100.51, 100.59, 100.63, 100.66, 100.69, 100.69, 100.67, 100.78, 100.85, 100.86, 100.82, 100.84, 100.77, 100.77, 100.74, 100.76, 100.78, 100.85], top10Return: 3.4, spyReturn: 0.85, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 101.87, 96.56, 97.95, 100.86], spy: [100, 100.87, 100.39, 100.08, 100.93], top10Return: 0.9, spyReturn: 0.9, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 97.26, 103.6, 102.22, 107.95, 103.68, 104.35, 108.06, 107.94, 102.9, 99.43, 98.92, 96.82, 101.04, 103.14, 99.23, 94.03, 95.8, 90.88, 92.15, 94.85], spy: [100, 98.42, 100.1, 100.64, 102.41, 101.8, 100.53, 101.31, 101, 99.53, 99.48, 99.63, 98.91, 100.54, 101.32, 101.18, 101.05, 101.93, 101.45, 101.13, 101.99], top10Return: -5.1, spyReturn: 2, xLabels: ["Jun 11", "Jun 18", "Jun 25", "Jul 2", "Jul 9"] },
    'YTD': { top10: [100, 106.79, 105.55, 105.8, 99.12, 99.94, 93.39, 94.54, 93.41, 93.13, 90.43, 93.72, 91.36, 100.82, 113.7, 112.85, 116.32, 125.35, 126.34, 135.76, 140.86, 128.78, 128.2, 122.8, 121.97, 116.24], spy: [100, 101.11, 101.51, 101.07, 101.98, 101.76, 100.14, 100.8, 99.77, 99.3, 97, 96.32, 96.09, 99.71, 102.89, 103.89, 105.68, 108.17, 108.4, 109.34, 111.24, 108.4, 110.03, 107.53, 109.36, 110.23], top10Return: 16.2, spyReturn: 10.2, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 101.11, 93.17, 89.94, 89.67, 85.63, 85.84, 85.65, 85.12, 85.73, 80.41, 76.31, 84.92, 98.04, 102.31, 98.75, 108.46, 114.22, 109.25, 124.47, 128.35, 112.53, 115.38, 110.62, 109.94, 104.92], spy: [100, 99.65, 99.81, 100.19, 99.98, 98.38, 99.03, 98.89, 97.72, 96.39, 94.43, 91.05, 94.98, 100.06, 101.44, 102.54, 104.28, 106.36, 105.71, 108.14, 109.44, 106.19, 108.11, 105.64, 107.45, 108.3], top10Return: 4.9, spyReturn: 8.3, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 104.26, 99.46, 94.39, 91.3, 91.06, 87.29, 83.64, 83.47, 84.1, 87.06, 88.46, 89.48, 88.58, 89.29, 86.81, 90.68, 90.18, 90.5, 87.79, 85.41, 87.12, 85.46, 86.47, 85.65, 88.77, 91.97, 90.66, 90.42, 89.65, 89.95, 89, 89.69, 89.41, 93.33, 96.17, 95.63, 92.87, 96.57, 104.11, 110.63, 109.66, 104.77, 114.59, 114.49, 112.61, 115.27, 108.94, 109.61, 105.68, 99.91, 101.29], spy: [100, 100.35, 101.37, 101, 101.03, 103.06, 101.96, 103.33, 103.72, 105.08, 105.82, 105.15, 106.93, 107.24, 105.56, 107.34, 109.84, 108.27, 109.2, 105.88, 108.61, 109.36, 110.12, 108.09, 110.3, 109.89, 110.91, 110.52, 110.69, 111.12, 110.89, 109.11, 109.83, 108.71, 108.21, 107.19, 104.72, 100.98, 105.34, 110.97, 112.51, 113.72, 115.65, 117.95, 117.24, 119.92, 121.37, 117.77, 119.9, 117.16, 119.17, 120.12], top10Return: 1.3, spyReturn: 20.1, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
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
export const SCAN_TIMESTAMP    = '2026-07-09T21:42:21.309Z';
export const SCAN_TIMESTAMP_NY = 'July 9, 2026 at 5:42 PM ET';
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
export const HOLDINGS_COUNT = 1280;
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
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.72, bestProScore: 5.06, avgProScore: 4.24, price: 991.64, weeklyChange: 1.65 },
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.56, bestProScore: 6.13, avgProScore: 4.19, price: 202.78, weeklyChange: 4.08 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 10.67, bestProScore: 5.01, avgProScore: 3.56, price: 546.72, weeklyChange: 5.58 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 6.92, bestProScore: 3.01, avgProScore: 2.31, price: 401.11, weeklyChange: 11.28 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.77, bestProScore: 2.92, avgProScore: 2.38, price: 436.96, weeklyChange: 0.64 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.38, bestProScore: 3.23, avgProScore: 2.19, price: 112.54, weeklyChange: -6.49 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 3.97, bestProScore: 2.07, avgProScore: 1.98, price: 236.58, weeklyChange: -3.96 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 3.95, bestProScore: 2.25, avgProScore: 1.98, price: 243.27, weeklyChange: -0.82 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.71, bestProScore: 2.45, avgProScore: 1.85, price: 353.17, weeklyChange: 0.50 },
  { ticker: 'ALAB', name: `Astera Labs Inc`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 3.32, bestProScore: 1.91, avgProScore: 1.66, price: 417.45, weeklyChange: 2.71 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': 4, '1M': 6, 'YTD': 104.5, '6M': 91.2, '1Y': 174.3 },
  ARTY: { '1W': 2.3, '1M': 1, 'YTD': 50.9, '6M': 44.4, '1Y': 75.7 },
  BAI:  { '1W': 2.2, '1M': 2.6, 'YTD': 44.3, '6M': 40, '1Y': 65.7 },
  IGPT: { '1W': 3.7, '1M': 5.1, 'YTD': 66.1, '6M': 57.8, '1Y': 99.7 },
  IVES: { '1W': 2.3, '1M': 3.3, 'YTD': 20.7, '6M': 17.1, '1Y': 40.8 },
  ALAI: { '1W': 3.2, '1M': 4.1, 'YTD': 24.6, '6M': 21.5, '1Y': 47.1 },
  CHAT: { '1W': 4.1, '1M': 1.5, 'YTD': 56.7, '6M': 51.2, '1Y': 90.5 },
  AIFD: { '1W': 2.8, '1M': 2, 'YTD': 41.3, '6M': 38.9, '1Y': 73.4 },
  SPRX: { '1W': 2, '1M': -0.4, 'YTD': 34.5, '6M': 27.5, '1Y': 73.8 },
  AOTG: { '1W': 2.6, '1M': 5.7, 'YTD': 15.6, '6M': 14.4, '1Y': 29.8 },
  // Semiconductors
  SOXX: { '1W': 2.7, '1M': 3.5, 'YTD': 93.2, '6M': 76.9, '1Y': 135.9 },
  PSI:  { '1W': 0.9, '1M': 5, 'YTD': 102.2, '6M': 79.4, '1Y': 156.7 },
  XSD:  { '1W': 2.5, '1M': -1.4, 'YTD': 77.1, '6M': 63.7, '1Y': 112.9 },
  DRAM: { '1W': 6.2, '1M': 7.5, 'YTD': 131.8, '6M': 131.8, '1Y': 131.8 },
  // Broad Tech
  PTF:  { '1W': 3.8, '1M': -3.4, 'YTD': 53.9, '6M': 44.5, '1Y': 75.7 },
  WCLD: { '1W': 3, '1M': 10.8, 'YTD': -1.4, '6M': -0.4, '1Y': -3.6 },
  IGV:  { '1W': 0.3, '1M': 1, 'YTD': -11.2, '6M': -10.6, '1Y': -14 },
  FDTX: { '1W': 2.1, '1M': 3.2, 'YTD': 35, '6M': 32.1, '1Y': 41.6 },
  GTEK: { '1W': -0.2, '1M': 3.3, 'YTD': 48.9, '6M': 42.9, '1Y': 65.7 },
  ARKK: { '1W': 0.3, '1M': 8.7, 'YTD': 6, '6M': 1.5, '1Y': 10.8 },
  MARS: { '1W': -9, '1M': -13.6, 'YTD': 15.2, '6M': 15.2, '1Y': 15.2 },
  FRWD: { '1W': 2.5, '1M': 3.6, 'YTD': 30.3, '6M': 30.3, '1Y': 30.3 },
  BCTK: { '1W': 2, '1M': 4.8, 'YTD': 24, '6M': 21.8, '1Y': 26.3 },
  FWD:  { '1W': 0.8, '1M': 1.6, 'YTD': 32.8, '6M': 24, '1Y': 55.1 },
  CBSE: { '1W': -0.5, '1M': 3.5, 'YTD': 27.1, '6M': 18.9, '1Y': 35 },
  FCUS: { '1W': 2.1, '1M': -5.5, 'YTD': 29.1, '6M': 15.1, '1Y': 57.6 },
  WGMI: { '1W': 7.5, '1M': -9.4, 'YTD': 49.4, '6M': 27, '1Y': 124.3 },
  CNEQ: { '1W': 2.5, '1M': 4.3, 'YTD': 18.3, '6M': 15.6, '1Y': 38.7 },
  SGRT: { '1W': 4.2, '1M': 2.5, 'YTD': 40.2, '6M': 34.9, '1Y': 75.3 },
  SPMO: { '1W': 1.5, '1M': 3.8, 'YTD': 28.3, '6M': 27.5, '1Y': 36.2 },
  XMMO: { '1W': -0.4, '1M': -1.7, 'YTD': 17.3, '6M': 15, '1Y': 24.9 },
  // Electrification
  POW:  { '1W': -3.2, '1M': -5, 'YTD': 42.3, '6M': 37.3, '1Y': 38.2 },
  VOLT: { '1W': -0.9, '1M': 0.4, 'YTD': 34.2, '6M': 30.4, '1Y': 51 },
  PBD:  { '1W': -2.2, '1M': -7.8, 'YTD': 15.8, '6M': 10.8, '1Y': 40 },
  PBW:  { '1W': -2.5, '1M': -9.1, 'YTD': 16.8, '6M': 6.8, '1Y': 58.6 },
  IVEP: { '1W': 0.3, '1M': -0.5, 'YTD': 2.6, '6M': 2.6, '1Y': 2.6 },
  // Industrials
  AIRR: { '1W': -1.2, '1M': -2.6, 'YTD': 26.5, '6M': 15.6, '1Y': 46.1 },
  PRN:  { '1W': -1.4, '1M': -1.8, 'YTD': 32.8, '6M': 25.3, '1Y': 48.6 },
  RSHO: { '1W': 1.2, '1M': 4.4, 'YTD': 39.4, '6M': 36.1, '1Y': 50.6 },
  IDEF: { '1W': -2.7, '1M': 0.7, 'YTD': 4.2, '6M': -7.4, '1Y': 13.8 },
  BILT: { '1W': -0.5, '1M': -2.3, 'YTD': 9.7, '6M': 9.4, '1Y': 12.9 },
  // Meme
  BUZZ: { '1W': 0.3, '1M': -1.2, 'YTD': 12.1, '6M': 4.6, '1Y': 17.3 },
  MEME: { '1W': 0.2, '1M': -12, 'YTD': 35.6, '6M': 9.2, '1Y': -14.3 },
  RKNG: { '1W': 2.1, '1M': -2.2, 'YTD': 0.9, '6M': 0.9, '1Y': 0.9 },
};
// @@END_GENERATED:ETF_RETURNS@@

// @@GENERATED:ETF_DAY_CHANGE@@
// Today's % move per ETF ticker (1D, vs prior close). Refreshed by the 3×/day
// price jobs. Powers the 1D ranking in the theme-ETF side panel.
export const ETF_DAY_CHANGE: Record<string, number> = {
  AIS:  4.42,
  ARTY: 2.31,
  BAI:  3.49,
  IGPT: 3.34,
  IVES: 1.57,
  ALAI: 1,
  CHAT: 2.87,
  AIFD: 2.06,
  SPRX: 4.1,
  AOTG: 2.53,
  SOXX: 3.5,
  PSI:  5.38,
  XSD:  3.8,
  DRAM: 3.74,
  PTF:  4.86,
  WCLD: 2.25,
  IGV:  1.51,
  FDTX: 2.68,
  GTEK: 2.75,
  ARKK: 1.71,
  MARS: -0.63,
  FRWD: 1.85,
  BCTK: 2.51,
  FWD:  2.33,
  CBSE: 2.08,
  FCUS: 2.81,
  WGMI: 3.73,
  CNEQ: 2.31,
  SGRT: 3.76,
  SPMO: 1.67,
  XMMO: 1.35,
  POW:  1.23,
  VOLT: 1.2,
  PBD:  0.51,
  PBW:  1.57,
  IVEP: 1.21,
  AIRR: 1.46,
  PRN:  2.16,
  IDEF: -0.53,
  BILT: -0.18,
  BUZZ: 1.5,
  MEME: 3.83,
  RKNG: 4.8,
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
  'AI & ML': { etfs: ['AIS', 'AOTG', 'SPRX'], series: { '1W': [100, 102.85, 97.96, 99.38, 102.89], '1M': [100, 96.82, 103.18, 104.27, 109.59, 105.45, 106.37, 111.53, 113.17, 105.82, 104.87, 107.53, 104.51, 108.31, 111.84, 106.4, 100.83, 103.71, 98.8, 100.23, 103.75], 'YTD': [100, 102.87, 105.65, 106.63, 105.81, 106.43, 102.02, 104.45, 100.44, 102.16, 102.48, 102.9, 98.32, 106.68, 115.69, 120.39, 124.98, 135.57, 137, 144.57, 157.1, 148.89, 154.26, 154.23, 155.74, 151.51], '6M': [100, 101.94, 101.23, 101.17, 101.69, 97.45, 99.74, 99.99, 97.88, 98.63, 97.12, 86.74, 96.37, 108.65, 112.6, 113.64, 122.97, 130, 126.86, 144.97, 154.94, 138.9, 146.92, 146.84, 148.35, 144.37], '1Y': [100, 102.89, 104.59, 107.04, 108.52, 109.22, 105.34, 108.71, 109.07, 116.41, 121.56, 119.89, 125.1, 130.84, 126.88, 128.32, 136.03, 132.6, 128.93, 119.86, 122.57, 126.79, 130.03, 120.51, 126.99, 130.15, 131.07, 133.93, 132.93, 133.15, 134.25, 128.75, 131.92, 126.69, 128.84, 131.14, 128.35, 114.42, 127.43, 144.09, 149.35, 150.67, 163.59, 173.13, 168.88, 193.5, 207.1, 185.37, 196.37, 196.56, 198.21, 192.62] }, returns: { '1W': 2.9, '1M': 3.8, 'YTD': 51.5, '6M': 44.4, '1Y': 92.6 } },
  'Semiconductors': { etfs: ['DRAM', 'PSI', 'XSD'], series: { '1W': [100, 103.52, 96.69, 98.93, 103.17], '1M': [100, 96.74, 106.52, 108, 114.59, 108.91, 109.95, 118.55, 122.84, 110.79, 110.02, 116.22, 109.94, 113.32, 118.33, 109.35, 100.52, 104.05, 97.17, 99.42, 103.7], 'YTD': [100, 110.95, 114.2, 117.01, 119.09, 124.34, 126.06, 126.52, 126.39, 130.06, 140.55, 142.41, 135.22, 149.04, 163.94, 182.09, 192.48, 194.27, 197.85, 212.93, 219.36, 209.4, 218.55, 211.56, 213.26, 203.71], '6M': [100, 107.76, 106.83, 111.06, 114.09, 116.94, 119.22, 117.82, 117.6, 123.45, 134.01, 127.12, 129.76, 145.32, 160.01, 171.23, 185.76, 181.52, 183.21, 206.54, 214.05, 195.43, 205.94, 198.9, 200.29, 191.66], '1Y': [100, 101.72, 104.46, 103.87, 104.4, 109.51, 107.84, 112.27, 112.27, 115.29, 122.92, 120.35, 126.43, 126.58, 128.84, 130.19, 137.22, 139.62, 140.87, 139.51, 145.98, 146.74, 153.53, 142.7, 143.5, 147.2, 156.28, 157.37, 165.43, 170.38, 174.35, 180.38, 183.36, 172.24, 158.81, 165.47, 161.87, 163.83, 173.94, 195.04, 203.2, 214.72, 236.46, 232.81, 235.87, 249.65, 255.15, 232.55, 236.52, 241.82, 242.35, 233.8] }, returns: { '1W': 3.2, '1M': 3.7, 'YTD': 103.7, '6M': 91.7, '1Y': 133.8 } },
  'Broad Tech': { etfs: ['WGMI', 'PTF', 'SGRT'], series: { '1W': [100, 103.51, 97.51, 101.01, 105.16], '1M': [100, 96.61, 103.11, 105.45, 110.09, 108.11, 108.25, 111.99, 113.28, 108.27, 105.2, 106.88, 104.24, 105.11, 107.11, 100.45, 91.87, 95, 89.56, 92.72, 96.53], 'YTD': [100, 107.37, 113.44, 114.56, 112.2, 114.68, 110.55, 116.16, 109.89, 108.67, 110.59, 112.57, 105.85, 119.91, 127.7, 134.51, 135.28, 149.88, 148.72, 154.31, 167.5, 158.13, 166.3, 161.65, 153.99, 147.82], '6M': [100, 106.14, 102.66, 102.74, 105.15, 101.57, 106.67, 106.61, 98.85, 101.87, 101.1, 90.12, 101.93, 116.92, 119.49, 117.8, 132.84, 137.82, 130.53, 148.19, 156.96, 140.52, 151.94, 147.76, 141.16, 135.48], '1Y': [100, 104.19, 104.53, 103.86, 104.02, 107.86, 107.01, 111.91, 112.91, 124.09, 132.07, 135.29, 143.38, 156.37, 156.52, 145.53, 157.57, 162.79, 144.57, 129.46, 141.73, 144.03, 145.71, 130.27, 135.02, 144.02, 143.61, 153.82, 148.08, 149.68, 151.03, 143.84, 148.34, 140.98, 138.48, 140.42, 142.97, 134.17, 148.27, 166.28, 167.35, 172.59, 190.23, 192.34, 189.71, 215.69, 218.19, 203.35, 218.21, 212.68, 196.04, 191.8] }, returns: { '1W': 5.2, '1M': -3.5, 'YTD': 47.8, '6M': 35.5, '1Y': 91.8 } },
  'Electrification': { etfs: ['VOLT', 'POW', 'PBW'], series: { '1W': [100, 101.38, 96.77, 96.53, 97.81], '1M': [100, 96.68, 101.17, 102, 104.76, 103.57, 103.68, 106.15, 107.28, 102.39, 101.58, 102.36, 99.37, 101.84, 104.33, 101.04, 97.58, 98.91, 94.44, 94.21, 95.46], 'YTD': [100, 104.13, 109.93, 112.37, 112.15, 118.01, 118.49, 122.22, 115.66, 115.96, 116.11, 119.56, 116.34, 123.8, 127.86, 135.67, 142.71, 146.47, 142.92, 144.82, 146.92, 138.96, 142.31, 139.61, 138.8, 131.11], '6M': [100, 106, 106.25, 106.61, 112.21, 112.76, 116.32, 115.07, 109.28, 110.95, 110.78, 105.55, 111.05, 122.01, 124.16, 128.52, 139.19, 139.25, 128.33, 142.56, 142.41, 130.6, 135.41, 132.94, 132.14, 124.84], '1Y': [100, 102.72, 104.69, 102.68, 102.5, 103.11, 103.11, 106.06, 105.18, 107.41, 110.25, 112.22, 115.63, 119.15, 123.45, 121.25, 124.73, 125.17, 123.88, 118.98, 121.64, 125.74, 128.26, 123.69, 128.11, 127.79, 126.36, 132.17, 133.51, 131.58, 135.78, 135.1, 138.23, 136.11, 137.29, 138.91, 141.75, 139.35, 145.71, 154.54, 155.8, 151.88, 162.74, 165.22, 157.19, 166.85, 170.26, 159.05, 161, 158.84, 156.59, 149.23] }, returns: { '1W': -2.2, '1M': -4.5, 'YTD': 31.1, '6M': 24.8, '1Y': 49.2 } },
  'Industrials': { etfs: ['RSHO', 'PRN', 'BILT'], series: { '1W': [100, 100.4, 100, 98.62, 99.79], '1M': [100, 98.87, 101.25, 100.68, 100.38, 100.46, 98.84, 101.09, 102.51, 101.92, 101.92, 103.71, 102.69, 102.58, 103.25, 102.85, 100.29, 100.69, 100.32, 98.92, 100.09], 'YTD': [100, 102.86, 107.52, 107.45, 108.46, 115.36, 118.73, 119.8, 117.85, 113.28, 111.35, 112.9, 111.05, 117.43, 120.7, 122.44, 123.98, 125.58, 126.32, 123.7, 126.58, 126.9, 125.96, 129.85, 131.12, 127.3], '6M': [100, 104.15, 104.99, 105.26, 109.36, 113.97, 116.63, 116.65, 111.78, 110, 108.55, 107.18, 110.05, 114.61, 117.59, 117.97, 121.41, 122.62, 120.95, 121.81, 124.23, 123.36, 122.17, 125.94, 127.19, 123.59], '1Y': [100, 102.02, 102.63, 102.91, 102.09, 103.01, 101.63, 103.59, 102.47, 104.37, 105.38, 104.7, 107.39, 107.62, 107.1, 107.54, 111.11, 108.68, 108.31, 104.09, 106.05, 107.56, 110.22, 107.34, 109.6, 109.94, 112.22, 117.18, 117.23, 119.37, 124.08, 127.45, 129.23, 125.94, 122.72, 119.53, 120.24, 118.29, 122.16, 130.12, 129.85, 132.02, 135.64, 137.28, 134.5, 136.68, 137.9, 137.56, 137.71, 140.57, 141.64, 137.37] }, returns: { '1W': -0.2, '1M': 0.1, 'YTD': 27.3, '6M': 23.6, '1Y': 37.4 } },
  'Meme': { etfs: ['BUZZ', 'RKNG', 'MEME'], series: { '1W': [100, 101.87, 96.56, 97.95, 100.86], '1M': [100, 97.26, 103.6, 102.22, 107.95, 103.68, 104.35, 108.06, 107.94, 102.9, 99.43, 98.92, 96.82, 101.04, 103.14, 99.23, 94.03, 95.8, 90.88, 92.15, 94.85], 'YTD': [100, 106.79, 105.55, 105.8, 99.12, 99.94, 93.39, 94.54, 93.41, 93.13, 90.43, 93.72, 91.36, 100.82, 113.7, 112.85, 116.32, 125.35, 126.34, 135.76, 140.86, 128.78, 128.2, 122.8, 121.97, 116.24], '6M': [100, 101.11, 93.17, 89.94, 89.67, 85.63, 85.84, 85.65, 85.12, 85.73, 80.41, 76.31, 84.92, 98.04, 102.31, 98.75, 108.46, 114.22, 109.25, 124.47, 128.35, 112.53, 115.38, 110.62, 109.94, 104.92], '1Y': [100, 104.26, 99.46, 94.39, 91.3, 91.06, 87.29, 83.64, 83.47, 84.1, 87.06, 88.46, 89.48, 88.58, 89.29, 86.81, 90.68, 90.18, 90.5, 87.79, 85.41, 87.12, 85.46, 86.47, 85.65, 88.77, 91.97, 90.66, 90.42, 89.65, 89.95, 89, 89.69, 89.41, 93.33, 96.17, 95.63, 92.87, 96.57, 104.11, 110.63, 109.66, 104.77, 114.59, 114.49, 112.61, 115.27, 108.94, 109.61, 105.68, 99.91, 101.29] }, returns: { '1W': 0.9, '1M': -5.2, 'YTD': 16.2, '6M': 4.9, '1Y': 1.3 } },
};
// @@END_GENERATED:THEME_REPRESENTATIVES@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 9, avgWeight: 6.81, proScore: 6.13, coverage: 0.9,
      price: 202.78, weeklyPrices: [194.83, 195.55, 196.93, 204.12, 202.78], weeklyChange: 4.08, dayChange: -0.66, sortRank: 0, periodReturns: { '1M': -2.6, 'YTD': 8.7, '6M': 9.7, '1Y': 23.6 },
      priceHistory: { '1D': [204.12, 201.68, 201.01, 199.5, 200.37, 200.88, 201.36, 201.72, 201.39, 202.11, 202.07, 201.95, 201.99, 203.07, 202.83, 203.23, 203.11, 203.3, 203.84, 203.72, 203.39, 203.79, 203.95, 202.78], '1W': [194.83, 195.55, 196.93, 204.12, 202.78], '1M': [208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 196.93, 204.12, 202.78], 'YTD': [186.5, 185.04, 187.05, 187.67, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 198.45, 215.2, 225.32, 215.33, 224.36, 208.64, 207.41, 199, 197.58, 202.78], '6M': [184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 214.86, 222.82, 208.19, 207.41, 199, 197.58, 202.78], '1Y': [164.1, 173, 173.74, 177.87, 180.77, 182.02, 175.4, 181.6, 171.66, 177.17, 176.24, 177.69, 188.89, 192.57, 181.81, 182.16, 207.04, 195.21, 193.8, 186.52, 180.26, 183.38, 180.93, 174.14, 190.53, 188.12, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 181.93, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 222.82, 208.19, 207.41, 199, 197.58, 202.78] },
      velocityScore: { '1D': 2.2, '1W': 1, '1M': 8.3, '6M': null }, isNew: false,
      marketCap: '$4.9T', pe: 31.1, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.49,
      etfPresence: { AIS: 2.65, ARTY: 4.78, BAI: 4.44, IGPT: 8.01, IVES: 4.88, ALAI: 12.96, CHAT: 7.29, AIFD: 6.28, SPRX: false, AOTG: 9.98 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 5.62, proScore: 5.06, coverage: 0.9,
      price: 991.64, weeklyPrices: [975.56, 984.75, 938.38, 948.80, 991.64], weeklyChange: 1.65, dayChange: 4.52, sortRank: 0, periodReturns: { '1M': 6, 'YTD': 247.4, '6M': 187.4, '1Y': 705.5 },
      priceHistory: { '1D': [948.8, 1017.05, 1030.67, 1015.52, 1013.47, 1013.52, 1021.17, 1017.53, 1018.65, 1017.6, 1021.38, 1011.9, 1016.21, 1022.69, 1024.61, 1024.57, 1020.29, 1019.77, 1013.67, 1011.86, 1002.27, 1004.51, 997.44, 991.64], '1W': [975.56, 984.75, 938.38, 948.8, 991.64], '1M': [935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 948.8, 991.64], 'YTD': [285.41, 327.02, 336.63, 399.65, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 542.21, 746.81, 724.66, 751, 1035.5, 949.28, 1020.76, 1048.51, 1032.28, 991.64], '6M': [345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1032.28, 991.64], '1Y': [123.11, 113.26, 111.73, 109.14, 111.87, 125.29, 117.21, 117.75, 124.21, 150.57, 168.89, 156.83, 183.75, 192.33, 202.53, 206.71, 226.63, 237.5, 244.9, 225.92, 230.26, 226.65, 258.46, 248.55, 284.79, 312.15, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1064.1, 935.89, 1020.76, 1048.51, 1032.28, 991.64] },
      velocityScore: { '1D': 0, '1W': -7.8, '1M': -9, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 22.4, revenueGrowth: 346, eps: 44.21, grossMargin: 73, dividendYield: 0.06,
      etfPresence: { AIS: 6.73, ARTY: 4.75, BAI: 6.16, IGPT: 7.66, IVES: 4.46, ALAI: 0.87, CHAT: 3.53, AIFD: 6.53, SPRX: false, AOTG: 9.89 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.57, proScore: 5.01, coverage: 0.9,
      price: 546.72, weeklyPrices: [517.82, 552.05, 516.11, 517.41, 546.72], weeklyChange: 5.58, dayChange: 5.67, sortRank: 0, periodReturns: { '1M': 15, 'YTD': 155.3, '6M': 169.1, '1Y': 279.2 },
      priceHistory: { '1D': [517.4, 549.87, 557.37, 550.3, 557.93, 554.23, 555.76, 554.14, 552.63, 556.35, 554.66, 550.65, 552.32, 551.76, 549.47, 548.67, 545.88, 546.51, 545.43, 546.95, 544.47, 543.91, 547.39, 546.72], '1W': [517.82, 552.05, 516.11, 517.41, 546.72], '1M': [475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 517.41, 546.72], 'YTD': [214.16, 204.68, 227.92, 259.68, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 360.54, 455.19, 424.1, 467.51, 510.13, 490.33, 507.29, 519.74, 540.88, 546.72], '6M': [203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 503.89, 521.54, 475.51, 507.29, 519.74, 540.88, 546.72], '1Y': [144.16, 160.41, 162.12, 176.31, 172.4, 180.95, 165.2, 167.13, 161.79, 155.67, 157.92, 161.27, 169.73, 232.89, 234.56, 234.99, 264.33, 256.33, 258.89, 223.55, 214.24, 215.98, 221.43, 201.06, 214.99, 221.08, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 196.31, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 521.54, 475.51, 507.29, 519.74, 540.88, 546.72] },
      velocityScore: { '1D': -0.2, '1W': -0.6, '1M': 7.7, '6M': null }, isNew: false,
      marketCap: '$891B', pe: 182.2, revenueGrowth: 38, eps: 3, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 5.09, ARTY: 5, BAI: 5.11, IGPT: 8.52, IVES: 4.62, ALAI: 1.29, CHAT: 3.84, AIFD: false, SPRX: 0.67, AOTG: 15.95 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.76, proScore: 3.01, coverage: 0.8,
      price: 401.11, weeklyPrices: [360.45, 373.90, 370.78, 388.69, 401.11], weeklyChange: 11.28, dayChange: 3.2, sortRank: 0, periodReturns: { '1M': 2.3, 'YTD': 15.9, '6M': 16.3, '1Y': 45.6 },
      priceHistory: { '1D': [388.69, 397.52, 394.61, 389.68, 393.99, 394.08, 397.7, 399.64, 401.47, 400.91, 401.24, 401.04, 403.3, 403.8, 405.18, 406.17, 405.53, 404.61, 405.45, 405.77, 402.93, 402.03, 401.07, 401.11], '1W': [360.45, 373.9, 370.78, 388.69, 401.11], '1M': [392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 370.78, 388.69, 401.11], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 421.28, 430, 425.19, 414.14, 459.97, 396.6, 376.71, 382.07, 369.34, 401.11], '6M': [344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 422.01, 481.57, 392.16, 376.71, 382.07, 369.34, 401.11], '1Y': [275.4, 286.45, 288.71, 293.7, 303.76, 311.23, 291.17, 300.25, 306.1, 359.63, 345.35, 336.1, 338.18, 345.02, 354.15, 344.29, 385.98, 358.98, 355.22, 354.42, 397.57, 381.03, 406.37, 329.88, 352.13, 343.42, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 321.31, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 481.57, 392.16, 376.71, 382.07, 369.34, 401.11] },
      velocityScore: { '1D': 3.4, '1W': 8.7, '1M': 19.4, '6M': null }, isNew: false,
      marketCap: '$1.9T', pe: 66.6, revenueGrowth: 48, eps: 6.02, grossMargin: 76, dividendYield: 0.67,
      etfPresence: { AIS: 0.72, ARTY: 4.69, BAI: 4.55, IGPT: false, IVES: 4.78, ALAI: 4.1, CHAT: 4.71, AIFD: 5.17, SPRX: false, AOTG: 1.4 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 7, avgWeight: 3.21, proScore: 2.25, coverage: 0.7,
      price: 243.27, weeklyPrices: [245.29, 249.27, 230.70, 231.71, 243.27], weeklyChange: -0.82, dayChange: 4.99, sortRank: 0, periodReturns: { '1M': -8.8, 'YTD': 186.3, '6M': 192.3, '1Y': 231.6 },
      priceHistory: { '1D': [231.71, 249.33, 248.85, 244.28, 245.62, 246.34, 247.98, 246.59, 247, 247.96, 248.09, 246.13, 246.9, 247.38, 248.32, 247.82, 246.88, 247.37, 246.49, 246.82, 244.65, 244.41, 244.13, 243.27], '1W': [245.29, 249.27, 230.7, 231.71, 243.27], '1M': [266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 245.29, 249.27, 230.7, 231.71, 243.27], 'YTD': [84.98, 83.45, 80.38, 80.23, 78.66, 82.35, 79.01, 78.39, 77.51, 93.3, 87.62, 98.45, 106.71, 119.93, 133.37, 165.56, 164.95, 170.13, 176.89, 196.33, 219.43, 288.85, 278.67, 276.7, 272.05, 243.27], '6M': [83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 208.26, 290.79, 266.88, 278.67, 276.7, 272.05, 243.27], '1Y': [73.36, 72.01, 74.04, 80.37, 75.85, 79.04, 71.22, 74.79, 64.1, 66.59, 74.23, 83.81, 86.2, 90.68, 88.23, 82.77, 90.15, 92.9, 89.33, 81.32, 87.72, 98.19, 89.43, 84.47, 86.34, 90.23, 83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 77.51, 93.3, 90.79, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 198.7, 290.79, 266.88, 278.67, 276.7, 272.05, 243.27] },
      velocityScore: { '1D': 0.9, '1W': -11.1, '1M': -14.4, '6M': null }, isNew: false,
      marketCap: '$213B', pe: 83.3, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.1,
      etfPresence: { AIS: 3.65, ARTY: 3.78, BAI: 1.77, IGPT: 3.11, IVES: false, ALAI: false, CHAT: 1.42, AIFD: 5.51, SPRX: 3.24, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 5.18, proScore: 3.11, coverage: 0.6,
      price: 358.89, weeklyPrices: [359.91, 366.46, 367.03, 361.92, 358.89], weeklyChange: -0.28, dayChange: -0.84, sortRank: 0, periodReturns: { '1M': -1.5, 'YTD': 14.7, '6M': 9.2, '1Y': 102.1 },
      priceHistory: { '1D': [361.92, 358.2, 355.07, 351.76, 354.15, 353.14, 352.67, 353.61, 353.23, 353.05, 353.36, 355.08, 355.21, 355.07, 355.73, 355.99, 356.82, 357.22, 356.68, 356.61, 357.73, 357.99, 358.61, 358.89], '1W': [359.91, 366.46, 367.03, 361.92, 358.89], '1M': [364.26, 356.38, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03, 349.68, 346.13, 345.29, 343.71, 337.39, 353.65, 357.37, 361.21, 359.91, 366.46, 367.03, 361.92, 358.89], 'YTD': [313, 325.44, 332.78, 327.93, 343.69, 324.32, 302.02, 310.9, 303.58, 307.04, 307.69, 290.93, 297.39, 318.49, 336.02, 338.89, 385.69, 400.8, 396.78, 382.97, 376.37, 363.31, 373.25, 345.29, 361.21, 358.89], '6M': [328.57, 330, 333.26, 343.69, 324.32, 302.02, 310.9, 306.52, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 387.35, 387.66, 388.88, 361.85, 364.26, 373.25, 345.29, 361.21, 358.89], '1Y': [177.62, 183.58, 192.17, 191.9, 196.52, 202.94, 199.32, 207.48, 232.3, 240.37, 252.03, 245.79, 245.69, 241.53, 251.46, 253.08, 274.57, 284.31, 286.71, 292.81, 319.95, 317.62, 312.43, 302.46, 313.51, 316.54, 328.57, 330, 333.26, 343.69, 324.32, 302.02, 310.9, 303.58, 307.04, 310.92, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 387.35, 387.66, 388.83, 361.85, 364.26, 373.25, 345.29, 361.21, 358.89] },
      velocityScore: { '1D': -1.6, '1W': 5.1, '1M': 16, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.4, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.39, IGPT: 8.13, IVES: 4.75, ALAI: false, CHAT: 5.66, AIFD: 5.15, SPRX: false, AOTG: 4.02 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 6, avgWeight: 4.87, proScore: 2.92, coverage: 0.6,
      price: 436.96, weeklyPrices: [434.16, 451.79, 432.57, 436.98, 436.96], weeklyChange: 0.64, dayChange: 0, sortRank: 0, periodReturns: { '1M': 2.1, 'YTD': 43.8, '6M': 35, '1Y': 90.2 },
      priceHistory: { '1D': [436.98, 442.97, 444.07, 439.55, 441.82, 442.01, 443.28, 443.84, 444.24, 444.08, 442.72, 441.67, 442.08, 442.71, 442.66, 441.63, 440.03, 439.33, 439.46, 440.4, 437.98, 438.36, 437.65, 436.96], '1W': [434.16, 451.79, 432.57, 436.98, 436.96], '1M': [427.92, 408.75, 421.07, 423.93, 441.4, 425.83, 432.15, 462.12, 467.67, 436.39, 440.83, 434.99, 432.35, 455.1, 477.57, 444.23, 434.16, 451.79, 432.57, 436.98, 436.96], 'YTD': [303.89, 318.01, 341.64, 334.87, 341.36, 355.41, 364.2, 385.75, 353.13, 347.09, 339.57, 347.75, 341.49, 365.49, 363.35, 382.66, 397.67, 411.68, 404.35, 404.52, 435.63, 426.8, 425.83, 440.83, 444.23, 436.96], '6M': [323.63, 342.4, 332.71, 341.36, 355.41, 364.2, 385.75, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 392.61, 412.32, 446.69, 427.92, 425.83, 440.83, 444.23, 436.96], '1Y': [229.76, 245.6, 241.6, 241.62, 242.62, 241, 228.6, 239.29, 235.21, 258.91, 268.64, 276.66, 288.11, 299.88, 299.84, 290.73, 305.09, 293.64, 290.62, 282.37, 289.96, 292.93, 304.85, 284.68, 302.84, 322.25, 323.63, 342.4, 332.71, 341.36, 355.41, 364.2, 385.75, 353.13, 347.09, 345.98, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 392.61, 422.73, 446.69, 427.92, 425.83, 440.83, 444.23, 436.96] },
      velocityScore: { '1D': -0.3, '1W': 0.7, '1M': 9.4, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 38, revenueGrowth: 35, eps: 11.49, grossMargin: 62, dividendYield: 0.87,
      etfPresence: { AIS: 3.49, ARTY: false, BAI: 4.71, IGPT: false, IVES: 4.88, ALAI: 5.47, CHAT: false, AIFD: 3.42, SPRX: false, AOTG: 7.27 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 6, avgWeight: 2.58, proScore: 1.55, coverage: 0.6,
      price: 184.69, weeklyPrices: [159.99, 173.28, 166.46, 181.05, 184.69], weeklyChange: 15.44, dayChange: 2.01, sortRank: 0, periodReturns: { '1M': 21.4, 'YTD': 41, '6M': 50.3, '1Y': 73.8 },
      priceHistory: { '1D': [181.05, 186.13, 184.34, 181.18, 181.12, 180.82, 184, 184.86, 185.16, 184.42, 184.9, 184.28, 183.71, 184.11, 184.7, 184.67, 184.6, 185.05, 184.88, 185.8, 184.67, 184.63, 184.66, 184.69], '1W': [159.99, 173.28, 166.46, 181.05, 184.69], '1M': [152.16, 151.76, 156.4, 163.24, 169.09, 168.01, 164.93, 169.67, 174.56, 162.2, 161.74, 165.45, 157.6, 164.1, 169.88, 166.62, 159.99, 173.28, 166.46, 181.05, 184.69], 'YTD': [131.03, 123.72, 130.59, 136.34, 138.37, 141.74, 142.58, 128.77, 124.6, 139.62, 136.07, 135.01, 124.85, 146.05, 161.01, 172.55, 172.7, 141.77, 141.97, 154.03, 170.68, 156.4, 168.01, 161.74, 166.62, 184.69], '6M': [122.89, 129.83, 143.72, 138.37, 141.74, 142.58, 128.77, 129.3, 137.17, 135.35, 135.88, 116.13, 133.64, 154.37, 172.86, 165.29, 170.22, 142.54, 141.58, 158.01, 175.33, 152.16, 168.01, 161.74, 166.62, 184.69], '1Y': [106.29, 111.98, 114.04, 123.22, 139.28, 136.48, 131.47, 133.27, 141.17, 153.04, 146.66, 143.06, 144.46, 158.23, 146.01, 152.76, 162.03, 140.42, 134.98, 124.81, 127.65, 128.55, 134.39, 124.62, 131.84, 137.19, 122.89, 129.83, 143.72, 138.37, 141.74, 142.58, 128.77, 124.6, 139.62, 133.07, 135.88, 116.13, 133.64, 154.37, 172.86, 165.29, 170.22, 142.54, 141.58, 154.31, 175.33, 152.16, 168.01, 161.74, 166.62, 184.69] },
      velocityScore: { '1D': 6.2, '1W': 11.5, '1M': 6.9, '6M': null }, isNew: false,
      marketCap: '$233B', pe: 63.5, revenueGrowth: 35, eps: 2.91, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.7, ARTY: 2.77, BAI: 1.55, IGPT: false, IVES: false, ALAI: false, CHAT: 2.39, AIFD: 4.95, SPRX: 2.14, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 6 of 10 AI & ML ETFs (60% coverage) with average weight 2.6% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 4.2, proScore: 2.1, coverage: 0.5,
      price: 631.48, weeklyPrices: [582.90, 600.29, 615.58, 603.12, 631.48], weeklyChange: 8.33, dayChange: 4.7, sortRank: 0, periodReturns: { '1M': 8, 'YTD': -4.3, '6M': -3.3, '1Y': -13.2 },
      priceHistory: { '1D': [603.12, 586.09, 597.87, 592.26, 595.48, 599.09, 602.61, 604.32, 606.34, 609.24, 614.5, 613.79, 614.02, 611.63, 612.6, 611.94, 612.88, 614.24, 615.76, 615.02, 618.16, 624.22, 629.6, 631.48], '1W': [582.9, 600.29, 615.58, 603.12, 631.48], '1M': [584.59, 570.98, 568.43, 566.98, 593.48, 600.21, 567.58, 577.22, 563.85, 562.2, 557.67, 542.87, 550.25, 562.6, 563.29, 612.91, 582.9, 600.29, 615.58, 603.12, 631.48], 'YTD': [660.09, 646.06, 620.8, 658.76, 706.41, 677.22, 639.29, 639.3, 655.08, 654.07, 615.68, 594.89, 579.23, 628.39, 676.87, 659.15, 608.75, 609.63, 614.23, 610.26, 600.47, 585.39, 600.21, 557.67, 612.91, 631.48], '6M': [653.06, 620.25, 672.36, 706.41, 677.22, 639.29, 639.3, 653.56, 647.39, 627.45, 604.06, 536.38, 575.05, 662.49, 668.84, 671.34, 604.96, 603, 602.61, 612.34, 597.63, 584.59, 600.21, 557.67, 612.91, 631.48], '1Y': [727.24, 701.41, 714.8, 773.44, 761.83, 782.13, 747.72, 747.38, 748.65, 750.9, 780.25, 748.91, 727.05, 733.51, 712.07, 734, 751.67, 635.95, 609.01, 590.32, 633.61, 661.53, 652.71, 664.45, 663.29, 658.79, 653.06, 620.25, 672.36, 706.41, 677.22, 639.29, 639.3, 655.08, 654.07, 622.66, 604.06, 536.38, 575.05, 662.49, 668.84, 671.34, 604.96, 603, 602.61, 635.26, 597.63, 584.59, 600.21, 557.67, 612.91, 631.48] },
      velocityScore: { '1D': -2.8, '1W': 1.4, '1M': 46.9, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: 23, revenueGrowth: 33, eps: 27.5, grossMargin: 82, dividendYield: 0.35,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 8.53, IVES: 4.93, ALAI: 4.2, CHAT: 2.23, AIFD: false, SPRX: false, AOTG: 1.13 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 4, proScore: 2, coverage: 0.5,
      price: 247.04, weeklyPrices: [242.67, 244.16, 245.98, 243.62, 247.04], weeklyChange: 1.8, dayChange: 1.4, sortRank: 0, periodReturns: { '1M': 1.2, 'YTD': 7, '6M': -0.1, '1Y': 11.1 },
      priceHistory: { '1D': [243.62, 241.85, 242.34, 239.88, 241.49, 241.18, 241.42, 241.82, 241.52, 241.68, 242.2, 242.58, 241.92, 243.28, 244.01, 243.91, 244.15, 244.67, 245.01, 244.38, 245, 245.49, 246.02, 247.04], '1W': [242.67, 244.16, 245.98, 243.62, 247.04], '1M': [244.19, 238, 241.51, 238.55, 246.02, 246, 237.5, 244.39, 232.79, 234.11, 234.27, 227.01, 232.69, 240.14, 238.34, 241.7, 242.67, 244.16, 245.98, 243.62, 247.04], 'YTD': [230.82, 246.29, 238.18, 239.16, 242.96, 208.72, 201.15, 208.56, 208.73, 214.33, 209.87, 211.71, 210.57, 233.65, 249.7, 255.08, 268.26, 272.68, 264.14, 266.32, 261.26, 245.22, 246, 234.27, 241.7, 247.04], '6M': [247.38, 239.12, 238.42, 242.96, 208.72, 201.15, 208.56, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 259.34, 265.29, 256.52, 244.19, 246, 234.27, 241.7, 247.04], '1Y': [222.26, 223.88, 232.23, 234.11, 223.13, 230.98, 223.81, 229.12, 235.68, 229.95, 231.23, 218.15, 222.41, 227.74, 214.47, 221.09, 230.3, 250.2, 244.2, 222.69, 229.16, 229.11, 230.28, 226.76, 232.52, 233.06, 247.38, 239.12, 238.42, 242.96, 208.72, 201.15, 208.56, 208.73, 214.33, 215.2, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 259.34, 271.85, 256.52, 244.19, 246, 234.27, 241.7, 247.04] },
      velocityScore: { '1D': -2, '1W': 2, '1M': 3.1, '6M': null }, isNew: false,
      marketCap: '$2.7T', pe: 32.1, revenueGrowth: 17, eps: 7.7, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 4.85, ALAI: 4.92, CHAT: 2.58, AIFD: 3.55, SPRX: false, AOTG: 4.08 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.82, proScore: 1.91, coverage: 0.5,
      price: 417.45, weeklyPrices: [406.42, 432.74, 382.89, 393.16, 417.45], weeklyChange: 2.71, dayChange: 6.18, sortRank: 0, periodReturns: { '1M': 22.2, 'YTD': 150.9, '6M': 156.7, '1Y': 330.3 },
      priceHistory: { '1D': [393.16, 428, 429.64, 418, 421.57, 422.02, 429.92, 426.32, 425, 428.79, 426.2, 426.22, 428.24, 427.87, 429.41, 428.87, 425.91, 425.04, 419.46, 418.24, 415.91, 416.13, 417.09, 417.45], '1W': [406.42, 432.74, 382.89, 393.16, 417.45], '1M': [341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42, 432.74, 382.89, 393.16, 417.45], 'YTD': [166.36, 156.73, 174.45, 169.66, 152.44, 187.67, 123.69, 128.4, 109.8, 116.48, 126.34, 120.33, 106.33, 129.46, 170.81, 197.54, 202.68, 199.79, 232.68, 306.88, 320.09, 346.33, 361.71, 399.92, 430.86, 417.45], '6M': [162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.4, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 318.72, 355.76, 341.7, 361.71, 399.92, 430.86, 417.45], '1Y': [97.02, 97.95, 121.68, 136.73, 170.89, 190.69, 172.45, 179.2, 187.95, 232.9, 251.88, 200.64, 209.6, 225.43, 163.55, 163.64, 173.62, 181.94, 157.79, 142.01, 154.22, 152.51, 173.7, 145.88, 167.26, 167.11, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.4, 109.8, 116.48, 127.57, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 325.33, 355.76, 341.7, 361.71, 399.92, 430.86, 417.45] },
      velocityScore: { '1D': 9.8, '1W': 2.7, '1M': 26.5, '6M': null }, isNew: false,
      marketCap: '$72B', pe: 280.2, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 2.2, ARTY: 1.38, BAI: false, IGPT: false, IVES: false, ALAI: 1.05, CHAT: 2.36, AIFD: false, SPRX: 12.09, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.68, proScore: 1.84, coverage: 0.5,
      price: 384.36, weeklyPrices: [390.49, 386.74, 388.84, 383.34, 384.36], weeklyChange: -1.57, dayChange: 0.27, sortRank: 0, periodReturns: { '1M': -4.7, 'YTD': -20.5, '6M': -19.8, '1Y': -23.4 },
      priceHistory: { '1D': [383.34, 378.33, 377.56, 375.31, 377.54, 377.86, 379.08, 380.13, 380.17, 380.05, 379.11, 380.1, 379.28, 379.56, 380.83, 380.58, 381.13, 380.68, 380.67, 380.63, 381.46, 382.39, 383.4, 384.36], '1W': [390.49, 386.74, 388.84, 383.34, 384.36], '1M': [403.41, 397.36, 390.34, 390.74, 399.76, 393.83, 378.91, 379.4, 367.34, 373.94, 365.46, 352.83, 372.97, 368.57, 373.02, 384.28, 390.49, 386.74, 388.84, 383.34, 384.36], 'YTD': [483.62, 478.11, 456.66, 465.95, 423.37, 413.6, 396.86, 389, 403.93, 405.76, 391.79, 371.04, 369.37, 373.07, 420.26, 415.75, 414.44, 415.12, 421.92, 418.57, 460.52, 411.74, 393.83, 365.46, 384.28, 384.36], '6M': [479.28, 459.86, 470.28, 423.37, 413.6, 396.86, 389, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 417.42, 416.03, 441.31, 403.41, 393.83, 365.46, 384.28, 384.36], '1Y': [501.48, 511.7, 510.88, 533.5, 520.84, 522.48, 505.72, 506.74, 507.97, 501.01, 508.45, 507.03, 515.74, 522.4, 511.61, 520.56, 541.55, 507.16, 511.14, 487.12, 485.5, 480.84, 483.47, 483.98, 487.71, 472.85, 479.28, 459.86, 470.28, 423.37, 413.6, 396.86, 389, 403.93, 405.76, 399.41, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 417.42, 412.67, 441.31, 403.41, 393.83, 365.46, 384.28, 384.36] },
      velocityScore: { '1D': -1.6, '1W': 3.4, '1M': 7, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 22.9, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 0.95,
      etfPresence: { AIS: false, ARTY: 2.62, BAI: false, IGPT: false, IVES: 4.7, ALAI: 5.11, CHAT: 2.39, AIFD: false, SPRX: false, AOTG: 3.58 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 5, avgWeight: 2.57, proScore: 1.29, coverage: 0.5,
      price: 785.77, weeklyPrices: [728.32, 731.25, 698.91, 707.10, 785.77], weeklyChange: 7.89, dayChange: 11.13, sortRank: 0, periodReturns: { '1M': -4.4, 'YTD': 113.2, '6M': 123.6, '1Y': 748.4 },
      priceHistory: { '1D': [707.1, 792.35, 793.03, 779.17, 784.22, 784.59, 790.99, 788.84, 789.18, 793.08, 790.95, 787.09, 789.67, 789.54, 793.68, 793.4, 791.02, 794, 786.25, 802.97, 801.98, 795.82, 793, 785.77], '1W': [728.32, 731.25, 698.91, 707.1, 785.77], '1M': [821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06, 801.16, 728.32, 731.25, 698.91, 707.1, 785.77], 'YTD': [368.59, 348.26, 343.27, 339.19, 423.42, 577.15, 600.42, 688.27, 694.43, 672, 700.81, 777.17, 764.65, 894.13, 891.22, 846.89, 949.93, 903.8, 970.7, 946.9, 905, 895.4, 875.36, 842.53, 801.16, 785.77], '6M': [351.42, 324.25, 332.45, 423.42, 577.15, 600.42, 688.27, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 890.09, 910.81, 1029.15, 821.76, 875.36, 842.53, 801.16, 785.77], '1Y': [92.62, 102.64, 102.85, 110.08, 111.13, 114.62, 115.89, 125.84, 141.91, 164.88, 171.5, 159.11, 169.75, 159.76, 163.23, 168.5, 214.28, 232.75, 253.81, 268.92, 308.28, 327.85, 372.09, 337.13, 390.77, 357.05, 351.42, 324.25, 332.45, 423.42, 577.15, 600.42, 688.27, 694.43, 672, 649.56, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 890.09, 902.31, 1029.15, 821.76, 875.36, 842.53, 801.16, 785.77] },
      velocityScore: { '1D': 5.7, '1W': 1.6, '1M': 3.2, '6M': null }, isNew: false,
      marketCap: '$61B', pe: 138.8, revenueGrowth: 90, eps: 5.66, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.34, IGPT: false, IVES: false, ALAI: 1.24, CHAT: 1.38, AIFD: 4.21, SPRX: 3.69, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 5 of 10 AI & ML ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 5, avgWeight: 2.21, proScore: 1.11, coverage: 0.5,
      price: 1858.27, weeklyPrices: [1745.00, 1744.43, 1617.70, 1727.18, 1858.27], weeklyChange: 6.49, dayChange: 7.59, sortRank: 0, periodReturns: { '1M': 12.9, 'YTD': 682.8, '6M': 392.4, '1Y': 3858 },
      priceHistory: { '1D': [1727.18, 1813.83, 1855.76, 1840.46, 1845.9, 1856.69, 1890.19, 1882, 1880.82, 1880.81, 1889.3, 1878.96, 1883, 1903.25, 1923.74, 1935.58, 1934.19, 1944.47, 1931.6, 1927.01, 1887.62, 1902.27, 1882.57, 1858.27], '1W': [1745, 1744.43, 1617.7, 1727.18, 1858.27], '1M': [1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745, 1744.43, 1617.7, 1727.18, 1858.27], 'YTD': [237.38, 334.54, 409.24, 473.83, 665.24, 583.4, 590.59, 638.52, 565.41, 618.89, 753.69, 677.86, 692.73, 851.57, 919.47, 932.43, 1187, 1562.34, 1407.61, 1478.69, 1761.43, 1642, 1991.55, 1914.46, 2032.22, 1858.27], '6M': [377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46, 2032.22, 1858.27], '1Y': [46.95, 41.52, 42.06, 42.92, 40.69, 46.68, 44.4, 48.44, 62.5, 84.3, 98.87, 94.29, 124.14, 129.68, 144.27, 167.05, 204.36, 216.5, 283.1, 245.96, 215.04, 213.31, 241.61, 219.46, 250.05, 274.08, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 565.41, 618.89, 720.17, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1716.36, 1646.54, 1991.55, 1914.46, 2032.22, 1858.27] },
      velocityScore: { '1D': 4.7, '1W': -10.5, '1M': 54.2, '6M': null }, isNew: false,
      marketCap: '$275B', pe: 63.7, revenueGrowth: 251, eps: 29.19, grossMargin: 56, dividendYield: null,
      etfPresence: { AIS: 2.11, ARTY: false, BAI: 2.89, IGPT: 3.93, IVES: false, ALAI: 0.49, CHAT: false, AIFD: false, SPRX: false, AOTG: 1.64 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'CRDO', name: 'Credo Technology Group Holding Ltd', easyScore: 5, avgWeight: 2.09, proScore: 1.04, coverage: 0.5,
      price: 265.65, weeklyPrices: [241.91, 265.55, 246.40, 258.69, 265.65], weeklyChange: 9.81, dayChange: 2.69, sortRank: 0, periodReturns: { '1M': 13.4, 'YTD': 84.6, '6M': 76.6, '1Y': 173 },
      priceHistory: { '1D': [258.69, 272.41, 268.37, 264.24, 270.56, 270.62, 277.26, 276.3, 275.8, 275.96, 274.79, 272.48, 274.01, 275.29, 276.29, 275.27, 272.02, 271.35, 267.89, 269.2, 266.28, 266.17, 267.68, 265.65], '1W': [241.91, 265.55, 246.4, 258.69, 265.65], '1M': [234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 265.55, 246.4, 258.69, 265.65], 'YTD': [143.89, 141.59, 149.12, 133.16, 119.96, 123.41, 124.8, 120.83, 97.3, 112.33, 101.72, 103.91, 95.92, 107.93, 158.93, 185.54, 184.38, 188.51, 172.17, 218.41, 226.1, 222.27, 239.18, 268.99, 259.09, 265.65], '6M': [150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.64, 229, 234.32, 239.18, 268.99, 259.09, 265.65], '1Y': [97.29, 98.45, 101.17, 111.55, 119.78, 117.33, 105.99, 122.73, 134, 159.32, 172.31, 144.94, 149.63, 151.15, 136.53, 150.97, 171.52, 173.16, 160.34, 141.88, 164.01, 180.92, 154.47, 138.57, 144.83, 140.24, 150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 97.3, 112.33, 104.06, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.23, 229, 234.32, 239.18, 268.99, 259.09, 265.65] },
      velocityScore: { '1D': 7.2, '1W': 8.3, '1M': 46.5, '6M': null }, isNew: false,
      marketCap: '$50B', pe: 105.8, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: 1.17, ARTY: 1.32, BAI: 2.28, IGPT: false, IVES: false, ALAI: false, CHAT: 2.04, AIFD: false, SPRX: 3.64, AOTG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, avgWeight: 3.06, proScore: 1.23, coverage: 0.4,
      price: 323.92, weeklyPrices: [300.53, 318.47, 305.58, 317.81, 323.92], weeklyChange: 7.78, dayChange: 1.92, sortRank: 0, periodReturns: { '1M': 11.9, 'YTD': 99.9, '6M': 98, '1Y': 168.3 },
      priceHistory: { '1D': [317.81, 331.91, 329.87, 326.26, 327.13, 328, 328.74, 328.35, 329.24, 327.85, 326.54, 325.53, 326.21, 326.2, 326.11, 326.33, 326.57, 326.97, 326.63, 328.33, 325.6, 325.01, 324.24, 323.92], '1W': [300.53, 318.47, 305.58, 317.81, 323.92], '1M': [289.52, 280.98, 297.88, 302.87, 311.93, 299.6, 317.58, 333.05, 357.96, 318.32, 316.43, 325.57, 303.95, 306.97, 334.82, 311.42, 300.53, 318.47, 305.58, 317.81, 323.92], 'YTD': [162.01, 160.78, 172.54, 182.49, 190.01, 202, 243.53, 253.15, 244.44, 270.06, 264.71, 276.16, 259.37, 287.64, 294.13, 321.75, 328.31, 339.97, 370.94, 327.46, 323.39, 300.57, 299.6, 316.43, 311.42, 323.92], '6M': [163.58, 176.93, 181.23, 190.01, 202, 243.53, 253.15, 257.75, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 322.63, 323.91, 334.49, 289.52, 299.6, 316.43, 311.42, 323.92], '1Y': [120.72, 131.12, 130.87, 145.6, 139.39, 132.52, 127.54, 129.31, 125.7, 135.71, 141.96, 139.77, 161.64, 168.88, 177.82, 183.2, 199.27, 190.71, 173.37, 170.65, 172.02, 182.54, 178.66, 154.39, 167.58, 173.95, 163.58, 176.93, 181.23, 190.01, 202, 243.53, 253.15, 244.44, 270.06, 268.41, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 322.63, 319.78, 334.49, 289.52, 299.6, 316.43, 311.42, 323.92] },
      velocityScore: { '1D': 2.5, '1W': 7, '1M': -6.8, '6M': null }, isNew: false,
      marketCap: '$124B', pe: 81.6, revenueGrowth: 30, eps: 3.97, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.93, ARTY: false, BAI: 2.01, IGPT: false, IVES: false, ALAI: false, CHAT: 2.29, AIFD: 4.02, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 4, avgWeight: 2.86, proScore: 1.15, coverage: 0.4,
      price: 112.54, weeklyPrices: [120.35, 122.20, 110.39, 110.24, 112.54], weeklyChange: -6.49, dayChange: 2.09, sortRank: 0, periodReturns: { '1M': 4.3, 'YTD': 205, '6M': 147.1, '1Y': 372.5 },
      priceHistory: { '1D': [110.24, 116.49, 115.68, 113.56, 112.56, 112.89, 113.36, 112.83, 112.67, 112.98, 112.77, 112.24, 112.76, 113.11, 112.66, 112.81, 112.52, 112.58, 112.71, 113.05, 112.4, 112.35, 112.35, 112.54], '1W': [120.35, 122.2, 110.39, 110.24, 112.54], '1M': [107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.2, 110.39, 110.24, 112.54], 'YTD': [36.9, 41.11, 48.32, 45.07, 48.81, 50.24, 46.18, 46.12, 43.1, 46.78, 45.03, 47.18, 48.03, 61.72, 68.5, 66.78, 99.62, 124.92, 108.77, 119.84, 109.33, 110.27, 117.05, 131.65, 127.02, 112.54], '6M': [45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 46.12, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 123.52, 107.93, 107.92, 117.05, 131.65, 127.02, 112.54], '1Y': [23.82, 22.8, 22.63, 19.8, 19.77, 23.86, 23.54, 24.85, 24.61, 24.61, 30.57, 33.99, 37.3, 37.8, 36.84, 38.16, 41.34, 38.38, 37.89, 35.11, 36.81, 40.5, 39.51, 36.28, 36.2, 39.37, 45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 46.12, 43.1, 46.78, 44.06, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 121.77, 107.93, 107.92, 117.05, 131.65, 127.02, 112.54] },
      velocityScore: { '1D': -0.9, '1W': -8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$566B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.25, ARTY: false, BAI: 2.92, IGPT: 4.26, IVES: false, ALAI: false, CHAT: 1.03, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 4, avgWeight: 2.82, proScore: 1.13, coverage: 0.4,
      price: 578.05, weeklyPrices: [539.00, 577.46, 532.10, 550.30, 578.05], weeklyChange: 7.24, dayChange: 5.04, sortRank: 0, periodReturns: { '1M': 11.7, 'YTD': 235.5, '6M': 188.4, '1Y': 788.5 },
      priceHistory: { '1D': [550.3, 593.15, 600, 591.83, 588.52, 587.4, 591.29, 589.57, 590.1, 588, 588.53, 587.24, 587.2, 588.74, 589.11, 588.5, 588.88, 588.03, 586.16, 586.89, 580.41, 580.5, 579.3, 578.05], '1W': [539, 577.46, 532.1, 550.3, 578.05], '1M': [517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 532.1, 550.3, 578.05], 'YTD': [172.27, 187.68, 222.1, 236.39, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 304.9, 296.14, 297.73, 337.88, 361.69, 403.12, 431.52, 480, 482.02, 484.28, 546.2, 526.93, 681.08, 643.83, 598.37, 578.05], '6M': [200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 524.65, 563.1, 517.72, 681.08, 643.83, 598.37, 578.05], '1Y': [65.06, 67.02, 69.02, 78.69, 74.44, 76.24, 75.64, 80.67, 90.49, 96.15, 105.15, 107.21, 131.26, 119.7, 125.92, 125.72, 141.38, 160.1, 166.11, 153.97, 157.74, 161, 187.2, 175.01, 181.54, 187.88, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 313.81, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 563.1, 517.72, 681.08, 643.83, 598.37, 578.05] },
      velocityScore: { '1D': 5.6, '1W': -7.4, '1M': -1.7, '6M': null }, isNew: false,
      marketCap: '$199B', pe: 34.6, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { AIS: 1.34, ARTY: 2.7, BAI: 3.13, IGPT: false, IVES: false, ALAI: 4.1, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'CRWV', name: 'COREWEAVE INC CLASS A', easyScore: 4, avgWeight: 2.56, proScore: 1.03, coverage: 0.4,
      price: 89.7, weeklyPrices: [81.75, 86.46, 83.53, 90.00, 89.70], weeklyChange: 9.73, dayChange: -0.33, sortRank: 0, periodReturns: { '1M': -8.9, 'YTD': 25.3, '6M': 11.9, '1Y': -35.1 },
      priceHistory: { '1D': [90, 93.47, 93.75, 91.34, 92.39, 92.4, 92.63, 92.98, 93.04, 92.68, 92.5, 91.94, 92, 91.94, 91.53, 91.82, 92.19, 91.39, 91.1, 90.72, 89.83, 89.62, 89.83, 89.7], '1W': [81.75, 86.46, 83.53, 90, 89.7], '1M': [98.45, 95.61, 95.74, 100.55, 106.71, 117.03, 115.21, 117.95, 111.29, 105.72, 100.88, 98.76, 96.58, 95.51, 99.54, 85.68, 81.75, 86.46, 83.53, 90, 89.7], 'YTD': [71.61, 77.09, 95.01, 92.98, 88.94, 96.79, 91, 99.3, 73.78, 74.92, 82.82, 87.58, 78.44, 92, 119.56, 117.42, 119.01, 114.15, 107.3, 105.49, 124.82, 102.37, 117.03, 100.88, 85.68, 89.7], '6M': [80.14, 101.23, 98.31, 88.94, 96.79, 91, 99.3, 78.05, 74.41, 85.86, 81.96, 69.15, 85.24, 117.2, 115.16, 105.53, 127.89, 107.75, 99.81, 105.89, 119.27, 98.45, 117.03, 100.88, 85.68, 89.7], '1Y': [138.29, 132.21, 120, 114.13, 121.08, 99.5, 91.52, 96.93, 87.48, 112.69, 121.39, 126.66, 138, 143.08, 141.74, 123.34, 139.93, 114.42, 85.43, 74.92, 74.29, 85.75, 87.38, 67.68, 76.42, 76.86, 80.14, 101.23, 98.31, 88.94, 96.79, 91, 99.3, 73.78, 74.92, 82.12, 81.96, 69.15, 85.24, 117.2, 115.16, 105.53, 127.89, 107.75, 99.81, 104.27, 119.27, 98.45, 117.03, 100.88, 85.68, 89.7] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$49B', pe: null, revenueGrowth: 112, eps: -2.72, grossMargin: 69, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 4.14, BAI: 1.22, IGPT: false, IVES: 1.95, ALAI: false, CHAT: 2.95, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'COREWEAVE INC CLASS A appears in 4 of 10 AI & ML ETFs (40% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 4, avgWeight: 2.51, proScore: 1.01, coverage: 0.4,
      price: 144.22, weeklyPrices: [140.27, 143.76, 141.60, 140.49, 144.22], weeklyChange: 2.82, dayChange: 2.65, sortRank: 0, periodReturns: { '1M': -29.9, 'YTD': -26, '6M': -27.4, '1Y': -38.6 },
      priceHistory: { '1D': [140.49, 146.85, 147.79, 144.78, 145.52, 145, 145.85, 146.52, 146.59, 146.38, 145.84, 145.45, 144.95, 145.75, 146.06, 145.88, 145.27, 143.7, 144.51, 144.73, 144.02, 144.25, 144.1, 144.22], '1W': [140.27, 143.76, 141.6, 140.49, 144.22], '1M': [205.81, 201.26, 184.1, 184.13, 192.64, 188.33, 183.53, 184.29, 175.07, 165.16, 157.53, 152.46, 148.53, 147.76, 146.55, 142.5, 140.27, 143.76, 141.6, 140.49, 144.22], 'YTD': [194.91, 189.65, 189.85, 177.16, 160.06, 156.59, 153.97, 146.14, 149.01, 149.4, 152.9, 146.02, 145.23, 137.86, 178.34, 176.28, 171.83, 195.95, 192.95, 192.08, 248.15, 211.82, 188.33, 157.53, 142.5, 144.22], '6M': [198.52, 191.09, 182.44, 160.06, 156.59, 153.97, 146.14, 149.25, 151.56, 155.97, 154.34, 138.8, 143.17, 163, 181.17, 165.96, 185.35, 186.83, 181.46, 193.06, 244.58, 205.81, 188.33, 157.53, 142.5, 144.22], '1Y': [235, 248.75, 242.83, 253.77, 249.39, 244.96, 235.06, 235.81, 223, 307.86, 296.62, 291.33, 288.78, 296.96, 313, 280.07, 275.3, 250.31, 226.99, 225.53, 204.96, 214.33, 198.85, 180.03, 197.99, 192.59, 198.52, 191.09, 182.44, 160.06, 156.59, 153.97, 146.14, 149.01, 149.4, 154.69, 154.34, 138.8, 143.17, 163, 181.17, 165.96, 185.35, 186.83, 181.46, 190.96, 244.58, 205.81, 188.33, 157.53, 142.5, 144.22] },
      velocityScore: { '1D': -1, '1W': null, '1M': -16.5, '6M': null }, isNew: false,
      marketCap: '$415B', pe: 24.7, revenueGrowth: 21, eps: 5.83, grossMargin: 66, dividendYield: 1.42,
      etfPresence: { AIS: false, ARTY: 3.13, BAI: false, IGPT: false, IVES: 2.9, ALAI: false, CHAT: 1.93, AIFD: false, SPRX: false, AOTG: 2.1 },
      tonyNote: 'Oracle lands in 3 AI ETFs on the strength of its cloud database and AI infrastructure contracts. Revenue grew 22%, 67% gross margin, P/E of 40x. The 17.5% weekly return following a major earnings beat shows how quickly sentiment can reprice; the weight score at 2.04% is still modest, meaning ETF managers have started building positions but conviction is not yet deep.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 4.92, proScore: 4.92, coverage: 1,
      price: 991.64, weeklyPrices: [975.56, 984.75, 938.38, 948.80, 991.64], weeklyChange: 1.65, dayChange: 4.52, sortRank: 0, periodReturns: { '1M': 6, 'YTD': 247.4, '6M': 187.4, '1Y': 705.5 },
      priceHistory: { '1D': [948.8, 1017.05, 1030.67, 1015.52, 1013.47, 1013.52, 1021.17, 1017.53, 1018.65, 1017.6, 1021.38, 1011.9, 1016.21, 1022.69, 1024.61, 1024.57, 1020.29, 1019.77, 1013.67, 1011.86, 1002.27, 1004.51, 997.44, 991.64], '1W': [975.56, 984.75, 938.38, 948.8, 991.64], '1M': [935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 948.8, 991.64], 'YTD': [285.41, 327.02, 336.63, 399.65, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 542.21, 746.81, 724.66, 751, 1035.5, 949.28, 1020.76, 1048.51, 1032.28, 991.64], '6M': [345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1032.28, 991.64], '1Y': [123.11, 113.26, 111.73, 109.14, 111.87, 125.29, 117.21, 117.75, 124.21, 150.57, 168.89, 156.83, 183.75, 192.33, 202.53, 206.71, 226.63, 237.5, 244.9, 225.92, 230.26, 226.65, 258.46, 248.55, 284.79, 312.15, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1064.1, 935.89, 1020.76, 1048.51, 1032.28, 991.64] },
      velocityScore: { '1D': 1.7, '1W': 7.9, '1M': -20.1, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 22.4, revenueGrowth: 346, eps: 44.21, grossMargin: 73, dividendYield: 0.06,
      etfPresence: { SOXX: 7.99, PSI: 5.67, XSD: 2.55, DRAM: 3.47 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.48, proScore: 4.11, coverage: 0.75,
      price: 546.72, weeklyPrices: [517.82, 552.05, 516.11, 517.41, 546.72], weeklyChange: 5.58, dayChange: 5.67, sortRank: 0, periodReturns: { '1M': 15, 'YTD': 155.3, '6M': 169.1, '1Y': 279.2 },
      priceHistory: { '1D': [517.4, 549.87, 557.37, 550.3, 557.93, 554.23, 555.76, 554.14, 552.63, 556.35, 554.66, 550.65, 552.32, 551.76, 549.47, 548.67, 545.88, 546.51, 545.43, 546.95, 544.47, 543.91, 547.39, 546.72], '1W': [517.82, 552.05, 516.11, 517.41, 546.72], '1M': [475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 517.41, 546.72], 'YTD': [214.16, 204.68, 227.92, 259.68, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 360.54, 455.19, 424.1, 467.51, 510.13, 490.33, 507.29, 519.74, 540.88, 546.72], '6M': [203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 503.89, 521.54, 475.51, 507.29, 519.74, 540.88, 546.72], '1Y': [144.16, 160.41, 162.12, 176.31, 172.4, 180.95, 165.2, 167.13, 161.79, 155.67, 157.92, 161.27, 169.73, 232.89, 234.56, 234.99, 264.33, 256.33, 258.89, 223.55, 214.24, 215.98, 221.43, 201.06, 214.99, 221.08, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 196.31, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 521.54, 475.51, 507.29, 519.74, 540.88, 546.72] },
      velocityScore: { '1D': -1.9, '1W': 4.8, '1M': -7.6, '6M': null }, isNew: false,
      marketCap: '$891B', pe: 182.2, revenueGrowth: 38, eps: 3, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 8.2, PSI: 5.5, XSD: 2.74, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 5.14, proScore: 3.86, coverage: 0.75,
      price: 202.78, weeklyPrices: [194.83, 195.55, 196.93, 204.12, 202.78], weeklyChange: 4.08, dayChange: -0.66, sortRank: 0, periodReturns: { '1M': -2.6, 'YTD': 8.7, '6M': 9.7, '1Y': 23.6 },
      priceHistory: { '1D': [204.12, 201.68, 201.01, 199.5, 200.37, 200.88, 201.36, 201.72, 201.39, 202.11, 202.07, 201.95, 201.99, 203.07, 202.83, 203.23, 203.11, 203.3, 203.84, 203.72, 203.39, 203.79, 203.95, 202.78], '1W': [194.83, 195.55, 196.93, 204.12, 202.78], '1M': [208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 196.93, 204.12, 202.78], 'YTD': [186.5, 185.04, 187.05, 187.67, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 198.45, 215.2, 225.32, 215.33, 224.36, 208.64, 207.41, 199, 197.58, 202.78], '6M': [184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 214.86, 222.82, 208.19, 207.41, 199, 197.58, 202.78], '1Y': [164.1, 173, 173.74, 177.87, 180.77, 182.02, 175.4, 181.6, 171.66, 177.17, 176.24, 177.69, 188.89, 192.57, 181.81, 182.16, 207.04, 195.21, 193.8, 186.52, 180.26, 183.38, 180.93, 174.14, 190.53, 188.12, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 181.93, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 222.82, 208.19, 207.41, 199, 197.58, 202.78] },
      velocityScore: { '1D': 1.6, '1W': 13.2, '1M': 21.8, '6M': null }, isNew: false,
      marketCap: '$4.9T', pe: 31.1, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.49,
      etfPresence: { SOXX: 7.91, PSI: 5.09, XSD: 2.43, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.31, proScore: 3.23, coverage: 0.75,
      price: 112.54, weeklyPrices: [120.35, 122.20, 110.39, 110.24, 112.54], weeklyChange: -6.49, dayChange: 2.09, sortRank: 0, periodReturns: { '1M': 4.3, 'YTD': 205, '6M': 147.1, '1Y': 372.5 },
      priceHistory: { '1D': [110.24, 116.49, 115.68, 113.56, 112.56, 112.89, 113.36, 112.83, 112.67, 112.98, 112.77, 112.24, 112.76, 113.11, 112.66, 112.81, 112.52, 112.58, 112.71, 113.05, 112.4, 112.35, 112.35, 112.54], '1W': [120.35, 122.2, 110.39, 110.24, 112.54], '1M': [107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.2, 110.39, 110.24, 112.54], 'YTD': [36.9, 41.11, 48.32, 45.07, 48.81, 50.24, 46.18, 46.12, 43.1, 46.78, 45.03, 47.18, 48.03, 61.72, 68.5, 66.78, 99.62, 124.92, 108.77, 119.84, 109.33, 110.27, 117.05, 131.65, 127.02, 112.54], '6M': [45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 46.12, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 123.52, 107.93, 107.92, 117.05, 131.65, 127.02, 112.54], '1Y': [23.82, 22.8, 22.63, 19.8, 19.77, 23.86, 23.54, 24.85, 24.61, 24.61, 30.57, 33.99, 37.3, 37.8, 36.84, 38.16, 41.34, 38.38, 37.89, 35.11, 36.81, 40.5, 39.51, 36.28, 36.2, 39.37, 45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 46.12, 43.1, 46.78, 44.06, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 121.77, 107.93, 107.92, 117.05, 131.65, 127.02, 112.54] },
      velocityScore: { '1D': -2.4, '1W': -4.7, '1M': -9, '6M': null }, isNew: false,
      marketCap: '$566B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 5.69, PSI: 4.78, XSD: 2.47, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.69, proScore: 2.77, coverage: 0.75,
      price: 393.64, weeklyPrices: [377.16, 388.83, 379.03, 385.40, 393.64], weeklyChange: 4.37, dayChange: 2.14, sortRank: 0, periodReturns: { '1M': -2.7, 'YTD': 45.1, '6M': 30.8, '1Y': 60.6 },
      priceHistory: { '1D': [385.4, 396.02, 394.87, 390.18, 393.61, 393.39, 397.87, 396.14, 395.75, 397.27, 396.88, 395.02, 395.43, 396.2, 396.96, 396.74, 394.77, 395.9, 395.04, 395.46, 394.4, 394.07, 394.27, 393.64], '1W': [377.16, 388.83, 379.03, 385.4, 393.64], '1M': [404.62, 392.67, 412.13, 417.79, 427.58, 416, 414.45, 434.46, 445.48, 407.26, 413.16, 417.93, 386.91, 391.78, 397.17, 388.98, 377.16, 388.83, 379.03, 385.4, 393.64], 'YTD': [271.2, 299.16, 302.1, 305.6, 316.86, 322.97, 337.51, 356.09, 338.99, 318.81, 308.59, 322.03, 320.58, 351.36, 353.8, 403.88, 397.69, 416.52, 417.49, 397.07, 402.69, 403.89, 416, 413.16, 388.98, 393.64], '6M': [300.93, 300.25, 304.01, 316.86, 322.97, 337.51, 356.09, 352.41, 319.71, 310.92, 312.19, 303.1, 327.41, 348.6, 375.27, 383.26, 404.77, 419.65, 414.31, 419.94, 423.2, 404.62, 416, 413.16, 388.98, 393.64], '1Y': [245.13, 240.97, 226.37, 224.63, 223.12, 236.21, 244.87, 255.5, 246.11, 248.24, 249.05, 247.53, 241.67, 237.88, 241.61, 243.29, 235.04, 236, 241.44, 232.2, 257.92, 277.26, 283.39, 274.92, 276.84, 277.29, 300.93, 300.25, 304.01, 316.86, 322.97, 337.51, 356.09, 338.99, 318.81, 313.66, 312.19, 303.1, 327.41, 348.6, 375.27, 383.26, 404.77, 419.65, 414.31, 416.88, 423.2, 404.62, 416, 413.16, 388.98, 393.64] },
      velocityScore: { '1D': -0.4, '1W': 9.9, '1M': 12.6, '6M': null }, isNew: false,
      marketCap: '$192B', pe: 58.7, revenueGrowth: 37, eps: 6.71, grossMargin: 64, dividendYield: 1.14,
      etfPresence: { SOXX: 3.81, PSI: 4.91, XSD: 2.34, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 5.96, proScore: 2.98, coverage: 0.5,
      price: 588.66, weeklyPrices: [603.04, 592.79, 554.50, 570.50, 588.66], weeklyChange: -2.38, dayChange: 3.18, sortRank: 0, periodReturns: { '1M': 17.9, 'YTD': 129.1, '6M': 95.5, '1Y': 197.3 },
      priceHistory: { '1D': [570.5, 625.61, 626.89, 615, 616.42, 610.25, 610.95, 605.51, 610.45, 607.14, 609.27, 606.71, 609.91, 606.76, 606.74, 600.22, 598.7, 596.65, 593.76, 592.82, 588.23, 590.66, 589.39, 588.66], '1W': [603.04, 592.79, 554.5, 570.5, 588.66], '1M': [499.21, 497.01, 552.64, 567.25, 585.78, 568.23, 592.92, 617.11, 640.18, 585.88, 588.97, 668, 626.84, 694.64, 723, 650.91, 603.04, 592.79, 554.5, 570.5, 588.66], 'YTD': [256.99, 281.64, 319.08, 322.38, 328.4, 330.57, 359.13, 377.93, 351.32, 345.88, 349.47, 369.34, 353.8, 397.81, 389.9, 403.91, 389.08, 435.44, 436.62, 432.16, 458.17, 492.17, 568.23, 588.97, 650.91, 588.66], '6M': [301.18, 327.01, 319.46, 328.4, 330.57, 359.13, 377.93, 372.18, 338.94, 346.18, 361.79, 323.12, 354.31, 395.64, 394.33, 381.11, 410.82, 431.2, 406.91, 454.89, 490.05, 499.21, 568.23, 588.97, 650.91, 588.66], '1Y': [198.03, 192.52, 188.12, 180.06, 183.15, 188.24, 160.96, 164.39, 158.24, 170.15, 189.76, 199.6, 223.59, 220.3, 227.72, 228.47, 235.75, 240.89, 230.73, 235.13, 249.97, 269.44, 270.11, 253.5, 261.9, 284.32, 301.18, 327.01, 319.46, 328.4, 330.57, 359.13, 377.93, 351.32, 345.88, 352.46, 361.79, 323.12, 354.31, 395.64, 394.33, 381.11, 410.82, 431.2, 406.91, 448.25, 490.05, 499.21, 568.23, 588.97, 650.91, 588.66] },
      velocityScore: { '1D': 0.7, '1W': -2.6, '1M': 12.5, '6M': null }, isNew: false,
      marketCap: '$467B', pe: 55.5, revenueGrowth: 11, eps: 10.61, grossMargin: 49, dividendYield: 0.37,
      etfPresence: { SOXX: 5.19, PSI: 6.72, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 5.3, proScore: 2.65, coverage: 0.5,
      price: 229.52, weeklyPrices: [235.55, 233.31, 216.47, 221.18, 229.52], weeklyChange: -2.56, dayChange: 3.77, sortRank: 0, periodReturns: { '1M': 7.3, 'YTD': 88.9, '6M': 63.9, '1Y': 147.2 },
      priceHistory: { '1D': [221.18, 244.39, 244.59, 239.1, 237.97, 235.37, 238.18, 236.68, 235.91, 236.73, 235.74, 234.03, 235.6, 235.45, 235.23, 233.14, 232.33, 231.8, 230.74, 231.63, 230.21, 230.29, 229.99, 229.52], '1W': [235.55, 233.31, 216.47, 221.18, 229.52], '1M': [213.94, 213.56, 241.16, 254.54, 256.42, 237.33, 238.73, 259.56, 269.16, 244.49, 240.48, 258.8, 248.64, 278.39, 301.71, 266.19, 235.55, 233.31, 216.47, 221.18, 229.52], 'YTD': [121.51, 132.46, 154.5, 151.28, 141.04, 144.02, 147.02, 150.66, 144.13, 145.29, 148.24, 154.38, 151.98, 172.73, 173.49, 181.54, 172.63, 186.92, 180.43, 188.84, 194, 210.81, 237.33, 240.48, 266.19, 229.52], '6M': [140, 156.78, 154.3, 141.04, 144.02, 147.02, 150.66, 153.49, 142.91, 143.82, 151.14, 138.26, 154.88, 179.59, 178.54, 180.9, 173.29, 181.13, 174.06, 201.14, 204.52, 213.94, 237.33, 240.48, 266.19, 229.52], '1Y': [92.86, 93.71, 90.42, 87.9, 91.21, 95.54, 87.84, 88.89, 87.33, 95.93, 104.67, 105.91, 113.93, 105.35, 109.88, 115.9, 123.53, 122.71, 119.9, 116.75, 115.91, 120.81, 124.62, 122.24, 127.96, 135.24, 140, 156.78, 154.3, 141.04, 144.02, 147.02, 150.66, 144.13, 145.29, 148.13, 151.14, 138.26, 154.88, 179.59, 178.54, 180.9, 173.29, 181.13, 174.06, 195.72, 204.52, 213.94, 237.33, 240.48, 266.19, 229.52] },
      velocityScore: { '1D': 0, '1W': -7.7, '1M': 17.8, '6M': null }, isNew: false,
      marketCap: '$300B', pe: 64.8, revenueGrowth: 12, eps: 3.54, grossMargin: 61, dividendYield: 0.42,
      etfPresence: { SOXX: 4.71, PSI: 5.89, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 4.91, proScore: 2.45, coverage: 0.5,
      price: 353.17, weeklyPrices: [351.41, 350.20, 326.13, 333.15, 353.17], weeklyChange: 0.5, dayChange: 6.01, sortRank: 0, periodReturns: { '1M': 8, 'YTD': 106.3, '6M': 61.7, '1Y': 249.5 },
      priceHistory: { '1D': [333.15, 366.8, 364.93, 357.95, 355.76, 353.18, 356.9, 353.93, 355.32, 354.27, 355.49, 355.95, 357.42, 357.74, 358.03, 356.48, 356.05, 355.57, 353.31, 353.76, 351.51, 351.58, 352.14, 353.17], '1W': [351.41, 350.2, 326.13, 333.15, 353.17], '1M': [327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82, 379.09, 410.91, 433.33, 391.26, 351.41, 350.2, 326.13, 333.15, 353.17], 'YTD': [171.18, 200.96, 217.47, 217.94, 237.5, 229.28, 235.58, 244.25, 217.27, 215.23, 224.71, 233.45, 222.01, 258.76, 260.96, 258.56, 256.72, 294.05, 284.72, 305.35, 317.12, 324.45, 369.34, 374.8, 391.26, 353.17], '6M': [218.36, 222.96, 222.87, 237.5, 229.28, 235.58, 244.25, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 273.38, 322.68, 334.41, 327.16, 369.34, 374.8, 391.26, 353.17], '1Y': [101.06, 100.79, 97.78, 94.84, 99.15, 107.38, 99.15, 103.67, 100.42, 115.58, 126.32, 128.13, 146.99, 141, 142.37, 147.54, 160.67, 165.05, 161.42, 148.8, 155.14, 157.09, 168.71, 164.7, 178.07, 194.76, 218.36, 222.96, 222.87, 237.5, 229.28, 235.58, 244.25, 217.27, 215.23, 226.47, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 273.38, 318.93, 334.41, 327.16, 369.34, 374.8, 391.26, 353.17] },
      velocityScore: { '1D': 0, '1W': -5.8, '1M': 11.9, '6M': null }, isNew: false,
      marketCap: '$442B', pe: 66.6, revenueGrowth: 24, eps: 5.3, grossMargin: 50, dividendYield: 0.31,
      etfPresence: { SOXX: 4.28, PSI: 5.53, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 4.81, proScore: 2.4, coverage: 0.5,
      price: 401.11, weeklyPrices: [360.45, 373.90, 370.78, 388.69, 401.11], weeklyChange: 11.28, dayChange: 3.2, sortRank: 0, periodReturns: { '1M': 2.3, 'YTD': 15.9, '6M': 16.3, '1Y': 45.6 },
      priceHistory: { '1D': [388.69, 397.52, 394.61, 389.68, 393.99, 394.08, 397.7, 399.64, 401.47, 400.91, 401.24, 401.04, 403.3, 403.8, 405.18, 406.17, 405.53, 404.61, 405.45, 405.77, 402.93, 402.03, 401.07, 401.11], '1W': [360.45, 373.9, 370.78, 388.69, 401.11], '1M': [392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 370.78, 388.69, 401.11], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 421.28, 430, 425.19, 414.14, 459.97, 396.6, 376.71, 382.07, 369.34, 401.11], '6M': [344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 422.01, 481.57, 392.16, 376.71, 382.07, 369.34, 401.11], '1Y': [275.4, 286.45, 288.71, 293.7, 303.76, 311.23, 291.17, 300.25, 306.1, 359.63, 345.35, 336.1, 338.18, 345.02, 354.15, 344.29, 385.98, 358.98, 355.22, 354.42, 397.57, 381.03, 406.37, 329.88, 352.13, 343.42, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 321.31, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 481.57, 392.16, 376.71, 382.07, 369.34, 401.11] },
      velocityScore: { '1D': 2.6, '1W': 12.7, '1M': 21.8, '6M': null }, isNew: false,
      marketCap: '$1.9T', pe: 66.6, revenueGrowth: 48, eps: 6.02, grossMargin: 76, dividendYield: 0.67,
      etfPresence: { SOXX: 7.12, PSI: false, XSD: 2.49, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 3.41, proScore: 1.7, coverage: 0.5,
      price: 243.27, weeklyPrices: [245.29, 249.27, 230.70, 231.71, 243.27], weeklyChange: -0.82, dayChange: 4.99, sortRank: 0, periodReturns: { '1M': -8.8, 'YTD': 186.3, '6M': 192.3, '1Y': 231.6 },
      priceHistory: { '1D': [231.71, 249.33, 248.85, 244.28, 245.62, 246.34, 247.98, 246.59, 247, 247.96, 248.09, 246.13, 246.9, 247.38, 248.32, 247.82, 246.88, 247.37, 246.49, 246.82, 244.65, 244.41, 244.13, 243.27], '1W': [245.29, 249.27, 230.7, 231.71, 243.27], '1M': [266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 245.29, 249.27, 230.7, 231.71, 243.27], 'YTD': [84.98, 83.45, 80.38, 80.23, 78.66, 82.35, 79.01, 78.39, 77.51, 93.3, 87.62, 98.45, 106.71, 119.93, 133.37, 165.56, 164.95, 170.13, 176.89, 196.33, 219.43, 288.85, 278.67, 276.7, 272.05, 243.27], '6M': [83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 208.26, 290.79, 266.88, 278.67, 276.7, 272.05, 243.27], '1Y': [73.36, 72.01, 74.04, 80.37, 75.85, 79.04, 71.22, 74.79, 64.1, 66.59, 74.23, 83.81, 86.2, 90.68, 88.23, 82.77, 90.15, 92.9, 89.33, 81.32, 87.72, 98.19, 89.43, 84.47, 86.34, 90.23, 83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 77.51, 93.3, 90.79, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 198.7, 290.79, 266.88, 278.67, 276.7, 272.05, 243.27] },
      velocityScore: { '1D': -2.3, '1W': -9.1, '1M': -49.9, '6M': null }, isNew: false,
      marketCap: '$213B', pe: 83.3, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.1,
      etfPresence: { SOXX: 4.62, PSI: false, XSD: 2.2, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 3.29, proScore: 1.64, coverage: 0.5,
      price: 308.53, weeklyPrices: [293.08, 303.50, 293.30, 301.32, 308.53], weeklyChange: 5.27, dayChange: 2.39, sortRank: 0, periodReturns: { '1M': 6.9, 'YTD': 77.8, '6M': 62.1, '1Y': 40.5 },
      priceHistory: { '1D': [301.32, 310.81, 310.36, 306.45, 310.17, 310.51, 313.12, 312.39, 312.05, 314.11, 312.87, 311.3, 312.04, 313.23, 313.48, 313.34, 311.73, 311.78, 311.08, 311.4, 309.33, 308.83, 309.02, 308.53], '1W': [293.08, 303.5, 293.3, 301.32, 308.53], '1M': [288.63, 282.01, 297.1, 301.12, 313.34, 305.71, 301.88, 322.86, 332.28, 304.36, 303.11, 311.81, 285.43, 285.48, 298.07, 298.41, 293.08, 303.5, 293.3, 301.32, 308.53], 'YTD': [173.49, 188.45, 189.12, 193.31, 225.01, 218.77, 225.69, 213.35, 202.67, 197.46, 190.78, 196.77, 196.3, 214.98, 223.1, 282.23, 281.02, 287.8, 302.73, 309.21, 293.2, 290.9, 305.71, 303.11, 298.41, 308.53], '6M': [190.31, 191.58, 196.59, 225.01, 218.77, 225.69, 213.35, 209.82, 196.2, 194.13, 188.63, 186.42, 199.74, 218.87, 233.15, 265, 281, 295.17, 302.31, 324.89, 308.12, 288.63, 305.71, 303.11, 298.41, 308.53], '1Y': [219.66, 216.59, 185.69, 181.06, 185.91, 193.71, 200.77, 205.47, 187.29, 184.35, 181.62, 182.04, 182.32, 178.96, 175.48, 172.19, 160.26, 163.57, 163.09, 157.09, 165.35, 180.12, 181.67, 176.19, 176.88, 177.17, 190.31, 191.58, 196.59, 225.01, 218.77, 225.69, 213.35, 202.67, 197.46, 194.45, 188.63, 186.42, 199.74, 218.87, 233.15, 265, 281, 295.17, 302.31, 317.45, 308.12, 288.63, 305.71, 303.11, 298.41, 308.53] },
      velocityScore: { '1D': 0, '1W': 7.9, '1M': 17.1, '6M': null }, isNew: false,
      marketCap: '$281B', pe: 52.7, revenueGrowth: 19, eps: 5.85, grossMargin: 57, dividendYield: 1.89,
      etfPresence: { SOXX: 4.03, PSI: false, XSD: 2.55, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.99, proScore: 1.5, coverage: 0.5,
      price: 290.54, weeklyPrices: [273.36, 280.51, 273.15, 283.81, 290.54], weeklyChange: 6.28, dayChange: 2.34, sortRank: 0, periodReturns: { '1M': -2.3, 'YTD': 33.9, '6M': 20.5, '1Y': 24.6 },
      priceHistory: { '1D': [283.89, 293.82, 293.98, 290.24, 293.52, 293.2, 296.88, 295.79, 295.57, 297.8, 296.9, 294.18, 294.88, 295.67, 295.8, 296.1, 295.04, 295.57, 294.9, 294.61, 292.73, 292.46, 292.01, 290.54], '1W': [273.36, 280.51, 273.15, 283.81, 290.54], '1M': [297.41, 285.56, 302.55, 304.86, 315.88, 302.89, 298.2, 313.27, 323.24, 299.94, 294.06, 298.64, 277.02, 278.37, 281.03, 279.18, 273.36, 280.51, 273.15, 283.81, 290.54], 'YTD': [217.06, 237.89, 238.6, 232.48, 231.08, 228.91, 245.09, 234.63, 215.25, 203.03, 192.69, 197.61, 195.58, 205.67, 213.73, 241.16, 295.24, 294.75, 291.5, 316.47, 311.38, 301.14, 302.89, 294.06, 279.18, 290.54], '6M': [241.15, 237.11, 231.05, 231.08, 228.91, 245.09, 234.63, 224.76, 205.25, 191.89, 193.39, 187.39, 195.12, 209.89, 224.5, 230.39, 292.35, 294.23, 294.28, 332.67, 323.62, 297.41, 302.89, 294.06, 279.18, 290.54], '1Y': [233.19, 224.5, 224.43, 213.77, 205.91, 231.54, 228.77, 237.67, 225.39, 223.21, 226.51, 226.81, 227.71, 221.42, 217.41, 220.73, 204.71, 210.44, 204.08, 190.06, 193.76, 226.16, 231.83, 222.08, 222.87, 223.88, 241.15, 237.11, 231.05, 231.08, 228.91, 245.09, 234.63, 215.25, 203.03, 194.02, 193.39, 187.39, 195.12, 209.89, 224.5, 230.39, 292.35, 294.23, 294.28, 329.24, 323.62, 297.41, 302.89, 294.06, 279.18, 290.54] },
      velocityScore: { '1D': 2, '1W': 9.5, '1M': 7.9, '6M': null }, isNew: false,
      marketCap: '$73B', pe: 27.7, revenueGrowth: 12, eps: 10.47, grossMargin: 56, dividendYield: 1.43,
      etfPresence: { SOXX: 3.61, PSI: false, XSD: 2.37, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 2.82, proScore: 1.41, coverage: 0.5,
      price: 417.45, weeklyPrices: [406.42, 432.74, 382.89, 393.16, 417.45], weeklyChange: 2.71, dayChange: 6.18, sortRank: 0, periodReturns: { '1M': 22.2, 'YTD': 150.9, '6M': 156.7, '1Y': 330.3 },
      priceHistory: { '1D': [393.16, 428, 429.64, 418, 421.57, 422.02, 429.92, 426.32, 425, 428.79, 426.2, 426.22, 428.24, 427.87, 429.41, 428.87, 425.91, 425.04, 419.46, 418.24, 415.91, 416.13, 417.09, 417.45], '1W': [406.42, 432.74, 382.89, 393.16, 417.45], '1M': [341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42, 432.74, 382.89, 393.16, 417.45], 'YTD': [166.36, 156.73, 174.45, 169.66, 152.44, 187.67, 123.69, 128.4, 109.8, 116.48, 126.34, 120.33, 106.33, 129.46, 170.81, 197.54, 202.68, 199.79, 232.68, 306.88, 320.09, 346.33, 361.71, 399.92, 430.86, 417.45], '6M': [162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.4, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 318.72, 355.76, 341.7, 361.71, 399.92, 430.86, 417.45], '1Y': [97.02, 97.95, 121.68, 136.73, 170.89, 190.69, 172.45, 179.2, 187.95, 232.9, 251.88, 200.64, 209.6, 225.43, 163.55, 163.64, 173.62, 181.94, 157.79, 142.01, 154.22, 152.51, 173.7, 145.88, 167.26, 167.11, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.4, 109.8, 116.48, 127.57, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 325.33, 355.76, 341.7, 361.71, 399.92, 430.86, 417.45] },
      velocityScore: { '1D': 0, '1W': -2.1, '1M': -15.1, '6M': null }, isNew: false,
      marketCap: '$72B', pe: 280.2, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.8, PSI: false, XSD: 2.85, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.69, proScore: 1.34, coverage: 0.5,
      price: 191.11, weeklyPrices: [176.25, 186.48, 182.97, 186.56, 191.11], weeklyChange: 8.43, dayChange: 2.44, sortRank: 0, periodReturns: { '1M': -7, 'YTD': 11.7, '6M': 7.5, '1Y': 20.1 },
      priceHistory: { '1D': [186.56, 191.27, 190.76, 189.21, 191.57, 192.7, 195.3, 195.03, 194.55, 194.84, 193.22, 192.43, 192.17, 192.38, 192.44, 192.17, 191.23, 191.66, 191.75, 191.85, 190.99, 190.51, 190.63, 191.11], '1W': [176.25, 186.48, 182.97, 186.56, 191.11], '1M': [205.42, 191.2, 202.96, 211.72, 220.81, 214.07, 212.97, 226.11, 221.9, 204.13, 197.41, 204.9, 189.39, 188.72, 184.79, 181.92, 176.25, 186.48, 182.97, 186.56, 191.11], 'YTD': [171.05, 181.87, 161.39, 155.82, 152.62, 138.93, 142.63, 144.78, 138.13, 135.2, 130.47, 130.35, 127.28, 127.75, 134.47, 133.95, 177.01, 219.09, 201.49, 238.16, 228.99, 217.77, 214.07, 197.41, 181.92, 191.11], '6M': [177.78, 159.42, 154.52, 152.62, 138.93, 142.63, 144.78, 141.03, 138.11, 129.39, 128.35, 127.07, 124.07, 132.84, 135.56, 150, 186.55, 210.31, 195.61, 248.82, 240.84, 205.42, 214.07, 197.41, 181.92, 191.11], '1Y': [159.09, 152.61, 158.84, 146.76, 145.9, 158.09, 155.44, 159.77, 159.71, 161.51, 168.13, 169.68, 168.85, 165.66, 164.08, 170.03, 178.67, 179.72, 176.67, 166.11, 165.14, 174.35, 181.27, 174.19, 174.81, 176.31, 177.78, 159.42, 154.52, 152.62, 138.93, 142.63, 144.78, 138.13, 135.2, 131.59, 128.35, 127.07, 124.07, 132.84, 135.56, 150, 186.55, 210.31, 195.61, 233.4, 240.84, 205.42, 214.07, 197.41, 181.92, 191.11] },
      velocityScore: { '1D': -0.7, '1W': 9.8, '1M': -14.1, '6M': null }, isNew: false,
      marketCap: '$201B', pe: 20.6, revenueGrowth: -4, eps: 9.29, grossMargin: 55, dividendYield: 1.97,
      etfPresence: { SOXX: 3.04, PSI: false, XSD: 2.34, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.65, proScore: 1.33, coverage: 0.5,
      price: 1374.13, weeklyPrices: [1288.16, 1346.13, 1272.81, 1315.51, 1374.13], weeklyChange: 6.67, dayChange: 4.46, sortRank: 0, periodReturns: { '1M': -10.3, 'YTD': 51.6, '6M': 43.3, '1Y': 85.6 },
      priceHistory: { '1D': [1315.51, 1395.4, 1389.78, 1375.19, 1379.97, 1383, 1398.81, 1395.39, 1397.1, 1398.4, 1396.63, 1390.99, 1394.36, 1397.76, 1398.68, 1398.31, 1394.1, 1394.38, 1389.89, 1387.85, 1381.18, 1378.68, 1379.16, 1374.13], '1W': [1288.16, 1346.13, 1272.81, 1315.51, 1374.13], '1M': [1531.98, 1473.04, 1589.55, 1577.32, 1652.29, 1498.77, 1448.21, 1563.7, 1537.88, 1423.76, 1434.95, 1438.3, 1313.32, 1312.77, 1382.36, 1331.73, 1288.16, 1346.13, 1272.81, 1315.51, 1374.13], 'YTD': [906.36, 959.09, 1009.54, 1063.74, 1173.22, 1206.18, 1173.18, 1213.67, 1074.37, 1055.82, 1075.29, 1118.66, 1119.51, 1334.21, 1402.81, 1592.17, 1583.48, 1600.84, 1550.02, 1589.81, 1542.39, 1559.18, 1498.77, 1434.95, 1331.73, 1374.13], '6M': [958.97, 1033.17, 1068.14, 1173.22, 1206.18, 1173.18, 1213.67, 1142.58, 1062, 1077.4, 1076.35, 1002.34, 1191.22, 1363.42, 1527.95, 1504.08, 1588.12, 1599.52, 1468.11, 1662.98, 1624.99, 1531.98, 1498.77, 1434.95, 1331.73, 1374.13], '1Y': [740.45, 713.57, 713, 711.24, 797.94, 848.81, 826.27, 866.32, 848.11, 840.38, 917.78, 891.39, 930.51, 979.25, 1026.83, 1070.8, 1094.08, 1000.15, 958.35, 884.65, 924.95, 952.74, 981.48, 929.48, 946.32, 955.03, 958.97, 1033.17, 1068.14, 1173.22, 1206.18, 1173.18, 1213.67, 1074.37, 1055.82, 1066.66, 1076.35, 1002.34, 1191.22, 1363.42, 1527.95, 1504.08, 1588.12, 1599.52, 1468.11, 1620.17, 1624.99, 1531.98, 1498.77, 1434.95, 1331.73, 1374.13] },
      velocityScore: { '1D': 1.5, '1W': 6.4, '1M': -4.3, '6M': null }, isNew: false,
      marketCap: '$68B', pe: 98.6, revenueGrowth: 26, eps: 13.94, grossMargin: 55, dividendYield: 0.61,
      etfPresence: { SOXX: 3.17, PSI: false, XSD: 2.13, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.39, proScore: 1.2, coverage: 0.5,
      price: 265.65, weeklyPrices: [241.91, 265.55, 246.40, 258.69, 265.65], weeklyChange: 9.81, dayChange: 2.69, sortRank: 0, periodReturns: { '1M': 13.4, 'YTD': 84.6, '6M': 76.6, '1Y': 173 },
      priceHistory: { '1D': [258.69, 272.41, 268.37, 264.24, 270.56, 270.62, 277.26, 276.3, 275.8, 275.96, 274.79, 272.48, 274.01, 275.29, 276.29, 275.27, 272.02, 271.35, 267.89, 269.2, 266.28, 266.17, 267.68, 265.65], '1W': [241.91, 265.55, 246.4, 258.69, 265.65], '1M': [234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 265.55, 246.4, 258.69, 265.65], 'YTD': [143.89, 141.59, 149.12, 133.16, 119.96, 123.41, 124.8, 120.83, 97.3, 112.33, 101.72, 103.91, 95.92, 107.93, 158.93, 185.54, 184.38, 188.51, 172.17, 218.41, 226.1, 222.27, 239.18, 268.99, 259.09, 265.65], '6M': [150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.64, 229, 234.32, 239.18, 268.99, 259.09, 265.65], '1Y': [97.29, 98.45, 101.17, 111.55, 119.78, 117.33, 105.99, 122.73, 134, 159.32, 172.31, 144.94, 149.63, 151.15, 136.53, 150.97, 171.52, 173.16, 160.34, 141.88, 164.01, 180.92, 154.47, 138.57, 144.83, 140.24, 150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 97.3, 112.33, 104.06, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.23, 229, 234.32, 239.18, 268.99, 259.09, 265.65] },
      velocityScore: { '1D': 2.6, '1W': 8.1, '1M': 0.8, '6M': null }, isNew: false,
      marketCap: '$50B', pe: 105.8, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 2.18, PSI: false, XSD: 2.61, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.32, proScore: 1.16, coverage: 0.5,
      price: 88.26, weeklyPrices: [84.64, 87.59, 84.15, 85.49, 88.26], weeklyChange: 4.28, dayChange: 3.24, sortRank: 0, periodReturns: { '1M': -3.5, 'YTD': 38.5, '6M': 17.3, '1Y': 17.6 },
      priceHistory: { '1D': [85.49, 89.34, 89.73, 88.19, 89.09, 89.2, 90.42, 90.1, 90.36, 90.69, 90.47, 89.84, 90.22, 90.3, 90.46, 90.55, 90.04, 90.16, 89.85, 89.99, 89.25, 89.03, 88.58, 88.26], '1W': [84.64, 87.59, 84.15, 85.49, 88.26], '1M': [91.47, 87.91, 92.94, 95.24, 100.32, 95.63, 94.11, 99.77, 102.71, 93.26, 92.48, 94.12, 87.93, 89.06, 91.2, 88.69, 84.64, 87.59, 84.15, 85.49, 88.26], 'YTD': [63.72, 73.53, 74.45, 74.71, 78.08, 74.41, 78.94, 75.93, 71.39, 65.33, 64.71, 65.16, 65.38, 71.22, 76.87, 90.64, 93.95, 99.09, 93.85, 93.43, 91.52, 91.37, 95.63, 92.48, 88.69, 88.26], '6M': [75.22, 74.7, 74.79, 78.08, 74.41, 78.94, 75.93, 74.31, 65, 63.83, 64.34, 60.06, 67.51, 74.5, 80.93, 84.26, 98.48, 97.7, 91.81, 98.05, 96.96, 91.47, 95.63, 92.48, 88.69, 88.26], '1Y': [75.08, 74.3, 67.81, 67.59, 66.22, 65.99, 66.76, 66.65, 64.43, 65.02, 66.26, 64.84, 66.13, 65.86, 65.35, 65.09, 62.54, 60.8, 55.63, 50.8, 52.57, 64.72, 69.09, 64.06, 64.94, 67.06, 75.22, 74.7, 74.79, 78.08, 74.41, 78.94, 75.93, 71.39, 65.33, 64.59, 64.34, 60.06, 67.51, 74.5, 80.93, 84.26, 98.48, 97.7, 91.81, 96.85, 96.96, 91.47, 95.63, 92.48, 88.69, 88.26] },
      velocityScore: { '1D': -0.9, '1W': 3.6, '1M': 0.9, '6M': null }, isNew: false,
      marketCap: '$48B', pe: 401.2, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 2.13,
      etfPresence: { SOXX: 2.31, PSI: false, XSD: 2.33, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 1.95, proScore: 0.97, coverage: 0.5,
      price: 97.87, weeklyPrices: [91.22, 94.69, 91.10, 93.79, 97.87], weeklyChange: 7.29, dayChange: 4.35, sortRank: 0, periodReturns: { '1M': -16.4, 'YTD': 80.7, '6M': 57.4, '1Y': 64.4 },
      priceHistory: { '1D': [93.79, 100.28, 101.33, 99.91, 101.18, 101.72, 102.49, 102.35, 102.29, 102.36, 101.48, 100.67, 100.57, 100.86, 100.78, 100.88, 100.29, 100.69, 100.21, 100.24, 99.33, 98.95, 98.75, 97.87], '1W': [91.22, 94.69, 91.1, 93.79, 97.87], '1M': [117, 110.17, 115.96, 116.79, 125.9, 118.25, 112.92, 121.62, 131.55, 117.06, 115.74, 118.74, 90.65, 88.57, 94.54, 94.63, 91.22, 94.69, 91.1, 93.79, 97.87], 'YTD': [54.15, 60.89, 60.28, 61.98, 61.53, 65.1, 71.96, 70.03, 63.42, 59.59, 60.46, 63.1, 62.2, 68.49, 79.93, 97.78, 103.03, 103.2, 113.11, 116.2, 120.92, 120.9, 118.25, 115.74, 94.63, 97.87], '6M': [62.16, 60.33, 61.13, 61.53, 65.1, 71.96, 70.03, 66.48, 59.23, 59.88, 59.89, 55.66, 63.79, 72.05, 86.91, 93.3, 102.67, 104.11, 106.02, 127, 128.64, 117, 118.25, 115.74, 94.63, 97.87], '1Y': [59.52, 59.41, 55.44, 56.36, 47.59, 51.62, 49.47, 51.25, 48.06, 49.02, 51.83, 49.77, 48.74, 49.97, 52.97, 51.78, 51.4, 50.08, 49.27, 46.12, 49.64, 54.79, 55.97, 54.34, 54.93, 58.69, 62.16, 60.33, 61.13, 61.53, 65.1, 71.96, 70.03, 63.42, 59.59, 60.98, 59.89, 55.66, 63.79, 72.05, 86.91, 93.3, 102.67, 104.11, 106.02, 124.89, 128.64, 117, 118.25, 115.74, 94.63, 97.87] },
      velocityScore: { '1D': 0, '1W': 6.6, '1M': -29.7, '6M': null }, isNew: false,
      marketCap: '$38B', pe: 72, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 1.86, PSI: false, XSD: 2.03, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.56, proScore: 0.78, coverage: 0.5,
      price: 317.35, weeklyPrices: [322.26, 327.64, 304.82, 305.23, 317.35], weeklyChange: -1.52, dayChange: 3.97, sortRank: 0, periodReturns: { '1M': -11.5, 'YTD': 85.3, '6M': 81.5, '1Y': 131.3 },
      priceHistory: { '1D': [305.23, 322.4, 326.11, 321.43, 322.88, 324.07, 327.67, 325.41, 327.2, 327.02, 325.66, 325.19, 326.13, 326.3, 326.39, 327.34, 325.59, 325.78, 322.55, 322.92, 321.21, 319.91, 319.31, 317.35], '1W': [322.26, 327.64, 304.82, 305.23, 317.35], '1M': [358.72, 354.4, 374.76, 379.87, 384.77, 368.32, 367.11, 391.41, 396.26, 372.15, 373.08, 390.19, 369.18, 372.59, 380.37, 350.63, 322.26, 327.64, 304.82, 305.23, 317.35], 'YTD': [171.28, 167.66, 218.93, 219.26, 228.56, 235.7, 245.59, 248.29, 241.01, 220.59, 218.89, 245.04, 229.36, 247.71, 261.42, 284.4, 284.18, 359.88, 375.6, 385.98, 353.79, 361.86, 368.32, 373.08, 350.63, 317.35], '6M': [174.87, 220.68, 218.89, 228.56, 235.7, 245.59, 248.29, 258.54, 218.73, 224.92, 229.26, 209.49, 236.99, 263.92, 285.71, 265.61, 303.57, 362.76, 358.98, 409.68, 382.35, 358.72, 368.32, 373.08, 350.63, 317.35], '1Y': [137.19, 141.76, 137.29, 137.14, 127.75, 125.4, 121.15, 129.63, 131.89, 131.07, 129.73, 123.88, 128.09, 132.98, 137.94, 139.31, 152.66, 149.68, 170.89, 161.57, 168.06, 187.06, 189.86, 171.47, 175.01, 170.76, 174.87, 220.68, 218.89, 228.56, 235.7, 245.59, 248.29, 241.01, 220.59, 221.29, 229.26, 209.49, 236.99, 263.92, 285.71, 265.61, 303.57, 362.76, 358.98, 400.66, 382.35, 358.72, 368.32, 373.08, 350.63, 317.35] },
      velocityScore: { '1D': -2.5, '1W': -6, '1M': -16.1, '6M': null }, isNew: false,
      marketCap: '$24B', pe: 135, revenueGrowth: 23, eps: 2.35, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.07, PSI: false, XSD: 2.06, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RMBS', name: 'RAMBUS INC', easyScore: 2, avgWeight: 1.25, proScore: 0.62, coverage: 0.5,
      price: 114.13, weeklyPrices: [112.92, 113.25, 105.93, 109.64, 114.13], weeklyChange: 1.07, dayChange: 4.1, sortRank: 0, periodReturns: { '1M': -22.3, 'YTD': 24.2, '6M': 22.2, '1Y': 76.7 },
      priceHistory: { '1D': [109.64, 118.75, 119.03, 116.63, 118.85, 117.94, 118.55, 117.72, 118.3, 118.25, 117.57, 116.93, 116.78, 116.57, 116.77, 116.83, 116.97, 117.23, 116.39, 116.36, 115.16, 115.07, 114.83, 114.13], '1W': [112.92, 113.25, 105.93, 109.64, 114.13], '1M': [146.84, 138.12, 144.47, 146.56, 143.29, 132.48, 130.1, 141.17, 140.35, 128.21, 124.52, 123.69, 114.73, 123.9, 132.74, 123.83, 112.92, 113.25, 105.93, 109.64, 114.13], 'YTD': [91.89, 91.34, 103.07, 115.31, 113.71, 110.92, 101.95, 98.57, 87.59, 89.61, 93.32, 95.93, 89.95, 105.58, 120.03, 138.5, 111.93, 129.25, 127.05, 142.98, 147.48, 152.03, 132.48, 124.52, 123.83, 114.13], '6M': [93.38, 107.99, 114.19, 113.71, 110.92, 101.95, 98.57, 98.88, 88.52, 92.78, 93.35, 79.73, 91.87, 121.73, 130.45, 111.27, 118, 130.28, 122.03, 157.23, 166.78, 146.84, 132.48, 124.52, 123.83, 114.13], '1Y': [64.6, 68.17, 64.21, 73.93, 71.95, 76, 69.68, 75.05, 75.4, 88.58, 107.38, 100.76, 103.71, 98.72, 98.15, 101.61, 111.36, 108.61, 102.21, 90.22, 94.87, 98.81, 106.01, 91.49, 94.11, 97.5, 93.38, 107.99, 114.19, 113.71, 110.92, 101.95, 98.57, 87.59, 89.61, 93.5, 93.35, 79.73, 91.87, 121.73, 130.45, 111.27, 118, 130.28, 122.03, 148.66, 166.78, 146.84, 132.48, 124.52, 123.83, 114.13] },
      velocityScore: { '1D': null, '1W': -4.6, '1M': -25.3, '6M': null }, isNew: true,
      marketCap: '$12B', pe: 54.1, revenueGrowth: 8, eps: 2.11, grossMargin: 80, dividendYield: null,
      etfPresence: { SOXX: 0.6, PSI: false, XSD: 1.89, DRAM: false },
      tonyNote: 'RAMBUS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 8, avgWeight: 5.82, proScore: 2.74, coverage: 0.471,
      price: 991.64, weeklyPrices: [975.56, 984.75, 938.38, 948.80, 991.64], weeklyChange: 1.65, dayChange: 4.52, sortRank: 0, periodReturns: { '1M': 6, 'YTD': 247.4, '6M': 187.4, '1Y': 705.5 },
      priceHistory: { '1D': [948.8, 1017.05, 1030.67, 1015.52, 1013.47, 1013.52, 1021.17, 1017.53, 1018.65, 1017.6, 1021.38, 1011.9, 1016.21, 1022.69, 1024.61, 1024.57, 1020.29, 1019.77, 1013.67, 1011.86, 1002.27, 1004.51, 997.44, 991.64], '1W': [975.56, 984.75, 938.38, 948.8, 991.64], '1M': [935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 948.8, 991.64], 'YTD': [285.41, 327.02, 336.63, 399.65, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 542.21, 746.81, 724.66, 751, 1035.5, 949.28, 1020.76, 1048.51, 1032.28, 991.64], '6M': [345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1032.28, 991.64], '1Y': [123.11, 113.26, 111.73, 109.14, 111.87, 125.29, 117.21, 117.75, 124.21, 150.57, 168.89, 156.83, 183.75, 192.33, 202.53, 206.71, 226.63, 237.5, 244.9, 225.92, 230.26, 226.65, 258.46, 248.55, 284.79, 312.15, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1064.1, 935.89, 1020.76, 1048.51, 1032.28, 991.64] },
      velocityScore: { '1D': -0.7, '1W': -11.6, '1M': 14.6, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 22.4, revenueGrowth: 346, eps: 44.21, grossMargin: 73, dividendYield: 0.06,
      etfPresence: { PTF: 4.85, WCLD: false, IGV: false, FDTX: 9.33, GTEK: false, ARKK: false, MARS: false, FRWD: 4.54, BCTK: 4.22, FWD: false, CBSE: false, FCUS: 4.32, WGMI: false, CNEQ: 1.9, SGRT: 6.97, SPMO: 10.43, XMMO: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 7, avgWeight: 6.23, proScore: 2.57, coverage: 0.412,
      price: 202.78, weeklyPrices: [194.83, 195.55, 196.93, 204.12, 202.78], weeklyChange: 4.08, dayChange: -0.66, sortRank: 0, periodReturns: { '1M': -2.6, 'YTD': 8.7, '6M': 9.7, '1Y': 23.6 },
      priceHistory: { '1D': [204.12, 201.68, 201.01, 199.5, 200.37, 200.88, 201.36, 201.72, 201.39, 202.11, 202.07, 201.95, 201.99, 203.07, 202.83, 203.23, 203.11, 203.3, 203.84, 203.72, 203.39, 203.79, 203.95, 202.78], '1W': [194.83, 195.55, 196.93, 204.12, 202.78], '1M': [208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 196.93, 204.12, 202.78], 'YTD': [186.5, 185.04, 187.05, 187.67, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 198.45, 215.2, 225.32, 215.33, 224.36, 208.64, 207.41, 199, 197.58, 202.78], '6M': [184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 214.86, 222.82, 208.19, 207.41, 199, 197.58, 202.78], '1Y': [164.1, 173, 173.74, 177.87, 180.77, 182.02, 175.4, 181.6, 171.66, 177.17, 176.24, 177.69, 188.89, 192.57, 181.81, 182.16, 207.04, 195.21, 193.8, 186.52, 180.26, 183.38, 180.93, 174.14, 190.53, 188.12, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 181.93, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 212.6, 222.82, 208.19, 207.41, 199, 197.58, 202.78] },
      velocityScore: { '1D': 1.6, '1W': -12.3, '1M': 12.7, '6M': null }, isNew: false,
      marketCap: '$4.9T', pe: 31.1, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.49,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.09, GTEK: false, ARKK: 1.61, MARS: false, FRWD: 8.22, BCTK: 5.7, FWD: false, CBSE: false, FCUS: false, WGMI: 2.33, CNEQ: 13.75, SGRT: false, SPMO: 7.94, XMMO: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 7, avgWeight: 4.94, proScore: 2.03, coverage: 0.412,
      price: 578.05, weeklyPrices: [539.00, 577.46, 532.10, 550.30, 578.05], weeklyChange: 7.24, dayChange: 5.04, sortRank: 0, periodReturns: { '1M': 11.7, 'YTD': 235.5, '6M': 188.4, '1Y': 788.5 },
      priceHistory: { '1D': [550.3, 593.15, 600, 591.83, 588.52, 587.4, 591.29, 589.57, 590.1, 588, 588.53, 587.24, 587.2, 588.74, 589.11, 588.5, 588.88, 588.03, 586.16, 586.89, 580.41, 580.5, 579.3, 578.05], '1W': [539, 577.46, 532.1, 550.3, 578.05], '1M': [517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 532.1, 550.3, 578.05], 'YTD': [172.27, 187.68, 222.1, 236.39, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 304.9, 296.14, 297.73, 337.88, 361.69, 403.12, 431.52, 480, 482.02, 484.28, 546.2, 526.93, 681.08, 643.83, 598.37, 578.05], '6M': [200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 524.65, 563.1, 517.72, 681.08, 643.83, 598.37, 578.05], '1Y': [65.06, 67.02, 69.02, 78.69, 74.44, 76.24, 75.64, 80.67, 90.49, 96.15, 105.15, 107.21, 131.26, 119.7, 125.92, 125.72, 141.38, 160.1, 166.11, 153.97, 157.74, 161, 187.2, 175.01, 181.54, 187.88, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 313.81, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 563.1, 517.72, 681.08, 643.83, 598.37, 578.05] },
      velocityScore: { '1D': -1.5, '1W': 2, '1M': 44, '6M': null }, isNew: false,
      marketCap: '$199B', pe: 34.6, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { PTF: 4.3, WCLD: false, IGV: false, FDTX: 4.49, GTEK: false, ARKK: false, MARS: false, FRWD: 4.56, BCTK: false, FWD: false, CBSE: false, FCUS: 4.18, WGMI: false, CNEQ: 4.62, SGRT: 10.65, SPMO: 1.78, XMMO: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 7, avgWeight: 4.48, proScore: 1.85, coverage: 0.412,
      price: 436.96, weeklyPrices: [434.16, 451.79, 432.57, 436.98, 436.96], weeklyChange: 0.64, dayChange: 0, sortRank: 0, periodReturns: { '1M': 2.1, 'YTD': 43.8, '6M': 35, '1Y': 90.2 },
      priceHistory: { '1D': [436.98, 442.97, 444.07, 439.55, 441.82, 442.01, 443.28, 443.84, 444.24, 444.08, 442.72, 441.67, 442.08, 442.71, 442.66, 441.63, 440.03, 439.33, 439.46, 440.4, 437.98, 438.36, 437.65, 436.96], '1W': [434.16, 451.79, 432.57, 436.98, 436.96], '1M': [427.92, 408.75, 421.07, 423.93, 441.4, 425.83, 432.15, 462.12, 467.67, 436.39, 440.83, 434.99, 432.35, 455.1, 477.57, 444.23, 434.16, 451.79, 432.57, 436.98, 436.96], 'YTD': [303.89, 318.01, 341.64, 334.87, 341.36, 355.41, 364.2, 385.75, 353.13, 347.09, 339.57, 347.75, 341.49, 365.49, 363.35, 382.66, 397.67, 411.68, 404.35, 404.52, 435.63, 426.8, 425.83, 440.83, 444.23, 436.96], '6M': [323.63, 342.4, 332.71, 341.36, 355.41, 364.2, 385.75, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 392.61, 412.32, 446.69, 427.92, 425.83, 440.83, 444.23, 436.96], '1Y': [229.76, 245.6, 241.6, 241.62, 242.62, 241, 228.6, 239.29, 235.21, 258.91, 268.64, 276.66, 288.11, 299.88, 299.84, 290.73, 305.09, 293.64, 290.62, 282.37, 289.96, 292.93, 304.85, 284.68, 302.84, 322.25, 323.63, 342.4, 332.71, 341.36, 355.41, 364.2, 385.75, 353.13, 347.09, 345.98, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 392.61, 422.73, 446.69, 427.92, 425.83, 440.83, 444.23, 436.96] },
      velocityScore: { '1D': 0.5, '1W': 10.1, '1M': 11.4, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 38, revenueGrowth: 35, eps: 11.49, grossMargin: 62, dividendYield: 0.87,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6.39, GTEK: false, ARKK: 0.93, MARS: false, FRWD: 6.19, BCTK: 8.79, FWD: false, CBSE: 2.58, FCUS: false, WGMI: 0.72, CNEQ: 5.77, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 7, avgWeight: 3.76, proScore: 1.55, coverage: 0.412,
      price: 546.72, weeklyPrices: [517.82, 552.05, 516.11, 517.41, 546.72], weeklyChange: 5.58, dayChange: 5.67, sortRank: 0, periodReturns: { '1M': 15, 'YTD': 155.3, '6M': 169.1, '1Y': 279.2 },
      priceHistory: { '1D': [517.4, 549.87, 557.37, 550.3, 557.93, 554.23, 555.76, 554.14, 552.63, 556.35, 554.66, 550.65, 552.32, 551.76, 549.47, 548.67, 545.88, 546.51, 545.43, 546.95, 544.47, 543.91, 547.39, 546.72], '1W': [517.82, 552.05, 516.11, 517.41, 546.72], '1M': [475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 517.41, 546.72], 'YTD': [214.16, 204.68, 227.92, 259.68, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 360.54, 455.19, 424.1, 467.51, 510.13, 490.33, 507.29, 519.74, 540.88, 546.72], '6M': [203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 503.89, 521.54, 475.51, 507.29, 519.74, 540.88, 546.72], '1Y': [144.16, 160.41, 162.12, 176.31, 172.4, 180.95, 165.2, 167.13, 161.79, 155.67, 157.92, 161.27, 169.73, 232.89, 234.56, 234.99, 264.33, 256.33, 258.89, 223.55, 214.24, 215.98, 221.43, 201.06, 214.99, 221.08, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 196.31, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 521.54, 475.51, 507.29, 519.74, 540.88, 546.72] },
      velocityScore: { '1D': -9.9, '1W': -11.9, '1M': -8.8, '6M': null }, isNew: false,
      marketCap: '$891B', pe: 182.2, revenueGrowth: 38, eps: 3, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.22, MARS: false, FRWD: 7.7, BCTK: 3.43, FWD: 2.29, CBSE: false, FCUS: false, WGMI: false, CNEQ: 1.08, SGRT: 3.41, SPMO: 4.17, XMMO: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 7, avgWeight: 3.68, proScore: 1.51, coverage: 0.412,
      price: 401.11, weeklyPrices: [360.45, 373.90, 370.78, 388.69, 401.11], weeklyChange: 11.28, dayChange: 3.2, sortRank: 0, periodReturns: { '1M': 2.3, 'YTD': 15.9, '6M': 16.3, '1Y': 45.6 },
      priceHistory: { '1D': [388.69, 397.52, 394.61, 389.68, 393.99, 394.08, 397.7, 399.64, 401.47, 400.91, 401.24, 401.04, 403.3, 403.8, 405.18, 406.17, 405.53, 404.61, 405.45, 405.77, 402.93, 402.03, 401.07, 401.11], '1W': [360.45, 373.9, 370.78, 388.69, 401.11], '1M': [392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 370.78, 388.69, 401.11], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 421.28, 430, 425.19, 414.14, 459.97, 396.6, 376.71, 382.07, 369.34, 401.11], '6M': [344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 422.01, 481.57, 392.16, 376.71, 382.07, 369.34, 401.11], '1Y': [275.4, 286.45, 288.71, 293.7, 303.76, 311.23, 291.17, 300.25, 306.1, 359.63, 345.35, 336.1, 338.18, 345.02, 354.15, 344.29, 385.98, 358.98, 355.22, 354.42, 397.57, 381.03, 406.37, 329.88, 352.13, 343.42, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 321.31, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 421.86, 481.57, 392.16, 376.71, 382.07, 369.34, 401.11] },
      velocityScore: { '1D': 1.3, '1W': 2.7, '1M': 17.1, '6M': null }, isNew: false,
      marketCap: '$1.9T', pe: 66.6, revenueGrowth: 48, eps: 6.02, grossMargin: 76, dividendYield: 0.67,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.62, GTEK: false, ARKK: 1.1, MARS: false, FRWD: 4.77, BCTK: 6.62, FWD: 1.87, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.42, SGRT: false, SPMO: 6.33, XMMO: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'SPCX', name: 'SPACE EXPLORATION TECHN-CL A', easyScore: 6, avgWeight: 7.02, proScore: 2.48, coverage: 0.353,
      price: 152.16, weeklyPrices: [162.00, 160.42, 149.47, 148.30, 152.16], weeklyChange: -6.07, dayChange: 2.63, sortRank: 0, periodReturns: { '1M': -5.5, 'YTD': -5.5, '6M': -5.5, '1Y': -5.5 },
      priceHistory: { '1D': [148.26, 150.53, 150.69, 148.83, 148.89, 149.3, 149.88, 150.53, 150.05, 150.45, 150.25, 150.4, 151.19, 151.38, 152.47, 152.5, 152.62, 153.35, 152.95, 152.78, 153.23, 152.79, 151.39, 152.16], '1W': [162, 160.42, 149.47, 148.3, 152.16], '1M': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 148.3, 152.16], 'YTD': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 148.3, 152.16], '6M': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 148.3, 152.16], '1Y': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 148.3, 152.16] },
      velocityScore: { '1D': 0.4, '1W': 7.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.0T', pe: null, revenueGrowth: 15, eps: -0.67, grossMargin: 49, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.27, MARS: 22.16, FRWD: 2.43, BCTK: 8.41, FWD: 1.79, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.05, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'SPACE EXPLORATION TECHN-CL A appears in 6 of 17 Broad Tech ETFs (35% coverage) with average weight 7.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 6, avgWeight: 3.13, proScore: 1.1, coverage: 0.353,
      price: 247.04, weeklyPrices: [242.67, 244.16, 245.98, 243.62, 247.04], weeklyChange: 1.8, dayChange: 1.4, sortRank: 0, periodReturns: { '1M': 1.2, 'YTD': 7, '6M': -0.1, '1Y': 11.1 },
      priceHistory: { '1D': [243.62, 241.85, 242.34, 239.88, 241.49, 241.18, 241.42, 241.82, 241.52, 241.68, 242.2, 242.58, 241.92, 243.28, 244.01, 243.91, 244.15, 244.67, 245.01, 244.38, 245, 245.49, 246.02, 247.04], '1W': [242.67, 244.16, 245.98, 243.62, 247.04], '1M': [244.19, 238, 241.51, 238.55, 246.02, 246, 237.5, 244.39, 232.79, 234.11, 234.27, 227.01, 232.69, 240.14, 238.34, 241.7, 242.67, 244.16, 245.98, 243.62, 247.04], 'YTD': [230.82, 246.29, 238.18, 239.16, 242.96, 208.72, 201.15, 208.56, 208.73, 214.33, 209.87, 211.71, 210.57, 233.65, 249.7, 255.08, 268.26, 272.68, 264.14, 266.32, 261.26, 245.22, 246, 234.27, 241.7, 247.04], '6M': [247.38, 239.12, 238.42, 242.96, 208.72, 201.15, 208.56, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 259.34, 265.29, 256.52, 244.19, 246, 234.27, 241.7, 247.04], '1Y': [222.26, 223.88, 232.23, 234.11, 223.13, 230.98, 223.81, 229.12, 235.68, 229.95, 231.23, 218.15, 222.41, 227.74, 214.47, 221.09, 230.3, 250.2, 244.2, 222.69, 229.16, 229.11, 230.28, 226.76, 232.52, 233.06, 247.38, 239.12, 238.42, 242.96, 208.72, 201.15, 208.56, 208.73, 214.33, 215.2, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 259.34, 271.85, 256.52, 244.19, 246, 234.27, 241.7, 247.04] },
      velocityScore: { '1D': -0.9, '1W': 0.9, '1M': -10.6, '6M': null }, isNew: false,
      marketCap: '$2.7T', pe: 32.1, revenueGrowth: 17, eps: 7.7, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.29, GTEK: false, ARKK: 2.41, MARS: false, FRWD: 2.99, BCTK: 4.27, FWD: 1.53, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.28, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'LRCX', name: 'Lam Research Corp', easyScore: 5, avgWeight: 4.29, proScore: 1.26, coverage: 0.294,
      price: 353.17, weeklyPrices: [351.41, 350.20, 326.13, 333.15, 353.17], weeklyChange: 0.5, dayChange: 6.01, sortRank: 0, periodReturns: { '1M': 8, 'YTD': 106.3, '6M': 61.7, '1Y': 249.5 },
      priceHistory: { '1D': [333.15, 366.8, 364.93, 357.95, 355.76, 353.18, 356.9, 353.93, 355.32, 354.27, 355.49, 355.95, 357.42, 357.74, 358.03, 356.48, 356.05, 355.57, 353.31, 353.76, 351.51, 351.58, 352.14, 353.17], '1W': [351.41, 350.2, 326.13, 333.15, 353.17], '1M': [327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82, 379.09, 410.91, 433.33, 391.26, 351.41, 350.2, 326.13, 333.15, 353.17], 'YTD': [171.18, 200.96, 217.47, 217.94, 237.5, 229.28, 235.58, 244.25, 217.27, 215.23, 224.71, 233.45, 222.01, 258.76, 260.96, 258.56, 256.72, 294.05, 284.72, 305.35, 317.12, 324.45, 369.34, 374.8, 391.26, 353.17], '6M': [218.36, 222.96, 222.87, 237.5, 229.28, 235.58, 244.25, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 273.38, 322.68, 334.41, 327.16, 369.34, 374.8, 391.26, 353.17], '1Y': [101.06, 100.79, 97.78, 94.84, 99.15, 107.38, 99.15, 103.67, 100.42, 115.58, 126.32, 128.13, 146.99, 141, 142.37, 147.54, 160.67, 165.05, 161.42, 148.8, 155.14, 157.09, 168.71, 164.7, 178.07, 194.76, 218.36, 222.96, 222.87, 237.5, 229.28, 235.58, 244.25, 217.27, 215.23, 226.47, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 273.38, 318.93, 334.41, 327.16, 369.34, 374.8, 391.26, 353.17] },
      velocityScore: { '1D': -1.6, '1W': -11.9, '1M': -1.6, '6M': null }, isNew: false,
      marketCap: '$442B', pe: 66.6, revenueGrowth: 24, eps: 5.3, grossMargin: 50, dividendYield: 0.31,
      etfPresence: { PTF: 2.98, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.57, BCTK: 7.41, FWD: 1.86, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 3.65, XMMO: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 5, avgWeight: 4.25, proScore: 1.25, coverage: 0.294,
      price: 356.24, weeklyPrices: [356.18, 364.90, 363.62, 358.71, 356.24], weeklyChange: 0.02, dayChange: -0.69, sortRank: 0, periodReturns: { '1M': -1.7, 'YTD': 13.5, '6M': 8.2, '1Y': 99.4 },
      priceHistory: { '1D': [358.71, 354.92, 352.38, 349.39, 351.45, 350.55, 350.22, 351.15, 350.67, 350.48, 350.83, 352.32, 352.27, 352.02, 352.54, 352.83, 353.6, 354.07, 353.76, 353.65, 354.74, 354.99, 355.76, 356.24], '1W': [356.18, 364.9, 363.62, 358.71, 356.24], '1M': [362.29, 353.32, 356.56, 358.16, 367.11, 371.1, 362.1, 367.46, 348.78, 346.08, 345.04, 342.19, 334.69, 351.28, 353.33, 357.89, 356.18, 364.9, 363.62, 358.71, 356.24], 'YTD': [313.8, 326.01, 333.16, 328.43, 344.9, 324.4, 302.82, 310.92, 303.56, 306.93, 306.3, 289.59, 294.9, 316.37, 332.77, 337.75, 383.22, 397.05, 393.32, 379.38, 372.58, 361.17, 371.1, 345.04, 357.89, 356.24], '6M': [329.14, 330.34, 333.59, 344.9, 324.4, 302.82, 310.92, 306.36, 306.01, 304.42, 299.02, 273.14, 303.93, 330.58, 330.47, 347.5, 384.27, 383.82, 384.9, 384.84, 358.39, 362.29, 371.1, 345.04, 357.89, 356.24], '1Y': [178.7, 184.7, 193.2, 192.86, 197.28, 203.82, 200.19, 208.21, 232.66, 240.78, 252.33, 246.57, 246.43, 242.21, 251.88, 253.73, 275.17, 284.75, 287.43, 292.99, 320.28, 318.39, 313.7, 303.75, 314.96, 317.32, 329.14, 330.34, 333.59, 344.9, 324.4, 302.82, 310.92, 303.56, 306.93, 309.41, 299.02, 273.14, 303.93, 330.58, 330.47, 347.5, 384.27, 383.82, 384.9, 384.83, 358.39, 362.29, 371.1, 345.04, 357.89, 356.24] },
      velocityScore: { '1D': 0, '1W': 6.8, '1M': 40.4, '6M': null }, isNew: false,
      marketCap: '$4.3T', pe: 27.2, revenueGrowth: 22, eps: 13.09, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.21, GTEK: false, ARKK: 1.9, MARS: false, FRWD: false, BCTK: 6.53, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.92, SGRT: false, SPMO: 3.71, XMMO: false },
      tonyNote: 'Alphabet Inc Class C appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 4.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRWD', name: 'CrowdStrike', easyScore: 5, avgWeight: 2.69, proScore: 0.79, coverage: 0.294,
      price: 198.4, weeklyPrices: [193.98, 199.38, 194.62, 191.12, 198.40], weeklyChange: 2.28, dayChange: 3.81, sortRank: 0, periodReturns: { '1M': 23.1, 'YTD': 69.3, '6M': 68.6, '1Y': 62.9 },
      priceHistory: { '1D': [191.12, 194, 195.41, 195.03, 196.1, 195.27, 194.71, 195.27, 196.01, 195.85, 196.12, 197.71, 196.55, 196.37, 196.93, 196.67, 197.13, 197.37, 198.24, 198.12, 198.43, 197.85, 197.74, 198.4], '1W': [193.98, 199.38, 194.62, 191.12, 198.4], '1M': [161.23, 161.93, 172.88, 170.7, 173.23, 169.87, 170.74, 171.21, 168.86, 170.23, 168.26, 169.66, 175.27, 185.73, 190.79, 193.18, 193.98, 199.38, 194.62, 191.12, 198.4], 'YTD': [117.19, 115.97, 113.75, 113.12, 109.71, 102.01, 103.57, 87.56, 97.86, 109.08, 108.95, 96.46, 98.33, 98.67, 104.55, 111.35, 113.91, 131.94, 148.52, 165.87, 195.54, 164.7, 169.87, 168.26, 193.18, 198.4], '6M': [117.65, 113.47, 117.08, 109.71, 102.01, 103.57, 87.56, 96.21, 108.53, 105.96, 103.33, 95.01, 105.81, 99.62, 112.4, 113.75, 119.13, 136.54, 154.22, 167.89, 192.24, 161.23, 169.87, 168.26, 193.18, 198.4], '1Y': [121.78, 117.46, 115.51, 113.64, 106.25, 106.21, 104.79, 105.65, 103.11, 108.35, 125.66, 118.27, 124.2, 127.28, 120.56, 130.49, 136.38, 133.54, 136.46, 130.15, 125.39, 128.28, 129.41, 119.32, 120.3, 114.14, 117.65, 113.47, 117.08, 109.71, 102.01, 103.57, 87.56, 97.86, 109.08, 108.3, 103.33, 95.01, 105.81, 99.62, 112.4, 113.75, 119.13, 136.54, 154.22, 161.34, 192.24, 161.23, 169.87, 168.26, 193.18, 198.4] },
      velocityScore: { '1D': 0, '1W': 1.3, '1M': 6.8, '6M': null }, isNew: false,
      marketCap: '$202B', pe: null, revenueGrowth: 26, eps: -0.04, grossMargin: 75, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.54, IGV: 7.14, FDTX: 1.21, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.33, FWD: 1.24, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'CrowdStrike appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 2.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, avgWeight: 5.06, proScore: 1.19, coverage: 0.235,
      price: 384.36, weeklyPrices: [390.49, 386.74, 388.84, 383.34, 384.36], weeklyChange: -1.57, dayChange: 0.27, sortRank: 0, periodReturns: { '1M': -4.7, 'YTD': -20.5, '6M': -19.8, '1Y': -23.4 },
      priceHistory: { '1D': [383.34, 378.33, 377.56, 375.31, 377.54, 377.86, 379.08, 380.13, 380.17, 380.05, 379.11, 380.1, 379.28, 379.56, 380.83, 380.58, 381.13, 380.68, 380.67, 380.63, 381.46, 382.39, 383.4, 384.36], '1W': [390.49, 386.74, 388.84, 383.34, 384.36], '1M': [403.41, 397.36, 390.34, 390.74, 399.76, 393.83, 378.91, 379.4, 367.34, 373.94, 365.46, 352.83, 372.97, 368.57, 373.02, 384.28, 390.49, 386.74, 388.84, 383.34, 384.36], 'YTD': [483.62, 478.11, 456.66, 465.95, 423.37, 413.6, 396.86, 389, 403.93, 405.76, 391.79, 371.04, 369.37, 373.07, 420.26, 415.75, 414.44, 415.12, 421.92, 418.57, 460.52, 411.74, 393.83, 365.46, 384.28, 384.36], '6M': [479.28, 459.86, 470.28, 423.37, 413.6, 396.86, 389, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 417.42, 416.03, 441.31, 403.41, 393.83, 365.46, 384.28, 384.36], '1Y': [501.48, 511.7, 510.88, 533.5, 520.84, 522.48, 505.72, 506.74, 507.97, 501.01, 508.45, 507.03, 515.74, 522.4, 511.61, 520.56, 541.55, 507.16, 511.14, 487.12, 485.5, 480.84, 483.47, 483.98, 487.71, 472.85, 479.28, 459.86, 470.28, 423.37, 413.6, 396.86, 389, 403.93, 405.76, 399.41, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 417.42, 412.67, 441.31, 403.41, 393.83, 365.46, 384.28, 384.36] },
      velocityScore: { '1D': -0.8, '1W': 1.7, '1M': -0.8, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 22.9, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 0.95,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.12, FDTX: 2.93, GTEK: false, ARKK: false, MARS: false, FRWD: 3.03, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 6.15, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, avgWeight: 4.82, proScore: 1.13, coverage: 0.235,
      price: 890.09, weeklyPrices: [820.16, 868.26, 827.64, 860.02, 890.09], weeklyChange: 8.53, dayChange: 3.5, sortRank: 0, periodReturns: { '1M': 5.2, 'YTD': 223.2, '6M': 192.8, '1Y': 516 },
      priceHistory: { '1D': [860.02, 921.79, 934.05, 919.29, 916.01, 907.37, 914.82, 911.5, 912.82, 914.17, 914.64, 909.05, 905.91, 911.08, 914.45, 914.04, 911.85, 910.14, 908.8, 908.3, 900.89, 901.54, 895.57, 890.09], '1W': [820.16, 868.26, 827.64, 860.02, 890.09], '1M': [846.01, 815.99, 868.09, 931.04, 1018.8, 1031.34, 1066.07, 1070.23, 1094.04, 1038.59, 993.25, 1025.36, 899.9, 968.53, 965, 915.19, 820.16, 868.26, 827.64, 860.02, 890.09], 'YTD': [275.39, 284.47, 320.32, 346.1, 432.95, 425, 415.94, 396.02, 357.62, 384.29, 406.77, 413.22, 423.12, 500.77, 531.81, 587.62, 726.93, 782.64, 795.47, 812.73, 921.26, 876.77, 1031.34, 993.25, 915.19, 890.09], '6M': [304.01, 326.23, 358.29, 432.95, 425, 415.94, 396.02, 379.52, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 579.03, 771.01, 808.8, 733.35, 845.76, 926.61, 846.01, 1031.34, 993.25, 915.19, 890.09], '1Y': [144.5, 146.72, 152.73, 157.01, 148.1, 155.73, 158.4, 167.24, 183.98, 196.81, 216.64, 219.85, 254.74, 221.7, 226.03, 226.41, 265.62, 275.77, 283.26, 259.14, 272.28, 265.63, 307.85, 292, 286.22, 289.83, 304.01, 326.23, 358.29, 432.95, 425, 415.94, 396.02, 357.62, 384.29, 421.09, 404.02, 362.43, 468.72, 533.44, 559.9, 579.03, 771.01, 808.8, 733.35, 870.66, 926.61, 846.01, 1031.34, 993.25, 915.19, 890.09] },
      velocityScore: { '1D': -10.3, '1W': 8.7, '1M': -33.9, '6M': null }, isNew: false,
      marketCap: '$200B', pe: 84.1, revenueGrowth: 44, eps: 10.58, grossMargin: 42, dividendYield: 0.34,
      etfPresence: { PTF: 3.79, WCLD: false, IGV: false, FDTX: 4.14, GTEK: false, ARKK: false, MARS: false, FRWD: 7.22, BCTK: false, FWD: false, CBSE: false, FCUS: 4.13, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 4, avgWeight: 4.5, proScore: 1.06, coverage: 0.235,
      price: 338.31, weeklyPrices: [348.06, 357.53, 337.04, 320.59, 338.31], weeklyChange: -2.8, dayChange: 5.53, sortRank: 0, periodReturns: { '1M': 29.9, 'YTD': 83.7, '6M': 79, '1Y': 76.1 },
      priceHistory: { '1D': [320.59, 326.31, 327.1, 328.65, 330.48, 329.77, 329.63, 331.15, 330.5, 331.58, 332.85, 334.58, 331.8, 332.93, 334.03, 334.05, 334.98, 335.76, 336.68, 336.28, 337.27, 336.44, 334.85, 338.31], '1W': [348.06, 357.53, 337.04, 320.59, 338.31], '1M': [260.52, 263.22, 279.53, 279.62, 284.54, 279.9, 282.13, 287.78, 286.4, 290.92, 285.26, 293.09, 304.2, 332, 341.02, 352.04, 348.06, 357.53, 337.04, 320.59, 338.31], 'YTD': [184.2, 190.8, 187.73, 180.18, 175.42, 166, 163.5, 141.67, 156.09, 165.58, 168.91, 153.22, 160.67, 166.99, 166.97, 173.21, 181.08, 207.88, 242.83, 260.58, 300.48, 266.33, 279.9, 285.26, 352.04, 338.31], '6M': [189.02, 187.66, 184.22, 175.42, 166, 163.5, 141.67, 150.15, 165.1, 167.45, 164.05, 154.35, 169.87, 161.59, 174.96, 180.99, 183.98, 215.6, 240.13, 256.75, 297.18, 260.52, 279.9, 285.26, 352.04, 338.31], '1Y': [192.07, 196.28, 201.16, 173.6, 168.1, 173.55, 184.43, 187.61, 192.35, 198.33, 205.68, 202.21, 209.3, 215.17, 205.51, 215.02, 217.16, 213.18, 210.04, 199.9, 185.35, 195.68, 190.36, 185.88, 188.45, 182.12, 189.02, 187.66, 184.22, 175.42, 166, 163.5, 141.67, 156.09, 165.58, 169.19, 164.05, 154.35, 169.87, 161.59, 174.96, 180.99, 183.98, 215.6, 240.13, 248.47, 297.18, 260.52, 279.9, 285.26, 352.04, 338.31] },
      velocityScore: { '1D': -1.9, '1W': -3.6, '1M': 1, '6M': null }, isNew: false,
      marketCap: '$276B', pe: 294.2, revenueGrowth: 31, eps: 1.15, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.97, IGV: 9.54, FDTX: 4.15, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.34, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 4, avgWeight: 4.45, proScore: 1.05, coverage: 0.235,
      price: 406.55, weeklyPrices: [393.45, 419.77, 402.90, 394.06, 406.55], weeklyChange: 3.33, dayChange: 3.2, sortRank: 0, periodReturns: { '1M': 2.5, 'YTD': -9.6, '6M': -8.6, '1Y': 31.2 },
      priceHistory: { '1D': [393.93, 395.22, 398.01, 392.43, 395.18, 395.48, 395.36, 395.8, 397.05, 399.96, 401.36, 399.73, 401.68, 403.61, 404.46, 404.27, 404.56, 406.05, 406.9, 407.57, 406.62, 405.75, 405.27, 406.55], '1W': [393.45, 419.77, 402.9, 394.06, 406.55], '1M': [396.68, 381.59, 399.15, 406.43, 411.15, 404.66, 396.38, 400.49, 405.05, 381.61, 375.53, 375.12, 379.71, 411.84, 420.6, 425.3, 393.45, 419.77, 402.9, 394.06, 406.55], 'YTD': [449.72, 435.8, 438.57, 449.06, 421.81, 417.32, 410.63, 409.38, 392.43, 399.24, 392.78, 385.95, 381.26, 345.62, 388.9, 373.72, 390.82, 428.35, 422.24, 426.01, 415.88, 408.95, 404.66, 375.53, 425.3, 406.55], '6M': [445.01, 437.5, 435.2, 421.81, 417.32, 410.63, 409.38, 403.32, 398.68, 395.56, 380.85, 355.28, 346.65, 364.2, 386.42, 376.02, 389.37, 433.45, 404.11, 433.59, 423.74, 396.68, 404.66, 375.53, 425.3, 406.55], '1Y': [309.87, 319.41, 305.3, 308.27, 322.27, 335.58, 323.9, 349.6, 338.53, 368.81, 416.85, 423.39, 436, 435.54, 428.75, 448.98, 461.51, 462.07, 430.6, 403.99, 426.58, 454.53, 446.89, 483.37, 475.19, 451.67, 445.01, 437.5, 435.2, 421.81, 417.32, 410.63, 409.38, 392.43, 399.24, 399.27, 380.85, 355.28, 346.65, 364.2, 386.42, 376.02, 389.37, 433.45, 404.11, 440.36, 423.74, 396.68, 404.66, 375.53, 425.3, 406.55] },
      velocityScore: { '1D': -0.9, '1W': 7.1, '1M': -8.7, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 369.6, revenueGrowth: 16, eps: 1.1, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 10.03, MARS: false, FRWD: false, BCTK: 3.37, FWD: 1.36, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.06, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 4, avgWeight: 3.68, proScore: 0.87, coverage: 0.235,
      price: 129.04, weeklyPrices: [129.30, 132.54, 134.37, 132.22, 129.04], weeklyChange: -0.2, dayChange: -2.41, sortRank: 0, periodReturns: { '1M': -2.3, 'YTD': -27.4, '6M': -27.3, '1Y': -9.4 },
      priceHistory: { '1D': [132.22, 127.6, 128.3, 125.85, 126.54, 125.79, 126.17, 126.76, 127.19, 126.71, 126.71, 127.2, 127.02, 127.31, 128.08, 127.95, 128.06, 127.86, 128.46, 128.53, 128.51, 128.57, 128.87, 129.04], '1W': [129.3, 132.54, 134.37, 132.22, 129.04], '1M': [132.07, 130.21, 131.08, 127.99, 134.71, 133.25, 130.63, 128.47, 119.5, 116.7, 113.5, 107.27, 112.93, 115.7, 116.67, 125.73, 129.3, 132.54, 134.37, 132.22, 129.04], 'YTD': [177.75, 176.86, 177.07, 169.6, 147.76, 142.91, 133.02, 128.84, 147.22, 151.14, 152.77, 154.96, 146.49, 130.49, 142.76, 141.57, 144.07, 137.8, 133.99, 136.88, 160.65, 136.47, 133.25, 113.5, 125.73, 129.04], '6M': [177.49, 170.96, 167.47, 147.76, 142.91, 133.02, 128.84, 145.17, 156.43, 152.72, 160.84, 137.55, 150.07, 135.7, 145.97, 141.18, 135.91, 136, 135.26, 136.6, 152.17, 132.07, 133.25, 113.5, 125.73, 129.04], '1Y': [142.5, 153.99, 154.86, 158.35, 182.2, 181.02, 156.01, 156.72, 156.14, 164.36, 176.97, 179.12, 187.05, 185.47, 178.12, 180.48, 198.81, 187.9, 184.17, 165.42, 165.77, 177.92, 187.54, 185.69, 188.71, 174.04, 177.49, 170.96, 167.47, 147.76, 142.91, 133.02, 128.84, 147.22, 151.14, 155.08, 160.84, 137.55, 150.07, 135.7, 145.97, 141.18, 135.91, 136, 135.26, 132.51, 152.17, 132.07, 133.25, 113.5, 125.73, 129.04] },
      velocityScore: { '1D': 1.2, '1W': 16, '1M': -12.1, '6M': null }, isNew: false,
      marketCap: '$309B', pe: 145, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.54, FDTX: 2, GTEK: false, ARKK: 2.97, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.2, XMMO: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 4, avgWeight: 3.21, proScore: 0.75, coverage: 0.235,
      price: 1858.27, weeklyPrices: [1745.00, 1744.43, 1617.70, 1727.18, 1858.27], weeklyChange: 6.49, dayChange: 7.59, sortRank: 0, periodReturns: { '1M': 12.9, 'YTD': 682.8, '6M': 392.4, '1Y': 3858 },
      priceHistory: { '1D': [1727.18, 1813.83, 1855.76, 1840.46, 1845.9, 1856.69, 1890.19, 1882, 1880.82, 1880.81, 1889.3, 1878.96, 1883, 1903.25, 1923.74, 1935.58, 1934.19, 1944.47, 1931.6, 1927.01, 1887.62, 1902.27, 1882.57, 1858.27], '1W': [1745, 1744.43, 1617.7, 1727.18, 1858.27], '1M': [1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745, 1744.43, 1617.7, 1727.18, 1858.27], 'YTD': [237.38, 334.54, 409.24, 473.83, 665.24, 583.4, 590.59, 638.52, 565.41, 618.89, 753.69, 677.86, 692.73, 851.57, 919.47, 932.43, 1187, 1562.34, 1407.61, 1478.69, 1761.43, 1642, 1991.55, 1914.46, 2032.22, 1858.27], '6M': [377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46, 2032.22, 1858.27], '1Y': [46.95, 41.52, 42.06, 42.92, 40.69, 46.68, 44.4, 48.44, 62.5, 84.3, 98.87, 94.29, 124.14, 129.68, 144.27, 167.05, 204.36, 216.5, 283.1, 245.96, 215.04, 213.31, 241.61, 219.46, 250.05, 274.08, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 565.41, 618.89, 720.17, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1716.36, 1646.54, 1991.55, 1914.46, 2032.22, 1858.27] },
      velocityScore: { '1D': -9.6, '1W': -15.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$275B', pe: 63.7, revenueGrowth: 251, eps: 29.19, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 5.18, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.32, CBSE: false, FCUS: 3.97, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.36, XMMO: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'DDOG', name: 'DDOG', easyScore: 4, avgWeight: 3.08, proScore: 0.72, coverage: 0.235,
      price: 269, weeklyPrices: [260.36, 255.37, 256.81, 261.09, 269.00], weeklyChange: 3.32, dayChange: 3.03, sortRank: 0, periodReturns: { '1M': 18.3, 'YTD': 97.8, '6M': 114.4, '1Y': 95.7 },
      priceHistory: { '1D': [261.09, 266.02, 269.55, 267.05, 266.52, 265.64, 267.05, 267.64, 267.68, 267.42, 267.42, 268.61, 267.67, 267.27, 268.42, 268.64, 268.51, 267.47, 268.4, 268.18, 268.17, 267.14, 269.05, 269], '1W': [260.36, 255.37, 256.81, 261.09, 269], '1M': [227.34, 227.63, 234.24, 229.9, 233.09, 231.11, 226.63, 223, 221.37, 220.57, 222.65, 220.94, 239.77, 248.57, 260.36, 264.48, 260.36, 255.37, 256.81, 261.09, 269], 'YTD': [135.99, 130.68, 120.86, 130.13, 129.05, 114.01, 122.56, 104.43, 111.77, 123.08, 131.26, 123.29, 118.67, 108.98, 123.47, 127.86, 140.53, 200.16, 207.98, 222.32, 277.49, 231.68, 231.11, 222.65, 264.48, 269], '6M': [125.49, 119.02, 136.64, 129.05, 114.01, 122.56, 104.43, 111.11, 128.56, 126.57, 129.23, 115.81, 116.54, 110.57, 129.29, 131.55, 145.73, 199.94, 215.15, 223.65, 269.13, 227.34, 231.11, 222.65, 264.48, 269], '1Y': [137.49, 143.15, 146.56, 139.98, 136.38, 124.52, 128.46, 131.73, 131.78, 139.15, 136.81, 136.6, 151.57, 164.07, 151.17, 156.59, 156, 154.98, 190.89, 176.31, 158.4, 153, 149.9, 138.29, 138.32, 133.64, 125.49, 119.02, 136.64, 129.05, 114.01, 122.56, 104.43, 111.77, 123.08, 128.87, 129.23, 115.81, 116.54, 110.57, 129.29, 131.55, 145.73, 199.94, 215.15, 221.81, 269.13, 227.34, 231.11, 222.65, 264.48, 269] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$96B', pe: 689.7, revenueGrowth: 32, eps: 0.39, grossMargin: 80, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.86, IGV: 3.19, FDTX: 2.39, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: 3.88, SPMO: false, XMMO: false },
      tonyNote: 'DDOG appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 2.97, proScore: 0.7, coverage: 0.235,
      price: 123.17, weeklyPrices: [119.46, 120.14, 121.88, 119.22, 123.17], weeklyChange: 3.11, dayChange: 3.31, sortRank: 0, periodReturns: { '1M': 11.5, 'YTD': -23.5, '6M': -25.1, '1Y': 7 },
      priceHistory: { '1D': [119.22, 119.91, 119.79, 118.61, 120.4, 119.77, 120.09, 120.5, 120.78, 120.33, 120.29, 121.54, 121.45, 121.71, 121.94, 122.01, 122.18, 122.03, 122.18, 122.5, 122.71, 122.39, 122.69, 123.17], '1W': [119.46, 120.14, 121.88, 119.22, 123.17], '1M': [110.42, 108.2, 110.47, 108.24, 112.49, 113.23, 108.09, 108.85, 107.98, 107.68, 114.17, 111.62, 116.86, 114.21, 114.18, 121.63, 119.46, 120.14, 121.88, 119.22, 123.17], 'YTD': [160.97, 168.28, 157.99, 137.89, 132.2, 118.4, 113.54, 116.93, 121.87, 129.36, 123.75, 118.42, 118.52, 112.38, 126.94, 124.23, 127.67, 110.41, 100.28, 103, 124.12, 110.78, 113.23, 114.17, 121.63, 123.17], '6M': [164.48, 155.81, 136.31, 132.2, 118.4, 113.54, 116.93, 119.38, 133.5, 126.58, 121.1, 111.77, 117.06, 117.64, 131.13, 122.05, 107.63, 99.84, 101.01, 104.9, 117.01, 110.42, 113.23, 114.17, 121.63, 123.17], '1Y': [115.16, 126.75, 122.08, 122.21, 151.07, 144.27, 137.29, 139.89, 145.15, 145.03, 152.11, 143.45, 151.3, 163.87, 156.57, 167.03, 179.01, 162.92, 156.59, 146, 159.34, 162.31, 164.75, 166.8, 170.83, 166.21, 164.48, 155.81, 136.31, 132.2, 118.4, 113.54, 116.93, 121.87, 129.36, 127.8, 121.1, 111.77, 117.06, 117.64, 131.13, 122.05, 107.63, 99.84, 101.01, 106.6, 117.01, 110.42, 113.23, 114.17, 121.63, 123.17] },
      velocityScore: { '1D': 0, '1W': null, '1M': -23.9, '6M': null }, isNew: false,
      marketCap: '$160B', pe: 119.6, revenueGrowth: 34, eps: 1.03, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.59, GTEK: false, ARKK: 4.4, MARS: false, FRWD: 2.12, BCTK: 2.78, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASML', name: 'ASML Holding', easyScore: 4, avgWeight: 2.79, proScore: 0.66, coverage: 0.235,
      price: 1804.25, weeklyPrices: [1769.32, 1825.07, 1747.28, 1768.65, 1804.25], weeklyChange: 1.97, dayChange: 2.01, sortRank: 0, periodReturns: { '1M': 1.5, 'YTD': 68.6, '6M': 41.6, '1Y': 124.9 },
      priceHistory: { '1D': [1768.65, 1842.53, 1843.5, 1831.17, 1830.92, 1824.47, 1836.18, 1830.4, 1837.37, 1834.72, 1830.68, 1824.44, 1826.41, 1827.31, 1830.75, 1830.93, 1825.82, 1826.15, 1818.01, 1820.72, 1808.31, 1808.83, 1808.32, 1804.25], '1W': [1769.32, 1825.07, 1747.28, 1768.65, 1804.25], '1M': [1777.77, 1734.19, 1899.48, 1863.55, 1892.66, 1803.89, 1867.83, 1929.68, 1929.25, 1778.46, 1762.77, 1841.18, 1794.62, 1883.11, 1989.44, 1843.04, 1769.32, 1825.07, 1747.28, 1768.65, 1804.25], 'YTD': [1069.86, 1194.32, 1331.6, 1389.04, 1441.39, 1429.49, 1419.78, 1497.8, 1360.94, 1383.4, 1355.17, 1393.89, 1359.76, 1448.64, 1410.83, 1417.8, 1427.02, 1592.02, 1501.81, 1632.9, 1628.57, 1749.04, 1803.89, 1762.77, 1843.04, 1804.25], '6M': [1273.88, 1358.57, 1413.35, 1441.39, 1429.49, 1419.78, 1497.8, 1423.54, 1357.42, 1375.56, 1369.62, 1253.96, 1306.45, 1518.3, 1458.97, 1384.56, 1442.92, 1520.94, 1459.44, 1632.03, 1705.37, 1777.77, 1803.89, 1762.77, 1843.04, 1804.25], '1Y': [802.09, 744.91, 725.08, 694.71, 713.12, 755.21, 749.49, 770, 753.43, 804.16, 927.8, 949.55, 1030.17, 980.54, 1019.59, 1036.41, 1070.84, 1043.75, 1037.33, 1039.33, 1040.97, 1110.08, 1122.84, 1036.31, 1072.75, 1228.19, 1273.88, 1358.57, 1413.35, 1441.39, 1429.49, 1419.78, 1497.8, 1360.94, 1383.4, 1389.16, 1369.62, 1253.96, 1306.45, 1518.3, 1458.97, 1384.56, 1442.92, 1520.94, 1459.44, 1597.87, 1705.37, 1777.77, 1803.89, 1762.77, 1843.04, 1804.25] },
      velocityScore: { '1D': 0, '1W': null, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$695B', pe: 61.1, revenueGrowth: 13, eps: 29.54, grossMargin: 53, dividendYield: 0.5,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 4.83, BCTK: 2.19, FWD: 1.57, CBSE: 2.56, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'ASML Holding appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 3, avgWeight: 4.9, proScore: 2.94, coverage: 0.6,
      price: 668.17, weeklyPrices: [668.31, 674.04, 656.79, 666.33, 668.17], weeklyChange: -0.02, dayChange: 0.28, sortRank: 0, periodReturns: { '1M': -3.4, 'YTD': 58.3, '6M': 58.1, '1Y': 75.8 },
      priceHistory: { '1D': [666.33, 680.1, 679.24, 675.46, 675.66, 676, 678.26, 678.54, 679, 676.7, 676.18, 674.81, 675.91, 673.92, 672.64, 674.86, 674.07, 673.11, 671.9, 672.2, 669.31, 668.46, 666.3, 668.17], '1W': [668.31, 674.04, 656.79, 666.33, 668.17], '1M': [691.95, 650.92, 683.29, 707.74, 724.35, 719.29, 714.85, 702.25, 740.14, 702.29, 701.88, 718.59, 687.87, 714.45, 720.04, 691.4, 668.31, 674.04, 656.79, 666.33, 668.17], 'YTD': [422.06, 413.17, 447.64, 468.76, 477.77, 514.56, 525.13, 568.21, 566, 564.05, 572, 573.5, 560.12, 582.06, 587.42, 633.44, 742.21, 745, 769.99, 723.44, 687.48, 693.81, 719.29, 701.88, 691.4, 668.17], '6M': [422.57, 466.75, 470.77, 477.77, 514.56, 525.13, 568.21, 572.66, 568.04, 574.02, 567.45, 533.78, 555.57, 594.4, 605.89, 630.94, 771.61, 765.81, 714.13, 742.18, 706.06, 691.95, 719.29, 701.88, 691.4, 668.17], '1Y': [380.09, 397.9, 407.22, 406.13, 387.35, 377.51, 375.87, 381.56, 376.09, 389.64, 390.65, 400.41, 420.86, 429.92, 437.52, 427.36, 448.69, 453.45, 449.42, 445.47, 460.43, 464.84, 466.91, 421.31, 432.67, 435.82, 422.57, 466.75, 470.77, 477.77, 514.56, 525.13, 568.21, 566, 564.05, 571.64, 567.45, 533.78, 555.57, 594.4, 605.89, 630.94, 771.61, 765.81, 714.13, 733.62, 706.06, 691.95, 719.29, 701.88, 691.4, 668.17] },
      velocityScore: { '1D': 2.1, '1W': 1.7, '1M': 13.5, '6M': null }, isNew: false,
      marketCap: '$100B', pe: 92, revenueGrowth: 26, eps: 7.26, grossMargin: 15, dividendYield: 0.07,
      etfPresence: { POW: 5.11, VOLT: 5.31, PBD: false, PBW: false, IVEP: 4.27 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 3, avgWeight: 4.59, proScore: 2.76, coverage: 0.6,
      price: 405.83, weeklyPrices: [398.52, 413.42, 395.68, 399.56, 405.83], weeklyChange: 1.83, dayChange: 1.57, sortRank: 0, periodReturns: { '1M': 1, 'YTD': 27.4, '6M': 25.1, '1Y': 13.5 },
      priceHistory: { '1D': [399.56, 408.92, 407.98, 405.78, 407.36, 407.24, 408.14, 407.43, 409.74, 408.48, 408.5, 408.06, 408.98, 408.42, 408.77, 408.54, 410.42, 410.63, 411.3, 411.85, 408.35, 407.15, 405.36, 405.83], '1W': [398.52, 413.42, 395.68, 399.56, 405.83], '1M': [401.72, 375.46, 393.64, 391.39, 407.06, 407.71, 409.64, 421.77, 435.78, 405.28, 404.59, 419.87, 402.68, 408.26, 426.12, 412.31, 398.52, 413.42, 395.68, 399.56, 405.83], 'YTD': [318.51, 320.58, 333.46, 331.22, 359.44, 377.06, 391.49, 374.56, 355.56, 361.06, 360.54, 375, 365.56, 400.44, 392.73, 424.5, 425.55, 401.51, 399.44, 391.35, 400.08, 403.14, 407.71, 404.59, 412.31, 405.83], '6M': [324.51, 343.75, 332.28, 359.44, 377.06, 391.49, 374.56, 377.4, 353.87, 361.04, 359.74, 343.53, 368.85, 401.9, 409.7, 413.07, 410.86, 401.53, 371.88, 403.13, 417.62, 401.72, 407.71, 404.59, 412.31, 405.83], '1Y': [357.64, 380.72, 384.9, 384.72, 360.16, 355.1, 346.22, 351.4, 348.22, 360.08, 371.27, 364.74, 376.76, 377.19, 375.59, 372.4, 387.75, 385.44, 369.4, 345.65, 341.69, 338.93, 350.36, 315.95, 322.17, 322.26, 324.51, 343.75, 332.28, 359.44, 377.06, 391.49, 374.56, 355.56, 361.06, 363.95, 359.74, 343.53, 368.85, 401.9, 409.7, 413.07, 410.86, 401.53, 371.88, 406.37, 417.62, 401.72, 407.71, 404.59, 412.31, 405.83] },
      velocityScore: { '1D': 1.5, '1W': 2.2, '1M': 14.5, '6M': null }, isNew: false,
      marketCap: '$158B', pe: 39.7, revenueGrowth: 17, eps: 10.23, grossMargin: 37, dividendYield: 1.1,
      etfPresence: { POW: 4.26, VOLT: 5.45, PBD: false, PBW: false, IVEP: 4.07 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 3, avgWeight: 4.18, proScore: 2.51, coverage: 0.6,
      price: 1075.26, weeklyPrices: [1113.11, 1152.04, 1077.08, 1070.99, 1075.26], weeklyChange: -3.4, dayChange: 0.4, sortRank: 0, periodReturns: { '1M': 16.9, 'YTD': 64.5, '6M': 72.7, '1Y': 99.4 },
      priceHistory: { '1D': [1070.99, 1098.38, 1082.51, 1077.31, 1076.76, 1074.96, 1077, 1079.06, 1081.04, 1076.23, 1080.2, 1081, 1082.46, 1080.86, 1083.67, 1082.11, 1081.09, 1084.27, 1085.51, 1086.51, 1078.82, 1076.94, 1070.82, 1075.26], '1W': [1113.11, 1152.04, 1077.08, 1070.99, 1075.26], '1M': [920.15, 867.09, 906.79, 940.66, 979.07, 982.35, 1048.86, 1109.73, 1127.59, 1034.98, 1057.65, 1085.47, 1045.17, 1102.51, 1174.86, 1134.35, 1113.11, 1152.04, 1077.08, 1070.99, 1075.26], 'YTD': [653.57, 628.4, 642.23, 657.78, 754.97, 801.54, 819.15, 879.73, 842, 839.2, 858.47, 923.69, 894.78, 968.02, 978.32, 1149.53, 1062.95, 1040.15, 1049.23, 1038.74, 950.54, 933.85, 982.35, 1057.65, 1134.35, 1075.26], '6M': [622.5, 681.55, 665.99, 754.97, 801.54, 819.15, 879.73, 881.18, 830.1, 827.37, 882.64, 817.35, 910.75, 987.5, 991.3, 1088.93, 1095.21, 1071.98, 1011.8, 1070.47, 969.67, 920.15, 982.35, 1057.65, 1134.35, 1075.26], '1Y': [539.36, 570.17, 623.97, 660.29, 645.86, 625.27, 604.59, 622.39, 598.81, 634.15, 611, 607.52, 606.23, 634.27, 602, 595.15, 577.97, 559.7, 575.4, 595.37, 589.72, 629.11, 704.2, 639.43, 663.46, 680.86, 622.5, 681.55, 665.99, 754.97, 801.54, 819.15, 879.73, 842, 839.2, 844.05, 882.64, 817.35, 910.75, 987.5, 991.3, 1088.93, 1095.21, 1071.98, 1011.8, 1031.89, 969.67, 920.15, 982.35, 1057.65, 1134.35, 1075.26] },
      velocityScore: { '1D': 0, '1W': -0.8, '1M': 38.7, '6M': null }, isNew: false,
      marketCap: '$289B', pe: 31.4, revenueGrowth: 16, eps: 34.27, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { POW: 3.56, VOLT: 4.53, PBD: false, PBW: false, IVEP: 4.44 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 3, avgWeight: 3.75, proScore: 2.25, coverage: 0.6,
      price: 87.1, weeklyPrices: [88.34, 87.44, 88.47, 87.44, 87.10], weeklyChange: -1.4, dayChange: -0.39, sortRank: 0, periodReturns: { '1M': 2.7, 'YTD': 8.5, '6M': 9, '1Y': 16.7 },
      priceHistory: { '1D': [87.44, 87.24, 87.03, 87.49, 87.51, 87.75, 87.7, 87.57, 87.49, 87.36, 87.35, 87.5, 87.58, 87.42, 87.21, 87.33, 87.18, 87.04, 86.97, 87.03, 87.04, 87.14, 87.03, 87.1], '1W': [88.34, 87.44, 88.47, 87.44, 87.1], '1M': [84.83, 85.12, 84.84, 85.99, 86.12, 86.23, 85.73, 86.75, 86.08, 86.43, 87.62, 87.7, 88.56, 88.66, 87.77, 86.37, 88.34, 87.44, 88.47, 87.44, 87.1], 'YTD': [80.28, 79.49, 82.19, 84.81, 86.33, 89.48, 92.71, 95.68, 92.59, 91.54, 90.96, 91.16, 92.85, 94.48, 91.83, 96.25, 96.95, 93.1, 93.36, 88.55, 83.66, 84.01, 86.23, 87.62, 86.37, 87.1], '6M': [79.89, 83.63, 85.47, 86.33, 89.48, 92.71, 95.68, 92.71, 92.01, 92.82, 90.23, 92.05, 93.67, 91.31, 90.6, 96.51, 96.28, 94.59, 90.06, 87.65, 85.68, 84.83, 86.23, 87.62, 86.37, 87.1], '1Y': [74.64, 75.18, 71.97, 71.06, 72.58, 72.24, 76.18, 73.89, 70.87, 71.32, 70.79, 74.65, 78.18, 83.71, 85.05, 83.25, 81.76, 82.14, 85.89, 84.27, 85.54, 83.39, 81.21, 80.85, 80.41, 81.32, 79.89, 83.63, 85.47, 86.33, 89.48, 92.71, 95.68, 92.59, 91.54, 92.53, 90.23, 92.05, 93.67, 91.31, 90.6, 96.51, 96.28, 94.59, 90.06, 87.65, 85.68, 84.83, 86.23, 87.62, 86.37, 87.1] },
      velocityScore: { '1D': -0.9, '1W': 6.1, '1M': 50, '6M': null }, isNew: false,
      marketCap: '$182B', pe: 22.1, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.85,
      etfPresence: { POW: 2.21, VOLT: 5.24, PBD: false, PBW: false, IVEP: 3.81 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy Corp', easyScore: 3, avgWeight: 3.39, proScore: 2.04, coverage: 0.6,
      price: 257.02, weeklyPrices: [270.89, 295.05, 269.57, 254.29, 257.02], weeklyChange: -5.12, dayChange: 1.07, sortRank: 0, periodReturns: { '1M': -1, 'YTD': 195.8, '6M': 91.7, '1Y': 894.3 },
      priceHistory: { '1D': [254.29, 270, 265.28, 259.87, 262.18, 260.2, 263.85, 262.4, 265, 264.83, 262.91, 263.49, 264.15, 262.5, 264.36, 266.05, 265.14, 264.02, 260.17, 260.45, 259.4, 258, 255.3, 257.02], '1W': [270.89, 295.05, 269.57, 254.29, 257.02], '1M': [259.61, 234.23, 248.88, 260.22, 274.5, 280.88, 284.99, 328.91, 345.85, 321.98, 326.19, 309.18, 252.02, 275.01, 302.7, 289.5, 270.89, 295.05, 269.57, 254.29, 257.02], 'YTD': [86.89, 121.84, 139.17, 144.89, 156.13, 155.17, 145.32, 166.2, 153.02, 154, 156.58, 150.22, 132.45, 160.13, 210.06, 237.57, 290.52, 261.03, 275.95, 302.49, 273.51, 253.57, 280.88, 326.19, 289.5, 257.02], '6M': [134.07, 149.5, 139.62, 156.13, 155.17, 145.32, 166.2, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 261.34, 302.4, 302.85, 259.61, 280.88, 326.19, 289.5, 257.02], '1Y': [25.85, 24.31, 33.06, 37.39, 36.8, 45.11, 44.51, 50.85, 54.91, 67.29, 80.97, 68.69, 88, 86.65, 115.09, 101.42, 133.71, 141.41, 126.72, 108.93, 101.14, 118.09, 108.99, 80.21, 90.18, 103.87, 134.07, 149.5, 139.62, 156.13, 155.17, 145.32, 166.2, 153.02, 154, 160.05, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 261.34, 293.8, 302.85, 259.61, 280.88, 326.19, 289.5, 257.02] },
      velocityScore: { '1D': -5.6, '1W': -8.5, '1M': 34.2, '6M': null }, isNew: false,
      marketCap: '$73B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: 1.58, VOLT: 3.76, PBD: false, PBW: false, IVEP: 4.84 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 3, avgWeight: 3.31, proScore: 1.98, coverage: 0.6,
      price: 158.05, weeklyPrices: [152.15, 156.89, 153.18, 154.76, 158.05], weeklyChange: 3.88, dayChange: 2.13, sortRank: 0, periodReturns: { '1M': -3.5, 'YTD': 55, '6M': 50, '1Y': 111.7 },
      priceHistory: { '1D': [154.76, 160.5, 160.54, 159.18, 160.02, 160.03, 160.98, 160.81, 161.18, 160.51, 160.69, 160.55, 160.62, 160.87, 160.94, 160.2, 160.28, 160.03, 159.79, 160.47, 159.46, 159.14, 157.79, 158.05], '1W': [152.15, 156.89, 153.18, 154.76, 158.05], '1M': [163.8, 156.79, 164.52, 165.84, 169, 167.34, 170.94, 177.02, 184.34, 168.37, 167.55, 171.91, 162.92, 163.35, 169.61, 159.99, 152.15, 156.89, 153.18, 154.76, 158.05], 'YTD': [101.97, 102.72, 107.98, 110.29, 115.79, 114.62, 115.22, 118.22, 111.65, 109.13, 120.27, 127.01, 121.26, 128.63, 129.7, 142.76, 158.92, 169.95, 169.01, 164.66, 171.55, 163.81, 167.34, 167.55, 159.99, 158.05], '6M': [105.38, 112.5, 110.58, 115.79, 114.62, 115.22, 118.22, 120.27, 108.13, 114.3, 121, 112.75, 118.92, 134.48, 137, 138.3, 169.41, 170.74, 158.23, 169.29, 173.39, 163.8, 167.34, 167.55, 159.99, 158.05], '1Y': [74.67, 77.23, 77.09, 78.42, 89.1, 89.8, 88.04, 91.11, 91.93, 95.71, 98.65, 96.6, 99.43, 97.73, 100.54, 100.62, 106.28, 112.5, 111.46, 105.74, 106.53, 108.27, 109.15, 98.28, 104.18, 106.61, 105.38, 112.5, 110.58, 115.79, 114.62, 115.22, 118.22, 111.65, 109.13, 114.71, 121, 112.75, 118.92, 134.48, 137, 138.3, 169.41, 170.74, 158.23, 167.8, 173.39, 163.8, 167.34, 167.55, 159.99, 158.05] },
      velocityScore: { '1D': 1, '1W': 2.1, '1M': 11.9, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 53.8, revenueGrowth: 54, eps: 2.94, grossMargin: 37, dividendYield: 0.54,
      etfPresence: { POW: 3.82, VOLT: 2.98, PBD: false, PBW: false, IVEP: 3.12 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 3, avgWeight: 3.09, proScore: 1.86, coverage: 0.6,
      price: 485.41, weeklyPrices: [487.10, 495.60, 478.89, 480.50, 485.41], weeklyChange: -0.35, dayChange: 1.02, sortRank: 0, periodReturns: { '1M': -0.2, 'YTD': 9.3, '6M': 3.2, '1Y': 15 },
      priceHistory: { '1D': [480.5, 484.96, 487.54, 486.91, 487.85, 488.54, 490.17, 490.2, 490.76, 490.87, 491.27, 490.55, 490.61, 490.11, 490.25, 490.35, 490.69, 491.34, 490.22, 488.43, 488.3, 488.21, 486.62, 485.41], '1W': [487.1, 495.6, 478.89, 480.5, 485.41], '1M': [486.47, 467.59, 469.32, 476.89, 489.73, 502.65, 508.87, 523.69, 539.39, 509.96, 518.18, 536.04, 517.02, 514.71, 523.2, 490.12, 487.1, 495.6, 478.89, 480.5, 485.41], 'YTD': [444.11, 460.87, 484.11, 485.53, 495.59, 506.14, 524.25, 526.75, 488.49, 478.06, 477.47, 503.2, 500.38, 534.67, 521.71, 557.85, 508.43, 492.58, 479.97, 475.01, 462.93, 485.03, 502.65, 518.18, 490.12, 485.41], '6M': [470.53, 489.31, 486.82, 495.59, 506.14, 524.25, 526.75, 516.98, 487.76, 472.64, 489.07, 472.07, 499.31, 545.62, 549.11, 544.71, 507.81, 485.98, 461.5, 478.05, 480.46, 486.47, 502.65, 518.18, 490.12, 485.41], '1Y': [422.26, 437.23, 437.5, 437.48, 417.84, 437.67, 429.96, 446.06, 437.16, 450.93, 440.1, 420.44, 423.42, 418.89, 428.82, 433.27, 472.57, 468.06, 453, 419.09, 428.47, 437.71, 462.82, 434.85, 454.94, 465.48, 470.53, 489.31, 486.82, 495.59, 506.14, 524.25, 526.75, 488.49, 478.06, 471.22, 489.07, 472.07, 499.31, 545.62, 549.11, 544.71, 507.81, 485.98, 461.5, 484.25, 480.46, 486.47, 502.65, 518.18, 490.12, 485.41] },
      velocityScore: { '1D': 5.7, '1W': 8.1, '1M': 17, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 28.7, revenueGrowth: 11, eps: 16.91, grossMargin: 36, dividendYield: 1.18,
      etfPresence: { POW: 2.94, VOLT: 3.8, PBD: false, PBW: false, IVEP: 2.54 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'NRG', name: 'NRG Energy Inc', easyScore: 3, avgWeight: 1.35, proScore: 0.81, coverage: 0.6,
      price: 140.48, weeklyPrices: [136.70, 141.01, 138.01, 137.48, 140.48], weeklyChange: 2.77, dayChange: 2.18, sortRank: 0, periodReturns: { '1M': 8.1, 'YTD': -11.8, '6M': -5.9, '1Y': -7.2 },
      priceHistory: { '1D': [137.48, 140.98, 142.81, 141.9, 142.01, 141.44, 141.77, 141.74, 141.91, 142.12, 142.63, 143.13, 143.11, 142.79, 142.29, 142.54, 142.14, 142, 141.34, 141.83, 141.26, 141.29, 140.48, 140.48], '1W': [136.7, 141.01, 138.01, 137.48, 140.48], '1M': [129.96, 120.65, 123.7, 125.47, 130.4, 132.1, 132.13, 135.06, 138.91, 137.66, 142.21, 147.11, 149.36, 149.11, 146.06, 140.8, 136.7, 141.01, 138.01, 137.48, 140.48], 'YTD': [159.24, 143.53, 158.5, 149.3, 149.11, 155.72, 173.45, 184.03, 162.06, 155.15, 159.11, 151.04, 149.9, 161.78, 168.5, 154.53, 153.37, 138.11, 127.81, 137.65, 129.47, 127.71, 132.1, 142.21, 140.8, 140.48], '6M': [149.27, 152.05, 149.93, 149.11, 155.72, 173.45, 184.03, 175.58, 155.42, 152.48, 151.77, 141.23, 153.06, 170.96, 149.86, 154.81, 157.43, 137.34, 123.71, 140.43, 133.51, 129.96, 132.1, 142.21, 140.8, 140.48], '1Y': [151.36, 147.38, 157.97, 167.2, 153.22, 153.78, 148.19, 148.12, 147.95, 157.92, 164.19, 162.96, 167.3, 168.25, 169.93, 163.81, 178.5, 173.19, 168.84, 168.8, 168.54, 169.36, 170.64, 154.64, 160.88, 161.59, 149.27, 152.05, 149.93, 149.11, 155.72, 173.45, 184.03, 162.06, 155.15, 154.75, 151.77, 141.23, 153.06, 170.96, 149.86, 154.81, 157.43, 137.34, 123.71, 138, 133.51, 129.96, 132.1, 142.21, 140.8, 140.48] },
      velocityScore: { '1D': 0, '1W': 1.2, '1M': 118.9, '6M': null }, isNew: false,
      marketCap: '$30B', pe: 154.4, revenueGrowth: 20, eps: 0.91, grossMargin: 16, dividendYield: 1.38,
      etfPresence: { POW: 0.54, VOLT: 1.03, PBD: false, PBW: false, IVEP: 2.47 },
      tonyNote: 'NRG Energy Inc appears in 3 of 5 Electrification ETFs (60% coverage) with average weight 1.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, avgWeight: 5.25, proScore: 2.1, coverage: 0.4,
      price: 267.69, weeklyPrices: [266.94, 277.45, 251.53, 258.67, 267.69], weeklyChange: 0.28, dayChange: 3.49, sortRank: 0, periodReturns: { '1M': -3, 'YTD': 57.8, '6M': 42.8, '1Y': 161.7 },
      priceHistory: { '1D': [258.67, 273.9, 272.66, 271.7, 272.85, 270.65, 270.52, 272.11, 270.93, 272.54, 272.95, 272.22, 272.62, 270.51, 272, 271.44, 271.65, 272.92, 272.78, 271.71, 271.46, 269.78, 267.13, 267.69], '1W': [266.94, 277.45, 251.53, 258.67, 267.69], '1M': [276.04, 276.95, 296.55, 293.87, 302.15, 293.22, 299.84, 296.39, 304.33, 288.64, 294.15, 310.32, 310.64, 315.65, 333.04, 318.06, 266.94, 277.45, 251.53, 258.67, 267.69], 'YTD': [169.63, 180.24, 196.61, 196.5, 215.59, 229.32, 235.3, 234.4, 213.65, 198.5, 205.74, 220.77, 203.04, 235, 241.49, 268.31, 283.6, 297.98, 256.72, 270.01, 269.86, 279.13, 293.22, 294.15, 318.06, 267.69], '6M': [187.43, 200.11, 205.17, 215.59, 229.32, 235.3, 234.4, 222.45, 191.81, 205.11, 214.98, 197.83, 210.32, 237.34, 257.41, 249.82, 297.17, 298.22, 249.71, 276.25, 269.22, 276.04, 293.22, 294.15, 318.06, 267.69], '1Y': [102.3, 101.32, 102.98, 130.04, 132.61, 132.13, 128.41, 140.42, 143.06, 148.32, 150.97, 142.72, 142.44, 142.94, 148.88, 154.9, 152.46, 154.86, 153.75, 144.89, 152.69, 163.19, 175.36, 166.55, 176.45, 175.77, 187.43, 200.11, 205.17, 215.59, 229.32, 235.3, 234.4, 213.65, 198.5, 209.52, 214.98, 197.83, 210.32, 237.34, 257.41, 249.82, 297.17, 298.22, 249.71, 280.13, 269.22, 276.04, 293.22, 294.15, 318.06, 267.69] },
      velocityScore: { '1D': 2.9, '1W': -23.6, '1M': -23.6, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 64.7, revenueGrowth: 17, eps: 4.14, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: 3.42, VOLT: 7.08, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 2, avgWeight: 5.18, proScore: 2.07, coverage: 0.4,
      price: 236.58, weeklyPrices: [246.33, 248.05, 234.05, 231.85, 236.58], weeklyChange: -3.96, dayChange: 2.04, sortRank: 0, periodReturns: { '1M': -16.6, 'YTD': 122.6, '6M': 94.2, '1Y': 233.4 },
      priceHistory: { '1D': [231.85, 240.88, 242.99, 238.85, 240.23, 240.18, 240.79, 240.18, 240.15, 239.4, 238.95, 239.18, 239.74, 238.84, 238.82, 238.81, 238, 238.82, 238.68, 239.35, 237.79, 237.54, 236.76, 236.58], '1W': [246.33, 248.05, 234.05, 231.85, 236.58], '1M': [283.51, 262.34, 290.5, 294.75, 303.53, 292.7, 294.03, 297.2, 307.8, 291.5, 294.49, 309.2, 279.77, 281.09, 286.36, 264.86, 246.33, 248.05, 234.05, 231.85, 236.58], 'YTD': [106.26, 119.94, 135.18, 139.32, 146.79, 187.3, 187.21, 186.39, 170.37, 176.51, 167.41, 194.85, 184.68, 230.81, 232.81, 252.18, 275.33, 309.39, 292.65, 279.22, 288.12, 293.6, 292.7, 294.49, 264.86, 236.58], '6M': [121.83, 139.99, 141.15, 146.79, 187.3, 187.21, 186.39, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 261.58, 291.97, 299.07, 283.51, 292.7, 294.49, 264.86, 236.58], '1Y': [70.96, 78.84, 80.05, 79.03, 77.8, 85.17, 82.17, 91.46, 90.24, 97.47, 101.43, 94.58, 102.51, 103.18, 112.77, 113.88, 136.12, 131.92, 118.74, 95.1, 107.26, 112.31, 120.91, 109.59, 113.62, 120.46, 121.83, 139.99, 141.15, 146.79, 187.3, 187.21, 186.39, 170.37, 176.51, 174.04, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 261.58, 295.94, 299.07, 283.51, 292.7, 294.49, 264.86, 236.58] },
      velocityScore: { '1D': -0.5, '1W': -6.8, '1M': -50.6, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 46.2, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.15,
      etfPresence: { POW: 4.23, VOLT: 6.12, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 3.74, proScore: 1.49, coverage: 0.4,
      price: 133.85, weeklyPrices: [138.51, 135.98, 137.53, 135.90, 133.85], weeklyChange: -3.36, dayChange: -1.51, sortRank: 0, periodReturns: { '1M': 4.8, 'YTD': 16.1, '6M': 14.5, '1Y': 26.2 },
      priceHistory: { '1D': [135.9, 135.26, 135.24, 135.61, 135.35, 135.3, 135.24, 135.14, 135.01, 134.74, 134.73, 134.82, 134.6, 134.57, 134.37, 134.67, 134.51, 134.28, 133.85, 134.04, 134.03, 134.16, 133.72, 133.85], '1W': [138.51, 135.98, 137.53, 135.9, 133.85], '1M': [127.76, 128.53, 128.48, 129.23, 129.31, 129.75, 128.27, 127.69, 130.3, 133.74, 134.96, 137, 138.69, 137.97, 136.81, 135.05, 138.51, 135.98, 137.53, 135.9, 133.85], 'YTD': [115.31, 115.93, 119.4, 116.63, 118.33, 121.1, 130.24, 132.39, 131.92, 132.31, 130.97, 128.3, 131.67, 137.15, 134.56, 135.08, 136.91, 130.16, 125.15, 131.59, 123.79, 126.77, 129.75, 134.96, 135.05, 133.85], '6M': [116.91, 119.96, 118.02, 118.33, 121.1, 130.24, 132.39, 133.29, 131.86, 134.15, 127.92, 131.12, 132.92, 135.46, 131.89, 135.59, 137.04, 131.94, 128.92, 130.9, 127.11, 127.76, 129.75, 134.96, 135.05, 133.85], '1Y': [106.04, 105.93, 108.97, 113.14, 113.73, 112.86, 113.55, 112.89, 108.64, 108.74, 106.44, 107.86, 113.46, 116.91, 117.53, 116.18, 122.11, 119.76, 122.68, 121.71, 122.72, 118.04, 114.26, 115.58, 115.67, 114.07, 116.91, 119.96, 118.02, 118.33, 121.1, 130.24, 132.39, 131.92, 132.31, 133.62, 127.92, 131.12, 132.92, 135.46, 131.89, 135.59, 137.04, 131.94, 128.92, 129.57, 127.11, 127.76, 129.75, 134.96, 135.05, 133.85] },
      velocityScore: { '1D': -1.3, '1W': 6.4, '1M': 5.7, '6M': null }, isNew: false,
      marketCap: '$73B', pe: 19.8, revenueGrowth: 10, eps: 6.75, grossMargin: 47, dividendYield: 2.8,
      etfPresence: { POW: 2.89, VOLT: 4.58, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.46, proScore: 1.38, coverage: 0.4,
      price: 323.92, weeklyPrices: [300.53, 318.47, 305.58, 317.81, 323.92], weeklyChange: 7.78, dayChange: 1.92, sortRank: 0, periodReturns: { '1M': 11.9, 'YTD': 99.9, '6M': 98, '1Y': 168.3 },
      priceHistory: { '1D': [317.81, 331.91, 329.87, 326.26, 327.13, 328, 328.74, 328.35, 329.24, 327.85, 326.54, 325.53, 326.21, 326.2, 326.11, 326.33, 326.57, 326.97, 326.63, 328.33, 325.6, 325.01, 324.24, 323.92], '1W': [300.53, 318.47, 305.58, 317.81, 323.92], '1M': [289.52, 280.98, 297.88, 302.87, 311.93, 299.6, 317.58, 333.05, 357.96, 318.32, 316.43, 325.57, 303.95, 306.97, 334.82, 311.42, 300.53, 318.47, 305.58, 317.81, 323.92], 'YTD': [162.01, 160.78, 172.54, 182.49, 190.01, 202, 243.53, 253.15, 244.44, 270.06, 264.71, 276.16, 259.37, 287.64, 294.13, 321.75, 328.31, 339.97, 370.94, 327.46, 323.39, 300.57, 299.6, 316.43, 311.42, 323.92], '6M': [163.58, 176.93, 181.23, 190.01, 202, 243.53, 253.15, 257.75, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 322.63, 323.91, 334.49, 289.52, 299.6, 316.43, 311.42, 323.92], '1Y': [120.72, 131.12, 130.87, 145.6, 139.39, 132.52, 127.54, 129.31, 125.7, 135.71, 141.96, 139.77, 161.64, 168.88, 177.82, 183.2, 199.27, 190.71, 173.37, 170.65, 172.02, 182.54, 178.66, 154.39, 167.58, 173.95, 163.58, 176.93, 181.23, 190.01, 202, 243.53, 253.15, 244.44, 270.06, 268.41, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 322.63, 319.78, 334.49, 289.52, 299.6, 316.43, 311.42, 323.92] },
      velocityScore: { '1D': 3.8, '1W': 5.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$124B', pe: 81.6, revenueGrowth: 30, eps: 3.97, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 2.6, PBD: false, PBW: false, IVEP: 4.31 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.78, proScore: 1.11, coverage: 0.4,
      price: 162.24, weeklyPrices: [164.59, 166.81, 158.61, 158.22, 162.24], weeklyChange: -1.43, dayChange: 2.54, sortRank: 0, periodReturns: { '1M': 5.3, 'YTD': 20.1, '6M': 15.8, '1Y': 65 },
      priceHistory: { '1D': [158.22, 163.73, 163.71, 163.57, 164.62, 164.02, 163.85, 163.26, 163.22, 163.56, 163.6, 163.49, 163.55, 163.38, 163.63, 163.62, 163.84, 163.9, 163.8, 163.76, 162.95, 162.6, 162.07, 162.24], '1W': [164.59, 166.81, 158.61, 158.22, 162.24], '1M': [154.07, 149.22, 152.46, 153.8, 158.59, 158.81, 161.11, 163.96, 165.96, 158.7, 162.78, 165.15, 163.72, 166.42, 176.32, 172.22, 164.59, 166.81, 158.61, 158.22, 162.24], 'YTD': [135.14, 136.25, 154.22, 150.99, 144.93, 144.2, 148.57, 151.5, 129.58, 136.74, 127.81, 128.73, 127.7, 137.68, 148.96, 150.18, 142.3, 128.03, 125, 132.06, 146.34, 143.6, 158.81, 162.78, 172.22, 162.24], '6M': [140.16, 154.39, 155.56, 144.93, 144.2, 148.57, 151.5, 135.16, 136.06, 136.8, 130.67, 119.15, 128.38, 148.72, 151.93, 143.72, 136.69, 127.87, 119.2, 139.56, 148.4, 154.07, 158.81, 162.78, 172.22, 162.24], '1Y': [98.31, 101.96, 104.46, 106.51, 108.55, 110.74, 108.65, 110.13, 112.75, 119.47, 122.07, 122.33, 123.58, 126.25, 127.36, 135.31, 139.75, 138.87, 141.92, 136.66, 138.72, 139.46, 139.09, 129.61, 137.43, 139.88, 140.16, 154.39, 155.56, 144.93, 144.2, 148.57, 151.5, 129.58, 136.74, 135.12, 130.67, 119.15, 128.38, 148.72, 151.93, 143.72, 136.69, 127.87, 119.2, 140.24, 148.4, 154.07, 158.81, 162.78, 172.22, 162.24] },
      velocityScore: { '1D': 0, '1W': -2.6, '1M': -11.2, '6M': null }, isNew: false,
      marketCap: '$200B', pe: 46.6, revenueGrowth: 58, eps: 3.48, grossMargin: 38, dividendYield: 0.63,
      etfPresence: { POW: 1.06, VOLT: 4.5, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 2.76, proScore: 1.1, coverage: 0.4,
      price: 75.45, weeklyPrices: [73.14, 72.82, 75.08, 75.27, 75.45], weeklyChange: 3.16, dayChange: 0.24, sortRank: 0, periodReturns: { '1M': 5.4, 'YTD': 25.5, '6M': 25.1, '1Y': 30.6 },
      priceHistory: { '1D': [75.27, 75.63, 76.13, 76.23, 76.21, 76.31, 76.3, 76.07, 75.9, 75.81, 75.74, 75.96, 75.79, 75.72, 75.68, 75.73, 75.8, 75.89, 75.86, 75.62, 75.39, 75.43, 75.56, 75.45], '1W': [73.14, 72.82, 75.08, 75.27, 75.45], '1M': [71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 71.25, 73.12, 74.95, 75.79, 75.87, 77.53, 77.92, 75.06, 74.34, 72.77, 73.14, 72.82, 75.08, 75.27, 75.45], 'YTD': [60.11, 61.15, 60.29, 64.96, 66.34, 67.85, 71.96, 73.5, 75.88, 73.84, 72.8, 73.81, 71.83, 72.82, 70.86, 71.65, 75.54, 71.96, 77.72, 78.47, 70.04, 71.59, 71.48, 75.87, 72.77, 75.45], '6M': [60.32, 61.55, 64.29, 66.34, 67.85, 71.96, 73.5, 76.26, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 79.4, 76.34, 71.31, 71.59, 71.48, 75.87, 72.77, 75.45], '1Y': [57.78, 58.09, 58.75, 59.95, 57.89, 57.34, 57.22, 57.49, 57.58, 59.33, 60.38, 63.31, 64.06, 63.1, 62.53, 58.93, 56.98, 57.54, 60.43, 58.89, 60.22, 63.66, 60.92, 58.66, 59.52, 61.16, 60.32, 61.55, 64.29, 66.34, 67.85, 71.96, 73.5, 75.88, 73.84, 73.69, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 79.4, 74.37, 71.31, 71.59, 71.48, 75.87, 72.77, 75.45] },
      velocityScore: { '1D': 0, '1W': 5.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$92B', pe: 33.1, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.79,
      etfPresence: { POW: false, VOLT: 1.61, PBD: false, PBW: false, IVEP: 3.9 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.56, proScore: 1.03, coverage: 0.4,
      price: 140.53, weeklyPrices: [140.76, 142.72, 140.62, 140.23, 140.53], weeklyChange: -0.16, dayChange: 0.21, sortRank: 0, periodReturns: { '1M': -4.9, 'YTD': 17.4, '6M': 26.8, '1Y': 32.2 },
      priceHistory: { '1D': [140.23, 141.01, 140.99, 139.53, 139.61, 140, 140.49, 140.32, 140.71, 140.73, 140.4, 140.08, 140.05, 140.15, 140.49, 140.49, 140.32, 140.3, 139.95, 140.53, 140.24, 140.21, 140.15, 140.53], '1W': [140.76, 142.72, 140.62, 140.23, 140.53], '1M': [147.75, 139.36, 144.01, 144.96, 146.06, 145.17, 143.62, 144.82, 148.21, 141.28, 142.81, 145.49, 138.4, 140.47, 146.11, 144.8, 140.76, 142.72, 140.62, 140.23, 140.53], 'YTD': [119.75, 111.29, 112.95, 113.59, 122.98, 139, 142.21, 144.71, 139.58, 133.94, 133.76, 137.48, 134.72, 141.85, 137.55, 141.73, 145.08, 139.52, 143.08, 138.36, 133.91, 144.05, 145.17, 142.81, 144.8, 140.53], '6M': [110.85, 114.61, 115.07, 122.98, 139, 142.21, 144.71, 145.46, 133.09, 131.69, 133.27, 126.58, 133.15, 142.05, 139.72, 141.59, 144.82, 141.04, 135.42, 140.22, 141.99, 147.75, 145.17, 142.81, 144.8, 140.53], '1Y': [106.33, 108.95, 110.02, 105, 104.31, 105.02, 106, 109.27, 107.09, 107.82, 108.48, 105.77, 108.66, 107.76, 109.37, 110.55, 113.34, 120.86, 122.66, 114.42, 116.29, 114.2, 118.06, 117.74, 122.06, 121.53, 110.85, 114.61, 115.07, 122.98, 139, 142.21, 144.71, 139.58, 133.94, 132.56, 133.27, 126.58, 133.15, 142.05, 139.72, 141.59, 144.82, 141.04, 135.42, 138.2, 141.99, 147.75, 145.17, 142.81, 144.8, 140.53] },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$86B', pe: 43, revenueGrowth: 8, eps: 3.27, grossMargin: 37, dividendYield: 1.14,
      etfPresence: { POW: false, VOLT: 1.45, PBD: false, PBW: false, IVEP: 3.68 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.4, proScore: 0.96, coverage: 0.4,
      price: 309.27, weeklyPrices: [311.27, 310.84, 287.73, 293.64, 309.27], weeklyChange: -0.64, dayChange: 5.32, sortRank: 0, periodReturns: { '1M': -0.8, 'YTD': 47.7, '6M': 40.8, '1Y': 115.3 },
      priceHistory: { '1D': [293.64, 312.94, 312.05, 310.53, 314.15, 315.36, 316.54, 314.8, 315.3, 315.77, 315.44, 314.89, 315.57, 315.38, 315.56, 315.8, 314.94, 315.81, 314.69, 314.29, 313.24, 312.26, 311.92, 309.27], '1W': [311.27, 310.84, 287.73, 293.64, 309.27], '1M': [311.64, 308.17, 340.4, 354.37, 370.66, 350.45, 353.32, 372.59, 388.23, 364.96, 359.61, 375.15, 348.11, 348.15, 372.87, 356.35, 311.27, 310.84, 287.73, 293.64, 309.27], 'YTD': [209.37, 210.99, 257.29, 262.19, 261.82, 279.17, 314.12, 335.74, 322.47, 311.39, 319.63, 342.87, 332.82, 374.98, 372.23, 382.47, 389.05, 357.24, 323.46, 324.86, 294.65, 306.11, 350.45, 359.61, 356.35, 309.27], '6M': [219.59, 253.86, 263.03, 261.82, 279.17, 314.12, 335.74, 340.42, 305.02, 308.31, 329.78, 298.29, 339.32, 385.73, 385, 369.08, 345.63, 339.42, 302.84, 339.65, 312.28, 311.64, 350.45, 359.61, 356.35, 309.27], '1Y': [143.62, 142.73, 140.91, 138.92, 146.5, 161.89, 147.74, 153.73, 150.14, 159.52, 169.75, 167.35, 178.08, 179.98, 192.22, 198.42, 208.05, 225.8, 212.79, 198.89, 209.9, 214.65, 224.11, 208.77, 217.86, 227.65, 219.59, 253.86, 263.03, 261.82, 279.17, 314.12, 335.74, 322.47, 311.39, 315.91, 329.78, 298.29, 339.32, 385.73, 385, 369.08, 345.63, 339.42, 302.84, 328.34, 312.28, 311.64, 350.45, 359.61, 356.35, 309.27] },
      velocityScore: { '1D': 2.1, '1W': -12.7, '1M': -22, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 64.3, revenueGrowth: 26, eps: 4.81, grossMargin: 39, dividendYield: 0.14,
      etfPresence: { POW: 0.96, VOLT: 3.83, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'VST', name: 'Vistra Corp', easyScore: 2, avgWeight: 2.39, proScore: 0.96, coverage: 0.4,
      price: 157.98, weeklyPrices: [151.05, 157.22, 155.73, 154.82, 157.98], weeklyChange: 4.59, dayChange: 2.04, sortRank: 0, periodReturns: { '1M': 8, 'YTD': -2.1, '6M': -5, '1Y': -19.3 },
      priceHistory: { '1D': [154.82, 159.43, 160.94, 158.85, 158.22, 158.25, 158.75, 158.41, 158.45, 159.1, 159.2, 159.13, 159.79, 159.48, 159.11, 159, 158.92, 158.66, 158.35, 158.85, 158.5, 158.76, 158.9, 157.98], '1W': [151.05, 157.22, 155.73, 154.82, 157.98], '1M': [146.22, 138.54, 146.38, 148.02, 153.52, 158.61, 158.83, 163.75, 167.26, 162.39, 162.87, 167.77, 163.49, 162.38, 158.63, 153.16, 151.05, 157.22, 155.73, 154.82, 157.98], 'YTD': [161.33, 150.6, 180.18, 160.12, 154.26, 152.97, 173.68, 171.62, 161.7, 164.4, 170.12, 151.51, 153.96, 152.75, 165.53, 156.85, 155.28, 147.72, 139.68, 156.27, 154.76, 146.9, 158.61, 162.87, 153.16, 157.98], '6M': [166.37, 166.6, 158.81, 154.26, 152.97, 173.68, 171.62, 165.99, 163.62, 161.99, 151.29, 147.54, 153.68, 163.97, 154.91, 161.12, 160.38, 146.87, 134.71, 164.56, 157.97, 146.22, 158.61, 162.87, 153.16, 157.98], '1Y': [195.78, 182, 196.24, 208.54, 205.59, 202.35, 192.91, 194.6, 189.73, 204.05, 210.16, 201.62, 202.65, 210, 210.4, 191.37, 199.37, 189.39, 178.27, 179.14, 176.8, 176.07, 174.6, 166.17, 161.67, 162.93, 166.37, 166.6, 158.81, 154.26, 152.97, 173.68, 171.62, 161.7, 164.4, 164.33, 151.29, 147.54, 153.68, 163.97, 154.91, 161.12, 160.38, 146.87, 134.71, 160.15, 157.97, 146.22, 158.61, 162.87, 153.16, 157.98] },
      velocityScore: { '1D': 0, '1W': 5.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$53B', pe: 26.4, revenueGrowth: 43, eps: 5.98, grossMargin: 39, dividendYield: 0.59,
      etfPresence: { POW: 1.49, VOLT: false, PBD: false, PBW: false, IVEP: 3.3 },
      tonyNote: 'Vistra Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CEG', name: 'Constellation Energy Corp', easyScore: 2, avgWeight: 2.27, proScore: 0.91, coverage: 0.4,
      price: 250.74, weeklyPrices: [239.25, 245.87, 239.71, 244.52, 250.74], weeklyChange: 4.8, dayChange: 2.54, sortRank: 0, periodReturns: { '1M': -0.4, 'YTD': -29, '6M': -26.8, '1Y': -20 },
      priceHistory: { '1D': [244.52, 248.57, 248.25, 247.69, 246.74, 247.4, 247.78, 248.34, 247.9, 248.49, 249.15, 250.03, 250.81, 250.48, 249.79, 250.21, 250.21, 250.04, 250.35, 250.99, 250.77, 250.98, 250.97, 250.74], '1W': [239.25, 245.87, 239.71, 244.52, 250.74], '1M': [251.65, 242.3, 246.71, 253.76, 262.35, 268, 267.17, 274.06, 275.53, 270.26, 267.97, 268.69, 264.02, 259.32, 248.37, 236.5, 239.25, 245.87, 239.71, 244.52, 250.74], 'YTD': [353.27, 322.54, 341.2, 289.06, 270.88, 272.15, 303.01, 312.64, 324.87, 317.09, 317.22, 303.32, 279.46, 280.25, 299.14, 292.77, 307.81, 303.63, 267.2, 294.07, 265.7, 250.67, 268, 267.97, 236.5, 250.74], '6M': [342.52, 307.71, 285.27, 270.88, 272.15, 303.01, 312.64, 327.16, 322.99, 305.58, 289.76, 298.61, 272.58, 296.61, 277.7, 305.71, 320.42, 293.6, 260.67, 301.57, 272.65, 251.65, 268, 267.97, 236.5, 250.74], '1Y': [313.62, 308.08, 321.67, 347.84, 336.41, 326.21, 314.21, 315.94, 309.06, 318, 322.71, 326.33, 357.46, 383.23, 396.53, 365.8, 401.43, 363.25, 354.02, 357.48, 359.09, 368.62, 378.6, 361.05, 360.46, 354.94, 342.52, 307.71, 285.27, 270.88, 272.15, 303.01, 312.64, 324.87, 317.09, 307.69, 289.76, 298.61, 272.58, 296.61, 277.7, 305.71, 320.42, 293.6, 260.67, 288.68, 272.65, 251.65, 268, 267.97, 236.5, 250.74] },
      velocityScore: { '1D': 2.2, '1W': 7.1, '1M': 106.8, '6M': null }, isNew: false,
      marketCap: '$90B', pe: 21.8, revenueGrowth: 64, eps: 11.52, grossMargin: 23, dividendYield: 0.7,
      etfPresence: { POW: 1.27, VOLT: false, PBD: false, PBW: false, IVEP: 3.28 },
      tonyNote: 'Constellation Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TLN', name: 'Talen Energy Corp', easyScore: 2, avgWeight: 2.2, proScore: 0.88, coverage: 0.4,
      price: 384.44, weeklyPrices: [364.67, 377.79, 366.66, 367.88, 384.44], weeklyChange: 5.42, dayChange: 4.5, sortRank: 0, periodReturns: { '1M': 7.2, 'YTD': 2.6, '6M': 3.7, '1Y': 43.7 },
      priceHistory: { '1D': [367.88, 383.26, 392, 388.17, 387.69, 388.5, 386.26, 387.89, 389.03, 388.93, 389.01, 387.45, 388.51, 387.28, 385.55, 385.45, 385.13, 384.18, 383.77, 385.03, 383.31, 383.67, 384.68, 384.44], '1W': [364.67, 377.79, 366.66, 367.88, 384.44], '1M': [358.74, 336.59, 344.8, 360.54, 386.21, 406.51, 409.81, 436.29, 438.12, 411.92, 405.89, 416.8, 404.09, 399.34, 384.26, 360.79, 364.67, 377.79, 366.66, 367.88, 384.44], 'YTD': [374.84, 356, 419.07, 366.43, 340.8, 353.66, 388.28, 375.24, 341.39, 331.58, 338.6, 328.29, 328.08, 312.76, 362.4, 345.25, 372.16, 386.37, 334.24, 372.45, 377.2, 364.78, 406.51, 405.89, 360.79, 384.44], '6M': [370.83, 371.66, 350.41, 340.8, 353.66, 388.28, 375.24, 353.24, 335.11, 317.6, 311.02, 313.03, 330.07, 345.76, 329.74, 361.17, 384.9, 374.61, 314.57, 389, 385.51, 358.74, 406.51, 405.89, 360.79, 384.44], '1Y': [267.62, 264, 339.16, 377.57, 375.58, 380.6, 360.1, 381.5, 380.44, 400.92, 415.25, 410.72, 434.07, 444.5, 418.03, 383.82, 398.55, 403.49, 367.54, 390.51, 392.42, 367.93, 368.82, 371.72, 384.52, 395.2, 370.83, 371.66, 350.41, 340.8, 353.66, 388.28, 375.24, 341.39, 331.58, 327.14, 311.02, 313.03, 330.07, 345.76, 329.74, 361.17, 384.9, 374.61, 314.57, 379.78, 385.51, 358.74, 406.51, 405.89, 360.79, 384.44] },
      velocityScore: { '1D': 1.1, '1W': 6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: null, revenueGrowth: 97, eps: -0.52, grossMargin: 40, dividendYield: null,
      etfPresence: { POW: 1.69, VOLT: false, PBD: false, PBW: false, IVEP: 2.71 },
      tonyNote: 'Talen Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SO', name: 'Southern Co/The', easyScore: 2, avgWeight: 2.13, proScore: 0.85, coverage: 0.4,
      price: 95.17, weeklyPrices: [97.98, 95.99, 97.29, 96.38, 95.17], weeklyChange: -2.87, dayChange: -1.26, sortRank: 0, periodReturns: { '1M': 2.4, 'YTD': 9.1, '6M': 9.4, '1Y': 2 },
      priceHistory: { '1D': [96.38, 95.69, 95.82, 96.26, 96.05, 96.14, 96.11, 95.93, 95.58, 95.57, 95.55, 95.71, 95.63, 95.44, 95.37, 95.47, 95.42, 95.33, 95.11, 95.19, 95.2, 95.3, 95.02, 95.17], '1W': [97.98, 95.99, 97.29, 96.38, 95.17], '1M': [92.95, 94.02, 93.27, 94, 93.82, 94.31, 92.53, 93.09, 93.43, 94.93, 95.78, 95.91, 97.16, 96.75, 95.71, 95.12, 97.98, 95.99, 97.29, 96.38, 95.17], 'YTD': [87.2, 87.22, 88.78, 87.54, 88.19, 89.38, 92, 95.81, 96.79, 96.27, 96.54, 94.61, 96.94, 97.59, 94.9, 93.91, 96.71, 91.8, 92.55, 94.55, 89.03, 91.28, 94.31, 95.78, 95.12, 95.17], '6M': [87.01, 88.9, 88.16, 88.19, 89.38, 92, 95.81, 97.23, 97.25, 99.11, 93.75, 96.93, 96.82, 95.96, 91.92, 94.41, 95.9, 93.47, 94.14, 94.09, 90.51, 92.95, 94.31, 95.78, 95.12, 95.17], '1Y': [93.26, 93.33, 95, 94.48, 95.35, 94.19, 94.93, 93.28, 91.87, 92.13, 91.45, 93.69, 93.89, 96.13, 98.43, 96.15, 93.51, 91.41, 91.89, 89.05, 90.24, 87.33, 84.73, 87.22, 87.17, 86.87, 87.01, 88.9, 88.16, 88.19, 89.38, 92, 95.81, 96.79, 96.27, 98.27, 93.75, 96.93, 96.82, 95.96, 91.92, 94.41, 95.9, 93.47, 94.14, 93.74, 90.51, 92.95, 94.31, 95.78, 95.12, 95.17] },
      velocityScore: { '1D': -1.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$107B', pe: 24.3, revenueGrowth: 8, eps: 3.91, grossMargin: 48, dividendYield: 3.15,
      etfPresence: { POW: 0.34, VOLT: false, PBD: false, PBW: false, IVEP: 3.93 },
      tonyNote: 'Southern Co/The appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.13, proScore: 2.05, coverage: 0.4,
      price: 938.39, weeklyPrices: [963.53, 969.92, 940.12, 948.08, 938.39], weeklyChange: -2.61, dayChange: -1.02, sortRank: 0, periodReturns: { '1M': 2.6, 'YTD': 63.8, '6M': 51.9, '1Y': 129.8 },
      priceHistory: { '1D': [948.08, 964.07, 963.82, 951.3, 953.23, 955.54, 957.43, 957.79, 962, 957.93, 958.34, 956.21, 952.76, 951.72, 950.1, 951.11, 950.96, 949.79, 948.52, 948.49, 939.9, 939.66, 936, 938.39], '1W': [963.53, 969.92, 940.12, 948.08, 938.39], '1M': [914.7, 856.16, 897.63, 910.57, 933.93, 945.46, 955.92, 985.82, 1022.28, 984.24, 994.45, 1057.01, 997.47, 1033.19, 1064.9, 991.41, 963.53, 969.92, 940.12, 948.08, 938.39], 'YTD': [572.87, 608.13, 647.18, 626.62, 690.91, 742.12, 764.76, 768.23, 722.18, 716.68, 693.62, 719.04, 730.32, 787.07, 772.66, 835.24, 889.67, 897.45, 888.31, 879.89, 865.36, 915.64, 945.46, 994.45, 991.41, 938.39], '6M': [617.62, 646.89, 635.92, 690.91, 742.12, 764.76, 768.23, 752.32, 704.82, 699.78, 701.7, 667.43, 724.44, 794.25, 800.45, 817.87, 904.59, 912.14, 860.15, 908.55, 909.81, 914.7, 945.46, 994.45, 991.41, 938.39], '1Y': [408.33, 418.07, 429.52, 438.02, 417.12, 417.5, 420.59, 432.67, 420.22, 431.38, 466.96, 463.72, 490.57, 500.36, 540.96, 520.5, 585.49, 569.15, 573.02, 553.11, 573.73, 599.15, 625.61, 565.83, 583, 616.1, 617.62, 646.89, 635.92, 690.91, 742.12, 764.76, 768.23, 722.18, 716.68, 702, 701.7, 667.43, 724.44, 794.25, 800.45, 817.87, 904.59, 912.14, 860.15, 909.93, 909.81, 914.7, 945.46, 994.45, 991.41, 938.39] },
      velocityScore: { '1D': 0.5, '1W': 2, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$432B', pe: 46.7, revenueGrowth: 22, eps: 20.1, grossMargin: 29, dividendYield: 0.69,
      etfPresence: { AIRR: false, PRN: 3.37, RSHO: 6.89, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 4.76, proScore: 1.9, coverage: 0.4,
      price: 236.58, weeklyPrices: [246.33, 248.05, 234.05, 231.85, 236.58], weeklyChange: -3.96, dayChange: 2.04, sortRank: 0, periodReturns: { '1M': -16.6, 'YTD': 122.6, '6M': 94.2, '1Y': 233.4 },
      priceHistory: { '1D': [231.85, 240.88, 242.99, 238.85, 240.23, 240.18, 240.79, 240.18, 240.15, 239.4, 238.95, 239.18, 239.74, 238.84, 238.82, 238.81, 238, 238.82, 238.68, 239.35, 237.79, 237.54, 236.76, 236.58], '1W': [246.33, 248.05, 234.05, 231.85, 236.58], '1M': [283.51, 262.34, 290.5, 294.75, 303.53, 292.7, 294.03, 297.2, 307.8, 291.5, 294.49, 309.2, 279.77, 281.09, 286.36, 264.86, 246.33, 248.05, 234.05, 231.85, 236.58], 'YTD': [106.26, 119.94, 135.18, 139.32, 146.79, 187.3, 187.21, 186.39, 170.37, 176.51, 167.41, 194.85, 184.68, 230.81, 232.81, 252.18, 275.33, 309.39, 292.65, 279.22, 288.12, 293.6, 292.7, 294.49, 264.86, 236.58], '6M': [121.83, 139.99, 141.15, 146.79, 187.3, 187.21, 186.39, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 261.58, 291.97, 299.07, 283.51, 292.7, 294.49, 264.86, 236.58], '1Y': [70.96, 78.84, 80.05, 79.03, 77.8, 85.17, 82.17, 91.46, 90.24, 97.47, 101.43, 94.58, 102.51, 103.18, 112.77, 113.88, 136.12, 131.92, 118.74, 95.1, 107.26, 112.31, 120.91, 109.59, 113.62, 120.46, 121.83, 139.99, 141.15, 146.79, 187.3, 187.21, 186.39, 170.37, 176.51, 174.04, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 261.58, 295.94, 299.07, 283.51, 292.7, 294.49, 264.86, 236.58] },
      velocityScore: { '1D': -0.5, '1W': -3.1, '1M': -10.8, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 46.2, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.15,
      etfPresence: { AIRR: 2.19, PRN: false, RSHO: 7.33, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 4.51, proScore: 1.81, coverage: 0.4,
      price: 707.17, weeklyPrices: [700.75, 717.11, 674.39, 660.72, 707.17], weeklyChange: 0.92, dayChange: 7.03, sortRank: 0, periodReturns: { '1M': -16, 'YTD': 130.9, '6M': 129.5, '1Y': 199.3 },
      priceHistory: { '1D': [660.72, 703.05, 708.67, 705.61, 704.54, 707.82, 709.37, 709.68, 708.14, 706.2, 709.9, 705.76, 707.15, 704.39, 705.3, 705.97, 705.37, 708.52, 706.62, 708.22, 704.52, 706.31, 703.49, 707.17], '1W': [700.75, 717.11, 674.39, 660.72, 707.17], '1M': [842.01, 770.25, 838.55, 858.99, 866.67, 857.76, 838.21, 861.88, 932.75, 892.25, 867.23, 881.92, 804.76, 813.77, 839.36, 776.55, 700.75, 717.11, 674.39, 660.72, 707.17], 'YTD': [306.23, 297.62, 336.31, 351.39, 367.95, 418.61, 421.2, 459.72, 415.51, 411.53, 421.23, 452.92, 421.29, 435.65, 441.1, 495.67, 532.67, 844.8, 848.84, 732.94, 845.39, 891.86, 857.76, 867.23, 776.55, 707.17], '6M': [308.13, 350.96, 361.21, 367.95, 418.61, 421.2, 459.72, 432.87, 411.38, 417.76, 422.55, 382.55, 382.22, 464.54, 472.84, 471.85, 806, 851.35, 728.29, 783.53, 875.52, 842.01, 857.76, 867.23, 776.55, 707.17], '1Y': [236.29, 250.69, 252.68, 267.59, 299.64, 282.14, 274.89, 289.36, 288.68, 316.16, 348.58, 338.44, 351.66, 355.53, 361.02, 353.8, 403.35, 411.07, 380.7, 334.17, 339.75, 332.29, 340.51, 302.3, 316.55, 327.11, 308.13, 350.96, 361.21, 367.95, 418.61, 421.2, 459.72, 415.51, 411.53, 425.51, 422.55, 382.55, 382.22, 464.54, 472.84, 471.85, 806, 851.35, 728.29, 782.12, 875.52, 842.01, 857.76, 867.23, 776.55, 707.17] },
      velocityScore: { '1D': -1.6, '1W': -10.4, '1M': -21, '6M': null }, isNew: false,
      marketCap: '$22B', pe: 63.3, revenueGrowth: 92, eps: 11.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 5.13, PRN: 3.9, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.29, proScore: 1.72, coverage: 0.4,
      price: 1781.42, weeklyPrices: [1741.30, 1793.03, 1683.44, 1684.94, 1781.42], weeklyChange: 2.3, dayChange: 5.73, sortRank: 0, periodReturns: { '1M': -2.7, 'YTD': 90.9, '6M': 76.3, '1Y': 233.7 },
      priceHistory: { '1D': [1684.94, 1785.38, 1810.34, 1791.76, 1781.86, 1778.69, 1784, 1785.99, 1793.52, 1785.48, 1785.68, 1779.56, 1786.81, 1787.87, 1791.85, 1789.03, 1785.9, 1787.93, 1781.08, 1782.83, 1773.95, 1771.83, 1775.45, 1781.42], '1W': [1741.3, 1793.03, 1683.44, 1684.94, 1781.42], '1M': [1831.56, 1719.48, 1843.42, 1877.61, 1952.02, 1913.94, 1931.77, 1967.41, 2066.51, 1908.07, 1954.47, 2017.57, 1854.23, 1948.69, 1981.95, 1865.15, 1741.3, 1793.03, 1683.44, 1684.94, 1781.42], 'YTD': [933.29, 971.49, 1091.04, 1121.44, 1176.26, 1283.65, 1337.75, 1468.58, 1391.16, 1383.62, 1423, 1470.64, 1428.52, 1574.45, 1605.97, 1773.91, 1867.02, 1952.37, 1992.74, 1828.25, 1787.88, 1852.03, 1913.94, 1954.47, 1865.15, 1781.42], '6M': [1010.41, 1119.98, 1127.55, 1176.26, 1283.65, 1337.75, 1468.58, 1438.24, 1372.4, 1414.1, 1408.25, 1273.18, 1424.91, 1650.48, 1674.16, 1719.21, 1967.24, 2016.31, 1825.5, 1883.56, 1883.26, 1831.56, 1913.94, 1954.47, 1865.15, 1781.42], '1Y': [533.77, 550.5, 562.83, 703.3, 694.43, 689.86, 681.08, 709.83, 723.95, 764.91, 799.38, 781.88, 832.98, 834.7, 838.78, 825, 1010.64, 987.78, 973.18, 930.5, 970.95, 1004.65, 1024.92, 918.54, 963.83, 1032.31, 1010.41, 1119.98, 1127.55, 1176.26, 1283.65, 1337.75, 1468.58, 1391.16, 1383.62, 1424.46, 1408.25, 1273.18, 1424.91, 1650.48, 1674.16, 1719.21, 1967.24, 2016.31, 1825.5, 1867.09, 1883.26, 1831.56, 1913.94, 1954.47, 1865.15, 1781.42] },
      velocityScore: { '1D': 0.6, '1W': -2.8, '1M': -5.5, '6M': null }, isNew: false,
      marketCap: '$63B', pe: 51.3, revenueGrowth: 1, eps: 34.71, grossMargin: 25, dividendYield: 0.15,
      etfPresence: { AIRR: 4.08, PRN: 4.51, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.94, proScore: 1.57, coverage: 0.4,
      price: 322.49, weeklyPrices: [330.85, 328.53, 315.33, 315.88, 322.49], weeklyChange: -2.53, dayChange: 2.09, sortRank: 0, periodReturns: { '1M': -0.1, 'YTD': 25.6, '6M': 18.5, '1Y': 26 },
      priceHistory: { '1D': [315.88, 319.76, 319.76, 320.62, 318.56, 319.49, 319.7, 319.55, 319.92, 320.61, 320.77, 320.71, 320.96, 320.52, 320.4, 321.43, 321.18, 321.78, 322.06, 322.39, 322.42, 322.38, 322.13, 322.49], '1W': [330.85, 328.53, 315.33, 315.88, 322.49], '1M': [322.81, 314.08, 318.89, 320.11, 316.18, 324.38, 329.89, 337.96, 338.07, 330.9, 333.78, 343.54, 337.08, 334.16, 338.15, 332.08, 330.85, 328.53, 315.33, 315.88, 322.49], 'YTD': [256.77, 264.62, 282.47, 280.14, 270.02, 282.45, 278.31, 282.27, 277.7, 264.31, 258.51, 266, 269.36, 286.41, 284.39, 294.4, 302.99, 308.87, 307.17, 307.1, 300.98, 314.42, 324.38, 333.78, 332.08, 322.49], '6M': [272.25, 281.21, 281.54, 270.02, 282.45, 278.31, 282.27, 283.54, 267.57, 256.83, 262.23, 258.01, 272.54, 292.01, 293.59, 301.24, 305.48, 313.7, 302.64, 311.33, 308.31, 322.81, 324.38, 333.78, 332.08, 322.49], '1Y': [255.95, 261.93, 268.07, 271.5, 263.43, 273.04, 262.46, 268.4, 267.96, 269.68, 262.77, 259.1, 259.16, 251.03, 244.84, 260, 254.1, 257.9, 256.26, 243.79, 257.32, 258.83, 262.84, 259.48, 264.78, 263.15, 272.25, 281.21, 281.54, 270.02, 282.45, 278.31, 282.27, 277.7, 264.31, 261.37, 262.23, 258.01, 272.54, 292.01, 293.59, 301.24, 305.48, 313.7, 302.64, 312.65, 308.31, 322.81, 324.38, 333.78, 332.08, 322.49] },
      velocityScore: { '1D': 0, '1W': 0, '1M': 15.4, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 30.5, revenueGrowth: 7, eps: 10.58, grossMargin: 30, dividendYield: 0.65,
      etfPresence: { AIRR: 1.83, PRN: false, RSHO: 6.04, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'EME', name: 'EMCOR Group, Inc.', easyScore: 2, avgWeight: 3.59, proScore: 1.44, coverage: 0.4,
      price: 783.41, weeklyPrices: [774.66, 787.29, 768.38, 768.98, 783.41], weeklyChange: 1.13, dayChange: 1.88, sortRank: 0, periodReturns: { '1M': -5.4, 'YTD': 28.1, '6M': 21.2, '1Y': 43.1 },
      priceHistory: { '1D': [768.98, 786.73, 788.71, 783.05, 785.84, 785.95, 785.67, 785.65, 786.53, 784.91, 785.01, 784.97, 786.27, 785.86, 785.77, 784.97, 786.21, 785.85, 784.72, 784.58, 783.42, 783.79, 782.84, 783.41], '1W': [774.66, 787.29, 768.38, 768.98, 783.41], '1M': [827.78, 776.72, 811.53, 823.05, 842.3, 834.77, 827.5, 836.59, 868.88, 838.61, 847.17, 862.66, 798.1, 814.41, 829.88, 804.33, 774.66, 787.29, 768.38, 768.98, 783.41], 'YTD': [611.79, 628.27, 682.13, 694.21, 731.67, 776.24, 797.5, 806.8, 736.3, 723.38, 737.66, 764.76, 759.55, 800.4, 792.25, 873.11, 903.5, 921.64, 913.11, 848.91, 830.95, 823.79, 834.77, 847.17, 804.33, 783.41], '6M': [646.27, 698.69, 706.87, 731.67, 776.24, 797.5, 806.8, 735.78, 719.18, 726.55, 744.66, 701.1, 750.42, 814.18, 838.01, 863.78, 933.27, 924.9, 854.36, 861.41, 827.28, 827.78, 834.77, 847.17, 804.33, 783.41], '1Y': [547.59, 559.25, 578.8, 627.49, 617.51, 609.75, 605.13, 624, 640.57, 640, 628.92, 625, 660.28, 680.83, 687.22, 696.28, 777, 675.42, 643.38, 605.84, 610.72, 635.36, 639.58, 612.86, 627.09, 653.57, 646.27, 698.69, 706.87, 731.67, 776.24, 797.5, 806.8, 736.3, 723.38, 728.55, 744.66, 701.1, 750.42, 814.18, 838.01, 863.78, 933.27, 924.9, 854.36, 855.26, 827.28, 827.78, 834.77, 847.17, 804.33, 783.41] },
      velocityScore: { '1D': 0.7, '1W': 3.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$35B', pe: 26.3, revenueGrowth: 20, eps: 29.76, grossMargin: 19, dividendYield: 0.21,
      etfPresence: { AIRR: 3.78, PRN: 3.41, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'EMCOR Group is an electrical and mechanical construction services company. Revenue grew substantially, and EMCOR is a core Industrials ETF holding because it builds the electrical systems inside data centers, manufacturing plants, and commercial buildings. The $827 share price reflects years of consistent execution and market share gains in a fragmented contractor market.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 2, avgWeight: 3.21, proScore: 1.28, coverage: 0.4,
      price: 273.77, weeklyPrices: [270.41, 277.91, 275.43, 271.58, 273.77], weeklyChange: 1.24, dayChange: 0.81, sortRank: 0, periodReturns: { '1M': 6.5, 'YTD': 33.5, '6M': 25.4, '1Y': 53.3 },
      priceHistory: { '1D': [271.58, 275.57, 275.47, 275.69, 276.49, 276.11, 275.86, 275.48, 276.16, 275.58, 275.71, 275.97, 275.54, 275.47, 275.58, 275.67, 275.56, 275.56, 274.76, 275.26, 274.39, 274.35, 273.78, 273.77], '1W': [270.41, 277.91, 275.43, 271.58, 273.77], '1M': [257.16, 249.49, 264.6, 264.67, 270.44, 277.42, 283.23, 277.66, 280.36, 275.13, 276.06, 273.14, 268.87, 268.57, 268.86, 267.41, 270.41, 277.91, 275.43, 271.58, 273.77], 'YTD': [205.02, 210.02, 224.26, 214.89, 207.21, 225.15, 252.55, 260.95, 258.84, 253.91, 241.93, 241.62, 239.04, 254.06, 247.6, 246.16, 239.51, 270.56, 260.35, 256.55, 255.52, 246.55, 277.42, 276.06, 267.41, 273.77], '6M': [218.27, 224.89, 215.39, 207.21, 225.15, 252.55, 260.95, 265.11, 254.14, 240.73, 236.04, 222.99, 236.02, 258.03, 247.72, 240.43, 242.69, 269.76, 253.12, 261.89, 250.72, 257.16, 277.42, 276.06, 267.41, 273.77], '1Y': [178.53, 188.83, 186.8, 179.77, 181.58, 175.99, 171.94, 175.65, 179.53, 184.21, 191.84, 189.85, 191.08, 188.83, 191.68, 200.1, 203.48, 206.31, 205.07, 202.06, 204.63, 196.27, 195.89, 198, 211.22, 212.92, 218.27, 224.89, 215.39, 207.21, 225.15, 252.55, 260.95, 258.84, 253.91, 240.24, 236.04, 222.99, 236.02, 258.03, 247.72, 240.43, 242.69, 269.76, 253.12, 258.02, 250.72, 257.16, 277.42, 276.06, 267.41, 273.77] },
      velocityScore: { '1D': -0.8, '1W': 9.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$110B', pe: 63.4, revenueGrowth: 19, eps: 4.32, grossMargin: 35, dividendYield: 0.18,
      etfPresence: { AIRR: false, PRN: 4.21, RSHO: false, IDEF: 2.2, BILT: false },
      tonyNote: 'Howmet Aerospace is an aerospace structures and engine components manufacturer. It appears in Industrials ETFs for its aerospace and defense exposure — commercial air travel recovery and defense spending growth are the two demand drivers. Revenue grew and margins are expanding as Howmet prices power over OEM customers.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.78, proScore: 1.11, coverage: 0.4,
      price: 216.63, weeklyPrices: [227.74, 232.19, 218.83, 213.56, 216.63], weeklyChange: -4.88, dayChange: 1.44, sortRank: 0, periodReturns: { '1M': -5, 'YTD': 8.3, '6M': 4.4, '1Y': 25.2 },
      priceHistory: { '1D': [213.56, 217.87, 218.98, 219.68, 220.29, 220.44, 220.93, 219.6, 220.72, 220.8, 220.3, 219.29, 219.57, 219.52, 220.34, 219.7, 218.96, 219.25, 218.34, 218.51, 218.47, 217.91, 216.8, 216.63], '1W': [227.74, 232.19, 218.83, 213.56, 216.63], '1M': [228.01, 223.63, 233.49, 230.05, 237.06, 234.8, 235.29, 242.97, 246.41, 236.07, 237.22, 244.56, 231.87, 238.21, 245.17, 231.72, 227.74, 232.19, 218.83, 213.56, 216.63], 'YTD': [200.06, 207.44, 213.61, 211.03, 212.73, 223.86, 241.6, 243.04, 219.58, 210.96, 202.46, 201.27, 203.16, 215.54, 215.27, 223.96, 208.13, 202.84, 200.99, 207.8, 220.92, 229.95, 234.8, 237.22, 231.72, 216.63], '6M': [207.51, 217.65, 215.21, 212.73, 223.86, 241.6, 243.04, 225.02, 209.8, 203.42, 194.52, 190.71, 195.43, 224.82, 216.49, 216.36, 207.81, 198.99, 195.79, 219.08, 230.08, 228.01, 234.8, 237.22, 231.72, 216.63], '1Y': [173.08, 180.12, 175.41, 182.39, 204.31, 186.56, 186.26, 192.47, 186.63, 190.25, 190.48, 182.95, 187.73, 185.97, 182.92, 190.4, 200, 223.06, 219.09, 205.32, 215.87, 208.24, 224.76, 210.34, 208.48, 205.44, 207.51, 217.65, 215.21, 212.73, 223.86, 241.6, 243.04, 219.58, 210.96, 204.62, 194.52, 190.71, 195.43, 224.82, 216.49, 216.36, 207.81, 198.99, 195.79, 215.34, 230.08, 228.01, 234.8, 237.22, 231.72, 216.63] },
      velocityScore: { '1D': -0.9, '1W': -1.8, '1M': -1.8, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 41.4, revenueGrowth: 17, eps: 5.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.6, PRN: false, RSHO: 3.96, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.32, proScore: 0.93, coverage: 0.4,
      price: 186.99, weeklyPrices: [191.06, 196.89, 186.08, 184.11, 186.99], weeklyChange: -2.13, dayChange: 1.56, sortRank: 0, periodReturns: { '1M': -1, 'YTD': 8.2, '6M': -7.2, '1Y': 37 },
      priceHistory: { '1D': [184.11, 186.02, 187.01, 186.16, 186.88, 186.8, 188.96, 188.27, 188.04, 188.44, 188.59, 188.74, 188.79, 188.84, 188.6, 188.71, 188.66, 188.31, 187.99, 188.15, 188.02, 187.4, 187.23, 186.99], '1W': [191.06, 196.89, 186.08, 184.11, 186.99], '1M': [188.96, 183, 194.68, 193.45, 193.94, 196.93, 203.07, 205.4, 210, 209.89, 205.65, 204.77, 197.91, 189.25, 194.65, 191.25, 191.06, 196.89, 186.08, 184.11, 186.99], 'YTD': [172.84, 193.2, 213.25, 207.75, 206.04, 203, 201.09, 204.23, 205.83, 195.91, 208.98, 222.13, 212.81, 230.29, 230.8, 225.51, 216.31, 205.33, 204.72, 202.91, 188.39, 187.46, 196.93, 205.65, 191.25, 186.99], '6M': [201.46, 217.89, 206.04, 206.04, 203, 201.09, 204.23, 216.47, 200.39, 204.67, 204.85, 191.59, 214.44, 238.27, 216.66, 216.18, 206.15, 206.83, 197.33, 204.38, 187.26, 188.96, 196.93, 205.65, 191.25, 186.99], '1Y': [136.45, 142.34, 143.84, 151.93, 179.53, 174.7, 163.56, 165.6, 163.79, 170.1, 174.03, 176.21, 185.7, 195.6, 209.01, 199.92, 213.69, 198.12, 196.77, 179.81, 178.18, 178.33, 183.38, 170.75, 175.88, 189.02, 201.46, 217.89, 206.04, 206.04, 203, 201.09, 204.23, 205.83, 195.91, 207.48, 204.85, 191.59, 214.44, 238.27, 216.66, 216.18, 206.15, 206.83, 197.33, 198.95, 187.26, 188.96, 196.93, 205.65, 191.25, 186.99] },
      velocityScore: { '1D': 0, '1W': 0, '1M': 2.2, '6M': null }, isNew: false,
      marketCap: '$17B', pe: 49.7, revenueGrowth: 26, eps: 3.76, grossMargin: 23, dividendYield: 0.56,
      etfPresence: { AIRR: 3.05, PRN: false, RSHO: false, IDEF: 1.59, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.9, proScore: 0.76, coverage: 0.4,
      price: 286.21, weeklyPrices: [291.50, 294.10, 289.46, 289.47, 286.21], weeklyChange: -1.81, dayChange: -1.13, sortRank: 0, periodReturns: { '1M': -3.8, 'YTD': -15.8, '6M': -26, '1Y': 10.9 },
      priceHistory: { '1D': [289.47, 286.74, 283.6, 284.72, 284.69, 284.37, 285.27, 285.86, 285.92, 285.89, 286.31, 286.55, 285.95, 285.58, 285.99, 286.3, 286.54, 286.66, 285.79, 286.05, 285.73, 285.31, 285.43, 286.21], '1W': [291.5, 294.1, 289.46, 289.47, 286.21], '1M': [297.52, 289.13, 300.95, 297.68, 299.66, 298.51, 296.89, 285.43, 278.19, 283.48, 279.62, 279.09, 281.99, 277.39, 279.89, 278.97, 291.5, 294.1, 289.46, 289.47, 286.21], 'YTD': [340.07, 378.47, 418.86, 418.58, 420.3, 405.82, 417.83, 447.73, 440.33, 417.51, 427.99, 402.56, 393.32, 403.37, 396.17, 370.14, 360.6, 316.28, 326.17, 320.63, 296.41, 292.26, 298.51, 279.62, 278.97, 286.21], '6M': [386.99, 425.9, 413.56, 420.3, 405.82, 417.83, 447.73, 453.73, 429.58, 416.59, 396.57, 369.08, 402.28, 398.07, 378.21, 361.4, 326.13, 333.56, 324.6, 320.95, 293.66, 297.52, 298.51, 279.62, 278.97, 286.21], '1Y': [258.11, 255.35, 263.33, 278.86, 266.45, 267.46, 267.09, 276.39, 269.98, 276.07, 274.69, 271.25, 282.22, 286.14, 282.66, 290.09, 298.42, 306.68, 317.89, 309.74, 314.31, 315.88, 326.72, 322.63, 351.13, 363.48, 386.99, 425.9, 413.56, 420.3, 405.82, 417.83, 447.73, 440.33, 417.51, 422.94, 396.57, 369.08, 402.28, 398.07, 378.21, 361.4, 326.13, 333.56, 324.6, 317.56, 293.66, 297.52, 298.51, 279.62, 278.97, 286.21] },
      velocityScore: { '1D': 1.3, '1W': 10.1, '1M': 2.7, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 18.6, revenueGrowth: 13, eps: 15.4, grossMargin: 12, dividendYield: 1.91,
      etfPresence: { AIRR: 2.75, PRN: false, RSHO: false, IDEF: 1.05, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'CW', name: 'Curtiss-Wright Corp', easyScore: 2, avgWeight: 1.88, proScore: 0.75, coverage: 0.4,
      price: 759.71, weeklyPrices: [760.23, 792.77, 766.54, 760.57, 759.71], weeklyChange: -0.07, dayChange: -0.11, sortRank: 0, periodReturns: { '1M': 3.6, 'YTD': 37.8, '6M': 25.6, '1Y': 60.1 },
      priceHistory: { '1D': [760.57, 767.74, 766.72, 764.05, 765.34, 765.06, 768, 766.48, 767.75, 770.26, 771.77, 772.16, 771.98, 771.6, 770.03, 767.43, 769.39, 766.91, 767.1, 769.01, 766.64, 764.61, 762, 759.71], '1W': [760.23, 792.77, 766.54, 760.57, 759.71], '1M': [733.57, 719.02, 757.23, 758, 762.59, 764.61, 777.29, 771.93, 783.82, 765.13, 762.92, 767.73, 747.27, 737.39, 757.76, 757.76, 760.23, 792.77, 766.54, 760.57, 759.71], 'YTD': [551.27, 582.61, 660.66, 649.08, 663.99, 653.82, 688, 712.45, 701.99, 703.61, 690.94, 702.25, 696.99, 722.52, 719.99, 725.5, 713.14, 729.2, 712.72, 731.24, 719.99, 721.33, 764.61, 762.92, 757.76, 759.71], '6M': [605.1, 663.84, 649.68, 663.99, 653.82, 688, 712.45, 726.48, 706.46, 683.84, 688.54, 632.06, 699.88, 742.61, 719.51, 706.07, 728.95, 735.34, 704.95, 750.66, 721.12, 733.57, 764.61, 762.92, 757.76, 759.71], '1Y': [474.49, 484.1, 478.73, 490.22, 473.44, 492.15, 480.5, 488.52, 481.09, 511.1, 512.8, 516.73, 536.77, 554.83, 550.06, 558.88, 601.63, 585.12, 577.65, 547.95, 562.96, 550.03, 569.32, 542.44, 566.17, 586.49, 605.1, 663.84, 649.68, 663.99, 653.82, 688, 712.45, 701.99, 703.61, 679.58, 688.54, 632.06, 699.88, 742.61, 719.51, 706.07, 728.95, 735.34, 704.95, 742.59, 721.12, 733.57, 764.61, 762.92, 757.76, 759.71] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$28B', pe: 55.8, revenueGrowth: 13, eps: 13.61, grossMargin: 37, dividendYield: 0.14,
      etfPresence: { AIRR: false, PRN: 2.78, RSHO: false, IDEF: 0.97, BILT: false },
      tonyNote: 'Curtiss-Wright Corp appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 1.82, proScore: 0.73, coverage: 0.4,
      price: 48.85, weeklyPrices: [55.35, 53.54, 50.34, 50.38, 48.85], weeklyChange: -11.74, dayChange: -3.04, sortRank: 0, periodReturns: { '1M': -13.1, 'YTD': -35.6, '6M': -57, '1Y': 5.6 },
      priceHistory: { '1D': [50.38, 49.71, 48.89, 48.42, 49.41, 49.3, 49.48, 49.4, 49.32, 49.19, 49.15, 49.39, 49.44, 49.3, 49.17, 48.81, 49.04, 49.12, 48.85, 48.94, 48.71, 48.6, 48.57, 48.85], '1W': [55.35, 53.54, 50.34, 50.38, 48.85], '1M': [56.19, 54.82, 58.78, 57.75, 57.02, 56.34, 56.16, 54.21, 51.09, 50.8, 47.95, 46.32, 47.21, 46.95, 49.86, 53.04, 55.35, 53.54, 50.34, 50.38, 48.85], 'YTD': [75.91, 104.04, 124.56, 110.39, 96.16, 98.81, 91.97, 90.68, 88.95, 88.96, 93.04, 79.98, 67.7, 68.33, 74.41, 65.52, 62.05, 57.89, 52.09, 56.18, 63.49, 57.73, 56.34, 47.95, 53.04, 48.85], '6M': [113.7, 130.72, 111.32, 96.16, 98.81, 91.97, 90.68, 90.72, 92.47, 89.53, 83.69, 65.28, 71.96, 73.66, 68.55, 61.66, 59.31, 57.33, 53.47, 56.8, 63.27, 56.19, 56.34, 47.95, 53.04, 48.85], '1Y': [46.27, 58.91, 58.66, 58.7, 59.08, 69.12, 64.27, 67.92, 63.59, 67.67, 80.65, 84.2, 95.03, 98.55, 88.62, 89.32, 91.21, 77.41, 76.7, 70.67, 75.77, 77.68, 78.78, 71.4, 77.7, 89.93, 113.7, 130.72, 111.32, 96.16, 98.81, 91.97, 90.68, 88.95, 88.96, 95.31, 83.69, 65.28, 71.96, 73.66, 68.55, 61.66, 59.31, 57.33, 53.47, 57.3, 63.27, 56.19, 56.34, 47.95, 53.04, 48.85] },
      velocityScore: { '1D': 1.4, '1W': 5.8, '1M': -8.8, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 287.4, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.67, PRN: false, RSHO: false, IDEF: 0.97, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 1.4, proScore: 0.56, coverage: 0.4,
      price: 75.45, weeklyPrices: [73.14, 72.82, 75.08, 75.27, 75.45], weeklyChange: 3.16, dayChange: 0.24, sortRank: 0, periodReturns: { '1M': 5.4, 'YTD': 25.5, '6M': 25.1, '1Y': 30.6 },
      priceHistory: { '1D': [75.27, 75.63, 76.13, 76.23, 76.21, 76.31, 76.3, 76.07, 75.9, 75.81, 75.74, 75.96, 75.79, 75.72, 75.68, 75.73, 75.8, 75.89, 75.86, 75.62, 75.39, 75.43, 75.56, 75.45], '1W': [73.14, 72.82, 75.08, 75.27, 75.45], '1M': [71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 71.25, 73.12, 74.95, 75.79, 75.87, 77.53, 77.92, 75.06, 74.34, 72.77, 73.14, 72.82, 75.08, 75.27, 75.45], 'YTD': [60.11, 61.15, 60.29, 64.96, 66.34, 67.85, 71.96, 73.5, 75.88, 73.84, 72.8, 73.81, 71.83, 72.82, 70.86, 71.65, 75.54, 71.96, 77.72, 78.47, 70.04, 71.59, 71.48, 75.87, 72.77, 75.45], '6M': [60.32, 61.55, 64.29, 66.34, 67.85, 71.96, 73.5, 76.26, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 79.4, 76.34, 71.31, 71.59, 71.48, 75.87, 72.77, 75.45], '1Y': [57.78, 58.09, 58.75, 59.95, 57.89, 57.34, 57.22, 57.49, 57.58, 59.33, 60.38, 63.31, 64.06, 63.1, 62.53, 58.93, 56.98, 57.54, 60.43, 58.89, 60.22, 63.66, 60.92, 58.66, 59.52, 61.16, 60.32, 61.55, 64.29, 66.34, 67.85, 71.96, 73.5, 75.88, 73.84, 73.69, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 79.4, 74.37, 71.31, 71.59, 71.48, 75.87, 72.77, 75.45] },
      velocityScore: { '1D': 1.8, '1W': 1.8, '1M': 1.8, '6M': null }, isNew: false,
      marketCap: '$92B', pe: 33.1, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.79,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.92, IDEF: false, BILT: 1.87 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AIR', name: 'AIRBUS GROUP', easyScore: 2, avgWeight: 1.33, proScore: 0.53, coverage: 0.4,
      price: 136.57, weeklyPrices: [140.11, 143.61, 136.63, 133.30, 136.57], weeklyChange: -2.53, dayChange: 2.45, sortRank: 0, periodReturns: { '1M': 13.7, 'YTD': 65, '6M': 40.8, '1Y': 83.2 },
      priceHistory: { '1D': [133.3, 135.25, 135.38, 134.9, 136.1, 135.87, 136.28, 136.23, 136.44, 136.46, 137.04, 137.22, 137.42, 137.3, 137.5, 137.96, 138.22, 138.15, 137.88, 138.07, 137.66, 137.63, 136.62, 136.57], '1W': [140.11, 143.61, 136.63, 133.3, 136.57], '1M': [120.13, 117.36, 127.23, 129.01, 131.18, 129.96, 132.14, 134.88, 134.28, 132.26, 132.94, 138.51, 143.14, 141.85, 142.93, 142.76, 140.11, 143.61, 136.63, 133.3, 136.57], 'YTD': [82.79, 94.73, 105.74, 105.66, 108, 114.34, 113.54, 118.26, 116.84, 108.3, 108.85, 118.52, 111.37, 123.04, 118.51, 112.08, 110.35, 117.78, 104.55, 108.41, 109.99, 114.72, 129.96, 132.94, 142.76, 136.57], '6M': [97.03, 105.08, 104.26, 108, 114.34, 113.54, 118.26, 119.77, 107.87, 105.64, 103.49, 103.16, 113.86, 125.99, 116.54, 108.86, 111.9, 111.51, 100.89, 112.74, 110.61, 120.13, 129.96, 132.94, 142.76, 136.57], '1Y': [74.55, 85.1, 77.5, 74.71, 72.06, 77.15, 71.77, 75.82, 77.11, 75.32, 75.93, 82.66, 83.95, 81.27, 82.86, 85.69, 84.84, 83.6, 83.65, 78.56, 82.98, 83.79, 84.34, 81.88, 85.07, 88.02, 97.03, 105.08, 104.26, 108, 114.34, 113.54, 118.26, 116.84, 108.3, 108.76, 103.49, 103.16, 113.86, 125.99, 116.54, 108.86, 111.9, 111.51, 100.89, 112.82, 110.61, 120.13, 129.96, 132.94, 142.76, 136.57] },
      velocityScore: { '1D': -1.9, '1W': -1.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: 30, revenueGrowth: 25, eps: 4.55, grossMargin: 19, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 2.5, BILT: false },
      tonyNote: 'AIRBUS GROUP appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.17, proScore: 0.47, coverage: 0.4,
      price: 595.61, weeklyPrices: [604.56, 609.60, 600.26, 593.89, 595.61], weeklyChange: -1.48, dayChange: 0.29, sortRank: 0, periodReturns: { '1M': 0.5, 'YTD': 32.8, '6M': 22.3, '1Y': 57.2 },
      priceHistory: { '1D': [593.89, 597.02, 598.68, 599.47, 598.98, 602.34, 601.74, 601.94, 601.59, 604.43, 603.14, 602.28, 603.16, 602.87, 602.65, 603.22, 602.4, 603.07, 602.7, 602.05, 601.49, 599.99, 598.54, 595.61], '1W': [604.56, 609.6, 600.26, 593.89, 595.61], '1M': [592.41, 576.74, 607.46, 603.64, 616.95, 621.08, 625.73, 639.18, 645.73, 633.44, 638.94, 648.89, 630.36, 634.78, 644.06, 620.47, 604.56, 609.6, 600.26, 593.89, 595.61], 'YTD': [448.43, 485, 497.06, 504.07, 507.13, 548.2, 552.93, 571.57, 568.58, 560.28, 547.81, 561.66, 551.99, 595.11, 571.61, 601.39, 595.76, 605.99, 569.06, 559.95, 566.14, 590.97, 621.08, 638.94, 620.47, 595.61], '6M': [487.16, 498.82, 504.5, 507.13, 548.2, 552.93, 571.57, 584.89, 565.64, 546.91, 537.2, 524.38, 553.31, 598.23, 591.32, 594.39, 607.5, 613.1, 565.22, 584.4, 578.34, 592.41, 621.08, 638.94, 620.47, 595.61], '1Y': [378.91, 397.03, 385.02, 387.34, 404.66, 401.92, 392.76, 399.53, 391.1, 385.08, 384.72, 379.44, 374.99, 384.43, 369.71, 407.3, 408.94, 431.36, 445.34, 430.24, 443.29, 443.22, 458.15, 449.77, 456.33, 461.21, 487.16, 498.82, 504.5, 507.13, 548.2, 552.93, 571.57, 568.58, 560.28, 544.55, 537.2, 524.38, 553.31, 598.23, 591.32, 594.39, 607.5, 613.1, 565.22, 577.42, 578.34, 592.41, 621.08, 638.94, 620.47, 595.61] },
      velocityScore: { '1D': 0, '1W': 0, '1M': -19, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 65.5, revenueGrowth: 18, eps: 9.09, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.86, PRN: false, RSHO: false, IDEF: 0.48, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 1.13, proScore: 0.45, coverage: 0.4,
      price: 50.05, weeklyPrices: [56.37, 53.36, 51.47, 49.96, 50.05], weeklyChange: -11.21, dayChange: 0.18, sortRank: 0, periodReturns: { '1M': 3.5, 'YTD': -31.6, '6M': -52.9, '1Y': 5.5 },
      priceHistory: { '1D': [49.96, 49.48, 49.26, 48.87, 49.79, 50.01, 50.82, 50.87, 50.68, 50.61, 50.45, 50.49, 50.51, 50.42, 50.49, 50.48, 50.49, 50.48, 50.34, 50.46, 50.33, 50.26, 50.37, 50.05], '1W': [56.37, 53.36, 51.47, 49.96, 50.05], '1M': [48.37, 45.87, 49.58, 47.83, 48.27, 51.7, 52.03, 50.37, 47.7, 46.38, 44.84, 46.27, 46.42, 47.1, 49.92, 54.93, 56.37, 53.36, 51.47, 49.96, 50.05], 'YTD': [73.17, 101.28, 109.49, 108.22, 102.87, 97.47, 75.11, 83.6, 91.11, 102.79, 101.43, 99.6, 82.69, 84.22, 87.91, 76.6, 65.73, 60.84, 62.77, 64.1, 53.65, 49.64, 51.7, 44.84, 54.93, 50.05], '6M': [106.22, 108.5, 108.71, 102.87, 97.47, 75.11, 83.6, 93.04, 106.09, 104.08, 102.39, 74.82, 82, 90.18, 82.06, 70.3, 62.89, 62.48, 64.2, 60.66, 54.65, 48.37, 51.7, 44.84, 54.93, 50.05], '1Y': [47.44, 56.3, 49.41, 51.7, 48.21, 50.91, 50.76, 54.65, 53.38, 63.8, 65.45, 67.4, 73.41, 74.51, 76.85, 81.99, 85.79, 79.73, 67.74, 60.93, 67.43, 66.48, 69.37, 68.11, 77.55, 83.99, 106.22, 108.5, 108.71, 102.87, 97.47, 75.11, 83.6, 91.11, 102.79, 104.06, 102.39, 74.82, 82, 90.18, 82.06, 70.3, 62.89, 62.48, 64.2, 63.52, 54.65, 48.37, 51.7, 44.84, 54.93, 50.05] },
      velocityScore: { '1D': -2.2, '1W': 7.1, '1M': -2.2, '6M': null }, isNew: false,
      marketCap: '$7B', pe: 217.6, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 2.05, PRN: false, RSHO: false, IDEF: 0.2, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.13, proScore: 0.45, coverage: 0.4,
      price: 114.25, weeklyPrices: [126.21, 123.07, 115.83, 112.41, 114.25], weeklyChange: -9.48, dayChange: 1.64, sortRank: 0, periodReturns: { '1M': 5, 'YTD': 56.5, '6M': 22.2, '1Y': 125.7 },
      priceHistory: { '1D': [112.41, 115.18, 114.48, 115.37, 114.39, 114.26, 115.01, 115.09, 114.85, 115.17, 114.73, 114.87, 115.07, 115.03, 114.93, 115.3, 115.46, 114.97, 114.69, 114.63, 114.98, 114.1, 114.31, 114.25], '1W': [126.21, 123.07, 115.83, 112.41, 114.25], '1M': [108.82, 106.81, 119.32, 120.3, 115.93, 112.44, 115.5, 113.91, 111.76, 110.87, 105, 105.57, 109.38, 110.22, 122.33, 123.05, 126.21, 123.07, 115.83, 112.41, 114.25], 'YTD': [73.01, 88.74, 102.95, 99.05, 93.89, 85.37, 83.32, 88.76, 89.43, 86.87, 78.97, 78.71, 74.75, 79.23, 84.91, 78.91, 78.55, 90.34, 92.03, 98.55, 111.28, 110.94, 112.44, 105, 123.05, 114.25], '6M': [93.48, 103.02, 98.89, 93.89, 85.37, 83.32, 88.76, 91.01, 89.36, 80.71, 78.29, 69.86, 77.53, 84.09, 83.36, 76.53, 82.96, 92.32, 92.8, 99.32, 112.87, 108.82, 112.44, 105, 123.05, 114.25], '1Y': [50.62, 52.2, 52.46, 52.59, 52.62, 66.83, 64.54, 68.13, 67.89, 73.08, 77.1, 73.13, 82.56, 80.96, 77.1, 77.6, 77.44, 78.19, 73.1, 67.55, 69.62, 71.35, 76.61, 68.88, 74.22, 81.29, 93.48, 103.02, 98.89, 93.89, 85.37, 83.32, 88.76, 89.43, 86.87, 81.35, 78.29, 69.86, 77.53, 84.09, 83.36, 76.53, 82.96, 92.32, 92.8, 97.11, 112.87, 108.82, 112.44, 105, 123.05, 114.25] },
      velocityScore: { '1D': -2.2, '1W': -4.3, '1M': 7.1, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 12, eps: -0.22, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.24, PRN: false, RSHO: false, IDEF: 1.02, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.58, proScore: 0.23, coverage: 0.4,
      price: 44.67, weeklyPrices: [43.72, 45.37, 45.47, 44.71, 44.67], weeklyChange: 2.17, dayChange: -0.09, sortRank: 0, periodReturns: { '1M': -5.7, 'YTD': 31, '6M': 9, '1Y': -3.4 },
      priceHistory: { '1D': [44.71, 44.58, 44.49, 44.49, 44.56, 44.45, 44.65, 44.78, 44.83, 44.64, 44.73, 44.9, 44.92, 44.8, 44.79, 44.83, 44.89, 44.85, 44.71, 44.69, 44.63, 44.54, 44.54, 44.67], '1W': [43.72, 45.37, 45.47, 44.71, 44.67], '1M': [47.35, 46.11, 49.69, 48.53, 46.68, 45.59, 46.58, 46.08, 44.99, 45.74, 44.69, 44.36, 42.48, 40.95, 42.67, 42.69, 43.72, 45.37, 45.47, 44.71, 44.67], 'YTD': [34.09, 38.84, 42.26, 40.99, 40.45, 40.22, 39.13, 43.82, 45.51, 46.35, 46.44, 46.32, 45.86, 47.1, 44.94, 41.41, 40.03, 41.36, 41.5, 44.92, 47.96, 46.55, 45.59, 44.69, 42.69, 44.67], '6M': [40.99, 42.57, 40.63, 40.45, 40.22, 39.13, 43.82, 45.49, 47.41, 45.3, 44.4, 43.25, 46.19, 47.54, 43.2, 40.18, 39.7, 42.87, 42.81, 45.8, 47.39, 47.35, 45.59, 44.69, 42.69, 44.67], '1Y': [46.24, 48.33, 47.45, 41.6, 41.25, 41.74, 41.06, 42.03, 40.91, 41.61, 42.58, 42.35, 44.63, 44.21, 39.6, 40.53, 38.43, 35.76, 35.46, 33.43, 33.69, 34.31, 34.78, 33.17, 34.28, 37.01, 40.99, 42.57, 40.63, 40.45, 40.22, 39.13, 43.82, 45.51, 46.35, 45.6, 44.4, 43.25, 46.19, 47.54, 43.2, 40.18, 39.7, 42.87, 42.81, 45.35, 47.39, 47.35, 45.59, 44.69, 42.69, 44.67] },
      velocityScore: { '1D': -4.2, '1W': 9.5, '1M': -4.2, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 41.7, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.8,
      etfPresence: { AIRR: 0.87, PRN: false, RSHO: false, IDEF: 0.3, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.36, proScore: 0.15, coverage: 0.4,
      price: 74.98, weeklyPrices: [76.75, 79.91, 74.87, 75.49, 74.98], weeklyChange: -2.31, dayChange: -0.68, sortRank: 0, periodReturns: { '1M': 4.9, 'YTD': 11.9, '6M': 6.3, '1Y': 56 },
      priceHistory: { '1D': [75.49, 76.46, 76.29, 76.07, 76.14, 75.86, 76.07, 76.15, 76.45, 75.97, 75.93, 75.82, 75.98, 75.83, 75.85, 75.85, 75.79, 76.05, 75.6, 75.61, 75.37, 75.36, 75.09, 74.98], '1W': [76.75, 79.91, 74.87, 75.49, 74.98], '1M': [71.48, 68.72, 73.61, 74.92, 76.55, 76.19, 77.89, 77.99, 81.5, 81, 82.36, 81.56, 79.53, 81.88, 82.97, 79.51, 76.75, 79.91, 74.87, 75.49, 74.98], 'YTD': [67.02, 70.17, 75.17, 76.01, 80.11, 84.07, 82.24, 85.87, 69.95, 71.29, 71.21, 78.37, 78.71, 81.5, 84.39, 86.48, 93.68, 82.85, 79.49, 72.76, 74.26, 72.13, 76.19, 82.36, 79.51, 74.98], '6M': [70.53, 75.09, 77.34, 80.11, 84.07, 82.24, 85.87, 73.57, 72.04, 71.31, 72.44, 72.83, 77.31, 86.16, 85.11, 86.87, 97.31, 82.69, 74.91, 74.67, 74.29, 71.48, 76.19, 82.36, 79.51, 74.98], '1Y': [48.06, 50.89, 48.29, 48.15, 55.07, 57.25, 55.99, 58.79, 61, 62.89, 66.22, 64.33, 62.04, 61.75, 64.19, 67.67, 69.34, 67.92, 62.28, 60.11, 67.56, 68.64, 70.46, 67.56, 69.06, 71.79, 70.53, 75.09, 77.34, 80.11, 84.07, 82.24, 85.87, 69.95, 71.29, 71.44, 72.44, 72.83, 77.31, 86.16, 85.11, 86.87, 97.31, 82.69, 74.91, 74.47, 74.29, 71.48, 76.19, 82.36, 79.51, 74.98] },
      velocityScore: { '1D': 7.1, '1W': 0, '1M': 15.4, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 51.4, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.32,
      etfPresence: { AIRR: 0.7, PRN: false, RSHO: false, IDEF: 0.03, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'TIMKEN CO/THE', easyScore: 1, avgWeight: 8.69, proScore: 1.74, coverage: 0.2,
      price: 137.93, weeklyPrices: [139.16, 142.36, 138.06, 137.23, 137.93], weeklyChange: -0.88, dayChange: 0.51, sortRank: 0, periodReturns: { '1M': 0.6, 'YTD': 63.9, '6M': 51.3, '1Y': 75.6 },
      priceHistory: { '1D': [137.23, 138.88, 139.21, 138.99, 139.35, 139.65, 139.59, 139.46, 139.72, 140, 140.07, 140.03, 139.85, 139.86, 139.73, 139.63, 140.02, 139.79, 139.66, 139.57, 139.19, 138.84, 138.45, 137.93], '1W': [139.16, 142.36, 138.06, 137.23, 137.93], '1M': [137.09, 132.39, 137.4, 137.06, 139.12, 140.28, 139.4, 142.36, 141.97, 137.64, 137.99, 144.01, 141.22, 143.5, 145.32, 141.75, 139.16, 142.36, 138.06, 137.23, 137.93], 'YTD': [84.13, 90.6, 93.73, 93.94, 94.99, 108.93, 105.54, 109.52, 106.58, 102.18, 98.23, 101.9, 102.06, 106.92, 103.92, 108.7, 109, 117.97, 114.49, 119.95, 126.54, 134.67, 140.28, 137.99, 141.75, 137.93], '6M': [91.17, 93.55, 94.02, 94.99, 108.93, 105.54, 109.52, 109.99, 100.58, 98.74, 98.99, 95.94, 99.17, 106.81, 108.75, 106.88, 109.63, 117.12, 109.36, 127.42, 131.9, 137.09, 140.28, 137.99, 141.75, 137.93], '1Y': [78.57, 79.13, 80.76, 76.09, 73.91, 77.08, 75.86, 79.01, 77.42, 79.16, 79.09, 74.2, 75.99, 74.32, 74.04, 77.71, 79.25, 78.46, 78.66, 74.82, 81.36, 82.76, 88.71, 84.92, 86.52, 88.34, 91.17, 93.55, 94.02, 94.99, 108.93, 105.54, 109.52, 106.58, 102.18, 98.59, 98.99, 95.94, 99.17, 106.81, 108.75, 106.88, 109.63, 117.12, 109.36, 127.16, 131.9, 137.09, 140.28, 137.99, 141.75, 137.93] },
      velocityScore: { '1D': 0, '1W': 0, '1M': -2.8, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 31.3, revenueGrowth: 8, eps: 4.41, grossMargin: 31, dividendYield: 1.05,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.69, IDEF: false, BILT: false },
      tonyNote: 'TIMKEN CO/THE appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.25, proScore: 4.25, coverage: 1,
      price: 216.2, weeklyPrices: [215.62, 213.02, 195.19, 216.48, 216.20], weeklyChange: 0.27, dayChange: -0.13, sortRank: 0, periodReturns: { '1M': -1.8, 'YTD': 158.3, '6M': 120.8, '1Y': 365.6 },
      priceHistory: { '1D': [216.48, 220.23, 222.2, 214.24, 216.41, 215.39, 215.96, 216.64, 217.54, 215.23, 214.65, 216.09, 217.7, 218.8, 218.8, 220.48, 220.1, 220.9, 222.91, 223, 219.32, 219.38, 220.63, 216.2], '1W': [215.62, 213.02, 195.19, 216.48, 216.2], '1M': [220.12, 211.69, 222.24, 232.36, 260.07, 265.1, 280.91, 286.69, 283.61, 275.25, 259.66, 256.63, 240.3, 261.15, 276.17, 229.18, 215.62, 213.02, 195.19, 216.48, 216.2], 'YTD': [83.71, 97.3, 103.89, 94.5, 88.16, 92.88, 97.52, 102.58, 86.8, 96.43, 118.56, 115.09, 101.95, 136.33, 165.34, 157.08, 154.49, 177.05, 219.94, 214.77, 264.51, 218, 265.1, 259.66, 229.18, 216.2], '6M': [97.93, 108.73, 91.46, 88.16, 92.88, 97.52, 102.58, 91.01, 94.94, 129.85, 114.15, 92.26, 117.4, 161.94, 156.55, 135.51, 175.92, 179.11, 197.73, 208.06, 260.58, 220.12, 265.1, 259.66, 229.18, 216.2], '1Y': [46.43, 53.69, 52.16, 54.43, 65.31, 68.46, 67.47, 70.1, 64.91, 89.19, 94.12, 107.94, 125.87, 132.64, 123.04, 106.16, 125.1, 117, 94.36, 95.07, 94.69, 102.8, 94.28, 78.09, 87.59, 92.83, 97.93, 108.73, 91.46, 88.16, 92.88, 97.52, 102.58, 86.8, 96.43, 116.33, 114.15, 92.26, 117.4, 161.94, 156.55, 135.51, 175.92, 179.11, 197.73, 208.37, 260.58, 220.12, 265.1, 259.66, 229.18, 216.2] },
      velocityScore: { '1D': 1.4, '1W': -2.3, '1M': -8.8, '6M': null }, isNew: false,
      marketCap: '$55B', pe: 83.2, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 2.73, MEME: 6.58, RKNG: 3.45 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 5.44, proScore: 3.63, coverage: 0.667,
      price: 257.02, weeklyPrices: [270.89, 295.05, 269.57, 254.29, 257.02], weeklyChange: -5.12, dayChange: 1.07, sortRank: 0, periodReturns: { '1M': -1, 'YTD': 195.8, '6M': 91.7, '1Y': 894.3 },
      priceHistory: { '1D': [254.29, 270, 265.28, 259.87, 262.18, 260.2, 263.85, 262.4, 265, 264.83, 262.91, 263.49, 264.15, 262.5, 264.36, 266.05, 265.14, 264.02, 260.17, 260.45, 259.4, 258, 255.3, 257.02], '1W': [270.89, 295.05, 269.57, 254.29, 257.02], '1M': [259.61, 234.23, 248.88, 260.22, 274.5, 280.88, 284.99, 328.91, 345.85, 321.98, 326.19, 309.18, 252.02, 275.01, 302.7, 289.5, 270.89, 295.05, 269.57, 254.29, 257.02], 'YTD': [86.89, 121.84, 139.17, 144.89, 156.13, 155.17, 145.32, 166.2, 153.02, 154, 156.58, 150.22, 132.45, 160.13, 210.06, 237.57, 290.52, 261.03, 275.95, 302.49, 273.51, 253.57, 280.88, 326.19, 289.5, 257.02], '6M': [134.07, 149.5, 139.62, 156.13, 155.17, 145.32, 166.2, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 261.34, 302.4, 302.85, 259.61, 280.88, 326.19, 289.5, 257.02], '1Y': [25.85, 24.31, 33.06, 37.39, 36.8, 45.11, 44.51, 50.85, 54.91, 67.29, 80.97, 68.69, 88, 86.65, 115.09, 101.42, 133.71, 141.41, 126.72, 108.93, 101.14, 118.09, 108.99, 80.21, 90.18, 103.87, 134.07, 149.5, 139.62, 156.13, 155.17, 145.32, 166.2, 153.02, 154, 160.05, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 261.34, 293.8, 302.85, 259.61, 280.88, 326.19, 289.5, 257.02] },
      velocityScore: { '1D': -6.2, '1W': 17.9, '1M': 8.4, '6M': null }, isNew: false,
      marketCap: '$73B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.02, RKNG: 3.86 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 4.78, proScore: 3.18, coverage: 0.667,
      price: 1858.27, weeklyPrices: [1745.00, 1744.43, 1617.70, 1727.18, 1858.27], weeklyChange: 6.49, dayChange: 7.59, sortRank: 0, periodReturns: { '1M': 12.9, 'YTD': 682.8, '6M': 392.4, '1Y': 3858 },
      priceHistory: { '1D': [1727.18, 1813.83, 1855.76, 1840.46, 1845.9, 1856.69, 1890.19, 1882, 1880.82, 1880.81, 1889.3, 1878.96, 1883, 1903.25, 1923.74, 1935.58, 1934.19, 1944.47, 1931.6, 1927.01, 1887.62, 1902.27, 1882.57, 1858.27], '1W': [1745, 1744.43, 1617.7, 1727.18, 1858.27], '1M': [1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745, 1744.43, 1617.7, 1727.18, 1858.27], 'YTD': [237.38, 334.54, 409.24, 473.83, 665.24, 583.4, 590.59, 638.52, 565.41, 618.89, 753.69, 677.86, 692.73, 851.57, 919.47, 932.43, 1187, 1562.34, 1407.61, 1478.69, 1761.43, 1642, 1991.55, 1914.46, 2032.22, 1858.27], '6M': [377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46, 2032.22, 1858.27], '1Y': [46.95, 41.52, 42.06, 42.92, 40.69, 46.68, 44.4, 48.44, 62.5, 84.3, 98.87, 94.29, 124.14, 129.68, 144.27, 167.05, 204.36, 216.5, 283.1, 245.96, 215.04, 213.31, 241.61, 219.46, 250.05, 274.08, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 565.41, 618.89, 720.17, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1716.36, 1646.54, 1991.55, 1914.46, 2032.22, 1858.27] },
      velocityScore: { '1D': 2.6, '1W': 5.3, '1M': -14.5, '6M': null }, isNew: false,
      marketCap: '$275B', pe: 63.7, revenueGrowth: 251, eps: 29.19, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.24, RKNG: 3.31 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'WULF', name: 'WULF', easyScore: 2, avgWeight: 4.57, proScore: 3.04, coverage: 0.667,
      price: 23.2, weeklyPrices: [21.18, 22.21, 20.24, 22.83, 23.20], weeklyChange: 9.54, dayChange: 1.62, sortRank: 0, periodReturns: { '1M': -8.3, 'YTD': 101.9, '6M': 77.1, '1Y': 352.2 },
      priceHistory: { '1D': [22.83, 23.35, 23.48, 23.31, 23.42, 23.75, 23.77, 24.15, 24.4, 24.35, 24.16, 23.89, 24, 23.92, 24.05, 24.13, 23.83, 23.85, 24.29, 24.33, 24.2, 23.94, 23.44, 23.2], '1W': [21.18, 22.21, 20.24, 22.83, 23.2], '1M': [25.3, 23.19, 25.35, 26.06, 28.17, 28.01, 27.86, 28.98, 28.31, 28.78, 26.97, 26.06, 25.83, 25.58, 24.7, 23.58, 21.18, 22.21, 20.24, 22.83, 23.2], 'YTD': [11.49, 12.84, 13.83, 14.12, 13.44, 16.65, 16.18, 17.56, 14.74, 14.35, 15.3, 16.86, 14.48, 19.03, 19.31, 20.37, 21.31, 23.39, 22.32, 22.82, 25.66, 25.86, 28.01, 26.97, 23.58, 23.2], '6M': [13.1, 13.85, 13.79, 13.44, 16.65, 16.18, 17.56, 16.02, 13.85, 16.41, 16.19, 13.7, 16.57, 20.95, 19.77, 20.8, 23.49, 22.8, 21.34, 25.18, 26.49, 25.3, 28.01, 26.97, 23.58, 23.2], '1Y': [5.13, 5.36, 5.32, 5.16, 4.94, 8.71, 9.28, 9.13, 8.87, 10.64, 11.17, 10.97, 11.58, 13.59, 13.86, 12.88, 14.5, 15.36, 12.64, 12.23, 14.84, 15.1, 15.83, 11.79, 11.75, 13.62, 13.1, 13.85, 13.79, 13.44, 16.65, 16.18, 17.56, 14.74, 14.35, 16.04, 16.19, 13.7, 16.57, 20.95, 19.77, 20.8, 23.49, 22.8, 21.34, 26.74, 26.49, 25.3, 28.01, 26.97, 23.58, 23.2] },
      velocityScore: { '1D': 5.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: null, revenueGrowth: -1, eps: -2.51, grossMargin: 64, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.11, RKNG: 3.02 },
      tonyNote: 'WULF appears in 2 of 3 Meme ETFs (67% coverage) with average weight 4.6% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 2, avgWeight: 4.49, proScore: 2.99, coverage: 0.667,
      price: 41.72, weeklyPrices: [38.82, 43.91, 39.81, 43.01, 41.72], weeklyChange: 7.47, dayChange: -2.99, sortRank: 0, periodReturns: { '1M': -22.8, 'YTD': 10.5, '6M': -9.4, '1Y': 145 },
      priceHistory: { '1D': [43.01, 44.13, 43.57, 42.59, 42.66, 42.97, 42.82, 43.09, 43.34, 43.03, 42.72, 42.67, 42.78, 42.85, 42.87, 42.79, 42.56, 42.7, 42.83, 42.96, 42.69, 42.56, 42.03, 41.72], '1W': [38.82, 43.91, 39.81, 43.01, 41.72], '1M': [54.02, 51.52, 56.71, 59.77, 60.85, 59.18, 58.11, 59.96, 56.87, 54.72, 50.3, 47.74, 47.21, 45.91, 45.73, 43.32, 38.82, 43.91, 39.81, 43.01, 41.72], 'YTD': [37.77, 45.68, 51.89, 56.68, 53.08, 46.15, 40.97, 45.45, 38.85, 38.12, 42.21, 41.43, 34.09, 37.06, 47.7, 52.02, 45.66, 61.2, 52.94, 56.83, 65.33, 59.19, 59.18, 50.3, 43.32, 41.72], '6M': [46.03, 57.82, 52.36, 53.08, 46.15, 40.97, 45.45, 41.39, 38.84, 44.94, 42.16, 31.62, 35.74, 47.37, 45.17, 44.44, 54.74, 56.56, 47.74, 59.78, 66.6, 54.02, 59.18, 50.3, 43.32, 41.72], '1Y': [17.03, 18.05, 18.14, 16.11, 18.57, 19.08, 19.76, 22.35, 26.13, 32.85, 36.32, 46.29, 47.02, 63.85, 61.83, 55.86, 60.42, 76.41, 55.7, 45.83, 48.45, 46.45, 43.94, 35.8, 40.3, 48.24, 46.03, 57.82, 52.36, 53.08, 46.15, 40.97, 45.45, 38.85, 38.12, 42.96, 42.16, 31.62, 35.74, 47.37, 45.17, 44.44, 54.74, 56.56, 47.74, 67.84, 66.6, 54.02, 59.18, 50.3, 43.32, 41.72] },
      velocityScore: { '1D': 3.5, '1W': 24.6, '1M': 5.3, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 54.2, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 2.18, MEME: 6.79, RKNG: false },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 2, avgWeight: 4.49, proScore: 2.99, coverage: 0.667,
      price: 578.05, weeklyPrices: [539.00, 577.46, 532.10, 550.30, 578.05], weeklyChange: 7.24, dayChange: 5.04, sortRank: 0, periodReturns: { '1M': 11.7, 'YTD': 235.5, '6M': 188.4, '1Y': 788.5 },
      priceHistory: { '1D': [550.3, 593.15, 600, 591.83, 588.52, 587.4, 591.29, 589.57, 590.1, 588, 588.53, 587.24, 587.2, 588.74, 589.11, 588.5, 588.88, 588.03, 586.16, 586.89, 580.41, 580.5, 579.3, 578.05], '1W': [539, 577.46, 532.1, 550.3, 578.05], '1M': [517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 532.1, 550.3, 578.05], 'YTD': [172.27, 187.68, 222.1, 236.39, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 304.9, 296.14, 297.73, 337.88, 361.69, 403.12, 431.52, 480, 482.02, 484.28, 546.2, 526.93, 681.08, 643.83, 598.37, 578.05], '6M': [200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 524.65, 563.1, 517.72, 681.08, 643.83, 598.37, 578.05], '1Y': [65.06, 67.02, 69.02, 78.69, 74.44, 76.24, 75.64, 80.67, 90.49, 96.15, 105.15, 107.21, 131.26, 119.7, 125.92, 125.72, 141.38, 160.1, 166.11, 153.97, 157.74, 161, 187.2, 175.01, 181.54, 187.88, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 313.81, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 530.6, 563.1, 517.72, 681.08, 643.83, 598.37, 578.05] },
      velocityScore: { '1D': 0, '1W': 6, '1M': 92.9, '6M': null }, isNew: false,
      marketCap: '$199B', pe: 34.6, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { BUZZ: false, MEME: 5.4, RKNG: 3.58 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'LITE', name: 'LITE', easyScore: 2, avgWeight: 4.03, proScore: 2.68, coverage: 0.667,
      price: 785.77, weeklyPrices: [728.32, 731.25, 698.91, 707.10, 785.77], weeklyChange: 7.89, dayChange: 11.13, sortRank: 0, periodReturns: { '1M': -4.4, 'YTD': 113.2, '6M': 123.6, '1Y': 748.4 },
      priceHistory: { '1D': [707.1, 792.35, 793.03, 779.17, 784.22, 784.59, 790.99, 788.84, 789.18, 793.08, 790.95, 787.09, 789.67, 789.54, 793.68, 793.4, 791.02, 794, 786.25, 802.97, 801.98, 795.82, 793, 785.77], '1W': [728.32, 731.25, 698.91, 707.1, 785.77], '1M': [821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06, 801.16, 728.32, 731.25, 698.91, 707.1, 785.77], 'YTD': [368.59, 348.26, 343.27, 339.19, 423.42, 577.15, 600.42, 688.27, 694.43, 672, 700.81, 777.17, 764.65, 894.13, 891.22, 846.89, 949.93, 903.8, 970.7, 946.9, 905, 895.4, 875.36, 842.53, 801.16, 785.77], '6M': [351.42, 324.25, 332.45, 423.42, 577.15, 600.42, 688.27, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 890.09, 910.81, 1029.15, 821.76, 875.36, 842.53, 801.16, 785.77], '1Y': [92.62, 102.64, 102.85, 110.08, 111.13, 114.62, 115.89, 125.84, 141.91, 164.88, 171.5, 159.11, 169.75, 159.76, 163.23, 168.5, 214.28, 232.75, 253.81, 268.92, 308.28, 327.85, 372.09, 337.13, 390.77, 357.05, 351.42, 324.25, 332.45, 423.42, 577.15, 600.42, 688.27, 694.43, 672, 649.56, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 890.09, 902.31, 1029.15, 821.76, 875.36, 842.53, 801.16, 785.77] },
      velocityScore: { '1D': 0.8, '1W': 5.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$61B', pe: 138.8, revenueGrowth: 90, eps: 5.66, grossMargin: 41, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.17, RKNG: 2.88 },
      tonyNote: 'LITE appears in 2 of 3 Meme ETFs (67% coverage) with average weight 4.0% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 2, avgWeight: 3.84, proScore: 2.56, coverage: 0.667,
      price: 73.88, weeklyPrices: [85.13, 80.64, 74.21, 74.95, 73.88], weeklyChange: -13.22, dayChange: -1.43, sortRank: 0, periodReturns: { '1M': -16.7, 'YTD': 1.7, '6M': -24.4, '1Y': 68 },
      priceHistory: { '1D': [74.95, 74.5, 73.6, 72.17, 73.43, 73.62, 73.61, 73.7, 74.43, 73.54, 73.14, 73.09, 73.1, 73.15, 73.5, 73.29, 73.11, 73.46, 74.32, 75.46, 75.17, 74.78, 74.98, 73.88], '1W': [85.13, 80.64, 74.21, 74.95, 73.88], '1M': [88.71, 87.32, 97.56, 82.41, 87.57, 82.25, 85.43, 80.66, 73.19, 72.87, 68.01, 65.62, 71.45, 86.77, 88.86, 86.1, 85.13, 80.64, 74.21, 74.95, 73.88], 'YTD': [72.63, 90.56, 101.25, 113.57, 104.55, 102.12, 83.03, 85.82, 92.68, 87.53, 90.74, 96.06, 83.99, 91.61, 90.94, 78.75, 70.89, 75.05, 83.67, 105.86, 105.65, 92.06, 82.25, 68.01, 86.1, 73.88], '6M': [97.67, 115.77, 104.78, 104.55, 102.12, 83.03, 85.82, 86.92, 89.76, 89.11, 88.42, 73.82, 92.57, 88.57, 80.01, 71.88, 63.87, 72.96, 88.1, 119.7, 118.17, 88.71, 82.25, 68.01, 86.1, 73.88], '1Y': [43.97, 57.45, 60.06, 53.17, 47.71, 48.5, 45.08, 48.25, 41.86, 38.37, 41.44, 49.39, 66.16, 86.79, 89.5, 71.72, 80.06, 70.38, 64.49, 58.01, 55.52, 72.65, 84.75, 65.93, 71.95, 90.92, 97.67, 115.77, 104.78, 104.55, 102.12, 83.03, 85.82, 92.68, 87.53, 95.7, 88.42, 73.82, 92.57, 88.57, 80.01, 71.88, 63.87, 72.96, 88.1, 129.6, 118.17, 88.71, 82.25, 68.01, 86.1, 73.88] },
      velocityScore: { '1D': 40.7, '1W': -4.1, '1M': -37.1, '6M': null }, isNew: false,
      marketCap: '$29B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.36, MEME: 5.33, RKNG: false },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'AMD', name: 'AMD', easyScore: 2, avgWeight: 3.52, proScore: 2.35, coverage: 0.667,
      price: 546.72, weeklyPrices: [517.82, 552.05, 516.11, 517.41, 546.72], weeklyChange: 5.58, dayChange: 5.67, sortRank: 0, periodReturns: { '1M': 15, 'YTD': 155.3, '6M': 169.1, '1Y': 279.2 },
      priceHistory: { '1D': [517.4, 549.87, 557.37, 550.3, 557.93, 554.23, 555.76, 554.14, 552.63, 556.35, 554.66, 550.65, 552.32, 551.76, 549.47, 548.67, 545.88, 546.51, 545.43, 546.95, 544.47, 543.91, 547.39, 546.72], '1W': [517.82, 552.05, 516.11, 517.41, 546.72], '1M': [475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 517.41, 546.72], 'YTD': [214.16, 204.68, 227.92, 259.68, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 360.54, 455.19, 424.1, 467.51, 510.13, 490.33, 507.29, 519.74, 540.88, 546.72], '6M': [203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 503.89, 521.54, 475.51, 507.29, 519.74, 540.88, 546.72], '1Y': [144.16, 160.41, 162.12, 176.31, 172.4, 180.95, 165.2, 167.13, 161.79, 155.67, 157.92, 161.27, 169.73, 232.89, 234.56, 234.99, 264.33, 256.33, 258.89, 223.55, 214.24, 215.98, 221.43, 201.06, 214.99, 221.08, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 196.31, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 495.54, 521.54, 475.51, 507.29, 519.74, 540.88, 546.72] },
      velocityScore: { '1D': 0.9, '1W': 2.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$891B', pe: 182.2, revenueGrowth: 38, eps: 3, grossMargin: 53, dividendYield: null,
      etfPresence: { BUZZ: 3.28, MEME: false, RKNG: 3.77 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'MRVL', name: 'MRVL', easyScore: 2, avgWeight: 3.5, proScore: 2.33, coverage: 0.667,
      price: 243.27, weeklyPrices: [245.29, 249.27, 230.70, 231.71, 243.27], weeklyChange: -0.82, dayChange: 4.99, sortRank: 0, periodReturns: { '1M': -8.8, 'YTD': 186.3, '6M': 192.3, '1Y': 231.6 },
      priceHistory: { '1D': [231.71, 249.33, 248.85, 244.28, 245.62, 246.34, 247.98, 246.59, 247, 247.96, 248.09, 246.13, 246.9, 247.38, 248.32, 247.82, 246.88, 247.37, 246.49, 246.82, 244.65, 244.41, 244.13, 243.27], '1W': [245.29, 249.27, 230.7, 231.71, 243.27], '1M': [266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 245.29, 249.27, 230.7, 231.71, 243.27], 'YTD': [84.98, 83.45, 80.38, 80.23, 78.66, 82.35, 79.01, 78.39, 77.51, 93.3, 87.62, 98.45, 106.71, 119.93, 133.37, 165.56, 164.95, 170.13, 176.89, 196.33, 219.43, 288.85, 278.67, 276.7, 272.05, 243.27], '6M': [83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 208.26, 290.79, 266.88, 278.67, 276.7, 272.05, 243.27], '1Y': [73.36, 72.01, 74.04, 80.37, 75.85, 79.04, 71.22, 74.79, 64.1, 66.59, 74.23, 83.81, 86.2, 90.68, 88.23, 82.77, 90.15, 92.9, 89.33, 81.32, 87.72, 98.19, 89.43, 84.47, 86.34, 90.23, 83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 77.51, 93.3, 90.79, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 198.7, 290.79, 266.88, 278.67, 276.7, 272.05, 243.27] },
      velocityScore: { '1D': -3.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$213B', pe: 83.3, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.1,
      etfPresence: { BUZZ: 2.55, MEME: 4.45, RKNG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 3.32, proScore: 2.21, coverage: 0.667,
      price: 991.64, weeklyPrices: [975.56, 984.75, 938.38, 948.80, 991.64], weeklyChange: 1.65, dayChange: 4.52, sortRank: 0, periodReturns: { '1M': 6, 'YTD': 247.4, '6M': 187.4, '1Y': 705.5 },
      priceHistory: { '1D': [948.8, 1017.05, 1030.67, 1015.52, 1013.47, 1013.52, 1021.17, 1017.53, 1018.65, 1017.6, 1021.38, 1011.9, 1016.21, 1022.69, 1024.61, 1024.57, 1020.29, 1019.77, 1013.67, 1011.86, 1002.27, 1004.51, 997.44, 991.64], '1W': [975.56, 984.75, 938.38, 948.8, 991.64], '1M': [935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 948.8, 991.64], 'YTD': [285.41, 327.02, 336.63, 399.65, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 542.21, 746.81, 724.66, 751, 1035.5, 949.28, 1020.76, 1048.51, 1032.28, 991.64], '6M': [345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1032.28, 991.64], '1Y': [123.11, 113.26, 111.73, 109.14, 111.87, 125.29, 117.21, 117.75, 124.21, 150.57, 168.89, 156.83, 183.75, 192.33, 202.53, 206.71, 226.63, 237.5, 244.9, 225.92, 230.26, 226.65, 258.46, 248.55, 284.79, 312.15, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 928.41, 1064.1, 935.89, 1020.76, 1048.51, 1032.28, 991.64] },
      velocityScore: { '1D': -0.9, '1W': -36.5, '1M': -25.3, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 22.4, revenueGrowth: 346, eps: 44.21, grossMargin: 73, dividendYield: 0.06,
      etfPresence: { BUZZ: 2.93, MEME: false, RKNG: 3.7 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'INTC', name: 'INTC', easyScore: 2, avgWeight: 3.11, proScore: 2.07, coverage: 0.667,
      price: 112.54, weeklyPrices: [120.35, 122.20, 110.39, 110.24, 112.54], weeklyChange: -6.49, dayChange: 2.09, sortRank: 0, periodReturns: { '1M': 4.3, 'YTD': 205, '6M': 147.1, '1Y': 372.5 },
      priceHistory: { '1D': [110.24, 116.49, 115.68, 113.56, 112.56, 112.89, 113.36, 112.83, 112.67, 112.98, 112.77, 112.24, 112.76, 113.11, 112.66, 112.81, 112.52, 112.58, 112.71, 113.05, 112.4, 112.35, 112.35, 112.54], '1W': [120.35, 122.2, 110.39, 110.24, 112.54], '1M': [107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.2, 110.39, 110.24, 112.54], 'YTD': [36.9, 41.11, 48.32, 45.07, 48.81, 50.24, 46.18, 46.12, 43.1, 46.78, 45.03, 47.18, 48.03, 61.72, 68.5, 66.78, 99.62, 124.92, 108.77, 119.84, 109.33, 110.27, 117.05, 131.65, 127.02, 112.54], '6M': [45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 46.12, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 123.52, 107.93, 107.92, 117.05, 131.65, 127.02, 112.54], '1Y': [23.82, 22.8, 22.63, 19.8, 19.77, 23.86, 23.54, 24.85, 24.61, 24.61, 30.57, 33.99, 37.3, 37.8, 36.84, 38.16, 41.34, 38.38, 37.89, 35.11, 36.81, 40.5, 39.51, 36.28, 36.2, 39.37, 45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 46.12, 43.1, 46.78, 44.06, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 121.77, 107.93, 107.92, 117.05, 131.65, 127.02, 112.54] },
      velocityScore: { '1D': -3.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$566B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 2.62, MEME: false, RKNG: 3.6 },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 1, avgWeight: 6.86, proScore: 2.29, coverage: 0.333,
      price: 122.21, weeklyPrices: [120.95, 123.36, 114.41, 114.44, 122.21], weeklyChange: 1.04, dayChange: 6.79, sortRank: 0, periodReturns: { '1M': -25, 'YTD': 250.6, '6M': 259, '1Y': 332.6 },
      priceHistory: { '1D': [114.44, 124.85, 124.63, 119.89, 121.29, 121.26, 123.14, 124.03, 122.93, 122.5, 122.15, 121.29, 121.38, 121.8, 124.25, 125.3, 124.67, 125.1, 124.47, 125.75, 125.04, 124.36, 123.29, 122.21], '1W': [120.95, 123.36, 114.41, 114.44, 122.21], '1M': [162.88, 175.13, 172.78, 169.05, 191.55, 170.81, 167.34, 161.85, 171.23, 147.44, 146.97, 138.54, 135.69, 150.1, 148.16, 139, 120.95, 123.36, 114.41, 114.44, 122.21], 'YTD': [34.86, 33.01, 37, 35.72, 44.16, 47.91, 43.91, 56.27, 95.34, 120.49, 92.63, 114.41, 86.35, 133.3, 157.32, 137.73, 183.51, 148.94, 190.36, 181.49, 185.67, 196.64, 170.81, 146.97, 139, 122.21], '6M': [34.04, 37.04, 34.89, 44.16, 47.91, 43.91, 56.27, 102.51, 110.62, 94.07, 95.76, 85.19, 117.64, 146.39, 150.57, 137.26, 180.57, 188.28, 171.33, 177.62, 202.37, 162.88, 170.81, 146.97, 139, 122.21], '1Y': [28.25, 29.42, 25.84, 22.87, 22.33, 21.01, 21.93, 24.05, 23.32, 26.85, 29.04, 26.34, 27.98, 32.37, 31.14, 31.4, 35.48, 31.51, 23.94, 20.87, 25.57, 26.24, 36.32, 29.25, 37.17, 34.99, 34.04, 37.04, 34.89, 44.16, 47.91, 43.91, 56.27, 95.34, 120.49, 86.33, 95.76, 85.19, 117.64, 146.39, 150.57, 137.26, 180.57, 188.28, 171.33, 179.83, 202.37, 162.88, 170.81, 146.97, 139, 122.21] },
      velocityScore: { '1D': -2.1, '1W': -26.6, '1M': -37.8, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.86, RKNG: false },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 1, avgWeight: 5.86, proScore: 1.95, coverage: 0.333,
      price: 265.65, weeklyPrices: [241.91, 265.55, 246.40, 258.69, 265.65], weeklyChange: 9.81, dayChange: 2.69, sortRank: 0, periodReturns: { '1M': 13.4, 'YTD': 84.6, '6M': 76.6, '1Y': 173 },
      priceHistory: { '1D': [258.69, 272.41, 268.37, 264.24, 270.56, 270.62, 277.26, 276.3, 275.8, 275.96, 274.79, 272.48, 274.01, 275.29, 276.29, 275.27, 272.02, 271.35, 267.89, 269.2, 266.28, 266.17, 267.68, 265.65], '1W': [241.91, 265.55, 246.4, 258.69, 265.65], '1M': [234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 265.55, 246.4, 258.69, 265.65], 'YTD': [143.89, 141.59, 149.12, 133.16, 119.96, 123.41, 124.8, 120.83, 97.3, 112.33, 101.72, 103.91, 95.92, 107.93, 158.93, 185.54, 184.38, 188.51, 172.17, 218.41, 226.1, 222.27, 239.18, 268.99, 259.09, 265.65], '6M': [150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.64, 229, 234.32, 239.18, 268.99, 259.09, 265.65], '1Y': [97.29, 98.45, 101.17, 111.55, 119.78, 117.33, 105.99, 122.73, 134, 159.32, 172.31, 144.94, 149.63, 151.15, 136.53, 150.97, 171.52, 173.16, 160.34, 141.88, 164.01, 180.92, 154.47, 138.57, 144.83, 140.24, 150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 97.3, 112.33, 104.06, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.23, 229, 234.32, 239.18, 268.99, 259.09, 265.65] },
      velocityScore: { '1D': 2.1, '1W': null, '1M': -22.3, '6M': null }, isNew: false,
      marketCap: '$50B', pe: 105.8, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.86, RKNG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 1, avgWeight: 5.24, proScore: 1.75, coverage: 0.333,
      price: 32.29, weeklyPrices: [33.06, 33.50, 30.71, 31.44, 32.29], weeklyChange: -2.33, dayChange: 2.7, sortRank: 0, periodReturns: { '1M': -23, 'YTD': 31.7, '6M': -14.3, '1Y': 246.1 },
      priceHistory: { '1D': [31.44, 32.2, 32.6, 31.91, 32.22, 32.34, 32.51, 32.86, 33.03, 33.4, 33.16, 32.98, 32.81, 32.7, 32.91, 32.95, 32.64, 32.72, 32.8, 32.87, 32.67, 32.57, 32.51, 32.29], '1W': [33.06, 33.5, 30.71, 31.44, 32.29], '1M': [41.91, 38.92, 41.47, 42.7, 46.47, 46.27, 45.57, 46.59, 45.2, 45.27, 41.98, 40.95, 39.16, 37.77, 37.3, 35.52, 33.06, 33.5, 30.71, 31.44, 32.29], 'YTD': [24.52, 31.94, 35.22, 37.69, 34.8, 38.26, 33.56, 30.66, 26.15, 27.4, 26.65, 28.37, 24.49, 25.57, 30.09, 36.35, 33.55, 41.25, 42.56, 45.87, 47.94, 40.94, 46.27, 41.98, 35.52, 32.29], '6M': [37.68, 37.4, 36.18, 34.8, 38.26, 33.56, 30.66, 27.93, 27.03, 27.71, 27.26, 20.55, 25.18, 31.47, 31.32, 32.11, 39.88, 43.93, 36.62, 45.14, 47.86, 41.91, 46.27, 41.98, 35.52, 32.29], '1Y': [9.33, 10.91, 11.2, 13.14, 14.24, 14.55, 15.72, 16.7, 14.33, 17.18, 19.91, 22.59, 26.47, 29.29, 36.64, 33.38, 34.42, 33.09, 26.41, 23.09, 24.94, 31.14, 30.76, 23.9, 24.05, 30.2, 37.68, 37.4, 36.18, 34.8, 38.26, 33.56, 30.66, 26.15, 27.4, 27.51, 27.26, 20.55, 25.18, 31.47, 31.32, 32.11, 39.88, 43.93, 36.62, 48.98, 47.86, 41.91, 46.27, 41.98, 35.52, 32.29] },
      velocityScore: { '1D': -1.1, '1W': -43.9, '1M': -52.2, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.24, RKNG: false },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'COHR', name: 'COHR', easyScore: 1, avgWeight: 5.21, proScore: 1.74, coverage: 0.333,
      price: 327.24, weeklyPrices: [333.36, 335.70, 314.13, 317.05, 327.24], weeklyChange: -1.84, dayChange: 3.21, sortRank: 0, periodReturns: { '1M': -8.1, 'YTD': 77.3, '6M': 83.8, '1Y': 249.2 },
      priceHistory: { '1D': [317.05, 337.4, 335.72, 330.6, 330.16, 327.33, 330.1, 329.65, 331.13, 331.14, 330, 330.69, 331.71, 331.4, 333.74, 333.48, 331.93, 332.1, 329.61, 331.4, 330, 328.99, 328.29, 327.24], '1W': [333.36, 335.7, 314.13, 317.05, 327.24], '1M': [355.94, 354.77, 363.58, 385.03, 413.84, 382.81, 378.85, 389.57, 425.48, 381.22, 392.5, 407.25, 380.56, 391.22, 394.47, 368.65, 333.36, 335.7, 314.13, 317.05, 327.24], 'YTD': [184.57, 173.15, 195.96, 196.94, 222.44, 242.46, 219.96, 254.86, 280.81, 260.64, 257.21, 272.04, 247.8, 284.17, 328, 337.68, 329.5, 335.26, 382.45, 377.57, 362.9, 401.93, 382.81, 392.5, 368.65, 327.24], '6M': [178.06, 191.04, 197.76, 222.44, 242.46, 219.96, 254.86, 298.91, 252.32, 247.37, 255.05, 219.65, 255.1, 313.42, 343.79, 303.97, 335.73, 374.01, 353.63, 381.35, 426.89, 355.94, 382.81, 392.5, 368.65, 327.24], '1Y': [93.72, 100.28, 98.72, 107.6, 113.82, 91.65, 86.55, 90.71, 95.62, 103.51, 108.05, 106.57, 112.79, 122.35, 115.96, 121.52, 138.06, 134.63, 156.67, 142.94, 154, 177.35, 198.5, 175.71, 191.72, 186.36, 178.06, 191.04, 197.76, 222.44, 242.46, 219.96, 254.86, 280.81, 260.64, 245.8, 255.05, 219.65, 255.1, 313.42, 343.79, 303.97, 335.73, 374.01, 353.63, 380.18, 426.89, 355.94, 382.81, 392.5, 368.65, 327.24] },
      velocityScore: { '1D': -0.6, '1W': 8.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$64B', pe: 156.6, revenueGrowth: 21, eps: 2.09, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.21, RKNG: false },
      tonyNote: 'COHR appears in 1 of 3 Meme ETFs (33% coverage) with average weight 5.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 1, avgWeight: 5.14, proScore: 1.71, coverage: 0.333,
      price: 44.77, weeklyPrices: [49.12, 48.87, 45.36, 45.08, 44.77], weeklyChange: -8.86, dayChange: -0.69, sortRank: 0, periodReturns: { '1M': -21, 'YTD': -0.2, '6M': -9.5, '1Y': -2.5 },
      priceHistory: { '1D': [45.08, 45.8, 45.48, 44.64, 45.08, 45.08, 45.34, 45.36, 45.4, 45.44, 45.03, 45.06, 45.08, 45.31, 45.42, 45.49, 45.24, 45.38, 45.36, 45.52, 45.18, 45.24, 45.37, 44.77], '1W': [49.12, 48.87, 45.36, 45.08, 44.77], '1M': [56.69, 56.63, 57.99, 57.85, 61.18, 56.06, 54.69, 56.55, 58.32, 57.85, 53.6, 50.56, 49.31, 53.88, 53.26, 51.4, 49.12, 48.87, 45.36, 45.08, 44.77], 'YTD': [44.87, 50.45, 47.56, 47.25, 38.56, 35.48, 33.18, 31.62, 37.05, 35.12, 32.38, 31.96, 27.79, 28.08, 44.68, 43.63, 46.2, 49.24, 51.95, 63.64, 69.28, 62.8, 56.06, 53.6, 51.4, 44.77], '6M': [49.45, 50.8, 43.37, 38.56, 35.48, 33.18, 31.62, 38.34, 35.87, 33.29, 33.11, 26.59, 28.49, 35.76, 46.28, 43.08, 48, 55.87, 48.44, 63.62, 71.4, 56.69, 56.06, 53.6, 51.4, 44.77], '1Y': [45.93, 44.84, 43.9, 39.87, 40.49, 41.03, 36.79, 41.42, 42.11, 47.05, 66.81, 69.43, 69.6, 77.5, 65.59, 59.37, 61.11, 55.41, 50.71, 47.88, 46.9, 54.76, 52.55, 46.44, 46, 48.71, 49.45, 50.8, 43.37, 38.56, 35.48, 33.18, 31.62, 37.05, 35.12, 33.31, 33.11, 26.59, 28.49, 35.76, 46.28, 43.08, 48, 55.87, 48.44, 65.4, 71.4, 56.69, 56.06, 53.6, 51.4, 44.77] },
      velocityScore: { '1D': -3.4, '1W': 11, '1M': -26.3, '6M': null }, isNew: false,
      marketCap: '$17B', pe: 114.8, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.14, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'TTMI', name: 'TTMI', easyScore: 1, avgWeight: 5, proScore: 1.67, coverage: 0.333,
      price: 149.97, weeklyPrices: [155.98, 149.39, 144.08, 145.29, 149.97], weeklyChange: -3.85, dayChange: 3.22, sortRank: 0, periodReturns: { '1M': -13.7, 'YTD': 117.3, '6M': 103, '1Y': 241.8 },
      priceHistory: { '1D': [145.29, 150.38, 153.99, 152.39, 152.41, 151.87, 153.6, 152.82, 153.53, 153.16, 151.99, 152.07, 151.96, 152.85, 152.97, 152.75, 152.81, 153.17, 152.7, 153.03, 152.65, 152.24, 152.31, 149.97], '1W': [155.98, 149.39, 144.08, 145.29, 149.97], '1M': [173.86, 172.12, 187.21, 194.05, 206.66, 199.58, 202.7, 216.44, 221.47, 213.17, 209.74, 210.57, 191.49, 186.8, 187.02, 179.7, 155.98, 149.39, 144.08, 145.29, 149.97], 'YTD': [69, 66.86, 100.9, 95.02, 102.76, 97.98, 90.91, 106.7, 104.05, 96.43, 95.31, 108, 97.08, 107.53, 116.93, 132.98, 158.99, 157.31, 167.35, 189.92, 172.44, 178.38, 199.58, 209.74, 179.7, 149.97], '6M': [73.88, 101.01, 94.63, 102.76, 97.98, 90.91, 106.7, 113, 96.8, 96.51, 101.42, 88.29, 99.29, 120.74, 125.25, 137.59, 159.58, 163.36, 161.41, 196.95, 179.62, 173.86, 199.58, 209.74, 179.7, 149.97], '1Y': [43.88, 46.22, 44.27, 47.25, 43.36, 42.62, 40.06, 44.5, 46.07, 48.32, 52.84, 54.51, 60.28, 56.52, 58.45, 58.4, 63.53, 70.06, 70.5, 64.27, 68.29, 72.84, 80.24, 67.09, 71.72, 67.99, 73.88, 101.01, 94.63, 102.76, 97.98, 90.91, 106.7, 104.05, 96.43, 97.54, 101.42, 88.29, 99.29, 120.74, 125.25, 137.59, 159.58, 163.36, 161.41, 190.67, 179.62, 173.86, 199.58, 209.74, 179.7, 149.97] },
      velocityScore: { '1D': 2.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$16B', pe: 81.1, revenueGrowth: 30, eps: 1.85, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5, RKNG: false },
      tonyNote: 'TTM Technologies is a printed circuit board manufacturer held in Industrials ETFs. Revenue growth tracks data center and defense electronics demand. PCB manufacturing is essential hardware infrastructure; TTM\'s position in AI server and high-frequency trading hardware gives it exposure to two durable growth verticals.',
    },
    {
      ticker: 'CBRS', name: 'CBRS', easyScore: 1, avgWeight: 4.62, proScore: 1.54, coverage: 0.333,
      price: 198.53, weeklyPrices: [204.86, 192.01, 176.61, 181.72, 198.53], weeklyChange: -3.09, dayChange: 9.25, sortRank: 0, periodReturns: { '1M': -12.5, 'YTD': -36.2, '6M': -36.2, '1Y': -36.2 },
      priceHistory: { '1D': [181.72, 187.37, 193.71, 188.44, 191.28, 194.28, 197.91, 200.48, 201.75, 203.27, 201.43, 199.97, 199.1, 199.38, 199.86, 200.98, 201.75, 201.38, 200.05, 200.56, 199.98, 201.84, 198.43, 198.53], '1W': [204.86, 192.01, 176.61, 181.72, 198.53], '1M': [226.82, 237.33, 226.55, 214, 218.03, 212.25, 213.67, 234.71, 224.43, 226.72, 182.26, 168.52, 181.59, 216.16, 221, 221.27, 204.86, 192.01, 176.61, 181.72, 198.53], 'YTD': [311.07, 279.72, 303.63, 290.69, 256.78, 241.71, 242.59, 236.99, 236.52, 214.94, 201.01, 237.83, 237.33, 226.55, 218.03, 212.25, 234.71, 224.43, 182.26, 168.52, 216.16, 221, 204.86, 192.01, 181.72, 198.53], '6M': [311.07, 279.72, 303.63, 290.69, 256.78, 241.71, 242.59, 236.99, 236.52, 214.94, 201.01, 237.83, 237.33, 226.55, 218.03, 212.25, 234.71, 224.43, 182.26, 168.52, 216.16, 221, 204.86, 192.01, 181.72, 198.53], '1Y': [311.07, 279.72, 296.65, 303.63, 290.69, 281.86, 256.78, 241.71, 266.9, 242.59, 236.99, 213.28, 236.52, 214.94, 215.4, 201.01, 237.83, 226.82, 237.33, 226.55, 214, 218.03, 212.25, 213.67, 234.71, 224.43, 226.72, 182.26, 168.52, 181.59, 216.16, 221, 221.27, 204.86, 192.01, 176.61, 181.72, 198.53] },
      velocityScore: { '1D': -0.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$44B', pe: 441.2, revenueGrowth: 94, eps: 0.45, grossMargin: 40, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.62, RKNG: false },
      tonyNote: 'CBRS appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OPEN', name: 'OPEN', easyScore: 1, avgWeight: 4.09, proScore: 1.36, coverage: 0.333,
      price: 5.3, weeklyPrices: [4.90, 5.09, 4.79, 4.79, 5.30], weeklyChange: 8.16, dayChange: 10.65, sortRank: 0, periodReturns: { '1M': 22.1, 'YTD': -9.1, '6M': -27.3, '1Y': 500.2 },
      priceHistory: { '1D': [4.79, 4.98, 5.24, 5.13, 5.34, 5.24, 5.24, 5.2, 5.28, 5.26, 5.26, 5.3, 5.29, 5.28, 5.29, 5.3, 5.26, 5.23, 5.18, 5.25, 5.22, 5.23, 5.29, 5.3], '1W': [4.9, 5.09, 4.79, 4.79, 5.3], '1M': [4.34, 4.48, 4.47, 4.44, 4.61, 4.75, 4.45, 4.47, 4.28, 4.2, 4.28, 4.3, 4.37, 4.6, 4.62, 4.94, 4.9, 5.09, 4.79, 4.79, 5.3], 'YTD': [5.83, 6.43, 6.3, 6.01, 4.82, 4.94, 4.33, 5.11, 4.97, 5.01, 5.28, 5.1, 4.57, 4.31, 5.27, 5.22, 5.44, 5.01, 4.38, 4.53, 5.31, 4.31, 4.75, 4.28, 4.94, 5.3], '6M': [7.29, 6.67, 5.87, 4.82, 4.94, 4.33, 5.11, 5.05, 5.08, 5.18, 5.21, 4.43, 4.55, 4.51, 5.45, 5.48, 5.23, 4.71, 4.3, 4.48, 5.41, 4.34, 4.75, 4.28, 4.94, 5.3], '1Y': [0.88, 1.65, 2.42, 1.84, 1.85, 3.04, 3.22, 4.02, 5.96, 10.52, 9.94, 9.09, 8.01, 8.14, 7.11, 7.03, 7.65, 7.23, 9.37, 6.69, 7.78, 7.58, 7.05, 6.28, 6.01, 6.32, 7.29, 6.67, 5.87, 4.82, 4.94, 4.33, 5.11, 4.97, 5.01, 5.56, 5.21, 4.43, 4.55, 4.51, 5.45, 5.48, 5.23, 4.71, 4.3, 4.75, 5.41, 4.34, 4.75, 4.28, 4.94, 5.3] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$5B', pe: null, revenueGrowth: -38, eps: -1.76, grossMargin: 8, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.09 },
      tonyNote: 'OPEN appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
