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
export const SPY_RET: Record<Period, number> = { '1W': -0.4, '1M': 0.8, 'YTD': 8.4, '6M': 7.2, '1Y': 16.5 };
// @@END_GENERATED:SPY_RET@@

// Top holdings per ETF (ticker + portfolio weight %), shown on ETF row hover.
export type EtfHolding = { t: string; w: number };

// @@GENERATED:ETF_TOP_HOLDINGS@@
export const ETF_TOP_HOLDINGS: Record<string, EtfHolding[]> = {
  AIS: [{ t: 'MU', w: 7.3 }, { t: 'AMD', w: 5.5 }, { t: 'VRT', w: 3.9 }, { t: 'SIMO', w: 3.8 }, { t: 'TSM', w: 3.4 }],
  ARTY: [{ t: 'AMD', w: 5.3 }, { t: 'MU', w: 5.0 }, { t: 'NVDA', w: 5.0 }, { t: 'AVGO', w: 4.8 }, { t: 'CRWV', w: 3.8 }],
  BAI: [{ t: 'MU', w: 6.6 }, { t: 'AMD', w: 5.4 }, { t: 'AVGO', w: 4.8 }, { t: 'NVDA', w: 4.7 }, { t: 'TSM', w: 4.6 }],
  IGPT: [{ t: 'AMD', w: 9.2 }, { t: 'META', w: 8.9 }, { t: 'NVDA', w: 8.5 }, { t: 'MU', w: 8.3 }, { t: 'GOOGL', w: 7.4 }],
  IVES: [{ t: 'AAPL', w: 5.2 }, { t: 'NVDA', w: 5.0 }, { t: 'AVGO', w: 4.9 }, { t: 'MSFT', w: 4.9 }, { t: 'TSM', w: 4.9 }],
  ALAI: [{ t: 'NVDA', w: 13.7 }, { t: 'TSM', w: 5.3 }, { t: 'MSFT', w: 5.2 }, { t: 'AMZN', w: 4.7 }, { t: 'WDC', w: 4.3 }],
  CHAT: [{ t: 'NVDA', w: 7.7 }, { t: 'GOOGL', w: 5.1 }, { t: 'AVGO', w: 4.9 }, { t: 'AMD', w: 4.1 }, { t: 'MU', w: 3.8 }],
  AIFD: [{ t: 'NVDA', w: 6.8 }, { t: 'PANW', w: 6.7 }, { t: 'MU', w: 6.0 }, { t: 'AVGO', w: 5.6 }, { t: 'ANET', w: 5.5 }],
  SPRX: [{ t: 'KLAC', w: 9.8 }, { t: 'NET', w: 9.7 }, { t: 'ALAB', w: 9.5 }, { t: 'MKSI', w: 8.1 }, { t: 'COHR', w: 7.7 }],
  AOTG: [{ t: 'AMD', w: 15.7 }, { t: 'NVDA', w: 10.8 }, { t: 'MU', w: 8.8 }, { t: 'TSM', w: 7.0 }, { t: 'TOST', w: 5.7 }],
  SOXX: [{ t: 'AMD', w: 8.7 }, { t: 'MU', w: 8.5 }, { t: 'NVDA', w: 8.3 }, { t: 'AVGO', w: 7.3 }, { t: 'INTC', w: 5.3 }],
  PSI: [{ t: 'AMAT', w: 6.5 }, { t: 'MU', w: 5.8 }, { t: 'KLAC', w: 5.8 }, { t: 'AMD', w: 5.7 }, { t: 'LRCX', w: 5.3 }],
  XSD: [{ t: 'MXL', w: 3.2 }, { t: 'AMD', w: 3.0 }, { t: 'AMBA', w: 2.8 }, { t: 'ALGM', w: 2.8 }, { t: 'MU', w: 2.8 }],
  DRAM: [{ t: 'STX', w: 4.9 }, { t: 'WDC', w: 4.6 }, { t: 'SNDK', w: 4.5 }, { t: 'MU', w: 2.6 }, { t: 'SKHY', w: 0.5 }],
  PTF: [{ t: 'MU', w: 5.2 }, { t: 'SNDK', w: 5.0 }, { t: 'WDC', w: 4.5 }, { t: 'STX', w: 4.1 }, { t: 'KLAC', w: 4.1 }],
  WCLD: [{ t: 'FROG', w: 2.9 }, { t: 'PANW', w: 2.9 }, { t: 'DDOG', w: 2.8 }, { t: 'CRWD', w: 2.5 }, { t: 'OKTA', w: 2.4 }],
  IGV: [{ t: 'PANW', w: 10.3 }, { t: 'MSFT', w: 8.6 }, { t: 'PLTR', w: 8.5 }, { t: 'CRWD', w: 7.3 }, { t: 'ORCL', w: 5.3 }],
  FDTX: [{ t: 'MRVL', w: 9.7 }, { t: 'MU', w: 9.3 }, { t: 'TSM', w: 6.4 }, { t: 'WDC', w: 4.5 }, { t: 'PANW', w: 4.2 }],
  GTEK: [{ t: 'MRVL', w: 3.6 }, { t: 'NET', w: 3.0 }, { t: 'APH', w: 2.5 }, { t: 'DELL', w: 2.4 }, { t: 'CDNS', w: 2.3 }],
  ARKK: [{ t: 'TSLA', w: 9.4 }, { t: 'TEM', w: 4.9 }, { t: 'SPCX', w: 4.7 }, { t: 'CRSP', w: 4.6 }, { t: 'COIN', w: 4.4 }],
  MARS: [{ t: 'SPCX', w: 20.7 }, { t: 'RKLB', w: 9.3 }, { t: 'ASTS', w: 7.0 }, { t: 'VSAT', w: 6.0 }, { t: 'GSAT', w: 5.5 }],
  FRWD: [{ t: 'NVDA', w: 9.3 }, { t: 'AMD', w: 7.4 }, { t: 'STX', w: 7.0 }, { t: 'TSM', w: 5.9 }, { t: 'LRCX', w: 5.4 }],
  BCTK: [{ t: 'TSM', w: 8.4 }, { t: 'LRCX', w: 7.2 }, { t: 'AVGO', w: 7.1 }, { t: 'SPCX', w: 7.0 }, { t: 'GOOG', w: 6.7 }],
  FWD: [{ t: 'NVDA', w: 3.1 }, { t: 'AVGO', w: 2.5 }, { t: 'AMD', w: 2.3 }, { t: 'AMAT', w: 2.3 }, { t: 'LRCX', w: 1.9 }],
  CBSE: [{ t: 'META', w: 3.9 }, { t: 'TXG', w: 3.2 }, { t: 'SCI', w: 3.2 }, { t: 'SBUX', w: 3.1 }, { t: 'VG', w: 3.1 }],
  FCUS: [{ t: 'DELL', w: 4.6 }, { t: 'MU', w: 4.2 }, { t: 'STX', w: 4.1 }, { t: 'HPE', w: 4.0 }, { t: 'WDC', w: 3.9 }],
  WGMI: [{ t: 'CIFR', w: 18.1 }, { t: 'HUT', w: 11.3 }, { t: 'IREN', w: 10.6 }, { t: 'KEEL', w: 9.7 }, { t: 'CLSK', w: 5.4 }],
  CNEQ: [{ t: 'NVDA', w: 14.4 }, { t: 'MSFT', w: 6.4 }, { t: 'TSM', w: 5.7 }, { t: 'GOOG', w: 5.5 }, { t: 'AAPL', w: 5.3 }],
  SGRT: [{ t: 'VRT', w: 12.1 }, { t: 'WDC', w: 10.8 }, { t: 'MU', w: 6.7 }, { t: 'ARW', w: 6.3 }, { t: 'WELL', w: 5.7 }],
  SPMO: [{ t: 'MU', w: 10.6 }, { t: 'NVDA', w: 8.5 }, { t: 'AVGO', w: 6.8 }, { t: 'AMD', w: 4.4 }, { t: 'JNJ', w: 4.4 }],
  XMMO: [{ t: 'CW', w: 4.1 }, { t: 'FTI', w: 3.7 }, { t: 'ATI', w: 3.5 }, { t: 'STRL', w: 3.0 }, { t: 'WWD', w: 3.0 }],
  POW: [{ t: 'PWR', w: 5.0 }, { t: 'ETN', w: 4.4 }, { t: 'POWL', w: 4.4 }, { t: 'PRY', w: 4.0 }, { t: 'NVT', w: 3.9 }],
  VOLT: [{ t: 'BELFB', w: 7.8 }, { t: 'POWL', w: 6.3 }, { t: 'ETN', w: 5.6 }, { t: 'NEE', w: 5.3 }, { t: 'PWR', w: 5.2 }],
  PBD: [{ t: 'NFI', w: 1.3 }, { t: 'RIVN', w: 1.2 }, { t: 'BLBD', w: 1.2 }, { t: 'SHLS', w: 1.2 }, { t: 'GPRE', w: 1.1 }],
  PBW: [{ t: 'THRM', w: 2.3 }, { t: 'GEVO', w: 2.3 }, { t: 'OPAL', w: 2.2 }, { t: 'DAR', w: 2.1 }, { t: 'BETA', w: 2.0 }],
  IVEP: [{ t: 'NEE', w: 4.2 }, { t: 'ETN', w: 4.2 }, { t: 'CEG', w: 4.2 }, { t: 'SMERY', w: 4.2 }, { t: 'SO', w: 4.1 }],
  AIRR: [{ t: 'DY', w: 3.4 }, { t: 'IESC', w: 3.4 }, { t: 'STRL', w: 3.4 }, { t: 'POWL', w: 3.2 }, { t: 'CHRW', w: 3.2 }],
  PRN: [{ t: 'FIX', w: 4.8 }, { t: 'HWM', w: 4.4 }, { t: 'STRL', w: 4.2 }, { t: 'PWR', w: 4.1 }, { t: 'JBL', w: 3.5 }],
  RSHO: [{ t: 'TKR', w: 8.7 }, { t: 'POWL', w: 7.3 }, { t: 'CGNX', w: 7.2 }, { t: 'CAT', w: 6.9 }, { t: 'AIT', w: 6.0 }],
  IDEF: [{ t: 'RTX', w: 8.8 }, { t: 'LMT', w: 4.9 }, { t: 'BA', w: 4.5 }, { t: 'GD', w: 4.1 }, { t: 'NOC', w: 3.3 }],
  BILT: [{ t: 'UNP', w: 6.0 }, { t: 'AENA', w: 4.7 }, { t: 'AEP', w: 4.6 }, { t: 'TRP', w: 4.2 }, { t: 'XEL', w: 3.8 }],
  BUZZ: [{ t: 'PLTR', w: 3.3 }, { t: 'META', w: 3.3 }, { t: 'MSTR', w: 3.3 }, { t: 'NVDA', w: 3.3 }, { t: 'GME', w: 3.3 }],
  MEME: [{ t: 'NBIS', w: 7.4 }, { t: 'IREN', w: 6.9 }, { t: 'AAOI', w: 6.7 }, { t: 'BE', w: 6.6 }, { t: 'SNDK', w: 6.3 }],
  RKNG: [{ t: 'DELL', w: 4.3 }, { t: 'BMNR', w: 4.3 }, { t: 'AMD', w: 4.2 }, { t: 'CIFR', w: 3.9 }, { t: 'WDC', w: 3.9 }],
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
  'AI & ML':         { '1W': 2.3, '1M': -7.6, 'YTD': 35.3, '6M': 28.3, '1Y': 58 },
  'Semiconductors':  { '1W': 4.4, '1M': -13.1, 'YTD': 83.6, '6M': 67.3, '1Y': 118.1 },
  'Broad Tech':      { '1W': 1.7, '1M': -6.2, 'YTD': 18.9, '6M': 13.3, '1Y': 30 },
  'Electrification': { '1W': 1.8, '1M': -8, 'YTD': 19.1, '6M': 8.5, '1Y': 28.9 },
  'Industrials':     { '1W': 2.9, '1M': -2, 'YTD': 18.2, '6M': 6.9, '1Y': 27.8 },
  'Meme':            { '1W': 5.5, '1M': -14.1, 'YTD': 6.3, '6M': -4.2, '1Y': -8.5 },
};
// @@END_GENERATED:TOP10_RET@@

const THEME_SEED: Record<Theme, number> = {
  'AI & ML': 7, 'Semiconductors': 19, 'Broad Tech': 31, 'Electrification': 43, 'Industrials': 57, 'Meme': 71,
};

// @@GENERATED:INDEX_CHART_DATA@@
export const INDEX_CHART_DATA: Record<Theme, IndexChartByPeriod> = {
  'AI & ML': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -1.4, spyReturn: 0.1, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 103.68, 104.7, 103.83, 102.3], spy: [100, 100.83, 100.72, 99.47, 99.59], top10Return: 2.3, spyReturn: -0.4, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 101.25, 99.13, 101.15, 104.13, 101.49, 97.57, 98.35, 96.3, 96.63, 99, 96.14, 96.35, 95.42, 92.18, 90.45, 90.46, 93.66, 94.62, 93.81, 92.44], spy: [100, 100.14, 99.42, 101.06, 101.85, 101.71, 101.57, 102.46, 101.97, 101.66, 102.96, 102.17, 102.54, 102.94, 102.38, 101.37, 101.21, 102.05, 101.93, 100.67, 100.79], top10Return: -7.6, spyReturn: 0.8, xLabels: ["Jun 26", "Jul 3", "Jul 10", "Jul 17", "Jul 24"] },
    'YTD': { top10: [100, 103.72, 105.03, 107.32, 103.63, 104.07, 104, 103.13, 101.35, 102.81, 100.88, 98.92, 106.63, 117.18, 122.89, 125.43, 135.06, 131.19, 147.98, 153.24, 145.47, 149.87, 153.69, 145.26, 134.33, 135.25], spy: [100, 101.78, 101.43, 101.99, 101.12, 101.47, 101.1, 100.6, 99.46, 98.11, 95.79, 96.09, 99.71, 104.14, 104.7, 105.29, 108.25, 107.6, 110.66, 111.02, 108.77, 107.58, 109.51, 110.23, 110.09, 108.37], top10Return: 35.3, spyReturn: 8.4, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 100.02, 99.19, 97.46, 98.64, 95.63, 97.51, 98.4, 96.36, 91.09, 100.25, 108.55, 114.87, 114.16, 122.1, 128.45, 125.06, 138.38, 148.56, 131.11, 142.32, 142.11, 135.81, 138.01, 125.48, 128.6], spy: [100, 100.39, 100.18, 98.57, 99.22, 98.21, 97.76, 96.83, 94.29, 93.88, 97.59, 101.04, 102.67, 102.74, 104.48, 106.56, 105.92, 108.33, 108.88, 104.72, 106.96, 106, 107.51, 108.98, 107.3, 106.68], top10Return: 28.3, spyReturn: 7.2, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 102.01, 102.53, 103.69, 99.71, 105.22, 104.35, 110.27, 113.9, 112.61, 117.07, 120.9, 118.07, 118.76, 123.66, 119.07, 116.03, 109.54, 116.42, 119.03, 120.57, 112.93, 118.11, 119.63, 121.95, 119.11, 124.34, 121.44, 121.07, 119.83, 122.82, 118.32, 119.09, 120.49, 117.51, 112.99, 122.69, 132.8, 140.73, 140.36, 154.59, 161.01, 157.31, 173.01, 179.46, 160.05, 175.24, 175.27, 166.93, 169.75, 153.97, 157.97], spy: [100, 99.63, 99.66, 101.66, 100.18, 102.29, 102.02, 103.66, 104.39, 103.72, 105.49, 105.79, 104.13, 105.89, 107.16, 105.66, 105.93, 102.85, 107.72, 108.08, 108.63, 106.63, 108.81, 108.4, 109.57, 106.8, 109.63, 108.69, 109.09, 108.18, 109.26, 107.99, 106.74, 105.73, 102.96, 102.51, 106.56, 110.33, 112.1, 112.16, 115.67, 117.01, 116.84, 118.94, 119.34, 114.35, 116.79, 115.74, 117.4, 119, 117.16, 116.49], top10Return: 58, spyReturn: 16.5, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Semiconductors': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -2, spyReturn: 0.1, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 107.35, 106.86, 106.53, 104.42], spy: [100, 100.83, 100.72, 99.47, 99.59], top10Return: 4.4, spyReturn: -0.4, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 105.06, 99.37, 102.73, 107.29, 99.57, 92.18, 95.17, 89.24, 91.21, 94.19, 88.73, 92.07, 89.12, 83.75, 82.95, 83.27, 89.3, 88.93, 88.62, 86.94], spy: [100, 100.14, 99.42, 101.06, 101.85, 101.71, 101.57, 102.46, 101.97, 101.66, 102.96, 102.17, 102.54, 102.94, 102.38, 101.37, 101.21, 102.05, 101.93, 100.67, 100.79], top10Return: -13.1, spyReturn: 0.8, xLabels: ["Jun 26", "Jul 3", "Jul 10", "Jul 17", "Jul 24"] },
    'YTD': { top10: [100, 111.75, 115.62, 118.03, 116.9, 124.61, 124, 129.61, 130.69, 133.18, 130.47, 133.64, 148.97, 166.04, 177.47, 173.7, 191.59, 191.25, 208.87, 216.11, 204.41, 206.92, 212.82, 190.25, 182.47, 183.63], spy: [100, 101.78, 101.43, 101.99, 101.12, 101.47, 101.1, 100.6, 99.46, 98.11, 95.79, 96.09, 99.71, 104.14, 104.7, 105.29, 108.25, 107.6, 110.66, 111.02, 108.77, 107.58, 109.51, 110.23, 110.09, 108.37], top10Return: 83.6, spyReturn: 8.4, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 106.24, 108.92, 110.47, 111.5, 108.1, 108.5, 116.36, 123.61, 122.12, 126.08, 137.41, 151.51, 159.15, 169.5, 171.65, 172.08, 192.18, 198.33, 184.64, 186.39, 192.51, 175.7, 173.25, 165.84, 168.14], spy: [100, 100.39, 100.18, 98.57, 99.22, 98.21, 97.76, 96.83, 94.29, 93.88, 97.59, 101.04, 102.67, 102.74, 104.48, 106.56, 105.92, 108.33, 108.88, 104.72, 106.96, 106, 107.51, 108.98, 107.3, 106.68], top10Return: 67.3, spyReturn: 7.2, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 100.98, 104.16, 108.36, 106.16, 111.54, 110.84, 114, 118.81, 119.06, 123.83, 126.07, 127.65, 129.86, 134.71, 137.8, 132.03, 132.93, 139.06, 146.16, 145.83, 137.19, 142.45, 147.29, 158.35, 162.21, 165.53, 170, 174.25, 162.53, 170.18, 159.03, 163.92, 170.18, 169.6, 172.89, 188.88, 188.8, 206.84, 208.53, 228.95, 225.37, 227, 239.82, 247.9, 221.71, 242.44, 241.56, 223.88, 232.25, 212.45, 218.07], spy: [100, 99.63, 99.66, 101.66, 100.18, 102.29, 102.02, 103.66, 104.39, 103.72, 105.49, 105.79, 104.13, 105.89, 107.16, 105.66, 105.93, 102.85, 107.72, 108.08, 108.63, 106.63, 108.81, 108.4, 109.57, 106.8, 109.63, 108.69, 109.09, 108.18, 109.26, 107.99, 106.74, 105.73, 102.96, 102.51, 106.56, 110.33, 112.1, 112.16, 115.67, 117.01, 116.84, 118.94, 119.34, 114.35, 116.79, 115.74, 117.4, 119, 117.16, 116.49], top10Return: 118.1, spyReturn: 16.5, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Broad Tech': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -0.4, spyReturn: 0.1, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 102.81, 103.06, 102.31, 101.66], spy: [100, 100.83, 100.72, 99.47, 99.59], top10Return: 1.7, spyReturn: -0.4, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100.36, 100.21, 101.94, 104, 102.38, 99.34, 99.97, 97.66, 97.29, 98.76, 96.64, 97.2, 96.68, 93.71, 92.24, 92.59, 94.98, 95.05, 94.28, 93.77], spy: [100, 100.14, 99.42, 101.06, 101.85, 101.71, 101.57, 102.46, 101.97, 101.66, 102.96, 102.17, 102.54, 102.94, 102.38, 101.37, 101.21, 102.05, 101.93, 100.67, 100.79], top10Return: -6.2, spyReturn: 0.8, xLabels: ["Jun 26", "Jul 3", "Jul 10", "Jul 17", "Jul 24"] },
    'YTD': { top10: [100, 104.26, 105.87, 106.04, 101.57, 102.44, 103.08, 103.66, 102.05, 101.6, 100.42, 99.61, 105.99, 113.91, 116.64, 120.92, 124.64, 119.93, 130.78, 133.05, 128.01, 130.36, 131.96, 125.23, 117.31, 118.88], spy: [100, 101.78, 101.43, 101.99, 101.12, 101.47, 101.1, 100.6, 99.46, 98.11, 95.79, 96.09, 99.71, 104.14, 104.7, 105.29, 108.25, 107.6, 110.66, 111.02, 108.77, 107.58, 109.51, 110.23, 110.09, 108.37], top10Return: 18.9, spyReturn: 8.4, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 98.03, 97.99, 96.62, 97.52, 97.24, 97.33, 97.91, 96.91, 92.79, 99.35, 105.23, 109.9, 108.63, 115.55, 120.89, 115.19, 122.99, 128.68, 116.85, 123.45, 123.27, 119.33, 119.14, 110.82, 113.47], spy: [100, 100.39, 100.18, 98.57, 99.22, 98.21, 97.76, 96.83, 94.29, 93.88, 97.59, 101.04, 102.67, 102.74, 104.48, 106.56, 105.92, 108.33, 108.88, 104.72, 106.96, 106, 107.51, 108.98, 107.3, 106.68], top10Return: 13.3, spyReturn: 7.2, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 99.92, 99.73, 100.91, 99.78, 103.38, 102.13, 106.54, 109.59, 108.49, 112.82, 116.71, 115.33, 114.3, 115.61, 114.33, 109.89, 105.64, 111.6, 112.67, 113.37, 108.73, 111.43, 113.51, 116.86, 115.29, 118.81, 115.04, 116.06, 116.4, 118.58, 116.99, 114.62, 115.2, 113.16, 111.04, 117.84, 123.79, 127.24, 125.02, 134.62, 134.8, 135.66, 143.53, 144.83, 135.25, 142.54, 140.7, 135.15, 134.25, 126.3, 130.04], spy: [100, 99.63, 99.66, 101.66, 100.18, 102.29, 102.02, 103.66, 104.39, 103.72, 105.49, 105.79, 104.13, 105.89, 107.16, 105.66, 105.93, 102.85, 107.72, 108.08, 108.63, 106.63, 108.81, 108.4, 109.57, 106.8, 109.63, 108.69, 109.09, 108.18, 109.26, 107.99, 106.74, 105.73, 102.96, 102.51, 106.56, 110.33, 112.1, 112.16, 115.67, 117.01, 116.84, 118.94, 119.34, 114.35, 116.79, 115.74, 117.4, 119, 117.16, 116.49], top10Return: 30, spyReturn: 16.5, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Electrification': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -0.6, spyReturn: 0.1, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 101.54, 102.51, 102.31, 101.85], spy: [100, 100.83, 100.72, 99.47, 99.59], top10Return: 1.8, spyReturn: -0.4, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 100.18, 98.52, 99.01, 100.96, 99.69, 96.66, 96.97, 95.12, 93.68, 94.56, 92.96, 93.44, 93.67, 91.72, 90.96, 90.3, 91.66, 92.56, 92.38, 91.97], spy: [100, 100.14, 99.42, 101.06, 101.85, 101.71, 101.57, 102.46, 101.97, 101.66, 102.96, 102.17, 102.54, 102.94, 102.38, 101.37, 101.21, 102.05, 101.93, 100.67, 100.79], top10Return: -8, spyReturn: 0.8, xLabels: ["Jun 26", "Jul 3", "Jul 10", "Jul 17", "Jul 24"] },
    'YTD': { top10: [100, 104.65, 109.5, 112.24, 113.07, 115.83, 116.23, 117.25, 112.55, 114.38, 113.44, 113.83, 119.15, 124.69, 128.93, 131.46, 136.72, 128.36, 138.55, 137.45, 129.9, 130.14, 130.5, 121.97, 117.95, 119.13], spy: [100, 101.78, 101.43, 101.99, 101.12, 101.47, 101.1, 100.6, 99.46, 98.11, 95.79, 96.09, 99.71, 104.14, 104.7, 105.29, 108.25, 107.6, 110.66, 111.02, 108.77, 107.58, 109.51, 110.23, 110.09, 108.37], top10Return: 19.1, spyReturn: 8.4, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 100.15, 104.05, 104.39, 107.64, 103.73, 103.64, 105.36, 105.13, 103.05, 106.15, 111.68, 115.3, 116.81, 122.49, 122.91, 116.96, 126.75, 125.82, 114.55, 119.49, 117.18, 113.87, 111.32, 107.3, 108.62], spy: [100, 100.39, 100.18, 98.57, 99.22, 98.21, 97.76, 96.83, 94.29, 93.88, 97.59, 101.04, 102.67, 102.74, 104.48, 106.56, 105.92, 108.33, 108.88, 104.72, 106.96, 106, 107.51, 108.98, 107.3, 106.68], top10Return: 8.5, spyReturn: 7.2, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 98.73, 99.45, 100.81, 99.94, 101.95, 101.45, 102.65, 106.41, 107.39, 109.15, 113.3, 115.29, 114.36, 115.64, 114.84, 114.75, 111.17, 115.04, 115.92, 117.81, 114.49, 117.63, 120.39, 120.31, 121.3, 124.1, 124.11, 126.4, 124.04, 126.3, 123.88, 124.77, 127.05, 128.81, 130.02, 133.68, 138.89, 139.43, 139.08, 147.09, 146.34, 139.99, 148.21, 149.63, 137.03, 141.93, 138.1, 133.81, 131.24, 127.78, 128.96], spy: [100, 99.63, 99.66, 101.66, 100.18, 102.29, 102.02, 103.66, 104.39, 103.72, 105.49, 105.79, 104.13, 105.89, 107.16, 105.66, 105.93, 102.85, 107.72, 108.08, 108.63, 106.63, 108.81, 108.4, 109.57, 106.8, 109.63, 108.69, 109.09, 108.18, 109.26, 107.99, 106.74, 105.73, 102.96, 102.51, 106.56, 110.33, 112.1, 112.16, 115.67, 117.01, 116.84, 118.94, 119.34, 114.35, 116.79, 115.74, 117.4, 119, 117.16, 116.49], top10Return: 28.9, spyReturn: 16.5, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Industrials': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -0.6, spyReturn: 0.1, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 101.7, 101.91, 103.03, 102.85], spy: [100, 100.83, 100.72, 99.47, 99.59], top10Return: 2.9, spyReturn: -0.4, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 101.02, 99.74, 101.1, 102.23, 100.35, 98.97, 100.34, 97.8, 97.44, 97.53, 96.19, 97.17, 97.12, 95.72, 95.64, 95.3, 96.83, 97.03, 98.14, 97.98], spy: [100, 100.14, 99.42, 101.06, 101.85, 101.71, 101.57, 102.46, 101.97, 101.66, 102.96, 102.17, 102.54, 102.94, 102.38, 101.37, 101.21, 102.05, 101.93, 100.67, 100.79], top10Return: -2, spyReturn: 0.8, xLabels: ["Jun 26", "Jul 3", "Jul 10", "Jul 17", "Jul 24"] },
    'YTD': { top10: [100, 107.06, 111.97, 112.23, 112.58, 115.61, 118.8, 117.62, 114.46, 112.75, 111.95, 112.52, 118.2, 119.8, 119.22, 120.49, 122.48, 117.74, 125.08, 123.89, 122.45, 121.72, 124.43, 118.35, 115.48, 118.23], spy: [100, 101.78, 101.43, 101.99, 101.12, 101.47, 101.1, 100.6, 99.46, 98.11, 95.79, 96.09, 99.71, 104.14, 104.7, 105.29, 108.25, 107.6, 110.66, 111.02, 108.77, 107.58, 109.51, 110.23, 110.09, 108.37], top10Return: 18.2, spyReturn: 8.4, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 100.03, 104.22, 105.1, 107.11, 105.82, 103.17, 102.76, 101.3, 99.72, 106.02, 107.34, 107.63, 106.84, 111.09, 110.75, 106.39, 112.06, 110.8, 106.21, 110.87, 111.19, 108.08, 106.54, 104.4, 106.96], spy: [100, 100.39, 100.18, 98.57, 99.22, 98.21, 97.76, 96.83, 94.29, 93.88, 97.59, 101.04, 102.67, 102.74, 104.48, 106.56, 105.92, 108.33, 108.88, 104.72, 106.96, 106, 107.51, 108.98, 107.3, 106.68], top10Return: 6.9, spyReturn: 7.2, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 101.02, 101.83, 102.69, 101.01, 103.22, 102.59, 104.24, 105.81, 105.56, 109, 109.78, 108.65, 109.17, 110.04, 108.02, 105.08, 102.17, 106.98, 106.99, 109.99, 106.95, 109.94, 112.7, 117.18, 119.41, 121.43, 121.9, 124.82, 125.89, 127.58, 126.55, 122.7, 121.95, 120.97, 119.16, 127.06, 127.96, 129.18, 126.08, 135.29, 132.78, 129.43, 135.02, 133.91, 126.85, 132.27, 133.4, 129.77, 127.34, 124.66, 127.79], spy: [100, 99.63, 99.66, 101.66, 100.18, 102.29, 102.02, 103.66, 104.39, 103.72, 105.49, 105.79, 104.13, 105.89, 107.16, 105.66, 105.93, 102.85, 107.72, 108.08, 108.63, 106.63, 108.81, 108.4, 109.57, 106.8, 109.63, 108.69, 109.09, 108.18, 109.26, 107.99, 106.74, 105.73, 102.96, 102.51, 106.56, 110.33, 112.1, 112.16, 115.67, 117.01, 116.84, 118.94, 119.34, 114.35, 116.79, 115.74, 117.4, 119, 117.16, 116.49], top10Return: 27.8, spyReturn: 16.5, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
  },
  'Meme': {
    '1D': { top10: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], spy: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], top10Return: -2.6, spyReturn: 0.1, xLabels: ["Open", "11a", "1p", "3p", "Now"] },
    '1W': { top10: [100, 104.26, 108.13, 107.88, 105.5], spy: [100, 100.83, 100.72, 99.47, 99.59], top10Return: 5.5, spyReturn: -0.4, xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    '1M': { top10: [100, 97.85, 96.23, 97.72, 100.69, 99.86, 95.59, 93.39, 92.5, 90.43, 93.3, 90.57, 88.79, 88.43, 84.88, 81.65, 81.65, 84.92, 88.1, 87.86, 85.94], spy: [100, 100.14, 99.42, 101.06, 101.85, 101.71, 101.57, 102.46, 101.97, 101.66, 102.96, 102.17, 102.54, 102.94, 102.38, 101.37, 101.21, 102.05, 101.93, 100.67, 100.79], top10Return: -14.1, spyReturn: 0.8, xLabels: ["Jun 26", "Jul 3", "Jul 10", "Jul 17", "Jul 24"] },
    'YTD': { top10: [100, 109.04, 106.11, 104.61, 100.49, 95.31, 92.49, 92.59, 91.68, 92.76, 92.67, 91.29, 100.82, 114.96, 112.59, 118.89, 124.57, 123.49, 143.35, 135.79, 127.31, 126.67, 124.75, 115.68, 101.85, 106.32], spy: [100, 101.78, 101.43, 101.99, 101.12, 101.47, 101.1, 100.6, 99.46, 98.11, 95.79, 96.09, 99.71, 104.14, 104.7, 105.29, 108.25, 107.6, 110.66, 111.02, 108.77, 107.58, 109.51, 110.23, 110.09, 108.37], top10Return: 6.3, spyReturn: 8.4, xLabels: ["Jan", "Feb", "Mar", "May", "Jun", "Jul"] },
    '6M': { top10: [100, 93.15, 91.28, 86.06, 86.27, 85.3, 85.39, 88.05, 85.78, 75.68, 84.92, 98.37, 102.6, 99.93, 108.14, 116.61, 108.07, 126.45, 128.45, 111.71, 117.36, 111.29, 108.34, 105.76, 92.25, 97.3], spy: [100, 100.39, 100.18, 98.57, 99.22, 98.21, 97.76, 96.83, 94.29, 93.88, 97.59, 101.04, 102.67, 102.74, 104.48, 106.56, 105.92, 108.33, 108.88, 104.72, 106.96, 106, 107.51, 108.98, 107.3, 106.68], top10Return: -4.2, spyReturn: 7.2, xLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    '1Y': { top10: [100, 102.27, 97.84, 93.96, 86.59, 88.79, 85.53, 83.21, 82.36, 85.59, 87.08, 90.25, 85.41, 83.84, 86.76, 84.04, 87.05, 85.43, 85.36, 85.33, 84.89, 79.34, 85.41, 87.05, 90.16, 88.26, 89.04, 86.9, 89.57, 88.72, 87.45, 87.33, 91.66, 92.58, 97.05, 95.8, 96.58, 104.79, 102.8, 101.45, 107.88, 114.8, 113.3, 108.44, 112.49, 107.3, 100.16, 101.19, 97.32, 92.99, 90.19, 91.49], spy: [100, 99.63, 99.66, 101.66, 100.18, 102.29, 102.02, 103.66, 104.39, 103.72, 105.49, 105.79, 104.13, 105.89, 107.16, 105.66, 105.93, 102.85, 107.72, 108.08, 108.63, 106.63, 108.81, 108.4, 109.57, 106.8, 109.63, 108.69, 109.09, 108.18, 109.26, 107.99, 106.74, 105.73, 102.96, 102.51, 106.56, 110.33, 112.1, 112.16, 115.67, 117.01, 116.84, 118.94, 119.34, 114.35, 116.79, 115.74, 117.4, 119, 117.16, 116.49], top10Return: -8.5, spyReturn: 16.5, xLabels: ["Jul '25", "Oct '25", "Jan '26", "Apr '26", "Jul '26"] },
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
export const SCAN_TIMESTAMP    = '2026-07-24T13:36:57.801Z';
export const SCAN_TIMESTAMP_NY = 'July 24, 2026 at 9:36 AM ET';
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
export const HOLDINGS_COUNT = 1319;
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
  { ticker: 'NVDA', name: `NVIDIA Corp`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 13.63, bestProScore: 6.51, avgProScore: 4.54, price: 208.20, weeklyChange: 2.42 },
  { ticker: 'MU', name: `Micron Technology Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 12.89, bestProScore: 5.18, avgProScore: 4.30, price: 965.74, weeklyChange: 11.59 },
  { ticker: 'AMD', name: `Advanced Micro Devices Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 11.31, bestProScore: 5.21, avgProScore: 3.77, price: 547.26, weeklyChange: 8.68 },
  { ticker: 'AVGO', name: `Broadcom Inc`, themeCount: 3, themes: ['AI & ML', 'Semiconductors', 'Broad Tech'], aggregateScore: 7.45, bestProScore: 3.15, avgProScore: 2.48, price: 388.50, weeklyChange: 2.73 },
  { ticker: 'TSM', name: `Taiwan Semiconductor Manufacturing Co Ltd ADR`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 4.64, bestProScore: 2.84, avgProScore: 2.32, price: 412.09, weeklyChange: 2.43 },
  { ticker: 'POWL', name: `Powell Industries, Inc.`, themeCount: 2, themes: ['Electrification', 'Industrials'], aggregateScore: 4.25, bestProScore: 2.14, avgProScore: 2.13, price: 239.03, weeklyChange: 4.71 },
  { ticker: 'INTC', name: `INTEL CORPORATION`, themeCount: 2, themes: ['AI & ML', 'Semiconductors'], aggregateScore: 4.09, bestProScore: 2.98, avgProScore: 2.04, price: 101.15, weeklyChange: 4.21 },
  { ticker: 'WDC', name: `Western Digital Corp`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 3.50, bestProScore: 2.02, avgProScore: 1.75, price: 548.92, weeklyChange: 12.62 },
  { ticker: 'LRCX', name: `LAM RESEARCH CORP`, themeCount: 2, themes: ['Semiconductors', 'Broad Tech'], aggregateScore: 3.42, bestProScore: 2.36, avgProScore: 1.71, price: 318.28, weeklyChange: 3.76 },
  { ticker: 'META', name: `Meta Platforms Inc Class A`, themeCount: 2, themes: ['AI & ML', 'Broad Tech'], aggregateScore: 3.41, bestProScore: 2.62, avgProScore: 1.71, price: 604.64, weeklyChange: -6.38 },
];
// @@END_GENERATED:CROSS_THEME_TOP10@@

// @@GENERATED:ETF_RETURNS@@
// Multi-period returns per ETF ticker
export const ETF_RETURNS: Record<string, Record<Period, number>> = {
  // AI & ML
  AIS:  { '1W': 4.4, '1M': -13.4, 'YTD': 84, '6M': 63.8, '1Y': 139.1 },
  ARTY: { '1W': 3.9, '1M': -7.8, 'YTD': 41.6, '6M': 30.8, '1Y': 60.1 },
  BAI:  { '1W': 3.4, '1M': -11.1, 'YTD': 32.6, '6M': 27.8, '1Y': 45.6 },
  IGPT: { '1W': 2.1, '1M': -9, 'YTD': 52.8, '6M': 41.1, '1Y': 80.1 },
  IVES: { '1W': -2.9, '1M': -1.7, 'YTD': 12.5, '6M': 8.3, '1Y': 27.2 },
  ALAI: { '1W': 1.6, '1M': -2.6, 'YTD': 20.7, '6M': 19.4, '1Y': 36.9 },
  CHAT: { '1W': 3.9, '1M': -10.9, 'YTD': 44.7, '6M': 38.5, '1Y': 67.5 },
  AIFD: { '1W': 1.8, '1M': -4.2, 'YTD': 33.8, '6M': 31.9, '1Y': 59 },
  SPRX: { '1W': 3.2, '1M': -14.4, 'YTD': 19.7, '6M': 11.2, '1Y': 44.7 },
  AOTG: { '1W': 1.5, '1M': -0.6, 'YTD': 10.2, '6M': 10.3, '1Y': 19.4 },
  // Semiconductors
  SOXX: { '1W': 3.6, '1M': -9.7, 'YTD': 80.3, '6M': 57.5, '1Y': 124.8 },
  PSI:  { '1W': 6, '1M': -9.8, 'YTD': 93, '6M': 65, '1Y': 152.3 },
  XSD:  { '1W': 3.5, '1M': -12.1, 'YTD': 61.3, '6M': 46.9, '1Y': 95.4 },
  DRAM: { '1W': 4.6, '1M': -20.6, 'YTD': 99.9, '6M': 99.9, '1Y': 99.9 },
  // Broad Tech
  PTF:  { '1W': 7.6, '1M': -14.6, 'YTD': 41.4, '6M': 30.5, '1Y': 55.1 },
  WCLD: { '1W': -7.6, '1M': 9.3, 'YTD': -7.9, '6M': -0.4, '1Y': -11 },
  IGV:  { '1W': -5.1, '1M': 2.4, 'YTD': -16.5, '6M': -9.7, '1Y': -21.3 },
  FDTX: { '1W': 1.4, '1M': -6.6, 'YTD': 26.1, '6M': 24.9, '1Y': 29.2 },
  GTEK: { '1W': 2.9, '1M': -7.6, 'YTD': 39.1, '6M': 31.8, '1Y': 54 },
  ARKK: { '1W': -2.6, '1M': -4.8, 'YTD': -5.1, '6M': -9.5, '1Y': -3.7 },
  MARS: { '1W': 1, '1M': -15.7, 'YTD': -2.3, '6M': -2.3, '1Y': -2.3 },
  FRWD: { '1W': 3.3, '1M': -4.3, 'YTD': 24.9, '6M': 22.9, '1Y': 24.9 },
  BCTK: { '1W': -1.1, '1M': -5.7, 'YTD': 13.9, '6M': 13.3, '1Y': 15.9 },
  FWD:  { '1W': 2, '1M': -8, 'YTD': 24.3, '6M': 14.3, '1Y': 41.6 },
  CBSE: { '1W': -0.1, '1M': -3.8, 'YTD': 22.8, '6M': 12.3, '1Y': 25.7 },
  FCUS: { '1W': 6.7, '1M': -13.4, 'YTD': 24, '6M': 4.6, '1Y': 44.9 },
  WGMI: { '1W': 7.3, '1M': -15.3, 'YTD': 47.8, '6M': 15.1, '1Y': 108.6 },
  CNEQ: { '1W': 0.1, '1M': -3.4, 'YTD': 12.1, '6M': 11.9, '1Y': 26.2 },
  SGRT: { '1W': 5.5, '1M': -7.1, 'YTD': 34.7, '6M': 26, '1Y': 68.4 },
  SPMO: { '1W': 2.8, '1M': -3.4, 'YTD': 24.5, '6M': 26, '1Y': 30 },
  XMMO: { '1W': 4, '1M': -3.9, 'YTD': 17.3, '6M': 14.9, '1Y': 24.6 },
  // Electrification
  POW:  { '1W': 3.8, '1M': -8.8, 'YTD': 40.3, '6M': 25.7, '1Y': 36.1 },
  VOLT: { '1W': 3.2, '1M': -5.4, 'YTD': 33.7, '6M': 23.8, '1Y': 44.4 },
  PBD:  { '1W': -0.6, '1M': -7.7, 'YTD': 12.2, '6M': -0.5, '1Y': 28.9 },
  PBW:  { '1W': -0.9, '1M': -12.9, 'YTD': 7.8, '6M': -8.3, '1Y': 33.6 },
  IVEP: { '1W': 3.7, '1M': -5.3, 'YTD': 1.7, '6M': 1.7, '1Y': 1.7 },
  // Industrials
  AIRR: { '1W': 2.5, '1M': -5.6, 'YTD': 25.3, '6M': 9.9, '1Y': 43.4 },
  PRN:  { '1W': 3.8, '1M': -8.8, 'YTD': 31.7, '6M': 18.5, '1Y': 42.2 },
  IDEF: { '1W': 4.3, '1M': 3.7, 'YTD': 4.7, '6M': -9.3, '1Y': 11.1 },
  BILT: { '1W': 0.8, '1M': 2.7, 'YTD': 11.1, '6M': 8.4, '1Y': 14.4 },
  // Meme
  BUZZ: { '1W': 1.5, '1M': -6.4, 'YTD': 5.2, '6M': -2.1, '1Y': 5.3 },
  MEME: { '1W': 7.1, '1M': -19.3, 'YTD': 21, '6M': -4.2, '1Y': -23.6 },
  RKNG: { '1W': 7.8, '1M': -16.5, 'YTD': -7.2, '6M': -6.2, '1Y': -7.2 },
};
// @@END_GENERATED:ETF_RETURNS@@

// @@GENERATED:ETF_DAY_CHANGE@@
// Today's % move per ETF ticker (1D, vs prior close). Refreshed by the 3×/day
// price jobs. Powers the 1D ranking in the theme-ETF side panel.
export const ETF_DAY_CHANGE: Record<string, number> = {
  AIS:  -2,
  ARTY: -1.39,
  BAI:  -2.18,
  IGPT: -1.14,
  IVES: -0.32,
  CHAT: -1.49,
  SPRX: -1.02,
  SOXX: -1.51,
  PSI:  -0.71,
  XSD:  -0.79,
  DRAM: -4.98,
  PTF:  -1.23,
  WCLD: 2.35,
  IGV:  1.26,
  FDTX: -0.6,
  ARKK: -1.06,
  MARS: -0.54,
  BCTK: -0.52,
  FWD:  -0.54,
  WGMI: -2.95,
  CNEQ: 0.05,
  SPMO: -0.83,
  XMMO: -0.02,
  POW:  -0.58,
  VOLT: -0.28,
  PBW:  -0.98,
  AIRR: -0.79,
  PRN:  -0.36,
  MEME: -2.6,
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
  'AI & ML': { etfs: ['AIS', 'AIFD', 'AOTG'], series: { '1W': [100, 102.72, 104.99, 104.66, 102.58], '1M': [100, 101.03, 100.22, 100.71, 103.81, 103.41, 99.59, 98.68, 98.51, 97.36, 100.26, 98.35, 97.54, 97.43, 94.76, 92.21, 91.67, 93.99, 96.17, 95.86, 93.95], 'YTD': [100, 103.21, 103.82, 106.23, 103.02, 105.09, 104.81, 104.84, 102.66, 104.9, 103.02, 100.78, 109.64, 119.14, 126.41, 129.78, 141.3, 135.81, 151.48, 159.23, 151.42, 158.55, 160.88, 152.04, 142.78, 142.65], '6M': [100, 100.17, 98.76, 98.55, 99.39, 98.65, 99.77, 99.96, 99.02, 92.2, 101.96, 110.04, 116.91, 118.97, 126.38, 134.36, 129.84, 142.41, 154.76, 137.45, 147.59, 148.48, 143.97, 145.37, 132.5, 135.58], '1Y': [100, 101.41, 101.55, 102.45, 99.4, 104.38, 103.16, 108.69, 112.21, 110.99, 115.4, 118.53, 117.09, 118.84, 123.74, 119.63, 119.06, 112.09, 117.31, 119.43, 121.37, 115.18, 120.76, 122.43, 124.03, 121.62, 126.12, 125.49, 124.64, 124.09, 127.98, 123.61, 125.19, 126.41, 123.77, 119.48, 128.72, 138.85, 148.03, 150.44, 164.99, 172.84, 167.54, 183.73, 193.65, 172.87, 188.94, 190.91, 183.37, 185.48, 168.2, 172.52] }, returns: { '1W': 2.6, '1M': -6, 'YTD': 42.7, '6M': 35.6, '1Y': 72.5 } },
  'Semiconductors': { etfs: ['PSI', 'DRAM', 'XSD'], series: { '1W': [100, 107.98, 107.15, 106.99, 104.7], '1M': [100, 105.44, 99.8, 102.93, 107.54, 99.52, 91.52, 94.67, 88.41, 90.46, 93.37, 87.63, 91.29, 88.06, 82.27, 81.68, 81.98, 88.43, 87.78, 87.62, 85.83], 'YTD': [100, 112.61, 116.25, 118.51, 117.62, 126.28, 125.54, 133.81, 137.02, 140.18, 136.22, 140.71, 156.72, 175.37, 185.54, 180.46, 198.34, 200.02, 215.46, 221.44, 206.56, 209.11, 212.84, 189.28, 184.58, 184.75], '6M': [100, 107.39, 110.95, 112.89, 113.49, 111.61, 111.74, 122.09, 131.69, 130.89, 132.11, 144.17, 160.06, 169.57, 179.09, 178.73, 181.17, 201.44, 204.61, 193.58, 190.25, 195.93, 179.24, 174.52, 170.42, 171.43], '1Y': [100, 101.52, 105.64, 109.41, 108.11, 113.87, 113.7, 116.79, 121.49, 121.73, 126.24, 128.05, 130.32, 132.98, 137.47, 142.68, 136.11, 140.24, 144.47, 152.19, 151.04, 142.62, 147.71, 152.5, 165.55, 169.73, 172.27, 178.98, 183.85, 167.32, 176.13, 164.91, 171.81, 179.95, 179.08, 185.17, 200.73, 196.28, 216.21, 215.95, 235.32, 227.59, 230.87, 241.18, 247.36, 220.89, 240.49, 235.8, 220.35, 229.44, 211.26, 215.84] }, returns: { '1W': 4.7, '1M': -14.2, 'YTD': 84.8, '6M': 71.4, '1Y': 115.8 } },
  'Broad Tech': { etfs: ['WGMI', 'SGRT', 'GTEK'], series: { '1W': [100, 104.24, 106.53, 107.31, 105.26], '1M': [100, 99.98, 99.23, 98.36, 99.78, 97, 91.72, 92.89, 90.16, 90.74, 92.68, 89.83, 89.06, 88.8, 84.65, 83.37, 85.6, 89.13, 91.11, 91.74, 90.02], 'YTD': [100, 108.58, 114.87, 116.87, 109.34, 109.21, 107.74, 109.88, 103.22, 106.79, 105.71, 101, 113.56, 125.18, 129.48, 131.84, 144.07, 135.98, 157.89, 161.16, 154.45, 162.4, 155.79, 144.84, 131.53, 140.52], '6M': [100, 97.82, 98.48, 97.06, 99.88, 96.71, 94.62, 96.71, 95.95, 89.46, 100.06, 109.42, 115.06, 112.22, 123.91, 129.8, 123.22, 141.62, 146.7, 129.9, 142.37, 140.6, 129, 130.31, 117.18, 126.58], '1Y': [100, 98.34, 98.35, 102.51, 102.62, 109.54, 108.83, 119.43, 126.3, 128.53, 135.19, 151.13, 150.62, 144.73, 145.57, 145.32, 129.2, 125.23, 135.48, 135.53, 136.73, 125.78, 130.04, 139.34, 142.92, 141.37, 148.08, 140.4, 139.05, 137.55, 135.83, 133.76, 129.01, 132.35, 132.73, 131.35, 140.68, 154.47, 159.03, 158.86, 183.74, 178.34, 179.58, 202.34, 200.19, 186.95, 203.63, 195.83, 179.81, 179.05, 162.08, 177.01] }, returns: { '1W': 5.3, '1M': -10, 'YTD': 40.5, '6M': 26.6, '1Y': 77 } },
  'Electrification': { etfs: ['VOLT', 'POW', 'PBD'], series: { '1W': [100, 101.49, 102.37, 102.76, 102.14], '1M': [100, 100.53, 98.05, 98.82, 101.07, 99.29, 96.73, 96.78, 95.07, 93.61, 94.7, 93.03, 93.47, 93.52, 91.96, 91.61, 90.77, 92.08, 92.89, 93.24, 92.68], 'YTD': [100, 103.68, 109.24, 113.35, 114.25, 119.96, 120.52, 122.69, 115.91, 118.12, 119.29, 119.03, 126.99, 132.31, 139.57, 143.93, 147.36, 135.65, 144.96, 144.17, 138.17, 140.54, 140.63, 130.58, 127.35, 128.7], '6M': [100, 100.56, 105.5, 107.48, 110.47, 107.26, 104.98, 107.03, 107.53, 104.74, 111.31, 116.61, 120.29, 123.69, 131.6, 132.41, 123.05, 131.5, 130.59, 120.02, 126.55, 125.7, 120.63, 118.2, 114.25, 115.74], '1Y': [100, 100.04, 99.93, 100.35, 99.2, 99.92, 99.94, 101.47, 103.63, 103.23, 105.24, 107.91, 109.36, 110.04, 111.62, 112.69, 113.46, 110.46, 112.02, 114.11, 116.9, 113.53, 116.62, 119, 117.6, 119.73, 123.24, 123.77, 127.92, 126.73, 129.78, 129.31, 129.07, 131.79, 135.42, 137.16, 143.01, 148.37, 145.4, 147.18, 155.24, 152.96, 145.09, 151.17, 153.35, 143.18, 148.33, 145.74, 140.84, 138.36, 134.04, 136.49] }, returns: { '1W': 2.1, '1M': -7.3, 'YTD': 28.7, '6M': 15.7, '1Y': 36.5 } },
  'Industrials': { etfs: ['PRN', 'BILT', 'IDEF'], series: { '1W': [100, 101.45, 101.6, 102.94, 102.97], '1M': [100, 100.73, 99.86, 101.19, 102.26, 100.76, 99.79, 101.35, 99.01, 98.61, 98.45, 97.22, 98.06, 98.01, 96.4, 96.58, 96.36, 97.65, 97.79, 99.12, 99.17], 'YTD': [100, 106.26, 110.8, 111.24, 110.98, 113.34, 117.06, 116.76, 114.26, 112.86, 111.21, 111.66, 116.71, 117.99, 116.88, 118.18, 119.46, 115.45, 122.53, 120.51, 119.38, 118.39, 120.73, 115.64, 112.52, 115.87], '6M': [100, 100, 103.39, 105, 107.21, 106.35, 104.26, 103.97, 101.76, 100.1, 106.01, 107.15, 106.74, 105.8, 109.36, 109.31, 105.5, 111.02, 109.32, 105.19, 109.49, 108.82, 106.75, 105.38, 103.27, 106.07], '1Y': [100, 100.86, 101.47, 101.69, 99.98, 101.51, 101.09, 102.75, 104.03, 104.29, 107.65, 108.63, 107.51, 107.92, 108.26, 106.39, 103.72, 100.9, 104.27, 104.24, 106.58, 104.25, 107.29, 109.7, 113.99, 115.87, 117.94, 117.74, 120.19, 121.73, 123.94, 122.96, 120.04, 119.38, 117.73, 115.9, 123.18, 123.56, 124.15, 120.94, 129.19, 126.8, 123.94, 129.39, 127.41, 121.5, 126.21, 126.3, 124.17, 121.83, 119.22, 122.58] }, returns: { '1W': 3, '1M': -0.8, 'YTD': 15.9, '6M': 6.1, '1Y': 22.6 } },
  'Meme': { etfs: ['BUZZ', 'RKNG', 'MEME'], series: { '1W': [100, 104.26, 108.13, 107.88, 105.5], '1M': [100, 97.85, 96.23, 97.72, 100.69, 99.86, 95.59, 93.39, 92.5, 90.43, 93.3, 90.57, 88.79, 88.43, 84.88, 81.65, 81.65, 84.92, 88.1, 87.86, 85.94], 'YTD': [100, 109.04, 106.11, 104.61, 100.49, 95.31, 92.49, 92.59, 91.68, 92.76, 92.67, 91.29, 100.82, 114.96, 112.59, 118.89, 124.57, 123.49, 143.35, 135.79, 127.31, 126.67, 124.75, 115.68, 101.85, 106.32], '6M': [100, 93.15, 91.28, 86.06, 86.27, 85.3, 85.39, 88.05, 85.78, 75.68, 84.92, 98.37, 102.6, 99.93, 108.14, 116.61, 108.07, 126.45, 128.45, 111.71, 117.36, 111.29, 108.34, 105.76, 92.25, 97.3], '1Y': [100, 102.27, 97.84, 93.96, 86.59, 88.79, 85.53, 83.21, 82.36, 85.59, 87.08, 90.25, 85.41, 83.84, 86.76, 84.04, 87.05, 85.43, 85.36, 85.33, 84.89, 79.34, 85.41, 87.05, 90.16, 88.26, 89.04, 86.9, 89.57, 88.72, 87.45, 87.33, 91.66, 92.58, 97.05, 95.8, 96.58, 104.79, 102.8, 101.45, 107.88, 114.8, 113.3, 108.44, 112.49, 107.3, 100.16, 101.19, 97.32, 92.99, 90.19, 91.49] }, returns: { '1W': 5.5, '1M': -14.1, 'YTD': 6.3, '6M': -2.7, '1Y': -8.5 } },
};
// @@END_GENERATED:THEME_REPRESENTATIVES@@

// @@GENERATED:THEME_UNIVERSE@@
export const THEME_UNIVERSE: Partial<Record<Theme, ThemeUniverseFund[]>> = {
  'AI & ML': [
    { t: 'AIS', chosen: true, anchor: true, score: 101.4, ret6: 63.8, ret1: 139.1, corr: 0.75, reason: 'anchor', series: { '1W': [100, 106.76, 106.57, 106.66, 104.43], '1M': [100, 104.63, 99.44, 102.44, 106.28, 99.03, 92.48, 96.01, 90.16, 92.14, 95.32, 89.62, 92.24, 89.32, 83.78, 82.65, 82.9, 88.5, 88.34, 88.41, 86.57], 'YTD': [100, 106.94, 110.67, 114.27, 114.51, 118.48, 119.17, 120.65, 116.18, 120.28, 116.79, 114.59, 127.69, 141.46, 153.75, 160.89, 179.88, 173.05, 204.82, 212.47, 203.39, 213.37, 225.87, 204.47, 178.05, 183.98], '6M': [100, 103.06, 104.93, 103.98, 108.12, 102.04, 104.38, 106.92, 104.48, 99.27, 113.36, 121.29, 133.94, 132.71, 150.95, 160.92, 154.81, 179.42, 195.57, 166.39, 189.27, 198.93, 175.82, 181.22, 157.13, 164.59] } },
    { t: 'IGPT', chosen: false, anchor: false, score: 60.6, ret6: 41.1, ret1: 80.1, corr: 0.95, reason: 'correlated', series: { '1W': [100, 104.92, 104.89, 103.12, 102.12], '1M': [100, 103.09, 98.99, 101.46, 104.26, 100.29, 95.41, 98.29, 94.76, 95.7, 99.11, 94.67, 96.51, 94.45, 89.87, 88.6, 89.1, 93.49, 93.46, 91.89, 91], 'YTD': [100, 105.23, 105.3, 109.57, 107.82, 106.15, 107.3, 107.23, 104.02, 105.11, 101.38, 99.97, 107.53, 119.12, 126.67, 134.35, 150.55, 145.05, 167.26, 169.04, 163.54, 168.99, 175.05, 166.05, 150.9, 152.78], '6M': [100, 102.3, 98.91, 97.06, 99.59, 95.19, 97.03, 98.55, 94.13, 90.65, 99.69, 107.38, 114.02, 117.08, 130.44, 139.78, 134.68, 152.32, 160.16, 141.7, 157.38, 160.72, 148.74, 154.5, 138.13, 141.86] } },
    { t: 'CHAT', chosen: false, anchor: false, score: 53, ret6: 38.5, ret1: 67.5, corr: 0.93, reason: 'correlated', series: { '1W': [100, 105.6, 106.33, 105.58, 103.9], '1M': [100, 102.11, 97.75, 99.66, 103.05, 97.66, 92.72, 95.03, 91.48, 93.79, 95.8, 91.51, 92.72, 92.34, 87.44, 85.57, 85.72, 90.53, 91.15, 90.51, 89.07], 'YTD': [100, 103.66, 104.65, 107.92, 104.99, 106.38, 112.47, 108.36, 108.43, 110.33, 108.02, 109.04, 116.3, 127.36, 134.31, 136.41, 142.88, 141.74, 164.28, 170, 157.97, 163.45, 167.37, 156.7, 142.01, 144.66], '6M': [100, 101, 101.44, 103.03, 105.65, 99.22, 105.7, 105.65, 103.06, 100.08, 109.9, 118.38, 126.84, 122.39, 133.24, 136.31, 135.23, 151.78, 166.29, 141.78, 156.75, 158.22, 143.67, 148.45, 132.59, 138.01] } },
    { t: 'ARTY', chosen: false, anchor: false, score: 45.5, ret6: 30.8, ret1: 60.1, corr: 0.91, reason: 'correlated', series: { '1W': [100, 104.71, 105.8, 105.35, 103.89], '1M': [100, 101.1, 97.74, 100.22, 102.99, 98.9, 96.13, 97.97, 94.56, 96.12, 98.04, 94.19, 94.6, 93, 89.32, 88.48, 88.79, 92.97, 93.94, 93.54, 92.24], 'YTD': [100, 104.5, 107.12, 111.15, 106.14, 107.66, 106.37, 105.87, 102.18, 103.32, 100.62, 98.78, 106.1, 121.73, 128.85, 131.71, 138.9, 132.4, 150.91, 162.72, 152.08, 154.46, 158.07, 150.93, 137.09, 141.58], '6M': [100, 99.39, 98.89, 96.71, 97.69, 92.01, 93.96, 96.12, 92.68, 88.95, 97.29, 108.41, 117.15, 114.38, 124.64, 127.93, 121.95, 135.9, 152.97, 131.1, 144.68, 142.92, 135.9, 138.6, 125.08, 130.41] } },
    { t: 'AIFD', chosen: true, anchor: false, score: 45.5, ret6: 31.9, ret1: 59, corr: 0.83, reason: 'diversifier', series: { '1W': [100, 100.4, 103.86, 103.5, 101.76], '1M': [100, 98.95, 100.53, 98.94, 102.27, 105.69, 102.47, 98.41, 100.94, 98, 101.21, 100.66, 98.18, 99.36, 97.74, 94.59, 94.19, 94.57, 97.82, 97.49, 95.85], 'YTD': [100, 101.7, 101.61, 103.95, 101.03, 105.49, 105.53, 105.11, 102.14, 105.69, 106.28, 102.61, 112.36, 119.16, 124.68, 126.39, 135.57, 129.9, 137.67, 149.07, 141.4, 146.83, 142.73, 138.46, 136.4, 133.76], '6M': [100, 100.72, 101.06, 102.9, 102.77, 104.7, 103.86, 104.21, 104.7, 95.81, 105.66, 115.31, 119.72, 122.83, 125.8, 133.66, 129.22, 136.93, 150.32, 136.54, 140.79, 136.15, 140.99, 139.27, 130.15, 131.89] } },
    { t: 'BAI', chosen: false, anchor: false, score: 36.7, ret6: 27.8, ret1: 45.6, corr: 0.95, reason: 'correlated', series: { '1W': [100, 106.32, 106.07, 105.74, 103.44], '1M': [100, 103.52, 98.85, 102.29, 106.1, 99.6, 94.59, 97, 91.69, 93.44, 96.02, 91.41, 93.88, 91.43, 86.82, 85.69, 85.93, 91.37, 91.15, 90.86, 88.89], 'YTD': [100, 103.09, 104.8, 106.4, 102.88, 105.98, 105.62, 105.14, 101.86, 102.37, 104.32, 102.31, 112.16, 122.58, 128.35, 131.44, 140.45, 135.14, 150.63, 151.62, 146.97, 149.94, 158.32, 144.29, 129.55, 132.64], '6M': [100, 100.32, 102.26, 99.88, 102.03, 96.9, 98.61, 99.25, 100.52, 95.34, 107.75, 114.53, 120.28, 118.37, 129.57, 135.33, 130.21, 144.04, 149.62, 131.89, 145.75, 148.84, 136, 138.05, 123.21, 127.81] } },
    { t: 'ALAI', chosen: false, anchor: false, score: 28.1, ret6: 19.4, ret1: 36.9, corr: 0.89, reason: 'correlated', series: { '1W': [100, 100.4, 104.55, 102.99, 101.64], '1M': [100, 98.66, 98.83, 98.43, 100.4, 102.06, 100.69, 97.43, 100.51, 98.84, 100.58, 101.45, 98.95, 98.75, 99.8, 96.96, 95.86, 96.24, 100.22, 98.73, 97.43], 'YTD': [100, 102.49, 102.19, 102.53, 98.03, 97.06, 96.26, 94.75, 92.88, 95.4, 92.58, 91.5, 98.64, 106.29, 109.97, 111.02, 118, 115.31, 123.57, 126.2, 119.16, 127.78, 124.35, 123.33, 123.59, 120.66], '6M': [100, 98.26, 95.11, 94.07, 93.87, 93.38, 93.96, 94.42, 92.01, 85.21, 93.02, 103.82, 106.21, 109.14, 110.86, 116.79, 114.81, 121.04, 127.45, 118.46, 125.07, 120.93, 123.42, 123.28, 118.84, 119.42] } },
    { t: 'SPRX', chosen: false, anchor: false, score: 28, ret6: 11.2, ret1: 44.7, corr: 0.87, reason: 'correlated', series: { '1W': [100, 105.51, 104.9, 104.23, 103.25], '1M': [100, 101.64, 98.38, 104.1, 107.68, 101.31, 94.24, 96.08, 90.54, 92.38, 94.81, 89.51, 90.37, 88.04, 82.64, 81.9, 82.91, 87.47, 86.97, 86.41, 85.6], 'YTD': [100, 105.52, 109.87, 111.54, 107.15, 104.28, 101.46, 101.21, 100.05, 100.81, 100.62, 94.5, 103.46, 113.74, 115.9, 112.56, 122.17, 121.64, 145.56, 149.15, 143.69, 142.47, 150.6, 134.5, 115.58, 119.72], '6M': [100, 99.6, 103.74, 96.07, 97.73, 93.75, 94.23, 97.12, 95.22, 87.5, 98.5, 104.99, 110.42, 103.2, 108.77, 115.62, 115.12, 136.04, 142.21, 123.77, 136.8, 134.53, 124.73, 125.49, 108.41, 113.3] } },
    { t: 'IVES', chosen: false, anchor: false, score: 17.8, ret6: 8.3, ret1: 27.2, corr: 0.86, reason: 'correlated', series: { '1W': [100, 101.2, 99.51, 97.3, 97.05], '1M': [100, 99.25, 100.08, 103.26, 105.39, 104.87, 103.13, 105.67, 103.9, 103.9, 104.9, 103.62, 103.87, 103.87, 101.66, 100.69, 101.33, 102.54, 100.83, 98.59, 98.34], 'YTD': [100, 103.1, 104.87, 105.44, 100.19, 97.91, 96.14, 94.21, 96.11, 96.08, 92.19, 90.73, 93.17, 103.51, 105.57, 107.5, 113.76, 113.13, 123.19, 126, 116.99, 115.94, 120.53, 120.69, 116.26, 112.46], '6M': [100, 98.78, 95.27, 92.1, 91.67, 89.87, 92.25, 92.98, 88.9, 86.55, 90.48, 97.86, 102.99, 100.09, 104.3, 109.7, 109.09, 115.44, 122.61, 110.07, 114, 109.46, 113.73, 115.68, 111.04, 108.45] } },
    { t: 'AOTG', chosen: true, anchor: false, score: 14.8, ret6: 10.3, ret1: 19.4, corr: 0.83, reason: 'diversifier', series: { '1W': [100, 101.01, 104.53, 103.83, 101.54], '1M': [100, 99.52, 100.7, 100.74, 102.88, 105.51, 103.81, 101.63, 104.43, 101.94, 104.26, 104.78, 102.19, 103.6, 102.76, 99.4, 97.92, 98.9, 102.35, 101.67, 99.43], 'YTD': [100, 100.98, 99.17, 100.47, 93.51, 91.31, 89.73, 88.76, 89.66, 88.73, 85.98, 85.13, 88.88, 96.81, 100.8, 102.05, 108.46, 104.49, 111.95, 116.15, 109.47, 115.46, 114.04, 113.2, 113.9, 110.21], '6M': [100, 96.74, 90.28, 88.78, 87.28, 89.22, 91.08, 88.76, 87.88, 81.51, 86.85, 93.52, 97.08, 101.37, 102.4, 108.5, 105.49, 110.89, 118.39, 109.41, 112.72, 110.36, 115.11, 115.61, 110.22, 110.25] } },
  ],
  'Semiconductors': [
    { t: 'PSI', chosen: true, anchor: true, score: 108.7, ret6: 65, ret1: 152.3, corr: 0.91, reason: 'anchor', series: { '1W': [100, 107.59, 106.9, 106.7, 106.02], '1M': [100, 105.08, 99.66, 105.47, 111.3, 103.35, 93.64, 94.56, 87.91, 89.68, 94.47, 89.88, 93.57, 91.08, 86.05, 84.87, 85.08, 91.53, 90.95, 90.78, 90.2], 'YTD': [100, 112.69, 117.35, 119.33, 119.05, 130.15, 127.91, 125.54, 117.91, 120.33, 126.85, 123.09, 138.11, 152.22, 171.01, 171.41, 189.5, 181.38, 200.95, 204.81, 212.9, 216.13, 238.17, 202.22, 184.14, 193.03], '6M': [100, 103.86, 108.43, 109.37, 111.96, 103.92, 102.53, 104.33, 108.99, 102.83, 115.79, 124.16, 135.21, 136.63, 152.18, 162.82, 155.85, 174.44, 178.47, 162.13, 182.48, 193.21, 172.16, 173.7, 156.05, 165.85] } },
    { t: 'DRAM', chosen: true, anchor: false, score: 99.9, ret6: 99.9, ret1: 99.9, corr: -0.08, reason: 'diversifier', series: { '1W': [100, 110.91, 108.88, 109.88, 104.58], '1M': [100, 109.95, 102.79, 102.87, 105.61, 94.18, 86.7, 92.61, 86.64, 88.72, 90.15, 81.94, 87.56, 82.08, 74.85, 75.39, 75.88, 84.16, 82.61, 83.37, 79.35], 'YTD': [100, 116.97, 120.86, 126.22, 125.83, 134.01, 137.72, 166.75, 190.2, 196.47, 177.67, 195.75, 218.77, 244.96, 236.67, 215.63, 234.19, 251.98, 249.35, 259.15, 218.41, 223.49, 206.41, 188.54, 212, 199.89], '6M': [100, 116.97, 120.86, 126.22, 125.83, 134.01, 137.72, 166.75, 190.2, 196.47, 177.67, 195.75, 218.77, 244.96, 236.67, 215.63, 234.19, 251.98, 249.35, 259.15, 218.41, 223.49, 206.41, 188.54, 212, 199.89] } },
    { t: 'SOXX', chosen: false, anchor: false, score: 91.2, ret6: 57.5, ret1: 124.8, corr: 0.95, reason: 'correlated', series: { '1W': [100, 105.45, 105.99, 105.17, 103.58], '1M': [100, 103.94, 98.08, 102.14, 106.53, 99.7, 94.15, 96.68, 91.72, 93.44, 96.65, 92.04, 94.42, 92.31, 88.2, 86.75, 87.14, 91.89, 92.36, 91.64, 90.26], 'YTD': [100, 109.17, 113.72, 116.58, 114.77, 119.61, 119.35, 116.98, 111.7, 112.18, 113.24, 112.42, 125.73, 138.04, 153.28, 153.43, 171.34, 164.95, 189.1, 200.14, 197.99, 200.36, 212.77, 193.16, 176.16, 180.28], '6M': [100, 102.8, 102.83, 103.22, 105.53, 97.58, 98.76, 99.18, 99.4, 95.8, 107.97, 117.14, 125.85, 127.88, 140.71, 150.4, 144.79, 164.39, 179.46, 157.84, 174.81, 182.24, 165.07, 169.45, 152.1, 158.25] } },
    { t: 'XSD', chosen: true, anchor: false, score: 71.2, ret6: 46.9, ret1: 95.4, corr: 0.91, reason: 'diversifier', series: { '1W': [100, 105.44, 105.66, 104.38, 103.49], '1M': [100, 101.29, 96.94, 100.45, 105.72, 101.03, 94.22, 96.83, 90.69, 92.99, 95.5, 91.08, 92.74, 91.03, 85.9, 84.78, 84.98, 89.61, 89.79, 88.7, 87.95], 'YTD': [100, 108.18, 110.53, 109.99, 107.97, 114.68, 111, 109.15, 102.96, 103.75, 104.13, 103.29, 113.27, 128.94, 148.94, 154.33, 171.33, 166.69, 196.08, 200.35, 188.36, 187.7, 193.94, 177.08, 157.59, 161.34], '6M': [100, 101.33, 103.55, 103.09, 102.68, 96.89, 94.97, 95.18, 95.87, 93.37, 102.88, 112.6, 126.21, 127.13, 148.43, 157.75, 153.48, 177.91, 186.02, 159.45, 169.85, 171.09, 159.15, 161.31, 143.21, 148.56] } },
  ],
  'Broad Tech': [
    { t: 'WGMI', chosen: true, anchor: true, score: 61.8, ret6: 15.1, ret1: 108.6, corr: 0.6, reason: 'anchor', series: { '1W': [100, 106.47, 108.46, 110.57, 107.31], '1M': [100, 97.26, 98.46, 95.42, 94.47, 88.03, 79.67, 84.6, 78.83, 82.58, 83.13, 78.3, 78.24, 79.39, 72.05, 71.26, 78.94, 84.05, 85.62, 87.28, 84.71], 'YTD': [100, 117.64, 133.42, 133, 118.37, 108.81, 101.5, 104.21, 97.54, 105.7, 101.57, 91.09, 108.07, 128.22, 129.66, 131.96, 150.85, 143.32, 180.98, 181.24, 172.38, 185.47, 164.8, 149.43, 125.69, 147.77], '6M': [100, 95.41, 94.1, 85.87, 91.69, 81.32, 80.21, 86.15, 83.45, 74.75, 86.97, 101.55, 107.51, 100, 118.38, 123.94, 117.75, 147.7, 151.81, 127.48, 147.57, 139.39, 114.19, 119.15, 102.13, 121.4] } },
    { t: 'SGRT', chosen: true, anchor: false, score: 47.2, ret6: 26, ret1: 68.4, corr: -0.03, reason: 'diversifier', series: { '1W': [100, 106.49, 106.99, 106.89, 105.55], '1M': [100, 103.17, 99.31, 100.5, 103.45, 98.43, 92.83, 94.98, 91.2, 93.21, 96, 92.47, 94.53, 91.37, 87.5, 87.31, 88.03, 93.74, 94.18, 94.1, 92.91], 'YTD': [100, 103.92, 106.48, 109.08, 106.45, 111.56, 115.15, 116.39, 109.68, 109.88, 110.32, 109.56, 121.79, 126.71, 130.79, 132.07, 142.06, 134.27, 146.18, 148.9, 144.22, 145.1, 149.94, 140.18, 126.83, 134.67], '6M': [100, 99.62, 104.17, 103.83, 108.75, 105.67, 104.81, 104.68, 103.64, 100.23, 113.15, 115.89, 119.8, 115.86, 127.65, 133.47, 126.15, 137.6, 142.3, 125.71, 138.17, 140.5, 126.41, 130.73, 118.9, 126.52] } },
    { t: 'GTEK', chosen: true, anchor: false, score: 42.9, ret6: 31.8, ret1: 54, corr: 0.6, reason: 'diversifier', series: { '1W': [100, 99.76, 104.13, 104.48, 102.91], '1M': [100, 99.52, 99.92, 99.15, 101.42, 104.55, 102.67, 99.09, 100.44, 96.43, 98.92, 98.72, 94.4, 95.63, 94.39, 91.53, 89.83, 89.61, 93.54, 93.85, 92.44], 'YTD': [100, 104.18, 104.7, 108.54, 103.19, 107.25, 106.57, 109.04, 102.44, 104.8, 105.25, 102.34, 110.83, 120.61, 127.99, 131.48, 139.31, 130.34, 146.5, 153.34, 146.75, 156.64, 152.64, 144.91, 142.06, 139.13], '6M': [100, 98.43, 97.16, 101.49, 99.19, 103.15, 98.85, 99.29, 100.76, 93.4, 100.07, 110.81, 117.87, 120.79, 125.71, 131.98, 125.76, 139.56, 145.99, 136.52, 141.36, 141.91, 146.39, 141.06, 130.51, 131.81] } },
    { t: 'PTF', chosen: false, anchor: false, score: 42.8, ret6: 30.5, ret1: 55.1, corr: 0.81, reason: 'correlated', series: { '1W': [100, 110.13, 109.37, 108.95, 107.61], '1M': [100, 104.41, 99.52, 103.92, 107.63, 100.09, 89.55, 91.36, 85.37, 88.62, 91.39, 86.12, 89.32, 85.91, 79.84, 79.16, 79.38, 87.42, 86.82, 86.49, 85.42], 'YTD': [100, 106.47, 109.18, 112.39, 114.69, 118.04, 120.45, 120.33, 115.1, 117.17, 121.4, 116.9, 129.87, 139.08, 145.72, 149.16, 158.14, 149.67, 170.14, 175.64, 169.63, 169.42, 178.21, 153.86, 132.2, 141.44], '6M': [100, 105.28, 109.13, 107.28, 111.44, 108.74, 107.49, 109.36, 111.69, 103.84, 118.67, 122.41, 132.58, 128.57, 142.34, 145.49, 137.7, 155.7, 163.38, 143.66, 158.89, 159.06, 136.41, 139.21, 120.58, 130.13] } },
    { t: 'SPMO', chosen: false, anchor: false, score: 28, ret6: 26, ret1: 30, corr: 0.7, reason: 'diverse', series: { '1W': [100, 103.58, 103.84, 103.67, 102.83], '1M': [100, 103.8, 100.27, 103.08, 105.04, 100.99, 98.08, 99.47, 97.16, 97.91, 99.97, 97.36, 99.4, 97.54, 94.47, 93.56, 93.97, 97.34, 97.58, 97.43, 96.63], 'YTD': [100, 100.6, 100.57, 100.24, 100.17, 101.06, 100.54, 100.13, 99.98, 98.35, 96.25, 95.96, 102.88, 107.53, 110.22, 112.67, 121.06, 117.86, 125.82, 128.08, 127.79, 129.35, 135.38, 128.29, 121.76, 124.54], '6M': [100, 101.21, 102.24, 100.03, 99.93, 100.33, 100.21, 98.75, 96.64, 94.34, 102.13, 106.52, 108.65, 109.37, 116.03, 121.56, 118.35, 125.89, 130.51, 120.91, 130.85, 134.34, 126.93, 129.39, 121.09, 125.06] } },
    { t: 'FWD', chosen: false, anchor: false, score: 28, ret6: 14.3, ret1: 41.6, corr: 0.79, reason: 'diverse', series: { '1W': [100, 103.65, 103.36, 102.6, 102.02], '1M': [100, 102.6, 99.74, 102.21, 104.93, 101.24, 97.44, 99.28, 95.6, 95.96, 97.87, 94.48, 96.05, 94.86, 91.6, 90.22, 90.15, 93.43, 93.17, 92.49, 91.97], 'YTD': [100, 107.09, 108.98, 111.03, 108.2, 110.45, 111.58, 112.29, 108.01, 107.27, 106.24, 106.18, 113.23, 119.14, 121.84, 122.75, 128.34, 124.69, 135.54, 138.47, 134.43, 135.59, 141.86, 132.76, 123.84, 124.34], '6M': [100, 99.57, 100.49, 100.63, 103.17, 99.8, 99.47, 98.84, 97.69, 95.61, 103.56, 107.1, 110.42, 109.16, 114.91, 118.01, 114.65, 123.21, 128.83, 116.61, 125.5, 127.55, 121.14, 121.67, 112.15, 114.33] } },
    { t: 'FDTX', chosen: false, anchor: false, score: 27, ret6: 24.9, ret1: 29.2, corr: 0.83, reason: 'correlated', series: { '1W': [100, 103.97, 103.34, 101.95, 101.42], '1M': [100, 102.04, 99.3, 102.96, 105.23, 102.22, 97.92, 99.89, 96.84, 97.52, 99.57, 96.61, 98.34, 96.15, 92.6, 91.71, 92.05, 95.7, 95.12, 93.84, 93.35], 'YTD': [100, 102.2, 100.24, 103.12, 96.05, 96.22, 95.67, 95.03, 95.53, 95.1, 92.84, 92.35, 96.94, 107.15, 112.21, 115.68, 120.93, 118.44, 130.88, 141.92, 134.31, 135.95, 142.11, 135.04, 125.05, 126.07], '6M': [100, 97.84, 94.3, 92.25, 92.7, 91.88, 93.84, 94.35, 91.21, 89.03, 95.64, 102.24, 109.31, 107.92, 115.24, 118.8, 116.35, 127.27, 139.88, 125.03, 135.37, 135.38, 129.9, 132.1, 121.67, 123.85] } },
    { t: 'FCUS', chosen: false, anchor: false, score: 24.8, ret6: 4.6, ret1: 44.9, corr: 0.77, reason: 'diverse', series: { '1W': [100, 100.14, 106.85, 106.69, 106.72], '1M': [100, 97.82, 100.36, 95.62, 97.54, 99.79, 95.93, 88.27, 90.52, 85.91, 90.14, 88.9, 85.76, 88.55, 85.46, 80.19, 81.13, 81.24, 86.68, 86.56, 86.58], 'YTD': [100, 112.12, 115.26, 119.81, 120.72, 122.28, 122.73, 124.76, 107.87, 116.11, 118.21, 114.56, 121.08, 125.43, 127.86, 133.5, 145.57, 134.89, 143.37, 147.2, 140.69, 148.79, 139.66, 125.53, 122.36, 123.96], '6M': [100, 97.37, 100.39, 101.89, 104.14, 106.18, 96.08, 97.93, 97.81, 91.73, 100.21, 104.81, 105.74, 108.62, 114.27, 122.78, 113.53, 121.97, 125.44, 115.15, 119.31, 118.13, 115.84, 108.85, 96.84, 104.55] } },
    { t: 'FRWD', chosen: false, anchor: false, score: 23.9, ret6: 22.9, ret1: 24.9, corr: 0.1, reason: 'diverse', series: { '1W': [100, 100.66, 104.96, 104.54, 103.32], '1M': [100, 99.67, 101.17, 98.63, 101.34, 103.79, 100.49, 97.4, 99.84, 96.95, 99.87, 100.21, 97.14, 98.89, 97.43, 93.72, 92.6, 93.21, 97.19, 96.8, 95.67], 'YTD': [100, 100.4, 106.5, 94.12, 96.5, 98.35, 96.96, 96.31, 96.19, 94.9, 86.8, 99.61, 106.99, 110.76, 111.26, 119.68, 123.96, 123.37, 130.8, 127.47, 136.6, 130.51, 135.46, 130.35, 122.31, 124.87], '6M': [100, 99.94, 95.83, 94.98, 94.97, 94.93, 94.82, 94.7, 93.42, 85.45, 93.62, 104.35, 106.54, 111.16, 112.57, 121.55, 117.11, 125.95, 133.79, 123.87, 132.04, 128.06, 129.11, 128.32, 120.41, 122.92] } },
    { t: 'XMMO', chosen: false, anchor: false, score: 19.8, ret6: 14.9, ret1: 24.6, corr: 0.73, reason: 'diverse', series: { '1W': [100, 102.84, 103.56, 103.98, 103.96], '1M': [100, 101.28, 98.88, 99.09, 100.7, 98.25, 96.56, 97.54, 94.85, 94.87, 95.59, 93.92, 95.16, 95.1, 93.47, 92.97, 92.44, 95.07, 95.73, 96.12, 96.11], 'YTD': [100, 102.07, 103.39, 102.99, 103.06, 104.95, 107.88, 108.37, 105.97, 104, 106.66, 106.67, 111.43, 114.64, 115.74, 115.57, 120.16, 114.86, 121.92, 124.02, 122.55, 122.5, 122.88, 117.34, 114.05, 117.28], '6M': [100, 100.04, 103.74, 103.94, 105.27, 105.1, 103.35, 102.74, 104.39, 102.51, 108.69, 110.84, 111.59, 110.48, 115.02, 117.6, 112.41, 119.11, 120.88, 113.93, 119.96, 120.96, 115.32, 114.17, 111.03, 114.78] } },
    { t: 'CNEQ', chosen: false, anchor: false, score: 19.1, ret6: 11.9, ret1: 26.2, corr: 0.76, reason: 'diverse', series: { '1W': [100, 102.6, 102.16, 100.49, 100.05], '1M': [100, 99.2, 99.12, 101.68, 103.46, 101.58, 99.5, 101.2, 98.92, 99.65, 101.7, 99.27, 99.85, 100.23, 97.46, 96.06, 96.54, 99.05, 98.62, 97.02, 96.59], 'YTD': [100, 102.36, 101.69, 101.8, 97.88, 98.23, 97.76, 95.52, 95.61, 95.46, 92.15, 91.48, 97.32, 105.93, 107.01, 107.62, 113.26, 111.37, 120.39, 119.6, 113.44, 116.4, 120.04, 118.3, 113.07, 112.07], '6M': [100, 98.46, 98.06, 95.97, 96.99, 92.99, 95.48, 94.99, 91.77, 90.15, 95.68, 104.26, 105.94, 105.04, 107.44, 112.8, 110.92, 117.03, 119.24, 110.02, 118.4, 114.63, 114.98, 117.53, 111.01, 111.62] } },
    { t: 'CBSE', chosen: false, anchor: false, score: 19, ret6: 12.3, ret1: 25.7, corr: 0.76, reason: 'diverse', series: { '1W': [100, 101.45, 101.58, 100.39, 99.94], '1M': [100, 101.45, 101.51, 102.49, 104.08, 101.32, 100.11, 100.54, 98.03, 97.58, 98.97, 97.89, 99.02, 98.57, 97.17, 96.66, 96.3, 97.69, 97.82, 96.68, 96.24], 'YTD': [100, 106.86, 110.62, 109.18, 107.14, 108.61, 109.21, 108.56, 104.77, 103.45, 104.86, 101.13, 107.53, 115.73, 118.34, 119.2, 125.05, 121.31, 127.84, 132.12, 126.56, 127.35, 132.79, 127.09, 123.97, 122.79], '6M': [100, 97.97, 100.91, 98.94, 102.15, 97.73, 95.95, 96.93, 96.45, 92.89, 98.57, 104.18, 108.24, 103.83, 111.74, 115.02, 111.58, 116.17, 121.58, 111.3, 116.12, 119.05, 117.49, 116.14, 113.43, 112.94] } },
    { t: 'BCTK', chosen: false, anchor: false, score: 14.6, ret6: 13.3, ret1: 15.9, corr: 0.17, reason: 'diverse', series: { '1W': [100, 102.8, 101.41, 99.6, 98.88], '1M': [100, 100.88, 99.68, 103.82, 107.05, 103.66, 100.69, 102.94, 99.81, 100.48, 101.92, 98.91, 100.61, 99.54, 96.43, 95.1, 95.33, 98, 96.68, 94.95, 94.26], 'YTD': [100, 101.82, 101.56, 102.35, 96.46, 98.58, 98.75, 98.07, 99.55, 97.41, 96.65, 94.15, 97.94, 107.29, 109.63, 110.65, 115.24, 113.32, 121.88, 126.06, 121.66, 120.77, 129.31, 124.02, 116.48, 113.86], '6M': [100, 98.57, 97, 95.62, 97.51, 96.74, 98.7, 97.85, 95.98, 92.23, 97.58, 103.97, 108.19, 105.76, 110.65, 114.43, 112.54, 119.38, 126.57, 114.57, 123.31, 121.01, 120.77, 122.26, 114.07, 113.07] } },
    { t: 'MARS', chosen: false, anchor: false, score: -2.3, ret6: -2.3, ret1: -2.3, corr: 0.09, reason: 'diverse', series: { '1W': [100, 104.17, 102.29, 101.92, 100.97], '1M': [100, 96.69, 98.05, 108.05, 112.54, 108.99, 109.23, 108.29, 101.01, 100.03, 97.25, 92.93, 93.56, 91.47, 86.38, 84.99, 83.49, 86.97, 85.41, 85.09, 84.3], 'YTD': [100, 101.98, 106.46, 106.13, 101.21, 107.38, 120.34, 123.37, 132.45, 122.92, 124.33, 128.53, 141.44, 147.18, 157.02, 183.98, 148.1, 133.37, 138.01, 124.37, 113.6, 126.27, 115.9, 108.39, 96.73, 97.67], '6M': [100, 101.98, 106.46, 106.13, 101.21, 107.38, 120.34, 123.37, 132.45, 122.92, 124.33, 128.53, 141.44, 147.18, 157.02, 183.98, 148.1, 133.37, 138.01, 124.37, 113.6, 126.27, 115.9, 108.39, 96.73, 97.67] } },
    { t: 'WCLD', chosen: false, anchor: false, score: -5.7, ret6: -0.4, ret1: -11, corr: 0.31, reason: 'diverse', series: { '1W': [100, 96.67, 92.49, 90.31, 92.43], '1M': [100, 98.27, 104.14, 106.99, 108.7, 112.55, 113.67, 115.7, 116.79, 114.48, 114.82, 117.29, 118.63, 117.63, 118.21, 117.97, 118.24, 114.31, 109.36, 106.78, 109.29], 'YTD': [100, 98.97, 91.6, 92.72, 80.41, 78.81, 77.92, 77.92, 84.58, 80.69, 77.41, 78.45, 72.44, 77.49, 77.49, 84.29, 80.55, 84.75, 87.18, 94.66, 87.43, 83.66, 91.56, 98.6, 99.57, 92.06], '6M': [100, 91.16, 85.16, 83.71, 79.13, 85.65, 87.18, 86.64, 82.07, 82.74, 81.41, 80.56, 85.37, 82.5, 90.22, 85.4, 89.85, 89.16, 100.18, 93.31, 89.7, 87.76, 101.51, 102.54, 105.36, 97.61] } },
    { t: 'ARKK', chosen: false, anchor: false, score: -6.6, ret6: -9.5, ret1: -3.7, corr: 0.72, reason: 'diverse', series: { '1W': [100, 103.66, 101.44, 98.51, 97.44], '1M': [100, 99.77, 101.84, 105.1, 105.34, 106.69, 105.9, 108.98, 105.83, 104.48, 104.59, 101.98, 103.65, 103.75, 99.93, 98.02, 97.69, 101.27, 99.1, 96.23, 95.19], 'YTD': [100, 104.38, 106.19, 103.71, 95.48, 92.13, 92.94, 94.79, 96.58, 93.67, 89.7, 88.92, 89.6, 103, 99.45, 101.7, 101.68, 96, 105.32, 104.1, 98.35, 99.69, 105.07, 105.99, 99.67, 94.94], '6M': [100, 93.04, 90.64, 87.96, 90.18, 90.42, 91.2, 91.42, 86.34, 84.57, 88.04, 96.93, 99.22, 94.41, 95.82, 97.86, 92.39, 97.54, 97.8, 91.35, 98.21, 95.77, 101.66, 100.41, 94.09, 91.38] } },
    { t: 'IGV', chosen: false, anchor: false, score: -15.5, ret6: -9.7, ret1: -21.3, corr: 0.49, reason: 'diverse', series: { '1W': [100, 98.75, 95.74, 93.68, 94.93], '1M': [100, 98.36, 102.36, 104.32, 105.14, 108.32, 108.59, 110, 109.24, 107.32, 107.24, 107.58, 108.66, 109.02, 108.74, 107.69, 107.9, 106.56, 103.31, 101.08, 102.44], 'YTD': [100, 99.35, 93.02, 92.5, 80.79, 78.75, 76.43, 77.18, 82.99, 80.38, 76.47, 75.48, 72.51, 80.5, 80.61, 83.68, 84.62, 87, 90.53, 94.67, 85.82, 82.62, 85.72, 88.83, 88.66, 83.52], '6M': [100, 90.6, 86.08, 81.94, 79.35, 85.13, 86.68, 86.56, 81.79, 81.01, 80.71, 83.98, 89.81, 86.02, 89.33, 90.52, 93.06, 94.17, 101.41, 92.68, 90.23, 85.78, 94.7, 93.52, 93.92, 89.33] } },
  ],
  'Electrification': [
    { t: 'VOLT', chosen: true, anchor: true, score: 34.1, ret6: 23.8, ret1: 44.4, corr: 0.51, reason: 'anchor', series: { '1W': [100, 102.4, 102.78, 103.5, 103.2], '1M': [100, 102.25, 98.7, 99.76, 102.5, 98.8, 95.84, 96.97, 94.1, 93.83, 95.16, 93.49, 95.08, 94.35, 92.24, 92.27, 91.66, 93.86, 94.2, 94.86, 94.59], 'YTD': [100, 102.86, 108.84, 111.36, 114.4, 121.66, 122.77, 123.46, 117.75, 118.82, 121.24, 120.35, 129.54, 132.76, 136.35, 140.4, 141.23, 131.79, 136.08, 137.53, 136.32, 140.29, 144.82, 134.17, 130.34, 133.66], '6M': [100, 103.14, 108.53, 111.8, 114.3, 109.77, 108.79, 109.64, 111.23, 108.59, 116.43, 119.25, 122.14, 122.65, 130.48, 129.56, 120.9, 126.48, 125.9, 118.71, 127.85, 132.54, 124.23, 123.34, 119.6, 122.61] } },
    { t: 'POW', chosen: true, anchor: false, score: 30.9, ret6: 25.7, ret1: 36.1, corr: 0.1, reason: 'diversifier', series: { '1W': [100, 103.27, 103.99, 104.44, 103.84], '1M': [100, 100.73, 97.19, 100.23, 102.41, 98.81, 95.57, 95.97, 91.37, 91.41, 93.69, 90.32, 92.04, 91.57, 88.2, 89.42, 87.81, 90.68, 91.31, 91.71, 91.18], 'YTD': [100, 103.65, 110.41, 115.14, 117.22, 124.49, 125.55, 130.44, 122.51, 124.03, 126.73, 125.25, 135.19, 142.1, 155.55, 160.79, 163.28, 148.43, 160.63, 156.92, 152.27, 154.23, 157.53, 142.33, 135.68, 140.25], '6M': [100, 101.45, 108.57, 110.75, 115.96, 110.23, 109.47, 112.56, 113.06, 109.94, 118.82, 122.98, 130.08, 136.01, 148.66, 145.67, 132.43, 144.4, 142, 129.93, 140.1, 138.23, 131.16, 128.57, 122.72, 125.12] } },
    { t: 'PBD', chosen: true, anchor: false, score: 14.2, ret6: -0.5, ret1: 28.9, corr: 0.51, reason: 'diversifier', series: { '1W': [100, 98.79, 100.33, 100.33, 99.38], '1M': [100, 98.62, 98.26, 96.47, 98.31, 100.26, 98.77, 97.39, 99.74, 95.6, 95.24, 95.29, 93.3, 94.63, 95.45, 93.15, 92.84, 91.71, 93.15, 93.15, 92.27], 'YTD': [100, 104.54, 108.46, 113.56, 111.13, 113.74, 113.25, 114.18, 107.46, 111.5, 109.89, 111.5, 116.23, 122.08, 126.8, 130.6, 137.56, 126.74, 138.18, 138.06, 125.93, 127.11, 119.53, 115.24, 116.04, 112.18], '6M': [100, 97.08, 99.39, 99.89, 101.16, 101.77, 96.69, 98.9, 98.29, 95.7, 98.68, 107.61, 108.66, 112.41, 115.66, 122.01, 115.83, 123.61, 123.88, 111.42, 111.69, 106.34, 106.51, 102.7, 100.44, 99.49] } },
    { t: 'PBW', chosen: false, anchor: false, score: 12.7, ret6: -8.3, ret1: 33.6, corr: 0.81, reason: 'correlated', series: { '1W': [100, 103.1, 101.87, 100.03, 99.14], '1M': [100, 99.18, 97.54, 100.85, 103.26, 100.9, 96.82, 99.31, 93.44, 92.99, 93.22, 89.99, 92.59, 92.43, 88.49, 88.38, 87.9, 90.63, 89.54, 87.93, 87.15], 'YTD': [100, 109.43, 115.62, 117.22, 113.72, 113, 109.43, 106.12, 104.13, 106.84, 105.53, 103.41, 106.68, 117.22, 121.58, 125.67, 134.51, 124.36, 150.23, 149.71, 131.47, 127.44, 127.73, 116.83, 109.46, 107.81], '6M': [100, 96.34, 99.57, 95.6, 97.88, 90.62, 93.08, 93.65, 92.16, 90.31, 92.99, 99.91, 107.52, 103.69, 113.27, 117.47, 108.61, 128.74, 129.68, 107.66, 114.33, 107.15, 104.6, 100.71, 95.48, 94.15] } },
    { t: 'IVEP', chosen: false, anchor: false, score: 1.7, ret6: 1.7, ret1: 1.7, corr: 0.01, reason: 'diverse', series: { '1W': [100, 100.12, 103.59, 103.24, 103.7], '1M': [100, 100.14, 100.89, 97.72, 98.32, 99.68, 96.29, 95.22, 96.97, 94.58, 95.47, 95.72, 94.19, 95.37, 94.22, 91.59, 91.3, 91.41, 94.58, 94.26, 94.68], 'YTD': [100, 102.76, 104.18, 103.91, 108.89, 106.28, 110.15, 112.07, 110.92, 110.73, 103.83, 108.66, 108.12, 109.31, 104.37, 99.85, 107.01, 110.5, 107.62, 105.02, 103.49, 101.65, 102.87, 101.26, 98.24, 101.75], '6M': [100, 102.76, 104.18, 103.91, 108.89, 106.28, 110.15, 112.07, 110.92, 110.73, 103.83, 108.66, 108.12, 109.31, 104.37, 99.85, 107.01, 110.5, 107.62, 105.02, 103.49, 101.65, 102.87, 101.26, 98.24, 101.75] } },
  ],
  'Industrials': [
    { t: 'PRN', chosen: true, anchor: true, score: 30.4, ret6: 18.5, ret1: 42.2, corr: 0.5, reason: 'anchor', series: { '1W': [100, 103.72, 103.81, 104.23, 103.84], '1M': [100, 102.2, 98.87, 101.28, 103.36, 99.14, 93.23, 94.31, 90.23, 90.04, 91.33, 88.98, 90.79, 90.36, 87.56, 87.61, 87.82, 91.09, 91.17, 91.53, 91.19], 'YTD': [100, 106.03, 113.24, 113.35, 113.68, 117.76, 122.71, 119.01, 113.48, 111.75, 115.58, 114.75, 123.46, 127.8, 130.36, 132.7, 138.82, 130.41, 142.02, 142.67, 140.09, 145.07, 149.34, 132.83, 126.51, 131.74], '6M': [100, 100.15, 105.32, 105.87, 109.63, 104.24, 101.89, 101.2, 103.5, 99.78, 109.05, 111.75, 114.9, 114.04, 123.04, 124.32, 116.78, 126.73, 126.99, 116.78, 128.57, 132.23, 120.62, 118.17, 113.36, 117.98] } },
    { t: 'AIRR', chosen: false, anchor: false, score: 26.6, ret6: 9.9, ret1: 43.4, corr: 0.94, reason: 'correlated', series: { '1W': [100, 102.44, 102.85, 103.31, 102.5], '1M': [100, 101.87, 99.39, 100.84, 102.12, 99.14, 96.5, 97.31, 94.17, 93.93, 94.74, 93.08, 94.5, 94.44, 93.7, 92.83, 92.13, 94.37, 94.75, 95.18, 94.43], 'YTD': [100, 109.44, 115.48, 115.23, 117.4, 122.41, 124.01, 120.21, 115.04, 112.42, 114.18, 115.09, 122.69, 125.23, 126.23, 127.41, 131.55, 124.63, 132.72, 134.05, 131.66, 131.73, 135.53, 126.47, 124.35, 125.32], '6M': [100, 100.13, 106.7, 105.4, 106.82, 104.23, 99.9, 99.13, 99.9, 98.59, 106.04, 107.9, 110.31, 109.98, 116.29, 115.1, 109.05, 115.18, 115.23, 109.26, 115.02, 118.29, 112.05, 110.01, 107.79, 109.65] } },
    { t: 'BILT', chosen: true, anchor: false, score: 11.4, ret6: 8.4, ret1: 14.4, corr: 0, reason: 'diversifier', series: { '1W': [100, 99.53, 99.3, 100.64, 100.8], '1M': [100, 100.44, 101.2, 101.71, 101.31, 100.09, 100.12, 101.8, 101.34, 102.05, 101.3, 101.75, 102.16, 102.3, 101.66, 102.23, 101.84, 101.35, 101.12, 102.49, 102.65], 'YTD': [100, 100.25, 102.35, 104.1, 105.33, 110.12, 111.73, 114.84, 112.04, 112.23, 109.06, 110.88, 114.49, 112.59, 112.72, 114.24, 112.54, 112.43, 113.86, 112.33, 113.2, 107.81, 109.7, 109.87, 110.07, 111.15], '6M': [100, 102.28, 104.57, 109.95, 110.44, 111.82, 109.22, 109.46, 106.2, 107.38, 109.63, 110.49, 108.03, 110.11, 110.49, 109.76, 108.96, 111.19, 109.13, 109.54, 106.37, 106.06, 105.73, 106.98, 107.96, 108.4] } },
    { t: 'IDEF', chosen: true, anchor: false, score: 0.9, ret6: -9.3, ret1: 11.1, corr: 0.5, reason: 'diversifier', series: { '1W': [100, 101.1, 101.68, 103.94, 104.27], '1M': [100, 99.55, 99.52, 100.58, 102.12, 103.05, 106.01, 107.94, 105.46, 103.73, 102.73, 100.93, 101.22, 101.38, 99.97, 99.9, 99.42, 100.51, 101.09, 103.34, 103.66], 'YTD': [100, 112.5, 116.82, 116.26, 113.93, 112.14, 116.74, 116.43, 117.27, 114.61, 108.99, 109.35, 112.18, 113.57, 107.56, 107.6, 107.01, 103.5, 111.72, 106.53, 104.84, 102.28, 103.15, 104.22, 100.98, 104.71], '6M': [100, 97.57, 100.29, 99.18, 101.57, 103, 101.67, 101.24, 95.58, 93.13, 99.36, 99.22, 97.28, 93.24, 94.55, 93.84, 90.76, 95.15, 91.85, 89.26, 93.53, 88.18, 93.9, 90.99, 88.49, 91.82] } },
  ],
  'Meme': [
    { t: 'BUZZ', chosen: true, anchor: true, score: 1.6, ret6: -2.1, ret1: 5.3, corr: 0.07, reason: 'anchor', series: { '1W': [100, 100.89, 104.54, 103.74, 101.54], '1M': [100, 97.95, 96.47, 97.51, 100.16, 101.12, 100.77, 99.43, 100.93, 97.92, 99.7, 99.01, 96.83, 97.26, 96.66, 93.08, 92.15, 92.97, 96.33, 95.59, 93.57], 'YTD': [100, 107.17, 108.62, 107.33, 100.92, 95.94, 94.74, 94.52, 94.88, 96.24, 90.92, 88.55, 92.03, 103.69, 105.29, 105.51, 115.76, 109.7, 120.47, 122.04, 113.51, 115.36, 112.65, 110.46, 108.71, 105.23], '6M': [100, 94.7, 90.2, 87.6, 85.88, 89.03, 89.83, 89.57, 86.39, 77.97, 84.19, 92.24, 96.28, 98.05, 99.57, 107.73, 103.38, 110.43, 116.5, 105.61, 107.13, 102.52, 105.47, 104.35, 97.42, 97.94] } },
    { t: 'RKNG', chosen: true, anchor: false, score: -6.7, ret6: -6.2, ret1: -7.2, corr: 0.01, reason: 'diversifier', series: { '1W': [100, 101.56, 109.84, 109.89, 107.81], '1M': [100, 96.68, 97.59, 94.68, 98.25, 100.82, 95.69, 89.03, 91.31, 86.19, 90.86, 88.75, 84.4, 86.45, 84.15, 77.6, 77.46, 78.66, 85.08, 85.12, 83.51], 'YTD': [100, 95.76, 77.78, 79.73, 80.08, 78.38, 74.83, 77.12, 75.82, 70.91, 75.79, 85.15, 93.98, 96.36, 99.26, 108.25, 97.8, 113.52, 119.27, 103.23, 110.67, 107.39, 106.29, 100.93, 86.19, 92.76], '6M': [100, 90.48, 86.44, 81.79, 80.53, 80.21, 78.75, 81.25, 78.82, 66.56, 76.97, 88.99, 93.37, 97.48, 100.42, 109.51, 98.94, 114.85, 120.66, 104.43, 111.96, 108.64, 107.53, 102.11, 87.2, 93.84] } },
    { t: 'MEME', chosen: true, anchor: false, score: -13.9, ret6: -4.2, ret1: -23.6, corr: 0.07, reason: 'diversifier', series: { '1W': [100, 110.33, 110, 110, 107.14], '1M': [100, 98.92, 94.62, 100.97, 103.66, 97.63, 90.31, 91.71, 85.25, 87.19, 89.34, 83.96, 85.15, 81.59, 73.84, 74.27, 75.35, 83.13, 82.88, 82.88, 80.73], 'YTD': [100, 124.19, 131.94, 126.77, 120.48, 111.61, 107.9, 106.13, 104.35, 111.13, 111.29, 100.16, 116.45, 144.84, 133.23, 142.9, 160.16, 147.26, 190.32, 182.1, 157.74, 157.26, 155.32, 135.65, 110.65, 120.97], '6M': [100, 94.26, 97.2, 88.79, 92.39, 86.65, 87.58, 93.32, 92.12, 82.51, 93.59, 113.89, 118.16, 104.27, 124.43, 132.58, 121.9, 154.07, 148.2, 125.1, 132.98, 122.7, 112.02, 110.81, 92.12, 100.13] } },
  ],
};
// @@END_GENERATED:THEME_UNIVERSE@@

// ── Data ──────────────────────────────────────────────────────────────────────

// @@GENERATED:SAMPLE_DATA@@
export const SAMPLE_DATA: Record<Theme, Equity[]> = {

  // ── AI & ML ─────────────────────
  'AI & ML': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 9, avgWeight: 7.23, proScore: 6.51, coverage: 0.9,
      price: 208.2, weeklyPrices: [203.28, 207.29, 212.06, 208.76, 208.20], weeklyChange: 2.42, dayChange: -0.27, sortRank: 0, periodReturns: { '1M': 4.6, 'YTD': 11.6, '6M': 10.9, '1Y': 19.8 },
      priceHistory: { '1D': [208.76, 208.13, 208.2], '1W': [203.28, 207.29, 212.06, 208.76, 208.2], '1M': [199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 196.93, 204.12, 210.96, 203.53, 211.8, 212.5, 207.4, 202.81, 203.28, 207.29, 212.06, 208.76, 208.2], 'YTD': [186.5, 184.86, 186.23, 188.52, 180.34, 190.05, 189.82, 177.19, 182.65, 183.22, 175.2, 175.75, 183.91, 201.68, 208.27, 198.48, 220.78, 220.61, 214.25, 218.66, 205.19, 200.04, 200.09, 202.78, 207.4, 208.2], '6M': [186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 213.17, 196.5, 220.78, 220.61, 212.6, 214.75, 200.42, 204.65, 195.74, 194.83, 210.96, 202.81, 208.2], '1Y': [173.74, 177.87, 180.77, 182.02, 174.98, 180.17, 167.02, 177.17, 176.24, 177.69, 188.89, 192.57, 181.81, 182.16, 202.89, 188.08, 186.86, 180.64, 177, 182.41, 180.93, 174.14, 190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 214.25, 218.66, 200.42, 204.65, 195.74, 194.83, 210.96, 202.81, 208.2] },
      velocityScore: { '1D': -0.2, '1W': 1.2, '1M': 4.8, '6M': null }, isNew: false,
      marketCap: '$5.0T', pe: 31.9, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.48,
      etfPresence: { AIS: 2.8, ARTY: 4.98, BAI: 4.74, IGPT: 8.5, IVES: 5, ALAI: 13.7, CHAT: 7.67, AIFD: 6.85, SPRX: false, AOTG: 10.84 },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 9, avgWeight: 5.79, proScore: 5.21, coverage: 0.9,
      price: 547.26, weeklyPrices: [503.57, 544.43, 552.33, 539.69, 547.26], weeklyChange: 8.68, dayChange: 1.4, sortRank: 0, periodReturns: { '1M': 5.3, 'YTD': 155.5, '6M': 110.7, '1Y': 237.6 },
      priceHistory: { '1D': [539.69, 547.46, 547.26], '1W': [503.57, 544.43, 552.33, 539.69, 547.26], '1M': [519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 517.41, 557.89, 534.39, 548.13, 529.14, 500.94, 495.76, 503.57, 544.43, 552.33, 539.69, 547.26], 'YTD': [214.16, 203.17, 231.83, 252.03, 242.11, 213.58, 200.15, 200.21, 202.68, 196.58, 205.37, 210.21, 236.64, 278.39, 347.81, 341.54, 448.29, 414.05, 518.09, 523.2, 511.57, 519.85, 580.91, 546.72, 500.94, 547.26], '6M': [251.31, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 452.4, 512.48, 532.57, 517.82, 557.89, 495.76, 547.26], '1Y': [162.12, 176.31, 172.4, 180.95, 163.71, 168.58, 151.14, 155.67, 157.92, 161.27, 169.73, 232.89, 234.56, 234.99, 254.84, 237.7, 247.96, 206.02, 217.53, 217.97, 221.43, 201.06, 214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 518.09, 523.2, 452.4, 512.48, 532.57, 517.82, 557.89, 495.76, 547.26] },
      velocityScore: { '1D': -1, '1W': 1.2, '1M': 7, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 181.2, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { AIS: 5.49, ARTY: 5.32, BAI: 5.42, IGPT: 9.22, IVES: 4.7, ALAI: 1.43, CHAT: 4.13, AIFD: false, SPRX: 0.64, AOTG: 15.74 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 9, avgWeight: 5.75, proScore: 5.18, coverage: 0.9,
      price: 965.74, weeklyPrices: [865.46, 970.82, 959.48, 990.21, 965.74], weeklyChange: 11.59, dayChange: -2.47, sortRank: 0, periodReturns: { '1M': -7.9, 'YTD': 238.4, '6M': 141.6, '1Y': 764.4 },
      priceHistory: { '1D': [990.21, 965.58, 965.74], '1W': [865.46, 970.82, 959.48, 990.21, 965.74], '1M': [1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 948.8, 979.3, 937, 983.12, 904.28, 853.2, 848.95, 865.46, 970.82, 959.48, 990.21, 965.74], 'YTD': [285.41, 345.09, 362.75, 410.24, 419.44, 410.34, 428.17, 412.37, 389.32, 441.8, 395.53, 367.85, 421.51, 455.07, 496.72, 576.45, 766.58, 698.74, 923.52, 996, 981.61, 1051.77, 1154.29, 991.64, 853.2, 965.74], '6M': [389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1213.56, 975.56, 979.3, 848.95, 965.74], '1Y': [111.73, 109.14, 111.87, 125.29, 115.79, 122, 131.37, 150.57, 168.89, 156.83, 183.75, 192.33, 202.53, 206.71, 224.01, 238.33, 236.95, 201.37, 236.48, 237.22, 258.46, 248.55, 284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 996, 891.88, 1043.19, 1213.56, 975.56, 979.3, 848.95, 965.74] },
      velocityScore: { '1D': 2.4, '1W': 5.7, '1M': -8.8, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 21.8, revenueGrowth: 346, eps: 44.26, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { AIS: 7.25, ARTY: 5.05, BAI: 6.57, IGPT: 8.3, IVES: 4.84, ALAI: 1.21, CHAT: 3.79, AIFD: 5.95, SPRX: false, AOTG: 8.83 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.93, proScore: 3.15, coverage: 0.8,
      price: 388.5, weeklyPrices: [378.16, 386.50, 396.81, 392.47, 388.50], weeklyChange: 2.73, dayChange: -1.01, sortRank: 0, periodReturns: { '1M': 1.7, 'YTD': 12.3, '6M': 21.4, '1Y': 34.6 },
      priceHistory: { '1D': [392.47, 388.23, 388.5], '1W': [378.16, 386.5, 396.81, 392.47, 388.5], '1M': [382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 370.78, 388.69, 399.97, 384.05, 389.11, 394.28, 374.45, 370.83, 378.16, 386.5, 396.81, 392.47, 388.5], 'YTD': [346.1, 344.97, 351.71, 332.79, 320.33, 342.76, 332.65, 319.55, 345.75, 324.92, 318.29, 313.49, 354.91, 406.54, 422.76, 416.5, 419.3, 411.07, 426.58, 418.91, 382.07, 380.15, 377.75, 401.11, 374.45, 388.5], '6M': [324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 399.83, 427.36, 419.3, 411.07, 421.86, 479.23, 372.1, 392.9, 378.91, 360.45, 399.97, 370.83, 388.5], '1Y': [288.71, 293.7, 303.76, 311.23, 289.6, 308.65, 334.89, 359.63, 345.35, 336.1, 338.18, 345.02, 354.15, 344.29, 376.47, 355.59, 339.98, 346.82, 402.96, 390.24, 406.37, 329.88, 352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 417.76, 426.58, 418.91, 372.1, 392.9, 378.91, 360.45, 399.97, 370.83, 388.5] },
      velocityScore: { '1D': -0.3, '1W': 2.3, '1M': 12.5, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 65.5, revenueGrowth: 48, eps: 5.93, grossMargin: 76, dividendYield: 0.66,
      etfPresence: { AIS: 0.75, ARTY: 4.83, BAI: 4.75, IGPT: false, IVES: 4.93, ALAI: 4.27, CHAT: 4.9, AIFD: 5.57, SPRX: false, AOTG: 1.48 },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'ANET', name: 'Arista Networks Inc', easyScore: 7, avgWeight: 2.36, proScore: 1.65, coverage: 0.7,
      price: 175.88, weeklyPrices: [169.35, 174.58, 174.87, 176.61, 175.88], weeklyChange: 3.85, dayChange: -0.37, sortRank: 0, periodReturns: { '1M': 8.7, 'YTD': 34.2, '6M': 29, '1Y': 54.2 },
      priceHistory: { '1D': [176.53, 175.23, 175.88], '1W': [169.35, 174.58, 174.87, 176.61, 175.88], '1M': [161.74, 165.45, 157.6, 164.1, 169.88, 166.62, 159.99, 173.28, 166.46, 181.05, 186.96, 181.15, 182.57, 171.92, 168.56, 168.61, 169.35, 174.58, 174.87, 176.61, 175.88], 'YTD': [131.03, 122.89, 129.83, 146.69, 139.39, 140.66, 132.79, 133.5, 137.17, 135.35, 130.8, 124.85, 146.05, 164.23, 176.91, 172.62, 142.54, 141.58, 155.27, 166.01, 163.24, 162.2, 169.88, 184.69, 168.56, 175.88], '6M': [143.72, 138.37, 141.74, 142.58, 128.77, 124.6, 139.62, 133.07, 130.8, 122.78, 145.07, 154.33, 177.73, 165.29, 170.22, 142.54, 141.58, 154.31, 174.37, 151.76, 164.93, 165.45, 159.99, 186.96, 168.61, 175.88], '1Y': [114.04, 123.22, 139.28, 136.48, 132.03, 136.23, 142.85, 153.04, 146.66, 143.06, 144.46, 158.23, 146.01, 152.76, 158.44, 134.02, 130.3, 119.59, 130.68, 128.59, 134.39, 124.62, 131.84, 137.19, 123.42, 127.52, 146.69, 139.39, 143.45, 139.54, 132.89, 134.83, 139.62, 133.07, 130.8, 122.78, 145.07, 154.33, 177.73, 168.68, 147.06, 140.69, 140.49, 155.27, 166.01, 151.76, 164.93, 165.45, 159.99, 186.96, 168.61, 175.88] },
      velocityScore: { '1D': 0, '1W': -0.6, '1M': 23.1, '6M': null }, isNew: false,
      marketCap: '$221B', pe: 60.4, revenueGrowth: 35, eps: 2.91, grossMargin: 64, dividendYield: null,
      etfPresence: { AIS: 1.71, ARTY: 2.76, BAI: 1.55, IGPT: false, IVES: false, ALAI: 0.42, CHAT: 2.4, AIFD: 5.47, SPRX: 2.22, AOTG: false },
      tonyNote: 'Arista Networks Inc appears in 7 of 10 AI & ML ETFs (70% coverage) with average weight 2.4% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'GOOGL', name: 'ALPHABET INC CLASS A', easyScore: 6, avgWeight: 4.85, proScore: 2.91, coverage: 0.6,
      price: 320.02, weeklyPrices: [351.99, 347.15, 342.09, 317.69, 320.02], weeklyChange: -9.08, dayChange: 0.73, sortRank: 0, periodReturns: { '1M': -7.3, 'YTD': 2.2, '6M': -2.4, '1Y': 66.5 },
      priceHistory: { '1D': [317.69, 319.74, 320.02], '1W': [351.99, 347.15, 342.09, 317.69, 320.02], '1M': [345.29, 343.71, 337.39, 353.65, 357.37, 361.21, 359.91, 366.46, 367.03, 361.92, 357.18, 352.51, 359.51, 370.92, 354.46, 346.77, 351.99, 347.15, 342.09, 317.69, 320.02], 'YTD': [313, 328.57, 330, 334.55, 339.71, 310.96, 314.98, 311.76, 306.36, 305.56, 290.44, 297.39, 318.49, 341.68, 344.4, 383.25, 387.35, 387.66, 390.13, 372.19, 359.68, 346.13, 357.37, 358.89, 354.46, 320.02], '6M': [333.26, 343.69, 324.32, 302.02, 310.9, 303.58, 307.04, 310.92, 290.44, 287.56, 317.32, 337.12, 339.32, 349.78, 388.43, 387.35, 387.66, 388.83, 358.99, 356.38, 363.79, 343.71, 359.91, 357.18, 346.77, 320.02], '1Y': [192.17, 191.9, 196.52, 202.94, 199.75, 211.64, 235, 240.37, 252.03, 245.79, 245.69, 241.53, 251.46, 253.08, 281.48, 284.75, 278.57, 289.45, 320.18, 321.27, 312.43, 302.46, 313.51, 316.54, 331.86, 322, 334.55, 339.71, 318.58, 303.33, 312.9, 303.13, 307.04, 310.92, 290.44, 287.56, 317.32, 337.12, 339.32, 349.94, 398.04, 402.62, 388.91, 390.13, 372.19, 356.38, 363.79, 343.71, 359.91, 357.18, 346.77, 320.02] },
      velocityScore: { '1D': -4.6, '1W': -7, '1M': 0.7, '6M': null }, isNew: false,
      marketCap: '$3.9T', pe: 16.1, revenueGrowth: 24, eps: 19.92, grossMargin: 61, dividendYield: 0.26,
      etfPresence: { AIS: false, ARTY: false, BAI: 3.03, IGPT: 7.41, IVES: 4.34, ALAI: false, CHAT: 5.11, AIFD: 5.2, SPRX: false, AOTG: 4.04 },
      tonyNote: 'Alphabet holds a 4.95% average weight across 4 AI ETFs, but the 50% coverage is the constraint — half the theme ignores it. Revenue up 22%, gross margin at 60%, P/E of 29x makes it the cheapest mega-cap in the theme. The 1-year return of 121% shows the market has caught up to the AI value story, but at this valuation the upside case depends on sustained cloud and search margin expansion.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd', easyScore: 6, avgWeight: 4.74, proScore: 2.84, coverage: 0.6,
      price: 412.09, weeklyPrices: [402.30, 424.61, 421.21, 415.58, 412.09], weeklyChange: 2.43, dayChange: -0.82, sortRank: 0, periodReturns: { '1M': -6.5, 'YTD': 35.6, '6M': 23.1, '1Y': 70.6 },
      priceHistory: { '1D': [415.49, 412.3, 412.09], '1W': [402.3, 424.61, 421.21, 415.58, 412.09], '1M': [440.83, 434.99, 432.35, 455.1, 477.57, 444.23, 434.16, 451.79, 432.57, 436.98, 434.11, 421.58, 420.39, 419.48, 409.74, 398.37, 402.3, 424.61, 421.21, 415.58, 412.09], 'YTD': [303.89, 323.63, 342.4, 338.34, 335.75, 374.09, 370.54, 374.58, 348.7, 340.23, 343.25, 341.49, 365.49, 370.5, 402.46, 401.61, 397.28, 392.61, 424.86, 444.92, 423.93, 436.39, 477.57, 436.96, 409.74, 412.09], '6M': [332.71, 341.36, 355.41, 364.2, 385.75, 353.13, 347.09, 345.98, 343.25, 337.95, 365.9, 375.1, 387.44, 392.34, 394.41, 397.28, 392.61, 422.73, 436.69, 408.75, 432.15, 434.99, 434.16, 434.11, 398.37, 412.09], '1Y': [241.6, 241.62, 242.62, 241, 227.33, 238.27, 243.41, 258.91, 268.64, 276.66, 288.11, 299.88, 299.84, 290.73, 303.22, 289.24, 282.2, 277.5, 291.51, 294.72, 304.85, 284.68, 302.84, 322.25, 331.77, 327.16, 338.34, 335.75, 361.91, 362.26, 387.73, 357.44, 347.09, 345.98, 343.25, 337.95, 365.9, 375.1, 387.44, 393.83, 419.5, 399.8, 401.62, 424.86, 444.92, 408.75, 432.15, 434.99, 434.16, 434.11, 398.37, 412.09] },
      velocityScore: { '1D': -0.4, '1W': -0.7, '1M': -2.1, '6M': null }, isNew: false,
      marketCap: '$2.1T', pe: 36.2, revenueGrowth: 36, eps: 11.39, grossMargin: 64, dividendYield: 0.91,
      etfPresence: { AIS: 3.43, ARTY: false, BAI: 4.56, IGPT: false, IVES: 4.86, ALAI: 5.31, CHAT: false, AIFD: 3.29, SPRX: false, AOTG: 7 },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc', easyScore: 6, avgWeight: 4.36, proScore: 2.62, coverage: 0.6,
      price: 604.64, weeklyPrices: [645.85, 643.81, 627.17, 606.10, 604.64], weeklyChange: -6.38, dayChange: -0.24, sortRank: 0, periodReturns: { '1M': 8.4, 'YTD': -8.4, '6M': -8.2, '1Y': -15.4 },
      priceHistory: { '1D': [606.1, 604.49, 604.64], '1W': [645.85, 643.81, 627.17, 606.1, 604.64], '1M': [557.67, 542.87, 550.25, 562.6, 563.29, 612.91, 582.9, 600.29, 615.58, 603.12, 669.21, 656.73, 661.04, 681.31, 664.54, 646.01, 645.85, 643.81, 627.17, 606.1, 604.64], 'YTD': [660.09, 653.06, 620.25, 672.97, 691.7, 668.69, 655.66, 648.18, 647.39, 627.45, 592.92, 579.23, 628.39, 688.55, 675.03, 610.41, 603, 602.61, 635.29, 627.57, 566.98, 562.2, 563.29, 631.48, 664.54, 604.64], '6M': [672.36, 706.41, 677.22, 639.29, 639.3, 655.08, 654.07, 622.66, 592.92, 572.13, 612.42, 671.58, 674.72, 671.34, 604.96, 603, 602.61, 635.26, 622.98, 570.98, 567.58, 542.87, 582.9, 669.21, 646.01, 604.64], '1Y': [714.8, 773.44, 761.83, 782.13, 739.1, 751.11, 752.45, 750.9, 780.25, 748.91, 727.05, 733.51, 712.07, 734, 666.47, 618.94, 609.89, 589.15, 647.95, 673.42, 652.71, 664.45, 663.29, 658.79, 641.97, 604.12, 672.97, 691.7, 670.72, 643.22, 653.69, 667.73, 654.07, 622.66, 592.92, 572.13, 612.42, 671.58, 674.72, 669.12, 612.88, 616.63, 605.06, 635.29, 627.57, 570.98, 567.58, 542.87, 582.9, 669.21, 646.01, 604.64] },
      velocityScore: { '1D': -2.2, '1W': -8.4, '1M': 35.8, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 22, revenueGrowth: 33, eps: 27.52, grossMargin: 82, dividendYield: 0.33,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: 8.9, IVES: 4.44, ALAI: 4.11, CHAT: 2.31, AIFD: false, SPRX: 5.08, AOTG: 1.32 },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 6, avgWeight: 2.82, proScore: 1.69, coverage: 0.6,
      price: 205.13, weeklyPrices: [194.94, 207.96, 210.99, 209.32, 205.13], weeklyChange: 5.23, dayChange: -2, sortRank: 0, periodReturns: { '1M': -25.9, 'YTD': 141.4, '6M': 155.7, '1Y': 177.1 },
      priceHistory: { '1D': [209.32, 205.63, 205.13], '1W': [194.94, 207.96, 210.99, 209.32, 205.13], '1M': [276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 245.29, 249.27, 230.7, 231.71, 235.81, 217.53, 222.44, 206.26, 188.3, 188.68, 194.94, 207.96, 210.99, 209.32, 205.13], 'YTD': [84.98, 83.22, 80.46, 82.93, 75.54, 81.34, 79.48, 81.69, 92.65, 91.58, 92.36, 106.71, 119.93, 139.69, 164.31, 163.66, 164.5, 176.27, 204.83, 316.43, 279.7, 279.04, 297.89, 243.27, 188.3, 205.13], '6M': [81.77, 78.66, 82.35, 79.01, 78.39, 77.51, 93.3, 90.79, 92.36, 99.05, 114.45, 134.6, 157.32, 153.23, 168.75, 164.5, 176.27, 198.7, 301.65, 252.59, 289.54, 281.26, 245.29, 235.81, 188.68, 205.13], '1Y': [74.04, 80.37, 75.85, 79.04, 71.21, 77.23, 63.33, 66.59, 74.23, 83.81, 86.2, 90.68, 88.23, 82.77, 88.57, 93.33, 87.52, 76.68, 89.4, 98.91, 89.43, 84.47, 86.34, 90.23, 82.89, 79.8, 82.93, 75.54, 82.01, 79.09, 80.92, 78.09, 93.3, 90.79, 92.36, 99.05, 114.45, 134.6, 157.32, 156.57, 172.15, 177.95, 186.8, 204.83, 316.43, 252.59, 289.54, 281.26, 245.29, 235.81, 188.68, 205.13] },
      velocityScore: { '1D': -0.6, '1W': 7.6, '1M': -36.7, '6M': null }, isNew: false,
      marketCap: '$184B', pe: 70.5, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.11,
      etfPresence: { AIS: 3.41, ARTY: 3.49, BAI: 1.63, IGPT: false, IVES: false, ALAI: false, CHAT: 1.32, AIFD: 4.44, SPRX: 2.61, AOTG: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'AMZN', name: 'AMAZON.COM INC', easyScore: 5, avgWeight: 3.99, proScore: 1.99, coverage: 0.5,
      price: 233.54, weeklyPrices: [249.99, 247.55, 244.85, 233.66, 233.54], weeklyChange: -6.58, dayChange: -0.05, sortRank: 0, periodReturns: { '1M': -0.3, 'YTD': 1.2, '6M': -2.3, '1Y': 0.6 },
      priceHistory: { '1D': [233.66, 233.43, 233.54], '1W': [249.99, 247.55, 244.85, 233.66, 233.54], '1M': [234.27, 227.01, 232.69, 240.14, 238.34, 241.7, 242.67, 244.16, 245.98, 243.62, 245.34, 247.31, 247.49, 254.96, 249.89, 247.23, 249.99, 247.55, 244.85, 233.66, 233.54], 'YTD': [230.82, 247.38, 239.12, 244.68, 238.62, 204.08, 210.11, 210, 213.49, 211.74, 207.24, 210.57, 233.65, 250.56, 263.99, 272.05, 265.82, 259.34, 274, 253.79, 238.55, 234.11, 238.34, 247.04, 249.89, 233.54], '6M': [238.42, 242.96, 208.72, 201.15, 208.56, 208.73, 214.33, 215.2, 207.24, 208.27, 221.25, 248.5, 255.36, 259.7, 273.55, 265.82, 259.34, 271.85, 250.02, 238, 237.5, 227.01, 242.67, 245.34, 247.23, 233.54], '1Y': [232.23, 234.11, 223.13, 230.98, 221.95, 231.6, 232.33, 229.95, 231.23, 218.15, 222.41, 227.74, 214.47, 221.09, 222.86, 243.04, 237.58, 217.14, 233.22, 229.53, 230.28, 226.76, 232.52, 233.06, 246.47, 231, 244.68, 238.62, 206.96, 204.79, 210.64, 216.82, 214.33, 215.2, 207.24, 208.27, 221.25, 248.5, 255.36, 263.04, 274.99, 270.13, 265.01, 274, 253.79, 238, 237.5, 227.01, 242.67, 245.34, 247.23, 233.54] },
      velocityScore: { '1D': -2, '1W': -2.9, '1M': 26.8, '6M': null }, isNew: false,
      marketCap: '$2.5T', pe: 27.9, revenueGrowth: 17, eps: 8.37, grossMargin: 51, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: false, IGPT: false, IVES: 4.66, ALAI: 4.68, CHAT: 2.54, AIFD: 3.79, SPRX: false, AOTG: 4.28 },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 5, avgWeight: 3.79, proScore: 1.89, coverage: 0.5,
      price: 385.76, weeklyPrices: [402.29, 397.75, 390.34, 381.58, 385.76], weeklyChange: -4.11, dayChange: 1.1, sortRank: 0, periodReturns: { '1M': 5.6, 'YTD': -20.2, '6M': -17.2, '1Y': -24.5 },
      priceHistory: { '1D': [381.58, 385.33, 385.76], '1W': [402.29, 397.75, 390.34, 381.58, 385.76], '1M': [365.46, 352.83, 372.97, 368.57, 373.02, 384.28, 390.49, 386.74, 388.84, 383.34, 385.1, 390.99, 384.93, 395.63, 401.1, 393.82, 402.29, 397.75, 390.34, 381.58, 385.76], 'YTD': [483.62, 479.28, 459.86, 480.58, 411.21, 404.37, 397.23, 392.74, 409.41, 399.95, 372.74, 369.37, 373.07, 422.79, 424.62, 413.62, 407.77, 417.42, 426.99, 428.05, 390.74, 373.94, 373.02, 384.36, 401.1, 385.76], '6M': [470.28, 423.37, 413.6, 396.86, 389, 403.93, 405.76, 399.41, 372.74, 370.17, 374.33, 411.22, 432.92, 429.25, 411.38, 407.77, 417.42, 412.67, 427.34, 397.36, 378.91, 352.83, 390.49, 385.1, 393.82, 385.76], '1Y': [510.88, 533.5, 520.84, 522.48, 504.24, 509.64, 495, 501.01, 508.45, 507.03, 515.74, 522.4, 511.61, 520.56, 525.76, 497.1, 503.29, 478.43, 492.01, 483.16, 483.47, 483.98, 487.71, 472.85, 477.18, 454.52, 480.58, 411.21, 413.27, 399.6, 400.6, 405.2, 405.76, 399.41, 372.74, 370.17, 374.33, 411.22, 432.92, 424.46, 413.96, 405.21, 421.06, 426.99, 428.05, 397.36, 378.91, 352.83, 390.49, 385.1, 393.82, 385.76] },
      velocityScore: { '1D': -1, '1W': -1.6, '1M': 8, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 23, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 0.95,
      etfPresence: { AIS: false, ARTY: 2.66, BAI: false, IGPT: false, IVES: 4.92, ALAI: 5.16, CHAT: 2.45, AIFD: false, SPRX: false, AOTG: 3.75 },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'ALAB', name: 'Astera Labs Inc', easyScore: 5, avgWeight: 3.09, proScore: 1.55, coverage: 0.5,
      price: 317.17, weeklyPrices: [309.09, 319.79, 330.89, 326.97, 317.17], weeklyChange: 2.61, dayChange: -3, sortRank: 0, periodReturns: { '1M': -20.7, 'YTD': 90.6, '6M': 86.9, '1Y': 160.7 },
      priceHistory: { '1D': [326.97, 317.36, 317.17], '1W': [309.09, 319.79, 330.89, 326.97, 317.17], '1M': [399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42, 432.74, 382.89, 393.16, 412.97, 362.05, 361.78, 350.62, 319.74, 303.62, 309.09, 319.79, 330.89, 326.97, 317.17], 'YTD': [166.36, 162.61, 182, 170.93, 158.52, 143.71, 129.68, 118.83, 122.31, 127.48, 121.76, 106.33, 129.46, 174.05, 212.84, 201.25, 204.42, 244.26, 349.17, 358.05, 367.15, 397.02, 483.02, 417.45, 319.74, 317.17], '6M': [163.25, 152.44, 187.67, 123.69, 128.4, 109.8, 116.48, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 183.31, 215.69, 204.42, 244.26, 325.33, 363.54, 330.86, 374.68, 398, 406.42, 412.97, 303.62, 317.17], '1Y': [121.68, 136.73, 170.89, 190.69, 177.53, 189.15, 191.2, 232.9, 251.88, 200.64, 209.6, 225.43, 163.55, 163.64, 169.55, 162.83, 144.47, 139.29, 157.57, 161.23, 173.7, 145.88, 167.26, 167.11, 172.57, 183.75, 170.93, 158.52, 182.86, 129.58, 128.15, 113.77, 116.48, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 224.09, 287.48, 349.17, 358.05, 330.86, 374.68, 398, 406.42, 412.97, 303.62, 317.17] },
      velocityScore: { '1D': 0, '1W': -3.7, '1M': -1.3, '6M': null }, isNew: false,
      marketCap: '$54B', pe: 215.8, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { AIS: 1.88, ARTY: 1.17, BAI: false, IGPT: false, IVES: false, ALAI: 0.88, CHAT: 2.02, AIFD: false, SPRX: 9.52, AOTG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 5, avgWeight: 2.96, proScore: 1.48, coverage: 0.5,
      price: 548.92, weeklyPrices: [487.42, 548.39, 556.67, 558.30, 548.92], weeklyChange: 12.62, dayChange: -1.68, sortRank: 0, periodReturns: { '1M': -14.7, 'YTD': 218.6, '6M': 132.2, '1Y': 695.3 },
      priceHistory: { '1D': [558.3, 549.06, 548.92], '1W': [487.42, 548.39, 556.67, 558.3, 548.92], '1M': [643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 532.1, 550.3, 582.59, 555.55, 563.32, 513.84, 466.81, 477.22, 487.42, 548.39, 556.67, 558.3, 548.92], 'YTD': [172.27, 200.46, 221.51, 252.66, 290.24, 273.74, 285.52, 279.7, 262.06, 286.21, 301.05, 297.73, 337.88, 372.52, 404, 442.36, 488.74, 455.8, 531.18, 575.5, 562.93, 670.75, 638.72, 578.05, 466.81, 548.92], '6M': [240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 390.99, 465.26, 488.74, 455.8, 530.6, 594.11, 490.09, 712.13, 675.39, 539, 582.59, 477.22, 548.92], '1Y': [69.02, 78.69, 74.44, 76.24, 74.66, 82.04, 92.04, 96.15, 105.15, 107.21, 131.26, 119.7, 125.92, 125.72, 138.13, 163.6, 157.16, 140.23, 163.33, 168.89, 187.2, 175.01, 181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 459.62, 531.18, 575.5, 490.09, 712.13, 675.39, 539, 582.59, 477.22, 548.92] },
      velocityScore: { '1D': 1.4, '1W': 46.5, '1M': 5.7, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 32.9, revenueGrowth: 46, eps: 16.69, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { AIS: 1.4, ARTY: 2.79, BAI: 3.23, IGPT: 3.07, IVES: false, ALAI: 4.29, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'LITE', name: 'LUMENTUM HOLDINGS INC', easyScore: 5, avgWeight: 2.83, proScore: 1.42, coverage: 0.5,
      price: 826.6, weeklyPrices: [765.55, 837.56, 829.70, 833.64, 826.60], weeklyChange: 7.97, dayChange: -0.84, sortRank: 0, periodReturns: { '1M': -1.9, 'YTD': 124.3, '6M': 143.7, '1Y': 703.7 },
      priceHistory: { '1D': [833.64, 827.28, 826.6], '1W': [765.55, 837.56, 829.7, 833.64, 826.6], '1M': [842.53, 861.97, 816.98, 851.4, 858.06, 801.16, 728.32, 731.25, 698.91, 707.1, 802.01, 768.15, 814.8, 752, 706.23, 732.82, 765.55, 837.56, 829.7, 833.64, 826.6], 'YTD': [368.59, 351.42, 324.25, 370.66, 435.1, 574.11, 667.77, 700.91, 640.69, 624.84, 801.99, 764.65, 894.13, 894.07, 881.64, 976.18, 992.37, 890.09, 860.62, 945.08, 921.56, 827.92, 858.06, 785.77, 706.23, 826.6], '6M': [332.45, 423.42, 577.15, 600.42, 688.27, 694.43, 672, 649.56, 801.99, 702.76, 896.02, 824.01, 873.6, 791.37, 994.56, 992.37, 890.09, 902.31, 938, 853.26, 869.98, 861.97, 728.32, 802.01, 732.82, 826.6], '1Y': [102.85, 110.08, 111.13, 114.62, 117.43, 135.55, 149.46, 164.88, 171.5, 159.11, 169.75, 159.76, 163.23, 168.5, 200.13, 239.68, 226.86, 233.24, 325.16, 331.41, 372.09, 337.13, 390.77, 357.05, 339.87, 356.83, 370.66, 435.1, 561.13, 594.26, 723.39, 680.8, 672, 649.56, 801.99, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 1030.37, 868.07, 860.62, 945.08, 853.26, 869.98, 861.97, 728.32, 802.01, 732.82, 826.6] },
      velocityScore: { '1D': 0.7, '1W': 16.4, '1M': 6, '6M': null }, isNew: false,
      marketCap: '$64B', pe: 145.8, revenueGrowth: 90, eps: 5.67, grossMargin: 41, dividendYield: null,
      etfPresence: { AIS: false, ARTY: false, BAI: 2.81, IGPT: false, IVES: false, ALAI: 1.44, CHAT: 1.68, AIFD: 4.43, SPRX: 3.8, AOTG: false },
      tonyNote: 'LUMENTUM HOLDINGS INC appears in 5 of 10 AI & ML ETFs (50% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'INTC', name: 'Intel Corp', easyScore: 5, avgWeight: 2.22, proScore: 1.11, coverage: 0.5,
      price: 101.15, weeklyPrices: [97.06, 105.45, 102.62, 100.23, 101.15], weeklyChange: 4.21, dayChange: 0.92, sortRank: 0, periodReturns: { '1M': -23.2, 'YTD': 174.1, '6M': 124.4, '1Y': 347 },
      priceHistory: { '1D': [100.23, 101.25, 101.15], '1W': [97.06, 105.45, 102.62, 100.23, 101.15], '1M': [131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.2, 110.39, 110.24, 109.84, 103.12, 107.76, 102.99, 96.98, 95.04, 97.06, 105.45, 102.62, 100.23, 101.15], 'YTD': [36.9, 45.55, 46.96, 43.93, 49.25, 48.29, 44.11, 45.61, 45.58, 45.76, 44.06, 48.03, 61.72, 68.5, 82.54, 95.78, 120.61, 110.8, 120.89, 111.78, 124.57, 132.28, 139.63, 112.54, 96.98, 101.15], '6M': [42.49, 48.81, 50.24, 46.18, 46.12, 43.1, 46.78, 44.06, 44.06, 44.13, 58.95, 64.94, 65.27, 84.52, 108.15, 120.61, 110.8, 121.77, 112.71, 107.04, 121.1, 132.87, 120.35, 109.84, 95.04, 101.15], '1Y': [22.63, 19.8, 19.77, 23.86, 23.5, 24.93, 24.49, 24.61, 30.57, 33.99, 37.3, 37.8, 36.84, 38.16, 40.16, 37.24, 35.91, 33.62, 40.56, 41.41, 39.51, 36.28, 36.2, 39.37, 44.06, 48.56, 43.93, 49.25, 47.13, 45.46, 46.88, 45.58, 46.78, 44.06, 44.06, 44.13, 58.95, 64.94, 65.27, 94.75, 113.01, 120.29, 118.96, 120.89, 111.78, 107.04, 121.1, 132.87, 120.35, 109.84, 95.04, 101.15] },
      velocityScore: { '1D': 0, '1W': null, '1M': -12.6, '6M': null }, isNew: false,
      marketCap: '$508B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { AIS: 3.05, ARTY: false, BAI: 2.7, IGPT: 4.02, IVES: false, ALAI: 0.39, CHAT: 0.96, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'CRDO', name: 'Credo Technology Group Holding Ltd', easyScore: 5, avgWeight: 1.89, proScore: 0.94, coverage: 0.5,
      price: 230.86, weeklyPrices: [212.07, 223.87, 228.27, 236.50, 230.86], weeklyChange: 8.86, dayChange: -2.39, sortRank: 0, periodReturns: { '1M': -14.2, 'YTD': 60.4, '6M': 73.4, '1Y': 128.2 },
      priceHistory: { '1D': [236.5, 230.25, 230.86], '1W': [212.07, 223.87, 228.27, 236.5, 230.86], '1M': [268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 265.55, 246.4, 258.69, 257.79, 236.88, 236.18, 226.74, 207.97, 202.68, 212.07, 223.87, 228.27, 236.5, 230.86], 'YTD': [143.89, 150.42, 150.97, 129.57, 111.31, 128.4, 124.06, 112.27, 115.98, 116.88, 100.3, 95.92, 107.93, 160.69, 195.04, 180.06, 198.57, 168.99, 222.35, 217.5, 250.81, 272.01, 271.95, 265.65, 207.97, 230.86], '6M': [128.02, 119.96, 123.41, 124.8, 120.83, 97.3, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 165.92, 193.57, 198.57, 168.99, 221.23, 214.6, 237.68, 249.33, 268.03, 241.91, 257.79, 202.68, 230.86], '1Y': [101.17, 111.55, 119.78, 117.33, 110.86, 131.82, 140.82, 159.32, 172.31, 144.94, 149.63, 151.15, 136.53, 150.97, 166.62, 162.74, 142.95, 134.73, 177.6, 176.04, 154.47, 138.57, 144.83, 140.24, 156.07, 153.22, 129.57, 111.31, 134.72, 127.91, 123.46, 102.54, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 182.98, 222.35, 217.5, 237.68, 249.33, 268.03, 241.91, 257.79, 202.68, 230.86] },
      velocityScore: { '1D': 2.2, '1W': 2.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$43B', pe: 92, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { AIS: 1.1, ARTY: 1.23, BAI: 2.14, IGPT: false, IVES: false, ALAI: false, CHAT: 1.92, AIFD: false, SPRX: 3.04, AOTG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'VRT', name: 'Vertiv Holdings Co', easyScore: 4, avgWeight: 3.04, proScore: 1.22, coverage: 0.4,
      price: 300.3, weeklyPrices: [291.67, 304.50, 301.16, 304.04, 300.30], weeklyChange: 2.96, dayChange: -1.25, sortRank: 0, periodReturns: { '1M': -5.1, 'YTD': 85.4, '6M': 64.6, '1Y': 129.5 },
      priceHistory: { '1D': [304.1, 299.91, 300.3], '1W': [291.67, 304.5, 301.16, 304.04, 300.3], '1M': [316.43, 325.57, 303.95, 306.97, 334.82, 311.42, 300.53, 318.47, 305.58, 317.81, 318.86, 305.87, 303.58, 304.57, 294.11, 289.56, 291.67, 304.5, 301.16, 304.04, 300.3], 'YTD': [162.01, 163.58, 176.93, 189.21, 190.15, 248.51, 243.75, 254.89, 264.35, 264.74, 270.89, 259.37, 287.64, 307.34, 323.46, 330.97, 367.13, 322.63, 314.18, 323.92, 302.87, 318.32, 334.82, 323.92, 294.11, 300.3], '6M': [181.23, 190.01, 202, 243.53, 253.15, 244.44, 270.06, 268.41, 270.89, 250.58, 281.03, 301.16, 305.14, 305.03, 341.02, 367.13, 322.63, 319.78, 331.44, 280.98, 317.58, 325.57, 300.53, 318.86, 289.56, 300.3], '1Y': [130.87, 145.6, 139.39, 132.52, 126.58, 134.23, 124, 135.71, 141.96, 139.77, 161.64, 168.88, 177.82, 183.2, 193.76, 183.02, 163.64, 159.61, 179.73, 189.02, 178.66, 154.39, 167.58, 173.95, 170.03, 175.18, 189.21, 190.15, 199.62, 243.21, 262.19, 251.28, 270.06, 268.41, 270.89, 250.58, 281.03, 301.16, 305.14, 306.18, 358.92, 369.99, 315.67, 314.18, 323.92, 280.98, 317.58, 325.57, 300.53, 318.86, 289.56, 300.3] },
      velocityScore: { '1D': 0.8, '1W': -0.8, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$115B', pe: 75.5, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { AIS: 3.88, ARTY: false, BAI: 1.96, IGPT: false, IVES: false, ALAI: false, CHAT: 2.26, AIFD: 4.06, SPRX: false, AOTG: false },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 4, avgWeight: 2.77, proScore: 1.11, coverage: 0.4,
      price: 899.96, weeklyPrices: [802.45, 891.83, 908.10, 913.36, 899.96], weeklyChange: 12.15, dayChange: -1.47, sortRank: 0, periodReturns: { '1M': -9.4, 'YTD': 226.8, '6M': 160, '1Y': 489.2 },
      priceHistory: { '1D': [913.36, 901.96, 899.96], '1W': [802.45, 891.83, 908.1, 913.36, 899.96], '1M': [993.25, 1025.36, 899.9, 968.53, 965, 915.19, 820.16, 868.26, 827.64, 860.02, 910.34, 860.66, 878.31, 828.3, 745.49, 787.66, 802.45, 891.83, 908.1, 913.36, 899.96], 'YTD': [275.39, 304.01, 326.23, 371.76, 444.45, 407.25, 411.11, 407.84, 374.33, 398.78, 424.96, 423.12, 500.77, 547.75, 586.25, 738.54, 808.8, 733.35, 880.72, 925.99, 931.04, 1038.59, 965, 890.09, 745.49, 899.96], '6M': [358.29, 432.95, 425, 415.94, 396.02, 357.62, 384.29, 421.09, 424.96, 391.76, 496.3, 519.6, 579.88, 579.03, 771.01, 808.8, 733.35, 870.66, 940.69, 815.99, 1066.07, 1025.36, 820.16, 910.34, 787.66, 899.96], '1Y': [152.73, 157.01, 148.1, 155.73, 154.6, 172.38, 188.16, 196.81, 216.64, 219.85, 254.74, 221.7, 226.03, 226.41, 268.34, 278.47, 262.56, 240.5, 276.69, 278.79, 307.85, 292, 286.22, 289.83, 321.48, 325.99, 371.76, 444.45, 396.23, 424.14, 421.85, 375.01, 384.29, 421.09, 424.96, 391.76, 496.3, 519.6, 579.88, 643.3, 786.42, 817.35, 751.07, 880.72, 925.99, 815.99, 1066.07, 1025.36, 820.16, 910.34, 787.66, 899.96] },
      velocityScore: { '1D': 4.7, '1W': 22, '1M': -4.3, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 85.7, revenueGrowth: 44, eps: 10.5, grossMargin: 42, dividendYield: 0.32,
      etfPresence: { AIS: 2.58, ARTY: 2.9, BAI: false, IGPT: 3.27, IVES: false, ALAI: 2.32, CHAT: false, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks Inc', easyScore: 4, avgWeight: 2.68, proScore: 1.07, coverage: 0.4,
      price: 327.26, weeklyPrices: [348.66, 342.15, 335.28, 325.63, 327.26], weeklyChange: -6.14, dayChange: 0.5, sortRank: 0, periodReturns: { '1M': 14.7, 'YTD': 77.7, '6M': 81.6, '1Y': 62.7 },
      priceHistory: { '1D': [325.63, 328.97, 327.26], '1W': [348.66, 342.15, 335.28, 325.63, 327.26], '1M': [285.26, 293.09, 304.2, 332, 341.02, 352.04, 348.06, 357.53, 337.04, 320.59, 325.91, 330.3, 352.89, 354.02, 353.99, 358.68, 348.66, 342.15, 335.28, 325.63, 327.26], 'YTD': [184.2, 189.02, 187.66, 183.5, 166.24, 165.3, 148.7, 148.92, 165.1, 167.45, 157.21, 160.67, 166.99, 167.85, 178.54, 184.56, 215.6, 240.13, 257.77, 279.25, 279.62, 290.92, 341.02, 338.31, 353.99, 327.26], '6M': [184.22, 175.42, 166, 163.5, 141.67, 156.09, 165.58, 169.19, 157.21, 160.32, 173.78, 164.11, 181.2, 180.99, 183.98, 215.6, 240.13, 248.47, 280.43, 263.22, 282.13, 293.09, 348.06, 325.91, 358.68, 327.26], '1Y': [201.16, 173.6, 168.1, 173.55, 183.32, 191.02, 194.46, 198.33, 205.68, 202.21, 209.3, 215.17, 205.51, 215.02, 218.27, 211.37, 204.77, 185.07, 190.13, 198.84, 190.36, 185.88, 188.45, 182.12, 188.88, 184.06, 183.5, 166.24, 165.51, 152.35, 144.84, 158.56, 165.58, 169.19, 157.21, 160.32, 173.78, 164.11, 181.2, 181.54, 183.68, 227.79, 246.66, 257.77, 279.25, 263.22, 282.13, 293.09, 348.06, 325.91, 358.68, 327.26] },
      velocityScore: { '1D': -0.9, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$267B', pe: 287.1, revenueGrowth: 31, eps: 1.14, grossMargin: 72, dividendYield: null,
      etfPresence: { AIS: 0.51, ARTY: false, BAI: false, IGPT: false, IVES: 3.44, ALAI: 0.09, CHAT: false, AIFD: 6.69, SPRX: false, AOTG: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'CRWV', name: 'COREWEAVE INC CLASS A', easyScore: 4, avgWeight: 2.44, proScore: 0.98, coverage: 0.4,
      price: 78.88, weeklyPrices: [73.06, 79.58, 82.64, 81.10, 78.88], weeklyChange: 7.97, dayChange: -2.74, sortRank: 0, periodReturns: { '1M': -21.8, 'YTD': 10.2, '6M': -15.2, '1Y': -34.3 },
      priceHistory: { '1D': [81.1, 78.85, 78.88], '1W': [73.06, 79.58, 82.64, 81.1, 78.88], '1M': [100.88, 98.76, 96.58, 95.51, 99.54, 85.68, 81.75, 86.46, 83.53, 90, 88.88, 83.31, 79.94, 77.12, 72.91, 73.21, 73.06, 79.58, 82.64, 81.1, 78.88], 'YTD': [71.61, 80.14, 101.23, 108.86, 90.06, 95.15, 89.25, 79.56, 74.41, 85.86, 83.02, 78.44, 92, 116.85, 110.14, 125.43, 107.75, 99.81, 106.86, 108.03, 100.55, 105.72, 99.54, 89.7, 72.91, 78.88], '6M': [98.31, 88.94, 96.79, 91, 99.3, 73.78, 74.92, 82.12, 83.02, 77.47, 88.9, 118.69, 122.54, 105.53, 127.89, 107.75, 99.81, 104.27, 110.93, 95.61, 115.21, 98.76, 81.75, 88.88, 73.21, 78.88], '1Y': [120, 114.13, 121.08, 99.5, 90.79, 102.79, 89.09, 112.69, 121.39, 126.66, 138, 143.08, 141.74, 123.34, 131.06, 106.93, 78.34, 69.21, 73.12, 88.3, 87.38, 67.68, 76.42, 76.86, 89.93, 95.22, 108.86, 90.06, 95.11, 95.45, 98.01, 79.5, 74.92, 82.12, 83.02, 77.47, 88.9, 118.69, 122.54, 114.19, 137.98, 111.31, 101.28, 106.86, 108.03, 95.61, 115.21, 98.76, 81.75, 88.88, 73.21, 78.88] },
      velocityScore: { '1D': -1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$43B', pe: null, revenueGrowth: 112, eps: -2.72, grossMargin: 69, dividendYield: null,
      etfPresence: { AIS: false, ARTY: 3.81, BAI: 1.12, IGPT: false, IVES: 2.1, ALAI: false, CHAT: 2.74, AIFD: false, SPRX: false, AOTG: false },
      tonyNote: 'COREWEAVE INC CLASS A appears in 4 of 10 AI & ML ETFs (40% coverage) with average weight 2.4% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Semiconductors ─────────────────────
  'Semiconductors': [
    {
      ticker: 'MU', name: 'MICRON TECHNOLOGY INC', easyScore: 4, avgWeight: 4.95, proScore: 4.95, coverage: 1,
      price: 965.74, weeklyPrices: [865.46, 970.82, 959.48, 990.21, 965.74], weeklyChange: 11.59, dayChange: -2.47, sortRank: 0, periodReturns: { '1M': -7.9, 'YTD': 238.4, '6M': 141.6, '1Y': 764.4 },
      priceHistory: { '1D': [990.21, 965.58, 965.74], '1W': [865.46, 970.82, 959.48, 990.21, 965.74], '1M': [1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 948.8, 979.3, 937, 983.12, 904.28, 853.2, 848.95, 865.46, 970.82, 959.48, 990.21, 965.74], 'YTD': [285.41, 345.09, 362.75, 410.24, 419.44, 410.34, 428.17, 412.37, 389.32, 441.8, 395.53, 367.85, 421.51, 455.07, 496.72, 576.45, 766.58, 698.74, 923.52, 996, 981.61, 1051.77, 1154.29, 991.64, 853.2, 965.74], '6M': [389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1213.56, 975.56, 979.3, 848.95, 965.74], '1Y': [111.73, 109.14, 111.87, 125.29, 115.79, 122, 131.37, 150.57, 168.89, 156.83, 183.75, 192.33, 202.53, 206.71, 224.01, 238.33, 236.95, 201.37, 236.48, 237.22, 258.46, 248.55, 284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 996, 891.88, 1043.19, 1213.56, 975.56, 979.3, 848.95, 965.74] },
      velocityScore: { '1D': 3.3, '1W': 5.3, '1M': -7.1, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 21.8, revenueGrowth: 346, eps: 44.26, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { SOXX: 8.52, PSI: 5.85, XSD: 2.79, DRAM: 2.63 },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AMD', name: 'ADVANCED MICRO DEVICES INC', easyScore: 3, avgWeight: 5.8, proScore: 4.35, coverage: 0.75,
      price: 547.26, weeklyPrices: [503.57, 544.43, 552.33, 539.69, 547.26], weeklyChange: 8.68, dayChange: 1.4, sortRank: 0, periodReturns: { '1M': 5.3, 'YTD': 155.5, '6M': 110.7, '1Y': 237.6 },
      priceHistory: { '1D': [539.69, 547.46, 547.26], '1W': [503.57, 544.43, 552.33, 539.69, 547.26], '1M': [519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 517.41, 557.89, 534.39, 548.13, 529.14, 500.94, 495.76, 503.57, 544.43, 552.33, 539.69, 547.26], 'YTD': [214.16, 203.17, 231.83, 252.03, 242.11, 213.58, 200.15, 200.21, 202.68, 196.58, 205.37, 210.21, 236.64, 278.39, 347.81, 341.54, 448.29, 414.05, 518.09, 523.2, 511.57, 519.85, 580.91, 546.72, 500.94, 547.26], '6M': [251.31, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 452.4, 512.48, 532.57, 517.82, 557.89, 495.76, 547.26], '1Y': [162.12, 176.31, 172.4, 180.95, 163.71, 168.58, 151.14, 155.67, 157.92, 161.27, 169.73, 232.89, 234.56, 234.99, 254.84, 237.7, 247.96, 206.02, 217.53, 217.97, 221.43, 201.06, 214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 518.09, 523.2, 452.4, 512.48, 532.57, 517.82, 557.89, 495.76, 547.26] },
      velocityScore: { '1D': -1.6, '1W': 3.1, '1M': 15.1, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 181.2, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { SOXX: 8.74, PSI: 5.67, XSD: 3, DRAM: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'NVDA', name: 'NVIDIA CORP', easyScore: 3, avgWeight: 5.34, proScore: 4, coverage: 0.75,
      price: 208.2, weeklyPrices: [203.28, 207.29, 212.06, 208.76, 208.20], weeklyChange: 2.42, dayChange: -0.27, sortRank: 0, periodReturns: { '1M': 4.6, 'YTD': 11.6, '6M': 10.9, '1Y': 19.8 },
      priceHistory: { '1D': [208.76, 208.13, 208.2], '1W': [203.28, 207.29, 212.06, 208.76, 208.2], '1M': [199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 196.93, 204.12, 210.96, 203.53, 211.8, 212.5, 207.4, 202.81, 203.28, 207.29, 212.06, 208.76, 208.2], 'YTD': [186.5, 184.86, 186.23, 188.52, 180.34, 190.05, 189.82, 177.19, 182.65, 183.22, 175.2, 175.75, 183.91, 201.68, 208.27, 198.48, 220.78, 220.61, 214.25, 218.66, 205.19, 200.04, 200.09, 202.78, 207.4, 208.2], '6M': [186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 213.17, 196.5, 220.78, 220.61, 212.6, 214.75, 200.42, 204.65, 195.74, 194.83, 210.96, 202.81, 208.2], '1Y': [173.74, 177.87, 180.77, 182.02, 174.98, 180.17, 167.02, 177.17, 176.24, 177.69, 188.89, 192.57, 181.81, 182.16, 202.89, 188.08, 186.86, 180.64, 177, 182.41, 180.93, 174.14, 190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 214.25, 218.66, 200.42, 204.65, 195.74, 194.83, 210.96, 202.81, 208.2] },
      velocityScore: { '1D': -1, '1W': -3.6, '1M': 15.6, '6M': null }, isNew: false,
      marketCap: '$5.0T', pe: 31.9, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.48,
      etfPresence: { SOXX: 8.26, PSI: 5.15, XSD: 2.61, DRAM: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'INTC', name: 'INTEL CORPORATION', easyScore: 3, avgWeight: 3.98, proScore: 2.98, coverage: 0.75,
      price: 101.15, weeklyPrices: [97.06, 105.45, 102.62, 100.23, 101.15], weeklyChange: 4.21, dayChange: 0.92, sortRank: 0, periodReturns: { '1M': -23.2, 'YTD': 174.1, '6M': 124.4, '1Y': 347 },
      priceHistory: { '1D': [100.23, 101.25, 101.15], '1W': [97.06, 105.45, 102.62, 100.23, 101.15], '1M': [131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.2, 110.39, 110.24, 109.84, 103.12, 107.76, 102.99, 96.98, 95.04, 97.06, 105.45, 102.62, 100.23, 101.15], 'YTD': [36.9, 45.55, 46.96, 43.93, 49.25, 48.29, 44.11, 45.61, 45.58, 45.76, 44.06, 48.03, 61.72, 68.5, 82.54, 95.78, 120.61, 110.8, 120.89, 111.78, 124.57, 132.28, 139.63, 112.54, 96.98, 101.15], '6M': [42.49, 48.81, 50.24, 46.18, 46.12, 43.1, 46.78, 44.06, 44.06, 44.13, 58.95, 64.94, 65.27, 84.52, 108.15, 120.61, 110.8, 121.77, 112.71, 107.04, 121.1, 132.87, 120.35, 109.84, 95.04, 101.15], '1Y': [22.63, 19.8, 19.77, 23.86, 23.5, 24.93, 24.49, 24.61, 30.57, 33.99, 37.3, 37.8, 36.84, 38.16, 40.16, 37.24, 35.91, 33.62, 40.56, 41.41, 39.51, 36.28, 36.2, 39.37, 44.06, 48.56, 43.93, 49.25, 47.13, 45.46, 46.88, 45.58, 46.78, 44.06, 44.06, 44.13, 58.95, 64.94, 65.27, 94.75, 113.01, 120.29, 118.96, 120.89, 111.78, 107.04, 121.1, 132.87, 120.35, 109.84, 95.04, 101.15] },
      velocityScore: { '1D': -1.7, '1W': -1, '1M': -15.8, '6M': null }, isNew: false,
      marketCap: '$508B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { SOXX: 5.28, PSI: 4.3, XSD: 2.35, DRAM: false },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'ADI', name: 'ANALOG DEVICES INC', easyScore: 3, avgWeight: 3.68, proScore: 2.76, coverage: 0.75,
      price: 376.88, weeklyPrices: [372.46, 382.81, 386.73, 380.20, 376.88], weeklyChange: 1.19, dayChange: -0.87, sortRank: 0, periodReturns: { '1M': -8.8, 'YTD': 39, '6M': 23.3, '1Y': 66.5 },
      priceHistory: { '1D': [380.2, 379.57, 376.88], '1W': [372.46, 382.81, 386.73, 380.2, 376.88], '1M': [413.16, 417.93, 386.91, 391.78, 397.17, 388.98, 377.16, 388.83, 379.03, 385.4, 395.65, 386.01, 392.75, 390.96, 380.53, 375.36, 372.46, 382.81, 386.73, 380.2, 376.88], 'YTD': [271.2, 300.93, 300.25, 303.83, 311.29, 337, 355.03, 355.79, 319.71, 310.92, 321.83, 320.58, 351.36, 371.45, 399.57, 397.02, 419.65, 414.31, 419.01, 428.76, 417.79, 407.26, 397.17, 393.64, 380.53, 376.88], '6M': [304.01, 316.86, 322.97, 337.51, 356.09, 338.99, 318.81, 313.66, 321.83, 318.14, 346.21, 347.94, 381.42, 383.26, 404.77, 419.65, 414.31, 416.88, 437.67, 392.67, 414.45, 417.93, 377.16, 395.65, 375.36, 376.88], '1Y': [226.37, 224.63, 223.12, 236.21, 246.95, 254.25, 247.07, 248.24, 249.05, 247.53, 241.67, 237.88, 241.61, 243.29, 232.9, 232.88, 237.53, 225.2, 265.34, 281.29, 283.39, 274.92, 276.84, 277.29, 293.86, 295.67, 303.83, 311.29, 325.16, 346.37, 360.8, 341.51, 318.81, 313.66, 321.83, 318.14, 346.21, 347.94, 381.42, 389.31, 415.63, 432.39, 398.05, 419.01, 428.76, 392.67, 414.45, 417.93, 377.16, 395.65, 375.36, 376.88] },
      velocityScore: { '1D': -1.1, '1W': -4.5, '1M': 3.8, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 56, revenueGrowth: 37, eps: 6.73, grossMargin: 64, dividendYield: 1.16,
      etfPresence: { SOXX: 3.84, PSI: 4.79, XSD: 2.42, DRAM: false },
      tonyNote: 'ANALOG DEVICES INC appears in 3 of 4 Semiconductors ETFs (75% coverage) with average weight 3.7% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMAT', name: 'APPLIED MATERIAL INC', easyScore: 2, avgWeight: 5.88, proScore: 2.94, coverage: 0.5,
      price: 556.58, weeklyPrices: [525.70, 564.55, 553.92, 562.80, 556.58], weeklyChange: 5.87, dayChange: -1.11, sortRank: 0, periodReturns: { '1M': -5.5, 'YTD': 116.6, '6M': 72.6, '1Y': 195.9 },
      priceHistory: { '1D': [562.8, 557.62, 556.58], '1W': [525.7, 564.55, 553.92, 562.8, 556.58], '1M': [588.97, 668, 626.84, 694.64, 723, 650.91, 603.04, 592.79, 554.5, 570.5, 602.5, 575.39, 595.7, 579.43, 560.93, 529.66, 525.7, 564.55, 553.92, 562.8, 556.58], 'YTD': [256.99, 301.18, 327.01, 332.71, 318.67, 339.88, 375.38, 372.3, 338.94, 346.18, 373.99, 353.8, 397.81, 396.94, 417.04, 391.38, 431.2, 406.91, 449.68, 501.7, 567.25, 585.88, 723, 588.66, 560.93, 556.58], '6M': [319.46, 328.4, 330.57, 359.13, 377.93, 351.32, 345.88, 352.46, 373.99, 341.79, 385.72, 394.26, 403.48, 381.11, 410.82, 431.2, 406.91, 448.25, 500.77, 497.01, 592.92, 668, 603.04, 602.5, 529.66, 556.58], '1Y': [188.12, 180.06, 183.15, 188.24, 159.84, 165.27, 162.75, 170.15, 189.76, 199.6, 223.59, 220.3, 227.72, 228.47, 232.55, 233.53, 223.23, 220.23, 252.25, 268, 270.11, 253.5, 261.9, 284.32, 307.24, 318.23, 332.71, 318.67, 329.07, 369.3, 394.95, 357.76, 345.88, 352.46, 373.99, 341.79, 385.72, 394.26, 403.48, 382.59, 428.62, 436.61, 426.85, 449.68, 501.7, 497.01, 592.92, 668, 603.04, 602.5, 529.66, 556.58] },
      velocityScore: { '1D': 2.1, '1W': -4.5, '1M': 6.1, '6M': null }, isNew: false,
      marketCap: '$442B', pe: 52.3, revenueGrowth: 11, eps: 10.64, grossMargin: 49, dividendYield: 0.38,
      etfPresence: { SOXX: 5.22, PSI: 6.55, XSD: false, DRAM: false },
      tonyNote: 'Applied Materials appears in 2 Semiconductor ETFs at 4.2% average weight. Revenue grew alongside the broader wafer fab equipment cycle, 47% gross margin. The weight score at 3.35% ranks it mid-tier within the theme — ETF managers treat AMAT as a cycle play rather than an AI-specific holding.',
    },
    {
      ticker: 'KLAC', name: 'KLA CORP', easyScore: 2, avgWeight: 5.26, proScore: 2.63, coverage: 0.5,
      price: 218.65, weeklyPrices: [207.60, 217.56, 214.69, 218.73, 218.65], weeklyChange: 5.32, dayChange: -0.04, sortRank: 0, periodReturns: { '1M': -9.1, 'YTD': 79.9, '6M': 44.5, '1Y': 141.8 },
      priceHistory: { '1D': [218.73, 218.68, 218.65], '1W': [207.6, 217.56, 214.69, 218.73, 218.65], '1M': [240.48, 258.8, 248.64, 278.39, 301.71, 266.19, 235.55, 233.31, 216.47, 221.18, 231.52, 222.25, 230.37, 224.5, 219.37, 212.75, 207.6, 217.56, 214.69, 218.73, 218.65], 'YTD': [121.51, 140, 156.78, 161.63, 135.55, 147.95, 149.6, 152.46, 142.91, 143.82, 156.62, 151.98, 172.73, 179.14, 193.5, 171.33, 181.13, 174.06, 192.76, 213.11, 254.54, 244.49, 301.71, 229.52, 219.37, 218.65], '6M': [154.3, 141.04, 144.02, 147.02, 150.66, 144.13, 145.29, 148.13, 156.62, 147.24, 167.23, 174.81, 181.21, 180.9, 173.29, 181.13, 174.06, 195.72, 212.51, 213.56, 238.73, 258.8, 235.55, 231.52, 212.75, 218.65], '1Y': [90.42, 87.9, 91.21, 95.54, 87.24, 89.4, 90.51, 95.93, 104.67, 105.91, 113.93, 105.35, 109.88, 115.9, 121.44, 120.64, 116.17, 110.25, 117.55, 121.45, 124.62, 122.24, 127.96, 135.24, 142.82, 148.62, 161.63, 135.55, 143.08, 148.03, 154.67, 147.59, 145.29, 148.13, 156.62, 147.24, 167.23, 174.81, 181.21, 181.62, 181.63, 184.97, 182.95, 192.76, 213.11, 213.56, 238.73, 258.8, 235.55, 231.52, 212.75, 218.65] },
      velocityScore: { '1D': 2.3, '1W': -4.7, '1M': -1.1, '6M': null }, isNew: false,
      marketCap: '$286B', pe: 62.1, revenueGrowth: 12, eps: 3.52, grossMargin: 61, dividendYield: 0.43,
      etfPresence: { SOXX: 4.76, PSI: 5.76, XSD: false, DRAM: false },
      tonyNote: 'KLA Corp is the semiconductor inspection and process control specialist, held in Semiconductor ETFs at a weighting that reflects its non-discretionary role in advanced fab builds. At $1921 per share and a substantial gross margin, KLAC is the most expensive name in the theme by share price; institutional ETF managers hold it as a quality compounder with pricing power that peers cannot replicate.',
    },
    {
      ticker: 'AVGO', name: 'BROADCOM INC', easyScore: 2, avgWeight: 4.99, proScore: 2.49, coverage: 0.5,
      price: 388.5, weeklyPrices: [378.16, 386.50, 396.81, 392.47, 388.50], weeklyChange: 2.73, dayChange: -1.01, sortRank: 0, periodReturns: { '1M': 1.7, 'YTD': 12.3, '6M': 21.4, '1Y': 34.6 },
      priceHistory: { '1D': [392.47, 388.23, 388.5], '1W': [378.16, 386.5, 396.81, 392.47, 388.5], '1M': [382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 370.78, 388.69, 399.97, 384.05, 389.11, 394.28, 374.45, 370.83, 378.16, 386.5, 396.81, 392.47, 388.5], 'YTD': [346.1, 344.97, 351.71, 332.79, 320.33, 342.76, 332.65, 319.55, 345.75, 324.92, 318.29, 313.49, 354.91, 406.54, 422.76, 416.5, 419.3, 411.07, 426.58, 418.91, 382.07, 380.15, 377.75, 401.11, 374.45, 388.5], '6M': [324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 399.83, 427.36, 419.3, 411.07, 421.86, 479.23, 372.1, 392.9, 378.91, 360.45, 399.97, 370.83, 388.5], '1Y': [288.71, 293.7, 303.76, 311.23, 289.6, 308.65, 334.89, 359.63, 345.35, 336.1, 338.18, 345.02, 354.15, 344.29, 376.47, 355.59, 339.98, 346.82, 402.96, 390.24, 406.37, 329.88, 352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 417.76, 426.58, 418.91, 372.1, 392.9, 378.91, 360.45, 399.97, 370.83, 388.5] },
      velocityScore: { '1D': -0.4, '1W': 0.8, '1M': 14.2, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 65.5, revenueGrowth: 48, eps: 5.93, grossMargin: 76, dividendYield: 0.66,
      etfPresence: { SOXX: 7.34, PSI: false, XSD: 2.64, DRAM: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'LRCX', name: 'LAM RESEARCH CORP', easyScore: 2, avgWeight: 4.72, proScore: 2.36, coverage: 0.5,
      price: 318.28, weeklyPrices: [306.76, 322.00, 319.29, 319.78, 318.28], weeklyChange: 3.76, dayChange: -0.47, sortRank: 0, periodReturns: { '1M': -15.1, 'YTD': 85.9, '6M': 46, '1Y': 225.5 },
      priceHistory: { '1D': [319.78, 319.04, 318.28], '1W': [306.76, 322, 319.29, 319.78, 318.28], '1M': [374.8, 401.82, 379.09, 410.91, 433.33, 391.26, 351.41, 350.2, 326.13, 333.15, 350.33, 329.92, 346.1, 335.43, 320.96, 313.3, 306.76, 322, 319.29, 319.78, 318.28], 'YTD': [171.18, 218.36, 222.96, 238.46, 230.1, 235.12, 244.92, 233.89, 211.15, 219.4, 238.84, 222.01, 258.76, 267.6, 267.78, 258.57, 289.24, 273.38, 318, 336.41, 366.81, 371.33, 433.33, 353.17, 320.96, 318.28], '6M': [222.87, 237.5, 229.28, 235.58, 244.25, 217.27, 215.23, 226.47, 238.84, 213.66, 246.49, 265.16, 265.55, 251.23, 275.8, 289.24, 273.38, 318.93, 343.71, 321.8, 374.18, 401.82, 351.41, 350.33, 313.3, 318.28], '1Y': [97.78, 94.84, 99.15, 107.38, 98.41, 104.09, 102.95, 115.58, 126.32, 128.13, 146.99, 141, 142.37, 147.54, 161.01, 162.19, 153.32, 139.59, 156, 158.7, 168.71, 164.7, 178.07, 194.76, 220.4, 222.41, 238.46, 230.1, 226.61, 240.09, 249.48, 222.99, 215.23, 226.47, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 295.44, 292.09, 318, 336.41, 321.8, 374.18, 401.82, 351.41, 350.33, 313.3, 318.28] },
      velocityScore: { '1D': 0.4, '1W': -4.8, '1M': -4.8, '6M': null }, isNew: false,
      marketCap: '$398B', pe: 60.3, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.33,
      etfPresence: { SOXX: 4.2, PSI: 5.25, XSD: false, DRAM: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'TXN', name: 'TEXAS INSTRUMENT INC', easyScore: 2, avgWeight: 3.21, proScore: 1.61, coverage: 0.5,
      price: 281.69, weeklyPrices: [284.07, 291.30, 294.19, 284.99, 281.69], weeklyChange: -0.84, dayChange: -1.16, sortRank: 0, periodReturns: { '1M': -7.1, 'YTD': 62.4, '6M': 45.7, '1Y': 51.7 },
      priceHistory: { '1D': [284.99, 281.65, 281.69], '1W': [284.07, 291.3, 294.19, 284.99, 281.69], '1M': [303.11, 311.81, 285.43, 285.48, 298.07, 298.41, 293.08, 303.5, 293.3, 301.32, 311.46, 298.57, 305.55, 301.19, 291.22, 284.02, 284.07, 291.3, 294.19, 284.99, 281.69], 'YTD': [173.49, 190.31, 191.58, 196.63, 225.21, 226.56, 219.73, 212.11, 196.2, 194.13, 194.63, 196.3, 214.98, 229.82, 277.14, 280.89, 295.17, 302.31, 315.95, 305.37, 301.12, 304.36, 298.07, 308.53, 291.22, 281.69], '6M': [196.59, 225.01, 218.77, 225.69, 213.35, 202.67, 197.46, 194.45, 194.63, 194.14, 208.9, 216.29, 236.31, 265, 281, 295.17, 302.31, 317.45, 308.59, 282.01, 301.88, 311.81, 293.08, 311.46, 284.02, 281.69], '1Y': [185.69, 181.06, 185.91, 193.71, 200.71, 204.09, 187.93, 184.35, 181.62, 182.04, 182.32, 178.96, 175.48, 172.19, 160.51, 161.38, 162.23, 153.33, 168.27, 182.54, 181.67, 176.19, 176.88, 177.17, 189.07, 189.59, 196.63, 225.21, 220.92, 223.32, 213.9, 202.39, 197.46, 194.45, 194.63, 194.14, 208.9, 216.29, 236.31, 269.22, 289.44, 306.34, 304.88, 315.95, 305.37, 282.01, 301.88, 311.81, 293.08, 311.46, 284.02, 281.69] },
      velocityScore: { '1D': -1.8, '1W': -5.3, '1M': 4.5, '6M': null }, isNew: false,
      marketCap: '$257B', pe: 48.2, revenueGrowth: 23, eps: 5.84, grossMargin: 58, dividendYield: 1.99,
      etfPresence: { SOXX: 3.9, PSI: false, XSD: 2.53, DRAM: false },
      tonyNote: 'Texas Instruments is the quality compounder in the Semiconductor theme — held by 3 ETFs at 3.5% average weight. Revenue declined slightly but gross margin is robust and the business generates consistent free cash flow. The weight score reflects ETF managers holding TXN as the stable anchor position while cycling higher-beta names around it.',
    },
    {
      ticker: 'MRVL', name: 'MARVELL TECHNOLOGY INC', easyScore: 2, avgWeight: 3.18, proScore: 1.59, coverage: 0.5,
      price: 205.13, weeklyPrices: [194.94, 207.96, 210.99, 209.32, 205.13], weeklyChange: 5.23, dayChange: -2, sortRank: 0, periodReturns: { '1M': -25.9, 'YTD': 141.4, '6M': 155.7, '1Y': 177.1 },
      priceHistory: { '1D': [209.32, 205.63, 205.13], '1W': [194.94, 207.96, 210.99, 209.32, 205.13], '1M': [276.7, 281.26, 266.77, 277.75, 297.89, 272.05, 245.29, 249.27, 230.7, 231.71, 235.81, 217.53, 222.44, 206.26, 188.3, 188.68, 194.94, 207.96, 210.99, 209.32, 205.13], 'YTD': [84.98, 83.22, 80.46, 82.93, 75.54, 81.34, 79.48, 81.69, 92.65, 91.58, 92.36, 106.71, 119.93, 139.69, 164.31, 163.66, 164.5, 176.27, 204.83, 316.43, 279.7, 279.04, 297.89, 243.27, 188.3, 205.13], '6M': [81.77, 78.66, 82.35, 79.01, 78.39, 77.51, 93.3, 90.79, 92.36, 99.05, 114.45, 134.6, 157.32, 153.23, 168.75, 164.5, 176.27, 198.7, 301.65, 252.59, 289.54, 281.26, 245.29, 235.81, 188.68, 205.13], '1Y': [74.04, 80.37, 75.85, 79.04, 71.21, 77.23, 63.33, 66.59, 74.23, 83.81, 86.2, 90.68, 88.23, 82.77, 88.57, 93.33, 87.52, 76.68, 89.4, 98.91, 89.43, 84.47, 86.34, 90.23, 82.89, 79.8, 82.93, 75.54, 82.01, 79.09, 80.92, 78.09, 93.3, 90.79, 92.36, 99.05, 114.45, 134.6, 157.32, 156.57, 172.15, 177.95, 186.8, 204.83, 316.43, 252.59, 289.54, 281.26, 245.29, 235.81, 188.68, 205.13] },
      velocityScore: { '1D': 0, '1W': 7.4, '1M': -16.3, '6M': null }, isNew: false,
      marketCap: '$184B', pe: 70.5, revenueGrowth: 28, eps: 2.91, grossMargin: 52, dividendYield: 0.11,
      etfPresence: { SOXX: 4.27, PSI: false, XSD: 2.08, DRAM: false },
      tonyNote: 'Marvell scores across three themes — AI, Semiconductors, and Broad Tech — at average weights of 3.7-4.7%. Revenue grew 28%, gross margin at 52%, P/E of 70x. Custom AI silicon for hyperscalers is the thesis, and the 241% 1-year return says the market is pricing it aggressively. The cross-theme ETF presence is the strongest signal of institutional conviction.',
    },
    {
      ticker: 'NXPI', name: 'NXP SEMICONDUCTORS NV', easyScore: 2, avgWeight: 3.02, proScore: 1.51, coverage: 0.5,
      price: 277.92, weeklyPrices: [267.18, 273.15, 278.80, 277.29, 277.92], weeklyChange: 4.02, dayChange: 0.23, sortRank: 0, periodReturns: { '1M': -5.5, 'YTD': 28, '6M': 19.5, '1Y': 23.8 },
      priceHistory: { '1D': [277.29, 277.54, 277.92], '1W': [267.18, 273.15, 278.8, 277.29, 277.92], '1M': [294.06, 298.64, 277.02, 278.37, 281.03, 279.18, 273.36, 280.51, 273.15, 283.81, 292.26, 278.39, 283.87, 279.01, 270.66, 266.53, 267.18, 273.15, 278.8, 277.29, 277.92], 'YTD': [217.06, 241.15, 237.11, 229.42, 220.66, 249.75, 232.27, 227.01, 205.25, 191.89, 196.4, 195.58, 205.67, 216.03, 244.04, 290.76, 294.23, 294.28, 330.28, 322.22, 304.86, 299.94, 281.03, 290.54, 270.66, 277.92], '6M': [231.05, 231.08, 228.91, 245.09, 234.63, 215.25, 203.03, 194.02, 196.4, 196.86, 204.27, 209.39, 225.75, 230.39, 292.35, 294.23, 294.28, 329.24, 321.88, 285.56, 298.2, 298.64, 273.36, 292.26, 266.53, 277.92], '1Y': [224.43, 213.77, 205.91, 231.54, 223.93, 239.07, 226.74, 223.21, 226.51, 226.81, 227.71, 221.42, 217.41, 220.73, 206.38, 206.45, 201.22, 184.19, 194.94, 227.95, 231.83, 222.08, 222.87, 223.88, 238.33, 230.7, 229.42, 220.66, 236.62, 237.33, 235.07, 216.37, 203.03, 194.02, 196.4, 196.86, 204.27, 209.39, 225.75, 289.25, 303.55, 298.41, 310.15, 330.28, 322.22, 285.56, 298.2, 298.64, 273.36, 292.26, 266.53, 277.92] },
      velocityScore: { '1D': 0.7, '1W': -1.3, '1M': 3.4, '6M': null }, isNew: false,
      marketCap: '$70B', pe: 26.6, revenueGrowth: 12, eps: 10.45, grossMargin: 56, dividendYield: 1.46,
      etfPresence: { SOXX: 3.61, PSI: false, XSD: 2.43, DRAM: false },
      tonyNote: 'NXP Semiconductors holds a position in Semiconductor ETFs on the strength of its automotive and industrial exposure. Revenue diversification away from consumer electronics insulates it from handset cycle volatility; the weight score is modest, reflecting a defensive rather than growth-oriented institutional allocation.',
    },
    {
      ticker: 'MPWR', name: 'MONOLITHIC POWER SYSTEMS INC', easyScore: 2, avgWeight: 2.91, proScore: 1.45, coverage: 0.5,
      price: 1376.81, weeklyPrices: [1328.80, 1383.26, 1398.45, 1397.15, 1376.81], weeklyChange: 3.61, dayChange: -1.45, sortRank: 0, periodReturns: { '1M': -4.1, 'YTD': 51.9, '6M': 29.4, '1Y': 93.1 },
      priceHistory: { '1D': [1397.15, 1383.69, 1376.81], '1W': [1328.8, 1383.26, 1398.45, 1397.15, 1376.81], '1M': [1434.95, 1438.3, 1313.32, 1312.77, 1382.36, 1331.73, 1288.16, 1346.13, 1272.81, 1315.51, 1352.74, 1291.38, 1376.41, 1352.66, 1305.65, 1312, 1328.8, 1383.26, 1398.45, 1397.15, 1376.81], 'YTD': [906.36, 958.97, 1033.17, 1095.49, 1164.83, 1196.73, 1204.1, 1142.74, 1062, 1077.4, 1101.59, 1119.51, 1334.21, 1468.35, 1632.06, 1573.3, 1599.52, 1468.11, 1633.17, 1652.6, 1577.32, 1423.76, 1382.36, 1374.13, 1305.65, 1376.81], '6M': [1068.14, 1173.22, 1206.18, 1173.18, 1213.67, 1074.37, 1055.82, 1066.66, 1101.59, 1093.35, 1312.94, 1353, 1522.04, 1504.08, 1588.12, 1599.52, 1468.11, 1620.17, 1689.89, 1473.04, 1448.21, 1438.3, 1288.16, 1352.74, 1312, 1376.81], '1Y': [713, 711.24, 797.94, 848.81, 820.74, 858.46, 865.86, 840.38, 917.78, 891.39, 930.51, 979.25, 1026.83, 1070.8, 1087.56, 958.07, 924.29, 857.19, 928.17, 963.28, 981.48, 929.48, 946.32, 955.03, 967.16, 1034.49, 1095.49, 1164.83, 1142.02, 1188.32, 1231.95, 1099.02, 1055.82, 1066.66, 1101.59, 1093.35, 1312.94, 1353, 1522.04, 1526.84, 1652.35, 1650.35, 1553.27, 1633.17, 1652.6, 1473.04, 1448.21, 1438.3, 1288.16, 1352.74, 1312, 1376.81] },
      velocityScore: { '1D': 0.7, '1W': 2.8, '1M': 9.8, '6M': null }, isNew: false,
      marketCap: '$68B', pe: 98.6, revenueGrowth: 26, eps: 13.97, grossMargin: 55, dividendYield: 0.57,
      etfPresence: { SOXX: 3.44, PSI: false, XSD: 2.37, DRAM: false },
      tonyNote: 'Monolithic Power Systems is held in Semiconductor ETFs for its analog power management chips used in AI server power delivery. At $1566 per share and a premium valuation, MPWR is a quality compounder; the institutional weight reflects consistent revenue growth and exceptional gross margins for an analog IC business.',
    },
    {
      ticker: 'QCOM', name: 'QUALCOMM INC', easyScore: 2, avgWeight: 2.55, proScore: 1.27, coverage: 0.5,
      price: 170.47, weeklyPrices: [170.32, 173.50, 175.63, 171.11, 170.47], weeklyChange: 0.09, dayChange: -0.37, sortRank: 0, periodReturns: { '1M': -13.6, 'YTD': -0.3, '6M': 9.4, '1Y': 7.3 },
      priceHistory: { '1D': [171.11, 170.18, 170.47], '1W': [170.32, 173.5, 175.63, 171.11, 170.47], '1M': [197.41, 204.9, 189.39, 188.72, 184.79, 181.92, 176.25, 186.48, 182.97, 186.56, 189.16, 183.98, 178.1, 177.98, 170.61, 171.78, 170.32, 173.5, 175.63, 171.11, 170.47], 'YTD': [171.05, 177.78, 159.42, 153.04, 147.18, 141.04, 142.88, 142.36, 138.11, 129.39, 128.67, 127.28, 127.75, 136.2, 148.85, 168.38, 210.31, 195.61, 243.29, 242.57, 211.72, 204.13, 184.79, 191.11, 170.61, 170.47], '6M': [154.52, 152.62, 138.93, 142.63, 144.78, 138.13, 135.2, 131.59, 128.67, 128.78, 127.51, 133.05, 136.07, 150, 186.55, 210.31, 195.61, 233.4, 250.01, 191.2, 212.97, 204.9, 176.25, 189.16, 171.78, 170.47], '1Y': [158.84, 146.76, 145.9, 158.09, 154.13, 160.8, 159.84, 161.51, 168.13, 169.68, 168.85, 165.66, 164.08, 170.03, 177.26, 173.2, 174.5, 159.59, 168.09, 174.81, 181.27, 174.19, 174.81, 176.31, 169.27, 154.07, 153.04, 147.18, 140.09, 143.24, 145.82, 139.51, 135.2, 131.59, 128.67, 128.78, 127.51, 133.05, 136.07, 156, 192.57, 213.17, 202.51, 243.29, 242.57, 191.2, 212.97, 204.9, 176.25, 189.16, 171.78, 170.47] },
      velocityScore: { '1D': -1.6, '1W': -3.8, '1M': -6.6, '6M': null }, isNew: false,
      marketCap: '$180B', pe: 18.3, revenueGrowth: -4, eps: 9.31, grossMargin: 55, dividendYield: 2.15,
      etfPresence: { SOXX: 2.85, PSI: false, XSD: 2.25, DRAM: false },
      tonyNote: 'Qualcomm appears in Semiconductor ETFs on the strength of its mobile modem dominance and early positioning in on-device AI inference chips. Revenue is diversified across handsets, auto, and IoT; the weight score reflects a steady institutional presence rather than high-conviction AI upweighting.',
    },
    {
      ticker: 'ALAB', name: 'ASTERA LABS INC', easyScore: 2, avgWeight: 2.43, proScore: 1.22, coverage: 0.5,
      price: 317.17, weeklyPrices: [309.09, 319.79, 330.89, 326.97, 317.17], weeklyChange: 2.61, dayChange: -3, sortRank: 0, periodReturns: { '1M': -20.7, 'YTD': 90.6, '6M': 86.9, '1Y': 160.7 },
      priceHistory: { '1D': [326.97, 317.36, 317.17], '1W': [309.09, 319.79, 330.89, 326.97, 317.17], '1M': [399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42, 432.74, 382.89, 393.16, 412.97, 362.05, 361.78, 350.62, 319.74, 303.62, 309.09, 319.79, 330.89, 326.97, 317.17], 'YTD': [166.36, 162.61, 182, 170.93, 158.52, 143.71, 129.68, 118.83, 122.31, 127.48, 121.76, 106.33, 129.46, 174.05, 212.84, 201.25, 204.42, 244.26, 349.17, 358.05, 367.15, 397.02, 483.02, 417.45, 319.74, 317.17], '6M': [163.25, 152.44, 187.67, 123.69, 128.4, 109.8, 116.48, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 183.31, 215.69, 204.42, 244.26, 325.33, 363.54, 330.86, 374.68, 398, 406.42, 412.97, 303.62, 317.17], '1Y': [121.68, 136.73, 170.89, 190.69, 177.53, 189.15, 191.2, 232.9, 251.88, 200.64, 209.6, 225.43, 163.55, 163.64, 169.55, 162.83, 144.47, 139.29, 157.57, 161.23, 173.7, 145.88, 167.26, 167.11, 172.57, 183.75, 170.93, 158.52, 182.86, 129.58, 128.15, 113.77, 116.48, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 224.09, 287.48, 349.17, 358.05, 330.86, 374.68, 398, 406.42, 412.97, 303.62, 317.17] },
      velocityScore: { '1D': 0, '1W': -0.8, '1M': -6.9, '6M': null }, isNew: false,
      marketCap: '$54B', pe: 215.8, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { SOXX: 2.38, PSI: false, XSD: 2.48, DRAM: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'MCHP', name: 'MICROCHIP TECHNOLOGY INC', easyScore: 2, avgWeight: 2.29, proScore: 1.14, coverage: 0.5,
      price: 80.98, weeklyPrices: [80.51, 83.38, 85.02, 81.35, 80.98], weeklyChange: 0.58, dayChange: -0.45, sortRank: 0, periodReturns: { '1M': -12.4, 'YTD': 27.1, '6M': 8.4, '1Y': 19.4 },
      priceHistory: { '1D': [81.35, 81.13, 80.98], '1W': [80.51, 83.38, 85.02, 81.35, 80.98], '1M': [92.48, 94.12, 87.93, 89.06, 91.2, 88.69, 84.64, 87.59, 84.15, 85.49, 88.59, 84.23, 87.11, 86.26, 81.68, 80.96, 80.51, 83.38, 85.02, 81.35, 80.98], 'YTD': [63.72, 75.22, 74.7, 75.16, 76.66, 80.75, 77.73, 74.64, 65, 63.83, 65.63, 65.38, 71.22, 78.76, 89.44, 95.3, 97.7, 91.81, 96.04, 96.3, 95.24, 93.26, 91.2, 88.26, 81.68, 80.98], '6M': [74.79, 78.08, 74.41, 78.94, 75.93, 71.39, 65.33, 64.59, 65.63, 64.61, 70.73, 74.49, 82.48, 84.26, 98.48, 97.7, 91.81, 96.85, 96.55, 87.91, 94.11, 94.12, 84.64, 88.59, 80.96, 80.98], '1Y': [67.81, 67.59, 66.22, 65.99, 66.1, 65.25, 65.92, 65.02, 66.26, 64.84, 66.13, 65.86, 65.35, 65.09, 62.07, 59.35, 54.81, 49.02, 53.58, 65.81, 69.09, 64.06, 64.94, 67.06, 73.39, 73.17, 75.16, 76.66, 76.86, 79.11, 75.47, 69.9, 65.33, 64.59, 65.63, 64.61, 70.73, 74.49, 82.48, 90.17, 102.92, 96.71, 94.02, 96.04, 96.3, 87.91, 94.11, 94.12, 84.64, 88.59, 80.96, 80.98] },
      velocityScore: { '1D': -3.4, '1W': -4.2, '1M': -2.6, '6M': null }, isNew: false,
      marketCap: '$44B', pe: 368.1, revenueGrowth: 35, eps: 0.22, grossMargin: 58, dividendYield: 2.24,
      etfPresence: { SOXX: 2.25, PSI: false, XSD: 2.32, DRAM: false },
      tonyNote: 'MICROCHIP TECHNOLOGY INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 2.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CRDO', name: 'CREDO TECHNOLOGY GROUP HOLDING LTD', easyScore: 2, avgWeight: 2.27, proScore: 1.13, coverage: 0.5,
      price: 230.86, weeklyPrices: [212.07, 223.87, 228.27, 236.50, 230.86], weeklyChange: 8.86, dayChange: -2.39, sortRank: 0, periodReturns: { '1M': -14.2, 'YTD': 60.4, '6M': 73.4, '1Y': 128.2 },
      priceHistory: { '1D': [236.5, 230.25, 230.86], '1W': [212.07, 223.87, 228.27, 236.5, 230.86], '1M': [268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 265.55, 246.4, 258.69, 257.79, 236.88, 236.18, 226.74, 207.97, 202.68, 212.07, 223.87, 228.27, 236.5, 230.86], 'YTD': [143.89, 150.42, 150.97, 129.57, 111.31, 128.4, 124.06, 112.27, 115.98, 116.88, 100.3, 95.92, 107.93, 160.69, 195.04, 180.06, 198.57, 168.99, 222.35, 217.5, 250.81, 272.01, 271.95, 265.65, 207.97, 230.86], '6M': [128.02, 119.96, 123.41, 124.8, 120.83, 97.3, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 165.92, 193.57, 198.57, 168.99, 221.23, 214.6, 237.68, 249.33, 268.03, 241.91, 257.79, 202.68, 230.86], '1Y': [101.17, 111.55, 119.78, 117.33, 110.86, 131.82, 140.82, 159.32, 172.31, 144.94, 149.63, 151.15, 136.53, 150.97, 166.62, 162.74, 142.95, 134.73, 177.6, 176.04, 154.47, 138.57, 144.83, 140.24, 156.07, 153.22, 129.57, 111.31, 134.72, 127.91, 123.46, 102.54, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 182.98, 222.35, 217.5, 237.68, 249.33, 268.03, 241.91, 257.79, 202.68, 230.86] },
      velocityScore: { '1D': 4.6, '1W': 9.7, '1M': -2.6, '6M': null }, isNew: false,
      marketCap: '$43B', pe: 92, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { SOXX: 2.03, PSI: false, XSD: 2.5, DRAM: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'ON', name: 'ON SEMICONDUCTOR CORP', easyScore: 2, avgWeight: 1.94, proScore: 0.97, coverage: 0.5,
      price: 89.31, weeklyPrices: [86.70, 91.06, 92.33, 90.13, 89.31], weeklyChange: 3.01, dayChange: -0.91, sortRank: 0, periodReturns: { '1M': -22.8, 'YTD': 64.9, '6M': 44.1, '1Y': 61.1 },
      priceHistory: { '1D': [90.13, 89.57, 89.31], '1W': [86.7, 91.06, 92.33, 90.13, 89.31], '1M': [115.74, 118.74, 90.65, 88.57, 94.54, 94.63, 91.22, 94.69, 91.1, 93.79, 95.96, 90.37, 93.73, 92.54, 88.12, 87.37, 86.7, 91.06, 92.33, 90.13, 89.31], 'YTD': [54.15, 62.16, 60.33, 62.63, 59.43, 71.18, 69.11, 66.48, 59.23, 59.88, 62.34, 62.2, 68.49, 83.01, 98.4, 102.04, 104.11, 106.02, 123.77, 131.82, 116.79, 117.06, 94.54, 97.87, 88.12, 89.31], '6M': [61.13, 61.53, 65.1, 71.96, 70.03, 63.42, 59.59, 60.98, 62.34, 61.92, 68.38, 72.43, 88.99, 93.3, 102.67, 104.11, 106.02, 124.89, 133.93, 110.17, 112.92, 118.74, 91.22, 95.96, 87.37, 89.31], '1Y': [55.44, 56.36, 47.59, 51.62, 48.81, 50.78, 49.11, 49.02, 51.83, 49.77, 48.74, 49.97, 52.97, 51.78, 50.85, 48.8, 48.13, 44.9, 50.24, 54.74, 55.97, 54.34, 54.93, 58.69, 58.75, 60.06, 62.63, 59.43, 67.38, 70.66, 69.68, 62.53, 59.59, 60.98, 62.34, 61.92, 68.38, 72.43, 88.99, 98.86, 105.77, 115.71, 110.21, 123.77, 131.82, 110.17, 112.92, 118.74, 91.22, 95.96, 87.37, 89.31] },
      velocityScore: { '1D': -1, '1W': -1, '1M': -13.4, '6M': null }, isNew: false,
      marketCap: '$35B', pe: 67.7, revenueGrowth: 5, eps: 1.32, grossMargin: 43, dividendYield: null,
      etfPresence: { SOXX: 1.83, PSI: false, XSD: 2.05, DRAM: false },
      tonyNote: 'ON Semiconductor appears in the Semiconductor theme on automotive and industrial analog exposure. Revenue growth has moderated as the auto semiconductor super-cycle peaks; the weight score is moderate, consistent with ETF managers maintaining existing positions rather than aggressively adding.',
    },
    {
      ticker: 'MTSI', name: 'MACOM TECHNOLOGY SOLUTIONS INC', easyScore: 2, avgWeight: 1.5, proScore: 0.75, coverage: 0.5,
      price: 278.5, weeklyPrices: [269.80, 283.03, 282.62, 282.82, 278.50], weeklyChange: 3.22, dayChange: -1.53, sortRank: 0, periodReturns: { '1M': -25.4, 'YTD': 62.6, '6M': 27, '1Y': 102.9 },
      priceHistory: { '1D': [282.82, 278.16, 278.5], '1W': [269.8, 283.03, 282.62, 282.82, 278.5], '1M': [373.08, 390.19, 369.18, 372.59, 380.37, 350.63, 322.26, 327.64, 304.82, 305.23, 308.52, 294.24, 301.76, 293.02, 275.49, 267.36, 269.8, 283.03, 282.62, 282.82, 278.5], 'YTD': [171.28, 174.87, 220.68, 219.2, 226.71, 236.94, 243.59, 248.12, 218.73, 224.92, 237.23, 229.36, 247.71, 276.97, 287.64, 291.72, 362.76, 358.98, 391.09, 382.74, 379.87, 372.15, 380.37, 317.35, 275.49, 278.5], '6M': [218.89, 228.56, 235.7, 245.59, 248.29, 241.01, 220.59, 221.29, 237.23, 222.07, 247, 261.16, 277, 265.61, 303.57, 362.76, 358.98, 400.66, 390.34, 354.4, 367.11, 390.19, 322.26, 308.52, 267.36, 278.5], '1Y': [137.29, 137.14, 127.75, 125.4, 123.58, 133.89, 129.86, 131.07, 129.73, 123.88, 128.09, 132.98, 137.94, 139.31, 150.61, 166.92, 162.24, 155.39, 174.99, 184.1, 189.86, 171.47, 175.01, 170.76, 197.55, 221.7, 219.2, 226.71, 230.54, 246.76, 253.37, 239, 220.59, 221.29, 237.23, 222.07, 247, 261.16, 277, 269.63, 309.81, 381.55, 375.71, 391.09, 382.74, 354.4, 367.11, 390.19, 322.26, 308.52, 267.36, 278.5] },
      velocityScore: { '1D': 0, '1W': -1.3, '1M': -13.8, '6M': null }, isNew: false,
      marketCap: '$21B', pe: 118.5, revenueGrowth: 23, eps: 2.35, grossMargin: 56, dividendYield: null,
      etfPresence: { SOXX: 1.01, PSI: false, XSD: 2, DRAM: false },
      tonyNote: 'MACOM TECHNOLOGY SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SWKS', name: 'SKYWORKS SOLUTIONS INC', easyScore: 2, avgWeight: 1.31, proScore: 0.66, coverage: 0.5,
      price: 61.28, weeklyPrices: [59.80, 62.95, 63.16, 60.47, 61.28], weeklyChange: 2.48, dayChange: 1.35, sortRank: 0, periodReturns: { '1M': -14.2, 'YTD': -3.4, '6M': 3.9, '1Y': -15.3 },
      priceHistory: { '1D': [60.47, 61.17, 61.28], '1W': [59.8, 62.95, 63.16, 60.47, 61.28], '1M': [71.4, 69.94, 68, 67.71, 67.8, 65.93, 62.56, 61.91, 59.76, 58.49, 60.38, 58.24, 56.58, 57.51, 57.63, 59.35, 59.8, 62.95, 63.16, 60.47, 61.28], 'YTD': [63.41, 60.17, 57.77, 60.05, 55.93, 63.68, 60.05, 59.58, 55.28, 54.54, 55.36, 53.22, 56.56, 58.99, 63.65, 68.85, 66.31, 70.35, 81.41, 79.93, 73.97, 73.44, 67.8, 59.95, 57.63, 61.28], '6M': [59.76, 56.83, 61.55, 62.16, 59.9, 58.15, 54.93, 53.71, 55.36, 53.55, 56.54, 57.93, 61.77, 60.98, 72.56, 66.31, 70.35, 78.68, 80.66, 70.29, 69.38, 69.94, 62.56, 60.38, 59.35, 61.28], '1Y': [72.34, 68.54, 68.55, 75.36, 74.52, 75.1, 75.2, 74.68, 77.03, 79.36, 77.37, 73.64, 74.47, 75.78, 79.16, 70.64, 68.17, 60.5, 65.95, 69.32, 68.25, 64.49, 64.21, 65.16, 58.85, 57.41, 60.05, 55.93, 62.31, 62, 59.82, 56.28, 54.93, 53.71, 55.36, 53.55, 56.54, 57.93, 61.77, 62.66, 64.97, 68.14, 74.35, 81.41, 79.93, 70.29, 69.38, 69.94, 62.56, 60.38, 59.35, 61.28] },
      velocityScore: { '1D': -2.9, '1W': 1.5, '1M': -5.7, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 26.6, revenueGrowth: -1, eps: 2.3, grossMargin: 41, dividendYield: 4.7,
      etfPresence: { SOXX: 0.47, PSI: false, XSD: 2.15, DRAM: false },
      tonyNote: 'SKYWORKS SOLUTIONS INC appears in 2 of 4 Semiconductors ETFs (50% coverage) with average weight 1.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Broad Tech ─────────────────────
  'Broad Tech': [
    {
      ticker: 'NVDA', name: 'NVIDIA Corp', easyScore: 9, avgWeight: 5.9, proScore: 3.12, coverage: 0.529,
      price: 208.2, weeklyPrices: [203.28, 207.29, 212.06, 208.76, 208.20], weeklyChange: 2.42, dayChange: -0.27, sortRank: 0, periodReturns: { '1M': 4.6, 'YTD': 11.6, '6M': 10.9, '1Y': 19.8 },
      priceHistory: { '1D': [208.76, 208.13, 208.2], '1W': [203.28, 207.29, 212.06, 208.76, 208.2], '1M': [199, 195.74, 192.53, 194.97, 200.09, 197.58, 194.83, 195.55, 196.93, 204.12, 210.96, 203.53, 211.8, 212.5, 207.4, 202.81, 203.28, 207.29, 212.06, 208.76, 208.2], 'YTD': [186.5, 184.86, 186.23, 188.52, 180.34, 190.05, 189.82, 177.19, 182.65, 183.22, 175.2, 175.75, 183.91, 201.68, 208.27, 198.48, 220.78, 220.61, 214.25, 218.66, 205.19, 200.04, 200.09, 202.78, 207.4, 208.2], '6M': [186.47, 185.61, 190.04, 184.97, 192.85, 180.05, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 213.17, 196.5, 220.78, 220.61, 212.6, 214.75, 200.42, 204.65, 195.74, 194.83, 210.96, 202.81, 208.2], '1Y': [173.74, 177.87, 180.77, 182.02, 174.98, 180.17, 167.02, 177.17, 176.24, 177.69, 188.89, 192.57, 181.81, 182.16, 202.89, 188.08, 186.86, 180.64, 177, 182.41, 180.93, 174.14, 190.53, 188.12, 184.94, 178.07, 188.52, 180.34, 188.54, 187.98, 195.56, 183.04, 184.77, 181.93, 175.2, 174.4, 182.08, 198.87, 202.5, 209.25, 207.83, 225.83, 223.47, 214.25, 218.66, 200.42, 204.65, 195.74, 194.83, 210.96, 202.81, 208.2] },
      velocityScore: { '1D': 0, '1W': 1.3, '1M': -5.7, '6M': null }, isNew: false,
      marketCap: '$5.0T', pe: 31.9, revenueGrowth: 85, eps: 6.53, grossMargin: 74, dividendYield: 0.48,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 4.09, GTEK: false, ARKK: 1.79, MARS: false, FRWD: 9.26, BCTK: 6.4, FWD: 3.14, CBSE: 3.05, FCUS: false, WGMI: 2.44, CNEQ: 14.42, SGRT: false, SPMO: 8.51, XMMO: false },
      tonyNote: 'NVIDIA sits at 88% AI ETF coverage with a 5.6% average weight — the broadest institutional consensus in the theme. At a $5.1T market cap and 74% gross margin, the business is printing cash, but the 1-year return of 56% signals the easy money has been made. The score reflects the depth of institutional commitment, not a fresh entry signal.',
    },
    {
      ticker: 'MU', name: 'Micron Technology Inc', easyScore: 8, avgWeight: 5.87, proScore: 2.76, coverage: 0.471,
      price: 965.74, weeklyPrices: [865.46, 970.82, 959.48, 990.21, 965.74], weeklyChange: 11.59, dayChange: -2.47, sortRank: 0, periodReturns: { '1M': -7.9, 'YTD': 238.4, '6M': 141.6, '1Y': 764.4 },
      priceHistory: { '1D': [990.21, 965.58, 965.74], '1W': [865.46, 970.82, 959.48, 990.21, 965.74], '1M': [1048.51, 1213.56, 1132.33, 1145.28, 1154.29, 1032.28, 975.56, 984.75, 938.38, 948.8, 979.3, 937, 983.12, 904.28, 853.2, 848.95, 865.46, 970.82, 959.48, 990.21, 965.74], 'YTD': [285.41, 345.09, 362.75, 410.24, 419.44, 410.34, 428.17, 412.37, 389.32, 441.8, 395.53, 367.85, 421.51, 455.07, 496.72, 576.45, 766.58, 698.74, 923.52, 996, 981.61, 1051.77, 1154.29, 991.64, 853.2, 965.74], '6M': [389.09, 437.8, 383.5, 399.78, 418.01, 379.68, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 504.29, 640.2, 766.58, 698.74, 928.41, 1079.57, 891.88, 1043.19, 1213.56, 975.56, 979.3, 848.95, 965.74], '1Y': [111.73, 109.14, 111.87, 125.29, 115.79, 122, 131.37, 150.57, 168.89, 156.83, 183.75, 192.33, 202.53, 206.71, 224.01, 238.33, 236.95, 201.37, 236.48, 237.22, 258.46, 248.55, 284.79, 312.15, 345.87, 365, 410.24, 419.44, 373.25, 420.95, 429, 400.77, 403.11, 461.69, 395.53, 337.84, 406.73, 456.23, 487.48, 518.46, 666.59, 803.63, 731.99, 923.52, 996, 891.88, 1043.19, 1213.56, 975.56, 979.3, 848.95, 965.74] },
      velocityScore: { '1D': 3, '1W': 0.4, '1M': -12.9, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 21.8, revenueGrowth: 346, eps: 44.26, grossMargin: 73, dividendYield: 0.05,
      etfPresence: { PTF: 5.18, WCLD: false, IGV: false, FDTX: 9.33, GTEK: false, ARKK: false, MARS: false, FRWD: 4.05, BCTK: 4.1, FWD: false, CBSE: false, FCUS: 4.17, WGMI: false, CNEQ: 2.76, SGRT: 6.73, SPMO: 10.62, XMMO: false },
      tonyNote: 'Micron is the top-ranked AI hardware name on the weight score, held by 7 of 8 AI ETFs and all 4 Semiconductor ETFs at average weights above 6.7%. Revenue grew 196% year-over-year, gross margin is at 58% and expanding, and EPS hit $21.17 — the fundamentals back up the institutional conviction. The 1-year return of 928% is not a typo; HBM memory demand from data center AI build-outs is the driver, and the ETF managers are positioned accordingly.',
    },
    {
      ticker: 'AVGO', name: 'Broadcom Inc', easyScore: 8, avgWeight: 3.85, proScore: 1.81, coverage: 0.471,
      price: 388.5, weeklyPrices: [378.16, 386.50, 396.81, 392.47, 388.50], weeklyChange: 2.73, dayChange: -1.01, sortRank: 0, periodReturns: { '1M': 1.7, 'YTD': 12.3, '6M': 21.4, '1Y': 34.6 },
      priceHistory: { '1D': [392.47, 388.23, 388.5], '1W': [378.16, 386.5, 396.81, 392.47, 388.5], '1M': [382.07, 378.91, 365.02, 372.45, 377.75, 369.34, 360.45, 373.9, 370.78, 388.69, 399.97, 384.05, 389.11, 394.28, 374.45, 370.83, 378.16, 386.5, 396.81, 392.47, 388.5], 'YTD': [346.1, 344.97, 351.71, 332.79, 320.33, 342.76, 332.65, 319.55, 345.75, 324.92, 318.29, 313.49, 354.91, 406.54, 422.76, 416.5, 419.3, 411.07, 426.58, 418.91, 382.07, 380.15, 377.75, 401.11, 374.45, 388.5], '6M': [324.85, 331.11, 343.94, 332.54, 325.49, 313.84, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 399.83, 427.36, 419.3, 411.07, 421.86, 479.23, 372.1, 392.9, 378.91, 360.45, 399.97, 370.83, 388.5], '1Y': [288.71, 293.7, 303.76, 311.23, 289.6, 308.65, 334.89, 359.63, 345.35, 336.1, 338.18, 345.02, 354.15, 344.29, 376.47, 355.59, 339.98, 346.82, 402.96, 390.24, 406.37, 329.88, 352.13, 343.42, 352.21, 332.6, 332.79, 320.33, 340.44, 333.51, 332.31, 317.53, 342.58, 321.31, 318.29, 309.51, 350.63, 396.72, 422.65, 405.45, 425.44, 416.79, 417.76, 426.58, 418.91, 372.1, 392.9, 378.91, 360.45, 399.97, 370.83, 388.5] },
      velocityScore: { '1D': 0.6, '1W': 10.4, '1M': 24.8, '6M': null }, isNew: false,
      marketCap: '$1.8T', pe: 65.5, revenueGrowth: 48, eps: 5.93, grossMargin: 76, dividendYield: 0.66,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 0.62, GTEK: false, ARKK: 1.21, MARS: false, FRWD: 4.97, BCTK: 7.11, FWD: 2.52, CBSE: 2.52, FCUS: false, WGMI: false, CNEQ: 5.11, SGRT: false, SPMO: 6.75, XMMO: false },
      tonyNote: 'Broadcom appears in 6 of 8 AI ETFs and 3 of 4 Semiconductor ETFs, making it one of the most consistent cross-theme holdings. Revenue grew 30%, gross margin is 77% — the highest in the theme — and it pays a 0.58% dividend. The 87x P/E is the only friction; ETF managers are paying a premium for a recurring-revenue AI infrastructure name.',
    },
    {
      ticker: 'AMD', name: 'Advanced Micro Devices Inc', easyScore: 8, avgWeight: 3.73, proScore: 1.75, coverage: 0.471,
      price: 547.26, weeklyPrices: [503.57, 544.43, 552.33, 539.69, 547.26], weeklyChange: 8.68, dayChange: 1.4, sortRank: 0, periodReturns: { '1M': 5.3, 'YTD': 155.5, '6M': 110.7, '1Y': 237.6 },
      priceHistory: { '1D': [539.69, 547.46, 547.26], '1W': [503.57, 544.43, 552.33, 539.69, 547.26], '1M': [519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 517.41, 557.89, 534.39, 548.13, 529.14, 500.94, 495.76, 503.57, 544.43, 552.33, 539.69, 547.26], 'YTD': [214.16, 203.17, 231.83, 252.03, 242.11, 213.58, 200.15, 200.21, 202.68, 196.58, 205.37, 210.21, 236.64, 278.39, 347.81, 341.54, 448.29, 414.05, 518.09, 523.2, 511.57, 519.85, 580.91, 546.72, 500.94, 547.26], '6M': [251.31, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 452.4, 512.48, 532.57, 517.82, 557.89, 495.76, 547.26], '1Y': [162.12, 176.31, 172.4, 180.95, 163.71, 168.58, 151.14, 155.67, 157.92, 161.27, 169.73, 232.89, 234.56, 234.99, 254.84, 237.7, 247.96, 206.02, 217.53, 217.97, 221.43, 201.06, 214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 518.09, 523.2, 452.4, 512.48, 532.57, 517.82, 557.89, 495.76, 547.26] },
      velocityScore: { '1D': 1.2, '1W': 1.2, '1M': 4.8, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 181.2, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { PTF: 3.15, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.35, MARS: false, FRWD: 7.38, BCTK: 3.34, FWD: 2.3, CBSE: false, FCUS: false, WGMI: false, CNEQ: 1.28, SGRT: 3.57, SPMO: 4.44, XMMO: false },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'WDC', name: 'Western Digital Corp', easyScore: 7, avgWeight: 4.92, proScore: 2.02, coverage: 0.412,
      price: 548.92, weeklyPrices: [487.42, 548.39, 556.67, 558.30, 548.92], weeklyChange: 12.62, dayChange: -1.68, sortRank: 0, periodReturns: { '1M': -14.7, 'YTD': 218.6, '6M': 132.2, '1Y': 695.3 },
      priceHistory: { '1D': [558.3, 549.06, 548.92], '1W': [487.42, 548.39, 556.67, 558.3, 548.92], '1M': [643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 532.1, 550.3, 582.59, 555.55, 563.32, 513.84, 466.81, 477.22, 487.42, 548.39, 556.67, 558.3, 548.92], 'YTD': [172.27, 200.46, 221.51, 252.66, 290.24, 273.74, 285.52, 279.7, 262.06, 286.21, 301.05, 297.73, 337.88, 372.52, 404, 442.36, 488.74, 455.8, 531.18, 575.5, 562.93, 670.75, 638.72, 578.05, 466.81, 548.92], '6M': [240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 390.99, 465.26, 488.74, 455.8, 530.6, 594.11, 490.09, 712.13, 675.39, 539, 582.59, 477.22, 548.92], '1Y': [69.02, 78.69, 74.44, 76.24, 74.66, 82.04, 92.04, 96.15, 105.15, 107.21, 131.26, 119.7, 125.92, 125.72, 138.13, 163.6, 157.16, 140.23, 163.33, 168.89, 187.2, 175.01, 181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 459.62, 531.18, 575.5, 490.09, 712.13, 675.39, 539, 582.59, 477.22, 548.92] },
      velocityScore: { '1D': 3.1, '1W': 7.4, '1M': -12.9, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 32.9, revenueGrowth: 46, eps: 16.69, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { PTF: 4.47, WCLD: false, IGV: false, FDTX: 4.49, GTEK: false, ARKK: false, MARS: false, FRWD: 4.07, BCTK: false, FWD: false, CBSE: false, FCUS: 3.94, WGMI: false, CNEQ: 4.78, SGRT: 10.81, SPMO: 1.86, XMMO: false },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', easyScore: 7, avgWeight: 4.37, proScore: 1.8, coverage: 0.412,
      price: 412.09, weeklyPrices: [402.30, 424.61, 421.21, 415.58, 412.09], weeklyChange: 2.43, dayChange: -0.82, sortRank: 0, periodReturns: { '1M': -6.5, 'YTD': 35.6, '6M': 23.1, '1Y': 70.6 },
      priceHistory: { '1D': [415.49, 412.3, 412.09], '1W': [402.3, 424.61, 421.21, 415.58, 412.09], '1M': [440.83, 434.99, 432.35, 455.1, 477.57, 444.23, 434.16, 451.79, 432.57, 436.98, 434.11, 421.58, 420.39, 419.48, 409.74, 398.37, 402.3, 424.61, 421.21, 415.58, 412.09], 'YTD': [303.89, 323.63, 342.4, 338.34, 335.75, 374.09, 370.54, 374.58, 348.7, 340.23, 343.25, 341.49, 365.49, 370.5, 402.46, 401.61, 397.28, 392.61, 424.86, 444.92, 423.93, 436.39, 477.57, 436.96, 409.74, 412.09], '6M': [332.71, 341.36, 355.41, 364.2, 385.75, 353.13, 347.09, 345.98, 343.25, 337.95, 365.9, 375.1, 387.44, 392.34, 394.41, 397.28, 392.61, 422.73, 436.69, 408.75, 432.15, 434.99, 434.16, 434.11, 398.37, 412.09], '1Y': [241.6, 241.62, 242.62, 241, 227.33, 238.27, 243.41, 258.91, 268.64, 276.66, 288.11, 299.88, 299.84, 290.73, 303.22, 289.24, 282.2, 277.5, 291.51, 294.72, 304.85, 284.68, 302.84, 322.25, 331.77, 327.16, 338.34, 335.75, 361.91, 362.26, 387.73, 357.44, 347.09, 345.98, 343.25, 337.95, 365.9, 375.1, 387.44, 393.83, 419.5, 399.8, 401.62, 424.86, 444.92, 408.75, 432.15, 434.99, 434.16, 434.11, 398.37, 412.09] },
      velocityScore: { '1D': 0, '1W': 0.6, '1M': -0.6, '6M': null }, isNew: false,
      marketCap: '$2.1T', pe: 36.2, revenueGrowth: 36, eps: 11.39, grossMargin: 64, dividendYield: 0.91,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 6.39, GTEK: false, ARKK: 0.96, MARS: false, FRWD: 5.89, BCTK: 8.39, FWD: false, CBSE: 2.57, FCUS: false, WGMI: 0.67, CNEQ: 5.71, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'TSMC is the essential picks-and-shovels play in AI hardware, held by 4 AI ETFs at 4.23% average weight. Revenue up 35%, gross margin 62%, P/E 36x — the cleanest risk-adjusted fundamental profile in the semiconductor space. Geopolitical risk is the discount the market applies; the ETF weights say institutional managers are accepting it.',
    },
    {
      ticker: 'SPCX', name: 'SPACE EXPLORATION TECHN-CL A', easyScore: 6, avgWeight: 6.33, proScore: 2.23, coverage: 0.353,
      price: 115.7, weeklyPrices: [119.85, 123.54, 115.26, 118.24, 115.70], weeklyChange: -3.46, dayChange: -2.15, sortRank: 0, periodReturns: { '1M': -25.1, 'YTD': -28.1, '6M': -28.1, '1Y': -28.1 },
      priceHistory: { '1D': [118.24, 115.6, 115.7], '1W': [119.85, 123.54, 115.26, 118.24, 115.7], '1M': [154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 148.3, 145.3, 139.14, 136.08, 135.27, 131.11, 123.99, 119.85, 123.54, 115.26, 118.24, 115.7], 'YTD': [160.95, 192.5, 211.39, 191.82, 185, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 149.47, 148.3, 152.16, 145.3, 139.14, 136.08, 135.27, 131.11, 119.85, 123.54, 115.26, 118.24, 115.7], '6M': [160.95, 192.5, 211.39, 191.82, 185, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 149.47, 148.3, 152.16, 145.3, 139.14, 136.08, 135.27, 131.11, 119.85, 123.54, 115.26, 118.24, 115.7], '1Y': [160.95, 192.5, 211.39, 191.82, 185, 154.6, 156.11, 154.54, 153, 153.23, 164.19, 170.86, 157.54, 162, 160.42, 149.47, 148.3, 152.16, 145.3, 139.14, 136.08, 135.27, 131.11, 123.99, 119.85, 123.54, 115.26, 118.24, 115.7] },
      velocityScore: { '1D': 2.3, '1W': -5.5, '1M': -10.8, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: null, revenueGrowth: 15, eps: -0.69, grossMargin: 49, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: 4.66, MARS: 20.69, FRWD: 2.06, BCTK: 7.04, FWD: 1.35, CBSE: false, FCUS: false, WGMI: false, CNEQ: 2.15, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'SPACE EXPLORATION TECHN-CL A appears in 6 of 17 Broad Tech ETFs (35% coverage) with average weight 6.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AMZN', name: 'Amazon.com Inc', easyScore: 6, avgWeight: 3.23, proScore: 1.14, coverage: 0.353,
      price: 233.54, weeklyPrices: [249.99, 247.55, 244.85, 233.66, 233.54], weeklyChange: -6.58, dayChange: -0.05, sortRank: 0, periodReturns: { '1M': -0.3, 'YTD': 1.2, '6M': -2.3, '1Y': 0.6 },
      priceHistory: { '1D': [233.66, 233.43, 233.54], '1W': [249.99, 247.55, 244.85, 233.66, 233.54], '1M': [234.27, 227.01, 232.69, 240.14, 238.34, 241.7, 242.67, 244.16, 245.98, 243.62, 245.34, 247.31, 247.49, 254.96, 249.89, 247.23, 249.99, 247.55, 244.85, 233.66, 233.54], 'YTD': [230.82, 247.38, 239.12, 244.68, 238.62, 204.08, 210.11, 210, 213.49, 211.74, 207.24, 210.57, 233.65, 250.56, 263.99, 272.05, 265.82, 259.34, 274, 253.79, 238.55, 234.11, 238.34, 247.04, 249.89, 233.54], '6M': [238.42, 242.96, 208.72, 201.15, 208.56, 208.73, 214.33, 215.2, 207.24, 208.27, 221.25, 248.5, 255.36, 259.7, 273.55, 265.82, 259.34, 271.85, 250.02, 238, 237.5, 227.01, 242.67, 245.34, 247.23, 233.54], '1Y': [232.23, 234.11, 223.13, 230.98, 221.95, 231.6, 232.33, 229.95, 231.23, 218.15, 222.41, 227.74, 214.47, 221.09, 222.86, 243.04, 237.58, 217.14, 233.22, 229.53, 230.28, 226.76, 232.52, 233.06, 246.47, 231, 244.68, 238.62, 206.96, 204.79, 210.64, 216.82, 214.33, 215.2, 207.24, 208.27, 221.25, 248.5, 255.36, 263.04, 274.99, 270.13, 265.01, 274, 253.79, 238, 237.5, 227.01, 242.67, 245.34, 247.23, 233.54] },
      velocityScore: { '1D': -0.9, '1W': -0.9, '1M': 17.5, '6M': null }, isNew: false,
      marketCap: '$2.5T', pe: 27.9, revenueGrowth: 17, eps: 8.37, grossMargin: 51, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.29, GTEK: false, ARKK: 2.5, MARS: false, FRWD: 3.26, BCTK: 4.68, FWD: 1.67, CBSE: false, FCUS: false, WGMI: false, CNEQ: 3.96, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Amazon is a selective AI holding — 3 of 8 ETFs, 4.7% average weight — positioned on AWS rather than hardware. Revenue growth of 17% looks modest against pure-play AI names, but 51% gross margin and a $2.9T market cap reflect the cloud platform advantage. The 32% 1-year return underperforms the theme; ETF managers hold it as a diversifier, not a conviction AI bet.',
    },
    {
      ticker: 'META', name: 'Meta Platforms Inc Class A', easyScore: 6, avgWeight: 2.24, proScore: 0.79, coverage: 0.353,
      price: 604.64, weeklyPrices: [645.85, 643.81, 627.17, 606.10, 604.64], weeklyChange: -6.38, dayChange: -0.24, sortRank: 0, periodReturns: { '1M': 8.4, 'YTD': -8.4, '6M': -8.2, '1Y': -15.4 },
      priceHistory: { '1D': [606.1, 604.49, 604.64], '1W': [645.85, 643.81, 627.17, 606.1, 604.64], '1M': [557.67, 542.87, 550.25, 562.6, 563.29, 612.91, 582.9, 600.29, 615.58, 603.12, 669.21, 656.73, 661.04, 681.31, 664.54, 646.01, 645.85, 643.81, 627.17, 606.1, 604.64], 'YTD': [660.09, 653.06, 620.25, 672.97, 691.7, 668.69, 655.66, 648.18, 647.39, 627.45, 592.92, 579.23, 628.39, 688.55, 675.03, 610.41, 603, 602.61, 635.29, 627.57, 566.98, 562.2, 563.29, 631.48, 664.54, 604.64], '6M': [672.36, 706.41, 677.22, 639.29, 639.3, 655.08, 654.07, 622.66, 592.92, 572.13, 612.42, 671.58, 674.72, 671.34, 604.96, 603, 602.61, 635.26, 622.98, 570.98, 567.58, 542.87, 582.9, 669.21, 646.01, 604.64], '1Y': [714.8, 773.44, 761.83, 782.13, 739.1, 751.11, 752.45, 750.9, 780.25, 748.91, 727.05, 733.51, 712.07, 734, 666.47, 618.94, 609.89, 589.15, 647.95, 673.42, 652.71, 664.45, 663.29, 658.79, 641.97, 604.12, 672.97, 691.7, 670.72, 643.22, 653.69, 667.73, 654.07, 622.66, 592.92, 572.13, 612.42, 671.58, 674.72, 669.12, 612.88, 616.63, 605.06, 635.29, 627.57, 570.98, 567.58, 542.87, 582.9, 669.21, 646.01, 604.64] },
      velocityScore: { '1D': -1.2, '1W': 16.2, '1M': null, '6M': null }, isNew: false,
      marketCap: '$1.5T', pe: 22, revenueGrowth: 33, eps: 27.52, grossMargin: 82, dividendYield: 0.33,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.36, GTEK: false, ARKK: 1.47, MARS: false, FRWD: false, BCTK: 1.17, FWD: 1.19, CBSE: 3.87, FCUS: false, WGMI: false, CNEQ: 3.4, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Meta holds a 3.76% average weight across 4 AI ETFs, with the highest EPS in the theme at $27.51 and an 82% gross margin. Revenue grew 33% and the P/E of 23x is the most attractive valuation in the group. The 1-year return of -2.3% is a red flag — the market is not rewarding the AI capex story yet, and the weight score reflects moderate rather than high conviction.',
    },
    {
      ticker: 'STX', name: 'Seagate Technology Holdings PLC', easyScore: 5, avgWeight: 4.26, proScore: 1.25, coverage: 0.294,
      price: 899.96, weeklyPrices: [802.45, 891.83, 908.10, 913.36, 899.96], weeklyChange: 12.15, dayChange: -1.47, sortRank: 0, periodReturns: { '1M': -9.4, 'YTD': 226.8, '6M': 160, '1Y': 489.2 },
      priceHistory: { '1D': [913.36, 901.96, 899.96], '1W': [802.45, 891.83, 908.1, 913.36, 899.96], '1M': [993.25, 1025.36, 899.9, 968.53, 965, 915.19, 820.16, 868.26, 827.64, 860.02, 910.34, 860.66, 878.31, 828.3, 745.49, 787.66, 802.45, 891.83, 908.1, 913.36, 899.96], 'YTD': [275.39, 304.01, 326.23, 371.76, 444.45, 407.25, 411.11, 407.84, 374.33, 398.78, 424.96, 423.12, 500.77, 547.75, 586.25, 738.54, 808.8, 733.35, 880.72, 925.99, 931.04, 1038.59, 965, 890.09, 745.49, 899.96], '6M': [358.29, 432.95, 425, 415.94, 396.02, 357.62, 384.29, 421.09, 424.96, 391.76, 496.3, 519.6, 579.88, 579.03, 771.01, 808.8, 733.35, 870.66, 940.69, 815.99, 1066.07, 1025.36, 820.16, 910.34, 787.66, 899.96], '1Y': [152.73, 157.01, 148.1, 155.73, 154.6, 172.38, 188.16, 196.81, 216.64, 219.85, 254.74, 221.7, 226.03, 226.41, 268.34, 278.47, 262.56, 240.5, 276.69, 278.79, 307.85, 292, 286.22, 289.83, 321.48, 325.99, 371.76, 444.45, 396.23, 424.14, 421.85, 375.01, 384.29, 421.09, 424.96, 391.76, 496.3, 519.6, 579.88, 643.3, 786.42, 817.35, 751.07, 880.72, 925.99, 815.99, 1066.07, 1025.36, 820.16, 910.34, 787.66, 899.96] },
      velocityScore: { '1D': 0.8, '1W': 2.5, '1M': -15.5, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 85.7, revenueGrowth: 44, eps: 10.5, grossMargin: 42, dividendYield: 0.32,
      etfPresence: { PTF: 4.12, WCLD: false, IGV: false, FDTX: 4.14, GTEK: false, ARKK: false, MARS: false, FRWD: 6.96, BCTK: false, FWD: false, CBSE: false, FCUS: 4.13, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.95, XMMO: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'GOOG', name: 'Alphabet Inc Class C', easyScore: 5, avgWeight: 4.14, proScore: 1.22, coverage: 0.294,
      price: 320.13, weeklyPrices: [351.37, 346.19, 341.91, 318.34, 320.13], weeklyChange: -8.89, dayChange: 0.56, sortRank: 0, periodReturns: { '1M': -7.2, 'YTD': 2, '6M': -2.5, '1Y': 65.7 },
      priceHistory: { '1D': [318.34, 319.7, 320.13], '1W': [351.37, 346.19, 341.91, 318.34, 320.13], '1M': [345.04, 342.19, 334.69, 351.28, 353.33, 357.89, 356.18, 364.9, 363.62, 358.71, 355.03, 350.67, 357.33, 370.21, 353.81, 346.12, 351.37, 346.19, 341.91, 318.34, 320.13], 'YTD': [313.8, 329.14, 330.34, 335, 340.7, 311.33, 314.9, 311.43, 306.01, 304.42, 289.2, 294.9, 316.37, 339.4, 342.32, 379.64, 383.82, 384.9, 386.12, 369.27, 358.16, 346.08, 353.33, 356.24, 353.81, 320.13], '6M': [333.59, 344.9, 324.4, 302.82, 310.92, 303.56, 306.93, 309.41, 289.2, 286.86, 314.74, 334.47, 337.73, 347.5, 384.27, 383.82, 384.9, 384.83, 355.68, 353.32, 362.1, 342.19, 356.18, 355.03, 346.12, 320.13], '1Y': [193.2, 192.86, 197.28, 203.82, 200.62, 212.37, 235.17, 240.78, 252.33, 246.57, 246.43, 242.21, 251.88, 253.73, 281.9, 285.34, 279.12, 289.98, 320.12, 322.09, 313.7, 303.75, 314.96, 317.32, 332.73, 322.16, 335, 340.7, 318.63, 303.94, 313.03, 303.45, 306.93, 309.41, 289.2, 286.86, 314.74, 334.47, 337.73, 347.31, 395.14, 399.04, 384.9, 386.12, 369.27, 353.32, 362.1, 342.19, 356.18, 355.03, 346.12, 320.13] },
      velocityScore: { '1D': -2.4, '1W': -2.4, '1M': 2.5, '6M': null }, isNew: false,
      marketCap: '$3.9T', pe: 16.1, revenueGrowth: 24, eps: 19.93, grossMargin: 61, dividendYield: 0.26,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 3.21, GTEK: false, ARKK: 1.83, MARS: false, FRWD: false, BCTK: 6.71, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 5.48, SGRT: false, SPMO: 3.47, XMMO: false },
      tonyNote: 'Alphabet Inc Class C appears in 5 of 17 Broad Tech ETFs (29% coverage) with average weight 4.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MSFT', name: 'MICROSOFT CORP', easyScore: 4, avgWeight: 5.3, proScore: 1.25, coverage: 0.235,
      price: 385.76, weeklyPrices: [402.29, 397.75, 390.34, 381.58, 385.76], weeklyChange: -4.11, dayChange: 1.1, sortRank: 0, periodReturns: { '1M': 5.6, 'YTD': -20.2, '6M': -17.2, '1Y': -24.5 },
      priceHistory: { '1D': [381.58, 385.33, 385.76], '1W': [402.29, 397.75, 390.34, 381.58, 385.76], '1M': [365.46, 352.83, 372.97, 368.57, 373.02, 384.28, 390.49, 386.74, 388.84, 383.34, 385.1, 390.99, 384.93, 395.63, 401.1, 393.82, 402.29, 397.75, 390.34, 381.58, 385.76], 'YTD': [483.62, 479.28, 459.86, 480.58, 411.21, 404.37, 397.23, 392.74, 409.41, 399.95, 372.74, 369.37, 373.07, 422.79, 424.62, 413.62, 407.77, 417.42, 426.99, 428.05, 390.74, 373.94, 373.02, 384.36, 401.1, 385.76], '6M': [470.28, 423.37, 413.6, 396.86, 389, 403.93, 405.76, 399.41, 372.74, 370.17, 374.33, 411.22, 432.92, 429.25, 411.38, 407.77, 417.42, 412.67, 427.34, 397.36, 378.91, 352.83, 390.49, 385.1, 393.82, 385.76], '1Y': [510.88, 533.5, 520.84, 522.48, 504.24, 509.64, 495, 501.01, 508.45, 507.03, 515.74, 522.4, 511.61, 520.56, 525.76, 497.1, 503.29, 478.43, 492.01, 483.16, 483.47, 483.98, 487.71, 472.85, 477.18, 454.52, 480.58, 411.21, 413.27, 399.6, 400.6, 405.2, 405.76, 399.41, 372.74, 370.17, 374.33, 411.22, 432.92, 424.46, 413.96, 405.21, 421.06, 426.99, 428.05, 397.36, 378.91, 352.83, 390.49, 385.1, 393.82, 385.76] },
      velocityScore: { '1D': 0, '1W': 0.8, '1M': 0, '6M': null }, isNew: false,
      marketCap: '$2.9T', pe: 23, revenueGrowth: 18, eps: 16.79, grossMargin: 68, dividendYield: 0.95,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.58, FDTX: 2.93, GTEK: false, ARKK: false, MARS: false, FRWD: 3.3, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: 6.38, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Microsoft appears in 4 of 8 AI ETFs and 2 Broad Tech ETFs at 3.7% average weight. Revenue up 18%, 68% gross margin, P/E of 27x — solid fundamentals for a $3.3T business. The -2.2% 1-year return and -8.5% 6-month return suggest the Copilot monetization narrative has stalled; ETF managers hold the position on long-term Azure and OpenAI leverage, not near-term momentum.',
    },
    {
      ticker: 'PANW', name: 'Palo Alto Networks', easyScore: 4, avgWeight: 4.67, proScore: 1.1, coverage: 0.235,
      price: 327.26, weeklyPrices: [348.66, 342.15, 335.28, 325.63, 327.26], weeklyChange: -6.14, dayChange: 0.5, sortRank: 0, periodReturns: { '1M': 14.7, 'YTD': 77.7, '6M': 81.6, '1Y': 62.7 },
      priceHistory: { '1D': [325.63, 328.97, 327.26], '1W': [348.66, 342.15, 335.28, 325.63, 327.26], '1M': [285.26, 293.09, 304.2, 332, 341.02, 352.04, 348.06, 357.53, 337.04, 320.59, 325.91, 330.3, 352.89, 354.02, 353.99, 358.68, 348.66, 342.15, 335.28, 325.63, 327.26], 'YTD': [184.2, 189.02, 187.66, 183.5, 166.24, 165.3, 148.7, 148.92, 165.1, 167.45, 157.21, 160.67, 166.99, 167.85, 178.54, 184.56, 215.6, 240.13, 257.77, 279.25, 279.62, 290.92, 341.02, 338.31, 353.99, 327.26], '6M': [184.22, 175.42, 166, 163.5, 141.67, 156.09, 165.58, 169.19, 157.21, 160.32, 173.78, 164.11, 181.2, 180.99, 183.98, 215.6, 240.13, 248.47, 280.43, 263.22, 282.13, 293.09, 348.06, 325.91, 358.68, 327.26], '1Y': [201.16, 173.6, 168.1, 173.55, 183.32, 191.02, 194.46, 198.33, 205.68, 202.21, 209.3, 215.17, 205.51, 215.02, 218.27, 211.37, 204.77, 185.07, 190.13, 198.84, 190.36, 185.88, 188.45, 182.12, 188.88, 184.06, 183.5, 166.24, 165.51, 152.35, 144.84, 158.56, 165.58, 169.19, 157.21, 160.32, 173.78, 164.11, 181.2, 181.54, 183.68, 227.79, 246.66, 257.77, 279.25, 263.22, 282.13, 293.09, 348.06, 325.91, 358.68, 327.26] },
      velocityScore: { '1D': 0, '1W': 0, '1M': 12.2, '6M': null }, isNew: false,
      marketCap: '$267B', pe: 287.1, revenueGrowth: 31, eps: 1.14, grossMargin: 72, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.86, IGV: 10.29, FDTX: 4.15, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.39, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Palo Alto Networks is the cybersecurity AI name held in Broad Tech ETFs. Revenue grew at a strong rate, gross margin is high for a security platform business, and the platformization strategy is gaining traction. The weight score reflects a steady institutional allocation to AI-driven security infrastructure.',
    },
    {
      ticker: 'LRCX', name: 'LRCX', easyScore: 4, avgWeight: 4.5, proScore: 1.06, coverage: 0.235,
      price: 318.28, weeklyPrices: [306.76, 322.00, 319.29, 319.78, 318.28], weeklyChange: 3.76, dayChange: -0.47, sortRank: 0, periodReturns: { '1M': -15.1, 'YTD': 85.9, '6M': 46, '1Y': 225.5 },
      priceHistory: { '1D': [319.78, 319.04, 318.28], '1W': [306.76, 322, 319.29, 319.78, 318.28], '1M': [374.8, 401.82, 379.09, 410.91, 433.33, 391.26, 351.41, 350.2, 326.13, 333.15, 350.33, 329.92, 346.1, 335.43, 320.96, 313.3, 306.76, 322, 319.29, 319.78, 318.28], 'YTD': [171.18, 218.36, 222.96, 238.46, 230.1, 235.12, 244.92, 233.89, 211.15, 219.4, 238.84, 222.01, 258.76, 267.6, 267.78, 258.57, 289.24, 273.38, 318, 336.41, 366.81, 371.33, 433.33, 353.17, 320.96, 318.28], '6M': [222.87, 237.5, 229.28, 235.58, 244.25, 217.27, 215.23, 226.47, 238.84, 213.66, 246.49, 265.16, 265.55, 251.23, 275.8, 289.24, 273.38, 318.93, 343.71, 321.8, 374.18, 401.82, 351.41, 350.33, 313.3, 318.28], '1Y': [97.78, 94.84, 99.15, 107.38, 98.41, 104.09, 102.95, 115.58, 126.32, 128.13, 146.99, 141, 142.37, 147.54, 161.01, 162.19, 153.32, 139.59, 156, 158.7, 168.71, 164.7, 178.07, 194.76, 220.4, 222.41, 238.46, 230.1, 226.61, 240.09, 249.48, 222.99, 215.23, 226.47, 238.84, 213.66, 246.49, 265.16, 265.55, 248.75, 297.17, 295.44, 292.09, 318, 336.41, 321.8, 374.18, 401.82, 351.41, 350.33, 313.3, 318.28] },
      velocityScore: { '1D': 0, '1W': -17.2, '1M': -23.2, '6M': null }, isNew: false,
      marketCap: '$398B', pe: 60.3, revenueGrowth: 24, eps: 5.28, grossMargin: 50, dividendYield: 0.33,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: 5.38, BCTK: 7.18, FWD: 1.87, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 3.56, XMMO: false },
      tonyNote: 'Lam Research is a wafer fab equipment holding, appearing in 2 Semiconductor ETFs. Its positioning is tied to the same logic as AMAT — equipment spending follows leading-edge node transitions and memory capacity additions. The gross margin and revenue profile are consistent with the duopoly pricing power that LRCX and AMAT share in etch and deposition equipment.',
    },
    {
      ticker: 'DELL', name: 'Dell Technologies Inc', easyScore: 4, avgWeight: 3.84, proScore: 0.9, coverage: 0.235,
      price: 445.23, weeklyPrices: [381.88, 404.15, 441.80, 439.34, 445.23], weeklyChange: 16.59, dayChange: 1.42, sortRank: 0, periodReturns: { '1M': 2.6, 'YTD': 253.7, '6M': 285.7, '1Y': 246.9 },
      priceHistory: { '1D': [439, 446.35, 445.23], '1W': [381.88, 404.15, 441.8, 439.34, 445.23], '1M': [434.06, 409.45, 399.49, 414.61, 431.46, 425.25, 394.32, 411.8, 417.28, 431.97, 434.97, 427.11, 457.54, 412.68, 391.38, 396.34, 381.88, 404.15, 441.8, 439.34, 445.23], 'YTD': [125.88, 120.62, 120.53, 114.66, 117.15, 124.16, 122.27, 148.08, 146.51, 156.54, 176.91, 169.38, 181.46, 196.55, 216.09, 211.64, 238.94, 235.26, 317.05, 422.05, 395.57, 427.78, 431.46, 450.22, 391.38, 445.23], '6M': [115.93, 119.16, 120.91, 116.09, 119.78, 145.18, 143.8, 153.01, 176.91, 164.13, 185.47, 177.28, 214.65, 205.93, 216.32, 238.94, 235.26, 305.32, 421.08, 369.83, 419.32, 409.45, 394.32, 434.97, 396.34, 445.23], '1Y': [128.35, 132.69, 133.93, 138.86, 127.83, 134.05, 124.83, 125.37, 132.11, 130.96, 147.37, 155.95, 151.31, 154.23, 161.01, 149.18, 133.94, 117.4, 133.35, 138.91, 138.6, 122.94, 129.24, 124.01, 120.47, 111.07, 114.66, 117.15, 126.01, 116.78, 123.48, 147.1, 143.8, 153.01, 176.91, 164.13, 185.47, 177.28, 214.65, 205.66, 238.8, 243.87, 242.93, 317.05, 422.05, 369.83, 419.32, 409.45, 394.32, 434.97, 396.34, 445.23] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$288B', pe: 35.4, revenueGrowth: 88, eps: 12.57, grossMargin: 19, dividendYield: 0.57,
      etfPresence: { PTF: 3.03, WCLD: false, IGV: false, FDTX: false, GTEK: 2.42, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: 4.63, WGMI: false, CNEQ: false, SGRT: 5.3, SPMO: false, XMMO: false },
      tonyNote: 'Dell Technologies Inc appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.8% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'PLTR', name: 'PALANTIR TECHNOLOGIES INC CLASS A', easyScore: 4, avgWeight: 3.65, proScore: 0.86, coverage: 0.235,
      price: 123.85, weeklyPrices: [134.85, 132.66, 124.57, 123.37, 123.85], weeklyChange: -8.16, dayChange: 0.39, sortRank: 0, periodReturns: { '1M': 9.1, 'YTD': -30.3, '6M': -27, '1Y': -20 },
      priceHistory: { '1D': [123.37, 123.67, 123.85], '1W': [134.85, 132.66, 124.57, 123.37, 123.85], '1M': [113.5, 107.27, 112.93, 115.7, 116.67, 125.73, 129.3, 132.54, 134.37, 132.22, 126.79, 130.04, 133.72, 133.76, 134.44, 132.38, 134.85, 132.66, 124.57, 123.37, 123.85], 'YTD': [177.75, 177.49, 170.96, 165.7, 157.88, 135.68, 135.24, 137.19, 156.43, 152.72, 154.78, 146.49, 130.49, 146.39, 143.09, 146.03, 136, 135.26, 143.34, 141.7, 127.99, 116.7, 116.67, 129.04, 134.44, 123.85], '6M': [167.47, 147.76, 142.91, 133.02, 128.84, 147.22, 151.14, 155.08, 154.78, 146.28, 140.76, 142.15, 152.62, 141.18, 135.91, 136, 135.26, 132.51, 142.2, 130.21, 130.63, 107.27, 129.3, 126.79, 132.38, 123.85], '1Y': [154.86, 158.35, 182.2, 181.02, 156.18, 158.12, 153.11, 164.36, 176.97, 179.12, 187.05, 185.47, 178.12, 180.48, 194.55, 175.05, 172.14, 155.74, 168.45, 181.76, 187.54, 185.69, 188.71, 174.04, 179.41, 168.53, 165.7, 157.88, 139.51, 135.38, 134.19, 153.19, 151.14, 155.08, 154.78, 146.28, 140.76, 142.15, 152.62, 137.97, 133.79, 130.05, 137.15, 143.34, 141.7, 130.21, 130.63, 107.27, 129.3, 126.79, 132.38, 123.85] },
      velocityScore: { '1D': 0, '1W': -2.3, '1M': 1.2, '6M': null }, isNew: false,
      marketCap: '$297B', pe: 139.2, revenueGrowth: 85, eps: 0.89, grossMargin: 84, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: 8.46, FDTX: 2, GTEK: false, ARKK: 3.01, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: 1.11, XMMO: false },
      tonyNote: 'Palantir appears in AI, Broad Tech, and Meme ETFs — one of the most cross-theme names on the board. Revenue grows at a mid-20s rate, but the P/E is extremely elevated and the government contract dependency is a concentration risk. Institutional ETF managers hold it at modest weights as a thematic AI exposure; the Meme theme holds it because the retail narrative around Palantir is as strong as any name in the market.',
    },
    {
      ticker: 'CRWD', name: 'CrowdStrike', easyScore: 4, avgWeight: 3.11, proScore: 0.73, coverage: 0.235,
      price: 184, weeklyPrices: [198.49, 191.15, 188.42, 183.42, 184.00], weeklyChange: -7.3, dayChange: 0.32, sortRank: 0, periodReturns: { '1M': 9.4, 'YTD': 57, '6M': 62.7, '1Y': 59.3 },
      priceHistory: { '1D': [183.42, 184.04, 184], '1W': [198.49, 191.15, 188.42, 183.42, 184], '1M': [168.26, 169.66, 175.27, 185.73, 190.79, 193.18, 193.98, 199.38, 194.62, 191.12, 187.18, 187.91, 210.73, 206.77, 203.76, 203.08, 198.49, 191.15, 188.42, 183.42, 184], 'YTD': [117.19, 117.65, 113.47, 119.17, 105.43, 103.95, 97.15, 93, 108.53, 105.96, 98.25, 98.33, 98.67, 105.99, 112.03, 117.31, 136.54, 154.22, 167.75, 179.77, 170.7, 170.23, 190.79, 198.4, 203.76, 184], '6M': [117.08, 109.71, 102.01, 103.57, 87.56, 97.86, 109.08, 108.3, 98.25, 97.6, 106.63, 102.79, 116.67, 113.75, 119.13, 136.54, 154.22, 161.34, 186.9, 161.93, 170.74, 169.66, 193.98, 187.18, 203.08, 184], '1Y': [115.51, 113.64, 106.25, 106.21, 103.51, 110.5, 104.41, 108.35, 125.66, 118.27, 124.2, 127.28, 120.56, 130.49, 134.67, 133.13, 132.45, 125.33, 127.29, 128.01, 129.41, 119.32, 120.3, 114.14, 116.75, 110.68, 119.17, 105.43, 103.35, 103.94, 90.83, 101.92, 109.08, 108.3, 98.25, 97.6, 106.63, 102.79, 116.67, 113.1, 117.02, 140.64, 162.53, 167.75, 179.77, 161.93, 170.74, 169.66, 193.98, 187.18, 203.08, 184] },
      velocityScore: { '1D': 0, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$187B', pe: null, revenueGrowth: 26, eps: -0.04, grossMargin: 75, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.5, IGV: 7.28, FDTX: 1.21, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: 1.46, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'CrowdStrike appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.1% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk Corp', easyScore: 4, avgWeight: 3.09, proScore: 0.73, coverage: 0.235,
      price: 1558.12, weeklyPrices: [1390.95, 1589.40, 1599.27, 1610.33, 1558.12], weeklyChange: 12.02, dayChange: -3.24, sortRank: 0, periodReturns: { '1M': -18.6, 'YTD': 556.4, '6M': 228.8, '1Y': 3604.5 },
      priceHistory: { '1D': [1610.33, 1565.38, 1558.12], '1W': [1390.95, 1589.4, 1599.27, 1610.33, 1558.12], '1M': [1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745, 1744.43, 1617.7, 1727.18, 1915.92, 1673.97, 1757.82, 1615, 1411.08, 1354.82, 1390.95, 1589.4, 1599.27, 1610.33, 1558.12], 'YTD': [237.38, 377.41, 413.62, 481.43, 695.51, 599.34, 649.97, 635.36, 588.73, 703.63, 702.48, 692.73, 851.57, 920.99, 989.9, 1255.86, 1452.02, 1383.29, 1641.64, 1759.68, 1980.1, 1963.6, 2273.73, 1858.27, 1411.08, 1558.12], '6M': [470.8, 665.24, 583.4, 590.59, 638.52, 565.41, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1831.5, 1643.23, 1958.8, 2335, 1745, 1915.92, 1354.82, 1558.12], '1Y': [42.06, 42.92, 40.69, 46.68, 45.5, 50.87, 68.55, 84.3, 98.87, 94.29, 124.14, 129.68, 144.27, 167.05, 195.82, 207.69, 243.57, 195.96, 223.28, 228.47, 241.61, 219.46, 250.05, 274.08, 389.27, 453.12, 481.43, 695.51, 541.64, 600.4, 632.38, 599.06, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1392.56, 1641.64, 1759.68, 1643.23, 1958.8, 2335, 1745, 1915.92, 1354.82, 1558.12] },
      velocityScore: { '1D': 2.8, '1W': -2.7, '1M': -33, '6M': null }, isNew: false,
      marketCap: '$231B', pe: 53.2, revenueGrowth: 251, eps: 29.31, grossMargin: 56, dividendYield: null,
      etfPresence: { PTF: 4.95, WCLD: false, IGV: false, FDTX: false, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: 1.58, CBSE: false, FCUS: 3.51, WGMI: false, CNEQ: false, SGRT: false, SPMO: 2.33, XMMO: false },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'SHOP', name: 'Shopify Inc Registered Shs -A- Subord Vtg', easyScore: 4, avgWeight: 3.05, proScore: 0.72, coverage: 0.235,
      price: 113.25, weeklyPrices: [124.48, 123.03, 118.42, 112.00, 113.25], weeklyChange: -9.02, dayChange: 1.12, sortRank: 0, periodReturns: { '1M': -0.8, 'YTD': -29.6, '6M': -17.9, '1Y': -7.2 },
      priceHistory: { '1D': [112, 112.52, 113.25], '1W': [124.48, 123.03, 118.42, 112, 113.25], '1M': [114.17, 111.62, 116.86, 114.21, 114.18, 121.63, 119.46, 120.14, 121.88, 119.22, 122.54, 124.74, 125.68, 123.55, 125.06, 123.56, 124.48, 123.03, 118.42, 112, 113.25], 'YTD': [160.97, 164.48, 155.81, 137.5, 119.29, 118.71, 126.2, 120.73, 133.5, 126.58, 116.15, 118.52, 112.38, 131.15, 125.83, 127.55, 99.84, 101.01, 115.03, 116.04, 108.24, 107.68, 114.18, 123.17, 125.06, 113.25], '6M': [136.31, 132.2, 118.4, 113.54, 116.93, 121.87, 129.36, 127.8, 116.15, 118.62, 120.1, 127.41, 131.96, 122.05, 107.63, 99.84, 101.01, 106.6, 112.94, 108.2, 108.09, 111.62, 119.46, 122.54, 123.56, 113.25], '1Y': [122.08, 122.21, 151.07, 144.27, 136.68, 141.54, 146.82, 145.03, 152.11, 143.45, 151.3, 163.87, 156.57, 167.03, 173.61, 156.05, 146.34, 144.56, 158.64, 161.08, 164.75, 166.8, 170.83, 166.21, 167.93, 144.5, 137.5, 119.29, 127.24, 121.64, 120.31, 129.65, 129.36, 127.8, 116.15, 118.62, 120.1, 127.41, 131.96, 121.26, 105.44, 95.4, 105.01, 115.03, 116.04, 108.2, 108.09, 111.62, 119.46, 122.54, 123.56, 113.25] },
      velocityScore: { '1D': 0, '1W': -1.4, '1M': 9.1, '6M': null }, isNew: false,
      marketCap: '$147B', pe: 111, revenueGrowth: 34, eps: 1.02, grossMargin: 48, dividendYield: null,
      etfPresence: { PTF: false, WCLD: false, IGV: false, FDTX: 2.59, GTEK: false, ARKK: 4.21, MARS: false, FRWD: 2.31, BCTK: 3.09, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: false, SPMO: false, XMMO: false },
      tonyNote: 'Shopify Inc Registered Shs -A- Subord Vtg appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DDOG', name: 'DDOG', easyScore: 4, avgWeight: 2.99, proScore: 0.7, coverage: 0.235,
      price: 247.1, weeklyPrices: [263.20, 254.79, 245.77, 244.39, 247.10], weeklyChange: -6.12, dayChange: 1.11, sortRank: 0, periodReturns: { '1M': 11, 'YTD': 81.7, '6M': 89.9, '1Y': 68.6 },
      priceHistory: { '1D': [244.39, 246.4, 247.1], '1W': [263.2, 254.79, 245.77, 244.39, 247.1], '1M': [222.65, 220.94, 239.77, 248.57, 260.36, 264.48, 260.36, 255.37, 256.81, 261.09, 257.54, 260.24, 270.73, 264.46, 262.32, 258.69, 263.2, 254.79, 245.77, 244.39, 247.1], 'YTD': [135.99, 125.49, 119.02, 138.21, 119.66, 127.33, 115.66, 111.96, 128.56, 126.57, 122.57, 118.67, 108.98, 126.61, 129.48, 146.69, 199.94, 215.15, 225.24, 243.6, 229.9, 220.57, 260.36, 269, 262.32, 247.1], '6M': [136.64, 129.05, 114.01, 122.56, 104.43, 111.77, 123.08, 128.87, 122.57, 118.05, 116.5, 121.06, 132.14, 131.55, 145.73, 199.94, 215.15, 221.81, 250.33, 227.63, 226.63, 220.94, 260.36, 257.54, 258.69, 247.1], '1Y': [146.56, 139.98, 136.38, 124.52, 129.15, 140.96, 136.08, 139.15, 136.81, 136.6, 151.57, 164.07, 151.17, 156.59, 157.07, 190.82, 185.97, 159.57, 160.01, 151.41, 149.9, 138.29, 138.32, 133.64, 126.57, 117, 138.21, 119.66, 129.67, 121.78, 110.33, 118.33, 123.08, 128.87, 122.57, 118.05, 116.5, 121.06, 132.14, 133.98, 143.71, 205.31, 212.24, 225.24, 243.6, 227.63, 226.63, 220.94, 260.36, 257.54, 258.69, 247.1] },
      velocityScore: { '1D': -4.1, '1W': -1.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$88B', pe: 633.6, revenueGrowth: 32, eps: 0.39, grossMargin: 80, dividendYield: null,
      etfPresence: { PTF: false, WCLD: 2.78, IGV: 3.18, FDTX: 2.39, GTEK: false, ARKK: false, MARS: false, FRWD: false, BCTK: false, FWD: false, CBSE: false, FCUS: false, WGMI: false, CNEQ: false, SGRT: 3.6, SPMO: false, XMMO: false },
      tonyNote: 'DDOG appears in 4 of 17 Broad Tech ETFs (24% coverage) with average weight 3.0% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Electrification ─────────────────────
  'Electrification': [
    {
      ticker: 'ETN', name: 'Eaton Corp PLC', easyScore: 3, avgWeight: 4.74, proScore: 2.84, coverage: 0.6,
      price: 410.71, weeklyPrices: [401.41, 402.95, 406.91, 415.13, 410.71], weeklyChange: 2.32, dayChange: -1.06, sortRank: 0, periodReturns: { '1M': 1.5, 'YTD': 28.9, '6M': 24, '1Y': 6.7 },
      priceHistory: { '1D': [415.1, 411.29, 410.71], '1W': [401.41, 402.95, 406.91, 415.13, 410.71], '1M': [404.59, 419.87, 402.68, 408.26, 426.12, 412.31, 398.52, 413.42, 395.68, 399.56, 407.28, 402.85, 415.52, 412.86, 396.27, 399.99, 401.41, 402.95, 406.91, 415.13, 410.71], 'YTD': [318.51, 324.51, 343.75, 341.19, 362.53, 396.09, 373.38, 375.92, 353.87, 361.04, 374.1, 365.56, 400.44, 406.21, 423.92, 422.44, 401.53, 371.88, 401.94, 418.61, 391.39, 405.28, 426.12, 405.83, 396.27, 410.71], '6M': [332.28, 359.44, 377.06, 391.49, 374.56, 355.56, 361.06, 363.95, 374.1, 357.67, 385.58, 395.06, 413.87, 413.07, 410.86, 401.53, 371.88, 406.37, 421.21, 375.46, 409.64, 419.87, 398.52, 407.28, 399.99, 410.71], '1Y': [384.9, 384.72, 360.16, 355.1, 345.38, 355.34, 349.03, 360.08, 371.27, 364.74, 376.76, 377.19, 375.59, 372.4, 383.09, 377.4, 354.07, 328.19, 345.89, 337.66, 350.36, 315.95, 322.17, 322.26, 329.1, 337.59, 341.19, 362.53, 377.47, 380.38, 373.53, 354.46, 361.06, 363.95, 374.1, 357.67, 385.58, 395.06, 413.87, 410.77, 421.39, 406.94, 379.69, 401.94, 418.61, 375.46, 409.64, 419.87, 398.52, 407.28, 399.99, 410.71] },
      velocityScore: { '1D': 0.7, '1W': 1.8, '1M': 7.2, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 40.2, revenueGrowth: 17, eps: 10.21, grossMargin: 37, dividendYield: 1.06,
      etfPresence: { POW: 4.39, VOLT: 5.61, PBD: false, PBW: false, IVEP: 4.22 },
      tonyNote: 'Eaton is the diversified power management company held in Industrials and Electrification ETFs. Revenue growth is steady, margins are strong, and the electrification thesis — grid upgrades, data center power, EV charging infrastructure — is well-served by Eaton\'s product breadth. The institutional weight reflects a quality-growth allocation, not a speculative bet.',
    },
    {
      ticker: 'PWR', name: 'Quanta Services Inc', easyScore: 3, avgWeight: 4.69, proScore: 2.81, coverage: 0.6,
      price: 651.49, weeklyPrices: [632.56, 639.20, 643.14, 653.80, 651.49], weeklyChange: 2.99, dayChange: -0.41, sortRank: 0, periodReturns: { '1M': -7.2, 'YTD': 54.4, '6M': 39, '1Y': 60 },
      priceHistory: { '1D': [654.16, 652.14, 651.49], '1W': [632.56, 639.2, 643.14, 653.8, 651.49], '1M': [701.88, 718.59, 687.87, 714.45, 720.04, 691.4, 668.31, 674.04, 656.79, 666.33, 658.56, 646.7, 660.94, 648.84, 631.02, 628.53, 632.56, 639.2, 643.14, 653.8, 651.49], 'YTD': [422.06, 422.57, 466.75, 479.27, 488.6, 523.96, 552.66, 563.08, 568.04, 574.02, 578.44, 560.12, 582.06, 601.88, 624.84, 757.34, 765.81, 714.13, 730.1, 719.17, 707.74, 702.29, 720.04, 668.17, 631.02, 651.49], '6M': [470.77, 477.77, 514.56, 525.13, 568.21, 566, 564.05, 571.64, 578.44, 549.02, 576.24, 591.82, 613.78, 630.94, 771.61, 765.81, 714.13, 733.62, 715.67, 650.92, 714.85, 718.59, 668.31, 658.56, 628.53, 651.49], '1Y': [407.22, 406.13, 387.35, 377.51, 378.21, 385.96, 372.5, 389.64, 390.65, 400.41, 420.86, 429.92, 437.52, 427.36, 453.83, 442.9, 426.93, 429.78, 464.88, 460.64, 466.91, 421.31, 432.67, 435.82, 432.66, 463.49, 479.27, 488.6, 510.64, 519.31, 562.77, 568.38, 564.05, 571.64, 578.44, 549.02, 576.24, 591.82, 613.78, 628.6, 785.24, 773.72, 709.93, 730.1, 719.17, 650.92, 714.85, 718.59, 668.31, 658.56, 628.53, 651.49] },
      velocityScore: { '1D': 0.4, '1W': 1.1, '1M': -0.7, '6M': null }, isNew: false,
      marketCap: '$98B', pe: 89, revenueGrowth: 26, eps: 7.32, grossMargin: 15, dividendYield: 0.07,
      etfPresence: { POW: 4.98, VOLT: 5.15, PBD: false, PBW: false, IVEP: 3.94 },
      tonyNote: 'Quanta Services is the electrical contractor building the grid infrastructure for AI data center power delivery and renewable energy connections. Revenue grew substantially, the business is diversified across utility, renewable, and industrial customers, and the backlog is multiyear. ETF managers hold it as a core Industrials pick alongside GEV and VRT in the AI power infrastructure basket.',
    },
    {
      ticker: 'NEE', name: 'NextEra Energy Inc', easyScore: 3, avgWeight: 3.94, proScore: 2.36, coverage: 0.6,
      price: 88.77, weeklyPrices: [88.00, 87.93, 89.41, 89.79, 88.77], weeklyChange: 0.87, dayChange: -1.14, sortRank: 0, periodReturns: { '1M': 1.3, 'YTD': 10.6, '6M': 4.7, '1Y': 23.3 },
      priceHistory: { '1D': [89.79, 88.67, 88.77], '1W': [88, 87.93, 89.41, 89.79, 88.77], '1M': [87.62, 87.7, 88.56, 88.66, 87.77, 86.37, 88.34, 87.44, 88.47, 87.44, 87.96, 88.38, 89.54, 89.1, 89.35, 88.8, 88, 87.93, 89.41, 89.79, 88.77], 'YTD': [80.28, 79.89, 83.63, 87.15, 88.82, 91.36, 92.18, 93.77, 92.01, 92.82, 91.62, 92.85, 94.48, 91.98, 95.28, 95.51, 94.59, 90.06, 87.25, 85.68, 85.99, 86.43, 87.77, 87.1, 89.35, 88.77], '6M': [85.47, 86.33, 89.48, 92.71, 95.68, 92.59, 91.54, 92.53, 91.62, 92.88, 94.17, 91.24, 90, 96.51, 96.28, 94.59, 90.06, 87.65, 84.58, 85.12, 85.73, 87.7, 88.34, 87.96, 88.8, 88.77], '1Y': [71.97, 71.06, 72.58, 72.24, 76.08, 72.09, 70.9, 71.32, 70.79, 74.65, 78.18, 83.71, 85.05, 83.25, 81.64, 82, 83.99, 84.3, 86.29, 83.13, 81.21, 80.85, 80.41, 81.32, 81.12, 83.51, 87.15, 88.82, 90.83, 91.22, 95.11, 92.6, 91.54, 92.53, 91.62, 92.88, 94.17, 91.24, 90, 94.17, 95.39, 94.85, 88.27, 87.25, 85.68, 85.12, 85.73, 87.7, 88.34, 87.96, 88.8, 88.77] },
      velocityScore: { '1D': -0.4, '1W': -3.7, '1M': 13.5, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 22.5, revenueGrowth: 7, eps: 3.94, grossMargin: 61, dividendYield: 2.78,
      etfPresence: { POW: 2.25, VOLT: 5.33, PBD: false, PBW: false, IVEP: 4.23 },
      tonyNote: 'NextEra Energy is the largest renewable energy developer in the U.S., held in Electrification ETFs as the clean power infrastructure backbone. Revenue is regulated and contracted, dividend yield is meaningful, and the business is expanding solar and battery storage capacity to meet data center demand. The institutional weight reflects a defensive income and growth allocation.',
    },
    {
      ticker: 'GEV', name: 'GE Vernova Inc', easyScore: 3, avgWeight: 3.89, proScore: 2.33, coverage: 0.6,
      price: 1029.21, weeklyPrices: [1079.18, 1078.81, 985.03, 1031.19, 1029.21], weeklyChange: -4.63, dayChange: -0.3, sortRank: 0, periodReturns: { '1M': -2.7, 'YTD': 57.5, '6M': 56.5, '1Y': 64.9 },
      priceHistory: { '1D': [1032.29, 1030.44, 1029.21], '1W': [1079.18, 1078.81, 985.03, 1031.19, 1029.21], '1M': [1057.65, 1085.47, 1045.17, 1102.51, 1174.86, 1134.35, 1113.11, 1152.04, 1077.08, 1070.99, 1091.57, 1042.6, 1066.01, 1055.28, 1036.22, 1057.84, 1079.18, 1078.81, 985.03, 1031.19, 1029.21], 'YTD': [653.57, 622.5, 681.55, 692.7, 780.25, 823.67, 830.34, 873.6, 830.1, 827.37, 909.41, 894.78, 968.02, 1002.75, 1149.19, 1073.95, 1071.98, 1011.8, 996, 963.33, 940.66, 1034.98, 1174.86, 1075.26, 1036.22, 1029.21], '6M': [665.99, 754.97, 801.54, 819.15, 879.73, 842, 839.2, 844.05, 909.41, 872.9, 936.07, 985.92, 1127.56, 1088.93, 1095.21, 1071.98, 1011.8, 1031.89, 959.36, 867.09, 1048.86, 1085.47, 1113.11, 1091.57, 1057.84, 1029.21], '1Y': [623.97, 660.29, 645.86, 625.27, 606, 633.69, 582.08, 634.15, 611, 607.52, 606.23, 634.27, 602, 595.15, 574.07, 550.17, 558.17, 558.03, 599.77, 631.32, 704.2, 639.43, 663.46, 680.86, 639.77, 684.86, 692.7, 780.25, 790.79, 817.55, 876.01, 841.27, 839.2, 844.05, 909.41, 872.9, 936.07, 985.92, 1127.56, 1063.11, 1118.96, 1062.57, 1024.52, 996, 963.33, 867.09, 1048.86, 1085.47, 1113.11, 1091.57, 1057.84, 1029.21] },
      velocityScore: { '1D': 3.6, '1W': -2.9, '1M': -2.1, '6M': null }, isNew: false,
      marketCap: '$274B', pe: 29.5, revenueGrowth: 22, eps: 34.85, grossMargin: 21, dividendYield: 0.19,
      etfPresence: { POW: 3.42, VOLT: 4.32, PBD: false, PBW: false, IVEP: 3.93 },
      tonyNote: 'GE Vernova is the grid infrastructure play inside AI-themed ETFs, held by 4 at 2.66% average weight. Revenue grew 16%, gross margin only 20%, but the $260B valuation is pricing in multi-year power grid capex driven by data center electricity demand. The -6.78% weekly return and -8.9% monthly return signal near-term selling pressure; the 6-month return of 61% shows the core thesis is intact.',
    },
    {
      ticker: 'HUBB', name: 'Hubbell Inc', easyScore: 3, avgWeight: 3.39, proScore: 2.04, coverage: 0.6,
      price: 486.19, weeklyPrices: [484.98, 479.93, 476.84, 488.38, 486.19], weeklyChange: 0.25, dayChange: -0.45, sortRank: 0, periodReturns: { '1M': -6.2, 'YTD': 9.5, '6M': 0.1, '1Y': 11.1 },
      priceHistory: { '1D': [488.4, 486.2, 486.19], '1W': [484.98, 479.93, 476.84, 488.38, 486.19], '1M': [518.18, 536.04, 517.02, 514.71, 523.2, 490.12, 487.1, 495.6, 478.89, 480.5, 490.94, 477.03, 483.89, 479.92, 482.04, 488.67, 484.98, 479.93, 476.84, 488.38, 486.19], 'YTD': [444.11, 470.53, 489.31, 484.14, 503.86, 516.03, 526.73, 511.63, 487.76, 472.64, 505.62, 500.38, 534.67, 535.57, 553.07, 516, 485.98, 461.5, 473.93, 485.27, 476.89, 509.96, 523.2, 485.41, 482.04, 486.19], '6M': [486.82, 495.59, 506.14, 524.25, 526.75, 488.49, 478.06, 471.22, 505.62, 490.74, 527.21, 526.94, 549.75, 544.71, 507.81, 485.98, 461.5, 484.25, 484.91, 467.59, 508.87, 536.04, 487.1, 490.94, 488.67, 486.19], '1Y': [437.5, 437.48, 417.84, 437.67, 427.57, 445.8, 436.04, 450.93, 440.1, 420.44, 423.42, 418.89, 428.82, 433.27, 469.96, 461.47, 437.65, 407.36, 431.43, 440.53, 462.82, 434.85, 454.94, 465.48, 472.88, 472.54, 484.14, 503.86, 503.1, 522.3, 527.9, 490.78, 478.06, 471.22, 505.62, 490.74, 527.21, 526.94, 549.75, 545.93, 502.34, 483.79, 463.32, 473.93, 485.27, 467.59, 508.87, 536.04, 487.1, 490.94, 488.67, 486.19] },
      velocityScore: { '1D': 1.5, '1W': 4.1, '1M': 14, '6M': null }, isNew: false,
      marketCap: '$26B', pe: 28.8, revenueGrowth: 11, eps: 16.9, grossMargin: 36, dividendYield: 1.16,
      etfPresence: { POW: 2.96, VOLT: 4.39, PBD: false, PBW: false, IVEP: 2.83 },
      tonyNote: 'Hubbell Inc is an electrical products manufacturer — wiring devices, power systems, and utility solutions. It appears in Electrification ETFs because the grid hardening and expansion capex cycle benefits Hubbell\'s utility segment directly. Consistent margins and steady revenue growth make it a quality industrial allocation.',
    },
    {
      ticker: 'NVT', name: 'nVent Electric PLC', easyScore: 3, avgWeight: 3.24, proScore: 1.94, coverage: 0.6,
      price: 156.51, weeklyPrices: [154.78, 160.68, 158.47, 158.78, 156.51], weeklyChange: 1.12, dayChange: -1.38, sortRank: 0, periodReturns: { '1M': -6.6, 'YTD': 53.5, '6M': 41.9, '1Y': 103 },
      priceHistory: { '1D': [158.71, 157.62, 156.51], '1W': [154.78, 160.68, 158.47, 158.78, 156.51], '1M': [167.55, 171.91, 162.92, 163.35, 169.61, 159.99, 152.15, 156.89, 153.18, 154.76, 160.72, 158.02, 161.78, 159.46, 153.65, 154.92, 154.78, 160.68, 158.47, 158.78, 156.51], 'YTD': [101.97, 105.38, 112.5, 113.16, 119.43, 112.75, 116.87, 118.36, 108.13, 114.3, 125.61, 121.26, 128.63, 134.69, 142.17, 162.69, 170.74, 158.23, 164.87, 173.88, 165.84, 168.37, 169.61, 158.05, 153.65, 156.51], '6M': [110.58, 115.79, 114.62, 115.22, 118.22, 111.65, 109.13, 114.71, 125.61, 118.28, 127.11, 131.38, 140.13, 138.3, 169.41, 170.74, 158.23, 167.8, 176.39, 156.79, 170.94, 171.91, 152.15, 160.72, 154.92, 156.51], '1Y': [77.09, 78.42, 89.1, 89.8, 88.02, 92.58, 92.8, 95.71, 98.65, 96.6, 99.43, 97.73, 100.54, 100.62, 104.35, 109.97, 105.92, 101.52, 107.27, 107.72, 109.15, 98.28, 104.18, 106.61, 106.39, 109.9, 113.16, 119.43, 112.15, 115.65, 121.8, 113.83, 109.13, 114.71, 125.61, 118.28, 127.11, 131.38, 140.13, 137.37, 172.49, 172.91, 161.86, 164.87, 173.88, 156.79, 170.94, 171.91, 152.15, 160.72, 154.92, 156.51] },
      velocityScore: { '1D': -1, '1W': 0, '1M': -5.8, '6M': null }, isNew: false,
      marketCap: '$25B', pe: 53.2, revenueGrowth: 54, eps: 2.94, grossMargin: 37, dividendYield: 0.53,
      etfPresence: { POW: 3.88, VOLT: 3.03, PBD: false, PBW: false, IVEP: 2.81 },
      tonyNote: 'nVent Electric is an enclosures and thermal management company for data centers and industrial applications. It appears in Industrials ETFs as part of the data center physical infrastructure build-out. Revenue growth is solid and the business benefits from the same data center capex wave that drives Vertiv and Eaton.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy Corp', easyScore: 3, avgWeight: 2.57, proScore: 1.54, coverage: 0.6,
      price: 208.66, weeklyPrices: [197.06, 226.26, 218.22, 217.30, 208.66], weeklyChange: 5.89, dayChange: -3.99, sortRank: 0, periodReturns: { '1M': -36, 'YTD': 140.1, '6M': 44, '1Y': 531.2 },
      priceHistory: { '1D': [217.35, 210.4, 208.66], '1W': [197.06, 226.26, 218.22, 217.3, 208.66], '1M': [326.19, 309.18, 252.02, 275.01, 302.7, 289.5, 270.89, 295.05, 269.57, 254.29, 244.61, 233.49, 243.4, 239.38, 206.73, 214.96, 197.06, 226.26, 218.22, 217.3, 208.66], 'YTD': [86.89, 134.07, 149.5, 152.31, 168.89, 155.54, 147.55, 155.67, 151.32, 153.68, 145.88, 132.45, 160.13, 207.86, 231.17, 288.64, 280.69, 261.34, 290.01, 291.37, 260.22, 321.98, 302.7, 257.02, 206.73, 208.66], '6M': [139.62, 156.13, 155.17, 145.32, 166.2, 153.02, 154, 160.05, 145.88, 135.49, 146.78, 213.84, 229.75, 226.37, 295.25, 280.69, 261.34, 293.8, 287.32, 234.23, 284.99, 309.18, 270.89, 244.61, 214.96, 208.66], '1Y': [33.06, 37.39, 36.8, 45.11, 44.83, 54.8, 57.07, 67.29, 80.97, 68.69, 88, 86.65, 115.09, 101.42, 127.85, 136.86, 103.55, 93.38, 109.24, 119.18, 108.99, 80.21, 90.18, 103.87, 136.87, 151.75, 152.31, 168.89, 148.7, 157.27, 174.77, 164.78, 154, 160.05, 145.88, 135.49, 146.78, 213.84, 229.75, 287.97, 285.47, 289.76, 282.31, 290.01, 291.37, 234.23, 284.99, 309.18, 270.89, 244.61, 214.96, 208.66] },
      velocityScore: { '1D': -1.3, '1W': 6.9, '1M': -40.5, '6M': null }, isNew: false,
      marketCap: '$59B', pe: null, revenueGrowth: 130, eps: -0.04, grossMargin: 30, dividendYield: null,
      etfPresence: { POW: 1.34, VOLT: 3.18, PBD: false, PBW: false, IVEP: 3.19 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'NRG', name: 'NRG Energy Inc', easyScore: 3, avgWeight: 1.53, proScore: 0.92, coverage: 0.6,
      price: 143.04, weeklyPrices: [130.58, 131.60, 139.98, 142.99, 143.04], weeklyChange: 9.54, dayChange: -0.03, sortRank: 0, periodReturns: { '1M': 0.6, 'YTD': -10.2, '6M': -4.2, '1Y': -9.5 },
      priceHistory: { '1D': [143.09, 143.04, 143.04], '1W': [130.58, 131.6, 139.98, 142.99, 143.04], '1M': [142.21, 147.11, 149.36, 149.11, 146.06, 140.8, 136.7, 141.01, 138.01, 137.48, 140.42, 139.48, 138.36, 137.9, 132.75, 129.11, 130.58, 131.6, 139.98, 142.99, 143.04], 'YTD': [159.24, 149.27, 152.05, 156.04, 152.18, 160.63, 179.18, 178.96, 155.42, 152.48, 151.13, 149.9, 161.78, 167.73, 159.81, 154.82, 137.34, 123.71, 137.5, 133.39, 125.47, 137.66, 146.06, 140.48, 132.75, 143.04], '6M': [149.93, 149.11, 155.72, 173.45, 184.03, 162.06, 155.15, 154.75, 151.13, 146.14, 160.3, 168.45, 149.6, 154.81, 157.43, 137.34, 123.71, 138, 133.76, 120.65, 132.13, 147.11, 136.7, 140.42, 129.11, 143.04], '1Y': [157.97, 167.2, 153.22, 153.78, 145.89, 148.66, 147.66, 157.92, 164.19, 162.96, 167.3, 168.25, 169.93, 163.81, 173.14, 170.1, 166.15, 160.46, 169.49, 163, 170.64, 154.64, 160.88, 161.59, 148.89, 148.91, 156.04, 152.18, 156.43, 171.06, 183.59, 163.54, 155.15, 154.75, 151.13, 146.14, 160.3, 168.45, 149.6, 149.01, 150.64, 131.08, 133.98, 137.5, 133.39, 120.65, 132.13, 147.11, 136.7, 140.42, 129.11, 143.04] },
      velocityScore: { '1D': 2.2, '1W': 4.5, '1M': 39.4, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 155.5, revenueGrowth: 20, eps: 0.92, grossMargin: 16, dividendYield: 1.36,
      etfPresence: { POW: 0.56, VOLT: 1.06, PBD: false, PBW: false, IVEP: 2.96 },
      tonyNote: 'NRG Energy Inc appears in 3 of 5 Electrification ETFs (60% coverage) with average weight 1.5% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BELFB', name: 'Bel Fuse Inc', easyScore: 2, avgWeight: 5.75, proScore: 2.3, coverage: 0.4,
      price: 281.73, weeklyPrices: [266.11, 281.51, 282.06, 285.92, 281.73], weeklyChange: 5.87, dayChange: -1.47, sortRank: 0, periodReturns: { '1M': -4.2, 'YTD': 66.1, '6M': 43.4, '1Y': 173.6 },
      priceHistory: { '1D': [285.92, 282.27, 281.73], '1W': [266.11, 281.51, 282.06, 285.92, 281.73], '1M': [294.15, 310.32, 310.64, 315.65, 333.04, 318.06, 266.94, 277.45, 251.53, 258.67, 272.58, 263.26, 279.39, 275, 266.8, 270.56, 266.11, 281.51, 282.06, 285.92, 281.73], 'YTD': [169.63, 187.43, 200.11, 210.66, 217.25, 238.4, 235.04, 229.71, 191.81, 205.11, 222.04, 203.04, 235, 254.25, 276.65, 286.69, 298.22, 249.71, 276.96, 276.54, 293.87, 288.64, 333.04, 267.69, 266.8, 281.73], '6M': [205.17, 215.59, 229.32, 235.3, 234.4, 213.65, 198.5, 209.52, 222.04, 197.98, 228.29, 236.04, 262.68, 249.82, 297.17, 298.22, 249.71, 280.13, 280.09, 276.95, 299.84, 310.32, 266.94, 272.58, 270.56, 281.73], '1Y': [102.98, 130.04, 132.61, 132.13, 128.91, 136.29, 143.88, 148.32, 150.97, 142.72, 142.44, 142.94, 148.88, 154.9, 150.62, 160.16, 146.49, 134.36, 154.03, 166, 175.36, 166.55, 176.45, 175.77, 188, 201.17, 210.66, 217.25, 237.19, 221.19, 234.67, 213.8, 198.5, 209.52, 222.04, 197.98, 228.29, 236.04, 262.68, 258.26, 286.89, 266.92, 254.75, 276.96, 276.54, 276.95, 299.84, 310.32, 266.94, 272.58, 270.56, 281.73] },
      velocityScore: { '1D': 0, '1W': 4.1, '1M': 5.5, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 67.9, revenueGrowth: 17, eps: 4.15, grossMargin: 39, dividendYield: 0.1,
      etfPresence: { POW: 3.75, VOLT: 7.75, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Bel Fuse is a power solutions and connectivity components name held in Industrials ETFs. Revenue growth has been driven by data center power conversion demand. The small market cap and niche positioning make this a concentrated conviction bet within the ETF universe that holds it.',
    },
    {
      ticker: 'POWL', name: 'Powell Industries Inc', easyScore: 2, avgWeight: 5.36, proScore: 2.14, coverage: 0.4,
      price: 239.03, weeklyPrices: [228.28, 244.39, 240.68, 242.47, 239.03], weeklyChange: 4.71, dayChange: -1.42, sortRank: 0, periodReturns: { '1M': -18.8, 'YTD': 125, '6M': 71.6, '1Y': 198.6 },
      priceHistory: { '1D': [242.47, 240.34, 239.03], '1W': [228.28, 244.39, 240.68, 242.47, 239.03], '1M': [294.49, 309.2, 279.77, 281.09, 286.36, 264.86, 246.33, 248.05, 234.05, 231.85, 232.19, 225.66, 234.25, 247.01, 235.79, 232.79, 228.28, 244.39, 240.68, 242.47, 239.03], 'YTD': [106.26, 121.83, 139.99, 147.43, 151.08, 197.45, 182.27, 174.53, 173.36, 170.61, 186.82, 184.68, 230.81, 241.01, 252.76, 269.95, 308.05, 261.58, 288.9, 300.06, 294.75, 291.5, 286.36, 236.58, 235.79, 239.03], '6M': [141.15, 146.79, 187.3, 187.21, 186.39, 170.37, 176.51, 174.04, 186.82, 180.36, 218.07, 229.73, 242.77, 255.56, 294.69, 308.05, 261.58, 295.94, 299.73, 262.34, 294.03, 309.2, 246.33, 232.19, 232.79, 239.03], '1Y': [80.05, 79.03, 77.8, 85.17, 83.64, 90.42, 89.41, 97.47, 101.43, 94.58, 102.51, 103.18, 112.77, 113.88, 125.9, 125, 109.4, 98.12, 107.74, 114.04, 120.91, 109.59, 113.62, 120.46, 128.85, 142.76, 147.43, 151.08, 190.09, 180.99, 183, 170.96, 176.51, 174.04, 186.82, 180.36, 218.07, 229.73, 242.77, 253.49, 320.3, 300.84, 271.05, 288.9, 300.06, 262.34, 294.03, 309.2, 246.33, 232.19, 232.79, 239.03] },
      velocityScore: { '1D': -0.9, '1W': 0, '1M': -31.8, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 46.7, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.15,
      etfPresence: { POW: 4.38, VOLT: 6.34, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'AEP', name: 'American Electric Power Co Inc', easyScore: 2, avgWeight: 3.67, proScore: 1.47, coverage: 0.4,
      price: 135.43, weeklyPrices: [131.05, 130.48, 133.07, 134.92, 135.43], weeklyChange: 3.34, dayChange: 0.38, sortRank: 0, periodReturns: { '1M': 0.3, 'YTD': 17.4, '6M': 16.1, '1Y': 24.3 },
      priceHistory: { '1D': [134.92, 135.37, 135.43], '1W': [131.05, 130.48, 133.07, 134.92, 135.43], '1M': [134.96, 137, 138.69, 137.97, 136.81, 135.05, 138.51, 135.98, 137.53, 135.9, 135.43, 135.63, 134.94, 132.5, 133.13, 132.14, 131.05, 130.48, 133.07, 134.92, 135.43], 'YTD': [115.31, 116.91, 119.96, 119.43, 120.67, 122.25, 129.37, 133.82, 131.86, 134.15, 128.8, 131.67, 137.15, 133.66, 134.73, 134.66, 131.94, 128.92, 127.76, 127.79, 129.23, 133.74, 136.81, 133.85, 133.13, 135.43], '6M': [118.02, 118.33, 121.1, 130.24, 132.39, 131.92, 132.31, 133.62, 128.8, 131.08, 134.71, 134.39, 131.62, 135.59, 137.04, 131.94, 128.92, 129.57, 126.31, 128.53, 128.27, 137, 138.51, 135.43, 132.14, 135.43], '1Y': [108.97, 113.14, 113.73, 112.86, 113.14, 111.78, 108.11, 108.74, 106.44, 107.86, 113.46, 116.91, 117.53, 116.18, 121.89, 119.53, 121.48, 120.9, 123.77, 117.54, 114.26, 115.58, 115.67, 114.07, 116.57, 119.22, 119.43, 120.67, 121.23, 127.27, 132.46, 133.52, 132.31, 133.62, 128.8, 131.08, 134.71, 134.39, 131.62, 134.44, 132.56, 127.95, 128.87, 127.76, 127.79, 128.53, 128.27, 137, 138.51, 135.43, 132.14, 135.43] },
      velocityScore: { '1D': 0, '1W': -1.3, '1M': 31.2, '6M': null }, isNew: false,
      marketCap: '$74B', pe: 20, revenueGrowth: 10, eps: 6.76, grossMargin: 47, dividendYield: 2.82,
      etfPresence: { POW: 2.85, VOLT: 4.5, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'American Electric Power is a regulated utility held in Electrification ETFs for dividend income and data center load growth exposure. AEP operates in multiple states and has significant transmission infrastructure; load additions from hyperscaler data centers are creating incremental rate base growth that regulators are beginning to approve.',
    },
    {
      ticker: 'VRT', name: 'VERTIV HOLDINGS CO', easyScore: 2, avgWeight: 3.2, proScore: 1.28, coverage: 0.4,
      price: 300.3, weeklyPrices: [291.67, 304.50, 301.16, 304.04, 300.30], weeklyChange: 2.96, dayChange: -1.25, sortRank: 0, periodReturns: { '1M': -5.1, 'YTD': 85.4, '6M': 64.6, '1Y': 129.5 },
      priceHistory: { '1D': [304.1, 299.91, 300.3], '1W': [291.67, 304.5, 301.16, 304.04, 300.3], '1M': [316.43, 325.57, 303.95, 306.97, 334.82, 311.42, 300.53, 318.47, 305.58, 317.81, 318.86, 305.87, 303.58, 304.57, 294.11, 289.56, 291.67, 304.5, 301.16, 304.04, 300.3], 'YTD': [162.01, 163.58, 176.93, 189.21, 190.15, 248.51, 243.75, 254.89, 264.35, 264.74, 270.89, 259.37, 287.64, 307.34, 323.46, 330.97, 367.13, 322.63, 314.18, 323.92, 302.87, 318.32, 334.82, 323.92, 294.11, 300.3], '6M': [181.23, 190.01, 202, 243.53, 253.15, 244.44, 270.06, 268.41, 270.89, 250.58, 281.03, 301.16, 305.14, 305.03, 341.02, 367.13, 322.63, 319.78, 331.44, 280.98, 317.58, 325.57, 300.53, 318.86, 289.56, 300.3], '1Y': [130.87, 145.6, 139.39, 132.52, 126.58, 134.23, 124, 135.71, 141.96, 139.77, 161.64, 168.88, 177.82, 183.2, 193.76, 183.02, 163.64, 159.61, 179.73, 189.02, 178.66, 154.39, 167.58, 173.95, 170.03, 175.18, 189.21, 190.15, 199.62, 243.21, 262.19, 251.28, 270.06, 268.41, 270.89, 250.58, 281.03, 301.16, 305.14, 306.18, 358.92, 369.99, 315.67, 314.18, 323.92, 280.98, 317.58, 325.57, 300.53, 318.86, 289.56, 300.3] },
      velocityScore: { '1D': 0, '1W': -1.5, '1M': -1.5, '6M': null }, isNew: false,
      marketCap: '$115B', pe: 75.5, revenueGrowth: 30, eps: 3.98, grossMargin: 37, dividendYield: 0.08,
      etfPresence: { POW: false, VOLT: 2.46, PBD: false, PBW: false, IVEP: 3.94 },
      tonyNote: 'Vertiv is a power and cooling infrastructure name, held by 4 AI ETFs at 2.64% average weight. Revenue grew 30%, 37% gross margin, P/E of 79x. The 193% 1-year return reflects data center operators paying a premium for liquid cooling solutions as AI GPU density increases. The current pullback — down 3.6% on the week — appears to be rotation rather than thesis deterioration.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 2.98, proScore: 1.19, coverage: 0.4,
      price: 76.09, weeklyPrices: [74.16, 73.36, 74.49, 75.25, 76.09], weeklyChange: 2.6, dayChange: 1.12, sortRank: 0, periodReturns: { '1M': 0.3, 'YTD': 26.6, '6M': 17.1, '1Y': 29.5 },
      priceHistory: { '1D': [75.25, 75.91, 76.09], '1W': [74.16, 73.36, 74.49, 75.25, 76.09], '1M': [75.87, 77.53, 77.92, 75.06, 74.34, 72.77, 73.14, 72.82, 75.08, 75.27, 75.02, 74.46, 75.98, 74.38, 74.73, 73.38, 74.16, 73.36, 74.49, 75.25, 76.09], 'YTD': [60.11, 60.32, 61.55, 65.48, 68.5, 71.12, 72.98, 74.72, 73.18, 73.89, 74.46, 71.83, 72.82, 71.15, 72.18, 75.41, 74.73, 79.4, 73.13, 72.43, 72.08, 75.79, 74.34, 75.45, 74.73, 76.09], '6M': [64.29, 66.34, 67.85, 71.96, 73.5, 75.88, 73.84, 73.69, 74.46, 72.78, 73.01, 70.76, 71.1, 73.04, 76.12, 74.73, 79.4, 74.37, 71.66, 72.26, 71.25, 77.53, 73.14, 75.02, 73.38, 76.09], '1Y': [58.75, 59.95, 57.89, 57.34, 57.8, 58, 57.2, 59.33, 60.38, 63.31, 64.06, 63.1, 62.53, 58.93, 57.62, 57.94, 59.59, 58.91, 60.93, 62.81, 60.92, 58.66, 59.52, 61.16, 59.56, 61.51, 65.48, 68.5, 68.84, 72.14, 73.97, 75.77, 73.84, 73.69, 74.46, 72.78, 73.01, 70.76, 71.1, 73.32, 73.76, 75.71, 77.88, 73.13, 72.43, 72.26, 71.25, 77.53, 73.14, 75.02, 73.38, 76.09] },
      velocityScore: { '1D': 0, '1W': -4.8, '1M': 13.3, '6M': null }, isNew: false,
      marketCap: '$93B', pe: 33.4, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.79,
      etfPresence: { POW: false, VOLT: 2.05, PBD: false, PBW: false, IVEP: 3.91 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 3.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'CEG', name: 'Constellation Energy Corp', easyScore: 2, avgWeight: 2.81, proScore: 1.12, coverage: 0.4,
      price: 277, weeklyPrices: [253.50, 262.22, 274.90, 275.60, 277.00], weeklyChange: 9.27, dayChange: 0.51, sortRank: 0, periodReturns: { '1M': 3.4, 'YTD': -21.6, '6M': -4.2, '1Y': -13.9 },
      priceHistory: { '1D': [275.6, 275.98, 277], '1W': [253.5, 262.22, 274.9, 275.6, 277], '1M': [267.97, 268.69, 264.02, 259.32, 248.37, 236.5, 239.25, 245.87, 239.71, 244.52, 251.38, 257.57, 256.43, 258.11, 251.77, 252.39, 253.5, 262.22, 274.9, 275.6, 277], 'YTD': [353.27, 342.52, 307.71, 288.76, 268.45, 276.85, 294.84, 329.88, 322.99, 305.58, 294.85, 279.46, 280.25, 296.21, 313.53, 321.05, 293.6, 260.67, 286.31, 264.59, 253.76, 270.26, 248.37, 250.74, 251.77, 277], '6M': [285.27, 270.88, 272.15, 303.01, 312.64, 324.87, 317.09, 307.69, 294.85, 279.25, 284.27, 294.73, 287.16, 305.71, 320.42, 293.6, 260.67, 288.68, 267.24, 242.3, 267.17, 268.69, 239.25, 251.38, 252.39, 277], '1Y': [321.67, 347.84, 336.41, 326.21, 312.52, 319.55, 301.58, 318, 322.71, 326.33, 357.46, 383.23, 396.53, 365.8, 382.48, 351.3, 335.74, 345.78, 364.36, 359.82, 378.6, 361.05, 360.46, 354.94, 335.86, 295.4, 288.76, 268.45, 271.14, 294.05, 325.84, 322.85, 317.09, 307.69, 294.85, 279.25, 284.27, 294.73, 287.16, 297, 322.78, 274.89, 281.26, 286.31, 264.59, 242.3, 267.17, 268.69, 239.25, 251.38, 252.39, 277] },
      velocityScore: { '1D': -0.9, '1W': 1.8, '1M': 16.7, '6M': null }, isNew: false,
      marketCap: '$99B', pe: 24, revenueGrowth: 64, eps: 11.52, grossMargin: 23, dividendYield: 0.62,
      etfPresence: { POW: 1.42, VOLT: false, PBD: false, PBW: false, IVEP: 4.19 },
      tonyNote: 'Constellation Energy Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'APH', name: 'Amphenol Corp', easyScore: 2, avgWeight: 2.73, proScore: 1.09, coverage: 0.4,
      price: 158.37, weeklyPrices: [150.51, 157.81, 157.51, 157.43, 158.37], weeklyChange: 5.22, dayChange: 0.6, sortRank: 0, periodReturns: { '1M': -2.7, 'YTD': 17.2, '6M': 4.9, '1Y': 51.6 },
      priceHistory: { '1D': [157.43, 158.02, 158.37], '1W': [150.51, 157.81, 157.51, 157.43, 158.37], '1M': [162.78, 165.15, 163.72, 166.42, 176.32, 172.22, 164.59, 166.81, 158.61, 158.22, 159.06, 155.99, 158.37, 157.04, 153.14, 151.2, 150.51, 157.81, 157.51, 157.43, 158.37], 'YTD': [135.14, 140.16, 154.39, 166.25, 147.06, 144.04, 151.04, 146.06, 136.06, 136.8, 127.96, 127.7, 137.68, 151.06, 149.71, 141.03, 127.87, 119.2, 147.68, 146.77, 153.8, 158.7, 176.32, 162.24, 153.14, 158.37], '6M': [155.56, 144.93, 144.2, 148.57, 151.5, 129.58, 136.74, 135.12, 127.96, 126.35, 135.32, 146.98, 148.13, 143.72, 136.69, 127.87, 119.2, 140.24, 147.62, 149.22, 161.11, 165.15, 164.59, 159.06, 151.2, 158.37], '1Y': [104.46, 106.51, 108.55, 110.74, 108.81, 111.94, 110.45, 119.47, 122.07, 122.33, 123.58, 126.25, 127.36, 135.31, 139.11, 138.11, 135.25, 130.36, 140.9, 139.36, 139.09, 129.61, 137.43, 139.88, 145.11, 152.33, 166.25, 147.06, 144.14, 147.73, 152.64, 132.75, 136.74, 135.12, 127.96, 126.35, 135.32, 146.98, 148.13, 148.38, 138.47, 124.64, 123.05, 147.68, 146.77, 149.22, 161.11, 165.15, 164.59, 159.06, 151.2, 158.37] },
      velocityScore: { '1D': -1.8, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 45.5, revenueGrowth: 58, eps: 3.48, grossMargin: 38, dividendYield: 0.64,
      etfPresence: { POW: 1.04, VOLT: 4.43, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Amphenol is the connector and sensor company held across Industrials and Electrification ETFs. Revenue grew consistently, gross margin is strong for a hardware manufacturer, and the product breadth — from data center interconnects to EV charging connectors — positions it at every intersection of the electrification and AI infrastructure build. One of the highest-quality names in the Industrials theme.',
    },
    {
      ticker: 'JCI', name: 'JOHNSON CONTROLS INTERNATIONAL PLC', easyScore: 2, avgWeight: 2.67, proScore: 1.07, coverage: 0.4,
      price: 142.84, weeklyPrices: [139.37, 141.71, 142.49, 143.29, 142.84], weeklyChange: 2.49, dayChange: -0.32, sortRank: 0, periodReturns: { '1M': 0, 'YTD': 19.3, '6M': 25.8, '1Y': 29.8 },
      priceHistory: { '1D': [143.3, 143.16, 142.84], '1W': [139.37, 141.71, 142.49, 143.29, 142.84], '1M': [142.81, 145.49, 138.4, 140.47, 146.11, 144.8, 140.76, 142.72, 140.62, 140.23, 142.81, 143.93, 145.24, 142.76, 141.26, 140.46, 139.37, 141.71, 142.49, 143.29, 142.84], 'YTD': [119.75, 110.85, 114.61, 116.96, 124.01, 140.96, 143.79, 144.3, 133.09, 131.69, 136.43, 134.72, 141.85, 140.87, 141.92, 144.4, 141.04, 135.42, 136.15, 147.4, 144.96, 141.28, 146.11, 140.53, 141.26, 142.84], '6M': [115.07, 122.98, 139, 142.21, 144.71, 139.58, 133.94, 132.56, 136.43, 130.95, 139, 137.21, 139.81, 141.59, 144.82, 141.04, 135.42, 138.2, 146.96, 139.36, 143.62, 145.49, 140.76, 142.81, 140.46, 142.84], '1Y': [110.02, 105, 104.31, 105.02, 104.75, 108.65, 106.23, 107.82, 108.48, 105.77, 108.66, 107.76, 109.37, 110.55, 114.21, 122.25, 120.2, 112.99, 116.31, 114.23, 118.06, 117.74, 122.06, 121.53, 111.39, 114.56, 116.96, 124.01, 138.75, 139.48, 144.49, 140, 133.94, 132.56, 136.43, 130.95, 139, 137.21, 139.81, 141.35, 143.14, 143.8, 137.75, 136.15, 147.4, 139.36, 143.62, 145.49, 140.76, 142.81, 140.46, 142.84] },
      velocityScore: { '1D': 0, '1W': -0.9, '1M': 10.3, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 43.7, revenueGrowth: 8, eps: 3.27, grossMargin: 37, dividendYield: 1.12,
      etfPresence: { POW: false, VOLT: 1.47, PBD: false, PBW: false, IVEP: 3.87 },
      tonyNote: 'JOHNSON CONTROLS INTERNATIONAL PLC appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'VST', name: 'Vistra Corp', easyScore: 2, avgWeight: 2.62, proScore: 1.05, coverage: 0.4,
      price: 168.67, weeklyPrices: [157.99, 162.33, 166.74, 168.98, 168.67], weeklyChange: 6.76, dayChange: -0.18, sortRank: 0, periodReturns: { '1M': 3.6, 'YTD': 4.5, '6M': 5.3, '1Y': -14 },
      priceHistory: { '1D': [168.97, 168.5, 168.67], '1W': [157.99, 162.33, 166.74, 168.98, 168.67], '1M': [162.87, 167.77, 163.49, 162.38, 158.63, 153.16, 151.05, 157.22, 155.73, 154.82, 158.86, 158.12, 158.43, 160.23, 152.56, 155.44, 157.99, 162.33, 166.74, 168.98, 168.67], 'YTD': [161.33, 166.37, 166.6, 164.26, 153, 160.15, 171.4, 173.89, 163.62, 161.99, 152.72, 153.96, 152.75, 163.46, 164.35, 160.85, 146.87, 134.71, 160.28, 153.7, 148.02, 162.39, 158.63, 157.98, 152.56, 168.67], '6M': [158.81, 154.26, 152.97, 173.68, 171.62, 161.7, 164.4, 164.33, 152.72, 150.33, 155.89, 162.94, 155.79, 161.12, 160.38, 146.87, 134.71, 160.15, 153.8, 138.54, 158.83, 167.77, 151.05, 158.86, 155.44, 168.67], '1Y': [196.24, 208.54, 205.59, 202.35, 190.28, 196.7, 188, 204.05, 210.16, 201.62, 202.65, 210, 210.4, 191.37, 189.71, 184.62, 171.56, 173.79, 178.86, 167.17, 174.6, 166.17, 161.67, 162.93, 172.58, 156.81, 164.26, 153, 159.6, 170.57, 175.36, 163.36, 164.4, 164.33, 152.72, 150.33, 155.89, 162.94, 155.79, 153.79, 158.29, 142.61, 144, 160.28, 153.7, 138.54, 158.83, 167.77, 151.05, 158.86, 155.44, 168.67] },
      velocityScore: { '1D': 1, '1W': 5, '1M': null, '6M': null }, isNew: false,
      marketCap: '$57B', pe: 28.2, revenueGrowth: 43, eps: 5.98, grossMargin: 39, dividendYield: 0.54,
      etfPresence: { POW: 1.62, VOLT: false, PBD: false, PBW: false, IVEP: 3.63 },
      tonyNote: 'Vistra Corp appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'AEIS', name: 'Advanced Energy Industries Inc', easyScore: 2, avgWeight: 2.55, proScore: 1.02, coverage: 0.4,
      price: 314.37, weeklyPrices: [280.67, 303.71, 317.31, 315.14, 314.37], weeklyChange: 12.01, dayChange: -0.24, sortRank: 0, periodReturns: { '1M': -12.6, 'YTD': 50.2, '6M': 19.9, '1Y': 123.1 },
      priceHistory: { '1D': [315.14, 314.54, 314.37], '1W': [280.67, 303.71, 317.31, 315.14, 314.37], '1M': [359.61, 375.15, 348.11, 348.15, 372.87, 356.35, 311.27, 310.84, 287.73, 293.64, 308.05, 298.52, 305.2, 301.88, 285.89, 284.05, 280.67, 303.71, 317.31, 315.14, 314.37], 'YTD': [209.37, 219.59, 253.86, 259.55, 263.03, 308.77, 331.23, 335.57, 305.02, 308.31, 356.38, 332.82, 374.98, 375.6, 387.24, 387.03, 339.42, 302.84, 317.08, 320.92, 354.37, 364.96, 372.87, 309.27, 285.89, 314.37], '6M': [263.03, 261.82, 279.17, 314.12, 335.74, 322.47, 311.39, 315.91, 356.38, 322.71, 366.95, 374.32, 377.19, 369.08, 345.63, 339.42, 302.84, 328.34, 322.5, 308.17, 353.32, 375.15, 311.27, 308.05, 284.05, 314.37], '1Y': [140.91, 138.92, 146.5, 161.89, 148.07, 155.55, 153.74, 159.52, 169.75, 167.35, 178.08, 179.98, 192.22, 198.42, 205.61, 219.2, 202.82, 188.88, 211.19, 219.38, 224.11, 208.77, 217.86, 227.65, 227.59, 250.95, 259.55, 263.03, 279.04, 321.34, 338.51, 330.54, 311.39, 315.91, 356.38, 322.71, 366.95, 374.32, 377.19, 361.39, 360.81, 339.19, 313.05, 317.08, 320.92, 308.17, 353.32, 375.15, 311.27, 308.05, 284.05, 314.37] },
      velocityScore: { '1D': -1.9, '1W': 7.4, '1M': 13.3, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 65.5, revenueGrowth: 26, eps: 4.8, grossMargin: 39, dividendYield: 0.13,
      etfPresence: { POW: 1.03, VOLT: 4.07, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Advanced Energy Industries is a power conversion and control company for semiconductor manufacturing equipment and data center power. It appears in Industrials ETFs on both semiconductor capex and data center power delivery demand. Revenue growth tracks the fab equipment cycle; margins are stable and the business generates consistent cash flow.',
    },
    {
      ticker: 'SO', name: 'Southern Co/The', easyScore: 2, avgWeight: 2.22, proScore: 0.89, coverage: 0.4,
      price: 96.93, weeklyPrices: [94.46, 93.85, 95.80, 96.60, 96.93], weeklyChange: 2.61, dayChange: 0.34, sortRank: 0, periodReturns: { '1M': 1.2, 'YTD': 11.2, '6M': 10.7, '1Y': 2 },
      priceHistory: { '1D': [96.6, 96.96, 96.93], '1W': [94.46, 93.85, 95.8, 96.6, 96.93], '1M': [95.78, 95.91, 97.16, 96.75, 95.71, 95.12, 97.98, 95.99, 97.29, 96.38, 95.61, 96.47, 95.96, 94.6, 96.07, 95.3, 94.46, 93.85, 95.8, 96.6, 96.93], 'YTD': [87.2, 87.01, 88.9, 88.84, 90.13, 90.86, 94.3, 97.38, 97.25, 99.11, 93.98, 96.94, 97.59, 94.51, 93.49, 95.99, 93.47, 94.14, 92.52, 91.62, 94, 94.93, 95.71, 95.17, 96.07, 96.93], '6M': [88.16, 88.19, 89.38, 92, 95.81, 96.79, 96.27, 98.27, 93.98, 96.52, 97.17, 94.64, 91.87, 94.41, 95.9, 93.47, 94.14, 93.74, 90.49, 94.02, 92.53, 95.91, 97.98, 95.61, 95.3, 96.93], '1Y': [95, 94.48, 95.35, 94.19, 94.62, 92.24, 91.78, 92.13, 91.45, 93.69, 93.89, 96.13, 98.43, 96.15, 95.07, 90.9, 91.17, 88.57, 91.12, 86.28, 84.73, 87.22, 87.17, 86.87, 86.74, 88.82, 88.84, 90.13, 90.72, 91.04, 95.92, 97.63, 96.27, 98.27, 93.98, 96.52, 97.17, 94.64, 91.87, 93.51, 93.51, 93.14, 93.62, 92.52, 91.62, 94.02, 92.53, 95.91, 97.98, 95.61, 95.3, 96.93] },
      velocityScore: { '1D': 0, '1W': -3.3, '1M': null, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 24.8, revenueGrowth: 8, eps: 3.91, grossMargin: 48, dividendYield: 3.17,
      etfPresence: { POW: 0.34, VOLT: false, PBD: false, PBW: false, IVEP: 4.11 },
      tonyNote: 'Southern Co/The appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.2% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'XEL', name: 'Xcel Energy Inc', easyScore: 2, avgWeight: 2.12, proScore: 0.85, coverage: 0.4,
      price: 81.08, weeklyPrices: [78.67, 78.72, 80.19, 80.77, 81.08], weeklyChange: 3.06, dayChange: 0.38, sortRank: 0, periodReturns: { '1M': -0.5, 'YTD': 9.8, '6M': 8.1, '1Y': 11.4 },
      priceHistory: { '1D': [80.77, 81.07, 81.08], '1W': [78.67, 78.72, 80.19, 80.77, 81.08], '1M': [81.47, 81.75, 82.23, 81.98, 80.3, 79.7, 81.96, 80.37, 80.67, 79.62, 80.06, 80.48, 80.17, 79.25, 79.98, 78.77, 78.67, 78.72, 80.19, 80.77, 81.08], 'YTD': [73.86, 74.26, 75.61, 76.33, 75.95, 77.92, 81.55, 83.36, 82.1, 81.63, 77.96, 79.71, 82.77, 81.08, 79.15, 81.17, 79.9, 79.73, 79.26, 77.77, 79.22, 80.33, 80.3, 79.02, 79.98, 81.08], '6M': [75.73, 74.5, 76.43, 80.75, 83.91, 83.17, 81.88, 81.41, 77.96, 79.44, 81.46, 78.65, 78.11, 79.48, 81.45, 79.9, 79.73, 81, 77.39, 78.1, 77.46, 81.75, 81.96, 80.06, 78.77, 81.08], '1Y': [72.78, 73.44, 73.23, 72.39, 73.16, 72.34, 72.68, 72.85, 72.17, 77.25, 79.6, 81.26, 81.1, 80.41, 81.59, 80.54, 80.14, 79.49, 82.11, 77.18, 74.68, 73.61, 74.42, 74.07, 74, 76.21, 76.33, 75.95, 77.5, 79.68, 83.55, 83.04, 81.88, 81.41, 77.96, 79.44, 81.46, 78.65, 78.11, 78.82, 80.55, 79.91, 79.86, 79.26, 77.77, 78.1, 77.46, 81.75, 81.96, 80.06, 78.77, 81.08] },
      velocityScore: { '1D': -1.2, '1W': null, '1M': 11.8, '6M': null }, isNew: false,
      marketCap: '$51B', pe: 23.4, revenueGrowth: 3, eps: 3.47, grossMargin: 46, dividendYield: 2.93,
      etfPresence: { POW: 2.22, VOLT: 2.02, PBD: false, PBW: false, IVEP: false },
      tonyNote: 'Xcel Energy Inc appears in 2 of 5 Electrification ETFs (40% coverage) with average weight 2.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Industrials ─────────────────────
  'Industrials': [
    {
      ticker: 'POWL', name: 'Powell Industries, Inc.', easyScore: 2, avgWeight: 5.27, proScore: 2.11, coverage: 0.4,
      price: 239.03, weeklyPrices: [228.28, 244.39, 240.68, 242.47, 239.03], weeklyChange: 4.71, dayChange: -1.42, sortRank: 0, periodReturns: { '1M': -18.8, 'YTD': 125, '6M': 71.6, '1Y': 198.6 },
      priceHistory: { '1D': [242.47, 240.34, 239.03], '1W': [228.28, 244.39, 240.68, 242.47, 239.03], '1M': [294.49, 309.2, 279.77, 281.09, 286.36, 264.86, 246.33, 248.05, 234.05, 231.85, 232.19, 225.66, 234.25, 247.01, 235.79, 232.79, 228.28, 244.39, 240.68, 242.47, 239.03], 'YTD': [106.26, 121.83, 139.99, 147.43, 151.08, 197.45, 182.27, 174.53, 173.36, 170.61, 186.82, 184.68, 230.81, 241.01, 252.76, 269.95, 308.05, 261.58, 288.9, 300.06, 294.75, 291.5, 286.36, 236.58, 235.79, 239.03], '6M': [141.15, 146.79, 187.3, 187.21, 186.39, 170.37, 176.51, 174.04, 186.82, 180.36, 218.07, 229.73, 242.77, 255.56, 294.69, 308.05, 261.58, 295.94, 299.73, 262.34, 294.03, 309.2, 246.33, 232.19, 232.79, 239.03], '1Y': [80.05, 79.03, 77.8, 85.17, 83.64, 90.42, 89.41, 97.47, 101.43, 94.58, 102.51, 103.18, 112.77, 113.88, 125.9, 125, 109.4, 98.12, 107.74, 114.04, 120.91, 109.59, 113.62, 120.46, 128.85, 142.76, 147.43, 151.08, 190.09, 180.99, 183, 170.96, 176.51, 174.04, 186.82, 180.36, 218.07, 229.73, 242.77, 253.49, 320.3, 300.84, 271.05, 288.9, 300.06, 262.34, 294.03, 309.2, 246.33, 232.19, 232.79, 239.03] },
      velocityScore: { '1D': 0.5, '1W': 10.5, '1M': 6, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 46.7, revenueGrowth: 7, eps: 5.12, grossMargin: 30, dividendYield: 0.15,
      etfPresence: { AIRR: 3.2, PRN: false, RSHO: 7.33, IDEF: false, BILT: false },
      tonyNote: 'Powell Industries is an industrial electrical equipment manufacturer — switchgear and power distribution for data centers and energy infrastructure. It appears in Industrials ETFs because data center power infrastructure spending is driving a backlog expansion that the market is pricing through a revenue growth multiple.',
    },
    {
      ticker: 'CAT', name: 'Caterpillar Inc', easyScore: 2, avgWeight: 5.01, proScore: 2, coverage: 0.4,
      price: 894.06, weeklyPrices: [864.30, 889.97, 889.31, 894.54, 894.06], weeklyChange: 3.44, dayChange: 0.07, sortRank: 0, periodReturns: { '1M': -10.1, 'YTD': 56.1, '6M': 42.7, '1Y': 108.2 },
      priceHistory: { '1D': [893.44, 895.65, 894.06], '1W': [864.3, 889.97, 889.31, 894.54, 894.06], '1M': [994.45, 1057.01, 997.47, 1033.19, 1064.9, 991.41, 963.53, 969.92, 940.12, 948.08, 952.41, 931.47, 933.34, 914.3, 877.17, 880.28, 864.3, 889.97, 889.31, 894.54, 894.06], 'YTD': [572.87, 617.62, 646.89, 638.91, 702.89, 775, 759.74, 742.83, 704.82, 699.78, 716.63, 730.32, 787.07, 794.65, 830.79, 874.78, 912.14, 860.15, 887.67, 940.48, 910.57, 984.24, 1064.9, 938.39, 877.17, 894.06], '6M': [635.92, 690.91, 742.12, 764.76, 768.23, 722.18, 716.68, 702, 716.63, 708.46, 771.58, 770.17, 808.87, 817.87, 904.59, 912.14, 860.15, 909.93, 926.18, 856.16, 955.92, 1057.01, 963.53, 952.41, 880.28, 894.06], '1Y': [429.52, 438.02, 417.12, 417.5, 417.89, 434.91, 423.08, 431.38, 466.96, 463.72, 490.57, 500.36, 540.96, 520.5, 583.15, 569.78, 553.55, 546.13, 575.76, 603.17, 625.61, 565.83, 583, 616.1, 629.77, 629, 638.91, 702.89, 742.37, 751.97, 766.61, 731.97, 716.68, 702, 716.63, 708.46, 771.58, 770.17, 808.87, 810.05, 926.93, 902.3, 872.56, 887.67, 940.48, 856.16, 955.92, 1057.01, 963.53, 952.41, 880.28, 894.06] },
      velocityScore: { '1D': 0, '1W': -1, '1M': -2.9, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 44.6, revenueGrowth: 22, eps: 20.04, grossMargin: 29, dividendYield: 0.73,
      etfPresence: { AIRR: false, PRN: 3.13, RSHO: 6.89, IDEF: false, BILT: false },
      tonyNote: 'Caterpillar is the global construction and mining equipment leader. It appears in Industrials ETFs as a mining equipment beneficiary — copper, lithium, and critical minerals mining demand is accelerating for EV batteries and grid infrastructure. Revenue is large and cyclically elevated; the institutional weight is a steady anchor allocation in every Industrials ETF.',
    },
    {
      ticker: 'AIT', name: 'Applied Industrial Technologies, Inc.', easyScore: 2, avgWeight: 3.81, proScore: 1.52, coverage: 0.4,
      price: 342.51, weeklyPrices: [335.94, 341.13, 341.44, 344.08, 342.51], weeklyChange: 1.96, dayChange: -0.37, sortRank: 0, periodReturns: { '1M': 2.6, 'YTD': 33.4, '6M': 22.3, '1Y': 27.8 },
      priceHistory: { '1D': [343.8, 342.51, 342.51], '1W': [335.94, 341.13, 341.44, 344.08, 342.51], '1M': [333.78, 343.54, 337.08, 334.16, 338.15, 332.08, 330.85, 328.53, 315.33, 315.88, 331.15, 329.35, 327.49, 327.65, 332.13, 336.41, 335.94, 341.13, 341.44, 344.08, 342.51], 'YTD': [256.77, 272.25, 281.21, 262.34, 273.22, 290.31, 281.97, 282.58, 267.57, 256.83, 264.14, 269.36, 286.41, 291.03, 293.35, 303.99, 313.7, 302.64, 308.53, 313.67, 320.11, 330.9, 338.15, 322.49, 332.13, 342.51], '6M': [281.54, 270.02, 282.45, 278.31, 282.27, 277.7, 264.31, 261.37, 264.14, 265.32, 280.74, 284.56, 289.82, 301.24, 305.48, 313.7, 302.64, 312.65, 313.39, 314.08, 329.89, 343.54, 330.85, 331.15, 336.41, 342.51], '1Y': [268.07, 271.5, 263.43, 273.04, 258.76, 266.47, 265.44, 269.68, 262.77, 259.1, 259.16, 251.03, 244.84, 260, 255.91, 259.66, 250.89, 242.52, 258.82, 257.91, 262.84, 259.48, 264.78, 263.15, 273.7, 277.44, 262.34, 273.22, 283.73, 279.27, 280.76, 279.91, 264.31, 261.37, 264.14, 265.32, 280.74, 284.56, 289.82, 296.57, 315.39, 310.87, 306.25, 308.53, 313.67, 314.08, 329.89, 343.54, 330.85, 331.15, 336.41, 342.51] },
      velocityScore: { '1D': 0, '1W': -4.4, '1M': -3.2, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 32.1, revenueGrowth: 7, eps: 10.67, grossMargin: 30, dividendYield: 0.59,
      etfPresence: { AIRR: 1.57, PRN: false, RSHO: 6.04, IDEF: false, BILT: false },
      tonyNote: 'Applied Industrial Technologies, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.8% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'STRL', name: 'Sterling Infrastructure, Inc.', easyScore: 2, avgWeight: 3.76, proScore: 1.51, coverage: 0.4,
      price: 709, weeklyPrices: [650.22, 694.40, 719.34, 717.34, 709.00], weeklyChange: 9.04, dayChange: -1.16, sortRank: 0, periodReturns: { '1M': -18.2, 'YTD': 131.5, '6M': 101.8, '1Y': 180.6 },
      priceHistory: { '1D': [717.34, 708.59, 709], '1W': [650.22, 694.4, 719.34, 717.34, 709], '1M': [867.23, 881.92, 804.76, 813.77, 839.36, 776.55, 700.75, 717.11, 674.39, 660.72, 682.29, 660.04, 679.62, 668.82, 641.35, 638.56, 650.22, 694.4, 719.34, 717.34, 709], 'YTD': [306.23, 308.13, 350.96, 372.25, 386.78, 433.91, 435.5, 428.13, 411.38, 417.76, 446.16, 421.29, 435.65, 463.65, 497.18, 529.49, 851.35, 728.29, 842.96, 993.74, 858.99, 892.25, 839.36, 707.17, 641.35, 709], '6M': [361.21, 367.95, 418.61, 421.2, 459.72, 415.51, 411.53, 425.51, 446.16, 407.27, 423.35, 456.08, 487.87, 471.85, 806, 851.35, 728.29, 782.12, 957.03, 770.25, 838.21, 881.92, 700.75, 682.29, 638.56, 709], '1Y': [252.68, 267.59, 299.64, 282.14, 278.03, 290.95, 285.98, 316.16, 348.58, 338.44, 351.66, 355.53, 361.02, 353.8, 379.03, 388.68, 326.6, 314.56, 344.31, 325.1, 340.51, 302.3, 316.55, 327.11, 307.58, 349.59, 372.25, 386.78, 415.19, 410.63, 455.25, 420.22, 411.53, 425.51, 446.16, 407.27, 423.35, 456.08, 487.87, 469.75, 886.22, 854.28, 752, 842.96, 993.74, 770.25, 838.21, 881.92, 700.75, 682.29, 638.56, 709] },
      velocityScore: { '1D': -0.7, '1W': -15.2, '1M': -31.7, '6M': null }, isNew: false,
      marketCap: '$22B', pe: 63.4, revenueGrowth: 92, eps: 11.19, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 3.36, PRN: 4.17, RSHO: false, IDEF: false, BILT: false },
      tonyNote: 'Sterling Infrastructure is a civil construction company specializing in e-infrastructure — data center site development, utility connections, and roads. It appears in Industrials ETFs as the ground-level builder of the AI data center ecosystem. Revenue grew strongly, backlog is multiyear, and the company is gaining wallet share from hyperscaler construction programs.',
    },
    {
      ticker: 'SPXC', name: 'SPX Technologies', easyScore: 2, avgWeight: 3.52, proScore: 1.41, coverage: 0.4,
      price: 220.53, weeklyPrices: [212.86, 217.02, 219.05, 219.80, 220.53], weeklyChange: 3.6, dayChange: 0.41, sortRank: 0, periodReturns: { '1M': -7, 'YTD': 10.2, '6M': 4.5, '1Y': 25.7 },
      priceHistory: { '1W': [212.86, 217.02, 219.05, 219.8, 220.53], '1M': [237.22, 244.56, 231.87, 238.21, 245.17, 231.72, 227.74, 232.19, 218.83, 213.56, 219.87, 215.14, 218.02, 217.59, 215.96, 211.73, 212.86, 217.02, 219.05, 219.8, 220.53], 'YTD': [200.06, 207.51, 217.65, 215.68, 215.43, 233.46, 242.29, 226.94, 209.8, 203.42, 200.67, 203.16, 215.54, 223.52, 222.82, 201.12, 198.99, 195.79, 213.82, 236.14, 230.05, 236.07, 245.17, 216.63, 215.96, 220.53], '6M': [215.21, 212.73, 223.86, 241.6, 243.04, 219.58, 210.96, 204.62, 200.67, 199.94, 212.22, 219.99, 220.62, 216.36, 207.81, 198.99, 195.79, 215.34, 234.08, 223.63, 235.29, 244.56, 227.74, 219.87, 211.73, 220.53], '1Y': [175.41, 182.39, 204.31, 186.56, 186.28, 191.13, 187.81, 190.25, 190.48, 182.95, 187.73, 185.97, 182.92, 190.4, 198.85, 217.63, 212.04, 199.31, 215.04, 208.67, 224.76, 210.34, 208.48, 205.44, 208.56, 217.9, 215.68, 215.43, 231.2, 241.58, 226.66, 222.07, 210.96, 204.62, 200.67, 199.94, 212.22, 219.99, 220.62, 211.36, 212.74, 203.79, 205.55, 213.82, 236.14, 223.63, 235.29, 244.56, 227.74, 219.87, 211.73, 220.53] },
      velocityScore: { '1D': 0, '1W': 25.9, '1M': 24.8, '6M': null }, isNew: false,
      marketCap: '$11B', pe: 42.2, revenueGrowth: 17, eps: 5.23, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 3.08, PRN: false, RSHO: 3.96, IDEF: false, BILT: false },
      tonyNote: 'SPX Technologies appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 3.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HWM', name: 'Howmet Aerospace Inc', easyScore: 2, avgWeight: 2.69, proScore: 1.07, coverage: 0.4,
      price: 287.93, weeklyPrices: [271.98, 279.00, 280.70, 287.09, 287.93], weeklyChange: 5.86, dayChange: 0.25, sortRank: 0, periodReturns: { '1M': 4.3, 'YTD': 40.4, '6M': 34, '1Y': 54.1 },
      priceHistory: { '1D': [287.21, 287.64, 287.93], '1W': [271.98, 279, 280.7, 287.09, 287.93], '1M': [276.06, 273.14, 268.87, 268.57, 268.86, 267.41, 270.41, 277.91, 275.43, 271.58, 270.85, 271.28, 276.78, 279.24, 271.19, 272.43, 271.98, 279, 280.7, 287.09, 287.93], 'YTD': [205.02, 218.27, 224.89, 215.53, 213.49, 230.85, 258.1, 262.53, 254.14, 240.73, 239.51, 239.04, 254.06, 255.69, 242.44, 239.7, 269.76, 253.12, 259.89, 249.33, 264.67, 275.13, 268.86, 273.77, 271.19, 287.93], '6M': [215.39, 207.21, 225.15, 252.55, 260.95, 258.84, 253.91, 240.24, 239.51, 230.46, 250, 254.04, 240.88, 240.43, 242.69, 269.76, 253.12, 258.02, 248.63, 249.49, 283.23, 273.14, 270.41, 270.85, 272.43, 287.93], '1Y': [186.8, 179.77, 181.58, 175.99, 173.25, 176.16, 178.2, 184.21, 191.84, 189.85, 191.08, 188.83, 191.68, 200.1, 201.77, 205.72, 201.3, 197.92, 204.59, 190.98, 195.89, 198, 211.22, 212.92, 220.15, 220.36, 215.53, 213.49, 224.47, 249.35, 259.64, 260.09, 253.91, 240.24, 239.51, 230.46, 250, 254.04, 240.88, 236.52, 256.43, 273.1, 261.21, 259.89, 249.33, 249.49, 283.23, 273.14, 270.41, 270.85, 272.43, 287.93] },
      velocityScore: { '1D': -18.9, '1W': -18.9, '1M': -4.5, '6M': null }, isNew: false,
      marketCap: '$115B', pe: 66.8, revenueGrowth: 19, eps: 4.31, grossMargin: 35, dividendYield: 0.17,
      etfPresence: { AIRR: false, PRN: 4.38, RSHO: false, IDEF: 0.99, BILT: false },
      tonyNote: 'Howmet Aerospace is an aerospace structures and engine components manufacturer. It appears in Industrials ETFs for its aerospace and defense exposure — commercial air travel recovery and defense spending growth are the two demand drivers. Revenue grew and margins are expanding as Howmet prices power over OEM customers.',
    },
    {
      ticker: 'ATI', name: 'ATI INC', easyScore: 2, avgWeight: 2.59, proScore: 1.04, coverage: 0.4,
      price: 199.87, weeklyPrices: [186.24, 197.21, 195.59, 199.84, 199.87], weeklyChange: 7.32, dayChange: 0.05, sortRank: 0, periodReturns: { '1M': 1.2, 'YTD': 74.2, '6M': 61.8, '1Y': 114.3 },
      priceHistory: { '1D': [199.78, 199.88, 199.87], '1W': [186.24, 197.21, 195.59, 199.84, 199.87], '1M': [197.59, 199.5, 197.4, 197.71, 197.1, 192.17, 188.1, 192.06, 183.26, 185.6, 187.04, 183.75, 189.44, 193.59, 185.51, 186.17, 186.24, 197.21, 195.59, 199.84, 199.87], 'YTD': [114.76, 122.3, 124.35, 124.15, 128.34, 138.72, 158.87, 163.59, 156.7, 147.48, 149.59, 151.25, 159.63, 164.66, 154.26, 153.89, 161.01, 150.44, 170.53, 181.1, 198.48, 199.6, 197.1, 188.36, 185.51, 199.87], '6M': [123.36, 121.77, 135.66, 146.75, 161.04, 156.96, 158.97, 148.83, 149.59, 145.46, 156.39, 156.83, 153.3, 151.7, 155.35, 161.01, 150.44, 169.84, 179.94, 183.37, 196.86, 199.5, 188.1, 187.04, 186.17, 199.87], '1Y': [93.27, 76.94, 73.74, 74.02, 71.8, 78.47, 77.63, 75.98, 80.48, 77.41, 82.52, 82.28, 81.22, 89.55, 101.18, 96.21, 98.56, 94.8, 100.8, 100.41, 110.65, 109.76, 116.95, 119.9, 123.46, 123.28, 124.15, 128.34, 137.04, 148.57, 160.02, 161.82, 158.97, 148.83, 149.59, 145.46, 156.39, 156.83, 153.3, 146.23, 165.08, 164.83, 153.73, 170.53, 181.1, 183.37, 196.86, 199.5, 188.1, 187.04, 186.17, 199.87] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$27B', pe: 65.7, revenueGrowth: 1, eps: 3.04, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: 4.89, IDEF: 0.29, BILT: false },
      tonyNote: 'ATI INC appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 2.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BWXT', name: 'BWX Technologies, Inc.', easyScore: 2, avgWeight: 2.03, proScore: 0.81, coverage: 0.4,
      price: 178.06, weeklyPrices: [169.56, 173.09, 175.17, 176.67, 178.06], weeklyChange: 5.01, dayChange: 0.82, sortRank: 0, periodReturns: { '1M': -13.4, 'YTD': 3, '6M': -14.3, '1Y': 23.8 },
      priceHistory: { '1D': [176.62, 177.9, 178.06], '1W': [169.56, 173.09, 175.17, 176.67, 178.06], '1M': [205.65, 204.77, 197.91, 189.25, 194.65, 191.25, 191.06, 196.89, 186.08, 184.11, 186, 177.14, 179.83, 176.91, 173.74, 171.18, 169.56, 173.09, 175.17, 176.67, 178.06], 'YTD': [172.84, 201.46, 217.89, 212.4, 210.88, 198.5, 206.44, 205.98, 200.39, 204.67, 204.76, 212.81, 230.29, 235.78, 223.15, 216.68, 206.83, 197.33, 199.27, 190.76, 193.45, 209.89, 194.65, 186.99, 173.74, 178.06], '6M': [206.04, 206.04, 203, 201.09, 204.23, 205.83, 195.91, 207.48, 204.76, 204.49, 231.78, 238.42, 219.1, 216.18, 206.15, 206.83, 197.33, 198.95, 184.72, 183, 203.07, 204.77, 191.06, 186, 171.18, 178.06], '1Y': [143.84, 151.93, 179.53, 174.7, 165.34, 165.83, 163.64, 170.1, 174.03, 176.21, 185.7, 195.6, 209.01, 199.92, 213.8, 193.93, 177.88, 175.28, 178.88, 177.87, 183.38, 170.75, 175.88, 189.02, 206.62, 206.07, 212.4, 210.88, 199.83, 202.25, 208.27, 205.57, 195.91, 207.48, 204.76, 204.49, 231.78, 238.42, 219.1, 208.08, 215.2, 206.83, 202.66, 199.27, 190.76, 183, 203.07, 204.77, 191.06, 186, 171.18, 178.06] },
      velocityScore: { '1D': -11, '1W': -9, '1M': -21.4, '6M': null }, isNew: false,
      marketCap: '$16B', pe: 47.5, revenueGrowth: 26, eps: 3.75, grossMargin: 23, dividendYield: 0.59,
      etfPresence: { AIRR: 3.04, PRN: false, RSHO: false, IDEF: 1.02, BILT: false },
      tonyNote: 'BWX Technologies is a nuclear component manufacturer — fuel assemblies for government reactors and commercial small modular reactors. It holds a position in Industrials ETFs as clean energy infrastructure demand grows. Revenue is steady from U.S. Navy nuclear propulsion contracts; the SMR optionality is the reason AI-adjacent ETF managers are adding positions.',
    },
    {
      ticker: 'KTOS', name: 'Kratos Defense & Security Solutions, Inc.', easyScore: 2, avgWeight: 1.83, proScore: 0.73, coverage: 0.4,
      price: 49.35, weeklyPrices: [45.94, 48.21, 47.89, 49.44, 49.35], weeklyChange: 7.42, dayChange: -0.18, sortRank: 0, periodReturns: { '1M': 2.9, 'YTD': -35, '6M': -55.3, '1Y': -15.9 },
      priceHistory: { '1D': [49.44, 49.56, 49.69, 49.35], '1W': [45.94, 48.21, 47.89, 49.44, 49.35], '1M': [47.95, 46.32, 47.21, 46.95, 49.86, 53.04, 55.35, 53.54, 50.34, 50.38, 48.19, 46.96, 50.36, 49.68, 46.96, 46.03, 45.94, 48.21, 47.89, 49.44, 49.35], 'YTD': [75.91, 113.7, 130.72, 118.06, 103.37, 87.78, 96.08, 86.18, 92.47, 89.53, 77.49, 67.7, 68.33, 70.99, 61.26, 61.93, 57.33, 53.47, 65.19, 63.4, 57.75, 50.8, 49.86, 48.85, 46.96, 49.35], '6M': [111.32, 96.16, 98.81, 91.97, 90.68, 88.95, 88.96, 95.31, 77.49, 70.51, 74.46, 74.66, 68.61, 61.66, 59.31, 57.33, 53.47, 57.3, 58.43, 54.82, 56.16, 46.32, 55.35, 48.19, 46.03, 49.35], '1Y': [58.66, 58.7, 59.08, 69.12, 64.78, 68.51, 64.81, 67.67, 80.65, 84.2, 95.03, 98.55, 88.62, 89.32, 88.3, 72.41, 71.69, 67.31, 76.1, 76.5, 78.78, 71.4, 77.7, 89.93, 117.86, 128.68, 118.06, 103.37, 93.48, 97.21, 88.23, 89.13, 88.96, 95.31, 77.49, 70.51, 74.46, 74.66, 68.61, 59.56, 61.52, 52.49, 55.82, 65.19, 63.4, 54.82, 56.16, 46.32, 55.35, 48.19, 46.03, 49.35] },
      velocityScore: { '1D': -5.2, '1W': 7.4, '1M': 2.8, '6M': null }, isNew: false,
      marketCap: '$9B', pe: 290.3, revenueGrowth: 23, eps: 0.17, grossMargin: 23, dividendYield: null,
      etfPresence: { AIRR: 3.01, PRN: false, RSHO: false, IDEF: 0.66, BILT: false },
      tonyNote: 'Kratos Defense is a defense technology company focused on unmanned systems, satellite communications, and high-performance computing for government customers. It appears in Industrials ETFs as an AI-adjacent defense name — autonomous systems and AI-driven surveillance are direct end markets. Revenue grew and the government contract backlog is expanding.',
    },
    {
      ticker: 'TTMI', name: 'TTM Technologies Inc', easyScore: 2, avgWeight: 1.74, proScore: 0.69, coverage: 0.4,
      price: 142.44, weeklyPrices: [133.17, 146.85, 144.70, 144.85, 142.44], weeklyChange: 6.96, dayChange: -1.66, sortRank: 0, periodReturns: { '1M': -32.1, 'YTD': 106.4, '6M': 49.9, '1Y': 221.8 },
      priceHistory: { '1D': [144.85, 142.94, 142.6, 142.44], '1W': [133.17, 146.85, 144.7, 144.85, 142.44], '1M': [209.74, 210.57, 191.49, 186.8, 187.02, 179.7, 155.98, 149.39, 144.08, 145.29, 146.44, 136.34, 141.97, 143.62, 130.14, 132, 133.17, 146.85, 144.7, 144.85, 142.44], 'YTD': [69, 73.88, 101.01, 94.61, 107.57, 91.9, 107.93, 104.24, 96.8, 96.51, 106.99, 97.08, 107.53, 126.24, 149.01, 157.47, 163.36, 161.41, 187.79, 184.84, 194.05, 213.17, 187.02, 149.97, 130.14, 142.44], '6M': [94.63, 102.76, 97.98, 90.91, 106.7, 104.05, 96.43, 97.54, 106.99, 97.42, 105.85, 116.6, 126.71, 137.59, 159.58, 163.36, 161.41, 190.67, 189.6, 172.12, 202.7, 210.57, 155.98, 146.44, 132, 142.44], '1Y': [44.27, 47.25, 43.36, 42.62, 40.78, 46.9, 47.7, 48.32, 52.84, 54.51, 60.28, 56.52, 58.45, 58.4, 61.98, 68.11, 63.1, 58.45, 70.18, 73.74, 80.24, 67.09, 71.72, 67.99, 77.89, 97.83, 94.61, 107.57, 93.77, 93.97, 108.86, 105.14, 96.43, 97.54, 106.99, 97.42, 105.85, 116.6, 126.71, 137.5, 164.64, 168.82, 169.36, 187.79, 184.84, 172.12, 202.7, 210.57, 155.98, 146.44, 132, 142.44] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$15B', pe: 77.4, revenueGrowth: 30, eps: 1.84, grossMargin: 21, dividendYield: null,
      etfPresence: { AIRR: false, PRN: 3.06, RSHO: false, IDEF: 0.41, BILT: false },
      tonyNote: 'TTM Technologies is a printed circuit board manufacturer held in Industrials ETFs. Revenue growth tracks data center and defense electronics demand. PCB manufacturing is essential hardware infrastructure; TTM\'s position in AI server and high-frequency trading hardware gives it exposure to two durable growth verticals.',
    },
    {
      ticker: 'AIR', name: 'AIRBUS GROUP', easyScore: 2, avgWeight: 1.67, proScore: 0.67, coverage: 0.4,
      price: 129.26, weeklyPrices: [135.69, 141.40, 127.60, 129.47, 129.26], weeklyChange: -4.74, dayChange: -0.31, sortRank: 0, periodReturns: { '1M': -2.8, 'YTD': 56.1, '6M': 22.3, '1Y': 66.8 },
      priceHistory: { '1D': [129.66, 128.69, 129.26], '1W': [135.69, 141.4, 127.6, 129.47, 129.26], '1M': [132.94, 138.51, 143.14, 141.85, 142.93, 142.76, 140.11, 143.61, 136.63, 133.3, 135.67, 130.9, 134.46, 135.73, 133.48, 135.34, 135.69, 141.4, 127.6, 129.47, 129.26], 'YTD': [82.79, 97.03, 105.08, 105.47, 109.89, 113.57, 116.97, 117.17, 107.87, 105.64, 107.81, 111.37, 123.04, 123.04, 110.54, 109.56, 111.51, 100.89, 114.97, 115.53, 129.01, 132.26, 142.93, 136.57, 133.48, 129.26], '6M': [104.26, 108, 114.34, 113.54, 118.26, 116.84, 108.3, 108.76, 107.81, 109.46, 120.78, 122.75, 111.5, 108.86, 111.9, 111.51, 100.89, 112.82, 111.36, 117.36, 132.14, 138.51, 140.11, 135.67, 135.34, 129.26], '1Y': [77.5, 74.71, 72.06, 77.15, 71.73, 75.81, 75.3, 75.32, 75.93, 82.66, 83.95, 81.27, 82.86, 85.69, 84.22, 82.25, 80.08, 77.35, 83.21, 82.7, 84.34, 81.88, 85.07, 88.02, 98.23, 103.67, 105.47, 109.89, 113.11, 114.63, 117.06, 118.61, 108.3, 108.76, 107.81, 109.46, 120.78, 122.75, 111.5, 105.69, 118.71, 107.47, 107.51, 114.97, 115.53, 117.36, 132.14, 138.51, 140.11, 135.67, 135.34, 129.26] },
      velocityScore: { '1D': 17.5, '1W': 21.8, '1M': null, '6M': null }, isNew: false,
      marketCap: '$5B', pe: 26.6, revenueGrowth: 23, eps: 4.86, grossMargin: 19, dividendYield: null,
      etfPresence: { AIRR: false, PRN: false, RSHO: false, IDEF: 3.2, BILT: false },
      tonyNote: 'AIRBUS GROUP appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.7% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'KRMN', name: 'Karman Holdings Inc.', easyScore: 2, avgWeight: 1.62, proScore: 0.65, coverage: 0.4,
      price: 48.84, weeklyPrices: [44.88, 46.67, 47.59, 49.72, 48.84], weeklyChange: 8.82, dayChange: -1.72, sortRank: 0, periodReturns: { '1M': 8.9, 'YTD': -33.3, '6M': -54.9, '1Y': -1.2 },
      priceHistory: { '1D': [49.7, 49.04, 49.19, 48.84], '1W': [44.88, 46.67, 47.59, 49.72, 48.84], '1M': [44.84, 46.27, 46.42, 47.1, 49.92, 54.93, 56.37, 53.36, 51.47, 49.96, 50.01, 45.13, 45.83, 48.78, 47.45, 46.17, 44.88, 46.67, 47.59, 49.72, 48.84], 'YTD': [73.17, 106.22, 108.5, 113.34, 111.72, 79.52, 81.62, 88.11, 106.09, 104.08, 101.84, 82.69, 84.22, 83.58, 70.22, 65.32, 62.48, 64.2, 65.86, 54.39, 47.83, 46.38, 49.92, 50.05, 47.45, 48.84], '6M': [108.71, 102.87, 97.47, 75.11, 83.6, 91.11, 102.79, 104.06, 101.84, 80.05, 87.75, 92.73, 82.11, 70.3, 62.89, 62.48, 64.2, 63.52, 51.84, 45.87, 52.03, 46.27, 56.37, 50.01, 46.17, 48.84], '1Y': [49.41, 51.7, 48.21, 50.91, 52.23, 55.45, 62.52, 63.8, 65.45, 67.4, 73.41, 74.51, 76.85, 81.99, 85.6, 74.98, 59.99, 58.96, 67.03, 65.45, 69.37, 68.11, 77.55, 83.99, 107.5, 106.28, 113.34, 111.72, 91.25, 81, 83.44, 98.88, 102.79, 104.06, 101.84, 80.05, 87.75, 92.73, 82.11, 65.98, 63.19, 67.28, 65.76, 65.86, 54.39, 45.87, 52.03, 46.27, 56.37, 50.01, 46.17, 48.84] },
      velocityScore: { '1D': 6.6, '1W': 51.2, '1M': 62.5, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 203.5, revenueGrowth: 51, eps: 0.24, grossMargin: 41, dividendYield: null,
      etfPresence: { AIRR: 2.96, PRN: false, RSHO: false, IDEF: 0.28, BILT: false },
      tonyNote: 'Karman Holdings Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'RBC', name: 'RBC Bearings Incorporated', easyScore: 2, avgWeight: 1.54, proScore: 0.62, coverage: 0.4,
      price: 596.78, weeklyPrices: [568.90, 585.35, 591.50, 595.31, 596.78], weeklyChange: 4.9, dayChange: 0.29, sortRank: 0, periodReturns: { '1M': -6.6, 'YTD': 33.1, '6M': 18.4, '1Y': 55 },
      priceHistory: { '1D': [595.05, 596.82, 596.78], '1W': [568.9, 585.35, 591.5, 595.31, 596.78], '1M': [638.94, 648.89, 630.36, 634.78, 644.06, 620.47, 604.56, 609.6, 600.26, 593.89, 595.49, 584.59, 588.18, 590.14, 580.27, 575.22, 568.9, 585.35, 591.5, 595.31, 596.78], 'YTD': [448.43, 487.16, 498.82, 504.54, 516.1, 550.53, 559.18, 575.92, 565.64, 546.91, 552.23, 551.99, 595.11, 589.77, 589.51, 593.12, 613.1, 565.22, 577.83, 589.76, 603.64, 633.44, 644.06, 595.61, 580.27, 596.78], '6M': [504.5, 507.13, 548.2, 552.93, 571.57, 568.58, 560.28, 544.55, 552.23, 543.12, 580.55, 586.98, 588.74, 594.39, 607.5, 613.1, 565.22, 577.42, 584.18, 576.74, 625.73, 648.89, 604.56, 595.49, 575.22, 596.78], '1Y': [385.02, 387.34, 404.66, 401.92, 390.52, 398.71, 387.48, 385.08, 384.72, 379.44, 374.99, 384.43, 369.71, 407.3, 406.45, 431.93, 431.55, 427.81, 444.97, 443.44, 458.15, 449.77, 456.33, 461.21, 488.31, 495.29, 504.54, 516.1, 547.51, 551.65, 565.44, 570.08, 560.28, 544.55, 552.23, 543.12, 580.55, 586.98, 588.74, 584.49, 623.19, 618.91, 571.05, 577.83, 589.76, 576.74, 625.73, 648.89, 604.56, 595.49, 575.22, 596.78] },
      velocityScore: { '1D': -7.5, '1W': 34.8, '1M': 29.2, '6M': null }, isNew: false,
      marketCap: '$19B', pe: 65.5, revenueGrowth: 18, eps: 9.11, grossMargin: 45, dividendYield: null,
      etfPresence: { AIRR: 2.88, PRN: false, RSHO: false, IDEF: 0.21, BILT: false },
      tonyNote: 'RBC Bearings Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'HII', name: 'Huntington Ingalls Industries, Inc.', easyScore: 2, avgWeight: 1.38, proScore: 0.55, coverage: 0.4,
      price: 288.47, weeklyPrices: [270.04, 268.76, 277.28, 287.09, 288.47], weeklyChange: 6.83, dayChange: 0.41, sortRank: 0, periodReturns: { '1M': 3.2, 'YTD': -15.2, '6M': -31.1, '1Y': 9.5 },
      priceHistory: { '1D': [287.29, 288.52, 289.4, 288.47], '1W': [270.04, 268.76, 277.28, 287.09, 288.47], '1M': [279.62, 279.09, 281.99, 277.39, 279.89, 278.97, 291.5, 294.1, 289.46, 289.47, 286.09, 284.86, 280, 277.79, 271.05, 269.13, 270.04, 268.76, 277.28, 287.09, 288.47], 'YTD': [340.07, 386.99, 425.9, 422.79, 429.64, 392.7, 437.57, 444.52, 429.58, 416.59, 402.08, 393.32, 403.37, 394.81, 359.29, 363.37, 333.56, 324.6, 320.9, 294.53, 297.68, 283.48, 279.89, 286.21, 271.05, 288.47], '6M': [413.56, 420.3, 405.82, 417.83, 447.73, 440.33, 417.51, 422.94, 402.08, 379.9, 411.35, 398.13, 366.88, 361.4, 326.13, 333.56, 324.6, 317.56, 287.54, 289.13, 296.89, 279.09, 291.5, 286.09, 269.13, 288.47], '1Y': [263.33, 278.86, 266.45, 267.46, 266.48, 275.27, 271.13, 276.07, 274.69, 271.25, 282.22, 286.14, 282.66, 290.09, 319.07, 305.43, 312.67, 301.83, 313.62, 304.58, 326.72, 322.63, 351.13, 363.48, 398.25, 415.58, 422.79, 429.64, 399.37, 424.89, 435.58, 437.03, 417.51, 422.94, 402.08, 379.9, 411.35, 398.13, 366.88, 362.17, 319.54, 334.22, 321.92, 320.9, 294.53, 289.13, 296.89, 279.09, 291.5, 286.09, 269.13, 288.47] },
      velocityScore: { '1D': -17.9, '1W': -23.6, '1M': -23.6, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 18.7, revenueGrowth: 13, eps: 15.39, grossMargin: 12, dividendYield: 1.92,
      etfPresence: { AIRR: 2.39, PRN: false, RSHO: false, IDEF: 0.37, BILT: false },
      tonyNote: 'Huntington Ingalls Industries is the only builder of nuclear-powered aircraft carriers for the U.S. Navy. Revenue is government-contracted and predictable; the ETF allocation in Industrials reflects defense spending growth and the Navy\'s backlog of nuclear submarine and carrier construction. A steady-state quality compounder in a market structure with no competition.',
    },
    {
      ticker: 'WMB', name: 'WILLIAMS COS INC/THE', easyScore: 2, avgWeight: 1.27, proScore: 0.51, coverage: 0.4,
      price: 76.09, weeklyPrices: [74.16, 73.36, 74.49, 75.25, 76.09], weeklyChange: 2.6, dayChange: 1.12, sortRank: 0, periodReturns: { '1M': 0.3, 'YTD': 26.6, '6M': 17.1, '1Y': 29.5 },
      priceHistory: { '1D': [75.25, 75.91, 76.09], '1W': [74.16, 73.36, 74.49, 75.25, 76.09], '1M': [75.87, 77.53, 77.92, 75.06, 74.34, 72.77, 73.14, 72.82, 75.08, 75.27, 75.02, 74.46, 75.98, 74.38, 74.73, 73.38, 74.16, 73.36, 74.49, 75.25, 76.09], 'YTD': [60.11, 60.32, 61.55, 65.48, 68.5, 71.12, 72.98, 74.72, 73.18, 73.89, 74.46, 71.83, 72.82, 71.15, 72.18, 75.41, 74.73, 79.4, 73.13, 72.43, 72.08, 75.79, 74.34, 75.45, 74.73, 76.09], '6M': [64.29, 66.34, 67.85, 71.96, 73.5, 75.88, 73.84, 73.69, 74.46, 72.78, 73.01, 70.76, 71.1, 73.04, 76.12, 74.73, 79.4, 74.37, 71.66, 72.26, 71.25, 77.53, 73.14, 75.02, 73.38, 76.09], '1Y': [58.75, 59.95, 57.89, 57.34, 57.8, 58, 57.2, 59.33, 60.38, 63.31, 64.06, 63.1, 62.53, 58.93, 57.62, 57.94, 59.59, 58.91, 60.93, 62.81, 60.92, 58.66, 59.52, 61.16, 59.56, 61.51, 65.48, 68.5, 68.84, 72.14, 73.97, 75.77, 73.84, 73.69, 74.46, 72.78, 73.01, 70.76, 71.1, 73.32, 73.76, 75.71, 77.88, 73.13, 72.43, 72.26, 71.25, 77.53, 73.14, 75.02, 73.38, 76.09] },
      velocityScore: { '1D': 2, '1W': 2, '1M': -10.5, '6M': null }, isNew: false,
      marketCap: '$93B', pe: 33.4, revenueGrowth: 9, eps: 2.28, grossMargin: 64, dividendYield: 2.79,
      etfPresence: { AIRR: false, PRN: false, RSHO: 0.92, IDEF: false, BILT: 1.61 },
      tonyNote: 'WILLIAMS COS INC/THE appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.3% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MRCY', name: 'Mercury Systems, Inc.', easyScore: 2, avgWeight: 1.14, proScore: 0.46, coverage: 0.4,
      price: 106.35, weeklyPrices: [94.73, 98.64, 98.92, 106.34, 106.35], weeklyChange: 12.27, dayChange: 0.01, sortRank: 0, periodReturns: { '1M': 1.3, 'YTD': 45.7, '6M': 7.4, '1Y': 102.7 },
      priceHistory: { '1D': [106.34, 105.68, 106.35], '1W': [94.73, 98.64, 98.92, 106.34, 106.35], '1M': [105, 105.57, 109.38, 110.22, 122.33, 123.05, 126.21, 123.07, 115.83, 112.41, 107.98, 98.26, 100.32, 102.97, 96, 96.08, 94.73, 98.64, 98.92, 106.34, 106.35], 'YTD': [73.01, 93.48, 103.02, 101.04, 99.28, 80.33, 87.63, 89.03, 89.36, 80.71, 74.49, 74.75, 79.23, 84.05, 77.99, 78.53, 92.32, 92.8, 108.11, 117.82, 120.3, 110.87, 122.33, 114.25, 96, 106.35], '6M': [98.89, 93.89, 85.37, 83.32, 88.76, 89.43, 86.87, 81.35, 74.49, 72.91, 80.81, 85.51, 82.61, 76.53, 82.96, 92.32, 92.8, 97.11, 111.59, 106.81, 115.5, 105.57, 126.21, 107.98, 96.08, 106.35], '1Y': [52.46, 52.59, 52.62, 66.83, 65.64, 68.5, 68.93, 73.08, 77.1, 73.13, 82.56, 80.96, 77.1, 77.6, 76.8, 75.36, 71.26, 66.12, 69.89, 70.58, 76.61, 68.88, 74.22, 81.29, 97.02, 97.1, 101.04, 99.28, 84.36, 86.66, 89.3, 89.18, 86.87, 81.35, 74.49, 72.91, 80.81, 85.51, 82.61, 74.75, 91.66, 92.5, 94.81, 108.11, 117.82, 106.81, 115.5, 105.57, 126.21, 107.98, 96.08, 106.35] },
      velocityScore: { '1D': -4.2, '1W': 17.9, '1M': 4.5, '6M': null }, isNew: false,
      marketCap: '$6B', pe: null, revenueGrowth: 12, eps: -0.23, grossMargin: 29, dividendYield: null,
      etfPresence: { AIRR: 1.58, PRN: false, RSHO: false, IDEF: 0.7, BILT: false },
      tonyNote: 'Mercury Systems, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.1% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'MWH', name: 'SOLV Energy, Inc. (Class A)', easyScore: 2, avgWeight: 0.97, proScore: 0.39, coverage: 0.4,
      price: 29.92, weeklyPrices: [27.98, 28.54, 28.97, 29.93, 29.92], weeklyChange: 6.93, dayChange: -0.02, sortRank: 0, periodReturns: { '1M': -13.2, 'YTD': -3.2, '6M': -3.2, '1Y': -3.2 },
      priceHistory: { '1D': [29.93, 29.92, 29.92], '1W': [27.98, 28.54, 28.97, 29.93, 29.92], '1M': [34.46, 36.84, 35.84, 35.35, 34.05, 31.52, 30.45, 31.34, 29.03, 28.97, 28.92, 27.32, 28.81, 29.76, 28.74, 28.41, 27.98, 28.54, 28.97, 29.93, 29.92], 'YTD': [30.91, 30.5, 30.29, 29.71, 28.88, 30, 28.99, 28.51, 28.32, 32.67, 34.47, 38.82, 39.84, 42.07, 46.77, 38.72, 38.11, 36.46, 32.8, 32.18, 32.63, 35.35, 29.03, 27.32, 27.98, 29.92], '6M': [30.91, 30.5, 30.29, 29.71, 28.88, 30, 28.99, 28.51, 28.32, 32.67, 34.47, 38.82, 39.84, 42.07, 46.77, 38.72, 38.11, 36.46, 32.8, 32.18, 32.63, 35.35, 29.03, 27.32, 27.98, 29.92], '1Y': [30.91, 31.86, 30.5, 30.81, 30.29, 31.53, 29.71, 27.04, 28.15, 27.86, 30, 28.5, 28.45, 29.48, 28.2, 29.64, 28.9, 28.94, 31.66, 33.97, 34.47, 34.08, 37.63, 37.99, 37.53, 40.65, 42.27, 43.09, 45.84, 44.82, 40.42, 38.72, 39.48, 36.71, 34.63, 34.87, 32.81, 29.99, 31.75, 34.48, 34.21, 32.63, 36.84, 34.05, 30.45, 29.03, 28.43, 27.32, 29.76, 27.98, 28.97, 29.92] },
      velocityScore: { '1D': 2.6, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$6B', pe: 47.5, revenueGrowth: 66, eps: 0.63, grossMargin: 19, dividendYield: null,
      etfPresence: { AIRR: 1.12, PRN: false, RSHO: 0.82, IDEF: false, BILT: false },
      tonyNote: 'SOLV Energy, Inc. (Class A) appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 1.0% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DRS', name: 'Leonardo DRS, Inc.', easyScore: 2, avgWeight: 0.55, proScore: 0.22, coverage: 0.4,
      price: 48.29, weeklyPrices: [44.41, 45.46, 45.91, 48.16, 48.29], weeklyChange: 8.74, dayChange: 0.27, sortRank: 0, periodReturns: { '1M': 8.1, 'YTD': 41.7, '6M': 17.8, '1Y': 1.8 },
      priceHistory: { '1D': [48.16, 48.14, 48.16, 48.29], '1W': [44.41, 45.46, 45.91, 48.16, 48.29], '1M': [44.69, 44.36, 42.48, 40.95, 42.67, 42.69, 43.72, 45.37, 45.47, 44.71, 44.15, 43.35, 44.37, 43.82, 43.1, 44.14, 44.41, 45.46, 45.91, 48.16, 48.29], 'YTD': [34.09, 40.99, 42.57, 42.16, 41.51, 37.87, 40.03, 43.39, 47.41, 45.3, 44.06, 45.86, 47.1, 44.57, 39.98, 40, 42.87, 42.81, 48.41, 46.71, 48.53, 45.74, 42.67, 44.67, 43.1, 48.29], '6M': [40.63, 40.45, 40.22, 39.13, 43.82, 45.51, 46.35, 45.6, 44.06, 44.52, 47.93, 46.29, 42.07, 40.18, 39.7, 42.87, 42.81, 45.35, 45.61, 46.11, 46.58, 44.36, 43.72, 44.15, 44.14, 48.29], '1Y': [47.45, 41.6, 41.25, 41.74, 41.04, 42.47, 41.2, 41.61, 42.58, 42.35, 44.63, 44.21, 39.6, 40.53, 36.05, 35.31, 34.53, 33.08, 34.17, 33.9, 34.78, 33.17, 34.28, 37.01, 41.27, 42.07, 42.16, 41.51, 39.48, 39.9, 42.36, 46.95, 46.35, 45.6, 44.06, 44.52, 47.93, 46.29, 42.07, 39.47, 41.79, 42.5, 44.56, 48.41, 46.71, 46.11, 46.58, 44.36, 43.72, 44.15, 44.14, 48.29] },
      velocityScore: { '1D': 4.8, '1W': -4.3, '1M': -4.3, '6M': null }, isNew: false,
      marketCap: '$13B', pe: 45.1, revenueGrowth: 6, eps: 1.07, grossMargin: 24, dividendYield: 0.78,
      etfPresence: { AIRR: 0.77, PRN: false, RSHO: false, IDEF: 0.32, BILT: false },
      tonyNote: 'Leonardo DRS, Inc. appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.6% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DCO', name: 'Ducommun Incorporated', easyScore: 2, avgWeight: 0.46, proScore: 0.18, coverage: 0.4,
      price: 175.7, weeklyPrices: [168.66, 175.11, 174.59, 175.51, 175.70], weeklyChange: 4.17, dayChange: 0.17, sortRank: 0, periodReturns: { '1M': 6.3, 'YTD': 84.7, '6M': 55.7, '1Y': 98.1 },
      priceHistory: { '1W': [168.66, 175.11, 174.59, 175.51, 175.7], '1M': [165.31, 170.41, 177.66, 184.42, 185.21, 190.25, 186.6, 189.18, 179.95, 172.64, 165.05, 163.5, 168.75, 174.45, 168.67, 168.47, 168.66, 175.11, 174.59, 175.51, 175.7], 'YTD': [95.13, 107.75, 114.24, 111.29, 121.42, 120.52, 126.58, 123.59, 131.48, 126.91, 123.91, 126.43, 140.59, 138, 139.41, 137.01, 145.03, 141.75, 152.24, 150.14, 164.54, 162.26, 185.21, 170.84, 168.67, 175.7], '6M': [110.46, 115.02, 122.48, 125.19, 125.8, 135.11, 131.02, 125.87, 123.91, 122, 138.14, 141.35, 136.73, 143.11, 142.56, 145.03, 141.75, 148.66, 146.92, 153.95, 163.49, 170.41, 186.6, 165.05, 168.47, 175.7], '1Y': [88.69, 90.98, 91.86, 91.46, 89.34, 91.85, 90.45, 93.22, 96, 91.63, 94.23, 96.93, 91.65, 99.88, 91.94, 89.15, 91.44, 86.79, 91.69, 89.44, 95.11, 91.9, 96.46, 100.2, 109.25, 112.27, 111.29, 121.42, 121.17, 123.99, 126.77, 139.45, 131.02, 125.87, 123.91, 122, 138.14, 141.35, 136.73, 138.4, 146.89, 151.15, 143.2, 152.24, 150.14, 153.95, 163.49, 170.41, 186.6, 165.05, 168.47, 175.7] },
      velocityScore: { '1D': -18.2, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: null, revenueGrowth: 9, eps: -1.72, grossMargin: 27, dividendYield: null,
      etfPresence: { AIRR: 0.73, PRN: false, RSHO: false, IDEF: 0.19, BILT: false },
      tonyNote: 'Ducommun Incorporated appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TPC', name: 'Tutor Perini Corporation', easyScore: 2, avgWeight: 0.45, proScore: 0.18, coverage: 0.4,
      price: 87.7, weeklyPrices: [80.54, 86.78, 87.00, 87.66, 87.70], weeklyChange: 8.9, dayChange: 0.19, sortRank: 0, periodReturns: { '1M': 6.5, 'YTD': 30.9, '6M': 15.4, '1Y': 81.6 },
      priceHistory: { '1D': [87.54, 87.46, 88.17, 87.7], '1W': [80.54, 86.78, 87, 87.66, 87.7], '1M': [82.36, 81.56, 79.53, 81.88, 82.97, 79.51, 76.75, 79.91, 74.87, 75.49, 75.89, 74.74, 77.77, 79.29, 78.89, 78.62, 80.54, 86.78, 87, 87.66, 87.7], 'YTD': [67.02, 70.53, 75.09, 78.53, 82.33, 85.07, 86.9, 75.37, 72.04, 71.31, 75.25, 78.71, 81.5, 84.22, 86.76, 92.76, 82.69, 74.91, 73.27, 72.38, 74.92, 81, 82.97, 74.98, 78.89, 87.7], '6M': [77.34, 80.11, 84.07, 82.24, 85.87, 69.95, 71.29, 71.44, 75.25, 77.19, 80.54, 86.25, 84.19, 86.87, 97.31, 82.69, 74.91, 74.47, 72.26, 68.72, 77.89, 81.56, 76.75, 75.89, 78.62, 87.7], '1Y': [48.29, 48.15, 55.07, 57.25, 57.02, 59.93, 62.63, 62.89, 66.22, 64.33, 62.04, 61.75, 64.19, 67.67, 67.69, 67.4, 59.64, 59.75, 68.55, 67.82, 70.46, 67.56, 69.06, 71.79, 74.25, 74.13, 78.53, 82.33, 86, 81.1, 86.1, 73.71, 71.29, 71.44, 75.25, 77.19, 80.54, 86.25, 84.19, 86.04, 96.98, 80.64, 76.99, 73.27, 72.38, 68.72, 77.89, 81.56, 76.75, 75.89, 78.62, 87.7] },
      velocityScore: { '1D': 12.5, '1W': 20, '1M': 20, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 60.1, revenueGrowth: 12, eps: 1.46, grossMargin: 12, dividendYield: 0.27,
      etfPresence: { AIRR: 0.77, PRN: false, RSHO: false, IDEF: 0.12, BILT: false },
      tonyNote: 'Tutor Perini Corporation appears in 2 of 5 Industrials ETFs (40% coverage) with average weight 0.5% — moderate conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

  // ── Meme ─────────────────────
  'Meme': [
    {
      ticker: 'NBIS', name: 'Nebius Group', easyScore: 3, avgWeight: 4.56, proScore: 4.56, coverage: 1,
      price: 209.86, weeklyPrices: [182.62, 216.92, 218.16, 220.97, 209.86], weeklyChange: 14.92, dayChange: -5.03, sortRank: 0, periodReturns: { '1M': -19.2, 'YTD': 150.7, '6M': 122.1, '1Y': 302.3 },
      priceHistory: { '1D': [220.97, 213.74, 211.41, 209.86], '1W': [182.62, 216.92, 218.16, 220.97, 209.86], '1M': [259.66, 256.63, 240.3, 261.15, 276.17, 229.18, 215.62, 213.02, 195.19, 216.48, 219.65, 210.51, 194.09, 199.51, 171.77, 177.71, 182.62, 216.92, 218.16, 220.97, 209.86], 'YTD': [83.71, 97.93, 108.73, 97.87, 89.95, 88.61, 97.92, 91.19, 94.94, 129.85, 114.91, 101.95, 136.33, 157.14, 147.16, 176.42, 179.11, 197.73, 226.34, 259.67, 232.36, 275.25, 276.17, 216.2, 171.77, 209.86], '6M': [91.46, 88.16, 92.88, 97.52, 102.58, 86.8, 96.43, 116.33, 114.91, 103.76, 125, 166.77, 156.14, 135.51, 175.92, 179.11, 197.73, 208.37, 251.68, 211.69, 280.91, 256.63, 215.62, 219.65, 177.71, 209.86], '1Y': [52.16, 54.43, 65.31, 68.46, 66.18, 72.04, 65.47, 89.19, 94.12, 107.94, 125.87, 132.64, 123.04, 106.16, 124.18, 109.44, 88.63, 84.64, 94.87, 98.04, 94.28, 78.09, 87.59, 92.83, 107.33, 99.29, 97.87, 89.95, 91.79, 101.8, 106.12, 97.78, 96.43, 116.33, 114.91, 103.76, 125, 166.77, 156.14, 141.19, 195.09, 207.27, 191.82, 226.34, 259.67, 211.69, 280.91, 256.63, 215.62, 219.65, 177.71, 209.86] },
      velocityScore: { '1D': 4.3, '1W': 14.3, '1M': -16.6, '6M': null }, isNew: false,
      marketCap: '$53B', pe: 81, revenueGrowth: 684, eps: 2.59, grossMargin: 72, dividendYield: null,
      etfPresence: { BUZZ: 2.68, MEME: 7.36, RKNG: 3.65 },
      tonyNote: 'Nebius is the highest-growth name in the AI theme — 684% revenue growth, 72% gross margin, held by 3 ETFs. At $59B market cap and a P/E of 89x, it is pricing in continued hypergrowth. The 529% 1-year return is extraordinary for a name this size; the 38% ETF coverage says a minority of AI ETF managers are taking the bet, and those who did have been well rewarded.',
    },
    {
      ticker: 'BE', name: 'Bloom Energy', easyScore: 2, avgWeight: 4.92, proScore: 3.28, coverage: 0.667,
      price: 208.66, weeklyPrices: [197.06, 226.26, 218.22, 217.30, 208.66], weeklyChange: 5.89, dayChange: -3.99, sortRank: 0, periodReturns: { '1M': -36, 'YTD': 140.1, '6M': 44, '1Y': 531.2 },
      priceHistory: { '1D': [217.35, 210.4, 208.66], '1W': [197.06, 226.26, 218.22, 217.3, 208.66], '1M': [326.19, 309.18, 252.02, 275.01, 302.7, 289.5, 270.89, 295.05, 269.57, 254.29, 244.61, 233.49, 243.4, 239.38, 206.73, 214.96, 197.06, 226.26, 218.22, 217.3, 208.66], 'YTD': [86.89, 134.07, 149.5, 152.31, 168.89, 155.54, 147.55, 155.67, 151.32, 153.68, 145.88, 132.45, 160.13, 207.86, 231.17, 288.64, 280.69, 261.34, 290.01, 291.37, 260.22, 321.98, 302.7, 257.02, 206.73, 208.66], '6M': [139.62, 156.13, 155.17, 145.32, 166.2, 153.02, 154, 160.05, 145.88, 135.49, 146.78, 213.84, 229.75, 226.37, 295.25, 280.69, 261.34, 293.8, 287.32, 234.23, 284.99, 309.18, 270.89, 244.61, 214.96, 208.66], '1Y': [33.06, 37.39, 36.8, 45.11, 44.83, 54.8, 57.07, 67.29, 80.97, 68.69, 88, 86.65, 115.09, 101.42, 127.85, 136.86, 103.55, 93.38, 109.24, 119.18, 108.99, 80.21, 90.18, 103.87, 136.87, 151.75, 152.31, 168.89, 148.7, 157.27, 174.77, 164.78, 154, 160.05, 145.88, 135.49, 146.78, 213.84, 229.75, 287.97, 285.47, 289.76, 282.31, 290.01, 291.37, 234.23, 284.99, 309.18, 270.89, 244.61, 214.96, 208.66] },
      velocityScore: { '1D': -1.5, '1W': -8.6, '1M': -15.2, '6M': null }, isNew: false,
      marketCap: '$59B', pe: null, revenueGrowth: 130, eps: -0.04, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.6, RKNG: 3.25 },
      tonyNote: 'Bloom Energy is a fringe AI infrastructure holding — 2 ETFs, 3.33% average weight — positioned on fuel cell power generation for data centers. Revenue grew 130% but EPS is -$0.03, gross margin 30%, and the P/E is not calculable. The 1443% 1-year return is the headline number; this is a high-conviction, small-weight speculative position for the ETF managers that hold it.',
    },
    {
      ticker: 'IREN', name: 'IREN Ltd', easyScore: 2, avgWeight: 4.75, proScore: 3.17, coverage: 0.667,
      price: 39.23, weeklyPrices: [40.20, 41.29, 41.28, 40.58, 39.23], weeklyChange: -2.41, dayChange: -3.33, sortRank: 0, periodReturns: { '1M': -22, 'YTD': 3.9, '6M': -30.8, '1Y': 116.3 },
      priceHistory: { '1D': [40.58, 39.67, 39.5, 39.23], '1W': [40.2, 41.29, 41.28, 40.58, 39.23], '1M': [50.3, 47.74, 47.21, 45.91, 45.73, 43.32, 38.82, 43.91, 39.81, 43.01, 41.14, 38.98, 38.59, 38.28, 34.83, 33.62, 40.2, 41.29, 41.28, 40.58, 39.23], 'YTD': [37.77, 46.03, 57.82, 59.99, 54.39, 42.67, 39.98, 40.95, 38.84, 44.94, 41.12, 34.09, 37.06, 48.12, 50.64, 49.48, 56.56, 47.74, 64.05, 61.86, 59.77, 54.72, 45.73, 41.72, 34.83, 39.23], '6M': [52.36, 53.08, 46.15, 40.97, 45.45, 38.85, 38.12, 42.96, 41.12, 34.28, 36.83, 48.82, 48.39, 44.44, 54.74, 56.56, 47.74, 67.84, 65.48, 51.52, 58.11, 47.74, 38.82, 41.14, 33.62, 39.23], '1Y': [18.14, 16.11, 18.57, 19.08, 19.59, 23.04, 26.15, 32.85, 36.32, 46.29, 47.02, 63.85, 61.83, 55.86, 58.22, 66.96, 48.65, 43.47, 47.81, 44.71, 43.94, 35.8, 40.3, 48.24, 50.33, 54.26, 59.99, 54.39, 42.93, 42.08, 44.03, 43.84, 38.12, 42.96, 41.12, 34.28, 36.83, 48.82, 48.39, 42.86, 60.98, 55.17, 52.71, 64.05, 61.86, 51.52, 58.11, 47.74, 38.82, 41.14, 33.62, 39.23] },
      velocityScore: { '1D': -1.2, '1W': 17, '1M': -22.5, '6M': null }, isNew: false,
      marketCap: '$14B', pe: 50.9, revenueGrowth: 0, eps: 0.77, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: 2.63, MEME: 6.88, RKNG: false },
      tonyNote: 'IREN (formerly Iris Energy) is an AI compute and Bitcoin mining company that uses renewable energy for both workloads. It appears in Meme ETFs because the combination of crypto and AI infrastructure in a single company generates strong retail narrative interest. Revenue is growing; the fundamental thesis depends on sustained AI compute demand and Bitcoin prices.',
    },
    {
      ticker: 'SNDK', name: 'Sandisk', easyScore: 2, avgWeight: 4.75, proScore: 3.16, coverage: 0.667,
      price: 1558.12, weeklyPrices: [1390.95, 1589.40, 1599.27, 1610.33, 1558.12], weeklyChange: 12.02, dayChange: -3.24, sortRank: 0, periodReturns: { '1M': -18.6, 'YTD': 556.4, '6M': 228.8, '1Y': 3604.5 },
      priceHistory: { '1D': [1610.33, 1565.38, 1558.12], '1W': [1390.95, 1589.4, 1599.27, 1610.33, 1558.12], '1M': [1914.46, 2335, 2090.71, 2050.39, 2273.73, 2032.22, 1745, 1744.43, 1617.7, 1727.18, 1915.92, 1673.97, 1757.82, 1615, 1411.08, 1354.82, 1390.95, 1589.4, 1599.27, 1610.33, 1558.12], 'YTD': [237.38, 377.41, 413.62, 481.43, 695.51, 599.34, 649.97, 635.36, 588.73, 703.63, 702.48, 692.73, 851.57, 920.99, 989.9, 1255.86, 1452.02, 1383.29, 1641.64, 1759.68, 1980.1, 1963.6, 2273.73, 1858.27, 1411.08, 1558.12], '6M': [470.8, 665.24, 583.4, 590.59, 638.52, 565.41, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1002.35, 1406.32, 1452.02, 1383.29, 1589.94, 1831.5, 1643.23, 1958.8, 2335, 1745, 1915.92, 1354.82, 1558.12], '1Y': [42.06, 42.92, 40.69, 46.68, 45.5, 50.87, 68.55, 84.3, 98.87, 94.29, 124.14, 129.68, 144.27, 167.05, 195.82, 207.69, 243.57, 195.96, 223.28, 228.47, 241.61, 219.46, 250.05, 274.08, 389.27, 453.12, 481.43, 695.51, 541.64, 600.4, 632.38, 599.06, 618.89, 720.17, 702.48, 635.34, 780.9, 891.72, 979.07, 1064.21, 1409.98, 1447.23, 1392.56, 1641.64, 1759.68, 1643.23, 1958.8, 2335, 1745, 1915.92, 1354.82, 1558.12] },
      velocityScore: { '1D': 1.6, '1W': 7.1, '1M': -29.8, '6M': null }, isNew: false,
      marketCap: '$231B', pe: 53.2, revenueGrowth: 251, eps: 29.31, grossMargin: 56, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.31, RKNG: 3.18 },
      tonyNote: 'SanDisk is a NAND flash storage name that has recovered sharply alongside the AI storage demand cycle. The high share price relative to peers reflects post-restructuring equity appreciation. ETF managers hold it alongside WDC as part of the NAND storage infrastructure thesis.',
    },
    {
      ticker: 'WDC', name: 'WDC', easyScore: 2, avgWeight: 4.53, proScore: 3.02, coverage: 0.667,
      price: 548.92, weeklyPrices: [487.42, 548.39, 556.67, 558.30, 548.92], weeklyChange: 12.62, dayChange: -1.68, sortRank: 0, periodReturns: { '1M': -14.7, 'YTD': 218.6, '6M': 132.2, '1Y': 695.3 },
      priceHistory: { '1D': [558.3, 549.06, 548.92], '1W': [487.42, 548.39, 556.67, 558.3, 548.92], '1M': [643.83, 675.39, 586.45, 651.88, 638.72, 598.37, 539, 577.46, 532.1, 550.3, 582.59, 555.55, 563.32, 513.84, 466.81, 477.22, 487.42, 548.39, 556.67, 558.3, 548.92], 'YTD': [172.27, 200.46, 221.51, 252.66, 290.24, 273.74, 285.52, 279.7, 262.06, 286.21, 301.05, 297.73, 337.88, 372.52, 404, 442.36, 488.74, 455.8, 531.18, 575.5, 562.93, 670.75, 638.72, 578.05, 466.81, 548.92], '6M': [240.85, 270.23, 285.99, 284.11, 270.57, 250.61, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 390.99, 465.26, 488.74, 455.8, 530.6, 594.11, 490.09, 712.13, 675.39, 539, 582.59, 477.22, 548.92], '1Y': [69.02, 78.69, 74.44, 76.24, 74.66, 82.04, 92.04, 96.15, 105.15, 107.21, 131.26, 119.7, 125.92, 125.72, 138.13, 163.6, 157.16, 140.23, 163.33, 168.89, 187.2, 175.01, 181.54, 187.88, 212.14, 222.97, 252.66, 290.24, 262.56, 296.56, 290.95, 261.3, 266.22, 313.81, 301.05, 270.49, 338.78, 365, 389.1, 412.76, 483.15, 494.09, 459.62, 531.18, 575.5, 490.09, 712.13, 675.39, 539, 582.59, 477.22, 548.92] },
      velocityScore: { '1D': 3.8, '1W': 86.4, '1M': -20.3, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 32.9, revenueGrowth: 46, eps: 16.69, grossMargin: 45, dividendYield: 0.11,
      etfPresence: { BUZZ: false, MEME: 5.18, RKNG: 3.87 },
      tonyNote: 'Western Digital holds a 2.47% average weight across 5 AI ETFs — the broadest coverage of any storage name in the theme. Revenue up 46%, 45% gross margin, P/E of 32x. The 931% 1-year return is driven by HDD demand for AI training data storage, a durable structural demand shift. The weight score is climbing as ETF managers increase allocation following the NAND market recovery.',
    },
    {
      ticker: 'ONDS', name: 'Ondas Holdings', easyScore: 2, avgWeight: 4.45, proScore: 2.96, coverage: 0.667,
      price: 7.74, weeklyPrices: [6.87, 7.66, 8.00, 7.93, 7.74], weeklyChange: 12.66, dayChange: -2.4, sortRank: 0, periodReturns: { '1M': 0.8, 'YTD': -20.7, '6M': -36.4, '1Y': 261.7 },
      priceHistory: { '1D': [7.93, 7.82, 7.78, 7.74], '1W': [6.87, 7.66, 8, 7.93, 7.74], '1M': [7.68, 7.68, 7.83, 8.02, 8.24, 7.92, 7.41, 7.82, 7.35, 7.52, 7.26, 6.96, 7.36, 7.05, 6.65, 6.53, 6.87, 7.66, 8, 7.93, 7.74], 'YTD': [9.76, 13.69, 12.16, 12.26, 11.38, 9.23, 10.03, 10.08, 9.72, 10.53, 10.68, 8.81, 9.14, 10, 10.55, 9.73, 9.04, 9.13, 13.25, 11.97, 9.33, 8.53, 8.24, 7.65, 6.65, 7.74], '6M': [11.16, 10.64, 10.34, 10.05, 10.4, 10.02, 10.01, 11.28, 10.68, 9.04, 9.45, 10.03, 11.06, 10.48, 9.33, 9.04, 9.13, 10.8, 11.61, 9.31, 9.12, 7.68, 7.41, 7.26, 6.53, 7.74], '1Y': [2.14, 2.12, 3.25, 3.93, 3.8, 5.7, 5.63, 6.42, 6.6, 7.75, 9.21, 10.49, 8.2, 7.06, 6.29, 5.25, 6.56, 6.27, 7.9, 9.07, 9.02, 7.8, 8.48, 12.53, 13.19, 13.13, 12.26, 11.38, 9.68, 11.07, 10.3, 10.51, 10.01, 11.28, 10.68, 9.04, 9.45, 10.03, 11.06, 9.49, 9.34, 8.86, 9.36, 13.25, 11.97, 9.31, 9.12, 7.68, 7.41, 7.26, 6.53, 7.74] },
      velocityScore: { '1D': 2.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$4B', pe: 86, revenueGrowth: 1080, eps: 0.09, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.56, RKNG: 3.33 },
      tonyNote: 'Ondas Holdings is a small-cap industrial automation and drone company. It appears in Meme ETFs on the autonomous systems and drone delivery narrative. Revenue is minimal and the path to profitability is unclear; the ETF allocation is speculative and reflects retail interest in autonomous systems themes.',
    },
    {
      ticker: 'LITE', name: 'LITE', easyScore: 2, avgWeight: 4.29, proScore: 2.86, coverage: 0.667,
      price: 826.6, weeklyPrices: [765.55, 837.56, 829.70, 833.64, 826.60], weeklyChange: 7.97, dayChange: -0.84, sortRank: 0, periodReturns: { '1M': -1.9, 'YTD': 124.3, '6M': 143.7, '1Y': 703.7 },
      priceHistory: { '1D': [833.64, 827.28, 826.6], '1W': [765.55, 837.56, 829.7, 833.64, 826.6], '1M': [842.53, 861.97, 816.98, 851.4, 858.06, 801.16, 728.32, 731.25, 698.91, 707.1, 802.01, 768.15, 814.8, 752, 706.23, 732.82, 765.55, 837.56, 829.7, 833.64, 826.6], 'YTD': [368.59, 351.42, 324.25, 370.66, 435.1, 574.11, 667.77, 700.91, 640.69, 624.84, 801.99, 764.65, 894.13, 894.07, 881.64, 976.18, 992.37, 890.09, 860.62, 945.08, 921.56, 827.92, 858.06, 785.77, 706.23, 826.6], '6M': [332.45, 423.42, 577.15, 600.42, 688.27, 694.43, 672, 649.56, 801.99, 702.76, 896.02, 824.01, 873.6, 791.37, 994.56, 992.37, 890.09, 902.31, 938, 853.26, 869.98, 861.97, 728.32, 802.01, 732.82, 826.6], '1Y': [102.85, 110.08, 111.13, 114.62, 117.43, 135.55, 149.46, 164.88, 171.5, 159.11, 169.75, 159.76, 163.23, 168.5, 200.13, 239.68, 226.86, 233.24, 325.16, 331.41, 372.09, 337.13, 390.77, 357.05, 339.87, 356.83, 370.66, 435.1, 561.13, 594.26, 723.39, 680.8, 672, 649.56, 801.99, 702.76, 896.02, 824.01, 873.6, 858.32, 944.28, 1030.37, 868.07, 860.62, 945.08, 853.26, 869.98, 861.97, 728.32, 802.01, 732.82, 826.6] },
      velocityScore: { '1D': 2.9, '1W': -1.7, '1M': -2.7, '6M': null }, isNew: false,
      marketCap: '$64B', pe: 145.8, revenueGrowth: 90, eps: 5.67, grossMargin: 41, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.15, RKNG: 3.44 },
      tonyNote: 'LITE appears in 2 of 3 Meme ETFs (67% coverage) with average weight 4.3% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'WULF', name: 'WULF', easyScore: 2, avgWeight: 4.14, proScore: 2.76, coverage: 0.667,
      price: 19.7, weeklyPrices: [18.86, 19.87, 19.49, 20.05, 19.70], weeklyChange: 4.43, dayChange: -1.77, sortRank: 0, periodReturns: { '1M': -27, 'YTD': 71.4, '6M': 39.5, '1Y': 270.2 },
      priceHistory: { '1D': [20.05, 20.01, 19.89, 19.7], '1W': [18.86, 19.87, 19.49, 20.05, 19.7], '1M': [26.97, 26.06, 25.83, 25.58, 24.7, 23.58, 21.18, 22.21, 20.24, 22.83, 21.97, 20.89, 19.41, 19.37, 17.98, 18.16, 18.86, 19.87, 19.49, 20.05, 19.7], 'YTD': [11.49, 13.1, 13.85, 15.31, 14.8, 16.03, 15.01, 16.22, 13.85, 16.41, 16.22, 14.48, 19.03, 20.64, 20.01, 22.29, 22.8, 21.34, 26.4, 26.19, 26.06, 28.78, 24.7, 23.2, 17.98, 19.7], '6M': [13.79, 13.44, 16.65, 16.18, 17.56, 14.74, 14.35, 16.04, 16.22, 14.43, 18.05, 19.67, 20.55, 20.8, 23.49, 22.8, 21.34, 26.74, 26.16, 23.19, 27.86, 26.06, 21.18, 21.97, 18.16, 19.7], '1Y': [5.32, 5.16, 4.94, 8.71, 9.19, 9.44, 9.13, 10.64, 11.17, 10.97, 11.58, 13.59, 13.86, 12.88, 14.82, 14.28, 11.68, 11.56, 15.51, 14.5, 15.83, 11.79, 11.75, 13.62, 13.81, 13.33, 15.31, 14.8, 16.63, 15.38, 17.92, 15.37, 14.35, 16.04, 16.22, 14.43, 18.05, 19.67, 20.55, 20.02, 25.74, 23.12, 21.63, 26.4, 26.19, 23.19, 27.86, 26.06, 21.18, 21.97, 18.16, 19.7] },
      velocityScore: { '1D': 1.5, '1W': 1.8, '1M': 90.3, '6M': null }, isNew: false,
      marketCap: '$10B', pe: null, revenueGrowth: -1, eps: -2.51, grossMargin: 64, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.37, RKNG: 2.91 },
      tonyNote: 'WULF appears in 2 of 3 Meme ETFs (67% coverage) with average weight 4.1% — high conviction across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ASTS', name: 'AST SpaceMobile', easyScore: 2, avgWeight: 3.73, proScore: 2.48, coverage: 0.667,
      price: 58.48, weeklyPrices: [57.42, 63.34, 61.95, 59.18, 58.48], weeklyChange: 1.85, dayChange: -1.17, sortRank: 0, periodReturns: { '1M': -14, 'YTD': -19.5, '6M': -48.5, '1Y': -2.6 },
      priceHistory: { '1D': [59.18, 59, 58.84, 58.48], '1W': [57.42, 63.34, 61.95, 59.18, 58.48], '1M': [68.01, 65.62, 71.45, 86.77, 88.86, 86.1, 85.13, 80.64, 74.21, 74.95, 73.32, 67.58, 68.82, 66.31, 55.01, 57.8, 57.42, 63.34, 61.95, 59.18, 58.48], 'YTD': [72.63, 97.67, 115.77, 111.34, 115.76, 96.92, 80.2, 79.19, 89.76, 89.11, 86.98, 83.99, 91.61, 85.53, 76.4, 68.43, 72.96, 88.1, 133.09, 107.29, 82.41, 72.87, 88.86, 73.88, 55.01, 58.48], '6M': [104.78, 104.55, 102.12, 83.03, 85.82, 92.68, 87.53, 95.7, 86.98, 82.87, 96.46, 86.91, 84.66, 71.88, 63.87, 72.96, 88.1, 129.6, 107.73, 87.32, 85.43, 65.62, 85.13, 73.32, 57.8, 58.48], '1Y': [60.06, 53.17, 47.71, 48.5, 44.98, 48.95, 42.41, 38.37, 41.44, 49.39, 66.16, 86.79, 89.5, 71.72, 76.68, 65.28, 61.44, 50.7, 56.2, 73.92, 84.75, 65.93, 71.95, 90.92, 98.39, 112.44, 111.34, 115.76, 96.27, 84.43, 82.36, 104.89, 87.53, 95.7, 86.98, 82.87, 96.46, 86.91, 84.66, 69.85, 70.68, 74.81, 89.58, 133.09, 107.29, 87.32, 85.43, 65.62, 85.13, 73.32, 57.8, 58.48] },
      velocityScore: { '1D': null, '1W': 0.4, '1M': -32.8, '6M': null }, isNew: true,
      marketCap: '$23B', pe: null, revenueGrowth: 1952, eps: -1.8, grossMargin: 45, dividendYield: null,
      etfPresence: { BUZZ: 2.55, MEME: 4.9, RKNG: false },
      tonyNote: 'AST SpaceMobile is a satellite broadband company building a direct-to-device cellular network. It holds positions in ETFs focused on electrification and connectivity infrastructure. Revenue is early-stage; the ETF weight reflects speculative positioning on a large total addressable market if the network buildout succeeds.',
    },
    {
      ticker: 'AMD', name: 'AMD', easyScore: 2, avgWeight: 3.34, proScore: 2.23, coverage: 0.667,
      price: 547.26, weeklyPrices: [503.57, 544.43, 552.33, 539.69, 547.26], weeklyChange: 8.68, dayChange: 1.4, sortRank: 0, periodReturns: { '1M': 5.3, 'YTD': 155.5, '6M': 110.7, '1Y': 237.6 },
      priceHistory: { '1D': [539.69, 547.46, 547.26], '1W': [503.57, 544.43, 552.33, 539.69, 547.26], '1M': [519.74, 532.57, 521.58, 539.49, 580.91, 540.88, 517.82, 552.05, 516.11, 517.41, 557.89, 534.39, 548.13, 529.14, 500.94, 495.76, 503.57, 544.43, 552.33, 539.69, 547.26], 'YTD': [214.16, 203.17, 231.83, 252.03, 242.11, 213.58, 200.15, 200.21, 202.68, 196.58, 205.37, 210.21, 236.64, 278.39, 347.81, 341.54, 448.29, 414.05, 518.09, 523.2, 511.57, 519.85, 580.91, 546.72, 500.94, 547.26], '6M': [251.31, 246.27, 216, 203.08, 213.84, 190.95, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 323.21, 355.26, 448.29, 414.05, 495.54, 542.52, 452.4, 512.48, 532.57, 517.82, 557.89, 495.76, 547.26], '1Y': [162.12, 176.31, 172.4, 180.95, 163.71, 168.58, 151.14, 155.67, 157.92, 161.27, 169.73, 232.89, 234.56, 234.99, 254.84, 237.7, 247.96, 206.02, 217.53, 217.97, 221.43, 201.06, 214.99, 221.08, 207.69, 231.92, 252.03, 242.11, 213.57, 200.12, 210.86, 202.07, 203.23, 196.31, 205.37, 203.43, 231.82, 258.12, 303.46, 337.11, 421.39, 445.5, 447.58, 518.09, 523.2, 452.4, 512.48, 532.57, 517.82, 557.89, 495.76, 547.26] },
      velocityScore: { '1D': 0.5, '1W': -12.2, '1M': null, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 181.2, revenueGrowth: 38, eps: 3.02, grossMargin: 53, dividendYield: null,
      etfPresence: { BUZZ: 2.47, MEME: false, RKNG: 4.21 },
      tonyNote: 'AMD scores highest in Semiconductors at 7.0% average weight, held by 3 of 4 chip ETFs. Revenue grew 38% with 53% gross margins and EPS of $2.99 — improving but still stretched at a P/E of 172x. The 1-year return of 366% compresses future upside; the weight score says ETF managers are committed, but valuation is the variable to watch.',
    },
    {
      ticker: 'INTC', name: 'INTC', easyScore: 2, avgWeight: 2.81, proScore: 1.87, coverage: 0.667,
      price: 101.15, weeklyPrices: [97.06, 105.45, 102.62, 100.23, 101.15], weeklyChange: 4.21, dayChange: 0.92, sortRank: 0, periodReturns: { '1M': -23.2, 'YTD': 174.1, '6M': 124.4, '1Y': 347 },
      priceHistory: { '1D': [100.23, 101.25, 101.15], '1W': [97.06, 105.45, 102.62, 100.23, 101.15], '1M': [131.65, 132.87, 128.32, 131.72, 139.63, 127.02, 120.35, 122.2, 110.39, 110.24, 109.84, 103.12, 107.76, 102.99, 96.98, 95.04, 97.06, 105.45, 102.62, 100.23, 101.15], 'YTD': [36.9, 45.55, 46.96, 43.93, 49.25, 48.29, 44.11, 45.61, 45.58, 45.76, 44.06, 48.03, 61.72, 68.5, 82.54, 95.78, 120.61, 110.8, 120.89, 111.78, 124.57, 132.28, 139.63, 112.54, 96.98, 101.15], '6M': [42.49, 48.81, 50.24, 46.18, 46.12, 43.1, 46.78, 44.06, 44.06, 44.13, 58.95, 64.94, 65.27, 84.52, 108.15, 120.61, 110.8, 121.77, 112.71, 107.04, 121.1, 132.87, 120.35, 109.84, 95.04, 101.15], '1Y': [22.63, 19.8, 19.77, 23.86, 23.5, 24.93, 24.49, 24.61, 30.57, 33.99, 37.3, 37.8, 36.84, 38.16, 40.16, 37.24, 35.91, 33.62, 40.56, 41.41, 39.51, 36.28, 36.2, 39.37, 44.06, 48.56, 43.93, 49.25, 47.13, 45.46, 46.88, 45.58, 46.78, 44.06, 44.06, 44.13, 58.95, 64.94, 65.27, 94.75, 113.01, 120.29, 118.96, 120.89, 111.78, 107.04, 121.1, 132.87, 120.35, 109.84, 95.04, 101.15] },
      velocityScore: { '1D': -2.1, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$508B', pe: null, revenueGrowth: 7, eps: -0.6, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: 2.41, MEME: false, RKNG: 3.21 },
      tonyNote: 'Intel is a turnaround bet — negative EPS, no dividend, 37% gross margin, and only 7% revenue growth. It appears in 3 AI ETFs and 2 Semiconductor ETFs because of its foundry ambitions, not current performance. The 487% 1-year return is price recovery off a historic low; at current levels the weight score reflects speculative positioning, not fundamental conviction.',
    },
    {
      ticker: 'AAOI', name: 'Applied Optoelectronics', easyScore: 1, avgWeight: 6.73, proScore: 2.24, coverage: 0.333,
      price: 107.18, weeklyPrices: [103.02, 119.26, 110.52, 112.02, 107.18], weeklyChange: 4.04, dayChange: -4.32, sortRank: 0, periodReturns: { '1M': -27.1, 'YTD': 207.5, '6M': 200.1, '1Y': 314.8 },
      priceHistory: { '1D': [112.02, 109.09, 108.36, 107.18], '1W': [103.02, 119.26, 110.52, 112.02, 107.18], '1M': [146.97, 138.54, 135.69, 150.1, 148.16, 139, 120.95, 123.36, 114.41, 114.44, 119.92, 111.88, 125.45, 109.09, 100.24, 102.41, 103.02, 119.26, 110.52, 112.02, 107.18], 'YTD': [34.86, 34.04, 37.04, 37.39, 46.12, 48.4, 51.68, 84.23, 110.62, 94.07, 113.9, 86.35, 133.3, 159.42, 162.17, 172.98, 188.28, 171.33, 169.02, 202.89, 169.05, 147.44, 148.16, 122.21, 100.24, 107.18], '6M': [34.89, 44.16, 47.91, 43.91, 56.27, 95.34, 120.49, 86.33, 113.9, 84.59, 132.7, 142.55, 149.42, 137.26, 180.57, 188.28, 171.33, 179.83, 184.07, 175.13, 167.34, 138.54, 120.95, 119.92, 102.41, 107.18], '1Y': [25.84, 22.87, 22.33, 21.01, 23.7, 25.49, 23.99, 26.85, 29.04, 26.34, 27.98, 32.37, 31.14, 31.4, 35.07, 29.1, 20.91, 19.49, 26.78, 26.59, 36.32, 29.25, 37.17, 34.99, 33.72, 39.26, 37.39, 46.12, 48.49, 43.44, 58.12, 99.71, 120.49, 86.33, 113.9, 84.59, 132.7, 142.55, 149.42, 152.83, 178.54, 223.1, 165.26, 169.02, 202.89, 175.13, 167.34, 138.54, 120.95, 119.92, 102.41, 107.18] },
      velocityScore: { '1D': 1.4, '1W': -29.6, '1M': -39.6, '6M': null }, isNew: false,
      marketCap: '$9B', pe: null, revenueGrowth: 51, eps: -0.65, grossMargin: 30, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 6.73, RKNG: false },
      tonyNote: 'Applied Optoelectronics is a fiber optic transceiver company — it makes the optical networking hardware inside data center switching fabric. Revenue grew sharply as hyperscalers upgraded to 400G and 800G optical interconnects for AI training clusters. Small market cap, volatile earnings, but the data center connectivity demand is real and growing.',
    },
    {
      ticker: 'CRDO', name: 'CRDO', easyScore: 1, avgWeight: 5.43, proScore: 1.81, coverage: 0.333,
      price: 230.86, weeklyPrices: [212.07, 223.87, 228.27, 236.50, 230.86], weeklyChange: 8.86, dayChange: -2.39, sortRank: 0, periodReturns: { '1M': -14.2, 'YTD': 60.4, '6M': 73.4, '1Y': 128.2 },
      priceHistory: { '1D': [236.5, 230.25, 230.86], '1W': [212.07, 223.87, 228.27, 236.5, 230.86], '1M': [268.99, 268.03, 238, 245.68, 271.95, 259.09, 241.91, 265.55, 246.4, 258.69, 257.79, 236.88, 236.18, 226.74, 207.97, 202.68, 212.07, 223.87, 228.27, 236.5, 230.86], 'YTD': [143.89, 150.42, 150.97, 129.57, 111.31, 128.4, 124.06, 112.27, 115.98, 116.88, 100.3, 95.92, 107.93, 160.69, 195.04, 180.06, 198.57, 168.99, 222.35, 217.5, 250.81, 272.01, 271.95, 265.65, 207.97, 230.86], '6M': [128.02, 119.96, 123.41, 124.8, 120.83, 97.3, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 165.92, 193.57, 198.57, 168.99, 221.23, 214.6, 237.68, 249.33, 268.03, 241.91, 257.79, 202.68, 230.86], '1Y': [101.17, 111.55, 119.78, 117.33, 110.86, 131.82, 140.82, 159.32, 172.31, 144.94, 149.63, 151.15, 136.53, 150.97, 166.62, 162.74, 142.95, 134.73, 177.6, 176.04, 154.47, 138.57, 144.83, 140.24, 156.07, 153.22, 129.57, 111.31, 134.72, 127.91, 123.46, 102.54, 112.33, 104.06, 100.3, 93.87, 110.21, 168.35, 189.49, 175.77, 198.29, 189.36, 182.98, 222.35, 217.5, 237.68, 249.33, 268.03, 241.91, 257.79, 202.68, 230.86] },
      velocityScore: { '1D': 3.4, '1W': 24.8, '1M': -37.2, '6M': null }, isNew: false,
      marketCap: '$43B', pe: 92, revenueGrowth: 157, eps: 2.51, grossMargin: 68, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.43, RKNG: false },
      tonyNote: 'Credo Technology is a high-speed connectivity semiconductor company — SerDes IP, active electrical cables, and optical DSPs for data center networking at speeds from 100G to 1.6T. Revenue grew sharply as hyperscalers upgraded networking infrastructure for AI training. The ETF weight is building as managers recognize Credo\'s position at the intersection of AI and optical networking.',
    },
    {
      ticker: 'COHR', name: 'COHR', easyScore: 1, avgWeight: 5.31, proScore: 1.77, coverage: 0.333,
      price: 301.97, weeklyPrices: [285.40, 317.22, 312.19, 313.22, 301.97], weeklyChange: 5.81, dayChange: -3.59, sortRank: 0, periodReturns: { '1M': -23.1, 'YTD': 63.6, '6M': 53.3, '1Y': 205.9 },
      priceHistory: { '1D': [313.22, 306.91, 305.53, 301.97], '1W': [285.4, 317.22, 312.19, 313.22, 301.97], '1M': [392.5, 407.25, 380.56, 391.22, 394.47, 368.65, 333.36, 335.7, 314.13, 317.05, 324.5, 307.39, 310.77, 299.38, 276.96, 277.6, 285.4, 317.22, 312.19, 313.22, 301.97], 'YTD': [184.57, 178.06, 191.04, 214, 229.18, 223.69, 248.18, 258.93, 252.32, 247.37, 272.33, 247.8, 284.17, 345.02, 336.09, 329.89, 374.01, 353.63, 376.95, 421.9, 385.03, 381.22, 394.47, 327.24, 276.96, 301.97], '6M': [197.76, 222.44, 242.46, 219.96, 254.86, 280.81, 260.64, 245.8, 272.33, 238.21, 281.79, 308.2, 350.47, 303.97, 335.73, 374.01, 353.63, 380.18, 417.43, 354.77, 378.85, 407.25, 333.36, 324.5, 277.6, 301.97], '1Y': [98.72, 107.6, 113.82, 91.65, 86.6, 95.2, 97.84, 103.51, 108.05, 106.57, 112.79, 122.35, 115.96, 121.52, 132.71, 159.3, 139.97, 135.61, 164.26, 181.79, 198.5, 175.71, 191.72, 186.36, 185.18, 193.46, 214, 229.18, 228.37, 223.89, 267.9, 274.86, 260.64, 245.8, 272.33, 238.21, 281.79, 308.2, 350.47, 304.93, 344.67, 403.71, 358.5, 376.95, 421.9, 354.77, 378.85, 407.25, 333.36, 324.5, 277.6, 301.97] },
      velocityScore: { '1D': 0, '1W': 0, '1M': null, '6M': null }, isNew: false,
      marketCap: '$59B', pe: 143.8, revenueGrowth: 21, eps: 2.1, grossMargin: 37, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.31, RKNG: false },
      tonyNote: 'COHR appears in 1 of 3 Meme ETFs (33% coverage) with average weight 5.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'ALAB', name: 'ALAB', easyScore: 1, avgWeight: 5.14, proScore: 1.71, coverage: 0.333,
      price: 317.17, weeklyPrices: [309.09, 319.79, 330.89, 326.97, 317.17], weeklyChange: 2.61, dayChange: -3, sortRank: 0, periodReturns: { '1M': -20.7, 'YTD': 90.6, '6M': 86.9, '1Y': 160.7 },
      priceHistory: { '1D': [326.97, 317.36, 317.17], '1W': [309.09, 319.79, 330.89, 326.97, 317.17], '1M': [399.92, 398, 391.74, 455.96, 483.02, 430.86, 406.42, 432.74, 382.89, 393.16, 412.97, 362.05, 361.78, 350.62, 319.74, 303.62, 309.09, 319.79, 330.89, 326.97, 317.17], 'YTD': [166.36, 162.61, 182, 170.93, 158.52, 143.71, 129.68, 118.83, 122.31, 127.48, 121.76, 106.33, 129.46, 174.05, 212.84, 201.25, 204.42, 244.26, 349.17, 358.05, 367.15, 397.02, 483.02, 417.45, 319.74, 317.17], '6M': [163.25, 152.44, 187.67, 123.69, 128.4, 109.8, 116.48, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 183.31, 215.69, 204.42, 244.26, 325.33, 363.54, 330.86, 374.68, 398, 406.42, 412.97, 303.62, 317.17], '1Y': [121.68, 136.73, 170.89, 190.69, 177.53, 189.15, 191.2, 232.9, 251.88, 200.64, 209.6, 225.43, 163.55, 163.64, 169.55, 162.83, 144.47, 139.29, 157.57, 161.23, 173.7, 145.88, 167.26, 167.11, 172.57, 183.75, 170.93, 158.52, 182.86, 129.58, 128.15, 113.77, 116.48, 127.57, 121.76, 109.6, 125.46, 172.09, 194.06, 196.85, 213.91, 224.09, 287.48, 349.17, 358.05, 330.86, 374.68, 398, 406.42, 412.97, 303.62, 317.17] },
      velocityScore: { '1D': -1.2, '1W': 20.4, '1M': null, '6M': null }, isNew: false,
      marketCap: '$54B', pe: 215.8, revenueGrowth: 93, eps: 1.47, grossMargin: 76, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 5.14, RKNG: false },
      tonyNote: 'Astera Labs is a connectivity silicon company for AI data centers — high bandwidth, low latency PCIe and CXL interconnects that GPU clusters require. Revenue growth is strong and the company is one of the cleaner AI infrastructure pure-plays in the semiconductor universe; ETF managers have begun building positions but coverage is still selective.',
    },
    {
      ticker: 'STX', name: 'STX', easyScore: 1, avgWeight: 4.94, proScore: 1.65, coverage: 0.333,
      price: 899.96, weeklyPrices: [802.45, 891.83, 908.10, 913.36, 899.96], weeklyChange: 12.15, dayChange: -1.47, sortRank: 0, periodReturns: { '1M': -9.4, 'YTD': 226.8, '6M': 160, '1Y': 489.2 },
      priceHistory: { '1D': [913.36, 901.96, 899.96], '1W': [802.45, 891.83, 908.1, 913.36, 899.96], '1M': [993.25, 1025.36, 899.9, 968.53, 965, 915.19, 820.16, 868.26, 827.64, 860.02, 910.34, 860.66, 878.31, 828.3, 745.49, 787.66, 802.45, 891.83, 908.1, 913.36, 899.96], 'YTD': [275.39, 304.01, 326.23, 371.76, 444.45, 407.25, 411.11, 407.84, 374.33, 398.78, 424.96, 423.12, 500.77, 547.75, 586.25, 738.54, 808.8, 733.35, 880.72, 925.99, 931.04, 1038.59, 965, 890.09, 745.49, 899.96], '6M': [358.29, 432.95, 425, 415.94, 396.02, 357.62, 384.29, 421.09, 424.96, 391.76, 496.3, 519.6, 579.88, 579.03, 771.01, 808.8, 733.35, 870.66, 940.69, 815.99, 1066.07, 1025.36, 820.16, 910.34, 787.66, 899.96], '1Y': [152.73, 157.01, 148.1, 155.73, 154.6, 172.38, 188.16, 196.81, 216.64, 219.85, 254.74, 221.7, 226.03, 226.41, 268.34, 278.47, 262.56, 240.5, 276.69, 278.79, 307.85, 292, 286.22, 289.83, 321.48, 325.99, 371.76, 444.45, 396.23, 424.14, 421.85, 375.01, 384.29, 421.09, 424.96, 391.76, 496.3, 519.6, 579.88, 643.3, 786.42, 817.35, 751.07, 880.72, 925.99, 815.99, 1066.07, 1025.36, 820.16, 910.34, 787.66, 899.96] },
      velocityScore: { '1D': 0.6, '1W': 3.1, '1M': null, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 85.7, revenueGrowth: 44, eps: 10.5, grossMargin: 42, dividendYield: 0.32,
      etfPresence: { BUZZ: false, MEME: 4.94, RKNG: false },
      tonyNote: 'Seagate appears in 4 AI ETFs at 2.73% average weight, positioned alongside WDC as the institutional pair trade on AI storage infrastructure. Revenue grew 44%, gross margin 42%, P/E of 83x — the premium valuation reflects expectations for continued enterprise HDD pricing power. The 646% 1-year return is substantial; at current prices the weight score matters more as a signal of continued institutional support than a fresh entry point.',
    },
    {
      ticker: 'CRWV', name: 'CRWV', easyScore: 1, avgWeight: 4.93, proScore: 1.64, coverage: 0.333,
      price: 78.88, weeklyPrices: [73.06, 79.58, 82.64, 81.10, 78.88], weeklyChange: 7.97, dayChange: -2.74, sortRank: 0, periodReturns: { '1M': -21.8, 'YTD': 10.2, '6M': -15.2, '1Y': -34.3 },
      priceHistory: { '1D': [81.1, 78.85, 78.88], '1W': [73.06, 79.58, 82.64, 81.1, 78.88], '1M': [100.88, 98.76, 96.58, 95.51, 99.54, 85.68, 81.75, 86.46, 83.53, 90, 88.88, 83.31, 79.94, 77.12, 72.91, 73.21, 73.06, 79.58, 82.64, 81.1, 78.88], 'YTD': [71.61, 80.14, 101.23, 108.86, 90.06, 95.15, 89.25, 79.56, 74.41, 85.86, 83.02, 78.44, 92, 116.85, 110.14, 125.43, 107.75, 99.81, 106.86, 108.03, 100.55, 105.72, 99.54, 89.7, 72.91, 78.88], '6M': [98.31, 88.94, 96.79, 91, 99.3, 73.78, 74.92, 82.12, 83.02, 77.47, 88.9, 118.69, 122.54, 105.53, 127.89, 107.75, 99.81, 104.27, 110.93, 95.61, 115.21, 98.76, 81.75, 88.88, 73.21, 78.88], '1Y': [120, 114.13, 121.08, 99.5, 90.79, 102.79, 89.09, 112.69, 121.39, 126.66, 138, 143.08, 141.74, 123.34, 131.06, 106.93, 78.34, 69.21, 73.12, 88.3, 87.38, 67.68, 76.42, 76.86, 89.93, 95.22, 108.86, 90.06, 95.11, 95.45, 98.01, 79.5, 74.92, 82.12, 83.02, 77.47, 88.9, 118.69, 122.54, 114.19, 137.98, 111.31, 101.28, 106.86, 108.03, 95.61, 115.21, 98.76, 81.75, 88.88, 73.21, 78.88] },
      velocityScore: { '1D': -1.8, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: '$43B', pe: null, revenueGrowth: 112, eps: -2.72, grossMargin: 69, dividendYield: null,
      etfPresence: { BUZZ: false, MEME: 4.93, RKNG: false },
      tonyNote: 'CRWV appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.9% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'TER', name: 'TER', easyScore: 1, avgWeight: 4.64, proScore: 1.55, coverage: 0.333,
      price: 364.1, weeklyPrices: [333.76, 374.04, 369.46, 373.75, 364.10], weeklyChange: 9.09, dayChange: -2.57, sortRank: 0, periodReturns: { '1M': -14.8, 'YTD': 88.1, '6M': 58.9, '1Y': 298.7 },
      priceHistory: { '1D': [373.75, 368.59, 367.43, 364.1], '1W': [333.76, 374.04, 369.46, 373.75, 364.1], '1M': [427.2, 471.96, 436.86, 463.21, 483.84, 427.34, 369.09, 379.52, 343.11, 351.57, 359.6, 341.11, 353.23, 342.12, 322.3, 322.36, 333.76, 374.04, 369.46, 373.75, 364.1], 'YTD': [193.56, 217.26, 228.15, 238.94, 282.98, 321.45, 324.85, 320.03, 296.44, 298.27, 320.14, 312.2, 364.21, 380.38, 418.08, 337.44, 358.45, 321.52, 382.65, 406.86, 403.2, 420.12, 483.84, 362.75, 322.3, 364.1], '6M': [231.75, 249.53, 310.01, 305.53, 329.09, 304.22, 300.77, 299.4, 320.14, 296.46, 358.29, 364.96, 385.18, 380.13, 357.1, 358.45, 321.52, 375.83, 409.67, 347.59, 408.56, 471.96, 369.09, 359.6, 322.36, 364.1], '1Y': [91.33, 107.43, 106.46, 111.82, 109.3, 117.89, 120.2, 115.56, 118.82, 132.87, 144.53, 145.19, 139.3, 145.04, 176.88, 185.02, 169.59, 155.9, 181.89, 200.77, 203.97, 190.45, 198.9, 219.5, 224.36, 223.98, 238.94, 282.98, 304.89, 314.82, 342.82, 305.2, 300.77, 299.4, 320.14, 296.46, 358.29, 364.96, 385.18, 306.33, 382.48, 363.38, 344.34, 382.65, 406.86, 347.59, 408.56, 471.96, 369.09, 359.6, 322.36, 364.1] },
      velocityScore: { '1D': 1.3, '1W': null, '1M': null, '6M': null }, isNew: false,
      marketCap: 'N/A', pe: 67.7, revenueGrowth: 87, eps: 5.38, grossMargin: 59, dividendYield: 0.14,
      etfPresence: { BUZZ: false, MEME: 4.64, RKNG: false },
      tonyNote: 'TER appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.6% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'DELL', name: 'DELL', easyScore: 1, avgWeight: 4.32, proScore: 1.44, coverage: 0.333,
      price: 445.23, weeklyPrices: [381.88, 404.15, 441.80, 439.34, 445.23], weeklyChange: 16.59, dayChange: 1.42, sortRank: 0, periodReturns: { '1M': 2.6, 'YTD': 253.7, '6M': 285.7, '1Y': 246.9 },
      priceHistory: { '1D': [439, 446.35, 445.23], '1W': [381.88, 404.15, 441.8, 439.34, 445.23], '1M': [434.06, 409.45, 399.49, 414.61, 431.46, 425.25, 394.32, 411.8, 417.28, 431.97, 434.97, 427.11, 457.54, 412.68, 391.38, 396.34, 381.88, 404.15, 441.8, 439.34, 445.23], 'YTD': [125.88, 120.62, 120.53, 114.66, 117.15, 124.16, 122.27, 148.08, 146.51, 156.54, 176.91, 169.38, 181.46, 196.55, 216.09, 211.64, 238.94, 235.26, 317.05, 422.05, 395.57, 427.78, 431.46, 450.22, 391.38, 445.23], '6M': [115.93, 119.16, 120.91, 116.09, 119.78, 145.18, 143.8, 153.01, 176.91, 164.13, 185.47, 177.28, 214.65, 205.93, 216.32, 238.94, 235.26, 305.32, 421.08, 369.83, 419.32, 409.45, 394.32, 434.97, 396.34, 445.23], '1Y': [128.35, 132.69, 133.93, 138.86, 127.83, 134.05, 124.83, 125.37, 132.11, 130.96, 147.37, 155.95, 151.31, 154.23, 161.01, 149.18, 133.94, 117.4, 133.35, 138.91, 138.6, 122.94, 129.24, 124.01, 120.47, 111.07, 114.66, 117.15, 126.01, 116.78, 123.48, 147.1, 143.8, 153.01, 176.91, 164.13, 185.47, 177.28, 214.65, 205.66, 238.8, 243.87, 242.93, 317.05, 422.05, 369.83, 419.32, 409.45, 394.32, 434.97, 396.34, 445.23] },
      velocityScore: { '1D': null, '1W': -28, '1M': null, '6M': null }, isNew: true,
      marketCap: '$288B', pe: 35.4, revenueGrowth: 88, eps: 12.57, grossMargin: 19, dividendYield: 0.57,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.32 },
      tonyNote: 'DELL appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
    {
      ticker: 'BMNR', name: 'BMNR', easyScore: 1, avgWeight: 4.28, proScore: 1.43, coverage: 0.333,
      price: 16.2, weeklyPrices: [16.63, 17.23, 17.74, 16.59, 16.20], weeklyChange: -2.59, dayChange: -2.47, sortRank: 0, periodReturns: { '1M': 15.5, 'YTD': -40.3, '6M': -43.7, '1Y': -61.2 },
      priceHistory: { '1D': [16.61, 16.33, 16.31, 16.2], '1W': [16.63, 17.23, 17.74, 16.59, 16.2], '1M': [14.02, 13.32, 13.56, 13.8, 13.31, 14.15, 14.36, 15.55, 14.8, 14.86, 14.98, 14.61, 16.29, 15.79, 15.44, 15.69, 16.63, 17.23, 17.74, 16.59, 16.2], 'YTD': [27.15, 30.06, 31.16, 29.33, 22.35, 19.47, 20.13, 18.98, 20.7, 23.39, 20.8, 19.69, 21.08, 22.95, 22.14, 22.79, 21.67, 18.63, 19.25, 17.89, 16.11, 15.13, 13.31, 14.69, 15.44, 16.2], '6M': [27.8, 22.8, 21.45, 20.15, 19.44, 19.57, 20.73, 23.23, 20.8, 19.78, 21.52, 22.34, 23.31, 21.48, 23.1, 21.67, 18.63, 18.82, 16.9, 15.64, 15.7, 13.32, 14.36, 14.98, 15.69, 16.2], '1Y': [41.75, 34.64, 41.28, 60.45, 47.73, 45.57, 42.04, 47.79, 59.96, 49.57, 56.5, 59.1, 51.08, 49.19, 44.55, 37.37, 36.57, 26.02, 33.12, 34.06, 38.38, 28.43, 28.31, 33.35, 31.13, 28.24, 29.33, 22.35, 19.95, 19.82, 21.5, 21.12, 20.73, 23.23, 20.8, 19.78, 21.52, 22.34, 23.31, 20.66, 22.91, 21.18, 19.39, 19.25, 17.89, 15.64, 15.7, 13.32, 14.36, 14.98, 15.69, 16.2] },
      velocityScore: { '1D': null, '1W': null, '1M': null, '6M': null }, isNew: true,
      marketCap: '$10B', pe: null, revenueGrowth: 2168, eps: -4.5, grossMargin: 84, dividendYield: 0.06,
      etfPresence: { BUZZ: false, MEME: false, RKNG: 4.28 },
      tonyNote: 'BMNR appears in 1 of 3 Meme ETFs (33% coverage) with average weight 4.3% — selective across the institutional products tracked. Analysis pending — check back for Tony\'s full thesis.',
    },
  ],

};
// @@END_GENERATED:SAMPLE_DATA@@
