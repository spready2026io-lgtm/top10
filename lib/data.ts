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
export const SPY_RET: Record<Period, number> = { '1W': -0.3, '1M': 0.6, 'YTD': 9, '6M': 7.8, '1Y': 19.8 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 6.7 }, { t: 'AMD', w: 5.1 }, { t: 'VRT', w: 3.8 }, { t: 'SIMO', w: 3.8 }, { t: 'MRVL', w: 3.7 }],
  ARTY: [{ t: 'AMD', w: 5.0 }, { t: 'MU', w: 4.7 }, { t: 'NVDA', w: 4.7 }, { t: 'AVGO', w: 4.5 }, { t: 'CRWV', w: 3.9 }],
  BAI: [{ t: 'MU', w: 6.2 }, { t: 'AMD', w: 5.1 }, { t: 'TSM', w: 4.7 }, { t: 'LRCX', w: 4.5 }, { t: 'AVGO', w: 4.4 }],
  IGPT: [{ t: 'META', w: 8.8 }, { t: 'AMD', w: 8.6 }, { t: 'GOOGL', w: 8.3 }, { t: 'NVDA', w: 7.8 }, { t: 'MU', w: 7.6 }],
  IVES: [{ t: 'AAPL', w: 5.2 }, { t: 'META', w: 5.0 }, { t: 'AMZN', w: 4.9 }, { t: 'TSM', w: 4.8 }, { t: 'GOOGL', w: 4.8 }],
  ALAI: [{ t: 'NVDA', w: 12.6 }, { t: 'TSM', w: 5.6 }, { t: 'AMZN', w: 5.2 }, { t: 'MSFT', w: 5.2 }, { t: 'GOOG', w: 5.0 }],
  CHAT: [{ t: 'NVDA', w: 7.2 }, { t: 'GOOGL', w: 5.8 }, { t: 'AVGO', w: 4.6 }, { t: 'AMD', w: 3.9 }, { t: 'MU', w: 3.6 }],
  AIFD: [{ t: 'MU', w: 6.5 }, { t: 'NVDA', w: 6.3 }, { t: 'PANW', w: 6.2 }, { t: 'MRVL', w: 5.5 }, { t: 'AVGO', w: 5.2 }],
  SPRX: [{ t: 'ALAB', w: 10.6 }, { t: 'COHR', w: 8.1 }, { t: 'KLAC', w: 7.8 }, { t: 'NET', w: 7.6 }, { t: 'ARM', w: 7.4 }],
  AOTG: [{ t: 'AMD', w: 15.9 }, { t: 'NVDA', w: 10.0 }, { t: 'MU', w: 9.9 }, { t: 'TSM', w: 7.3 }, { t: 'TOST', w: 5.3 }],
  SOXX: [{ t: 'AMD', w: 8.3 }, { t: 'MU', w: 8.1 }, { t: 'NVDA', w: 7.8 }, { t: 'AVGO', w: 6.9 }, { t: 'INTC', w: 5.8 }],
  PSI: [{ t: 'AMAT', w: 6.7 }, { t: 'KLAC', w: 5.9 }, { t: 'MU', w: 5.7 }, { t: 'AMD', w: 5.6 }, { t: 'LRCX', w: 5.5 }],
  XSD: [{ t: 'MXL', w: 2.9 }, { t: 'ALAB', w: 2.8 }, { t: 'ALGM', w: 2.8 }, { t: 'AMBA', w: 2.8 }, { t: 'AMD', w: 2.8 }],
  DRAM: [{ t: 'SNDK', w: 4.4 }, { t: 'STX', w: 4.3 }, { t: 'WDC', w: 4.3 }, { t: 'MU', w: 3.0 }, { t: 'JPY', w: 0.7 }],
  PTF: [{ t: 'SNDK', w: 5.0 }, { t: 'MU', w: 5.0 }, { t: 'WDC', w: 4.3 }, { t: 'KLAC', w: 4.1 }, { t: 'AXTI', w: 4.0 }],
  WCLD: [{ t: 'FROG', w: 3.2 }, { t: 'PANW', w: 3.0 }, { t: 'DDOG', w: 2.9 }, { t: 'DOCN', w: 2.6 }, { t: 'CRWD', w: 2.5 }],
  IGV: [{ t: 'PANW', w: 9.9 }, { t: 'PLTR', w: 8.5 }, { t: 'MSFT', w: 8.1 }, { t: 'CRWD', w: 7.2 }, { t: 'ORCL', w: 5.8 }],
  FDTX: [{ t: 'MRVL', w: 9.7 }, { t: 'MU', w: 9.3 }, { t: 'TSM', w: 6.4 }, { t: 'WDC', w: 4.5 }, { t: 'PANW', w: 4.2 }],
  GTEK: [{ t: 'MRVL', w: 4.0 }, { t: 'CDNS', w: 2.4 }, { t: 'AXON', w: 2.3 }, { t: 'NET', w: 2.1 }, { t: 'DELL', w: 2.1 }],
  ARKK: [{ t: 'TSLA', w: 10.1 }, { t: 'TEM', w: 5.8 }, { t: 'CRSP', w: 5.4 }, { t: 'HOOD', w: 5.0 }, { t: 'SHOP', w: 4.4 }],
  MARS: [{ t: 'SPCX', w: 22.1 }, { t: 'RKLB', w: 9.3 }, { t: 'ASTS', w: 7.4 }, { t: 'VSAT', w: 5.2 }, { t: 'PL', w: 4.9 }],
  FRWD: [{ t: 'NVDA', w: 8.2 }, { t: 'AMD', w: 7.7 }, { t: 'STX', w: 7.2 }, { t: 'TSM', w: 6.2 }, { t: 'LRCX', w: 5.6 }],
  BCTK: [{ t: 'TSM', w: 8.8 }, { t: 'SPCX', w: 8.4 }, { t: 'LRCX', w: 7.4 }, { t: 'AVGO', w: 6.6 }, { t: 'GOOG', w: 6.5 }],
  FWD: [{ t: 'AMD', w: 2.3 }, { t: 'AMAT', w: 2.0 }, { t: 'AVGO', w: 1.9 }, { t: 'LRCX', w: 1.9 }, { t: 'SPCX', w: 1.8 }],
  CBSE: [{ t: 'TENB', w: 3.7 }, { t: 'IBRX', w: 3.5 }, { t: 'KRYS', w: 3.2 }, { t: 'SCI', w: 3.1 }, { t: 'SBUX', w: 3.0 }],
  FCUS: [{ t: 'INTC', w: 5.3 }, { t: 'SNDK', w: 5.2 }, { t: 'DELL', w: 4.8 }, { t: 'WDC', w: 4.7 }, { t: 'BE', w: 4.7 }],
  WGMI: [{ t: 'CIFR', w: 17.6 }, { t: 'HUT', w: 10.8 }, { t: 'KEEL', w: 10.2 }, { t: 'IREN', w: 10.2 }, { t: 'MARA', w: 5.1 }],
  CNEQ: [{ t: 'NVDA', w: 13.4 }, { t: 'MSFT', w: 6.3 }, { t: 'GOOG', w: 6.0 }, { t: 'TSM', w: 5.8 }, { t: 'AAPL', w: 4.9 }],
  SGRT: [{ t: 'VRT', w: 12.3 }, { t: 'WDC', w: 10.7 }, { t: 'MU', w: 7.0 }, { t: 'ARW', w: 5.8 }, { t: 'WELL', w: 5.6 }],
  SPMO: [{ t: 'MU', w: 10.7 }, { t: 'NVDA', w: 7.8 }, { t: 'AVGO', w: 6.1 }, { t: 'GOOGL', w: 4.5 }, { t: 'JNJ', w: 4.5 }],
  XMMO: [{ t: 'CW', w: 4.4 }, { t: 'ATI', w: 3.3 }, { t: 'FTI', w: 3.2 }, { t: 'WWD', w: 3.0 }, { t: 'STRL', w: 3.0 }],
  POW: [{ t: 'PWR', w: 5.0 }, { t: 'PRY', w: 4.3 }, { t: 'POWL', w: 4.2 }, { t: 'ETN', w: 4.2 }, { t: 'NVT', w: 3.8 }],
  VOLT: [{ t: 'BELFB', w: 6.9 }, { t: 'POWL', w: 6.2 }, { t: 'ETN', w: 5.4 }, { t: 'NEE', w: 5.3 }, { t: 'PWR', w: 5.2 }],
  PBD: [{ t: 'RIVN', w: 1.2 }, { t: 'BLBD', w: 1.1 }, { t: 'SHLS', w: 1.1 }],
  PBW: [{ t: 'OPAL', w: 1.9 }, { t: 'DAR', w: 1.8 }, { t: 'BETA', w: 1.8 }, { t: 'IONR', w: 1.8 }, { t: 'RIVN', w: 1.8 }],
  IVEP: [{ t: 'BE', w: 5.1 }, { t: 'GEV', w: 4.5 }, { t: 'PWR', w: 4.2 }, { t: 'VRT', w: 4.1 }, { t: 'SBGSY', w: 4.1 }],
  AIRR: [{ t: 'STRL', w: 5.2 }, { t: 'CHRW', w: 4.5 }, { t: 'AGX', w: 4.3 }, { t: 'FIX', w: 4.1 }, { t: 'MTZ', w: 3.9 }],
  PRN: [{ t: 'FIX', w: 4.5 }, { t: 'HWM', w: 4.3 }, { t: 'PWR', w: 4.2 }, { t: 'STRL', w: 4.0 }, { t: 'JBL', w: 3.5 }],
  RSHO: [{ t: 'TKR', w: 8.7 }, { t: 'POWL', w: 7.3 }, { t: 'CGNX', w: 7.2 }, { t: 'CAT', w: 6.9 }, { t: 'AIT', w: 6.0 }],
  IDEF: [{ t: 'RTX', w: 8.6 }, { t: 'LMT', w: 7.0 }, { t: 'BA', w: 5.2 }, { t: 'GD', w: 4.5 }, { t: 'NOC', w: 3.5 }],
  BILT: [{ t: 'UNP', w: 6.0 }, { t: 'AENA', w: 4.5 }, { t: 'AEP', w: 4.2 }, { t: 'TRP', w: 3.9 }, { t: 'TCL', w: 3.6 }],
  BUZZ: [{ t: 'IBRX', w: 4.0 }, { t: 'SOFI', w: 3.3 }, { t: 'AMD', w: 3.2 }, { t: 'NOW', w: 3.1 }, { t: 'GME', w: 3.1 }],
  MEME: [{ t: 'BE', w: 7.7 }, { t: 'AAOI', w: 7.0 }, { t: 'IREN', w: 6.6 }, { t: 'NBIS', w: 6.2 }, { t: 'SNDK', w: 6.0 }],
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
  POW: { name: "VistaShares Electrification Supercycle ETF", manager: "VistaShares Advisors LLC", aum: 68422496 },
  VOLT: { name: "Tema Electrification ETF", manager: "Tema Global Limited", aum: 809755840 },
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
  'AI & ML':         { '1W': -5, '1M': -2.7, 'YTD': 40.3, '6M': 37, '1Y': 71 },
  'Semiconductors':  { '1W': -9.9, '1M': -3.7, 'YTD': 89.7, '6M': 80.4, '1Y': 123.2 },
  'Broad Tech':      { '1W': -4.8, '1M': -3, 'YTD': 23, '6M': 19.3, '1Y': 37.7 },
  'Electrification': { '1W': -6.1, '1M': -6.6, 'YTD': 20.8, '6M': 17.2, '1Y': 38.4 },
  'Industrials':     { '1W': -2, '1M': -0.7, 'YTD': 22, '6M': 16.8, '1Y': 35 },
  'Meme':            { '1W': -10.5, '1M': -12.8, 'YTD': 10.6, '6M': 1.9, '1Y': -2.8 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, IndexChartByPeriod> = {
  'AI & ML': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 0.5, spyReturn: -0.57, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 95.77, 98.33, 94.73, 94.95], spy: [100, 99.87, 100.74, 100.26, 99.68], top10Return: -5, spyReturn: -0.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.02, 94.94, 100.06, 100.75, 106.03, 102.89, 103.42, 107.88, 108.74, 102.31, 101.41, 103.31, 100.61, 103.62, 106.68, 102.52, 98.17, 100.8, 97.11, 97.33], spy: [100, 99.71, 98.13, 99.8, 100.34, 102.11, 101.5, 100.24, 101.02, 100.7, 99.24, 99.19, 99.33, 98.62, 100.24, 101.02, 100.88, 100.75, 101.63, 101.15, 100.56], top10Return: -2.7, spyReturn: 0.6, xLabels: ["Jun 10", "Jun 17", "Jun 24", "Jul 1", "Jul 8"] },
    'YTD': { top10: [100, 102.26, 104.35, 105.09, 104.21, 104.71, 102.24, 104.01, 99.72, 102.27, 103.44, 100.88, 97.05, 106.63, 115.79, 119.47, 122.96, 130.64, 139.5, 138.81, 149.56, 144.36, 153.46, 148.29, 154.66, 140.33], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.76, 100.14, 100.8, 99.77, 99.3, 98.37, 95.79, 95.37, 99.71, 102.89, 103.89, 105.39, 107.28, 109.72, 108.92, 110.93, 108.4, 110.69, 107.58, 109.51, 109.01], top10Return: 40.3, spyReturn: 9, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 102.03, 102.74, 101.87, 99.8, 100.25, 99.67, 100.79, 96.62, 97.69, 97.16, 92.86, 98.19, 108.17, 115.27, 119.87, 122.78, 135.03, 129.06, 136.87, 150.32, 140.95, 149.8, 144.73, 150.95, 137], spy: [100, 100.4, 99.96, 100.36, 100.16, 98.87, 98.97, 99.49, 97.52, 96.05, 94.06, 91.96, 95.56, 99.51, 102.79, 103.72, 104.13, 107.22, 107.13, 108.14, 110.01, 107.21, 109.47, 106.39, 108.3, 107.81], top10Return: 37, spyReturn: 7.8, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 101.43, 102.28, 105.58, 105.06, 109.23, 105.3, 106.2, 106.39, 111.91, 116.77, 119.45, 119.01, 122.62, 121.35, 123.41, 129.85, 126.05, 125.17, 116.68, 117.88, 121.97, 125.41, 118.69, 123.08, 121.14, 123.93, 126.54, 127.47, 126.43, 123.98, 124.58, 126.48, 125.3, 119.98, 121.41, 120.75, 115.4, 122.03, 134.6, 143.41, 149.22, 152.87, 168.4, 160.86, 170.82, 187.57, 175.95, 187.17, 180.93, 188.77, 170.97], spy: [100, 100.29, 101.37, 102.41, 101.23, 103.6, 103.14, 103.57, 103.21, 104.83, 106.39, 106.91, 107.39, 107.86, 106.75, 108.21, 110.76, 108.85, 110.1, 106.41, 107.8, 109.86, 110.11, 109.44, 110.9, 109.93, 111.15, 111.59, 111.11, 111.55, 111.33, 109.9, 111.14, 110.58, 108.39, 106.76, 104.55, 102.22, 106.22, 110.6, 114.25, 115.29, 115.74, 119.18, 119.07, 120.2, 122.28, 119.16, 121.68, 118.25, 120.38, 119.83], top10Return: 71, spyReturn: 19.8, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Semiconductors': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 0.4, spyReturn: -0.57, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 92.59, 95.66, 89.7, 90.06], spy: [100, 99.87, 100.74, 100.26, 99.68], top10Return: -9.9, spyReturn: -0.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.43, 95.13, 104.34, 105.85, 112.13, 106.31, 107.45, 115.55, 119.41, 108.23, 107.6, 113.23, 107.04, 110.61, 115.47, 107.01, 99.02, 102.29, 95.91, 96.29], spy: [100, 99.71, 98.13, 99.8, 100.34, 102.11, 101.5, 100.24, 101.02, 100.7, 99.24, 99.19, 99.33, 98.62, 100.24, 101.02, 100.88, 100.75, 101.63, 101.15, 100.56], top10Return: -3.7, spyReturn: 0.6, xLabels: ["Jun 10", "Jun 17", "Jun 24", "Jul 1", "Jul 8"] },
    'YTD': { top10: [100, 109.74, 113.64, 116.38, 117.24, 122.54, 123.94, 124.94, 122.59, 127.59, 134.04, 134.5, 126.97, 143.22, 156.46, 168.85, 181.41, 177.22, 188.07, 194.71, 207.15, 204.49, 226.22, 217.56, 215.82, 189.66], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.76, 100.14, 100.8, 99.77, 99.3, 98.37, 95.79, 95.37, 99.71, 102.89, 103.89, 105.39, 107.28, 109.72, 108.92, 110.93, 108.4, 110.69, 107.58, 109.51, 109.01], top10Return: 89.7, spyReturn: 9, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 107.9, 108.7, 110.4, 113.97, 116.95, 117.41, 116.31, 112.9, 120.35, 126.6, 124.06, 124.8, 140.16, 153.37, 164.34, 174.33, 179.19, 170.8, 189.22, 196.14, 194.77, 215.45, 207.18, 204.7, 180.39], spy: [100, 100.4, 99.96, 100.36, 100.16, 98.87, 98.97, 99.49, 97.52, 96.05, 94.06, 91.96, 95.56, 99.51, 102.79, 103.72, 104.13, 107.22, 107.13, 108.14, 110.01, 107.21, 109.47, 106.39, 108.3, 107.81], top10Return: 80.4, spyReturn: 7.8, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 101.47, 104.42, 104.93, 103.17, 108.02, 106.92, 109.34, 108.96, 111.57, 116.94, 119.96, 120.2, 123.04, 124.26, 128.36, 132.4, 133.88, 136.35, 127.39, 135.72, 139.86, 147.09, 141.32, 139.9, 138.31, 146.75, 154.25, 160.92, 160.96, 166.09, 172.94, 174.43, 172.5, 159.18, 157.01, 157.13, 153.05, 166.4, 186.31, 193.9, 206.97, 222.17, 235.12, 222.58, 244.21, 243, 243.76, 255.19, 243.11, 255.87, 223.2], spy: [100, 100.29, 101.37, 102.41, 101.23, 103.6, 103.14, 103.57, 103.21, 104.83, 106.39, 106.91, 107.39, 107.86, 106.75, 108.21, 110.76, 108.85, 110.1, 106.41, 107.8, 109.86, 110.11, 109.44, 110.9, 109.93, 111.15, 111.59, 111.11, 111.55, 111.33, 109.9, 111.14, 110.58, 108.39, 106.76, 104.55, 102.22, 106.22, 110.6, 114.25, 115.29, 115.74, 119.18, 119.07, 120.2, 122.28, 119.16, 121.68, 118.25, 120.38, 119.83], top10Return: 123.2, spyReturn: 19.8, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Broad Tech': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 0.2, spyReturn: -0.57, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 96.48, 97.91, 95.05, 95.22], spy: [100, 99.87, 100.74, 100.26, 99.68], top10Return: -4.8, spyReturn: -0.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.2, 95.84, 100.12, 100.58, 104.17, 102.45, 102.08, 104.45, 104.18, 100.68, 99.6, 100.3, 99.64, 101.78, 103.86, 101.79, 98.25, 99.67, 96.84, 96.98], spy: [100, 99.71, 98.13, 99.8, 100.34, 102.11, 101.5, 100.24, 101.02, 100.7, 99.24, 99.19, 99.33, 98.62, 100.24, 101.02, 100.88, 100.75, 101.63, 101.15, 100.56], top10Return: -3, spyReturn: 0.6, xLabels: ["Jun 10", "Jun 17", "Jun 24", "Jul 1", "Jul 8"] },
    'YTD': { top10: [100, 103.16, 105.26, 104.89, 102.56, 102.21, 101.84, 103.32, 101.83, 102.58, 102.72, 100.16, 97.95, 104.83, 111.98, 115.1, 116.55, 124.49, 126.73, 124.91, 132.29, 127.61, 132.58, 129.58, 132.75, 123.05], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.76, 100.14, 100.8, 99.77, 99.3, 98.37, 95.79, 95.37, 99.71, 102.89, 103.89, 105.39, 107.28, 109.72, 108.92, 110.93, 108.4, 110.69, 107.58, 109.51, 109.01], top10Return: 23, spyReturn: 9, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 101.58, 102.04, 99.31, 97.86, 97.78, 98.62, 100.3, 97.23, 97.59, 96.66, 92.95, 97.43, 104.06, 110.7, 112.81, 115.55, 124.03, 118.4, 121.84, 130.32, 123.56, 128.31, 125.32, 128.58, 119.34], spy: [100, 100.4, 99.96, 100.36, 100.16, 98.87, 98.97, 99.49, 97.52, 96.05, 94.06, 91.96, 95.56, 99.51, 102.79, 103.72, 104.13, 107.22, 107.13, 108.14, 110.01, 107.21, 109.47, 106.39, 108.3, 107.81], top10Return: 19.3, spyReturn: 7.8, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 100.36, 102.27, 102.78, 102.46, 104.18, 102.43, 103.73, 104.6, 107.49, 110.42, 114.09, 114.65, 117.07, 119.5, 117.14, 121.06, 118.49, 117.88, 110.28, 111.93, 113.45, 116.33, 111.88, 114.87, 112.58, 116.14, 119.08, 120.12, 118.17, 116.84, 117.67, 118.78, 119.74, 116.66, 117.04, 115.88, 113.07, 117.63, 123.57, 128.8, 132.46, 135.22, 141.17, 136.39, 141.89, 149.48, 142.95, 149.27, 147.44, 147.95, 137.73], spy: [100, 100.29, 101.37, 102.41, 101.23, 103.6, 103.14, 103.57, 103.21, 104.83, 106.39, 106.91, 107.39, 107.86, 106.75, 108.21, 110.76, 108.85, 110.1, 106.41, 107.8, 109.86, 110.11, 109.44, 110.9, 109.93, 111.15, 111.59, 111.11, 111.55, 111.33, 109.9, 111.14, 110.58, 108.39, 106.76, 104.55, 102.22, 106.22, 110.6, 114.25, 115.29, 115.74, 119.18, 119.07, 120.2, 122.28, 119.16, 121.68, 118.25, 120.38, 119.83], top10Return: 37.7, spyReturn: 19.8, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Electrification': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -0.3, spyReturn: -0.57, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 96.98, 98.04, 94.88, 93.94], spy: [100, 99.87, 100.74, 100.26, 99.68], top10Return: -6.1, spyReturn: -0.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.81, 95.62, 99.53, 100.47, 102.74, 101.69, 101.65, 103.97, 105.09, 100.45, 99.73, 100.17, 98.19, 99.35, 101.32, 99.36, 96.35, 97.36, 94.29, 93.36], spy: [100, 99.71, 98.13, 99.8, 100.34, 102.11, 101.5, 100.24, 101.02, 100.7, 99.24, 99.19, 99.33, 98.62, 100.24, 101.02, 100.88, 100.75, 101.63, 101.15, 100.56], top10Return: -6.6, spyReturn: 0.6, xLabels: ["Jun 10", "Jun 17", "Jun 24", "Jul 1", "Jul 8"] },
    'YTD': { top10: [100, 103.61, 108.25, 111.14, 110.46, 115.21, 115.01, 118.56, 113.6, 112.95, 115.06, 114.08, 112.07, 119.26, 122.86, 127.41, 132.78, 134.04, 135.27, 133.07, 137.48, 131.27, 133.61, 129.84, 130.86, 120.83], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.76, 100.14, 100.8, 99.77, 99.3, 98.37, 95.79, 95.37, 99.71, 102.89, 103.89, 105.39, 107.28, 109.72, 108.92, 110.93, 108.4, 110.69, 107.58, 109.51, 109.01], top10Return: 20.8, spyReturn: 9, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 104.55, 107.26, 107.04, 109.75, 112.03, 112.22, 113.47, 107.58, 108.81, 108.24, 108.21, 109.92, 117.72, 121.37, 124.81, 129.11, 134.18, 124.69, 130.55, 132.96, 127.21, 129.49, 125.89, 126.88, 117.22], spy: [100, 100.4, 99.96, 100.36, 100.16, 98.87, 98.97, 99.49, 97.52, 96.05, 94.06, 91.96, 95.56, 99.51, 102.79, 103.72, 104.13, 107.22, 107.13, 108.14, 110.01, 107.21, 109.47, 106.39, 108.3, 107.81], top10Return: 17.2, spyReturn: 7.8, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 101.75, 105.61, 104.82, 103.94, 105.11, 105.91, 107.47, 106.52, 107.63, 109.94, 112.35, 113.14, 118.6, 122.92, 121.42, 123.07, 121.25, 124.01, 119.38, 118.34, 121.88, 124.24, 121.33, 123.91, 122.16, 123.87, 128.7, 131.62, 128.77, 132.25, 131.42, 133.07, 134.04, 128.76, 131.34, 131.09, 131.78, 136.38, 143.72, 147.52, 147.36, 152.02, 158.71, 150.99, 154.8, 156.91, 151.11, 152.22, 147.27, 148.35, 138.36], spy: [100, 100.29, 101.37, 102.41, 101.23, 103.6, 103.14, 103.57, 103.21, 104.83, 106.39, 106.91, 107.39, 107.86, 106.75, 108.21, 110.76, 108.85, 110.1, 106.41, 107.8, 109.86, 110.11, 109.44, 110.9, 109.93, 111.15, 111.59, 111.11, 111.55, 111.33, 109.9, 111.14, 110.58, 108.39, 106.76, 104.55, 102.22, 106.22, 110.6, 114.25, 115.29, 115.74, 119.18, 119.07, 120.2, 122.28, 119.16, 121.68, 118.25, 120.38, 119.83], top10Return: 38.4, spyReturn: 19.8, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Industrials': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -0.6, spyReturn: -0.57, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 98.95, 100.54, 97.84, 97.95], spy: [100, 99.87, 100.74, 100.26, 99.68], top10Return: -2, spyReturn: -0.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100.02, 98.28, 100.78, 101.22, 101.21, 100.39, 101.09, 101.57, 102.6, 101.19, 101.47, 102.31, 100.74, 102.05, 103.63, 101.47, 100.36, 101.96, 99.19, 99.3], spy: [100, 99.71, 98.13, 99.8, 100.34, 102.11, 101.5, 100.24, 101.02, 100.7, 99.24, 99.19, 99.33, 98.62, 100.24, 101.02, 100.88, 100.75, 101.63, 101.15, 100.56], top10Return: -0.7, spyReturn: 0.6, xLabels: ["Jun 10", "Jun 17", "Jun 24", "Jul 1", "Jul 8"] },
    'YTD': { top10: [100, 105.14, 110.48, 110.36, 109.83, 116.32, 117.94, 119.46, 118.03, 113.99, 113.08, 111.99, 109.63, 117.29, 119.41, 120.36, 121.36, 123.07, 124.95, 120.23, 125.36, 123.19, 124.42, 124.64, 127.89, 121.98], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.76, 100.14, 100.8, 99.77, 99.3, 98.37, 95.79, 95.37, 99.71, 102.89, 103.89, 105.39, 107.28, 109.72, 108.92, 110.93, 108.4, 110.69, 107.58, 109.51, 109.01], top10Return: 22, spyReturn: 9, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 104.92, 105.56, 104.99, 108.37, 111.74, 113.6, 113.88, 109.29, 106.88, 105.75, 105.34, 108.27, 113.03, 115.84, 115.38, 116.1, 118.85, 116.04, 115.73, 118.62, 117.99, 119.12, 119.36, 122.47, 116.84], spy: [100, 100.4, 99.96, 100.36, 100.16, 98.87, 98.97, 99.49, 97.52, 96.05, 94.06, 91.96, 95.56, 99.51, 102.79, 103.72, 104.13, 107.22, 107.13, 108.14, 110.01, 107.21, 109.47, 106.39, 108.3, 107.81], top10Return: 16.8, spyReturn: 7.8, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 100.89, 101.76, 103.69, 103.9, 104.65, 103.11, 104.6, 104.44, 104.73, 107.62, 109.26, 110.12, 111.7, 110.7, 111.09, 113.39, 111.33, 110.74, 106.16, 106.67, 108.05, 109.85, 110.7, 113.05, 110.76, 116.53, 122.43, 123.03, 121.82, 127.86, 130.27, 133.06, 130.78, 125.29, 121.84, 121.62, 122.56, 125.92, 132.35, 133.13, 133.7, 133.76, 138.86, 134.45, 134.74, 136.78, 136.42, 136.77, 138.26, 141.78, 135.02], spy: [100, 100.29, 101.37, 102.41, 101.23, 103.6, 103.14, 103.57, 103.21, 104.83, 106.39, 106.91, 107.39, 107.86, 106.75, 108.21, 110.76, 108.85, 110.1, 106.41, 107.8, 109.86, 110.11, 109.44, 110.9, 109.93, 111.15, 111.59, 111.11, 111.55, 111.33, 109.9, 111.14, 110.58, 108.39, 106.76, 104.55, 102.22, 106.22, 110.6, 114.25, 115.29, 115.74, 119.18, 119.07, 120.2, 122.28, 119.16, 121.68, 118.25, 120.38, 119.83], top10Return: 35, spyReturn: 19.8, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Meme': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 0, spyReturn: -0.57, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 95.36, 94.14, 91.69, 89.46], spy: [100, 99.87, 100.74, 100.26, 99.68], top10Return: -10.5, spyReturn: -0.3, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 96.44, 93.79, 99.87, 98.57, 104.08, 99.99, 100.62, 104.2, 104.07, 99.23, 97.04, 95.09, 94.42, 96.21, 98.58, 97.51, 93.05, 91.66, 89.49, 87.19], spy: [100, 99.71, 98.13, 99.8, 100.34, 102.11, 101.5, 100.24, 101.02, 100.7, 99.24, 99.19, 99.33, 98.62, 100.24, 101.02, 100.88, 100.75, 101.63, 101.15, 100.56], top10Return: -12.8, spyReturn: 0.6, xLabels: ["Jun 10", "Jun 17", "Jun 24", "Jul 1", "Jul 8"] },
    'YTD': { top10: [100, 106.79, 105.55, 105.8, 99.62, 99.94, 92.18, 94.54, 93.09, 93.13, 93.47, 92.67, 90.16, 100.37, 113.76, 112.18, 115.44, 121.59, 126.33, 132.96, 142.64, 127.35, 133.52, 126.94, 126.06, 110.59], spy: [100, 101.11, 101.51, 101.07, 101.47, 101.76, 100.14, 100.8, 99.77, 99.3, 98.37, 95.79, 95.37, 99.71, 102.89, 103.89, 105.39, 107.28, 109.72, 108.92, 110.93, 108.4, 110.69, 107.58, 109.51, 109.01], top10Return: 10.6, spyReturn: 9, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 100.93, 97.22, 92.17, 88.97, 87.62, 85.31, 85.5, 84.23, 85.71, 82.78, 80.45, 85.04, 97.06, 106.3, 102.83, 109.49, 118.31, 109.33, 124.01, 130.08, 116.63, 122.48, 116.57, 115.78, 101.87], spy: [100, 100.4, 99.96, 100.36, 100.16, 98.87, 98.97, 99.49, 97.52, 96.05, 94.06, 91.96, 95.56, 99.51, 102.79, 103.72, 104.13, 107.22, 107.13, 108.14, 110.01, 107.21, 109.47, 106.39, 108.3, 107.81], top10Return: 1.9, spyReturn: 7.8, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 103.5, 100.95, 94.74, 91.84, 91.74, 88.66, 84.06, 83.97, 84.31, 87.18, 91.1, 88.41, 87.8, 90.19, 88.79, 88.4, 89.75, 90.63, 88.71, 85.9, 85.68, 88.57, 85.81, 86.33, 87.46, 91.43, 92.55, 90.9, 89.88, 88.33, 89.43, 88.78, 87.89, 93.48, 97.46, 95.43, 92.36, 95.39, 102.3, 108.17, 111.07, 103.45, 113.84, 113.89, 116.34, 115.16, 113.54, 113.19, 107, 104.03, 97.18], spy: [100, 100.29, 101.37, 102.41, 101.23, 103.6, 103.14, 103.57, 103.21, 104.83, 106.39, 106.91, 107.39, 107.86, 106.75, 108.21, 110.76, 108.85, 110.1, 106.41, 107.8, 109.86, 110.11, 109.44, 110.9, 109.93, 111.15, 111.59, 111.11, 111.55, 111.33, 109.9, 111.14, 110.58, 108.39, 106.76, 104.55, 102.22, 106.22, 110.6, 114.25, 115.29, 115.74, 119.18, 119.07, 120.2, 122.28, 119.16, 121.68, 118.25, 120.38, 119.83], top10Return: -2.8, spyReturn: 19.8, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
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
export const SCAN_TIMESTAMP    = '2026-07-08T13:37:12.772Z';
export const SCAN_TIMESTAMP_NY = 'July 8, 2026 at 9:37 AM ET';
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
export const HOLDINGS_COUNT = 1283;
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
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.66, bestProScore: 5.06, avgProScore: 4.22, price: 943.10, weeklyChange: -8.64 },
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.33, bestProScore: 6.00, avgProScore: 4.11, price: 197.13, weeklyChange: -0.23 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 10.93, bestProScore: 5.02, avgProScore: 3.64, price: 517.13, weeklyChange: -4.39 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 6.74, bestProScore: 2.91, avgProScore: 2.25, price: 380.86, weeklyChange: 3.12 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.77, bestProScore: 2.93, avgProScore: 2.39, price: 436.29, weeklyChange: -1.79 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.47, bestProScore: 3.31, avgProScore: 2.23, price: 109.17, weeklyChange: -14.05 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 3.99, bestProScore: 2.08, avgProScore: 2.00, price: 236.84, weeklyChange: -10.58 },
  { ticker: 'MRVL', name: `MARVELL TECHNOLOGY INC`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 3.97, bestProScore: 2.23, avgProScore: 1.98, price: 233.75, weeklyChange: -14.08 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.73, bestProScore: 2.45, avgProScore: 1.87, price: 332.29, weeklyChange: -15.07 },
  { ticker: 'AMZN', name: `AMAZON.COM INC`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 3.15, bestProScore: 2.04, avgProScore: 1.58, price: 241.86, weeklyChange: 0.07 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': -8, '1M': -1.2, 'YTD': 93.6, '6M': 83.8, '1Y': 160.6 },
  ARTY: { '1W': -4, '1M': -5, 'YTD': 45.7, '6M': 41.8, '1Y': 70.3 },
  BAI:  { '1W': -7.2, '1M': -4, 'YTD': 38, '6M': 36.6, '1Y': 59.1 },
  IGPT: { '1W': -5.6, '1M': -0.6, 'YTD': 59, '6M': 53.1, '1Y': 93 },
  IVES: { '1W': -1.3, '1M': -0.8, 'YTD': 18.4, '6M': 15.9, '1Y': 38.1 },
  ALAI: { '1W': -2.1, '1M': 1.2, 'YTD': 22.1, '6M': 20.6, '1Y': 44.9 },
  CHAT: { '1W': -5.3, '1M': -5.4, 'YTD': 50.2, '6M': 46.8, '1Y': 83.6 },
  AIFD: { '1W': -4.6, '1M': -3.4, 'YTD': 36.4, '6M': 35.5, '1Y': 67.3 },
  SPRX: { '1W': -9.5, '1M': -8.3, 'YTD': 28.2, '6M': 25.2, '1Y': 66.1 },
  AOTG: { '1W': -2.9, '1M': 0.8, 'YTD': 11.8, '6M': 10.8, '1Y': 26.5 },
  // Semiconductors
  SOXX: { '1W': -7.3, '1M': -2.7, 'YTD': 84.6, '6M': 74, '1Y': 128.5 },
  PSI:  { '1W': -14.3, '1M': -2, 'YTD': 89.6, '6M': 73.7, '1Y': 143 },
  XSD:  { '1W': -9.6, '1M': -9.7, 'YTD': 67.5, '6M': 56.9, '1Y': 104.4 },
  DRAM: { '1W': -8.5, '1M': -0.5, 'YTD': 117, '6M': 117, '1Y': 117 },
  // Broad Tech
  PTF:  { '1W': -12.5, '1M': -10.9, 'YTD': 45, '6M': 39.6, '1Y': 63.5 },
  WCLD: { '1W': 2.4, '1M': 6.7, 'YTD': -3, '6M': -2.6, '1Y': -7.2 },
  IGV:  { '1W': -0.7, '1M': -3.1, 'YTD': -12.3, '6M': -11.2, '1Y': -16.5 },
  FDTX: { '1W': -5.2, '1M': -2.4, 'YTD': 30.9, '6M': 28.5, '1Y': 36.5 },
  GTEK: { '1W': -0.2, '1M': 6.2, 'YTD': 54.3, '6M': 49.5, '1Y': 70.2 },
  ARKK: { '1W': -2.1, '1M': 5.6, 'YTD': 4.1, '6M': -0.5, '1Y': 13 },
  MARS: { '1W': -6.3, '1M': -15.7, 'YTD': 18.3, '6M': 18.3, '1Y': 18.3 },
  FRWD: { '1W': -6.6, '1M': -0.8, 'YTD': 26.5, '6M': 26.5, '1Y': 26.5 },
  BCTK: { '1W': -3.5, '1M': 0.5, 'YTD': 20.8, '6M': 19.9, '1Y': 23 },
  FWD:  { '1W': -6, '1M': -2.2, 'YTD': 28.7, '6M': 22.5, '1Y': 51.4 },
  CBSE: { '1W': -5.8, '1M': 1.1, 'YTD': 25.1, '6M': 19.2, '1Y': 33.3 },
  FCUS: { '1W': -10, '1M': -11.9, 'YTD': 23.6, '6M': 14.2, '1Y': 51.9 },
  WGMI: { '1W': -7.8, '1M': -17.6, 'YTD': 41.6, '6M': 21.8, '1Y': 117.6 },
  CNEQ: { '1W': -2.5, '1M': 0.5, 'YTD': 14.9, '6M': 13.6, '1Y': 36.3 },
  SGRT: { '1W': -7.6, '1M': -5.7, 'YTD': 31.8, '6M': 29.3, '1Y': 64.8 },
  SPMO: { '1W': -3.5, '1M': 1.3, 'YTD': 25.6, '6M': 25.9, '1Y': 34.7 },
  XMMO: { '1W': -3.4, '1M': -3, 'YTD': 15.8, '6M': 14.4, '1Y': 24.3 },
  // Electrification
  POW:  { '1W': -7.6, '1M': -6.1, 'YTD': 40.4, '6M': 37.4, '1Y': 36.3 },
  VOLT: { '1W': -4.6, '1M': -0.1, 'YTD': 33.2, '6M': 31.3, '1Y': 51.4 },
  PBD:  { '1W': -4.9, '1M': -10.3, 'YTD': 14.2, '6M': 10.3, '1Y': 41 },
  PBW:  { '1W': -8.1, '1M': -14.4, 'YTD': 14.7, '6M': 5.4, '1Y': 61.5 },
  IVEP: { '1W': -5.1, '1M': -2.2, 'YTD': 1.7, '6M': 1.7, '1Y': 1.7 },
  // Industrials
  AIRR: { '1W': -5.1, '1M': -4.2, 'YTD': 24.8, '6M': 16.3, '1Y': 46.7 },
  PRN:  { '1W': -8.9, '1M': -3.7, 'YTD': 30.4, '6M': 25.3, '1Y': 46.2 },
  RSHO: { '1W': 1.2, '1M': 4.4, 'YTD': 39.4, '6M': 36.1, '1Y': 53.6 },
  IDEF: { '1W': 0.6, '1M': 1, 'YTD': 4.8, '6M': -4.7, '1Y': 14.9 },
  BILT: { '1W': 2, '1M': -1, 'YTD': 10.5, '6M': 11.1, '1Y': 13.8 },
  // Meme
  BUZZ: { '1W': -3.9, '1M': -6.2, 'YTD': 8.9, '6M': 3.1, '1Y': 15.7 },
  MEME: { '1W': -12.8, '1M': -21.6, 'YTD': 27.6, '6M': 7.2, '1Y': -19.4 },
  RKNG: { '1W': -14.9, '1M': -10.6, 'YTD': -4.7, '6M': -4.7, '1Y': -4.7 },
};
// @@END_GENERATED:ETF_RETURNS@@

