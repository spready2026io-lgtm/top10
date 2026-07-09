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
export const SPY_RET: Record<Period, number> = { '1W': 0.9, '1M': 1.9, 'YTD': 10.1, '6M': 8.2, '1Y': 20.4 };
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
  'AI & ML':         { '1W': 3.5, '1M': 3.6, 'YTD': 46.7, '6M': 41.2, '1Y': 77.3 },
  'Semiconductors':  { '1W': 4.3, '1M': 4.9, 'YTD': 103.6, '6M': 90.4, '1Y': 138.4 },
  'Broad Tech':      { '1W': 1.8, '1M': 1.5, 'YTD': 26.8, '6M': 21.6, '1Y': 41.4 },
  'Electrification': { '1W': -1.1, '1M': -3.8, 'YTD': 23, '6M': 18.3, '1Y': 39.6 },
  'Industrials':     { '1W': -0.7, '1M': 0, 'YTD': 22.9, '6M': 16.1, '1Y': 35.1 },
  'Meme':            { '1W': 2, '1M': -4.1, 'YTD': 17.6, '6M': 6.1, '1Y': 2.6 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, IndexChartByPeriod> = {
  'AI & ML': {
    '1D': { top10: [100, 103.28, 103.51, 103.28, 102.45, 102.77, 102.82, 103.05, 103.07, 103.23, 103.36, 103.39, 103.36, 103.32, 103.29, 103.2, 103.37, 103.58, 103.57, 103.61, 103.6, 103.49, 103.41, 103.44], spy: [100, 100.4, 100.44, 100.34, 100.21, 100.4, 100.34, 100.55, 100.6, 100.56, 100.64, 100.66, 100.69, 100.68, 100.68, 100.68, 100.78, 100.85, 100.85, 100.84, 100.85, 100.8, 100.77, 100.77], top10Return: 3.3, spyReturn: 0.77, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 102.67, 98.89, 100.22, 103.48], spy: [100, 100.87, 100.39, 100.08, 100.85], top10Return: 3.5, spyReturn: 0.9, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 96.86, 102.09, 102.79, 108.18, 104.97, 105.51, 110.06, 110.94, 104.37, 103.45, 105.39, 102.63, 105.71, 108.83, 104.59, 100.14, 102.82, 99.04, 100.36, 103.63], spy: [100, 98.42, 100.1, 100.64, 102.41, 101.8, 100.53, 101.31, 101, 99.53, 99.48, 99.63, 98.91, 100.54, 101.32, 101.18, 101.05, 101.93, 101.45, 101.13, 101.91], top10Return: 3.6, spyReturn: 1.9, xLabels: ["Jun 11", "Jun 18", "Jun 25", "Jul 2", "Jul 9"] },
    'YTD': { top10: [100, 102.26, 104.35, 105.09, 105.1, 104.71, 102.24, 104.01, 99.72, 102.27, 102.71, 102.1, 99.39, 106.63, 115.79, 119.47, 124.78, 135.27, 134.83, 140.17, 153.97, 144.36, 148.76, 147.04, 148.23, 146.72], spy: [100, 101.11, 101.51, 101.07, 101.98, 101.76, 100.14, 100.8, 99.77, 99.3, 97, 96.32, 96.09, 99.71, 102.89, 103.89, 105.68, 108.17, 108.4, 109.34, 111.24, 108.4, 110.03, 107.53, 109.36, 110.15], top10Return: 46.7, spyReturn: 10.1, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 101.23, 101.11, 101.29, 100.89, 98.51, 100.2, 99.72, 98.31, 99.06, 97.85, 88.69, 97.5, 109.58, 113.39, 114.74, 124.06, 129.55, 126.29, 140.57, 151.16, 136.15, 143.12, 141.43, 142.61, 141.18], spy: [100, 99.65, 99.81, 100.19, 99.98, 98.38, 99.03, 98.89, 97.72, 96.39, 94.43, 91.05, 94.98, 100.06, 101.44, 102.54, 104.28, 106.36, 105.71, 108.14, 109.44, 106.19, 108.11, 105.64, 107.45, 108.22], top10Return: 41.2, spyReturn: 8.2, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 100.91, 103, 105.41, 105.75, 108.36, 103.4, 106, 105.93, 113.31, 115.64, 117.34, 119.56, 124.66, 122.25, 120.43, 130.67, 126.39, 123.57, 116.55, 117.22, 121.71, 125.4, 114.2, 122.33, 122.75, 124.61, 126.25, 126.09, 126.41, 126.05, 123.09, 122.83, 124.69, 122.81, 123.85, 122.3, 110.75, 121.88, 137.11, 141.91, 143.6, 155.47, 162.45, 158.36, 176.65, 189.93, 170.97, 179.85, 177.9, 179.26, 177.35], spy: [100, 100.03, 101.63, 101.67, 101.4, 103.34, 102.25, 103.38, 103.15, 104.51, 105.63, 105.94, 107.11, 107.86, 106.59, 107.01, 110.15, 108.58, 109.51, 106.18, 108.17, 109.59, 110.18, 107.59, 110.63, 109.47, 111.22, 110.83, 111, 111.43, 111.2, 109.42, 109.35, 109.99, 108.69, 107.21, 105.02, 101.27, 105.63, 111.28, 112.82, 114.04, 115.98, 118.29, 117.57, 120.28, 121.71, 118.11, 120.23, 117.5, 119.5, 120.36], top10Return: 77.3, spyReturn: 20.4, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Semiconductors': {
    '1D': { top10: [100, 105.75, 106.07, 106.01, 104.64, 105.18, 105.51, 105.76, 105.91, 105.75, 105.83, 105.8, 105.88, 105.38, 105.33, 105.41, 105.74, 105.93, 105.89, 105.84, 105.73, 105.57, 105.36, 105.41], spy: [100, 100.4, 100.44, 100.34, 100.21, 100.4, 100.34, 100.55, 100.6, 100.56, 100.64, 100.66, 100.69, 100.68, 100.68, 100.68, 100.78, 100.85, 100.85, 100.84, 100.85, 100.8, 100.77, 100.77], top10Return: 5.4, spyReturn: 0.77, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 103.31, 96.87, 99.01, 104.36], spy: [100, 100.87, 100.39, 100.08, 100.85], top10Return: 4.3, spyReturn: 0.9, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 96.64, 105.99, 107.52, 113.9, 107.98, 109.13, 117.35, 121.26, 109.93, 109.27, 114.97, 108.69, 112.31, 117.25, 108.68, 100.57, 103.9, 97.41, 99.56, 104.94], spy: [100, 98.42, 100.1, 100.64, 102.41, 101.8, 100.53, 101.31, 101, 99.53, 99.48, 99.63, 98.91, 100.54, 101.32, 101.18, 101.05, 101.93, 101.45, 101.13, 101.91], top10Return: 4.9, spyReturn: 1.9, xLabels: ["Jun 11", "Jun 18", "Jun 25", "Jul 2", "Jul 9"] },
    'YTD': { top10: [100, 109.74, 113.64, 116.38, 118.59, 122.54, 123.94, 124.94, 122.59, 125.67, 133.5, 135.47, 129.52, 143.22, 156.65, 173.18, 183.03, 188.89, 190.6, 204.3, 212, 204.49, 213, 208.61, 209.73, 203.62], spy: [100, 101.11, 101.51, 101.07, 101.98, 101.76, 100.14, 100.8, 99.77, 99.3, 97, 96.32, 96.09, 99.71, 102.89, 103.89, 105.68, 108.17, 108.4, 109.34, 111.24, 108.4, 110.03, 107.53, 109.36, 110.15], top10Return: 103.6, spyReturn: 10.1, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 106.86, 106.21, 110.11, 112.39, 114.63, 116.95, 115.13, 113.78, 118.28, 126.1, 118.89, 123.76, 139.5, 152, 161.78, 176.03, 175.37, 175.18, 198.25, 206.55, 189.32, 199.42, 194.91, 195.82, 190.38], spy: [100, 99.65, 99.81, 100.19, 99.98, 98.38, 99.03, 98.89, 97.72, 96.39, 94.43, 91.05, 94.98, 100.06, 101.44, 102.54, 104.28, 106.36, 105.71, 108.14, 109.44, 106.19, 108.11, 105.64, 107.45, 108.22], top10Return: 90.4, spyReturn: 8.2, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 101.06, 103.6, 104.89, 102.51, 108.54, 106.06, 109.98, 108.13, 112, 116.66, 118.56, 122.02, 125.21, 126.42, 124.95, 134.89, 136.27, 136.61, 133.71, 137.74, 141.93, 147.99, 135.25, 139.42, 141.91, 151.18, 153.4, 159.5, 164.21, 167.21, 171.87, 172.75, 169.37, 153.34, 158.76, 156.17, 154.87, 166.38, 187.72, 195.87, 206.36, 227.23, 227.93, 228.24, 247.77, 253.85, 232.47, 238.46, 243.49, 243.71, 238.36], spy: [100, 100.03, 101.63, 101.67, 101.4, 103.34, 102.25, 103.38, 103.15, 104.51, 105.63, 105.94, 107.11, 107.86, 106.59, 107.01, 110.15, 108.58, 109.51, 106.18, 108.17, 109.59, 110.18, 107.59, 110.63, 109.47, 111.22, 110.83, 111, 111.43, 111.2, 109.42, 109.35, 109.99, 108.69, 107.21, 105.02, 101.27, 105.63, 111.28, 112.82, 114.04, 115.98, 118.29, 117.57, 120.28, 121.71, 118.11, 120.23, 117.5, 119.5, 120.36], top10Return: 138.4, spyReturn: 20.4, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Broad Tech': {
    '1D': { top10: [100, 102.27, 102.59, 102.61, 102.22, 102.11, 102.17, 102.37, 102.5, 102.49, 102.68, 102.68, 102.7, 102.58, 102.58, 102.59, 102.62, 102.68, 102.68, 102.8, 102.77, 102.75, 102.75, 102.76], spy: [100, 100.4, 100.44, 100.34, 100.21, 100.4, 100.34, 100.55, 100.6, 100.56, 100.64, 100.66, 100.69, 100.68, 100.68, 100.68, 100.78, 100.85, 100.85, 100.84, 100.85, 100.8, 100.77, 100.77], top10Return: 2.8, spyReturn: 0.77, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 101.93, 98.43, 99.03, 101.84], spy: [100, 100.87, 100.39, 100.08, 100.85], top10Return: 1.8, spyReturn: 0.9, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 97.59, 101.96, 102.42, 106.07, 104.33, 103.94, 106.35, 106.06, 102.5, 101.38, 102.26, 101.27, 103.84, 105.97, 103.24, 99.74, 101.63, 98.23, 98.75, 101.5], spy: [100, 98.42, 100.1, 100.64, 102.41, 101.8, 100.53, 101.31, 101, 99.53, 99.48, 99.63, 98.91, 100.54, 101.32, 101.18, 101.05, 101.93, 101.45, 101.13, 101.91], top10Return: 1.5, spyReturn: 1.9, xLabels: ["Jun 11", "Jun 18", "Jun 25", "Jul 2", "Jul 9"] },
    'YTD': { top10: [100, 103.16, 105.26, 104.6, 103.09, 102.31, 101.82, 103.45, 101.97, 102.51, 101.93, 101.02, 99.58, 105.69, 112.17, 115.01, 118.74, 126.1, 123.06, 126.12, 133.98, 127.37, 130.22, 128.3, 129.25, 126.78], spy: [100, 101.11, 101.51, 101.07, 101.98, 101.76, 100.14, 100.8, 99.77, 99.3, 97, 96.32, 96.09, 99.71, 102.89, 103.89, 105.68, 108.17, 108.4, 109.34, 111.24, 108.4, 110.03, 107.53, 109.36, 110.15], top10Return: 26.8, spyReturn: 10.1, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 100.87, 100.72, 98.34, 99.02, 96.48, 99.2, 100.16, 98.16, 98.2, 97.36, 89.91, 97.16, 105.48, 108.97, 109, 117.07, 121, 115.51, 124.02, 130.02, 120.2, 124.6, 122.79, 123.91, 121.57], spy: [100, 99.65, 99.81, 100.19, 99.98, 98.38, 99.03, 98.89, 97.72, 96.39, 94.43, 91.05, 94.98, 100.06, 101.44, 102.54, 104.28, 106.36, 105.71, 108.14, 109.44, 106.19, 108.11, 105.64, 107.45, 108.22], top10Return: 21.6, spyReturn: 8.2, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 100.6, 102.44, 102.46, 102.78, 103.8, 101.59, 103.98, 103.8, 107.71, 110.17, 113.26, 114.49, 118.5, 119.84, 113.54, 120.64, 120.17, 116.37, 109.66, 111.86, 113.63, 115.76, 109.6, 114.59, 113.51, 116.5, 119.87, 119.02, 118.38, 118.89, 116.8, 116.66, 120.86, 118.27, 117.63, 117.06, 110.23, 116.88, 124.76, 127.65, 128.87, 136.47, 137.42, 134.58, 144.35, 149.72, 140.99, 146.56, 144.54, 142.74, 141.36], spy: [100, 100.03, 101.63, 101.67, 101.4, 103.34, 102.25, 103.38, 103.15, 104.51, 105.63, 105.94, 107.11, 107.86, 106.59, 107.01, 110.15, 108.58, 109.51, 106.18, 108.17, 109.59, 110.18, 107.59, 110.63, 109.47, 111.22, 110.83, 111, 111.43, 111.2, 109.42, 109.35, 109.99, 108.69, 107.21, 105.02, 101.27, 105.63, 111.28, 112.82, 114.04, 115.98, 118.29, 117.57, 120.28, 121.71, 118.11, 120.23, 117.5, 119.5, 120.36], top10Return: 41.4, spyReturn: 20.4, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Electrification': {
    '1D': { top10: [100, 102.16, 102.09, 102, 101.75, 101.97, 101.86, 102.3, 102.13, 102.09, 102.24, 102.19, 102.03, 101.92, 102.06, 101.97, 102, 102.09, 101.88, 102.2, 102.09, 102.07, 102.03, 101.94], spy: [100, 100.4, 100.44, 100.34, 100.21, 100.4, 100.34, 100.55, 100.6, 100.56, 100.64, 100.66, 100.69, 100.68, 100.68, 100.68, 100.78, 100.85, 100.85, 100.84, 100.85, 100.8, 100.77, 100.77], top10Return: 1.7, spyReturn: 0.77, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 101.68, 97.56, 97.19, 98.85], spy: [100, 100.87, 100.39, 100.08, 100.85], top10Return: -1.1, spyReturn: 0.9, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 96.77, 100.73, 101.68, 103.97, 102.89, 102.86, 105.21, 106.34, 101.63, 100.91, 101.46, 98.66, 100.63, 102.78, 99.81, 97.24, 98.86, 94.88, 94.53, 96.15], spy: [100, 98.42, 100.1, 100.64, 102.41, 101.8, 100.53, 101.31, 101, 99.53, 99.48, 99.63, 98.91, 100.54, 101.32, 101.18, 101.05, 101.93, 101.45, 101.13, 101.91], top10Return: -3.8, spyReturn: 1.9, xLabels: ["Jun 11", "Jun 18", "Jun 25", "Jul 2", "Jul 9"] },
    'YTD': { top10: [100, 103.75, 108.25, 111.09, 110.24, 115.01, 115.01, 118.55, 113.6, 113.56, 113.77, 115.22, 113.52, 119.6, 122.75, 128.16, 133.45, 135.72, 132.76, 135.24, 138.06, 130.38, 131.57, 128.44, 128.14, 123.04], spy: [100, 101.11, 101.51, 101.07, 101.98, 101.76, 100.14, 100.8, 99.77, 99.3, 97, 96.32, 96.09, 99.71, 102.89, 103.89, 105.68, 108.17, 108.4, 109.34, 111.24, 108.4, 110.03, 107.53, 109.36, 110.15], top10Return: 23, spyReturn: 10.1, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 104.9, 105.98, 105.86, 110.2, 110.91, 113.23, 113.02, 108.84, 110.08, 109.65, 104.99, 109.2, 118.49, 119.56, 122.92, 130.84, 129.7, 121.85, 133.55, 134.27, 123.92, 126.34, 123.4, 123.1, 118.25], spy: [100, 99.65, 99.81, 100.19, 99.98, 98.38, 99.03, 98.89, 97.72, 96.39, 94.43, 91.05, 94.98, 100.06, 101.44, 102.54, 104.28, 106.36, 105.71, 108.14, 109.44, 106.19, 108.11, 105.64, 107.45, 108.22], top10Return: 18.3, spyReturn: 8.2, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 100.99, 104.76, 103.4, 102.46, 104.61, 104.55, 106.82, 105.49, 107.19, 109.55, 111.42, 114.47, 118.39, 123.67, 118.54, 123.23, 122.92, 122.02, 118.08, 118.04, 121.02, 122.97, 118.35, 123.63, 123.26, 123.56, 128.37, 129.64, 127.33, 130.71, 131.07, 131.65, 133.23, 129.38, 131.4, 132.53, 131.3, 136.43, 144.18, 145.32, 144.62, 152.41, 153.82, 147.49, 155.91, 158.38, 147.37, 148.4, 145.47, 144.11, 139.61], spy: [100, 100.03, 101.63, 101.67, 101.4, 103.34, 102.25, 103.38, 103.15, 104.51, 105.63, 105.94, 107.11, 107.86, 106.59, 107.01, 110.15, 108.58, 109.51, 106.18, 108.17, 109.59, 110.18, 107.59, 110.63, 109.47, 111.22, 110.83, 111, 111.43, 111.2, 109.42, 109.35, 109.99, 108.69, 107.21, 105.02, 101.27, 105.63, 111.28, 112.82, 114.04, 115.98, 118.29, 117.57, 120.28, 121.71, 118.11, 120.23, 117.5, 119.5, 120.36], top10Return: 39.6, spyReturn: 20.4, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Industrials': {
    '1D': { top10: [100, 101.26, 101.34, 101.2, 101.4, 101.44, 101.31, 101.31, 101.45, 101.46, 101.45, 101.54, 101.48, 101.51, 101.5, 101.62, 101.51, 101.55, 101.54, 101.62, 101.59, 101.59, 101.52, 101.45], spy: [100, 100.4, 100.44, 100.34, 100.21, 100.4, 100.34, 100.55, 100.6, 100.56, 100.64, 100.66, 100.69, 100.68, 100.68, 100.68, 100.78, 100.85, 100.85, 100.84, 100.85, 100.8, 100.77, 100.77], top10Return: 1.1, spyReturn: 0.77, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 100.77, 99.41, 98.21, 99.36], spy: [100, 100.87, 100.39, 100.08, 100.85], top10Return: -0.7, spyReturn: 0.9, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.22, 101.45, 100.94, 101.11, 101.26, 100.16, 101.43, 102.26, 101.2, 101.11, 102.48, 101.35, 101.79, 102.76, 102.09, 100.58, 101.37, 100.02, 98.79, 99.94], spy: [100, 98.42, 100.1, 100.64, 102.41, 101.8, 100.53, 101.31, 101, 99.53, 99.48, 99.63, 98.91, 100.54, 101.32, 101.18, 101.05, 101.93, 101.45, 101.13, 101.91], top10Return: 0, spyReturn: 1.9, xLabels: ["Jun 11", "Jun 18", "Jun 25", "Jul 2", "Jul 9"] },
    'YTD': { top10: [100, 105.14, 110.48, 110.36, 110.22, 116.48, 117.95, 119.46, 118.03, 113.99, 112.02, 113.02, 111.52, 117.43, 119.47, 120.8, 121.92, 123.29, 122.45, 120.96, 123.54, 122.94, 123.38, 124.66, 125.8, 122.87], spy: [100, 101.11, 101.51, 101.07, 101.98, 101.76, 100.14, 100.8, 99.77, 99.3, 97, 96.32, 96.09, 99.71, 102.89, 103.89, 105.68, 108.17, 108.4, 109.34, 111.24, 108.4, 110.03, 107.53, 109.36, 110.15], top10Return: 22.9, spyReturn: 10.1, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 104.36, 104.15, 103.85, 108.23, 110.5, 112.88, 113.43, 108.94, 106.92, 105.35, 102.12, 106.68, 111.76, 112.94, 112.66, 116.3, 116.64, 113.75, 116.36, 117.58, 116.15, 116.45, 117.78, 118.86, 116.12], spy: [100, 99.65, 99.81, 100.19, 99.98, 98.38, 99.03, 98.89, 97.72, 96.39, 94.43, 91.05, 94.98, 100.06, 101.44, 102.54, 104.28, 106.36, 105.71, 108.14, 109.44, 106.19, 108.11, 105.64, 107.45, 108.22], top10Return: 16.1, spyReturn: 8.2, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 100.75, 102.49, 103.06, 103.03, 104.49, 102.29, 104.85, 103.21, 104.96, 106.39, 107.48, 109.77, 111.72, 110.02, 108.58, 113.2, 110.52, 110.14, 105.55, 106.92, 107.99, 110.36, 108.05, 112.42, 112.04, 117.26, 122.39, 122.25, 122.62, 127.88, 129.29, 130.51, 130.97, 126.02, 122.69, 122.54, 119.36, 124.63, 131.99, 131.08, 131.78, 135.95, 136.98, 132.41, 136.2, 136.78, 135.47, 136.82, 137.39, 138.45, 135.13], spy: [100, 100.03, 101.63, 101.67, 101.4, 103.34, 102.25, 103.38, 103.15, 104.51, 105.63, 105.94, 107.11, 107.86, 106.59, 107.01, 110.15, 108.58, 109.51, 106.18, 108.17, 109.59, 110.18, 107.59, 110.63, 109.47, 111.22, 110.83, 111, 111.43, 111.2, 109.42, 109.35, 109.99, 108.69, 107.21, 105.02, 101.27, 105.63, 111.28, 112.82, 114.04, 115.98, 118.29, 117.57, 120.28, 121.71, 118.11, 120.23, 117.5, 119.5, 120.36], top10Return: 35.1, spyReturn: 20.4, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Meme': {
    '1D': { top10: [100, 102.88, 103.3, 103.4, 102.46, 101.68, 102.22, 102.72, 103, 103.25, 103.3, 103.55, 103.42, 103.44, 103.19, 103.08, 103.17, 103.53, 103.61, 103.6, 103.6, 103.69, 103.56, 103.75], spy: [100, 100.4, 100.44, 100.34, 100.21, 100.4, 100.34, 100.55, 100.6, 100.56, 100.64, 100.66, 100.69, 100.68, 100.68, 100.68, 100.78, 100.85, 100.85, 100.84, 100.85, 100.8, 100.77, 100.77], top10Return: 4.5, spyReturn: 0.77, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 101.87, 96.56, 97.95, 101.97], spy: [100, 100.87, 100.39, 100.08, 100.85], top10Return: 2, spyReturn: 0.9, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 97.26, 103.6, 102.22, 107.95, 103.68, 104.35, 108.06, 107.94, 102.9, 99.43, 98.92, 96.82, 101.04, 103.14, 99.23, 94.03, 95.8, 90.88, 92.15, 95.87], spy: [100, 98.42, 100.1, 100.64, 102.41, 101.8, 100.53, 101.31, 101, 99.53, 99.48, 99.63, 98.91, 100.54, 101.32, 101.18, 101.05, 101.93, 101.45, 101.13, 101.91], top10Return: -4.1, spyReturn: 1.9, xLabels: ["Jun 11", "Jun 18", "Jun 25", "Jul 2", "Jul 9"] },
    'YTD': { top10: [100, 106.79, 105.55, 105.8, 99.12, 99.94, 93.39, 94.54, 93.41, 93.13, 90.43, 93.72, 91.36, 100.82, 113.7, 112.85, 116.32, 125.35, 126.34, 135.76, 140.86, 128.78, 128.2, 122.8, 121.97, 117.57], spy: [100, 101.11, 101.51, 101.07, 101.98, 101.76, 100.14, 100.8, 99.77, 99.3, 97, 96.32, 96.09, 99.71, 102.89, 103.89, 105.68, 108.17, 108.4, 109.34, 111.24, 108.4, 110.03, 107.53, 109.36, 110.15], top10Return: 17.6, spyReturn: 10.1, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 101.11, 93.17, 89.94, 89.67, 85.63, 85.84, 85.65, 85.12, 85.73, 80.41, 76.31, 84.92, 98.04, 102.31, 98.75, 108.46, 114.22, 109.25, 124.47, 128.35, 112.53, 115.38, 110.62, 109.94, 106.09], spy: [100, 99.65, 99.81, 100.19, 99.98, 98.38, 99.03, 98.89, 97.72, 96.39, 94.43, 91.05, 94.98, 100.06, 101.44, 102.54, 104.28, 106.36, 105.71, 108.14, 109.44, 106.19, 108.11, 105.64, 107.45, 108.22], top10Return: 6.1, spyReturn: 8.2, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 103.74, 99.9, 94.77, 91.29, 91.5, 87.51, 84.09, 83.46, 83.91, 86.38, 89.32, 88.8, 88.6, 90.46, 85.97, 90.95, 90.43, 90.75, 88.01, 85, 86.17, 85.66, 85.93, 86.46, 88.01, 92.22, 90.91, 90.66, 89.88, 90.17, 89.21, 89.23, 90.11, 93.85, 96.22, 95.84, 93.06, 96.78, 104.34, 110.86, 109.89, 105.01, 114.84, 114.74, 112.24, 115.55, 109.2, 109.87, 105.93, 100.16, 102.58], spy: [100, 100.03, 101.63, 101.67, 101.4, 103.34, 102.25, 103.38, 103.15, 104.51, 105.63, 105.94, 107.11, 107.86, 106.59, 107.01, 110.15, 108.58, 109.51, 106.18, 108.17, 109.59, 110.18, 107.59, 110.63, 109.47, 111.22, 110.83, 111, 111.43, 111.2, 109.42, 109.35, 109.99, 108.69, 107.21, 105.02, 101.27, 105.63, 111.28, 112.82, 114.04, 115.98, 118.29, 117.57, 120.28, 121.71, 118.11, 120.23, 117.5, 119.5, 120.36], top10Return: 2.6, spyReturn: 20.4, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
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
export const SCAN_TIMESTAMP    = '2026-07-09T18:46:34.953Z';
export const SCAN_TIMESTAMP_NY = 'July 9, 2026 at 2:46 PM ET';
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
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.72, bestProScore: 5.06, avgProScore: 4.24, price: 1014.62, weeklyChange: 4.00 },
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.56, bestProScore: 6.13, avgProScore: 4.19, price: 204.03, weeklyChange: 4.72 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 10.67, bestProScore: 5.01, avgProScore: 3.56, price: 546.64, weeklyChange: 5.57 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 6.92, bestProScore: 3.01, avgProScore: 2.31, price: 405.51, weeklyChange: 12.50 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.77, bestProScore: 2.92, avgProScore: 2.38, price: 440.44, weeklyChange: 1.45 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.38, bestProScore: 3.23, avgProScore: 2.19, price: 112.71, weeklyChange: -6.35 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 3.97, bestProScore: 2.07, avgProScore: 1.98, price: 238.97, weeklyChange: -2.99 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 3.95, bestProScore: 2.25, avgProScore: 1.98, price: 246.65, weeklyChange: 0.55 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.71, bestProScore: 2.45, avgProScore: 1.85, price: 353.27, weeklyChange: 0.53 },
  { ticker: 'ALAB', name: `Astera Labs Inc`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 3.32, bestProScore: 1.91, avgProScore: 1.66, price: 420.03, weeklyChange: 3.35 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': 4.9, '1M': 6.9, 'YTD': 106.2, '6M': 92.9, '1Y': 177.6 },
  ARTY: { '1W': 2.9, '1M': 1.6, 'YTD': 51.8, '6M': 45.3, '1Y': 75.5 },
  BAI:  { '1W': 3.2, '1M': 3.6, 'YTD': 45.7, '6M': 41.3, '1Y': 66 },
  IGPT: { '1W': 4, '1M': 5.4, 'YTD': 66.6, '6M': 58.3, '1Y': 101 },
  IVES: { '1W': 2.4, '1M': 3.3, 'YTD': 20.7, '6M': 17.1, '1Y': 39.9 },
  ALAI: { '1W': 3.5, '1M': 4.4, 'YTD': 24.9, '6M': 21.9, '1Y': 46.9 },
  CHAT: { '1W': 4.6, '1M': 2, 'YTD': 57.5, '6M': 52, '1Y': 91 },
  AIFD: { '1W': 3.8, '1M': 2.9, 'YTD': 42.5, '6M': 40.1, '1Y': 73.2 },
  SPRX: { '1W': 2.8, '1M': 0.3, 'YTD': 35.5, '6M': 28.4, '1Y': 72.6 },
  AOTG: { '1W': 2.8, '1M': 5.9, 'YTD': 15.8, '6M': 14.7, '1Y': 29.7 },
  // Semiconductors
  SOXX: { '1W': 3.8, '1M': 4.6, 'YTD': 95.3, '6M': 78.8, '1Y': 140.9 },
  PSI:  { '1W': 2, '1M': 6, 'YTD': 104.3, '6M': 81.3, '1Y': 160.5 },
  XSD:  { '1W': 3.8, '1M': -0.1, 'YTD': 79.4, '6M': 65.9, '1Y': 116.6 },
  DRAM: { '1W': 7.8, '1M': 9.2, 'YTD': 135.5, '6M': 135.5, '1Y': 135.5 },
  // Broad Tech
  PTF:  { '1W': 5.5, '1M': -1.8, 'YTD': 56.4, '6M': 46.9, '1Y': 75.4 },
  WCLD: { '1W': 2.6, '1M': 10.3, 'YTD': -1.8, '6M': -0.8, '1Y': -6.6 },
  IGV:  { '1W': 0.2, '1M': 0.8, 'YTD': -11.3, '6M': -10.7, '1Y': -15.9 },
  FDTX: { '1W': 2.5, '1M': 3.6, 'YTD': 35.5, '6M': 32.6, '1Y': 40.8 },
  GTEK: { '1W': 0.6, '1M': 4.1, 'YTD': 50, '6M': 44, '1Y': 65.2 },
  ARKK: { '1W': 0.6, '1M': 9, 'YTD': 6.2, '6M': 1.8, '1Y': 12.9 },
  MARS: { '1W': -8.4, '1M': -13, 'YTD': 16, '6M': 16, '1Y': 16 },
  FRWD: { '1W': 2.9, '1M': 4, 'YTD': 30.8, '6M': 30.8, '1Y': 30.8 },
  BCTK: { '1W': 2.2, '1M': 5, 'YTD': 24.3, '6M': 22.1, '1Y': 26.6 },
  FWD:  { '1W': 1.3, '1M': 2, 'YTD': 33.4, '6M': 24.6, '1Y': 55.3 },
  CBSE: { '1W': -0.4, '1M': 3.6, 'YTD': 27.2, '6M': 19, '1Y': 35.5 },
  FCUS: { '1W': 3.3, '1M': -4.4, 'YTD': 30.5, '6M': 16.4, '1Y': 58.7 },
  WGMI: { '1W': 9.2, '1M': -8, 'YTD': 51.8, '6M': 29.1, '1Y': 130.2 },
  CNEQ: { '1W': 1.8, '1M': 3.7, 'YTD': 17.6, '6M': 14.9, '1Y': 37.7 },
  SGRT: { '1W': 5, '1M': 3.3, 'YTD': 41.3, '6M': 36, '1Y': 76.7 },
  SPMO: { '1W': 2.2, '1M': 4.5, 'YTD': 29.2, '6M': 28.4, '1Y': 37.5 },
  XMMO: { '1W': 0.2, '1M': -1.2, 'YTD': 18, '6M': 15.6, '1Y': 26.2 },
  // Electrification
  POW:  { '1W': -2.5, '1M': -4.3, 'YTD': 43.3, '6M': 38.3, '1Y': 39.1 },
  VOLT: { '1W': -0.3, '1M': 1.1, 'YTD': 35, '6M': 31.3, '1Y': 52.1 },
  PBD:  { '1W': -2, '1M': -7.6, 'YTD': 16, '6M': 11, '1Y': 40.7 },
  PBW:  { '1W': -2, '1M': -8.7, 'YTD': 17.4, '6M': 7.3, '1Y': 62.7 },
  IVEP: { '1W': 1.1, '1M': 0.3, 'YTD': 3.4, '6M': 3.4, '1Y': 3.4 },
  // Industrials
  AIRR: { '1W': -0.8, '1M': -2.2, 'YTD': 27, '6M': 16.1, '1Y': 48.1 },
  PRN:  { '1W': -0.7, '1M': -1, 'YTD': 33.8, '6M': 26.2, '1Y': 48.8 },
  RSHO: { '1W': 1.2, '1M': 4.4, 'YTD': 39.4, '6M': 36.1, '1Y': 52.2 },
  IDEF: { '1W': -2.6, '1M': 0.8, 'YTD': 4.3, '6M': -7.3, '1Y': 13.4 },
  BILT: { '1W': -0.4, '1M': -2.2, 'YTD': 9.8, '6M': 9.6, '1Y': 13.1 },
  // Meme
  BUZZ: { '1W': 0.6, '1M': -0.9, 'YTD': 12.5, '6M': 4.9, '1Y': 18.4 },
  MEME: { '1W': 2, '1M': -10.5, 'YTD': 38.1, '6M': 11.2, '1Y': -12.8 },
  RKNG: { '1W': 3.3, '1M': -1, 'YTD': 2.2, '6M': 2.2, '1Y': 2.2 },
};
// @@END_GENERATED:ETF_RETURNS@@

// @@GENERATED:ETF_DAY_CHANGE@@
// Today's % move per ETF ticker (1D, vs prior close). Refreshed by the 3×/day
// price jobs. Powers the 1D ranking in the theme-ETF side panel.
export const ETF_DAY_CHANGE: Record<string, number> = {
  AIS:  5.33,
  ARTY: 2.89,
  BAI:  4.48,
  IGPT: 3.66,
  IVES: 1.6,
  ALAI: 1.29,
  CHAT: 3.42,
  AIFD: 2.96,
  SPRX: 4.86,
  AOTG: 2.74,
  SOXX: 4.62,
  PSI:  6.47,
  XSD:  5.17,
  DRAM: 5.38,
  PTF:  6.62,
  WCLD: 1.84,
  IGV:  1.34,
  FDTX: 3.06,
  GTEK: 3.54,
  ARKK: 1.95,
  MARS: 0.07,
  FRWD: 2.22,
  BCTK: 2.76,
  FWD:  2.82,
  CBSE: 2.17,
  FCUS: 3.96,
  WGMI: 5.39,
  CNEQ: 1.69,
  SGRT: 4.59,
  SPMO: 2.35,
  XMMO: 1.94,
  POW:  1.92,
  VOLT: 1.84,
  PBD:  0.7,
  PBW:  2.05,
  IVEP: 2.02,
  AIRR: 1.88,
  PRN:  2.92,
  IDEF: -0.45,
  BILT: -0.04,
  BUZZ: 1.81,
  MEME: 5.68,
  RKNG: 6.08,
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
  'AI & ML': { etfs: ['AIS', 'AOTG', 'AIFD'], series: { '1W': [100, 103.05, 99.12, 100.31, 103.83], '1M': [100, 97.27, 102.27, 102.96, 107.78, 104.43, 105.14, 109.75, 110.97, 104.24, 103.58, 106.21, 103.79, 106.73, 110.17, 105.85, 101.35, 104.44, 100.46, 101.66, 105.23], 'YTD': [100, 102.31, 103.37, 104.56, 105.1, 104.72, 103.11, 105.26, 101.82, 104.34, 104.53, 104.22, 101.85, 109.64, 117.88, 122.84, 129.79, 140.16, 140.13, 144.24, 158.42, 149.36, 154.06, 153.64, 156.18, 154.85], '6M': [100, 100.54, 101.35, 101.71, 101.31, 99.73, 101.77, 101.79, 100.79, 101.42, 100.13, 91.39, 100.46, 111.71, 116.46, 118.66, 129.55, 135.08, 131.01, 145.41, 156.69, 141.63, 148.43, 147.92, 150.46, 149.22], '1Y': [100, 100.84, 102.62, 105.02, 104.41, 106.38, 102.96, 105.31, 105.05, 110.75, 113.27, 114.81, 117.84, 122.44, 120.48, 120.13, 129.87, 126.56, 124.48, 117.47, 118.12, 121.94, 126.28, 116.06, 124.17, 125.19, 126.9, 127.86, 128.91, 129.68, 129.47, 127.59, 127.76, 130.38, 128.81, 129.93, 128.12, 116.8, 128.63, 143.5, 149.68, 152.64, 167.27, 174.68, 169.3, 188.79, 203.36, 183.52, 192.68, 192.51, 195.34, 193.52] }, returns: { '1W': 3.8, '1M': 5.2, 'YTD': 54.8, '6M': 49.2, '1Y': 93.5 } },
  'Semiconductors': { etfs: ['DRAM', 'PSI', 'XSD'], series: { '1W': [100, 103.52, 96.69, 98.93, 104.53], '1M': [100, 96.74, 106.52, 108, 114.59, 108.91, 109.95, 118.55, 122.84, 110.79, 110.02, 116.22, 109.94, 113.32, 118.33, 109.35, 100.52, 104.05, 97.17, 99.42, 105.06], 'YTD': [100, 110.95, 114.2, 117.01, 119.09, 124.34, 126.06, 126.52, 126.39, 130.06, 140.55, 142.41, 135.22, 149.04, 163.94, 182.09, 192.48, 194.27, 197.85, 212.93, 219.36, 209.4, 218.55, 211.56, 213.26, 206.41], '6M': [100, 107.76, 106.83, 111.06, 114.09, 116.94, 119.22, 117.82, 117.6, 123.45, 134.01, 127.12, 129.76, 145.32, 160.01, 171.23, 185.76, 181.52, 183.21, 206.54, 214.05, 195.43, 205.94, 198.9, 200.29, 194.22], '1Y': [100, 101.21, 105.08, 106, 104.33, 110.06, 108.13, 112.39, 111.18, 114.73, 120.25, 121.34, 124.97, 127.13, 129.28, 127.81, 137.59, 139.98, 141.22, 139.83, 144.93, 147, 154.12, 141.39, 144.1, 146.38, 156.67, 157.77, 165.82, 170.79, 174.78, 180.8, 181.61, 177.75, 158.53, 165.55, 162.27, 164.19, 174.35, 195.51, 203.71, 215.25, 237.06, 233.45, 236.49, 252.52, 255.86, 233.21, 237.22, 242.52, 243.06, 237.52] }, returns: { '1W': 4.5, '1M': 5.1, 'YTD': 106.4, '6M': 94.2, '1Y': 137.5 } },
  'Broad Tech': { etfs: ['WGMI', 'PTF', 'SGRT'], series: { '1W': [100, 103.51, 97.51, 101.01, 106.59], '1M': [100, 96.61, 103.11, 105.45, 110.09, 108.11, 108.25, 111.99, 113.28, 108.27, 105.2, 106.88, 104.24, 105.11, 107.11, 100.45, 91.87, 95, 89.56, 92.72, 97.83], 'YTD': [100, 107.37, 113.44, 114.56, 112.2, 114.68, 110.55, 116.16, 109.89, 108.67, 110.59, 112.57, 105.85, 119.91, 127.7, 134.51, 135.28, 149.88, 148.72, 154.31, 167.5, 158.13, 166.3, 161.65, 153.99, 149.86], '6M': [100, 106.14, 102.66, 102.74, 105.15, 101.57, 106.67, 106.61, 98.85, 101.87, 101.1, 90.12, 101.93, 116.92, 119.49, 117.8, 132.84, 137.82, 130.53, 148.19, 156.96, 140.52, 151.94, 147.76, 141.16, 137.32], '1Y': [100, 102.36, 104.45, 102.82, 104.94, 106.07, 106.76, 111.66, 114.58, 123.12, 130.74, 139.22, 140.22, 153.36, 166.53, 140.32, 157.58, 162.86, 144.47, 129.32, 137.6, 140.17, 144.58, 127.83, 138.06, 138.51, 143.46, 153.73, 147.93, 149.47, 150.78, 143.55, 143.41, 146.32, 137.46, 139.9, 142.65, 133.86, 147.92, 165.98, 166.98, 172.23, 189.87, 191.99, 189.39, 210.48, 217.89, 203.06, 217.92, 212.4, 195.65, 194.12] }, returns: { '1W': 6.6, '1M': -2.2, 'YTD': 49.9, '6M': 37.3, '1Y': 94.1 } },
  'Electrification': { etfs: ['VOLT', 'POW', 'PBW'], series: { '1W': [100, 101.38, 96.77, 96.53, 98.4], '1M': [100, 96.68, 101.17, 102, 104.76, 103.57, 103.68, 106.15, 107.28, 102.39, 101.58, 102.36, 99.37, 101.84, 104.33, 101.04, 97.58, 98.91, 94.44, 94.21, 96.03], 'YTD': [100, 104.13, 109.93, 112.37, 112.15, 118.01, 118.49, 122.22, 115.66, 115.96, 116.11, 119.56, 116.34, 123.8, 127.86, 135.67, 142.71, 146.47, 142.92, 144.82, 146.92, 138.96, 142.31, 139.61, 138.8, 131.9], '6M': [100, 106, 106.25, 106.61, 112.21, 112.76, 116.32, 115.07, 109.28, 110.95, 110.78, 105.55, 111.05, 122.01, 124.16, 128.52, 139.19, 139.25, 128.33, 142.56, 142.41, 130.6, 135.41, 132.94, 132.14, 125.6], '1Y': [100, 101.47, 105.5, 103.66, 102.35, 104.81, 103.92, 107.52, 105.46, 107.08, 109.23, 112.96, 116.56, 120.18, 127.54, 120.65, 125.82, 126.25, 124.93, 119.96, 120.78, 124.53, 128.11, 122.52, 129.39, 127.52, 127.45, 133.33, 134.66, 132.69, 136.93, 136.2, 137.15, 140.88, 136.92, 139.55, 142.8, 140.35, 146.74, 155.68, 156.99, 153.08, 164.05, 166.57, 158.44, 168.3, 171.79, 160.35, 162.32, 160.09, 157.85, 151.3] }, returns: { '1W': -1.6, '1M': -4, 'YTD': 31.9, '6M': 25.6, '1Y': 51.3 } },
  'Industrials': { etfs: ['RSHO', 'PRN', 'BILT'], series: { '1W': [100, 100.4, 100, 98.62, 100.08], '1M': [100, 98.87, 101.25, 100.68, 100.38, 100.46, 98.84, 101.09, 102.51, 101.92, 101.92, 103.71, 102.69, 102.58, 103.25, 102.85, 100.29, 100.69, 100.32, 98.92, 100.38], 'YTD': [100, 102.86, 107.52, 107.45, 108.46, 115.36, 118.73, 119.8, 117.85, 113.28, 111.35, 112.9, 111.05, 117.43, 120.7, 122.44, 123.98, 125.58, 126.32, 123.7, 126.58, 126.9, 125.96, 129.85, 131.12, 127.69], '6M': [100, 104.15, 104.99, 105.26, 109.36, 113.97, 116.63, 116.65, 111.78, 110, 108.55, 107.18, 110.05, 114.61, 117.59, 117.97, 121.41, 122.62, 120.95, 121.81, 124.23, 123.36, 122.17, 125.94, 127.19, 123.95], '1Y': [100, 101.09, 102.66, 103.5, 102.35, 103.07, 101.98, 103.85, 102.22, 103.68, 104.93, 105.45, 107.2, 108.29, 107.85, 106.4, 110.91, 108.4, 108.49, 104.26, 105.26, 106.23, 108.2, 106.6, 110.16, 109.38, 112.14, 116.77, 118.02, 119.57, 124.29, 127.69, 128.62, 127.78, 122.83, 119.26, 120.44, 120.11, 122.99, 130.34, 130.05, 132.25, 135.86, 138.39, 134.73, 136.69, 138.12, 137.8, 137.94, 140.8, 141.9, 138.06] }, returns: { '1W': 0.1, '1M': 0.4, 'YTD': 27.7, '6M': 24, '1Y': 38.1 } },
  'Meme': { etfs: ['BUZZ', 'RKNG', 'MEME'], series: { '1W': [100, 101.87, 96.56, 97.95, 101.97], '1M': [100, 97.26, 103.6, 102.22, 107.95, 103.68, 104.35, 108.06, 107.94, 102.9, 99.43, 98.92, 96.82, 101.04, 103.14, 99.23, 94.03, 95.8, 90.88, 92.15, 95.87], 'YTD': [100, 106.79, 105.55, 105.8, 99.12, 99.94, 93.39, 94.54, 93.41, 93.13, 90.43, 93.72, 91.36, 100.82, 113.7, 112.85, 116.32, 125.35, 126.34, 135.76, 140.86, 128.78, 128.2, 122.8, 121.97, 117.57], '6M': [100, 101.11, 93.17, 89.94, 89.67, 85.63, 85.84, 85.65, 85.12, 85.73, 80.41, 76.31, 84.92, 98.04, 102.31, 98.75, 108.46, 114.22, 109.25, 124.47, 128.35, 112.53, 115.38, 110.62, 109.94, 106.09], '1Y': [100, 103.74, 99.9, 94.77, 91.29, 91.5, 87.51, 84.09, 83.46, 83.91, 86.38, 89.32, 88.8, 88.6, 90.46, 85.97, 90.95, 90.43, 90.75, 88.01, 85, 86.17, 85.66, 85.93, 86.46, 88.01, 92.22, 90.91, 90.66, 89.88, 90.17, 89.21, 89.23, 90.11, 93.85, 96.22, 95.84, 93.06, 96.78, 104.34, 110.86, 109.89, 105.01, 114.84, 114.74, 112.24, 115.55, 109.2, 109.87, 105.93, 100.16, 102.58] }, returns: { '1W': 2, '1M': -4.1, 'YTD': 17.6, '6M': 6.1, '1Y': 2.6 } },
};
// @@END_GENERATED:THEME_REPRESENTATIVES@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 9, avgWeight: 6.81, proScore: 6.13, coverage: 0.9,
      price: 204.03, weeklyPrices: [194.83, 195.55, 196.93, 204.12, 204.03], weeklyChange: 4.72, dayChange: -0.04, sortRank: 0, periodReturns: { '1M': -2, 'YTD': 9.4, '6M': 10.4, '1Y': 25.3 },
      priceHistory: { '1D': [204.12, 201.68, 202.1, 200.07, 199.77, 200.37, 200.88, 201.38, 201.25, 201.28, 201.73, 202.11, 202.02, 202.18, 201.78, 201.71, 203.07, 203.01, 203.22, 203.37, 203.45, 203.3, 203.78, 204.03], '1W': [194.83, 195.55, 196.93, 204.12, 204.03], '1M': [208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 196.93, 204.12, 204.03], 'YTD': [186.5, 185.04, 187.05, 187.67, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 198.45, 215.2, 225.32, 215.33, 224.36, 208.64, 207.41, 199, 197.58, 204.03], '6M': [184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 214.86, 222.82, 208.19, 207.41, 199, 197.58, 204.03], '1Y': [162.88, 171.37, 170.78, 179.27, 179.42, 181.59, 175.4, 181.77, 170.62, 177.33, 170.29, 176.97, 187.24, 189.11, 179.83, 180.28, 207.04, 195.21, 193.8, 186.52, 177.82, 179.59, 183.78, 170.94, 188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 214.86, 222.82, 208.19, 207.41, 199, 197.58, 204.03] },
      velocityScore: { '1D': 2.2, '1W': 1, '1M': 8.3, '6M': null }, isNew: false,
      marketCap: '$4.9T', pe: 31.2, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: null,
      etfPresence: { AIS: 2.65, ARTY: 4.78, BAI: 4.44, IGPT: 8.01, IVES: 4.88, ALAI: 12.96, CHAT: 7.29, AIFD: 6.28, SPRX: false, AOTG: 9.98 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 5.62, proScore: 5.06, coverage: 0.9,
      price: 1014.62, weeklyPrices: [975.56, 984.75, 938.38, 948.80, 1014.62], weeklyChange: 4, dayChange: 6.94, sortRank: 0, periodReturns: { '1M': 8.4, 'YTD': 255.5, '6M': 194, '1Y': 730 },
      priceHistory: { '1D': [948.8, 1017.05, 1027.72, 1027.4, 1013.84, 1013.47, 1013.52, 1018.79, 1015.78, 1018.48, 1019.58, 1017.6, 1018.92, 1014.65, 1013.34, 1014.3, 1022.69, 1024.74, 1023.87, 1024.57, 1022.83, 1019.77, 1015.14, 1014.62], '1W': [975.56, 984.75, 938.38, 948.8, 1014.62], '1M': [935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 948.8, 1014.62], 'YTD': [285.41, 327.02, 336.63, 399.65, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 542.21, 746.81, 724.66, 751, 1035.5, 949.28, 1020.76, 1048.51, 1032.28, 1014.62], '6M': [345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1032.28, 1014.62], '1Y': [122.24, 116.43, 109.83, 114.74, 108.78, 124.27, 117.21, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 198.47, 226.63, 237.5, 244.9, 225.92, 224.53, 234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1032.28, 1014.62] },
      velocityScore: { '1D': 0, '1W': -7.8, '1M': -9, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 23, revenueGrowth: 346, eps: 44.21, grossMargin: 73, dividendYield: null,
      etfPresence: { AIS: 6.73, ARTY: 4.75, BAI: 6.16, IGPT: 7.66, IVES: 4.46, ALAI: 0.87, CHAT: 3.53, AIFD: 6.53, SPRX: false, AOTG: 9.89 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.57, proScore: 5.01, coverage: 0.9,
      price: 546.64, weeklyPrices: [517.82, 552.05, 516.11, 517.41, 546.64], weeklyChange: 5.57, dayChange: 5.65, sortRank: 0, periodReturns: { '1M': 15, 'YTD': 155.3, '6M': 169.1, '1Y': 294.9 },
      priceHistory: { '1D': [517.4, 549.87, 556.3, 554.49, 551.14, 557.93, 554.23, 555.42, 554.61, 553.95, 554.53, 556.35, 554.73, 551.61, 552.49, 551.34, 551.76, 550.85, 547.91, 548.83, 546.75, 546.51, 545.66, 546.64], '1W': [517.82, 552.05, 516.11, 517.41, 546.64], '1M': [475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 517.41, 546.64], 'YTD': [214.16, 204.68, 227.92, 259.68, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 360.54, 455.19, 424.1, 467.51, 510.13, 490.33, 507.29, 519.74, 540.88, 546.64], '6M': [203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 503.89, 521.54, 475.51, 507.29, 519.74, 540.88, 546.64], '1Y': [138.41, 160.08, 158.65, 179.51, 163.12, 184.42, 165.2, 166.62, 162.13, 159.54, 159.16, 160.88, 164.01, 235.56, 238.6, 230.23, 264.33, 256.33, 258.89, 223.55, 206.13, 217.6, 221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 503.89, 521.54, 475.51, 507.29, 519.74, 540.88, 546.64] },
      velocityScore: { '1D': -0.2, '1W': -0.6, '1M': 7.7, '6M': null }, isNew: false,
      marketCap: '$891B', pe: 182.2, revenueGrowth: 38, eps: 3, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 5.09, ARTY: 5, BAI: 5.11, IGPT: 8.52, IVES: 4.62, ALAI: 1.29, CHAT: 3.84, AIFD: false, SPRX: 0.67, AOTG: 15.95 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.76, proScore: 3.01, coverage: 0.8,
      price: 405.51, weeklyPrices: [360.45, 373.90, 370.78, 388.69, 405.51], weeklyChange: 12.5, dayChange: 4.33, sortRank: 0, periodReturns: { '1M': 3.4, 'YTD': 17.2, '6M': 17.5, '1Y': 45.9 },
      priceHistory: { '1D': [388.69, 397.52, 393.8, 392.73, 391.57, 393.99, 394.08, 394.32, 397.98, 400.17, 400.8, 400.91, 401.4, 401.19, 403.11, 402.66, 403.8, 404.08, 405.75, 406.06, 405.41, 404.61, 405.36, 405.51], '1W': [360.45, 373.9, 370.78, 388.69, 405.51], '1M': [392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 370.78, 388.69, 405.51], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 421.28, 430, 425.19, 414.14, 459.97, 396.6, 376.71, 382.07, 369.34, 405.51], '6M': [344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 422.01, 481.57, 392.16, 376.71, 382.07, 369.34, 405.51], '1Y': [277.9, 280.81, 283.69, 302.62, 301.67, 309.09, 291.17, 298.01, 302.39, 369.57, 346.17, 339.31, 333.39, 345.5, 351.33, 340.3, 385.98, 358.98, 355.22, 354.42, 385.03, 380.61, 412.97, 326.02, 350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 422.01, 481.57, 392.16, 376.71, 382.07, 369.34, 405.51] },
      velocityScore: { '1D': 3.4, '1W': 8.7, '1M': 19.4, '6M': null }, isNew: false,
      marketCap: '$1.9T', pe: 67.4, revenueGrowth: 48, eps: 6.02, grossMargin: 76, dividendYield: 0.67,
      etfPresence: { AIS: 0.72, ARTY: 4.69, BAI: 4.55, IGPT: false, IVES: 4.78, ALAI: 4.1, CHAT: 4.71, AIFD: 5.17, SPRX: false, AOTG: 1.4 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 7, avgWeight: 3.21, proScore: 2.25, coverage: 0.7,
      price: 246.65, weeklyPrices: [245.29, 249.27, 230.70, 231.71, 246.65], weeklyChange: 0.55, dayChange: 6.45, sortRank: 0, periodReturns: { '1M': -7.6, 'YTD': 190.2, '6M': 196.4, '1Y': 241.3 },
      priceHistory: { '1D': [231.71, 249.33, 248.67, 247.8, 244.5, 245.62, 246.34, 247.23, 247.04, 246.74, 247.74, 247.96, 247.6, 246.91, 246.75, 246.54, 247.38, 248.41, 248.16, 247.23, 247.94, 247.37, 246.06, 246.65], '1W': [245.29, 249.27, 230.7, 231.71, 246.65], '1M': [266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 245.29, 249.27, 230.7, 231.71, 246.65], 'YTD': [84.98, 83.45, 80.38, 80.23, 78.66, 82.35, 79.01, 78.39, 77.51, 93.3, 87.62, 98.45, 106.71, 119.93, 133.37, 165.56, 164.95, 170.13, 176.89, 196.33, 219.43, 288.85, 278.67, 276.7, 272.05, 246.65], '6M': [83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 208.26, 290.79, 266.88, 278.67, 276.7, 272.05, 246.65], '1Y': [72.26, 70.85, 73.27, 81.74, 75.32, 79.32, 71.22, 74.26, 62.31, 67.1, 70.98, 80.09, 83.89, 92.5, 88.89, 81.05, 90.15, 92.9, 89.33, 81.32, 83.43, 100.2, 92.47, 81.7, 86.49, 89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 208.26, 290.79, 266.88, 278.67, 276.7, 272.05, 246.65] },
      velocityScore: { '1D': 0.9, '1W': -11.1, '1M': -14.4, '6M': null }, isNew: false,
      marketCap: '$216B', pe: 84.5, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.1,
      etfPresence: { AIS: 3.65, ARTY: 3.78, BAI: 1.77, IGPT: 3.11, IVES: false, ALAI: false, CHAT: 1.42, AIFD: 5.51, SPRX: 3.24, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 5.18, proScore: 3.11, coverage: 0.6,
      price: 356.82, weeklyPrices: [359.91, 366.46, 367.03, 361.92, 356.82], weeklyChange: -0.86, dayChange: -1.41, sortRank: 0, periodReturns: { '1M': -2, 'YTD': 14, '6M': 8.6, '1Y': 102 },
      priceHistory: { '1D': [361.92, 358.2, 356.67, 354.29, 351.61, 354.15, 353.14, 352.55, 352.84, 353.54, 352.54, 353.05, 353.44, 354.49, 355.3, 355.32, 355.07, 355.45, 355.58, 356.11, 356.99, 357.22, 356.77, 356.82], '1W': [359.91, 366.46, 367.03, 361.92, 356.82], '1M': [364.26, 356.38, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03, 349.68, 346.13, 345.29, 343.71, 337.39, 353.65, 357.37, 361.21, 359.91, 366.46, 367.03, 361.92, 356.82], 'YTD': [313, 325.44, 332.78, 327.93, 343.69, 324.32, 302.02, 310.9, 303.58, 307.04, 307.69, 290.93, 297.39, 318.49, 336.02, 338.89, 385.69, 400.8, 396.78, 382.97, 376.37, 363.31, 373.25, 345.29, 361.21, 356.82], '6M': [328.57, 330, 333.26, 343.69, 324.32, 302.02, 310.9, 306.52, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 387.35, 387.66, 388.88, 361.85, 364.26, 373.25, 345.29, 361.21, 356.82], '1Y': [176.62, 182.97, 190.23, 196.53, 196.09, 201.96, 199.32, 207.14, 230.66, 239.17, 249.53, 247.14, 244.9, 244.62, 251.03, 251.69, 274.57, 284.31, 286.71, 292.81, 323.44, 319.63, 320.21, 296.72, 314.09, 315.15, 328.57, 330, 333.26, 343.69, 324.32, 302.02, 311.49, 306.52, 306.36, 305.56, 302.06, 273.5, 305.46, 332.91, 332.29, 349.78, 388.43, 387.35, 387.66, 388.88, 361.85, 364.26, 373.25, 345.29, 361.21, 356.82] },
      velocityScore: { '1D': -1.6, '1W': 5.1, '1M': 16, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.2, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.39, IGPT: 8.13, IVES: 4.75, ALAI: false, CHAT: 5.66, AIFD: 5.15, SPRX: false, AOTG: 4.02 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 6, avgWeight: 4.87, proScore: 2.92, coverage: 0.6,
      price: 440.44, weeklyPrices: [434.16, 451.79, 432.57, 436.98, 440.44], weeklyChange: 1.45, dayChange: 0.79, sortRank: 0, periodReturns: { '1M': 2.9, 'YTD': 44.9, '6M': 36.1, '1Y': 90 },
      priceHistory: { '1D': [436.98, 442.97, 443.02, 443.82, 440.86, 441.82, 442.01, 442.76, 442.07, 444.05, 444.15, 444.08, 442.57, 441.8, 441.29, 441.36, 442.71, 442.85, 442.33, 440.84, 440.41, 439.33, 439.08, 440.44], '1W': [434.16, 451.79, 432.57, 436.98, 440.44], '1M': [427.92, 408.75, 421.07, 423.93, 441.4, 425.83, 432.15, 462.12, 467.67, 436.39, 440.83, 434.99, 432.35, 455.1, 477.57, 444.23, 434.16, 451.79, 432.57, 436.98, 440.44], 'YTD': [303.89, 318.01, 341.64, 334.87, 341.36, 355.41, 364.2, 385.75, 353.13, 347.09, 339.57, 347.75, 341.49, 365.49, 363.35, 382.66, 397.67, 411.68, 404.35, 404.52, 435.63, 426.8, 425.83, 440.83, 444.23, 440.44], '6M': [323.63, 342.4, 332.71, 341.36, 355.41, 364.2, 385.75, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 392.61, 412.32, 446.69, 427.92, 425.83, 440.83, 444.23, 440.44], '1Y': [231.84, 237.56, 240.33, 242.91, 231.37, 241.44, 228.6, 238.72, 231.39, 260.44, 262.79, 280.71, 288.47, 304.52, 304.71, 288.88, 305.09, 293.64, 290.62, 282.37, 284.68, 295.45, 310.14, 276.96, 298.8, 319.61, 323.63, 342.4, 332.71, 341.36, 355.41, 364.2, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 392.61, 412.32, 446.69, 427.92, 425.83, 440.83, 444.23, 440.44] },
      velocityScore: { '1D': -0.3, '1W': 0.7, '1M': 9.4, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 38.3, revenueGrowth: 35, eps: 11.49, grossMargin: 62, dividendYield: null,
      etfPresence: { AIS: 3.49, ARTY: false, BAI: 4.71, IGPT: false, IVES: 4.88, ALAI: 5.47, CHAT: false, AIFD: 3.42, SPRX: false, AOTG: 7.27 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 6, avgWeight: 2.58, proScore: 1.55, coverage: 0.6,
      price: 184.98, weeklyPrices: [159.99, 173.28, 166.46, 181.05, 184.98], weeklyChange: 15.62, dayChange: 2.17, sortRank: 0, periodReturns: { '1M': 21.6, 'YTD': 41.2, '6M': 50.5, '1Y': 74 },
      priceHistory: { '1D': [181.05, 186.13, 185.5, 184, 181.48, 181.12, 180.82, 181.73, 184.12, 185.38, 185.21, 184.42, 184.64, 184.39, 184.59, 183.63, 184.11, 184.48, 184.85, 184.6, 185.2, 185.05, 185.01, 184.98], '1W': [159.99, 173.28, 166.46, 181.05, 184.98], '1M': [152.16, 151.76, 156.4, 163.24, 169.09, 168.01, 164.93, 169.67, 174.56, 162.2, 161.74, 165.45, 157.6, 164.1, 169.88, 166.62, 159.99, 173.28, 166.46, 181.05, 184.98], 'YTD': [131.03, 123.72, 130.59, 136.34, 138.37, 141.74, 142.58, 128.77, 124.6, 139.62, 136.07, 135.01, 124.85, 146.05, 161.01, 172.55, 172.7, 141.77, 141.97, 154.03, 170.68, 156.4, 168.01, 161.74, 166.62, 184.98], '6M': [122.89, 129.83, 143.72, 138.37, 141.74, 142.58, 128.77, 129.3, 137.17, 135.35, 135.88, 116.13, 133.64, 154.37, 172.86, 165.29, 170.22, 142.54, 141.58, 158.01, 175.33, 152.16, 168.01, 161.74, 166.62, 184.98], '1Y': [106.28, 108.3, 113.04, 122.09, 138.78, 138.01, 131.47, 134.27, 137.38, 150.72, 142.84, 142.64, 149.27, 157.36, 143.38, 146.59, 162.03, 140.42, 134.98, 124.81, 125.04, 127.8, 132.36, 122.36, 130.77, 133.6, 122.89, 129.83, 143.72, 138.37, 141.74, 142.58, 127.43, 129.3, 137.17, 135.35, 135.88, 116.13, 133.64, 154.37, 172.86, 165.29, 170.22, 142.54, 141.58, 158.01, 175.33, 152.16, 168.01, 161.74, 166.62, 184.98] },
      velocityScore: { '1D': 6.2, '1W': 11.5, '1M': 6.9, '6M': null }, isNew: false,
      marketCap: '$233B', pe: 63.6, revenueGrowth: 35, eps: 2.91, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.7, ARTY: 2.77, BAI: 1.55, IGPT: false, IVES: false, ALAI: false, CHAT: 2.39, AIFD: 4.95, SPRX: 2.14, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 6 of 10 AI & ML ETFs (60% coverage) with average weight 2.6% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 4.2, proScore: 2.1, coverage: 0.5,
      price: 616.3, weeklyPrices: [582.90, 600.29, 615.58, 603.12, 616.30], weeklyChange: 5.73, dayChange: 2.19, sortRank: 0, periodReturns: { '1M': 5.4, 'YTD': -6.6, '6M': -5.6, '1Y': -15.9 },
      priceHistory: { '1D': [603.12, 586.09, 590.45, 592.74, 592.61, 595.48, 599.09, 601.28, 603.6, 604.46, 605.7, 609.24, 610.22, 614.3, 613.23, 613.03, 611.63, 612.73, 612.74, 611.42, 612.67, 614.24, 615.64, 616.3], '1W': [582.9, 600.29, 615.58, 603.12, 616.3], '1M': [584.59, 570.98, 568.43, 566.98, 593.48, 600.21, 567.58, 577.22, 563.85, 562.2, 557.67, 542.87, 550.25, 562.6, 563.29, 612.91, 582.9, 600.29, 615.58, 603.12, 616.3], 'YTD': [660.09, 646.06, 620.8, 658.76, 706.41, 677.22, 639.29, 639.3, 655.08, 654.07, 615.68, 594.89, 579.23, 628.39, 676.87, 659.15, 608.75, 609.63, 614.23, 610.26, 600.47, 585.39, 600.21, 557.67, 612.91, 616.3], '6M': [653.06, 620.25, 672.36, 706.41, 677.22, 639.29, 639.3, 653.56, 647.39, 627.45, 604.06, 536.38, 575.05, 662.49, 668.84, 671.34, 604.96, 603, 602.61, 612.34, 597.63, 584.59, 600.21, 557.67, 612.91, 616.3], '1Y': [732.78, 702.91, 713.58, 695.21, 771.99, 780.08, 747.72, 754.1, 737.05, 751.98, 775.72, 760.66, 717.34, 717.84, 717.55, 733.41, 751.67, 635.95, 609.01, 590.32, 636.22, 639.6, 650.13, 649.5, 667.55, 650.41, 653.06, 620.25, 672.36, 706.41, 677.22, 639.29, 637.25, 653.56, 647.39, 627.45, 604.06, 536.38, 575.05, 662.49, 668.84, 671.34, 604.96, 603, 602.61, 612.34, 597.63, 584.59, 600.21, 557.67, 612.91, 616.3] },
      velocityScore: { '1D': -2.8, '1W': 1.4, '1M': 46.9, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: 22.4, revenueGrowth: 33, eps: 27.5, grossMargin: 82, dividendYield: 0.35,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 8.53, IVES: 4.93, ALAI: 4.2, CHAT: 2.23, AIFD: false, SPRX: false, AOTG: 1.13 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 4, proScore: 2, coverage: 0.5,
      price: 244.82, weeklyPrices: [242.67, 244.16, 245.98, 243.62, 244.82], weeklyChange: 0.89, dayChange: 0.49, sortRank: 0, periodReturns: { '1M': 0.3, 'YTD': 6.1, '6M': -1, '1Y': 10 },
      priceHistory: { '1D': [243.62, 241.85, 242.71, 241.62, 240.79, 241.49, 241.18, 241.15, 241.68, 241.23, 241.71, 241.68, 241.63, 242.34, 242.16, 242.21, 243.28, 243.03, 244.3, 243.54, 244.07, 244.67, 244.94, 244.82], '1W': [242.67, 244.16, 245.98, 243.62, 244.82], '1M': [244.19, 238, 241.51, 238.55, 246.02, 246, 237.5, 244.39, 232.79, 234.11, 234.27, 227.01, 232.69, 240.14, 238.34, 241.7, 242.67, 244.16, 245.98, 243.62, 244.82], 'YTD': [230.82, 246.29, 238.18, 239.16, 242.96, 208.72, 201.15, 208.56, 208.73, 214.33, 209.87, 211.71, 210.57, 233.65, 249.7, 255.08, 268.26, 272.68, 264.14, 266.32, 261.26, 245.22, 246, 234.27, 241.7, 244.82], '6M': [247.38, 239.12, 238.42, 242.96, 208.72, 201.15, 208.56, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 259.34, 265.29, 256.52, 244.19, 246, 234.27, 241.7, 244.82], '1Y': [222.54, 223.19, 228.29, 230.19, 222.31, 224.56, 223.81, 228.71, 225.99, 230.33, 231.62, 220.21, 220.63, 225.22, 215.57, 217.95, 230.3, 250.2, 244.2, 222.69, 229.67, 232.38, 231.78, 221.27, 232.38, 226.5, 247.38, 239.12, 238.42, 242.96, 208.72, 201.15, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 259.34, 265.29, 256.52, 244.19, 246, 234.27, 241.7, 244.82] },
      velocityScore: { '1D': -2, '1W': 2, '1M': 3.1, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 31.8, revenueGrowth: 17, eps: 7.7, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 4.85, ALAI: 4.92, CHAT: 2.58, AIFD: 3.55, SPRX: false, AOTG: 4.08 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.82, proScore: 1.91, coverage: 0.5,
      price: 420.03, weeklyPrices: [406.42, 432.74, 382.89, 393.16, 420.03], weeklyChange: 3.35, dayChange: 6.83, sortRank: 0, periodReturns: { '1M': 22.9, 'YTD': 152.5, '6M': 158.3, '1Y': 320.6 },
      priceHistory: { '1D': [393.16, 428, 427.86, 425.58, 415.53, 421.57, 422.02, 428.43, 425.84, 425.23, 427, 428.79, 426.98, 425.11, 427.99, 427.64, 427.87, 430.34, 428.3, 427.82, 427.56, 425.04, 420.63, 420.03], '1W': [406.42, 432.74, 382.89, 393.16, 420.03], '1M': [341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42, 432.74, 382.89, 393.16, 420.03], 'YTD': [166.36, 156.73, 174.45, 169.66, 152.44, 187.67, 123.69, 128.4, 109.8, 116.48, 126.34, 120.33, 106.33, 129.46, 170.81, 197.54, 202.68, 199.79, 232.68, 306.88, 320.09, 346.33, 361.71, 399.92, 430.86, 420.03], '6M': [162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.4, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 318.72, 355.76, 341.7, 361.71, 399.92, 430.86, 420.03], '1Y': [99.86, 91.94, 119.48, 128.87, 174.39, 193.64, 172.45, 178.56, 176.61, 230.37, 249.38, 205.27, 194.5, 219.36, 161.46, 154.85, 173.62, 181.94, 157.79, 142.01, 144.78, 152.5, 164.32, 140.24, 169.97, 179.56, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 318.72, 355.76, 341.7, 361.71, 399.92, 430.86, 420.03] },
      velocityScore: { '1D': 9.8, '1W': 2.7, '1M': 26.5, '6M': null }, isNew: false,
      marketCap: '$72B', pe: 281.9, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 2.2, ARTY: 1.38, BAI: false, IGPT: false, IVES: false, ALAI: 1.05, CHAT: 2.36, AIFD: false, SPRX: 12.09, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.68, proScore: 1.84, coverage: 0.5,
      price: 380.8, weeklyPrices: [390.49, 386.74, 388.84, 383.34, 380.80], weeklyChange: -2.48, dayChange: -0.66, sortRank: 0, periodReturns: { '1M': -5.6, 'YTD': -21.3, '6M': -20.5, '1Y': -24.4 },
      priceHistory: { '1D': [383.34, 378.33, 378.59, 377.17, 376.12, 377.54, 377.86, 379.52, 379.67, 379.89, 380.58, 380.05, 379.43, 379.67, 379.66, 379.42, 379.56, 380.57, 380.38, 380.6, 380.56, 380.68, 380.64, 380.8], '1W': [390.49, 386.74, 388.84, 383.34, 380.8], '1M': [403.41, 397.36, 390.34, 390.74, 399.76, 393.83, 378.91, 379.4, 367.34, 373.94, 365.46, 352.83, 372.97, 368.57, 373.02, 384.28, 390.49, 386.74, 388.84, 383.34, 380.8], 'YTD': [483.62, 478.11, 456.66, 465.95, 423.37, 413.6, 396.86, 389, 403.93, 405.76, 391.79, 371.04, 369.37, 373.07, 420.26, 415.75, 414.44, 415.12, 421.92, 418.57, 460.52, 411.74, 393.83, 365.46, 384.28, 380.8], '6M': [479.28, 459.86, 470.28, 423.37, 413.6, 396.86, 389, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 417.42, 416.03, 441.31, 403.41, 393.83, 365.46, 384.28, 380.8], '1Y': [503.51, 505.62, 505.87, 513.24, 524.94, 520.58, 505.72, 502.04, 505.35, 500.37, 510.02, 510.15, 519.71, 524.85, 513.43, 520.54, 541.55, 507.16, 511.14, 487.12, 476.99, 477.73, 478.56, 476.12, 488.02, 472.94, 479.28, 459.86, 470.28, 423.37, 413.6, 396.86, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 417.42, 416.03, 441.31, 403.41, 393.83, 365.46, 384.28, 380.8] },
      velocityScore: { '1D': -1.6, '1W': 3.4, '1M': 7, '6M': null }, isNew: false,
      marketCap: '$2.8T', pe: 22.7, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 0.95,
      etfPresence: { AIS: false, ARTY: 2.62, BAI: false, IGPT: false, IVES: 4.7, ALAI: 5.11, CHAT: 2.39, AIFD: false, SPRX: false, AOTG: 3.58 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 5, avgWeight: 2.57, proScore: 1.29, coverage: 0.5,
      price: 788.5, weeklyPrices: [728.32, 731.25, 698.91, 707.10, 788.50], weeklyChange: 8.26, dayChange: 11.51, sortRank: 0, periodReturns: { '1M': -4, 'YTD': 113.9, '6M': 124.4, '1Y': 771.8 },
      priceHistory: { '1D': [707.1, 792.35, 792.43, 795.63, 776.35, 784.22, 784.59, 790.08, 787.39, 789.68, 789.83, 793.08, 790.04, 789.45, 788.89, 786.91, 789.54, 790.63, 793.29, 792.29, 795.05, 794, 787.37, 788.5], '1W': [728.32, 731.25, 698.91, 707.1, 788.5], '1M': [821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06, 801.16, 728.32, 731.25, 698.91, 707.1, 788.5], 'YTD': [368.59, 348.26, 343.27, 339.19, 423.42, 577.15, 600.42, 688.27, 694.43, 672, 700.81, 777.17, 764.65, 894.13, 891.22, 846.89, 949.93, 903.8, 970.7, 946.9, 905, 895.4, 875.36, 842.53, 801.16, 788.5], '6M': [351.42, 324.25, 332.45, 423.42, 577.15, 600.42, 688.27, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 890.09, 910.81, 1029.15, 821.76, 875.36, 842.53, 801.16, 788.5], '1Y': [90.44, 99.63, 102.13, 109.85, 110.01, 120.23, 115.89, 124.62, 134.12, 164.88, 163.34, 152.75, 171.4, 163.09, 156.57, 158.06, 214.28, 232.75, 253.81, 268.92, 291.27, 302.98, 366, 320.25, 395.92, 386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 600.42, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 890.09, 910.81, 1029.15, 821.76, 875.36, 842.53, 801.16, 788.5] },
      velocityScore: { '1D': 5.7, '1W': 1.6, '1M': 3.2, '6M': null }, isNew: false,
      marketCap: '$61B', pe: 139.3, revenueGrowth: 90, eps: 5.66, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.34, IGPT: false, IVES: false, ALAI: 1.24, CHAT: 1.38, AIFD: 4.21, SPRX: 3.69, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 5 of 10 AI & ML ETFs (50% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 5, avgWeight: 2.21, proScore: 1.11, coverage: 0.5,
      price: 1932.19, weeklyPrices: [1745.00, 1744.43, 1617.70, 1727.18, 1932.19], weeklyChange: 10.73, dayChange: 11.87, sortRank: 0, periodReturns: { '1M': 17.3, 'YTD': 714, '6M': 412, '1Y': 4082.2 },
      priceHistory: { '1D': [1727.18, 1813.83, 1844, 1855.45, 1832.64, 1845.9, 1856.69, 1876.16, 1879.85, 1884.53, 1877.9, 1880.81, 1882.23, 1881.77, 1882.18, 1878.81, 1903.25, 1917, 1934.95, 1940.36, 1948.39, 1944.47, 1941.82, 1932.19], '1W': [1745, 1744.43, 1617.7, 1727.18, 1932.19], '1M': [1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745, 1744.43, 1617.7, 1727.18, 1932.19], 'YTD': [237.38, 334.54, 409.24, 473.83, 665.24, 583.4, 590.59, 638.52, 565.41, 618.89, 753.69, 677.86, 692.73, 851.57, 919.47, 932.43, 1187, 1562.34, 1407.61, 1478.69, 1761.43, 1642, 1991.55, 1914.46, 2032.22, 1932.19], '6M': [377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46, 2032.22, 1932.19], '1Y': [46.2, 41.36, 43, 43.39, 42.1, 47.01, 44.4, 47.35, 53.01, 73.92, 93.97, 99.83, 121.12, 131.88, 144.3, 146.95, 204.36, 216.5, 283.1, 245.96, 220.5, 194.38, 232.86, 206.83, 250.08, 275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46, 2032.22, 1932.19] },
      velocityScore: { '1D': 4.7, '1W': -10.5, '1M': 54.2, '6M': null }, isNew: false,
      marketCap: '$286B', pe: 66.2, revenueGrowth: 251, eps: 29.19, grossMargin: 56, dividendYield: null,
      etfPresence: { AIS: 2.11, ARTY: false, BAI: 2.89, IGPT: 3.93, IVES: false, ALAI: 0.49, CHAT: false, AIFD: false, SPRX: false, AOTG: 1.64 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'CRDO', name: 'Credo Technology Group Holding Ltd', easyScore: 5, avgWeight: 2.09, proScore: 1.04, coverage: 0.5,
      price: 268.83, weeklyPrices: [241.91, 265.55, 246.40, 258.69, 268.83], weeklyChange: 11.13, dayChange: 3.92, sortRank: 0, periodReturns: { '1M': 14.7, 'YTD': 86.8, '6M': 78.7, '1Y': 175.5 },
      priceHistory: { '1D': [258.69, 272.41, 268.47, 267, 265, 270.56, 270.62, 274.19, 276.6, 276.6, 276.77, 275.96, 274.42, 272.75, 273.73, 273.65, 275.29, 276.26, 275.37, 274.2, 272.45, 271.35, 268.17, 268.83], '1W': [241.91, 265.55, 246.4, 258.69, 268.83], '1M': [234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 265.55, 246.4, 258.69, 268.83], 'YTD': [143.89, 141.59, 149.12, 133.16, 119.96, 123.41, 124.8, 120.83, 97.3, 112.33, 101.72, 103.91, 95.92, 107.93, 158.93, 185.54, 184.38, 188.51, 172.17, 218.41, 226.1, 222.27, 239.18, 268.99, 259.09, 268.83], '6M': [150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.64, 229, 234.32, 239.18, 268.99, 259.09, 268.83], '1Y': [97.59, 101.19, 98.41, 116.01, 117.34, 121.13, 105.99, 120.1, 124.77, 163.96, 164.44, 149.38, 144.91, 148.87, 131.41, 137.2, 171.52, 173.16, 160.34, 141.88, 154.18, 189.19, 157.98, 134.13, 150.19, 143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.64, 229, 234.32, 239.18, 268.99, 259.09, 268.83] },
      velocityScore: { '1D': 7.2, '1W': 8.3, '1M': 46.5, '6M': null }, isNew: false,
      marketCap: '$50B', pe: 107.1, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: 1.17, ARTY: 1.32, BAI: 2.28, IGPT: false, IVES: false, ALAI: false, CHAT: 2.04, AIFD: false, SPRX: 3.64, AOTG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, avgWeight: 3.06, proScore: 1.23, coverage: 0.4,
      price: 326.98, weeklyPrices: [300.53, 318.47, 305.58, 317.81, 326.98], weeklyChange: 8.8, dayChange: 2.88, sortRank: 0, periodReturns: { '1M': 12.9, 'YTD': 101.8, '6M': 99.9, '1Y': 154.7 },
      priceHistory: { '1D': [317.81, 331.91, 328.29, 329.74, 326.78, 327.13, 328, 328.59, 328.15, 328.79, 329.26, 327.85, 325.91, 325.64, 326.48, 325.95, 326.2, 326.88, 326.52, 326.54, 327.44, 326.97, 326.79, 326.98], '1W': [300.53, 318.47, 305.58, 317.81, 326.98], '1M': [289.52, 280.98, 297.88, 302.87, 311.93, 299.6, 317.58, 333.05, 357.96, 318.32, 316.43, 325.57, 303.95, 306.97, 334.82, 311.42, 300.53, 318.47, 305.58, 317.81, 326.98], 'YTD': [162.01, 160.78, 172.54, 182.49, 190.01, 202, 243.53, 253.15, 244.44, 270.06, 264.71, 276.16, 259.37, 287.64, 294.13, 321.75, 328.31, 339.97, 370.94, 327.46, 323.39, 300.57, 299.6, 316.43, 311.42, 326.98], '6M': [163.58, 176.93, 181.23, 190.01, 202, 243.53, 253.15, 257.75, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 322.63, 323.91, 334.49, 289.52, 299.6, 316.43, 311.42, 326.98], '1Y': [128.37, 125.4, 130.19, 144.17, 139.75, 137.4, 127.54, 127.93, 125.59, 136.74, 136.83, 141.62, 161.59, 167.38, 180.51, 171.59, 199.27, 190.71, 173.37, 170.65, 169.57, 178.88, 181.82, 149.83, 166.87, 175.61, 163.58, 176.93, 181.23, 190.01, 202, 243.53, 245.42, 257.75, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 322.63, 323.91, 334.49, 289.52, 299.6, 316.43, 311.42, 326.98] },
      velocityScore: { '1D': 2.5, '1W': 7, '1M': -6.8, '6M': null }, isNew: false,
      marketCap: '$126B', pe: 82.4, revenueGrowth: 30, eps: 3.97, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.93, ARTY: false, BAI: 2.01, IGPT: false, IVES: false, ALAI: false, CHAT: 2.29, AIFD: 4.02, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 4, avgWeight: 2.86, proScore: 1.15, coverage: 0.4,
      price: 112.71, weeklyPrices: [120.35, 122.20, 110.39, 110.24, 112.71], weeklyChange: -6.35, dayChange: 2.24, sortRank: 0, periodReturns: { '1M': 4.4, 'YTD': 205.4, '6M': 147.4, '1Y': 380.8 },
      priceHistory: { '1D': [110.24, 116.49, 115.4, 114.74, 113.23, 112.56, 112.89, 113.2, 112.64, 112.7, 113.01, 112.98, 113.14, 112.47, 112.84, 112.66, 113.11, 113.27, 112.94, 112.75, 112.83, 112.58, 112.57, 112.71], '1W': [120.35, 122.2, 110.39, 110.24, 112.71], '1M': [107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.2, 110.39, 110.24, 112.71], 'YTD': [36.9, 41.11, 48.32, 45.07, 48.81, 50.24, 46.18, 46.12, 43.1, 46.78, 45.03, 47.18, 48.03, 61.72, 68.5, 66.78, 99.62, 124.92, 108.77, 119.84, 109.33, 110.27, 117.05, 131.65, 127.02, 112.71], '6M': [45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 46.12, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 123.52, 107.93, 107.92, 117.05, 131.65, 127.02, 112.71], '1Y': [23.44, 22.69, 23.49, 20.34, 20.41, 22.22, 23.54, 24.35, 24, 24.77, 24.9, 31.22, 35.94, 37.43, 37.15, 36.92, 41.34, 38.38, 37.89, 35.11, 35.83, 43.76, 40.78, 36.05, 36.16, 39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 123.52, 107.93, 107.92, 117.05, 131.65, 127.02, 112.71] },
      velocityScore: { '1D': -0.9, '1W': -8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$566B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.25, ARTY: false, BAI: 2.92, IGPT: 4.26, IVES: false, ALAI: false, CHAT: 1.03, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 4, avgWeight: 2.82, proScore: 1.13, coverage: 0.4,
      price: 586.44, weeklyPrices: [539.00, 577.46, 532.10, 550.30, 586.44], weeklyChange: 8.8, dayChange: 6.57, sortRank: 0, periodReturns: { '1M': 13.3, 'YTD': 240.4, '6M': 192.5, '1Y': 807.2 },
      priceHistory: { '1D': [550.3, 593.15, 596.51, 597.36, 588.28, 588.52, 587.4, 587.44, 589.45, 591.01, 590.43, 588, 587.46, 587.8, 588.24, 586.2, 588.74, 589.57, 588.1, 589.47, 590.8, 588.03, 586.62, 586.44], '1W': [539, 577.46, 532.1, 550.3, 586.44], '1M': [517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 532.1, 550.3, 586.44], 'YTD': [172.27, 187.68, 222.1, 236.39, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 304.9, 296.14, 297.73, 337.88, 361.69, 403.12, 431.52, 480, 482.02, 484.28, 546.2, 526.93, 681.08, 643.83, 598.37, 586.44], '6M': [200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 524.65, 563.1, 517.72, 681.08, 643.83, 598.37, 586.44], '1Y': [64.64, 66.53, 69.32, 71.43, 73.78, 76.07, 75.64, 79.71, 86, 95.02, 100.94, 109.69, 130.59, 121.18, 120.44, 120.47, 141.38, 160.1, 166.11, 153.97, 155.41, 155.59, 181.95, 166.26, 179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 524.65, 563.1, 517.72, 681.08, 643.83, 598.37, 586.44] },
      velocityScore: { '1D': 5.6, '1W': -7.4, '1M': -1.7, '6M': null }, isNew: false,
      marketCap: '$202B', pe: 35.1, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: null,
      etfPresence: { AIS: 1.34, ARTY: 2.7, BAI: 3.13, IGPT: false, IVES: false, ALAI: 4.1, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'CRWV', name: 'COREWEAVE INC CLASS A', easyScore: 4, avgWeight: 2.56, proScore: 1.03, coverage: 0.4,
      price: 90.9, weeklyPrices: [81.75, 86.46, 83.53, 90.00, 90.90], weeklyChange: 11.2, dayChange: 1, sortRank: 0, periodReturns: { '1M': -7.7, 'YTD': 26.9, '6M': 13.4, '1Y': -40.6 },
      priceHistory: { '1D': [90, 93.47, 93.5, 93.3, 91, 92.39, 92.4, 92.51, 92.42, 92.87, 92.86, 92.68, 92.35, 91.92, 92.01, 91.81, 91.94, 91.91, 91.45, 92.12, 92.13, 91.39, 90.96, 90.9], '1W': [81.75, 86.46, 83.53, 90, 90.9], '1M': [98.45, 95.61, 95.74, 100.55, 106.71, 117.03, 115.21, 117.95, 111.29, 105.72, 100.88, 98.76, 96.58, 95.51, 99.54, 85.68, 81.75, 86.46, 83.53, 90, 90.9], 'YTD': [71.61, 77.09, 95.01, 92.98, 88.94, 96.79, 91, 99.3, 73.78, 74.92, 82.82, 87.58, 78.44, 92, 119.56, 117.42, 119.01, 114.15, 107.3, 105.49, 124.82, 102.37, 117.03, 100.88, 85.68, 90.9], '6M': [80.14, 101.23, 98.31, 88.94, 96.79, 91, 99.3, 78.05, 74.41, 85.86, 81.96, 69.15, 85.24, 117.2, 115.16, 105.53, 127.89, 107.75, 99.81, 105.89, 119.27, 98.45, 117.03, 100.88, 85.68, 90.9], '1Y': [153.05, 143.04, 126.05, 102.89, 110.24, 117.76, 91.52, 91.39, 89.88, 117.14, 120.86, 133.4, 137.05, 139.98, 139.24, 121.53, 139.93, 114.42, 85.43, 74.92, 71.29, 79.36, 88.16, 64.55, 78.87, 79.32, 80.14, 101.23, 98.31, 88.94, 96.79, 91, 90.84, 78.05, 74.41, 85.86, 81.96, 69.15, 85.24, 117.2, 115.16, 105.53, 127.89, 107.75, 99.81, 105.89, 119.27, 98.45, 117.03, 100.88, 85.68, 90.9] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$50B', pe: null, revenueGrowth: 112, eps: -2.72, grossMargin: 69, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 4.14, BAI: 1.22, IGPT: false, IVES: 1.95, ALAI: false, CHAT: 2.95, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'COREWEAVE INC CLASS A appears in 4 of 10 AI & ML ETFs (40% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 4, avgWeight: 2.51, proScore: 1.01, coverage: 0.4,
      price: 144.5, weeklyPrices: [140.27, 143.76, 141.60, 140.49, 144.50], weeklyChange: 3.02, dayChange: 2.85, sortRank: 0, periodReturns: { '1M': -29.8, 'YTD': -25.9, '6M': -27.2, '1Y': -38.7 },
      priceHistory: { '1D': [140.49, 146.85, 148.41, 147.08, 145.22, 145.52, 145, 145.4, 145.78, 145.81, 146.48, 146.38, 145.63, 145.61, 145.43, 145.09, 145.75, 145.97, 145.79, 146.2, 144.57, 143.7, 144.27, 144.5], '1W': [140.27, 143.76, 141.6, 140.49, 144.5], '1M': [205.81, 201.26, 184.1, 184.13, 192.64, 188.33, 183.53, 184.29, 175.07, 165.16, 157.53, 152.46, 148.53, 147.76, 146.55, 142.5, 140.27, 143.76, 141.6, 140.49, 144.5], 'YTD': [194.91, 189.65, 189.85, 177.16, 160.06, 156.59, 153.97, 146.14, 149.01, 149.4, 152.9, 146.02, 145.23, 137.86, 178.34, 176.28, 171.83, 195.95, 192.95, 192.08, 248.15, 211.82, 188.33, 157.53, 142.5, 144.5], '6M': [198.52, 191.09, 182.44, 160.06, 156.59, 153.97, 146.14, 149.25, 151.56, 155.97, 154.34, 138.8, 143.17, 163, 181.17, 165.96, 185.35, 186.83, 181.46, 193.06, 244.58, 205.81, 188.33, 157.53, 142.5, 144.5], '1Y': [235.81, 241.3, 241.9, 250.6, 256.43, 244.18, 235.06, 234.21, 223.45, 328.33, 301.41, 308.46, 289.01, 288.63, 303.62, 272.66, 275.3, 250.31, 226.99, 225.53, 197.03, 207.73, 223.01, 178.46, 197.49, 195.71, 198.52, 191.09, 182.44, 160.06, 156.59, 153.97, 141.31, 149.25, 151.56, 155.97, 154.34, 138.8, 143.17, 163, 181.17, 165.96, 185.35, 186.83, 181.46, 193.06, 244.58, 205.81, 188.33, 157.53, 142.5, 144.5] },
      velocityScore: { '1D': -1, '1W': null, '1M': -16.5, '6M': null }, isNew: false,
      marketCap: '$416B', pe: 24.8, revenueGrowth: 21, eps: 5.83, grossMargin: 66, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 3.13, BAI: false, IGPT: false, IVES: 2.9, ALAI: false, CHAT: 1.93, AIFD: false, SPRX: false, AOTG: 2.1 },
      tonyNote: 'Oracle lands in 3 AI ETFs on the strength of its cloud database and AI infrastructure contracts. Revenue grew 22%, 67% gross margin, P/E of 40x. The 17.5% weekly return following a major earnings beat shows how quickly sentiment can reprice; the weight score at 2.04% is still modest, meaning ETF managers have started building positions but conviction is not yet deep.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 4.92, proScore: 4.92, coverage: 1,
      price: 1014.62, weeklyPrices: [975.56, 984.75, 938.38, 948.80, 1014.62], weeklyChange: 4, dayChange: 6.94, sortRank: 0, periodReturns: { '1M': 8.4, 'YTD': 255.5, '6M': 194, '1Y': 730 },
      priceHistory: { '1D': [948.8, 1017.05, 1027.72, 1027.4, 1013.84, 1013.47, 1013.52, 1018.79, 1015.78, 1018.48, 1019.58, 1017.6, 1018.92, 1014.65, 1013.34, 1014.3, 1022.69, 1024.74, 1023.87, 1024.57, 1022.83, 1019.77, 1015.14, 1014.62], '1W': [975.56, 984.75, 938.38, 948.8, 1014.62], '1M': [935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 948.8, 1014.62], 'YTD': [285.41, 327.02, 336.63, 399.65, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 542.21, 746.81, 724.66, 751, 1035.5, 949.28, 1020.76, 1048.51, 1032.28, 1014.62], '6M': [345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1032.28, 1014.62], '1Y': [122.24, 116.43, 109.83, 114.74, 108.78, 124.27, 117.21, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 198.47, 226.63, 237.5, 244.9, 225.92, 224.53, 234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1032.28, 1014.62] },
      velocityScore: { '1D': 1.7, '1W': 7.9, '1M': -20.1, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 23, revenueGrowth: 346, eps: 44.21, grossMargin: 73, dividendYield: null,
      etfPresence: { SOXX: 7.99, PSI: 5.67, XSD: 2.55, DRAM: 3.47 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.48, proScore: 4.11, coverage: 0.75,
      price: 546.64, weeklyPrices: [517.82, 552.05, 516.11, 517.41, 546.64], weeklyChange: 5.57, dayChange: 5.65, sortRank: 0, periodReturns: { '1M': 15, 'YTD': 155.3, '6M': 169.1, '1Y': 294.9 },
      priceHistory: { '1D': [517.4, 549.87, 556.3, 554.49, 551.14, 557.93, 554.23, 555.42, 554.61, 553.95, 554.53, 556.35, 554.73, 551.61, 552.49, 551.34, 551.76, 550.85, 547.91, 548.83, 546.75, 546.51, 545.66, 546.64], '1W': [517.82, 552.05, 516.11, 517.41, 546.64], '1M': [475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 517.41, 546.64], 'YTD': [214.16, 204.68, 227.92, 259.68, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 360.54, 455.19, 424.1, 467.51, 510.13, 490.33, 507.29, 519.74, 540.88, 546.64], '6M': [203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 503.89, 521.54, 475.51, 507.29, 519.74, 540.88, 546.64], '1Y': [138.41, 160.08, 158.65, 179.51, 163.12, 184.42, 165.2, 166.62, 162.13, 159.54, 159.16, 160.88, 164.01, 235.56, 238.6, 230.23, 264.33, 256.33, 258.89, 223.55, 206.13, 217.6, 221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 503.89, 521.54, 475.51, 507.29, 519.74, 540.88, 546.64] },
      velocityScore: { '1D': -1.9, '1W': 4.8, '1M': -7.6, '6M': null }, isNew: false,
      marketCap: '$891B', pe: 182.2, revenueGrowth: 38, eps: 3, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 8.2, PSI: 5.5, XSD: 2.74, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 5.14, proScore: 3.86, coverage: 0.75,
      price: 204.03, weeklyPrices: [194.83, 195.55, 196.93, 204.12, 204.03], weeklyChange: 4.72, dayChange: -0.04, sortRank: 0, periodReturns: { '1M': -2, 'YTD': 9.4, '6M': 10.4, '1Y': 25.3 },
      priceHistory: { '1D': [204.12, 201.68, 202.1, 200.07, 199.77, 200.37, 200.88, 201.38, 201.25, 201.28, 201.73, 202.11, 202.02, 202.18, 201.78, 201.71, 203.07, 203.01, 203.22, 203.37, 203.45, 203.3, 203.78, 204.03], '1W': [194.83, 195.55, 196.93, 204.12, 204.03], '1M': [208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 196.93, 204.12, 204.03], 'YTD': [186.5, 185.04, 187.05, 187.67, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 198.45, 215.2, 225.32, 215.33, 224.36, 208.64, 207.41, 199, 197.58, 204.03], '6M': [184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 214.86, 222.82, 208.19, 207.41, 199, 197.58, 204.03], '1Y': [162.88, 171.37, 170.78, 179.27, 179.42, 181.59, 175.4, 181.77, 170.62, 177.33, 170.29, 176.97, 187.24, 189.11, 179.83, 180.28, 207.04, 195.21, 193.8, 186.52, 177.82, 179.59, 183.78, 170.94, 188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 214.86, 222.82, 208.19, 207.41, 199, 197.58, 204.03] },
      velocityScore: { '1D': 1.6, '1W': 13.2, '1M': 21.8, '6M': null }, isNew: false,
      marketCap: '$4.9T', pe: 31.2, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: null,
      etfPresence: { SOXX: 7.91, PSI: 5.09, XSD: 2.43, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.31, proScore: 3.23, coverage: 0.75,
      price: 112.71, weeklyPrices: [120.35, 122.20, 110.39, 110.24, 112.71], weeklyChange: -6.35, dayChange: 2.24, sortRank: 0, periodReturns: { '1M': 4.4, 'YTD': 205.4, '6M': 147.4, '1Y': 380.8 },
      priceHistory: { '1D': [110.24, 116.49, 115.4, 114.74, 113.23, 112.56, 112.89, 113.2, 112.64, 112.7, 113.01, 112.98, 113.14, 112.47, 112.84, 112.66, 113.11, 113.27, 112.94, 112.75, 112.83, 112.58, 112.57, 112.71], '1W': [120.35, 122.2, 110.39, 110.24, 112.71], '1M': [107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.2, 110.39, 110.24, 112.71], 'YTD': [36.9, 41.11, 48.32, 45.07, 48.81, 50.24, 46.18, 46.12, 43.1, 46.78, 45.03, 47.18, 48.03, 61.72, 68.5, 66.78, 99.62, 124.92, 108.77, 119.84, 109.33, 110.27, 117.05, 131.65, 127.02, 112.71], '6M': [45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 46.12, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 123.52, 107.93, 107.92, 117.05, 131.65, 127.02, 112.71], '1Y': [23.44, 22.69, 23.49, 20.34, 20.41, 22.22, 23.54, 24.35, 24, 24.77, 24.9, 31.22, 35.94, 37.43, 37.15, 36.92, 41.34, 38.38, 37.89, 35.11, 35.83, 43.76, 40.78, 36.05, 36.16, 39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 123.52, 107.93, 107.92, 117.05, 131.65, 127.02, 112.71] },
      velocityScore: { '1D': -2.4, '1W': -4.7, '1M': -9, '6M': null }, isNew: false,
      marketCap: '$566B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 5.69, PSI: 4.78, XSD: 2.47, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.69, proScore: 2.77, coverage: 0.75,
      price: 395.69, weeklyPrices: [377.16, 388.83, 379.03, 385.40, 395.69], weeklyChange: 4.91, dayChange: 2.67, sortRank: 0, periodReturns: { '1M': -2.2, 'YTD': 45.9, '6M': 31.5, '1Y': 63 },
      priceHistory: { '1D': [385.4, 396.02, 393.76, 393.95, 392.79, 393.61, 393.39, 394.99, 396.79, 395.58, 396.2, 397.27, 397.1, 396.25, 395.92, 395.36, 396.2, 396.72, 397.01, 396.31, 396.5, 395.9, 394.76, 395.69], '1W': [377.16, 388.83, 379.03, 385.4, 395.69], '1M': [404.62, 392.67, 412.13, 417.79, 427.58, 416, 414.45, 434.46, 445.48, 407.26, 413.16, 417.93, 386.91, 391.78, 397.17, 388.98, 377.16, 388.83, 379.03, 385.4, 395.69], 'YTD': [271.2, 299.16, 302.1, 305.6, 316.86, 322.97, 337.51, 356.09, 338.99, 318.81, 308.59, 322.03, 320.58, 351.36, 353.8, 403.88, 397.69, 416.52, 417.49, 397.07, 402.69, 403.89, 416, 413.16, 388.98, 395.69], '6M': [300.93, 300.25, 304.01, 316.86, 322.97, 337.51, 356.09, 352.41, 319.71, 310.92, 312.19, 303.1, 327.41, 348.6, 375.27, 383.26, 404.77, 419.65, 414.31, 419.94, 423.2, 404.62, 416, 413.16, 388.98, 395.69], '1Y': [242.72, 240.61, 228.08, 231.11, 220.69, 237.63, 244.87, 255.63, 244.55, 247.21, 246.32, 248.61, 239.28, 237.93, 238.15, 240.36, 235.04, 236, 241.44, 232.2, 252.02, 278.24, 281.57, 271.04, 277.56, 273.74, 300.93, 300.25, 304.01, 316.86, 322.97, 337.51, 355.15, 352.41, 319.71, 310.92, 312.19, 303.1, 327.41, 348.6, 375.27, 383.26, 404.77, 419.65, 414.31, 419.94, 423.2, 404.62, 416, 413.16, 388.98, 395.69] },
      velocityScore: { '1D': -0.4, '1W': 9.9, '1M': 12.6, '6M': null }, isNew: false,
      marketCap: '$193B', pe: 59, revenueGrowth: 37, eps: 6.71, grossMargin: 64, dividendYield: null,
      etfPresence: { SOXX: 3.81, PSI: 4.91, XSD: 2.34, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 5.96, proScore: 2.98, coverage: 0.5,
      price: 593.16, weeklyPrices: [603.04, 592.79, 554.50, 570.50, 593.16], weeklyChange: -1.64, dayChange: 3.97, sortRank: 0, periodReturns: { '1M': 18.8, 'YTD': 130.8, '6M': 96.9, '1Y': 203.6 },
      priceHistory: { '1D': [570.5, 625.61, 623.58, 624.01, 614.53, 616.42, 610.25, 610.59, 606.64, 608.34, 609.6, 607.14, 608.95, 607.48, 609.19, 608.61, 606.76, 607.29, 602.29, 599.08, 599.28, 596.65, 594.88, 593.16], '1W': [603.04, 592.79, 554.5, 570.5, 593.16], '1M': [499.21, 497.01, 552.64, 567.25, 585.78, 568.23, 592.92, 617.11, 640.18, 585.88, 588.97, 668, 626.84, 694.64, 723, 650.91, 603.04, 592.79, 554.5, 570.5, 593.16], 'YTD': [256.99, 281.64, 319.08, 322.38, 328.4, 330.57, 359.13, 377.93, 351.32, 345.88, 349.47, 369.34, 353.8, 397.81, 389.9, 403.91, 389.08, 435.44, 436.62, 432.16, 458.17, 492.17, 568.23, 588.97, 650.91, 593.16], '6M': [301.18, 327.01, 319.46, 328.4, 330.57, 359.13, 377.93, 372.18, 338.94, 346.18, 361.79, 323.12, 354.31, 395.64, 394.33, 381.11, 410.82, 431.2, 406.91, 454.89, 490.05, 499.21, 568.23, 588.97, 650.91, 593.16], '1Y': [195.39, 194.81, 187.01, 189.39, 178.14, 190.03, 160.96, 164.51, 156.25, 163.42, 178.13, 201.44, 217.74, 217.51, 227.58, 220.56, 235.75, 240.89, 230.73, 235.13, 242.46, 268.63, 275.15, 248.27, 260.78, 268.87, 301.18, 327.01, 319.46, 328.4, 330.57, 359.13, 373.55, 372.18, 338.94, 346.18, 361.79, 323.12, 354.31, 395.64, 394.33, 381.11, 410.82, 431.2, 406.91, 454.89, 490.05, 499.21, 568.23, 588.97, 650.91, 593.16] },
      velocityScore: { '1D': 0.7, '1W': -2.6, '1M': 12.5, '6M': null }, isNew: false,
      marketCap: '$471B', pe: 55.9, revenueGrowth: 11, eps: 10.61, grossMargin: 49, dividendYield: null,
      etfPresence: { SOXX: 5.19, PSI: 6.72, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 5.3, proScore: 2.65, coverage: 0.5,
      price: 230.75, weeklyPrices: [235.55, 233.31, 216.47, 221.18, 230.75], weeklyChange: -2.04, dayChange: 4.33, sortRank: 0, periodReturns: { '1M': 7.9, 'YTD': 89.9, '6M': 64.8, '1Y': 150 },
      priceHistory: { '1D': [221.18, 244.39, 244.54, 244.65, 238.99, 237.97, 235.37, 236.13, 237.07, 236.81, 236.36, 236.73, 236.21, 235.02, 235.05, 234.89, 235.45, 235.51, 234.06, 232.31, 232.7, 231.8, 230.99, 230.75], '1W': [235.55, 233.31, 216.47, 221.18, 230.75], '1M': [213.94, 213.56, 241.16, 254.54, 256.42, 237.33, 238.73, 259.56, 269.16, 244.49, 240.48, 258.8, 248.64, 278.39, 301.71, 266.19, 235.55, 233.31, 216.47, 221.18, 230.75], 'YTD': [121.51, 132.46, 154.5, 151.28, 141.04, 144.02, 147.02, 150.66, 144.13, 145.29, 148.24, 154.38, 151.98, 172.73, 173.49, 181.54, 172.63, 186.92, 180.43, 188.84, 194, 210.81, 237.33, 240.48, 266.19, 230.75], '6M': [140, 156.78, 154.3, 141.04, 144.02, 147.02, 150.66, 153.49, 142.91, 143.82, 151.14, 138.26, 154.88, 179.59, 178.54, 180.9, 173.29, 181.13, 174.06, 201.14, 204.52, 213.94, 237.33, 240.48, 266.19, 230.75], '1Y': [92.32, 93.35, 89.71, 92.5, 88.83, 94.95, 87.84, 88.81, 84.39, 93.26, 98.99, 106.87, 112.89, 106.26, 108.7, 111.43, 123.53, 122.71, 119.9, 116.75, 114.59, 121.18, 123.89, 117.2, 127.7, 127.45, 140, 156.78, 154.3, 141.04, 144.02, 147.02, 148.77, 153.49, 142.91, 143.82, 151.14, 138.26, 154.88, 179.59, 178.54, 180.9, 173.29, 181.13, 174.06, 201.14, 204.52, 213.94, 237.33, 240.48, 266.19, 230.75] },
      velocityScore: { '1D': 0, '1W': -7.7, '1M': 17.8, '6M': null }, isNew: false,
      marketCap: '$301B', pe: 65.2, revenueGrowth: 12, eps: 3.54, grossMargin: 61, dividendYield: 0.42,
      etfPresence: { SOXX: 4.71, PSI: 5.89, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 4.91, proScore: 2.45, coverage: 0.5,
      price: 353.27, weeklyPrices: [351.41, 350.20, 326.13, 333.15, 353.27], weeklyChange: 0.53, dayChange: 6.04, sortRank: 0, periodReturns: { '1M': 8, 'YTD': 106.4, '6M': 61.8, '1Y': 253.9 },
      priceHistory: { '1D': [333.15, 366.8, 366.14, 364.8, 356.08, 355.76, 353.18, 354.14, 353.84, 355, 355.08, 354.27, 354.59, 356.52, 356.77, 356.91, 357.74, 358.43, 356.67, 355.9, 357.18, 355.57, 353.76, 353.27], '1W': [351.41, 350.2, 326.13, 333.15, 353.27], '1M': [327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82, 379.09, 410.91, 433.33, 391.26, 351.41, 350.2, 326.13, 333.15, 353.27], 'YTD': [171.18, 200.96, 217.47, 217.94, 237.5, 229.28, 235.58, 244.25, 217.27, 215.23, 224.71, 233.45, 222.01, 258.76, 260.96, 258.56, 256.72, 294.05, 284.72, 305.35, 317.12, 324.45, 369.34, 374.8, 391.26, 353.27], '6M': [218.36, 222.96, 222.87, 237.5, 229.28, 235.58, 244.25, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 273.38, 322.68, 334.41, 327.16, 369.34, 374.8, 391.26, 353.27], '1Y': [99.81, 100.37, 97.1, 99.09, 95.94, 106.74, 99.15, 103.63, 97.74, 107.36, 121.9, 128.32, 142.79, 142.54, 144.78, 141.25, 160.67, 165.05, 161.42, 148.8, 151.93, 159.75, 168.26, 154.98, 177.33, 185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.58, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 273.38, 322.68, 334.41, 327.16, 369.34, 374.8, 391.26, 353.27] },
      velocityScore: { '1D': 0, '1W': -5.8, '1M': 11.9, '6M': null }, isNew: false,
      marketCap: '$442B', pe: 66.7, revenueGrowth: 24, eps: 5.3, grossMargin: 50, dividendYield: 0.31,
      etfPresence: { SOXX: 4.28, PSI: 5.53, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 4.81, proScore: 2.4, coverage: 0.5,
      price: 405.51, weeklyPrices: [360.45, 373.90, 370.78, 388.69, 405.51], weeklyChange: 12.5, dayChange: 4.33, sortRank: 0, periodReturns: { '1M': 3.4, 'YTD': 17.2, '6M': 17.5, '1Y': 45.9 },
      priceHistory: { '1D': [388.69, 397.52, 393.8, 392.73, 391.57, 393.99, 394.08, 394.32, 397.98, 400.17, 400.8, 400.91, 401.4, 401.19, 403.11, 402.66, 403.8, 404.08, 405.75, 406.06, 405.41, 404.61, 405.36, 405.51], '1W': [360.45, 373.9, 370.78, 388.69, 405.51], '1M': [392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 370.78, 388.69, 405.51], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 421.28, 430, 425.19, 414.14, 459.97, 396.6, 376.71, 382.07, 369.34, 405.51], '6M': [344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 422.01, 481.57, 392.16, 376.71, 382.07, 369.34, 405.51], '1Y': [277.9, 280.81, 283.69, 302.62, 301.67, 309.09, 291.17, 298.01, 302.39, 369.57, 346.17, 339.31, 333.39, 345.5, 351.33, 340.3, 385.98, 358.98, 355.22, 354.42, 385.03, 380.61, 412.97, 326.02, 350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 422.01, 481.57, 392.16, 376.71, 382.07, 369.34, 405.51] },
      velocityScore: { '1D': 2.6, '1W': 12.7, '1M': 21.8, '6M': null }, isNew: false,
      marketCap: '$1.9T', pe: 67.4, revenueGrowth: 48, eps: 6.02, grossMargin: 76, dividendYield: 0.67,
      etfPresence: { SOXX: 7.12, PSI: false, XSD: 2.49, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 3.41, proScore: 1.7, coverage: 0.5,
      price: 246.65, weeklyPrices: [245.29, 249.27, 230.70, 231.71, 246.65], weeklyChange: 0.55, dayChange: 6.45, sortRank: 0, periodReturns: { '1M': -7.6, 'YTD': 190.2, '6M': 196.4, '1Y': 241.3 },
      priceHistory: { '1D': [231.71, 249.33, 248.67, 247.8, 244.5, 245.62, 246.34, 247.23, 247.04, 246.74, 247.74, 247.96, 247.6, 246.91, 246.75, 246.54, 247.38, 248.41, 248.16, 247.23, 247.94, 247.37, 246.06, 246.65], '1W': [245.29, 249.27, 230.7, 231.71, 246.65], '1M': [266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 245.29, 249.27, 230.7, 231.71, 246.65], 'YTD': [84.98, 83.45, 80.38, 80.23, 78.66, 82.35, 79.01, 78.39, 77.51, 93.3, 87.62, 98.45, 106.71, 119.93, 133.37, 165.56, 164.95, 170.13, 176.89, 196.33, 219.43, 288.85, 278.67, 276.7, 272.05, 246.65], '6M': [83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 208.26, 290.79, 266.88, 278.67, 276.7, 272.05, 246.65], '1Y': [72.26, 70.85, 73.27, 81.74, 75.32, 79.32, 71.22, 74.26, 62.31, 67.1, 70.98, 80.09, 83.89, 92.5, 88.89, 81.05, 90.15, 92.9, 89.33, 81.32, 83.43, 100.2, 92.47, 81.7, 86.49, 89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 208.26, 290.79, 266.88, 278.67, 276.7, 272.05, 246.65] },
      velocityScore: { '1D': -2.3, '1W': -9.1, '1M': -49.9, '6M': null }, isNew: false,
      marketCap: '$216B', pe: 84.5, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.1,
      etfPresence: { SOXX: 4.62, PSI: false, XSD: 2.2, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 3.29, proScore: 1.64, coverage: 0.5,
      price: 311.69, weeklyPrices: [293.08, 303.50, 293.30, 301.32, 311.69], weeklyChange: 6.35, dayChange: 3.44, sortRank: 0, periodReturns: { '1M': 8, 'YTD': 79.7, '6M': 63.8, '1Y': 44 },
      priceHistory: { '1D': [301.32, 310.81, 310.07, 310.47, 308.53, 310.17, 310.51, 311.77, 312.91, 312.33, 312.76, 314.11, 314.26, 312.4, 311.88, 312.03, 313.23, 313.56, 313.55, 313.09, 312.25, 311.78, 310.81, 311.69], '1W': [293.08, 303.5, 293.3, 301.32, 311.69], '1M': [288.63, 282.01, 297.1, 301.12, 313.34, 305.71, 301.88, 322.86, 332.28, 304.36, 303.11, 311.81, 285.43, 285.48, 298.07, 298.41, 293.08, 303.5, 293.3, 301.32, 311.69], 'YTD': [173.49, 188.45, 189.12, 193.31, 225.01, 218.77, 225.69, 213.35, 202.67, 197.46, 190.78, 196.77, 196.3, 214.98, 223.1, 282.23, 281.02, 287.8, 302.73, 309.21, 293.2, 290.9, 305.71, 303.11, 298.41, 311.69], '6M': [190.31, 191.58, 196.59, 225.01, 218.77, 225.69, 213.35, 209.82, 196.2, 194.13, 188.63, 186.42, 199.74, 218.87, 233.15, 265, 281, 295.17, 302.31, 324.89, 308.12, 288.63, 305.71, 303.11, 298.41, 311.69], '1Y': [216.39, 216.64, 186.25, 189.52, 185.91, 193.29, 200.77, 205.98, 195.74, 184.01, 180.3, 184.44, 180.39, 181.6, 175.27, 170.71, 160.26, 163.57, 163.09, 157.09, 161.77, 182.6, 181.67, 174.49, 177.13, 177.52, 190.31, 191.58, 196.59, 225.01, 218.77, 225.69, 219.86, 209.82, 196.2, 194.13, 188.63, 186.42, 199.74, 218.87, 233.15, 265, 281, 295.17, 302.31, 324.89, 308.12, 288.63, 305.71, 303.11, 298.41, 311.69] },
      velocityScore: { '1D': 0, '1W': 7.9, '1M': 17.1, '6M': null }, isNew: false,
      marketCap: '$284B', pe: 53.3, revenueGrowth: 19, eps: 5.85, grossMargin: 57, dividendYield: null,
      etfPresence: { SOXX: 4.03, PSI: false, XSD: 2.55, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.99, proScore: 1.5, coverage: 0.5,
      price: 295.19, weeklyPrices: [273.36, 280.51, 273.15, 283.81, 295.19], weeklyChange: 7.99, dayChange: 3.98, sortRank: 0, periodReturns: { '1M': -0.7, 'YTD': 36, '6M': 22.4, '1Y': 28.1 },
      priceHistory: { '1D': [283.89, 293.82, 293.55, 294.08, 292.01, 293.52, 293.2, 294.79, 295.95, 295.31, 296.14, 297.8, 297.44, 295.61, 295.14, 295.11, 295.67, 296.11, 296.12, 295.79, 295.84, 295.57, 294.47, 295.19], '1W': [273.36, 280.51, 273.15, 283.81, 295.19], '1M': [297.41, 285.56, 302.55, 304.86, 315.88, 302.89, 298.2, 313.27, 323.24, 299.94, 294.06, 298.64, 277.02, 278.37, 281.03, 279.18, 273.36, 280.51, 273.15, 283.81, 295.19], 'YTD': [217.06, 237.89, 238.6, 232.48, 231.08, 228.91, 245.09, 234.63, 215.25, 203.03, 192.69, 197.61, 195.58, 205.67, 213.73, 241.16, 295.24, 294.75, 291.5, 316.47, 311.38, 301.14, 302.89, 294.06, 279.18, 295.19], '6M': [241.15, 237.11, 231.05, 231.08, 228.91, 245.09, 234.63, 224.76, 205.25, 191.89, 193.39, 187.39, 195.12, 209.89, 224.5, 230.39, 292.35, 294.23, 294.28, 332.67, 323.62, 297.41, 302.89, 294.06, 279.18, 295.19], '1Y': [230.42, 220.58, 224.71, 220.94, 205.92, 230.52, 228.77, 237.82, 228.2, 219.28, 221.89, 227.66, 224.91, 225.64, 217.23, 217.16, 204.71, 210.44, 204.08, 190.06, 191.02, 227.56, 230.78, 223.23, 225.26, 221.28, 241.15, 237.11, 231.05, 231.08, 228.91, 245.09, 231.16, 224.76, 205.25, 191.89, 193.39, 187.39, 195.12, 209.89, 224.5, 230.39, 292.35, 294.23, 294.28, 332.67, 323.62, 297.41, 302.89, 294.06, 279.18, 295.19] },
      velocityScore: { '1D': 2, '1W': 9.5, '1M': 7.9, '6M': null }, isNew: false,
      marketCap: '$75B', pe: 28.2, revenueGrowth: 12, eps: 10.47, grossMargin: 56, dividendYield: 1.43,
      etfPresence: { SOXX: 3.61, PSI: false, XSD: 2.37, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 2.82, proScore: 1.41, coverage: 0.5,
      price: 420.03, weeklyPrices: [406.42, 432.74, 382.89, 393.16, 420.03], weeklyChange: 3.35, dayChange: 6.83, sortRank: 0, periodReturns: { '1M': 22.9, 'YTD': 152.5, '6M': 158.3, '1Y': 320.6 },
      priceHistory: { '1D': [393.16, 428, 427.86, 425.58, 415.53, 421.57, 422.02, 428.43, 425.84, 425.23, 427, 428.79, 426.98, 425.11, 427.99, 427.64, 427.87, 430.34, 428.3, 427.82, 427.56, 425.04, 420.63, 420.03], '1W': [406.42, 432.74, 382.89, 393.16, 420.03], '1M': [341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42, 432.74, 382.89, 393.16, 420.03], 'YTD': [166.36, 156.73, 174.45, 169.66, 152.44, 187.67, 123.69, 128.4, 109.8, 116.48, 126.34, 120.33, 106.33, 129.46, 170.81, 197.54, 202.68, 199.79, 232.68, 306.88, 320.09, 346.33, 361.71, 399.92, 430.86, 420.03], '6M': [162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.4, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 318.72, 355.76, 341.7, 361.71, 399.92, 430.86, 420.03], '1Y': [99.86, 91.94, 119.48, 128.87, 174.39, 193.64, 172.45, 178.56, 176.61, 230.37, 249.38, 205.27, 194.5, 219.36, 161.46, 154.85, 173.62, 181.94, 157.79, 142.01, 144.78, 152.5, 164.32, 140.24, 169.97, 179.56, 162.61, 182, 163.25, 152.44, 187.67, 123.69, 128.24, 120.55, 122.31, 127.48, 123.87, 100.27, 118.99, 170.6, 191.97, 183.31, 215.69, 204.42, 244.26, 318.72, 355.76, 341.7, 361.71, 399.92, 430.86, 420.03] },
      velocityScore: { '1D': 0, '1W': -2.1, '1M': -15.1, '6M': null }, isNew: false,
      marketCap: '$72B', pe: 281.9, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.8, PSI: false, XSD: 2.85, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.69, proScore: 1.34, coverage: 0.5,
      price: 192.03, weeklyPrices: [176.25, 186.48, 182.97, 186.56, 192.03], weeklyChange: 8.95, dayChange: 2.93, sortRank: 0, periodReturns: { '1M': -6.5, 'YTD': 12.3, '6M': 8, '1Y': 20.5 },
      priceHistory: { '1D': [186.56, 191.27, 190.48, 191.54, 190.18, 191.57, 192.7, 193.69, 195.1, 193.76, 194.67, 194.84, 194, 192.34, 192.63, 192.06, 192.38, 192.42, 192.19, 191.96, 191.71, 191.66, 191.42, 192.03], '1W': [176.25, 186.48, 182.97, 186.56, 192.03], '1M': [205.42, 191.2, 202.96, 211.72, 220.81, 214.07, 212.97, 226.11, 221.9, 204.13, 197.41, 204.9, 189.39, 188.72, 184.79, 181.92, 176.25, 186.48, 182.97, 186.56, 192.03], 'YTD': [171.05, 181.87, 161.39, 155.82, 152.62, 138.93, 142.63, 144.78, 138.13, 135.2, 130.47, 130.35, 127.28, 127.75, 134.47, 133.95, 177.01, 219.09, 201.49, 238.16, 228.99, 217.77, 214.07, 197.41, 181.92, 192.03], '6M': [177.78, 159.42, 154.52, 152.62, 138.93, 142.63, 144.78, 141.03, 138.11, 129.39, 128.35, 127.07, 124.07, 132.84, 135.56, 150, 186.55, 210.31, 195.61, 248.82, 240.84, 205.42, 214.07, 197.41, 181.92, 192.03], '1Y': [159.35, 154.07, 159.88, 159.06, 145.84, 156.59, 155.44, 159.17, 157.28, 158.95, 165.26, 173.55, 166.49, 167.77, 162.97, 169.27, 178.67, 179.72, 176.67, 166.11, 163.3, 175.07, 182.21, 172.34, 174.77, 172.98, 177.78, 159.42, 154.52, 152.62, 138.93, 142.63, 140.41, 141.03, 138.11, 129.39, 128.35, 127.07, 124.07, 132.84, 135.56, 150, 186.55, 210.31, 195.61, 248.82, 240.84, 205.42, 214.07, 197.41, 181.92, 192.03] },
      velocityScore: { '1D': -0.7, '1W': 9.8, '1M': -14.1, '6M': null }, isNew: false,
      marketCap: '$202B', pe: 20.7, revenueGrowth: -4, eps: 9.29, grossMargin: 55, dividendYield: 1.97,
      etfPresence: { SOXX: 3.04, PSI: false, XSD: 2.34, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.65, proScore: 1.33, coverage: 0.5,
      price: 1390.95, weeklyPrices: [1288.16, 1346.13, 1272.81, 1315.51, 1390.95], weeklyChange: 7.98, dayChange: 5.73, sortRank: 0, periodReturns: { '1M': -9.2, 'YTD': 53.5, '6M': 45, '1Y': 85.2 },
      priceHistory: { '1D': [1315.51, 1395.4, 1390.8, 1390.46, 1379.25, 1379.97, 1383, 1390.8, 1395.45, 1391.61, 1397.78, 1398.4, 1397.08, 1393.56, 1396.7, 1393.38, 1397.76, 1398.33, 1398.74, 1397.05, 1397.55, 1394.38, 1388.67, 1390.95], '1W': [1288.16, 1346.13, 1272.81, 1315.51, 1390.95], '1M': [1531.98, 1473.04, 1589.55, 1577.32, 1652.29, 1498.77, 1448.21, 1563.7, 1537.88, 1423.76, 1434.95, 1438.3, 1313.32, 1312.77, 1382.36, 1331.73, 1288.16, 1346.13, 1272.81, 1315.51, 1390.95], 'YTD': [906.36, 959.09, 1009.54, 1063.74, 1173.22, 1206.18, 1173.18, 1213.67, 1074.37, 1055.82, 1075.29, 1118.66, 1119.51, 1334.21, 1402.81, 1592.17, 1583.48, 1600.84, 1550.02, 1589.81, 1542.39, 1559.18, 1498.77, 1434.95, 1331.73, 1390.95], '6M': [958.97, 1033.17, 1068.14, 1173.22, 1206.18, 1173.18, 1213.67, 1142.58, 1062, 1077.4, 1076.35, 1002.34, 1191.22, 1363.42, 1527.95, 1504.08, 1588.12, 1599.52, 1468.11, 1662.98, 1624.99, 1531.98, 1498.77, 1434.95, 1331.73, 1390.95], '1Y': [751.14, 714.03, 720.01, 730.54, 805.85, 861.8, 826.27, 850.64, 827.56, 855.18, 877.66, 908.45, 915.87, 980.9, 1007.93, 1001.4, 1094.08, 1000.15, 958.35, 884.65, 908.61, 958.02, 979.02, 912.25, 953.25, 936.31, 958.97, 1033.17, 1068.14, 1173.22, 1206.18, 1173.18, 1190.06, 1142.58, 1062, 1077.4, 1076.35, 1002.34, 1191.22, 1363.42, 1527.95, 1504.08, 1588.12, 1599.52, 1468.11, 1662.98, 1624.99, 1531.98, 1498.77, 1434.95, 1331.73, 1390.95] },
      velocityScore: { '1D': 1.5, '1W': 6.4, '1M': -4.3, '6M': null }, isNew: false,
      marketCap: '$68B', pe: 99.8, revenueGrowth: 26, eps: 13.94, grossMargin: 55, dividendYield: 0.61,
      etfPresence: { SOXX: 3.17, PSI: false, XSD: 2.13, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.39, proScore: 1.2, coverage: 0.5,
      price: 268.83, weeklyPrices: [241.91, 265.55, 246.40, 258.69, 268.83], weeklyChange: 11.13, dayChange: 3.92, sortRank: 0, periodReturns: { '1M': 14.7, 'YTD': 86.8, '6M': 78.7, '1Y': 175.5 },
      priceHistory: { '1D': [258.69, 272.41, 268.47, 267, 265, 270.56, 270.62, 274.19, 276.6, 276.6, 276.77, 275.96, 274.42, 272.75, 273.73, 273.65, 275.29, 276.26, 275.37, 274.2, 272.45, 271.35, 268.17, 268.83], '1W': [241.91, 265.55, 246.4, 258.69, 268.83], '1M': [234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 265.55, 246.4, 258.69, 268.83], 'YTD': [143.89, 141.59, 149.12, 133.16, 119.96, 123.41, 124.8, 120.83, 97.3, 112.33, 101.72, 103.91, 95.92, 107.93, 158.93, 185.54, 184.38, 188.51, 172.17, 218.41, 226.1, 222.27, 239.18, 268.99, 259.09, 268.83], '6M': [150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.64, 229, 234.32, 239.18, 268.99, 259.09, 268.83], '1Y': [97.59, 101.19, 98.41, 116.01, 117.34, 121.13, 105.99, 120.1, 124.77, 163.96, 164.44, 149.38, 144.91, 148.87, 131.41, 137.2, 171.52, 173.16, 160.34, 141.88, 154.18, 189.19, 157.98, 134.13, 150.19, 143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.64, 229, 234.32, 239.18, 268.99, 259.09, 268.83] },
      velocityScore: { '1D': 2.6, '1W': 8.1, '1M': 0.8, '6M': null }, isNew: false,
      marketCap: '$50B', pe: 107.1, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 2.18, PSI: false, XSD: 2.61, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.32, proScore: 1.16, coverage: 0.5,
      price: 90.1, weeklyPrices: [84.64, 87.59, 84.15, 85.49, 90.10], weeklyChange: 6.45, dayChange: 5.39, sortRank: 0, periodReturns: { '1M': -1.5, 'YTD': 41.4, '6M': 19.8, '1Y': 20.6 },
      priceHistory: { '1D': [85.49, 89.34, 89.46, 89.52, 88.69, 89.09, 89.2, 89.84, 90.28, 90, 90.52, 90.69, 90.51, 90.26, 90.19, 90.22, 90.3, 90.43, 90.44, 90.32, 90.32, 90.16, 89.76, 90.1], '1W': [84.64, 87.59, 84.15, 85.49, 90.1], '1M': [91.47, 87.91, 92.94, 95.24, 100.32, 95.63, 94.11, 99.77, 102.71, 93.26, 92.48, 94.12, 87.93, 89.06, 91.2, 88.69, 84.64, 87.59, 84.15, 85.49, 90.1], 'YTD': [63.72, 73.53, 74.45, 74.71, 78.08, 74.41, 78.94, 75.93, 71.39, 65.33, 64.71, 65.16, 65.38, 71.22, 76.87, 90.64, 93.95, 99.09, 93.85, 93.43, 91.52, 91.37, 95.63, 92.48, 88.69, 90.1], '6M': [75.22, 74.7, 74.79, 78.08, 74.41, 78.94, 75.93, 74.31, 65, 63.83, 64.34, 60.06, 67.51, 74.5, 80.93, 84.26, 98.48, 97.7, 91.81, 98.05, 96.96, 91.47, 95.63, 92.48, 88.69, 90.1], '1Y': [74.68, 74.43, 70.25, 70.29, 66.17, 65.75, 66.76, 67.62, 63.28, 64.74, 65.78, 65.85, 64.11, 66.92, 65.21, 64.5, 62.54, 60.8, 55.63, 50.8, 51.83, 63.61, 67.9, 63.99, 65.36, 65.03, 75.22, 74.7, 74.79, 78.08, 74.41, 78.94, 76.6, 74.31, 65, 63.83, 64.34, 60.06, 67.51, 74.5, 80.93, 84.26, 98.48, 97.7, 91.81, 98.05, 96.96, 91.47, 95.63, 92.48, 88.69, 90.1] },
      velocityScore: { '1D': -0.9, '1W': 3.6, '1M': 0.9, '6M': null }, isNew: false,
      marketCap: '$49B', pe: 409.5, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 2.13,
      etfPresence: { SOXX: 2.31, PSI: false, XSD: 2.33, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 1.95, proScore: 0.97, coverage: 0.5,
      price: 100.42, weeklyPrices: [91.22, 94.69, 91.10, 93.79, 100.42], weeklyChange: 10.09, dayChange: 7.07, sortRank: 0, periodReturns: { '1M': -14.2, 'YTD': 85.5, '6M': 61.6, '1Y': 73.8 },
      priceHistory: { '1D': [93.79, 100.28, 101.2, 101.13, 100.46, 101.18, 101.72, 102.13, 102.36, 102.21, 102.5, 102.36, 102.06, 101.13, 100.6, 100.53, 100.86, 101, 101.13, 100.72, 100.68, 100.69, 100.21, 100.42], '1W': [91.22, 94.69, 91.1, 93.79, 100.42], '1M': [117, 110.17, 115.96, 116.79, 125.9, 118.25, 112.92, 121.62, 131.55, 117.06, 115.74, 118.74, 90.65, 88.57, 94.54, 94.63, 91.22, 94.69, 91.1, 93.79, 100.42], 'YTD': [54.15, 60.89, 60.28, 61.98, 61.53, 65.1, 71.96, 70.03, 63.42, 59.59, 60.46, 63.1, 62.2, 68.49, 79.93, 97.78, 103.03, 103.2, 113.11, 116.2, 120.92, 120.9, 118.25, 115.74, 94.63, 100.42], '6M': [62.16, 60.33, 61.13, 61.53, 65.1, 71.96, 70.03, 66.48, 59.23, 59.88, 59.89, 55.66, 63.79, 72.05, 86.91, 93.3, 102.67, 104.11, 106.02, 127, 128.64, 117, 118.25, 115.74, 94.63, 100.42], '1Y': [57.77, 59.52, 59.61, 58.05, 46.98, 51.89, 49.47, 50.99, 47.79, 48.13, 49.8, 50.94, 48.35, 50.88, 50.36, 51.93, 51.4, 50.08, 49.27, 46.12, 48.31, 57.15, 55.1, 53.33, 55.08, 56.7, 62.16, 60.33, 61.13, 61.53, 65.1, 71.96, 69.47, 66.48, 59.23, 59.88, 59.89, 55.66, 63.79, 72.05, 86.91, 93.3, 102.67, 104.11, 106.02, 127, 128.64, 117, 118.25, 115.74, 94.63, 100.42] },
      velocityScore: { '1D': 0, '1W': 6.6, '1M': -29.7, '6M': null }, isNew: false,
      marketCap: '$39B', pe: 73.8, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 1.86, PSI: false, XSD: 2.03, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.56, proScore: 0.78, coverage: 0.5,
      price: 323.46, weeklyPrices: [322.26, 327.64, 304.82, 305.23, 323.46], weeklyChange: 0.37, dayChange: 5.97, sortRank: 0, periodReturns: { '1M': -9.8, 'YTD': 88.9, '6M': 85, '1Y': 131.3 },
      priceHistory: { '1D': [305.23, 322.4, 325.08, 325.85, 322.45, 322.88, 324.07, 325.21, 326.12, 325.89, 327.3, 327.02, 326.65, 325.02, 326.26, 325.3, 326.3, 326.48, 326.36, 326.63, 326.4, 325.78, 322.14, 323.46], '1W': [322.26, 327.64, 304.82, 305.23, 323.46], '1M': [358.72, 354.4, 374.76, 379.87, 384.77, 368.32, 367.11, 391.41, 396.26, 372.15, 373.08, 390.19, 369.18, 372.59, 380.37, 350.63, 322.26, 327.64, 304.82, 305.23, 323.46], 'YTD': [171.28, 167.66, 218.93, 219.26, 228.56, 235.7, 245.59, 248.29, 241.01, 220.59, 218.89, 245.04, 229.36, 247.71, 261.42, 284.4, 284.18, 359.88, 375.6, 385.98, 353.79, 361.86, 368.32, 373.08, 350.63, 323.46], '6M': [174.87, 220.68, 218.89, 228.56, 235.7, 245.59, 248.29, 258.54, 218.73, 224.92, 229.26, 209.49, 236.99, 263.92, 285.71, 265.61, 303.57, 362.76, 358.98, 409.68, 382.35, 358.72, 368.32, 373.08, 350.63, 323.46], '1Y': [139.85, 137.76, 137.19, 140.02, 139.03, 125.99, 121.15, 128.33, 130.17, 131.7, 131.87, 126.66, 126.56, 133.19, 136.83, 135.91, 152.66, 149.68, 170.89, 161.57, 165.88, 183.46, 186.23, 168.31, 175.81, 174.96, 174.87, 220.68, 218.89, 228.56, 235.7, 245.59, 245.53, 258.54, 218.73, 224.92, 229.26, 209.49, 236.99, 263.92, 285.71, 265.61, 303.57, 362.76, 358.98, 409.68, 382.35, 358.72, 368.32, 373.08, 350.63, 323.46] },
      velocityScore: { '1D': -2.5, '1W': -6, '1M': -16.1, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 137.6, revenueGrowth: 23, eps: 2.35, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.07, PSI: false, XSD: 2.06, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RMBS', name: 'RAMBUS INC', easyScore: 2, avgWeight: 1.25, proScore: 0.62, coverage: 0.5,
      price: 116.36, weeklyPrices: [112.92, 113.25, 105.93, 109.64, 116.36], weeklyChange: 3.05, dayChange: 6.13, sortRank: 0, periodReturns: { '1M': -20.8, 'YTD': 26.6, '6M': 24.6, '1Y': 79.6 },
      priceHistory: { '1D': [109.64, 118.75, 119.81, 118.19, 117.48, 118.85, 117.94, 117.95, 117.75, 117.54, 118.18, 118.25, 117.89, 117.4, 117.15, 116.45, 116.57, 116.71, 116.8, 116.81, 117.48, 117.23, 116.17, 116.36], '1W': [112.92, 113.25, 105.93, 109.64, 116.36], '1M': [146.84, 138.12, 144.47, 146.56, 143.29, 132.48, 130.1, 141.17, 140.35, 128.21, 124.52, 123.69, 114.73, 123.9, 132.74, 123.83, 112.92, 113.25, 105.93, 109.64, 116.36], 'YTD': [91.89, 91.34, 103.07, 115.31, 113.71, 110.92, 101.95, 98.57, 87.59, 89.61, 93.32, 95.93, 89.95, 105.58, 120.03, 138.5, 111.93, 129.25, 127.05, 142.98, 147.48, 152.03, 132.48, 124.52, 123.83, 116.36], '6M': [93.38, 107.99, 114.19, 113.71, 110.92, 101.95, 98.57, 98.88, 88.52, 92.78, 93.35, 79.73, 91.87, 121.73, 130.45, 111.27, 118, 130.28, 122.03, 157.23, 166.78, 146.84, 132.48, 124.52, 123.83, 116.36], '1Y': [64.79, 66.79, 65.95, 75.09, 71.56, 76.79, 69.68, 75.03, 73.67, 77.11, 97.52, 100.73, 103.14, 99.43, 97.22, 94.45, 111.36, 108.61, 102.21, 90.22, 92.45, 98.03, 106.84, 90.61, 94.48, 99.28, 93.38, 107.99, 114.19, 113.71, 110.92, 101.95, 95.27, 98.88, 88.52, 92.78, 93.35, 79.73, 91.87, 121.73, 130.45, 111.27, 118, 130.28, 122.03, 157.23, 166.78, 146.84, 132.48, 124.52, 123.83, 116.36] },
      velocityScore: { '1D': null, '1W': -4.6, '1M': -25.3, '6M': null }, isNew: true,
      marketCap: '$13B', pe: 55.1, revenueGrowth: 8, eps: 2.11, grossMargin: 80, dividendYield: null,
      etfPresence: { SOXX: 0.6, PSI: false, XSD: 1.89, DRAM: false },
      tonyNote: 'RAMBUS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 8, avgWeight: 5.82, proScore: 2.74, coverage: 0.471,
      price: 1014.62, weeklyPrices: [975.56, 984.75, 938.38, 948.80, 1014.62], weeklyChange: 4, dayChange: 6.94, sortRank: 0, periodReturns: { '1M': 8.4, 'YTD': 255.5, '6M': 194, '1Y': 730 },
      priceHistory: { '1D': [948.8, 1017.05, 1027.72, 1027.4, 1013.84, 1013.47, 1013.52, 1018.79, 1015.78, 1018.48, 1019.58, 1017.6, 1018.92, 1014.65, 1013.34, 1014.3, 1022.69, 1024.74, 1023.87, 1024.57, 1022.83, 1019.77, 1015.14, 1014.62], '1W': [975.56, 984.75, 938.38, 948.8, 1014.62], '1M': [935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 948.8, 1014.62], 'YTD': [285.41, 327.02, 336.63, 399.65, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 542.21, 746.81, 724.66, 751, 1035.5, 949.28, 1020.76, 1048.51, 1032.28, 1014.62], '6M': [345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1032.28, 1014.62], '1Y': [122.24, 116.43, 109.83, 114.74, 108.78, 124.27, 117.21, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 198.47, 226.63, 237.5, 244.9, 225.92, 224.53, 234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1032.28, 1014.62] },
      velocityScore: { '1D': -0.7, '1W': -11.6, '1M': 14.6, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 23, revenueGrowth: 346, eps: 44.21, grossMargin: 73, dividendYield: null,
      etfPresence: { PTF: 4.85, WCLD: false, IGV: false, FDTX: 9.33, GTEK: false, ARKK: false, MARS: false, FRWD: 4.54, BCTK: 4.22, FWD: false, CBSE: false, FCUS: 4.32, WGMI: false, CNEQ: 1.9, SGRT: 6.97, SPMO: 10.43, XMMO: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 7, avgWeight: 6.23, proScore: 2.57, coverage: 0.412,
      price: 204.03, weeklyPrices: [194.83, 195.55, 196.93, 204.12, 204.03], weeklyChange: 4.72, dayChange: -0.04, sortRank: 0, periodReturns: { '1M': -2, 'YTD': 9.4, '6M': 10.4, '1Y': 25.3 },
      priceHistory: { '1D': [204.12, 201.68, 202.1, 200.07, 199.77, 200.37, 200.88, 201.38, 201.25, 201.28, 201.73, 202.11, 202.02, 202.18, 201.78, 201.71, 203.07, 203.01, 203.22, 203.37, 203.45, 203.3, 203.78, 204.03], '1W': [194.83, 195.55, 196.93, 204.12, 204.03], '1M': [208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 196.93, 204.12, 204.03], 'YTD': [186.5, 185.04, 187.05, 187.67, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 180.4, 178.68, 175.75, 183.91, 198.35, 199.64, 198.45, 215.2, 225.32, 215.33, 224.36, 208.64, 207.41, 199, 197.58, 204.03], '6M': [184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 192.85, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 214.86, 222.82, 208.19, 207.41, 199, 197.58, 204.03], '1Y': [162.88, 171.37, 170.78, 179.27, 179.42, 181.59, 175.4, 181.77, 170.62, 177.33, 170.29, 176.97, 187.24, 189.11, 179.83, 180.28, 207.04, 195.21, 193.8, 186.52, 177.82, 179.59, 183.78, 170.94, 188.61, 188.85, 184.86, 186.23, 186.47, 185.61, 190.04, 184.97, 191.55, 182.48, 182.65, 183.22, 175.64, 165.17, 178.1, 196.51, 199.88, 213.17, 196.5, 220.78, 220.61, 214.86, 222.82, 208.19, 207.41, 199, 197.58, 204.03] },
      velocityScore: { '1D': 1.6, '1W': -12.3, '1M': 12.7, '6M': null }, isNew: false,
      marketCap: '$4.9T', pe: 31.2, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.09, GTEK: false, ARKK: 1.61, MARS: false, FRWD: 8.22, BCTK: 5.7, FWD: false, CBSE: false, FCUS: false, WGMI: 2.33, CNEQ: 13.75, SGRT: false, SPMO: 7.94, XMMO: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 7, avgWeight: 4.94, proScore: 2.03, coverage: 0.412,
      price: 586.44, weeklyPrices: [539.00, 577.46, 532.10, 550.30, 586.44], weeklyChange: 8.8, dayChange: 6.57, sortRank: 0, periodReturns: { '1M': 13.3, 'YTD': 240.4, '6M': 192.5, '1Y': 807.2 },
      priceHistory: { '1D': [550.3, 593.15, 596.51, 597.36, 588.28, 588.52, 587.4, 587.44, 589.45, 591.01, 590.43, 588, 587.46, 587.8, 588.24, 586.2, 588.74, 589.57, 588.1, 589.47, 590.8, 588.03, 586.62, 586.44], '1W': [539, 577.46, 532.1, 550.3, 586.44], '1M': [517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 532.1, 550.3, 586.44], 'YTD': [172.27, 187.68, 222.1, 236.39, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 304.9, 296.14, 297.73, 337.88, 361.69, 403.12, 431.52, 480, 482.02, 484.28, 546.2, 526.93, 681.08, 643.83, 598.37, 586.44], '6M': [200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 524.65, 563.1, 517.72, 681.08, 643.83, 598.37, 586.44], '1Y': [64.64, 66.53, 69.32, 71.43, 73.78, 76.07, 75.64, 79.71, 86, 95.02, 100.94, 109.69, 130.59, 121.18, 120.44, 120.47, 141.38, 160.1, 166.11, 153.97, 155.41, 155.59, 181.95, 166.26, 179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 524.65, 563.1, 517.72, 681.08, 643.83, 598.37, 586.44] },
      velocityScore: { '1D': -1.5, '1W': 2, '1M': 44, '6M': null }, isNew: false,
      marketCap: '$202B', pe: 35.1, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: null,
      etfPresence: { PTF: 4.3, WCLD: false, IGV: false, FDTX: 4.49, GTEK: false, ARKK: false, MARS: false, FRWD: 4.56, BCTK: false, FWD: false, CBSE: false, FCUS: 4.18, WGMI: false, CNEQ: 4.62, SGRT: 10.65, SPMO: 1.78, XMMO: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 7, avgWeight: 4.48, proScore: 1.85, coverage: 0.412,
      price: 440.44, weeklyPrices: [434.16, 451.79, 432.57, 436.98, 440.44], weeklyChange: 1.45, dayChange: 0.79, sortRank: 0, periodReturns: { '1M': 2.9, 'YTD': 44.9, '6M': 36.1, '1Y': 90 },
      priceHistory: { '1D': [436.98, 442.97, 443.02, 443.82, 440.86, 441.82, 442.01, 442.76, 442.07, 444.05, 444.15, 444.08, 442.57, 441.8, 441.29, 441.36, 442.71, 442.85, 442.33, 440.84, 440.41, 439.33, 439.08, 440.44], '1W': [434.16, 451.79, 432.57, 436.98, 440.44], '1M': [427.92, 408.75, 421.07, 423.93, 441.4, 425.83, 432.15, 462.12, 467.67, 436.39, 440.83, 434.99, 432.35, 455.1, 477.57, 444.23, 434.16, 451.79, 432.57, 436.98, 440.44], 'YTD': [303.89, 318.01, 341.64, 334.87, 341.36, 355.41, 364.2, 385.75, 353.13, 347.09, 339.57, 347.75, 341.49, 365.49, 363.35, 382.66, 397.67, 411.68, 404.35, 404.52, 435.63, 426.8, 425.83, 440.83, 444.23, 440.44], '6M': [323.63, 342.4, 332.71, 341.36, 355.41, 364.2, 385.75, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 392.61, 412.32, 446.69, 427.92, 425.83, 440.83, 444.23, 440.44], '1Y': [231.84, 237.56, 240.33, 242.91, 231.37, 241.44, 228.6, 238.72, 231.39, 260.44, 262.79, 280.71, 288.47, 304.52, 304.71, 288.88, 305.09, 293.64, 290.62, 282.37, 284.68, 295.45, 310.14, 276.96, 298.8, 319.61, 323.63, 342.4, 332.71, 341.36, 355.41, 364.2, 370.04, 369.11, 348.7, 340.23, 338.45, 316.5, 345.32, 379.89, 368.08, 392.34, 394.41, 397.28, 392.61, 412.32, 446.69, 427.92, 425.83, 440.83, 444.23, 440.44] },
      velocityScore: { '1D': 0.5, '1W': 10.1, '1M': 11.4, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 38.3, revenueGrowth: 35, eps: 11.49, grossMargin: 62, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6.39, GTEK: false, ARKK: 0.93, MARS: false, FRWD: 6.19, BCTK: 8.79, FWD: false, CBSE: 2.58, FCUS: false, WGMI: 0.72, CNEQ: 5.77, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES', easyScore: 7, avgWeight: 3.76, proScore: 1.55, coverage: 0.412,
      price: 546.64, weeklyPrices: [517.82, 552.05, 516.11, 517.41, 546.64], weeklyChange: 5.57, dayChange: 5.65, sortRank: 0, periodReturns: { '1M': 15, 'YTD': 155.3, '6M': 169.1, '1Y': 294.9 },
      priceHistory: { '1D': [517.4, 549.87, 556.3, 554.49, 551.14, 557.93, 554.23, 555.42, 554.61, 553.95, 554.53, 556.35, 554.73, 551.61, 552.49, 551.34, 551.76, 550.85, 547.91, 548.83, 546.75, 546.51, 545.66, 546.64], '1W': [517.82, 552.05, 516.11, 517.41, 546.64], '1M': [475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 517.41, 546.64], 'YTD': [214.16, 204.68, 227.92, 259.68, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 360.54, 455.19, 424.1, 467.51, 510.13, 490.33, 507.29, 519.74, 540.88, 546.64], '6M': [203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 503.89, 521.54, 475.51, 507.29, 519.74, 540.88, 546.64], '1Y': [138.41, 160.08, 158.65, 179.51, 163.12, 184.42, 165.2, 166.62, 162.13, 159.54, 159.16, 160.88, 164.01, 235.56, 238.6, 230.23, 264.33, 256.33, 258.89, 223.55, 206.13, 217.6, 221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 503.89, 521.54, 475.51, 507.29, 519.74, 540.88, 546.64] },
      velocityScore: { '1D': -9.9, '1W': -11.9, '1M': -8.8, '6M': null }, isNew: false,
      marketCap: '$891B', pe: 182.2, revenueGrowth: 38, eps: 3, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.22, MARS: false, FRWD: 7.7, BCTK: 3.43, FWD: 2.29, CBSE: false, FCUS: false, WGMI: false, CNEQ: 1.08, SGRT: 3.41, SPMO: 4.17, XMMO: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 7, avgWeight: 3.68, proScore: 1.51, coverage: 0.412,
      price: 405.51, weeklyPrices: [360.45, 373.90, 370.78, 388.69, 405.51], weeklyChange: 12.5, dayChange: 4.33, sortRank: 0, periodReturns: { '1M': 3.4, 'YTD': 17.2, '6M': 17.5, '1Y': 45.9 },
      priceHistory: { '1D': [388.69, 397.52, 393.8, 392.73, 391.57, 393.99, 394.08, 394.32, 397.98, 400.17, 400.8, 400.91, 401.4, 401.19, 403.11, 402.66, 403.8, 404.08, 405.75, 406.06, 405.41, 404.61, 405.36, 405.51], '1W': [360.45, 373.9, 370.78, 388.69, 405.51], '1M': [392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 370.78, 388.69, 405.51], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 315.93, 318.81, 313.49, 354.91, 398.47, 419.94, 421.28, 430, 425.19, 414.14, 459.97, 396.6, 376.71, 382.07, 369.34, 405.51], '6M': [344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 325.49, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 422.01, 481.57, 392.16, 376.71, 382.07, 369.34, 405.51], '1Y': [277.9, 280.81, 283.69, 302.62, 301.67, 309.09, 291.17, 298.01, 302.39, 369.57, 346.17, 339.31, 333.39, 345.5, 351.33, 340.3, 385.98, 358.98, 355.22, 354.42, 385.03, 380.61, 412.97, 326.02, 350.22, 347.62, 344.97, 351.71, 324.85, 331.11, 343.94, 332.54, 330.34, 318.82, 345.75, 324.92, 322.51, 293.41, 333.97, 380.78, 402.17, 399.83, 427.36, 419.3, 411.07, 422.01, 481.57, 392.16, 376.71, 382.07, 369.34, 405.51] },
      velocityScore: { '1D': 1.3, '1W': 2.7, '1M': 17.1, '6M': null }, isNew: false,
      marketCap: '$1.9T', pe: 67.4, revenueGrowth: 48, eps: 6.02, grossMargin: 76, dividendYield: 0.67,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.62, GTEK: false, ARKK: 1.1, MARS: false, FRWD: 4.77, BCTK: 6.62, FWD: 1.87, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.42, SGRT: false, SPMO: 6.33, XMMO: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'SPCX', name: 'SPACE EXPLORATION TECHN-CL A', easyScore: 6, avgWeight: 7.02, proScore: 2.48, coverage: 0.353,
      price: 153.18, weeklyPrices: [162.00, 160.42, 149.47, 148.30, 153.18], weeklyChange: -5.44, dayChange: 3.32, sortRank: 0, periodReturns: { '1M': -4.8, 'YTD': -4.8, '6M': -4.8, '1Y': -4.8 },
      priceHistory: { '1D': [148.26, 150.53, 150.42, 150.54, 148.3, 148.89, 149.3, 149.69, 150.07, 149.99, 150.26, 150.45, 150.75, 149.89, 150.57, 150.53, 151.38, 152.13, 152.14, 152.63, 152.65, 153.35, 152.89, 153.18], '1W': [162, 160.42, 149.47, 148.3, 153.18], '1M': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 148.3, 153.18], 'YTD': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 148.3, 153.18], '6M': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 148.3, 153.18], '1Y': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 148.3, 153.18] },
      velocityScore: { '1D': 0.4, '1W': 7.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.0T', pe: null, revenueGrowth: 15, eps: -0.67, grossMargin: 49, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.27, MARS: 22.16, FRWD: 2.43, BCTK: 8.41, FWD: 1.79, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.05, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'SPACE EXPLORATION TECHN-CL A appears in 6 of 17 Broad Tech ETFs (35% coverage) with average weight 7.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 6, avgWeight: 3.13, proScore: 1.1, coverage: 0.353,
      price: 244.82, weeklyPrices: [242.67, 244.16, 245.98, 243.62, 244.82], weeklyChange: 0.89, dayChange: 0.49, sortRank: 0, periodReturns: { '1M': 0.3, 'YTD': 6.1, '6M': -1, '1Y': 10 },
      priceHistory: { '1D': [243.62, 241.85, 242.71, 241.62, 240.79, 241.49, 241.18, 241.15, 241.68, 241.23, 241.71, 241.68, 241.63, 242.34, 242.16, 242.21, 243.28, 243.03, 244.3, 243.54, 244.07, 244.67, 244.94, 244.82], '1W': [242.67, 244.16, 245.98, 243.62, 244.82], '1M': [244.19, 238, 241.51, 238.55, 246.02, 246, 237.5, 244.39, 232.79, 234.11, 234.27, 227.01, 232.69, 240.14, 238.34, 241.7, 242.67, 244.16, 245.98, 243.62, 244.82], 'YTD': [230.82, 246.29, 238.18, 239.16, 242.96, 208.72, 201.15, 208.56, 208.73, 214.33, 209.87, 211.71, 210.57, 233.65, 249.7, 255.08, 268.26, 272.68, 264.14, 266.32, 261.26, 245.22, 246, 234.27, 241.7, 244.82], '6M': [247.38, 239.12, 238.42, 242.96, 208.72, 201.15, 208.56, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 259.34, 265.29, 256.52, 244.19, 246, 234.27, 241.7, 244.82], '1Y': [222.54, 223.19, 228.29, 230.19, 222.31, 224.56, 223.81, 228.71, 225.99, 230.33, 231.62, 220.21, 220.63, 225.22, 215.57, 217.95, 230.3, 250.2, 244.2, 222.69, 229.67, 232.38, 231.78, 221.27, 232.38, 226.5, 247.38, 239.12, 238.42, 242.96, 208.72, 201.15, 205.27, 208.39, 213.49, 211.74, 210.14, 200.95, 213.77, 249.02, 249.91, 259.7, 273.55, 265.82, 259.34, 265.29, 256.52, 244.19, 246, 234.27, 241.7, 244.82] },
      velocityScore: { '1D': -0.9, '1W': 0.9, '1M': -10.6, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 31.8, revenueGrowth: 17, eps: 7.7, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.29, GTEK: false, ARKK: 2.41, MARS: false, FRWD: 2.99, BCTK: 4.27, FWD: 1.53, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.28, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'LRCX', name: 'Lam Research Corp', easyScore: 5, avgWeight: 4.29, proScore: 1.26, coverage: 0.294,
      price: 353.27, weeklyPrices: [351.41, 350.20, 326.13, 333.15, 353.27], weeklyChange: 0.53, dayChange: 6.04, sortRank: 0, periodReturns: { '1M': 8, 'YTD': 106.4, '6M': 61.8, '1Y': 253.9 },
      priceHistory: { '1D': [333.15, 366.8, 366.14, 364.8, 356.08, 355.76, 353.18, 354.14, 353.84, 355, 355.08, 354.27, 354.59, 356.52, 356.77, 356.91, 357.74, 358.43, 356.67, 355.9, 357.18, 355.57, 353.76, 353.27], '1W': [351.41, 350.2, 326.13, 333.15, 353.27], '1M': [327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82, 379.09, 410.91, 433.33, 391.26, 351.41, 350.2, 326.13, 333.15, 353.27], 'YTD': [171.18, 200.96, 217.47, 217.94, 237.5, 229.28, 235.58, 244.25, 217.27, 215.23, 224.71, 233.45, 222.01, 258.76, 260.96, 258.56, 256.72, 294.05, 284.72, 305.35, 317.12, 324.45, 369.34, 374.8, 391.26, 353.27], '6M': [218.36, 222.96, 222.87, 237.5, 229.28, 235.58, 244.25, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 273.38, 322.68, 334.41, 327.16, 369.34, 374.8, 391.26, 353.27], '1Y': [99.81, 100.37, 97.1, 99.09, 95.94, 106.74, 99.15, 103.63, 97.74, 107.36, 121.9, 128.32, 142.79, 142.54, 144.78, 141.25, 160.67, 165.05, 161.42, 148.8, 151.93, 159.75, 168.26, 154.98, 177.33, 185.06, 218.36, 222.96, 222.87, 237.5, 229.28, 235.58, 242.27, 231, 211.15, 219.4, 233.31, 199.93, 224.35, 272.41, 258.37, 251.23, 275.8, 289.24, 273.38, 322.68, 334.41, 327.16, 369.34, 374.8, 391.26, 353.27] },
      velocityScore: { '1D': -1.6, '1W': -11.9, '1M': -1.6, '6M': null }, isNew: false,
      marketCap: '$442B', pe: 66.7, revenueGrowth: 24, eps: 5.3, grossMargin: 50, dividendYield: 0.31,
      etfPresence: { PTF: 2.98, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.57, BCTK: 7.41, FWD: 1.86, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 3.65, XMMO: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 5, avgWeight: 4.25, proScore: 1.25, coverage: 0.294,
      price: 353.93, weeklyPrices: [356.18, 364.90, 363.62, 358.71, 353.93], weeklyChange: -0.63, dayChange: -1.33, sortRank: 0, periodReturns: { '1M': -2.3, 'YTD': 12.8, '6M': 7.5, '1Y': 99.2 },
      priceHistory: { '1D': [358.71, 354.92, 353.74, 351.73, 349.17, 351.45, 350.55, 350.05, 350.47, 350.95, 350.07, 350.48, 350.82, 351.82, 352.51, 352.36, 352.02, 352.33, 352.43, 352.94, 353.78, 354.07, 353.76, 353.93], '1W': [356.18, 364.9, 363.62, 358.71, 353.93], '1M': [362.29, 353.32, 356.56, 358.16, 367.11, 371.1, 362.1, 367.46, 348.78, 346.08, 345.04, 342.19, 334.69, 351.28, 353.33, 357.89, 356.18, 364.9, 363.62, 358.71, 353.93], 'YTD': [313.8, 326.01, 333.16, 328.43, 344.9, 324.4, 302.82, 310.92, 303.56, 306.93, 306.3, 289.59, 294.9, 316.37, 332.77, 337.75, 383.22, 397.05, 393.32, 379.38, 372.58, 361.17, 371.1, 345.04, 357.89, 353.93], '6M': [329.14, 330.34, 333.59, 344.9, 324.4, 302.82, 310.92, 306.36, 306.01, 304.42, 299.02, 273.14, 303.93, 330.58, 330.47, 347.5, 384.27, 383.82, 384.9, 384.84, 358.39, 362.29, 371.1, 345.04, 357.89, 353.93], '1Y': [177.66, 183.77, 191.51, 197.44, 196.92, 203.03, 200.19, 207.95, 231.1, 239.56, 249.85, 247.83, 245.54, 245.46, 251.71, 252.53, 275.17, 284.75, 287.43, 292.99, 323.64, 320.62, 321, 298.06, 315.67, 315.32, 329.14, 330.34, 333.59, 344.9, 324.4, 302.82, 311.69, 306.36, 306.01, 304.42, 299.02, 273.14, 303.93, 330.58, 330.47, 347.5, 384.27, 383.82, 384.9, 384.84, 358.39, 362.29, 371.1, 345.04, 357.89, 353.93] },
      velocityScore: { '1D': 0, '1W': 6.8, '1M': 40.4, '6M': null }, isNew: false,
      marketCap: '$4.3T', pe: 27, revenueGrowth: 22, eps: 13.09, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.21, GTEK: false, ARKK: 1.9, MARS: false, FRWD: false, BCTK: 6.53, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.92, SGRT: false, SPMO: 3.71, XMMO: false },
      tonyNote: 'Alphabet Inc Class C appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 4.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRWD', name: 'CrowdStrike', easyScore: 5, avgWeight: 2.69, proScore: 0.79, coverage: 0.294,
      price: 198, weeklyPrices: [193.98, 199.38, 194.62, 191.12, 198.00], weeklyChange: 2.07, dayChange: 3.6, sortRank: 0, periodReturns: { '1M': 22.8, 'YTD': 69, '6M': 68.3, '1Y': 54.2 },
      priceHistory: { '1D': [191.12, 194, 195.79, 195.35, 196.34, 196.1, 195.27, 195.56, 195.09, 195.65, 195.86, 195.85, 196.14, 197.03, 197.46, 196.98, 196.37, 196.64, 196.68, 196.83, 197.28, 197.37, 198.1, 198], '1W': [193.98, 199.38, 194.62, 191.12, 198], '1M': [161.23, 161.93, 172.88, 170.7, 173.23, 169.87, 170.74, 171.21, 168.86, 170.23, 168.26, 169.66, 175.27, 185.73, 190.79, 193.18, 193.98, 199.38, 194.62, 191.12, 198], 'YTD': [117.19, 115.97, 113.75, 113.12, 109.71, 102.01, 103.57, 87.56, 97.86, 109.08, 108.95, 96.46, 98.33, 98.67, 104.55, 111.35, 113.91, 131.94, 148.52, 165.87, 195.54, 164.7, 169.87, 168.26, 193.18, 198], '6M': [117.65, 113.47, 117.08, 109.71, 102.01, 103.57, 87.56, 96.21, 108.53, 105.96, 103.33, 95.01, 105.81, 99.62, 112.4, 113.75, 119.13, 136.54, 154.22, 167.89, 192.24, 161.23, 169.87, 168.26, 193.18, 198], '1Y': [128.38, 117.61, 115.38, 115.79, 112.92, 108.03, 104.79, 104.4, 103.3, 106.22, 111.38, 119.08, 124.99, 127.49, 122.25, 125.03, 136.38, 133.54, 136.46, 130.15, 128.09, 131.04, 129.88, 117.5, 119.28, 113.39, 117.65, 113.47, 117.08, 109.71, 102.01, 103.57, 87.58, 96.21, 108.53, 105.96, 103.33, 95.01, 105.81, 99.62, 112.4, 113.75, 119.13, 136.54, 154.22, 167.89, 192.24, 161.23, 169.87, 168.26, 193.18, 198] },
      velocityScore: { '1D': 0, '1W': 1.3, '1M': 6.8, '6M': null }, isNew: false,
      marketCap: '$202B', pe: null, revenueGrowth: 26, eps: -0.04, grossMargin: 75, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.54, IGV: 7.14, FDTX: 1.21, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.33, FWD: 1.24, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'CrowdStrike appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 2.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, avgWeight: 5.06, proScore: 1.19, coverage: 0.235,
      price: 380.8, weeklyPrices: [390.49, 386.74, 388.84, 383.34, 380.80], weeklyChange: -2.48, dayChange: -0.66, sortRank: 0, periodReturns: { '1M': -5.6, 'YTD': -21.3, '6M': -20.5, '1Y': -24.4 },
      priceHistory: { '1D': [383.34, 378.33, 378.59, 377.17, 376.12, 377.54, 377.86, 379.52, 379.67, 379.89, 380.58, 380.05, 379.43, 379.67, 379.66, 379.42, 379.56, 380.57, 380.38, 380.6, 380.56, 380.68, 380.64, 380.8], '1W': [390.49, 386.74, 388.84, 383.34, 380.8], '1M': [403.41, 397.36, 390.34, 390.74, 399.76, 393.83, 378.91, 379.4, 367.34, 373.94, 365.46, 352.83, 372.97, 368.57, 373.02, 384.28, 390.49, 386.74, 388.84, 383.34, 380.8], 'YTD': [483.62, 478.11, 456.66, 465.95, 423.37, 413.6, 396.86, 389, 403.93, 405.76, 391.79, 371.04, 369.37, 373.07, 420.26, 415.75, 414.44, 415.12, 421.92, 418.57, 460.52, 411.74, 393.83, 365.46, 384.28, 380.8], '6M': [479.28, 459.86, 470.28, 423.37, 413.6, 396.86, 389, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 417.42, 416.03, 441.31, 403.41, 393.83, 365.46, 384.28, 380.8], '1Y': [503.51, 505.62, 505.87, 513.24, 524.94, 520.58, 505.72, 502.04, 505.35, 500.37, 510.02, 510.15, 519.71, 524.85, 513.43, 520.54, 541.55, 507.16, 511.14, 487.12, 476.99, 477.73, 478.56, 476.12, 488.02, 472.94, 479.28, 459.86, 470.28, 423.37, 413.6, 396.86, 384.47, 398.55, 409.41, 399.95, 383, 358.96, 372.29, 393.11, 424.16, 429.25, 411.38, 407.77, 417.42, 416.03, 441.31, 403.41, 393.83, 365.46, 384.28, 380.8] },
      velocityScore: { '1D': -0.8, '1W': 1.7, '1M': -0.8, '6M': null }, isNew: false,
      marketCap: '$2.8T', pe: 22.7, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 0.95,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.12, FDTX: 2.93, GTEK: false, ARKK: false, MARS: false, FRWD: 3.03, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 6.15, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, avgWeight: 4.82, proScore: 1.13, coverage: 0.235,
      price: 905.64, weeklyPrices: [820.16, 868.26, 827.64, 860.02, 905.64], weeklyChange: 10.42, dayChange: 5.31, sortRank: 0, periodReturns: { '1M': 7, 'YTD': 228.9, '6M': 197.9, '1Y': 537.7 },
      priceHistory: { '1D': [860.02, 921.79, 930.63, 932.61, 918.31, 916.01, 907.37, 908.94, 913.4, 913.98, 913.66, 914.17, 909.85, 910.42, 910.04, 906.91, 911.08, 914.07, 914.42, 912.77, 914.52, 910.14, 910.8, 905.64], '1W': [820.16, 868.26, 827.64, 860.02, 905.64], '1M': [846.01, 815.99, 868.09, 931.04, 1018.8, 1031.34, 1066.07, 1070.23, 1094.04, 1038.59, 993.25, 1025.36, 899.9, 968.53, 965, 915.19, 820.16, 868.26, 827.64, 860.02, 905.64], 'YTD': [275.39, 284.47, 320.32, 346.1, 432.95, 425, 415.94, 396.02, 357.62, 384.29, 406.77, 413.22, 423.12, 500.77, 531.81, 587.62, 726.93, 782.64, 795.47, 812.73, 921.26, 876.77, 1031.34, 993.25, 915.19, 905.64], '6M': [304.01, 326.23, 358.29, 432.95, 425, 415.94, 396.02, 379.52, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 579.03, 771.01, 808.8, 733.35, 845.76, 926.61, 846.01, 1031.34, 993.25, 915.19, 905.64], '1Y': [142.01, 147.12, 152.76, 147.42, 147.27, 156.92, 158.4, 165.24, 176.32, 193.04, 213.36, 223.7, 256.84, 224.35, 219.38, 215.05, 265.62, 275.77, 283.26, 259.14, 261.89, 258.67, 298.92, 277.65, 285.27, 287.54, 304.01, 326.23, 358.29, 432.95, 425, 415.94, 407.4, 379.52, 374.33, 398.78, 404.02, 362.43, 468.72, 533.44, 559.9, 579.03, 771.01, 808.8, 733.35, 845.76, 926.61, 846.01, 1031.34, 993.25, 915.19, 905.64] },
      velocityScore: { '1D': -10.3, '1W': 8.7, '1M': -33.9, '6M': null }, isNew: false,
      marketCap: '$203B', pe: 85.6, revenueGrowth: 44, eps: 10.58, grossMargin: 42, dividendYield: 0.34,
      etfPresence: { PTF: 3.79, WCLD: false, IGV: false, FDTX: 4.14, GTEK: false, ARKK: false, MARS: false, FRWD: 7.22, BCTK: false, FWD: false, CBSE: false, FCUS: 4.13, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 4, avgWeight: 4.5, proScore: 1.06, coverage: 0.235,
      price: 336.08, weeklyPrices: [348.06, 357.53, 337.04, 320.59, 336.08], weeklyChange: -3.44, dayChange: 4.83, sortRank: 0, periodReturns: { '1M': 29, 'YTD': 82.5, '6M': 77.8, '1Y': 63.1 },
      priceHistory: { '1D': [320.59, 326.31, 328.34, 327.65, 331.41, 330.48, 329.77, 330.92, 330.56, 331.1, 331.5, 331.58, 333.24, 333.58, 334.26, 333.31, 332.93, 333.31, 333.5, 334.52, 335.13, 335.76, 336.54, 336.08], '1W': [348.06, 357.53, 337.04, 320.59, 336.08], '1M': [260.52, 263.22, 279.53, 279.62, 284.54, 279.9, 282.13, 287.78, 286.4, 290.92, 285.26, 293.09, 304.2, 332, 341.02, 352.04, 348.06, 357.53, 337.04, 320.59, 336.08], 'YTD': [184.2, 190.8, 187.73, 180.18, 175.42, 166, 163.5, 141.67, 156.09, 165.58, 168.91, 153.22, 160.67, 166.99, 166.97, 173.21, 181.08, 207.88, 242.83, 260.58, 300.48, 266.33, 279.9, 285.26, 352.04, 336.08], '6M': [189.02, 187.66, 184.22, 175.42, 166, 163.5, 141.67, 150.15, 165.1, 167.45, 164.05, 154.35, 169.87, 161.59, 174.96, 180.99, 183.98, 215.6, 240.13, 256.75, 297.18, 260.52, 279.9, 285.26, 352.04, 336.08], '1Y': [206.06, 192.59, 199.22, 183.03, 172.89, 176.86, 184.43, 184.23, 191.53, 197.33, 203.12, 200.7, 206.8, 217.79, 206.7, 212.42, 217.16, 213.18, 210.04, 199.9, 186.27, 193.63, 192.96, 183.44, 187.22, 179.37, 189.02, 187.66, 184.22, 175.42, 166, 163.5, 144.14, 150.15, 165.1, 167.45, 164.05, 154.35, 169.87, 161.59, 174.96, 180.99, 183.98, 215.6, 240.13, 256.75, 297.18, 260.52, 279.9, 285.26, 352.04, 336.08] },
      velocityScore: { '1D': -1.9, '1W': -3.6, '1M': 1, '6M': null }, isNew: false,
      marketCap: '$274B', pe: 292.2, revenueGrowth: 31, eps: 1.15, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.97, IGV: 9.54, FDTX: 4.15, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.34, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 4, avgWeight: 4.45, proScore: 1.05, coverage: 0.235,
      price: 406.84, weeklyPrices: [393.45, 419.77, 402.90, 394.06, 406.84], weeklyChange: 3.4, dayChange: 3.28, sortRank: 0, periodReturns: { '1M': 2.6, 'YTD': -9.5, '6M': -8.6, '1Y': 37.5 },
      priceHistory: { '1D': [393.93, 395.22, 395.41, 396.28, 392.98, 395.18, 395.48, 396.36, 395.07, 395.93, 399.85, 399.96, 401.01, 398.62, 401.1, 401.77, 403.61, 404.5, 404.32, 404.82, 404.5, 406.05, 406.74, 406.84], '1W': [393.45, 419.77, 402.9, 394.06, 406.84], '1M': [396.68, 381.59, 399.15, 406.43, 411.15, 404.66, 396.38, 400.49, 405.05, 381.61, 375.53, 375.12, 379.71, 411.84, 420.6, 425.3, 393.45, 419.77, 402.9, 394.06, 406.84], 'YTD': [449.72, 435.8, 438.57, 449.06, 421.81, 417.32, 410.63, 409.38, 392.43, 399.24, 392.78, 385.95, 381.26, 345.62, 388.9, 373.72, 390.82, 428.35, 422.24, 426.01, 415.88, 408.95, 404.66, 375.53, 425.3, 406.84], '6M': [445.01, 437.5, 435.2, 421.81, 417.32, 410.63, 409.38, 403.32, 398.68, 395.56, 380.85, 355.28, 346.65, 364.2, 386.42, 376.02, 389.37, 433.45, 404.11, 433.59, 423.74, 396.68, 404.66, 375.53, 425.3, 406.84], '1Y': [295.88, 321.67, 332.56, 319.04, 319.91, 339.38, 323.9, 351.67, 334.09, 347.79, 425.86, 442.79, 459.46, 438.69, 435.15, 438.97, 461.51, 462.07, 430.6, 403.99, 419.4, 446.74, 451.45, 467.26, 485.4, 438.07, 445.01, 437.5, 435.2, 421.81, 417.32, 410.63, 399.83, 403.32, 398.68, 395.56, 380.85, 355.28, 346.65, 364.2, 386.42, 376.02, 389.37, 433.45, 404.11, 433.59, 423.74, 396.68, 404.66, 375.53, 425.3, 406.84] },
      velocityScore: { '1D': -0.9, '1W': 7.1, '1M': -8.7, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 369.9, revenueGrowth: 16, eps: 1.1, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 10.03, MARS: false, FRWD: false, BCTK: 3.37, FWD: 1.36, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.06, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 4, avgWeight: 3.68, proScore: 0.87, coverage: 0.235,
      price: 128.58, weeklyPrices: [129.30, 132.54, 134.37, 132.22, 128.58], weeklyChange: -0.56, dayChange: -2.75, sortRank: 0, periodReturns: { '1M': -2.6, 'YTD': -27.7, '6M': -27.6, '1Y': -10.2 },
      priceHistory: { '1D': [132.22, 127.6, 128.43, 127.89, 125.37, 126.54, 125.79, 126.1, 126.35, 126.65, 127.25, 126.71, 126.37, 126.89, 126.99, 127.04, 127.31, 127.78, 127.68, 128, 127.97, 127.86, 128.49, 128.58], '1W': [129.3, 132.54, 134.37, 132.22, 128.58], '1M': [132.07, 130.21, 131.08, 127.99, 134.71, 133.25, 130.63, 128.47, 119.5, 116.7, 113.5, 107.27, 112.93, 115.7, 116.67, 125.73, 129.3, 132.54, 134.37, 132.22, 128.58], 'YTD': [177.75, 176.86, 177.07, 169.6, 147.76, 142.91, 133.02, 128.84, 147.22, 151.14, 152.77, 154.96, 146.49, 130.49, 142.76, 141.57, 144.07, 137.8, 133.99, 136.88, 160.65, 136.47, 133.25, 113.5, 125.73, 128.58], '6M': [177.49, 170.96, 167.47, 147.76, 142.91, 133.02, 128.84, 145.17, 156.43, 152.72, 160.84, 137.55, 150.07, 135.7, 145.97, 141.18, 135.91, 136, 135.26, 136.6, 152.17, 132.07, 133.25, 113.5, 125.73, 128.58], '1Y': [143.13, 150.91, 154.63, 158.61, 179.54, 184.37, 156.01, 160.87, 154.9, 166.74, 168.33, 179.56, 184.95, 183.56, 179.62, 175.49, 198.81, 187.9, 184.17, 165.42, 163.55, 176.08, 187.91, 177.29, 194.17, 167.86, 177.49, 170.96, 167.47, 147.76, 142.91, 133.02, 130.6, 145.17, 156.43, 152.72, 160.84, 137.55, 150.07, 135.7, 145.97, 141.18, 135.91, 136, 135.26, 136.6, 152.17, 132.07, 133.25, 113.5, 125.73, 128.58] },
      velocityScore: { '1D': 1.2, '1W': 16, '1M': -12.1, '6M': null }, isNew: false,
      marketCap: '$308B', pe: 144.5, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.54, FDTX: 2, GTEK: false, ARKK: 2.97, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.2, XMMO: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 4, avgWeight: 3.21, proScore: 0.75, coverage: 0.235,
      price: 1932.19, weeklyPrices: [1745.00, 1744.43, 1617.70, 1727.18, 1932.19], weeklyChange: 10.73, dayChange: 11.87, sortRank: 0, periodReturns: { '1M': 17.3, 'YTD': 714, '6M': 412, '1Y': 4082.2 },
      priceHistory: { '1D': [1727.18, 1813.83, 1844, 1855.45, 1832.64, 1845.9, 1856.69, 1876.16, 1879.85, 1884.53, 1877.9, 1880.81, 1882.23, 1881.77, 1882.18, 1878.81, 1903.25, 1917, 1934.95, 1940.36, 1948.39, 1944.47, 1941.82, 1932.19], '1W': [1745, 1744.43, 1617.7, 1727.18, 1932.19], '1M': [1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745, 1744.43, 1617.7, 1727.18, 1932.19], 'YTD': [237.38, 334.54, 409.24, 473.83, 665.24, 583.4, 590.59, 638.52, 565.41, 618.89, 753.69, 677.86, 692.73, 851.57, 919.47, 932.43, 1187, 1562.34, 1407.61, 1478.69, 1761.43, 1642, 1991.55, 1914.46, 2032.22, 1932.19], '6M': [377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46, 2032.22, 1932.19], '1Y': [46.2, 41.36, 43, 43.39, 42.1, 47.01, 44.4, 47.35, 53.01, 73.92, 93.97, 99.83, 121.12, 131.88, 144.3, 146.95, 204.36, 216.5, 283.1, 245.96, 220.5, 194.38, 232.86, 206.83, 250.08, 275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46, 2032.22, 1932.19] },
      velocityScore: { '1D': -9.6, '1W': -15.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$286B', pe: 66.2, revenueGrowth: 251, eps: 29.19, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 5.18, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.32, CBSE: false, FCUS: 3.97, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.36, XMMO: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'DDOG', name: 'DDOG', easyScore: 4, avgWeight: 3.08, proScore: 0.72, coverage: 0.235,
      price: 268.18, weeklyPrices: [260.36, 255.37, 256.81, 261.09, 268.18], weeklyChange: 3, dayChange: 2.72, sortRank: 0, periodReturns: { '1M': 18, 'YTD': 97.2, '6M': 113.7, '1Y': 87.9 },
      priceHistory: { '1D': [261.09, 266.02, 270.64, 268.63, 268.1, 266.52, 265.64, 266.88, 266.26, 267.68, 266.77, 267.42, 267.21, 268.32, 268.52, 268, 267.27, 267.98, 268.45, 268.05, 268.07, 267.47, 267.55, 268.18], '1W': [260.36, 255.37, 256.81, 261.09, 268.18], '1M': [227.34, 227.63, 234.24, 229.9, 233.09, 231.11, 226.63, 223, 221.37, 220.57, 222.65, 220.94, 239.77, 248.57, 260.36, 264.48, 260.36, 255.37, 256.81, 261.09, 268.18], 'YTD': [135.99, 130.68, 120.86, 130.13, 129.05, 114.01, 122.56, 104.43, 111.77, 123.08, 131.26, 123.29, 118.67, 108.98, 123.47, 127.86, 140.53, 200.16, 207.98, 222.32, 277.49, 231.68, 231.11, 222.65, 264.48, 268.18], '6M': [125.49, 119.02, 136.64, 129.05, 114.01, 122.56, 104.43, 111.11, 128.56, 126.57, 129.23, 115.81, 116.54, 110.57, 129.29, 131.55, 145.73, 199.94, 215.15, 223.65, 269.13, 227.34, 231.11, 222.65, 264.48, 268.18], '1Y': [142.75, 139.36, 144, 148.88, 136.96, 128.71, 128.46, 126.31, 132.6, 139.13, 134.23, 136.57, 152.7, 164.12, 160.02, 154.21, 156, 154.98, 190.89, 176.31, 158.99, 155.83, 151.2, 136.71, 138.04, 133.77, 125.49, 119.02, 136.64, 129.05, 114.01, 122.56, 102.61, 111.11, 128.56, 126.57, 129.23, 115.81, 116.54, 110.57, 129.29, 131.55, 145.73, 199.94, 215.15, 223.65, 269.13, 227.34, 231.11, 222.65, 264.48, 268.18] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$95B', pe: 687.6, revenueGrowth: 32, eps: 0.39, grossMargin: 80, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.86, IGV: 3.19, FDTX: 2.39, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: 3.88, SPMO: false, XMMO: false },
      tonyNote: 'DDOG appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 2.97, proScore: 0.7, coverage: 0.235,
      price: 122.19, weeklyPrices: [119.46, 120.14, 121.88, 119.22, 122.19], weeklyChange: 2.29, dayChange: 2.49, sortRank: 0, periodReturns: { '1M': 10.7, 'YTD': -24.1, '6M': -25.7, '1Y': 6.9 },
      priceHistory: { '1D': [119.22, 119.91, 120.86, 120.15, 119.11, 120.4, 119.77, 120.46, 120.17, 120.37, 120.46, 120.33, 120.3, 120.87, 121.46, 121.8, 121.71, 121.66, 121.75, 122.18, 121.91, 122.03, 122.2, 122.19], '1W': [119.46, 120.14, 121.88, 119.22, 122.19], '1M': [110.42, 108.2, 110.47, 108.24, 112.49, 113.23, 108.09, 108.85, 107.98, 107.68, 114.17, 111.62, 116.86, 114.21, 114.18, 121.63, 119.46, 120.14, 121.88, 119.22, 122.19], 'YTD': [160.97, 168.28, 157.99, 137.89, 132.2, 118.4, 113.54, 116.93, 121.87, 129.36, 123.75, 118.42, 118.52, 112.38, 126.94, 124.23, 127.67, 110.41, 100.28, 103, 124.12, 110.78, 113.23, 114.17, 121.63, 122.19], '6M': [164.48, 155.81, 136.31, 132.2, 118.4, 113.54, 116.93, 119.38, 133.5, 126.58, 121.1, 111.77, 117.06, 117.64, 131.13, 122.05, 107.63, 99.84, 101.01, 104.9, 117.01, 110.42, 113.23, 114.17, 121.63, 122.19], '1Y': [114.32, 120, 122.21, 123.01, 154.9, 150.09, 137.29, 140.85, 140.22, 142.2, 147.87, 148.83, 149.57, 166.43, 156.21, 162.01, 179.01, 162.92, 156.59, 146, 157.37, 160, 168.42, 161.73, 169.45, 157.2, 164.48, 155.81, 136.31, 132.2, 118.4, 113.54, 117.28, 119.38, 133.5, 126.58, 121.1, 111.77, 117.06, 117.64, 131.13, 122.05, 107.63, 99.84, 101.01, 104.9, 117.01, 110.42, 113.23, 114.17, 121.63, 122.19] },
      velocityScore: { '1D': 0, '1W': null, '1M': -23.9, '6M': null }, isNew: false,
      marketCap: '$159B', pe: 118.6, revenueGrowth: 34, eps: 1.03, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.59, GTEK: false, ARKK: 4.4, MARS: false, FRWD: 2.12, BCTK: 2.78, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASML', name: 'ASML Holding', easyScore: 4, avgWeight: 2.79, proScore: 0.66, coverage: 0.235,
      price: 1820.75, weeklyPrices: [1769.32, 1825.07, 1747.28, 1768.65, 1820.75], weeklyChange: 2.91, dayChange: 2.95, sortRank: 0, periodReturns: { '1M': 2.4, 'YTD': 70.2, '6M': 42.9, '1Y': 127.6 },
      priceHistory: { '1D': [1768.65, 1842.53, 1844.53, 1843.78, 1829.42, 1830.92, 1824.47, 1824.92, 1829.95, 1833.27, 1835.32, 1834.72, 1829.58, 1829.67, 1825.81, 1824.14, 1827.31, 1832.63, 1831.19, 1830.73, 1828.68, 1826.15, 1819.9, 1820.75], '1W': [1769.32, 1825.07, 1747.28, 1768.65, 1820.75], '1M': [1777.77, 1734.19, 1899.48, 1863.55, 1892.66, 1803.89, 1867.83, 1929.68, 1929.25, 1778.46, 1762.77, 1841.18, 1794.62, 1883.11, 1989.44, 1843.04, 1769.32, 1825.07, 1747.28, 1768.65, 1820.75], 'YTD': [1069.86, 1194.32, 1331.6, 1389.04, 1441.39, 1429.49, 1419.78, 1497.8, 1360.94, 1383.4, 1355.17, 1393.89, 1359.76, 1448.64, 1410.83, 1417.8, 1427.02, 1592.02, 1501.81, 1632.9, 1628.57, 1749.04, 1803.89, 1762.77, 1843.04, 1820.75], '6M': [1273.88, 1358.57, 1413.35, 1441.39, 1429.49, 1419.78, 1497.8, 1423.54, 1357.42, 1375.56, 1369.62, 1253.96, 1306.45, 1518.3, 1458.97, 1384.56, 1442.92, 1520.94, 1459.44, 1632.03, 1705.37, 1777.77, 1803.89, 1762.77, 1843.04, 1820.75], '1Y': [799.83, 754.45, 716.93, 721.45, 690.96, 755.57, 749.49, 763.2, 736.82, 793.14, 872.27, 946.94, 1003.27, 987.81, 1009.81, 1011.57, 1070.84, 1043.75, 1037.33, 1039.33, 1003.22, 1140.92, 1119.32, 1015.43, 1065.52, 1163.78, 1273.88, 1358.57, 1413.35, 1441.39, 1429.49, 1419.78, 1485.99, 1423.54, 1357.42, 1375.56, 1369.62, 1253.96, 1306.45, 1518.3, 1458.97, 1384.56, 1442.92, 1520.94, 1459.44, 1632.03, 1705.37, 1777.77, 1803.89, 1762.77, 1843.04, 1820.75] },
      velocityScore: { '1D': 0, '1W': null, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$702B', pe: 61.6, revenueGrowth: 13, eps: 29.54, grossMargin: 53, dividendYield: 0.5,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 4.83, BCTK: 2.19, FWD: 1.57, CBSE: 2.56, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'ASML Holding appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 3, avgWeight: 4.9, proScore: 2.94, coverage: 0.6,
      price: 672.09, weeklyPrices: [668.31, 674.04, 656.79, 666.33, 672.09], weeklyChange: 0.57, dayChange: 0.86, sortRank: 0, periodReturns: { '1M': -2.9, 'YTD': 59.2, '6M': 59, '1Y': 75.9 },
      priceHistory: { '1D': [666.33, 680.1, 678.91, 677.68, 673.77, 675.66, 676, 676.17, 676.47, 678.41, 676.92, 676.7, 675.54, 676.07, 675.26, 674.87, 673.92, 673.71, 672.75, 674.11, 673.22, 673.11, 671.7, 672.09], '1W': [668.31, 674.04, 656.79, 666.33, 672.09], '1M': [691.95, 650.92, 683.29, 707.74, 724.35, 719.29, 714.85, 702.25, 740.14, 702.29, 701.88, 718.59, 687.87, 714.45, 720.04, 691.4, 668.31, 674.04, 656.79, 666.33, 672.09], 'YTD': [422.06, 413.17, 447.64, 468.76, 477.77, 514.56, 525.13, 568.21, 566, 564.05, 572, 573.5, 560.12, 582.06, 587.42, 633.44, 742.21, 745, 769.99, 723.44, 687.48, 693.81, 719.29, 701.88, 691.4, 672.09], '6M': [422.57, 466.75, 470.77, 477.77, 514.56, 525.13, 568.21, 572.66, 568.04, 574.02, 567.45, 533.78, 555.57, 594.4, 605.89, 630.94, 771.61, 765.81, 714.13, 742.18, 706.06, 691.95, 719.29, 701.88, 691.4, 672.09], '1Y': [382.12, 389.12, 405.11, 411.11, 387.5, 379.96, 375.87, 383.92, 374.41, 390.17, 376.01, 402.87, 420.65, 443.45, 436.93, 412.21, 448.69, 453.45, 449.42, 445.47, 450.14, 456.02, 462.21, 414.25, 433.58, 439.68, 422.57, 466.75, 470.77, 477.77, 514.56, 525.13, 549.11, 572.66, 568.04, 574.02, 567.45, 533.78, 555.57, 594.4, 605.89, 630.94, 771.61, 765.81, 714.13, 742.18, 706.06, 691.95, 719.29, 701.88, 691.4, 672.09] },
      velocityScore: { '1D': 2.1, '1W': 1.7, '1M': 13.5, '6M': null }, isNew: false,
      marketCap: '$101B', pe: 92.6, revenueGrowth: 26, eps: 7.26, grossMargin: 15, dividendYield: 0.07,
      etfPresence: { POW: 5.11, VOLT: 5.31, PBD: false, PBW: false, IVEP: 4.27 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 3, avgWeight: 4.59, proScore: 2.76, coverage: 0.6,
      price: 411.14, weeklyPrices: [398.52, 413.42, 395.68, 399.56, 411.14], weeklyChange: 3.17, dayChange: 2.9, sortRank: 0, periodReturns: { '1M': 2.3, 'YTD': 29.1, '6M': 26.7, '1Y': 14.3 },
      priceHistory: { '1D': [399.56, 408.92, 406.99, 407.69, 405.72, 407.36, 407.24, 408.78, 407.11, 407.74, 408.84, 408.48, 408.34, 408.46, 408.28, 408.23, 408.42, 408.94, 408.34, 408.8, 410.88, 410.63, 410.87, 411.14], '1W': [398.52, 413.42, 395.68, 399.56, 411.14], '1M': [401.72, 375.46, 393.64, 391.39, 407.06, 407.71, 409.64, 421.77, 435.78, 405.28, 404.59, 419.87, 402.68, 408.26, 426.12, 412.31, 398.52, 413.42, 395.68, 399.56, 411.14], 'YTD': [318.51, 320.58, 333.46, 331.22, 359.44, 377.06, 391.49, 374.56, 355.56, 361.06, 360.54, 375, 365.56, 400.44, 392.73, 424.5, 425.55, 401.51, 399.44, 391.35, 400.08, 403.14, 407.71, 404.59, 412.31, 411.14], '6M': [324.51, 343.75, 332.28, 359.44, 377.06, 391.49, 374.56, 377.4, 353.87, 361.04, 359.74, 343.53, 368.85, 401.9, 409.7, 413.07, 410.86, 401.53, 371.88, 403.13, 417.62, 401.72, 407.71, 404.59, 412.31, 411.14], '1Y': [359.78, 362.89, 380.24, 390.09, 358.16, 357.49, 346.22, 352.02, 342.99, 362.25, 363.35, 372.21, 373.84, 376.7, 381.72, 360.6, 387.75, 385.44, 369.4, 345.65, 336.65, 335.57, 353.45, 315.82, 323.67, 327.31, 324.51, 343.75, 332.28, 359.44, 377.06, 391.49, 362.05, 377.4, 353.87, 361.04, 359.74, 343.53, 368.85, 401.9, 409.7, 413.07, 410.86, 401.53, 371.88, 403.13, 417.62, 401.72, 407.71, 404.59, 412.31, 411.14] },
      velocityScore: { '1D': 1.5, '1W': 2.2, '1M': 14.5, '6M': null }, isNew: false,
      marketCap: '$160B', pe: 40.2, revenueGrowth: 17, eps: 10.23, grossMargin: 37, dividendYield: 1.1,
      etfPresence: { POW: 4.26, VOLT: 5.45, PBD: false, PBW: false, IVEP: 4.07 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 3, avgWeight: 4.18, proScore: 2.51, coverage: 0.6,
      price: 1085.23, weeklyPrices: [1113.11, 1152.04, 1077.08, 1070.99, 1085.23], weeklyChange: -2.5, dayChange: 1.33, sortRank: 0, periodReturns: { '1M': 17.9, 'YTD': 66, '6M': 74.3, '1Y': 102.6 },
      priceHistory: { '1D': [1070.99, 1098.38, 1081.42, 1082.16, 1072.92, 1076.76, 1074.96, 1079.39, 1075, 1078.17, 1080.08, 1076.23, 1078.78, 1080.02, 1081.06, 1080.53, 1080.86, 1083.36, 1081.72, 1084.26, 1083.87, 1084.27, 1084.77, 1085.23], '1W': [1113.11, 1152.04, 1077.08, 1070.99, 1085.23], '1M': [920.15, 867.09, 906.79, 940.66, 979.07, 982.35, 1048.86, 1109.73, 1127.59, 1034.98, 1057.65, 1085.47, 1045.17, 1102.51, 1174.86, 1134.35, 1113.11, 1152.04, 1077.08, 1070.99, 1085.23], 'YTD': [653.57, 628.4, 642.23, 657.78, 754.97, 801.54, 819.15, 879.73, 842, 839.2, 858.47, 923.69, 894.78, 968.02, 978.32, 1149.53, 1062.95, 1040.15, 1049.23, 1038.74, 950.54, 933.85, 982.35, 1057.65, 1134.35, 1085.23], '6M': [622.5, 681.55, 665.99, 754.97, 801.54, 819.15, 879.73, 881.18, 830.1, 827.37, 882.64, 817.35, 910.75, 987.5, 991.3, 1088.93, 1095.21, 1071.98, 1011.8, 1070.47, 969.67, 920.15, 982.35, 1057.65, 1134.35, 1085.23], '1Y': [535.77, 561.17, 629.03, 655, 664.55, 634.31, 604.59, 625.91, 577.04, 643.56, 614.79, 628.97, 606.15, 625.45, 615.95, 576, 577.97, 559.7, 575.4, 595.37, 572.56, 601.97, 723, 614.19, 667.32, 679.55, 622.5, 681.55, 665.99, 754.97, 801.54, 819.15, 831.7, 881.18, 830.1, 827.37, 882.64, 817.35, 910.75, 987.5, 991.3, 1088.93, 1095.21, 1071.98, 1011.8, 1070.47, 969.67, 920.15, 982.35, 1057.65, 1134.35, 1085.23] },
      velocityScore: { '1D': 0, '1W': -0.8, '1M': 38.7, '6M': null }, isNew: false,
      marketCap: '$292B', pe: 31.7, revenueGrowth: 16, eps: 34.27, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { POW: 3.56, VOLT: 4.53, PBD: false, PBW: false, IVEP: 4.44 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 3, avgWeight: 3.75, proScore: 2.25, coverage: 0.6,
      price: 86.94, weeklyPrices: [88.34, 87.44, 88.47, 87.44, 86.94], weeklyChange: -1.58, dayChange: -0.57, sortRank: 0, periodReturns: { '1M': 2.5, 'YTD': 8.3, '6M': 8.8, '1Y': 18 },
      priceHistory: { '1D': [87.44, 87.24, 86.9, 87.04, 87.56, 87.51, 87.75, 87.76, 87.71, 87.53, 87.5, 87.36, 87.45, 87.55, 87.56, 87.57, 87.42, 87.32, 87.26, 87.26, 87.12, 87.04, 87.03, 86.94], '1W': [88.34, 87.44, 88.47, 87.44, 86.94], '1M': [84.83, 85.12, 84.84, 85.99, 86.12, 86.23, 85.73, 86.75, 86.08, 86.43, 87.62, 87.7, 88.56, 88.66, 87.77, 86.37, 88.34, 87.44, 88.47, 87.44, 86.94], 'YTD': [80.28, 79.49, 82.19, 84.81, 86.33, 89.48, 92.71, 95.68, 92.59, 91.54, 90.96, 91.16, 92.85, 94.48, 91.83, 96.25, 96.95, 93.1, 93.36, 88.55, 83.66, 84.01, 86.23, 87.62, 86.37, 86.94], '6M': [79.89, 83.63, 85.47, 86.33, 89.48, 92.71, 95.68, 92.71, 92.01, 92.82, 90.23, 92.05, 93.67, 91.31, 90.6, 96.51, 96.28, 94.59, 90.06, 87.65, 85.68, 84.83, 86.23, 87.62, 86.37, 86.94], '1Y': [73.65, 74.77, 72.82, 70.99, 70.54, 72.3, 76.18, 74.84, 71.63, 71.04, 70.31, 73.83, 78.67, 84.04, 85.79, 82.84, 81.76, 82.14, 85.89, 84.27, 84.83, 84.95, 81.27, 80.29, 80.45, 80.93, 79.89, 83.63, 85.47, 86.33, 89.48, 92.71, 94.06, 92.71, 92.01, 92.82, 90.23, 92.05, 93.67, 91.31, 90.6, 96.51, 96.28, 94.59, 90.06, 87.65, 85.68, 84.83, 86.23, 87.62, 86.37, 86.94] },
      velocityScore: { '1D': -0.9, '1W': 6.1, '1M': 50, '6M': null }, isNew: false,
      marketCap: '$181B', pe: 22.1, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.85,
      etfPresence: { POW: 2.21, VOLT: 5.24, PBD: false, PBW: false, IVEP: 3.81 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy Corp', easyScore: 3, avgWeight: 3.39, proScore: 2.04, coverage: 0.6,
      price: 260.09, weeklyPrices: [270.89, 295.05, 269.57, 254.29, 260.09], weeklyChange: -3.99, dayChange: 2.28, sortRank: 0, periodReturns: { '1M': 0.2, 'YTD': 199.3, '6M': 94, '1Y': 805.9 },
      priceHistory: { '1D': [254.29, 270, 265.05, 266.85, 260.83, 262.18, 260.2, 262.27, 262.45, 263.17, 266.88, 264.83, 262.86, 263, 263.79, 263.31, 262.5, 265.08, 263.17, 265.3, 265.14, 264.02, 261.24, 260.09], '1W': [270.89, 295.05, 269.57, 254.29, 260.09], '1M': [259.61, 234.23, 248.88, 260.22, 274.5, 280.88, 284.99, 328.91, 345.85, 321.98, 326.19, 309.18, 252.02, 275.01, 302.7, 289.5, 270.89, 295.05, 269.57, 254.29, 260.09], 'YTD': [86.89, 121.84, 139.17, 144.89, 156.13, 155.17, 145.32, 166.2, 153.02, 154, 156.58, 150.22, 132.45, 160.13, 210.06, 237.57, 290.52, 261.03, 275.95, 302.49, 273.51, 253.57, 280.88, 326.19, 289.5, 260.09], '6M': [134.07, 149.5, 139.62, 156.13, 155.17, 145.32, 166.2, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 261.34, 302.4, 302.85, 259.61, 280.88, 326.19, 289.5, 260.09], '1Y': [28.71, 24.69, 26.89, 37.62, 38.86, 44.08, 44.51, 49.94, 52.45, 62.96, 79.67, 69.18, 90.19, 87.58, 116.58, 94.37, 133.71, 141.41, 126.72, 108.93, 94.29, 102.5, 101.29, 76.97, 91.88, 98.69, 134.07, 149.5, 139.62, 156.13, 155.17, 145.32, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 261.34, 302.4, 302.85, 259.61, 280.88, 326.19, 289.5, 260.09] },
      velocityScore: { '1D': -5.6, '1W': -8.5, '1M': 34.2, '6M': null }, isNew: false,
      marketCap: '$74B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: 1.58, VOLT: 3.76, PBD: false, PBW: false, IVEP: 4.84 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 3, avgWeight: 3.31, proScore: 1.98, coverage: 0.6,
      price: 160.05, weeklyPrices: [152.15, 156.89, 153.18, 154.76, 160.05], weeklyChange: 5.19, dayChange: 3.42, sortRank: 0, periodReturns: { '1M': -2.3, 'YTD': 57, '6M': 51.9, '1Y': 112.8 },
      priceHistory: { '1D': [154.76, 160.5, 161.05, 160.1, 159.14, 160.02, 160.03, 160.48, 160.68, 160.73, 160.56, 160.51, 160.7, 160.7, 160.55, 160.42, 160.87, 160.97, 160.4, 160.18, 159.98, 160.03, 159.93, 160.05], '1W': [152.15, 156.89, 153.18, 154.76, 160.05], '1M': [163.8, 156.79, 164.52, 165.84, 169, 167.34, 170.94, 177.02, 184.34, 168.37, 167.55, 171.91, 162.92, 163.35, 169.61, 159.99, 152.15, 156.89, 153.18, 154.76, 160.05], 'YTD': [101.97, 102.72, 107.98, 110.29, 115.79, 114.62, 115.22, 118.22, 111.65, 109.13, 120.27, 127.01, 121.26, 128.63, 129.7, 142.76, 158.92, 169.95, 169.01, 164.66, 171.55, 163.81, 167.34, 167.55, 159.99, 160.05], '6M': [105.38, 112.5, 110.58, 115.79, 114.62, 115.22, 118.22, 120.27, 108.13, 114.3, 121, 112.75, 118.92, 134.48, 137, 138.3, 169.41, 170.74, 158.23, 169.29, 173.39, 163.8, 167.34, 167.55, 159.99, 160.05], '1Y': [75.2, 74.48, 76.63, 78.72, 90.24, 90.61, 88.04, 90.84, 89.49, 94.98, 96.46, 97.27, 100.12, 98.72, 101.1, 96.93, 106.28, 112.5, 111.46, 105.74, 104.93, 104.97, 108.87, 94.99, 103.97, 106.82, 105.38, 112.5, 110.58, 115.79, 114.62, 115.22, 114.93, 120.27, 108.13, 114.3, 121, 112.75, 118.92, 134.48, 137, 138.3, 169.41, 170.74, 158.23, 169.29, 173.39, 163.8, 167.34, 167.55, 159.99, 160.05] },
      velocityScore: { '1D': 1, '1W': 2.1, '1M': 11.9, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 53.9, revenueGrowth: 54, eps: 2.97, grossMargin: 37, dividendYield: 0.54,
      etfPresence: { POW: 3.82, VOLT: 2.98, PBD: false, PBW: false, IVEP: 3.12 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 3, avgWeight: 3.09, proScore: 1.86, coverage: 0.6,
      price: 490.19, weeklyPrices: [487.10, 495.60, 478.89, 480.50, 490.19], weeklyChange: 0.63, dayChange: 2.02, sortRank: 0, periodReturns: { '1M': 0.8, 'YTD': 10.4, '6M': 4.2, '1Y': 17.4 },
      priceHistory: { '1D': [480.5, 484.96, 485.2, 487.31, 487.06, 487.85, 488.54, 489.03, 489.45, 489.86, 491.25, 490.87, 491.21, 491.06, 490.8, 490.61, 490.11, 490.1, 490.61, 490.76, 491.09, 491.34, 490.64, 490.19], '1W': [487.1, 495.6, 478.89, 480.5, 490.19], '1M': [486.47, 467.59, 469.32, 476.89, 489.73, 502.65, 508.87, 523.69, 539.39, 509.96, 518.18, 536.04, 517.02, 514.71, 523.2, 490.12, 487.1, 495.6, 478.89, 480.5, 490.19], 'YTD': [444.11, 460.87, 484.11, 485.53, 495.59, 506.14, 524.25, 526.75, 488.49, 478.06, 477.47, 503.2, 500.38, 534.67, 521.71, 557.85, 508.43, 492.58, 479.97, 475.01, 462.93, 485.03, 502.65, 518.18, 490.12, 490.19], '6M': [470.53, 489.31, 486.82, 495.59, 506.14, 524.25, 526.75, 516.98, 487.76, 472.64, 489.07, 472.07, 499.31, 545.62, 549.11, 544.71, 507.81, 485.98, 461.5, 478.05, 480.46, 486.47, 502.65, 518.18, 490.12, 490.19], '1Y': [417.71, 418.42, 434.95, 437.44, 423.57, 443.95, 429.96, 442.52, 428.8, 442.33, 433.26, 431.16, 430.47, 419.67, 434.05, 422.63, 472.57, 468.06, 453, 419.09, 429.82, 429.34, 448.18, 429.68, 456.28, 463.03, 470.53, 489.31, 486.82, 495.59, 506.14, 524.25, 516.99, 516.98, 487.76, 472.64, 489.07, 472.07, 499.31, 545.62, 549.11, 544.71, 507.81, 485.98, 461.5, 478.05, 480.46, 486.47, 502.65, 518.18, 490.12, 490.19] },
      velocityScore: { '1D': 5.7, '1W': 8.1, '1M': 17, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 29, revenueGrowth: 11, eps: 16.91, grossMargin: 36, dividendYield: null,
      etfPresence: { POW: 2.94, VOLT: 3.8, PBD: false, PBW: false, IVEP: 2.54 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'NRG', name: 'NRG Energy Inc', easyScore: 3, avgWeight: 1.35, proScore: 0.81, coverage: 0.6,
      price: 141.24, weeklyPrices: [136.70, 141.01, 138.01, 137.48, 141.24], weeklyChange: 3.32, dayChange: 2.73, sortRank: 0, periodReturns: { '1M': 8.7, 'YTD': -11.3, '6M': -5.4, '1Y': -6 },
      priceHistory: { '1D': [137.48, 140.98, 141.72, 142.44, 141.26, 142.01, 141.44, 142.04, 141.53, 141.81, 141.93, 142.12, 142.4, 142.8, 142.98, 143.19, 142.79, 142.51, 142.22, 142.51, 142.2, 142, 141.32, 141.24], '1W': [136.7, 141.01, 138.01, 137.48, 141.24], '1M': [129.96, 120.65, 123.7, 125.47, 130.4, 132.1, 132.13, 135.06, 138.91, 137.66, 142.21, 147.11, 149.36, 149.11, 146.06, 140.8, 136.7, 141.01, 138.01, 137.48, 141.24], 'YTD': [159.24, 143.53, 158.5, 149.3, 149.11, 155.72, 173.45, 184.03, 162.06, 155.15, 159.11, 151.04, 149.9, 161.78, 168.5, 154.53, 153.37, 138.11, 127.81, 137.65, 129.47, 127.71, 132.1, 142.21, 140.8, 141.24], '6M': [149.27, 152.05, 149.93, 149.11, 155.72, 173.45, 184.03, 175.58, 155.42, 152.48, 151.77, 141.23, 153.06, 170.96, 149.86, 154.81, 157.43, 137.34, 123.71, 140.43, 133.51, 129.96, 132.1, 142.21, 140.8, 141.24], '1Y': [150.27, 144.96, 160.55, 166.59, 148.56, 155, 148.19, 146.23, 146.91, 161.21, 164.58, 165.58, 161.91, 167.52, 171.33, 160.42, 178.5, 173.19, 168.84, 168.8, 163.81, 166.77, 168.16, 149.48, 160.56, 166.16, 149.27, 152.05, 149.93, 149.11, 155.72, 173.45, 176.52, 175.58, 155.42, 152.48, 151.77, 141.23, 153.06, 170.96, 149.86, 154.81, 157.43, 137.34, 123.71, 140.43, 133.51, 129.96, 132.1, 142.21, 140.8, 141.24] },
      velocityScore: { '1D': 0, '1W': 1.2, '1M': 118.9, '6M': null }, isNew: false,
      marketCap: '$30B', pe: 155.2, revenueGrowth: 20, eps: 0.91, grossMargin: 16, dividendYield: 1.38,
      etfPresence: { POW: 0.54, VOLT: 1.03, PBD: false, PBW: false, IVEP: 2.47 },
      tonyNote: 'NRG Energy Inc appears in 3 of 5 Electrification ETFs (60% coverage) with average weight 1.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, avgWeight: 5.25, proScore: 2.1, coverage: 0.4,
      price: 272.78, weeklyPrices: [266.94, 277.45, 251.53, 258.67, 272.78], weeklyChange: 2.19, dayChange: 5.45, sortRank: 0, periodReturns: { '1M': -1.2, 'YTD': 60.8, '6M': 45.5, '1Y': 166.8 },
      priceHistory: { '1D': [258.67, 273.9, 271.96, 272.66, 271.7, 272.85, 270.8, 270.65, 270.52, 272.11, 270.93, 272.89, 272.54, 272.95, 272.22, 272, 271.04, 270.51, 272, 272.01, 271.21, 271.65, 272.92, 272.78], '1W': [266.94, 277.45, 251.53, 258.67, 272.78], '1M': [276.04, 276.95, 296.55, 293.87, 302.15, 293.22, 299.84, 296.39, 304.33, 288.64, 294.15, 310.32, 310.64, 315.65, 333.04, 318.06, 266.94, 277.45, 251.53, 258.67, 272.78], 'YTD': [169.63, 180.24, 196.61, 196.5, 215.59, 229.32, 235.3, 234.4, 213.65, 198.5, 205.74, 220.77, 203.04, 235, 241.49, 268.31, 283.6, 297.98, 256.72, 270.01, 269.86, 279.13, 293.22, 294.15, 318.06, 272.78], '6M': [187.43, 200.11, 205.17, 215.59, 229.32, 235.3, 234.4, 222.45, 191.81, 205.11, 214.98, 197.83, 210.32, 237.34, 257.41, 249.82, 297.17, 298.22, 249.71, 276.25, 269.22, 276.04, 293.22, 294.15, 318.06, 272.78], '1Y': [102.24, 98.77, 107.07, 125.91, 131.1, 134.58, 128.41, 139.31, 138.07, 145.68, 144.6, 142.27, 142.5, 146.89, 150.77, 148.25, 152.46, 154.86, 153.75, 144.89, 150.84, 159.74, 172.82, 164.18, 176.17, 172.78, 187.43, 200.11, 205.17, 215.59, 229.32, 235.3, 231.83, 222.45, 191.81, 205.11, 214.98, 197.83, 210.32, 237.34, 257.41, 249.82, 297.17, 298.22, 249.71, 276.25, 269.22, 276.04, 293.22, 294.15, 318.06, 272.78] },
      velocityScore: { '1D': 2.9, '1W': -23.6, '1M': -23.6, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 65.9, revenueGrowth: 17, eps: 4.14, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: 3.42, VOLT: 7.08, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 2, avgWeight: 5.18, proScore: 2.07, coverage: 0.4,
      price: 238.97, weeklyPrices: [246.33, 248.05, 234.05, 231.85, 238.97], weeklyChange: -2.99, dayChange: 3.07, sortRank: 0, periodReturns: { '1M': -15.7, 'YTD': 124.9, '6M': 96.2, '1Y': 238.3 },
      priceHistory: { '1D': [231.85, 240.88, 242.51, 241.94, 238.87, 240.23, 240.18, 240.97, 240.38, 239.68, 239.9, 239.4, 239.15, 238.97, 239.53, 239.24, 238.84, 238.88, 238.45, 238.29, 239.42, 238.82, 238.71, 238.97], '1W': [246.33, 248.05, 234.05, 231.85, 238.97], '1M': [283.51, 262.34, 290.5, 294.75, 303.53, 292.7, 294.03, 297.2, 307.8, 291.5, 294.49, 309.2, 279.77, 281.09, 286.36, 264.86, 246.33, 248.05, 234.05, 231.85, 238.97], 'YTD': [106.26, 119.94, 135.18, 139.32, 146.79, 187.3, 187.21, 186.39, 170.37, 176.51, 167.41, 194.85, 184.68, 230.81, 232.81, 252.18, 275.33, 309.39, 292.65, 279.22, 288.12, 293.6, 292.7, 294.49, 264.86, 238.97], '6M': [121.83, 139.99, 141.15, 146.79, 187.3, 187.21, 186.39, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 261.58, 291.97, 299.07, 283.51, 292.7, 294.49, 264.86, 238.97], '1Y': [70.64, 72.53, 78.32, 76.88, 75.95, 86.57, 82.17, 91.08, 85.72, 92.33, 97.11, 97.88, 105.74, 105.13, 109.92, 110.96, 136.12, 131.92, 118.74, 95.1, 104.18, 107.83, 119.95, 105.77, 112.06, 117.51, 121.83, 139.99, 141.15, 146.79, 187.3, 187.21, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 261.58, 291.97, 299.07, 283.51, 292.7, 294.49, 264.86, 238.97] },
      velocityScore: { '1D': -0.5, '1W': -6.8, '1M': -50.6, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 46.7, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.15,
      etfPresence: { POW: 4.23, VOLT: 6.12, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 3.74, proScore: 1.49, coverage: 0.4,
      price: 133.75, weeklyPrices: [138.51, 135.98, 137.53, 135.90, 133.75], weeklyChange: -3.44, dayChange: -1.59, sortRank: 0, periodReturns: { '1M': 4.7, 'YTD': 16, '6M': 14.4, '1Y': 27.7 },
      priceHistory: { '1D': [135.9, 135.26, 134.67, 134.82, 135.52, 135.35, 135.3, 135.25, 135.34, 135.07, 135.01, 134.74, 134.86, 134.71, 134.82, 134.63, 134.57, 134.45, 134.53, 134.5, 134.36, 134.28, 133.92, 133.75], '1W': [138.51, 135.98, 137.53, 135.9, 133.75], '1M': [127.76, 128.53, 128.48, 129.23, 129.31, 129.75, 128.27, 127.69, 130.3, 133.74, 134.96, 137, 138.69, 137.97, 136.81, 135.05, 138.51, 135.98, 137.53, 135.9, 133.75], 'YTD': [115.31, 115.93, 119.4, 116.63, 118.33, 121.1, 130.24, 132.39, 131.92, 132.31, 130.97, 128.3, 131.67, 137.15, 134.56, 135.08, 136.91, 130.16, 125.15, 131.59, 123.79, 126.77, 129.75, 134.96, 135.05, 133.75], '6M': [116.91, 119.96, 118.02, 118.33, 121.1, 130.24, 132.39, 133.29, 131.86, 134.15, 127.92, 131.12, 132.92, 135.46, 131.89, 135.59, 137.04, 131.94, 128.92, 130.9, 127.11, 127.76, 129.75, 134.96, 135.05, 133.75], '1Y': [104.74, 105.49, 108.89, 113.25, 113.49, 113.11, 113.55, 112.63, 110.03, 108.34, 107.52, 108.88, 112.75, 118.19, 118.53, 117.27, 122.11, 119.76, 122.68, 121.71, 121.58, 118.06, 114.16, 114.71, 115.31, 115.81, 116.91, 119.96, 118.02, 118.33, 121.1, 130.24, 132.03, 133.29, 131.86, 134.15, 127.92, 131.12, 132.92, 135.46, 131.89, 135.59, 137.04, 131.94, 128.92, 130.9, 127.11, 127.76, 129.75, 134.96, 135.05, 133.75] },
      velocityScore: { '1D': -1.3, '1W': 6.4, '1M': 5.7, '6M': null }, isNew: false,
      marketCap: '$73B', pe: 19.8, revenueGrowth: 10, eps: 6.75, grossMargin: 47, dividendYield: 2.8,
      etfPresence: { POW: 2.89, VOLT: 4.58, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.46, proScore: 1.38, coverage: 0.4,
      price: 326.98, weeklyPrices: [300.53, 318.47, 305.58, 317.81, 326.98], weeklyChange: 8.8, dayChange: 2.88, sortRank: 0, periodReturns: { '1M': 12.9, 'YTD': 101.8, '6M': 99.9, '1Y': 154.7 },
      priceHistory: { '1D': [317.81, 331.91, 328.29, 329.74, 326.78, 327.13, 328, 328.59, 328.15, 328.79, 329.26, 327.85, 325.91, 325.64, 326.48, 325.95, 326.2, 326.88, 326.52, 326.54, 327.44, 326.97, 326.79, 326.98], '1W': [300.53, 318.47, 305.58, 317.81, 326.98], '1M': [289.52, 280.98, 297.88, 302.87, 311.93, 299.6, 317.58, 333.05, 357.96, 318.32, 316.43, 325.57, 303.95, 306.97, 334.82, 311.42, 300.53, 318.47, 305.58, 317.81, 326.98], 'YTD': [162.01, 160.78, 172.54, 182.49, 190.01, 202, 243.53, 253.15, 244.44, 270.06, 264.71, 276.16, 259.37, 287.64, 294.13, 321.75, 328.31, 339.97, 370.94, 327.46, 323.39, 300.57, 299.6, 316.43, 311.42, 326.98], '6M': [163.58, 176.93, 181.23, 190.01, 202, 243.53, 253.15, 257.75, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 322.63, 323.91, 334.49, 289.52, 299.6, 316.43, 311.42, 326.98], '1Y': [128.37, 125.4, 130.19, 144.17, 139.75, 137.4, 127.54, 127.93, 125.59, 136.74, 136.83, 141.62, 161.59, 167.38, 180.51, 171.59, 199.27, 190.71, 173.37, 170.65, 169.57, 178.88, 181.82, 149.83, 166.87, 175.61, 163.58, 176.93, 181.23, 190.01, 202, 243.53, 245.42, 257.75, 264.35, 264.74, 256, 234.22, 262.3, 310.51, 312.44, 305.03, 341.02, 367.13, 322.63, 323.91, 334.49, 289.52, 299.6, 316.43, 311.42, 326.98] },
      velocityScore: { '1D': 3.8, '1W': 5.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$126B', pe: 82.4, revenueGrowth: 30, eps: 3.97, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 2.6, PBD: false, PBW: false, IVEP: 4.31 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.78, proScore: 1.11, coverage: 0.4,
      price: 163.84, weeklyPrices: [164.59, 166.81, 158.61, 158.22, 163.84], weeklyChange: -0.46, dayChange: 3.55, sortRank: 0, periodReturns: { '1M': 6.3, 'YTD': 21.2, '6M': 16.9, '1Y': 66.8 },
      priceHistory: { '1D': [158.22, 163.73, 163.18, 163.51, 163.84, 164.62, 164.02, 164.29, 163.38, 162.83, 163.2, 163.56, 163.58, 163.55, 163.62, 163.11, 163.38, 163.55, 163.75, 163.58, 163.83, 163.9, 163.82, 163.84], '1W': [164.59, 166.81, 158.61, 158.22, 163.84], '1M': [154.07, 149.22, 152.46, 153.8, 158.59, 158.81, 161.11, 163.96, 165.96, 158.7, 162.78, 165.15, 163.72, 166.42, 176.32, 172.22, 164.59, 166.81, 158.61, 158.22, 163.84], 'YTD': [135.14, 136.25, 154.22, 150.99, 144.93, 144.2, 148.57, 151.5, 129.58, 136.74, 127.81, 128.73, 127.7, 137.68, 148.96, 150.18, 142.3, 128.03, 125, 132.06, 146.34, 143.6, 158.81, 162.78, 172.22, 163.84], '6M': [140.16, 154.39, 155.56, 144.93, 144.2, 148.57, 151.5, 135.16, 136.06, 136.8, 130.67, 119.15, 128.38, 148.72, 151.93, 143.72, 136.69, 127.87, 119.2, 139.56, 148.4, 154.07, 158.81, 162.78, 172.22, 163.84], '1Y': [98.21, 100.55, 100.71, 105.49, 109.5, 109.83, 108.65, 109.9, 110.69, 119.09, 118.41, 123.13, 124.66, 125.79, 125.6, 128.93, 139.75, 138.87, 141.92, 136.66, 137.81, 138.65, 138.68, 126.51, 137.94, 139.71, 140.16, 154.39, 155.56, 144.93, 144.2, 148.57, 147.82, 135.16, 136.06, 136.8, 130.67, 119.15, 128.38, 148.72, 151.93, 143.72, 136.69, 127.87, 119.2, 139.56, 148.4, 154.07, 158.81, 162.78, 172.22, 163.84] },
      velocityScore: { '1D': 0, '1W': -2.6, '1M': -11.2, '6M': null }, isNew: false,
      marketCap: '$202B', pe: 47.1, revenueGrowth: 58, eps: 3.48, grossMargin: 38, dividendYield: 0.63,
      etfPresence: { POW: 1.06, VOLT: 4.5, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 2.76, proScore: 1.1, coverage: 0.4,
      price: 75.6, weeklyPrices: [73.14, 72.82, 75.08, 75.27, 75.60], weeklyChange: 3.36, dayChange: 0.44, sortRank: 0, periodReturns: { '1M': 5.6, 'YTD': 25.8, '6M': 25.3, '1Y': 30.7 },
      priceHistory: { '1D': [75.27, 75.63, 75.75, 76.05, 76.35, 76.21, 76.31, 76.24, 76.18, 76.15, 75.78, 75.81, 75.83, 75.8, 75.92, 75.75, 75.72, 75.68, 75.68, 75.8, 75.75, 75.89, 75.94, 75.6], '1W': [73.14, 72.82, 75.08, 75.27, 75.6], '1M': [71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 71.25, 73.12, 74.95, 75.79, 75.87, 77.53, 77.92, 75.06, 74.34, 72.77, 73.14, 72.82, 75.08, 75.27, 75.6], 'YTD': [60.11, 61.15, 60.29, 64.96, 66.34, 67.85, 71.96, 73.5, 75.88, 73.84, 72.8, 73.81, 71.83, 72.82, 70.86, 71.65, 75.54, 71.96, 77.72, 78.47, 70.04, 71.59, 71.48, 75.87, 72.77, 75.6], '6M': [60.32, 61.55, 64.29, 66.34, 67.85, 71.96, 73.5, 76.26, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 79.4, 76.34, 71.31, 71.59, 71.48, 75.87, 72.77, 75.6], '1Y': [57.85, 58.48, 57.71, 59.24, 58.64, 57.86, 57.22, 57.13, 57.73, 58.76, 59.02, 62.86, 63.69, 63.5, 63.78, 62.16, 56.98, 57.54, 60.43, 58.89, 59.37, 61.55, 60.5, 58.84, 59.46, 60.85, 60.32, 61.55, 64.29, 66.34, 67.85, 71.96, 72.98, 76.26, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 79.4, 76.34, 71.31, 71.59, 71.48, 75.87, 72.77, 75.6] },
      velocityScore: { '1D': 0, '1W': 5.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$92B', pe: 33.2, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.79,
      etfPresence: { POW: false, VOLT: 1.61, PBD: false, PBW: false, IVEP: 3.9 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.56, proScore: 1.03, coverage: 0.4,
      price: 140.07, weeklyPrices: [140.76, 142.72, 140.62, 140.23, 140.07], weeklyChange: -0.49, dayChange: -0.11, sortRank: 0, periodReturns: { '1M': -5.2, 'YTD': 17, '6M': 26.4, '1Y': 31.5 },
      priceHistory: { '1D': [140.23, 141.01, 141.15, 140.96, 139.17, 139.61, 140, 140.07, 140.04, 140.45, 140.64, 140.73, 140.61, 140.29, 140.04, 140.05, 140.15, 140.48, 140.42, 140.42, 140.46, 140.3, 140.04, 140.07], '1W': [140.76, 142.72, 140.62, 140.23, 140.07], '1M': [147.75, 139.36, 144.01, 144.96, 146.06, 145.17, 143.62, 144.82, 148.21, 141.28, 142.81, 145.49, 138.4, 140.47, 146.11, 144.8, 140.76, 142.72, 140.62, 140.23, 140.07], 'YTD': [119.75, 111.29, 112.95, 113.59, 122.98, 139, 142.21, 144.71, 139.58, 133.94, 133.76, 137.48, 134.72, 141.85, 137.55, 141.73, 145.08, 139.52, 143.08, 138.36, 133.91, 144.05, 145.17, 142.81, 144.8, 140.07], '6M': [110.85, 114.61, 115.07, 122.98, 139, 142.21, 144.71, 145.46, 133.09, 131.69, 133.27, 126.58, 133.15, 142.05, 139.72, 141.59, 144.82, 141.04, 135.42, 140.22, 141.99, 147.75, 145.17, 142.81, 144.8, 140.07], '1Y': [106.5, 107.28, 110.13, 104.02, 104.67, 105.77, 106, 108.46, 105.34, 107.8, 107.41, 106.54, 108.89, 108.43, 110.82, 108.54, 113.34, 120.86, 122.66, 114.42, 114.65, 114.22, 115.81, 116.38, 121.39, 122.31, 110.85, 114.61, 115.07, 122.98, 139, 142.21, 142.83, 145.46, 133.09, 131.69, 133.27, 126.58, 133.15, 142.05, 139.72, 141.59, 144.82, 141.04, 135.42, 140.22, 141.99, 147.75, 145.17, 142.81, 144.8, 140.07] },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$85B', pe: 42.8, revenueGrowth: 8, eps: 3.27, grossMargin: 37, dividendYield: 1.14,
      etfPresence: { POW: false, VOLT: 1.45, PBD: false, PBW: false, IVEP: 3.68 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.4, proScore: 0.96, coverage: 0.4,
      price: 314.61, weeklyPrices: [311.27, 310.84, 287.73, 293.64, 314.61], weeklyChange: 1.07, dayChange: 7.14, sortRank: 0, periodReturns: { '1M': 1, 'YTD': 50.3, '6M': 43.3, '1Y': 122.9 },
      priceHistory: { '1D': [293.64, 312.94, 312.25, 313.04, 311.36, 314.15, 315.36, 316.29, 315.32, 315.6, 315.53, 315.77, 315.48, 314.8, 315.36, 315.07, 315.38, 315.63, 315.53, 314.78, 315.24, 315.81, 314.99, 314.61], '1W': [311.27, 310.84, 287.73, 293.64, 314.61], '1M': [311.64, 308.17, 340.4, 354.37, 370.66, 350.45, 353.32, 372.59, 388.23, 364.96, 359.61, 375.15, 348.11, 348.15, 372.87, 356.35, 311.27, 310.84, 287.73, 293.64, 314.61], 'YTD': [209.37, 210.99, 257.29, 262.19, 261.82, 279.17, 314.12, 335.74, 322.47, 311.39, 319.63, 342.87, 332.82, 374.98, 372.23, 382.47, 389.05, 357.24, 323.46, 324.86, 294.65, 306.11, 350.45, 359.61, 356.35, 314.61], '6M': [219.59, 253.86, 263.03, 261.82, 279.17, 314.12, 335.74, 340.42, 305.02, 308.31, 329.78, 298.29, 339.32, 385.73, 385, 369.08, 345.63, 339.42, 302.84, 339.65, 312.28, 311.64, 350.45, 359.61, 356.35, 314.61], '1Y': [141.13, 139.42, 142.84, 144.07, 139.81, 162.52, 147.74, 154.44, 145.25, 157.25, 157.79, 170.77, 176.2, 174.92, 189.96, 190.46, 208.05, 225.8, 212.79, 198.89, 205.92, 213.44, 221.47, 204.49, 217.23, 221.99, 219.59, 253.86, 263.03, 261.82, 279.17, 314.12, 329.24, 340.42, 305.02, 308.31, 329.78, 298.29, 339.32, 385.73, 385, 369.08, 345.63, 339.42, 302.84, 339.65, 312.28, 311.64, 350.45, 359.61, 356.35, 314.61] },
      velocityScore: { '1D': 2.1, '1W': -12.7, '1M': -22, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 65.4, revenueGrowth: 26, eps: 4.81, grossMargin: 39, dividendYield: 0.14,
      etfPresence: { POW: 0.96, VOLT: 3.83, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'VST', name: 'Vistra Corp', easyScore: 2, avgWeight: 2.39, proScore: 0.96, coverage: 0.4,
      price: 158.17, weeklyPrices: [151.05, 157.22, 155.73, 154.82, 158.17], weeklyChange: 4.71, dayChange: 2.16, sortRank: 0, periodReturns: { '1M': 8.2, 'YTD': -2, '6M': -4.9, '1Y': -19.7 },
      priceHistory: { '1D': [154.82, 159.43, 160.01, 160.37, 157.88, 158.22, 158.25, 158.98, 158.37, 158.6, 158.92, 159.1, 159.45, 159.21, 159.19, 159.94, 159.48, 159.29, 158.79, 158.95, 158.9, 158.66, 158.29, 158.17], '1W': [151.05, 157.22, 155.73, 154.82, 158.17], '1M': [146.22, 138.54, 146.38, 148.02, 153.52, 158.61, 158.83, 163.75, 167.26, 162.39, 162.87, 167.77, 163.49, 162.38, 158.63, 153.16, 151.05, 157.22, 155.73, 154.82, 158.17], 'YTD': [161.33, 150.6, 180.18, 160.12, 154.26, 152.97, 173.68, 171.62, 161.7, 164.4, 170.12, 151.51, 153.96, 152.75, 165.53, 156.85, 155.28, 147.72, 139.68, 156.27, 154.76, 146.9, 158.61, 162.87, 153.16, 158.17], '6M': [166.37, 166.6, 158.81, 154.26, 152.97, 173.68, 171.62, 165.99, 163.62, 161.99, 151.29, 147.54, 153.68, 163.97, 154.91, 161.12, 160.38, 146.87, 134.71, 164.56, 157.97, 146.22, 158.61, 162.87, 153.16, 158.17], '1Y': [197.01, 184.13, 200.12, 207.05, 200.85, 205.28, 192.91, 195.12, 188.12, 209.21, 208.31, 202.06, 201.51, 206.55, 210.85, 185.83, 199.37, 189.39, 178.27, 179.14, 170.84, 171.65, 165.17, 159.97, 161.96, 165.23, 166.37, 166.6, 158.81, 154.26, 152.97, 173.68, 167.8, 165.99, 163.62, 161.99, 151.29, 147.54, 153.68, 163.97, 154.91, 161.12, 160.38, 146.87, 134.71, 164.56, 157.97, 146.22, 158.61, 162.87, 153.16, 158.17] },
      velocityScore: { '1D': 0, '1W': 5.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$53B', pe: 26.4, revenueGrowth: 43, eps: 5.98, grossMargin: 39, dividendYield: null,
      etfPresence: { POW: 1.49, VOLT: false, PBD: false, PBW: false, IVEP: 3.3 },
      tonyNote: 'Vistra Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CEG', name: 'Constellation Energy Corp', easyScore: 2, avgWeight: 2.27, proScore: 0.91, coverage: 0.4,
      price: 250.71, weeklyPrices: [239.25, 245.87, 239.71, 244.52, 250.71], weeklyChange: 4.79, dayChange: 2.53, sortRank: 0, periodReturns: { '1M': -0.4, 'YTD': -29, '6M': -26.8, '1Y': -20.9 },
      priceHistory: { '1D': [244.52, 248.57, 247.3, 247.52, 246.85, 246.74, 247.4, 248.1, 247.6, 247.96, 248.2, 248.49, 248.98, 249.93, 250.29, 250.78, 250.48, 250.13, 249.84, 250.38, 250.21, 250.04, 250.38, 250.71], '1W': [239.25, 245.87, 239.71, 244.52, 250.71], '1M': [251.65, 242.3, 246.71, 253.76, 262.35, 268, 267.17, 274.06, 275.53, 270.26, 267.97, 268.69, 264.02, 259.32, 248.37, 236.5, 239.25, 245.87, 239.71, 244.52, 250.71], 'YTD': [353.27, 322.54, 341.2, 289.06, 270.88, 272.15, 303.01, 312.64, 324.87, 317.09, 317.22, 303.32, 279.46, 280.25, 299.14, 292.77, 307.81, 303.63, 267.2, 294.07, 265.7, 250.67, 268, 267.97, 236.5, 250.71], '6M': [342.52, 307.71, 285.27, 270.88, 272.15, 303.01, 312.64, 327.16, 322.99, 305.58, 289.76, 298.61, 272.58, 296.61, 277.7, 305.71, 320.42, 293.6, 260.67, 301.57, 272.65, 251.65, 268, 267.97, 236.5, 250.71], '1Y': [317.11, 308.2, 323.7, 345.27, 338.46, 327.63, 314.21, 316.58, 308.48, 320, 321.27, 339.13, 350.9, 371, 403.95, 350.06, 401.43, 363.25, 354.02, 357.48, 351.6, 361.26, 362.07, 340.97, 363.95, 366.25, 342.52, 307.71, 285.27, 270.88, 272.15, 303.01, 293.8, 327.16, 322.99, 305.58, 289.76, 298.61, 272.58, 296.61, 277.7, 305.71, 320.42, 293.6, 260.67, 301.57, 272.65, 251.65, 268, 267.97, 236.5, 250.71] },
      velocityScore: { '1D': 2.2, '1W': 7.1, '1M': 106.8, '6M': null }, isNew: false,
      marketCap: '$90B', pe: 21.8, revenueGrowth: 64, eps: 11.52, grossMargin: 23, dividendYield: 0.7,
      etfPresence: { POW: 1.27, VOLT: false, PBD: false, PBW: false, IVEP: 3.28 },
      tonyNote: 'Constellation Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TLN', name: 'Talen Energy Corp', easyScore: 2, avgWeight: 2.2, proScore: 0.88, coverage: 0.4,
      price: 383.89, weeklyPrices: [364.67, 377.79, 366.66, 367.88, 383.89], weeklyChange: 5.27, dayChange: 4.35, sortRank: 0, periodReturns: { '1M': 7, 'YTD': 2.4, '6M': 3.5, '1Y': 41.1 },
      priceHistory: { '1D': [367.88, 383.26, 389.5, 391.28, 386.39, 387.69, 388.5, 388.23, 386.22, 388.76, 387.78, 388.93, 389.38, 387.31, 387.42, 388.11, 387.28, 385.39, 384.8, 385.52, 384.29, 384.18, 383.65, 383.89], '1W': [364.67, 377.79, 366.66, 367.88, 383.89], '1M': [358.74, 336.59, 344.8, 360.54, 386.21, 406.51, 409.81, 436.29, 438.12, 411.92, 405.89, 416.8, 404.09, 399.34, 384.26, 360.79, 364.67, 377.79, 366.66, 367.88, 383.89], 'YTD': [374.84, 356, 419.07, 366.43, 340.8, 353.66, 388.28, 375.24, 341.39, 331.58, 338.6, 328.29, 328.08, 312.76, 362.4, 345.25, 372.16, 386.37, 334.24, 372.45, 377.2, 364.78, 406.51, 405.89, 360.79, 383.89], '6M': [370.83, 371.66, 350.41, 340.8, 353.66, 388.28, 375.24, 353.24, 335.11, 317.6, 311.02, 313.03, 330.07, 345.76, 329.74, 361.17, 384.9, 374.61, 314.57, 389, 385.51, 358.74, 406.51, 405.89, 360.79, 383.89], '1Y': [272.15, 264.78, 339.24, 373.36, 378.67, 380.25, 360.1, 378.79, 377.76, 402.65, 408.09, 416.94, 426.99, 445.84, 415.81, 380.69, 398.55, 403.49, 367.54, 390.51, 378.99, 365.46, 358.5, 351.96, 383.58, 396.73, 370.83, 371.66, 350.41, 340.8, 353.66, 388.28, 367.84, 353.24, 335.11, 317.6, 311.02, 313.03, 330.07, 345.76, 329.74, 361.17, 384.9, 374.61, 314.57, 389, 385.51, 358.74, 406.51, 405.89, 360.79, 383.89] },
      velocityScore: { '1D': 1.1, '1W': 6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: null, revenueGrowth: 97, eps: -0.52, grossMargin: 40, dividendYield: null,
      etfPresence: { POW: 1.69, VOLT: false, PBD: false, PBW: false, IVEP: 2.71 },
      tonyNote: 'Talen Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SO', name: 'Southern Co/The', easyScore: 2, avgWeight: 2.13, proScore: 0.85, coverage: 0.4,
      price: 95.04, weeklyPrices: [97.98, 95.99, 97.29, 96.38, 95.04], weeklyChange: -3, dayChange: -1.39, sortRank: 0, periodReturns: { '1M': 2.2, 'YTD': 9, '6M': 9.2, '1Y': 3.3 },
      priceHistory: { '1D': [96.38, 95.69, 95.61, 95.61, 96.18, 96.05, 96.14, 96.11, 96.08, 95.93, 95.61, 95.57, 95.68, 95.65, 95.68, 95.62, 95.44, 95.4, 95.45, 95.43, 95.36, 95.33, 95.21, 95.04], '1W': [97.98, 95.99, 97.29, 96.38, 95.04], '1M': [92.95, 94.02, 93.27, 94, 93.82, 94.31, 92.53, 93.09, 93.43, 94.93, 95.78, 95.91, 97.16, 96.75, 95.71, 95.12, 97.98, 95.99, 97.29, 96.38, 95.04], 'YTD': [87.2, 87.22, 88.78, 87.54, 88.19, 89.38, 92, 95.81, 96.79, 96.27, 96.54, 94.61, 96.94, 97.59, 94.9, 93.91, 96.71, 91.8, 92.55, 94.55, 89.03, 91.28, 94.31, 95.78, 95.12, 95.04], '6M': [87.01, 88.9, 88.16, 88.19, 89.38, 92, 95.81, 97.23, 97.25, 99.11, 93.75, 96.93, 96.82, 95.96, 91.92, 94.41, 95.9, 93.47, 94.14, 94.09, 90.51, 92.95, 94.31, 95.78, 95.12, 95.04], '1Y': [91.96, 93.3, 95.13, 94.9, 94.68, 94.79, 94.93, 93.09, 91.66, 91.56, 91.63, 94.41, 94.8, 96.18, 99.72, 97.48, 93.51, 91.41, 91.89, 89.05, 89.29, 87.98, 84.08, 87.03, 87.17, 87.18, 87.01, 88.9, 88.16, 88.19, 89.38, 92, 95.18, 97.23, 97.25, 99.11, 93.75, 96.93, 96.82, 95.96, 91.92, 94.41, 95.9, 93.47, 94.14, 94.09, 90.51, 92.95, 94.31, 95.78, 95.12, 95.04] },
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
      price: 948.99, weeklyPrices: [963.53, 969.92, 940.12, 948.08, 948.99], weeklyChange: -1.51, dayChange: 0.1, sortRank: 0, periodReturns: { '1M': 3.7, 'YTD': 65.7, '6M': 53.7, '1Y': 136 },
      priceHistory: { '1D': [948.08, 964.07, 963.25, 966.1, 950.89, 953.23, 955.54, 956.53, 956, 957.5, 959.57, 957.93, 958.69, 959.53, 955.88, 952.63, 951.72, 950.62, 952.05, 951.14, 951.9, 949.79, 948.02, 948.99], '1W': [963.53, 969.92, 940.12, 948.08, 948.99], '1M': [914.7, 856.16, 897.63, 910.57, 933.93, 945.46, 955.92, 985.82, 1022.28, 984.24, 994.45, 1057.01, 997.47, 1033.19, 1064.9, 991.41, 963.53, 969.92, 940.12, 948.08, 948.99], 'YTD': [572.87, 608.13, 647.18, 626.62, 690.91, 742.12, 764.76, 768.23, 722.18, 716.68, 693.62, 719.04, 730.32, 787.07, 772.66, 835.24, 889.67, 897.45, 888.31, 879.89, 865.36, 915.64, 945.46, 994.45, 991.41, 948.99], '6M': [617.62, 646.89, 635.92, 690.91, 742.12, 764.76, 768.23, 752.32, 704.82, 699.78, 701.7, 667.43, 724.44, 794.25, 800.45, 817.87, 904.59, 912.14, 860.15, 908.55, 909.81, 914.7, 945.46, 994.45, 991.41, 948.99], '1Y': [402.18, 412.88, 427.59, 434.12, 427.72, 413.7, 420.59, 431.26, 415.12, 422.91, 450.66, 469.79, 480.82, 502.12, 534.05, 513.91, 585.49, 569.15, 573.02, 553.11, 566.61, 591.49, 615.35, 561.89, 583.76, 598.41, 617.62, 646.89, 635.92, 690.91, 742.12, 764.76, 756.47, 752.32, 704.82, 699.78, 701.7, 667.43, 724.44, 794.25, 800.45, 817.87, 904.59, 912.14, 860.15, 908.55, 909.81, 914.7, 945.46, 994.45, 991.41, 948.99] },
      velocityScore: { '1D': 0.5, '1W': 2, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$437B', pe: 47.2, revenueGrowth: 22, eps: 20.1, grossMargin: 29, dividendYield: 0.69,
      etfPresence: { AIRR: false, PRN: 3.37, RSHO: 6.89, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 4.76, proScore: 1.9, coverage: 0.4,
      price: 238.97, weeklyPrices: [246.33, 248.05, 234.05, 231.85, 238.97], weeklyChange: -2.99, dayChange: 3.07, sortRank: 0, periodReturns: { '1M': -15.7, 'YTD': 124.9, '6M': 96.2, '1Y': 238.3 },
      priceHistory: { '1D': [231.85, 240.88, 242.51, 241.94, 238.87, 240.23, 240.18, 240.97, 240.38, 239.68, 239.9, 239.4, 239.15, 238.97, 239.53, 239.24, 238.84, 238.88, 238.45, 238.29, 239.42, 238.82, 238.71, 238.97], '1W': [246.33, 248.05, 234.05, 231.85, 238.97], '1M': [283.51, 262.34, 290.5, 294.75, 303.53, 292.7, 294.03, 297.2, 307.8, 291.5, 294.49, 309.2, 279.77, 281.09, 286.36, 264.86, 246.33, 248.05, 234.05, 231.85, 238.97], 'YTD': [106.26, 119.94, 135.18, 139.32, 146.79, 187.3, 187.21, 186.39, 170.37, 176.51, 167.41, 194.85, 184.68, 230.81, 232.81, 252.18, 275.33, 309.39, 292.65, 279.22, 288.12, 293.6, 292.7, 294.49, 264.86, 238.97], '6M': [121.83, 139.99, 141.15, 146.79, 187.3, 187.21, 186.39, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 261.58, 291.97, 299.07, 283.51, 292.7, 294.49, 264.86, 238.97], '1Y': [70.64, 72.53, 78.32, 76.88, 75.95, 86.57, 82.17, 91.08, 85.72, 92.33, 97.11, 97.88, 105.74, 105.13, 109.92, 110.96, 136.12, 131.92, 118.74, 95.1, 104.18, 107.83, 119.95, 105.77, 112.06, 117.51, 121.83, 139.99, 141.15, 146.79, 187.3, 187.21, 181.38, 177.5, 173.36, 170.61, 180.86, 167.52, 201.7, 234.42, 240.97, 255.56, 294.69, 308.05, 261.58, 291.97, 299.07, 283.51, 292.7, 294.49, 264.86, 238.97] },
      velocityScore: { '1D': -0.5, '1W': -3.1, '1M': -10.8, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 46.7, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.15,
      etfPresence: { AIRR: 2.19, PRN: false, RSHO: 7.33, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 4.51, proScore: 1.81, coverage: 0.4,
      price: 707.69, weeklyPrices: [700.75, 717.11, 674.39, 660.72, 707.69], weeklyChange: 0.99, dayChange: 7.11, sortRank: 0, periodReturns: { '1M': -16, 'YTD': 131.1, '6M': 129.7, '1Y': 203.2 },
      priceHistory: { '1D': [660.72, 703.05, 710.51, 705.9, 701.18, 704.54, 707.82, 707.42, 707.39, 708.91, 706.49, 706.2, 710.01, 709.14, 706.73, 706.5, 704.39, 706.4, 706.1, 705.99, 706.12, 708.52, 705.08, 707.69], '1W': [700.75, 717.11, 674.39, 660.72, 707.69], '1M': [842.01, 770.25, 838.55, 858.99, 866.67, 857.76, 838.21, 861.88, 932.75, 892.25, 867.23, 881.92, 804.76, 813.77, 839.36, 776.55, 700.75, 717.11, 674.39, 660.72, 707.69], 'YTD': [306.23, 297.62, 336.31, 351.39, 367.95, 418.61, 421.2, 459.72, 415.51, 411.53, 421.23, 452.92, 421.29, 435.65, 441.1, 495.67, 532.67, 844.8, 848.84, 732.94, 845.39, 891.86, 857.76, 867.23, 776.55, 707.69], '6M': [308.13, 350.96, 361.21, 367.95, 418.61, 421.2, 459.72, 432.87, 411.38, 417.76, 422.55, 382.55, 382.22, 464.54, 472.84, 471.85, 806, 851.35, 728.29, 783.53, 875.52, 842.01, 857.76, 867.23, 776.55, 707.69], '1Y': [233.39, 243.23, 253.14, 263.35, 299.42, 292.47, 274.89, 292.95, 273.82, 301.13, 320.94, 344.05, 337.93, 366.99, 365.39, 332.75, 403.35, 411.07, 380.7, 334.17, 332.96, 323.46, 331.61, 283.57, 314, 319.16, 308.13, 350.96, 361.21, 367.95, 418.61, 421.2, 434.64, 432.87, 411.38, 417.76, 422.55, 382.55, 382.22, 464.54, 472.84, 471.85, 806, 851.35, 728.29, 783.53, 875.52, 842.01, 857.76, 867.23, 776.55, 707.69] },
      velocityScore: { '1D': -1.6, '1W': -10.4, '1M': -21, '6M': null }, isNew: false,
      marketCap: '$22B', pe: 63.4, revenueGrowth: 92, eps: 11.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 5.13, PRN: 3.9, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.29, proScore: 1.72, coverage: 0.4,
      price: 1781.99, weeklyPrices: [1741.30, 1793.03, 1683.44, 1684.94, 1781.99], weeklyChange: 2.34, dayChange: 5.76, sortRank: 0, periodReturns: { '1M': -2.7, 'YTD': 90.9, '6M': 76.4, '1Y': 233.1 },
      priceHistory: { '1D': [1684.94, 1785.38, 1800.99, 1800.95, 1788.49, 1781.86, 1778.69, 1783.98, 1783.31, 1790.81, 1788.46, 1785.48, 1785.93, 1783.96, 1782.36, 1788.35, 1787.87, 1794.06, 1787.29, 1788.95, 1790.68, 1787.93, 1780.01, 1781.99], '1W': [1741.3, 1793.03, 1683.44, 1684.94, 1781.99], '1M': [1831.56, 1719.48, 1843.42, 1877.61, 1952.02, 1913.94, 1931.77, 1967.41, 2066.51, 1908.07, 1954.47, 2017.57, 1854.23, 1948.69, 1981.95, 1865.15, 1741.3, 1793.03, 1683.44, 1684.94, 1781.99], 'YTD': [933.29, 971.49, 1091.04, 1121.44, 1176.26, 1283.65, 1337.75, 1468.58, 1391.16, 1383.62, 1423, 1470.64, 1428.52, 1574.45, 1605.97, 1773.91, 1867.02, 1952.37, 1992.74, 1828.25, 1787.88, 1852.03, 1913.94, 1954.47, 1865.15, 1781.99], '6M': [1010.41, 1119.98, 1127.55, 1176.26, 1283.65, 1337.75, 1468.58, 1438.24, 1372.4, 1414.1, 1408.25, 1273.18, 1424.91, 1650.48, 1674.16, 1719.21, 1967.24, 2016.31, 1825.5, 1883.56, 1883.26, 1831.56, 1913.94, 1954.47, 1865.15, 1781.99], '1Y': [535.02, 546.63, 547.91, 702.97, 690.45, 702.1, 681.08, 707.39, 700.69, 752.1, 762.91, 791.46, 834.33, 844.62, 837.11, 790.72, 1010.64, 987.78, 973.18, 930.5, 957.04, 949.3, 1021.36, 883.79, 958.07, 1003.64, 1010.41, 1119.98, 1127.55, 1176.26, 1283.65, 1337.75, 1413.57, 1438.24, 1372.4, 1414.1, 1408.25, 1273.18, 1424.91, 1650.48, 1674.16, 1719.21, 1967.24, 2016.31, 1825.5, 1883.56, 1883.26, 1831.56, 1913.94, 1954.47, 1865.15, 1781.99] },
      velocityScore: { '1D': 0.6, '1W': -2.8, '1M': -5.5, '6M': null }, isNew: false,
      marketCap: '$63B', pe: 51.3, revenueGrowth: 1, eps: 34.71, grossMargin: 25, dividendYield: 0.15,
      etfPresence: { AIRR: 4.08, PRN: 4.51, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.94, proScore: 1.57, coverage: 0.4,
      price: 322.54, weeklyPrices: [330.85, 328.53, 315.33, 315.88, 322.54], weeklyChange: -2.51, dayChange: 2.11, sortRank: 0, periodReturns: { '1M': -0.1, 'YTD': 25.6, '6M': 18.5, '1Y': 28.3 },
      priceHistory: { '1D': [315.88, 319.76, 319.2, 318.48, 319.31, 318.56, 319.49, 319.5, 319.5, 319.31, 319.7, 320.61, 320.65, 321.21, 320.71, 320.92, 320.52, 320.45, 321.06, 321.29, 321.54, 321.78, 322.02, 322.54], '1W': [330.85, 328.53, 315.33, 315.88, 322.54], '1M': [322.81, 314.08, 318.89, 320.11, 316.18, 324.38, 329.89, 337.96, 338.07, 330.9, 333.78, 343.54, 337.08, 334.16, 338.15, 332.08, 330.85, 328.53, 315.33, 315.88, 322.54], 'YTD': [256.77, 264.62, 282.47, 280.14, 270.02, 282.45, 278.31, 282.27, 277.7, 264.31, 258.51, 266, 269.36, 286.41, 284.39, 294.4, 302.99, 308.87, 307.17, 307.1, 300.98, 314.42, 324.38, 333.78, 332.08, 322.54], '6M': [272.25, 281.21, 281.54, 270.02, 282.45, 278.31, 282.27, 283.54, 267.57, 256.83, 262.23, 258.01, 272.54, 292.01, 293.59, 301.24, 305.48, 313.7, 302.64, 311.33, 308.31, 322.81, 324.38, 333.78, 332.08, 322.54], '1Y': [251.4, 255.52, 267.01, 273.62, 264.97, 275.72, 262.46, 266.99, 261.53, 263.45, 259.5, 259.37, 257.98, 255.19, 247.97, 253.5, 254.1, 257.9, 256.26, 243.79, 255.78, 260.88, 264.32, 256.73, 264.33, 259.63, 272.25, 281.21, 281.54, 270.02, 282.45, 278.31, 278.74, 283.54, 267.57, 256.83, 262.23, 258.01, 272.54, 292.01, 293.59, 301.24, 305.48, 313.7, 302.64, 311.33, 308.31, 322.81, 324.38, 333.78, 332.08, 322.54] },
      velocityScore: { '1D': 0, '1W': 0, '1M': 15.4, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 30.5, revenueGrowth: 7, eps: 10.58, grossMargin: 30, dividendYield: 0.65,
      etfPresence: { AIRR: 1.83, PRN: false, RSHO: 6.04, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'EME', name: 'EMCOR Group, Inc.', easyScore: 2, avgWeight: 3.59, proScore: 1.44, coverage: 0.4,
      price: 784.61, weeklyPrices: [774.66, 787.29, 768.38, 768.98, 784.61], weeklyChange: 1.28, dayChange: 2.03, sortRank: 0, periodReturns: { '1M': -5.2, 'YTD': 28.2, '6M': 21.4, '1Y': 43.6 },
      priceHistory: { '1D': [768.98, 786.73, 785.95, 788.83, 783.16, 785.84, 785.95, 785.95, 786.33, 785.68, 784.76, 784.91, 786.16, 786.41, 785.6, 785.15, 785.86, 785.89, 784.41, 786.08, 786.02, 785.85, 783.79, 784.61], '1W': [774.66, 787.29, 768.38, 768.98, 784.61], '1M': [827.78, 776.72, 811.53, 823.05, 842.3, 834.77, 827.5, 836.59, 868.88, 838.61, 847.17, 862.66, 798.1, 814.41, 829.88, 804.33, 774.66, 787.29, 768.38, 768.98, 784.61], 'YTD': [611.79, 628.27, 682.13, 694.21, 731.67, 776.24, 797.5, 806.8, 736.3, 723.38, 737.66, 764.76, 759.55, 800.4, 792.25, 873.11, 903.5, 921.64, 913.11, 848.91, 830.95, 823.79, 834.77, 847.17, 804.33, 784.61], '6M': [646.27, 698.69, 706.87, 731.67, 776.24, 797.5, 806.8, 735.78, 719.18, 726.55, 744.66, 701.1, 750.42, 814.18, 838.01, 863.78, 933.27, 924.9, 854.36, 861.41, 827.28, 827.78, 834.77, 847.17, 804.33, 784.61], '1Y': [546.28, 553.3, 573.66, 639.33, 622.27, 616.71, 605.13, 618.84, 627.28, 634.4, 616.72, 626.57, 654.92, 695.03, 690.64, 662.93, 777, 675.42, 643.38, 605.84, 605.61, 612, 627.02, 596.47, 626.07, 638.65, 646.27, 698.69, 706.87, 731.67, 776.24, 797.5, 806.66, 735.78, 719.18, 726.55, 744.66, 701.1, 750.42, 814.18, 838.01, 863.78, 933.27, 924.9, 854.36, 861.41, 827.28, 827.78, 834.77, 847.17, 804.33, 784.61] },
      velocityScore: { '1D': 0.7, '1W': 3.6, '1M': null, '6M': null }, isNew: false,
      marketCap: '$35B', pe: 26.4, revenueGrowth: 20, eps: 29.76, grossMargin: 19, dividendYield: 0.21,
      etfPresence: { AIRR: 3.78, PRN: 3.41, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'EMCOR Group is an electrical and mechanical construction services company. Revenue grew substantially, and EMCOR is a core Industrials ETF holding because it builds the electrical systems inside data centers, manufacturing plants, and commercial buildings. The $827 share price reflects years of consistent execution and market share gains in a fragmented contractor market.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 2, avgWeight: 3.21, proScore: 1.28, coverage: 0.4,
      price: 274.81, weeklyPrices: [270.41, 277.91, 275.43, 271.58, 274.81], weeklyChange: 1.63, dayChange: 1.19, sortRank: 0, periodReturns: { '1M': 6.9, 'YTD': 34, '6M': 25.9, '1Y': 51.5 },
      priceHistory: { '1D': [271.58, 275.57, 275.18, 275.67, 275.66, 276.49, 276.11, 275.86, 275.3, 275.74, 275.81, 275.58, 275.7, 276.02, 275.67, 275.22, 275.47, 275.6, 275.31, 275.8, 275.76, 275.56, 274.77, 274.81], '1W': [270.41, 277.91, 275.43, 271.58, 274.81], '1M': [257.16, 249.49, 264.6, 264.67, 270.44, 277.42, 283.23, 277.66, 280.36, 275.13, 276.06, 273.14, 268.87, 268.57, 268.86, 267.41, 270.41, 277.91, 275.43, 271.58, 274.81], 'YTD': [205.02, 210.02, 224.26, 214.89, 207.21, 225.15, 252.55, 260.95, 258.84, 253.91, 241.93, 241.62, 239.04, 254.06, 247.6, 246.16, 239.51, 270.56, 260.35, 256.55, 255.52, 246.55, 277.42, 276.06, 267.41, 274.81], '6M': [218.27, 224.89, 215.39, 207.21, 225.15, 252.55, 260.95, 265.11, 254.14, 240.73, 236.04, 222.99, 236.02, 258.03, 247.72, 240.43, 242.69, 269.76, 253.12, 261.89, 250.72, 257.16, 277.42, 276.06, 267.41, 274.81], '1Y': [181.42, 184.3, 186.4, 192.14, 182.06, 176.8, 171.94, 175.92, 174.49, 183.8, 185.39, 190.22, 194.85, 191.65, 192.27, 191.23, 203.48, 206.31, 205.07, 202.06, 203.68, 194.29, 192.39, 191.19, 212.17, 211.71, 218.27, 224.89, 215.39, 207.21, 225.15, 252.55, 257.04, 265.11, 254.14, 240.73, 236.04, 222.99, 236.02, 258.03, 247.72, 240.43, 242.69, 269.76, 253.12, 261.89, 250.72, 257.16, 277.42, 276.06, 267.41, 274.81] },
      velocityScore: { '1D': -0.8, '1W': 9.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$110B', pe: 63.6, revenueGrowth: 19, eps: 4.32, grossMargin: 35, dividendYield: 0.18,
      etfPresence: { AIRR: false, PRN: 4.21, RSHO: false, IDEF: 2.2, BILT: false },
      tonyNote: 'Howmet Aerospace is an aerospace structures and engine components manufacturer. It appears in Industrials ETFs for its aerospace and defense exposure — commercial air travel recovery and defense spending growth are the two demand drivers. Revenue grew and margins are expanding as Howmet prices power over OEM customers.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.78, proScore: 1.11, coverage: 0.4,
      price: 218.73, weeklyPrices: [227.74, 232.19, 218.83, 213.56, 218.73], weeklyChange: -3.96, dayChange: 2.42, sortRank: 0, periodReturns: { '1M': -4.1, 'YTD': 9.3, '6M': 5.4, '1Y': 26.6 },
      priceHistory: { '1D': [213.56, 217.87, 218.05, 219.19, 219.9, 220.29, 220.51, 220.59, 219.68, 219.52, 220.72, 220.8, 220.35, 220.03, 219.03, 219.57, 219.73, 220.16, 219.87, 219.65, 218.96, 219.25, 218.81, 218.73], '1W': [227.74, 232.19, 218.83, 213.56, 218.73], '1M': [228.01, 223.63, 233.49, 230.05, 237.06, 234.8, 235.29, 242.97, 246.41, 236.07, 237.22, 244.56, 231.87, 238.21, 245.17, 231.72, 227.74, 232.19, 218.83, 213.56, 218.73], 'YTD': [200.06, 207.44, 213.61, 211.03, 212.73, 223.86, 241.6, 243.04, 219.58, 210.96, 202.46, 201.27, 203.16, 215.54, 215.27, 223.96, 208.13, 202.84, 200.99, 207.8, 220.92, 229.95, 234.8, 237.22, 231.72, 218.73], '6M': [207.51, 217.65, 215.21, 212.73, 223.86, 241.6, 243.04, 225.02, 209.8, 203.42, 194.52, 190.71, 195.43, 224.82, 216.49, 216.36, 207.81, 198.99, 195.79, 219.08, 230.08, 228.01, 234.8, 237.22, 231.72, 218.73], '1Y': [172.78, 175.13, 175.58, 181.26, 203.53, 191.88, 186.26, 192.05, 182.65, 188, 184.91, 182.39, 185.92, 188.45, 185.21, 187.4, 200, 223.06, 219.09, 205.32, 215.7, 209.57, 217.69, 207.33, 208.48, 203.26, 207.51, 217.65, 215.21, 212.73, 223.86, 241.6, 237.18, 225.02, 209.8, 203.42, 194.52, 190.71, 195.43, 224.82, 216.49, 216.36, 207.81, 198.99, 195.79, 219.08, 230.08, 228.01, 234.8, 237.22, 231.72, 218.73] },
      velocityScore: { '1D': -0.9, '1W': -1.8, '1M': -1.8, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 41.8, revenueGrowth: 17, eps: 5.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.6, PRN: false, RSHO: 3.96, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.32, proScore: 0.93, coverage: 0.4,
      price: 188.14, weeklyPrices: [191.06, 196.89, 186.08, 184.11, 188.14], weeklyChange: -1.53, dayChange: 2.19, sortRank: 0, periodReturns: { '1M': -0.4, 'YTD': 8.9, '6M': -6.6, '1Y': 36.8 },
      priceHistory: { '1D': [184.11, 186.02, 185.9, 187.04, 185.91, 186.88, 186.8, 187.88, 187.94, 188.17, 188.59, 188.44, 188.4, 188.76, 188.38, 188.85, 188.84, 188.57, 188.35, 188.73, 188.73, 188.31, 187.93, 188.14], '1W': [191.06, 196.89, 186.08, 184.11, 188.14], '1M': [188.96, 183, 194.68, 193.45, 193.94, 196.93, 203.07, 205.4, 210, 209.89, 205.65, 204.77, 197.91, 189.25, 194.65, 191.25, 191.06, 196.89, 186.08, 184.11, 188.14], 'YTD': [172.84, 193.2, 213.25, 207.75, 206.04, 203, 201.09, 204.23, 205.83, 195.91, 208.98, 222.13, 212.81, 230.29, 230.8, 225.51, 216.31, 205.33, 204.72, 202.91, 188.39, 187.46, 196.93, 205.65, 191.25, 188.14], '6M': [201.46, 217.89, 206.04, 206.04, 203, 201.09, 204.23, 216.47, 200.39, 204.67, 204.85, 191.59, 214.44, 238.27, 216.66, 216.18, 206.15, 206.83, 197.33, 204.38, 187.26, 188.96, 196.93, 205.65, 191.25, 188.14], '1Y': [137.56, 139.85, 143.37, 152.38, 179.74, 176.76, 163.56, 166.52, 160.95, 166.13, 168.38, 175.02, 187.18, 197.01, 203.82, 191.17, 213.69, 198.12, 196.77, 179.81, 175.26, 174.71, 179.65, 168.12, 177.18, 181.85, 201.46, 217.89, 206.04, 206.04, 203, 201.09, 198.38, 216.47, 200.39, 204.67, 204.85, 191.59, 214.44, 238.27, 216.66, 216.18, 206.15, 206.83, 197.33, 204.38, 187.26, 188.96, 196.93, 205.65, 191.25, 188.14] },
      velocityScore: { '1D': 0, '1W': 0, '1M': 2.2, '6M': null }, isNew: false,
      marketCap: '$17B', pe: 50, revenueGrowth: 26, eps: 3.76, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 3.05, PRN: false, RSHO: false, IDEF: 1.59, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.9, proScore: 0.76, coverage: 0.4,
      price: 285.99, weeklyPrices: [291.50, 294.10, 289.46, 289.47, 285.99], weeklyChange: -1.89, dayChange: -1.2, sortRank: 0, periodReturns: { '1M': -3.9, 'YTD': -15.9, '6M': -26.1, '1Y': 14.9 },
      priceHistory: { '1D': [289.47, 286.74, 284.92, 283.07, 284.52, 284.69, 284.37, 285.87, 285.65, 285.83, 285.99, 285.89, 286.24, 286.46, 286.27, 285.73, 285.58, 285.93, 285.77, 286.37, 286.66, 286.66, 285.71, 285.99], '1W': [291.5, 294.1, 289.46, 289.47, 285.99], '1M': [297.52, 289.13, 300.95, 297.68, 299.66, 298.51, 296.89, 285.43, 278.19, 283.48, 279.62, 279.09, 281.99, 277.39, 279.89, 278.97, 291.5, 294.1, 289.46, 289.47, 285.99], 'YTD': [340.07, 378.47, 418.86, 418.58, 420.3, 405.82, 417.83, 447.73, 440.33, 417.51, 427.99, 402.56, 393.32, 403.37, 396.17, 370.14, 360.6, 316.28, 326.17, 320.63, 296.41, 292.26, 298.51, 279.62, 278.97, 285.99], '6M': [386.99, 425.9, 413.56, 420.3, 405.82, 417.83, 447.73, 453.73, 429.58, 416.59, 396.57, 369.08, 402.28, 398.07, 378.21, 361.4, 326.13, 333.56, 324.6, 320.95, 293.66, 297.52, 298.51, 279.62, 278.97, 285.99], '1Y': [248.92, 253.82, 265.56, 258.52, 267.49, 269.43, 267.09, 271.74, 269.33, 271.93, 272.46, 277.51, 286.01, 290.83, 284.96, 283.64, 298.42, 306.68, 317.89, 309.74, 314.73, 309.23, 323.14, 321.29, 355.45, 349.75, 386.99, 425.9, 413.56, 420.3, 405.82, 417.83, 438.01, 453.73, 429.58, 416.59, 396.57, 369.08, 402.28, 398.07, 378.21, 361.4, 326.13, 333.56, 324.6, 320.95, 293.66, 297.52, 298.51, 279.62, 278.97, 285.99] },
      velocityScore: { '1D': 1.3, '1W': 10.1, '1M': 2.7, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 18.6, revenueGrowth: 13, eps: 15.4, grossMargin: 12, dividendYield: null,
      etfPresence: { AIRR: 2.75, PRN: false, RSHO: false, IDEF: 1.05, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'CW', name: 'Curtiss-Wright Corp', easyScore: 2, avgWeight: 1.88, proScore: 0.75, coverage: 0.4,
      price: 767.19, weeklyPrices: [760.23, 792.77, 766.54, 760.57, 767.19], weeklyChange: 0.92, dayChange: 0.87, sortRank: 0, periodReturns: { '1M': 4.6, 'YTD': 39.2, '6M': 26.8, '1Y': 58.7 },
      priceHistory: { '1D': [760.57, 767.74, 768.29, 767.23, 761.69, 765.34, 765.06, 765.23, 766.03, 766.93, 767.75, 770.26, 772.21, 771.71, 770.22, 771.98, 771.64, 770.04, 768.89, 769.41, 769.39, 766.91, 767.33, 767.19], '1W': [760.23, 792.77, 766.54, 760.57, 767.19], '1M': [733.57, 719.02, 757.23, 758, 762.59, 764.61, 777.29, 771.93, 783.82, 765.13, 762.92, 767.73, 747.27, 737.39, 757.76, 757.76, 760.23, 792.77, 766.54, 760.57, 767.19], 'YTD': [551.27, 582.61, 660.66, 649.08, 663.99, 653.82, 688, 712.45, 701.99, 703.61, 690.94, 702.25, 696.99, 722.52, 719.99, 725.5, 713.14, 729.2, 712.72, 731.24, 719.99, 721.33, 764.61, 762.92, 757.76, 767.19], '6M': [605.1, 663.84, 649.68, 663.99, 653.82, 688, 712.45, 726.48, 706.46, 683.84, 688.54, 632.06, 699.88, 742.61, 719.51, 706.07, 728.95, 735.34, 704.95, 750.66, 721.12, 733.57, 764.61, 762.92, 757.76, 767.19], '1Y': [483.56, 481.79, 479.67, 496.3, 509.32, 496.79, 480.5, 491.1, 477.94, 495.48, 497.76, 511.34, 542.33, 556.99, 556.55, 536.42, 601.63, 585.12, 577.65, 547.95, 555.28, 535.89, 555.01, 533.58, 567.89, 572.38, 605.1, 663.84, 649.68, 663.99, 653.82, 688, 699.24, 726.48, 706.46, 683.84, 688.54, 632.06, 699.88, 742.61, 719.51, 706.07, 728.95, 735.34, 704.95, 750.66, 721.12, 733.57, 764.61, 762.92, 757.76, 767.19] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$28B', pe: 56.4, revenueGrowth: 13, eps: 13.61, grossMargin: 37, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 2.78, RSHO: false, IDEF: 0.97, BILT: false },
      tonyNote: 'Curtiss-Wright Corp appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 1.82, proScore: 0.73, coverage: 0.4,
      price: 48.88, weeklyPrices: [55.35, 53.54, 50.34, 50.38, 48.88], weeklyChange: -11.69, dayChange: -2.98, sortRank: 0, periodReturns: { '1M': -13, 'YTD': -35.6, '6M': -57, '1Y': 6.2 },
      priceHistory: { '1D': [50.38, 49.71, 49.26, 48.97, 48.79, 49.41, 49.3, 49.31, 49.44, 49.38, 49.28, 49.19, 49.17, 49.19, 49.29, 49.36, 49.3, 49.26, 48.91, 48.99, 49.14, 49.12, 48.99, 48.88], '1W': [55.35, 53.54, 50.34, 50.38, 48.88], '1M': [56.19, 54.82, 58.78, 57.75, 57.02, 56.34, 56.16, 54.21, 51.09, 50.8, 47.95, 46.32, 47.21, 46.95, 49.86, 53.04, 55.35, 53.54, 50.34, 50.38, 48.88], 'YTD': [75.91, 104.04, 124.56, 110.39, 96.16, 98.81, 91.97, 90.68, 88.95, 88.96, 93.04, 79.98, 67.7, 68.33, 74.41, 65.52, 62.05, 57.89, 52.09, 56.18, 63.49, 57.73, 56.34, 47.95, 53.04, 48.88], '6M': [113.7, 130.72, 111.32, 96.16, 98.81, 91.97, 90.68, 90.72, 92.47, 89.53, 83.69, 65.28, 71.96, 73.66, 68.55, 61.66, 59.31, 57.33, 53.47, 56.8, 63.27, 56.19, 56.34, 47.95, 53.04, 48.88], '1Y': [46.02, 54.28, 58.78, 58.01, 58.93, 68.75, 64.27, 68.05, 64.5, 65.66, 75.74, 81.18, 92.96, 105.67, 90.58, 84.3, 91.21, 77.41, 76.7, 70.67, 75.05, 72.78, 76.91, 69.77, 79.97, 79.29, 113.7, 130.72, 111.32, 96.16, 98.81, 91.97, 94.31, 90.72, 92.47, 89.53, 83.69, 65.28, 71.96, 73.66, 68.55, 61.66, 59.31, 57.33, 53.47, 56.8, 63.27, 56.19, 56.34, 47.95, 53.04, 48.88] },
      velocityScore: { '1D': 1.4, '1W': 5.8, '1M': -8.8, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 287.5, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.67, PRN: false, RSHO: false, IDEF: 0.97, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 1.4, proScore: 0.56, coverage: 0.4,
      price: 75.6, weeklyPrices: [73.14, 72.82, 75.08, 75.27, 75.60], weeklyChange: 3.36, dayChange: 0.44, sortRank: 0, periodReturns: { '1M': 5.6, 'YTD': 25.8, '6M': 25.3, '1Y': 30.7 },
      priceHistory: { '1D': [75.27, 75.63, 75.75, 76.05, 76.35, 76.21, 76.31, 76.24, 76.18, 76.15, 75.78, 75.81, 75.83, 75.8, 75.92, 75.75, 75.72, 75.68, 75.68, 75.8, 75.75, 75.89, 75.94, 75.6], '1W': [73.14, 72.82, 75.08, 75.27, 75.6], '1M': [71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 71.25, 73.12, 74.95, 75.79, 75.87, 77.53, 77.92, 75.06, 74.34, 72.77, 73.14, 72.82, 75.08, 75.27, 75.6], 'YTD': [60.11, 61.15, 60.29, 64.96, 66.34, 67.85, 71.96, 73.5, 75.88, 73.84, 72.8, 73.81, 71.83, 72.82, 70.86, 71.65, 75.54, 71.96, 77.72, 78.47, 70.04, 71.59, 71.48, 75.87, 72.77, 75.6], '6M': [60.32, 61.55, 64.29, 66.34, 67.85, 71.96, 73.5, 76.26, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 79.4, 76.34, 71.31, 71.59, 71.48, 75.87, 72.77, 75.6], '1Y': [57.85, 58.48, 57.71, 59.24, 58.64, 57.86, 57.22, 57.13, 57.73, 58.76, 59.02, 62.86, 63.69, 63.5, 63.78, 62.16, 56.98, 57.54, 60.43, 58.89, 59.37, 61.55, 60.5, 58.84, 59.46, 60.85, 60.32, 61.55, 64.29, 66.34, 67.85, 71.96, 72.98, 76.26, 73.18, 73.89, 73.6, 72.47, 74.04, 71.44, 70.43, 73.04, 76.12, 74.73, 79.4, 76.34, 71.31, 71.59, 71.48, 75.87, 72.77, 75.6] },
      velocityScore: { '1D': 1.8, '1W': 1.8, '1M': 1.8, '6M': null }, isNew: false,
      marketCap: '$92B', pe: 33.2, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.79,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.92, IDEF: false, BILT: 1.87 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AIR', name: 'AIRBUS GROUP', easyScore: 2, avgWeight: 1.33, proScore: 0.53, coverage: 0.4,
      price: 137.88, weeklyPrices: [140.11, 143.61, 136.63, 133.30, 137.88], weeklyChange: -1.6, dayChange: 3.43, sortRank: 0, periodReturns: { '1M': 14.8, 'YTD': 66.5, '6M': 42.1, '1Y': 88.2 },
      priceHistory: { '1D': [133.3, 135.25, 135.16, 135.55, 134.9, 136.1, 135.87, 136, 136.01, 136.23, 136.44, 136.46, 136.96, 136.95, 137.07, 137.42, 137.3, 137.35, 137.61, 138.07, 138.22, 138.15, 137.74, 137.88], '1W': [140.11, 143.61, 136.63, 133.3, 137.88], '1M': [120.13, 117.36, 127.23, 129.01, 131.18, 129.96, 132.14, 134.88, 134.28, 132.26, 132.94, 138.51, 143.14, 141.85, 142.93, 142.76, 140.11, 143.61, 136.63, 133.3, 137.88], 'YTD': [82.79, 94.73, 105.74, 105.66, 108, 114.34, 113.54, 118.26, 116.84, 108.3, 108.85, 118.52, 111.37, 123.04, 118.51, 112.08, 110.35, 117.78, 104.55, 108.41, 109.99, 114.72, 129.96, 132.94, 142.76, 137.88], '6M': [97.03, 105.08, 104.26, 108, 114.34, 113.54, 118.26, 119.77, 107.87, 105.64, 103.49, 103.16, 113.86, 125.99, 116.54, 108.86, 111.9, 111.51, 100.89, 112.74, 110.61, 120.13, 129.96, 132.94, 142.76, 137.88], '1Y': [73.26, 74.88, 79.45, 75.82, 72.08, 78.68, 71.77, 76.79, 75.68, 74.05, 74.76, 81.62, 84.34, 84.01, 82.79, 81.33, 84.84, 83.6, 83.65, 78.56, 82.51, 82.64, 82.25, 81.21, 86.03, 84.45, 97.03, 105.08, 104.26, 108, 114.34, 113.54, 116.69, 119.77, 107.87, 105.64, 103.49, 103.16, 113.86, 125.99, 116.54, 108.86, 111.9, 111.51, 100.89, 112.74, 110.61, 120.13, 129.96, 132.94, 142.76, 137.88] },
      velocityScore: { '1D': -1.9, '1W': -1.9, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: 30.3, revenueGrowth: 25, eps: 4.55, grossMargin: 19, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 2.5, BILT: false },
      tonyNote: 'AIRBUS GROUP appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.17, proScore: 0.47, coverage: 0.4,
      price: 603.18, weeklyPrices: [604.56, 609.60, 600.26, 593.89, 603.18], weeklyChange: -0.23, dayChange: 1.56, sortRank: 0, periodReturns: { '1M': 1.8, 'YTD': 34.5, '6M': 23.8, '1Y': 58.8 },
      priceHistory: { '1D': [593.89, 597.02, 599.25, 598.37, 599.47, 598.98, 601.61, 601.55, 603.27, 602.43, 601.59, 604.14, 602.96, 603.25, 602.28, 603.16, 602.87, 602.65, 603.08, 603.22, 602.77, 602.39, 603.33, 603.18], '1W': [604.56, 609.6, 600.26, 593.89, 603.18], '1M': [592.41, 576.74, 607.46, 603.64, 616.95, 621.08, 625.73, 639.18, 645.73, 633.44, 638.94, 648.89, 630.36, 634.78, 644.06, 620.47, 604.56, 609.6, 600.26, 593.89, 603.18], 'YTD': [448.43, 485, 497.06, 504.07, 507.13, 548.2, 552.93, 571.57, 568.58, 560.28, 547.81, 561.66, 551.99, 595.11, 571.61, 601.39, 595.76, 605.99, 569.06, 559.95, 566.14, 590.97, 621.08, 638.94, 620.47, 603.18], '6M': [487.16, 498.82, 504.5, 507.13, 548.2, 552.93, 571.57, 584.89, 565.64, 546.91, 537.2, 524.38, 553.31, 598.23, 591.32, 594.39, 607.5, 613.1, 565.22, 584.4, 578.34, 592.41, 621.08, 638.94, 620.47, 603.18], '1Y': [379.82, 389.57, 389.3, 384.87, 404.38, 410.61, 392.76, 399, 383.6, 378.08, 379.79, 378.54, 384.8, 382.19, 372.71, 393.88, 408.94, 431.36, 445.34, 430.24, 442.95, 438.15, 447.58, 444.99, 458.38, 458.79, 487.16, 498.82, 504.5, 507.13, 548.2, 552.93, 562.54, 584.89, 565.64, 546.91, 537.2, 524.38, 553.31, 598.23, 591.32, 594.39, 607.5, 613.1, 565.22, 584.4, 578.34, 592.41, 621.08, 638.94, 620.47, 603.18] },
      velocityScore: { '1D': 0, '1W': 0, '1M': -19, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 66.4, revenueGrowth: 18, eps: 9.09, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.86, PRN: false, RSHO: false, IDEF: 0.48, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 1.13, proScore: 0.45, coverage: 0.4,
      price: 50.43, weeklyPrices: [56.37, 53.36, 51.47, 49.96, 50.43], weeklyChange: -10.54, dayChange: 0.94, sortRank: 0, periodReturns: { '1M': 4.3, 'YTD': -31.1, '6M': -52.5, '1Y': 6 },
      priceHistory: { '1D': [49.96, 49.48, 49.35, 49.33, 49.23, 49.79, 50.01, 50.52, 50.75, 50.68, 50.62, 50.61, 50.6, 50.42, 50.5, 50.44, 50.42, 50.45, 50.18, 50.49, 50.57, 50.48, 50.46, 50.43], '1W': [56.37, 53.36, 51.47, 49.96, 50.43], '1M': [48.37, 45.87, 49.58, 47.83, 48.27, 51.7, 52.03, 50.37, 47.7, 46.38, 44.84, 46.27, 46.42, 47.1, 49.92, 54.93, 56.37, 53.36, 51.47, 49.96, 50.43], 'YTD': [73.17, 101.28, 109.49, 108.22, 102.87, 97.47, 75.11, 83.6, 91.11, 102.79, 101.43, 99.6, 82.69, 84.22, 87.91, 76.6, 65.73, 60.84, 62.77, 64.1, 53.65, 49.64, 51.7, 44.84, 54.93, 50.43], '6M': [106.22, 108.5, 108.71, 102.87, 97.47, 75.11, 83.6, 93.04, 106.09, 104.08, 102.39, 74.82, 82, 90.18, 82.06, 70.3, 62.89, 62.48, 64.2, 60.66, 54.65, 48.37, 51.7, 44.84, 54.93, 50.43], '1Y': [47.57, 53.74, 49.1, 50.39, 48.6, 51.83, 50.76, 54.69, 53.26, 62.22, 64.11, 66.91, 73.47, 76.6, 75.96, 77.21, 85.79, 79.73, 67.74, 60.93, 64.96, 66.08, 67.27, 64.94, 80.81, 76.85, 106.22, 108.5, 108.71, 102.87, 97.47, 75.11, 81.27, 93.04, 106.09, 104.08, 102.39, 74.82, 82, 90.18, 82.06, 70.3, 62.89, 62.48, 64.2, 60.66, 54.65, 48.37, 51.7, 44.84, 54.93, 50.43] },
      velocityScore: { '1D': -2.2, '1W': 7.1, '1M': -2.2, '6M': null }, isNew: false,
      marketCap: '$7B', pe: 219.3, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 2.05, PRN: false, RSHO: false, IDEF: 0.2, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.13, proScore: 0.45, coverage: 0.4,
      price: 114.7, weeklyPrices: [126.21, 123.07, 115.83, 112.41, 114.70], weeklyChange: -9.12, dayChange: 2.04, sortRank: 0, periodReturns: { '1M': 5.4, 'YTD': 57.1, '6M': 22.7, '1Y': 118.9 },
      priceHistory: { '1D': [112.41, 114.17, 114.86, 114.56, 115.37, 114.39, 114.43, 115.02, 115.18, 115.09, 114.79, 115.15, 115.21, 115, 114.87, 114.9, 115.21, 114.98, 114.93, 115.3, 115.32, 115.32, 114.8, 114.7], '1W': [126.21, 123.07, 115.83, 112.41, 114.7], '1M': [108.82, 106.81, 119.32, 120.3, 115.93, 112.44, 115.5, 113.91, 111.76, 110.87, 105, 105.57, 109.38, 110.22, 122.33, 123.05, 126.21, 123.07, 115.83, 112.41, 114.7], 'YTD': [73.01, 88.74, 102.95, 99.05, 93.89, 85.37, 83.32, 88.76, 89.43, 86.87, 78.97, 78.71, 74.75, 79.23, 84.91, 78.91, 78.55, 90.34, 92.03, 98.55, 111.28, 110.94, 112.44, 105, 123.05, 114.7], '6M': [93.48, 103.02, 98.89, 93.89, 85.37, 83.32, 88.76, 91.01, 89.36, 80.71, 78.29, 69.86, 77.53, 84.09, 83.36, 76.53, 82.96, 92.32, 92.8, 99.32, 112.87, 108.82, 112.44, 105, 123.05, 114.7], '1Y': [52.4, 51.68, 52.91, 53, 53.93, 68.39, 64.54, 67.64, 67.47, 71.7, 73.82, 74.27, 81.18, 83.92, 78.15, 75.54, 77.44, 78.19, 73.1, 67.55, 69.05, 70.23, 75.19, 69.63, 74.7, 76.03, 93.48, 103.02, 98.89, 93.89, 85.37, 83.32, 85.9, 91.01, 89.36, 80.71, 78.29, 69.86, 77.53, 84.09, 83.36, 76.53, 82.96, 92.32, 92.8, 99.32, 112.87, 108.82, 112.44, 105, 123.05, 114.7] },
      velocityScore: { '1D': -2.2, '1W': -4.3, '1M': 7.1, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 12, eps: -0.22, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.24, PRN: false, RSHO: false, IDEF: 1.02, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.58, proScore: 0.23, coverage: 0.4,
      price: 44.73, weeklyPrices: [43.72, 45.37, 45.47, 44.71, 44.73], weeklyChange: 2.31, dayChange: 0.04, sortRank: 0, periodReturns: { '1M': -5.5, 'YTD': 31.2, '6M': 9.1, '1Y': -4.9 },
      priceHistory: { '1D': [44.71, 44.58, 44.51, 44.44, 44.4, 44.56, 44.45, 44.53, 44.58, 44.81, 44.79, 44.64, 44.77, 44.83, 44.87, 44.81, 44.8, 44.79, 44.72, 44.88, 44.92, 44.85, 44.7, 44.73], '1W': [43.72, 45.37, 45.47, 44.71, 44.73], '1M': [47.35, 46.11, 49.69, 48.53, 46.68, 45.59, 46.58, 46.08, 44.99, 45.74, 44.69, 44.36, 42.48, 40.95, 42.67, 42.69, 43.72, 45.37, 45.47, 44.71, 44.73], 'YTD': [34.09, 38.84, 42.26, 40.99, 40.45, 40.22, 39.13, 43.82, 45.51, 46.35, 46.44, 46.32, 45.86, 47.1, 44.94, 41.41, 40.03, 41.36, 41.5, 44.92, 47.96, 46.55, 45.59, 44.69, 42.69, 44.73], '6M': [40.99, 42.57, 40.63, 40.45, 40.22, 39.13, 43.82, 45.49, 47.41, 45.3, 44.4, 43.25, 46.19, 47.54, 43.2, 40.18, 39.7, 42.87, 42.81, 45.8, 47.39, 47.35, 45.59, 44.69, 42.69, 44.73], '1Y': [47.01, 48.01, 47.53, 43.24, 41.31, 41.9, 41.06, 41.93, 41.79, 41.14, 41.54, 42.55, 44.58, 45.43, 40.19, 39.94, 38.43, 35.76, 35.46, 33.43, 33.78, 33.79, 34.02, 32.55, 34.52, 34.78, 40.99, 42.57, 40.63, 40.45, 40.22, 39.13, 38.14, 45.49, 47.41, 45.3, 44.4, 43.25, 46.19, 47.54, 43.2, 40.18, 39.7, 42.87, 42.81, 45.8, 47.39, 47.35, 45.59, 44.69, 42.69, 44.73] },
      velocityScore: { '1D': -4.2, '1W': 9.5, '1M': -4.2, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 41.8, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.8,
      etfPresence: { AIRR: 0.87, PRN: false, RSHO: false, IDEF: 0.3, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.36, proScore: 0.15, coverage: 0.4,
      price: 75.58, weeklyPrices: [76.75, 79.91, 74.87, 75.49, 75.58], weeklyChange: -1.52, dayChange: 0.12, sortRank: 0, periodReturns: { '1M': 5.7, 'YTD': 12.8, '6M': 7.2, '1Y': 59.3 },
      priceHistory: { '1D': [75.49, 76.46, 76.67, 76.23, 76.09, 76.14, 75.86, 75.94, 75.91, 76.14, 76.33, 75.97, 75.96, 75.75, 75.81, 75.78, 75.83, 75.91, 75.72, 75.81, 76.06, 76.05, 75.82, 75.58], '1W': [76.75, 79.91, 74.87, 75.49, 75.58], '1M': [71.48, 68.72, 73.61, 74.92, 76.55, 76.19, 77.89, 77.99, 81.5, 81, 82.36, 81.56, 79.53, 81.88, 82.97, 79.51, 76.75, 79.91, 74.87, 75.49, 75.58], 'YTD': [67.02, 70.17, 75.17, 76.01, 80.11, 84.07, 82.24, 85.87, 69.95, 71.29, 71.21, 78.37, 78.71, 81.5, 84.39, 86.48, 93.68, 82.85, 79.49, 72.76, 74.26, 72.13, 76.19, 82.36, 79.51, 75.58], '6M': [70.53, 75.09, 77.34, 80.11, 84.07, 82.24, 85.87, 73.57, 72.04, 71.31, 72.44, 72.83, 77.31, 86.16, 85.11, 86.87, 97.31, 82.69, 74.91, 74.67, 74.29, 71.48, 76.19, 82.36, 79.51, 75.58], '1Y': [47.45, 50.77, 49.17, 47.65, 47.28, 57.75, 55.99, 58.99, 59.03, 62.46, 63.62, 64.78, 63.75, 63.58, 63.3, 64.22, 69.34, 67.92, 62.28, 60.11, 65.16, 67.63, 67.56, 66.02, 68.93, 69.35, 70.53, 75.09, 77.34, 80.11, 84.07, 82.24, 84.99, 73.57, 72.04, 71.31, 72.44, 72.83, 77.31, 86.16, 85.11, 86.87, 97.31, 82.69, 74.91, 74.67, 74.29, 71.48, 76.19, 82.36, 79.51, 75.58] },
      velocityScore: { '1D': 7.1, '1W': 0, '1M': 15.4, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 51.8, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: null,
      etfPresence: { AIRR: 0.7, PRN: false, RSHO: false, IDEF: 0.03, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'TIMKEN CO/THE', easyScore: 1, avgWeight: 8.69, proScore: 1.74, coverage: 0.2,
      price: 139.57, weeklyPrices: [139.16, 142.36, 138.06, 137.23, 139.57], weeklyChange: 0.29, dayChange: 1.71, sortRank: 0, periodReturns: { '1M': 1.8, 'YTD': 65.9, '6M': 53.1, '1Y': 79.7 },
      priceHistory: { '1D': [137.23, 138.88, 138.67, 139.33, 139.55, 139.35, 139.31, 139.73, 139.36, 139.54, 139.73, 139.72, 140.05, 140.09, 139.94, 139.85, 140.01, 139.74, 139.82, 139.63, 140.02, 139.79, 139.61, 139.57], '1W': [139.16, 142.36, 138.06, 137.23, 139.57], '1M': [137.09, 132.39, 137.4, 137.06, 139.12, 140.28, 139.4, 142.36, 141.97, 137.64, 137.99, 144.01, 141.22, 143.5, 145.32, 141.75, 139.16, 142.36, 138.06, 137.23, 139.57], 'YTD': [84.13, 90.6, 93.73, 93.94, 94.99, 108.93, 105.54, 109.52, 106.58, 102.18, 98.23, 101.9, 102.06, 106.92, 103.92, 108.7, 109, 117.97, 114.49, 119.95, 126.54, 134.67, 140.28, 137.99, 141.75, 139.57], '6M': [91.17, 93.55, 94.02, 94.99, 108.93, 105.54, 109.52, 109.99, 100.58, 98.74, 98.99, 95.94, 99.17, 106.81, 108.75, 106.88, 109.63, 117.12, 109.36, 127.42, 131.9, 137.09, 140.28, 137.99, 141.75, 139.57], '1Y': [77.68, 76.68, 80.99, 74.77, 73.57, 80.39, 75.86, 78.96, 75.12, 76.4, 77.11, 75.67, 75.11, 75.86, 74.7, 75.85, 79.25, 78.46, 78.66, 74.82, 81.22, 82.52, 87.53, 84.14, 86.02, 86.29, 91.17, 93.55, 94.02, 94.99, 108.93, 105.54, 107.83, 109.99, 100.58, 98.74, 98.99, 95.94, 99.17, 106.81, 108.75, 106.88, 109.63, 117.12, 109.36, 127.42, 131.9, 137.09, 140.28, 137.99, 141.75, 139.57] },
      velocityScore: { '1D': 0, '1W': 0, '1M': -2.8, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 31.6, revenueGrowth: 8, eps: 4.41, grossMargin: 31, dividendYield: 1.05,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.69, IDEF: false, BILT: false },
      tonyNote: 'TIMKEN CO/THE appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.25, proScore: 4.25, coverage: 1,
      price: 222.75, weeklyPrices: [215.62, 213.02, 195.19, 216.48, 222.75], weeklyChange: 3.31, dayChange: 2.89, sortRank: 0, periodReturns: { '1M': 1.2, 'YTD': 166.1, '6M': 127.5, '1Y': 383.7 },
      priceHistory: { '1D': [216.48, 220.23, 222.2, 219.56, 214.82, 216.41, 215.39, 214.4, 215.6, 216.32, 216.78, 215.23, 214.71, 214.6, 216.15, 216.55, 218.8, 219.44, 219.64, 220.56, 222.21, 220.9, 221.68, 222.75], '1W': [215.62, 213.02, 195.19, 216.48, 222.75], '1M': [220.12, 211.69, 222.24, 232.36, 260.07, 265.1, 280.91, 286.69, 283.61, 275.25, 259.66, 256.63, 240.3, 261.15, 276.17, 229.18, 215.62, 213.02, 195.19, 216.48, 222.75], 'YTD': [83.71, 97.3, 103.89, 94.5, 88.16, 92.88, 97.52, 102.58, 86.8, 96.43, 118.56, 115.09, 101.95, 136.33, 165.34, 157.08, 154.49, 177.05, 219.94, 214.77, 264.51, 218, 265.1, 259.66, 229.18, 222.75], '6M': [97.93, 108.73, 91.46, 88.16, 92.88, 97.52, 102.58, 91.01, 94.94, 129.85, 114.15, 92.26, 117.4, 161.94, 156.55, 135.51, 175.92, 179.11, 197.73, 208.06, 260.58, 220.12, 265.1, 259.66, 229.18, 222.75], '1Y': [46.05, 53.31, 51.88, 51.29, 55.09, 70.63, 67.47, 70.48, 65.65, 93.39, 94.08, 113.23, 115.61, 122, 125.83, 98.62, 125.1, 117, 94.36, 95.07, 88.88, 98.92, 93.59, 75.45, 91.13, 89.95, 97.93, 108.73, 91.46, 88.16, 92.88, 97.52, 100.61, 91.01, 94.94, 129.85, 114.15, 92.26, 117.4, 161.94, 156.55, 135.51, 175.92, 179.11, 197.73, 208.06, 260.58, 220.12, 265.1, 259.66, 229.18, 222.75] },
      velocityScore: { '1D': 1.4, '1W': -2.3, '1M': -8.8, '6M': null }, isNew: false,
      marketCap: '$57B', pe: 85.7, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 2.73, MEME: 6.58, RKNG: 3.45 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 5.44, proScore: 3.63, coverage: 0.667,
      price: 260.09, weeklyPrices: [270.89, 295.05, 269.57, 254.29, 260.09], weeklyChange: -3.99, dayChange: 2.28, sortRank: 0, periodReturns: { '1M': 0.2, 'YTD': 199.3, '6M': 94, '1Y': 805.9 },
      priceHistory: { '1D': [254.29, 270, 265.05, 266.85, 260.83, 262.18, 260.2, 262.27, 262.45, 263.17, 266.88, 264.83, 262.86, 263, 263.79, 263.31, 262.5, 265.08, 263.17, 265.3, 265.14, 264.02, 261.24, 260.09], '1W': [270.89, 295.05, 269.57, 254.29, 260.09], '1M': [259.61, 234.23, 248.88, 260.22, 274.5, 280.88, 284.99, 328.91, 345.85, 321.98, 326.19, 309.18, 252.02, 275.01, 302.7, 289.5, 270.89, 295.05, 269.57, 254.29, 260.09], 'YTD': [86.89, 121.84, 139.17, 144.89, 156.13, 155.17, 145.32, 166.2, 153.02, 154, 156.58, 150.22, 132.45, 160.13, 210.06, 237.57, 290.52, 261.03, 275.95, 302.49, 273.51, 253.57, 280.88, 326.19, 289.5, 260.09], '6M': [134.07, 149.5, 139.62, 156.13, 155.17, 145.32, 166.2, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 261.34, 302.4, 302.85, 259.61, 280.88, 326.19, 289.5, 260.09], '1Y': [28.71, 24.69, 26.89, 37.62, 38.86, 44.08, 44.51, 49.94, 52.45, 62.96, 79.67, 69.18, 90.19, 87.58, 116.58, 94.37, 133.71, 141.41, 126.72, 108.93, 94.29, 102.5, 101.29, 76.97, 91.88, 98.69, 134.07, 149.5, 139.62, 156.13, 155.17, 145.32, 160.28, 166, 151.32, 153.68, 141.33, 119.51, 135.91, 219.03, 220.91, 226.37, 295.25, 280.69, 261.34, 302.4, 302.85, 259.61, 280.88, 326.19, 289.5, 260.09] },
      velocityScore: { '1D': -6.2, '1W': 17.9, '1M': 8.4, '6M': null }, isNew: false,
      marketCap: '$74B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.02, RKNG: 3.86 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 4.78, proScore: 3.18, coverage: 0.667,
      price: 1932.19, weeklyPrices: [1745.00, 1744.43, 1617.70, 1727.18, 1932.19], weeklyChange: 10.73, dayChange: 11.87, sortRank: 0, periodReturns: { '1M': 17.3, 'YTD': 714, '6M': 412, '1Y': 4082.2 },
      priceHistory: { '1D': [1727.18, 1813.83, 1844, 1855.45, 1832.64, 1845.9, 1856.69, 1876.16, 1879.85, 1884.53, 1877.9, 1880.81, 1882.23, 1881.77, 1882.18, 1878.81, 1903.25, 1917, 1934.95, 1940.36, 1948.39, 1944.47, 1941.82, 1932.19], '1W': [1745, 1744.43, 1617.7, 1727.18, 1932.19], '1M': [1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745, 1744.43, 1617.7, 1727.18, 1932.19], 'YTD': [237.38, 334.54, 409.24, 473.83, 665.24, 583.4, 590.59, 638.52, 565.41, 618.89, 753.69, 677.86, 692.73, 851.57, 919.47, 932.43, 1187, 1562.34, 1407.61, 1478.69, 1761.43, 1642, 1991.55, 1914.46, 2032.22, 1932.19], '6M': [377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 638.52, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46, 2032.22, 1932.19], '1Y': [46.2, 41.36, 43, 43.39, 42.1, 47.01, 44.4, 47.35, 53.01, 73.92, 93.97, 99.83, 121.12, 131.88, 144.3, 146.95, 204.36, 216.5, 283.1, 245.96, 220.5, 194.38, 232.86, 206.83, 250.08, 275.24, 377.41, 413.62, 470.8, 665.24, 583.4, 590.59, 666.49, 619.08, 588.73, 703.63, 702.49, 572.5, 710.8, 944.46, 903.49, 1002.35, 1406.32, 1452.02, 1383.29, 1589.55, 1716.36, 1646.54, 1991.55, 1914.46, 2032.22, 1932.19] },
      velocityScore: { '1D': 2.6, '1W': 5.3, '1M': -14.5, '6M': null }, isNew: false,
      marketCap: '$286B', pe: 66.2, revenueGrowth: 251, eps: 29.19, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.24, RKNG: 3.31 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'WULF', name: 'WULF', easyScore: 2, avgWeight: 4.57, proScore: 3.04, coverage: 0.667,
      price: 24.5, weeklyPrices: [21.18, 22.21, 20.24, 22.83, 24.50], weeklyChange: 15.7, dayChange: 7.34, sortRank: 0, periodReturns: { '1M': -3.1, 'YTD': 113.3, '6M': 87.1, '1Y': 397.1 },
      priceHistory: { '1D': [22.83, 23.35, 23.54, 23.33, 23.23, 23.42, 23.75, 23.65, 23.87, 24.15, 24.4, 24.35, 24.2, 23.97, 23.97, 23.94, 23.92, 24.02, 24.02, 23.96, 23.99, 23.85, 24.19, 24.5], '1W': [21.18, 22.21, 20.24, 22.83, 24.5], '1M': [25.3, 23.19, 25.35, 26.06, 28.17, 28.01, 27.86, 28.98, 28.31, 28.78, 26.97, 26.06, 25.83, 25.58, 24.7, 23.58, 21.18, 22.21, 20.24, 22.83, 24.5], 'YTD': [11.49, 12.84, 13.83, 14.12, 13.44, 16.65, 16.18, 17.56, 14.74, 14.35, 15.3, 16.86, 14.48, 19.03, 19.31, 20.37, 21.31, 23.39, 22.32, 22.82, 25.66, 25.86, 28.01, 26.97, 23.58, 24.5], '6M': [13.1, 13.85, 13.79, 13.44, 16.65, 16.18, 17.56, 16.02, 13.85, 16.41, 16.19, 13.7, 16.57, 20.95, 19.77, 20.8, 23.49, 22.8, 21.34, 25.18, 26.49, 25.3, 28.01, 26.97, 23.58, 24.5], '1Y': [4.93, 5.25, 5.2, 5.01, 5.15, 5.46, 9.28, 9.24, 8.98, 10.55, 11.35, 11.4, 11.47, 12.3, 15.47, 12.62, 14.5, 15.36, 12.64, 12.23, 13.94, 14.43, 15.76, 11.57, 12.31, 12.74, 13.1, 13.85, 13.79, 13.44, 16.65, 16.18, 15.68, 16.02, 13.85, 16.41, 16.19, 13.7, 16.57, 20.95, 19.77, 20.8, 23.49, 22.8, 21.34, 25.18, 26.49, 25.3, 28.01, 26.97, 23.58, 24.5] },
      velocityScore: { '1D': 5.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$12B', pe: null, revenueGrowth: -1, eps: -2.51, grossMargin: 64, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.11, RKNG: 3.02 },
      tonyNote: 'WULF appears in 2 of 3 Meme ETFs (67% coverage) with average weight 4.6% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 2, avgWeight: 4.49, proScore: 2.99, coverage: 0.667,
      price: 43.12, weeklyPrices: [38.82, 43.91, 39.81, 43.01, 43.12], weeklyChange: 11.08, dayChange: 0.27, sortRank: 0, periodReturns: { '1M': -20.2, 'YTD': 14.2, '6M': -6.3, '1Y': 154.2 },
      priceHistory: { '1D': [43.01, 44.13, 43.9, 43.2, 42.63, 42.66, 42.97, 43.01, 42.81, 42.99, 43.26, 43.03, 42.73, 42.83, 42.61, 42.65, 42.85, 42.92, 42.78, 42.65, 42.85, 42.7, 42.87, 43.12], '1W': [38.82, 43.91, 39.81, 43.01, 43.12], '1M': [54.02, 51.52, 56.71, 59.77, 60.85, 59.18, 58.11, 59.96, 56.87, 54.72, 50.3, 47.74, 47.21, 45.91, 45.73, 43.32, 38.82, 43.91, 39.81, 43.01, 43.12], 'YTD': [37.77, 45.68, 51.89, 56.68, 53.08, 46.15, 40.97, 45.45, 38.85, 38.12, 42.21, 41.43, 34.09, 37.06, 47.7, 52.02, 45.66, 61.2, 52.94, 56.83, 65.33, 59.19, 59.18, 50.3, 43.32, 43.12], '6M': [46.03, 57.82, 52.36, 53.08, 46.15, 40.97, 45.45, 41.39, 38.84, 44.94, 42.16, 31.62, 35.74, 47.37, 45.17, 44.44, 54.74, 56.56, 47.74, 59.78, 66.6, 54.02, 59.18, 50.3, 43.32, 43.12], '1Y': [16.96, 17.31, 18.99, 16.14, 18.32, 17.73, 19.76, 22.99, 28.21, 33.63, 37.9, 47.14, 47.08, 60.09, 67.98, 51.83, 60.42, 76.41, 55.7, 45.83, 47.47, 43.96, 43.92, 33.78, 41.98, 42.7, 46.03, 57.82, 52.36, 53.08, 46.15, 40.97, 42.36, 41.39, 38.84, 44.94, 42.16, 31.62, 35.74, 47.37, 45.17, 44.44, 54.74, 56.56, 47.74, 59.78, 66.6, 54.02, 59.18, 50.3, 43.32, 43.12] },
      velocityScore: { '1D': 3.5, '1W': 24.6, '1M': 5.3, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 56, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 2.18, MEME: 6.79, RKNG: false },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 2, avgWeight: 4.49, proScore: 2.99, coverage: 0.667,
      price: 586.44, weeklyPrices: [539.00, 577.46, 532.10, 550.30, 586.44], weeklyChange: 8.8, dayChange: 6.57, sortRank: 0, periodReturns: { '1M': 13.3, 'YTD': 240.4, '6M': 192.5, '1Y': 807.2 },
      priceHistory: { '1D': [550.3, 593.15, 596.51, 597.36, 588.28, 588.52, 587.4, 587.44, 589.45, 591.01, 590.43, 588, 587.46, 587.8, 588.24, 586.2, 588.74, 589.57, 588.1, 589.47, 590.8, 588.03, 586.62, 586.44], '1W': [539, 577.46, 532.1, 550.3, 586.44], '1M': [517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 532.1, 550.3, 586.44], 'YTD': [172.27, 187.68, 222.1, 236.39, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 304.9, 296.14, 297.73, 337.88, 361.69, 403.12, 431.52, 480, 482.02, 484.28, 546.2, 526.93, 681.08, 643.83, 598.37, 586.44], '6M': [200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 270.57, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 524.65, 563.1, 517.72, 681.08, 643.83, 598.37, 586.44], '1Y': [64.64, 66.53, 69.32, 71.43, 73.78, 76.07, 75.64, 79.71, 86, 95.02, 100.94, 109.69, 130.59, 121.18, 120.44, 120.47, 141.38, 160.1, 166.11, 153.97, 155.41, 155.59, 181.95, 166.26, 179.56, 187.7, 200.46, 221.51, 240.85, 270.23, 285.99, 284.11, 280.42, 270.08, 262.06, 286.21, 294.79, 251.67, 311.96, 366.22, 383.81, 390.99, 465.26, 488.74, 455.8, 524.65, 563.1, 517.72, 681.08, 643.83, 598.37, 586.44] },
      velocityScore: { '1D': 0, '1W': 6, '1M': 92.9, '6M': null }, isNew: false,
      marketCap: '$202B', pe: 35.1, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.4, RKNG: 3.58 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'LITE', name: 'LITE', easyScore: 2, avgWeight: 4.03, proScore: 2.68, coverage: 0.667,
      price: 788.5, weeklyPrices: [728.32, 731.25, 698.91, 707.10, 788.50], weeklyChange: 8.26, dayChange: 11.51, sortRank: 0, periodReturns: { '1M': -4, 'YTD': 113.9, '6M': 124.4, '1Y': 771.8 },
      priceHistory: { '1D': [707.1, 792.35, 792.43, 795.63, 776.35, 784.22, 784.59, 790.08, 787.39, 789.68, 789.83, 793.08, 790.04, 789.45, 788.89, 786.91, 789.54, 790.63, 793.29, 792.29, 795.05, 794, 787.37, 788.5], '1W': [728.32, 731.25, 698.91, 707.1, 788.5], '1M': [821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06, 801.16, 728.32, 731.25, 698.91, 707.1, 788.5], 'YTD': [368.59, 348.26, 343.27, 339.19, 423.42, 577.15, 600.42, 688.27, 694.43, 672, 700.81, 777.17, 764.65, 894.13, 891.22, 846.89, 949.93, 903.8, 970.7, 946.9, 905, 895.4, 875.36, 842.53, 801.16, 788.5], '6M': [351.42, 324.25, 332.45, 423.42, 577.15, 600.42, 688.27, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 890.09, 910.81, 1029.15, 821.76, 875.36, 842.53, 801.16, 788.5], '1Y': [90.44, 99.63, 102.13, 109.85, 110.01, 120.23, 115.89, 124.62, 134.12, 164.88, 163.34, 152.75, 171.4, 163.09, 156.57, 158.06, 214.28, 232.75, 253.81, 268.92, 291.27, 302.98, 366, 320.25, 395.92, 386.11, 351.42, 324.25, 332.45, 423.42, 577.15, 600.42, 674.73, 783.25, 640.69, 624.84, 728.95, 654.79, 815.75, 852.79, 836.92, 791.37, 994.56, 992.37, 890.09, 910.81, 1029.15, 821.76, 875.36, 842.53, 801.16, 788.5] },
      velocityScore: { '1D': 0.8, '1W': 5.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$61B', pe: 139.3, revenueGrowth: 90, eps: 5.66, grossMargin: 41, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.17, RKNG: 2.88 },
      tonyNote: 'LITE appears in 2 of 3 Meme ETFs (67% coverage) with average weight 4.0% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 2, avgWeight: 3.84, proScore: 2.56, coverage: 0.667,
      price: 74.7, weeklyPrices: [85.13, 80.64, 74.21, 74.95, 74.70], weeklyChange: -12.25, dayChange: -0.33, sortRank: 0, periodReturns: { '1M': -15.8, 'YTD': 2.9, '6M': -23.5, '1Y': 75.8 },
      priceHistory: { '1D': [74.95, 74.5, 74, 73.44, 72.77, 73.43, 73.62, 73.56, 73.35, 73.9, 74.43, 73.54, 73.38, 73.17, 73.14, 72.89, 73.15, 73.54, 73.05, 73.16, 73.32, 73.46, 74.39, 74.7], '1W': [85.13, 80.64, 74.21, 74.95, 74.7], '1M': [88.71, 87.32, 97.56, 82.41, 87.57, 82.25, 85.43, 80.66, 73.19, 72.87, 68.01, 65.62, 71.45, 86.77, 88.86, 86.1, 85.13, 80.64, 74.21, 74.95, 74.7], 'YTD': [72.63, 90.56, 101.25, 113.57, 104.55, 102.12, 83.03, 85.82, 92.68, 87.53, 90.74, 96.06, 83.99, 91.61, 90.94, 78.75, 70.89, 75.05, 83.67, 105.86, 105.65, 92.06, 82.25, 68.01, 86.1, 74.7], '6M': [97.67, 115.77, 104.78, 104.55, 102.12, 83.03, 85.82, 86.92, 89.76, 89.11, 88.42, 73.82, 92.57, 88.57, 80.01, 71.88, 63.87, 72.96, 88.1, 119.7, 118.17, 88.71, 82.25, 68.01, 86.1, 74.7], '1Y': [42.5, 52.63, 58.92, 54.29, 51.79, 50.05, 45.08, 50.43, 45.22, 37.58, 41.19, 54.5, 56.94, 81.2, 95.69, 71.35, 80.06, 70.38, 64.49, 58.01, 55.51, 61.44, 79.05, 61.86, 78.05, 83.47, 97.67, 115.77, 104.78, 104.55, 102.12, 83.03, 83.9, 86.92, 89.76, 89.11, 88.42, 73.82, 92.57, 88.57, 80.01, 71.88, 63.87, 72.96, 88.1, 119.7, 118.17, 88.71, 82.25, 68.01, 86.1, 74.7] },
      velocityScore: { '1D': 40.7, '1W': -4.1, '1M': -37.1, '6M': null }, isNew: false,
      marketCap: '$29B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.36, MEME: 5.33, RKNG: false },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'AMD', name: 'AMD', easyScore: 2, avgWeight: 3.52, proScore: 2.35, coverage: 0.667,
      price: 546.64, weeklyPrices: [517.82, 552.05, 516.11, 517.41, 546.64], weeklyChange: 5.57, dayChange: 5.65, sortRank: 0, periodReturns: { '1M': 15, 'YTD': 155.3, '6M': 169.1, '1Y': 294.9 },
      priceHistory: { '1D': [517.4, 549.87, 556.3, 554.49, 551.14, 557.93, 554.23, 555.42, 554.61, 553.95, 554.53, 556.35, 554.73, 551.61, 552.49, 551.34, 551.76, 550.85, 547.91, 548.83, 546.75, 546.51, 545.66, 546.64], '1W': [517.82, 552.05, 516.11, 517.41, 546.64], '1M': [475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 517.41, 546.64], 'YTD': [214.16, 204.68, 227.92, 259.68, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 199.46, 220.27, 210.21, 236.64, 278.26, 305.33, 360.54, 455.19, 424.1, 467.51, 510.13, 490.33, 507.29, 519.74, 540.88, 546.64], '6M': [203.17, 231.83, 251.31, 246.27, 216, 203.08, 213.84, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 503.89, 521.54, 475.51, 507.29, 519.74, 540.88, 546.64], '1Y': [138.41, 160.08, 158.65, 179.51, 163.12, 184.42, 165.2, 166.62, 162.13, 159.54, 159.16, 160.88, 164.01, 235.56, 238.6, 230.23, 264.33, 256.33, 258.89, 223.55, 206.13, 217.6, 221.42, 198.11, 215.04, 223.47, 203.17, 231.83, 251.31, 246.27, 216, 203.08, 196.6, 198.62, 202.68, 196.58, 202.68, 196.04, 221.53, 255.07, 284.49, 323.21, 355.26, 448.29, 414.05, 503.89, 521.54, 475.51, 507.29, 519.74, 540.88, 546.64] },
      velocityScore: { '1D': 0.9, '1W': 2.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$891B', pe: 182.2, revenueGrowth: 38, eps: 3, grossMargin: 53, dividendYield: null,
      etfPresence: { BUZZ: 3.28, MEME: false, RKNG: 3.77 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'MRVL', name: 'MRVL', easyScore: 2, avgWeight: 3.5, proScore: 2.33, coverage: 0.667,
      price: 246.65, weeklyPrices: [245.29, 249.27, 230.70, 231.71, 246.65], weeklyChange: 0.55, dayChange: 6.45, sortRank: 0, periodReturns: { '1M': -7.6, 'YTD': 190.2, '6M': 196.4, '1Y': 241.3 },
      priceHistory: { '1D': [231.71, 249.33, 248.67, 247.8, 244.5, 245.62, 246.34, 247.23, 247.04, 246.74, 247.74, 247.96, 247.6, 246.91, 246.75, 246.54, 247.38, 248.41, 248.16, 247.23, 247.94, 247.37, 246.06, 246.65], '1W': [245.29, 249.27, 230.7, 231.71, 246.65], '1M': [266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 245.29, 249.27, 230.7, 231.71, 246.65], 'YTD': [84.98, 83.45, 80.38, 80.23, 78.66, 82.35, 79.01, 78.39, 77.51, 93.3, 87.62, 98.45, 106.71, 119.93, 133.37, 165.56, 164.95, 170.13, 176.89, 196.33, 219.43, 288.85, 278.67, 276.7, 272.05, 246.65], '6M': [83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 78.39, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 208.26, 290.79, 266.88, 278.67, 276.7, 272.05, 246.65], '1Y': [72.26, 70.85, 73.27, 81.74, 75.32, 79.32, 71.22, 74.26, 62.31, 67.1, 70.98, 80.09, 83.89, 92.5, 88.89, 81.05, 90.15, 92.9, 89.33, 81.32, 83.43, 100.2, 92.47, 81.7, 86.49, 89.39, 83.22, 80.46, 81.77, 78.66, 82.35, 79.01, 77.79, 80.86, 92.65, 91.58, 90.16, 87.81, 109.38, 133.83, 151.31, 153.23, 168.75, 164.5, 176.27, 208.26, 290.79, 266.88, 278.67, 276.7, 272.05, 246.65] },
      velocityScore: { '1D': -3.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$216B', pe: 84.5, revenueGrowth: 28, eps: 2.92, grossMargin: 52, dividendYield: 0.1,
      etfPresence: { BUZZ: 2.55, MEME: 4.45, RKNG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 3.32, proScore: 2.21, coverage: 0.667,
      price: 1014.62, weeklyPrices: [975.56, 984.75, 938.38, 948.80, 1014.62], weeklyChange: 4, dayChange: 6.94, sortRank: 0, periodReturns: { '1M': 8.4, 'YTD': 255.5, '6M': 194, '1Y': 730 },
      priceHistory: { '1D': [948.8, 1017.05, 1027.72, 1027.4, 1013.84, 1013.47, 1013.52, 1018.79, 1015.78, 1018.48, 1019.58, 1017.6, 1018.92, 1014.65, 1013.34, 1014.3, 1022.69, 1024.74, 1023.87, 1024.57, 1022.83, 1019.77, 1015.14, 1014.62], '1W': [975.56, 984.75, 938.38, 948.8, 1014.62], '1M': [935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 948.8, 1014.62], 'YTD': [285.41, 327.02, 336.63, 399.65, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.73, 382.09, 367.85, 421.51, 457.23, 481.72, 542.21, 746.81, 724.66, 751, 1035.5, 949.28, 1020.76, 1048.51, 1032.28, 1014.62], '6M': [345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 418.01, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1032.28, 1014.62], '1Y': [122.24, 116.43, 109.83, 114.74, 108.78, 124.27, 117.21, 116.5, 118.72, 140, 159.99, 161.71, 182.15, 196.54, 191.94, 198.47, 226.63, 237.5, 244.9, 225.92, 224.53, 234.16, 263.71, 225.52, 286.68, 315.42, 345.09, 362.75, 389.09, 437.8, 383.5, 399.78, 420.97, 412.67, 389.32, 441.8, 404.35, 321.8, 377.58, 465.66, 449.38, 504.29, 640.2, 766.58, 698.74, 895.88, 1064.1, 935.89, 1020.76, 1048.51, 1032.28, 1014.62] },
      velocityScore: { '1D': -0.9, '1W': -36.5, '1M': -25.3, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 23, revenueGrowth: 346, eps: 44.21, grossMargin: 73, dividendYield: null,
      etfPresence: { BUZZ: 2.93, MEME: false, RKNG: 3.7 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'INTC', name: 'INTC', easyScore: 2, avgWeight: 3.11, proScore: 2.07, coverage: 0.667,
      price: 112.71, weeklyPrices: [120.35, 122.20, 110.39, 110.24, 112.71], weeklyChange: -6.35, dayChange: 2.24, sortRank: 0, periodReturns: { '1M': 4.4, 'YTD': 205.4, '6M': 147.4, '1Y': 380.8 },
      priceHistory: { '1D': [110.24, 116.49, 115.4, 114.74, 113.23, 112.56, 112.89, 113.2, 112.64, 112.7, 113.01, 112.98, 113.14, 112.47, 112.84, 112.66, 113.11, 113.27, 112.94, 112.75, 112.83, 112.58, 112.57, 112.71], '1W': [120.35, 122.2, 110.39, 110.24, 112.71], '1M': [107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.2, 110.39, 110.24, 112.71], 'YTD': [36.9, 41.11, 48.32, 45.07, 48.81, 50.24, 46.18, 46.12, 43.1, 46.78, 45.03, 47.18, 48.03, 61.72, 68.5, 66.78, 99.62, 124.92, 108.77, 119.84, 109.33, 110.27, 117.05, 131.65, 127.02, 112.71], '6M': [45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 46.12, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 123.52, 107.93, 107.92, 117.05, 131.65, 127.02, 112.71], '1Y': [23.44, 22.69, 23.49, 20.34, 20.41, 22.22, 23.54, 24.35, 24, 24.77, 24.9, 31.22, 35.94, 37.43, 37.15, 36.92, 41.34, 38.38, 37.89, 35.11, 35.83, 43.76, 40.78, 36.05, 36.16, 39.38, 45.55, 46.96, 42.49, 48.81, 50.24, 46.18, 43.63, 45.5, 45.58, 45.76, 44.01, 41.19, 52.91, 63.81, 66.26, 84.52, 108.15, 120.61, 110.8, 123.52, 107.93, 107.92, 117.05, 131.65, 127.02, 112.71] },
      velocityScore: { '1D': -3.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$566B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 2.62, MEME: false, RKNG: 3.6 },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 1, avgWeight: 6.86, proScore: 2.29, coverage: 0.333,
      price: 124.96, weeklyPrices: [120.95, 123.36, 114.41, 114.44, 124.96], weeklyChange: 3.32, dayChange: 9.19, sortRank: 0, periodReturns: { '1M': -23.3, 'YTD': 258.5, '6M': 267.1, '1Y': 347.6 },
      priceHistory: { '1D': [114.44, 124.85, 125.27, 124.22, 120, 121.29, 121.26, 122.55, 122.54, 123.19, 122.85, 122.5, 121.57, 120.91, 121.31, 120.85, 121.8, 123.99, 124.79, 125, 125.55, 125.1, 124.45, 124.96], '1W': [120.95, 123.36, 114.41, 114.44, 124.96], '1M': [162.88, 175.13, 172.78, 169.05, 191.55, 170.81, 167.34, 161.85, 171.23, 147.44, 146.97, 138.54, 135.69, 150.1, 148.16, 139, 120.95, 123.36, 114.41, 114.44, 124.96], 'YTD': [34.86, 33.01, 37, 35.72, 44.16, 47.91, 43.91, 56.27, 95.34, 120.49, 92.63, 114.41, 86.35, 133.3, 157.32, 137.73, 183.51, 148.94, 190.36, 181.49, 185.67, 196.64, 170.81, 146.97, 139, 124.96], '6M': [34.04, 37.04, 34.89, 44.16, 47.91, 43.91, 56.27, 102.51, 110.62, 94.07, 95.76, 85.19, 117.64, 146.39, 150.57, 137.26, 180.57, 188.28, 171.33, 177.62, 202.37, 162.88, 170.81, 146.97, 139, 124.96], '1Y': [27.92, 28.99, 26.31, 23.06, 23.23, 23.02, 21.93, 25.07, 23.02, 27.72, 29.47, 26.69, 28.42, 32.22, 32.95, 29.98, 35.48, 31.51, 23.94, 20.87, 22.73, 25.65, 34.98, 27.14, 41, 39.6, 34.04, 37.04, 34.89, 44.16, 47.91, 43.91, 53.96, 102.51, 110.62, 94.07, 95.76, 85.19, 117.64, 146.39, 150.57, 137.26, 180.57, 188.28, 171.33, 177.62, 202.37, 162.88, 170.81, 146.97, 139, 124.96] },
      velocityScore: { '1D': -2.1, '1W': -26.6, '1M': -37.8, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.86, RKNG: false },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 1, avgWeight: 5.86, proScore: 1.95, coverage: 0.333,
      price: 268.83, weeklyPrices: [241.91, 265.55, 246.40, 258.69, 268.83], weeklyChange: 11.13, dayChange: 3.92, sortRank: 0, periodReturns: { '1M': 14.7, 'YTD': 86.8, '6M': 78.7, '1Y': 175.5 },
      priceHistory: { '1D': [258.69, 272.41, 268.47, 267, 265, 270.56, 270.62, 274.19, 276.6, 276.6, 276.77, 275.96, 274.42, 272.75, 273.73, 273.65, 275.29, 276.26, 275.37, 274.2, 272.45, 271.35, 268.17, 268.83], '1W': [241.91, 265.55, 246.4, 258.69, 268.83], '1M': [234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 265.55, 246.4, 258.69, 268.83], 'YTD': [143.89, 141.59, 149.12, 133.16, 119.96, 123.41, 124.8, 120.83, 97.3, 112.33, 101.72, 103.91, 95.92, 107.93, 158.93, 185.54, 184.38, 188.51, 172.17, 218.41, 226.1, 222.27, 239.18, 268.99, 259.09, 268.83], '6M': [150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 120.83, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.64, 229, 234.32, 239.18, 268.99, 259.09, 268.83], '1Y': [97.59, 101.19, 98.41, 116.01, 117.34, 121.13, 105.99, 120.1, 124.77, 163.96, 164.44, 149.38, 144.91, 148.87, 131.41, 137.2, 171.52, 173.16, 160.34, 141.88, 154.18, 189.19, 157.98, 134.13, 150.19, 143.22, 150.42, 150.97, 128.02, 119.96, 123.41, 124.8, 124.05, 114.22, 115.98, 116.88, 105.1, 87.81, 106.79, 159.52, 183.32, 165.92, 193.57, 198.57, 168.99, 221.64, 229, 234.32, 239.18, 268.99, 259.09, 268.83] },
      velocityScore: { '1D': 2.1, '1W': null, '1M': -22.3, '6M': null }, isNew: false,
      marketCap: '$50B', pe: 107.1, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.86, RKNG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 1, avgWeight: 5.24, proScore: 1.75, coverage: 0.333,
      price: 32.91, weeklyPrices: [33.06, 33.50, 30.71, 31.44, 32.91], weeklyChange: -0.44, dayChange: 4.69, sortRank: 0, periodReturns: { '1M': -21.5, 'YTD': 34.2, '6M': -12.6, '1Y': 246.1 },
      priceHistory: { '1D': [31.44, 32.2, 32.77, 32.32, 31.94, 32.22, 32.34, 32.44, 32.55, 32.76, 33.2, 33.4, 33.18, 33.05, 32.83, 32.69, 32.7, 32.81, 32.93, 32.8, 32.83, 32.72, 32.82, 32.91], '1W': [33.06, 33.5, 30.71, 31.44, 32.91], '1M': [41.91, 38.92, 41.47, 42.7, 46.47, 46.27, 45.57, 46.59, 45.2, 45.27, 41.98, 40.95, 39.16, 37.77, 37.3, 35.52, 33.06, 33.5, 30.71, 31.44, 32.91], 'YTD': [24.52, 31.94, 35.22, 37.69, 34.8, 38.26, 33.56, 30.66, 26.15, 27.4, 26.65, 28.37, 24.49, 25.57, 30.09, 36.35, 33.55, 41.25, 42.56, 45.87, 47.94, 40.94, 46.27, 41.98, 35.52, 32.91], '6M': [37.68, 37.4, 36.18, 34.8, 38.26, 33.56, 30.66, 27.93, 27.03, 27.71, 27.26, 20.55, 25.18, 31.47, 31.32, 32.11, 39.88, 43.93, 36.62, 45.14, 47.86, 41.91, 46.27, 41.98, 35.52, 32.91], '1Y': [9.51, 10.06, 10.93, 10.03, 14.79, 14.8, 15.72, 16.47, 14.38, 16.98, 19.83, 23.45, 25, 27.94, 37.76, 30.62, 34.42, 33.09, 26.41, 23.09, 23.74, 29.36, 30.99, 22, 25.72, 28.11, 37.68, 37.4, 36.18, 34.8, 38.26, 33.56, 30, 27.93, 27.03, 27.71, 27.26, 20.55, 25.18, 31.47, 31.32, 32.11, 39.88, 43.93, 36.62, 45.14, 47.86, 41.91, 46.27, 41.98, 35.52, 32.91] },
      velocityScore: { '1D': -1.1, '1W': -43.9, '1M': -52.2, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.24, RKNG: false },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'COHR', name: 'COHR', easyScore: 1, avgWeight: 5.21, proScore: 1.74, coverage: 0.333,
      price: 330.62, weeklyPrices: [333.36, 335.70, 314.13, 317.05, 330.62], weeklyChange: -0.82, dayChange: 4.28, sortRank: 0, periodReturns: { '1M': -7.1, 'YTD': 79.1, '6M': 85.7, '1Y': 262.3 },
      priceHistory: { '1D': [317.05, 337.4, 335.98, 335.29, 329.38, 330.16, 327.33, 329.73, 329.33, 329.86, 331.18, 331.14, 329.2, 331.86, 332.36, 330.64, 331.4, 332.83, 332.76, 332.82, 333.2, 332.1, 330.27, 330.62], '1W': [333.36, 335.7, 314.13, 317.05, 330.62], '1M': [355.94, 354.77, 363.58, 385.03, 413.84, 382.81, 378.85, 389.57, 425.48, 381.22, 392.5, 407.25, 380.56, 391.22, 394.47, 368.65, 333.36, 335.7, 314.13, 317.05, 330.62], 'YTD': [184.57, 173.15, 195.96, 196.94, 222.44, 242.46, 219.96, 254.86, 280.81, 260.64, 257.21, 272.04, 247.8, 284.17, 328, 337.68, 329.5, 335.26, 382.45, 377.57, 362.9, 401.93, 382.81, 392.5, 368.65, 330.62], '6M': [178.06, 191.04, 197.76, 222.44, 242.46, 219.96, 254.86, 298.91, 252.32, 247.37, 255.05, 219.65, 255.1, 313.42, 343.79, 303.97, 335.73, 374.01, 353.63, 381.35, 426.89, 355.94, 382.81, 392.5, 368.65, 330.62], '1Y': [91.25, 97.82, 98.43, 107.23, 107.15, 114.01, 86.55, 91.58, 88.47, 103.49, 103.41, 106.52, 114.65, 116.67, 110.41, 115.37, 138.06, 134.63, 156.67, 142.94, 148.85, 170.96, 197.45, 170.44, 191.37, 194.33, 178.06, 191.04, 197.76, 222.44, 242.46, 219.96, 248.89, 298.91, 252.32, 247.37, 255.05, 219.65, 255.1, 313.42, 343.79, 303.97, 335.73, 374.01, 353.63, 381.35, 426.89, 355.94, 382.81, 392.5, 368.65, 330.62] },
      velocityScore: { '1D': -0.6, '1W': 8.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$65B', pe: 158.2, revenueGrowth: 21, eps: 2.09, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.21, RKNG: false },
      tonyNote: 'COHR appears in 1 of 3 Meme ETFs (33% coverage) with average weight 5.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 1, avgWeight: 5.14, proScore: 1.71, coverage: 0.333,
      price: 45.52, weeklyPrices: [49.12, 48.87, 45.36, 45.08, 45.52], weeklyChange: -7.34, dayChange: 0.96, sortRank: 0, periodReturns: { '1M': -19.7, 'YTD': 1.4, '6M': -8, '1Y': -0.1 },
      priceHistory: { '1D': [45.08, 45.8, 45.7, 45.48, 44.83, 45.08, 45.08, 45.13, 45.29, 45.33, 45.39, 45.44, 45.17, 44.99, 45.08, 45.01, 45.31, 45.36, 45.26, 45.41, 45.26, 45.38, 45.44, 45.52], '1W': [49.12, 48.87, 45.36, 45.08, 45.52], '1M': [56.69, 56.63, 57.99, 57.85, 61.18, 56.06, 54.69, 56.55, 58.32, 57.85, 53.6, 50.56, 49.31, 53.88, 53.26, 51.4, 49.12, 48.87, 45.36, 45.08, 45.52], 'YTD': [44.87, 50.45, 47.56, 47.25, 38.56, 35.48, 33.18, 31.62, 37.05, 35.12, 32.38, 31.96, 27.79, 28.08, 44.68, 43.63, 46.2, 49.24, 51.95, 63.64, 69.28, 62.8, 56.06, 53.6, 51.4, 45.52], '6M': [49.45, 50.8, 43.37, 38.56, 35.48, 33.18, 31.62, 38.34, 35.87, 33.29, 33.11, 26.59, 28.49, 35.76, 46.28, 43.08, 48, 55.87, 48.44, 63.62, 71.4, 56.69, 56.06, 53.6, 51.4, 45.52], '1Y': [45.56, 43.54, 43.28, 39.88, 41.23, 41.21, 36.79, 40.75, 40.97, 43.86, 65.44, 73.86, 63.09, 74.3, 72.41, 55.45, 61.11, 55.41, 50.71, 47.88, 47.06, 48.65, 51.67, 45.85, 49.82, 46.77, 49.45, 50.8, 43.37, 38.56, 35.48, 33.18, 30.78, 38.34, 35.87, 33.29, 33.11, 26.59, 28.49, 35.76, 46.28, 43.08, 48, 55.87, 48.44, 63.62, 71.4, 56.69, 56.06, 53.6, 51.4, 45.52] },
      velocityScore: { '1D': -3.4, '1W': 11, '1M': -26.3, '6M': null }, isNew: false,
      marketCap: '$17B', pe: 116.7, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.14, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'TTMI', name: 'TTMI', easyScore: 1, avgWeight: 5, proScore: 1.67, coverage: 0.333,
      price: 152.61, weeklyPrices: [155.98, 149.39, 144.08, 145.29, 152.61], weeklyChange: -2.16, dayChange: 5.04, sortRank: 0, periodReturns: { '1M': -12.2, 'YTD': 121.2, '6M': 106.6, '1Y': 246.9 },
      priceHistory: { '1D': [145.29, 150.38, 153.54, 153.65, 152.84, 152.41, 151.87, 152.71, 153.1, 153.35, 153.39, 153.16, 152.64, 151.89, 152.29, 151.63, 152.85, 152.68, 152.57, 152.77, 153.49, 153.17, 152.42, 152.61], '1W': [155.98, 149.39, 144.08, 145.29, 152.61], '1M': [173.86, 172.12, 187.21, 194.05, 206.66, 199.58, 202.7, 216.44, 221.47, 213.17, 209.74, 210.57, 191.49, 186.8, 187.02, 179.7, 155.98, 149.39, 144.08, 145.29, 152.61], 'YTD': [69, 66.86, 100.9, 95.02, 102.76, 97.98, 90.91, 106.7, 104.05, 96.43, 95.31, 108, 97.08, 107.53, 116.93, 132.98, 158.99, 157.31, 167.35, 189.92, 172.44, 178.38, 199.58, 209.74, 179.7, 152.61], '6M': [73.88, 101.01, 94.63, 102.76, 97.98, 90.91, 106.7, 113, 96.8, 96.51, 101.42, 88.29, 99.29, 120.74, 125.25, 137.59, 159.58, 163.36, 161.41, 196.95, 179.62, 173.86, 199.58, 209.74, 179.7, 152.61], '1Y': [43.99, 45.81, 46.46, 48.73, 43.21, 44.96, 40.06, 44.87, 46.23, 49.43, 49.03, 54.15, 59.07, 58.53, 58.21, 55.69, 63.53, 70.06, 70.5, 64.27, 68.51, 66.76, 77.7, 61.58, 72.59, 70.61, 73.88, 101.01, 94.63, 102.76, 97.98, 90.91, 106.85, 113, 96.8, 96.51, 101.42, 88.29, 99.29, 120.74, 125.25, 137.59, 159.58, 163.36, 161.41, 196.95, 179.62, 173.86, 199.58, 209.74, 179.7, 152.61] },
      velocityScore: { '1D': 2.5, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$16B', pe: 82.5, revenueGrowth: 30, eps: 1.85, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5, RKNG: false },
      tonyNote: 'TTM Technologies is a printed circuit board manufacturer held in Industrials ETFs. Revenue growth tracks data center and defense electronics demand. PCB manufacturing is essential hardware infrastructure; TTM\'s position in AI server and high-frequency trading hardware gives it exposure to two durable growth verticals.',
    },
    {
      ticker: 'CBRS', name: 'CBRS', easyScore: 1, avgWeight: 4.62, proScore: 1.54, coverage: 0.333,
      price: 200.1, weeklyPrices: [204.86, 192.01, 176.61, 181.72, 200.10], weeklyChange: -2.32, dayChange: 10.11, sortRank: 0, periodReturns: { '1M': -11.8, 'YTD': -35.7, '6M': -35.7, '1Y': -35.7 },
      priceHistory: { '1D': [181.72, 187.37, 193.74, 193.32, 188.88, 191.28, 194.28, 195.35, 199.31, 200.21, 203, 203.27, 202.79, 199.47, 199.52, 198.77, 199.38, 200.07, 200.73, 200.79, 202, 201.38, 200.32, 200.1], '1W': [204.86, 192.01, 176.61, 181.72, 200.1], '1M': [226.82, 237.33, 226.55, 214, 218.03, 212.25, 213.67, 234.71, 224.43, 226.72, 182.26, 168.52, 181.59, 216.16, 221, 221.27, 204.86, 192.01, 176.61, 181.72, 200.1], 'YTD': [311.07, 279.72, 303.63, 290.69, 256.78, 241.71, 242.59, 236.99, 236.52, 214.94, 201.01, 237.83, 237.33, 226.55, 218.03, 212.25, 234.71, 224.43, 182.26, 168.52, 216.16, 221, 204.86, 192.01, 181.72, 200.1], '6M': [311.07, 279.72, 303.63, 290.69, 256.78, 241.71, 242.59, 236.99, 236.52, 214.94, 201.01, 237.83, 237.33, 226.55, 218.03, 212.25, 234.71, 224.43, 182.26, 168.52, 216.16, 221, 204.86, 192.01, 181.72, 200.1], '1Y': [311.07, 279.72, 296.65, 303.63, 290.69, 281.86, 256.78, 241.71, 266.9, 242.59, 236.99, 213.28, 236.52, 214.94, 215.4, 201.01, 237.83, 226.82, 237.33, 226.55, 214, 218.03, 212.25, 213.67, 234.71, 224.43, 226.72, 182.26, 168.52, 181.59, 216.16, 221, 221.27, 204.86, 192.01, 176.61, 181.72, 200.1] },
      velocityScore: { '1D': -0.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$45B', pe: 444.7, revenueGrowth: 94, eps: 0.45, grossMargin: 40, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.62, RKNG: false },
      tonyNote: 'CBRS appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'OPEN', name: 'OPEN', easyScore: 1, avgWeight: 4.09, proScore: 1.36, coverage: 0.333,
      price: 5.21, weeklyPrices: [4.90, 5.09, 4.79, 4.79, 5.21], weeklyChange: 6.43, dayChange: 8.87, sortRank: 0, periodReturns: { '1M': 20.2, 'YTD': -10.5, '6M': -28.5, '1Y': 607.6 },
      priceHistory: { '1D': [4.79, 4.98, 5.18, 5.24, 5.24, 5.34, 5.24, 5.29, 5.22, 5.2, 5.31, 5.26, 5.25, 5.27, 5.3, 5.29, 5.28, 5.32, 5.26, 5.29, 5.21, 5.23, 5.16, 5.21], '1W': [4.9, 5.09, 4.79, 4.79, 5.21], '1M': [4.34, 4.48, 4.47, 4.44, 4.61, 4.75, 4.45, 4.47, 4.28, 4.2, 4.28, 4.3, 4.37, 4.6, 4.62, 4.94, 4.9, 5.09, 4.79, 4.79, 5.21], 'YTD': [5.83, 6.43, 6.3, 6.01, 4.82, 4.94, 4.33, 5.11, 4.97, 5.01, 5.28, 5.1, 4.57, 4.31, 5.27, 5.22, 5.44, 5.01, 4.38, 4.53, 5.31, 4.31, 4.75, 4.28, 4.94, 5.21], '6M': [7.29, 6.67, 5.87, 4.82, 4.94, 4.33, 5.11, 5.05, 5.08, 5.18, 5.21, 4.43, 4.55, 4.51, 5.45, 5.48, 5.23, 4.71, 4.3, 4.48, 5.41, 4.34, 4.75, 4.28, 4.94, 5.21], '1Y': [0.74, 1.49, 2.29, 2.07, 1.9, 2.42, 3.22, 4.7, 5.13, 5.86, 10.21, 8.23, 8.06, 8.49, 7.38, 6.82, 7.65, 7.23, 9.37, 6.69, 7.74, 6.94, 7, 6.12, 6.28, 6.07, 7.29, 6.67, 5.87, 4.82, 4.94, 4.33, 4.78, 5.05, 5.08, 5.18, 5.21, 4.43, 4.55, 4.51, 5.45, 5.48, 5.23, 4.71, 4.3, 4.48, 5.41, 4.34, 4.75, 4.28, 4.94, 5.21] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$5B', pe: null, revenueGrowth: -38, eps: -1.76, grossMargin: 8, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.09 },
      tonyNote: 'OPEN appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
