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
export const SPY_RET: Record<Period, number> = { '1W': -0.5, '1M': 0.4, 'YTD': 9.6, '6M': 8.4, '1Y': 18.8 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 7.2 }, { t: 'AMD', w: 5.6 }, { t: 'VRT', w: 3.9 }, { t: 'SIMO', w: 3.7 }, { t: 'TSM', w: 3.5 }],
  ARTY: [{ t: 'AMD', w: 5.5 }, { t: 'MU', w: 5.0 }, { t: 'NVDA', w: 5.0 }, { t: 'AVGO', w: 4.8 }, { t: 'CRWV', w: 3.8 }],
  BAI: [{ t: 'MU', w: 6.5 }, { t: 'AMD', w: 5.5 }, { t: 'NVDA', w: 4.7 }, { t: 'AVGO', w: 4.7 }, { t: 'TSM', w: 4.7 }],
  IGPT: [{ t: 'META', w: 9.3 }, { t: 'AMD', w: 9.2 }, { t: 'NVDA', w: 8.3 }, { t: 'MU', w: 8.0 }, { t: 'GOOGL', w: 8.0 }],
  IVES: [{ t: 'AAPL', w: 5.6 }, { t: 'META', w: 5.3 }, { t: 'NVDA', w: 5.0 }, { t: 'AMZN', w: 5.0 }, { t: 'MSFT', w: 4.9 }],
  ALAI: [{ t: 'NVDA', w: 13.2 }, { t: 'TSM', w: 5.3 }, { t: 'MSFT', w: 5.2 }, { t: 'AMZN', w: 4.8 }, { t: 'META', w: 4.6 }],
  CHAT: [{ t: 'NVDA', w: 7.7 }, { t: 'GOOGL', w: 5.6 }, { t: 'AVGO', w: 4.9 }, { t: 'AMD', w: 4.2 }, { t: 'MU', w: 3.8 }],
  AIFD: [{ t: 'NVDA', w: 6.8 }, { t: 'PANW', w: 6.7 }, { t: 'MU', w: 6.0 }, { t: 'AVGO', w: 5.6 }, { t: 'ANET', w: 5.5 }],
  SPRX: [{ t: 'KLAC', w: 9.8 }, { t: 'NET', w: 9.7 }, { t: 'ALAB', w: 9.5 }, { t: 'MKSI', w: 8.1 }, { t: 'COHR', w: 7.7 }],
  AOTG: [{ t: 'AMD', w: 15.7 }, { t: 'NVDA', w: 10.8 }, { t: 'MU', w: 8.8 }, { t: 'TSM', w: 7.0 }, { t: 'TOST', w: 5.7 }],
  SOXX: [{ t: 'AMD', w: 8.8 }, { t: 'MU', w: 8.3 }, { t: 'NVDA', w: 8.2 }, { t: 'AVGO', w: 7.2 }, { t: 'INTC', w: 5.5 }],
  PSI: [{ t: 'AMAT', w: 6.5 }, { t: 'MU', w: 5.7 }, { t: 'KLAC', w: 5.7 }, { t: 'AMD', w: 5.7 }, { t: 'LRCX', w: 5.2 }],
  XSD: [{ t: 'AMD', w: 3.0 }, { t: 'MXL', w: 3.0 }, { t: 'AMBA', w: 2.8 }, { t: 'ALGM', w: 2.8 }, { t: 'PI', w: 2.7 }],
  DRAM: [{ t: 'STX', w: 4.9 }, { t: 'WDC', w: 4.7 }, { t: 'SNDK', w: 4.6 }, { t: 'MU', w: 2.8 }, { t: 'SKHY', w: 0.6 }],
  PTF: [{ t: 'MU', w: 5.0 }, { t: 'SNDK', w: 4.8 }, { t: 'WDC', w: 4.3 }, { t: 'KLAC', w: 4.0 }, { t: 'STX', w: 4.0 }],
  WCLD: [{ t: 'FROG', w: 2.9 }, { t: 'PANW', w: 2.9 }, { t: 'DDOG', w: 2.8 }, { t: 'CRWD', w: 2.5 }, { t: 'OKTA', w: 2.4 }],
  IGV: [{ t: 'PANW', w: 10.3 }, { t: 'PLTR', w: 8.6 }, { t: 'MSFT', w: 8.5 }, { t: 'CRWD', w: 7.2 }, { t: 'ORCL', w: 5.3 }],
  FDTX: [{ t: 'MRVL', w: 9.7 }, { t: 'MU', w: 9.3 }, { t: 'TSM', w: 6.4 }, { t: 'WDC', w: 4.5 }, { t: 'PANW', w: 4.2 }],
  GTEK: [{ t: 'MRVL', w: 3.4 }, { t: 'NET', w: 3.2 }, { t: 'APH', w: 2.5 }, { t: 'CDNS', w: 2.4 }, { t: 'DELL', w: 2.3 }],
  ARKK: [{ t: 'TSLA', w: 9.9 }, { t: 'TEM', w: 5.0 }, { t: 'COIN', w: 4.6 }, { t: 'HOOD', w: 4.5 }, { t: 'CRSP', w: 4.5 }],
  MARS: [{ t: 'SPCX', w: 21.2 }, { t: 'RKLB', w: 9.0 }, { t: 'ASTS', w: 7.3 }, { t: 'VSAT', w: 5.8 }, { t: 'GSAT', w: 5.5 }],
  FRWD: [{ t: 'NVDA', w: 9.3 }, { t: 'AMD', w: 7.4 }, { t: 'STX', w: 7.0 }, { t: 'TSM', w: 5.9 }, { t: 'LRCX', w: 5.4 }],
  BCTK: [{ t: 'TSM', w: 8.4 }, { t: 'LRCX', w: 7.2 }, { t: 'AVGO', w: 7.1 }, { t: 'SPCX', w: 7.0 }, { t: 'GOOG', w: 6.7 }],
  FWD: [{ t: 'NVDA', w: 3.1 }, { t: 'AVGO', w: 2.5 }, { t: 'AMD', w: 2.3 }, { t: 'AMAT', w: 2.3 }, { t: 'LRCX', w: 1.9 }],
  CBSE: [{ t: 'SCI', w: 3.3 }, { t: 'SBUX', w: 3.2 }, { t: 'META', w: 3.2 }, { t: 'KRYS', w: 3.1 }, { t: 'RH', w: 3.1 }],
  FCUS: [{ t: 'DELL', w: 4.6 }, { t: 'MU', w: 4.2 }, { t: 'STX', w: 4.1 }, { t: 'HPE', w: 4.0 }, { t: 'WDC', w: 3.9 }],
  WGMI: [{ t: 'CIFR', w: 18.1 }, { t: 'HUT', w: 11.3 }, { t: 'IREN', w: 10.6 }, { t: 'KEEL', w: 9.7 }, { t: 'CLSK', w: 5.4 }],
  CNEQ: [{ t: 'NVDA', w: 14.0 }, { t: 'MSFT', w: 6.5 }, { t: 'GOOG', w: 5.8 }, { t: 'TSM', w: 5.7 }, { t: 'AAPL', w: 5.3 }],
  SGRT: [{ t: 'VRT', w: 12.6 }, { t: 'WDC', w: 10.0 }, { t: 'ARW', w: 6.5 }, { t: 'MU', w: 6.4 }, { t: 'WELL', w: 6.1 }],
  SPMO: [{ t: 'MU', w: 9.8 }, { t: 'NVDA', w: 8.5 }, { t: 'AVGO', w: 6.6 }, { t: 'GOOGL', w: 4.6 }, { t: 'JNJ', w: 4.5 }],
  XMMO: [{ t: 'CW', w: 4.2 }, { t: 'FTI', w: 3.6 }, { t: 'ATI', w: 3.4 }, { t: 'WWD', w: 3.0 }, { t: 'STRL', w: 2.9 }],
  POW: [{ t: 'PWR', w: 5.0 }, { t: 'POWL', w: 4.5 }, { t: 'ETN', w: 4.3 }, { t: 'PRY', w: 4.3 }, { t: 'NVT', w: 4.0 }],
  VOLT: [{ t: 'BELFB', w: 7.7 }, { t: 'POWL', w: 6.5 }, { t: 'ETN', w: 5.5 }, { t: 'NEE', w: 5.3 }, { t: 'PWR', w: 5.1 }],
  PBD: [{ t: 'RIVN', w: 1.3 }, { t: 'NFI', w: 1.3 }, { t: 'LCID', w: 1.3 }, { t: 'BLBD', w: 1.2 }, { t: 'SHLS', w: 1.2 }],
  PBW: [{ t: 'OPAL', w: 2.4 }, { t: 'BETA', w: 2.1 }, { t: 'GEVO', w: 2.1 }, { t: 'DAR', w: 2.0 }, { t: 'RIVN', w: 2.0 }],
  IVEP: [{ t: 'SMERY', w: 4.4 }, { t: 'SBGSY', w: 4.2 }, { t: 'NEE', w: 4.2 }, { t: 'GEV', w: 4.1 }, { t: 'ETN', w: 4.1 }],
  AIRR: [{ t: 'IESC', w: 3.3 }, { t: 'STRL', w: 3.3 }, { t: 'DY', w: 3.3 }, { t: 'POWL', w: 3.2 }, { t: 'CHRW', w: 3.2 }],
  PRN: [{ t: 'FIX', w: 4.7 }, { t: 'HWM', w: 4.3 }, { t: 'STRL', w: 4.1 }, { t: 'PWR', w: 4.0 }, { t: 'JBL', w: 3.5 }],
  RSHO: [{ t: 'TKR', w: 8.7 }, { t: 'POWL', w: 7.3 }, { t: 'CGNX', w: 7.2 }, { t: 'CAT', w: 6.9 }, { t: 'AIT', w: 6.0 }],
  IDEF: [{ t: 'RTX', w: 8.7 }, { t: 'LMT', w: 7.0 }, { t: 'BA', w: 4.8 }, { t: 'GD', w: 4.7 }, { t: 'FTNT', w: 3.5 }],
  BILT: [{ t: 'UNP', w: 6.2 }, { t: 'AENA', w: 4.8 }, { t: 'AEP', w: 4.5 }, { t: 'TRP', w: 4.2 }, { t: 'XEL', w: 3.8 }],
  BUZZ: [{ t: 'PLTR', w: 3.3 }, { t: 'META', w: 3.3 }, { t: 'MSTR', w: 3.3 }, { t: 'NVDA', w: 3.3 }, { t: 'GME', w: 3.3 }],
  MEME: [{ t: 'IREN', w: 7.5 }, { t: 'AAOI', w: 6.8 }, { t: 'NBIS', w: 6.7 }, { t: 'BE', w: 6.6 }, { t: 'SNDK', w: 6.0 }],
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
  'AI & ML':         { '1W': 1.9, '1M': -11.8, 'YTD': 37.6, '6M': 31, '1Y': 63.9 },
  'Semiconductors':  { '1W': 3.8, '1M': -20.6, 'YTD': 85.9, '6M': 66.9, '1Y': 119.1 },
  'Broad Tech':      { '1W': 1.7, '1M': -8.5, 'YTD': 20.7, '6M': 15.5, '1Y': 32.7 },
  'Electrification': { '1W': -0.1, '1M': -12.3, 'YTD': 19.4, '6M': 9.2, '1Y': 29.6 },
  'Industrials':     { '1W': 1.3, '1M': -4.9, 'YTD': 17, '6M': 5, '1Y': 28.4 },
  'Meme':            { '1W': 6.5, '1M': -17.6, 'YTD': 8.4, '6M': -2.9, '1Y': -6.5 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, IndexChartByPeriod> = {
  'AI & ML': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -1, spyReturn: -0.15, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 98.01, 97.77, 101.13, 101.87], spy: [100, 99.01, 98.85, 99.67, 99.53], top10Return: 1.9, spyReturn: -0.5, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 94.17, 93.33, 95.02, 92.62, 95.39, 98.19, 94.45, 90.51, 92.92, 90.43, 92.44, 92.82, 90.4, 90.25, 89.31, 86.8, 85.03, 84.77, 87.51, 88.24], spy: [100, 98.55, 98.5, 98.64, 97.93, 99.54, 100.32, 100.18, 100.05, 100.93, 100.14, 100.98, 101.42, 100.64, 101, 101.4, 100.85, 99.85, 99.69, 100.52, 100.38], top10Return: -11.8, spyReturn: 0.4, xLabels: ["Jun 24", "Jul 1", "Jul 8", "Jul 15", "Jul 22"] },
    'YTD': { top10: [100, 103.37, 105.03, 106.62, 103.63, 104.33, 103.31, 103.83, 98.84, 101.87, 101.55, 95.27, 106.31, 115.45, 119.47, 123.99, 135.27, 132.76, 146.11, 156.63, 136.95, 154.66, 145.75, 141.15, 141.49, 137.6], spy: [100, 101.78, 101.43, 101.99, 101.12, 101.47, 100.38, 100.6, 98.6, 98.11, 96.11, 95.37, 99.13, 102.89, 103.89, 105.68, 108.17, 108.32, 110.07, 110.61, 106.38, 109.51, 106.9, 109.65, 110.25, 109.57], top10Return: 37.6, spyReturn: 9.6, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 102.95, 93.67, 98.13, 99.1, 99.13, 95.16, 95.78, 96.2, 91.57, 95.69, 104.64, 112.47, 116.08, 118.15, 127.92, 129.59, 133.18, 144.83, 136.5, 143.35, 143.35, 145.7, 134.55, 132.71, 131.05], spy: [100, 100.73, 98.35, 98.88, 100.07, 99.57, 97.59, 96.13, 94.13, 92.03, 95.64, 99.58, 102.87, 103.62, 104.6, 107.06, 107.28, 108.22, 110.1, 107.29, 109.56, 106.47, 108.39, 108.19, 109.55, 108.45], top10Return: 31, spyReturn: 8.4, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 103.23, 102.71, 106.78, 102.94, 104.57, 104.23, 109.4, 114.16, 116.77, 116.35, 119.87, 118.64, 120.67, 126.96, 123.24, 123.07, 114.72, 115.6, 119.89, 122.63, 116.06, 120.35, 118.46, 121.2, 123.75, 124.52, 124.91, 119.67, 121.53, 122.54, 123.03, 117.37, 118.77, 118.13, 112.89, 119.1, 130.55, 140.19, 146.02, 149.08, 164.34, 158.12, 172.6, 187.49, 172.18, 180.21, 179.91, 183.27, 168.61, 166.09, 163.95], spy: [100, 101.02, 99.86, 102.2, 101.74, 102.59, 102.37, 103.41, 104.95, 105.46, 105.93, 106.4, 105.31, 106.75, 109.25, 107.38, 108.61, 104.96, 107.34, 108.75, 108.62, 107.95, 109.4, 108.44, 109.64, 110.08, 109.6, 110.04, 109.82, 108.41, 108.51, 109.15, 106.92, 105.32, 103.13, 100.83, 104.78, 109.1, 112.7, 113.72, 114.18, 117.56, 117.46, 119.36, 120.79, 117.55, 120.03, 116.65, 118.75, 118.53, 120.03, 118.82], top10Return: 63.9, spyReturn: 18.8, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Semiconductors': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -1.8, spyReturn: -0.15, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 98.02, 98.05, 104.09, 103.71], spy: [100, 99.01, 98.85, 99.67, 99.53], top10Return: 3.8, spyReturn: -0.5, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 90.85, 90.24, 94.76, 89.63, 92.71, 96.84, 89.91, 83.25, 85.91, 81.81, 84.91, 85.28, 81.17, 82.77, 80.9, 76.85, 75.2, 75.19, 79.59, 79.45], spy: [100, 98.55, 98.5, 98.64, 97.93, 99.54, 100.32, 100.18, 100.05, 100.93, 100.14, 100.98, 101.42, 100.64, 101, 101.4, 100.85, 99.85, 99.69, 100.52, 100.38], top10Return: -20.6, spyReturn: 0.4, xLabels: ["Jun 24", "Jul 1", "Jul 8", "Jul 15", "Jul 22"] },
    'YTD': { top10: [100, 111.4, 115.62, 117.69, 116.9, 123.97, 123.04, 126.63, 122.08, 129.78, 130.26, 127.38, 146.87, 158.04, 174.72, 173.94, 193.03, 190.55, 220.41, 222.04, 201.92, 214.03, 204.71, 192.38, 187.21, 185.92], spy: [100, 101.78, 101.43, 101.99, 101.12, 101.47, 100.38, 100.6, 98.6, 98.11, 96.11, 95.37, 99.13, 102.89, 103.89, 105.68, 108.17, 108.32, 110.07, 110.61, 106.38, 109.51, 106.9, 109.65, 110.25, 109.57], top10Return: 85.9, spyReturn: 9.6, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 105.67, 102.05, 108.45, 108.24, 109.44, 104.11, 108.69, 113.52, 116.57, 119.91, 129.81, 145.06, 156.6, 165.39, 167.87, 173.12, 180.1, 196.42, 189.78, 199.55, 191.15, 194.19, 172.16, 165.47, 166.92], spy: [100, 100.73, 98.35, 98.88, 100.07, 99.57, 97.59, 96.13, 94.13, 92.03, 95.64, 99.58, 102.87, 103.62, 104.6, 107.06, 107.28, 108.22, 110.1, 107.29, 109.56, 106.47, 108.39, 108.19, 109.55, 108.45], top10Return: 66.9, spyReturn: 8.4, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 101.86, 103.02, 106.77, 105.91, 110.77, 108.01, 111.84, 114.6, 120.59, 119.98, 123.93, 124.01, 128.12, 134.02, 133.67, 135.02, 133.3, 137.9, 144.14, 146.21, 137.1, 140.11, 142.24, 147.74, 159.81, 163.52, 168.46, 171.02, 170.4, 161.22, 164.18, 151.53, 160.91, 167.09, 162.59, 176.37, 193.92, 194.5, 214.36, 214.22, 237.01, 215.47, 239.55, 240.42, 234.89, 244.72, 247.54, 245.3, 217.22, 224.14, 219.08], spy: [100, 101.02, 99.86, 102.2, 101.74, 102.59, 102.37, 103.41, 104.95, 105.46, 105.93, 106.4, 105.31, 106.75, 109.25, 107.38, 108.61, 104.96, 107.34, 108.75, 108.62, 107.95, 109.4, 108.44, 109.64, 110.08, 109.6, 110.04, 109.82, 108.41, 108.51, 109.15, 106.92, 105.32, 103.13, 100.83, 104.78, 109.1, 112.7, 113.72, 114.18, 117.56, 117.46, 119.36, 120.79, 117.55, 120.03, 116.65, 118.75, 118.53, 120.03, 118.82], top10Return: 119.1, spyReturn: 18.8, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Broad Tech': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -0.5, spyReturn: -0.15, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 98.01, 98.37, 100.59, 101.68], spy: [100, 99.01, 98.85, 99.67, 99.53], top10Return: 1.7, spyReturn: -0.5, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 96.73, 95.68, 96.43, 95.62, 98.12, 100.13, 97.69, 94.53, 96.28, 93.26, 94.81, 94.91, 93.22, 93.04, 93.1, 90.5, 88.74, 88.91, 90.64, 91.55], spy: [100, 98.55, 98.5, 98.64, 97.93, 99.54, 100.32, 100.18, 100.05, 100.93, 100.14, 100.98, 101.42, 100.64, 101, 101.4, 100.85, 99.85, 99.69, 100.52, 100.38], top10Return: -8.5, spyReturn: 0.4, xLabels: ["Jun 24", "Jul 1", "Jul 8", "Jul 15", "Jul 22"] },
    'YTD': { top10: [100, 103.73, 105.87, 105.42, 101.82, 102.06, 103.08, 103.82, 100.3, 101.12, 100.34, 96.65, 106.25, 112.03, 115.22, 119.27, 124.69, 121.81, 130.02, 134.97, 121.81, 133.04, 127.79, 123.4, 122.57, 120.7], spy: [100, 101.78, 101.43, 101.99, 101.12, 101.47, 100.38, 100.6, 98.6, 98.11, 96.11, 95.37, 99.13, 102.89, 103.89, 105.68, 108.17, 108.32, 110.07, 110.61, 106.38, 109.51, 106.9, 109.65, 110.25, 109.57], top10Return: 20.7, spyReturn: 9.6, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 100.96, 92.95, 96.62, 97.7, 98.62, 96.67, 95.79, 96.82, 92.63, 95.63, 101.84, 109.02, 110.68, 112.6, 119.52, 119.53, 119.75, 127.82, 120.95, 124.53, 125.8, 125.29, 117.34, 116.8, 115.48], spy: [100, 100.73, 98.35, 98.88, 100.07, 99.57, 97.59, 96.13, 94.13, 92.03, 95.64, 99.58, 102.87, 103.62, 104.6, 107.06, 107.28, 108.22, 110.1, 107.29, 109.56, 106.47, 108.39, 108.19, 109.55, 108.45], top10Return: 15.5, spyReturn: 8.4, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 100.5, 100.04, 101.48, 100.57, 102.6, 102.02, 105.13, 108.47, 110.96, 111.7, 115.49, 116.89, 115.24, 117.92, 115.55, 115.04, 108.74, 109.5, 111.97, 113.89, 109.7, 112.74, 110.79, 114.62, 116.94, 117.78, 116.16, 113.87, 115.82, 116.64, 119.73, 113.64, 113.86, 112.79, 110.08, 114.47, 120.81, 127.29, 128.02, 130.68, 136.56, 133.26, 142.1, 147.91, 139.55, 144.78, 143.12, 143.51, 134.06, 132.61, 132.7], spy: [100, 101.02, 99.86, 102.2, 101.74, 102.59, 102.37, 103.41, 104.95, 105.46, 105.93, 106.4, 105.31, 106.75, 109.25, 107.38, 108.61, 104.96, 107.34, 108.75, 108.62, 107.95, 109.4, 108.44, 109.64, 110.08, 109.6, 110.04, 109.82, 108.41, 108.51, 109.15, 106.92, 105.32, 103.13, 100.83, 104.78, 109.1, 112.7, 113.72, 114.18, 117.56, 117.46, 119.36, 120.79, 117.55, 120.03, 116.65, 118.75, 118.53, 120.03, 118.82], top10Return: 32.7, spyReturn: 18.8, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Electrification': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 0.1, spyReturn: -0.15, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 98.2, 98.1, 98.63, 99.87], spy: [100, 99.01, 98.85, 99.67, 99.53], top10Return: -0.1, spyReturn: -0.5, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 95.57, 94.86, 95.37, 92.75, 94.61, 96.63, 93.86, 91.45, 92.99, 89.1, 89.38, 89.72, 89.08, 88.55, 89.19, 87.9, 86.3, 86.22, 86.64, 87.74], spy: [100, 98.55, 98.5, 98.64, 97.93, 99.54, 100.32, 100.18, 100.05, 100.93, 100.14, 100.98, 101.42, 100.64, 101, 101.4, 100.85, 99.85, 99.69, 100.52, 100.38], top10Return: -12.3, spyReturn: 0.4, xLabels: ["Jun 24", "Jul 1", "Jul 8", "Jul 15", "Jul 22"] },
    'YTD': { top10: [100, 104.17, 109.5, 111.37, 112.85, 114.81, 115.87, 117.64, 110.56, 113.3, 112.99, 111.47, 118.19, 122.15, 128, 132.17, 135.7, 131.24, 140.28, 138.57, 125.46, 132.89, 125.66, 123.73, 120.79, 119.39], spy: [100, 101.78, 101.43, 101.99, 101.12, 101.47, 100.38, 100.6, 98.6, 98.11, 96.11, 95.37, 99.13, 102.89, 103.89, 105.68, 108.17, 108.32, 110.07, 110.61, 106.38, 109.51, 106.9, 109.65, 110.25, 109.57], top10Return: 19.4, spyReturn: 9.6, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 102.62, 100.84, 104.48, 105.76, 106.59, 101.91, 103.64, 103.83, 103.31, 103.76, 110.32, 114.58, 116.38, 121.76, 122.73, 122.92, 122.96, 125.94, 119.09, 120.34, 120.67, 118.23, 110.74, 110.17, 109.19], spy: [100, 100.73, 98.35, 98.88, 100.07, 99.57, 97.59, 96.13, 94.13, 92.03, 95.64, 99.58, 102.87, 103.62, 104.6, 107.06, 107.28, 108.22, 110.1, 107.29, 109.56, 106.47, 108.39, 108.19, 109.55, 108.45], top10Return: 9.2, spyReturn: 8.4, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 99.58, 99.21, 101.21, 100.73, 102.09, 100.83, 101.54, 104.78, 106.85, 106.75, 111.81, 115.56, 114.81, 115.68, 113.37, 116.9, 112.97, 112.74, 115.04, 116.18, 114.69, 117.39, 116.64, 118.85, 121.71, 123.15, 123.64, 124.54, 124.7, 125.02, 126.51, 122.54, 125.09, 125.46, 126.77, 131.06, 135.74, 140.16, 140.02, 143.24, 148.63, 142.64, 147.42, 149.72, 142.84, 142.95, 142.11, 139.5, 131.7, 130.74, 129.61], spy: [100, 101.02, 99.86, 102.2, 101.74, 102.59, 102.37, 103.41, 104.95, 105.46, 105.93, 106.4, 105.31, 106.75, 109.25, 107.38, 108.61, 104.96, 107.34, 108.75, 108.62, 107.95, 109.4, 108.44, 109.64, 110.08, 109.6, 110.04, 109.82, 108.41, 108.51, 109.15, 106.92, 105.32, 103.13, 100.83, 104.78, 109.1, 112.7, 113.72, 114.18, 117.56, 117.46, 119.36, 120.79, 117.55, 120.03, 116.65, 118.75, 118.53, 120.03, 118.82], top10Return: 29.6, spyReturn: 18.8, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Industrials': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -0.3, spyReturn: -0.15, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 99.91, 99.56, 101.25, 101.26], spy: [100, 99.01, 98.85, 99.67, 99.53], top10Return: 1.3, spyReturn: -0.5, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 98.36, 98.25, 99.32, 98.03, 99.13, 100.01, 98.5, 97.58, 98.4, 95.69, 96.21, 95.77, 94.47, 95.43, 95.38, 94.02, 93.95, 93.61, 95.09, 95.12], spy: [100, 98.55, 98.5, 98.64, 97.93, 99.54, 100.32, 100.18, 100.05, 100.93, 100.14, 100.98, 101.42, 100.64, 101, 101.4, 100.85, 99.85, 99.69, 100.52, 100.38], top10Return: -4.9, spyReturn: 0.4, xLabels: ["Jun 24", "Jul 1", "Jul 8", "Jul 15", "Jul 22"] },
    'YTD': { top10: [100, 107.07, 111.97, 112.02, 112.58, 115.34, 117.83, 117.41, 112.77, 112.57, 111.42, 110.1, 117.51, 118, 120, 121.4, 122.25, 118.76, 123.69, 122.53, 117.36, 122.9, 121.35, 117.9, 117.4, 116.99], spy: [100, 101.78, 101.43, 101.99, 101.12, 101.47, 100.38, 100.6, 98.6, 98.11, 96.11, 95.37, 99.13, 102.89, 103.89, 105.68, 108.17, 108.32, 110.07, 110.61, 106.38, 109.51, 106.9, 109.65, 110.25, 109.57], top10Return: 17, spyReturn: 9.6, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 99.94, 98.66, 102.45, 106.61, 105.46, 101.47, 99.55, 98.89, 98, 101.87, 106.94, 107.75, 107.06, 108.98, 109.79, 108.46, 108.35, 109.52, 108.21, 111.14, 109.12, 111.54, 105.48, 105.27, 105.01], spy: [100, 100.73, 98.35, 98.88, 100.07, 99.57, 97.59, 96.13, 94.13, 92.03, 95.64, 99.58, 102.87, 103.62, 104.6, 107.06, 107.28, 108.22, 110.1, 107.29, 109.56, 106.47, 108.39, 108.19, 109.55, 108.45], top10Return: 5, spyReturn: 8.4, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 102.36, 103.2, 104.98, 102.46, 104.4, 103.18, 103.37, 106.31, 108.64, 109.86, 111.17, 111.34, 110.97, 112.19, 111.07, 109.91, 105.41, 107.28, 107.72, 108.98, 109.1, 112.33, 109.31, 115.42, 121.77, 121.82, 120.76, 125.31, 127.1, 129.05, 130.12, 123.27, 121.38, 120.04, 119.81, 124.57, 130.34, 131.14, 131.42, 132.02, 135.61, 130.67, 135.79, 134.89, 132.07, 134.72, 133.91, 136.46, 128.95, 128.71, 128.43], spy: [100, 101.02, 99.86, 102.2, 101.74, 102.59, 102.37, 103.41, 104.95, 105.46, 105.93, 106.4, 105.31, 106.75, 109.25, 107.38, 108.61, 104.96, 107.34, 108.75, 108.62, 107.95, 109.4, 108.44, 109.64, 110.08, 109.6, 110.04, 109.82, 108.41, 108.51, 109.15, 106.92, 105.32, 103.13, 100.83, 104.78, 109.1, 112.7, 113.72, 114.18, 117.56, 117.46, 119.36, 120.79, 117.55, 120.03, 116.65, 118.75, 118.53, 120.03, 118.82], top10Return: 28.4, spyReturn: 18.8, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Meme': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: 0, spyReturn: -0.15, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 98.9, 99.58, 106.13, 106.53], spy: [100, 99.01, 98.85, 99.67, 99.53], top10Return: 6.5, spyReturn: -0.5, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 95.38, 92.19, 91.68, 89.81, 93.69, 95.62, 92.09, 87.36, 88.99, 85.53, 87.62, 87.08, 83.87, 84.16, 82.52, 77.95, 76.86, 77.26, 81.88, 82.41], spy: [100, 98.55, 98.5, 98.64, 97.93, 99.54, 100.32, 100.18, 100.05, 100.93, 100.14, 100.98, 101.42, 100.64, 101, 101.4, 100.85, 99.85, 99.69, 100.52, 100.38], top10Return: -17.6, spyReturn: 0.4, xLabels: ["Jun 24", "Jul 1", "Jul 8", "Jul 15", "Jul 22"] },
    'YTD': { top10: [100, 108.51, 106.11, 104, 100.49, 95.77, 94, 93.2, 89.64, 92.08, 92.98, 89.54, 99.81, 113.23, 112.85, 115.79, 123.7, 124.09, 138.92, 136.95, 125.05, 130.73, 121.14, 112.9, 110.15, 108.45], spy: [100, 101.78, 101.43, 101.99, 101.12, 101.47, 100.38, 100.6, 98.6, 98.11, 96.11, 95.37, 99.13, 102.89, 103.89, 105.68, 108.17, 108.32, 110.07, 110.61, 106.38, 109.51, 106.9, 109.65, 110.25, 109.57], top10Return: 8.4, spyReturn: 9.6, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 97.28, 81.8, 84, 84.41, 83.89, 80.93, 83.18, 83.01, 77.51, 80.3, 90.71, 102.55, 98.94, 101.97, 109.01, 112.14, 118.15, 124.6, 113.36, 117.31, 114.02, 112.97, 100.93, 97.2, 97.15], spy: [100, 100.73, 98.35, 98.88, 100.07, 99.57, 97.59, 96.13, 94.13, 92.03, 95.64, 99.58, 102.87, 103.62, 104.6, 107.06, 107.28, 108.22, 110.1, 107.29, 109.56, 106.47, 108.39, 108.19, 109.55, 108.45], top10Return: -2.9, spyReturn: 8.4, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 102.36, 98.12, 94.37, 87.93, 88.96, 85.78, 83.17, 82.72, 86.63, 86.44, 88.84, 87.75, 84.6, 88.09, 84.83, 88.55, 86.02, 85.34, 82.9, 86.91, 82.23, 85.79, 85.54, 88.54, 90.14, 90.85, 88.12, 86.4, 89.49, 88.67, 88.86, 90.14, 91.26, 96.83, 95.18, 94.62, 101.05, 106.32, 104.88, 103.77, 114.6, 114.82, 108.26, 111.9, 110.2, 103.43, 103.99, 98.08, 96.39, 89.22, 93.52], spy: [100, 101.02, 99.86, 102.2, 101.74, 102.59, 102.37, 103.41, 104.95, 105.46, 105.93, 106.4, 105.31, 106.75, 109.25, 107.38, 108.61, 104.96, 107.34, 108.75, 108.62, 107.95, 109.4, 108.44, 109.64, 110.08, 109.6, 110.04, 109.82, 108.41, 108.51, 109.15, 106.92, 105.32, 103.13, 100.83, 104.78, 109.1, 112.7, 113.72, 114.18, 117.56, 117.46, 119.36, 120.79, 117.55, 120.03, 116.65, 118.75, 118.53, 120.03, 118.82], top10Return: -6.5, spyReturn: 18.8, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
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
export const SCAN_TIMESTAMP    = '2026-07-22T13:38:16.131Z';
export const SCAN_TIMESTAMP_NY = 'July 22, 2026 at 9:38 AM ET';
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
export const HOLDINGS_COUNT = 1299;
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
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 13.49, bestProScore: 6.45, avgProScore: 4.50, price: 206.86, weeklyChange: -0.26 },
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.65, bestProScore: 5.10, avgProScore: 4.22, price: 954.15, weeklyChange: 11.83 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 11.34, bestProScore: 5.26, avgProScore: 3.78, price: 543.13, weeklyChange: 8.42 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 7.19, bestProScore: 3.11, avgProScore: 2.40, price: 384.33, weeklyChange: 2.64 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.65, bestProScore: 2.86, avgProScore: 2.33, price: 418.00, weeklyChange: 2.02 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 4.30, bestProScore: 2.19, avgProScore: 2.15, price: 240.23, weeklyChange: 1.88 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.25, bestProScore: 3.12, avgProScore: 2.13, price: 103.73, weeklyChange: 6.96 },
  { ticker: 'GOOGL', name: `ALPHABET INC CLASS A`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 3.69, bestProScore: 3.08, avgProScore: 1.84, price: 347.17, weeklyChange: -2.06 },
  { ticker: 'META', name: `Meta Platforms Inc Class A`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 3.56, bestProScore: 2.80, avgProScore: 1.78, price: 637.12, weeklyChange: -4.13 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.42, bestProScore: 2.36, avgProScore: 1.71, price: 315.85, weeklyChange: -1.59 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': 4.2, '1M': -20.7, 'YTD': 85.6, '6M': 62.2, '1Y': 148 },
  ARTY: { '1W': 4.4, '1M': -13.1, 'YTD': 43.2, '6M': 33.4, '1Y': 64.4 },
  BAI:  { '1W': 4.1, '1M': -17.2, 'YTD': 34.8, '6M': 30.2, '1Y': 51.1 },
  IGPT: { '1W': 3.5, '1M': -14.1, 'YTD': 56.2, '6M': 44, '1Y': 86.1 },
  IVES: { '1W': -2.5, '1M': -2.5, 'YTD': 15.8, '6M': 13.4, '1Y': 33 },
  ALAI: { '1W': 0.4, '1M': -2.9, 'YTD': 24.1, '6M': 24.4, '1Y': 43.8 },
  CHAT: { '1W': -2, '1M': -16.8, 'YTD': 46.9, '6M': 42.5, '1Y': 73.9 },
  AIFD: { '1W': 1.9, '1M': -8.4, 'YTD': 34.5, '6M': 32.1, '1Y': 63 },
  SPRX: { '1W': 5, '1M': -20.2, 'YTD': 21.4, '6M': 12.3, '1Y': 51.6 },
  AOTG: { '1W': -0.4, '1M': -1.7, 'YTD': 13.5, '6M': 15.9, '1Y': 24.5 },
  // Semiconductors
  SOXX: { '1W': 3.2, '1M': -16.5, 'YTD': 81.7, '6M': 56.9, '1Y': 124.7 },
  PSI:  { '1W': 4.9, '1M': -17.5, 'YTD': 93.1, '6M': 59.9, '1Y': 149.9 },
  XSD:  { '1W': -2.2, '1M': -19, 'YTD': 63.2, '6M': 45.2, '1Y': 96.1 },
  DRAM: { '1W': 9.1, '1M': -29.3, 'YTD': 105.7, '6M': 105.7, '1Y': 105.7 },
  // Broad Tech
  PTF:  { '1W': 8.2, '1M': -20.9, 'YTD': 43, '6M': 29.7, '1Y': 59.2 },
  WCLD: { '1W': -5.2, '1M': 14.2, 'YTD': -5.6, '6M': 1.9, '1Y': -8.7 },
  IGV:  { '1W': -3.4, '1M': 3.7, 'YTD': -14.3, '6M': -6.6, '1Y': -18.3 },
  FDTX: { '1W': 2.3, '1M': -10.4, 'YTD': 27.9, '6M': 27.8, '1Y': 32.3 },
  GTEK: { '1W': -0.8, '1M': -10.1, 'YTD': 40.9, '6M': 36.5, '1Y': 55.9 },
  ARKK: { '1W': 0.7, '1M': -1.6, 'YTD': 0.3, '6M': -6.1, '1Y': 1 },
  MARS: { '1W': 1, '1M': -18.8, 'YTD': 1, '6M': 1, '1Y': 1 },
  FRWD: { '1W': -0.2, '1M': -7.6, 'YTD': 26.9, '6M': 26.4, '1Y': 26.9 },
  BCTK: { '1W': -1.5, '1M': -5.9, 'YTD': 18.4, '6M': 19, '1Y': 20.5 },
  FWD:  { '1W': 1.4, '1M': -11.9, 'YTD': 25.6, '6M': 15, '1Y': 45 },
  CBSE: { '1W': -0.9, '1M': -5.4, 'YTD': 24.6, '6M': 13.2, '1Y': 30.2 },
  FCUS: { '1W': 1.4, '1M': -16.6, 'YTD': 24.1, '6M': 4.6, '1Y': 49 },
  WGMI: { '1W': 17.4, '1M': -21.5, 'YTD': 47.6, '6M': 20.3, '1Y': 104.9 },
  CNEQ: { '1W': 0.6, '1M': -4.6, 'YTD': 13.8, '6M': 13.9, '1Y': 30.4 },
  SGRT: { '1W': 2.6, '1M': -11.6, 'YTD': 35.9, '6M': 26.5, '1Y': 70 },
  SPMO: { '1W': 2.7, '1M': -7.7, 'YTD': 25, '6M': 26.5, '1Y': 32.2 },
  XMMO: { '1W': 2.3, '1M': -7, 'YTD': 16.7, '6M': 13.5, '1Y': 24.2 },
  // Electrification
  POW:  { '1W': -1.5, '1M': -14.2, 'YTD': 38.8, '6M': 25.6, '1Y': 34.7 },
  VOLT: { '1W': 1.4, '1M': -9.1, 'YTD': 32.1, '6M': 21.5, '1Y': 43.8 },
  PBD:  { '1W': -2.4, '1M': -10.9, 'YTD': 13.2, '6M': 3.6, '1Y': 30.8 },
  PBW:  { '1W': 2.5, '1M': -16.9, 'YTD': 12.1, '6M': -5.4, '1Y': 38 },
  IVEP: { '1W': -0.6, '1M': -10.2, 'YTD': 0.7, '6M': 0.7, '1Y': 0.7 },
  // Industrials
  AIRR: { '1W': 0.4, '1M': -7.9, 'YTD': 24.8, '6M': 7.2, '1Y': 46.1 },
  PRN:  { '1W': 3.6, '1M': -12.9, 'YTD': 31.1, '6M': 16.5, '1Y': 44.6 },
  IDEF: { '1W': 1.6, '1M': -0.3, 'YTD': 2.6, '6M': -10.6, '1Y': 10.2 },
  BILT: { '1W': -0.5, '1M': 1.6, 'YTD': 9.5, '6M': 6.9, '1Y': 12.7 },
  // Meme
  BUZZ: { '1W': -0.3, '1M': -6.1, 'YTD': 8.3, '6M': 2, '1Y': 9.3 },
  MEME: { '1W': 12.3, '1M': -25.9, 'YTD': 24.3, '6M': -3.3, '1Y': -21.5 },
  RKNG: { '1W': 7.6, '1M': -20.8, 'YTD': -7.3, '6M': -7.3, '1Y': -7.3 },
};
// @@END_GENERATED:ETF_RETURNS@@

// @@GENERATED:ETF_DAY_CHANGE@@
// Today's % move per ETF ticker (1D, vs prior close). Refreshed by the 3×/day
// price jobs. Powers the 1D ranking in the theme-ETF side panel.
export const ETF_DAY_CHANGE: Record<string, number> = {
  AIS:  -1.4,
  BAI:  -1.1,
  IGPT: -0.44,
  SOXX: -0.99,
  PSI:  -1.56,
  DRAM: -2.94,
  WCLD: -1.99,
  IGV:  -1.43,
  ARKK: -0.67,
  FWD:  -0.64,
  WGMI: 0.64,
  SPMO: -0.33,
  XMMO: 0.63,
  PBW:  0.13,
  AIRR: -0.34,
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
  'AI & ML': { etfs: ['AIS', 'CHAT', 'IVES'], series: { '1W': [100, 97.07, 96.18, 98.68, 99.9], '1M': [100, 93.78, 93.02, 94.83, 92.19, 94.7, 97.58, 93.57, 89.51, 92.1, 89.28, 91.22, 92.3, 90.16, 89.23, 88.8, 87, 84.45, 83.64, 85.58, 86.66], 'YTD': [100, 103.82, 106.73, 107.6, 106.56, 107.81, 107.55, 109.07, 102.93, 107.01, 106.37, 98.98, 111.91, 121.08, 127.82, 132.43, 146.77, 144.66, 161.06, 175.01, 149.58, 169.69, 161.52, 155.6, 155.14, 149.43], '6M': [100, 103.41, 95.23, 100.42, 101.6, 102.26, 97.73, 99.15, 100.03, 94.86, 98.29, 107.42, 116.38, 120.99, 123.65, 134.72, 139.22, 142.09, 155.98, 145.44, 151.99, 158.05, 156.72, 143.9, 142.8, 139.4], '1Y': [100, 103.18, 102.2, 107.21, 103.56, 105.07, 105.06, 110.45, 117.66, 121.21, 121.49, 125.74, 124.51, 127.36, 134.33, 129.24, 129.61, 121.01, 119.74, 123.35, 126.8, 119.98, 124.19, 122.29, 126.42, 129.5, 131.01, 132.78, 125.41, 130.47, 133.75, 132.49, 126.38, 129.16, 128.16, 122.45, 128.94, 141.61, 153.17, 162.16, 165.44, 185.38, 178.74, 195.72, 215.52, 195.67, 202.99, 210.19, 209.7, 191.35, 189.47, 184.98] }, returns: { '1W': -0.1, '1M': -13.3, 'YTD': 49.4, '6M': 39.4, '1Y': 85 } },
  'Semiconductors': { etfs: ['DRAM', 'PSI', 'XSD'], series: { '1W': [100, 97.91, 97.8, 104.06, 103.9], '1M': [100, 90.42, 89.71, 94.53, 89.49, 92.35, 96.51, 89.37, 82.18, 84.96, 80.48, 83.61, 84.13, 80.05, 81.45, 79.61, 75.47, 73.71, 73.58, 78, 78.09], 'YTD': [100, 112.15, 116.25, 118.05, 117.62, 125.42, 124.67, 129.84, 126.96, 135.64, 136.42, 133.46, 154.83, 165.79, 184.14, 180.37, 199.79, 199.18, 230.78, 227.9, 209.3, 214.59, 207.64, 195.44, 186.76, 187.33], '6M': [100, 106.37, 104.43, 111, 109.96, 112.23, 107.89, 113.24, 119.57, 124.5, 126.98, 135.47, 153.5, 164.67, 176, 174.08, 182.21, 188.76, 207.22, 198.41, 205.99, 197.18, 197.66, 175.82, 167.54, 170.25], '1Y': [100, 102.11, 104.69, 108.12, 107.65, 113.36, 110.93, 115.03, 117.41, 123.9, 122.87, 126.66, 127.16, 130.96, 137.02, 137.68, 139.63, 139.83, 145.06, 149.84, 152.21, 142.26, 145.07, 148.43, 153.25, 166.93, 170.85, 177.22, 180.33, 178.66, 166.12, 170.72, 157.75, 169.2, 177.28, 172.52, 188.07, 204.72, 202.19, 223.47, 222.38, 243.1, 219.42, 241.37, 237.75, 234.97, 240.28, 247.46, 239.37, 212.71, 222.86, 217.21] }, returns: { '1W': 3.9, '1M': -21.9, 'YTD': 87.3, '6M': 70.3, '1Y': 117.2 } },
  'Broad Tech': { etfs: ['WGMI', 'SGRT', 'GTEK'], series: { '1W': [100, 97.21, 100.1, 102.65, 106.4], '1M': [100, 96.37, 94.23, 94.51, 93.42, 93.58, 95.22, 91.04, 85.56, 88.19, 85.09, 86.63, 87.79, 86.01, 83.49, 84.89, 81.23, 78.86, 80.63, 82.36, 85.61], 'YTD': [100, 107.59, 114.87, 115.29, 109.34, 108.07, 108.49, 110.39, 100.84, 105.09, 105.86, 97.32, 112.99, 121.02, 128.16, 128.83, 143.01, 139.49, 154.35, 163.43, 142.89, 161.71, 154.97, 142.12, 139.14, 141.45], '6M': [100, 103.56, 90.13, 97.74, 96.95, 100.15, 93.12, 93.72, 95.78, 90.84, 94.05, 106.12, 114.36, 115.44, 116.75, 127.12, 130.11, 131.33, 143.43, 135.1, 141.24, 148.7, 139.3, 127.05, 126.65, 127.78], '1Y': [100, 98.08, 97.09, 99.56, 102.14, 107.14, 109.6, 114.22, 123.25, 129.6, 130.8, 145.09, 156.01, 145.56, 147.99, 146.35, 138.75, 128.08, 128.08, 133.75, 137.08, 124.78, 130.93, 127.56, 136.25, 139.83, 143.6, 139.62, 133.08, 137.42, 133.7, 135.49, 127.6, 129.8, 127.81, 126.45, 135.05, 148.16, 159.41, 161.15, 167.99, 181.63, 174.2, 191.28, 204.65, 188.87, 198.99, 204.06, 192.06, 176.54, 172.4, 176.92] }, returns: { '1W': 6.4, '1M': -14.4, 'YTD': 41.4, '6M': 27.8, '1Y': 76.9 } },
  'Electrification': { etfs: ['VOLT', 'POW', 'PBD'], series: { '1W': [100, 97.98, 98.09, 97.91, 99.16], '1M': [100, 95.84, 95.55, 96.39, 93.55, 95.45, 97.64, 94.83, 92.4, 93.64, 89.85, 89.97, 90.54, 90.38, 89.19, 89.92, 89.35, 87.56, 87.65, 87.49, 88.6], 'YTD': [100, 102.88, 109.24, 111.9, 114.25, 118.48, 119.74, 123.34, 113.6, 116.31, 118.75, 115.24, 125.27, 129.77, 136.52, 143.67, 147.68, 140.39, 147.69, 145.31, 132.29, 141.4, 135.42, 133.95, 130.32, 128.05], '6M': [100, 104.08, 103.94, 109.2, 109.59, 112.61, 104.71, 105.74, 107.67, 106.66, 108.62, 117.01, 121.22, 124.61, 131.14, 132.95, 132.47, 129.77, 130.81, 124.68, 127.28, 130.56, 127.36, 118.49, 118.66, 116.91], '1Y': [100, 100.98, 99.88, 101.32, 100.28, 100.17, 99.58, 100.66, 103.14, 103.88, 103.9, 107.59, 109.13, 110.38, 112.15, 110.95, 114.96, 111.55, 110.84, 113.14, 114.97, 115.27, 116.46, 117.14, 116.66, 119.97, 121.37, 124.3, 125.44, 126.69, 128.94, 131.9, 128.42, 130.34, 131.97, 133.83, 138.85, 145.5, 148.78, 147.03, 151.95, 155.65, 150.6, 150.97, 152.52, 148.87, 149.1, 150.82, 146.33, 139.49, 138.24, 136.45] }, returns: { '1W': -0.8, '1M': -11.4, 'YTD': 28.1, '6M': 16.9, '1Y': 36.4 } },
  'Industrials': { etfs: ['PRN', 'BILT', 'IDEF'], series: { '1W': [100, 100.19, 99.97, 101.43, 101.56], '1M': [100, 98.75, 98.36, 99.17, 98.27, 99.25, 100.01, 98.98, 98.61, 99.44, 96.93, 97.17, 96.77, 95.58, 96.39, 96.35, 94.78, 94.96, 94.74, 95.98, 96.13], 'YTD': [100, 106.28, 110.8, 110.95, 110.98, 112.98, 116.2, 116.48, 112.92, 112.62, 111.12, 109.24, 116.28, 116.51, 117.48, 118.73, 119.06, 115.97, 121.42, 119.47, 114.86, 119.49, 117.83, 115.54, 114.72, 114.38], '6M': [100, 100.45, 98.49, 102.44, 106.63, 106.19, 103.13, 101.11, 100.49, 98.7, 102.74, 107.1, 107.58, 106.61, 108.24, 108.63, 107.41, 108.04, 108.89, 106.96, 110.22, 107.78, 109.91, 104.94, 104.47, 104.27], '1Y': [100, 101.88, 102.69, 103.54, 100.94, 102.49, 101.78, 102.06, 104.65, 106.69, 108.12, 109.54, 109.67, 109.02, 110.1, 109.12, 107.74, 103.84, 104.39, 104.47, 106.07, 105.79, 109.43, 106.73, 112.05, 117.88, 117.95, 117.29, 120.06, 122.19, 124.77, 126.08, 120.54, 118.76, 117.32, 116.18, 121.02, 125.43, 125.7, 125.36, 126.31, 129.06, 124.62, 130.14, 128.75, 125.25, 127.89, 127.16, 129.07, 123.3, 122.71, 122.54] }, returns: { '1W': 1.6, '1M': -3.9, 'YTD': 14.4, '6M': 4.3, '1Y': 22.5 } },
  'Meme': { etfs: ['BUZZ', 'RKNG', 'MEME'], series: { '1W': [100, 98.9, 99.58, 106.13, 106.53], '1M': [100, 95.38, 92.19, 91.68, 89.81, 93.69, 95.62, 92.09, 87.36, 88.99, 85.53, 87.62, 87.08, 83.87, 84.16, 82.52, 77.95, 76.86, 77.26, 81.88, 82.41], 'YTD': [100, 108.51, 106.11, 104, 100.49, 95.77, 94, 93.2, 89.64, 92.08, 92.98, 89.54, 99.81, 113.23, 112.85, 115.79, 123.7, 124.09, 138.92, 136.95, 125.05, 130.73, 121.14, 112.9, 110.15, 108.45], '6M': [100, 97.28, 81.8, 84, 84.41, 83.89, 80.93, 83.18, 83.01, 77.51, 80.3, 90.71, 102.55, 98.94, 101.97, 109.01, 112.14, 118.15, 124.6, 113.36, 117.31, 114.02, 112.97, 100.93, 97.2, 97.15], '1Y': [100, 102.36, 98.12, 94.37, 87.93, 88.96, 85.78, 83.17, 82.72, 86.63, 86.44, 88.84, 87.75, 84.6, 88.09, 84.83, 88.55, 86.02, 85.34, 82.9, 86.91, 82.23, 85.79, 85.54, 88.54, 90.14, 90.85, 88.12, 86.4, 89.49, 88.67, 88.86, 90.14, 91.26, 96.83, 95.18, 94.62, 101.05, 106.32, 104.88, 103.77, 114.6, 114.82, 108.26, 111.9, 110.2, 103.43, 103.99, 98.08, 96.39, 89.22, 93.52] }, returns: { '1W': 6.5, '1M': -17.6, 'YTD': 8.5, '6M': -2.8, '1Y': -6.5 } },
};
// @@END_GENERATED:THEME_REPRESENTATIVES@@

// @@GENERATED:THEME_UNIVERSE@@
export const THEME_UNIVERSE: Partial<Record<Theme, ThemeUniverseFund[]>> = {
  'AI & ML': [
    { t: 'AIS', chosen: true, anchor: true, score: 105.1, ret6: 62.2, ret1: 148, corr: 0.66, reason: 'anchor', series: { '1W': [100, 98.65, 98.94, 105.64, 104.22], '1M': [100, 91.15, 90.79, 95, 90.28, 93.01, 96.49, 89.91, 83.96, 87.17, 83.66, 87.35, 86.54, 81.37, 83.75, 81.1, 76.07, 75.04, 75.26, 80.35, 79.27], 'YTD': [100, 106.94, 110.67, 114.27, 114.51, 118.48, 116.79, 120.65, 110.91, 120.28, 116.55, 110.96, 126.71, 137.68, 148.85, 160.92, 179.08, 173.95, 203.1, 218.61, 185.99, 226.56, 211.33, 191.61, 196.03, 185.56], '6M': [100, 101.18, 94.65, 102.18, 104.19, 105.49, 96.97, 100.21, 99.86, 95.79, 101.44, 116.6, 124.21, 134.42, 140.69, 156.57, 156.99, 165.3, 181.97, 171.37, 188.15, 186.55, 197.48, 171.2, 165.97, 162.23] } },
    { t: 'IGPT', chosen: false, anchor: false, score: 65, ret6: 44, ret1: 86.1, corr: 0.95, reason: 'correlated', series: { '1W': [100, 98.58, 99.14, 104.02, 103.54], '1M': [100, 92.96, 92.36, 95.22, 91.43, 93.71, 96.29, 92.63, 88.12, 90.78, 88.39, 91.34, 91.54, 87.44, 89.14, 87.24, 83.01, 81.83, 82.3, 86.35, 85.95], 'YTD': [100, 105.23, 105.3, 109.57, 107.82, 106.15, 105.48, 107.23, 101.06, 105.11, 103.01, 97.63, 107.37, 117.3, 120.72, 133.24, 152.93, 145.84, 164.27, 172.49, 152.61, 178.91, 166.2, 159.11, 162.05, 156.25], '6M': [100, 102.71, 93.59, 96.87, 98.87, 98.81, 93.12, 94.22, 93.71, 88.19, 93.38, 102.23, 109.5, 116.72, 122.78, 140.92, 135.9, 142.27, 157.84, 147.41, 159.54, 155.72, 161.3, 148.06, 146.13, 143.97] } },
    { t: 'CHAT', chosen: true, anchor: false, score: 58.2, ret6: 42.5, ret1: 73.9, corr: 0.8, reason: 'diversifier', series: { '1W': [100, 94.7, 92.67, 92.84, 97.97], '1M': [100, 92.6, 92.01, 93.96, 89.95, 91.7, 94.82, 89.86, 85.32, 87.44, 84.17, 86.3, 88.78, 88.15, 84.2, 85.32, 84.96, 80.46, 78.74, 78.88, 83.24], 'YTD': [100, 102.34, 104.65, 104.82, 104.99, 106.41, 109.21, 109.89, 103.29, 106.45, 108.34, 100.17, 115.2, 124.08, 130.87, 132.28, 146.17, 145, 159.74, 175.46, 148.61, 164.3, 158.77, 154.34, 150.59, 146.92], '6M': [100, 105.22, 97.68, 103.21, 105.96, 106.62, 102.16, 104.05, 107.32, 101.04, 104.2, 114.2, 123.56, 126.97, 128.34, 138.08, 146.09, 146.03, 161.63, 149.17, 153.27, 171.25, 157.03, 144.15, 146.11, 142.55] } },
    { t: 'ARTY', chosen: false, anchor: false, score: 48.9, ret6: 33.4, ret1: 64.4, corr: 0.91, reason: 'correlated', series: { '1W': [100, 99.06, 99.41, 104.09, 104.44], '1M': [100, 93.7, 93.11, 94.13, 91.01, 93.31, 95.9, 92.09, 89.51, 91.22, 89.5, 91.56, 91.29, 87.7, 88.09, 86.59, 83.17, 82.38, 82.67, 86.57, 86.86], 'YTD': [100, 104.5, 107.12, 111.15, 106.14, 107.66, 106.04, 105.87, 99.58, 103.32, 101.89, 96.58, 105.62, 119.66, 124.97, 130.39, 141.93, 133.81, 148.82, 166.09, 142.34, 163.76, 150.02, 145.14, 145.21, 143.17], '6M': [100, 103.23, 92.44, 98.24, 99.13, 98.67, 92.8, 93.64, 92.4, 88.68, 93.02, 104.56, 114.08, 120.08, 121.51, 132.26, 127.27, 133.04, 150.97, 142.92, 149.65, 143.95, 147.31, 137.49, 133.02, 133.43] } },
    { t: 'AIFD', chosen: false, anchor: false, score: 47.5, ret6: 32.1, ret1: 63, corr: 0.86, reason: 'correlated', series: { '1W': [100, 99.58, 99.98, 103.42, 101.92], '1M': [100, 95.05, 94.05, 95.55, 94.04, 97.21, 100.46, 97.4, 93.54, 95.95, 94.3, 96.2, 95.67, 93.32, 94.44, 92.9, 89.91, 89.53, 89.89, 92.98, 91.63], 'YTD': [100, 101.7, 101.61, 103.95, 101.03, 105.49, 105.53, 105.11, 102.14, 105.69, 106.19, 102.61, 111.81, 119.16, 122.48, 126.39, 133.02, 131.06, 138.87, 149.97, 136, 146.89, 138.08, 136.76, 138.66, 134.54], '6M': [100, 101.54, 96.37, 102.35, 104.17, 103.21, 100.3, 101.97, 102.1, 98.25, 103.66, 112.84, 119.77, 122.43, 124.12, 130.62, 132.05, 133.94, 144.95, 138.67, 144.51, 137.04, 144.84, 135.96, 133.94, 132.11] } },
    { t: 'BAI', chosen: false, anchor: false, score: 40.6, ret6: 30.2, ret1: 51.1, corr: 0.95, reason: 'correlated', series: { '1W': [100, 98.7, 98.98, 105.24, 104.06], '1M': [100, 92.07, 91.63, 94.86, 90.58, 93.73, 97.22, 91.26, 86.67, 88.88, 85.62, 88.6, 87.98, 83.75, 86.02, 83.77, 79.55, 78.52, 78.74, 83.72, 82.78], 'YTD': [100, 103.09, 104.8, 106.4, 102.88, 105.98, 104.53, 105.14, 98.2, 102.37, 103.87, 98.95, 111.83, 120.18, 122.94, 131.02, 141.08, 136.67, 150.15, 155.29, 136.88, 159.76, 147.51, 136.82, 140.09, 134.8], '6M': [100, 102.52, 94.11, 99.71, 101.97, 101.51, 94.81, 96.26, 97.07, 94.58, 99.65, 111.89, 118.21, 123.92, 126.5, 136.21, 135.66, 138.62, 147.75, 138.71, 151.06, 144.77, 152.86, 134.62, 131.72, 130.15] } },
    { t: 'ALAI', chosen: false, anchor: false, score: 34.1, ret6: 24.4, ret1: 43.8, corr: 0.88, reason: 'correlated', series: { '1W': [100, 97.15, 96.05, 96.44, 100.43], '1M': [100, 96.92, 95.62, 95.78, 95.41, 97.31, 98.92, 97.59, 94.43, 97.42, 95.8, 96.52, 97.49, 98.33, 95.9, 95.71, 96.73, 93.97, 92.91, 93.28, 97.14], 'YTD': [100, 101.24, 102.19, 100.8, 98.03, 97.71, 96.26, 96.61, 92.88, 93.02, 92.97, 86.1, 97.78, 106.42, 107.86, 109.08, 115.79, 118.26, 122.29, 128.77, 115.87, 125.78, 121.91, 124.48, 122.29, 124.12], '6M': [100, 103.47, 95.36, 97.31, 96.5, 96.85, 95.14, 93.95, 96.42, 89.92, 93.56, 100.25, 108.19, 108.13, 109.35, 115.57, 120.5, 120.79, 126.85, 120.13, 120.43, 128.1, 124.66, 122.71, 122.6, 124.43] } },
    { t: 'SPRX', chosen: false, anchor: false, score: 32, ret6: 12.3, ret1: 51.6, corr: 0.87, reason: 'correlated', series: { '1W': [100, 99.11, 100.32, 105.85, 105], '1M': [100, 93.7, 91.98, 93.49, 90.49, 95.75, 99.04, 93.18, 86.68, 88.37, 84.97, 88.45, 87.21, 82.33, 83.12, 80.98, 76.01, 75.33, 76.26, 80.46, 79.82], 'YTD': [100, 105.52, 109.87, 111.54, 107.15, 104.28, 102.88, 101.21, 96.07, 100.81, 100.65, 92.46, 104.08, 112.58, 115.12, 111.98, 119.26, 121.61, 142.68, 150.26, 130.78, 150.47, 137.59, 126.63, 126.39, 121.37], '6M': [100, 102.87, 87.86, 92.3, 93.88, 93.64, 88.88, 90.19, 90.31, 85.51, 90.72, 101.47, 105.83, 107.23, 103.6, 110.35, 115.72, 127.13, 132.91, 129.37, 139.53, 131.82, 139.34, 119.54, 113.92, 112.29] } },
    { t: 'IVES', chosen: true, anchor: false, score: 23.2, ret6: 13.4, ret1: 33, corr: 0.8, reason: 'diversifier', series: { '1W': [100, 97.87, 96.94, 97.55, 97.5], '1M': [100, 97.58, 96.25, 95.53, 96.33, 99.39, 101.44, 100.93, 99.25, 101.7, 100, 100, 101.57, 100.96, 99.73, 99.97, 99.97, 97.84, 96.91, 97.52, 97.47], 'YTD': [100, 102.18, 104.87, 103.7, 100.19, 98.54, 96.65, 96.68, 94.59, 94.31, 94.21, 85.8, 93.83, 101.49, 103.73, 104.08, 115.06, 115.03, 120.34, 130.97, 114.14, 118.22, 114.46, 120.85, 118.79, 115.82], '6M': [100, 103.84, 93.37, 95.88, 94.64, 94.67, 94.05, 93.18, 92.91, 87.76, 89.22, 91.45, 101.36, 101.58, 101.92, 109.51, 114.59, 114.93, 124.35, 115.77, 114.56, 116.36, 115.64, 116.36, 116.33, 113.41] } },
    { t: 'AOTG', chosen: false, anchor: false, score: 20.2, ret6: 15.9, ret1: 24.5, corr: 0.93, reason: 'correlated', series: { '1W': [100, 96.73, 95.29, 96.25, 99.61], '1M': [100, 96.01, 95.55, 96.68, 96.72, 98.78, 101.3, 99.66, 97.58, 100.26, 97.87, 98.04, 100.1, 100.6, 98.11, 99.47, 98.65, 95.43, 94.01, 94.96, 98.27], 'YTD': [100, 100.91, 99.17, 99.99, 93.51, 92.64, 89.73, 89.93, 89.66, 87.35, 87.85, 81.48, 88.84, 95.99, 97.19, 100.52, 108.37, 106.37, 110.85, 118.34, 106.32, 111.99, 111.67, 115.76, 114.84, 113.46], '6M': [100, 102.88, 91.26, 93.28, 91.67, 91.87, 93.35, 90.09, 89.93, 86.02, 88.08, 90.93, 99.95, 99.29, 102.69, 109.13, 111.15, 109.74, 119.03, 111.46, 112.83, 117.95, 116.51, 115.44, 117.32, 115.91] } },
  ],
  'Semiconductors': [
    { t: 'DRAM', chosen: true, anchor: true, score: 105.7, ret6: 105.7, ret1: 105.7, corr: 0.1, reason: 'anchor', series: { '1W': [100, 100.73, 101.38, 112.44, 109.08], '1M': [100, 85.75, 86.63, 95.26, 89.05, 89.12, 91.49, 81.59, 75.11, 80.23, 76.86, 79.73, 78.1, 70.99, 75.85, 71.11, 64.84, 65.31, 65.73, 72.91, 70.73], 'YTD': [100, 116.97, 120.86, 126.22, 125.83, 134.01, 137.72, 152.99, 167.69, 184.8, 184.08, 185.55, 217.98, 227.67, 251.12, 218.01, 234.58, 245.39, 290.78, 276.98, 266.03, 233.29, 231.84, 220.57, 189.91, 205.66], '6M': [100, 116.97, 120.86, 126.22, 125.83, 134.01, 137.72, 152.99, 167.69, 184.8, 184.08, 185.55, 217.98, 227.67, 251.12, 218.01, 234.58, 245.39, 290.78, 276.98, 266.03, 233.29, 231.84, 220.57, 189.91, 205.66] } },
    { t: 'PSI', chosen: true, anchor: false, score: 104.9, ret6: 59.9, ret1: 149.9, corr: 0.68, reason: 'diversifier', series: { '1W': [100, 98.63, 98.87, 106.37, 104.86], '1M': [100, 92.4, 91.49, 96.14, 91.18, 96.49, 101.83, 94.56, 85.67, 86.51, 82.04, 86.46, 86.43, 82.23, 85.61, 83.32, 78.73, 77.65, 77.84, 83.74, 82.55], 'YTD': [100, 112.69, 117.35, 119.33, 119.05, 130.15, 125.98, 125.54, 113.11, 120.33, 122.77, 119.68, 134.76, 147.41, 161.07, 171.34, 192.47, 181.27, 204.96, 207.71, 188.69, 226.01, 213.26, 188.11, 200.23, 193.08], '6M': [100, 102.1, 96.65, 104.8, 105.96, 103.99, 93.7, 96.72, 99.42, 97.91, 103.78, 118.33, 127.87, 141.66, 141.93, 159.43, 155.8, 161.5, 161.38, 160.2, 184.45, 179.03, 197.29, 158.96, 161.44, 159.94] } },
    { t: 'SOXX', chosen: false, anchor: false, score: 90.8, ret6: 56.9, ret1: 124.7, corr: 0.94, reason: 'correlated', series: { '1W': [100, 98.36, 98.8, 104.18, 103.15], '1M': [100, 92.12, 91.83, 95.45, 90.07, 93.79, 97.82, 91.56, 86.46, 88.78, 85.8, 88.81, 88.75, 84.52, 86.7, 84.77, 80.99, 79.66, 80.02, 84.38, 83.54], 'YTD': [100, 109.17, 113.72, 116.58, 114.77, 119.61, 118.16, 116.98, 107.42, 112.18, 111.77, 109.13, 123, 134.8, 146.44, 154.66, 172.77, 164.66, 189.3, 204.44, 179.81, 212.34, 195.9, 183.19, 188.58, 181.71], '6M': [100, 103.57, 94.88, 100.81, 103.09, 101.04, 92.78, 95.02, 95.37, 92.78, 98.69, 112.81, 119.76, 132.39, 133.58, 149.22, 145.85, 154.11, 164.03, 163.89, 180.24, 173.05, 183.77, 161.19, 159.25, 156.94] } },
    { t: 'XSD', chosen: true, anchor: false, score: 70.7, ret6: 45.2, ret1: 96.1, corr: 0.68, reason: 'diversifier', series: { '1W': [100, 94.37, 93.14, 93.36, 97.76], '1M': [100, 93.12, 91.02, 92.19, 88.23, 91.43, 96.22, 91.95, 85.75, 88.13, 82.54, 84.64, 87.85, 86.92, 82.9, 84.4, 82.85, 78.18, 77.16, 77.35, 80.99], 'YTD': [100, 106.78, 110.53, 108.61, 107.97, 112.09, 110.32, 111, 100.08, 101.8, 102.41, 95.16, 111.74, 122.29, 140.23, 151.77, 172.32, 170.89, 196.59, 199.02, 173.17, 184.47, 177.83, 177.63, 170.13, 163.25], '6M': [100, 100.05, 95.79, 101.97, 98.09, 98.7, 92.24, 90.02, 91.61, 90.78, 93.07, 102.54, 114.65, 124.69, 134.95, 144.81, 156.26, 159.4, 169.5, 158.06, 167.48, 179.22, 163.85, 147.94, 151.27, 145.15] } },
  ],
  'Broad Tech': [
    { t: 'WGMI', chosen: true, anchor: true, score: 62.6, ret6: 20.3, ret1: 104.9, corr: 0.59, reason: 'anchor', series: { '1W': [100, 98.9, 109.56, 116.65, 117.4], '1M': [100, 98.61, 92.75, 90.21, 91.32, 88.5, 87.62, 81.65, 73.9, 78.47, 76.59, 79.45, 77.1, 72.62, 72.56, 73.63, 66.82, 66.09, 73.21, 77.95, 78.45], 'YTD': [100, 117.64, 133.42, 133, 118.37, 108.81, 106.32, 104.21, 94.25, 105.7, 102.95, 90.99, 105.85, 121.71, 131.12, 125.92, 151.61, 145.15, 169.4, 184.78, 155.16, 188.4, 171.75, 137.52, 136.48, 147.56], '6M': [100, 103.86, 75.07, 85.45, 82.77, 84.98, 76.86, 81.56, 80.29, 74.98, 78.2, 95.16, 105.33, 105.73, 102.68, 123.63, 121.9, 131.96, 150.78, 140.1, 147.05, 151.25, 134.39, 117.47, 112.93, 120.33] } },
    { t: 'SGRT', chosen: true, anchor: false, score: 48.3, ret6: 26.5, ret1: 70, corr: 0.2, reason: 'diversifier', series: { '1W': [100, 95.77, 95.56, 96.35, 102.62], '1M': [100, 94.43, 94.33, 97.32, 93.68, 94.8, 97.58, 92.84, 87.56, 89.59, 86.03, 87.93, 91.23, 90.55, 87.22, 89.16, 86.18, 82.54, 82.36, 83.03, 88.44], 'YTD': [100, 101.94, 106.48, 106.44, 106.45, 108.56, 112.59, 116.47, 105.84, 107.86, 108.28, 102.4, 120.43, 123.35, 128.59, 129.67, 140.1, 140.34, 146.34, 151.42, 133.8, 147.06, 143.94, 137.66, 137.01, 135.9], '6M': [100, 100.78, 97.92, 103.87, 104.84, 108.45, 102.38, 100.92, 103.83, 98.16, 102.98, 114.71, 117.98, 119.73, 120.74, 126.51, 134.59, 129.45, 135.7, 127.87, 134.29, 143.08, 135.63, 123.08, 127.57, 126.54] } },
    { t: 'GTEK', chosen: true, anchor: false, score: 46.2, ret6: 36.5, ret1: 55.9, corr: 0.59, reason: 'diversifier', series: { '1W': [100, 96.97, 95.17, 94.94, 99.17], '1M': [100, 96.08, 95.62, 96.01, 95.26, 97.44, 100.45, 98.64, 95.21, 96.51, 92.65, 92.51, 95.05, 94.86, 90.7, 91.88, 90.69, 87.94, 86.31, 86.1, 89.94], 'YTD': [100, 103.18, 104.7, 106.43, 103.19, 106.83, 106.57, 110.48, 102.44, 101.72, 106.35, 98.58, 112.7, 118.01, 124.76, 130.91, 137.32, 132.98, 147.3, 154.1, 139.7, 149.66, 149.22, 151.17, 143.93, 140.88], '6M': [100, 106.05, 97.39, 103.9, 103.25, 107.03, 100.12, 98.67, 103.22, 99.39, 100.96, 108.48, 119.76, 120.87, 126.83, 131.21, 133.85, 132.57, 143.82, 137.34, 142.39, 151.76, 147.88, 140.6, 139.44, 136.48] } },
    { t: 'PTF', chosen: false, anchor: false, score: 44.5, ret6: 29.7, ret1: 59.2, corr: 0.65, reason: 'diverse', series: { '1W': [100, 99.14, 99.43, 109.49, 108.2], '1M': [100, 93.66, 91.54, 95.58, 91.1, 95.12, 98.52, 91.62, 81.97, 83.63, 81.12, 85.06, 83.65, 78.83, 81.76, 78.64, 73.08, 72.46, 72.67, 80.02, 79.08], 'YTD': [100, 106.47, 109.18, 112.39, 114.69, 118.04, 118.37, 120.33, 110.09, 117.17, 118.83, 112.86, 128.98, 136.93, 143.81, 148.93, 157.92, 149.98, 170.07, 177.58, 156.15, 179.33, 164.78, 141.35, 147.89, 143.04], '6M': [100, 104.22, 99.09, 104.93, 109.18, 109.08, 99.8, 103.09, 104.82, 101.8, 109.37, 119.87, 127.54, 132.09, 135.01, 143.15, 141.72, 146.23, 154.62, 147.57, 161.19, 153.58, 161.54, 133.02, 128.95, 129.66] } },
    { t: 'FDTX', chosen: false, anchor: false, score: 30, ret6: 27.8, ret1: 32.3, corr: 0.75, reason: 'diverse', series: { '1W': [100, 99.04, 99.4, 103.34, 102.27], '1M': [100, 95.25, 94.61, 96.55, 93.95, 97.42, 99.56, 96.72, 92.64, 94.51, 92.26, 94.61, 94.21, 91.4, 93.04, 90.97, 87.61, 86.77, 87.09, 90.54, 89.6], 'YTD': [100, 102.2, 100.24, 103.12, 96.05, 96.22, 94.59, 95.03, 93.71, 95.1, 93.91, 90.62, 97.36, 104.99, 109.03, 114.6, 121.74, 119.08, 129.8, 142.39, 127.27, 142.21, 134.1, 130.78, 132.8, 127.88], '6M': [100, 101.04, 91.44, 93.67, 95.62, 94.98, 93.66, 93.4, 92.1, 87.77, 93.35, 99.53, 107.7, 112.15, 114.55, 121.68, 121.01, 124.8, 137.75, 134.01, 141.19, 135.88, 142.04, 131.62, 129.78, 127.82] } },
    { t: 'FWD', chosen: false, anchor: false, score: 30, ret6: 15, ret1: 45, corr: 0.69, reason: 'diverse', series: { '1W': [100, 98.49, 98.41, 102, 101.39], '1M': [100, 95.12, 94.84, 97.31, 94.59, 96.94, 99.52, 96.02, 92.41, 94.16, 91.01, 93.13, 92.82, 89.61, 91.09, 89.96, 86.87, 85.56, 85.49, 88.61, 88.08], 'YTD': [100, 107.09, 108.98, 111.03, 108.2, 110.45, 110.76, 112.29, 104.58, 107.27, 105.88, 103.97, 112.62, 117.16, 119.87, 122.99, 128.78, 126.04, 135.26, 140.11, 126.82, 140.99, 134.84, 129.25, 129.85, 125.56], '6M': [100, 101.3, 94.6, 99.35, 102.22, 102.87, 95.81, 95.99, 94.79, 92.85, 97.6, 105.74, 108.86, 111.62, 112.67, 117.98, 116.71, 120.08, 126.02, 120.64, 127.35, 124.22, 129.96, 118.86, 117.49, 115.03] } },
    { t: 'SPMO', chosen: false, anchor: false, score: 29.4, ret6: 26.5, ret1: 32.2, corr: 0.55, reason: 'diverse', series: { '1W': [100, 99.04, 99.48, 103.04, 102.7], '1M': [100, 95.47, 95.13, 98.75, 95.39, 98.06, 99.93, 96.08, 93.3, 94.63, 93.14, 94.69, 95.11, 92.62, 94.56, 92.79, 89.87, 89.01, 89.4, 92.6, 92.29], 'YTD': [100, 100.6, 100.57, 100.24, 100.17, 101.06, 100.06, 100.13, 99.09, 98.35, 95.99, 93.96, 101.71, 106.22, 108.31, 112.66, 120.52, 118.52, 125.54, 129.98, 120.42, 134.01, 129.23, 125.23, 128.11, 125.04], '6M': [100, 102.19, 98.37, 100.28, 101.71, 101.3, 100.25, 98.51, 96.47, 93.53, 98.08, 105.64, 108.22, 111.51, 113.97, 121.93, 121.66, 122.89, 129.15, 125.39, 133.83, 130.86, 136.97, 127.67, 127.18, 126.5] } },
    { t: 'FCUS', chosen: false, anchor: false, score: 26.8, ret6: 4.6, ret1: 49, corr: 0.66, reason: 'diverse', series: { '1W': [100, 93.84, 94.93, 95.06, 101.44], '1M': [100, 96.23, 94.13, 96.57, 92.01, 93.86, 96.03, 92.31, 84.94, 87.1, 82.67, 84.36, 86.74, 85.55, 82.52, 85.21, 82.23, 77.17, 78.07, 78.17, 83.42], 'YTD': [100, 108.28, 115.26, 117.36, 120.72, 119.52, 122.73, 125.51, 107.87, 112.6, 115.97, 108.76, 120.48, 123.14, 127.49, 132, 138.98, 139.64, 144.61, 148.73, 134.89, 142.13, 136.9, 129.6, 126.78, 124.12], '6M': [100, 102.73, 96.94, 103.09, 103.47, 105.81, 96.6, 95.38, 100.86, 94.73, 99.27, 102.68, 104.78, 107.48, 111.29, 113.63, 120.55, 118.34, 119.96, 115.55, 120.68, 125.44, 117.74, 103.7, 106.89, 104.64] } },
    { t: 'FRWD', chosen: false, anchor: false, score: 26.6, ret6: 26.4, ret1: 26.9, corr: 0.09, reason: 'diverse', series: { '1W': [100, 96.19, 95.04, 95.67, 99.8], '1M': [100, 95.05, 94.74, 96.16, 93.74, 96.32, 98.65, 95.51, 92.57, 94.9, 92.15, 93.2, 94.92, 95.25, 92.33, 93.99, 92.6, 89.07, 88.01, 88.59, 92.41], 'YTD': [100, 100.4, 106.5, 95.49, 96.5, 98.35, 96.96, 94.03, 94.04, 93.4, 86.8, 95.1, 106, 108.23, 109.96, 116.13, 122.4, 121.01, 129.87, 133.73, 127.82, 138.36, 132.26, 126.53, 129.06, 126.9], '6M': [100, 106.07, 95.11, 97.92, 97.3, 97.02, 96.07, 94.07, 95.97, 89.84, 92.61, 101.04, 108.44, 109.34, 112.41, 119.21, 123.47, 122.88, 130.28, 123.6, 128.52, 136.77, 131.74, 126.03, 128.55, 126.39] } },
    { t: 'CNEQ', chosen: false, anchor: false, score: 22.1, ret6: 13.9, ret1: 30.4, corr: 0.63, reason: 'diverse', series: { '1W': [100, 98.57, 99.06, 101.63, 100.64], '1M': [100, 97.59, 97.27, 96.49, 96.42, 98.9, 100.63, 98.81, 96.78, 98.43, 96.93, 99.17, 98.93, 96.56, 97.12, 97.49, 94.79, 93.44, 93.9, 96.34, 95.4], 'YTD': [100, 102.36, 101.69, 101.8, 97.88, 98.23, 97.61, 95.52, 93.72, 95.46, 92.9, 90.52, 96.07, 104.48, 105.5, 106.84, 110.09, 111.86, 117.54, 119.72, 110.47, 121.67, 115.01, 114.78, 115.85, 113.8], '6M': [100, 101.05, 92.99, 95.61, 97.82, 95.58, 93.77, 93.42, 91.21, 87.86, 92.64, 100.61, 105.41, 107.07, 106.9, 110.16, 113.59, 116.47, 120.78, 114.41, 119.53, 116.47, 120.11, 115.69, 116.36, 113.87] } },
    { t: 'CBSE', chosen: false, anchor: false, score: 21.7, ret6: 13.2, ret1: 30.2, corr: 0.72, reason: 'diverse', series: { '1W': [100, 98.58, 98.06, 97.7, 99.11], '1M': [100, 96.61, 96.79, 98.19, 98.25, 99.2, 100.74, 98.06, 96.9, 97.31, 94.88, 94.44, 96.41, 95.79, 94.75, 95.84, 95.4, 94.04, 93.55, 93.21, 94.56], 'YTD': [100, 105.79, 110.62, 108.72, 107.14, 108.84, 109.68, 110.39, 103.36, 101.64, 104.67, 98.42, 107.17, 113.27, 117.83, 117.86, 122.13, 124.67, 128.53, 133.42, 121, 126.24, 129.51, 128.28, 126.34, 124.64], '6M': [100, 98.97, 95.49, 98.65, 99.63, 100.27, 96.23, 93.09, 95.77, 93.05, 92.42, 99.36, 105.12, 107.03, 107.06, 109.61, 115.43, 112.69, 115.8, 110.61, 114.96, 119.73, 118.77, 113.61, 114.76, 113.21] } },
    { t: 'BCTK', chosen: false, anchor: false, score: 19.8, ret6: 19, ret1: 20.5, corr: 0.18, reason: 'diverse', series: { '1W': [100, 96.88, 95.54, 95.78, 98.46], '1M': [100, 95.97, 95.99, 96.84, 95.68, 99.66, 102.76, 99.5, 96.65, 98.81, 95.81, 96.45, 98.56, 97.84, 94.94, 96.58, 95.54, 92.56, 91.28, 91.51, 94.07], 'YTD': [100, 100.78, 101.56, 100.7, 96.46, 98.04, 97.93, 98.97, 97.56, 96, 97.2, 88.43, 98.26, 104.7, 107.06, 108.6, 115.43, 116.11, 121.28, 128.43, 115.37, 124.17, 120.4, 124.34, 121.53, 118.37], '6M': [100, 103.04, 93.66, 99.09, 98.44, 99.48, 99.87, 97.22, 98.83, 93.41, 94.82, 99.34, 107.84, 107.61, 109.16, 114.35, 119.46, 118.37, 123.8, 118.24, 122.29, 126.49, 126.05, 121.18, 122.16, 118.98] } },
    { t: 'XMMO', chosen: false, anchor: false, score: 18.9, ret6: 13.5, ret1: 24.2, corr: 0.48, reason: 'diverse', series: { '1W': [100, 99.47, 98.9, 101.72, 102.34], '1M': [100, 97.58, 97.2, 98.45, 96.12, 96.32, 97.88, 95.5, 93.86, 94.82, 92.22, 93.47, 92.92, 91.29, 92.5, 92.44, 90.85, 90.37, 89.86, 92.41, 92.98], 'YTD': [100, 102.07, 103.39, 102.99, 103.06, 104.95, 106.98, 108.37, 104.04, 104, 104.83, 104.74, 111.06, 112.49, 114.96, 115.72, 119.56, 116.18, 122.35, 123.51, 116.4, 124.1, 120.66, 115.74, 116.12, 116.73], '6M': [100, 99.33, 99.56, 101.77, 104.87, 105.34, 101.14, 100.29, 99.63, 100.58, 103.56, 110.18, 111.53, 112.5, 112.48, 116.22, 115.04, 115.7, 116.79, 116.11, 120.26, 119.07, 119.45, 112.54, 112.81, 113.47] } },
    { t: 'MARS', chosen: false, anchor: false, score: 1, ret6: 1, ret1: 1, corr: 0.2, reason: 'diverse', series: { '1W': [100, 98.39, 96.65, 100.69, 100.97], '1M': [100, 97.79, 93.15, 90.07, 91.34, 100.65, 104.83, 101.52, 101.75, 100.88, 93.19, 92.6, 90.59, 86.57, 87.15, 85.2, 80.47, 79.17, 77.77, 81.02, 81.25], 'YTD': [100, 101.98, 106.46, 103.47, 105.45, 107.38, 120.34, 123.37, 132.16, 128.01, 117.68, 121.99, 143.79, 152.3, 156.58, 180.51, 159, 140.31, 146.89, 135.63, 115.86, 130.39, 117.03, 112.67, 100.08, 101.05], '6M': [100, 101.98, 106.46, 103.47, 105.45, 107.38, 120.34, 123.37, 132.16, 128.01, 117.68, 121.99, 143.79, 152.3, 156.58, 180.51, 159, 140.31, 146.89, 135.63, 115.86, 130.39, 117.03, 112.67, 100.08, 101.05] } },
    { t: 'ARKK', chosen: false, anchor: false, score: -2.5, ret6: -6.1, ret1: 1, corr: 0.58, reason: 'diverse', series: { '1W': [100, 98.08, 97.76, 101.34, 100.67], '1M': [100, 97.77, 97.82, 97.59, 99.62, 102.81, 103.05, 104.36, 103.6, 106.6, 102.21, 103.95, 102.31, 99.76, 101.39, 101.49, 97.76, 95.88, 95.56, 99.06, 98.41], 'YTD': [100, 104.38, 106.19, 103.71, 95.48, 92.13, 93.92, 94.79, 94.12, 93.67, 92.2, 87.87, 91.47, 100.55, 99.45, 100, 102.86, 96.87, 100.4, 101.61, 94.92, 104.25, 101.57, 105.55, 103.38, 100.34], '6M': [100, 94.42, 80.66, 83.24, 86.94, 88.67, 88.05, 85.43, 84.09, 78.6, 83.67, 87.51, 96.46, 93.03, 93.54, 96.22, 91.09, 92.91, 98.82, 92.28, 96.84, 93.25, 98.29, 97.48, 96.8, 93.86] } },
    { t: 'WCLD', chosen: false, anchor: false, score: -3.4, ret6: 1.9, ret1: -8.7, corr: 0.26, reason: 'diverse', series: { '1W': [100, 99.8, 100.03, 96.7, 94.78], '1M': [100, 101.21, 101.9, 100.14, 106.12, 109.02, 110.77, 114.69, 115.83, 117.9, 116.66, 119.29, 117, 119.53, 120.89, 119.87, 120.46, 120.22, 120.49, 116.49, 114.17], 'YTD': [100, 98.97, 91.6, 92.72, 80.41, 78.81, 79.52, 77.92, 84.96, 80.69, 81.46, 78.03, 76.78, 77.21, 75.38, 82.35, 85, 84.23, 86.12, 94.49, 88, 84.4, 87.72, 98.37, 99.93, 94.37], '6M': [100, 94.17, 83.15, 84.74, 84.12, 84.12, 91.72, 87.2, 86.22, 80.79, 85.58, 78.32, 85.55, 83.66, 88.9, 91.77, 88.26, 93.15, 110.85, 98.13, 95.13, 90.32, 98.85, 104.1, 106.97, 101.88] } },
    { t: 'IGV', chosen: false, anchor: false, score: -12.4, ret6: -6.6, ret1: -18.3, corr: 0.42, reason: 'diverse', series: { '1W': [100, 99.04, 99.23, 97.99, 96.64], '1M': [100, 100.01, 98.69, 97.08, 101.02, 102.95, 103.77, 106.91, 107.17, 108.57, 105.92, 107.52, 105.84, 106.17, 107.24, 107.59, 107.32, 106.29, 106.49, 105.17, 103.72], 'YTD': [100, 99.35, 93.02, 92.5, 80.79, 78.75, 77.38, 77.18, 83.23, 80.38, 79.89, 75.74, 75.46, 79.82, 79.07, 81.97, 86.24, 87.87, 88.99, 94.81, 86.65, 84.29, 83.45, 89.06, 88.59, 85.68], '6M': [100, 95.18, 82.18, 83.52, 83.33, 84.14, 90.75, 86.85, 85.61, 79.32, 83, 81.18, 89.02, 87.89, 89.36, 94.03, 94.68, 96.98, 111.1, 98.67, 95.61, 90.08, 93.46, 95.4, 96.91, 93.41] } },
  ],
  'Electrification': [
    { t: 'VOLT', chosen: true, anchor: true, score: 32.6, ret6: 21.5, ret1: 43.8, corr: 0.52, reason: 'anchor', series: { '1W': [100, 100.03, 99.36, 101.75, 101.38], '1M': [100, 96.5, 97.19, 99.38, 95.93, 96.96, 99.62, 96.03, 93.15, 94.24, 91.2, 92.29, 92.49, 90.87, 92.41, 91.7, 89.66, 89.68, 89.08, 91.22, 90.89], 'YTD': [100, 102.86, 108.84, 111.36, 114.4, 121.66, 121.94, 123.46, 115.06, 118.82, 118.79, 118.38, 126.91, 130.13, 136.42, 140.71, 139.46, 133.03, 139.26, 137.23, 129.4, 142.23, 139.46, 132.96, 134.35, 132.13], '6M': [100, 103.77, 103.84, 110.86, 112.9, 113.53, 105.81, 107.75, 106.79, 108.03, 110.77, 119.77, 122.21, 125.39, 129.4, 128.25, 126.25, 125.87, 122.4, 122.6, 127.94, 129.02, 133.18, 121.93, 122.6, 121.51] } },
    { t: 'POW', chosen: true, anchor: false, score: 30.2, ret6: 25.6, ret1: 34.7, corr: -0.11, reason: 'diversifier', series: { '1W': [100, 96.32, 97.65, 95.89, 98.52], '1M': [100, 95.38, 95.13, 95.82, 92.46, 95.35, 97.42, 94, 90.91, 91.29, 86.92, 86.95, 88.02, 89.12, 85.92, 87.55, 87.11, 83.9, 85.07, 83.53, 85.82], 'YTD': [100, 102.18, 110.41, 112.09, 117.22, 121.09, 124.03, 130.9, 118.29, 121.4, 126.63, 119.43, 133.18, 137.84, 148.64, 160.13, 167.5, 156.11, 164.45, 159.01, 145.64, 157.03, 149.5, 147.62, 141.57, 138.78], '6M': [100, 104.37, 105.82, 112.7, 112.29, 118.5, 109.8, 109.24, 114.63, 111.45, 112.63, 123.93, 128.64, 134.56, 144.96, 148.46, 147.45, 142.11, 143.81, 133.41, 137.85, 146.39, 139.58, 127.24, 128.16, 125.63] } },
    { t: 'PBD', chosen: true, anchor: false, score: 17.2, ret6: 3.6, ret1: 30.8, corr: 0.52, reason: 'diversifier', series: { '1W': [100, 97.59, 97.27, 96.09, 97.59], '1M': [100, 95.65, 94.32, 93.98, 92.27, 94.03, 95.89, 94.47, 93.15, 95.4, 91.44, 90.66, 91.1, 91.14, 89.24, 90.51, 91.29, 89.09, 88.8, 87.72, 89.09], 'YTD': [100, 103.61, 108.46, 112.25, 111.13, 112.69, 113.25, 115.67, 107.46, 108.71, 110.82, 107.9, 115.73, 121.33, 124.5, 130.16, 136.07, 132.03, 139.37, 139.68, 121.83, 124.94, 117.29, 121.27, 115.05, 113.25], '6M': [100, 104.1, 102.16, 104.04, 103.58, 105.8, 98.52, 100.23, 101.59, 100.51, 102.45, 107.34, 112.8, 113.88, 119.06, 122.13, 123.72, 121.33, 126.22, 118.03, 116.04, 116.27, 109.33, 106.31, 105.23, 103.58] } },
    { t: 'PBW', chosen: false, anchor: false, score: 16.3, ret6: -5.4, ret1: 38, corr: 0.74, reason: 'diverse', series: { '1W': [100, 99.88, 99.34, 102.42, 102.45], '1M': [100, 94.42, 91.65, 90.9, 89.4, 92.43, 94.64, 92.48, 88.74, 91.02, 85.23, 86.56, 85.44, 82.48, 84.86, 84.72, 81.1, 81, 80.57, 83.07, 83.09], 'YTD': [100, 109.43, 115.62, 117.22, 113.72, 113, 109.89, 106.12, 101.05, 106.84, 103.6, 103.41, 106.48, 115.88, 121.94, 126.72, 132.45, 128.29, 146.23, 148.49, 123.28, 136.02, 120.66, 115.59, 114.54, 112.15], '6M': [100, 98.12, 88.18, 90.89, 92.27, 89.48, 85.2, 88.93, 85.2, 85.84, 87.85, 92.3, 100.58, 102.51, 106.85, 111.68, 114.14, 118.75, 125.18, 113, 112.76, 107.45, 107.7, 96.99, 96.41, 94.56] } },
    { t: 'IVEP', chosen: false, anchor: false, score: 0.7, ret6: 0.7, ret1: 0.7, corr: 0.14, reason: 'diverse', series: { '1W': [100, 97.2, 96.9, 97.01, 99.39], '1M': [100, 95.9, 96.03, 96.75, 93.71, 94.29, 95.59, 92.34, 91.32, 92.99, 90.7, 90.46, 91.56, 91.79, 90.32, 91.45, 90.36, 87.83, 87.56, 87.66, 89.81], 'YTD': [100, 102.76, 104.18, 103.91, 107.78, 105.63, 110.23, 112.07, 110.92, 110.73, 105.1, 108.24, 108.66, 105.56, 108.51, 103.14, 103.03, 106.74, 112.07, 108.43, 107.13, 104.21, 101.38, 101.23, 98.43, 100.65], '6M': [100, 102.76, 104.18, 103.91, 107.78, 105.63, 110.23, 112.07, 110.92, 110.73, 105.1, 108.24, 108.66, 105.56, 108.51, 103.14, 103.03, 106.74, 112.07, 108.43, 107.13, 104.21, 101.38, 101.23, 98.43, 100.65] } },
  ],
  'Industrials': [
    { t: 'PRN', chosen: true, anchor: true, score: 30.6, ret6: 16.5, ret1: 44.6, corr: 0.48, reason: 'anchor', series: { '1W': [100, 100.06, 100.29, 104.03, 103.61], '1M': [100, 96.43, 96.04, 98.15, 94.95, 97.26, 99.27, 95.21, 89.53, 90.57, 86.47, 88.3, 87.71, 85.45, 87.19, 86.78, 84.09, 84.14, 84.34, 87.48, 87.13], 'YTD': [100, 106.03, 113.24, 113.35, 113.68, 117.76, 120.81, 119.01, 110.89, 111.75, 113.72, 111.43, 121.77, 124.46, 130.44, 133.34, 137.22, 132.85, 141.02, 141.8, 130.41, 146.25, 142.84, 130.36, 131.17, 131.07], '6M': [100, 100.22, 97.44, 103.09, 109.05, 105.76, 98.55, 96.99, 98.1, 98.41, 101.8, 111.58, 113.93, 115.85, 118.49, 121.94, 122.21, 120.52, 122.38, 120.35, 127.25, 128.92, 132.71, 115.61, 116.01, 116.48] } },
    { t: 'AIRR', chosen: false, anchor: false, score: 26.7, ret6: 7.2, ret1: 46.1, corr: 0.89, reason: 'correlated', series: { '1W': [100, 99.07, 98.32, 100.72, 100.38], '1M': [100, 97.2, 97.92, 99.75, 97.33, 98.75, 100, 97.08, 94.49, 95.29, 91.98, 93.32, 92.77, 91.14, 92.54, 92.48, 91.75, 90.9, 90.21, 92.41, 92.1], 'YTD': [100, 109.44, 115.48, 115.23, 117.4, 122.41, 122.72, 120.21, 112.3, 112.42, 112.34, 112.67, 121.2, 122.45, 127.57, 129.43, 131.83, 127.13, 130.49, 131.69, 124.87, 133.14, 131.91, 124.97, 125.42, 124.82], '6M': [100, 98.4, 99.16, 102.46, 106.54, 103.27, 96.47, 94.85, 94.1, 95.91, 99.26, 106.46, 108.24, 108.44, 111.19, 113.25, 111.63, 109.27, 111.39, 111.96, 113.91, 113.17, 116.43, 107.09, 107.67, 107.23] } },
    { t: 'BILT', chosen: true, anchor: false, score: 9.8, ret6: 6.9, ret1: 12.7, corr: 0.21, reason: 'diversifier', series: { '1W': [100, 100.56, 100.18, 99.7, 99.47], '1M': [100, 100.43, 100.87, 101.64, 102.15, 101.75, 100.52, 100.56, 102.24, 101.78, 102.49, 101.92, 101.74, 102.19, 102.6, 102.74, 102.1, 102.67, 102.28, 101.79, 101.56], 'YTD': [100, 100.31, 102.35, 103.24, 105.33, 109.04, 111.73, 114.01, 112.04, 111.49, 108.88, 110.09, 113.76, 112.28, 112.89, 114.59, 112.06, 110.61, 114, 111.88, 112.39, 107.31, 110.13, 109.72, 110.76, 109.49], '6M': [100, 101.67, 103.77, 107.56, 109.14, 111.37, 109.94, 108.42, 107.82, 106.75, 109.51, 111.52, 110.25, 110.27, 111.93, 109.97, 109.98, 110.8, 109.97, 110.19, 111.18, 105.31, 107.15, 107.93, 108.19, 106.95] } },
    { t: 'IDEF', chosen: true, anchor: false, score: -0.2, ret6: -10.6, ret1: 10.2, corr: 0.48, reason: 'diversifier', series: { '1W': [100, 99.94, 99.45, 100.55, 101.59], '1M': [100, 99.4, 98.17, 97.73, 97.7, 98.74, 100.25, 101.17, 104.07, 105.96, 101.83, 101.29, 100.85, 99.09, 99.37, 99.53, 98.14, 98.08, 97.6, 98.68, 99.7], 'YTD': [100, 112.5, 116.82, 116.26, 113.93, 112.14, 116.07, 116.43, 115.83, 114.61, 110.75, 106.2, 113.31, 112.79, 109.12, 108.25, 107.89, 104.45, 109.25, 104.74, 101.79, 104.9, 100.53, 106.53, 102.24, 102.58], '6M': [100, 99.45, 94.26, 96.67, 101.7, 101.43, 100.91, 97.92, 95.55, 90.94, 96.9, 98.19, 98.57, 93.7, 94.3, 93.99, 90.03, 92.8, 94.33, 90.34, 92.24, 89.1, 89.86, 91.28, 89.21, 89.37] } },
  ],
  'Meme': [
    { t: 'BUZZ', chosen: true, anchor: true, score: 5.7, ret6: 2, ret1: 9.3, corr: 0.17, reason: 'anchor', series: { '1W': [100, 96.29, 95.33, 96.18, 99.66], '1M': [100, 97.49, 95.49, 94.05, 95.06, 97.65, 98.59, 98.24, 96.93, 98.4, 95.46, 95.76, 97.2, 96.53, 94.4, 94.82, 94.24, 90.74, 89.83, 90.64, 93.92], 'YTD': [100, 105.57, 108.62, 105.51, 100.92, 97.32, 94.74, 96.34, 94.88, 94.21, 92.83, 83.78, 92.4, 102.28, 104.43, 103.91, 114.5, 112.5, 118.65, 125.18, 109.57, 114.34, 109.66, 113.51, 109.39, 108.34], '6M': [100, 101.48, 90.84, 90.35, 89.22, 90.72, 91.54, 89.1, 89.01, 83.45, 84.49, 87.36, 98.75, 98.35, 97.86, 104.64, 109.3, 108.49, 117.51, 106.84, 106.61, 108.64, 106.09, 103.71, 103.01, 102.03] } },
    { t: 'RKNG', chosen: true, anchor: false, score: -7.3, ret6: -7.3, ret1: -7.3, corr: -0.08, reason: 'diversifier', series: { '1W': [100, 99.82, 101.37, 109.64, 107.6], '1M': [100, 94.9, 91.75, 92.61, 89.84, 93.23, 95.67, 90.81, 84.49, 86.64, 83.24, 86.23, 84.22, 80.09, 82.03, 79.85, 73.64, 73.5, 74.65, 80.73, 79.23], 'YTD': [100, 95.76, 77.78, 79.73, 80.08, 78.38, 74.83, 77.12, 75.82, 70.91, 75.79, 85.15, 93.98, 94.83, 98.64, 102.81, 102.89, 109.45, 115.52, 106.65, 114.46, 111.08, 111.99, 97.44, 93.47, 92.74], '6M': [100, 95.76, 77.78, 79.73, 80.08, 78.38, 74.83, 77.12, 75.82, 70.91, 75.79, 85.15, 93.98, 94.83, 98.64, 102.81, 102.89, 109.45, 115.52, 106.65, 114.46, 111.08, 111.99, 97.44, 93.47, 92.74] } },
    { t: 'MEME', chosen: true, anchor: false, score: -12.4, ret6: -3.3, ret1: -21.5, corr: 0.17, reason: 'diversifier', series: { '1W': [100, 100.58, 102.04, 112.58, 112.32], '1M': [100, 93.75, 89.33, 88.37, 84.52, 90.19, 92.6, 87.21, 80.67, 81.92, 77.88, 80.87, 79.81, 75, 76.06, 72.88, 65.96, 66.35, 67.31, 74.26, 74.09], 'YTD': [100, 124.19, 131.94, 126.77, 120.48, 111.61, 112.42, 106.13, 98.23, 111.13, 110.32, 99.68, 113.06, 142.58, 135.48, 140.65, 153.71, 150.32, 182.58, 179.03, 151.13, 166.77, 141.77, 127.74, 127.58, 124.27], '6M': [100, 94.6, 76.79, 81.93, 83.94, 82.56, 76.41, 83.31, 84.19, 78.17, 80.61, 99.62, 114.93, 103.64, 109.41, 119.57, 124.22, 136.51, 140.78, 126.6, 130.87, 122.33, 120.83, 101.63, 95.11, 96.68] } },
  ],
};
// @@END_GENERATED:THEME_UNIVERSE@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 9, avgWeight: 7.16, proScore: 6.45, coverage: 0.9,
      price: 206.86, weeklyPrices: [207.40, 202.81, 203.28, 207.29, 206.86], weeklyChange: -0.26, dayChange: -0.21, sortRank: 0, periodReturns: { '1M': -0.9, 'YTD': 10.9, '6M': 11.9, '1Y': 23.8 },
      priceHistory: { '1D': [207.29, 205.7, 206.86], '1W': [207.4, 202.81, 203.28, 207.29, 206.86], '1M': [208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 204.12, 202.78, 210.96, 203.53, 211.8, 212.5, 207.4, 202.81, 203.28, 207.29, 206.86], 'YTD': [186.5, 184.86, 186.23, 188.52, 180.34, 190.05, 187.9, 177.19, 177.82, 183.22, 175.64, 174.4, 182.08, 198.35, 199.64, 198.45, 215.2, 222.32, 214.86, 214.75, 200.42, 210.69, 192.53, 196.93, 211.8, 206.86], '6M': [184.84, 192.51, 171.88, 186.94, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 208.27, 198.45, 215.2, 225.32, 215.33, 224.36, 208.64, 212.45, 200.04, 200.09, 204.12, 212.5, 206.86], '1Y': [167.03, 175.51, 178.26, 183.16, 175.64, 181.77, 170.62, 170.76, 174.88, 178.43, 186.58, 185.04, 180.03, 181.16, 201.03, 198.69, 193.16, 181.36, 177.82, 179.59, 184.97, 177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 222.32, 214.86, 222.82, 208.64, 212.45, 200.04, 200.09, 204.12, 212.5, 206.86] },
      velocityScore: { '1D': -1.5, '1W': 1.6, '1M': 7.3, '6M': null }, isNew: false,
      marketCap: '$5.0T', pe: 31.7, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.48,
      etfPresence: { AIS: 2.81, ARTY: 5.02, BAI: 4.73, IGPT: 8.3, IVES: 5.01, ALAI: 13.21, CHAT: 7.68, AIFD: 6.85, SPRX: false, AOTG: 10.84 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.84, proScore: 5.26, coverage: 0.9,
      price: 543.13, weeklyPrices: [500.94, 495.76, 503.57, 544.43, 543.13], weeklyChange: 8.42, dayChange: -0.24, sortRank: 0, periodReturns: { '1M': -1.5, 'YTD': 153.6, '6M': 114.1, '1Y': 251 },
      priceHistory: { '1D': [544.43, 537.21, 543.13], '1W': [500.94, 495.76, 503.57, 544.43, 543.13], '1M': [551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 517.41, 546.72, 557.89, 534.39, 548.13, 529.14, 500.94, 495.76, 503.57, 544.43, 543.13], 'YTD': [214.16, 203.17, 231.83, 252.03, 242.11, 213.58, 203.37, 200.21, 192.43, 196.58, 202.68, 203.43, 231.82, 278.26, 305.33, 360.54, 455.19, 420.99, 503.89, 542.52, 452.4, 537.37, 521.58, 516.11, 548.13, 543.13], '6M': [253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 347.81, 360.54, 455.19, 424.1, 467.51, 510.13, 490.33, 547.26, 519.85, 580.91, 517.41, 529.14, 543.13], '1Y': [154.72, 177.44, 174.31, 174.95, 166.55, 166.62, 162.13, 155.82, 160.46, 160.9, 161.79, 211.51, 218.09, 238.03, 258.01, 250.05, 237.52, 230.29, 206.13, 217.6, 221.62, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 503.89, 521.54, 490.33, 547.26, 519.85, 580.91, 517.41, 529.14, 543.13] },
      velocityScore: { '1D': 2.5, '1W': 0, '1M': 9.8, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 181.6, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 5.59, ARTY: 5.45, BAI: 5.5, IGPT: 9.15, IVES: 4.92, ALAI: 1.4, CHAT: 4.2, AIFD: false, SPRX: 0.64, AOTG: 15.74 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 5.66, proScore: 5.1, coverage: 0.9,
      price: 954.15, weeklyPrices: [853.20, 848.95, 865.46, 970.82, 954.15], weeklyChange: 11.83, dayChange: -1.72, sortRank: 0, periodReturns: { '1M': -21.2, 'YTD': 234.3, '6M': 140, '1Y': 773.6 },
      priceHistory: { '1D': [970.82, 946.62, 954.15], '1W': [853.2, 848.95, 865.46, 970.82, 954.15], '1M': [1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 948.8, 991.64, 979.3, 937, 983.12, 904.28, 853.2, 848.95, 865.46, 970.82, 954.15], 'YTD': [285.41, 345.09, 362.75, 410.24, 419.44, 410.34, 417.35, 412.37, 370.3, 441.8, 404.35, 337.84, 406.73, 457.23, 481.72, 542.21, 746.81, 681.54, 895.88, 1079.57, 891.88, 1133.99, 1132.33, 938.38, 983.12, 954.15], '6M': [397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 496.72, 542.21, 746.81, 724.66, 751, 1035.5, 949.28, 1087.99, 1051.77, 1154.29, 948.8, 904.28, 954.15], '1Y': [109.22, 111.96, 109.06, 127.75, 122.05, 116.5, 118.72, 135.24, 158.82, 166.41, 167.32, 185.69, 187.06, 202.29, 221.91, 218.03, 241.11, 228.5, 224.53, 234.16, 252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1, 949.28, 1087.99, 1051.77, 1154.29, 948.8, 904.28, 954.15] },
      velocityScore: { '1D': 5.4, '1W': -1.5, '1M': -16, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 21.6, revenueGrowth: 346, eps: 44.27, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { AIS: 7.17, ARTY: 5.03, BAI: 6.47, IGPT: 8, IVES: 4.62, ALAI: 1.16, CHAT: 3.75, AIFD: 5.95, SPRX: false, AOTG: 8.83 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.88, proScore: 3.11, coverage: 0.8,
      price: 384.33, weeklyPrices: [374.45, 370.83, 378.16, 386.50, 384.33], weeklyChange: 2.64, dayChange: -0.56, sortRank: 0, periodReturns: { '1M': -2, 'YTD': 11, '6M': 18.1, '1Y': 38 },
      priceHistory: { '1D': [386.5, 381.31, 384.33], '1W': [374.45, 370.83, 378.16, 386.5, 384.33], '1M': [392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 388.69, 401.11, 399.97, 384.05, 389.11, 394.28, 374.45, 370.83, 378.16, 386.5, 384.33], 'YTD': [346.1, 344.97, 351.71, 332.79, 320.33, 342.76, 333.99, 319.55, 330.48, 324.92, 322.51, 309.51, 350.63, 398.47, 419.94, 421.28, 430, 420.71, 422.01, 479.23, 372.1, 411.35, 365.02, 370.78, 389.11, 384.33], '6M': [325.49, 330.73, 310.51, 331.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 422.76, 421.28, 430, 425.19, 414.14, 459.97, 396.6, 393.94, 380.15, 377.75, 388.69, 394.28, 384.33], '1Y': [278.59, 297.42, 292.93, 312.83, 294.91, 298.01, 302.39, 336.67, 360, 338.94, 329.91, 336.41, 344.13, 342.66, 372.97, 351.94, 351.96, 340.5, 385.03, 380.61, 406.29, 341.3, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 420.71, 422.01, 481.57, 396.6, 393.94, 380.15, 377.75, 388.69, 394.28, 384.33] },
      velocityScore: { '1D': 1, '1W': 1.3, '1M': 7.6, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 64.2, revenueGrowth: 48, eps: 5.99, grossMargin: 76, dividendYield: 0.67,
      etfPresence: { AIS: 0.75, ARTY: 4.83, BAI: 4.7, IGPT: false, IVES: 4.81, ALAI: 4.08, CHAT: 4.86, AIFD: 5.57, SPRX: false, AOTG: 1.48 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 7, avgWeight: 2.36, proScore: 1.65, coverage: 0.7,
      price: 174.16, weeklyPrices: [168.56, 168.61, 169.35, 174.58, 174.16], weeklyChange: 3.32, dayChange: -0.25, sortRank: 0, periodReturns: { '1M': -0.2, 'YTD': 32.9, '6M': 25.8, '1Y': 58.6 },
      priceHistory: { '1D': [174.6, 172.21, 174.16], '1W': [168.56, 168.61, 169.35, 174.58, 174.16], '1M': [174.56, 162.2, 161.74, 165.45, 157.6, 164.1, 169.88, 166.62, 159.99, 173.28, 181.05, 184.69, 186.96, 181.15, 182.57, 171.92, 168.56, 168.61, 169.35, 174.58, 174.16], 'YTD': [131.03, 122.89, 129.83, 146.69, 139.39, 140.66, 137.23, 133.5, 132.89, 135.35, 135.88, 122.78, 145.07, 161.01, 172.55, 172.7, 141.77, 141.71, 158.01, 174.37, 151.76, 169.67, 157.6, 166.46, 182.57, 174.16], '6M': [138.41, 148.15, 128.67, 135.12, 132.79, 133.5, 132.89, 133.57, 131.22, 120.77, 126.25, 152.02, 166.85, 176.91, 172.7, 141.77, 141.97, 154.03, 170.68, 156.4, 169.09, 162.2, 169.88, 181.05, 171.92, 174.16], '1Y': [109.78, 118.62, 118.12, 141.25, 132.78, 134.27, 137.38, 141.91, 142.16, 144.09, 145.71, 145.29, 138.79, 145.94, 156.77, 153.55, 134.93, 123.45, 125.04, 127.8, 130.04, 126.13, 131.32, 131.03, 123.72, 130.59, 136.34, 141.74, 137.49, 141.59, 127.43, 129.3, 132.89, 133.57, 131.22, 120.77, 126.25, 152.02, 166.85, 172.47, 172.62, 136.43, 141.71, 158.01, 175.33, 156.4, 169.09, 162.2, 169.88, 181.05, 171.92, 174.16] },
      velocityScore: { '1D': -0.6, '1W': 0.6, '1M': 20.4, '6M': null }, isNew: false,
      marketCap: '$219B', pe: 59.6, revenueGrowth: 35, eps: 2.92, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.71, ARTY: 2.77, BAI: 1.54, IGPT: false, IVES: false, ALAI: 0.4, CHAT: 2.4, AIFD: 5.47, SPRX: 2.22, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 7 of 10 AI & ML ETFs (70% coverage) with average weight 2.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 5.13, proScore: 3.08, coverage: 0.6,
      price: 347.17, weeklyPrices: [354.46, 346.77, 351.99, 347.15, 347.17], weeklyChange: -2.06, dayChange: 0.01, sortRank: 0, periodReturns: { '1M': -0.7, 'YTD': 10.9, '6M': 5, '1Y': 81.4 },
      priceHistory: { '1D': [347.15, 347.74, 347.17], '1W': [354.46, 346.77, 351.99, 347.15, 347.17], '1M': [349.68, 346.13, 345.29, 343.71, 337.39, 353.65, 357.37, 361.21, 359.91, 366.46, 361.92, 358.89, 357.18, 352.51, 359.51, 370.92, 354.46, 346.77, 351.99, 347.15, 347.17], 'YTD': [313, 328.57, 330, 334.55, 339.71, 310.96, 302.85, 311.76, 298.52, 305.56, 302.06, 287.56, 317.32, 336.02, 338.89, 385.69, 400.8, 396.94, 388.88, 358.99, 356.38, 368.03, 337.39, 367.03, 359.51, 347.17], '6M': [330.54, 338.25, 331.25, 309, 314.98, 311.76, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 344.4, 385.69, 400.8, 396.78, 382.97, 376.37, 363.31, 369.35, 346.13, 357.37, 361.92, 370.92, 347.17], '1Y': [191.34, 195.75, 194.67, 203.34, 201.57, 207.14, 230.66, 239.63, 251.16, 251.66, 243.1, 245.76, 245.45, 250.46, 267.47, 277.54, 291.31, 284.28, 323.44, 319.63, 317.08, 306.57, 314.35, 313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 311.49, 306.52, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 383.25, 388.64, 396.94, 388.88, 361.85, 363.31, 369.35, 346.13, 357.37, 361.92, 370.92, 347.17] },
      velocityScore: { '1D': -3.7, '1W': 0, '1M': 12.8, '6M': null }, isNew: false,
      marketCap: '$4.2T', pe: 26.5, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.33, IGPT: 7.96, IVES: 4.61, ALAI: false, CHAT: 5.63, AIFD: 5.2, SPRX: false, AOTG: 4.04 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 6, avgWeight: 4.76, proScore: 2.86, coverage: 0.6,
      price: 418, weeklyPrices: [409.74, 398.37, 402.30, 424.61, 418.00], weeklyChange: 2.02, dayChange: -1.52, sortRank: 0, periodReturns: { '1M': -10.6, 'YTD': 37.5, '6M': 27.7, '1Y': 78.2 },
      priceHistory: { '1D': [424.44, 416.89, 418], '1W': [409.74, 398.37, 402.3, 424.61, 418], '1M': [467.67, 436.39, 440.83, 434.99, 432.35, 455.1, 477.57, 444.23, 434.16, 451.79, 436.98, 436.96, 434.11, 421.58, 420.39, 419.48, 409.74, 398.37, 402.3, 424.61, 418], 'YTD': [303.89, 323.63, 342.4, 338.34, 335.75, 374.09, 360.39, 374.58, 338.89, 340.23, 338.45, 337.95, 365.9, 363.35, 382.66, 397.67, 411.68, 395.95, 412.32, 436.69, 408.75, 462.12, 432.35, 432.57, 420.39, 418], '6M': [327.37, 339.55, 330.73, 368.1, 370.54, 374.58, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 402.46, 397.67, 411.68, 404.35, 404.52, 435.63, 426.8, 441.4, 436.39, 477.57, 436.98, 419.48, 418], '1Y': [234.6, 241.33, 232.47, 244.29, 232.7, 238.72, 231.39, 250.92, 262.06, 282.71, 279.29, 294.03, 295.94, 294.51, 301.53, 294.05, 291.17, 277.91, 284.68, 295.45, 303.41, 286.87, 296.95, 303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.04, 369.11, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 401.61, 404.54, 395.95, 412.32, 446.69, 426.8, 441.4, 436.39, 477.57, 436.98, 419.48, 418] },
      velocityScore: { '1D': 1.1, '1W': 1.4, '1M': -2.4, '6M': null }, isNew: false,
      marketCap: '$2.2T', pe: 36.3, revenueGrowth: 36, eps: 11.51, grossMargin: 64, dividendYield: 0.89,
      etfPresence: { AIS: 3.54, ARTY: false, BAI: 4.68, IGPT: false, IVES: 4.8, ALAI: 5.27, CHAT: false, AIFD: 3.29, SPRX: false, AOTG: 7 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 6, avgWeight: 4.67, proScore: 2.8, coverage: 0.6,
      price: 637.12, weeklyPrices: [664.54, 646.01, 645.85, 643.81, 637.12], weeklyChange: -4.13, dayChange: -1.04, sortRank: 0, periodReturns: { '1M': 13, 'YTD': -3.5, '6M': -1.6, '1Y': -9.6 },
      priceHistory: { '1D': [643.81, 642.47, 637.12], '1W': [664.54, 646.01, 645.85, 643.81, 637.12], '1M': [563.85, 562.2, 557.67, 542.87, 550.25, 562.6, 563.29, 612.91, 582.9, 600.29, 603.12, 631.48, 669.21, 656.73, 661.04, 681.31, 664.54, 646.01, 645.85, 643.81, 637.12], 'YTD': [660.09, 653.06, 620.25, 672.97, 691.7, 668.69, 644.78, 648.18, 644.86, 627.45, 604.06, 572.13, 612.42, 676.87, 659.15, 608.75, 609.63, 611.21, 612.34, 622.98, 570.98, 577.22, 550.25, 615.58, 661.04, 637.12], '6M': [647.63, 738.31, 670.21, 649.81, 655.66, 648.18, 644.86, 613.71, 593.66, 525.72, 573.02, 634.53, 670.91, 675.03, 608.75, 609.63, 614.23, 610.26, 600.47, 585.39, 593.48, 562.2, 563.29, 603.12, 681.31, 637.12], '1Y': [704.81, 700, 763.46, 790, 751.48, 754.1, 737.05, 765.7, 779, 755.4, 734.38, 713.08, 708.65, 733.27, 751.44, 627.32, 627.08, 597.69, 636.22, 639.6, 656.96, 657.15, 664.94, 660.09, 646.06, 620.8, 658.76, 716.5, 661.46, 639.77, 637.25, 653.56, 644.86, 613.71, 593.66, 525.72, 573.02, 634.53, 670.91, 678.62, 610.41, 598.86, 611.21, 612.34, 597.63, 585.39, 593.48, 562.2, 563.29, 603.12, 681.31, 637.12] },
      velocityScore: { '1D': -3.1, '1W': 22.3, '1M': 80.6, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: 23.2, revenueGrowth: 33, eps: 27.49, grossMargin: 82, dividendYield: 0.33,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 9.29, IVES: 5.32, ALAI: 4.56, CHAT: 2.47, AIFD: false, SPRX: 5.08, AOTG: 1.32 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 6, avgWeight: 2.82, proScore: 1.69, coverage: 0.6,
      price: 206.2, weeklyPrices: [188.30, 188.68, 194.94, 207.96, 206.20], weeklyChange: 9.51, dayChange: -0.85, sortRank: 0, periodReturns: { '1M': -33, 'YTD': 142.6, '6M': 148.1, '1Y': 186.4 },
      priceHistory: { '1D': [207.96, 204.3, 206.2], '1W': [188.3, 188.68, 194.94, 207.96, 206.2], '1M': [307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 245.29, 249.27, 231.71, 243.27, 235.81, 217.53, 222.44, 206.26, 188.3, 188.68, 194.94, 207.96, 206.2], 'YTD': [84.98, 83.22, 80.46, 82.93, 75.54, 81.34, 79.61, 81.69, 89.57, 91.58, 90.16, 99.05, 114.45, 133.37, 165.56, 164.95, 170.13, 168.93, 208.26, 301.65, 252.59, 310.58, 266.77, 230.7, 222.44, 206.2], '6M': [83.1, 81.34, 74.21, 78.23, 79.48, 81.69, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 164.31, 164.95, 170.13, 176.89, 196.33, 219.43, 288.85, 308.88, 279.04, 297.89, 231.71, 206.26, 206.2], '1Y': [71.99, 76.34, 76.63, 77.81, 72.07, 74.26, 62.31, 66.84, 68.86, 74.62, 84.07, 86.97, 86.22, 84.26, 88.46, 87.59, 89.33, 78.68, 83.43, 100.2, 88.9, 84.07, 87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.84, 168.93, 208.26, 290.79, 288.85, 308.88, 279.04, 297.89, 231.71, 206.26, 206.2] },
      velocityScore: { '1D': -12.9, '1W': -21, '1M': -27.8, '6M': null }, isNew: false,
      marketCap: '$185B', pe: 70.9, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.12,
      etfPresence: { AIS: 3.42, ARTY: 3.52, BAI: 1.63, IGPT: false, IVES: false, ALAI: false, CHAT: 1.32, AIFD: 4.44, SPRX: 2.61, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 4.12, proScore: 2.06, coverage: 0.5,
      price: 245, weeklyPrices: [249.89, 247.23, 249.99, 247.55, 245.00], weeklyChange: -1.96, dayChange: -1.03, sortRank: 0, periodReturns: { '1M': 5.2, 'YTD': 6.1, '6M': 4.5, '1Y': 7.7 },
      priceHistory: { '1D': [247.55, 246.36, 245], '1W': [249.89, 247.23, 249.99, 247.55, 245], '1M': [232.79, 234.11, 234.27, 227.01, 232.69, 240.14, 238.34, 241.7, 242.67, 244.16, 243.62, 247.04, 245.34, 247.31, 247.49, 254.96, 249.89, 247.23, 249.99, 247.55, 245], 'YTD': [230.82, 247.38, 239.12, 244.68, 238.62, 204.08, 204.86, 210, 213.21, 211.74, 210.14, 208.27, 221.25, 249.7, 255.08, 268.26, 272.68, 264.86, 265.29, 250.02, 238, 244.39, 232.69, 245.98, 247.49, 245], '6M': [234.34, 241.73, 222.69, 199.6, 210.11, 210, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 263.99, 268.26, 272.68, 264.14, 266.32, 261.26, 245.22, 246.02, 234.11, 238.34, 243.62, 254.96, 245], '1Y': [227.47, 231.01, 213.75, 221.47, 228.01, 228.71, 225.99, 238.24, 234.05, 220.71, 219.57, 221.78, 216.39, 222.03, 229.25, 249.32, 249.1, 222.55, 229.67, 232.38, 227.92, 222.56, 232.14, 230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 205.27, 208.39, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 272.05, 268.99, 264.86, 265.29, 256.52, 245.22, 246.02, 234.11, 238.34, 243.62, 254.96, 245] },
      velocityScore: { '1D': -2.4, '1W': 2, '1M': 33.8, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 29.3, revenueGrowth: 17, eps: 8.37, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 4.99, ALAI: 4.82, CHAT: 2.72, AIFD: 3.79, SPRX: false, AOTG: 4.28 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.86, proScore: 1.93, coverage: 0.5,
      price: 393.78, weeklyPrices: [401.10, 393.82, 402.29, 397.75, 393.78], weeklyChange: -1.82, dayChange: -1, sortRank: 0, periodReturns: { '1M': 7.2, 'YTD': -18.6, '6M': -12.7, '1Y': -22.1 },
      priceHistory: { '1D': [397.75, 395.73, 393.78], '1W': [401.1, 393.82, 402.29, 397.75, 393.78], '1M': [367.34, 373.94, 365.46, 352.83, 372.97, 368.57, 373.02, 384.28, 390.49, 386.74, 383.34, 384.36, 385.1, 390.99, 384.93, 395.63, 401.1, 393.82, 402.29, 397.75, 393.78], 'YTD': [483.62, 479.28, 459.86, 480.58, 411.21, 404.37, 398.46, 392.74, 408.96, 399.95, 383, 370.17, 374.33, 420.26, 415.75, 414.44, 415.12, 423.54, 416.03, 427.34, 397.36, 379.4, 372.97, 388.84, 384.93, 393.78], '6M': [451.14, 433.5, 393.67, 401.84, 397.23, 392.74, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.62, 414.44, 415.12, 421.92, 418.57, 460.52, 411.74, 399.76, 373.94, 373.02, 383.34, 395.63, 393.78], '1Y': [505.27, 512.57, 527.75, 529.24, 509.77, 502.04, 505.35, 498.41, 509.04, 509.23, 517.95, 523.98, 513.57, 517.66, 542.07, 514.33, 508.68, 493.79, 476.99, 477.73, 492.02, 476.39, 486.85, 483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 384.47, 398.55, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 413.62, 412.66, 423.54, 416.03, 441.31, 411.74, 399.76, 373.94, 373.02, 383.34, 395.63, 393.78] },
      velocityScore: { '1D': -3.5, '1W': 6, '1M': 14.2, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 23.5, revenueGrowth: 18, eps: 16.78, grossMargin: 68, dividendYield: 0.92,
      etfPresence: { AIS: false, ARTY: 2.81, BAI: false, IGPT: false, IVES: 4.94, ALAI: 5.23, CHAT: 2.57, AIFD: false, SPRX: false, AOTG: 3.75 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.08, proScore: 1.54, coverage: 0.5,
      price: 319.97, weeklyPrices: [319.74, 303.62, 309.09, 319.79, 319.97], weeklyChange: 0.07, dayChange: 0.06, sortRank: 0, periodReturns: { '1M': -27.2, 'YTD': 92.3, '6M': 81.4, '1Y': 173.7 },
      priceHistory: { '1D': [319.79, 312.38, 319.97], '1W': [319.74, 303.62, 309.09, 319.79, 319.97], '1M': [439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42, 432.74, 393.16, 417.45, 412.97, 362.05, 361.78, 350.62, 319.74, 303.62, 309.09, 319.79, 319.97], 'YTD': [166.36, 162.61, 182, 170.93, 158.52, 143.71, 132.62, 118.83, 119.2, 127.48, 123.87, 109.6, 125.46, 170.81, 197.54, 202.68, 199.79, 215.58, 318.72, 363.54, 330.86, 417.07, 391.74, 382.89, 361.78, 319.97], '6M': [176.35, 160.46, 142.82, 126.58, 129.68, 118.83, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 212.84, 202.68, 199.79, 232.68, 306.88, 320.09, 346.33, 389.2, 397.02, 483.02, 393.16, 350.62, 319.97], '1Y': [116.91, 118.41, 135.54, 192, 171.06, 178.56, 176.61, 214.49, 238.79, 230.11, 195.8, 212.1, 161.55, 157.51, 168.25, 179.31, 167.55, 139.52, 144.78, 152.5, 167.08, 144.94, 168.83, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 215.58, 318.72, 355.76, 346.33, 389.2, 397.02, 483.02, 393.16, 350.62, 319.97] },
      velocityScore: { '1D': -0.6, '1W': -17.2, '1M': -3.7, '6M': null }, isNew: false,
      marketCap: '$55B', pe: 217.7, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 1.86, ARTY: 1.17, BAI: false, IGPT: false, IVES: false, ALAI: 0.83, CHAT: 2, AIFD: false, SPRX: 9.52, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 5, avgWeight: 2.89, proScore: 1.44, coverage: 0.5,
      price: 544.82, weeklyPrices: [466.81, 477.22, 487.42, 548.39, 544.82], weeklyChange: 16.71, dayChange: -0.65, sortRank: 0, periodReturns: { '1M': -25.6, 'YTD': 216.3, '6M': 123.9, '1Y': 712.4 },
      priceHistory: { '1D': [548.39, 534.21, 544.82], '1W': [466.81, 477.22, 487.42, 548.39, 544.82], '1M': [732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 550.3, 578.05, 582.59, 555.55, 563.32, 513.84, 466.81, 477.22, 487.42, 548.39, 544.82], 'YTD': [172.27, 200.46, 221.51, 252.66, 290.24, 273.74, 284.67, 279.7, 245.25, 286.21, 294.79, 270.49, 338.78, 361.69, 403.12, 431.52, 480, 458.68, 524.65, 594.11, 490.09, 746.23, 586.45, 532.1, 563.32, 544.82], '6M': [243.29, 278.41, 260.19, 284.1, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 404, 431.52, 480, 482.02, 484.28, 546.2, 526.93, 653.53, 670.75, 638.72, 550.3, 513.84, 544.82], '1Y': [67.06, 70.61, 75.84, 75.91, 75.86, 79.71, 86, 94.54, 103.09, 110.25, 120.06, 119.93, 113.13, 121.41, 124.92, 152.18, 169.99, 152.86, 155.41, 155.59, 169.54, 174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 458.68, 524.65, 563.1, 526.93, 653.53, 670.75, 638.72, 550.3, 513.84, 544.82] },
      velocityScore: { '1D': null, '1W': 25.2, '1M': -21.7, '6M': null }, isNew: true,
      marketCap: 'N/A', pe: 32.6, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { AIS: 1.39, ARTY: 2.79, BAI: 3.19, IGPT: 2.97, IVES: false, ALAI: 4.09, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 5, avgWeight: 2.83, proScore: 1.42, coverage: 0.5,
      price: 839.25, weeklyPrices: [706.23, 732.82, 765.55, 837.56, 839.25], weeklyChange: 18.83, dayChange: 0.2, sortRank: 0, periodReturns: { '1M': -6.1, 'YTD': 127.7, '6M': 136.7, '1Y': 742.4 },
      priceHistory: { '1D': [837.56, 820.99, 839.25], '1W': [706.23, 732.82, 765.55, 837.56, 839.25], '1M': [893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06, 801.16, 728.32, 731.25, 707.1, 785.77, 802.01, 768.15, 814.8, 752, 706.23, 732.82, 765.55, 837.56, 839.25], 'YTD': [368.59, 351.42, 324.25, 370.66, 435.1, 574.11, 635.64, 700.91, 558.44, 624.84, 728.95, 702.76, 896.02, 891.22, 846.89, 949.93, 903.8, 884.98, 910.81, 938, 853.26, 850, 816.98, 698.91, 814.8, 839.25], '6M': [354.49, 381.44, 504.42, 583.46, 667.77, 700.91, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 881.64, 949.93, 903.8, 970.7, 946.9, 905, 895.4, 957.24, 827.92, 858.06, 707.1, 752, 839.25], '1Y': [99.63, 109.48, 108.15, 119.66, 117.96, 124.62, 134.12, 151.73, 170.9, 163.99, 162.71, 157.15, 156.78, 162.95, 198.39, 188.36, 252.47, 247.43, 291.27, 302.98, 360.33, 316.15, 387.41, 368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 674.73, 783.25, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 884.98, 910.81, 1029.15, 895.4, 957.24, 827.92, 858.06, 707.1, 752, 839.25] },
      velocityScore: { '1D': 2.2, '1W': 2.9, '1M': 12.7, '6M': null }, isNew: false,
      marketCap: '$65B', pe: 147.2, revenueGrowth: 90, eps: 5.7, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.83, IGPT: false, IVES: false, ALAI: 1.4, CHAT: 1.7, AIFD: 4.43, SPRX: 3.8, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 5 of 10 AI & ML ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'Credo Technology Group Holding Ltd', easyScore: 5, avgWeight: 1.83, proScore: 0.91, coverage: 0.5,
      price: 222.71, weeklyPrices: [207.97, 202.68, 212.07, 223.87, 222.71], weeklyChange: 7.09, dayChange: -0.52, sortRank: 0, periodReturns: { '1M': -26.4, 'YTD': 54.8, '6M': 64.8, '1Y': 139.7 },
      priceHistory: { '1D': [223.87, 221.88, 222.71], '1W': [207.97, 202.68, 212.07, 223.87, 222.71], '1M': [302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 265.55, 258.69, 265.65, 257.79, 236.88, 236.18, 226.74, 207.97, 202.68, 212.07, 223.87, 222.71], 'YTD': [143.89, 150.42, 150.97, 129.57, 111.31, 128.4, 130.66, 112.27, 109.83, 116.88, 105.1, 93.87, 110.21, 158.93, 185.54, 184.38, 188.51, 156.27, 221.64, 214.6, 237.68, 271.83, 238, 246.4, 236.18, 222.71], '6M': [135.1, 129.47, 98.06, 121.78, 124.06, 112.27, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 195.04, 184.38, 188.51, 172.17, 218.41, 226.1, 222.27, 259.41, 272.01, 271.95, 258.69, 226.74, 222.71], '1Y': [92.93, 109.38, 110.29, 125.38, 106.3, 120.1, 124.77, 149.03, 164.42, 162.26, 145.61, 137.2, 129.75, 144.17, 162.18, 164.23, 158.5, 139.56, 154.18, 189.19, 170.29, 140.34, 147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 156.27, 221.64, 229, 222.27, 259.41, 272.01, 271.95, 258.69, 226.74, 222.71] },
      velocityScore: { '1D': null, '1W': -8.1, '1M': -6.2, '6M': null }, isNew: true,
      marketCap: '$42B', pe: 88.7, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: 1.05, ARTY: 1.18, BAI: 2.04, IGPT: false, IVES: false, ALAI: false, CHAT: 1.83, AIFD: false, SPRX: 3.04, AOTG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, avgWeight: 3.06, proScore: 1.22, coverage: 0.4,
      price: 294.56, weeklyPrices: [294.11, 289.56, 291.67, 304.50, 294.56], weeklyChange: 0.15, dayChange: -3.29, sortRank: 0, periodReturns: { '1M': -17.7, 'YTD': 81.8, '6M': 62.6, '1Y': 135.1 },
      priceHistory: { '1D': [304.57, 294.89, 294.56], '1W': [294.11, 289.56, 291.67, 304.5, 294.56], '1M': [357.96, 318.32, 316.43, 325.57, 303.95, 306.97, 334.82, 311.42, 300.53, 318.47, 317.81, 323.92, 318.86, 305.87, 303.58, 304.57, 294.11, 289.56, 291.67, 304.5, 294.56], 'YTD': [162.01, 163.58, 176.93, 189.21, 190.15, 248.51, 243.06, 254.89, 241.78, 264.74, 256, 250.58, 281.03, 294.13, 321.75, 328.31, 339.97, 339.73, 323.91, 331.44, 280.98, 333.05, 303.95, 305.58, 303.58, 294.56], '6M': [181.12, 195.1, 177.75, 236.51, 243.75, 254.89, 241.78, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 323.46, 328.31, 339.97, 370.94, 327.46, 323.39, 300.57, 311.93, 318.32, 334.82, 317.81, 304.57, 294.56], '1Y': [125.29, 142.7, 138.76, 143.72, 129.05, 127.93, 125.59, 125.58, 136.65, 142.61, 150.86, 158.87, 175.15, 174.8, 190.57, 180.82, 179.05, 164.86, 169.57, 178.88, 178.38, 160.66, 166.26, 162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 245.42, 257.75, 241.78, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 330.97, 367.92, 339.73, 323.91, 334.49, 300.57, 311.93, 318.32, 334.82, 317.81, 304.57, 294.56] },
      velocityScore: { '1D': -0.8, '1W': 1.7, '1M': 2.5, '6M': null }, isNew: false,
      marketCap: '$113B', pe: 73.8, revenueGrowth: 30, eps: 3.99, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.92, ARTY: false, BAI: 1.97, IGPT: false, IVES: false, ALAI: false, CHAT: 2.28, AIFD: 4.06, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks Inc', easyScore: 4, avgWeight: 2.91, proScore: 1.16, coverage: 0.4,
      price: 335.16, weeklyPrices: [353.99, 358.68, 348.66, 342.15, 335.16], weeklyChange: -5.32, dayChange: -2.04, sortRank: 0, periodReturns: { '1M': 17, 'YTD': 82, '6M': 83.9, '1Y': 70.4 },
      priceHistory: { '1D': [342.15, 341, 335.16], '1W': [353.99, 358.68, 348.66, 342.15, 335.16], '1M': [286.4, 290.92, 285.26, 293.09, 304.2, 332, 341.02, 352.04, 348.06, 357.53, 320.59, 338.31, 325.91, 330.3, 352.89, 354.02, 353.99, 358.68, 348.66, 342.15, 335.16], 'YTD': [184.2, 189.02, 187.66, 183.5, 166.24, 165.3, 150.99, 148.92, 165.05, 167.45, 164.05, 160.32, 173.78, 166.97, 173.21, 181.08, 207.88, 247.55, 256.75, 280.43, 263.22, 287.78, 304.2, 337.04, 352.89, 335.16], '6M': [182.27, 176.2, 154.77, 162.81, 148.7, 148.92, 165.05, 167.02, 162.95, 147.02, 161.95, 162.51, 169.56, 178.54, 181.08, 207.88, 242.83, 260.58, 300.48, 266.33, 284.54, 290.92, 341.02, 320.59, 354.02, 335.16], '1Y': [196.73, 193.84, 169.09, 175.4, 181.56, 184.23, 191.53, 197.55, 201.34, 203.25, 203.62, 211.04, 207.56, 214.4, 221.38, 214.52, 218.27, 201, 186.27, 193.63, 195, 187.09, 188.12, 184.2, 190.8, 187.73, 180.18, 176.97, 159.32, 166.95, 144.14, 150.15, 165.05, 167.02, 162.95, 147.02, 161.95, 162.51, 169.56, 182.9, 184.56, 213.66, 247.55, 256.75, 297.18, 266.33, 284.54, 290.92, 341.02, 320.59, 354.02, 335.16] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$273B', pe: 288.9, revenueGrowth: 31, eps: 1.16, grossMargin: 72, dividendYield: null,
      etfPresence: { AIS: 0.54, ARTY: false, BAI: false, IGPT: false, IVES: 4.32, ALAI: 0.09, CHAT: false, AIFD: 6.69, SPRX: false, AOTG: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 4, avgWeight: 2.82, proScore: 1.13, coverage: 0.4,
      price: 103.73, weeklyPrices: [96.98, 95.04, 97.06, 105.45, 103.73], weeklyChange: 6.96, dayChange: -1.63, sortRank: 0, periodReturns: { '1M': -26.4, 'YTD': 181.1, '6M': 91, '1Y': 346.3 },
      priceHistory: { '1D': [105.45, 102.97, 103.73], '1W': [96.98, 95.04, 97.06, 105.45, 103.73], '1M': [140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.2, 110.24, 112.54, 109.84, 103.12, 107.76, 102.99, 96.98, 95.04, 97.06, 105.45, 103.73], 'YTD': [36.9, 45.55, 46.96, 43.93, 49.25, 48.29, 44.62, 45.61, 43.42, 45.76, 44.01, 44.13, 58.95, 68.5, 66.78, 99.62, 124.92, 108.17, 123.52, 112.71, 107.04, 133.99, 128.32, 110.39, 107.76, 103.73], '6M': [54.32, 48.66, 48.24, 46.48, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 82.54, 99.62, 124.92, 108.77, 119.84, 109.33, 110.27, 127.86, 132.28, 139.63, 110.24, 102.99, 103.73], '1Y': [23.24, 20.41, 20.19, 21.81, 25.31, 24.35, 24, 24.44, 25.27, 29.34, 33.55, 37.17, 35.63, 38.12, 41.53, 37.03, 37.88, 34.33, 35.83, 43.76, 40.5, 37.31, 36.35, 36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.5, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.17, 123.52, 107.93, 110.27, 127.86, 132.28, 139.63, 110.24, 102.99, 103.73] },
      velocityScore: { '1D': 3.7, '1W': 0.9, '1M': -25.7, '6M': null }, isNew: false,
      marketCap: '$521B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.24, ARTY: false, BAI: 2.86, IGPT: 4.16, IVES: false, ALAI: false, CHAT: 1.02, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, avgWeight: 2.61, proScore: 1.04, coverage: 0.4,
      price: 890.24, weeklyPrices: [745.49, 787.66, 802.45, 891.83, 890.24], weeklyChange: 19.42, dayChange: -0.18, sortRank: 0, periodReturns: { '1M': -18.6, 'YTD': 223.3, '6M': 156.9, '1Y': 507.3 },
      priceHistory: { '1D': [891.83, 874.4, 890.24], '1W': [745.49, 787.66, 802.45, 891.83, 890.24], '1M': [1094.04, 1038.59, 993.25, 1025.36, 899.9, 968.53, 965, 915.19, 820.16, 868.26, 860.02, 890.09, 910.34, 860.66, 878.31, 828.3, 745.49, 787.66, 802.45, 891.83, 890.24], 'YTD': [275.39, 304.01, 326.23, 371.76, 444.45, 407.25, 408.97, 407.84, 352.8, 398.78, 404.02, 391.76, 496.3, 531.81, 587.62, 726.93, 782.64, 740.84, 845.76, 940.69, 815.99, 1070.23, 899.9, 827.64, 878.31, 890.24], '6M': [346.53, 446.57, 405.45, 431.17, 411.11, 407.84, 352.8, 383.71, 411.23, 380.07, 453.3, 513.28, 539.75, 586.25, 726.93, 782.64, 795.47, 812.73, 921.26, 876.77, 1018.8, 1038.59, 965, 860.02, 828.3, 890.24], '1Y': [146.59, 152.68, 151.74, 155.59, 157.93, 165.24, 176.32, 191.59, 211.13, 228.13, 236.06, 225.01, 211.63, 214.57, 223, 250.38, 288, 253.86, 261.89, 258.67, 282.86, 288.13, 282.8, 275.39, 284.47, 320.32, 346.1, 407.69, 429.32, 425.99, 407.4, 379.52, 352.8, 383.71, 411.23, 380.07, 453.3, 513.28, 539.75, 595.86, 738.54, 834.01, 740.84, 845.76, 926.61, 876.77, 1018.8, 1038.59, 965, 860.02, 828.3, 890.24] },
      velocityScore: { '1D': 8.3, '1W': 3, '1M': -11.1, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 84.6, revenueGrowth: 44, eps: 10.52, grossMargin: 42, dividendYield: 0.33,
      etfPresence: { AIS: 2.54, ARTY: 2.87, BAI: false, IGPT: 3.14, IVES: false, ALAI: 1.89, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'CRWV', name: 'COREWEAVE INC CLASS A', easyScore: 4, avgWeight: 2.34, proScore: 0.94, coverage: 0.4,
      price: 82.14, weeklyPrices: [72.91, 73.21, 73.06, 79.58, 82.14], weeklyChange: 12.66, dayChange: 3.22, sortRank: 0, periodReturns: { '1M': -26.2, 'YTD': 14.7, '6M': -10.5, '1Y': -36.7 },
      priceHistory: { '1D': [79.58, 79.89, 82.14], '1W': [72.91, 73.21, 73.06, 79.58, 82.14], '1M': [111.29, 105.72, 100.88, 98.76, 96.58, 95.51, 99.54, 85.68, 81.75, 86.46, 90, 89.7, 88.88, 83.31, 79.94, 77.12, 72.91, 73.21, 73.06, 79.58, 82.14], 'YTD': [71.61, 80.14, 101.23, 108.86, 90.06, 95.15, 97.14, 79.56, 72.99, 85.86, 81.96, 77.47, 88.9, 119.56, 117.42, 119.01, 114.15, 103.77, 105.89, 110.93, 95.61, 117.95, 96.58, 83.53, 79.94, 82.14], '6M': [91.79, 99.53, 74.65, 95.7, 89.25, 79.56, 72.99, 81.11, 81.47, 74.81, 80.94, 110.27, 117.43, 110.14, 119.01, 114.15, 107.3, 105.49, 124.82, 102.37, 106.71, 105.72, 99.54, 90, 77.12, 82.14], '1Y': [129.77, 108.74, 111.84, 148.75, 92.89, 91.39, 89.88, 100.22, 118.75, 130.89, 136.85, 128.83, 134.06, 125.06, 134.8, 115.75, 88.39, 74.9, 71.29, 79.36, 90.66, 69.5, 80.26, 71.61, 77.09, 95.01, 92.98, 93.19, 89.95, 96.04, 90.84, 78.05, 72.99, 81.11, 81.47, 74.81, 80.94, 110.27, 117.43, 112.06, 125.43, 114.7, 103.77, 105.89, 119.27, 102.37, 106.71, 105.72, 99.54, 90, 77.12, 82.14] },
      velocityScore: { '1D': 4.4, '1W': null, '1M': -18.3, '6M': null }, isNew: false,
      marketCap: '$45B', pe: null, revenueGrowth: 112, eps: -2.96, grossMargin: 69, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 3.79, BAI: 1.11, IGPT: false, IVES: 1.74, ALAI: false, CHAT: 2.71, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'COREWEAVE INC CLASS A appears in 4 of 10 AI & ML ETFs (40% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 4.87, proScore: 4.87, coverage: 1,
      price: 954.15, weeklyPrices: [853.20, 848.95, 865.46, 970.82, 954.15], weeklyChange: 11.83, dayChange: -1.72, sortRank: 0, periodReturns: { '1M': -21.2, 'YTD': 234.3, '6M': 140, '1Y': 773.6 },
      priceHistory: { '1D': [970.82, 946.62, 954.15], '1W': [853.2, 848.95, 865.46, 970.82, 954.15], '1M': [1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 948.8, 991.64, 979.3, 937, 983.12, 904.28, 853.2, 848.95, 865.46, 970.82, 954.15], 'YTD': [285.41, 345.09, 362.75, 410.24, 419.44, 410.34, 417.35, 412.37, 370.3, 441.8, 404.35, 337.84, 406.73, 457.23, 481.72, 542.21, 746.81, 681.54, 895.88, 1079.57, 891.88, 1133.99, 1132.33, 938.38, 983.12, 954.15], '6M': [397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 496.72, 542.21, 746.81, 724.66, 751, 1035.5, 949.28, 1087.99, 1051.77, 1154.29, 948.8, 904.28, 954.15], '1Y': [109.22, 111.96, 109.06, 127.75, 122.05, 116.5, 118.72, 135.24, 158.82, 166.41, 167.32, 185.69, 187.06, 202.29, 221.91, 218.03, 241.11, 228.5, 224.53, 234.16, 252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1, 949.28, 1087.99, 1051.77, 1154.29, 948.8, 904.28, 954.15] },
      velocityScore: { '1D': 5.2, '1W': 0.4, '1M': -4.7, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 21.6, revenueGrowth: 346, eps: 44.27, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { SOXX: 8.33, PSI: 5.69, XSD: 2.7, DRAM: 2.76 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.81, proScore: 4.36, coverage: 0.75,
      price: 543.13, weeklyPrices: [500.94, 495.76, 503.57, 544.43, 543.13], weeklyChange: 8.42, dayChange: -0.24, sortRank: 0, periodReturns: { '1M': -1.5, 'YTD': 153.6, '6M': 114.1, '1Y': 251 },
      priceHistory: { '1D': [544.43, 537.21, 543.13], '1W': [500.94, 495.76, 503.57, 544.43, 543.13], '1M': [551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 517.41, 546.72, 557.89, 534.39, 548.13, 529.14, 500.94, 495.76, 503.57, 544.43, 543.13], 'YTD': [214.16, 203.17, 231.83, 252.03, 242.11, 213.58, 203.37, 200.21, 192.43, 196.58, 202.68, 203.43, 231.82, 278.26, 305.33, 360.54, 455.19, 420.99, 503.89, 542.52, 452.4, 537.37, 521.58, 516.11, 548.13, 543.13], '6M': [253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 347.81, 360.54, 455.19, 424.1, 467.51, 510.13, 490.33, 547.26, 519.85, 580.91, 517.41, 529.14, 543.13], '1Y': [154.72, 177.44, 174.31, 174.95, 166.55, 166.62, 162.13, 155.82, 160.46, 160.9, 161.79, 211.51, 218.09, 238.03, 258.01, 250.05, 237.52, 230.29, 206.13, 217.6, 221.62, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 503.89, 521.54, 490.33, 547.26, 519.85, 580.91, 517.41, 529.14, 543.13] },
      velocityScore: { '1D': 1.9, '1W': 1.9, '1M': 18.2, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 181.6, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 8.78, PSI: 5.67, XSD: 2.99, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 5.27, proScore: 3.95, coverage: 0.75,
      price: 206.86, weeklyPrices: [207.40, 202.81, 203.28, 207.29, 206.86], weeklyChange: -0.26, dayChange: -0.21, sortRank: 0, periodReturns: { '1M': -0.9, 'YTD': 10.9, '6M': 11.9, '1Y': 23.8 },
      priceHistory: { '1D': [207.29, 205.7, 206.86], '1W': [207.4, 202.81, 203.28, 207.29, 206.86], '1M': [208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 204.12, 202.78, 210.96, 203.53, 211.8, 212.5, 207.4, 202.81, 203.28, 207.29, 206.86], 'YTD': [186.5, 184.86, 186.23, 188.52, 180.34, 190.05, 187.9, 177.19, 177.82, 183.22, 175.64, 174.4, 182.08, 198.35, 199.64, 198.45, 215.2, 222.32, 214.86, 214.75, 200.42, 210.69, 192.53, 196.93, 211.8, 206.86], '6M': [184.84, 192.51, 171.88, 186.94, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 208.27, 198.45, 215.2, 225.32, 215.33, 224.36, 208.64, 212.45, 200.04, 200.09, 204.12, 212.5, 206.86], '1Y': [167.03, 175.51, 178.26, 183.16, 175.64, 181.77, 170.62, 170.76, 174.88, 178.43, 186.58, 185.04, 180.03, 181.16, 201.03, 198.69, 193.16, 181.36, 177.82, 179.59, 184.97, 177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 222.32, 214.86, 222.82, 208.64, 212.45, 200.04, 200.09, 204.12, 212.5, 206.86] },
      velocityScore: { '1D': -3.9, '1W': 0.5, '1M': 14.5, '6M': null }, isNew: false,
      marketCap: '$5.0T', pe: 31.7, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.48,
      etfPresence: { SOXX: 8.18, PSI: 5.07, XSD: 2.56, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 4.16, proScore: 3.12, coverage: 0.75,
      price: 103.73, weeklyPrices: [96.98, 95.04, 97.06, 105.45, 103.73], weeklyChange: 6.96, dayChange: -1.63, sortRank: 0, periodReturns: { '1M': -26.4, 'YTD': 181.1, '6M': 91, '1Y': 346.3 },
      priceHistory: { '1D': [105.45, 102.97, 103.73], '1W': [96.98, 95.04, 97.06, 105.45, 103.73], '1M': [140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.2, 110.24, 112.54, 109.84, 103.12, 107.76, 102.99, 96.98, 95.04, 97.06, 105.45, 103.73], 'YTD': [36.9, 45.55, 46.96, 43.93, 49.25, 48.29, 44.62, 45.61, 43.42, 45.76, 44.01, 44.13, 58.95, 68.5, 66.78, 99.62, 124.92, 108.17, 123.52, 112.71, 107.04, 133.99, 128.32, 110.39, 107.76, 103.73], '6M': [54.32, 48.66, 48.24, 46.48, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 82.54, 99.62, 124.92, 108.77, 119.84, 109.33, 110.27, 127.86, 132.28, 139.63, 110.24, 102.99, 103.73], '1Y': [23.24, 20.41, 20.19, 21.81, 25.31, 24.35, 24, 24.44, 25.27, 29.34, 33.55, 37.17, 35.63, 38.12, 41.53, 37.03, 37.88, 34.33, 35.83, 43.76, 40.5, 37.31, 36.35, 36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.5, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.17, 123.52, 107.93, 110.27, 127.86, 132.28, 139.63, 110.24, 102.99, 103.73] },
      velocityScore: { '1D': 2.3, '1W': 0.6, '1M': -8.2, '6M': null }, isNew: false,
      marketCap: '$521B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 5.54, PSI: 4.48, XSD: 2.45, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.68, proScore: 2.76, coverage: 0.75,
      price: 378.8, weeklyPrices: [380.53, 375.36, 372.46, 382.81, 378.80], weeklyChange: -0.46, dayChange: -1.05, sortRank: 0, periodReturns: { '1M': -15, 'YTD': 39.7, '6M': 22.8, '1Y': 60.8 },
      priceHistory: { '1D': [382.81, 377.44, 378.8], '1W': [380.53, 375.36, 372.46, 382.81, 378.8], '1M': [445.48, 407.26, 413.16, 417.93, 386.91, 391.78, 397.17, 388.98, 377.16, 388.83, 385.4, 393.64, 395.65, 386.01, 392.75, 390.96, 380.53, 375.36, 372.46, 382.81, 378.8], 'YTD': [271.2, 300.93, 300.25, 303.83, 311.29, 337, 345.3, 355.79, 315.81, 310.92, 312.19, 318.14, 346.21, 353.8, 403.88, 397.69, 416.52, 418.58, 419.94, 437.67, 392.67, 434.46, 386.91, 379.03, 392.75, 378.8], '6M': [308.52, 318.7, 322.12, 331.36, 355.03, 355.79, 315.81, 306.07, 309.43, 307.44, 327.36, 350.01, 381.05, 399.57, 397.69, 416.52, 417.49, 397.07, 402.69, 403.89, 427.58, 407.26, 397.17, 385.4, 390.96, 378.8], '1Y': [235.5, 230.75, 220.68, 232.04, 230.44, 255.63, 244.55, 248.18, 244.1, 246.78, 245.7, 233.75, 235.4, 246.37, 239.35, 229.38, 233.41, 230.13, 252.02, 278.24, 276.24, 278.4, 276.73, 271.2, 299.16, 302.1, 305.6, 310.88, 320.45, 337.1, 355.15, 352.41, 315.81, 306.07, 309.43, 307.44, 327.36, 350.01, 381.05, 392.59, 397.02, 422.73, 418.58, 419.94, 423.2, 403.89, 427.58, 407.26, 397.17, 385.4, 390.96, 378.8] },
      velocityScore: { '1D': -3.5, '1W': 0, '1M': 2.6, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 56.2, revenueGrowth: 37, eps: 6.74, grossMargin: 64, dividendYield: 1.15,
      etfPresence: { SOXX: 3.85, PSI: 4.79, XSD: 2.41, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 5.87, proScore: 2.93, coverage: 0.5,
      price: 555.61, weeklyPrices: [560.93, 529.66, 525.70, 564.55, 555.61], weeklyChange: -0.95, dayChange: -1.58, sortRank: 0, periodReturns: { '1M': -13.2, 'YTD': 116.2, '6M': 74.3, '1Y': 196.9 },
      priceHistory: { '1D': [564.55, 550.09, 555.61], '1W': [560.93, 529.66, 525.7, 564.55, 555.61], '1M': [640.18, 585.88, 588.97, 668, 626.84, 694.64, 723, 650.91, 603.04, 592.79, 570.5, 588.66, 602.5, 575.39, 595.7, 579.43, 560.93, 529.66, 525.7, 564.55, 555.61], 'YTD': [256.99, 301.18, 327.01, 332.71, 318.67, 339.88, 369.83, 372.3, 324.74, 346.18, 361.79, 341.79, 385.72, 389.9, 403.91, 389.08, 435.44, 413.57, 454.89, 500.77, 497.01, 617.11, 626.84, 554.5, 595.7, 555.61], '6M': [318.79, 341.34, 303.99, 328.39, 375.38, 372.3, 324.74, 341.53, 357.06, 337.17, 352.62, 395.73, 391.62, 417.04, 389.08, 435.44, 436.62, 432.16, 458.17, 492.17, 585.78, 585.88, 723, 570.5, 579.43, 555.61], '1Y': [187.14, 188.41, 179.15, 188.45, 162.22, 164.51, 156.25, 163.5, 173.54, 200.87, 204.74, 211.56, 218.19, 226, 227.64, 230.19, 228.67, 225.12, 242.46, 268.63, 267.14, 258.84, 260.23, 256.99, 281.64, 319.08, 322.38, 322.32, 322.51, 354.91, 373.55, 372.18, 324.74, 341.53, 357.06, 337.17, 352.62, 395.73, 391.62, 404.86, 391.38, 443.62, 413.57, 454.89, 490.05, 492.17, 585.78, 585.88, 723, 570.5, 579.43, 555.61] },
      velocityScore: { '1D': 0.3, '1W': -3, '1M': 5.8, '6M': null }, isNew: false,
      marketCap: '$441B', pe: 52.4, revenueGrowth: 11, eps: 10.61, grossMargin: 49, dividendYield: 0.38,
      etfPresence: { SOXX: 5.22, PSI: 6.52, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 5.2, proScore: 2.6, coverage: 0.5,
      price: 214.13, weeklyPrices: [219.37, 212.75, 207.60, 217.56, 214.13], weeklyChange: -2.39, dayChange: -1.58, sortRank: 0, periodReturns: { '1M': -20.4, 'YTD': 76.2, '6M': 42.8, '1Y': 140 },
      priceHistory: { '1D': [217.56, 212.8, 214.13], '1W': [219.37, 212.75, 207.6, 217.56, 214.13], '1M': [269.16, 244.49, 240.48, 258.8, 248.64, 278.39, 301.71, 266.19, 235.55, 233.31, 221.18, 229.52, 231.52, 222.25, 230.37, 224.5, 219.37, 212.75, 207.6, 217.56, 214.13], 'YTD': [121.51, 140, 156.78, 161.63, 135.55, 147.95, 146.99, 152.46, 134.46, 143.82, 151.14, 147.24, 167.23, 173.49, 181.54, 172.63, 186.92, 175.65, 201.14, 212.51, 213.56, 259.56, 248.64, 216.47, 230.37, 214.13], '6M': [150, 168.47, 133.1, 145.09, 149.6, 152.46, 134.46, 141.86, 149.87, 144.32, 154.01, 176.88, 180.53, 193.5, 172.63, 186.92, 180.43, 188.84, 194, 210.81, 256.42, 244.49, 301.71, 221.18, 224.5, 214.13], '1Y': [89.22, 91.61, 88.34, 93.55, 87.61, 88.81, 84.39, 91.77, 99.06, 107.12, 107.86, 108.47, 102.57, 114.74, 120.6, 119.35, 119.09, 112.31, 114.59, 121.18, 122.56, 122.34, 126.88, 121.51, 132.46, 154.5, 151.28, 142.79, 144.29, 146.41, 148.77, 153.49, 134.46, 141.86, 149.87, 144.32, 154.01, 176.88, 180.53, 190, 171.33, 184.52, 175.65, 201.14, 204.52, 210.81, 256.42, 244.49, 301.71, 221.18, 224.5, 214.13] },
      velocityScore: { '1D': -1.9, '1W': -3.3, '1M': -3, '6M': null }, isNew: false,
      marketCap: '$280B', pe: 60.8, revenueGrowth: 12, eps: 3.52, grossMargin: 61, dividendYield: 0.42,
      etfPresence: { SOXX: 4.71, PSI: 5.68, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 4.89, proScore: 2.44, coverage: 0.5,
      price: 384.33, weeklyPrices: [374.45, 370.83, 378.16, 386.50, 384.33], weeklyChange: 2.64, dayChange: -0.56, sortRank: 0, periodReturns: { '1M': -2, 'YTD': 11, '6M': 18.1, '1Y': 38 },
      priceHistory: { '1D': [386.5, 381.31, 384.33], '1W': [374.45, 370.83, 378.16, 386.5, 384.33], '1M': [392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 388.69, 401.11, 399.97, 384.05, 389.11, 394.28, 374.45, 370.83, 378.16, 386.5, 384.33], 'YTD': [346.1, 344.97, 351.71, 332.79, 320.33, 342.76, 333.99, 319.55, 330.48, 324.92, 322.51, 309.51, 350.63, 398.47, 419.94, 421.28, 430, 420.71, 422.01, 479.23, 372.1, 411.35, 365.02, 370.78, 389.11, 384.33], '6M': [325.49, 330.73, 310.51, 331.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 422.76, 421.28, 430, 425.19, 414.14, 459.97, 396.6, 393.94, 380.15, 377.75, 388.69, 394.28, 384.33], '1Y': [278.59, 297.42, 292.93, 312.83, 294.91, 298.01, 302.39, 336.67, 360, 338.94, 329.91, 336.41, 344.13, 342.66, 372.97, 351.94, 351.96, 340.5, 385.03, 380.61, 406.29, 341.3, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 420.71, 422.01, 481.57, 396.6, 393.94, 380.15, 377.75, 388.69, 394.28, 384.33] },
      velocityScore: { '1D': -3.2, '1W': 2.1, '1M': 9.9, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 64.2, revenueGrowth: 48, eps: 5.99, grossMargin: 76, dividendYield: 0.67,
      etfPresence: { SOXX: 7.2, PSI: false, XSD: 2.57, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 4.72, proScore: 2.36, coverage: 0.5,
      price: 315.85, weeklyPrices: [320.96, 313.30, 306.76, 322.00, 315.85], weeklyChange: -1.59, dayChange: -1.91, sortRank: 0, periodReturns: { '1M': -22.9, 'YTD': 84.5, '6M': 43.1, '1Y': 223.3 },
      priceHistory: { '1D': [322, 314.08, 315.85], '1W': [320.96, 313.3, 306.76, 322, 315.85], '1M': [409.54, 371.33, 374.8, 401.82, 379.09, 410.91, 433.33, 391.26, 351.41, 350.2, 333.15, 353.17, 350.33, 329.92, 346.1, 335.43, 320.96, 313.3, 306.76, 322, 315.85], 'YTD': [171.18, 218.36, 222.96, 238.46, 230.1, 235.12, 237.39, 233.89, 199.33, 219.4, 233.31, 213.66, 246.49, 260.96, 258.56, 256.72, 294.05, 277.96, 322.68, 343.71, 321.8, 389.04, 379.09, 326.13, 346.1, 315.85], '6M': [220.7, 248.17, 213.31, 231.29, 244.92, 233.89, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 267.78, 256.72, 294.05, 284.72, 305.35, 317.12, 324.45, 388.92, 371.33, 433.33, 333.15, 335.43, 315.85], '1Y': [97.69, 98.94, 96.68, 105.28, 100.33, 103.63, 97.74, 105.57, 120.47, 131.93, 133.9, 140.35, 138.31, 145.04, 155.62, 155.78, 159.18, 143.24, 151.93, 159.75, 165.81, 163.26, 175.16, 171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 242.27, 231, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 296.05, 277.96, 322.68, 334.41, 324.45, 388.92, 371.33, 433.33, 333.15, 335.43, 315.85] },
      velocityScore: { '1D': -2.1, '1W': -4.8, '1M': -4.5, '6M': null }, isNew: false,
      marketCap: '$395B', pe: 59.8, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.32,
      etfPresence: { SOXX: 4.21, PSI: 5.24, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 3.26, proScore: 1.63, coverage: 0.5,
      price: 286.14, weeklyPrices: [291.22, 284.02, 284.07, 291.30, 286.14], weeklyChange: -1.74, dayChange: -1.77, sortRank: 0, periodReturns: { '1M': -13.9, 'YTD': 64.9, '6M': 46.7, '1Y': 33.1 },
      priceHistory: { '1D': [291.3, 287.54, 286.14], '1W': [291.22, 284.02, 284.07, 291.3, 286.14], '1M': [332.28, 304.36, 303.11, 311.81, 285.43, 285.48, 298.07, 298.41, 293.08, 303.5, 301.32, 308.53, 311.46, 298.57, 305.55, 301.19, 291.22, 284.02, 284.07, 291.3, 286.14], 'YTD': [173.49, 190.31, 191.58, 196.63, 225.21, 226.56, 218.05, 212.11, 193.23, 194.13, 188.63, 194.14, 208.9, 223.1, 282.23, 281.02, 287.8, 300.6, 324.89, 308.59, 282.01, 322.86, 285.43, 293.3, 305.55, 286.14], '6M': [194.99, 218.97, 223.98, 223, 219.73, 212.11, 193.23, 190.78, 187.19, 190.33, 199.42, 216.71, 233.7, 277.14, 281.02, 287.8, 302.73, 309.21, 293.2, 290.9, 313.34, 304.36, 298.07, 301.32, 301.19, 286.14], '1Y': [214.92, 191.38, 185.4, 192.97, 195.94, 205.98, 195.74, 185.03, 177.63, 182.04, 183.73, 177.05, 173.94, 180.84, 166.91, 159.36, 159.73, 157.32, 161.77, 182.6, 179.52, 177.56, 177.08, 173.49, 188.45, 189.12, 193.31, 215.55, 221.44, 226.16, 219.86, 209.82, 193.23, 190.78, 187.19, 190.33, 199.42, 216.71, 233.7, 269.5, 280.89, 297.76, 300.6, 324.89, 308.12, 290.9, 313.34, 304.36, 298.07, 301.32, 301.19, 286.14] },
      velocityScore: { '1D': -3, '1W': -1.8, '1M': 5.8, '6M': null }, isNew: false,
      marketCap: '$260B', pe: 48.8, revenueGrowth: 19, eps: 5.86, grossMargin: 57, dividendYield: 1.95,
      etfPresence: { SOXX: 3.97, PSI: false, XSD: 2.56, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 3.13, proScore: 1.57, coverage: 0.5,
      price: 206.2, weeklyPrices: [188.30, 188.68, 194.94, 207.96, 206.20], weeklyChange: 9.51, dayChange: -0.85, sortRank: 0, periodReturns: { '1M': -33, 'YTD': 142.6, '6M': 148.1, '1Y': 186.4 },
      priceHistory: { '1D': [207.96, 204.3, 206.2], '1W': [188.3, 188.68, 194.94, 207.96, 206.2], '1M': [307.86, 279.04, 276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 245.29, 249.27, 231.71, 243.27, 235.81, 217.53, 222.44, 206.26, 188.3, 188.68, 194.94, 207.96, 206.2], 'YTD': [84.98, 83.22, 80.46, 82.93, 75.54, 81.34, 79.61, 81.69, 89.57, 91.58, 90.16, 99.05, 114.45, 133.37, 165.56, 164.95, 170.13, 168.93, 208.26, 301.65, 252.59, 310.58, 266.77, 230.7, 222.44, 206.2], '6M': [83.1, 81.34, 74.21, 78.23, 79.48, 81.69, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 164.31, 164.95, 170.13, 176.89, 196.33, 219.43, 288.85, 308.88, 279.04, 297.89, 231.71, 206.26, 206.2], '1Y': [71.99, 76.34, 76.63, 77.81, 72.07, 74.26, 62.31, 66.84, 68.86, 74.62, 84.07, 86.97, 86.22, 84.26, 88.46, 87.59, 89.33, 78.68, 83.43, 100.2, 88.9, 84.07, 87.68, 84.98, 83.45, 80.38, 80.23, 78.92, 80.28, 78.61, 77.79, 80.86, 89.57, 87.86, 87.91, 94.88, 109.51, 131.3, 147.84, 158.21, 163.66, 170.84, 168.93, 208.26, 290.79, 288.85, 308.88, 279.04, 297.89, 231.71, 206.26, 206.2] },
      velocityScore: { '1D': 1.3, '1W': -3.7, '1M': -21.1, '6M': null }, isNew: false,
      marketCap: '$185B', pe: 70.9, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.12,
      etfPresence: { SOXX: 4.22, PSI: false, XSD: 2.05, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 2.95, proScore: 1.48, coverage: 0.5,
      price: 270.9, weeklyPrices: [270.66, 266.53, 267.18, 273.15, 270.90], weeklyChange: 0.09, dayChange: -0.82, sortRank: 0, periodReturns: { '1M': -16.2, 'YTD': 24.8, '6M': 14.4, '1Y': 18.8 },
      priceHistory: { '1D': [273.15, 269.86, 270.9], '1W': [270.66, 266.53, 267.18, 273.15, 270.9], '1M': [323.24, 299.94, 294.06, 298.64, 277.02, 278.37, 281.03, 279.18, 273.36, 280.51, 283.81, 290.54, 292.26, 278.39, 283.87, 279.01, 270.66, 266.53, 267.18, 273.15, 270.9], 'YTD': [217.06, 241.15, 237.11, 229.42, 220.66, 249.75, 232.11, 227.01, 201.74, 191.89, 193.39, 196.86, 204.27, 213.73, 241.16, 295.24, 294.75, 291.68, 332.67, 321.88, 285.56, 313.27, 277.02, 273.15, 283.87, 270.9], '6M': [236.75, 233.5, 222.13, 242.19, 232.27, 227.01, 201.74, 190.86, 191.37, 191.66, 197.08, 208, 221.34, 244.04, 295.24, 294.75, 291.5, 316.47, 311.38, 301.14, 315.88, 299.94, 281.03, 283.81, 279.01, 270.9], '1Y': [228, 226.74, 208.47, 220.05, 229.27, 237.82, 228.2, 223.69, 220.99, 225.62, 227.73, 219.58, 216.11, 222.34, 212.96, 204.42, 202.86, 188.59, 191.02, 227.56, 228.05, 229.75, 225.98, 217.06, 237.89, 238.6, 232.48, 226.14, 224.32, 244.43, 231.16, 224.76, 201.74, 190.86, 191.37, 191.66, 197.08, 208, 221.34, 236.87, 290.76, 305.99, 291.68, 332.67, 323.62, 301.14, 315.88, 299.94, 281.03, 283.81, 279.01, 270.9] },
      velocityScore: { '1D': -2.6, '1W': -0.7, '1M': 2.8, '6M': null }, isNew: false,
      marketCap: '$68B', pe: 25.9, revenueGrowth: 12, eps: 10.46, grossMargin: 56, dividendYield: 1.48,
      etfPresence: { SOXX: 3.54, PSI: false, XSD: 2.37, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.86, proScore: 1.43, coverage: 0.5,
      price: 1369.94, weeklyPrices: [1305.65, 1312.00, 1328.80, 1383.26, 1369.94], weeklyChange: 4.92, dayChange: -0.96, sortRank: 0, periodReturns: { '1M': -10.9, 'YTD': 51.1, '6M': 27.2, '1Y': 90.3 },
      priceHistory: { '1D': [1383.26, 1366.24, 1369.94], '1W': [1305.65, 1312, 1328.8, 1383.26, 1369.94], '1M': [1537.88, 1423.76, 1434.95, 1438.3, 1313.32, 1312.77, 1382.36, 1331.73, 1288.16, 1346.13, 1315.51, 1374.13, 1352.74, 1291.38, 1376.41, 1352.66, 1305.65, 1312, 1328.8, 1383.26, 1369.94], 'YTD': [906.36, 958.97, 1033.17, 1095.49, 1164.83, 1196.73, 1175.22, 1142.74, 1023.16, 1077.4, 1076.35, 1093.35, 1312.94, 1402.81, 1592.17, 1583.48, 1600.84, 1486.33, 1662.98, 1689.89, 1473.04, 1563.7, 1313.32, 1272.81, 1376.41, 1369.94], '6M': [1076.67, 1183.15, 1155.99, 1155.93, 1204.1, 1142.74, 1023.16, 1052.59, 1068.85, 1053.01, 1180.03, 1372.23, 1490.86, 1632.06, 1583.48, 1600.84, 1550.02, 1589.81, 1542.39, 1559.18, 1652.29, 1423.76, 1382.36, 1315.51, 1352.66, 1369.94], '1Y': [719.98, 724.37, 802.78, 840.56, 844.8, 850.64, 827.56, 857.87, 857.02, 914.27, 920.64, 945.49, 968.25, 1028.67, 1086.36, 957.87, 954.71, 856.96, 908.61, 958.02, 962.95, 951.36, 943.55, 906.36, 959.09, 1009.54, 1063.74, 1124.15, 1229.82, 1171.47, 1190.06, 1142.58, 1023.16, 1052.59, 1068.85, 1053.01, 1180.03, 1372.23, 1490.86, 1587.57, 1573.3, 1661.1, 1486.33, 1662.98, 1624.99, 1559.18, 1652.29, 1423.76, 1382.36, 1315.51, 1352.66, 1369.94] },
      velocityScore: { '1D': -1.4, '1W': 3.6, '1M': 4.4, '6M': null }, isNew: false,
      marketCap: '$67B', pe: 98.1, revenueGrowth: 26, eps: 13.97, grossMargin: 55, dividendYield: 0.58,
      etfPresence: { SOXX: 3.39, PSI: false, XSD: 2.32, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.57, proScore: 1.28, coverage: 0.5,
      price: 172.75, weeklyPrices: [170.61, 171.78, 170.32, 173.50, 172.75], weeklyChange: 1.25, dayChange: -0.43, sortRank: 0, periodReturns: { '1M': -22.1, 'YTD': 1, '6M': 9.5, '1Y': 9.3 },
      priceHistory: { '1D': [173.5, 171.32, 172.75], '1W': [170.61, 171.78, 170.32, 173.5, 172.75], '1M': [221.9, 204.13, 197.41, 204.9, 189.39, 188.72, 184.79, 181.92, 176.25, 186.48, 186.56, 191.11, 189.16, 183.98, 178.1, 177.98, 170.61, 171.78, 170.32, 173.5, 172.75], 'YTD': [171.05, 177.78, 159.42, 153.04, 147.18, 141.04, 141.27, 142.36, 135.69, 129.39, 128.35, 128.78, 127.51, 134.47, 133.95, 177.01, 219.09, 203.64, 248.82, 250.01, 191.2, 226.11, 189.39, 182.97, 178.1, 172.75], '6M': [157.8, 152.22, 136.3, 138.47, 142.88, 142.36, 135.69, 129.82, 129.9, 127.11, 125.73, 131.24, 137.52, 148.85, 177.01, 219.09, 201.49, 238.16, 228.99, 217.77, 220.81, 204.13, 184.79, 186.56, 177.98, 172.75], '1Y': [157.99, 162.08, 146.71, 153.73, 156.25, 159.17, 157.28, 158.66, 164.14, 169.53, 166.36, 165.46, 161.74, 168.83, 181.03, 172.84, 173.98, 165.06, 163.3, 175.07, 176, 176.12, 174.75, 171.05, 181.87, 161.39, 155.82, 151.59, 137.34, 140.7, 140.41, 141.03, 135.69, 129.82, 129.9, 127.11, 125.73, 131.24, 137.52, 150.26, 168.38, 237.53, 203.64, 248.82, 240.84, 217.77, 220.81, 204.13, 184.79, 186.56, 177.98, 172.75] },
      velocityScore: { '1D': -3.8, '1W': 0, '1M': -9.9, '6M': null }, isNew: false,
      marketCap: '$182B', pe: 18.6, revenueGrowth: -4, eps: 9.3, grossMargin: 55, dividendYield: 2.12,
      etfPresence: { SOXX: 2.88, PSI: false, XSD: 2.25, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 2.36, proScore: 1.18, coverage: 0.5,
      price: 319.97, weeklyPrices: [319.74, 303.62, 309.09, 319.79, 319.97], weeklyChange: 0.07, dayChange: 0.06, sortRank: 0, periodReturns: { '1M': -27.2, 'YTD': 92.3, '6M': 81.4, '1Y': 173.7 },
      priceHistory: { '1D': [319.79, 312.38, 319.97], '1W': [319.74, 303.62, 309.09, 319.79, 319.97], '1M': [439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42, 432.74, 393.16, 417.45, 412.97, 362.05, 361.78, 350.62, 319.74, 303.62, 309.09, 319.79, 319.97], 'YTD': [166.36, 162.61, 182, 170.93, 158.52, 143.71, 132.62, 118.83, 119.2, 127.48, 123.87, 109.6, 125.46, 170.81, 197.54, 202.68, 199.79, 215.58, 318.72, 363.54, 330.86, 417.07, 391.74, 382.89, 361.78, 319.97], '6M': [176.35, 160.46, 142.82, 126.58, 129.68, 118.83, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 212.84, 202.68, 199.79, 232.68, 306.88, 320.09, 346.33, 389.2, 397.02, 483.02, 393.16, 350.62, 319.97], '1Y': [116.91, 118.41, 135.54, 192, 171.06, 178.56, 176.61, 214.49, 238.79, 230.11, 195.8, 212.1, 161.55, 157.51, 168.25, 179.31, 167.55, 139.52, 144.78, 152.5, 167.08, 144.94, 168.83, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 215.58, 318.72, 355.76, 346.33, 389.2, 397.02, 483.02, 393.16, 350.62, 319.97] },
      velocityScore: { '1D': -1.7, '1W': -8.5, '1M': -9.2, '6M': null }, isNew: false,
      marketCap: '$55B', pe: 217.7, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.32, PSI: false, XSD: 2.4, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.33, proScore: 1.16, coverage: 0.5,
      price: 82.64, weeklyPrices: [81.68, 80.96, 80.51, 83.38, 82.64], weeklyChange: 1.18, dayChange: -0.89, sortRank: 0, periodReturns: { '1M': -19.5, 'YTD': 29.7, '6M': 9.5, '1Y': 9.8 },
      priceHistory: { '1D': [83.38, 81.86, 82.64], '1W': [81.68, 80.96, 80.51, 83.38, 82.64], '1M': [102.71, 93.26, 92.48, 94.12, 87.93, 89.06, 91.2, 88.69, 84.64, 87.59, 85.49, 88.26, 88.59, 84.23, 87.11, 86.26, 81.68, 80.96, 80.51, 83.38, 82.64], 'YTD': [63.72, 75.22, 74.7, 75.16, 76.66, 80.75, 77.16, 74.64, 64.77, 63.83, 64.34, 64.61, 70.73, 76.87, 90.64, 93.95, 99.09, 92.76, 98.05, 96.55, 87.91, 99.77, 87.93, 84.15, 87.11, 82.64], '6M': [75.47, 79.36, 78.04, 78.92, 77.73, 74.64, 64.77, 61.94, 62.97, 62, 67.22, 73.55, 80.39, 89.44, 93.95, 99.09, 93.85, 93.43, 91.52, 91.37, 100.32, 93.26, 91.2, 85.49, 86.26, 82.64], '1Y': [75.26, 70.68, 67.13, 64.5, 64.71, 67.62, 63.28, 64.76, 64.45, 64.71, 64.22, 64.96, 64.6, 67.52, 63.64, 59.5, 54.71, 50.87, 51.83, 63.61, 66.85, 65.9, 65.35, 63.72, 73.53, 74.45, 74.71, 75.92, 76.01, 78.56, 76.6, 74.31, 64.77, 61.94, 62.97, 62, 67.22, 73.55, 80.39, 86.84, 95.3, 99.03, 92.76, 98.05, 96.96, 91.37, 100.32, 93.26, 91.2, 85.49, 86.26, 82.64] },
      velocityScore: { '1D': -2.5, '1W': -1.7, '1M': -1.7, '6M': null }, isNew: false,
      marketCap: '$45B', pe: 375.6, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 2.18,
      etfPresence: { SOXX: 2.3, PSI: false, XSD: 2.36, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.13, proScore: 1.07, coverage: 0.5,
      price: 222.71, weeklyPrices: [207.97, 202.68, 212.07, 223.87, 222.71], weeklyChange: 7.09, dayChange: -0.52, sortRank: 0, periodReturns: { '1M': -26.4, 'YTD': 54.8, '6M': 64.8, '1Y': 139.7 },
      priceHistory: { '1D': [223.87, 221.88, 222.71], '1W': [207.97, 202.68, 212.07, 223.87, 222.71], '1M': [302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 265.55, 258.69, 265.65, 257.79, 236.88, 236.18, 226.74, 207.97, 202.68, 212.07, 223.87, 222.71], 'YTD': [143.89, 150.42, 150.97, 129.57, 111.31, 128.4, 130.66, 112.27, 109.83, 116.88, 105.1, 93.87, 110.21, 158.93, 185.54, 184.38, 188.51, 156.27, 221.64, 214.6, 237.68, 271.83, 238, 246.4, 236.18, 222.71], '6M': [135.1, 129.47, 98.06, 121.78, 124.06, 112.27, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 195.04, 184.38, 188.51, 172.17, 218.41, 226.1, 222.27, 259.41, 272.01, 271.95, 258.69, 226.74, 222.71], '1Y': [92.93, 109.38, 110.29, 125.38, 106.3, 120.1, 124.77, 149.03, 164.42, 162.26, 145.61, 137.2, 129.75, 144.17, 162.18, 164.23, 158.5, 139.56, 154.18, 189.19, 170.29, 140.34, 147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 156.27, 221.64, 229, 222.27, 259.41, 272.01, 271.95, 258.69, 226.74, 222.71] },
      velocityScore: { '1D': 0.9, '1W': -1.8, '1M': -1.8, '6M': null }, isNew: false,
      marketCap: '$42B', pe: 88.7, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 1.92, PSI: false, XSD: 2.34, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 1.94, proScore: 0.97, coverage: 0.5,
      price: 90.08, weeklyPrices: [88.12, 87.37, 86.70, 91.06, 90.08], weeklyChange: 2.22, dayChange: -1.08, sortRank: 0, periodReturns: { '1M': -31.5, 'YTD': 66.4, '6M': 42.8, '1Y': 44.2 },
      priceHistory: { '1D': [91.06, 89.6, 90.08], '1W': [88.12, 87.37, 86.7, 91.06, 90.08], '1M': [131.55, 117.06, 115.74, 118.74, 90.65, 88.57, 94.54, 94.63, 91.22, 94.69, 93.79, 97.87, 95.96, 90.37, 93.73, 92.54, 88.12, 87.37, 86.7, 91.06, 90.08], 'YTD': [54.15, 62.16, 60.33, 62.63, 59.43, 71.18, 68.09, 66.48, 56.87, 59.88, 59.89, 61.92, 68.38, 79.93, 97.78, 103.03, 103.2, 109.43, 127, 133.93, 110.17, 121.62, 90.65, 91.1, 93.73, 90.08], '6M': [63.07, 62.2, 63.1, 70.63, 69.11, 66.48, 56.87, 58.55, 59.26, 58.35, 63.49, 71.02, 85.56, 98.4, 103.03, 103.2, 113.11, 116.2, 120.92, 120.9, 125.9, 117.06, 94.54, 93.79, 92.54, 90.08], '1Y': [62.45, 58.38, 47.24, 50.01, 49.77, 50.99, 47.79, 48.62, 49.56, 50.42, 49.31, 48.17, 49.54, 55.08, 51.8, 48.28, 48.43, 45.56, 48.31, 57.15, 55.23, 54.56, 55.69, 54.15, 60.89, 60.28, 61.98, 59.89, 65.2, 72.21, 69.47, 66.48, 56.87, 58.55, 59.26, 58.35, 63.49, 71.02, 85.56, 98.04, 102.04, 107.24, 109.43, 127, 128.64, 120.9, 125.9, 117.06, 94.54, 93.79, 92.54, 90.08] },
      velocityScore: { '1D': -1, '1W': 0, '1M': -11.8, '6M': null }, isNew: false,
      marketCap: '$35B', pe: 66.2, revenueGrowth: 5, eps: 1.36, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 1.84, PSI: false, XSD: 2.05, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.49, proScore: 0.75, coverage: 0.5,
      price: 280.16, weeklyPrices: [275.49, 267.36, 269.80, 283.03, 280.16], weeklyChange: 1.7, dayChange: -1.01, sortRank: 0, periodReturns: { '1M': -29.3, 'YTD': 63.6, '6M': 24.9, '1Y': 104.9 },
      priceHistory: { '1D': [283.03, 277.02, 280.16], '1W': [275.49, 267.36, 269.8, 283.03, 280.16], '1M': [396.26, 372.15, 373.08, 390.19, 369.18, 372.59, 380.37, 350.63, 322.26, 327.64, 305.23, 317.35, 308.52, 294.24, 301.76, 293.02, 275.49, 267.36, 269.8, 283.03, 280.16], 'YTD': [171.28, 174.87, 220.68, 219.2, 226.71, 236.94, 242.56, 248.12, 207.51, 224.92, 229.26, 222.07, 247, 261.42, 284.4, 284.18, 359.88, 356.25, 409.68, 390.34, 354.4, 391.41, 369.18, 304.82, 301.76, 280.16], '6M': [224.29, 227.73, 227.8, 238.99, 243.59, 248.12, 207.51, 217.8, 218.96, 225.44, 233.04, 263.63, 281.08, 287.64, 284.18, 359.88, 375.6, 385.98, 353.79, 361.86, 384.77, 372.15, 380.37, 305.23, 293.02, 280.16], '1Y': [136.76, 140.02, 137.28, 125.45, 121, 128.33, 130.17, 129.79, 131.18, 128.8, 124.49, 127.97, 131.54, 139.41, 147.88, 144.13, 169.98, 158.22, 165.88, 183.46, 188.08, 175.69, 176.28, 171.28, 167.66, 218.93, 219.26, 219.06, 235.87, 244.16, 245.53, 258.54, 207.51, 217.8, 218.96, 225.44, 233.04, 263.63, 281.08, 279.44, 291.72, 365.88, 356.25, 409.68, 382.35, 361.86, 384.77, 372.15, 380.37, 305.23, 293.02, 280.16] },
      velocityScore: { '1D': 0, '1W': -2.6, '1M': -13.8, '6M': null }, isNew: false,
      marketCap: '$21B', pe: 119.2, revenueGrowth: 23, eps: 2.35, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.01, PSI: false, XSD: 1.98, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SWKS', name: 'SKYWORKS SOLUTIONS INC', easyScore: 2, avgWeight: 1.35, proScore: 0.68, coverage: 0.5,
      price: 62.65, weeklyPrices: [57.63, 59.35, 59.80, 62.95, 62.65], weeklyChange: 8.71, dayChange: -0.48, sortRank: 0, periodReturns: { '1M': -17.8, 'YTD': -1.2, '6M': 5, '1Y': -14.6 },
      priceHistory: { '1D': [62.95, 62.38, 62.65], '1W': [57.63, 59.35, 59.8, 62.95, 62.65], '1M': [76.18, 73.44, 71.4, 69.94, 68, 67.71, 67.8, 65.93, 62.56, 61.91, 58.49, 59.95, 60.38, 58.24, 56.58, 57.51, 57.63, 59.35, 59.8, 62.95, 62.65], 'YTD': [63.41, 60.17, 57.77, 60.05, 55.93, 63.68, 59.22, 59.58, 54.81, 54.54, 54.49, 53.55, 56.54, 58.7, 61.55, 69.4, 66.78, 70.35, 83.42, 80.66, 70.29, 72.45, 68, 59.76, 56.58, 62.65], '6M': [59.67, 55.79, 60.92, 60.73, 60.05, 59.58, 54.81, 54.74, 54.44, 53.65, 55.97, 56.5, 59.46, 63.65, 69.4, 66.78, 68.53, 82.42, 75.49, 75.37, 76.26, 73.44, 67.8, 58.49, 57.51, 62.65], '1Y': [73.38, 71.94, 67.63, 71.69, 74.93, 75.67, 73.56, 75.06, 74.22, 81.26, 76.98, 74.34, 72.77, 76.4, 80.26, 71.99, 68.85, 62.32, 63.51, 69.37, 68.54, 66.02, 64.48, 63.41, 60.66, 58.46, 58.96, 55.76, 62.1, 62.1, 59.78, 58.93, 54.81, 54.74, 54.44, 53.65, 55.97, 56.5, 59.46, 62.12, 68.85, 70.13, 70.35, 83.42, 79.12, 75.37, 76.26, 73.44, 67.8, 58.49, 57.51, 62.65] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 26.1, revenueGrowth: -1, eps: 2.4, grossMargin: 41, dividendYield: 4.51,
      etfPresence: { SOXX: 0.49, PSI: false, XSD: 2.22, DRAM: false },
      tonyNote: 'SKYWORKS SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 9, avgWeight: 5.83, proScore: 3.09, coverage: 0.529,
      price: 206.86, weeklyPrices: [207.40, 202.81, 203.28, 207.29, 206.86], weeklyChange: -0.26, dayChange: -0.21, sortRank: 0, periodReturns: { '1M': -0.9, 'YTD': 10.9, '6M': 11.9, '1Y': 23.8 },
      priceHistory: { '1D': [207.29, 205.7, 206.86], '1W': [207.4, 202.81, 203.28, 207.29, 206.86], '1M': [208.65, 200.04, 199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 204.12, 202.78, 210.96, 203.53, 211.8, 212.5, 207.4, 202.81, 203.28, 207.29, 206.86], 'YTD': [186.5, 184.86, 186.23, 188.52, 180.34, 190.05, 187.9, 177.19, 177.82, 183.22, 175.64, 174.4, 182.08, 198.35, 199.64, 198.45, 215.2, 222.32, 214.86, 214.75, 200.42, 210.69, 192.53, 196.93, 211.8, 206.86], '6M': [184.84, 192.51, 171.88, 186.94, 189.82, 177.19, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 208.27, 198.45, 215.2, 225.32, 215.33, 224.36, 208.64, 212.45, 200.04, 200.09, 204.12, 212.5, 206.86], '1Y': [167.03, 175.51, 178.26, 183.16, 175.64, 181.77, 170.62, 170.76, 174.88, 178.43, 186.58, 185.04, 180.03, 181.16, 201.03, 198.69, 193.16, 181.36, 177.82, 179.59, 184.97, 177.72, 189.21, 186.5, 185.04, 187.05, 187.67, 191.13, 185.41, 182.81, 191.55, 182.48, 177.82, 180.25, 172.7, 167.52, 177.64, 189.31, 202.06, 216.61, 198.48, 219.44, 222.32, 214.86, 222.82, 208.64, 212.45, 200.04, 200.09, 204.12, 212.5, 206.86] },
      velocityScore: { '1D': -0.6, '1W': 14.9, '1M': -6.4, '6M': null }, isNew: false,
      marketCap: '$5.0T', pe: 31.7, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.48,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.09, GTEK: false, ARKK: 1.69, MARS: false, FRWD: 9.26, BCTK: 6.4, FWD: 3.14, CBSE: 3.01, FCUS: false, WGMI: 2.44, CNEQ: 13.97, SGRT: false, SPMO: 8.49, XMMO: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 8, avgWeight: 5.69, proScore: 2.68, coverage: 0.471,
      price: 954.15, weeklyPrices: [853.20, 848.95, 865.46, 970.82, 954.15], weeklyChange: 11.83, dayChange: -1.72, sortRank: 0, periodReturns: { '1M': -21.2, 'YTD': 234.3, '6M': 140, '1Y': 773.6 },
      priceHistory: { '1D': [970.82, 946.62, 954.15], '1W': [853.2, 848.95, 865.46, 970.82, 954.15], '1M': [1211.38, 1051.77, 1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 948.8, 991.64, 979.3, 937, 983.12, 904.28, 853.2, 848.95, 865.46, 970.82, 954.15], 'YTD': [285.41, 345.09, 362.75, 410.24, 419.44, 410.34, 417.35, 412.37, 370.3, 441.8, 404.35, 337.84, 406.73, 457.23, 481.72, 542.21, 746.81, 681.54, 895.88, 1079.57, 891.88, 1133.99, 1132.33, 938.38, 983.12, 954.15], '6M': [397.58, 435.79, 382.89, 413.97, 428.17, 412.37, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 496.72, 542.21, 746.81, 724.66, 751, 1035.5, 949.28, 1087.99, 1051.77, 1154.29, 948.8, 904.28, 954.15], '1Y': [109.22, 111.96, 109.06, 127.75, 122.05, 116.5, 118.72, 135.24, 158.82, 166.41, 167.32, 185.69, 187.06, 202.29, 221.91, 218.03, 241.11, 228.5, 224.53, 234.16, 252.42, 232.51, 276.27, 285.41, 327.02, 336.63, 399.65, 414.88, 394.69, 411.66, 420.97, 412.67, 370.3, 426.13, 422.9, 357.22, 377.76, 426.56, 448.42, 524.56, 576.45, 795.33, 681.54, 895.88, 1064.1, 949.28, 1087.99, 1051.77, 1154.29, 948.8, 904.28, 954.15] },
      velocityScore: { '1D': 0.8, '1W': -3.6, '1M': -10.1, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 21.6, revenueGrowth: 346, eps: 44.27, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { PTF: 5.03, WCLD: false, IGV: false, FDTX: 9.33, GTEK: false, ARKK: false, MARS: false, FRWD: 4.05, BCTK: 4.1, FWD: false, CBSE: false, FCUS: 4.17, WGMI: false, CNEQ: 2.64, SGRT: 6.43, SPMO: 9.8, XMMO: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 8, avgWeight: 3.65, proScore: 1.72, coverage: 0.471,
      price: 543.13, weeklyPrices: [500.94, 495.76, 503.57, 544.43, 543.13], weeklyChange: 8.42, dayChange: -0.24, sortRank: 0, periodReturns: { '1M': -1.5, 'YTD': 153.6, '6M': 114.1, '1Y': 251 },
      priceHistory: { '1D': [544.43, 537.21, 543.13], '1W': [500.94, 495.76, 503.57, 544.43, 543.13], '1M': [551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 517.41, 546.72, 557.89, 534.39, 548.13, 529.14, 500.94, 495.76, 503.57, 544.43, 543.13], 'YTD': [214.16, 203.17, 231.83, 252.03, 242.11, 213.58, 203.37, 200.21, 192.43, 196.58, 202.68, 203.43, 231.82, 278.26, 305.33, 360.54, 455.19, 420.99, 503.89, 542.52, 452.4, 537.37, 521.58, 516.11, 548.13, 543.13], '6M': [253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 347.81, 360.54, 455.19, 424.1, 467.51, 510.13, 490.33, 547.26, 519.85, 580.91, 517.41, 529.14, 543.13], '1Y': [154.72, 177.44, 174.31, 174.95, 166.55, 166.62, 162.13, 155.82, 160.46, 160.9, 161.79, 211.51, 218.09, 238.03, 258.01, 250.05, 237.52, 230.29, 206.13, 217.6, 221.62, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 503.89, 521.54, 490.33, 547.26, 519.85, 580.91, 517.41, 529.14, 543.13] },
      velocityScore: { '1D': 0.6, '1W': 5.5, '1M': 4.2, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 181.6, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: 3.15, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.17, MARS: false, FRWD: 7.38, BCTK: 3.34, FWD: 2.3, CBSE: false, FCUS: false, WGMI: false, CNEQ: 1.26, SGRT: 3.46, SPMO: 4.16, XMMO: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 7, avgWeight: 4.73, proScore: 1.95, coverage: 0.412,
      price: 544.82, weeklyPrices: [466.81, 477.22, 487.42, 548.39, 544.82], weeklyChange: 16.71, dayChange: -0.65, sortRank: 0, periodReturns: { '1M': -25.6, 'YTD': 216.3, '6M': 123.9, '1Y': 712.4 },
      priceHistory: { '1D': [548.39, 534.21, 544.82], '1W': [466.81, 477.22, 487.42, 548.39, 544.82], '1M': [732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 550.3, 578.05, 582.59, 555.55, 563.32, 513.84, 466.81, 477.22, 487.42, 548.39, 544.82], 'YTD': [172.27, 200.46, 221.51, 252.66, 290.24, 273.74, 284.67, 279.7, 245.25, 286.21, 294.79, 270.49, 338.78, 361.69, 403.12, 431.52, 480, 458.68, 524.65, 594.11, 490.09, 746.23, 586.45, 532.1, 563.32, 544.82], '6M': [243.29, 278.41, 260.19, 284.1, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 404, 431.52, 480, 482.02, 484.28, 546.2, 526.93, 653.53, 670.75, 638.72, 550.3, 513.84, 544.82], '1Y': [67.06, 70.61, 75.84, 75.91, 75.86, 79.71, 86, 94.54, 103.09, 110.25, 120.06, 119.93, 113.13, 121.41, 124.92, 152.18, 169.99, 152.86, 155.41, 155.59, 169.54, 174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 458.68, 524.65, 563.1, 526.93, 653.53, 670.75, 638.72, 550.3, 513.84, 544.82] },
      velocityScore: { '1D': 1.6, '1W': -1, '1M': -16.7, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 32.6, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { PTF: 4.34, WCLD: false, IGV: false, FDTX: 4.49, GTEK: false, ARKK: false, MARS: false, FRWD: 4.07, BCTK: false, FWD: false, CBSE: false, FCUS: 3.94, WGMI: false, CNEQ: 4.58, SGRT: 10.01, SPMO: 1.66, XMMO: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 7, avgWeight: 4.34, proScore: 1.79, coverage: 0.412,
      price: 418, weeklyPrices: [409.74, 398.37, 402.30, 424.61, 418.00], weeklyChange: 2.02, dayChange: -1.52, sortRank: 0, periodReturns: { '1M': -10.6, 'YTD': 37.5, '6M': 27.7, '1Y': 78.2 },
      priceHistory: { '1D': [424.44, 416.89, 418], '1W': [409.74, 398.37, 402.3, 424.61, 418], '1M': [467.67, 436.39, 440.83, 434.99, 432.35, 455.1, 477.57, 444.23, 434.16, 451.79, 436.98, 436.96, 434.11, 421.58, 420.39, 419.48, 409.74, 398.37, 402.3, 424.61, 418], 'YTD': [303.89, 323.63, 342.4, 338.34, 335.75, 374.09, 360.39, 374.58, 338.89, 340.23, 338.45, 337.95, 365.9, 363.35, 382.66, 397.67, 411.68, 395.95, 412.32, 436.69, 408.75, 462.12, 432.35, 432.57, 420.39, 418], '6M': [327.37, 339.55, 330.73, 368.1, 370.54, 374.58, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 402.46, 397.67, 411.68, 404.35, 404.52, 435.63, 426.8, 441.4, 436.39, 477.57, 436.98, 419.48, 418], '1Y': [234.6, 241.33, 232.47, 244.29, 232.7, 238.72, 231.39, 250.92, 262.06, 282.71, 279.29, 294.03, 295.94, 294.51, 301.53, 294.05, 291.17, 277.91, 284.68, 295.45, 303.41, 286.87, 296.95, 303.89, 318.01, 341.64, 334.87, 330.56, 348.85, 366.36, 370.04, 369.11, 338.89, 338.31, 329.24, 326.74, 341.76, 369.57, 366.24, 404.98, 401.61, 404.54, 395.95, 412.32, 446.69, 426.8, 441.4, 436.39, 477.57, 436.98, 419.48, 418] },
      velocityScore: { '1D': 0.6, '1W': -0.6, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$2.2T', pe: 36.3, revenueGrowth: 36, eps: 11.51, grossMargin: 64, dividendYield: 0.89,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6.39, GTEK: false, ARKK: 0.94, MARS: false, FRWD: 5.89, BCTK: 8.39, FWD: false, CBSE: 2.44, FCUS: false, WGMI: 0.67, CNEQ: 5.69, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 7, avgWeight: 3.98, proScore: 1.64, coverage: 0.412,
      price: 384.33, weeklyPrices: [374.45, 370.83, 378.16, 386.50, 384.33], weeklyChange: 2.64, dayChange: -0.56, sortRank: 0, periodReturns: { '1M': -2, 'YTD': 11, '6M': 18.1, '1Y': 38 },
      priceHistory: { '1D': [386.5, 381.31, 384.33], '1W': [374.45, 370.83, 378.16, 386.5, 384.33], '1M': [392.13, 380.15, 382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 388.69, 401.11, 399.97, 384.05, 389.11, 394.28, 374.45, 370.83, 378.16, 386.5, 384.33], 'YTD': [346.1, 344.97, 351.71, 332.79, 320.33, 342.76, 333.99, 319.55, 330.48, 324.92, 322.51, 309.51, 350.63, 398.47, 419.94, 421.28, 430, 420.71, 422.01, 479.23, 372.1, 411.35, 365.02, 370.78, 389.11, 384.33], '6M': [325.49, 330.73, 310.51, 331.17, 332.65, 319.55, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 422.76, 421.28, 430, 425.19, 414.14, 459.97, 396.6, 393.94, 380.15, 377.75, 388.69, 394.28, 384.33], '1Y': [278.59, 297.42, 292.93, 312.83, 294.91, 298.01, 302.39, 336.67, 360, 338.94, 329.91, 336.41, 344.13, 342.66, 372.97, 351.94, 351.96, 340.5, 385.03, 380.61, 406.29, 341.3, 349.32, 346.1, 332.48, 343.02, 320.05, 331.3, 332.92, 325.17, 330.34, 318.82, 330.48, 322.16, 310.51, 300.68, 314.43, 379.75, 399.63, 418.2, 416.5, 428.43, 420.71, 422.01, 481.57, 396.6, 393.94, 380.15, 377.75, 388.69, 394.28, 384.33] },
      velocityScore: { '1D': 0, '1W': 1.2, '1M': 3.8, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 64.2, revenueGrowth: 48, eps: 5.99, grossMargin: 76, dividendYield: 0.67,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.62, GTEK: false, ARKK: 1.13, MARS: false, FRWD: 4.97, BCTK: 7.11, FWD: 2.52, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.91, SGRT: false, SPMO: 6.58, XMMO: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'SPCX', name: 'SPACE EXPLORATION TECHN-CL A', easyScore: 6, avgWeight: 6.39, proScore: 2.25, coverage: 0.353,
      price: 123.05, weeklyPrices: [131.11, 123.99, 119.85, 123.54, 123.05], weeklyChange: -6.15, dayChange: -0.4, sortRank: 0, periodReturns: { '1M': -20.4, 'YTD': -23.6, '6M': -23.6, '1Y': -23.6 },
      priceHistory: { '1D': [123.54, 122.38, 123.05], '1W': [131.11, 123.99, 119.85, 123.54, 123.05], '1M': [154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 148.3, 152.16, 145.3, 139.14, 136.08, 135.27, 131.11, 123.99, 119.85, 123.54, 123.05], 'YTD': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 160.42, 149.47, 148.3, 152.16, 145.3, 139.14, 136.08, 135.27, 131.11, 123.99, 119.85, 123.54, 123.05], '6M': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 160.42, 149.47, 148.3, 152.16, 145.3, 139.14, 136.08, 135.27, 131.11, 123.99, 119.85, 123.54, 123.05], '1Y': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 148.3, 152.16, 145.3, 139.14, 136.08, 135.27, 131.11, 123.99, 119.85, 123.54, 123.05] },
      velocityScore: { '1D': -0.9, '1W': -3.8, '1M': -18.2, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: null, revenueGrowth: 15, eps: -0.67, grossMargin: 49, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.47, MARS: 21.21, FRWD: 2.06, BCTK: 7.04, FWD: 1.35, CBSE: false, FCUS: false, WGMI: false, CNEQ: 2.19, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'SPACE EXPLORATION TECHN-CL A appears in 6 of 17 Broad Tech ETFs (35% coverage) with average weight 6.4% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 6, avgWeight: 3.3, proScore: 1.17, coverage: 0.353,
      price: 245, weeklyPrices: [249.89, 247.23, 249.99, 247.55, 245.00], weeklyChange: -1.96, dayChange: -1.03, sortRank: 0, periodReturns: { '1M': 5.2, 'YTD': 6.1, '6M': 4.5, '1Y': 7.7 },
      priceHistory: { '1D': [247.55, 246.36, 245], '1W': [249.89, 247.23, 249.99, 247.55, 245], '1M': [232.79, 234.11, 234.27, 227.01, 232.69, 240.14, 238.34, 241.7, 242.67, 244.16, 243.62, 247.04, 245.34, 247.31, 247.49, 254.96, 249.89, 247.23, 249.99, 247.55, 245], 'YTD': [230.82, 247.38, 239.12, 244.68, 238.62, 204.08, 204.86, 210, 213.21, 211.74, 210.14, 208.27, 221.25, 249.7, 255.08, 268.26, 272.68, 264.86, 265.29, 250.02, 238, 244.39, 232.69, 245.98, 247.49, 245], '6M': [234.34, 241.73, 222.69, 199.6, 210.11, 210, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 263.99, 268.26, 272.68, 264.14, 266.32, 261.26, 245.22, 246.02, 234.11, 238.34, 243.62, 254.96, 245], '1Y': [227.47, 231.01, 213.75, 221.47, 228.01, 228.71, 225.99, 238.24, 234.05, 220.71, 219.57, 221.78, 216.39, 222.03, 229.25, 249.32, 249.1, 222.55, 229.67, 232.38, 227.92, 222.56, 232.14, 230.82, 246.29, 238.18, 239.16, 239.3, 210.32, 198.79, 205.27, 208.39, 213.21, 207.67, 205.37, 199.34, 212.79, 239.89, 248.28, 261.12, 272.05, 268.99, 264.86, 265.29, 256.52, 245.22, 246.02, 234.11, 238.34, 243.62, 254.96, 245] },
      velocityScore: { '1D': -0.8, '1W': 23.2, '1M': 34.5, '6M': null }, isNew: false,
      marketCap: '$2.6T', pe: 29.3, revenueGrowth: 17, eps: 8.37, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.29, GTEK: false, ARKK: 2.52, MARS: false, FRWD: 3.26, BCTK: 4.68, FWD: 1.67, CBSE: false, FCUS: false, WGMI: false, CNEQ: 4.41, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc Class A', easyScore: 6, avgWeight: 2.15, proScore: 0.76, coverage: 0.353,
      price: 637.12, weeklyPrices: [664.54, 646.01, 645.85, 643.81, 637.12], weeklyChange: -4.13, dayChange: -1.04, sortRank: 0, periodReturns: { '1M': 13, 'YTD': -3.5, '6M': -1.6, '1Y': -9.6 },
      priceHistory: { '1D': [643.81, 642.47, 637.12], '1W': [664.54, 646.01, 645.85, 643.81, 637.12], '1M': [563.85, 562.2, 557.67, 542.87, 550.25, 562.6, 563.29, 612.91, 582.9, 600.29, 603.12, 631.48, 669.21, 656.73, 661.04, 681.31, 664.54, 646.01, 645.85, 643.81, 637.12], 'YTD': [660.09, 653.06, 620.25, 672.97, 691.7, 668.69, 644.78, 648.18, 644.86, 627.45, 604.06, 572.13, 612.42, 676.87, 659.15, 608.75, 609.63, 611.21, 612.34, 622.98, 570.98, 577.22, 550.25, 615.58, 661.04, 637.12], '6M': [647.63, 738.31, 670.21, 649.81, 655.66, 648.18, 644.86, 613.71, 593.66, 525.72, 573.02, 634.53, 670.91, 675.03, 608.75, 609.63, 614.23, 610.26, 600.47, 585.39, 593.48, 562.2, 563.29, 603.12, 681.31, 637.12], '1Y': [704.81, 700, 763.46, 790, 751.48, 754.1, 737.05, 765.7, 779, 755.4, 734.38, 713.08, 708.65, 733.27, 751.44, 627.32, 627.08, 597.69, 636.22, 639.6, 656.96, 657.15, 664.94, 660.09, 646.06, 620.8, 658.76, 716.5, 661.46, 639.77, 637.25, 653.56, 644.86, 613.71, 593.66, 525.72, 573.02, 634.53, 670.91, 678.62, 610.41, 598.86, 611.21, 612.34, 597.63, 585.39, 593.48, 562.2, 563.29, 603.12, 681.31, 637.12] },
      velocityScore: { '1D': -1.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.6T', pe: 23.2, revenueGrowth: 33, eps: 27.49, grossMargin: 82, dividendYield: 0.33,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.36, GTEK: false, ARKK: 1.48, MARS: false, FRWD: false, BCTK: 1.17, FWD: 1.19, CBSE: 3.16, FCUS: false, WGMI: false, CNEQ: 3.53, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 5, avgWeight: 4.26, proScore: 1.25, coverage: 0.294,
      price: 346.67, weeklyPrices: [353.81, 346.12, 351.37, 346.19, 346.67], weeklyChange: -2.02, dayChange: 0.14, sortRank: 0, periodReturns: { '1M': -0.6, 'YTD': 10.5, '6M': 4.8, '1Y': 80.5 },
      priceHistory: { '1D': [346.19, 346.95, 346.67], '1W': [353.81, 346.12, 351.37, 346.19, 346.67], '1M': [348.78, 346.08, 345.04, 342.19, 334.69, 351.28, 353.33, 357.89, 356.18, 364.9, 358.71, 356.24, 355.03, 350.67, 357.33, 370.21, 353.81, 346.12, 351.37, 346.19, 346.67], 'YTD': [313.8, 329.14, 330.34, 335, 340.7, 311.33, 303.56, 311.43, 298.3, 304.42, 299.02, 286.86, 314.74, 332.77, 337.75, 383.22, 397.05, 393.11, 384.84, 355.68, 353.32, 367.46, 334.69, 363.62, 357.33, 346.67], '6M': [330.84, 338.66, 331.33, 309.37, 314.9, 311.43, 298.3, 301.46, 298.79, 273.76, 297.66, 319.21, 335.4, 342.32, 383.22, 397.05, 393.32, 379.38, 372.58, 361.17, 367.11, 346.08, 353.33, 358.71, 370.21, 346.67], '1Y': [192.11, 196.43, 195.32, 204.16, 202.49, 207.95, 231.1, 239.94, 251.42, 252.34, 243.55, 247.13, 246.19, 251.34, 268.43, 278.06, 291.74, 284.96, 323.64, 320.62, 317.75, 307.73, 315.68, 313.8, 326.01, 333.16, 328.43, 338.53, 323.1, 306.02, 311.69, 306.36, 298.3, 301.46, 298.79, 273.76, 297.66, 319.21, 335.4, 348.52, 379.64, 386.77, 393.11, 384.84, 358.39, 361.17, 367.11, 346.08, 353.33, 358.71, 370.21, 346.67] },
      velocityScore: { '1D': -1.6, '1W': 0.8, '1M': 4.2, '6M': null }, isNew: false,
      marketCap: '$4.2T', pe: 26.4, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.21, GTEK: false, ARKK: 1.89, MARS: false, FRWD: false, BCTK: 6.71, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.82, SGRT: false, SPMO: 3.67, XMMO: false },
      tonyNote: 'Alphabet Inc Class C appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 4.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 5, avgWeight: 4.19, proScore: 1.23, coverage: 0.294,
      price: 890.24, weeklyPrices: [745.49, 787.66, 802.45, 891.83, 890.24], weeklyChange: 19.42, dayChange: -0.18, sortRank: 0, periodReturns: { '1M': -18.6, 'YTD': 223.3, '6M': 156.9, '1Y': 507.3 },
      priceHistory: { '1D': [891.83, 874.4, 890.24], '1W': [745.49, 787.66, 802.45, 891.83, 890.24], '1M': [1094.04, 1038.59, 993.25, 1025.36, 899.9, 968.53, 965, 915.19, 820.16, 868.26, 860.02, 890.09, 910.34, 860.66, 878.31, 828.3, 745.49, 787.66, 802.45, 891.83, 890.24], 'YTD': [275.39, 304.01, 326.23, 371.76, 444.45, 407.25, 408.97, 407.84, 352.8, 398.78, 404.02, 391.76, 496.3, 531.81, 587.62, 726.93, 782.64, 740.84, 845.76, 940.69, 815.99, 1070.23, 899.9, 827.64, 878.31, 890.24], '6M': [346.53, 446.57, 405.45, 431.17, 411.11, 407.84, 352.8, 383.71, 411.23, 380.07, 453.3, 513.28, 539.75, 586.25, 726.93, 782.64, 795.47, 812.73, 921.26, 876.77, 1018.8, 1038.59, 965, 860.02, 828.3, 890.24], '1Y': [146.59, 152.68, 151.74, 155.59, 157.93, 165.24, 176.32, 191.59, 211.13, 228.13, 236.06, 225.01, 211.63, 214.57, 223, 250.38, 288, 253.86, 261.89, 258.67, 282.86, 288.13, 282.8, 275.39, 284.47, 320.32, 346.1, 407.69, 429.32, 425.99, 407.4, 379.52, 352.8, 383.71, 411.23, 380.07, 453.3, 513.28, 539.75, 595.86, 738.54, 834.01, 740.84, 845.76, 926.61, 876.77, 1018.8, 1038.59, 965, 860.02, 828.3, 890.24] },
      velocityScore: { '1D': 0, '1W': -2.4, '1M': -16.9, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 84.6, revenueGrowth: 44, eps: 10.52, grossMargin: 42, dividendYield: 0.33,
      etfPresence: { PTF: 3.98, WCLD: false, IGV: false, FDTX: 4.14, GTEK: false, ARKK: false, MARS: false, FRWD: 6.96, BCTK: false, FWD: false, CBSE: false, FCUS: 4.13, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.76, XMMO: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, avgWeight: 5.3, proScore: 1.25, coverage: 0.235,
      price: 393.78, weeklyPrices: [401.10, 393.82, 402.29, 397.75, 393.78], weeklyChange: -1.82, dayChange: -1, sortRank: 0, periodReturns: { '1M': 7.2, 'YTD': -18.6, '6M': -12.7, '1Y': -22.1 },
      priceHistory: { '1D': [397.75, 395.73, 393.78], '1W': [401.1, 393.82, 402.29, 397.75, 393.78], '1M': [367.34, 373.94, 365.46, 352.83, 372.97, 368.57, 373.02, 384.28, 390.49, 386.74, 383.34, 384.36, 385.1, 390.99, 384.93, 395.63, 401.1, 393.82, 402.29, 397.75, 393.78], 'YTD': [483.62, 479.28, 459.86, 480.58, 411.21, 404.37, 398.46, 392.74, 408.96, 399.95, 383, 370.17, 374.33, 420.26, 415.75, 414.44, 415.12, 423.54, 416.03, 427.34, 397.36, 379.4, 372.97, 388.84, 384.93, 393.78], '6M': [451.14, 433.5, 393.67, 401.84, 397.23, 392.74, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.62, 414.44, 415.12, 421.92, 418.57, 460.52, 411.74, 399.76, 373.94, 373.02, 383.34, 395.63, 393.78], '1Y': [505.27, 512.57, 527.75, 529.24, 509.77, 502.04, 505.35, 498.41, 509.04, 509.23, 517.95, 523.98, 513.57, 517.66, 542.07, 514.33, 508.68, 493.79, 476.99, 477.73, 492.02, 476.39, 486.85, 483.62, 478.11, 456.66, 465.95, 430.29, 401.14, 401.32, 384.47, 398.55, 408.96, 395.55, 381.87, 356.77, 372.88, 384.37, 418.07, 424.82, 413.62, 412.66, 423.54, 416.03, 441.31, 411.74, 399.76, 373.94, 373.02, 383.34, 395.63, 393.78] },
      velocityScore: { '1D': -0.8, '1W': 5, '1M': 0.8, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 23.5, revenueGrowth: 18, eps: 16.78, grossMargin: 68, dividendYield: 0.92,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.48, FDTX: 2.93, GTEK: false, ARKK: false, MARS: false, FRWD: 3.3, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 6.49, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 4, avgWeight: 4.67, proScore: 1.1, coverage: 0.235,
      price: 335.16, weeklyPrices: [353.99, 358.68, 348.66, 342.15, 335.16], weeklyChange: -5.32, dayChange: -2.04, sortRank: 0, periodReturns: { '1M': 17, 'YTD': 82, '6M': 83.9, '1Y': 70.4 },
      priceHistory: { '1D': [342.15, 341, 335.16], '1W': [353.99, 358.68, 348.66, 342.15, 335.16], '1M': [286.4, 290.92, 285.26, 293.09, 304.2, 332, 341.02, 352.04, 348.06, 357.53, 320.59, 338.31, 325.91, 330.3, 352.89, 354.02, 353.99, 358.68, 348.66, 342.15, 335.16], 'YTD': [184.2, 189.02, 187.66, 183.5, 166.24, 165.3, 150.99, 148.92, 165.05, 167.45, 164.05, 160.32, 173.78, 166.97, 173.21, 181.08, 207.88, 247.55, 256.75, 280.43, 263.22, 287.78, 304.2, 337.04, 352.89, 335.16], '6M': [182.27, 176.2, 154.77, 162.81, 148.7, 148.92, 165.05, 167.02, 162.95, 147.02, 161.95, 162.51, 169.56, 178.54, 181.08, 207.88, 242.83, 260.58, 300.48, 266.33, 284.54, 290.92, 341.02, 320.59, 354.02, 335.16], '1Y': [196.73, 193.84, 169.09, 175.4, 181.56, 184.23, 191.53, 197.55, 201.34, 203.25, 203.62, 211.04, 207.56, 214.4, 221.38, 214.52, 218.27, 201, 186.27, 193.63, 195, 187.09, 188.12, 184.2, 190.8, 187.73, 180.18, 176.97, 159.32, 166.95, 144.14, 150.15, 165.05, 167.02, 162.95, 147.02, 161.95, 162.51, 169.56, 182.9, 184.56, 213.66, 247.55, 256.75, 297.18, 266.33, 284.54, 290.92, 341.02, 320.59, 354.02, 335.16] },
      velocityScore: { '1D': -0.9, '1W': 0.9, '1M': 22.2, '6M': null }, isNew: false,
      marketCap: '$273B', pe: 288.9, revenueGrowth: 31, eps: 1.16, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.86, IGV: 10.26, FDTX: 4.15, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.39, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 4, avgWeight: 4.52, proScore: 1.06, coverage: 0.235,
      price: 315.85, weeklyPrices: [320.96, 313.30, 306.76, 322.00, 315.85], weeklyChange: -1.59, dayChange: -1.91, sortRank: 0, periodReturns: { '1M': -22.9, 'YTD': 84.5, '6M': 43.1, '1Y': 223.3 },
      priceHistory: { '1D': [322, 314.08, 315.85], '1W': [320.96, 313.3, 306.76, 322, 315.85], '1M': [409.54, 371.33, 374.8, 401.82, 379.09, 410.91, 433.33, 391.26, 351.41, 350.2, 333.15, 353.17, 350.33, 329.92, 346.1, 335.43, 320.96, 313.3, 306.76, 322, 315.85], 'YTD': [171.18, 218.36, 222.96, 238.46, 230.1, 235.12, 237.39, 233.89, 199.33, 219.4, 233.31, 213.66, 246.49, 260.96, 258.56, 256.72, 294.05, 277.96, 322.68, 343.71, 321.8, 389.04, 379.09, 326.13, 346.1, 315.85], '6M': [220.7, 248.17, 213.31, 231.29, 244.92, 233.89, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 267.78, 256.72, 294.05, 284.72, 305.35, 317.12, 324.45, 388.92, 371.33, 433.33, 333.15, 335.43, 315.85], '1Y': [97.69, 98.94, 96.68, 105.28, 100.33, 103.63, 97.74, 105.57, 120.47, 131.93, 133.9, 140.35, 138.31, 145.04, 155.62, 155.78, 159.18, 143.24, 151.93, 159.75, 165.81, 163.26, 175.16, 171.18, 200.96, 217.47, 217.94, 233.46, 231.01, 235.53, 242.27, 231, 199.33, 212.2, 228.36, 211.41, 220.65, 267.32, 263.16, 259.47, 258.57, 296.05, 277.96, 322.68, 334.41, 324.45, 388.92, 371.33, 433.33, 333.15, 335.43, 315.85] },
      velocityScore: { '1D': -14.5, '1W': -3.6, '1M': -20.9, '6M': null }, isNew: false,
      marketCap: '$395B', pe: 59.8, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.32,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.38, BCTK: 7.18, FWD: 1.87, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 3.64, XMMO: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 4, avgWeight: 3.74, proScore: 0.88, coverage: 0.235,
      price: 128.81, weeklyPrices: [134.44, 132.38, 134.85, 132.66, 128.81], weeklyChange: -4.19, dayChange: -2.9, sortRank: 0, periodReturns: { '1M': 7.8, 'YTD': -27.5, '6M': -22.4, '1Y': -13.6 },
      priceHistory: { '1D': [132.66, 130.4, 128.81], '1W': [134.44, 132.38, 134.85, 132.66, 128.81], '1M': [119.5, 116.7, 113.5, 107.27, 112.93, 115.7, 116.67, 125.73, 129.3, 132.54, 132.22, 129.04, 126.79, 130.04, 133.72, 133.76, 134.44, 132.38, 134.85, 132.66, 128.81], 'YTD': [177.75, 177.49, 170.96, 165.7, 157.88, 135.68, 134.89, 137.19, 157.16, 152.72, 160.84, 146.28, 140.76, 142.76, 141.57, 144.07, 137.8, 135.14, 136.6, 142.2, 130.21, 128.47, 112.93, 134.37, 133.72, 128.81], '6M': [165.9, 151.86, 130.01, 129.13, 135.24, 137.19, 157.16, 150.95, 150.68, 143.06, 147.93, 132.37, 145.89, 143.09, 144.07, 137.8, 133.99, 136.88, 160.65, 136.47, 134.71, 116.7, 116.67, 132.22, 133.76, 128.81], '1Y': [149.07, 156.24, 173.27, 186.97, 157.75, 160.87, 154.9, 162.36, 170.26, 182.55, 182.42, 182.17, 179.74, 181.51, 189.6, 190.74, 190.96, 167.33, 163.55, 176.08, 181.84, 187.75, 194.13, 177.75, 176.86, 177.07, 169.6, 146.59, 135.9, 131.41, 130.6, 145.17, 157.16, 150.95, 150.68, 143.06, 147.93, 132.37, 145.89, 143.1, 146.03, 136.89, 135.14, 136.6, 152.17, 136.47, 134.71, 116.7, 116.67, 132.22, 133.76, 128.81] },
      velocityScore: { '1D': -1.1, '1W': 2.3, '1M': -1.1, '6M': null }, isNew: false,
      marketCap: '$309B', pe: 144.7, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.64, FDTX: 2, GTEK: false, ARKK: 3.08, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.23, XMMO: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'DDOG', name: 'DDOG', easyScore: 4, avgWeight: 3.1, proScore: 0.73, coverage: 0.235,
      price: 246.93, weeklyPrices: [262.32, 258.69, 263.20, 254.79, 246.93], weeklyChange: -5.87, dayChange: -3.08, sortRank: 0, periodReturns: { '1M': 11.5, 'YTD': 81.6, '6M': 88.1, '1Y': 70.4 },
      priceHistory: { '1D': [254.79, 247.81, 246.93], '1W': [262.32, 258.69, 263.2, 254.79, 246.93], '1M': [221.37, 220.57, 222.65, 220.94, 239.77, 248.57, 260.36, 264.48, 260.36, 255.37, 261.09, 269, 257.54, 260.24, 270.73, 264.46, 262.32, 258.69, 263.2, 254.79, 246.93], 'YTD': [135.99, 125.49, 119.02, 138.21, 119.66, 127.33, 120.6, 111.96, 125.75, 126.57, 129.23, 118.05, 116.5, 123.47, 127.86, 140.53, 200.16, 208.82, 223.65, 250.33, 227.63, 223, 239.77, 256.81, 270.73, 246.93], '6M': [131.25, 128.18, 106.73, 126.13, 115.66, 111.96, 125.75, 124.52, 125.08, 114.48, 116.5, 110.08, 129.74, 129.48, 140.53, 200.16, 207.98, 222.32, 277.49, 231.68, 233.09, 220.57, 260.36, 261.09, 264.46, 246.93], '1Y': [144.89, 150.27, 132.94, 128.96, 128.99, 126.31, 132.6, 140.46, 134.59, 137.49, 142.4, 154.52, 160.88, 156.25, 157.27, 157.51, 197.86, 176.46, 158.99, 155.83, 152.57, 140.05, 141.23, 135.99, 130.68, 120.86, 130.13, 129.32, 111.69, 125.2, 102.61, 111.11, 125.75, 124.52, 125.08, 114.48, 116.5, 110.08, 129.74, 132.66, 146.69, 202.32, 208.82, 223.65, 269.13, 231.68, 233.09, 220.57, 260.36, 261.09, 264.46, 246.93] },
      velocityScore: { '1D': 0, '1W': 1.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$88B', pe: 649.8, revenueGrowth: 32, eps: 0.38, grossMargin: 80, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.78, IGV: 3.14, FDTX: 2.39, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: 4.09, SPMO: false, XMMO: false },
      tonyNote: 'DDOG appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 3.1, proScore: 0.73, coverage: 0.235,
      price: 121.67, weeklyPrices: [125.06, 123.56, 124.48, 123.03, 121.67], weeklyChange: -2.71, dayChange: -1.1, sortRank: 0, periodReturns: { '1M': 12.7, 'YTD': -24.4, '6M': -11.6, '1Y': -1.6 },
      priceHistory: { '1D': [123.03, 121.5, 121.67], '1W': [125.06, 123.56, 124.48, 123.03, 121.67], '1M': [107.98, 107.68, 114.17, 111.62, 116.86, 114.21, 114.18, 121.63, 119.46, 120.14, 119.22, 123.17, 122.54, 124.74, 125.68, 123.55, 125.06, 123.56, 124.48, 123.03, 121.67], 'YTD': [160.97, 164.48, 155.81, 137.5, 119.29, 118.71, 123.8, 120.73, 130.2, 126.58, 121.1, 118.62, 120.1, 126.94, 124.23, 127.67, 110.41, 102.39, 104.9, 112.94, 108.2, 108.85, 116.86, 121.88, 125.68, 121.67], '6M': [137.64, 143.64, 111.24, 110.66, 126.2, 120.73, 130.2, 122.96, 116.78, 111.85, 118.8, 114.97, 135.14, 125.83, 127.67, 110.41, 100.28, 103, 124.12, 110.78, 112.49, 107.68, 114.18, 119.22, 123.55, 121.67], '1Y': [123.71, 124.85, 127, 149.3, 139.25, 140.85, 140.22, 143.44, 147.21, 149.94, 148.61, 161.28, 152.88, 162.64, 178.96, 160.94, 158.94, 140.45, 157.37, 160, 159.89, 163.14, 169.53, 160.97, 168.28, 157.99, 137.89, 131.23, 112.05, 112.7, 117.28, 119.38, 130.2, 122.96, 116.78, 111.85, 118.8, 114.97, 135.14, 124.23, 127.55, 102.54, 102.39, 104.9, 117.01, 110.78, 112.49, 107.68, 114.18, 119.22, 123.55, 121.67] },
      velocityScore: { '1D': -1.4, '1W': 1.4, '1M': 10.6, '6M': null }, isNew: false,
      marketCap: '$158B', pe: 119.3, revenueGrowth: 34, eps: 1.02, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.59, GTEK: false, ARKK: 4.4, MARS: false, FRWD: 2.31, BCTK: 3.09, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRWD', name: 'CrowdStrike', easyScore: 4, avgWeight: 3.09, proScore: 0.73, coverage: 0.235,
      price: 188.12, weeklyPrices: [203.76, 203.08, 198.49, 191.15, 188.12], weeklyChange: -7.68, dayChange: -1.59, sortRank: 0, periodReturns: { '1M': 11.4, 'YTD': 60.5, '6M': 65.8, '1Y': 59.7 },
      priceHistory: { '1D': [191.15, 191.26, 188.12], '1W': [203.76, 203.08, 198.49, 191.15, 188.12], '1M': [168.86, 170.23, 168.26, 169.66, 175.27, 185.73, 190.79, 193.18, 193.98, 199.38, 191.12, 198.4, 187.18, 187.91, 210.73, 206.77, 203.76, 203.08, 198.49, 191.15, 188.12], 'YTD': [117.19, 117.65, 113.47, 119.17, 105.43, 103.95, 105.54, 93, 107.25, 105.96, 103.33, 97.6, 106.63, 104.55, 111.35, 113.91, 131.94, 154.71, 167.89, 186.9, 161.93, 171.21, 175.27, 194.62, 210.73, 188.12], '6M': [113.44, 111.15, 94.29, 102.89, 97.15, 93, 107.25, 110.44, 102.25, 92.39, 99.65, 100.56, 108.29, 112.03, 113.91, 131.94, 148.52, 165.87, 195.54, 164.7, 173.23, 170.23, 190.79, 191.12, 206.77, 188.12], '1Y': [117.81, 116.38, 110.44, 108.95, 104.65, 104.4, 103.3, 105.88, 111.25, 121.03, 122.6, 121.15, 122.24, 125.99, 136.74, 133.48, 139.18, 128.42, 128.09, 131.04, 129.49, 122.13, 119.71, 117.19, 115.97, 113.75, 113.12, 110.35, 98.88, 107.41, 87.58, 96.21, 107.25, 110.44, 102.25, 92.39, 99.65, 100.56, 108.29, 113.65, 117.31, 135.57, 154.71, 167.89, 192.24, 164.7, 173.23, 170.23, 190.79, 191.12, 206.77, 188.12] },
      velocityScore: { '1D': -1.4, '1W': -11, '1M': 9, '6M': null }, isNew: false,
      marketCap: '$192B', pe: null, revenueGrowth: 26, eps: -0.04, grossMargin: 75, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.5, IGV: 7.19, FDTX: 1.21, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.46, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'CrowdStrike appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 4, avgWeight: 3, proScore: 0.7, coverage: 0.235,
      price: 1541.59, weeklyPrices: [1411.08, 1354.82, 1390.95, 1589.40, 1541.59], weeklyChange: 9.25, dayChange: -3.01, sortRank: 0, periodReturns: { '1M': -32.2, 'YTD': 549.4, '6M': 206.2, '1Y': 3627.2 },
      priceHistory: { '1D': [1589.4, 1526.57, 1541.59], '1W': [1411.08, 1354.82, 1390.95, 1589.4, 1541.59], '1M': [2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745, 1744.43, 1727.18, 1858.27, 1915.92, 1673.97, 1757.82, 1615, 1411.08, 1354.82, 1390.95, 1589.4, 1541.59], 'YTD': [237.38, 377.41, 413.62, 481.43, 695.51, 599.34, 621.09, 635.36, 527.33, 703.63, 702.49, 635.34, 780.9, 919.47, 932.43, 1187, 1562.34, 1333.01, 1589.55, 1831.5, 1643.23, 2184.75, 2090.71, 1617.7, 1757.82, 1541.59], '6M': [503.44, 539.3, 576.2, 630.29, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 989.9, 1187, 1562.34, 1407.61, 1478.69, 1761.43, 1642, 2107.86, 1963.6, 2273.73, 1727.18, 1615, 1541.59], '1Y': [41.36, 42.93, 41.93, 46.83, 44.58, 47.35, 53.01, 70.51, 91.55, 106.4, 112.2, 120.95, 127.29, 149.29, 175.53, 194.57, 271.58, 244.93, 220.5, 194.38, 219.46, 209.31, 244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1589.55, 1716.36, 1642, 2107.86, 1963.6, 2273.73, 1727.18, 1615, 1541.59] },
      velocityScore: { '1D': 1.4, '1W': -12.5, '1M': -30, '6M': null }, isNew: false,
      marketCap: '$228B', pe: 52.7, revenueGrowth: 251, eps: 29.24, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 4.83, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.58, CBSE: false, FCUS: 3.51, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.06, XMMO: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC-CL A', easyScore: 4, avgWeight: 2.58, proScore: 0.61, coverage: 0.235,
      price: 347.17, weeklyPrices: [354.46, 346.77, 351.99, 347.15, 347.17], weeklyChange: -2.06, dayChange: 0.01, sortRank: 0, periodReturns: { '1M': -0.7, 'YTD': 10.9, '6M': 5, '1Y': 81.4 },
      priceHistory: { '1D': [347.15, 347.74, 347.17], '1W': [354.46, 346.77, 351.99, 347.15, 347.17], '1M': [349.68, 346.13, 345.29, 343.71, 337.39, 353.65, 357.37, 361.21, 359.91, 366.46, 361.92, 358.89, 357.18, 352.51, 359.51, 370.92, 354.46, 346.77, 351.99, 347.15, 347.17], 'YTD': [313, 328.57, 330, 334.55, 339.71, 310.96, 302.85, 311.76, 298.52, 305.56, 302.06, 287.56, 317.32, 336.02, 338.89, 385.69, 400.8, 396.94, 388.88, 358.99, 356.38, 368.03, 337.39, 367.03, 359.51, 347.17], '6M': [330.54, 338.25, 331.25, 309, 314.98, 311.76, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 344.4, 385.69, 400.8, 396.78, 382.97, 376.37, 363.31, 369.35, 346.13, 357.37, 361.92, 370.92, 347.17], '1Y': [191.34, 195.75, 194.67, 203.34, 201.57, 207.14, 230.66, 239.63, 251.16, 251.66, 243.1, 245.76, 245.45, 250.46, 267.47, 277.54, 291.31, 284.28, 323.44, 319.63, 317.08, 306.57, 314.35, 313, 325.44, 332.78, 327.93, 338, 322.86, 305.72, 311.49, 306.52, 298.52, 302.28, 301, 274.34, 299.99, 321.31, 337.42, 350.34, 383.25, 388.64, 396.94, 388.88, 361.85, 363.31, 369.35, 346.13, 357.37, 361.92, 370.92, 347.17] },
      velocityScore: { '1D': 0, '1W': null, '1M': 3.4, '6M': null }, isNew: false,
      marketCap: '$4.2T', pe: 26.5, revenueGrowth: 22, eps: 13.12, grossMargin: 60, dividendYield: 0.25,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 0.49, MARS: false, FRWD: 3.5, BCTK: false, FWD: 1.76, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 4.58, XMMO: false },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 3, avgWeight: 4.66, proScore: 2.8, coverage: 0.6,
      price: 406.63, weeklyPrices: [396.27, 399.99, 401.41, 402.95, 406.63], weeklyChange: 2.61, dayChange: 0.96, sortRank: 0, periodReturns: { '1M': -6.7, 'YTD': 27.7, '6M': 21.7, '1Y': 9.1 },
      priceHistory: { '1D': [402.75, 402.77, 406.63], '1W': [396.27, 399.99, 401.41, 402.95, 406.63], '1M': [435.78, 405.28, 404.59, 419.87, 402.68, 408.26, 426.12, 412.31, 398.52, 413.42, 399.56, 405.83, 407.28, 402.85, 415.52, 412.86, 396.27, 399.99, 401.41, 402.95, 406.63], 'YTD': [318.51, 324.51, 343.75, 341.19, 362.53, 396.09, 377.32, 375.92, 347.75, 361.04, 359.74, 357.67, 385.58, 392.73, 424.5, 425.55, 401.51, 381.87, 403.13, 421.21, 375.46, 421.77, 402.68, 395.68, 415.52, 406.63], '6M': [334.04, 354.37, 354.67, 390.33, 373.38, 375.92, 347.75, 355.4, 356.8, 357.36, 363.89, 403.36, 407.57, 423.92, 425.55, 401.51, 399.44, 391.35, 400.08, 403.14, 407.06, 405.28, 426.12, 399.56, 412.86, 406.63], '1Y': [372.65, 390.01, 356.45, 363.3, 349, 352.02, 342.99, 348.23, 371.19, 368.52, 374.25, 370.94, 374.35, 373.46, 376.01, 377.72, 367.91, 338.29, 336.65, 335.57, 341.76, 329.93, 322.81, 318.51, 320.58, 333.46, 331.22, 351.42, 373.82, 389.25, 362.05, 377.4, 347.75, 355.4, 356.8, 357.36, 363.89, 403.36, 407.57, 416.77, 422.44, 419, 381.87, 403.13, 417.62, 403.14, 407.06, 405.28, 426.12, 399.56, 412.86, 406.63] },
      velocityScore: { '1D': -1.1, '1W': -1.4, '1M': 5.7, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 39.6, revenueGrowth: 17, eps: 10.28, grossMargin: 37, dividendYield: 1.09,
      etfPresence: { POW: 4.35, VOLT: 5.51, PBD: false, PBW: false, IVEP: 4.12 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 3, avgWeight: 4.65, proScore: 2.79, coverage: 0.6,
      price: 0, weeklyPrices: [0.00], weeklyChange: 0, dayChange: 0, sortRank: 0, periodReturns: { '1M': 0, 'YTD': 0, '6M': 0, '1Y': 0 },
      priceHistory: undefined,
      velocityScore: { '1D': -1.1, '1W': -1.1, '1M': -0.7, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { POW: 4.98, VOLT: 5.1, PBD: false, PBW: false, IVEP: 3.88 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 3, avgWeight: 4.13, proScore: 2.48, coverage: 0.6,
      price: 1013.98, weeklyPrices: [1036.22, 1057.84, 1079.18, 1078.81, 1013.98], weeklyChange: -2.15, dayChange: -6.03, sortRank: 0, periodReturns: { '1M': -10.1, 'YTD': 55.1, '6M': 53.2, '1Y': 84.7 },
      priceHistory: { '1D': [1079.03, 1027.46, 1013.98], '1W': [1036.22, 1057.84, 1079.18, 1078.81, 1013.98], '1M': [1127.59, 1034.98, 1057.65, 1085.47, 1045.17, 1102.51, 1174.86, 1134.35, 1113.11, 1152.04, 1070.99, 1075.26, 1091.57, 1042.6, 1066.01, 1055.28, 1036.22, 1057.84, 1079.18, 1078.81, 1013.98], 'YTD': [653.57, 622.5, 681.55, 692.7, 780.25, 823.67, 834.61, 873.6, 789.23, 827.37, 882.64, 872.9, 936.07, 978.32, 1149.53, 1062.95, 1040.15, 1012.25, 1070.47, 959.36, 867.09, 1109.73, 1045.17, 1077.08, 1066.01, 1013.98], '6M': [661.67, 717.39, 737.53, 816.56, 830.34, 873.6, 789.23, 805.02, 851.07, 853.16, 897.36, 991.12, 990.18, 1149.19, 1062.95, 1040.15, 1049.23, 1038.74, 950.54, 933.85, 979.07, 1034.98, 1174.86, 1070.99, 1055.28, 1013.98], '1Y': [548.99, 632.67, 649.72, 657.44, 603.13, 625.91, 577.04, 605.7, 617.91, 633.41, 614.9, 606.12, 644.41, 585.33, 570.98, 547.96, 576.08, 554.93, 572.56, 601.97, 625.3, 686.22, 661.45, 653.57, 628.4, 642.23, 657.78, 726.37, 779.35, 802.13, 831.7, 881.18, 789.23, 805.02, 851.07, 853.16, 897.36, 991.12, 990.18, 1120.23, 1073.95, 1073.08, 1012.25, 1070.47, 969.67, 933.85, 979.07, 1034.98, 1174.86, 1070.99, 1055.28, 1013.98] },
      velocityScore: { '1D': -0.4, '1W': 3.8, '1M': 4.2, '6M': null }, isNew: false,
      marketCap: '$272B', pe: 29.6, revenueGrowth: 16, eps: 34.2, grossMargin: 20, dividendYield: 0.19,
      etfPresence: { POW: 3.66, VOLT: 4.58, PBD: false, PBW: false, IVEP: 4.14 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 3, avgWeight: 3.9, proScore: 2.34, coverage: 0.6,
      price: 88.58, weeklyPrices: [89.35, 88.80, 88.00, 87.93, 88.58], weeklyChange: -0.86, dayChange: 0.78, sortRank: 0, periodReturns: { '1M': 2.9, 'YTD': 10.3, '6M': 4.1, '1Y': 14.2 },
      priceHistory: { '1D': [87.89, 88.41, 88.58], '1W': [89.35, 88.8, 88, 87.93, 88.58], '1M': [86.08, 86.43, 87.62, 87.7, 88.56, 88.66, 87.77, 86.37, 88.34, 87.44, 87.44, 87.1, 87.96, 88.38, 89.54, 89.1, 89.35, 88.8, 88, 87.93, 88.58], 'YTD': [80.28, 79.89, 83.63, 87.15, 88.82, 91.36, 91.64, 93.77, 91.02, 92.82, 90.23, 92.88, 94.17, 91.83, 96.25, 96.95, 93.1, 89.04, 87.65, 84.58, 85.12, 86.75, 88.56, 88.47, 89.54, 88.58], '6M': [85.07, 88.18, 89.21, 91.93, 92.18, 93.77, 91.02, 92.78, 89.5, 91.4, 92.73, 92.3, 92.01, 95.28, 96.95, 93.1, 93.36, 88.55, 83.66, 84.01, 86.12, 86.43, 87.77, 87.44, 89.1, 88.58], '1Y': [77.54, 71.95, 71.18, 71.86, 76.51, 74.84, 71.63, 70.07, 69.83, 72.32, 75.49, 83.21, 84.64, 83.99, 83.57, 81.69, 85.76, 84.64, 84.83, 84.95, 79.64, 81.32, 79.79, 80.28, 79.49, 82.19, 84.81, 87.9, 89.47, 93.8, 94.06, 92.71, 91.02, 92.78, 89.5, 91.4, 92.73, 92.3, 92.01, 94.83, 95.51, 94.84, 89.04, 87.65, 85.68, 84.01, 86.12, 86.43, 87.77, 87.44, 89.1, 88.58] },
      velocityScore: { '1D': -2.1, '1W': -1.3, '1M': 14.1, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 22.5, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.83,
      etfPresence: { POW: 2.25, VOLT: 5.28, PBD: false, PBW: false, IVEP: 4.17 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 3, avgWeight: 3.38, proScore: 2.03, coverage: 0.6,
      price: 480.1, weeklyPrices: [482.04, 488.67, 484.98, 479.93, 480.10], weeklyChange: -0.4, dayChange: 0.11, sortRank: 0, periodReturns: { '1M': -11, 'YTD': 8.1, '6M': -0.8, '1Y': 12 },
      priceHistory: { '1D': [479.56, 474.76, 480.1], '1W': [482.04, 488.67, 484.98, 479.93, 480.1], '1M': [539.39, 509.96, 518.18, 536.04, 517.02, 514.71, 523.2, 490.12, 487.1, 495.6, 480.5, 485.41, 490.94, 477.03, 483.89, 479.92, 482.04, 488.67, 484.98, 479.93, 480.1], 'YTD': [444.11, 470.53, 489.31, 484.14, 503.86, 516.03, 526.56, 511.63, 471.54, 472.64, 489.07, 490.74, 527.21, 521.71, 557.85, 508.43, 492.58, 470.87, 478.05, 484.91, 467.59, 523.69, 517.02, 478.89, 483.89, 480.1], '6M': [484.06, 497.97, 487.4, 516.02, 526.73, 511.63, 471.54, 467.38, 475.74, 480.97, 499.2, 539.79, 546.23, 553.07, 508.43, 492.58, 479.97, 475.01, 462.93, 485.03, 489.73, 509.96, 523.2, 480.5, 479.92, 480.1], '1Y': [428.55, 427.33, 427.67, 432.14, 432.81, 442.52, 428.8, 437.24, 435.44, 435.23, 430.31, 412.93, 427.43, 435.29, 455.34, 459.44, 450.12, 417.28, 429.82, 429.34, 438.7, 438.42, 455.92, 444.11, 460.87, 484.11, 485.53, 487.94, 503.8, 524.12, 516.99, 516.98, 471.54, 467.38, 475.74, 480.97, 499.2, 539.79, 546.23, 555.34, 516, 490.16, 470.87, 478.05, 480.46, 485.03, 489.73, 509.96, 523.2, 480.5, 479.92, 480.1] },
      velocityScore: { '1D': 36.2, '1W': 6.3, '1M': 15.3, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 28.3, revenueGrowth: 11, eps: 16.94, grossMargin: 36, dividendYield: 1.18,
      etfPresence: { POW: 2.97, VOLT: 4.37, PBD: false, PBW: false, IVEP: 2.8 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 3, avgWeight: 3.33, proScore: 2, coverage: 0.6,
      price: 158.56, weeklyPrices: [153.65, 154.92, 154.78, 160.68, 158.56], weeklyChange: 3.19, dayChange: -1.21, sortRank: 0, periodReturns: { '1M': -14, 'YTD': 55.5, '6M': 42.1, '1Y': 112.5 },
      priceHistory: { '1W': [153.65, 154.92, 154.78, 160.68, 158.56], '1M': [184.34, 168.37, 167.55, 171.91, 162.92, 163.35, 169.61, 159.99, 152.15, 156.89, 154.76, 158.05, 160.72, 158.02, 161.78, 159.46, 153.65, 154.92, 154.78, 160.68, 158.56], 'YTD': [101.97, 105.38, 112.5, 113.16, 119.43, 112.75, 116.88, 118.36, 106.02, 114.3, 121, 118.28, 127.11, 129.7, 142.76, 158.92, 169.95, 160.69, 169.29, 176.39, 156.79, 177.02, 162.92, 153.18, 161.78, 158.56], '6M': [111.57, 115.62, 113.87, 111.9, 116.87, 118.36, 106.02, 109.93, 116.3, 116.98, 117.41, 133.16, 135.8, 142.17, 158.92, 169.95, 169.01, 164.66, 171.55, 163.81, 169, 168.37, 169.61, 154.76, 159.46, 158.56], '1Y': [74.63, 79.72, 89.73, 91.84, 88.15, 90.84, 89.49, 91.44, 96.2, 97.7, 98.64, 96, 99.51, 99.65, 104.22, 109.62, 109.59, 104.31, 104.93, 104.97, 107.42, 102.41, 103.97, 101.97, 102.72, 107.98, 110.29, 112.26, 112.64, 113.25, 114.93, 120.27, 106.02, 109.93, 116.3, 116.98, 117.41, 133.16, 135.8, 141.71, 162.69, 173.39, 160.69, 169.29, 173.39, 163.81, 169, 168.37, 169.61, 154.76, 159.46, 158.56] },
      velocityScore: { '1D': 2, '1W': 1, '1M': -2.4, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 53.9, revenueGrowth: 54, eps: 2.94, grossMargin: 37, dividendYield: 0.52,
      etfPresence: { POW: 4.02, VOLT: 3.1, PBD: false, PBW: false, IVEP: 2.86 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy Corp', easyScore: 3, avgWeight: 2.71, proScore: 1.63, coverage: 0.6,
      price: 224, weeklyPrices: [206.73, 214.96, 197.06, 226.26, 224.00], weeklyChange: 8.35, dayChange: -1.13, sortRank: 0, periodReturns: { '1M': -35.2, 'YTD': 157.8, '6M': 53.8, '1Y': 763.9 },
      priceHistory: { '1D': [226.55, 223.65, 224], '1W': [206.73, 214.96, 197.06, 226.26, 224], '1M': [345.85, 321.98, 326.19, 309.18, 252.02, 275.01, 302.7, 289.5, 270.89, 295.05, 254.29, 257.02, 244.61, 233.49, 243.4, 239.38, 206.73, 214.96, 197.06, 226.26, 224], 'YTD': [86.89, 134.07, 149.5, 152.31, 168.89, 155.54, 159, 155.67, 135.19, 153.68, 141.33, 135.49, 146.78, 210.06, 237.57, 290.52, 261.03, 258.71, 302.4, 287.32, 234.23, 328.91, 252.02, 269.57, 243.4, 224], '6M': [145.63, 156.51, 136.6, 139.03, 147.55, 155.67, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 231.17, 290.52, 261.03, 275.95, 302.49, 273.51, 253.57, 274.5, 321.98, 302.7, 254.29, 239.38, 224], '1Y': [25.93, 34.75, 37.61, 41.25, 43.1, 49.94, 52.45, 55, 73.29, 77.38, 84.57, 86.06, 114.06, 104.38, 113.28, 129.05, 127.07, 104.97, 94.29, 102.5, 109.44, 87.61, 91.43, 86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 166, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 283.92, 258.71, 302.4, 302.85, 253.57, 274.5, 321.98, 302.7, 254.29, 239.38, 224] },
      velocityScore: { '1D': 35.8, '1W': -0.6, '1M': -44.6, '6M': null }, isNew: false,
      marketCap: '$64B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: 1.43, VOLT: 3.36, PBD: false, PBW: false, IVEP: 3.34 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'NRG', name: 'NRG Energy Inc', easyScore: 3, avgWeight: 1.42, proScore: 0.85, coverage: 0.6,
      price: 133.12, weeklyPrices: [132.75, 129.11, 130.58, 131.60, 133.12], weeklyChange: 0.27, dayChange: 1.14, sortRank: 0, periodReturns: { '1M': -4.2, 'YTD': -16.4, '6M': -11.9, '1Y': -13.5 },
      priceHistory: { '1W': [132.75, 129.11, 130.58, 131.6, 133.12], '1M': [138.91, 137.66, 142.21, 147.11, 149.36, 149.11, 146.06, 140.8, 136.7, 141.01, 137.48, 140.48, 140.42, 139.48, 138.36, 137.9, 132.75, 129.11, 130.58, 131.6, 133.12], 'YTD': [159.24, 149.27, 152.05, 156.04, 152.18, 160.63, 175.01, 178.96, 154.32, 152.48, 151.77, 146.14, 160.3, 168.5, 154.53, 153.37, 138.11, 125.5, 140.43, 133.76, 120.65, 135.06, 149.36, 138.01, 138.36, 133.12], '6M': [151.09, 153.72, 144.44, 161.8, 179.18, 178.96, 154.32, 152.87, 145.8, 147.74, 149.8, 170.24, 157.18, 159.81, 153.37, 138.11, 127.81, 137.65, 129.47, 127.71, 130.4, 137.66, 146.06, 137.48, 137.9, 133.12], '1Y': [153.96, 159.87, 171.96, 156.69, 148.38, 146.23, 146.91, 152.26, 164.22, 167.43, 161.95, 162.61, 165.61, 163.59, 172.76, 167.99, 162.84, 166.45, 163.81, 166.77, 166.75, 160.15, 158.11, 159.24, 143.53, 158.5, 149.3, 152.63, 153.32, 172.35, 176.52, 175.58, 154.32, 152.87, 145.8, 147.74, 149.8, 170.24, 157.18, 160.15, 154.82, 137.3, 125.5, 140.43, 133.51, 127.71, 130.4, 137.66, 146.06, 137.48, 137.9, 133.12] },
      velocityScore: { '1D': 11.8, '1W': -4.5, '1M': 16.4, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 146.3, revenueGrowth: 20, eps: 0.91, grossMargin: 16, dividendYield: 1.44,
      etfPresence: { POW: 0.52, VOLT: 0.99, PBD: false, PBW: false, IVEP: 2.74 },
      tonyNote: 'NRG Energy Inc appears in 3 of 5 Electrification ETFs (60% coverage) with average weight 1.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, avgWeight: 5.75, proScore: 2.3, coverage: 0.4,
      price: 280.66, weeklyPrices: [266.80, 270.56, 266.11, 281.51, 280.66], weeklyChange: 5.19, dayChange: -0.3, sortRank: 0, periodReturns: { '1M': -7.8, 'YTD': 65.5, '6M': 40.1, '1Y': 164.8 },
      priceHistory: { '1D': [281.51, 275.6, 280.66], '1W': [266.8, 270.56, 266.11, 281.51, 280.66], '1M': [304.33, 288.64, 294.15, 310.32, 310.64, 315.65, 333.04, 318.06, 266.94, 277.45, 258.67, 267.69, 272.58, 263.26, 279.39, 275, 266.8, 270.56, 266.11, 281.51, 280.66], 'YTD': [169.63, 187.43, 200.11, 210.66, 217.25, 238.4, 230.06, 229.71, 191.87, 205.11, 214.98, 197.98, 228.29, 241.49, 268.31, 283.6, 297.98, 258.28, 276.25, 280.09, 276.95, 296.39, 310.64, 251.53, 279.39, 280.66], '6M': [200.29, 210.44, 208, 231.48, 235.04, 229.71, 191.87, 197.65, 204.09, 203.53, 206.9, 237.93, 254.38, 276.65, 283.6, 297.98, 256.72, 270.01, 269.86, 279.13, 302.15, 288.64, 333.04, 258.67, 275, 280.66], '1Y': [106, 130.49, 131.71, 134.66, 127.8, 139.31, 138.07, 143.15, 148.78, 146.79, 141.02, 141.25, 147.14, 148, 154.78, 154.25, 152.12, 144.07, 150.84, 159.74, 167.43, 171.76, 177.23, 169.63, 180.24, 196.61, 196.5, 201.19, 220.78, 232.84, 231.83, 222.45, 191.87, 197.65, 204.09, 203.53, 206.9, 237.93, 254.38, 250.96, 286.69, 302.73, 258.28, 276.25, 269.22, 279.13, 302.15, 288.64, 333.04, 258.67, 275, 280.66] },
      velocityScore: { '1D': 4.5, '1W': 2.2, '1M': 4.5, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 67.8, revenueGrowth: 17, eps: 4.14, grossMargin: 39, dividendYield: 0.1,
      etfPresence: { POW: 3.77, VOLT: 7.72, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 2, avgWeight: 5.48, proScore: 2.19, coverage: 0.4,
      price: 240.23, weeklyPrices: [235.79, 232.79, 228.28, 244.39, 240.23], weeklyChange: 1.88, dayChange: -1.7, sortRank: 0, periodReturns: { '1M': -22, 'YTD': 126.1, '6M': 68.8, '1Y': 226.1 },
      priceHistory: { '1W': [235.79, 232.79, 228.28, 244.39, 240.23], '1M': [307.8, 291.5, 294.49, 309.2, 279.77, 281.09, 286.36, 264.86, 246.33, 248.05, 231.85, 236.58, 232.19, 225.66, 234.25, 247.01, 235.79, 232.79, 228.28, 244.39, 240.23], 'YTD': [106.26, 121.83, 139.99, 147.43, 151.08, 197.45, 178.79, 174.53, 161.22, 170.61, 180.86, 180.36, 218.07, 232.81, 252.18, 275.33, 309.39, 266.8, 291.97, 299.73, 262.34, 297.2, 279.77, 234.05, 234.25, 240.23], '6M': [142.29, 152.31, 179.6, 197.63, 182.27, 174.53, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 252.76, 275.33, 309.39, 292.65, 279.22, 288.12, 293.6, 303.53, 291.5, 286.36, 231.85, 247.01, 240.23], '1Y': [73.67, 77.77, 78.75, 90.06, 84.7, 91.08, 85.72, 92.3, 99.41, 97.41, 101.6, 104.42, 105.73, 116.11, 128.09, 126.71, 121.07, 107.22, 104.18, 107.83, 115.02, 110.88, 112.88, 106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 181.38, 177.5, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 269.95, 322.05, 266.8, 291.97, 299.07, 293.6, 303.53, 291.5, 286.36, 231.85, 247.01, 240.23] },
      velocityScore: { '1D': 5.8, '1W': 5.8, '1M': -20.9, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 46.8, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.15,
      etfPresence: { POW: 4.51, VOLT: 6.46, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 3.62, proScore: 1.45, coverage: 0.4,
      price: 131.4, weeklyPrices: [133.13, 132.14, 131.05, 130.48, 131.40], weeklyChange: -1.3, dayChange: 0.71, sortRank: 0, periodReturns: { '1M': 0.8, 'YTD': 14, '6M': 12.1, '1Y': 19.3 },
      priceHistory: { '1D': [130.48, 131.21, 131.4], '1W': [133.13, 132.14, 131.05, 130.48, 131.4], '1M': [130.3, 133.74, 134.96, 137, 138.69, 137.97, 136.81, 135.05, 138.51, 135.98, 135.9, 133.85, 135.43, 135.63, 134.94, 132.5, 133.13, 132.14, 131.05, 130.48, 131.4], 'YTD': [115.31, 116.91, 119.96, 119.43, 120.67, 122.25, 128.42, 133.82, 131.87, 134.15, 127.92, 131.08, 134.71, 134.56, 135.08, 136.91, 130.16, 127.68, 130.9, 126.31, 128.53, 127.69, 138.69, 137.53, 134.94, 131.4], '6M': [117.18, 119.21, 120.61, 126.43, 129.37, 133.82, 131.87, 133.61, 125.66, 130.1, 132.36, 134.46, 133.28, 134.73, 136.91, 130.16, 125.15, 131.59, 123.79, 126.77, 129.31, 133.74, 136.81, 135.9, 132.5, 131.4], '1Y': [110.16, 109.22, 113.24, 111.99, 112.66, 112.63, 110.03, 108.36, 106.84, 108.14, 112.5, 118.16, 118.38, 117.43, 115.11, 120.3, 122.73, 123.51, 121.58, 118.06, 116.07, 114.57, 115.15, 115.31, 115.93, 119.4, 116.63, 119.78, 120.8, 129.94, 132.03, 133.29, 131.87, 133.61, 125.66, 130.1, 132.36, 134.46, 133.28, 135.07, 134.66, 130.7, 127.68, 130.9, 127.11, 126.77, 129.31, 133.74, 136.81, 135.9, 132.5, 131.4] },
      velocityScore: { '1D': -2.7, '1W': -1.4, '1M': 13.3, '6M': null }, isNew: false,
      marketCap: '$71B', pe: 19.4, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.91,
      etfPresence: { POW: 2.82, VOLT: 4.41, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.23, proScore: 1.29, coverage: 0.4,
      price: 294.56, weeklyPrices: [294.11, 289.56, 291.67, 304.50, 294.56], weeklyChange: 0.15, dayChange: -3.29, sortRank: 0, periodReturns: { '1M': -17.7, 'YTD': 81.8, '6M': 62.6, '1Y': 135.1 },
      priceHistory: { '1D': [304.57, 294.89, 294.56], '1W': [294.11, 289.56, 291.67, 304.5, 294.56], '1M': [357.96, 318.32, 316.43, 325.57, 303.95, 306.97, 334.82, 311.42, 300.53, 318.47, 317.81, 323.92, 318.86, 305.87, 303.58, 304.57, 294.11, 289.56, 291.67, 304.5, 294.56], 'YTD': [162.01, 163.58, 176.93, 189.21, 190.15, 248.51, 243.06, 254.89, 241.78, 264.74, 256, 250.58, 281.03, 294.13, 321.75, 328.31, 339.97, 339.73, 323.91, 331.44, 280.98, 333.05, 303.95, 305.58, 303.58, 294.56], '6M': [181.12, 195.1, 177.75, 236.51, 243.75, 254.89, 241.78, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 323.46, 328.31, 339.97, 370.94, 327.46, 323.39, 300.57, 311.93, 318.32, 334.82, 317.81, 304.57, 294.56], '1Y': [125.29, 142.7, 138.76, 143.72, 129.05, 127.93, 125.59, 125.58, 136.65, 142.61, 150.86, 158.87, 175.15, 174.8, 190.57, 180.82, 179.05, 164.86, 169.57, 178.88, 178.38, 160.66, 166.26, 162.01, 160.78, 172.54, 182.49, 186.18, 195.58, 234.53, 245.42, 257.75, 241.78, 258.88, 255.88, 251.07, 258.73, 299.96, 314.41, 322.43, 330.97, 367.92, 339.73, 323.91, 334.49, 300.57, 311.93, 318.32, 334.82, 317.81, 304.57, 294.56] },
      velocityScore: { '1D': 1.6, '1W': -0.8, '1M': -3.7, '6M': null }, isNew: false,
      marketCap: '$113B', pe: 73.8, revenueGrowth: 30, eps: 3.99, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 2.49, PBD: false, PBW: false, IVEP: 3.97 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 2.93, proScore: 1.17, coverage: 0.4,
      price: 73.53, weeklyPrices: [74.73, 73.38, 74.16, 73.36, 73.53], weeklyChange: -1.6, dayChange: 0.23, sortRank: 0, periodReturns: { '1M': -1.9, 'YTD': 22.3, '6M': 15.4, '1Y': 28.2 },
      priceHistory: { '1D': [73.36, 73.58, 73.53], '1W': [74.73, 73.38, 74.16, 73.36, 73.53], '1M': [74.95, 75.79, 75.87, 77.53, 77.92, 75.06, 74.34, 72.77, 73.14, 72.82, 75.27, 75.45, 75.02, 74.46, 75.98, 74.38, 74.73, 73.38, 74.16, 73.36, 73.53], 'YTD': [60.11, 60.32, 61.55, 65.48, 68.5, 71.12, 72.17, 74.72, 74.24, 73.89, 73.6, 72.78, 73.01, 70.86, 71.65, 75.54, 71.96, 77.69, 76.34, 71.66, 72.26, 73.12, 77.92, 75.08, 75.98, 73.53], '6M': [63.72, 67.24, 67.42, 71.13, 72.98, 74.72, 74.24, 73.34, 72.41, 73.58, 72.59, 71.54, 70.91, 72.18, 75.54, 71.96, 77.72, 78.47, 70.04, 71.59, 71.49, 75.79, 74.34, 75.27, 74.38, 73.53], '1Y': [57.36, 58.89, 59, 57.76, 56.57, 57.13, 57.73, 57.57, 57.95, 61.39, 63.35, 63.97, 62.36, 62.34, 57.59, 56.51, 60.6, 59.17, 59.37, 61.55, 61.55, 58.41, 59.75, 60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 72.28, 72.98, 76.26, 74.24, 73.34, 72.41, 73.58, 72.59, 71.54, 70.91, 71.61, 75.41, 74.18, 77.69, 76.34, 71.31, 71.59, 71.49, 75.79, 74.34, 75.27, 74.38, 73.53] },
      velocityScore: { '1D': -4.1, '1W': 3.5, '1M': 18.2, '6M': null }, isNew: false,
      marketCap: '$90B', pe: 32.3, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.86,
      etfPresence: { POW: false, VOLT: 2.02, PBD: false, PBW: false, IVEP: 3.84 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.79, proScore: 1.11, coverage: 0.4,
      price: 154.83, weeklyPrices: [153.14, 151.20, 150.51, 157.81, 154.83], weeklyChange: 1.1, dayChange: -1.92, sortRank: 0, periodReturns: { '1M': -6.7, 'YTD': 14.6, '6M': 1.5, '1Y': 52.1 },
      priceHistory: { '1D': [157.86, 155.4, 154.83], '1W': [153.14, 151.2, 150.51, 157.81, 154.83], '1M': [165.96, 158.7, 162.78, 165.15, 163.72, 166.42, 176.32, 172.22, 164.59, 166.81, 158.22, 162.24, 159.06, 155.99, 158.37, 157.04, 153.14, 151.2, 150.51, 157.81, 154.83], 'YTD': [135.14, 140.16, 154.39, 166.25, 147.06, 144.04, 151.2, 146.06, 131.87, 136.8, 130.67, 126.35, 135.32, 148.96, 150.18, 142.3, 128.03, 121.72, 139.56, 147.62, 149.22, 163.96, 163.72, 158.61, 158.37, 154.83], '6M': [152.5, 149.58, 127.63, 143.73, 151.04, 146.06, 131.87, 133.92, 126.74, 123.62, 126.49, 145.27, 152.81, 149.71, 142.3, 128.03, 125, 132.06, 146.34, 143.6, 158.59, 158.7, 176.32, 158.22, 157.04, 154.83], '1Y': [101.78, 105.31, 107.93, 111.85, 109.98, 109.9, 110.69, 116.79, 119.04, 125.4, 123.75, 124.53, 122.64, 124.44, 137.29, 136.7, 143.47, 132.44, 137.81, 138.65, 138.58, 129.13, 137.12, 135.14, 136.25, 154.22, 150.99, 144.08, 136.23, 146.72, 147.82, 135.16, 131.87, 133.92, 126.74, 123.62, 126.49, 145.27, 152.81, 148.64, 141.03, 122.47, 121.72, 139.56, 148.4, 143.6, 158.59, 158.7, 176.32, 158.22, 157.04, 154.83] },
      velocityScore: { '1D': null, '1W': 0.9, '1M': 3.7, '6M': null }, isNew: true,
      marketCap: 'N/A', pe: 44.4, revenueGrowth: 58, eps: 3.49, grossMargin: 38, dividendYield: 0.63,
      etfPresence: { POW: 1.07, VOLT: 4.5, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'CEG', name: 'Constellation Energy Corp', easyScore: 2, avgWeight: 2.7, proScore: 1.08, coverage: 0.4,
      price: 266, weeklyPrices: [251.77, 252.39, 253.50, 262.22, 266.00], weeklyChange: 5.65, dayChange: 1.44, sortRank: 0, periodReturns: { '1M': -3.5, 'YTD': -24.7, '6M': -7.4, '1Y': -16.3 },
      priceHistory: { '1D': [262.22, 263.07, 266], '1W': [251.77, 252.39, 253.5, 262.22, 266], '1M': [275.53, 270.26, 267.97, 268.69, 264.02, 259.32, 248.37, 236.5, 239.25, 245.87, 244.52, 250.74, 251.38, 257.57, 256.43, 258.11, 251.77, 252.39, 253.5, 262.22, 266], 'YTD': [353.27, 342.52, 307.71, 288.76, 268.45, 276.85, 291.66, 329.88, 319.06, 305.58, 289.76, 279.25, 284.27, 299.14, 292.77, 307.81, 303.63, 262, 301.57, 267.24, 242.3, 274.06, 264.02, 239.71, 256.43, 266], '6M': [287.35, 287.45, 247.06, 276.12, 294.84, 329.88, 319.06, 301.77, 281.99, 301.49, 275.16, 291.72, 287.56, 313.53, 307.81, 303.63, 267.2, 294.07, 265.7, 250.67, 262.35, 270.26, 248.37, 244.52, 258.11, 266], '1Y': [317.79, 330.52, 343.57, 338.57, 317.23, 316.58, 308.48, 300.82, 322.91, 336.65, 329.07, 358.16, 389.56, 358.79, 384.95, 362.82, 351.67, 339.35, 351.6, 361.26, 359.15, 365.63, 361.33, 353.27, 322.54, 341.2, 289.06, 280.68, 261.42, 288.43, 293.8, 327.16, 319.06, 301.77, 281.99, 301.49, 275.16, 291.72, 287.56, 315.17, 321.05, 299.69, 262, 301.57, 272.65, 250.67, 262.35, 270.26, 248.37, 244.52, 258.11, 266] },
      velocityScore: { '1D': null, '1W': 0, '1M': 16.1, '6M': null }, isNew: true,
      marketCap: '$95B', pe: 22.4, revenueGrowth: 64, eps: 11.9, grossMargin: 23, dividendYield: 0.65,
      etfPresence: { POW: 1.38, VOLT: false, PBD: false, PBW: false, IVEP: 4.01 },
      tonyNote: 'Constellation Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.66, proScore: 1.06, coverage: 0.4,
      price: 141.82, weeklyPrices: [141.26, 140.46, 139.37, 141.71, 141.82], weeklyChange: 0.4, dayChange: 0.07, sortRank: 0, periodReturns: { '1M': -4.3, 'YTD': 18.4, '6M': 23.8, '1Y': 31 },
      priceHistory: { '1W': [141.26, 140.46, 139.37, 141.71, 141.82], '1M': [148.21, 141.28, 142.81, 145.49, 138.4, 140.47, 146.11, 144.8, 140.76, 142.72, 140.23, 140.53, 142.81, 143.93, 145.24, 142.76, 141.26, 140.46, 139.37, 141.71, 141.82], 'YTD': [119.75, 110.85, 114.61, 116.96, 124.01, 140.96, 142.7, 144.3, 132.4, 131.69, 133.27, 130.95, 139, 137.55, 141.73, 145.08, 139.52, 137.31, 140.22, 146.96, 139.36, 144.82, 138.4, 140.62, 145.24, 141.82], '6M': [114.51, 120.28, 132.52, 138.57, 143.79, 144.3, 132.4, 130.16, 129.7, 131.29, 133.75, 142.82, 140.98, 141.92, 145.08, 139.52, 143.08, 138.36, 133.91, 144.05, 146.06, 141.28, 146.11, 140.23, 142.76, 141.82], '1Y': [108.3, 103.24, 104.84, 106.64, 104.52, 108.46, 105.34, 106.29, 106.96, 108.29, 109.95, 108.31, 107.85, 111.18, 112.21, 111.04, 121.94, 114.44, 114.65, 114.22, 115.77, 118.85, 121.13, 119.75, 111.29, 112.95, 113.59, 119.26, 137.65, 139.24, 142.83, 145.46, 132.4, 130.16, 129.7, 131.29, 133.75, 142.82, 140.98, 143.38, 144.4, 141.78, 137.31, 140.22, 141.99, 144.05, 146.06, 141.28, 146.11, 140.23, 142.76, 141.82] },
      velocityScore: { '1D': -0.9, '1W': -1.9, '1M': 8.2, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 43.4, revenueGrowth: 8, eps: 3.27, grossMargin: 37, dividendYield: 1.13,
      etfPresence: { POW: false, VOLT: 1.47, PBD: false, PBW: false, IVEP: 3.85 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VST', name: 'Vistra Corp', easyScore: 2, avgWeight: 2.55, proScore: 1.02, coverage: 0.4,
      price: 163.68, weeklyPrices: [152.56, 155.44, 157.99, 162.33, 163.68], weeklyChange: 7.29, dayChange: 0.87, sortRank: 0, periodReturns: { '1M': -2.1, 'YTD': 1.5, '6M': 2.1, '1Y': -13.4 },
      priceHistory: { '1D': [162.27, 161.17, 163.68], '1W': [152.56, 155.44, 157.99, 162.33, 163.68], '1M': [167.26, 162.39, 162.87, 167.77, 163.49, 162.38, 158.63, 153.16, 151.05, 157.22, 154.82, 157.98, 158.86, 158.12, 158.43, 160.23, 152.56, 155.44, 157.99, 162.33, 163.68], 'YTD': [161.33, 166.37, 166.6, 164.26, 153, 160.15, 172.5, 173.89, 158.65, 161.99, 151.29, 150.33, 155.89, 165.53, 156.85, 155.28, 147.72, 136.75, 164.56, 153.8, 138.54, 163.75, 163.49, 155.73, 158.43, 163.68], '6M': [160.36, 162.58, 143.07, 163.1, 171.4, 173.89, 158.65, 158.95, 146.02, 155.48, 151.59, 158.2, 159.6, 164.35, 155.28, 147.72, 139.68, 156.27, 154.76, 146.9, 153.52, 162.39, 158.63, 154.82, 160.23, 163.68], '1Y': [189.09, 198, 209.6, 209.56, 193.52, 195.12, 188.12, 193.78, 209.43, 204.24, 195.92, 199.62, 205.51, 186.52, 190.59, 185.74, 179.16, 174.42, 170.84, 171.65, 164.81, 173.45, 161.67, 161.33, 150.6, 180.18, 160.12, 158.35, 149.65, 171.49, 167.8, 165.99, 158.65, 158.95, 146.02, 155.48, 151.59, 158.2, 159.6, 166.58, 160.85, 152.05, 136.75, 164.56, 157.97, 146.9, 153.52, 162.39, 158.63, 154.82, 160.23, 163.68] },
      velocityScore: { '1D': 1, '1W': 2, '1M': 10.9, '6M': null }, isNew: false,
      marketCap: '$55B', pe: 27.4, revenueGrowth: 43, eps: 5.97, grossMargin: 39, dividendYield: 0.56,
      etfPresence: { POW: 1.59, VOLT: false, PBD: false, PBW: false, IVEP: 3.5 },
      tonyNote: 'Vistra Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.5, proScore: 1, coverage: 0.4,
      price: 308.69, weeklyPrices: [285.89, 284.05, 280.67, 303.71, 308.69], weeklyChange: 7.98, dayChange: 1.64, sortRank: 0, periodReturns: { '1M': -20.5, 'YTD': 47.4, '6M': 12, '1Y': 119.4 },
      priceHistory: { '1D': [303.71, 304.92, 308.69], '1W': [285.89, 284.05, 280.67, 303.71, 308.69], '1M': [388.23, 364.96, 359.61, 375.15, 348.11, 348.15, 372.87, 356.35, 311.27, 310.84, 293.64, 309.27, 308.05, 298.52, 305.2, 301.88, 285.89, 284.05, 280.67, 303.71, 308.69], 'YTD': [209.37, 219.59, 253.86, 259.55, 263.03, 308.77, 320.64, 335.57, 290.78, 308.31, 329.78, 322.71, 366.95, 372.23, 382.47, 389.05, 357.24, 309.06, 339.65, 322.5, 308.17, 372.59, 348.11, 287.73, 305.2, 308.69], '6M': [275.57, 269.12, 257.64, 312.95, 331.23, 335.57, 290.78, 302.02, 317.21, 310.76, 331.9, 378.94, 380.22, 387.24, 389.05, 357.24, 323.46, 324.86, 294.65, 306.11, 370.66, 364.96, 372.87, 293.64, 301.88, 308.69], '1Y': [140.68, 142.21, 139.58, 158.81, 150.41, 154.44, 145.25, 154.76, 158.03, 176.59, 170.14, 173.09, 182.75, 196.58, 204.62, 195.05, 215.98, 199.22, 205.92, 213.44, 221.27, 215.16, 217.51, 209.37, 210.99, 257.29, 262.19, 255.36, 273.26, 314.27, 329.24, 340.42, 290.78, 302.02, 317.21, 310.76, 331.9, 378.94, 380.22, 385.68, 387.03, 354.97, 309.06, 339.65, 312.28, 306.11, 370.66, 364.96, 372.87, 293.64, 301.88, 308.69] },
      velocityScore: { '1D': null, '1W': 1, '1M': -11.5, '6M': null }, isNew: true,
      marketCap: '$12B', pe: 64.3, revenueGrowth: 26, eps: 4.8, grossMargin: 39, dividendYield: 0.13,
      etfPresence: { POW: 1.02, VOLT: 3.97, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'SO', name: 'Southern Co/The', easyScore: 2, avgWeight: 2.17, proScore: 0.87, coverage: 0.4,
      price: 94.69, weeklyPrices: [96.07, 95.30, 94.46, 93.85, 94.69], weeklyChange: -1.43, dayChange: 0.9, sortRank: 0, periodReturns: { '1M': 1.4, 'YTD': 8.6, '6M': 8.2, '1Y': -1.2 },
      priceHistory: { '1D': [93.85, 94.64, 94.69], '1W': [96.07, 95.3, 94.46, 93.85, 94.69], '1M': [93.43, 94.93, 95.78, 95.91, 97.16, 96.75, 95.71, 95.12, 97.98, 95.99, 96.38, 95.17, 95.61, 96.47, 95.96, 94.6, 96.07, 95.3, 94.46, 93.85, 94.69], 'YTD': [87.2, 87.01, 88.9, 88.84, 90.13, 90.86, 95.05, 97.38, 97.48, 99.11, 93.75, 96.52, 97.17, 94.9, 93.91, 96.71, 91.8, 93.71, 94.09, 90.49, 94.02, 93.09, 97.16, 97.29, 95.96, 94.69], '6M': [87.51, 89.14, 91.08, 92.56, 94.3, 97.38, 97.48, 98.01, 93.39, 95.55, 96.94, 95.93, 93.51, 93.49, 96.71, 91.8, 92.55, 94.55, 89.03, 91.28, 93.82, 94.93, 95.71, 96.38, 94.6, 94.69], '1Y': [95.85, 95.2, 94.39, 93.96, 94.18, 93.09, 91.66, 91.21, 91.36, 93.72, 94.77, 96.42, 99.68, 97, 93.91, 92.73, 91.14, 90.69, 89.29, 87.98, 85.49, 85.71, 86.39, 87.2, 87.22, 88.78, 87.54, 89.31, 90.08, 94.95, 95.18, 97.23, 97.48, 98.01, 93.39, 95.55, 96.94, 95.93, 93.51, 93.77, 95.99, 93.1, 93.71, 94.09, 90.51, 91.28, 93.82, 94.93, 95.71, 96.38, 94.6, 94.69] },
      velocityScore: { '1D': null, '1W': -2.2, '1M': null, '6M': null }, isNew: true,
      marketCap: 'N/A', pe: 24.2, revenueGrowth: 8, eps: 3.91, grossMargin: 48, dividendYield: 3.24,
      etfPresence: { POW: 0.33, VOLT: false, PBD: false, PBW: false, IVEP: 4.01 },
      tonyNote: 'Southern Co/The appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'XEL', name: 'Xcel Energy Inc', easyScore: 2, avgWeight: 2.1, proScore: 0.84, coverage: 0.4,
      price: 79.39, weeklyPrices: [79.98, 78.77, 78.67, 78.72, 79.39], weeklyChange: -0.74, dayChange: 0.85, sortRank: 0, periodReturns: { '1M': 0.7, 'YTD': 7.5, '6M': 4.7, '1Y': 8.7 },
      priceHistory: { '1D': [78.72, 79.51, 79.39], '1W': [79.98, 78.77, 78.67, 78.72, 79.39], '1M': [78.81, 80.33, 81.47, 81.75, 82.23, 81.98, 80.3, 79.7, 81.96, 80.37, 79.62, 79.02, 80.06, 80.48, 80.17, 79.25, 79.98, 78.77, 78.67, 78.72, 79.39], 'YTD': [73.86, 74.26, 75.61, 76.33, 75.95, 77.92, 80.82, 83.36, 82.52, 81.63, 76.95, 79.44, 81.46, 81.05, 79.48, 82.58, 79.39, 78.1, 80.78, 77.39, 78.1, 77.41, 82.23, 80.67, 80.17, 79.39], '6M': [75.86, 75.97, 76.12, 78.98, 81.55, 83.36, 82.52, 81.91, 76.77, 78.09, 80.39, 80.45, 80.32, 79.15, 82.58, 79.39, 77.92, 81.08, 76.41, 77.62, 79.35, 80.33, 80.3, 79.62, 79.25, 79.39], '1Y': [73.06, 72.34, 73.73, 72.39, 73.22, 72.54, 72.43, 72.02, 72.11, 73.04, 80.65, 81.85, 80.85, 80.64, 79.82, 81.59, 81.16, 81, 80.39, 78.39, 75.72, 73.73, 74.01, 73.86, 73.38, 75.36, 75.01, 76.06, 75.9, 81.59, 83.35, 83.8, 82.52, 81.91, 76.77, 78.09, 80.39, 80.45, 80.32, 79.41, 81.17, 80.6, 78.1, 80.78, 77.87, 77.62, 79.35, 80.33, 80.3, 79.62, 79.25, 79.39] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$50B', pe: 22.9, revenueGrowth: 3, eps: 3.47, grossMargin: 46, dividendYield: 3.01,
      etfPresence: { POW: 2.21, VOLT: 2, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Xcel Energy Inc appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 5.29, proScore: 2.11, coverage: 0.4,
      price: 240.23, weeklyPrices: [235.79, 232.79, 228.28, 244.39, 240.23], weeklyChange: 1.88, dayChange: -1.7, sortRank: 0, periodReturns: { '1M': -22, 'YTD': 126.1, '6M': 68.8, '1Y': 226.1 },
      priceHistory: { '1W': [235.79, 232.79, 228.28, 244.39, 240.23], '1M': [307.8, 291.5, 294.49, 309.2, 279.77, 281.09, 286.36, 264.86, 246.33, 248.05, 231.85, 236.58, 232.19, 225.66, 234.25, 247.01, 235.79, 232.79, 228.28, 244.39, 240.23], 'YTD': [106.26, 121.83, 139.99, 147.43, 151.08, 197.45, 178.79, 174.53, 161.22, 170.61, 180.86, 180.36, 218.07, 232.81, 252.18, 275.33, 309.39, 266.8, 291.97, 299.73, 262.34, 297.2, 279.77, 234.05, 234.25, 240.23], '6M': [142.29, 152.31, 179.6, 197.63, 182.27, 174.53, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 252.76, 275.33, 309.39, 292.65, 279.22, 288.12, 293.6, 303.53, 291.5, 286.36, 231.85, 247.01, 240.23], '1Y': [73.67, 77.77, 78.75, 90.06, 84.7, 91.08, 85.72, 92.3, 99.41, 97.41, 101.6, 104.42, 105.73, 116.11, 128.09, 126.71, 121.07, 107.22, 104.18, 107.83, 115.02, 110.88, 112.88, 106.26, 119.94, 135.18, 139.32, 147.86, 194.74, 195.02, 181.38, 177.5, 161.22, 167.57, 172, 179.35, 186.72, 228.99, 241.65, 260.52, 269.95, 322.05, 266.8, 291.97, 299.07, 293.6, 303.53, 291.5, 286.36, 231.85, 247.01, 240.23] },
      velocityScore: { '1D': 1, '1W': 11.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 46.8, revenueGrowth: 7, eps: 5.13, grossMargin: 30, dividendYield: 0.15,
      etfPresence: { AIRR: 3.24, PRN: false, RSHO: 7.33, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.01, proScore: 2, coverage: 0.4,
      price: 885.99, weeklyPrices: [877.17, 880.28, 864.30, 889.97, 885.99], weeklyChange: 1.01, dayChange: -0.42, sortRank: 0, periodReturns: { '1M': -13.3, 'YTD': 54.7, '6M': 36.6, '1Y': 112.4 },
      priceHistory: { '1D': [889.76, 881.64, 885.99], '1W': [877.17, 880.28, 864.3, 889.97, 885.99], '1M': [1022.28, 984.24, 994.45, 1057.01, 997.47, 1033.19, 1064.9, 991.41, 963.53, 969.92, 948.08, 938.39, 952.41, 931.47, 933.34, 914.3, 877.17, 880.28, 864.3, 889.97, 885.99], 'YTD': [572.87, 617.62, 646.89, 638.91, 702.89, 775, 760.53, 742.83, 680.9, 699.78, 701.7, 708.46, 771.58, 772.66, 835.24, 889.67, 897.45, 863.95, 908.55, 926.18, 856.16, 985.82, 997.47, 940.12, 933.34, 885.99], '6M': [648.41, 665.24, 678.31, 758.29, 759.74, 742.83, 680.9, 693.99, 680.88, 695.4, 721.24, 791.73, 798.4, 830.79, 889.67, 897.45, 888.31, 879.89, 865.36, 915.64, 933.93, 984.24, 1064.9, 948.08, 914.3, 885.99], '1Y': [417.19, 430.05, 434.23, 412.71, 416.09, 431.26, 415.12, 418.09, 440.67, 471.26, 477.15, 486.71, 527.47, 524.65, 524.47, 547.58, 567.93, 546.88, 566.61, 591.49, 594.36, 588.93, 582.42, 572.87, 608.13, 647.18, 626.62, 657.36, 726.2, 774.2, 756.47, 752.32, 680.9, 693.99, 680.88, 695.4, 721.24, 791.73, 798.4, 828.79, 874.78, 926.79, 863.95, 908.55, 909.81, 915.64, 933.93, 984.24, 1064.9, 948.08, 914.3, 885.99] },
      velocityScore: { '1D': -0.5, '1W': -2, '1M': null, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 44.1, revenueGrowth: 22, eps: 20.11, grossMargin: 29, dividendYield: 0.73,
      etfPresence: { AIRR: false, PRN: 3.13, RSHO: 6.89, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.8, proScore: 1.52, coverage: 0.4,
      price: 344.67, weeklyPrices: [327.65, 332.13, 336.41, 335.94, 344.67], weeklyChange: 5.19, dayChange: 1.08, sortRank: 0, periodReturns: { '1M': 2, 'YTD': 34.2, '6M': 21.4, '1Y': 30.1 },
      priceHistory: { '1W': [327.65, 332.13, 336.41, 335.94, 344.67], '1M': [338.07, 330.9, 333.78, 343.54, 337.08, 334.16, 338.15, 332.08, 330.85, 328.53, 315.33, 315.88, 322.49, 331.15, 329.35, 327.49, 327.65, 332.13, 336.41, 335.94, 344.67], 'YTD': [256.77, 264.62, 281.21, 281.54, 273.22, 283.73, 281.13, 283.5, 267.78, 255.65, 262.23, 258.01, 280.74, 284.56, 294.4, 305.75, 308.87, 307.17, 311.33, 308.31, 314.08, 329.89, 337.08, 328.53, 327.49, 344.67], '6M': [284, 256.26, 289.94, 290.31, 281.13, 283.5, 274.97, 259.88, 256.58, 260.51, 267.12, 289.01, 291.03, 294.4, 305.75, 310.37, 315.72, 305.66, 303.81, 315.29, 320.11, 338.07, 334.16, 315.33, 327.49, 344.67], '1Y': [264.89, 272.4, 269.28, 270.68, 262.92, 266.99, 263.15, 261.61, 262.58, 264.9, 261.05, 252.74, 252.95, 258.78, 258.03, 256.47, 259.74, 240.63, 249.05, 257.32, 257.3, 258.47, 263.58, 256.77, 264.62, 282.47, 282.33, 259.51, 287.03, 279.03, 281.97, 282.58, 267.78, 255.65, 253.77, 260.67, 267.12, 289.01, 291.03, 293.35, 302.99, 308.87, 307.17, 307.1, 300.98, 314.42, 320.11, 338.07, 334.16, 315.33, 327.49, 344.67] },
      velocityScore: { '1D': 0, '1W': -3.8, '1M': null, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 32.6, revenueGrowth: 7, eps: 10.58, grossMargin: 30, dividendYield: 0.6,
      etfPresence: { AIRR: 1.56, PRN: false, RSHO: 6.04, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 3.67, proScore: 1.47, coverage: 0.4,
      price: 688.41, weeklyPrices: [641.35, 638.56, 650.22, 694.40, 688.41], weeklyChange: 7.34, dayChange: -0.86, sortRank: 0, periodReturns: { '1M': -26.2, 'YTD': 124.8, '6M': 89, '1Y': 184.5 },
      priceHistory: { '1W': [641.35, 638.56, 650.22, 694.4, 688.41], '1M': [932.75, 892.25, 867.23, 881.92, 804.76, 813.77, 839.36, 776.55, 700.75, 717.11, 660.72, 707.17, 682.29, 660.04, 679.62, 668.82, 641.35, 638.56, 650.22, 694.4, 688.41], 'YTD': [306.23, 308.13, 350.96, 372.25, 386.78, 433.91, 415.13, 428.13, 395.11, 417.76, 422.55, 407.27, 423.35, 441.1, 495.67, 532.67, 844.8, 770.76, 783.53, 957.03, 770.25, 861.88, 804.76, 674.39, 679.62, 688.41], '6M': [364.25, 379.23, 365.07, 431.43, 435.5, 428.13, 395.11, 398.12, 401.61, 420.24, 393.71, 459.02, 472.9, 497.18, 532.67, 844.8, 848.84, 732.94, 845.39, 891.86, 866.67, 892.25, 839.36, 660.72, 668.82, 688.41], '1Y': [242.01, 264.08, 296.58, 308.4, 276.02, 292.95, 273.82, 286.69, 319.38, 371.84, 339.68, 348.57, 361.44, 364.32, 379.89, 382.57, 381.22, 333.88, 332.96, 323.46, 324.1, 319.13, 315.87, 306.23, 297.62, 336.31, 351.39, 357.91, 401.29, 437.77, 434.64, 432.87, 395.11, 398.12, 401.61, 420.24, 393.71, 459.02, 472.9, 505.45, 529.49, 868.18, 770.76, 783.53, 875.52, 891.86, 866.67, 892.25, 839.36, 660.72, 668.82, 688.41] },
      velocityScore: { '1D': 3.5, '1W': -20.1, '1M': -44.3, '6M': null }, isNew: false,
      marketCap: '$21B', pe: 61.6, revenueGrowth: 92, eps: 11.18, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 3.27, PRN: 4.06, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 3.51, proScore: 1.4, coverage: 0.4,
      price: 216.38, weeklyPrices: [217.59, 215.96, 211.73, 212.86, 216.38], weeklyChange: -0.56, dayChange: -0.24, sortRank: 0, periodReturns: { '1M': -12.2, 'YTD': 8.2, '6M': -2, '1Y': 24.5 },
      priceHistory: { '1W': [217.59, 215.96, 211.73, 212.86, 216.38], '1M': [246.41, 236.07, 237.22, 244.56, 231.87, 238.21, 245.17, 231.72, 227.74, 232.19, 218.83, 213.56, 216.63, 219.87, 215.14, 218.02, 217.59, 215.96, 211.73, 212.86, 216.38], 'YTD': [200.06, 207.44, 217.65, 215.21, 215.43, 231.2, 241.01, 231.59, 204.62, 199.45, 194.52, 190.71, 212.22, 219.99, 223.96, 218.91, 202.84, 200.99, 219.08, 230.08, 223.63, 235.29, 231.87, 232.19, 218.02, 216.38], '6M': [220.86, 211.34, 212.76, 233.46, 241.01, 231.59, 211.9, 202.65, 202.36, 200.45, 197.29, 215.97, 223.52, 223.96, 218.91, 205.27, 203.5, 205.39, 216.66, 227.8, 230.05, 246.41, 238.21, 218.83, 218.02, 216.38], '1Y': [173.83, 180.24, 203.71, 191.17, 188, 192.05, 184.11, 186.04, 185.77, 187.6, 186.78, 188.32, 185.28, 191.84, 197.07, 213.49, 224.93, 207.28, 211.97, 209.18, 209.32, 216.89, 205.46, 200.06, 207.44, 213.61, 217.13, 211.84, 218.02, 230.92, 242.29, 226.94, 204.62, 199.45, 186.77, 200, 197.29, 215.97, 223.52, 222.82, 208.13, 202.84, 200.99, 207.8, 220.92, 229.95, 230.05, 246.41, 238.21, 218.83, 218.02, 216.38] },
      velocityScore: { '1D': -0.7, '1W': 25, '1M': null, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 41.4, revenueGrowth: 17, eps: 5.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 3.06, PRN: false, RSHO: 3.96, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 2, avgWeight: 3.31, proScore: 1.32, coverage: 0.4,
      price: 0, weeklyPrices: [0.00], weeklyChange: 0, dayChange: 0, sortRank: 0, periodReturns: { '1M': 0, 'YTD': 0, '6M': 0, '1Y': 0 },
      priceHistory: undefined,
      velocityScore: { '1D': 0, '1W': 0.8, '1M': -5, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: null, revenueGrowth: 0, eps: 0, grossMargin: 0, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 4.28, RSHO: false, IDEF: 2.33, BILT: false },
      tonyNote: 'Howmet Aerospace is an aerospace structures and engine components manufacturer. It appears in Industrials ETFs for its aerospace and defense exposure — commercial air travel recovery and defense spending growth are the two demand drivers. Revenue grew and margins are expanding as Howmet prices power over OEM customers.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.27, proScore: 0.91, coverage: 0.4,
      price: 177.24, weeklyPrices: [173.74, 171.18, 169.56, 173.09, 177.24], weeklyChange: 2.01, dayChange: 2.4, sortRank: 0, periodReturns: { '1M': -15.6, 'YTD': 2.5, '6M': -14.1, '1Y': 26.6 },
      priceHistory: { '1D': [173.09, 172.35, 177.24], '1W': [173.74, 171.18, 169.56, 173.09, 177.24], '1M': [210, 209.89, 205.65, 204.77, 197.91, 189.25, 194.65, 191.25, 191.06, 196.89, 184.11, 186.99, 186, 177.14, 179.83, 176.91, 173.74, 171.18, 169.56, 173.09, 177.24], 'YTD': [172.84, 201.46, 217.89, 212.4, 210.88, 198.5, 209.07, 205.98, 195.23, 204.67, 204.85, 204.49, 231.78, 230.8, 225.51, 216.31, 205.33, 201.94, 204.38, 184.72, 183, 205.4, 197.91, 186.08, 179.83, 177.24], '6M': [206.33, 210.18, 187.42, 196.9, 206.44, 205.98, 195.23, 194.13, 199.75, 202.59, 215.98, 232.83, 228.24, 223.15, 216.31, 205.33, 204.72, 202.91, 188.39, 187.46, 193.94, 209.89, 194.65, 184.11, 176.91, 177.24], '1Y': [140.04, 150.28, 182, 179.51, 165.76, 166.52, 160.95, 162.23, 176.65, 178.02, 184.37, 191.39, 202.46, 205.24, 207.62, 200.39, 195.65, 175.91, 175.26, 174.71, 177.16, 173.2, 177.62, 172.84, 193.2, 213.25, 207.75, 205.43, 197.19, 200.4, 198.38, 216.47, 195.23, 194.13, 199.75, 202.59, 215.98, 232.83, 228.24, 222.07, 216.68, 210.8, 201.94, 204.38, 187.26, 187.46, 193.94, 209.89, 194.65, 184.11, 176.91, 177.24] },
      velocityScore: { '1D': 0, '1W': 0, '1M': -26.6, '6M': null }, isNew: false,
      marketCap: '$16B', pe: 47.1, revenueGrowth: 26, eps: 3.76, grossMargin: 23, dividendYield: 0.6,
      etfPresence: { AIRR: 2.99, PRN: false, RSHO: false, IDEF: 1.55, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 1.96, proScore: 0.78, coverage: 0.4,
      price: 48.8, weeklyPrices: [46.96, 46.03, 45.94, 48.21, 48.80], weeklyChange: 3.92, dayChange: 1.22, sortRank: 0, periodReturns: { '1M': -4.5, 'YTD': -35.7, '6M': -57.1, '1Y': -11.9 },
      priceHistory: { '1D': [48.21, 48.6, 48.8], '1W': [46.96, 46.03, 45.94, 48.21, 48.8], '1M': [51.09, 50.8, 47.95, 46.32, 47.21, 46.95, 49.86, 53.04, 55.35, 53.54, 50.38, 48.85, 48.19, 46.96, 50.36, 49.68, 46.96, 46.03, 45.94, 48.21, 48.8], 'YTD': [75.91, 113.7, 130.72, 118.06, 103.37, 87.78, 105.67, 86.18, 87, 89.53, 83.69, 70.51, 74.46, 74.41, 65.52, 62.05, 57.89, 54.22, 56.8, 58.43, 54.82, 54.21, 47.21, 50.34, 50.36, 48.8], '6M': [113.85, 108.16, 85.25, 87.05, 96.08, 86.18, 87, 87.53, 84.62, 71.94, 74.09, 73.55, 69.83, 61.26, 62.05, 57.89, 52.09, 56.18, 63.49, 57.73, 57.02, 50.8, 49.86, 50.38, 49.68, 48.8], '1Y': [55.42, 57.09, 59.4, 69.14, 64.02, 68.05, 64.5, 64.56, 76.35, 83.9, 91.37, 103.69, 95.3, 90.62, 89.78, 90.22, 76.59, 70.36, 75.05, 72.78, 77.03, 73.13, 82.3, 75.91, 104.04, 124.56, 110.39, 103.01, 94.41, 89.06, 94.31, 90.72, 87, 87.53, 84.62, 71.94, 74.09, 73.55, 69.83, 63.16, 61.93, 56.99, 54.22, 56.8, 63.27, 57.73, 57.02, 50.8, 49.86, 50.38, 49.68, 48.8] },
      velocityScore: { '1D': 2.6, '1W': 6.8, '1M': -16.1, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 287.1, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 2.95, PRN: false, RSHO: false, IDEF: 0.96, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.66, proScore: 0.66, coverage: 0.4,
      price: 584.83, weeklyPrices: [580.27, 575.22, 568.90, 585.35, 584.83], weeklyChange: 0.79, dayChange: -0.05, sortRank: 0, periodReturns: { '1M': -9.4, 'YTD': 30.4, '6M': 15.8, '1Y': 49 },
      priceHistory: { '1W': [580.27, 575.22, 568.9, 585.35, 584.83], '1M': [645.73, 633.44, 638.94, 648.89, 630.36, 634.78, 644.06, 620.47, 604.56, 609.6, 593.89, 595.61, 595.49, 584.59, 588.18, 590.14, 580.27, 575.22, 568.9, 585.35, 584.83], 'YTD': [448.43, 487.16, 498.82, 504.54, 516.1, 550.53, 551.42, 575.92, 552.91, 546.91, 537.2, 543.12, 580.55, 571.61, 601.39, 595.76, 605.99, 551.12, 584.4, 584.18, 576.74, 639.18, 630.36, 600.26, 588.18, 584.83], '6M': [504.99, 511.98, 520.16, 550.4, 559.18, 575.92, 552.91, 536.37, 531.11, 532.25, 552.4, 595.74, 596.86, 589.51, 595.76, 605.99, 569.06, 559.95, 566.14, 590.97, 616.95, 633.44, 644.06, 593.89, 590.14, 584.83], '1Y': [392.38, 385.08, 403.78, 404.99, 397.81, 399, 383.6, 374.88, 378.73, 383.7, 390.29, 373.47, 383.98, 392.33, 408.15, 427.24, 442.47, 423.39, 442.95, 438.15, 436.5, 451.17, 457.07, 448.43, 485, 497.06, 504.07, 499.67, 544.02, 552.44, 562.54, 584.89, 552.91, 536.37, 531.11, 532.25, 552.4, 595.74, 596.86, 591, 593.12, 613.59, 551.12, 584.4, 578.34, 590.97, 616.95, 633.44, 644.06, 593.89, 590.14, 584.83] },
      velocityScore: { '1D': 0, '1W': 43.5, '1M': 11.9, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 64.5, revenueGrowth: 18, eps: 9.07, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 2.84, PRN: false, RSHO: false, IDEF: 0.48, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.63, proScore: 0.65, coverage: 0.4,
      price: 273.57, weeklyPrices: [271.05, 269.13, 270.04, 268.76, 273.57], weeklyChange: 0.93, dayChange: 1.83, sortRank: 0, periodReturns: { '1M': -1.7, 'YTD': -19.6, '6M': -35.5, '1Y': 7.7 },
      priceHistory: { '1D': [268.66, 272.99, 273.57], '1W': [271.05, 269.13, 270.04, 268.76, 273.57], '1M': [278.19, 283.48, 279.62, 279.09, 281.99, 277.39, 279.89, 278.97, 291.5, 294.1, 289.47, 286.21, 286.09, 284.86, 280, 277.79, 271.05, 269.13, 270.04, 268.76, 273.57], 'YTD': [340.07, 386.99, 425.9, 422.79, 429.64, 392.7, 443.14, 444.52, 429.11, 416.59, 396.57, 379.9, 411.35, 396.17, 370.14, 360.6, 316.28, 329.35, 320.95, 287.54, 289.13, 285.43, 281.99, 289.46, 280, 273.57], '6M': [424.14, 427.83, 369.38, 406.76, 437.57, 444.52, 429.11, 415.71, 407.98, 381.79, 407.66, 394.46, 392.19, 359.29, 360.6, 316.28, 326.17, 320.63, 296.41, 292.26, 299.66, 283.48, 279.89, 289.47, 277.79, 273.57], '1Y': [253.96, 260.84, 270.92, 268, 265.4, 271.74, 269.33, 267.07, 273.19, 276.01, 287.91, 285.38, 291.94, 287.53, 299.14, 315.9, 324.19, 309.16, 314.73, 309.23, 314.95, 326.8, 354.52, 340.07, 378.47, 418.86, 418.58, 420.51, 397.77, 418.78, 438.01, 453.73, 429.11, 415.71, 407.98, 381.79, 407.66, 394.46, 392.19, 358.4, 363.37, 317.75, 329.35, 320.95, 293.66, 292.26, 299.66, 283.48, 279.89, 289.47, 277.79, 273.57] },
      velocityScore: { '1D': -1.5, '1W': -11, '1M': -27, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 17.8, revenueGrowth: 13, eps: 15.4, grossMargin: 12, dividendYield: 2.05,
      etfPresence: { AIRR: 2.25, PRN: false, RSHO: false, IDEF: 1, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 1.49, proScore: 0.6, coverage: 0.4,
      price: 47.57, weeklyPrices: [47.45, 46.17, 44.88, 46.67, 47.57], weeklyChange: 0.25, dayChange: 1.96, sortRank: 0, periodReturns: { '1M': -0.3, 'YTD': -35, '6M': -57.4, '1Y': -8.4 },
      priceHistory: { '1D': [46.66, 47.1, 47.57], '1W': [47.45, 46.17, 44.88, 46.67, 47.57], '1M': [47.7, 46.38, 44.84, 46.27, 46.42, 47.1, 49.92, 54.93, 56.37, 53.36, 49.96, 50.05, 50.01, 45.13, 45.83, 48.78, 47.45, 46.17, 44.88, 46.67, 47.57], 'YTD': [73.17, 106.22, 108.5, 113.34, 111.72, 79.52, 88.46, 88.11, 100.54, 104.08, 102.39, 80.05, 87.75, 87.91, 76.6, 65.73, 60.84, 66.21, 60.66, 51.84, 45.87, 50.37, 46.42, 51.47, 45.83, 47.57], '6M': [111.61, 110.93, 89.78, 78.71, 81.62, 88.11, 100.54, 99.98, 99.38, 84.07, 86.1, 87.79, 82.69, 70.22, 65.73, 60.84, 62.77, 64.1, 53.65, 49.64, 48.27, 46.38, 49.92, 49.96, 48.78, 47.57], '1Y': [51.96, 51.41, 50.39, 49.03, 49.87, 54.69, 53.26, 62.51, 64.86, 68.71, 72.2, 75.2, 77, 78.99, 85.34, 84.7, 69.38, 58.95, 64.96, 66.08, 63.75, 67.19, 79.98, 73.17, 101.28, 109.49, 108.22, 103.8, 95.36, 75.79, 81.27, 93.04, 100.54, 99.98, 99.38, 84.07, 86.1, 87.79, 82.69, 71.95, 65.32, 58.82, 66.21, 60.66, 54.65, 49.64, 48.27, 46.38, 49.92, 49.96, 48.78, 47.57] },
      velocityScore: { '1D': 1.7, '1W': 46.3, '1M': 13.2, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 206.8, revenueGrowth: 51, eps: 0.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 2.79, PRN: false, RSHO: false, IDEF: 0.19, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AIR', name: 'AIRBUS GROUP', easyScore: 2, avgWeight: 1.36, proScore: 0.54, coverage: 0.4,
      price: 134.74, weeklyPrices: [133.48, 135.34, 135.69, 141.40, 134.74], weeklyChange: 0.94, dayChange: -4.71, sortRank: 0, periodReturns: { '1M': 0.3, 'YTD': 62.7, '6M': 25.1, '1Y': 70.5 },
      priceHistory: { '1W': [133.48, 135.34, 135.69, 141.4, 134.74], '1M': [134.28, 132.26, 132.94, 138.51, 143.14, 141.85, 142.93, 142.76, 140.11, 143.61, 133.3, 136.57, 135.67, 130.9, 134.46, 135.73, 133.48, 135.34, 135.69, 141.4, 134.74], 'YTD': [82.79, 97.03, 105.08, 105.47, 109.89, 113.57, 115.55, 117.17, 108.52, 105.64, 103.49, 109.46, 120.78, 118.51, 112.08, 110.35, 117.78, 103.79, 112.74, 111.36, 117.36, 134.88, 143.14, 136.63, 134.46, 134.74], '6M': [107.74, 106.67, 106.87, 113.22, 116.97, 117.17, 108.52, 101.91, 101.33, 107.25, 114, 123.77, 121.97, 110.54, 110.35, 117.78, 104.55, 108.41, 109.99, 114.72, 131.18, 132.26, 142.93, 133.3, 135.73, 134.74], '1Y': [79.01, 76.1, 72.4, 78.01, 73.85, 76.79, 75.68, 73.92, 75.75, 78.35, 89.67, 83.06, 82.93, 84.73, 84.56, 83.96, 83.84, 77.76, 82.51, 82.64, 79.47, 81.49, 85.44, 82.79, 94.73, 105.74, 105.66, 105.91, 113.09, 112.98, 116.69, 119.77, 108.52, 101.91, 101.33, 107.25, 114, 123.77, 121.97, 110.2, 109.56, 117.57, 103.79, 112.74, 110.61, 114.72, 131.18, 132.26, 142.93, 133.3, 135.73, 134.74] },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 29.6, revenueGrowth: 23, eps: 4.55, grossMargin: 19, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 2.54, BILT: false },
      tonyNote: 'AIRBUS GROUP appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 1.26, proScore: 0.5, coverage: 0.4,
      price: 73.53, weeklyPrices: [74.73, 73.38, 74.16, 73.36, 73.53], weeklyChange: -1.6, dayChange: 0.23, sortRank: 0, periodReturns: { '1M': -1.9, 'YTD': 22.3, '6M': 15.4, '1Y': 28.2 },
      priceHistory: { '1D': [73.36, 73.58, 73.53], '1W': [74.73, 73.38, 74.16, 73.36, 73.53], '1M': [74.95, 75.79, 75.87, 77.53, 77.92, 75.06, 74.34, 72.77, 73.14, 72.82, 75.27, 75.45, 75.02, 74.46, 75.98, 74.38, 74.73, 73.38, 74.16, 73.36, 73.53], 'YTD': [60.11, 60.32, 61.55, 65.48, 68.5, 71.12, 72.17, 74.72, 74.24, 73.89, 73.6, 72.78, 73.01, 70.86, 71.65, 75.54, 71.96, 77.69, 76.34, 71.66, 72.26, 73.12, 77.92, 75.08, 75.98, 73.53], '6M': [63.72, 67.24, 67.42, 71.13, 72.98, 74.72, 74.24, 73.34, 72.41, 73.58, 72.59, 71.54, 70.91, 72.18, 75.54, 71.96, 77.72, 78.47, 70.04, 71.59, 71.49, 75.79, 74.34, 75.27, 74.38, 73.53], '1Y': [57.36, 58.89, 59, 57.76, 56.57, 57.13, 57.73, 57.57, 57.95, 61.39, 63.35, 63.97, 62.36, 62.34, 57.59, 56.51, 60.6, 59.17, 59.37, 61.55, 61.55, 58.41, 59.75, 60.11, 61.15, 60.29, 64.96, 67.26, 66.92, 72.28, 72.98, 76.26, 74.24, 73.34, 72.41, 73.58, 72.59, 71.54, 70.91, 71.61, 75.41, 74.18, 77.69, 76.34, 71.31, 71.59, 71.49, 75.79, 74.34, 75.27, 74.38, 73.53] },
      velocityScore: { '1D': -2, '1W': -2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$90B', pe: 32.3, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.86,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.92, IDEF: false, BILT: 1.59 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.2, proScore: 0.48, coverage: 0.4,
      price: 97.27, weeklyPrices: [96.00, 96.08, 94.73, 98.64, 97.27], weeklyChange: 1.32, dayChange: -1.39, sortRank: 0, periodReturns: { '1M': -13, 'YTD': 33.2, '6M': -2.2, '1Y': 88.8 },
      priceHistory: { '1W': [96, 96.08, 94.73, 98.64, 97.27], '1M': [111.76, 110.87, 105, 105.57, 109.38, 110.22, 122.33, 123.05, 126.21, 123.07, 112.41, 114.25, 107.98, 98.26, 100.32, 102.97, 96, 96.08, 94.73, 98.64, 97.27], 'YTD': [73.01, 93.48, 103.02, 101.04, 99.28, 80.33, 89.86, 89.03, 86.42, 80.71, 78.29, 72.91, 80.81, 84.91, 78.91, 78.55, 90.34, 93.39, 99.32, 111.59, 106.81, 113.91, 109.38, 115.83, 100.32, 97.27], '6M': [99.48, 98.29, 79.07, 80.25, 87.63, 89.03, 86.42, 78.16, 77.26, 71.4, 75.76, 82.52, 84.12, 77.99, 78.55, 90.34, 92.03, 98.55, 111.28, 110.94, 115.93, 110.87, 122.33, 112.41, 102.97, 97.27], '1Y': [51.51, 51.88, 54.24, 68.02, 64.22, 67.64, 67.47, 68.69, 74.59, 75.34, 77.4, 83.47, 77.76, 78.81, 77.6, 75.71, 72.74, 67.94, 69.05, 70.23, 71.86, 71.8, 75.07, 73.01, 88.74, 102.95, 99.05, 93.88, 82.2, 82.36, 85.9, 91.01, 86.42, 78.16, 77.26, 71.4, 75.76, 82.52, 84.12, 77.06, 78.53, 91.95, 93.39, 99.32, 112.87, 110.94, 115.93, 110.87, 122.33, 112.41, 102.97, 97.27] },
      velocityScore: { '1D': 2.1, '1W': 17.1, '1M': -12.7, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.47, PRN: false, RSHO: false, IDEF: 0.93, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MWH', name: 'SOLV Energy, Inc. (Class A)', easyScore: 2, avgWeight: 0.95, proScore: 0.38, coverage: 0.4,
      price: 28.43, weeklyPrices: [28.74, 28.41, 27.98, 28.54, 28.43], weeklyChange: -1.08, dayChange: -0.38, sortRank: 0, periodReturns: { '1M': -17.5, 'YTD': -8, '6M': -8, '1Y': -8 },
      priceHistory: { '1W': [28.74, 28.41, 27.98, 28.54, 28.43], '1M': [34.46, 32.63, 34.46, 36.84, 35.84, 35.35, 34.05, 31.52, 30.45, 31.34, 28.97, 28.43, 28.92, 27.32, 28.81, 29.76, 28.74, 28.41, 27.98, 28.54, 28.43], 'YTD': [30.91, 30.5, 30.29, 29.71, 28.15, 30, 28.45, 28.51, 28.9, 31.66, 34.47, 37.63, 37.53, 42.27, 45.84, 40.42, 39.48, 34.63, 32.81, 31.75, 34.21, 35.84, 30.45, 28.43, 28.74, 28.43], '6M': [30.91, 30.5, 30.29, 29.71, 28.15, 30, 28.45, 28.51, 28.9, 31.66, 34.47, 37.63, 37.53, 42.27, 45.84, 40.42, 39.48, 34.63, 32.81, 31.75, 34.21, 35.84, 30.45, 28.43, 28.74, 28.43], '1Y': [30.91, 31.86, 30.5, 31.34, 30.29, 31.53, 29.71, 27.04, 28.15, 28.54, 29.15, 28.5, 28.45, 29.48, 28.2, 30.03, 29.72, 28.32, 30.14, 33.97, 33.91, 34.85, 36.68, 38.82, 37.23, 39.84, 45.19, 42.07, 44.83, 46.77, 43.44, 37.56, 38.12, 38.11, 35.53, 36.46, 35.64, 33.18, 29.99, 31.75, 34.48, 34.46, 34.46, 35.84, 34.05, 30.45, 29.03, 28.43, 28.81, 28.74, 27.98, 28.43] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 45.9, revenueGrowth: 66, eps: 0.62, grossMargin: 19, dividendYield: null,
      etfPresence: { AIRR: 1.07, PRN: false, RSHO: 0.82, IDEF: false, BILT: false },
      tonyNote: 'SOLV Energy, Inc. (Class A) appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.9% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DCO', name: 'Ducommun Incorporated', easyScore: 2, avgWeight: 0.55, proScore: 0.22, coverage: 0.4,
      price: 175.41, weeklyPrices: [174.45, 168.67, 168.47, 168.66, 175.41], weeklyChange: 0.55, dayChange: 0.74, sortRank: 0, periodReturns: { '1M': 6.4, 'YTD': 84.4, '6M': 52.2, '1Y': 98.8 },
      priceHistory: { '1W': [174.45, 168.67, 168.47, 168.66, 175.41], '1M': [164.9, 162.26, 165.31, 170.41, 177.66, 184.42, 185.21, 190.25, 186.6, 189.18, 179.95, 172.64, 170.84, 165.05, 163.5, 168.75, 174.45, 168.67, 168.47, 168.66, 175.41], 'YTD': [95.13, 105.58, 114.24, 110.46, 121.42, 121.17, 126.18, 122.4, 128.91, 125.15, 122.73, 117.1, 138.14, 141.35, 143.16, 141.93, 137.23, 143.75, 150.03, 150.26, 153.95, 163.49, 177.66, 189.18, 168.75, 175.41], '6M': [115.23, 111.12, 118.71, 120.52, 126.18, 122.4, 130.19, 125.68, 125.01, 121.42, 127.04, 139.99, 138, 143.16, 141.93, 137.74, 151.59, 142.92, 152.22, 149.89, 164.54, 164.9, 184.42, 179.95, 168.75, 175.41], '1Y': [88.25, 90.73, 91.17, 92.54, 87.88, 93.87, 90.95, 89.5, 93.21, 93.91, 96.13, 96.42, 96.25, 95.19, 93.08, 91.34, 96.3, 88.72, 87.27, 90.09, 90.67, 93.44, 97.87, 95.13, 105.58, 113.92, 115.07, 111.72, 119.25, 120.16, 126.58, 123.59, 128.91, 125.15, 120.57, 120.78, 127.04, 139.99, 138, 139.41, 141.24, 137.23, 143.75, 144.37, 148.62, 150.04, 164.54, 164.9, 184.42, 179.95, 168.75, 175.41] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: null, revenueGrowth: 9, eps: -1.72, grossMargin: 27, dividendYield: null,
      etfPresence: { AIRR: 0.73, PRN: false, RSHO: false, IDEF: 0.37, BILT: false },
      tonyNote: 'Ducommun Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.52, proScore: 0.21, coverage: 0.4,
      price: 46.19, weeklyPrices: [43.10, 44.14, 44.41, 45.46, 46.19], weeklyChange: 7.16, dayChange: 1.59, sortRank: 0, periodReturns: { '1M': 2.7, 'YTD': 35.5, '6M': 11.9, '1Y': 0.1 },
      priceHistory: { '1D': [45.46, 45.75, 46.19], '1W': [43.1, 44.14, 44.41, 45.46, 46.19], '1M': [44.99, 45.74, 44.69, 44.36, 42.48, 40.95, 42.67, 42.69, 43.72, 45.37, 44.71, 44.67, 44.15, 43.35, 44.37, 43.82, 43.1, 44.14, 44.41, 45.46, 46.19], 'YTD': [34.09, 40.99, 42.57, 42.16, 41.51, 37.87, 41.07, 43.39, 46.58, 45.3, 44.4, 44.52, 47.93, 44.94, 41.41, 40.03, 41.36, 42.84, 45.8, 45.61, 46.11, 46.08, 42.48, 45.47, 44.37, 46.19], '6M': [41.28, 41.3, 37.27, 37.77, 40.03, 43.39, 46.58, 45.3, 43.82, 44.84, 46.73, 47.43, 44.24, 39.98, 40.03, 41.36, 41.5, 44.92, 47.96, 46.55, 46.68, 45.74, 42.67, 44.71, 43.82, 46.19], '1Y': [46.14, 48.2, 41.48, 41.87, 41.17, 41.93, 41.79, 40.33, 41.78, 43.1, 45.4, 44.72, 43.85, 40.35, 40.18, 36.15, 35.59, 34, 33.78, 33.79, 33.96, 33.12, 34.62, 34.09, 38.84, 42.26, 40.99, 41.06, 38.93, 38.13, 38.14, 45.49, 46.58, 45.3, 43.82, 44.84, 46.73, 47.43, 44.24, 40.72, 40, 41.49, 42.84, 45.8, 47.39, 46.55, 46.68, 45.74, 42.67, 44.71, 43.82, 46.19] },
      velocityScore: { '1D': 0, '1W': -8.7, '1M': -25, '6M': null }, isNew: false,
      marketCap: '$12B', pe: 43.2, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.79,
      etfPresence: { AIRR: 0.73, PRN: false, RSHO: false, IDEF: 0.31, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.4, proScore: 0.16, coverage: 0.4,
      price: 86.78, weeklyPrices: [78.89, 78.62, 80.54, 86.78, 86.78], weeklyChange: 10, dayChange: 0.03, sortRank: 0, periodReturns: { '1M': 6.5, 'YTD': 29.5, '6M': 13, '1Y': 78.9 },
      priceHistory: { '1W': [78.89, 78.62, 80.54, 86.78, 86.78], '1M': [81.5, 81, 82.36, 81.56, 79.53, 81.88, 82.97, 79.51, 76.75, 79.91, 75.49, 74.98, 75.89, 74.74, 77.77, 79.29, 78.89, 78.62, 80.54, 86.78, 86.78], 'YTD': [67.02, 70.53, 75.09, 78.53, 82.33, 85.07, 84.9, 75.37, 72.82, 71.31, 72.44, 77.19, 80.54, 84.39, 86.48, 93.68, 82.85, 75.43, 74.67, 72.26, 68.72, 77.99, 79.53, 74.87, 77.77, 86.78], '6M': [76.79, 79.86, 79.95, 81.73, 86.9, 75.37, 72.82, 67.76, 69.34, 76.15, 77.66, 83.8, 84.38, 86.76, 93.68, 82.85, 79.49, 72.76, 74.26, 72.13, 76.55, 81, 82.97, 75.49, 79.29, 86.78], '1Y': [48.51, 46.91, 47.66, 58.77, 56.02, 58.99, 59.03, 60.47, 63.88, 66.54, 65.59, 61.61, 63.27, 66.87, 68.4, 65.72, 62.63, 60.48, 65.16, 67.63, 68.59, 69.46, 68.65, 67.02, 70.17, 75.17, 76.01, 78.89, 83.48, 82.74, 84.99, 73.57, 72.82, 67.76, 69.34, 76.15, 77.66, 83.8, 84.38, 87.5, 92.76, 82.79, 75.43, 74.67, 74.29, 72.13, 76.55, 81, 82.97, 75.49, 79.29, 86.78] },
      velocityScore: { '1D': 6.7, '1W': 6.7, '1M': -11.1, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 59.4, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.28,
      etfPresence: { AIRR: 0.76, PRN: false, RSHO: false, IDEF: 0.04, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AVEX', name: 'AEVEX Corp. (Class A)', easyScore: 2, avgWeight: 0.34, proScore: 0.14, coverage: 0.4,
      price: 15.1, weeklyPrices: [15.82, 14.50, 13.32, 14.75, 15.10], weeklyChange: -4.55, dayChange: 2.51, sortRank: 0, periodReturns: { '1M': -13.6, 'YTD': -43.9, '6M': -43.9, '1Y': -43.9 },
      priceHistory: { '1W': [15.82, 14.5, 13.32, 14.75, 15.1], '1M': [17.48, 17.94, 15.34, 15.43, 17.2, 17.94, 20.89, 19.63, 20.69, 19.6, 17.35, 16.54, 16.46, 15.91, 16.61, 17.79, 15.82, 14.5, 13.32, 14.75, 15.1], 'YTD': [26.93, 30.17, 29.7, 30.79, 27.89, 26.12, 24.41, 25.89, 28.58, 26.27, 28.89, 38.47, 32.44, 22.87, 22.2, 20.56, 19.82, 17.48, 15.43, 17.94, 20.69, 17.35, 16.46, 17.79, 14.5, 15.1], '6M': [26.93, 30.17, 29.7, 30.79, 27.89, 26.12, 24.41, 25.89, 28.58, 26.27, 28.89, 38.47, 32.44, 22.87, 22.2, 20.56, 19.82, 17.48, 15.43, 17.94, 20.69, 17.35, 16.46, 17.79, 14.5, 15.1], '1Y': [26.93, 33.41, 30.17, 31.77, 29.7, 33.95, 30.79, 30.25, 27.89, 26.87, 26.12, 23.83, 25.07, 28.15, 25.89, 24.15, 24.87, 26.33, 26.27, 26.72, 26.82, 30.87, 40.48, 38.47, 32.44, 27.66, 24.61, 22.87, 22.2, 20.35, 21.46, 21.69, 19.85, 19.82, 18.3, 17.94, 15.34, 15.43, 17.2, 20.89, 19.63, 20.69, 17.42, 17.35, 16.54, 16.46, 16.61, 17.79, 15.82, 14.5, 14.75, 15.1] },
      velocityScore: { '1D': 7.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$853M', pe: 38.7, revenueGrowth: 307, eps: 0.39, grossMargin: 25, dividendYield: null,
      etfPresence: { AIRR: 0.48, PRN: false, RSHO: false, IDEF: 0.21, BILT: false },
      tonyNote: 'AEVEX Corp. (Class A) appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RTX', name: 'RTX CORP', easyScore: 1, avgWeight: 8.71, proScore: 1.74, coverage: 0.2,
      price: 196.63, weeklyPrices: [194.36, 193.51, 194.44, 193.67, 196.63], weeklyChange: 1.17, dayChange: 1.52, sortRank: 0, periodReturns: { '1M': 8.1, 'YTD': 7.2, '6M': 0.2, '1Y': 31.8 },
      priceHistory: { '1D': [193.69, 196.1, 196.63], '1W': [194.36, 193.51, 194.44, 193.67, 196.63], '1M': [181.83, 186.39, 185.06, 186.59, 187.99, 187.33, 189.73, 191.78, 199.25, 201.37, 194.91, 195.2, 195.93, 196.39, 193.39, 195.89, 194.36, 193.51, 194.44, 193.67, 196.63], 'YTD': [183.4, 188.5, 201.92, 201.28, 203.5, 196.51, 205.41, 202.62, 209.76, 206.06, 194.82, 192.9, 203.48, 195.85, 179.3, 173.99, 176.09, 175.95, 178.97, 172.55, 177.41, 185.6, 187.99, 200.85, 193.39, 196.63], '6M': [196.34, 199.88, 195.97, 201.14, 204.92, 202.62, 209.76, 204.52, 198.16, 189.71, 198.41, 201.41, 195.79, 174.26, 173.99, 176.09, 171.18, 177.01, 174.41, 178.66, 183.64, 186.39, 189.73, 194.91, 195.89, 196.63], '1Y': [149.17, 157.12, 156.33, 155.49, 153.66, 159.57, 158.11, 151.75, 158.58, 160.54, 167.33, 169.27, 159.4, 173.04, 178.67, 175.61, 179.22, 174.72, 172.15, 168.45, 171.93, 179.93, 185.76, 183.4, 187.17, 199.83, 195.93, 200.93, 198.66, 200.06, 201.92, 212.16, 209.76, 204.52, 198.16, 189.71, 198.41, 201.41, 195.79, 173.38, 172.9, 178.61, 175.95, 178.97, 174.26, 178.66, 183.64, 186.39, 189.73, 194.91, 195.89, 196.63] },
      velocityScore: { '1D': -1.1, '1W': 1.2, '1M': -13.4, '6M': null }, isNew: false,
      marketCap: '$265B', pe: 36.9, revenueGrowth: 9, eps: 5.33, grossMargin: 20, dividendYield: 1.51,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 8.71, BILT: false },
      tonyNote: 'RTX CORP appears in 1 of 5 Industrials ETFs (20% coverage) with average weight 8.7% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.17, proScore: 4.17, coverage: 1,
      price: 218.14, weeklyPrices: [171.77, 177.71, 182.62, 216.92, 218.14], weeklyChange: 27, dayChange: 0.56, sortRank: 0, periodReturns: { '1M': -23.1, 'YTD': 160.6, '6M': 125.2, '1Y': 327.6 },
      priceHistory: { '1D': [216.92, 213.07, 218.14], '1W': [171.77, 177.71, 182.62, 216.92, 218.14], '1M': [283.61, 275.25, 259.66, 256.63, 240.3, 261.15, 276.17, 229.18, 215.62, 213.02, 216.48, 216.2, 219.65, 210.51, 194.09, 199.51, 171.77, 177.71, 182.62, 216.92, 218.14], 'YTD': [83.71, 97.93, 108.73, 97.87, 89.95, 88.61, 107.61, 91.19, 89.33, 129.85, 114.15, 103.76, 125, 165.34, 157.08, 154.49, 177.05, 199.86, 208.06, 251.68, 211.69, 286.69, 240.3, 195.19, 194.09, 218.14], '6M': [96.85, 94.91, 73.87, 89.73, 97.92, 91.19, 89.33, 112.95, 117.62, 100.82, 112.54, 154.56, 159.16, 147.16, 154.49, 177.05, 219.94, 214.77, 264.51, 218, 260.07, 275.25, 276.17, 216.48, 199.51, 218.14], '1Y': [51.01, 50.4, 55.17, 75.33, 67.19, 70.48, 65.65, 95.72, 89.43, 107.8, 112.27, 117.7, 128.15, 104.28, 121.83, 110.54, 102.22, 90.54, 88.88, 98.92, 96.41, 80.95, 90.03, 83.71, 97.3, 103.89, 94.5, 85.19, 86.1, 98.01, 100.61, 91.01, 89.33, 112.95, 117.62, 100.82, 112.54, 154.56, 159.16, 144.96, 176.42, 186.1, 199.86, 208.06, 260.58, 218, 260.07, 275.25, 276.17, 216.48, 199.51, 218.14] },
      velocityScore: { '1D': 0.5, '1W': -2.8, '1M': -23.8, '6M': null }, isNew: false,
      marketCap: '$55B', pe: 84.6, revenueGrowth: 684, eps: 2.58, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 2.68, MEME: 6.69, RKNG: 3.15 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 2, avgWeight: 5.05, proScore: 3.37, coverage: 0.667,
      price: 41.73, weeklyPrices: [34.83, 33.62, 40.20, 41.29, 41.73], weeklyChange: 19.82, dayChange: 1.08, sortRank: 0, periodReturns: { '1M': -26.6, 'YTD': 10.5, '6M': -20.1, '1Y': 124.5 },
      priceHistory: { '1D': [41.29, 40.97, 41.73], '1W': [34.83, 33.62, 40.2, 41.29, 41.73], '1M': [56.87, 54.72, 50.3, 47.74, 47.21, 45.91, 45.73, 43.32, 38.82, 43.91, 43.01, 41.72, 41.14, 38.98, 38.59, 38.28, 34.83, 33.62, 40.2, 41.29, 41.73], 'YTD': [37.77, 46.03, 57.82, 59.99, 54.39, 42.67, 43.29, 40.95, 36.7, 44.94, 42.16, 34.28, 36.83, 47.7, 52.02, 45.66, 61.2, 50.46, 59.78, 65.48, 51.52, 59.96, 47.21, 39.81, 38.59, 41.73], '6M': [52.26, 59.84, 39.79, 40.03, 39.98, 40.95, 36.7, 41.58, 41.29, 35.09, 35.13, 43.07, 48.72, 50.64, 45.66, 61.2, 52.94, 56.83, 65.33, 59.19, 60.85, 54.72, 45.73, 43.01, 38.28, 41.73], '1Y': [18.59, 15.79, 16.45, 17.83, 18.73, 22.99, 28.21, 30.19, 36.45, 41.77, 46.93, 61.68, 69.56, 55.19, 62.42, 66.63, 57.38, 48.85, 47.47, 43.96, 46.84, 36.59, 42.07, 37.77, 45.68, 51.89, 56.68, 53.74, 41.83, 42.22, 42.36, 41.39, 36.7, 41.58, 41.29, 35.09, 35.13, 43.07, 48.72, 48.36, 49.48, 55.15, 50.46, 59.78, 66.6, 59.19, 60.85, 54.72, 45.73, 43.01, 38.28, 41.73] },
      velocityScore: { '1D': 12.3, '1W': 24.4, '1M': -19.2, '6M': null }, isNew: false,
      marketCap: '$15B', pe: 54.2, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 2.63, MEME: 7.48, RKNG: false },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 4.97, proScore: 3.32, coverage: 0.667,
      price: 224, weeklyPrices: [206.73, 214.96, 197.06, 226.26, 224.00], weeklyChange: 8.35, dayChange: -1.13, sortRank: 0, periodReturns: { '1M': -35.2, 'YTD': 157.8, '6M': 53.8, '1Y': 763.9 },
      priceHistory: { '1D': [226.55, 223.65, 224], '1W': [206.73, 214.96, 197.06, 226.26, 224], '1M': [345.85, 321.98, 326.19, 309.18, 252.02, 275.01, 302.7, 289.5, 270.89, 295.05, 254.29, 257.02, 244.61, 233.49, 243.4, 239.38, 206.73, 214.96, 197.06, 226.26, 224], 'YTD': [86.89, 134.07, 149.5, 152.31, 168.89, 155.54, 159, 155.67, 135.19, 153.68, 141.33, 135.49, 146.78, 210.06, 237.57, 290.52, 261.03, 258.71, 302.4, 287.32, 234.23, 328.91, 252.02, 269.57, 243.4, 224], '6M': [145.63, 156.51, 136.6, 139.03, 147.55, 155.67, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 231.17, 290.52, 261.03, 275.95, 302.49, 273.51, 253.57, 274.5, 321.98, 302.7, 254.29, 239.38, 224], '1Y': [25.93, 34.75, 37.61, 41.25, 43.1, 49.94, 52.45, 55, 73.29, 77.38, 84.57, 86.06, 114.06, 104.38, 113.28, 129.05, 127.07, 104.97, 94.29, 102.5, 109.44, 87.61, 91.43, 86.89, 121.84, 139.17, 144.89, 151.37, 143.03, 139.74, 160.28, 166, 135.19, 154.51, 150.12, 133.24, 135, 176.67, 218.27, 234.68, 288.64, 283.92, 258.71, 302.4, 302.85, 253.57, 274.5, 321.98, 302.7, 254.29, 239.38, 224] },
      velocityScore: { '1D': -6.7, '1W': -7.3, '1M': -8.8, '6M': null }, isNew: false,
      marketCap: '$64B', pe: null, revenueGrowth: 130, eps: -0.05, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.58, RKNG: 3.37 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 4.54, proScore: 3.02, coverage: 0.667,
      price: 1541.59, weeklyPrices: [1411.08, 1354.82, 1390.95, 1589.40, 1541.59], weeklyChange: 9.25, dayChange: -3.01, sortRank: 0, periodReturns: { '1M': -32.2, 'YTD': 549.4, '6M': 206.2, '1Y': 3627.2 },
      priceHistory: { '1D': [1589.4, 1526.57, 1541.59], '1W': [1411.08, 1354.82, 1390.95, 1589.4, 1541.59], '1M': [2273.73, 1963.6, 1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745, 1744.43, 1727.18, 1858.27, 1915.92, 1673.97, 1757.82, 1615, 1411.08, 1354.82, 1390.95, 1589.4, 1541.59], 'YTD': [237.38, 377.41, 413.62, 481.43, 695.51, 599.34, 621.09, 635.36, 527.33, 703.63, 702.49, 635.34, 780.9, 919.47, 932.43, 1187, 1562.34, 1333.01, 1589.55, 1831.5, 1643.23, 2184.75, 2090.71, 1617.7, 1757.82, 1541.59], '6M': [503.44, 539.3, 576.2, 630.29, 649.97, 635.36, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 989.9, 1187, 1562.34, 1407.61, 1478.69, 1761.43, 1642, 2107.86, 1963.6, 2273.73, 1727.18, 1615, 1541.59], '1Y': [41.36, 42.93, 41.93, 46.83, 44.58, 47.35, 53.01, 70.51, 91.55, 106.4, 112.2, 120.95, 127.29, 149.29, 175.53, 194.57, 271.58, 244.93, 220.5, 194.38, 219.46, 209.31, 244.9, 237.38, 334.54, 409.24, 473.83, 576.25, 597.95, 626.56, 666.49, 619.08, 527.33, 661.62, 709.71, 615.83, 724.63, 952.5, 913.02, 1070.2, 1255.86, 1547.56, 1333.01, 1589.55, 1716.36, 1642, 2107.86, 1963.6, 2273.73, 1727.18, 1615, 1541.59] },
      velocityScore: { '1D': 0.3, '1W': null, '1M': -32.1, '6M': null }, isNew: false,
      marketCap: '$228B', pe: 52.7, revenueGrowth: 251, eps: 29.24, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6, RKNG: 3.07 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 2, avgWeight: 4.27, proScore: 2.85, coverage: 0.667,
      price: 544.82, weeklyPrices: [466.81, 477.22, 487.42, 548.39, 544.82], weeklyChange: 16.71, dayChange: -0.65, sortRank: 0, periodReturns: { '1M': -25.6, 'YTD': 216.3, '6M': 123.9, '1Y': 712.4 },
      priceHistory: { '1D': [548.39, 534.21, 544.82], '1W': [466.81, 477.22, 487.42, 548.39, 544.82], '1M': [732.62, 670.75, 643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 550.3, 578.05, 582.59, 555.55, 563.32, 513.84, 466.81, 477.22, 487.42, 548.39, 544.82], 'YTD': [172.27, 200.46, 221.51, 252.66, 290.24, 273.74, 284.67, 279.7, 245.25, 286.21, 294.79, 270.49, 338.78, 361.69, 403.12, 431.52, 480, 458.68, 524.65, 594.11, 490.09, 746.23, 586.45, 532.1, 563.32, 544.82], '6M': [243.29, 278.41, 260.19, 284.1, 285.52, 279.7, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 404, 431.52, 480, 482.02, 484.28, 546.2, 526.93, 653.53, 670.75, 638.72, 550.3, 513.84, 544.82], '1Y': [67.06, 70.61, 75.84, 75.91, 75.86, 79.71, 86, 94.54, 103.09, 110.25, 120.06, 119.93, 113.13, 121.41, 124.92, 152.18, 169.99, 152.86, 155.41, 155.59, 169.54, 174.58, 178.25, 172.27, 187.68, 222.1, 236.39, 250.23, 282.58, 281.58, 280.42, 270.08, 245.25, 272.29, 293.1, 275.34, 304.15, 350.16, 374.11, 400.73, 442.36, 515.83, 458.68, 524.65, 563.1, 526.93, 653.53, 670.75, 638.72, 550.3, 513.84, 544.82] },
      velocityScore: { '1D': 0.4, '1W': -5.6, '1M': -26.4, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 32.6, revenueGrowth: 46, eps: 16.73, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { BUZZ: false, MEME: 4.98, RKNG: 3.56 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'WULF', name: 'WULF', easyScore: 2, avgWeight: 4.24, proScore: 2.83, coverage: 0.667,
      price: 20.03, weeklyPrices: [17.98, 18.16, 18.86, 19.87, 20.03], weeklyChange: 11.4, dayChange: 0.81, sortRank: 0, periodReturns: { '1M': -29.2, 'YTD': 74.3, '6M': 55.4, '1Y': 280.8 },
      priceHistory: { '1D': [19.87, 19.61, 20.03], '1W': [17.98, 18.16, 18.86, 19.87, 20.03], '1M': [28.31, 28.78, 26.97, 26.06, 25.83, 25.58, 24.7, 23.58, 21.18, 22.21, 22.83, 23.2, 21.97, 20.89, 19.41, 19.37, 17.98, 18.16, 18.86, 19.87, 20.03], 'YTD': [11.49, 13.1, 13.85, 15.31, 14.8, 16.03, 15.47, 16.22, 13.75, 16.41, 16.19, 14.43, 18.05, 19.31, 20.37, 21.31, 23.39, 21.14, 25.18, 26.16, 23.19, 28.98, 25.83, 20.24, 19.41, 20.03], '6M': [12.89, 14.54, 11.92, 15.91, 15.01, 16.22, 13.75, 14.67, 15.1, 14.89, 15.55, 19.45, 20.5, 20.01, 21.31, 23.39, 22.32, 22.82, 25.66, 25.86, 28.17, 28.78, 24.7, 22.83, 19.37, 20.03], '1Y': [5.26, 5.22, 5.06, 5.24, 8.78, 9.24, 8.98, 10.3, 10.94, 11.24, 11.42, 12.1, 15.46, 13.14, 15.94, 15.01, 12.37, 12, 13.94, 14.43, 15.59, 12.99, 12.42, 11.49, 12.84, 13.83, 14.12, 13.37, 14.29, 16.26, 15.68, 16.02, 13.75, 14.67, 15.1, 14.89, 15.55, 19.45, 20.5, 21.43, 22.29, 23.37, 21.14, 25.18, 26.49, 25.86, 28.17, 28.78, 24.7, 22.83, 19.37, 20.03] },
      velocityScore: { '1D': 1.4, '1W': -1.4, '1M': 93.8, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: -1, eps: -2.51, grossMargin: 64, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.55, RKNG: 2.93 },
      tonyNote: 'WULF appears in 2 of 3 Meme ETFs (67% coverage) with average weight 4.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'LITE', name: 'LITE', easyScore: 2, avgWeight: 4.21, proScore: 2.8, coverage: 0.667,
      price: 839.25, weeklyPrices: [706.23, 732.82, 765.55, 837.56, 839.25], weeklyChange: 18.83, dayChange: 0.2, sortRank: 0, periodReturns: { '1M': -6.1, 'YTD': 127.7, '6M': 136.7, '1Y': 742.4 },
      priceHistory: { '1D': [837.56, 820.99, 839.25], '1W': [706.23, 732.82, 765.55, 837.56, 839.25], '1M': [893.93, 827.92, 842.53, 861.97, 816.98, 851.4, 858.06, 801.16, 728.32, 731.25, 707.1, 785.77, 802.01, 768.15, 814.8, 752, 706.23, 732.82, 765.55, 837.56, 839.25], 'YTD': [368.59, 351.42, 324.25, 370.66, 435.1, 574.11, 635.64, 700.91, 558.44, 624.84, 728.95, 702.76, 896.02, 891.22, 846.89, 949.93, 903.8, 884.98, 910.81, 938, 853.26, 850, 816.98, 698.91, 814.8, 839.25], '6M': [354.49, 381.44, 504.42, 583.46, 667.77, 700.91, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 881.64, 949.93, 903.8, 970.7, 946.9, 905, 895.4, 957.24, 827.92, 858.06, 707.1, 752, 839.25], '1Y': [99.63, 109.48, 108.15, 119.66, 117.96, 124.62, 134.12, 151.73, 170.9, 163.99, 162.71, 157.15, 156.78, 162.95, 198.39, 188.36, 252.47, 247.43, 291.27, 302.98, 360.33, 316.15, 387.41, 368.59, 348.26, 343.27, 339.19, 391.84, 551.99, 562.74, 674.73, 783.25, 558.44, 622.5, 706.35, 702.73, 772.28, 871.18, 895.11, 859.68, 976.18, 1053.09, 884.98, 910.81, 1029.15, 895.4, 957.24, 827.92, 858.06, 707.1, 752, 839.25] },
      velocityScore: { '1D': 1.4, '1W': 60.9, '1M': -5.1, '6M': null }, isNew: false,
      marketCap: '$65B', pe: 147.2, revenueGrowth: 90, eps: 5.7, grossMargin: 41, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.21, RKNG: 3.2 },
      tonyNote: 'LITE appears in 2 of 3 Meme ETFs (67% coverage) with average weight 4.2% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ONDS', name: 'Ondas Holdings', easyScore: 2, avgWeight: 4.16, proScore: 2.77, coverage: 0.667,
      price: 7.92, weeklyPrices: [6.65, 6.53, 6.87, 7.66, 7.92], weeklyChange: 19.1, dayChange: 3.39, sortRank: 0, periodReturns: { '1M': -10.9, 'YTD': -18.8, '6M': -37.2, '1Y': 277.2 },
      priceHistory: { '1D': [7.66, 7.9, 7.92], '1W': [6.65, 6.53, 6.87, 7.66, 7.92], '1M': [8.89, 8.53, 7.68, 7.68, 7.83, 8.02, 8.24, 7.92, 7.41, 7.82, 7.52, 7.65, 7.26, 6.96, 7.36, 7.05, 6.65, 6.53, 6.87, 7.66, 7.92], 'YTD': [9.76, 13.69, 12.16, 12.26, 11.38, 9.23, 11.39, 10.08, 9.83, 10.53, 10.9, 9.04, 9.45, 10.2, 10.54, 10.32, 9.06, 9.7, 9.77, 11.61, 9.31, 9.27, 7.83, 7.35, 7.36, 7.92], '6M': [12.62, 11.27, 8.48, 8.97, 10.03, 10.08, 9.83, 10.16, 10.06, 8.8, 9.52, 9.47, 10.73, 10.55, 10.32, 9.06, 10.62, 9.06, 13.46, 10.3, 9.51, 8.53, 8.24, 7.52, 7.05, 7.92], '1Y': [2.1, 1.82, 3.07, 4.29, 3.59, 4.97, 5.03, 5.45, 6.09, 7.88, 7.72, 11.09, 10.41, 7.19, 6.79, 5.96, 5.8, 7.84, 8.44, 8.92, 9.23, 8.09, 8.96, 9.76, 14.01, 12.82, 12.17, 10.36, 9.69, 9.31, 10.19, 10.67, 9.83, 10.16, 10.06, 8.8, 9.52, 9.47, 10.73, 10.95, 9.73, 9.42, 9.7, 9.77, 13.58, 10.3, 9.51, 8.53, 8.24, 7.52, 7.05, 7.92] },
      velocityScore: { '1D': 1.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: 88, revenueGrowth: 1080, eps: 0.09, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.29, RKNG: 3.03 },
      tonyNote: 'Ondas Holdings is a small-cap industrial automation and drone company. It appears in Meme ETFs on the autonomous systems and drone delivery narrative. Revenue is minimal and the path to profitability is unclear; the ETF allocation is speculative and reflects retail interest in autonomous systems themes.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 2, avgWeight: 3.88, proScore: 2.59, coverage: 0.667,
      price: 62.65, weeklyPrices: [55.01, 57.80, 57.42, 63.34, 62.65], weeklyChange: 13.88, dayChange: -1.1, sortRank: 0, periodReturns: { '1M': -14.4, 'YTD': -13.7, '6M': -46.2, '1Y': 9.7 },
      priceHistory: { '1D': [63.34, 63.14, 62.65], '1W': [55.01, 57.8, 57.42, 63.34, 62.65], '1M': [73.19, 72.87, 68.01, 65.62, 71.45, 86.77, 88.86, 86.1, 85.13, 80.64, 74.95, 73.88, 73.32, 67.58, 68.82, 66.31, 55.01, 57.8, 57.42, 63.34, 62.65], 'YTD': [72.63, 97.67, 115.77, 111.34, 115.76, 96.92, 86.4, 79.19, 89.47, 89.11, 88.42, 82.87, 96.46, 90.94, 78.75, 70.89, 75.05, 86.83, 119.7, 107.73, 87.32, 80.66, 71.45, 74.21, 68.82, 62.65], '6M': [116.37, 122.09, 93.27, 82.22, 80.2, 79.19, 89.47, 86.34, 89.93, 78.67, 94.81, 98.97, 81, 76.4, 70.89, 75.05, 83.67, 105.86, 105.65, 92.06, 87.57, 72.87, 88.86, 74.95, 66.31, 62.65], '1Y': [57.09, 53.09, 52.57, 49.76, 44.95, 50.43, 45.22, 36.91, 40.43, 54.8, 49.08, 74.75, 94.5, 78.61, 77.77, 70.05, 67.89, 58.22, 55.51, 61.44, 72.84, 68.37, 85.67, 72.63, 90.56, 101.25, 113.57, 111.21, 101.79, 82.51, 83.9, 86.92, 89.47, 86.34, 89.93, 78.67, 94.81, 98.97, 81, 77.2, 68.43, 82.55, 86.83, 119.7, 118.17, 92.06, 87.57, 72.87, 88.86, 74.95, 66.31, 62.65] },
      velocityScore: { '1D': -1.5, '1W': -1.5, '1M': -32.7, '6M': null }, isNew: false,
      marketCap: '$24B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.55, MEME: 5.22, RKNG: false },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'AMD', name: 'AMD', easyScore: 2, avgWeight: 3.33, proScore: 2.22, coverage: 0.667,
      price: 543.13, weeklyPrices: [500.94, 495.76, 503.57, 544.43, 543.13], weeklyChange: 8.42, dayChange: -0.24, sortRank: 0, periodReturns: { '1M': -1.5, 'YTD': 153.6, '6M': 114.1, '1Y': 251 },
      priceHistory: { '1D': [544.43, 537.21, 543.13], '1W': [500.94, 495.76, 503.57, 544.43, 543.13], '1M': [551.63, 519.85, 519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 517.41, 546.72, 557.89, 534.39, 548.13, 529.14, 500.94, 495.76, 503.57, 544.43, 543.13], 'YTD': [214.16, 203.17, 231.83, 252.03, 242.11, 213.58, 203.37, 200.21, 192.43, 196.58, 202.68, 203.43, 231.82, 278.26, 305.33, 360.54, 455.19, 420.99, 503.89, 542.52, 452.4, 537.37, 521.58, 516.11, 548.13, 543.13], '6M': [253.73, 252.18, 192.5, 205.94, 200.15, 200.21, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 347.81, 360.54, 455.19, 424.1, 467.51, 510.13, 490.33, 547.26, 519.85, 580.91, 517.41, 529.14, 543.13], '1Y': [154.72, 177.44, 174.31, 174.95, 166.55, 166.62, 162.13, 155.82, 160.46, 160.9, 161.79, 211.51, 218.09, 238.03, 258.01, 250.05, 237.52, 230.29, 206.13, 217.6, 221.62, 209.17, 214.9, 214.16, 204.68, 227.92, 259.68, 236.73, 208.44, 207.32, 196.6, 198.62, 192.43, 193.39, 201.33, 201.99, 220.18, 246.83, 274.95, 334.63, 341.54, 458.79, 420.99, 503.89, 521.54, 490.33, 547.26, 519.85, 580.91, 517.41, 529.14, 543.13] },
      velocityScore: { '1D': 0, '1W': -12.3, '1M': null, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 181.6, revenueGrowth: 38, eps: 2.99, grossMargin: 53, dividendYield: null,
      etfPresence: { BUZZ: 2.47, MEME: false, RKNG: 4.18 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'INTC', name: 'INTC', easyScore: 2, avgWeight: 2.87, proScore: 1.91, coverage: 0.667,
      price: 103.73, weeklyPrices: [96.98, 95.04, 97.06, 105.45, 103.73], weeklyChange: 6.96, dayChange: -1.63, sortRank: 0, periodReturns: { '1M': -26.4, 'YTD': 181.1, '6M': 91, '1Y': 346.3 },
      priceHistory: { '1D': [105.45, 102.97, 103.73], '1W': [96.98, 95.04, 97.06, 105.45, 103.73], '1M': [140.94, 132.28, 131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.2, 110.24, 112.54, 109.84, 103.12, 107.76, 102.99, 96.98, 95.04, 97.06, 105.45, 103.73], 'YTD': [36.9, 45.55, 46.96, 43.93, 49.25, 48.29, 44.62, 45.61, 43.42, 45.76, 44.01, 44.13, 58.95, 68.5, 66.78, 99.62, 124.92, 108.17, 123.52, 112.71, 107.04, 133.99, 128.32, 110.39, 107.76, 103.73], '6M': [54.32, 48.66, 48.24, 46.48, 44.11, 45.61, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 82.54, 99.62, 124.92, 108.77, 119.84, 109.33, 110.27, 127.86, 132.28, 139.63, 110.24, 102.99, 103.73], '1Y': [23.24, 20.41, 20.19, 21.81, 25.31, 24.35, 24, 24.44, 25.27, 29.34, 33.55, 37.17, 35.63, 38.12, 41.53, 37.03, 37.88, 34.33, 35.83, 43.76, 40.5, 37.31, 36.35, 36.9, 41.11, 48.32, 45.07, 46.47, 50.59, 46.79, 43.63, 45.5, 43.42, 45.77, 43.87, 43.13, 50.78, 65.18, 65.7, 84.99, 95.78, 129.44, 108.17, 123.52, 107.93, 110.27, 127.86, 132.28, 139.63, 110.24, 102.99, 103.73] },
      velocityScore: { '1D': 0, '1W': -1.5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$521B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 2.41, MEME: false, RKNG: 3.32 },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 1, avgWeight: 6.8, proScore: 2.27, coverage: 0.333,
      price: 114.81, weeklyPrices: [100.24, 102.41, 103.02, 119.26, 114.81], weeklyChange: 14.53, dayChange: -3.74, sortRank: 0, periodReturns: { '1M': -33, 'YTD': 229.3, '6M': 200.9, '1Y': 335.7 },
      priceHistory: { '1D': [119.26, 116.1, 114.81], '1W': [100.24, 102.41, 103.02, 119.26, 114.81], '1M': [171.23, 147.44, 146.97, 138.54, 135.69, 150.1, 148.16, 139, 120.95, 123.36, 114.44, 122.21, 119.92, 111.88, 125.45, 109.09, 100.24, 102.41, 103.02, 119.26, 114.81], 'YTD': [34.86, 34.04, 37.04, 37.39, 46.12, 48.4, 46.98, 84.23, 95.58, 94.07, 95.76, 84.59, 132.7, 157.32, 137.73, 183.51, 148.94, 173.26, 177.62, 184.07, 175.13, 161.85, 135.69, 114.41, 125.45, 114.81], '6M': [38.15, 39.57, 38.13, 43.99, 51.68, 84.23, 95.58, 96.81, 87.54, 98.21, 107.45, 153.19, 163.47, 162.17, 183.51, 148.94, 190.36, 181.49, 185.67, 196.64, 191.55, 147.44, 148.16, 114.44, 109.09, 114.81], '1Y': [26.35, 24.11, 21.42, 22.79, 22.77, 25.07, 23.02, 23.72, 28.93, 28.06, 25.93, 31.33, 28.48, 33.4, 36.87, 29.5, 23.75, 20.89, 22.73, 25.65, 30.38, 28.96, 40.64, 34.86, 33.01, 37, 35.72, 43.61, 44.3, 44.46, 53.96, 102.51, 95.58, 96.81, 87.54, 98.21, 107.45, 153.19, 163.47, 145.78, 172.98, 184.9, 173.26, 177.62, 202.37, 196.64, 191.55, 147.44, 148.16, 114.44, 109.09, 114.81] },
      velocityScore: { '1D': -0.9, '1W': 2.3, '1M': -41.8, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: 51, eps: -0.75, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.8, RKNG: false },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 1, avgWeight: 5.35, proScore: 1.78, coverage: 0.333,
      price: 222.71, weeklyPrices: [207.97, 202.68, 212.07, 223.87, 222.71], weeklyChange: 7.09, dayChange: -0.52, sortRank: 0, periodReturns: { '1M': -26.4, 'YTD': 54.8, '6M': 64.8, '1Y': 139.7 },
      priceHistory: { '1D': [223.87, 221.88, 222.71], '1W': [207.97, 202.68, 212.07, 223.87, 222.71], '1M': [302.52, 272.01, 268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 265.55, 258.69, 265.65, 257.79, 236.88, 236.18, 226.74, 207.97, 202.68, 212.07, 223.87, 222.71], 'YTD': [143.89, 150.42, 150.97, 129.57, 111.31, 128.4, 130.66, 112.27, 109.83, 116.88, 105.1, 93.87, 110.21, 158.93, 185.54, 184.38, 188.51, 156.27, 221.64, 214.6, 237.68, 271.83, 238, 246.4, 236.18, 222.71], '6M': [135.1, 129.47, 98.06, 121.78, 124.06, 112.27, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 195.04, 184.38, 188.51, 172.17, 218.41, 226.1, 222.27, 259.41, 272.01, 271.95, 258.69, 226.74, 222.71], '1Y': [92.93, 109.38, 110.29, 125.38, 106.3, 120.1, 124.77, 149.03, 164.42, 162.26, 145.61, 137.2, 129.75, 144.17, 162.18, 164.23, 158.5, 139.56, 154.18, 189.19, 170.29, 140.34, 147.81, 143.89, 141.59, 149.12, 133.16, 125.28, 111.4, 121.44, 124.05, 114.22, 109.83, 117.69, 103.4, 95.24, 102.46, 134.36, 174.53, 180.5, 180.06, 210.22, 156.27, 221.64, 229, 222.27, 259.41, 272.01, 271.95, 258.69, 226.74, 222.71] },
      velocityScore: { '1D': 2.3, '1W': 21.1, '1M': 9.2, '6M': null }, isNew: false,
      marketCap: '$42B', pe: 88.7, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.35, RKNG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'ALAB', name: 'ALAB', easyScore: 1, avgWeight: 5.34, proScore: 1.78, coverage: 0.333,
      price: 319.97, weeklyPrices: [319.74, 303.62, 309.09, 319.79, 319.97], weeklyChange: 0.07, dayChange: 0.06, sortRank: 0, periodReturns: { '1M': -27.2, 'YTD': 92.3, '6M': 81.4, '1Y': 173.7 },
      priceHistory: { '1D': [319.79, 312.38, 319.97], '1W': [319.74, 303.62, 309.09, 319.79, 319.97], '1M': [439.66, 397.02, 399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42, 432.74, 393.16, 417.45, 412.97, 362.05, 361.78, 350.62, 319.74, 303.62, 309.09, 319.79, 319.97], 'YTD': [166.36, 162.61, 182, 170.93, 158.52, 143.71, 132.62, 118.83, 119.2, 127.48, 123.87, 109.6, 125.46, 170.81, 197.54, 202.68, 199.79, 215.58, 318.72, 363.54, 330.86, 417.07, 391.74, 382.89, 361.78, 319.97], '6M': [176.35, 160.46, 142.82, 126.58, 129.68, 118.83, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 212.84, 202.68, 199.79, 232.68, 306.88, 320.09, 346.33, 389.2, 397.02, 483.02, 393.16, 350.62, 319.97], '1Y': [116.91, 118.41, 135.54, 192, 171.06, 178.56, 176.61, 214.49, 238.79, 230.11, 195.8, 212.1, 161.55, 157.51, 168.25, 179.31, 167.55, 139.52, 144.78, 152.5, 167.08, 144.94, 168.83, 166.36, 156.73, 174.45, 169.66, 150.62, 169.85, 129.32, 128.24, 120.55, 119.2, 120.31, 116.04, 112.47, 117.99, 166.79, 175.8, 196.64, 201.25, 207.35, 215.58, 318.72, 355.76, 346.33, 389.2, 397.02, 483.02, 393.16, 350.62, 319.97] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$55B', pe: 217.7, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.34, RKNG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'COHR', name: 'COHR', easyScore: 1, avgWeight: 5.32, proScore: 1.77, coverage: 0.333,
      price: 314.12, weeklyPrices: [276.96, 277.60, 285.40, 317.22, 314.12], weeklyChange: 13.42, dayChange: -0.97, sortRank: 0, periodReturns: { '1M': -26.2, 'YTD': 70.2, '6M': 55, '1Y': 223.8 },
      priceHistory: { '1D': [317.18, 309.83, 314.12], '1W': [276.96, 277.6, 285.4, 317.22, 314.12], '1M': [425.48, 381.22, 392.5, 407.25, 380.56, 391.22, 394.47, 368.65, 333.36, 335.7, 317.05, 327.24, 324.5, 307.39, 310.77, 299.38, 276.96, 277.6, 285.4, 317.22, 314.12], 'YTD': [184.57, 178.06, 191.04, 214, 229.18, 223.69, 232.48, 258.93, 235.72, 247.37, 255.05, 238.21, 281.79, 328, 337.68, 329.5, 335.26, 362.83, 381.35, 417.43, 354.77, 389.57, 380.56, 314.13, 310.77, 314.12], '6M': [202.72, 215.86, 209.24, 216.1, 248.18, 258.93, 235.72, 242.76, 253.63, 243.48, 253.22, 307.93, 347.51, 336.09, 329.5, 335.26, 382.45, 377.57, 362.9, 401.93, 413.84, 381.22, 394.47, 317.05, 299.38, 314.12], '1Y': [97.02, 106.98, 105.6, 116.56, 87.76, 91.58, 88.47, 99.22, 104.47, 109.29, 107.72, 113.56, 109.37, 120.79, 134.24, 128.7, 158.01, 138.15, 148.85, 170.96, 192.73, 175.2, 191.87, 184.57, 173.15, 195.96, 196.94, 212.18, 227.68, 217.23, 248.89, 298.91, 235.72, 242.76, 253.63, 243.48, 253.22, 307.93, 347.51, 321.53, 329.89, 379.69, 362.83, 381.35, 426.89, 401.93, 413.84, 381.22, 394.47, 317.05, 299.38, 314.12] },
      velocityScore: { '1D': 0.6, '1W': 1.1, '1M': null, '6M': null }, isNew: false,
      marketCap: '$61B', pe: 150.3, revenueGrowth: 21, eps: 2.09, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.32, RKNG: false },
      tonyNote: 'COHR appears in 1 of 3 Meme ETFs (33% coverage) with average weight 5.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PENG', name: 'PENG', easyScore: 1, avgWeight: 4.93, proScore: 1.64, coverage: 0.333,
      price: 57.69, weeklyPrices: [65.97, 60.41, 53.23, 58.10, 57.69], weeklyChange: -12.55, dayChange: -0.71, sortRank: 0, periodReturns: { '1M': -15.1, 'YTD': 194.9, '6M': 178.3, '1Y': 136 },
      priceHistory: { '1D': [58.1, 57.65, 57.69], '1W': [65.97, 60.41, 53.23, 58.1, 57.69], '1M': [67.94, 66.96, 64.72, 66.77, 62.28, 67.94, 76.01, 68.81, 61.47, 67.71, 78.47, 81.39, 78.35, 77.21, 77.8, 72.85, 65.97, 60.41, 53.23, 58.1, 57.69], 'YTD': [19.56, 19.08, 19.96, 19.76, 18.21, 18.93, 18.81, 20.78, 18.26, 17.54, 17.89, 17.6, 22.12, 26.09, 27.61, 31.24, 44.23, 45.71, 54.95, 71.41, 58.52, 67.15, 62.28, 62.71, 77.8, 57.69], '6M': [20.73, 19.74, 17.44, 18.71, 19.12, 20.78, 18.26, 17.98, 17.52, 16.69, 20.27, 24.38, 28.1, 30.69, 31.24, 44.23, 46.82, 53.21, 59.71, 64.63, 63.87, 66.96, 76.01, 78.47, 72.85, 57.69], '1Y': [24.45, 24.63, 23.13, 24.24, 24.09, 24.43, 23.82, 24.45, 26.33, 27.57, 26.28, 27, 22.56, 21.86, 22.86, 21.52, 20.87, 18.11, 19.03, 21.48, 21.82, 19.69, 20.29, 19.56, 19.73, 20.01, 20, 19.21, 18.78, 19.37, 19.25, 20.05, 18.26, 17.98, 17.52, 16.69, 20.27, 24.38, 28.1, 29.05, 32.4, 43.54, 45.71, 54.95, 70.65, 64.63, 63.87, 66.96, 76.01, 78.47, 72.85, 57.69] },
      velocityScore: { '1D': -13.7, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$3B', pe: 41.5, revenueGrowth: 48, eps: 1.39, grossMargin: 28, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.93, RKNG: false },
      tonyNote: 'PENG appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRWV', name: 'CRWV', easyScore: 1, avgWeight: 4.88, proScore: 1.63, coverage: 0.333,
      price: 82.14, weeklyPrices: [72.91, 73.21, 73.06, 79.58, 82.14], weeklyChange: 12.66, dayChange: 3.22, sortRank: 0, periodReturns: { '1M': -26.2, 'YTD': 14.7, '6M': -10.5, '1Y': -36.7 },
      priceHistory: { '1D': [79.58, 79.89, 82.14], '1W': [72.91, 73.21, 73.06, 79.58, 82.14], '1M': [111.29, 105.72, 100.88, 98.76, 96.58, 95.51, 99.54, 85.68, 81.75, 86.46, 90, 89.7, 88.88, 83.31, 79.94, 77.12, 72.91, 73.21, 73.06, 79.58, 82.14], 'YTD': [71.61, 80.14, 101.23, 108.86, 90.06, 95.15, 97.14, 79.56, 72.99, 85.86, 81.96, 77.47, 88.9, 119.56, 117.42, 119.01, 114.15, 103.77, 105.89, 110.93, 95.61, 117.95, 96.58, 83.53, 79.94, 82.14], '6M': [91.79, 99.53, 74.65, 95.7, 89.25, 79.56, 72.99, 81.11, 81.47, 74.81, 80.94, 110.27, 117.43, 110.14, 119.01, 114.15, 107.3, 105.49, 124.82, 102.37, 106.71, 105.72, 99.54, 90, 77.12, 82.14], '1Y': [129.77, 108.74, 111.84, 148.75, 92.89, 91.39, 89.88, 100.22, 118.75, 130.89, 136.85, 128.83, 134.06, 125.06, 134.8, 115.75, 88.39, 74.9, 71.29, 79.36, 90.66, 69.5, 80.26, 71.61, 77.09, 95.01, 92.98, 93.19, 89.95, 96.04, 90.84, 78.05, 72.99, 81.11, 81.47, 74.81, 80.94, 110.27, 117.43, 112.06, 125.43, 114.7, 103.77, 105.89, 119.27, 102.37, 106.71, 105.72, 99.54, 90, 77.12, 82.14] },
      velocityScore: { '1D': -1.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$45B', pe: null, revenueGrowth: 112, eps: -2.96, grossMargin: 69, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.88, RKNG: false },
      tonyNote: 'CRWV appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STX', name: 'STX', easyScore: 1, avgWeight: 4.77, proScore: 1.59, coverage: 0.333,
      price: 890.24, weeklyPrices: [745.49, 787.66, 802.45, 891.83, 890.24], weeklyChange: 19.42, dayChange: -0.18, sortRank: 0, periodReturns: { '1M': -18.6, 'YTD': 223.3, '6M': 156.9, '1Y': 507.3 },
      priceHistory: { '1D': [891.83, 874.4, 890.24], '1W': [745.49, 787.66, 802.45, 891.83, 890.24], '1M': [1094.04, 1038.59, 993.25, 1025.36, 899.9, 968.53, 965, 915.19, 820.16, 868.26, 860.02, 890.09, 910.34, 860.66, 878.31, 828.3, 745.49, 787.66, 802.45, 891.83, 890.24], 'YTD': [275.39, 304.01, 326.23, 371.76, 444.45, 407.25, 408.97, 407.84, 352.8, 398.78, 404.02, 391.76, 496.3, 531.81, 587.62, 726.93, 782.64, 740.84, 845.76, 940.69, 815.99, 1070.23, 899.9, 827.64, 878.31, 890.24], '6M': [346.53, 446.57, 405.45, 431.17, 411.11, 407.84, 352.8, 383.71, 411.23, 380.07, 453.3, 513.28, 539.75, 586.25, 726.93, 782.64, 795.47, 812.73, 921.26, 876.77, 1018.8, 1038.59, 965, 860.02, 828.3, 890.24], '1Y': [146.59, 152.68, 151.74, 155.59, 157.93, 165.24, 176.32, 191.59, 211.13, 228.13, 236.06, 225.01, 211.63, 214.57, 223, 250.38, 288, 253.86, 261.89, 258.67, 282.86, 288.13, 282.8, 275.39, 284.47, 320.32, 346.1, 407.69, 429.32, 425.99, 407.4, 379.52, 352.8, 383.71, 411.23, 380.07, 453.3, 513.28, 539.75, 595.86, 738.54, 834.01, 740.84, 845.76, 926.61, 876.77, 1018.8, 1038.59, 965, 860.02, 828.3, 890.24] },
      velocityScore: { '1D': 0, '1W': -1.2, '1M': null, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 84.6, revenueGrowth: 44, eps: 10.52, grossMargin: 42, dividendYield: 0.33,
      etfPresence: { BUZZ: false, MEME: 4.77, RKNG: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'IONQ', name: 'IonQ', easyScore: 1, avgWeight: 4.64, proScore: 1.55, coverage: 0.333,
      price: 35.59, weeklyPrices: [35.10, 34.78, 34.24, 35.51, 35.59], weeklyChange: 1.41, dayChange: 0.23, sortRank: 0, periodReturns: { '1M': -39, 'YTD': -20.7, '6M': -27.8, '1Y': -15.1 },
      priceHistory: { '1D': [35.52, 35.35, 35.59], '1W': [35.1, 34.78, 34.24, 35.51, 35.59], '1M': [58.32, 57.85, 53.6, 50.56, 49.31, 53.88, 53.26, 51.4, 49.12, 48.87, 45.08, 44.77, 42.86, 38.88, 39.29, 37.51, 35.1, 34.78, 34.24, 35.51, 35.59], 'YTD': [44.87, 49.45, 50.8, 45.49, 38.47, 33.61, 33.43, 38.37, 35.73, 33.29, 33.11, 28.83, 28.99, 44.68, 43.63, 46.2, 49.24, 49.31, 63.62, 68.23, 56.63, 56.55, 49.31, 45.36, 39.29, 35.59], '6M': [49.33, 43.24, 30.43, 31.3, 31.9, 38.37, 35.73, 32.98, 31.2, 27.51, 29.24, 29.76, 48.32, 42.69, 46.2, 49.24, 51.95, 63.64, 69.28, 62.8, 61.18, 57.85, 53.26, 45.08, 37.51, 35.59], '1Y': [41.94, 40.53, 42.02, 43, 36.8, 40.75, 40.97, 44, 62.26, 75.14, 61.5, 79.23, 77.55, 59.5, 57.15, 53.38, 54.42, 49.12, 47.06, 48.65, 54.44, 49.67, 51.39, 44.87, 50.45, 47.56, 47.25, 39.98, 34.99, 34.11, 30.78, 38.34, 35.73, 32.98, 31.2, 27.51, 29.24, 29.76, 48.32, 43.84, 45.75, 56.89, 49.31, 63.62, 71.4, 62.8, 61.18, 57.85, 53.26, 45.08, 37.51, 35.59] },
      velocityScore: { '1D': -3.1, '1W': -8.8, '1M': -39.2, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 89, revenueGrowth: 755, eps: 0.4, grossMargin: 36, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.64, RKNG: false },
      tonyNote: 'IonQ is the leading pure-play quantum computing company using trapped-ion technology. It appears in Meme ETFs because quantum computing is the highest-conviction long-duration technology bet available in public markets. Revenue is growing from a low base via cloud access contracts with AWS, Google, and Microsoft; the institutional weight is small but rising as near-term quantum advantage milestones approach.',
    },
    {
      ticker: 'TER', name: 'TER', easyScore: 1, avgWeight: 4.56, proScore: 1.52, coverage: 0.333,
      price: 364.63, weeklyPrices: [322.30, 322.36, 333.76, 374.04, 364.63], weeklyChange: 13.13, dayChange: -2.52, sortRank: 0, periodReturns: { '1M': -20.2, 'YTD': 88.4, '6M': 59.1, '1Y': 289.1 },
      priceHistory: { '1D': [374.04, 363.99, 364.63], '1W': [322.3, 322.36, 333.76, 374.04, 364.63], '1M': [457, 420.12, 427.2, 471.96, 436.86, 463.21, 483.84, 427.34, 369.09, 379.52, 351.57, 362.75, 359.6, 341.11, 353.23, 342.12, 322.3, 322.36, 333.76, 374.04, 364.63], 'YTD': [193.56, 217.26, 228.15, 238.94, 282.98, 321.45, 315.9, 320.03, 273.05, 298.27, 303.92, 296.46, 358.29, 365.92, 400.99, 345.42, 359.77, 321.05, 389.14, 409.67, 347.59, 437.92, 436.86, 343.11, 353.23, 364.63], '6M': [229.14, 251.87, 271.13, 311.03, 324.85, 320.03, 273.05, 286.42, 290.83, 295.61, 315.43, 370.13, 375.21, 418.08, 345.42, 359.77, 337.88, 358.44, 369.47, 374.69, 432.41, 420.12, 483.84, 351.57, 342.12, 364.63], '1Y': [93.7, 90.55, 106.93, 111.63, 110.62, 118.61, 119.63, 115.07, 113.93, 134.68, 137.64, 140.14, 136.97, 143.33, 144.38, 175.65, 177.23, 163.72, 167.67, 195.08, 199.97, 192.29, 198.5, 193.56, 216.31, 227.7, 229.18, 241.05, 300.11, 314.66, 318.5, 325.83, 273.05, 286.42, 290.83, 295.61, 315.43, 370.13, 375.21, 402, 337.44, 366.64, 321.05, 389.14, 392.62, 374.69, 432.41, 420.12, 483.84, 351.57, 342.12, 364.63] },
      velocityScore: { '1D': 2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 60.6, revenueGrowth: 87, eps: 6.02, grossMargin: 59, dividendYield: 0.14,
      etfPresence: { BUZZ: false, MEME: 4.56, RKNG: false },
      tonyNote: 'TER appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