// @@GENERATED:ETF_DAY_CHANGE@@
// Today's % move per ETF ticker (1D, vs prior close). Refreshed by the 3×/day
// price jobs. Powers the 1D ranking in the theme-ETF side panel.
export const ETF_DAY_CHANGE: Record<string, number> = {
  AIS:  0.94,
  ARTY: 0.28,
  BAI:  0.78,
  IGPT: 0.08,
  IVES: -0.45,
  ALAI: -0.29,
  CHAT: 1.21,
  SPRX: 1.25,
  SOXX: 0.77,
  PSI:  0.76,
  XSD:  0.56,
  DRAM: -0.59,
  PTF:  2.6,
  WCLD: -1.39,
  IGV:  -1.5,
  FDTX: 0.09,
  ARKK: -1.34,
  MARS: 1.12,
  BCTK: 0.21,
  FWD:  -0.29,
  WGMI: 2.94,
  CNEQ: 0.1,
  SPMO: 0.27,
  XMMO: 0.05,
  POW:  -0.16,
  VOLT: 0.16,
  PBW:  -0.79,
  AIRR: -0.14,
  PRN:  -0.04,
  IDEF: -1.66,
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
  'AI & ML': { etfs: ['AIS', 'IVES', 'SPRX'], series: { '1W': [100, 94.91, 97.52, 93.16, 93.73], '1M': [100, 97.63, 94.68, 100.72, 101.51, 106.39, 102.67, 103.45, 107.99, 109.23, 102.62, 101.42, 103.4, 100.7, 104.7, 107.97, 103.06, 97.77, 100.48, 95.95, 96.54], 'YTD': [100, 103.29, 107, 107.92, 106.62, 108.57, 104.42, 106.4, 102.11, 103.97, 106.19, 103.2, 97.72, 108.11, 117.52, 122.57, 124.86, 131.51, 145.48, 145.7, 157.46, 151.74, 162.4, 157.26, 165.67, 146.73], '6M': [100, 103.59, 104.46, 103.19, 101.66, 101.46, 100.78, 101.87, 97.24, 98.78, 98.13, 93.14, 98.41, 109.29, 115.94, 120.49, 122.64, 137.66, 131.94, 143.02, 155.71, 146.51, 156.75, 151.74, 159.84, 141.63], '1Y': [100, 100.82, 102.02, 106.04, 105.8, 110.97, 105.91, 106.96, 107.72, 113.9, 121.05, 125.95, 124.49, 129.79, 129.16, 130.57, 137.79, 133.53, 132.54, 121.98, 122.82, 127.48, 131.91, 123.21, 129.42, 126.97, 131.23, 136.05, 137.27, 135.68, 133.95, 133.76, 134.7, 134.5, 128.06, 130.22, 129.42, 122.92, 129.9, 144.62, 153.38, 159.67, 162.63, 182.98, 175.05, 190.03, 206.8, 194.79, 208.85, 202.39, 213.29, 188.3] }, returns: { '1W': -6.3, '1M': -3.5, 'YTD': 46.7, '6M': 41.6, '1Y': 88.3 } },
  'Semiconductors': { etfs: ['DRAM', 'PSI', 'XSD'], series: { '1W': [100, 91.97, 95.22, 88.94, 89.18], '1M': [100, 98.45, 95.25, 104.89, 106.35, 112.85, 107.27, 108.29, 116.76, 121, 109.12, 108.37, 114.5, 108.31, 111.64, 116.58, 107.7, 99, 102.47, 95.7, 95.96], 'YTD': [100, 110.95, 114.2, 117.01, 117.99, 124.34, 126.06, 126.52, 126.39, 132.61, 141.07, 141.58, 132.92, 149.04, 163.67, 176.32, 190.8, 181.79, 192.1, 201.53, 213.2, 209.4, 232.07, 223.29, 216.84, 191.35], '6M': [100, 108.69, 108.98, 111.08, 115.61, 118.95, 119.33, 118.33, 116.79, 125.91, 134.12, 131.68, 130.51, 145.86, 160.94, 171.63, 184.25, 183.35, 176.01, 196.25, 201.87, 200.09, 221.71, 213.3, 206.11, 182.53], '1Y': [100, 101.55, 105.86, 106.19, 104.85, 109.76, 108.98, 111.75, 112.01, 114.64, 120.5, 123.03, 123.13, 125.44, 127.46, 131.24, 134.83, 137.93, 141.37, 131.91, 142.24, 145, 153.36, 147.86, 144.76, 143.17, 151.9, 159.47, 167.34, 167.17, 173.72, 182, 183.34, 181.74, 167.92, 163.97, 163.96, 159.75, 174.73, 194.54, 201.33, 213.57, 232.93, 240.51, 228.84, 252.01, 245.65, 246.74, 254.17, 241.49, 253.39, 221.45] }, returns: { '1W': -10.8, '1M': -4, 'YTD': 91.3, '6M': 82.5, '1Y': 121.4 } },
  'Broad Tech': { etfs: ['WGMI', 'GTEK', 'PTF'], series: { '1W': [100, 92.16, 95.07, 89.59, 93.18], '1M': [100, 97.71, 94.15, 100.32, 101.91, 106.57, 104.51, 104.57, 108.89, 109.49, 105.22, 102.13, 102.84, 101.32, 102.56, 104.58, 99.2, 91.56, 94.31, 88.94, 92.58], 'YTD': [100, 107.78, 113.03, 114.11, 110.81, 112.88, 109.18, 113.4, 106.84, 106.39, 109.86, 109.41, 102.06, 116.26, 126.42, 133.23, 134.14, 146.01, 153.55, 152.32, 165.03, 159.94, 170.45, 168.47, 166.79, 146.96], '6M': [100, 104.75, 105.69, 102.86, 100.62, 102.91, 101.83, 103.71, 95.44, 98.02, 98.4, 94.86, 100.18, 112.93, 122.49, 124.61, 128.55, 141.56, 132.61, 143.63, 156.86, 148.4, 158.25, 156.16, 155.26, 136.95], '1Y': [100, 99.68, 103.88, 100.93, 99.91, 100.82, 100.68, 104.27, 108.66, 113.8, 124.87, 131.01, 131.88, 146.71, 161.01, 149.52, 157.32, 153.74, 143.1, 126.8, 129.41, 132.57, 141.13, 124.4, 131.16, 125.58, 136.55, 143.7, 145.33, 140.16, 135.4, 138.46, 136.91, 138.7, 127.33, 131.38, 131.55, 126.27, 133.14, 151.65, 164.93, 167.22, 172.45, 191.29, 179.53, 195.29, 214.74, 202.59, 215.55, 214.03, 209.26, 183.76] }, returns: { '1W': -6.8, '1M': -7.4, 'YTD': 47, '6M': 36.9, '1Y': 83.8 } },
  'Electrification': { etfs: ['VOLT', 'POW', 'PBW'], series: { '1W': [100, 96.56, 97.9, 93.44, 93.22], '1M': [100, 98.75, 95.48, 99.9, 100.73, 103.46, 102.3, 102.41, 104.83, 105.96, 101.15, 100.38, 101.18, 98.21, 100.64, 103.1, 99.83, 96.42, 97.72, 93.32, 93.13], 'YTD': [100, 104.13, 109.93, 112.37, 112.23, 118.01, 118.49, 122.22, 115.66, 115.96, 117.64, 117.83, 115.01, 123.8, 127.86, 135.67, 141.8, 144.1, 147.09, 142.71, 147.45, 138.96, 143.9, 140.65, 143.36, 129.43], '6M': [100, 105.59, 107.91, 107.92, 111.47, 114.18, 114.92, 115.65, 107.37, 110.43, 108.96, 109.69, 112.29, 121.68, 126.27, 132.05, 137.1, 144.58, 132.52, 139.28, 141.17, 133.67, 138.52, 135.47, 138.13, 124.72], '1Y': [100, 102.12, 106.39, 104.99, 104.24, 105.2, 105.26, 107.54, 106.64, 107.19, 109.43, 113.01, 114.8, 120.27, 126.5, 124.18, 125.54, 123.05, 127.22, 121.17, 121.25, 125.7, 128.87, 125.99, 130.26, 127, 127.75, 133.98, 136.21, 133.55, 138.68, 137.51, 138.31, 140.31, 135.61, 139.54, 139.51, 141.6, 146.55, 154.9, 159.4, 157.78, 162.89, 170.58, 162.05, 166.32, 169.31, 164.2, 165.36, 161.32, 162.38, 149.72] }, returns: { '1W': -6.8, '1M': -6.9, 'YTD': 29.4, '6M': 24.7, '1Y': 49.7 } },
  'Industrials': { etfs: ['RSHO', 'PRN', 'BILT'], series: { '1W': [100, 98.19, 99.93, 97.29, 98.08], '1M': [100, 100.21, 99.15, 100.32, 101.32, 100.74, 99.19, 100.57, 101.51, 103.26, 102.09, 102.71, 103.63, 101.85, 103.2, 104.9, 102, 100.09, 101.86, 99.11, 99.91], 'YTD': [100, 102.86, 107.52, 107.45, 108.27, 115.1, 118.71, 119.8, 117.85, 113.28, 112.23, 112.26, 109.76, 117.19, 120.6, 121.71, 123.03, 125.7, 128.24, 122.97, 128.15, 127.3, 127.87, 129.74, 133.58, 126.77], '6M': [100, 104.29, 105.49, 106.09, 109.16, 114.36, 116.68, 117.11, 112.11, 109.71, 108.94, 109.2, 110.8, 115.68, 119.59, 120.01, 121.26, 124.05, 122.2, 121.03, 124.55, 124.69, 125.2, 126.96, 130.71, 124.17], '1Y': [100, 101.12, 102.1, 103.96, 103.21, 103.01, 102.36, 103.62, 103.33, 103.86, 105.82, 106.96, 107.29, 108.77, 107.76, 108.41, 110.79, 108.89, 108.79, 104.68, 105.44, 106.48, 108.13, 108.84, 110.49, 108.87, 112.03, 117.05, 118.2, 118.07, 124.91, 128.43, 130.5, 128.31, 122.47, 118.73, 119.7, 122.37, 123.94, 130.84, 131.16, 133.5, 133.68, 139.94, 136.1, 135.79, 137.58, 138.4, 137.3, 141.44, 145.49, 137.85] }, returns: { '1W': -1.9, '1M': -0.1, 'YTD': 26.8, '6M': 24.2, '1Y': 37.8 } },
  'Meme': { etfs: ['BUZZ', 'RKNG', 'MEME'], series: { '1W': [100, 95.36, 94.14, 91.69, 89.46], '1M': [100, 96.44, 93.79, 99.87, 98.57, 104.08, 99.99, 100.62, 104.2, 104.07, 99.23, 97.04, 95.09, 94.42, 96.21, 98.58, 97.51, 93.05, 91.66, 89.49, 87.19], 'YTD': [100, 106.79, 105.55, 105.8, 99.62, 99.94, 92.18, 94.54, 93.09, 93.13, 93.47, 92.67, 90.16, 100.37, 113.76, 112.18, 115.44, 121.59, 126.33, 132.96, 142.64, 127.35, 133.52, 126.94, 126.06, 110.59], '6M': [100, 100.93, 97.22, 92.17, 88.97, 87.62, 85.31, 85.5, 84.23, 85.71, 82.78, 80.45, 85.04, 97.06, 106.3, 102.83, 109.49, 118.31, 109.33, 124.01, 130.08, 116.63, 122.48, 116.57, 115.78, 101.87], '1Y': [100, 103.5, 100.95, 94.74, 91.84, 91.74, 88.66, 84.06, 83.97, 84.31, 87.18, 91.1, 88.41, 87.8, 90.19, 88.79, 88.4, 89.75, 90.63, 88.71, 85.9, 85.68, 88.57, 85.81, 86.33, 87.46, 91.43, 92.55, 90.9, 89.88, 88.33, 89.43, 88.78, 87.89, 93.48, 97.46, 95.43, 92.36, 95.39, 102.3, 108.17, 111.07, 103.45, 113.84, 113.89, 116.34, 115.16, 113.54, 113.19, 107, 104.03, 97.18] }, returns: { '1W': -10.5, '1M': -12.8, 'YTD': 10.6, '6M': 1.9, '1Y': -2.8 } },
};
// @@END_GENERATED:THEME_REPRESENTATIVES@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 9, avgWeight: 6.67, proScore: 6, coverage: 0.9,
      price: 197.13, weeklyPrices: [197.58, 194.83, 195.55, 196.93, 197.13], weeklyChange: -0.23, dayChange: 0.1, sortRank: 0, periodReturns: { '1M': -5.5, 'YTD': 5.7, '6M': 6.5, '1Y': 23.2 },
      priceHistory: { '1D': [196.93, 197.21, 197.13], '1W': [197.58, 194.83, 195.55, 196.93, 197.13], '1M': [208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 196.93, 197.13], 'YTD': [186.5, 185.04, 187.05, 187.67, 191.13, 190.04, 184.97, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 183.91, 198.35, 199.64, 199.57, 211.5, 235.74, 219.51, 211.14, 208.64, 212.45, 200.04, 200.09, 197.13], '6M': [185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 222.32, 215.33, 224.36, 208.64, 212.45, 200.04, 200.09, 197.13], '1Y': [160, 170.7, 167.03, 175.51, 178.26, 183.16, 175.64, 179.81, 170.78, 170.76, 174.88, 178.43, 186.58, 185.04, 180.03, 181.16, 201.03, 198.69, 193.16, 181.36, 182.55, 181.46, 184.97, 177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 222.32, 215.33, 224.36, 208.64, 212.45, 200.04, 200.09, 197.13] },
      velocityScore: { '1D': 2.7, '1W': -0.5, '1M': 0.8, '6M': null }, isNew: false,
      marketCap: '$4.8T', pe: 30.1, revenueGrowth: 85, eps: 6.54, grossMargin: 74, dividendYield: 0.51,
      etfPresence: { AIS: 2.59, ARTY: 4.65, BAI: 4.32, IGPT: 7.78, IVES: 4.7, ALAI: 12.55, CHAT: 7.17, AIFD: 6.28, SPRX: false, AOTG: 9.98 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 5.63, proScore: 5.06, coverage: 0.9,
      price: 943.1, weeklyPrices: [1032.28, 975.56, 984.75, 938.38, 943.10], weeklyChange: -8.64, dayChange: 0.5, sortRank: 0, periodReturns: { '1M': -0.7, 'YTD': 230.4, '6M': 188.4, '1Y': 658 },
      priceHistory: { '1D': [938.38, 938.28, 943.1], '1W': [1032.28, 975.56, 984.75, 938.38, 943.1], '1M': [949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 943.1], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 421.51, 457.23, 481.72, 517.16, 646.63, 776.01, 762.1, 971, 949.28, 1087.99, 1051.77, 1154.29, 943.1], '6M': [327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 751, 1035.5, 949.28, 1087.99, 1051.77, 1154.29, 943.1], '1Y': [124.42, 120.11, 109.22, 111.96, 109.06, 127.75, 122.05, 116.42, 118.48, 135.24, 158.82, 166.41, 167.32, 185.69, 187.06, 202.29, 221.91, 218.03, 241.11, 228.5, 223.93, 239.49, 252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 751, 1035.5, 949.28, 1087.99, 1051.77, 1154.29, 943.1] },
      velocityScore: { '1D': -1, '1W': -12.6, '1M': -1, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 21.3, revenueGrowth: 346, eps: 44.2, grossMargin: 73, dividendYield: 0.06,
      etfPresence: { AIS: 6.73, ARTY: 4.74, BAI: 6.15, IGPT: 7.63, IVES: 4.41, ALAI: 0.99, CHAT: 3.56, AIFD: 6.53, SPRX: false, AOTG: 9.89 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.57, proScore: 5.02, coverage: 0.9,
      price: 517.13, weeklyPrices: [540.88, 517.82, 552.05, 516.11, 517.13], weeklyChange: -4.39, dayChange: 0.2, sortRank: 0, periodReturns: { '1M': 5.5, 'YTD': 141.5, '6M': 152.7, '1Y': 275.2 },
      priceHistory: { '1D': [516.11, 515.49, 517.13], '1W': [540.88, 517.82, 552.05, 516.11, 517.13], '1M': [490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 517.13], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 216, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 236.64, 278.26, 305.33, 354.49, 408.46, 449.7, 449.59, 516.1, 490.33, 547.26, 519.85, 580.91, 517.13], '6M': [204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 467.51, 510.13, 490.33, 547.26, 519.85, 580.91, 517.13], '1Y': [137.82, 155.61, 154.72, 177.44, 174.31, 174.95, 166.55, 163.36, 162.32, 155.82, 160.46, 160.9, 161.79, 211.51, 218.09, 238.03, 258.01, 250.05, 237.52, 230.29, 215.05, 215.24, 221.62, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 467.51, 510.13, 490.33, 547.26, 519.85, 580.91, 517.13] },
      velocityScore: { '1D': -2.1, '1W': -2.3, '1M': 8.7, '6M': null }, isNew: false,
      marketCap: '$843B', pe: 173, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 5.14, ARTY: 5.04, BAI: 5.14, IGPT: 8.55, IVES: 4.6, ALAI: 1.25, CHAT: 3.91, AIFD: false, SPRX: 0.58, AOTG: 15.95 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.64, proScore: 2.91, coverage: 0.8,
      price: 380.86, weeklyPrices: [369.34, 360.45, 373.90, 370.78, 380.86], weeklyChange: 3.12, dayChange: 2.72, sortRank: 0, periodReturns: { '1M': -4, 'YTD': 10, '6M': 14.6, '1Y': 40.1 },
      priceHistory: { '1D': [370.78, 379.75, 380.86], '1W': [369.34, 360.45, 373.9, 370.78, 380.86], '1M': [396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 370.78, 380.86], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.3, 343.94, 332.54, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 354.91, 398.47, 419.94, 417.43, 412.56, 439.79, 414.57, 446.77, 396.6, 393.94, 380.15, 377.75, 380.86], '6M': [332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 420.71, 414.14, 459.97, 396.6, 393.94, 380.15, 377.75, 380.86], '1Y': [271.8, 280.94, 278.59, 297.42, 292.93, 312.83, 294.91, 294.23, 298.24, 336.67, 360, 338.94, 329.91, 336.41, 344.13, 342.66, 372.97, 351.94, 351.96, 340.5, 377.96, 381.57, 406.29, 341.3, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 420.71, 414.14, 459.97, 396.6, 393.94, 380.15, 377.75, 380.86] },
      velocityScore: { '1D': 1.7, '1W': 5.4, '1M': 9, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63.4, revenueGrowth: 48, eps: 6.01, grossMargin: 76, dividendYield: 0.7,
      etfPresence: { AIS: 0.7, ARTY: 4.51, BAI: 4.38, IGPT: false, IVES: 4.55, ALAI: 3.85, CHAT: 4.58, AIFD: 5.17, SPRX: false, AOTG: 1.4 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 7, avgWeight: 3.19, proScore: 2.23, coverage: 0.7,
      price: 233.75, weeklyPrices: [272.05, 245.29, 249.27, 230.70, 233.75], weeklyChange: -14.08, dayChange: 1.32, sortRank: 0, periodReturns: { '1M': -19.1, 'YTD': 175.1, '6M': 180.1, '1Y': 224.9 },
      priceHistory: { '1D': [230.7, 232.89, 233.75], '1W': [272.05, 245.29, 249.27, 230.7, 233.75], '1M': [288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 245.29, 249.27, 230.7, 233.75], 'YTD': [84.98, 83.45, 80.38, 80.23, 78.92, 82.35, 79.01, 78.39, 77.51, 93.3, 90.79, 92.36, 99.05, 119.93, 133.37, 165.56, 165.15, 160.01, 182.58, 190.69, 205, 288.85, 308.88, 279.04, 297.89, 233.75], '6M': [83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 81.69, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.84, 168.93, 196.33, 219.43, 288.85, 308.88, 279.04, 297.89, 233.75], '1Y': [71.95, 72.41, 71.99, 76.34, 76.63, 77.81, 72.07, 72.95, 64.6, 66.84, 68.86, 74.62, 84.07, 86.97, 86.22, 84.26, 88.46, 87.59, 89.33, 78.68, 83.79, 92.89, 88.9, 84.07, 87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 79.48, 81.69, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.84, 168.93, 196.33, 219.43, 288.85, 308.88, 279.04, 297.89, 233.75] },
      velocityScore: { '1D': -3.5, '1W': -13.2, '1M': -3.9, '6M': null }, isNew: false,
      marketCap: '$204B', pe: 80.3, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.1,
      etfPresence: { AIS: 3.68, ARTY: 3.8, BAI: 1.78, IGPT: 3.12, IVES: false, ALAI: false, CHAT: 1.44, AIFD: 5.51, SPRX: 2.99, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 5.27, proScore: 3.16, coverage: 0.6,
      price: 363.01, weeklyPrices: [361.21, 359.91, 366.46, 367.03, 363.01], weeklyChange: 0.5, dayChange: -1.1, sortRank: 0, periodReturns: { '1M': -0.1, 'YTD': 16, '6M': 11.5, '1Y': 108.2 },
      priceHistory: { '1D': [367.03, 363.43, 363.01], '1W': [361.21, 359.91, 366.46, 367.03, 363.01], '1M': [363.31, 364.26, 356.38, 357.77, 359.68, 369.35, 373.25, 363.79, 368.03, 349.68, 346.13, 345.29, 343.71, 337.39, 353.65, 357.37, 361.21, 359.91, 366.46, 367.03, 363.01], 'YTD': [313, 325.44, 332.78, 327.93, 338, 324.32, 302.02, 310.9, 303.58, 307.04, 310.92, 290.44, 287.56, 318.49, 336.02, 338.89, 384.8, 397.99, 401.07, 387.66, 380.34, 363.31, 369.35, 346.13, 357.37, 363.01], '6M': [325.44, 332.78, 327.93, 338, 322.86, 305.72, 311.49, 311.76, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 383.25, 388.64, 396.94, 382.97, 376.37, 363.31, 369.35, 346.13, 357.37, 363.01], '1Y': [174.36, 182, 191.34, 195.75, 194.67, 203.34, 201.57, 208.49, 211.35, 239.63, 251.16, 251.66, 243.1, 245.76, 245.45, 250.46, 267.47, 277.54, 291.31, 284.28, 318.58, 315.81, 317.08, 306.57, 314.35, 313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 314.98, 311.76, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 383.25, 388.64, 396.94, 382.97, 376.37, 363.31, 369.35, 346.13, 357.37, 363.01] },
      velocityScore: { '1D': 2.3, '1W': 10.5, '1M': 5.7, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.7, revenueGrowth: 22, eps: 13.1, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.47, IGPT: 8.3, IVES: 4.82, ALAI: false, CHAT: 5.85, AIFD: 5.15, SPRX: false, AOTG: 4.02 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 6, avgWeight: 4.89, proScore: 2.93, coverage: 0.6,
      price: 436.29, weeklyPrices: [444.23, 434.16, 451.79, 432.57, 436.29], weeklyChange: -1.79, dayChange: 0.84, sortRank: 0, periodReturns: { '1M': 2.2, 'YTD': 43.6, '6M': 37.2, '1Y': 91.5 },
      priceHistory: { '1D': [432.66, 435.62, 436.29], '1W': [444.23, 434.16, 451.79, 432.57, 436.29], '1M': [426.8, 427.92, 408.75, 421.07, 423.93, 441.4, 425.83, 432.15, 462.12, 467.67, 436.39, 440.83, 434.99, 432.35, 455.1, 477.57, 444.23, 434.16, 451.79, 432.57, 436.29], 'YTD': [303.89, 318.01, 341.64, 334.87, 330.56, 355.41, 364.2, 385.75, 353.13, 347.09, 345.98, 343.25, 337.95, 365.49, 363.35, 382.66, 396.06, 414.15, 417.72, 407.15, 418.45, 426.8, 441.4, 436.39, 477.57, 436.29], '6M': [318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.04, 374.58, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 401.61, 404.54, 395.95, 404.52, 435.63, 426.8, 441.4, 436.39, 477.57, 436.29], '1Y': [227.86, 236.95, 234.6, 241.33, 232.47, 244.29, 232.7, 235.59, 228.39, 250.92, 262.06, 282.71, 279.29, 294.03, 295.94, 294.51, 301.53, 294.05, 291.17, 277.91, 284.64, 292.09, 303.41, 286.87, 296.95, 303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.54, 374.58, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 401.61, 404.54, 395.95, 404.52, 435.63, 426.8, 441.4, 436.39, 477.57, 436.29] },
      velocityScore: { '1D': -0.7, '1W': 11, '1M': 15.4, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 37.9, revenueGrowth: 35, eps: 11.51, grossMargin: 62, dividendYield: 0.88,
      etfPresence: { AIS: 3.5, ARTY: false, BAI: 4.7, IGPT: false, IVES: 4.83, ALAI: 5.61, CHAT: false, AIFD: 3.42, SPRX: false, AOTG: 7.27 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 6, avgWeight: 2.44, proScore: 1.46, coverage: 0.6,
      price: 169.72, weeklyPrices: [166.62, 159.99, 173.28, 166.46, 169.72], weeklyChange: 1.86, dayChange: 2.03, sortRank: 0, periodReturns: { '1M': 8.5, 'YTD': 29.5, '6M': 37.2, '1Y': 64.2 },
      priceHistory: { '1D': [166.35, 169.35, 169.72], '1W': [166.62, 159.99, 173.28, 166.46, 169.72], '1M': [156.4, 152.16, 151.76, 156.4, 163.24, 169.09, 168.01, 164.93, 169.67, 174.56, 162.2, 161.74, 165.45, 157.6, 164.1, 169.88, 166.62, 159.99, 173.28, 166.46, 169.72], 'YTD': [131.03, 123.72, 130.59, 136.34, 141.74, 141.74, 142.58, 128.77, 124.6, 139.62, 133.07, 130.8, 122.78, 146.05, 161.01, 172.55, 172.71, 141.75, 147.81, 148.59, 159.47, 156.4, 169.09, 162.2, 169.88, 169.72], '6M': [123.72, 130.59, 136.34, 141.74, 137.49, 141.59, 127.43, 133.5, 132.89, 133.57, 131.22, 120.77, 126.25, 152.02, 166.85, 172.47, 172.62, 136.43, 141.71, 154.03, 170.68, 156.4, 169.09, 162.2, 169.88, 169.72], '1Y': [103.39, 107.37, 109.78, 118.62, 118.12, 141.25, 132.78, 133.04, 135.87, 141.91, 142.16, 144.09, 145.71, 145.29, 138.79, 145.94, 156.77, 153.55, 134.93, 123.45, 122.17, 127.22, 130.04, 126.13, 131.32, 131.03, 123.72, 130.59, 136.34, 141.74, 137.49, 141.59, 132.79, 133.5, 132.89, 133.57, 131.22, 120.77, 126.25, 152.02, 166.85, 172.47, 172.62, 136.43, 141.71, 154.03, 170.68, 156.4, 169.09, 162.2, 169.88, 169.72] },
      velocityScore: { '1D': -1.4, '1W': 6.6, '1M': 0.7, '6M': null }, isNew: false,
      marketCap: '$214B', pe: 58.3, revenueGrowth: 35, eps: 2.91, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.58, ARTY: 2.58, BAI: 1.44, IGPT: false, IVES: false, ALAI: false, CHAT: 2.24, AIFD: 4.95, SPRX: 1.85, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 6 of 10 AI & ML ETFs (60% coverage) with average weight 2.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 5, avgWeight: 4.31, proScore: 2.16, coverage: 0.5,
      price: 604.31, weeklyPrices: [612.91, 582.90, 600.29, 615.58, 604.31], weeklyChange: -1.4, dayChange: -1.83, sortRank: 0, periodReturns: { '1M': 3.2, 'YTD': -8.5, '6M': -6.5, '1Y': -16.1 },
      priceHistory: { '1D': [615.58, 605.57, 604.31], '1W': [612.91, 582.9, 600.29, 615.58, 604.31], '1M': [585.39, 584.59, 570.98, 568.43, 566.98, 593.48, 600.21, 567.58, 577.22, 563.85, 562.2, 557.67, 542.87, 550.25, 562.6, 563.29, 612.91, 582.9, 600.29, 615.58, 604.31], 'YTD': [660.09, 646.06, 620.8, 658.76, 716.5, 677.22, 639.29, 639.3, 655.08, 654.07, 622.66, 592.92, 572.13, 628.39, 676.87, 659.15, 611.91, 616.81, 618.43, 607.38, 632.51, 585.39, 593.48, 562.2, 563.29, 604.31], '6M': [646.06, 620.8, 658.76, 716.5, 661.46, 639.77, 637.25, 648.18, 644.86, 613.71, 593.66, 525.72, 573.02, 634.53, 670.91, 678.62, 610.41, 598.86, 611.21, 610.26, 600.47, 585.39, 593.48, 562.2, 563.29, 604.31], '1Y': [720.67, 710.39, 704.81, 700, 763.46, 790, 751.48, 753.3, 735.11, 765.7, 779, 755.4, 734.38, 713.08, 708.65, 733.27, 751.44, 627.32, 627.08, 597.69, 613.05, 647.1, 656.96, 657.15, 664.94, 660.09, 646.06, 620.8, 658.76, 716.5, 661.46, 639.77, 655.66, 648.18, 644.86, 613.71, 593.66, 525.72, 573.02, 634.53, 670.91, 678.62, 610.41, 598.86, 611.21, 610.26, 600.47, 585.39, 593.48, 562.2, 563.29, 604.31] },
      velocityScore: { '1D': 5.4, '1W': 15.5, '1M': 24.1, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 22, revenueGrowth: 33, eps: 27.52, grossMargin: 82, dividendYield: 0.34,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 8.77, IVES: 5.03, ALAI: 4.32, CHAT: 2.32, AIFD: false, SPRX: false, AOTG: 1.13 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 4.08, proScore: 2.04, coverage: 0.5,
      price: 241.86, weeklyPrices: [241.70, 242.67, 244.16, 245.98, 241.86], weeklyChange: 0.07, dayChange: -1.67, sortRank: 0, periodReturns: { '1M': -1.4, 'YTD': 4.8, '6M': -1.8, '1Y': 10.3 },
      priceHistory: { '1D': [245.98, 241.87, 241.86], '1W': [241.7, 242.67, 244.16, 245.98, 241.86], '1M': [245.22, 244.19, 238, 241.51, 238.55, 246.02, 246, 237.5, 244.39, 232.79, 234.11, 234.27, 227.01, 232.69, 240.14, 238.34, 241.7, 242.67, 244.16, 245.98, 241.86], 'YTD': [230.82, 246.29, 238.18, 239.16, 239.3, 208.72, 201.15, 208.56, 208.73, 214.33, 215.2, 207.24, 208.27, 233.65, 249.7, 255.08, 265.06, 271.17, 267.22, 268.46, 270.64, 245.22, 246.02, 234.11, 238.34, 241.86], '6M': [246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 205.27, 210, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 272.05, 268.99, 264.86, 266.32, 261.26, 245.22, 246.02, 234.11, 238.34, 241.86], '1Y': [219.36, 226.35, 227.47, 231.01, 213.75, 221.47, 228.01, 227.94, 225.34, 238.24, 234.05, 220.71, 219.57, 221.78, 216.39, 222.03, 229.25, 249.32, 249.1, 222.55, 226.28, 234.42, 227.92, 222.56, 232.14, 230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 210.11, 210, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 272.05, 268.99, 264.86, 266.32, 261.26, 245.22, 246.02, 234.11, 238.34, 241.86] },
      velocityScore: { '1D': 2, '1W': 6.3, '1M': -4.2, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 31.1, revenueGrowth: 17, eps: 7.77, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 4.89, ALAI: 5.23, CHAT: 2.65, AIFD: 3.55, SPRX: false, AOTG: 4.08 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.74, proScore: 1.87, coverage: 0.5,
      price: 383.11, weeklyPrices: [384.28, 390.49, 386.74, 388.84, 383.11], weeklyChange: -0.31, dayChange: -1.47, sortRank: 0, periodReturns: { '1M': -7, 'YTD': -20.8, '6M': -19.9, '1Y': -22.9 },
      priceHistory: { '1D': [388.84, 382.99, 383.11], '1W': [384.28, 390.49, 386.74, 388.84, 383.11], '1M': [411.74, 403.41, 397.36, 390.34, 390.74, 399.76, 393.83, 378.91, 379.4, 367.34, 373.94, 365.46, 352.83, 372.97, 368.57, 373.02, 384.28, 390.49, 386.74, 388.84, 383.11], 'YTD': [483.62, 478.11, 456.66, 465.95, 430.29, 413.6, 396.86, 389, 403.93, 405.76, 399.41, 372.74, 370.17, 373.07, 420.26, 415.75, 407.78, 420.77, 409.43, 419.09, 450.24, 411.74, 399.76, 373.94, 373.02, 383.11], '6M': [478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 384.47, 392.74, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 413.62, 412.66, 423.54, 418.57, 460.52, 411.74, 399.76, 373.94, 373.02, 383.11], '1Y': [496.62, 505.82, 505.27, 512.57, 527.75, 529.24, 509.77, 504.26, 505.12, 498.41, 509.04, 509.23, 517.95, 523.98, 513.57, 517.66, 542.07, 514.33, 508.68, 493.79, 474, 490, 492.02, 476.39, 486.85, 483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 397.23, 392.74, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 413.62, 412.66, 423.54, 418.57, 460.52, 411.74, 399.76, 373.94, 373.02, 383.11] },
      velocityScore: { '1D': 2.2, '1W': 8.7, '1M': -2.1, '6M': null }, isNew: false,
      marketCap: '$2.8T', pe: 22.8, revenueGrowth: 18, eps: 16.8, grossMargin: 68, dividendYield: 0.94,
      etfPresence: { AIS: false, ARTY: 2.68, BAI: false, IGPT: false, IVES: 4.76, ALAI: 5.23, CHAT: 2.47, AIFD: false, SPRX: false, AOTG: 3.58 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.48, proScore: 1.74, coverage: 0.5,
      price: 392, weeklyPrices: [430.86, 406.42, 432.74, 382.89, 392.00], weeklyChange: -9.02, dayChange: 2.38, sortRank: 0, periodReturns: { '1M': 13.2, 'YTD': 135.6, '6M': 150.1, '1Y': 324.7 },
      priceHistory: { '1D': [382.89, 389.8, 392], '1W': [430.86, 406.42, 432.74, 382.89, 392], '1M': [346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42, 432.74, 382.89, 392], 'YTD': [166.36, 156.73, 174.45, 169.66, 150.62, 187.67, 123.69, 128.4, 109.8, 116.48, 127.57, 121.76, 109.6, 129.46, 170.81, 197.54, 194.74, 195.65, 228.64, 297.84, 342.85, 346.33, 389.2, 397.02, 483.02, 392], '6M': [156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 118.83, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 215.58, 306.88, 320.09, 346.33, 389.2, 397.02, 483.02, 392], '1Y': [92.3, 92.36, 116.91, 118.41, 135.54, 192, 171.06, 174.15, 174.24, 214.49, 238.79, 230.11, 195.8, 212.1, 161.55, 157.51, 168.25, 179.31, 167.55, 139.52, 147.75, 142.94, 167.08, 144.94, 168.83, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 129.68, 118.83, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 215.58, 306.88, 320.09, 346.33, 389.2, 397.02, 483.02, 392] },
      velocityScore: { '1D': -8.4, '1W': -4.9, '1M': 22.5, '6M': null }, isNew: false,
      marketCap: '$67B', pe: 263.1, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 2.16, ARTY: 1.36, BAI: false, IGPT: false, IVES: false, ALAI: 0.93, CHAT: 2.35, AIFD: false, SPRX: 10.61, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 5, avgWeight: 2.44, proScore: 1.22, coverage: 0.5,
      price: 711.04, weeklyPrices: [801.16, 728.32, 731.25, 698.91, 711.04], weeklyChange: -11.25, dayChange: 1.74, sortRank: 0, periodReturns: { '1M': -20.6, 'YTD': 92.9, '6M': 104.2, '1Y': 678.7 },
      priceHistory: { '1D': [698.91, 709.95, 711.04], '1W': [801.16, 728.32, 731.25, 698.91, 711.04], '1M': [895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06, 801.16, 728.32, 731.25, 698.91, 711.04], 'YTD': [368.59, 348.26, 343.27, 339.19, 391.84, 577.15, 600.42, 688.27, 694.43, 672, 649.56, 801.99, 702.76, 894.13, 891.22, 846.89, 902.32, 892.58, 1001.81, 964.5, 854.96, 895.4, 957.24, 827.92, 858.06, 711.04], '6M': [348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 674.73, 700.91, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 884.98, 946.9, 905, 895.4, 957.24, 827.92, 858.06, 711.04], '1Y': [91.31, 98.14, 99.63, 109.48, 108.15, 119.66, 117.96, 123.42, 132.55, 151.73, 170.9, 163.99, 162.71, 157.15, 156.78, 162.95, 198.39, 188.36, 252.47, 247.43, 299.36, 302.81, 360.33, 316.15, 387.41, 368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 667.77, 700.91, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 884.98, 946.9, 905, 895.4, 957.24, 827.92, 858.06, 711.04] },
      velocityScore: { '1D': -2.4, '1W': -10.9, '1M': -10.9, '6M': null }, isNew: false,
      marketCap: '$55B', pe: 125.6, revenueGrowth: 90, eps: 5.66, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.33, IGPT: false, IVES: false, ALAI: 0.82, CHAT: 1.39, AIFD: 4.21, SPRX: 3.44, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 5 of 10 AI & ML ETFs (50% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 5, avgWeight: 2.11, proScore: 1.06, coverage: 0.5,
      price: 1680.11, weeklyPrices: [2032.22, 1745.00, 1744.43, 1617.70, 1680.11], weeklyChange: -17.33, dayChange: 3.86, sortRank: 0, periodReturns: { '1M': 2.3, 'YTD': 607.8, '6M': 402.2, '1Y': 3539 },
      priceHistory: { '1D': [1617.7, 1667.01, 1680.11], '1W': [2032.22, 1745, 1744.43, 1617.7, 1680.11], '1M': [1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745, 1744.43, 1617.7, 1680.11], 'YTD': [237.38, 334.54, 409.24, 473.83, 576.25, 583.4, 590.59, 638.52, 565.41, 618.89, 720.17, 702.48, 635.34, 851.57, 919.47, 932.43, 1096.51, 1339.96, 1382.72, 1542.24, 1694.98, 1642, 2107.86, 1963.6, 2273.73, 1680.11], '6M': [334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1478.69, 1761.43, 1642, 2107.86, 1963.6, 2273.73, 1680.11], '1Y': [46.17, 42.72, 41.36, 42.93, 41.93, 46.83, 44.58, 46.78, 51.07, 70.51, 91.55, 106.4, 112.2, 120.95, 127.29, 149.29, 175.53, 194.57, 271.58, 244.93, 226.96, 205.35, 219.46, 209.31, 244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1478.69, 1761.43, 1642, 2107.86, 1963.6, 2273.73, 1680.11] },
      velocityScore: { '1D': -1.9, '1W': -19.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$249B', pe: 57.4, revenueGrowth: 251, eps: 29.28, grossMargin: 56, dividendYield: null,
      etfPresence: { AIS: 2, ARTY: false, BAI: 2.73, IGPT: 3.71, IVES: false, ALAI: 0.47, CHAT: false, AIFD: false, SPRX: false, AOTG: 1.64 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'CRDO', name: 'Credo Technology Group Holding Ltd', easyScore: 5, avgWeight: 1.94, proScore: 0.97, coverage: 0.5,
      price: 255.46, weeklyPrices: [259.09, 241.91, 265.55, 246.40, 255.46], weeklyChange: -1.4, dayChange: 3.67, sortRank: 0, periodReturns: { '1M': 14.9, 'YTD': 77.5, '6M': 80.4, '1Y': 173.6 },
      priceHistory: { '1D': [246.4, 252.04, 255.46], '1W': [259.09, 241.91, 265.55, 246.4, 255.46], '1M': [222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 265.55, 246.4, 255.46], 'YTD': [143.89, 141.59, 149.12, 133.16, 125.28, 123.41, 124.8, 120.83, 97.3, 112.33, 104.06, 100.3, 93.87, 107.93, 158.93, 185.54, 174.01, 188.29, 184.54, 193.39, 236.03, 222.27, 259.41, 272.01, 271.95, 255.46], '6M': [141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 112.27, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 156.27, 218.41, 226.1, 222.27, 259.41, 272.01, 271.95, 255.46], '1Y': [93.36, 102.59, 92.93, 109.38, 110.29, 125.38, 106.3, 115.41, 124.27, 149.03, 164.42, 162.26, 145.61, 137.2, 129.75, 144.17, 162.18, 164.23, 158.5, 139.56, 150.85, 188.44, 170.29, 140.34, 147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.06, 112.27, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 156.27, 218.41, 226.1, 222.27, 259.41, 272.01, 271.95, 255.46] },
      velocityScore: { '1D': -4.9, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$48B', pe: 101.8, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: 1.13, ARTY: 1.27, BAI: 2.2, IGPT: false, IVES: false, ALAI: false, CHAT: 1.98, AIFD: false, SPRX: 3.1, AOTG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, avgWeight: 3.01, proScore: 1.2, coverage: 0.4,
      price: 313.33, weeklyPrices: [311.42, 300.53, 318.47, 305.58, 313.33], weeklyChange: 0.61, dayChange: 2.54, sortRank: 0, periodReturns: { '1M': 4.2, 'YTD': 93.4, '6M': 94.9, '1Y': 148.9 },
      priceHistory: { '1D': [305.57, 312.77, 313.33], '1W': [311.42, 300.53, 318.47, 305.58, 313.33], '1M': [300.57, 289.52, 280.98, 297.88, 302.87, 311.93, 299.6, 317.58, 333.05, 357.96, 318.32, 316.43, 325.57, 303.95, 306.97, 334.82, 311.42, 300.53, 318.47, 305.58, 313.33], 'YTD': [162.01, 160.78, 172.54, 182.49, 186.18, 202, 243.53, 253.15, 244.44, 270.06, 268.41, 270.89, 250.58, 287.64, 294.13, 321.75, 328.49, 340.01, 376.23, 323.4, 315.71, 300.57, 311.93, 318.32, 334.82, 313.33], '6M': [160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 245.42, 254.89, 241.78, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 330.97, 367.92, 339.73, 327.46, 323.39, 300.57, 311.93, 318.32, 334.82, 313.33], '1Y': [125.89, 127.37, 125.29, 142.7, 138.76, 143.72, 129.05, 125.02, 124.01, 125.58, 136.65, 142.61, 150.86, 158.87, 175.15, 174.8, 190.57, 180.82, 179.05, 164.86, 168.91, 180.91, 178.38, 160.66, 166.26, 162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 243.75, 254.89, 241.78, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 330.97, 367.92, 339.73, 327.46, 323.39, 300.57, 311.93, 318.32, 334.82, 313.33] },
      velocityScore: { '1D': 0, '1W': 2.6, '1M': 11.1, '6M': null }, isNew: false,
      marketCap: '$120B', pe: 78.9, revenueGrowth: 30, eps: 3.97, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.82, ARTY: false, BAI: 1.95, IGPT: false, IVES: false, ALAI: false, CHAT: 2.25, AIFD: 4.02, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 4, avgWeight: 2.9, proScore: 1.16, coverage: 0.4,
      price: 109.17, weeklyPrices: [127.02, 120.35, 122.20, 110.39, 109.17], weeklyChange: -14.05, dayChange: -1.11, sortRank: 0, periodReturns: { '1M': -1, 'YTD': 195.9, '6M': 165.6, '1Y': 362.8 },
      priceHistory: { '1D': [110.39, 109.18, 109.17], '1W': [127.02, 120.35, 122.2, 110.39, 109.17], '1M': [110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.2, 110.39, 109.17], 'YTD': [36.9, 41.11, 48.32, 45.07, 46.47, 50.24, 46.18, 46.12, 43.1, 46.78, 44.06, 44.06, 44.13, 61.72, 68.5, 66.78, 94.48, 109.62, 115.93, 118.5, 114.68, 110.27, 127.86, 132.28, 139.63, 109.17], '6M': [41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.61, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.17, 119.84, 109.33, 110.27, 127.86, 132.28, 139.63, 109.17], '1Y': [23.59, 22.92, 23.24, 20.41, 20.19, 21.81, 25.31, 24.55, 24.21, 24.44, 25.27, 29.34, 33.55, 37.17, 35.63, 38.12, 41.53, 37.03, 37.88, 34.33, 35.79, 43.47, 40.5, 37.31, 36.35, 36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.17, 119.84, 109.33, 110.27, 127.86, 132.28, 139.63, 109.17] },
      velocityScore: { '1D': -5.7, '1W': -12.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$549B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.29, ARTY: false, BAI: 2.95, IGPT: 4.3, IVES: false, ALAI: false, CHAT: 1.05, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 4, avgWeight: 2.69, proScore: 1.07, coverage: 0.4,
      price: 560.01, weeklyPrices: [598.37, 539.00, 577.46, 532.10, 560.01], weeklyChange: -6.41, dayChange: 5.25, sortRank: 0, periodReturns: { '1M': 6.3, 'YTD': 225.1, '6M': 198.4, '1Y': 774.7 },
      priceHistory: { '1D': [532.1, 554.77, 560.01], '1W': [598.37, 539, 577.46, 532.1, 560.01], '1M': [526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 532.1, 560.01], 'YTD': [172.27, 187.68, 222.1, 236.39, 250.23, 285.99, 284.11, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 337.88, 361.69, 403.12, 434.52, 463.91, 489.15, 486.46, 531.21, 526.93, 653.53, 670.75, 638.72, 560.01], '6M': [187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 458.68, 484.28, 546.2, 526.93, 653.53, 670.75, 638.72, 560.01], '1Y': [64.02, 67.53, 67.06, 70.61, 75.84, 75.91, 75.86, 79.22, 81.91, 94.54, 103.09, 110.25, 120.06, 119.93, 113.13, 121.41, 124.92, 152.18, 169.99, 152.86, 150.93, 159.99, 169.54, 174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 458.68, 484.28, 546.2, 526.93, 653.53, 670.75, 638.72, 560.01] },
      velocityScore: { '1D': -5.3, '1W': -32.3, '1M': -7, '6M': null }, isNew: false,
      marketCap: '$193B', pe: 33.5, revenueGrowth: 46, eps: 16.71, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { AIS: 1.31, ARTY: 2.63, BAI: 3.05, IGPT: false, IVES: false, ALAI: 3.75, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 4, avgWeight: 2.57, proScore: 1.03, coverage: 0.4,
      price: 395.15, weeklyPrices: [425.30, 393.45, 419.77, 402.90, 395.15], weeklyChange: -7.09, dayChange: -1.92, sortRank: 0, periodReturns: { '1M': -3.4, 'YTD': -12.1, '6M': -9.3, '1Y': 32.7 },
      priceHistory: { '1D': [402.9, 397.54, 395.15], '1W': [425.3, 393.45, 419.77, 402.9, 395.15], '1M': [408.95, 396.68, 381.59, 399.15, 406.43, 411.15, 404.66, 396.38, 400.49, 405.05, 381.61, 375.53, 375.12, 379.71, 411.84, 420.6, 425.3, 393.45, 419.77, 402.9, 395.15], 'YTD': [449.72, 435.8, 438.57, 449.06, 430.41, 417.32, 410.63, 409.38, 392.43, 399.24, 399.27, 383.03, 371.75, 345.62, 388.9, 373.72, 381.63, 411.79, 443.3, 417.85, 435.79, 408.95, 411.15, 381.61, 420.6, 395.15], '6M': [435.8, 438.57, 449.06, 430.41, 411.11, 417.44, 399.83, 402.51, 396.73, 391.2, 367.96, 361.83, 352.82, 352.42, 392.5, 378.67, 392.51, 445, 409.99, 426.01, 415.88, 408.95, 411.15, 381.61, 420.6, 395.15], '1Y': [297.81, 310.78, 332.11, 321.2, 308.72, 340.84, 329.31, 346.6, 329.36, 346.97, 421.62, 425.85, 444.72, 433.09, 429.24, 442.6, 460.55, 444.26, 439.62, 401.25, 417.78, 429.24, 445.17, 489.88, 485.56, 449.72, 435.8, 438.57, 449.06, 430.41, 411.11, 417.44, 411.82, 402.51, 396.73, 391.2, 367.96, 361.83, 352.82, 352.42, 392.5, 378.67, 392.51, 445, 409.99, 426.01, 415.88, 408.95, 411.15, 381.61, 420.6, 395.15] },
      velocityScore: { '1D': -1, '1W': null, '1M': 3, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 362.5, revenueGrowth: 16, eps: 1.09, grossMargin: 19, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 0.99, IGPT: false, IVES: 4.58, ALAI: 2.76, CHAT: false, AIFD: 1.93, SPRX: false, AOTG: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
    {
      ticker: 'ORCL', name: 'ORACLE CORP', easyScore: 4, avgWeight: 2.55, proScore: 1.02, coverage: 0.4,
      price: 140.69, weeklyPrices: [142.50, 140.27, 143.76, 141.60, 140.69], weeklyChange: -1.27, dayChange: -0.67, sortRank: 0, periodReturns: { '1M': -33.6, 'YTD': -27.8, '6M': -25.8, '1Y': -40 },
      priceHistory: { '1D': [141.64, 140.26, 140.69], '1W': [142.5, 140.27, 143.76, 141.6, 140.69], '1M': [211.82, 205.81, 201.26, 184.1, 184.13, 192.64, 188.33, 183.53, 184.29, 175.07, 165.16, 157.53, 152.46, 148.53, 147.76, 146.55, 142.5, 140.27, 143.76, 141.6, 140.69], 'YTD': [194.91, 189.65, 189.85, 177.16, 164.58, 156.59, 153.97, 146.14, 149.01, 149.4, 154.69, 147.09, 147.11, 137.86, 178.34, 176.28, 161.39, 194.59, 195.61, 189.77, 225.78, 211.82, 192.64, 165.16, 146.55, 140.69], '6M': [189.65, 189.85, 177.16, 164.58, 142.82, 160.14, 141.31, 145.4, 152.96, 155.11, 149.68, 139.66, 145.54, 155.62, 177.58, 172.96, 180.29, 193.84, 186.61, 192.08, 248.15, 211.82, 192.64, 165.16, 146.55, 140.69], '1Y': [234.5, 234.96, 238.11, 249.98, 255.67, 253.86, 234.62, 235.41, 225.3, 241.51, 306.65, 313.83, 281.24, 284.24, 299, 275.15, 280.83, 248.17, 236.15, 220.49, 200.28, 201.1, 221.53, 188.65, 195.34, 194.91, 189.65, 189.85, 177.16, 164.58, 142.82, 160.14, 148.08, 145.4, 152.96, 155.11, 149.68, 139.66, 145.54, 155.62, 177.58, 172.96, 180.29, 193.84, 186.61, 192.08, 248.15, 211.82, 192.64, 165.16, 146.55, 140.69] },
      velocityScore: { '1D': null, '1W': null, '1M': -25.5, '6M': null }, isNew: true,
      marketCap: '$405B', pe: 24.1, revenueGrowth: 21, eps: 5.83, grossMargin: 66, dividendYield: 1.41,
      etfPresence: { AIS: false, ARTY: 3.19, BAI: false, IGPT: false, IVES: 2.92, ALAI: false, CHAT: 1.99, AIFD: false, SPRX: false, AOTG: 2.1 },
      tonyNote: 'Oracle lands in 3 AI ETFs on the strength of its cloud database and AI infrastructure contracts. Revenue grew 22%, 67% gross margin, P/E of 40x. The 17.5% weekly return following a major earnings beat shows how quickly sentiment can reprice; the weight score at 2.04% is still modest, meaning ETF managers have started building positions but conviction is not yet deep.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 4.84, proScore: 4.84, coverage: 1,
      price: 943.1, weeklyPrices: [1032.28, 975.56, 984.75, 938.38, 943.10], weeklyChange: -8.64, dayChange: 0.5, sortRank: 0, periodReturns: { '1M': -0.7, 'YTD': 230.4, '6M': 188.4, '1Y': 658 },
      priceHistory: { '1D': [938.38, 938.28, 943.1], '1W': [1032.28, 975.56, 984.75, 938.38, 943.1], '1M': [949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 943.1], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 421.51, 457.23, 481.72, 517.16, 646.63, 776.01, 762.1, 971, 949.28, 1087.99, 1051.77, 1154.29, 943.1], '6M': [327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 751, 1035.5, 949.28, 1087.99, 1051.77, 1154.29, 943.1], '1Y': [124.42, 120.11, 109.22, 111.96, 109.06, 127.75, 122.05, 116.42, 118.48, 135.24, 158.82, 166.41, 167.32, 185.69, 187.06, 202.29, 221.91, 218.03, 241.11, 228.5, 223.93, 239.49, 252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 751, 1035.5, 949.28, 1087.99, 1051.77, 1154.29, 943.1] },
      velocityScore: { '1D': 2.3, '1W': 2.8, '1M': -17.1, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 21.3, revenueGrowth: 346, eps: 44.2, grossMargin: 73, dividendYield: 0.06,
      etfPresence: { SOXX: 8.07, PSI: 5.73, XSD: 2.58, DRAM: 2.99 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.58, proScore: 4.19, coverage: 0.75,
      price: 517.13, weeklyPrices: [540.88, 517.82, 552.05, 516.11, 517.13], weeklyChange: -4.39, dayChange: 0.2, sortRank: 0, periodReturns: { '1M': 5.5, 'YTD': 141.5, '6M': 152.7, '1Y': 275.2 },
      priceHistory: { '1D': [516.11, 515.49, 517.13], '1W': [540.88, 517.82, 552.05, 516.11, 517.13], '1M': [490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 517.13], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 216, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 236.64, 278.26, 305.33, 354.49, 408.46, 449.7, 449.59, 516.1, 490.33, 547.26, 519.85, 580.91, 517.13], '6M': [204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 467.51, 510.13, 490.33, 547.26, 519.85, 580.91, 517.13], '1Y': [137.82, 155.61, 154.72, 177.44, 174.31, 174.95, 166.55, 163.36, 162.32, 155.82, 160.46, 160.9, 161.79, 211.51, 218.09, 238.03, 258.01, 250.05, 237.52, 230.29, 215.05, 215.24, 221.62, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 467.51, 510.13, 490.33, 547.26, 519.85, 580.91, 517.13] },
      velocityScore: { '1D': -0.5, '1W': 6.3, '1M': -6.1, '6M': null }, isNew: false,
      marketCap: '$843B', pe: 173, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 8.35, PSI: 5.6, XSD: 2.8, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 5.07, proScore: 3.8, coverage: 0.75,
      price: 197.13, weeklyPrices: [197.58, 194.83, 195.55, 196.93, 197.13], weeklyChange: -0.23, dayChange: 0.1, sortRank: 0, periodReturns: { '1M': -5.5, 'YTD': 5.7, '6M': 6.5, '1Y': 23.2 },
      priceHistory: { '1D': [196.93, 197.21, 197.13], '1W': [197.58, 194.83, 195.55, 196.93, 197.13], '1M': [208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 196.93, 197.13], 'YTD': [186.5, 185.04, 187.05, 187.67, 191.13, 190.04, 184.97, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 183.91, 198.35, 199.64, 199.57, 211.5, 235.74, 219.51, 211.14, 208.64, 212.45, 200.04, 200.09, 197.13], '6M': [185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 222.32, 215.33, 224.36, 208.64, 212.45, 200.04, 200.09, 197.13], '1Y': [160, 170.7, 167.03, 175.51, 178.26, 183.16, 175.64, 179.81, 170.78, 170.76, 174.88, 178.43, 186.58, 185.04, 180.03, 181.16, 201.03, 198.69, 193.16, 181.36, 182.55, 181.46, 184.97, 177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 222.32, 215.33, 224.36, 208.64, 212.45, 200.04, 200.09, 197.13] },
      velocityScore: { '1D': 7, '1W': 17.6, '1M': 15.9, '6M': null }, isNew: false,
      marketCap: '$4.8T', pe: 30.1, revenueGrowth: 85, eps: 6.54, grossMargin: 74, dividendYield: 0.51,
      etfPresence: { SOXX: 7.79, PSI: 5.01, XSD: 2.4, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.41, proScore: 3.31, coverage: 0.75,
      price: 109.17, weeklyPrices: [127.02, 120.35, 122.20, 110.39, 109.17], weeklyChange: -14.05, dayChange: -1.11, sortRank: 0, periodReturns: { '1M': -1, 'YTD': 195.9, '6M': 165.6, '1Y': 362.8 },
      priceHistory: { '1D': [110.39, 109.18, 109.17], '1W': [127.02, 120.35, 122.2, 110.39, 109.17], '1M': [110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.2, 110.39, 109.17], 'YTD': [36.9, 41.11, 48.32, 45.07, 46.47, 50.24, 46.18, 46.12, 43.1, 46.78, 44.06, 44.06, 44.13, 61.72, 68.5, 66.78, 94.48, 109.62, 115.93, 118.5, 114.68, 110.27, 127.86, 132.28, 139.63, 109.17], '6M': [41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.61, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.17, 119.84, 109.33, 110.27, 127.86, 132.28, 139.63, 109.17], '1Y': [23.59, 22.92, 23.24, 20.41, 20.19, 21.81, 25.31, 24.55, 24.21, 24.44, 25.27, 29.34, 33.55, 37.17, 35.63, 38.12, 41.53, 37.03, 37.88, 34.33, 35.79, 43.47, 40.5, 37.31, 36.35, 36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.17, 119.84, 109.33, 110.27, 127.86, 132.28, 139.63, 109.17] },
      velocityScore: { '1D': -3.8, '1W': -5.2, '1M': -1.5, '6M': null }, isNew: false,
      marketCap: '$549B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 5.82, PSI: 4.89, XSD: 2.53, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.71, proScore: 2.78, coverage: 0.75,
      price: 379.55, weeklyPrices: [388.98, 377.16, 388.83, 379.03, 379.55], weeklyChange: -2.42, dayChange: 0.14, sortRank: 0, periodReturns: { '1M': -6, 'YTD': 40, '6M': 26.9, '1Y': 54.8 },
      priceHistory: { '1D': [379.03, 379.68, 379.55], '1W': [388.98, 377.16, 388.83, 379.03, 379.55], '1M': [403.89, 404.62, 392.67, 412.13, 417.79, 427.58, 416, 414.45, 434.46, 445.48, 407.26, 413.16, 417.93, 386.91, 391.78, 397.17, 388.98, 377.16, 388.83, 379.03, 379.55], 'YTD': [271.2, 299.16, 302.1, 305.6, 310.88, 322.97, 337.51, 356.09, 338.99, 318.81, 313.66, 321.83, 318.14, 351.36, 353.8, 403.88, 402.26, 408.52, 426.79, 384.21, 413.85, 403.89, 427.58, 407.26, 397.17, 379.55], '6M': [299.16, 302.1, 305.6, 310.88, 320.45, 337.1, 355.15, 355.79, 315.81, 306.07, 309.43, 307.44, 327.36, 350.01, 381.05, 392.59, 397.02, 422.73, 418.58, 397.07, 402.69, 403.89, 427.58, 407.26, 397.17, 379.55], '1Y': [245.15, 240.42, 235.5, 230.75, 220.68, 232.04, 230.44, 254.49, 248.32, 248.18, 244.1, 246.78, 245.7, 233.75, 235.4, 246.37, 239.35, 229.38, 233.41, 230.13, 239.4, 272.97, 276.24, 278.4, 276.73, 271.2, 299.16, 302.1, 305.6, 310.88, 320.45, 337.1, 355.03, 355.79, 315.81, 306.07, 309.43, 307.44, 327.36, 350.01, 381.05, 392.59, 397.02, 422.73, 418.58, 397.07, 402.69, 403.89, 427.58, 407.26, 397.17, 379.55] },
      velocityScore: { '1D': 3.7, '1W': 14.9, '1M': 8.2, '6M': null }, isNew: false,
      marketCap: '$185B', pe: 56.6, revenueGrowth: 37, eps: 6.71, grossMargin: 64, dividendYield: 1.16,
      etfPresence: { SOXX: 3.83, PSI: 4.94, XSD: 2.36, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 5.91, proScore: 2.96, coverage: 0.5,
      price: 569.71, weeklyPrices: [650.91, 603.04, 592.79, 554.50, 569.71], weeklyChange: -12.48, dayChange: 2.74, sortRank: 0, periodReturns: { '1M': 15.8, 'YTD': 121.7, '6M': 102.3, '1Y': 192.2 },
      priceHistory: { '1D': [554.5, 567.48, 569.71], '1W': [650.91, 603.04, 592.79, 554.5, 569.71], '1M': [492.17, 499.21, 497.01, 552.64, 567.25, 585.78, 568.23, 592.92, 617.11, 640.18, 585.88, 588.97, 668, 626.84, 694.64, 723, 650.91, 603.04, 592.79, 554.5, 569.71], 'YTD': [256.99, 281.64, 319.08, 322.38, 322.32, 330.57, 359.13, 377.93, 351.32, 345.88, 352.46, 373.99, 341.79, 397.81, 389.9, 403.91, 394.49, 410.64, 440.56, 427.36, 450.06, 492.17, 585.78, 585.88, 723, 569.71], '6M': [281.64, 319.08, 322.38, 322.32, 322.51, 354.91, 373.55, 372.3, 324.74, 341.53, 357.06, 337.17, 352.62, 395.73, 391.62, 404.86, 391.38, 443.62, 413.57, 432.16, 458.17, 492.17, 585.78, 585.88, 723, 569.71], '1Y': [194.99, 199.29, 187.14, 188.41, 179.15, 188.45, 162.22, 161.99, 157.57, 163.5, 173.54, 200.87, 204.74, 211.56, 218.19, 226, 227.64, 230.19, 228.67, 225.12, 230.91, 265.33, 267.14, 258.84, 260.23, 256.99, 281.64, 319.08, 322.38, 322.32, 322.51, 354.91, 375.38, 372.3, 324.74, 341.53, 357.06, 337.17, 352.62, 395.73, 391.62, 404.86, 391.38, 443.62, 413.57, 432.16, 458.17, 492.17, 585.78, 585.88, 723, 569.71] },
      velocityScore: { '1D': 0, '1W': -6.3, '1M': 14.7, '6M': null }, isNew: false,
      marketCap: '$452B', pe: 53.5, revenueGrowth: 11, eps: 10.65, grossMargin: 49, dividendYield: 0.38,
      etfPresence: { SOXX: 5.15, PSI: 6.67, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 5.29, proScore: 2.65, coverage: 0.5,
      price: 218.53, weeklyPrices: [266.19, 235.55, 233.31, 216.47, 218.53], weeklyChange: -17.9, dayChange: 0.95, sortRank: 0, periodReturns: { '1M': 3.7, 'YTD': 79.8, '6M': 65, '1Y': 137.7 },
      priceHistory: { '1D': [216.47, 218.63, 218.53], '1W': [266.19, 235.55, 233.31, 216.47, 218.53], '1M': [210.81, 213.94, 213.56, 241.16, 254.54, 256.42, 237.33, 238.73, 259.56, 269.16, 244.49, 240.48, 258.8, 248.64, 278.39, 301.71, 266.19, 235.55, 233.31, 216.47, 218.53], 'YTD': [121.51, 132.46, 154.5, 151.28, 142.79, 144.02, 147.02, 150.66, 144.13, 145.29, 148.13, 156.62, 147.24, 172.73, 173.49, 181.54, 175.04, 176.32, 189.29, 184.22, 192.17, 210.81, 256.42, 244.49, 301.71, 218.53], '6M': [132.46, 154.5, 151.28, 142.79, 144.29, 146.41, 148.77, 152.46, 134.46, 141.86, 149.87, 144.32, 154.01, 176.88, 180.53, 190, 171.33, 184.52, 175.65, 188.84, 194, 210.81, 256.42, 244.49, 301.71, 218.53], '1Y': [91.92, 93.65, 89.22, 91.61, 88.34, 93.55, 87.61, 87.96, 84.64, 91.77, 99.06, 107.12, 107.86, 108.47, 102.57, 114.74, 120.6, 119.35, 119.09, 112.31, 113.67, 118.99, 122.56, 122.34, 126.88, 121.51, 132.46, 154.5, 151.28, 142.79, 144.29, 146.41, 149.6, 152.46, 134.46, 141.86, 149.87, 144.32, 154.01, 176.88, 180.53, 190, 171.33, 184.52, 175.65, 188.84, 194, 210.81, 256.42, 244.49, 301.71, 218.53] },
      velocityScore: { '1D': -1.1, '1W': -12.5, '1M': 22.1, '6M': null }, isNew: false,
      marketCap: '$285B', pe: 61.9, revenueGrowth: 12, eps: 3.53, grossMargin: 61, dividendYield: 0.43,
      etfPresence: { SOXX: 4.7, PSI: 5.89, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 4.91, proScore: 2.45, coverage: 0.5,
      price: 332.29, weeklyPrices: [391.26, 351.41, 350.20, 326.13, 332.29], weeklyChange: -15.07, dayChange: 1.89, sortRank: 0, periodReturns: { '1M': 2.4, 'YTD': 94.1, '6M': 65.3, '1Y': 232.9 },
      priceHistory: { '1D': [326.13, 331.44, 332.29], '1W': [391.26, 351.41, 350.2, 326.13, 332.29], '1M': [324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82, 379.09, 410.91, 433.33, 391.26, 351.41, 350.2, 326.13, 332.29], 'YTD': [171.18, 200.96, 217.47, 217.94, 233.46, 229.28, 235.58, 244.25, 217.27, 215.23, 226.47, 238.84, 213.66, 258.76, 260.96, 258.56, 257.86, 286.52, 299.15, 302.24, 318.18, 324.45, 388.92, 371.33, 433.33, 332.29], '6M': [200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 242.27, 233.89, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 296.05, 277.96, 305.35, 317.12, 324.45, 388.92, 371.33, 433.33, 332.29], '1Y': [99.83, 101.07, 97.69, 98.94, 96.68, 105.28, 100.33, 101.28, 97.03, 105.57, 120.47, 131.93, 133.9, 140.35, 138.31, 145.04, 155.62, 155.78, 159.18, 143.24, 150.38, 158.19, 165.81, 163.26, 175.16, 171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 244.92, 233.89, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 296.05, 277.96, 305.35, 317.12, 324.45, 388.92, 371.33, 433.33, 332.29] },
      velocityScore: { '1D': -0.8, '1W': -8.2, '1M': 13.4, '6M': null }, isNew: false,
      marketCap: '$416B', pe: 62.9, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.32,
      etfPresence: { SOXX: 4.28, PSI: 5.53, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 4.68, proScore: 2.34, coverage: 0.5,
      price: 380.86, weeklyPrices: [369.34, 360.45, 373.90, 370.78, 380.86], weeklyChange: 3.12, dayChange: 2.72, sortRank: 0, periodReturns: { '1M': -4, 'YTD': 10, '6M': 14.6, '1Y': 40.1 },
      priceHistory: { '1D': [370.78, 379.75, 380.86], '1W': [369.34, 360.45, 373.9, 370.78, 380.86], '1M': [396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 370.78, 380.86], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.3, 343.94, 332.54, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 354.91, 398.47, 419.94, 417.43, 412.56, 439.79, 414.57, 446.77, 396.6, 393.94, 380.15, 377.75, 380.86], '6M': [332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 420.71, 414.14, 459.97, 396.6, 393.94, 380.15, 377.75, 380.86], '1Y': [271.8, 280.94, 278.59, 297.42, 292.93, 312.83, 294.91, 294.23, 298.24, 336.67, 360, 338.94, 329.91, 336.41, 344.13, 342.66, 372.97, 351.94, 351.96, 340.5, 377.96, 381.57, 406.29, 341.3, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 420.71, 414.14, 459.97, 396.6, 393.94, 380.15, 377.75, 380.86] },
      velocityScore: { '1D': 4.9, '1W': 14.1, '1M': 15.8, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63.4, revenueGrowth: 48, eps: 6.01, grossMargin: 76, dividendYield: 0.7,
      etfPresence: { SOXX: 6.93, PSI: false, XSD: 2.44, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 3.47, proScore: 1.74, coverage: 0.5,
      price: 233.75, weeklyPrices: [272.05, 245.29, 249.27, 230.70, 233.75], weeklyChange: -14.08, dayChange: 1.32, sortRank: 0, periodReturns: { '1M': -19.1, 'YTD': 175.1, '6M': 180.1, '1Y': 224.9 },
      priceHistory: { '1D': [230.7, 232.89, 233.75], '1W': [272.05, 245.29, 249.27, 230.7, 233.75], '1M': [288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 245.29, 249.27, 230.7, 233.75], 'YTD': [84.98, 83.45, 80.38, 80.23, 78.92, 82.35, 79.01, 78.39, 77.51, 93.3, 90.79, 92.36, 99.05, 119.93, 133.37, 165.56, 165.15, 160.01, 182.58, 190.69, 205, 288.85, 308.88, 279.04, 297.89, 233.75], '6M': [83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 81.69, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.84, 168.93, 196.33, 219.43, 288.85, 308.88, 279.04, 297.89, 233.75], '1Y': [71.95, 72.41, 71.99, 76.34, 76.63, 77.81, 72.07, 72.95, 64.6, 66.84, 68.86, 74.62, 84.07, 86.97, 86.22, 84.26, 88.46, 87.59, 89.33, 78.68, 83.79, 92.89, 88.9, 84.07, 87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 79.48, 81.69, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.84, 168.93, 196.33, 219.43, 288.85, 308.88, 279.04, 297.89, 233.75] },
      velocityScore: { '1D': -1.7, '1W': -5.4, '1M': -46.6, '6M': null }, isNew: false,
      marketCap: '$204B', pe: 80.3, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.1,
      etfPresence: { SOXX: 4.7, PSI: false, XSD: 2.24, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 3.28, proScore: 1.64, coverage: 0.5,
      price: 296.6, weeklyPrices: [298.41, 293.08, 303.50, 293.30, 296.60], weeklyChange: -0.61, dayChange: 1.13, sortRank: 0, periodReturns: { '1M': 2, 'YTD': 71, '6M': 57.4, '1Y': 36.9 },
      priceHistory: { '1D': [293.3, 297.07, 296.6], '1W': [298.41, 293.08, 303.5, 293.3, 296.6], '1M': [290.9, 288.63, 282.01, 297.1, 301.12, 313.34, 305.71, 301.88, 322.86, 332.28, 304.36, 303.11, 311.81, 285.43, 285.48, 298.07, 298.41, 293.08, 303.5, 293.3, 296.6], 'YTD': [173.49, 188.45, 189.12, 193.31, 215.55, 218.77, 225.69, 213.35, 202.67, 197.46, 194.45, 194.63, 194.14, 214.98, 223.1, 282.23, 281.08, 285.24, 308.17, 298.39, 305.68, 290.9, 313.34, 304.36, 298.07, 296.6], '6M': [188.45, 189.12, 193.31, 215.55, 221.44, 226.16, 219.86, 212.11, 193.23, 190.78, 187.19, 190.33, 199.42, 216.71, 233.7, 269.5, 280.89, 297.76, 300.6, 309.21, 293.2, 290.9, 313.34, 304.36, 298.07, 296.6], '1Y': [216.63, 218.36, 214.92, 191.38, 185.4, 192.97, 195.94, 205.97, 199.81, 185.03, 177.63, 182.04, 183.73, 177.05, 173.94, 180.84, 166.91, 159.36, 159.73, 157.32, 161.26, 175.26, 179.52, 177.56, 177.08, 173.49, 188.45, 189.12, 193.31, 215.55, 221.44, 226.16, 219.73, 212.11, 193.23, 190.78, 187.19, 190.33, 199.42, 216.71, 233.7, 269.5, 280.89, 297.76, 300.6, 309.21, 293.2, 290.9, 313.34, 304.36, 298.07, 296.6] },
      velocityScore: { '1D': 2.5, '1W': 14.7, '1M': 13.9, '6M': null }, isNew: false,
      marketCap: '$270B', pe: 50.8, revenueGrowth: 19, eps: 5.84, grossMargin: 57, dividendYield: 1.94,
      etfPresence: { SOXX: 4.01, PSI: false, XSD: 2.54, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.94, proScore: 1.47, coverage: 0.5,
      price: 275.01, weeklyPrices: [279.18, 273.36, 280.51, 273.15, 275.01], weeklyChange: -1.49, dayChange: 0.68, sortRank: 0, periodReturns: { '1M': -8.7, 'YTD': 26.7, '6M': 15.6, '1Y': 18.4 },
      priceHistory: { '1D': [273.15, 274.83, 275.01], '1W': [279.18, 273.36, 280.51, 273.15, 275.01], '1M': [301.14, 297.41, 285.56, 302.55, 304.86, 315.88, 302.89, 298.2, 313.27, 323.24, 299.94, 294.06, 298.64, 277.02, 278.37, 281.03, 279.18, 273.36, 280.51, 273.15, 275.01], 'YTD': [217.06, 237.89, 238.6, 232.48, 226.14, 228.91, 245.09, 234.63, 215.25, 203.03, 194.02, 196.4, 196.86, 205.67, 213.73, 241.16, 293.59, 290.22, 294.17, 299.38, 321.35, 301.14, 315.88, 299.94, 281.03, 275.01], '6M': [237.89, 238.6, 232.48, 226.14, 224.32, 244.43, 231.16, 227.01, 201.74, 190.86, 191.37, 191.66, 197.08, 208, 221.34, 236.87, 290.76, 305.99, 291.68, 316.47, 311.38, 301.14, 315.88, 299.94, 281.03, 275.01], '1Y': [232.34, 221.06, 228, 226.74, 208.47, 220.05, 229.27, 236.67, 232.66, 223.69, 220.99, 225.62, 227.73, 219.58, 216.11, 222.34, 212.96, 204.42, 202.86, 188.59, 191.56, 215.35, 228.05, 229.75, 225.98, 217.06, 237.89, 238.6, 232.48, 226.14, 224.32, 244.43, 232.27, 227.01, 201.74, 190.86, 191.37, 191.66, 197.08, 208, 221.34, 236.87, 290.76, 305.99, 291.68, 316.47, 311.38, 301.14, 315.88, 299.94, 281.03, 275.01] },
      velocityScore: { '1D': 2.8, '1W': 13.1, '1M': 2.1, '6M': null }, isNew: false,
      marketCap: '$69B', pe: 27, revenueGrowth: 12, eps: 10.19, grossMargin: 56, dividendYield: 1.48,
      etfPresence: { SOXX: 3.55, PSI: false, XSD: 2.34, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 2.81, proScore: 1.41, coverage: 0.5,
      price: 392, weeklyPrices: [430.86, 406.42, 432.74, 382.89, 392.00], weeklyChange: -9.02, dayChange: 2.38, sortRank: 0, periodReturns: { '1M': 13.2, 'YTD': 135.6, '6M': 150.1, '1Y': 324.7 },
      priceHistory: { '1D': [382.89, 389.8, 392], '1W': [430.86, 406.42, 432.74, 382.89, 392], '1M': [346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42, 432.74, 382.89, 392], 'YTD': [166.36, 156.73, 174.45, 169.66, 150.62, 187.67, 123.69, 128.4, 109.8, 116.48, 127.57, 121.76, 109.6, 129.46, 170.81, 197.54, 194.74, 195.65, 228.64, 297.84, 342.85, 346.33, 389.2, 397.02, 483.02, 392], '6M': [156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 118.83, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 215.58, 306.88, 320.09, 346.33, 389.2, 397.02, 483.02, 392], '1Y': [92.3, 92.36, 116.91, 118.41, 135.54, 192, 171.06, 174.15, 174.24, 214.49, 238.79, 230.11, 195.8, 212.1, 161.55, 157.51, 168.25, 179.31, 167.55, 139.52, 147.75, 142.94, 167.08, 144.94, 168.83, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 129.68, 118.83, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 215.58, 306.88, 320.09, 346.33, 389.2, 397.02, 483.02, 392] },
      velocityScore: { '1D': -6, '1W': -7.2, '1M': -11.3, '6M': null }, isNew: false,
      marketCap: '$67B', pe: 263.1, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.78, PSI: false, XSD: 2.84, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.69, proScore: 1.35, coverage: 0.5,
      price: 184.35, weeklyPrices: [181.92, 176.25, 186.48, 182.97, 184.35], weeklyChange: 1.34, dayChange: 0.75, sortRank: 0, periodReturns: { '1M': -15.3, 'YTD': 7.8, '6M': 1.4, '1Y': 15.6 },
      priceHistory: { '1D': [182.97, 184.34, 184.35], '1W': [181.92, 176.25, 186.48, 182.97, 184.35], '1M': [217.77, 205.42, 191.2, 202.96, 211.72, 220.81, 214.07, 212.97, 226.11, 221.9, 204.13, 197.41, 204.9, 189.39, 188.72, 184.79, 181.92, 176.25, 186.48, 182.97, 184.35], 'YTD': [171.05, 181.87, 161.39, 155.82, 151.59, 138.93, 142.63, 144.78, 138.13, 135.2, 131.59, 128.67, 128.78, 127.75, 134.47, 133.95, 179.58, 202.55, 200.08, 213.41, 251.02, 217.77, 220.81, 204.13, 184.79, 184.35], '6M': [181.87, 161.39, 155.82, 151.59, 137.34, 140.7, 140.41, 142.36, 135.69, 129.82, 129.9, 127.11, 125.73, 131.24, 137.52, 150.26, 168.38, 237.53, 203.64, 238.16, 228.99, 217.77, 220.81, 204.13, 184.79, 184.35], '1Y': [159.45, 154.3, 157.99, 162.08, 146.71, 153.73, 156.25, 156.42, 158.78, 158.66, 164.14, 169.53, 166.36, 165.46, 161.74, 168.83, 181.03, 172.84, 173.98, 165.06, 165.06, 170.7, 176, 176.12, 174.75, 171.05, 181.87, 161.39, 155.82, 151.59, 137.34, 140.7, 142.88, 142.36, 135.69, 129.82, 129.9, 127.11, 125.73, 131.24, 137.52, 150.26, 168.38, 237.53, 203.64, 238.16, 228.99, 217.77, 220.81, 204.13, 184.79, 184.35] },
      velocityScore: { '1D': 3.8, '1W': 15.4, '1M': -17.2, '6M': null }, isNew: false,
      marketCap: '$194B', pe: 20.2, revenueGrowth: -4, eps: 9.13, grossMargin: 55, dividendYield: 2.01,
      etfPresence: { SOXX: 3.04, PSI: false, XSD: 2.35, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.62, proScore: 1.31, coverage: 0.5,
      price: 1297.26, weeklyPrices: [1331.73, 1288.16, 1346.13, 1272.81, 1297.26], weeklyChange: -2.59, dayChange: 1.92, sortRank: 0, periodReturns: { '1M': -16.8, 'YTD': 43.1, '6M': 35.3, '1Y': 70.4 },
      priceHistory: { '1D': [1272.81, 1289.86, 1297.26], '1W': [1331.73, 1288.16, 1346.13, 1272.81, 1297.26], '1M': [1559.18, 1531.98, 1473.04, 1589.55, 1577.32, 1652.29, 1498.77, 1448.21, 1563.7, 1537.88, 1423.76, 1434.95, 1438.3, 1313.32, 1312.77, 1382.36, 1331.73, 1288.16, 1346.13, 1272.81, 1297.26], 'YTD': [906.36, 959.09, 1009.54, 1063.74, 1124.15, 1206.18, 1173.18, 1213.67, 1074.37, 1055.82, 1066.66, 1101.59, 1093.35, 1334.21, 1402.81, 1592.17, 1614.41, 1575.96, 1613.97, 1561.25, 1566.21, 1559.18, 1652.29, 1423.76, 1382.36, 1297.26], '6M': [959.09, 1009.54, 1063.74, 1124.15, 1229.82, 1171.47, 1190.06, 1142.74, 1023.16, 1052.59, 1068.85, 1053.01, 1180.03, 1372.23, 1490.86, 1587.57, 1573.3, 1661.1, 1486.33, 1589.81, 1542.39, 1559.18, 1652.29, 1423.76, 1382.36, 1297.26], '1Y': [761.31, 717.62, 719.98, 724.37, 802.78, 840.56, 844.8, 837.86, 823.65, 857.87, 857.02, 914.27, 920.64, 945.49, 968.25, 1028.67, 1086.36, 957.87, 954.71, 856.96, 892.97, 952.18, 962.95, 951.36, 943.55, 906.36, 959.09, 1009.54, 1063.74, 1124.15, 1229.82, 1171.47, 1204.1, 1142.74, 1023.16, 1052.59, 1068.85, 1053.01, 1180.03, 1372.23, 1490.86, 1587.57, 1573.3, 1661.1, 1486.33, 1589.81, 1542.39, 1559.18, 1652.29, 1423.76, 1382.36, 1297.26] },
      velocityScore: { '1D': 0, '1W': 6.5, '1M': -5.8, '6M': null }, isNew: false,
      marketCap: '$64B', pe: 92.7, revenueGrowth: 26, eps: 14, grossMargin: 55, dividendYield: 0.63,
      etfPresence: { SOXX: 3.13, PSI: false, XSD: 2.11, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.33, proScore: 1.17, coverage: 0.5,
      price: 84.02, weeklyPrices: [88.69, 84.64, 87.59, 84.15, 84.02], weeklyChange: -5.27, dayChange: -0.16, sortRank: 0, periodReturns: { '1M': -8, 'YTD': 31.9, '6M': 14.3, '1Y': 12.7 },
      priceHistory: { '1D': [84.15, 84.17, 84.02], '1W': [88.69, 84.64, 87.59, 84.15, 84.02], '1M': [91.37, 91.47, 87.91, 92.94, 95.24, 100.32, 95.63, 94.11, 99.77, 102.71, 93.26, 92.48, 94.12, 87.93, 89.06, 91.2, 88.69, 84.64, 87.59, 84.15, 84.02], 'YTD': [63.72, 73.53, 74.45, 74.71, 75.92, 74.41, 78.94, 75.93, 71.39, 65.33, 64.59, 65.63, 64.61, 71.22, 76.87, 90.64, 92.91, 101.58, 97.04, 91.11, 94.65, 91.37, 100.32, 93.26, 91.2, 84.02], '6M': [73.53, 74.45, 74.71, 75.92, 76.01, 78.56, 76.6, 74.64, 64.77, 61.94, 62.97, 62, 67.22, 73.55, 80.39, 86.84, 95.3, 99.03, 92.76, 93.43, 91.52, 91.37, 100.32, 93.26, 91.2, 84.02], '1Y': [74.56, 73.11, 75.26, 70.68, 67.13, 64.5, 64.71, 68.55, 63.6, 64.76, 64.45, 64.71, 64.22, 64.96, 64.6, 67.52, 63.64, 59.5, 54.71, 50.87, 51.25, 56.71, 66.85, 65.9, 65.35, 63.72, 73.53, 74.45, 74.71, 75.92, 76.01, 78.56, 77.73, 74.64, 64.77, 61.94, 62.97, 62, 67.22, 73.55, 80.39, 86.84, 95.3, 99.03, 92.76, 93.43, 91.52, 91.37, 100.32, 93.26, 91.2, 84.02] },
      velocityScore: { '1D': 1.7, '1W': 7.3, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$46B', pe: 400.1, revenueGrowth: 35, eps: 0.21, grossMargin: 58, dividendYield: 2.16,
      etfPresence: { SOXX: 2.32, PSI: false, XSD: 2.35, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.33, proScore: 1.17, coverage: 0.5,
      price: 255.46, weeklyPrices: [259.09, 241.91, 265.55, 246.40, 255.46], weeklyChange: -1.4, dayChange: 3.67, sortRank: 0, periodReturns: { '1M': 14.9, 'YTD': 77.5, '6M': 80.4, '1Y': 173.6 },
      priceHistory: { '1D': [246.4, 252.04, 255.46], '1W': [259.09, 241.91, 265.55, 246.4, 255.46], '1M': [222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 265.55, 246.4, 255.46], 'YTD': [143.89, 141.59, 149.12, 133.16, 125.28, 123.41, 124.8, 120.83, 97.3, 112.33, 104.06, 100.3, 93.87, 107.93, 158.93, 185.54, 174.01, 188.29, 184.54, 193.39, 236.03, 222.27, 259.41, 272.01, 271.95, 255.46], '6M': [141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 112.27, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 156.27, 218.41, 226.1, 222.27, 259.41, 272.01, 271.95, 255.46], '1Y': [93.36, 102.59, 92.93, 109.38, 110.29, 125.38, 106.3, 115.41, 124.27, 149.03, 164.42, 162.26, 145.61, 137.2, 129.75, 144.17, 162.18, 164.23, 158.5, 139.56, 150.85, 188.44, 170.29, 140.34, 147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.06, 112.27, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 156.27, 218.41, 226.1, 222.27, 259.41, 272.01, 271.95, 255.46] },
      velocityScore: { '1D': -0.8, '1W': 5.4, '1M': 0.9, '6M': null }, isNew: false,
      marketCap: '$48B', pe: 101.8, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 2.12, PSI: false, XSD: 2.54, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 1.93, proScore: 0.97, coverage: 0.5,
      price: 91.6, weeklyPrices: [94.63, 91.22, 94.69, 91.10, 91.60], weeklyChange: -3.2, dayChange: 0.55, sortRank: 0, periodReturns: { '1M': -24.2, 'YTD': 69.2, '6M': 50.4, '1Y': 59 },
      priceHistory: { '1D': [91.1, 91.53, 91.6], '1W': [94.63, 91.22, 94.69, 91.1, 91.6], '1M': [120.9, 117, 110.17, 115.96, 116.79, 125.9, 118.25, 112.92, 121.62, 131.55, 117.06, 115.74, 118.74, 90.65, 88.57, 94.54, 94.63, 91.22, 94.69, 91.1, 91.6], 'YTD': [54.15, 60.89, 60.28, 61.98, 59.89, 65.1, 71.96, 70.03, 63.42, 59.59, 60.98, 62.34, 61.92, 68.49, 79.93, 97.78, 100.81, 100.61, 118.37, 109.61, 120.62, 120.9, 125.9, 117.06, 94.54, 91.6], '6M': [60.89, 60.28, 61.98, 59.89, 65.2, 72.21, 69.47, 66.48, 56.87, 58.55, 59.26, 58.35, 63.49, 71.02, 85.56, 98.04, 102.04, 107.24, 109.43, 116.2, 120.92, 120.9, 125.9, 117.06, 94.54, 91.6], '1Y': [57.62, 58.93, 62.45, 58.38, 47.24, 50.01, 49.77, 50.95, 48.94, 48.62, 49.56, 50.42, 49.31, 48.17, 49.54, 55.08, 51.8, 48.28, 48.43, 45.56, 47.39, 51.48, 55.23, 54.56, 55.69, 54.15, 60.89, 60.28, 61.98, 59.89, 65.2, 72.21, 69.11, 66.48, 56.87, 58.55, 59.26, 58.35, 63.49, 71.02, 85.56, 98.04, 102.04, 107.24, 109.43, 116.2, 120.92, 120.9, 125.9, 117.06, 94.54, 91.6] },
      velocityScore: { '1D': 2.1, '1W': 12.8, '1M': -30.7, '6M': null }, isNew: false,
      marketCap: '$36B', pe: 67.4, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 1.84, PSI: false, XSD: 2.02, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.6, proScore: 0.8, coverage: 0.5,
      price: 307.5, weeklyPrices: [350.63, 322.26, 327.64, 304.82, 307.50], weeklyChange: -12.3, dayChange: 0.88, sortRank: 0, periodReturns: { '1M': -15, 'YTD': 79.5, '6M': 83.4, '1Y': 123.8 },
      priceHistory: { '1D': [304.82, 305.39, 307.5], '1W': [350.63, 322.26, 327.64, 304.82, 307.5], '1M': [361.86, 358.72, 354.4, 374.76, 379.87, 384.77, 368.32, 367.11, 391.41, 396.26, 372.15, 373.08, 390.19, 369.18, 372.59, 380.37, 350.63, 322.26, 327.64, 304.82, 307.5], 'YTD': [171.28, 167.66, 218.93, 219.26, 219.06, 235.7, 245.59, 248.29, 241.01, 220.59, 221.29, 237.23, 222.07, 247.71, 261.42, 284.4, 281.61, 344.47, 383.56, 380.45, 364.64, 361.86, 384.77, 372.15, 380.37, 307.5], '6M': [167.66, 218.93, 219.26, 219.06, 235.87, 244.16, 245.53, 248.12, 207.51, 217.8, 218.96, 225.44, 233.04, 263.63, 281.08, 279.44, 291.72, 365.88, 356.25, 385.98, 353.79, 361.86, 384.77, 372.15, 380.37, 307.5], '1Y': [137.37, 137.3, 136.76, 140.02, 137.28, 125.45, 121, 126.69, 131.05, 129.79, 131.18, 128.8, 124.49, 127.97, 131.54, 139.41, 147.88, 144.13, 169.98, 158.22, 165.97, 177.91, 188.08, 175.69, 176.28, 171.28, 167.66, 218.93, 219.26, 219.06, 235.87, 244.16, 243.59, 248.12, 207.51, 217.8, 218.96, 225.44, 233.04, 263.63, 281.08, 279.44, 291.72, 365.88, 356.25, 385.98, 353.79, 361.86, 384.77, 372.15, 380.37, 307.5] },
      velocityScore: { '1D': -1.2, '1W': -7, '1M': -14, '6M': null }, isNew: false,
      marketCap: '$23B', pe: 130.9, revenueGrowth: 23, eps: 2.35, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.09, PSI: false, XSD: 2.1, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SWKS', name: 'SKYWORKS SOLUTIONS INC', easyScore: 2, avgWeight: 1.27, proScore: 0.64, coverage: 0.5,
      price: 59.01, weeklyPrices: [65.93, 62.56, 61.91, 59.76, 59.01], weeklyChange: -10.5, dayChange: -1.26, sortRank: 0, periodReturns: { '1M': -21.7, 'YTD': -6.9, '6M': -2.7, '1Y': -24.3 },
      priceHistory: { '1D': [59.76, 58.88, 59.01], '1W': [65.93, 62.56, 61.91, 59.76, 59.01], '1M': [75.37, 73.56, 70.29, 72.73, 73.97, 76.26, 71.42, 69.38, 72.45, 76.18, 73.44, 71.4, 69.94, 68, 67.71, 67.8, 65.93, 62.56, 61.91, 59.76, 59.01], 'YTD': [63.41, 60.66, 58.46, 58.96, 55.76, 61.55, 62.16, 59.9, 58.15, 54.93, 53.71, 55.36, 53.55, 56.56, 58.7, 61.55, 70.17, 65.04, 67.06, 73.54, 77.85, 75.37, 76.26, 73.44, 67.8, 59.01], '6M': [60.66, 58.46, 58.96, 55.76, 62.1, 62.1, 59.78, 59.58, 54.81, 54.74, 54.44, 53.65, 55.97, 56.5, 59.46, 62.12, 68.85, 70.13, 70.35, 82.42, 75.49, 75.37, 76.26, 73.44, 67.8, 59.01], '1Y': [77.94, 72.97, 73.38, 71.94, 67.63, 71.69, 74.93, 76.76, 73.07, 75.06, 74.22, 81.26, 76.98, 74.34, 72.77, 76.4, 80.26, 71.99, 68.85, 62.32, 63.05, 68.24, 68.54, 66.02, 64.48, 63.41, 60.66, 58.46, 58.96, 55.76, 62.1, 62.1, 60.05, 59.58, 54.81, 54.74, 54.44, 53.65, 55.97, 56.5, 59.46, 62.12, 68.85, 70.13, 70.35, 82.42, 75.49, 75.37, 76.26, 73.44, 67.8, 59.01] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$9B', pe: 25.4, revenueGrowth: -1, eps: 2.32, grossMargin: 41, dividendYield: 4.75,
      etfPresence: { SOXX: 0.47, PSI: false, XSD: 2.08, DRAM: false },
      tonyNote: 'SKYWORKS SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 8, avgWeight: 5.86, proScore: 2.76, coverage: 0.471,
      price: 943.1, weeklyPrices: [1032.28, 975.56, 984.75, 938.38, 943.10], weeklyChange: -8.64, dayChange: 0.5, sortRank: 0, periodReturns: { '1M': -0.7, 'YTD': 230.4, '6M': 188.4, '1Y': 658 },
      priceHistory: { '1D': [938.38, 938.28, 943.1], '1W': [1032.28, 975.56, 984.75, 938.38, 943.1], '1M': [949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 943.1], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 421.51, 457.23, 481.72, 517.16, 646.63, 776.01, 762.1, 971, 949.28, 1087.99, 1051.77, 1154.29, 943.1], '6M': [327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 751, 1035.5, 949.28, 1087.99, 1051.77, 1154.29, 943.1], '1Y': [124.42, 120.11, 109.22, 111.96, 109.06, 127.75, 122.05, 116.42, 118.48, 135.24, 158.82, 166.41, 167.32, 185.69, 187.06, 202.29, 221.91, 218.03, 241.11, 228.5, 223.93, 239.49, 252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 751, 1035.5, 949.28, 1087.99, 1051.77, 1154.29, 943.1] },
      velocityScore: { '1D': 0, '1W': -12.9, '1M': 15, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 21.3, revenueGrowth: 346, eps: 44.2, grossMargin: 73, dividendYield: 0.06,
      etfPresence: { PTF: 4.98, WCLD: false, IGV: false, FDTX: 9.33, GTEK: false, ARKK: false, MARS: false, FRWD: 4.54, BCTK: 4.22, FWD: false, CBSE: false, FCUS: 4.49, WGMI: false, CNEQ: 1.59, SGRT: 6.97, SPMO: 10.74, XMMO: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 8, avgWeight: 3.66, proScore: 1.72, coverage: 0.471,
      price: 517.13, weeklyPrices: [540.88, 517.82, 552.05, 516.11, 517.13], weeklyChange: -4.39, dayChange: 0.2, sortRank: 0, periodReturns: { '1M': 5.5, 'YTD': 141.5, '6M': 152.7, '1Y': 275.2 },
      priceHistory: { '1D': [516.11, 515.49, 517.13], '1W': [540.88, 517.82, 552.05, 516.11, 517.13], '1M': [490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 517.13], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 216, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 236.64, 278.26, 305.33, 354.49, 408.46, 449.7, 449.59, 516.1, 490.33, 547.26, 519.85, 580.91, 517.13], '6M': [204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 467.51, 510.13, 490.33, 547.26, 519.85, 580.91, 517.13], '1Y': [137.82, 155.61, 154.72, 177.44, 174.31, 174.95, 166.55, 163.36, 162.32, 155.82, 160.46, 160.9, 161.79, 211.51, 218.09, 238.03, 258.01, 250.05, 237.52, 230.29, 215.05, 215.24, 221.62, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 467.51, 510.13, 490.33, 547.26, 519.85, 580.91, 517.13] },
      velocityScore: { '1D': 0.6, '1W': -2.8, '1M': 1.2, '6M': null }, isNew: false,
      marketCap: '$843B', pe: 173, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: 3.05, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.21, MARS: false, FRWD: 7.7, BCTK: 3.43, FWD: 2.29, CBSE: false, FCUS: false, WGMI: false, CNEQ: 1.08, SGRT: 3.41, SPMO: 4.14, XMMO: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 7, avgWeight: 6.15, proScore: 2.53, coverage: 0.412,
      price: 197.13, weeklyPrices: [197.58, 194.83, 195.55, 196.93, 197.13], weeklyChange: -0.23, dayChange: 0.1, sortRank: 0, periodReturns: { '1M': -5.5, 'YTD': 5.7, '6M': 6.5, '1Y': 23.2 },
      priceHistory: { '1D': [196.93, 197.21, 197.13], '1W': [197.58, 194.83, 195.55, 196.93, 197.13], '1M': [208.64, 208.19, 200.42, 204.87, 205.19, 212.45, 207.41, 204.65, 210.69, 208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 196.93, 197.13], 'YTD': [186.5, 185.04, 187.05, 187.67, 191.13, 190.04, 184.97, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 183.91, 198.35, 199.64, 199.57, 211.5, 235.74, 219.51, 211.14, 208.64, 212.45, 200.04, 200.09, 197.13], '6M': [185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 222.32, 215.33, 224.36, 208.64, 212.45, 200.04, 200.09, 197.13], '1Y': [160, 170.7, 167.03, 175.51, 178.26, 183.16, 175.64, 179.81, 170.78, 170.76, 174.88, 178.43, 186.58, 185.04, 180.03, 181.16, 201.03, 198.69, 193.16, 181.36, 182.55, 181.46, 184.97, 177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 222.32, 215.33, 224.36, 208.64, 212.45, 200.04, 200.09, 197.13] },
      velocityScore: { '1D': -3.8, '1W': -18.1, '1M': 11, '6M': null }, isNew: false,
      marketCap: '$4.8T', pe: 30.1, revenueGrowth: 85, eps: 6.54, grossMargin: 74, dividendYield: 0.51,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.09, GTEK: false, ARKK: 1.54, MARS: false, FRWD: 8.22, BCTK: 5.7, FWD: false, CBSE: false, FCUS: false, WGMI: 2.33, CNEQ: 13.36, SGRT: false, SPMO: 7.78, XMMO: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 7, avgWeight: 5, proScore: 2.06, coverage: 0.412,
      price: 560.01, weeklyPrices: [598.37, 539.00, 577.46, 532.10, 560.01], weeklyChange: -6.41, dayChange: 5.25, sortRank: 0, periodReturns: { '1M': 6.3, 'YTD': 225.1, '6M': 198.4, '1Y': 774.7 },
      priceHistory: { '1D': [532.1, 554.77, 560.01], '1W': [598.37, 539, 577.46, 532.1, 560.01], '1M': [526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 532.1, 560.01], 'YTD': [172.27, 187.68, 222.1, 236.39, 250.23, 285.99, 284.11, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 337.88, 361.69, 403.12, 434.52, 463.91, 489.15, 486.46, 531.21, 526.93, 653.53, 670.75, 638.72, 560.01], '6M': [187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 458.68, 484.28, 546.2, 526.93, 653.53, 670.75, 638.72, 560.01], '1Y': [64.02, 67.53, 67.06, 70.61, 75.84, 75.91, 75.86, 79.22, 81.91, 94.54, 103.09, 110.25, 120.06, 119.93, 113.13, 121.41, 124.92, 152.18, 169.99, 152.86, 150.93, 159.99, 169.54, 174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 458.68, 484.28, 546.2, 526.93, 653.53, 670.75, 638.72, 560.01] },
      velocityScore: { '1D': -0.5, '1W': 0, '1M': 46.1, '6M': null }, isNew: false,
      marketCap: '$193B', pe: 33.5, revenueGrowth: 46, eps: 16.71, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { PTF: 4.32, WCLD: false, IGV: false, FDTX: 4.49, GTEK: false, ARKK: false, MARS: false, FRWD: 4.56, BCTK: false, FWD: false, CBSE: false, FCUS: 4.71, WGMI: false, CNEQ: 4.5, SGRT: 10.65, SPMO: 1.79, XMMO: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 7, avgWeight: 4.48, proScore: 1.84, coverage: 0.412,
      price: 436.29, weeklyPrices: [444.23, 434.16, 451.79, 432.57, 436.29], weeklyChange: -1.79, dayChange: 0.84, sortRank: 0, periodReturns: { '1M': 2.2, 'YTD': 43.6, '6M': 37.2, '1Y': 91.5 },
      priceHistory: { '1D': [432.66, 435.62, 436.29], '1W': [444.23, 434.16, 451.79, 432.57, 436.29], '1M': [426.8, 427.92, 408.75, 421.07, 423.93, 441.4, 425.83, 432.15, 462.12, 467.67, 436.39, 440.83, 434.99, 432.35, 455.1, 477.57, 444.23, 434.16, 451.79, 432.57, 436.29], 'YTD': [303.89, 318.01, 341.64, 334.87, 330.56, 355.41, 364.2, 385.75, 353.13, 347.09, 345.98, 343.25, 337.95, 365.49, 363.35, 382.66, 396.06, 414.15, 417.72, 407.15, 418.45, 426.8, 441.4, 436.39, 477.57, 436.29], '6M': [318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.04, 374.58, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 401.61, 404.54, 395.95, 404.52, 435.63, 426.8, 441.4, 436.39, 477.57, 436.29], '1Y': [227.86, 236.95, 234.6, 241.33, 232.47, 244.29, 232.7, 235.59, 228.39, 250.92, 262.06, 282.71, 279.29, 294.03, 295.94, 294.51, 301.53, 294.05, 291.17, 277.91, 284.64, 292.09, 303.41, 286.87, 296.95, 303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.54, 374.58, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 401.61, 404.54, 395.95, 404.52, 435.63, 426.8, 441.4, 436.39, 477.57, 436.29] },
      velocityScore: { '1D': 0, '1W': 10.2, '1M': 11.5, '6M': null }, isNew: false,
      marketCap: '$2.3T', pe: 37.9, revenueGrowth: 35, eps: 11.51, grossMargin: 62, dividendYield: 0.88,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6.39, GTEK: false, ARKK: 0.91, MARS: false, FRWD: 6.19, BCTK: 8.79, FWD: false, CBSE: 2.58, FCUS: false, WGMI: 0.72, CNEQ: 5.75, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 7, avgWeight: 3.61, proScore: 1.49, coverage: 0.412,
      price: 380.86, weeklyPrices: [369.34, 360.45, 373.90, 370.78, 380.86], weeklyChange: 3.12, dayChange: 2.72, sortRank: 0, periodReturns: { '1M': -4, 'YTD': 10, '6M': 14.6, '1Y': 40.1 },
      priceHistory: { '1D': [370.78, 379.75, 380.86], '1W': [369.34, 360.45, 373.9, 370.78, 380.86], '1M': [396.6, 392.16, 372.1, 385.57, 382.07, 393.94, 376.71, 392.9, 411.35, 392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 370.78, 380.86], 'YTD': [346.1, 332.48, 343.02, 320.05, 331.3, 343.94, 332.54, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 354.91, 398.47, 419.94, 417.43, 412.56, 439.79, 414.57, 446.77, 396.6, 393.94, 380.15, 377.75, 380.86], '6M': [332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 420.71, 414.14, 459.97, 396.6, 393.94, 380.15, 377.75, 380.86], '1Y': [271.8, 280.94, 278.59, 297.42, 292.93, 312.83, 294.91, 294.23, 298.24, 336.67, 360, 338.94, 329.91, 336.41, 344.13, 342.66, 372.97, 351.94, 351.96, 340.5, 377.96, 381.57, 406.29, 341.3, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 420.71, 414.14, 459.97, 396.6, 393.94, 380.15, 377.75, 380.86] },
      velocityScore: { '1D': 1.4, '1W': 0, '1M': 14.6, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 63.4, revenueGrowth: 48, eps: 6.01, grossMargin: 76, dividendYield: 0.7,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.62, GTEK: false, ARKK: 1.04, MARS: false, FRWD: 4.77, BCTK: 6.62, FWD: 1.87, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.25, SGRT: false, SPMO: 6.09, XMMO: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'SPCX', name: 'SPACE EXPLORATION TECHN-CL A', easyScore: 6, avgWeight: 6.99, proScore: 2.47, coverage: 0.353,
      price: 152.04, weeklyPrices: [157.54, 162.00, 160.42, 149.47, 152.04], weeklyChange: -3.49, dayChange: 1.72, sortRank: 0, periodReturns: { '1M': -5.5, 'YTD': -5.5, '6M': -5.5, '1Y': -5.5 },
      priceHistory: { '1D': [149.47, 151.69, 152.04], '1W': [157.54, 162, 160.42, 149.47, 152.04], '1M': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 152.04], 'YTD': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 152.04], '6M': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 152.04], '1Y': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 152.04] },
      velocityScore: { '1D': 2.5, '1W': -2.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$2.0T', pe: null, revenueGrowth: 15, eps: -0.67, grossMargin: 49, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4, MARS: 22.07, FRWD: 2.43, BCTK: 8.41, FWD: 1.79, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.24, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'SPACE EXPLORATION TECHN-CL A appears in 6 of 17 Broad Tech ETFs (35% coverage) with average weight 7.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 6, avgWeight: 3.14, proScore: 1.11, coverage: 0.353,
      price: 241.86, weeklyPrices: [241.70, 242.67, 244.16, 245.98, 241.86], weeklyChange: 0.07, dayChange: -1.67, sortRank: 0, periodReturns: { '1M': -1.4, 'YTD': 4.8, '6M': -1.8, '1Y': 10.3 },
      priceHistory: { '1D': [245.98, 241.87, 241.86], '1W': [241.7, 242.67, 244.16, 245.98, 241.86], '1M': [245.22, 244.19, 238, 241.51, 238.55, 246.02, 246, 237.5, 244.39, 232.79, 234.11, 234.27, 227.01, 232.69, 240.14, 238.34, 241.7, 242.67, 244.16, 245.98, 241.86], 'YTD': [230.82, 246.29, 238.18, 239.16, 239.3, 208.72, 201.15, 208.56, 208.73, 214.33, 215.2, 207.24, 208.27, 233.65, 249.7, 255.08, 265.06, 271.17, 267.22, 268.46, 270.64, 245.22, 246.02, 234.11, 238.34, 241.86], '6M': [246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 205.27, 210, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 272.05, 268.99, 264.86, 266.32, 261.26, 245.22, 246.02, 234.11, 238.34, 241.86], '1Y': [219.36, 226.35, 227.47, 231.01, 213.75, 221.47, 228.01, 227.94, 225.34, 238.24, 234.05, 220.71, 219.57, 221.78, 216.39, 222.03, 229.25, 249.32, 249.1, 222.55, 226.28, 234.42, 227.92, 222.56, 232.14, 230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 210.11, 210, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 272.05, 268.99, 264.86, 266.32, 261.26, 245.22, 246.02, 234.11, 238.34, 241.86] },
      velocityScore: { '1D': 0.9, '1W': -1.8, '1M': -9, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 31.1, revenueGrowth: 17, eps: 7.77, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.29, GTEK: false, ARKK: 2.4, MARS: false, FRWD: 2.99, BCTK: 4.27, FWD: 1.53, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.35, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'LRCX', name: 'Lam Research Corp', easyScore: 5, avgWeight: 4.35, proScore: 1.28, coverage: 0.294,
      price: 332.29, weeklyPrices: [391.26, 351.41, 350.20, 326.13, 332.29], weeklyChange: -15.07, dayChange: 1.89, sortRank: 0, periodReturns: { '1M': 2.4, 'YTD': 94.1, '6M': 65.3, '1Y': 232.9 },
      priceHistory: { '1D': [326.13, 331.44, 332.29], '1W': [391.26, 351.41, 350.2, 326.13, 332.29], '1M': [324.45, 327.16, 321.8, 362.52, 366.81, 388.92, 369.34, 374.18, 389.04, 409.54, 371.33, 374.8, 401.82, 379.09, 410.91, 433.33, 391.26, 351.41, 350.2, 326.13, 332.29], 'YTD': [171.18, 200.96, 217.47, 217.94, 233.46, 229.28, 235.58, 244.25, 217.27, 215.23, 226.47, 238.84, 213.66, 258.76, 260.96, 258.56, 257.86, 286.52, 299.15, 302.24, 318.18, 324.45, 388.92, 371.33, 433.33, 332.29], '6M': [200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 242.27, 233.89, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 296.05, 277.96, 305.35, 317.12, 324.45, 388.92, 371.33, 433.33, 332.29], '1Y': [99.83, 101.07, 97.69, 98.94, 96.68, 105.28, 100.33, 101.28, 97.03, 105.57, 120.47, 131.93, 133.9, 140.35, 138.31, 145.04, 155.62, 155.78, 159.18, 143.24, 150.38, 158.19, 165.81, 163.26, 175.16, 171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 244.92, 233.89, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 296.05, 277.96, 305.35, 317.12, 324.45, 388.92, 371.33, 433.33, 332.29] },
      velocityScore: { '1D': -1.5, '1W': -9.2, '1M': 16.4, '6M': null }, isNew: false,
      marketCap: '$416B', pe: 62.9, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.32,
      etfPresence: { PTF: 3.03, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.57, BCTK: 7.41, FWD: 1.86, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 3.89, XMMO: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 5, avgWeight: 4.28, proScore: 1.26, coverage: 0.294,
      price: 852.89, weeklyPrices: [915.19, 820.16, 868.26, 827.64, 852.89], weeklyChange: -6.81, dayChange: 3.05, sortRank: 0, periodReturns: { '1M': -2.7, 'YTD': 209.7, '6M': 199.8, '1Y': 490.4 },
      priceHistory: { '1D': [827.64, 851.39, 852.89], '1W': [915.19, 820.16, 868.26, 827.64, 852.89], '1M': [876.77, 846.01, 815.99, 868.09, 931.04, 1018.8, 1031.34, 1066.07, 1070.23, 1094.04, 1038.59, 993.25, 1025.36, 899.9, 968.53, 965, 915.19, 820.16, 868.26, 827.64, 852.89], 'YTD': [275.39, 284.47, 320.32, 346.1, 407.69, 425, 415.94, 396.02, 357.62, 384.29, 421.09, 424.96, 391.76, 500.77, 531.81, 587.62, 673.64, 766.44, 804.76, 810.46, 879.8, 876.77, 1018.8, 1038.59, 965, 852.89], '6M': [284.47, 320.32, 346.1, 407.69, 429.32, 425.99, 407.4, 407.84, 352.8, 383.71, 411.23, 380.07, 453.3, 513.28, 539.75, 595.86, 738.54, 834.01, 740.84, 812.73, 921.26, 876.77, 1018.8, 1038.59, 965, 852.89], '1Y': [144.47, 149.05, 146.59, 152.68, 151.74, 155.59, 157.93, 164, 170.5, 191.59, 211.13, 228.13, 236.06, 225.01, 211.63, 214.57, 223, 250.38, 288, 253.86, 253.38, 266.87, 282.86, 288.13, 282.8, 275.39, 284.47, 320.32, 346.1, 407.69, 429.32, 425.99, 411.11, 407.84, 352.8, 383.71, 411.23, 380.07, 453.3, 513.28, 539.75, 595.86, 738.54, 834.01, 740.84, 812.73, 921.26, 876.77, 1018.8, 1038.59, 965, 852.89] },
      velocityScore: { '1D': 1.6, '1W': 16.7, '1M': -34, '6M': null }, isNew: false,
      marketCap: '$193B', pe: 81.2, revenueGrowth: 44, eps: 10.51, grossMargin: 42, dividendYield: 0.36,
      etfPresence: { PTF: 3.78, WCLD: false, IGV: false, FDTX: 4.14, GTEK: false, ARKK: false, MARS: false, FRWD: 7.22, BCTK: false, FWD: false, CBSE: false, FCUS: 4.5, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.75, XMMO: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 5, avgWeight: 4.26, proScore: 1.25, coverage: 0.294,
      price: 360.31, weeklyPrices: [357.89, 356.18, 364.90, 363.62, 360.31], weeklyChange: 0.68, dayChange: -0.91, sortRank: 0, periodReturns: { '1M': -0.2, 'YTD': 14.8, '6M': 10.5, '1Y': 105.7 },
      priceHistory: { '1D': [363.62, 360.55, 360.31], '1W': [357.89, 356.18, 364.9, 363.62, 360.31], '1M': [361.17, 362.29, 353.32, 356.56, 358.16, 367.11, 371.1, 362.1, 367.46, 348.78, 346.08, 345.04, 342.19, 334.69, 351.28, 353.33, 357.89, 356.18, 364.9, 363.62, 360.31], 'YTD': [313.8, 326.01, 333.16, 328.43, 338.53, 324.4, 302.82, 310.92, 303.56, 306.93, 309.41, 289.2, 286.86, 316.37, 332.77, 337.75, 381.94, 395.3, 397.17, 383.47, 376.43, 361.17, 367.11, 346.08, 353.33, 360.31], '6M': [326.01, 333.16, 328.43, 338.53, 323.1, 306.02, 311.69, 311.43, 298.3, 301.46, 298.79, 273.76, 297.66, 319.21, 335.4, 348.52, 379.64, 386.77, 393.11, 379.38, 372.58, 361.17, 367.11, 346.08, 353.33, 360.31], '1Y': [175.16, 183.1, 192.11, 196.43, 195.32, 204.16, 202.49, 209.16, 211.99, 239.94, 251.42, 252.34, 243.55, 247.13, 246.19, 251.34, 268.43, 278.06, 291.74, 284.96, 318.47, 316.02, 317.75, 307.73, 315.68, 313.8, 326.01, 333.16, 328.43, 338.53, 323.1, 306.02, 314.9, 311.43, 298.3, 301.46, 298.79, 273.76, 297.66, 319.21, 335.4, 348.52, 379.64, 386.77, 393.11, 379.38, 372.58, 361.17, 367.11, 346.08, 353.33, 360.31] },
      velocityScore: { '1D': 0.8, '1W': 5.9, '1M': 43.7, '6M': null }, isNew: false,
      marketCap: '$4.4T', pe: 27.6, revenueGrowth: 22, eps: 13.05, grossMargin: 60, dividendYield: 0.24,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.21, GTEK: false, ARKK: 1.9, MARS: false, FRWD: false, BCTK: 6.53, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 6.04, SGRT: false, SPMO: 3.6, XMMO: false },
      tonyNote: 'Alphabet Inc Class C appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 4.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRWD', name: 'CrowdStrike', easyScore: 5, avgWeight: 2.69, proScore: 0.79, coverage: 0.294,
      price: 194.76, weeklyPrices: [193.18, 193.98, 199.38, 194.62, 194.76], weeklyChange: 0.82, dayChange: 0.07, sortRank: 0, periodReturns: { '1M': 18.3, 'YTD': 66.2, '6M': 67.9, '1Y': 53.4 },
      priceHistory: { '1D': [194.62, 194.94, 194.76], '1W': [193.18, 193.98, 199.38, 194.62, 194.76], '1M': [164.7, 161.23, 161.93, 172.88, 170.7, 173.23, 169.87, 170.74, 171.21, 168.86, 170.23, 168.26, 169.66, 175.27, 185.73, 190.79, 193.18, 193.98, 199.38, 194.62, 194.76], 'YTD': [117.19, 115.97, 113.75, 113.12, 110.35, 102.01, 103.57, 87.56, 97.86, 109.08, 108.3, 98.25, 97.6, 98.67, 104.55, 111.35, 111.44, 126.43, 144.99, 162.06, 182.75, 164.7, 173.23, 170.23, 190.79, 194.76], '6M': [115.97, 113.75, 113.12, 110.35, 98.88, 107.41, 87.58, 93, 107.25, 110.44, 102.25, 92.39, 99.65, 100.56, 108.29, 113.65, 117.31, 135.57, 154.71, 165.87, 195.54, 164.7, 173.23, 170.23, 190.79, 194.76], '1Y': [126.93, 118.32, 117.81, 116.38, 110.44, 108.95, 104.65, 104.71, 103.38, 105.88, 111.25, 121.03, 122.6, 121.15, 122.24, 125.99, 136.74, 133.48, 139.18, 128.42, 126.71, 129.14, 129.49, 122.13, 119.71, 117.19, 115.97, 113.75, 113.12, 110.35, 98.88, 107.41, 97.15, 93, 107.25, 110.44, 102.25, 92.39, 99.65, 100.56, 108.29, 113.65, 117.31, 135.57, 154.71, 165.87, 195.54, 164.7, 173.23, 170.23, 190.79, 194.76] },
      velocityScore: { '1D': -1.2, '1W': 2.6, '1M': 6.8, '6M': null }, isNew: false,
      marketCap: '$198B', pe: null, revenueGrowth: 26, eps: -0.04, grossMargin: 75, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.54, IGV: 7.15, FDTX: 1.21, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.33, FWD: 1.24, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'CrowdStrike appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 2.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, avgWeight: 5.09, proScore: 1.2, coverage: 0.235,
      price: 383.11, weeklyPrices: [384.28, 390.49, 386.74, 388.84, 383.11], weeklyChange: -0.31, dayChange: -1.47, sortRank: 0, periodReturns: { '1M': -7, 'YTD': -20.8, '6M': -19.9, '1Y': -22.9 },
      priceHistory: { '1D': [388.84, 382.99, 383.11], '1W': [384.28, 390.49, 386.74, 388.84, 383.11], '1M': [411.74, 403.41, 397.36, 390.34, 390.74, 399.76, 393.83, 378.91, 379.4, 367.34, 373.94, 365.46, 352.83, 372.97, 368.57, 373.02, 384.28, 390.49, 386.74, 388.84, 383.11], 'YTD': [483.62, 478.11, 456.66, 465.95, 430.29, 413.6, 396.86, 389, 403.93, 405.76, 399.41, 372.74, 370.17, 373.07, 420.26, 415.75, 407.78, 420.77, 409.43, 419.09, 450.24, 411.74, 399.76, 373.94, 373.02, 383.11], '6M': [478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 384.47, 392.74, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 413.62, 412.66, 423.54, 418.57, 460.52, 411.74, 399.76, 373.94, 373.02, 383.11], '1Y': [496.62, 505.82, 505.27, 512.57, 527.75, 529.24, 509.77, 504.26, 505.12, 498.41, 509.04, 509.23, 517.95, 523.98, 513.57, 517.66, 542.07, 514.33, 508.68, 493.79, 474, 490, 492.02, 476.39, 486.85, 483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 397.23, 392.74, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 413.62, 412.66, 423.54, 418.57, 460.52, 411.74, 399.76, 373.94, 373.02, 383.11] },
      velocityScore: { '1D': 0.8, '1W': -0.8, '1M': -0.8, '6M': null }, isNew: false,
      marketCap: '$2.8T', pe: 22.8, revenueGrowth: 18, eps: 16.8, grossMargin: 68, dividendYield: 0.94,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.1, FDTX: 2.93, GTEK: false, ARKK: false, MARS: false, FRWD: 3.03, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 6.29, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 4, avgWeight: 4.58, proScore: 1.08, coverage: 0.235,
      price: 334.02, weeklyPrices: [352.04, 348.06, 357.53, 337.04, 334.02], weeklyChange: -5.12, dayChange: -0.9, sortRank: 0, periodReturns: { '1M': 25.4, 'YTD': 81.3, '6M': 75.1, '1Y': 63.7 },
      priceHistory: { '1D': [337.04, 333.46, 334.02], '1W': [352.04, 348.06, 357.53, 337.04, 334.02], '1M': [266.33, 260.52, 263.22, 279.53, 279.62, 284.54, 279.9, 282.13, 287.78, 286.4, 290.92, 285.26, 293.09, 304.2, 332, 341.02, 352.04, 348.06, 357.53, 337.04, 334.02], 'YTD': [184.2, 190.8, 187.73, 180.18, 176.97, 166, 163.5, 141.67, 156.09, 165.58, 169.19, 157.21, 160.32, 166.99, 166.97, 173.21, 179.32, 196.53, 238.21, 252.92, 281.69, 266.33, 284.54, 290.92, 341.02, 334.02], '6M': [190.8, 187.73, 180.18, 176.97, 159.32, 166.95, 144.14, 148.92, 165.05, 167.02, 162.95, 147.02, 161.95, 162.51, 169.56, 182.9, 184.56, 213.66, 247.55, 260.58, 300.48, 266.33, 284.54, 290.92, 341.02, 334.02], '1Y': [203.99, 192.25, 196.73, 193.84, 169.09, 175.4, 181.56, 184.55, 190.52, 197.55, 201.34, 203.25, 203.62, 211.04, 207.56, 214.4, 221.38, 214.52, 218.27, 201, 183.89, 189.88, 195, 187.09, 188.12, 184.2, 190.8, 187.73, 180.18, 176.97, 159.32, 166.95, 148.7, 148.92, 165.05, 167.02, 162.95, 147.02, 161.95, 162.51, 169.56, 182.9, 184.56, 213.66, 247.55, 260.58, 300.48, 266.33, 284.54, 290.92, 341.02, 334.02] },
      velocityScore: { '1D': -2.7, '1W': 2.9, '1M': 0.9, '6M': null }, isNew: false,
      marketCap: '$272B', pe: 290.5, revenueGrowth: 31, eps: 1.15, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.97, IGV: 9.86, FDTX: 4.15, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.34, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'TSLA', name: 'TESLA INC', easyScore: 4, avgWeight: 4.5, proScore: 1.06, coverage: 0.235,
      price: 395.15, weeklyPrices: [425.30, 393.45, 419.77, 402.90, 395.15], weeklyChange: -7.09, dayChange: -1.92, sortRank: 0, periodReturns: { '1M': -3.4, 'YTD': -12.1, '6M': -9.3, '1Y': 32.7 },
      priceHistory: { '1D': [402.9, 397.54, 395.15], '1W': [425.3, 393.45, 419.77, 402.9, 395.15], '1M': [408.95, 396.68, 381.59, 399.15, 406.43, 411.15, 404.66, 396.38, 400.49, 405.05, 381.61, 375.53, 375.12, 379.71, 411.84, 420.6, 425.3, 393.45, 419.77, 402.9, 395.15], 'YTD': [449.72, 435.8, 438.57, 449.06, 430.41, 417.32, 410.63, 409.38, 392.43, 399.24, 399.27, 383.03, 371.75, 345.62, 388.9, 373.72, 381.63, 411.79, 443.3, 417.85, 435.79, 408.95, 411.15, 381.61, 420.6, 395.15], '6M': [435.8, 438.57, 449.06, 430.41, 411.11, 417.44, 399.83, 402.51, 396.73, 391.2, 367.96, 361.83, 352.82, 352.42, 392.5, 378.67, 392.51, 445, 409.99, 426.01, 415.88, 408.95, 411.15, 381.61, 420.6, 395.15], '1Y': [297.81, 310.78, 332.11, 321.2, 308.72, 340.84, 329.31, 346.6, 329.36, 346.97, 421.62, 425.85, 444.72, 433.09, 429.24, 442.6, 460.55, 444.26, 439.62, 401.25, 417.78, 429.24, 445.17, 489.88, 485.56, 449.72, 435.8, 438.57, 449.06, 430.41, 411.11, 417.44, 411.82, 402.51, 396.73, 391.2, 367.96, 361.83, 352.82, 352.42, 392.5, 378.67, 392.51, 445, 409.99, 426.01, 415.88, 408.95, 411.15, 381.61, 420.6, 395.15] },
      velocityScore: { '1D': 0, '1W': 9.3, '1M': -5.4, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 362.5, revenueGrowth: 16, eps: 1.09, grossMargin: 19, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 10.12, MARS: false, FRWD: false, BCTK: 3.37, FWD: 1.36, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.15, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Tesla holds a position in Electrification and Broad Tech ETFs as the dominant consumer EV brand. The weight score reflects institutional hedging of the AI narrative through autonomous driving and energy storage rather than vehicle sales growth. Revenue growth has moderated and margin compression is real; the ETF allocation is a long-duration infrastructure bet.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 4, avgWeight: 3.67, proScore: 0.86, coverage: 0.235,
      price: 128.09, weeklyPrices: [125.73, 129.30, 132.54, 134.37, 128.09], weeklyChange: 1.87, dayChange: -4.68, sortRank: 0, periodReturns: { '1M': -6.1, 'YTD': -27.9, '6M': -27.6, '1Y': -8.3 },
      priceHistory: { '1D': [134.37, 128.6, 128.09], '1W': [125.73, 129.3, 132.54, 134.37, 128.09], '1M': [136.47, 132.07, 130.21, 131.08, 127.99, 134.71, 133.25, 130.63, 128.47, 119.5, 116.7, 113.5, 107.27, 112.93, 115.7, 116.67, 125.73, 129.3, 132.54, 134.37, 128.09], 'YTD': [177.75, 176.86, 177.07, 169.6, 146.59, 142.91, 133.02, 128.84, 147.22, 151.14, 155.08, 154.78, 146.28, 130.49, 142.76, 141.57, 139.11, 137.05, 133.73, 137.41, 156.54, 136.47, 134.71, 116.7, 116.67, 128.09], '6M': [176.86, 177.07, 169.6, 146.59, 135.9, 131.41, 130.6, 137.19, 157.16, 150.95, 150.68, 143.06, 147.93, 132.37, 145.89, 143.1, 146.03, 136.89, 135.14, 136.88, 160.65, 136.47, 134.71, 116.7, 116.67, 128.09], '1Y': [139.71, 148.58, 149.07, 156.24, 173.27, 186.97, 157.75, 157.17, 157.09, 162.36, 170.26, 182.55, 182.42, 182.17, 179.74, 181.51, 189.6, 190.74, 190.96, 167.33, 162.25, 170.69, 181.84, 187.75, 194.13, 177.75, 176.86, 177.07, 169.6, 146.59, 135.9, 131.41, 135.24, 137.19, 157.16, 150.95, 150.68, 143.06, 147.93, 132.37, 145.89, 143.1, 146.03, 136.89, 135.14, 136.88, 160.65, 136.47, 134.71, 116.7, 116.67, 128.09] },
      velocityScore: { '1D': 2.4, '1W': 11.7, '1M': -12.2, '6M': null }, isNew: false,
      marketCap: '$307B', pe: 143.9, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.54, FDTX: 2, GTEK: false, ARKK: 2.98, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.14, XMMO: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 4, avgWeight: 3.53, proScore: 0.83, coverage: 0.235,
      price: 1680.11, weeklyPrices: [2032.22, 1745.00, 1744.43, 1617.70, 1680.11], weeklyChange: -17.33, dayChange: 3.86, sortRank: 0, periodReturns: { '1M': 2.3, 'YTD': 607.8, '6M': 402.2, '1Y': 3539 },
      priceHistory: { '1D': [1617.7, 1667.01, 1680.11], '1W': [2032.22, 1745, 1744.43, 1617.7, 1680.11], '1M': [1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745, 1744.43, 1617.7, 1680.11], 'YTD': [237.38, 334.54, 409.24, 473.83, 576.25, 583.4, 590.59, 638.52, 565.41, 618.89, 720.17, 702.48, 635.34, 851.57, 919.47, 932.43, 1096.51, 1339.96, 1382.72, 1542.24, 1694.98, 1642, 2107.86, 1963.6, 2273.73, 1680.11], '6M': [334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1478.69, 1761.43, 1642, 2107.86, 1963.6, 2273.73, 1680.11], '1Y': [46.17, 42.72, 41.36, 42.93, 41.93, 46.83, 44.58, 46.78, 51.07, 70.51, 91.55, 106.4, 112.2, 120.95, 127.29, 149.29, 175.53, 194.57, 271.58, 244.93, 226.96, 205.35, 219.46, 209.31, 244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1478.69, 1761.43, 1642, 2107.86, 1963.6, 2273.73, 1680.11] },
      velocityScore: { '1D': 0, '1W': -27.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$249B', pe: 57.4, revenueGrowth: 251, eps: 29.28, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 5.04, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.32, CBSE: false, FCUS: 5.24, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.52, XMMO: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'DDOG', name: 'DDOG', easyScore: 4, avgWeight: 3.05, proScore: 0.72, coverage: 0.235,
      price: 256.18, weeklyPrices: [264.48, 260.36, 255.37, 256.81, 256.18], weeklyChange: -3.14, dayChange: -0.25, sortRank: 0, periodReturns: { '1M': 10.6, 'YTD': 88.4, '6M': 96, '1Y': 75.5 },
      priceHistory: { '1D': [256.81, 255.5, 256.18], '1W': [264.48, 260.36, 255.37, 256.81, 256.18], '1M': [231.68, 227.34, 227.63, 234.24, 229.9, 233.09, 231.11, 226.63, 223, 221.37, 220.57, 222.65, 220.94, 239.77, 248.57, 260.36, 264.48, 260.36, 255.37, 256.81, 256.18], 'YTD': [135.99, 130.68, 120.86, 130.13, 129.32, 114.01, 122.56, 104.43, 111.77, 123.08, 128.87, 122.57, 118.05, 108.98, 123.47, 127.86, 132.19, 188.73, 202.84, 218.04, 247.35, 231.68, 233.09, 220.57, 260.36, 256.18], '6M': [130.68, 120.86, 130.13, 129.32, 111.69, 125.2, 102.61, 111.96, 125.75, 124.52, 125.08, 114.48, 116.5, 110.08, 129.74, 132.66, 146.69, 202.32, 208.82, 222.32, 277.49, 231.68, 233.09, 220.57, 260.36, 256.18], '1Y': [145.94, 140.56, 144.89, 150.27, 132.94, 128.96, 128.99, 128.38, 134.69, 140.46, 134.59, 137.49, 142.4, 154.52, 160.88, 156.25, 157.27, 157.51, 197.86, 176.46, 158.44, 156.48, 152.57, 140.05, 141.23, 135.99, 130.68, 120.86, 130.13, 129.32, 111.69, 125.2, 115.66, 111.96, 125.75, 124.52, 125.08, 114.48, 116.5, 110.08, 129.74, 132.66, 146.69, 202.32, 208.82, 222.32, 277.49, 231.68, 233.09, 220.57, 260.36, 256.18] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$91B', pe: 656.9, revenueGrowth: 32, eps: 0.39, grossMargin: 80, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.86, IGV: 3.09, FDTX: 2.39, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: 3.88, SPMO: false, XMMO: false },
      tonyNote: 'DDOG appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 2.98, proScore: 0.7, coverage: 0.235,
      price: 117.48, weeklyPrices: [121.63, 119.46, 120.14, 121.88, 117.48], weeklyChange: -3.41, dayChange: -3.61, sortRank: 0, periodReturns: { '1M': 6, 'YTD': -27, '6M': -30.2, '1Y': 4.4 },
      priceHistory: { '1D': [121.88, 118.32, 117.48], '1W': [121.63, 119.46, 120.14, 121.88, 117.48], '1M': [110.78, 110.42, 108.2, 110.47, 108.24, 112.49, 113.23, 108.09, 108.85, 107.98, 107.68, 114.17, 111.62, 116.86, 114.21, 114.18, 121.63, 119.46, 120.14, 121.88, 117.48], 'YTD': [160.97, 168.28, 157.99, 137.89, 131.23, 118.4, 113.54, 116.93, 121.87, 129.36, 127.8, 116.15, 118.62, 112.38, 126.94, 124.23, 121.13, 111.74, 97.42, 104.86, 118.71, 110.78, 112.49, 107.68, 114.18, 117.48], '6M': [168.28, 157.99, 137.89, 131.23, 112.05, 112.7, 117.28, 120.73, 130.2, 122.96, 116.78, 111.85, 118.8, 114.97, 135.14, 124.23, 127.55, 102.54, 102.39, 103, 124.12, 110.78, 112.49, 107.68, 114.18, 117.48], '1Y': [112.48, 115.05, 123.71, 124.85, 127, 149.3, 139.25, 140.53, 139.04, 143.44, 147.21, 149.94, 148.61, 161.28, 152.88, 162.64, 178.96, 160.94, 158.94, 140.45, 155.31, 156.83, 159.89, 163.14, 169.53, 160.97, 168.28, 157.99, 137.89, 131.23, 112.05, 112.7, 126.2, 120.73, 130.2, 122.96, 116.78, 111.85, 118.8, 114.97, 135.14, 124.23, 127.55, 102.54, 102.39, 103, 124.12, 110.78, 112.49, 107.68, 114.18, 117.48] },
      velocityScore: { '1D': 0, '1W': null, '1M': -23.9, '6M': null }, isNew: false,
      marketCap: '$152B', pe: 115.2, revenueGrowth: 34, eps: 1.02, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.59, GTEK: false, ARKK: 4.43, MARS: false, FRWD: 2.12, BCTK: 2.78, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASML', name: 'ASML Holding', easyScore: 4, avgWeight: 2.79, proScore: 0.66, coverage: 0.235,
      price: 1756.42, weeklyPrices: [1843.04, 1769.32, 1825.07, 1747.28, 1756.42], weeklyChange: -4.7, dayChange: 0.52, sortRank: 0, periodReturns: { '1M': 0.4, 'YTD': 64.2, '6M': 47.1, '1Y': 121.2 },
      priceHistory: { '1D': [1747.28, 1759, 1756.42], '1W': [1843.04, 1769.32, 1825.07, 1747.28, 1756.42], '1M': [1749.04, 1777.77, 1734.19, 1899.48, 1863.55, 1892.66, 1803.89, 1867.83, 1929.68, 1929.25, 1778.46, 1762.77, 1841.18, 1794.62, 1883.11, 1989.44, 1843.04, 1769.32, 1825.07, 1747.28, 1756.42], 'YTD': [1069.86, 1194.32, 1331.6, 1389.04, 1423, 1429.49, 1419.78, 1497.8, 1360.94, 1383.4, 1389.16, 1399.42, 1320.83, 1448.64, 1410.83, 1417.8, 1438.99, 1516.6, 1584.51, 1592, 1612.76, 1749.04, 1892.66, 1778.46, 1989.44, 1756.42], '6M': [1194.32, 1331.6, 1389.04, 1423, 1413.01, 1406.61, 1485.99, 1450.56, 1292.8, 1345.69, 1317.25, 1302.47, 1304.01, 1500.2, 1476.5, 1432.44, 1386.21, 1565.81, 1472.39, 1632.9, 1628.57, 1749.04, 1892.66, 1778.46, 1989.44, 1756.42], '1Y': [794.1, 823.02, 705.48, 718.49, 689.63, 741.79, 743.61, 754.46, 725.85, 805.13, 878.42, 963.51, 968.09, 1002.3, 983.18, 1025.02, 1052.48, 1030.14, 1022.42, 1004.06, 987.82, 1108.78, 1111.44, 1076.05, 1061.84, 1069.86, 1194.32, 1331.6, 1389.04, 1423, 1413.01, 1406.61, 1469.59, 1450.56, 1292.8, 1345.69, 1317.25, 1302.47, 1304.01, 1500.2, 1476.5, 1432.44, 1386.21, 1565.81, 1472.39, 1632.9, 1628.57, 1749.04, 1892.66, 1778.46, 1989.44, 1756.42] },
      velocityScore: { '1D': 1.5, '1W': null, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$677B', pe: 59.5, revenueGrowth: 13, eps: 29.53, grossMargin: 53, dividendYield: 0.5,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 4.83, BCTK: 2.19, FWD: 1.57, CBSE: 2.56, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'ASML Holding appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 2.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 3, avgWeight: 4.81, proScore: 2.88, coverage: 0.6,
      price: 658.28, weeklyPrices: [691.40, 668.31, 674.04, 656.79, 658.28], weeklyChange: -4.79, dayChange: 0.26, sortRank: 0, periodReturns: { '1M': -5.1, 'YTD': 56, '6M': 59.3, '1Y': 74.4 },
      priceHistory: { '1D': [656.59, 660, 658.28], '1W': [691.4, 668.31, 674.04, 656.79, 658.28], '1M': [693.81, 691.95, 650.92, 683.29, 707.74, 724.35, 719.29, 714.85, 702.25, 740.14, 702.29, 701.88, 718.59, 687.87, 714.45, 720.04, 691.4, 668.31, 674.04, 656.79, 658.28], 'YTD': [422.06, 413.17, 447.64, 468.76, 474.63, 514.56, 525.13, 568.21, 566, 564.05, 571.64, 578.44, 549.02, 582.06, 587.42, 633.44, 727.77, 750.73, 780.08, 716.91, 711.73, 693.81, 724.35, 702.29, 720.04, 658.28], '6M': [413.17, 447.64, 468.76, 474.63, 508.11, 524.08, 549.11, 563.08, 540.19, 559.02, 555.39, 549.98, 554.38, 595.84, 604.97, 637.28, 757.34, 781.38, 723.03, 723.44, 687.48, 693.81, 724.35, 702.29, 720.04, 658.28], '1Y': [377.56, 386.54, 394.93, 410.99, 389.12, 391.57, 379.27, 378.31, 374.68, 373.47, 378.24, 389.53, 414.42, 421.51, 431.6, 437.43, 439.57, 438.66, 448.91, 439.29, 442.64, 454.72, 457.96, 438.49, 435.2, 422.06, 413.17, 447.64, 468.76, 474.63, 508.11, 524.08, 552.66, 563.08, 540.19, 559.02, 555.39, 549.98, 554.38, 595.84, 604.97, 637.28, 757.34, 781.38, 723.03, 723.44, 687.48, 693.81, 724.35, 702.29, 720.04, 658.28] },
      velocityScore: { '1D': 0.3, '1W': -1.4, '1M': 55.7, '6M': null }, isNew: false,
      marketCap: '$99B', pe: 90.3, revenueGrowth: 26, eps: 7.29, grossMargin: 15, dividendYield: 0.07,
      etfPresence: { POW: 4.99, VOLT: 5.22, PBD: false, PBW: false, IVEP: 4.21 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 3, avgWeight: 4.53, proScore: 2.72, coverage: 0.6,
      price: 395.21, weeklyPrices: [412.31, 398.52, 413.42, 395.68, 395.21], weeklyChange: -4.15, dayChange: -0.13, sortRank: 0, periodReturns: { '1M': -2, 'YTD': 24.1, '6M': 23.3, '1Y': 10.7 },
      priceHistory: { '1D': [395.73, 395.77, 395.21], '1W': [412.31, 398.52, 413.42, 395.68, 395.21], '1M': [403.14, 401.72, 375.46, 393.64, 391.39, 407.06, 407.71, 409.64, 421.77, 435.78, 405.28, 404.59, 419.87, 402.68, 408.26, 426.12, 412.31, 398.52, 413.42, 395.68, 395.21], 'YTD': [318.51, 320.58, 333.46, 331.22, 351.42, 377.06, 391.49, 374.56, 355.56, 361.06, 363.95, 374.1, 357.67, 400.44, 392.73, 424.5, 433.01, 399.15, 408.1, 381.51, 400.6, 403.14, 407.06, 405.28, 426.12, 395.21], '6M': [320.58, 333.46, 331.22, 351.42, 373.82, 389.25, 362.05, 375.92, 347.75, 355.4, 356.8, 357.36, 363.89, 403.36, 407.57, 416.77, 422.44, 419, 381.87, 391.35, 400.08, 403.14, 407.06, 405.28, 426.12, 395.21], '1Y': [356.98, 362.11, 372.65, 390.01, 356.45, 363.3, 349, 345.76, 343.75, 348.23, 371.19, 368.52, 374.25, 370.94, 374.35, 373.46, 376.01, 377.72, 367.91, 338.29, 330.43, 333.11, 341.76, 329.93, 322.81, 318.51, 320.58, 333.46, 331.22, 351.42, 373.82, 389.25, 373.38, 375.92, 347.75, 355.4, 356.8, 357.36, 363.89, 403.36, 407.57, 416.77, 422.44, 419, 381.87, 391.35, 400.08, 403.14, 407.06, 405.28, 426.12, 395.21] },
      velocityScore: { '1D': -1.1, '1W': 0.7, '1M': 51.1, '6M': null }, isNew: false,
      marketCap: '$153B', pe: 38.7, revenueGrowth: 17, eps: 10.21, grossMargin: 37, dividendYield: 1.11,
      etfPresence: { POW: 4.18, VOLT: 5.39, PBD: false, PBW: false, IVEP: 4.03 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 3, avgWeight: 4.19, proScore: 2.51, coverage: 0.6,
      price: 1094.53, weeklyPrices: [1134.35, 1113.11, 1152.04, 1077.08, 1094.53], weeklyChange: -3.51, dayChange: 1.58, sortRank: 0, periodReturns: { '1M': 17.2, 'YTD': 67.5, '6M': 74.2, '1Y': 106.5 },
      priceHistory: { '1D': [1077.5, 1089.61, 1093.7, 1094.53], '1W': [1134.35, 1113.11, 1152.04, 1077.08, 1094.53], '1M': [933.85, 920.15, 867.09, 906.79, 940.66, 979.07, 982.35, 1048.86, 1109.73, 1127.59, 1034.98, 1057.65, 1085.47, 1045.17, 1102.51, 1174.86, 1134.35, 1113.11, 1152.04, 1077.08, 1094.53], 'YTD': [653.57, 628.4, 642.23, 657.78, 726.37, 801.54, 819.15, 879.73, 842, 839.2, 844.05, 909.41, 872.9, 968.02, 978.32, 1149.53, 1083.46, 1045.63, 1090.53, 1043.82, 968.32, 933.85, 979.07, 1034.98, 1174.86, 1094.53], '6M': [628.4, 642.23, 657.78, 726.37, 779.35, 802.13, 831.7, 873.6, 789.23, 805.02, 851.07, 853.16, 897.36, 991.12, 990.18, 1120.23, 1073.95, 1073.08, 1012.25, 1038.74, 950.54, 933.85, 979.07, 1034.98, 1174.86, 1094.53], '1Y': [530, 559.61, 548.99, 632.67, 649.72, 657.44, 603.13, 602.31, 579.68, 605.7, 617.91, 633.41, 614.9, 606.12, 644.41, 585.33, 570.98, 547.96, 576.08, 554.93, 580.49, 601.58, 625.3, 686.22, 661.45, 653.57, 628.4, 642.23, 657.78, 726.37, 779.35, 802.13, 830.34, 873.6, 789.23, 805.02, 851.07, 853.16, 897.36, 991.12, 990.18, 1120.23, 1073.95, 1073.08, 1012.25, 1038.74, 950.54, 933.85, 979.07, 1034.98, 1174.86, 1094.53] },
      velocityScore: { '1D': -3.8, '1W': -1.2, '1M': 90.2, '6M': null }, isNew: false,
      marketCap: '$294B', pe: 34.2, revenueGrowth: 16, eps: 31.99, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { POW: 3.55, VOLT: 4.55, PBD: false, PBW: false, IVEP: 4.47 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 3, avgWeight: 3.79, proScore: 2.27, coverage: 0.6,
      price: 88, weeklyPrices: [86.37, 88.34, 87.44, 88.47, 88.00], weeklyChange: 1.89, dayChange: -0.51, sortRank: 0, periodReturns: { '1M': 4.8, 'YTD': 9.6, '6M': 10.7, '1Y': 21.4 },
      priceHistory: { '1D': [88.45, 88.01, 88, 88], '1W': [86.37, 88.34, 87.44, 88.47, 88], '1M': [84.01, 84.83, 85.12, 84.84, 85.99, 86.12, 86.23, 85.73, 86.75, 86.08, 86.43, 87.62, 87.7, 88.56, 88.66, 87.77, 86.37, 88.34, 87.44, 88.47, 88], 'YTD': [80.28, 79.49, 82.19, 84.81, 87.9, 89.48, 92.71, 95.68, 92.59, 91.54, 92.53, 91.62, 92.88, 94.48, 91.83, 96.25, 97.88, 93.32, 95.68, 89.69, 87.01, 84.01, 86.12, 86.43, 87.77, 88], '6M': [79.49, 82.19, 84.81, 87.9, 89.47, 93.8, 94.06, 93.77, 91.02, 92.78, 89.5, 91.4, 92.73, 92.3, 92.01, 94.83, 95.51, 94.84, 89.04, 88.55, 83.66, 84.01, 86.12, 86.43, 87.77, 88], '1Y': [72.46, 74.7, 77.54, 71.95, 71.18, 71.86, 76.51, 75.32, 72.65, 70.07, 69.83, 72.32, 75.49, 83.21, 84.64, 83.99, 83.57, 81.69, 85.76, 84.64, 84.23, 84.58, 79.64, 81.32, 79.79, 80.28, 79.49, 82.19, 84.81, 87.9, 89.47, 93.8, 92.18, 93.77, 91.02, 92.78, 89.5, 91.4, 92.73, 92.3, 92.01, 94.83, 95.51, 94.84, 89.04, 88.55, 83.66, 84.01, 86.12, 86.43, 87.77, 88] },
      velocityScore: { '1D': 4.1, '1W': 8.6, '1M': 66.9, '6M': null }, isNew: false,
      marketCap: '$184B', pe: 22.3, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.82,
      etfPresence: { POW: 2.22, VOLT: 5.3, PBD: false, PBW: false, IVEP: 3.85 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy Corp', easyScore: 3, avgWeight: 3.59, proScore: 2.16, coverage: 0.6,
      price: 263.49, weeklyPrices: [289.50, 270.89, 295.05, 269.57, 263.49], weeklyChange: -8.98, dayChange: -2.23, sortRank: 0, periodReturns: { '1M': 3.9, 'YTD': 203.2, '6M': 116.3, '1Y': 984.3 },
      priceHistory: { '1D': [269.5, 261.72, 261.71, 263.49], '1W': [289.5, 270.89, 295.05, 269.57, 263.49], '1M': [253.57, 259.61, 234.23, 248.88, 260.22, 274.5, 280.88, 284.99, 328.91, 345.85, 321.98, 326.19, 309.18, 252.02, 275.01, 302.7, 289.5, 270.89, 295.05, 269.57, 263.49], 'YTD': [86.89, 121.84, 139.17, 144.89, 151.37, 155.17, 145.32, 166.2, 153.02, 154, 160.05, 145.88, 135.49, 160.13, 210.06, 237.57, 283.36, 258.64, 303.41, 307.88, 285, 253.57, 274.5, 321.98, 302.7, 263.49], '6M': [121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 155.67, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 283.92, 258.71, 302.49, 273.51, 253.57, 274.5, 321.98, 302.7, 263.49], '1Y': [24.3, 25.31, 25.93, 34.75, 37.61, 41.25, 43.1, 49.35, 51.35, 55, 73.29, 77.38, 84.57, 86.06, 114.06, 104.38, 113.28, 129.05, 127.07, 104.97, 95.56, 105, 109.44, 87.61, 91.43, 86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 147.55, 155.67, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 283.92, 258.71, 302.49, 273.51, 253.57, 274.5, 321.98, 302.7, 263.49] },
      velocityScore: { '1D': -5.7, '1W': -4, '1M': 2.4, '6M': null }, isNew: false,
      marketCap: '$75B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: 1.66, VOLT: 3.99, PBD: false, PBW: false, IVEP: 5.13 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 3, avgWeight: 3.26, proScore: 1.96, coverage: 0.6,
      price: 154.19, weeklyPrices: [159.99, 152.15, 156.89, 153.18, 154.19], weeklyChange: -3.63, dayChange: 0.72, sortRank: 0, periodReturns: { '1M': -5.9, 'YTD': 51.2, '6M': 50.1, '1Y': 107.8 },
      priceHistory: { '1D': [153.09, 154.33, 154.19], '1W': [159.99, 152.15, 156.89, 153.18, 154.19], '1M': [163.81, 163.8, 156.79, 164.52, 165.84, 169, 167.34, 170.94, 177.02, 184.34, 168.37, 167.55, 171.91, 162.92, 163.35, 169.61, 159.99, 152.15, 156.89, 153.18, 154.19], 'YTD': [101.97, 102.72, 107.98, 110.29, 112.26, 114.62, 115.22, 118.22, 111.65, 109.13, 114.71, 125.61, 118.28, 128.63, 129.7, 142.76, 142.9, 166.73, 173.96, 163.57, 166.99, 163.81, 169, 168.37, 169.61, 154.19], '6M': [102.72, 107.98, 110.29, 112.26, 112.64, 113.25, 114.93, 118.36, 106.02, 109.93, 116.3, 116.98, 117.41, 133.16, 135.8, 141.71, 162.69, 173.39, 160.69, 164.66, 171.55, 163.81, 169, 168.37, 169.61, 154.19], '1Y': [74.2, 74.55, 74.63, 79.72, 89.73, 91.84, 88.15, 89.4, 89.48, 91.44, 96.2, 97.7, 98.64, 96, 99.51, 99.65, 104.22, 109.62, 109.59, 104.31, 104.1, 105.36, 107.42, 102.41, 103.97, 101.97, 102.72, 107.98, 110.29, 112.26, 112.64, 113.25, 116.87, 118.36, 106.02, 109.93, 116.3, 116.98, 117.41, 133.16, 135.8, 141.71, 162.69, 173.39, 160.69, 164.66, 171.55, 163.81, 169, 168.37, 169.61, 154.19] },
      velocityScore: { '1D': 1, '1W': -2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 52.4, revenueGrowth: 54, eps: 2.94, grossMargin: 37, dividendYield: 0.55,
      etfPresence: { POW: 3.75, VOLT: 2.95, PBD: false, PBW: false, IVEP: 3.09 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 3, avgWeight: 2.93, proScore: 1.76, coverage: 0.6,
      price: 477.37, weeklyPrices: [490.12, 487.10, 495.60, 478.89, 477.37], weeklyChange: -2.6, dayChange: -0.31, sortRank: 0, periodReturns: { '1M': -1.6, 'YTD': 7.5, '6M': 3.6, '1Y': 15.7 },
      priceHistory: { '1D': [478.86, 475, 477.37], '1W': [490.12, 487.1, 495.6, 478.89, 477.37], '1M': [485.03, 486.47, 467.59, 469.32, 476.89, 489.73, 502.65, 508.87, 523.69, 539.39, 509.96, 518.18, 536.04, 517.02, 514.71, 523.2, 490.12, 487.1, 495.6, 478.89, 477.37], 'YTD': [444.11, 460.87, 484.11, 485.53, 487.94, 506.14, 524.25, 526.75, 488.49, 478.06, 471.22, 505.62, 490.74, 534.67, 521.71, 557.85, 508.17, 493.04, 482.03, 460.98, 473.61, 485.03, 489.73, 509.96, 523.2, 477.37], '6M': [460.87, 484.11, 485.53, 487.94, 503.8, 524.12, 516.99, 511.63, 471.54, 467.38, 475.74, 480.97, 499.2, 539.79, 546.23, 555.34, 516, 490.16, 470.87, 475.01, 462.93, 485.03, 489.73, 509.96, 523.2, 477.37], '1Y': [412.5, 414.86, 428.55, 427.33, 427.67, 432.14, 432.81, 437.56, 430.15, 437.24, 435.44, 435.23, 430.31, 412.93, 427.43, 435.29, 455.34, 459.44, 450.12, 417.28, 424.08, 427.48, 438.7, 438.42, 455.92, 444.11, 460.87, 484.11, 485.53, 487.94, 503.8, 524.12, 526.73, 511.63, 471.54, 467.38, 475.74, 480.97, 499.2, 539.79, 546.23, 555.34, 516, 490.16, 470.87, 475.01, 462.93, 485.03, 489.73, 509.96, 523.2, 477.37] },
      velocityScore: { '1D': 0, '1W': -0.6, '1M': 57.1, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 28.2, revenueGrowth: 11, eps: 16.9, grossMargin: 36, dividendYield: 1.19,
      etfPresence: { POW: 2.9, VOLT: 3.36, PBD: false, PBW: false, IVEP: 2.53 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'NRG', name: 'NRG Energy Inc', easyScore: 3, avgWeight: 1.35, proScore: 0.81, coverage: 0.6,
      price: 137.21, weeklyPrices: [140.80, 136.70, 141.01, 138.01, 137.21], weeklyChange: -2.55, dayChange: -0.6, sortRank: 0, periodReturns: { '1M': 7.4, 'YTD': -13.8, '6M': -4.4, '1Y': -9.3 },
      priceHistory: { '1D': [138.03, 137.04, 137.21], '1W': [140.8, 136.7, 141.01, 138.01, 137.21], '1M': [127.71, 129.96, 120.65, 123.7, 125.47, 130.4, 132.1, 132.13, 135.06, 138.91, 137.66, 142.21, 147.11, 149.36, 149.11, 146.06, 140.8, 136.7, 141.01, 138.01, 137.21], 'YTD': [159.24, 143.53, 158.5, 149.3, 152.63, 155.72, 173.45, 184.03, 162.06, 155.15, 154.75, 151.13, 146.14, 161.78, 168.5, 154.53, 155.58, 141.86, 134.72, 136.92, 134.08, 127.71, 130.4, 137.66, 146.06, 137.21], '6M': [143.53, 158.5, 149.3, 152.63, 153.32, 172.35, 176.52, 178.96, 154.32, 152.87, 145.8, 147.74, 149.8, 170.24, 157.18, 160.15, 154.82, 137.3, 125.5, 137.65, 129.47, 127.71, 130.4, 137.66, 146.06, 137.21], '1Y': [151.27, 146.88, 153.96, 159.87, 171.96, 156.69, 148.38, 144.77, 145.11, 152.26, 164.22, 167.43, 161.95, 162.61, 165.61, 163.59, 172.76, 167.99, 162.84, 166.45, 166.85, 164.08, 166.75, 160.15, 158.11, 159.24, 143.53, 158.5, 149.3, 152.63, 153.32, 172.35, 179.18, 178.96, 154.32, 152.87, 145.8, 147.74, 149.8, 170.24, 157.18, 160.15, 154.82, 137.3, 125.5, 137.65, 129.47, 127.71, 130.4, 137.66, 146.06, 137.21] },
      velocityScore: { '1D': 0, '1W': 1.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$29B', pe: 150.8, revenueGrowth: 20, eps: 0.91, grossMargin: 16, dividendYield: 1.38,
      etfPresence: { POW: 0.54, VOLT: 1.04, PBD: false, PBW: false, IVEP: 2.48 },
      tonyNote: 'NRG Energy Inc appears in 3 of 5 Electrification ETFs (60% coverage) with average weight 1.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 2, avgWeight: 5.2, proScore: 2.08, coverage: 0.4,
      price: 236.84, weeklyPrices: [264.86, 246.33, 248.05, 234.05, 236.84], weeklyChange: -10.58, dayChange: 1.19, sortRank: 0, periodReturns: { '1M': -19.3, 'YTD': 122.9, '6M': 97.5, '1Y': 228.3 },
      priceHistory: { '1D': [234.05, 236.99, 237.1, 236.84], '1W': [264.86, 246.33, 248.05, 234.05, 236.84], '1M': [293.6, 283.51, 262.34, 290.5, 294.75, 303.53, 292.7, 294.03, 297.2, 307.8, 291.5, 294.49, 309.2, 279.77, 281.09, 286.36, 264.86, 246.33, 248.05, 234.05, 236.84], 'YTD': [106.26, 119.94, 135.18, 139.32, 147.86, 187.3, 187.21, 186.39, 170.37, 176.51, 174.04, 186.82, 180.36, 230.81, 232.81, 252.18, 277.27, 305.93, 296.98, 270.75, 284.42, 293.6, 303.53, 291.5, 286.36, 236.84], '6M': [119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 181.38, 174.53, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 269.95, 322.05, 266.8, 279.22, 288.12, 293.6, 303.53, 291.5, 286.36, 236.84], '1Y': [72.14, 70.37, 73.67, 77.77, 78.75, 90.06, 84.7, 86.12, 87.92, 92.3, 99.41, 97.41, 101.6, 104.42, 105.73, 116.11, 128.09, 126.71, 121.07, 107.22, 100.03, 107.5, 115.02, 110.88, 112.88, 106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 182.27, 174.53, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 269.95, 322.05, 266.8, 279.22, 288.12, 293.6, 303.53, 291.5, 286.36, 236.84] },
      velocityScore: { '1D': -2.3, '1W': -10.3, '1M': -20.9, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 46.2, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.15,
      etfPresence: { POW: 4.23, VOLT: 6.17, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, avgWeight: 5.09, proScore: 2.04, coverage: 0.4,
      price: 252.12, weeklyPrices: [318.06, 266.94, 277.45, 251.53, 252.12], weeklyChange: -20.73, dayChange: 0.23, sortRank: 0, periodReturns: { '1M': -9.7, 'YTD': 48.6, '6M': 39.9, '1Y': 149.1 },
      priceHistory: { '1D': [251.53, 251.88, 252.12], '1W': [318.06, 266.94, 277.45, 251.53, 252.12], '1M': [279.13, 276.04, 276.95, 296.55, 293.87, 302.15, 293.22, 299.84, 296.39, 304.33, 288.64, 294.15, 310.32, 310.64, 315.65, 333.04, 318.06, 266.94, 277.45, 251.53, 252.12], 'YTD': [169.63, 180.24, 196.61, 196.5, 201.19, 229.32, 235.3, 234.4, 213.65, 198.5, 209.52, 222.04, 197.98, 235, 241.49, 268.31, 275.84, 290.46, 268.73, 260.4, 274.52, 279.13, 302.15, 288.64, 333.04, 252.12], '6M': [180.24, 196.61, 196.5, 201.19, 220.78, 232.84, 231.83, 229.71, 191.87, 197.65, 204.09, 203.53, 206.9, 237.93, 254.38, 250.96, 286.69, 302.73, 258.28, 270.01, 269.86, 279.13, 302.15, 288.64, 333.04, 252.12], '1Y': [101.2, 98.24, 106, 130.49, 131.71, 134.66, 127.8, 137.03, 135.97, 143.15, 148.78, 146.79, 141.02, 141.25, 147.14, 148, 154.78, 154.25, 152.12, 144.07, 145.88, 161.55, 167.43, 171.76, 177.23, 169.63, 180.24, 196.61, 196.5, 201.19, 220.78, 232.84, 235.04, 229.71, 191.87, 197.65, 204.09, 203.53, 206.9, 237.93, 254.38, 250.96, 286.69, 302.73, 258.28, 270.01, 269.86, 279.13, 302.15, 288.64, 333.04, 252.12] },
      velocityScore: { '1D': -6, '1W': -26.9, '1M': -14.6, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 60.8, revenueGrowth: 17, eps: 4.15, grossMargin: 39, dividendYield: 0.11,
      etfPresence: { POW: 3.3, VOLT: 6.88, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 3.76, proScore: 1.51, coverage: 0.4,
      price: 137, weeklyPrices: [135.05, 138.51, 135.98, 137.53, 137.00], weeklyChange: 1.44, dayChange: -0.39, sortRank: 0, periodReturns: { '1M': 8.1, 'YTD': 18.8, '6M': 18.2, '1Y': 31.8 },
      priceHistory: { '1D': [137.53, 136.92, 137], '1W': [135.05, 138.51, 135.98, 137.53, 137], '1M': [126.77, 127.76, 128.53, 128.48, 129.23, 129.31, 129.75, 128.27, 127.69, 130.3, 133.74, 134.96, 137, 138.69, 137.97, 136.81, 135.05, 138.51, 135.98, 137.53, 137], 'YTD': [115.31, 115.93, 119.4, 116.63, 119.78, 121.1, 130.24, 132.39, 131.92, 132.31, 133.62, 128.8, 131.08, 137.15, 134.56, 135.08, 137.11, 131.76, 128.6, 129.61, 126.67, 126.77, 129.31, 133.74, 136.81, 137], '6M': [115.93, 119.4, 116.63, 119.78, 120.8, 129.94, 132.03, 133.82, 131.87, 133.61, 125.66, 130.1, 132.36, 134.46, 133.28, 135.07, 134.66, 130.7, 127.68, 131.59, 123.79, 126.77, 129.31, 133.74, 136.81, 137], '1Y': [103.96, 104.4, 110.16, 109.22, 113.24, 111.99, 112.66, 113.01, 110.09, 108.36, 106.84, 108.14, 112.5, 118.16, 118.38, 117.43, 115.11, 120.3, 122.73, 123.51, 122.04, 119.23, 116.07, 114.57, 115.15, 115.31, 115.93, 119.4, 116.63, 119.78, 120.8, 129.94, 129.37, 133.82, 131.87, 133.61, 125.66, 130.1, 132.36, 134.46, 133.28, 135.07, 134.66, 130.7, 127.68, 131.59, 123.79, 126.77, 129.31, 133.74, 136.81, 137] },
      velocityScore: { '1D': 4.9, '1W': 10.2, '1M': 4.1, '6M': null }, isNew: false,
      marketCap: '$75B', pe: 20.2, revenueGrowth: 10, eps: 6.77, grossMargin: 47, dividendYield: 2.76,
      etfPresence: { POW: 2.9, VOLT: 4.63, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.32, proScore: 1.33, coverage: 0.4,
      price: 313.33, weeklyPrices: [311.42, 300.53, 318.47, 305.58, 313.33], weeklyChange: 0.61, dayChange: 2.54, sortRank: 0, periodReturns: { '1M': 4.2, 'YTD': 93.4, '6M': 94.9, '1Y': 148.9 },
      priceHistory: { '1D': [305.57, 312.77, 313.33], '1W': [311.42, 300.53, 318.47, 305.58, 313.33], '1M': [300.57, 289.52, 280.98, 297.88, 302.87, 311.93, 299.6, 317.58, 333.05, 357.96, 318.32, 316.43, 325.57, 303.95, 306.97, 334.82, 311.42, 300.53, 318.47, 305.58, 313.33], 'YTD': [162.01, 160.78, 172.54, 182.49, 186.18, 202, 243.53, 253.15, 244.44, 270.06, 268.41, 270.89, 250.58, 287.64, 294.13, 321.75, 328.49, 340.01, 376.23, 323.4, 315.71, 300.57, 311.93, 318.32, 334.82, 313.33], '6M': [160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 245.42, 254.89, 241.78, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 330.97, 367.92, 339.73, 327.46, 323.39, 300.57, 311.93, 318.32, 334.82, 313.33], '1Y': [125.89, 127.37, 125.29, 142.7, 138.76, 143.72, 129.05, 125.02, 124.01, 125.58, 136.65, 142.61, 150.86, 158.87, 175.15, 174.8, 190.57, 180.82, 179.05, 164.86, 168.91, 180.91, 178.38, 160.66, 166.26, 162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 243.75, 254.89, 241.78, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 330.97, 367.92, 339.73, 327.46, 323.39, 300.57, 311.93, 318.32, 334.82, 313.33] },
      velocityScore: { '1D': -1.5, '1W': -2.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$120B', pe: 78.9, revenueGrowth: 30, eps: 3.97, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 2.49, PBD: false, PBW: false, IVEP: 4.15 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.77, proScore: 1.11, coverage: 0.4,
      price: 157.09, weeklyPrices: [172.22, 164.59, 166.81, 158.61, 157.09], weeklyChange: -8.79, dayChange: -0.98, sortRank: 0, periodReturns: { '1M': 9.4, 'YTD': 16.2, '6M': 15.3, '1Y': 61.3 },
      priceHistory: { '1D': [158.64, 156.54, 156.87, 157.09], '1W': [172.22, 164.59, 166.81, 158.61, 157.09], '1M': [143.6, 154.07, 149.22, 152.46, 153.8, 158.59, 158.81, 161.11, 163.96, 165.96, 158.7, 162.78, 165.15, 163.72, 166.42, 176.32, 172.22, 164.59, 166.81, 158.61, 157.09], 'YTD': [135.14, 136.25, 154.22, 150.99, 144.08, 144.2, 148.57, 151.5, 129.58, 136.74, 135.12, 127.96, 126.35, 137.68, 148.96, 150.18, 147.27, 136.62, 129.19, 124.86, 148.76, 143.6, 158.59, 158.7, 176.32, 157.09], '6M': [136.25, 154.22, 150.99, 144.08, 136.23, 146.72, 147.82, 146.06, 131.87, 133.92, 126.74, 123.62, 126.49, 145.27, 152.81, 148.64, 141.03, 122.47, 121.72, 132.06, 146.34, 143.6, 158.59, 158.7, 176.32, 157.09], '1Y': [97.41, 99.44, 101.78, 105.31, 107.93, 111.85, 109.98, 109.73, 109.25, 116.79, 119.04, 125.4, 123.75, 124.53, 122.64, 124.44, 137.29, 136.7, 143.47, 132.44, 137.88, 141.49, 138.58, 129.13, 137.12, 135.14, 136.25, 154.22, 150.99, 144.08, 136.23, 146.72, 151.04, 146.06, 131.87, 133.92, 126.74, 123.62, 126.49, 145.27, 152.81, 148.64, 141.03, 122.47, 121.72, 132.06, 146.34, 143.6, 158.59, 158.7, 176.32, 157.09] },
      velocityScore: { '1D': -1.8, '1W': -1.8, '1M': -15.3, '6M': null }, isNew: false,
      marketCap: '$193B', pe: 45.3, revenueGrowth: 58, eps: 3.47, grossMargin: 38, dividendYield: 0.63,
      etfPresence: { POW: 1.05, VOLT: 4.5, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 2.75, proScore: 1.1, coverage: 0.4,
      price: 75.02, weeklyPrices: [72.77, 73.14, 72.82, 75.08, 75.02], weeklyChange: 3.09, dayChange: -0.07, sortRank: 0, periodReturns: { '1M': 4.8, 'YTD': 24.8, '6M': 22.7, '1Y': 30 },
      priceHistory: { '1D': [75.07, 75.21, 75.08, 75.02], '1W': [72.77, 73.14, 72.82, 75.08, 75.02], '1M': [71.59, 71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 71.25, 73.12, 74.95, 75.79, 75.87, 77.53, 77.92, 75.06, 74.34, 72.77, 73.14, 72.82, 75.08, 75.02], 'YTD': [60.11, 61.15, 60.29, 64.96, 67.26, 67.85, 71.96, 73.5, 75.88, 73.84, 73.69, 74.46, 72.78, 72.82, 70.86, 71.65, 76.31, 72.95, 77.69, 77.52, 71.39, 71.59, 71.49, 75.79, 74.34, 75.02], '6M': [61.15, 60.29, 64.96, 67.26, 66.92, 72.28, 72.98, 74.72, 74.24, 73.34, 72.41, 73.58, 72.59, 71.54, 70.91, 71.61, 75.41, 74.18, 77.69, 78.47, 70.04, 71.59, 71.49, 75.79, 74.34, 75.02], '1Y': [57.69, 58.37, 57.36, 58.89, 59, 57.76, 56.57, 56.83, 57.38, 57.57, 57.95, 61.39, 63.35, 63.97, 62.36, 62.34, 57.59, 56.51, 60.6, 59.17, 59.43, 60.21, 61.55, 58.41, 59.75, 60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 72.28, 72.98, 74.72, 74.24, 73.34, 72.41, 73.58, 72.59, 71.54, 70.91, 71.61, 75.41, 74.18, 77.69, 78.47, 70.04, 71.59, 71.49, 75.79, 74.34, 75.02] },
      velocityScore: { '1D': 5.8, '1W': 7.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$92B', pe: 32.9, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.8,
      etfPresence: { POW: false, VOLT: 1.61, PBD: false, PBW: false, IVEP: 3.89 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.57, proScore: 1.03, coverage: 0.4,
      price: 140.09, weeklyPrices: [144.80, 140.76, 142.72, 140.62, 140.09], weeklyChange: -3.25, dayChange: -0.38, sortRank: 0, periodReturns: { '1M': -2.7, 'YTD': 17, '6M': 25.9, '1Y': 32.8 },
      priceHistory: { '1D': [140.62, 140.05, 139.96, 140.09], '1W': [144.8, 140.76, 142.72, 140.62, 140.09], '1M': [144.05, 147.75, 139.36, 144.01, 144.96, 146.06, 145.17, 143.62, 144.82, 148.21, 141.28, 142.81, 145.49, 138.4, 140.47, 146.11, 144.8, 140.76, 142.72, 140.62, 140.09], 'YTD': [119.75, 111.29, 112.95, 113.59, 119.26, 139, 142.21, 144.71, 139.58, 133.94, 132.56, 136.43, 130.95, 141.85, 137.55, 141.73, 146.03, 139.25, 145.03, 135.47, 134.06, 144.05, 146.06, 141.28, 146.11, 140.09], '6M': [111.29, 112.95, 113.59, 119.26, 137.65, 139.24, 142.83, 144.3, 132.4, 130.16, 129.7, 131.29, 133.75, 142.82, 140.98, 143.38, 144.4, 141.78, 137.31, 138.36, 133.91, 144.05, 146.06, 141.28, 146.11, 140.09], '1Y': [105.5, 106.02, 108.3, 103.24, 104.84, 106.64, 104.52, 106.4, 105.96, 106.29, 106.96, 108.29, 109.95, 108.31, 107.85, 111.18, 112.21, 111.04, 121.94, 114.44, 114.19, 115.28, 115.77, 118.85, 121.13, 119.75, 111.29, 112.95, 113.59, 119.26, 137.65, 139.24, 143.79, 144.3, 132.4, 130.16, 129.7, 131.29, 133.75, 142.82, 140.98, 143.38, 144.4, 141.78, 137.31, 138.36, 133.91, 144.05, 146.06, 141.28, 146.11, 140.09] },
      velocityScore: { '1D': 1, '1W': 3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$85B', pe: 42.7, revenueGrowth: 8, eps: 3.28, grossMargin: 37, dividendYield: 1.14,
      etfPresence: { POW: false, VOLT: 1.45, PBD: false, PBW: false, IVEP: 3.69 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VST', name: 'Vistra Corp', easyScore: 2, avgWeight: 2.4, proScore: 0.96, coverage: 0.4,
      price: 156.45, weeklyPrices: [153.16, 151.05, 157.22, 155.73, 156.45], weeklyChange: 2.15, dayChange: 0.44, sortRank: 0, periodReturns: { '1M': 6.5, 'YTD': -3, '6M': 3.9, '1Y': -17.7 },
      priceHistory: { '1D': [155.77, 156.01, 156.23, 156.45], '1W': [153.16, 151.05, 157.22, 155.73, 156.45], '1M': [146.9, 146.22, 138.54, 146.38, 148.02, 153.52, 158.61, 158.83, 163.75, 167.26, 162.39, 162.87, 167.77, 163.49, 162.38, 158.63, 153.16, 151.05, 157.22, 155.73, 156.45], 'YTD': [161.33, 150.6, 180.18, 160.12, 158.35, 152.97, 173.68, 171.62, 161.7, 164.4, 164.33, 152.72, 150.33, 152.75, 165.53, 156.85, 157.84, 153.95, 141.9, 149.08, 160.23, 146.9, 153.52, 162.39, 158.63, 156.45], '6M': [150.6, 180.18, 160.12, 158.35, 149.65, 171.49, 167.8, 173.89, 158.65, 158.95, 146.02, 155.48, 151.59, 158.2, 159.6, 166.58, 160.85, 152.05, 136.75, 156.27, 154.76, 146.9, 153.52, 162.39, 158.63, 156.45], '1Y': [190.18, 191.37, 189.09, 198, 209.6, 209.56, 193.52, 190.08, 185.81, 193.78, 209.43, 204.24, 195.92, 199.62, 205.51, 186.52, 190.59, 185.74, 179.16, 174.42, 175.14, 172.55, 164.81, 173.45, 161.67, 161.33, 150.6, 180.18, 160.12, 158.35, 149.65, 171.49, 171.4, 173.89, 158.65, 158.95, 146.02, 155.48, 151.59, 158.2, 159.6, 166.58, 160.85, 152.05, 136.75, 156.27, 154.76, 146.9, 153.52, 162.39, 158.63, 156.45] },
      velocityScore: { '1D': 2.1, '1W': 5.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$53B', pe: 26.2, revenueGrowth: 43, eps: 5.98, grossMargin: 39, dividendYield: 0.59,
      etfPresence: { POW: 1.49, VOLT: false, PBD: false, PBW: false, IVEP: 3.32 },
      tonyNote: 'Vistra Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.34, proScore: 0.94, coverage: 0.4,
      price: 289.2, weeklyPrices: [356.35, 311.27, 310.84, 287.73, 289.20], weeklyChange: -18.84, dayChange: 0.51, sortRank: 0, periodReturns: { '1M': -5.5, 'YTD': 38.1, '6M': 37.1, '1Y': 109.5 },
      priceHistory: { '1D': [287.73, 288.02, 289.2], '1W': [356.35, 311.27, 310.84, 287.73, 289.2], '1M': [306.11, 311.64, 308.17, 340.4, 354.37, 370.66, 350.45, 353.32, 372.59, 388.23, 364.96, 359.61, 375.15, 348.11, 348.15, 372.87, 356.35, 311.27, 310.84, 287.73, 289.2], 'YTD': [209.37, 210.99, 257.29, 262.19, 255.36, 279.17, 314.12, 335.74, 322.47, 311.39, 315.91, 356.38, 322.71, 374.98, 372.23, 382.47, 383.91, 351.94, 344.6, 323.79, 302.18, 306.11, 370.66, 364.96, 372.87, 289.2], '6M': [210.99, 257.29, 262.19, 255.36, 273.26, 314.27, 329.24, 335.57, 290.78, 302.02, 317.21, 310.76, 331.9, 378.94, 380.22, 385.68, 387.03, 354.97, 309.06, 324.86, 294.65, 306.11, 370.66, 364.96, 372.87, 289.2], '1Y': [138.07, 139.1, 140.68, 142.21, 139.58, 158.81, 150.41, 153.01, 145.49, 154.76, 158.03, 176.59, 170.14, 173.09, 182.75, 196.58, 204.62, 195.05, 215.98, 199.22, 206.04, 210.94, 221.27, 215.16, 217.51, 209.37, 210.99, 257.29, 262.19, 255.36, 273.26, 314.27, 331.23, 335.57, 290.78, 302.02, 317.21, 310.76, 331.9, 378.94, 380.22, 385.68, 387.03, 354.97, 309.06, 324.86, 294.65, 306.11, 370.66, 364.96, 372.87, 289.2] },
      velocityScore: { '1D': -4.1, '1W': -15.3, '1M': -26.6, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 60.1, revenueGrowth: 26, eps: 4.81, grossMargin: 39, dividendYield: 0.14,
      etfPresence: { POW: 0.94, VOLT: 3.75, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'CEG', name: 'Constellation Energy Corp', easyScore: 2, avgWeight: 2.22, proScore: 0.89, coverage: 0.4,
      price: 238.8, weeklyPrices: [236.50, 239.25, 245.87, 239.71, 238.80], weeklyChange: 0.97, dayChange: -0.38, sortRank: 0, periodReturns: { '1M': -4.7, 'YTD': -32.4, '6M': -26, '1Y': -23.7 },
      priceHistory: { '1D': [239.71, 238.67, 238.2, 238.8], '1W': [236.5, 239.25, 245.87, 239.71, 238.8], '1M': [250.67, 251.65, 242.3, 246.71, 253.76, 262.35, 268, 267.17, 274.06, 275.53, 270.26, 267.97, 268.69, 264.02, 259.32, 248.37, 236.5, 239.25, 245.87, 239.71, 238.8], 'YTD': [353.27, 322.54, 341.2, 289.06, 280.68, 272.15, 303.01, 312.64, 324.87, 317.09, 307.69, 294.85, 279.25, 280.25, 299.14, 292.77, 313, 311.28, 275.26, 285.83, 287.75, 250.67, 262.35, 270.26, 248.37, 238.8], '6M': [322.54, 341.2, 289.06, 280.68, 261.42, 288.43, 293.8, 329.88, 319.06, 301.77, 281.99, 301.49, 275.16, 291.72, 287.56, 315.17, 321.05, 299.69, 262, 294.07, 265.7, 250.67, 262.35, 270.26, 248.37, 238.8], '1Y': [312.84, 317.99, 317.79, 330.52, 343.57, 338.57, 317.23, 310.68, 307.19, 300.82, 322.91, 336.65, 329.07, 358.16, 389.56, 358.79, 384.95, 362.82, 351.67, 339.35, 354.11, 363.67, 359.15, 365.63, 361.33, 353.27, 322.54, 341.2, 289.06, 280.68, 261.42, 288.43, 294.84, 329.88, 319.06, 301.77, 281.99, 301.49, 275.16, 291.72, 287.56, 315.17, 321.05, 299.69, 262, 294.07, 265.7, 250.67, 262.35, 270.26, 248.37, 238.8] },
      velocityScore: { '1D': 0, '1W': 3.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$85B', pe: 20.7, revenueGrowth: 64, eps: 11.51, grossMargin: 23, dividendYield: 0.71,
      etfPresence: { POW: 1.23, VOLT: false, PBD: false, PBW: false, IVEP: 3.21 },
      tonyNote: 'Constellation Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TLN', name: 'Talen Energy Corp', easyScore: 2, avgWeight: 2.19, proScore: 0.87, coverage: 0.4,
      price: 368.54, weeklyPrices: [360.79, 364.67, 377.79, 366.66, 368.54], weeklyChange: 2.15, dayChange: 0.51, sortRank: 0, periodReturns: { '1M': 1, 'YTD': -1.7, '6M': 3.5, '1Y': 32.8 },
      priceHistory: { '1D': [366.66, 369.72, 368.48, 368.54], '1W': [360.79, 364.67, 377.79, 366.66, 368.54], '1M': [364.78, 358.74, 336.59, 344.8, 360.54, 386.21, 406.51, 409.81, 436.29, 438.12, 411.92, 405.89, 416.8, 404.09, 399.34, 384.26, 360.79, 364.67, 377.79, 366.66, 368.54], 'YTD': [374.84, 356, 419.07, 366.43, 348.36, 353.66, 388.28, 375.24, 341.39, 331.58, 327.14, 315.77, 319.23, 312.76, 362.4, 345.25, 372.42, 390.55, 352.88, 360.48, 386.8, 364.78, 386.21, 411.92, 384.26, 368.54], '6M': [356, 419.07, 366.43, 348.36, 345, 376.7, 367.84, 370.97, 320.56, 316.14, 302.97, 324.54, 324.09, 326.08, 346.26, 369.67, 384.64, 383.44, 324.21, 372.45, 377.2, 364.78, 386.21, 411.92, 384.26, 368.54], '1Y': [277.46, 268.15, 313.58, 361.21, 384.27, 380.61, 368.16, 355.53, 375.15, 389.43, 409.6, 423.13, 425.38, 431.04, 417.75, 382.09, 394, 395.25, 374.55, 374.8, 380.49, 367.96, 348.38, 376.77, 380.75, 374.84, 356, 419.07, 366.43, 348.36, 345, 376.7, 382.25, 370.97, 320.56, 316.14, 302.97, 324.54, 324.09, 326.08, 346.26, 369.67, 384.64, 383.44, 324.21, 372.45, 377.2, 364.78, 386.21, 411.92, 384.26, 368.54] },
      velocityScore: { '1D': 0, '1W': 1.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$18B', pe: null, revenueGrowth: 97, eps: -0.51, grossMargin: 40, dividendYield: null,
      etfPresence: { POW: 1.67, VOLT: false, PBD: false, PBW: false, IVEP: 2.7 },
      tonyNote: 'Talen Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SO', name: 'Southern Co/The', easyScore: 2, avgWeight: 2.15, proScore: 0.86, coverage: 0.4,
      price: 97, weeklyPrices: [95.12, 97.98, 95.99, 97.29, 97.00], weeklyChange: 1.98, dayChange: -0.28, sortRank: 0, periodReturns: { '1M': 6.3, 'YTD': 11.2, '6M': 11.2, '1Y': 6.3 },
      priceHistory: { '1D': [97.28, 96.94, 96.91, 97], '1W': [95.12, 97.98, 95.99, 97.29, 97], '1M': [91.28, 92.95, 94.02, 93.27, 94, 93.82, 94.31, 92.53, 93.09, 93.43, 94.93, 95.78, 95.91, 97.16, 96.75, 95.71, 95.12, 97.98, 95.99, 97.29, 97], 'YTD': [87.2, 87.22, 88.78, 87.54, 89.31, 89.38, 92, 95.81, 96.79, 96.27, 98.27, 93.98, 96.52, 97.59, 94.9, 93.91, 96.7, 92.43, 93.68, 94.24, 92.05, 91.28, 93.82, 94.93, 95.71, 97], '6M': [87.22, 88.78, 87.54, 89.31, 90.08, 94.95, 95.18, 97.38, 97.48, 98.01, 93.39, 95.55, 96.94, 95.93, 93.51, 93.77, 95.99, 93.1, 93.71, 94.55, 89.03, 91.28, 93.82, 94.93, 95.71, 97], '1Y': [91.26, 92.47, 95.85, 95.2, 94.39, 93.96, 94.18, 93.13, 92.09, 91.21, 91.36, 93.72, 94.77, 96.42, 99.68, 97, 93.91, 92.73, 91.14, 90.69, 89.14, 89.04, 85.49, 85.71, 86.39, 87.2, 87.22, 88.78, 87.54, 89.31, 90.08, 94.95, 94.3, 97.38, 97.48, 98.01, 93.39, 95.55, 96.94, 95.93, 93.51, 93.77, 95.99, 93.1, 93.71, 94.55, 89.03, 91.28, 93.82, 94.93, 95.71, 97] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$109B', pe: 24.8, revenueGrowth: 8, eps: 3.91, grossMargin: 48, dividendYield: 3.12,
      etfPresence: { POW: 0.34, VOLT: false, PBD: false, PBW: false, IVEP: 3.96 },
      tonyNote: 'Southern Co/The appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.11, proScore: 2.04, coverage: 0.4,
      price: 951.32, weeklyPrices: [991.41, 963.53, 969.92, 940.12, 951.32], weeklyChange: -4.04, dayChange: 1.2, sortRank: 0, periodReturns: { '1M': 3.9, 'YTD': 66.1, '6M': 56.4, '1Y': 141.3 },
      priceHistory: { '1D': [940.08, 951.92, 950.73, 951.32], '1W': [991.41, 963.53, 969.92, 940.12, 951.32], '1M': [915.64, 914.7, 856.16, 897.63, 910.57, 933.93, 945.46, 955.92, 985.82, 1022.28, 984.24, 994.45, 1057.01, 997.47, 1033.19, 1064.9, 991.41, 963.53, 969.92, 940.12, 951.32], 'YTD': [572.87, 608.13, 647.18, 626.62, 657.36, 742.12, 764.76, 768.23, 722.18, 716.68, 702, 716.63, 708.46, 787.07, 772.66, 835.24, 890.11, 895.69, 920.22, 865.95, 875.87, 915.64, 933.93, 984.24, 1064.9, 951.32], '6M': [608.13, 647.18, 626.62, 657.36, 726.2, 774.2, 756.47, 742.83, 680.9, 693.99, 680.88, 695.4, 721.24, 791.73, 798.4, 828.79, 874.78, 926.79, 863.95, 879.89, 865.36, 915.64, 933.93, 984.24, 1064.9, 951.32], '1Y': [394.29, 404.64, 417.19, 430.05, 434.23, 412.71, 416.09, 432.3, 416.05, 418.09, 440.67, 471.26, 477.15, 486.71, 527.47, 524.65, 524.47, 547.58, 567.93, 546.88, 559.6, 582.47, 594.36, 588.93, 582.42, 572.87, 608.13, 647.18, 626.62, 657.36, 726.2, 774.2, 759.74, 742.83, 680.9, 693.99, 680.88, 695.4, 721.24, 791.73, 798.4, 828.79, 874.78, 926.79, 863.95, 879.89, 865.36, 915.64, 933.93, 984.24, 1064.9, 951.32] },
      velocityScore: { '1D': 0, '1W': -2.9, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$438B', pe: 47.3, revenueGrowth: 22, eps: 20.12, grossMargin: 29, dividendYield: 0.69,
      etfPresence: { AIRR: false, PRN: 3.33, RSHO: 6.89, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 4.77, proScore: 1.91, coverage: 0.4,
      price: 236.84, weeklyPrices: [264.86, 246.33, 248.05, 234.05, 236.84], weeklyChange: -10.58, dayChange: 1.19, sortRank: 0, periodReturns: { '1M': -19.3, 'YTD': 122.9, '6M': 97.5, '1Y': 228.3 },
      priceHistory: { '1D': [234.05, 236.99, 237.1, 236.84], '1W': [264.86, 246.33, 248.05, 234.05, 236.84], '1M': [293.6, 283.51, 262.34, 290.5, 294.75, 303.53, 292.7, 294.03, 297.2, 307.8, 291.5, 294.49, 309.2, 279.77, 281.09, 286.36, 264.86, 246.33, 248.05, 234.05, 236.84], 'YTD': [106.26, 119.94, 135.18, 139.32, 147.86, 187.3, 187.21, 186.39, 170.37, 176.51, 174.04, 186.82, 180.36, 230.81, 232.81, 252.18, 277.27, 305.93, 296.98, 270.75, 284.42, 293.6, 303.53, 291.5, 286.36, 236.84], '6M': [119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 181.38, 174.53, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 269.95, 322.05, 266.8, 279.22, 288.12, 293.6, 303.53, 291.5, 286.36, 236.84], '1Y': [72.14, 70.37, 73.67, 77.77, 78.75, 90.06, 84.7, 86.12, 87.92, 92.3, 99.41, 97.41, 101.6, 104.42, 105.73, 116.11, 128.09, 126.71, 121.07, 107.22, 100.03, 107.5, 115.02, 110.88, 112.88, 106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 182.27, 174.53, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 269.95, 322.05, 266.8, 279.22, 288.12, 293.6, 303.53, 291.5, 286.36, 236.84] },
      velocityScore: { '1D': -0.5, '1W': -2.6, '1M': -9.5, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 46.2, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.15,
      etfPresence: { AIRR: 2.2, PRN: false, RSHO: 7.33, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 4.6, proScore: 1.84, coverage: 0.4,
      price: 688.35, weeklyPrices: [776.55, 700.75, 717.11, 674.39, 688.35], weeklyChange: -11.36, dayChange: 2.07, sortRank: 0, periodReturns: { '1M': -22.8, 'YTD': 124.8, '6M': 131.3, '1Y': 203.2 },
      priceHistory: { '1D': [674.39, 686.85, 688.25, 688.35], '1W': [776.55, 700.75, 717.11, 674.39, 688.35], '1M': [891.86, 842.01, 770.25, 838.55, 858.99, 866.67, 857.76, 838.21, 861.88, 932.75, 892.25, 867.23, 881.92, 804.76, 813.77, 839.36, 776.55, 700.75, 717.11, 674.39, 688.35], 'YTD': [306.23, 297.62, 336.31, 351.39, 357.91, 418.61, 421.2, 459.72, 415.51, 411.53, 425.51, 446.16, 407.27, 435.65, 441.1, 495.67, 515.62, 811.41, 889.03, 733.77, 860.84, 891.86, 866.67, 892.25, 839.36, 688.35], '6M': [297.62, 336.31, 351.39, 357.91, 401.29, 437.77, 434.64, 428.13, 395.11, 398.12, 401.61, 420.24, 393.71, 459.02, 472.9, 505.45, 529.49, 868.18, 770.76, 732.94, 845.39, 891.86, 866.67, 892.25, 839.36, 688.35], '1Y': [227.02, 238.4, 242.01, 264.08, 296.58, 308.4, 276.02, 286.49, 276.91, 286.69, 319.38, 371.84, 339.68, 348.57, 361.44, 364.32, 379.89, 382.57, 381.22, 333.88, 342.44, 327.78, 324.1, 319.13, 315.87, 306.23, 297.62, 336.31, 351.39, 357.91, 401.29, 437.77, 435.5, 428.13, 395.11, 398.12, 401.61, 420.24, 393.71, 459.02, 472.9, 505.45, 529.49, 868.18, 770.76, 732.94, 845.39, 891.86, 866.67, 892.25, 839.36, 688.35] },
      velocityScore: { '1D': -2.1, '1W': -8.9, '1M': -18.9, '6M': null }, isNew: false,
      marketCap: '$21B', pe: 61.5, revenueGrowth: 92, eps: 11.19, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 5.23, PRN: 3.97, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'FIX', name: 'Comfort Systems USA, Inc.', easyScore: 2, avgWeight: 4.28, proScore: 1.71, coverage: 0.4,
      price: 1673.28, weeklyPrices: [1865.15, 1741.30, 1793.03, 1683.44, 1673.28], weeklyChange: -10.29, dayChange: -0.55, sortRank: 0, periodReturns: { '1M': -9.7, 'YTD': 79.3, '6M': 72.2, '1Y': 217.3 },
      priceHistory: { '1D': [1682.52, 1667, 1672.37, 1673.28], '1W': [1865.15, 1741.3, 1793.03, 1683.44, 1673.28], '1M': [1852.03, 1831.56, 1719.48, 1843.42, 1877.61, 1952.02, 1913.94, 1931.77, 1967.41, 2066.51, 1908.07, 1954.47, 2017.57, 1854.23, 1948.69, 1981.95, 1865.15, 1741.3, 1793.03, 1683.44, 1673.28], 'YTD': [933.29, 971.49, 1091.04, 1121.44, 1142.1, 1283.65, 1337.75, 1468.58, 1391.16, 1383.62, 1424.46, 1461.52, 1378.99, 1574.45, 1605.97, 1773.91, 1840.25, 1942.02, 2042.36, 1835.33, 1828.21, 1852.03, 1952.02, 1908.07, 1981.95, 1673.28], '6M': [971.49, 1091.04, 1121.44, 1142.1, 1230.26, 1337.95, 1413.57, 1429.37, 1279.06, 1365.34, 1356.75, 1366.77, 1434.09, 1627.81, 1680.09, 1794.04, 1891.95, 2032.98, 1854.43, 1828.25, 1787.88, 1852.03, 1952.02, 1908.07, 1981.95, 1673.28], '1Y': [527.42, 539.02, 532.14, 687.67, 691.45, 718.61, 683.93, 691.18, 698.61, 709.53, 777.18, 804.24, 825.18, 816.53, 831.89, 829.36, 980.97, 955.96, 954.53, 920.99, 945.07, 935.78, 983.61, 968.5, 965.37, 933.29, 971.49, 1091.04, 1121.44, 1142.1, 1230.26, 1337.95, 1462.23, 1429.37, 1279.06, 1365.34, 1356.75, 1366.77, 1434.09, 1627.81, 1680.09, 1794.04, 1891.95, 2032.98, 1854.43, 1828.25, 1787.88, 1852.03, 1952.02, 1908.07, 1981.95, 1673.28] },
      velocityScore: { '1D': -2.3, '1W': -6, '1M': -6, '6M': null }, isNew: false,
      marketCap: '$59B', pe: 51.5, revenueGrowth: 1, eps: 32.49, grossMargin: 25, dividendYield: 0.15,
      etfPresence: { AIRR: 4.07, PRN: 4.49, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Comfort Systems USA is a mechanical, electrical, and plumbing contractor that builds the HVAC and electrical systems inside data centers. Revenue grew significantly as data center construction activity surged. The $1828 share price reflects years of exceptional execution; the ETF weight confirms institutional managers are treating it as a core Industrials holding, not a one-cycle play.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.93, proScore: 1.57, coverage: 0.4,
      price: 311.86, weeklyPrices: [332.08, 330.85, 328.53, 315.33, 311.86], weeklyChange: -6.09, dayChange: -1.09, sortRank: 0, periodReturns: { '1M': -0.8, 'YTD': 21.5, '6M': 17.9, '1Y': 25.9 },
      priceHistory: { '1D': [315.29, 311.07, 311.86], '1W': [332.08, 330.85, 328.53, 315.33, 311.86], '1M': [314.42, 322.81, 314.08, 318.89, 320.11, 316.18, 324.38, 329.89, 337.96, 338.07, 330.9, 333.78, 343.54, 337.08, 334.16, 338.15, 332.08, 330.85, 328.53, 315.33, 311.86], 'YTD': [256.77, 264.62, 282.47, 280.14, 260.41, 282.45, 278.31, 282.27, 277.7, 264.31, 261.37, 264.14, 265.32, 286.41, 284.39, 294.4, 305.75, 310.37, 315.72, 305.66, 303.81, 314.42, 316.18, 330.9, 338.15, 311.86], '6M': [264.62, 282.47, 280.14, 260.41, 291.74, 279.84, 278.74, 282.58, 267.78, 255.65, 253.77, 260.67, 269.55, 293.26, 293.92, 298.1, 303.99, 310.55, 305.22, 307.1, 300.98, 314.42, 316.18, 330.9, 338.15, 311.86], '1Y': [247.66, 254.41, 264.89, 272.4, 269.28, 270.68, 262.92, 264.21, 263.15, 261.61, 262.58, 264.9, 261.05, 252.74, 252.95, 258.78, 258.03, 256.47, 255.53, 242.61, 249.05, 257.32, 257.3, 258.47, 263.58, 256.77, 264.62, 282.47, 280.14, 260.41, 291.74, 279.84, 281.97, 282.58, 267.78, 255.65, 253.77, 260.67, 269.55, 293.26, 293.92, 298.1, 303.99, 310.55, 305.22, 307.1, 300.98, 314.42, 316.18, 330.9, 338.15, 311.86] },
      velocityScore: { '1D': -0.6, '1W': 0, '1M': 15.4, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 29.4, revenueGrowth: 7, eps: 10.6, grossMargin: 30, dividendYield: 0.65,
      etfPresence: { AIRR: 1.82, PRN: false, RSHO: 6.04, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'EME', name: 'EMCOR Group, Inc.', easyScore: 2, avgWeight: 3.58, proScore: 1.43, coverage: 0.4,
      price: 771.07, weeklyPrices: [804.33, 774.66, 787.29, 768.38, 771.07], weeklyChange: -4.14, dayChange: 0.32, sortRank: 0, periodReturns: { '1M': -6.4, 'YTD': 26, '6M': 22.7, '1Y': 42.4 },
      priceHistory: { '1D': [768.61, 765.47, 770.21, 771.07], '1W': [804.33, 774.66, 787.29, 768.38, 771.07], '1M': [823.79, 827.78, 776.72, 811.53, 823.05, 842.3, 834.77, 827.5, 836.59, 868.88, 838.61, 847.17, 862.66, 798.1, 814.41, 829.88, 804.33, 774.66, 787.29, 768.38, 771.07], 'YTD': [611.79, 628.27, 682.13, 694.21, 720.73, 776.24, 797.5, 806.8, 736.3, 723.38, 728.55, 761.27, 738.31, 800.4, 792.25, 873.11, 891.67, 924.06, 930.03, 849.2, 826.82, 823.79, 842.3, 838.61, 829.88, 771.07], '6M': [628.27, 682.13, 694.21, 720.73, 764.35, 800.82, 806.66, 724.62, 705.79, 709.91, 724.93, 732.89, 757.54, 812.21, 831.11, 885.42, 910.26, 931.5, 877.19, 848.91, 830.95, 823.79, 842.3, 838.61, 829.88, 771.07], '1Y': [541.34, 549.76, 558.98, 636.23, 625, 632.57, 607.1, 609.16, 620.41, 623.03, 618.99, 644.7, 649.54, 673.08, 674.14, 689.95, 751.44, 654.5, 640.85, 614.59, 602.84, 606.37, 623.74, 624.56, 625.69, 611.79, 628.27, 682.13, 694.21, 720.73, 764.35, 800.82, 812.79, 724.62, 705.79, 709.91, 724.93, 732.89, 757.54, 812.21, 831.11, 885.42, 910.26, 931.5, 877.19, 848.91, 830.95, 823.79, 842.3, 838.61, 829.88, 771.07] },
      velocityScore: { '1D': 1.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$34B', pe: 25.9, revenueGrowth: 20, eps: 29.74, grossMargin: 19, dividendYield: 0.21,
      etfPresence: { AIRR: 3.76, PRN: 3.39, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'EMCOR Group is an electrical and mechanical construction services company. Revenue grew substantially, and EMCOR is a core Industrials ETF holding because it builds the electrical systems inside data centers, manufacturing plants, and commercial buildings. The $827 share price reflects years of consistent execution and market share gains in a fragmented contractor market.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 2, avgWeight: 3.22, proScore: 1.29, coverage: 0.4,
      price: 272.32, weeklyPrices: [267.41, 270.41, 277.91, 275.43, 272.32], weeklyChange: 1.84, dayChange: -1.11, sortRank: 0, periodReturns: { '1M': 10.5, 'YTD': 32.8, '6M': 29.7, '1Y': 51.7 },
      priceHistory: { '1D': [275.39, 271.9, 272.32], '1W': [267.41, 270.41, 277.91, 275.43, 272.32], '1M': [246.55, 257.16, 249.49, 264.6, 264.67, 270.44, 277.42, 283.23, 277.66, 280.36, 275.13, 276.06, 273.14, 268.87, 268.57, 268.86, 267.41, 270.41, 277.91, 275.43, 272.32], 'YTD': [205.02, 210.02, 224.26, 214.89, 208.08, 225.15, 252.55, 260.95, 258.84, 253.91, 240.24, 239.51, 230.46, 254.06, 247.6, 246.16, 243.04, 272.54, 272.37, 259.89, 258.25, 246.55, 270.44, 275.13, 268.86, 272.32], '6M': [210.02, 224.26, 214.89, 208.08, 223.16, 250.21, 257.04, 262.53, 250.13, 236.75, 231.21, 227.9, 236.57, 256.14, 255.62, 241.7, 239.7, 273.58, 256.99, 256.55, 255.52, 246.55, 270.44, 275.13, 268.86, 272.32], '1Y': [179.46, 184.68, 183.34, 189.17, 179.32, 180.9, 171.9, 171.24, 173.22, 178.98, 187.46, 193.58, 196.23, 191.46, 193.03, 197.18, 201.04, 205.02, 208.9, 201.22, 200.12, 196.26, 191.36, 195.18, 209.57, 205.02, 210.02, 224.26, 214.89, 208.08, 223.16, 250.21, 258.1, 262.53, 250.13, 236.75, 231.21, 227.9, 236.57, 256.14, 255.62, 241.7, 239.7, 273.58, 256.99, 256.55, 255.52, 246.55, 270.44, 275.13, 268.86, 272.32] },
      velocityScore: { '1D': 3.2, '1W': null, '1M': 34.4, '6M': null }, isNew: false,
      marketCap: '$109B', pe: 63.3, revenueGrowth: 19, eps: 4.3, grossMargin: 35, dividendYield: 0.17,
      etfPresence: { AIRR: false, PRN: 4.26, RSHO: false, IDEF: 2.18, BILT: false },
      tonyNote: 'Howmet Aerospace is an aerospace structures and engine components manufacturer. It appears in Industrials ETFs for its aerospace and defense exposure — commercial air travel recovery and defense spending growth are the two demand drivers. Revenue grew and margins are expanding as Howmet prices power over OEM customers.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 2.79, proScore: 1.12, coverage: 0.4,
      price: 216.37, weeklyPrices: [231.72, 227.74, 232.19, 218.83, 216.37], weeklyChange: -6.63, dayChange: -1.14, sortRank: 0, periodReturns: { '1M': -5.9, 'YTD': 8.2, '6M': 4.3, '1Y': 26.9 },
      priceHistory: { '1D': [218.85, 216.71, 216.37], '1W': [231.72, 227.74, 232.19, 218.83, 216.37], '1M': [229.95, 228.01, 223.63, 233.49, 230.05, 237.06, 234.8, 235.29, 242.97, 246.41, 236.07, 237.22, 244.56, 231.87, 238.21, 245.17, 231.72, 227.74, 232.19, 218.83, 216.37], 'YTD': [200.06, 207.44, 213.61, 211.03, 208.41, 223.86, 241.6, 243.04, 219.58, 210.96, 204.62, 200.67, 199.94, 215.54, 215.27, 223.96, 218.91, 205.27, 203.5, 205.39, 216.66, 229.95, 237.06, 236.07, 245.17, 216.37], '6M': [207.44, 213.61, 211.03, 208.41, 222.32, 239, 237.18, 226.94, 204.62, 199.45, 186.77, 200, 196.9, 221.27, 217.61, 222.45, 201.12, 203.24, 200.47, 207.8, 220.92, 229.95, 237.06, 236.07, 245.17, 216.37], '1Y': [170.53, 170.82, 173.83, 180.24, 203.71, 191.17, 188, 188.95, 184.11, 186.04, 185.77, 187.6, 186.78, 188.32, 185.28, 191.84, 197.07, 213.49, 221.42, 204.36, 211.97, 209.18, 209.32, 216.89, 205.46, 200.06, 207.44, 213.61, 211.03, 208.41, 222.32, 239, 242.29, 226.94, 204.62, 199.45, 186.77, 200, 196.9, 221.27, 217.61, 222.45, 201.12, 203.24, 200.47, 207.8, 220.92, 229.95, 237.06, 236.07, 245.17, 216.37] },
      velocityScore: { '1D': -0.9, '1W': -0.9, '1M': -0.9, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 41.4, revenueGrowth: 17, eps: 5.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 1.63, PRN: false, RSHO: 3.96, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.33, proScore: 0.93, coverage: 0.4,
      price: 184.98, weeklyPrices: [191.25, 191.06, 196.89, 186.08, 184.98], weeklyChange: -3.28, dayChange: -0.61, sortRank: 0, periodReturns: { '1M': -1.3, 'YTD': 7, '6M': -4.3, '1Y': 34.7 },
      priceHistory: { '1D': [186.11, 184.71, 184.98], '1W': [191.25, 191.06, 196.89, 186.08, 184.98], '1M': [187.46, 188.96, 183, 194.68, 193.45, 193.94, 196.93, 203.07, 205.4, 210, 209.89, 205.65, 204.77, 197.91, 189.25, 194.65, 191.25, 191.06, 196.89, 186.08, 184.98], 'YTD': [172.84, 193.2, 213.25, 207.75, 205.43, 203, 201.09, 204.23, 205.83, 195.91, 207.48, 204.76, 204.49, 230.29, 230.8, 225.51, 216.39, 209.89, 210.94, 202.52, 195.88, 187.46, 193.94, 209.89, 194.65, 184.98], '6M': [193.2, 213.25, 207.75, 205.43, 197.19, 200.4, 198.38, 205.98, 195.23, 194.13, 199.75, 202.59, 215.98, 232.83, 228.24, 222.07, 216.68, 210.8, 201.94, 202.91, 188.39, 187.46, 193.94, 209.89, 194.65, 184.98], '1Y': [137.37, 137.45, 140.04, 150.28, 182, 179.51, 165.76, 162.84, 160.03, 162.23, 176.65, 178.02, 184.37, 191.39, 202.46, 205.24, 207.62, 200.39, 195.65, 175.91, 174.62, 176.2, 177.16, 173.2, 177.62, 172.84, 193.2, 213.25, 207.75, 205.43, 197.19, 200.4, 206.44, 205.98, 195.23, 194.13, 199.75, 202.59, 215.98, 232.83, 228.24, 222.07, 216.68, 210.8, 201.94, 202.91, 188.39, 187.46, 193.94, 209.89, 194.65, 184.98] },
      velocityScore: { '1D': -3.1, '1W': 0, '1M': 2.2, '6M': null }, isNew: false,
      marketCap: '$17B', pe: 49.2, revenueGrowth: 26, eps: 3.76, grossMargin: 23, dividendYield: 0.56,
      etfPresence: { AIRR: 3.08, PRN: false, RSHO: false, IDEF: 1.58, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.88, proScore: 0.75, coverage: 0.4,
      price: 285.13, weeklyPrices: [278.97, 291.50, 294.10, 289.46, 285.13], weeklyChange: 2.21, dayChange: -1.46, sortRank: 0, periodReturns: { '1M': -2.4, 'YTD': -16.2, '6M': -24.7, '1Y': 15 },
      priceHistory: { '1D': [289.36, 284.82, 285.1, 285.13], '1W': [278.97, 291.5, 294.1, 289.46, 285.13], '1M': [292.26, 297.52, 289.13, 300.95, 297.68, 299.66, 298.51, 296.89, 285.43, 278.19, 283.48, 279.62, 279.09, 281.99, 277.39, 279.89, 278.97, 291.5, 294.1, 289.46, 285.13], 'YTD': [340.07, 378.47, 418.86, 418.58, 420.51, 405.82, 417.83, 447.73, 440.33, 417.51, 422.94, 402.08, 379.9, 403.37, 396.17, 370.14, 364.29, 314.72, 336.95, 317.55, 308.17, 292.26, 299.66, 283.48, 279.89, 285.13], '6M': [378.47, 418.86, 418.58, 420.51, 397.77, 418.78, 438.01, 444.52, 429.11, 415.71, 407.98, 381.79, 407.66, 394.46, 392.19, 358.4, 363.37, 317.75, 329.35, 320.63, 296.41, 292.26, 299.66, 283.48, 279.89, 285.13], '1Y': [247.95, 253.68, 253.96, 260.84, 270.92, 268, 265.4, 270.72, 269.71, 267.07, 273.19, 276.01, 287.91, 285.38, 291.94, 287.53, 299.14, 315.9, 324.19, 309.16, 309.92, 307.2, 314.95, 326.8, 354.52, 340.07, 378.47, 418.86, 418.58, 420.51, 397.77, 418.78, 437.57, 444.52, 429.11, 415.71, 407.98, 381.79, 407.66, 394.46, 392.19, 358.4, 363.37, 317.75, 329.35, 320.63, 296.41, 292.26, 299.66, 283.48, 279.89, 285.13] },
      velocityScore: { '1D': 1.4, '1W': 8.7, '1M': 1.4, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 18.5, revenueGrowth: 13, eps: 15.4, grossMargin: 12, dividendYield: 1.91,
      etfPresence: { AIRR: 2.74, PRN: false, RSHO: false, IDEF: 1.02, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'CW', name: 'Curtiss-Wright Corp', easyScore: 2, avgWeight: 1.88, proScore: 0.75, coverage: 0.4,
      price: 764.41, weeklyPrices: [757.76, 760.23, 792.77, 766.54, 764.41], weeklyChange: 0.88, dayChange: -0.26, sortRank: 0, periodReturns: { '1M': 6, 'YTD': 38.7, '6M': 31.2, '1Y': 58.8 },
      priceHistory: { '1D': [766.37, 755.76, 764.41], '1W': [757.76, 760.23, 792.77, 766.54, 764.41], '1M': [721.33, 733.57, 719.02, 757.23, 758, 762.59, 764.61, 777.29, 771.93, 783.82, 765.13, 762.92, 767.73, 747.27, 737.39, 757.76, 757.76, 760.23, 792.77, 766.54, 764.41], 'YTD': [551.27, 582.61, 660.66, 649.08, 656.69, 653.82, 688, 712.45, 701.99, 703.61, 679.58, 700.81, 681.12, 722.52, 719.99, 725.5, 720.2, 724.43, 750.84, 726.88, 747.61, 721.33, 762.59, 765.13, 757.76, 764.41], '6M': [582.61, 660.66, 649.08, 656.69, 649.32, 684.22, 699.24, 700.33, 681.69, 656.02, 671.19, 663.56, 699.12, 734.01, 730.01, 717.16, 718.82, 728.58, 710.34, 731.24, 719.99, 721.33, 762.59, 765.13, 757.76, 764.41], '1Y': [481.23, 480.79, 474.48, 492.25, 511.64, 501.65, 479.75, 478.91, 482.35, 481.72, 513.07, 518.2, 542.94, 540.38, 554.66, 553.08, 588.43, 586.02, 575.18, 536.81, 546.35, 547.36, 539.04, 543.95, 569.54, 551.27, 582.61, 660.66, 649.08, 656.69, 649.32, 684.22, 707.45, 700.33, 681.69, 656.02, 671.19, 663.56, 699.12, 734.01, 730.01, 717.16, 718.82, 728.58, 710.34, 731.24, 719.99, 721.33, 762.59, 765.13, 757.76, 764.41] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$28B', pe: 56, revenueGrowth: 13, eps: 13.64, grossMargin: 37, dividendYield: 0.14,
      etfPresence: { AIRR: false, PRN: 2.79, RSHO: false, IDEF: 0.96, BILT: false },
      tonyNote: 'Curtiss-Wright Corp appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 1.81, proScore: 0.72, coverage: 0.4,
      price: 50.6, weeklyPrices: [53.04, 55.35, 53.54, 50.34, 50.60], weeklyChange: -4.59, dayChange: 0.53, sortRank: 0, periodReturns: { '1M': -12.3, 'YTD': -33.3, '6M': -51.4, '1Y': 14.1 },
      priceHistory: { '1D': [50.34, 50.67, 50.7, 50.6], '1W': [53.04, 55.35, 53.54, 50.34, 50.6], '1M': [57.73, 56.19, 54.82, 58.78, 57.75, 57.02, 56.34, 56.16, 54.21, 51.09, 50.8, 47.95, 46.32, 47.21, 46.95, 49.86, 53.04, 55.35, 53.54, 50.34, 50.6], 'YTD': [75.91, 104.04, 124.56, 110.39, 103.01, 98.81, 91.97, 90.68, 88.95, 88.96, 95.31, 77.49, 70.51, 68.33, 74.41, 65.52, 63.05, 57, 54.85, 54.67, 64.13, 57.73, 57.02, 50.8, 49.86, 50.6], '6M': [104.04, 124.56, 110.39, 103.01, 94.41, 89.06, 94.31, 86.18, 87, 87.53, 84.62, 71.94, 74.09, 73.55, 69.83, 63.16, 61.93, 56.99, 54.22, 56.18, 63.49, 57.73, 57.02, 50.8, 49.86, 50.6], '1Y': [44.34, 51.12, 55.42, 57.09, 59.4, 69.14, 64.02, 66.9, 66.09, 64.56, 76.35, 83.9, 91.37, 103.69, 95.3, 90.62, 89.78, 90.22, 76.59, 70.36, 74.11, 70.96, 77.03, 73.13, 82.3, 75.91, 104.04, 124.56, 110.39, 103.01, 94.41, 89.06, 96.08, 86.18, 87, 87.53, 84.62, 71.94, 74.09, 73.55, 69.83, 63.16, 61.93, 56.99, 54.22, 56.18, 63.49, 57.73, 57.02, 50.8, 49.86, 50.6] },
      velocityScore: { '1D': -4, '1W': 7.5, '1M': -11.1, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 316.3, revenueGrowth: 23, eps: 0.16, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.66, PRN: false, RSHO: false, IDEF: 0.95, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 1.39, proScore: 0.55, coverage: 0.4,
      price: 75.02, weeklyPrices: [72.77, 73.14, 72.82, 75.08, 75.02], weeklyChange: 3.09, dayChange: -0.07, sortRank: 0, periodReturns: { '1M': 4.8, 'YTD': 24.8, '6M': 22.7, '1Y': 30 },
      priceHistory: { '1D': [75.07, 75.21, 75.08, 75.02], '1W': [72.77, 73.14, 72.82, 75.08, 75.02], '1M': [71.59, 71.59, 72.26, 71.62, 72.08, 71.49, 71.48, 71.25, 73.12, 74.95, 75.79, 75.87, 77.53, 77.92, 75.06, 74.34, 72.77, 73.14, 72.82, 75.08, 75.02], 'YTD': [60.11, 61.15, 60.29, 64.96, 67.26, 67.85, 71.96, 73.5, 75.88, 73.84, 73.69, 74.46, 72.78, 72.82, 70.86, 71.65, 76.31, 72.95, 77.69, 77.52, 71.39, 71.59, 71.49, 75.79, 74.34, 75.02], '6M': [61.15, 60.29, 64.96, 67.26, 66.92, 72.28, 72.98, 74.72, 74.24, 73.34, 72.41, 73.58, 72.59, 71.54, 70.91, 71.61, 75.41, 74.18, 77.69, 78.47, 70.04, 71.59, 71.49, 75.79, 74.34, 75.02], '1Y': [57.69, 58.37, 57.36, 58.89, 59, 57.76, 56.57, 56.83, 57.38, 57.57, 57.95, 61.39, 63.35, 63.97, 62.36, 62.34, 57.59, 56.51, 60.6, 59.17, 59.43, 60.21, 61.55, 58.41, 59.75, 60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 72.28, 72.98, 74.72, 74.24, 73.34, 72.41, 73.58, 72.59, 71.54, 70.91, 71.61, 75.41, 74.18, 77.69, 78.47, 70.04, 71.59, 71.49, 75.79, 74.34, 75.02] },
      velocityScore: { '1D': 0, '1W': -1.8, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$92B', pe: 32.9, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.8,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.92, IDEF: false, BILT: 1.85 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AIR', name: 'AIRBUS GROUP', easyScore: 2, avgWeight: 1.34, proScore: 0.54, coverage: 0.4,
      price: 134.76, weeklyPrices: [142.76, 140.11, 143.61, 136.63, 134.76], weeklyChange: -5.6, dayChange: -1.39, sortRank: 0, periodReturns: { '1M': 17.5, 'YTD': 62.8, '6M': 42.3, '1Y': 88.1 },
      priceHistory: { '1D': [136.66, 135, 134.76], '1W': [142.76, 140.11, 143.61, 136.63, 134.76], '1M': [114.72, 120.13, 117.36, 127.23, 129.01, 131.18, 129.96, 132.14, 134.88, 134.28, 132.26, 132.94, 138.51, 143.14, 141.85, 142.93, 142.76, 140.11, 143.61, 136.63, 134.76], 'YTD': [82.79, 94.73, 105.74, 105.66, 105.91, 114.34, 113.54, 118.26, 116.84, 108.3, 108.76, 107.81, 109.46, 123.04, 118.51, 112.08, 110.37, 117.82, 108.64, 108.44, 112.62, 114.72, 131.18, 132.26, 142.93, 134.76], '6M': [94.73, 105.74, 105.66, 105.91, 113.09, 112.98, 116.69, 117.17, 108.52, 101.91, 101.33, 107.25, 114, 123.77, 121.97, 110.2, 109.56, 117.57, 103.79, 108.41, 109.99, 114.72, 131.18, 132.26, 142.93, 134.76], '1Y': [71.65, 73.39, 79.01, 76.1, 72.4, 78.01, 73.85, 75.09, 76.37, 73.92, 75.75, 78.35, 89.67, 83.06, 82.93, 84.73, 84.56, 83.96, 83.84, 77.76, 79.67, 82.88, 79.47, 81.49, 85.44, 82.79, 94.73, 105.74, 105.66, 105.91, 113.09, 112.98, 116.97, 117.17, 108.52, 101.91, 101.33, 107.25, 114, 123.77, 121.97, 110.2, 109.56, 117.57, 103.79, 108.41, 109.99, 114.72, 131.18, 132.26, 142.93, 134.76] },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: 29.6, revenueGrowth: 25, eps: 4.55, grossMargin: 19, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 2.53, BILT: false },
      tonyNote: 'AIRBUS GROUP appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.17, proScore: 0.47, coverage: 0.4,
      price: 594.35, weeklyPrices: [620.47, 604.56, 609.60, 600.26, 594.35], weeklyChange: -4.21, dayChange: -0.98, sortRank: 0, periodReturns: { '1M': 0.6, 'YTD': 32.5, '6M': 22.5, '1Y': 55.8 },
      priceHistory: { '1W': [620.47, 604.56, 609.6, 600.26, 594.35], '1M': [590.97, 592.41, 576.74, 607.46, 603.64, 616.95, 621.08, 625.73, 639.18, 645.73, 633.44, 638.94, 648.89, 630.36, 634.78, 644.06, 620.47, 604.56, 609.6, 600.26, 594.35], 'YTD': [448.43, 485, 497.06, 504.07, 499.67, 548.2, 552.93, 571.57, 568.58, 560.28, 544.55, 552.23, 543.12, 595.11, 571.61, 601.39, 599.09, 611.54, 611.93, 566.96, 571.96, 590.97, 616.95, 633.44, 644.06, 594.35], '6M': [485, 497.06, 504.07, 499.67, 544.02, 552.44, 562.54, 575.92, 552.91, 536.37, 531.11, 532.25, 552.4, 595.74, 596.86, 591, 593.12, 613.59, 551.12, 559.95, 566.14, 590.97, 616.95, 633.44, 644.06, 594.35], '1Y': [381.6, 375.51, 392.38, 385.08, 403.78, 404.99, 397.81, 399.58, 387.71, 374.88, 378.73, 383.7, 390.29, 373.47, 383.98, 392.33, 408.15, 427.24, 442.47, 423.39, 430, 440.04, 436.5, 451.17, 457.07, 448.43, 485, 497.06, 504.07, 499.67, 544.02, 552.44, 559.18, 575.92, 552.91, 536.37, 531.11, 532.25, 552.4, 595.74, 596.86, 591, 593.12, 613.59, 551.12, 559.95, 566.14, 590.97, 616.95, 633.44, 644.06, 594.35] },
      velocityScore: { '1D': 2.2, '1W': 0, '1M': -19, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 65.6, revenueGrowth: 18, eps: 9.06, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 1.87, PRN: false, RSHO: false, IDEF: 0.47, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 1.16, proScore: 0.46, coverage: 0.4,
      price: 51.89, weeklyPrices: [54.93, 56.37, 53.36, 51.47, 51.89], weeklyChange: -5.53, dayChange: 0.74, sortRank: 0, periodReturns: { '1M': 4.5, 'YTD': -29.1, '6M': -48.8, '1Y': 15.2 },
      priceHistory: { '1D': [51.51, 51.65, 51.73, 51.89], '1W': [54.93, 56.37, 53.36, 51.47, 51.89], '1M': [49.64, 48.37, 45.87, 49.58, 47.83, 48.27, 51.7, 52.03, 50.37, 47.7, 46.38, 44.84, 46.27, 46.42, 47.1, 49.92, 54.93, 56.37, 53.36, 51.47, 51.89], 'YTD': [73.17, 101.28, 109.49, 108.22, 103.8, 97.47, 75.11, 83.6, 91.11, 102.79, 104.06, 101.84, 80.05, 84.22, 87.91, 76.6, 67.98, 60.45, 66.02, 65.3, 57.5, 49.64, 48.27, 46.38, 49.92, 51.89], '6M': [101.28, 109.49, 108.22, 103.8, 95.36, 75.79, 81.27, 88.11, 100.54, 99.98, 99.38, 84.07, 86.1, 87.79, 82.69, 71.95, 65.32, 58.82, 66.21, 64.1, 53.65, 49.64, 48.27, 46.38, 49.92, 51.89], '1Y': [45.03, 48.31, 51.96, 51.41, 50.39, 49.03, 49.87, 53.04, 53.89, 62.51, 64.86, 68.71, 72.2, 75.2, 77, 78.99, 85.34, 84.7, 69.38, 58.95, 63.9, 63.83, 63.75, 67.19, 79.98, 73.17, 101.28, 109.49, 108.22, 103.8, 95.36, 75.79, 81.62, 88.11, 100.54, 99.98, 99.38, 84.07, 86.1, 87.79, 82.69, 71.95, 65.32, 58.82, 66.21, 64.1, 53.65, 49.64, 48.27, 46.38, 49.92, 51.89] },
      velocityScore: { '1D': 0, '1W': 12.2, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$7B', pe: 225.6, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 2.11, PRN: false, RSHO: false, IDEF: 0.2, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.16, proScore: 0.46, coverage: 0.4,
      price: 111.59, weeklyPrices: [123.05, 126.21, 123.07, 115.83, 111.59], weeklyChange: -9.31, dayChange: -3.66, sortRank: 0, periodReturns: { '1M': 0.6, 'YTD': 52.8, '6M': 25.7, '1Y': 114.6 },
      priceHistory: { '1D': [115.83, 112.14, 111.08, 111.59], '1W': [123.05, 126.21, 123.07, 115.83, 111.59], '1M': [110.94, 108.82, 106.81, 119.32, 120.3, 115.93, 112.44, 115.5, 113.91, 111.76, 110.87, 105, 105.57, 109.38, 110.22, 122.33, 123.05, 126.21, 123.07, 115.83, 111.59], 'YTD': [73.01, 88.74, 102.95, 99.05, 93.88, 85.37, 83.32, 88.76, 89.43, 86.87, 81.35, 74.49, 72.91, 79.23, 84.91, 78.91, 78.91, 88.06, 94.55, 96.36, 111.7, 110.94, 115.93, 110.87, 122.33, 111.59], '6M': [88.74, 102.95, 99.05, 93.88, 82.2, 82.36, 85.9, 89.03, 86.42, 78.16, 77.26, 71.4, 75.76, 82.52, 84.12, 77.06, 78.53, 91.95, 93.39, 98.55, 111.28, 110.94, 115.93, 110.87, 122.33, 111.59], '1Y': [52, 50.09, 51.51, 51.88, 54.24, 68.02, 64.22, 67.98, 67.66, 68.69, 74.59, 75.34, 77.4, 83.47, 77.76, 78.81, 77.6, 75.71, 72.74, 67.94, 66.67, 67.69, 71.86, 71.8, 75.07, 73.01, 88.74, 102.95, 99.05, 93.88, 82.2, 82.36, 87.63, 89.03, 86.42, 78.16, 77.26, 71.4, 75.76, 82.52, 84.12, 77.06, 78.53, 91.95, 93.39, 98.55, 111.28, 110.94, 115.93, 110.87, 122.33, 111.59] },
      velocityScore: { '1D': -4.2, '1W': 2.2, '1M': 9.5, '6M': null }, isNew: false,
      marketCap: '$7B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.28, PRN: false, RSHO: false, IDEF: 1.03, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.59, proScore: 0.24, coverage: 0.4,
      price: 45.05, weeklyPrices: [42.69, 43.72, 45.37, 45.47, 45.05], weeklyChange: 5.52, dayChange: -0.93, sortRank: 0, periodReturns: { '1M': -3.2, 'YTD': 32.1, '6M': 16, '1Y': -3 },
      priceHistory: { '1D': [45.47, 45.13, 45.05], '1W': [42.69, 43.72, 45.37, 45.47, 45.05], '1M': [46.55, 47.35, 46.11, 49.69, 48.53, 46.68, 45.59, 46.58, 46.08, 44.99, 45.74, 44.69, 44.36, 42.48, 40.95, 42.67, 42.69, 43.72, 45.37, 45.47, 45.05], 'YTD': [34.09, 38.84, 42.26, 40.99, 41.06, 40.22, 39.13, 43.82, 45.51, 46.35, 45.6, 44.06, 44.52, 47.1, 44.94, 41.41, 40.63, 41.44, 42.86, 44.55, 48.76, 46.55, 46.68, 45.74, 42.67, 45.05], '6M': [38.84, 42.26, 40.99, 41.06, 38.93, 38.13, 38.14, 43.39, 46.58, 45.3, 43.82, 44.84, 46.73, 47.43, 44.24, 40.72, 40, 41.49, 42.84, 44.92, 47.96, 46.55, 46.68, 45.74, 42.67, 45.05], '1Y': [46.44, 47.59, 46.14, 48.2, 41.48, 41.87, 41.17, 41.03, 42.01, 40.33, 41.78, 43.1, 45.4, 44.72, 43.85, 40.35, 40.18, 36.15, 35.59, 34, 33.63, 33.18, 33.96, 33.12, 34.62, 34.09, 38.84, 42.26, 40.99, 41.06, 38.93, 38.13, 40.03, 43.39, 46.58, 45.3, 43.82, 44.84, 46.73, 47.43, 44.24, 40.72, 40, 41.49, 42.84, 44.92, 47.96, 46.55, 46.68, 45.74, 42.67, 45.05] },
      velocityScore: { '1D': 4.3, '1W': 14.3, '1M': 4.3, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 42.1, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.79,
      etfPresence: { AIRR: 0.89, PRN: false, RSHO: false, IDEF: 0.3, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.36, proScore: 0.14, coverage: 0.4,
      price: 75.15, weeklyPrices: [79.51, 76.75, 79.91, 74.87, 75.15], weeklyChange: -5.49, dayChange: 0.37, sortRank: 0, periodReturns: { '1M': 4.2, 'YTD': 12.1, '6M': 7.1, '1Y': 59.4 },
      priceHistory: { '1D': [74.87, 74.68, 75.15], '1W': [79.51, 76.75, 79.91, 74.87, 75.15], '1M': [72.13, 71.48, 68.72, 73.61, 74.92, 76.55, 76.19, 77.89, 77.99, 81.5, 81, 82.36, 81.56, 79.53, 81.88, 82.97, 79.51, 76.75, 79.91, 74.87, 75.15], 'YTD': [67.02, 70.17, 75.17, 76.01, 78.89, 84.07, 82.24, 85.87, 69.95, 71.29, 71.44, 75.25, 77.19, 81.5, 84.39, 86.48, 92.92, 81.96, 83.01, 74.88, 71.49, 72.13, 76.55, 81, 82.97, 75.15], '6M': [70.17, 75.17, 76.01, 78.89, 83.48, 82.74, 84.99, 75.37, 72.82, 67.76, 69.34, 76.15, 77.66, 83.8, 84.38, 87.5, 92.76, 82.79, 75.43, 72.76, 74.26, 72.13, 76.55, 81, 82.97, 75.15], '1Y': [47.15, 48.83, 48.51, 46.91, 47.66, 58.77, 56.02, 58.52, 59.13, 60.47, 63.88, 66.54, 65.59, 61.61, 63.27, 66.87, 68.4, 65.72, 62.63, 60.48, 64.01, 66.47, 68.59, 69.46, 68.65, 67.02, 70.17, 75.17, 76.01, 78.89, 83.48, 82.74, 86.9, 75.37, 72.82, 67.76, 69.34, 76.15, 77.66, 83.8, 84.38, 87.5, 92.76, 82.79, 75.43, 72.76, 74.26, 72.13, 76.55, 81, 82.97, 75.15] },
      velocityScore: { '1D': -6.7, '1W': -6.7, '1M': 7.7, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 51.5, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.32,
      etfPresence: { AIRR: 0.69, PRN: false, RSHO: false, IDEF: 0.03, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TKR', name: 'TIMKEN CO/THE', easyScore: 1, avgWeight: 8.69, proScore: 1.74, coverage: 0.2,
      price: 137.25, weeklyPrices: [141.75, 139.16, 142.36, 138.06, 137.25], weeklyChange: -3.17, dayChange: -0.63, sortRank: 0, periodReturns: { '1M': 1.9, 'YTD': 63.1, '6M': 51.5, '1Y': 78.4 },
      priceHistory: { '1D': [138.12, 136.28, 137.24, 137.25], '1W': [141.75, 139.16, 142.36, 138.06, 137.25], '1M': [134.67, 137.09, 132.39, 137.4, 137.06, 139.12, 140.28, 139.4, 142.36, 141.97, 137.64, 137.99, 144.01, 141.22, 143.5, 145.32, 141.75, 139.16, 142.36, 138.06, 137.25], 'YTD': [84.13, 90.6, 93.73, 93.94, 93.19, 108.93, 105.54, 109.52, 106.58, 102.18, 98.59, 101.03, 100.57, 106.92, 103.92, 108.7, 110.89, 116.34, 116.74, 118.93, 127.98, 134.67, 139.12, 137.64, 145.32, 137.25], '6M': [90.6, 93.73, 93.94, 93.19, 106.04, 107.84, 107.83, 108.38, 99.68, 97.54, 95.25, 97.56, 98.94, 106.9, 108.45, 108.7, 107.12, 117.39, 112.73, 119.95, 126.54, 134.67, 139.12, 137.64, 145.32, 137.25], '1Y': [76.94, 76.33, 80.02, 80.98, 74.65, 76.91, 76.88, 79.25, 76.49, 76.14, 77.91, 76.75, 75.18, 75.83, 74.28, 77.3, 77.22, 76.29, 78.2, 74.33, 79.9, 79.82, 83.16, 85.77, 86.09, 84.13, 90.6, 93.73, 93.94, 93.19, 106.04, 107.84, 108.16, 108.38, 99.68, 97.54, 95.25, 97.56, 98.94, 106.9, 108.45, 108.7, 107.12, 117.39, 112.73, 119.95, 126.54, 134.67, 139.12, 137.64, 145.32, 137.25] },
      velocityScore: { '1D': 0, '1W': 0, '1M': -2.8, '6M': null }, isNew: false,
      marketCap: '$10B', pe: 31.2, revenueGrowth: 8, eps: 4.4, grossMargin: 31, dividendYield: 1.04,
      etfPresence: { AIRR: false, PRN: false, RSHO: 8.69, IDEF: false, BILT: false },
      tonyNote: 'TIMKEN CO/THE appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.19, proScore: 4.19, coverage: 1,
      price: 202.82, weeklyPrices: [229.18, 215.62, 213.02, 195.19, 202.82], weeklyChange: -11.5, dayChange: 3.91, sortRank: 0, periodReturns: { '1M': -7, 'YTD': 142.3, '6M': 108.4, '1Y': 330.6 },
      priceHistory: { '1D': [195.19, 202.84, 203.51, 202.82], '1W': [229.18, 215.62, 213.02, 195.19, 202.82], '1M': [218, 220.12, 211.69, 222.24, 232.36, 260.07, 265.1, 280.91, 286.69, 283.61, 275.25, 259.66, 256.63, 240.3, 261.15, 276.17, 229.18, 215.62, 213.02, 195.19, 202.82], 'YTD': [83.71, 97.3, 103.89, 94.5, 85.19, 92.88, 97.52, 102.58, 86.8, 96.43, 116.33, 114.91, 103.76, 136.33, 165.34, 157.08, 138.23, 184.77, 221.15, 219.93, 231.09, 218, 260.07, 275.25, 276.17, 202.82], '6M': [97.3, 103.89, 94.5, 85.19, 86.1, 98.01, 100.61, 91.19, 89.33, 112.95, 117.62, 100.82, 112.54, 154.56, 159.16, 144.96, 176.42, 186.1, 199.86, 214.77, 264.51, 218, 260.07, 275.25, 276.17, 202.82], '1Y': [47.1, 53.53, 51.01, 50.4, 55.17, 75.33, 67.19, 70.02, 65.72, 95.72, 89.43, 107.8, 112.27, 117.7, 128.15, 104.28, 121.83, 110.54, 102.22, 90.54, 91.9, 96.45, 96.41, 80.95, 90.03, 83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 98.01, 97.92, 91.19, 89.33, 112.95, 117.62, 100.82, 112.54, 154.56, 159.16, 144.96, 176.42, 186.1, 199.86, 214.77, 264.51, 218, 260.07, 275.25, 276.17, 202.82] },
      velocityScore: { '1D': 0.5, '1W': -2.3, '1M': -10.1, '6M': null }, isNew: false,
      marketCap: '$51B', pe: 78, revenueGrowth: 684, eps: 2.6, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 2.96, MEME: 6.15, RKNG: 3.45 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 5.8, proScore: 3.87, coverage: 0.667,
      price: 263.49, weeklyPrices: [289.50, 270.89, 295.05, 269.57, 263.49], weeklyChange: -8.98, dayChange: -2.23, sortRank: 0, periodReturns: { '1M': 3.9, 'YTD': 203.2, '6M': 116.3, '1Y': 984.3 },
      priceHistory: { '1D': [269.5, 261.72, 261.71, 263.49], '1W': [289.5, 270.89, 295.05, 269.57, 263.49], '1M': [253.57, 259.61, 234.23, 248.88, 260.22, 274.5, 280.88, 284.99, 328.91, 345.85, 321.98, 326.19, 309.18, 252.02, 275.01, 302.7, 289.5, 270.89, 295.05, 269.57, 263.49], 'YTD': [86.89, 121.84, 139.17, 144.89, 151.37, 155.17, 145.32, 166.2, 153.02, 154, 160.05, 145.88, 135.49, 160.13, 210.06, 237.57, 283.36, 258.64, 303.41, 307.88, 285, 253.57, 274.5, 321.98, 302.7, 263.49], '6M': [121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 155.67, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 283.92, 258.71, 302.49, 273.51, 253.57, 274.5, 321.98, 302.7, 263.49], '1Y': [24.3, 25.31, 25.93, 34.75, 37.61, 41.25, 43.1, 49.35, 51.35, 55, 73.29, 77.38, 84.57, 86.06, 114.06, 104.38, 113.28, 129.05, 127.07, 104.97, 95.56, 105, 109.44, 87.61, 91.43, 86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 147.55, 155.67, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 283.92, 258.71, 302.49, 273.51, 253.57, 274.5, 321.98, 302.7, 263.49] },
      velocityScore: { '1D': 50, '1W': 31.2, '1M': 15.5, '6M': null }, isNew: false,
      marketCap: '$75B', pe: null, revenueGrowth: 130, eps: -0.03, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.74, RKNG: 3.86 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 4.66, proScore: 3.1, coverage: 0.667,
      price: 1680.11, weeklyPrices: [2032.22, 1745.00, 1744.43, 1617.70, 1680.11], weeklyChange: -17.33, dayChange: 3.86, sortRank: 0, periodReturns: { '1M': 2.3, 'YTD': 607.8, '6M': 402.2, '1Y': 3539 },
      priceHistory: { '1D': [1617.7, 1667.01, 1680.11], '1W': [2032.22, 1745, 1744.43, 1617.7, 1680.11], '1M': [1642, 1646.54, 1643.23, 1881.51, 1980.1, 2107.86, 1991.55, 1958.8, 2184.75, 2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745, 1744.43, 1617.7, 1680.11], 'YTD': [237.38, 334.54, 409.24, 473.83, 576.25, 583.4, 590.59, 638.52, 565.41, 618.89, 720.17, 702.48, 635.34, 851.57, 919.47, 932.43, 1096.51, 1339.96, 1382.72, 1542.24, 1694.98, 1642, 2107.86, 1963.6, 2273.73, 1680.11], '6M': [334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1478.69, 1761.43, 1642, 2107.86, 1963.6, 2273.73, 1680.11], '1Y': [46.17, 42.72, 41.36, 42.93, 41.93, 46.83, 44.58, 46.78, 51.07, 70.51, 91.55, 106.4, 112.2, 120.95, 127.29, 149.29, 175.53, 194.57, 271.58, 244.93, 226.96, 205.35, 219.46, 209.31, 244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1478.69, 1761.43, 1642, 2107.86, 1963.6, 2273.73, 1680.11] },
      velocityScore: { '1D': -3.1, '1W': 7.3, '1M': -16.7, '6M': null }, isNew: false,
      marketCap: '$249B', pe: 57.4, revenueGrowth: 251, eps: 29.28, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6, RKNG: 3.31 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 2, avgWeight: 4.48, proScore: 2.99, coverage: 0.667,
      price: 560.01, weeklyPrices: [598.37, 539.00, 577.46, 532.10, 560.01], weeklyChange: -6.41, dayChange: 5.25, sortRank: 0, periodReturns: { '1M': 6.3, 'YTD': 225.1, '6M': 198.4, '1Y': 774.7 },
      priceHistory: { '1D': [532.1, 554.77, 560.01], '1W': [598.37, 539, 577.46, 532.1, 560.01], '1M': [526.93, 517.72, 490.09, 529.29, 562.93, 653.53, 681.08, 712.13, 746.23, 732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 532.1, 560.01], 'YTD': [172.27, 187.68, 222.1, 236.39, 250.23, 285.99, 284.11, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 337.88, 361.69, 403.12, 434.52, 463.91, 489.15, 486.46, 531.21, 526.93, 653.53, 670.75, 638.72, 560.01], '6M': [187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 458.68, 484.28, 546.2, 526.93, 653.53, 670.75, 638.72, 560.01], '1Y': [64.02, 67.53, 67.06, 70.61, 75.84, 75.91, 75.86, 79.22, 81.91, 94.54, 103.09, 110.25, 120.06, 119.93, 113.13, 121.41, 124.92, 152.18, 169.99, 152.86, 150.93, 159.99, 169.54, 174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 458.68, 484.28, 546.2, 526.93, 653.53, 670.75, 638.72, 560.01] },
      velocityScore: { '1D': -1.3, '1W': 3.5, '1M': 92.9, '6M': null }, isNew: false,
      marketCap: '$193B', pe: 33.5, revenueGrowth: 46, eps: 16.71, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { BUZZ: false, MEME: 5.39, RKNG: 3.58 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 2, avgWeight: 4.34, proScore: 2.89, coverage: 0.667,
      price: 42.14, weeklyPrices: [43.32, 38.82, 43.91, 39.81, 42.14], weeklyChange: -2.72, dayChange: 5.84, sortRank: 0, periodReturns: { '1M': -28.8, 'YTD': 11.6, '6M': -7.7, '1Y': 149.5 },
      priceHistory: { '1D': [39.81, 42.06, 42.21, 42.14], '1W': [43.32, 38.82, 43.91, 39.81, 42.14], '1M': [59.19, 54.02, 51.52, 56.71, 59.77, 60.85, 59.18, 58.11, 59.96, 56.87, 54.72, 50.3, 47.74, 47.21, 45.91, 45.73, 43.32, 38.82, 43.91, 39.81, 42.14], 'YTD': [37.77, 45.68, 51.89, 56.68, 53.74, 46.15, 40.97, 45.45, 38.85, 38.12, 42.96, 41.12, 34.28, 37.06, 47.7, 52.02, 45.51, 56.85, 58.4, 58.06, 63.54, 59.19, 60.85, 54.72, 45.73, 42.14], '6M': [45.68, 51.89, 56.68, 53.74, 41.83, 42.22, 42.36, 40.95, 36.7, 41.58, 41.29, 35.09, 35.13, 43.07, 48.72, 48.36, 49.48, 55.15, 50.46, 56.83, 65.33, 59.19, 60.85, 54.72, 45.73, 42.14], '1Y': [16.89, 16.88, 18.59, 15.79, 16.45, 17.83, 18.73, 23.12, 29.11, 30.19, 36.45, 41.77, 46.93, 61.68, 69.56, 55.19, 62.42, 66.63, 57.38, 48.85, 48.49, 41.12, 46.84, 36.59, 42.07, 37.77, 45.68, 51.89, 56.68, 53.74, 41.83, 42.22, 39.98, 40.95, 36.7, 41.58, 41.29, 35.09, 35.13, 43.07, 48.72, 48.36, 49.48, 55.15, 50.46, 56.83, 65.33, 59.19, 60.85, 54.72, 45.73, 42.14] },
      velocityScore: { '1D': 0, '1W': 18, '1M': 1.8, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 60.2, revenueGrowth: 0, eps: 0.7, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 2.09, MEME: 6.59, RKNG: false },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'WULF', name: 'WULF', easyScore: 2, avgWeight: 4.33, proScore: 2.89, coverage: 0.667,
      price: 22.45, weeklyPrices: [23.58, 21.18, 22.21, 20.24, 22.45], weeklyChange: -4.77, dayChange: 10.94, sortRank: 0, periodReturns: { '1M': -13.2, 'YTD': 95.4, '6M': 74.9, '1Y': 365.9 },
      priceHistory: { '1D': [20.24, 22.17, 22.28, 22.45], '1W': [23.58, 21.18, 22.21, 20.24, 22.45], '1M': [25.86, 25.3, 23.19, 25.35, 26.06, 28.17, 28.01, 27.86, 28.98, 28.31, 28.78, 26.97, 26.06, 25.83, 25.58, 24.7, 23.58, 21.18, 22.21, 20.24, 22.45], 'YTD': [11.49, 12.84, 13.83, 14.12, 13.37, 16.65, 16.18, 17.56, 14.74, 14.35, 16.04, 16.22, 14.43, 19.03, 19.31, 20.37, 21.73, 24.02, 24.17, 22.92, 25.56, 25.86, 28.17, 28.78, 24.7, 22.45], '6M': [12.84, 13.83, 14.12, 13.37, 14.29, 16.26, 15.68, 16.22, 13.75, 14.67, 15.1, 14.89, 15.55, 19.45, 20.5, 21.43, 22.29, 23.37, 21.14, 22.82, 25.66, 25.86, 28.17, 28.78, 24.7, 22.45], '1Y': [4.82, 4.87, 5.26, 5.22, 5.06, 5.24, 8.78, 8.93, 9.63, 10.3, 10.94, 11.24, 11.42, 12.1, 15.46, 13.14, 15.94, 15.01, 12.37, 12, 12.63, 14.22, 15.59, 12.99, 12.42, 11.49, 12.84, 13.83, 14.12, 13.37, 14.29, 16.26, 15.01, 16.22, 13.75, 14.67, 15.1, 14.89, 15.55, 19.45, 20.5, 21.43, 22.29, 23.37, 21.14, 22.82, 25.66, 25.86, 28.17, 28.78, 24.7, 22.45] },
      velocityScore: { '1D': -1.4, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: null, revenueGrowth: -1, eps: -2.51, grossMargin: 64, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.65, RKNG: 3.02 },
      tonyNote: 'WULF appears in 2 of 3 Meme ETFs (67% coverage) with average weight 4.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LITE', name: 'LITE', easyScore: 2, avgWeight: 3.98, proScore: 2.66, coverage: 0.667,
      price: 711.04, weeklyPrices: [801.16, 728.32, 731.25, 698.91, 711.04], weeklyChange: -11.25, dayChange: 1.74, sortRank: 0, periodReturns: { '1M': -20.6, 'YTD': 92.9, '6M': 104.2, '1Y': 678.7 },
      priceHistory: { '1D': [698.91, 709.95, 711.04], '1W': [801.16, 728.32, 731.25, 698.91, 711.04], '1M': [895.4, 821.76, 853.26, 889.59, 921.56, 957.24, 875.36, 869.98, 850, 893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06, 801.16, 728.32, 731.25, 698.91, 711.04], 'YTD': [368.59, 348.26, 343.27, 339.19, 391.84, 577.15, 600.42, 688.27, 694.43, 672, 649.56, 801.99, 702.76, 894.13, 891.22, 846.89, 902.32, 892.58, 1001.81, 964.5, 854.96, 895.4, 957.24, 827.92, 858.06, 711.04], '6M': [348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 674.73, 700.91, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 884.98, 946.9, 905, 895.4, 957.24, 827.92, 858.06, 711.04], '1Y': [91.31, 98.14, 99.63, 109.48, 108.15, 119.66, 117.96, 123.42, 132.55, 151.73, 170.9, 163.99, 162.71, 157.15, 156.78, 162.95, 198.39, 188.36, 252.47, 247.43, 299.36, 302.81, 360.33, 316.15, 387.41, 368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 667.77, 700.91, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 884.98, 946.9, 905, 895.4, 957.24, 827.92, 858.06, 711.04] },
      velocityScore: { '1D': -0.7, '1W': 3.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$55B', pe: 125.6, revenueGrowth: 90, eps: 5.66, grossMargin: 41, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.09, RKNG: 2.88 },
      tonyNote: 'LITE appears in 2 of 3 Meme ETFs (67% coverage) with average weight 4.0% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRVL', name: 'MRVL', easyScore: 2, avgWeight: 3.61, proScore: 2.41, coverage: 0.667,
      price: 233.75, weeklyPrices: [272.05, 245.29, 249.27, 230.70, 233.75], weeklyChange: -14.08, dayChange: 1.32, sortRank: 0, periodReturns: { '1M': -19.1, 'YTD': 175.1, '6M': 180.1, '1Y': 224.9 },
      priceHistory: { '1D': [230.7, 232.89, 233.75], '1W': [272.05, 245.29, 249.27, 230.7, 233.75], '1M': [288.85, 266.88, 252.59, 280.71, 279.7, 308.88, 278.67, 289.54, 310.58, 307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 245.29, 249.27, 230.7, 233.75], 'YTD': [84.98, 83.45, 80.38, 80.23, 78.92, 82.35, 79.01, 78.39, 77.51, 93.3, 90.79, 92.36, 99.05, 119.93, 133.37, 165.56, 165.15, 160.01, 182.58, 190.69, 205, 288.85, 308.88, 279.04, 297.89, 233.75], '6M': [83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 81.69, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.84, 168.93, 196.33, 219.43, 288.85, 308.88, 279.04, 297.89, 233.75], '1Y': [71.95, 72.41, 71.99, 76.34, 76.63, 77.81, 72.07, 72.95, 64.6, 66.84, 68.86, 74.62, 84.07, 86.97, 86.22, 84.26, 88.46, 87.59, 89.33, 78.68, 83.79, 92.89, 88.9, 84.07, 87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 79.48, 81.69, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.84, 168.93, 196.33, 219.43, 288.85, 308.88, 279.04, 297.89, 233.75] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$204B', pe: 80.3, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.1,
      etfPresence: { BUZZ: 2.67, MEME: 4.55, RKNG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'AMD', name: 'AMD', easyScore: 2, avgWeight: 3.5, proScore: 2.33, coverage: 0.667,
      price: 517.13, weeklyPrices: [540.88, 517.82, 552.05, 516.11, 517.13], weeklyChange: -4.39, dayChange: 0.2, sortRank: 0, periodReturns: { '1M': 5.5, 'YTD': 141.5, '6M': 152.7, '1Y': 275.2 },
      priceHistory: { '1D': [516.11, 515.49, 517.13], '1W': [540.88, 517.82, 552.05, 516.11, 517.13], '1M': [490.33, 475.51, 452.4, 488.45, 511.57, 547.26, 507.29, 512.48, 537.37, 551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 517.13], 'YTD': [214.16, 204.68, 227.92, 259.68, 236.73, 216, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 236.64, 278.26, 305.33, 354.49, 408.46, 449.7, 449.59, 516.1, 490.33, 547.26, 519.85, 580.91, 517.13], '6M': [204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 467.51, 510.13, 490.33, 547.26, 519.85, 580.91, 517.13], '1Y': [137.82, 155.61, 154.72, 177.44, 174.31, 174.95, 166.55, 163.36, 162.32, 155.82, 160.46, 160.9, 161.79, 211.51, 218.09, 238.03, 258.01, 250.05, 237.52, 230.29, 215.05, 215.24, 221.62, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 467.51, 510.13, 490.33, 547.26, 519.85, 580.91, 517.13] },
      velocityScore: { '1D': 1.3, '1W': 1.3, '1M': null, '6M': null }, isNew: false,
      marketCap: '$843B', pe: 173, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { BUZZ: 3.23, MEME: false, RKNG: 3.77 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'MU', name: 'MU', easyScore: 2, avgWeight: 3.35, proScore: 2.23, coverage: 0.667,
      price: 943.1, weeklyPrices: [1032.28, 975.56, 984.75, 938.38, 943.10], weeklyChange: -8.64, dayChange: 0.5, sortRank: 0, periodReturns: { '1M': -0.7, 'YTD': 230.4, '6M': 188.4, '1Y': 658 },
      priceHistory: { '1D': [938.38, 938.28, 943.1], '1W': [1032.28, 975.56, 984.75, 938.38, 943.1], '1M': [949.28, 935.89, 891.88, 995.87, 981.61, 1087.99, 1020.76, 1043.19, 1133.99, 1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 943.1], 'YTD': [285.41, 327.02, 336.63, 399.65, 414.88, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 421.51, 457.23, 481.72, 517.16, 646.63, 776.01, 762.1, 971, 949.28, 1087.99, 1051.77, 1154.29, 943.1], '6M': [327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 751, 1035.5, 949.28, 1087.99, 1051.77, 1154.29, 943.1], '1Y': [124.42, 120.11, 109.22, 111.96, 109.06, 127.75, 122.05, 116.42, 118.48, 135.24, 158.82, 166.41, 167.32, 185.69, 187.06, 202.29, 221.91, 218.03, 241.11, 228.5, 223.93, 239.49, 252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 751, 1035.5, 949.28, 1087.99, 1051.77, 1154.29, 943.1] },
      velocityScore: { '1D': 0.9, '1W': -36.3, '1M': -24.7, '6M': null }, isNew: false,
      marketCap: '$1.1T', pe: 21.3, revenueGrowth: 346, eps: 44.2, grossMargin: 73, dividendYield: 0.06,
      etfPresence: { BUZZ: 2.99, MEME: false, RKNG: 3.7 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'INTC', name: 'INTC', easyScore: 2, avgWeight: 3.21, proScore: 2.14, coverage: 0.667,
      price: 109.17, weeklyPrices: [127.02, 120.35, 122.20, 110.39, 109.17], weeklyChange: -14.05, dayChange: -1.11, sortRank: 0, periodReturns: { '1M': -1, 'YTD': 195.9, '6M': 165.6, '1Y': 362.8 },
      priceHistory: { '1D': [110.39, 109.18, 109.17], '1W': [127.02, 120.35, 122.2, 110.39, 109.17], '1M': [110.27, 107.92, 107.04, 116.96, 124.57, 127.86, 117.05, 121.1, 133.99, 140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.2, 110.39, 109.17], 'YTD': [36.9, 41.11, 48.32, 45.07, 46.47, 50.24, 46.18, 46.12, 43.1, 46.78, 44.06, 44.06, 44.13, 61.72, 68.5, 66.78, 94.48, 109.62, 115.93, 118.5, 114.68, 110.27, 127.86, 132.28, 139.63, 109.17], '6M': [41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.61, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.17, 119.84, 109.33, 110.27, 127.86, 132.28, 139.63, 109.17], '1Y': [23.59, 22.92, 23.24, 20.41, 20.19, 21.81, 25.31, 24.55, 24.21, 24.44, 25.27, 29.34, 33.55, 37.17, 35.63, 38.12, 41.53, 37.03, 37.88, 34.33, 35.79, 43.47, 40.5, 37.31, 36.35, 36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.17, 119.84, 109.33, 110.27, 127.86, 132.28, 139.63, 109.17] },
      velocityScore: { '1D': 0.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$549B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 2.81, MEME: false, RKNG: 3.6 },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 1, avgWeight: 7.03, proScore: 2.34, coverage: 0.333,
      price: 115.98, weeklyPrices: [139.00, 120.95, 123.36, 114.41, 115.98], weeklyChange: -16.56, dayChange: 1.37, sortRank: 0, periodReturns: { '1M': -41, 'YTD': 232.7, '6M': 251.3, '1Y': 331.5 },
      priceHistory: { '1D': [114.41, 116.08, 116.78, 115.98], '1W': [139, 120.95, 123.36, 114.41, 115.98], '1M': [196.64, 162.88, 175.13, 172.78, 169.05, 191.55, 170.81, 167.34, 161.85, 171.23, 147.44, 146.97, 138.54, 135.69, 150.1, 148.16, 139, 120.95, 123.36, 114.41, 115.98], 'YTD': [34.86, 33.01, 37, 35.72, 43.61, 47.91, 43.91, 56.27, 95.34, 120.49, 86.33, 113.9, 84.59, 133.3, 157.32, 137.73, 164.36, 157.55, 203.57, 176.81, 158.41, 196.64, 191.55, 147.44, 148.16, 115.98], '6M': [33.01, 37, 35.72, 43.61, 44.3, 44.46, 53.96, 84.23, 95.58, 96.81, 87.54, 98.21, 107.45, 153.19, 163.47, 145.78, 172.98, 184.9, 173.26, 181.49, 185.67, 196.64, 191.55, 147.44, 148.16, 115.98], '1Y': [26.88, 29.24, 26.35, 24.11, 21.42, 22.79, 22.77, 24.34, 23.35, 23.72, 28.93, 28.06, 25.93, 31.33, 28.48, 33.4, 36.87, 29.5, 23.75, 20.89, 22.47, 26.02, 30.38, 28.96, 40.64, 34.86, 33.01, 37, 35.72, 43.61, 44.3, 44.46, 51.68, 84.23, 95.58, 96.81, 87.54, 98.21, 107.45, 153.19, 163.47, 145.78, 172.98, 184.9, 173.26, 181.49, 185.67, 196.64, 191.55, 147.44, 148.16, 115.98] },
      velocityScore: { '1D': 0, '1W': -27.8, '1M': -36.4, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 7.03, RKNG: false },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 1, avgWeight: 5.72, proScore: 1.91, coverage: 0.333,
      price: 255.46, weeklyPrices: [259.09, 241.91, 265.55, 246.40, 255.46], weeklyChange: -1.4, dayChange: 3.67, sortRank: 0, periodReturns: { '1M': 14.9, 'YTD': 77.5, '6M': 80.4, '1Y': 173.6 },
      priceHistory: { '1D': [246.4, 252.04, 255.46], '1W': [259.09, 241.91, 265.55, 246.4, 255.46], '1M': [222.27, 234.32, 237.68, 264.76, 250.81, 259.41, 239.18, 249.33, 271.83, 302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 265.55, 246.4, 255.46], 'YTD': [143.89, 141.59, 149.12, 133.16, 125.28, 123.41, 124.8, 120.83, 97.3, 112.33, 104.06, 100.3, 93.87, 107.93, 158.93, 185.54, 174.01, 188.29, 184.54, 193.39, 236.03, 222.27, 259.41, 272.01, 271.95, 255.46], '6M': [141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 112.27, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 156.27, 218.41, 226.1, 222.27, 259.41, 272.01, 271.95, 255.46], '1Y': [93.36, 102.59, 92.93, 109.38, 110.29, 125.38, 106.3, 115.41, 124.27, 149.03, 164.42, 162.26, 145.61, 137.2, 129.75, 144.17, 162.18, 164.23, 158.5, 139.56, 150.85, 188.44, 170.29, 140.34, 147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.06, 112.27, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 156.27, 218.41, 226.1, 222.27, 259.41, 272.01, 271.95, 255.46] },
      velocityScore: { '1D': 0, '1W': null, '1M': -23.9, '6M': null }, isNew: false,
      marketCap: '$48B', pe: 101.8, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.72, RKNG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'ALAB', name: 'ALAB', easyScore: 1, avgWeight: 5.57, proScore: 1.86, coverage: 0.333,
      price: 392, weeklyPrices: [430.86, 406.42, 432.74, 382.89, 392.00], weeklyChange: -9.02, dayChange: 2.38, sortRank: 0, periodReturns: { '1M': 13.2, 'YTD': 135.6, '6M': 150.1, '1Y': 324.7 },
      priceHistory: { '1D': [382.89, 389.8, 392], '1W': [430.86, 406.42, 432.74, 382.89, 392], '1M': [346.33, 341.7, 330.86, 367.47, 367.15, 389.2, 361.71, 374.68, 417.07, 439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42, 432.74, 382.89, 392], 'YTD': [166.36, 156.73, 174.45, 169.66, 150.62, 187.67, 123.69, 128.4, 109.8, 116.48, 127.57, 121.76, 109.6, 129.46, 170.81, 197.54, 194.74, 195.65, 228.64, 297.84, 342.85, 346.33, 389.2, 397.02, 483.02, 392], '6M': [156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 118.83, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 215.58, 306.88, 320.09, 346.33, 389.2, 397.02, 483.02, 392], '1Y': [92.3, 92.36, 116.91, 118.41, 135.54, 192, 171.06, 174.15, 174.24, 214.49, 238.79, 230.11, 195.8, 212.1, 161.55, 157.51, 168.25, 179.31, 167.55, 139.52, 147.75, 142.94, 167.08, 144.94, 168.83, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 129.68, 118.83, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 215.58, 306.88, 320.09, 346.33, 389.2, 397.02, 483.02, 392] },
      velocityScore: { '1D': 0, '1W': 44.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$67B', pe: 263.1, revenueGrowth: 93, eps: 1.49, grossMargin: 76, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.57, RKNG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 1, avgWeight: 5.45, proScore: 1.82, coverage: 0.333,
      price: 77.19, weeklyPrices: [86.10, 85.13, 80.64, 74.21, 77.19], weeklyChange: -10.35, dayChange: 4.02, sortRank: 0, periodReturns: { '1M': -16.2, 'YTD': 6.3, '6M': -14.8, '1Y': 69.8 },
      priceHistory: { '1D': [74.21, 77.23, 77.33, 77.19], '1W': [86.1, 85.13, 80.64, 74.21, 77.19], '1M': [92.06, 88.71, 87.32, 97.56, 82.41, 87.57, 82.25, 85.43, 80.66, 73.19, 72.87, 68.01, 65.62, 71.45, 86.77, 88.86, 86.1, 85.13, 80.64, 74.21, 77.19], 'YTD': [72.63, 90.56, 101.25, 113.57, 111.21, 102.12, 83.03, 85.82, 92.68, 87.53, 95.7, 86.98, 82.87, 91.61, 90.94, 78.75, 73.9, 65.35, 83.01, 96.23, 113.41, 92.06, 87.57, 72.87, 88.86, 77.19], '6M': [90.56, 101.25, 113.57, 111.21, 101.79, 82.51, 83.9, 79.19, 89.47, 86.34, 89.93, 78.67, 94.81, 98.97, 81, 77.2, 68.43, 82.55, 86.83, 105.86, 105.65, 92.06, 87.57, 72.87, 88.86, 77.19], '1Y': [45.46, 51.12, 57.09, 53.09, 52.57, 49.76, 44.95, 50.01, 48.76, 36.91, 40.43, 54.8, 49.08, 74.75, 94.5, 78.61, 77.77, 70.05, 67.89, 58.22, 55, 56.89, 72.84, 68.37, 85.67, 72.63, 90.56, 101.25, 113.57, 111.21, 101.79, 82.51, 80.2, 79.19, 89.47, 86.34, 89.93, 78.67, 94.81, 98.97, 81, 77.2, 68.43, 82.55, 86.83, 105.86, 105.65, 92.06, 87.57, 72.87, 88.86, 77.19] },
      velocityScore: { '1D': 0, '1W': -31.8, '1M': -55.3, '6M': null }, isNew: false,
      marketCap: '$30B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.45, RKNG: false },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'APLD', name: 'Applied Digital', easyScore: 1, avgWeight: 5.31, proScore: 1.77, coverage: 0.333,
      price: 31.73, weeklyPrices: [35.52, 33.06, 33.50, 30.71, 31.73], weeklyChange: -10.66, dayChange: 3.34, sortRank: 0, periodReturns: { '1M': -22.5, 'YTD': 29.4, '6M': -0.6, '1Y': 244.2 },
      priceHistory: { '1D': [30.71, 31.89, 31.87, 31.73], '1W': [35.52, 33.06, 33.5, 30.71, 31.73], '1M': [40.94, 41.91, 38.92, 41.47, 42.7, 46.47, 46.27, 45.57, 46.59, 45.2, 45.27, 41.98, 40.95, 39.16, 37.77, 37.3, 35.52, 33.06, 33.5, 30.71, 31.73], 'YTD': [24.52, 31.94, 35.22, 37.69, 33.88, 38.26, 33.56, 30.66, 26.15, 27.4, 27.51, 26.79, 23.74, 25.57, 30.09, 36.35, 34.25, 41.53, 46.71, 48.02, 47.28, 40.94, 46.47, 45.27, 37.3, 31.73], '6M': [31.94, 35.22, 37.69, 33.88, 34.95, 35.28, 30, 27.27, 25.14, 27.05, 25.93, 23.76, 25.19, 27.6, 32.19, 33.67, 35.63, 44.59, 39.14, 45.87, 47.94, 40.94, 46.47, 45.27, 37.3, 31.73], '1Y': [9.22, 9.97, 10.95, 10.12, 14.89, 14.97, 15.34, 15.95, 15.26, 15.2, 19.46, 24.67, 22.94, 27.3, 35.04, 32.54, 34.33, 31.06, 28.57, 22.84, 23.79, 28.05, 32.77, 24.24, 26.08, 24.52, 31.94, 35.22, 37.69, 33.88, 34.95, 35.28, 29.04, 27.27, 25.14, 27.05, 25.93, 23.76, 25.19, 27.6, 32.19, 33.67, 35.63, 44.59, 39.14, 45.87, 47.94, 40.94, 46.47, 45.27, 37.3, 31.73] },
      velocityScore: { '1D': 0, '1W': -44.3, '1M': -51.6, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: 139, eps: -0.38, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.31, RKNG: false },
      tonyNote: 'Applied Digital is a data center infrastructure and HPC hosting company. Revenue is growing as the company converts former crypto mining facilities into AI compute facilities. It holds positions in Meme ETFs because the pivot narrative — from Bitcoin mining to AI hosting — resonates with retail investors. Profitability remains the open question.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 1, avgWeight: 5.3, proScore: 1.77, coverage: 0.333,
      price: 45.56, weeklyPrices: [51.40, 49.12, 48.87, 45.36, 45.56], weeklyChange: -11.36, dayChange: 0.41, sortRank: 0, periodReturns: { '1M': -27.5, 'YTD': 1.5, '6M': -9.7, '1Y': 1.3 },
      priceHistory: { '1D': [45.38, 45.71, 45.76, 45.56], '1W': [51.4, 49.12, 48.87, 45.36, 45.56], '1M': [62.8, 56.69, 56.63, 57.99, 57.85, 61.18, 56.06, 54.69, 56.55, 58.32, 57.85, 53.6, 50.56, 49.31, 53.88, 53.26, 51.4, 49.12, 48.87, 45.36, 45.56], 'YTD': [44.87, 50.45, 47.56, 47.25, 39.98, 35.48, 33.18, 31.62, 37.05, 35.12, 33.31, 32.7, 28.83, 28.08, 44.68, 43.63, 45.12, 47.68, 57.47, 58.89, 72.07, 62.8, 61.18, 57.85, 53.26, 45.56], '6M': [50.45, 47.56, 47.25, 39.98, 34.99, 34.11, 30.78, 38.37, 35.73, 32.98, 31.2, 27.51, 29.24, 29.76, 48.32, 43.84, 45.75, 56.89, 49.31, 63.64, 69.28, 62.8, 61.18, 57.85, 53.26, 45.56], '1Y': [44.97, 41.47, 41.94, 40.53, 42.02, 43, 36.8, 38.68, 42.99, 44, 62.26, 75.14, 61.5, 79.23, 77.55, 59.5, 57.15, 53.38, 54.42, 49.12, 46.76, 46.93, 54.44, 49.67, 51.39, 44.87, 50.45, 47.56, 47.25, 39.98, 34.99, 34.11, 31.9, 38.37, 35.73, 32.98, 31.2, 27.51, 29.24, 29.76, 48.32, 43.84, 45.75, 56.89, 49.31, 63.64, 69.28, 62.8, 61.18, 57.85, 53.26, 45.56] },
      velocityScore: { '1D': 0, '1W': 10.6, '1M': -23.7, '6M': null }, isNew: false,
      marketCap: '$17B', pe: 116.8, revenueGrowth: 755, eps: 0.39, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.3, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'COHR', name: 'COHR', easyScore: 1, avgWeight: 5.24, proScore: 1.75, coverage: 0.333,
      price: 320.13, weeklyPrices: [368.65, 333.36, 335.70, 314.13, 320.13], weeklyChange: -13.16, dayChange: 1.95, sortRank: 0, periodReturns: { '1M': -20.4, 'YTD': 73.4, '6M': 84.9, '1Y': 254.1 },
      priceHistory: { '1D': [313.99, 319.86, 320.75, 320.13], '1W': [368.65, 333.36, 335.7, 314.13, 320.13], '1M': [401.93, 355.94, 354.77, 363.58, 385.03, 413.84, 382.81, 378.85, 389.57, 425.48, 381.22, 392.5, 407.25, 380.56, 391.22, 394.47, 368.65, 333.36, 335.7, 314.13, 320.13], 'YTD': [184.57, 173.15, 195.96, 196.94, 212.18, 242.46, 219.96, 254.86, 280.81, 260.64, 245.8, 272.33, 238.21, 284.17, 328, 337.68, 319.71, 319.19, 404.94, 378, 361.47, 401.93, 413.84, 381.22, 394.47, 320.13], '6M': [173.15, 195.96, 196.94, 212.18, 227.68, 217.23, 248.89, 258.93, 235.72, 242.76, 253.63, 243.48, 253.22, 307.93, 347.51, 321.53, 329.89, 379.69, 362.83, 377.57, 362.9, 401.93, 413.84, 381.22, 394.47, 320.13], '1Y': [90.4, 96.07, 97.02, 106.98, 105.6, 116.56, 87.76, 90.5, 87.8, 99.22, 104.47, 109.29, 107.72, 113.56, 109.37, 120.79, 134.24, 128.7, 158.01, 138.15, 151.81, 164.89, 192.73, 175.2, 191.87, 184.57, 173.15, 195.96, 196.94, 212.18, 227.68, 217.23, 248.18, 258.93, 235.72, 242.76, 253.63, 243.48, 253.22, 307.93, 347.51, 321.53, 329.89, 379.69, 362.83, 377.57, 362.9, 401.93, 413.84, 381.22, 394.47, 320.13] },
      velocityScore: { '1D': 0, '1W': 6.7, '1M': null, '6M': null }, isNew: false,
      marketCap: '$63B', pe: 152.4, revenueGrowth: 21, eps: 2.1, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.24, RKNG: false },
      tonyNote: 'COHR appears in 1 of 3 Meme ETFs (33% coverage) with average weight 5.2% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TTMI', name: 'TTMI', easyScore: 1, avgWeight: 4.88, proScore: 1.63, coverage: 0.333,
      price: 144.14, weeklyPrices: [179.70, 155.98, 149.39, 144.08, 144.14], weeklyChange: -19.79, dayChange: 0.04, sortRank: 0, periodReturns: { '1M': -19.2, 'YTD': 108.9, '6M': 115.6, '1Y': 238.1 },
      priceHistory: { '1D': [144.08, 146.88, 146.13, 144.14], '1W': [179.7, 155.98, 149.39, 144.08, 144.14], '1M': [178.38, 173.86, 172.12, 187.21, 194.05, 206.66, 199.58, 202.7, 216.44, 221.47, 213.17, 209.74, 210.57, 191.49, 186.8, 187.02, 179.7, 155.98, 149.39, 144.08, 144.14], 'YTD': [69, 66.86, 100.9, 95.02, 98.2, 97.98, 90.91, 106.7, 104.05, 96.43, 97.54, 106.99, 97.42, 107.53, 116.93, 132.98, 158.22, 153.77, 171.87, 174.55, 173.72, 178.38, 206.66, 213.17, 187.02, 144.14], '6M': [66.86, 100.9, 95.02, 98.2, 98.58, 91.8, 106.85, 104.24, 87.91, 90.64, 91.54, 95.47, 95.7, 123.49, 125.81, 144.17, 157.47, 162.99, 158.86, 189.92, 172.44, 178.38, 206.66, 213.17, 187.02, 144.14], '1Y': [42.63, 45.79, 45.04, 48.52, 43.85, 46.63, 40.5, 44.09, 44.96, 47.6, 50.27, 56.54, 57.6, 58.01, 55.25, 56.69, 59.21, 66.29, 67.87, 63.34, 64.94, 66.75, 76.74, 67.63, 71.59, 69, 66.86, 100.9, 95.02, 98.2, 98.58, 91.8, 107.93, 104.24, 87.91, 90.64, 91.54, 95.47, 95.7, 123.49, 125.81, 144.17, 157.47, 162.99, 158.86, 189.92, 172.44, 178.38, 206.66, 213.17, 187.02, 144.14] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$15B', pe: 78.3, revenueGrowth: 30, eps: 1.84, grossMargin: 21, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.88, RKNG: false },
      tonyNote: 'TTM Technologies is a printed circuit board manufacturer held in Industrials ETFs. Revenue growth tracks data center and defense electronics demand. PCB manufacturing is essential hardware infrastructure; TTM\'s position in AI server and high-frequency trading hardware gives it exposure to two durable growth verticals.',
    },
    {
      ticker: 'CBRS', name: 'CBRS', easyScore: 1, avgWeight: 4.64, proScore: 1.55, coverage: 0.333,
      price: 179.82, weeklyPrices: [221.27, 204.86, 192.01, 176.61, 179.82], weeklyChange: -18.73, dayChange: 1.82, sortRank: 0, periodReturns: { '1M': -24.4, 'YTD': -42.2, '6M': -42.2, '1Y': -42.2 },
      priceHistory: { '1D': [176.61, 179.4, 180.53, 179.82], '1W': [221.27, 204.86, 192.01, 176.61, 179.82], '1M': [237.83, 226.82, 237.33, 226.55, 214, 218.03, 212.25, 213.67, 234.71, 224.43, 226.72, 182.26, 168.52, 181.59, 216.16, 221, 221.27, 204.86, 192.01, 176.61, 179.82], 'YTD': [311.07, 279.72, 303.63, 290.69, 256.78, 241.71, 242.59, 236.99, 236.52, 214.94, 215.4, 237.83, 226.82, 226.55, 214, 212.25, 213.67, 234.71, 226.72, 182.26, 181.59, 216.16, 221.27, 204.86, 176.61, 179.82], '6M': [311.07, 279.72, 303.63, 290.69, 256.78, 241.71, 242.59, 236.99, 236.52, 214.94, 215.4, 237.83, 226.82, 226.55, 214, 212.25, 213.67, 234.71, 226.72, 182.26, 181.59, 216.16, 221.27, 204.86, 176.61, 179.82], '1Y': [311.07, 279.72, 296.65, 303.63, 290.69, 281.86, 256.78, 241.71, 266.9, 242.59, 236.99, 213.28, 236.52, 214.94, 215.4, 201.01, 237.83, 226.82, 237.33, 226.55, 214, 218.03, 212.25, 213.67, 234.71, 224.43, 226.72, 182.26, 168.52, 181.59, 216.16, 221, 221.27, 204.86, 192.01, 176.61, 179.82] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$40B', pe: 390.9, revenueGrowth: 94, eps: 0.46, grossMargin: 40, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.64, RKNG: false },
      tonyNote: 'CBRS appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
